//= require ../grid
//= require_self

var materialList;
var detailSec = $('.detail');

function createDetailTab() {
  var actionFlag = null;

  $('#list-material tbody').on('click', 'tr', function(evt, action) {
    if (action) {
      actionFlag = action.type;
      return;
    }
    if ($(this).hasClass('selected') /*&& actionFlag != 'show'*/ ) {
      if (actionFlag != 'show') {
        var thisRow = materialList.row(this);
        detailSec
          .html('<div class="text-center"><span class="ajax-loader">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div>')
          .load(server.detailLink, {
              'embed': true,
              'materialId': thisRow.data().id
            },
            function(response, status, jqXHR) {
              if (jqXHR.status >= 400) {
                detailSec.empty();
                alertError({}, jqXHR);
              }
            });
      }

    } else {
      detailSec.empty();
    }

    actionFlag = null;
  });
}

function createTabs() {
  $('.content a[data-toggle="mtab"]').click(function(e) {
    e.preventDefault();
    var thisEle = $(this);
    var loadUrl = thisEle.attr('href');

    if (loadUrl.length > 0 && loadUrl !== '#') {
      $(thisEle.attr('data-target')).load(loadUrl, function(response, status, jqXHR) {
        if (jqXHR.status >= 400) {
          $(thisEle.attr('data-target')).html(jqXHR.responseText);

        } else {
          thisEle.attr('href', '#');
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

function renderDisplayHint4DataTables(settings, start, end, max, total, pre) {
  return '<span class="small pull-right text-danger">點選後, 可檢視材料供應設定</span>';
}

function removeDataRequested(result) {
  reloadDataTables(materialList);
  // detailSec.empty();
}

function modifyDataRequested(result, editForm) {
  reloadDataTables(materialList);
  // detailSec.empty();
}

function addDataRequested(result, editForm) {
  reloadDataTables(materialList);
  // detailSec.empty();
}

function addDataRequest(evt, dt, node, config) {
  BootstrapDialog.show({
    title: '新增...',
    message: requestAction4BootstrapDialog({
      url: contextPath + '/material/create',
      callback: addDataRequested
    })
  });
}

function createDataTable() {
  materialList = $('#list-material').DataTable({
    processing: true,
    serverSide: true,
    deferRender: true,
    ajax: {
      url: contextPath + '/api/materials.json',
      onReloadClicked: function() {
        detailSec.empty();
      }
    },
    infoCallback: renderDisplayHint4DataTables,
    initComplete: function(settings, data) { // this == DataTable()
      initialized4DataTables(settings, data);
      resizeDataTablesInSecs(materialList);
      // detailSec.empty();
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
          url: contextPath + '/material/show'
        },
        edit: {
          url: contextPath + '/material/edit',
          callback: modifyDataRequested
        },
        delete: {
          url: contextPath + '/material/delete',
          callback: removeDataRequested
        }
      }), { //1
        data: 'category'
      }, { //2
        data: 'name'
      }, { //3
        orderable: false,
        data: 'dimension'
      }, { //4
        orderable: false,
        data: 'texture'
      }, { //5
        orderable: false,
        data: 'spec' //其他
      }, { //6
        orderable: false,
        data: 'quantity'
      }, { //7
        orderable: false,
        data: 'unit'
      }, { //8
        data: 'price'
          // },{ //9
          //   orderable: false,
          //   data: 'supplier'
          // },{ //10
          //   orderable: false,
          //   data: 'contactPhoneNo'
          // },{ //11
          //   render: renderDate4DataTables(),
          //   data: 'registeredDate'
      }
    ],
    order: [
        [1, 'asc']
      ] // prev: 'aaSorting'

  }).buttons().disable();
}
