<g:set var="deferredScript" value="form/assignment" scope="request"/>
<g:set var="functionService" bean="functionService"/>
<g:set var="pageTitle" value="${functionService.get('assignment')?.description}"/>
<!DOCTYPE html>
<html>
    <head>
        <meta name="layout" content="main" />
        <title>CCES - ${pageTitle}</title>
        <asset:stylesheet src="grid"/>
        <asset:stylesheet src="form/assignment"/>
    </head>
    <body>
      <div class="content-wrapper" role="main">
        <section class="content">
          <div class="row">
            <div class="col-xs-12">
              <div class="clearfix">
                <div class="projectContainer col-sm-7">
                  <label for="project" class="control-label hidden-xs">專案:</label>
                  <div class="assignProject form-control">
                    <span class="text-center"><span class="ajax-loader">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
                  </div>
                </div>
                <div class="weekContainer col-sm-5">
                  <div class="assignWeek">
                    <span class="text-center"><span class="ajax-loader">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
                  </div>
                </div>
              </div>
              <ul class="nav nav-tabs">
                <li class="active"><a href="#" data-target="#" data-toggle="tab"><big>${pageTitle}</big></a></li>
              </ul>
              <div class="box">
                <div class="box-header"></div>
                <div class="box-body">
                  <table id="list-assignment" class="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th></th>
                        <th>員工</th><%--
                        <th>專案</th>
                        <th>年</th>
                        <th>週</th>--%>
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
                        <td>T-123</td><%--
                        <td>CCES</td>
                        <th>2016</th>
                        <th>1</th>--%>
                        <th><i class="fa fa-square-o"></i></th>
                        <th><i class="fa fa-square-o"></i></th>
                        <th><i class="fa fa-square-o"></i></th>
                        <th><i class="fa fa-square-o"></i></th>
                        <th><i class="fa fa-square-o"></i></th>
                        <th><i class="fa fa-square-o"></i></th>
                        <th><i class="fa fa-square-o"></i></th>
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
var server = {
  pageTitle: '${pageTitle}',
  calendarTemplate: '<g:resource dir="static/assignment" file="calendar.tmpl" />',
  year: '${params?.year}',
  week: '${params?.week}',
  project: '${params?.project}'
};

$(function() {
  <g:render template="/layouts/client-message" bean="${assignment}"/>

  setupArrowKeys();
  initializeAssignment();
  loadAssignments();
  createDataTable();


    // detailSec
    //   .html('<div class="text-center"><span class="ajax-loader">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div>')
    //   .load('<g:resource dir="static/assignment" file="calendar.tmpl" />', null,
    //     function(response, status, jqXHR) {
    //       if (jqXHR.status >= 400) {
    //         detailSec.empty();
    //         alertError({}, jqXHR);

    //       } else {

    //       }
    //     });

});
</asset:script>
    </body>
</html>