<%--<g:set var="embedPage" value="${params?.embed=='true'}" scope="request"/>--%>
<g:set var="deferredScript" value="form/role" scope="request"/>
<g:set var="functionService" bean="functionService"/>
<g:set var="pageTitle" value="${functionService.get('role')?.description}"/>
<!DOCTYPE html>
<html>
    <head>
        <meta name="layout" content="main" />
        <title>CCES - ${pageTitle}</title>
        <asset:stylesheet src="grid"/> <%--
        <asset:stylesheet src="form/role"/> --%>
    </head>
    <body>
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
      </div>
<asset:script type='text/javascript'><%-- deferred JS here --%>
var server = {
  detailLink: '${g.createLink([controller:"privilege", action:"index"])}'
};

$(function() {
  <g:render template="/layouts/client-message" bean="${role}"/>
  createDetailTab();
  createDataTable();
});
</asset:script>
    </body>
</html>