define("home/index.js", ["common/wx/Cgi.js", "common/wx/dialog.js", "biz_common/moment.js", "biz_common/cookie.js", "common/wx/pagebar.js", "common/wx/popup.js", "common/wx/Tips.js", "common/wx/popover.js"], function(e) {
	"use strict";
	var n = template.render,
		t = e("common/wx/Cgi.js"),
		o = e("common/wx/dialog.js"),
		i = e("biz_common/moment.js"),
		a = e("biz_common/cookie.js"),
		s = e("common/wx/pagebar.js"),
		r = (e("common/wx/popup.js"),
			e("common/wx/Tips.js")),
		c = e("common/wx/popover.js"),
		m = wx.cgiData;
	! function() {
		var e, o, i = $("#js_div_bank_verify"),
			a = new Date(1e3 * wx.cgiData.bank_deadline),
			s = a.getMonth() + 1 + "月" + a.getDate() + "日";
		$("#js_div_bank_deadline").html(s);
		var m, u = !0;
		$("#js_btn_show_bank_verify").length > 0 && (m = new c({
				dom: "#js_btn_show_bank_verify",
				content: n("tpl_bank_verify", {}),
				place: "bottom",
				margin: "center",
				hover: !1
			}), m.hide(), e = $("#js_btn_bank_verify_submit"), o = $("#js_input_bank_verify_code"),
			$("#js_btn_show_bank_verify").on("click", function() {
				u ? m.show() : m.hide(), u = !u;
			}), e.click(function() {
				var n = $.trim(o.val());
				return "" == n ? (r.err("请输入验证码"), !1) : n.length < 6 ? (r.err("验证码为6位数字"), !1) : (e.btn(!1), void t.post({
					url: "/acct/bankacctinfo",
					data: {
						action: "verify",
						code: n
					},
					mask: !1
				}, function(n) {
					e.btn(!0);
					var t = 5;
					0 == n.base_resp.ret ? 1 == n.success ? (r.suc("验证成功，可正常使用公众平台"), m.remove(), i.hide()) : r.err("验证码输入错误，你还有" + n.left_times + "次机会填写，3次错误帐号将被冻结", t) : 91 == n.base_resp.ret ? r.suc("你已经成功验证过打款的备注码，请勿重复验证", t) : 72 == n.base_resp.ret ? r.suc("你已成功验证过打款备注码，请勿重复验证", t) : 63 == n.base_resp.ret ? r.suc("您已经用完3次填写机会，帐号将被冻结", t) : 62 == n.base_resp.ret ? r.suc("您已经多次重填失败，无法再次提交对公帐号信息，帐号将被冻结", t) : 61 == n.base_resp.ret ? r.suc("已经过期，无法提交对公帐号信息，帐号将被冻结", t) : r.err("系统错误，请重试");
				}));
			}));
	}(),
	function() {
		var e = a.get("annual_review_dialog");
		if (1 == m.wxverify_annual_review && !e) {
			a.set("annual_review_dialog", 1, 1, {
				domain: "mp.weixin.qq.com"
			});
			var n;
			n = 1e3 * m.wxverify_expired_time > +new Date ? "你的微信认证即将到期，请尽快进行年审|你好，你的微信认证将于%s到期，请尽快进行认证年审，否则将失去认证标识和相关接口权限——订阅号将无法使用自定义菜单，服务号的高级接口、多客服接口及微信支付接口将被停用。".sprintf("<span class='mini_tips warn'>" + i.unix(m.wxverify_expired_time).format("YYYY年MM月DD日") + "</span>") : "你的微信认证即将到期，请尽快进行年审|你好，请尽快进行认证年审，否则将失去认证标识和相关接口权限——订阅号将无法使用自定义菜单，服务号的高级接口、多客服接口及微信支付接口将被停用。"; {
				o.show({
					type: "info",
					title: "微信认证提示",
					msg: n,
					buttons: [{
						text: "去认证",
						click: function() {
							location.href = wx.url("/acct/wxverify?action=step&t=wxverify/index&step=proto");
						}
					}, {
						text: "取消",
						type: "normal",
						click: function() {
							this.hide();
						}
					}]
				});
			}
		}
	}(),
	function() {
		var e = "hasNotice";
		seajs.use("biz_web/lib/store.js", function(n) {
			n.get(e) || t.get({
				mask: !1,
				url: wx.url("/cgi-bin/sysnotify?f=json&begin=0&count=5")
			}, function(t) {
				if (t && t.base_resp && 0 == t.base_resp.ret && t.Count) {
					for (var o = [], i = t.List, a = t.Count, s = function(e, n) {
						var t = {
								1: "你的群发",
								2: "你的开发者申请",
								3: "你的头像更改",
								4: "你的昵称修改",
								5: "你的功能介绍更改",
								6: "你的信息登记",
								7: "你的信息登记",
								8: "你的信息登记",
								9: "你的信息登记",
								10: "你的信息登记",
								11: "你的自定义菜单申请",
								12: "你的商户功能权限申请",
								14: "微信支付",
								15: "微信支付",
								16: "微信支付",
								18: "微信认证",
								19: "微信认证",
								22: "商户功能初审",
								23: "模板消息申请",
								24: "商品购买测试链接",
								26: "修改商户功能设置"
							},
							o = "";
						return 3 == n ? o = "已经通过审核" : 2 == n && (o = "审核不通过"), "undefined" != typeof t[e] ? t[e] + o : "";
					}, r = 0; a > r; ++r) {
						var c = i[r];
						o.push({
							text: 1 == c.NotifyMsgType ? s(c.CheckType, c.CheckStatus) : c.Title,
							url: wx.url("/cgi-bin/frame?t=notification/index_frame&selectid=" + c.Id)
						});
					}
					seajs.use("common/wx/noticeBox", function(t) {
						new t({
							container: "#accountArea",
							list: o
						}), $("#accountArea .btn_inbox_closed").click(function() {
							n.set(e, 1), $("#accountArea").unbind("mouseover").removeClass("on").find(".account_message_box").remove();
						});
					});
				}
			});
		});
	}(),
	function() {
		{
			var e = wx.cgiData.total_count,
				n = wx.cgiData.count,
				t = wx.cgiData.begin;
			new s({
				container: ".pageNavigator",
				perPage: n,
				first: !1,
				last: !1,
				isSimple: !0,
				initShowPage: t,
				totalItemsNum: e,
				callback: function(e) {
					var n = e.currentPage;
					if (n != t) return n--, location.href = wx.url("/cgi-bin/home?t=home/index&start=" + (n + 1)), !1;
				}
			});
		}
	}();
});