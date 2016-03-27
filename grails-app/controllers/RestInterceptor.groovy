import org.grails.web.util.GrailsApplicationAttributes

class RestInterceptor {

RestInterceptor() {
    //match controller: ~/.*Rest$/
    //match namespace: Application.NAMESPACE_API
  }
    boolean before() {

        // request.withFormat {
        //     html {
        //         println 'HTML format'
        //     }
        //     xml {
        //         println 'XML format'
        //     }
        //     json {
        //         println 'JSON format'
        //     }
        // }





    	// println "Int. request headers: ${request.headers}"
    	// println "Int. request URI: ${request.requestURI}"
    	// //println "Int. request attrs: ${request.attributeNames}"
    	// request.attributeNames.each {
    	// 	println it
    	// }
    	// println "Int. controller name: $controllerName"
    	//println "Int.before action name: $actionName"
     true
      }

    boolean after() {
        // println "Int. controller name: $controllerName"
        // println "Int.before action name: $actionName"
        // println "Int. request headers: ${request.headers}"
        // println "Int. request URI: ${request.requestURI}"
        // println "Int. request attrs: ${request.attributeNames}"
        // request.attributeNames.each {
        //  println it
        // }
    //println "REST currentRequestAttributes: ${currentRequestAttributes().getAttribute(GrailsApplicationAttributes.MODEL_AND_VIEW, 0)}"
        // println "REST model: $model"
     true 
 }

    void afterView() {
        // this.metaClass.properties.each {
        //   println this.&"${it.name}"
        // }
        // throwable, servletContext, controllerClass, response, controllerName, mimeUtility, 
        // grailsAttributes, urlConverter, applicationContext, flash, class, grailsLinkGenerator,
        // actionName, order, requestDataValueProcessor, matchers, actionResultTransformers, 
        // controllerNamespace, session, groovyPageLayoutFinder, webRequest, redirectListeners, 
        // view, modelAndView, pluginContextPath, params, chainModel, model, grailsApplication, 
        // 
        // request, useJsessionId
        // println "throwable: $throwable"
        // println "controllerName: $controllerName"
        // println "REST flash?: $flash"
        // println "actionName: $actionName"
        // println "order: $order"
        // println "controllerNamespace: $controllerNamespace"
        //println "session: $session"
    //println "view: $view"
    //println "REST 2 currentRequestAttributes: ${currentRequestAttributes().getAttribute(GrailsApplicationAttributes.MODEL_AND_VIEW, 0)}"
    //     println "REST modelAndView ?: $modelAndView"
    //     println "REST params: $params"
  //  println "model: $model"
        // println "useJsessionId: $useJsessionId"
    }
}
