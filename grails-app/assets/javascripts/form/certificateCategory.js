//* require ../grid
//= require_self

var certificateCategoryList;

function removeCatDataRequested(result) {
  reloadDataTables(certificateCategoryList);
}

function modifyCatDataRequested(result, editForm) {
  reloadDataTables(certificateCategoryList);
}

function addCatDataRequested(result, editForm) {
  reloadDataTables(certificateCategoryList);
}

function addCatDataRequest(evt, dt, node, config) {
  BootstrapDialog.show({
    title: '新增...',
    message: requestAction4BootstrapDialog({
      url: server.ctxPath + '/certificateCategory/create',
      callback: addCatDataRequested
    })
  });
}

function createCatDataTable() {
  certificateCategoryList = $('#list-certificateCategory').DataTable({
    processing: true,
    serverSide: true,
    deferRender: true,
    ajax: {
      url: server.ctxPath + '/api/certificateCategories.json'
    },
    initComplete: function(settings, data) {
      initialized4DataTables(settings, data);
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
          url: server.ctxPath + '/certificateCategory/edit',
          callback: modifyCatDataRequested
        },
        delete: {
          url: server.ctxPath + '/certificateCategory/delete',
          callback: removeCatDataRequested
        }
      }), { //1
        data: 'code'
      }, { //2
        orderable: false,
        data: 'description'
	  }, { ///3
		render: renderCheck4DataTables,
		orderable: false,
		data: 'permanent'
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
