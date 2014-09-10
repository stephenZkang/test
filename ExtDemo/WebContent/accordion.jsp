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
		var item = Ext.create('Ext.Panel',{
			title: '汽车时尚',
			html: '&lt;empty panel&gt;'
		});
		var item1 = Ext.create('Ext.Panel',{
			title: '股票行情',
			html: '&lt;empty panel&gt;'
		});
		var item2 = Ext.create('Ext.Panel',{
			title: '旅游攻略',
			html: '&lt;empty panel&gt;'
		});
		var item3 = Ext.create('Ext.Panel',{
			title: '音乐天地',
			html: '&lt;empty panel&gt;'
		});
		//accordion 折叠式布局
		var accordion = Ext.create('Ext.Panel',{
			region: 'west',
			width: 210,
			split: true,
			layout:{
				type: 'accordion'
			},
			items: [
				item,item1,item2,item3		
			]
		});
		
		Ext.create('Ext.Viewport',{
			title: '可折叠式布局',
			layout: {
				type: 'border',
				padding: 5
			},	//区域布局
			items:[
				accordion,
				{
					region: 'center',
					margin: '0 0 5 0',
					bodyStyle:'background:#f1f1f1',
					html: '<empty Panel>'
				}
			]
		});
		
	});
</script>
</head>
<body>

</body>
</html>