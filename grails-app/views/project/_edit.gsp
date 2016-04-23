<%@ page import="static com.lch.aaa.Application.*" %>
<g:if test="${params['cb']}">
    <g:set var="dialogPage" value="${true}" scope="request"/>
    <g:set var="selfStyle" value="${true}" scope="request"/>
</g:if>
<g:else>
    <g:set var="modalPage" value="${true}" scope="request"/> <%--
    <g:set var="deferredScript" value="???" scope="request"/> --%>
</g:else>
<g:set var="functionService" bean="functionService"/>
<g:set var="pageTitle" value="${functionService.get('project')?.description}-${type=='C' ? '新增' : type=='U' ? '編輯' : ''}"/>
<g:set var="submitMehtod" value="${type=='C' ? 'POST' : type=='U' ? 'PUT' : ''}"/>
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
                                        <f:field property="code" label="專案代碼" widget-placeholder="輸入(不含符號的)英文字母" />
                                    </g:if>
                                    <g:else>
                                        <f:display property="code" label="專案代碼" />
                                    </g:else>
                                    <f:field property="description" label="專案名稱 | 機台型號" />
                                    <f:field property="constructNo" label="序號" />
                                    <f:field property="constructPlace" label="工程地點" />
                                    <f:field property="constructType" label="施作方式" />
                                    <f:field property="durationBegin" label="期程-開始" widget="date" />
                                    <f:field property="durationEnd" label="期程-結束" widget="date" />
                                    <f:field property="contact" label="合約 | 委外編號" />
                                    <f:field property="customer" label="甲方" />
                                    <f:field property="contactPerson" label="聯絡人" />
                                    <f:field property="contactPhoneNo" label="手機" />
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
    $('.bootstrap-dialog-title').html('${pageTitle}');
    <g:render template="/layouts/client-message" bean="${project}"/>
    <g:render template="/layouts/client-submit" model="[formVar: 'editForm']"/>
    <g:render template="/layouts/client-render" model="[formVar: 'editForm']"/>
    $('input[type=text],textarea').filter(':enabled:visible:first').focus();
});
</asset:script>
    </body>
</html>
