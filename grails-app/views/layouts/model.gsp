<!doctype html>
<html lang="en" class="no-js">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
        <title><g:layoutTitle default="CCES"/></title>
        <link rel="icon" href="${asset.assetPath(src: 'favicon.ico')}">
        <asset:stylesheet src="application"/>
        <g:layoutHead/>
        <asset:stylesheet src="skin/almsaeedstudio"/>
<!--[if lt IE 9]>
        <asset:javascript src="iefix/html5shiv-3.7.3"/>
        <asset:javascript src="iefix/respond-1.4.2"/>
<![endif]-->
    </head>
    <body class="hold-transition skin-blue sidebar-mini">
        <div id="spinner" class="spinner" style="display:none;"><g:message code="spinner.alt" default="Loading&hellip;"/></div>
        <g:layoutBody />
        <asset:javascript src="${((deferredScript?:'') - ~/.js.*$/)?:'application'}"/>
        <asset:deferredScripts/>
        <asset:javascript src="iefix/ie10-viewport"/>
    </body>
</html>
