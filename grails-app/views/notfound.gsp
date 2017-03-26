<g:if test="${request['isAjax']}"><% // ajax not-fonud:
    response.setContentType(
        (request.getHeader('User-Agent').indexOf('IE ') >= 0) ?
        'text/javascript' :
        'application/json'
    );%>
</g:if>
<g:else>
	<g:set scope="request" var="delaySeconds" value="${10}"/>
	<g:set scope="request" var="dialogPage" value="${true}"/>
    <g:set scope="request" var="selfStyle" value="${true}"/>
    <g:set scope="request" var="embedPage" value="${params?.embed=='true' || params['cb']}"/>
<!DOCTYPE html>
<html>
    <head>
        <meta name="layout" content="main"/>
        <title>CCES - Page Not Found</title>
        <asset:stylesheet src="notfound"/>
    </head>
    <body>
        <div class="error-details" role="main"><%--
            <asset:image src="kidmondo_face_sad.gif"/>--%>
			<g:img class="user-image" dir="static/images" file="kidmondo_face_sad.gif"/>
            <h1>We're sorry...</h1>
            <p>The page or journal you are looking for cannot be found.</p>
            <p> <g:if test="${! embedPage}">
                <a href="javascript:goBack();">Back</a>  (it will go back in ${delaySeconds} sec.)
                </g:if>
            </p>
        </div>
    </body>
    <g:if test="${! embedPage}">
<asset:script type='text/javascript'>
function goBack() {
	history.back();
}
window.onload = (function(){
    setTimeout(function(){
        goBack();
    }, ${delaySeconds * 1000});
})();
</asset:script>
    </g:if>
</html>
</g:else>
