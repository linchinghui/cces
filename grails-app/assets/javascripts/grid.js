//********************************
//* DataTables JS grid functions *
//********************************
//= require application
//* require_tree grid
//= require plugins/datatables-all
//= require_self

function reloadDataTables(dt, arg) {
  if ($.isFunction(arg)) {
    dt.columns.adjust().ajax.reload(arg);
  } else {
    dt.columns.adjust().ajax.reload(null, arg && true);
  }
}

function renderDate4DataTables(timeIncluded) {
  return function (data, type, row, meta) {
    // If display or filter data is requested, format the date
    return (data && (type == 'display' || type == 'filter')) ?
      moment(data).format('YYYY/MM/DD' + (timeIncluded ? ' HH:mm:ss' : '')) :
      data;
  };
}

function renderCheck4DataTables(data, type, row, meta) {
  return ((data == true || data == false) && (type == 'display' || type == 'filter')) ?
    renderCheckBox(data) :
    data;
}

function disableProcessing4DataTables(settings) {
  settings.oInstance._fnProcessingDisplay(settings, false);
}

function transformServerResult4DataTables(settings) {
  return function(response, status, jqXHR) {
    // JSON response, 'success' status, 200 of jqXHR.status, 'OK' of jqXHR.statusText
    alertMessage(response, jqXHR);
    var dataTable = settings.oInstance.DataTable();
    settings.oInstance._fnAjaxUpdateDraw(response);

    if (dataTable.context[0].ajax.onDone) {
      dataTable.context[0].ajax.onDone();
    }
  }
}

function transformServerError4DataTables(settings) {
  return transformServerError(function() {
    disableProcessing4DataTables(settings);
    var dataTable = settings.oInstance.DataTable();
    renderAjaxButtons4DataTables(dataTable);

    if (dataTable.context[0].ajax.onDone) {
      dataTable.context[0].ajax.onDone();
    }
  });
}

function renderAjaxButtons4DataTables(dataTable, isInit) {
  dataTable.buttons().enable();
  var btnsContainer = $(dataTable.table().container());
  var cancelBtn = btnsContainer.find('a:contains("取消")').hide();
  var reloadBtn = btnsContainer.find('a:contains("重查")').show();

  if (isInit) {
    reloadBtn.on('click', function() {
      cancelBtn.show();
      $(this).hide();
    });
    cancelBtn.on('click', function() {
      reloadBtn.show();
      $(this).hide();
    });
  }
}

function addExternalButtons4Init(dataTable) {
  var extButtons = {};
  var extButtonSettings = dataTable.context[0] ? dataTable.context[0].oInit.extButtons : {};

  if (! jQuery.isEmptyObject(extButtonSettings)) {
    $.map(extButtonSettings, function(v, k) {
      if (v == true) {
        switch (k) {
          case 'copy':
            $.extend(true, extButtons, {text: '複製', extend: k});
            break;
          case 'csv':
            $.extend(true, extButtons, {text: 'CSV', extend: k});
            break;
          case 'print':
            $.extend(true, extButtons, {text: '列印', extend: k});
            break;
          case 'pdf':
            $.extend(true, extButtons, {text: 'PDF', extend: k, orientation: 'landscape'});
            break;
        }
      }
    });
  }
  if (! jQuery.isEmptyObject(extButtons)) {
    var btns = new $.fn.DataTable.Buttons(dataTable, {buttons: [extButtons]});
    var btnsGrp = btns.dom.container[0];

    for (var i = 0; i < btns.s.buttons.length; i++) {
      btns.disable(i);
    }

    $(btnsGrp).addClass('pull-right');
    $(dataTable.table().container()).find('.dt-buttons.btn-group').after(btnsGrp);
  }
}

function addQueryButtons4Init(settings) {
  var dataTable = settings.oInstance ? settings.oInstance.DataTable() : settings.DataTable();
  var btns = new $.fn.dataTable.Buttons(dataTable, {
    buttons: [{
      text: '重查',
      action: function(evt, dt, node, conf) {
        // $(evt.delegateTarget).hide();
        var ajaxConf = dataTable.context[0].ajax;
        var cont = ajaxConf.onReloadClick ? ajaxConf.onReloadClick(evt) : true;
        if (cont) {
          reloadDataTables(dt, ajaxConf.onReloadClicked);
        }
      }
    }]
  });
  $(dataTable.table().container()).prepend(btns.dom.container[0]);

  btns = new $.fn.dataTable.Buttons(dataTable, {
    buttons: [{
      text: '取消',
      action: function(evt, dt, node, conf) {
        dt.context[0].jqXHR.abort && dt.context[0].jqXHR.abort(); // dataTable.context[0].jqXHR.abort();
        disableProcessing4DataTables(settings);
      }
    }]
  });
  $(dataTable.table().container()).prepend(btns.dom.container[0]);

  renderAjaxButtons4DataTables(dataTable, true);
  var ajax = dataTable.context[0].ajax;

  if (ajax && typeof ajax.success === 'undefined') {
    ajax.success = transformServerResult4DataTables(settings);
  }
  if (ajax && typeof ajax.error === 'undefined') {
    ajax.error = transformServerError4DataTables(settings);
  }
}

function addSearchHighlight(dataTable) {
  dataTable.on('draw', function() {
    var body = $(dataTable.table().body());
    body.unhighlight();
    body.highlight(dataTable.search());
  });
}

function createRemoveCellButtom(cellEle, dataKey, action) {
  if (/null(\||)/.test(dataKey)) {
    $(cellEle).addClass('disabled');
    return;
  }

  cellEle.click(function() {
    var theCell = this.parentNode.parentNode;
    // var theRow = theCell.parentNode;
    $(theCell).delay(500).trigger('click'); // un-toggle control detail

    new BootstrapDialog({
        size: BootstrapDialog.SIZE_SMALL,
        type: BootstrapDialog.TYPE_WARNING,
        title: action.title + ' (ID=' + dataKey + ')',
        message: '是否確定 ?',
        closable: true,
        buttons: [{
          label: '否',
          cssClass: 'pull-left',
          action: function (dialog) {
            dialog.close();
          }
        }, {
          label: '是',
          action: function (dialog) {
            dialog.getModalFooter().hide();
            dialog.setMessage(requestAction4BootstrapDialog(action, dataKey, {'_method': 'DELETE'})); // POST method
          }
        }]
    }).open();
  });
}

function createEditCellButtom(cellEle, dataKey, action) {
  cellEle.click(function() {
    var theCell = this.parentNode.parentNode;
    // var theRow = theCell.parentNode;
    $(theCell).delay(500).trigger('click'); // un-toggle control detail

    BootstrapDialog.show({
      title: action.title,
      message: requestAction4BootstrapDialog(action, dataKey) // GET method
    });
  });
}

function createInfoCellButtom(cellEle, dataKey, action) {
  if (/null(\||)/.test(dataKey)) {
    $(cellEle).addClass('disabled');
    return;
  }
  createEditCellButtom(cellEle, dataKey, action);
}

function renderDefaultAlterationCellWithId4DataTables(requestActions) {
  var actionsLen = Object.keys(requestActions).length;

  return { // visible: false, className: 'hidden',
    orderable: false,
    data: 'id',
    width: (actionsLen == 3 ? '76px' : actionsLen == 2 ? '52px' : '28px'),
    render: function(data, type, full) {
      return (requestActions.show ? '<span><i class="fa fa-fw fa-info"></i></span>&nbsp;' : '')
      + (requestActions.edit ? '<span><i class="fa fa-fw fa-pencil"></i></span>&nbsp;' : '')
      + (requestActions.delete ? '<span><i class="fa fa-fw fa-times"></i></span>' : '')
      + '<span style="display: inline;"></span>';
    },
    createdCell: function (cell, cellData, rowData, row, col) {
      if (requestActions.show) {
        var action = $.extend(true, {
          type: 'show',
          title: '資訊...',
          selector: 'span i.fa-info',
          key: 'id'
        }, requestActions.show);

        createInfoCellButtom( $(action.selector, cell), rowData[action.key], action );
      }
      if (requestActions.edit) {
        var action = $.extend(true, {
          type: 'edit',
          title: '編輯...',
          selector: 'span i.fa-pencil',
          key: 'id'
        }, requestActions.edit);

        createEditCellButtom( $(action.selector, cell), rowData[action.key], action );
      }
      if (requestActions.delete) {
        var action = $.extend(true, {
          type: 'delete',
          title: '刪除...',
          selector: 'span i.fa-times',
          key: 'id'
        }, requestActions.delete);

        createRemoveCellButtom( $(action.selector, cell), rowData[action.key], action );
      }
    }
  };
}

function initialized4DataTables(settings, response) {
  $.fn.dataTable.ext.errMode = 'none';
  var dataTable = settings.oInstance ? settings.oInstance.DataTable() : settings.DataTable();
  addExternalButtons4Init(dataTable);
  addQueryButtons4Init(settings);
  addSearchHighlight(dataTable);

  if (typeof response == 'undefined') {
    dataTable.clear().draw();
  } else {
    alertMessage(response, dataTable.context[0].jqXHR);
  }
  if (dataTable.context[0].ajax.onDone) { // settings.ajax.onDone
    dataTable.context[0].ajax.onDone();
  }
}

$.extend(true, $.fn.dataTable.defaults, {
  dom: 'Bftrpi',
  pageLength: 10,
  searching: false, //true
  // stateSave: true, // would cause 'sort' no work ?
  select: {
    info: false,
    style: 'single'
  },
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
    data: function(params, settings) {
      return {
        draw: params.draw,
        max: params.length,
        offset: params.start,
        sort: (params.order ? settings.aoColumns[params.order[0].column].data : 'id'),
        order: (params.order ? params.order[0].dir : 'asc')
      };
    }
  },
  drawCallback: function(settings) {
    if (settings.bFiltered) {
      var dtContainer = $(this.api().table().container());
      var filterInput = dtContainer.find('.dataTables_filter input');

      if (filterInput.val() !== '') {
        dtContainer.find('table td').highlight(filterInput.val());
      }
    }

    renderAjaxButtons4DataTables(settings.oInstance.DataTable());
  }
});

$.fn.dataTable.ext.errMode = function(settings, tn, errors) {
  if (typeof settings !== 'undefined' && settings !== null) {
    console.log(errors);

    var dataTable = settings.oInstance.DataTable();
    var jqXHR = dataTable.context[0].jqXHR;
    // var tableContainer = $(dataTable.table().container());

    if (typeof jqXHR !== undefined && jqXHR.status >= 400) {
      // WTF v1.10.10: set bDestroying to invoke _fnReDraw()
      settings.bDestroying = true;
      dataTable.clear().draw();
      delete settings['bDestroying'];

      if (jqXHR.status == 401) {
        disableProcessing4DataTables(settings);
        $('.dataTables_empty').html('<i class="fa fa-exclamation-triangle"></i>&nbsp;無作業權限');

      } else {
        initialized4DataTables(settings, {
          errors: jqXHR.statusText
        });
      }
    }
  }
};
