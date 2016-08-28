<g:set var="embedPage" value="${params?.embed=='true'}" scope="request"/>
<g:set var="deferredScript" value="form/supplier" scope="request"/>
<!DOCTYPE html>
<html>
    <head>
        <meta name="layout" content="main" />
        <asset:stylesheet src="grid"/> <%--
        <asset:stylesheet src="form/supplier"/> --%>
<g:if test="${! embedPage}">
		<asset:javascript src="grid"/>
</g:if>
    </head>
    <body>
<g:if test="${! embedPage}">
    <div class="content-wrapper" role="main"> <%--
        <section class="content-header">
          <g:render template="/layouts/server-message" bean="${supplier}"/>
        </section> --%>
        <section class="content">
          <div class="row">
            <div class="col-xs-12">
              <ul class="nav nav-tabs">
                <li class="active"><a href="#" data-target="#" data-toggle="tab"><big>${pageTitle}</big></a></li>
              </ul>
</g:if>
              <div class="box">
                <div class="box-header"></div>
                <div class="box-body">
                  <table id="list-supplier" class="table table-bordered table-hover">

					  <thead>
						<tr>
						  <th></th>
						  <th><span class="search-input"><input type="text" size="10"><br></span><span class="hidden-xs hidden-sm hidden-md">供應商</span>代碼</th>
						  <th><span class="search-input"><input type="text" size="20"><br></span><span class="hidden-xs hidden-sm hidden-md">供應商</span>名稱</th>
						  <th><span class="search-input"><input type="text" size="8"><br></span>統<span class="hidden-xs hidden-sm hidden-md">一</span>編<span class="hidden-xs hidden-sm hidden-md">號</span></th>
						  <th>電話</th>
						  <th>傳真<span class="hidden-xs hidden-sm hidden-md">電話</span></th>
						  <th><span class="hidden-xs hidden-sm hidden-md">電子郵件</span>信箱</th>
						  <th>聯絡人</th>
						  <th>聯絡電話</th>
						</tr>
					  </thead>
					  <tbody>
						<tr>
						  <td></td>
						  <td>test</td>
						  <td>TEST</td>
						  <td>1234567</td>
						  <td>04-1234567</td>
						  <td></td>
						  <td>linchinghui@gmail.com</td>
						  <td>Lin Chinghui</td>
						  <td>04-1234567</td>
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
</g:if>
<asset:script type='text/javascript'><%-- deferred JS here --%>
$(function() {
	<g:render template="/layouts/client-message"/>
	createDataTable();
});
</asset:script>
    </body>
</html>
