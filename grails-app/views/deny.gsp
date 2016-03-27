<g:set var="modalPage" value="${true}" scope="request"/>
<g:set var="selfStyle" value="${true}" scope="request"/>
<%
  def delaySeconds = 5
%>
<!DOCTYPE html>
<html>
    <head>
        <title>CCES - Access Deny</title>
        <meta name="layout" content="main"/>
        <meta http-equiv="refresh" content="${delaySeconds};URL='${createLink(mapping:'home',params:params)}'"/>
        <asset:stylesheet src="deny"/>
    </head>
    <body>
        <div class="error-details" role="main">
            <asset:image src="shutter_stock.png" />
            <p>The page or journal you have not permission to access,</p>
            <p>and will be redirect to welcome page in ${delaySeconds} seconds.</p>
        </div>
    </body>
</html>
