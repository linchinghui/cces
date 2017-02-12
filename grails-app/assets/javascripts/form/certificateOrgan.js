//* require ../grid
//= require_self

var certificateOrganList;

function removeOrgDataRequested(result) {
	alertMessage(result);
	if (result && result.status <=400) {
		reloadDataTables(certificateOrganList);
	}
}

function modifyOrgDataRequested(result, editForm) {
	reloadDataTables(certificateOrganList);
}

function addOrgDataRequested(result, editForm) {
	reloadDataTables(certificateOrganList);
}

function addOrgDataRequest(evt, dt, node, config) {
	BootstrapDialog.show({
		title: '新增...',
		message: requestAction4BootstrapDialog({
			url: server.ctxPath + '/certificateOrgan/create',
			callback: addOrgDataRequested
		})
	});
}

function createOrgDataTable() {
	certificateOrganList = $('#list-certificateOrgan').DataTable({
			processing: true,
			serverSide: true,
			deferRender: true,
			ajax: {
				url: server.ctxPath + '/api/certificateOrgans.json'
			},
			initComplete: function(settings, data) {
				initialized4DataTables(settings, data);
			},
			extButtons: {
				copy: true
			},
			buttons: [{
				text: '新增',
				action: addOrgDataRequest
			}],
			columns: [ //0
				renderAlterationCellWithId4DataTables({
					edit: {
						url: server.ctxPath + '/certificateOrgan/edit',
						callback: modifyOrgDataRequested
					},
					delete: {
						url: server.ctxPath + '/certificateOrgan/delete',
						callback: removeOrgDataRequested
					}
				}), { //1
					data: 'code'
				}, { //2
					orderable: false,
					data: 'description'
				}
			],
			order: [
					[1, 'asc']
				] // prev: 'aaSorting'
		})
		.buttons()
		.disable();
}
