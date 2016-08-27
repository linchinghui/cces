//= require plugins/js.cookie
//= require plugins/jquery.ajax.fake
//= require plugins/bootstrap-dialog
//= require plugins/bootstrap-select
//= require plugins/bootstrap-combobox
//  require plugins/bootstrap-jasny
//= require_self
//  require plugins/fastclick
//= require plugins/jquery.mask
//= require plugins/jquery.typewatch
//  require plugins/jquery.highlight

// BootstrapDialog.configDefaultOptions({
// });

function clearCombobox(object) {
	var combobox = object.data('combobox');
	combobox.clearTarget();
	combobox.clearElement();
}
