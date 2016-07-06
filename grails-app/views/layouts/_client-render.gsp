<%-- place this in script tag: --%>
$.each(${formVar}.find('.input-group,.fieldcontain'), function (idx, containEle) {
	var fieldContain = $(containEle);
	fieldContain.removeClass('fieldcontain').addClass('input-group');
	fieldContain.find('input[type="text"],input[type="password"],input[type~="number"],select').addClass('form-control');

	<g:if test="${renderCheckbox}">
	$.each(fieldContain.not(':has(select)').has('input[type="checkbox"]'), function(idx, itEle) {
		var it = $(itEle);
		renderCheckBox4GrailsFieldContain(it);
		var chkBox = it.find('input[type="checkbox"]');
		chkBox.change(function () {
			var self = $(this);
			self.val(self.prop('checked'));
			renderCheckBox4GrailsFieldContain(it);
		});
	});
	</g:if>
});
