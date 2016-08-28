<div class="input-group">
  <label for="${property}">${label}<g:if test="${required}"><span class="required-indicator">*</span></g:if></label>
  <select id="${property}" name="${property}" class="combobox" ${required?'required=true':''}>
    <option value="">專案代碼或名稱關鍵字</option>
    <g:each in="${com.lch.cces.Project.list()}">
      <option value="${it.id}" ${it==value?'selected':''}>${it.code}-${it.description}</option>
    </g:each>
  </select><%--
  <g:select name="${property}" value="${value}" required="${required}" class="combobox"
	from="${com.lch.cces.Project.list()}"
	noSelection="${['':'專案代碼或名稱關鍵字']}"
	optionValue='${{"${it.code}-${it.description}"}}'
	optionKey="id" />
--%>
</div>
<asset:script type='text/javascript'><%-- deferred JS here --%>
$(function() {
  $('#${property}').combobox({
    placeholder: '專案代碼或名稱關鍵字',
    appendId: 'Combo'
  });
});
</asset:script>
