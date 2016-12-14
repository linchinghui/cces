package com.lch.cces

import java.awt.*
import java.awt.image.*
import javax.imageio.ImageIO
import grails.util.Holders
import groovy.transform.CompileStatic
import org.apache.commons.codec.binary.Base64
import org.apache.commons.io.FileUtils
import org.slf4j.LoggerFactory
import org.springframework.util.MimeTypeUtils
import org.springframework.web.multipart.MultipartFile

class ImageHelper {

	private static log = LoggerFactory.getLogger(ImageHelper)

	private static def configHolder
	private static final String THUMBNAIL_EXT = 'png'
	private static final String THUMBNAIL_DIR = 'thumb'
	private static int THUMBNAIL_WIDTH = 128
	private static int THUMBNAIL_HEIGHT = 128

	static {
        configHolder = Holders.grailsApplication.config.cces.images ?: [
			// size: 500000,
			uriPrefix: '/images',
            persistFolder: System.properties['user.dir'],
			userCache: false
        ]

        ImageIO.setUseCache(configHolder.useCache)
        new javax.media.jai.util.Range[1]
    }

	// @CompileStatic
	static def /*byte[]*/ getImageBytes = { String uri, boolean thumb = false ->
		def rtn = null
		def fileUri = uri

		if (thumb) {
			def lst = uri.split('/') as java.util.List
			lst.add(lst.size()-1, THUMBNAIL_DIR)
			fileUri = lst.join('/')
		}

		def imageFile = new File(configHolder.persistFolder, fileUri)

		if (imageFile.exists()) {
			try {
				// rtn = FileUtils.readFileToByteArray(imageFile)
				rtn = imageFile.bytes
			} catch (e) {
				// TODO: logging something
			}
		}
		return  rtn
    }

	// --- Base64 string of image ---
	// @CompileStatic
	static def /*String*/ getImageBase64(String uri, boolean thumb = false) {
		def bytes = getImageBytes(uri, thumb)
		/*return*/ bytes ? Base64.encodeBase64String(bytes) : null
    }

	// @CompileStatic
	static def /*String*/ getImageBase64(MultipartFile multipartFile) {
		def rtn = null

		if (multipartFile && !multipartFile?.isEmpty()) {
			try {
				rtn = Base64.encodeBase64String(multipartFile.bytes)
			} catch (e) {
				// TODO: logging something
			}
		}
		return rtn
    }

	// --- image ---
	// @CompileStatic
	static def /*BufferedImage*/ getImage(String uri, boolean thumb = false) {
		def bytes = getImageBytes(uri, thumb)
		/*return*/ bytes ? ImageIO.read(new ByteArrayInputStream(bytes)) : null
    }

	// @CompileStatic
	static def /*BufferedImage*/ getImage(MultipartFile multipartFile) {
		def rtn = null

		if (multipartFile && !multipartFile?.isEmpty()) {
			try {
				rtn = ImageIO.read(multipartFile.inputStream)
			} catch (e) {
				// TODO: logging something
			}
		}
		return rtn
    }

	// @CompileStatic
	static void persist(delegate, multipartFile) {
		if (multipartFile == null) {
			return
		}

		// ----- photo -----
        def dirName = "${configHolder.persistFolder}/${delegate.class.simpleName}/${delegate.id}"
        new File(dirName).mkdirs()

		def fileName = multipartFile?.originalFilename // field: filename
		def fileExt = MimeTypeUtils.parseMimeType(multipartFile.contentType).subtype
        def fileNameAry = fileName.split('\\.')
		def fileNameLast = ('.' + fileNameAry[-1]) - ('.' + fileExt)

		if (fileNameLast.size() > 0) {
			fileNameAry[-1] = fileNameLast.substring(1) + '.' + fileExt
			fileName = fileNameAry.join('.')
		}

        def imageFile = new File(dirName, fileName)
		def fos = null
		def fis = null

		try {
		    fos = new FileOutputStream(imageFile)
		    fis = multipartFile.inputStream
		    fos << fis
		} finally {
		    try { fos?.close() } catch(e) { /*ignore*/ }
		    try { fis?.close() } catch(e) { /*ignore*/ }
		}

		// ----- thumbnail -----
		dirName = dirName + '/' + THUMBNAIL_DIR
		new File(dirName).mkdirs()

		def image = ImageIO.read(imageFile)
		int imageWidth = image.getWidth(null)
		int imageHeight = image.getHeight(null)
		double imageRatio = (double)imageWidth / (double)imageHeight
		int thumbWidth = THUMBNAIL_WIDTH
		int thumbHeight = THUMBNAIL_HEIGHT

		if (imageRatio > 1.0) {
			thumbHeight = (int)(thumbWidth / imageRatio)
		} else {
			thumbWidth = (int)(thumbHeight * imageRatio)
		}

		def thumbImage = new BufferedImage( thumbWidth, thumbHeight,
			(image.getTransparency() == Transparency.OPAQUE) ? BufferedImage.TYPE_INT_RGB : BufferedImage.TYPE_INT_ARGB
		)

		def g2 = thumbImage.createGraphics()
		g2.fillRect(0, 0, thumbWidth, thumbHeight)
		g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON)
		g2.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY)
		// g2.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BICUBIC)
		// g2.setRenderingHint(RenderingHints.KEY_STROKE_CONTROL, RenderingHints.VALUE_STROKE_PURE)
		g2.drawImage(image, 0, 0, thumbWidth, thumbHeight, null)
		g2.dispose()

		def thumbFile = new File(dirName, fileName)
	    def isOK = ImageIO.write(thumbImage, fileExt, thumbFile)

		if (! isOK) {
			log.error("Thumbnail created failure: ${thumbFile.path}")
		}
    }

	// @CompileStatic
	static void remove(delegate, fileName) {
		if (fileName == null) {
			return
		}
        def dirName = "${configHolder.persistFolder}/${delegate.class.simpleName}/${delegate.id}"

		boolean isDeleted =  new File(dirName, fileName).delete()
		if (! isDeleted) {
			log.error("image file deleted failure: ${dirName}/${fileName}")
		}

		dirName = dirName + '/' + THUMBNAIL_DIR

		isDeleted =  new File(dirName, fileName).delete()
		if (! isDeleted) {
			log.error("thumbnail file deleted failure: ${dirName}/${fileName}")
		}
    }

	/*
	 *
	 */
	private ImageHelper() {
    }
}
