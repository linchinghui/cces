package com.lch.aid

import javax.servlet.http.HttpServletRequest
import org.springframework.web.multipart.support.StandardServletMultipartResolver

public class EnhancedMultipartResolver extends StandardServletMultipartResolver {
	@Override
	public boolean isMultipart(HttpServletRequest request) {
		String m = request.getMethod().toLowerCase()
		if (! ("post".equals(m) || "put".equals(m))) {
			return false;
		}
		String contentType = request.getContentType();
		return (contentType != null && contentType.toLowerCase().startsWith("multipart/"));
	}

}
