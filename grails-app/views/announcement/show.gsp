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
<g:set var="pageTitle" value="${functionService.get('announcement')?.description}"/>
<!DOCTYPE html>
<html>
    <head>
        <meta name="layout" content="main" />
        <title>CCES - ${pageTitle}</title>
        <asset:stylesheet src="form/announcement"/>
    </head>
    <body>
        <div class="container" role="main">
            <div class="panel panel-info"><g:if test="${modalPage}">
                <div class="panel-heading">
                    <div class="panel-title">${pageTitle}</div>
                </div></g:if>
                <div class="panel-body"> <%--
                    <section class="content-header">
                        <g:render template="/layouts/server-message" bean="${announcement}"/>
                    </section> --%>
                    <section class="content">
                        <g:form resource="${announcement}" role="form" class="form-horizontal" name="announcementForm">
                        <g:if test="${announcement}">
                            <g:if test="${_csrf?.parameterName}">
                              <input name='${_csrf?.parameterName}' type='hidden' value='${_csrf?.token}'/>
                            </g:if>
                            <fieldset class="form-group">
                                <f:with bean="announcement">
                                    <f:display property="description" label="告示內容" />
                                    <f:display property="announcedDate" label="公告日期" wrapper="datetime" />
                                    <f:display property="revokedDate" label="撤榜日期" wrapper="date" /><%--
                                    <f:display property="createdDate" label="建立日期" wrapper="date" />--%>
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
    var showForm = $('#announcementForm');
    <g:if test="${dialogPage}">
        $('.bootstrap-dialog-title').html('${pageTitle}');
    </g:if>
    <g:render template="/layouts/client-message" bean="${announcement}"/>
    <g:render template="/layouts/client-render" model="[formVar: 'showForm']"/>
});
</asset:script>
    </body>
</html>
