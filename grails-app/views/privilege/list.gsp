<g:set var="embedPage" value="${params?.embed=='true'}" scope="request"/>
<g:set var="deferredScript" value="form/privilege" scope="request"/>
<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main" />
    <asset:stylesheet src="grid"/>
</head>
<body><%--
	<asset:stylesheet src="form/privilege"/> --%>
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
                  <table id="list-privilege" class="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th></th>
<g:if test="${! embedPage}">
                        <th><span class="hidden-xs">作業</span>角色</th>
</g:if>
                        <th>作業<span class="hidden-xs">項目</span></th>
                        <th><span class="hidden-xs">可</span>讀</th>
                        <th><span class="hidden-xs">可</span>寫</th>
                        <th><span class="hidden-xs">可</span>刪</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td></td>
<g:if test="${! embedPage}">
                        <td>Test Role</td>
</g:if>
                        <td>Test Function</td>
                        <td><i class="fa fa-check-square-o"></i></td>
                        <td><i class="fa fa-square-o"></i></td>
                        <td><i class="fa fa-square-o"></i></td>
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
	<asset:javascript src="grid"/>
</g:if>
	<asset:script type='text/javascript'><%-- deferred JS here --%>
$(function() {
	<g:render template="/layouts/client-message"/>
	privilege({
		embed: ${embedPage},
		roleId: '${params?.roleId}'
	});
});
	</asset:script>
</body>
</html>
