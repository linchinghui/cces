<br>
<div class="input-group">
  <label for="${property}">${label}<g:if test="${required}"><span class="required-indicator">*</span></g:if></label>
  <select id="${property}" name="${property}" class="combobox" ${required?'required=true':''}>
    <option value="">工作型態</option>
    <g:each in="${com.lch.cces.ProjectType.values()}">
      <option value="${it.name()}">${it.id}-${it}</option>
  </g:each>
  </select>
</div>
<asset:script type='text/javascript'><%-- deferred JS here --%>
$(function() {
  $('#${property}').combobox({
    placeholder: '工作型態',
    appendId: 'Combo'
  });
});
</asset:script>
