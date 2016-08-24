//* require ../grid
//= require_self

var mCertificateList;

function getCertificateParameters() {
	return (serverParams2.embed) ? serverParams2 : null;
}

function removeDetailDataRequested(result) {
	reloadDataTables(mCertificateList);
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

// function renderDisplayHint4DataTables(settings, start, end, max, total, pre) {
//   return serverParams2.noEdit ? '' : '<span class="small pull-right text-danger">新增相同XXX＋XXX的證照時，視為修改</span>';
// }

function createDetailDataTable() {
	var dataCols = [ //0
		renderDefaultAlterationCellWithId4DataTables(serverParams2.noEdit ? {} : {
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
			//   render: function(data, type, row, meta) {
			//     // If display or filter data is requested, format the date
			//     return (data && (type == 'display' || type == 'filter')) ? '(' + row.id.split('|')[0] + ') ' + data : '';
			//   },
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
				return $.extend({}, $.fn.dataTable.defaults.ajax.data(params, settings), getCertificateParameters());
			}
		},
		// infoCallback: renderDisplayHint4DataTables,
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

}
