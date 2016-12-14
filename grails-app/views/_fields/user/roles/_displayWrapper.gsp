<div class="input-group">
	<label for="${property}">${label}</label>
	<ul>
<g:each in="${com.lch.aaa.Role.list()}">
	<li><i class="fa fa-${it.id in value*.id?'check-':''}square-o"></i> ${it.id} ${it.description}</li>
</g:each>
	</ul>
</div>
