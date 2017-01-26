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

// function renderDisplayHint4DataTables(settings, start, end, max, total, pre) {
// 	return '<span class="small pull-right text-danger text-right">公告日期後、撤榜日期前的資訊，會顯示於首頁中<br>選填特定作業時，公告內容將於進入該作業畫面時呈現</span>';
// }

function createDataTable() {
	announcementList = $('#list-announcement').DataTable({
			processing: true,
			serverSide: true,
			deferRender: true,
			ajax: {
				url: server.ctxPath + '/api/announcements.json'
			},
			language: {
				info: '<span class="small pull-right text-danger text-right">公告日期後、撤榜日期前的資訊，會顯示於首頁中<br>選填特定作業時，公告內容將於進入該作業畫面時呈現</span>'
			},
			// infoCallback: renderDisplayHint4DataTables,
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
				}, { //5
					orderable: false,
					data: 'function'
				}
			],
			order: [
					[2, 'desc']
				] // prev: 'aaSorting'
		})
		.buttons()
		.disable();
}
