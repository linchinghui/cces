//* require ../grid
//= require_self

var privilegeList;

function removeDetailDataRequested (result) {
  reloadDataTables(privilegeList);
}

function modifyDetailDataRequested (result, editForm) {
  reloadDataTables(privilegeList);
}

function addDetailDataRequested (result, editForm) {
  reloadDataTables(privilegeList);
}

function addDetailDataRequest (evt, dt, node, config) {
  BootstrapDialog.show({
    title: '新增...',
    message: requestAction4BootstrapDialog({
      url: '/privilege/create',
      callback: addDetailDataRequested
    })
  }, null, $.param(serverParams));
}

function prepareUrl(actionType) {
  return function() {
    return '/privilege/' + actionType + (serverParams.embed ? '?' + $.param(serverParams) : '');
  }
}

function createDetailDataTable() {
  var qryStr = serverParams.embed ? '?' + $.param(serverParams) : '';
  var dataCols = [ //0
      renderDefaultAlterationCellWithId4DataTables({
        edit: {
          url: prepareUrl('edit'),
          callback: modifyDetailDataRequested
        }
        ,delete:  {
          title: '清除...',
          url: prepareUrl('delete'),
          callback: removeDetailDataRequested
        }
      })
    ];

  if (! serverParams.embed) {
    dataCols.push(
      { //1
        data: 'role'
      });
  }

  dataCols.push(
    { //2
      orderable: false,
      data: 'function'
    },{ //3
      render: renderCheck4DataTables,
      orderable: false,
      data: 'canRead'
    },{ //4
      render: renderCheck4DataTables,
      orderable: false,
      data: 'canWrite'
    },{ //5
      render: renderCheck4DataTables,
      orderable: false,
      data: 'canDelete'
    });

  var dataSettings = {
      processing: true,
      serverSide: true,
      deferRender: true,
      ajax: {
        url: '/api/privileges.json',
        data: function(params, settings) {
          return $.extend({
              draw: params.draw,
              max: params.length,
              offset: params.start,
              sort: (params.order ? settings.aoColumns[params.order[0].column].data : 'id'),
              order: (params.order ? params.order[0].dir : 'asc')
            }, serverParams );
        }
      },
      initComplete: serverParams.embed ? null : function (settings, data) { // this == DataTable()
        initialized4DataTables(this, settings, data);
      },
      extButtons: {
        copy: true
      },
      columns: dataCols,
      order: [[1,'asc']] // prev: 'aaSorting'
    };

  privilegeList = $('#list-privilege').DataTable(
    $.extend({}, serverParams.embed ? {
          dom: 'Bftri',
          pageLength: 100,
          scrollY: true,
          buttons: []
        } : {
          buttons: [{
            text: '新增', action: addDetailDataRequest
          }]
        }, dataSettings)
    ).buttons().disable();
}
