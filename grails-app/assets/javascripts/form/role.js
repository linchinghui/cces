//= require ../grid
//= require_self

var roleList;
var detailSec = $('.detail');

function createDetailTab() {
  $('#list-role tbody').on('click', 'tr', function () {
    var roleId = roleList.row( this ).data().id;

    detailSec
      .html('<div class="text-center"><span class="ajax-loader">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div>')
      .load(server.detailLink,
        {
          'embed' : true,
          'roleId' : roleId
        },
        function(response, status, jqXHR) {
          if (jqXHR.status >= 400) {
            detailSec.empty();
            alertError({}, jqXHR);
          }
        });
  });
}

function renderDisplayHit4DataTables (settings, start, end, max, total, pre) {
  return '<span class="small pull-right">點選後進行權限設定</span>';
}

function modifyDataRequested (result, editForm) {
  reloadDataTables(roleList);
  detailSec.empty();
}

function createDataTable() {
  roleList = $('#list-role').DataTable({
    dom: 'Bftri',
    processing: true,
    serverSide: true,
    deferRender: true,
    ajax: {
      url: contextPath+'/api/roles.json',
      onReloadClicked: function() {
        detailSec.empty();
      }
    },
    infoCallback: renderDisplayHit4DataTables,
    initComplete: function (settings, data) { // this == DataTable()
      initialized4DataTables(settings, data);
      detailSec.empty();
    },
    extButtons: {
      // copy: true
    },
    buttons: [
    //   {text: '新增', action: addDataRequest}
    ],
    columns: [ //0
      renderDefaultAlterationCellWithId4DataTables({
        edit: {
          url: contextPath+'/role/edit',
          callback: modifyDataRequested
        }
      })
    ,{ //1
      orderable: false,
      data: 'code'
    },{ //2
      orderable: false,
      data: 'description'
    }]

  }).buttons().disable();
}
