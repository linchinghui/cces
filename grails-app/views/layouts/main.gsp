<g:if test="${dialogPage || embedPage}"><%--
	<g:javascript>
var server = {
	ctxParh: '${request.contextPath}'<g:if test="${_csrf?.parameterName}">, ${_csrf?.parameterName}: '${_csrf?.token}'</g:if>
};
	</g:javascript>--%>
    <g:if test="${embedPage}">
        <g:layoutBody />
    </g:if>
    <g:else>
        <div class="wrapper">
            <g:if test="${selfStyle}">
                <g:layoutHead/>
            </g:if>
            <g:layoutBody />
        </div>
    </g:else>
    <g:if test="${! selfStyle}">
        <asset:javascript src="${((deferredScript?:'') - ~/.js.*$/)?:'application'}"/>
    </g:if>
    <asset:deferredScripts/>
</g:if>
<g:else>
<!DOCTYPE html>
    <html lang="en" class="no-js">
        <head><%--
            <g:layoutHead/>--%>
            <meta charset="utf-8">
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
            <title><g:layoutTitle default="CCES - ${pageTitle}"/></title>
            <link rel="icon" href="${asset.assetPath(src: 'favicon.ico')}">
            <asset:stylesheet src="application"/>
            <g:if test="${! selfStyle}">
                <asset:stylesheet src="skin/almsaeedstudio"/>
            </g:if>
            <g:layoutHead/><%--
			<g:if test="${! exception}">--%>
				<g:javascript>
var server = {
ctxPath: '${request.contextPath}',
imgPath: '${grails.util.Holders.grailsApplication.config.cces.images.uriPrefix}'<g:if test="${_csrf?.parameterName}">,
xHeader: '${_csrf?.headerName.encodeAsBase64()}',
xToken: '${_csrf?.token.encodeAsBase64()}'</g:if>
};
				</g:javascript><%--
			</g:if>--%><%--
<!--[if lt IE 9]>
<asset:javascript src="iefix/html5shiv-3.7.3"/>
<asset:javascript src="iefix/respond-1.4.2"/>
<![endif]-->--%>
        </head>
        <body class="hold-transition skin-blue sidebar-mini${params?.sc?' sidebar-collapse':''}">
            <div class="wrapper">
                <g:if test="${modalPage}">
                    <g:layoutBody />
                </g:if>
                <g:else>
                    <%-- <g:set var="authService" bean="authenticationService" scope="request"/> --%>
                    <g:render template="/layouts/main-header" />
                    <g:render template="/layouts/main-sidebar" />
                    <g:layoutBody />
                </g:else>
            </div>
            <g:if test="${! selfStyle}">
                <asset:javascript src="${((deferredScript?:'') - ~/.js.*$/)?:'application'}"/>
            </g:if>
            <asset:deferredScripts/><%--
            <asset:javascript src="iefix/ie10-viewport"/>--%>
        </body>
    </html>
</g:else>
