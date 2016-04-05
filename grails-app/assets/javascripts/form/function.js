//= require ../grid
//= require_self

var functionList;

function removeDataRequested (result) {
  reloadDataTables(functionList);
}

function modifyDataRequested (result, editForm) {
  reloadDataTables(functionList);
}
// <%-- //暫無新增功能
// function addDataRequested (result, editForm) {
//   reloadDataTables(functionList);
// }

// function addDataRequest (evt, dt, node, config) {
//   BootstrapDialog.show({
//     title: '新增...',
//     message: requestAction4BootstrapDialog({
//       url: '/function/create',
//       callback: addDataRequested
//     })
//   });
// }
// --%>
function createDataTable() {
    functionList = $('#list-function').DataTable({
    processing: true,
    serverSide: true,
    deferRender: true,
    ajax: {
      url: '/api/functions.json'
    },

    // infoCallback: null, // renderDisplayHit4DataTables

    initComplete: function (settings, data) { // this == DataTable()
      initialized4DataTables(this, settings, data);
    },
    
    extButtons: {
      copy: true
    },
    buttons: [
    // <%-- //暫無新增功能
    //   {text: '新增', action: addDataRequest}
    // --%>
    ],
    columns: [ //0
      renderDefaultAlterationCellWithId4DataTables({
        edit: {
          url: '/function/edit',
          callback: modifyDataRequested
        }
        // <%-- //無刪除功能
        // ,delete:  {
        //   url: '/function/delete',
        //   callback: removeDataRequested
        // } --%>
      })
    ,{ //1
      data: 'name'
    },{ //2
      data: 'description'
    }],
    order: [[1,'asc']] // prev: 'aaSorting'

  }).buttons().disable();
}