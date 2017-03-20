<%! import grails.converters.JSON %><%-- jQuery / Bootstrap / BootstrapDialog JS is required --%>
<!DOCTYPE html>
<html>
  <head></head>
  <body>
    <g:render template="/layouts/server-message" bean="${null}"/>
    <script type='text/javascript'>
window.onload = (function(){
	var callbackFnName = "${callback ? new String(callback.decodeBase64()) : ''}";
	var callbackFn = (callbackFnName) ? window[callbackFnName] : null;
	if (callbackFn) {
		callbackFn.call(null, JSON.parse('${(result as JSON).encodeAsJavaScript()}'));
	}
})();
    </script>
  </body>
</html>
