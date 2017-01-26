<g:set var="deferredScript" value="form/assignment" scope="request"/>
<!DOCTYPE html>
<html>
    <head>
        <meta name="layout" content="main" />
        <asset:stylesheet src="grid"/>
        <asset:stylesheet src="form/assignment"/>
    </head>
    <body>
    <div class="content-wrapper" role="main"> <%--
        <section class="content-header">
          <g:render template="/layouts/server-message" bean="${assignment}"/>
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
				<div class="constNoContainer col-sm-4 col-xs-12">
                  <label for="constructNo" class="hidden-xs">機台:</label>
                  <div class="assignConstNo form-control" data-placeholder="機台編號">
                    <span class="text-center"><span class="ajax-loader">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
                  </div>
				</div>
                <div class="monthContainer col-sm-3 col-xs-12">
				  <f:field property="assignMonth" label="月份:" widget="yearMonth" value="${assignMonth}" />
				</div>
              </div>
              <ul class="nav nav-tabs">
                <li class="active"><a href="#" data-target="#" data-toggle="tab"><big>${pageTitle}</big></a></li>
              </ul>

              <div class="box">
                <div class="box-header"><%--
					<div class="workerContainer col-sm-5 col-xs-11">
					  <label for="worker" class="hidden-xs">員工:</label>
					  <div class="assignWorker form-control has-error" data-placeholder="員工編號或姓名關鍵字">
						<span class="text-center"><span class="ajax-loader">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
					  </div>
				  </div>--%>
				</div>
                <div class="box-body">
					<table id="list-assignment" class="table table-bordered table-hover">
                      <thead>
                        <tr>
                          <th></th>
                          <th>
							<span class="search-input" placeholder="編號"><input type="text" size="10"><br></span>員工
						  </th>
	<g:each var="i" in="${(1..assignMonthDays)}">
						  <th>
		<g:if test="${i>=10}">
							<span>${i.toString()[0]}</span>
		</g:if>
							<br class="hidden-xs hidden-sm hidden-md hidden-lg">${i.toString()[-1]}
						  </th>
	</g:each>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td></td>
                          <td></td>
	<g:each var="i" in="${(1..assignMonthDays)}">
						  <td><i class="fa fa-circle-thin"></i></td>
	</g:each>
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
var serverParams = {
	projectId: '${params?.projectId}',
	constructNo: '${params?.constructNo}',
	assignMonthDays: ${assignMonthDays}
};

$(function() {
	<g:render template="/layouts/client-message"/>
	initializeSelectFields();
	initializeAssignments();
	$('.monthContainer label').addClass('hidden-xs');
	$('input[type=text],textarea').filter(':enabled:visible:first').focus();
});
</asset:script>
    </body>
</html>
