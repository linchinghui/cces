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
		<asset:stylesheet src="form/materialCategory"/>
	</head>
	<body>
		<div class="container" role="main">
			<div class="panel panel-info"><g:if test="${modalPage}">
				<div class="panel-heading">
					<div class="panel-title">${pageTitle}</div>
				</div></g:if>
				<div class="panel-body"> <%--
					<section class="content-header">
						<g:render template="/layouts/server-message" bean="${materialCategory}"/>
					</section> --%>
					<section class="content">
						<g:form resource="${materialCategory}" role="form" class="form-horizontal" name="materialCategoryForm">
						<g:if test="${materialCategory}">
							<g:if test="${_csrf?.parameterName}">
								<input name='${_csrf?.parameterName}' type='hidden' value='${_csrf?.token}'/>
							</g:if>
							<fieldset class="form-group">
								<f:with bean="materialCategory">
									<f:display property="code" label="類型代碼" />
									<f:display property="description" label="類型名稱" />
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
	var showForm = $('#materialCategoryForm');
	<g:if test="${dialogPage}">
		$('.bootstrap-dialog-title').html('${pageTitle}');
	</g:if>
	<g:render template="/layouts/client-message" bean="${materialCategory}"/>
	<g:render template="/layouts/client-render" model="[formVar: 'showForm']"/>
});
</asset:script>
	</body>
</html>
