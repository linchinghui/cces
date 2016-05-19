import com.lch.aaa.*
import grails.rest.render.xml.XmlRenderer
import grails.rest.render.json.JsonRenderer
import org.springframework.boot.context.embedded.FilterRegistrationBean
import org.springframework.boot.context.embedded.ServletListenerRegistrationBean
import org.springframework.cache.ehcache.EhCacheFactoryBean
import org.springframework.cache.ehcache.EhCacheManagerFactoryBean
import org.springframework.core.Ordered
import org.springframework.security.authentication.AuthenticationTrustResolverImpl
import org.springframework.security.authentication.dao.DaoAuthenticationProvider
import org.springframework.security.config.authentication.CachingUserDetailsService
// import org.springframework.security.core.session.SessionRegistryImpl
import org.springframework.security.core.userdetails.cache.EhCacheBasedUserCache
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
// import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler
// import org.springframework.security.web.authentication.session.ConcurrentSessionControlStrategy
// import org.springframework.security.web.authentication.session.ConcurrentSessionControlAuthenticationStrategy
// import org.springframework.security.web.session.ConcurrentSessionFilter

// Place your Spring DSL code here
beans = {

	//importBeans('file:grails-app/conf/spring/integration.groovy')

	/*
	 * user cache
	 */
	userCache(EhCacheBasedUserCache) {
		cache = ref('ehCache')
	}
	ehCache(EhCacheFactoryBean) {
		cacheManager = ref('cacheManager')
		cacheName = 'userCache'
	}
	cacheManager(EhCacheManagerFactoryBean) {
		cacheManagerName = 'cces-' + UUID.randomUUID()
	}

	passwordEncoder(BCryptPasswordEncoder)

	// NOTE: securityService => Grails service (userDetailsService and tokenRepository)

	/*
	 * authentication provider
	 */
	authenticationProvider(DaoAuthenticationProvider) {
		userCache = ref('userCache')
		passwordEncoder = ref('passwordEncoder')
		userDetailsService = ref('securityService')
	}
	authenticationTrustResolver(AuthenticationTrustResolverImpl)

	// sessionRegistry(SessionRegistryImpl)
	// sessionAuthenticationStrategy(ConcurrentSessionControlAuthenticationStrategy, ref('sessionRegistry'))
}
