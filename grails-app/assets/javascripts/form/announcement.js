//= require ../grid
//= require_self

var announcementList;

function removeDataRequested(result) {
	reloadDataTables(announcementList);
}

function modifyDataRequested(result, editForm) {
	reloadDataTables(announcementList);
}

function addDataRequested(result, editForm) {
	reloadDataTables(announcementList);
}

function addDataRequest(evt, dt, node, config) {
	BootstrapDialog.show({
		title: '新增...',
		message: requestAction4BootstrapDialog({
			url: server.ctxPath + '/announcement/create',
			callback: addDataRequested
		})
	});
}

function renderDisplayHint4DataTables(settings, start, end, max, total, pre) {
	return '<span class="small pull-right text-danger">(公告日期後並於撤榜日期前的資訊，會顯示於首頁中)</span>';
}

function createDataTable() {
	announcementList = $('#list-announcement').DataTable({
			processing: true,
			serverSide: true,
			deferRender: true,
			ajax: {
				url: server.ctxPath + '/api/announcements.json'
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
			columns: [ //0
				renderDefaultAlterationCellWithId4DataTables({
					edit: {
						url: server.ctxPath + '/announcement/edit',
						callback: modifyDataRequested
					},
					delete: {
						url: server.ctxPath + '/announcement/delete',
						callback: removeDataRequested
					}
				}), { //1
					orderable: false,
					data: 'description'
				}, { //2
					render: renderDate4DataTables(true),
					data: 'announcedDate'
				}, { //3
					render: renderDate4DataTables(),
					data: 'revokedDate'
				}, { //4
					orderable: false,
					render: renderDate4DataTables(),
					data: 'createdDate'
				}
			],
			order: [
					[2, 'desc']
				] // prev: 'aaSorting'
		})
		.buttons()
		.disable();
}
