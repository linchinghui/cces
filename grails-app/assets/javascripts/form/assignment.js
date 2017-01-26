//= require ../grid
//= require ../calendar
//= require_self

var projectListDiv = $('.assignProject');
var machineListDiv = $('.assignConstNo');
// var workerListDiv = $('.assignWorker');
var projectList = $('<select/>');
var machineList = $('<select/>');
// var workerList = $('<select/>');
var assignMonth = $('#assignMonth');
var assignListDiv = $('#list-assignment');
var assignList;
var lastYear;
var lastMonth;

/*-----------
  取得專案清單
-------------*/
function loadProjectInfo(ele) {
	var projectInfo = $(
		'<span class="input-group-addon glyphicon glyphicon-info-sign"></span>'+
		'<span id="projectExists" class="sr-only"></span>'
	).click(function() {
		var projectId = projectList.val();
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

function createProjectCombo(ele) {
	projectList = projectListDiv.html(ele).combobox();
	var combo = projectList.data('combobox');
	loadProjectInfo(combo.$element);

	if (serverParams.projectId) {
		combo.$element.val($.map(combo.map, function(val, desc) {
			return val == serverParams.projectId ? desc : null;
		}));
		combo.lookup().select();
	}

	projectList.change(function(e) {
		clearCombobox(machineList); //清"機台"
		loadAssignments();
	});
}

/*-----------
  取得機台清單
-------------*/
function createConstructNoCombo(ele) {
	machineList = machineListDiv.html(ele).combobox();
	var combo = machineList.data('combobox');
	// loadProjectInfo(combo.$element);

	if (serverParams.constructNo) {
		combo.$element.val($.map(combo.map, function(val, desc) {
			return val == serverParams.constructNo ? desc : null;
		}));
		combo.lookup().select();
	}

	machineList.change(function(e) {
		clearCombobox(projectList); // 清"專案"
		loadAssignments();
	});
}

/*-----------
  取得員工清單
-------------*/
// function createWorkerCombo(ele) {
// 	if (!workerListDiv.hasClass('has-error')) {
// 		return;
// 	}
//
// 	workerListDiv.removeClass('has-error');
// 	workerList = workerListDiv.html(ele).combobox();
// 	var combo = workerList.data('combobox');
// 	// loadWorkerInfo(combo.$element);
//
// 	if (serverParams.employeeId) {
// 		combo.$element.val($.map(combo.map, function(val, desc) {
// 			return val == serverParams.employeeId ? desc : null;
// 		}));
// 		combo.lookup().select();
// 	}
//
// 	workerList.change(function(e) {
// 		loadAssignments();
// 	});
// }

/*-----------
  取得派工資料
-------------*/
function getLastParameters(params) {
	var monthYear = assignMonth.val().split('/');
	var qryParams = {
		projectId: projectList.val(),
		constructNo: machineList.val(),
		// employeeId: workerList.val(),
		year: monthYear[0],
		month: monthYear[1] -1,
		format: 'json'
	}
	if (params) {
		$.extend(qryParams, params);
	}
	return qryParams;
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

	var cols = [ //0
		renderAlterationCellWithId4DataTables({
			show: {
				url: server.ctxPath + '/assignment/show'
			},
			edit: {
				url: server.ctxPath + '/assignment/edit'
				// callback: modifyDataRequested
			},
			delete: {
				url: server.ctxPath + '/assignment/delete'
				// callback: removeDataRequested
			}
		}), { //1
			render: function(data, type, row, meta) {
				var idxSpace = data.indexOf(' ');
				return '<span class="hidden-xs">' + data.substring(0,idxSpace) + '</span>' + data.substring(idxSpace);
			},
			data: 'employee'
		}];

	// columns of Days
	var day = moment(assignMonth.val(), 'YYYY/MM');
	var daysOff = [];

	for (i = 1; i <= serverParams.assignMonthDays; i++) {
		var opt = {
			data: 'd' + i,
			render: renderRadio4DataTables,
			orderable: false
		};
		var d = day.set('date', i).weekday();
		if (d == 0 || d == 6) {
			daysOff.push(i + '');
			opt['className'] = 'bg-danger';
		}
		cols.push(opt);
	}

	assignList = assignListDiv.DataTable({
			// dom: 'B<"pull-right"i>ftrp',
			processing: true,
			serverSide: true,
			deferRender: true,
			language: {
				infoFiltered: ''
			},
			ajax: {
				url: server.ctxPath + '/api/assignments',
				data: function(params, settings) {
					settings.ajax.fake = !(projectList.val() || machineList.val() || false);
					return getLastParameters($.fn.dataTable.defaults.ajax.data(params, settings));
				},
				onDone: function() {
					if (!(projectList.val() || machineList.val() || false)) {
						assignList.buttons().disable();
					}
				},
				onReloadClick: function(event) {
						return (projectList.val() || machineList.val());
					}
				// ,onReloadClicked: function() {
				// }
			},
			initComplete: function(settings, data) {
				initialized4DataTables(settings, data);
			},
			responsive: {
				details: {
					renderer: function (api, rowIdx, columns) {
						var data = $.map( columns, function (col) {
							if (! col.hidden) return '';

							var colTitle = $('<span>').attr({'class':'dtr-title'}).append(col.title);
							var colData = $('<span>').attr({'class':'dtr-data'}).append(col.data);
							var colEle = $('<li/>').attr({
								'data-dtr-index': col.columnIndex,
								'data-dt-row': col.rowIndex,
								'data-dt-column': col.columnIndex
							}).append(colTitle).append(colData);

							if ($.inArray(colTitle.text().replace(/(?:\n|\t| )/g, ''), daysOff) >0) {
								colEle.addClass('bg-danger');
							}

							return colEle[0].outerHTML;
						} ).join('');

						return data ? $('<ul data-dtr-index="'+rowIdx+'"/>').append( data ) : false;
					}
				}
			},
			extButtons: {},
			buttons: [],
			columns: cols,
			order: [
					[1, 'asc']
				] // prev: 'aaSorting'
		})
		.buttons()
		.disable();

	delete cols, day, daysOff;
}

function loadAssignments() {
	// $.ajax.fake.registerWebservice(server.ctxPath + '/worker', function(req) {
	// 	return [];
	// });
	//
	// chainAjaxCall({
	// 	fake: !(workerListDiv.hasClass('has-error')), // !(projectList.val() || machineList.val() || false),
	// 	url: server.ctxPath + '/worker',
	// 	method: 'GET',
	// 	cache: false,
	// 	// async: false,
	// 	headers: {
	// 		'X-CCES-NoAlert': true,
	// 		'X-CCES-ACTION': 'brief'
	// 	}
	//
	// }).done(function(promise) {
	// 	if (promise.rc == 1) {
	// 		workerListDiv.addClass('has-error').html($(
	// 			'<label class="control-label"/>').html('(無法取得員工資料)'));
	//
	// 	} else {
	//		createWorkerCombo($(promise.data));

			if (assignList) {
				reloadDataTables(assignList, true);
			} else {
				createDataTable();
			}
	// 	}
	// });
}

/*----
  起始
------*/
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
			projectListDiv.addClass('has-error').html($('<label class="control-label"/>').html('(無法取得專案)'));

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
			machineListDiv.addClass('has-error').html($('<label class="control-label"/>').html('(無法取得機台編號)'));

		} else {
			createConstructNoCombo($(promise.data));
		}
	});
}

function initializeAssignments() {
	$.ajax.fake.defaults.wait = 0; // had assigned
	loadAssignments();

	assignMonth.siblings().on('dp.change', function (e) {
		loadAssignments();
	});
}
