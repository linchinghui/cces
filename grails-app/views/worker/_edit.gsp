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
<g:set var="pageTitle" value="${functionService.get('worker')?.description}-${type=='C' ? '新增' : type=='U' ? '編輯' : ''}"/>
<g:set var="submitMehtod" value="${type=='C' ? 'POST' : type=='U' ? 'PUT' : ''}"/>
<!DOCTYPE html>
<html>
    <head>
        <meta name="layout" content="main" />
        <title>CCES - ${pageTitle}</title>
        <asset:stylesheet src="form/worker"/>
    </head>
    <body>
        <div class="container" role="main">
            <div class="panel panel-info"> <%--
                <div class="panel-heading">
                    <div class="panel-title">${pageTitle}</div>
                </div> --%>
                <div class="panel-body"> <%--
                    <section class="content-header">
                        <g:render template="/layouts/server-message" bean="${worker}"/>
                    </section> --%>
                    <section class="content">
                        <g:form resource="${worker}" method="${submitMehtod}" role="form" class="form-horizontal" name="workerForm">
                        <g:if test="${worker}">
                            <g:if test="${_csrf?.parameterName}">
                              <input name='${_csrf?.parameterName}' type='hidden' value='${_csrf?.token}'/>
                            </g:if>
                            <fieldset class="form-group">
                                <f:with bean="worker">
                                    <g:if test="${type=='C'}">
                                        <f:field property="empNo" label="員工編號" widget-placeholder="輸入(不含符號的)英文字母" />
                                    </g:if>
                                    <g:else>
                                        <f:display property="empNo" label="員工編號" />
                                    </g:else>
                                    <f:field property="empName" label="姓名" widget-placeholder="輸入中英文說明" />
                                    <f:field property="sex" label="姓別" />
                                    <f:field property="employedDate" label="到職日" widget="date" />
                                    <f:field property="resignedDate" label="離職日" widget="date" />
                                    <f:field property="avatarCopied" label="大頭照繳交日" widget="date" />
                                    <f:field property="idCardCopied" label="身分證影本繳交日" widget="date" />
                                    <f:field property="nhiIcCardCopied" label="健保卡影本繳交日" widget="date" />
                                    <f:field property="diplomaCopied" label="畢業證書影本繳交日" widget="date" />
                                    <f:field property="oorCopied" label="退伍令影本繳交日" widget="date" />
                                    <f:field property="gdlCopied" label="駕照影本繳交日" widget="date" />
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
    var editForm = $('#workerForm');
    $('.bootstrap-dialog-title').html('${pageTitle}');
    <g:render template="/layouts/client-message" bean="${worker}"/>
    <g:render template="/layouts/client-submit" model="[formVar: 'editForm']"/>
    <g:render template="/layouts/client-render" model="[formVar: 'editForm']"/>
});
</asset:script>
    </body>
</html>
