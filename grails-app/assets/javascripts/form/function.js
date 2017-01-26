//= require ../grid
//= require_self

var functionList;

function removeDataRequested(result) {
	reloadDataTables(functionList);
}

function modifyDataRequested(result, editForm) {
	reloadDataTables(functionList);
}

// function renderDisplayHint4DataTables(settings, start, end, max, total, pre) {
// 	return '<span class="small pull-right text-danger">作業名稱: { 選單名稱 } [ - { 作業標頭 } ]</span>';
// }

function createDataTable() {
	functionList = $('#list-function').DataTable({
			processing: true,
			serverSide: true,
			deferRender: true,
			ajax: {
				url: server.ctxPath + '/api/functions.json'
			},
			language: {
				info: '<span class="small pull-right text-danger">作業名稱: { 選單名稱 } [ - { 作業標頭 } ]</span>'
			},
			// infoCallback: renderDisplayHint4DataTables,
			initComplete: function(settings, data) {
				initialized4DataTables(settings, data);
			},
			extButtons: {
				copy: true
			},
			buttons: [],
			columns: [ //0
				renderAlterationCellWithId4DataTables({
					edit: {
						url: server.ctxPath + '/function/edit',
						callback: modifyDataRequested
					}
				}), { //1
					data: 'name'
				}, { //2
					data: 'description'
				}
			],
			order: [
					[2, 'asc']
				] // prev: 'aaSorting'
		})
		.buttons()
		.disable();
}
