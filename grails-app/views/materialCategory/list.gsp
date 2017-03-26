<g:set var="embedPage" value="${params?.embed=='true'}" scope="request"/>
<g:set var="deferredScript" value="form/materialCategory" scope="request"/>
<!DOCTYPE html>
<html>
<head>
	<meta name="layout" content="main" />
	<asset:stylesheet src="grid"/>
</head>
<body>
	<asset:stylesheet src="form/materialCategory"/>
<g:if test="${! embedPage}">
	<div class="content-wrapper" role="main">
		<section class="content">
			<div class="row">
			<div class="col-xs-12">
				<ul class="nav nav-tabs">
					<li class="active"><a href="#" data-target="#" data-toggle="tab"><big>${pageTitle}</big></a></li>
				</ul>
</g:if>
				<div class="box">
					<div class="box-header"></div>
					<div class="box-body">
						<table id="list-materialCategory" class="table table-bordered table-hover">
							<thead>
							<tr>
								<th></th>
								<th><span class="search-input"><input type="text" size="10"><br></span>類別代碼</th>
								<th><span class="search-input"><input type="text" size="20"><br></span>類別名稱</th>
							</tr>
							</thead>
							<tbody>
							<tr>
								<td></td>
								<td>test</td>
								<td>測試類別</td>
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
	<asset:javascript src="grid"/>
</g:if>
	<asset:script type='text/javascript'><%-- deferred JS here --%>
$(function() {
	<g:render template="/layouts/client-message"/>
	materialCategory({
		embed: ${embedPage}
	});
});
	</asset:script>
</body>
</html>
