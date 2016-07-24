<g:if test="${request['isAjax']}"><% // ajax not-fonud:
    response.setContentType(
        (request.getHeader('User-Agent').indexOf('IE ') >= 0) ?
        'text/javascript' :
        'application/json'
    );
%></g:if>
<g:else>
    <g:set var="embed" value="${params?.embed=='true' || params['cb']}" scope="request"/>
    <g:set var="dialogPage" value="${true}" scope="request"/>
    <g:set var="selfStyle" value="${true}" scope="request"/>
    <%
      def delaySeconds = 10
    %>
<!DOCTYPE html>
<html>
    <head>
        <meta name="layout" content="main"/>
        <title>CCES - Page Not Found</title>
        <asset:stylesheet src="notfound"/>
        <g:if test="${! embed}">
            <asset:javascript src="jquery-2.2.4.js"/>
        </g:if>
    </head>
    <body>
        <div class="error-details" role="main">
            <asset:image src="kidmondo_face_sad.gif"/>
            <h1>We're sorry...</h1>
            <p>The page or journal you are looking for cannot be found.</p>
            <p> <g:if test="${! embed}">
                <a href="javascript:goBack();">Back</a>  (it will go back in ${delaySeconds} sec.)
                </g:if>
            </p>
        </div>
    </body>
    <g:if test="${! embed}">
<asset:script type='text/javascript'>
function goBack() {
    history.back();
}
$(function(){
    setTimeout(function(){
        goBack();
    }, ${delaySeconds*1000});
});
</asset:script>
    </g:if>
</html>
</g:else>
