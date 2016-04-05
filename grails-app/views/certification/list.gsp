<g:set var="embedPage" value="${params?.embed=='true'}" scope="request"/>
<g:set var="deferredScript" value="form/certification" scope="request"/>
<g:set var="functionService" bean="functionService"/>
<g:set var="pageTitle" value="${functionService.get('certification')?.description}"/>
<!DOCTYPE html>
<html>
    <head>
        <meta name="layout" content="main" />
        <title>CCES - ${pageTitle}</title>
        <asset:stylesheet src="grid"/> <%--
        <asset:stylesheet src="form/certification"/> --%>
<g:if test="${! embedPage}">
        <asset:javascript src="grid"/>
</g:if>
    </head>
    <body>
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
                  <table id="list-certification" class="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th></th>
<g:if test="${! embedPage}">
                        <th>證照</th>
</g:if>
                        <th>考取年月</th>
                        <th>有效年月</th>
                        <th>回訓日期</th>
                        <th>證照影本<span class="hidden-xs">繳交日</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td></td>
<g:if test="${! embedPage}">
                        <td>Test Certification</td>
</g:if>
                        <td>2015/12</td>
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
<g:if test="${! embedPage}">
        </section>
      </div>
</g:if>
      <asset:script type='text/javascript'><%-- deferred JS here --%>
var serverParams = {
  embedPage: ${embedPage}
};

$(function() {
  createDetailDataTable();
});
      </asset:script>
    </body>
</html>