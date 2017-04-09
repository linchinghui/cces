<g:if test="${params?.by != null && params?.by != 'null'}">
	<g:render template="assignment${params?.by?.endsWith('ly')?'':'By'}${params.by.capitalize()}"/> <%-- model="['assignmentList': assignmentList]"/> --%>
</g:if> <%--
<g:else>  // TODO: alert
</g:else> --%>
