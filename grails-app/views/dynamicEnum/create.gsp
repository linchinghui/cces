<g:set var="dialogPage" value="${true}" scope="request"/>
<g:set var="selfStyle" value="${true}" scope="request"/>
<!DOCTYPE html>
<html>
    <head>
        <meta name="layout" content="main" />
        <asset:stylesheet src="form/dynamicEnum"/>
    </head>
    <body>
        <div class="container" role="main">
            <div class="panel panel-info">
                <div class="panel-body">
                    <section class="content">
						<form action="#" role="form" class="form-horizontal" name="typeForm" id="typeForm">
                            <fieldset class="form-group">
								<g:each in="${typeConstraints}">
                                    <f:field property="${it.key}" label="${it.value.label}"
										widget-minlength="${it.value.minSize?:0}"
										widget-maxlength="${it.value.maxSize}"
										widget-placeholder="${it.value.minSize?'前'+it.value.minSize+'字元做為識別':'必須輸入'},最長${it.value.maxSize}字元"
										required="${it.value.required}" />
								</g:each>
                            </fieldset>
                            <fieldset class="buttons">
                                <input class="save btn btn-success" type="submit" value="確認" />
                            </fieldset>
                        </form>
                    </section>
                </div>
            </div>
        </div>
<asset:script type='text/javascript'><%-- deferred JS here --%>
$(function() {
    var editForm = $('#typeForm');
    <g:render template="/layouts/client-render" model="[formVar: 'editForm']"/>
	editForm.submit(function (evt) {
		evt.preventDefault();
	<g:if test="${params?.cb}">
		var callbackFn = window["${new String(params?.cb?.decodeBase64())}"];
		if (typeof callbackFn === 'function') {
			callbackFn.call(null, {
			<g:if test="${_csrf?.parameterName}">
				'${_csrf?.parameterName}':'${_csrf?.token}',
			</g:if>
				'type':'${params.type}'
			}, editForm);
		}
	</g:if>
	});
	$('.bootstrap-dialog-title').html('${pageTitle}新增-${typeLabel}');
	setTimeout(function() {
		editForm.find('input[type=text],textarea').filter(':not([name=""]):enabled:visible:first').focus();
	}, 400);
});
</asset:script>
    </body>
</html>
