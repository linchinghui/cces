package com.lch.aid

import com.lch.cces.*

class ImagesController {
    def download() {
		def type = ''
		def out = response.outputStream
		def uri = request.requestURI.decodeURL() -
		// "${request.contextPath}${grails.util.Holders.grailsApplication.config.cces.images.uriPrefix}"
		 ~/^${request.contextPath?'\\'+request.contextPath:''}\${grails.util.Holders.grailsApplication.config.cces.images.uriPrefix}\//

		if (uri) {
			type = uri.split('\\.')[-1]
		}
		if (type ==~ /(jpg|jpeg)/) {
			type = 'jpeg'
		} else if (type != 'png') {
			type = 'png'
		}

		response.contentType = "image/$type"
		out << ImageHelper.getImageBytes(uri)
		out.flush()
	}
}
