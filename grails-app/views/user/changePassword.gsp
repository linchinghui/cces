<%@ page import="static com.lch.aaa.Application.*" %>
<g:if test="${params['cb']}">
    <g:set var="dialogPage" value="${true}" scope="request"/>
    <g:set var="selfStyle" value="${true}" scope="request"/>
</g:if>
<g:else>
    <g:set var="modalPage" value="${true}" scope="request"/>
</g:else>
<g:set var="actionTitle" value="密碼變更"/>
<g:set var="chPwdLink" value="${createLink(controller:PAGE_PASSWORD-'/')}"/>
<!DOCTYPE html>
<html>
<head>
  <meta name="layout" content="model"/>
  <asset:stylesheet src="changePassword"/><%--
  <asset:javascript src="changePassword"/> --%>
<%-- this page style here:
  <style type="text/css" media="screen">
  </style> --%>
<%-- head JS here:
  <g:javascript>
  </g:javascript> --%>
</head>
<body>
  <div class="container" role="main">
    <div id="box-password" class="col-xs-offset-1 col-xs-10 col-sm-offset-3 col-sm-6 col-md-offset-3 col-md-6 col-lg-offset-4 col-lg-5">
      <div class="panel panel-info">
		<g:if test="${modalPage}">
		    <div class="panel-heading">
		        <div class="panel-title">${actionTitle}<button class="close">×</button></div>
		    </div>
		</g:if>
        <div class="panel-body">
			<g:if test="${flash?.message}">
				<%-- class="fa fa-warning text-info" --%>
				<div class='alert alert-info'>${flash.message}</div>
			</g:if>
			<g:if test="${flash?.errors?.size() >0}">
				<div class="alert alert-danger">
					<g:each var="err" in="${flash.errors.values()}">
						<%-- class="fa fa-warning text-danger" --%>
						<div>${err}</div>
					</g:each>
				</div>
			</g:if>
        <form id="form-password" class="form-horizontal" role="form" action="${chPwdLink}" method='POST'>
            <g:if test="${_csrf?.parameterName}">
              <input name="${_csrf?.parameterName}" type='hidden' value="${_csrf?.token}"/>
            </g:if>
            <g:if test="${params[PARAMETER_TARGET_URL]}">
              <input name="${PARAMETER_TARGET_URL}" type='hidden' value="${params[PARAMETER_TARGET_URL]}"/>
            </g:if>
			<g:if test="${dialogPage}">
				<input type="hidden" name="cb" value="${params?.cb}"/>
			</g:if>
            <div class="input-group col-xs-offset-1 col-sm-offset-1 col-md-offset-1 col-lg-offset-1">
			  <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label">原密碼</label>
			  <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
	              <input id="password" name="password" class="form-control" placeholder="原密碼" type="password">
              </div>
            </div>
            <div class="input-group col-xs-offset-1 col-sm-offset-1 col-md-offset-1 col-lg-offset-1">
			  <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label">新密碼</label>
			  <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
	              <input id="newPassword" name="newPassword" class="form-control" placeholder="新密碼" type="password">
	          </div>
            </div>
            <div class="form-group">
              <%-- class="col-xs-offset-1 col-sm-offset-2 col-md-offset-2 col-lg-offset-2 col-xs-10 col-sm-9 col-md-6 col-lg-6 controls" --%>
              <div class="col-xs-offset-1 col-sm-offset-2 col-md-offset-2 col-lg-offset-2 col-xs-10 col-sm-9 col-md-6 col-lg-6 controls">
				<div class="text-left">
					<button type="submit" class="btn btn-primary btn-label-left pull-left"><span><i class="fa fa-check"></i></span>變更</button>
				</div><%--
				<div class="text-right">
					<button name="cancel" class="btn btn-label-left pull-right"><span><i class="fa fa-remove txt-danger"></i></span>取消</button>
				</div>--%>
              </div>
            </div>
        </form>
        </div>
      </div>
    </div>
  </div>
<asset:script type='text/javascript'><%-- deferred JS here --%>
$(function() {
<g:if test="${dialogPage}">
	$('.bootstrap-dialog-title').html('${actionTitle}');
</g:if>
<g:if test="${modalPage}">
	$('button.close').click(function(e){
        window.location.href = "${params[PARAMETER_TARGET_URL]?:createLink(mapping:'home')}";
	});
</g:if>
  $('input[name=password]').focus();
<%--
	$('button[name=cancel]').click(function(e){
        e.preventDefault();
	});
--%><%--
	function encodePwd() {
		$('form input[type="password"]').each(function(){
			if (this.value) {
				var v = Base64.decode(this.value);
				this.value = v;
				$(this).attr('value', v);
			}
		});
	}
	// $('#form-password').submit(function(e) {
	// 	console.log(this);
	// 	e.preventDefault();
	// 	return false;
	// });

	// $('form button[type=submit]').click(function(e){
	//	e.preventDefault();

	// 	var jqxhr = $.ajax({
	// 		type: 'POST',
	// 		url: "${createLink(controller:'authentication', action:'changePassword')}",
	// 		data: {	password: $('input[name=password]').val(),
	// 				newPassword: $('input[name=newPassword]').val()}
	// 	})
	// 	.done(function(resp) {
	// 		if (resp.message == null) {
	// 			CloseModalBox();
	// 		} else {
	// 			showMessage(resp.message);
	// 		}
	// 	})
	// 	.fail(function(resp) {
	// 		showMessage(resp.message);
	// 	});
	// });
--%>
});
</asset:script>
</body>
</html>
