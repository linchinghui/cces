<g:set var="deferredScript" value="form/function" scope="request"/>
<!DOCTYPE html>
<html>
    <head>
        <meta name="layout" content="main" />
        <asset:stylesheet src="grid"/> <%--
        <asset:stylesheet src="form/function"/> --%>
    </head>
    <body>
      <div class="content-wrapper" role="main"> <%--
        <section class="content-header">
          <g:render template="/layouts/server-message" bean="${function}"/>
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
                  <table id="list-function" class="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th></th>
                        <th>作業代碼</th>
                        <th>作業名稱</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td></td>
                        <td>test</td>
                        <td>測試作業</td>
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
  <g:render template="/layouts/client-message" bean="${function}"/>
  createDataTable();
});
</asset:script>
    </body>
</html>
