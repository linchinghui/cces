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
<g:set var="pageTitle" value="${functionService.get('vehicle')?.description}-${type=='C' ? '新增' : type=='U' ? '編輯' : ''}"/>
<g:set var="submitMehtod" value="${type=='C' ? 'POST' : type=='U' ? 'PUT' : ''}"/>
<!DOCTYPE html>
<html>
    <head>
        <meta name="layout" content="main" />
        <title>CCES - ${pageTitle}</title>
        <asset:stylesheet src="form/vehicle"/>
    </head>
    <body>
        <div class="container" role="main">
            <div class="panel panel-info"> <%--
                <div class="panel-heading">
                    <div class="panel-title">${pageTitle}</div>
                </div> --%>
                <div class="panel-body"> <%--
                    <section class="content-header">
                        <g:render template="/layouts/server-message" bean="${vehicle}"/>
                    </section> --%>
                    <section class="content">
                        <g:form resource="${vehicle}" method="${submitMehtod}" role="form" class="form-horizontal" name="vehicleForm">
                        <g:if test="${vehicle}">
                            <g:if test="${_csrf?.parameterName}">
                              <input name='${_csrf?.parameterName}' type='hidden' value='${_csrf?.token}'/>
                            </g:if>
                            <fieldset class="form-group">
                                <f:with bean="vehicle">
                                    <f:field property="plateNo" label="車號" widget-placeholder="輸入中英文說明" />
                                    <f:field property="brand" label="廠牌" />
                                    <f:field property="model" label="型號" widget-placeholder="輸入中英文說明" />
                                    <f:field property="inspectedDate" label="驗車日期" widget="date" />
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
    var editForm = $('#vehicleForm');
    $('.bootstrap-dialog-title').html('${pageTitle}');
    <g:render template="/layouts/client-message" bean="${vehicle}"/>
    <g:render template="/layouts/client-submit" model="[formVar: 'editForm']"/>
    <g:render template="/layouts/client-render" model="[formVar: 'editForm']"/>
});
</asset:script>
    </body>
</html>
