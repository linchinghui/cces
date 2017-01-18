<%@ page import="com.lch.cces.*" %>
<g:set var="deferredScript" value="form/dynamicEnum" scope="request"/>
<!DOCTYPE html>
<html>
    <head>
        <meta name="layout" content="main" />
        <asset:stylesheet src="grid"/>
        <asset:stylesheet src="form/dynamicEnum"/>
    </head>
    <body>
    <div class="content-wrapper" role="main">
        <section class="content">
          <div class="row">
            <div class="col-xs-12">
              <ul class="nav nav-tabs">
                <li class="active">
                  <a data-toggle="mtab" data-target="#tab1" href="#">
                    <big>${ProjectType.label()}</big>
                  </a>
                </li>
				<li>
                  <a data-toggle="mtab" data-target="#tab2" href="#">
                    <big>${ConstructType.label()}</big>
                  </a>
                </li>
              </ul>
              <div class="tab-content">
                <div id="tab1" class="tab-pane fade in active">
					<g:render template="listType" model="[type: 'project', keyLength: ProjectType.keyLength(), list: projectType]"/>
				</div>
                <div id="tab2" class="tab-pane fade">
					<g:render template="listType" model="[type: 'construct', keyLength: ConstructType.keyLength(), list: constructType]"/>
                </div>
              </div>
            </div>
          </div>
        </section>
    </div>
<asset:script type='text/javascript'><%-- deferred JS here --%>
var serverParams = {
	keyInfo: {
		'projectType': {
			'from': 'name',
			'len': ${ProjectType.keyLength()}
		},
		'constructType': {
			'from': 'name',
			'len': ${ConstructType.keyLength()}
		}
	}
};
$(function() {
	<g:render template="/layouts/client-message"/>
	handleTabs();
	createDataTable();
});
</asset:script>
    </body>
</html>
