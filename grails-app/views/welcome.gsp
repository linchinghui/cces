<g:set var="deferredScript" value="welcome" scope="request"/>
<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main"/>
    <title>Welcome to CCES</title>
    <asset:stylesheet src="welcome"/>
</head>
<body>
    <div class="content-wrapper" role="main"> <%--
        <section class="content-header">
          <g:render template="/layouts/server-message" bean="xxx"/>
        </section> --%>
        <section class="content">
            <div class="row">
            <div class="col-xs-12">
                <ul class="nav nav-tabs">
                  <li class="active"><a href="#" data-target="#" data-toggle="tab"><big>${functionService.get('announcement')}</big></a></li>
                </ul>
                <div class="box">
                <div class="box-header"></div> <%--
                <div class="box-header panel panel-default">
                  <h3 class="box-title">${pageTitle}</h3>
                </div> --%>
                <div class="box-body">
                    <table id="list-announcement" class="table table-bordered table-hover">
                    <thead>
                        <tr>
                        <th></th>
                        <th>日期</th>
                        <th>內容</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td></td>
                        <td></td>
                        <td></td>
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
  createDataTable();
});
</asset:script>
    </body>
</html>
