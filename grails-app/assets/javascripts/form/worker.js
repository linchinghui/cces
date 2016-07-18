//= require ../grid
//= require_self

var workerList;
var detailSec = $('.detail');

function createDetailTab() {
	var actionFlag = null;

    $('#list-worker tbody').on('click', 'tr', function(evt, action) {
      if (action) {
        actionFlag = action.type;
        return;
      }
      if ($(this).hasClass('selected')) {
        if (actionFlag != 'edit') {
          detailSec
            .html('<div class="text-center"><span class="ajax-loader">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div>')
            .load(serverParams.detailLink, {
                'embed': true,
                'empId': workerList.row(this).data().id
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

function renderDisplayHint4DataTables(settings, start, end, max, total, pre) {
  return '<span class="small pull-right text-danger">點選後，可於下方檢視證照資料</span>';
}

function removeDataRequested(result) {
  reloadDataTables(workerList);
}

function modifyDataRequested(result, editForm) {
  reloadDataTables(workerList);
}

function addDataRequested(result, editForm) {
  reloadDataTables(workerList);
}

function addDataRequest(evt, dt, node, config) {
  BootstrapDialog.show({
    title: '新增...',
    message: requestAction4BootstrapDialog({
      url: server.ctxPath + '/worker/create',
      callback: addDataRequested
    })
  });
}

function createDataTable() {
  workerList = $('#list-worker').DataTable({
    processing: true,
    serverSide: true,
    deferRender: true,
    ajax: {
      url: server.ctxPath + '/api/workers.json'
    },
	infoCallback: renderDisplayHint4DataTables,
    initComplete: function(settings, data) { // this == DataTable()
      initialized4DataTables(settings, data);
      resizeDataTablesInSecs(settings.oInstance.DataTable());
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
          url: server.ctxPath + '/worker/show'
        },
        edit: {
          url: server.ctxPath + '/worker/edit',
          callback: modifyDataRequested
        },
        delete: {
          url: server.ctxPath + '/worker/delete',
          callback: removeDataRequested
        }
      }), { //1
        data: 'empNo'
      }, { //2
        width: '44px',
        data: 'empName'
      }, { //3
		orderable: false,
        data: 'sex'
      }, { //4
        render: renderDate4DataTables(),
        data: 'employedDate'
      }, { //5
        render: renderDate4DataTables(),
		orderable: false,
        data: 'resignedDate'
      }, { //6
        render: renderDate4DataTables(),
		orderable: false,
        data: 'avatarCopied'
      }, { //7
        render: renderDate4DataTables(),
		orderable: false,
        data: 'idCardCopied'
      }, { //8
        render: renderDate4DataTables(),
		orderable: false,
        data: 'nhiIcCardCopied'
      }, { //9
        render: renderDate4DataTables(),
		orderable: false,
        data: 'diplomaCopied'
      }, { //10
        render: renderDate4DataTables(),
		orderable: false,
        data: 'oorCopied'
      }, { //11
        render: renderDate4DataTables(),
		orderable: false,
        data: 'gdlCopied'
      }
    ],
    order: [
        [1, 'asc']
      ] // prev: 'aaSorting'

  }).buttons().disable();
}
