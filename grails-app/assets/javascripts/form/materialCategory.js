//* require ../grid
//= require_self

var materialCategoryList;

function removeCatDataRequested(result) {
  reloadDataTables(materialCategoryList);
}

function modifyCatDataRequested(result, editForm) {
  reloadDataTables(materialCategoryList);
}

function addCatDataRequested(result, editForm) {
  reloadDataTables(materialCategoryList);
}

function addCatDataRequest(evt, dt, node, config) {
  BootstrapDialog.show({
    title: '新增...',
    message: requestAction4BootstrapDialog({
      url: contextPath + '/materialCategory/create',
      callback: addCatDataRequested
    })
  });
}

function createCatDataTable() {
  materialCategoryList = $('#list-materialCategory').DataTable({
    processing: true,
    serverSide: true,
    deferRender: true,
    ajax: {
      url: contextPath + '/api/materialCategories.json'
    },
    initComplete: function(settings, data) { // this == DataTable()
      initialized4DataTables(settings, data);
      resizeDataTablesInSecs(materialCategoryList);
    },
    extButtons: {
      copy: true
    },
    buttons: [{
      text: '新增',
      action: addCatDataRequest
    }],
    columns: [ //0
      renderDefaultAlterationCellWithId4DataTables({
        edit: {
          url: contextPath + '/materialCategory/edit',
          callback: modifyCatDataRequested
        },
        delete: {
          url: contextPath + '/materialCategory/delete',
          callback: removeCatDataRequested
        }
      }), { //1
        data: 'code'
      }, { //2
        orderable: false,
        data: 'description'
      }
    ],
    order: [
        [1, 'asc']
      ] // prev: 'aaSorting'

  }).buttons().disable();
}
