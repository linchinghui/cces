<%@ page import="static com.lch.aaa.Application.*" %>
<%@ page import="com.lch.aaa.*"%>
<%-- <g:set var="authService" bean="authenticationService"/> --%>
<g:set var="lastException" value="${authService.lastException}" scope="request"/>
<g:set var="modalPage" value="${true}" scope="request"/>
<g:set var="loginLink" value="${createLink(controller:PAGE_LOGIN-'/')}"/>
<g:set var="logoutLink" value="${createLink(controller:PAGE_LOGOUT-'/')}"/>
<!DOCTYPE html>
<html>
<head>
  <meta name="layout" content="model"/>
  <title>CCES - 登入</title>
  <asset:stylesheet src="login"/>
  <%-- this page style here: <style type="text/css" media="screen">
  </style> --%>
  <%-- head JS here: <g:javascript>
  </g:javascript> --%>
</head>
<body>
  <div class="container" role="main">
    <div class="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
      <h3><asset:image src="cces_logo.png"/><span class="hidden-xs">&nbsp;工料成本估算系統</span></h3>
    </div>

    <div id="box-login" class="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
      <div class="panel panel-info">
        <div class="panel-heading">
          <div class="panel-title">登入</div>
<%-- TODO
          <div id="label-forgot"><a href="#">密碼忘記了?</a></div>
--%>
        </div>
        <div class="panel-body">
          <g:if test="${lastException}">
              <div class='alert alert-danger'>${lastException.message}</div>
          </g:if>

          <form name="form-signin" class="form-horizontal" role="form" action="${loginLink}" method='POST'>
            <g:if test="${_csrf?.parameterName}">
              <input name='${_csrf?.parameterName}' type='hidden' value='${_csrf?.token}'/>
            </g:if>
            <div class="input-group col-lg-offset-2 col-md-offset-2 col-sm-offset-2 col-xs-offset-1 col-lg-8 col-md-8 col-sm-8 col-xs-10">
              <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
              <input id="username" class="form-control" name="username" value="" placeholder="Username" type="text">
            </div>
            <div class="input-group col-lg-offset-2 col-md-offset-2 col-sm-offset-2 col-xs-offset-1 col-lg-8 col-md-8 col-sm-8 col-xs-10">
              <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
              <input id="password" class="form-control" name="password" placeholder="Password" type="password">
            </div>
            <div class="input-group col-lg-offset-2 col-md-offset-2 col-sm-offset-2 col-xs-offset-1">
              <div class="checkbox">
                <label>
                  <input id="remember-me" name="remember-me" type="checkbox">記住我</input>
                </label>
              </div>
            </div>
            <div class="form-group"><%-- Button --%>
              <div class="controls col-lg-offset-2 col-md-offset-2 col-sm-offset-2 col-xs-offset-1 col-lg-8 col-md-8 col-sm-8 col-xs-10">
                <button name="submit" type="submit" class="btn btn-success"><i class="glyphicon glyphicon-log-in"></i>&nbsp;&nbsp;登入</button>
                <g:if test="${authService.hasAuthenticationException()}">
                    <button name="logout" class="btn btn-success pull-right">重複登入,請先登出&nbsp;&nbsp;<i class="glyphicon glyphicon-log-out"></i></button>
                </g:if>
              </div>
            </div>
<%-- TODO
            <div class="form-group">
              <div class="col-md-12 control">
                <div id="label-signup">
                  <a href="#">申請帳號</a>
                </div>
              </div>
            </div>
--%>
          </form>
        </div>
      </div>
    </div>

    <div id="box-signup" class="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
      <div class="panel panel-info">
        <div class="panel-heading">
          <div class="panel-title">帳號申請</div>
          <div id="label-signin"><a href="#">我要登入</a></div>
        </div>
        <div class="panel-body"><%--
          <g:if test='${flash?.message}'>
              <div class='alert alert-danger'>${flash.message}</div>
          </g:if>
          <g:if test="${lastException}">
              <div class='alert alert-danger'>${lastException.message}</div>
          </g:if>--%>
          <form name="form-signup" class="form-horizontal" role="form" action='/signup' method='POST'>
            <g:if test="${_csrf?.parameterName}">
              <input name='${_csrf?.parameterName}' type='hidden' value='${_csrf?.token}'/>
            </g:if>

            <div class="form-group">
              <label for="email" class="col-md-3 control-label">Email</label>
              <div class="col-md-8">
                <input class="form-control" name="email" placeholder="Email Address" type="text">
              </div>
            </div>
            <div class="form-group">
              <label for="username" class="col-md-3 control-label">帳號</label>
              <div class="col-md-8">
                <input class="form-control" name="username" placeholder="Login Name" type="text">
              </div>
            </div>
            <div class="form-group">
              <label for="password" class="col-md-3 control-label">密碼</label>
              <div class="col-md-8">
                <input class="form-control" name="password" placeholder="Password" type="password">
              </div>
            </div><%--
            <div class="form-group">
              <label for="icode" class="col-md-3 control-label">Invitation Code</label>
              <div class="col-md-8">
                <input class="form-control" name="icode" placeholder="Invitation Code   " type="text">
              </div>
            </div>--%>
            <div class="form-group"><%-- Button --%>
              <div class="col-md-offset-3 col-md-8 controls">
                <button name="submit" type="submit" class="btn btn-info"><i class="glyphicon glyphicon-hand-right"></i>&nbsp;&nbsp;送出</button>
              </div>
            </div> <%-- nothing
            <div class="form-group">
            </div> --%>
          </form>
        </div>
      </div>
    </div>
  </div>
<asset:script type='text/javascript'><%-- deferred JS here --%>
$(function() {
  $('input[name=username]').focus();

  $('#label-signup a').click(function() {
    $('#box-login').hide();
    $('#box-signup').show();
  });

  $('#label-signin a').click(function() {
    $('#box-signup').hide();
    $('#box-login').show();
  });

  $('button[name="logout"]').click(function(){
    $('form[name="form-signin"]').attr('action','${logoutLink}').submit();
  });
});
</asset:script>
</body>

</html>
