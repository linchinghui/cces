<%! import grails.converters.JSON %>
<%-- jQuery / Bootstrap / BootstrapDialog JS is required --%>
<!DOCTYPE html>
<html>
	<head></head>
	<body>
	    <g:render template="/layouts/server-message" bean="${null}"/>
		<script type='text/javascript'>
$(function() {
	var callbackFn = window["${new String(callback.decodeBase64())}"];

	if (typeof callbackFn === 'function') {
		var result = JSON.parse('${result as JSON}'.replace(/\&quot\;/g,'"'));
		var dialogKeys = Object.keys(BootstrapDialog.dialogs);
		var delay = (result.status >= 400) ? 4000 : 2500;

		if (dialogKeys.length > 0) {
			BootstrapDialog.dialogs[dialogKeys[0]].setType(
				(result.status >= 400) ? BootstrapDialog.TYPE_DANGER : BootstrapDialog.TYPE_SUCCESS);
			BootstrapDialog.dialogs[dialogKeys[0]].getModalBody().html(result.message);
		}

		setTimeout(function() {
			callbackFn.call(null, result);
		}, delay );
	}
})();
		</script>
	</body>
</html>
