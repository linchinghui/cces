//= require ../grid
//= require_self
//= require ../picture

function worker(params) {
	var workerList;
	var detailSec = $('.detail');
	var serverParams = {};
	$.extend(serverParams, params);

	function createDetailTab() {
		var actionFlag = null;

		$('#list-worker tbody').on('click', 'tr', function(evt, action) {
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
								'empId': workerList.row(this).data().id
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
			reloadDataTables(workerList);
			detailSec.empty();
		}
	}

	function modifyDataRequested(result, editForm) {
		reloadDataTables(workerList);
	}

	function addDataRequested(result, editForm) {
		reloadDataTables(workerList);
	}

	function addDataRequest(evt, dt, node, config) {
		BootstrapDialog.show({
			title: '新增...',
			message: requestAction4BootstrapDialog({
				url: server.ctxPath + '/worker/create',
				callback: addDataRequested
			})
		});
	}

	function renderPhoto(colName) {
		return function(data, type, row, meta) {
			// var photoName = colName+'Photo';
			// if (row[photoName]) {
			// 	return renderThumbnail4DataTables.call().call(null, row[photoName], type, row, meta);
			// } else {
			return renderDate4DataTables.call().call(null, data, type, row, meta); // 'Copied'
			// }
		}
	}

	function createDataTable() {
		workerList = $('#list-worker').DataTable({
				select: {
					info: false,
					style: 'single'
				},
				processing: true,
				serverSide: true,
				deferRender: true,
				ajax: {
					url: server.ctxPath + '/api/workers.json'
				},
				language: {
					info: '<span class="small pull-right text-danger">點選後，可於下方檢視證照資料</span>'
				},
				// infoCallback: function(settings, start, end, max, total, pre) {
				// 	return '<span class="small pull-right text-danger">點選後，可於下方檢視證照資料</span>';
				// },
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
						show: {
							url: server.ctxPath + '/worker/show'
						},
						edit: {
							url: server.ctxPath + '/worker/edit',
							callback: modifyDataRequested
						},
						delete: {
							url: server.ctxPath + '/worker/delete',
							callback: removeDataRequested
						}
					}), { //1
						data: 'empNo'
					}, { //2
						width: '44px',
						data: 'empName'
					}, { //3
						render: function(data, type, row, meta) {
							return ((type === 'display' || type === 'filter') ?
								serverParams.sexType.types[data.substr(0, serverParams.sexType.keyLength)] :
								data);
						},
						orderable: false,
						width: '34px',
						data: 'sex'
					}, { //4
						render: renderDate4DataTables(),
						data: 'employedDate'
					}, { //5
						render: renderDate4DataTables(),
						orderable: false,
						data: 'resignedDate'
					}, { //6
						render: renderPhoto('avatar'),
						orderable: false,
						data: 'avatarCopied'
					}, { //7
						render: renderPhoto('idCard'),
						orderable: false,
						data: 'idCardCopied'
					}, { //8
						render: renderPhoto('nhiIcCard'),
						orderable: false,
						data: 'nhiIcCardCopied'
					}, { //9
						render: renderPhoto('diploma'),
						orderable: false,
						data: 'diplomaCopied'
					}, { //10
						render: renderPhoto('oor'),
						orderable: false,
						data: 'oorCopied'
					}, { //11
						render: renderPhoto('gdl'),
						orderable: false,
						data: 'gdlCopied'
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
