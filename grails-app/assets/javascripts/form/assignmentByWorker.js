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

var projectsCache = {};
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
		employeeId: workerList.val()
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

function loadAssignment4Cell(projId, callback) {
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

function proxyProjectInfo(ele) {
	if (!e) {
		var e = window.event;
	}
	e.cancelBubble = true;

	if (e.stopPropagation) {
		e.stopPropagation();
	}
	showProjectInfo(ele.id);

	return false;
}

function renderAssignment4Cell(ele, projId) {
	loadAssignment4Cell(projId, function(projInfo) {
		ele.html( ele.html()
			+ '<div><i class="fa fa-fw fa-times" onclick="deleteAssignment(this)"></i>'
			+ '<a id="' + projId + '" onclick="proxyProjectInfo(this)">' //+'<span>'
			+ projInfo //+'</span>'
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
					var projId = rec['id'].split('|')[0]; // projectId
					for (day = 1; day <= lastDay; day++) {
						if (rec['d' + day]) {
							renderAssignment4Cell($(clzPrefix + pad(day, 2)), projId);
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
	function evaluateProjectId(constructNo) {
		var projects = $.map(projectsCache, function(proj) {
			if (proj.constructNo == constructNo) {
				return proj;
			}
		});
		return projects.length ? projects[0].id : null;
	}

	// 派工
	editForm.submit(function(evt) {
		evt.preventDefault();
		var projectId = projectList.val();
		var constructNo = machineList.val();

		if (!(projectId || constructNo)) {
			alertWarning({
				'warning': '專案或機台擇一輸入'
			});
			return false;
		}
		var isNew = !assignCLNDRDiv.find('.days a[id="' + (projectId ? projectId : evaluateProjectId(constructNo)) + '"]').length;
		var params = getLastParameters({
			projectId: projectId,
			constructNo: constructNo
		});
		var data = $.extend({}, (isNew ? params : {
			'_method': 'PUT',
			id: params.projectId + '|' + params.employeeId + '|' + params.year + '|' + params.month
			, constructNo: params.constructNo
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

	workerList.change(function(evt) { // 員工變更
		fireCriterionChange(workerList);
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
