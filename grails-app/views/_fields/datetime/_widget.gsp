<%@ page import="java.text.SimpleDateFormat" %>
<div> <%--
	<label for="${property}">${label}</label> --%>
	<div class="col-xs-5 input-group date datetime ${property} disabled">
		<input type="text" value="${value}" class="form-control" placeholder="YYYY/MM/DD hh:mm:ss" />
		<span class="input-group-addon"><i class="fa fa-calendar"></i></span>
	</div>
  <input type="hidden" id="${property}" name="${property}" value="${value?.time ? new SimpleDateFormat('YYYY/MM/dd\'T\'HH:mm:ss\'Z\'').format(value?.time) : null}"/>
</div>
<asset:script type='text/javascript'>
$(function() {
  $('.${property}').datetimepicker({
    focusOnShow: false,
    showTodayButton: true,
    showClose: true,
    icons: {date: 'fa fa-calendar'},
    dayViewHeaderFormat: 'YYYY/MM',
  	format: 'YYYY/MM/DD HH:mm:ss'
  })
  .on('dp.change', function (e) {
    $('#${property}').val(!e.date ? '' : e.date.format('YYYY/MM/DDTHH:mm:ss')+'Z');
  }); <%--
  dp.trigger({
    type: 'dp.change',
    date: dp.data('DateTimePicker').date()
  }); --%>
});
</asset:script>