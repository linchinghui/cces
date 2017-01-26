//* require ../grid
//= require_self

var supplierList;

function removeDataRequested(result) {
	reloadDataTables(supplierList);
}

function modifyDataRequested(result, editForm) {
	reloadDataTables(supplierList);
}

function addDataRequested(result, editForm) {
	reloadDataTables(supplierList);
}

function addDataRequest(evt, dt, node, config) {
	BootstrapDialog.show({
		title: '新增...',
		message: requestAction4BootstrapDialog({
			url: '/supplier/create',
			callback: addDataRequested
		})
	});
}

function createDataTable() {
	supplierList = $('#list-supplier').DataTable({
			processing: true,
			serverSide: true,
			deferRender: true,
			ajax: {
				url: server.ctxPath + '/api/suppliers.json'
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
			columns: [ //0
				renderAlterationCellWithId4DataTables({
					// show: {
					//   url: server.ctxPath+'/supplier/show'
					// },
					edit: {
						url: server.ctxPath + '/supplier/edit',
						callback: modifyDataRequested
					},
					delete: {
						url: server.ctxPath + '/supplier/delete',
						callback: removeDataRequested
					}
				}), { //1
					data: 'code'
				}, { //2
					orderable: false,
					data: 'name'
				}, { //3
					data: 'ubn'
				}, { //4
					data: 'phoneNo'
				}, { //5
					orderable: false,
					data: 'faxNo'
				}, { //6
					orderable: false,
					data: 'email'
				}, { //7
					orderable: false,
					data: 'contact'
				}, { //8
					data: 'contactPhoneNo'
				}
			],
			order: [
					[1, 'asc']
				] // prev: 'aaSorting'
		})
		.buttons()
		.disable();
}
