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
<g:set var="pageTitle" value="${functionService.get('announcement')?.description}-${type=='C' ? '新增' : type=='U' ? '編輯' : ''}"/>
<g:set var="submitMehtod" value="${type=='C' ? 'POST' : type=='U' ? 'PUT' : ''}"/>
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
                        <g:form resource="${announcement}" method="${submitMehtod}" role="form" class="form-horizontal" name="announcementForm">
                        <g:if test="${announcement}">
                            <g:if test="${_csrf?.parameterName}">
                              <input name='${_csrf?.parameterName}' type='hidden' value='${_csrf?.token}'/>
                            </g:if>
                            <fieldset class="form-group">
                                <f:with bean="announcement">
                                    <f:field property="description" label="告示內容" />
                                    <f:field property="announcedDate" label="公告日期" widget="datetime" />
                                    <f:field property="revokedDate" label="撤榜日期" widget="date" />
                                    <g:if test="${type=='C'}">
                                        <f:field property="createdDate" label="建立日期" widget="date" value="${java.util.Calendar.instance}" required="false"/>
                                    </g:if>
                                    <g:else>
                                        <f:display property="createdDate" label="建立日期" wrapper="date" />
                                    </g:else>
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
    var editForm = $('#announcementForm');
    $('.bootstrap-dialog-title').html('${pageTitle}');
    <g:render template="/layouts/client-message" bean="${announcement}"/>
    <g:render template="/layouts/client-submit" model="[formVar: 'editForm']"/>
    <g:render template="/layouts/client-render" model="[formVar: 'editForm']"/>
    $('input[type=text],textarea').filter(':enabled:visible:first').focus();
});
</asset:script>
    </body>
</html>
