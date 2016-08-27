<select class="combobox form-control" id="worker" name="worker">
<option value="" selected="selected"></option><%--
<option></option>--%>
<g:each in="${workerList}">
<option value="${it.id}">${it}</option>
</g:each>
</select>
