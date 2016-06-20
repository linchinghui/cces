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
        <asset:stylesheet src="form/assignment"/>
    </head>
    <body>
        <div class="container" role="main">
            <div class="panel panel-info"><g:if test="${modalPage}">
                <div class="panel-heading">
                    <div class="panel-title">${pageTitle}</div>
                </div></g:if>
                <div class="panel-body"> <%--
                    <section class="content-header">
                        <g:render template="/layouts/server-message" bean="${assignment}"/>
                    </section> --%>
                    <section class="content">
                        <g:form resource="${assignment}" role="form" class="form-horizontal" name="assignmentForm">
                        <g:if test="${assignment}">
                            <g:if test="${_csrf?.parameterName}">
                              <input name='${_csrf?.parameterName}' type='hidden' value='${_csrf?.token}'/>
                            </g:if>
                            <fieldset class="form-group">
                                <f:with bean="assignment">
                                    <f:display property="project" label="專案" />
                                    <g:render template="week" bean="${assignment}"/>
                                    <f:display property="employee" label="員工" />
                                    <div class="assignDay">
                                        <label>人力配置</label><br>
                                        <f:display property="d0" label="週日" />
                                        <f:display property="d1" label="週一" />
                                        <f:display property="d2" label="週二" />
                                        <f:display property="d3" label="週三" />
                                        <f:display property="d4" label="週四" />
                                        <f:display property="d5" label="週五" />
                                        <f:display property="d6" label="週六" />
                                    </div>
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
    var showForm = $('#assignmentForm');
    <g:if test="${dialogPage}">
        $('.bootstrap-dialog-title').html('${pageTitle}');
    </g:if>
    <g:render template="/layouts/client-message" bean="${assignment}"/>
    <g:render template="/layouts/client-render" model="[formVar: 'showForm', renderCheckbox: true]"/>
});
</asset:script>
    </body>
</html>
