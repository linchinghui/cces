<br>
<div class="input-group">
  <label for="${property}">${label}</label>
  <select id="${property}" name="${property}" class="selectpicker" multiple>
  <g:each in="${com.lch.aaa.Role.list()}">
    <option value="${it.id}" ${it.id in value*.id ? 'selected' : ''}>${it.description}</option>
  </g:each>
  </select>
</div>
<asset:script type='text/javascript'><%-- deferred JS here --%>
$(function() {
  $('#roles.selectpicker').selectpicker({
    size: 3,
    header: false,
    mobile: true,
    styleBase: 'btn',
    style: 'btn-xs',
    width: 'css-width',
    iconBase: 'fa',
    tickIcon: 'fa-check-square-o pull-left',
    template: {
      caret: ' + '
    },
    title: '',
    selectedTextFormat: 'static',
    noneSelectedText: '',
    noneResultsText: ''
  });<%--
  //$('.bootstrap-select').addClass('open').find('button[data-id="roles"]')
  //.attr('aria-expanded', 'true').hide();
--%>});
</asset:script>