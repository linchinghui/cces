<g:set var="embedPage" value="${params?.embed=='true'}" scope="request"/>
<g:set var="deferredScript" value="form/certificate" scope="request"/>
<!DOCTYPE html>
<html>
    <head>
        <meta name="layout" content="main" />
        <asset:stylesheet src="grid"/> <%--
        <asset:stylesheet src="form/certificate"/> --%>
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
                  <table id="list-certificate" class="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th></th>
<g:if test="${! embedPage}">
						<th><span class="search-input" placeholder="編號"><input type="text"><br></span>員工</th>
</g:if>
						<th><span class="search-input" placeholder="代碼"><input type="text"><br></span>證照類別</th>
						<th><span class="search-input"><input type="text"><br></span>證照</th>
                        <th>考取年月</th>
                        <th>有效年月<span class="hidden-xs hidden-sm">/回訓時間<br class=" hidden-md"/></span></th>
						<th>證照<span class="hidden-xs hidden-sm">影本<br class=" hidden-md"/></span></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
						<td></td>
<g:if test="${! embedPage}">
						<td>A123-林慶輝</td>
</g:if>
						<td>T1</td>
						<td>Test Certification</td>
                        <td>2015/12</td>
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
	embed: ${embedPage},<%--
	'emp': '${params?.empId}'
	'empId': '${params?.empId}'
	's:emp': '${params?.empId}' --%>
	'emp.id': '${params?.empId}' // for emp's query directly
};

$(function() {
	<g:render template="/layouts/client-message"/>
	createDetailDataTable();
});
</asset:script>
    </body>
</html>
