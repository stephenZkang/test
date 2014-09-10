<%@ page language="java" contentType="text/html; charset=Utf-8"
    pageEncoding="Utf-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=Utf-8">
<title>Extjs 实例</title>
	<link rel="stylesheet" type="text/css" href="extjs/resources/css/ext-all.css" />
	<script type="text/javascript" src="extjs/ext-all.js"></script>
	<link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap.css" />
	<script type="text/javascript" src="bootstrap/js/jquery-1.8.2.min.js"></script>
	<script type="text/javascript" src="bootstrap/js/bootstrap.min.js"></script>
	<script type="text/javascript">
		//预加载代码,整个页面加载完后才加载这段代码！
		Ext.onReady(function(){
			//提示框,测试是否搭建完成。
			//Ext.MessageBox.alert('Hello World','你好');
			
			//Extjs代码书写区
			//首先，创建一个window
			var win = Ext.create('Ext.window.Window',{
				title: 'hello world',	//窗体的标题
				width: 1000,				//窗体的宽度
				height: 600,			//窗体的高度
				frame: false,			//框架布局
				maximizable: true,
				minimizable: true,
				headerPosition: 'top',	//标题栏的位置
				layout: 'fit',			//窗体的布局(fit为固定布局)
				items: [				//布局在窗体中的组件。
				]
			});
			
			/*
			title: '窗口'：窗体的标题。
			width: 476,height: 374：宽度及高度。
			html: '<div>这里是窗体内容</div>'：窗体内部显示的html内容。
			resizable: true：是否可以调整窗体的大小，这里设置为 true。
			modal: true：是否为模态窗体[什么是模态窗体？当你打开这个窗体以后，如果不能对其他的窗体进行操作，那么这个窗体就是模态窗体，否则为非模态窗体]。
			closable:true：是否可以关闭，也可以理解为是否显示关闭按钮。
			maximizable: true：是否可以最大化，也可以理解为是否显示最大化按钮。
			minimizable: true：是否可以最小化，也可以理解为是否显示最小化按钮。
			*/
			
			win.show();		//显示窗体
			
			//win.hide();		//隐藏窗体
			
			//学习最常用的组件grid,列表存放数据
			//模型Model
			Ext.define('gridModel',{
				extend: 'Ext.data.Model',
				fields: [
				   { name: 'name'},{ name: 'age' },{ name: 'email'},{ name: 'id'}
				]
			});
			
			//存储器，本地加载数据
			var gridStore = Ext.create('Ext.data.Store',{
				model: 'gridModel',
				data: [
					{ name: '内达尔' ,age: 23, email: 'nei@gmail.com'},{ name: '梅西' ,age: 21, email: 'nei@gmail.com'},
					{ name: '齐达内' ,age: 24, email: 'nei@gmail.com'},{ name: '小罗' ,age: 26, email: 'nei@gmail.com'}
				]
			});
			
			
			//列表视图
			var grid = Ext.create('Ext.grid.Panel',{
				store: gridStore,
				height: 260,
				width: 500,
				title: '世界杯十大球星',
				columns:[
					{	text: '姓名',
						width: 160,
						dataIndex: 'name'
					},
					{	text: '年龄',
						width: 160,
						dataIndex: 'age'
					},
					{	text: 'Email',
						width: 120,
						dataIndex: 'email'
					}
				]
			});
			
			//将grid添加到window中
			win.add(grid);
			
			//下面练习Store从后台请求数据，并作分页显示
			var personStore = Ext.create('Ext.data.Store',{
				pageSize:2,
				model: 'gridModel',
				proxy: {
					type: 'ajax',
					url: 'PersonList_list.action',
					reader: {
						type:'json',
						root: 'list',
						totalProperty: 'totalCount'
					},
					listeners:{
						exception: function(proxy, response, operation, eOpts){
							Ext.MessageBox.alert('Hello World','你好');
						}
					}
				}
			});
			personStore.load();
			var personGrid = Ext.create('Ext.grid.Panel',{
				title: '明星大腕,风度飘飘',
				store: personStore,
				width: 500,
				height: 300,
				columns: [
					{	text: '姓名',
						width: 160,
						dataIndex: 'name'
					},
					{	text: '年龄',
						width: 160,
						dataIndex: 'age'
					},
					{	text: 'Email',
						width: 120,
						dataIndex: 'email'
					}
				]
				,bbar: Ext.create('Ext.PagingToolbar', {		//分页插件
		            store: personStore,
		            displayInfo: true,
		            displayMsg: '显示 总数  {0} - {1} of {2}',
		            emptyMsg: "没有数据显示"
		        })
			});
			
			win.add(personGrid);
			
		});
	</script>
</head>
<body>
	<ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu">
	  <li><a tabindex="-1" href="border.jsp">Border布局</a></li>
	  <li><a tabindex="-1" href="anchor.jsp">Anchor布局</a></li>
	  <li><a tabindex="-1"href="accordion.jsp">Accordion布局</a></li>
	  <li class="divider"></li>
	  <li><a tabindex="-1" href="table.jsp">Table布局</a></li>
	</ul>
	
	
	
</body>
</html>