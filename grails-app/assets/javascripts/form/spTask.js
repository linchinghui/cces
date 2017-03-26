//= require ../grid
//= require dynamicEnumCache
//= require projectComboBoxes
//= require_self

var serverParams = {};
var workedDate = $('#workedDate');
var spTaskDataList;

function getLastParameters(params) {
	var qryParams = {
		embed: true,
		projectId: projectList.val(),
		constructNo: machineList.val(),
		format: 'json'
	};
	if (workedDate.val()) {
		qryParams['workedDate'] = workedDate.val(); //.replace(/\//g,'-')
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
	if (result && result.status <=400) {
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
	return function() {
		return server.ctxPath + '/spTask/' + actionType + ('?' + $.param(getLastParameters()));
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
					settings.ajax.fake = !(projectList.val() || machineList.val() || false);
					return getLastParameters($.fn.dataTable.defaults.ajax.data(params, settings));
				},
				onDone: function() {
					if (!(projectList.val() || machineList.val() || false)) {
						spTaskDataList.buttons().disable();
					}
				},
				onReloadClick: function(event) {
					return (projectList.val() || machineList.val());
				}
				// ,onReloadClicked: function() {
				// }
			},
			language: {
				info: '<span class="small pull-right text-danger">新增相同人員時，視為修改</span>'
			},
			// infoCallback: function(settings, start, end, max, total, pre) {
			// 	return '<span class="small pull-right text-danger">新增相同人員時，視為修改</span>';
			// },
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
			],
			order: []
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
		reloadDataTables(spTaskDataList);
		fireCriterionChange(projectList);
	});

	machineList.on('change', function(evt) {
		reloadDataTables(spTaskDataList);
		fireCriterionChange(machineList);
	});

	workedDate.on('update', function() {
		reloadDataTables(spTaskDataList);
		fireCriterionChange(workedDate);
	});
}

function spTask(params) {
	$.extend(serverParams, params);

	loadDynamicEnums();
	loadProjectComboBoxes(serverParams);
	// projectList = window.projectList;
	// machineList = window.machineList;

	initializeEvents();
	createSpTaskTable();
	handleTabs(getLastParameters, 'dispatchedDate');
}
