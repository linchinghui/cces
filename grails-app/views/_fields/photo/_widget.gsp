<%--<label for="${property}">${label}</label> --%>
<div class="photo fileinput fileinput-new" data-provides="fileinput">
	<g:if test="${value && value.toString()}">
		<span class="fileinput-new thumbnail" data-field="${value.uri}"><%--.encodeAsURL()--%>
			<img data-src="holder.js/44x44" src="data:image/${value.toString().split('\\.')[-1]};base64,${value.thumbnailBase64}"/>
		</span>
	</g:if>
	<g:else>
		<span class="fileinput-new thumbnail"></span>
	</g:else>
    <span class="fileinput-preview fileinput-exists thumbnail"></span>
	<span>
		<%-- TODO: delete pic on server:
		<a href="#" class="btn btn-default">刪除</a>
		--%>
		<span class="btn btn-default btn-file">
			<span class="fileinput-new">選擇</span>
	        <span class="fileinput-exists">重選</span>

	        <input type="file" name="${property}" />
		</span>
        <a href="#" class="btn btn-default fileinput-exists" data-dismiss="fileinput">清除</a>
	</span>
</div>
