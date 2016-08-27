<select class="combobox form-control" id="constructNo" name="constructNo">
<option value="" selected="selected"></option><%--
<option></option>--%>
<g:each in="${projectList}">
<option value="${it.constructNo}">(${it.id}) ${it.constructNo}</option>
</g:each>
</select>
