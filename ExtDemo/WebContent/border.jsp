<%@ page language="java" contentType="text/html; charset=Utf-8"
    pageEncoding="Utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=Utf-8">
<link rel="shortcut icon" href="images/logo.png" />
<title>国内新闻</title>
	<link rel="stylesheet" type="text/css" href="extjs/resources/css/ext-all.css" />
	<script type="text/javascript" src="extjs/ext-all.js"></script>
	
	<script type="text/javascript">
		//导入所有js
		Ext.require(['*']);
		Ext.onReady(function(){
			var panel1 = Ext.create("Ext.panel.Panel",{
				title: '功能列表',
				collapsible: true,
				width: 180,
				region:'west',
				items:[
				       ]
			});
			var panel2 = Ext.create("Ext.panel.Panel",{
				title: '排行榜',
				region:'east',			//所在位置
				collapsible: true,		//是否展开
				width:150,
				items:[
				       ]
			});
			
			var panel3 = Ext.create("Ext.panel.Panel",{
				title: '走马观花',
				region:'north',
				collapsible: true,
				height:150,
				items:[
				       ]
			});
			var panel4 = Ext.create("Ext.panel.Panel",{
				title: '数据统计',
				region:'south',
				collapsible: true,
				height:150,
				items:[
				       ]
			});
			var panel5 = Ext.create("Ext.panel.Panel",{
				title: '时事新闻',
				region:'center',
				items:[
				       ]
			});
			
			var win = Ext.create('Ext.Viewport',{
				title: 'Border Layout',	//窗体的标题
				width: 1000,				//窗体的宽度
				height: 600,			//窗体的高度
				frame: false,			//框架布局
				maximizable: true,
				minimizable: true,
				headerPosition: 'top',	//标题栏的位置
				layout: {
					type: 'border',
					padding: '5px'		//修改,边上加5px的空隙
				},			//窗体的布局(fit为固定布局)
				defaults:{
					split: true
				},
				items: [				//布局在窗体中的组件。
				     panel1,panel2,panel3,panel4,panel5
				]
			});
			
			
			win.show();		//显示窗体
			
			
		});
	</script>
</head>
<body>
</body>
</html>