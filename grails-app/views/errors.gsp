<g:if test="${request.getHeader('X-CCES-NoAlert')}">
<%
	response.setHeader('X-CCES-NoAlert','true');
%>
</g:if>
<g:else>
	<g:if env="development">
	    <g:set var="modalPage" value="${true}" scope="request"/>
	</g:if>
	<!DOCTYPE html>
	<html>
	    <head>
	        <title><g:if env="development">Grails Runtime </g:if>Exception</title>
	        <meta name="layout" content="main"/>
	        <asset:stylesheet src="errors"/>
	    </head>
	    <body>
	        <div class="content-wrapper error-details" role="main">
	            <g:if env="development">
	                <g:if test="${Throwable.isInstance(exception)}">
	                    <g:renderException exception="${exception}" />
	                </g:if>
	                <g:elseif test="${request.getAttribute('javax.servlet.error.exception')}">
	                    <g:renderException exception="${request.getAttribute('javax.servlet.error.exception')}" />
	                </g:elseif>
	                <g:else>
	                    <ul class="error-details">
	                        An error has occurred
	                        <li>Exception: ${exception}</li>
	                        <li>Message: ${message}</li>
	                        <li>Path: ${path}</li>
	                    </dl>
	                </g:else>
	            </g:if>
	            <g:else>
	                <section class="content-header">
	                    <h1>Exception</h1>
	                </section>
	                <section class="content">
	                    <p>We're sorry, but the application has encountered an error.  Please try again.</p>
	                    <p>Message: ${message}</p>
	                </section>
	            </g:else>
	        </div>
	    </body>
	</html>
</g:else>
