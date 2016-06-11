<%-- place this in script tag: --%>
<g:if test="${params?.cb}">
  ${formVar}.submit(function (evt) {
    evt.preventDefault();

    $.ajax({
      url: $(this).attr('action'),
      type: $(this).attr('method'), //<%-- $(this).find('input[name="_method"]').val(), --%>
      data: $(this).serializeArray(),
      headers: { callback: true },
      success: transformServerResult(function (response) {
        var callbackFn = window["${new String(params?.cb?.decodeBase64())}"];
        if (typeof callbackFn === 'function') {
          callbackFn.call(null, response, ${formVar});
        }
      }),
      error: transformServerError()
    });
  });
</g:if>
