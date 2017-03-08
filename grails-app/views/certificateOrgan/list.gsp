<g:set var="embedPage" value="${params?.embed=='true'}" scope="request"/>
<g:set var="deferredScript" value="form/certificateOrgan" scope="request"/>
<!DOCTYPE html>
<html>
	<head>
		<meta name="layout" content="main" />
		<asset:stylesheet src="form/certificateOrgan"/>
<g:if test="${! embedPage}">
		<asset:javascript src="grid"/>
</g:if>
	</head>
	<body>
<g:if test="${! embedPage}">
	<div class="content-wrapper" role="main">
		<section class="content"
		  <div class="row">
			<div class="col-xs-12">
				<ul class="nav nav-tabs">
					<li class="active"><a href="#" data-target="#" data-toggle="tab"><big>${pageTitle}</big></a></li>
				</ul>
</g:if>
				<div class="box">
					<div class="box-header"></div>
					<div class="box-body">
						<table id="list-certificateOrgan" class="table table-bordered table-hover">
							<thead>
							<tr>
								<th></th>
								<th>機構代碼</th>
								<th>機構名稱</th>
							</tr>
							</thead>
							<tbody>
							<tr>
								<td></td>
								<td>test</td>
								<td>Test單位</td>
							</tr>
							</tbody>
						</table>
					</div>
				</div>
<g:if test="${! embedPage}">
			</div>
		  </div>
		</section>
	</div>
</g:if>
<asset:script type='text/javascript'><%-- deferred JS here --%>
$(function() {
	<g:render template="/layouts/client-message"/>
	createOrgDataTable();
});
</asset:script>
	</body>
</html>
