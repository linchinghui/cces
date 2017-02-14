//********************************
//* DataTables JS grid functions *
//********************************
//= require application
//* require_tree grid
//* require plugins/datatables-all
//= require plugins/datatables
//= require_self

function reloadDataTables(api, arg) {
	if ($.isFunction(arg)) {
		api.ajax.reload(arg); // api.columns.adjust().ajax.reload(arg);
	} else {
		api.ajax.reload(function() { // api.columns.adjust().ajax.reload(null, arg && true);
			setTimeout(function() {
				$(window).trigger('resize'); //, {dataTable: api});
			}, 600);
		}, arg && true);
	}
}

function renderDate4DataTables(timeIncluded) {
	return function(data, type, row, meta) {
		// If display or filter data is requested, format the date
		return (data && (type == 'display' || type == 'filter')) ?
			moment(data).format('YYYY/MM/DD' + (timeIncluded ? ' HH:mm:ss' : '')) :
			data;
	};
}
function renderThumbnail4DataTables() {
	return function(data, type, row, meta) {
		var rtn = data;
		var flag = 'tc'+meta.col+'ed';

		if ((data && (type == 'display' || type == 'filter')) && ! row[flag]) {
			row[flag] = true;

			rtn = $('<span/>').attr({
				'class': 'fileinput-exists thumbnail',
				'data-field': data
			}).append(
				$('<img/>').attr({
					'data-src':'holder.js/44x44'
				})
			)[0].outerHTML;
		}

		return rtn;
	};
}

function renderCheck4DataTables(data, type, row, meta) {
	return ((data == true || data == false) && (type == 'display' || type == 'filter')) ?
		renderCheckBox(data) :
		data;
}

function renderRadio4DataTables(data, type, row, meta) {
	return ((data == true || data == false) && (type == 'display' || type == 'filter')) ?
		renderRadio(data) :
		data;
}

function disableProcessing4DataTables(api) {
	var settings = api.settings()[0];
	settings.oInstance._fnProcessingDisplay(false);
}

function transformServerResult4DataTables(api) {
	return function(response, status, jqXHR) {
		// JSON response, 'success' status, 200 of jqXHR.status, 'OK' of jqXHR.statusText
		alertMessage(response, jqXHR);
		api.settings()[0].oInstance._fnAjaxUpdateDraw(
			jQuery.isArray(response) ? {
				recordsTotal: 0,
				recordsFiltered: 0,
				data: []
			} : response
		);
		if (api.context[0].ajax.onDone) {
			api.context[0].ajax.onDone();
		}
	}
}

function transformServerError4DataTables(api) {
	return transformServerError(function() {
		disableProcessing4DataTables(api);
		renderAjaxButtons4DataTables(api);
		if (api.context[0].ajax.onDone) {
			api.context[0].ajax.onDone();
		}
	});
}

function renderAjaxButtons4DataTables(api, isInit) {
	var buttons = api.buttons().enable().each(function(button) {
		if (button.node.text == '取消') {
			button.inst.disable(button.node);
		}
	});

	if (isInit) {
		var btnsContainer = $(api.table().container());
		btnsContainer.find('a:contains("重查")').on('click', function() {
			buttons.each(function(button) {
				if (button.node.text == '重查') {
					button.inst.disable(button.node);
				} else if (button.node.text == '取消') {
					button.inst.enable(button.node);
				}
			});
		});
		btnsContainer.find('a:contains("取消")').on('click', function() {
			buttons.each(function(button) {
				if (button.node.text == '取消') {
					button.inst.disable(button.node);
				} else if (button.node.text == '重查') {
					button.inst.enable(button.node);
				}
			});
		});
	}
}

function addExternalButtons4DataTables(api) {
	var extButtons = [];
	var extButtonSettings = api.context[0] ? api.context[0].oInit.extButtons : {};

	if (!jQuery.isEmptyObject(extButtonSettings)) {
		$.map(extButtonSettings, function(v, k) {
			if (v == true) {
				switch (k) {
					case 'copy':
						extButtons.push({
							text: '複製',
							extend: k
						});
						break;
					case 'csv':
						extButtons.push({
							text: 'CSV',
							extend: k
						});
						break;
					case 'print':
						extButtons.push({
							text: '列印',
							extend: k
						});
						break;
					case 'pdf':
						extButtons.push({
							text: 'PDF',
							extend: k,
							orientation: 'landscape'
						});
						break;
				}
			}
		});
	}
	if (!jQuery.isEmptyObject(extButtons)) {
		var btns = new $.fn.DataTable.Buttons(api, {
			buttons: extButtons
		});
		var btnsGrp = btns.dom.container[0];

		$(btnsGrp).addClass('pull-right');
		for (var i = 0; i < btns.s.buttons.length; i++) {
			btns.disable(btns.s.buttons[i].node);
		}

		var ctnWrapper = api.table().container();
		$($(ctnWrapper).find('.dt-buttons.btn-group')[0]).after(btnsGrp);
	}
}

function addQueryButtons4DataTables(api) {
	var btns = new $.fn.dataTable.Buttons(api, {
		buttons: [{
			text: '重查',
			action: function(evt, _api, node, conf) {
				// $(evt.delegateTarget).hide();
				var ajaxConf = _api.context[0].ajax;
				var cont = ajaxConf.onReloadClick ? ajaxConf.onReloadClick(evt) : true;
				if (cont) {
					reloadDataTables(_api, ajaxConf.onReloadClicked);
				}
			}
		}, {
			text: '取消',
			action: function(evt, _api, node, conf) {
				_api.context[0].jqXHR.abort && _api.context[0].jqXHR.abort();
				disableProcessing4DataTables(_api);
			}
		}]
	});
	$(api.table().container()).prepend(btns.dom.container[0]);

	// btns = new $.fn.api.Buttons(api, {
	// 	buttons: [{
	// 		text: '取消',
	// 		action: function(evt, _api, node, conf) {
	// 			_api.context[0].jqXHR.abort && _api.context[0].jqXHR.abort();
	// 			disableProcessing4DataTables(_api);
	// 		}
	// 	}]
	// });
	// $(api.table().container()).prepend(btns.dom.container[0]);

	renderAjaxButtons4DataTables(api, true);

	var ajax = api.context[0].ajax;
	if (typeof ajax.success === 'undefined') {
		ajax.success = transformServerResult4DataTables(api);
	}
	if (typeof ajax.error === 'undefined') {
		ajax.error = transformServerError4DataTables(api);
	}
}

// function addSearchHighlight(api) {
// 	api.on('draw', function() {
// 		var body = $(api.table().body());
// 		body.unhighlight();
// 		body.highlight(api.search());
// 	});
// }

function reFireClick(evt, theCell, type) {
	var theRow = theCell.parentNode;
	$(theCell).delay(500).trigger('click', {
		type: type
	}); // un-toggle control detail
}

function createRemoveCellButtom(cell, dataKey, action) {
	var cellEle = $(action.selector, cell);

	if (/null(\||)/.test(dataKey)) {
		cellEle.addClass('disabled');
		return;
	}

	cellEle.click(function(evt) {
		reFireClick(evt, this.parentNode.parentNode, action.type);

		new BootstrapDialog({
			size: BootstrapDialog.SIZE_SMALL,
			type: BootstrapDialog.TYPE_WARNING,
			title: action.title + ' (ID=' + dataKey + ')',
			message: '是否確定 ?',
			closable: true,
			buttons: [{
				label: '否',
				cssClass: 'pull-left',
				action: function(dialog) {
					dialog.close();
				}
			}, {
				label: '是',
				action: function(dialog) {
					dialog.getModalFooter().hide();
					dialog.setMessage(requestAction4BootstrapDialog(action, dataKey, {
						'_method': 'DELETE'
					})); // POST method
				}
			}]
		}).open();
	});
}

function createEditCellButtom(cell, dataKey, action /*, infoOnly*/ ) {
	$(action.selector, cell).click(function(evt) {
		/*if (! infoOnly)*/
		reFireClick(evt, this.parentNode.parentNode, action.type);

		BootstrapDialog.show({
			title: action.title,
			message: requestAction4BootstrapDialog(action, dataKey) // GET method
		});
	});
}

function createInfoCellButtom(cell, dataKey, action) {
	if (/null(\||)/.test(dataKey)) {
		$(action.selector, cell).addClass('disabled');
		return;
	}
	createEditCellButtom(cell, dataKey, action /*, true*/ );
}

function renderAlterationCellWithId4DataTables(requestActions) {
	var actionsLen = Object.keys(requestActions).length;

	return { // visible: false, className: 'control',
		orderable: false,
		data: 'id',
		width: (actionsLen == 3 ? '76px' : actionsLen == 2 ? '52px' : '28px'),
		render: function(data, type, row, meta) {
			return (requestActions.show ? '<span><i class="fa fa-fw fa-info"></i></span>&nbsp;' : '') + (requestActions.edit ?
				'<span><i class="fa fa-fw fa-pencil"></i></span>&nbsp;' : '') + (requestActions.delete ?
				'<span><i class="fa fa-fw fa-times"></i></span>' : '') + '<span style="display: inline;"></span>';
		},
		createdCell: function(cell, cellData, rowData, row, col) {
			cell['className'] = 'control';

			if (requestActions.show) {
				createInfoCellButtom(cell, rowData['id'],
					$.extend(true, {
						delegate: cell,
						type: 'show',
						title: '資訊...',
						selector: 'span i.fa-info',
						key: 'id'
					}, requestActions.show));
			}
			if (requestActions.edit) {
				createEditCellButtom(cell, rowData['id'],
					$.extend(true, {
						delegate: cell,
						type: 'edit',
						title: '編輯...',
						selector: 'span i.fa-pencil',
						key: 'id'
					}, requestActions.edit));
			}
			if (requestActions.delete) {
				createRemoveCellButtom(cell, rowData['id'],
					$.extend(true, {
						delegate: cell,
						type: 'delete',
						title: '刪除...',
						selector: 'span i.fa-times',
						key: 'id'
					}, requestActions.delete));
			}
		}
	};
}

function resizeInSecs4DataTables(api) {
	$(window).resize(function(evt, params) {
		var dt = /*params ? params.dataTable :*/ api;
		dt.columns.adjust().responsive.recalc();
	});
	// TODO
	// $(window).delay(500).trigger('resize', {
	// dataTable: api
	// });
	setTimeout(function() {
		$(window).trigger('resize'); //, {dataTable: api});
	}, 500);
}

function addSearchCapability4DataTables(api) {
	api.columns().every(function() {
		var that = this;

		$('.search-input input', this.header()).each(function(idx, ele) {
			var placeholder = ele.parentElement.getAttribute('placeholder');
			placeholder = /*'搜尋' +*/ (placeholder ? placeholder : '關鍵字');

			ele.placeholder = placeholder;
			$(ele).typeWatch({
				wait: 750,
				captureLength: 1,
				highlight: true,
				callback: function(value) {
					if (that.search() !== value) {
						api.context[0].oPreviousSearch.sSearch = value;
						this.placeholder = value ? value : placeholder;
						this.value = "";
						that.search(value, true).draw();
					}
				}
			});
		});
	})
}

function initialized4DataTables(settings, response) {
	$.fn.dataTable.ext.errMode = 'none';
	var api = settings.oInstance ? settings.oInstance.DataTable() : settings.DataTable();
	addExternalButtons4DataTables(api);

	var ajax = api.context[0].ajax;
	if (ajax) {
		addQueryButtons4DataTables(api);
		// addSearchHighlight(api);

		if (typeof response == 'undefined') {
			api.clear().draw();
		} else {
			alertMessage(response, api.context[0].jqXHR);
		}
		if (ajax.onDone) {
			ajax.onDone();
		}
	}

	resizeInSecs4DataTables(api);
	addSearchCapability4DataTables(api);
}

$.extend(true, $.fn.dataTable.defaults, {
	dom: 'Bftrpi',
	pageLength: 10,
	searching: true, //false,
	// stateSave: true, // would cause 'sort' no work ?
	// select: {
	// 	info: false,
	// 	style: 'single'
	// },
	select: false,
	fixedHeader: true,
	scrollYInner: '100%',
	scrollY: '58vh', //300,
	scrollCollapse: true,
	responsive: {
		details: {
			type: 'inline'
		}
	},
	language: {
		thousands: ',',
		processing: '<span class="ajax-loader">查詢中, 請稍候&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>',
		zeroRecords: '<i class="fa fa-exclamation-circle"></i>&nbsp;無符合資料',
		emptyTable: '<i class="fa fa-exclamation-circle"></i>&nbsp;無符合資料',
		info: '',
		infoEmpty: '',
		infoFiltered: '// TODO',
		paginate: {
			first: '首頁', //'«'
			previous: '上頁', //'‹'
			next: '下頁', //'›'
			last: '末頁' //'»'
		}
	},
	ajax: {
		type: 'GET',
		dataType: 'json',
		contentType: 'application/json; charset=utf-8',
		data: function (params, settings) {
			var srvParams = {
				draw: params.draw,
				max: params.length,
				offset: params.start,
				sort: (params.order && params.order.length > 0 ? settings.aoColumns[params.order[0].column].data : 'id'),
				order: (params.order && params.order.length > 0 ? params.order[0].dir : 'asc')
			};
			$.each(params.columns, function() {
				if (this.search && this.search.value != "") {
					srvParams['s:' + this.data] = this.search.regex ? '%' + this.search.value + '%' :
						this.search.value;
				}
			});

			return srvParams;
		}
	},
	drawCallback: function(settings) {
		// if (settings.bFiltered) {
		// 	var searchVal = this.api().search();
		// 	if (searchVal !== '') {
		// 		$(this.api().table().container()).find('table td').highlight(searchVal);
		// 	}
		// }
		if (settings.ajax) {
			renderAjaxButtons4DataTables(settings.oInstance.DataTable());
		}
	}
});

$.fn.dataTable.ext.errMode = function(settings, tn, errors) {
	if (typeof settings !== 'undefined' && settings !== null) {
		var api = settings.oInstance.DataTable();
		var jqXHR = api.context[0].jqXHR;
		// var tableContainer = $(api.table().container());

		if (jqXHR && jqXHR.status >= 400) {
			// WTF v1.10.10: set bDestroying to invoke _fnReDraw()
			settings.bDestroying = true;
			api.clear().draw();
			delete settings['bDestroying'];

			if (jqXHR.status == 401) {
				disableProcessing4DataTables(api);
				$('.dataTables_empty').html('<i class="fa fa-exclamation-triangle"></i>&nbsp;無作業權限');

			} else {
				initialized4DataTables(settings, {
					errors: jqXHR.statusText
				});
			}
		}
	}
};
