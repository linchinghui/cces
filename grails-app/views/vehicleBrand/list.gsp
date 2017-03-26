<g:set var="embedPage" value="${params?.embed=='true'}" scope="request"/>
<g:set var="deferredScript" value="form/vehicleBrand" scope="request"/>
<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main" />
    <asset:stylesheet src="grid"/>
</head>
<body>
    <asset:stylesheet src="form/vehicleBrand"/>
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
                  <table id="list-vehicleBrand" class="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th></th>
                        <th>廠牌代碼</th>
                        <th>廠牌名稱</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td></td>
                        <td>SUPER</td>
                        <td>測試廠牌</td>
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
	vehicleBrand({});
});
	</asset:script>
</body>
</html>
