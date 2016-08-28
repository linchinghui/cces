<%@ page import="static com.lch.aaa.Application.*" %>
<g:if test="${params['cb']}">
    <g:set var="dialogPage" value="${true}" scope="request"/>
    <g:set var="selfStyle" value="${true}" scope="request"/>
</g:if>
<g:else>
    <g:set var="modalPage" value="${true}" scope="request"/> <%--
    <g:set var="deferredScript" value="form/user" scope="request"/> --%>
</g:else>
<g:set var="actionTitle" value="${pageTitle}-${type=='C' ? '新增' : type=='U' ? '編輯' : ''}"/>
<g:set var="submitMehtod" value="${type=='C' ? 'POST' : type=='U' ? 'PUT' : ''}"/>
<!DOCTYPE html>
<html>
    <head>
        <meta name="layout" content="main" />
        <asset:stylesheet src="form/user"/>
    </head>
    <body>
        <div class="container" role="main">
            <div class="panel panel-info"><g:if test="${modalPage}">
                <div class="panel-heading">
                    <div class="panel-title">${actionTitle}</div>
                </div></g:if>
                <div class="panel-body"> <%--
                    <section class="content-header">
                        <g:render template="/layouts/server-message" bean="${user}"/>
                    </section> --%>
                    <section class="content">
                        <g:form resource="${user}" method="${submitMehtod}" role="form" class="form-horizontal" name="userForm">
                        <g:if test="${user}">
                            <g:if test="${_csrf?.parameterName}">
                              <input name='${_csrf?.parameterName}' type='hidden' value='${_csrf?.token}'/>
                            </g:if>
                            <fieldset class="form-group">
                                <f:with bean="user">
                                    <g:if test="${type=='C'}">
                                        <f:field property="username" label="登入帳號" widget-placeholder="英文字母(不含符號)" />
                                    </g:if>
                                    <g:else>
                                        <f:display property="username" label="登入帳號" />
                                    </g:else>
                                    <f:field property="fullname" label="姓名" />
                                    <g:if test="${type=='C'}">
                                        <f:field property="password" label="密碼">
                                            <g:passwordField name="password"/>
                                        </f:field>
                                    </g:if>
                                    <f:field property="enabled" label="登入" />
                                    <f:field property="accountLocked" label="鎖住" />
                                    <f:field property="accountExpired" label="帳號停用" />
                                    <f:field property="credentialsExpired" label="密碼過期" />
                                    <f:field property="roles" label="作業角色" />
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
    var editForm = $('#userForm');<%--
 1. title --%>
    $('.bootstrap-dialog-title').html('${actionTitle}');<%--
 2. message --%>
    <g:render template="/layouts/client-message" bean="${user}"/><%--
 3: pre-render--%>
    <g:if test="${type=='C'}">
    editForm.find('div.fieldcontain input[name="password"]').prop('required',true);
    </g:if>
    <g:else>
    editForm.find('div.fieldcontain').has('input[name="password"]').remove();
    </g:else><%--
 4: render and transform --%>
    <g:render template="/layouts/client-render" model="[formVar: 'editForm', renderCheckbox: true]"/><%--
 5. form variable and submit delegation & post-render --%>
    <g:render template="/layouts/client-submit" model="['formVar':'editForm']"/>
});
</asset:script>
    </body>
</html>
