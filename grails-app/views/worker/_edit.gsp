<%@ page import="static com.lch.aaa.Application.*" %>
<%@ page import="java.util.Calendar" %>
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
		<asset:stylesheet src="form/worker"/>
    </head>
    <body>
        <div class="container" role="main">
            <div class="panel panel-info"><g:if test="${modalPage}">
                <div class="panel-heading">
                    <div class="panel-title">${actionTitle}</div>
                </div></g:if>
                <div class="panel-body"> <%--
                    <section class="content-header">
                        <g:render template="/layouts/server-message" bean="${worker}"/>
                    </section> --%>
                    <section class="content">
                        <g:uploadForm resource="${worker}" method="${submitMehtod}" role="form" class="form-horizontal" name="workerForm">
                        <g:if test="${worker}">
                            <g:if test="${_csrf?.parameterName}">
                              <input name='${_csrf?.parameterName}' type='hidden' value='${_csrf?.token}'/>
                            </g:if>
                            <fieldset class="form-group">
                                <f:with bean="worker">
                                    <g:if test="${type=='C'}">
                                        <f:field property="empNo" label="員工編號" widget-placeholder="英文字母(不含符號)" />
                                    </g:if>
                                    <g:else>
                                        <f:display property="empNo" label="員工編號" />
                                    </g:else>
                                    <div class="col-xs-6"><f:field property="empName" label="姓名" /></div>
									<div class="col-xs-6"><f:field property="sex" label="姓別" /></div>
			<div class="col-xs-6"><f:field property="employedDate" label="到職日" widget="date" value="${type=='C'?Calendar.instance:worker.employedDate}"/></div>
            <div class="col-xs-6"><f:field property="resignedDate" label="離職日" widget="date" /></div>
            <div class="col-xs-6"><f:field property="avatarCopied" label="大頭照繳交日" widget="date" /></div>
			<div class="col-xs-6"><f:field property="avatarPhoto" label="大頭照" widget="photo" /></div>
			<div class="col-xs-6"><f:field property="idCardCopied" label="身分證影本繳交日" widget="date" /></div>
			<div class="col-xs-6"><f:field property="idCardPhoto" label="身分證影本" widget="photo" /></div>
            <div class="col-xs-6"><f:field property="nhiIcCardCopied" label="健保卡影本繳交日" widget="date" /></div>
			<div class="col-xs-6"><f:field property="nhiIcCardPhoto" label="健保卡影本" widget="photo" /></div>
            <div class="col-xs-6"><f:field property="diplomaCopied" label="畢業證書影本繳交日" widget="date" /></div>
			<div class="col-xs-6"><f:field property="diplomaPhoto" label="畢業證書影本" widget="photo" /></div>
            <div class="col-xs-6"><f:field property="oorCopied" label="退伍令影本繳交日" widget="date" /></div>
			<div class="col-xs-6"><f:field property="oorPhoto" label="退伍令影本" widget="photo" /></div>
			<div class="col-xs-6"><f:field property="gdlCopied" label="駕照影本繳交日" widget="date" /></div>
			<div class="col-xs-6"><f:field property="gdlPhoto" label="駕照影本" widget="photo" /></div>
                                </f:with>
                            </fieldset>
                            <fieldset class="buttons">
                                <input class="save btn btn-success" type="submit" value="確認" />
                            </fieldset>
                        </g:if>
                        </g:uploadForm>
                    </section>
                </div>
				<g:if test="${type=='U'}">
					<div class="panel-footer small text-danger text-right">點選原縮圖可放大預覧</div>
				</g:if>				
            </div>
        </div>
<asset:javascript src="picture"/>
<asset:script type='text/javascript'><%-- deferred JS here --%>
$(function() {
    var editForm = $('#workerForm');
    $('.bootstrap-dialog-title').html('${actionTitle}');
<%-- fix: PUT not support for Spring
	$('input[type="submit"]').click(function() {
		editForm.method='POST';
	}); --%>
    <g:render template="/layouts/client-message" bean="${worker}"/>
    <g:render template="/layouts/client-render" model="[formVar: 'editForm']"/>
	<g:render template="/layouts/client-submit" model="[formVar: 'editForm']"/>
});
</asset:script>
    </body>
</html>
