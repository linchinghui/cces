<g:set var="embedPage" value="${params?.embed=='true'}" scope="request"/>
<g:set var="deferredScript" value="form/assignMonthly" scope="request"/>
<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main" />
</head>
<body>
	<asset:stylesheet src="form/assignMonthly"/>
<g:if test="${! embedPage}">
    <div class="content-wrapper" role="main">
        <section class="content">
          <div class="row">
            <div class="col-xs-12">
              <div class="clearfix">
				<div class="monthContainer col-sm-3 col-xs-5">
					<f:field property="assignMonth" label="月份:" widget="yearMonth" value="${assignMonth}" />
				</div>
				<div class="workerContainer col-sm-4 col-xs-7"> <%--
				  <label for="worker">員工:</label>
				  <div class="assignWorker form-control has-error" data-placeholder="員工編號或姓名關鍵字">
					<span class="text-center"><span class="ajax-loader">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
				  </div> --%>
				  <g:render template="/_fields/worker/wrapper" model="['label':'員工：', 'property': 'assignWorker', 'placeholder': '員工編號或姓名關鍵字']" />
				</div>
              </div>
              <ul class="nav nav-tabs">
                <li class="active">
					<a data-toggle="tab" data-target="#" href="#"><big>${functionService.getPageTitle('assignMonthly')}</big></a>
                </li>
              </ul>
</g:if>
              <div class="box">
                <div class="box-header">
                </div>
                <div class="box-body">
                  <table id="list-monthly" class="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th></th>
                        <th>員工</th>
						<g:each var="i" in="${(1..31)}"><th>${i}</th></g:each>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td></td>
                        <td></td>
						<g:each var="i" in="${(1..31)}"><td><i class="fa fa-circle-thin"></i></td></g:each>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
<g:if test="${! embedPage}">
            </div>
          </div>
        </section>
    </div>
	<asset:javascript src="grid"/>
</g:if>
	<asset:script type='text/javascript'><%-- deferred JS here --%>
$(function() {
	<g:render template="/layouts/client-message"/>
	assignMonthly({
		embed: ${embedPage}
	});
<g:if test="${! embedPage}">
	$('input[type=text],textarea').filter(':enabled:visible:first').focus();
</g:if>
});
	</asset:script>
</body>
</html>
