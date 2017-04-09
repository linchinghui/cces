<select class="combobox form-control" id="project${Math.abs(new Random().nextInt()) % 10 + 1}" name="project">
<option value="" selected="selected"></option><%--
<option></option>--%>
<g:each in="${projectList}">
<option value="${it.id}">${it.id} - ${it.description}</option>
</g:each>
</select>
