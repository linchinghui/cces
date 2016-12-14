//= require plugins/js.cookie
//= require plugins/jquery.ajax.fake
//= require plugins/bootstrap-dialog
//= require plugins/bootstrap-notify
//= require plugins/bootstrap-select
//= require plugins/bootstrap-combobox
//  require picture - XXX - plugins/bootstrap-jasny
//= require_self
//  require plugins/fastclick
//= require plugins/jquery.mask
//= require plugins/jquery.typewatch
//  require plugins/jquery.highlight

// BootstrapDialog.configDefaultOptions({
// });

$.notifyDefaults({
	type: 'warning',
	mouse_over: 'pause'
});

function clearCombobox(object) {
	var combobox = object.data('combobox');
	combobox.clearTarget();
	combobox.clearElement();
}
