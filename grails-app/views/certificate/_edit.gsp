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
        <asset:stylesheet src="form/certificate"/>
    </head>
    <body>
        <div class="container" role="main">
            <div class="panel panel-info"><g:if test="${modalPage}">
                <div class="panel-heading">
                    <div class="panel-title">${actionTitle}</div>
                </div></g:if>
                <div class="panel-body">
                    <section class="content">
                        <g:form resource="${certificate}" method="${submitMehtod}" role="form" class="form-horizontal" name="certificateForm">
                        <g:if test="${certificate}">
                            <g:if test="${_csrf?.parameterName}">
                              <input name='${_csrf?.parameterName}' type='hidden' value='${_csrf?.token}'/>
                            </g:if>
                            <fieldset class="form-group">
                                <f:with bean="certificate">
									<g:if test="${type=='C' && params?.embed!='true'}">
										<f:field property="emp" label="員工" />
									</g:if>
									<g:else>
										<f:display property="emp" label="員工" />
										<g:if test="${type=='C'}">
											<input name='emp.id' type='hidden' value='${certificate.emp?.id}'/>
										</g:if>
									</g:else>
									<g:if test="${type=='C'}">
										<f:field property="category" label="證照類別" />
									</g:if>
									<g:else>
										<f:display property="category" label="證照類別" />
									</g:else>
									<f:field property="title" label="證照名稱" />
                                    <f:field property="examDate" label="考取年月" widget="date" />
									<br>
                                    <f:field property="expiryDate" label="有效年月|回訓日期" widget="date" />
                                    <f:field property="copied" label="證照影本繳交日" widget="date" />
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
    var editForm = $('#certificateForm');
    $('.bootstrap-dialog-title').html('${pageTitle}');
    <g:render template="/layouts/client-message" bean="${certificate}"/>
    <g:render template="/layouts/client-render" model="[formVar: 'editForm']"/>
	<g:render template="/layouts/client-submit" model="[formVar: 'editForm']"/>
});
</asset:script>
    </body>
</html>
