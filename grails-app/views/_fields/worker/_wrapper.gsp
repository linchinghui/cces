<div class="input-group">
  <label for="${property}">${label}<g:if test="${required}"><span class="required-indicator">*</span></g:if></label>
  <select id="${property}" name="${property}" class="combobox form-control" ${required?'required=true':''}>
    <option value="">${placeholder?:'員工編號或姓名關鍵字'}</option>
    <g:each in="${com.lch.cces.Worker.list()}">
      <option value="${it.id}" ${it==value?'selected':''}>${it}</option>
    </g:each>
  </select>
</div>
<asset:script type='text/javascript'><%-- deferred JS here --%>
$(function() {
  $('#${property}').combobox({
    placeholder: "${placeholder?:'員工編號或姓名關鍵字'}",
    appendId: 'Combo'
  });
});
</asset:script>
