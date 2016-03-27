//= require ../grid
//= require_self

var vehicleList;

function createTabs() {
  $('.content a[data-toggle="mtab"]').click(function (e) {
    e.preventDefault();
    var thisEle = $(this);
    var loadUrl = thisEle.attr('href');
    
    if (loadUrl.length > 0 && loadUrl !== '#') {
      $.ajax({
        type: 'GET',
        url: loadUrl,
        error: function(jqXHR, status, error) {
          $(thisEle.attr('data-target')).html(jqXHR.responseText);
        },
        success: function(response){
          $(thisEle.attr('data-target')).html(response);
          // thisEle.tab('show');
          thisEle.attr('href','#');
        }
      });
    }

    thisEle.tab('show');
    return false;
  });
}

function removeDataRequested (result) {
  vehicleList.ajax.reload(null, false);
}

function modifyDataRequested (result, editForm) {
  vehicleList.ajax.reload(null, false);
}

function addDataRequested (result, editForm) {
  vehicleList.ajax.reload(null, false);
}

function addDataRequest (evt, dt, node, config) {
  BootstrapDialog.show({
    title: '新增...',
    message: requestAction4BootstrapDialog({
      url: '/vehicle/create',
      callback: addDataRequested
    })
  });
}

function createDataTable() {
  vehicleList = $('#list-vehicle').DataTable({
    processing: true,
    serverSide: true,
    deferRender: true,
    ajax: {
      url: '/api/vehicles.json'
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
          url: '/vehicle/edit',
          callback: modifyDataRequested
        },
        delete:  {
          url: '/vehicle/delete',
          callback: removeDataRequested
        }
      })
    ,{ //1
      data: 'plateNo'
    },{ //2
      data: 'brand'
    },{ //3
      orderable: false,
      data: 'model'
    },{ //4
      orderable: false,
      data: 'note'
    }],
    order: [[1,'asc']] // prev: 'aaSorting'

  }).buttons().disable();
}