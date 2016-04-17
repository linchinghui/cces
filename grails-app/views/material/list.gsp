<g:set var="deferredScript" value="form/material" scope="request"/>
<g:set var="functionService" bean="functionService"/>
<g:set var="pageTitle" value="${functionService.get('material')?.description}"/>
<!DOCTYPE html>
<html>
    <head>
        <meta name="layout" content="main" />
        <title>CCES - ${pageTitle}</title>
        <asset:stylesheet src="grid"/> <%--
        <asset:stylesheet src="form/material"/> --%>
    </head>
    <body>
      <div class="content-wrapper" role="main"> <%--
        <section class="content-header">
          <g:render template="/layouts/server-message" bean="${material}"/>
        </section> --%>
        <section class="content">
          <div class="row">
            <div class="col-xs-12">
              <ul class="nav nav-tabs">
                <li class="active">
                  <a data-toggle="mtab" data-target="#tab1" href="#"><big>${pageTitle}</big></a>
                </li>
                <li>
                  <a data-toggle="mtab" data-target="#tab2" href="${g.createLink([controller:'materialCategory',action:'index',params:[embed:true]])}">
                    <big>${functionService.get('materialCategory')?.description}</big>
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
                      <table id="list-material" class="table table-bordered table-hover">
                        <thead>
                          <tr>
                            <th></th>
                            <th>類別</th>
                            <th>名稱</th>
                            <th>尺寸<br class="hidden-xs">規格</th>
                            <th>單位</th>
                            <th>數量</th>
                            <th>價格</th>
                            <th>供應商</th>
                            <th>電話</th>
                            <th>登錄日期</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td></td>
                            <td>管材</td>
                            <td>PVC管材</td>
                            <td>4m x 6m x 5m</td>
                            <td>個</td>
                            <td>1</td>
                            <td>100</td>
                            <td>supplier</td>
                            <td>04-449449</td>
                            <td>2016/01/02</td>
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
  <g:render template="/layouts/client-message" bean="${material}"/>
  createTabs();
  createDataTable();
});
</asset:script>
    </body>
</html>