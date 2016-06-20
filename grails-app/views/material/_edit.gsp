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
        <asset:stylesheet src="form/material"/>
    </head>
    <body>
        <div class="container" role="main">
            <div class="panel panel-info"><g:if test="${modalPage}">
                <div class="panel-heading">
                    <div class="panel-title">${actionTitle}</div>
                </div></g:if>
                <div class="panel-body"> <%--
                    <section class="content-header">
                        <g:render template="/layouts/server-message" bean="${material}"/>
                    </section> --%>
                    <section class="content">
                        <g:form resource="${material}" method="${submitMehtod}" role="form" class="form-horizontal" name="materialForm">
                        <g:if test="${material}">
                            <g:if test="${_csrf?.parameterName}">
                              <input name='${_csrf?.parameterName}' type='hidden' value='${_csrf?.token}'/>
                            </g:if>
                            <fieldset class="form-group">
                                <f:with bean="material">
                                    <f:field property="category" label="類型" />
                                    <f:field property="name" label="名稱" widget-placeholder="輸入中英文說明" /><%--
                                    <f:field property="spec" label="尺寸 | 規格" widget-placeholder="輸入中英文說明" />--%>
                                    <f:field property="dimension" label="尺寸" />
                                    <f:field property="texture" label="材質" />
                                    <f:field property="spec" label="其他" />
                                    <div class="col-xs-6"><f:field property="quantity" label="數量" /></div>
                                    <div class="col-xs-6"><f:field property="unit" label="單位" /></div>
                                    <f:field property="price" label="價格" /><%--
                                    <f:field property="supplier" label="供應商" />
                                    <f:field property="contactPhoneNo" label="電話" />
                                    <f:field property="registeredDate" label="登錄日期" widget="date" value="${type=='C'?java.util.Calendar.instance:material.registeredDate}"/>--%>
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
    var editForm = $('#materialForm');
    $('.bootstrap-dialog-title').html('${actionTitle}');
    <g:render template="/layouts/client-message" bean="${material}"/>
    <g:render template="/layouts/client-submit" model="[formVar: 'editForm']"/>
    <g:render template="/layouts/client-render" model="[formVar: 'editForm']"/>
    $('input[type=text],textarea').filter(':enabled:visible:first').each( function(idx,ele) { $(ele).focus(); } );
});
</asset:script>
    </body>
</html>
