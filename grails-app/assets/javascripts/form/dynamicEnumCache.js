
var projectTypes = {};
var constructTypes = {};

function loadDynamicEnums() {
	var url = server.ctxPath + '/api/dynamicEnums.json';

	chainAjaxCall({
		url: url,
		method: 'GET',
		cache: true,
		async: false,
		headers: { 'X-CCES-ACTION': 'projectTypes' }

	}).chain(function(promise) {
		if (promise.rc == 1) {
			projectTypes = { 'na': '(無法取得[工作型態]代碼)' }
		} else {
			projectTypes = promise.data;
		}
		return chainAjaxCall({
			url: url,
			method: 'GET',
			cache: true,
			async: false,
			headers: { 'X-CCES-ACTION': 'constructTypes' }
		});

	}).done(function(promise) {
		if (promise.rc == 1) {
			constructTypes = { 'na': '(無法取得[施作方式]代碼)' }
		} else {
			constructTypes = promise.data;
		}
	});
}
