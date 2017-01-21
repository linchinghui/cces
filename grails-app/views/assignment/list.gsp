<g:if test="${params?.by?.equalsIgnoreCase('p')}">
	<g:render template="listByProject"/>
</g:if>
<g:if test="${params?.by?.equalsIgnoreCase('w')}">
	<g:render template="listByWorker"/>
</g:if>
