<g:if test="${request['isAjax']}"><% // ajax not-fonud:
    response.setContentType(
        (request.getHeader('User-Agent').indexOf('IE ') >= 0) ? 
        'text/javascript' :
        'application/json'
    );
%></g:if>
<g:else>
    <g:set var="embedPage" value="${params?.embed=='true'}" scope="request"/>
    <g:set var="modalPage" value="${true}" scope="request"/>
    <g:set var="selfStyle" value="${true}" scope="request"/>
    <%
      def delaySeconds = 10
    %>
<!DOCTYPE html>
<html>
    <head>
        <title>CCES - Page Not Found</title>
        <meta name="layout" content="main"/>
        <asset:stylesheet src="notfound"/>
        <g:if test="${! embedPage}">
            <asset:javascript src="jquery-2.1.4.js"/>
        </g:if>
    </head>
    <body>
        <div class="error-details" role="main">
            <asset:image src="kidmondo_face_sad.gif"/>
            <h1>We're sorry...</h1>
            <p>The page or journal you are looking for cannot be found.</p>
            <p> <g:if test="${! embedPage}">
                <a href="javascript:goBack();">Back</a>  (it will go back in ${delaySeconds} sec.)
                </g:if>
            </p>
        </div>
    </body> <%-- deferred JS here --%>
    <g:if test="${! embedPage}">
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
