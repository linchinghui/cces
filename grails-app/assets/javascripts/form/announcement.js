//= require ../grid
//= require_self

var announcementList;

function removeDataRequested (result) {
  reloadDataTables(announcementList);
}

function modifyDataRequested (result, editForm) {
  reloadDataTables(announcementList);
}

function addDataRequested (result, editForm) {
  reloadDataTables(announcementList);
}

function addDataRequest (evt, dt, node, config) {
  BootstrapDialog.show({
    title: '新增...',
    message: requestAction4BootstrapDialog({
      url: '/announcement/create',
      callback: addDataRequested
    })
  });
}

function createDataTable() {
  announcementList = $('#list-announcement').DataTable({
    processing: true,
    serverSide: true,
    deferRender: true,
    ajax: {
      url: '/api/announcements.json'
    },

    initComplete: function (settings, data) { // this == DataTable()
      initialized4DataTables(this, settings, data);
    },

    extButtons: {
      copy: true
    },
    buttons: [
      {text: '新增', action: addDataRequest}
    ],
    columns: [ //0
      renderDefaultAlterationCellWithId4DataTables({
        edit: {
          url: '/announcement/edit',
          callback: modifyDataRequested
        },
        delete:  {
          url: '/announcement/delete',
          callback: removeDataRequested
        }
      })
    ,{ //1
      orderable: false,
      data: 'description'
    },{ //2
      render: renderDate4DataTables(true),
      data: 'announcedDate'
    },{ //3
      render: renderDate4DataTables(),
      data: 'revokedDate'
    },{ //4
      orderable: false,
      render: renderDate4DataTables(),
      data: 'createdDate'
    }],
    order: [[2,'desc']] // prev: 'aaSorting'

  }).buttons().disable();
}