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
        <asset:stylesheet src="form/revenue"/>
    </head>
    <body>
        <div class="container" role="main">
            <div class="panel panel-info"><g:if test="${modalPage}">
                <div class="panel-heading">
                    <div class="panel-title">${actionTitle}</div>
                </div></g:if>
                <div class="panel-body"> <%--
                    <section class="content-header">
                        <g:render template="/layouts/server-message" bean="${revenue}"/>
                    </section> --%>
                    <section class="content">
                        <g:form resource="${revenue}" method="${submitMehtod}" role="form" class="form-horizontal" name="revenueForm">
                        <g:if test="${revenue}">
                            <g:if test="${_csrf?.parameterName}">
                              <input name='${_csrf?.parameterName}' type='hidden' value='${_csrf?.token}'/>
                            </g:if>
                            <fieldset class="form-group">
                                <f:with bean="revenue">
                                    <g:if test="${type=='C'}">
                                        <f:field property="project" label="專案" />
                                    </g:if>
                                    <g:else>
                                        <f:display property="project" label="專案" />
                                    </g:else>
                                    <f:field property="invoieNo" label="發票號碼" />
                                    <f:field property="invoiceDate" label="發票日期" widget="date" />
                                    <f:field property="recordDate" label="入帳日期" widget="date" /><%--
                                    <f:field property="modifiedDate" label="調改日期" widget="datetime" />
                                    <f:field property="note" label="註記" />--%>
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
    var editForm = $('#revenueForm');
    $('.bootstrap-dialog-title').html('${actionTitle}');
    <g:render template="/layouts/client-message" bean="${revenue}"/>
    <g:render template="/layouts/client-submit" model="[formVar: 'editForm']"/>
    <g:render template="/layouts/client-render" model="[formVar: 'editForm']"/>
    $('input[type=text],textarea').filter(':enabled:visible:first').each( function(idx,ele) { $(ele).focus(); } );
});
</asset:script>
    </body>
</html>
