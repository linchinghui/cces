//= require ../grid
//= require_self

var materialList;

function createTabs() {
  $('.content a[data-toggle="mtab"]').click(function (e) {
    e.preventDefault();
    var thisEle = $(this);
    var loadUrl = thisEle.attr('href');

    if (loadUrl.length > 0 && loadUrl !== '#') {
      $(thisEle.attr('data-target')).load(loadUrl, function (response, status, jqXHR) {
        if (jqXHR.status >= 400) {
          $(thisEle.attr('data-target')).html(jqXHR.responseText);

        } else {
          thisEle.attr('href','#');
        }
      });
    }

    thisEle.tab('show');
    return false;
  });
}

function removeDataRequested (result) {
  reloadDataTables(materialList);
}

function modifyDataRequested (result, editForm) {
  reloadDataTables(materialList);
}

function addDataRequested (result, editForm) {
  reloadDataTables(materialList);
}

function addDataRequest (evt, dt, node, config) {
  BootstrapDialog.show({
    title: '新增...',
    message: requestAction4BootstrapDialog({
      url: '/material/create',
      callback: addDataRequested
    })
  });
}

function createDataTable() {
  materialList = $('#list-material').DataTable({
    processing: true,
    serverSide: true,
    deferRender: true,
    ajax: {
      url: '/api/materials.json'
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
          url: '/material/edit',
          callback: modifyDataRequested
        },
        delete:  {
          url: '/material/delete',
          callback: removeDataRequested
        }
      })
    ,{ //1
      data: 'category'
    },{ //2
      data: 'name'
    },{ //3
      orderable: false,
      data: 'spec'
    },{ //4
      orderable: false,
      data: 'unit'
    },{ //5
      orderable: false,
      data: 'quantity'
    },{ //6
      orderable: false,
      data: 'price'
    },{ //7
      orderable: false,
      data: 'supplier'
    },{ //8
      orderable: false,
      data: 'contactPhoneNo'
    },{ //9
      render: renderDate4DataTables(),
      data: 'registeredDate'
    }],
    order: [[1,'asc']] // prev: 'aaSorting'

  }).buttons().disable();
}
