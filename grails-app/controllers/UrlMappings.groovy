import static com.lch.aaa.Application.*
import grails.util.*
import org.codehaus.groovy.grails.commons.*
import org.springframework.security.web.authentication.rememberme.CookieTheftException

class UrlMappings {
    def grailsApplication

    static mappings = {

		"/images/**"		(controller: 'images', action: 'download')
        "/$controller/$action?/$id?(.$format)?" {
            constraints {
                // apply constraints here
            }
        }

        name home: '/'      (view: '/welcome')
        "$PAGE_LOGIN"       (view: PAGE_LOGIN)
        "$PAGE_PASSWORD"    (controller: 'user', action: 'changePassword')
        '403'               (view: PAGE_DENY)
        '404'               (view: PAGE_NOTFOUND)
        '406'               (view: PAGE_ERROR)
        '500'               (view: PAGE_ERROR)
        '500'               (view: PAGE_WELCOME, exception: CookieTheftException)
        '503'               (view: PAGE_MAINTENANCE)
        "$PAGE_DENY"        (view: PAGE_DENY)
        "$PAGE_NOTFOUND"    (view: PAGE_NOTFOUND)
        "$PAGE_ERROR"       (view: PAGE_ERROR)
		"$PAGE_MAINTENANCE" (view: PAGE_MAINTENANCE)
		// "$PAGE_MONITOR" 	(view: PAGE_MONITOR)

        def restControllers = Holders.grailsApplication.controllerClasses.findAll {
            GrailsClassUtils.getStaticPropertyValue(it.clazz, 'namespace') == NAMESPACE_API
        }

        restControllers.each { ctrl ->
            def resourceName = ctrl.logicalPropertyName
            resourceName =	resourceName[-1] == 'y' ? (resourceName - ~/y$/ + 'ies') :
							resourceName.endsWith('ch') ? (resourceName + 'es') : (resourceName + 's')
            "/api/$resourceName" (resources: ctrl.logicalPropertyName, namespace: NAMESPACE_API)
        }
    }
}
