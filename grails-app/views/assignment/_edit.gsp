<%@ page import="static com.lch.aaa.Application.*" %>
<g:if test="${params['cb']}">
    <g:set var="dialogPage" value="${true}" scope="request"/>
    <g:set var="selfStyle" value="${true}" scope="request"/>
</g:if>
<g:else>
    <g:set var="modalPage" value="${true}" scope="request"/> <%--
    <g:set var="deferredScript" value="???" scope="request"/> --%>
</g:else>
<g:set var="actionTitle" value="${pageTitle}-設定"/>
<g:set var="submitMehtod" value="${type=='C' ? 'POST' : type=='U' ? 'PUT' : ''}"/>
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
                    <div class="panel-title">${actionTitle}</div>
                </div></g:if>
                <div class="panel-body"> <%--
                    <section class="content-header">
                        <g:render template="/layouts/server-message" bean="${announcement}"/>
                    </section> --%>
                    <section class="content">
                        <g:form resource="${assignment}" method="${submitMehtod}" role="form" class="form-horizontal" name="assignmentForm">
                        <g:if test="${assignment}">
                            <g:if test="${_csrf?.parameterName}">
                              <input name='${_csrf?.parameterName}' type='hidden' value='${_csrf?.token}'/>
                            </g:if>
                            <fieldset class="form-group">
                                <f:with bean="assignment">
                                    <f:display property="project" label="專案" />
                                <%--<g:render template="week" bean="${assignment}"/>--%>
<%
    def day = ["日","一","二","三","四","五","六"]
    def calendar = Calendar.instance
    def today = calendar.time
    def firstDate
    def lastDate
    def sdf
    if (assignment.year && assignment.week) {
        calendar.setWeekDate(assignment.year, assignment.week, 1)
        firstDate = calendar.time
        lastDate = firstDate + 6
        sdf = new java.text.SimpleDateFormat('YYYY/MM/dd')
    }
%>
                                    <div class="input-group disabled">
                                        <label>第<%=assignment.week%>週</label>
                                        <input type="text" value="${sdf?.format(firstDate)} ~ ${sdf?.format(lastDate)}" class="form-control" disabled>
                                    </div>
                                    <g:if test="${type=='C' && today <= lastDate}">
                                        <f:field property="employee" label="員工" />
                                    </g:if>
                                    <g:else>
                                        <f:display property="employee" label="員工" />
                                    </g:else>
                                    <div class="assignDay">
                                        <label>人力配置</label><br>
                                        <g:each var="i" in="${0..6}">
                                            <g:if test="${firstDate ? (firstDate + i < today) : false}">
                                                <f:display property="d${i}" label="${day[i]}" />
                                            </g:if>
                                            <g:else>
                                                <f:field property="d${i}" label="${day[i]}" />
                                            </g:else>
                                        </g:each>
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
    $('.bootstrap-dialog-title').html('${actionTitle}');
    <g:render template="/layouts/client-message" bean="${assignment}"/>
    <g:render template="/layouts/client-render" model="[formVar: 'editForm', renderCheckbox: true]"/>
	<g:render template="/layouts/client-submit" model="[formVar: 'editForm']"/>
});
</asset:script>
    </body>
</html>
