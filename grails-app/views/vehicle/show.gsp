<g:if test="${params['cb']}">
    <g:set var="dialogPage" value="${true}" scope="request"/>
    <g:set var="selfStyle" value="${true}" scope="request"/>
</g:if>
<g:else>
    <g:set var="modalPage" value="${true}" scope="request"/>
</g:else>
<g:set var="functionService" bean="functionService"/>
<g:set var="pageTitle" value="${functionService.get('vehicle')?.description}"/>
<!DOCTYPE html>
<html>
    <head>
        <meta name="layout" content="main" />
        <title>CCES - ${pageTitle}</title>
        <asset:stylesheet src="form/vehicle"/>
    </head>
    <body>
        <div class="container" role="main">
            <div class="panel panel-info"><g:if test="${modalPage}">
                <div class="panel-heading">
                    <div class="panel-title">${pageTitle}</div>
                </div></g:if>
                <div class="panel-body">
                    <section class="content-header">
                        <g:render template="/layouts/server-message" bean="${vehicle}"/>
                    </section>
                    <section class="content">
                        <g:form resource="${vehicle}" role="form" class="form-horizontal" name="vehicleForm">
                        <g:if test="${vehicle}">
                            <g:if test="${_csrf?.parameterName}">
                              <input name='${_csrf?.parameterName}' type='hidden' value='${_csrf?.token}'/>
                            </g:if>
                            <fieldset class="form-group">
                                <f:with bean="vehicle">
                                    <f:display property="plateNo" label="車號" />
                                    <f:display property="brand" label="廠牌" />
                                    <f:display property="model" label="型號" />
                                    <f:display property="inspectedDate" label="驗車日期" widget="date" />
                                    <f:display property="note" label="備註" />
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
    var showForm = $('#vehicleForm');
    <g:if test="${dialogPage}">
        $('.bootstrap-dialog-title').html('${pageTitle}');
    </g:if>
    <g:render template="/layouts/client-message" bean="${vehicle}"/>
    <g:render template="/layouts/client-render" model="[formVar: 'showForm']"/>
});
</asset:script>
    </body>
</html>
