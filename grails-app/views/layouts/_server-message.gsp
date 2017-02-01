<g:if test="${! it}">
  <g:if test="${flash.message}">
    <div class="message" role="status">${flash.message}</div>
  </g:if>
  <g:if test="${flash.errors}">
    <div class="errors" role="alert">${flash.errors}</div>
  </g:if>
  <g:hasErrors bean="${it}">
    <ul class="errors" role="alert">
      <g:eachError bean="${it}" var="error">
        <li <g:if test="${error in org.springframework.validation.FieldError}">data-field-id="${error.field}"</g:if>>
        <g:message error="${error}"/>
        </li>
      </g:eachError>
    </ul>
  </g:hasErrors>
</g:if>
