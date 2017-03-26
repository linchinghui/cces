//= require ../grid
//= require_self

function material(params) {
	var materialList;
	var detailSec = $('.detail');
	var serverParams = {};
	$.extend(serverParams, params);

	function createDetailTab() {
		var actionFlag = null;

		$('#list-material tbody').on('click', 'tr', function(evt, action) {
			if (action) {
				actionFlag = action.type;
				return;
			}
			if ($(this).hasClass('selected') /*&& actionFlag != 'show'*/ ) {
				if (actionFlag != 'show') {
					var thisRow = materialList.row(this);
					detailSec
						.html('<div class="text-center"><span class="ajax-loader">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div>')
						.load(serverParams.detailLink, {
								'embed': true,
								'materialId': thisRow.data().id
							},
							function(response, status, jqXHR) {
								if (jqXHR.status >= 400) {
									detailSec.empty();
									alertError({}, jqXHR);
								}
							});
				}
			} else {
				detailSec.empty();
			}

			actionFlag = null;
		});
	}

	function removeDataRequested(result) {
		alertMessage(result);
		if (result && result.status <= 400) {
			reloadDataTables(materialList);
			// detailSec.empty();
		}
	}

	function modifyDataRequested(result, editForm) {
		reloadDataTables(materialList);
		// detailSec.empty();
	}

	function addDataRequested(result, editForm) {
		reloadDataTables(materialList);
		// detailSec.empty();
	}

	function addDataRequest(evt, dt, node, config) {
		BootstrapDialog.show({
			title: '新增...',
			message: requestAction4BootstrapDialog({
				url: server.ctxPath + '/material/create',
				callback: addDataRequested
			})
		});
	}

	function createDataTable() {
		materialList = $('#list-material').DataTable({
				select: {
					info: false,
					style: 'single'
				},
				processing: true,
				serverSide: true,
				deferRender: true,
				ajax: {
					url: server.ctxPath + '/api/materials.json',
					onReloadClicked: function() {
						detailSec.empty();
					}
				},
				language: {
					info: '<span class="small pull-right text-danger">點選後, 可於下方檢視材料的供應設定</span>'
				},
				// infoCallback: function(settings, start, end, max, total, pre) {
				// 	return '<span class="small pull-right text-danger">點選後, 可於下方檢視材料的供應設定</span>';
				// },
				initComplete: function(settings, data) {
					initialized4DataTables(settings, data);
					// detailSec.empty();
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
							url: server.ctxPath + '/material/show'
						},
						edit: {
							url: server.ctxPath + '/material/edit',
							callback: modifyDataRequested
						},
						delete: {
							url: server.ctxPath + '/material/delete',
							callback: removeDataRequested
						}
					}), { //1
						data: 'category'
					}, { //2
						data: 'name'
					}, { //3
						orderable: false,
						data: 'dimension'
					}, { //4
						orderable: false,
						data: 'texture'
					}, { //5
						orderable: false,
						data: 'spec' //其他
					}, { //6
						orderable: false,
						data: 'quantity'
					}, { //7
						orderable: false,
						data: 'unit'
					}, { //8
						data: 'price'
					}, { //9
						orderable: false,
						data: 'supplier'
					}, { //10
						orderable: false,
						data: 'contactPhoneNo'
					}, { //11
						render: renderDate4DataTables(),
						data: 'registeredDate'
					}
				],
				order: [
						[1, 'asc']
					] // prev: 'aaSorting'
			})
			.buttons()
			.disable();
	}

	createDetailTab();
	createDataTable();
	handleTabs();
}
