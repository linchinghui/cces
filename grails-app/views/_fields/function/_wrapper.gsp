<div class="input-group">
  <label for="${property}">${label}<g:if test="${required}"><span class="required-indicator">*</span></g:if></label>
  <select id="${property}" name="${property}" class="combobox" ${required?'required=true':''}>
    <option value="">${placeholder?:'作業代碼或名稱關鍵字'}</option>
    <g:each in="${com.lch.aaa.Function.list()}"><%--
      <option value="${it.id}" ${it==value?'selected':''}>${it.empNo}-${it.empName}</option>--%>
      <option value="${it.id}" ${it==value?'selected':''}>${it.id}: ${it.description}</option>
    </g:each>
  </select><%--
  <g:select name="${property}" value="${value}" required="${required}" class="combobox"
	from="${com.lch.cces.Worker.list()}"
	noSelection="${['':'作業代碼或名稱關鍵字']}"
	optionValue='${{"${it.empNo}-${it.empName}"}}'
	optionKey="id" />
--%>
</div>
<asset:script type='text/javascript'><%-- deferred JS here --%>
$(function() {
  $('#${property}').combobox({
    placeholder: "${placeholder?:'作業代碼或名稱關鍵字'}",
    appendId: 'Combo'
  });
});
</asset:script>
