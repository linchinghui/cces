//* require ../grid
//= require_self

var privilegeList;

function removeDetailDataRequested (result) {
  reloadDataTables(privilegeList);
}

function modifyDetailDataRequested (result, editForm) {
  reloadDataTables(privilegeList);
}

function createDetailDataTable() {
  var qryStr = serverParams.embedPage ? '?embed=true&roleId=' + serverParams.roleId : '';

  var dataCols = [ //0
      renderDefaultAlterationCellWithId4DataTables({
        edit: {
          url: '/privilege/edit'+qryStr,
          callback: modifyDetailDataRequested
        }
        ,delete:  {
          title: '清除...',
          url: '/privilege/delete'+qryStr,
          callback: removeDetailDataRequested
        }
      })
    ];

  if (! serverParams.embedPage) {
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
          return $.extend({}, 
            serverParams.embedPage ? {
              draw: params.draw,
              embed: true,
              roleId: serverParams.roleId
            } : {
              draw: params.draw,
              max: params.length,
              offset: params.start
            }, {
              sort: settings.aoColumns[params.order[0].column].data,
              order: params.order[0].dir
            });
        }
      },

      initComplete: serverParams.embedPage ? null : function (settings, data) { // this == DataTable()
        initialized4DataTables(this, settings, data);
      },

      extButtons: {
        copy: true
      },
      buttons: [
        //{text: '新增', action: addDetailDataRequest}
      ],
      columns: dataCols
    };

  privilegeList = $('#list-privilege').DataTable(
    serverParams.embedPage ? $.extend({}, {
          dom: 'Bftri',
          pageLength: 100,
          scrollY: true
        }, dataSettings)
      : dataSettings
    ).buttons().disable();
}
