import static com.lch.aaa.Application.*
import grails.util.*
import org.springframework.security.core.context.SecurityContextHolder

class AAAInterceptor {

    AAAInterceptor() {
        matchAll() // .excludes uri: ~/????/
    }

    boolean before() {

// log.debug "request.getHeader('X-Requested-With'): ${request.getHeader('X-Requested-With')}"

        request['isAjax'] = request.getHeader('X-Requested-With') == 'XMLHttpRequest' &&
                            request.requestURI.startsWith("/$NAMESPACE_API/")
        if (request['isAjax']) {
            response.setHeader('Expires', '-1')
            response.setHeader('Pragma', 'no-cache')
            response.setHeader('Cache-Control', 'no-cache')
        }
        if (request.getHeader('Origin')) {
            response.setHeader('Access-Control-Allow-Origin', request.getHeader('Origin'))
            response.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,OPTIONS')
            response.setHeader('Access-Control-Max-Age',"${Holders.grailsApplication.config?.aaa?.rememberMe.validitySeconds ?: 604800}")
            response.setHeader('Access-Control-Allow-Headers','Cookie,X-Requested-With')
            response.setHeader('Access-Control-Allow-Credentials','true')
            response.setHeader('Access-Control-Expose-Headers','Location')
        }
        if (params?.format == null &&
            request.format != 'all') {
            // request.format in ['xml', 'json']) {
            params['format'] = request.format
        }


// log.debug "${request.requestURI}"
// //println "request.getHeader('X-Requested-With'): ${request.getHeader('X-Requested-With')}"
// //println "request.requestURI.startsWith('/NAMESPACE_API/'): ${request.requestURI.startsWith('/'+NAMESPACE_API+'/')}"
log.debug "${request.method} params : ${params}"
// //println "params?.id: ${params?.id}"
// log.debug "request['isAjax']: ${request['isAjax']}"
// log.debug "API: ${request.requestURI.startsWith('/api/')}"
// log.debug "request.getHeader('callback'): ${request.getHeader('callback')}"
log.debug "request.format: ${request.format}"
// log.debug "params[format]: ${params['format']}"


        // if (controllerName == 'privilege') {
        //     println '=========================='
        // }


        true
    }

    boolean after() {
        if (request.forwardURI == PAGE_LOGIN &&
            request.queryString == null) {
            session['SPRING_SECURITY_LAST_EXCEPTION'] = null
        }
//log.debug "after : ${model} ${view} ${modelAndView}"
        true
    }

    void afterView() {
        if (request.exception) {
            def cause = request.exception.cause
            log.error(
                cause == null ? request.exception.message :
                cause.cause == null ? cause.message : cause.cause.message
            )
        }

//Cache-Control:no-cache
//Cache-Control:no-store

        // if (! response.isCommitted()) {
            if ((
                ! request['isAjax'] && 
                response.status < 300 &&
                SecurityContextHolder.context.authentication == null
            ) || (
                ! request.isRequestedSessionIdValid())
            ) {
// log.debug "response.status: ${response.status}"
// log.debug "authentication: ${SecurityContextHolder.context.authentication}"
// log.debug "isRequestedSessionIdValid(): ${request.isRequestedSessionIdValid()}"
                // redirect(mapping: 'home', params: params)
                // return
                request.getSession(false)?.invalidate()
            }
        // }
// log.debug "after view: ${model} ${view} ${modelAndView}\n"
    }
}
