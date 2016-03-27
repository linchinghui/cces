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
<g:set var="pageTitle" value="${functionService.get('worker')?.description}"/>
<!DOCTYPE html>
<html>
    <head>
        <meta name="layout" content="main" />
        <title>CCES - ${pageTitle}</title>
        <asset:stylesheet src="form/worker"/>
    </head>
    <body>
        <div class="container" role="main">
            <div class="panel panel-info"><g:if test="${modalPage}">
                <div class="panel-heading">
                    <div class="panel-title">${pageTitle}</div>
                </div></g:if>
                <div class="panel-body">
                    <section class="content-header">
                        <g:render template="/layouts/server-message" bean="${worker}"/>
                    </section>
                    <section class="content">
                        <g:form resource="${worker}" role="form" class="form-horizontal" name="workerForm">
                        <g:if test="${worker}">
                            <g:if test="${_csrf?.parameterName}">
                              <input name='${_csrf?.parameterName}' type='hidden' value='${_csrf?.token}'/>
                            </g:if>
                            <fieldset class="form-group">
                                <f:with bean="worker">
                                    <f:display property="empNo" label="員工編號" />
                                    <f:display property="empName" label="姓名" />
                                    <f:display property="sex" label="性別" />
                                    <f:display property="employedDate" label="到職日" widget="date" />
                                    <f:display property="resignedDate" label="離職日" widget="date" />
                                    <f:display property="avatarCopied" label="大頭照繳交日" widget="date" />
                                    <f:display property="idCardCopied" label="身分證影本繳交日" widget="date" />
                                    <f:display property="nhiIcCardCopied" label="健保卡影本繳交日" widget="date" />
                                    <f:display property="diplomaCopied" label="畢業證書影本繳交日" widget="date" />
                                    <f:display property="oorCopied" label="退伍令影本繳交日" widget="date" />
                                    <f:display property="gdlCopied" label="駕照影本繳交日" widget="date" />
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
    var showForm = $('#workerForm');
    <g:if test="${dialogPage}">
        $('.bootstrap-dialog-title').html('${pageTitle}');
    </g:if>
    <g:render template="/layouts/client-message" bean="${worker}"/>
    <g:render template="/layouts/client-render" model="[formVar: 'showForm']"/>
});
</asset:script>
    </body>
</html>
