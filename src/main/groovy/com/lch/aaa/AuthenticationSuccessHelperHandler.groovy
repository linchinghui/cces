package com.lch.aaa

import javax.servlet.*
import javax.servlet.http.*
import org.springframework.security.core.Authentication
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler

class AuthenticationSuccessHelperHandler extends SavedRequestAwareAuthenticationSuccessHandler {

	//@Override
	protected AuthenticationSuccessHelperHandler() {
//println '--- protected AuthenticationSuccessHelperHandler() ---'
		setTargetUrlParameter('_tu_') // targetUrl
	}

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
			throws IOException, ServletException {
		//println '--- AuthenticationSuccessHelperHandler ---'			
	}
}