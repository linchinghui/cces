//= require_self

function certificateCategory(params) {
	var certificateCategoryList;
	var serverParams3 = {};
	$.extend(serverParams3, params);

	function removeCatDataRequested(result) {
		alertMessage(result);
		if (result && result.status <= 400) {
			reloadDataTables(certificateCategoryList);
		}
	}

	function modifyCatDataRequested(result, editForm) {
		reloadDataTables(certificateCategoryList);
	}

	function addCatDataRequested(result, editForm) {
		reloadDataTables(certificateCategoryList);
	}

	function addCatDataRequest(evt, dt, node, config) {
		BootstrapDialog.show({
			title: '新增...',
			message: requestAction4BootstrapDialog({
				url: server.ctxPath + '/certificateCategory/create',
				callback: addCatDataRequested
			})
		});
	}

	(function createCatDataTable() {
		certificateCategoryList = $('#list-certificateCategory').DataTable({
				processing: true,
				serverSide: true,
				deferRender: true,
				ajax: {
					url: server.ctxPath + '/api/certificateCategories.json'
				},
				initComplete: function(settings, data) {
					initialized4DataTables(settings, data);
				},
				extButtons: {
					copy: true
				},
				buttons: [{
					text: '新增',
					action: addCatDataRequest
				}],
				columns: [ //0
					renderAlterationCellWithId4DataTables({
						edit: {
							url: server.ctxPath + '/certificateCategory/edit',
							callback: modifyCatDataRequested
						},
						delete: {
							url: server.ctxPath + '/certificateCategory/delete',
							callback: removeCatDataRequested
						}
					}), { //1
						data: 'code'
					}, { //2
						orderable: false,
						data: 'description'
					}, { ///3
						render: renderCheck4DataTables,
						orderable: false,
						data: 'permanent'
					}
				],
				order: [
						[1, 'asc']
					] // prev: 'aaSorting'
			})
			.buttons()
			.disable();
	})();

	if (!serverParams3.embed) {
		handleTabs();
	}
}
