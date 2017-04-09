//= require ../grid
//= require_self

function revenue(params) {
	var revenueList;

	function removeDataRequested(result) {
		alertMessage(result);
		if (result && result.status <= 400) {
			reloadDataTables(revenueList);
		}
	}

	function modifyDataRequested(result, editForm) {
		reloadDataTables(revenueList);
	}

	function addDataRequested(result, editForm) {
		reloadDataTables(revenueList);
	}

	function addDataRequest(evt, dt, node, config) {
		BootstrapDialog.show({
			title: '新增...',
			message: requestAction4BootstrapDialog({
				url: server.ctxPath + '/revenue/create',
				callback: addDataRequested
			})
		});
	}

	(function createDataTable() {
		revenueList = $('#list-revenue').DataTable({
				processing: true,
				serverSide: true,
				deferRender: true,
				ajax: {
					url: server.ctxPath + '/api/revenues.json'
				},
				infoCallback: function(settings, start, end, max, total, pre) {
					return '<span class="small pull-right text-danger">同一專案可新增多筆發票</span>';
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
						//   url: server.ctxPath+'/revenue/show'
						// },
						edit: {
							url: server.ctxPath + '/revenue/edit',
							callback: modifyDataRequested
						},
						delete: {
							url: server.ctxPath + '/revenue/delete',
							callback: removeDataRequested
						}
					}), { //1
						data: 'project'
					}, { //2
						data: 'invoieNo'
					}, { //3
						render: renderDate4DataTables(),
						data: 'invoiceDate'
					}, { //4
						render: renderDate4DataTables(),
						data: 'recordDate'
					// },{ //5
					//   render: renderDate4DataTables(true),
					//   data: 'modifiedDate'
					// },{ //6
					//   orderable: false,
					//   data: 'note'
					}
				],
				order: [
						[4, 'desc']
					] // prev: 'aaSorting'
			})
			.buttons()
			.disable();
	})();
}
