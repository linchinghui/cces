//* require ../grid
//= require_self

var vehicleBrandList;

function removeBrandDataRequested (result) {
  vehicleBrandList.ajax.reload(null, false);
}

function modifyBrandDataRequested (result, editForm) {
  vehicleBrandList.ajax.reload(null, false);
}

function addBrandDataRequested (result, editForm) {
  vehicleBrandList.ajax.reload(null, false);
}

function addBrandDataRequest (evt, dt, node, config) {
  BootstrapDialog.show({
    title: '新增...',
    message: requestAction4BootstrapDialog({
      url: '/vehicleBrand/create',
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
      url: '/api/vehicleBrands.json'
    },

    initComplete: function (settings, data) { // this == DataTable()
      initialized4DataTables(this, settings, data);
    },

    extButtons: {
      copy: true
    },
    buttons: [
      {text: '新增', action: addBrandDataRequest}
    ],
    columns: [ //0
      renderDefaultAlterationCellWithId4DataTables({
        edit: {
          url: '/vehicleBrand/edit',
          callback: modifyBrandDataRequested
        },
        delete:  {
          url: '/vehicleBrand/delete',
          callback: removeBrandDataRequested
        }
      })
    ,{ //1
      data: 'name'
    },{ //2
      orderable: false,
      data: 'description'
    }],
    order: [[1,'asc']] // prev: 'aaSorting'

  }).buttons().disable();
}
