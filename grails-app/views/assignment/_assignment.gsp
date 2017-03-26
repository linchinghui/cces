<g:set var="deferredScript" value="form/assignment" scope="request"/>
<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main"/>
	<asset:stylesheet src="form/assignCommon"/>
</head>
<body>
	<asset:stylesheet src="form/assignment"/>
    <div class="content-wrapper" role="main"> <%--
        <section class="content-header">
          <g:render template="/layouts/server-message" bean="${assignment}"/>
        </section> --%>
        <section class="content">
          <div class="row">
            <div class="col-xs-12">
              <div class="clearfix"> <%--
                <div class="projectContainer col-sm-5 col-xs-11">
                  <label for="project" class="hidden-xs">專案:</label>
                  <div class="assignProject form-control" data-placeholder="專案代碼或名稱關鍵字">
                    <span class="text-center"><span class="ajax-loader">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
                  </div>
                </div>
				<div class="constNoContainer col-sm-4 col-xs-11">
                  <label for="constructNo" class="hidden-xs">機台:</label>
                  <div class="assignConstNo form-control" data-placeholder="機台編號">
                    <span class="text-center"><span class="ajax-loader">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
                  </div>
				</div> --%>
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
                  <a data-toggle="mtab" data-target="#tab1" href="#"><big>${pageTitle}</big></a>
				</li><%--
				<li>
				  <a data-toggle="mtab" data-target="#tab2" href="${createLink([action:'index', params:[embed:true, by:'daily']])}">
					<big>${functionService.getPageTitle('assignDaily')}</big>
				  </a>
				</li>--%>
				<li>
				  <a data-toggle="mtab" data-target="#tab3" href="${createLink([action:'index', params:[embed:true, by:'monthly']])}">
					<big>${functionService.getPageTitle('assignMonthly')}</big>
				  </a>
                </li>
				<li class="assignLoad">
				  <span class="ajax-loader">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
				</li>
              </ul>
			  <div class="tab-content">
                <div id="tab1" class="tab-pane fade in active">
					<div class="box">
					  <div class="box-header"></div> <%--
                      <div class="box-header panel panel-default"><h3 class="box-title">${pageTitle}</h3></div> --%>
					  <div class="box-body">
						  <div class="assignCLNDR">
							<span class="text-center">
							  <span class="ajax-loader">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
						    </span>
						  </div>
						  <div class="assignContainer">
						    <div class="panel panel-infox">
						    	<div class="panel-body">
									<div class="col-xs-8 col-sm-6 col-md-4">
										<g:render template="/_fields/date/displayWrapper" model="['label':'日期:', 'property': 'assignDate']" />
									</div>
									<div class="clearfix"></div><br>
					    			<div class="projectContainer col-xs-8 col-sm-6 col-md-4">
					    			    <label for="project">專案:</label>
					    			    <div class="assignProject form-control" data-placeholder="專案代碼或名稱關鍵字">
					    			        <span class="text-center"><span class="ajax-loader">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
					    			    </div>
					    			</div>
									<div class="clearfix"></div><br>
					    			<div class="constNoContainer col-xs-8 col-sm-6 col-md-4">
					    			    <label for="constructNo">機台:</label>
					    			    <div class="assignConstNo form-control" data-placeholder="機台編號">
					    			        <span class="text-center"><span class="ajax-loader">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
					    			    </div>
					    			</div>
									<div class="clearfix"></div><br>
					    			<form role="form" class="form-horizontal col-xs-offset-1 col-sm-offset-1" name="assignmentForm" id="assignmentForm"> <%--
										<g:if test="${_csrf?.parameterName}">
										  <input name='${_csrf?.parameterName}' type='hidden' value='${_csrf?.token}'/>
									  </g:if> --%>
					    			    <fieldset class="buttons">
											<input class="save btn btn-success" type="submit" value="確認" />
											<input class="btn btn-default" type="reset" value="取消" />
					    			    </fieldset>
					    			</form>
						        </div>
						    </div>
						</div>
					  </div>
					</div>
				</div>
                <div id="tab2" class="tab-pane fade">
                  <div class="box">
                    <div class="box-header"></div>
                    <div class="box-body">
                      <span class="ajax-loader">請稍候&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    </div>
				  </div>
				</div>
                <div id="tab3" class="tab-pane fade">
                  <div class="box">
                    <div class="box-header"></div>
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
	$('.assignLoad').hide();
	<g:render template="/layouts/client-message"/>
	assignments({
		calendarTemplate: server.ctxPath + '<g:resource dir="static/assignment" file="calendar.tmpl" />'
	});
	<%--
	<g:render template="/layouts/client-render" model="[formVar: 'editForm']"/>
	<g:render template="/layouts/client-submit" model="[formVar: 'editForm']"/> --%>
	$('input[type=text],textarea').filter(':enabled:visible:first').focus();
});
	</asset:script>
</body>
</html>
