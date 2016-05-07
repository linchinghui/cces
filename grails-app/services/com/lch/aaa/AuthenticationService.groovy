package com.lch.aaa

import grails.transaction.Transactional
import grails.util.Holders
import org.grails.web.util.WebUtils
import org.springframework.security.core.context.SecurityContextHolder as SCH
import org.springframework.security.web.authentication.session.SessionAuthenticationException

@Transactional(readOnly = true)
class AuthenticationService {

	def authenticationTrustResolver
	def roleService
	def privilegeService

	// def getAuthentication() {
	// 	SCH.context?.authentication
	// }

	boolean isLoggedIn() {
		def authentication = SCH.context.authentication
		authentication && ! authenticationTrustResolver.isAnonymous(authentication)
	}

	def getPrincipal() {
		// def p = SCH.context?.authentication?.principal
		// return (p.toString() ==~ /^anonymous.*/ ? '訪客' : p.toString())
		return isLoggedIn() ? SCH.context?.authentication?.principal : '訪客'
	}

	def getAuthorities() {
		return SCH.context?.authentication?.authorities?.collect {[
			authority: it.authority,
			// description: (it.authority ==~ '.*ANONYMOUS$' ? '訪客' : roleService.get(it.authority)?.description)
			description: (isLoggedIn() ? roleService.get(it.authority)?.description : '訪客')
		]}
	}

	def getPrivileges() {
		def session = WebUtils.retrieveGrailsWebRequest().session
		// def roles = SCH.context?.authentication?.authorities?.collect { // BUG!
		def roles = session['SPRING_SECURITY_CONTEXT']?.authentication?.authorities?.collect {
			roleService.get(it.authority)
		}

		roles ? privilegeService.listByRoles(roles*.id) : []
	}

	def getLastException() {
		def session = WebUtils.retrieveGrailsWebRequest().session
		return session['SPRING_SECURITY_LAST_EXCEPTION']
	}

	boolean hasAuthenticationException() {
		def session = WebUtils.retrieveGrailsWebRequest().session
		return session['SPRING_SECURITY_LAST_EXCEPTION'] instanceof SessionAuthenticationException
	}

	void changePasswordOnline(confPassword, newPassword) throws AuthenticationException {
		changePassword(this.principal?.username, confPassword, newPassword)
	}

	@Transactional
	void changePassword(userId, confPassword, newPassword) throws AuthenticationException {
		com.lch.aaa.User u = com.lch.aaa.User.get(userId)

		if (! (u && Holders.applicationContext.passwordEncoder?.matches(confPassword, u.password))) {
			// def messageSource = Holders.applicationContext.getBean("messageSource")
			// throw new AuthenticationException(messageSource.getMessage('AbstractUserDetailsAuthenticationProvider.badCredentials'...))
			throw new AuthenticationException('用戶憑證/密碼不正確')
		}

		u.password = newPassword
		u.save(flush: true)
	}
}
