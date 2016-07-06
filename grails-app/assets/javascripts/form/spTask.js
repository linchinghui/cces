//= require ../grid
//= require_self

var assignProjectDiv = $('.assignProject');
var assignProjectList = $('<select/>');
var workedDate = $('#workedDate');
var workedDatePicker = $('.workedDate');
var spTaskDataTable;
var projectTypes;
var constructTypes;
var projectInfo;

function createTabs() {
  $('.content a[data-toggle="mtab"]').click(function(e) {
    e.preventDefault();
    var thisEle = $(this);
    var loadUrl = thisEle.attr('href');

    if (loadUrl.length > 0 && loadUrl !== '#') {
      $.ajax({
        type: 'GET',
        url: loadUrl,
        data: getLastParameters('dispatchedDate'),
        error: function(jqXHR, status, error) {
          $(thisEle.attr('data-target')).html(jqXHR.responseText);
        },
        success: function(response) {
          $(thisEle.attr('data-target')).html(response);
          thisEle.attr('href', '#');
          // triggerCriterionChange($(thisEle));
        }
      });
    } else {
      setTimeout(function() {
        $(window).resize();
      }, 500);
    }

    thisEle.tab('show');
    return false;
  });
}

function getLastParameters(dateParam) {
  var qryParams = {
    embed: true,
    projectId: assignProjectList.val(),
    format: 'json'
  }
  qryParams[(dateParam ? dateParam : 'workedDate')] = workedDate.val(); //.replace(/\//g,'-')

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
function removeDataRequested(result) {
  loadSpTasks();
}

function modifyDataRequested(result, editForm) {
  loadSpTasks();
}

function addDataRequested(result, editForm) {
  loadSpTasks();
}

function addDataRequest(evt, dt, node, config) {
  BootstrapDialog.show({
    title: '新增...',
    message: requestAction4BootstrapDialog({
      url: contextPath + '/spTask/create',
      callback: addDataRequested
    }, null, getLastParameters())
  });
}

function prepareUrl(actionType) {
  return function() {
    return contextPath + '/spTask/' + actionType + getQueryString();
  }
}

function renderDisplayHint4DataTables(settings, start, end, max, total, pre) {
  return '<span class="small pull-right text-danger">新增相同人員時，視為修改</span>';
}

function createDataTable() {
  $.ajax.fake.registerWebservice(contextPath + '/api/spTasks.json', function(req) {
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
      url: contextPath + '/api/spTasks.json',
      data: function(params, settings) {
        settings.ajax.fake = !(assignProjectList.val() || false);
        return $.extend({}, $.fn.dataTable.defaults.ajax.data(params, settings), getLastParameters());
      },
      onDone: function() {
        if (!(assignProjectList.val() || false)) {
          spTaskDataTable.buttons().disable();
        }
      },
      onReloadClick: function(event) {
          return (assignProjectList.val() && true);
        }
        // ,onReloadClicked: function() {
        // }
    },
    infoCallback: renderDisplayHint4DataTables,
    initComplete: function(settings, data) { // this == DataTable()
      initialized4DataTables(settings, data);
      resizeDataTablesInSecs(spTaskDataTable);
    },
    extButtons: {
      // copy: true
    },
    buttons: [{
      text: '新增',
      action: addDataRequest
    }],
    columns: [ //0
      renderDefaultAlterationCellWithId4DataTables({
        show: {
          url: prepareUrl('show')
        },
        edit: {
          url: prepareUrl('edit'),
          callback: modifyDataRequested
        },
        delete: {
          url: prepareUrl('delete'),
          callback: removeDataRequested
        }
      }), { //1
        orderable: false,
        data: 'constructPlace'
      }, { //2
        orderable: false,
        data: 'equipment'
      }, { //3
        orderable: false,
        data: 'employee'
      }, { //4
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
        render: function(data, type, row, meta) {
          return ((type === 'display' || type === 'filter') && /null(\||)/.test(row.id)) ?
            '<span class="text-danger text-bold">已派工,未登錄</span>' :
            data;
        },
        orderable: false,
        data: 'note'
      }
    ]
  }).buttons().disable();
}

/*-----------
  load data
 -----------*/
function loadProjectInfo(ele) {
  var projectInfo = $(
      '<span class="input-group-addon glyphicon glyphicon-info-sign"></span><span id="projectExists" class="sr-only"></span>'
    )
    .click(function() {
      var projectId = assignProjectList.val();

      if (projectId) {
        BootstrapDialog.show({
          title: '專案',
          message: requestAction4BootstrapDialog({
              url: contextPath + '/project/show'
            }, projectId) // GET method
        });
      }
    });

  ele.after(projectInfo);
}

function loadSpTasks() {
  if (spTaskDataTable) {
    reloadDataTables(spTaskDataTable, true);

  } else {
    createDataTable();
  }
}

function initializeSpTasks() {
  $.ajax.fake.defaults.wait = 0;
  loadSpTasks();
}
/*--------------------------------------------------------------------
  prepare worked-date picker, project select-options, construct-types
 ---------------------------------------------------------------------*/
function createProjectCombo(ele) {
  assignProjectList = assignProjectDiv.html(ele).combobox();
  var combo = assignProjectList.data('combobox');
  loadProjectInfo(combo.$element);

  if (server.projectId) {
    combo.$element.val($.map(combo.map, function(val, desc) {
      return val == server.projectId ? desc : null;
    }));
    combo.lookup().select();
  }

  assignProjectList.change(function(e) {
    loadSpTasks();
    triggerCriterionChange(assignProjectList);
  });
}

function createDatePicker() {
  workedDatePicker.data('DateTimePicker').date(
    server.workedDate ? moment(server.workedDate) : moment().transform('YYYY-MM-DD 00:00:00.000')
  );

  workedDatePicker.datetimepicker().on('dp.change', function(e) {
    loadSpTasks();
    triggerCriterionChange(workedDatePicker);
  });
}

function initializeSelectFields() {
  createDatePicker()

  chainAjaxCall({
    url: contextPath + '/api/projects.json',
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
      url: contextPath + '/api/projects.json',
      method: 'GET',
      cache: true,
      async: false,
      headers: {
        'X-CCES-ACTION': 'constructTypes'
      }
    });

  }).chain(function(promise) {
    if (promise.rc == 1) {
      constructTypes = {
        'na': '(無法取得[施作方式]代碼)'
      }

    } else {
      constructTypes = promise.data;
    }

    return chainAjaxCall({
      url: contextPath + '/project',
      method: 'GET',
      async: false,
      headers: {
        'X-CCES-ACTION': 'brief'
      }
    });

  }).done(function(promise) {
    if (promise.rc == 1) {
      assignProjectDiv.addClass('has-error').html($('<label class="control-label"/>').html('(無法取得專案清單)'));

    } else {
      createProjectCombo($(promise.data))
      createTabs();
    }
  });
}
