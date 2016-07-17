<g:set var="deferredScript" value="form/vehicle" scope="request"/>
<!DOCTYPE html>
<html>
    <head>
        <meta name="layout" content="main" />
        <asset:stylesheet src="grid"/> <%--
        <asset:stylesheet src="form/vehicle"/> --%>
    </head>
    <body>
      <div class="content-wrapper" role="main"> <%--
        <section class="content-header">
          <g:render template="/layouts/server-message" bean="${vehicle}"/>
        </section> --%>
        <section class="content">
          <div class="row">
            <div class="col-xs-12">
              <ul class="nav nav-tabs">
                <li class="active">
                  <a data-toggle="mtab" data-target="#tab1" href="#"><big>${pageTitle}</big></a>
                </li>
                <li>
                  <a data-toggle="mtab" data-target="#tab2" href="${createLink([controller:'vehicleBrand', action:'index', params:[embed:true]])}">
                    <big>${functionService.getPageTitle('vehicleBrand')}</big>
                  </a>
                </li>
              </ul>
              <div class="tab-content">
                <div id="tab1" class="tab-pane fade in active">
                  <div class="box">
                    <div class="box-header"></div> <%--
                    <div class="box-header panel panel-default">
                      <h3 class="box-title">${pageTitle}</h3>
                    </div> --%>
                    <div class="box-body">
                      <table id="list-vehicle" class="table table-bordered table-hover">
                        <thead>
                          <tr>
                            <th></th>
                            <th>車號</th>
                            <th>驗車<span class="hidden-xs">日期</span></th>
                            <th><span class="hidden-xs">定檢</span>期限</th>
                            <th>廠牌</th>
                            <th>型號</th>
                            <th>備註</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td></td>
                            <td>AB-123</td>
                            <td></td>
                            <td></td>
                            <td>SUPER</td>
                            <td>GTR</td>
                            <td></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div id="tab2" class="tab-pane fade">
                  <div class="box">
                    <div class="box-header"></div> <%--
                    <div class="box-header panel panel-default">
                      <h3 class="box-title">${pageTitle}</h3>
                    </div> --%>
                    <div class="box-body">
                      <span class="ajax-loader">請稍候&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
<asset:script type='text/javascript'><%-- deferred JS here --%>
$(function() {
  <g:render template="/layouts/client-message" bean="${vehicle}"/>
  createDataTable();
  handleTabs();
});
</asset:script>
    </body>
</html>
