//= require ../grid
//= require ../plugins/jquery.jeditable
//= require_self

function dynamicEnum(params) {
	var serverParams = {};
	$.extend(serverParams, params);

	function focusSaveButton(type) {
		var btns = $('a[aria-controls="list-' + type + '"]:contains("存檔")');

		if (btns.length > 0) {
			setTimeout(function() {
				btns[0].focus();
			}, 500);
		}
	}

	function addDataRequested(request, editForm) {
		var keyInfo = serverParams.keyInfo[request.type];
		var row = {
			'id': null
		};
		var errors = [];
		var dTable = $('#list-' + request.type).dataTable();

		$('input[type!="submit"]', editForm).each(function(idx, ele) {
			if (ele.id == keyInfo.from) {
				ele.value = ele.value.toUpperCase();

				if (ele.value.length < keyInfo.len) {
					errors.push('[' +
						$(ele.parentNode).find('label').clone().children().remove().end().text().trim() + ']字元長度不足');
				} else {
					row['id'] = ele.value.substring(0, keyInfo.len);

					if (dTable.api(true).column(0).data().indexOf(row.id) >= 0) {
						errors.push('識別字元前' + keyInfo.len + '碼[' + row['id'] + ']相同, 無法新增!');
					}
				}
			}
			row[ele.id] = ele.value;
		});
		if (errors.length > 0) {
			alertError({
				errors: errors
			});
		} else {
			dTable.fnAddData(row, true);
			focusSaveButton(request.type);
		}
	}

	function addDataRequest(evt, _api, node, config) {
		BootstrapDialog.show({
			title: '新增...',
			message: requestAction4BootstrapDialog({
				callback: addDataRequested,
				url: server.ctxPath + '/dynamicEnum/create'
			}, null, {
				type: _api.settings()[0].sTableId.split('-')[1]
			})
		});
	}

	// function saveDataRequested(response, editForm) {
	// }

	function saveDataRequest(evt, _api, node, config) {
		var types = [];
		$.each(_api.data(), function(idx, obj) {
			types.push(obj);
		});
		$.ajax({
			type: 'POST',
			// traditional: true,
			contentType: 'application/json; charset=utf-8',
			url: server.ctxPath + '/dynamicEnum/save',
			data: JSON.stringify({
				type: _api.settings()[0].sTableId.split('-')[1],
				types: types
			}),
			success: function(response, status, jqXHR) {
				alertMessage(response, jqXHR);
			},
			error: transformServerError()
		});
	}

	function removeDataRequest(request) {
		var dTable = $('#list-' + request.type).dataTable();
		var idx = dTable.api(true).column(0).data().indexOf(request.id);
		if (idx >= 0) {
			dTable.fnDeleteRow(idx);
			focusSaveButton(request.type);
		}
	}

	function changeField(dataTable) {
		return function(newValue, jedit) {
			if (dataTable) {
				var pos = dataTable.fnGetPosition(this);
				dataTable.fnUpdate(newValue, pos[0], pos[1]);
			} else {
				// just value, no ajax
				return newValue;
			}
		}
	}

	function createDeleteUrl(delegate) { // delete icon ele. click
		var url;
		$.each(serverParams.keyInfo, function(key, obj) {
			if ($('#list-' + key).dataTable().api(true).cell(delegate).length > 0) {
				url = server.ctxPath + '/dynamicEnum/delete?type=' + key;
			}
		});
		return url;
	}

	function renderDisplayHint4DataTables(settings, start, end, max, total, pre) {
		var len = serverParams.keyInfo[settings.sTableId.split('-')[1]].len;
		return '<span class="small pull-left text-danger">各欄位可用滑鼠 "點選" 進行編輯</span>' +
			'<span class="small pull-right text-danger bg-warning">代碼前' + len + '字元做為識別用</span><br>' +
			'<span class="small pull-left text-danger">編輯或刪除後, 請進行 [存檔] 生效</span>' +
			'<span class="small pull-right text-danger bg-warning">經啟用後請勿隨意變更或刪除</span>';
	}

	(function createDataTable() {
		$('#list-projectType, #list-constructType')
			.DataTable({
				ajax: null,
				paging: false,
				ordering: false,
				processing: false,
				serverSide: false,
				infoCallback: renderDisplayHint4DataTables,
				initComplete: function(settings, data) {
					// delete settings.ajax;
					initialized4DataTables(settings, data);
					$.each(settings.aoColumns, function(idx, obj) {
						if (obj.idx > 0) {
							log(obj.width);
							$('#' + settings.sTableId + ' tbody td:nth-child(' + (obj.idx + 1) + ')')
								.editable(changeField(null), {
									id: null,
									name: obj.data,
									loadtype: null,
									loadtext: null,
									callback: changeField(settings.oInstance.dataTable())
								});
						}
					});
				},
				extButtons: {
					// collapse: true,
					copy: true
				},
				buttons: [{
					text: '新增',
					action: addDataRequest
				}, {
					text: '存檔',
					action: saveDataRequest
				}],
				columns: [ //0
					renderAlterationCellWithId4DataTables({
						delete: {
							url: createDeleteUrl,
							callback: removeDataRequest
						}
					}), {
						data: 'name'
					}, {
						data: 'desc'
					}
				],
				order: []
			})
			.buttons()
			.enable();
	})();

	handleTabs();
}
