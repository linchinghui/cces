<g:set var="embedPage" value="${params?.embed=='true'}" scope="request"/>
<g:set var="deferredScript" value="form/vehicleMilage" scope="request"/>
<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main" />
    <asset:stylesheet src="grid"/>
</head>
<body><%--
	<asset:stylesheet src="form/vehicleMilage"/>--%>
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
                  <table id="list-vehicleMilage" class="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th></th>
<g:if test="${! embedPage}">
                        <th>專案</th>
                        <th><span class="hidden-xs">用車</span>日期</th>
</g:if>
                        <th>車輛</th>
                        <th><span class="hidden-xs">里程(</span>公里<span class="hidden-xs">)</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td></td>
<g:if test="${! embedPage}">
                        <td>SUPER</td>
						<td>2016/01/02</td>
</g:if>
                        <td>AB-123</td>
                        <td>123</td>
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
	vehicleMilage({
		embed: ${embedPage},
		projectId: '${params?.projectId}',
		constructNo: '${params?.constructNo}',
		dispatchedDate: '${dispatchedDate?:new java.text.SimpleDateFormat('yyyy/MM/dd').format(java.util.Calendar.instance.getTime())}'
	});
});
	</asset:script>
</body>
</html>
