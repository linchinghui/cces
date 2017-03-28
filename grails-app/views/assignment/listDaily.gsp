<g:set var="embedPage" value="${params?.embed=='true'}" scope="request"/>
<g:set var="deferredScript" value="form/assignDaily" scope="request"/>
<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main" />
</head>
<body>
	<asset:stylesheet src="form/assignDaily"/>
<g:if test="${! embedPage}">
    <div class="content-wrapper" role="main">
        <section class="content">
          <div class="row">
            <div class="col-xs-12">
              <div class="clearfix">
                <div class="monthContainer col-sm-3 col-xs-5">
				  <f:field property="assignMonth" label="月份:" widget="yearMonth" value="${assignMonth}" />
				</div>
              </div>
              <ul class="nav nav-tabs">
				<li class="active">
                  <a data-toggle="tab" data-target="#" href="#"><big>${functionService.getPageTitle('assignDaily')}</big></a>
                </li>
              </ul>
</g:if>
			  <div class="box">
				<div class="box-header">
				</div>
				<div class="box-body">
				  <div class="assignDaily">
					<span class="text-center">
					  <span class="ajax-loader">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
				    </span>
				  </div>
				</div>
			  </div>
<g:if test="${! embedPage}">
            </div>
          </div>
        </section>
    </div>
</g:if>
	<asset:script type='text/javascript'><%-- deferred JS here --%>
var serverParams2 = {
	embed: ${embedPage} <%--,
	daysOfMonth: ${assignMonthDays} --%>
};
$(function() {
	<g:render template="/layouts/client-message"/>
	initializeDaily();
	if (! ${embedPage}) { // serverParams2.embed) {
		$('input[type=text],textarea').filter(':enabled:visible:first').focus();
	}
});
	</asset:script>
</body>
</html>
