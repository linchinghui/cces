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
        <asset:stylesheet src="form/certificate"/>
    </head>
    <body>
        <div class="container" role="main">
            <div class="panel panel-info"><g:if test="${modalPage}">
                <div class="panel-heading">
                    <div class="panel-title">${pageTitle}</div>
                </div></g:if>
                <div class="panel-body">
                    <section class="content">
                        <g:form resource="${certificate}" role="form" class="form-horizontal" name="certificateForm">
                        <g:if test="${certificate}">
                            <g:if test="${_csrf?.parameterName}">
                              <input name='${_csrf?.parameterName}' type='hidden' value='${_csrf?.token}'/>
                            </g:if>
                            <fieldset class="form-group">
                                <f:with bean="certificate">
									<f:display property="emp" label="員工" />
									<f:display property="category" label="證照類別" />
									<f:display property="title" label="證照名稱" />
                                    <f:display property="examDate" label="考取年月" wrapper="date" />
                                    <f:display property="expiryDate" label="有效年月" wrapper="date" />
                                    <f:display property="copied" label="證照影本繳交日" wrapper="date" />
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
    var showForm = $('#certificateForm');
    <g:if test="${dialogPage}">
        $('.bootstrap-dialog-title').html('${pageTitle}');
    </g:if>
    <g:render template="/layouts/client-message" bean="${certificate}"/>
    <g:render template="/layouts/client-render" model="[formVar: 'showForm']"/>
});
</asset:script>
    </body>
</html>
