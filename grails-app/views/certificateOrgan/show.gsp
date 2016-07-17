<%@ page import="static com.lch.aaa.Application.*" %>
<g:if test="${params['cb']}">
	<g:set var="dialogPage" value="${true}" scope="request"/>
	<g:set var="selfStyle" value="${true}" scope="request"/>
</g:if>
<g:else>
	<g:set var="modalPage" value="${true}" scope="request"/> <%--
	<g:set var="deferredScript" value="???" scope="request"/> --%>
</g:else>
<!DOCTYPE html>
<html>
	<head>
		<meta name="layout" content="main" />
		<asset:stylesheet src="form/certificateOrgan"/>
	</head>
	<body>
		<div class="container" role="main">
			<div class="panel panel-info"><g:if test="${modalPage}">
				<div class="panel-heading">
					<div class="panel-title">${pageTitle}</div>
				</div></g:if>
				<div class="panel-body"> <%--
					<section class="content-header">
						<g:render template="/layouts/server-message" bean="${certificateOrgan}"/>
					</section> --%>
					<section class="content">
						<g:form resource="${certificateOrgan}" role="form" class="form-horizontal" name="certificateOrganForm">
						<g:if test="${certificateOrgan}">
							<g:if test="${_csrf?.parameterName}">
								<input name='${_csrf?.parameterName}' type='hidden' value='${_csrf?.token}'/>
							</g:if>
							<fieldset class="form-group">
								<f:with bean="certificateOrgan">
									<f:display property="code" label="機構代碼" />
									<f:display property="description" label="機構名稱" />
								</f:with>
							</fieldset>
						</g:if>
						</g:form>
					</section>
				</div>
			</div>
		</div>
<asset:script type='text/javascript'><%-- deferred JS here --%>
$(function() {
	var showForm = $('#certificateOrganForm');
	<g:if test="${dialogPage}">
		$('.bootstrap-dialog-title').html('${pageTitle}');
	</g:if>
	<g:render template="/layouts/client-message" bean="${certificateOrgan}"/>
	<g:render template="/layouts/client-render" model="[formVar: 'showForm']"/>
});
</asset:script>
	</body>
</html>
