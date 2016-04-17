<%-- place this in script tag: --%><%--
<g:if test="${actionName != 'show'}">--%>
  <g:if test="${flash.message}">
    alertMessage({message: "${flash.message}"});
  </g:if>
  <g:if test="${flash.errors}">
    alertMessage({errors: "${flash.errors}"});
  </g:if>
  <g:hasErrors bean="${it}">
    var errors = [
      <g:eachError bean="${it}" var="error">
        {'${error.field}':'<g:message error="${error}"/>'},
      </g:eachError>
      ''];
    alertMessage({errors: errors});
  </g:hasErrors><%--
</g:if>--%>