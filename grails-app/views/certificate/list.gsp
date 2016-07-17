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
<g:if test="${embedPage}">
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
						<th>證照類別</th>
						<th>證照</th>
                        <th>考取年月</th>
                        <th>有效年月|回訓時間</th>
                        <th>證照影本<span class="hidden-xs">繳交日</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
						<td></td>
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
                  <table id="list-certificate" class="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th></th>
						<th>員工</th>
						<th>證照類別</th>
						<th>證照</th>
                        <th>考取年月</th>
                        <th>有效年月|回訓時間</th>
                        <th>證照影本<span class="hidden-xs">繳交日</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
						<td></td>
						<td>A123-林慶輝</td>
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
        </section>
      </div>
</g:else>
<asset:script type='text/javascript'><%-- deferred JS here --%>
var serverParams2 = {
  embed: ${embedPage},
  empId: '${params?.empId}'
};
log(serverParams2);
$(function() {
  createDetailDataTable();
});
</asset:script>
    </body>
</html>
