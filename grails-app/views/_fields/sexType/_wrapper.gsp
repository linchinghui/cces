<%
def values=com.lch.cces.SexType.values()
def placeHold=values*.label?.join(' ')
%>
<div class="input-group">
  <label for="${property}">${label}<g:if test="${required}"><span class="required-indicator">*</span></g:if></label>
  <select id="${property}" name="${property}" class="combobox" ${required?'required=true':''}>
    <option value="">${placeHold}</option>
    <g:each in="${values}">
      <option value="${it.name()}" ${it==value?'selected':''}>${it.label}</option>
  </g:each>
  </select>
</div>
<asset:script type='text/javascript'><%-- deferred JS here --%>
$(function() {
  $('#${property}').combobox({
    placeholder: '${placeHold}',
    appendId: 'Combo'
  });
});
</asset:script>
