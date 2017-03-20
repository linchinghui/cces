//= require assignCommon
//= require ../calendar
//= require_self

var serverParams = {};
var assignMonth = $('#assignMonth');
// var workerListDiv = $('.assignWorker');
var workerList = $('#assignWorker');

var assignCLNDRDiv = $('.assignCLNDR');
var assignCLNDR;

var projectsCache = {};
var assignXHR;
var assignListDiv = $('#list-assignment');
var assignList;

var editFormDiv = $('.assignContainer');
var editForm = $('#assignmentForm');
var assignDate = $('#assignDate');
var projectListDiv = $('.assignProject');
var projectList = $('<select/>');
var machineListDiv = $('.assignConstNo');
var machineList = $('<select/>');
var reloadBtn;
var cancelBtn;

function getLastParameters(params) {
	var ym = assignMonth.val().split('/');
	var qryParams = {
		// format: 'json',
		year: ym[0],
		month: ym[1],
		employeeId: workerList.val()
	};
	if (params) {
		$.extend(qryParams, params);
	}
	return qryParams;
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

	machineList.change(function(evt) {
		clearCombobox(projectList); // 清"專案"
		// loadAssignments();
	});
}
/*-----------
  取得專案清單
-------------*/
function showProjectInfo(ele) {
	if (!e) {
		var e = window.event;
	}
	e.cancelBubble = true;

	if (e.stopPropagation) {
		e.stopPropagation();
	}
	BootstrapDialog.show({
		title: '專案',
		message: requestAction4BootstrapDialog({
				url: server.ctxPath + '/project/show'
			}, ele.id) // GET method
	});

	return false;
}

function loadProjectInfo(ele) {
	var projectInfo = $(
		'<span class="input-group-addon glyphicon glyphicon-info-sign"></span>' +
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

	projectList.change(function(evt) {
		clearCombobox(machineList); //清"機台"
		// loadAssignments();
	});
}
/*-----------
  取得員工清單
-------------*/
/*
function createWorkerCombo(ele) {
	if (!workerListDiv.hasClass('has-error')) {
		return;
	}

	workerListDiv.removeClass('has-error');
	workerList = workerListDiv.html(ele).combobox();
	var combo = workerList.data('combobox');
	// loadWorkerInfo(combo.$element);

	if (serverParams.employeeId) {
		combo.$element.val($.map(combo.map, function(val, desc) {
			return val == serverParams.employeeId ? desc : null;
		}));
		combo.lookup().select();
	}

	workerList.change(function(evt) {
		// loadAssignments();
	});
}
*/
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
				if (!$(target.element).hasClass('empty') && workerList.val()) {
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
/*-------------------------------
  專案下拉清單, 機台下拉清單, 月曆格式
---------------------------------*/
function loadCalendarFields() {
	// $.ajax.fake.registerWebservice(server.ctxPath + '/worker', function(req) {
	// 	return [];
	// });
	//
	// chainAjaxCall({
	// 	fake: (promise.rc == 1),
	//	fake: Object.keys(workerList.data('combobox').map).length == 0,
	//	fake: !(workerListDiv.hasClass('has-error')),
	//	fake: !(workerList.val() || false),
	// 	url: server.ctxPath + '/worker',
	// 	method: 'GET',
	// 	cache: false,
	// 	// async: false,
	// 	headers: {
	// 		'X-CCES-NoAlert': true,
	// 		'X-CCES-ACTION': 'briefx'
	// 	}
	// }).chain(function(promise) {
	// 	if (promise.rc == 1) {
	// 		workerListDiv.addClass('has-error').html($('<label class="control-label"/>').html('(無法取得員工資料)'));
	// 	} else {
	// 		createWorkerCombo($(promise.data));
	// 	}
	// 	return
	chainAjaxCall({
		url: server.ctxPath + '/project',
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
			createProjectCombo($(promise.data));
		}

		$.ajax.fake.registerWebservice(server.ctxPath + '/project', function(req) {
			return [];
		});

		return chainAjaxCall({
			fake: (promise.rc == 1),
			url: server.ctxPath + '/project',
			method: 'GET',
			cache: false,
			async: false,
			headers: {
				'X-CCES-NoAlert': true,
				'X-CCES-ACTION': 'constructNos'
			}
		});
	}).chain(function(promise) {
		if (promise.rc == 1) {
			machineListDiv.addClass('has-error').html($('<label class="control-label"/>').html('(無法取得機台編號)'));
		} else {
			createConstructNoCombo($(promise.data));
			// initFormSubmission();
		}

		$.ajax.fake.registerWebservice(serverParams.calendarTemplate, function(req) {
			return [];
		});

		return chainAjaxCall({
			fake: (promise.rc == 1),
			url: serverParams.calendarTemplate,
			method: 'GET',
			// cache: false,
			async: false
		});
	}).done(function(promise) {
		if (promise.rc == 1) {
			assignCLNDRDiv.addClass('has-error').html($('<label class="control-label"/>').html('(未取得月曆)'));
		} else {
			createAssignCalendar(promise.data);
			// initializeEvents();
			// loadAssignments(false);
			// handleTabs(getLastParameters);
		}
	});
}
/*-----------
  取得派工資料
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
					projectId: $(ele).siblings().attr('id'),
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

function loadAssignment(projId, callback) {
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
		if (!projectsCache.hasOwnProperty(promise.data.id)) {
			projectsCache[promise.data.id] = promise.data;
		}
		// if (callback && projectsCache.hasOwnProperty(promise.data.id)) {
			callback.call( null,
				(promise.data.constructModel ? promise.data.constructModel : 'n/a') + ' '
					+ hideHalf(constructTypes[promise.data.constructCode])
					+ hideHalf(projectTypes[promise.data.projectKind])
			);
		// }
		$('.assignLoad').hide();
	});
}

function renderAssignment(ele, projId) {
	loadAssignment(projId, function(projInfo) {
		ele.html( ele.html()
			+ '<div><i class="fa fa-fw fa-times" onclick="deleteAssignment(this)"></i>'
			+ '<a id="' + projId + '" onclick="showProjectInfo(this)">' //+'<span>'
			+ projInfo //+'</span>'
			+ '</a>' + '</div>'
		);
	});
}

// function renderAssignment(ele, proj) {
// 	$('.assignLoad').show();
// 	var url = server.ctxPath + '/api/projects/' + proj + '.json';
//
// 	if (!$.ajax.fake.webServices.hasOwnProperty(url)) {
// 		$.ajax.fake.registerWebservice(url, function(req) {
// 			return projectsCache[proj];
// 		});
// 	}
//
// 	chainAjaxCall({
// 		fake: projectsCache.hasOwnProperty(proj),
// 		url: url,
// 		method: 'GET',
// 		cache: true,
// 		async: false
//
// 	}).done(function(promise) {
// 		$('.assignLoad').hide();
// 		var rec = promise.data;
// 		var projText = '(' + proj + ')';
//
// 		if (promise.rc == 0) {
// 			projText = (rec.constructModel ? rec.constructModel :
// 				'n/a') + ' ' + hideHalf(constructTypes[rec.constructCode]) + hideHalf(projectTypes[rec.projectKind]);
// 			if (!projectsCache.hasOwnProperty(rec.id)) {
// 				projectsCache[rec.id] = rec;
// 			}
// 		}
// 		ele.html(ele.html() + '<div><i class="fa fa-fw fa-times" onclick="deleteAssignment(this)"></i>' + '<a id="' + proj + '" onclick="showProjectInfo(this)">' //+'<span>'
// 			+ projText //+'</span>'
// 			+ '</a>' + '</div>');
// 	});
// }

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
		fake: !(assignMonth.val() && workerList.val()),
		type: 'GET',
		url: server.ctxPath + '/api/assignments.json',
		data: getLastParameters(),
		success: transformServerResult(function(result) {
			setTimeout(function() {
				var ym = assignMonth.val().split('/');
				var clzPrefix = '.calendar-day-' + ym[0] + '-' + pad(ym[1], 2) + '-';
				var lastDay = moment([ym[0], ym[1] - 1]).add(1, 'months').date(0).date();

				$.each(result, function(idx, rec) {
					var projId = rec['id'].split('|')[0];
					for (day = 1; day <= lastDay; day++) {
						if (rec['d' + day]) {
							renderAssignment($(clzPrefix + pad(day, 2)), projId);
							// // var ele = $(clzPrefix + pad(day, 2));
							// loadAssignment(
							// 	projId,
							// 	function(projInfo, ele) {
							// 		ele.html( ele.html()
							// 			+ '<div><i class="fa fa-fw fa-times" onclick="deleteAssignment(this)"></i>'
							// 			+ '<a id="' + projId + '" onclick="showProjectInfo(this)">' //+'<span>'
							// 			+ projInfo //+'</span>'
							// 			+ '</a>' + '</div>'
							// 		);
							// 	},
							// 	$(clzPrefix + pad(day, 2))
							// );
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
		var projectId = projectList.val();
		var machine = machineList.val();

		if (!(projectId || machine)) {
			alertWarning({
				'warning': '專案或機台擇一輸入'
			});
			return false;
		}
		var isNew = !assignCLNDRDiv.find('.days a[id="' + projectId + '"]').length;
		var params = getLastParameters({
			projectId: projectId,
			constructNo: machine
		});
		var data = $.extend({}, (isNew ? params : {
			'_method': 'PUT',
			id: params.projectId + '|' + params.employeeId + '|' + params.year + '|' + params.month,
			constructNo: params.constructNo
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

			loadAssignments();
			fireCriterionChange(assignMonth);
		}
	});

	workerList.change(function(evt) { // 員工變更
		loadAssignments();
		fireCriterionChange(workerList);
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
	loadCalendarFields();
	initializeEvents();
	loadAssignments(false);
	handleTabs(getLastParameters);
}
