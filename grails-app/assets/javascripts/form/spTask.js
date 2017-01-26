//= require ../grid
//= require_self

var assignConstNoDiv = $('.assignConstNo');
var assignProjectDiv = $('.assignProject');
var assignConstNoList = $('<select/>');
var assignProjectList = $('<select/>');

var workedDate = $('#workedDate');
var workedDatePicker = $('.workedDate');
var spTaskDataTable;
var projectTypes;
var constructTypes;
var projectInfo;

function getLastParameters(params) {
	var qryParams = {
		embed: true,
		constructNo: assignConstNoList.val(),
		projectId: assignProjectList.val(),
		format: 'json'
	}
	qryParams[(params ? params : 'workedDate')] = workedDate.val(); //.replace(/\//g,'-')
	return qryParams;
}

function getQueryString() {
	return ('?' + $.param(getLastParameters()));
}

function triggerCriterionChange(target) {
	var evt = $.Event('criterionChanged');
	evt.state = getLastParameters();
	target.trigger(evt);
}

/*---------------
  DataTables
 ----------------*/
function removeDataRequested(result) {
	loadSpTasks();
}

function modifyDataRequested(result, editForm) {
	loadSpTasks();
}

function addDataRequested(result, editForm) {
	loadSpTasks();
}

function addDataRequest(evt, dt, node, config) {
	BootstrapDialog.show({
		title: '新增...',
		message: requestAction4BootstrapDialog({
			url: server.ctxPath + '/spTask/create',
			callback: addDataRequested
		}, null, getLastParameters())
	});
}

function prepareUrl(actionType) {
	return function() {
		return server.ctxPath + '/spTask/' + actionType + getQueryString();
	}
}

// function renderDisplayHint4DataTables(settings, start, end, max, total, pre) {
// 	return '<span class="small pull-right text-danger">新增相同人員時，視為修改</span>';
// }

function createDataTable() {
	$.ajax.fake.registerWebservice(server.ctxPath + '/api/spTasks.json', function(req) {
		// empty DT data
		return {
			draw: req.draw,
			recordsTotal: 0,
			recordsFiltered: 0,
			data: []
		};
	});

	spTaskDataTable = $('#list-spTask').DataTable({
			processing: true,
			serverSide: true,
			deferRender: true,
			ajax: {
				url: server.ctxPath + '/api/spTasks.json',
				data: function(params, settings) {
					settings.ajax.fake = !(assignProjectList.val() || assignConstNoList.val() || false);
					// return $.extend({}, $.fn.dataTable.defaults.ajax.data(params, settings), getLastParameters());
					return getLastParameters($.fn.dataTable.defaults.ajax.data(params, settings));
				},
				onDone: function() {
					if (!(assignProjectList.val() || assignConstNoList.val() || false)) {
						spTaskDataTable.buttons().disable();
					}
				},
				onReloadClick: function(event) {
						return (assignProjectList.val() || assignConstNoList.val()); // && true);
					}
					// ,onReloadClicked: function() {
					// }
			},
			language: {
				info: '<span class="small pull-right text-danger">新增相同人員時，視為修改</span>'
			},
			// infoCallback: renderDisplayHint4DataTables,
			initComplete: function(settings, data) {
				initialized4DataTables(settings, data);
			},
			extButtons: {
				// copy: true
			},
			buttons: [{
				text: '新增',
				action: addDataRequest
			}],
			columns: [ //0
				renderAlterationCellWithId4DataTables({
					show: {
						url: prepareUrl('show')
					},
					edit: {
						url: prepareUrl('edit'),
						callback: modifyDataRequested
					},
					delete: {
						url: prepareUrl('delete'),
						callback: removeDataRequested
					}
				}), { //1
					orderable: false,
					data: 'constructPlace'
				}, { //2
					orderable: false,
					data: 'equipment'
				}, { //3
					orderable: false,
					data: 'employee'
				}, { //4
					render: function(data, type, row, meta) {
						return (data && (type === 'display' || type === 'filter')) ?
							(projectTypes.hasOwnProperty(data) ? projectTypes[data] : data + '(代碼未定義)') :
							data;
					},
					orderable: false,
					data: 'projectKind' // 'projectType'
				}, { //5
					render: function(data, type, row, meta) {
						return (data && (type === 'display' || type === 'filter')) ?
							(constructTypes.hasOwnProperty(data) ? constructTypes[data] : data + '(代碼未定義)') :
							data;
					},
					orderable: false,
					data: 'constructCode' // 'constructType'
				}, { //6
					render: function(data, type, row, meta) {
						return ((type === 'display' || type === 'filter') && /null(\||)/.test(row.id)) ?
							'<span class="text-danger text-bold">已派工,未登錄</span>' :
							data;
					},
					orderable: false,
					data: 'note'
				}
			]
		})
		.buttons()
		.disable();
}

/*-----------
  load data
 -----------*/
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

function loadSpTasks() {
	if (spTaskDataTable) {
		reloadDataTables(spTaskDataTable, true);

	} else {
		createDataTable();
	}
}

function initializeSpTasks() {
	$.ajax.fake.defaults.wait = 0;
	loadSpTasks();
}
/*--------------------------------------------------------------------
  prepare worked-date picker, project select-options, construct-types
 ---------------------------------------------------------------------*/
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
		loadSpTasks();
		triggerCriterionChange(assignProjectList);
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
		loadSpTasks();
		triggerCriterionChange(assignConstNoList);
	});
}

function createDatePicker() {
	workedDatePicker.data('DateTimePicker').date(
		serverParams.workedDate ? moment(serverParams.workedDate) : moment().transform('YYYY-MM-DD 00:00:00.000')
	);

	workedDatePicker.datetimepicker().on('dp.change', function(e) {
		loadSpTasks();
		triggerCriterionChange(workedDatePicker);
	});
}

function initializeSelectFields() {
	createDatePicker()

	chainAjaxCall({
		url: server.ctxPath + '/api/projects.json',
		method: 'GET',
		cache: true,
		async: false,
		headers: {
			'X-CCES-NoAlert': true,
			'X-CCES-ACTION': 'projectTypes'
		}

	}).chain(function(promise) {
		if (promise.rc == 1) {
			projectTypes = {
				'na': '(無法取得[工作型態]代碼)'
			}

		} else {
			projectTypes = promise.data;
		}

		return chainAjaxCall({
			url: server.ctxPath + '/api/projects.json',
			method: 'GET',
			cache: true,
			async: false,
			headers: {
				'X-CCES-NoAlert': true,
				'X-CCES-ACTION': 'constructTypes'
			}
		});

	}).chain(function(promise) {
		if (promise.rc == 1) {
			constructTypes = {
				'na': '(無法取得[施作方式]代碼)'
			}

		} else {
			constructTypes = promise.data;
		}

		return chainAjaxCall({
			url: server.ctxPath + '/project',
			method: 'GET',
			cache: false,
			async: false,
			headers: {
				'X-CCES-NoAlert': true,
				'X-CCES-ACTION': 'brief'
			}
		});

	}).chain(function(promise) {
		if (promise.rc == 1) {
			assignProjectDiv.addClass('has-error').html($('<label class="control-label"/>').html('(無法取得專案)'));

		} else {
			createProjectCombo($(promise.data))
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
			handleTabs(getLastParameters, 'dispatchedDate');
		}
	});
}
