//= require ../grid
//= require_self

var workerList;

function removeDataRequested (result) {
  reloadDataTables(workerList);
}

function modifyDataRequested (result, editForm) {
  reloadDataTables(workerList);
}

function addDataRequested (result, editForm) {
  reloadDataTables(workerList);
}

function addDataRequest (evt, dt, node, config) {
  BootstrapDialog.show({
    title: '新增...',
    message: requestAction4BootstrapDialog({
      url: '/worker/create',
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
      url: '/api/workers.json'
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
          url: '/worker/edit',
          callback: modifyDataRequested
        },
        delete:  {
          url: '/worker/delete',
          callback: removeDataRequested
        }
      })
    ,{ //1
      data: 'empNo'
    },{ //2
      data: 'empName'
    },{ //3
      data: 'sex'
    },{ //4
      render: renderDate4DataTables(),
      data: 'employedDate'
    },{ //5
      render: renderDate4DataTables(),
      data: 'resignedDate'
    },{ //6
      render: renderDate4DataTables(),
      data: 'avatarCopied'
    },{ //7
      render: renderDate4DataTables(),
      data: 'idCardCopied'
    },{ //8
      render: renderDate4DataTables(),
      data: 'nhiIcCardCopied'
    },{ //9
      render: renderDate4DataTables(),
      data: 'diplomaCopied'
    },{ //10
      render: renderDate4DataTables(),
      data: 'oorCopied'
    },{ //11
      render: renderDate4DataTables(),
      data: 'gdlCopied'
    }],
    order: [[1,'asc']] // prev: 'aaSorting'

  }).buttons().disable();
}