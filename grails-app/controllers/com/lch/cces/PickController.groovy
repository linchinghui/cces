package com.lch.cces

import static com.lch.aaa.Application.*
import com.lch.aaa.BaseController

class PickController extends BaseController<Worker> {

	static namespace = NAMESPACE_API

    static allowedMethods = [upload: ['GET', 'POST']]

PickController() {
  super(Worker)
}
    def index() {
			// render view: 'index', model: [ 'img': new Img() ]
    }
    def upload() {
println "params: $params"
      def f = request.getFile('idPhoto')

// 			if (! f?.isEmpty()) {
// println "f is not null"
// 				println f.filename
//
// 	      f.transferTo(new File('/tmp/'+params?.idPhoto.filename?:'a.jpg'))
// 			}
// 			def i = new Img()
// // println "getObjectToBind(): " + getObjectToBind()
// // println "i.properties: " + i.properties
// 			// i.properties = params
// 			// bindData i getObjectToBind()
// 			// i.properties = getObjectToBind()
// 			i.photo = params?.photo
//
// 			println i

    }
}
