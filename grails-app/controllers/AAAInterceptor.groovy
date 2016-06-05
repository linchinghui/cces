import static com.lch.aaa.Application.*
import grails.util.*
import org.springframework.security.core.context.SecurityContextHolder

class AAAInterceptor {

    AAAInterceptor() {
        matchAll() // .excludes uri: ~/????/
    }

    boolean before() {
        request['isAjax'] = request.getHeader('X-Requested-With') == 'XMLHttpRequest' &&
                            request.requestURI.startsWith("${request.contextPath}/$NAMESPACE_API/")

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

        log.debug "${request.method} params : ${params}"
        log.debug "request.format: ${request.format}"

        if (session['SPRING_SECURITY_CONTEXT']?.authentication &&
            SecurityContextHolder.context.authentication == null
        ) {
            SecurityContextHolder.context.authentication = session['SPRING_SECURITY_CONTEXT'].authentication
        }
        true
    }

    boolean after() {
        if ((request.forwardURI - request.contextPath) == PAGE_LOGIN && request.queryString == null) {
            session['SPRING_SECURITY_LAST_EXCEPTION'] = null
        }
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

        // if (! response.isCommitted()) {
            if ((
                ! request['isAjax'] &&
                response.status < 300 &&
                SecurityContextHolder.context.authentication == null
            ) || (
                ! request.isRequestedSessionIdValid())
            ) {
                // redirect(mapping: 'home', params: params)
                // return
                request.getSession(false)?.invalidate()
            }
        // }
    }
}
