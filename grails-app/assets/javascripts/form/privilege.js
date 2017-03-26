//= require_self

function privilege(params) {
	var privilegeList;
	var serverParams2 = {};
	$.extend(serverParams2, params);

	function getPrivilegeParameters(params) {
		var qryParams = {};

		if (serverParams2.embed) {
			$.extend(qryParams, serverParams2);
		}
		if (params) {
			$.extend(qryParams, params);
		}
		return qryParams;
	}

	function removeDetailDataRequested(result) {
		alertMessage(result);
		if (result && result.status <= 400) {
			reloadDataTables(privilegeList);
		}
	}

	function modifyDetailDataRequested(result, editForm) {
		reloadDataTables(privilegeList);
	}

	function addDetailDataRequested(result, editForm) {
		reloadDataTables(privilegeList);
	}

	function addDetailDataRequest(evt, dt, node, config) {
		BootstrapDialog.show({
			title: '新增...',
			message: requestAction4BootstrapDialog({
				url: server.ctxPath + '/privilege/create',
				callback: addDetailDataRequested
			}, null, getPrivilegeParameters())
		});
	}

	function prepareUrl(actionType) {
		var url = server.ctxPath + '/privilege/' + actionType;

		return function() {
			return serverParams2.embed ? (url + '?' + $.param(serverParams2)) : url;
		}
	}

	(function createDetailDataTable() {
		var dataCols = [ //0
			renderAlterationCellWithId4DataTables({
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
				data: 'role'
			}, { //2
				orderable: false,
				data: 'function'
			}, { //3
				render: renderCheck4DataTables,
				orderable: false,
				data: 'canRead'
			}, { //4
				render: renderCheck4DataTables,
				orderable: false,
				data: 'canWrite'
			}, { //5
				render: renderCheck4DataTables,
				orderable: false,
				data: 'canDelete'
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
				url: server.ctxPath + '/api/privileges.json',
				data: function(params, settings) {
					return getPrivilegeParameters($.fn.dataTable.defaults.ajax.data(params, settings));
				}
			},
			initComplete: serverParams2.embed ? null : function(settings, data) {
				initialized4DataTables(settings, data);
			},
			extButtons: {
				copy: true
			},
			columns: dataCols
		};

		privilegeList = $('#list-privilege').DataTable(
				$.extend({}, serverParams2.embed ? {
					dom: 'Bftri',
					pageLength: 100,
					scrollY: true,
					buttons: [],
					order: []
				} : {
					buttons: [{
						text: '新增',
						action: addDetailDataRequest
					}],
					order: [
							[1, 'asc']
						] // prev: 'aaSorting'
				}, dataSettings)
			)
			.buttons()
			.disable();
	})();
}
