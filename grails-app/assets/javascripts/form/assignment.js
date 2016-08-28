//= require ../grid
//= require ../calendar
//= require_self

var assignConstNoDiv = $('.assignConstNo');
var assignProjectDiv = $('.assignProject');
var assignConstNoList = $('<select/>');
var assignProjectList = $('<select/>');

var assignCLNDRDiv = $('.assignWeek');
var assignCLNDR;
var assignCLNDRTemplate;
var assignDataTableDiv = $('#list-assignment');
var assignDataTable;
var lastYear;
var lastWeek;
var lastDate;
var lastDateAssigned;
var lastDateClass;
var highLightClass = 'bg-info text-danger';

function getLastParameters(params) {
	var qryParams = {
		constructNo: assignConstNoList.val(),
		projectId: assignProjectList.val(),
		year: lastYear,
		format: 'json'
	}

	if (params) { // for 每月人員配置
		$.extend(qryParams, params);

	} else { // for 每週人員派工
		qryParams['week'] = lastWeek;

		if (lastDateAssigned) { // && lastDate >= moment().transform('YYYY-MM-DD 00:00:00.000')) {
			qryParams['d' + lastDate.day()] = true;
		}
	}

	return qryParams;
}

/*---------------
  DataTables
 ----------------*/
function renderDisplayHint4DataTables(settings, start, end, max, total, pre) {
	var dtHeadInfo = $(settings.aanFeatures.i);
	var isHiddenFilter = dtHeadInfo.hasClass('text-hide');
	var msg = (!isHiddenFilter) && lastDate ?
		'過濾條件: <span class="text-danger">週' + assignCLNDR.daysOfTheWeek[lastDate.day()] + '</span>' :
		'可點選<span class="text-danger">日期</span>過濾資料';

	if (isHiddenFilter) { // not really hide info-text, show it
		dtHeadInfo.removeClass('text-hide');
	}
	return '<div class="head">' + msg + '</div><div class="foot small text-danger">新增相同人員時，視為修改</div>';
}

function removeDataRequested(result) {
	lastDateClass = null;
	loadAssignments();
}

function modifyDataRequested(result, editForm) {
	loadAssignments();
}

function addDataRequested(result, editForm) {
	loadAssignments();
}

function addDataRequest(evt, dt, node, config) {
	BootstrapDialog.show({
		title: '新增...',
		message: requestAction4BootstrapDialog({
			url: server.ctxPath + '/assignment/create',
			callback: addDataRequested
		}, null, getLastParameters())
	});
}

function createDataTable() {
	$.ajax.fake.registerWebservice(server.ctxPath + '/api/assignments',
		function(req) {
			// empty DT data
			return {
				draw: req.draw,
				recordsTotal: 0,
				recordsFiltered: 0,
				data: []
			};
		});

	assignDataTable = assignDataTableDiv.DataTable({
			dom: 'B<"pull-right"i>ftrp',
			processing: true,
			serverSide: true,
			deferRender: true,
			ajax: {
				url: server.ctxPath + '/api/assignments',
				data: function(params, settings) {
					settings.ajax.fake = !(assignProjectList.val() || assignConstNoList.val() || false);

					return $.extend({
						draw: params.draw,
						max: params.length,
						offset: params.start,
						sort: (params.order ? settings.aoColumns[params.order[0].column]
							.data : 'id'),
						order: (params.order ? params.order[0].dir : 'asc')
					}, getLastParameters());
				},
				onDone: function() {
					if (!(assignProjectList.val() || assignConstNoList.val() || false)) {
						assignDataTable.buttons().disable();
					}
				},
				onReloadClick: function(event) {
						return (assignProjectList.val() || assignConstNoList.val());
					}
					// ,onReloadClicked: function() {
					// }
			},
			infoCallback: renderDisplayHint4DataTables,
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
				renderDefaultAlterationCellWithId4DataTables({
					edit: {
						url: server.ctxPath + '/assignment/edit',
						callback: modifyDataRequested
					},
					delete: {
						url: server.ctxPath + '/assignment/delete',
						callback: removeDataRequested
					}
				}), { //1
					data: 'employee'
						// },{ //2
						//   data: 'project'
				}, { //3
					render: renderCheck4DataTables,
					orderable: false,
					data: 'd0'
				}, { //4
					render: renderCheck4DataTables,
					orderable: false,
					data: 'd1'
				}, { //5
					render: renderCheck4DataTables,
					orderable: false,
					data: 'd2'
				}, { //6
					render: renderCheck4DataTables,
					orderable: false,
					data: 'd3'
				}, { //7
					render: renderCheck4DataTables,
					orderable: false,
					data: 'd4'
				}, { //8
					render: renderCheck4DataTables,
					orderable: false,
					data: 'd5'
				}, { //9
					render: renderCheck4DataTables,
					orderable: false,
					data: 'd6'
				}
			],
			order: [
					[1, 'asc']
				] // prev: 'aaSorting'
		})
		.buttons()
		.disable();
}
/*---------------
  CLNDR
 ----------------*/
function highLightFocusDate() {
	var dtHeadInfo = $('#list-assignment_info');
	dtHeadInfo.addClass('text-hide'); //no filter-text, orig:.removeClass(highLightClass);

	if (lastDateClass) {
		$(lastDateClass).removeClass('selected');

	} else {
		lastDateAssigned = false;
	}

	// determine focus or not
	if (lastDate) {
		var currDateClass = '.calendar-day-' + lastDate.format('YYYY-MM-DD');

		if (currDateClass == lastDateClass && lastDateAssigned) {
			lastDateAssigned = false;
			lastDate = null;

		} else {
			lastDateClass = currDateClass;
			$(lastDateClass).addClass('selected');
			dtHeadInfo.removeClass('text-hide'); // show filter-text
			lastDateAssigned = true;
		}
	}
}

function buildAssignCalendar(assignData) {
	$(document).keydown(function(e) {
		if (assignCLNDR && e.keyCode == 37) assignCLNDR.back(); // Left arrow
		if (assignCLNDR && e.keyCode == 39) assignCLNDR.forward(); // Right arrow
	});

	assignCLNDR = assignCLNDRDiv.clndr({
		targets: {
			nextButton: 'week-next',
			todayButton: 'week-current',
			previousButton: 'week-previous'
		},
		lengthOfTime: {
			days: 7,
			interval: 7
		},
		events: assignData,
		template: assignCLNDRTemplate,

		clickEvents: {
			click: function(target) {
				lastDate = target.date;
				lastYear = lastDate.weekYear();
				lastWeek = lastDate.week();
				loadAssignments();
			},
			onIntervalChange: function(sunday, saturday) {
				lastDateAssigned = false;
				lastDate = null;
				lastYear = sunday.weekYear();
				lastWeek = sunday.week();
				loadAssignments();
			}
		}
	});
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

function loadAssignments() {
	$.ajax.fake.registerWebservice(server.ctxPath + '/api/assignments', function(req) {
		// events data
		return [];
	});

	chainAjaxCall({
		fake: !(assignProjectList.val() || assignConstNoList.val() || false),
		url: server.ctxPath + '/api/assignments',
		method: 'GET',
		cache: false,
		// async: false,
		headers: {
			'X-CCES-ACTION': 'sumup'
		},
		data: getLastParameters()

	}).done(function(promise) {
		if (assignCLNDRDiv.hasClass('has-error') || promise.rc == 1) { // got errors
			return;
		}

		if (assignCLNDR) {
			assignCLNDR.setEvents(promise.data);

		} else {
			buildAssignCalendar(promise.data);
		}

		highLightFocusDate();

		if (assignDataTable) {
			reloadDataTables(assignDataTable, true);

		} else {
			createDataTable();
		}
	});
}
/*----------------------------------------
  default value by server-side parameters
 -----------------------------------------*/
function initializeAssignments() {
	$.ajax.fake.defaults.wait = 0;
	var now = moment();
	lastYear = serverParams.year ? serverParams.year : now.weekYear();
	lastWeek = serverParams.week ? serverParams.week : now.week();
	loadAssignments();
}
/*----------------------------------------------------------------------------------
  prepare CLNDR from template and ComboBox with project/construct-no select-options
 -----------------------------------------------------------------------------------*/
function createProjectCombo(ele) { //, dataLoadCallback) {
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
		loadAssignments();
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
		loadAssignments();
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

		return chainAjaxCall({ // chainPassCall();
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
			postInitializeCLNDR();
		}
	});
}

function postInitializeCLNDR() {
	chainAjaxCall({
		url: serverParams.calendarTemplate,
		method: 'GET',
		// cache: false,
		async: false

	}).done(function(promise) {
		if (promise.rc == 1) {
			assignCLNDRDiv.addClass('has-error').html($(
				'<label class="control-label"/>').html('(無法取得[' + serverParams.pageTitle + ']週曆程式)'));

		} else {
			assignCLNDRTemplate = promise.data;
			// last process
			handleTabs(getLastParameters);
		}
	});
}
