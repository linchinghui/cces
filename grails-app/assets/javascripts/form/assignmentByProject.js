//* require assignCommon
//= require ../grid
//= require dynamicEnumCache
//= require ../calendar
//= require projectComboBoxes
//= require_self

var serverParams = {};
var assignMonth = $('#assignMonth');
var workerList = $('#assignWorker');

var assignCLNDRDiv = $('.assignCLNDR');
var assignCLNDR;

var workersCache = {};
var assignXHR;
var assignListDiv = $('#list-assignment');
var assignList;

var editFormDiv = $('.assignContainer');
var editForm = $('#assignmentForm');
var assignDate = $('#assignDate');

var reloadBtn;
var cancelBtn;

function getLastParameters(params) {
	var ym = assignMonth.val().split('/');
	var qryParams = {
		// format: 'json',
		year: ym[0],
		month: ym[1],
		projectId: projectList.val(),
		constructNo: machineList.val()
	};
	if (params) {
		$.extend(qryParams, params);
	}
	return qryParams;
}

/*--------
  月曆操作
----------*/
function createAssignCalendar(template) {
	assignCLNDR = assignCLNDRDiv.clndr({
		// classes: 'day',
		// dateParameter: 'date',
		showAdjacentMonths: false,
		startWithMonth: assignMonth.val().split('/').join('-'),
		template: template,
		doneRendering: function() {
			reloadBtn = $('input[type="button"][value="重查"]');
			reloadBtn.on('click', function() {
				loadAssignments();
			});
			cancelBtn = $('input[type="button"][value="取消"]');
			cancelBtn.on('click', function() {
				(assignXHR && assignXHR.readyState != 4) && assignXHR.abort();
				cancelBtn.prop('disabled', true);
				reloadBtn.prop('disabled', false);
			});
			$('a.last-month').click(function(evt) {
				evt.preventDefault();
				assignCLNDR.back();
				assignMonth.siblings().data('DateTimePicker').date(assignCLNDR.month);
			});
			$('a.next-month').click(function(evt) {
				evt.preventDefault();
				assignCLNDR.forward();
				assignMonth.siblings().data('DateTimePicker').date(assignCLNDR.month);
			});
		},
		clickEvents: {
			click: function(target) {
				if (!$(target.element).hasClass('empty') && (projectList.val() || machineList.val())) {
					assignDate.val(target.element.className.match(/calendar-day-(\d+-\d+-\d+)/)[1]);
					assignCLNDRDiv.fadeOut(1250); // .animate({ width: 'toggle'}
					editFormDiv.animate({
						left: '0%'
					}, 1000);
				}
			}
		}
	});
}

/*--------
  月曆樣版
----------*/
function loadAssignCalendar() {
	$.ajax.fake.registerWebservice(serverParams.calendarTemplate, function(req) {
		return [];
	});

	chainAjaxCall({
		// fake: (promise.rc == 1),
		url: serverParams.calendarTemplate,
		method: 'GET',
		// cache: false,
		async: false
	}).done(function(promise) {
		if (promise.rc == 1) {
			assignCLNDRDiv.addClass('has-error').html($('<label class="control-label"/>').html('(未取得月曆)'));
		} else {
			createAssignCalendar(promise.data);
		}
	});
}

/*-----------
  處理派工資料
-------------*/
function deleteAssignment(ele) {
	if (!e) {
		var e = window.event;
	}
	e.cancelBubble = true;
	if (e.stopPropagation) {
		e.stopPropagation();
	}
	var delDate = $(ele).parent().parent().attr('class').match(/calendar-day-(\d+-\d+-\d+)/)[1];

	new BootstrapDialog({
		size: BootstrapDialog.SIZE_SMALL,
		type: BootstrapDialog.TYPE_WARNING,
		title: '刪除...',
		message: delDate + ' ' + $(ele).siblings().text() + '<br><br>是否確定 ?',
		closable: true,
		buttons: [{
			label: '否',
			cssClass: 'pull-left',
			action: function(dialog) {
				dialog.close();
			}
		}, {
			label: '是',
			action: function(dialog) {
				var params = getLastParameters({
					employeeId: $(ele).siblings().attr('id'),
				});
				var data = {
					'_method': 'PUT',
					id: params.projectId + '|' + params.employeeId + '|' + params.year + '|' + params.month
				}
				data['d' + (delDate.match(/\d+-\d+-(\d+)/)[1] * 1)] = false;

				// NOTE: NO DELETE, just update
				$.ajax({
					type: 'POST',
					url: server.ctxPath + '/assignment/update',
					contentType: 'application/x-www-form-urlencoded',
					data: data,
					headers: {
						callback: true
					},
					success: transformServerResult(function(response) {
						loadAssignments();
					}),
					error: transformServerError()
				});

				dialog.close();
			}
		}]
	}).open();

	return false;
}

function loadAssignment4Cell(empId, callback) {
	$('.assignLoad').show();
	var url = server.ctxPath + '/api/workers/' + empId + '.json';

	if (!$.ajax.fake.webServices.hasOwnProperty(url)) {
		$.ajax.fake.registerWebservice(url, function(req) {
			return workersCache[empId];
		});
	}

	chainAjaxCall({
		fake: workersCache.hasOwnProperty(empId),
		url: url,
		method: 'GET',
		cache: true,
		async: false

	}).done(function(promise) {
		if (!workersCache.hasOwnProperty(promise.data.id)) {
			workersCache[promise.data.id] = promise.data;
		}
		// if (callback && workersCache.hasOwnProperty(promise.data.id)) {
			callback.call( null, '<span class="hidden-xs">(' + promise.data.id + ') </span>' + promise.data.empName );
		// }
		$('.assignLoad').hide();
	});
}

function showWorkerInfo(empId) {
	if (empId) {
		BootstrapDialog.show({
			title: '員工',
			message: requestAction4BootstrapDialog({
					url: server.ctxPath + '/worker/show'
				}, empId) // GET method
		});
	// } else {
	// XXX: alert or not?
	}
}

function proxyWorkerInfo(ele) {
	if (!e) {
		var e = window.event;
	}
	e.cancelBubble = true;

	if (e.stopPropagation) {
		e.stopPropagation();
	}
	showWorkerInfo(ele.id);

	return false;
}

function renderAssignment4Cell(ele, empId) {
	loadAssignment4Cell(empId, function(empInfo) {
		ele.html( ele.html()
			+ '<div><i class="fa fa-fw fa-times" onclick="deleteAssignment(this)"></i>'
			+ '<a id="' + empId + '" onclick="proxyWorkerInfo(this)">' //+'<span>'
			+ empInfo //+'</span>'
			+ '</a>' + '</div>'
		);
	});
}

function loadAssignments(rerender) {
	$('.assignLoad').show();
	reloadBtn.prop('disabled', true);

	if (typeof(rerender) === 'undefined') {
		rerender = true;
	}
	if (rerender) {
		assignCLNDR.render();
	}
	$.ajax.fake.registerWebservice(server.ctxPath + '/api/assignments.json', function(req) {
		return [];
	});

	assignXHR = $.ajax({
		fake: !(assignMonth.val() && (projectList.val() || machineList.val())),
		type: 'GET',
		url: server.ctxPath + '/api/assignments.json',
		data: getLastParameters(),
		success: transformServerResult(function(result) {
			setTimeout(function() {
				var ym = assignMonth.val().split('/');
				var clzPrefix = '.calendar-day-' + ym[0] + '-' + pad(ym[1], 2) + '-';
				var lastDay = moment([ym[0], ym[1] - 1]).add(1, 'months').date(0).date();

				$.each(result, function(idx, rec) {
					var empId = rec['id'].split('|')[1]; // employeeId
					for (day = 1; day <= lastDay; day++) {
						if (rec['d' + day]) {
							renderAssignment4Cell($(clzPrefix + pad(day, 2)), empId);
						}
					}
				});
			}, 0);
		}),
		error: transformServerError(),
		complete: function(result) {
			$('.assignLoad').hide();
			cancelBtn.prop('disabled', true);
			reloadBtn.prop('disabled', false);
		}
	});

	cancelBtn.prop('disabled', false);
}

/*----
  起始
------*/
function initializeEvents() {
	// 派工
	editForm.submit(function(evt) {
		evt.preventDefault();
		var employeeId = workerList.val();

		if (!employeeId) {
			alertWarning({
				'warning': '員工欄位必須輸入'
			});
			return false;
		}
		var isNew = !assignCLNDRDiv.find('.days a[id="' + employeeId + '"]').length;
		var params = getLastParameters({
			employeeId: employeeId
		});
		var data = $.extend({}, (isNew ? params : {
			'_method': 'PUT',
			id: params.projectId + '|' + params.employeeId + '|' + params.year + '|' + params.month
			// , constructNo: params.constructNo
		}));
		data['d' + (assignDate.val().match(/\d+-\d+-(\d+)/)[1] * 1)] = true;

		$.ajax({
			type: 'POST',
			url: server.ctxPath + '/assignment/' + (isNew ? 'save' : 'update'),
			contentType: 'application/x-www-form-urlencoded',
			data: data,
			headers: {
				callback: true
			},
			success: transformServerResult(function(response) {
				loadAssignments();
			}),
			error: transformServerError()
		});
	});

	// animation
	editFormDiv.find('.buttons').children().prop("disabled", false).click(function(evt) {
		editFormDiv.animate({
			left: '105%'
		}, 500);
		assignCLNDRDiv.fadeIn(750);
	});
	// $(document).keydown(function(evt) {
	// 	if (assignCLNDR) {
	// 		if (evt.keyCode == 37 || evt.keyCode == 38) { // Left or Up
	// 			assignCLNDR.back();
	// 			assignMonth.siblings().data('DateTimePicker').date(assignCLNDR.month);
	// 		}
	// 		if (evt.keyCode == 39 || evt.keyCode == 40) { // Right or Down
	// 			assignCLNDR.forward();
	// 			assignMonth.siblings().data('DateTimePicker').date(assignCLNDR.month);
	// 		}
	// 	}
	// });
	$(document).on('keyup', function(evt) {
		if (evt.keyCode == 27) { // evt.which
			editFormDiv.animate({
				left: '105%'
			}, 500);
			assignCLNDRDiv.fadeIn(750);
		}
	});

	function fireCriterionChange(delegate) {
		var evt = $.Event('criterionChanged');
		evt.state = getLastParameters();
		// log($._data(delegate[0], "events" ));
		delegate.trigger(evt);
	}

	assignMonth.on('update', function(evt, val) { // 月分變更
		var ym = val.split('/');

		if (ym.length > 1) {
			assignCLNDR.month.year(ym[0]).month(ym[1] - 1);
			assignCLNDR.intervalStart = assignCLNDR.month.clone().startOf('month');
			assignCLNDR.intervalEnd = assignCLNDR.intervalStart.clone().endOf('month');

			fireCriterionChange(assignMonth);
			loadAssignments();
		}
	});

	projectList.change(function(evt) { // 專案變更
		fireCriterionChange(projectList);
		loadAssignments();
	});
	machineList.change(function(evt) { // 機台型號變更
		fireCriterionChange(machineList);
		loadAssignments();
	});
}

function assignments(params) {
	$.extend(serverParams, params);
	$.ajax.fake.defaults.wait = 0; // had assigned
	$.each($.ajax.fake.webServices, function(ws) {
		if (ws.startsWith(server.ctxPath + '/api/projects/')) {
			delete $.ajax.fake.webServices[ws];
		}
	});

	loadDynamicEnums();
	loadProjectComboBoxes(serverParams);
	loadAssignCalendar();
	initializeEvents();
	loadAssignments(false);
	handleTabs(getLastParameters);
}
