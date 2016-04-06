<%@ page import="java.text.SimpleDateFormat" %>
<div class="input-group date disabled">
	<label for="${property}">${label}</label>
	<input type="text" id="${property}" name="${property}" value="${value?.time ? new SimpleDateFormat('YYYY/MM/dd').format(value?.time) : null}" class="form-control" disabled>
</div>