<%@ page import="static com.lch.aaa.Application.*" %>
<g:if test="${params['cb']}">
    <g:set var="dialogPage" value="${true}" scope="request"/>
    <g:set var="selfStyle" value="${true}" scope="request"/>
</g:if>
<g:else>
    <g:set var="modalPage" value="${true}" scope="request"/> <%--
    <g:set var="deferredScript" value="list" scope="request"/> --%>
</g:else>
<g:set var="functionService" bean="functionService"/>
<g:set var="pageTitle" value="${functionService.get('user')?.description}"/>
<!DOCTYPE html>
<html>
    <head>
        <meta name="layout" content="main" />
        <title>CCES - ${pageTitle}</title>
        <asset:stylesheet src="form/user"/>
    </head>
    <body>
        <div class="container" role="main">
            <div class="panel panel-info"><g:if test="${modalPage}">
                <div class="panel-heading">
                    <div class="panel-title">${pageTitle}</div>
                </div></g:if>
                <div class="panel-body">
                    <section class="content-header">
                        <g:render template="/layouts/server-message" bean="${user}"/>
                    </section>
                    <section class="content">
                        <g:form resource="${user}" role="form" class="form-horizontal" name="userForm">
                        <g:if test="${user}">
                            <g:if test="${_csrf?.parameterName}">
                              <input name='${_csrf?.parameterName}' type='hidden' value='${_csrf?.token}'/>
                            </g:if>
                            <fieldset class="form-group">
                                <f:with bean="${user}">
                                    <f:display property="username" label="登入帳號" />
                                    <f:display property="fullname" label="姓名" />
                                    <f:display property="roles" label="作業角色" />
                                    <f:display property="enabled" label="登入" />
                                    <f:display property="accountLocked" label="鎖住" />
                                    <f:display property="accountExpired" label="帳號停用" />
                                    <f:display property="credentialsExpired" label="密碼過期" />
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
    var showForm = $('#userForm');
<%-- 1. title --%>
    <g:if test="${dialogPage}">
        $('.bootstrap-dialog-title').html('${pageTitle}');
    </g:if>
<%-- 2. message --%>
    <g:render template="/layouts/client-message" bean="${user}"/>
<%-- 5: render and transform --%>
    <g:render template="/layouts/client-render" model="[formVar: 'showForm', renderCheckbox: true]"/>
});
</asset:script>
    </body>
</html>
