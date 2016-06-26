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
<g:set var="actionTitle" value="${pageTitle}-${type=='C' ? '新增' : type=='U' ? '編輯' : ''}"/>
<g:set var="submitMehtod" value="${type=='C' ? 'POST' : type=='U' ? 'PUT' : ''}"/>
<!DOCTYPE html>
<html>
    <head>
        <meta name="layout" content="main" />
        <asset:stylesheet src="form/spTask"/>
    </head>
    <body>
        <div class="container" role="main">
            <div class="panel panel-info"><g:if test="${modalPage}">
                <div class="panel-heading">
                    <div class="panel-title">${actionTitle}</div>
                </div></g:if>
                <div class="panel-body"> <%--
                    <section class="content-header">
                        <g:render template="/layouts/server-message" bean="${spTask}"/>
                    </section> --%>
                    <section class="content">
                        <g:form resource="${spTask}" method="${submitMehtod}" role="form" class="form-horizontal" name="spTaskForm">
                        <g:if test="${spTask}">
                            <g:if test="${_csrf?.parameterName}">
                              <input name='${_csrf?.parameterName}' type='hidden' value='${_csrf?.token}'/>
                            </g:if>
                            <fieldset class="form-group">
                                <f:with bean="spTask">
                                    <g:if test="${type=='C' && ! dialogPage}">
                                        <f:field property="project" label="專案" />
                                        <f:field property="workedDate" label="施作日期" widget="date" />
                                    </g:if>
                                    <g:else>
                                        <f:display property="project" label="專案" />
                                        <f:display property="workedDate" label="施作日期" wrapper="date" />
                                    </g:else>
                                    <f:field property="constructPlace" label="工程地點" />
                                    <f:field property="equipment" label="機台型號" />
                                    <f:field property="employee" label="工作人員" />
                                    <f:field property="constructType" label="施作方式" />
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
    var editForm = $('#spTaskForm');
    $('.bootstrap-dialog-title').html('${actionTitle}');
    <g:render template="/layouts/client-message" bean="${spTask}"/>
    <g:render template="/layouts/client-submit" model="[formVar: 'editForm']"/>
    <g:render template="/layouts/client-render" model="[formVar: 'editForm']"/>
    editForm.find('input[type=text],textarea').filter(':not([name=""]):enabled:visible:first').focus();
});
</asset:script>
    </body>
</html>
