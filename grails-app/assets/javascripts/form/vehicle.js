//= require ../grid
//= require_self

var vehicleList;
var nextMonthDate = moment().add(1, 'months');

// function handleTabs() {
//   $('.content a[data-toggle="mtab"]').click(function(e) {
//     e.preventDefault();
//     var thisEle = $(this);
//     var loadUrl = thisEle.attr('href');
//
//     if (loadUrl.length > 0 && loadUrl !== '#') {
//       $.ajax({
//         type: 'GET',
//         url: loadUrl,
//         error: function(jqXHR, status, error) {
//           $(thisEle.attr('data-target')).html(jqXHR.responseText);
//         },
//         success: function(response) {
//           $(thisEle.attr('data-target')).html(response);
//           thisEle.attr('href', '#');
//         }
//       });
//     } else {
//       setTimeout(function() {
//         $(window).resize();
//       }, 500);
//     }
//
//     thisEle.tab('show');
//     return false;
//   });
// }

function removeDataRequested(result) {
  reloadDataTables(vehicleList);
}

function modifyDataRequested(result, editForm) {
  reloadDataTables(vehicleList);
}

function addDataRequested(result, editForm) {
  reloadDataTables(vehicleList);
}

function addDataRequest(evt, dt, node, config) {
  BootstrapDialog.show({
    title: '新增...',
    message: requestAction4BootstrapDialog({
      url: server.ctxPath + '/vehicle/create',
      callback: addDataRequested
    })
  });
}

function createDataTable() {
  vehicleList = $('#list-vehicle').DataTable({
    processing: true,
    serverSide: true,
    deferRender: true,
    ajax: {
      url: server.ctxPath + '/api/vehicles.json'
    },
    initComplete: function(settings, data) {
      initialized4DataTables(settings, data);
    },
    extButtons: {
      copy: true
    },
    buttons: [{
      text: '新增',
      action: addDataRequest
    }],
    columns: [ //0
      renderDefaultAlterationCellWithId4DataTables({
        show: {
          url: server.ctxPath + '/vehicle/show'
        },
        edit: {
          url: server.ctxPath + '/vehicle/edit',
          callback: modifyDataRequested
        },
        delete: {
          url: server.ctxPath + '/vehicle/delete',
          callback: removeDataRequested
        }
      }), { //1
        data: 'plateNo'
      }, { //2
        render: renderDate4DataTables(),
        data: 'inspectedDate'
      }, { //3 : 定檢期限
        orderable: false,
        render: function(data, type, row, meta) {
          var inspDate = moment(row.inspectedDate);
          if (!inspDate.isValid()) {
            return '';
          }
          var termDate = inspDate.add(13, 'months');
          return $('<span></span>')
            .addClass('text-' + (nextMonthDate >= termDate ? 'danger' : 'muted'))
            .html(termDate.format('YYYY/MM/DD'))
            .wrap('<span></span>')
            .parent()
            .html();
        }
      }, { //4
        data: 'brand'
      }, { //5
        orderable: false,
        data: 'model'
      }, { //6
        orderable: false,
        data: 'note'
      }
    ],
    order: [
        [1, 'asc']
      ] // prev: 'aaSorting'
  })
	.buttons()
	.disable()
	;
}
