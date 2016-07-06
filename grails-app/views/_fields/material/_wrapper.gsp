<div class="input-group">
  <label for="${property}">${label}<g:if test="${required}"><span class="required-indicator">*</span></g:if></label>
  <select id="${property}" name="${property}" class="combobox" ${required?'required=true':''}>
    <option value="">材料代碼或名稱關鍵字</option>
    <g:each in="${com.lch.cces.Material.list()}">
      <option value="${it.id}" ${it==value?'selected':''}>(${it.id}) ${it.name}</option>
    </g:each>
  </select>
</div>
<asset:script type='text/javascript'><%-- deferred JS here --%>
$(function() {
  $('#${property}').combobox({
    placeholder: '材料代碼或名稱關鍵字',
    appendId: 'Combo'
  });
});
</asset:script>
