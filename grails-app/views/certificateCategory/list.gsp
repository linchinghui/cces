<g:set var="embedPage" value="${params?.embed=='true'}" scope="request"/>
<g:set var="deferredScript" value="form/certificateCategory" scope="request"/>
<!DOCTYPE html>
<html>
	<head>
		<meta name="layout" content="main" />
		<asset:stylesheet src="form/certificateCategory"/>
<g:if test="${! embedPage}">
		<asset:javascript src="grid"/>
</g:if>
	</head>
	<body>
<g:if test="${! embedPage}">
	<div class="content-wrapper" role="main">
		<section class="content">
		  <div class="row">
			<div class="col-xs-12">
				<ul class="nav nav-tabs">
					<li class="active">
						<a data-toggle="mtab" data-target="#tab1" href="#"><big>${pageTitle}</big></a>
					</li>
					<li>
	                	<a data-toggle="mtab" data-target="#tab2" href="${createLink([controller:'certificateOrgan', action:'index', params:[embed:true]])}">
	                    	<big>${functionService.getPageTitle('certificateOrgan')}</big>
	                	</a>
	                </li>
				</ul>
				<div class="tab-content">
					<div id="tab1" class="tab-pane fade in active">
</g:if>
						<div class="box">
							<div class="box-header"></div>
							<div class="box-body">
								<table id="list-certificateCategory" class="table table-bordered table-hover">
									<thead>
									<tr>
										<th></th>
										<th>類別代碼</th>
										<th>類別名稱</th>
										<th>永久有效</th>
									</tr>
									</thead>
									<tbody>
									<tr>
										<td></td>
										<td>test</td>
										<td>TEST</td>
										<td>false</td>
									</tr>
									</tbody>
								</table>
							</div>
						</div>
<g:if test="${! embedPage}">
					</div>
					<div id="tab2" class="tab-pane fade">
	                  <div class="box">
	                    <div class="box-header"></div> <%--
	                    <div class="box-header panel panel-default">
	                      <h3 class="box-title">${XXX}</h3>
	                    </div> --%>
	                    <div class="box-body">
	                      <span class="ajax-loader">請稍候&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
	                    </div>
	                  </div>
	                </div>
				</div>
			</div>
		  </div>
		</section>
	</div>
</g:if>
<asset:script type='text/javascript'><%-- deferred JS here --%>
$(function() {
	<g:render template="/layouts/client-message"/>
	createCatDataTable();
<g:if test="${! embedPage}">
	handleTabs();
</g:if>
});
</asset:script>
	</body>
</html>
