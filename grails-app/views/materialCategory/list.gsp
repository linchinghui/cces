<g:set var="embedPage" value="${params?.embed=='true'}" scope="request"/>
<g:set var="deferredScript" value="form/materialCategory" scope="request"/>
<g:set var="functionService" bean="functionService"/>
<g:set var="pageTitle" value="${functionService.get('materialCategory')?.description}"/>
<!DOCTYPE html>
<html>
    <head>
        <meta name="layout" content="main" />
        <title>CCES - ${pageTitle}</title>
        <asset:stylesheet src="grid"/> <%--
        <asset:stylesheet src="form/materialCategory"/> --%>
<g:if test="${! embedPage}">
        <asset:javascript src="list"/>
</g:if>
    </head>
    <body>
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
                  <table id="list-materialCategory" class="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th></th>
                        <th>代碼</th>
                        <th>類型名稱</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td></td>
                        <td>test</td>
                        <td>測試類型</td>
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
</g:if>
      <asset:script type='text/javascript'><%-- deferred JS here --%>
$(function() {
  <g:render template="/layouts/client-message" bean="${materialCategory}"/>
  createCatDataTable();
});
      </asset:script>
    </body>
</html>