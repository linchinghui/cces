<%@ page import="com.lch.aaa.*"%>
<%@ page import="grails.util.*"%>
<%@ page import="org.codehaus.groovy.grails.commons.*"%>
<%@ page import="org.springframework.util.*"%>
<%
def config = Holders.grailsApplication.config
def groupName = params?.group ? new String(params?.group?.decodeBase64()) : null
%>
<aside class="main-sidebar">
  <section class="sidebar"><%--
    <form action="#" method="get" class="sidebar-form">
      <div class="input-group">
        <input type="text" name="q" class="form-control" placeholder="Search...">
        <span class="input-group-btn">
          <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i></button>
        </span>
      </div>
    </form>--%>
    <ul class="sidebar-menu">
      <li class="header"><big>主選單</big></li>
      <g:each var="menuGroup" in="${config?.aaa?.menuGroups}">
        <li class="treeview ${groupName == menuGroup.group ? 'active' : ''}">
          <a href="#">
            <i class="${menuGroup.icon}"></i> <span>${menuGroup.description}</span><i class="fa fa-angle-left pull-right"></i>
          </a>
          <g:if test="${menuGroup.items?.size()>0}">
            <ul class="treeview-menu">
              <g:each var="menuItem" in="${menuGroup.items}">
                <g:set var="function" value="${functionService.get(menuItem.controller)}"/>
                <g:if test="${function}"><%--
                  <% flash[(menuItem.controller)]=function.description %> --%>
                  <g:if test="${! function.aided || authService.privileges.find { it.function.id == menuItem.controller }}">
                    <li class="${controllerName == menuItem.controller ? 'active' : ''}">
                      <g:link controller="${menuItem.controller}" params="${[group: menuGroup.group.encodeAsBase64()]}">
                        <i class="${menuItem.icon}"></i><span>${function.description?.split('-')[0]}</span>
                      </g:link>
                    </li>
                  </g:if>
                </g:if>
              </g:each>
            </ul>
          </g:if>
        </li>
      </g:each>
<%--
      <li class="header">提醒事項</li>
      <li><a href="#"><i class="fa fa-circle-o text-red"></i> <span>Important</span></a></li>
      <li><a href="#"><i class="fa fa-circle-o text-yellow"></i> <span>Warning</span></a></li>
      <li><a href="#"><i class="fa fa-circle-o text-aqua"></i> <span>Information</span></a></li>
--%>
    </ul>
  </section>
</aside>
