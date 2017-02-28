//= require ../grid
//= require projectRelatives
//= require_self

var projectList;

function renderDisplayHint4DataTables(settings, start, end, max, total, pre) {
	var str = $.map(projectTypes, function(typeDesc, projType) {
		return '<span>' + projType + '=' + typeDesc + '</span>';
	}).join(',&nbsp;&nbsp;');
	var str2 = $.map(constructTypes, function(typeDesc, constType) {
		return '<span>' + constType + '=' + typeDesc + '</span>';
	}).join(',&nbsp;&nbsp;');

	return '<span class="small pull-right text-danger">[工作型態]編碼:&nbsp;' + str + '</span>' +
		'<br><span class="small pull-right text-danger">[施作方式]編碼:&nbsp;' + str2 + '</span>';
}

function removeDataRequested(result) {
	alertMessage(result);
	if (result && result.status <=400) {
		reloadDataTables(projectList);
	}
}

function modifyDataRequested(result, editForm) {
	reloadDataTables(projectList);
}

function addDataRequested(result, editForm) {
	reloadDataTables(projectList);
}

function addDataRequest(evt, dt, node, config) {
	BootstrapDialog.show({
		title: '新增...',
		message: requestAction4BootstrapDialog({
			url: server.ctxPath + '/project/create',
			callback: addDataRequested
		})
	});
}

function createDataTable() {
	projectList = $('#list-project').DataTable({
			dom: 'Bftrpi',
			processing: true,
			serverSide: true,
			deferRender: true,
			ajax: {
				url: server.ctxPath + '/api/projects.json'
			},
			infoCallback: renderDisplayHint4DataTables,
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
						url: server.ctxPath + '/project/show'
					},
					edit: {
						url: server.ctxPath + '/project/edit',
						callback: modifyDataRequested
					},
					delete: {
						url: server.ctxPath + '/project/delete',
						callback: removeDataRequested
					}
				}), {
					data: 'code'
				}, {
					orderable: false,
					data: 'description'
				}, {
					orderable: false,
					data: 'constructNo'
				}, {
					orderable: false,
					data: 'constructModel'
				}, {
					data: 'constructPlace'
				}, {
					render: function(data, type, row, meta) {
						return (data && (type === 'display' || type === 'filter')) ?
							(projectTypes.hasOwnProperty(data) ? projectTypes[data] : data + '(代碼未定義)') :
							data;
					},
					orderable: false,
					data: 'projectKind' // 'projectType'
				}, {
					render: function(data, type, row, meta) {
						return (data && (type === 'display' || type === 'filter')) ?
							(constructTypes.hasOwnProperty(data) ? constructTypes[data] : data + '(代碼未定義)') :
							data;
					},
					orderable: false,
					data: 'constructCode' // 'constructType'
				}, {
					render: renderDate4DataTables(),
					data: 'durationBegin'
				}, {
					orderable: false,
					render: renderDate4DataTables(),
					data: 'durationEnd'
				}, {
					orderable: false,
					data: 'contact'
				}, {
					data: 'customer'
				}, {
					orderable: false,
					data: 'contactPerson'
				}, {
					orderable: false,
					data: 'contactPhoneNo'
				}, {
					orderable: false,
					data: 'note'
				}
			],
			order: [
					[1, 'asc']
				] // prev: 'aaSorting'
		})
		.buttons()
		.disable();
}
