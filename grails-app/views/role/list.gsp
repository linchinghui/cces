<g:set var="deferredScript" value="form/role" scope="request"/>
<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main" />
    <asset:stylesheet src="grid"/>
</head>
<body>
	<asset:stylesheet src="form/role"/>
    <div class="content-wrapper" role="main"> <%--
        <section class="content-header">
          <g:render template="/layouts/server-message" bean="${role}"/>
        </section> --%>
        <section class="content">
          <div class="row">
            <div class="col-xs-12">
              <ul class="nav nav-tabs">
                <li class="active"><a href="#" data-target="#" data-toggle="tab"><big>${pageTitle}</big></a></li>
              </ul>
              <div class="box">
                <div class="box-header"></div>
                <div class="box-body">
                  <table id="list-role" class="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th></th>
                        <th><span class="hidden-xs">角色</span>代碼</th>
                        <th><span class="hidden-xs">角色</span>名稱</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td></td>
                        <td>test</td>
                        <td>測試角色</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="detail"></div>
            </div>
          </div>
        </section>
    </div><%--
	<asset:javascript src="grid"/>--%>
	<asset:script type='text/javascript'><%-- deferred JS here --%>
$(function() {
	<g:render template="/layouts/client-message"/>
	ccesRole({
		detailLink: '${createLink([controller:"privilege", action:"index"])}'
	});
});
	</asset:script>
</body>
</html>
