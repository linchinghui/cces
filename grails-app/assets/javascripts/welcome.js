//= require grid
//= require_self

var announcementList;
function createDataTable() {
  announcementList = $('#list-announcement').DataTable({
    autoWidth: false,
    processing: true,
    serverSide: true,
    deferRender: true,
    ajax: {
      headers: {
        'X-CCES-ACTION': 'upToDate'
      },
      url: '/api/announcements.json'
    },
    initComplete: function (settings, data) { // this == DataTable()
      initialized4DataTables(settings, data);
      $(window).resize(function() {
        announcementList.columns.adjust().responsive.recalc();
      });
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
      width: '28%',
      render: renderDate4DataTables(true),
      data: 'announcedDate'
    },{ //2
      orderable: false,
      data: 'description'
    }],
    order: [[1,'desc']] // prev: 'aaSorting'

  }).buttons().disable();
}
