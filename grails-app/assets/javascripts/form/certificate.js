//= require_self

function certificate(params) {
	var mCertificateList;
	var serverParams2 = {};
	$.extend(serverParams2, params);

	function getCertificateParameters(params) {
		var qryParams = $.extend({}, (serverParams2.embed) ? serverParams2 : null);
		if (params) {
			$.extend(qryParams, params);
		}
		return qryParams;
	}

	function removeDetailDataRequested(result) {
		alertMessage(result);
		if (result && result.status <= 400) {
			reloadDataTables(mCertificateList);
		}
	}

	function modifyDetailDataRequested(result, editForm) {
		reloadDataTables(mCertificateList);
	}

	function addDetailDataRequested(result, editForm) {
		reloadDataTables(mCertificateList);
	}

	function addDetailDataRequest(evt, dt, node, config) {
		BootstrapDialog.show({
			title: '新增...',
			message: requestAction4BootstrapDialog({
				url: server.ctxPath + '/certificate/create',
				callback: addDetailDataRequested
			}, null, getCertificateParameters())
		});
	}

	function prepareUrl(actionType) {
		return function() {
			return server.ctxPath + '/certificate/' + actionType + (serverParams2.embed ? '?' + $.param(serverParams2) : '');
		}
	}

	(function createDetailDataTable() {
		var dataCols = [ //0
			renderAlterationCellWithId4DataTables(serverParams2.noEdit ? {} : {
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
					// return (data && (type == 'display' || type == 'filter')) ? '(' + row.id.split('|')[0] + ') ' + data : '';
					return (data && (type == 'display' || type == 'filter')) ? data : '';
				},
				orderable: false,
				data: 'emp'
			}, { //2
				orderable: false,
				data: 'category'
			}, { //3
				orderable: false,
				data: 'title'
			}, { //4
				render: renderDate4DataTables(),
				orderable: false,
				data: 'examDate'
			}, { //5
				render: renderDate4DataTables(),
				orderable: false,
				data: 'expiryDate'
			}, { //6
				render: renderDate4DataTables(),
				orderable: false,
				data: 'copied'
			}
		];

		if (serverParams2.embed) {
			dataCols.splice(1, 1);
		}

		var dataSettings = {
			processing: true,
			serverSide: true,
			deferRender: true,
			ajax: {
				url: server.ctxPath + '/api/certificates.json',
				data: function(params, settings) {
					return getCertificateParameters($.fn.dataTable.defaults.ajax.data(params, settings));
				}
			},
			// language: {
			// 	info: (serverParams2.noEdit ? '' : '<span class="small pull-right text-danger">新增相同XXX＋XXX的證照時，視為修改</span>')
			// },
			// infoCallback: function renderDisplayHint4DataTables(settings, start, end, max, total, pre) {
			// 	return serverParams2.noEdit ? '' : '<span class="small pull-right text-danger">新增相同XXX＋XXX的證照時，視為修改</span>';
			// },
			initComplete: /*serverParams2.embed ? null :*/ function(settings, data) {
				initialized4DataTables(settings, data);
			},
			extButtons: {
				copy: true
			},
			buttons: serverParams2.noEdit ? [] : [{
				text: '新增',
				action: addDetailDataRequest
			}],
			columns: dataCols
		};

		mCertificateList = $('#list-certificate').DataTable(
				$.extend({}, serverParams2.embed ? {
					dom: 'Bftri'
				} : {
					order: [
							[1, 'asc']
						] // prev: 'aaSorting'
				}, dataSettings)
			)
			.buttons()
			.disable();

	})();
}
