<button id="buttonAadd" type="button" class="btn btn-primary"> 新增 </button>

<asset:script type='text/javascript'><%-- deferred JS here --%>
$(function() {
	$("#buttonAadd").click(function(){
		BootstrapDialog.show({
			title: 'loading ...',
			message: $('<center><asset:image src="ajax-loader-small.gif" /><center>').load('/${controllerName}/edit')
		});
	});
});
</asset:script>
