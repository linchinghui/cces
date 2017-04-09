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
        <asset:stylesheet src="form/vehicleMilage"/>
    </head>
    <body>
        <div class="container" role="main">
            <div class="panel panel-info"><g:if test="${modalPage}">
                <div class="panel-heading">
                    <div class="panel-title">${actionTitle}</div>
                </div></g:if>
                <div class="panel-body"> <%--
                    <section class="content-header">
                        <g:render template="/layouts/server-message" bean="${vehicleMilage}"/>
                    </section> --%>
                    <section class="content">
                        <g:form resource="${vehicleMilage}" method="${submitMehtod}" role="form" class="form-horizontal" name="vehicleMilageForm">
	                        <g:if test="${vehicleMilage}">
	                            <g:if test="${_csrf?.parameterName}">
	                              <input name='${_csrf?.parameterName}' type='hidden' value='${_csrf?.token}'/>
	                            </g:if>
	                            <fieldset class="form-group">
	                                <f:with bean="vehicleMilage">
	                                    <g:if test="${type=='C'}"> <%-- && params?.embed!='true' --%>
	                                        <f:field property="project" label="專案" />
	                                        <f:field property="dispatchedDate" label="用車日期" widget="date" value="${params?.dispatchedDate?:java.util.Calendar.instance.getTime()}"/>
	                                    </g:if>
	                                    <g:else>
	                                        <f:display property="project" label="專案" />
	                                        <f:display property="dispatchedDate" label="用車日期" wrapper="date" />
	                                    </g:else>
	                                    <f:field property="vehicle" label="車輛" />
	                                    <f:field property="km" label="里程數" widget-placeholder="公里數" />
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
	var editForm = $('#vehicleMilageForm');
	$('.bootstrap-dialog-title').html('${actionTitle}');
	<g:render template="/layouts/client-message" bean="${vehicleMilage}"/>
	<g:render template="/layouts/client-render" model="[formVar: 'editForm']"/>
	<g:render template="/layouts/client-submit" model="[formVar: 'editForm']"/>
});
</asset:script>
    </body>
</html>
