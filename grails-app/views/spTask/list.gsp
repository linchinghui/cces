<g:set var="deferredScript" value="form/spTask" scope="request"/><%--
<g:set var="theWorkedDate" value="${workedDate?:java.util.Calendar.instance.getTime()}"/>--%>
<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main" />
    <asset:stylesheet src="grid"/>
</head>
<body>
	<asset:stylesheet src="form/spTask"/>
    <div class="content-wrapper" role="main"> <%--
        <section class="content-header">
          <g:render template="/layouts/server-message" bean="${spTask}"/>
        </section> --%>
        <section class="content">
          <div class="row">
            <div class="col-xs-12">
              <div class="clearfix">
				<div class="dateContainer col-sm-3 col-xs-5">
					<f:field property="theWorkedDate" label="施作日期:" widget="date" /><%--value="${theWorkedDate}" />--%>
				</div>
				<div class="col-sm-9 col-xs-7">
                <div class="projectContainer col-sm-7 col-xs-12">
                  <label for="project">專案:</label>
                  <div class="assignProject form-control" data-placeholder="專案代碼或名稱關鍵字">
                    <span class="text-center"><span class="ajax-loader">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
                  </div>
                </div>
				<div class="constNoContainer col-sm-5 col-xs-12">
                  <label for="project">機台型號:</label>
                  <div class="assignConstNo form-control" data-placeholder="機台型號">
                    <span class="text-center"><span class="ajax-loader">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
                  </div>
				</div>
				</div>
              </div>
              <ul class="nav nav-tabs">
                <li class="active">
                  <a data-toggle="mtab" data-target="#tab1" href="#"><big>${pageTitle}</big></a>
                </li>
                <li>
                  <a data-toggle="mtab" data-target="#tab2" href="${createLink([controller:'vehicleMilage', action:'index'])}">
                    <big>${functionService.getPageTitle('vehicleMilage')}</big>
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
                      <table id="list-spTask" class="table table-bordered table-hover">
                        <thead>
                          <tr>
                            <th></th>
							<th><%--<span class="search-input" placeholder="代碼"><input type="text" size="10"><br>--%>專案</th>
							<th><span class="hidden-xs">施作</span>日期</th>
							<th><span class="hidden-xs">工程</span>地點</th>
                            <th>機台<span class="hidden-xs">型號</span></th>
                            <th><span class="search-input" placeholder="員工編號"><input type="text" size="10"><br><span class="hidden-xs">工作</span>人員</th><%--
                            <th><span class="hidden-xs">工作</span>型態</th>--%>
                            <th>施作<span class="hidden-xs">方式</span></th>
                            <th>備註</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td></td>
							<td>PA</td>
							<td>2017/04/01</td>
							<td>竹科</td>
                            <td>X-123</td>
                            <td>黃之應</td><%--
                            <td>點工</td>--%>
                            <td>高架</td>
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
	<g:render template="/layouts/client-message"/>
	spTask({ <%--
		theWorkedDate: '${theWorkedDate}', --%>
		projectId: '${params?.projectId}',
		constructNo: '${params?.constructNo}'
	});
	$('input[type=text],textarea').filter(':enabled:visible:first').focus();
});
	</asset:script>
</body>
</html>
