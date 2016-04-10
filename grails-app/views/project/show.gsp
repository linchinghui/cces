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
<g:set var="pageTitle" value="${functionService.get('project')?.description}"/>
<!DOCTYPE html>
<html>
    <head>
        <meta name="layout" content="main" />
        <title>CCES - ${pageTitle}</title>
        <asset:stylesheet src="form/project"/>
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
                        <g:form resource="${project}" role="form" class="form-horizontal" name="projectForm">
                        <g:if test="${project}">
                            <g:if test="${_csrf?.parameterName}">
                              <input name='${_csrf?.parameterName}' type='hidden' value='${_csrf?.token}'/>
                            </g:if>
                            <fieldset class="form-group">
                                <f:with bean="project">
                                    <f:display property="code" label="專案代碼" />
                                    <f:display property="description" label="專案名稱 | 機台型號" />
                                    <f:display property="constructNo" label="序號" />
                                    <f:display property="constructPlace" label="工程地點" />
                                    <f:display property="constructType" label="施作方式" />
                                    <f:display property="durationBegin" label="期程-開始" wrapper="date" />
                                    <f:display property="durationEnd" label="期程-結束" wrapper="date" />
                                    <f:display property="contact" label="合約 | 委外編號" />
                                    <f:display property="customer" label="甲方" />
                                    <f:display property="contactPerson" label="聯絡人" />
                                    <f:display property="contactPhoneNo" label="手機" />
                                    <f:display property="note" label="備註" />
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
    var showForm = $('#projectForm');
    <g:if test="${dialogPage}">
        $('.bootstrap-dialog-title').html('${pageTitle}');
    </g:if>
    <g:render template="/layouts/client-message" bean="${project}"/>
    <g:render template="/layouts/client-render" model="[formVar: 'showForm']"/>
});
</asset:script>
    </body>
</html>
