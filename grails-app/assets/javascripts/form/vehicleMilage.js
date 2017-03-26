//= require_self

function vehicleMilage(params) {
	var vehicleMilageList;
	var serverParams2 = {};
	$.extend(serverParams2, params);

	if (serverParams2.embed) {
		$(window).on('criterionChanged', function(e) {
			serverParams2.projectId = e.state.projectId;
			serverParams2.constructNo = e.state.constructNo;
			serverParams2.dispatchedDate = e.state.workedDate;
			reloadDataTables(vehicleMilageList);
		});
	}

	function getMilageParameters(params) {
		var qryParams = {
			embed: serverParams2.embed,
			projectId: serverParams2.projectId,
			constructNo: serverParams2.constructNo,
			dispatchedDate: serverParams2.dispatchedDate.replace(/\//g, '-')
		};
		if (params) {
			$.extend(qryParams, params);
		}
		return qryParams;
	}

	function removeMilageRequested(result) {
		alertMessage(result);
		if (result && result.status <= 400) {
			reloadDataTables(vehicleMilageList);
		}
	}

	function modifyMilageRequested(result, editForm) {
		reloadDataTables(vehicleMilageList);
	}

	function addMilageRequested(result, editForm) {
		reloadDataTables(vehicleMilageList);
	}

	function addMilageRequest(evt, dt, node, config) {
		BootstrapDialog.show({
			title: '新增...',
			message: requestAction4BootstrapDialog({
				url: server.ctxPath + '/vehicleMilage/create',
				callback: addMilageRequested
			}, null, getMilageParameters())
		});
	}

	function prepareUrl(actionType) {
		var url = server.ctxPath + '/vehicleMilage/' + actionType;

		return function() {
			return serverParams2.embed ? (url + '?' + $.param(getMilageParameters())) : url;
		}
	}

	(function createMilageTable() {
		var dataCols = [ //0
			renderAlterationCellWithId4DataTables({
				edit: {
					url: prepareUrl('edit'),
					callback: modifyMilageRequested
				},
				delete: {
					title: '清除...',
					url: prepareUrl('delete'),
					callback: removeMilageRequested
				}
			}), { //1
				data: 'project'
			}, { //2
				render: renderDate4DataTables(),
				data: 'dispatchedDate'
			}, { //3
				data: 'vehicle'
			}, { //4
				orderable: false,
				data: 'km'
			}
		];

		if (serverParams2.embed) {
			dataCols.splice(1, 2);
		}

		var dataSettings = {
			processing: true,
			serverSide: true,
			deferRender: true,
			ajax: {
				url: server.ctxPath + '/api/vehicleMilages.json',
				data: function(params, settings) {
					settings.ajax.fake = serverParams2.embed && !(serverParams2.projectId || serverParams2.constructNo || false);
					return getMilageParameters($.fn.dataTable.defaults.ajax.data(params, settings));
				},
				onDone: function() {
					if (serverParams2.embed && !(serverParams2.projectId || serverParams2.constructNo || false)) {
						vehicleMilageList.buttons().disable();
					}
				},
				onReloadClick: function(event) {
					return (!serverParams2.embed || serverParams2.projectId || serverParams2.constructNo);
				}
				// ,onReloadClicked: function() {
				// }
			},
			initComplete: function(settings, data) {
				initialized4DataTables(settings, data);
			},
			extButtons: {
				copy: true
			},
			buttons: [{
				text: '新增',
				action: addMilageRequest
			}],
			columns: dataCols,
			order: [
					[1, 'asc']
				] // prev: 'aaSorting'
		};

		$.ajax.fake.registerWebservice('/api/vehicleMilages.json', function(req) {
			// empty DT data
			return {
				draw: req.draw,
				recordsTotal: 0,
				recordsFiltered: 0,
				data: []
			};
		});

		vehicleMilageList = $('#list-vehicleMilage').DataTable(
				serverParams2.embed ? $.extend({
					dom: 'Bftri'
				}, dataSettings) : dataSettings
			)
			.buttons()
			.disable();
	})();
}
