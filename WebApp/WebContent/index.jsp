<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib uri="http://displaytag.sf.net" prefix="display" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>
<%@page import="java.util.*"%>
<%@page import="com.app.TestList"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>测试Display</title>
</head>
<script type="text/javascript">
	function download(){
		window.location.href = "index2.jsp";
	}
</script>
<%
	List<Integer> list = new ArrayList<Integer>();
	list.add(1);list.add(13);list.add(12);list.add(25);
	request.setAttribute("list", list);
	request.setAttribute("test", new TestList(10, false));
%>
<body>
	<input type="button" value="查询" onclick="javascript:download();">
	<input type="button" value="查询" onclick="javascript:window.open('index2.jsp','',500,100);">
	<display:table name="list" id="row" >
		<display:column title="序号">
			<c:out value="${row_rowNum}"/>
		</display:column>
		 <display:column title="Money">
	      <c:out value="${row_value}"/>
	    </display:column>
	</display:table>
	<br/>
	<display:table name="test" id="testit" class="simple" cellpadding="0" cellspacing="0" pagesize="4">
		<display:setProperty name="paging.banner.placement" value="top"/>
	    <display:column property="id" title="ID"/>
	    <display:column property="name" />
	    <display:column title="static value">static</display:column>
	    <display:column title="row number">
	      <c:out value="${testit_rowNum}"/>
	    </display:column>
	    <display:column title="Money">
	      <c:out value="${testit.money}"/>
	    </display:column>
  	</display:table>
</body>
</html>