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
<g:set var="pageTitle" value="${functionService.get('assignment')?.description + '-設定'}"/>
<g:set var="submitMehtod" value="${type=='C' ? 'POST' : type=='U' ? 'PUT' : ''}"/>
<!DOCTYPE html>
<html>
    <head>
        <meta name="layout" content="main" />
        <title>CCES - ${pageTitle}</title>
        <asset:stylesheet src="form/assignment"/>
    </head>
    <body>
        <div class="container" role="main">
            <div class="panel panel-info">
                <div class="panel-body">
                    <section class="content">
                        <g:form resource="${assignment}" method="${submitMehtod}" role="form" class="form-horizontal" name="assignmentForm">
                        <g:if test="${assignment}">
                            <g:if test="${_csrf?.parameterName}">
                              <input name='${_csrf?.parameterName}' type='hidden' value='${_csrf?.token}'/>
                            </g:if>
                            <fieldset class="form-group">
                                <f:with bean="assignment">
                                    <f:display property="project" label="專案" />
                                    <g:render template="week" bean="${assignment}"/>
                                    <g:if test="${type=='C'}">
                                        <f:field property="employee" label="員工" />
                                    </g:if>
                                    <g:else>
                                        <f:display property="employee" label="員工" />
                                    </g:else>
                                    <div class="assignDay">
                                        <label>人力配置</label><br>
                                        <f:field property="d0" label="日" />
                                        <f:field property="d1" label="一" />
                                        <f:field property="d2" label="二" />
                                        <f:field property="d3" label="三" />
                                        <f:field property="d4" label="四" />
                                        <f:field property="d5" label="五" />
                                        <f:field property="d6" label="六" />
                                    </div>
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
    var editForm = $('#assignmentForm');
    $('.bootstrap-dialog-title').html('${pageTitle}');
    <g:render template="/layouts/client-message" bean="${assignment}"/>
    <g:render template="/layouts/client-submit" model="[formVar: 'editForm']"/>
    <g:render template="/layouts/client-render" model="[formVar: 'editForm', renderCheckbox: true]"/>
});
</asset:script>
    </body>
</html>