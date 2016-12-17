<div class="input-group disabled">
	<label for="${property}">${label}</label>
    <div class="photo fileinput fileinput-exists">
		<g:if test="${value && value.toString()}">
        	<span class="fileinput-exists thumbnail" data-field="${value.uri}">
				<img data-src="holder.js/44x44" src="data:image/${value.toString().split('\\.')[-1]};base64,${value.thumbnailBase64}"/>
			</span>
		</g:if>
		<g:else>
        	<span class="fileinput-exists thumbnail"></span>
		</g:else>
    </div>
</div>
