//* require ../grid
//= require_self

var vehicleMilageList;

function removeMilageRequested (result) {
  reloadDataTables(vehicleMilageList);
}

function modifyMilageRequested (result, editForm) {
  reloadDataTables(vehicleMilageList);
}

function createMilageTable() {
  var qryStr = serverParams.embed ? '?' + $.param(serverParams) : '';
  var dataCols = [ //0
      renderDefaultAlterationCellWithId4DataTables({
        edit: {
          url: '/vehicleMilage/edit'+qryStr,
          callback: modifyMilageRequested
        }
        ,delete:  {
          title: '清除...',
          url: '/vehicleMilage/delete'+qryStr,
          callback: removeMilageRequested
        }
      })
    ];

  if (! serverParams.embedPage) {
    dataCols.push(
      { //1
        data: 'project'
      });
    dataCols.push(
      { //2
        render: renderDate4DataTables(),
        data: 'dispatchedDate'
      });
  }

  dataCols.push(
    { //3
      data: 'vehicle'
    },{ //4
      orderable: false,
      data: 'km'
    });

  var dataSettings = {
      processing: true,
      serverSide: true,
      deferRender: true,
      ajax: {
        url: '/api/vehicleMilages.json',
        data: function(params, settings) {
          return $.extend({
              draw: params.draw,
              sort: settings.aoColumns[params.order[0].column].data,
              order: params.order[0].dir
            }, 
            serverParams.embed ? serverParams : {
              max: params.length,
              offset: params.start
            });
        }
      },

      initComplete: function (settings, data) { // this == DataTable()
        initialized4DataTables(this, settings, data);
      },

      extButtons: {
        copy: true
      },
      buttons: [
        // {text: '新增', action: addMilageRequest}
      ],
      columns: dataCols
      ,order: [[1,'asc']] // prev: 'aaSorting'
    };

  vehicleMilageList = $('#list-vehicleMilage').DataTable(
    serverParams.embed ? $.extend({}, {
          dom: 'Bftri',
          pageLength: 100,
          scrollY: true
        }, dataSettings)
      : dataSettings
    ).buttons().disable();
}
