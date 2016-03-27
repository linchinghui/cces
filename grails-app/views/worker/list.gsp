<g:set var="deferredScript" value="form/worker" scope="request"/>
<g:set var="functionService" bean="functionService"/>
<g:set var="pageTitle" value="${functionService.get('worker')?.description}"/>
<!DOCTYPE html>
<html>
    <head>
        <meta name="layout" content="main" />
        <title>CCES - ${pageTitle}</title>
        <asset:stylesheet src="grid"/> <%--
        <asset:stylesheet src="form/worker"/> --%>
    </head>
    <body>
      <div class="content-wrapper" role="main"> <%--
        <section class="content-header">
          <g:render template="/layouts/server-message" bean="${worker}"/>
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
                  <table id="list-worker" class="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th></th>
                        <th><span class="hidden-xs">員工</span>編號</th>
                        <th>姓名</th>
                        <th>性別</th>
                        <th>到職<span class="hidden-xs">日</span></th>
                        <th>離職<span class="hidden-xs">日</span></th>
                        <th>大頭照<span class="hidden-xs">繳交日</span></th>
                        <th>身分證<span class="hidden-xs">影本繳交日</span></th>
                        <th>健保卡<span class="hidden-xs">影本繳交日</span></th>
                        <th>畢業證書<span class="hidden-xs">影本繳交日</span></th>
                        <th>退伍令<span class="hidden-xs">影本繳交日</span></th>
                        <th>駕照<span class="hidden-xs">影本繳交日</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td></td>
                        <td>12345</td>
                        <td>王某</td>
                        <td>男</td>
                        <td>2016/1/2</td>
                        <td></td>
                        <td>2016/1/2</td>
                        <td>2016/1/2</td>
                        <td>2016/1/2</td>
                        <td>2016/1/2</td>
                        <td>2016/1/2</td>
                        <td>2016/1/2</td>
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
  <g:render template="/layouts/client-message" bean="${worker}"/>
  createDataTable();
});
</asset:script>
    </body>
</html>