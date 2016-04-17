<g:set var="deferredScript" value="form/project" scope="request"/>
<g:set var="functionService" bean="functionService"/>
<g:set var="pageTitle" value="${functionService.get('project')?.description}"/>
<!DOCTYPE html>
<html>
    <head>
        <meta name="layout" content="main" />
        <title>CCES - ${pageTitle}</title>
        <asset:stylesheet src="grid"/> <%--
        <asset:stylesheet src="form/project"/> --%>
    </head>
    <body>
      <div class="content-wrapper" role="main"> <%--
        <section class="content-header">
          <g:render template="/layouts/server-message" bean="${project}"/>
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
                  <table id="list-project" class="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th rowspan="2"></th>
                        <th colspan="1">專案</th>
                        <th colspan="1">案名</th>
<%--
                        <th rowspan="2">案名<br><br>機台<br class="visible-xs">型號</th>
--%>
                        <th rowspan="2">序號</th>
                        <th colspan="1">工程</th>
                        <th colspan="1">施作</th>
                        <th colspan="2">期程</th>

                        <th rowspan="2">合約<br class="hidden-xs visible-sm visible-md visible-lg"><br>委外<br class="hidden-xs visible-sm">編號</th>
<%--
                        <th colspan="1"><span class="hidden-xs">合約</span></th>
--%>
                        <th colspan="4"><span class="visible-xs">...</span><span class="hidden-xs">其他<br class="visible-sm">資訊</span></th>
                      </tr>
                      <tr>
                        <th>代碼</th>

                        <th>機台<br class="visible-xs">型號</th>

                        <th>地點</th>
                        <th>方式</th>

                        <th>開始</th>
                        <th>結束</th>
<%--
                        <th><span class="visible-xs">合約<br></span>委外<br class="hidden-xs"><span class="visible-sm">編號</span></th>
--%>
                        <th>甲方</th>
                        <th>聯絡人</th>
                        <th>手機</th>
                        <th>備註</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td></td>
                        <td>test</td>
                        <td>測試專案</td>
                        <td>1</td>
                        <td>台中</td>
                        <td>其他</td>
                        <td>2016/01/02</td>
                        <td>2016/01/31</td>
                        <td>No123456</td>
                        <td>黃之應</td>
                        <td>林慶輝</td>
                        <td>0936-034575</td>
                        <td>有問題可以打電支援</td>
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
  <g:render template="/layouts/client-message" bean="${project}"/>
  initializeConstrctTypes();
  createDataTable();
});
</asset:script>
    </body>
</html>