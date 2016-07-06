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
        <asset:stylesheet src="form/materialSupplier"/>
    </head>
    <body>
        <div class="container" role="main">
            <div class="panel panel-info"><g:if test="${modalPage}">
                <div class="panel-heading">
                    <div class="panel-title">${pageTitle}</div>
                </div></g:if>
                <div class="panel-body"> <%--
                    <section class="content-header">
                        <g:render template="/layouts/server-message" bean="${materialSupplier}"/>
                    </section> --%>
                    <section class="content">
                        <g:form resource="${materialSupplier}" role="form" class="form-horizontal" name="materialSupplierForm">
                        <g:if test="${materialSupplier}">
                            <g:if test="${_csrf?.parameterName}">
                              <input name='${_csrf?.parameterName}' type='hidden' value='${_csrf?.token}'/>
                            </g:if>
                            <fieldset class="form-group">
                                <f:with bean="materialSupplier">
									<f:display property="material" label="材料" />
									<div class="col-xs-6"><f:display property="supplier" label="供應商" /></div>
									<div class="col-xs-6"><f:display property="brand" label="廠牌" /></div>
									<div class="col-xs-6"><f:display property="purchasedDate" label="購買日期" widget="date" /></div>
									<div class="col-xs-6"><f:display property="purchasedPrice" label="購買價格" /></div>
									<f:display property="saleman" label="業務員" />
									<div class="col-xs-6"><f:display property="phoneNo" label="電話" /></div>
									<div class="col-xs-6"><f:display property="faxNo" label="傳真電話" /></div>
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
    var showForm = $('#materialSupplierForm');
    <g:if test="${dialogPage}">
        $('.bootstrap-dialog-title').html('${pageTitle}');
    </g:if>
    <g:render template="/layouts/client-message" bean="${materialSupplier}"/>
    <g:render template="/layouts/client-render" model="[formVar: 'showForm']"/>
});
</asset:script>
    </body>
</html>
