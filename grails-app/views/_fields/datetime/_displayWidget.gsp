<%@ page import="java.text.SimpleDateFormat" %>
<div class="input-group datetime disabled">
	<label for="${property}">${label}</label>
	<input type="text" id="${property}" name="${property}" value="${value?.time ? new SimpleDateFormat('YYYY/MM/dd HH:mm:ss').format(value?.time) : null}" class="form-control" disabled>
</div>