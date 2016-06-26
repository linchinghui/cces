//* require ../grid
//= require_self

var privilegeList;

function removeDetailDataRequested(result) {
  reloadDataTables(privilegeList);
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
      url: contextPath + '/privilege/create',
      callback: addDetailDataRequested
    })
  }, null, $.param(serverParams));
}

function prepareUrl(actionType) {
  return function() {
    return contextPath + '/privilege/' + actionType + (serverParams.embed ? '?' + $.param(serverParams) : '');
  }
}

function createDetailDataTable() {
  var qryStr = serverParams.embed ? '?' + $.param(serverParams) : '';
  var dataCols = [ //0
    renderDefaultAlterationCellWithId4DataTables({
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

  if (serverParams.embed) {
    dataCols.splice(1, 1);
  }

  var dataSettings = {
    processing: true,
    serverSide: true,
    deferRender: true,
    ajax: {
      url: contextPath + '/api/privileges.json',
      data: function(params, settings) {
        return $.extend(serverParams, $.fn.dataTable.defaults.ajax.data(params, settings));
      }
    },
    initComplete: serverParams.embed ? null : function(settings, data) { // this == DataTable()
      initialized4DataTables(settings, data);
      resizeDataTablesInSecs(privilegeList);
    },
    extButtons: {
      copy: true
    },
    columns: dataCols,
    order: [
        [1, 'asc']
      ] // prev: 'aaSorting'
  };

  privilegeList = $('#list-privilege').DataTable(
    $.extend({}, serverParams.embed ? {
      dom: 'Bftri',
      pageLength: 100,
      scrollY: true,
      buttons: []
    } : {
      buttons: [{
        text: '新增',
        action: addDetailDataRequest
      }]
    }, dataSettings)
  ).buttons().disable();
}
