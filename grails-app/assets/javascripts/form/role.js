//= require ../grid
//= require_self

function ccesRole(params) {
	var detailSec = $('.detail');
	var roleList;
	var serverParams = {};
	$.extend(serverParams, params);

	function createDetailTab() {
		var actionFlag = null;

		$('#list-role tbody').on('click', 'tr', function(evt, action) {
			if (action) {
				actionFlag = action.type;
				return;
			}
			if ($(this).hasClass('selected')) {
				if (actionFlag != 'edit') {
					detailSec
						.html('<div class="text-center"><span class="ajax-loader">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div>')
						.load(serverParams.detailLink, {
								'embed': true,
								'roleId': roleList.row(this).data().id
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

	function modifyDataRequested(result, editForm) {
		reloadDataTables(roleList);
		detailSec.empty();
	}

	function createDataTable() {
		roleList = $('#list-role').DataTable({
				dom: 'Bftri',
				select: {
					info: false,
					style: 'single'
				},
				processing: true,
				serverSide: true,
				deferRender: true,
				ajax: {
					url: server.ctxPath + '/api/roles.json',
					onReloadClicked: function() {
						detailSec.empty();
					}
				},
				language: {
					info: '<span class="small text-danger pull-right">'
						+ '<span>點選後，可於下方檢視權限設定</span>&nbsp;'
						+ '<span>(除系統管理者有預設權限外，其餘者須進行設定)</span>'
						+ '</span>'
				},
				// infoCallback: function(settings, start, end, max, total, pre) {
				// 	return '<span class="small text-danger pull-right">'
				// 	+ '<span>點選後，可於下方檢視權限設定</span>&nbsp;'
				// 	+ '<span>(除系統管理者有預設權限外，其餘者須進行設定)</span>'
				// 	+ '</span>';
				// },
				initComplete: function(settings, data) {
					initialized4DataTables(settings, data);
					// detailSec.empty();
				},
				extButtons: {
					copy: true
				},
				buttons: [
					// {text: '新增', action: addDataRequest}
				],
				columns: [ //0
					renderAlterationCellWithId4DataTables({
						edit: {
							url: server.ctxPath + '/role/edit',
							callback: modifyDataRequested
						}
					}), { //1
						orderable: false,
						data: 'code'
					}, { //2
						orderable: false,
						data: 'description'
					}
				],
				order: []
			})
			.buttons()
			.disable();
	}

	createDetailTab();
	createDataTable();
}
