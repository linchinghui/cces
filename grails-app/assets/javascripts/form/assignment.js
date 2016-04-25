//= require ../grid
//= require ../calendar
//= require_self

var assignProjectDiv = $('.assignProject');
var assignProjectList = $('<select/>');
var assignCLNDRDiv = $('.assignWeek');
var assignCLNDR;
var assignCLNDRTemplate;
var assignDataTableDiv = $('#list-assignment');
var assignDataTable;

var lastYear;
var lastWeek;
var lastDate;
var lastDateAssigned;
var lastDateClass;
var highLightClass = 'bg-info text-danger';

function getLastParameters() {
  var qryParams = {
      projectId: assignProjectList.val(),
      year: lastYear,
      week: lastWeek,
      format: 'json'
    }

  if (lastDateAssigned) { // && lastDate >= moment().transform('YYYY-MM-DD 00:00:00.000')) {
    qryParams['d' + lastDate.day()] = true;
  }

  return qryParams;
}
/*---------------
  DataTables
 ----------------*/
function removeDataRequested (result) {
  lastDateClass = null;
  loadAssignments();
}

function modifyDataRequested (result, editForm) {
  loadAssignments();
}

function addDataRequested (result, editForm) {
  loadAssignments();
}

function addDataRequest (evt, dt, node, config) {
  BootstrapDialog.show({
    title: '新增...',
    message: requestAction4BootstrapDialog({
      url: '/assignment/create',
      callback: addDataRequested
    }, null, getLastParameters())
  });
}

function createDataTable() {
  $.ajax.fake.registerWebservice('/api/assignments.json', function(req) {
    // empty DT data
    return {
      draw: req.draw,
      recordsTotal: 0,
      recordsFiltered: 0,
      data: []
    };
  });

  assignDataTable = assignDataTableDiv.DataTable({
    dom: 'B<"pull-right"i>ftrp',
    processing: true,
    serverSide: true,
    deferRender: true,
    ajax: {
      url: '/api/assignments.json',
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
          assignDataTable.buttons().disable();
        }
      },
      onReloadClick: function(event) {
        return (assignProjectList.val() && true);
      }
      // ,onReloadClicked: function() {
      // }
    },
    infoCallback: function (settings, start, end, max, total, pre) {
      return lastDate ? '過濾條件: 週'+ assignCLNDR.daysOfTheWeek[ lastDate.day() ] : '';
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
          url: '/assignment/edit',
          callback: modifyDataRequested
        }
        ,delete:  {
          url: '/assignment/delete',
          callback: removeDataRequested
        }
      })
    ,{ //1
      data: 'employee'
    // },{ //2
    //   data: 'project'
    },{ //3
      render: renderCheck4DataTables,
      orderable: false,
      data: 'd0'
    },{ //4
      render: renderCheck4DataTables,
      orderable: false,
      data: 'd1'
    },{ //5
      render: renderCheck4DataTables,
      orderable: false,
      data: 'd2'
    },{ //6
      render: renderCheck4DataTables,
      orderable: false,
      data: 'd3'
    },{ //7
      render: renderCheck4DataTables,
      orderable: false,
      data: 'd4'
    },{ //8
      render: renderCheck4DataTables,
      orderable: false,
      data: 'd5'
    },{ //9
      render: renderCheck4DataTables,
      orderable: false,
      data: 'd6'
    }],
    order: [[1,'asc']] // prev: 'aaSorting'
  }).buttons().disable();
}
/*---------------
  CLNDR
 ----------------*/
function highLightFocusDate() {
  // var dtHead = $('div[class="dataTables_scrollHead"] tr');
  // dtHead.find('th[class*="'+ highLightClass +'"]').attr('class',null);
  // var dtBody = $('div[class="dataTables_scrollBody"] tr.child');
  // dtBody.find('span[class*="'+ highLightClass +'"]').removeClass(highLightClass);
  
  var dtInfo = $('#list-assignment_info');
  dtInfo.addClass('text-hide'); //.removeClass(highLightClass);

  if (lastDateClass) {
    $(lastDateClass).removeClass('selected');

  } else {
    lastDateAssigned = false;
  }

  // determine focus or not
  if (lastDate) {
    var currDateClass = '.calendar-day-' + lastDate.format('YYYY-MM-DD');

    if (currDateClass == lastDateClass && lastDateAssigned) {
      lastDateAssigned = false;

    } else {
      // dtHead.find('th:contains("'+ assignCLNDR.daysOfTheWeek[ lastDate.day() ] +'")').addClass(highLightClass);
      // dtBody.find('span[class*="dtr-title"]:contains("'+ assignCLNDR.daysOfTheWeek[ lastDate.day() ] +'")').addClass(highLightClass);

      lastDateClass = currDateClass;
      $(lastDateClass).addClass('selected');
      dtInfo.removeClass('text-hide'); //.addClass(highLightClass);
      lastDateAssigned = true;
    }
  }
}

function buildAssignCalendar (assignData) {
  $(document).keydown( function(e) {
    if (assignCLNDR && e.keyCode == 37) assignCLNDR.back(); // Left arrow
    if (assignCLNDR && e.keyCode == 39) assignCLNDR.forward(); // Right arrow
  });

  assignCLNDR = assignCLNDRDiv.clndr({
    targets: {nextButton: 'week-next', todayButton: 'week-current', previousButton: 'week-previous'},
    lengthOfTime: {days: 7, interval: 7},
    events: assignData,
    template: assignCLNDRTemplate,

    clickEvents: {
      click: function (target) {
        lastDate = target.date;
        lastYear = lastDate.weekYear();
        lastWeek = lastDate.week();
        loadAssignments();
      },
      onIntervalChange: function (sunday, saturday) {
        lastDateAssigned = false;
        lastDate = null;
        lastYear = sunday.weekYear();
        lastWeek = sunday.week();
        loadAssignments();
      }
    }
  });
}
/*----------------------------------
  loading assignments and sumup
 -----------------------------------*/
function loadAssignments () {
  $.ajax.fake.registerWebservice('/api/assignments', function(req) {
    // events data
    return [];
  });

  chainAjaxCall({
    fake: ! (assignProjectList.val() || false),
    url: '/api/assignments',
    method: 'GET',
    cache: false,
    // async: false,
    headers: {
      'X-CCES-ACTION': 'sumup'
    },
    data: getLastParameters()

  }).done(function (promise) {
    if (assignCLNDRDiv.hasClass('has-error') || promise.rc == 1) { // got errors
      return;
    }

    if (assignCLNDR) {
      assignCLNDR.setEvents(promise.data);
      
    } else {
      buildAssignCalendar(promise.data);
    }

    highLightFocusDate();

    if (assignDataTable) {
      reloadDataTables(assignDataTable, true);

    } else {
      createDataTable();
    }
  });
}
/*----------------------------------------
  default value by server-side parameters
 -----------------------------------------*/
function initializeAssignments () {
  $.ajax.fake.defaults.wait = 0;

  var now = moment();
  lastYear = server.year ? server.year : now.weekYear();
  lastWeek = server.week ? server.week : now.week();
  loadAssignments();
}
/*---------------------------------------------------------------------
  prepare CLNDR from template and ComboBox with project select-options
 ----------------------------------------------------------------------*/
function initializeSelectFields () {
  chainAjaxCall({
    url: server.calendarTemplate,
    method: 'GET',
    // cache: false,
    async: false

  }).chain(function (promise) {
    if (promise.rc == 1) {
      assignCLNDRDiv.addClass('has-error').html($('<label class="control-label"/>').html('(無法取得['+server.pageTitle+']週曆程式)'));

    } else {
      assignCLNDRTemplate = promise.data;
    }

    return chainAjaxCall({ 
        url: '/project',
        method: 'GET',
        cache: false,
        async: false,
        headers: {
          'X-CCES-ACTION': 'brief'
        }
      });

  }).done(function (promise) {
    if (promise.rc == 1) {
      assignProjectDiv.addClass('has-error').html($('<label class="control-label"/>').html('(無法取得專案清單)'));

    } else {
      assignProjectList = assignProjectDiv.html($(promise.data)).combobox();

      if (server.project) {
        var combo = assignProjectList.data('combobox');
        combo.$element.val($.map(combo.map, function(val, desc) { return val == server.project ? desc : null; }));
        combo.lookup().select();
      }

      assignProjectList.change(function (e) {
        loadAssignments();
      });
    }
  });
}
