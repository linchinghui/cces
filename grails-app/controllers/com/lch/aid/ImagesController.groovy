package com.lch.aid

import com.lch.cces.*

class ImagesController {
	private def getUri() {
		// return request.requestURI.decodeURL() -
		// 	// "${request.contextPath}${grailsApplication.config.cces.images.uriPrefix}"
		// 	~/^${request.contextPath?'\\'+request.contextPath:''}\${grailsApplication.config.cces.images.uriPrefix}\//
		return [params?.type, params?.id, params?.file].join('/')
	}

	private def getType(path) {
		def type = ''

		if (path) {
			type = path.split('\\.')[-1]
		}
		if (type ==~ /(jpg|jpeg)/) {
			type = 'jpeg'
		} else if (type != 'png') {
			type = 'png'
		}
		return type
	}

    def download() {
		def uri = getUri()
		def type = getType(uri)

		response.contentType = "image/$type"

		def out = response.outputStream
		out << ImageHelper.getImageBytes(uri)
		out.flush()
	}

    def reduce() {
		def uri = getUri()
		def type = getType(uri)

		response.contentType = "text/plain"

		def out = response.outputStream
		out << "data:image/$type;base64,"
		out << ImageHelper.getImageBase64(uri, true)
		out.flush()
	}
}
