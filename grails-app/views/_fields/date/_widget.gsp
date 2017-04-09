<g:set var="dateValue" value="${value ? new java.text.SimpleDateFormat('YYYY/MM/dd\'Z\'').format(value.time) : null}"/>
<div class="input-group date ${property}">
	<input type="text" value="${dateValue}" class="form-control" placeholder="YYYY/MM/DD" ${required?'required="true"':''}/>
	<span class="input-group-addon"><i class="fa fa-calendar"></i></span>
</div>
<input type="hidden" id="${property}" name="${property}" value="${dateValue}"/>
<asset:script type='text/javascript'>
$(function() {
  $('.${property}').datetimepicker({
    focusOnShow: false,
    showTodayButton: true,
    showClose: true,
    icons: {date: 'fa fa-calendar'},
    dayViewHeaderFormat: 'YYYY/MM',
    format: 'YYYY/MM/DD'
  })
  .on('dp.change', function (e) {
	var ele = $('#${property}');
	var data = !e.date ? '' : e.date.format('YYYY/MM/DD')+'Z';
	ele.val(data);
	//if (data) {
	  ele.trigger('update', [data]);
	//}
  });
});
</asset:script>
