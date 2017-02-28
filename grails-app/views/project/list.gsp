<g:set var="deferredScript" value="form/project" scope="request"/>
<!DOCTYPE html>
<html>
    <head>
        <meta name="layout" content="main" />
        <asset:stylesheet src="grid"/>
        <asset:stylesheet src="form/project"/>
    </head>
    <body>
    <div class="content-wrapper" role="main"> <%--
        <section class="content-header">
          <g:render template="/layouts/server-message" bean="${project}"/>
        </section> --%>
        <section class="content">
          <div class="row">
            <div class="col-xs-12">
                <ul class="nav nav-tabs">
                  <li class="active"><a href="#" data-target="#" data-toggle="tab"><big>${pageTitle}</big></a></li>
                </ul>
              <div class="box">
                <div class="box-header"></div> <%--
                <div class="box-header panel panel-default">
                  <h3 class="box-title">${pageTitle}</h3>
                </div> --%>
                <div class="box-body">
                  <table id="list-project" class="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th rowspan="2"/>
                        <th rowspan="2"><span class="search-input"><input type="text" size="8"><br></span>
                            <span class="hidden-md visible-lg">專案<br></span>代碼
                        </th>
                        <th rowspan="2"><span class="search-input"><input type="text" size="8"><br></span>
                            <span class="hidden-sm visible-md visible-lg">專案<br></span>名稱
                        </th>
                        <th rowspan="2"><span class="search-input"><input type="text" size="8"><br></span>
                            機台<span class="hidden-sm visible-md visible-lg">編號</span>
                        </th>
						<th rowspan="2"><span class="search-input"><input type="text" size="8"><br></span>
                            <span class="hidden-sm visible-md visible-lg">機台</span>類型
                        </th>
                        <th rowspan="2"><span class="search-input"><input type="text" size="8"><br></span>
                            <span class="hidden-sm visible-md visible-lg">工程<br></span>地點
                        </th>
                        <th rowspan="2"><span class="search-input" placeholder="編碼"><input type="text" size="3"><br></span>
                            <span class="hidden-sm visible-md visible-lg">工作<br></span>型態
                        </th>
                        <th rowspan="2"><span class="search-input" placeholder="編碼"><input type="text" size="3"><br></span>
                            施作<span class="hidden-sm visible-md visible-lg">方式</span>
                        </th>
                        <th colspan="2">
                          期程
                        </th>
                        <th>
                          <span class="hidden-xs">合約</span>
                        </th>
                        <th colspan="4">
                            <span class="visible-xs visible-sm">...</span>
                            <span class="hidden-xs hidden-sm">其他資訊</span>
                        </th>
                      </tr>
                      <tr>
                        <th>開始</th>
                        <th>結束</th>
                        <th><span class="visible-xs">合約</span>委外<br class="hidden-xs visible-sm visible-md">編號</th>
                        <th>甲方</th>
                        <th>聯絡人</th>
                        <th>手機</th>
                        <th>備註</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td></td>
                        <td>test</td>
                        <td>測試專案</td>
						<td>1</td>
						<td>EDS</td>
                        <td>台中</td>
                        <td>點工</td>
                        <td>其他</td>
                        <td>2016/01/02</td>
                        <td>2016/01/31</td>
                        <td>No123456</td>
                        <td>黃之應</td>
                        <td>林慶輝</td>
                        <td>0936-034575</td>
                        <td>有問題可以打電支援</td>
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
$(function() {
	<g:render template="/layouts/client-message"/>
	initProjectRelatives();
	createDataTable();
});
</asset:script>
    </body>
</html>
