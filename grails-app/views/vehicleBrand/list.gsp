<g:set var="embedPage" value="${params?.embed=='true'}" scope="request"/>
<g:set var="deferredScript" value="form/vehicleBrand" scope="request"/>
<g:set var="functionService" bean="functionService"/>
<g:set var="pageTitle" value="${functionService.get('vehicleBrand')?.description}"/>
<!DOCTYPE html>
<html>
    <head>
        <meta name="layout" content="main" />
        <title>CCES - ${pageTitle}</title>
        <asset:stylesheet src="grid"/> <%--
        <asset:stylesheet src="form/vehicleBrand"/> --%>
<g:if test="${! embedPage}">
        <asset:javascript src="grid"/>
</g:if>
    </head>
    <body>
<g:if test="${embedPage}">
              <div class="box">
                <div class="box-header"></div>
                <div class="box-body">
                  <table id="list-vehicleBrand" class="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th></th>
                        <th>代碼</th>
                        <th>廠牌</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td></td>
                        <td>SUPER</td>
                        <td>測試廠牌</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
</g:if>
<g:else>
      <div class="content-wrapper" role="main">
        <section class="content">
          <div class="row">
            <div class="col-xs-12">
              <ul class="nav nav-tabs">
                <li class="active"><a href="#" data-target="#" data-toggle="tab"><big>${pageTitle}</big></a></li>
              </ul>
              <div class="box">
                <div class="box-header"></div>
                <div class="box-body">
                  <table id="list-vehicleBrand" class="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th></th>
                        <th>代碼</th>
                        <th>廠牌</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td></td>
                        <td>SUPER</td>
                        <td>測試廠牌</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
</g:else>
<asset:script type='text/javascript'><%-- deferred JS here --%>
$(function() {
  <g:render template="/layouts/client-message" bean="${vehicleBrand}"/>
  createBrandDataTable();
});
</asset:script>
    </body>
</html>