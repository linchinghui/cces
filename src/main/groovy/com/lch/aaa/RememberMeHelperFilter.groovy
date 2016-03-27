package com.lch.aaa

import java.io.IOException
import javax.servlet.Filter
import javax.servlet.FilterChain
import javax.servlet.FilterConfig
import javax.servlet.ServletException
import javax.servlet.ServletRequest
import javax.servlet.ServletResponse
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
//import org.springframework.stereotype.Component
import org.springframework.security.web.authentication.rememberme.CookieTheftException
import org.slf4j.Logger
import org.slf4j.LoggerFactory

//@Component
public class RememberMeHelperFilter implements Filter {

    private static final Logger LOG = LoggerFactory.getLogger(RememberMeHelperFilter.class)

    public void init(FilterConfig config) {}

    public void destroy() {}

    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {
        // HttpServletResponse response = (HttpServletResponse) res
        // response.setHeader("Access-Control-Allow-Origin", "*")
        // response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
        // response.setHeader("Access-Control-Max-Age", "3600")
        // // response.setHeader("Access-Control-Allow-Headers", "x-requested-with")
        // response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")

        try {
            chain.doFilter(req, res)

        } catch (CookieTheftException cte) {
            LOG.error "\ndetect ==> ${cte.message}"

            def qs = ((HttpServletRequest)req).queryString
            ((HttpServletResponse)res).sendRedirect(qs?.size() > 0 ? Application.PAGE_HOME+'?'+qs : Application.PAGE_HOME)

        } catch (Exception e) {
            LOG.error "\nE ==> ${e.message}"
        }
    }

}