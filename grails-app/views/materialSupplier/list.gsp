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
<g:if test="${embedPage}">
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
</g:if>
<g:else>
		<div class="content-wrapper" role="main">
			<section class="content">
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
										<th>材料</th>
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
										<td>Test Material</td>
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
			</section>
		</div>
</g:else>
<asset:script type='text/javascript'><%-- deferred JS here --%>
var serverParams2 = {
	embed: ${embedPage},
	materialId: '${params?.materialId}'
};

$(function() {
	createDetailDataTable();
});
</asset:script>
	</body>
</html>
