//* require ../grid
//= require_self

var vehicleMilageList;

function createCriterionListener() {
  if (serverParams.embed) {
    $(window).on('criterionChanged', function(e) {
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
    dispatchedDate: serverParams.dispatchedDate.replace(/\//g, '-')
  }
}

function getQueryMilageString() {
  return (serverParams.embed ? '?' + $.param(getMilageParameters()) : '');
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
      url: contextPath + '/vehicleMilage/create',
      callback: addMilageRequested
    }, null, getMilageParameters())
  });
}

function prepareUrl(actionType) {
  return function() {
    return contextPath + '/vehicleMilage/' + actionType + getQueryString();
  }
}

function createMilageTable() {
  var qryStr = getQueryMilageString();

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

  if (serverParams.embed) {
    dataCols.splice(1, 2);
  }

  var dataSettings = {
    processing: true,
    serverSide: true,
    deferRender: true,
    ajax: {
      url: contextPath + '/api/vehicleMilages.json',
      data: function(params, settings) {
        settings.ajax.fake = serverParams.embed && !(serverParams.projectId || false);
        return $.extend({}, $.fn.dataTable.defaults.ajax.data(params, settings), getMilageParameters());
      },
      onDone: function() {
        if (serverParams.embed && !(serverParams.projectId || false)) {
          vehicleMilageList.buttons().disable();
        }
      },
      onReloadClick: function(event) {
          return (!serverParams.embed || serverParams.projectId && true);
        }
        // ,onReloadClicked: function() {
        // }
    },
    initComplete: function(settings, data) { // this == DataTable()
      initialized4DataTables(settings, data);
      resizeDataTablesInSecs(vehicleMilageList);
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
    serverParams.embed ? $.extend({
      dom: 'Bftri'
    }, dataSettings) : dataSettings
  ).buttons().disable();
}
