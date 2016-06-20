//* require ../grid
//= require_self

var vehicleBrandList;

function removeBrandDataRequested(result) {
  reloadDataTables(vehicleBrandList);
}

function modifyBrandDataRequested(result, editForm) {
  reloadDataTables(vehicleBrandList);
}

function addBrandDataRequested(result, editForm) {
  reloadDataTables(vehicleBrandList);
}

function addBrandDataRequest(evt, dt, node, config) {
  BootstrapDialog.show({
    title: '新增...',
    message: requestAction4BootstrapDialog({
      url: contextPath + '/vehicleBrand/create',
      callback: addBrandDataRequested
    })
  });
}

function createBrandDataTable() {
  vehicleBrandList = $('#list-vehicleBrand').DataTable({
    processing: true,
    serverSide: true,
    deferRender: true,
    ajax: {
      url: contextPath + '/api/vehicleBrands.json'
    },
    initComplete: function(settings, data) { // this == DataTable()
      initialized4DataTables(settings, data);
      resizeDataTablesInSecs(vehicleBrandList);
    },
    extButtons: {
      copy: true
    },
    buttons: [{
      text: '新增',
      action: addBrandDataRequest
    }],
    columns: [ //0
      renderDefaultAlterationCellWithId4DataTables({
        edit: {
          url: contextPath + '/vehicleBrand/edit',
          callback: modifyBrandDataRequested
        },
        delete: {
          url: contextPath + '/vehicleBrand/delete',
          callback: removeBrandDataRequested
        }
      }), { //1
        data: 'name'
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
