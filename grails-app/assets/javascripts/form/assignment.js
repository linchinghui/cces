//= require ../grid
//= require ../calendar
//= require_self

var assignProject = $('.assignProject');
var projectBriefList = $('<select/>'); //.append('<option/>'); // []
var assignCLNDR;
var assignTemplate;
var assignWeek = $('.assignWeek');
var lastAssignDay;
var lastAssignWeek;
var assignList;
//var detailSec = $('.detail');

// <%-- //暫無刪除功能
// function removeDataRequested (result) {
//   assignList.ajax.reload(null, false);
//   detailSec.empty();
// }
// --%>
function modifyDataRequested (result, editForm) {
  assignList.ajax.reload(null, false);
//  detailSec.empty();
}
// <%-- //暫無新增功能
// function addDataRequested (result, editForm) {
//   assignList.ajax.reload(null, false);
//   detailSec.empty();
// }

// function addDataRequest (evt, dt, node, config) {
//   BootstrapDialog.show({
//     title: '新增...',
//     message: requestAction4BootstrapDialog({
//       url: '/assignment/create',
//       callback: addDataRequested
//     })
//   });
// }
// --%>

function setupArrowKeys () {
  $(document).keydown( function(e) { // Bind all clndrs to the left and right arrow keys
    if (typeof assignCLNDR !== 'undefined') {
      if (e.keyCode == 37) { // Left arrow
        assignCLNDR.back();
      }
      if (e.keyCode == 39) { // Right arrow
        assignCLNDR.forward();
      }
    }
  });
}

function focusAssignDay(pickDate, isClick) {
  if (typeof pickDate == 'undefined') {
    pickDate = moment();
  }
  // if (typeof lastAssignDay !== 'undefined') {
  //   lastAssignDay.removeClass('selected');
  // }
  // if (typeof isClick !== 'undefined') {
  //   lastAssignDay = $(isClick);
  //   lastAssignWeek = pickDate.format('YYYY-w');
  // }
  // if (pickDate.format('YYYY-w') == lastAssignWeek) {
  //   lastAssignDay.addClass('selected');
  // }
  if (typeof lastAssignDay !== 'undefined') {
    $(lastAssignDay).removeClass('selected');
  }
  if (isClick == true) {
    var currAssignDay = '.calendar-day-'+pickDate.format('YYYY-MM-DD');
    lastAssignDay = currAssignDay;
    lastAssignWeek = pickDate.format('YYYY-w');
  }
  if (pickDate.format('YYYY-w') == lastAssignWeek) {
    $(lastAssignDay).addClass('selected');
  }
}

function buildAssignCalendar (assignData) {
  assignCLNDR = assignWeek.clndr({
    targets: {nextButton: 'week-next', todayButton: 'week-current', previousButton: 'week-previous'},
    lengthOfTime: {days: 7, interval: 7},
    events: assignData,
    template: assignTemplate,
    clickEvents: {
      click: function (target) {
        focusAssignDay(target.date, true);//target.element);
      },
      nextInterval: function (m) {
        console.log(m);
      },
      previousInterval: function (m) {
        console.log(m);
      },
      onIntervalChange: function (m) {
        focusAssignDay(m);
      }
    }
  });

  focusAssignDay(lastAssignWeek, true);//'.assignWeek .days-of-the-week .day.today');
}

function loadAssignments (year, week, project) {
  var theYear = year || server.year || moment().format('YYYY');
  var theWeek = week || server.week || moment().week();
  var theProject = project || server.project || projectBriefList.val(); //[0];

  // $.when(
  //   (typeof theProject == 'undefined' ? [] :
  //     $.ajax({
  //       url: '/api/assignments',
  //       method: 'GET',
  //       // async: false,
  //       headers: {
  //         'X-CCES-ACTION': 'sumUp'
  //       },
  //       data: {
  //         project: theProject,
  //         year: theYear,
  //         week: theWeek,
  //         format: 'json'
  //       }
  //     })
  //   )
  // ).then(
  //   function (resp) {
  //     if (! assignWeek.hasClass('has-error')) {
  //       assignWeek.empty();
  //       buildAssignCalendar(resp);
  //     }
  //   },
  //   transformServerError()
  // );

  (typeof theProject == 'undefined' || theProject == '' ?

    chainPassCall({rc: 0, data: []}) :

    chainAjaxCall({
      url: '/api/assignments',
      method: 'GET',
      cache: false,
      // async: false,
      headers: {
        'X-CCES-ACTION': 'sumup'
      },
      data: {
        project: theProject,
        year: theYear,
        week: theWeek,
        format: 'json'
      }
    })

  ).done(function (promise) {
    if (! assignWeek.hasClass('has-error')) {
      assignWeek.empty();
      buildAssignCalendar(promise.data);
    }
  });
}

function initializeAssignment () {
  chainAjaxCall(
    {
      url: server.calendarTemplate,
      method: 'GET',
      // cache: false,
      async: false
    }

  ).chain(function (promise) {
    // log(promise);
    if (promise.rc == 1) {
      // if ($.isEmptyObject(assignTemplate)) {
        assignWeek.addClass('has-error').html($('<label class="control-label"/>').html('(無法取得['+server.pageTitle+']週曆程式)'));
      // }
    } else {
      assignTemplate = promise.data;
    }

    return chainAjaxCall(
        {
          // url: '/api/projects',
          url: '/project',
          method: 'GET',
          cache: false,
          async: false,
          headers: {
            'X-CCES-ACTION': 'brief'
          }
          // ,data: {
          //   format: 'json'
          // }
        }
      );

  }).done(function (promise) {
    // log(promise);
    if (promise.rc == 1) {
      // if (projectBriefList.has('option').length == 0) {
        assignProject.addClass('has-error').html($('<label class="control-label"/>').html('(無法取得專案清單)'));
      // }
    } else {
      projectBriefList = $(promise.data);
      // as same ss assignProject.data('combobox').$target.change(
      assignProject.html(projectBriefList).combobox().change(function(e){
      	console.log('combo:'+e.target.value);
      });
    }
  });
}

function createDataTable() {
  assignList = $('#list-assignment').DataTable({
    processing: true,
    serverSide: true,
    deferRender: true,
    deferLoading: 0, // NO LUCK
    // destroy: true, // NO LUCK
    ajax: {
      // onReloadComplete: function() {
      //   detailSec.empty();
      // },
      url: '/api/assignments.json'
    },

    initComplete: function (settings, data) { // this == DataTable()
      initialized4DataTables(this, settings, data);
      // detailSec.empty();
    },

    extButtons: {
      // copy: true
    },
    buttons: [
    // <%-- //暫無新增功能
    //   {text: '新增', action: addDataRequest} --%>
    ],
    columns: [ //0
      renderDefaultAlterationCellWithId4DataTables({
        edit: {
          url: '/assignment/edit',
          callback: modifyDataRequested
        }
        // <%-- //暫無刪除功能
        // ,delete:  {
        //   url: '/assignment/delete',
        //   callback: removeDataRequested
        // } --%>
      })
    ,{ //1
      data: 'employee'
    // },{ //2
    //   data: 'project'
    // },{ //3
    //   data: 'year'
    // },{ //4
    //   orderable: false,
    //   data: 'week'
    },{ //5
      render: renderCheck4DataTables,
      orderable: false,
      data: 'd1'
    },{ //6
      render: renderCheck4DataTables,
      orderable: false,
      data: 'd2'
    },{ //7
      render: renderCheck4DataTables,
      orderable: false,
      data: 'd3'
    },{ //8
      render: renderCheck4DataTables,
      orderable: false,
      data: 'd4'
    },{ //9
      render: renderCheck4DataTables,
      orderable: false,
      data: 'd5'
    },{ //10
      render: renderCheck4DataTables,
      orderable: false,
      data: 'd6'
    },{ //11
      render: renderCheck4DataTables,
      orderable: false,
      data: 'd7'
    }],
    order: [[1,'asc']] // prev: 'aaSorting'

  }).buttons().disable().clear().draw();
}