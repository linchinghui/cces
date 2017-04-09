<select class="combobox form-control" id="worker${Math.abs(new Random().nextInt()) % 10 + 1}" name="worker">
<option value="" selected="selected"></option><%--
<option></option>--%>
<g:each in="${workerList}">
<option value="${it.id}">${it}</option>
</g:each>
</select>
