<g:set var="embedPage" value="${params?.embed=='true'}" scope="request"/>
<g:set var="deferredScript" value="form/materialSupplier" scope="request"/>
<!DOCTYPE html>
<html>
	<head>
		<meta name="layout" content="main" />
		<asset:stylesheet src="grid"/> <%--
		<asset:stylesheet src="form/materialSupplier"/> --%>
<g:if test="${! embedPage}">
		<asset:javascript src="grid"/>
</g:if>
	</head>
	<body>
<g:if test="${! embedPage}">
	<div class="content-wrapper" role="main">
		<section class="content">
</g:if>
			<div class="row">
				<div class="col-xs-12">
					<ul class="nav nav-tabs">
						<li class="active"><a href="#" data-target="#" data-toggle="tab"><big>${pageTitle}</big></a></li>
					</ul>
					<div class="box">
						<div class="box-header"></div>
						<div class="box-body">
							<table id="list-materialSupplier" class="table table-bordered table-hover">
								<thead>
								<tr>
									<th></th>
<g:if test="${! embedPage}">
									<th>材料</th>
</g:if>
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
<g:if test="${! embedPage}">
									<td>Test Material</td>
</g:if>
									<td>Test Supplier</td>
									<td>2016/06/01</td>
									<td>100.0</td>
									<td>Test Brand</td>
									<td>William Hunag</td>
									<td></td>
									<td></td>
								</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
<g:if test="${! embedPage}">
		</section>
	</div>
</g:if>
<asset:script type='text/javascript'><%-- deferred JS here --%>
var serverParams2 = {
	embed: ${embedPage},
	materialId: '${params?.materialId}'
};

$(function() {
	<g:render template="/layouts/client-message"/>
	createDetailDataTable();
});
</asset:script>
	</body>
</html>
