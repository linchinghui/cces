package com.lch.aaa

import static Application.*
import com.lch.aaa.DefaultRoleType

import grails.util.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.boot.autoconfigure.security.SecurityProperties
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.io.ClassPathResource
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.AuthenticationProvider
// import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetailsService
// import org.springframework.security.core.session.SessionRegistry
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.builders.WebSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
// import org.springframework.security.web.access.intercept.FilterSecurityInterceptor
import org.springframework.security.web.authentication.AuthenticationSuccessHandler
import org.springframework.security.web.authentication.RememberMeServices
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository
import org.springframework.security.web.authentication.rememberme.PersistentTokenBasedRememberMeServices
// import org.springframework.security.web.authentication.session.SessionAuthenticationStrategy
// import org.springframework.security.web.context.SecurityContextPersistenceFilter
import org.springframework.security.web.util.matcher.AntPathRequestMatcher
// import org.springframework.web.filter.DelegatingFilterProxy
// import org.springframework.core.annotation.Order

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
// @Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
class SecurityConfigurer extends WebSecurityConfigurerAdapter {

	/*
	 * grails services
	 */
	@Autowired
	PersistentTokenRepository tokenRepository

	/*
	 * bean definitions
	 */
	@Autowired // @Qualifier('authenticationProvider')
	AuthenticationProvider authenticationProvider

	// @Autowired // @Qualifier('sessionAuthenticationStrategy')
	// SessionAuthenticationStrategy sessionAuthenticationStrategy
	// @Autowired // @Qualifier('sessionRegistry')
	// SessionRegistry sessionRegistry

	// @Autowired // @Qualifier('rememberMeServices')
	// RememberMeServices rememberMeServices

	// @Autowired
	// AuthenticationSuccessHandler authenticationSuccessHelperHandler

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		// SecurityContextHolder.setStrategyName(SecurityContextHolder.MODE_GLOBAL) // .MODE_INHERITABLETHREADLOCAL)

		auth
			// .eraseCredentials(true)
			.authenticationProvider(authenticationProvider)
			.userDetailsService(authenticationProvider.userDetailsService)
	}

	// //@Bean(name='authenticationManager')
	// @Override
	// public AuthenticationManager authenticationManagerBean() throws Exception {
	// 	return super.authenticationManagerBean()
	// }

	@Override
	public void configure(WebSecurity web) throws Exception {
		web
			// .debug(true)
			.ignoring()
			// .antMatchers('/**/favicon.ico', '/error', '/css/**', '/js/**', '/images/**') // '/**/*\\.{(js|css|gif|jpg|jpeg|png)}'
			.antMatchers('/images/**', '/thumbnails/**')
			.antMatchers('/assets/**', '/static/**')
			.antMatchers('/api/announcements.json*')
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		def csrfIgnores1 = [PAGE_LOGIN, PAGE_LOGOUT] as String[]
		def csrfIgnores2 = ['/info', '/health', '/pick/**'] as String[]
		// def csrfIgnores3 = ['/shutdown', PAGE_MONITOR, '/crash', '/console/**', '/dbconsole/**'] as String[]
		def csrfIgnores3 = ['/shutdown', '/console/**', '/dbconsole/**'] as String[]

		// def config = new ConfigSlurper().parse(new ClassPathResource("security-config.groovy").URL)
		def config = Holders.grailsApplication?.config
		def authenticationManager = authenticationManagerBean()

		// for console / dbconsole plugin:
		if (Environment.developmentMode) {
			http.headers().frameOptions().disable()
		// 	http.csrf().disable()
		// } else { // TODO:
		// // 	http.addFilterAfter(new CsrfHeaderFilter(), CsrfFilter.class)
		// // 		.and.csrf().requireCsrfProtectionMatcher { req ->
		// // 				def reqMethod = req.getMethod()
		// // 				return ! req.getServletPath().startsWith('/api/') && (
		// // 					'POST'.equals(reqMethod) ||
		// // 					'PUT'.equals(reqMethod) ||
		// // 					'DELETE'.equals(reqMethod) ||
		// // 					'PATCH'.equals(reqMethod)
		// // 				)
		// // 			}
		}

		http
			.csrf()
				.ignoringAntMatchers(csrfIgnores1)
				.ignoringAntMatchers(csrfIgnores2)
				.ignoringAntMatchers(csrfIgnores3)
			.and()
			.authorizeRequests()
				.antMatchers(PAGES_PERMITTED).permitAll()
				.antMatchers(csrfIgnores2).permitAll()
				.antMatchers(csrfIgnores3).hasRole(DefaultRoleType.ROLE_SUPERVISOR.springSecurityRoleName())
				.anyRequest().authenticated()
			.and()
				.formLogin()
				.successHandler(
						// authenticationSuccessHelperHandler)
						// new AuthenticationSuccessHelperHandler())
					new SavedRequestAwareAuthenticationSuccessHandler() {
						protected SavedRequestAwareAuthenticationSuccessHandler() {
							setTargetUrlParameter(PARAMETER_TARGET_URL)
						}
					}
				)
				.loginPage(PAGE_LOGIN)
				// .defaultSuccessUrl(PAGE_HOME)
				// .failureUrl("/login?error")
				.permitAll()
			.and()
				.logout()
				.logoutRequestMatcher(new AntPathRequestMatcher(PAGE_LOGOUT))
				// .logoutSuccessHandler(???)
				.logoutSuccessUrl(PAGE_LOGIN)
				.invalidateHttpSession(true)
				.deleteCookies('JSESSIONID', 'remember-me')
				.permitAll()
			.and()
				.rememberMe()
				.tokenRepository(tokenRepository)
				//.rememberMeServices(rememberMeServices)
				.tokenValiditySeconds(config?.aaa?.rememberMe.validitySeconds ?: 604800)
			.and()
				.exceptionHandling()
				.accessDeniedPage(PAGE_DENY)
			.and()
				.sessionManagement()
				.sessionFixation().none() //DEFAULT:.migrateSession() //.changeSessionId()
				// .sessionAuthenticationStrategy(sessionAuthenticationStrategy)
				// .sessionRegistry(sessionRegistry)
				.maximumSessions(100).maxSessionsPreventsLogin(false)
				.expiredUrl(PAGE_EXPIRED) // or /login?invalidated ???
				//? .invalidSessionUrl( "/login?time=1" )
	}
}
