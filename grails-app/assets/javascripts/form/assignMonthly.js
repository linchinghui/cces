//= require ../plugins/dataTables.rowsGroup
//= require_self

var serverParams3 = {};
var monthlyDataList;
var daysOff = [];

function setupDaysOff() {
	if (serverParams3.year && serverParams3.month) { // && serverParams3.employeeId) {
		daysOff.length = 0;
		var day = moment([serverParams3.year, serverParams3.month, '01'].join('-'));
		serverParams3.days = day.add(1, 'months').date(0).date();

		for (i = 1; i <= serverParams3.days; i++) {
			var d = day.set('date', i).weekday();
			if (d == 0 || d == 6) {
				daysOff.push(i + '');
			}
		}
	}
}

function getMonthlyParameters(params) {
	setupDaysOff();

	var qryParams = {
		by: 'monthly',
		year: serverParams3.year,
		month: serverParams3.month,
		employeeId: serverParams3.employeeId
	};
	if (params) {
		$.extend(qryParams, params);
	}
	return qryParams;
}

function disableGoMonthButtons(flag) {
	if (typeof(flag) === 'undefined') {
		flag = true;
	}
	var btns = $('#list-monthly_wrapper .btn-group:last').find('a.btn').prop('disabled', flag);
	if (flag) {
		btns.addClass('disabled').find('span').addClass('text-muted');
	} else {
		btns.removeClass('disabled').find('span').removeClass('text-muted');
	}
}

function dealWithButtons() {
	if (!assignMonth.val()) {
		monthlyDataList.buttons().disable(); // include goMonth buttons
	} else {
		disableGoMonthButtons(false);
	}
}

function goMonth(step) {
	return function(evt, _api, node, conf) {
		if (assignMonth.val()) {
			var dp = assignMonth.siblings().data('DateTimePicker');
			dp.date(dp.date().add(step, 'months'));
		}
		dealWithButtons();
	}
}

function renderDayCellExpand(api, rowIdx, columns) {
	var data = $.map(columns, function(col) {
		if (!col.hidden) return '';

		var colTitle = $('<span>').attr({
			'class': 'dtr-title'
		}).append(col.title);

		// var colData = $('<span>').attr({
		// 	'class': 'dtr-data'
		// }).append( renderDayCellText(col.data) );
		var colData = renderDayCellText(col.data);

		var colEle = $('<li/>').attr({
			'data-dtr-index': col.columnIndex,
			'data-dt-row': col.rowIndex,
			'data-dt-column': col.columnIndex
		}).append(colTitle).append(colData);

		if ($.inArray(colTitle.text().replace(/(?:\n|\t| )/g, ''), daysOff) > 0) {
			colEle.addClass('bg-danger');
		}

		return colEle[0].outerHTML;
	}).join('');

	return data ? $('<ul data-dtr-index="' + rowIdx + '"/>').append(data) : false;
}

function renderDayCellText(projId) {
	var rtn = '&nbsp;';
	if (projId) {
		if (projId !== rtn) {
			var rec = projectsCache[projId];
			rtn = '<span class="dtr-data" title="' + projId + '">' + /*hideHalf(*/constructTypes[rec.constructCode]/*)*/
				+ '<span>' + /*hideHalf(*/projectTypes[rec.projectKind]/*)*/ + '</span>' + '</span>';
		}
	}
	return rtn;
}

function loadDayCell(ele, projId) {
	$('.assignLoad').show();
	var url = server.ctxPath + '/api/projects/' + projId + '.json';

	if (!$.ajax.fake.webServices.hasOwnProperty(url)) {
		$.ajax.fake.registerWebservice(url, function(req) {
			return projectsCache[projId];
		});
	}

	chainAjaxCall({
		fake: projectsCache.hasOwnProperty(projId),
		url: url,
		method: 'GET',
		cache: true,
		async: false

	}).done(function(promise) {
		if (!projectsCache.hasOwnProperty(projId)) {
			projectsCache[projId] = promise.data;
		}
		ele.html(renderDayCellText(projId));
		$('.assignLoad').hide();
	});

	return projId;
}

function createMonthlyTable() {
	var cols = [{
		data: null,
		orderable: false,
		// width: '10px',
		render: 'position'
	}, {
		data: 'employee',
		// width: '50px',
		render: function renderEmployee(data, type, row, meta) {
			if (data && (type == 'display' || type == 'filter')) {
				var idxSpace = data.indexOf(' ');
				data = '<span class="hidden-xs">' + data.substring(0, idxSpace) + '</span>' + data.substring(idxSpace);
			}
			return data;
		}
	}, {
		data: 'off',
		orderable: false,
		render: function (data, type, row, meta) {
			if (type == 'display') {
				data = 0;
				for (i = 1; i <= serverParams3.days; i++) {
					if (! row['d'+i]) { data += 1; }
				}
			}
			return data;
		}
	}];

	for (i = 1; i <= 31; i++) {
		cols.push({
			data: 'd' + i,
			orderable: false,
			// width: '20px',
			render: function renderDayCell(data, type, row, meta) {
				return (data && (type == 'display')) /*|| type == 'filter'))*/ ?
					loadDayCell($(monthlyDataList.cell(meta.row, meta.col).node()), row.id.split('|')[0]) : '&nbsp;';
			}
		});
	}

	$.ajax.fake.registerWebservice(server.ctxPath + '/api/assignments.json',
		function(req) {
			return { // empty DT data
				draw: req.draw,
				recordsTotal: 0,
				recordsFiltered: 0,
				data: []
			};
		});

	monthlyDataList = $('#list-monthly').DataTable({
			// TEST:
			// autowidth: false,
			// fixedColumns: true,
			// scrollX: true,

			processing: true,
			serverSide: true,
			deferRender: true,
			language: {
				infoFiltered: ''
			},
			ajax: {
				url: server.ctxPath + '/api/assignments.json',
				data: function(params, settings) {
					disableGoMonthButtons();

					settings.ajax.fake = !assignMonth.val();
					return getMonthlyParameters($.fn.dataTable.defaults.ajax.data(params, settings));
				},
				onDone: function(settings) {
					monthlyDataList.columns().header().to$().removeClass('bg-danger hide');
					var offsetIdx = 2;
					// --- highlight columns ---
					var idxsOff = $.map(daysOff, function(d) { return d * 1 + offsetIdx; });
					var cols = monthlyDataList.columns(idxsOff);
					cols.header().to$().addClass('bg-danger');
					cols.nodes().flatten().to$().addClass('bg-danger');
					// --- hide columns ---
					var idxsHide = [];
					for (var d = serverParams3.days + 1; d <= 31; d++) { idxsHide.push(d + offsetIdx); }
					if (idxsHide) {
						cols = monthlyDataList.columns(idxsHide);
						cols.header().to$().addClass('hide');
						cols.nodes().flatten().to$().addClass('hide');
					}

					dealWithButtons();
				}
			},
			language: {
				info: '<span class="small pull-right text-danger text-right">滑鼠停置在欄位內，會顯示專案代碼</span>'
			},
			initComplete: function(settings, data) {
				$('#list-monthly_wrapper .btn-group:last').addClass('pull-right').css('margin-right',0)
					.find('a:not([class*="pull-right"])').attr('title', '上月')
					.find('a[class*="pull-right"]').attr('title', '下月');

				initialized4DataTables(settings, data);
			},
			responsive: {
				details: {
					renderer: renderDayCellExpand
				}
			},
			extButtons: {
				copy: true
			},
			buttons: [{
				text: '<i class="fa fa-arrow-left"></i>',
				action: goMonth(-1)
			}, {
				text: '<i class="fa fa-arrow-right"></i>',
				action: goMonth(1),
				className: 'pull-right'
			}],
			columns: cols,
			order: [
				[1, 'asc']
			]
			,rowsGroup: ['1, 2']
		})
		.buttons()
		.disable();

	delete cols;
}

function prepareMonthlyParameters(ym, emp) {
	var yearMonth = ym.split('/');

	if (yearMonth.length > 1) {
		serverParams3.employeeId = emp;
		serverParams3.year = yearMonth[0];
		serverParams3.month = yearMonth[1];
	}
}

function initializeMonthlyEvents() {
	if (serverParams3.embed) {
		$(window).on('criterionChanged', function(evt) {
			$.extend(serverParams3, evt.state);
			reloadDataTables(monthlyDataList);
		});
	} else { // standalone page:
		assignMonth.on('update', function(evt, val) { // 月分變更
			if (val.length > 0) {
				prepareMonthlyParameters(val, workerList.val());
				reloadDataTables(monthlyDataList);
			}
		});

		workerList.change(function(evt) { // 員工變更
			prepareMonthlyParameters(assignMonth.val(), workerList.val());
			reloadDataTables(monthlyDataList);
		});
	}
}

function assignMonthly(params) {
	$.extend(serverParams3, params);

	assignMonth = $('#assignMonth');
	workerList = $('#assignWorker');
	projectsCache = window.projectsCache || {};

	if (!serverParams3.embed) {
		loadDynamicEnums();
	}
	prepareMonthlyParameters(assignMonth.val(), workerList.val());
	initializeMonthlyEvents();
	createMonthlyTable();
}
