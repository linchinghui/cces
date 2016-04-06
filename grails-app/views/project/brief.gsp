<select class="combobox form-control" id="project" name="project">
<option value="" selected="selected">請選擇專案</option><%--
<option></option>--%>
<g:each in="${projectList}">
<option value="${it.id}">${it.id} - ${it.description}</option>
</g:each>
</select>