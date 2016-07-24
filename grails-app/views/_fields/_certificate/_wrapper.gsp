<div class="input-group">
  <label for="${property}">${label}<g:if test="${required}"><span class="required-indicator">*</span></g:if></label>
  <select id="${property}" name="${property}" class="combobox" ${required?'required=true':''}>
    <option value="">證照ID或名稱關鍵字</option>
    <g:each in="${com.lch.cces.Certificate.list()}">
      <option value="${it.id}" ${it==value?'selected':''}>(${it.id}) ${it.name}</option>
    </g:each>
  </select><%--
  <g:select name="${property}" value="${value}" required="${required}" class="combobox"
	from="${com.lch.cces.Certificate.list()}"
	noSelection="${['':'證照ID或名稱關鍵字']}"
	optionValue='${{"(${it.id}) ${it.name}"}}'
	optionKey="id" />
--%>
</div>
<asset:script type='text/javascript'><%-- deferred JS here --%>
$(function() {
  $('#${property}').combobox({
    placeholder: '證照ID或名稱關鍵字',
    appendId: 'Combo'
  });
});
</asset:script>
