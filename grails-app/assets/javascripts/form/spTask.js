//= require ../grid
//= require dynamicEnumCache
//= require projectComboBoxes
//= require_self

var spTaskDataList;
var serverParams = {};
var theWorkedDate = $('#theWorkedDate');

function getLastParameters(params) {
	var qryParams = {
		embed: true,
		projectId: projectList.val(),
		constructNo: machineList.val(),
		format: 'json'
	};
	if (theWorkedDate.val()) {
		qryParams['workedDate'] = theWorkedDate.val(); //.replace(/\//g,'-')
	}
	if (params) {
		$.extend(qryParams, params);
	}
	return qryParams;
}

/*---------------
  DataTables
 ----------------*/
function removeDataRequested(result) {
	alertMessage(result);
	if (result && result.status <= 400) {
		reloadDataTables(spTaskDataList);
	}
}

function modifyDataRequested(result, editForm) {
	reloadDataTables(spTaskDataList);
}

function addDataRequested(result, editForm) {
	reloadDataTables(spTaskDataList);
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
	return function(cell) {
		var rowData = spTaskDataList.row(cell).data();
		var worker = (/null(\||)/.test(rowData.id)) ? {
			employeeId: rowData.employee.replace(/\((.*)\).*/,'$1')
		} : null;
		return server.ctxPath + '/spTask/' + actionType + ('?' + $.param(getLastParameters(worker)));
	}
}

function createSpTaskTable() {
	$.ajax.fake.defaults.wait = 0; // had assigned
	$.ajax.fake.registerWebservice(server.ctxPath + '/api/spTasks.json', function(req) {
		// empty DT data
		return {
			draw: req.draw,
			recordsTotal: 0,
			recordsFiltered: 0,
			data: []
		};
	});

	spTaskDataList = $('#list-spTask').DataTable({
			processing: true,
			serverSide: true,
			deferRender: true,
			ajax: {
				url: server.ctxPath + '/api/spTasks.json',
				data: function(params, settings) {
					// settings.ajax.fake = !(projectList.val() || machineList.val() || false);
					return getLastParameters($.fn.dataTable.defaults.ajax.data(params, settings));
				// },
				// onDone: function() {
				// 	// if (!(projectList.val() || machineList.val() || false)) {
				// 	// 	spTaskDataList.buttons().disable();
				// 	// }
				// 	if (! (theWorkedDate.val() && (projectList.val() || machineList.val()))) {
				// 		$('.dataTables_wrapper .btn-group:nth-child(2)').find('a.btn').prop('disabled', true).addClass('disabled');
				// 	}
				// },
				// onReloadClick: function(event) {
				// 	return (projectList.val() || machineList.val());
				// }
				// ,onReloadClicked: function() {
				}
			},
			infoCallback: function(settings, start, end, max, total, pre) {
				return '<span class="small pull-right text-right"><span class="text-danger">同時' +
					'</span>輸入日期與專案(或機台)條件時<span class="hidden-xs">，</span>' +
					'<br class="visible-xs">會<span class="text-danger">多</span>列示人員配置、派工資訊</span>' +
					'<br><span class="small pull-right text-right text-danger">新增相同人員時，視為修改</span>';
			},
			initComplete: function(settings, data) {
				initialized4DataTables(settings, data);
			},
			extButtons: {
				copy: true
			},
			buttons: [{
				text: '新增',
				action: addDataRequest
			}],
			columns: [
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
				}), {
					data: 'project'
				}, {
					render: function (data, type, row, meta) {
						return ((type == 'display' || type == 'filter') && theWorkedDate.val()) ?
							theWorkedDate.val().replace(/Z$/,'') :
							renderDate4DataTables.call().call(null, data, type, row, meta);
					},
					data: 'workedDate'
				}, {
					orderable: false,
					data: 'constructPlace'
				}, {
					orderable: false,
					data: 'equipment'
				}, {
					data: 'employee'
				/*}, {
					render: function(data, type, row, meta) {
						return (data && (type === 'display' || type === 'filter')) ?
							(projectTypes.hasOwnProperty(data) ? projectTypes[data] : data + '(代碼未定義)') :
							data;
					},
					orderable: false,
					data: 'projectKind' // 'projectType'*/
				}, {
					render: function(data, type, row, meta) {
						return (data && (type === 'display' || type === 'filter')) ?
							(constructTypes.hasOwnProperty(data) ? constructTypes[data] : data + '(代碼未定義)') :
							data;
					},
					orderable: false,
					data: 'constructCode' // 'constructType'
				}, {
					render: function(data, type, row, meta) {
						return ((type === 'display' || type === 'filter') && /null(\||)/.test(row.id)) ?
							'<span class="text-danger text-bold">已派工,未登錄</span>' :
							data;
					},
					orderable: false,
					data: 'note'
				// }, {
				// 	render: function(data, type, row, meta) {
				// 		if (type === 'display' || type === 'filter') {
				// 			var keys = row.id.split('|');
				// 			if (keys[1] == 'null') {
				// 				keys[1] = theWorkedDate.val().replace(/Z$/,'');
				// 				// data = keys.join('|');
				// 				row['altId'] = keys.join('|');
				// 			}
				// 		}
				// 		return data;
				// 	},
				// 	visible: false,
				// 	data: 'altId'
				}
			],
			order: [
				[1, 'asc']
			]
		})
		.buttons()
		.disable();
}

function initializeEvents() {
	function fireCriterionChange(delegate) {
		var evt = $.Event('criterionChanged');
		evt.state = getLastParameters();
		delegate.trigger(evt);
	}
	projectList.on('change', function(evt) {
		fireCriterionChange(projectList);
		reloadDataTables(spTaskDataList);
	});
	machineList.on('change', function(evt) {
		fireCriterionChange(machineList);
		reloadDataTables(spTaskDataList);
	});
	theWorkedDate.on('update', function() {
		fireCriterionChange(theWorkedDate);
		reloadDataTables(spTaskDataList);
	});
}

function spTask(params) {
	$.extend(serverParams, params);

	loadDynamicEnums();
	loadProjectComboBoxes(serverParams);
	initializeEvents();
	createSpTaskTable();
	handleTabs(getLastParameters, 'dispatchedDate');
}
