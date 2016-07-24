<div class="input-group">
  <label for="${property}">${label}<g:if test="${required}"><span class="required-indicator">*</span></g:if></label>
  <select id="${property}" name="${property}" class="combobox" ${required?'required=true':''}>
    <option value="">廠牌代碼或名稱關鍵字</option>
    <g:each in="${com.lch.cces.VehicleBrand.list()}">
      <option value="${it.id}" ${it==value?'selected':''}>${it.name}-${it.description}</option>
    </g:each>
  </select><%--
  <g:select name="${property}" value="${value}" required="${required}" class="combobox"
	from="${com.lch.cces.VehicleBrand.list()}"
	noSelection="${['':'廠牌代碼或名稱關鍵字']}"
	optionValue='${{"${it.name}-${it.description}"}}'
	optionKey="id" />
--%>
</div>
<asset:script type='text/javascript'><%-- deferred JS here --%>
$(function() {
  $('#${property}').combobox({
    placeholder: '廠牌代碼或名稱關鍵字',
    appendId: 'Combo'
  });
});
</asset:script>
