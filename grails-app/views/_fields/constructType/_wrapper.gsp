<div class="input-group">
  <label for="${property}">${label}<g:if test="${required}"><span class="required-indicator">*</span></g:if></label>
  <select id="${property}" name="${property}" class="combobox" ${required?'required=true':''}>
    <option value="">${placeholder?:'施作代碼或名稱關鍵字'}</option>
    <g:each in="${com.lch.cces.ConstructType.values()}">
      <option value="${it.name()}" ${it==value?'selected':''}>${it.label}</option>
  	</g:each>
  </select>
</div>
<asset:script type='text/javascript'><%-- deferred JS here --%>
$(function() {
  $('#${property}').combobox({
    placeholder: "${placeholder?:'施作代碼或名稱關鍵字'}",
    appendId: 'Combo'
  });
});
</asset:script>
