<div class="input-group">
  <label for="${property}">${label}<g:if test="${required}"><span class="required-indicator">*</span></g:if></label>
  <select id="${property}" name="${property}" class="combobox" ${required?'required=true':''}>
    <option value="">施作代碼或名稱關鍵字</option>
    <g:each in="${com.lch.cces.ConstructType.values()}">
      <option value="${it.name()}" ${it==value?'selected':''}>${it.id}-${it}</option>
  	</g:each>
  </select><%--
  <g:select name="${property}" value="${value}" required="${required}" class="combobox"
  	from="${com.lch.cces.ConstructType.values()}"
  	noSelection="${['':'施作代碼或名稱關鍵字']}"
  	optionValue='${{"${it.id}-${it}"}}'
  	optionKey='${{it.name()}}' />
--%>
</div>
<asset:script type='text/javascript'><%-- deferred JS here --%>
$(function() {
  $('#${property}').combobox({
    placeholder: '施作代碼或名稱關鍵字',
    appendId: 'Combo'
  });
});
</asset:script>
