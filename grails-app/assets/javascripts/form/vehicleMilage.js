//* require ../grid
//= require_self

var vehicleMilageList;

function createCriterionListener() {
  if (serverParams.embed) {
    $(window).on('criterionChanged', function (e) {
      serverParams.projectId = e.state.projectId;
      serverParams.dispatchedDate = e.state.workedDate;
      reloadDataTables(vehicleMilageList);
    });
  }
}

function getMilageParameters() {
  return {
    embed: serverParams.embed,
    projectId: serverParams.projectId,
    dispatchedDate: serverParams.dispatchedDate.replace('/','-')
  }
}

function getQueryString() {
  return (serverParams.embed ? '?' + $.param(getMilageParameters()) : '');
}

function removeMilageRequested (result) {
  reloadDataTables(vehicleMilageList);
}

function modifyMilageRequested (result, editForm) {
  reloadDataTables(vehicleMilageList);
}

function addMilageRequested (result, editForm) {
  reloadDataTables(vehicleMilageList);
}

function addMilageRequest (evt, dt, node, config) {
  BootstrapDialog.show({
    title: '新增...',
    message: requestAction4BootstrapDialog({
      url: '/vehicleMilage/create' + getQueryString(),
      callback: addMilageRequested
    })
  });
}

function createMilageTable() {
  var qryStr = getQueryString();

  var dataCols = [ //0
      renderDefaultAlterationCellWithId4DataTables({
        edit: {
          url: '/vehicleMilage/edit' + qryStr,
          callback: modifyMilageRequested
        }
        ,delete:  {
          title: '清除...',
          url: '/vehicleMilage/delete' + qryStr,
          callback: removeMilageRequested
        }
      })
    ];

  if (! serverParams.embed) {
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
          settings.ajax.fake = serverParams.embed && ! (serverParams.projectId || false);

          return $.extend({
              draw: params.draw,
              max: params.length,
              offset: params.start,
              sort: (params.order ? settings.aoColumns[params.order[0].column].data : 'id'),
              order: (params.order ? params.order[0].dir : 'asc')
            }, getMilageParameters() );
        },
        onDone: function() {
          if (serverParams.embed && ! (serverParams.projectId || false)) {
            vehicleMilageList.buttons().disable();
          }
        },
        onReloadClick: function(event) {
          return (! serverParams.embed || serverParams.projectId && true);
        }
        // ,onReloadClicked: function() {
        // }
      },
      initComplete: function (settings, data) { // this == DataTable()
        initialized4DataTables(this, settings, data);
        $(window).resize(function() {
          vehicleMilageList.columns.adjust().responsive.recalc();
        });
        // TODO
        setTimeout(function(){ $(window).resize(); }, 500);
      },
      extButtons: {
        copy: true
      },
      buttons: [
        {text: '新增', action: addMilageRequest}
      ],
      columns: dataCols,
      order: [[1,'asc']] // prev: 'aaSorting'
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
    serverParams.embed ? $.extend({}, {
          dom: 'Bftri',
          pageLength: 100,
          scrollY: true
        }, dataSettings)
      : dataSettings
    ).buttons().disable();
}
