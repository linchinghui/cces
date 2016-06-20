<g:set var="deferredScript" value="form/supplier" scope="request"/>
<!DOCTYPE html>
<html>
    <head>
        <meta name="layout" content="main" />
        <asset:stylesheet src="grid"/> <%--
        <asset:stylesheet src="form/supplier"/> --%>
    </head>
    <body>
      <div class="content-wrapper" role="main"> <%--
        <section class="content-header">
          <g:render template="/layouts/server-message" bean="${supplier}"/>
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
                  <table id="list-supplier" class="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th></th>
                        <th>代碼</th>
                        <th>供應商名稱</th>
                        <th>統一編號</th>
                        <th>電話</th>
                        <th>傳真電話</th>
                        <th>電子郵件信箱</th>
                        <th>聯絡人</th>
                        <th>聯絡電話</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td></td>
                        <td>test</td>
                        <td>TEST</td>
                        <td>1234567</td>
                        <td>04-1234567</td>
                        <td></td>
                        <td>linchinghui@gmail.com</td>
                        <td>Lin Chinghui</td>
                        <td>04-1234567</td>
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
  <g:render template="/layouts/client-message" bean="${supplier}"/>
  createDataTable();
});
</asset:script>
    </body>
</html>
