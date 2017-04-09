<g:if test="${dialogPage || embedPage}">
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
		<asset:javascript src="application"/>
	</g:else><%--
	<g:if test="${! selfStyle}">--%>
		<g:if test="${deferredScript != null}">
			<asset:javascript src="${deferredScript}"/>
		</g:if><%--
	</g:if>--%>
	<asset:deferredScripts/>
</g:if>
<g:else>
<!DOCTYPE html>
<html lang="en" class="no-js">
    <head>
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
        <g:layoutHead/>
<g:javascript>
var server = {
ctxPath: '${request.contextPath}',
imgPath: '${grails.util.Holders.grailsApplication.config.cces.images.uriPrefix.image}',
thumbPath: '${grails.util.Holders.grailsApplication.config.cces.images.uriPrefix.thumbnail}'
<g:if test="${_csrf?.parameterName}">
,xHeader: '${_csrf?.headerName.encodeAsBase64()}'
,xToken: '${_csrf?.token.encodeAsBase64()}'
</g:if>
};
</g:javascript><%--
	<g:if test="${modalPage}">--%>
		<asset:javascript src="jquery-2.2.4.js"/><%--
	</g:if>--%><%--
<!--[if lt IE 9]>
<asset:javascript src="iefix/html5shiv-3.7.3"/>
<asset:javascript src="iefix/respond-1.4.2"/>
<![endif]-->--%>
    </head>
    <body class="hold-transition skin-blue sidebar-mini${params?.sc?' sidebar-collapse':''}">
		<div class="wrapper">
			<g:if test="${! modalPage}">
				<g:render template="/layouts/main-header" />
				<g:if test="${! embedPage}">
					<g:render template="/layouts/main-sidebar" />
				</g:if>
			</g:if>
			<g:layoutBody /><%--
			<g:if test="${! selfStyle}">--%>
				<g:if test="${! embedPage}">
					<asset:javascript src="application"/>
				</g:if>
				<g:if test="${deferredScript != null}">
                	<asset:javascript src="${deferredScript}"/>
				</g:if><%--
			</g:if>--%>
		</div>
		<asset:deferredScripts/><%--
		<asset:javascript src="iefix/ie10-viewport"/>--%>
	</body>
</html>
</g:else>
