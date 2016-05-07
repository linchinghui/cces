//* require ../grid
//= require_self

var vehicleBrandList;

function removeBrandDataRequested (result) {
  reloadDataTables(vehicleBrandList);
}

function modifyBrandDataRequested (result, editForm) {
  reloadDataTables(vehicleBrandList);
}

function addBrandDataRequested (result, editForm) {
  reloadDataTables(vehicleBrandList);
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
      initialized4DataTables(settings, data);
      $(window).resize(function() {
        vehicleBrandList.columns.adjust().responsive.recalc();
      });
      // TODO
      setTimeout(function(){ $(window).resize(); }, 500);
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
