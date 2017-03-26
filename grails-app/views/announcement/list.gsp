<g:set var="deferredScript" value="form/announcement" scope="request"/>
<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main" />
    <asset:stylesheet src="grid"/>
</head>
<body><%--
	<asset:stylesheet src="form/announcement"/> --%>
    <div class="content-wrapper" role="main"> <%--
        <section class="content-header">
          <g:render template="/layouts/server-message" bean="${announcement}"/>
        </section> --%>
        <section class="content">
          <div class="row">
            <div class="col-xs-12">
                <ul class="nav nav-tabs">
                  <li class="active"><a href="#" data-target="#" data-toggle="tab"><big>${pageTitle}</big></a></li>
                </ul>
              <div class="box">
                <div class="box-header"></div> <%--
                <div class="box-header panel panel-default"><h3 class="box-title">${pageTitle}</h3></div> --%>
                <div class="box-body">
                  <table id="list-announcement" class="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th></th>
                        <th><span class="search-input"><input type="text"><br></span>公告</span>內容
						</th>
                        <th>公告<span class="hidden-xs">日期</span></th>
                        <th>撤榜<span class="hidden-xs">日期</span></th>
						<th>建立<span class="hidden-xs">日期</span></th>
						<th><span class="hidden-xs">特定</span>作業</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
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
	<asset:script type='text/javascript'><%-- deferred JS here --%>
$(function() {
	<g:render template="/layouts/client-message"/>
	announcement({});
});
	</asset:script>
</body>
</html>
