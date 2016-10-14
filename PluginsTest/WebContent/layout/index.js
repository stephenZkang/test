/****************************
 * 系统主页
 * index.js
 * QIAOK
 * 2016-09-27
 ****************************/
Ext.define('Ext.ux.main.index', {
	extend: 'Ext.container.Viewport',
	layout: {
		type: 'border'
	},
	
	initComponent: function() {
	  var me = this;
	  /**
	   * 头部用户信息
	   */
	  var userInfo = '<div class=user><span><font color=red size=2>'+me.account+'</font></span></div><span id="newOrder"></span>';
	 /**
	  * 中间内容
	  */
	  var content = Ext.create('Ext.panel.Panel',{
	  	minWidth: 1100,
	  	layout: {
        type: 'fit'
	    },
	    title: '系统说明',
	    html: '<div class=mainindex>'+
	    				'<div class=welinfo><b>您好'+me.account+'，欢迎使用窝聚超市管理系统</b></div>'+
	    				'<div class=xline></div><div class=box></div><div class=welinfo><span><img src=../images/dp.png alt=提醒 /></span>'+
	    				'<b>系统概述</b></div>'+
	    				'<ul class=infolist>'+
	    				'</ul><div class=xline></div><div class=welinfo><span><img src=../images/dp.png alt=提醒 /></span><b>安全提示</b></div>'+
	    				'<ul class=infolist>'+
	    				'</ul>'
	    
		});
	  var contentPanel = Ext.create('Ext.panel.Panel', {
      id: 'f64dcd12-34a8-4684-b21a-03f32a4a38c9',
      region:'center',
      layout:'fit'
    });
    contentPanel.add(content);
    //设置快捷菜单
    var thtml = "";
    var topMenus = me.topMenus;
    for(var i = 0;i< topMenus.length;i++){
    	var topMenu = topMenus[i];
    	thtml = thtml + "<div class=menuMouseOver id=topMenu"+topMenu.menu_id+"><div><img src=../images/icon01.png title=工作台 style=margin-top:10px;/><br>"+topMenu.menu_name+"</div></div>";
    }
    /**
	  * 顶部菜单
	  */
	  var shortcutMenuContainer = Ext.create('Ext.container.Container', {
	  	minWidth: 400,
      region: 'center',
      html: thtml,
      listeners: {  
        'afterrender': function() {  
        	for(var c = 0; c < topMenus.length; c++){
        		var topMenu = topMenus[c];
        		var topMenuById = document.getElementById("topMenu" + topMenu.menu_id);
        		//给每一个菜单添加事件
        		(function(topMenu){  
        			topMenuById.onclick = function() {        
        				if(contentPanel.items.length > 0){
  					  		contentPanel.removeAll(true);
  						  }
          			if(topMenu.menu_action != "" && topMenu.menu_action != null){
      				  	var comp = Ext.create(topMenu.menu_action,{
      				  		title: topMenu.menu_name,
      				  		pageSize: me.pageSize,
      				  		roleId: me.roleId,
      				  		logonUser: me.account
      				  	});
      				  	contentPanel.add(comp);
      			  	}      
              }  
        		})(topMenu);
        	}
        	  
        }  
      }
	  });
	  
	  /**
	   * left 菜单
	   */
	  //功能列表
    var pageMenus = Ext.create('Ext.panel.Panel',{
    	id: 'e37c6b39-2275-429d-bfcd-d3e0cf41f042-index',
    	region: 'west',
      width: 150,
      iconCls: 'menus',
      layout: {
      	type: 'accordion'
      },
      collapsible: true,
      split: true,
      title: '功能列表',
      items: []
    });
    
    var parentMenus = me.parentMenus;
	  for(var i = 0; i< parentMenus.length; i++){
	  	var parentMenu = parentMenus[i];
	  	var parentMenuPanle = Ext.create('Ext.panel.Panel',{ //主菜单
  			id: 'parentMenu' + parentMenu.menu_id,
        title: parentMenu.menu_name,
        collapsed: true,
        iconCls: 'folder',
        layout: {
          type: 'vbox',
          align: 'stretch'
        },
        items: []
  		});
	  	var subMenus = 	me.subMenus;  //子菜单
	  	for(var j = 0; j < subMenus.length; j++){
	  		var subMenu = subMenus[j];
	  		if(parentMenu.menu_id == subMenu.parent){
	  			parentMenuPanle.add({
	  				xtype: 'component',
	          height: 5
	  			});
	  			parentMenuPanle.add({
		  			xtype: 'button',
					  text: subMenu.menu_name,
					  id: 'sonMenu' + subMenu.menu_id,
					  link: subMenu.menu_action,
					  textAlign: 'left',
					  iconAlign: 'left',
					  icon: '../images/loginsj.png',
					  bRoleId: me.roleId,
					  bLogonUser: me.account,
					  bPageSize: me.pageSize,
					  handler: function(button,e) {
					  	if(contentPanel.items.length > 0){
					  		contentPanel.removeAll(true);
						  }
						  if(button.link != "" && button.link != null){
						  	var comp = Ext.create(button.link,{
						  		title: button.text,
						  		pageSize: button.bPageSize,
						  		roleId: button.bRoleId,
						  		logonUser: button.bLogonUser
						  	});
						  	contentPanel.add(comp);
					  	}
					  }
		  		});
	  		}
	  	}
	  	pageMenus.add(parentMenuPanle);
	  }
	  Ext.applyIf(me, {
		  items: [
	      {
	        xtype: 'panel',
	        region: 'north',
	        height: 85,
	        bodyStyle: {
	          background: 'url(../images/beijing.png) repeat'
	        },
	        layout: {
            type: 'border'
	        },
	        items: [
	          {
	          	xtype: 'image',
              height: 85,
              width: 300,
              region: 'west',
              src: '../images/topleft.jpg'
	          },
	          shortcutMenuContainer,   //头部快捷菜单
	          {
              xtype: 'container',
              region: 'east',
              height: 85,
              width: 600,
              layout: {
                type: 'border'
	            },
	            style: {
	  	          background: 'url(../images/beijing.png) repeat'
	  	        },
	            items: [
	                {
	                    xtype: 'container',
	                    region: 'west',
	                    flex: 5,
	                    style: {
	                    	padding: '40px 0px 0px 0px'
	                    },
	                    items: [
	                      {
	                        xtype: 'label',
	                        height: 25,
	                        html: userInfo
	                      }
                      ]
	                },
	                {
	                    xtype: 'container',
	                    region: 'center',
	                    style: {
	      	            	background: 'url(../images/topright.jpg) no-repeat'
	      	            },
	      	            items: [
	                      {
	                        xtype: 'label',
	                        height: 25,
	                        html: "<div class=topright ><ul ><li></li><li><a href='"+App.baseURL+"logout' >退出</a></li></ul></div>"
	                      }
                      ]
	                }
	            ]
	         }
	        ]
	      },
	      pageMenus,  //left 菜单
	      contentPanel
		  ]
	  });
	
	  me.callParent(arguments);
	},
	afterRender:function(){
	 var me = this;
	 me.callParent();
   Ext.TaskManager.start({
      run:  me.lookNewOrder,//执行任务时执行的函数
      interval: 10000//任务间隔，毫秒为单位，这里是10秒
   });//初始化时就启动任务
	},
	lookNewOrder:function(){
	   Ext.Ajax.request({
      url:App.baseURL+"order/isNewList",
      method:'POST',
      success:function(response){
        var json = App.parseJSON(response.responseText);
        if(json && json.success){
      	  var newOrder =  Ext.get('newOrder');
          newOrder.createChild({
            id : 'new-order-alert-sound',
            tag : 'embed',
            src : '../images/sound/newOrder.mp3',
            hidden : true
          });
          var tipWin = Ext.getCmp('win-tip-order');
          if(!tipWin){
            tipWin = Ext.create('Ext.window.Window',{
              title:'<font ><b>通知</b></font>',
              id:'win-tip-order',
              width : '310',
              height : '200',         
              loader : {
              	 padding : '5 0 0 5',
                loadMask : true
              },
              x:1050,
              y:400,
              resizable:false,
              layout:'fit',
              items:[{
                xtype:'panel',
                layout : {
                  type : 'vbox'
                },
                items:[{
                    xtype : 'button',
                    hidden:json.newOnline == 0,
                    id:'win-tip-order-newOnline',
                    text : '<font color=red><b>在线支付新订单【'+json.newOnline+'】</b></font>',
                    textAlign: 'center',
                    iconAlign: 'left',
                    icon: '../images/loginsj.png',
                    width : 300,
                    tooltip : '点击查看新订单列表',
                    scale : 'large',
                    handler : function() {
                      var content = Ext.getCmp('f64dcd12-34a8-4684-b21a-03f32a4a38c9');
                      if(content.items.length > 0){
                        content.removeAll(true);
                      }
                      var comp = Ext.create('Ext.ux.ktlTrade.order.Order');
                      content.add(comp);
                      var sound = Ext.get('new-order-alert-sound');
                      if (sound) {
                        sound.remove();
                      }
                      tipWin.close();
                    }
                  },{
                    xtype : 'button',
                    hidden:json.newCash == 0,
                    id:'win-tip-order-newCash',
                    text : '<font color=red><b>货到付款新订单【'+json.newCash+'】</b></font>',
                    textAlign: 'center',
                    iconAlign: 'left',
                    icon: '../images/loginsj.png',
                    width : 300,
                    tooltip : '点击查看新订单列表',
                    scale : 'large',
                    handler : function() {
                      var content = Ext.getCmp('f64dcd12-34a8-4684-b21a-03f32a4a38c9');
                      if(content.items.length > 0){
                        content.removeAll(true);
                      }
                      var comp = Ext.create('Ext.ux.ktlTrade.order.Order',{
                        activeTab:1
                      });
                      content.add(comp);
                      var sound = Ext.get('new-order-alert-sound');
                      if (sound) {
                        sound.remove();
                      }
                      tipWin.close();
                    }
                  },{
                    xtype : 'button',
                    hidden:json.quit == 0,
                    id:'win-tip-order-quit',
                    text : '<font color=red><b>退货订单【'+json.quit+'】</b></font>',
                    textAlign: 'center',
                    iconAlign: 'left',
                    icon: '../images/loginsj.png',
                    width : 300,
                    tooltip : '点击查看新订单列表',
                    scale : 'large',
                    handler : function() {
                      var content = Ext.getCmp('f64dcd12-34a8-4684-b21a-03f32a4a38c9');
                      if(content.items.length > 0){
                        content.removeAll(true);
                      }
                      var comp = Ext.create('Ext.ux.ktlTrade.order.Order',{
                        activeTab:4
                      });
                      content.add(comp);
                      var sound = Ext.get('new-order-alert-sound');
                      if (sound) {
                        sound.remove();
                      }
                      tipWin.close();
                    }
                  },{
                    xtype : 'button',
                    id:'win-tip-order-cha',
                    hidden:json.cha == 0,
                    text : '<font color=red><b>换货订单【'+json.cha+'】</b></font>',
                    textAlign: 'center',
                    iconAlign: 'left',
                    icon: '../images/loginsj.png',
                    width : 300,
                    tooltip : '点击查看新订单列表',
                    scale : 'large',
                    handler : function() {
                      var content = Ext.getCmp('f64dcd12-34a8-4684-b21a-03f32a4a38c9');
                      if(content.items.length > 0){
                        content.removeAll(true);
                      }
                      var comp = Ext.create('Ext.ux.ktlTrade.order.Order',{
                        activeTab:5
                      });
                      content.add(comp);
                      var sound = Ext.get('new-order-alert-sound');
                      if (sound) {
                        sound.remove();
                      }
                      tipWin.close();
                    }
                  }
                ]
              }]
            });
          }else{
            Ext.getCmp('win-tip-order-newOnline').setText('<font color=red><b>在线支付新订单【'+json.newOnline+'】</b></font>');
            Ext.getCmp('win-tip-order-newCash').setText('<font color=red><b>货到付款新订单【'+json.newCash+'】</b></font>');
            Ext.getCmp('win-tip-order-quit').setText('<font color=red><b>退货订单【'+json.quit+'】</b></font>');
            Ext.getCmp('win-tip-order-cha').setText('<font color=red><b>换货订单【'+json.cha+'】</b></font>');
          }
          tipWin.show();
          Ext.Function.defer(function() {
            var sound = Ext.get('new-order-alert-sound');
            if (sound) {
              sound.remove();
            }
            tipWin.hide();
          }, 1000 * 5);
        }
      },
      failure:App.failureCallback
    });
	}

});