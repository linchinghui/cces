//* require ../grid
//= require_self

var mSupplierList;

function getSupplierParameters() {
  return {
    embed: serverParams.embed,
    materialId: serverParams.materialId
  }
}

function removeDetailDataRequested(result) {
  reloadDataTables(mSupplierList);
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
      url: contextPath + '/materialSupplier/create',
      callback: addDetailDataRequested
    }, null, getSupplierParameters())
  });
}

function prepareUrl(actionType) {
  return function() {
    return contextPath + '/materialSupplier/' + actionType + (serverParams.embed ? '?' + $.param(serverParams) : '');
  }
}

function renderDisplayHint4DataTables(settings, start, end, max, total, pre) {
  return serverParams.noEdit ? '' : '<span class="small pull-right text-danger">新增相同供應商＋廠牌的材料時，視為修改</span>';
}

function createDetailDataTable() {
  var dataCols = [ //0
    renderDefaultAlterationCellWithId4DataTables(serverParams.noEdit ? {} : {
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
        // If display or filter data is requested, format the date
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

  if (serverParams.embed) {
    dataCols.splice(1, 1);
  }

  var dataSettings = {
    processing: true,
    serverSide: true,
    deferRender: true,
    ajax: {
      url: contextPath + '/api/materialSuppliers.json',
      data: function(params, settings) {
        return $.extend({}, $.fn.dataTable.defaults.ajax.data(params, settings), getSupplierParameters());
      }
    },
    infoCallback: renderDisplayHint4DataTables,
    // initComplete: serverParams.embed ? null : function(settings, data) { // this == DataTable()
    initComplete: function(settings, data) { // this == DataTable()
      initialized4DataTables(settings, data);
      resizeDataTablesInSecs(mSupplierList);
    },
    extButtons: {
      copy: true
    },
    buttons: serverParams.noEdit ? [] : [{
      text: '新增',
      action: addDetailDataRequest
    }],
    columns: dataCols,
    order: [
        [1, 'asc']
      ] // prev: 'aaSorting'
  };

  mSupplierList = $('#list-materialSupplier').DataTable(
    serverParams.embed ? $.extend({
      dom: 'Bftri'
    }, dataSettings) : dataSettings
  ).buttons().disable();
}
