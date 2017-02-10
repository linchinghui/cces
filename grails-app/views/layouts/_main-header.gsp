<%@ page import="static com.lch.aaa.Application.*" %><%--
<%@ page import="org.springframework.security.core.context.SecurityContextHolder as SCH" %>--%>
<g:set var="isLoggedIn" value="${authService.isLoggedIn()}"/>
<g:set var="loginLink" value="${createLink(controller:PAGE_LOGIN-'/')}"/>
<g:set var="logoutLink" value="${createLink(controller:PAGE_LOGOUT-'/')}"/>
<g:set var="chPwdLink" value="${createLink(controller:PAGE_PASSWORD-'/')}"/>
      <header class="main-header">
        <a href="${createLink(mapping:'home')}" class="logo">
          <span class="logo-mini"></span><%-- mini logo for sidebar mini 50x50 pixels --%>
          <span class="logo-lg"><small>工料成本估算系統</small></span>
        </a>
        <nav class="navbar navbar-static-top" role="navigation">
          <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </a>
          <div class="navbar-custom-menu">
            <ul class="nav navbar-nav">
<g:if test="${isLoggedIn}"><%-- Notifications: --%>
              <li class="dropdown notifications-menu">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                  <i class="fa fa-bell-o"></i>
                  <span class="label label-warning">10</span>
                </a>
                <ul class="dropdown-menu">
                  <li class="header">You have 10 notifications</li>
                  <li>
                    <ul class="menu">
                      <li>
                        <a href="#">
                          <i class="fa fa-users text-aqua"></i> 5 new members joined today
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="fa fa-warning text-yellow"></i> Very long description here that may not fit into the page and may cause design problems
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="fa fa-users text-red"></i> 5 new members joined
                        </a>
                      </li>

                      <li>
                        <a href="#">
                          <i class="fa fa-shopping-cart text-green"></i> 25 sales made
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="fa fa-user text-red"></i> You changed your username
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li class="footer"><a href="#">View all</a></li>
                </ul>
              </li>
</g:if>
<%-- User Account: --%>
              <li class="dropdown user user-menu">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
				  <g:set var="workerInfo" value="${session['CCES_WORKER_INFO']}"/>
				  <g:if test="${workerInfo.avatar instanceof String}">
					<g:img class="user-image" dir="static/images" file="${workerInfo.avatar}"/>
				  </g:if>
				  <g:else>
					<img class="user-image" src="data:image/${workerInfo.avatar.toString().split('\\.')[-1]};base64,${workerInfo.avatar.thumbnailBase64}"/>
				  </g:else>
				  <span class="hidden-xs">${workerInfo.name}<%--${authService.principal}--%></span>
                </a>
                <ul class="dropdown-menu">
                  <li class="user-header">
                    <p>
                      <g:each in="${authService.authorities}">
                        <small><span class="pull-left">${it.authority}</span><span class="pull-right">${it.description}</span></small><br>
                      </g:each>
                    </p>
                  </li><%-- Body
                  <li class="user-body">
                    <div class="col-xs-? text-center">
                      <a href="???">???</a>
                    </div>
                  </li> --%><%-- Footer--%>
            	  <li class="user-footer">
<g:if test="${isLoggedIn}">
                    <div class="pull-left">
                      <a id="changePassword" href="${chPwdLink}" class="btn btn-default">變更密碼</a>
                    </div>
                    <div class="pull-right">
                      <a id="logout" href="${logoutLink}" class="btn btn-default">登出</a>
                    </div>
</g:if><g:else>
                    <div class="pull-right">
                      <a href="${loginLink}" class="btn btn-default">登入</a>
                    </div>
</g:else>
                  </li>
                </ul>
              </li>
<%-- Control Sidebar Toggle Button --%><%--
              <li>
                <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
              </li>
--%>
            </ul>
          </div>
        </nav>
      </header>
<asset:script type='text/javascript'><%-- deferred JS here --%>
$(function() {
  $('#logout').click(function(evt) {
    evt.preventDefault();
	$('<form>' <%-- enctype="multipart/form-data" --%>
		,{method: 'POST', action: evt.currentTarget.href})
	  .appendTo(document.body)<%--
	  .append('<input type="hidden" name="${_csrf.parameterName}" value="'+Base64.decode(server.xToken)+'">')--%>
	  .submit();
  });

  $('#changePassword').click(function(evt) {
    evt.preventDefault();
    window.location.href = evt.currentTarget.href + '?${PARAMETER_TARGET_URL}=' + decodeURI(window.location.pathname);<%--
	// AJAX way:
    BootstrapDialog.show({ // title: action.title,
      message: requestAction4BootstrapDialog({url: evt.currentTarget.href})
    });--%>
  });
});
</asset:script>
