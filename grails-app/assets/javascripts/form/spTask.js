//= require ../grid
//= require_self

var assignProjectDiv = $('.assignProject');
var assignProjectList = $('<select/>');
var workedDate = $('#workedDate');
var workedDatePicker = $('.workedDate');
var spTaskDataTable;
var constructTypes;
var projectInfo;

function createTabs() {
  $('.content a[data-toggle="mtab"]').click(function (e) {
    e.preventDefault();
    var thisEle = $(this);
    var loadUrl = thisEle.attr('href');
    
    if (loadUrl.length > 0 && loadUrl !== '#') {
      $.ajax({
        type: 'GET',
        url: loadUrl,
        data: getLastParameters(),
        error: function(jqXHR, status, error) {
          $(thisEle.attr('data-target')).html(jqXHR.responseText);
        },
        success: function(response,x,y){
          $(thisEle.attr('data-target')).html(response);
          thisEle.attr('href','#');
          triggerCriterionChange($(thisEle));
        }
      });
    }

    thisEle.tab('show');
    return false;
  });
}

function getLastParameters() {
  var qryParams = {
      projectId: assignProjectList.val(),
      workedDate: workedDate.val(), // .replace(/\//g,'-'),
      format: 'json'
    }

  return qryParams;
}

function getQueryString() {
  return ('?' + $.param(getLastParameters()));
}

function triggerCriterionChange(target) {
  var evt = $.Event('criterionChanged');
  evt.state = getLastParameters();
  target.trigger(evt);
}

/*---------------
  DataTables
 ----------------*/
function removeDataRequested (result) {
  loadSpTasks();
}

function modifyDataRequested (result, editForm) {
  loadSpTasks();
}

function addDataRequested (result, editForm) {
  loadSpTasks();
}

function addDataRequest (evt, dt, node, config) {
  BootstrapDialog.show({
    title: '新增...',
    message: requestAction4BootstrapDialog({
      url: '/spTask/create', // method 1: + getQueryString(),
      callback: addDataRequested
      // or method 2:
    }, null, getLastParameters())
  });
}

function createDataTable() {
  $.ajax.fake.registerWebservice('/api/spTasks.json', function(req) {
    // empty DT data
    return {
      draw: req.draw,
      recordsTotal: 0,
      recordsFiltered: 0,
      data: []
    };
  });

  spTaskDataTable = $('#list-spTask').DataTable({
    // dom: 'B<"pull-right"i>ftrp',
    processing: true,
    serverSide: true,
    deferRender: true,
    ajax: {
      url: '/api/spTasks.json',
      data: function(params, settings) {
        settings.ajax.fake = ! (assignProjectList.val() || false);

        return $.extend({
            draw: params.draw,
            max: params.length,
            offset: params.start,
            sort: (params.order ? settings.aoColumns[params.order[0].column].data : 'id'),
            order: (params.order ? params.order[0].dir : 'asc')
          }, getLastParameters() );
      },
      onDone: function() {
        if (! (assignProjectList.val() || false)) {
          spTaskDataTable.buttons().disable();
        }
      },
      onReloadClick: function(event) {
        return (assignProjectList.val() && true);
      }
      // ,onReloadClicked: function() {
      // }
    },
    initComplete: function (settings, data) { // this == DataTable()
      initialized4DataTables(this, settings, data);
    },
    extButtons: {
      // copy: true
    },
    buttons: [
      {text: '新增', action: addDataRequest}
    ],
    columns: [ //0
      renderDefaultAlterationCellWithId4DataTables({
        edit: {
          url: '/spTask/edit',
          callback: modifyDataRequested
        }
        ,delete:  {
          url: '/spTask/delete',
          callback: removeDataRequested
        }
      })
    ,{ //1
      orderable: false,
      data: 'constructPlace'
    },{ //2
      orderable: false,
      data: 'equipment'
    },{ //3
      orderable: false,
      data: 'employee'
    },{ //4
      render: function(data, type, row, meta) {
        return (data && (type === 'display' || type === 'filter')) ?
          (constructTypes.hasOwnProperty(data) ? constructTypes[data] : data+'(代碼未定義)') :
          data;
      },
      orderable: false,
      data: 'constructCode' // 'constructType'
    },{ //5
      orderable: false,
      data: 'note'
    }]
  }).buttons().disable();
}

/*-----------
  load data
 -----------*/
function loadProjectInfo() {
  var projectId = assignProjectList.val();
  if (projectId) {
    chainAjaxCall( {
      url: '/api/projects/' + projectId + '.json',
      method: 'GET',
      async: false,

    }).done(function (promise) {
      if (promise.rc == 1) {
        projectInfo = {'na': '(無法取得專案資訊)'}

      } else {
        projectInfo = promise.data;
      }
    });

  } else{
    projectInfo = null;
  }
}

function loadSpTasks() {
  if (spTaskDataTable) {
    reloadDataTables(spTaskDataTable, true);

  } else {
    createDataTable();
  }
}

function initializeSpTasks () {
  $.ajax.fake.defaults.wait = 0;
  loadSpTasks();
}
/*--------------------------------------------------------------------
  prepare worked-date picker, project select-options, construct-types
 ---------------------------------------------------------------------*/
function createProjectCombo(ele) {
  assignProjectList = assignProjectDiv.html(ele).combobox();

  if (server.project) {
    var combo = assignProjectList.data('combobox');

    combo.$element.val( $.map( combo.map,
      function(val, desc) {
        return val == server.project ? desc : null;
      }));
    combo.lookup().select();

    loadProjectInfo();
  }

  assignProjectList.change(function (e) {
    loadProjectInfo();
    loadSpTasks();
    triggerCriterionChange(assignProjectList);
  });
}

function createDatePicker() {
  workedDatePicker.data('DateTimePicker').date(
    server.workedDate ? moment(server.workedDate) : moment().transform('YYYY-MM-DD 00:00:00.000')
  );

  workedDatePicker.datetimepicker().on('dp.change', function (e) {
    loadSpTasks();
    triggerCriterionChange(workedDatePicker);
  });
}

function initializeSelectFields() {
  createDatePicker()

  chainAjaxCall({
    url: '/api/projects.json',
    method: 'GET',
    async: false,
    headers: {
      'X-CCES-ACTION': 'constructTypes'
    }

  }).chain(function (promise) {
    if (promise.rc == 1) {
      constructTypes = {'na': '(無法取得[施作方式]代碼)'}

    } else {
      constructTypes = promise.data;
    }

    return chainAjaxCall({ 
        url: '/project',
        method: 'GET',
        async: false,
        headers: {
          'X-CCES-ACTION': 'brief'
        }
      });

  }).done(function (promise) {
    if (promise.rc == 1) {
      assignProjectDiv.addClass('has-error').html($('<label class="control-label"/>').html('(無法取得專案清單)'));

    } else {
      createProjectCombo($(promise.data))
      createTabs();
    }
  });
}