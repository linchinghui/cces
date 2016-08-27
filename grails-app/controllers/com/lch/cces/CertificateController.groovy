package com.lch.cces

import com.lch.aaa.*

class CertificateController extends BaseController<Certificate> {

    static namespace = Application.NAMESPACE_API

	CertificateController() {
		super(Certificate)
	}

	// private void resolveParameters(params) {
//   	params?.findAll { attr ->
//   		attr ==~ /file_.*/
//   	}.each { param ->
//           def mpName = param.key.replace('file_','')
//           def mpFile = param.value
//           println mpName + ' . ' + mpFile?.contentType?.split('/')[-1]
//       }
// //   	println (params.collect { it.key })
// // def c = params['file_input']
//
// // def fileType = c?.contentType?.split('/')[-1]
// // println fileType

	// }

// 	private List<Certificate> listAllCertificates(Map params) {
//         if (params?.embed == 'true') { // list all
//             params.remove('max')
//             params.remove('offset')
//         }
//
//         // resolveParameters(params)
// println "params: ${params}"
//         Certificate.where{
// 			if (params?.empId)  { emp.id == params.empId }
// 		}.list(params)
//     }
//
//     protected final List<Certificate> listAllResources(Map params) {
//         listAllCertificates(params)
//     }
//
//     protected final Certificate queryForResource(Serializable id) {
//         listAllCertificates(params)[0]
//     }

    // protected final Certificate createResource(Map params) {
    //     // resolveParameters(params)
    //     def props = params
	//
    //     if (params?.empId &&
    //         params?.empId != 'null') {
    //         props.emp = Worker.get(params.empId)
	// 		props.remove('empId')
    //     }
	//
    //     return resource.newInstance(props)
    // }
	//
    // protected final Certificate createResource() {
    //     return createResource(params)
    // }

	// def edit() {
	// 	// resolveParameters(params)
	//
	// 	if (params?.id) {
	// 		super.edit()
	//
	// 	} else {
	// 		// redirect action: 'create', params: params
	// 		def url = g.createLink action: 'create', params: params
	// 		redirect url: url
	// 	}
	// }

//
//   def upload() {
//       resolveParameters(params)
//       render 'xxx'
//   }
//
// 	def save() {
// 		// resolveParameters(params)
// println "params: ${params}"
// 		super.save()
// 	}
//
//   def update() {
// 	//   resolveParameters(params)
// println "params: ${params}"
// super.update()
//   }

}
