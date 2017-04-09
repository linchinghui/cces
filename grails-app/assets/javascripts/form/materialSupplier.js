//= require_self

function materialSupplier(params) {
	var mSupplierList;
	var serverParams3 = {};
	$.extend(serverParams3, params);

	function getSupplierParameters(params) {
		var qryParams = {};

		if (serverParams3.embed) {
			$.extend(qryParams, serverParams3);
		}
		if (params) {
			$.extend(qryParams, params);
		}
		return qryParams;
	}

	function removeDetailDataRequested(result) {
		alertMessage(result);
		if (result && result.status <= 400) {
			reloadDataTables(mSupplierList);
		}
	}

	function modifyDetailDataRequested(result, editForm) {
		reloadDataTables(mSupplierList);
	}

	function addDetailDataRequested(result, editForm) {
		reloadDataTables(mSupplierList);
	}

	function addDetailDataRequest(evt, dt, node, config) {
		BootstrapDialog.show({
			title: '新增...',
			message: requestAction4BootstrapDialog({
				url: server.ctxPath + '/materialSupplier/create',
				callback: addDetailDataRequested
			}, null, getSupplierParameters())
		});
	}

	function prepareUrl(actionType) {
		var url = server.ctxPath + '/materialSupplier/' + actionType;

		return function() {
			return serverParams3.embed ? (url + '?' + $.param(serverParams3)) : url;
		}
	}

	(function createDetailDataTable() {
		var dataCols = [ //0
			renderAlterationCellWithId4DataTables(serverParams3.noEdit ? {} : {
				edit: {
					url: prepareUrl('edit'),
					callback: modifyDetailDataRequested
				},
				delete: {
					title: '清除...',
					url: prepareUrl('delete'),
					callback: removeDetailDataRequested
				}
			}), { //1
				render: function(data, type, row, meta) {
					return (data && (type == 'display' || type == 'filter')) ? '(' + row.id.split('|')[0] + ') ' + data : '';
				},
				data: 'material'
			}, { //2
				orderable: false,
				data: 'supplier'
			}, { //3
				render: renderDate4DataTables(),
				orderable: false,
				data: 'purchasedDate'
			}, { //4
				orderable: false,
				data: 'purchasedPrice'
			}, { //5
				orderable: false,
				data: 'brand'
			}, { //5
				orderable: false,
				data: 'saleman'
			}, { //5
				orderable: false,
				data: 'phoneNo'
			}, { //5
				orderable: false,
				data: 'faxNo'
			}
		];

		if (serverParams3.embed) {
			dataCols.splice(1, 1);
		}

		var dataSettings = {
			processing: true,
			serverSide: true,
			deferRender: true,
			ajax: {
				url: server.ctxPath + '/api/materialSuppliers.json',
				data: function(params, settings) {
					return getSupplierParameters($.fn.dataTable.defaults.ajax.data(params, settings));
				}
			},
			infoCallback: function(settings, start, end, max, total, pre) {
				return serverParams3.noEdit ? '' : '<span class="small pull-right text-danger">新增相同供應商＋廠牌的材料時，視為修改</span>';
			},
			initComplete: /*serverParams3.embed ? null :*/ function(settings, data) {
				initialized4DataTables(settings, data);
			},
			extButtons: {
				copy: true
			},
			buttons: serverParams3.noEdit ? [] : [{
				text: '新增',
				action: addDetailDataRequest
			}],
			columns: dataCols,
			order: [
					[1, 'asc']
				] // prev: 'aaSorting'
		};

		mSupplierList = $('#list-materialSupplier').DataTable(
				serverParams3.embed ? $.extend({
					dom: 'Bftri'
				}, dataSettings) : dataSettings
			)
			.buttons()
			.disable();
	})();
}
