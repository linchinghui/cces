<!doctype html>
<html lang="en" class="no-js">
    <head>
        <title><g:layoutTitle default="CCES"/></title>
        <g:layoutHead/><%--
        <asset:stylesheet src="..."/>
        <g:javascript>
        </g:javascript>--%>
    </head>
    <body>
        <g:layoutBody />
        <g:if test="${deferredScript}">
            <asset:javascript src="${deferredScript - ~/.js.*$/}"/>
        </g:if>
    </body>
</html>
