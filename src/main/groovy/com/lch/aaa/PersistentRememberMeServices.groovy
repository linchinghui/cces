package com.lch.aaa

import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.web.authentication.rememberme.PersistentRememberMeToken
import org.springframework.security.web.authentication.rememberme.PersistentTokenBasedRememberMeServices
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository

class PersistentRememberMeServices extends PersistentTokenBasedRememberMeServices {

	// private PersistentTokenRepository tokenRepository

	PersistentRememberMeServices(securityService) {
		super('_rm_',
			securityService, // UserDetailsService
			securityService) // PersistentTokenRepository
		// this.tokenRepository = securityService
	}

	@Override
	protected UserDetails processAutoLoginCookie(String[] cookieTokens, HttpServletRequest request, HttpServletResponse response) {
		def tokenRepository = (PersistentTokenRepository)getUserDetailsService()
		def token = tokenRepository.getTokenForSeries(cookieTokens[0]);
// println "\n\ncookieTokens: $cookieTokens / ${token.tokenValue} / ${getTokenValiditySeconds()}"
// println "${request.requestURI}"
// //println "request.getHeader('X-Requested-With'): ${request.getHeader('X-Requested-With')}"
// //println "request.requestURI.startsWith('/NAMESPACE_API/'): ${request.requestURI.startsWith('/'+NAMESPACE_API+'/')}"
// println "${request.method} params : ${params}"
// println "params?.id: ${params?.id}"
// println "request['isAjax']: ${request['isAjax']}"
// println "${request.requestURI.startsWith('/api/')}"
// println "request.getHeader('Origin'): ${request.getHeader('Origin')}\n\n"
		super.processAutoLoginCookie(cookieTokens, request, response)
	}


}