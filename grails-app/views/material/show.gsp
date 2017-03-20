<g:if test="${params['cb']}">
    <g:set var="dialogPage" value="${true}" scope="request"/>
    <g:set var="selfStyle" value="${true}" scope="request"/>
</g:if>
<g:else>
    <g:set var="modalPage" value="${true}" scope="request"/><%--
	<asset:javascript src="form/materialSupplier"/>--%>
</g:else>
<!DOCTYPE html>
<html>
    <head>
        <meta name="layout" content="main" />
        <asset:stylesheet src="form/material"/>
		<asset:javascript src="form/materialSupplier"/>
    </head>
    <body>
        <div class="container" role="main">
            <div class="panel panel-info"><g:if test="${modalPage}">
                <div class="panel-heading">
                    <div class="panel-title">${pageTitle}</div>
                </div></g:if>
                <div class="panel-body"> <%--
                    <section class="content-header">
                        <g:render template="/layouts/server-message" bean="${material}"/>
                    </section> --%>
                    <section class="content">
                        <g:form resource="${material}" role="form" class="form-horizontal" name="materialForm">
                        <g:if test="${material}">
                            <g:if test="${_csrf?.parameterName}">
                            	<input name='${_csrf?.parameterName}' type='hidden' value='${_csrf?.token}'/>
                            </g:if>
                            <fieldset class="form-group">
                                <f:with bean="material">
                                    <f:display property="category" label="林料類型" />
                                    <f:display property="name" label="材料名稱" />
                                    <f:display property="dimension" label="尺寸" />
                                    <f:display property="texture" label="材質" />
                                    <f:display property="spec" label="其他" /><%--label="尺寸 | 規格" />--%>
                                    <div class="col-xs-6"><f:display property="quantity" label="數量" /></div>
                                    <div class="col-xs-6"><f:display property="unit" label="單位" /></div>
                                    <f:display property="price" label="價格" /><%--
                                    <f:display property="supplier" label="供應商" />
                                    <f:display property="contactPhoneNo" label="電話" />
                                    <f:display property="registeredDate" label="登錄日期" wrapper="date" />--%>
                                </f:with>
                            </fieldset>
                        </g:if>
                        </g:form>
					</section><%--
					<section class="content">
						<div class="row">
							<div class="col-xs-12">
								<ul class="nav nav-tabs">
									<li class="active"><a href="#" data-target="#" data-toggle="tab"><big>${functionService.get('materialSupplier')?.description}</big></a></li>
								</ul>
								<div class="box">
									<div class="box-header"></div>
									<div class="box-body">
										<table id="list-materialSupplier2" class="table table-bordered table-hover">
											<thead>
											<tr>
												<th></th>
												<th>供應商</th>
												<th>購買日期</th>
												<th>購買價格</th>
												<th>廠牌</th>
												<th>業務員</th>
												<th>電話</th>
												<th>傳真電話</th>
											  </tr>
											</thead>
											<tbody>
											<tr>
												<td></td>
												<td></td>
												<td></td>
												<td></td>
												<td></td>
												<td></td>
												<td></td>
												<td></td>
											</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
                    </section>
                    <g:render template="/materialSupplier/list" model="[
						'pageTitle': functionService.get('materialSupplier')?.description,
						'params': ['noEdit': true, 'materialId': material.id]
					]"/>--%>
                </div>
            </div>
        </div>
	<asset:script type='text/javascript'><%-- deferred JS here --%>
$(function() {
    var showForm = $('#materialForm');
    <g:if test="${dialogPage}">
        $('.bootstrap-dialog-title').html('${pageTitle}');
    </g:if>
    <g:render template="/layouts/client-message" bean="${material}"/>
    <g:render template="/layouts/client-render" model="[formVar: 'showForm']"/>
});
	</asset:script>
    </body>
</html>
