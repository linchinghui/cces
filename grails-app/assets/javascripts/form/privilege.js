//* require ../grid
//= require_self

var privilegeList;

function removeDetailDataRequested (result) {
  reloadDataTables(privilegeList);
}

function modifyDetailDataRequested (result, editForm) {
  reloadDataTables(privilegeList);
}
// <%-- //暫無新增功能
// function addDetailDataRequested (result, editForm) {
//  reloadDataTables(privilegeList);
// }

// function addDetailDataRequest (evt, dt, node, config) {
//   BootstrapDialog.show({
//     title: '新增...',
//     message: requestAction4BootstrapDialog({
//       url: '/privilege/create',
//       callback: addDetailDataRequested
//     })
//   });
// }
// --%>
// // function renderAlterationCell4DataTables(requestActions) {
// //   return {
// //     orderable: false,
// //     data: 'id',
// //     render: function(data, type, full) {
// //       return (requestActions.delete ? '<span><i class="fa fa-times"></i></span>&nbsp;' : '')
// //             +'<span><i class="fa fa-pencil"></i></span>';
// //     },
// //     createdCell: function (cell, cellData, rowData, row, col) {
// //       // userList == this.DataTable()
// //       var serverActions = $.extend(true, {
// //         edit: {
// //           type: 'edit',
// //           title: '編輯...',
// //           selector: 'span i.fa-pencil',
// //           key: 'id'
// //         },
// //         delete: (requestActions.delete ? {
// //           type: 'delete',
// //           title: '刪除...',
// //           selector: 'span i.fa-times',
// //           key: 'id'
// //         } : null)
// //       }, requestActions);

// //       if (requestActions.delete) {
// //         createRemoveCellButtom(
// //           $(serverActions.delete.selector, cell),
// //           rowData[serverActions.delete.key],
// //           serverActions.delete
// //         );
// //       }
// //       createModifyCellButtom(
// //         $(serverActions.edit.selector, cell),
// //         rowData[serverActions.edit.key],
// //         serverActions.edit
// //       );
// //     }
// //   };
// // }

// function extendURL() {
//   return serverParams.embedPage ? '?embed=true&roleId=' + serverParams.roleId : '';
// }

function createDetailDataTable() {
  var qryStr = serverParams.embedPage ? '?embed=true&roleId=' + serverParams.roleId : ''; // extendURL();
  var dataCols = [ //0
      // renderAlterationCell4DataTables({
      //   edit: {
      //     url: '/privilege/edit',
      //     callback: modifyDetailDataRequested
      //   } <%-- //暫無刪除功能
      //   ,delete:  {
      //     url: '/privilege/delete',
      //     callback: removeDetailDataRequested
      //   } --%>
      // })
      renderDefaultAlterationCellWithId4DataTables({
        edit: {
          url: '/privilege/edit'+qryStr,
          callback: modifyDetailDataRequested
        }
        ,delete:  {
          title: '清除...',
          url: '/privilege/delete'+qryStr,
          callback: removeDetailDataRequested
        }
      })
    ];

  if (! serverParams.embedPage) {
    dataCols.push(
      { //1
        data: 'role'
      });
  }

  dataCols.push(
    { //2
      orderable: false,
      data: 'function'
    },{ //3
      render: renderCheck4DataTables,
      orderable: false,
      data: 'canRead'
    },{ //4
      render: renderCheck4DataTables,
      orderable: false,
      data: 'canWrite'
    },{ //5
      render: renderCheck4DataTables,
      orderable: false,
      data: 'canDelete'
    });

  var dataSettings = {
      processing: true,
      serverSide: true,
      deferRender: true,
      ajax: {
        url: '/api/privileges.json',
        data: function(params, settings) {
          return $.extend({}, 
            serverParams.embedPage ? {
              draw: params.draw,
              embed: true,
              roleId: serverParams.roleId
            } : {
              draw: params.draw,
              max: params.length,
              offset: params.start
            }, {
              sort: settings.aoColumns[params.order[0].column].data,
              order: params.order[0].dir
            });
        }
      },

      initComplete: serverParams.embedPage ? null : function (settings, data) { // this == DataTable()
        initialized4DataTables(this, settings, data);
      },

      extButtons: {
        copy: true
      },
      buttons: [
        //暫無新增功能
        //{text: '新增', action: addDetailDataRequest}
      ],
      columns: dataCols
    };

  privilegeList = $('#list-privilege').DataTable(
    serverParams.embedPage ? $.extend({}, {
          dom: 'Bftri',
          pageLength: 100,
          scrollY: true
        }, dataSettings)
      : dataSettings
    ).buttons().disable();
}
