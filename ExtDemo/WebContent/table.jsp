<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>anchor 布局</title>
<link rel="stylesheet" type="text/css" href="extjs/resources/css/ext-all.css" />
<script type="text/javascript" src="extjs/ext-all.js"></script>
	
<script type="text/javascript">
	Ext.require(['*']);
	
	Ext.onReady(function(){
		Ext.create('Ext.Panel',{
			renderTo:Ext.getBody(),
			layout:{
				type: 'table',	//表格布局
				columns: 3		//每行三列
			},
			defaults: {
				frame: true,
				width: 200,
				height: 200
			},
			items: [
				{	title: 'item1'	},{	title: 'item2'	},{	title: 'item3'	},
				{	title: 'item4'	},{	title: 'item6',colspan:2,width:410},	//colspan 两列
				{	title: 'item1'	,colspan:2,width:410},{	title: 'item1'	},
				{	title: 'item5',rowspan: 2,height: 410},{	title: 'item3'	}
				,{	title: 'item3'	},{	title: 'item3',rowspan: 2,height: 410},	//两行
				{	title: 'item3'	},{	title: 'item3'	}
			]
			
		});
		/*
		Ext.create('Ext.Viewport',{
			layout:'fit',
			items: table
		});*/		
	});
</script>
</head>
<body>

</body>
</html>