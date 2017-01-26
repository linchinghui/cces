<g:set var="deferredScript" value="form/worker" scope="request"/>
<!DOCTYPE html>
<html>
    <head>
        <meta name="layout" content="main" />
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
				<li class="active">
				  <a data-toggle="mtab" data-target="#tab1" href="#"><big>${pageTitle}</big></a>
			    </li>
				<li>
				  <a data-toggle="mtab" data-target="#tab2" href="${createLink([controller:'certificateCategory',action:'index',params:[embed:true]])}">
					<big>${functionService.getPageTitle('certificateCategory')}</big>
				  </a>
				</li>
				<li>
				  <a data-toggle="mtab" data-target="#tab3" href="${createLink([controller:'certificateOrgan',action:'index',params:[embed:true]])}">
					<big>${functionService.getPageTitle('certificateOrgan')}</big>
				  </a>
			    </li>
			  </ul>
			  <div class="tab-content">
                <div id="tab1" class="tab-pane fade in active">
	              <div class="box">
	                <div class="box-header"></div>
	                <div class="box-body">
						<table id="list-worker" class="table table-bordered table-hover">
	                      <thead>
	                        <tr>
	                          <th></th>
	                          <th><span class="search-input"><input type="text" size="8"><br></span><span class="hidden-xs">員工</span>編號</th>
	                          <th><span class="search-input"><input type="text" size="10"><br></span>姓名</th>
	                          <th>性別</th>
	                          <th>到職<span class="hidden-xs">日</span></th>
	                          <th>離職<span class="hidden-xs">日</span></th>
	                          <th>大頭照<span class="hidden-xs hidden-sm"><br class=" hidden-md"/></span></th>
	                          <th>身分證<span class="hidden-xs hidden-sm">影本<br class=" hidden-md"/></span></th>
	                          <th>健保卡<span class="hidden-xs hidden-sm">影本<br class=" hidden-md"/></span></th>
	                          <th>畢業證書<span class="hidden-xs hidden-sm">影本<br class=" hidden-md"/></span></th>
	                          <th>退伍令<span class="hidden-xs hidden-sm">影本<br class=" hidden-md"/></span></th>
	                          <th>駕照<span class="hidden-xs hidden-sm">影本<br class=" hidden-md"/></span></th>
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
	                          <td></td>
	                          <td></td>
	                          <td></td>
	                          <td></td>
	                          <td></td>
	                          <td></td>
	                        </tr>
	                      </tbody>
	                    </table>
	                </div>
	              </div>
				  <div class="detail"></div>
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
var serverParams = {
	sexType: {
		keyLength: ${com.lch.cces.SexType.keyLength()},
		types: JSON.parse('${(com.lch.cces.SexType.map() as grails.converters.JSON).encodeAsJavaScript()}')
	},
	detailLink: '${createLink([controller:"certificate", action:"index"])}'
};

$(function() {
	<g:render template="/layouts/client-message"/>
	createDetailTab();
	createDataTable();
	handleTabs();
});
</asset:script>
    </body>
</html>
