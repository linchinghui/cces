//= require ../grid
//= require_self

var functionList;

function removeDataRequested (result) {
  reloadDataTables(functionList);
}

function modifyDataRequested (result, editForm) {
  reloadDataTables(functionList);
}

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
    ],
    columns: [ //0
      renderDefaultAlterationCellWithId4DataTables({
        edit: {
          url: '/function/edit',
          callback: modifyDataRequested
        }
      })
    ,{ //1
      data: 'name'
    },{ //2
      data: 'description'
    }],
    order: [[1,'asc']] // prev: 'aaSorting'

  }).buttons().disable();
}