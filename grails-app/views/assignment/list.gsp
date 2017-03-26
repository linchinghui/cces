<g:if test="${params?.by == null || params?.by == 'null'}">
	<g:render template="assignment"/> <%-- model="['assignmentList': assignmentList]"/> --%>
</g:if>
<g:else>
	<g:render template="${params.by}"/> <%-- model="['assignmentList': assignmentList]"/> --%>
</g:else>
