<%@ page import="static com.lch.aaa.Application.*" %>
<g:if test="${params['cb']}">
    <g:set var="dialogPage" value="${true}" scope="request"/>
    <g:set var="selfStyle" value="${true}" scope="request"/>
</g:if>
<g:else>
    <g:set var="modalPage" value="${true}" scope="request"/>
</g:else>
<g:set var="functionService" bean="functionService"/>
<g:set var="pageTitle" value="${functionService.get('privilege')?.description}"/>
<!DOCTYPE html>
<html>
    <head>
        <meta name="layout" content="main" />
        <title>CCES - ${pageTitle}</title>
        <asset:stylesheet src="form/privilege"/>
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
                        <g:form resource="${privilege}" role="form" class="form-horizontal" name="privilegeForm">
                        <g:if test="${privilege}">
                            <g:if test="${_csrf?.parameterName}">
                              <input name='${_csrf?.parameterName}' type='hidden' value='${_csrf?.token}'/>
                            </g:if>
                            <fieldset class="form-group">
                                <f:with bean="privilege">
                                    <f:display property="role" label="作業角色" />
                                    <f:display property="function" label="作業項目" />
                                    <f:display property="canRead" label="可讀" />
                                    <f:display property="canWrite" label="可寫" />
                                    <f:display property="canDelete" label="可刪" />
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
    var showForm = $('#privilegeForm');
    <g:if test="${dialogPage}">
        $('.bootstrap-dialog-title').html('${pageTitle}');
    </g:if>
    <g:render template="/layouts/client-message" bean="${privilege}"/>
    <g:render template="/layouts/client-render" model="[formVar: 'showForm', renderCheckbox: true]"/>
});
</asset:script>
    </body>
</html>
