<%@ page import="static com.lch.aaa.Application.*" %>
<g:if test="${params['cb']}">
	<g:set var="dialogPage" value="${true}" scope="request"/>
	<g:set var="selfStyle" value="${true}" scope="request"/>
</g:if>
<g:else>
	<g:set var="modalPage" value="${true}" scope="request"/> <%--
	<g:set var="deferredScript" value="???" scope="request"/> --%>
</g:else>
<g:set var="functionService" bean="functionService"/>
<g:set var="actionTitle" value="${pageTitle}-${type=='C' ? '新增' : type=='U' ? '編輯' : ''}"/>
<g:set var="submitMehtod" value="${type=='C' ? 'POST' : type=='U' ? 'PUT' : ''}"/>
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
					<div class="panel-title">${actionTitle}</div>
				</div></g:if>
				<div class="panel-body"> <%--
					<section class="content-header">
						<g:render template="/layouts/server-message" bean="${materialCategory}"/>
					</section> --%>
					<section class="content">
						<g:form resource="${materialCategory}" method="${submitMehtod}" role="form" class="form-horizontal" name="materialCategoryForm">
							<g:if test="${materialCategory}">
								<g:if test="${_csrf?.parameterName}">
								  <input name='${_csrf?.parameterName}' type='hidden' value='${_csrf?.token}'/>
								</g:if>
								<fieldset class="form-group">
									<f:with bean="materialCategory">
										<g:if test="${type=='C'}">
											<f:field property="code" label="類型代碼" widget-placeholder="英文字母(不含符號)" />
										</g:if>
										<g:else>
											<f:display property="code" label="類型代碼" />
										</g:else>
										<f:field property="description" label="類型名稱" />
									</f:with>
								</fieldset>
								<fieldset class="buttons">
									<input class="save btn btn-success" type="submit" value="確認" />
								</fieldset>
							</g:if>
						</g:form>
					</section>
				</div>
			</div>
		</div>
<asset:script type='text/javascript'><%-- deferred JS here --%>
$(function() {
	var editForm = $('#materialCategoryForm');
	$('.bootstrap-dialog-title').html('${actionTitle}');
	<g:render template="/layouts/client-message" bean="${materialCategory}"/>
	<g:render template="/layouts/client-render" model="[formVar: 'editForm']"/>
	<g:render template="/layouts/client-submit" model="[formVar: 'editForm']"/>
});
</asset:script>
	</body>
</html>
