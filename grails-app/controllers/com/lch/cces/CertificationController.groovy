package com.lch.cces

import com.lch.aaa.*

class CertificationController extends BaseController<Certification> {

    static namespace = Application.NAMESPACE_API
	// static allowedMethods = [save: "POST", update: "PUT", patch: "PATCH", delete: "DELETE", upload: "POST"]

    CertificationController() {
        super(Certification)
    }

    private void resolveParameters(params) {
    	params?.findAll { attr ->
    		attr ==~ /file_.*/
    	}.each { param ->
            def mpName = param.key.replace('file_','')
            def mpFile = param.value
            println mpName + ' . ' + mpFile?.contentType?.split('/')[-1]
        }
  //   	println (params.collect { it.key })
		// def c = params['file_input']

		// def fileType = c?.contentType?.split('/')[-1]
		// println fileType
    }

    def upload() {
        resolveParameters(params)
        render 'xxx'
    }

    def save() {
        resolveParameters(params)
		super.save()
    }

    def update() {
        resolveParameters(params)
		super.update()
    }

}
