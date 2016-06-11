<br>
<div class="input-group">
  <label for="${property}">${label}<g:if test="${required}"><span class="required-indicator">*</span></g:if></label>
  <select id="${property}" name="${property}" class="combobox" ${required?'required=true':''}>
    <option value="">輸入車號</option>
    <g:each in="${com.lch.cces.Vehicle.list()}">
      <option value="${it.id}">${it.plateNo}</option>
    </g:each>
  </select>
</div>
<asset:script type='text/javascript'><%-- deferred JS here --%>
$(function() {
  $('#${property}').combobox({
    placeholder: '輸入車號',
    appendId: 'Combo'
  });
});
</asset:script>
