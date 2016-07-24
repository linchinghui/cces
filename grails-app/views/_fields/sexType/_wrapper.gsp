<div class="input-group">
  <label for="${property}">${label}<g:if test="${required}"><span class="required-indicator">*</span></g:if></label>
  <select id="${property}" name="${property}" class="combobox" ${required?'required=true':''}>
    <option value="">M:男 F:女</option>
    <g:each in="${com.lch.cces.SexType.values()}">
      <option value="${it.name()}" ${it==value?'selected':''}>${it}</option>
  </g:each>
  </select><%--
  <g:select name="${property}" value="${value}" required="${required}" class="combobox"
	from="${com.lch.cces.SexType.values()}"
	noSelection="${['':'M:男 F:女']}"
	optionValue='${{it}}'
	optionKey='${{it.name()}}' />
--%>
</div>
<asset:script type='text/javascript'><%-- deferred JS here --%>
$(function() {
  $('#${property}').combobox({
    placeholder: 'M:男 F:女',
    appendId: 'Combo'
  });
});
</asset:script>
