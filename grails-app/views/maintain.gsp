<g:set var="modalPage" value="${true}" scope="request"/>
<g:set var="selfStyle" value="${true}" scope="request"/>
<%
  def delaySeconds = 10
%>
<!DOCTYPE html>
<html>
    <head>
        <meta name="layout" content="main"/>
        <title>CCES - Site Under Maintenance</title>
        <asset:stylesheet src="maintain"/>
    </head>
    <body>
        <table>
            <tr>
                <td>
                    <div class="container" role="main">
                        <h1>We're sorry.</h1>
                        <div class="sorry">
                            <p>Service is temporarily unavailable.<br>Our engineers are working quickly<br>to resolve the issue.</p>
                            <p><a href="javascript:history.back();">Back</a></p>
                        </div>
                    </div>
                </td>
            </tr>
        </table>
    </body>
</html>
