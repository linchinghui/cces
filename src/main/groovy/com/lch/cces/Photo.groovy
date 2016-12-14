package com.lch.cces

import grails.converters.JSON
import java.awt.image.BufferedImage
import javax.imageio.ImageIO
import org.springframework.web.multipart.MultipartFile

public class Photo implements Serializable {

	private boolean isSet = false

	// for persist
	private MultipartFile multipartFile

	// from retrieve
	private String className
	private String objectId
	private String filename

	public Photo(MultipartFile multipartFile) {
		this.multipartFile = multipartFile
		this.filename = multipartFile?.originalFilename
		this.isSet = true
	}

	public Photo(String className, String objectId, String filename) {
		this.className = className
		this.objectId = objectId
		this.filename = filename
	}

	def MultipartFile getMultipartFile() {
		(multipartFile && ! multipartFile?.isEmpty()) ? multipartFile : null
	}

	public String toString() {
		filename
	}

	public def getUri() {
		/*isSet ? null :*/ [className, objectId, filename].join('/')
	}

	// def boolean isEmpty() {
	// 	isSet ? (getMultipartFile()==null) : (filename?.size()==0)
	// }

	// --- image ---
	def BufferedImage getImage() {
		isSet ? ImageHelper.getImage(multipartFile) : ImageHelper.getImage(getUri())
	}
	// Base64 string of image
    def String getImageBase64() {
		isSet ? ImageHelper.getImageBase64(multipartFile) : ImageHelper.getImageBase64(getUri())
	}

	// --- thumbnail ---
    def BufferedImage getThumbnail() {
		if (isSet) {
			throw new UnsupportedOperationException()
		}
		return ImageHelper.getImage(getUri(), true)
	}
	// Base64 string of thumbnail
    def String getThumbnailBase64() {
		if (isSet) {
			throw new UnsupportedOperationException()
		}
		return ImageHelper.getImageBase64(getUri(), true)
	}
}
