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
        <asset:stylesheet src="form/project"/>
    </head>
    <body>
        <div class="container" role="main">
            <div class="panel panel-info"><g:if test="${modalPage}">
                <div class="panel-heading">
                    <div class="panel-title">${actionTitle}</div>
                </div></g:if>
                <div class="panel-body"> <%--
                    <section class="content-header">
                        <g:render template="/layouts/server-message" bean="${project}"/>
                    </section> --%>
                    <section class="content">
                        <g:form resource="${project}" method="${submitMehtod}" role="form" class="form-horizontal" name="projectForm">
                        <g:if test="${project}">
                            <g:if test="${_csrf?.parameterName}">
                              <input name='${_csrf?.parameterName}' type='hidden' value='${_csrf?.token}'/>
                            </g:if>
                            <fieldset class="form-group">
                                <f:with bean="project">

                                    <g:if test="${type=='C'}">
                <div class="col-xs-6"><f:field property="code" label="專案代碼" widget-placeholder="英文字母(不含符號)" /></div>
                                    </g:if>
                                    <g:else>
                <div class="col-xs-6"><f:display property="code" label="專案代碼" /></div>
                                    </g:else>
                                    <f:field property="description" label="專案名稱" />
                <div class="col-xs-6"><f:field property="constructNo" label="機台型號" /></div>
				<div class="col-xs-6"><f:field property="constructModel" label="機台類型" /></div>
									<f:field property="constructPlace" label="工程地點" />
                <div class="col-xs-6"><f:field property="projectType" label="工作型態" /></div>
                <div class="col-xs-6"><f:field property="constructType" label="施作方式" /></div>
                <div class="col-xs-6"><f:field property="durationBegin" label="期程-開始" widget="date" /></div>
                <div class="col-xs-6"><f:field property="durationEnd" label="期程-結束" widget="date" /></div>
                                    <f:field property="contact" label="合約 | 委外編號" />
                                    <f:field property="customer" label="甲方" />
	            <div class="col-xs-6"><f:field property="contactPerson" label="聯絡人" /></div>
	            <div class="col-xs-6"><f:field property="contactPhoneNo" label="手機" /></div>
                                    <f:field property="note" label="備註" />
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
    var editForm = $('#projectForm');
    $('.bootstrap-dialog-title').html('${actionTitle}');
    <g:render template="/layouts/client-message" bean="${project}"/>
    <g:render template="/layouts/client-render" model="[formVar: 'editForm']"/>
	<g:render template="/layouts/client-submit" model="[formVar: 'editForm']"/>
});
</asset:script>
    </body>
</html>
