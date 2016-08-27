<g:set var="deferredScript" value="form/revenue" scope="request"/>
<!DOCTYPE html>
<html>
    <head>
        <meta name="layout" content="main" />
        <asset:stylesheet src="grid"/>
        <asset:stylesheet src="form/revenue"/>
    </head>
    <body>
    <div class="content-wrapper" role="main"> <%--
        <section class="content-header">
          <g:render template="/layouts/server-message" bean="${revenue}"/>
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
                  <table id="list-revenue" class="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th></th>
                        <th><span class="search-input"><input type="text" size="10"><br></span>專案</th>
                        <th><span class="search-input"><input type="text" size="10"><br></span>發票號碼</th>
                        <th>發票日期</th>
                        <th>入帳日期</th><%--
                        <th>調改日期</th>
                        <th>註記</th>--%>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td></td>
                        <td>test</td>
                        <td>AB-12345678</td>
                        <td>2016/05/10</td>
                        <td>2016/06/05</td><%--
                        <td></td>
                        <td></td>--%>
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
	createDataTable();
});
</asset:script>
    </body>
</html>
