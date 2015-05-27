(function() {
	top !== window && (alert("For security reasons, framing is not allowed."), top.location.replace(document.location))
}).call(this),
	function() {
		var t, e, n;
		n = function(t) {
			var e, n, i;
			return e = $("meta[name=hostname]").attr("content"), n = null != e ? e.split(".") : void 0, i = t.split("."), null != n && n.slice(-2).join(".") !== i.slice(-2).join(".")
		}, e = "true" === $("meta[name=is-dotcom]").attr("content"), window.isProxySite = function() {
			return n(window.location.hostname) && e
		}, window.isProxySite() && (t = new Error("Potential Proxy site detected"), t.forceReport = !0, t.failbotContext = {
			url: window.location.href
		}, setImmediate(function() {
			throw t
		}))
	}.call(this),
	function() {
		var t, e, n;
		e = function() {
			var t;
			return document.getElementById("js-sudo-prompt") ? Promise.resolve() : (t = document.querySelector("link[rel=sudo-modal]")) ? $.fetch(t.href).then(function(t) {
				return t.text()
			}).then(function(t) {
				return document.body.insertAdjacentHTML("beforeend", t)
			}) : Promise.reject()
		}, t = function() {
			return $.fetch("/sessions/in_sudo.json").then(function(t) {
				return t.json()
			})
		}, n = function() {
			return e().then(function() {
				return $.facebox({
					div: "#js-sudo-prompt"
				}, "sudo")
			}).then(function(t) {
				return new Promise(function(e, n) {
					var i, r;
					return r = null, i = $(t).find(".js-sudo-form"), i.find(".js-sudo-login, .js-sudo-password").first().focus(), i.on("ajaxSuccess", function() {
						return r = !0, $(document).trigger("close.facebox")
					}), i.on("ajaxError", function() {
						return r = !1, $(this).find(".js-sudo-error").text("Incorrect Password.").show(), $(this).find(".js-sudo-password").val(""), !1
					}), $(document).one("afterClose.facebox", function() {
						return r ? e(!0) : n(new Error("sudo prompt canceled"))
					})
				})
			})
		}, $.sudo = function() {
			return t().then(function(t) {
				return t || n()
			})
		}, $(document).on("click", "a.js-sudo-required", function() {
			return $.sudo().then(function(t) {
				return function() {
					return location.href = t.href
				}
			}(this)), !1
		})
	}.call(this),
	function() {
		null == window.GitHub && (window.GitHub = {}),
			function() {
				var t;
				return t = 2
			}()
	}.call(this),
	function(t) {
		t.fn.caret = function(t) {
			return "undefined" == typeof t ? this[0].selectionStart : (this[0].focus(), this[0].setSelectionRange(t, t))
		}, t.fn.caretSelection = function(t, e) {
			return "undefined" == typeof t && "undefined" == typeof e ? [this[0].selectionStart, this[0].selectionEnd] : (this[0].focus(), this[0].setSelectionRange(t, e))
		}
	}(jQuery),
	function(t) {
		t.fn.errorify = function(e, n) {
			t.extend({}, t.fn.errorify.defaults, n);
			return this.each(function() {
				var n = t(this);
				n.removeClass("warn"), n.addClass("errored"), n.find("p.note").hide(), n.find("dd.error").remove(), n.find("dd.warning").remove();
				var i = t("<dd>").addClass("error").text(e);
				n.append(i)
			})
		}, t.fn.errorify.defaults = {}, t.fn.unErrorify = function(e) {
			t.extend({}, t.fn.unErrorify.defaults, e);
			return this.each(function() {
				var e = t(this);
				e.removeClass("errored warn"), e.find("p.note").show(), e.find("dd.error").remove(), e.find("dd.warning").remove()
			})
		}, t.fn.unErrorify.defaults = {}
	}(jQuery),
	function() {
		var t, e;
		t = function(t) {
			return Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = (new Error).stack, this.name = "DataRemoteError", this.message = t
		}, t.prototype = new Error, t.prototype.constructor = t, e = function() {
			return $("#ajax-error-message").show(function() {
				return $(this).addClass("visible")
			})
		}, $(document).on("ajaxError", "[data-remote]", function(n, i, r, s) {
			var a, o, c, u, l, d, h;
			if (this === n.target && "abort" !== s && "canceled" !== s) {
				if (o = "." + this.className.split(" ").sort().join("."), a = new t(s + " (" + i.status + ") from " + o), a.failbotContext = {
					dataRemote: {
						target: $(this).inspect(),
						method: null != (c = null != (u = this.getAttribute("data-method")) ? u : this.getAttribute("method")) ? c : "GET",
						url: null != (l = null != (d = this.href) ? d : this.action) ? l : window.location.href,
						dataType: null != (h = this.getAttribute("data-type")) ? h : "intelligent guess"
					}
				}, /<html/.test(i.responseText)) throw e(), n.stopImmediatePropagation(), a;
				return setTimeout(function() {
					if (!n.isDefaultPrevented()) throw e(), a
				}, 0)
			}
		}), $(document).on("ajaxBeforeSend", "[data-remote]", function() {
			return $("#ajax-error-message").hide().removeClass("visible")
		}), $(document).on("click", ".js-ajax-error-dismiss", function() {
			return $("#ajax-error-message").hide().removeClass("visible"), !1
		})
	}.call(this),
	function() {
		$(document).on("ajaxSend", "[data-remote]", function(t) {
			return this !== t.target || t.isDefaultPrevented() ? void 0 : $(this).addClass("loading")
		}), $(document).on("ajaxComplete", "[data-remote]", function(t) {
			return this === t.target ? $(this).removeClass("loading") : void 0
		})
	}.call(this),
	function() {
		var t, e, n, i, r;
		r = new WeakMap, i = new WeakMap, n = function(t, e) {
			var n;
			return (n = r.get(t)) || (n = new SlidingPromiseQueue, r.set(t, n)), e.value.trim() ? (e.authenticity_token = t.form.elements.authenticity_token.value, n.push($.fetchText(t.getAttribute("data-autocheck-url"), {
				method: "post",
				body: $.param(e),
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				}
			}))) : Promise.reject(new Error("empty"))
		}, e = function(t, e, n) {
			return t.dispatchEvent(new CustomEvent(e, {
				bubbles: !0,
				detail: n
			}))
		}, t = function(t) {
			var r, s, a, o, c, u, l;
			return r = $(t), a = {
				value: t.value
			}, e(t, "autocheck:send", a), o = $.param(a).split("&").sort().join("&"), o !== i.get(t) ? (i.set(t, o), r.closest("dl.form").removeClass("errored successed"), t.classList.remove("is-autocheck-successful", "is-autocheck-errored"), l = function(e) {
				return t.classList.toggle("is-autocheck-loading", e), r.closest("dl.form").toggleClass("is-loading", e)
			}, s = function() {
				return l(!1), e(t, "autocheck:complete")
			}, c = function(n) {
				return t.classList.add("is-autocheck-successful"), r.closest("dl.form").unErrorify().addClass("successed"), e(t, "autocheck:success", n), s()
			}, u = function(n) {
				var i, a;
				return "empty" === n.message ? r.closest("dl.form").unErrorify() : r.is($.visible) && (t.classList.add("is-autocheck-errored"), i = (null != (a = n.response) ? a.text() : void 0) || Promise.resolve("Something went wrong"), i.then(function(n) {
					return /<html/.test(n) && (n = "Something went wrong."), r.closest("dl.form").errorify(n), e(t, "autocheck:error")
				})), s()
			}, l(!0), n(t, a).then(c, u)) : void 0
		}, $(document).on("change", "input[data-autocheck-url]", function() {
			t(this)
		}), $(document).onFocusedInput("input[data-autocheck-url]", function(e) {
			return $(this).on("throttled:input." + e, function() {
				t(this)
			}), !1
		})
	}.call(this),
	function() {
		var t, e = function(t, e) {
			return function() {
				return t.apply(e, arguments)
			}
		};
		new(t = function() {
			function t() {
				this.onNavigationOpen = e(this.onNavigationOpen, this), this.onNavigationKeyDown = e(this.onNavigationKeyDown, this), this.onInputChange = e(this.onInputChange, this), this.onResultsMouseDown = e(this.onResultsMouseDown, this), this.onInputBlur = e(this.onInputBlur, this), this.onInputFocus = e(this.onInputFocus, this);
				var t;
				this.focusedInput = this.focusedResults = null, this.mouseDown = !1, this.fetchQueue = new SlidingPromiseQueue, t = this, $(document).focused(".js-autocomplete-field")["in"](function() {
					return t.onInputFocus(this)
				})
			}
			return t.prototype.bindEvents = function(t, e) {
				return $(t).on("blur", this.onInputBlur), $(t).on("throttled:input", this.onInputChange), $(e).on("mousedown", this.onResultsMouseDown), $(e).on("navigation:open", "[data-autocomplete-value]", this.onNavigationOpen), $(e).on("navigation:keydown", "[data-autocomplete-value]", this.onNavigationKeyDown)
			}, t.prototype.unbindEvents = function(t, e) {
				return $(t).off("blur", this.onInputBlur), $(t).off("throttled:input", this.onInputChange), $(e).off("mousedown", this.onResultsMouseDown), $(e).off("navigation:open", "[data-autocomplete-value]", this.onNavigationOpen), $(e).off("navigation:keydown", "[data-autocomplete-value]", this.onNavigationKeyDown)
			}, t.prototype.onInputFocus = function(t) {
				var e, n;
				e = $(t).closest(".js-autocomplete-container"), n = e.find(".js-autocomplete")[0], this.focusedInput = t, this.focusedResults = n, this.bindEvents(t, n), $(t).attr("autocomplete", "off"), $(t).trigger("autocomplete:focus"), this.fetchResults(t.value)
			}, t.prototype.onInputBlur = function() {
				var t, e;
				t = this.focusedInput, e = this.focusedResults, this.mouseDown || (this.hideResults(), this.inputValue = null, this.focusedInput = this.focusedResults = null, this.unbindEvents(t, e), $(t).trigger("autocomplete:blur"))
			}, t.prototype.onResultsMouseDown = function() {
				var t;
				this.mouseDown = !0, t = function(e) {
					return function() {
						return e.mouseDown = !1, $(document).off("mouseup", t)
					}
				}(this), $(document).on("mouseup", t)
			}, t.prototype.onInputChange = function(t) {
				var e;
				e = t.currentTarget, this.inputValue !== e.value && ($(e).removeAttr("data-autocompleted"), $(e).trigger("autocomplete:autocompleted:changed")), this.fetchResults(e.value)
			}, t.prototype.fetchResults = function(t) {
				var e, n, i, r;
				return (r = this.focusedResults.getAttribute("data-search-url")) ? (e = $(this.focusedInput).closest(".js-autocomplete-container"), i = t.trim() ? (r += ~r.indexOf("?") ? "&" : "?", r += "q=" + encodeURIComponent(t), e.addClass("is-sending"), $.fetchText(r)) : Promise.resolve(""), n = function() {
					return e.removeClass("is-sending")
				}, this.fetchQueue.push(i).then(function(e) {
					return function(n) {
						return $(e.focusedResults).find(".js-autocomplete-results").html(n), e.onResultsChange(t)
					}
				}(this)).then(n, n)) : void 0
			}, t.prototype.onResultsChange = function(t) {
				var e;
				e = $(this.focusedResults).find("[data-autocomplete-value]"), 0 === e.length ? this.hideResults() : this.inputValue !== t && (this.inputValue = t, this.showResults(), $(this.focusedInput).is("[data-autocomplete-autofocus]") && $(this.focusedResults).find(".js-navigation-container").navigation("focus"))
			}, t.prototype.onNavigationKeyDown = function(t) {
				switch (t.hotkey) {
					case "tab":
						return this.onNavigationOpen(t), !1;
					case "esc":
						return this.hideResults(), !1
				}
			}, t.prototype.onNavigationOpen = function(t) {
				var e, n;
				e = t.currentTarget, e.classList.contains("disabled") || (n = $(e).attr("data-autocomplete-value"), this.inputValue = n, $(this.focusedInput).val(n), $(this.focusedInput).attr("data-autocompleted", n), $(this.focusedInput).trigger("autocomplete:autocompleted:changed", [n]), $(this.focusedInput).trigger("autocomplete:result", [n]), $(e).removeClass("active"), this.focusedInput === document.activeElement ? this.hideResults() : this.onInputBlur())
			}, t.prototype.showResults = function(t, e) {
				var n, i, r, s, a;
				return null == t && (t = this.focusedInput), null == e && (e = this.focusedResults), $(e).is($.visible) ? void 0 : (r = $(t).offset(), s = r.top, i = r.left, n = s + $(t).innerHeight(), a = $(t).innerWidth(), $(e).css({
					display: "block",
					position: "absolute",
					width: a + 2
				}), $(e).offset({
					top: n + 5,
					left: i + 1
				}), $(t).addClass("js-navigation-enable"), $(e).find(".js-navigation-container").navigation("push"), $(e).show())
			}, t.prototype.hideResults = function(t, e) {
				return null == t && (t = this.focusedInput), null == e && (e = this.focusedResults), $(e).is($.visible) ? ($(t).removeClass("js-navigation-enable"), $(e).find(".js-navigation-container").navigation("pop"), $(e).hide()) : void 0
			}, t
		}())
	}.call(this),
	function() {
		var t;
		t = new SlidingPromiseQueue, $(document).onFocusedInput(".js-autosearch-field", function(e) {
			$(this).on("throttled:input." + e, function() {
				var e, n, i, r;
				return n = this.form, n.classList.add("is-sending"), e = function() {
					return n.classList.remove("is-sending")
				}, i = $(n).serialize(), r = (n.action + "&" + i).replace(/[?&]/, "?"), t.push($.fetchText(r)).then(function(t) {
					var e, r;
					return r = document.getElementById(n.getAttribute("data-results-container")), r.innerHTML = t, "function" == typeof(e = window.history).replaceState ? e.replaceState(null, "", "?" + i) : void 0
				}).then(e, e)
			})
		})
	}.call(this),
	function() {
		var t, e;
		e = null, t = function() {
			var t, n, i, r, s, a;
			return e && e.abort(), a = $(this).attr("data-item-name"), s = parseInt($(this).attr("data-item-count")) || 0, t = Math.max(0, parseInt(this.value) || 0), n = t > 300, $(".js-purchase-button").prop("disabled", 0 === t || n), $(".js-downgrade-button").prop("disabled", t === s), i = {}, i[a] = t, e = $.ajax({
				url: $(this).attr("data-url"),
				data: i
			}), r = function(t) {
				var e, i, r;
				$(".js-contact-us").toggleClass("hidden", !n), $(".js-payment-summary").toggleClass("hidden", n), e = t.selectors;
				for (i in e) r = e[i], $(i).text(r);
				return window.history.replaceState($.pjax.state, null, t.url)
			}, e.then(r)
		}, $.observe(".js-addon-purchase-field", function() {
			$(this).on("throttled:input", t), t.call($(".js-addon-purchase-field")[0])
		})
	}.call(this),
	function() {
		$(document).on("ajaxSend", ".js-billing-manager-survey", function(t, e) {
			var n;
			return n = $(".js-billing-manager-feedback"), n.find(".default").toggle(), n.find(".loading").toggle(), e.done(function() {
				return n.text(e.responseText)
			}).fail(function() {
				return n.addClass("error"), n.text(e.responseText)
			})
		})
	}.call(this),
	function() {
		$(document).on("submit", ".js-braintree-encrypt", function() {
			var t;
			t = Braintree.create($(this).attr("data-braintree-key")), t.encryptForm(this)
		})
	}.call(this),
	function() {
		var t, e, n, i, r, s, a, o, c, u, l, d, h, f, m, p, g, v, $, b = [].slice,
			j = [].indexOf || function(t) {
				for (var e = 0, n = this.length; n > e; e++)
					if (e in this && this[e] === t) return e;
				return -1
			};
		t = jQuery, t.payment = {}, t.payment.fn = {}, t.fn.payment = function() {
			var e, n;
			return n = arguments[0], e = 2 <= arguments.length ? b.call(arguments, 1) : [], t.payment.fn[n].apply(this, e)
		}, r = /(\d{1,4})/g, i = [{
			type: "maestro",
			pattern: /^(5018|5020|5038|6304|6759|676[1-3])/,
			format: r,
			length: [12, 13, 14, 15, 16, 17, 18, 19],
			cvcLength: [3],
			luhn: !0
		}, {
			type: "dinersclub",
			pattern: /^(36|38|30[0-5])/,
			format: r,
			length: [14],
			cvcLength: [3],
			luhn: !0
		}, {
			type: "laser",
			pattern: /^(6706|6771|6709)/,
			format: r,
			length: [16, 17, 18, 19],
			cvcLength: [3],
			luhn: !0
		}, {
			type: "jcb",
			pattern: /^35/,
			format: r,
			length: [16],
			cvcLength: [3],
			luhn: !0
		}, {
			type: "unionpay",
			pattern: /^62/,
			format: r,
			length: [16, 17, 18, 19],
			cvcLength: [3],
			luhn: !1
		}, {
			type: "discover",
			pattern: /^(6011|65|64[4-9]|622)/,
			format: r,
			length: [16],
			cvcLength: [3],
			luhn: !0
		}, {
			type: "mastercard",
			pattern: /^5[1-5]/,
			format: r,
			length: [16],
			cvcLength: [3],
			luhn: !0
		}, {
			type: "amex",
			pattern: /^3[47]/,
			format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
			length: [15],
			cvcLength: [3, 4],
			luhn: !0
		}, {
			type: "visa",
			pattern: /^4/,
			format: r,
			length: [13, 14, 15, 16],
			cvcLength: [3],
			luhn: !0
		}], e = function(t) {
			var e, n, r;
			for (t = (t + "").replace(/\D/g, ""), n = 0, r = i.length; r > n; n++)
				if (e = i[n], e.pattern.test(t)) return e
		}, n = function(t) {
			var e, n, r;
			for (n = 0, r = i.length; r > n; n++)
				if (e = i[n], e.type === t) return e
		}, h = function(t) {
			var e, n, i, r, s, a;
			for (i = !0, r = 0, n = (t + "").split("").reverse(), s = 0, a = n.length; a > s; s++) e = n[s], e = parseInt(e, 10), (i = !i) && (e *= 2), e > 9 && (e -= 9), r += e;
			return r % 10 === 0
		}, d = function(t) {
			var e;
			return null != t.prop("selectionStart") && t.prop("selectionStart") !== t.prop("selectionEnd") ? !0 : ("undefined" != typeof document && null !== document && null != (e = document.selection) && "function" == typeof e.createRange ? e.createRange().text : void 0) ? !0 : !1
		}, f = function(e) {
			return setTimeout(function() {
				var n, i;
				return n = t(e.currentTarget), i = n.val(), i = t.payment.formatCardNumber(i), n.val(i)
			})
		}, o = function(n) {
			var i, r, s, a, o, c, u;
			return s = String.fromCharCode(n.which), !/^\d+$/.test(s) || (i = t(n.currentTarget), u = i.val(), r = e(u + s), a = (u.replace(/\D/g, "") + s).length, c = 16, r && (c = r.length[r.length.length - 1]), a >= c || null != i.prop("selectionStart") && i.prop("selectionStart") !== u.length) ? void 0 : (o = r && "amex" === r.type ? /^(\d{4}|\d{4}\s\d{6})$/ : /(?:^|\s)(\d{4})$/, o.test(u) ? (n.preventDefault(), i.val(u + " " + s)) : o.test(u + s) ? (n.preventDefault(), i.val(u + s + " ")) : void 0)
		}, s = function(e) {
			var n, i;
			return n = t(e.currentTarget), i = n.val(), e.meta || 8 !== e.which || null != n.prop("selectionStart") && n.prop("selectionStart") !== i.length ? void 0 : /\d\s$/.test(i) ? (e.preventDefault(), n.val(i.replace(/\d\s$/, ""))) : /\s\d?$/.test(i) ? (e.preventDefault(), n.val(i.replace(/\s\d?$/, ""))) : void 0
		}, c = function(e) {
			var n, i, r;
			return i = String.fromCharCode(e.which), /^\d+$/.test(i) ? (n = t(e.currentTarget), r = n.val() + i, /^\d$/.test(r) && "0" !== r && "1" !== r ? (e.preventDefault(), n.val("0" + r + " / ")) : /^\d\d$/.test(r) ? (e.preventDefault(), n.val("" + r + " / ")) : void 0) : void 0
		}, u = function(e) {
			var n, i, r;
			return i = String.fromCharCode(e.which), /^\d+$/.test(i) ? (n = t(e.currentTarget), r = n.val(), /^\d\d$/.test(r) ? n.val("" + r + " / ") : void 0) : void 0
		}, l = function(e) {
			var n, i, r;
			return i = String.fromCharCode(e.which), "/" === i ? (n = t(e.currentTarget), r = n.val(), /^\d$/.test(r) && "0" !== r ? n.val("0" + r + " / ") : void 0) : void 0
		}, a = function(e) {
			var n, i;
			if (!e.meta && (n = t(e.currentTarget), i = n.val(), 8 === e.which && (null == n.prop("selectionStart") || n.prop("selectionStart") === i.length))) return /\d(\s|\/)+$/.test(i) ? (e.preventDefault(), n.val(i.replace(/\d(\s|\/)*$/, ""))) : /\s\/\s?\d?$/.test(i) ? (e.preventDefault(), n.val(i.replace(/\s\/\s?\d?$/, ""))) : void 0
		}, v = function(t) {
			var e;
			return t.metaKey || t.ctrlKey ? !0 : 32 === t.which ? !1 : 0 === t.which ? !0 : t.which < 33 ? !0 : (e = String.fromCharCode(t.which), !!/[\d\s]/.test(e))
		}, p = function(n) {
			var i, r, s, a;
			return i = t(n.currentTarget), s = String.fromCharCode(n.which), /^\d+$/.test(s) && !d(i) ? (a = (i.val() + s).replace(/\D/g, ""), r = e(a), r ? a.length <= r.length[r.length.length - 1] : a.length <= 16) : void 0
		}, g = function(e) {
			var n, i, r;
			return n = t(e.currentTarget), i = String.fromCharCode(e.which), /^\d+$/.test(i) && !d(n) ? (r = n.val() + i, r = r.replace(/\D/g, ""), r.length > 6 ? !1 : void 0) : void 0
		}, m = function(e) {
			var n, i, r;
			return n = t(e.currentTarget), i = String.fromCharCode(e.which), /^\d+$/.test(i) ? (r = n.val() + i, r.length <= 4) : void 0
		}, $ = function(e) {
			var n, r, s, a, o;
			return n = t(e.currentTarget), o = n.val(), a = t.payment.cardType(o) || "unknown", n.hasClass(a) ? void 0 : (r = function() {
				var t, e, n;
				for (n = [], t = 0, e = i.length; e > t; t++) s = i[t], n.push(s.type);
				return n
			}(), n.removeClass("unknown"), n.removeClass(r.join(" ")), n.addClass(a), n.toggleClass("identified", "unknown" !== a), n.trigger("payment.cardType", a))
		}, t.payment.fn.formatCardCVC = function() {
			return this.payment("restrictNumeric"), this.on("keypress", m), this
		}, t.payment.fn.formatCardExpiry = function() {
			return this.payment("restrictNumeric"), this.on("keypress", g), this.on("keypress", c), this.on("keypress", l), this.on("keypress", u), this.on("keydown", a), this
		}, t.payment.fn.formatCardNumber = function() {
			return this.payment("restrictNumeric"), this.on("keypress", p), this.on("keypress", o), this.on("keydown", s), this.on("keyup", $), this.on("paste", f), this
		}, t.payment.fn.restrictNumeric = function() {
			return this.on("keypress", v), this
		}, t.payment.fn.cardExpiryVal = function() {
			return t.payment.cardExpiryVal(t(this).val())
		}, t.payment.cardExpiryVal = function(t) {
			var e, n, i, r;
			return t = t.replace(/\s/g, ""), r = t.split("/", 2), e = r[0], i = r[1], 2 === (null != i ? i.length : void 0) && /^\d+$/.test(i) && (n = (new Date).getFullYear(), n = n.toString().slice(0, 2), i = n + i), e = parseInt(e, 10), i = parseInt(i, 10), {
				month: e,
				year: i
			}
		}, t.payment.validateCardNumber = function(t) {
			var n, i;
			return t = (t + "").replace(/\s+|-/g, ""), /^\d+$/.test(t) ? (n = e(t), n ? (i = t.length, j.call(n.length, i) >= 0 && (n.luhn === !1 || h(t))) : !1) : !1
		}, t.payment.validateCardExpiry = function(e, n) {
			var i, r, s, a;
			return "object" == typeof e && "month" in e && (a = e, e = a.month, n = a.year), e && n ? (e = t.trim(e), n = t.trim(n), /^\d+$/.test(e) && /^\d+$/.test(n) && parseInt(e, 10) <= 12 ? (2 === n.length && (s = (new Date).getFullYear(), s = s.toString().slice(0, 2), n = s + n), r = new Date(n, e), i = new Date, r.setMonth(r.getMonth() - 1), r.setMonth(r.getMonth() + 1, 1), r > i) : !1) : !1
		}, t.payment.validateCardCVC = function(e, i) {
			var r, s;
			return e = t.trim(e), /^\d+$/.test(e) ? i ? (r = e.length, j.call(null != (s = n(i)) ? s.cvcLength : void 0, r) >= 0) : e.length >= 3 && e.length <= 4 : !1
		}, t.payment.cardType = function(t) {
			var n;
			return t ? (null != (n = e(t)) ? n.type : void 0) || null : null
		}, t.payment.formatCardNumber = function(t) {
			var n, i, r, s;
			return (n = e(t)) ? (r = n.length[n.length.length - 1], t = t.replace(/\D/g, ""), t = t.slice(0, +r + 1 || 9e9), n.format.global ? null != (s = t.match(n.format)) ? s.join(" ") : void 0 : (i = n.format.exec(t), null != i && i.shift(), null != i ? i.join(" ") : void 0)) : t
		}
	}.call(this),
	function() {
		var t, e = [].indexOf || function(t) {
			for (var e = 0, n = this.length; n > e; e++)
				if (e in this && this[e] === t) return e;
			return -1
		};
		$.observe(".js-card-select-number-field", {
			add: function() {
				return $(this).payment("formatCardNumber")
			}
		}), $.observe(".js-card-cvv", {
			add: function() {
				return $(this).payment("formatCardCVC")
			}
		}), $.observe(".js-card-select-number-field", function() {
			var t, e, n;
			e = $(this).closest("form"), t = e.find(".js-card"), n = e.find(".js-card-select-type-field"), $(this).on("input", function() {
				var e, i, r, s, a;
				if (a = $(this).val(), s = $.payment.cardType(a))
					for (i = 0, r = t.length; r > i; i++) e = t[i], $(e).toggleClass("enabled", $(e).attr("data-name") === s), $(e).toggleClass("disabled", $(e).attr("data-name") !== s);
				else t.removeClass("enabled disabled");
				n.val(s)
			})
		}), $(document).on("blur", ".js-card-select-number-field", function() {
			return $(this).val($.payment.formatCardNumber($(this).val()))
		}), $(document).on("click", ".js-card", function() {
			var t, e;
			return t = $(this).closest("form"), e = t.find(".js-card-select-number-field"), e.focus()
		}), $(document).on("click", ".js-enter-new-card", function(t) {
			var e, n;
			return e = $(this).closest(".js-setup-creditcard"), n = e.find(".js-card-select-number-field"), e.removeClass("has-credit-card"), n.attr("required", "required"), n.attr("data-encrypted-name", "billing[credit_card][number]"), t.preventDefault()
		}), $(document).on("click", ".js-cancel-enter-new-card", function(t) {
			var e, n;
			return e = $(this).closest(".js-setup-creditcard"), n = e.find(".js-card-select-number-field"), e.addClass("has-credit-card"), n.removeAttr("required"), n.removeAttr("data-encrypted-name"), t.preventDefault()
		}), t = function(t) {
			var n, i, r, s, a, o;
			return i = t.find("option:selected").text(), s = {
				Austria: "ATU000000000",
				Belgium: "BE0000000000",
				Bulgaria: "BG000000000...",
				Croatia: "",
				Cyprus: "CY000000000X",
				"Czech Republic": "CZ00000000...",
				Denmark: "DK00 00 00 00",
				Estonia: "EE000000000",
				Finland: "FI00000000",
				France: "FRXX 000000000",
				Germany: "DE000000000",
				Greece: "EL000000000",
				Hungary: "HU00000000",
				Iceland: "",
				Ireland: "IE...",
				Italy: "IT00000000000",
				Latvia: "LV00000000000",
				Lithuania: "LT000000000...",
				Luxembourg: "LU00000000",
				Malta: "MT00000000",
				Netherlands: "NL000000000B00",
				Norway: "",
				Poland: "PL0000000000",
				Portugal: "PT000000000",
				Romania: "RO...",
				Slovakia: "SK0000000000",
				Slovenia: "",
				Spain: "ES...",
				Sweden: "SE000000000000",
				Switzerland: "",
				"United Kingdom": "GB..."
			}, r = ["Angola", "Antigua and Barbuda", "Aruba", "Bahamas", "Belize", "Benin", "Botswana", "Cameroon", "Comoros", "Congo (Brazzaville)", "Congo (Kinshasa)", "Cook Islands", "C\xf4te d'Ivoire", "Djibouti", "Dominica", "Fiji", "French Southern Lands", "Ghana", "Guyana", "Hong Kong", "Ireland", "Kiribati", "Korea, North", "Malawi", "Maritania", "Mauritius", "Montserrat", "Nauru", "Niue", "Qatar", "Saint Kitts and Nevis", "Saint Lucia", "Sao Tome and Principe", "Seychelles", "Sierra Leone", "Sint Maarten (Dutch part)", "Solomon Islands", "Somalia", "Suriname", "Syria", "Togo", "Tokelau", "Tonga", "United Arab Emirates", "Vanuatu", "Yemen", "Zimbabwe"], a = s[i], $(".js-setup-creditcard").toggleClass("is-vat-country", null != a), o = null != a ? "(" + a + ")" : "", n = t.parents(".js-setup-creditcard").find(".js-vat-help-text"), n.html(o), "United States of America" !== i ? ($(".js-setup-creditcard").addClass("is-international"), $(".js-select-state").removeAttr("required").val("")) : ($(".js-setup-creditcard").removeClass("is-international"), $(".js-select-state").attr("required", "required")), e.call(r, i) >= 0 ? ($(".js-postal-code-form").hide(), $(".js-postal-code-field").removeAttr("required").val("")) : ($(".js-postal-code-form").show(), $(".js-postal-code-field").attr("required", "required"))
		}, $(document).on("change", ".js-select-country", function() {
			return t($(this))
		}), $.observe(".js-select-country", function() {
			t($(this))
		})
	}.call(this),
	function() {
		$(document).on("change", ".js-payment-methods .js-payment-method", function() {
			var t, e;
			return t = $(this).closest(".js-payment-methods"), e = $(this).attr("data-selected-tab"), t.find(".js-selected-payment-method").removeClass("active"), t.find("." + e).addClass("active")
		}), $.observe(".js-selected-payment-method:not(.active)", {
			add: function() {
				return $(this).addClass("has-removed-contents")
			},
			remove: function() {
				return $(this).removeClass("has-removed-contents")
			}
		}), $.observe(".js-billing-payment-methods", function() {
			$(this).removeClass("disabled")
		})
	}.call(this),
	function() {
		var t, e, n = [].indexOf || function(t) {
			for (var e = 0, n = this.length; n > e; e++)
				if (e in this && this[e] === t) return e;
			return -1
		};
		t = ["paypal-loading", "paypal-logged-in", "paypal-logged-out", "paypal-down"], e = function(e) {
			var i, r, s, a, o;
			i = $(e), r = i.closest(".js-payment-methods"), i.find("#braintree-paypal-button").length > 0 || (o = function(e) {
				return r.removeClass(t.join(" ")), n.call(t, e) >= 0 ? r.addClass(e) : void 0
			}, r.data("token") || o("paypal-loading"), a = function() {
				return o("paypal-down")
			}, s = function() {
				return Promise.resolve(r.data("token") || $.ajax("/account/billing/client_token"))
			}, s().then(function(t) {
				var e;
				return r.data("token") || r.data("token", t), e = new Promise(function(e) {
					var n;
					return n = i.find(i.attr("data-nonce-field")), braintree.setup(t, "paypal", {
						displayName: "GitHub",
						container: i,
						paymentMethodNonceInputField: n,
						onSuccess: function() {
							return o("paypal-logged-in"), e()
						}
					})
				}), o("paypal-logged-out"), e.then(function() {
					var t;
					return t = i.find("#bt-pp-cancel"), t.attr("type", "button"), t.on("click", function() {
						return o("paypal-logged-out")
					})
				}, a)
			}, a))
		}, $.observe(".js-paypal-container", e)
	}.call(this),
	function() {
		var t;
		$(document).on("selectmenu:selected", ".js-choose-repo-plan", function() {
			var e, n, i, r, s;
			return e = $(this).closest(".js-plan-chooser"), s = $(this).attr("data-name"), n = "free" === s, r = 0 === Number($(this).attr("data-cost")), e.find(".js-price-label-monthly").html($(this).find(".js-price-monthly").clone()), e.find(".js-price-label-yearly").html($(this).find(".js-price-yearly").clone()), e.find(".js-chosen-plan").val(s), e.toggleClass("on-free", n), t(s), i = $(".js-billing-section").hasClass("has-billing"), $(".js-billing-section").toggleClass("has-removed-contents", r || i)
		}), t = function(t) {
			return $(".js-plan-change-message").addClass("is-hidden"), $(".js-plan-change-message").filter(function() {
				return this.getAttribute("data-name") === t
			}).removeClass("is-hidden")
		}, $.observe(".js-plan-chooser", function() {
			$(".js-choose-repo-plan.selected").trigger("selectmenu:selected")
		})
	}.call(this),
	function() {
		var t, e, n, i, r, s;
		t = 500, s = null, r = null, i = [], e = new Promise(function(t) {
			return $(window).on("load", function() {
				return t()
			})
		}), GitHub.stats = function(s) {
			return i.push(s), e.then(function() {
				return null != r ? r : r = setTimeout(n, t)
			})
		}, n = function() {
			var t;
			return null == s && (s = null != (t = document.querySelector("meta[name=browser-stats-url]")) ? t.getAttribute("content") : void 0), s && !window.isProxySite() ? (r = null, fetch(s, {
				method: "post",
				body: JSON.stringify(i),
				headers: {
					"Content-Type": "application/json"
				}
			}), i = []) : void 0
		}
	}.call(this),
	function() {
		GitHub.stats({
			browserfeatures: {
				classlist: GitHub.support.classList,
				classlist_multi_arg: GitHub.support.classListMultiArg,
				custom_elements: GitHub.support.registerElement,
				emoji: GitHub.support.emoji,
				promise: GitHub.support.Promise,
				request_animation_frame: GitHub.support.requestAnimationFrame,
				setimmediate: GitHub.support.setImmediate,
				url: GitHub.support.URL,
				weakmap: GitHub.support.WeakMap,
				placeholder_input: GitHub.support.placeholder_input,
				placeholder_textarea: GitHub.support.placeholder_textarea,
				closest: GitHub.support.closest,
				matches: GitHub.support.matches,
				custom_event: GitHub.support.CustomEvent,
				fetch: GitHub.support.fetch,
				performance_now: GitHub.support.performanceNow,
				performance_mark: GitHub.support.performanceMark,
				performance_getentries: GitHub.support.performanceGetEntries
			}
		})
	}.call(this),
	function() {
		var t, e;
		e = function() {
			var e, n, i, r, s, a;
			(i = function() {
				try {
					return localStorage.getItem("bundle-urls")
				} catch (t) {}
			}()) && (r = function() {
				try {
					return JSON.parse(i)
				} catch (t) {}
			}()), null == r && (r = {}), a = t();
			try {
				localStorage.setItem("bundle-urls", JSON.stringify(a))
			} catch (o) {}
			return n = function() {
				var t;
				t = [];
				for (e in a) s = a[e], r[e] !== s && t.push(e);
				return t
			}(), n.length ? GitHub.stats({
				downloadedbundles: n
			}) : void 0
		}, t = function() {
			var t, e, n, i, r, s, a, o, c, u, l;
			for (l = {}, o = $("script"), e = 0, i = o.length; i > e; e++) u = o[e], a = u.src.match(/\/([\w-]+)-[0-9a-f]{64}\.js$/), null != a && (t = a[1], l[t + ".js"] = u.src);
			for (c = $("link[rel=stylesheet]"), n = 0, r = c.length; r > n; n++) s = c[n], a = s.href.match(/\/([\w-]+)-[0-9a-f]{64}\.css$/), null != a && (t = a[1], l[t + ".css"] = s.href);
			return l
		}, $(window).on("load", e)
	}.call(this),
	function() {
		$(document).on("click:prepare", ".btn.disabled", function(t) {
			t.preventDefault(), t.stopPropagation()
		})
	}.call(this),
	function() {
		var t, e, n;
		t = function(t) {
			return $(t).closest(".js-check-all-container")[0] || document.body
		}, e = function(t, e, n, i) {
			null == i && (i = !1), e.indeterminate = i, e.checked !== n && (e.checked = n, $(e).fire("change", {
				relatedTarget: t,
				async: !0
			}))
		}, $(document).on("change", "input.js-check-all", function(n) {
			var i, r, s, a, o;
			if (!$(n.relatedTarget).is("input.js-check-all-item")) {
				for (i = $(t(this)), r = i.find("input.js-check-all-item"), s = 0, o = r.length; o > s; s++) a = r[s], e(this, a, this.checked);
				r.removeClass("is-last-changed")
			}
		}), n = null, $(document).on("mousedown", "input.js-check-all-item", function(t) {
			n = t.shiftKey
		}), $(document).on("change", "input.js-check-all-item", function(i) {
			var r, s, a, o, c, u, l, d, h, f, m, p, g, v, b, j;
			if (!$(i.relatedTarget).is("input.js-check-all, input.js-check-all-item")) {
				if (r = $(t(this)), a = r.find("input.js-check-all")[0], s = r.find("input.js-check-all-item"), n && (m = s.filter(".is-last-changed")[0]))
					for (o = s.toArray(), g = [o.indexOf(m), o.indexOf(this)].sort(), b = g[0], l = g[1], v = o.slice(b, +l + 1 || 9e9), d = 0, p = v.length; p > d; d++) f = v[d], e(this, f, this.checked);
				n = null, s.removeClass("is-last-changed"), $(this).addClass("is-last-changed"), j = s.length, u = function() {
					var t, e, n;
					for (n = [], t = 0, e = s.length; e > t; t++) f = s[t], f.checked && n.push(f);
					return n
				}().length, c = u === j, h = j > u && u > 0, e(this, a, c, h)
			}
		}), $(document).on("change", "input.js-check-all-item", function() {
			var e, n, i;
			e = $(t(this)), n = e.find(".js-check-all-count"), n.length && (i = e.find("input.js-check-all-item:checked").length, n.text(i))
		})
	}.call(this),
	function() {
		var t;
		null == window.GitHub && (window.GitHub = {}), window.GitHub.assetHostUrl = null != (t = $("link[rel=assets]").prop("href")) ? t : "/"
	}.call(this),
	function() {
		var t, e, n, i, r, s, a, o;
		i = function(t) {
			var e;
			return e = document.createElement("span"), e.style.position = "absolute", e.style.left = "-10000px", e.textContent = t, e
		}, e = function(t) {
			var e, n;
			return n = getSelection(), n.removeAllRanges(), e = document.createRange(), e.selectNodeContents(t), n.addRange(e), document.execCommand("copy"), n.removeAllRanges()
		}, n = function(t) {
			var n;
			return n = i(t), document.body.appendChild(n), e(n), document.body.removeChild(n)
		}, t = function(t) {
			return t.select(), document.execCommand("copy"), getSelection().removeAllRanges()
		}, r = function(t, e, n) {
			var i;
			return t.addEventListener(e, i = function() {
				return t.removeEventListener(e, i), n.apply(this, arguments)
			})
		}, $(document).on("click", ".is-copy-enabled .js-zeroclipboard", function() {
			var i, s, o, c, u;
			(u = this.getAttribute("data-clipboard-text")) ? n(u): (i = this.closest(".js-zeroclipboard-container"), s = i.querySelector(".js-zeroclipboard-target"), a(s) ? "hidden" === s.type ? n(s.value) : t(s) : e(s)), o = this.getAttribute("data-copied-hint"), c = this.getAttribute("aria-label"), o && o !== c && (this.setAttribute("aria-label", o), r(this, "mouseleave", function() {
				return null != c ? this.setAttribute("aria-label", c) : this.removeAttribute("aria-label")
			})), this.blur()
		}), a = function(t) {
			return "INPUT" === t.nodeName || "TEXTAREA" === t.nodeName
		}, document.documentElement.classList.contains("is-copy-enabled") || (ZeroClipboard.config({
			swfPath: GitHub.assetHostUrl + "flash/ZeroClipboard.v" + ZeroClipboard.version + ".swf",
			trustedOrigins: [location.hostname],
			flashLoadTimeout: 1e4,
			cacheBust: null != (o = /MSIE/.test(navigator.userAgent) || /Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/.test(navigator.userAgent)) ? o : {
				"true": !1
			}
		}), $.observe("button.js-zeroclipboard", s = function(t) {
			var e, n, i;
			i = new ZeroClipboard(t), i.on("copy", function(t) {
				var e, n, i, r, s;
				return e = t.target, null == e.getAttribute("data-clipboard-text") && null == e.getAttribute("data-clipboard-target") ? (r = $(e).closest(".js-zeroclipboard-container").find(".js-zeroclipboard-target")[0], r ? (s = a(r) ? r.value : r.textContent, n = t.clipboardData, n.setData("text/plain", s.trim())) : (i = new Error("source of clipboard text not found"), i.failbotContext = {
					eventType: "copy",
					eventTarget: e
				}, setImmediate(function() {
					throw i
				}))) : void 0
			}), i.on("aftercopy", function() {
				var t;
				return t = $(this).attr("data-copied-hint"), $("#global-zeroclipboard-html-bridge").attr("aria-label", t || "Copied!")
			}), i.on("error", function() {
				return $("#global-zeroclipboard-html-bridge, .js-zeroclipboard").remove()
			}), n = function() {
				var t;
				return this.classList.remove("tooltipped", "tooltipped-s"), t = $(this).attr("aria-label"), $("#global-zeroclipboard-html-bridge").addClass("tooltipped tooltipped-s").attr("aria-label", t || "Copy to clipboard.")
			}, e = function() {
				return $("#global-zeroclipboard-html-bridge").removeClass("tooltipped tooltipped-s")
			}, $(t).hover(n, e)
		}))
	}.call(this),
	function() {
		$(document).on("ajaxBeforeSend", ".js-new-comment-form", function(t) {
			return this === t.target && $(this).data("remote-xhr") ? !1 : void 0
		}), $(document).on("ajaxSend", ".js-new-comment-form", function(t) {
			return this === t.target ? $(this).find(".js-comment-form-error").hide() : void 0
		}), $(document).on("ajaxSuccess", ".js-new-comment-form", function(t, e, n, i) {
			var r, s, a, o;
			if (this === t.target) {
				this.reset(), $(this).find(".js-comment-field").trigger("validation:field:change"), $(this).find(".js-write-tab").click(), a = i.updateContent;
				for (o in a) s = a[o], r = $(o), r[0] || console.warn("couldn't find " + o + " for immediate update"), r.updateContent(s)
			}
		}), $(document).on("ajaxError", ".js-new-comment-form", function(t, e) {
			var n, i;
			if (this === t.target) return i = "Sorry! We couldn't save your comment", 422 === e.status && (n = JSON.parse(e.responseText), n.errors && (i += " \u2014 your comment ", i += " " + n.errors.join(", "))), i += ". ", i += "Please try again.", $(this).find(".js-comment-form-error").show().text(i), !1
		})
	}.call(this),
	function() {
		$.observe(".js-comment-and-button", function() {
			var t, e, n, i, r;
			return t = this, e = t.form.querySelector(".js-comment-field"), n = t.textContent, r = !1, i = function() {
				var e;
				return e = this.value.trim(), e !== r ? (r = e, t.textContent = e ? t.getAttribute("data-comment-text") : n) : void 0
			}, {
				add: function() {
					return $(e).on("input change", i)
				},
				remove: function() {
					return $(e).off("input change", i)
				}
			}
		})
	}.call(this),
	function() {
		$(document).on("click", ".js-comment-edit-button", function() {
			var t;
			return t = $(this).closest(".js-comment"), t.addClass("is-comment-editing"), t.find(".js-write-tab").click(), t.find(".js-comment-field").focus().trigger("change"), !1
		}), $(document).on("click", ".js-comment-cancel-button", function() {
			var t;
			return t = $(this).closest("form"), t.hasDirtyFields() && !confirm($(this).attr("data-confirm-text")) ? !1 : (t[0].reset(), $(this).closest(".js-comment").removeClass("is-comment-editing"), !1)
		}), $(document).on("ajaxSend", ".js-comment-delete, .js-comment-update, .js-issue-update", function(t, e) {
			var n, i;
			if (t.target === t.currentTarget) return i = $(this).closest(".js-comment"), i.addClass("is-comment-loading"), i.find(".btn-sm").addClass("disabled"), (n = i.attr("data-body-version")) ? e.setRequestHeader("X-Body-Version", n) : void 0
		}), $(document).on("ajaxError", ".js-comment-update", function(t, e, n, i) {
			var r, s, a, o;
			if (t.target === t.currentTarget && (console.error("ajaxError for js-comment-update", i), 422 === e.status)) try {
				if (a = JSON.parse(e.responseText), s = $(this).closest(".js-comment"), a.stale) return e.stale = !0, s.addClass("is-comment-stale"), s.find(".btn-sm").addClass("disabled"), t.preventDefault();
				if (a.errors) return o = "There was an error posting your comment: " + a.errors.join(", "), s.find(".js-comment-update-error").text(o).show(), t.preventDefault()
			} catch (r) {
				return r = r, console.error("Error trying to handle ajaxError for js-comment-update: " + r)
			}
		}), $(document).on("ajaxComplete", ".js-comment-delete, .js-comment-update", function(t, e) {
			var n;
			if (t.target === t.currentTarget) return n = $(this).closest(".js-comment"), n.removeClass("is-comment-loading"), n.find(".btn-sm").removeClass("disabled"), e.stale ? n.find(".form-actions button[type=submit].btn-sm").addClass("disabled") : void 0
		}), $(document).on("ajaxSuccess", ".js-comment-delete", function() {
			var t, e;
			return t = $(this).closest(".js-comment"), e = $(this).closest(".js-comment-container"), 1 !== e.find(".js-comment").length && (e = t), e.fadeOut(function() {
				return t.remove()
			})
		}), $(document).on("ajaxSuccess", ".js-comment-update", function(t, e, n, i) {
			var r, s, a, o, c, u;
			if (t.target === t.currentTarget) {
				for (r = $(this).closest(".js-comment"), s = $(this).closest(".js-comment-container"), s.length || (s = r), r.find(".js-comment-body").html(i.body), r.find(".js-comment-update-error").hide(), r.attr("data-body-version", i.newBodyVersion), u = r.find("input, textarea"), o = 0, c = u.length; c > o; o++) a = u[o], a.defaultValue = a.value;
				return r.removeClass("is-comment-editing")
			}
		}), $(document).on("ajaxSuccess", ".js-issue-update", function(t, e, n, i) {
			var r, s, a, o, c, u, l, d;
			for (a = this, r = a.closest(".js-details-container"), r.classList.remove("open"), null != i.issue_title && (r.querySelector(".js-issue-title").textContent = i.issue_title, c = r.closest(".js-issues-results"), l = c.querySelector(".js-merge-pull-request textarea"), l && l.value === l.defaultValue && (l.value = l.defaultValue = i.issue_title)), document.title = i.page_title, d = a.elements, o = 0, u = d.length; u > o; o++) s = d[o], s.defaultValue = s.value
		})
	}.call(this),
	function() {
		$(document).on("focusin", ".js-write-bucket", function() {
			return $(this).addClass("focused")
		}), $(document).on("focusout", ".js-write-bucket", function() {
			return $(this).removeClass("focused")
		})
	}.call(this),
	function() {
		$(document).onFocusedKeydown(".js-comment-field", function() {
			return function(t) {
				return "ctrl+L" === t.hotkey || "meta+L" === t.hotkey ? (window.location = "#fullscreen_" + this.id, !1) : void 0
			}
		})
	}.call(this),
	function() {
		var t, e, n, i, r, s, a, o;
		o = function(t) {
			return t.closest("form").elements.authenticity_token.value
		}, t = function(t) {
			var e, n, i, r, s;
			return e = t.closest(".js-previewable-comment-form"), n = t.classList.contains("js-preview-tab"), n && (r = e.querySelector(".js-write-bucket"), i = e.querySelector(".js-preview-body"), i.style.minHeight = $(r).height() + "px"), e.classList.toggle("preview-selected", n), e.classList.toggle("write-selected", !n), e.querySelector(".tabnav-tab.selected").classList.remove("selected"), t.classList.add("selected"), s = e.querySelector(".js-write-tab"), n ? s.setAttribute("data-hotkey", "ctrl+P,meta+P") : s.removeAttribute("data-hotkey"), Promise.resolve(e)
		}, $(document).on("click", ".js-write-tab", function() {
			return t(this).then(function(t) {
				return t.querySelector(".js-comment-field").focus()
			}), !1
		}), $(document).on("click", ".js-preview-tab", function(e, n) {
			return t(this).then(function(t) {
				return a(t, n || new Date)
			}), !1
		}), s = new SlidingPromiseQueue, r = new WeakMap, i = !1, e = function(t, e) {
			var a, o, c;
			return (a = r.get(t)) && (o = a[0], c = a[1]), o !== e && (i = !1, c = s.push(n(t, e)), c.then(function() {
				return i = !0
			}), r.set(t, [e, c])), c
		}, n = function(t, e) {
			var n;
			return n = t.getAttribute("data-preview-url"), $.fetchText(n, {
				method: "POST",
				body: $.param({
					text: e,
					authenticity_token: o(t)
				}),
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				}
			})
		}, a = function(t, n) {
			var r, s;
			return s = t.querySelector(".js-comment-field"), r = t.querySelector(".comment-body"), e(t, s.value).then(function(t) {
				var e;
				return r.innerHTML = t || "<p>Nothing to preview</p>", e = new Date - n, GitHub.stats({
					preview_delay: {
						ms: e,
						background: !1
					}
				})
			}), i ? void 0 : r.innerHTML = "<p>Loading preview&hellip;</p>"
		}, $.observe(".js-preview-tab", function() {
			var t, n;
			n = this.closest(".js-previewable-comment-form"), t = n.querySelector(".js-comment-field"), $(this).on("mouseenter", function() {
				return e(n, t.value)
			})
		}), $(document).onFocusedKeydown(".js-comment-field", function() {
			var t;
			return t = this.closest(".js-previewable-comment-form"),
				function(e) {
					var n, i;
					return "ctrl+P" !== e.hotkey && "meta+P" !== e.hotkey || !t.classList.contains("write-selected") ? void 0 : (i = new Date, this.blur(), n = t.querySelector(".preview-tab"), $(n).trigger("click", i), e.stopImmediatePropagation(), !1)
				}
		})
	}.call(this),
	function() {
		$(document).on("pjax:send", ".context-loader-container", function() {
			var t;
			return t = $(this).find(".context-loader").first(), t.length ? t.addClass("is-context-loading") : $(".page-context-loader").addClass("is-context-loading")
		}), $(document).on("pjax:complete", ".context-loader-container", function(t) {
			return $(t.target).find(".context-loader").first().removeClass("is-context-loading"), $(".page-context-loader").removeClass("is-context-loading"), $(document.body).removeClass("disables-context-loader")
		}), $(document).on("pjax:timeout", ".context-loader-container", function() {
			return !1
		})
	}.call(this),
	function() {
		$.hashChange(function(t) {
			var e;
			return e = window.location.hash.slice(1), e && /\/(issues|pulls?)\/\d+/.test(t.newURL) ? GitHub.stats({
				conversation_anchor: {
					anchor: e,
					matches_element: t.target !== window
				}
			}) : void 0
		})
	}.call(this),
	/**
	 * jquery.Jcrop.js v0.9.12
	 * jQuery Image Cropping Plugin - released under MIT License
	 * Author: Kelly Hallman <khallman@gmail.com>
	 * http://github.com/tapmodo/Jcrop
	 * Copyright (c) 2008-2013 Tapmodo Interactive LLC {{{
	 *
	 * Permission is hereby granted, free of charge, to any person
	 * obtaining a copy of this software and associated documentation
	 * files (the "Software"), to deal in the Software without
	 * restriction, including without limitation the rights to use,
	 * copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the
	 * Software is furnished to do so, subject to the following
	 * conditions:
	 *
	 * The above copyright notice and this permission notice shall be
	 * included in all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	 * OTHER DEALINGS IN THE SOFTWARE.
	 *
	 * }}}
	 */
	function(t) {
		t.Jcrop = function(e, n) {
			function i(t) {
				return Math.round(t) + "px"
			}

			function r(t) {
				return P.baseClass + "-" + t
			}

			function s() {
				return t.fx.step.hasOwnProperty("backgroundColor")
			}

			function a(e) {
				var n = t(e).offset();
				return [n.left, n.top]
			}

			function o(t) {
				return [t.pageX - q[0], t.pageY - q[1]]
			}

			function c(e) {
				"object" != typeof e && (e = {}), P = t.extend(P, e), t.each(["onChange", "onSelect", "onRelease", "onDblClick"], function(t, e) {
					"function" != typeof P[e] && (P[e] = function() {})
				})
			}

			function u(t, e, n) {
				if (q = a(z), me.setCursor("move" === t ? t : t + "-resize"), "move" === t) return me.activateHandlers(d(e), g, n);
				var i = de.getFixed(),
					r = h(t),
					s = de.getCorner(h(r));
				de.setPressed(de.getCorner(r)), de.setCurrent(s), me.activateHandlers(l(t, i), g, n)
			}

			function l(t, e) {
				return function(n) {
					if (P.aspectRatio) switch (t) {
						case "e":
							n[1] = e.y + 1;
							break;
						case "w":
							n[1] = e.y + 1;
							break;
						case "n":
							n[0] = e.x + 1;
							break;
						case "s":
							n[0] = e.x + 1
					} else switch (t) {
						case "e":
							n[1] = e.y2;
							break;
						case "w":
							n[1] = e.y2;
							break;
						case "n":
							n[0] = e.x2;
							break;
						case "s":
							n[0] = e.x2
					}
					de.setCurrent(n), fe.update()
				}
			}

			function d(t) {
				var e = t;
				return pe.watchKeys(),
					function(t) {
						de.moveOffset([t[0] - e[0], t[1] - e[1]]), e = t, fe.update()
					}
			}

			function h(t) {
				switch (t) {
					case "n":
						return "sw";
					case "s":
						return "nw";
					case "e":
						return "nw";
					case "w":
						return "ne";
					case "ne":
						return "sw";
					case "nw":
						return "se";
					case "se":
						return "nw";
					case "sw":
						return "ne"
				}
			}

			function f(t) {
				return function(e) {
					return P.disabled ? !1 : "move" !== t || P.allowMove ? (q = a(z), ie = !0, u(t, o(e)), e.stopPropagation(), e.preventDefault(), !1) : !1
				}
			}

			function m(t, e, n) {
				var i = t.width(),
					r = t.height();
				i > e && e > 0 && (i = e, r = e / t.width() * t.height()), r > n && n > 0 && (r = n, i = n / t.height() * t.width()), ee = t.width() / i, ne = t.height() / r, t.width(i).height(r)
			}

			function p(t) {
				return {
					x: t.x * ee,
					y: t.y * ne,
					x2: t.x2 * ee,
					y2: t.y2 * ne,
					w: t.w * ee,
					h: t.h * ne
				}
			}

			function g() {
				var t = de.getFixed();
				t.w > P.minSelect[0] && t.h > P.minSelect[1] ? (fe.enableHandles(), fe.done()) : fe.release(), me.setCursor(P.allowSelect ? "crosshair" : "default")
			}

			function v(t) {
				if (P.disabled) return !1;
				if (!P.allowSelect) return !1;
				ie = !0, q = a(z), fe.disableHandles(), me.setCursor("crosshair");
				var e = o(t);
				return de.setPressed(e), fe.update(), me.activateHandlers($, g, "touch" === t.type.substring(0, 5)), pe.watchKeys(), t.stopPropagation(), t.preventDefault(), !1
			}

			function $(t) {
				de.setCurrent(t), fe.update()
			}

			function b() {
				var e = t("<div></div>").addClass(r("tracker"));
				return M && e.css({
					opacity: 0,
					backgroundColor: "white"
				}), e
			}

			function j(t) {
				Y.removeClass().addClass(r("holder")).addClass(t)
			}

			function y(t, e) {
				function n() {
					window.setTimeout($, d)
				}
				var i = t[0] / ee,
					r = t[1] / ne,
					s = t[2] / ee,
					a = t[3] / ne;
				if (!re) {
					var o = de.flipCoords(i, r, s, a),
						c = de.getFixed(),
						u = [c.x, c.y, c.x2, c.y2],
						l = u,
						d = P.animationDelay,
						h = o[0] - u[0],
						f = o[1] - u[1],
						m = o[2] - u[2],
						p = o[3] - u[3],
						g = 0,
						v = P.swingSpeed;
					i = l[0], r = l[1], s = l[2], a = l[3], fe.animMode(!0);
					var $ = function() {
						return function() {
							g += (100 - g) / v, l[0] = Math.round(i + g / 100 * h), l[1] = Math.round(r + g / 100 * f), l[2] = Math.round(s + g / 100 * m), l[3] = Math.round(a + g / 100 * p), g >= 99.8 && (g = 100), 100 > g ? (x(l), n()) : (fe.done(), fe.animMode(!1), "function" == typeof e && e.call(ge))
						}
					}();
					n()
				}
			}

			function w(t) {
				x([t[0] / ee, t[1] / ne, t[2] / ee, t[3] / ne]), P.onSelect.call(ge, p(de.getFixed())), fe.enableHandles()
			}

			function x(t) {
				de.setPressed([t[0], t[1]]), de.setCurrent([t[2], t[3]]), fe.update()
			}

			function k() {
				return p(de.getFixed())
			}

			function C() {
				return de.getFixed()
			}

			function S(t) {
				c(t), H()
			}

			function L() {
				P.disabled = !0, fe.disableHandles(), fe.setCursor("default"), me.setCursor("default")
			}

			function T() {
				P.disabled = !1, H()
			}

			function A() {
				fe.done(), me.activateHandlers(null, null)
			}

			function D() {
				Y.remove(), B.show(), B.css("visibility", "visible"), t(e).removeData("Jcrop")
			}

			function E(t, e) {
				fe.release(), L();
				var n = new Image;
				n.onload = function() {
					var i = n.width,
						r = n.height,
						s = P.boxWidth,
						a = P.boxHeight;
					z.width(i).height(r), z.attr("src", t), G.attr("src", t), m(z, s, a), U = z.width(), W = z.height(), G.width(U).height(W), oe.width(U + 2 * ae).height(W + 2 * ae), Y.width(U).height(W), he.resize(U, W), T(), "function" == typeof e && e.call(ge)
				}, n.src = t
			}

			function _(t, e, n) {
				var i = e || P.bgColor;
				P.bgFade && s() && P.fadeTime && !n ? t.animate({
					backgroundColor: i
				}, {
					queue: !1,
					duration: P.fadeTime
				}) : t.css("backgroundColor", i)
			}

			function H(t) {
				P.allowResize ? t ? fe.enableOnly() : fe.enableHandles() : fe.disableHandles(), me.setCursor(P.allowSelect ? "crosshair" : "default"), fe.setCursor(P.allowMove ? "move" : "default"), P.hasOwnProperty("trueSize") && (ee = P.trueSize[0] / U, ne = P.trueSize[1] / W), P.hasOwnProperty("setSelect") && (w(P.setSelect), fe.done(), delete P.setSelect), he.refresh(), P.bgColor != ce && (_(P.shade ? he.getShades() : Y, P.shade ? P.shadeColor || P.bgColor : P.bgColor), ce = P.bgColor), ue != P.bgOpacity && (ue = P.bgOpacity, P.shade ? he.refresh() : fe.setBgOpacity(ue)), K = P.maxSize[0] || 0, Q = P.maxSize[1] || 0, Z = P.minSize[0] || 0, te = P.minSize[1] || 0, P.hasOwnProperty("outerImage") && (z.attr("src", P.outerImage), delete P.outerImage), fe.refresh()
			}
			var q, P = t.extend({}, t.Jcrop.defaults),
				I = navigator.userAgent.toLowerCase(),
				M = /msie/.test(I),
				R = /msie [1-6]\./.test(I);
			"object" != typeof e && (e = t(e)[0]), "object" != typeof n && (n = {}), c(n);
			var O = {
					border: "none",
					visibility: "visible",
					margin: 0,
					padding: 0,
					position: "absolute",
					top: 0,
					left: 0
				},
				B = t(e),
				N = !0;
			if ("IMG" == e.tagName) {
				if (0 != B[0].width && 0 != B[0].height) B.width(B[0].width), B.height(B[0].height);
				else {
					var F = new Image;
					F.src = B[0].src, B.width(F.width), B.height(F.height)
				}
				var z = B.clone().removeAttr("id").css(O).show();
				z.width(B.width()), z.height(B.height()), B.after(z).hide()
			} else z = B.css(O).show(), N = !1, null === P.shade && (P.shade = !0);
			m(z, P.boxWidth, P.boxHeight);
			var U = z.width(),
				W = z.height(),
				Y = t("<div />").width(U).height(W).addClass(r("holder")).css({
					position: "relative",
					backgroundColor: P.bgColor
				}).insertAfter(B).append(z);
			P.addClass && Y.addClass(P.addClass);
			var G = t("<div />"),
				J = t("<div />").width("100%").height("100%").css({
					zIndex: 310,
					position: "absolute",
					overflow: "hidden"
				}),
				V = t("<div />").width("100%").height("100%").css("zIndex", 320),
				X = t("<div />").css({
					position: "absolute",
					zIndex: 600
				}).dblclick(function() {
					var t = de.getFixed();
					P.onDblClick.call(ge, t)
				}).insertBefore(z).append(J, V);
			N && (G = t("<img />").attr("src", z.attr("src")).css(O).width(U).height(W), J.append(G)), R && X.css({
				overflowY: "hidden"
			});
			var K, Q, Z, te, ee, ne, ie, re, se, ae = P.boundary,
				oe = b().width(U + 2 * ae).height(W + 2 * ae).css({
					position: "absolute",
					top: i(-ae),
					left: i(-ae),
					zIndex: 290
				}).mousedown(v),
				ce = P.bgColor,
				ue = P.bgOpacity;
			q = a(z);
			var le = function() {
					function t() {
						var t, e = {},
							n = ["touchstart", "touchmove", "touchend"],
							i = document.createElement("div");
						try {
							for (t = 0; t < n.length; t++) {
								var r = n[t];
								r = "on" + r;
								var s = r in i;
								s || (i.setAttribute(r, "return;"), s = "function" == typeof i[r]), e[n[t]] = s
							}
							return e.touchstart && e.touchend && e.touchmove
						} catch (a) {
							return !1
						}
					}

					function e() {
						return P.touchSupport === !0 || P.touchSupport === !1 ? P.touchSupport : t()
					}
					return {
						createDragger: function(t) {
							return function(e) {
								return P.disabled ? !1 : "move" !== t || P.allowMove ? (q = a(z), ie = !0, u(t, o(le.cfilter(e)), !0), e.stopPropagation(), e.preventDefault(), !1) : !1
							}
						},
						newSelection: function(t) {
							return v(le.cfilter(t))
						},
						cfilter: function(t) {
							return t.pageX = t.originalEvent.changedTouches[0].pageX, t.pageY = t.originalEvent.changedTouches[0].pageY, t
						},
						isSupported: t,
						support: e()
					}
				}(),
				de = function() {
					function t(t) {
						t = a(t), m = h = t[0], p = f = t[1]
					}

					function e(t) {
						t = a(t), l = t[0] - m, d = t[1] - p, m = t[0], p = t[1]
					}

					function n() {
						return [l, d]
					}

					function i(t) {
						var e = t[0],
							n = t[1];
						0 > h + e && (e -= e + h), 0 > f + n && (n -= n + f), p + n > W && (n += W - (p + n)), m + e > U && (e += U - (m + e)), h += e, m += e, f += n, p += n
					}

					function r(t) {
						var e = s();
						switch (t) {
							case "ne":
								return [e.x2, e.y];
							case "nw":
								return [e.x, e.y];
							case "se":
								return [e.x2, e.y2];
							case "sw":
								return [e.x, e.y2]
						}
					}

					function s() {
						if (!P.aspectRatio) return c();
						var t, e, n, i, r = P.aspectRatio,
							s = P.minSize[0] / ee,
							a = P.maxSize[0] / ee,
							l = P.maxSize[1] / ne,
							d = m - h,
							g = p - f,
							v = Math.abs(d),
							$ = Math.abs(g),
							b = v / $;
						return 0 === a && (a = 10 * U), 0 === l && (l = 10 * W), r > b ? (e = p, n = $ * r, t = 0 > d ? h - n : n + h, 0 > t ? (t = 0, i = Math.abs((t - h) / r), e = 0 > g ? f - i : i + f) : t > U && (t = U, i = Math.abs((t - h) / r), e = 0 > g ? f - i : i + f)) : (t = m, i = v / r, e = 0 > g ? f - i : f + i, 0 > e ? (e = 0, n = Math.abs((e - f) * r), t = 0 > d ? h - n : n + h) : e > W && (e = W, n = Math.abs(e - f) * r, t = 0 > d ? h - n : n + h)), t > h ? (s > t - h ? t = h + s : t - h > a && (t = h + a), e = e > f ? f + (t - h) / r : f - (t - h) / r) : h > t && (s > h - t ? t = h - s : h - t > a && (t = h - a), e = e > f ? f + (h - t) / r : f - (h - t) / r), 0 > t ? (h -= t, t = 0) : t > U && (h -= t - U, t = U), 0 > e ? (f -= e, e = 0) : e > W && (f -= e - W, e = W), u(o(h, f, t, e))
					}

					function a(t) {
						return t[0] < 0 && (t[0] = 0), t[1] < 0 && (t[1] = 0), t[0] > U && (t[0] = U), t[1] > W && (t[1] = W), [Math.round(t[0]), Math.round(t[1])]
					}

					function o(t, e, n, i) {
						var r = t,
							s = n,
							a = e,
							o = i;
						return t > n && (r = n, s = t), e > i && (a = i, o = e), [r, a, s, o]
					}

					function c() {
						var t, e = m - h,
							n = p - f;
						return K && Math.abs(e) > K && (m = e > 0 ? h + K : h - K), Q && Math.abs(n) > Q && (p = n > 0 ? f + Q : f - Q), te / ne && Math.abs(n) < te / ne && (p = n > 0 ? f + te / ne : f - te / ne), Z / ee && Math.abs(e) < Z / ee && (m = e > 0 ? h + Z / ee : h - Z / ee), 0 > h && (m -= h, h -= h), 0 > f && (p -= f, f -= f), 0 > m && (h -= m, m -= m), 0 > p && (f -= p, p -= p), m > U && (t = m - U, h -= t, m -= t), p > W && (t = p - W, f -= t, p -= t), h > U && (t = h - W, p -= t, f -= t), f > W && (t = f - W, p -= t, f -= t), u(o(h, f, m, p))
					}

					function u(t) {
						return {
							x: t[0],
							y: t[1],
							x2: t[2],
							y2: t[3],
							w: t[2] - t[0],
							h: t[3] - t[1]
						}
					}
					var l, d, h = 0,
						f = 0,
						m = 0,
						p = 0;
					return {
						flipCoords: o,
						setPressed: t,
						setCurrent: e,
						getOffset: n,
						moveOffset: i,
						getCorner: r,
						getFixed: s
					}
				}(),
				he = function() {
					function e(t, e) {
						m.left.css({
							height: i(e)
						}), m.right.css({
							height: i(e)
						})
					}

					function n() {
						return r(de.getFixed())
					}

					function r(t) {
						m.top.css({
							left: i(t.x),
							width: i(t.w),
							height: i(t.y)
						}), m.bottom.css({
							top: i(t.y2),
							left: i(t.x),
							width: i(t.w),
							height: i(W - t.y2)
						}), m.right.css({
							left: i(t.x2),
							width: i(U - t.x2)
						}), m.left.css({
							width: i(t.x)
						})
					}

					function s() {
						return t("<div />").css({
							position: "absolute",
							backgroundColor: P.shadeColor || P.bgColor
						}).appendTo(f)
					}

					function a() {
						h || (h = !0, f.insertBefore(z), n(), fe.setBgOpacity(1, 0, 1), G.hide(), o(P.shadeColor || P.bgColor, 1), fe.isAwake() ? u(P.bgOpacity, 1) : u(1, 1))
					}

					function o(t, e) {
						_(d(), t, e)
					}

					function c() {
						h && (f.remove(), G.show(), h = !1, fe.isAwake() ? fe.setBgOpacity(P.bgOpacity, 1, 1) : (fe.setBgOpacity(1, 1, 1), fe.disableHandles()), _(Y, 0, 1))
					}

					function u(t, e) {
						h && (P.bgFade && !e ? f.animate({
							opacity: 1 - t
						}, {
							queue: !1,
							duration: P.fadeTime
						}) : f.css({
							opacity: 1 - t
						}))
					}

					function l() {
						P.shade ? a() : c(), fe.isAwake() && u(P.bgOpacity)
					}

					function d() {
						return f.children()
					}
					var h = !1,
						f = t("<div />").css({
							position: "absolute",
							zIndex: 240,
							opacity: 0
						}),
						m = {
							top: s(),
							left: s().height(W),
							right: s().height(W),
							bottom: s()
						};
					return {
						update: n,
						updateRaw: r,
						getShades: d,
						setBgColor: o,
						enable: a,
						disable: c,
						resize: e,
						refresh: l,
						opacity: u
					}
				}(),
				fe = function() {
					function e(e) {
						var n = t("<div />").css({
							position: "absolute",
							opacity: P.borderOpacity
						}).addClass(r(e));
						return J.append(n), n
					}

					function n(e, n) {
						var i = t("<div />").mousedown(f(e)).css({
							cursor: e + "-resize",
							position: "absolute",
							zIndex: n
						}).addClass("ord-" + e);
						return le.support && i.bind("touchstart.jcrop", le.createDragger(e)), V.append(i), i
					}

					function s(t) {
						var e = P.handleSize,
							i = n(t, L++).css({
								opacity: P.handleOpacity
							}).addClass(r("handle"));
						return e && i.width(e).height(e), i
					}

					function a(t) {
						return n(t, L++).addClass("jcrop-dragbar")
					}

					function o(t) {
						var e;
						for (e = 0; e < t.length; e++) D[t[e]] = a(t[e])
					}

					function c(t) {
						var n, i;
						for (i = 0; i < t.length; i++) {
							switch (t[i]) {
								case "n":
									n = "hline";
									break;
								case "s":
									n = "hline bottom";
									break;
								case "e":
									n = "vline right";
									break;
								case "w":
									n = "vline"
							}
							T[t[i]] = e(n)
						}
					}

					function u(t) {
						var e;
						for (e = 0; e < t.length; e++) A[t[e]] = s(t[e])
					}

					function l(t, e) {
						P.shade || G.css({
							top: i(-e),
							left: i(-t)
						}), X.css({
							top: i(e),
							left: i(t)
						})
					}

					function d(t, e) {
						X.width(Math.round(t)).height(Math.round(e))
					}

					function h() {
						var t = de.getFixed();
						de.setPressed([t.x, t.y]), de.setCurrent([t.x2, t.y2]), m()
					}

					function m(t) {
						return S ? g(t) : void 0
					}

					function g(t) {
						var e = de.getFixed();
						d(e.w, e.h), l(e.x, e.y), P.shade && he.updateRaw(e), S || $(), t ? P.onSelect.call(ge, p(e)) : P.onChange.call(ge, p(e))
					}

					function v(t, e, n) {
						(S || e) && (P.bgFade && !n ? z.animate({
							opacity: t
						}, {
							queue: !1,
							duration: P.fadeTime
						}) : z.css("opacity", t))
					}

					function $() {
						X.show(), P.shade ? he.opacity(ue) : v(ue, !0), S = !0
					}

					function j() {
						x(), X.hide(), P.shade ? he.opacity(1) : v(1), S = !1, P.onRelease.call(ge)
					}

					function y() {
						E && V.show()
					}

					function w() {
						return E = !0, P.allowResize ? (V.show(), !0) : void 0
					}

					function x() {
						E = !1, V.hide()
					}

					function k(t) {
						t ? (re = !0, x()) : (re = !1, w())
					}

					function C() {
						k(!1), h()
					}
					var S, L = 370,
						T = {},
						A = {},
						D = {},
						E = !1;
					P.dragEdges && t.isArray(P.createDragbars) && o(P.createDragbars), t.isArray(P.createHandles) && u(P.createHandles), P.drawBorders && t.isArray(P.createBorders) && c(P.createBorders), t(document).bind("touchstart.jcrop-ios", function(e) {
						t(e.currentTarget).hasClass("jcrop-tracker") && e.stopPropagation()
					});
					var _ = b().mousedown(f("move")).css({
						cursor: "move",
						position: "absolute",
						zIndex: 360
					});
					return le.support && _.bind("touchstart.jcrop", le.createDragger("move")), J.append(_), x(), {
						updateVisible: m,
						update: g,
						release: j,
						refresh: h,
						isAwake: function() {
							return S
						},
						setCursor: function(t) {
							_.css("cursor", t)
						},
						enableHandles: w,
						enableOnly: function() {
							E = !0
						},
						showHandles: y,
						disableHandles: x,
						animMode: k,
						setBgOpacity: v,
						done: C
					}
				}(),
				me = function() {
					function e(e) {
						oe.css({
							zIndex: 450
						}), e ? t(document).bind("touchmove.jcrop", a).bind("touchend.jcrop", c) : h && t(document).bind("mousemove.jcrop", i).bind("mouseup.jcrop", r)
					}

					function n() {
						oe.css({
							zIndex: 290
						}), t(document).unbind(".jcrop")
					}

					function i(t) {
						return l(o(t)), !1
					}

					function r(t) {
						return t.preventDefault(), t.stopPropagation(), ie && (ie = !1, d(o(t)), fe.isAwake() && P.onSelect.call(ge, p(de.getFixed())), n(), l = function() {}, d = function() {}), !1
					}

					function s(t, n, i) {
						return ie = !0, l = t, d = n, e(i), !1
					}

					function a(t) {
						return l(o(le.cfilter(t))), !1
					}

					function c(t) {
						return r(le.cfilter(t))
					}

					function u(t) {
						oe.css("cursor", t)
					}
					var l = function() {},
						d = function() {},
						h = P.trackDocument;
					return h || oe.mousemove(i).mouseup(r).mouseout(r), z.before(oe), {
						activateHandlers: s,
						setCursor: u
					}
				}(),
				pe = function() {
					function e() {
						P.keySupport && (s.show(), s.focus())
					}

					function n() {
						s.hide()
					}

					function i(t, e, n) {
						P.allowMove && (de.moveOffset([e, n]), fe.updateVisible(!0)), t.preventDefault(), t.stopPropagation()
					}

					function r(t) {
						if (t.ctrlKey || t.metaKey) return !0;
						se = t.shiftKey ? !0 : !1;
						var e = se ? 10 : 1;
						switch (t.keyCode) {
							case 37:
								i(t, -e, 0);
								break;
							case 39:
								i(t, e, 0);
								break;
							case 38:
								i(t, 0, -e);
								break;
							case 40:
								i(t, 0, e);
								break;
							case 27:
								P.allowSelect && fe.release();
								break;
							case 9:
								return !0
						}
						return !1
					}
					var s = t('<input type="radio" />').css({
							position: "fixed",
							left: "-120px",
							width: "12px"
						}).addClass("jcrop-keymgr"),
						a = t("<div />").css({
							position: "absolute",
							overflow: "hidden"
						}).append(s);
					return P.keySupport && (s.keydown(r).blur(n), R || !P.fixedSupport ? (s.css({
						position: "absolute",
						left: "-20px"
					}), a.append(s).insertBefore(z)) : s.insertBefore(z)), {
						watchKeys: e
					}
				}();
			le.support && oe.bind("touchstart.jcrop", le.newSelection), V.hide(), H(!0);
			var ge = {
				setImage: E,
				animateTo: y,
				setSelect: w,
				setOptions: S,
				tellSelect: k,
				tellScaled: C,
				setClass: j,
				disable: L,
				enable: T,
				cancel: A,
				release: fe.release,
				destroy: D,
				focus: pe.watchKeys,
				getBounds: function() {
					return [U * ee, W * ne]
				},
				getWidgetSize: function() {
					return [U, W]
				},
				getScaleFactor: function() {
					return [ee, ne]
				},
				getOptions: function() {
					return P
				},
				ui: {
					holder: Y,
					selection: X
				}
			};
			return M && Y.bind("selectstart", function() {
				return !1
			}), B.data("Jcrop", ge), ge
		}, t.fn.Jcrop = function(e, n) {
			var i;
			return this.each(function() {
				if (t(this).data("Jcrop")) {
					if ("api" === e) return t(this).data("Jcrop");
					t(this).data("Jcrop").setOptions(e)
				} else "IMG" == this.tagName ? t.Jcrop.Loader(this, function() {
					t(this).css({
						display: "block",
						visibility: "hidden"
					}), i = t.Jcrop(this, e), t.isFunction(n) && n.call(i)
				}) : (t(this).css({
					display: "block",
					visibility: "hidden"
				}), i = t.Jcrop(this, e), t.isFunction(n) && n.call(i))
			}), this
		}, t.Jcrop.Loader = function(e, n, i) {
			function r() {
				a.complete ? (s.unbind(".jcloader"), t.isFunction(n) && n.call(a)) : window.setTimeout(r, 50)
			}
			var s = t(e),
				a = s[0];
			s.bind("load.jcloader", r).bind("error.jcloader", function() {
				s.unbind(".jcloader"), t.isFunction(i) && i.call(a)
			}), a.complete && t.isFunction(n) && (s.unbind(".jcloader"), n.call(a))
		}, t.Jcrop.defaults = {
			allowSelect: !0,
			allowMove: !0,
			allowResize: !0,
			trackDocument: !0,
			baseClass: "jcrop",
			addClass: null,
			bgColor: "black",
			bgOpacity: .6,
			bgFade: !1,
			borderOpacity: .4,
			handleOpacity: .5,
			handleSize: null,
			aspectRatio: 0,
			keySupport: !0,
			createHandles: ["n", "s", "e", "w", "nw", "ne", "se", "sw"],
			createDragbars: ["n", "s", "e", "w"],
			createBorders: ["n", "s", "e", "w"],
			drawBorders: !0,
			dragEdges: !0,
			fixedSupport: !0,
			touchSupport: null,
			shade: null,
			boxWidth: 0,
			boxHeight: 0,
			boundary: 2,
			fadeTime: 400,
			animationDelay: 20,
			swingSpeed: 3,
			minSelect: [0, 0],
			maxSize: [0, 0],
			minSize: [0, 0],
			onChange: function() {},
			onSelect: function() {},
			onDblClick: function() {},
			onRelease: function() {}
		}
	}(jQuery),
	function() {
		var t, e = function(t, e) {
			return function() {
				return t.apply(e, arguments)
			}
		};
		t = function() {
			function t(t) {
				this.clearCropFormValues = e(this.clearCropFormValues, this), this.setCropFormValues = e(this.setCropFormValues, this), this.setCurrentSelection = e(this.setCurrentSelection, this), this.setTrueSize = e(this.setTrueSize, this);
				var n, i, r;
				this.container = $(t), this.spinner = this.container.find(".profile-picture-spinner"), this.img = this.container.find(".js-croppable-avatar"), this.croppedX = this.container.find(".js-crop-cropped-x"), this.croppedY = this.container.find(".js-crop-cropped-y"), this.croppedW = this.container.find(".js-crop-cropped-width"), this.croppedH = this.container.find(".js-crop-cropped-height"), n = this.img.parent("div").width(), r = {
					aspectRatio: 1,
					onSelect: this.setCropFormValues,
					onRelease: this.clearCropFormValues,
					bgColor: "",
					maxSize: [3e3, 3e3],
					boxWidth: n,
					boxHeight: n
				}, this.setTrueSize(r), this.setCurrentSelection(r), i = this, this.img.Jcrop(r, function() {
					return i.spinner.addClass("hidden"), i.jcrop = this
				})
			}
			return t.prototype.setTrueSize = function(t) {
				var e, n;
				return n = parseInt(this.img.attr("data-true-width")), e = parseInt(this.img.attr("data-true-height")), 0 !== n && 0 !== e ? t.trueSize = [n, e] : void 0
			}, t.prototype.setCurrentSelection = function(t) {
				var e, n, i, r;
				return n = parseInt(this.croppedW.val()), e = parseInt(this.croppedH.val()), 0 !== n && 0 !== e ? (i = parseInt(this.croppedX.val()), r = parseInt(this.croppedY.val()), t.setSelect = [i, r, i + n, r + e]) : void 0
			}, t.prototype.setCropFormValues = function(t) {
				return this.croppedX.val(t.x), this.croppedY.val(t.y), this.croppedW.val(t.w), this.croppedH.val(t.h)
			}, t.prototype.clearCropFormValues = function() {
				return this.croppedX.val("0"), this.croppedY.val("0"), this.croppedW.val("0"), this.croppedH.val("0")
			}, t
		}(), $.observe(".js-croppable-container", {
			add: function(e) {
				return new t(e)
			}
		}), $(document).on("afterClose.facebox", function() {
			return $(".js-avatar-field").val("")
		})
	}.call(this),
	function() {
		window.d3Ready = function() {
			return "undefined" != typeof d3 && null !== d3 ? Promise.resolve() : new Promise(function(t) {
				return document.addEventListener("graph-lib:loaded", function() {
					return t()
				})
			})
		}
	}.call(this),
	function() {
		$(document).on("details:toggled", function(t) {
			var e, n, i;
			n = t.target, i = t.relatedTarget, e = $(n).find("input[autofocus], textarea[autofocus]").last()[0], e && document.activeElement !== e && e.focus(), i.classList.contains("tooltipped") && (i.classList.remove("tooltipped"), $(i).one("mouseleave", function() {
				return i.classList.add("tooltipped")
			})), i.blur()
		}), $.hashChange(function(t) {
			return $(t.target).parents(".js-details-container").addClass("open")
		})
	}.call(this),
	function() {
		var t, e;
		$(document).on("reveal.facebox", function() {
			var t, n;
			t = $("#facebox"), n = t.find("input[autofocus], textarea[autofocus]").last()[0], n && document.activeElement !== n && n.focus(), $(document).on("keydown", e)
		}), $(document).on("afterClose.facebox", function() {
			return $(document).off("keydown", e), $("#facebox :focus").blur()
		}), e = function(t) {
			var e, n, i, r, s, a;
			("tab" === (s = t.hotkey) || "shift+tab" === s) && (t.preventDefault(), n = $("#facebox"), e = n.find("input, button, .btn, textarea").visible().filter(function() {
				return !this.disabled
			}), r = "shift+tab" === t.hotkey ? -1 : 1, i = e.index(e.filter(":focus")), a = i + r, a === e.length || -1 === i && "tab" === t.hotkey ? e.first().focus() : -1 === i ? e.last().focus() : e.get(a).focus())
		}, $.observe("a[rel*=facebox]", t = function() {
			$(this).facebox()
		})
	}.call(this),
	function() {
		$(document).on("click", ".js-flash-close", function() {
			var t;
			return t = $(this).closest(".flash-messages"), $(this).closest(".flash").fadeOut(300, function() {
				return $(this).remove(), 0 === t.find(".flash").length ? t.remove() : void 0
			})
		})
	}.call(this),
	function() {
		var t, e, n, i, r;
		n = function(t) {
			return $(t).closest(".js-suggester-container").find(".js-suggester")[0]
		}, e = function(t) {
			var e, r, s, a, o, c, u, l, d, h, f;
			if (r = document.getElementById(t)) {
				c = document.getElementById("fullscreen_overlay"), u = c.querySelector(".js-fullscreen-contents"), d = "gh-fullscreen-theme", "dark" === function() {
					try {
						return localStorage.getItem(d)
					} catch (t) {}
				}() ? ($(".js-fullscreen-overlay").addClass("dark-theme"), l = "dark") : ($(".js-fullscreen-overlay").removeClass("dark-theme"), l = "light"), f = $(r).val(), e = $(r).caret(), $(c).attr("data-return-scroll-position", window.pageYOffset), $("body").addClass("fullscreen-overlay-enabled"), $(document).on("keydown", i), r.classList.contains("js-suggester-field") && (u.classList.add("js-suggester-field"), n(u).setAttribute("data-url", n(r).getAttribute("data-url"))), $(u).attr("placeholder", $(r).attr("placeholder")), $(u).val(f), $(u).caret(e), u.focus(), a = "gh-fullscreen-known-user", s = function() {
					try {
						return "known" === localStorage.getItem(a)
					} catch (t) {}
				}();
				try {
					s || localStorage.setItem(a, "known")
				} catch (m) {}
				if (function() {
					try {
						return localStorage.length
					} catch (t) {}
				}()) return h = "other", t.match(/pull_request_body/g) ? h = "pull" : t.match(/issue_body/g) ? h = "issue" : t.match(/blob_contents/g) ? h = "blob" : t.match(/comment_body/g) && (h = "comment"), o = "usecase:" + h + "; known_user:" + s + "; theme:" + l, window.ga("send", "event", "Fullscreen mode", "enter", o)
			}
		}, t = function(t) {
			var e, r, s, a, o, c, u;
			if (s = document.getElementById(t)) return a = document.getElementById("fullscreen_overlay"), c = a.querySelector(".js-fullscreen-contents"), u = $(c).val(), e = $(c).caret(), $("body").removeClass("fullscreen-overlay-enabled"), $(document).off("keydown", i), c.classList.remove("js-suggester-field"), $(n(c)).html(""), (o = $(a).attr("data-return-scroll-position")) && window.scrollTo(0, o), (r = $(s).parents(".js-code-editor").data("code-editor")) ? r.setCode(u) : ($(s).val(u), $(s).caret(e), $(s).trigger("validation:field:change")), window.ga("send", "event", "Fullscreen mode", "exit", "editor:" + (r && !0)), c.value = ""
		}, r = !1, i = function(t) {
			return 27 === t.keyCode || "ctrl+L" === t.hotkey || "meta+L" === t.hotkey ? (r ? history.back() : window.location.hash = "", t.preventDefault()) : void 0
		}, $(document).on("click", ".js-enable-fullscreen", function(t) {
			var e, n;
			return t.preventDefault(), (e = $(this).closest(".js-previewable-comment-form, .js-code-editor")[0]) ? (n = e.querySelector("textarea"), window.location = "#fullscreen_" + n.id) : void 0
		}), $(document).on("click", ".js-exit-fullscreen", function(t) {
			r && (t.preventDefault(), history.back())
		}), $(document).on("click", ".js-theme-switcher", function() {
			var t, e;
			if ($("body, .js-fullscreen-overlay").toggleClass("dark-theme"), e = "gh-fullscreen-theme", "dark" === function() {
				try {
					return localStorage.getItem(e)
				} catch (t) {}
			}()) {
				try {
					localStorage.removeItem(e)
				} catch (n) {}
				t = "light"
			} else {
				try {
					localStorage.setItem(e, "dark")
				} catch (n) {}
				t = "dark"
			}
			return window.ga("send", "event", "Fullscreen mode", "switch theme", "to:" + t), !1
		}), $.hashChange(function(n) {
			var i, s, a;
			return a = n.oldURL, s = n.newURL, (i = null != s ? s.match(/\#fullscreen_(.+)$/) : void 0) ? (r = !!a, e(i[1])) : (i = null != a ? a.match(/\#fullscreen_(.+)$/) : void 0) ? (r = !1, t(i[1])) : void 0
		}), "dark" === function() {
			try {
				return localStorage.getItem("gh-fullscreen-theme")
			} catch (t) {}
		}() && $(function() {
			return $("body, .js-fullscreen-overlay").addClass("dark-theme")
		})
	}.call(this),
	function() {
		var t, e;
		GitHub.support.emoji || (t = Object.create(HTMLElement.prototype), t.createdCallback = function() {
			return this.textContent = "", this.appendChild(e(this))
		}, e = function(t) {
			var e;
			return e = document.createElement("img"), e.src = t.getAttribute("fallback-src"), e.className = "emoji", e.alt = e.title = ":" + t.getAttribute("alias") + ":", e.height = 20, e.width = 20, e.align = "absmiddle", e
		}, window.GEmojiElement = document.registerElement("g-emoji", {
			prototype: t
		}))
	}.call(this),
	function() {
		var t, e, n, i, r, s, a;
		r = 0, n = -1, e = function(t) {
			var e, n, i, r;
			return e = t.getBoundingClientRect(), i = $(window).height(), r = $(window).width(), 0 === e.height ? !1 : e.height < i ? e.top >= 0 && e.left >= 0 && e.bottom <= i && e.right <= r : (n = Math.ceil(i / 2), e.top >= 0 && e.top + n < i)
		}, t = function(t) {
			var n, i, r, s, a, o, c;
			for (s = t.elements, c = [], i = 0, r = s.length; r > i; i++) n = s[i], c.push(e(n) ? null != (a = t["in"]) ? a.call(n, n, t) : void 0 : null != (o = t.out) ? o.call(n, n, t) : void 0);
			return c
		}, a = function(e) {
			return document.hasFocus() && window.scrollY !== n && (n = window.scrollY, !e.checkPending) ? (e.checkPending = !0, window.requestAnimationFrame(function() {
				return e.checkPending = !1, t(e)
			})) : void 0
		}, i = function(e, n) {
			return 0 === n.elements.length && (window.addEventListener("scroll", n.scrollHandler), $.pageFocused().then(function() {
				return t(n)
			})), n.elements.push(e)
		}, s = function(t, e) {
			var n;
			return n = e.elements.indexOf(t), -1 !== n && e.elements.splice(n, 1), 0 === e.elements.length ? window.removeEventListener("scroll", e.scrollHandler) : void 0
		}, $.inViewport = function(t, e) {
			var n;
			return null != e.call && (e = {
				"in": e
			}), n = {
				id: r++,
				selector: t,
				"in": e["in"],
				out: e.out,
				elements: [],
				checkPending: !1
			}, n.scrollHandler = function() {
				return a(n)
			}, $.observe(t, {
				add: function(t) {
					return i(t, n)
				},
				remove: function(t) {
					return s(t, n)
				}
			}), n
		}
	}.call(this),
	function() {
		$.observe(".labeled-button:checked", {
			add: function() {
				return $(this).parent("label").addClass("selected")
			},
			remove: function() {
				return $(this).parent("label").removeClass("selected")
			}
		})
	}.call(this),
	function() {
		$(document).on("keydown", "div.btn-sm, span.btn-sm", function(t) {
			return "enter" === t.hotkey ? ($(this).click(), t.preventDefault()) : void 0
		})
	}.call(this),
	function() {
		$(document).on("ajaxSuccess", ".js-notice-dismiss", function() {
			return $(this).closest(".js-notice").fadeOut()
		})
	}.call(this),
	function() {
		$.observeLast = function(t, e) {
			var n, i;
			null == e && (e = "last"), n = i = function() {
				$(t).removeClass(e).last().addClass(e)
			}, $.observe(t, {
				add: n,
				remove: i
			})
		}
	}.call(this),
	function() {
		$(document).on("click", ".js-permalink-shortcut", function() {
			return window.location = this.href + window.location.hash, !1
		})
	}.call(this),
	function() {
		$(document).on("pjax:start", function(t) {
			var e;
			(e = t.relatedTarget) && ($(e).addClass("pjax-active"), $(e).parents(".js-pjax-active").addClass("pjax-active"))
		}), $(document).on("pjax:end", function() {
			$(".pjax-active").removeClass("pjax-active")
		})
	}.call(this),
	function() {
		var t;
		t = document.referrer, $(document).on("pjax:start", function() {
			return t = $.pjax.state.url
		}), $(document).on("click", ".js-pjax-back", function(e) {
			1 !== e.which || e.metaKey || e.ctrlKey || history.length > 1 && this.href === t && (history.back(), e.preventDefault())
		})
	}.call(this),
	function() {
		$(document).on("pjax:click", function() {
			return window.onbeforeunload ? !1 : void 0
		})
	}.call(this),
	function() {
		var t;
		t = function() {
			var t, e;
			return e = function() {
				var e, n, i;
				for (i = [], e = 0, n = arguments.length; n > e; e++) t = arguments[e], i.push(t.split("/", 3).join("/"));
				return i
			}.apply(this, arguments), e[0] === e[1]
		}, $(document).on("pjax:click", "#js-repo-pjax-container a[href]", function() {
			var e;
			return e = $(this).prop("pathname"), t(e, location.pathname) ? void 0 : !1
		})
	}.call(this),
	function() {
		var t;
		$.support.pjax && ($.pjaxHeadCache = {}, $(t = function() {
			return $.pjaxHeadCache[document.location.pathname] = $("head [data-pjax-transient]")
		}), $(document).on("pjax:beforeReplace", function(t, e) {
			var n, i, r, s;
			for (i = r = 0, s = e.length; s > r; i = ++r) n = e[i], n && ("pjax-head" === n.id ? ($.pjaxHeadCache[document.location.pathname] = $(n).children(), e[i] = null) : "pjax-flash" === n.id && ($("#js-flash-container").html(n), e[i] = null))
		}), $(document).on("pjax:end", function() {
			var t, e, n;
			return t = $.pjaxHeadCache[document.location.pathname], t ? ($("head [data-pjax-transient]").remove(), n = $(t).not("title, script, link[rel='stylesheet']"), e = $(t).filter("link[rel='stylesheet']"), $(document.head).append(n.attr("data-pjax-transient", !0)), $(document.head).append(e)) : void 0
		}))
	}.call(this),
	function() {
		var t, e;
		$.support.pjax && (e = function(t) {
			return null != t.getAttribute("data-pjax-preserve-scroll") ? !1 : 0
		}, t = function(t) {
			var e, n, i;
			return e = $(t), n = e.add(e.parents("[data-pjax]")).map(function() {
				var t;
				return t = this.getAttribute("data-pjax"), null != t && "true" !== t ? t : void 0
			}), (i = n[0]) ? document.querySelector(i) : $(t).closest("[data-pjax-container]")[0]
		}, $(document).on("click", "[data-pjax] a, a[data-pjax]", function(n) {
			var i, r;
			return r = this, null == r.getAttribute("data-skip-pjax") && null == r.getAttribute("data-remote") && (i = t(r)) ? $.pjax.click(n, {
				container: i,
				scrollTo: e(r)
			}) : void 0
		}), $(document).on("submit", "form[data-pjax]", function(n) {
			var i, r;
			return r = this, (i = t(r)) ? $.pjax.submit(n, {
				container: i,
				scrollTo: e(r)
			}) : void 0
		}))
	}.call(this),
	function() {
		var t;
		$.support.pjax && (t = document.querySelector("meta[name=pjax-timeout]")) && ($.pjax.defaults.timeout = parseInt(t.content))
	}.call(this),
	function() {
		$(function() {
			return document.body.classList.contains("js-print-popup") ? (window.print(), setTimeout(window.close, 1e3)) : void 0
		})
	}.call(this),
	function() {
		$(function() {
			var t, e;
			return document.documentElement.classList.contains("is-employee") ? (t = function() {
				return "qi:" + document.location
			}, e = [], $(document).on("submit", ".js-quick-issue-form", function() {
				var e;
				$(".facebox-content > *").hide(), $(".facebox-content .js-quick-issue-thanks").show(), e = t();
				try {
					localStorage.removeItem(e)
				} catch (n) {}
				return !0
			}), $(document).onFocusedInput(".js-quick-issue-body", function() {
				return function() {
					var e, n;
					e = t(), n = $(this).val();
					try {
						return localStorage.setItem(e, n)
					} catch (i) {}
				}
			}), $(document).on("reveal.facebox", function() {
				var e, n, i;
				return $(".facebox-content .quick-issue-link").remove(), i = $(".facebox-content .js-quick-issue-body"), i.length ? (n = t(), e = function() {
					try {
						return localStorage.getItem(n)
					} catch (t) {}
				}(), e && i.val(e), i.focus()) : void 0
			}), $(document).on("captured:error", function(t, n) {
				return e.push(n), $(".js-captured-errors").val(JSON.stringify(e))
			}), $(document).on("ajaxSuccess", ".js-quick-issue-form", function(t, e) {
				return $(".js-quick-issue-thanks").append(e.responseText)
			})) : void 0
		})
	}.call(this),
	function() {
		$(document).onFocusedKeydown(".js-quick-submit", function() {
			return function(t) {
				var e, n;
				return "ctrl+enter" === t.hotkey || "meta+enter" === t.hotkey ? (n = $(this).closest("form"), e = n.find("input[type=submit], button[type=submit]").first(), e.prop("disabled") || n.submit(), !1) : void 0
			}
		})
	}.call(this),
	function() {
		var t, e = function(t, e) {
			return function() {
				return t.apply(e, arguments)
			}
		};
		t = function() {
			function t(t) {
				this.resultsChanged = e(this.resultsChanged, this), this.fetchResults = e(this.fetchResults, this), this.onFieldInput = e(this.onFieldInput, this), this.onNavigationKeyDown = e(this.onNavigationKeyDown, this), this.teardown = e(this.teardown, this), this.$field = $(t), this.$form = $(t.form), this.fetchQueue = new SlidingPromiseQueue, this.$field.on("input.results", this.onFieldInput), this.$field.on("focusout:delayed.results", this.teardown), this.$form.on("submit.results", this.teardown), this.$results = $(".js-quicksearch-results"), this.$results.navigation("push"), this.$results.on("navigation:keydown.results", this.onNavigationKeyDown)
			}
			return t.prototype.teardown = function() {
				return this.$field.off(".results"), this.$form.off(".results"), this.$results.off(".results"), this.$results.removeClass("active"), this.$results.navigation("pop")
			}, t.prototype.onNavigationKeyDown = function(t) {
				return "esc" === t.hotkey ? this.$results.removeClass("active").navigation("clear") : "enter" !== t.hotkey || t.target.classList.contains("js-navigation-item") ? void 0 : (this.$form.submit(), !1)
			}, t.prototype.onFieldInput = function() {
				return this.fetchResults(this.$field.val())
			}, t.prototype.fetchResults = function(t) {
				var e, n, i;
				return (i = this.$results.attr("data-quicksearch-url")) ? (n = t.trim() ? (i += ~i.indexOf("?") ? "&" : "?", i += this.$form.serialize(), this.$form.addClass("is-sending"), $.fetchText(i)) : Promise.resolve(""), e = function(t) {
					return function() {
						return t.$form.removeClass("is-sending")
					}
				}(this), this.fetchQueue.push(n).then(function(t) {
					return function(e) {
						return t.$results.html(e), t.resultsChanged()
					}
				}(this)).then(e, e)) : void 0
			}, t.prototype.resultsChanged = function() {
				var t;
				return t = "" !== this.$field.val(), this.$results.toggleClass("active", t)
			}, t
		}(), $(document).on("focusin:delayed", ".js-quicksearch-field", function() {
			new t(this)
		})
	}.call(this),
	function() {
		$(document).on("click", ".js-reload", function() {
			return window.location.reload(), !1
		})
	}.call(this),
	function() {
		$.observe(".has-removed-contents", function() {
			var t, e, n;
			return t = $(this).contents(), e = function() {
				return t.detach()
			}, n = function() {
				return $(this).html(t)
			}, {
				add: e,
				remove: n
			}
		})
	}.call(this),
	function() {
		$(document).on("focusin", ".js-repo-filter .js-filterable-field", function() {
			return $(this).closest(".js-repo-filter").find(".js-more-repos-link").click()
		}), $(document).on("click", ".js-repo-filter .js-repo-filter-tab", function() {
			var t;
			return t = $(this).closest(".js-repo-filter"), t.find(".js-more-repos-link").click(), t.find(".js-repo-filter-tab").removeClass("filter-selected"), $(this).addClass("filter-selected"), t.find(".js-filterable-field").fire("filterable:change"), !1
		}), $(document).on("filterable:change", ".js-repo-filter .js-repo-list", function() {
			var t, e;
			t = $(this).closest(".js-repo-filter"), (e = t.find(".js-repo-filter-tab.filter-selected").attr("data-filter")) && $(this).children().not(e).hide()
		}), $(document).on("click:prepare", ".js-repo-filter .js-more-repos-link", function() {
			return $(this).hasClass("is-loading") ? !1 : void 0
		}), $(document).on("ajaxSend", ".js-repo-filter .js-more-repos-link", function() {
			return $(this).addClass("is-loading")
		}), $(document).on("ajaxComplete", ".js-repo-filter .js-more-repos-link", function() {
			return $(this).removeClass("is-loading")
		}), $(document).on("ajaxSuccess", ".js-repo-filter .js-more-repos-link", function(t, e, n, i) {
			var r;
			return r = $(this).closest(".js-repo-filter"), r.find(".js-repo-list").html(i), r.find(".js-filterable-field").fire("filterable:change"), $(this).remove()
		})
	}.call(this),
	function() {
		$(document).on("ajaxSuccess", ".js-select-menu:not([data-multiple])", function() {
			return $(this).menu("deactivate")
		}), $(document).on("ajaxSend", ".js-select-menu:not([data-multiple])", function() {
			return $(this).addClass("is-loading")
		}), $(document).on("ajaxComplete", ".js-select-menu", function() {
			return $(this).removeClass("is-loading")
		}), $(document).on("ajaxError", ".js-select-menu", function() {
			return $(this).addClass("has-error")
		}), $(document).on("menu:deactivate", ".js-select-menu", function() {
			return $(this).removeClass("is-loading has-error")
		})
	}.call(this),
	function() {
		$(document).on("navigation:open", ".js-select-menu:not([data-multiple]) .js-navigation-item", function() {
			var t, e;
			return e = $(this), t = e.closest(".js-select-menu"), t.find(".js-navigation-item.selected").removeClass("selected"), e.addClass("selected"), e.removeClass("indeterminate"), e.find("input[type=radio], input[type=checkbox]").prop("checked", !0).change(), e.fire("selectmenu:selected"), t.hasClass("is-loading") ? void 0 : t.menu("deactivate")
		}), $(document).on("navigation:open", ".js-select-menu[data-multiple] .js-navigation-item", function() {
			var t, e;
			return t = $(this), e = t.hasClass("selected"), t.toggleClass("selected", !e), t.removeClass("indeterminate"), t.find("input[type=radio], input[type=checkbox]").prop("checked", !e).change(), t.fire("selectmenu:selected")
		})
	}.call(this),
	function() {
		$(document).on("selectmenu:selected", ".js-select-menu .js-navigation-item", function() {
			var t, e, n;
			return t = $(this).closest(".js-select-menu"), n = $(this).find(".js-select-button-text"), n[0] && t.find(".js-select-button").html(n.html()), e = $(this).find(".js-select-menu-item-gravatar"), n[0] ? t.find(".js-select-button-gravatar").html(e.html()) : void 0
		})
	}.call(this),
	function() {
		$(document).on("selectmenu:change", ".js-select-menu .select-menu-list", function(t) {
			var e, n;
			n = $(this).find(".js-navigation-item"), n.removeClass("last-visible"), n.visible().last().addClass("last-visible"), $(this).is("[data-filterable-for]") || (e = $(t.target).hasClass("filterable-empty"), $(this).toggleClass("filterable-empty", e))
		})
	}.call(this),
	function() {
		$(document).on("menu:activated selectmenu:load", ".js-select-menu", function() {
			return $(this).find(".js-filterable-field").focus()
		}), $(document).on("menu:deactivate", ".js-select-menu", function() {
			return $(this).find(".js-filterable-field").val("").trigger("filterable:change")
		})
	}.call(this),
	function() {
		var t;
		t = function(t) {
			var e, n, i, r, s;
			return i = t.currentTarget, e = $(i), e.removeClass("js-load-contents"), e.addClass("is-loading"), e.removeClass("has-error"), r = e.attr("data-contents-url"), n = e.data("contents-data"), s = $.ajax({
				url: r,
				data: n
			}), s.then(function(t) {
				e.removeClass("is-loading"), e.find(".js-select-menu-deferred-content").html(t), e.hasClass("active") && e.fire("selectmenu:load")
			}, function() {
				e.removeClass("is-loading"), e.addClass("has-error")
			})
		}, $.observe(".js-select-menu.js-load-contents", {
			add: function() {
				$(this).on("mouseenter", t), $(this).on("menu:activate", t)
			},
			remove: function() {
				$(this).off("mouseenter", t), $(this).off("menu:activate", t)
			}
		})
	}.call(this),
	function() {
		$(document).on("menu:activate", ".js-select-menu", function() {
			return $(this).find(":focus").blur(), $(this).find(".js-menu-target").addClass("selected"), $(this).find(".js-navigation-container").navigation("push")
		}), $(document).on("menu:deactivate", ".js-select-menu", function() {
			return $(this).find(".js-menu-target").removeClass("selected"), $(this).find(".js-navigation-container").navigation("pop")
		}), $(document).on("filterable:change selectmenu:tabchange", ".js-select-menu .select-menu-list", function() {
			return $(this).navigation("refocus")
		})
	}.call(this),
	function() {
		var t;
		$(document).on("filterable:change", ".js-select-menu .select-menu-list", function(e) {
			var n, i, r, s;
			(i = this.querySelector(".js-new-item-form")) && (n = e.relatedTarget.value, "" === n || t(this, n) ? $(this).removeClass("is-showing-new-item-form") : ($(this).addClass("is-showing-new-item-form"), s = i.querySelector(".js-new-item-name"), "innerText" in s ? s.innerText = n : s.textContent = n, null != (r = i.querySelector(".js-new-item-value")) && (r.value = n))), $(e.target).trigger("selectmenu:change")
		}), t = function(t, e) {
			var n, i, r, s, a;
			for (s = t.querySelectorAll(".js-select-button-text"), n = 0, r = s.length; r > n; n++)
				if (i = s[n], a = i.textContent.toLowerCase().trim(), a === e.toLowerCase()) return !0;
			return !1
		}
	}.call(this),
	function() {
		var t;
		$(document).on("menu:activate selectmenu:load", ".js-select-menu", function() {
			var t;
			return t = $(this).find(".js-select-menu-tab"), t.removeClass("selected"), t.first().addClass("selected")
		}), $(document).on("click", ".js-select-menu .js-select-menu-tab", function() {
			var t, e, n, i;
			return e = this.closest(".js-select-menu"), (i = e.querySelector(".js-select-menu-tab.selected")) && i.classList.remove("selected"), this.classList.add("selected"), (t = e.querySelector(".js-filterable-field")) && ((n = this.getAttribute("data-filter-placeholder")) && t.setAttribute("placeholder", n), t.focus()), !1
		}), t = function(t, e) {
			var n, i, r;
			r = t.getAttribute("data-tab-filter"), i = $(t).closest(".js-select-menu").find(".js-select-menu-tab-bucket"), n = i.filter(function() {
				return this.getAttribute("data-tab-filter") === r
			}), n.toggleClass("selected", e), e && n.fire("selectmenu:tabchange")
		}, $.observe(".js-select-menu .js-select-menu-tab.selected", {
			add: function() {
				return t(this, !0)
			},
			remove: function() {
				return t(this, !1)
			}
		})
	}.call(this),
	function() {}.call(this),
	function() {
		var t, e, n, i;
		t = function(t) {
			var e;
			return null == t && (t = window.location), (e = document.querySelector("meta[name=session-resume-id]")) ? e.content : t.pathname
		}, i = null, $(window).on("submit:prepare", function(t) {
			i = t.target, setImmediate(function() {
				return t.isDefaultPrevented() ? i = null : void 0
			})
		}), e = function(t) {
			var e, n, r, s;
			if (r = "session-resume:" + t, s = function(t) {
				return t.id && t.value !== t.defaultValue && t.form !== i
			}, n = function() {
				var t, n, i, r;
				for (i = $(".js-session-resumable"), r = [], t = 0, n = i.length; n > t; t++) e = i[t], s(e) && r.push([e.id, e.value]);
				return r
			}(), n.length) try {
				sessionStorage.setItem(r, JSON.stringify(n))
			} catch (a) {}
		}, n = function(t) {
			var e, n, i, r, s, a, o, c;
			if (r = "session-resume:" + t, n = function() {
				try {
					return sessionStorage.getItem(r)
				} catch (t) {}
			}()) {
				try {
					sessionStorage.removeItem(r)
				} catch (u) {}
				for (e = [], a = JSON.parse(n), i = 0, s = a.length; s > i; i++) o = a[i], t = o[0], c = o[1], $(document).fire("session:resume", {
					targetId: t,
					targetValue: c
				}, function() {
					var n;
					n = document.getElementById(t), n && n.value === n.defaultValue && (n.value = c, e.push(n))
				});
				setImmediate(function() {
					return $(e).trigger("change")
				})
			}
		}, $(window).on("pageshow pjax:end", function() {
			n(t())
		}), $(window).on("pagehide", function() {
			e(t())
		}), $(window).on("pjax:beforeReplace", function(n) {
			var i, r, s, a;
			(a = null != (s = n.previousState) ? s.url : void 0) ? (r = t(new URL(a)), e(r)) : (i = new Error("pjax:beforeReplace event.previousState.url is undefined"), setImmediate(function() {
				throw i
			}))
		})
	}.call(this),
	function() {
		$(document).on("ajaxSuccess", ".js-social-container", function(t, e, n, i) {
			return $(this).find(".js-social-count").text(i.count)
		})
	}.call(this), // Copyright (c) 2010-2012, Joe Walnes
	// The above copyright notice and this permission notice shall be included in
	// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	function(t, e) {
		"function" == typeof define && define.amd ? define([], e) : "undefined" != typeof module && module.exports ? module.exports = e() : t.ReconnectingWebSocket = e()
	}(this, function() {
		function t(e, n, i) {
			function r(t, e) {
				var n = document.createEvent("CustomEvent");
				return n.initCustomEvent(t, !1, !1, e), n
			}
			var s = {
				debug: !1,
				automaticOpen: !0,
				reconnectInterval: 1e3,
				maxReconnectInterval: 3e4,
				reconnectDecay: 1.5,
				timeoutInterval: 2e3,
				maxReconnectAttempts: null
			};
			i || (i = {});
			for (var a in s) this[a] = "undefined" != typeof i[a] ? i[a] : s[a];
			this.url = e, this.reconnectAttempts = 0, this.readyState = WebSocket.CONNECTING, this.protocol = null;
			var o, c = this,
				u = !1,
				l = !1,
				d = document.createElement("div");
			d.addEventListener("open", function(t) {
				c.onopen(t)
			}), d.addEventListener("close", function(t) {
				c.onclose(t)
			}), d.addEventListener("connecting", function(t) {
				c.onconnecting(t)
			}), d.addEventListener("message", function(t) {
				c.onmessage(t)
			}), d.addEventListener("error", function(t) {
				c.onerror(t)
			}), this.addEventListener = d.addEventListener.bind(d), this.removeEventListener = d.removeEventListener.bind(d), this.dispatchEvent = d.dispatchEvent.bind(d), this.open = function(e) {
				if (o = new WebSocket(c.url, n || []), e) {
					if (this.maxReconnectAttempts && this.reconnectAttempts > this.maxReconnectAttempts) return
				} else d.dispatchEvent(r("connecting")), this.reconnectAttempts = 0;
				(c.debug || t.debugAll) && console.debug("ReconnectingWebSocket", "attempt-connect", c.url);
				var i = o,
					s = setTimeout(function() {
						(c.debug || t.debugAll) && console.debug("ReconnectingWebSocket", "connection-timeout", c.url), l = !0, i.close(), l = !1
					}, c.timeoutInterval);
				o.onopen = function() {
					clearTimeout(s), (c.debug || t.debugAll) && console.debug("ReconnectingWebSocket", "onopen", c.url), c.protocol = o.protocol, c.readyState = WebSocket.OPEN, c.reconnectAttempts = 0;
					var n = r("open");
					n.isReconnect = e, e = !1, d.dispatchEvent(n)
				}, o.onclose = function(n) {
					if (clearTimeout(s), o = null, u) c.readyState = WebSocket.CLOSED, d.dispatchEvent(r("close"));
					else {
						c.readyState = WebSocket.CONNECTING;
						var i = r("connecting");
						i.code = n.code, i.reason = n.reason, i.wasClean = n.wasClean, d.dispatchEvent(i), e || l || ((c.debug || t.debugAll) && console.debug("ReconnectingWebSocket", "onclose", c.url), d.dispatchEvent(r("close")));
						var s = c.reconnectInterval * Math.pow(c.reconnectDecay, c.reconnectAttempts);
						setTimeout(function() {
							c.reconnectAttempts++, c.open(!0)
						}, s > c.maxReconnectInterval ? c.maxReconnectInterval : s)
					}
				}, o.onmessage = function(e) {
					(c.debug || t.debugAll) && console.debug("ReconnectingWebSocket", "onmessage", c.url, e.data);
					var n = r("message");
					n.data = e.data, d.dispatchEvent(n)
				}, o.onerror = function(e) {
					(c.debug || t.debugAll) && console.debug("ReconnectingWebSocket", "onerror", c.url, e), d.dispatchEvent(r("error"))
				}
			}, 1 == this.automaticOpen && this.open(!1), this.send = function(e) {
				if (o) return (c.debug || t.debugAll) && console.debug("ReconnectingWebSocket", "send", c.url, e), o.send(e);
				throw "INVALID_STATE_ERR : Pausing to reconnect websocket"
			}, this.close = function(t, e) {
				"undefined" == typeof t && (t = 1e3), u = !0, o && o.close(t, e)
			}, this.refresh = function() {
				o && o.close()
			}
		}
		if ("WebSocket" in window) return t.prototype.onopen = function() {}, t.prototype.onclose = function() {}, t.prototype.onconnecting = function() {}, t.prototype.onmessage = function() {}, t.prototype.onerror = function() {}, t.debugAll = !1, t.CONNECTING = WebSocket.CONNECTING, t.OPEN = WebSocket.OPEN, t.CLOSING = WebSocket.CLOSING, t.CLOSED = WebSocket.CLOSED, t
	}),
	function() {
		var t, e, n, i, r, s, a;
		"undefined" != typeof WebSocket && null !== WebSocket && (s = {}, e = {}, t = null, i = function() {
			var t, n;
			if (t = document.head.querySelector("link[rel=web-socket]")) return n = new ReconnectingWebSocket(t.href), n.reconnectInterval = 2e3 * Math.random() + 1e3, n.reconnectDecay = 2, n.maxReconnectAttempts = 5, n.addEventListener("open", function() {
				var t, e, i;
				i = [];
				for (e in s) t = s[e], i.push(n.send("subscribe:" + e));
				return i
			}), n.addEventListener("message", function(t) {
				var n, i, r;
				r = JSON.parse(t.data), i = r[0], n = r[1], i && n && $(e[i]).trigger("socket:message", [n, i])
			}), n
		}, n = function(t) {
			var e, n;
			return null != (e = null != (n = t.getAttribute("data-channel")) ? n.split(/\s+/) : void 0) ? e : []
		}, r = function(r) {
			var a, o, c, u, l;
			if (null != t ? t : t = i())
				for (l = t, u = n(r), a = 0, o = u.length; o > a; a++) c = u[a], l.readyState !== WebSocket.OPEN || s[c] || l.send("subscribe:" + c), s[c] = !0, null == e[c] && (e[c] = []), e[c].push(r)
		}, a = function(t) {
			var i, r, s, a;
			for (a = n(t), i = 0, r = a.length; r > i; i++) s = a[i], e[s] = $(e[s]).not(t).slice(0)
		}, $.observe(".js-socket-channel[data-channel]", {
			add: r,
			remove: a
		}))
	}.call(this),
	function() {
		var t, e, n, i, r, s, a, o, c, u, l, d, h, f = function(t, e) {
			return function() {
				return t.apply(e, arguments)
			}
		};
		d = function(t, e, n) {
			var i, r, s, a;
			return a = n[3], r = n[4], s = e - r.length, i = e, {
				type: t,
				text: a,
				query: r,
				startIndex: s,
				endIndex: i
			}
		}, a = {}, t = function() {
			function t(t) {
				this.textarea = t, this.deactivate = f(this.deactivate, this), this.onNavigationOpen = f(this.onNavigationOpen, this), this.onNavigationKeyDown = f(this.onNavigationKeyDown, this), this.onInput = f(this.onInput, this), this.onPaste = f(this.onPaste, this), this.teardown = f(this.teardown, this), $(this.textarea).on("focusout:delayed.suggester", this.teardown), $(this.textarea.form).on("reset.suggester", this.deactivate), $(this.textarea).on("paste.suggester", this.onPaste), $(this.textarea).on("input.suggester", this.onInput), this.suggester = $(this.textarea).closest(".js-suggester-container").find(".js-suggester")[0], $(this.suggester).on("navigation:keydown.suggester", "[data-value]", this.onNavigationKeyDown), $(this.suggester).on("navigation:open.suggester", "[data-value]", this.onNavigationOpen), this.loadSuggestions()
			}
			var e, i;
			return t.prototype.types = {
				mention: {
					match: /(^|\s)(@([a-z0-9\-_\/]*))$/i,
					replace: "$1@$value ",
					search: function(t, e) {
						var i, r, s;
						return s = c(e), i = $(t).find("ul.mention-suggestions"), r = i.fuzzyFilterSortList(e, {
							limit: 5,
							text: n,
							score: s.score
						}), Promise.resolve([i, r])
					}
				},
				auditLogUser: {
					match: /(^|\s)((\-?actor:|\-?user:)([a-z0-9\-\+_]*))$/i,
					replace: "$1$3$value ",
					search: function(t, e) {
						var n, i;
						return n = $(t).find("ul.user-suggestions"), i = n.fuzzyFilterSortList(e, {
							limit: 5
						}), Promise.resolve([n, i])
					},
					normalizeMatch: d
				},
				auditLogOrg: {
					match: /(^|\s)((\-?org:)([a-z0-9\-\+_]*))$/i,
					replace: "$1$3$value ",
					search: function(t, e) {
						var n, i;
						return n = $(t).find("ul.org-suggestions"), i = n.fuzzyFilterSortList(e, {
							limit: 5
						}), Promise.resolve([n, i])
					},
					normalizeMatch: d
				},
				auditLogAction: {
					match: /(^|\s)((\-?action:)([a-z0-9\.\-\+_]*))$/i,
					replace: "$1$3$value ",
					search: function(t, e) {
						var n, i;
						return n = $(t).find("ul.action-suggestions"), i = n.fuzzyFilterSortList(e, {
							limit: 5
						}), Promise.resolve([n, i])
					},
					normalizeMatch: d
				},
				auditLogRepo: {
					match: /(^|\s)((\-?repo:)([a-z0-9\/\-\+_]*))$/i,
					replace: "$1$3$value ",
					search: function(t, e) {
						var n, i;
						return n = $(t).find("ul.repo-suggestions"), i = n.fuzzyFilterSortList(e, {
							limit: 5
						}), Promise.resolve([n, i])
					},
					normalizeMatch: d
				},
				auditLogCountry: {
					match: /(^|\s)((\-?country:)([a-z0-9\-\+_]*))$/i,
					replace: "$1$3$value ",
					search: function(t, e) {
						var n, i;
						return n = $(t).find("ul.country-suggestions"), i = n.fuzzyFilterSortList(e, {
							limit: 5
						}), Promise.resolve([n, i])
					},
					normalizeMatch: d
				},
				emoji: {
					match: /(^|\s)(:([a-z0-9\-\+_]*))$/i,
					replace: "$1:$value: ",
					search: function(t, e) {
						var n, i;
						return n = $(t).find("ul.emoji-suggestions"), e = " " + e.toLowerCase().replace(/_/g, " "), i = n.fuzzyFilterSortList(e, {
							limit: 5,
							text: s,
							score: r
						}), Promise.resolve([n, i])
					}
				},
				hashed: {
					match: /(^|\s)(\#([a-z0-9\-_\/]*))$/i,
					replace: "$1#$value ",
					search: function(t, e) {
						var i, r, s, a;
						return r = $(t).find("ul.hashed-suggestions"), i = /^\d+$/.test(e) ? (s = new RegExp("\\b" + e), function(t) {
							return l(t, s)
						}) : c(e).score, a = r.fuzzyFilterSortList(e, {
							limit: 5,
							text: n,
							score: i
						}), Promise.resolve([r, a])
					}
				}
			}, i = function(t) {
				return t.replace(/`{3,}[^`]*\n(.+)?\n`{3,}/g, "")
			}, e = function(t) {
				var e, n;
				return (null != (e = t.match(/`{3,}/g)) ? e.length : void 0) % 2 ? !0 : (null != (n = i(t).match(/`/g)) ? n.length : void 0) % 2 ? !0 : void 0
			}, t.prototype.teardown = function() {
				this.deactivate(), $(this.textarea).off(".suggester"), $(this.textarea.form).off(".suggester"), $(this.suggester).off(".suggester"), this.onSuggestionsLoaded = function() {
					return null
				}
			}, t.prototype.onPaste = function() {
				this.deactivate(), this.justPasted = !0
			}, t.prototype.onInput = function() {
				return this.justPasted ? void(this.justPasted = !1) : this.checkQuery() ? !1 : void 0
			}, t.prototype.onNavigationKeyDown = function(t) {
				switch (t.hotkey) {
					case "tab":
						return this.onNavigationOpen(t), !1;
					case "esc":
						return this.deactivate(), t.stopImmediatePropagation(), !1
				}
			}, t.prototype.onNavigationOpen = function(t) {
				var e, n, i;
				i = $(t.target).attr("data-value"), n = this.textarea.value.substring(0, this.currentSearch.endIndex), e = this.textarea.value.substring(this.currentSearch.endIndex), n = n.replace(this.currentSearch.type.match, this.currentSearch.type.replace.replace("$value", i)), this.textarea.value = n + e, this.deactivate(), this.textarea.focus(), this.textarea.selectionStart = n.length, this.textarea.selectionEnd = n.length
			}, t.prototype.checkQuery = function() {
				var t, e;
				if (e = this.searchQuery()) {
					if (e.query === (null != (t = this.currentSearch) ? t.query : void 0)) return;
					return this.currentSearch = e, this.search(e.type, e.query).then(function(t) {
						return function(n) {
							return n ? t.activate(e.startIndex) : t.deactivate()
						}
					}(this)), this.currentSearch.query
				}
				this.currentSearch = null, this.deactivate()
			}, t.prototype.activate = function(t) {
				$(this.suggester).css($(this.textarea).textFieldSelectionPosition(t + 1)), $(this.suggester).hasClass("active") || ($(this.suggester).addClass("active"), $(this.textarea).addClass("js-navigation-enable"), $(this.suggester).navigation("push"), $(this.suggester).navigation("focus"))
			}, t.prototype.deactivate = function() {
				$(this.suggester).hasClass("active") && ($(this.suggester).removeClass("active"), $(this.suggester).find(".suggestions").hide(), $(this.textarea).removeClass("js-navigation-enable"), $(this.suggester).navigation("pop"))
			}, t.prototype.search = function(t, e) {
				return t.search(this.suggester, e).then(function(t) {
					return function(e) {
						var n, i;
						return n = e[0], i = e[1], i > 0 ? (n.show(), $(t.suggester).navigation("focus"), !0) : !1
					}
				}(this))
			}, t.prototype.searchQuery = function() {
				var t, n, i, r, s, a, o;
				if (r = this.textarea.selectionEnd, a = this.textarea.value.substring(0, r), !e(a)) {
					s = this.types;
					for (i in s)
						if (o = s[i], t = a.match(o.match)) return n = null != o.normalizeMatch ? o.normalizeMatch(o, r, t) : this.normalizeMatch(o, r, t)
				}
			}, t.prototype.normalizeMatch = function(t, e, n) {
				var i, r, s, a;
				return a = n[2], r = n[3], s = e - a.length, i = e, {
					type: t,
					text: a,
					query: r,
					startIndex: s,
					endIndex: i
				}
			}, t.prototype.loadSuggestions = function() {
				var t, e;
				if (null == this.suggester.firstElementChild && (e = this.suggester.getAttribute("data-url"), null != e)) return t = null != a[e] ? a[e] : a[e] = $.fetchText(e), t.then(function(t) {
					return function(e) {
						return t.onSuggestionsLoaded(e)
					}
				}(this))
			}, t.prototype.onSuggestionsLoaded = function(t) {
				return $(this.suggester).html(t), document.activeElement === this.textarea ? (this.currentSearch = null, this.checkQuery()) : void 0
			}, t
		}(), i = {}, s = function(t) {
			var e;
			return e = t.getAttribute("data-value"), i[e] = " " + n(t).replace(/_/g, " "), e
		}, n = function(t) {
			return t.getAttribute("data-text").trim().toLowerCase()
		}, r = function(t, e) {
			var n;
			return n = i[t].indexOf(e), n > -1 ? 1e3 - n : 0
		}, l = function(t, e) {
			var n;
			return n = t.search(e), n > -1 ? 1e3 - n : 0
		}, h = function(t, n) {
			var i, r, s, a, o, c, l;
			if (l = e(t, n[0]), 0 !== l.length) {
				if (1 === n.length) return [l[0], 1, []];
				for (o = null, r = 0, s = l.length; s > r; r++) c = l[r], (i = u(t, n, c + 1)) && (a = i[i.length - 1] - c, (!o || a < o[1]) && (o = [c, a, i]));
				return o
			}
		}, e = function(t, e) {
			var n, i;
			for (n = 0, i = [];
				(n = t.indexOf(e, n)) > -1;) i.push(n++);
			return i
		}, u = function(t, e, n) {
			var i, r, s, a;
			for (r = [], i = s = 1, a = e.length; a >= 1 ? a > s : s > a; i = a >= 1 ? ++s : --s) {
				if (n = t.indexOf(e[i], n), -1 === n) return;
				r.push(n++)
			}
			return r
		}, o = function() {
			return 2
		}, c = function(t) {
			var e, n;
			return t ? (e = t.toLowerCase().split(""), n = function(n) {
				var i, r;
				return n && (i = h(n, e)) ? (r = t.length / i[1], r /= i[0] / 2 + 1) : 0
			}) : n = o, {
				score: n
			}
		}, $(document).on("focusin:delayed", ".js-suggester-field", function() {
			new t(this)
		})
	}.call(this),
	function() {
		$(document).on("tasklist:change", ".js-task-list-container", function() {
			$(this).taskList("disable")
		}), $(document).on("tasklist:changed", ".js-task-list-container", function(t, e, n) {
			var i, r, s, a;
			return r = $(this).find("form.js-comment-update"), s = r.find("input[name=task_list_key]"), s.length > 0 || (a = r.find(".js-task-list-field").attr("name").split("[")[0], s = $("<input>", {
				type: "hidden",
				name: "task_list_key",
				value: a
			}), r.append(s)), n = n ? "1" : "0", i = $("<input>", {
				type: "hidden",
				name: "task_list_checked",
				value: n
			}), r.append(i), r.one("ajaxComplete", function(t, e) {
				return i.remove(), 200 !== e.status || /^\s*</.test(e.responseText) ? 422 === e.status && e.stale ? window.location.reload() : void 0 : $(this).taskList("enable")
			}), r.submit()
		}), $.observe(".task-list", function() {
			$(this).taskList("enable")
		})
	}.call(this),
	function() {
		var t, e, n;
		t = function() {
			var t, i, r, s, a, o;
			if (o = this.getAttribute("data-url")) return a = $.fetchJSON(o), r = this.getAttribute("data-id"), s = $(".js-team-mention[data-id='" + r + "']"), s.removeAttr("data-url"), t = function(t) {
				return 0 === t.total ? t.members.push("This team has no members") : t.total > t.members.length && t.members.push(t.total - t.members.length + " more"), n(s, e(t.members))
			}, i = function(t) {
				return function(e) {
					var i, r, a;
					return a = (null != (r = e.response) ? r.status : void 0) || 500, i = function() {
						switch (a) {
							case 404:
								return this.getAttribute("data-permission-text");
							default:
								return this.getAttribute("data-error-text")
						}
					}.call(t), n(s, i)
				}
			}(this), a.then(t, i)
		}, n = function(t, e) {
			return t.attr("aria-label", e), t.addClass("tooltipped tooltipped-s tooltipped-multiline")
		}, e = function(t) {
			var e;
			return 0 === t.length ? "" : 1 === t.length ? t[0] : 2 === t.length ? t.join(" and ") : ([].splice.apply(t, [-1, 9e9].concat(e = "and " + t.slice(-1))), t.join(", "))
		}, $.observe(".js-team-mention", function() {
			$(this).on("mouseenter", t)
		})
	}.call(this),
	function() {
		$(document).on("ajaxBeforeSend", function(t, e, n) {
			var i;
			n.crossDomain || (i = $(".js-timeline-marker"), i.length && e.setRequestHeader("X-Timeline-Last-Modified", i.attr("data-last-modified")))
		})
	}.call(this),
	/**
	 * This script gives you the zone info key representing your device's time zone setting.
	 *
	 * @name jsTimezoneDetect
	 * @version 1.0.5
	 * @author Jon Nylander
	 * @license MIT License - http://www.opensource.org/licenses/mit-license.php
	 *
	 * For usage and examples, visit:
	 * http://pellepim.bitbucket.org/jstz/
	 *
	 * Copyright (c) Jon Nylander
	 */
	function(t) {
		var e = function() {
			"use strict";
			var t = "s",
				n = function(t) {
					var e = -t.getTimezoneOffset();
					return null !== e ? e : 0
				},
				i = function(t, e, n) {
					var i = new Date;
					return void 0 !== t && i.setFullYear(t), i.setMonth(e), i.setDate(n), i
				},
				r = function(t) {
					return n(i(t, 0, 2))
				},
				s = function(t) {
					return n(i(t, 5, 2))
				},
				a = function(t) {
					var e = t.getMonth() > 7,
						i = e ? s(t.getFullYear()) : r(t.getFullYear()),
						a = n(t),
						o = 0 > i,
						c = i - a;
					return o || e ? 0 !== c : 0 > c
				},
				o = function() {
					var e = r(),
						n = s(),
						i = e - n;
					return 0 > i ? e + ",1" : i > 0 ? n + ",1," + t : e + ",0"
				},
				c = function() {
					var t = o();
					return new e.TimeZone(e.olson.timezones[t])
				},
				u = function(t) {
					var e = new Date(2010, 6, 15, 1, 0, 0, 0),
						n = {
							"America/Denver": new Date(2011, 2, 13, 3, 0, 0, 0),
							"America/Mazatlan": new Date(2011, 3, 3, 3, 0, 0, 0),
							"America/Chicago": new Date(2011, 2, 13, 3, 0, 0, 0),
							"America/Mexico_City": new Date(2011, 3, 3, 3, 0, 0, 0),
							"America/Asuncion": new Date(2012, 9, 7, 3, 0, 0, 0),
							"America/Santiago": new Date(2012, 9, 3, 3, 0, 0, 0),
							"America/Campo_Grande": new Date(2012, 9, 21, 5, 0, 0, 0),
							"America/Montevideo": new Date(2011, 9, 2, 3, 0, 0, 0),
							"America/Sao_Paulo": new Date(2011, 9, 16, 5, 0, 0, 0),
							"America/Los_Angeles": new Date(2011, 2, 13, 8, 0, 0, 0),
							"America/Santa_Isabel": new Date(2011, 3, 5, 8, 0, 0, 0),
							"America/Havana": new Date(2012, 2, 10, 2, 0, 0, 0),
							"America/New_York": new Date(2012, 2, 10, 7, 0, 0, 0),
							"Europe/Helsinki": new Date(2013, 2, 31, 5, 0, 0, 0),
							"Pacific/Auckland": new Date(2011, 8, 26, 7, 0, 0, 0),
							"America/Halifax": new Date(2011, 2, 13, 6, 0, 0, 0),
							"America/Goose_Bay": new Date(2011, 2, 13, 2, 1, 0, 0),
							"America/Miquelon": new Date(2011, 2, 13, 5, 0, 0, 0),
							"America/Godthab": new Date(2011, 2, 27, 1, 0, 0, 0),
							"Europe/Moscow": e,
							"Asia/Amman": new Date(2013, 2, 29, 1, 0, 0, 0),
							"Asia/Beirut": new Date(2013, 2, 31, 2, 0, 0, 0),
							"Asia/Damascus": new Date(2013, 3, 6, 2, 0, 0, 0),
							"Asia/Jerusalem": new Date(2013, 2, 29, 5, 0, 0, 0),
							"Asia/Yekaterinburg": e,
							"Asia/Omsk": e,
							"Asia/Krasnoyarsk": e,
							"Asia/Irkutsk": e,
							"Asia/Yakutsk": e,
							"Asia/Vladivostok": e,
							"Asia/Baku": new Date(2013, 2, 31, 4, 0, 0),
							"Asia/Yerevan": new Date(2013, 2, 31, 3, 0, 0),
							"Asia/Kamchatka": e,
							"Asia/Gaza": new Date(2010, 2, 27, 4, 0, 0),
							"Africa/Cairo": new Date(2010, 4, 1, 3, 0, 0),
							"Europe/Minsk": e,
							"Pacific/Apia": new Date(2010, 10, 1, 1, 0, 0, 0),
							"Pacific/Fiji": new Date(2010, 11, 1, 0, 0, 0),
							"Australia/Perth": new Date(2008, 10, 1, 1, 0, 0, 0)
						};
					return n[t]
				};
			return {
				determine: c,
				date_is_dst: a,
				dst_start_for: u
			}
		}();
		e.TimeZone = function(t) {
			"use strict";
			var n = {
					"America/Denver": ["America/Denver", "America/Mazatlan"],
					"America/Chicago": ["America/Chicago", "America/Mexico_City"],
					"America/Santiago": ["America/Santiago", "America/Asuncion", "America/Campo_Grande"],
					"America/Montevideo": ["America/Montevideo", "America/Sao_Paulo"],
					"Asia/Beirut": ["Asia/Amman", "Asia/Jerusalem", "Asia/Beirut", "Europe/Helsinki", "Asia/Damascus"],
					"Pacific/Auckland": ["Pacific/Auckland", "Pacific/Fiji"],
					"America/Los_Angeles": ["America/Los_Angeles", "America/Santa_Isabel"],
					"America/New_York": ["America/Havana", "America/New_York"],
					"America/Halifax": ["America/Goose_Bay", "America/Halifax"],
					"America/Godthab": ["America/Miquelon", "America/Godthab"],
					"Asia/Dubai": ["Europe/Moscow"],
					"Asia/Dhaka": ["Asia/Yekaterinburg"],
					"Asia/Jakarta": ["Asia/Omsk"],
					"Asia/Shanghai": ["Asia/Krasnoyarsk", "Australia/Perth"],
					"Asia/Tokyo": ["Asia/Irkutsk"],
					"Australia/Brisbane": ["Asia/Yakutsk"],
					"Pacific/Noumea": ["Asia/Vladivostok"],
					"Pacific/Tarawa": ["Asia/Kamchatka", "Pacific/Fiji"],
					"Pacific/Tongatapu": ["Pacific/Apia"],
					"Asia/Baghdad": ["Europe/Minsk"],
					"Asia/Baku": ["Asia/Yerevan", "Asia/Baku"],
					"Africa/Johannesburg": ["Asia/Gaza", "Africa/Cairo"]
				},
				i = t,
				r = function() {
					for (var t = n[i], r = t.length, s = 0, a = t[0]; r > s; s += 1)
						if (a = t[s], e.date_is_dst(e.dst_start_for(a))) return void(i = a)
				},
				s = function() {
					return "undefined" != typeof n[i]
				};
			return s() && r(), {
				name: function() {
					return i
				}
			}
		}, e.olson = {}, e.olson.timezones = {
			"-720,0": "Pacific/Majuro",
			"-660,0": "Pacific/Pago_Pago",
			"-600,1": "America/Adak",
			"-600,0": "Pacific/Honolulu",
			"-570,0": "Pacific/Marquesas",
			"-540,0": "Pacific/Gambier",
			"-540,1": "America/Anchorage",
			"-480,1": "America/Los_Angeles",
			"-480,0": "Pacific/Pitcairn",
			"-420,0": "America/Phoenix",
			"-420,1": "America/Denver",
			"-360,0": "America/Guatemala",
			"-360,1": "America/Chicago",
			"-360,1,s": "Pacific/Easter",
			"-300,0": "America/Bogota",
			"-300,1": "America/New_York",
			"-270,0": "America/Caracas",
			"-240,1": "America/Halifax",
			"-240,0": "America/Santo_Domingo",
			"-240,1,s": "America/Santiago",
			"-210,1": "America/St_Johns",
			"-180,1": "America/Godthab",
			"-180,0": "America/Argentina/Buenos_Aires",
			"-180,1,s": "America/Montevideo",
			"-120,0": "America/Noronha",
			"-120,1": "America/Noronha",
			"-60,1": "Atlantic/Azores",
			"-60,0": "Atlantic/Cape_Verde",
			"0,0": "UTC",
			"0,1": "Europe/London",
			"60,1": "Europe/Berlin",
			"60,0": "Africa/Lagos",
			"60,1,s": "Africa/Windhoek",
			"120,1": "Asia/Beirut",
			"120,0": "Africa/Johannesburg",
			"180,0": "Asia/Baghdad",
			"180,1": "Europe/Moscow",
			"210,1": "Asia/Tehran",
			"240,0": "Asia/Dubai",
			"240,1": "Asia/Baku",
			"270,0": "Asia/Kabul",
			"300,1": "Asia/Yekaterinburg",
			"300,0": "Asia/Karachi",
			"330,0": "Asia/Kolkata",
			"345,0": "Asia/Kathmandu",
			"360,0": "Asia/Dhaka",
			"360,1": "Asia/Omsk",
			"390,0": "Asia/Rangoon",
			"420,1": "Asia/Krasnoyarsk",
			"420,0": "Asia/Jakarta",
			"480,0": "Asia/Shanghai",
			"480,1": "Asia/Irkutsk",
			"525,0": "Australia/Eucla",
			"525,1,s": "Australia/Eucla",
			"540,1": "Asia/Yakutsk",
			"540,0": "Asia/Tokyo",
			"570,0": "Australia/Darwin",
			"570,1,s": "Australia/Adelaide",
			"600,0": "Australia/Brisbane",
			"600,1": "Asia/Vladivostok",
			"600,1,s": "Australia/Sydney",
			"630,1,s": "Australia/Lord_Howe",
			"660,1": "Asia/Kamchatka",
			"660,0": "Pacific/Noumea",
			"690,0": "Pacific/Norfolk",
			"720,1,s": "Pacific/Auckland",
			"720,0": "Pacific/Tarawa",
			"765,1,s": "Pacific/Chatham",
			"780,0": "Pacific/Tongatapu",
			"780,1,s": "Pacific/Apia",
			"840,0": "Pacific/Kiritimati"
		}, "undefined" != typeof exports ? exports.jstz = e : t.jstz = e
	}(this),
	function() {
		var t, e;
		e = jstz.determine().name(), "https:" === location.protocol && (t = "secure"), document.cookie = "tz=" + encodeURIComponent(e) + "; path=/; " + t
	}.call(this),
	function() {
		var t, e;
		e = function() {
			if (!window.performance.timing) try {
				return sessionStorage.setItem("navigationStart", Date.now())
			} catch (t) {}
		}, t = function() {
			return setTimeout(function() {
				var t, e, n, i, r, s, a, o, c, u, l, d;
				if (l = {}, l.crossBrowserLoadEvent = Date.now(), window.performance.timing) {
					s = window.performance.timing;
					for (n in s) d = s[n], "number" == typeof d && (l[n] = d);
					(t = null != (a = window.chrome) && "function" == typeof a.loadTimes && null != (o = a.loadTimes()) ? o.firstPaintTime : void 0) && (l.chromeFirstPaintTime = Math.round(1e3 * t))
				} else r = function() {
					try {
						return sessionStorage.getItem("navigationStart")
					} catch (t) {}
				}(), r && (l.simulatedNavigationStart = parseInt(r, 10));
				for (u = function() {
					var t, e, n, i;
					for (n = window.performance.getEntriesByType("resource"), i = [], t = 0, e = n.length; e > t; t++) c = n[t], i.push($.extend({}, c));
					return i
				}(), e = 0, i = u.length; i > e; e++) c = u[e], delete c.toJSON;
				return Object.keys(l).length > 1 || u.length ? GitHub.stats({
					timing: l,
					resources: u
				}) : void 0
			}, 0)
		}, $(window).on("pagehide", e), $(window).on("load", t)
	}.call(this),
	function() {
		$(document).on("click", ".js-toggler-container .js-toggler-target", function(t) {
			return 1 === t.which ? ($(t.target).trigger("toggler:toggle"), 0 === $(this).parent(".js-toggler-form").length ? !1 : void 0) : void 0
		}), $(document).on("ajaxBeforeSend", ".js-toggler-container", function() {
			return this.classList.remove("success", "error"), this.classList.add("loading")
		}), $(document).on("ajaxComplete", ".js-toggler-container", function() {
			return this.classList.remove("loading")
		}), $(document).on("ajaxSuccess", ".js-toggler-container", function() {
			return this.classList.add("success")
		}), $(document).on("ajaxError", ".js-toggler-container", function() {
			return this.classList.add("error")
		}), $(document).on("toggler:toggle", ".js-toggler-container", function() {
			return this.classList.toggle("on")
		})
	}.call(this),
	function() {
		var t, e;
		e = 0, t = function() {
			var t;
			if (document.hasFocus()) return t = $(".js-timeline-marker").attr("data-mark-as-read-url"), t ? $.ajax({
				url: t,
				type: "post"
			}) : void 0
		}, $.inViewport(".js-unread-item", {
			"in": function() {
				return $(this).removeClass("js-unread-item unread-item")
			}
		}), $.observe(".js-unread-item", {
			add: function() {
				return e++
			},
			remove: function() {
				return e--, 0 === e ? t(this) : void 0
			}
		}), $(document).on("socket:message", ".js-discussion", function(t) {
			return this === t.target ? $(".js-unread-item").removeClass("js-unread-item unread-item") : void 0
		})
	}.call(this),
	function() {
		var t, e, n;
		$.fn.updateContent = function(t) {
			var n;
			return null != (n = this.data("xhr")) && n.abort(), e(this[0], t)
		}, $(document).on("socket:message", ".js-updatable-content", function(e, i, r) {
			var s;
			this === e.target && null == $(this).data("xhr") && (s = t(this, r).then(function(t) {
				return function(e) {
					return n(t, e)
				}
			}(this)), s["catch"](function(t) {
				return function(e) {
					return "XMLHttpRequest abort" !== e.message ? console.warn("Failed to update content", t, e) : void 0
				}
			}(this)))
		}), t = function(t, e) {
			var n;
			return null == e && (e = null), n = $(t).ajax({
				channel: e
			}), Promise.resolve(n)["catch"](function(t) {
				throw new Error("XMLHttpRequest " + t.statusText)
			})
		}, e = function(t, e) {
			return $.preserveInteractivePosition(function() {
				var n;
				return n = $($.parseHTML($.trim(e))), $(t).replaceWith(n), n
			})
		}, n = function(t, n) {
			if ($(t).hasInteractions()) throw new Error("element had interactions");
			return e(t, n)
		}
	}.call(this),
	function() {
		$(document).on("upload:complete", ".js-upload-avatar-image", function(t) {
			var e, n;
			return e = t.originalEvent.detail.result, n = "/settings/avatars/" + e.id, $.facebox(function() {
				return $.fetchText(n).then($.facebox)
			})
		})
	}.call(this),
	function() {
		var t, e, n, i;
		n = function(t) {
			return t.toLowerCase().replace(/[^a-z0-9\-_]+/gi, ".").replace(/\.{2,}/g, ".").replace(/^\.|\.$/gi, "")
		}, i = function(t) {
			var n;
			return n = e(t) ? "!" : "", n + ("[Uploading " + t.name + "\u2026]()")
		}, t = function(t) {
			return n(t).replace(/\.[^.]+$/, "").replace(/\./g, " ")
		}, e = function(t) {
			var e;
			return "image/gif" === (e = t.type) || "image/png" === e || "image/jpg" === e || "image/jpeg" === e
		}, $(document).on("upload:setup", ".js-upload-markdown-image", function(t) {
			var e;
			return e = this.querySelector(".js-comment-field"), $(e).insertText(i(t.originalEvent.detail.file) + "\n"), $(this).trigger("validation:change", !1)
		}), $(document).on("upload:complete", ".js-upload-markdown-image", function(n) {
			var r, s, a, o;
			return o = n.originalEvent.detail, r = this.querySelector(".js-comment-field"), a = i(o.file), s = e(o.file) ? "![" + t(o.policy.asset.name) + "](" + o.policy.asset.href + ")" : "[" + o.file.name + "](" + o.policy.asset.href + ")", $(r).replaceText(a, s), $(this).trigger("validation:field:change")
		}), $(document).on("upload:error", ".js-upload-markdown-image", function(t) {
			var e, n;
			return e = this.querySelector(".js-comment-field"), n = i(t.originalEvent.detail.file), $(e).replaceText(n, ""), $(this).trigger("validation:field:change")
		}), $(document).on("upload:invalid", ".js-upload-markdown-image", function(t) {
			var e, n;
			return e = this.querySelector(".js-comment-field"), n = i(t.originalEvent.detail.file), $(e).replaceText(n, ""), $(this).trigger("validation:field:change")
		})
	}.call(this),
	function() {
		$(document).on("upload:complete", ".js-upload-oauth-logo", function(t) {
			var e;
			return e = t.originalEvent.detail, this.querySelector(".js-image-field").src = e.policy.asset.href, this.querySelector(".js-oauth-application-logo-id").value = e.policy.asset.id, this.classList.add("has-uploaded-logo")
		})
	}.call(this),
	function() {
		var t;
		t = [], $(document).on("upload:setup", ".js-upload-release-file", function(e) {
			var n;
			if (!document.querySelector("#release_id").value) return e.preventDefault(), t.length > 0 ? t.push(e.originalEvent.detail.ready) : (t.push(e.originalEvent.detail.ready), n = function() {
				var e, n;
				for (n = []; e = t.pop();) n.push(e());
				return n
			}, $("button.js-save-draft").trigger("click", n))
		}), $(document).on("upload:start", ".js-upload-release-file", function() {
			return this.querySelector(".js-upload-meter").classList.remove("hidden")
		}), $(document).on("upload:complete", ".js-upload-release-file", function(t) {
			var e, n, i, r, s;
			return s = t.originalEvent.detail, e = document.querySelector(".js-releases-field"), i = e.querySelector(".js-template").cloneNode(!0), i.classList.remove("template", "js-template"), n = s.policy.asset.name || s.policy.asset.href.split("/").pop(), i.querySelector(".filename").value = n, s.policy.asset.size ? (r = (s.policy.asset.size / 1048576).toFixed(2), i.querySelector(".filesize").textContent = "(" + r + "MB)") : i.querySelector(".filesize").textContent = "", i.querySelector("input[type=hidden].id").value = s.policy.asset.id, e.appendChild(i), e.classList.remove("not-populated"), e.classList.add("is-populated"), this.querySelector(".js-upload-meter").classList.add("hidden")
		}), $(document).on("upload:progress", ".js-upload-release-file", function(t) {
			var e;
			return e = this.querySelector(".js-upload-meter"), e.style.width = t.originalEvent.detail.percent + "%"
		})
	}.call(this),
	function() {
		var t, e, n, i, r, s, a, o, c, u, l, d, h, f, m, p, g, v, b, j, y, w, x, k, C, S, L, T = [].indexOf || function(t) {
			for (var e = 0, n = this.length; n > e; e++)
				if (e in this && this[e] === t) return e;
			return -1
		};
		x = function(t) {
			return t.closest("form").elements.authenticity_token.value
		}, t = function() {
			function t() {
				this.uploads = [], this.busy = !1
			}
			return t.prototype.upload = function(t, e) {
				var n;
				return n = function() {}, this.uploads.push({
					file: t,
					to: e.to,
					sameOrigin: e.sameOrigin,
					csrf: e.csrf,
					form: e.form || {},
					header: e.header || {},
					start: e.start || n,
					progress: e.progress || n,
					complete: e.complete || n,
					error: e.error || n
				}), this.process()
			}, t.prototype.process = function() {
				var t, e, n, i, r, s, a;
				if (!this.busy && 0 !== this.uploads.length) {
					r = this.uploads.shift(), this.busy = !0, a = new XMLHttpRequest, a.open("POST", r.to, !0), r.sameOrigin && a.setRequestHeader("X-CSRF-Token", r.csrf), n = r.header;
					for (e in n) s = n[e], a.setRequestHeader(e, s);
					a.onloadstart = function() {
						return r.start()
					}, a.onload = function(t) {
						return function() {
							var e;
							return 204 === a.status ? (e = a.getResponseHeader("Location"), r.complete({
								href: e
							})) : 201 === a.status ? r.complete(JSON.parse(a.responseText)) : r.error({
								status: a.status,
								body: a.responseText
							}), t.busy = !1, t.process()
						}
					}(this), a.onerror = function() {
						return r.error({
							status: 0,
							body: ""
						})
					}, a.upload.onprogress = function(t) {
						var e;
						return t.lengthComputable ? (e = Math.round(t.loaded / t.total * 100), r.progress(e)) : void 0
					}, t = new FormData, i = r.form;
					for (e in i) s = i[e], t.append(e, s);
					return t.append("file", r.file), a.send(t)
				}
			}, t
		}(), j = ["is-default", "is-uploading", "is-bad-file", "is-too-big", "is-failed", "is-bad-dimensions", "is-empty"], u = function(t, e, n) {
			return t.dispatchEvent(new CustomEvent(e, {
				bubbles: !0,
				cancelable: !0,
				detail: n
			}))
		}, w = function(t, e) {
			var n;
			return (n = t.classList).remove.apply(n, j), t.classList.add(e)
		}, L = new t, y = function(t, e) {
			var n, i;
			return i = function() {
				var n, i, r, o;
				return o = e.getAttribute("data-upload-policy-url"), r = s(t, o, e), n = function(n) {
					var i;
					return u(e, "upload:start", {
						file: t
					}), i = a(t, n, e), L.upload(t, i)
				}, i = function(n) {
					var i;
					return u(e, "upload:invalid", {
						file: t
					}), i = b(n, {
						size: t.size
					}), w(e, i)
				}, r.then(n, i)
			}, n = !u(e, "upload:setup", {
				file: t,
				ready: i
			}), n ? void 0 : i()
		}, s = function(t, e, n) {
			var i, r, s, a, o, c, u;
			return i = new FormData, i.append("name", t.name), i.append("size", t.size), i.append("content_type", t.type), i.append("authenticity_token", x(n)), i.append("repository_id", n.getAttribute("data-upload-repository-id")), (r = null != (s = document.querySelector("#alambic_organization")) ? s.getAttribute("data-id") : void 0) && i.append("organization_id", r), (u = null != (a = document.querySelector("#release_repository_id")) ? a.value : void 0) && i.append("repository_id", u), (c = null != (o = document.querySelector("#release_id")) ? o.value : void 0) && i.append("release_id", c), $.fetchJSON(e, {
				method: "post",
				body: i
			})["catch"](function(t) {
				return null == t.response ? Promise.reject({
					status: 0,
					body: ""
				}) : t.response.text().then(function(e) {
					return Promise.reject({
						status: t.response.status,
						body: e
					})
				})
			})
		}, b = function(t, e) {
			var n, i, r, s, a, o;
			if (400 === t.status) return "is-bad-file";
			if (422 !== t.status) return "is-failed";
			if (i = JSON.parse(t.body), null == (null != i ? i.errors : void 0)) return "is-failed";
			for (a = i.errors, r = 0, s = a.length; s > r; r++) switch (n = a[r], n.field) {
				case "size":
					return o = null != e ? e.size : void 0, null != o && 0 === parseInt(o) ? "is-empty" : "is-too-big";
				case "width":
				case "height":
					return "is-bad-dimensions";
				case "content_type":
				case "name":
					return "is-bad-file"
			}
			return "is-failed"
		}, a = function(t, e, n) {
			var i;
			return i = {
				to: e.upload_url,
				form: e.form,
				header: e.header,
				sameOrigin: e.same_origin,
				csrf: x(n),
				start: function() {
					return w(n, "is-uploading")
				},
				progress: function(e) {
					return u(n, "upload:progress", {
						file: t,
						percent: e
					})
				},
				complete: function(i) {
					var r, s;
					return (null != (s = e.asset_upload_url) ? s.length : void 0) > 0 && (r = new FormData, r.append("authenticity_token", x(n)), $.fetchJSON(e.asset_upload_url, {
						method: "put",
						body: r
					})), u(n, "upload:complete", {
						file: t,
						policy: e,
						result: i
					}), w(n, "is-default")
				},
				error: function(i) {
					var r;
					return u(n, "upload:error", {
						file: t,
						policy: e
					}), r = b(i), w(n, r)
				}
			}
		}, k = function(t) {
			return t.types ? T.call(t.types, "Files") >= 0 : !1
		}, C = function(t) {
			return t.types ? T.call(t.types, "text/uri-list") >= 0 : !1
		}, S = function(t) {
			return t.types ? T.call(t.types, "text/plain") >= 0 : !1
		}, e = function(t, e) {
			var n, i, r, s;
			for (s = [], i = 0, r = t.length; r > i; i++) n = t[i], s.push(y(n, e));
			return s
		}, n = function(t, e) {
			var n, i, r, s, a, o, c;
			if (t) {
				for (n = e.querySelector(".js-comment-field"), a = t.split("\r\n"), o = [], i = 0, r = a.length; r > i; i++) s = a[i], c = l(s) ? "\n![](" + s + ")\n" : s, o.push($(n).insertText(c));
				return o
			}
		}, i = function(t, e) {
			var n;
			return n = e.querySelector(".js-comment-field"), $(n).insertText(t)
		}, l = function(t) {
			var e;
			return e = t.split(".").pop(), "gif" === e || "png" === e || "jpg" === e || "jpeg" === e
		}, o = function(t) {
			return k(t) ? "copy" : C(t) ? "link" : S(t) ? "copy" : "none"
		}, c = function(t) {
			switch (t) {
				case "image/gif":
					return "image.gif";
				case "image/png":
					return "image.png";
				case "image/jpeg":
					return "image.jpg"
			}
		}, f = function(t) {
			return t.preventDefault()
		}, h = function(t) {
			return t.dataTransfer.dropEffect = "none", t.preventDefault()
		}, m = function(t) {
			var e;
			return e = o(t.dataTransfer), t.dataTransfer.dropEffect = e, this.classList.add("dragover"), t.stopPropagation(), t.preventDefault()
		}, p = function(t) {
			return t.dataTransfer.dropEffect = "none", this.classList.remove("dragover"), t.stopPropagation(), t.preventDefault()
		}, g = function(t) {
			var r;
			return this.classList.remove("dragover"), r = t.dataTransfer, r.types ? k(r) ? e(r.files, this) : C(r) ? n(r.getData("text/uri-list"), this) : S(r) && i(r.getData("text/plain"), this) : w(this, "is-bad-browser"), t.stopPropagation(), t.preventDefault()
		}, v = function(t) {
			var n, i, r, s, a, o, u;
			if (null != (null != (o = t.clipboardData) ? o.items : void 0)) {
				for (u = t.clipboardData.items, r = 0, a = u.length; a > r && (s = u[r], !(i = c(s.type))); r++);
				if (i) return n = s.getAsFile(), n.name = i, e([n], this), t.preventDefault()
			}
		}, d = function(t) {
			return t.target.classList.contains("js-manual-file-chooser") ? (t.target.files ? e(t.target.files, this) : w(this, "is-bad-browser"), t.target.value = "") : void 0
		}, r = 0, $.observe(".js-uploadable-container", {
			add: function() {
				return 0 === r++ && (document.addEventListener("drop", f), document.addEventListener("dragover", h)), this.addEventListener("dragenter", m), this.addEventListener("dragover", m), this.addEventListener("dragleave", p), this.addEventListener("drop", g), this.addEventListener("paste", v), this.addEventListener("change", d)
			},
			remove: function() {
				return 0 === --r && (document.removeEventListener("drop", f), document.removeEventListener("dragover", h)), this.removeEventListener("dragenter", m), this.removeEventListener("dragover", m), this.removeEventListener("dragleave", p), this.removeEventListener("drop", g), this.removeEventListener("paste", v), this.removeEventListener("change", d)
			}
		}), ("undefined" == typeof FormData || null === FormData) && document.documentElement.classList.add("no-dnd-uploads")
	}.call(this),
	function() {
		var t, e, n, i, r, s, a;
		a = document.createElement("input"), "checkValidity" in a ? (a.required = !0, a.value = "hi", s = a.cloneNode().checkValidity()) : s = !1, a = null, n = function(i) {
			var r, a, o, c, u;
			if (s) return i.checkValidity();
			if (r = $(i), r.is("[required]") && !e(i)) return !1;
			if (r.is("[pattern]") && !t(i)) return !1;
			if (r.is("form"))
				for (u = i.elements, o = 0, c = u.length; c > o; o++)
					if (a = u[o], !n(a)) return !1;
			return !0
		}, e = function(t) {
			return !!t.value.trim()
		}, t = function(t) {
			var e;
			return e = new RegExp("^(?:" + $(t).attr("pattern") + ")$"), 0 === t.value.search(e)
		}, i = function() {
			var t;
			return t = n(this), t && $(this).trigger("validation:field:change"),
				function() {
					var e;
					e = n(this), e !== t && $(this).trigger("validation:field:change"), t = e
				}
		}, r = ["input[pattern]", "input[required]", "textarea[required]"].join(","), $(document).onFocusedInput(r, i), $(document).on("change", r, i), $.observe(r, function() {
			$(this).trigger("validation:field:change")
		}), $(document).on("validation:field:change", "form", function() {
			var t;
			return t = n(this), $(this).trigger("validation:change", [t])
		}), $(document).on("validation:change", "form", function(t, e) {
			return $(this).find("button[data-disable-invalid]").prop("disabled", !e)
		}), $(document).on("submit", ".js-normalize-submit", function(t) {
			return n(this) ? void 0 : t.preventDefault()
		})
	}.call(this),
	function() {
		var t;
		$.observe(".will-transition-once", {
			add: function() {
				this.addEventListener("transitionend", t)
			},
			remove: function() {
				this.removeEventListener("transitionend", t)
			}
		}), t = function(t) {
			return t.target.classList.remove("will-transition-once")
		}
	}.call(this),
	function() {
		$(document).on("ajaxSuccess", function(t, e) {
			var n;
			(n = e.getResponseHeader("X-XHR-Location")) && (document.location.href = n, t.stopImmediatePropagation())
		})
	}.call(this),
	function() {
		var t;
		t = function() {
			var t, e;
			e = $(this), t = e.find(":selected"), t.attr("data-already-member") ? ($(".js-account-membership-form").addClass("is-member"), $(".js-account-membership-form").removeClass("is-not-member")) : ($(".js-account-membership-form").removeClass("is-member"), $(".js-account-membership-form").addClass("is-not-member"))
		}, $.observe(".js-account-membership", t), $(document).on("change", ".js-account-membership", t)
	}.call(this),
	function() {
		$(function() {
			var t, e;
			if (t = $("meta[name=octolytics-script-host]")[0]) return null == window._octo && (window._octo = []), _octo.push(["enablePerformance"]), _octo.push(["recordPageView"]), e = document.createElement("script"), e.type = "text/javascript", e.async = !0, e.src = "//" + t.content + "/assets/api.js", document.getElementsByTagName("head")[0].appendChild(e)
		}), $(document).on("pjax:complete", function() {
			return "undefined" != typeof _octo && null !== _octo ? _octo.push(["recordPageView"]) : void 0
		})
	}.call(this),
	function() {
		var t, e, n, i, r, s, a, o, c, u, l, d, h, f, m;
		a = null, o = null, h = null, f = null, $(document).on("pjax:send pjax:complete", ".js-contribution-activity", function(t) {
			var e;
			e = "pjax:send" === t.type, this.classList.toggle("loading", e)
		}), $(document).on("graph:load", ".js-calendar-graph", function(t, e) {
			$(this).append(e), n(this)
		}), $.observe(".js-calendar-graph", function() {
			var t;
			t = this.querySelector(".js-calendar-graph-svg"), t && n(this)
		}), $(document).on("click", ".js-calendar-graph rect.day", function(t) {
			var e;
			e = new Date(this.getAttribute("data-date")), c(e, t.shiftKey, !1)
		}), $(document).on("mouseover", ".js-calendar-graph rect.day", function() {
			m(this)
		}), $(document).on("mouseout", ".js-calendar-graph rect.day", function() {
			$(".svg-tip").remove()
		}), n = function(t) {
			var e, n;
			return e = t.getAttribute("data-from"), e && (e = o = new Date(e)), n = t.getAttribute("data-to"), n && (n = new Date(n)), e || n ? c(e, n, !0) : void 0
		}, t = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], m = function(e) {
			var n, i, r, s, a, o, c, u;
			return r = new Date(e.getAttribute("data-date")), i = parseInt(e.getAttribute("data-count")), o = 0 === i ? "No" : $.commafy(i), a = t[r.getUTCMonth()].slice(0, 3) + " " + r.getUTCDate() + ", " + r.getUTCFullYear(), s = $('<div class="svg-tip svg-tip-one-line">\n  <strong>' + o + " " + $.pluralize(i, "contribution") + "</strong> on " + a + "\n</div>").get(0), $(".svg-tip").remove(), document.body.appendChild(s), n = e.getBoundingClientRect(), c = n.left + window.pageXOffset - s.offsetWidth / 2 + n.width / 2, u = n.bottom + window.pageYOffset - s.offsetHeight - 2 * n.height, s.style.top = u + "px", s.style.left = c + "px"
		}, r = function(t) {
			return $.pjax({
				url: t,
				container: ".js-contribution-activity",
				scrollTo: !1,
				replace: !0
			})
		}, l = function(t) {
			var e, n;
			return a = t, e = null, h = null, f = null, n = document.location.pathname + "?tab=contributions&period=" + a, d(), r(n)
		}, u = function(t, e) {
			var n, i;
			return i = t.getAttribute("class").trim().split(" "), i = function() {
				var t, r, s;
				for (s = [], t = 0, r = i.length; r > t; t++) n = i[t], n !== e && s.push(n);
				return s
			}(), t.setAttribute("class", i.join(" "))
		}, e = function(t, e) {
			var n;
			return n = t.getAttribute("class") + " " + e, t.setAttribute("class", n.trim())
		}, d = function(t, n) {
			var i, r, s, a, o, c, l, d, h;
			for (i = document.querySelector(".js-calendar-graph"), h = i.querySelectorAll("rect.day"), a = 0, c = h.length; c > a; a++) r = h[a], u(r, "active");
			if (i.classList.remove("days-selected"), t || n) {
				for (i.classList.add("days-selected"), s = function(e) {
					var i;
					return i = new Date(e.getAttribute("data-date")).getTime(), t && n ? t.getTime() <= i && i <= n.getTime() : i === t.getTime()
				}, d = [], o = 0, l = h.length; l > o; o++) r = h[o], s(r) && d.push(e(r, "active"));
				return d
			}
		}, s = function(t) {
			return ("0" + t).slice(-2)
		}, i = function(t) {
			return t.getUTCFullYear() + "-" + s(t.getUTCMonth() + 1) + "-" + s(t.getUTCDate())
		}, c = function(t, e, n) {
			var s, c, u, m, p, g, v, $;
			return $ = document.location.pathname + "?tab=contributions", t >= h && f >= t ? void l("weekly") : ("object" == typeof e && (o = e, e = !0), o && e ? (u = new Date(o.getTime() - 26784e5), c = new Date(o.getTime() + 26784e5), m = t > o ? [o, t] : [t, o], s = m[0], v = m[1], u > s && (s = u), v > c && (v = c), p = [s, v], h = p[0], f = p[1], $ += "&from=" + i(s) + "&to=" + i(v)) : (s = t, g = [s, null], h = g[0], f = g[1], $ += "&from=" + i(s)), o = t, a = "custom", d(s, v), n ? void 0 : r($))
		}, $(document).on("change", ".js-period-container", function(t) {
			var e;
			return t.preventDefault(), t.stopPropagation(), e = $(t.target).val().toLowerCase(), a !== e ? l(e) : void 0
		})
	}.call(this),
	function() {
		var t, e;
		$(document).on("submit", ".js-find-coupon-form", function(t) {
			var e, n;
			return e = t.target.action, n = $("#code").val(), window.location = e + "/" + encodeURIComponent(n), t.stopPropagation(), t.preventDefault()
		}), $(document).on("click", ".js-choose-account", function(e) {
			return $(".js-plan-row, .js-choose-plan").removeClass("selected"), $(".js-plan").val(""), $(".js-billing-section").addClass("has-removed-contents"), t($(this).closest(".js-account-row")), e.stopPropagation(), e.preventDefault()
		}), $(document).on("click", ".js-choose-plan", function(t) {
			return e($(this).closest(".js-plan-row")), t.stopPropagation(), t.preventDefault()
		}), $.observe(".js-plan-row.selected", {
			add: function() {
				return $(this).closest("form").find(".js-redeem-button").prop("disabled", $(this).hasClass("free-plan"))
			}
		}), t = function(t) {
			var n, i, r, s;
			if (t.length) return r = t.attr("data-login"), s = t.attr("data-plan"), $(".js-account-row, .js-choose-account").removeClass("selected"), t.addClass("selected"), t.find(".js-choose-account").addClass("selected"), $(".js-account").val(r), $(".js-plan-section").removeClass("is-hidden"), $(".js-billing-plans").addClass("is-hidden"), i = $(".js-plans-for-" + r), i.removeClass("is-hidden"), n = $(".js-plan-row", i), e(1 === n.length ? n : $("[data-name='" + s + "']", i))
		}, e = function(t) {
			var e, n, i, r, s;
			if (t.length) return r = t.attr("data-name"), n = parseInt(t.attr("data-cost"), 10), s = t.closest(".js-billing-plans"), i = s.attr("data-has-billing"), e = s.attr("data-login"), $(".js-plan-row, .js-choose-plan").removeClass("selected"), t.addClass("selected"), t.find(".js-choose-plan").addClass("selected"), $(".js-plan").val(r), 0 === n || i ? $(".js-billing-section").addClass("has-removed-contents") : $(".js-billing-section[data-login='" + e + "']").removeClass("has-removed-contents")
		}, $(function() {
			return t($(".js-account-row.selected")), e($(".js-plan-row.selected"))
		})
	}.call(this),
	function() {
		$(document).on("click", ".js-git-protocol-selector", function() {
			var t, e;
			return t = $(this).closest(".url-box"), e = $(this).attr("href"), t.find(".js-url-field").val(e), /\.patch$/.test(e) || $(".js-live-clone-url").text(e), (e = $(this).attr("data-url")) && $.ajax({
				type: "POST",
				url: e
			}), t.find(".js-clone-urls > .selected").removeClass("selected"), $(this).parent(".js-clone-url-button").addClass("selected"), !1
		}), $(document).on("click", ".js-clone-selector", function(t) {
			var e, n, i, r;
			return t.preventDefault(), e = $(this).attr("data-protocol"), r = $(".clone-url").hide(), n = r.filter('[data-protocol-type="' + e + '"]').show(), (i = n.attr("data-url")) ? $.ajax({
				type: "POST",
				url: i
			}) : void 0
		})
	}.call(this),
	function() {
		function t(t, e) {
			return t.href = e
		}

		function e(t, e) {
			return t.name = e
		}

		function n(t) {
			Ce.set(t)
		}

		function i(t) {
			return "function" == typeof t
		}

		function r(t) {
			return "[object Array]" == Object[pe].toString[$e](Object(t))
		}

		function s(t) {
			return void 0 != t && -1 < (t.constructor + "")[de]("String")
		}

		function a(t, e) {
			return 0 == t[de](e)
		}

		function o(t) {
			return t ? t[F](/^[\s\xa0]+|[\s\xa0]+$/g, "") : ""
		}

		function c() {
			return [Ve() ^ 2147483647 & Me(), N.round((new Date)[V]() / 1e3)][xe](".")
		}

		function u(t) {
			var e = De[G]("img");
			return e.width = 1, e.height = 1, e.src = t, e
		}

		function l() {}

		function d(t) {
			return R instanceof Function ? R(t) : (n(28), t)
		}

		function h(t) {
			return d(t)[F](/\(/g, "%28")[F](/\)/g, "%29")
		}

		function f(t, e) {
			if (t) {
				var n = De[G]("script");
				n.type = "text/javascript", n.async = !0, n.src = t, n.id = e;
				var i = De.getElementsByTagName("script")[0];
				i[we].insertBefore(n, i)
			}
		}

		function m() {
			return dn || "https:" == De[Q][ne] ? "https:" : "http:"
		}

		function p() {
			var t = "" + De[Q][te];
			return 0 == t[de]("www.") ? t[je](4) : t
		}

		function g(t) {
			var e = De.referrer;
			if (/^https?:\/\//i [ce](e)) {
				if (t) return e;
				t = "//" + De[Q][te];
				var n = e[de](t);
				if ((5 == n || 6 == n) && (t = e.charAt(n + t[me]), "/" == t || "?" == t || "" == t || ":" == t)) return;
				return e
			}
		}

		function v(t, e) {
			if (1 == e[me] && null != e[0] && "object" == typeof e[0]) return e[0];
			for (var n = {}, i = N.min(t[me] + 1, e[me]), r = 0; i > r; r++) {
				if ("object" == typeof e[r]) {
					for (var s in e[r]) e[r][Z](s) && (n[s] = e[r][s]);
					break
				}
				r < t[me] && (n[t[r]] = e[r])
			}
			return n
		}

		function $(t) {
			if (100 != t.get(Hi) && M(Ze(t, yi)) % 1e4 >= 100 * tn(t, Hi)) throw "abort"
		}

		function b(t) {
			if (Ee(Ze(t, xi))) throw "abort"
		}

		function j() {
			var t = De[Q][ne];
			if ("http:" != t && "https:" != t) throw "abort"
		}

		function y(t) {
			try {
				Ae.XMLHttpRequest && "withCredentials" in new Ae.XMLHttpRequest ? n(40) : Ae.XDomainRequest && n(41), Ae[ye].sendBeacon && n(42)
			} catch (e) {}
			t.set(bn, tn(t, bn) + 1);
			var i = [];
			if (Ke.map(function(e, n) {
				if (n.p) {
					var r = t.get(e);
					void 0 != r && r != n[he] && ("boolean" == typeof r && (r *= 1), i[ae](n.p + "=" + d("" + r)))
				}
			}), Bi(new Oi(1e4))) {
				var r = [];
				r[ae](Ge()), r[ae][se](r, c()[K](".")), r[ae](Je());
				var s;
				s = Ae.crypto ? !0 : !1, r[ae](s ? "c" : "b"), i[ae]("z=" + r[xe]("."))
			} else i[ae]("z=" + Je());
			t.set(vn, i[xe]("&"), !0)
		}

		function w(t) {
			var e = Ze(t, Ii) || Re() + "/collect";
			Ne(e, Ze(t, vn), t.get(gn), t.get($n)), t.set(gn, l, !0)
		}

		function x(t) {
			var e = Ae.gaData;
			e && (e.expId && t.set(Vn, e.expId), e.expVar && t.set(Xn, e.expVar))
		}

		function k() {
			if (Ae[ye] && "preview" == Ae[ye].loadPurpose) throw "abort"
		}

		function C(t) {
			var e = Ae.gaDevIds;
			r(e) && 0 != e[me] && t.set("&did", e[xe](","), !0)
		}

		function S(t) {
			if (!t.get(xi)) throw "abort"
		}

		function L(t) {
			var e = tn(t, ti);
			e >= 500 && n(15);
			var i = Ze(t, pn);
			if ("transaction" != i && "item" != i) {
				var i = tn(t, ni),
					r = (new Date)[V](),
					s = tn(t, ei);
				if (0 == s && t.set(ei, r), s = N.round(2 * (r - s) / 1e3), s > 0 && (i = N.min(i + s, 20), t.set(ei, r)), 0 >= i) throw "abort";
				t.set(ni, --i)
			}
			t.set(ti, ++e)
		}

		function T(t, e, i, r) {
			e[t] = function() {
				try {
					return r && n(r), i[se](this, arguments)
				} catch (e) {
					var s = e && e[fe];
					if (!(1 <= 100 * N.random() || Ee("?"))) {
						var a = ["t=error", "_e=exc", "_v=j30", "sr=1"];
						t && a[ae]("_f=" + t), s && a[ae]("_m=" + d(s[je](0, 100))), a[ae]("aip=1"), a[ae]("z=" + Ve()), Ne(Re() + "/collect", a[xe]("&"))
					}
					throw e
				}
			}
		}

		function A() {
			var t, e, n;
			if ((n = (n = Ae[ye]) ? n.plugins : null) && n[me])
				for (var i = 0; i < n[me] && !e; i++) {
					var r = n[i]; - 1 < r[fe][de]("Shockwave Flash") && (e = r.description)
				}
			if (!e) try {
				t = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"), e = t.GetVariable("$version")
			} catch (s) {}
			if (!e) try {
				t = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"), e = "WIN 6,0,21,0", t.AllowScriptAccess = "always", e = t.GetVariable("$version")
			} catch (a) {}
			if (!e) try {
				t = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"), e = t.GetVariable("$version")
			} catch (o) {}
			return e && (t = e[U](/[\d]+/g)) && 3 <= t[me] && (e = t[0] + "." + t[1] + " r" + t[2]), e || void 0
		}

		function D(t, e, n) {
			"none" == e && (e = "");
			var i = [],
				r = He(t);
			t = "__utma" == t ? 6 : 2;
			for (var s = 0; s < r[me]; s++) {
				var a = ("" + r[s])[K](".");
				a[me] >= t && i[ae]({
					hash: a[0],
					R: r[s],
					O: a
				})
			}
			return 0 == i[me] ? void 0 : 1 == i[me] ? i[0] : E(e, i) || E(n, i) || E(null, i) || i[0]
		}

		function E(t, e) {
			var n, i;
			null == t ? n = i = 1 : (n = M(t), i = M(a(t, ".") ? t[je](1) : "." + t));
			for (var r = 0; r < e[me]; r++)
				if (e[r][oe] == n || e[r][oe] == i) return e[r]
		}

		function _(t) {
			t = t.get(yi);
			var e = H(t, 0);
			return "_ga=1." + d(e + "." + t)
		}

		function H(t, e) {
			for (var n = new Date, i = Ae[ye], r = i.plugins || [], n = [t, i.userAgent, n.getTimezoneOffset(), n.getYear(), n.getDate(), n.getHours(), n.getMinutes() + e], i = 0; i < r[me]; ++i) n[ae](r[i].description);
			return M(n[xe]("."))
		}

		function q(t, e) {
			if (e == De[Q][te]) return !1;
			for (var n = 0; n < t[me]; n++)
				if (t[n] instanceof RegExp) {
					if (t[n][ce](e)) return !0
				} else if (0 <= e[de](t[n])) return !0;
			return !1
		}

		function P() {
			var t = Ae.gaGlobal = Ae.gaGlobal || {};
			return t.hid = t.hid || Ve()
		}

		function I(t) {
			return 0 <= t[de](".") || 0 <= t[de](":")
		}

		function M(t) {
			var e, n = 1,
				i = 0;
			if (t)
				for (n = 0, e = t[me] - 1; e >= 0; e--) i = t.charCodeAt(e), n = (n << 6 & 268435455) + i + (i << 14), i = 266338304 & n, n = 0 != i ? n ^ i >> 21 : n;
			return n
		}
		var R = encodeURIComponent,
			O = window,
			B = setTimeout,
			N = Math,
			F = "replace",
			z = "data",
			U = "match",
			W = "send",
			Y = "port",
			G = "createElement",
			J = "setAttribute",
			V = "getTime",
			X = "host",
			K = "split",
			Q = "location",
			Z = "hasOwnProperty",
			te = "hostname",
			ee = "search",
			ne = "protocol",
			ie = "href",
			re = "action",
			se = "apply",
			ae = "push",
			oe = "hash",
			ce = "test",
			ue = "slice",
			le = "cookie",
			de = "indexOf",
			he = "defaultValue",
			fe = "name",
			me = "length",
			pe = "prototype",
			ge = "clientWidth",
			ve = "target",
			$e = "call",
			be = "clientHeight",
			je = "substring",
			ye = "navigator",
			we = "parentNode",
			xe = "join",
			ke = "toLowerCase",
			Ce = new function() {
				var t = [];
				this.set = function(e) {
					t[e] = !0
				}, this.M = function() {
					for (var e = [], n = 0; n < t[me]; n++) t[n] && (e[N.floor(n / 6)] = e[N.floor(n / 6)] ^ 1 << n % 6);
					for (n = 0; n < e[me]; n++) e[n] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(e[n] || 0);
					return e[xe]("") + "~"
				}
			},
			Se = function(t, e, i, r) {
				try {
					t.addEventListener ? t.addEventListener(e, i, !!r) : t.attachEvent && t.attachEvent("on" + e, i)
				} catch (s) {
					n(27)
				}
			},
			Le = function(t, e, n) {
				t.removeEventListener ? t.removeEventListener(e, n, !1) : t.detachEvent && t.detachEvent("on" + e, n)
			},
			Te = function() {
				this.keys = [], this.w = {}, this.m = {}
			};
		Te[pe].set = function(t, e, n) {
			this.keys[ae](t), n ? this.m[":" + t] = e : this.w[":" + t] = e
		}, Te[pe].get = function(t) {
			return this.m[Z](":" + t) ? this.m[":" + t] : this.w[":" + t]
		}, Te[pe].map = function(t) {
			for (var e = 0; e < this.keys[me]; e++) {
				var n = this.keys[e],
					i = this.get(n);
				i && t(n, i)
			}
		};
		var Ae = O,
			De = document,
			Ee = function(t) {
				var e = Ae._gaUserPrefs;
				if (e && e.ioo && e.ioo() || t && !0 === Ae["ga-disable-" + t]) return !0;
				try {
					var n = Ae.external;
					if (n && n._gaUserPrefs && "oo" == n._gaUserPrefs) return !0
				} catch (i) {}
				return !1
			},
			_e = function(t) {
				B(t, 100)
			},
			He = function(t) {
				var e = [],
					n = De[le][K](";");
				t = new RegExp("^\\s*" + t + "=\\s*(.*?)\\s*$");
				for (var i = 0; i < n[me]; i++) {
					var r = n[i][U](t);
					r && e[ae](r[1])
				}
				return e
			},
			qe = function(t, e, i, r, s, a) {
				if (s = Ee(s) ? !1 : Ie[ce](De[Q][te]) || "/" == i && Pe[ce](r) ? !1 : !0, !s) return !1;
				if (e && 1200 < e[me] && (e = e[je](0, 1200), n(24)), i = t + "=" + e + "; path=" + i + "; ", a && (i += "expires=" + new Date((new Date)[V]() + a).toGMTString() + "; "), r && "none" != r && (i += "domain=" + r + ";"), r = De[le], De.cookie = i, !(r = r != De[le])) t: {
					for (t = He(t), r = 0; r < t[me]; r++)
						if (e == t[r]) {
							r = !0;
							break t
						}
					r = !1
				}
				return r
			},
			Pe = new RegExp(/^(www\.)?google(\.com?)?(\.[a-z]{2})?$/),
			Ie = new RegExp(/(^|\.)doubleclick\.net$/i),
			Me = function() {
				for (var t = Ae[ye].userAgent + (De[le] ? De[le] : "") + (De.referrer ? De.referrer : ""), e = t[me], n = Ae.history[me]; n > 0;) t += n-- ^ e++;
				return M(t)
			},
			Re = function() {
				return m() + "//www.google-analytics.com"
			},
			Oe = function(t) {
				e(this, "len"), this.message = t + "-8192"
			},
			Be = function(t) {
				e(this, "ff2post"), this.message = t + "-2036"
			},
			Ne = function(t, e, n, i) {
				if (n = n || l, i && (i = n, Ae[ye].sendBeacon && Ae[ye].sendBeacon(t, e) ? (i(), i = !0) : i = !1), !i)
					if (2036 >= e[me]) Fe(t, e, n);
					else {
						if (!(8192 >= e[me])) throw new Oe(e[me]);
						if (0 <= Ae[ye].userAgent[de]("Firefox") && ![].reduce) throw new Be(e[me]);
						Ue(t, e, n) || ze(t, e, n) || We(e, n) || n()
					}
			},
			Fe = function(t, e, n) {
				var i = u(t + "?" + e);
				i.onload = i.onerror = function() {
					i.onload = null, i.onerror = null, n()
				}
			},
			ze = function(t, e, n) {
				var i;
				return (i = Ae.XDomainRequest) ? (i = new i, i.open("POST", t), i.onerror = function() {
					n()
				}, i.onload = n, i[W](e), !0) : !1
			},
			Ue = function(t, e, n) {
				var i = Ae.XMLHttpRequest;
				if (!i) return !1;
				var r = new i;
				return "withCredentials" in r ? (r.open("POST", t, !0), r.withCredentials = !0, r.setRequestHeader("Content-Type", "text/plain"), r.onreadystatechange = function() {
					4 == r.readyState && (n(), r = null)
				}, r[W](e), !0) : !1
			},
			We = function(t, n) {
				if (!De.body) return _e(function() {
					We(t, n)
				}), !0;
				t = R(t);
				try {
					var i = De[G]('<iframe name="' + t + '"></iframe>')
				} catch (r) {
					i = De[G]("iframe"), e(i, t)
				}
				i.height = "0", i.width = "0", i.style.display = "none", i.style.visibility = "hidden";
				var s = De[Q],
					s = Re() + "/analytics_iframe.html#" + R(s[ne] + "//" + s[X] + "/favicon.ico"),
					a = function() {
						i.src = "", i[we] && i[we].removeChild(i)
					};
				Se(Ae, "beforeunload", a);
				var o = !1,
					c = 0,
					u = function() {
						if (!o) {
							try {
								if (c > 9 || i.contentWindow[Q][X] == De[Q][X]) return o = !0, a(), Le(Ae, "beforeunload", a), void n()
							} catch (t) {}
							c++, B(u, 200)
						}
					};
				return Se(i, "load", u), De.body.appendChild(i), i.src = s, !0
			},
			Ye = function() {
				this.t = []
			};
		Ye[pe].add = function(t) {
			this.t[ae](t)
		}, Ye[pe].D = function(t) {
			try {
				for (var e = 0; e < this.t[me]; e++) {
					var n = t.get(this.t[e]);
					n && i(n) && n[$e](Ae, t)
				}
			} catch (r) {}
			e = t.get(gn), e != l && i(e) && (t.set(gn, l, !0), B(e, 10))
		};
		var Ge = function() {
				return N.round(2147483647 * N.random())
			},
			Je = function() {
				try {
					var t = new Uint32Array(1);
					return Ae.crypto.getRandomValues(t), 2147483647 & t[0]
				} catch (e) {
					return Ge()
				}
			},
			Ve = Ge,
			Xe = function() {
				this.data = new Te
			},
			Ke = new Te,
			Qe = [];
		Xe[pe].get = function(t) {
			var e = rn(t),
				n = this[z].get(t);
			return e && void 0 == n && (n = i(e[he]) ? e[he]() : e[he]), e && e.n ? e.n(this, t, n) : n
		};
		var Ze = function(t, e) {
				var n = t.get(e);
				return void 0 == n ? "" : "" + n
			},
			tn = function(t, e) {
				var n = t.get(e);
				return void 0 == n || "" === n ? 0 : 1 * n
			};
		Xe[pe].set = function(t, e, n) {
			if (t)
				if ("object" == typeof t)
					for (var i in t) t[Z](i) && en(this, i, t[i], n);
				else en(this, t, e, n)
		};
		var en = function(t, e, n, i) {
				if (void 0 != n) switch (e) {
					case xi:
						$r[ce](n)
				}
				var r = rn(e);
				r && r.o ? r.o(t, e, n, i) : t[z].set(e, n, i)
			},
			nn = function(t, n, i, r, s) {
				e(this, t), this.p = n, this.n = r, this.o = s, this.defaultValue = i
			},
			rn = function(t) {
				var e = Ke.get(t);
				if (!e)
					for (var n = 0; n < Qe[me]; n++) {
						var i = Qe[n],
							r = i[0].exec(t);
						if (r) {
							e = i[1](r), Ke.set(e[fe], e);
							break
						}
					}
				return e
			},
			sn = function(t) {
				var e;
				return Ke.map(function(n, i) {
					i.p == t && (e = i)
				}), e && e[fe]
			},
			an = function(t, e, n, i, r) {
				return t = new nn(t, e, n, i, r), Ke.set(t[fe], t), t[fe]
			},
			on = function(t, e) {
				Qe[ae]([new RegExp("^" + t + "$"), e])
			},
			cn = function(t, e, n) {
				return an(t, e, n, void 0, un)
			},
			un = function() {},
			ln = s(O.GoogleAnalyticsObject) && o(O.GoogleAnalyticsObject) || "ga",
			dn = !1,
			hn = cn("apiVersion", "v"),
			fn = cn("clientVersion", "_v");
		an("anonymizeIp", "aip");
		var mn = an("adSenseId", "a"),
			pn = an("hitType", "t"),
			gn = an("hitCallback"),
			vn = an("hitPayload");
		an("nonInteraction", "ni"), an("currencyCode", "cu");
		var $n = an("useBeacon", void 0, !1);
		an("dataSource", "ds"), an("sessionControl", "sc", ""), an("sessionGroup", "sg"), an("queueTime", "qt");
		var bn = an("_s", "_s");
		an("screenName", "cd");
		var jn = an("location", "dl", ""),
			yn = an("referrer", "dr"),
			wn = an("page", "dp", "");
		an("hostname", "dh");
		var xn = an("language", "ul"),
			kn = an("encoding", "de");
		an("title", "dt", function() {
			return De.title || void 0
		}), on("contentGroup([0-9]+)", function(t) {
			return new nn(t[0], "cg" + t[1])
		});
		var Cn = an("screenColors", "sd"),
			Sn = an("screenResolution", "sr"),
			Ln = an("viewportSize", "vp"),
			Tn = an("javaEnabled", "je"),
			An = an("flashVersion", "fl");
		an("campaignId", "ci"), an("campaignName", "cn"), an("campaignSource", "cs"), an("campaignMedium", "cm"), an("campaignKeyword", "ck"), an("campaignContent", "cc");
		var Dn = an("eventCategory", "ec"),
			En = an("eventAction", "ea"),
			_n = an("eventLabel", "el"),
			Hn = an("eventValue", "ev"),
			qn = an("socialNetwork", "sn"),
			Pn = an("socialAction", "sa"),
			In = an("socialTarget", "st"),
			Mn = an("l1", "plt"),
			Rn = an("l2", "pdt"),
			On = an("l3", "dns"),
			Bn = an("l4", "rrt"),
			Nn = an("l5", "srt"),
			Fn = an("l6", "tcp"),
			zn = an("l7", "dit"),
			Un = an("l8", "clt"),
			Wn = an("timingCategory", "utc"),
			Yn = an("timingVar", "utv"),
			Gn = an("timingLabel", "utl"),
			Jn = an("timingValue", "utt");
		an("appName", "an"), an("appVersion", "av", ""), an("appId", "aid", ""), an("appInstallerId", "aiid", ""), an("exDescription", "exd"), an("exFatal", "exf");
		var Vn = an("expId", "xid"),
			Xn = an("expVar", "xvar"),
			Kn = an("_utma", "_utma"),
			Qn = an("_utmz", "_utmz"),
			Zn = an("_utmht", "_utmht"),
			ti = an("_hc", void 0, 0),
			ei = an("_ti", void 0, 0),
			ni = an("_to", void 0, 20);
		on("dimension([0-9]+)", function(t) {
			return new nn(t[0], "cd" + t[1])
		}), on("metric([0-9]+)", function(t) {
			return new nn(t[0], "cm" + t[1])
		}), an("linkerParam", void 0, void 0, _, un);
		var ii = an("usage", "_u", void 0, function() {
			return Ce.M()
		}, un);
		an("forceSSL", void 0, void 0, function() {
			return dn
		}, function(t, e, i) {
			n(34), dn = !!i
		});
		var ri = an("_j1", "jid"),
			si = an("_j2", "gjid");
		on("\\&(.*)", function(t) {
			var e = new nn(t[0], t[1]),
				n = sn(t[0][je](1));
			return n && (e.n = function(t) {
				return t.get(n)
			}, e.o = function(t, e, i, r) {
				t.set(n, i, r)
			}, e.p = void 0), e
		});
		var ai = cn("_oot"),
			oi = an("previewTask"),
			ci = an("checkProtocolTask"),
			ui = an("validationTask"),
			li = an("checkStorageTask"),
			di = an("historyImportTask"),
			hi = an("samplerTask"),
			fi = cn("_rlt"),
			mi = an("buildHitTask"),
			pi = an("sendHitTask"),
			gi = an("ceTask"),
			vi = an("devIdTask"),
			$i = an("timingTask"),
			bi = an("displayFeaturesTask"),
			ji = cn("name"),
			yi = cn("clientId", "cid"),
			wi = an("userId", "uid"),
			xi = cn("trackingId", "tid"),
			ki = cn("cookieName", void 0, "_ga"),
			Ci = cn("cookieDomain"),
			Si = cn("cookiePath", void 0, "/"),
			Li = cn("cookieExpires", void 0, 63072e3),
			Ti = cn("legacyCookieDomain"),
			Ai = cn("legacyHistoryImport", void 0, !0),
			Di = cn("storage", void 0, "cookie"),
			Ei = cn("allowLinker", void 0, !1),
			_i = cn("allowAnchor", void 0, !0),
			Hi = cn("sampleRate", "sf", 100),
			qi = cn("siteSpeedSampleRate", void 0, 1),
			Pi = cn("alwaysSendReferrer", void 0, !1),
			Ii = an("transportUrl"),
			Mi = an("_r", "_r"),
			Ri = an("_dfr", void 0, 1),
			Oi = function(t) {
				this.V = t, this.fa = void 0, this.$ = !1, this.ha = void 0, this.ea = 1
			},
			Bi = function(t, e, n) {
				if (t.fa && t.$) return 0;
				if (t.$ = !0, e) {
					if (t.ha && tn(e, t.ha)) return tn(e, t.ha);
					if (0 == e.get(qi)) return 0
				}
				return 0 == t.V ? 0 : (void 0 === n && (n = Je()), 0 == n % t.V ? N.floor(n / t.V) % t.ea + 1 : 0)
			},
			Ni = function(t, e) {
				var n = N.min(tn(t, qi), 100);
				if (!(M(Ze(t, yi)) % 100 >= n) && (n = {}, Fi(n) || zi(n))) {
					var i = n[Mn];
					void 0 == i || 1 / 0 == i || isNaN(i) || (i > 0 ? (Ui(n, On), Ui(n, Fn), Ui(n, Nn), Ui(n, Rn), Ui(n, Bn), Ui(n, zn), Ui(n, Un), e(n)) : Se(Ae, "load", function() {
						Ni(t, e)
					}, !1))
				}
			},
			Fi = function(t) {
				var e = Ae.performance || Ae.webkitPerformance,
					e = e && e.timing;
				if (!e) return !1;
				var n = e.navigationStart;
				return 0 == n ? !1 : (t[Mn] = e.loadEventStart - n, t[On] = e.domainLookupEnd - e.domainLookupStart, t[Fn] = e.connectEnd - e.connectStart, t[Nn] = e.responseStart - e.requestStart, t[Rn] = e.responseEnd - e.responseStart, t[Bn] = e.fetchStart - n, t[zn] = e.domInteractive - n, t[Un] = e.domContentLoadedEventStart - n, !0)
			},
			zi = function(t) {
				if (Ae.top != Ae) return !1;
				var e = Ae.external,
					n = e && e.onloadT;
				return e && !e.isValidLoadTime && (n = void 0), n > 2147483648 && (n = void 0), n > 0 && e.setPageReadyTime(), void 0 == n ? !1 : (t[Mn] = n, !0)
			},
			Ui = function(t, e) {
				var n = t[e];
				(isNaN(n) || 1 / 0 == n || 0 > n) && (t[e] = void 0)
			},
			Wi = function(t) {
				return function(e) {
					"pageview" != e.get(pn) || t.I || (t.I = !0, Ni(e, function(e) {
						t[W]("timing", e)
					}))
				}
			},
			Yi = !1,
			Gi = function(t) {
				if ("cookie" == Ze(t, Di)) {
					var e = Ze(t, ki),
						i = Xi(t),
						r = tr(Ze(t, Si)),
						s = Qi(Ze(t, Ci)),
						a = 1e3 * tn(t, Li),
						o = Ze(t, xi);
					if ("auto" != s) qe(e, i, r, s, o, a) && (Yi = !0);
					else {
						n(32);
						var c;
						if (i = [], s = p()[K]("."), 4 != s[me] || (c = s[s[me] - 1], parseInt(c, 10) != c)) {
							for (c = s[me] - 2; c >= 0; c--) i[ae](s[ue](c)[xe]("."));
							i[ae]("none"), c = i
						} else c = ["none"];
						for (var u = 0; u < c[me]; u++)
							if (s = c[u], t[z].set(Ci, s), i = Xi(t), qe(e, i, r, s, o, a)) return void(Yi = !0);
						t[z].set(Ci, "auto")
					}
				}
			},
			Ji = function(t) {
				if ("cookie" == Ze(t, Di) && !Yi && (Gi(t), !Yi)) throw "abort"
			},
			Vi = function(t) {
				if (t.get(Ai)) {
					var e = Ze(t, Ci),
						i = Ze(t, Ti) || p(),
						r = D("__utma", i, e);
					r && (n(19), t.set(Zn, (new Date)[V](), !0), t.set(Kn, r.R), (e = D("__utmz", i, e)) && r[oe] == e[oe] && t.set(Qn, e.R))
				}
			},
			Xi = function(t) {
				var e = h(Ze(t, yi)),
					n = Zi(Ze(t, Ci));
				return t = er(Ze(t, Si)), t > 1 && (n += "-" + t), ["GA1", n, e][xe](".")
			},
			Ki = function(t, e, n) {
				for (var i, r = [], s = [], a = 0; a < t[me]; a++) {
					var o = t[a];
					o.r[n] == e ? r[ae](o) : void 0 == i || o.r[n] < i ? (s = [o], i = o.r[n]) : o.r[n] == i && s[ae](o)
				}
				return 0 < r[me] ? r : s
			},
			Qi = function(t) {
				return 0 == t[de](".") ? t.substr(1) : t
			},
			Zi = function(t) {
				return Qi(t)[K](".")[me]
			},
			tr = function(t) {
				return t ? (1 < t[me] && t.lastIndexOf("/") == t[me] - 1 && (t = t.substr(0, t[me] - 1)), 0 != t[de]("/") && (t = "/" + t), t) : "/"
			},
			er = function(t) {
				return t = tr(t), "/" == t ? 1 : t[K]("/")[me]
			},
			nr = new RegExp(/^https?:\/\/([^\/:]+)/),
			ir = /(.*)([?&#])(?:_ga=[^&#]*)(?:&?)(.*)/,
			rr = function(t) {
				n(48), this.target = t, this.T = !1
			};
		rr[pe].Q = function(e, n) {
			if (e.tagName) {
				if ("a" == e.tagName[ke]()) return void(e[ie] && t(e, sr(this, e[ie], n)));
				if ("form" == e.tagName[ke]()) return ar(this, e)
			}
			return "string" == typeof e ? sr(this, e, n) : void 0
		};
		var sr = function(t, e, n) {
				var i = ir.exec(e);
				i && 3 <= i[me] && (e = i[1] + (i[3] ? i[2] + i[3] : "")), t = t[ve].get("linkerParam");
				var r = e[de]("?"),
					i = e[de]("#");
				return n ? e += (-1 == i ? "#" : "&") + t : (n = -1 == r ? "?" : "&", e = -1 == i ? e + (n + t) : e[je](0, i) + n + t + e[je](i)), e
			},
			ar = function(t, e) {
				if (e && e[re]) {
					var n = t[ve].get("linkerParam")[K]("=")[1];
					if ("get" == e.method[ke]()) {
						for (var i = e.childNodes || [], r = 0; r < i[me]; r++)
							if ("_ga" == i[r][fe]) return void i[r][J]("value", n);
						i = De[G]("input"), i[J]("type", "hidden"), i[J]("name", "_ga"), i[J]("value", n), e.appendChild(i)
					} else "post" == e.method[ke]() && (e.action = sr(t, e[re]))
				}
			};
		rr[pe].S = function(e, i, r) {
			function s(r) {
				try {
					r = r || Ae.event;
					var s;
					t: {
						var o = r[ve] || r.srcElement;
						for (r = 100; o && r > 0;) {
							if (o[ie] && o.nodeName[U](/^a(?:rea)?$/i)) {
								s = o;
								break t
							}
							o = o[we], r--
						}
						s = {}
					}("http:" == s[ne] || "https:" == s[ne]) && q(e, s[te] || "") && s[ie] && t(s, sr(a, s[ie], i))
				} catch (c) {
					n(26)
				}
			}
			var a = this;
			if (this.T || (this.T = !0, Se(De, "mousedown", s, !1), Se(De, "touchstart", s, !1), Se(De, "keyup", s, !1)), r) {
				r = function(t) {
					if (t = t || Ae.event, (t = t[ve] || t.srcElement) && t[re]) {
						var n = t[re][U](nr);
						n && q(e, n[1]) && ar(a, t)
					}
				};
				for (var o = 0; o < De.forms[me]; o++) Se(De.forms[o], "submit", r)
			}
		};
		var or, cr = function(t, e, n, i) {
				this.U = e, this.aa = n, (e = i) || (e = (e = Ze(t, ji)) && "t0" != e ? fr[ce](e) ? "_gat_" + h(Ze(t, xi)) : "_gat_" + h(e) : "_gat"), this.Y = e
			},
			ur = function(t, e) {
				var n = e.get(mi);
				e.set(mi, function(e) {
					lr(t, e);
					var i = n(e);
					return dr(t, e), i
				});
				var i = e.get(pi);
				e.set(pi, function(e) {
					var n = i(e);
					return hr(t, e), n
				})
			},
			lr = function(t, e) {
				e.get(t.U) || ("1" == He(t.Y)[0] ? e.set(t.U, "", !0) : e.set(t.U, "" + Ve(), !0))
			},
			dr = function(t, e) {
				e.get(t.U) && qe(t.Y, "1", e.get(Si), e.get(Ci), e.get(xi), 6e5)
			},
			hr = function(t, e) {
				if (e.get(t.U)) {
					var n = new Te,
						i = function(t) {
							n.set(rn(t).p, e.get(t))
						};
					i(hn), i(fn), i(xi), i(yi), i(t.U), i(ii);
					var r = t.aa;
					n.map(function(t, e) {
						r += d(t) + "=" + d("" + e) + "&"
					}), r += "z=" + Ve(), u(r), e.set(t.U, "", !0)
				}
			},
			fr = /^gtm\d+$/,
			mr = function(t, e) {
				var i = t.b;
				if (!i.get("dcLoaded")) {
					n(29), Ae._gaq && n(52), e = e || {};
					var r;
					e[ki] && (r = h(e[ki])), r = new cr(i, ri, "https://stats.g.doubleclick.net/collect?t=dc&aip=1&", r), ur(r, i), i.set("dcLoaded", !0)
				}
			},
			pr = function(t) {
				var e;
				t.get("dcLoaded") || "cookie" != t.get(Di) ? e = !1 : (e = new Oi(tn(t, Ri)), e = Bi(e, null, M(t.get(yi)))), e && (n(51), e = new cr(t, ri), lr(e, t), dr(e, t), t.get(e.U) && (t.set(Mi, 1, !0), t.set(Ii, Re() + "/r/collect", !0)))
			},
			gr = function(t, e) {
				var i = t.b;
				if (!i.get("_rlsaLoaded")) {
					if (n(38), e = e || {}, e[ki]) var r = h(e[ki]);
					r = new cr(i, si, "https://www.google.com/ads/ga-audiences?t=sr&aip=1&", r), ur(r, i), i.set("_rlsaLoaded", !0), Ar("displayfeatures", t, e)
				}
			},
			vr = function(t, e, n) {
				if (!or) {
					var i;
					i = De[Q][oe];
					var r = Ae[fe],
						s = /^#?gaso=([^&]*)/;
					(r = (i = (i = i && i[U](s) || r && r[U](s)) ? i[1] : He("GASO")[0] || "") && i[U](/^(?:!([-0-9a-z.]{1,40})!)?([-.\w]{10,1200})$/i)) && (qe("GASO", "" + i, n, e, t, 0), O._udo || (O._udo = e), O._utcp || (O._utcp = n), t = r[1], f("https://www.google.com/analytics/web/inpage/pub/inpage.js?" + (t ? "prefix=" + t + "&" : "") + Ve(), "_gasojs")), or = !0
				}
			},
			$r = /^(UA|YT|MO|GP)-(\d+)-(\d+)$/,
			br = function(t) {
				function e(t, e) {
					i.b[z].set(t, e)
				}

				function n(t, n) {
					e(t, n), i.filters.add(t)
				}
				var i = this;
				this.b = new Xe, this.filters = new Ye, e(ji, t[ji]), e(xi, o(t[xi])), e(ki, t[ki]), e(Ci, t[Ci] || p()), e(Si, t[Si]), e(Li, t[Li]), e(Ti, t[Ti]), e(Ai, t[Ai]), e(Ei, t[Ei]), e(_i, t[_i]), e(Hi, t[Hi]), e(qi, t[qi]), e(Pi, t[Pi]), e(Di, t[Di]), e(wi, t[wi]), e(hn, 1), e(fn, "j30"), n(ai, b), n(oi, k), n(ci, j), n(ui, S), n(li, Ji), n(di, Vi), n(hi, $), n(fi, L), n(gi, x), n(vi, C), n(bi, pr), n(mi, y), n(pi, w), n($i, Wi(this)), jr(this.b, t[yi]), yr(this.b), this.b.set(mn, P()), vr(this.b.get(xi), this.b.get(Ci), this.b.get(Si))
			},
			jr = function(t, e) {
				if ("cookie" == Ze(t, Di)) {
					Yi = !1;
					var i;
					t: {
						var r = He(Ze(t, ki));
						if (r && !(1 > r[me])) {
							i = [];
							for (var s = 0; s < r[me]; s++) {
								var a;
								a = r[s][K](".");
								var o = a.shift();
								("GA1" == o || "1" == o) && 1 < a[me] ? (o = a.shift()[K]("-"), 1 == o[me] && (o[1] = "1"), o[0] *= 1, o[1] *= 1, a = {
									r: o,
									s: a[xe](".")
								}) : a = void 0, a && i[ae](a)
							}
							if (1 == i[me]) {
								n(13), i = i[0].s;
								break t
							}
							if (0 != i[me]) {
								if (n(14), r = Zi(Ze(t, Ci)), i = Ki(i, r, 0), 1 == i[me]) {
									i = i[0].s;
									break t
								}
								r = er(Ze(t, Si)), i = Ki(i, r, 1), i = i[0] && i[0].s;
								break t
							}
							n(12)
						}
						i = void 0
					}
					i || (i = Ze(t, Ci), r = Ze(t, Ti) || p(), i = D("__utma", r, i), (i = void 0 == i ? void 0 : i.O[1] + "." + i.O[2]) && n(10)), i && (t[z].set(yi, i), Yi = !0)
				}
				i = t.get(_i), (s = (i = De[Q][i ? "href" : "search"][U]("(?:&|#|\\?)" + d("_ga")[F](/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1") + "=([^&#]*)")) && 2 == i[me] ? i[1] : "") && (t.get(Ei) ? (i = s[de]("."), -1 == i ? n(22) : (r = s[je](i + 1), "1" != s[je](0, i) ? n(22) : (i = r[de]("."), -1 == i ? n(22) : (s = r[je](0, i), i = r[je](i + 1), s != H(i, 0) && s != H(i, -1) && s != H(i, -2) ? n(23) : (n(11), t[z].set(yi, i)))))) : n(21)), e && (n(9), t[z].set(yi, d(e))), t.get(yi) || ((i = (i = Ae.gaGlobal && Ae.gaGlobal.vid) && -1 != i[ee](/^(?:utma\.)?\d+\.\d+$/) ? i : void 0) ? (n(17), t[z].set(yi, i)) : (n(8), t[z].set(yi, c()))), Gi(t)
			},
			yr = function(t) {
				var e = Ae[ye],
					i = Ae.screen,
					r = De[Q];
				if (t.set(yn, g(t.get(Pi))), r) {
					var s = r.pathname || "";
					"/" != s.charAt(0) && (n(31), s = "/" + s), t.set(jn, r[ne] + "//" + r[te] + s + r[ee])
				}
				i && t.set(Sn, i.width + "x" + i.height), i && t.set(Cn, i.colorDepth + "-bit");
				var i = De.documentElement,
					o = (s = De.body) && s[ge] && s[be],
					c = [];
				if (i && i[ge] && i[be] && ("CSS1Compat" === De.compatMode || !o) ? c = [i[ge], i[be]] : o && (c = [s[ge], s[be]]), i = 0 >= c[0] || 0 >= c[1] ? "" : c[xe]("x"), t.set(Ln, i), t.set(An, A()), t.set(kn, De.characterSet || De.charset), t.set(Tn, e && "function" == typeof e.javaEnabled && e.javaEnabled() || !1), t.set(xn, (e && (e.language || e.browserLanguage) || "")[ke]()), r && t.get(_i) && (e = De[Q][oe])) {
					for (e = e[K](/[?&#]+/), r = [], i = 0; i < e[me]; ++i)(a(e[i], "utm_id") || a(e[i], "utm_campaign") || a(e[i], "utm_source") || a(e[i], "utm_medium") || a(e[i], "utm_term") || a(e[i], "utm_content") || a(e[i], "gclid") || a(e[i], "dclid") || a(e[i], "gclsrc")) && r[ae](e[i]);
					0 < r[me] && (e = "#" + r[xe]("&"), t.set(jn, t.get(jn) + e))
				}
			};
		br[pe].get = function(t) {
			return this.b.get(t)
		}, br[pe].set = function(t, e) {
			this.b.set(t, e)
		};
		var wr = {
			pageview: [wn],
			event: [Dn, En, _n, Hn],
			social: [qn, Pn, In],
			timing: [Wn, Yn, Jn, Gn]
		};
		br[pe].send = function() {
			if (!(1 > arguments[me])) {
				var t, e;
				"string" == typeof arguments[0] ? (t = arguments[0], e = [][ue][$e](arguments, 1)) : (t = arguments[0] && arguments[0][pn], e = arguments), t && (e = v(wr[t] || [], e), e[pn] = t, this.b.set(e, void 0, !0), this.filters.D(this.b), this.b[z].m = {}, n(44))
			}
		};
		var xr, kr, Cr, Sr = function(t) {
				return "prerender" == De.visibilityState ? !1 : (t(), !0)
			},
			Lr = /^(?:(\w+)\.)?(?:(\w+):)?(\w+)$/,
			Tr = function(t) {
				if (i(t[0])) this.u = t[0];
				else {
					var e = Lr.exec(t[0]);
					if (null != e && 4 == e[me] && (this.c = e[1] || "t0", this.e = e[2] || "", this.d = e[3], this.a = [][ue][$e](t, 1), this.e || (this.A = "create" == this.d, this.i = "require" == this.d, this.g = "provide" == this.d, this.ba = "remove" == this.d), this.i && (3 <= this.a[me] ? (this.X = this.a[1], this.W = this.a[2]) : this.a[1] && (s(this.a[1]) ? this.X = this.a[1] : this.W = this.a[1]))), e = t[1], t = t[2], !this.d) throw "abort";
					if (this.i && (!s(e) || "" == e)) throw "abort";
					if (this.g && (!s(e) || "" == e || !i(t))) throw "abort";
					if (I(this.c) || I(this.e)) throw "abort";
					if (this.g && "t0" != this.c) throw "abort"
				}
			};
		xr = new Te, Cr = new Te, kr = {
			ec: 45,
			ecommerce: 46,
			linkid: 47
		};
		var Ar = function(t, e, r) {
				e == _r ? n(35) : e.get(ji);
				var s = xr.get(t);
				return i(s) ? (e.plugins_ = e.plugins_ || new Te, e.plugins_.get(t) ? !0 : (e.plugins_.set(t, new s(e, r || {})), !0)) : !1
			},
			Dr = function(e) {
				function n(t) {
					var e = (t[te] || "")[K](":")[0][ke](),
						n = (t[ne] || "")[ke](),
						n = 1 * t[Y] || ("http:" == n ? 80 : "https:" == n ? 443 : "");
					return t = t.pathname || "", a(t, "/") || (t = "/" + t), [e, "" + n, t]
				}
				var i = De[G]("a");
				t(i, De[Q][ie]);
				var r = (i[ne] || "")[ke](),
					s = n(i),
					o = i[ee] || "",
					c = r + "//" + s[0] + (s[1] ? ":" + s[1] : "");
				return a(e, "//") ? e = r + e : a(e, "/") ? e = c + e : !e || a(e, "?") ? e = c + s[2] + (e || o) : 0 > e[K]("/")[0][de](":") && (e = c + s[2][je](0, s[2].lastIndexOf("/")) + "/" + e), t(i, e), r = n(i), {
					protocol: (i[ne] || "")[ke](),
					host: r[0],
					port: r[1],
					path: r[2],
					G: i[ee] || "",
					url: e || ""
				}
			},
			Er = {
				ga: function() {
					Er.f = []
				}
			};
		Er.ga(), Er.D = function() {
			var t = Er.J[se](Er, arguments),
				t = Er.f.concat(t);
			for (Er.f = []; 0 < t[me] && !Er.v(t[0]) && (t.shift(), !(0 < Er.f[me])););
			Er.f = Er.f.concat(t)
		}, Er.J = function() {
			for (var t = [], e = 0; e < arguments[me]; e++) try {
				var r = new Tr(arguments[e]);
				if (r.g) xr.set(r.a[0], r.a[1]);
				else {
					if (r.i) {
						var s = r,
							o = s.a[0];
						if (!i(xr.get(o)) && !Cr.get(o)) {
							kr[Z](o) && n(kr[o]);
							var c = s.X;
							if (!c && kr[Z](o) ? (n(39), c = o + ".js") : n(43), c) {
								c && 0 <= c[de]("/") || (c = m() + "//www.google-analytics.com/plugins/ua/" + c);
								var u, l = Dr(c),
									s = void 0,
									d = l[ne],
									h = De[Q][ne],
									s = "https:" == d || d == h ? !0 : "http:" != d ? !1 : "http:" == h;
								if (u = s) {
									var s = l,
										p = Dr(De[Q][ie]);
									if (s.G || 0 <= s.url[de]("?") || 0 <= s.path[de]("://")) u = !1;
									else if (s[X] == p[X] && s[Y] == p[Y]) u = !0;
									else {
										var g = "http:" == s[ne] ? 80 : 443;
										u = "www.google-analytics.com" == s[X] && (s[Y] || g) == g && a(s.path, "/plugins/") ? !0 : !1
									}
								}
								u && (f(l.url), Cr.set(o, !0))
							}
						}
					}
					t[ae](r)
				}
			} catch (v) {}
			return t
		}, Er.v = function(t) {
			try {
				if (t.u) t.u[$e](Ae, _r.j("t0"));
				else {
					var e = t.c == ln ? _r : _r.j(t.c);
					if (t.A) "t0" == t.c && _r.create[se](_r, t.a);
					else if (t.ba) _r.remove(t.c);
					else if (e)
						if (t.i) {
							if (!Ar(t.a[0], e, t.W)) return !0
						} else if (t.e) {
						var n = t.d,
							i = t.a,
							r = e.plugins_.get(t.e);
						r[n][se](r, i)
					} else e[t.d][se](e, t.a)
				}
			} catch (s) {}
		};
		var _r = function() {
			n(1), Er.D[se](Er, [arguments])
		};
		_r.h = {}, _r.P = [], _r.L = 0, _r.answer = 42;
		var Hr = [xi, Ci, ji];
		_r.create = function() {
				var t = v(Hr, [][ue][$e](arguments));
				t[ji] || (t[ji] = "t0");
				var e = "" + t[ji];
				return _r.h[e] ? _r.h[e] : (t = new br(t), _r.h[e] = t, _r.P[ae](t), t)
			}, _r.remove = function(t) {
				for (var e = 0; e < _r.P[me]; e++)
					if (_r.P[e].get(ji) == t) {
						_r.P.splice(e, 1), _r.h[t] = null;
						break
					}
			}, _r.j = function(t) {
				return _r.h[t]
			}, _r.K = function() {
				return _r.P[ue](0)
			}, _r.N = function() {
				"ga" != ln && n(49);
				var t = Ae[ln];
				if (!t || 42 != t.answer) {
					_r.L = t && t.l, _r.loaded = !0;
					var e = Ae[ln] = _r;
					T("create", e, e.create, 3), T("remove", e, e.remove), T("getByName", e, e.j, 5), T("getAll", e, e.K, 6), e = br[pe], T("get", e, e.get, 7), T("set", e, e.set, 4), T("send", e, e[W], 2), e = Xe[pe], T("get", e, e.get), T("set", e, e.set), (Ae.gaplugins = Ae.gaplugins || {}).Linker = rr, e = rr[pe], xr.set("linker", rr), T("decorate", e, e.Q, 20), T("autoLink", e, e.S, 25), xr.set("displayfeatures", mr), xr.set("adfeatures", gr), t = t && t.q, r(t) ? Er.D[se](_r, t) : n(50)
				}
			},
			function() {
				var t = _r.N;
				if (!Sr(t)) {
					n(16);
					var e = !1,
						i = function() {
							!e && Sr(t) && (e = !0, Le(De, "visibilitychange", i))
						};
					Se(De, "visibilitychange", i)
				}
			}()
	}(window),
	function() {
		var t, e, n, i, r;
		window.GoogleAnalyticsObject = "ga", null == window.ga && (window.ga = function() {
				var t;
				return null == (t = window.ga).q && (t.q = []), window.ga.q.push(arguments)
			}), window.ga.l = Date.now(), t = function() {
				var t;
				return t = $("meta[name=analytics-location]"), t.length ? t.last()[0].content : window.location.pathname + window.location.search
			}, e = function() {
				return $("meta[name=analytics-location]").length ? document.title.replace(/([\w-]+\/)+[\w\.-]+/g, "private/private") : document.title
			}, r = function() {
				var n, i, r, s, a;
				for (r = window.location.protocol + "//" + window.location.host + t(), window.ga("set", "title", e()), window.ga("set", "location", r), a = document.querySelectorAll("meta.js-ga-set"), n = 0, i = a.length; i > n; n++) s = a[n], window.ga("set", s.name, s.content)
			}, n = function() {
				var n;
				return n = {
					title: e(),
					path: t()
				}, window.ga("send", "pageview", n)
			}, i = function() {
				return r(), n()
			},
			function() {
				var t;
				if (t = document.querySelector("meta[name=google-analytics]")) return window.ga("create", t.content, "github.com"), r()
			}(), $(function() {
				return n()
			}), $(document).on("pjax:complete", function() {
				return setTimeout(i, 20)
			})
	}.call(this),
	function() {
		$(document).on("submit", ".js-user-recommendations-form", function() {
			var t;
			return t = $(".js-user-interests-input").val(), window.ga("send", "event", "Recommendations", "submit", "Interest entered : " + t)
		}), $(document).on("click", ".js-interest-option", function() {
			var t;
			return t = $(this).text(), window.ga("send", "event", "Recommendations", "click", "Example Interest clicked : " + t)
		}), $(document).on("submit", ".js-remove-user-interest-form", function() {
			var t;
			return t = this.querySelector('input[name="interest"]').value, window.ga("send", "event", "Recommendations", "click", "Interest removed : " + t)
		}), $(document).on("submit", ".recommendations-wrapper .js-unfollow-button", function() {
			return window.ga("send", "event", "Recommendations", "submit", "Unfollowed a User suggestion")
		}), $(document).on("submit", ".recommendations-wrapper .js-follow-button", function() {
			return window.ga("send", "event", "Recommendations", "submit", "Followed a User suggestion")
		}), $(document).on("submit", ".recommendations-wrapper .js-unstar-button", function() {
			return window.ga("send", "event", "Recommendations", "submit", "Unstarred a Repo suggestion")
		}), $(document).on("submit", ".recommendations-wrapper .js-star-button", function() {
			return window.ga("send", "event", "Recommendations", "submit", "Starred a Repo suggestion")
		})
	}.call(this),
	function() {
		$(function() {
			return $(".js-form-signup-home").one("input", "input[type=text]", function() {
				return window.ga("send", "event", "Signup", "Attempt", "Homepage Form")
			}), $(".js-form-signup-detail").one("input", "input[type=text]", function() {
				return window.ga("send", "event", "Signup", "Attempt", "Detail Form")
			})
		})
	}.call(this),
	function() {
		var t, e, n, i, r, s, a, o, c, u, l, d, h, f, m, p = [].slice;
		n = {
			originalHistoryState: JSON.stringify(window.history.state)
		}, e = [], u = (new Date).getTime(), r = null, m = document.querySelector("meta[name=user-login]").content, f = !1, o = function() {
			f = !0
		}, a = function() {
			f = !1
		}, $(window).on("pageshow", a), $(window).on("pagehide", o), $(window).on("error", function(t) {
			var i, a, o, l, h, f;
			f = t.originalEvent, h = f.message, o = f.filename, l = f.lineno, a = f.error, i = $.extend.apply($, [{},
				n
			].concat(p.call(e), [{
				message: h,
				filename: o,
				lineno: l,
				url: window.location.href,
				readyState: document.readyState,
				referrer: document.referrer,
				stack: null != a ? a.stack : void 0,
				historyState: JSON.stringify(window.history.state),
				timeSinceLoad: Math.round((new Date).getTime() - u),
				extensionScripts: JSON.stringify(s().sort()),
				navigations: JSON.stringify(c()),
				user: m
			}], [null != a ? a.failbotContext : void 0])), e = [], null != i.eventTarget && (i.eventTarget = $(i.eventTarget).inspect()), $(document).trigger("captured:error", i), d(t) && (null == r && (r = document.querySelector("meta[name=browser-errors-url]").content), fetch(r, {
				method: "POST",
				body: JSON.stringify(i)
			}))
		}), d = function() {
			var t;
			return t = 0,
				function(e) {
					var n, i, r;
					return r = e.originalEvent, i = r.lineno, n = r.error, window.isProxySite() && !n.forceReport ? !1 : null != (null != n ? n.stack : void 0) && i ? f ? !1 : t >= 10 ? !1 : (t++, !0) : !1
				}
		}(), s = function() {
			var t, e, n, i, r;
			for (n = $("script"), i = [], t = 0, e = n.length; e > t; t++) r = n[t], /^(?:chrome-extension|file):/.test(r.src) && i.push(r.src);
			return i
		}, i = jQuery.event.dispatch, jQuery.event.dispatch = function(t) {
			var n;
			return "error" === t.type && t.target === window ? i.apply(this, arguments) : (e.push({
				eventType: t.type,
				eventTarget: t.target
			}), n = i.apply(this, arguments), e.pop(), n)
		}, l = function(t, e) {
			var n;
			return n = c(), n.push({
				type: t,
				url: window.location.href,
				state: window.history.state,
				info: e
			}), h(n)
		}, t = "navigations", c = function() {
			var e;
			return e = function() {
				try {
					return sessionStorage.getItem(t)
				} catch (e) {}
			}(), e ? JSON.parse(e) : []
		}, h = function(e) {
			try {
				return sessionStorage.setItem(t, JSON.stringify(e))
			} catch (n) {}
		}, l("load"), $(window).on("hashchange", function(t) {
			return l("hashchange", {
				oldURL: t.oldURL,
				newURL: t.newURL
			})
		}), $(window).on("popstate", function(t) {
			return l("popstate", {
				eventState: t.state
			})
		}), $(document).on("pjax:success", function() {
			return l("pjax:success")
		}), $(document).on("pjax:popstate", function(t) {
			return l("pjax:popstate", {
				pjaxDirection: t.direction,
				pjaxState: t.state
			})
		}), "#b00m" === window.location.hash && b00m()
	}.call(this),
	function() {
		$(document).on("click", ".email-hidden-toggle > a", function() {
			return $(this).parent().siblings(".email-hidden-reply").toggle(), !1
		})
	}.call(this),
	function() {
		var t, e, n, i, r, s;
		i = function(t) {
			var e, n, i, r, s;
			r = t.trim().split(/\s*,\s*/), n = r[0], e = r[1], i = r[2], s = r[3], s ? window.ga("send", "event", n, e, i, s, {
				useBeacon: !0
			}) : window.ga("send", "event", n, e, i, {
				useBeacon: !0
			})
		}, e = function(t) {
			var e;
			e = $(t.target).closest("[data-ga-click]").attr("data-ga-click"), e && i(e)
		}, s = new WeakMap, n = function() {
			var t, e, n, r;
			for (e = $("[data-ga-load]"), n = 0, r = e.length; r > n; n++) t = e[n], s.get(t) || (s.set(t, !0), i(t.getAttribute("data-ga-load")))
		}, r = function() {
			var t, e, n, r, a;
			for (a = $("meta[name=analytics-event]"), n = [], t = 0, e = a.length; e > t; t++) r = a[t], s.get(r) || (s.set(r, !0), n.push(i(r.content)));
			return n
		}, t = function() {
			return r(), n()
		}, $(t), $(document).on("pjax:complete", function() {
			return setTimeout(t, 20)
		}), window.addEventListener("click", e, !0)
	}.call(this),
	function() {
		var t;
		t = function() {
			var t, e, n, i, r, s, a, o, c, u, l;
			n = $(this), c = n.attr("data-url"), a = n.attr("data-search-url"), r = {
				top: 5,
				right: 0,
				bottom: 15,
				left: 0
			}, l = n.width() - r.left - r.right, i = n.height() - r.top - r.bottom, e = d3.time.format("%Y-%m-%d"), o = d3.tip().attr("class", "svg-tip").offset([-10, 0]).html(function(t) {
				return "<strong>" + t.count + "</strong> " + $.pluralize(t.count, "event")
			}), u = d3.select(n.get(0)).append("svg").attr("width", l + r.left + r.right).attr("height", i + r.top + r.bottom).attr("class", "vis").append("g").attr("transform", "translate(" + r.left + ", " + r.top + ")").call(o), s = function() {
				u.remove(), $(".js-auth-info").remove(), n.append("div").attr("class", "inline-error").text("We couldn't render audit log activity for some reason. Try refreshing the page.")
			}, t = function(t) {
				var e;
				return e = {}, t.forEach(function(t) {
					var n, i;
					return t.date = n = new Date(1e3 * t.time), i = n.toDateString(), e.hasOwnProperty(i) ? e[i].count += t.count : e[i] = t
				}), d3.map(e).values()
			}, $.fetchJSON(c)["catch"](function() {
				return s()
			}).then(function(n) {
				var r, s, c, d, h;
				return n = t(n), s = d3.max(n, function(t) {
					return t.count
				}), c = d3.sum(n, function(t) {
					return t.count
				}), d = d3.scale.ordinal().domain(d3.range(n.length)).rangeRoundBands([0, l], .1), h = d3.scale.linear().domain([0, s]).range([i, 0]), r = u.selectAll(".audit-day").data(n).enter().append("g").attr("class", "audit-day").attr("transform", function(t, e) {
					return "translate(" + d(e) + ", 0)"
				}), r.append("rect").attr("width", d.rangeBand()).attr("height", 1).attr("y", i - 1).attr("class", "bar-base"), r.append("a").attr("xlink:href", function(t) {
					return a + "?q=created:" + e(t.date)
				}).append("rect").attr("width", d.rangeBand()).attr("height", function(t) {
					return "" + (i - h(t.count))
				}).attr("y", function(t) {
					return h(t.count)
				}).on("mouseover", o.show).on("mouseout", o.hide), r.append("text").attr("y", i + 15).attr("x", d.rangeBand() / 2).text(function(t) {
					return d3.time.format("%a")(t.date).slice(0, 2)
				}), d3.select(".js-auth-info").html("<span class='sum'>" + c + "</span> " + $.pluralize(c, "event") + " happened in the past two weeks.")
			})
		}, d3Ready().then(function() {
			return $.observe(".js-audit-activity", t)
		})
	}.call(this),
	function() {
		$(document).on("click", ".js-new-user-contrib-example", function(t) {
			var e, n, i;
			return t.preventDefault(), e = document.querySelector(".js-calendar-graph"), e.classList.contains("sample-graph") ? void 0 : (e.classList.add("sample-graph"), n = function(t) {
				var n;
				return n = e.querySelector(".js-calendar-graph-svg"), $(n).replaceWith(t)
			}, i = function() {
				return e.classList.remove("sample-graph")
			}, $.fetchText(this.getAttribute("href")).then(n, i))
		})
	}.call(this),
	function() {
		$(document).on("graph:load", ".js-graph-code-frequency", function(t, e) {
			var n, i, r, s, a, o, c, u, l, d, h, f, m, p, g, v, b, j, y;
			return g = $(this).width(), s = 500, h = [10, 10, 20, 40], d = h[0], l = h[1], c = h[2], u = h[3], e = e.map(function(t) {
				return [new Date(1e3 * t[0]), t[1], t[2]]
			}).sort(function(t, e) {
				return d3.ascending(t[0], e[0])
			}), n = e.map(function(t) {
				return [t[0], t[1]]
			}), r = e.map(function(t) {
				return [t[0], t[2]]
			}), a = d3.max(n, function(t) {
				return t[1]
			}), o = d3.min(r, function(t) {
				return t[1]
			}), p = e[0][0], m = e[e.length - 1][0], v = d3.time.scale().domain([p, m]).range([0, g - u - l]), j = d3.scale.linear().domain([o, a]).range([s - c - d, 0]), b = d3.svg.axis().scale(v).tickFormat(function(t) {
				return p.getFullYear() !== m.getFullYear() ? d3.time.format("%m/%y")(t) : d3.time.format("%m/%d")(t)
			}), y = d3.svg.axis().scale(j).orient("left").tickPadding(5).tickSize(g).tickFormat(function(t) {
				return d3.formatSymbol(t, !0)
			}), i = d3.svg.area().x(function(t) {
				return v(t[0])
			}).y0(function(t) {
				return j(t[1])
			}).y1(function() {
				return j(0)
			}), f = d3.select(this).data(e).append("svg").attr("width", g).attr("height", s).attr("class", "viz code-frequency").append("g").attr("transform", "translate(" + u + "," + d + ")"), f.append("g").attr("class", "x axis").attr("transform", "translate(0, " + (s - d - c) + ")").call(b), f.append("g").attr("class", "y axis").attr("transform", "translate(" + g + ", 0)").call(y), f.selectAll("path.area").data([n, r]).enter().append("path").attr("class", function(t, e) {
				return 0 === e ? "addition" : "deletion"
			}).attr("d", i)
		})
	}.call(this),
	function() {
		$(document).on("graph:load", ".js-commit-activity-graph", function(t, e) {
			var n, i, r, s, a, o, c, u, l, d, h, f, m, p, g, v, b, j, y, w, x, k;
			return c = $("#commit-activity-master"), i = $("#commit-activity-detail"), a = 260, b = i.width(), j = 0, g = null,
				function() {
					var t, n, s, o, c, u, l, d, h, f, m, p, v, y, w, x, k, C, S, L;
					for (l = 0, c = u = 0, d = e.length; d > u; c = ++u) t = e[c], 0 !== t.total && (l = c);
					return j = l, w = [20, 30, 30, 40], v = w[0], m = w[1], p = w[2], f = w[3], s = e[j].days, h = d3.max(e, function(t) {
						return d3.max(t.days)
					}), k = d3.scale.linear().domain([0, s.length - 1]).range([0, b - m - p]), S = d3.scale.linear().domain([0, h]).range([a, 0]), L = d3.svg.axis().scale(S).orient("left").ticks(5).tickSize(-b + p + m), $(this).on("hotkey:activate", function(t) {
						var n, i;
						return i = j, n = t.originalEvent.hotkey, "left" === n || "right" === n ? (j > 0 && "left" === n && (i -= 1), j < e.length && "right" === n && (i += 1), g({
							index: i
						})) : void 0
					}), x = d3.select(i[0]).data([s]).append("svg").attr("width", b).attr("height", a + v + f).attr("class", "viz").append("g").attr("transform", "translate(" + m + "," + v + ")"), x.append("g").attr("class", "y axis").call(L), C = x.append("g").attr("class", "axis"), n = C.selectAll(".day").data(d3.weekdays).enter().append("g").attr("class", "day").attr("transform", function(t, e) {
						return "translate(" + k(e) + ", " + a + ")"
					}), n.append("text").attr("text-anchor", "middle").attr("dy", "2em").text(function(t) {
						return t
					}), y = d3.svg.line().x(function(t, e) {
						return k(e)
					}).y(S), x.append("path").attr("class", "path").attr("d", y), o = x.selectAll("g.dot").data(s).enter().append("g").attr("class", "dot").attr("transform", function(t, e) {
						return "translate(" + k(e) + ", " + S(t) + ")"
					}), o.append("circle").attr("r", 4), o.append("text").attr("text-anchor", "middle").attr("class", "tip").attr("dy", -10).text(function(t) {
						return t
					}), g = function(t) {
						var n, i, a;
						if (!(t.index >= 52 || t.index < 0)) return j = t.index, s = e[t.index].days, h = d3.max(s), k.domain([0, s.length - 1]), a = d3.selectAll(".bar.mini").attr("class", "bar mini"), n = d3.select(a[0][j]).attr("class", "bar mini active"), i = d3.transform(n.attr("transform")), r.transition().ease("back-out").duration(300).attr("transform", "translate(" + (i.translate[0] + 8) + ", 105)"), x.selectAll(".path").data([s]).transition().duration(500).attr("d", y), x.selectAll("g.dot").data(s).transition().duration(300).attr("transform", function(t, e) {
							return "translate(" + k(e) + ", " + S(t) + ")"
						}), x.selectAll("text.tip").data(s).text(function(t) {
							return t
						})
					}
				}(), f = [10, 30, 20, 30], h = f[0], l = f[1], d = f[2], u = f[3], a = 100, p = e.map(function(t) {
					return t.total
				}), o = d3.max(p), s = d3.time.format.utc("%m/%d"), y = d3.scale.ordinal().domain(d3.range(p.length)).rangeRoundBands([0, b - l - d], .1), x = d3.scale.linear().domain([0, o]).range([a, 0]), k = d3.svg.axis().scale(x).orient("left").ticks(3).tickSize(-b + l + d).tickFormat(d3.formatSymbol), w = d3.svg.axis().scale(y).ticks(d3.time.weeks).tickFormat(function(t, n) {
					var i;
					return i = new Date(1e3 * e[n].week), s(i)
				}), m = d3.tip().attr("class", "svg-tip").offset([-10, 0]).html(function(t, n) {
					var i, r;
					return i = new Date(1e3 * e[n].week), r = d3.months[i.getUTCMonth()].slice(0, 3) + " " + i.getUTCDate(), "<strong>" + t + "</strong> " + $.pluralize(t, "commit") + " the week of " + r
				}), v = d3.select(c[0]).style("width", b + "px").append("svg").attr("width", b + (l + d)).attr("height", a + h + u).attr("class", "viz").append("g").attr("transform", "translate(" + l + "," + h + ")").call(m), v.append("g").attr("class", "y axis").call(k), n = v.selectAll("g.mini").data(p).enter().append("g").attr("class", function(t, e) {
					return e === j ? "bar mini active" : "bar mini"
				}).attr("transform", function(t, e) {
					return "translate(" + y(e) + ", 0)"
				}).on("click", function(t, e) {
					return g({
						node: this,
						index: e,
						data: t
					})
				}), n.append("rect").attr("width", y.rangeBand()).attr("height", function(t) {
					return a - x(t)
				}).attr("y", function(t) {
					return x(t)
				}).on("mouseover", m.show).on("mouseout", m.hide), v.append("g").attr("class", "x axis").attr("transform", "translate(0," + a + ")").call(w).selectAll(".tick").style("display", function(t, e) {
					return e % 3 !== 0 ? "none" : "block"
				}), r = v.append("circle").attr("class", "focus").attr("r", 8).attr("transform", "translate(" + (y(j) + y.rangeBand() / 2) + ", " + -a + ")"), r.transition().ease("elastic-in").duration(1e3).attr("r", 2).attr("transform", "translate(" + (y(j) + y.rangeBand() / 2) + ", " + (a + 5) + ")")
		})
	}.call(this),
	function() {
		var t, e, n, i;
		n = function() {
			var t, e, n, i, r, s, a, o;
			for (r = {}, s = document.location.search.substr(1).split("&"), t = 0, n = s.length; n > t; t++) i = s[t], a = i.split("="), e = a[0], o = a[1], r[e] = o;
			return r
		}, t = function(t) {
			return t = new Date(t), d3.months[t.getUTCMonth()].slice(0, 3) + " " + t.getUTCDate() + ", " + t.getUTCFullYear()
		}, i = function(e, n) {
			var i, r;
			return r = t(e), i = t(n), $(".js-date-range").html(r + " &ndash; " + i)
		}, e = function(t) {
			var e, n;
			return e = t[0].weeks[0].date, n = new Date(e.getTime() - 6048e5), t.forEach(function(t) {
				return t.weeks.unshift({
					a: 0,
					c: 0,
					d: 0,
					date: n,
					w: n / 1e3
				})
			})
		}, $(document).on("graph:load", "#contributors", function(t, r) {
			var s, a, o, c, u, l, d, h, f, m, p, g, v, b, j, y, w, x, k;
			return a = $(this), o = [], f = n(), k = null, x = null, null != f.from && (j = new Date(f.from)), null != f.to && (u = new Date(f.to)), c = (null != f ? f.type : void 0) || "c", d = d3.time.format.utc("%Y-%m-%d"), m = function(t) {
				return new Date(1e3 * ~~t)
			}, a.on("range.selection.end", function(t, e) {
				var n;
				return n = e.range, j = n[0], u = n[1], d(j) === d(u) && (j = k, u = x), w(), i(j, u), v()
			}), g = function(t) {
				var n, r;
				return 1 === t[0].weeks.length && e(t), r = s(t), k = m(r[0].key), x = m(~~r[r.length - 1].key + 518400), n = new Date, x > n && (x = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate()))), null == j && (j = k), null == u && (u = x), i(j, u), b(r, k, x), v(t, k, x), $(".js-contribution-container").on("change", "input[type=radio]", h)
			}, p = function(t) {
				var e, n, i, r, s, a, o;
				for (n = 0, r = t.length; r > n; n++)
					for (e = t[n], a = e.weeks, i = 0, s = a.length; s > i; i++) o = a[i], o.date = new Date(1e3 * o.w);
				return t
			}, l = function(t, e) {
				return t.map(function(t) {
					var n;
					return n = $.extend(!0, {}, t), n.weeks = n.weeks.filter(function(t) {
						return t.date >= e[0] && t.date <= e[1]
					}), n
				})
			}, s = function(t) {
				var e, n, i, r, s, a, o, c, u;
				for (c = {}, n = 0, r = t.length; r > n; n++)
					for (e = t[n], o = e.weeks, i = 0, s = o.length; s > i; i++) u = o[i], null == c[a = u.w] && (c[a] = {
						c: 0,
						a: 0,
						d: 0
					}), c[u.w].c += u.c, c[u.w].a += u.a, c[u.w].d += u.d;
				return d3.entries(c)
			}, y = function(t) {
				return t = l(t, [j, u]), t.forEach(function(t) {
					var e, n, i, r, s, a, o;
					for (n = 0, e = 0, i = 0, a = t.weeks, r = 0, s = a.length; s > r; r++) o = a[r], n += o.c, e += o.a, i += o.d;
					return t.c = n, t.a = e, t.d = i
				}), t.sort(function(t, e) {
					return d3.descending(t[c], e[c])
				})
			}, b = function(t, e, n) {
				var i, r, s, o, l, h, f, p, g, v, $, b, y, w, x, k, C, S;
				return g = [20, 50, 20, 30], p = g[0], h = g[1], f = g[2], l = g[3], w = a.width(), s = 125, o = d3.max(t, function(t) {
					return t.value[c]
				}), x = d3.time.scale().domain([e, n]).range([0, w - h - f]), C = d3.scale.linear().domain([0, o]).range([s, 0]), S = d3.svg.axis().scale(C).orient("left").ticks(4).tickSize(-w + h + f).tickPadding(10).tickFormat(d3.formatSymbol), k = d3.svg.axis().scale(x), t.length < 5 && k.ticks(t.length), i = d3.svg.area().interpolate("basis").x(function(t) {
					return x(m(t.key))
				}).y0(function() {
					return s
				}).y1(function(t) {
					return C(t.value[c])
				}), d3.select("#contributors-master svg").remove(), y = d3.select("#contributors-master").data([t]).append("svg").attr("height", s + p + l).attr("width", w).attr("class", "viz").append("g").attr("transform", "translate(" + h + "," + p + ")"), y.append("g").attr("class", "x axis").attr("transform", "translate(0, " + s + ")").call(k), y.append("g").attr("class", "y axis").call(S), y.append("path").attr("class", "area").attr("d", i), b = function() {
					var t;
					return y.classed("selecting", !0), t = d3.event.target.extent(), a.trigger("range.selection.start", {
						data: arguments[0],
						range: t
					})
				}, v = function() {
					var t;
					return t = d3.event.target.extent(), a.trigger("range.selection.selected", {
						data: arguments[0],
						range: t
					})
				}, $ = function() {
					var t;
					return y.classed("selecting", !d3.event.target.empty()), t = d3.event.target.extent(), a.trigger("range.selection.end", {
						data: arguments[0],
						range: t
					})
				}, r = d3.svg.brush().x(x).on("brushstart", b).on("brush", v).on("brushend", $), (d(j) !== d(e) || d(u) !== d(n)) && r.extent([j, u]), y.append("g").attr("class", "selection").call(r).selectAll("rect").attr("height", s)
			}, v = function() {
				var t, e, n, i, s, a, l, d, h, f, m, p, g, v, b, w, x, k, C, S, L, T;
				return p = [10, 10, 10, 20], f = p[0], d = p[1], h = p[2], l = p[3], x = 428, n = 100, $("#contributors ol").remove(), r = y(o), v = document.createElement("ol"), w = d3.select(v).attr("class", "contrib-data capped-cards clearfix"), s = d3.max(r, function(t) {
					return d3.max(t.weeks, function(t) {
						return t[c]
					})
				}), k = d3.time.scale().domain([j, u]).range([0, x]), S = d3.scale.linear().domain([0, s]).range([n - l - f, 0]), e = d3.svg.area().interpolate("basis").x(function(t) {
					return k(t.date)
				}).y0(function() {
					return n - l - f
				}).y1(function(t) {
					return S(t[c])
				}), L = d3.svg.axis().scale(S).orient("left").ticks(2).tickSize(-x).tickPadding(10).tickFormat(d3.formatSymbol), C = d3.svg.axis().scale(k), r[0].weeks.length < 5 && C.ticks(r[0].weeks.length).tickFormat(d3.time.format("%x")), $("li.capped-card").remove(), m = w.selectAll("li.capped-card").data(r).enter().append("li").attr("class", "capped-card").style("display", function(t) {
					return t[c] < 1 ? "none" : "block"
				}), i = m.append("h3"), i.append("img").attr("src", function(t) {
					return t.author.avatar
				}).attr("class", "avatar").attr("alt", ""), i.append("span").attr("class", "rank").text(function(t, e) {
					return "#" + (e + 1)
				}), i.append("a").attr("class", "aname").attr("href", function(t) {
					return "/" + t.author.login
				}).text(function(t) {
					return t.author.login
				}), t = i.append("span").attr("class", "ameta"), g = $(".graphs").attr("data-repo-url"), t.append("span").attr("class", "cmeta").html(function(t) {
					var e, n, i, r, s, a;
					return e = g + "/commits?author=" + t.author.login, a = $.commafy(t.c) + " " + $.pluralize(t.c, "commit"), s = $("<a>", {
						href: e,
						"class": "cmt",
						text: a
					}), i = $("<span>", {
						"class": "a",
						text: $.commafy(t.a) + " ++"
					}), r = $("<span>", {
						"class": "d",
						text: $.commafy(t.d) + " --"
					}), n = " / ", $("<div>").append([s, n, i, n, r]).html()
				}), b = m.append("svg").attr("width", x + (d + h)).attr("height", n + f + l).attr("class", "capped-card-content").append("g").attr("transform", "translate(" + d + "," + f + ")"), a = C.ticks()[0], b.append("g").attr("class", "x axis").classed("dense", a >= 10).attr("transform", "translate(0, " + (n - f - l) + ")").call(C).selectAll(".tick text").style("display", function(t, e) {
					return e % 2 !== 0 ? "none" : "block"
				}), b.select(".x.dense text").attr("dx", 7), T = b.append("g").attr("class", "y axis").call(L).selectAll(".y.axis g text").attr("dx", x / 2).style("display", function(t, e) {
					return 0 === e ? "none" : "block"
				}).classed("midlabel", !0), b.append("path").attr("d", function(t) {
					return e(t.weeks)
				}), document.querySelector("#contributors").appendChild(v)
			}, w = function() {
				var t, e;
				return $.support.pjax ? (t = document.location, c = $("input[name=ctype]:checked").prop("value").toLowerCase(), e = t.pathname + "?from=" + d(j) + "&to=" + d(u) + "&type=" + c, window.history.pushState(null, null, e)) : void 0
			}, h = function() {
				return c !== $(this).val() ? (w(), g(o)) : void 0
			}, o = p(r), g(r)
		})
	}.call(this),
	function() {
		var t, e, n, i, r, s, a, o;
		i = function(t) {
			var e;
			return (e = d3.format(","))(t)
		}, n = {
			top: 20,
			right: 40,
			bottom: 30,
			left: 40
		}, o = 980 - n.left - n.right, e = 150 - n.top - n.bottom, t = function(t) {
			return "<div class='blankslate'> <span class='mega-octicon octicon-graph'></span> <h3>No activity so far this " + t + "</h3> </div>"
		}, a = function(t) {
			var e;
			return e = 0 > t ? "octicon-arrow-down" : t > 0 ? "octicon-arrow-up" : "", "<span class='totals-num'> <span class='octicon " + e + "'></span> " + i(Math.abs(t)) + " change </span>"
		}, r = function(t) {
			var e, n;
			return e = 0 > t ? "octicon-arrow-down" : t > 0 ? "octicon-arrow-up" : "", n = 0 > t ? "decrease" : "increase", "<span class='totals-num'> <span class='octicon " + e + "'></span> " + i(Math.abs(t)) + "% " + n + " </span>"
		}, s = function(s, c) {
			var u, l, d, h, f, m, p, g, v, b, j, y, w, x, k, C, S, L, T, A, D, E, _, H, q, P, I, M;
			if (c && null == c.error) {
				for (f = c.counts, h = c.summary.columns, T = new Date(1e3 * c.summary.starting), p = new Date(1e3 * c.summary.ending), C = c.summary.model, S = c.summary.period, k = d3.max(d3.merge(d3.values(f)), function(t) {
					return t.count
				}), x = d3.time.format("%A, %B %-d, %Y"), g = d3.time.format("%-I%p"), l = d3.bisector(function(t) {
					return t.date
				}).left, v = 0, j = h.length; j > v; v++) d = h[v], $(".js-" + C + "-" + d + " .js-total").text(i(c.summary.totals[d])), $(".js-" + C + "-" + d + " .js-changes").append(a(c.summary.total_changes[d])), $(".js-" + C + "-" + d + " .js-changes").append(r(c.summary.percent_changes[d]));
				if (0 === d3.values(c.summary.totals).filter(function(t) {
					return 0 !== t
				}).length) return $(this).html(t(S));
				for (E = d3.tip().attr("class", "svg-tip total-unique comparison").offset([-10, 0]).html(function(t) {
					var e, n, r, s, a, o;
					for (o = "", e = function() {
						switch (S) {
							case "year":
								return "Week of " + x(t.date);
							case "week":
								return x(t.date) + " starting at " + g(t.date);
							default:
								return x(t.date)
						}
					}(), a = 270 / c.summary.columns.length, s = c.summary.columns, n = 0, r = s.length; r > n; n++) d = s[n], o += "<li class='totals " + d + "' style='width:" + a + "px'> <strong>" + i(t[d]) + "</strong> " + d.split("_at")[0] + " </li>";
					return "<span class='title'>" + e + "</span> <ul> " + o + " </ul>"
				}), L = function() {
					var t, e, n, i, r, s, a, o, c, u;
					for (c = {}, u = H.invert(d3.mouse(this)[0]), r = h[0], s = l(f[r], u, 1), e = f[r][s - 1], n = f[r][s], t = n && u - e.date > n.date - u ? s : s - 1, c.date = f[r][t].date, a = 0, o = h.length; o > a; a++) d = h[a], c[d] = f[d][t].count;
					return i = _.selectAll("g.dots circle").filter(function(t) {
						return t.date === c.date
					}), E.show.call(this, c, i[0][0])
				}, b = 0, y = h.length; y > b; b++) d = h[b], f[d].forEach(function(t) {
					return t.date = new Date(1e3 * t.bucket)
				}), f[d] = f[d].filter(function(t) {
					return t.date < new Date
				});
				return H = d3.time.scale().range([0, o]), P = d3.scale.linear().range([e, 0]), I = d3.scale.linear().range([e, 0]), A = 1, D = function() {
					switch (S) {
						case "year":
							return d3.time.months;
						case "week":
							return A = 8, d3.time.hours;
						default:
							return A = 2, d3.time.days
					}
				}(), q = d3.svg.axis().scale(H).tickSize(e + 5).tickPadding(10).ticks(D, A).orient("bottom"), M = d3.svg.axis().scale(P).ticks(3).tickFormat(d3.formatSymbol).orient("left"), w = d3.svg.line().x(function(t) {
					return H(t.date)
				}).y(function(t) {
					return P(t.count)
				}), _ = d3.select(this).append("svg").attr("width", o + n.left + n.right).attr("height", e + n.top + n.bottom).attr("class", "vis").append("g").attr("transform", "translate(" + n.left + "," + n.top + ")").call(E), H.domain([T, p]), P.domain([0, k]), _.append("g").attr("class", "x axis").call(q).selectAll("text").attr("text-anchor", "middle"), _.append("g").attr("class", "y axis").call(M), u = d3.values(f), _.selectAll("path.path").data(u).enter().append("path").attr("class", function(t) {
					return "path total " + t[0].column
				}).attr("d", function(t) {
					return w(t)
				}), m = _.selectAll("g.dots").data(u).enter().append("g").attr("class", function(t) {
					return "dots totals " + t[0].column
				}), m.each(function() {
					var t;
					return t = d3.select(this), t.selectAll("circle").data(function(t) {
						return f[t[0].column]
					}).enter().append("circle").attr("cx", function(t) {
						return H(t.date)
					}).attr("cy", function(t) {
						return P(t.count)
					}).attr("r", 4)
				}), M.orient("right"), _.append("g").attr("class", "y axis unique").attr("transform", "translate(" + o + ", 0)").call(M), _.append("rect").attr("class", "overlay").attr("width", o).attr("height", e).on("mousemove", L).on("mouseout", function() {
					return setTimeout(E.hide, 500)
				})
			}
		}, $(document).on("graph:load", ".js-dashboards-overview-graph", s)
	}.call(this),
	function() {
		var t, e, n;
		t = {}, n = function(t) {
			return t.json()
		}, $.observe(".js-graph", e = function(e) {
			var i, r, s, a;
			(a = e.getAttribute("data-url")) && ($(e).find("svg").remove(), s = null != t[a] ? t[a] : t[a] = $.fetchPoll(a, {
				headers: {
					accept: "application/json"
				}
			}).then(n), e.classList.add("is-graph-loading"), e.classList.remove("is-graph-load-error", "is-graph-empty"), i = function(t) {
				var n, i, r;
				return e.classList.remove("is-graph-loading"), (null != t ? t.unusable : void 0) ? e.classList.add("is-graph-without-usable-data") : 0 === (null != t ? t.length : void 0) || 0 === (null != t && null != (n = t.summary) ? n.total : void 0) || 0 === (null != (i = t[0]) && null != (r = i.weeks) ? r.length : void 0) ? e.classList.add("is-graph-empty") : d3Ready().then(function() {
					return $(e).trigger("graph:load", [t])
				})
			}, r = function() {
				return e.classList.remove("is-graph-loading"), e.classList.add("is-graph-load-error")
			}, s.then(i, r))
		})
	}.call(this),
	function() {
		var t, e, n, i, r, s, a, o = function(t, e) {
			return function() {
				return t.apply(e, arguments)
			}
		};
		i = function() {
			function i(t, e, n) {
				this.container = t, this.width = e, this.height = n, this.initError = o(this.initError, this), this.init = o(this.init, this), this.loaderInterval = null, this.loaderOffset = 0, this.ctx = this.initCanvas(this.container, this.width, this.height), this.startLoader("Loading graph data"), this.loadMeta()
			}
			return i.prototype.initCanvas = function(t) {
				var e, n, i, r, s, a, o;
				return r = t.getElementsByTagName("canvas")[0], r.style.zIndex = "0", i = r.width, n = r.height, s = r.getContext("2d"), a = window.devicePixelRatio || 1, e = s.webkitBackingStorePixelRatio || s.mozBackingStorePixelRatio || s.msBackingStorePixelRatio || s.oBackingStorePixelRatio || s.backingStorePixelRatio || 1, o = a / e, 1 === o ? s : (r.width = i * o, r.height = n * o, r.style.width = i + "px", r.style.height = n + "px", s.scale(o, o), s)
			}, i.prototype.startLoader = function(t) {
				return this.ctx.save(), this.ctx.font = "14px 'Helvetica Neue', Arial, sans-serif", this.ctx.fillStyle = "#cacaca", this.ctx.textAlign = "center", this.ctx.fillText(t, this.width / 2, 155), this.ctx.restore(), this.displayLoader()
			}, i.prototype.stopLoader = function() {
				var t;
				return t = this.container.querySelector(".large-loading-area"), t.classList.add("is-hidden")
			}, i.prototype.displayLoader = function() {
				var t;
				return t = this.container.querySelector(".large-loading-area"), t.classList.remove("is-hidden")
			}, i.prototype.loadMeta = function() {
				var t, e;
				return t = function(t) {
					return t.json()
				}, e = this.container.getAttribute("data-network-graph-meta-url"), $.fetchPoll(e, {
					headers: {
						accept: "application/json"
					}
				}).then(t, this.initError).then(this.init)
			}, i.prototype.init = function(i) {
				var o, c, u, l, d, h;
				if (a) {
					for (this.focus = i.focus, this.nethash = i.nethash, this.spaceMap = i.spacemap, this.userBlocks = i.blocks, this.commits = function() {
						var e, n, r, s;
						for (r = i.dates, s = [], u = e = 0, n = r.length; n > e; u = ++e) o = r[u], s.push(new t(u, o));
						return s
					}(), this.users = {}, d = i.users, c = 0, l = d.length; l > c; c++) h = d[c], this.users[h.name] = h;
					return this.chrome = new r(this, this.ctx, this.width, this.height, this.focus, this.commits, this.userBlocks, this.users), this.graph = new s(this, this.ctx, this.width, this.height, this.focus, this.commits, this.users, this.spaceMap, this.userBlocks, this.nethash), this.mouseDriver = new n(this.container, this.chrome, this.graph), this.keyDriver = new e(this.chrome, this.graph), this.stopLoader(), this.graph.drawBackground(), this.chrome.draw(), this.graph.requestInitialChunk()
				}
			}, i.prototype.initError = function() {
				return this.stopLoader(), this.ctx.clearRect(0, 0, this.width, this.height), this.startLoader("Graph could not be drawn due to a network problem.")
			}, i
		}(), t = function() {
			function t(t, e) {
				this.time = t, this.date = new Date(e), this.requested = null, this.populated = null
			}
			return t.prototype.populate = function(t, e, n) {
				return this.user = e, this.author = t.author, this.date = new Date(t.date.replace(" ", "T")), this.gravatar = t.gravatar, this.id = t.id, this.login = t.login, this.message = t.message, this.space = t.space, this.time = t.time, this.parents = this.populateParents(t.parents, n), this.requested = !0, this.populated = new Date
			}, t.prototype.populateParents = function(t, e) {
				var n, i, r;
				return r = function() {
					var r, s, a;
					for (a = [], r = 0, s = t.length; s > r; r++) n = t[r], i = e[n[1]], i.id = n[0], i.space = n[2], a.push(i);
					return a
				}()
			}, t
		}(), r = function() {
			function t(t, e, n, i, r, s, a, o) {
				this.network = t, this.ctx = e, this.width = n, this.height = i, this.focus = r, this.commits = s, this.userBlocks = a, this.users = o, this.namesWidth = 120, this.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], this.userBgColors = ["#fff", "#f7f7f7"], this.headerColor = "#f7f7f7", this.dividerColor = "#ddd", this.headerHeight = 40, this.dateRowHeight = 30, this.graphTopOffset = 10 + this.headerHeight + this.dateRowHeight, this.nameLineHeight = 24, this.offsetX = this.namesWidth + (this.width - this.namesWidth) / 2 - this.focus * this.nameLineHeight, this.offsetY = 0, this.contentHeight = this.calcContentHeight(), this.graphMidpoint = this.namesWidth + (this.width - this.namesWidth) / 2, this.activeUser = null
			}
			return t.prototype.moveX = function(t) {
				return this.offsetX += t, this.offsetX > this.graphMidpoint ? this.offsetX = this.graphMidpoint : this.offsetX < this.graphMidpoint - this.commits.length * this.nameLineHeight ? this.offsetX = this.graphMidpoint - this.commits.length * this.nameLineHeight : void 0
			}, t.prototype.moveY = function(t) {
				return this.offsetY += t, this.offsetY > 0 || this.contentHeight < this.height - this.graphTopOffset ? this.offsetY = 0 : this.offsetY < -this.contentHeight + this.height / 2 ? this.offsetY = -this.contentHeight + this.height / 2 : void 0
			}, t.prototype.calcContentHeight = function() {
				var t, e, n, i, r;
				for (e = 0, r = this.userBlocks, n = 0, i = r.length; i > n; n++) t = r[n], e += t.count;
				return e * this.nameLineHeight
			}, t.prototype.hover = function(t, e) {
				var n, i, r, s;
				for (s = this.userBlocks, i = 0, r = s.length; r > i; i++)
					if (n = s[i], t > 0 && t < this.namesWidth && e > this.graphTopOffset + this.offsetY + n.start * this.nameLineHeight && e < this.graphTopOffset + this.offsetY + (n.start + n.count) * this.nameLineHeight) return this.users[n.name];
				return null
			}, t.prototype.draw = function() {
				return this.drawTimeline(this.ctx), this.drawUsers(this.ctx)
			}, t.prototype.drawTimeline = function(t) {
				var e, n, i, r, s, a, o, c, u, l, d, h, f;
				for (t.fillStyle = this.headerColor, t.fillRect(0, 0, this.width, this.headerHeight), t.fillStyle = this.dividerColor, t.fillRect(0, this.headerHeight - 1, this.width, 1), u = parseInt((0 - this.offsetX) / this.nameLineHeight), 0 > u && (u = 0), c = u + parseInt(this.width / (this.nameLineHeight - 1)), c > this.commits.length && (c = this.commits.length), t.save(), t.translate(this.offsetX, 0), o = null, a = null, s = r = h = u, f = c; f >= h ? f > r : r > f; s = f >= h ? ++r : --r) e = this.commits[s], l = this.months[e.date.getMonth()], l !== o && (t.font = "bold 12px 'Helvetica Neue', Arial, sans-serif", t.fillStyle = "#555", d = this.ctx.measureText(l).width, t.fillText(l, s * this.nameLineHeight - d / 2, this.headerHeight / 2 + 4), o = l), i = e.date.getDate(), i !== a && (t.font = "12px 'Helvetica Neue', Arial, sans-serif", t.fillStyle = "#555", n = this.ctx.measureText(i).width, t.fillText(i, s * this.nameLineHeight - n / 2, this.headerHeight + this.dateRowHeight / 2 + 3), a = i, t.fillStyle = "#ddd", t.fillRect(s * this.nameLineHeight, this.headerHeight, 1, 6));
				return t.restore()
			}, t.prototype.drawUsers = function(t) {
				var e, n, i, r, s, a, o;
				for (t.fillStyle = "#fff", t.fillRect(0, 0, this.namesWidth, this.height), t.save(), t.translate(0, this.headerHeight + this.dateRowHeight + this.offsetY), a = this.userBlocks, i = n = 0, r = a.length; r > n; i = ++n) e = a[i], t.fillStyle = this.userBgColors[i % 2], t.fillRect(0, e.start * this.nameLineHeight, this.namesWidth, e.count * this.nameLineHeight), this.activeUser && this.activeUser.name === e.name && (t.fillStyle = "rgba(0, 0, 0, 0.05)", t.fillRect(0, e.start * this.nameLineHeight, this.namesWidth, e.count * this.nameLineHeight)), s = (e.start + e.count / 2) * this.nameLineHeight + 3, t.fillStyle = "rgba(0, 0, 0, 0.1)", t.fillRect(0, e.start * this.nameLineHeight + e.count * this.nameLineHeight - 1, this.namesWidth, 1), t.fillStyle = "#333", t.font = "13px 'Helvetica Neue', Arial, sans-serif", t.textAlign = "center", t.fillText(e.name, this.namesWidth / 2, s, 96);
				return t.restore(), t.fillStyle = this.headerColor, t.fillRect(0, 0, this.namesWidth, this.headerHeight), t.fillStyle = "#777", t.font = "12px 'Helvetica Neue', Arial, sans-serif", t.fillText("Owners", 40, this.headerHeight / 2 + 3), o = 10, t.fillStyle = this.dividerColor, t.fillRect(this.namesWidth - 1, o, 1, this.headerHeight - 2 * o), t.fillStyle = this.dividerColor, t.fillRect(0, this.headerHeight - 1, this.namesWidth, 1), t.fillStyle = this.dividerColor, t.fillRect(this.namesWidth - 1, this.headerHeight, 1, this.height - this.headerHeight)
			}, t
		}(), s = function() {
			function t(t, e, n, i, r, s, a, o, c, u) {
				var l, d, h, f, m, p, g, v, $, b, j, y, w, x, k, C, S;
				for (this.network = t, this.ctx = e, this.width = n, this.height = i, this.focus = r, this.commits = s, this.users = a, this.spaceMap = o, this.userBlocks = c, this.nethash = u, this.namesWidth = 120, this.headerHeight = 40, this.dateRowHeight = 30, this.graphTopOffset = 10 + this.headerHeight + this.dateRowHeight, this.bgColors = ["#fff", "#f9f9f9"], this.nameLineHeight = 24, this.spaceColors = ["#c0392b", "#3498db", "#2ecc71", "#8e44ad", "#f1c40f", "#e67e22", "#34495e", "#e74c3c", "#2980b9", "#1abc9c", "#9b59b6", "#f39c12", "#7f8c8d", "#2c3e50", "#d35400", "#e74c3c", "#95a5a6", "#bdc3c7", "#16a085", "#27ae60"], this.offsetX = this.namesWidth + (this.width - this.namesWidth) / 2 - this.focus * this.nameLineHeight, this.offsetY = 0, this.bgCycle = 0, this.marginMap = {}, this.gravatars = {}, this.activeCommit = null, this.contentHeight = this.calcContentHeight(), this.graphMidpoint = this.namesWidth + (this.width - this.namesWidth) / 2, this.showRefs = !0, this.lastHotLoadCenterIndex = null, this.connectionMap = {}, this.spaceUserMap = {}, y = this.userBlocks, f = 0, g = y.length; g > f; f++)
					for (l = y[f], m = p = w = l.start, x = l.start + l.count; x >= w ? x > p : p > x; m = x >= w ? ++p : --p) this.spaceUserMap[m] = this.users[l.name];
				for (this.headsMap = {}, k = this.userBlocks, b = 0, v = k.length; v > b; b++)
					for (l = k[b], S = this.users[l.name], C = S.heads, j = 0, $ = C.length; $ > j; j++) d = C[j], this.headsMap[d.id] || (this.headsMap[d.id] = []), h = {
						name: S.name,
						head: d
					}, this.headsMap[d.id].push(h)
			}
			return t.prototype.moveX = function(t) {
				return this.offsetX += t, this.offsetX > this.graphMidpoint ? this.offsetX = this.graphMidpoint : this.offsetX < this.graphMidpoint - this.commits.length * this.nameLineHeight && (this.offsetX = this.graphMidpoint - this.commits.length * this.nameLineHeight), this.hotLoadCommits()
			}, t.prototype.moveY = function(t) {
				return this.offsetY += t, this.offsetY > 0 || this.contentHeight < this.height - this.graphTopOffset ? this.offsetY = 0 : this.offsetY < -this.contentHeight + this.height / 2 ? this.offsetY = -this.contentHeight + this.height / 2 : void 0
			}, t.prototype.toggleRefs = function() {
				return this.showRefs = !this.showRefs
			}, t.prototype.calcContentHeight = function() {
				var t, e, n, i, r;
				for (e = 0, r = this.userBlocks, n = 0, i = r.length; i > n; n++) t = r[n], e += t.count;
				return e * this.nameLineHeight
			}, t.prototype.hover = function(t, e) {
				var n, i, r, s, a, o, c, u;
				for (u = this.timeWindow(), r = i = s = u.min, a = u.max; a >= s ? a >= i : i >= a; r = a >= s ? ++i : --i)
					if (n = this.commits[r], o = this.offsetX + n.time * this.nameLineHeight, c = this.offsetY + this.graphTopOffset + n.space * this.nameLineHeight, t > o - 5 && o + 5 > t && e > c - 5 && c + 5 > e) return n;
				return null
			}, t.prototype.hotLoadCommits = function() {
				var t, e, n, i, r, s;
				return r = 200, e = parseInt((-this.offsetX + this.graphMidpoint) / this.nameLineHeight), 0 > e && (e = 0), e > this.commits.length - 1 && (e = this.commits.length - 1), this.lastHotLoadCenterIndex && Math.abs(this.lastHotLoadCenterIndex - e) < 10 ? void 0 : (this.lastHotLoadCenterIndex = e, t = this.backSpan(e, r), i = this.frontSpan(e, r), t || i ? (s = t ? t[0] : i[0], n = i ? i[1] : t[1], this.requestChunk(s, n)) : void 0)
			}, t.prototype.backSpan = function(t, e) {
				var n, i, r, s, a, o, c, u;
				for (s = null, i = n = c = t;
					(0 >= c ? 0 >= n : n >= 0) && i > t - e; i = 0 >= c ? ++n : --n)
					if (!this.commits[i].requested) {
						s = i;
						break
					}
				if (null !== s) {
					for (a = null, o = null, i = r = u = s;
						(0 >= u ? 0 >= r : r >= 0) && i > s - e; i = 0 >= u ? ++r : --r)
						if (this.commits[i].requested) {
							a = i;
							break
						}
					return a ? o = a + 1 : (o = s - e, 0 > o && (o = 0)), [o, s]
				}
				return null
			}, t.prototype.frontSpan = function(t, e) {
				var n, i, r, s, a, o, c, u, l, d;
				for (u = null, i = n = s = t, a = this.commits.length;
					(a >= s ? a > n : n > a) && t + e > i; i = a >= s ? ++n : --n)
					if (!this.commits[i].requested) {
						u = i;
						break
					}
				if (null !== u) {
					for (l = null, d = null, i = r = o = u, c = this.commits.length;
						(c >= o ? c > r : r > c) && u + e > i; i = c >= o ? ++r : --r)
						if (this.commits[i].requested) {
							l = i;
							break
						}
					return d = l ? l - 1 : u + e >= this.commits.length ? this.commits.length - 1 : u + e, [u, d]
				}
				return null
			}, t.prototype.chunkUrl = function() {
				return document.querySelector(".js-network-graph-container").getAttribute("data-network-graph-chunk-url")
			}, t.prototype.requestInitialChunk = function() {
				var t;
				if (a) return t = this.chunkUrl() + "?" + $.param({
					nethash: this.nethash
				}), $.fetchJSON(t).then(function(t) {
					return function(e) {
						return t.importChunk(e), t.draw(), t.network.chrome.draw()
					}
				}(this))
			}, t.prototype.requestChunk = function(t, e) {
				var n, i, r, s, o;
				if (a) {
					for (i = n = r = t, s = e; s >= r ? s >= n : n >= s; i = s >= r ? ++n : --n) this.commits[i].requested = new Date;
					return o = this.chunkUrl() + "?" + $.param({
						nethash: this.nethash,
						start: t,
						end: e
					}), $.fetchJSON(o).then(function(t) {
						return function(e) {
							return t.importChunk(e), t.draw(), t.network.chrome.draw(), t.lastHotLoadCenterIndex = t.focus
						}
					}(this))
				}
			}, t.prototype.importChunk = function(t) {
				var e, n, i, r, s, a, o, c, u;
				if (t.commits) {
					for (o = t.commits, c = [], i = 0, s = o.length; s > i; i++) e = o[i], u = this.spaceUserMap[e.space], n = this.commits[e.time], n.populate(e, u, this.commits), c.push(function() {
						var t, e, i, s;
						for (i = n.parents, s = [], t = 0, e = i.length; e > t; t++) a = i[t], s.push(function() {
							var t, e, i, s;
							for (s = [], r = t = e = a.time + 1, i = n.time; i >= e ? i > t : t > i; r = i >= e ? ++t : --t) this.connectionMap[r] = this.connectionMap[r] || [], s.push(this.connectionMap[r].push(n));
							return s
						}.call(this));
						return s
					}.call(this));
					return c
				}
			}, t.prototype.timeWindow = function() {
				var t, e;
				return e = parseInt((this.namesWidth - this.offsetX + this.nameLineHeight) / this.nameLineHeight), 0 > e && (e = 0), t = e + parseInt((this.width - this.namesWidth) / this.nameLineHeight), t > this.commits.length - 1 && (t = this.commits.length - 1), {
					min: e,
					max: t
				}
			}, t.prototype.draw = function() {
				var t, e, n, i, r, s, a, o, c, u, l, d, h, f, m, p, g, v, $, b, j, y, w, x, k, C, S, L, T, A, D, E, _, H, q, P;
				for (this.drawBackground(), P = this.timeWindow(), g = P.min, p = P.max, this.ctx.save(), this.ctx.translate(this.offsetX, this.offsetY + this.graphTopOffset), i = {}, x = this.spaceMap, o = a = 0, l = x.length; l > a; o = ++a)
					for (t = x[o], H = this.spaceMap.length - o - 1, c = u = k = g, C = p; C >= k ? C >= u : u >= C; c = C >= k ? ++u : --u) e = this.commits[c], e.populated && e.space === H && (this.drawConnection(e), i[e.id] = !0);
				for (o = m = S = g, L = p; L >= S ? L >= m : m >= L; o = L >= S ? ++m : --m)
					if (n = this.connectionMap[o])
						for (v = 0, d = n.length; d > v; v++) e = n[v], i[e.id] || (this.drawConnection(e), i[e.id] = !0);
				for (T = this.spaceMap, o = b = 0, h = T.length; h > b; o = ++b)
					for (t = T[o], H = this.spaceMap.length - o - 1, c = y = A = g, D = p; D >= A ? D >= y : y >= D; c = D >= A ? ++y : --y) e = this.commits[c], e.populated && e.space === H && (e === this.activeCommit ? this.drawActiveCommit(e) : this.drawCommit(e));
				if (this.showRefs)
					for (c = w = E = g, _ = p; _ >= E ? _ >= w : w >= _; c = _ >= E ? ++w : --w)
						if (e = this.commits[c], e.populated && (s = this.headsMap[e.id]))
							for (j = 0, q = 0, f = s.length; f > q; q++) r = s[q], this.spaceUserMap[e.space].name === r.name && ($ = this.drawHead(e, r.head, j), j += $);
				return this.ctx.restore(), this.activeCommit ? this.drawCommitInfo(this.activeCommit) : void 0
			}, t.prototype.drawBackground = function() {
				var t, e, n, i, r;
				for (this.ctx.clearRect(0, 0, this.width, this.height), this.ctx.save(), this.ctx.translate(0, this.offsetY + this.graphTopOffset), this.ctx.clearRect(0, -10, this.width, this.height), r = this.userBlocks, n = e = 0, i = r.length; i > e; n = ++e) t = r[n], this.ctx.fillStyle = this.bgColors[n % 2], this.ctx.fillRect(0, t.start * this.nameLineHeight - 10, this.width, t.count * this.nameLineHeight), this.ctx.fillStyle = "#DDDDDD", this.ctx.fillRect(0, (t.start + t.count) * this.nameLineHeight - 11, this.width, 1);
				return this.ctx.restore()
			}, t.prototype.drawCommit = function(t) {
				var e, n;
				return e = t.time * this.nameLineHeight, n = t.space * this.nameLineHeight, this.ctx.beginPath(), this.ctx.arc(e, n, 3, 0, 2 * Math.PI, !1), this.ctx.fillStyle = this.spaceColor(t.space), this.ctx.fill()
			}, t.prototype.drawActiveCommit = function(t) {
				var e, n;
				return e = t.time * this.nameLineHeight, n = t.space * this.nameLineHeight, this.ctx.beginPath(), this.ctx.arc(e, n, 6, 0, 2 * Math.PI, !1), this.ctx.fillStyle = this.spaceColor(t.space), this.ctx.fill()
			}, t.prototype.drawCommitInfo = function(t) {
				var e, n, i, r, s, a, o, c, u, l;
				return e = 3, n = 340, l = 56, u = t.message ? this.splitLines(t.message, 48) : [], a = Math.max(l, 38 + 16 * u.length), i = this.offsetX + t.time * this.nameLineHeight, r = this.graphTopOffset + this.offsetY + t.space * this.nameLineHeight, o = 0, c = 0, o = i < this.graphMidpoint ? i + 10 : i - (n + 10), c = r < 40 + (this.height - 40) / 2 ? r + 10 : r - a - 10, this.ctx.save(), this.ctx.translate(o, c), this.ctx.fillStyle = "#fff", this.ctx.strokeStyle = "rgba(0, 0, 0, 0.2)", this.ctx.lineWidth = 1, this.roundRect(0, 0, n, a, e), s = this.gravatars[t.gravatar], s ? this.drawGravatar(s, 10, 10) : (s = new Image, s.src = t.gravatar, s.onload = function(e) {
					return function() {
						return e.activeCommit === t ? (e.drawGravatar(s, o + 10, c + 10), e.gravatars[t.gravatar] = s) : void 0
					}
				}(this)), this.ctx.fillStyle = "#000", this.ctx.font = "bold 12px 'Helvetica Neue', Arial, sans-serif", this.ctx.fillText(t.author, 55, 24), this.ctx.fillStyle = "#bbb", this.ctx.font = "11px Consolas, Menlo, Courier, monospace", this.ctx.fillText(t.id.slice(0, 7), 280, 24), this.drawMessage(u, 55, 41), this.ctx.restore()
			}, t.prototype.drawGravatar = function(t, e, n) {
				var i;
				return i = 32, this.ctx.save(), this.ctx.fillStyle = "#fff", this.ctx.strokeStyle = "rgba(0, 0, 0, 0.0)", this.ctx.lineWidth = .1, this.roundRect(e + 2, n + 2, i, i, 4), this.ctx.clip(), this.ctx.drawImage(t, e + 2, n + 2, i, i), this.ctx.restore()
			}, t.prototype.roundRect = function(t, e, n, i, r) {
				return this.ctx.beginPath(), this.ctx.moveTo(t, e + r), this.ctx.lineTo(t, e + i - r), this.ctx.quadraticCurveTo(t, e + i, t + r, e + i), this.ctx.lineTo(t + n - r, e + i), this.ctx.quadraticCurveTo(t + n, e + i, t + n, e + i - r), this.ctx.lineTo(t + n, e + r), this.ctx.quadraticCurveTo(t + n, e, t + n - r, e), this.ctx.lineTo(t + r, e), this.ctx.quadraticCurveTo(t, e, t, e + r), this.ctx.fill(), this.ctx.stroke()
			}, t.prototype.drawMessage = function(t, e, n) {
				var i, r, s, a, o;
				for (this.ctx.font = "12px 'Helvetica Neue', Arial, sans-serif", this.ctx.fillStyle = "#000000", o = [], r = i = 0, s = t.length; s > i; r = ++i) a = t[r], o.push(this.ctx.fillText(a, e, n + 16 * r));
				return o
			}, t.prototype.splitLines = function(t, e) {
				var n, i, r, s, a, o;
				for (o = t.split(" "), s = [], r = "", n = 0, i = o.length; i > n; n++) a = o[n], r.length + 1 + a.length < e ? r = "" === r ? a : r + " " + a : (s.push(r), r = a);
				return s.push(r), s
			}, t.prototype.drawHead = function(t, e, n) {
				var i, r, s, a;
				return this.ctx.font = "11px 'Helvetica Neue', Arial, sans-serif", this.ctx.save(), i = this.ctx.measureText(e.name).width, this.ctx.restore(), s = t.time * this.nameLineHeight, a = t.space * this.nameLineHeight + 5 + n, r = 2.5, this.ctx.save(), this.ctx.translate(s, a - r), this.ctx.fillStyle = "rgba(0, 0, 0, 0.8)", this.ctx.beginPath(), this.ctx.moveTo(0, r), this.ctx.lineTo(-4, 10), this.ctx.quadraticCurveTo(-9, 10, -9, 15), this.ctx.lineTo(-9, 15 + i), this.ctx.quadraticCurveTo(-9, 15 + i + 5, -4, 15 + i + 5), this.ctx.lineTo(4, 15 + i + 5), this.ctx.quadraticCurveTo(9, 15 + i + 5, 9, 15 + i), this.ctx.lineTo(9, 15), this.ctx.quadraticCurveTo(9, 10, 4, 10), this.ctx.lineTo(0, r), this.ctx.fill(), this.ctx.fillStyle = "#fff", this.ctx.font = "12px 'Helvetica Neue', Arial, sans-serif", this.ctx.textBaseline = "middle", this.ctx.scale(.85, .85), this.ctx.rotate(Math.PI / 2), this.ctx.fillText(e.name, 19, -.5), this.ctx.restore(), i + this.nameLineHeight
			}, t.prototype.drawConnection = function(t) {
				var e, n, i, r, s, a;
				for (s = t.parents, a = [], n = e = 0, i = s.length; i > e; n = ++e) r = s[n], a.push(0 === n ? r.space === t.space ? this.drawBasicConnection(r, t) : this.drawBranchConnection(r, t) : this.drawMergeConnection(r, t));
				return a
			}, t.prototype.drawBasicConnection = function(t, e) {
				var n;
				return n = this.spaceColor(e.space), this.ctx.strokeStyle = n, this.ctx.lineWidth = 2, this.ctx.beginPath(), this.ctx.moveTo(t.time * this.nameLineHeight, e.space * this.nameLineHeight), this.ctx.lineTo(e.time * this.nameLineHeight, e.space * this.nameLineHeight), this.ctx.stroke()
			}, t.prototype.drawBranchConnection = function(t, e) {
				var n;
				return n = this.spaceColor(e.space), this.ctx.strokeStyle = n, this.ctx.lineWidth = 2, this.ctx.beginPath(), this.ctx.moveTo(t.time * this.nameLineHeight, t.space * this.nameLineHeight), this.ctx.lineTo(t.time * this.nameLineHeight, e.space * this.nameLineHeight), this.ctx.lineTo(e.time * this.nameLineHeight - 10, e.space * this.nameLineHeight), this.ctx.stroke(), this.threeClockArrow(n, e.time * this.nameLineHeight, e.space * this.nameLineHeight)
			}, t.prototype.drawMergeConnection = function(t, e) {
				var n, i, r;
				return n = this.spaceColor(t.space), this.ctx.strokeStyle = n, this.ctx.lineWidth = 2, this.ctx.beginPath(), t.space > e.space ? (this.ctx.moveTo(t.time * this.nameLineHeight, t.space * this.nameLineHeight), r = this.safePath(t.time, e.time, t.space), r ? (this.ctx.lineTo(e.time * this.nameLineHeight - 10, t.space * this.nameLineHeight), this.ctx.lineTo(e.time * this.nameLineHeight - 10, e.space * this.nameLineHeight + 15), this.ctx.lineTo(e.time * this.nameLineHeight - 5.7, e.space * this.nameLineHeight + 7.5), this.ctx.stroke(), this.oneClockArrow(n, e.time * this.nameLineHeight, e.space * this.nameLineHeight)) : (i = this.closestMargin(t.time, e.time, t.space, -1), t.space === e.space + 1 && t.space === i + 1 ? (this.ctx.lineTo(t.time * this.nameLineHeight, i * this.nameLineHeight + 10), this.ctx.lineTo(e.time * this.nameLineHeight - 15, i * this.nameLineHeight + 10), this.ctx.lineTo(e.time * this.nameLineHeight - 9.5, i * this.nameLineHeight + 7.7), this.ctx.stroke(), this.twoClockArrow(n, e.time * this.nameLineHeight, i * this.nameLineHeight), this.addMargin(t.time, e.time, i)) : t.time + 1 === e.time ? (i = this.closestMargin(t.time, e.time, e.space, 0), this.ctx.lineTo(t.time * this.nameLineHeight, i * this.nameLineHeight + 10), this.ctx.lineTo(e.time * this.nameLineHeight - 15, i * this.nameLineHeight + 10), this.ctx.lineTo(e.time * this.nameLineHeight - 15, e.space * this.nameLineHeight + 10), this.ctx.lineTo(e.time * this.nameLineHeight - 9.5, e.space * this.nameLineHeight + 7.7), this.ctx.stroke(), this.twoClockArrow(n, e.time * this.nameLineHeight, e.space * this.nameLineHeight), this.addMargin(t.time, e.time, i)) : (this.ctx.lineTo(t.time * this.nameLineHeight + 10, t.space * this.nameLineHeight - 10), this.ctx.lineTo(t.time * this.nameLineHeight + 10, i * this.nameLineHeight + 10), this.ctx.lineTo(e.time * this.nameLineHeight - 10, i * this.nameLineHeight + 10), this.ctx.lineTo(e.time * this.nameLineHeight - 10, e.space * this.nameLineHeight + 15), this.ctx.lineTo(e.time * this.nameLineHeight - 5.7, e.space * this.nameLineHeight + 7.5), this.ctx.stroke(), this.oneClockArrow(n, e.time * this.nameLineHeight, e.space * this.nameLineHeight), this.addMargin(t.time, e.time, i)))) : (i = this.closestMargin(t.time, e.time, e.space, -1), i < e.space ? (this.ctx.moveTo(t.time * this.nameLineHeight, t.space * this.nameLineHeight), this.ctx.lineTo(t.time * this.nameLineHeight, i * this.nameLineHeight + 10), this.ctx.lineTo(e.time * this.nameLineHeight - 12.7, i * this.nameLineHeight + 10), this.ctx.lineTo(e.time * this.nameLineHeight - 12.7, e.space * this.nameLineHeight - 10), this.ctx.lineTo(e.time * this.nameLineHeight - 9.4, e.space * this.nameLineHeight - 7.7), this.ctx.stroke(), this.fourClockArrow(n, e.time * this.nameLineHeight, e.space * this.nameLineHeight), this.addMargin(t.time, e.time, i)) : (this.ctx.moveTo(t.time * this.nameLineHeight, t.space * this.nameLineHeight), this.ctx.lineTo(t.time * this.nameLineHeight, i * this.nameLineHeight + 10), this.ctx.lineTo(e.time * this.nameLineHeight - 12.7, i * this.nameLineHeight + 10), this.ctx.lineTo(e.time * this.nameLineHeight - 12.7, e.space * this.nameLineHeight + 10), this.ctx.lineTo(e.time * this.nameLineHeight - 9.4, e.space * this.nameLineHeight + 7.7), this.ctx.stroke(), this.twoClockArrow(n, e.time * this.nameLineHeight, e.space * this.nameLineHeight), this.addMargin(t.time, e.time, i)))
			}, t.prototype.addMargin = function(t, e, n) {
				return this.marginMap[n] || (this.marginMap[n] = []), this.marginMap[n].push([t, e])
			}, t.prototype.oneClockArrow = function(t, e, n) {
				return this.ctx.fillStyle = t, this.ctx.beginPath(), this.ctx.moveTo(e - 3, n + 10.5), this.ctx.lineTo(e - 9, n + 5.5), this.ctx.lineTo(e - 2.6, n + 3.5), this.ctx.fill()
			}, t.prototype.twoClockArrow = function(t, e, n) {
				return this.ctx.fillStyle = t, this.ctx.beginPath(), this.ctx.moveTo(e - 12.4, n + 6.6), this.ctx.lineTo(e - 9.3, n + 10.6), this.ctx.lineTo(e - 3.2, n + 2.4), this.ctx.fill()
			}, t.prototype.threeClockArrow = function(t, e, n) {
				return this.ctx.fillStyle = t, this.ctx.beginPath(), this.ctx.moveTo(e - 10, n - 3.5), this.ctx.lineTo(e - 10, n + 3.5), this.ctx.lineTo(e - 4, n), this.ctx.fill()
			}, t.prototype.fourClockArrow = function(t, e, n) {
				return this.ctx.fillStyle = t, this.ctx.beginPath(), this.ctx.moveTo(e - 12.4, n - 6.6), this.ctx.lineTo(e - 9.3, n - 10.6), this.ctx.lineTo(e - 3.2, n - 2.4), this.ctx.fill()
			}, t.prototype.safePath = function(t, e, n) {
				var i, r, s, a;
				for (a = this.spaceMap[n], i = 0, r = a.length; r > i; i++)
					if (s = a[i], this.timeInPath(t, s)) return s[1] === e;
				return !1
			}, t.prototype.closestMargin = function(t, e, n, i) {
				var r, s, a, o, c;
				for (o = this.spaceMap.length, a = i, s = !1, r = !1, c = !1; !r || !s;) {
					if (n + a >= 0 && this.safeMargin(t, e, n + a)) return n + a;
					0 > n + a && (s = !0), n + a > o && (r = !0), c === !1 && 0 === a ? (a = -1, c = !0) : a = 0 > a ? -a - 1 : -a - 2
				}
				return n > 0 ? n - 1 : 0
			}, t.prototype.safeMargin = function(t, e, n) {
				var i, r, s, a;
				if (!this.marginMap[n]) return !0;
				for (a = this.marginMap[n], i = 0, r = a.length; r > i; i++)
					if (s = a[i], this.pathsCollide([t, e], s)) return !1;
				return !0
			}, t.prototype.pathsCollide = function(t, e) {
				return this.timeWithinPath(t[0], e) || this.timeWithinPath(t[1], e) || this.timeWithinPath(e[0], t) || this.timeWithinPath(e[1], t)
			}, t.prototype.timeInPath = function(t, e) {
				return t >= e[0] && t <= e[1]
			}, t.prototype.timeWithinPath = function(t, e) {
				return t > e[0] && t < e[1]
			}, t.prototype.spaceColor = function(t) {
				return 0 === t ? "#000000" : this.spaceColors[t % this.spaceColors.length]
			}, t
		}(), n = function() {
			function t(t, e, n) {
				this.chrome = e, this.graph = n, this.out = o(this.out, this), this.move = o(this.move, this), this.docmove = o(this.docmove, this), this.down = o(this.down, this), this.up = o(this.up, this), this.dragging = !1, this.lastPoint = {
					x: 0,
					y: 0
				}, this.lastHoverCommit = null, this.lastHoverUser = null, this.pressedCommit = null, this.pressedUser = null, this.canvas = t.getElementsByTagName("canvas")[0], this.canvasOffset = $(this.canvas).offset(), this.canvas.style.cursor = "move", document.body.addEventListener("mouseup", this.up), document.body.addEventListener("mousemove", this.docmove), this.canvas.addEventListener("mousedown", this.down), this.canvas.addEventListener("mousemove", this.move), this.canvas.addEventListener("mouseout", this.out)
			}
			return t.prototype.up = function() {
				return this.dragging = !1, this.pressedCommit && this.graph.activeCommit === this.pressedCommit ? window.open("/" + this.graph.activeCommit.user.name + "/" + this.graph.activeCommit.user.repo + "/commit/" + this.graph.activeCommit.id) : this.pressedUser && this.chrome.activeUser === this.pressedUser && (window.location = "/" + this.chrome.activeUser.name + "/" + this.chrome.activeUser.repo + "/network"), this.pressedCommit = null, this.pressedUser = null
			}, t.prototype.down = function() {
				return this.graph.activeCommit ? this.pressedCommit = this.graph.activeCommit : this.chrome.activeUser ? this.pressedUser = this.chrome.activeUser : this.dragging = !0
			}, t.prototype.docmove = function(t) {
				var e, n;
				return e = t.pageX, n = t.pageY, this.dragging && (this.graph.moveX(e - this.lastPoint.x), this.graph.moveY(n - this.lastPoint.y), this.graph.draw(), this.chrome.moveX(e - this.lastPoint.x), this.chrome.moveY(n - this.lastPoint.y), this.chrome.draw()), this.lastPoint.x = e, this.lastPoint.y = n
			}, t.prototype.move = function(t) {
				var e, n, i, r;
				return i = t.pageX, r = t.pageY, this.dragging ? (this.graph.moveX(i - this.lastPoint.x), this.graph.moveY(r - this.lastPoint.y), this.graph.draw(), this.chrome.moveX(i - this.lastPoint.x), this.chrome.moveY(r - this.lastPoint.y), this.chrome.draw()) : (n = this.chrome.hover(i - this.canvasOffset.left, r - this.canvasOffset.top), n !== this.lastHoverUser ? (this.canvas.style.cursor = n ? "pointer" : "move", this.chrome.activeUser = n, this.chrome.draw(), this.lastHoverUser = n) : (e = this.graph.hover(i - this.canvasOffset.left, r - this.canvasOffset.top), e !== this.lastHoverCommit && (this.canvas.style.cursor = e ? "pointer" : "move", this.graph.activeCommit = e, this.graph.draw(), this.chrome.draw(), this.lastHoverCommit = e))), this.lastPoint.x = i, this.lastPoint.y = r
			}, t.prototype.out = function() {
				return this.graph.activeCommit = null, this.chrome.activeUser = null, this.graph.draw(), this.chrome.draw(), this.lastHoverCommit = null, this.lastHoverUser = null
			}, t
		}(), e = function() {
			function t(t, e) {
				this.chrome = t, this.graph = e, this.down = o(this.down, this), this.dirty = !1, document.addEventListener("keydown", this.down)
			}
			return t.prototype.moveBothX = function(t) {
				return this.graph.moveX(t), this.chrome.moveX(t), this.graph.activeCommit = null, this.dirty = !0
			}, t.prototype.moveBothY = function(t) {
				return this.graph.moveY(t), this.chrome.moveY(t), this.graph.activeCommit = null, this.dirty = !0
			}, t.prototype.toggleRefs = function() {
				return this.graph.toggleRefs(), this.dirty = !0
			}, t.prototype.redraw = function() {
				return this.dirty && (this.graph.draw(), this.chrome.draw()), this.dirty = !1
			}, t.prototype.down = function(t) {
				if ($(t.target).is("input")) return !0;
				if (t.shiftKey) switch (t.which) {
					case 37:
					case 72:
						return this.moveBothX(999999), this.redraw();
					case 38:
					case 75:
						return this.moveBothY(999999), this.redraw();
					case 39:
					case 76:
						return this.moveBothX(-999999), this.redraw();
					case 40:
					case 74:
						return this.moveBothY(-999999), this.redraw()
				} else switch (t.which) {
					case 37:
					case 72:
						return this.moveBothX(100), this.redraw();
					case 38:
					case 75:
						return this.moveBothY(30), this.redraw();
					case 39:
					case 76:
						return this.moveBothX(-100), this.redraw();
					case 40:
					case 74:
						return this.moveBothY(-30), this.redraw();
					case 84:
						return this.toggleRefs(), this.redraw()
				}
			}, t
		}(), a = !1, $.observe(".js-network-graph-container", {
			add: function() {
				return a = !0, new i(this, 920, 600)
			},
			remove: function() {
				return a = !1
			}
		})
	}.call(this),
	function() {
		$(document).on("graph:load", ".js-pulse-authors-graph", function(t, e) {
			var n, i, r, s, a, o, c, u, l, d;
			return n = 15, e = e.slice(0, +(n - 1) + 1 || 9e9), s = {
				top: 20,
				right: 0,
				bottom: 30,
				left: 20
			}, c = $(this).width() - s.left - s.right, r = $(this).height() - s.top - s.bottom, u = d3.scale.ordinal().domain(d3.range(n)).rangeRoundBands([0, c], .2), l = d3.scale.linear().domain([0, d3.max(e, function(t) {
				return t.commits
			})]).range([r, 0]), d = d3.svg.axis().scale(l).orient("left").ticks(3).tickSize(-c).tickFormat(function(t) {
				return 1e3 > t ? t : d3.format(",s")(t)
			}), a = d3.tip().attr("class", "svg-tip").offset([-10, 0]).html(function(t) {
				var e;
				return "<strong>" + t.commits + "</strong> " + $.pluralize(t.commits, "commit") + " by <strong>" + (null != (e = t.login) ? e : t.name) + "</strong>"
			}), o = d3.select(this).append("svg").attr("width", c + s.left + s.right).attr("height", r + s.top + s.bottom).append("g").attr("transform", "translate(" + s.left + ", " + s.top + ")").call(a), o.append("g").attr("class", "y axis").call(d), i = o.selectAll(".bar").data(e).enter().append("g").attr("class", "bar").attr("transform", function(t, e) {
				return "translate(" + u(e) + ", 0)"
			}), i.append("rect").attr("width", u.rangeBand()).attr("height", function(t) {
				return r - l(t.commits)
			}).attr("y", function(t) {
				return l(t.commits)
			}).on("mouseover", a.show).on("mouseout", a.hide), i.append("a").attr("xlink:href", function(t) {
				return null != t.login ? "/" + t.login : void 0
			}).append("image").attr("y", r + 5).attr("xlink:href", function(t) {
				return t.gravatar
			}).attr("width", u.rangeBand()).attr("height", u.rangeBand())
		})
	}.call(this),
	function() {
		$(document).on("graph:load", ".js-graph-punchcard", function(t, e) {
			var n, i, r, s, a, o, c, u, l, d, h, f, m, p, g, v, b, j, y, w, x;
			return a = 500, y = $(this).width(), d = {}, e.forEach(function(t) {
				var e, n, i;
				return i = d3.weekdays[t[0]], e = null != d[i] ? d[i] : d[i] = [], n = t[1], null == e[n] && (e[n] = 0), e[n] += t[2]
			}), e = d3.entries(d).reverse(), v = [0, 0, 0, 20], p = v[0], f = v[1], m = v[2], h = v[3], c = 100, i = d3.range(7), o = d3.range(24), l = d3.min(e, function(t) {
				return d3.min(t.value)
			}), u = d3.max(e, function(t) {
				return d3.max(t.value)
			}), w = d3.scale.ordinal().domain(o).rangeRoundBands([0, y - c - f - m], .1), x = d3.scale.ordinal().domain(i).rangeRoundBands([a - p - h, 0], .1), g = d3.scale.sqrt().domain([0, u]).range([0, w.rangeBand() / 2]), b = d3.tip().attr("class", "svg-tip").offset([-10, 0]).html(function(t) {
				return "<strong>" + t + "</strong> " + $.pluralize(t, "commit")
			}), j = d3.select(this).data(e).attr("width", y + "px").append("svg").attr("width", y + (f + m)).attr("height", a + p + h).attr("class", "viz").append("g").attr("transform", "translate(" + f + "," + p + ")").call(b), r = j.selectAll("g.day").data(e).enter().append("g").attr("class", "day").attr("transform", function(t, e) {
				return "translate(0, " + x(e) + ")"
			}), r.append("line").attr("x1", 0).attr("y1", x.rangeBand()).attr("x2", y - f - m).attr("y2", x.rangeBand()).attr("class", "axis"), r.append("text").attr("class", "day-name").text(function(t) {
				return t.key
			}).attr("dy", x.rangeBand() / 2), j.append("g").selectAll("text.hour").data(o).enter().append("text").attr("text-anchor", "middle").attr("transform", function(t, e) {
				return "translate(" + (w(e) + c) + ", " + a + ")"
			}).attr("class", "label").text(function(t) {
				var e;
				return e = t % 12 || 12, 0 === t || 12 > t ? e + "a" : e + "p"
			}), s = r.selectAll(".hour").data(function(t) {
				return t.value
			}).enter().append("g").attr("class", "hour").attr("transform", function(t, e) {
				return "translate(" + (w(e) + c) + ", 0)"
			}).attr("width", w.rangeBand()), s.append("line").attr("x1", 0).attr("y1", function(t, e) {
				return x.rangeBand() - (e % 2 === 0 ? 15 : 10)
			}).attr("x2", 0).attr("y2", x.rangeBand()).attr("class", function(t, e) {
				return e % 2 === 0 ? "axis even" : "axis odd"
			}), n = s.append("circle").attr("r", 0).attr("cy", x.rangeBand() / 2 - 5).attr("class", function() {
				return "day"
			}).on("mouseover", b.show).on("mouseout", b.hide), n.transition().attr("r", g)
		})
	}.call(this),
	function() {
		var t, e, n, i, r, s;
		i = function(t) {
			var e;
			return (e = d3.format(","))(t)
		}, n = {
			top: 20,
			right: 80,
			bottom: 30,
			left: 40
		}, s = 960 - n.left - n.right, e = 150 - n.top - n.bottom, t = function(t, e) {
			var n;
			return n = d3.time.format.utc("%A, %B %-d, %Y"), d3.tip().attr("class", "svg-tip web-views comparison").offset([-10, 0]).html(function(r) {
				return "<span class='title'>" + n(r.date) + "</span> <ul class='web-views'> <li class='totals'><strong>" + i(r.total) + "</strong> " + t + "</li> <li class='uniques'><strong>" + i(r.unique) + "</strong> " + e + "</li> </ul>"
			})
		}, r = function(t, r, a) {
			var o, c, u, l, d, h, f, m, p, g, v, b, j, y, w, x, k, C, S, L, T, A, D, E, _, H;
			if (r && null == r.error) {
				for (A = d3.time.scale.utc().range([0, s]), E = d3.scale.linear().range([e, 0]), _ = d3.scale.linear().range([e, 0]), b = d3.time.format.utc("%m/%d"), D = d3.svg.axis().scale(A).tickSize(e + 5).tickPadding(10).tickFormat(b).orient("bottom"), H = d3.svg.axis().scale(E).ticks(3).tickFormat(d3.formatSymbol).orient("left"), m = d3.svg.line().x(function(t) {
					return A(t.key)
				}).y(function(t) {
					return E(t.value)
				}), S = d3.select(this).select(".js-graph").append("svg").attr("width", s + n.left + n.right).attr("height", e + n.top + n.bottom).attr("class", "vis").append("g").attr("transform", "translate(" + n.left + "," + n.top + ")").call(a), c = r.counts, c.forEach(function(t) {
					return t.date = new Date(1e3 * t.bucket)
				}), c.sort(function(t, e) {
					return d3.ascending(t.date, e.date)
				}), c = c.slice(-14), o = d3.bisector(function(t) {
					return t.date
				}).left, j = function() {
					var t, e, n, i, r, s;
					return s = A.invert(d3.mouse(this)[0]), r = o(c, s, 1), e = c[r - 1], n = c[r], e && n ? (t = s - e.date > n.date - s ? n : e, i = S.selectAll("g.dots circle").filter(function(e) {
						return e.key === t.date
					}), i = i[0], i.sort(function(t, e) {
						return $(t).attr("cy") - $(e).attr("cy")
					}), a.show.call(this, t, i[0])) : void 0
				}, w = [], C = [], h = 0, f = c.length; f > h; h++) d = c[h], w.push({
					key: d.date,
					value: d.total
				}), C.push({
					key: d.date,
					value: d.unique
				});
				return v = [w, C], p = d3.extent(c, function(t) {
					return t.date
				}), y = p[0], l = p[1], g = d3.extent(w, function(t) {
					return t.value
				}), T = g[0], L = g[1], x = d3.max(C, function(t) {
					return t.value
				}), k = x + d3.median(C, function(t) {
					return t.value
				}), A.domain([y, l]), E.domain([0, L]), _.domain([0, k]), $(this).find(".js-traffic-total").text(i(r.summary.total)), $(this).find(".js-traffic-uniques").text(i(r.summary.unique)), S.append("g").attr("class", "x axis").call(D), S.append("g").attr("class", "y axis views").call(H), S.selectAll("path.path").data(v).enter().append("path").attr("class", function(t, e) {
					return "path " + (0 === e ? "total" : "unique")
				}).attr("d", function(t, e) {
					return 0 === e ? m(t) : m.y(function(t) {
						return _(t.value)
					})(t)
				}), u = S.selectAll("g.dots").data(v).enter().append("g").attr("class", function(t, e) {
					return 0 === e ? "dots totals" : "dots uniques"
				}), u.each(function(t, e) {
					var n;
					return n = d3.select(this), 1 === e && (E = _), n.selectAll("circle").data(function(t) {
						return t
					}).enter().append("circle").attr("cx", function(t) {
						return A(t.key)
					}).attr("cy", function(t) {
						return E(t.value)
					}).attr("r", 4)
				}), H.scale(_).orient("right"), S.append("g").attr("class", "y axis unique").attr("transform", "translate(" + s + ", 0)").call(H), S.append("rect").attr("class", "overlay").attr("width", s).attr("height", e).on("mousemove", j).on("mouseout", function() {
					return setTimeout(a.hide, 500)
				})
			}
		}, $(document).on("graph:load", "#js-visitors-graph", function(e, n) {
			var i;
			return i = t("views", "unique visitors"), $.observe("#js-visitors-graph .js-graph", {
				remove: i.hide
			}), r.apply(this, [e, n, i])
		}), $(document).on("graph:load", "#js-clones-graph", function(e, n) {
			var i;
			return i = t("clones", "unique cloners"), $.observe("#js-clones-graph .js-graph", {
				remove: i.hide
			}), r.apply(this, [e, n, i])
		})
	}.call(this),
	function() {
		$(document).on("click", ".js-skip-to-content", function() {
			return $("#start-of-content").next().attr("tabindex", "-1").focus()
		})
	}.call(this),
	function() {
		$(document).on("submit", ".js-mobile-preference-form", function() {
			var t;
			return t = $(this).find(".js-mobile-preference-anchor-field"), t.val(window.location.hash.substr(1)), !0
		})
	}.call(this),
	function() {
		var t, e;
		$(document).on("click", ".js-org-billing-plans .js-choose-plan", function() {
			return t($(this).closest(".js-plan-row")), !1
		}), t = function(t) {
			var n, i, r, s;
			return r = t.attr("data-name"), i = parseInt(t.attr("data-cost"), 10), n = parseInt(null != (s = t.attr("data-balance")) ? s : "0", 10), $(".js-org-billing-plans").find(".js-plan-row, .js-choose-plan").removeClass("selected"), t.find(".js-choose-plan").addClass("selected"), t.addClass("selected"), $(".js-plan").val(r), 0 === i && 0 === n ? $(".js-billing-section").addClass("has-removed-contents") : ($(".js-billing-section").removeClass("has-removed-contents"), null != t.attr("data-balance") ? e(r) : void 0)
		}, e = function(t) {
			return $(".js-plan-change-message").addClass("is-hidden"), $('.js-plan-change-message[data-name="' + t + '"]').removeClass("is-hidden")
		}, $(function() {
			return $(".selected .js-choose-plan").click()
		})
	}.call(this),
	function() {
		var t, e;
		t = function() {
			var t, n, i, r, s, a;
			return s = [], n = $(".js-advanced-search-input").val(), a = {
				Repositories: 0,
				Users: 0,
				Code: 0
			}, t = $("input[type=text].js-advanced-search-prefix, select.js-advanced-search-prefix"), s = e(t, function(t, e, n) {
				return "" === t ? "" : ("" !== e && a[n] ++, "" !== e ? "" + t + e : void 0)
			}), $.merge(s, e($("input[type=checkbox].js-advanced-search-prefix"), function(t, e, n) {
				var i;
				return i = $(this).prop("checked"), i !== !1 && a[n] ++, i !== !1 ? "" + t + i : void 0
			})), i = function(t) {
				return t.Users > t.Code && t.Users > t.Repositories ? "Users" : t.Code > t.Users && t.Code > t.Repositories ? "Code" : "Repositories"
			}, r = $.trim(s.join(" ")), $(".js-type-value").val(i(a)), $(".js-search-query").val($.trim(n + " " + r)), $(".js-advanced-query").empty(), $(".js-advanced-query").text("" + r), $(".js-advanced-query").prepend($("<span>").text($.trim(n)), " ")
		}, e = function(t, e) {
			return $.map(t, function(t) {
				var n, i, r, s;
				return r = $.trim($(t).val()), n = $(t).attr("data-search-prefix"), i = $(t).attr("data-search-type"), s = function(t) {
					return -1 !== t.search(/\s/g) ? '"' + t + '"' : t
				}, "" === n ? e.call(t, n, r, i) : -1 !== r.search(/\,/g) && "location" !== n ? r.split(/\,/).map(function(r) {
					return e.call(t, n, s($.trim(r)), i)
				}) : e.call(t, n, s(r), i)
			})
		}, $(document).onFocusedInput(".js-advanced-search-prefix", function() {
			return function() {
				return t()
			}
		}), $(document).on("change", ".js-advanced-search-prefix", t), $(document).on("focusin", ".js-advanced-search-input", function() {
			return $(this).closest(".js-advanced-search-label").addClass("focus")
		}), $(document).on("focusout", ".js-advanced-search-input", function() {
			return $(this).closest(".js-advanced-search-label").removeClass("focus")
		}), $(document).on("click", ".js-see-all-search-cheatsheet", function() {
			return $(".js-more-cheatsheet-info").removeClass("hidden"), !1
		}), $(function() {
			return $(".js-advanced-search-input").length ? t() : void 0
		})
	}.call(this),
	function() {
		var t, e, n, i, r, s, a, o, c;
		o = null, s = 300, a = [".", ".", "."], r = 0, e = function() {
			return $(".js-audit-log-export-button").removeClass("disabled")
		}, t = function() {
			return $(".js-audit-log-export-button").addClass("disabled")
		}, i = function() {
			var e, n;
			return e = $(".js-audit-log-export-status"), e.data("oldText", e.text()), n = function() {
				var t;
				return t = a.slice(0, r).join(""), e.text("Exporting" + t), r >= 3 ? r = 0 : r += 1
			}, o = setInterval(n, s), t()
		}, c = function() {
			var t;
			return e(), t = $(".js-audit-log-export-status"), t.text(t.data("oldText")), clearInterval(o), r = 0
		}, n = function() {
			return c(), $("#ajax-error-message").show(function() {
				return this.classList.add("visible")
			})
		}, $(document).on("ajaxBeforeSend", ".js-audit-log-export", i), $(document).on("ajaxError", ".js-audit-log-export", n), $(document).on("ajaxSuccess", ".js-audit-log-export", function(t, e, i, r) {
			var s, a;
			return a = this, s = function() {
				return c(), window.location = r.export_url
			}, $.fetchPoll(r.job_url).then(s, n)
		}), $(document).on("navigation:open", ".audit-search-form .js-suggester", function() {
			return $(this).closest("form").submit()
		})
	}.call(this),
	function() {
		var t, e, n, i, r, s, a, o, c, u;
		r = function(t) {
			var e, n, i, r, s;
			if (r = t.match(/\#?(?:L|-)(\d+)/gi)) {
				for (s = [], e = 0, n = r.length; n > e; e++) i = r[e], s.push(parseInt(i.replace(/\D/g, "")));
				return s
			}
			return []
		}, n = function(t) {
			var e;
			return (e = t.match(/(file-.+?-)L\d+?/i)) ? e[1] : ""
		}, i = function(t) {
			return {
				lineRange: r(t),
				anchorPrefix: n(t)
			}
		}, t = function(t) {
			var e, n;
			switch (n = t.lineRange, e = t.anchorPrefix, n.sort(c), n.length) {
				case 1:
					return "#" + e + "L" + n[0];
				case 2:
					return "#" + e + "L" + n[0] + "-L" + n[1];
				default:
					return "#"
			}
		}, c = function(t, e) {
			return t - e
		}, o = !1, e = function(t) {
			var e, n, i, r, s;
			if (r = t.lineRange, e = t.anchorPrefix, i = $(".js-file-line"), i.length) {
				if (i.css("background-color", ""), 1 === r.length) return $("#" + e + "LC" + r[0]).css("background-color", "#f8eec7");
				if (r.length > 1) {
					for (n = r[0], s = []; n <= r[1];) $("#" + e + "LC" + n).css("background-color", "#f8eec7"), s.push(n++);
					return s
				}
			}
		}, a = function(t) {
			var n, r, s;
			return null == t && (t = i(window.location.hash)), s = t.lineRange, n = t.anchorPrefix, e(t), !o && (r = $("#" + n + "LC" + s[0])).length && $(window).scrollTop(r.offset().top - .33 * $(window).height()), o = !1
		}, u = function(t, e) {
			var n, i, r, s, a;
			for (null == e && (e = window.location.hash), a = [], i = 0, r = t.length; r > i; i++) s = t[i], a.push(e ? s.hash = e : (n = s.href.indexOf("#")) >= 0 ? s.href = s.href.substr(0, n) : void 0);
			return a
		}, $.hashChange(function() {
			return $(".js-file-line-container").length ? (setTimeout(a, 0), u($(".js-update-url-with-hash"))) : void 0
		}), s = function(t) {
			var e, n;
			return o = !0, n = null != (e = $(window).scrollTop()) ? e : 0, t(), $(window).scrollTop(n)
		}, $(document).on("mousedown", ".js-line-number", function(e) {
			var n, a;
			return n = i(this.id), e.shiftKey && (a = r(window.location.hash), n.lineRange.unshift(a[0])), s(function() {
				return window.location.hash = t(n)
			}), !1
		}), $(document).on("submit", ".js-jump-to-line-form", function() {
			var t, e;
			return t = this.querySelector(".js-jump-to-line-field"), (e = t.value.replace(/[^\d\-]/g, "")) && (window.location.hash = "L" + e), $(document).trigger("close.facebox"), !1
		})
	}.call(this),
	function() {
		var t, e, n, i, r, s, a, o, c, u, l, d, h, f, m, p, g, v, b;
		o = function(t) {
			var e, n, i;
			return n = t[0], e = n.querySelector(".js-blob-filename"), e ? "." === (i = e.value) || ".." === i || ".git" === i ? !1 : /\S/.test(e.value) : !0
		}, t = function(t) {
			var e;
			return e = t.querySelector(".js-blob-contents"), e ? "true" === e.getAttribute("data-allow-unchanged") ? !0 : r(e) : !0
		}, l = function(t) {
			var e;
			return e = t.querySelector(".js-new-filename-field"), r(e)
		}, e = function(e) {
			var n;
			return e = $(".js-blob-form"), n = e[0], e.find(".js-check-for-fork").is($.visible) ? !1 : o(e) ? t(n) || l(n) : !1
		}, p = function(t) {
			var e;
			return e = t.find(".js-blob-contents")[0], e ? $(e).attr("data-allow-unchanged") ? !0 : r(e) : !1
		}, c = function(t) {
			var e, n;
			return n = t[0], e = n.querySelector(".js-blob-contents"), r(e) || l(n)
		}, n = null, i = function(t) {
			var e;
			return e = $(t).attr("data-github-confirm-unload"), ("yes" === e || "true" === e) && (e = ""), null == e && (e = "false"), "no" === e || "false" === e ? null : function() {
				return e
			}
		}, d = function() {
			var t;
			return t = $(".js-blob-form"), t.find(".js-blob-submit").prop("disabled", !e(t)), t.find(".js-blob-contents-changed").val(p(t)), n ? window.onbeforeunload = c(t) ? n : null : void 0
		}, h = function(t) {
			var e, n, i, r, s;
			for (r = t.querySelectorAll("input"), s = [], n = 0, i = r.length; i > n; n++) e = r[n], "hidden" === e.getAttribute("type") && e.getAttribute("class") && s.push(null == e.getAttribute("data-default-value") ? e.setAttribute("data-default-value", e.value) : void 0);
			return s
		}, r = function(t) {
			return null == t ? !0 : "hidden" === t.type ? t.value !== t.getAttribute("data-default-value") : t.value !== t.defaultValue
		}, f = function(t) {
			var e, n, i, r;
			return e = t.querySelector(".js-blob-contents"), i = t.querySelector(".js-new-filename-field"), n = t.querySelector(".js-blob-filename"), e && i && n && (null != (r = n.defaultValue) ? r.length : void 0) ? e.setAttribute("data-old-filename", i.value) : void 0
		}, $.observe(".js-blob-form", function() {
			h(this), f(this), d(), n = i(this), $(this).on("submit", function() {
				return window.onbeforeunload = null
			})
		}), $(document).on("change", ".js-blob-contents", function() {
			return m($(".js-blob-filename")), d()
		}), $(document).on("click", ".js-new-blob-submit", function() {
			return $(this).closest("form.js-new-blob-form").submit()
		}), $(document).onFocusedInput(".js-blob-filename", function() {
			return function() {
				return $(".js-blob-contents").attr("data-filename", $(this).val()), u($(this).val()), m($(this))
			}
		}), $(document).onFocusedInput(".js-breadcrumb-nav", function() {
			return function() {
				return b($(this)), m($(this))
			}
		}), $(document).onFocusedKeydown(".js-breadcrumb-nav", function() {
			return function(t) {
				var e, n, i;
				return n = $(this).caretSelection(), i = [0, 0], e = 0 === $(n).not(i).length && 0 === $(i).not(n).length, e && 8 === t.keyCode && 1 !== $(this).parent().children(".separator").length && (a($(this), !0), t.preventDefault()), m($(this))
			}
		}), m = function(t) {
			return null != t[0] && (v(t), g(t)), d()
		}, b = function(t) {
			var e, n, i, r, o, c;
			for (i = []; t.val().split("/").length > 1;) e = t.val(), r = e.split("/"), n = r[0], c = r.slice(1).join("/"), "" === n || "." === n || ".git" === n ? (t.val(c), o = function() {
				return t.caret(0)
			}, i.push(window.setTimeout(o, 1))) : i.push(".." === n ? a(t) : s(t, n, c));
			return i
		}, u = function(t) {
			var e, n;
			return e = $(".js-gitignore-template"), n = $(".js-license-template"), /^(.+\/)?\.gitignore$/.test(t) ? e.addClass("is-visible") : /^(.+\/)?(licen[sc]e|copying)($|\.)/i.test(t) ? n.addClass("is-visible") : (e.removeClass("is-visible"), n.removeClass("is-visible"))
		}, g = function(t) {
			var e, n, i, s, a, o, c, u, l, d, h, f;
			return i = t.closest("form"), n = $(".js-blob-contents"), e = i.find(".js-new-blob-commit-summary"), c = t.val() ? "Create " + t.val() : "Create new file", h = n.attr("data-old-filename"), u = $(".js-new-filename-field").val(), n.removeAttr("data-new-filename"), c = (null != h ? h.length : void 0) && u !== h && null != t[0] ? (n.attr("data-new-filename", "true"), a = r(n[0]), s = a ? "Update and rename" : "Rename", t.val().length && u.length ? (f = h.split("/"), l = u.split("/"), d = !0, o = f.length - 1, f.forEach(function(t, e) {
				return e !== o && t !== l[e] ? d = !1 : void 0
			}), f.length === l.length && d ? s + " " + f[o] + " to " + l[o] : s + " " + h + " to " + u) : s + " " + h) : (null != h ? h.length : void 0) && u === h ? "Update " + t.val() : c, e.attr("placeholder", c), $(".js-commit-message-fallback").val(c)
		}, v = function(t) {
			var e, n;
			return e = $(".breadcrumb").children("[itemscope]"), n = "", e.each(function() {
				var t;
				return t = $(this), n = n + t.text() + "/"
			}), n += t.val(), $(".js-new-filename-field").val(n)
		}, a = function(t, e) {
			var n, i;
			return null == e && (e = !1), e || t.val(t.val().replace("../", "")), i = function() {
				return t.caret(0)
			}, 1 !== t.parent().children(".separator").length && (t.prev().remove(), n = t.prev().children().children().html(), t.prev().remove(), e && (t.val("" + n + t.val()), i = function() {
				return e ? t.caret(n.length) : void 0
			})), u(t.val()), window.setTimeout(i, 1)
		}, s = function(t, e, n) {
			var i, r, s, a, o, c, l;
			return null == n && (n = ""), e = e.replace(/[^-.a-z_0-9]+/gi, "-"), e = e.replace(/^-+|-+$/g, ""), e.length > 0 && (l = t.parent().children(".js-repo-root, [itemtype]").children("a").last().attr("href"), l || (i = t.parent().children(".js-repo-root, [itemtype]").children("span").children("a").last(), r = i.attr("data-branch"), o = i.attr("href"), l = o + "/tree/" + r), s = $(".js-crumb-template").clone().removeClass("js-crumb-template"), s.find("a[itemscope]").attr("href", l + "/" + e), s.find("span").text(e), a = $(".js-crumb-separator").clone().removeClass("js-crumb-separator"), t.before(s, a)), t.val(n), u(t.val()), c = function() {
				return t.caret(0)
			}, window.setTimeout(c, 1)
		}, $(document).onFocusedInput(".js-new-blob-commit-summary", function() {
			var t;
			return t = $(this).closest(".js-file-commit-form"),
				function() {
					return t.toggleClass("is-too-long-error", $(this).val().length > 50)
				}
		}), $.observe(".js-check-for-fork", function() {
			this.addEventListener("load", function() {
				return d()
			})
		}), $(document).on("change", ".js-gitignore-template input[type=radio]", function() {
			var t;
			return t = $(this).closest(".js-blob-form").find(".js-code-editor").data("code-editor"), $.fetchText(this.getAttribute("data-template-url")).then(function(e) {
				return t.setCode(e)
			})
		}), $(document).on("change", ".js-license-template input[type=radio]", function() {
			var t, e;
			return t = $(this).closest(".js-blob-form").find(".js-code-editor").data("code-editor"), e = $(this).attr("data-template-contents"), t.setCode(e)
		}), $(document).onFocusedKeydown(".js-new-blob-commit-description", function() {
			return function(t) {
				return "ctrl+enter" === t.hotkey || "meta+enter" === t.hotkey ? ($(this).closest("form").submit(), !1) : void 0
			}
		})
	}.call(this),
	function() {
		var t;
		t = null, $(document).focused(".js-branch-search-field")["in"](function() {
			var e, n, i, r, s, a, o, c, u, l, d, h, f, m;
			return n = $(this), i = n.closest(".js-branch-search"), e = i.closest(".js-branches"), r = e.find(".js-branches-subnav .js-subnav-item"), f = i.prop("action"), h = i.attr("data-reset-url"), m = i.attr("data-results-container"), u = /\S/, o = function() {
				return u.test(n.val())
			}, l = function(t, e) {
				var n;
				return $.support.pjax && window.history.replaceState(null, "", e), n = document.getElementById(m), $(n).html(t)
			}, a = null, s = function(t) {
				return a && a.readyState < 4 && a.abort(), a = $.ajax(t)
			}, c = function() {
				var n, a;
				return null === t && (t = r.filter(".selected")), n = o(), a = n ? f + "?" + i.serialize() : h, s({
					url: a,
					context: i
				}).always(function() {
					return e.removeClass("is-loading")
				}).done(function(t) {
					return l(t, a)
				}), e.toggleClass("is-search-mode", n), e.addClass("is-loading"), r.removeClass("selected"), n ? r.filter(".js-branches-all").addClass("selected") : (t.addClass("selected"), t = null)
			}, d = function() {
				var t;
				return t = o(), n.val(""), t ? c() : void 0
			}, n.on("throttled:input.autosearch_form", c), n.on("keyup.autosearch_form", function(t) {
				return "esc" === t.hotkey ? (d(), this.blur()) : void 0
			})
		}).out(function() {
			return $(this).off(".autosearch_form")
		}), $(document).on("submit", ".js-branch-search", !1), $(document).on("click", ".js-clear-branch-search", function(t) {
			var e;
			if (1 === t.which) return e = $(this).closest(".js-branch-search").find(".js-branch-search-field"), e.focus().val("").trigger("input"), t.preventDefault()
		}), $(document).on("ajaxSend", ".js-branch-destroy, .js-branch-restore", function(t, e) {
			var n, i, r, s, a;
			return i = $(this), a = i.is(".js-branch-destroy"), s = i.closest(".js-branch-row").attr("data-branch-name"), n = i.closest(".js-branches").find(".js-branch-row").filter(function() {
				return this.getAttribute("data-branch-name") === s
			}), r = i.find("button[type=submit]"), r.blur().removeClass("tooltipped"), n.addClass("loading"), e.done(function() {
				return n.toggleClass("is-deleted", a)
			}).always(function() {
				return n.removeClass("loading"), r.addClass("tooltipped")
			})
		})
	}.call(this),
	function() {
		$(document).on("navigation:keyopen", ".commits-list-item", function() {
			return $(this).find(".commit-title > a").first().click(), !1
		}), $(document).on("navigation:keydown", ".commits-list-item", function(t) {
			return "c" === t.hotkey ? ($(this).find(".commit-title > a").first().click(), !1) : void 0
		})
	}.call(this),
	function() {
		$(document).on("click", ".js-compare-tabs a", function() {
			return $(this).closest(".js-compare-tabs").find("a").removeClass("selected"), $(this).addClass("selected"), $("#commits_bucket, #files_bucket, #commit_comments_bucket").hide(), $(this.hash).show(), !1
		}), $.hashChange(function() {
			return $(this).closest("#files_bucket")[0] && !$(this).is($.visible) ? $('a.tabnav-tab[href="#files_bucket"]').click() : void 0
		}), $(document).on("click", ".js-toggle-range-editor-cross-repo", function() {
			return $(".js-range-editor").toggleClass("is-cross-repo"), !1
		}), $(document).on("pjax:click", ".js-range-editor", function(t, e) {
			$(".js-compare-pr").hasClass("open") && !e.url.match(/expand=1/) && (null == e.data && (e.data = {}), e.data.expand = "1")
		}), $(document).on("navigation:open", "form.js-commitish-form", function() {
			var t, e, n;
			return e = $(this), n = e.find(".js-new-item-name").text(), t = $("<input>", {
				type: "hidden",
				name: "new_compare_ref",
				value: n
			}), e.append(t), e.submit()
		}), $.observe(".js-compare-pr.open", {
			add: function() {
				return document.body.classList.add("is-pr-composer-expanded")
			},
			remove: function() {
				return document.body.classList.remove("is-pr-composer-expanded")
			}
		})
	}.call(this),
	function() {
		$(function() {
			var t;
			return $(".js-contact-javascript-flag").val("true"), t = $(".js-last-repo-nwo").text(), (null != t ? t.length : void 0) ? window.ga("send", "event", "Support", "view", "last-repo-nwo:" + t) : window.ga("send", "event", "Support", "view", "no_last_repo")
		})
	}.call(this),
	function() {
		var t;
		t = function(t) {
			var e, n, i, r, s, a;
			for (t = t.toLowerCase(), e = $(".js-csv-data tbody tr"), r = [], n = 0, i = e.length; i > n; n++) s = e[n], a = $(s).text().toLowerCase(), r.push(-1 === a.indexOf(t) ? $(s).hide() : $(s).show());
			return r
		}, $(document).on("keyup", ".js-csv-filter-field", function(e) {
			var n;
			return n = e.target.value, null != n && t(n), !1
		})
	}.call(this),
	function() {
		var t, e, n, i, r;
		$.hashChange(i = function() {
			var i, s, a, o, c, u, l, d, h;
			return o = window.location.hash, o && (u = r(o)) && (i = u[0], s = u[1], h = u[2], c = u[3], !n(o.slice(1))) ? (d = 0, l = 1, (a = function() {
				var i, r;
				if ((r = $(n(s)).next()[0]) && (i = e(r, h, c))) return $(i).parents(".js-details-container").addClass("open"), t(i).then(function() {
					var t, e, i, r;
					if (e = n(o.slice(1))) {
						if (i = $(e).overflowOffset(), r = i.top, t = i.bottom, 0 > r || 0 > t) return e.scrollIntoView()
					} else if (l > d) return d++, a()
				})
			})()) : void 0
		}), $(document).on("click", ".js-expand", function() {
			return t(this), !1
		}), t = function(t) {
			var e;
			return e = t.getAttribute("data-url"), e += "&anchor=" + encodeURIComponent(t.hash.slice(1)), e = e.replace(/[?&]/, "?"), new Promise(function(n, i) {
				return $.fetchText(e).then(function(e) {
					var i, r;
					return i = $(t).closest(".js-expandable-line"), r = i.next(".file-diff-line"), r.preservingScrollPosition(function() {
						return i.replaceWith(e)
					}), n()
				}, i)
			})
		}, n = function(t) {
			return document.getElementById(t) || document.getElementsByName(t)[0]
		}, r = function(t) {
			var e, n;
			return e = t.match(/\#(diff\-[a-f0-9]+)([L|R])(\d+)$/i), null != e && 4 === e.length ? e : (n = t.match(/\#(discussion\-diff\-[0-9]+)([L|R])(\d+)$/i), null != n && 4 === n.length ? n : null)
		}, e = function(t, e, n) {
			var i, r, s, a, o, c, u, l;
			for (n = parseInt(n, 10), c = $(t).find(".js-expand"), a = 0, o = c.length; o > a; a++)
				if (r = c[a], i = "R" === e ? "data-right-range" : "data-left-range", u = r.getAttribute(i).split("-"), l = u[0], s = u[1], parseInt(l, 10) <= n && n <= parseInt(s, 10)) return r;
			return null
		}
	}.call(this),
	function() {
		var t, e, n, i, r, s, a, o;
		$(document).on("click", ".js-add-single-line-comment", function() {
			var t, e, i, r, o, c;
			n($(this).closest(".file")[0]), o = this.getAttribute("data-path"), t = this.getAttribute("data-anchor"), c = this.getAttribute("data-position"), e = this.getAttribute("data-line"), r = a($(this).closest("tr")[0], {
				path: o,
				anchor: t,
				position: c,
				line: e
			}), i = $(r).find(".js-line-comments")[0], i.classList.contains("is-resolved") ? i.classList.toggle("is-collapsed") : s(i)
		}), $(document).on("click", ".js-add-split-line-comment", function() {
			var t, e, r, a, c, u, l, d;
			n($(this).closest(".file")[0]), d = this.getAttribute("data-type"), u = this.getAttribute("data-path"), t = this.getAttribute("data-anchor"), l = this.getAttribute("data-position"), r = this.getAttribute("data-line"), e = function() {
				switch (d) {
					case "addition":
						return "js-addition";
					case "deletion":
						return "js-deletion"
				}
			}(), c = o($(this).closest("tr")[0]), a = i(c, e, {
				type: d,
				anchor: t,
				path: u,
				position: l,
				line: r
			}), a.classList.contains("is-resolved") ? a.classList.toggle("is-collapsed") : s(a)
		}), $(document).on("click", ".js-toggle-inline-comment-form", function() {
			return s($(this).closest(".js-line-comments")[0]), !1
		}), $(document).on("quote:selection", ".js-line-comments", function() {
			s(this)
		}), $(document).onFocusedKeydown(".js-inline-comment-form .js-comment-field", function() {
			return function(e) {
				return $(this).hasClass("js-navigation-enable") ? void 0 : "esc" === e.hotkey && 0 === this.value.length ? (t($(this).closest(".js-inline-comment-form")[0]), !1) : void 0
			}
		}), $(document).on("click", ".js-hide-inline-comment-form", function() {
			return t($(this).closest(".js-inline-comment-form")[0]), !1
		}), $(document).on("ajaxSuccess", ".js-inline-comment-form", function(e, n, i, r) {
			var s, a, o;
			this === e.target && (s = $(this).closest(".js-line-comments"), s.find(".js-comments-holder").append(r.inline_comment), (o = r.diff_line) && $(this).closest(".js-inline-comments-container").prev().replaceWith(o), (a = r.actions) && $(this).closest(".js-inline-comment-form-container").find(".js-comment-resolution").replaceWith(a), t(this))
		}), $(document).on("session:resume", function(t) {
			var e;
			(e = t.targetId.match(/^new_inline_comment_diff_(diff-\w+)_(\d+)$/)) && $(".js-add-line-comment[data-anchor=" + e[1] + "][data-position=" + e[2] + "]").click()
		}), s = function(t) {
			return $(t).find(".js-inline-comment-form-container").addClass("open"), $(t).find(".js-write-tab").click(), $(t).find(".js-comment-field").focus()
		}, t = function(t) {
			return t.reset(), $(t).closest(".js-inline-comment-form-container").removeClass("open"), e()
		}, n = function(t) {
			return $(t).find(".js-toggle-file-notes").prop("checked", !0).trigger("change")
		}, e = function() {
			var t, e, n, i, r, s;
			for (s = $(".file .js-inline-comments-container"), i = 0, r = s.length; r > i; i++) t = s[i], n = $(t).find(".js-comments-holder > *").length > 0, e = $(t).find(".js-inline-comment-form-container").hasClass("open"), n || e || $(t).remove()
		}, $.observe(".js-comment", {
			remove: e
		}), a = function(t, e) {
			var n, i, s;
			return null == e && (e = {}), (s = $(t).next(".js-inline-comments-container")[0]) ? s : (n = $("#js-inline-comments-single-container-template"), s = n.children().first().clone()[0], i = s.querySelector(".js-inline-comment-form"), r(i, e), i.querySelector(".js-comment-field").id = "new_inline_comment_" + e.anchor + "_" + e.position, $(t).after(s), s)
		}, i = function(t, e, n) {
			var i, s, a;
			return null == n && (n = {}), (a = $(t).find(".js-line-comments." + e)[0]) ? a : (a = $("#js-inline-comments-split-form-container-template").clone().children()[0], $(a).addClass(e), s = $(a).find(".js-inline-comment-form")[0], r(s, n), s.querySelector(".js-comment-field").id = "new_inline_comment_" + n.anchor + "_" + n.position, i = $(t).find("." + e), i.last().after(a), i.remove(), a)
		}, o = function(t) {
			var e;
			return (e = $(t).next(".js-inline-comments-container")[0]) ? e : (e = $("#js-inline-comments-split-container-template").clone().children()[0], $(t).after(e), e)
		}, r = function(t, e) {
			var n, i, r, s;
			for (s = t.elements, i = 0, r = s.length; r > i; i++) n = s[i], n.name in e && (n.value = e[n.name])
		}
	}.call(this),
	function() {
		var t, e;
		t = function(t, e, n) {
			return $.observe(t, function(t) {
				var i, r, s, a, o, c;
				return c = null, r = s = function() {
					c && n(c, !1), c = null
				}, a = function(t) {
					c && n(c, !1), c = $(t.target).closest(e)[0], c && n(c, !0)
				}, i = function() {
					return t.addEventListener("mouseenter", r), t.addEventListener("mouseleave", s), t.addEventListener("mouseover", a)
				}, o = function() {
					return t.removeEventListener("mouseenter", r), t.removeEventListener("mouseleave", s), t.removeEventListener("mouseover", a)
				}, {
					add: i,
					remove: o
				}
			})
		}, e = function(t) {
			return Math.floor(t / 2)
		}, t(".diff-table", "td.blob-code, td.blob-num", function(t, n) {
			var i, r, s, a, o, c, u, l, d, h;
			if (h = t.parentNode, i = h.children, 4 === i.length)
				for (a = o = 0, u = i.length; u > o; a = ++o) s = i[a], s === t && (r = e(a));
			for (d = [], a = c = 0, l = i.length; l > c; a = ++c) s = i[a], (null == r || e(a) === r) && d.push(s.classList.toggle("is-hovered", n));
			return d
		})
	}.call(this),
	function() {
		var t, e, n;
		$(document).on("click", ".js-linkable-line-number", function() {
			return window.location.hash = this.id, !1
		}), t = null, n = function(t) {
			return Math.floor(t / 2)
		}, e = function() {
			var e, i, r, s, a, o, c, u, l, d, h;
			if (t) {
				for (o = 0, u = t.length; u > o; o++) r = t[o], r.classList.remove("selected-line");
				t = null
			}
			if (a = window.location.hash.substring(1), a && (h = document.getElementById(a)), h && h.classList.contains("js-linkable-line-number")) {
				if (d = h.parentNode, e = d.children, 4 === e.length)
					for (s = c = 0, l = e.length; l > c; s = ++c) r = e[s], r === h && (i = n(s));
				t = function() {
					var t, a, o;
					for (o = [], s = t = 0, a = e.length; a > t; s = ++t) r = e[s], (null == i || n(s) === i) && (r.classList.toggle("selected-line"), o.push(r));
					return o
				}()
			}
		}, $.hashChange(e), $.observe(".blob-expanded", e)
	}.call(this),
	function() {
		var t;
		t = function() {
			var t;
			return t = "split" === $("meta[name=diff-view]").prop("content") && $(".file-diff-split").is(":visible"), document.body.classList.toggle("split-diff", t)
		}, $.observe("meta[name=diff-view]", {
			add: t,
			remove: t
		}), $.observe(".file-diff-split", {
			add: t,
			remove: t
		}), $.observe(".js-pull-request-tab.selected", {
			add: t,
			remove: t
		}), $.observe(".js-compare-tabs .tabnav-tab.selected", {
			add: t,
			remove: t
		})
	}.call(this),
	function() {
		$(document).on("change", ".js-toggle-file-notes", function() {
			return $(this).closest(".file").toggleClass("show-inline-notes", this.checked)
		}), $(document).on("click", ".js-toggle-all-file-notes", function() {
			var t, e;
			return t = $(".js-toggle-file-notes"), e = 0 === t.filter(":checked").length, t.prop("checked", e).trigger("change"), !1
		}), $.observe(".js-inline-comments-container", function() {
			var t, e, n;
			return (e = $(this).closest(".file")[0]) ? (t = n = function() {
				var t;
				t = null != e.querySelector(".js-inline-comments-container"), e.classList.toggle("has-inline-notes", t)
			}, {
				add: t,
				remove: n
			}) : void 0
		})
	}.call(this),
	function() {
		var t;
		t = function(t) {
			var e, n, i;
			return i = t.parentElement, n = i.querySelectorAll("td.js-line-comments").length, e = i.querySelectorAll("td.js-line-comments.is-collapsed").length, i.classList.toggle("is-collapsed", e > 0 && n === e)
		}, $.observe("td.js-line-comments.is-collapsed", {
			add: function(e) {
				return t(e)
			},
			remove: function(e) {
				return t(e)
			}
		})
	}.call(this),
	function() {
		$(document).on("focusin", ".js-url-field", function() {
			var t;
			return t = this, setTimeout(function() {
				return $(t).select()
			}, 0)
		})
	}.call(this),
	function() {
		$(document).on("change", ".js-early-access-survey-choice", function() {
			var t, e, n;
			return n = $(this)[0], e = $(this).closest(".js-early-access-survey-question"), t = e.find(".js-early-access-other-text"), n.selectedIndex === n.options.length - 1 ? (e.addClass("is-other-selected"), t.attr("required", "required"), t.focus()) : (t.removeAttr("required"), e.removeClass("is-other-selected"))
		})
	}.call(this),
	function() {
		document.querySelector(".js-account-membership-form") && ($(document).one("change.early-access-tracking", ".js-account-membership-form", function() {
			return window.ga("send", "event", "Large File Storage", "attempt", "location: early access form")
		}), $(document).on("submit.early-access-tracking", ".js-account-membership-form", function() {
			return window.ga("send", "event", "Large File Storage", "submit", "location: early access form")
		}))
	}.call(this),
	function() {
		$(document).on("click", ".js-events-pagination", function() {
			var t, e;
			return e = $(this).parent(".ajax_paginate"), t = e.parent(), e.hasClass("loading") ? !1 : (e.addClass("loading"), $.ajax({
				url: $(this).attr("href"),
				complete: function() {
					return e.removeClass("loading")
				},
				success: function(t) {
					return e.replaceWith(t)
				}
			}), !1)
		})
	}.call(this),
	function() {
		$(function() {
			var t, e;
			return t = $(".js-newsletter-frequency-choice"), t.length ? (e = function() {
				var e;
				return t.find(".selected").removeClass("selected"), e = t.find("input[type=radio]:enabled:checked"), e.closest(".choice").addClass("selected")
			}, t.on("change", "input[type=radio]", function() {
				return e()
			}), e()) : void 0
		}), $(document).on("ajaxSuccess", ".js-subscription-toggle", function() {
			var t;
			return t = $(this).find(".selected .notice"), t.addClass("visible"), setTimeout(function() {
				return t.removeClass("visible")
			}, 2e3)
		}), $(document).on("ajaxSuccess", ".js-explore-newsletter-subscription-container", function(t, e) {
			return $(this).replaceWith(e.responseText)
		})
	}.call(this),
	function() {
		var t, e;
		t = function() {
			var t;
			return t = $("#js-features-branch-diagram"), t.removeClass("preload"), t.find("path").each(function() {
				var t, e, n;
				return $(this).is("#js-branch-diagram-branch") ? n = "stroke-dashoffset 3.5s linear 0.25s" : $(this).is("#js-branch-diagram-master") ? n = "stroke-dashoffset 4.1s linear 0s" : $(this).is("#js-branch-diagram-arrow") && (n = "stroke-dashoffset 0.2s linear 4.3s"), e = $(this).get(0), t = e.getTotalLength(), e.style.transition = e.style.WebkitTransition = "none", e.style.strokeDasharray = t + " " + t, e.style.strokeDashoffset = t, e.getBoundingClientRect(), e.style.transition = e.style.WebkitTransition = n, e.style.strokeDashoffset = "0"
			})
		}, $(document).on("click", ".js-segmented-nav-button", function(t) {
			var e, n;
			return n = $(this).attr("data-selected-tab"), e = $(this).closest(".js-segmented-nav"), e.find(".js-segmented-nav-button").removeClass("selected"), e.siblings(".js-selected-nav-tab").removeClass("active"), $(this).addClass("selected"), $("." + n).addClass("active"), t.preventDefault()
		}), e = function() {
			return $(document).scrollTop() >= $("#js-features-branch-diagram").offset().top - 700 ? t() : void 0
		}, $.observe("#js-features-branch-diagram.preload", {
			add: function() {
				return $(window).on("scroll", e)
			},
			remove: function() {
				return $(window).off("scroll", e)
			}
		})
	}.call(this),
	function() {
		$(function() {
			var t;
			return $(document).on("click", ".js-ignore-experiment", function(t) {
				var e;
				return t.preventDefault(), t.stopPropagation(), e = $(this).attr("data-ref"), $.ajax({
					type: "PUT",
					url: "/ignore-survey",
					data: {
						experiment_id: e
					},
					success: function() {
						return window.location.href = "/"
					},
					error: function() {
						return alert("There was an error submitting your response.")
					}
				})
			}), $(".js-survey-get-started").on("click", function() {
				return $(".js-survey-intro").removeClass("in").addClass("out"), $(".js-survey-questions").removeClass("hidden").addClass("in"), $(".js-survey-content").removeClass("quiz-inactive").addClass("quiz-active")
			}), $(document).on("ajaxSend", ".js-survey-question-form", function() {
				return $(this).find(".js-survey-spinner").fadeIn(150)
			}), $(document).on("ajaxSuccess", ".js-survey-question-form", function() {
				var t, e, n;
				return n = $(this).parents(".js-survey-questions").find(".js-survey-question"), t = n.filter(".active"), e = n.eq(n.index(t) + 1), t.removeClass("active").addClass("complete"), e.length ? e.addClass("active") : ($(".js-survey-questions").removeClass("in").addClass("out"), $(".js-survey-outro").removeClass("hidden").addClass("in"))
			}), $(document).on("ajaxError", ".js-survey-question-form", function() {
				return $(this).find(".js-survey-spinner").fadeOut(150), alert("There was an error submitting your response."), !1
			}), $(document).on("change", ".js-survey-question", function() {
				return t(this)
			}), $(document).on("click", ".js-other-text", function() {
				var e;
				return e = $(this).parents(".js-survey-choice").find(".js-survey-choice-radio")[0], e.checked = !0, t($(this).parents(".js-survey-question")[0])
			}), $(document).on("throttled:input", ".js-other-text", function() {
				var e;
				return e = $(this).parents(".js-survey-question")[0], t(e)
			}), t = function(t) {
				var e, n, i, r, s;
				return s = function() {
					var e, i, r, s;
					for (r = t.querySelectorAll(".js-survey-choice-radio"), s = [], e = 0, i = r.length; i > e; e++) n = r[e], n.checked && s.push(n);
					return s
				}()[0], r = "Other" === s.getAttribute("data-choice-text"), i = t.querySelector(".js-other-text"), i && (i.disabled = !r, r && i.focus()), e = r ? i.value.length > 0 : !0, t.querySelector(".js-submit-choice").disabled = !e
			}
		})
	}.call(this),
	function() {
		var t, e, n, i, r, s, a, o = [].slice;
		n = function(t) {
			return document.querySelector(".js-gist-dropzone").classList.remove("hidden"), t.stopPropagation(), t.preventDefault()
		}, i = function(t) {
			var e;
			return (null != (e = t.target.classList) ? e.contains("js-gist-dropzone") : void 0) ? document.querySelector(".js-gist-dropzone").classList.add("hidden") : void 0
		}, r = function(t) {
			return document.querySelector(".js-gist-dropzone").classList.remove("hidden"), t.stopPropagation(), t.preventDefault()
		}, s = function(e) {
			var n, i, r, s, o;
			for (o = e.dataTransfer.files, i = function(e) {
				return a(e, {
					as: "Text",
					to: t,
					test: function(t, e) {
						return !/\0/.test(e)
					}
				})
			}, r = 0, s = o.length; s > r; r++) n = o[r], i(n);
			return document.querySelector(".js-gist-dropzone").classList.add("hidden"), e.stopPropagation(), e.preventDefault()
		}, $.observe(".js-gist-dropzone", {
			add: function() {
				return document.body.addEventListener("dragenter", n), document.body.addEventListener("dragleave", i), document.body.addEventListener("dragover", r), document.body.addEventListener("drop", s)
			},
			remove: function() {
				return document.body.removeEventListener("dragenter", n), document.body.removeEventListener("dragleave", i), document.body.removeEventListener("dragover", r), document.body.removeEventListener("drop", s)
			}
		}), a = function() {
			var t, e, n, i, r, s, c, u, l;
			return e = arguments[0], n = 2 <= arguments.length ? o.call(arguments, 1) : [], r = [n[0], n.slice(1)], s = r[0], t = s.as, l = s.to, u = s.test, c = r[1], i = new FileReader, i.onload = function() {
				var t;
				return t = i.result, u(e, t) ? l(e, t) : c.length ? a.apply(null, [e].concat(o.call(c))) : $(document).trigger({
					type: "gist:fileDrop",
					fileType: "invalid"
				})
			}, i["readAs" + t](e)
		}, e = function() {
			var t, e;
			return e = $(".js-gist-files"), t = e.find(".js-gist-file").last(), "" === t.find(".js-gist-filename").val() && "" === t.find(".js-blob-contents").val() ? t : (e.append($("#js-gist-file-template").html()), e.find(".js-gist-file").last().trigger("gist:fileAppended"))
		}, t = function(t, n) {
			var i, r;
			return r = e(), r.trigger({
				type: "gist:fileDrop",
				fileType: "text"
			}), r.find(".js-gist-filename").val(t.name), r.find(".js-gist-filename").trigger("input"), i = r.find(".js-code-editor").data("code-editor"), i ? i.setCode(n) : $(".js-code-editor").on("codeEditor:ready", function() {
				return i = $(this).data("code-editor"), i.setCode(n)
			}), r.trigger("gist:validationchange")
		}
	}.call(this),
	function() {
		var t, e, n, i;
		t = function() {
			return $(".js-code-textarea").val().trim().length > 0
		}, i = function() {
			return $(".js-remove-gist-file").length <= 1 ? $(".js-remove-gist-file").hide() : $(".js-remove-gist-file").show()
		}, $(document).on("change", ".js-code-textarea", function() {
			return $(".js-gist-create").prop("disabled", !t())
		}), $(document).on("throttled:input", ".js-gist-filename", function() {
			var t, e, n;
			return t = $(this), n = t.val(), e = t.parents(".js-code-editor").data("code-editor"), null != e.ace ? $.ajax({
				url: t.attr("data-language-detection-url"),
				method: "POST",
				data: {
					filename: n
				},
				dataType: "json"
			}).done(function(n) {
				return (null != n ? n.language : void 0) ? (e.setMode(n.language), t.parents(".js-file-header").find(".js-gist-file-language").text(n.message)) : void 0
			}) : void 0
		}), n = $("#js-gist-file-template"), $(document).on("click", ".js-add-gist-file", function() {
			var t, e;
			return t = $(".js-gist-files"), e = $($("#js-gist-file-template").html()), t.append(e), $(document).scrollTop(e.offset().top - 100), i()
		}), $(document).on("click", ".js-remove-gist-file", function() {
			var t;
			return t = $(this).closest(".js-gist-file"), t.find(".js-gist-deleted input").removeAttr("disabled"), t.find(".js-code-editor").remove(), i(), $(".js-gist-file").length || $(".js-gist-files").append($("#js-gist-file-template").html()), !1
		}), $(document).on("click", ".js-delete-button", function(t) {
			return confirm("Are you positive you want to delete this Gist?") ? void 0 : t.preventDefault()
		}), $(document).on("click", ".js-gist-visibility-toggle", function() {
			return $(this).find("input").prop("checked", !0), $(".js-gist-visibility-toggle").removeClass("active"), $(this).closest(".js-gist-visibility-toggle").addClass("active"), e($(this).attr("data-visibility-type"))
		}), e = function(t) {
			return $(".js-gist-create").text("Create " + t + " Gist"), $(".js-gist-update").text("Update " + t + " Gist")
		}, $(document).on("gist:fileAppended", ".js-gist-file", function() {
			return i()
		}), $(function() {
			return i()
		})
	}.call(this),
	function() {
		$(document).on("ajaxComplete", ".js-gist-file-update-container .js-comment-update", function(t, e) {
			var n;
			return 200 === e.status ? (n = JSON.parse(e.responseText), this.action = n.url) : void 0
		})
	}.call(this),
	function() {
		var t, e;
		t = {
			isHttpFragment: function(t) {
				return 0 === "http://".indexOf(t) || 0 === "https://".indexOf(t)
			},
			isValidHttpUrl: function(t) {
				var e, n, i;
				return i = function() {
					try {
						return new URL(t)
					} catch (e) {}
				}(), null == i ? !1 : (e = /^https?/.test(i.protocol), n = i.href === t || i.href === t + "/", e && n)
			}
		}, $.observe(".js-hook-url-field", function(e) {
			var n, i, r;
			n = $(e), i = function(t) {
				var e, n;
				return e = $(t).closest("form"), n = /^https:\/\/.+/.test(t.val()), e.toggleClass("is-ssl", n)
			}, r = function(e) {
				var n, i;
				return n = e.val(), i = t.isHttpFragment(n) || t.isValidHttpUrl(n), e.closest("form").toggleClass("is-invalid-url", !i)
			}, n.on("keyup", function() {
				return i(n)
			}), n.on("throttled:input", function() {
				return r(n)
			}), i(n), r(n)
		}), $(document).on("click", ".js-hook-toggle-ssl-verification", function(t) {
			return t.preventDefault(), $(".js-ssl-hook-fields").toggleClass("is-not-verifying-ssl"), $(".js-ssl-hook-fields").hasClass("is-not-verifying-ssl") ? ($(".js-hook-ssl-verification-field").val("1"), $(document).trigger("close.facebox")) : $(".js-hook-ssl-verification-field").val("0")
		}), e = function(t) {
			var e;
			return e = $(".js-hook-event-checkbox"), e.prop("checked", !1), null != t ? e.filter(t).prop("checked", !0) : void 0
		}, $(document).on("change", ".js-hook-event-choice", function() {
			var t;
			return t = "custom" === $(this).val(), $(".js-hook-events-field").toggleClass("is-custom", t), !0
		}), $(document).on("submit", ".js-hook-form", function() {
			var t, n;
			return t = $(this), n = t.find(".js-hook-event-choice:checked").val(), "custom" === n && $(".js-hook-wildcard-event").prop("checked", !1), "push" === n && e('[value="push"]'), "all" === n && e(".js-hook-wildcard-event"), !0
		}), $(document).on("details:toggled", ".js-hook-secret", function() {
			var t, e;
			return t = $(this), e = t.find("input[type=password]"), t.hasClass("open") ? e.removeAttr("disabled").focus() : e.attr("disabled", "disabled")
		}), $(document).on("details:toggle", ".js-hook-delivery-item", function() {
			var t, e;
			return t = $(this), e = this.querySelector(".js-hook-delivery-details"), t.data("details-load-initiated") ? void 0 : $.sudo().then(function() {
				var n, i;
				return t.data("details-load-initiated", !0), e.classList.add("is-loading"), n = function(t) {
					return $(e).replaceWith(t), e.classList.remove("is-loading")
				}, i = function() {
					return e.classList.add("has-error"), e.classList.remove("is-loading")
				}, $.fetchText(e.getAttribute("data-url")).then(n, i)
			})
		}), $(document).on("click", ".js-hook-delivery-details .js-tabnav-tab", function() {
			var t, e, n;
			return e = $(this), t = e.closest(".js-hook-delivery-details"), t.find(".js-tabnav-tab").removeClass("selected"), n = t.find(".js-tabnav-tabcontent").removeClass("selected"), e.addClass("selected"), n.filter(function() {
				return this.getAttribute("data-tab-name") === e.attr("data-tab-target")
			}).addClass("selected")
		}), $(document).on("click", ".js-hook-deliveries-pagination-button", function(t) {
			var e, n;
			return t.preventDefault(), n = this, e = $(this).parent(), $.sudo().then(function() {
				return e.addClass("loading"), $.fetchText(n.getAttribute("href")).then(function(t) {
					return e.replaceWith(t)
				})
			})
		}), $(document).on("click", ".js-redeliver-hook-delivery-init-button", function(t) {
			var e;
			return t.preventDefault(), e = this.getAttribute("href"), $.sudo().then(function() {
				return $.facebox({
					div: e
				})
			})
		}), $(document).on("ajaxSuccess", ".js-redeliver-hook-form", function(t, e) {
			var n, i, r, s;
			return s = this.getAttribute("data-delivery-guid"), n = $(".js-hook-delivery-details").filter(function() {
				return this.getAttribute("data-delivery-guid") === s
			}), r = n.closest(".js-hook-delivery-item"), $(document).trigger("close.facebox"), i = $(e.responseText), n.replaceWith(i), i.on("load", function() {
				return n = r.find(".js-hook-delivery-details"), r.find(".js-item-status").removeClass("success pending failure").addClass(n.attr("data-status-class")), r.find(".js-item-status-tooltip").attr("aria-label", n.attr("data-status-message"))
			})
		}), $(document).on("ajaxError", ".js-redeliver-hook-form", function() {
			return $(this).siblings(".js-redelivery-dialog").addClass("failed")
		}), $(document).on("submit", ".js-test-hook-form", function(t) {
			var e;
			return t.preventDefault(), e = this, $.sudo().then(function() {
				var t, n, i, r;
				return r = document.querySelector(".js-test-hook-message"), r.classList.remove("error", "success"), t = function() {
					return e.dispatchEvent(new CustomEvent("ajaxComplete", {
						bubbles: !0
					}))
				}, n = function() {
					return r.classList.add("success")
				}, i = function(t) {
					var e;
					return r.classList.add("error"), e = r.querySelector(".js-test-hook-message-errors"), null != t.response ? t.response.json().then(function(t) {
						return e.textContent = t.errors
					}) : e.textContent = "Network request failed"
				}, $.fetch(e.action, {
					method: e.method,
					body: $(e).serialize(),
					headers: {
						"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
					}
				}).then(n, i).then(t, t)
			})
		})
	}.call(this),
	function() {
		var t, e, n;
		t = function(t) {
			var e;
			return null == t && (t = $(this)), e = t.find("a").attr("href"), $(".js-slideshow-nav .active").removeClass("active"), t.addClass("active"), $(".js-integrations-slide-content .active").removeClass("active"), $(e).addClass("active"), !1
		}, e = function() {
			var e, n;
			return e = $(".js-slideshow-nav .active"), n = 0 === e.next().length, t(n ? $(".js-slide-tab").eq(0) : e.next())
		}, n = null, $.observe(".js-slideshow-nav", {
			add: function() {
				return n = setInterval(e, 9e3)
			},
			remove: function() {
				return clearInterval(n)
			}
		}), $(document).on("click", ".js-slide-tab a", function() {
			return t($(this).closest(".js-slide-tab")), clearInterval(n), !1
		})
	}.call(this),
	function() {
		$(document).on("navigation:open", ".js-issues-custom-filter", function() {
			var t, e, n, i;
			return e = $(this), i = e.find(".js-new-item-name").text(), n = e.attr("data-name"), t = $("<input>", {
				type: "hidden",
				name: n,
				value: i
			}), e.append(t), e.submit()
		})
	}.call(this),
	function() {
		var t, e, n;
		e = function(e, n) {
			return e.closest(".js-label-editor").find(".js-color-editor-bg").css("background-color", n), e.css("color", t(n, -.5)), e.css("border-color", n)
		}, n = function(t) {
			var e, n;
			return e = "#c00", n = $(t).closest(".js-color-editor"), n.find(".js-color-editor-bg").css("background-color", e), t.css("color", "#c00"), t.css("border-color", e)
		}, t = function(t, e) {
			var n, i, r;
			for (t = String(t).toLowerCase().replace(/[^0-9a-f]/g, ""), t.length < 6 && (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]), e = e || 0, r = "#", n = void 0, i = 0; 3 > i;) n = parseInt(t.substr(2 * i, 2), 16), n = Math.round(Math.min(Math.max(0, n + n * e), 255)).toString(16), r += ("00" + n).substr(n.length), i++;
			return r
		}, $(document).on("focusin", ".js-color-editor-input", function() {
			var t, i;
			return i = $(this), t = $(this).closest(".js-label-editor"), i.on("throttled:input.colorEditor", function() {
				var r;
				return "#" !== i.val().charAt(0) && i.val("#" + i.val()), t.removeClass("is-valid is-not-valid"), r = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(i.val()), r ? (t.addClass("is-valid"), e(i, i.val())) : (t.addClass("is-not-valid"), n(i))
			}), i.on("blur.colorEditor", function() {
				return i.off(".colorEditor")
			})
		}), $(document).on("mousedown", ".js-color-chooser-color", function() {
			var t, n, i;
			return $(this).closest(".js-color-editor").removeClass("open"), t = $(this).closest(".js-label-editor"), n = "#" + $(this).attr("data-hex-color"), i = t.find(".js-color-editor-input"), t.removeClass("is-valid is-not-valid"), i.val(n), e(i, n)
		}), $(document).on("submit", ".js-label-editor form", function() {
			var t, e;
			return t = $(this).find(".js-color-editor-input"), e = t.val(), e.length < 6 && (e = e[1] + e[1] + e[2] + e[2] + e[3] + e[3]), t.val(e.replace("#", ""))
		}), $(document).on("focusin", ".js-label-editor", function() {
			return $(this).closest(".js-label-editor").addClass("open")
		}), $(document).on("reset", ".js-create-label", function() {
			var t, n, i;
			return t = $(this).find(".color-chooser span").removeAttr("data-selected"), i = t.eq(Math.floor(Math.random() * t.length)), n = "#" + i.attr("data-selected", "").attr("data-hex-color"), setImmediate(function(t) {
				return function() {
					var i;
					return i = $(t).find(".js-color-editor-input"), i.attr("data-original-color", n).attr("value", n), e(i, i.val())
				}
			}(this))
		})
	}.call(this),
	function() {
		$(document).on("click", ".js-edit-label", function() {
			return $(this).closest(".labels-list-item").addClass("edit")
		}), $(document).on("click", ".js-edit-label-cancel", function() {
			return this.form.reset(), $(this).closest(".labels-list-item").removeClass("edit")
		}), $(document).on("ajaxSuccess", ".js-create-label", function(t, e, n, i) {
			return this.reset(), $(this).nextAll(".table-list").prepend(i), $(".blankslate").hide()
		}), $(document).on("ajaxSuccess", ".js-update-label", function(t, e, n, i) {
			return $(this).closest(".labels-list-item").replaceWith(i)
		}), $(document).on("ajaxSend", ".js-update-label, .js-create-label", function() {
			return $(this).find(".error").text("")
		}), $(document).on("ajaxError", ".js-update-label, .js-create-label", function(t, e) {
			return $(this).find(".error").text(e.responseText), !1
		}), $(document).on("ajaxSuccess", ".js-delete-label", function() {
			return $(this).closest(".labels-list-item").fadeOut()
		})
	}.call(this),
	function() {
		$.hashChange(function(t) {
			var e, n, i, r;
			return r = t.newURL, (i = r.match(/\/issues#issue\/(\d+)$/)) ? (e = i[0], n = i[1], window.location = r.replace(/\/?#issue\/.+/, "/" + n)) : void 0
		}), $.hashChange(function(t) {
			var e, n, i, r, s;
			return s = t.newURL, (r = s.match(/\/issues#issue\/(\d+)\/comment\/(\d+)$/)) ? (e = r[0], i = r[1], n = r[2], window.location = s.replace(/\/?#issue\/.+/, "/" + i + "#issuecomment-" + n)) : void 0
		})
	}.call(this),
	function() {
		var t;
		$.observe(".js-issues-list-check:checked", {
			add: function() {
				return $(this).closest(".js-issue-row").addClass("selected")
			},
			remove: function() {
				return $(this).closest(".js-issue-row").removeClass("selected")
			}
		}), $(document).on("navigation:keydown", ".js-issue-row", function(e) {
			return "x" === e.hotkey ? (t(this), !1) : void 0
		}), $("#js-issues-search").focus(function() {
			return this.value = this.value
		}), t = function(t) {
			var e;
			(e = $(t).find(".js-issues-list-check")[0]) && (e.checked = !e.checked, $(e).trigger("change"))
		}
	}.call(this),
	function() {
		var t, e, n;
		$(document).on("selectmenu:selected", ".js-issue-sidebar-form", function(t) {
			var n, i, r, s;
			return i = t.target, n = i.closest(".js-discussion-sidebar-item"), s = function(t) {
				return function() {
					return $(t).is("form") ? $(t).submit() : e(t)
				}
			}(this), r = i.closest(".js-select-menu").hasAttribute("data-multiple"), r ? ($(this).off(".deferredSubmit"), $(this).one("menu:deactivate.deferredSubmit", s)) : s()
		}), $(document).on("ajaxSuccess", ".js-discussion-sidebar-item", function(t, e, n, i) {
			var r;
			return r = t.target.classList, r.contains("js-issue-sidebar-form") ? $(this).replaceWith(i) : void 0
		}), $(document).on("click", "div.js-issue-sidebar-form .js-issue-assign-self", function(t) {
			var n;
			return n = this.closest(".js-issue-sidebar-form"), e(n, {
				name: this.name,
				value: this.value
			}), t.preventDefault()
		}), e = function(t, e) {
			var i;
			return i = n(t), e && i.push(e), $(t).ajax({
				method: "POST",
				data: i
			})
		}, n = function(e) {
			var n, i, r, s, a, o;
			for (n = e.closest("form"), a = $(n).serializeArray(), o = [], i = 0, r = a.length; r > i; i++) s = a[i], $.contains(e, t(n, s)) && o.push(s);
			return o
		}, t = function(t, e) {
			var n, i, r, s;
			for (s = t.elements, i = 0, r = s.length; r > i; i++)
				if (n = s[i], n.name === e.name && n.value === e.value) return n
		}
	}.call(this),
	function() {
		$(document).on("change", ".js-issues-list-check", function() {
			$("#js-issues-toolbar").toggleClass("triage-mode", $(".js-issues-list-check:checked").length > 0)
		}), $(document).on("change", ".js-issues-list-check", function() {
			var t;
			t = $(".js-issues-list-check:checked"), $("#js-issues-toolbar .js-issues-toolbar-triage .js-select-menu").data("contents-data", t).addClass("js-load-contents")
		}), $(document).on("selectmenu:selected", ".js-issues-toolbar-triage .js-navigation-item", function() {
			var t, e, n, i, r, s;
			n = $(this).closest(".js-menu-container").hasClass("js-label-select-menu"), t = $(this).closest("form"), r = $(this).hasClass("selected"), i = $(this).attr("data-name"), s = $(this).attr("data-value"), e = n ? $("<input>", {
				type: "hidden",
				name: i + "[" + s + "]",
				value: r ? "1" : "0"
			}) : $("<input>", {
				type: "hidden",
				name: i,
				value: r ? s : ""
			}), setImmediate(function(t) {
				return function() {
					return $(t).menu("deactivate")
				}
			}(this)), t.find(".js-issues-triage-fields").append(e), t.addClass("will-submit")
		}), $(document).on("menu:deactivate", ".js-issues-toolbar-triage .js-menu-container", function(t) {
			var e, n;
			(e = this.querySelector("form.will-submit")) && (this.classList.add("is-loading"), n = $.fetchJSON(e.getAttribute("action"), {
				method: e.getAttribute("method"),
				body: $.param($(e).serializeArray()),
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				}
			}), n.then(function(t) {
				return function(e) {
					var n, i, r;
					return r = $.fetchPoll(e.job.url, {
						headers: {
							accept: "application/json"
						}
					}), n = function() {
						return $(t).menu("deactivate"), location.reload()
					}, i = function() {
						return t.classList.add("has-error")
					}, r.then(n, i)
				}
			}(this)), e.classList.remove("will-submit"), t.preventDefault())
		})
	}.call(this),
	function() {
		var t;
		t = function() {
			var t;
			return t = "/site/keyboard_shortcuts?url=" + window.location.pathname, $.facebox(function() {
				return $.fetchText(t).then(function(t) {
					return $.facebox(t, "shortcuts")
				})
			})
		}, $(document).on("click", ".js-keyboard-shortcuts", function() {
			return t(), !1
		}), $(document).on("click", ".js-see-all-keyboard-shortcuts", function() {
			return this.remove(), $(".facebox .js-hidden-pane").css("display", "table-row-group"), !1
		}), $(document).on("keypress", function(e) {
			return e.target === document.body && 63 === e.which ? ($(".facebox").is($.visible) ? $.facebox.close() : t(), !1) : void 0
		})
	}.call(this), DateInput = function(t) {
		function e(n, i) {
			"object" != typeof i && (i = {}), t.extend(this, e.DEFAULT_OPTS, i), this.input = t(n), this.bindMethodsToObj("show", "hide", "hideIfClickOutside", "keydownHandler", "selectDate"), this.build(), this.selectDate(), this.show(), this.input.hide(), this.input.data("datePicker", this)
		}
		return e.DEFAULT_OPTS = {
			month_names: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			short_month_names: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			short_day_names: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
			start_of_week: 1
		}, e.prototype = {
			build: function() {
				var e = t('<p class="month_nav"><span class="date-button prev" title="[Page-Up]">\u25c0</span> <span class="month-name"></span> <span class="date-button next" title="[Page-Down]">\u25b6</span></p>');
				this.monthNameSpan = t(".month-name", e), t(".prev", e).click(this.bindToObj(function() {
					this.moveMonthBy(-1)
				})), t(".next", e).click(this.bindToObj(function() {
					this.moveMonthBy(1)
				}));
				var n = t('<p class="year_nav"><span class="date-button prev" title="[Ctrl+Page-Up]">\u25c0</span> <span class="year-name"></span> <span class="date-button next" title="[Ctrl+Page-Down]">\u25b6</span></p>');
				this.yearNameSpan = t(".year-name", n), t(".prev", n).click(this.bindToObj(function() {
					this.moveMonthBy(-12)
				})), t(".next", n).click(this.bindToObj(function() {
					this.moveMonthBy(12)
				}));
				var i = t("<div></div>").append(e, n),
					r = "<table><thead><tr>";
				t(this.adjustDays(this.short_day_names)).each(function() {
					r += "<th>" + this + "</th>"
				}), r += "</tr></thead><tbody></tbody></table>", this.dateSelector = this.rootLayers = t('<div class="date_selector"></div>').append(i, r).insertAfter(this.input), this.tbody = t("tbody", this.dateSelector), this.input.change(this.bindToObj(function() {
					this.selectDate()
				})), this.selectDate()
			},
			selectMonth: function(e) {
				var n = new Date(e.getFullYear(), e.getMonth(), 1);
				if (!this.currentMonth || this.currentMonth.getFullYear() != n.getFullYear() || this.currentMonth.getMonth() != n.getMonth()) {
					this.currentMonth = n;
					for (var i = this.rangeStart(e), r = this.rangeEnd(e), s = this.daysBetween(i, r), a = "", o = 0; s >= o; o++) {
						var c = new Date(i.getFullYear(), i.getMonth(), i.getDate() + o, 12, 0);
						this.isFirstDayOfWeek(c) && (a += "<tr>"), a += c.getMonth() == e.getMonth() ? '<td class="selectable_day" date="' + this.dateToString(c) + '">' + c.getDate() + "</td>" : '<td class="unselected_month" date="' + this.dateToString(c) + '">' + c.getDate() + "</td>", this.isLastDayOfWeek(c) && (a += "</tr>")
					}
					this.tbody.empty().append(a), this.monthNameSpan.empty().append(this.monthName(e)), this.yearNameSpan.empty().append(this.currentMonth.getFullYear()), t(".selectable_day", this.tbody).mousedown(this.bindToObj(function(e) {
						this.changeInput(t(e.target).attr("date"))
					})), t("td[date='" + this.dateToString(new Date) + "']", this.tbody).addClass("today"), t("td.selectable_day", this.tbody).mouseover(function() {
						t(this).addClass("hover")
					}), t("td.selectable_day", this.tbody).mouseout(function() {
						t(this).removeClass("hover")
					})
				}
				t(".selected", this.tbody).removeClass("selected"), t('td[date="' + this.selectedDateString + '"]', this.tbody).addClass("selected")
			},
			selectDate: function(t) {
				"undefined" == typeof t && (t = this.stringToDate(this.input.val())), t || (t = new Date), this.selectedDate = t, this.selectedDateString = this.dateToString(this.selectedDate), this.selectMonth(this.selectedDate)
			},
			resetDate: function() {
				t(".selected", this.tbody).removeClass("selected"), this.changeInput("")
			},
			changeInput: function(t) {
				this.input.val(t).change(), this.hide()
			},
			show: function() {
				this.rootLayers.css("display", "block"), t([window, document.body]).click(this.hideIfClickOutside), this.input.unbind("focus", this.show), this.rootLayers.keydown(this.keydownHandler), this.setPosition()
			},
			hide: function() {},
			hideIfClickOutside: function(t) {
				t.target == this.input[0] || this.insideSelector(t) || this.hide()
			},
			insideSelector: function(e) {
				return $target = t(e.target), $target.parents(".date_selector").length || $target.is(".date_selector")
			},
			keydownHandler: function(t) {
				switch (t.keyCode) {
					case 9:
					case 27:
						return void this.hide();
					case 13:
						this.changeInput(this.selectedDateString);
						break;
					case 33:
						this.moveDateMonthBy(t.ctrlKey ? -12 : -1);
						break;
					case 34:
						this.moveDateMonthBy(t.ctrlKey ? 12 : 1);
						break;
					case 38:
						this.moveDateBy(-7);
						break;
					case 40:
						this.moveDateBy(7);
						break;
					case 37:
						this.moveDateBy(-1);
						break;
					case 39:
						this.moveDateBy(1);
						break;
					default:
						return
				}
				t.preventDefault()
			},
			stringToDate: function(t) {
				var e;
				return (e = t.match(/^(\d{1,2}) ([^\s]+) (\d{4,4})$/)) ? new Date(e[3], this.shortMonthNum(e[2]), e[1], 12, 0) : null
			},
			dateToString: function(t) {
				return t.getDate() + " " + this.short_month_names[t.getMonth()] + " " + t.getFullYear()
			},
			setPosition: function() {
				var t = this.input.offset();
				this.rootLayers.css({
					top: t.top + this.input.outerHeight(),
					left: t.left
				}), this.ieframe && this.ieframe.css({
					width: this.dateSelector.outerWidth(),
					height: this.dateSelector.outerHeight()
				})
			},
			moveDateBy: function(t) {
				var e = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), this.selectedDate.getDate() + t);
				this.selectDate(e)
			},
			moveDateMonthBy: function(t) {
				var e = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth() + t, this.selectedDate.getDate());
				e.getMonth() == this.selectedDate.getMonth() + t + 1 && e.setDate(0), this.selectDate(e)
			},
			moveMonthBy: function(t) {
				var e = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + t, this.currentMonth.getDate());
				this.selectMonth(e)
			},
			monthName: function(t) {
				return this.month_names[t.getMonth()]
			},
			bindToObj: function(t) {
				var e = this;
				return function() {
					return t.apply(e, arguments)
				}
			},
			bindMethodsToObj: function() {
				for (var t = 0; t < arguments.length; t++) this[arguments[t]] = this.bindToObj(this[arguments[t]])
			},
			indexFor: function(t, e) {
				for (var n = 0; n < t.length; n++)
					if (e == t[n]) return n
			},
			monthNum: function(t) {
				return this.indexFor(this.month_names, t)
			},
			shortMonthNum: function(t) {
				return this.indexFor(this.short_month_names, t)
			},
			shortDayNum: function(t) {
				return this.indexFor(this.short_day_names, t)
			},
			daysBetween: function(t, e) {
				return t = Date.UTC(t.getFullYear(), t.getMonth(), t.getDate()), e = Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()), (e - t) / 864e5
			},
			changeDayTo: function(t, e, n) {
				var i = n * (Math.abs(e.getDay() - t - 7 * n) % 7);
				return new Date(e.getFullYear(), e.getMonth(), e.getDate() + i)
			},
			rangeStart: function(t) {
				return this.changeDayTo(this.start_of_week, new Date(t.getFullYear(), t.getMonth()), -1)
			},
			rangeEnd: function(t) {
				return this.changeDayTo((this.start_of_week - 1) % 7, new Date(t.getFullYear(), t.getMonth() + 1, 0), 1)
			},
			isFirstDayOfWeek: function(t) {
				return t.getDay() == this.start_of_week
			},
			isLastDayOfWeek: function(t) {
				return t.getDay() == (this.start_of_week - 1) % 7
			},
			adjustDays: function(t) {
				for (var e = [], n = 0; n < t.length; n++) e[n] = t[(n + this.start_of_week) % 7];
				return e
			}
		}, e
	}(jQuery),
	function() {
		$.observe("input.js-date-input", function() {
			$(this).next(".date_selector").remove(), new DateInput(this)
		}), $(document).on("click", ".js-date-input-clear", function() {
			return $("input.js-date-input").data("datePicker").resetDate(), !1
		}), $(document).on("change click", ".js-milestone-edit-form", function() {
			var t;
			t = this.querySelector(".js-milestone-edit-cancel"), $(this).hasDirtyFields() ? t.setAttribute("data-confirm", t.getAttribute("data-confirm-changes")) : t.removeAttribute("data-confirm")
		})
	}.call(this),
	function() {
		var t, e;
		t = function(t) {
			return t.classList.contains("read") ? void 0 : (t.classList.toggle("unread"), t.classList.toggle("read"))
		}, e = function(t) {
			return t.classList.contains("unread") ? void 0 : (t.classList.toggle("unread"), t.classList.toggle("read"))
		}, $(document).on("click", ".js-notification-target", function(e) {
			return e.which > 1 ? void 0 : t(this.closest(".js-notification"))
		}), $(document).on("ajaxSuccess", ".js-delete-notification", function() {
			return t(this.closest(".js-notification"))
		}), $(document).on("ajaxSuccess", ".js-mute-notification", function() {
			var e;
			return t(this.closest(".js-notification")), e = this.closest(".js-notification"), this.action = e.classList.contains("muted") ? this.action.replace("unmute", "mute") : this.action.replace("mute", "unmute"), e.classList.toggle("muted")
		}), $(document).on("ajaxSuccess", ".js-unmute-notification", function() {
			var t;
			return t = this.closest(".js-notification"), this.action = t.classList.contains("muted") ? this.action.replace("unmute", "mute") : this.action.replace("mute", "unmute"), t.classList.toggle("muted")
		}), $(document).on("ajaxSuccess", ".js-mark-visible-as-read", function() {
			var t, e, n, i, r, s, a;
			for (t = this.closest(".js-notifications-browser"), r = t.querySelectorAll(".unread"), n = 0, i = r.length; i > n; n++) e = r[n], e.classList.remove("unread"), e.classList.add("read");
			return null != (s = t.querySelector(".js-mark-visible-as-read")) && s.classList.add("mark-all-as-read-confirmed"), null != (a = t.querySelector(".js-mark-as-read-confirmation")) ? a.classList.add("mark-all-as-read-confirmed") : void 0
		}), $(document).on("ajaxSuccess", ".js-mark-remaining-as-read", function() {
			var t, e, n;
			return t = this.closest(".js-notifications-browser"), null != (e = t.querySelector(".js-mark-remaining-as-read")) && e.classList.add("hidden"), null != (n = t.querySelector(".js-mark-remaining-as-read-confirmation")) ? n.classList.remove("hidden") : void 0
		}), $(document).on("navigation:keydown", ".js-notification", function(t) {
			switch (t.hotkey) {
				case "I":
				case "e":
				case "y":
					return $(this).find(".js-delete-notification").submit(), !1;
				case "M":
				case "m":
					return $(this).find(".js-mute-notification").submit(), !1
			}
		}), $(document).on("navigation:keyopen", ".js-notification", function() {
			return t(this)
		}), $(document).on("ajaxBeforeSend", ".js-notifications-subscription", function() {
			return this.querySelector(".js-spinner").classList.remove("hidden")
		}), $(document).on("ajaxComplete", ".js-notifications-subscription", function() {
			return this.querySelector(".js-spinner").classList.add("hidden")
		})
	}.call(this),
	function() {
		$(document).on("click", ".js-oauth-org-access-details  .js-set-approval-state", function() {
			var t, e;
			return t = $(this).closest(".js-toggler-container"), e = {
				url: this.href,
				type: "PUT",
				success: function() {
					return t.removeClass("loading").toggleClass("on")
				}
			}, $.sudo().then(function() {
				return t.addClass("loading"), $.ajax(e)
			}), !1
		}), $(document).on("click", ".js-request-approval-facebox-button", function(t) {
			var e, n;
			return n = $(t.target).attr("data-request-button"), e = $(".js-" + n).closest(".js-toggler-container"), $.ajax({
				url: this.href,
				type: "POST",
				success: function() {
					return e.removeClass("loading").toggleClass("on"), $(document).trigger("close.facebox")
				}
			}), !1
		})
	}.call(this),
	function() {
		$(document).on("submit", ".org form[data-results-container]", function() {
			return !1
		})
	}.call(this),
	function() {
		var t, e;
		t = function() {
			return $(".js-invitation-toggle-team:checked").visible()
		}, e = function() {
			var e, n, i;
			e = $(".js-invitation-form"), i = "legacy-contributor" === e.attr("data-role"), n = !i || t().length > 0, $(".js-invitation-create").toggleClass("disabled", !n)
		}, $(document).on("click", ".js-invitations-team-suggestions-view-all", function() {
			return $.fetchText(this.href).then(function(e) {
				return function(n) {
					var i, r;
					return r = t().map(function() {
						return this.value
					}), i = $(e).closest("ul"), i.html(n), r.each(function() {
						return i.find(".js-invitation-toggle-team[value=" + this + "]").prop("checked", !0)
					})
				}
			}(this)), !1
		}), $(document).on("change", ".js-invitation-toggle-team", e), $.observe(".js-invitation-create", e)
	}.call(this),
	function() {
		var t, e, n, i;
		t = [], e = function() {
			var t, e, n;
			return t = $(".js-person-grid"), e = t.find(".js-org-person").has(".js-org-person-toggle:checked"),
				function() {
					var t, i, r;
					for (r = [], t = 0, i = e.length; i > t; t++) n = e[t], r.push($(n).attr("data-id"));
					return r
				}().sort()
		}, i = null, $(document).on("change", ".js-org-person-toggle", function() {
			var n, r, s, a;
			return n = $(".js-org-toolbar"), r = n.find(".js-member-selected-actions"), s = e(), a = s.length > 0, JSON.stringify(s) !== JSON.stringify(t) ? (t = s, n.find(".js-org-toolbar-select-all-label").toggleClass("has-selected-members", a), $(".js-member-not-selected-actions").toggleClass("hidden", a), r.toggleClass("hidden", !a), n.addClass("disabled"), null != i && i.abort(), i = $.ajax({
				url: r.attr("data-toolbar-actions-url"),
				data: {
					member_ids: s
				}
			}), i.done(function(t) {
				return r.html(t)
			}), i.always(function() {
				return n.removeClass("disabled")
			})) : void 0
		}), $(document).on("click", ".js-member-remove-confirm-button", function(t) {
			return t.preventDefault(), $.facebox(function() {
				var n;
				return n = $.ajax({
					url: $(t.target).attr("data-url"),
					data: {
						member_ids: e()
					}
				}), n.done(function(t) {
					return $.facebox(t)
				})
			})
		}), $(document).on("click", ".js-member-search-filter", function() {
			var t, e;
			return e = $(this).attr("data-filter"), t = $(".js-member-filter-field"), t.val(e + " "), t.focus(), t.trigger("throttled:input"), !1
		}), $(document).on("ajaxSend ajaxComplete", ".js-add-team-member-or-repo-form", function(t) {
			return this === t.target ? this.classList.toggle("is-sending", "ajaxSend" === t.type) : void 0
		}), n = navigator.userAgent.match(/Macintosh/) ? "meta" : "ctrl", $(document).onFocusedKeydown(".js-add-team-member-or-repo-form .js-autocomplete-field", function() {
			return function(t) {
				return "enter" === t.hotkey || t.hotkey === n + "+enter" ? t.preventDefault() : void 0
			}
		}), $(document).on("autocomplete:result", ".js-bulk-add-team-form .js-autocomplete-field", function(t) {
			var e, n;
			return n = this.getAttribute("data-autocompleted"), n.indexOf("/") > 0 ? (e = this.form.action, $.sudo().then(function() {
				return $.facebox(function() {
					var t;
					return t = $.ajax({
						url: e,
						method: "post",
						data: {
							member: n
						}
					}), t.done(function(t) {
						return $.facebox(t)
					})
				})
			}), t.stopPropagation()) : void 0
		}), $(document).on("autocomplete:result", ".js-add-team-member-or-repo-form", function() {
			var t, e;
			return t = this, e = function() {
				return $(t).submit()
			}, this.classList.contains("js-sudo-required") ? $.sudo().then(e) : setImmediate(e)
		}), $(document).on("ajaxSuccess", ".js-add-team-member-or-repo-form", function(t, e, n, i) {
			var r, s, a, o, c, u, l;
			if (r = $(i), s = $(".js-member-list"), this.querySelector(".js-autocomplete-field").value = "", l = r.attr("data-login"))
				for (u = s.children(), a = 0, c = u.length; c > a; a++)
					if (o = u[a], o.getAttribute("data-login") === l) return;
			return s.prepend(r), s.closest(".js-org-section").toggleClass("is-empty", !s.children().length)
		}), $(document).on("ajaxError", ".js-add-team-member-or-repo-form", function(t, e) {
			return /<html/.test(e.responseText) ? void 0 : ($(".js-member-list").before(e.responseText), !1)
		})
	}.call(this),
	function() {
		$(document).on("click", ".js-remove-person-from-org-button", function(t) {
			var e;
			return t.preventDefault(), e = $(t.target), $.facebox(function() {
				var t;
				return t = $.ajax({
					url: e.attr("data-url"),
					data: {
						member_ids: [e.attr("data-user-id")],
						redirect_to_path: e.attr("data-redirect-to-path")
					}
				}), t.done(function(t) {
					return $.facebox(t)
				})
			})
		})
	}.call(this),
	function() {
		var t, e, n, i, r;
		$(document).on("change", ".js-migrate-legacy-contributors-default-repository-permission-radio", function() {
			var t;
			return t = document.querySelector(".js-migrate-ability-list-item-default-repository-permission"), t.classList.toggle("migrate-ability-not-possible", e()), r()
		}), $(document).on("change", ".js-migrate-legacy-contributors-repository-creation-radio", function() {
			var t;
			return t = document.querySelector(".js-migrate-ability-list-item-members-can-create-repositories"), t.classList.toggle("migrate-ability-not-possible", n()), r()
		}), $(document).on("change", ".js-migrate-legacy-contributors-team-privacy-radio", function() {
			var t;
			return t = document.querySelector(".js-migrate-ability-list-item-team-privacy"), t.classList.toggle("migrate-ability-not-possible", i()), r()
		}), r = function() {
			var e;
			return e = document.querySelector(".js-save-member-privileges-button-container"), e.classList.toggle("member-privilege-radios-preserved", t())
		}, e = function() {
			return "" === document.querySelector(".js-migrate-legacy-contributors-default-repository-permission-radio:checked").value
		}, n = function() {
			return "0" === document.querySelector(".js-migrate-legacy-contributors-repository-creation-radio:checked").value
		}, i = function() {
			return "secret" === document.querySelector(".js-migrate-legacy-contributors-team-privacy-radio:checked").value
		}, t = function() {
			return e() && n() && i()
		}, $(function() {
			var t, e, n, i, s, a, o, c, u;
			return a = document.querySelector(".js-org-migration-settings-sidebar"), null != a ? (o = a.getBoundingClientRect(), c = 16, u = o.top + window.pageYOffset - c, e = a.style.position, n = a.style.top, t = a.style.left, i = a.style.width, s = $.debounce(function() {
				var r, s;
				return r = a.parentNode.getBoundingClientRect(), s = r.right - o.width, window.pageYOffset >= u ? (a.style.position = "fixed", a.style.top = c + "px", a.style.left = s + "px", a.style.width = "250px") : (a.style.position = e, a.style.top = n, a.style.left = t, a.style.width = i)
			}, 5), window.addEventListener("scroll", s), window.addEventListener("resize", s), r()) : void 0
		})
	}.call(this),
	function() {
		var t;
		$(document).on("throttled:input", ".js-rename-owners-team-input", function() {
			var e, n, i;
			return e = this.closest("form"), n = this.value.trim().toLowerCase(), "owners" === n || "" === n ? t(!1, "") : (e.classList.add("is-sending"), i = $.get(this.getAttribute("data-check-url"), {
				name: n
			}), i.done(function(n) {
				var i;
				return n = n.trim(), i = "" === n, e.classList.remove("is-sending"), t(i, n)
			}))
		}), t = function(t, e) {
			return document.querySelector(".js-rename-owners-team-button").classList.toggle("disabled", !t), document.querySelector(".js-rename-owners-team-errors").innerHTML = e, document.querySelector(".js-rename-owners-team-note").classList.toggle("hidden", "" !== e)
		}
	}.call(this),
	function() {
		var t;
		$(document).on("change", ".js-migrate-legacy-contributors-repository-creation-checkbox", function() {
			return this.classList.add("disabled"), this.form.classList.remove("success"), $(this.form).trigger("submit")
		}), $(document).on("ajaxComplete", ".js-migrate-legacy-contributors-members-can-create-repositories-form", function() {
			var t;
			return t = this.querySelector(".js-migrate-legacy-contributors-repository-creation-checkbox"), t.classList.remove("disabled")
		}), $(document).on("ajaxSuccess", ".js-migrate-legacy-contributors-members-can-create-repositories-form", function() {
			var t, e;
			return this.classList.add("success"), t = this.querySelector(".js-migrate-legacy-contributors-repository-creation-checkbox"), e = document.querySelector(".js-migrate-ability-list-item-members-can-create-repositories"), e.classList.toggle("migrate-ability-not-possible", !t.checked)
		}), $(document).on("ajaxSend", ".js-migrate-legacy-contributor-form", function() {
			return this.closest(".js-migrate-legacy-contributor-container").classList.add("loading")
		}), $(document).on("ajaxError", ".js-migrate-legacy-contributor-form", function() {
			var t;
			return t = this.closest(".js-migrate-legacy-contributor-container"), t.classList.remove("loading")
		}), $(document).on("ajaxSuccess", ".js-migrate-legacy-contributor-form", function() {
			var e, n;
			return e = this.closest(".js-migrate-legacy-contributor-container"), e.classList.remove("loading"), n = this.closest(".js-migrate-legacy-contributor-row"), $(n).on("transitionend webkitTransitionEnd oTransitionEnd", function() {
				return n.remove(), e.querySelector(".js-migrate-legacy-contributor-row, .js-migrate-more-legacy-contributors-container") ? void 0 : document.location.href = e.getAttribute("data-empty-url")
			}), n.classList.add("hide-legacy-contributor"), t(document.querySelectorAll(".js-migrate-org-roles-legacy-contributors"), -1), "member" === this.getAttribute("data-role") ? t(document.querySelectorAll(".js-migrate-org-roles-members"), 1) : void 0
		}), t = function(t, e) {
			var n, i, r, s, a, o, c;
			for (c = [], i = 0, r = t.length; r > i; i++) n = t[i], s = parseInt(n.getAttribute("data-count"), 10) + e, n.setAttribute("data-count", s), n.querySelector(".js-count").textContent = s, o = 1 === s ? "data-singular" : "data-plural", a = n.querySelector(".js-pluralize"), c.push(a.textContent = a.getAttribute(o));
			return c
		}
	}.call(this),
	function() {
		$(document).onFocusedInput(".js-new-organization-name", function() {
			var t;
			return t = $(this).closest("dd").find(".js-field-hint-name"),
				function() {
					return t.text($(this).val())
				}
		}), $(document).on("click", ".js-org-creation-invitation-cancel", function(t) {
			var e, n;
			return t.preventDefault(), e = $(t.currentTarget), n = e.closest("li"), n.hide(), $.ajax({
				url: e.attr("href"),
				method: "DELETE"
			}).done(function() {
				return n.remove()
			}).fail(function() {
				return n.show(), alert("There was an error canceling the invitation.")
			})
		})
	}.call(this),
	function() {
		$(document).on("click", ".js-repo-search-filter", function() {
			var t, e, n, i, r;
			return e = $(this).attr("data-filter"), n = $(this).attr("data-negate"), t = $(".js-repo-filter-field"), i = t.val(), i.indexOf(n) > -1 && (i = i.replace(n, ""), i = i.replace(/^\s*/, "")), -1 === i.indexOf(e) && (r = i && i.match(/\s$/) ? "" : " ", t.val(i + ("" + r + e + " ")), t.focus(), t.trigger("throttled:input")), $("body").removeClass("menu-active"), !1
		}), $(document).on("keypress", ".js-repository-fallback-search", function(t) {
			var e, n, i, r;
			if (13 === t.which) return e = $(this), n = e.attr("data-host"), i = e.attr("data-org"), r = e.val(), document.location = "http://" + n + "/search?q=user%3A" + i + "+" + r + "&type=Repositories"
		}), $(document).on("click", ".js-team-repo-higher-access", function(t) {
			return t.preventDefault(), $.facebox(function() {
				var e;
				return e = $.ajax({
					url: $(t.target).attr("data-url")
				}), e.done(function(t) {
					return $.facebox(t)
				})
			})
		})
	}.call(this),
	function() {
		$(document).on("selectmenu:selected", ".js-select-repo-permission .js-navigation-item", function() {
			var t, e, n, i, r;
			return t = $(this), r = t.parents(".js-select-repo-permission"), e = t.attr("data-level-text"), n = r.find(".js-menu-target"), i = t.parents(".js-org-repo"), r.addClass("is-updating"), r.removeClass("was-successful"), $.ajax({
				url: r.attr("data-url"),
				method: "PUT",
				data: {
					permission: t.attr("data-ref"),
					fork_count: i.find(".js-org-repo-forked").attr("data-repo-fork-count")
				},
				success: function(t) {
					return n.text(e), r.removeClass("is-updating"), r.addClass("was-successful"), i.toggleClass("with-higher-access", t.members_with_higher_access)
				},
				error: function() {
					return alert("There was an error changing permission.")
				}
			})
		})
	}.call(this),
	function() {
		var t, e;
		$(document).on("change", ".js-team-repositories-list-check", function() {
			var t, n, i, r;
			$("#js-team-repositories-toolbar").toggleClass("triage-mode", $(".js-team-repositories-list-check:checked").length > 0), t = function() {
				var t, e, n, i;
				for (n = document.querySelectorAll(".js-team-repositories-list-check"), i = [], t = 0, e = n.length; e > t; t++) r = n[t], r.checked && i.push(r);
				return i
			}(), n = function() {
				var t, e, n, i;
				for (n = document.querySelectorAll(".js-has-repo-admin"), i = [], t = 0, e = n.length; e > t; t++) r = n[t], r.checked && i.push(r);
				return i
			}(), i = document.querySelector(".js-bulk-update-team-repo-permissions .js-menu-target"), i.classList.toggle("disabled", n.length < t.length), e()
		}), $(document).on("selectmenu:selected", ".js-bulk-update-team-repo-permissions .js-navigation-item", function() {
			var t, e, n, i;
			t = $(this).closest("form"), n = $(this).hasClass("selected"), i = $(this).attr("data-value"), e = $("<input>", {
				type: "hidden",
				name: "permission",
				value: n ? i : ""
			}), setImmediate(function(t) {
				return function() {
					return $(t).menu("deactivate")
				}
			}(this)), t.find(".js-team-repos-triage-fields").append(e), t.submit()
		}), $(document).on("menu:deactivate", ".js-bulk-update-team-repo-permissions .js-menu-container", function(t) {
			var e;
			(e = this.querySelector("form.will-submit")) && ($(this).menu("deactivate"), e.classList.remove("will-submit"), t.preventDefault())
		}), e = function() {
			var t, e;
			t = function() {
				var t, n, i, r;
				for (i = $(".js-team-repositories-list-check:checked"), r = [], t = 0, n = i.length; n > t; t++) e = i[t], r.push(e.value);
				return r
			}(), $(".js-bulk-selected-items").val(t)
		}, $(document).on("ajaxSuccess", ".js-bulk-update-team-repo-permissions", function() {
			return window.location.reload()
		}), $(document).on("ajaxError", ".js-bulk-update-team-repo-permissions", function() {
			return window.location.reload()
		}), $(document).on("ajaxSuccess", ".js-bulk-remove-team-repository", function() {
			return window.location.reload()
		}), $(document).on("ajaxError", ".js-bulk-remove-team-repository", function() {
			return window.location.reload()
		}), t = function() {
			var t;
			return t = $(".js-team-repositories-list-check").length > 0, $("#js-team-repositories-toolbar .js-check-all").toggle(t)
		}, $(document).ready(t)
	}.call(this),
	function() {
		$(document).on("click", ".js-delete-team-button", function() {
			var t;
			return t = $(this), t.attr("disabled", "disabled"), $.ajax({
				url: t.attr("data-url"),
				type: "delete"
			}), !1
		})
	}.call(this),
	function() {
		$(document).on("ajaxSend", ".js-ldap-import-groups-container", function(t, e) {
			return e.setRequestHeader("X-Context", "import")
		}), $(document).on("autocomplete:autocompleted:changed", ".js-team-ldap-group-field", function() {
			var t;
			return t = $(this).closest(".js-ldap-group-adder").removeClass("is-exists"), t.find(".js-ldap-group-adder-button").toggleClass("disabled", !$(this).attr("data-autocompleted"))
		}), $(document).on("navigation:open", ".js-team-ldap-group-autocomplete-results .js-navigation-item", function() {
			var t, e;
			return t = $(this).closest(".js-ldap-group-adder"), e = $(this).attr("data-dn"), t.find(".js-team-ldap-dn-field").val(e), $(this).closest(".js-ldap-import-groups-container").find(".js-ldap-group-dn").map(function(n, i) {
				$(i).text() === e && (t.addClass("is-exists"), t.find(".js-ldap-group-adder-button").addClass("disabled"))
			})
		}), $(document).on("ajaxBeforeSend", ".js-import-container", function() {
			var t;
			return t = $(this).find(".js-ldap-group-adder-button"), t.hasClass("disabled") ? !1 : ($(this).addClass("is-importing"), t.addClass("disabled"))
		}), $(document).on("ajaxComplete", ".js-import-container", function() {
			return $(this).removeClass("is-importing")
		}), $(document).on("ajaxSuccess", ".js-ldap-group-adder", function(t, e, n, i) {
			return $(this).closest(".js-ldap-import-groups-container").removeClass("is-empty").find(".js-ldap-imported-groups").prepend($(i)), this.reset(), $(this).find(".js-team-ldap-group-field").focus(), $(this).find(".js-ldap-group-adder-button").addClass("disabled"), $(".js-import-form-actions").removeClass("hidden")
		}), $(document).on("click", ".js-team-remove-group", function(t) {
			return $(this).hasClass("disabled") ? !1 : (t.preventDefault(), $(this).addClass("disabled").closest(".js-team").addClass("is-removing"), $(".js-team-ldap-group-field").focus())
		}), $(document).on("ajaxSuccess", ".js-team-remove-group", function() {
			return $(this).closest(".js-team").remove(), 0 === $(".js-team:not(.is-removing)").length ? ($(".js-ldap-import-groups-container").addClass("is-empty"), $(".js-import-form-actions").addClass("hidden")) : void 0
		}), $(document).on("ajaxError", ".js-team-remove-group", function() {
			return $(this).removeClass("disabled").closest(".js-team").removeClass("is-removing")
		}), $(document).on("click", ".js-edit-team", function(t) {
			return $(this).closest(".js-team").hasClass("is-removing") ? !1 : (t.preventDefault(), $(this).closest(".js-team").addClass("is-editing"), $(this).closest(".js-team").find(".js-team-name-field").focus())
		}), $(document).on("click", ".js-save-button", function() {
			return $(this).hasClass("disabled") ? !1 : $(this).closest(".js-team").addClass("is-sending")
		}), $(document).on("click", ".js-cancel-team-edit", function(t) {
			var e, n;
			return t.preventDefault(), n = $(this).closest(".js-team").removeClass("is-editing"), e = n.find(".js-team-form").removeClass("is-exists"), e.find(".js-slug").text(e.find(".js-slug").attr("data-original-slug")), e[0].reset()
		}), $(document).on("ajaxSuccess", ".js-team-form:not(.is-checking)", function(t, e, n, i) {
			return e.nameCheck ? void 0 : $(this).closest(".js-team").removeClass("is-editing").replaceWith($(i))
		}), $(document).on("ajaxSuccess", ".js-team-form.is-checking", function(t, e, n, i) {
			var r, s;
			return r = $(this).removeClass("is-checking"), "function" == typeof(s = r.find(".js-team-name-field")).removeData && s.removeData("autocheck-xhr"), i.error ? (r.find(".js-save-button").addClass("disabled"), "exists" === i.error ? (r.addClass("is-exists"), r.find(".js-slug").html(i.slug)) : void 0) : (r.find(".js-slug").html(i.slug), r.find(".js-save-button").removeClass("disabled"))
		}), $(document).on("ajaxError", ".js-team-form", function(t, e) {
			return e.nameCheck && "abort" === e.statusText ? !1 : void 0
		}), $(document).on("throttled:input", ".js-team-name-field", function() {
			var t, e, n, i;
			return e = $(this), t = e.closest(".js-team-form"), null != (n = e.data("autocheck-xhr")) && n.abort(), t.removeClass("is-exists").addClass("is-checking"), t.find(".js-save-button").addClass("disabled"), i = $.ajax({
				url: e.attr("data-check-url"),
				type: "GET",
				context: this,
				data: {
					name: this.value
				}
			}), i.nameCheck = !0, e.data("autocheck-xhr", i)
		})
	}.call(this),
	function() {
		$(document).on("click", ".js-show-own-teams", function() {
			var t, e, n, i;
			return t = $(".js-team-search-field"), i = t.val(), n = $(this).attr("data-me"), -1 === i.indexOf("@" + n) && (e = i ? " " : "", t.val("" + i + e + "@" + n), t.focus(), t.trigger("throttled:input")), !1
		})
	}.call(this),
	function() {
		var t;
		t = function(t, e, n) {
			var i, r;
			return t.addClass("is-sending"), i = t.find(".team-name-octicon"), i.attr("class", "hidden octicon team-name-octicon"), r = $.get(e.attr("data-check-url"), {
				name: n
			}), r.done(function(r) {
				var s, a, o, c, u;
				return t.removeClass("is-sending"), t.find(".js-team-name-errors").html(r ? r : ""), o = null != (c = e.attr("data-original")) ? c.trim() : void 0, a = o && n === o, s = !!t.find(".js-error").length, u = (s || !n) && !a, u ? t.find(".js-create-team-button").attr("disabled", "disabled") : t.find(".js-create-team-button").removeAttr("disabled"), s ? i.attr("class", "octicon team-name-octicon octicon-alert") : n ? i.attr("class", "octicon team-name-octicon octicon-check") : void 0
			})
		}, $(document).on("throttled:input", ".js-new-team", function() {
			var e, n;
			return n = $(this), e = n.closest("form"), t(e, n, n.val().trim())
		}), $(document).ready(function() {
			var e, n;
			return $(".js-new-org-team").length > 0 && (e = $("#team-name"), n = e.val().trim()) ? t($(".org-team-form"), e, n) : void 0
		})
	}.call(this),
	function() {
		$(document).on("submit", ".js-remove-team-members-form", function() {
			return $.sudo().then(function(t) {
				return function() {
					var e;
					return e = $(t), $.fetch(e.attr("action"), {
						method: "post",
						body: e.serialize(),
						headers: {
							"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
						}
					}).then(function() {
						var t;
						return t = e.closest(".js-org-section"), e.closest(".js-edit-team-member").remove(), t.toggleClass("is-empty", !t.find(".js-org-list").children().length)
					})
				}
			}(this)), !1
		}), $(document).on("ajaxSuccess", ".js-remove-team-repository", function() {
			var t, e;
			return e = $(this), t = e.closest(".js-org-section"), e.closest(".js-org-repo").remove(), t.toggleClass("is-empty", !t.find(".js-org-list").children().length)
		}), $(document).on("click", ".js-team-description-toggle", function() {
			return $(".js-description-toggler").toggleClass("on")
		}), $(document).on("ajaxComplete", ".js-team-description-form", function() {
			var t;
			return t = $(".js-team-description-field").val(), $(".js-description-toggler").toggleClass("on"), t.trim() ? $(".js-team-description .description").text(t) : $(".js-team-description .description").html("<span class='link'>This team has no description</span>")
		}), $(document).on("ajaxSuccess", ".js-add-team-members-form", function(t, e, n, i) {
			var r;
			return r = $(document).find(".js-member-listings-container"), $(document).trigger("close.facebox"), r.html(i)
		}), $(document).on("click", ".js-rename-owners-team-next-btn", function() {
			return document.querySelector(".js-rename-owners-team-about-content").classList.toggle("migrate-owners-content-hidden"), document.querySelector(".js-rename-owners-team-rename-form").classList.toggle("migrate-owners-content-hidden")
		})
	}.call(this),
	function() {
		$.observe(".js-org-transform-poller", function() {
			var t;
			t = this.getAttribute("data-redirect-url"), this.addEventListener("load", function() {
				return window.location.href = t
			})
		})
	}.call(this),
	function() {
		$(function() {
			var t;
			return $("#load-readme").click(function() {
				var e, n, i, r, s, a;
				return n = $("#gollum-editor-body"), e = $("#editor-body-buffer"), r = $("#undo-load-readme"), a = e.text(), t(n, e), i = $(this), i.prop("disabled", !0), i.text(i.attr("data-readme-name") + " loaded"), r.show(), s = function() {
					return $(this).val() !== a && r.hide(), n.off("change keyup", s)
				}, n.on("change keyup", s), !1
			}), $("#undo-load-readme").click(function() {
				var e;
				return t($("#gollum-editor-body"), $("#editor-body-buffer")), e = $("#load-readme"), e.prop("disabled", !1), e.text("Load " + e.attr("data-readme-name")), $(this).hide(), !1
			}), t = function(t, e) {
				var n, i, r;
				return n = $(t), i = $(e), r = n.val(), n.val(i.text()), i.text(r)
			}
		})
	}.call(this),
	function() {
		$(document).on("ajaxSuccess", ".js-cleanup-pull-request", function(t, e, n, i) {
			var r, s, a;
			s = i.updateContent;
			for (a in s) r = s[a], $(a).updateContent(r)
		}), $(document).on("ajaxError", ".js-cleanup-pull-request", function(t, e) {
			return $(this).addClass("error"), $(this).closest(".js-deletable-state").removeClass("mergeable-merged").addClass("mergeable-error"), e.responseText && $(this).find(".js-cleanup-error-message").html(e.responseText), !1
		})
	}.call(this),
	function() {
		$(document).on("click", ".js-merge-branch-action", function(t) {
			var e, n;
			n = $(this), e = n.closest(".js-merge-pr"), n.fire("details:toggle", {
				relatedTarget: t.target
			}, function() {}), e.performTransition(function() {
				this.toggleClass("open"), this.fire("details:toggled", {
					relatedTarget: t.target,
					async: !0
				})
			}), t.preventDefault()
		})
	}.call(this),
	function() {
		$(document).on("details:toggled", ".js-pull-merging", function() {
			var t;
			return t = $(this).find(".js-merge-pull-request"), t.toggleClass("is-dirty", t.is($.visible))
		}), $(document).on("ajaxSuccess", ".js-merge-pull-request", function(t, e, n, i) {
			var r, s, a;
			this.reset(), $(this).removeClass("is-dirty"), s = i.updateContent;
			for (a in s) r = s[a], $(a).updateContent(r)
		}), $(document).on("ajaxError", ".js-merge-pull-request", function(t, e) {
			return $(this).addClass("error"), $(this).closest(".js-mergable-state").removeClass("mergeable-clean").addClass("mergeable-error"), e.responseText && $(this).find(".js-merge-error-message").html(e.responseText), !1
		}), $(document).on("session:resume", function(t) {
			var e, n;
			return (n = document.getElementById(t.targetId)) ? (e = $(n).closest(".js-merge-pull-request"), e.closest(".js-details-container").addClass("open")) : void 0
		})
	}.call(this),
	function() {
		$(document).on("ajaxSuccess", ".js-toggle-resolve", function(t, e, n, i) {
			var r, s, a, o;
			(a = i.resolved) && (s = this.closest(".js-line-comments"), s.classList.toggle("is-resolved", a), s.classList.toggle("is-collapsed", a)), (o = i.diff_line) && $(this).closest(".js-inline-comments-container").prev().replaceWith(o), (r = i.actions) && $(this).closest(".js-comment-resolution").replaceWith(r)
		}), $(document).on("click", ".js-expand-resolved-timeline-review-comment-group", function() {
			var t;
			return t = this.closest(".js-discussion-item"), t.querySelector(".js-timeline-review-comment-group").classList.toggle("hidden"), t.querySelector(".js-timeline-resolved-comment-header").classList.toggle("hidden"), !1
		}), $(document).on("ajaxSuccess", ".js-discussion-item", function(t, e, n, i) {
			var r;
			return (r = i.review_comment_group) ? $(this).replaceWith(r) : void 0
		}), $(function() {
			var t, e, n;
			return n = document.location.hash, /^#discussion-diff/.test(n) ? (e = $(n), t = e.closest(".js-discussion-item"), t.find(".js-expand-resolved-timeline-review-comment-group:visible").click(), t.scrollTo()) : void 0
		})
	}.call(this),
	function() {
		var t;
		$.observeLast(".pull-request-ref-restore", "last"), t = function() {
			var t;
			return t = $("#js-pull-restorable").length, $(".pull-discussion-timeline").toggleClass("is-pull-restorable", t)
		}, $.observe("#js-pull-restorable", {
			add: t,
			remove: t
		}), $(document).on("ajaxSuccess", ".js-restore-head-ref", function(t, e, n, i) {
			var r, s, a;
			s = i.updateContent;
			for (a in s) r = s[a], $(a).updateContent(r)
		})
	}.call(this),
	function() {
		var t;
		t = function(t) {
			var e;
			return e = t.getAttribute("data-container-id"), document.getElementById(e)
		}, $(document).on("pjax:click", ".js-pull-request-tab", function(e, n) {
			return t(this) ? !1 : (n.push = !1, n.replace = !0)
		}), $(document).on("click", ".js-pull-request-tab", function(e) {
			var n, i, r, s, a;
			if (1 === e.which && !e.metaKey && !e.ctrlKey && (n = t(this))) {
				for (s = $(".js-pull-request-tab.selected"), i = 0, r = s.length; r > i; i++) a = s[i], $(a).removeClass("selected"), $(t(a)).removeClass("is-visible");
				return $(n).addClass("is-visible"), $(this).addClass("selected").blur(), $.support.pjax && window.history.replaceState($.pjax.state, "", this.href), !1
			}
		}), $(document).on("ajaxSuccess", "#discussion_bucket .js-inline-comment-form, #discussion_bucket .js-pull-request-review-comment-form", function() {
			return $("#files_bucket").remove()
		}), $(document).on("ajaxSuccess", "#files_bucket .js-inline-comment-form, #files_bucket .js-pull-request-review-comment-form", function() {
			return $("#discussion_bucket").remove()
		}), $(document).on("socket:message", ".js-pull-request-tabs", function() {
			$(this).ajax()
		}), $(document).on("ajaxSuccess", ".js-pull-request-tabs", function(t, e, n, i) {
			var r;
			return r = $($.parseHTML(i)), $(this).find("#commits_tab_counter").replaceWith(r.find("#commits_tab_counter")), $(this).find("#files_tab_counter").replaceWith(r.find("#files_tab_counter")), $(this).find("#diffstat").replaceWith(r.find("#diffstat"))
		}), $(document).on("socket:message", ".js-pull-request-stale-files", function() {
			return $("#files_bucket").addClass("is-stale")
		})
	}.call(this),
	function() {
		$(document).on("change", ".js-pulse-period", function(t) {
			var e;
			return e = $(t.target).attr("data-url"), $.pjax({
				url: e,
				container: "#js-repo-pjax-container"
			})
		})
	}.call(this),
	function() {
		$(document).on("navigation:open", ".js-create-branch", function() {
			return $(this).submit(), !1
		})
	}.call(this),
	function() {
		var t, e, n, i, r, s;
		$(document).on("click", ".js-release-remove-file", function() {
			var t;
			t = this.closest(".js-release-file"), t.classList.add("delete"), t.querySelector("input.destroy").value = "true"
		}), $(document).on("click", ".js-release-undo-remove-file", function() {
			var t;
			t = this.closest(".js-release-file"), t.classList.remove("delete"), t.querySelector("input.destroy").value = ""
		}), $(document).on("click", ".js-timeline-tags-expander", function() {
			return $(this).closest(".js-timeline-tags").removeClass("is-collapsed")
		}), n = ["is-default", "is-saving", "is-saved", "is-failed"], i = function(t, e) {
			return t.removeClass(n.join(" ")), t.addClass(e), "is-saving" === e ? t.attr("disabled", "disabled") : t.removeAttr("disabled")
		}, $(document).on("click", ".js-save-draft", function(t, n) {
			var r, s, a, o, c, u;
			return $("#release_draft").val("1"), r = $(this), o = r.closest("form"), a = $("#delete_release_confirm form"), c = o.attr("data-repo-url"), u = o.attr("action"), s = o.serialize(), i(r, "is-saving"), $.ajax({
				url: u,
				type: "POST",
				data: s,
				dataType: "json",
				success: function(t) {
					var s, u;
					return u = e("tag", c, t.tag_name), o.attr("action", u), a.attr("action", u), window.history.replaceState(null, document.title, e("edit", c, t.tag_name)), s = $("#release_id"), s.val() || (s.val(t.id), o.append('<input type="hidden" id="release_method" name="_method" value="put">')), i(r, "is-saved"), setTimeout(function() {
						return i(r, "is-default")
					}, 5e3), n ? n() : void 0
				},
				complete: function() {},
				error: function() {
					return i(r, "is-failed")
				}
			}), t.preventDefault()
		}), $(document).on("click", ".js-publish-release", function() {
			return $("#release_draft").val("0")
		}), s = ["is-loading", "is-empty", "is-valid", "is-invalid", "is-duplicate", "is-pending"], r = function(t) {
			var e;
			switch (t) {
				case "is-valid":
					$(".release-target-wrapper").addClass("hidden");
					break;
				case "is-loading":
					break;
				default:
					$(".release-target-wrapper").removeClass("hidden")
			}
			return e = $(".js-release-tag"), e.removeClass(s.join(" ")), e.addClass(t)
		}, t = function(t) {
			return t.val() && t.val() !== t.attr("data-last-checked") ? (r("is-loading"), $.ajax({
				url: t.attr("data-url"),
				type: "GET",
				data: {
					tag_name: t.val()
				},
				dataType: "json",
				success: function(e) {
					return "duplicate" === e.status && parseInt(t.attr("data-existing-id")) === parseInt(e.release_id) ? void r("is-valid") : ($(".js-release-tag .js-edit-release-link").attr("href", e.url), r("is-" + e.status))
				},
				error: function() {
					return r("is-invalid")
				},
				complete: function() {
					return t.attr("data-last-checked", t.val())
				}
			})) : void 0
		}, e = function(t, e, n) {
			return e + "/releases/" + t + "/" + n
		}, $(document).on("blur", ".js-release-tag-field", function() {
			return t($(this))
		}), $.observe(".js-release-tag-field", function() {
			t($(this))
		}), $(document).on("change", ".js-release-tag", function() {
			var t, e, n, i, r, s, a, o, c;
			if (n = $(this), t = n.closest("form"), e = t.find(".js-previewable-comment-form"), e.length) {
				for (i = e.data("base-preview-url"), i || (i = e.attr("data-preview-url"), i += i.indexOf("?") >= 0 ? "&" : "?", e.data("base-preview-url", i)), r = [], c = n.find('input[name="release[tag_name]"], input[name="release[target_commitish]"]:checked'), s = 0, o = c.length; o > s; s++) a = c[s], a.value && r.push({
					name: a.name,
					value: a.value
				});
				return e.attr("data-preview-url", i + $.param(r))
			}
		}), $.observe(".js-previewable-comment-form", function() {
			$(this).closest("form").find(".js-release-tag").trigger("change")
		})
	}.call(this),
	function() {
		var t, e = function(t, e) {
			return function() {
				return t.apply(e, arguments)
			}
		};
		t = function() {
			function t() {
				this.validate = e(this.validate, this), this.updateUpsell = e(this.updateUpsell, this), this.selectedPrivacyToggleElement = e(this.selectedPrivacyToggleElement, this), this.handlePrivacyChange = e(this.handlePrivacyChange, this), this.handleOwnerChange = e(this.handleOwnerChange, this), this.elements = {
					ownerContainer: $(".js-owner-container"),
					iconPreviewPublic: $(".js-icon-preview-public"),
					iconPreviewPrivate: $(".js-icon-preview-private"),
					upgradeUpsell: $("#js-upgrade-container").hide(),
					upgradeConfirmationCheckbox: $(".js-confirm-upgrade"),
					upsells: $(".js-upgrade"),
					privacyToggles: $(".js-privacy-toggle"),
					privateRadio: $(".js-privacy-toggle[value=false]"),
					publicRadio: $(".js-privacy-toggle[value=true]"),
					repoNameField: $("input[type=text].js-repo-name"),
					form: $("#new_repository"),
					licenseContainer: $(".js-license-container"),
					teamBoxes: $(".js-team-select"),
					suggestion: $(".js-reponame-suggestion")
				}, this.current_login = $("input[name=owner]:checked").prop("value"), this.privateRepo = !1, this.changedPrivacyManually = !1, this.elements.teamBoxes.hide(), this.elements.ownerContainer.on("change", "input[type=radio]", this.handleOwnerChange), this.elements.privacyToggles.on("change", function(t) {
					return function(e) {
						return t.handlePrivacyChange(e.targetElement, e)
					}
				}(this)), this.elements.upgradeUpsell.on("change input", "input", this.validate), this.elements.form.on("repoform:validate", this.validate), this.elements.suggestion.on("click", function(t) {
					return function(e) {
						var n;
						return n = t.elements.repoNameField, n.val($(e.target).text()), n.trigger("change")
					}
				}(this)), this.handleOwnerChange(), this.validate()
			}
			return t.prototype.handleOwnerChange = function() {
				var t, e;
				return this.current_login = $("input[name=owner]:checked").prop("value"), this.elements.repoNameField.trigger("change"), e = this.elements.ownerContainer.find(".select-menu-item.selected"), this.elements.teamBoxes.hide().find("input, select").prop("disabled", !0), t = this.elements.teamBoxes.filter("[data-login=" + this.current_login + "]"), t.show().find("input, select").prop("disabled", !1), this.changedPrivacyManually || ("private" === e.attr("data-default") ? this.elements.privateRadio.prop("checked", "checked").change() : this.elements.publicRadio.prop("checked", "checked").change()), "yes" === e.attr("data-permission") ? ($(".with-permission-fields").show(), $(".without-permission-fields").hide(), $(".errored").show(), $("dl.warn").show()) : ($(".with-permission-fields").hide(), $(".without-permission-fields").show(), $(".errored").hide(), $("dl.warn").hide()), this.updateUpsell(), this.handlePrivacyChange()
			}, t.prototype.handlePrivacyChange = function(t, e) {
				var n;
				return null == t && (t = this.selectedPrivacyToggleElement()), null == e && (e = null), e && !e.isTrigger && (this.changedPrivacyManually = !0), n = this.elements.upgradeUpsell.find(".js-billing-section"), "false" === t.val() ? (this.privateRepo = !0, this.elements.upgradeUpsell.show(), n.removeClass("has-removed-contents"), this.elements.upgradeUpsell.find("input[type=checkbox]").prop("checked", "checked"), this.elements.iconPreviewPublic.hide(), this.elements.iconPreviewPrivate.show()) : (this.privateRepo = !1, this.elements.upgradeUpsell.hide(), n.addClass("has-removed-contents"), this.elements.upgradeUpsell.find("input[type=checkbox]").prop("checked", null), this.elements.form.attr("action", this.elements.form.attr("data-url")), this.elements.iconPreviewPrivate.hide(), this.elements.iconPreviewPublic.show()), this.validate()
			}, t.prototype.selectedPrivacyToggleElement = function() {
				return this.elements.privateRadio.is(":checked") ? this.elements.privateRadio : this.elements.publicRadio
			}, t.prototype.updateUpsell = function() {
				var t;
				return t = this.elements.upsells.filter("[data-login=" + this.current_login + "]"), this.elements.upgradeUpsell.html(t)
			}, t.prototype.validate = function() {
				var t, e;
				return e = !0, this.elements.repoNameField.is(".is-autocheck-successful") || (e = !1), t = this.elements.upgradeUpsell.find("input[type=checkbox]"), this.privateRepo && t.length && !t.is(":checked") && (e = !1), this.elements.form.find("button.primary").prop("disabled", !e)
			}, t
		}(), $(function() {
			return $(".page-new-repo").length ? new t : void 0
		}), $(document).on("autocheck:send", "#repository_name", function(t) {
			var e, n, i;
			n = t.originalEvent.detail, e = $(this), i = e.closest("form").find("input[name=owner]:checked").val(), n.owner = i, e.trigger("repoform:validate")
		}), $(document).on("autocheck:complete", "#repository_name", function() {
			return $(this).trigger("repoform:validate")
		}), $(document).on("autocheck:success", "#repository_name", function(t) {
			var e, n, i, r;
			return e = JSON.parse(t.originalEvent.detail), i = this.value, i && i !== e.name ? (n = $(this).closest("dl.form"), n.addClass("warn"), r = $("<dd>").addClass("warning").text("Will be created as " + e.name), n.append(r)) : void 0
		})
	}.call(this),
	function() {
		$(document).on("reveal.facebox", function() {
			var t;
			return (t = document.querySelector("#facebox .js-fork-select-fragment")) ? t.setAttribute("src", t.getAttribute("data-url")) : void 0
		})
	}.call(this),
	function() {
		var t;
		t = function() {
			var t, e;
			return t = null != document.getElementById("js-show-full-navigation"), $(".repository-with-sidebar").toggleClass("with-full-navigation", t), t ? (e = $(".js-repo-nav").attr("data-issue-count-url"), $.fetchJSON(e).then(function(t) {
				return $(".js-issue-replace-counter").replaceWith(t.issues_count), $(".js-pull-replace-counter").replaceWith(t.pulls_count)
			})) : void 0
		}, $(function() {
			var e;
			return (e = document.getElementById("js-repo-pjax-container")) ? t(e) : void 0
		}), $(document).on("pjax:end", "#js-repo-pjax-container", function() {
			return t(this)
		}), $(document).on("pjax:clicked", ".js-directory-link", function() {
			return $(this).closest("tr").addClass("is-loading"), $(document.body).addClass("disables-context-loader")
		}), $(document).on("pjax:click", ".js-octicon-loaders a", function() {
			return $(this).addClass("is-loading"), $(document).one("pjax:end", function(t) {
				return function() {
					return $(t).removeClass("is-loading")
				}
			}(this))
		}), $(function() {
			var t;
			return t = $(".mini-nav, .repo-container .menu"), t.length ? $.each(t, function(t, e) {
				return new FastClick(e)
			}) : void 0
		})
	}.call(this),
	function() {
		var t;
		t = function() {
			return $(".js-repo-toggle-team:checked").visible()
		}, $(document).onFocusedInput(".js-repository-name", function() {
			var t, e, n;
			return e = /[^0-9A-Za-z_\-.]/g, n = $(".js-form-note"), t = $(".js-rename-repository-button"),
				function() {
					n.html("Will be renamed as <code>" + this.value.replace(e, "-") + "</code>"), e.test(this.value) ? n.show() : n.hide(), this.value && this.value !== $(this).attr("data-original-name") ? t.prop("disabled", !1) : t.prop("disabled", !0)
				}
		}), $(document).on("click", ".js-repo-team-suggestions-view-all", function() {
			return $.fetchText(this.href).then(function(e) {
				return function(n) {
					var i, r;
					return r = t().map(function() {
						return this.value
					}), i = $(e).closest("ul"), i.html(n), r.each(function() {
						return i.find(".js-repo-toggle-team[value=" + this + "]").prop("checked", !0)
					})
				}
			}(this)), !1
		})
	}.call(this),
	function() {
		$(document).on("pjax:end", function() {
			var t, e, n, i, r, s, a, o, c, u, l;
			if (l = $(document.head).find("meta[name='selected-link']").attr("value"), null != l)
				for (n = $(".js-sidenav-container-pjax .js-selected-navigation-item").removeClass("selected"), t = 0, r = n.length; r > t; t++)
					for (e = n[t], o = null != (c = $(e).attr("data-selected-links")) ? c : "", u = o.split(" "), i = 0, s = u.length; s > i; i++) a = u[i], a === l && $(e).addClass("selected")
		})
	}.call(this),
	function() {
		var t, e;
		t = function(t) {
			var e;
			return e = $(".js-site-search-form")[0], e.setAttribute("action", e.getAttribute("data-global-search-url")), $(".js-site-search").removeClass("repo-scope"), t.setAttribute("placeholder", t.getAttribute("data-global-scope-placeholder"))
		}, e = function(t) {
			var e;
			return e = $(".js-site-search-form")[0], e.setAttribute("action", e.getAttribute("data-repo-search-url")), $(".js-site-search").addClass("repo-scope"), t.setAttribute("placeholder", t.getAttribute("data-repo-scope-placeholder"))
		}, $(document).on("keyup", ".js-site-search-field", function(n) {
			var i;
			return i = this.value, "" === i && "backspace" === n.hotkey && this.classList.contains("is-clearable") && t(this), "" === i && "esc" === n.hotkey && e(this), this.classList.toggle("is-clearable", "" === i)
		}), $(document).on("focusout", ".js-site-search-focus", function() {
			this.closest(".js-chromeless-input-container").classList.remove("focus"), "" === this.value && this.classList.contains("js-site-search-field") && e(this)
		}), $(document).on("focusin", ".js-site-search-focus", function() {
			this.closest(".js-chromeless-input-container").classList.add("focus")
		})
	}.call(this),
	function() {
		$(document).on("ajaxSend", ".js-action-ldap-create", function() {
			return $(this).find(".btn-sm").addClass("disabled")
		}), $(document).on("ajaxError", ".js-action-ldap-create", function() {
			return !1
		}), $(document).on("ajaxComplete", ".js-action-ldap-create", function(t, e) {
			var n, i;
			return n = $(this), i = 500 === e.status ? "Oops, something went wrong." : e.responseText, n.find(".js-message").show().html(" &ndash; " + i), 200 === e.status && n.find(".btn").hide(), !1
		})
	}.call(this),
	function() {
		$(document).on("ajaxBeforeSend", ".js-auto-subscribe-toggle", function() {
			return $(this).find(".js-status-indicator").removeClass("status-indicator-success").removeClass("status-indicator-loading").addClass("status-indicator-loading")
		}), $(document).on("ajaxError", ".js-auto-subscribe-toggle", function() {
			return $(this).find(".js-status-indicator").removeClass("status-indicator-loading").addClass("status-indicator-failed")
		}), $(document).on("ajaxSuccess", ".js-auto-subscribe-toggle", function() {
			return $(this).find(".js-status-indicator").removeClass("status-indicator-loading").addClass("status-indicator-success")
		}), $(document).on("ajaxBeforeSend", ".js-unignore-form, .js-ignore-form", function() {
			return $(this).closest(".js-subscription-row").addClass("loading")
		}), $(document).on("ajaxError", ".js-unignore-form, .js-ignore-form", function() {
			return $(this).closest(".js-subscription-row").removeClass("loading"), $(this).find(".btn-sm").addClass("btn-danger").attr("title", "There was a problem unignoring this repo.")
		}), $(document).on("ajaxSuccess", ".js-unignore-form", function() {
			return $(this).closest(".js-subscription-row").removeClass("loading").addClass("unsubscribed")
		}), $(document).on("ajaxSuccess", ".js-ignore-form", function() {
			return $(this).closest(".js-subscription-row").removeClass("loading unsubscribed")
		}), $(document).on("ajaxBeforeSend", ".js-unsubscribe-form, .js-subscribe-form", function() {
			return $(this).closest(".js-subscription-row").addClass("loading")
		}), $(document).on("ajaxError", ".js-unsubscribe-form, .js-subscribe-form", function() {
			return $(this).closest(".js-subscription-row").removeClass("loading"), $(this).find(".btn-sm").addClass("btn-danger").attr("title", "There was a problem with unsubscribing :(")
		}), $(document).on("ajaxSuccess", ".js-unsubscribe-form", function() {
			return $(this).closest(".js-subscription-row").removeClass("loading").addClass("unsubscribed")
		}), $(document).on("ajaxSuccess", ".js-subscribe-form", function() {
			return $(this).closest(".js-subscription-row").removeClass("loading unsubscribed")
		}), $(document).on("ajaxSuccess", ".js-thread-subscription-status", function(t, e, n, i) {
			return $(".js-thread-subscription-status").updateContent(i)
		})
	}.call(this),
	function() {
		$(document).on("autocomplete:autocompleted:changed", ".js-team-add-user-name", function() {
			var t;
			return t = $(".js-team-add-user-button")[0], t.disabled = !$(this).attr("data-autocompleted")
		}), $(document).on("click", ".js-team-remove-user", function(t) {
			var e, n;
			return t.preventDefault(), $(".js-team-add-user-form").removeClass("hidden"), $(".js-team-add-user-name").focus(), e = $(this).closest("li").remove(), n = e.attr("data-login")
		}), $(document).on("click", ".js-team-add-user-button", function(t) {
			var e, n, i, r, s, a;
			if (t.preventDefault(), n = $(".js-team-add-user-name"), a = n.val(), a && n.attr("data-autocompleted")) {
				for (n.val(""), s = $(".js-team-user-logins li"), e = 0, i = s.length; i > e; e++)
					if (r = s[e], $(r).attr("data-login") === a) return;
				return $.sudo().then(function() {
					return $.ajax({
						url: $(".js-team-add-user-form").attr("data-template-url"),
						data: {
							member: a
						},
						success: function(t) {
							return $(".js-team-user-logins").append(t), $(".js-login-field").prop("disabled", !1), $(".js-team-add-user-form").addClass("hidden")
						}
					}), $(".js-team-add-user-name").focus()
				})
			}
		})
	}.call(this),
	function() {
		var t, e, n = function(t, e) {
			return function() {
				return t.apply(e, arguments)
			}
		};
		t = function() {
			function t(t) {
				var e;
				e = $(t), this.name = e.attr("data-theme-name"), this.slug = e.attr("data-theme-slug"), this.baseHref = e.attr("href")
			}
			return t.prototype.wrappedKey = function(t, e) {
				return null == e && (e = null), e ? e + "[" + t + "]" : t
			}, t.prototype.params = function(t) {
				var e;
				return null == t && (t = null), e = {}, e[this.wrappedKey("theme_slug", t)] = this.slug, e
			}, t.prototype.previewSrc = function() {
				return [this.baseHref, $.param(this.params())].join("&")
			}, t
		}(), e = function() {
			function e() {
				this.updateScrollLinks = n(this.updateScrollLinks, this), this.scrollThemeLinksContainer = n(this.scrollThemeLinksContainer, this), this.onPublishClick = n(this.onPublishClick, this), this.onHideClick = n(this.onHideClick, this), this.onThemeLinkClick = n(this.onThemeLinkClick, this), this.onThemeNavNextClick = n(this.onThemeNavNextClick, this), this.onThemeNavPrevClick = n(this.onThemeNavPrevClick, this), this.onScrollForwardsClick = n(this.onScrollForwardsClick, this), this.onScrollBackwardsClick = n(this.onScrollBackwardsClick, this), this.onPagePreviewLoad = n(this.onPagePreviewLoad, this), this.pagePreview = $("#page-preview"), this.contextLoader = $(".theme-picker-spinner"), this.fullPicker = $(".theme-picker-thumbs"), this.miniPicker = $(".theme-picker-controls"), this.scrollBackwardsLinks = $(".theme-toggle-full-left"), this.scrollForwardsLinks = $(".theme-toggle-full-right"), this.prevLinks = $(".theme-picker-prev"), this.nextLinks = $(".theme-picker-next"), this.themeLinksContainer = this.fullPicker.find(".js-theme-selector"), this.themeLinks = this.themeLinksContainer.find(".theme-selector-thumbnail"), this.themes = [], this.themeLinks.each(function(e) {
					return function(n, i) {
						return e.themes.push(new t(i))
					}
				}(this)), this.selectedTheme = this.themes[0], this.pagePreview.load(this.onPagePreviewLoad), this.scrollBackwardsLinks.click(this.onScrollBackwardsClick), this.scrollForwardsLinks.click(this.onScrollForwardsClick), this.prevLinks.click(this.onThemeNavPrevClick), this.nextLinks.click(this.onThemeNavNextClick), this.themeLinks.click(this.onThemeLinkClick), $(".theme-picker-view-toggle").click(this.onHideClick), $("#page-edit").click(this.onEditClick), $("#page-publish").click(this.onPublishClick), this.theme(this.selectedTheme), this.updateScrollLinks()
			}
			return e.prototype.onPagePreviewLoad = function() {
				var t, e;
				return this.contextLoader.removeClass("visible"), t = this.pagePreview[0].contentDocument ? this.pagePreview[0].contentDocument : this.pagePreview[0].contentWindow.document, e = this.getDocHeight(t) + "px", this.pagePreview.css("visibility", "hidden"), this.pagePreview.height("10px"), this.pagePreview.height(e), this.pagePreview.css("visibility", "visible")
			}, e.prototype.onScrollBackwardsClick = function() {
				return this.scrollThemeLinksContainer(-1)
			}, e.prototype.onScrollForwardsClick = function() {
				return this.scrollThemeLinksContainer(1)
			}, e.prototype.onThemeNavPrevClick = function() {
				return this.theme(this.prevTheme())
			}, e.prototype.onThemeNavNextClick = function() {
				return this.theme(this.nextTheme())
			}, e.prototype.onThemeLinkClick = function(t) {
				return this.theme(this.themeForLink(t.currentTarget)), !1
			}, e.prototype.onHideClick = function(t) {
				var e;
				return this.fullPicker.toggle(), this.miniPicker.toggle(), this.scrollToTheme(this.theme(), !1), e = $(t.currentTarget), e.toggleClass("open")
			}, e.prototype.onEditClick = function() {
				return $("#page-edit-form").submit(), !1
			}, e.prototype.onPublishClick = function() {
				var t;
				return t = $("#page-publish-form"), t.find('input[name="page[theme_slug]"]').val(this.theme().slug), $("#page-publish-form").submit(), !1
			}, e.prototype.scrollThemeLinksContainer = function(t) {
				var e, n, i;
				return n = this.themeLinksContainer.scrollLeft(), i = this.themeLinksContainer.outerWidth(!0), e = n + i * t, this.themeLinksContainer.animate({
					scrollLeft: e
				}, 400, function(t) {
					return function() {
						return t.updateScrollLinks()
					}
				}(this)), !1
			}, e.prototype.updateScrollLinks = function() {
				var t, e, n;
				return t = this.themeLinksContainer.scrollLeft(), 0 >= t ? (this.scrollBackwardsLinks.addClass("disabled"), this.scrollForwardsLinks.removeClass("disabled")) : (this.scrollBackwardsLinks.removeClass("disabled"), n = this.themeLinksContainer[0].scrollWidth, e = n - this.themeLinksContainer.outerWidth(!0), t >= e ? this.scrollForwardsLinks.addClass("disabled") : this.scrollForwardsLinks.removeClass("disabled"))
			}, e.prototype.selectedThemeIndex = function() {
				return this.themes.indexOf(this.selectedTheme)
			}, e.prototype.prevTheme = function() {
				var t;
				return t = (this.selectedThemeIndex() - 1) % this.themes.length, 0 > t && (t += this.themes.length), this.themes[t]
			}, e.prototype.nextTheme = function() {
				return this.themes[(this.selectedThemeIndex() + 1) % this.themes.length]
			}, e.prototype.themeForLink = function(t) {
				return this.themes[this.themeLinks.index($(t))]
			}, e.prototype.linkForTheme = function(t) {
				return $(this.themeLinks[this.themes.indexOf(t)])
			}, e.prototype.scrollToTheme = function(t, e) {
				var n, i, r, s, a, o;
				return null == e && (e = !0), n = this.linkForTheme(t), o = this.themes.indexOf(t), s = n.outerWidth(!0), r = o * s, i = this.themeLinksContainer.scrollLeft(), a = i + this.themeLinksContainer.outerWidth(!0), i > r || r + s > a ? e ? this.themeLinksContainer.animate({
					scrollLeft: r
				}, 500) : this.themeLinksContainer.scrollLeft(r) : void 0
			}, e.prototype.theme = function(t) {
				return null == t && (t = null), t ? (this.selectedTheme = t, this.showPreviewFor(t), this.themeLinks.removeClass("selected"), this.linkForTheme(t).addClass("selected"), this.scrollToTheme(t), this.miniPicker.find(".js-theme-name").text(t.name), !1) : this.selectedTheme
			}, e.prototype.showPreviewFor = function(t) {
				var e;
				return this.contextLoader.addClass("visible"), e = this.fullPicker.find("form"), e.find('input[name="theme_slug"]').val(t.slug), e.submit()
			}, e.prototype.getDocHeight = function(t) {
				var e, n;
				return this.pagePreview.height("auto"), e = t.body, n = t.documentElement, Math.max(e.scrollHeight, e.offsetHeight, n.clientHeight, n.scrollHeight, n.offsetHeight)
			}, e
		}(), $(function() {
			return document.getElementById("theme-picker-wrap") ? new e : void 0
		})
	}.call(this),
	function() {
		var t, e, n, i, r, s;
		r = function(t) {
			return setTimeout(function() {
				var e, n, i, r, a;
				for (r = document.querySelectorAll(".js-tree-finder-field"), a = [], n = 0, i = r.length; i > n; n++) e = r[n], e.value = t, a.push(s(e));
				return a
			}, 0)
		}, i = null, t = new WeakMap, s = function(e, n) {
			var r, a, o, c, u, l, d, h, f, m, p, g, v, b;
			if (v = document.getElementById(e.getAttribute("data-results"))) {
				if (!(l = t.get(v))) return void(null == i && (i = $.fetchJSON(v.getAttribute("data-url")).then(function(n) {
					return t.set(v, n.paths), s(e), i = null
				})["catch"](function() {
					return i = null
				})));
				for (b = v.querySelector(".js-tree-browser-result-template").firstElementChild, m = v.querySelector(".js-tree-finder-results"), null == n && (n = e.value), n ? (d = $.fuzzyRegexp(n), g = $.fuzzySort(l, n)) : g = l, o = document.createDocumentFragment(), h = g.slice(0, 50), r = 0, a = h.length; a > r; r++) p = h[r], f = b.cloneNode(!0), c = f.getElementsByClassName("js-tree-finder-path")[0], u = new URL(c.href), u.pathname = u.pathname + "/" + p, c.href = u.href, c.textContent = p, $.fuzzyHighlight(c, n, d), o.appendChild(f);
				m.innerHTML = "", m.appendChild(o), $(m).navigation("focus")
			}
		}, $(document).onFocusedKeydown(".js-tree-finder-field", function(t) {
			return s(this), $(this).on("throttled:input." + t, function() {
					return s(this)
				}),
				function(t) {
					return "esc" === t.hotkey ? (history.back(), t.preventDefault()) : void 0
				}
		}), e = function() {
			var t;
			return t = $("<textarea>").css({
					position: "fixed",
					top: 0,
					left: 0,
					opacity: 0
				}), $(document.body).append(t), t.focus(),
				function() {
					return t.blur().remove().val()
				}
		}, n = null, $(document).on("pjax:click", ".js-show-file-finder", function() {
			return n = e()
		}), $(document).on("pjax:end", "#js-repo-pjax-container", function() {
			var t;
			return n ? ((t = n()) && r(t), n = null) : void 0
		}), $.observe(".js-tree-finder-field", function() {
			s(this)
		})
	}.call(this),
	function() {
		var t, e, n;
		e = function() {
			return document.body.classList.add("is-sending"), document.body.classList.remove("is-sent", "is-not-sent")
		}, n = function() {
			return document.body.classList.add("is-sent"), document.body.classList.remove("is-sending")
		}, t = function(t) {
			return t.responseText.length && (document.querySelector(".js-sms-error").textContent = t.responseText), document.body.classList.add("is-not-sent"), document.body.classList.remove("is-sending")
		}, $(document).on("ajaxSend", ".js-send-auth-code", function() {
			return e()
		}), $(document).on("ajaxSuccess", ".js-send-auth-code", function() {
			return n()
		}), $(document).on("ajaxError", ".js-send-auth-code", function(e, n) {
			return t(n)
		}), $(document).on("click", ".js-send-two-factor-code", function() {
			var i, r, s, a, o;
			return i = $(this).closest("form"), r = i.find(".js-country-code-select").val(), s = i.find(".js-sms-number").val(), a = r + " " + s, o = i.find(".js-two-factor-secret").val(), i.find("input,button,select").prop("disabled", !0), e(), $.ajax({
				url: this.getAttribute("data-url"),
				type: "POST",
				data: {
					number: a,
					two_factor_secret: o
				},
				success: function() {
					return n(), i.find(".js-2fa-enable").prop("disabled", !1), i.find(".js-2fa-confirm").prop("disabled", !0), i.find(".js-2fa-otp").focus()
				},
				error: function(e) {
					return t(e), i.find(".js-2fa-enable").prop("disabled", !0), i.find(".js-2fa-confirm").prop("disabled", !1)
				}
			}), !1
		}), $(document).on("click", "button.js-2fa-enable", function() {
			var t;
			return t = $(this).closest("form"), t.find("input,button,select").prop("disabled", !1)
		}), $(document).on("loading.facebox", function() {
			return "/settings/two_factor_authentication/configure" === window.location.pathname ? ($(".js-configure-sms-fallback .facebox-alert").text("").hide(), $(".js-configure-sms-fallback").show(), $(".js-verify-sms-fallback").hide()) : void 0
		}), $(document).on("ajaxSuccess", ".js-two-factor-set-sms-fallback", function(t, e) {
			switch (e.status) {
				case 200:
				case 201:
					return window.location.reload();
				case 202:
					return $(".js-configure-sms-fallback").hide(), $(".js-verify-sms-fallback").show(), $(".js-fallback-otp").focus()
			}
		}), $(document).on("ajaxError", ".js-two-factor-set-sms-fallback", function(t, e) {
			switch (e.status) {
				case 422:
					return window.location.reload();
				case 429:
					return $(".js-configure-sms-fallback .facebox-alert").text(e.responseText).show(), !1
			}
		})
	}.call(this),
	function() {
		$(document).on("click", ".js-user-sessions-revoke", function() {
			return $.sudo().then(function(t) {
				return function() {
					return $.ajax({
						type: "DELETE",
						url: t.href
					}).then(function() {
						return $(t).closest("li").remove()
					})
				}
			}(this)), !1
		})
	}.call(this),
	function() {
		$(document).on("click", ".js-add-yubicat-link", function(t) {
			return $(".js-new-yubicat").addClass("is-active").removeClass("is-showing-error"), $(".js-yubicat-otp-field").focus(), t.preventDefault()
		}), $(document).on("click", ".js-add-yubicat-cancel", function(t) {
			return $(".js-new-yubicat").removeClass("is-active"), t.preventDefault()
		}), $(document).on("ajaxBeforeSend", ".js-new-yubicat", function() {
			return $(this).addClass("is-sending"), $(this).removeClass("is-showing-error")
		}), $(document).on("ajaxBeforeSend", ".js-yubicat-delete", function() {
			return this.closest(".js-yubicat-device").classList.add("is-sending")
		}), $(document).on("ajaxSuccess", ".js-yubicat-delete", function() {
			return this.closest(".js-yubicat-device").remove()
		}), $(document).on("ajaxSuccess", ".js-new-yubicat", function(t, e) {
			var n, i, r;
			return $(this).removeClass("is-sending is-active"), $(".js-yubicat-otp-field").val(""), n = $(".js-yubicat-device-template").clone().addClass("yubicat-device js-yubicat-device").removeClass("hidden js-yubicat-device-template"), i = n.find(".js-yubicat-delete"), r = i.attr("href").replace("deviceId", e.responseText), i.attr("href", r), n.find(".js-yubicat-device-id").html(e.responseText), $(".js-yubicat-list").append(n)
		}), $(document).on("ajaxError", ".js-new-yubicat", function(t, e) {
			var n;
			return n = $(".js-yubicat-error"), n.html(422 === e.status && "" !== e.responseText.replace(/\s/, "") ? e.responseText : "There was an error. Refresh the page and try again."), $(this).removeClass("is-sending is-active"), $(this).addClass("is-showing-error"), $(".js-yubicat-otp-field").val(""), !1
		}), $(document).on("click", ".js-yubicat-error-close", function() {
			return $(".js-new-yubicat").removeClass("is-showing-error")
		})
	}.call(this),
	function() {
		var t, e, n, i, r, s, a;
		$.support.pjax && (e = null, r = "last_pjax_request", s = "pjax_start", i = "pjax_end", n = function(t) {
			var n, i;
			(i = null != (n = t.relatedTarget) ? n.href : void 0) && (window.performance.mark(s), e = i)
		}, a = function() {
			setImmediate(function() {
				var n, a;
				if (window.performance.getEntriesByName(s).length && (window.performance.mark(i), window.performance.measure(r, s, i), a = window.performance.getEntriesByName(r), n = a.pop().duration)) return GitHub.stats({
					pjax: {
						url: e,
						ms: Math.round(n)
					}
				}), t()
			})
		}, t = function() {
			window.performance.clearMarks(s), window.performance.clearMarks(i), window.performance.clearMeasures(r)
		}, $(document).on("pjax:start", n), $(document).on("pjax:end", a))
	}.call(this),
	function() {
		$(document).on("click", ".js-rich-diff.collapsed .js-expandable", function(t) {
			return t.preventDefault(), $(t.target).closest(".js-rich-diff").removeClass("collapsed")
		}), $(document).on("click", ".js-show-rich-diff", function(t) {
			return t.preventDefault(), $(this).closest(".js-warn-no-visible-changes").addClass("hidden").hide().siblings(".js-no-rich-changes").removeClass("hidden").show()
		})
	}.call(this),
	function() {
		var t, e, n, i, r, s, a;
		e = function() {
			return $(".user-interests-item").not(".hidden").length
		}, s = function() {
			return 0 === e() ? ($(".recommendations-outro").fadeOut(100), $(".recommendations-intro").fadeIn(100)) : ($(".recommendations-intro").fadeOut(100), $(".recommendations-outro").fadeIn(100))
		}, a = function() {
			var t, n;
			return t = e(), n = function() {
				switch (!1) {
					case 0 !== t:
						return "Which programming languages, frameworks, topics, etc.?";
					case 1 !== t:
						return "Awesome! What else?";
					case 2 !== t:
						return "Excellent \u2013 let's keep going!";
					case 3 !== t:
						return "These are great. Anything else?";
					case 4 !== t:
						return "Great! Maybe one more?"
				}
			}(), 5 === t ? ($(".js-user-recommendations-form").delay(500).hide(), $(".js-recommendations-complete").delay(500).show()) : $(".js-recommendations-complete").visible() && ($(".js-user-recommendations-form").show(), $(".js-recommendations-complete").hide()), $(".js-user-interests-input").attr("placeholder", n), s()
		}, r = null, t = function(t, e, s) {
			var o, c, u, l, d;
			return c = document.querySelector(".js-user-recommendations-form"), u = c.querySelector(".js-user-interests-input"), t = t.trim(), $(".js-button-skip").hide(), u.value = "", null == r && (r = $(".js-user-interests-item.hidden").remove().removeClass("hidden")[0]), l = r.cloneNode(!0), l.title = t, l.insertBefore(document.createTextNode(t), l.firstChild), $(".js-user-interests-list").append(l), l = $(l), d = l.offset(), o = Math.abs(s - d.left), l.css("position", "absolute").css("top", e).css("left", s).fadeIn(100).animate({
				top: d.top,
				left: d.left - 8
			}, {
				duration: 300 + .2 * o,
				specialEasing: {
					top: "easeInBack"
				},
				complete: function() {
					return $(this).css("position", "relative"), $(this).css("top", 0), $(this).css("left", 0), u.value = t, i(c).then(function() {
						return n()
					}), u.value = ""
				}
			}), a()
		}, $.easing.easeInBack = function(t, e, n, i, r, s) {
			return void 0 === s && (s = 3.70158), i * (e /= r) * e * ((s + 1) * e - s) + n
		}, n = function() {
			return $.pjax({
				url: "/recommendations",
				container: "#site-container"
			})
		}, $(document).on("pjax:complete", function() {
			return a()
		}), $(function() {
			return $(".user-interests-item").length ? a() : void 0
		}), $(document).on("submit", ".js-user-recommendations-form", function(e) {
			var n, i, r, s, a;
			return e.preventDefault(), n = this.querySelector(".js-user-interests-input"), i = n.value, s = $(n).offset(), a = s.top, r = s.left, t(i, a, r)
		}), $(document).on("click", ".js-interest-option", function(e) {
			var n, i, r, s, a;
			return e.preventDefault(), s = this, n = s.getAttribute("data-name"), r = $(s).offset(), a = r.top - $(s).height() / 2, i = r.left - $(s).width() / 2, t(n, a, i)
		}), $(document).on("submit", ".js-remove-user-interest-form", function(t) {
			return t.preventDefault(), i(this).then(function() {
				return n()
			})
		}), $(document).onFocusedKeydown(".js-user-interests-input", function() {
			return function(t) {
				return "," === t.hotkey && ($(".js-user-recommendations-form").trigger("submit"), t.preventDefault()), "" === $(this).val() && "space" === t.hotkey ? t.preventDefault() : void 0
			}
		}), i = function(t) {
			return $.fetch(t.getAttribute("action"), {
				method: t.getAttribute("method"),
				body: $.param($(t).serializeArray()),
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				}
			})
		}
	}.call(this),
	function() {
		var t, e, n, i, r, s, a, o, c;
		o = ["is-render-pending", "is-render-ready", "is-render-loading", "is-render-loaded"].reduce(function(t, e) {
			return t + " " + e
		}), a = function(t) {
			var e;
			return e = t.data("timing"), null != e ? (e.load = e.hello = null, e.helloTimer && (clearTimeout(e.helloTimer), e.helloTimer = null), e.loadTimer ? (clearTimeout(e.loadTimer), e.loadTimer = null) : void 0) : void 0
		}, i = function(t) {
			var e, n, i;
			if (!t.data("timing")) return e = 10, n = 45, i = {
				load: null,
				hello: null,
				helloTimer: null,
				loadTimer: null
			}, i.load = Date.now(), i.helloTimer = setTimeout(c(t, function() {
				return !i.hello
			}), 1e3 * e), i.loadTimer = setTimeout(c(t), 1e3 * n), t.data("timing", i)
		}, s = function(t) {
			return t.addClass("is-render-requested")
		}, r = function(t, e) {
			return t.removeClass(o), t.addClass("is-render-failed"), null != e && t.addClass("is-render-failed-" + e), a(t)
		}, c = function(t, e) {
			return null == e && (e = function() {
					return !0
				}),
				function() {
					var n, i;
					return n = function() {
						try {
							return t.is($.visible)
						} catch (e) {
							return t.visible().length > 0
						}
					}(), !n || t.hasClass("is-render-ready") || t.hasClass("is-render-failed") || t.hasClass("is-render-failed-fatally") || !e() ? void 0 : (i = t.data("timing")) ? (console.error("Render timeout: " + JSON.stringify(i) + " Now: " + Date.now()), r(t)) : console.error("No timing data on $:", t)
				}
		}, t = function(t) {
			var e, n;
			e = $(t || this), (null != (n = e.data("timing")) ? n.load : 0) || (a(e), i(e), e.addClass("is-render-automatic"), s(e))
		}, null != $.observe ? $.observe(".js-render-target", t) : $(function() {
			return $.each($(".js-render-target"), function(e, n) {
				return t(n)
			})
		}), e = function(t) {
			var e;
			return e = ".js-render-target", $(t ? e + "[data-identity='" + t + "']" : e)
		}, $(window).on("message", function(t) {
			var i, r, s, a, o, c, u, l, d, h;
			return l = null != (u = t.originalEvent) ? u : t, s = l.data, o = l.origin, s && o && (d = function() {
				try {
					return JSON.parse(s)
				} catch (e) {
					return t = e, s
				}
			}(), h = d.type, a = d.identity, r = d.body, c = d.payload, h && r && 1 === (i = e(a)).length && o === i.attr("data-host") && "render" === h) ? n(i, h, a, r, c) : void 0
		}), n = function(t, e, n, i, s) {
			var a, c, u, l, d, h;
			switch (i) {
				case "hello":
					if (d = t.data("timing") || {
						untimed: !0
					}, d.hello = Date.now(), a = {
						type: "render:cmd",
						body: {
							cmd: "ack",
							ack: !0
						}
					}, u = {
						type: "render:cmd",
						body: {
							cmd: "branding",
							branding: !1
						}
					}, h = null != (l = t.find("iframe").get(0)) ? l.contentWindow : void 0, "function" == typeof h.postMessage && h.postMessage(JSON.stringify(a), "*"), "function" == typeof h.postMessage && h.postMessage(JSON.stringify(u), "*"), t.hasClass("is-local")) return c = t.parents(".js-code-editor").data("code-editor"), u = {
						type: "render:data",
						body: c.code()
					}, "function" == typeof h.postMessage ? h.postMessage(JSON.stringify(u), "*") : void 0;
					break;
				case "error":
					return r(t);
				case "error:fatal":
					return r(t, "fatal");
				case "error:invalid":
					return r(t, "invalid");
				case "loading":
					return t.removeClass(o), t.addClass("is-render-loading");
				case "loaded":
					return t.removeClass(o), t.addClass("is-render-loaded");
				case "ready":
					if (t.removeClass(o), t.addClass("is-render-ready"), null != (null != s ? s.height : void 0)) return t.height(s.height);
					break;
				case "resize":
					return null != (null != s ? s.height : void 0) && t.hasClass("is-render-ready") ? t.height(s.height) : console.error("Resize event sent without height or before ready");
				default:
					return console.error("Unknown message [" + e + "]=>'" + i + "'")
			}
		}
	}.call(this),
	function() {
		$(document).on("click", ".js-toggle-lang-stats", function(t) {
			return document.querySelector(".js-stats-switcher-viewport").classList.toggle("is-revealing-lang-stats"), t.preventDefault()
		})
	}.call(this),
	function() {
		var t, e, n, i, r, s;
		s = function(t, e) {
			var n;
			return n = e.querySelector(".js-repo-access-error"), n.textContent = t, n.classList.remove("hidden")
		}, i = function() {
			var t, e, n, i, r;
			for (i = document.querySelectorAll(".js-repo-access-error"), r = [], e = 0, n = i.length; n > e; e++) t = i[e], t.textContent = "", r.push(t.classList.add("hidden"));
			return r
		}, t = function(t) {
			return t.classList.toggle("is-empty", !t.querySelector(".js-repo-access-entry"))
		}, r = function() {
			var t;
			(t = document.getElementById("collaborators")) && (t.querySelector(".js-add-new-collab").disabled = !0, t.querySelector(".js-add-repo-access-field").removeAttribute("data-autocompleted"))
		}, $.observe(".js-add-new-collab", r), e = function(t) {
			var e, n, i, r, s, a, o;
			if (a = document.querySelector(".js-repo-access-team-select")) {
				for (o = 0, s = a.querySelectorAll(".js-repo-access-team-select-option"), e = 0, r = s.length; r > e; e++) n = s[e], i = n.classList, t === n.getAttribute("data-team-id") && (i.add("has-access"), i.remove("selected")), i.contains("has-access") || o++;
				if (0 === o) return a.closest(".js-repo-access-group").classList.add("no-form")
			}
		}, n = function(t) {
			var e;
			return (e = document.querySelector(".js-repo-access-team-select")) ? (e.querySelector("[data-team-id='" + t + "']").classList.remove("has-access"), e.closest(".js-repo-access-group").classList.remove("no-form")) : void 0
		}, $(document).on("autocomplete:autocompleted:changed", ".js-add-repo-access-field", function() {
			return this.getAttribute("data-autocompleted") ? this.form.querySelector(".js-add-new-collab").disabled = !1 : r()
		}), $(document).on("selectmenu:selected", ".js-repo-access-team-select", function() {
			var t, e;
			return t = this.querySelector(".js-repo-access-team-select-option.selected").getAttribute("data-team-id"), e = this.closest(".js-repo-access-group").querySelector(".js-add-repo-access-field"), e.value = t, $(e.form).submit()
		}), $(document).on("ajaxBeforeSend", ".js-add-repo-access-form", function() {
			var t, e;
			return i(), e = this.closest(".js-repo-access-group"), t = this.querySelector(".js-add-repo-access-field"), "collaborators" !== e.id || t.getAttribute("data-autocompleted") ? void 0 : !1
		}), $(document).on("ajaxSuccess", ".js-add-repo-access-form", function(n, i, a, o) {
			var c, u, l, d;
			return u = this.closest(".js-repo-access-group"), c = this.querySelector(".js-add-repo-access-field"), l = u.querySelector(".js-repo-access-list"), d = c.value, c.value = "", o.error ? s(o.error, u) : (r(), l.insertAdjacentHTML("beforeend", o.html), t(u), "teams" === u.id ? e(d) : void 0)
		}), $(document).on("ajaxSuccess", ".js-remove-repo-access-form", function() {
			var e, r;
			return i(), e = this.closest(".js-repo-access-entry"), r = this.closest(".js-repo-access-group"), "teams" === r.id && n(e.getAttribute("data-team-id")), e.remove(), t(r)
		}), $(document).on("ajaxError", ".js-remove-repo-access-form", function() {
			return s(this.getAttribute("data-error-message"), this.closest(".js-repo-access-group")), !1
		})
	}.call(this),
	function() {
		$(document).on("change", ".js-repo-default-branch", function() {
			var t, e, n, i;
			return e = $(this), t = $(this).parents("dl.form"), n = t.find(".js-status-indicator"), i = e.val(), n.removeClass("status-indicator-success").removeClass("status-indicator-failed").addClass("status-indicator-loading"), $.ajax({
				type: "PUT",
				url: t.closest("form").attr("action"),
				data: {
					field: "repository_default_branch",
					value: i
				},
				complete: function() {
					return n.removeClass("status-indicator-loading")
				},
				success: function() {
					return n.addClass("status-indicator-success")
				},
				error: function() {
					return n.addClass("status-indicator-failed"), e.val(i)
				}
			})
		}), $(document).on("change", ".js-repo-feature-checkbox", function() {
			var t, e, n;
			return e = this, n = $(this).closest(".js-repo-option"), t = n.find(".js-status-indicator"), t.removeClass("status-indicator-success").removeClass("status-indicator-failed").addClass("status-indicator-loading"), $.ajax({
				type: "PUT",
				url: n.closest("form").attr("action"),
				data: {
					field: e.name,
					value: e.checked ? 1 : 0
				},
				success: function(e) {
					return t.removeClass("status-indicator-loading").addClass("status-indicator-success"), /^\s*</.test(e) ? $(".repo-nav").replaceWith(e) : void 0
				},
				error: function() {
					return e.checked = !e.checked, t.removeClass("status-indicator-loading").addClass("status-indicator-failed")
				}
			})
		})
	}.call(this),
	function() {
		$(document).on("change", ".js-notifications-settings input[type=checkbox]", function() {
			var t, e;
			return t = $(this), e = t.parents("li").find(".js-auto-subscribe-spinner"), e.removeClass("hidden"), $.ajax({
				url: t.parents(".js-notifications-settings").attr("data-toggle-url"),
				type: "POST",
				data: t.parents(".js-notifications-settings").serialize(),
				complete: function() {
					return e.addClass("hidden")
				}
			})
		}), $(document).on("submit", ".js-delete-email", function() {
			return $.sudo().then(function(t) {
				return function() {
					return $.ajax({
						type: "DELETE",
						url: t.action
					}).then(function() {
						return $(t).closest("li").remove()
					})
				}
			}(this)), !1
		}), $(document).on("ajaxSuccess", ".js-toggle-visibility", function(t, e, n, i) {
			return $("#settings-emails").children(".settings-email.primary").toggleClass("private", "private" === i.visibility)
		}), $(document).on("ajaxSend", ".js-remove-key", function() {
			return $(this).addClass("disabled").find("span").text("Deleting\u2026")
		}), $(document).on("ajaxError", ".js-remove-key", function() {
			return $(this).removeClass("disabled").find("span").text("Error. Try again.")
		}), $(document).on("ajaxSuccess", ".js-remove-key", function() {
			return $(this).parents("li").remove(), 0 === $(".js-ssh-keys-box li").length ? $(".js-no-ssh-keys").show() : void 0
		}), $(document).on("ajaxSuccess", ".js-leave-collaborated-repo", function(t) {
			var e, n;
			e = t.target.getAttribute("data-repo-id"), n = document.querySelector(".js-collab-repo[data-repo-id='" + e + "']"), n.remove(), $.facebox.close()
		}), $(document).on("ajaxSuccess", ".js-newsletter-unsubscribe-form", function() {
			var t, e, n, i, r;
			for (i = document.querySelectorAll(".js-newsletter-unsubscribe-message"), r = [], e = 0, n = i.length; n > e; e++) t = i[e], r.push(t.classList.toggle("hidden"));
			return r
		}), $(document).on("click", ".js-show-new-ssh-key-form", function() {
			return $(".js-new-ssh-key-box").toggle().find(".js-ssh-key-title").focus(), !1
		}), $(document).on("click", ".js-revoke-access", function() {
			var t, e, n, i, r;
			return i = $(this).attr("data-id"), r = $(this).attr("data-type"), e = $(this).siblings(".js-delete-failed").addClass("hidden"), n = "[data-type=" + r + "][data-id=" + i + "]", t = $(".js-revoke-item").filter(n), $.ajax({
				url: $(this).attr("data-path"),
				type: "DELETE",
				success: function() {
					return $.facebox.close(), t.remove(), t.hasClass("new-token") ? $(".js-flash-new-token").hide() : void 0
				},
				error: function() {
					return e.removeClass("hidden")
				}
			}), !1
		}), $(document).on("click", ".js-delete-oauth-application-image", function() {
			var t, e, n;
			return t = $(this).closest(".js-uploadable-container"), t.removeClass("has-uploaded-logo"), e = t.find("img.js-image-field"), n = t.find("input.js-oauth-application-logo-id"), e.attr("src", ""), n.val(""), !1
		}), $(document).on("click", ".js-new-callback", function(t) {
			var e, n;
			return t.preventDefault(), e = $(t.currentTarget).closest(".js-callback-urls"), n = e.find(".js-callback-url").first().clone(), n.removeClass("is-default-callback"), n.find("input").val(""), e.addClass("has-many"), $(t.currentTarget).before(n)
		}), $(document).on("click", ".js-delete-callback", function(t) {
			var e, n;
			return t.preventDefault(), e = $(t.currentTarget).closest(".js-callback-urls"), $(t.currentTarget).closest(".js-callback-url").remove(), n = e.find(".js-callback-url"), n.length <= 1 ? e.removeClass("has-many") : void 0
		}), $(document).on("click", ".js-oauth-application-whitelist .js-deny-this-request", function(t) {
			return $(t.currentTarget).siblings("#state").val("denied"), $(t.currentTarget).closest(".js-org-application-access-form").submit()
		}), $(document).on("ajaxSuccess", ".js-org-application-access-form", function() {
			return window.location.reload()
		}), $(document).on("click", ".js-user-rename-warning-continue", function() {
			var t, e, n, i, r;
			for (i = document.querySelectorAll(".js-user-rename-warning, .js-user-rename-form"), r = [], e = 0, n = i.length; n > e; e++) t = i[e], r.push(t.classList.toggle("hidden"));
			return r
		})
	}.call(this),
	function() {
		var t;
		t = function(t, e) {
			var n, i, r;
			return n = t.find(".js-reviewer-list"), i = t.attr("data-item-url"), r = $.ajax({
				url: i,
				data: {
					reviewer: e
				}
			}), r.done(function(t) {
				return n.append(t)
			})
		}, $(document).on("navigation:open", ".js-reviewer-suggestion", function() {
			var e, n, i;
			return e = $(this).closest(".js-autocomplete-container"), n = e.find(".js-autocomplete-field"), n.val(""), i = $(this).attr("data-autocomplete-value"), t(e, i)
		}), $(document).on("click", ".js-remove-reviewer", function() {
			return $(this).closest(".js-requested-reviewer-item").remove(), !1
		}), $(document).on("click", ".js-requested-reviewer-suggestion", function() {
			var e, n, i;
			return e = $(this).closest(".js-autocomplete-container"), n = $(this).closest(".js-suggested-reviewers"), i = $(this).attr("data-value"), t(e, i), this.remove(), n.toggleClass("hidden", 0 === n.find(".js-requested-reviewer-suggestion").length), !1
		}), $(document).on("autocomplete:result", ".js-add-reviewers", function() {
			var t, e;
			return t = $(this), e = $.ajax({
				url: t.attr("data-add-url"),
				data: {
					reviewer: t.attr("data-autocompleted")
				},
				type: "POST"
			}), e.done(function(e) {
				return t.closest(".js-signoff-status").replaceWith(e)
			})
		}), $(document).on("ajaxSuccess", ".js-cancel-review-request", function(t, e, n, i) {
			return $(this).closest(".js-signoff-status").replaceWith(i), !1
		})
	}.call(this),
	function() {
		$(function() {
			return $(".js-email-notice-trigger").focus(function() {
				return $(".js-email-notice").addClass("notice-highlight")
			}), $(".js-email-notice-trigger").blur(function() {
				return $(".js-email-notice").removeClass("notice-highlight")
			})
		}), $.observe(".js-plan-choice:checked", {
			add: function() {
				return $(this).closest(".plan-row").addClass("selected")
			},
			remove: function() {
				return $(this).closest(".plan-row").removeClass("selected")
			}
		}), $.observe(".js-plan-row.selected", {
			add: function() {
				var t;
				return t = $(this).find(".js-choose-button"), t.text(t.attr("data-selected-text"))
			},
			remove: function() {
				var t;
				return t = $(this).find(".js-choose-button"), t.text(t.attr("data-default-text"))
			}
		}), $.observe(".js-plan-row.free-plan.selected", {
			add: function() {
				var t;
				return t = $("#js-signup-billing-fields"), t.data("contents", t.contents().detach())
			},
			remove: function() {
				var t, e;
				return t = $("#js-signup-billing-fields"), e = t.data("contents"), t.append(e)
			}
		}), $.observe(".js-setup-organization:checked", {
			add: function() {
				var t;
				return t = $(".js-choose-plan-submit"), t.attr("data-default-text") || t.attr("data-default-text", t.text()), t.text(t.attr("data-org-text"))
			},
			remove: function() {
				var t;
				return t = $(".js-choose-plan-submit"), t.text(t.attr("data-default-text"))
			}
		})
	}.call(this),
	function() {
		$.observe(".js-site-status-container", function() {
			var t, e, n, i, r;
			r = this, e = r.querySelector(".js-site-status-message"), n = r.querySelector(".js-site-status-time"), t = r.querySelector(".flash"), i = document.querySelector("meta[name=site-status-api-url]").content, fetch(i).then(function(t) {
				return t.json()
			}).then(function(i) {
				var s;
				return null != i.status && "good" !== i.status ? (e.textContent = i.body, n.setAttribute("datetime", i.created_on), s = "major" === i.status ? "error" : "warn", t.classList.add("flash-" + s), r.classList.remove("hidden")) : void 0
			})
		})
	}.call(this),
	function() {
		!$.support.pjax || location.search || location.hash || $(function() {
			var t, e, n;
			return t = null != (e = document.getElementById("issues-dashboard")) ? e : document.getElementById("issues_list"), (n = $(t).attr("data-url")) ? window.history.replaceState(null, document.title, n) : void 0
		})
	}.call(this),
	function() {
		var t;
		t = function() {
			var t, e;
			location.hash && (document.querySelector(":target") || (t = "user-content-" + decodeURIComponent(location.hash.slice(1)), e = document.getElementById(t) || document.getElementsByName(t)[0], null != e && e.scrollIntoView()))
		}, window.addEventListener("hashchange", t), $(t), $(document).on("pjax:success", t)
	}.call(this), $(function() {
		function t() {
			var n = $("#current-version").val();
			n && $.fetchText("_current").then(function(i) {
				n == i ? setTimeout(t, 5e3) : e || ($("#gollum-error-message").text("Someone has edited the wiki since you started. Please reload this page and re-apply your changes."), $("#gollum-error-message").show(), $("#gollum-editor-submit").attr("disabled", "disabled"), $("#gollum-editor-submit").attr("value", "Cannot Save, Someone Else Has Edited"))
			})
		}
		var e = !1;
		$("#gollum-editor-body").each(t), $("#gollum-editor-submit").click(function() {
			e = !0
		})
	});