//= require_self
var assignWorkerDiv = $('.assignWorker');
var assignWorkerList = $('<select/>');
var disposeDataTableDiv = $('#list-dispose');
var disposeDataTable;
var lastMonth;

/*-----------
  DataTables
 ------------*/
function postCreateDisposeTable(inList) {
	$('#list-dispose tbody').on('click', 'td.control', function() {
		var ns = this.parentElement.nextSibling;

		if (ns) {
			$(ns.children).find('ul li').filter(function() {
				return ($.inArray(this.getAttribute('data-dtr-index'), inList) > 0)
			}).addClass('bg-danger');
		}
	});
}

function createDisposeTable() {
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

	var cols = [{ //0
		data: 'id', // width: '28px', visible: false,
		className: 'control',
		orderable: false
	}, { //1
		data: 'employee'
	}];

	var day = moment();
	day.set('year', lastYear).set('month', lastMonth);
	var daysOff = [];

	for (i = 1; i <= serverParams2.lastDayOfMonth; i++) {
		var d = day.set('date', i).weekday();
		if (d == 0 || d == 6) {
			cols.push({
				data: 'd' + i,
				render: renderRadio4DataTables,
				orderable: false,
				className: 'bg-danger'
			});
			daysOff.push(i + '');
		} else {
			cols.push({
				data: 'd' + i,
				render: renderRadio4DataTables,
				orderable: false
			});
		}
		// cols.push({data: 'd'+i, render: renderRadio4DataTables, orderable: false, className: (d==0||d==6 ? 'bg-danger':'')});
	}

	disposeDataTable = disposeDataTableDiv.DataTable({
			dom: 'B<"pull-right"i>ftrp',
			processing: true,
			serverSide: true,
			deferRender: true,
			language: {
				infoFiltered: ''
			},
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
					}, getLastParameters({
						month: lastMonth,
						employeeId: assignWorkerList.val()
					}));
				},
				onDone: function() {
					if (!(assignProjectList.val() || assignConstNoList.val() || false)) {
						disposeDataTable.buttons().disable();
					}
				},
				onReloadClick: function(event) {
						return (assignProjectList.val() || assignConstNoList.val());
					}
					// ,onReloadClicked: function() {
					// }
			},
			initComplete: function(settings, data) {
				initialized4DataTables(settings, data);
				postCreateDisposeTable(daysOff);
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

	delete cols, day;
}
/*--------------------
  loading dispose
 ---------------------*/
function loadDisposes() {
	$.ajax.fake.registerWebservice(server.ctxPath + '/worker', function(req) {
		return [];
	});

	chainAjaxCall({
		fake: !(assignWorkerDiv.hasClass('has-error')), // !(assignProjectList.val() || assignConstNoList.val() || false),
		url: server.ctxPath + '/worker',
		method: 'GET',
		cache: false,
		// async: false,
		headers: {
			'X-CCES-NoAlert': true,
			'X-CCES-ACTION': 'brief'
		}

	}).done(function(promise) {
		if (promise.rc == 1) {
			assignWorkerDiv.addClass('has-error').html($(
				'<label class="control-label"/>').html('(無法取得員工資料)'));

		} else {
			createWorkerCombo($(promise.data));

			if (disposeDataTable) {
				reloadDataTables(disposeDataTable, true);

			} else {
				createDisposeTable();
			}
		}
	});
}
/*----------------------------------------
  default value by server-side parameters
 -----------------------------------------*/
function initializeDisposes() {
	var now = moment();
	lastMonth = serverParams2.month ? serverParams2.month : now.month();

	if (serverParams2.embed) {
		assignProjectList.change(function(e) {
			loadDisposes();
		});
		assignConstNoList.change(function(e) {
			loadDisposes();
		});

	} else {
		$.ajax.fake.defaults.wait = 0; // had assigned
		lastYear = serverParams2.year ? serverParams2.year : now.weekYear(); // had assigned
	}

	loadDisposes();
}
/*--------------------------------------------
  prepare ComboBox with worker select-options
 ---------------------------------------------*/
/*
function loadWorkerInfo(ele) {
	var workerInfo = $(
			'<span class="input-group-addon glyphicon glyphicon-info-sign"></span><span id="workerExists" class="sr-only"></span>'
		)
		.click(function() {
			var workerId = assignWorkerList.val();

			if (workerId) {
				BootstrapDialog.show({
					title: '專案',
					message: requestAction4BootstrapDialog({
							url: server.ctxPath + '/worker/show'
						}, workerId) // GET method
				});
			}
		});

	ele.after(workerInfo);
}
*/
function createWorkerCombo(ele) {
	if (!assignWorkerDiv.hasClass('has-error')) {
		return;
	}

	assignWorkerDiv.removeClass('has-error');
	assignWorkerList = assignWorkerDiv.html(ele).combobox();
	var combo = assignWorkerList.data('combobox');
	// loadWorkerInfo(combo.$element);

	if (serverParams2.employeeId) {
		combo.$element.val($.map(combo.map, function(val, desc) {
			return val == serverParams2.employeeId ? desc : null;
		}));
		combo.lookup().select();
	}

	assignWorkerList.change(function(e) {
		loadDisposes();
	});
}
