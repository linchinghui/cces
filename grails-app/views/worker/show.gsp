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
        <asset:stylesheet src="form/worker"/>
    </head>
    <body>
        <div class="container" role="main">
            <div class="panel panel-info"><g:if test="${modalPage}">
                <div class="panel-heading">
                    <div class="panel-title">${pageTitle}</div>
                </div></g:if>
                <div class="panel-body"> <%--
                    <section class="content-header">
                        <g:render template="/layouts/server-message" bean="${worker}"/>
                    </section> --%>
                    <section class="content">
                        <g:form resource="${worker}" role="form" class="form-horizontal" name="workerForm">
                        <g:if test="${worker}">
                            <g:if test="${_csrf?.parameterName}">
                              <input name='${_csrf?.parameterName}' type='hidden' value='${_csrf?.token}'/>
                            </g:if>
                            <fieldset class="form-group">
                                <f:with bean="worker">
                                    <f:display property="empNo" label="員工編號" />
                                    <div class="col-xs-6"><f:display property="empName" label="姓名" /></div>
                                    <div class="col-xs-6"><f:display property="sex" label="性別" /></div>
            <div class="col-xs-6"><f:display property="employedDate" label="到職日" wrapper="date" /></div>
            <div class="col-xs-6"><f:display property="resignedDate" label="離職日" wrapper="date" /></div>
            <div class="col-xs-6"><f:display property="avatarCopied" label="大頭照繳交日" wrapper="date" /></div>
			<div class="col-xs-6"><f:display property="avatarPhoto" label="大頭照" wrapper="photo" /></div>
            <div class="col-xs-6"><f:display property="idCardCopied" label="身分證影本繳交日" wrapper="date" /></div>
			<div class="col-xs-6"><f:display property="idCardPhoto" label="身分證影本" wrapper="photo" /></div>
            <div class="col-xs-6"><f:display property="nhiIcCardCopied" label="健保卡影本繳交日" wrapper="date" /></div>
			<div class="col-xs-6"><f:display property="nhiIcCardPhoto" label="健保卡影本" wrapper="photo" /></div>
            <div class="col-xs-6"><f:display property="diplomaCopied" label="畢業證書影本繳交日" wrapper="date" /></div>
			<div class="col-xs-6"><f:display property="diplomaPhoto" label="畢業證書影本" wrapper="photo" /></div>
            <div class="col-xs-6"><f:display property="oorCopied" label="退伍令影本繳交日" wrapper="date" /></div>
			<div class="col-xs-6"><f:display property="oorPhoto" label="退伍令影本" wrapper="photo" /></div>
            <div class="col-xs-6"><f:display property="gdlCopied" label="駕照影本繳交日" wrapper="date" /></div>
			<div class="col-xs-6"><f:display property="gdlPhoto" label="駕照影本" wrapper="photo" /></div>
                                </f:with>
                            </fieldset>
                        </g:if>
                        </g:form>
                    </section>
                </div>
				<div class="panel-footer small text-danger text-right">點選縮圖可放大預覧</div>
            </div>
        </div>
<asset:javascript src="picture"/>
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
