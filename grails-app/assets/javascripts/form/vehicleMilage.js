//* require ../grid
//= require_self

var vehicleMilageList;

function createCriterionListener() {
  if (serverParams2.embed) {
    $(window).on('criterionChanged', function(e) {
      serverParams2.projectId = e.state.projectId;
      serverParams2.dispatchedDate = e.state.workedDate;
      reloadDataTables(vehicleMilageList);
    });
  }
}

function getMilageParameters() {
  return {
    embed: serverParams2.embed,
    projectId: serverParams2.projectId,
    dispatchedDate: serverParams2.dispatchedDate.replace(/\//g, '-')
  }
}

function removeMilageRequested(result) {
  reloadDataTables(vehicleMilageList);
}

function modifyMilageRequested(result, editForm) {
  reloadDataTables(vehicleMilageList);
}

function addMilageRequested(result, editForm) {
  reloadDataTables(vehicleMilageList);
}

function addMilageRequest(evt, dt, node, config) {
  BootstrapDialog.show({
    title: '新增...',
    message: requestAction4BootstrapDialog({
      url: server.ctxPath + '/vehicleMilage/create',
      callback: addMilageRequested
    }, null, getMilageParameters())
  });
}

function prepareUrl(actionType) {
  return function() {
    return server.ctxPath + '/vehicleMilage/' + actionType + (serverParams2.embed ? '?' + $.param(getMilageParameters()) : '');
  }
}

function createMilageTable() {
  var dataCols = [ //0
    renderDefaultAlterationCellWithId4DataTables({
      edit: {
        url: prepareUrl('edit'),
        callback: modifyMilageRequested
      },
      delete: {
        title: '清除...',
        url: prepareUrl('delete'),
        callback: removeMilageRequested
      }
    }), { //1
      data: 'project'
    }, { //2
      render: renderDate4DataTables(),
      data: 'dispatchedDate'
    }, { //3
      data: 'vehicle'
    }, { //4
      orderable: false,
      data: 'km'
    }
  ];

  if (serverParams2.embed) {
    dataCols.splice(1, 2);
  }

  var dataSettings = {
    processing: true,
    serverSide: true,
    deferRender: true,
    ajax: {
      url: server.ctxPath + '/api/vehicleMilages.json',
      data: function(params, settings) {
        settings.ajax.fake = serverParams2.embed && !(serverParams2.projectId || false);
        return $.extend({}, $.fn.dataTable.defaults.ajax.data(params, settings), getMilageParameters());
      },
      onDone: function() {
        if (serverParams2.embed && !(serverParams2.projectId || false)) {
          vehicleMilageList.buttons().disable();
        }
      },
      onReloadClick: function(event) {
          return (!serverParams2.embed || serverParams2.projectId && true);
        }
        // ,onReloadClicked: function() {
        // }
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
      action: addMilageRequest
    }],
    columns: dataCols,
    order: [
        [1, 'asc']
      ] // prev: 'aaSorting'
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
    serverParams2.embed ? $.extend({
      dom: 'Bftri'
    }, dataSettings) : dataSettings
  ).buttons().disable();
}
