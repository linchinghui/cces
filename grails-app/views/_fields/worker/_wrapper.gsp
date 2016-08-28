<div class="input-group">
  <label for="${property}">${label}<g:if test="${required}"><span class="required-indicator">*</span></g:if></label>
  <select id="${property}" name="${property}" class="combobox" ${required?'required=true':''}>
    <option value="">員工編號或姓名關鍵字</option>
    <g:each in="${com.lch.cces.Worker.list()}"><%--
      <option value="${it.id}" ${it==value?'selected':''}>${it.empNo}-${it.empName}</option>--%>
      <option value="${it.id}" ${it==value?'selected':''}>${it.toString()}</option>
    </g:each>
  </select><%--
  <g:select name="${property}" value="${value}" required="${required}" class="combobox"
	from="${com.lch.cces.Worker.list()}"
	noSelection="${['':'員工編號或姓名關鍵字']}"
	optionValue='${{"${it.empNo}-${it.empName}"}}'
	optionKey="id" />
--%>
</div>
<asset:script type='text/javascript'><%-- deferred JS here --%>
$(function() {
  $('#${property}').combobox({
    placeholder: '員工編號或姓名關鍵字',
    appendId: 'Combo'
  });
});
</asset:script>
