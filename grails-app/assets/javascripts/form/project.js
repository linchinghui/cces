//= require ../grid
//= require_self

var projectList;
var projectTypes;
var constructTypes;

function initializeConstrctTypes() {
  chainAjaxCall({
    url: server.ctxPath + '/api/projects.json',
    method: 'GET',
    cache: true,
    async: false,
    headers: {
      'X-CCES-ACTION': 'projectTypes'
    }

  }).chain(function(promise) {
    if (promise.rc == 1) {
      projectTypes = {
        'na': '(無法取得[工作型態]代碼)'
      }

    } else {
      projectTypes = promise.data;
    }

    return chainAjaxCall({
      url: server.ctxPath + '/api/projects.json',
      method: 'GET',
      cache: true,
      async: false,
      headers: {
        'X-CCES-ACTION': 'constructTypes'
      }
    });

  }).done(function(promise) {
    if (promise.rc == 1) {
      constructTypes = {
        'na': '(無法取得[施作方式]代碼)'
      }

    } else {
      constructTypes = promise.data;
    }
  });
}

function removeDataRequested(result) {
  reloadDataTables(projectList);
}

function modifyDataRequested(result, editForm) {
  reloadDataTables(projectList);
}

function addDataRequested(result, editForm) {
  reloadDataTables(projectList);
}

function addDataRequest(evt, dt, node, config) {
  BootstrapDialog.show({
    title: '新增...',
    message: requestAction4BootstrapDialog({
      url: server.ctxPath + '/project/create',
      callback: addDataRequested
    })
  });
}

function createDataTable() {
  projectList = $('#list-project').DataTable({
    processing: true,
    serverSide: true,
    deferRender: true,
    ajax: {
      url: server.ctxPath + '/api/projects.json'
    },
    initComplete: function(settings, data) { // this == DataTable()
      initialized4DataTables(settings, data);
      resizeDataTablesInSecs(settings.oInstance.DataTable());
    },
    extButtons: {
      copy: true
    },
    buttons: [{
      text: '新增',
      action: addDataRequest
    }],
    columns: [ //0
      renderDefaultAlterationCellWithId4DataTables({
        show: {
          url: server.ctxPath + '/project/show'
        },
        edit: {
          url: server.ctxPath + '/project/edit',
          callback: modifyDataRequested
        },
        delete: {
          url: server.ctxPath + '/project/delete',
          callback: removeDataRequested
        }
      }), { //1
        data: 'code'
      }, { //2
        orderable: false,
        data: 'description'
      }, { //3
        orderable: false,
        data: 'constructNo'
      }, { //4
        data: 'constructPlace'
      }, { //5
        render: function(data, type, row, meta) {
          return (data && (type === 'display' || type === 'filter')) ?
            (projectTypes.hasOwnProperty(data) ? projectTypes[data] : data + '(代碼未定義)') :
            data;
        },
        orderable: false,
        data: 'projectKind' // 'projectType'
      }, { //5
        render: function(data, type, row, meta) {
          return (data && (type === 'display' || type === 'filter')) ?
            (constructTypes.hasOwnProperty(data) ? constructTypes[data] : data + '(代碼未定義)') :
            data;
        },
        orderable: false,
        data: 'constructCode' // 'constructType'
      }, { //6
        render: renderDate4DataTables(),
        data: 'durationBegin'
      }, { //7
        orderable: false,
        render: renderDate4DataTables(),
        data: 'durationEnd'
      }, { //8
        orderable: false,
        data: 'contact'
      }, { //9
        data: 'customer'
      }, { //10
        orderable: false,
        data: 'contactPerson'
      }, { //11
        orderable: false,
        data: 'contactPhoneNo'
      }, { //12
        orderable: false,
        data: 'note'
      }
    ],
    order: [
        [1, 'asc']
      ] // prev: 'aaSorting'

  }).buttons().disable();
}
