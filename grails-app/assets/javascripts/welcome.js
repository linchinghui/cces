//= require grid
//= require_self

var announcementList;
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
      // copy: true
    },
    buttons: [
      // {text: '新增', action: addDataRequest}
    ],
    columns: [{ //0
	  visible: false,
	  orderable: false,
      data: 'id',
    },{ //1
      render: renderDate4DataTables(),
      data: 'announcedDate'
    },{ //2
      orderable: false,
      data: 'description'
    }],
    order: [[1,'asc']] // prev: 'aaSorting'

  }).buttons().disable();
}