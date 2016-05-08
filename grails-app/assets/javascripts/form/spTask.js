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
        data: getLastParameters('dispatchedDate'),
        error: function(jqXHR, status, error) {
          $(thisEle.attr('data-target')).html(jqXHR.responseText);
        },
        success: function(response){
          $(thisEle.attr('data-target')).html(response);
          thisEle.attr('href','#');
          // triggerCriterionChange($(thisEle));
        }
      });
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
      url: '/spTask/create',
      callback: addDataRequested
    }, null, getLastParameters())
  });
}

function prepareUrl(actionType) {
  return function() {
    return '/spTask/' + actionType + getQueryString();
  }
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
            // max: params.length,
            // offset: params.start,
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
      initialized4DataTables(settings, data);
      $(window).resize(function() {
        spTaskDataTable.columns.adjust().responsive.recalc();
      });
      // TODO
      setTimeout(function(){ $(window).resize(); }, 500);
    },
    extButtons: {
      // copy: true
    },
    buttons: [
      {text: '新增', action: addDataRequest}
    ],
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
      render: function(data, type, row, meta) {
        return ((type === 'display' || type === 'filter') && /null(\||)/.test(row.id)) ?
          '<span class="text-danger text-bold">已派工,未登錄</span>' :
          data;
      },
      orderable: false,
      data: 'note'
    }]
  }).buttons().disable();
}

/*-----------
  load data
 -----------*/
function loadProjectInfo(ele) {
  var projectInfo= $('<span class="input-group-addon glyphicon glyphicon-info-sign"></span><span id="projectExists" class="sr-only"></span>')
    .click(function() {
      var projectId = assignProjectList.val();

      if (projectId) {
        BootstrapDialog.show({
          title: '專案',
          message: requestAction4BootstrapDialog({url:'/project/show'}, projectId) // GET method
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

function initializeSpTasks () {
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

  if (server.project) {
    combo.$element.val( $.map( combo.map, function(val, desc) { return val == server.project ? desc : null; }));
    combo.lookup().select();
  }

  assignProjectList.change(function (e) {
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
