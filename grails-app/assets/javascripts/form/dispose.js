//= require ../grid
//= require disposeOnly
//= require_self

var assignConstNoDiv = $('.assignConstNo');
var assignProjectDiv = $('.assignProject');
var assignConstNoList = $('<select/>');
var assignProjectList = $('<select/>');

var lastYear;

function getLastParameters(params) {
	var qryParams = {
		constructNo: assignConstNoList.val(),
		projectId: assignProjectList.val(),
		employeeId: assignWorkerList.val(),
		month: lastMonth,
		year: lastYear,
		format: 'json'
	};

	if (params) {
		$.extend(qryParams, params);
	}

	return qryParams;
}

/*----------------------------------
  loading assignments and sumup
 -----------------------------------*/
function loadProjectInfo(ele) {
	var projectInfo = $(
			'<span class="input-group-addon glyphicon glyphicon-info-sign"></span><span id="projectExists" class="sr-only"></span>'
		)
		.click(function() {
			var projectId = assignProjectList.val();

			if (projectId) {
				BootstrapDialog.show({
					title: '專案',
					message: requestAction4BootstrapDialog({
							url: server.ctxPath + '/project/show'
						}, projectId) // GET method
				});
			}
		});

	ele.after(projectInfo);
}

/*----------------------------------------------------------
  prepare ComboBox with project/construct-no select-options
 -----------------------------------------------------------*/
function createProjectCombo(ele) {
	assignProjectList = assignProjectDiv.html(ele).combobox();
	var combo = assignProjectList.data('combobox');
	loadProjectInfo(combo.$element);

	if (serverParams.projectId) {
		combo.$element.val($.map(combo.map, function(val, desc) {
			return val == serverParams.projectId ? desc : null;
		}));
		combo.lookup().select();
	}

	assignProjectList.change(function(e) {
		clearCombobox(assignConstNoList);
		loadDisposes();
	});
}

function createConstructNoCombo(ele) {
	assignConstNoList = assignConstNoDiv.html(ele).combobox();
	var combo = assignConstNoList.data('combobox');
	// loadProjectInfo(combo.$element);

	if (serverParams.constructNo) {
		combo.$element.val($.map(combo.map, function(val, desc) {
			return val == serverParams.constructNo ? desc : null;
		}));
		combo.lookup().select();
	}

	assignConstNoList.change(function(e) {
		clearCombobox(assignProjectList);
		loadDisposes();
	});
}

function initializeSelectFields() {
	chainAjaxCall({
		url: server.ctxPath + '/project',
		method: 'GET',
		cache: false,
		async: false,
		headers: {
			'X-CCES-NoAlert': true,
			'X-CCES-ACTION': 'brief'
		}

	}).chain(function(promise) {
		if (promise.rc == 1) {
			assignProjectDiv.addClass('has-error').html($(
				'<label class="control-label"/>').html('(無法取得專案)'));

		} else {
			createProjectCombo($(promise.data));
		}

		return chainAjaxCall({
			url: server.ctxPath + '/project',
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
			assignConstNoDiv.addClass('has-error').html($('<label class="control-label"/>').html('(無法取得機台編號)'));

		} else {
			createConstructNoCombo($(promise.data));
		}
	});
}
