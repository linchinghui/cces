
var projectListDiv = $('.assignProject');
var projectList = $('<select/>');
var machineListDiv = $('.assignConstNo');
var machineList = $('<select/>');

/*-----------
  機台下拉清單
-------------*/
function createMachineCombo(ele, defaultVal) {
	machineList = machineListDiv.html(ele).combobox();
	var combo = machineList.data('combobox');

	if (defaultVal) { // has default or not
		combo.$element.val($.map(combo.map, function(val, desc) {
			return val == defaultVal ? desc : null;
		}));
		combo.lookup().select();
	}

	machineList.change(function(evt) {
		clearCombobox(projectList); // 清"專案"
		// var evt = $.Event('machineComboChanged');
		// evt.state = machineList.val();
		// $(window).trigger(evt);
	});
}

/*-----------
  專案下拉清單
-------------*/
function createProjectCombo(ele, defaultVal) {
	projectList = projectListDiv.html(ele).combobox();
	var combo = projectList.data('combobox');

	(function addProjectInfo(ele) {
		var projectInfo = $(
			'<span class="input-group-addon glyphicon glyphicon-info-sign"></span>' +
			'<span id="projectExists" class="sr-only"></span>'
		).click(function() {
			showProjectInfo(projectList.val());
		});

		ele.after(projectInfo);
	})(combo.$element);

	if (defaultVal) { // has default or not
		combo.$element.val($.map(combo.map, function(val, desc) {
			return val == defaultVal ? desc : null;
		}));
		combo.lookup().select();
	}

	projectList.change(function(evt) {
		clearCombobox(machineList); //清"機台"
		// var evt = $.Event('projectComboChanged');
		// evt.state = projectList.val();
		// $(window).trigger(evt);
	});
}

function showProjectInfo(projectId) {
	if (projectId) {
		BootstrapDialog.show({
			title: '專案',
			message: requestAction4BootstrapDialog({
					url: server.ctxPath + '/project/show'
				}, projectId) // GET method
		});
	// } else {
	// XXX: alert or not?
	}
}

/*---------------------
  取得 專案清單, 機台清單
-----------------------*/
function loadProjectComboBoxes(defaultParams) {
	var url = server.ctxPath + '/project';

	$.ajax.fake.registerWebservice(url, function(req) {
		return [];
	});

	chainAjaxCall({
		url: url,
		method: 'GET',
		cache: false,
		async: false,
		headers: {
			'X-CCES-NoAlert': true,
			'X-CCES-ACTION': 'brief'
		}
		// 	});
	}).chain(function(promise) {
		if (promise.rc == 1) {
			projectListDiv.addClass('has-error').html($('<label class="control-label"/>').html('(無法取得專案)'));
		} else {
			createProjectCombo($(promise.data), defaultParams.projectId);
		}

		return chainAjaxCall({
			fake: (promise.rc == 1),
			url: url,
			method: 'GET',
			cache: false,
			async: false,
			headers: {
				'X-CCES-NoAlert': true,
				'X-CCES-ACTION': 'constructNos'
			}
		});
	}).done(function(promise) {
		if (promise.rc == 1) {
			machineListDiv.addClass('has-error').html($('<label class="control-label"/>').html('(無法取得機台型號)'));
		} else {
			createMachineCombo($(promise.data), defaultParams.constructNo);
		}
	});
}
