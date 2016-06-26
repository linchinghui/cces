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
        <asset:stylesheet src="form/supplier"/>
    </head>
    <body>
        <div class="container" role="main">
            <div class="panel panel-info"><g:if test="${modalPage}">
                <div class="panel-heading">
                    <div class="panel-title">${actionTitle}</div>
                </div></g:if>
                <div class="panel-body"> <%--
                    <section class="content-header">
                        <g:render template="/layouts/server-message" bean="${supplier}"/>
                    </section> --%>
                    <section class="content">
                        <g:form resource="${supplier}" method="${submitMehtod}" role="form" class="form-horizontal" name="supplierForm">
                        <g:if test="${supplier}">
                            <g:if test="${_csrf?.parameterName}">
                              <input name='${_csrf?.parameterName}' type='hidden' value='${_csrf?.token}'/>
                            </g:if>
                            <fieldset class="form-group">
                                <f:with bean="supplier">
                                    <g:if test="${type=='C'}">
                                        <f:field property="code" label="代碼" widget-placeholder="輸入(不含符號的)英文字母" />
                                    </g:if>
                                    <g:else>
                                        <f:display property="code" label="代碼" />
                                    </g:else>
                                    <f:field property="name" label="供應商名稱" widget-placeholder="輸入中英文字母" />
                                    <f:field property="ubn" label="統一編號" />
                                    <f:field property="phoneNo" label="電話" />
                                    <f:field property="faxNo" label="傳真" />
                                    <f:field property="email" label="電子郵件" />
                                    <f:field property="contact" label="聯絡人" />
                                    <f:field property="contactPhoneNo" label="聯絡電話" />
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
    var editForm = $('#supplierForm');
    $('.bootstrap-dialog-title').html('${actionTitle}');
    <g:render template="/layouts/client-message" bean="${supplier}"/>
    <g:render template="/layouts/client-submit" model="[formVar: 'editForm']"/>
    <g:render template="/layouts/client-render" model="[formVar: 'editForm']"/>
    editForm.find('input[type=text],textarea').filter(':not([name=""]):enabled:visible:first').focus();
});
</asset:script>
    </body>
</html>
