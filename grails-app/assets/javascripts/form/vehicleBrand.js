//* require ../grid
//= require_self

var vehicleBrandList;

function removeBrandDataRequested(result) {
	reloadDataTables(vehicleBrandList);
}

function modifyBrandDataRequested(result, editForm) {
	reloadDataTables(vehicleBrandList);
}

function addBrandDataRequested(result, editForm) {
	reloadDataTables(vehicleBrandList);
}

function addBrandDataRequest(evt, dt, node, config) {
	BootstrapDialog.show({
		title: '新增...',
		message: requestAction4BootstrapDialog({
			url: server.ctxPath + '/vehicleBrand/create',
			callback: addBrandDataRequested
		})
	});
}

function createBrandDataTable() {
	vehicleBrandList = $('#list-vehicleBrand').DataTable({
			processing: true,
			serverSide: true,
			deferRender: true,
			ajax: {
				url: server.ctxPath + '/api/vehicleBrands.json'
			},
			initComplete: function(settings, data) {
				initialized4DataTables(settings, data);
			},
			extButtons: {
				copy: true
			},
			buttons: [{
				text: '新增',
				action: addBrandDataRequest
			}],
			columns: [ //0
				renderDefaultAlterationCellWithId4DataTables({
					edit: {
						url: server.ctxPath + '/vehicleBrand/edit',
						callback: modifyBrandDataRequested
					},
					delete: {
						url: server.ctxPath + '/vehicleBrand/delete',
						callback: removeBrandDataRequested
					}
				}), { //1
					data: 'name'
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
