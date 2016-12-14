<div class="input-group disabled">
	<label for="${property}">${label}</label>
    <div class="photo fileinput fileinput-exists">
        <span class="fileinput-exists thumbnail" ${value && value.toString() ? 'data-field='+value.uri.encodeAsURL() : ''}>
			<g:if test="${value && value.toString()}">
				<img data-src="holder.js/44x44" src="data:image/${value.toString().split('\\.')[-1]};base64,${value.thumbnailBase64}"/>
			</g:if>
		</span>
    </div>
</div>
