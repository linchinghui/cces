<br>
<div class="input-group">
  <label for="${property}">${label}<g:if test="${required}"><span class="required-indicator">*</span></g:if></label>
  <select id="${property}" name="${property}" class="combobox" ${required?'required=true':''}>
    <option value="">輸入專案代碼</option>
    <g:each in="${com.lch.cces.Project.list()}">
      <option value="${it.id}" ${it==value?'selected':''}>${it.code}-${it.description}</option>
    </g:each>
  </select>
</div>
<asset:script type='text/javascript'><%-- deferred JS here --%>
$(function() {
  $('#${property}').combobox({
    placeholder: '輸入專案代碼',
    appendId: 'Combo'
  });
});
</asset:script>
