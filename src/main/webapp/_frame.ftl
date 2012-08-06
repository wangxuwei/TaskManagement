<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Task Management</title>
    
    <link rel="stylesheet" type="text/css" href="${_r.contextPath}/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="${_r.contextPath}/bootstrap/css/bootstrap-responsive.min.css">
    <link rel="stylesheet" type="text/css" href="${_r.contextPath}/css/app-all.less.css">
    [@webBundle path="/js/" type="js" /]
    
    [#-- set jsonUrl as the actionResponse and contextPath variables --] 
	[#assign jsonUrl]${_r.contextPath}/_actionResponse.json[/#assign]
		<script type="text/javascript">
		  var jsonUrl = '${_r.contextPath}/_actionResponse.json';	
		  var contextPath = "${_r.contextPath}";
		  var _userId = null;
		  [#if user??]
		  	_userId = ${user.id};
		  [/#if]
		</script>
	[#-- /set jsonUrl as the actionResponse and contextPath variables --]	
  </head>

  <body>
  	<div id="page">
	</div>
  	[#if user??]
  	<script type="text/javascript">
    		$(function(){
				brite.display("MainScreen");
			});
	</script>
    [#else]
    	<script type="text/javascript">
			$(function(){
				brite.display("Login");
			});
		</script>	
    [/#if]
  </body>
</html>