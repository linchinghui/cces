<div class="input-group datetime disabled">
	<label for="${property}">${label}</label>
	<input type="text" id="${property}" name="${property}" value="${value ? new java.text.SimpleDateFormat('YYYY/MM/dd HH:mm:ss').format(value) : null}" class="form-control" disabled>
</div>