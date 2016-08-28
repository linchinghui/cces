//= require ../grid
//* require ../plugins/bootstrap-select
//= require_self

var userList;
var roleMap = {};

function initializeRoleTypes() {
	chainAjaxCall({
		url: server.ctxPath + '/api/roles.json',
		method: 'GET',
		async: false,
		cache: true

	}).done(function(promise) {
		if (promise.rc == 1) {
			roleMap = {
				' ': '(無法取得[角色]名稱)'
			};

		} else {
			if (promise.data.length > 0) {
				promise.data.forEach(function(valuePair) {
					roleMap[valuePair.id] = valuePair.description;
				});
			}
		}
	});
}

function renderDisplayHint4DataTables(settings, start, end, max, total, pre) {
	var rolesStr = $.map(roleMap, function(roleDesc, roleId) {
		return '<span>' + roleId + '&nbsp;:&nbsp;' + roleDesc + '</span>';
	}).join(',&nbsp;&nbsp;');

	return '<span class="pull-right small visible-xs">' + rolesStr + '</span>';
}

function renderRolesField4DataTables(data, type, row, meta) {
	var htmlStr = '';

	$.each(roleMap, function(roleId, roleDesc) {
		var rdrObj = $('<i class="fa fa-square-o"></i>').html(
			'<span>&nbsp;' + roleId + '&nbsp;<span class="hidden-xs">' + roleDesc + '</span></span>');

		$.each(data, function(idx, clz) {
			if (roleId == clz['id']) {
				rdrObj.removeClass('fa-square-o').addClass('fa-check-square-o');
			}
		});

		htmlStr += (htmlStr.length > 0 ? '&nbsp;&nbsp;' : '') + rdrObj.clone().wrap('<span></span>').parent().html();
	});

	return htmlStr;
}

function removeDataRequested(result) {
	reloadDataTables(userList);
}

function modifyDataRequested(result, editForm) {
	reloadDataTables(userList);
}

function addDataRequested(result, editForm) {
	reloadDataTables(userList);
}

function addDataRequest(evt, dt, node, config) {
	BootstrapDialog.show({
		title: '新增...',
		message: requestAction4BootstrapDialog({
			url: '/user/create',
			callback: addDataRequested
		})
	});
}

function createDataTable() {
	userList = $('#list-user').DataTable({
			processing: true,
			serverSide: true,
			deferRender: true,
			ajax: {
				url: server.ctxPath + '/api/users.json'
			},
			infoCallback: renderDisplayHint4DataTables,
			initComplete: function(settings, data) {
				initialized4DataTables(settings, data);
			},
			extButtons: {
				copy: true
			},
			buttons: [{
				text: '新增',
				action: addDataRequest
			}],
			columns: [ //0
				renderDefaultAlterationCellWithId4DataTables({
					edit: {
						url: server.ctxPath + '/user/edit',
						callback: modifyDataRequested
					},
					delete: {
						url: server.ctxPath + '/user/delete',
						callback: removeDataRequested
					}
				}), { //1
					data: 'username'
				}, { //2
					data: 'fullname'
				}, { //3
					render: renderRolesField4DataTables,
					orderable: false,
					data: 'roles'
				}, { //4
					render: renderCheck4DataTables,
					orderable: false,
					data: 'enabled'
				}, { //5
					render: renderCheck4DataTables,
					orderable: false,
					data: 'accountLocked'
				}, { //6
					render: renderCheck4DataTables,
					orderable: false,
					data: 'accountExpired'
				}, { //7
					render: renderCheck4DataTables,
					orderable: false,
					data: 'credentialsExpired'
				}
			],
			order: [
					[1, 'asc']
				] // prev: 'aaSorting'

		})
		.buttons()
		.disable();
}
