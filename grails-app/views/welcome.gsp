<g:set var="deferredScript" value="welcome" scope="request"/>
<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main"/>
    <title>Welcome to CCES</title>
    <asset:stylesheet src="welcome"/>
</head>
<body>
    <div class="content-wrapper" role="main">
        <section class="content">
            <div class="row">
            <div class="col-xs-12">
                <table id="list-announcement" class="table table-bordered table-hover">
                <thead>
                    <tr>
                    <th></th>
                    <th>日期</th>
                    <th>公告</th>
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
        </section>
    </div>
<asset:script type='text/javascript'><%-- deferred JS here --%>
$(function() {
    createDataTable();
});
</asset:script>
    </body>
</html>
