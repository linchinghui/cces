<g:set var="embedPage" value="${params?.embed=='true'}" scope="request"/>
<g:set var="deferredScript" value="form/vehicleMilage" scope="request"/>
<!DOCTYPE html>
<html>
    <head>
        <meta name="layout" content="main" />
        <asset:stylesheet src="grid"/> <%--
        <asset:stylesheet src="form/vehicleMilage"/> --%>
<g:if test="${! embedPage}">
        <asset:javascript src="grid"/>
</g:if>
    </head>
    <body>
<g:if test="${embedPage}">
              <div class="box">
                <div class="box-header"></div>
                <div class="box-body">
                  <table id="list-vehicleMilage" class="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th></th>
                        <th>車輛</th>
                        <th><span class="hidden-xs">里程(</span>公里<span class="hidden-xs">)</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td></td>
                        <td>AB-123</td>
                        <td>123</td>
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
                  <table id="list-vehicleMilage" class="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th></th>
                        <th>專案</th>
                        <th><span class="hidden-xs">用車</span>日期</th>
                        <th>車輛</th>
                        <th><span class="hidden-xs">里程(</span>公里<span class="hidden-xs">)</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td></td>
                        <td>SUPER</td>
                        <td>2016/01/02</td>
                        <td>AB-123</td>
                        <td>123</td>
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
var serverParams = {
  embed: ${embedPage},
  projectId: '${params?.projectId}',
  dispatchedDate: '${params?.dispatchedDate}'
};

$(function() {
  <g:render template="/layouts/client-message" bean="${vehicleMilage}"/>
  createCriterionListener();
  createMilageTable();
});
</asset:script>
    </body>
</html>
