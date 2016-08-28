<%@ page import="static com.lch.aaa.Application.*" %>
<g:if test="${params['cb']}">
    <g:set var="dialogPage" value="${true}" scope="request"/>
    <g:set var="selfStyle" value="${true}" scope="request"/>
</g:if>
<g:else>
    <g:set var="modalPage" value="${true}" scope="request"/> <%--
    <g:set var="deferredScript" value="???" scope="request"/> --%>
</g:else>
<g:set var="actionTitle" value="${pageTitle}-${type=='C' ? '新增' : type=='U' ? '編輯' : ''}"/>
<g:set var="submitMehtod" value="${type=='C' ? 'POST' : type=='U' ? 'PUT' : ''}"/>
<!DOCTYPE html>
<html>
    <head>
        <meta name="layout" content="main" />
        <asset:stylesheet src="form/materialSupplier"/>
    </head>
    <body>
        <div class="container" role="main">
            <div class="panel panel-info"><g:if test="${modalPage}">
                <div class="panel-heading">
                    <div class="panel-title">${actionTitle}</div>
                </div></g:if>
                <div class="panel-body"> <%--
                    <section class="content-header">
                        <g:render template="/layouts/server-message" bean="${materialSupplier}"/>
                    </section> --%>
                    <section class="content">
                        <g:form resource="${materialSupplier}" method="${submitMehtod}" role="form" class="form-horizontal" name="materialSupplierForm">
                        <g:if test="${materialSupplier}">
                            <g:if test="${_csrf?.parameterName}">
                              <input name='${_csrf?.parameterName}' type='hidden' value='${_csrf?.token}'/>
                            </g:if>
                            <fieldset class="form-group">
                                <f:with bean="materialSupplier">
									<g:if test="${type=='C' && params?.embed!='true'}">
										<f:field property="material" label="材料" />
									</g:if>
									<g:else>
										<f:display property="material" label="材料" />
									</g:else>
									<g:if test="${type=='C'}">
										<div class="col-xs-6"><f:field property="supplier" label="供應商" /></div>
										<div class="col-xs-6"><f:field property="brand" label="廠牌" /></div>
									</g:if>
									<g:else>
										<div class="col-xs-6"><f:display property="supplier" label="供應商" /></div>
										<div class="col-xs-6"><f:display property="brand" label="廠牌" /></div>
									</g:else>
									<div class="col-xs-6"><f:field property="purchasedDate" label="購買日期" widget="date" /></div>
									<div class="col-xs-6"><f:field property="purchasedPrice" label="購買價格" /></div>
									<f:field property="saleman" label="業務員" />
									<div class="col-xs-6"><f:field property="phoneNo" label="電話" /></div>
									<div class="col-xs-6"><f:field property="faxNo" label="傳真電話" /></div>
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
    var editForm = $('#materialSupplierForm');
    $('.bootstrap-dialog-title').html('${actionTitle}');
    <g:render template="/layouts/client-message" bean="${materialSupplier}"/>
    <g:render template="/layouts/client-render" model="[formVar: 'editForm', renderCheckbox: true]"/>
	<g:render template="/layouts/client-submit" model="[formVar: 'editForm']"/>
});
</asset:script>
    </body>
</html>
