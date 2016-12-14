<g:set var="embedPage" value="${params?.embed=='true'}" scope="request"/>
<g:set var="deferredScript" value="form/dispose${embedPage?'Only':''}" scope="request"/>
<%
	def calendar = Calendar.instance
	if (params?.month) {
		calendar.set(Calendar.MONTH, ((params.month as int) - 1))
	}
	def thisMonth = calendar.get(Calendar.MONTH)
	def lastDayOfMonth = calendar.getActualMaximum(Calendar.DAY_OF_MONTH)
%>
<!DOCTYPE html>
<html>
    <head>
        <meta name="layout" content="main" /><%--
		<asset:stylesheet src="grid"/>--%>
		<asset:stylesheet src="form/dispose"/>
    </head>
    <body>
<g:if test="${! embedPage}">
    <div class="content-wrapper" role="main"> <%--
        <section class="content-header">
          <g:render template="/layouts/server-message" bean="${spTask}"/>
        </section> --%>
        <section class="content">
          <div class="row">
            <div class="col-xs-12">
              <div class="clearfix">
				<div class="projectContainer col-sm-5 col-xs-12">
                    <label for="project" class="hidden-xs">專案:</label>
                    <div class="assignProject form-control" data-placeholder="專案代碼或名稱關鍵字">
                      <span class="text-center"><span class="ajax-loader">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
                    </div>
                  </div>
  				<div class="constNoContainer col-sm-3 col-xs-12">
                    <label for="project" class="hidden-xs">機台:</label>
                    <div class="assignConstNo form-control" data-placeholder="機台編號">
                      <span class="text-center"><span class="ajax-loader">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
                    </div>
  			  	</div>
              </div>
              <ul class="nav nav-tabs">
                <li class="active">
					<a data-toggle="mtab" data-target="#tab1" href="#">
                      <big>人員配置(${thisMonth+1}月)</big>
                    </a>
                </li>
              </ul>
              <div class="tab-content">
                <div id="tab1" class="tab-pane fade in active">
</g:if>
				  <asset:stylesheet src="form/disposeOnly"/>
                  <div class="box">
                    <div class="box-header">
						<div class="workerContainer col-sm-6 col-xs-12">
						  <label for="worker" class="hidden-xs">員工:</label>
						  <div class="assignWorker form-control has-error" data-placeholder="員工編號或姓名關鍵字">
							<span class="text-center"><span class="ajax-loader">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
						  </div>
						</div>
                    </div>
                    <div class="box-body">
                      <table id="list-dispose" class="table table-bordered table-hover">
                        <thead>
                          <tr>
                            <th></th>
                            <th>員工</th>
							<g:each var="i" in="${(1..lastDayOfMonth)}"><th>${i}</th></g:each>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td></td>
                            <td></td>
							<g:each var="i" in="${(1..lastDayOfMonth)}"><td><i class="fa fa-circle-thin"></i></td></g:each>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
<g:if test="${! embedPage}">
                </div>
              </div>
            </div>
          </div>
        </section>
    </div>
</g:if>
<asset:script type='text/javascript'><%-- deferred JS here --%>
var serverParams2 = {
	embed: ${embedPage},
	employeeId: '${params?.employeeId}',
	month: ${thisMonth},
	lastDayOfMonth: ${lastDayOfMonth}
};
<g:if test="${! embedPage}">
var serverParams = {
    year: ${params?.year?:'null'},
    constructNo: '${params?.constructNo}',
    projectId: '${params?.projectId}'
};
</g:if>
$(function() {
	<g:render template="/layouts/client-message"/>
<g:if test="${! embedPage}">
	initializeSelectFields();
</g:if>
	initializeDisposes();
	$('input[type=text],textarea').filter(':enabled:visible:first').focus();
});
</asset:script>
    </body>
</html>
