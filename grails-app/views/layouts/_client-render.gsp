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
<%-- bootstrap-datetimepicker
  <g:if test="${renderDate || renderTime}">
    $.each($('.date')/*.has('input[type="hidden"]')*/, function(idx, itEle) {
      var it = $(itEle);
      it.datetimepicker({
        icons: {date: 'fa fa-calendar'},
        // widgetParent: it.find('span.input-group-addon'),
        // allowInputToggle: true,
        showTodayButton: true,
        dayViewHeaderFormat: 'YYYY/MM',
        format: '<g:if test="${renderDate}">YYYY/MM/DD</g:if> <g:if test="${renderTime}">HH:mm:ss</g:if>'
      })
      .on('dp.show', function (e) {
        it.parent().find('input[type="hidden"]').val(!e.date ? '' : e.date.format('<g:if test="${renderDate}">YYYY/MM/DD</g:if><g:if test="${renderTime}">THH:mm:ss</g:if>')+'Z');
      })
      .on('dp.change', function (e) {
        it.parent().find('input[type="hidden"]').val(!e.date ? '' : e.date.format('<g:if test="${renderDate}">YYYY/MM/DD</g:if><g:if test="${renderTime}">THH:mm:ss</g:if>')+'Z');
      });
    });
  </g:if>
--%>
});