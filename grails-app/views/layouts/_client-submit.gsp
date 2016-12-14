<%-- place this in script tag: --%><g:if test="${params?.cb}">
${formVar}.submit(function (evt) {
	evt.preventDefault();

	$.ajax({
		url: $(this).attr('action'),
		type: $(this).attr('method'), <%-- $(this).find('input[name="_method"]').val(), --%>
		data: new FormData($(this)[0]), <%-- data: $(this).serializeArray(), --%>
		headers: { callback: true },
		processData: false,
		contentType: false,
		success: transformServerResult(function (response) {
			var callbackFn = window["${new String(params?.cb?.decodeBase64())}"];
			if (typeof callbackFn === 'function') {
				callbackFn.call(null, response, ${formVar});
			}
		}),
		error: transformServerError()
	});
});
</g:if><%-- focusing first editable field --%>
setTimeout(function() {
	editForm.find('input[type=text],textarea').filter(':not([name=""]):enabled:visible:first').focus();
}, 400);
