<%-- place this in script tag: --%>
<g:if test="${! dialogPage}">
$.ajax.fake.registerWebservice(server.ctxPath + '/api/announcements.json',
	function(req) {
		return { // empty DT data
			draw: req.draw,
			recordsTotal: 0,
			recordsFiltered: 0,
			data: []
		};
	});

chainAjaxCall({
	fake: '${controllerName}' == '' || /(create|edit|delete)/i.test('${actionName}'),
	url: server.ctxPath + '/api/announcements.json',
	method: 'GET',
	cache: false,
	async: true,
	headers: {
		'X-CCES-NoAlert': true,
		'X-CCES-ACTION': 'upToDate'
	},
	data: {
		functionId: '${controllerName}'
	}
}).done(function(promise) {
	if (promise.rc == 1 || promise.data.recordsTotal < 1) {
		return;
	}
	$.each(promise.data.data, function(idx, ele) {
		$.notify(moment(ele.announcedDate).format('YYYY/MM/DD') + ':<br>' + ele.description);
	});
});
</g:if>
<g:if test="${flash.message}">
	alertMessage({message: "${flash.message}"});
</g:if>
<g:if test="${flash.errors}">
	alertError({errors: "${flash.errors}"});
</g:if>
<g:hasErrors bean="${it}">
var errors = [
	<g:eachError bean="${it}" var="error">
    {'${error.field}':'<g:message error="${error}"/>'},
	</g:eachError>
''];
alertMessage({errors: errors});
</g:hasErrors>
