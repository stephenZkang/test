/**
 * @class Ext.ux.form.HtmlEditor.Image
 * @extends Ext.util.Observable
 *          <p>
 *          A plugin that creates an image button in the HtmlEditor toolbar for
 *          inserting an image. The method to select an image must be defined by
 *          overriding the selectImage method. Supports resizing of the image
 *          after insertion.
 *          </p>
 *          <p>
 *          The selectImage implementation must call insertImage after the user
 *          has selected an image, passing it a simple image object like the one
 *          below.
 *          </p>
 * 
 * <pre>
 * var img = {
 * 	Width : 100,
 * 	Height : 100,
 * 	ID : 123,
 * 	Title : 'My Image'
 * };
 * </pre>
 */
Ext.ux.form.HtmlEditor.Image = Ext.extend(Ext.util.Observable, {
	// Image language text
	langTitle : '<span style="font-weight:normal">插入图片</span>',
	preURL:window.location.protocol + '//' + window.location.host + '/' + window.location.pathname.split('/')[1]+"/files/",
	urlSizeVars : ['width', 'height'],
	basePath : '',
	init : function(cmp) {
		this.cmp = cmp;
		this.cmp.on('render', this.onRender, this);
		this.cmp.on('initialize', this.onInit, this, {
					delay : 100,
					single : true
				});
	},
	onEditorMouseUp : function(e) {
		Ext.get(e.getTarget()).select('img').each(function(el) {
			var w = el.getAttribute('width'), h = el.getAttribute('height'), src = el
					.getAttribute('src')
					+ ' ';
			src = src.replace(new RegExp(this.urlSizeVars[0]
							+ '=[0-9]{1,5}([&| ])'), this.urlSizeVars[0] + '='
							+ w + '$1');
			src = src.replace(new RegExp(this.urlSizeVars[1]
							+ '=[0-9]{1,5}([&| ])'), this.urlSizeVars[1] + '='
							+ h + '$1');
			el.set({
						src : src.replace(/\s+$/, "")
					});
		}, this);

	},
	onInit : function() {
		Ext.EventManager.on(this.cmp.getDoc(), {
					'mouseup' : this.onEditorMouseUp,
					buffer : 100,
					scope : this
				});
	},
	onRender : function() {
		var btn = this.cmp.getToolbar().addButton({
					iconCls : 'x-edit-image',
					handler : this.selectImage,
					scope : this,
					tooltip : {
						title : this.langTitle
					},
					overflowText : this.langTitle
				});
	},
	selectImage : function() {
		var textAlignLeft = ' text-align: left;';
		var textAlignRight = ' text-align: right;';
		var paddingLeft = ' padding-left: 2px;';
		var paddingRight = ' padding-right: 10px;';
		var marginTop = ' margin-top:5px;';
		var height20 = ' height: 20px;';
		if (!this.imgWindow) {
			this.imgWindow = new Ext.Window({
				title : this.langTitle,
				closeAction : 'hide',
				width : 500,
				height : 200,
				layout : 'fit',
				items : [{
					xtype:'tabpanel',
					ref:'itemTab',
					border:false,
					activeTab: 0,
					items:[{
						title: '本地图片',
				        autoHeight:true,
				        defaults:{border:false},
						id : 'insertLocalImgTab',
						ref: '../insertLocalImgTab',
				        bodyStyle:'padding:5px',
				        items:[{
							xtype : 'form',
							id : 'insertLocalImgForm',
							ref: '../../insertLocalImgForm',
							border : false,
							plain : true,
							fileUpload:true,
							enctype: 'mulitpart/form-data ',
							bodyStyle : 'padding: 10px;',
							labelWidth : 60,
							labelAlign : 'right',
					        layout:'column',
							items : [{
								xtype:'displayfield',
								width: 70,
								style: textAlignRight,
								value:"选择文件："
							},new Ext.ux.form.FileUploadField({
								allowBlank : false,
					            name: "myUpload", 
					            id: "uploadImage", 
								style: height20 + paddingLeft,
					            width: 376,
					            ref:"../../myUpload",
					            emptyText: "请选择文件...",
					            buttonCfg: {text: "浏览..."}
							}),{
								xtype:'displayfield',
								width: 70,
								style: textAlignRight + marginTop + marginTop,
								value:"图片说明："
							},{
								xtype : 'textfield',
								fieldLabel : '图片说明',
								name : 'localName',
								ref:'../../localName',
								maxLength : 100,
								style: height20 + paddingLeft + marginTop,
								width: 380,
								emptyText : '简短的图片说明'
							}]
						}]
					},{
						title: '网络图片',
				        autoHeight:true,
				        defaults:{border:false},
						id : 'insertWebImgTab',
						ref : '../insertWebImgTab',
				        bodyStyle:'padding:5px',
				        items:[{
							xtype : 'form',
							ref: '../../insertWebImgForm',
							border : false,
							plain : true,
							bodyStyle : 'padding: 10px;',
							labelWidth : 60,
							labelAlign : 'right',
							layout:'column',
							items : [{
								xtype:'displayfield',
								width: 70,
								style: textAlignRight,
								value:"图片 URL："
							},{
								xtype:'textfield',
								width: 380,
								style: paddingLeft,
								allowBlank : false,
								ref:'../../webUrl',
								name : 'webUrl',
								emptyText : '请填入URL 例：http://www.fybj365.com/icons/article/login.jpg'
							},{
								xtype:'displayfield',
								width: 70,
								style: textAlignRight + marginTop + marginTop,
								value:"图片说明："
							},{
								xtype : 'textfield',
								fieldLabel : '图片说明',
								ref:'../../webName',
								name : 'webName',
								maxLength : 100,
								style: height20 + paddingLeft + marginTop,
								width: 380,
								emptyText : '简短的图片说明'
							}]
						}]
					}],
					listeners : {
						tabchange: function(tabPanel, panel){
							if( tabPanel.activeTab.id == "insertWebImgTab"){
								tabPanel.webUrl.setValue();
								tabPanel.webName.setValue();
							}else{
								tabPanel.myUpload.setValue();
								tabPanel.localName.setValue();
							}
						}
					}
				}],
				buttons : [{
					text : '插入',
					iconCls : 'acceptIcon',
					handler : function() {
						var activeTab = this.imgWindow.itemTab.getActiveTab();
						var imgHeight = 400, imgWidth = 400;
						if( activeTab.id == "insertWebImgTab"){
							var frm = this.imgWindow.insertWebImgForm.getForm();
							if (frm.isValid()) {
								url = frm.findField('webUrl').getValue();
								if(!this.isUrl(url)){
									Ext.Msg.alert('提示', 'URL不合法.请重新输入.格式[http://****]');
									return;
								};
								var img = {
									Url : frm.findField('webUrl').getValue(),
									ID : 'id_img_9999',
									Title : frm.findField('webName').getValue()
								};
								this.insertImage(img);
								this.imgWindow.hide();
							} else {
								if (!frm.findField('webUrl').isValid()) {
									frm.findField('webUrl').getEl().frame();
								}
							}
						}else{
							var frm = this.imgWindow.insertLocalImgForm.getForm();
							if (frm.isValid()) {
								url = frm.findField('myUpload').getValue();
								if(!this.isImage(url)){
									Ext.Msg.alert('提示', '文件格式不合法.请重新选择文件.格式[后缀名为："png"、"jpg"、"bmp"、"gif"]');
									return;
								}
								var tmp = this;
								frm.submit({
										url: App.baseURL + "/comUpload/uploadFiles",
										waitMsg : '图片上传中...',
										method:'POST',
										async : false,
										params:{pathType: 1},
										success: function(form, action){ 
											var id = action.result.path
											
											var img = {
												Url : ".\\resources\\files\\"+action.result.path,
												ID : 'id_img_9999',
												Title : frm.findField('localName').getValue()
											};
											
											tmp.insertImage(img);
											tmp.imgWindow.hide();
											tmp.imgWindow.itemTab.myUpload.reset();
										},
										failure: function(form, action) {
											Ext.UxMsg.alert({msg:CONST.TIP132});
											tmp.imgWindow.hide();
									    }
									});
							} else {
								if (!frm.findField('myUpload').isValid()) {
									frm.findField('myUpload').getEl().frame();
								}
							}
						}
					},
					scope : this
				}, {
					text : '取消',
					iconCls : 'deleteIcon',
					handler : function() {
						this.imgWindow.hide();
					},
					scope : this
				}],
				listeners : {
					show : {
						fn : function() {
							var activeTab = this.imgWindow.itemTab.getActiveTab();
							if( activeTab.id == "insertWebImgTab"){
								this.imgWindow.itemTab.webUrl.setValue();
								this.imgWindow.itemTab.webName.setValue();
							}else{
								this.imgWindow.itemTab.myUpload.setValue();
								this.imgWindow.itemTab.localName.setValue();
							}
							this.imgWindow.itemTab.setActiveTab('insertLocalImgTab');
						},
						scope : this,
						defer : 350
					}
				}
			});
			this.imgWindow.show();
		} else {
			this.imgWindow.show();
			this.imgWindow.getEl().frame();
		}
	},
	insertImage : function(img) {
		var imgStr = '<img id="'+img.ID+'" src="' + img.Url + '" title="' + img.Title + '" alt="' + img.Title + '"/>'
		this.cmp.insertAtCursor(imgStr);
	},
	isUrl : function(urlString) {
		regExp = /(http[s]?|ftp):\/\/[^\/\.]+?\..+\w$/i;
		if (urlString.match(regExp))
			return true;
		else
			return false;
	},
	isImage: function(urlString){
		var arr = urlString.split(".");
		
		return this.isCompare(arr[arr.length-1]);
	},
	isCompare: function(suffixStr){
		var arr = ['png','jpg','bmp','gif'];
		for(var i = 0; i < arr.length; i++){
			if( arr[i].toUpperCase() == suffixStr.toUpperCase()){
				return true;
			}
		}
	}

});