<g:set var="embedPage" value="${params?.embed=='true'}" scope="request"/>
<g:set var="deferredScript" value="form/dispose" scope="request"/><%--
<g:set var="functionService" bean="functionService"/>
<g:set var="pageTitle" value="${functionService.get('assignment')?.description}"/>--%>
<g:set var="pageTitle" value="本月人員配置"/>
<!DOCTYPE html>
<html>
    <head>
        <meta name="layout" content="main" />
        <title>CCES - ${pageTitle}</title>
        <asset:stylesheet src="grid"/>
        <asset:stylesheet src="form/dispose"/>
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
        <div class="content-wrapper" role="main"> <%--
        <section class="content-header">
          <g:render template="/layouts/server-message" bean="${spTask}"/>
        </section> --%>
        <section class="content">
          <div class="row">
            <div class="col-xs-12">
              <div class="clearfix">
                <div class="projectContainer col-sm-6 col-xs-12">
                  <label for="project" class="hidden-xs">專案:</label>
                  <div class="assignProject form-control">
                    <span class="text-center"><span class="ajax-loader">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
                  </div>
                </div>
                <div class="weekContainer col-sm-6 col-xs-12">
                  <div class="assignWeek">
                    <span class="text-center"><span class="ajax-loader">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
                  </div>
                </div>
              </div>
              <ul class="nav nav-tabs">
                <li class="active">
                  <a data-toggle="mtab" data-target="#tab1" href="#"><big>本月人員配置</big></a>
                </li>
                <li>
                  <a data-toggle="mtab" data-target="#tab2" href="${createLink([controller:'vehicleMilage', action:'index'])}">
                    <big>${pageTitle}</big>
                  </a>
                </li>
              </ul>

              <ul class="nav nav-tabs">
                <li class="active"><a href="#" data-target="#" data-toggle="tab"><big>${pageTitle}</big></a></li>
              </ul>

              <div class="tab-content">
                <div id="tab1" class="tab-pane fade in active">
                  test
                </div>
                <div id="tab2" class="tab-pane fade in active">
                  <div class="box">
                    <div class="box-header"><%--
                      <div class="projectContainer">
                        <div class="assignProject form-control">
                          <span class="text-center"><span class="ajax-loader">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
                        </div>
                      </div>--%>
                    </div>
                    <div class="box-body">
                      <table id="list-assignment" class="table table-bordered table-hover">
                        <thead>
                          <tr>
                            <th></th>
                            <th>員工</th><%--
                            <th>專案</th>--%>
                            <th>日</th>
                            <th>一</th>
                            <th>二</th>
                            <th>三</th>
                            <th>四</th>
                            <th>五</th>
                            <th>六</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td></td>
                            <td></td><%--
                            <td></td>--%>
                            <td><i class="fa fa-square-o"></i></td>
                            <td><i class="fa fa-square-o"></i></td>
                            <td><i class="fa fa-square-o"></i></td>
                            <td><i class="fa fa-square-o"></i></td>
                            <td><i class="fa fa-square-o"></i></td>
                            <td><i class="fa fa-square-o"></i></td>
                            <td><i class="fa fa-square-o"></i></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
</g:else>
<asset:script type='text/javascript'><%-- deferred JS here --%>
var server = {
  pageTitle: '${pageTitle}',
  calendarTemplate: '<g:resource dir="static/assignment" file="calendar.tmpl" />',
  year: ${params?.year?:'null'},
  week: ${params?.week?:'null'},
  project: '${params?.project}'
};

$(function() {
  <g:render template="/layouts/client-message" bean="${assignment}"/>
  initializeSelectFields();
  initializeAssignments();
  $('input[type=text],textarea').filter(':enabled:visible:first').focus();
});
</asset:script>
    </body>
</html>
