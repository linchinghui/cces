<g:set var="deferredScript" value="form/user" scope="request"/>
<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main" />
    <asset:stylesheet src="grid"/>
</head>
<body>
	<asset:stylesheet src="form/user"/>
    <div class="content-wrapper" role="main"> <%--
        <section class="content-header">
          <g:render template="/layouts/server-message" bean="${user}"/>
        </section> --%>
        <section class="content">
          <div class="row">
            <div class="col-xs-12">
                <ul class="nav nav-tabs">
                  <li class="active"><a href="#" data-target="#" data-toggle="tab"><big>${pageTitle}</big></a></li>
                </ul>
              <div class="box">
                <div class="box-header"></div> <%--
                <div class="box-header panel panel-default">
                  <h3 class="box-title">${pageTitle}</h3>
                </div> --%>
                <div class="box-body">
                  <table id="list-user" class="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th></th>
                        <th><span class="search-input"><input type="text" size="10"><br></span><span class="hidden-xs">登入</span>帳號</th>
                        <th><span class="search-input"><input type="text" size="10"><br></span>姓名</th>
                        <th><span class="hidden-xs">作業</span>角色</th>
                        <th><span class="hidden-xs">可</span>登入</th>
                        <th><span class="hidden-xs">已</span>鎖住</th>
                        <th><span class="hidden-xs">帳號</span>停用</th>
                        <th><span class="hidden-xs">密碼已</span>過期</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td></td>
                        <td>test</td>
                        <td>測試人員</td>
                        <td>N/A</td>
                        <td>false</td>
                        <td>true</td>
                        <td>true</td>
                        <td>true</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
	</div><%--
	<asset:javascript src="grid"/>--%>
	<asset:script type='text/javascript'><%-- deferred JS here --%>
$(function() {
	<g:render template="/layouts/client-message"/>
	ccesUser({});
});
	</asset:script>
</body>
</html>
