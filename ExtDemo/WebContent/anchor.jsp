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
		//form表单
		var form = Ext.create('Ext.form.Panel',{
			border: false,
			fieldDefaults:{
				labelWidth: 55
			},
			url: '',
			defaultType: 'textfield',
			layout: 'anchor',
			bodyPadding: 5,
			items:[{
				fieldLabel: 'Send to',
				name: 'to',
				anchor: '80%'	//文本框占panel宽度百分比
			},{
				fieldLabel: 'Subject',
				name: 'subject',
				anchor: '100%'
			},{
				xtype: 'textarea',
				hideLabel: true,
				name: 'msg',
				anchor: '100%-47'
			}]
		});
		
		var win = Ext.create('Ext.window.Window',{
			title: '员工信息',
			width: 500,
			height: 300,
			minWidth: 300,
			minHeight: 200,
			layout: 'fit',
			plain: true,
			items: form,
			buttons: [{
				text: 'Send'
			},{
				text: 'Cancel'
			}]
		});
		
		win.show();
		
	});
</script>
</head>
<body>

</body>
</html>