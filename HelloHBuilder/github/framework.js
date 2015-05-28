/**
 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
 *
 * @version 1.0.1
 * @codingstandard ftlabs-jsv2
 * @copyright The Financial Times Limited [All Rights Reserved]
 * @license MIT License (see LICENSE.txt)
 */
function FastClick(e, t) {
	"use strict";

	function n(e, t) {
		return function() {
			return e.apply(t, arguments)
		}
	}
	var r;
	if (t = t || {}, this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = t.touchBoundary || 10, this.layer = e, this.tapDelay = t.tapDelay || 200, !FastClick.notNeeded(e)) {
		for (var i = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], o = this, a = 0, s = i.length; s > a; a++) o[i[a]] = n(o[i[a]], o);
		deviceIsAndroid && (e.addEventListener("mouseover", this.onMouse, !0), e.addEventListener("mousedown", this.onMouse, !0), e.addEventListener("mouseup", this.onMouse, !0)), e.addEventListener("click", this.onClick, !0), e.addEventListener("touchstart", this.onTouchStart, !1), e.addEventListener("touchmove", this.onTouchMove, !1), e.addEventListener("touchend", this.onTouchEnd, !1), e.addEventListener("touchcancel", this.onTouchCancel, !1), Event.prototype.stopImmediatePropagation || (e.removeEventListener = function(t, n, r) {
			var i = Node.prototype.removeEventListener;
			"click" === t ? i.call(e, t, n.hijacked || n, r) : i.call(e, t, n, r)
		}, e.addEventListener = function(t, n, r) {
			var i = Node.prototype.addEventListener;
			"click" === t ? i.call(e, t, n.hijacked || (n.hijacked = function(e) {
				e.propagationStopped || n(e)
			}), r) : i.call(e, t, n, r)
		}), "function" == typeof e.onclick && (r = e.onclick, e.addEventListener("click", function(e) {
			r(e)
		}, !1), e.onclick = null)
	}
}
if (function() {
		var e, t, n, r, i;
		null == window.GitHub && (window.GitHub = {}), e = document.createElement("input"), i = document.createElement("textarea"), window.GitHub.support = {
			emoji: function() {
				var e, t, n;
				return n = document.createElement("canvas"), e = n.getContext("2d"), e.fillStyle = "#f00", e.textBaseline = "top", e.font = "32px Arial", t = String.fromCharCode(55357) + String.fromCharCode(56360), e.fillText(t, 0, 0), 0 !== e.getImageData(16, 16, 1, 1).data[0]
			}(),
			CustomEvent: function() {
				var e;
				try {
					return e = new CustomEvent("test", {
						detail: "supported"
					}), "supported" === e.detail
				} catch (t) {
					return !1
				}
			}(),
			registerElement: "registerElement" in document,
			requestAnimationFrame: "requestAnimationFrame" in window,
			setImmediate: "setImmediate" in window,
			Promise: "Promise" in window,
			URL: "URL" in window,
			WeakMap: "WeakMap" in window,
			fetch: "fetch" in window,
			placeholder_input: "placeholder" in e,
			placeholder_textarea: "placeholder" in i,
			closest: "function" == typeof e.closest,
			matches: "function" == typeof e.matches,
			performanceNow: !!(null != (t = window.performance) ? t.now : void 0),
			performanceMark: !!(null != (n = window.performance) ? n.mark : void 0),
			performanceGetEntries: !!(null != (r = window.performance) ? r.getEntries : void 0)
		}, GitHub.support.classList = "classList" in e, GitHub.support.classListMultiArg = GitHub.support.classList && function() {
			return e.classList.add("a", "b"), e.classList.contains("b")
		}()
	}.call(this), function(global, undefined) {
		"use strict";

		function canUseNextTick() {
			return "object" == typeof process && "[object process]" === Object.prototype.toString.call(process)
		}

		function canUseMessageChannel() {
			return !!global.MessageChannel
		}

		function canUsePostMessage() {
			if (!global.postMessage || global.importScripts) return !1;
			var e = !0,
				t = global.onmessage;
			return global.onmessage = function() {
				e = !1
			}, global.postMessage("", "*"), global.onmessage = t, e
		}

		function canUseReadyStateChange() {
			return "document" in global && "onreadystatechange" in global.document.createElement("script")
		}

		function installNextTickImplementation(e) {
			e.setImmediate = function() {
				var e = tasks.addFromSetImmediateArguments(arguments);
				return process.nextTick(function() {
					tasks.runIfPresent(e)
				}), e
			}
		}

		function installMessageChannelImplementation(e) {
			var t = new global.MessageChannel;
			t.port1.onmessage = function(e) {
				var t = e.data;
				tasks.runIfPresent(t)
			}, e.setImmediate = function() {
				var e = tasks.addFromSetImmediateArguments(arguments);
				return t.port2.postMessage(e), e
			}
		}

		function installPostMessageImplementation(e) {
			function t(e, t) {
				return "string" == typeof e && e.substring(0, t.length) === t
			}

			function n(e) {
				if (e.source === global && t(e.data, r)) {
					var n = e.data.substring(r.length);
					tasks.runIfPresent(n)
				}
			}
			var r = "com.bn.NobleJS.setImmediate" + Math.random();
			global.addEventListener ? global.addEventListener("message", n, !1) : global.attachEvent("onmessage", n), e.setImmediate = function() {
				var e = tasks.addFromSetImmediateArguments(arguments);
				return global.postMessage(r + e, "*"), e
			}
		}

		function installReadyStateChangeImplementation(e) {
			e.setImmediate = function() {
				var e = tasks.addFromSetImmediateArguments(arguments),
					t = global.document.createElement("script");
				return t.onreadystatechange = function() {
					tasks.runIfPresent(e), t.onreadystatechange = null, t.parentNode.removeChild(t), t = null
				}, global.document.documentElement.appendChild(t), e
			}
		}

		function installSetTimeoutImplementation(e) {
			e.setImmediate = function() {
				var e = tasks.addFromSetImmediateArguments(arguments);
				return global.setTimeout(function() {
					tasks.runIfPresent(e)
				}, 0), e
			}
		}
		var tasks = function() {
			function Task(e, t) {
				this.handler = e, this.args = t
			}
			Task.prototype.run = function() {
				if ("function" == typeof this.handler) this.handler.apply(undefined, this.args);
				else {
					var scriptSource = "" + this.handler;
					eval(scriptSource)
				}
			};
			var nextHandle = 1,
				tasksByHandle = {},
				currentlyRunningATask = !1;
			return {
				addFromSetImmediateArguments: function(e) {
					var t = e[0],
						n = Array.prototype.slice.call(e, 1),
						r = new Task(t, n),
						i = nextHandle++;
					return tasksByHandle[i] = r, i
				},
				runIfPresent: function(e) {
					if (currentlyRunningATask) global.setTimeout(function() {
						tasks.runIfPresent(e)
					}, 0);
					else {
						var t = tasksByHandle[e];
						if (t) {
							currentlyRunningATask = !0;
							try {
								t.run()
							} finally {
								delete tasksByHandle[e], currentlyRunningATask = !1
							}
						}
					}
				},
				remove: function(e) {
					delete tasksByHandle[e]
				}
			}
		}();
		if (!global.setImmediate) {
			var attachTo = "function" == typeof Object.getPrototypeOf && "setTimeout" in Object.getPrototypeOf(global) ? Object.getPrototypeOf(global) : global;
			canUseNextTick() ? installNextTickImplementation(attachTo) : canUsePostMessage() ? installPostMessageImplementation(attachTo) : canUseMessageChannel() ? installMessageChannelImplementation(attachTo) : canUseReadyStateChange() ? installReadyStateChangeImplementation(attachTo) : installSetTimeoutImplementation(attachTo), attachTo.clearImmediate = tasks.remove
		}
	}("object" == typeof global && global ? global : this), function() {
		var e, t, n, r;
		! function() {
			var i = {},
				o = {};
			e = function(e, t, n) {
				i[e] = {
					deps: t,
					callback: n
				}
			}, r = n = t = function(e) {
				function n(t) {
					if ("." !== t.charAt(0)) return t;
					for (var n = t.split("/"), r = e.split("/").slice(0, -1), i = 0, o = n.length; o > i; i++) {
						var a = n[i];
						if (".." === a) r.pop();
						else {
							if ("." === a) continue;
							r.push(a)
						}
					}
					return r.join("/")
				}
				if (r._eak_seen = i, o[e]) return o[e];
				if (o[e] = {}, !i[e]) throw new Error("Could not find module " + e);
				for (var a, s = i[e], c = s.deps, u = s.callback, l = [], f = 0, d = c.length; d > f; f++) l.push("exports" === c[f] ? a = {} : t(n(c[f])));
				var p = u.apply(this, l);
				return o[e] = a || p
			}
		}(), e("promise/all", ["./utils", "exports"], function(e, t) {
			"use strict";

			function n(e) {
				var t = this;
				if (!r(e)) throw new TypeError("You must pass an array to all.");
				return new t(function(t, n) {
					function r(e) {
						return function(t) {
							o(e, t)
						}
					}

					function o(e, n) {
						s[e] = n, 0 === --c && t(s)
					}
					var a, s = [],
						c = e.length;
					0 === c && t([]);
					for (var u = 0; u < e.length; u++) a = e[u], a && i(a.then) ? a.then(r(u), n) : o(u, a)
				})
			}
			var r = e.isArray,
				i = e.isFunction;
			t.all = n
		}), e("promise/asap", ["exports"], function(e) {
			"use strict";

			function t() {
				return function() {
					process.nextTick(i)
				}
			}

			function n() {
				var e = 0,
					t = new c(i),
					n = document.createTextNode("");
				return t.observe(n, {
						characterData: !0
					}),
					function() {
						n.data = e = ++e % 2
					}
			}

			function r() {
				return function() {
					u.setTimeout(i, 1)
				}
			}

			function i() {
				for (var e = 0; e < l.length; e++) {
					var t = l[e],
						n = t[0],
						r = t[1];
					n(r)
				}
				l = []
			}

			function o(e, t) {
				var n = l.push([e, t]);
				1 === n && a()
			}
			var a, s = "undefined" != typeof window ? window : {},
				c = s.MutationObserver || s.WebKitMutationObserver,
				u = "undefined" != typeof global ? global : void 0 === this ? window : this,
				l = [];
			a = "undefined" != typeof process && "[object process]" === {}.toString.call(process) ? t() : c ? n() : r(), e.asap = o
		}), e("promise/config", ["exports"], function(e) {
			"use strict";

			function t(e, t) {
				return 2 !== arguments.length ? n[e] : void(n[e] = t)
			}
			var n = {
				instrument: !1
			};
			e.config = n, e.configure = t
		}), e("promise/polyfill", ["./promise", "./utils", "exports"], function(e, t, n) {
			"use strict";

			function r() {
				var e;
				e = "undefined" != typeof global ? global : "undefined" != typeof window && window.document ? window : self;
				var t = "Promise" in e && "resolve" in e.Promise && "reject" in e.Promise && "all" in e.Promise && "race" in e.Promise && function() {
					var t;
					return new e.Promise(function(e) {
						t = e
					}), o(t)
				}();
				t || (e.Promise = i)
			}
			var i = e.Promise,
				o = t.isFunction;
			n.polyfill = r
		}), e("promise/promise", ["./config", "./utils", "./all", "./race", "./resolve", "./reject", "./asap", "exports"], function(e, t, n, r, i, o, a, s) {
			"use strict";

			function c(e) {
				if (!x(e)) throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");
				if (!(this instanceof c)) throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
				this._subscribers = [], u(e, this)
			}

			function u(e, t) {
				function n(e) {
					h(t, e)
				}

				function r(e) {
					v(t, e)
				}
				try {
					e(n, r)
				} catch (i) {
					r(i)
				}
			}

			function l(e, t, n, r) {
				var i, o, a, s, c = x(n);
				if (c) try {
					i = n(r), a = !0
				} catch (u) {
					s = !0, o = u
				} else i = r, a = !0;
				p(t, i) || (c && a ? h(t, i) : s ? v(t, o) : e === N ? h(t, i) : e === D && v(t, i))
			}

			function f(e, t, n, r) {
				var i = e._subscribers,
					o = i.length;
				i[o] = t, i[o + N] = n, i[o + D] = r
			}

			function d(e, t) {
				for (var n, r, i = e._subscribers, o = e._detail, a = 0; a < i.length; a += 3) n = i[a], r = i[a + t], l(t, n, r, o);
				e._subscribers = null
			}

			function p(e, t) {
				var n, r = null;
				try {
					if (e === t) throw new TypeError("A promises callback cannot return that same promise.");
					if (w(t) && (r = t.then, x(r))) return r.call(t, function(r) {
						return n ? !0 : (n = !0, void(t !== r ? h(e, r) : m(e, r)))
					}, function(t) {
						return n ? !0 : (n = !0, void v(e, t))
					}), !0
				} catch (i) {
					return n ? !0 : (v(e, i), !0)
				}
				return !1
			}

			function h(e, t) {
				e === t ? m(e, t) : p(e, t) || m(e, t)
			}

			function m(e, t) {
				e._state === S && (e._state = A, e._detail = t, b.async(g, e))
			}

			function v(e, t) {
				e._state === S && (e._state = A, e._detail = t, b.async(y, e))
			}

			function g(e) {
				d(e, e._state = N)
			}

			function y(e) {
				d(e, e._state = D)
			}
			var b = e.config,
				w = (e.configure, t.objectOrFunction),
				x = t.isFunction,
				E = (t.now, n.all),
				T = r.race,
				_ = i.resolve,
				C = o.reject,
				k = a.asap;
			b.async = k;
			var S = void 0,
				A = 0,
				N = 1,
				D = 2;
			c.prototype = {
				constructor: c,
				_state: void 0,
				_detail: void 0,
				_subscribers: void 0,
				then: function(e, t) {
					var n = this,
						r = new this.constructor(function() {});
					if (this._state) {
						var i = arguments;
						b.async(function() {
							l(n._state, r, i[n._state - 1], n._detail)
						})
					} else f(this, r, e, t);
					return r
				},
				"catch": function(e) {
					return this.then(null, e)
				}
			}, c.all = E, c.race = T, c.resolve = _, c.reject = C, s.Promise = c
		}), e("promise/race", ["./utils", "exports"], function(e, t) {
			"use strict";

			function n(e) {
				var t = this;
				if (!r(e)) throw new TypeError("You must pass an array to race.");
				return new t(function(t, n) {
					for (var r, i = 0; i < e.length; i++) r = e[i], r && "function" == typeof r.then ? r.then(t, n) : t(r)
				})
			}
			var r = e.isArray;
			t.race = n
		}), e("promise/reject", ["exports"], function(e) {
			"use strict";

			function t(e) {
				var t = this;
				return new t(function(t, n) {
					n(e)
				})
			}
			e.reject = t
		}), e("promise/resolve", ["exports"], function(e) {
			"use strict";

			function t(e) {
				if (e && "object" == typeof e && e.constructor === this) return e;
				var t = this;
				return new t(function(t) {
					t(e)
				})
			}
			e.resolve = t
		}), e("promise/utils", ["exports"], function(e) {
			"use strict";

			function t(e) {
				return n(e) || "object" == typeof e && null !== e
			}

			function n(e) {
				return "function" == typeof e
			}

			function r(e) {
				return "[object Array]" === Object.prototype.toString.call(e)
			}
			var i = Date.now || function() {
				return (new Date).getTime()
			};
			e.objectOrFunction = t, e.isFunction = n, e.isArray = r, e.now = i
		}), t("promise/polyfill").polyfill()
	}(), function() {
		"use strict";

		function e(e) {
			if ("string" != typeof e && (e = e.toString()), /[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(e)) throw new TypeError("Invalid character in header field name");
			return e.toLowerCase()
		}

		function t(e) {
			return "string" != typeof e && (e = e.toString()), e
		}

		function n(e) {
			this.map = {};
			var t = this;
			e instanceof n ? e.forEach(function(e, n) {
				n.forEach(function(n) {
					t.append(e, n)
				})
			}) : e && Object.getOwnPropertyNames(e).forEach(function(n) {
				t.append(n, e[n])
			})
		}

		function r(e) {
			return e.bodyUsed ? Promise.reject(new TypeError("Already read")) : void(e.bodyUsed = !0)
		}

		function i(e) {
			return new Promise(function(t, n) {
				e.onload = function() {
					t(e.result)
				}, e.onerror = function() {
					n(e.error)
				}
			})
		}

		function o(e) {
			var t = new FileReader;
			return t.readAsArrayBuffer(e), i(t)
		}

		function a(e) {
			var t = new FileReader;
			return t.readAsText(e), i(t)
		}

		function s() {
			return this.bodyUsed = !1, this._initBody = function(e) {
				if (this._bodyInit = e, "string" == typeof e) this._bodyText = e;
				else if (p.blob && Blob.prototype.isPrototypeOf(e)) this._bodyBlob = e;
				else if (p.formData && FormData.prototype.isPrototypeOf(e)) this._bodyFormData = e;
				else {
					if (e) throw new Error("unsupported BodyInit type");
					this._bodyText = ""
				}
			}, p.blob ? (this.blob = function() {
				var e = r(this);
				if (e) return e;
				if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
				if (this._bodyFormData) throw new Error("could not read FormData body as blob");
				return Promise.resolve(new Blob([this._bodyText]))
			}, this.arrayBuffer = function() {
				return this.blob().then(o)
			}, this.text = function() {
				var e = r(this);
				if (e) return e;
				if (this._bodyBlob) return a(this._bodyBlob);
				if (this._bodyFormData) throw new Error("could not read FormData body as text");
				return Promise.resolve(this._bodyText)
			}) : this.text = function() {
				var e = r(this);
				return e ? e : Promise.resolve(this._bodyText)
			}, p.formData && (this.formData = function() {
				return this.text().then(l)
			}), this.json = function() {
				return this.text().then(JSON.parse)
			}, this
		}

		function c(e) {
			var t = e.toUpperCase();
			return h.indexOf(t) > -1 ? t : e
		}

		function u(e, t) {
			if (t = t || {}, this.url = e, this.credentials = t.credentials || "omit", this.headers = new n(t.headers), this.method = c(t.method || "GET"), this.mode = t.mode || null, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && t.body) throw new TypeError("Body not allowed for GET or HEAD requests");
			this._initBody(t.body)
		}

		function l(e) {
			var t = new FormData;
			return e.trim().split("&").forEach(function(e) {
				if (e) {
					var n = e.split("="),
						r = n.shift().replace(/\+/g, " "),
						i = n.join("=").replace(/\+/g, " ");
					t.append(decodeURIComponent(r), decodeURIComponent(i))
				}
			}), t
		}

		function f(e) {
			var t = new n,
				r = e.getAllResponseHeaders().trim().split("\n");
			return r.forEach(function(e) {
				var n = e.trim().split(":"),
					r = n.shift().trim(),
					i = n.join(":").trim();
				t.append(r, i)
			}), t
		}

		function d(e, t) {
			t || (t = {}), this._initBody(e), this.type = "default", this.url = null, this.status = t.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = t.statusText, this.headers = t.headers instanceof n ? t.headers : new n(t.headers), this.url = t.url || ""
		}
		if (!self.fetch) {
			n.prototype.append = function(n, r) {
				n = e(n), r = t(r);
				var i = this.map[n];
				i || (i = [], this.map[n] = i), i.push(r)
			}, n.prototype["delete"] = function(t) {
				delete this.map[e(t)]
			}, n.prototype.get = function(t) {
				var n = this.map[e(t)];
				return n ? n[0] : null
			}, n.prototype.getAll = function(t) {
				return this.map[e(t)] || []
			}, n.prototype.has = function(t) {
				return this.map.hasOwnProperty(e(t))
			}, n.prototype.set = function(n, r) {
				this.map[e(n)] = [t(r)]
			}, n.prototype.forEach = function(e) {
				var t = this;
				Object.getOwnPropertyNames(this.map).forEach(function(n) {
					e(n, t.map[n])
				})
			};
			var p = {
					blob: "FileReader" in self && "Blob" in self && function() {
						try {
							return new Blob, !0
						} catch (e) {
							return !1
						}
					}(),
					formData: "FormData" in self
				},
				h = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
			s.call(u.prototype), s.call(d.prototype), self.Headers = n, self.Request = u, self.Response = d, self.fetch = function(e, t) {
				var n;
				return n = u.prototype.isPrototypeOf(e) && !t ? e : new u(e, t), new Promise(function(e, t) {
					function r() {
						return "responseURL" in i ? i.responseURL : /^X-Request-URL:/m.test(i.getAllResponseHeaders()) ? i.getResponseHeader("X-Request-URL") : void 0
					}
					var i = new XMLHttpRequest;
					"cors" === n.credentials && (i.withCredentials = !0), i.onload = function() {
						var n = 1223 === i.status ? 204 : i.status;
						if (100 > n || n > 599) return void t(new TypeError("Network request failed"));
						var o = {
								status: n,
								statusText: i.statusText,
								headers: f(i),
								url: r()
							},
							a = "response" in i ? i.response : i.responseText;
						e(new d(a, o))
					}, i.onerror = function() {
						t(new TypeError("Network request failed"))
					}, i.open(n.method, n.url, !0), "responseType" in i && p.blob && (i.responseType = "blob"), n.headers.forEach(function(e, t) {
						t.forEach(function(t) {
							i.setRequestHeader(e, t)
						})
					}), i.send("undefined" == typeof n._bodyInit ? null : n._bodyInit)
				})
			}, self.fetch.polyfill = !0
		}
	}(),
	/*
	 * Copyright 2012 The Polymer Authors. All rights reserved.
	 * Use of this source code is governed by a BSD-style
	 * license that can be found in the LICENSE file.
	 */
	"undefined" == typeof WeakMap && ! function() {
		var e = Object.defineProperty,
			t = Date.now() % 1e9,
			n = function() {
				this.name = "__st" + (1e9 * Math.random() >>> 0) + (t+++"__")
			};
		n.prototype = {
			set: function(t, n) {
				var r = t[this.name];
				r && r[0] === t ? r[1] = n : e(t, this.name, {
					value: [t, n],
					writable: !0
				})
			},
			get: function(e) {
				var t;
				return (t = e[this.name]) && t[0] === e ? t[1] : void 0
			},
			"delete": function(e) {
				this.set(e, void 0)
			}
		}, window.WeakMap = n
	}(),
	/*
	 * Copyright 2012 The Polymer Authors. All rights reserved.
	 * Use of this source code is goverened by a BSD-style
	 * license that can be found in the LICENSE file.
	 */
	function(e) {
		function t(e) {
			w.push(e), b || (b = !0, v(r))
		}

		function n(e) {
			return window.ShadowDOMPolyfill && window.ShadowDOMPolyfill.wrapIfNeeded(e) || e
		}

		function r() {
			b = !1;
			var e = w;
			w = [], e.sort(function(e, t) {
				return e.uid_ - t.uid_
			});
			var t = !1;
			e.forEach(function(e) {
				var n = e.takeRecords();
				i(e), n.length && (e.callback_(n, e), t = !0)
			}), t && r()
		}

		function i(e) {
			e.nodes_.forEach(function(t) {
				var n = m.get(t);
				n && n.forEach(function(t) {
					t.observer === e && t.removeTransientObservers()
				})
			})
		}

		function o(e, t) {
			for (var n = e; n; n = n.parentNode) {
				var r = m.get(n);
				if (r)
					for (var i = 0; i < r.length; i++) {
						var o = r[i],
							a = o.options;
						if (n === e || a.subtree) {
							var s = t(a);
							s && o.enqueue(s)
						}
					}
			}
		}

		function a(e) {
			this.callback_ = e, this.nodes_ = [], this.records_ = [], this.uid_ = ++x
		}

		function s(e, t) {
			this.type = e, this.target = t, this.addedNodes = [], this.removedNodes = [], this.previousSibling = null, this.nextSibling = null, this.attributeName = null, this.attributeNamespace = null, this.oldValue = null
		}

		function c(e) {
			var t = new s(e.type, e.target);
			return t.addedNodes = e.addedNodes.slice(), t.removedNodes = e.removedNodes.slice(), t.previousSibling = e.previousSibling, t.nextSibling = e.nextSibling, t.attributeName = e.attributeName, t.attributeNamespace = e.attributeNamespace, t.oldValue = e.oldValue, t
		}

		function u(e, t) {
			return E = new s(e, t)
		}

		function l(e) {
			return T ? T : (T = c(E), T.oldValue = e, T)
		}

		function f() {
			E = T = void 0
		}

		function d(e) {
			return e === T || e === E
		}

		function p(e, t) {
			return e === t ? e : T && d(e) ? T : null
		}

		function h(e, t, n) {
			this.observer = e, this.target = t, this.options = n, this.transientObservedNodes = []
		}
		var m = new WeakMap,
			v = window.msSetImmediate;
		if (!v) {
			var g = [],
				y = String(Math.random());
			window.addEventListener("message", function(e) {
				if (e.data === y) {
					var t = g;
					g = [], t.forEach(function(e) {
						e()
					})
				}
			}), v = function(e) {
				g.push(e), window.postMessage(y, "*")
			}
		}
		var b = !1,
			w = [],
			x = 0;
		a.prototype = {
			observe: function(e, t) {
				if (e = n(e), !t.childList && !t.attributes && !t.characterData || t.attributeOldValue && !t.attributes || t.attributeFilter && t.attributeFilter.length && !t.attributes || t.characterDataOldValue && !t.characterData) throw new SyntaxError;
				var r = m.get(e);
				r || m.set(e, r = []);
				for (var i, o = 0; o < r.length; o++)
					if (r[o].observer === this) {
						i = r[o], i.removeListeners(), i.options = t;
						break
					}
				i || (i = new h(this, e, t), r.push(i), this.nodes_.push(e)), i.addListeners()
			},
			disconnect: function() {
				this.nodes_.forEach(function(e) {
					for (var t = m.get(e), n = 0; n < t.length; n++) {
						var r = t[n];
						if (r.observer === this) {
							r.removeListeners(), t.splice(n, 1);
							break
						}
					}
				}, this), this.records_ = []
			},
			takeRecords: function() {
				var e = this.records_;
				return this.records_ = [], e
			}
		};
		var E, T;
		h.prototype = {
			enqueue: function(e) {
				var n = this.observer.records_,
					r = n.length;
				if (n.length > 0) {
					var i = n[r - 1],
						o = p(i, e);
					if (o) return void(n[r - 1] = o)
				} else t(this.observer);
				n[r] = e
			},
			addListeners: function() {
				this.addListeners_(this.target)
			},
			addListeners_: function(e) {
				var t = this.options;
				t.attributes && e.addEventListener("DOMAttrModified", this, !0), t.characterData && e.addEventListener("DOMCharacterDataModified", this, !0), t.childList && e.addEventListener("DOMNodeInserted", this, !0), (t.childList || t.subtree) && e.addEventListener("DOMNodeRemoved", this, !0)
			},
			removeListeners: function() {
				this.removeListeners_(this.target)
			},
			removeListeners_: function(e) {
				var t = this.options;
				t.attributes && e.removeEventListener("DOMAttrModified", this, !0), t.characterData && e.removeEventListener("DOMCharacterDataModified", this, !0), t.childList && e.removeEventListener("DOMNodeInserted", this, !0), (t.childList || t.subtree) && e.removeEventListener("DOMNodeRemoved", this, !0)
			},
			addTransientObserver: function(e) {
				if (e !== this.target) {
					this.addListeners_(e), this.transientObservedNodes.push(e);
					var t = m.get(e);
					t || m.set(e, t = []), t.push(this)
				}
			},
			removeTransientObservers: function() {
				var e = this.transientObservedNodes;
				this.transientObservedNodes = [], e.forEach(function(e) {
					this.removeListeners_(e);
					for (var t = m.get(e), n = 0; n < t.length; n++)
						if (t[n] === this) {
							t.splice(n, 1);
							break
						}
				}, this)
			},
			handleEvent: function(e) {
				switch (e.stopImmediatePropagation(), e.type) {
					case "DOMAttrModified":
						var t = e.attrName,
							n = e.relatedNode.namespaceURI,
							r = e.target,
							i = new u("attributes", r);
						i.attributeName = t, i.attributeNamespace = n;
						var a = e.attrChange === MutationEvent.ADDITION ? null : e.prevValue;
						o(r, function(e) {
							return !e.attributes || e.attributeFilter && e.attributeFilter.length && -1 === e.attributeFilter.indexOf(t) && -1 === e.attributeFilter.indexOf(n) ? void 0 : e.attributeOldValue ? l(a) : i
						});
						break;
					case "DOMCharacterDataModified":
						var r = e.target,
							i = u("characterData", r),
							a = e.prevValue;
						o(r, function(e) {
							return e.characterData ? e.characterDataOldValue ? l(a) : i : void 0
						});
						break;
					case "DOMNodeRemoved":
						this.addTransientObserver(e.target);
					case "DOMNodeInserted":
						var s, c, r = e.relatedNode,
							d = e.target;
						"DOMNodeInserted" === e.type ? (s = [d], c = []) : (s = [], c = [d]);
						var p = d.previousSibling,
							h = d.nextSibling,
							i = u("childList", r);
						i.addedNodes = s, i.removedNodes = c, i.previousSibling = p, i.nextSibling = h, o(r, function(e) {
							return e.childList ? i : void 0
						})
				}
				f()
			}
		}, e.JsMutationObserver = a, e.MutationObserver || (e.MutationObserver = a)
	}(this), !window.CustomEvent || "function" != typeof window.CustomEvent) {
	var CustomEvent = function(e, t) {
		var n;
		return t = t || {
			bubbles: !1,
			cancelable: !1,
			detail: void 0
		}, n = document.createEvent("CustomEvent"), n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n
	};
	CustomEvent.prototype = window.Event.prototype, window.CustomEvent = CustomEvent
}
/*
Copyright 2013 The Polymer Authors. All rights reserved.
Use of this source code is governed by a BSD-style
license that can be found in the LICENSE file.
*/
window.CustomElements = window.CustomElements || {
		flags: {}
	},
	/*
	Copyright 2013 The Polymer Authors. All rights reserved.
	Use of this source code is governed by a BSD-style
	license that can be found in the LICENSE file.
	*/
	function(e) {
		function t(e, n, r) {
			var i = e.firstElementChild;
			if (!i)
				for (i = e.firstChild; i && i.nodeType !== Node.ELEMENT_NODE;) i = i.nextSibling;
			for (; i;) n(i, r) !== !0 && t(i, n, r), i = i.nextElementSibling;
			return null
		}

		function n(e, t) {
			for (var n = e.shadowRoot; n;) r(n, t), n = n.olderShadowRoot
		}

		function r(e, r) {
			t(e, function(e) {
				return r(e) ? !0 : void n(e, r)
			}), n(e, r)
		}

		function i(e) {
			return s(e) ? (c(e), !0) : void f(e)
		}

		function o(e) {
			r(e, function(e) {
				return i(e) ? !0 : void 0
			})
		}

		function a(e) {
			return i(e) || o(e)
		}

		function s(t) {
			if (!t.__upgraded__ && t.nodeType === Node.ELEMENT_NODE) {
				var n = t.getAttribute("is") || t.localName,
					r = e.registry[n];
				if (r) return k.dom && console.group("upgrade:", t.localName), e.upgrade(t), k.dom && console.groupEnd(), !0
			}
		}

		function c(e) {
			f(e), g(e) && r(e, function(e) {
				f(e)
			})
		}

		function u(e) {
			if (D.push(e), !N) {
				N = !0;
				var t = window.Platform && window.Platform.endOfMicrotask || setTimeout;
				t(l)
			}
		}

		function l() {
			N = !1;
			for (var e, t = D, n = 0, r = t.length; r > n && (e = t[n]); n++) e();
			D = []
		}

		function f(e) {
			A ? u(function() {
				d(e)
			}) : d(e)
		}

		function d(e) {
			(e.attachedCallback || e.detachedCallback || e.__upgraded__ && k.dom) && (k.dom && console.group("inserted:", e.localName), g(e) && (e.__inserted = (e.__inserted || 0) + 1, e.__inserted < 1 && (e.__inserted = 1), e.__inserted > 1 ? k.dom && console.warn("inserted:", e.localName, "insert/remove count:", e.__inserted) : e.attachedCallback && (k.dom && console.log("inserted:", e.localName), e.attachedCallback())), k.dom && console.groupEnd())
		}

		function p(e) {
			h(e), r(e, function(e) {
				h(e)
			})
		}

		function h(e) {
			A ? u(function() {
				m(e)
			}) : m(e)
		}

		function m(e) {
			(e.attachedCallback || e.detachedCallback || e.__upgraded__ && k.dom) && (k.dom && console.group("removed:", e.localName), g(e) || (e.__inserted = (e.__inserted || 0) - 1, e.__inserted > 0 && (e.__inserted = 0), e.__inserted < 0 ? k.dom && console.warn("removed:", e.localName, "insert/remove count:", e.__inserted) : e.detachedCallback && e.detachedCallback()), k.dom && console.groupEnd())
		}

		function v(e) {
			return window.ShadowDOMPolyfill ? ShadowDOMPolyfill.wrapIfNeeded(e) : e
		}

		function g(e) {
			for (var t = e, n = v(document); t;) {
				if (t == n) return !0;
				t = t.parentNode || t.host
			}
		}

		function y(e) {
			if (e.shadowRoot && !e.shadowRoot.__watched) {
				k.dom && console.log("watching shadow-root for: ", e.localName);
				for (var t = e.shadowRoot; t;) b(t), t = t.olderShadowRoot
			}
		}

		function b(e) {
			e.__watched || (E(e), e.__watched = !0)
		}

		function w(e) {
			if (k.dom) {
				var t = e[0];
				if (t && "childList" === t.type && t.addedNodes && t.addedNodes) {
					for (var n = t.addedNodes[0]; n && n !== document && !n.host;) n = n.parentNode;
					var r = n && (n.URL || n._URL || n.host && n.host.localName) || "";
					r = r.split("/?").shift().split("/").pop()
				}
				console.group("mutations (%d) [%s]", e.length, r || "")
			}
			e.forEach(function(e) {
				"childList" === e.type && (P(e.addedNodes, function(e) {
					e.localName && a(e)
				}), P(e.removedNodes, function(e) {
					e.localName && p(e)
				}))
			}), k.dom && console.groupEnd()
		}

		function x() {
			w(j.takeRecords()), l()
		}

		function E(e) {
			j.observe(e, {
				childList: !0,
				subtree: !0
			})
		}

		function T(e) {
			E(e)
		}

		function _(e) {
			k.dom && console.group("upgradeDocument: ", e.baseURI.split("/").pop()), a(e), k.dom && console.groupEnd()
		}

		function C(e) {
			e = v(e);
			for (var t, n = e.querySelectorAll("link[rel=" + S + "]"), r = 0, i = n.length; i > r && (t = n[r]); r++) t.import && t.import.__parsed && C(t.import);
			_(e)
		}
		var k = window.logFlags || {},
			S = window.HTMLImports ? HTMLImports.IMPORT_LINK_TYPE : "none",
			A = !window.MutationObserver || window.MutationObserver === window.JsMutationObserver;
		e.hasPolyfillMutations = A;
		var N = !1,
			D = [],
			j = new MutationObserver(w),
			P = Array.prototype.forEach.call.bind(Array.prototype.forEach);
		e.IMPORT_LINK_TYPE = S, e.watchShadow = y, e.upgradeDocumentTree = C, e.upgradeAll = a, e.upgradeSubtree = o, e.insertedNode = c, e.observeDocument = T, e.upgradeDocument = _, e.takeRecords = x
	}(window.CustomElements),
	/*
	 * Copyright 2013 The Polymer Authors. All rights reserved.
	 * Use of this source code is governed by a BSD-style
	 * license that can be found in the LICENSE file.
	 */
	function(e) {
		function t(t, a) {
			var s = a || {};
			if (!t) throw new Error("document.registerElement: first argument `name` must not be empty");
			if (t.indexOf("-") < 0) throw new Error("document.registerElement: first argument ('name') must contain a dash ('-'). Argument provided was '" + String(t) + "'.");
			if (n(t)) throw new Error("Failed to execute 'registerElement' on 'Document': Registration failed for type '" + String(t) + "'. The type name is invalid.");
			if (p(t)) throw new Error("DuplicateDefinitionError: a type with name '" + String(t) + "' is already registered");
			if (!s.prototype) throw new Error("Options missing required prototype property");
			return s.__name = t.toLowerCase(), s.lifecycle = s.lifecycle || {}, s.ancestry = r(s.extends), i(s), o(s), f(s.prototype), h(s.__name, s), s.ctor = m(s), s.ctor.prototype = s.prototype, s.prototype.constructor = s.ctor, e.ready && e.upgradeDocumentTree(document), s.ctor
		}

		function n(e) {
			for (var t = 0; t < _.length; t++)
				if (e === _[t]) return !0
		}

		function r(e) {
			var t = p(e);
			return t ? r(t.extends).concat([t]) : []
		}

		function i(e) {
			for (var t, n = e.extends, r = 0; t = e.ancestry[r]; r++) n = t.is && t.tag;
			e.tag = n || e.__name, n && (e.is = e.__name)
		}

		function o(e) {
			if (!Object.__proto__) {
				var t = HTMLElement.prototype;
				if (e.is) {
					var n = document.createElement(e.tag),
						r = Object.getPrototypeOf(n);
					r === e.prototype && (t = r)
				}
				for (var i, o = e.prototype; o && o !== t;) i = Object.getPrototypeOf(o), o.__proto__ = i, o = i;
				e.native = t
			}
		}

		function a(e) {
			return s(S(e.tag), e)
		}

		function s(t, n) {
			return n.is && t.setAttribute("is", n.is), t.removeAttribute("unresolved"), c(t, n), t.__upgraded__ = !0, l(t), e.insertedNode(t), e.upgradeSubtree(t), t
		}

		function c(e, t) {
			Object.__proto__ ? e.__proto__ = t.prototype : (u(e, t.prototype, t.native), e.__proto__ = t.prototype)
		}

		function u(e, t, n) {
			for (var r = {}, i = t; i !== n && i !== HTMLElement.prototype;) {
				for (var o, a = Object.getOwnPropertyNames(i), s = 0; o = a[s]; s++) r[o] || (Object.defineProperty(e, o, Object.getOwnPropertyDescriptor(i, o)), r[o] = 1);
				i = Object.getPrototypeOf(i)
			}
		}

		function l(e) {
			e.createdCallback && e.createdCallback()
		}

		function f(e) {
			if (!e.setAttribute._polyfilled) {
				var t = e.setAttribute;
				e.setAttribute = function(e, n) {
					d.call(this, e, n, t)
				};
				var n = e.removeAttribute;
				e.removeAttribute = function(e) {
					d.call(this, e, null, n)
				}, e.setAttribute._polyfilled = !0
			}
		}

		function d(e, t, n) {
			var r = this.getAttribute(e);
			n.apply(this, arguments);
			var i = this.getAttribute(e);
			this.attributeChangedCallback && i !== r && this.attributeChangedCallback(e, r, i)
		}

		function p(e) {
			return e ? C[e.toLowerCase()] : void 0
		}

		function h(e, t) {
			C[e] = t
		}

		function m(e) {
			return function() {
				return a(e)
			}
		}

		function v(e, t, n) {
			return e === k ? g(t, n) : A(e, t)
		}

		function g(e, t) {
			var n = p(t || e);
			if (n) {
				if (e == n.tag && t == n.is) return new n.ctor;
				if (!t && !n.is) return new n.ctor
			}
			if (t) {
				var r = g(e);
				return r.setAttribute("is", t), r
			}
			var r = S(e);
			return e.indexOf("-") >= 0 && c(r, HTMLElement), r
		}

		function y(e) {
			if (!e.__upgraded__ && e.nodeType === Node.ELEMENT_NODE) {
				var t = e.getAttribute("is"),
					n = p(t || e.localName);
				if (n) {
					if (t && n.tag == e.localName) return s(e, n);
					if (!t && !n.extends) return s(e, n)
				}
			}
		}

		function b(t) {
			var n = N.call(this, t);
			return e.upgradeAll(n), n
		}
		e || (e = window.CustomElements = {
			flags: {}
		});
		var w = e.flags,
			x = Boolean(document.registerElement),
			E = !w.register && x && !window.ShadowDOMPolyfill;
		if (E) {
			var T = function() {};
			e.registry = {}, e.upgradeElement = T, e.watchShadow = T, e.upgrade = T, e.upgradeAll = T, e.upgradeSubtree = T, e.observeDocument = T, e.upgradeDocument = T, e.upgradeDocumentTree = T, e.takeRecords = T, e.reservedTagList = []
		} else {
			var _ = ["annotation-xml", "color-profile", "font-face", "font-face-src", "font-face-uri", "font-face-format", "font-face-name", "missing-glyph"],
				C = {},
				k = "http://www.w3.org/1999/xhtml",
				S = document.createElement.bind(document),
				A = document.createElementNS.bind(document),
				N = Node.prototype.cloneNode;
			document.registerElement = t, document.createElement = g, document.createElementNS = v, Node.prototype.cloneNode = b, e.registry = C, e.upgrade = y
		}
		var D;
		D = Object.__proto__ || E ? function(e, t) {
			return e instanceof t
		} : function(e, t) {
			for (var n = e; n;) {
				if (n === t.prototype) return !0;
				n = n.__proto__
			}
			return !1
		}, e.instanceof = D, e.reservedTagList = _, document.register = document.registerElement, e.hasNative = x, e.useNative = E
	}(window.CustomElements),
	/*
	 * Copyright 2013 The Polymer Authors. All rights reserved.
	 * Use of this source code is governed by a BSD-style
	 * license that can be found in the LICENSE file.
	 */
	function(e) {
		function t(e) {
			return "link" === e.localName && e.getAttribute("rel") === n
		}
		var n = e.IMPORT_LINK_TYPE,
			r = {
				selectors: ["link[rel=" + n + "]"],
				map: {
					link: "parseLink"
				},
				parse: function(e) {
					if (!e.__parsed) {
						e.__parsed = !0;
						var t = e.querySelectorAll(r.selectors);
						i(t, function(e) {
							r[r.map[e.localName]](e)
						}), CustomElements.upgradeDocument(e), CustomElements.observeDocument(e)
					}
				},
				parseLink: function(e) {
					t(e) && this.parseImport(e)
				},
				parseImport: function(e) {
					e.import && r.parse(e.import)
				}
			},
			i = Array.prototype.forEach.call.bind(Array.prototype.forEach);
		e.parser = r, e.IMPORT_LINK_TYPE = n
	}(window.CustomElements),
	/*
	 * Copyright 2013 The Polymer Authors. All rights reserved.
	 * Use of this source code is governed by a BSD-style
	 * license that can be found in the LICENSE file.
	 */
	function(e) {
		function t() {
			CustomElements.parser.parse(document), CustomElements.upgradeDocument(document);
			var e = window.Platform && Platform.endOfMicrotask ? Platform.endOfMicrotask : setTimeout;
			e(function() {
				CustomElements.ready = !0, CustomElements.readyTime = Date.now(), window.HTMLImports && (CustomElements.elapsed = CustomElements.readyTime - HTMLImports.readyTime), document.dispatchEvent(new CustomEvent("WebComponentsReady", {
					bubbles: !0
				})), window.HTMLImports && (HTMLImports.__importsParsingHook = function(e) {
					CustomElements.parser.parse(e.import)
				})
			})
		}
		if ("function" != typeof window.CustomEvent && (window.CustomEvent = function(e) {
			var t = document.createEvent("HTMLEvents");
			return t.initEvent(e, !0, !0), t
		}), "complete" === document.readyState || e.flags.eager) t();
		else if ("interactive" !== document.readyState || window.attachEvent || window.HTMLImports && !window.HTMLImports.ready) {
			var n = window.HTMLImports && !HTMLImports.ready ? "HTMLImportsLoaded" : "DOMContentLoaded";
			window.addEventListener(n, t)
		} else t()
	}(window.CustomElements), "document" in self && ("classList" in document.createElement("_") ? ! function() {
		"use strict";
		var e = document.createElement("_");
		if (e.classList.add("c1", "c2"), !e.classList.contains("c2")) {
			var t = function(e) {
				var t = DOMTokenList.prototype[e];
				DOMTokenList.prototype[e] = function(e) {
					var n, r = arguments.length;
					for (n = 0; r > n; n++) e = arguments[n], t.call(this, e)
				}
			};
			t("add"), t("remove")
		}
		if (e.classList.toggle("c3", !1), e.classList.contains("c3")) {
			var n = DOMTokenList.prototype.toggle;
			DOMTokenList.prototype.toggle = function(e, t) {
				return 1 in arguments && !this.contains(e) == !t ? t : n.call(this, e)
			}
		}
		e = null
	}() : ! function(e) {
		"use strict";
		if ("Element" in e) {
			var t = "classList",
				n = "prototype",
				r = e.Element[n],
				i = Object,
				o = String[n].trim || function() {
					return this.replace(/^\s+|\s+$/g, "")
				},
				a = Array[n].indexOf || function(e) {
					for (var t = 0, n = this.length; n > t; t++)
						if (t in this && this[t] === e) return t;
					return -1
				},
				s = function(e, t) {
					this.name = e, this.code = DOMException[e], this.message = t
				},
				c = function(e, t) {
					if ("" === t) throw new s("SYNTAX_ERR", "An invalid or illegal string was specified");
					if (/\s/.test(t)) throw new s("INVALID_CHARACTER_ERR", "String contains an invalid character");
					return a.call(e, t)
				},
				u = function(e) {
					for (var t = o.call(e.getAttribute("class") || ""), n = t ? t.split(/\s+/) : [], r = 0, i = n.length; i > r; r++) this.push(n[r]);
					this._updateClassName = function() {
						e.setAttribute("class", this.toString())
					}
				},
				l = u[n] = [],
				f = function() {
					return new u(this)
				};
			if (s[n] = Error[n], l.item = function(e) {
				return this[e] || null
			}, l.contains = function(e) {
				return e += "", -1 !== c(this, e)
			}, l.add = function() {
				var e, t = arguments,
					n = 0,
					r = t.length,
					i = !1;
				do e = t[n] + "", -1 === c(this, e) && (this.push(e), i = !0); while (++n < r);
				i && this._updateClassName()
			}, l.remove = function() {
				var e, t, n = arguments,
					r = 0,
					i = n.length,
					o = !1;
				do
					for (e = n[r] + "", t = c(this, e); - 1 !== t;) this.splice(t, 1), o = !0, t = c(this, e); while (++r < i);
				o && this._updateClassName()
			}, l.toggle = function(e, t) {
				e += "";
				var n = this.contains(e),
					r = n ? t !== !0 && "remove" : t !== !1 && "add";
				return r && this[r](e), t === !0 || t === !1 ? t : !n
			}, l.toString = function() {
				return this.join(" ")
			}, i.defineProperty) {
				var d = {
					get: f,
					enumerable: !0,
					configurable: !0
				};
				try {
					i.defineProperty(r, t, d)
				} catch (p) {
					-2146823252 === p.number && (d.enumerable = !1, i.defineProperty(r, t, d))
				}
			} else i[n].__defineGetter__ && r.__defineGetter__(t, f)
		}
	}(self)),
	/**
	 * requestAnimationFrame version: "0.0.17" Copyright (c) 2011-2012, Cyril Agosta ( cyril.agosta.dev@gmail.com) All Rights Reserved.
	 * Available via the MIT license.
	 * see: http://github.com/cagosta/requestAnimationFrame for details
	 *
	 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	 * http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
	 * requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
	 * MIT license
	 *
	 */
	function() {
		if ("undefined" != typeof window) {
			if (window.requestAnimationFrame) return window.requestAnimationFrame;
			if (window.webkitRequestAnimationFrame) return window.requestAnimationFrame = window.webkitRequestAnimationFrame, window.cancelAnimationFrame = window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame, window.requestAnimationFrame;
			var e = 0;
			window.requestAnimationFrame = function(t) {
				var n = (new Date).getTime(),
					r = Math.max(0, 16 - (n - e)),
					i = window.setTimeout(function() {
						t(n + r)
					}, r);
				return e = n + r, i
			}, window.cancelAnimationFrame = function(e) {
				clearTimeout(e)
			}, "function" == typeof define && define(function() {
				return window.requestAnimationFrame
			})
		}
	}(),
	/* Any copyright is dedicated to the Public Domain.
	 * http://creativecommons.org/publicdomain/zero/1.0/ */
	function(e) {
		"use strict";

		function t(e) {
			return void 0 !== d[e]
		}

		function n() {
			s.call(this), this._isInvalid = !0
		}

		function r(e) {
			return "" == e && n.call(this), e.toLowerCase()
		}

		function i(e) {
			var t = e.charCodeAt(0);
			return t > 32 && 127 > t && -1 == [34, 35, 60, 62, 63, 96].indexOf(t) ? e : encodeURIComponent(e)
		}

		function o(e) {
			var t = e.charCodeAt(0);
			return t > 32 && 127 > t && -1 == [34, 35, 60, 62, 96].indexOf(t) ? e : encodeURIComponent(e)
		}

		function a(e, a, s) {
			function c(e) {
				b.push(e)
			}
			var u = a || "scheme start",
				l = 0,
				f = "",
				g = !1,
				y = !1,
				b = [];
			e: for (;
				(e[l - 1] != h || 0 == l) && !this._isInvalid;) {
				var w = e[l];
				switch (u) {
					case "scheme start":
						if (!w || !m.test(w)) {
							if (a) {
								c("Invalid scheme.");
								break e
							}
							f = "", u = "no scheme";
							continue
						}
						f += w.toLowerCase(), u = "scheme";
						break;
					case "scheme":
						if (w && v.test(w)) f += w.toLowerCase();
						else {
							if (":" != w) {
								if (a) {
									if (h == w) break e;
									c("Code point not allowed in scheme: " + w);
									break e
								}
								f = "", l = 0, u = "no scheme";
								continue
							}
							if (this._scheme = f, f = "", a) break e;
							t(this._scheme) && (this._isRelative = !0), u = "file" == this._scheme ? "relative" : this._isRelative && s && s._scheme == this._scheme ? "relative or authority" : this._isRelative ? "authority first slash" : "scheme data"
						}
						break;
					case "scheme data":
						"?" == w ? (query = "?", u = "query") : "#" == w ? (this._fragment = "#", u = "fragment") : h != w && "	" != w && "\n" != w && "\r" != w && (this._schemeData += i(w));
						break;
					case "no scheme":
						if (s && t(s._scheme)) {
							u = "relative";
							continue
						}
						c("Missing scheme."), n.call(this);
						break;
					case "relative or authority":
						if ("/" != w || "/" != e[l + 1]) {
							c("Expected /, got: " + w), u = "relative";
							continue
						}
						u = "authority ignore slashes";
						break;
					case "relative":
						if (this._isRelative = !0, "file" != this._scheme && (this._scheme = s._scheme), h == w) {
							this._host = s._host, this._port = s._port, this._path = s._path.slice(), this._query = s._query;
							break e
						}
						if ("/" == w || "\\" == w) "\\" == w && c("\\ is an invalid code point."), u = "relative slash";
						else if ("?" == w) this._host = s._host, this._port = s._port, this._path = s._path.slice(), this._query = "?", u = "query";
						else {
							if ("#" != w) {
								var x = e[l + 1],
									E = e[l + 2];
								("file" != this._scheme || !m.test(w) || ":" != x && "|" != x || h != E && "/" != E && "\\" != E && "?" != E && "#" != E) && (this._host = s._host, this._port = s._port, this._path = s._path.slice(), this._path.pop()), u = "relative path";
								continue
							}
							this._host = s._host, this._port = s._port, this._path = s._path.slice(), this._query = s._query, this._fragment = "#", u = "fragment"
						}
						break;
					case "relative slash":
						if ("/" != w && "\\" != w) {
							"file" != this._scheme && (this._host = s._host, this._port = s._port), u = "relative path";
							continue
						}
						"\\" == w && c("\\ is an invalid code point."), u = "file" == this._scheme ? "file host" : "authority ignore slashes";
						break;
					case "authority first slash":
						if ("/" != w) {
							c("Expected '/', got: " + w), u = "authority ignore slashes";
							continue
						}
						u = "authority second slash";
						break;
					case "authority second slash":
						if (u = "authority ignore slashes", "/" != w) {
							c("Expected '/', got: " + w);
							continue
						}
						break;
					case "authority ignore slashes":
						if ("/" != w && "\\" != w) {
							u = "authority";
							continue
						}
						c("Expected authority, got: " + w);
						break;
					case "authority":
						if ("@" == w) {
							g && (c("@ already seen."), f += "%40"), g = !0;
							for (var T = 0; T < f.length; T++) {
								var _ = f[T];
								if ("	" != _ && "\n" != _ && "\r" != _)
									if (":" != _ || null !== this._password) {
										var C = i(_);
										null !== this._password ? this._password += C : this._username += C
									} else this._password = "";
								else c("Invalid whitespace in authority.")
							}
							f = ""
						} else {
							if (h == w || "/" == w || "\\" == w || "?" == w || "#" == w) {
								l -= f.length, f = "", u = "host";
								continue
							}
							f += w
						}
						break;
					case "file host":
						if (h == w || "/" == w || "\\" == w || "?" == w || "#" == w) {
							2 != f.length || !m.test(f[0]) || ":" != f[1] && "|" != f[1] ? 0 == f.length ? u = "relative path start" : (this._host = r.call(this, f), f = "", u = "relative path start") : u = "relative path";
							continue
						}
						"	" == w || "\n" == w || "\r" == w ? c("Invalid whitespace in file host.") : f += w;
						break;
					case "host":
					case "hostname":
						if (":" != w || y) {
							if (h == w || "/" == w || "\\" == w || "?" == w || "#" == w) {
								if (this._host = r.call(this, f), f = "", u = "relative path start", a) break e;
								continue
							}
							"	" != w && "\n" != w && "\r" != w ? ("[" == w ? y = !0 : "]" == w && (y = !1), f += w) : c("Invalid code point in host/hostname: " + w)
						} else if (this._host = r.call(this, f), f = "", u = "port", "hostname" == a) break e;
						break;
					case "port":
						if (/[0-9]/.test(w)) f += w;
						else {
							if (h == w || "/" == w || "\\" == w || "?" == w || "#" == w || a) {
								if ("" != f) {
									var k = parseInt(f, 10);
									k != d[this._scheme] && (this._port = k + ""), f = ""
								}
								if (a) break e;
								u = "relative path start";
								continue
							}
							"	" == w || "\n" == w || "\r" == w ? c("Invalid code point in port: " + w) : n.call(this)
						}
						break;
					case "relative path start":
						if ("\\" == w && c("'\\' not allowed in path."), u = "relative path", "/" != w && "\\" != w) continue;
						break;
					case "relative path":
						if (h != w && "/" != w && "\\" != w && (a || "?" != w && "#" != w)) "	" != w && "\n" != w && "\r" != w && (f += i(w));
						else {
							"\\" == w && c("\\ not allowed in relative path.");
							var S;
							(S = p[f.toLowerCase()]) && (f = S), ".." == f ? (this._path.pop(), "/" != w && "\\" != w && this._path.push("")) : "." == f && "/" != w && "\\" != w ? this._path.push("") : "." != f && ("file" == this._scheme && 0 == this._path.length && 2 == f.length && m.test(f[0]) && "|" == f[1] && (f = f[0] + ":"), this._path.push(f)), f = "", "?" == w ? (this._query = "?", u = "query") : "#" == w && (this._fragment = "#", u = "fragment")
						}
						break;
					case "query":
						a || "#" != w ? h != w && "	" != w && "\n" != w && "\r" != w && (this._query += o(w)) : (this._fragment = "#", u = "fragment");
						break;
					case "fragment":
						h != w && "	" != w && "\n" != w && "\r" != w && (this._fragment += w)
				}
				l++
			}
		}

		function s() {
			this._scheme = "", this._schemeData = "", this._username = "", this._password = null, this._host = "", this._port = "", this._path = [], this._query = "", this._fragment = "", this._isInvalid = !1, this._isRelative = !1
		}

		function c(e, t) {
			void 0 === t || t instanceof c || (t = new c(String(t))), this._url = e, s.call(this);
			var n = e.replace(/^[ \t\r\n\f]+|[ \t\r\n\f]+$/g, "");
			a.call(this, n, null, t)
		}
		var u = !1;
		if (!e.forceJURL) try {
			var l = new URL("b", "http://a");
			l.pathname = "c%20d", u = "http://a/c%20d" === l.href
		} catch (f) {}
		if (!u) {
			var d = Object.create(null);
			d.ftp = 21, d.file = 0, d.gopher = 70, d.http = 80, d.https = 443, d.ws = 80, d.wss = 443;
			var p = Object.create(null);
			p["%2e"] = ".", p[".%2e"] = "..", p["%2e."] = "..", p["%2e%2e"] = "..";
			var h = void 0,
				m = /[a-zA-Z]/,
				v = /[a-zA-Z0-9\+\-\.]/;
			c.prototype = {
				get href() {
					if (this._isInvalid) return this._url;
					var e = "";
					return ("" != this._username || null != this._password) && (e = this._username + (null != this._password ? ":" + this._password : "") + "@"), this.protocol + (this._isRelative ? "//" + e + this.host : "") + this.pathname + this._query + this._fragment
				}, set href(e) {
					s.call(this), a.call(this, e)
				}, get protocol() {
					return this._scheme + ":"
				}, set protocol(e) {
					this._isInvalid || a.call(this, e + ":", "scheme start")
				}, get host() {
					return this._isInvalid ? "" : this._port ? this._host + ":" + this._port : this._host
				}, set host(e) {
					!this._isInvalid && this._isRelative && a.call(this, e, "host")
				}, get hostname() {
					return this._host
				}, set hostname(e) {
					!this._isInvalid && this._isRelative && a.call(this, e, "hostname")
				}, get port() {
					return this._port
				}, set port(e) {
					!this._isInvalid && this._isRelative && a.call(this, e, "port")
				}, get pathname() {
					return this._isInvalid ? "" : this._isRelative ? "/" + this._path.join("/") : this._schemeData
				}, set pathname(e) {
					!this._isInvalid && this._isRelative && (this._path = [], a.call(this, e, "relative path start"))
				}, get search() {
					return this._isInvalid || !this._query || "?" == this._query ? "" : this._query
				}, set search(e) {
					!this._isInvalid && this._isRelative && (this._query = "?", "?" == e[0] && (e = e.slice(1)), a.call(this, e, "query"))
				}, get hash() {
					return this._isInvalid || !this._fragment || "#" == this._fragment ? "" : this._fragment
				}, set hash(e) {
					this._isInvalid || (this._fragment = "#", "#" == e[0] && (e = e.slice(1)), a.call(this, e, "fragment"))
				}, get origin() {
					var e;
					if (this._isInvalid || !this._scheme) return "";
					switch (this._scheme) {
						case "data":
						case "file":
						case "javascript":
						case "mailto":
							return "null"
					}
					return e = this.host, e ? this._scheme + "://" + e : ""
				}
			};
			var g = e.URL;
			g && (c.createObjectURL = function() {
				return g.createObjectURL.apply(g, arguments)
			}, c.revokeObjectURL = function(e) {
				g.revokeObjectURL(e)
			}), e.URL = c
		}
	}(this),
	function(e) {
		"function" != typeof e.matches && (e.matches = e.msMatchesSelector || e.mozMatchesSelector || e.webkitMatchesSelector || function(e) {
			for (var t = this, n = (t.document || t.ownerDocument).querySelectorAll(e), r = 0; n[r] && n[r] !== t;) ++r;
			return !!n[r]
		}), "function" != typeof e.closest && (e.closest = function(e) {
			for (var t = this; t && 11 != t.nodeType;) {
				if (t.matches(e)) return t;
				t = t.parentElement
			}
			return null
		})
	}(Element.prototype),
	function(e) {
		function t(e) {
			return "string" == typeof e ? document.createTextNode(e) : e
		}

		function n(e) {
			if (e.length) {
				if (1 === e.length) return t(e[0]);
				var n, r = document.createDocumentFragment();
				for (n = 0; n < e.length; n++) r.appendChild(t(e[n]));
				return r
			}
			throw new Error("DOM Exception 8")
		}
		"prepend" in e || (e.prepend = function() {
			this.insertBefore(n(arguments), this.firstChild)
		}), "append" in e || (e.append = function() {
			this.appendChild(n(arguments))
		}), "before" in e || (e.before = function() {
			this.parentNode && this.parentNode.insertBefore(n(arguments), this)
		}), "after" in e || (e.after = function() {
			this.parentNode && this.parentNode.insertBefore(n(arguments), this.nextSibling)
		}), "replaceWith" in e || (e.replaceWith = function() {
			this.parentNode && this.parentNode.replaceChild(n(arguments), this)
		}), "remove" in e || (e.remove = function() {
			this.parentNode && this.parentNode.removeChild(this)
		})
	}(Element.prototype),
	/*!
	 * jQuery JavaScript Library v2.1.3
	 * http://jquery.com/
	 *
	 * Includes Sizzle.js
	 * http://sizzlejs.com/
	 *
	 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2014-12-18T15:11Z
	 */
	function(e, t) {
		"object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
			if (!e.document) throw new Error("jQuery requires a window with a document");
			return t(e)
		} : t(e)
	}("undefined" != typeof window ? window : this, function(e, t) {
		function n(e) {
			var t = e.length,
				n = Z.type(e);
			return "function" === n || Z.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e
		}

		function r(e, t, n) {
			if (Z.isFunction(t)) return Z.grep(e, function(e, r) {
				return !!t.call(e, r, e) !== n
			});
			if (t.nodeType) return Z.grep(e, function(e) {
				return e === t !== n
			});
			if ("string" == typeof t) {
				if (st.test(t)) return Z.filter(t, e, n);
				t = Z.filter(t, e)
			}
			return Z.grep(e, function(e) {
				return V.call(t, e) >= 0 !== n
			})
		}

		function i(e, t) {
			for (;
				(e = e[t]) && 1 !== e.nodeType;);
			return e
		}

		function o(e) {
			var t = ht[e] = {};
			return Z.each(e.match(pt) || [], function(e, n) {
				t[n] = !0
			}), t
		}

		function a() {
			K.removeEventListener("DOMContentLoaded", a, !1), e.removeEventListener("load", a, !1), Z.ready()
		}

		function s() {
			Object.defineProperty(this.cache = {}, 0, {
				get: function() {
					return {}
				}
			}), this.expando = Z.expando + s.uid++
		}

		function c(e, t, n) {
			var r;
			if (void 0 === n && 1 === e.nodeType)
				if (r = "data-" + t.replace(wt, "-$1").toLowerCase(), n = e.getAttribute(r), "string" == typeof n) {
					try {
						n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null : +n + "" === n ? +n : bt.test(n) ? Z.parseJSON(n) : n
					} catch (i) {}
					yt.set(e, t, n)
				} else n = void 0;
			return n
		}

		function u() {
			return !0
		}

		function l() {
			return !1
		}

		function f() {
			try {
				return K.activeElement
			} catch (e) {}
		}

		function d(e, t) {
			return Z.nodeName(e, "table") && Z.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
		}

		function p(e) {
			return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
		}

		function h(e) {
			var t = Mt.exec(e.type);
			return t ? e.type = t[1] : e.removeAttribute("type"), e
		}

		function m(e, t) {
			for (var n = 0, r = e.length; r > n; n++) gt.set(e[n], "globalEval", !t || gt.get(t[n], "globalEval"))
		}

		function v(e, t) {
			var n, r, i, o, a, s, c, u;
			if (1 === t.nodeType) {
				if (gt.hasData(e) && (o = gt.access(e), a = gt.set(t, o), u = o.events)) {
					delete a.handle, a.events = {};
					for (i in u)
						for (n = 0, r = u[i].length; r > n; n++) Z.event.add(t, i, u[i][n])
				}
				yt.hasData(e) && (s = yt.access(e), c = Z.extend({}, s), yt.set(t, c))
			}
		}

		function g(e, t) {
			var n = e.getElementsByTagName ? e.getElementsByTagName(t || "*") : e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
			return void 0 === t || t && Z.nodeName(e, t) ? Z.merge([e], n) : n
		}

		function y(e, t) {
			var n = t.nodeName.toLowerCase();
			"input" === n && _t.test(e.type) ? t.checked = e.checked : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
		}

		function b(t, n) {
			var r, i = Z(n.createElement(t)).appendTo(n.body),
				o = e.getDefaultComputedStyle && (r = e.getDefaultComputedStyle(i[0])) ? r.display : Z.css(i[0], "display");
			return i.detach(), o
		}

		function w(e) {
			var t = K,
				n = Ut[e];
			return n || (n = b(e, t), "none" !== n && n || (Rt = (Rt || Z("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = Rt[0].contentDocument, t.write(), t.close(), n = b(e, t), Rt.detach()), Ut[e] = n), n
		}

		function x(e, t, n) {
			var r, i, o, a, s = e.style;
			return n = n || zt(e), n && (a = n.getPropertyValue(t) || n[t]), n && ("" !== a || Z.contains(e.ownerDocument, e) || (a = Z.style(e, t)), Bt.test(a) && Ht.test(t) && (r = s.width, i = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = r, s.minWidth = i, s.maxWidth = o)), void 0 !== a ? a + "" : a
		}

		function E(e, t) {
			return {
				get: function() {
					return e() ? void delete this.get : (this.get = t).apply(this, arguments)
				}
			}
		}

		function T(e, t) {
			if (t in e) return t;
			for (var n = t[0].toUpperCase() + t.slice(1), r = t, i = Gt.length; i--;)
				if (t = Gt[i] + n, t in e) return t;
			return r
		}

		function _(e, t, n) {
			var r = Wt.exec(t);
			return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
		}

		function C(e, t, n, r, i) {
			for (var o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; 4 > o; o += 2) "margin" === n && (a += Z.css(e, n + Et[o], !0, i)), r ? ("content" === n && (a -= Z.css(e, "padding" + Et[o], !0, i)), "margin" !== n && (a -= Z.css(e, "border" + Et[o] + "Width", !0, i))) : (a += Z.css(e, "padding" + Et[o], !0, i), "padding" !== n && (a += Z.css(e, "border" + Et[o] + "Width", !0, i)));
			return a
		}

		function k(e, t, n) {
			var r = !0,
				i = "width" === t ? e.offsetWidth : e.offsetHeight,
				o = zt(e),
				a = "border-box" === Z.css(e, "boxSizing", !1, o);
			if (0 >= i || null == i) {
				if (i = x(e, t, o), (0 > i || null == i) && (i = e.style[t]), Bt.test(i)) return i;
				r = a && (J.boxSizingReliable() || i === e.style[t]), i = parseFloat(i) || 0
			}
			return i + C(e, t, n || (a ? "border" : "content"), r, o) + "px"
		}

		function S(e, t) {
			for (var n, r, i, o = [], a = 0, s = e.length; s > a; a++) r = e[a], r.style && (o[a] = gt.get(r, "olddisplay"), n = r.style.display, t ? (o[a] || "none" !== n || (r.style.display = ""), "" === r.style.display && Tt(r) && (o[a] = gt.access(r, "olddisplay", w(r.nodeName)))) : (i = Tt(r), "none" === n && i || gt.set(r, "olddisplay", i ? n : Z.css(r, "display"))));
			for (a = 0; s > a; a++) r = e[a], r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? o[a] || "" : "none"));
			return e
		}

		function A(e, t, n, r, i) {
			return new A.prototype.init(e, t, n, r, i)
		}

		function N() {
			return setTimeout(function() {
				Jt = void 0
			}), Jt = Z.now()
		}

		function D(e, t) {
			var n, r = 0,
				i = {
					height: e
				};
			for (t = t ? 1 : 0; 4 > r; r += 2 - t) n = Et[r], i["margin" + n] = i["padding" + n] = e;
			return t && (i.opacity = i.width = e), i
		}

		function j(e, t, n) {
			for (var r, i = (nn[t] || []).concat(nn["*"]), o = 0, a = i.length; a > o; o++)
				if (r = i[o].call(n, t, e)) return r
		}

		function P(e, t, n) {
			var r, i, o, a, s, c, u, l, f = this,
				d = {},
				p = e.style,
				h = e.nodeType && Tt(e),
				m = gt.get(e, "fxshow");
			n.queue || (s = Z._queueHooks(e, "fx"), null == s.unqueued && (s.unqueued = 0, c = s.empty.fire, s.empty.fire = function() {
				s.unqueued || c()
			}), s.unqueued++, f.always(function() {
				f.always(function() {
					s.unqueued--, Z.queue(e, "fx").length || s.empty.fire()
				})
			})), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], u = Z.css(e, "display"), l = "none" === u ? gt.get(e, "olddisplay") || w(e.nodeName) : u, "inline" === l && "none" === Z.css(e, "float") && (p.display = "inline-block")), n.overflow && (p.overflow = "hidden", f.always(function() {
				p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2]
			}));
			for (r in t)
				if (i = t[r], Qt.exec(i)) {
					if (delete t[r], o = o || "toggle" === i, i === (h ? "hide" : "show")) {
						if ("show" !== i || !m || void 0 === m[r]) continue;
						h = !0
					}
					d[r] = m && m[r] || Z.style(e, r)
				} else u = void 0;
			if (Z.isEmptyObject(d)) "inline" === ("none" === u ? w(e.nodeName) : u) && (p.display = u);
			else {
				m ? "hidden" in m && (h = m.hidden) : m = gt.access(e, "fxshow", {}), o && (m.hidden = !h), h ? Z(e).show() : f.done(function() {
					Z(e).hide()
				}), f.done(function() {
					var t;
					gt.remove(e, "fxshow");
					for (t in d) Z.style(e, t, d[t])
				});
				for (r in d) a = j(h ? m[r] : 0, r, f), r in m || (m[r] = a.start, h && (a.end = a.start, a.start = "width" === r || "height" === r ? 1 : 0))
			}
		}

		function L(e, t) {
			var n, r, i, o, a;
			for (n in e)
				if (r = Z.camelCase(n), i = t[r], o = e[n], Z.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), a = Z.cssHooks[r], a && "expand" in a) {
					o = a.expand(o), delete e[r];
					for (n in o) n in e || (e[n] = o[n], t[n] = i)
				} else t[r] = i
		}

		function O(e, t, n) {
			var r, i, o = 0,
				a = tn.length,
				s = Z.Deferred().always(function() {
					delete c.elem
				}),
				c = function() {
					if (i) return !1;
					for (var t = Jt || N(), n = Math.max(0, u.startTime + u.duration - t), r = n / u.duration || 0, o = 1 - r, a = 0, c = u.tweens.length; c > a; a++) u.tweens[a].run(o);
					return s.notifyWith(e, [u, o, n]), 1 > o && c ? n : (s.resolveWith(e, [u]), !1)
				},
				u = s.promise({
					elem: e,
					props: Z.extend({}, t),
					opts: Z.extend(!0, {
						specialEasing: {}
					}, n),
					originalProperties: t,
					originalOptions: n,
					startTime: Jt || N(),
					duration: n.duration,
					tweens: [],
					createTween: function(t, n) {
						var r = Z.Tween(e, u.opts, t, n, u.opts.specialEasing[t] || u.opts.easing);
						return u.tweens.push(r), r
					},
					stop: function(t) {
						var n = 0,
							r = t ? u.tweens.length : 0;
						if (i) return this;
						for (i = !0; r > n; n++) u.tweens[n].run(1);
						return t ? s.resolveWith(e, [u, t]) : s.rejectWith(e, [u, t]), this
					}
				}),
				l = u.props;
			for (L(l, u.opts.specialEasing); a > o; o++)
				if (r = tn[o].call(u, e, l, u.opts)) return r;
			return Z.map(l, j, u), Z.isFunction(u.opts.start) && u.opts.start.call(e, u), Z.fx.timer(Z.extend(c, {
				elem: e,
				anim: u,
				queue: u.opts.queue
			})), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always)
		}

		function I(e) {
			return function(t, n) {
				"string" != typeof t && (n = t, t = "*");
				var r, i = 0,
					o = t.toLowerCase().match(pt) || [];
				if (Z.isFunction(n))
					for (; r = o[i++];) "+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
			}
		}

		function M(e, t, n, r) {
			function i(s) {
				var c;
				return o[s] = !0, Z.each(e[s] || [], function(e, s) {
					var u = s(t, n, r);
					return "string" != typeof u || a || o[u] ? a ? !(c = u) : void 0 : (t.dataTypes.unshift(u), i(u), !1)
				}), c
			}
			var o = {},
				a = e === wn;
			return i(t.dataTypes[0]) || !o["*"] && i("*")
		}

		function $(e, t) {
			var n, r, i = Z.ajaxSettings.flatOptions || {};
			for (n in t) void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
			return r && Z.extend(!0, e, r), e
		}

		function F(e, t, n) {
			for (var r, i, o, a, s = e.contents, c = e.dataTypes;
				"*" === c[0];) c.shift(), void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
			if (r)
				for (i in s)
					if (s[i] && s[i].test(r)) {
						c.unshift(i);
						break
					}
			if (c[0] in n) o = c[0];
			else {
				for (i in n) {
					if (!c[0] || e.converters[i + " " + c[0]]) {
						o = i;
						break
					}
					a || (a = i)
				}
				o = o || a
			}
			return o ? (o !== c[0] && c.unshift(o), n[o]) : void 0
		}

		function R(e, t, n, r) {
			var i, o, a, s, c, u = {},
				l = e.dataTypes.slice();
			if (l[1])
				for (a in e.converters) u[a.toLowerCase()] = e.converters[a];
			for (o = l.shift(); o;)
				if (e.responseFields[o] && (n[e.responseFields[o]] = t), !c && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), c = o, o = l.shift())
					if ("*" === o) o = c;
					else if ("*" !== c && c !== o) {
				if (a = u[c + " " + o] || u["* " + o], !a)
					for (i in u)
						if (s = i.split(" "), s[1] === o && (a = u[c + " " + s[0]] || u["* " + s[0]])) {
							a === !0 ? a = u[i] : u[i] !== !0 && (o = s[0], l.unshift(s[1]));
							break
						}
				if (a !== !0)
					if (a && e["throws"]) t = a(t);
					else try {
						t = a(t)
					} catch (f) {
						return {
							state: "parsererror",
							error: a ? f : "No conversion from " + c + " to " + o
						}
					}
			}
			return {
				state: "success",
				data: t
			}
		}

		function U(e, t, n, r) {
			var i;
			if (Z.isArray(t)) Z.each(t, function(t, i) {
				n || Cn.test(e) ? r(e, i) : U(e + "[" + ("object" == typeof i ? t : "") + "]", i, n, r)
			});
			else if (n || "object" !== Z.type(t)) r(e, t);
			else
				for (i in t) U(e + "[" + i + "]", t[i], n, r)
		}

		function H(e) {
			return Z.isWindow(e) ? e : 9 === e.nodeType && e.defaultView
		}
		var B = [],
			z = B.slice,
			q = B.concat,
			W = B.push,
			V = B.indexOf,
			X = {},
			Y = X.toString,
			G = X.hasOwnProperty,
			J = {},
			K = e.document,
			Q = "2.1.3",
			Z = function(e, t) {
				return new Z.fn.init(e, t)
			},
			et = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
			tt = /^-ms-/,
			nt = /-([\da-z])/gi,
			rt = function(e, t) {
				return t.toUpperCase()
			};
		Z.fn = Z.prototype = {
			jquery: Q,
			constructor: Z,
			selector: "",
			length: 0,
			toArray: function() {
				return z.call(this)
			},
			get: function(e) {
				return null != e ? 0 > e ? this[e + this.length] : this[e] : z.call(this)
			},
			pushStack: function(e) {
				var t = Z.merge(this.constructor(), e);
				return t.prevObject = this, t.context = this.context, t
			},
			each: function(e, t) {
				return Z.each(this, e, t)
			},
			map: function(e) {
				return this.pushStack(Z.map(this, function(t, n) {
					return e.call(t, n, t)
				}))
			},
			slice: function() {
				return this.pushStack(z.apply(this, arguments))
			},
			first: function() {
				return this.eq(0)
			},
			last: function() {
				return this.eq(-1)
			},
			eq: function(e) {
				var t = this.length,
					n = +e + (0 > e ? t : 0);
				return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
			},
			end: function() {
				return this.prevObject || this.constructor(null)
			},
			push: W,
			sort: B.sort,
			splice: B.splice
		}, Z.extend = Z.fn.extend = function() {
			var e, t, n, r, i, o, a = arguments[0] || {},
				s = 1,
				c = arguments.length,
				u = !1;
			for ("boolean" == typeof a && (u = a, a = arguments[s] || {}, s++), "object" == typeof a || Z.isFunction(a) || (a = {}), s === c && (a = this, s--); c > s; s++)
				if (null != (e = arguments[s]))
					for (t in e) n = a[t], r = e[t], a !== r && (u && r && (Z.isPlainObject(r) || (i = Z.isArray(r))) ? (i ? (i = !1, o = n && Z.isArray(n) ? n : []) : o = n && Z.isPlainObject(n) ? n : {}, a[t] = Z.extend(u, o, r)) : void 0 !== r && (a[t] = r));
			return a
		}, Z.extend({
			expando: "jQuery" + (Q + Math.random()).replace(/\D/g, ""),
			isReady: !0,
			error: function(e) {
				throw new Error(e)
			},
			noop: function() {},
			isFunction: function(e) {
				return "function" === Z.type(e)
			},
			isArray: Array.isArray,
			isWindow: function(e) {
				return null != e && e === e.window
			},
			isNumeric: function(e) {
				return !Z.isArray(e) && e - parseFloat(e) + 1 >= 0
			},
			isPlainObject: function(e) {
				return "object" !== Z.type(e) || e.nodeType || Z.isWindow(e) ? !1 : e.constructor && !G.call(e.constructor.prototype, "isPrototypeOf") ? !1 : !0
			},
			isEmptyObject: function(e) {
				var t;
				for (t in e) return !1;
				return !0
			},
			type: function(e) {
				return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? X[Y.call(e)] || "object" : typeof e
			},
			globalEval: function(e) {
				var t, n = eval;
				e = Z.trim(e), e && (1 === e.indexOf("use strict") ? (t = K.createElement("script"), t.text = e, K.head.appendChild(t).parentNode.removeChild(t)) : n(e))
			},
			camelCase: function(e) {
				return e.replace(tt, "ms-").replace(nt, rt)
			},
			nodeName: function(e, t) {
				return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
			},
			each: function(e, t, r) {
				var i, o = 0,
					a = e.length,
					s = n(e);
				if (r) {
					if (s)
						for (; a > o && (i = t.apply(e[o], r), i !== !1); o++);
					else
						for (o in e)
							if (i = t.apply(e[o], r), i === !1) break
				} else if (s)
					for (; a > o && (i = t.call(e[o], o, e[o]), i !== !1); o++);
				else
					for (o in e)
						if (i = t.call(e[o], o, e[o]), i === !1) break; return e
			},
			trim: function(e) {
				return null == e ? "" : (e + "").replace(et, "")
			},
			makeArray: function(e, t) {
				var r = t || [];
				return null != e && (n(Object(e)) ? Z.merge(r, "string" == typeof e ? [e] : e) : W.call(r, e)), r
			},
			inArray: function(e, t, n) {
				return null == t ? -1 : V.call(t, e, n)
			},
			merge: function(e, t) {
				for (var n = +t.length, r = 0, i = e.length; n > r; r++) e[i++] = t[r];
				return e.length = i, e
			},
			grep: function(e, t, n) {
				for (var r, i = [], o = 0, a = e.length, s = !n; a > o; o++) r = !t(e[o], o), r !== s && i.push(e[o]);
				return i
			},
			map: function(e, t, r) {
				var i, o = 0,
					a = e.length,
					s = n(e),
					c = [];
				if (s)
					for (; a > o; o++) i = t(e[o], o, r), null != i && c.push(i);
				else
					for (o in e) i = t(e[o], o, r), null != i && c.push(i);
				return q.apply([], c)
			},
			guid: 1,
			proxy: function(e, t) {
				var n, r, i;
				return "string" == typeof t && (n = e[t], t = e, e = n), Z.isFunction(e) ? (r = z.call(arguments, 2), i = function() {
					return e.apply(t || this, r.concat(z.call(arguments)))
				}, i.guid = e.guid = e.guid || Z.guid++, i) : void 0
			},
			now: Date.now,
			support: J
		}), Z.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
			X["[object " + t + "]"] = t.toLowerCase()
		});
		var it =
			/*!
			 * Sizzle CSS Selector Engine v2.2.0-pre
			 * http://sizzlejs.com/
			 *
			 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
			 * Released under the MIT license
			 * http://jquery.org/license
			 *
			 * Date: 2014-12-16
			 */
			function(e) {
				function t(e, t, n, r) {
					var i, o, a, s, c, u, f, p, h, m;
					if ((t ? t.ownerDocument || t : U) !== P && j(t), t = t || P, n = n || [], s = t.nodeType, "string" != typeof e || !e || 1 !== s && 9 !== s && 11 !== s) return n;
					if (!r && O) {
						if (11 !== s && (i = yt.exec(e)))
							if (a = i[1]) {
								if (9 === s) {
									if (o = t.getElementById(a), !o || !o.parentNode) return n;
									if (o.id === a) return n.push(o), n
								} else if (t.ownerDocument && (o = t.ownerDocument.getElementById(a)) && F(t, o) && o.id === a) return n.push(o), n
							} else {
								if (i[2]) return Q.apply(n, t.getElementsByTagName(e)), n;
								if ((a = i[3]) && x.getElementsByClassName) return Q.apply(n, t.getElementsByClassName(a)), n
							}
						if (x.qsa && (!I || !I.test(e))) {
							if (p = f = R, h = t, m = 1 !== s && e, 1 === s && "object" !== t.nodeName.toLowerCase()) {
								for (u = C(e), (f = t.getAttribute("id")) ? p = f.replace(wt, "\\$&") : t.setAttribute("id", p), p = "[id='" + p + "'] ", c = u.length; c--;) u[c] = p + d(u[c]);
								h = bt.test(e) && l(t.parentNode) || t, m = u.join(",")
							}
							if (m) try {
								return Q.apply(n, h.querySelectorAll(m)), n
							} catch (v) {} finally {
								f || t.removeAttribute("id")
							}
						}
					}
					return S(e.replace(ct, "$1"), t, n, r)
				}

				function n() {
					function e(n, r) {
						return t.push(n + " ") > E.cacheLength && delete e[t.shift()], e[n + " "] = r
					}
					var t = [];
					return e
				}

				function r(e) {
					return e[R] = !0, e
				}

				function i(e) {
					var t = P.createElement("div");
					try {
						return !!e(t)
					} catch (n) {
						return !1
					} finally {
						t.parentNode && t.parentNode.removeChild(t), t = null
					}
				}

				function o(e, t) {
					for (var n = e.split("|"), r = e.length; r--;) E.attrHandle[n[r]] = t
				}

				function a(e, t) {
					var n = t && e,
						r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || X) - (~e.sourceIndex || X);
					if (r) return r;
					if (n)
						for (; n = n.nextSibling;)
							if (n === t) return -1;
					return e ? 1 : -1
				}

				function s(e) {
					return function(t) {
						var n = t.nodeName.toLowerCase();
						return "input" === n && t.type === e
					}
				}

				function c(e) {
					return function(t) {
						var n = t.nodeName.toLowerCase();
						return ("input" === n || "button" === n) && t.type === e
					}
				}

				function u(e) {
					return r(function(t) {
						return t = +t, r(function(n, r) {
							for (var i, o = e([], n.length, t), a = o.length; a--;) n[i = o[a]] && (n[i] = !(r[i] = n[i]))
						})
					})
				}

				function l(e) {
					return e && "undefined" != typeof e.getElementsByTagName && e
				}

				function f() {}

				function d(e) {
					for (var t = 0, n = e.length, r = ""; n > t; t++) r += e[t].value;
					return r
				}

				function p(e, t, n) {
					var r = t.dir,
						i = n && "parentNode" === r,
						o = B++;
					return t.first ? function(t, n, o) {
						for (; t = t[r];)
							if (1 === t.nodeType || i) return e(t, n, o)
					} : function(t, n, a) {
						var s, c, u = [H, o];
						if (a) {
							for (; t = t[r];)
								if ((1 === t.nodeType || i) && e(t, n, a)) return !0
						} else
							for (; t = t[r];)
								if (1 === t.nodeType || i) {
									if (c = t[R] || (t[R] = {}), (s = c[r]) && s[0] === H && s[1] === o) return u[2] = s[2];
									if (c[r] = u, u[2] = e(t, n, a)) return !0
								}
					}
				}

				function h(e) {
					return e.length > 1 ? function(t, n, r) {
						for (var i = e.length; i--;)
							if (!e[i](t, n, r)) return !1;
						return !0
					} : e[0]
				}

				function m(e, n, r) {
					for (var i = 0, o = n.length; o > i; i++) t(e, n[i], r);
					return r
				}

				function v(e, t, n, r, i) {
					for (var o, a = [], s = 0, c = e.length, u = null != t; c > s; s++)(o = e[s]) && (!n || n(o, r, i)) && (a.push(o), u && t.push(s));
					return a
				}

				function g(e, t, n, i, o, a) {
					return i && !i[R] && (i = g(i)), o && !o[R] && (o = g(o, a)), r(function(r, a, s, c) {
						var u, l, f, d = [],
							p = [],
							h = a.length,
							g = r || m(t || "*", s.nodeType ? [s] : s, []),
							y = !e || !r && t ? g : v(g, d, e, s, c),
							b = n ? o || (r ? e : h || i) ? [] : a : y;
						if (n && n(y, b, s, c), i)
							for (u = v(b, p), i(u, [], s, c), l = u.length; l--;)(f = u[l]) && (b[p[l]] = !(y[p[l]] = f));
						if (r) {
							if (o || e) {
								if (o) {
									for (u = [], l = b.length; l--;)(f = b[l]) && u.push(y[l] = f);
									o(null, b = [], u, c)
								}
								for (l = b.length; l--;)(f = b[l]) && (u = o ? et(r, f) : d[l]) > -1 && (r[u] = !(a[u] = f))
							}
						} else b = v(b === a ? b.splice(h, b.length) : b), o ? o(null, a, b, c) : Q.apply(a, b)
					})
				}

				function y(e) {
					for (var t, n, r, i = e.length, o = E.relative[e[0].type], a = o || E.relative[" "], s = o ? 1 : 0, c = p(function(e) {
						return e === t
					}, a, !0), u = p(function(e) {
						return et(t, e) > -1
					}, a, !0), l = [
						function(e, n, r) {
							var i = !o && (r || n !== A) || ((t = n).nodeType ? c(e, n, r) : u(e, n, r));
							return t = null, i
						}
					]; i > s; s++)
						if (n = E.relative[e[s].type]) l = [p(h(l), n)];
						else {
							if (n = E.filter[e[s].type].apply(null, e[s].matches), n[R]) {
								for (r = ++s; i > r && !E.relative[e[r].type]; r++);
								return g(s > 1 && h(l), s > 1 && d(e.slice(0, s - 1).concat({
									value: " " === e[s - 2].type ? "*" : ""
								})).replace(ct, "$1"), n, r > s && y(e.slice(s, r)), i > r && y(e = e.slice(r)), i > r && d(e))
							}
							l.push(n)
						}
					return h(l)
				}

				function b(e, n) {
					var i = n.length > 0,
						o = e.length > 0,
						a = function(r, a, s, c, u) {
							var l, f, d, p = 0,
								h = "0",
								m = r && [],
								g = [],
								y = A,
								b = r || o && E.find.TAG("*", u),
								w = H += null == y ? 1 : Math.random() || .1,
								x = b.length;
							for (u && (A = a !== P && a); h !== x && null != (l = b[h]); h++) {
								if (o && l) {
									for (f = 0; d = e[f++];)
										if (d(l, a, s)) {
											c.push(l);
											break
										}
									u && (H = w)
								}
								i && ((l = !d && l) && p--, r && m.push(l))
							}
							if (p += h, i && h !== p) {
								for (f = 0; d = n[f++];) d(m, g, a, s);
								if (r) {
									if (p > 0)
										for (; h--;) m[h] || g[h] || (g[h] = J.call(c));
									g = v(g)
								}
								Q.apply(c, g), u && !r && g.length > 0 && p + n.length > 1 && t.uniqueSort(c)
							}
							return u && (H = w, A = y), m
						};
					return i ? r(a) : a
				}
				var w, x, E, T, _, C, k, S, A, N, D, j, P, L, O, I, M, $, F, R = "sizzle" + 1 * new Date,
					U = e.document,
					H = 0,
					B = 0,
					z = n(),
					q = n(),
					W = n(),
					V = function(e, t) {
						return e === t && (D = !0), 0
					},
					X = 1 << 31,
					Y = {}.hasOwnProperty,
					G = [],
					J = G.pop,
					K = G.push,
					Q = G.push,
					Z = G.slice,
					et = function(e, t) {
						for (var n = 0, r = e.length; r > n; n++)
							if (e[n] === t) return n;
						return -1
					},
					tt = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
					nt = "[\\x20\\t\\r\\n\\f]",
					rt = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
					it = rt.replace("w", "w#"),
					ot = "\\[" + nt + "*(" + rt + ")(?:" + nt + "*([*^$|!~]?=)" + nt + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + it + "))|)" + nt + "*\\]",
					at = ":(" + rt + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ot + ")*)|.*)\\)|)",
					st = new RegExp(nt + "+", "g"),
					ct = new RegExp("^" + nt + "+|((?:^|[^\\\\])(?:\\\\.)*)" + nt + "+$", "g"),
					ut = new RegExp("^" + nt + "*," + nt + "*"),
					lt = new RegExp("^" + nt + "*([>+~]|" + nt + ")" + nt + "*"),
					ft = new RegExp("=" + nt + "*([^\\]'\"]*?)" + nt + "*\\]", "g"),
					dt = new RegExp(at),
					pt = new RegExp("^" + it + "$"),
					ht = {
						ID: new RegExp("^#(" + rt + ")"),
						CLASS: new RegExp("^\\.(" + rt + ")"),
						TAG: new RegExp("^(" + rt.replace("w", "w*") + ")"),
						ATTR: new RegExp("^" + ot),
						PSEUDO: new RegExp("^" + at),
						CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + nt + "*(even|odd|(([+-]|)(\\d*)n|)" + nt + "*(?:([+-]|)" + nt + "*(\\d+)|))" + nt + "*\\)|)", "i"),
						bool: new RegExp("^(?:" + tt + ")$", "i"),
						needsContext: new RegExp("^" + nt + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + nt + "*((?:-\\d)?\\d*)" + nt + "*\\)|)(?=[^-]|$)", "i")
					},
					mt = /^(?:input|select|textarea|button)$/i,
					vt = /^h\d$/i,
					gt = /^[^{]+\{\s*\[native \w/,
					yt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
					bt = /[+~]/,
					wt = /'|\\/g,
					xt = new RegExp("\\\\([\\da-f]{1,6}" + nt + "?|(" + nt + ")|.)", "ig"),
					Et = function(e, t, n) {
						var r = "0x" + t - 65536;
						return r !== r || n ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
					},
					Tt = function() {
						j()
					};
				try {
					Q.apply(G = Z.call(U.childNodes), U.childNodes), G[U.childNodes.length].nodeType
				} catch (_t) {
					Q = {
						apply: G.length ? function(e, t) {
							K.apply(e, Z.call(t))
						} : function(e, t) {
							for (var n = e.length, r = 0; e[n++] = t[r++];);
							e.length = n - 1
						}
					}
				}
				x = t.support = {}, _ = t.isXML = function(e) {
					var t = e && (e.ownerDocument || e).documentElement;
					return t ? "HTML" !== t.nodeName : !1
				}, j = t.setDocument = function(e) {
					var t, n, r = e ? e.ownerDocument || e : U;
					return r !== P && 9 === r.nodeType && r.documentElement ? (P = r, L = r.documentElement, n = r.defaultView, n && n !== n.top && (n.addEventListener ? n.addEventListener("unload", Tt, !1) : n.attachEvent && n.attachEvent("onunload", Tt)), O = !_(r), x.attributes = i(function(e) {
						return e.className = "i", !e.getAttribute("className")
					}), x.getElementsByTagName = i(function(e) {
						return e.appendChild(r.createComment("")), !e.getElementsByTagName("*").length
					}), x.getElementsByClassName = gt.test(r.getElementsByClassName), x.getById = i(function(e) {
						return L.appendChild(e).id = R, !r.getElementsByName || !r.getElementsByName(R).length
					}), x.getById ? (E.find.ID = function(e, t) {
						if ("undefined" != typeof t.getElementById && O) {
							var n = t.getElementById(e);
							return n && n.parentNode ? [n] : []
						}
					}, E.filter.ID = function(e) {
						var t = e.replace(xt, Et);
						return function(e) {
							return e.getAttribute("id") === t
						}
					}) : (delete E.find.ID, E.filter.ID = function(e) {
						var t = e.replace(xt, Et);
						return function(e) {
							var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
							return n && n.value === t
						}
					}), E.find.TAG = x.getElementsByTagName ? function(e, t) {
						return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : x.qsa ? t.querySelectorAll(e) : void 0
					} : function(e, t) {
						var n, r = [],
							i = 0,
							o = t.getElementsByTagName(e);
						if ("*" === e) {
							for (; n = o[i++];) 1 === n.nodeType && r.push(n);
							return r
						}
						return o
					}, E.find.CLASS = x.getElementsByClassName && function(e, t) {
						return O ? t.getElementsByClassName(e) : void 0
					}, M = [], I = [], (x.qsa = gt.test(r.querySelectorAll)) && (i(function(e) {
						L.appendChild(e).innerHTML = "<a id='" + R + "'></a><select id='" + R + "-\f]' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && I.push("[*^$]=" + nt + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || I.push("\\[" + nt + "*(?:value|" + tt + ")"), e.querySelectorAll("[id~=" + R + "-]").length || I.push("~="), e.querySelectorAll(":checked").length || I.push(":checked"), e.querySelectorAll("a#" + R + "+*").length || I.push(".#.+[+~]")
					}), i(function(e) {
						var t = r.createElement("input");
						t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && I.push("name" + nt + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || I.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), I.push(",.*:")
					})), (x.matchesSelector = gt.test($ = L.matches || L.webkitMatchesSelector || L.mozMatchesSelector || L.oMatchesSelector || L.msMatchesSelector)) && i(function(e) {
						x.disconnectedMatch = $.call(e, "div"), $.call(e, "[s!='']:x"), M.push("!=", at)
					}), I = I.length && new RegExp(I.join("|")), M = M.length && new RegExp(M.join("|")), t = gt.test(L.compareDocumentPosition), F = t || gt.test(L.contains) ? function(e, t) {
						var n = 9 === e.nodeType ? e.documentElement : e,
							r = t && t.parentNode;
						return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
					} : function(e, t) {
						if (t)
							for (; t = t.parentNode;)
								if (t === e) return !0;
						return !1
					}, V = t ? function(e, t) {
						if (e === t) return D = !0, 0;
						var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
						return n ? n : (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & n || !x.sortDetached && t.compareDocumentPosition(e) === n ? e === r || e.ownerDocument === U && F(U, e) ? -1 : t === r || t.ownerDocument === U && F(U, t) ? 1 : N ? et(N, e) - et(N, t) : 0 : 4 & n ? -1 : 1)
					} : function(e, t) {
						if (e === t) return D = !0, 0;
						var n, i = 0,
							o = e.parentNode,
							s = t.parentNode,
							c = [e],
							u = [t];
						if (!o || !s) return e === r ? -1 : t === r ? 1 : o ? -1 : s ? 1 : N ? et(N, e) - et(N, t) : 0;
						if (o === s) return a(e, t);
						for (n = e; n = n.parentNode;) c.unshift(n);
						for (n = t; n = n.parentNode;) u.unshift(n);
						for (; c[i] === u[i];) i++;
						return i ? a(c[i], u[i]) : c[i] === U ? -1 : u[i] === U ? 1 : 0
					}, r) : P
				}, t.matches = function(e, n) {
					return t(e, null, null, n)
				}, t.matchesSelector = function(e, n) {
					if ((e.ownerDocument || e) !== P && j(e), n = n.replace(ft, "='$1']"), !(!x.matchesSelector || !O || M && M.test(n) || I && I.test(n))) try {
						var r = $.call(e, n);
						if (r || x.disconnectedMatch || e.document && 11 !== e.document.nodeType) return r
					} catch (i) {}
					return t(n, P, null, [e]).length > 0
				}, t.contains = function(e, t) {
					return (e.ownerDocument || e) !== P && j(e), F(e, t)
				}, t.attr = function(e, t) {
					(e.ownerDocument || e) !== P && j(e);
					var n = E.attrHandle[t.toLowerCase()],
						r = n && Y.call(E.attrHandle, t.toLowerCase()) ? n(e, t, !O) : void 0;
					return void 0 !== r ? r : x.attributes || !O ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
				}, t.error = function(e) {
					throw new Error("Syntax error, unrecognized expression: " + e)
				}, t.uniqueSort = function(e) {
					var t, n = [],
						r = 0,
						i = 0;
					if (D = !x.detectDuplicates, N = !x.sortStable && e.slice(0), e.sort(V), D) {
						for (; t = e[i++];) t === e[i] && (r = n.push(i));
						for (; r--;) e.splice(n[r], 1)
					}
					return N = null, e
				}, T = t.getText = function(e) {
					var t, n = "",
						r = 0,
						i = e.nodeType;
					if (i) {
						if (1 === i || 9 === i || 11 === i) {
							if ("string" == typeof e.textContent) return e.textContent;
							for (e = e.firstChild; e; e = e.nextSibling) n += T(e)
						} else if (3 === i || 4 === i) return e.nodeValue
					} else
						for (; t = e[r++];) n += T(t);
					return n
				}, E = t.selectors = {
					cacheLength: 50,
					createPseudo: r,
					match: ht,
					attrHandle: {},
					find: {},
					relative: {
						">": {
							dir: "parentNode",
							first: !0
						},
						" ": {
							dir: "parentNode"
						},
						"+": {
							dir: "previousSibling",
							first: !0
						},
						"~": {
							dir: "previousSibling"
						}
					},
					preFilter: {
						ATTR: function(e) {
							return e[1] = e[1].replace(xt, Et), e[3] = (e[3] || e[4] || e[5] || "").replace(xt, Et), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
						},
						CHILD: function(e) {
							return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
						},
						PSEUDO: function(e) {
							var t, n = !e[6] && e[2];
							return ht.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && dt.test(n) && (t = C(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
						}
					},
					filter: {
						TAG: function(e) {
							var t = e.replace(xt, Et).toLowerCase();
							return "*" === e ? function() {
								return !0
							} : function(e) {
								return e.nodeName && e.nodeName.toLowerCase() === t
							}
						},
						CLASS: function(e) {
							var t = z[e + " "];
							return t || (t = new RegExp("(^|" + nt + ")" + e + "(" + nt + "|$)")) && z(e, function(e) {
								return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
							})
						},
						ATTR: function(e, n, r) {
							return function(i) {
								var o = t.attr(i, e);
								return null == o ? "!=" === n : n ? (o += "", "=" === n ? o === r : "!=" === n ? o !== r : "^=" === n ? r && 0 === o.indexOf(r) : "*=" === n ? r && o.indexOf(r) > -1 : "$=" === n ? r && o.slice(-r.length) === r : "~=" === n ? (" " + o.replace(st, " ") + " ").indexOf(r) > -1 : "|=" === n ? o === r || o.slice(0, r.length + 1) === r + "-" : !1) : !0
							}
						},
						CHILD: function(e, t, n, r, i) {
							var o = "nth" !== e.slice(0, 3),
								a = "last" !== e.slice(-4),
								s = "of-type" === t;
							return 1 === r && 0 === i ? function(e) {
								return !!e.parentNode
							} : function(t, n, c) {
								var u, l, f, d, p, h, m = o !== a ? "nextSibling" : "previousSibling",
									v = t.parentNode,
									g = s && t.nodeName.toLowerCase(),
									y = !c && !s;
								if (v) {
									if (o) {
										for (; m;) {
											for (f = t; f = f[m];)
												if (s ? f.nodeName.toLowerCase() === g : 1 === f.nodeType) return !1;
											h = m = "only" === e && !h && "nextSibling"
										}
										return !0
									}
									if (h = [a ? v.firstChild : v.lastChild], a && y) {
										for (l = v[R] || (v[R] = {}), u = l[e] || [], p = u[0] === H && u[1], d = u[0] === H && u[2], f = p && v.childNodes[p]; f = ++p && f && f[m] || (d = p = 0) || h.pop();)
											if (1 === f.nodeType && ++d && f === t) {
												l[e] = [H, p, d];
												break
											}
									} else if (y && (u = (t[R] || (t[R] = {}))[e]) && u[0] === H) d = u[1];
									else
										for (;
											(f = ++p && f && f[m] || (d = p = 0) || h.pop()) && ((s ? f.nodeName.toLowerCase() !== g : 1 !== f.nodeType) || !++d || (y && ((f[R] || (f[R] = {}))[e] = [H, d]), f !== t)););
									return d -= i, d === r || d % r === 0 && d / r >= 0
								}
							}
						},
						PSEUDO: function(e, n) {
							var i, o = E.pseudos[e] || E.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
							return o[R] ? o(n) : o.length > 1 ? (i = [e, e, "", n], E.setFilters.hasOwnProperty(e.toLowerCase()) ? r(function(e, t) {
								for (var r, i = o(e, n), a = i.length; a--;) r = et(e, i[a]), e[r] = !(t[r] = i[a])
							}) : function(e) {
								return o(e, 0, i)
							}) : o
						}
					},
					pseudos: {
						not: r(function(e) {
							var t = [],
								n = [],
								i = k(e.replace(ct, "$1"));
							return i[R] ? r(function(e, t, n, r) {
								for (var o, a = i(e, null, r, []), s = e.length; s--;)(o = a[s]) && (e[s] = !(t[s] = o))
							}) : function(e, r, o) {
								return t[0] = e, i(t, null, o, n), t[0] = null, !n.pop()
							}
						}),
						has: r(function(e) {
							return function(n) {
								return t(e, n).length > 0
							}
						}),
						contains: r(function(e) {
							return e = e.replace(xt, Et),
								function(t) {
									return (t.textContent || t.innerText || T(t)).indexOf(e) > -1
								}
						}),
						lang: r(function(e) {
							return pt.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(xt, Et).toLowerCase(),
								function(t) {
									var n;
									do
										if (n = O ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-");
									while ((t = t.parentNode) && 1 === t.nodeType);
									return !1
								}
						}),
						target: function(t) {
							var n = e.location && e.location.hash;
							return n && n.slice(1) === t.id
						},
						root: function(e) {
							return e === L
						},
						focus: function(e) {
							return e === P.activeElement && (!P.hasFocus || P.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
						},
						enabled: function(e) {
							return e.disabled === !1
						},
						disabled: function(e) {
							return e.disabled === !0
						},
						checked: function(e) {
							var t = e.nodeName.toLowerCase();
							return "input" === t && !!e.checked || "option" === t && !!e.selected
						},
						selected: function(e) {
							return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
						},
						empty: function(e) {
							for (e = e.firstChild; e; e = e.nextSibling)
								if (e.nodeType < 6) return !1;
							return !0
						},
						parent: function(e) {
							return !E.pseudos.empty(e)
						},
						header: function(e) {
							return vt.test(e.nodeName)
						},
						input: function(e) {
							return mt.test(e.nodeName)
						},
						button: function(e) {
							var t = e.nodeName.toLowerCase();
							return "input" === t && "button" === e.type || "button" === t
						},
						text: function(e) {
							var t;
							return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
						},
						first: u(function() {
							return [0]
						}),
						last: u(function(e, t) {
							return [t - 1]
						}),
						eq: u(function(e, t, n) {
							return [0 > n ? n + t : n]
						}),
						even: u(function(e, t) {
							for (var n = 0; t > n; n += 2) e.push(n);
							return e
						}),
						odd: u(function(e, t) {
							for (var n = 1; t > n; n += 2) e.push(n);
							return e
						}),
						lt: u(function(e, t, n) {
							for (var r = 0 > n ? n + t : n; --r >= 0;) e.push(r);
							return e
						}),
						gt: u(function(e, t, n) {
							for (var r = 0 > n ? n + t : n; ++r < t;) e.push(r);
							return e
						})
					}
				}, E.pseudos.nth = E.pseudos.eq;
				for (w in {
					radio: !0,
					checkbox: !0,
					file: !0,
					password: !0,
					image: !0
				}) E.pseudos[w] = s(w);
				for (w in {
					submit: !0,
					reset: !0
				}) E.pseudos[w] = c(w);
				return f.prototype = E.filters = E.pseudos, E.setFilters = new f, C = t.tokenize = function(e, n) {
					var r, i, o, a, s, c, u, l = q[e + " "];
					if (l) return n ? 0 : l.slice(0);
					for (s = e, c = [], u = E.preFilter; s;) {
						(!r || (i = ut.exec(s))) && (i && (s = s.slice(i[0].length) || s), c.push(o = [])), r = !1, (i = lt.exec(s)) && (r = i.shift(), o.push({
							value: r,
							type: i[0].replace(ct, " ")
						}), s = s.slice(r.length));
						for (a in E.filter) !(i = ht[a].exec(s)) || u[a] && !(i = u[a](i)) || (r = i.shift(), o.push({
							value: r,
							type: a,
							matches: i
						}), s = s.slice(r.length));
						if (!r) break
					}
					return n ? s.length : s ? t.error(e) : q(e, c).slice(0)
				}, k = t.compile = function(e, t) {
					var n, r = [],
						i = [],
						o = W[e + " "];
					if (!o) {
						for (t || (t = C(e)), n = t.length; n--;) o = y(t[n]), o[R] ? r.push(o) : i.push(o);
						o = W(e, b(i, r)), o.selector = e
					}
					return o
				}, S = t.select = function(e, t, n, r) {
					var i, o, a, s, c, u = "function" == typeof e && e,
						f = !r && C(e = u.selector || e);
					if (n = n || [], 1 === f.length) {
						if (o = f[0] = f[0].slice(0), o.length > 2 && "ID" === (a = o[0]).type && x.getById && 9 === t.nodeType && O && E.relative[o[1].type]) {
							if (t = (E.find.ID(a.matches[0].replace(xt, Et), t) || [])[0], !t) return n;
							u && (t = t.parentNode), e = e.slice(o.shift().value.length)
						}
						for (i = ht.needsContext.test(e) ? 0 : o.length; i-- && (a = o[i], !E.relative[s = a.type]);)
							if ((c = E.find[s]) && (r = c(a.matches[0].replace(xt, Et), bt.test(o[0].type) && l(t.parentNode) || t))) {
								if (o.splice(i, 1), e = r.length && d(o), !e) return Q.apply(n, r), n;
								break
							}
					}
					return (u || k(e, f))(r, t, !O, n, bt.test(e) && l(t.parentNode) || t), n
				}, x.sortStable = R.split("").sort(V).join("") === R, x.detectDuplicates = !!D, j(), x.sortDetached = i(function(e) {
					return 1 & e.compareDocumentPosition(P.createElement("div"))
				}), i(function(e) {
					return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
				}) || o("type|href|height|width", function(e, t, n) {
					return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
				}), x.attributes && i(function(e) {
					return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
				}) || o("value", function(e, t, n) {
					return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
				}), i(function(e) {
					return null == e.getAttribute("disabled")
				}) || o(tt, function(e, t, n) {
					var r;
					return n ? void 0 : e[t] === !0 ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
				}), t
			}(e);
		Z.find = it, Z.expr = it.selectors, Z.expr[":"] = Z.expr.pseudos, Z.unique = it.uniqueSort, Z.text = it.getText, Z.isXMLDoc = it.isXML, Z.contains = it.contains;
		var ot = Z.expr.match.needsContext,
			at = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
			st = /^.[^:#\[\.,]*$/;
		Z.filter = function(e, t, n) {
			var r = t[0];
			return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? Z.find.matchesSelector(r, e) ? [r] : [] : Z.find.matches(e, Z.grep(t, function(e) {
				return 1 === e.nodeType
			}))
		}, Z.fn.extend({
			find: function(e) {
				var t, n = this.length,
					r = [],
					i = this;
				if ("string" != typeof e) return this.pushStack(Z(e).filter(function() {
					for (t = 0; n > t; t++)
						if (Z.contains(i[t], this)) return !0
				}));
				for (t = 0; n > t; t++) Z.find(e, i[t], r);
				return r = this.pushStack(n > 1 ? Z.unique(r) : r), r.selector = this.selector ? this.selector + " " + e : e, r
			},
			filter: function(e) {
				return this.pushStack(r(this, e || [], !1))
			},
			not: function(e) {
				return this.pushStack(r(this, e || [], !0))
			},
			is: function(e) {
				return !!r(this, "string" == typeof e && ot.test(e) ? Z(e) : e || [], !1).length
			}
		});
		var ct, ut = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
			lt = Z.fn.init = function(e, t) {
				var n, r;
				if (!e) return this;
				if ("string" == typeof e) {
					if (n = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : ut.exec(e), !n || !n[1] && t) return !t || t.jquery ? (t || ct).find(e) : this.constructor(t).find(e);
					if (n[1]) {
						if (t = t instanceof Z ? t[0] : t, Z.merge(this, Z.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : K, !0)), at.test(n[1]) && Z.isPlainObject(t))
							for (n in t) Z.isFunction(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
						return this
					}
					return r = K.getElementById(n[2]), r && r.parentNode && (this.length = 1, this[0] = r), this.context = K, this.selector = e, this
				}
				return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : Z.isFunction(e) ? "undefined" != typeof ct.ready ? ct.ready(e) : e(Z) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), Z.makeArray(e, this))
			};
		lt.prototype = Z.fn, ct = Z(K);
		var ft = /^(?:parents|prev(?:Until|All))/,
			dt = {
				children: !0,
				contents: !0,
				next: !0,
				prev: !0
			};
		Z.extend({
			dir: function(e, t, n) {
				for (var r = [], i = void 0 !== n;
					(e = e[t]) && 9 !== e.nodeType;)
					if (1 === e.nodeType) {
						if (i && Z(e).is(n)) break;
						r.push(e)
					}
				return r
			},
			sibling: function(e, t) {
				for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
				return n
			}
		}), Z.fn.extend({
			has: function(e) {
				var t = Z(e, this),
					n = t.length;
				return this.filter(function() {
					for (var e = 0; n > e; e++)
						if (Z.contains(this, t[e])) return !0
				})
			},
			closest: function(e, t) {
				for (var n, r = 0, i = this.length, o = [], a = ot.test(e) || "string" != typeof e ? Z(e, t || this.context) : 0; i > r; r++)
					for (n = this[r]; n && n !== t; n = n.parentNode)
						if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && Z.find.matchesSelector(n, e))) {
							o.push(n);
							break
						}
				return this.pushStack(o.length > 1 ? Z.unique(o) : o)
			},
			index: function(e) {
				return e ? "string" == typeof e ? V.call(Z(e), this[0]) : V.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
			},
			add: function(e, t) {
				return this.pushStack(Z.unique(Z.merge(this.get(), Z(e, t))))
			},
			addBack: function(e) {
				return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
			}
		}), Z.each({
			parent: function(e) {
				var t = e.parentNode;
				return t && 11 !== t.nodeType ? t : null
			},
			parents: function(e) {
				return Z.dir(e, "parentNode")
			},
			parentsUntil: function(e, t, n) {
				return Z.dir(e, "parentNode", n)
			},
			next: function(e) {
				return i(e, "nextSibling")
			},
			prev: function(e) {
				return i(e, "previousSibling")
			},
			nextAll: function(e) {
				return Z.dir(e, "nextSibling")
			},
			prevAll: function(e) {
				return Z.dir(e, "previousSibling")
			},
			nextUntil: function(e, t, n) {
				return Z.dir(e, "nextSibling", n)
			},
			prevUntil: function(e, t, n) {
				return Z.dir(e, "previousSibling", n)
			},
			siblings: function(e) {
				return Z.sibling((e.parentNode || {}).firstChild, e)
			},
			children: function(e) {
				return Z.sibling(e.firstChild)
			},
			contents: function(e) {
				return e.contentDocument || Z.merge([], e.childNodes)
			}
		}, function(e, t) {
			Z.fn[e] = function(n, r) {
				var i = Z.map(this, t, n);
				return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = Z.filter(r, i)), this.length > 1 && (dt[e] || Z.unique(i), ft.test(e) && i.reverse()), this.pushStack(i)
			}
		});
		var pt = /\S+/g,
			ht = {};
		Z.Callbacks = function(e) {
			e = "string" == typeof e ? ht[e] || o(e) : Z.extend({}, e);
			var t, n, r, i, a, s, c = [],
				u = !e.once && [],
				l = function(o) {
					for (t = e.memory && o, n = !0, s = i || 0, i = 0, a = c.length, r = !0; c && a > s; s++)
						if (c[s].apply(o[0], o[1]) === !1 && e.stopOnFalse) {
							t = !1;
							break
						}
					r = !1, c && (u ? u.length && l(u.shift()) : t ? c = [] : f.disable())
				},
				f = {
					add: function() {
						if (c) {
							var n = c.length;
							! function o(t) {
								Z.each(t, function(t, n) {
									var r = Z.type(n);
									"function" === r ? e.unique && f.has(n) || c.push(n) : n && n.length && "string" !== r && o(n)
								})
							}(arguments), r ? a = c.length : t && (i = n, l(t))
						}
						return this
					},
					remove: function() {
						return c && Z.each(arguments, function(e, t) {
							for (var n;
								(n = Z.inArray(t, c, n)) > -1;) c.splice(n, 1), r && (a >= n && a--, s >= n && s--)
						}), this
					},
					has: function(e) {
						return e ? Z.inArray(e, c) > -1 : !(!c || !c.length)
					},
					empty: function() {
						return c = [], a = 0, this
					},
					disable: function() {
						return c = u = t = void 0, this
					},
					disabled: function() {
						return !c
					},
					lock: function() {
						return u = void 0, t || f.disable(), this
					},
					locked: function() {
						return !u
					},
					fireWith: function(e, t) {
						return !c || n && !u || (t = t || [], t = [e, t.slice ? t.slice() : t], r ? u.push(t) : l(t)), this
					},
					fire: function() {
						return f.fireWith(this, arguments), this
					},
					fired: function() {
						return !!n
					}
				};
			return f
		}, Z.extend({
			Deferred: function(e) {
				var t = [
						["resolve", "done", Z.Callbacks("once memory"), "resolved"],
						["reject", "fail", Z.Callbacks("once memory"), "rejected"],
						["notify", "progress", Z.Callbacks("memory")]
					],
					n = "pending",
					r = {
						state: function() {
							return n
						},
						always: function() {
							return i.done(arguments).fail(arguments), this
						},
						then: function() {
							var e = arguments;
							return Z.Deferred(function(n) {
								Z.each(t, function(t, o) {
									var a = Z.isFunction(e[t]) && e[t];
									i[o[1]](function() {
										var e = a && a.apply(this, arguments);
										e && Z.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[o[0] + "With"](this === r ? n.promise() : this, a ? [e] : arguments)
									})
								}), e = null
							}).promise()
						},
						promise: function(e) {
							return null != e ? Z.extend(e, r) : r
						}
					},
					i = {};
				return r.pipe = r.then, Z.each(t, function(e, o) {
					var a = o[2],
						s = o[3];
					r[o[1]] = a.add, s && a.add(function() {
						n = s
					}, t[1 ^ e][2].disable, t[2][2].lock), i[o[0]] = function() {
						return i[o[0] + "With"](this === i ? r : this, arguments), this
					}, i[o[0] + "With"] = a.fireWith
				}), r.promise(i), e && e.call(i, i), i
			},
			when: function(e) {
				var t, n, r, i = 0,
					o = z.call(arguments),
					a = o.length,
					s = 1 !== a || e && Z.isFunction(e.promise) ? a : 0,
					c = 1 === s ? e : Z.Deferred(),
					u = function(e, n, r) {
						return function(i) {
							n[e] = this, r[e] = arguments.length > 1 ? z.call(arguments) : i, r === t ? c.notifyWith(n, r) : --s || c.resolveWith(n, r)
						}
					};
				if (a > 1)
					for (t = new Array(a), n = new Array(a), r = new Array(a); a > i; i++) o[i] && Z.isFunction(o[i].promise) ? o[i].promise().done(u(i, r, o)).fail(c.reject).progress(u(i, n, t)) : --s;
				return s || c.resolveWith(r, o), c.promise()
			}
		});
		var mt;
		Z.fn.ready = function(e) {
			return Z.ready.promise().done(e), this
		}, Z.extend({
			isReady: !1,
			readyWait: 1,
			holdReady: function(e) {
				e ? Z.readyWait++ : Z.ready(!0)
			},
			ready: function(e) {
				(e === !0 ? --Z.readyWait : Z.isReady) || (Z.isReady = !0, e !== !0 && --Z.readyWait > 0 || (mt.resolveWith(K, [Z]), Z.fn.triggerHandler && (Z(K).triggerHandler("ready"), Z(K).off("ready"))))
			}
		}), Z.ready.promise = function(t) {
			return mt || (mt = Z.Deferred(), "complete" === K.readyState ? setTimeout(Z.ready) : (K.addEventListener("DOMContentLoaded", a, !1), e.addEventListener("load", a, !1))), mt.promise(t)
		}, Z.ready.promise();
		var vt = Z.access = function(e, t, n, r, i, o, a) {
			var s = 0,
				c = e.length,
				u = null == n;
			if ("object" === Z.type(n)) {
				i = !0;
				for (s in n) Z.access(e, t, s, n[s], !0, o, a)
			} else if (void 0 !== r && (i = !0, Z.isFunction(r) || (a = !0), u && (a ? (t.call(e, r), t = null) : (u = t, t = function(e, t, n) {
				return u.call(Z(e), n)
			})), t))
				for (; c > s; s++) t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
			return i ? e : u ? t.call(e) : c ? t(e[0], n) : o
		};
		Z.acceptData = function(e) {
			return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
		}, s.uid = 1, s.accepts = Z.acceptData, s.prototype = {
			key: function(e) {
				if (!s.accepts(e)) return 0;
				var t = {},
					n = e[this.expando];
				if (!n) {
					n = s.uid++;
					try {
						t[this.expando] = {
							value: n
						}, Object.defineProperties(e, t)
					} catch (r) {
						t[this.expando] = n, Z.extend(e, t)
					}
				}
				return this.cache[n] || (this.cache[n] = {}), n
			},
			set: function(e, t, n) {
				var r, i = this.key(e),
					o = this.cache[i];
				if ("string" == typeof t) o[t] = n;
				else if (Z.isEmptyObject(o)) Z.extend(this.cache[i], t);
				else
					for (r in t) o[r] = t[r];
				return o
			},
			get: function(e, t) {
				var n = this.cache[this.key(e)];
				return void 0 === t ? n : n[t]
			},
			access: function(e, t, n) {
				var r;
				return void 0 === t || t && "string" == typeof t && void 0 === n ? (r = this.get(e, t), void 0 !== r ? r : this.get(e, Z.camelCase(t))) : (this.set(e, t, n), void 0 !== n ? n : t)
			},
			remove: function(e, t) {
				var n, r, i, o = this.key(e),
					a = this.cache[o];
				if (void 0 === t) this.cache[o] = {};
				else {
					Z.isArray(t) ? r = t.concat(t.map(Z.camelCase)) : (i = Z.camelCase(t), t in a ? r = [t, i] : (r = i, r = r in a ? [r] : r.match(pt) || [])), n = r.length;
					for (; n--;) delete a[r[n]]
				}
			},
			hasData: function(e) {
				return !Z.isEmptyObject(this.cache[e[this.expando]] || {})
			},
			discard: function(e) {
				e[this.expando] && delete this.cache[e[this.expando]]
			}
		};
		var gt = new s,
			yt = new s,
			bt = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
			wt = /([A-Z])/g;
		Z.extend({
			hasData: function(e) {
				return yt.hasData(e) || gt.hasData(e)
			},
			data: function(e, t, n) {
				return yt.access(e, t, n)
			},
			removeData: function(e, t) {
				yt.remove(e, t)
			},
			_data: function(e, t, n) {
				return gt.access(e, t, n)
			},
			_removeData: function(e, t) {
				gt.remove(e, t)
			}
		}), Z.fn.extend({
			data: function(e, t) {
				var n, r, i, o = this[0],
					a = o && o.attributes;
				if (void 0 === e) {
					if (this.length && (i = yt.get(o), 1 === o.nodeType && !gt.get(o, "hasDataAttrs"))) {
						for (n = a.length; n--;) a[n] && (r = a[n].name, 0 === r.indexOf("data-") && (r = Z.camelCase(r.slice(5)), c(o, r, i[r])));
						gt.set(o, "hasDataAttrs", !0)
					}
					return i
				}
				return "object" == typeof e ? this.each(function() {
					yt.set(this, e)
				}) : vt(this, function(t) {
					var n, r = Z.camelCase(e);
					if (o && void 0 === t) {
						if (n = yt.get(o, e), void 0 !== n) return n;
						if (n = yt.get(o, r), void 0 !== n) return n;
						if (n = c(o, r, void 0), void 0 !== n) return n
					} else this.each(function() {
						var n = yt.get(this, r);
						yt.set(this, r, t), -1 !== e.indexOf("-") && void 0 !== n && yt.set(this, e, t)
					})
				}, null, t, arguments.length > 1, null, !0)
			},
			removeData: function(e) {
				return this.each(function() {
					yt.remove(this, e)
				})
			}
		}), Z.extend({
			queue: function(e, t, n) {
				var r;
				return e ? (t = (t || "fx") + "queue", r = gt.get(e, t), n && (!r || Z.isArray(n) ? r = gt.access(e, t, Z.makeArray(n)) : r.push(n)), r || []) : void 0
			},
			dequeue: function(e, t) {
				t = t || "fx";
				var n = Z.queue(e, t),
					r = n.length,
					i = n.shift(),
					o = Z._queueHooks(e, t),
					a = function() {
						Z.dequeue(e, t)
					};
				"inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, a, o)), !r && o && o.empty.fire()
			},
			_queueHooks: function(e, t) {
				var n = t + "queueHooks";
				return gt.get(e, n) || gt.access(e, n, {
					empty: Z.Callbacks("once memory").add(function() {
						gt.remove(e, [t + "queue", n])
					})
				})
			}
		}), Z.fn.extend({
			queue: function(e, t) {
				var n = 2;
				return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? Z.queue(this[0], e) : void 0 === t ? this : this.each(function() {
					var n = Z.queue(this, e, t);
					Z._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && Z.dequeue(this, e)
				})
			},
			dequeue: function(e) {
				return this.each(function() {
					Z.dequeue(this, e)
				})
			},
			clearQueue: function(e) {
				return this.queue(e || "fx", [])
			},
			promise: function(e, t) {
				var n, r = 1,
					i = Z.Deferred(),
					o = this,
					a = this.length,
					s = function() {
						--r || i.resolveWith(o, [o])
					};
				for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; a--;) n = gt.get(o[a], e + "queueHooks"), n && n.empty && (r++, n.empty.add(s));
				return s(), i.promise(t)
			}
		});
		var xt = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
			Et = ["Top", "Right", "Bottom", "Left"],
			Tt = function(e, t) {
				return e = t || e, "none" === Z.css(e, "display") || !Z.contains(e.ownerDocument, e)
			},
			_t = /^(?:checkbox|radio)$/i;
		! function() {
			var e = K.createDocumentFragment(),
				t = e.appendChild(K.createElement("div")),
				n = K.createElement("input");
			n.setAttribute("type", "radio"), n.setAttribute("checked", "checked"), n.setAttribute("name", "t"), t.appendChild(n), J.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, t.innerHTML = "<textarea>x</textarea>", J.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue
		}();
		var Ct = "undefined";
		J.focusinBubbles = "onfocusin" in e;
		var kt = /^key/,
			St = /^(?:mouse|pointer|contextmenu)|click/,
			At = /^(?:focusinfocus|focusoutblur)$/,
			Nt = /^([^.]*)(?:\.(.+)|)$/;
		Z.event = {
			global: {},
			add: function(e, t, n, r, i) {
				var o, a, s, c, u, l, f, d, p, h, m, v = gt.get(e);
				if (v)
					for (n.handler && (o = n, n = o.handler, i = o.selector), n.guid || (n.guid = Z.guid++), (c = v.events) || (c = v.events = {}), (a = v.handle) || (a = v.handle = function(t) {
						return typeof Z !== Ct && Z.event.triggered !== t.type ? Z.event.dispatch.apply(e, arguments) : void 0
					}), t = (t || "").match(pt) || [""], u = t.length; u--;) s = Nt.exec(t[u]) || [], p = m = s[1], h = (s[2] || "").split(".").sort(), p && (f = Z.event.special[p] || {}, p = (i ? f.delegateType : f.bindType) || p, f = Z.event.special[p] || {}, l = Z.extend({
						type: p,
						origType: m,
						data: r,
						handler: n,
						guid: n.guid,
						selector: i,
						needsContext: i && Z.expr.match.needsContext.test(i),
						namespace: h.join(".")
					}, o), (d = c[p]) || (d = c[p] = [], d.delegateCount = 0, f.setup && f.setup.call(e, r, h, a) !== !1 || e.addEventListener && e.addEventListener(p, a, !1)), f.add && (f.add.call(e, l), l.handler.guid || (l.handler.guid = n.guid)), i ? d.splice(d.delegateCount++, 0, l) : d.push(l), Z.event.global[p] = !0)
			},
			remove: function(e, t, n, r, i) {
				var o, a, s, c, u, l, f, d, p, h, m, v = gt.hasData(e) && gt.get(e);
				if (v && (c = v.events)) {
					for (t = (t || "").match(pt) || [""], u = t.length; u--;)
						if (s = Nt.exec(t[u]) || [], p = m = s[1], h = (s[2] || "").split(".").sort(), p) {
							for (f = Z.event.special[p] || {}, p = (r ? f.delegateType : f.bindType) || p, d = c[p] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = o = d.length; o--;) l = d[o], !i && m !== l.origType || n && n.guid !== l.guid || s && !s.test(l.namespace) || r && r !== l.selector && ("**" !== r || !l.selector) || (d.splice(o, 1), l.selector && d.delegateCount--, f.remove && f.remove.call(e, l));
							a && !d.length && (f.teardown && f.teardown.call(e, h, v.handle) !== !1 || Z.removeEvent(e, p, v.handle), delete c[p])
						} else
							for (p in c) Z.event.remove(e, p + t[u], n, r, !0);
					Z.isEmptyObject(c) && (delete v.handle, gt.remove(e, "events"))
				}
			},
			trigger: function(t, n, r, i) {
				var o, a, s, c, u, l, f, d = [r || K],
					p = G.call(t, "type") ? t.type : t,
					h = G.call(t, "namespace") ? t.namespace.split(".") : [];
				if (a = s = r = r || K, 3 !== r.nodeType && 8 !== r.nodeType && !At.test(p + Z.event.triggered) && (p.indexOf(".") >= 0 && (h = p.split("."), p = h.shift(), h.sort()), u = p.indexOf(":") < 0 && "on" + p, t = t[Z.expando] ? t : new Z.Event(p, "object" == typeof t && t), t.isTrigger = i ? 2 : 3, t.namespace = h.join("."), t.namespace_re = t.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = r), n = null == n ? [t] : Z.makeArray(n, [t]), f = Z.event.special[p] || {}, i || !f.trigger || f.trigger.apply(r, n) !== !1)) {
					if (!i && !f.noBubble && !Z.isWindow(r)) {
						for (c = f.delegateType || p, At.test(c + p) || (a = a.parentNode); a; a = a.parentNode) d.push(a), s = a;
						s === (r.ownerDocument || K) && d.push(s.defaultView || s.parentWindow || e)
					}
					for (o = 0;
						(a = d[o++]) && !t.isPropagationStopped();) t.type = o > 1 ? c : f.bindType || p, l = (gt.get(a, "events") || {})[t.type] && gt.get(a, "handle"), l && l.apply(a, n), l = u && a[u], l && l.apply && Z.acceptData(a) && (t.result = l.apply(a, n), t.result === !1 && t.preventDefault());
					return t.type = p, i || t.isDefaultPrevented() || f._default && f._default.apply(d.pop(), n) !== !1 || !Z.acceptData(r) || u && Z.isFunction(r[p]) && !Z.isWindow(r) && (s = r[u], s && (r[u] = null), Z.event.triggered = p, r[p](), Z.event.triggered = void 0, s && (r[u] = s)), t.result
				}
			},
			dispatch: function(e) {
				e = Z.event.fix(e);
				var t, n, r, i, o, a = [],
					s = z.call(arguments),
					c = (gt.get(this, "events") || {})[e.type] || [],
					u = Z.event.special[e.type] || {};
				if (s[0] = e, e.delegateTarget = this, !u.preDispatch || u.preDispatch.call(this, e) !== !1) {
					for (a = Z.event.handlers.call(this, e, c), t = 0;
						(i = a[t++]) && !e.isPropagationStopped();)
						for (e.currentTarget = i.elem, n = 0;
							(o = i.handlers[n++]) && !e.isImmediatePropagationStopped();)(!e.namespace_re || e.namespace_re.test(o.namespace)) && (e.handleObj = o, e.data = o.data, r = ((Z.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, s), void 0 !== r && (e.result = r) === !1 && (e.preventDefault(), e.stopPropagation()));
					return u.postDispatch && u.postDispatch.call(this, e), e.result
				}
			},
			handlers: function(e, t) {
				var n, r, i, o, a = [],
					s = t.delegateCount,
					c = e.target;
				if (s && c.nodeType && (!e.button || "click" !== e.type))
					for (; c !== this; c = c.parentNode || this)
						if (c.disabled !== !0 || "click" !== e.type) {
							for (r = [], n = 0; s > n; n++) o = t[n], i = o.selector + " ", void 0 === r[i] && (r[i] = o.needsContext ? Z(i, this).index(c) >= 0 : Z.find(i, this, null, [c]).length), r[i] && r.push(o);
							r.length && a.push({
								elem: c,
								handlers: r
							})
						}
				return s < t.length && a.push({
					elem: this,
					handlers: t.slice(s)
				}), a
			},
			props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
			fixHooks: {},
			keyHooks: {
				props: "char charCode key keyCode".split(" "),
				filter: function(e, t) {
					return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
				}
			},
			mouseHooks: {
				props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
				filter: function(e, t) {
					var n, r, i, o = t.button;
					return null == e.pageX && null != t.clientX && (n = e.target.ownerDocument || K, r = n.documentElement, i = n.body, e.pageX = t.clientX + (r && r.scrollLeft || i && i.scrollLeft || 0) - (r && r.clientLeft || i && i.clientLeft || 0), e.pageY = t.clientY + (r && r.scrollTop || i && i.scrollTop || 0) - (r && r.clientTop || i && i.clientTop || 0)), e.which || void 0 === o || (e.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), e
				}
			},
			fix: function(e) {
				if (e[Z.expando]) return e;
				var t, n, r, i = e.type,
					o = e,
					a = this.fixHooks[i];
				for (a || (this.fixHooks[i] = a = St.test(i) ? this.mouseHooks : kt.test(i) ? this.keyHooks : {}), r = a.props ? this.props.concat(a.props) : this.props, e = new Z.Event(o), t = r.length; t--;) n = r[t], e[n] = o[n];
				return e.target || (e.target = K), 3 === e.target.nodeType && (e.target = e.target.parentNode), a.filter ? a.filter(e, o) : e
			},
			special: {
				load: {
					noBubble: !0
				},
				focus: {
					trigger: function() {
						return this !== f() && this.focus ? (this.focus(), !1) : void 0
					},
					delegateType: "focusin"
				},
				blur: {
					trigger: function() {
						return this === f() && this.blur ? (this.blur(), !1) : void 0
					},
					delegateType: "focusout"
				},
				click: {
					trigger: function() {
						return "checkbox" === this.type && this.click && Z.nodeName(this, "input") ? (this.click(), !1) : void 0
					},
					_default: function(e) {
						return Z.nodeName(e.target, "a")
					}
				},
				beforeunload: {
					postDispatch: function(e) {
						void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
					}
				}
			},
			simulate: function(e, t, n, r) {
				var i = Z.extend(new Z.Event, n, {
					type: e,
					isSimulated: !0,
					originalEvent: {}
				});
				r ? Z.event.trigger(i, null, t) : Z.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault()
			}
		}, Z.removeEvent = function(e, t, n) {
			e.removeEventListener && e.removeEventListener(t, n, !1)
		}, Z.Event = function(e, t) {
			return this instanceof Z.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? u : l) : this.type = e, t && Z.extend(this, t), this.timeStamp = e && e.timeStamp || Z.now(), void(this[Z.expando] = !0)) : new Z.Event(e, t)
		}, Z.Event.prototype = {
			isDefaultPrevented: l,
			isPropagationStopped: l,
			isImmediatePropagationStopped: l,
			preventDefault: function() {
				var e = this.originalEvent;
				this.isDefaultPrevented = u, e && e.preventDefault && e.preventDefault()
			},
			stopPropagation: function() {
				var e = this.originalEvent;
				this.isPropagationStopped = u, e && e.stopPropagation && e.stopPropagation()
			},
			stopImmediatePropagation: function() {
				var e = this.originalEvent;
				this.isImmediatePropagationStopped = u, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), this.stopPropagation()
			}
		}, Z.each({
			mouseenter: "mouseover",
			mouseleave: "mouseout",
			pointerenter: "pointerover",
			pointerleave: "pointerout"
		}, function(e, t) {
			Z.event.special[e] = {
				delegateType: t,
				bindType: t,
				handle: function(e) {
					var n, r = this,
						i = e.relatedTarget,
						o = e.handleObj;
					return (!i || i !== r && !Z.contains(r, i)) && (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
				}
			}
		}), J.focusinBubbles || Z.each({
			focus: "focusin",
			blur: "focusout"
		}, function(e, t) {
			var n = function(e) {
				Z.event.simulate(t, e.target, Z.event.fix(e), !0)
			};
			Z.event.special[t] = {
				setup: function() {
					var r = this.ownerDocument || this,
						i = gt.access(r, t);
					i || r.addEventListener(e, n, !0), gt.access(r, t, (i || 0) + 1)
				},
				teardown: function() {
					var r = this.ownerDocument || this,
						i = gt.access(r, t) - 1;
					i ? gt.access(r, t, i) : (r.removeEventListener(e, n, !0), gt.remove(r, t))
				}
			}
		}), Z.fn.extend({
			on: function(e, t, n, r, i) {
				var o, a;
				if ("object" == typeof e) {
					"string" != typeof t && (n = n || t, t = void 0);
					for (a in e) this.on(a, t, n, e[a], i);
					return this
				}
				if (null == n && null == r ? (r = t, n = t = void 0) : null == r && ("string" == typeof t ? (r = n, n = void 0) : (r = n, n = t, t = void 0)), r === !1) r = l;
				else if (!r) return this;
				return 1 === i && (o = r, r = function(e) {
					return Z().off(e), o.apply(this, arguments)
				}, r.guid = o.guid || (o.guid = Z.guid++)), this.each(function() {
					Z.event.add(this, e, r, n, t)
				})
			},
			one: function(e, t, n, r) {
				return this.on(e, t, n, r, 1)
			},
			off: function(e, t, n) {
				var r, i;
				if (e && e.preventDefault && e.handleObj) return r = e.handleObj, Z(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
				if ("object" == typeof e) {
					for (i in e) this.off(i, t, e[i]);
					return this
				}
				return (t === !1 || "function" == typeof t) && (n = t, t = void 0), n === !1 && (n = l), this.each(function() {
					Z.event.remove(this, e, n, t)
				})
			},
			trigger: function(e, t) {
				return this.each(function() {
					Z.event.trigger(e, t, this)
				})
			},
			triggerHandler: function(e, t) {
				var n = this[0];
				return n ? Z.event.trigger(e, t, n, !0) : void 0
			}
		});
		var Dt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
			jt = /<([\w:]+)/,
			Pt = /<|&#?\w+;/,
			Lt = /<(?:script|style|link)/i,
			Ot = /checked\s*(?:[^=]|=\s*.checked.)/i,
			It = /^$|\/(?:java|ecma)script/i,
			Mt = /^true\/(.*)/,
			$t = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
			Ft = {
				option: [1, "<select multiple='multiple'>", "</select>"],
				thead: [1, "<table>", "</table>"],
				col: [2, "<table><colgroup>", "</colgroup></table>"],
				tr: [2, "<table><tbody>", "</tbody></table>"],
				td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
				_default: [0, "", ""]
			};
		Ft.optgroup = Ft.option, Ft.tbody = Ft.tfoot = Ft.colgroup = Ft.caption = Ft.thead, Ft.th = Ft.td, Z.extend({
			clone: function(e, t, n) {
				var r, i, o, a, s = e.cloneNode(!0),
					c = Z.contains(e.ownerDocument, e);
				if (!(J.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || Z.isXMLDoc(e)))
					for (a = g(s), o = g(e), r = 0, i = o.length; i > r; r++) y(o[r], a[r]);
				if (t)
					if (n)
						for (o = o || g(e), a = a || g(s), r = 0, i = o.length; i > r; r++) v(o[r], a[r]);
					else v(e, s);
				return a = g(s, "script"), a.length > 0 && m(a, !c && g(e, "script")), s
			},
			buildFragment: function(e, t, n, r) {
				for (var i, o, a, s, c, u, l = t.createDocumentFragment(), f = [], d = 0, p = e.length; p > d; d++)
					if (i = e[d], i || 0 === i)
						if ("object" === Z.type(i)) Z.merge(f, i.nodeType ? [i] : i);
						else if (Pt.test(i)) {
					for (o = o || l.appendChild(t.createElement("div")), a = (jt.exec(i) || ["", ""])[1].toLowerCase(), s = Ft[a] || Ft._default, o.innerHTML = s[1] + i.replace(Dt, "<$1></$2>") + s[2], u = s[0]; u--;) o = o.lastChild;
					Z.merge(f, o.childNodes), o = l.firstChild, o.textContent = ""
				} else f.push(t.createTextNode(i));
				for (l.textContent = "", d = 0; i = f[d++];)
					if ((!r || -1 === Z.inArray(i, r)) && (c = Z.contains(i.ownerDocument, i), o = g(l.appendChild(i), "script"), c && m(o), n))
						for (u = 0; i = o[u++];) It.test(i.type || "") && n.push(i);
				return l
			},
			cleanData: function(e) {
				for (var t, n, r, i, o = Z.event.special, a = 0; void 0 !== (n = e[a]); a++) {
					if (Z.acceptData(n) && (i = n[gt.expando], i && (t = gt.cache[i]))) {
						if (t.events)
							for (r in t.events) o[r] ? Z.event.remove(n, r) : Z.removeEvent(n, r, t.handle);
						gt.cache[i] && delete gt.cache[i]
					}
					delete yt.cache[n[yt.expando]]
				}
			}
		}), Z.fn.extend({
			text: function(e) {
				return vt(this, function(e) {
					return void 0 === e ? Z.text(this) : this.empty().each(function() {
						(1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = e)
					})
				}, null, e, arguments.length)
			},
			append: function() {
				return this.domManip(arguments, function(e) {
					if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
						var t = d(this, e);
						t.appendChild(e)
					}
				})
			},
			prepend: function() {
				return this.domManip(arguments, function(e) {
					if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
						var t = d(this, e);
						t.insertBefore(e, t.firstChild)
					}
				})
			},
			before: function() {
				return this.domManip(arguments, function(e) {
					this.parentNode && this.parentNode.insertBefore(e, this)
				})
			},
			after: function() {
				return this.domManip(arguments, function(e) {
					this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
				})
			},
			remove: function(e, t) {
				for (var n, r = e ? Z.filter(e, this) : this, i = 0; null != (n = r[i]); i++) t || 1 !== n.nodeType || Z.cleanData(g(n)), n.parentNode && (t && Z.contains(n.ownerDocument, n) && m(g(n, "script")), n.parentNode.removeChild(n));
				return this
			},
			empty: function() {
				for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (Z.cleanData(g(e, !1)), e.textContent = "");
				return this
			},
			clone: function(e, t) {
				return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function() {
					return Z.clone(this, e, t)
				})
			},
			html: function(e) {
				return vt(this, function(e) {
					var t = this[0] || {},
						n = 0,
						r = this.length;
					if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
					if ("string" == typeof e && !Lt.test(e) && !Ft[(jt.exec(e) || ["", ""])[1].toLowerCase()]) {
						e = e.replace(Dt, "<$1></$2>");
						try {
							for (; r > n; n++) t = this[n] || {}, 1 === t.nodeType && (Z.cleanData(g(t, !1)), t.innerHTML = e);
							t = 0
						} catch (i) {}
					}
					t && this.empty().append(e)
				}, null, e, arguments.length)
			},
			replaceWith: function() {
				var e = arguments[0];
				return this.domManip(arguments, function(t) {
					e = this.parentNode, Z.cleanData(g(this)), e && e.replaceChild(t, this)
				}), e && (e.length || e.nodeType) ? this : this.remove()
			},
			detach: function(e) {
				return this.remove(e, !0)
			},
			domManip: function(e, t) {
				e = q.apply([], e);
				var n, r, i, o, a, s, c = 0,
					u = this.length,
					l = this,
					f = u - 1,
					d = e[0],
					m = Z.isFunction(d);
				if (m || u > 1 && "string" == typeof d && !J.checkClone && Ot.test(d)) return this.each(function(n) {
					var r = l.eq(n);
					m && (e[0] = d.call(this, n, r.html())), r.domManip(e, t)
				});
				if (u && (n = Z.buildFragment(e, this[0].ownerDocument, !1, this), r = n.firstChild, 1 === n.childNodes.length && (n = r), r)) {
					for (i = Z.map(g(n, "script"), p), o = i.length; u > c; c++) a = n, c !== f && (a = Z.clone(a, !0, !0), o && Z.merge(i, g(a, "script"))), t.call(this[c], a, c);
					if (o)
						for (s = i[i.length - 1].ownerDocument, Z.map(i, h), c = 0; o > c; c++) a = i[c], It.test(a.type || "") && !gt.access(a, "globalEval") && Z.contains(s, a) && (a.src ? Z._evalUrl && Z._evalUrl(a.src) : Z.globalEval(a.textContent.replace($t, "")))
				}
				return this
			}
		}), Z.each({
			appendTo: "append",
			prependTo: "prepend",
			insertBefore: "before",
			insertAfter: "after",
			replaceAll: "replaceWith"
		}, function(e, t) {
			Z.fn[e] = function(e) {
				for (var n, r = [], i = Z(e), o = i.length - 1, a = 0; o >= a; a++) n = a === o ? this : this.clone(!0), Z(i[a])[t](n), W.apply(r, n.get());
				return this.pushStack(r)
			}
		});
		var Rt, Ut = {},
			Ht = /^margin/,
			Bt = new RegExp("^(" + xt + ")(?!px)[a-z%]+$", "i"),
			zt = function(t) {
				return t.ownerDocument.defaultView.opener ? t.ownerDocument.defaultView.getComputedStyle(t, null) : e.getComputedStyle(t, null)
			};
		! function() {
			function t() {
				a.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", a.innerHTML = "", i.appendChild(o);
				var t = e.getComputedStyle(a, null);
				n = "1%" !== t.top, r = "4px" === t.width, i.removeChild(o)
			}
			var n, r, i = K.documentElement,
				o = K.createElement("div"),
				a = K.createElement("div");
			a.style && (a.style.backgroundClip = "content-box", a.cloneNode(!0).style.backgroundClip = "", J.clearCloneStyle = "content-box" === a.style.backgroundClip, o.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute", o.appendChild(a), e.getComputedStyle && Z.extend(J, {
				pixelPosition: function() {
					return t(), n
				},
				boxSizingReliable: function() {
					return null == r && t(), r
				},
				reliableMarginRight: function() {
					var t, n = a.appendChild(K.createElement("div"));
					return n.style.cssText = a.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", n.style.marginRight = n.style.width = "0", a.style.width = "1px", i.appendChild(o), t = !parseFloat(e.getComputedStyle(n, null).marginRight), i.removeChild(o), a.removeChild(n), t
				}
			}))
		}(), Z.swap = function(e, t, n, r) {
			var i, o, a = {};
			for (o in t) a[o] = e.style[o], e.style[o] = t[o];
			i = n.apply(e, r || []);
			for (o in t) e.style[o] = a[o];
			return i
		};
		var qt = /^(none|table(?!-c[ea]).+)/,
			Wt = new RegExp("^(" + xt + ")(.*)$", "i"),
			Vt = new RegExp("^([+-])=(" + xt + ")", "i"),
			Xt = {
				position: "absolute",
				visibility: "hidden",
				display: "block"
			},
			Yt = {
				letterSpacing: "0",
				fontWeight: "400"
			},
			Gt = ["Webkit", "O", "Moz", "ms"];
		Z.extend({
			cssHooks: {
				opacity: {
					get: function(e, t) {
						if (t) {
							var n = x(e, "opacity");
							return "" === n ? "1" : n
						}
					}
				}
			},
			cssNumber: {
				columnCount: !0,
				fillOpacity: !0,
				flexGrow: !0,
				flexShrink: !0,
				fontWeight: !0,
				lineHeight: !0,
				opacity: !0,
				order: !0,
				orphans: !0,
				widows: !0,
				zIndex: !0,
				zoom: !0
			},
			cssProps: {
				"float": "cssFloat"
			},
			style: function(e, t, n, r) {
				if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
					var i, o, a, s = Z.camelCase(t),
						c = e.style;
					return t = Z.cssProps[s] || (Z.cssProps[s] = T(c, s)), a = Z.cssHooks[t] || Z.cssHooks[s], void 0 === n ? a && "get" in a && void 0 !== (i = a.get(e, !1, r)) ? i : c[t] : (o = typeof n, "string" === o && (i = Vt.exec(n)) && (n = (i[1] + 1) * i[2] + parseFloat(Z.css(e, t)), o = "number"), null != n && n === n && ("number" !== o || Z.cssNumber[s] || (n += "px"), J.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (c[t] = "inherit"), a && "set" in a && void 0 === (n = a.set(e, n, r)) || (c[t] = n)), void 0)
				}
			},
			css: function(e, t, n, r) {
				var i, o, a, s = Z.camelCase(t);
				return t = Z.cssProps[s] || (Z.cssProps[s] = T(e.style, s)), a = Z.cssHooks[t] || Z.cssHooks[s], a && "get" in a && (i = a.get(e, !0, n)), void 0 === i && (i = x(e, t, r)), "normal" === i && t in Yt && (i = Yt[t]), "" === n || n ? (o = parseFloat(i), n === !0 || Z.isNumeric(o) ? o || 0 : i) : i
			}
		}), Z.each(["height", "width"], function(e, t) {
			Z.cssHooks[t] = {
				get: function(e, n, r) {
					return n ? qt.test(Z.css(e, "display")) && 0 === e.offsetWidth ? Z.swap(e, Xt, function() {
						return k(e, t, r)
					}) : k(e, t, r) : void 0
				},
				set: function(e, n, r) {
					var i = r && zt(e);
					return _(e, n, r ? C(e, t, r, "border-box" === Z.css(e, "boxSizing", !1, i), i) : 0)
				}
			}
		}), Z.cssHooks.marginRight = E(J.reliableMarginRight, function(e, t) {
			return t ? Z.swap(e, {
				display: "inline-block"
			}, x, [e, "marginRight"]) : void 0
		}), Z.each({
			margin: "",
			padding: "",
			border: "Width"
		}, function(e, t) {
			Z.cssHooks[e + t] = {
				expand: function(n) {
					for (var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; 4 > r; r++) i[e + Et[r] + t] = o[r] || o[r - 2] || o[0];
					return i
				}
			}, Ht.test(e) || (Z.cssHooks[e + t].set = _)
		}), Z.fn.extend({
			css: function(e, t) {
				return vt(this, function(e, t, n) {
					var r, i, o = {},
						a = 0;
					if (Z.isArray(t)) {
						for (r = zt(e), i = t.length; i > a; a++) o[t[a]] = Z.css(e, t[a], !1, r);
						return o
					}
					return void 0 !== n ? Z.style(e, t, n) : Z.css(e, t)
				}, e, t, arguments.length > 1)
			},
			show: function() {
				return S(this, !0)
			},
			hide: function() {
				return S(this)
			},
			toggle: function(e) {
				return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
					Tt(this) ? Z(this).show() : Z(this).hide()
				})
			}
		}), Z.Tween = A, A.prototype = {
			constructor: A,
			init: function(e, t, n, r, i, o) {
				this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (Z.cssNumber[n] ? "" : "px")
			},
			cur: function() {
				var e = A.propHooks[this.prop];
				return e && e.get ? e.get(this) : A.propHooks._default.get(this)
			},
			run: function(e) {
				var t, n = A.propHooks[this.prop];
				return this.pos = t = this.options.duration ? Z.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : A.propHooks._default.set(this), this
			}
		}, A.prototype.init.prototype = A.prototype, A.propHooks = {
			_default: {
				get: function(e) {
					var t;
					return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = Z.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
				},
				set: function(e) {
					Z.fx.step[e.prop] ? Z.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[Z.cssProps[e.prop]] || Z.cssHooks[e.prop]) ? Z.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
				}
			}
		}, A.propHooks.scrollTop = A.propHooks.scrollLeft = {
			set: function(e) {
				e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
			}
		}, Z.easing = {
			linear: function(e) {
				return e
			},
			swing: function(e) {
				return .5 - Math.cos(e * Math.PI) / 2
			}
		}, Z.fx = A.prototype.init, Z.fx.step = {};
		var Jt, Kt, Qt = /^(?:toggle|show|hide)$/,
			Zt = new RegExp("^(?:([+-])=|)(" + xt + ")([a-z%]*)$", "i"),
			en = /queueHooks$/,
			tn = [P],
			nn = {
				"*": [
					function(e, t) {
						var n = this.createTween(e, t),
							r = n.cur(),
							i = Zt.exec(t),
							o = i && i[3] || (Z.cssNumber[e] ? "" : "px"),
							a = (Z.cssNumber[e] || "px" !== o && +r) && Zt.exec(Z.css(n.elem, e)),
							s = 1,
							c = 20;
						if (a && a[3] !== o) {
							o = o || a[3], i = i || [], a = +r || 1;
							do s = s || ".5", a /= s, Z.style(n.elem, e, a + o); while (s !== (s = n.cur() / r) && 1 !== s && --c)
						}
						return i && (a = n.start = +a || +r || 0, n.unit = o, n.end = i[1] ? a + (i[1] + 1) * i[2] : +i[2]), n
					}
				]
			};
		Z.Animation = Z.extend(O, {
				tweener: function(e, t) {
					Z.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
					for (var n, r = 0, i = e.length; i > r; r++) n = e[r], nn[n] = nn[n] || [], nn[n].unshift(t)
				},
				prefilter: function(e, t) {
					t ? tn.unshift(e) : tn.push(e)
				}
			}), Z.speed = function(e, t, n) {
				var r = e && "object" == typeof e ? Z.extend({}, e) : {
					complete: n || !n && t || Z.isFunction(e) && e,
					duration: e,
					easing: n && t || t && !Z.isFunction(t) && t
				};
				return r.duration = Z.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in Z.fx.speeds ? Z.fx.speeds[r.duration] : Z.fx.speeds._default, (null == r.queue || r.queue === !0) && (r.queue = "fx"), r.old = r.complete, r.complete = function() {
					Z.isFunction(r.old) && r.old.call(this), r.queue && Z.dequeue(this, r.queue)
				}, r
			}, Z.fn.extend({
				fadeTo: function(e, t, n, r) {
					return this.filter(Tt).css("opacity", 0).show().end().animate({
						opacity: t
					}, e, n, r)
				},
				animate: function(e, t, n, r) {
					var i = Z.isEmptyObject(e),
						o = Z.speed(t, n, r),
						a = function() {
							var t = O(this, Z.extend({}, e), o);
							(i || gt.get(this, "finish")) && t.stop(!0)
						};
					return a.finish = a, i || o.queue === !1 ? this.each(a) : this.queue(o.queue, a)
				},
				stop: function(e, t, n) {
					var r = function(e) {
						var t = e.stop;
						delete e.stop, t(n)
					};
					return "string" != typeof e && (n = t, t = e, e = void 0), t && e !== !1 && this.queue(e || "fx", []), this.each(function() {
						var t = !0,
							i = null != e && e + "queueHooks",
							o = Z.timers,
							a = gt.get(this);
						if (i) a[i] && a[i].stop && r(a[i]);
						else
							for (i in a) a[i] && a[i].stop && en.test(i) && r(a[i]);
						for (i = o.length; i--;) o[i].elem !== this || null != e && o[i].queue !== e || (o[i].anim.stop(n), t = !1, o.splice(i, 1));
						(t || !n) && Z.dequeue(this, e)
					})
				},
				finish: function(e) {
					return e !== !1 && (e = e || "fx"), this.each(function() {
						var t, n = gt.get(this),
							r = n[e + "queue"],
							i = n[e + "queueHooks"],
							o = Z.timers,
							a = r ? r.length : 0;
						for (n.finish = !0, Z.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = o.length; t--;) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
						for (t = 0; a > t; t++) r[t] && r[t].finish && r[t].finish.call(this);
						delete n.finish
					})
				}
			}), Z.each(["toggle", "show", "hide"], function(e, t) {
				var n = Z.fn[t];
				Z.fn[t] = function(e, r, i) {
					return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(D(t, !0), e, r, i)
				}
			}), Z.each({
				slideDown: D("show"),
				slideUp: D("hide"),
				slideToggle: D("toggle"),
				fadeIn: {
					opacity: "show"
				},
				fadeOut: {
					opacity: "hide"
				},
				fadeToggle: {
					opacity: "toggle"
				}
			}, function(e, t) {
				Z.fn[e] = function(e, n, r) {
					return this.animate(t, e, n, r)
				}
			}), Z.timers = [], Z.fx.tick = function() {
				var e, t = 0,
					n = Z.timers;
				for (Jt = Z.now(); t < n.length; t++) e = n[t], e() || n[t] !== e || n.splice(t--, 1);
				n.length || Z.fx.stop(), Jt = void 0
			}, Z.fx.timer = function(e) {
				Z.timers.push(e), e() ? Z.fx.start() : Z.timers.pop()
			}, Z.fx.interval = 13, Z.fx.start = function() {
				Kt || (Kt = setInterval(Z.fx.tick, Z.fx.interval))
			}, Z.fx.stop = function() {
				clearInterval(Kt), Kt = null
			}, Z.fx.speeds = {
				slow: 600,
				fast: 200,
				_default: 400
			}, Z.fn.delay = function(e, t) {
				return e = Z.fx ? Z.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, n) {
					var r = setTimeout(t, e);
					n.stop = function() {
						clearTimeout(r)
					}
				})
			},
			function() {
				var e = K.createElement("input"),
					t = K.createElement("select"),
					n = t.appendChild(K.createElement("option"));
				e.type = "checkbox", J.checkOn = "" !== e.value, J.optSelected = n.selected, t.disabled = !0, J.optDisabled = !n.disabled, e = K.createElement("input"), e.value = "t", e.type = "radio", J.radioValue = "t" === e.value
			}();
		var rn, on, an = Z.expr.attrHandle;
		Z.fn.extend({
			attr: function(e, t) {
				return vt(this, Z.attr, e, t, arguments.length > 1)
			},
			removeAttr: function(e) {
				return this.each(function() {
					Z.removeAttr(this, e)
				})
			}
		}), Z.extend({
			attr: function(e, t, n) {
				var r, i, o = e.nodeType;
				if (e && 3 !== o && 8 !== o && 2 !== o) return typeof e.getAttribute === Ct ? Z.prop(e, t, n) : (1 === o && Z.isXMLDoc(e) || (t = t.toLowerCase(), r = Z.attrHooks[t] || (Z.expr.match.bool.test(t) ? on : rn)), void 0 === n ? r && "get" in r && null !== (i = r.get(e, t)) ? i : (i = Z.find.attr(e, t), null == i ? void 0 : i) : null !== n ? r && "set" in r && void 0 !== (i = r.set(e, n, t)) ? i : (e.setAttribute(t, n + ""), n) : void Z.removeAttr(e, t))
			},
			removeAttr: function(e, t) {
				var n, r, i = 0,
					o = t && t.match(pt);
				if (o && 1 === e.nodeType)
					for (; n = o[i++];) r = Z.propFix[n] || n, Z.expr.match.bool.test(n) && (e[r] = !1), e.removeAttribute(n)
			},
			attrHooks: {
				type: {
					set: function(e, t) {
						if (!J.radioValue && "radio" === t && Z.nodeName(e, "input")) {
							var n = e.value;
							return e.setAttribute("type", t), n && (e.value = n), t
						}
					}
				}
			}
		}), on = {
			set: function(e, t, n) {
				return t === !1 ? Z.removeAttr(e, n) : e.setAttribute(n, n), n
			}
		}, Z.each(Z.expr.match.bool.source.match(/\w+/g), function(e, t) {
			var n = an[t] || Z.find.attr;
			an[t] = function(e, t, r) {
				var i, o;
				return r || (o = an[t], an[t] = i, i = null != n(e, t, r) ? t.toLowerCase() : null, an[t] = o), i
			}
		});
		var sn = /^(?:input|select|textarea|button)$/i;
		Z.fn.extend({
			prop: function(e, t) {
				return vt(this, Z.prop, e, t, arguments.length > 1)
			},
			removeProp: function(e) {
				return this.each(function() {
					delete this[Z.propFix[e] || e]
				})
			}
		}), Z.extend({
			propFix: {
				"for": "htmlFor",
				"class": "className"
			},
			prop: function(e, t, n) {
				var r, i, o, a = e.nodeType;
				if (e && 3 !== a && 8 !== a && 2 !== a) return o = 1 !== a || !Z.isXMLDoc(e), o && (t = Z.propFix[t] || t, i = Z.propHooks[t]), void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t]
			},
			propHooks: {
				tabIndex: {
					get: function(e) {
						return e.hasAttribute("tabindex") || sn.test(e.nodeName) || e.href ? e.tabIndex : -1
					}
				}
			}
		}), J.optSelected || (Z.propHooks.selected = {
			get: function(e) {
				var t = e.parentNode;
				return t && t.parentNode && t.parentNode.selectedIndex, null
			}
		}), Z.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
			Z.propFix[this.toLowerCase()] = this
		});
		var cn = /[\t\r\n\f]/g;
		Z.fn.extend({
			addClass: function(e) {
				var t, n, r, i, o, a, s = "string" == typeof e && e,
					c = 0,
					u = this.length;
				if (Z.isFunction(e)) return this.each(function(t) {
					Z(this).addClass(e.call(this, t, this.className))
				});
				if (s)
					for (t = (e || "").match(pt) || []; u > c; c++)
						if (n = this[c], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(cn, " ") : " ")) {
							for (o = 0; i = t[o++];) r.indexOf(" " + i + " ") < 0 && (r += i + " ");
							a = Z.trim(r), n.className !== a && (n.className = a)
						}
				return this
			},
			removeClass: function(e) {
				var t, n, r, i, o, a, s = 0 === arguments.length || "string" == typeof e && e,
					c = 0,
					u = this.length;
				if (Z.isFunction(e)) return this.each(function(t) {
					Z(this).removeClass(e.call(this, t, this.className))
				});
				if (s)
					for (t = (e || "").match(pt) || []; u > c; c++)
						if (n = this[c], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(cn, " ") : "")) {
							for (o = 0; i = t[o++];)
								for (; r.indexOf(" " + i + " ") >= 0;) r = r.replace(" " + i + " ", " ");
							a = e ? Z.trim(r) : "", n.className !== a && (n.className = a)
						}
				return this
			},
			toggleClass: function(e, t) {
				var n = typeof e;
				return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : this.each(Z.isFunction(e) ? function(n) {
					Z(this).toggleClass(e.call(this, n, this.className, t), t)
				} : function() {
					if ("string" === n)
						for (var t, r = 0, i = Z(this), o = e.match(pt) || []; t = o[r++];) i.hasClass(t) ? i.removeClass(t) : i.addClass(t);
					else(n === Ct || "boolean" === n) && (this.className && gt.set(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : gt.get(this, "__className__") || "")
				})
			},
			hasClass: function(e) {
				for (var t = " " + e + " ", n = 0, r = this.length; r > n; n++)
					if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(cn, " ").indexOf(t) >= 0) return !0;
				return !1
			}
		});
		var un = /\r/g;
		Z.fn.extend({
			val: function(e) {
				var t, n, r, i = this[0]; {
					if (arguments.length) return r = Z.isFunction(e), this.each(function(n) {
						var i;
						1 === this.nodeType && (i = r ? e.call(this, n, Z(this).val()) : e, null == i ? i = "" : "number" == typeof i ? i += "" : Z.isArray(i) && (i = Z.map(i, function(e) {
							return null == e ? "" : e + ""
						})), t = Z.valHooks[this.type] || Z.valHooks[this.nodeName.toLowerCase()], t && "set" in t && void 0 !== t.set(this, i, "value") || (this.value = i))
					});
					if (i) return t = Z.valHooks[i.type] || Z.valHooks[i.nodeName.toLowerCase()], t && "get" in t && void 0 !== (n = t.get(i, "value")) ? n : (n = i.value, "string" == typeof n ? n.replace(un, "") : null == n ? "" : n)
				}
			}
		}), Z.extend({
			valHooks: {
				option: {
					get: function(e) {
						var t = Z.find.attr(e, "value");
						return null != t ? t : Z.trim(Z.text(e))
					}
				},
				select: {
					get: function(e) {
						for (var t, n, r = e.options, i = e.selectedIndex, o = "select-one" === e.type || 0 > i, a = o ? null : [], s = o ? i + 1 : r.length, c = 0 > i ? s : o ? i : 0; s > c; c++)
							if (n = r[c], !(!n.selected && c !== i || (J.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && Z.nodeName(n.parentNode, "optgroup"))) {
								if (t = Z(n).val(), o) return t;
								a.push(t)
							}
						return a
					},
					set: function(e, t) {
						for (var n, r, i = e.options, o = Z.makeArray(t), a = i.length; a--;) r = i[a], (r.selected = Z.inArray(r.value, o) >= 0) && (n = !0);
						return n || (e.selectedIndex = -1), o
					}
				}
			}
		}), Z.each(["radio", "checkbox"], function() {
			Z.valHooks[this] = {
				set: function(e, t) {
					return Z.isArray(t) ? e.checked = Z.inArray(Z(e).val(), t) >= 0 : void 0
				}
			}, J.checkOn || (Z.valHooks[this].get = function(e) {
				return null === e.getAttribute("value") ? "on" : e.value
			})
		}), Z.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
			Z.fn[t] = function(e, n) {
				return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
			}
		}), Z.fn.extend({
			hover: function(e, t) {
				return this.mouseenter(e).mouseleave(t || e)
			},
			bind: function(e, t, n) {
				return this.on(e, null, t, n)
			},
			unbind: function(e, t) {
				return this.off(e, null, t)
			},
			delegate: function(e, t, n, r) {
				return this.on(t, e, n, r)
			},
			undelegate: function(e, t, n) {
				return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
			}
		});
		var ln = Z.now(),
			fn = /\?/;
		Z.parseJSON = function(e) {
			return JSON.parse(e + "")
		}, Z.parseXML = function(e) {
			var t, n;
			if (!e || "string" != typeof e) return null;
			try {
				n = new DOMParser, t = n.parseFromString(e, "text/xml")
			} catch (r) {
				t = void 0
			}
			return (!t || t.getElementsByTagName("parsererror").length) && Z.error("Invalid XML: " + e), t
		};
		var dn = /#.*$/,
			pn = /([?&])_=[^&]*/,
			hn = /^(.*?):[ \t]*([^\r\n]*)$/gm,
			mn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
			vn = /^(?:GET|HEAD)$/,
			gn = /^\/\//,
			yn = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
			bn = {},
			wn = {},
			xn = "*/".concat("*"),
			En = e.location.href,
			Tn = yn.exec(En.toLowerCase()) || [];
		Z.extend({
			active: 0,
			lastModified: {},
			etag: {},
			ajaxSettings: {
				url: En,
				type: "GET",
				isLocal: mn.test(Tn[1]),
				global: !0,
				processData: !0,
				async: !0,
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				accepts: {
					"*": xn,
					text: "text/plain",
					html: "text/html",
					xml: "application/xml, text/xml",
					json: "application/json, text/javascript"
				},
				contents: {
					xml: /xml/,
					html: /html/,
					json: /json/
				},
				responseFields: {
					xml: "responseXML",
					text: "responseText",
					json: "responseJSON"
				},
				converters: {
					"* text": String,
					"text html": !0,
					"text json": Z.parseJSON,
					"text xml": Z.parseXML
				},
				flatOptions: {
					url: !0,
					context: !0
				}
			},
			ajaxSetup: function(e, t) {
				return t ? $($(e, Z.ajaxSettings), t) : $(Z.ajaxSettings, e)
			},
			ajaxPrefilter: I(bn),
			ajaxTransport: I(wn),
			ajax: function(e, t) {
				function n(e, t, n, a) {
					var c, l, g, y, w, E = t;
					2 !== b && (b = 2, s && clearTimeout(s), r = void 0, o = a || "", x.readyState = e > 0 ? 4 : 0, c = e >= 200 && 300 > e || 304 === e, n && (y = F(f, x, n)), y = R(f, y, x, c), c ? (f.ifModified && (w = x.getResponseHeader("Last-Modified"), w && (Z.lastModified[i] = w), w = x.getResponseHeader("etag"), w && (Z.etag[i] = w)), 204 === e || "HEAD" === f.type ? E = "nocontent" : 304 === e ? E = "notmodified" : (E = y.state, l = y.data, g = y.error, c = !g)) : (g = E, (e || !E) && (E = "error", 0 > e && (e = 0))), x.status = e, x.statusText = (t || E) + "", c ? h.resolveWith(d, [l, E, x]) : h.rejectWith(d, [x, E, g]), x.statusCode(v), v = void 0, u && p.trigger(c ? "ajaxSuccess" : "ajaxError", [x, f, c ? l : g]), m.fireWith(d, [x, E]), u && (p.trigger("ajaxComplete", [x, f]), --Z.active || Z.event.trigger("ajaxStop")))
				}
				"object" == typeof e && (t = e, e = void 0), t = t || {};
				var r, i, o, a, s, c, u, l, f = Z.ajaxSetup({}, t),
					d = f.context || f,
					p = f.context && (d.nodeType || d.jquery) ? Z(d) : Z.event,
					h = Z.Deferred(),
					m = Z.Callbacks("once memory"),
					v = f.statusCode || {},
					g = {},
					y = {},
					b = 0,
					w = "canceled",
					x = {
						readyState: 0,
						getResponseHeader: function(e) {
							var t;
							if (2 === b) {
								if (!a)
									for (a = {}; t = hn.exec(o);) a[t[1].toLowerCase()] = t[2];
								t = a[e.toLowerCase()]
							}
							return null == t ? null : t
						},
						getAllResponseHeaders: function() {
							return 2 === b ? o : null
						},
						setRequestHeader: function(e, t) {
							var n = e.toLowerCase();
							return b || (e = y[n] = y[n] || e, g[e] = t), this
						},
						overrideMimeType: function(e) {
							return b || (f.mimeType = e), this
						},
						statusCode: function(e) {
							var t;
							if (e)
								if (2 > b)
									for (t in e) v[t] = [v[t], e[t]];
								else x.always(e[x.status]);
							return this
						},
						abort: function(e) {
							var t = e || w;
							return r && r.abort(t), n(0, t), this
						}
					};
				if (h.promise(x).complete = m.add, x.success = x.done, x.error = x.fail, f.url = ((e || f.url || En) + "").replace(dn, "").replace(gn, Tn[1] + "//"), f.type = t.method || t.type || f.method || f.type, f.dataTypes = Z.trim(f.dataType || "*").toLowerCase().match(pt) || [""], null == f.crossDomain && (c = yn.exec(f.url.toLowerCase()), f.crossDomain = !(!c || c[1] === Tn[1] && c[2] === Tn[2] && (c[3] || ("http:" === c[1] ? "80" : "443")) === (Tn[3] || ("http:" === Tn[1] ? "80" : "443")))), f.data && f.processData && "string" != typeof f.data && (f.data = Z.param(f.data, f.traditional)), M(bn, f, t, x), 2 === b) return x;
				u = Z.event && f.global, u && 0 === Z.active++ && Z.event.trigger("ajaxStart"), f.type = f.type.toUpperCase(), f.hasContent = !vn.test(f.type), i = f.url, f.hasContent || (f.data && (i = f.url += (fn.test(i) ? "&" : "?") + f.data, delete f.data), f.cache === !1 && (f.url = pn.test(i) ? i.replace(pn, "$1_=" + ln++) : i + (fn.test(i) ? "&" : "?") + "_=" + ln++)), f.ifModified && (Z.lastModified[i] && x.setRequestHeader("If-Modified-Since", Z.lastModified[i]), Z.etag[i] && x.setRequestHeader("If-None-Match", Z.etag[i])), (f.data && f.hasContent && f.contentType !== !1 || t.contentType) && x.setRequestHeader("Content-Type", f.contentType), x.setRequestHeader("Accept", f.dataTypes[0] && f.accepts[f.dataTypes[0]] ? f.accepts[f.dataTypes[0]] + ("*" !== f.dataTypes[0] ? ", " + xn + "; q=0.01" : "") : f.accepts["*"]);
				for (l in f.headers) x.setRequestHeader(l, f.headers[l]);
				if (f.beforeSend && (f.beforeSend.call(d, x, f) === !1 || 2 === b)) return x.abort();
				w = "abort";
				for (l in {
					success: 1,
					error: 1,
					complete: 1
				}) x[l](f[l]);
				if (r = M(wn, f, t, x)) {
					x.readyState = 1, u && p.trigger("ajaxSend", [x, f]), f.async && f.timeout > 0 && (s = setTimeout(function() {
						x.abort("timeout")
					}, f.timeout));
					try {
						b = 1, r.send(g, n)
					} catch (E) {
						if (!(2 > b)) throw E;
						n(-1, E)
					}
				} else n(-1, "No Transport");
				return x
			},
			getJSON: function(e, t, n) {
				return Z.get(e, t, n, "json")
			},
			getScript: function(e, t) {
				return Z.get(e, void 0, t, "script")
			}
		}), Z.each(["get", "post"], function(e, t) {
			Z[t] = function(e, n, r, i) {
				return Z.isFunction(n) && (i = i || r, r = n, n = void 0), Z.ajax({
					url: e,
					type: t,
					dataType: i,
					data: n,
					success: r
				})
			}
		}), Z._evalUrl = function(e) {
			return Z.ajax({
				url: e,
				type: "GET",
				dataType: "script",
				async: !1,
				global: !1,
				"throws": !0
			})
		}, Z.fn.extend({
			wrapAll: function(e) {
				var t;
				return Z.isFunction(e) ? this.each(function(t) {
					Z(this).wrapAll(e.call(this, t))
				}) : (this[0] && (t = Z(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
					for (var e = this; e.firstElementChild;) e = e.firstElementChild;
					return e
				}).append(this)), this)
			},
			wrapInner: function(e) {
				return this.each(Z.isFunction(e) ? function(t) {
					Z(this).wrapInner(e.call(this, t))
				} : function() {
					var t = Z(this),
						n = t.contents();
					n.length ? n.wrapAll(e) : t.append(e)
				})
			},
			wrap: function(e) {
				var t = Z.isFunction(e);
				return this.each(function(n) {
					Z(this).wrapAll(t ? e.call(this, n) : e)
				})
			},
			unwrap: function() {
				return this.parent().each(function() {
					Z.nodeName(this, "body") || Z(this).replaceWith(this.childNodes)
				}).end()
			}
		}), Z.expr.filters.hidden = function(e) {
			return e.offsetWidth <= 0 && e.offsetHeight <= 0
		}, Z.expr.filters.visible = function(e) {
			return !Z.expr.filters.hidden(e)
		};
		var _n = /%20/g,
			Cn = /\[\]$/,
			kn = /\r?\n/g,
			Sn = /^(?:submit|button|image|reset|file)$/i,
			An = /^(?:input|select|textarea|keygen)/i;
		Z.param = function(e, t) {
			var n, r = [],
				i = function(e, t) {
					t = Z.isFunction(t) ? t() : null == t ? "" : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
				};
			if (void 0 === t && (t = Z.ajaxSettings && Z.ajaxSettings.traditional), Z.isArray(e) || e.jquery && !Z.isPlainObject(e)) Z.each(e, function() {
				i(this.name, this.value)
			});
			else
				for (n in e) U(n, e[n], t, i);
			return r.join("&").replace(_n, "+")
		}, Z.fn.extend({
			serialize: function() {
				return Z.param(this.serializeArray())
			},
			serializeArray: function() {
				return this.map(function() {
					var e = Z.prop(this, "elements");
					return e ? Z.makeArray(e) : this
				}).filter(function() {
					var e = this.type;
					return this.name && !Z(this).is(":disabled") && An.test(this.nodeName) && !Sn.test(e) && (this.checked || !_t.test(e))
				}).map(function(e, t) {
					var n = Z(this).val();
					return null == n ? null : Z.isArray(n) ? Z.map(n, function(e) {
						return {
							name: t.name,
							value: e.replace(kn, "\r\n")
						}
					}) : {
						name: t.name,
						value: n.replace(kn, "\r\n")
					}
				}).get()
			}
		}), Z.ajaxSettings.xhr = function() {
			try {
				return new XMLHttpRequest
			} catch (e) {}
		};
		var Nn = 0,
			Dn = {},
			jn = {
				0: 200,
				1223: 204
			},
			Pn = Z.ajaxSettings.xhr();
		e.attachEvent && e.attachEvent("onunload", function() {
			for (var e in Dn) Dn[e]()
		}), J.cors = !!Pn && "withCredentials" in Pn, J.ajax = Pn = !!Pn, Z.ajaxTransport(function(e) {
			var t;
			return J.cors || Pn && !e.crossDomain ? {
				send: function(n, r) {
					var i, o = e.xhr(),
						a = ++Nn;
					if (o.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)
						for (i in e.xhrFields) o[i] = e.xhrFields[i];
					e.mimeType && o.overrideMimeType && o.overrideMimeType(e.mimeType), e.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest");
					for (i in n) o.setRequestHeader(i, n[i]);
					t = function(e) {
						return function() {
							t && (delete Dn[a], t = o.onload = o.onerror = null, "abort" === e ? o.abort() : "error" === e ? r(o.status, o.statusText) : r(jn[o.status] || o.status, o.statusText, "string" == typeof o.responseText ? {
								text: o.responseText
							} : void 0, o.getAllResponseHeaders()))
						}
					}, o.onload = t(), o.onerror = t("error"), t = Dn[a] = t("abort");
					try {
						o.send(e.hasContent && e.data || null)
					} catch (s) {
						if (t) throw s
					}
				},
				abort: function() {
					t && t()
				}
			} : void 0
		}), Z.ajaxSetup({
			accepts: {
				script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
			},
			contents: {
				script: /(?:java|ecma)script/
			},
			converters: {
				"text script": function(e) {
					return Z.globalEval(e), e
				}
			}
		}), Z.ajaxPrefilter("script", function(e) {
			void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
		}), Z.ajaxTransport("script", function(e) {
			if (e.crossDomain) {
				var t, n;
				return {
					send: function(r, i) {
						t = Z("<script>").prop({
							async: !0,
							charset: e.scriptCharset,
							src: e.url
						}).on("load error", n = function(e) {
							t.remove(), n = null, e && i("error" === e.type ? 404 : 200, e.type)
						}), K.head.appendChild(t[0])
					},
					abort: function() {
						n && n()
					}
				}
			}
		});
		var Ln = [],
			On = /(=)\?(?=&|$)|\?\?/;
		Z.ajaxSetup({
			jsonp: "callback",
			jsonpCallback: function() {
				var e = Ln.pop() || Z.expando + "_" + ln++;
				return this[e] = !0, e
			}
		}), Z.ajaxPrefilter("json jsonp", function(t, n, r) {
			var i, o, a, s = t.jsonp !== !1 && (On.test(t.url) ? "url" : "string" == typeof t.data && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && On.test(t.data) && "data");
			return s || "jsonp" === t.dataTypes[0] ? (i = t.jsonpCallback = Z.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(On, "$1" + i) : t.jsonp !== !1 && (t.url += (fn.test(t.url) ? "&" : "?") + t.jsonp + "=" + i), t.converters["script json"] = function() {
				return a || Z.error(i + " was not called"), a[0]
			}, t.dataTypes[0] = "json", o = e[i], e[i] = function() {
				a = arguments
			}, r.always(function() {
				e[i] = o, t[i] && (t.jsonpCallback = n.jsonpCallback, Ln.push(i)), a && Z.isFunction(o) && o(a[0]), a = o = void 0
			}), "script") : void 0
		}), Z.parseHTML = function(e, t, n) {
			if (!e || "string" != typeof e) return null;
			"boolean" == typeof t && (n = t, t = !1), t = t || K;
			var r = at.exec(e),
				i = !n && [];
			return r ? [t.createElement(r[1])] : (r = Z.buildFragment([e], t, i), i && i.length && Z(i).remove(), Z.merge([], r.childNodes))
		};
		var In = Z.fn.load;
		Z.fn.load = function(e, t, n) {
			if ("string" != typeof e && In) return In.apply(this, arguments);
			var r, i, o, a = this,
				s = e.indexOf(" ");
			return s >= 0 && (r = Z.trim(e.slice(s)), e = e.slice(0, s)), Z.isFunction(t) ? (n = t, t = void 0) : t && "object" == typeof t && (i = "POST"), a.length > 0 && Z.ajax({
				url: e,
				type: i,
				dataType: "html",
				data: t
			}).done(function(e) {
				o = arguments, a.html(r ? Z("<div>").append(Z.parseHTML(e)).find(r) : e)
			}).complete(n && function(e, t) {
				a.each(n, o || [e.responseText, t, e])
			}), this
		}, Z.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
			Z.fn[t] = function(e) {
				return this.on(t, e)
			}
		}), Z.expr.filters.animated = function(e) {
			return Z.grep(Z.timers, function(t) {
				return e === t.elem
			}).length
		};
		var Mn = e.document.documentElement;
		Z.offset = {
			setOffset: function(e, t, n) {
				var r, i, o, a, s, c, u, l = Z.css(e, "position"),
					f = Z(e),
					d = {};
				"static" === l && (e.style.position = "relative"), s = f.offset(), o = Z.css(e, "top"), c = Z.css(e, "left"), u = ("absolute" === l || "fixed" === l) && (o + c).indexOf("auto") > -1, u ? (r = f.position(), a = r.top, i = r.left) : (a = parseFloat(o) || 0, i = parseFloat(c) || 0), Z.isFunction(t) && (t = t.call(e, n, s)), null != t.top && (d.top = t.top - s.top + a), null != t.left && (d.left = t.left - s.left + i), "using" in t ? t.using.call(e, d) : f.css(d)
			}
		}, Z.fn.extend({
			offset: function(e) {
				if (arguments.length) return void 0 === e ? this : this.each(function(t) {
					Z.offset.setOffset(this, e, t)
				});
				var t, n, r = this[0],
					i = {
						top: 0,
						left: 0
					},
					o = r && r.ownerDocument;
				if (o) return t = o.documentElement, Z.contains(t, r) ? (typeof r.getBoundingClientRect !== Ct && (i = r.getBoundingClientRect()), n = H(o), {
					top: i.top + n.pageYOffset - t.clientTop,
					left: i.left + n.pageXOffset - t.clientLeft
				}) : i
			},
			position: function() {
				if (this[0]) {
					var e, t, n = this[0],
						r = {
							top: 0,
							left: 0
						};
					return "fixed" === Z.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), Z.nodeName(e[0], "html") || (r = e.offset()), r.top += Z.css(e[0], "borderTopWidth", !0), r.left += Z.css(e[0], "borderLeftWidth", !0)), {
						top: t.top - r.top - Z.css(n, "marginTop", !0),
						left: t.left - r.left - Z.css(n, "marginLeft", !0)
					}
				}
			},
			offsetParent: function() {
				return this.map(function() {
					for (var e = this.offsetParent || Mn; e && !Z.nodeName(e, "html") && "static" === Z.css(e, "position");) e = e.offsetParent;
					return e || Mn
				})
			}
		}), Z.each({
			scrollLeft: "pageXOffset",
			scrollTop: "pageYOffset"
		}, function(t, n) {
			var r = "pageYOffset" === n;
			Z.fn[t] = function(i) {
				return vt(this, function(t, i, o) {
					var a = H(t);
					return void 0 === o ? a ? a[n] : t[i] : void(a ? a.scrollTo(r ? e.pageXOffset : o, r ? o : e.pageYOffset) : t[i] = o)
				}, t, i, arguments.length, null)
			}
		}), Z.each(["top", "left"], function(e, t) {
			Z.cssHooks[t] = E(J.pixelPosition, function(e, n) {
				return n ? (n = x(e, t), Bt.test(n) ? Z(e).position()[t] + "px" : n) : void 0
			})
		}), Z.each({
			Height: "height",
			Width: "width"
		}, function(e, t) {
			Z.each({
				padding: "inner" + e,
				content: t,
				"": "outer" + e
			}, function(n, r) {
				Z.fn[r] = function(r, i) {
					var o = arguments.length && (n || "boolean" != typeof r),
						a = n || (r === !0 || i === !0 ? "margin" : "border");
					return vt(this, function(t, n, r) {
						var i;
						return Z.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (i = t.documentElement, Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])) : void 0 === r ? Z.css(t, n, a) : Z.style(t, n, r, a)
					}, t, o ? r : void 0, o, null)
				}
			})
		}), Z.fn.size = function() {
			return this.length
		}, Z.fn.andSelf = Z.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
			return Z
		});
		var $n = e.jQuery,
			Fn = e.$;
		return Z.noConflict = function(t) {
			return e.$ === Z && (e.$ = Fn), t && e.jQuery === Z && (e.jQuery = $n), Z
		}, typeof t === Ct && (e.jQuery = e.$ = Z), Z
	}),
	function(e) {
		"use strict";

		function t() {
			return this instanceof t ? (this.size = 0, this.uid = 0, this.selectors = [], this.indexes = Object.create(this.indexes), void(this.activeIndexes = [])) : new t
		}

		function n(e, t) {
			e = e.slice(0).concat(e["default"]);
			var n, r, i, o, a, s, c = e.length,
				u = t,
				l = [];
			do
				if (f.exec(""), (i = f.exec(u)) && (u = i[3], i[2] || !u))
					for (n = 0; c > n; n++)
						if (s = e[n], a = s.selector(i[1])) {
							for (r = l.length, o = !1; r--;)
								if (l[r].index === s && l[r].key === a) {
									o = !0;
									break
								}
							o || l.push({
								index: s,
								key: a
							});
							break
						}
			while (i);
			return l
		}

		function r(e, t) {
			var n, r, i;
			for (n = 0, r = e.length; r > n; n++)
				if (i = e[n], t.isPrototypeOf(i)) return i
		}

		function i(e, t) {
			return e.id - t.id
		}
		var o = e.document.documentElement,
			a = o.webkitMatchesSelector || o.mozMatchesSelector || o.oMatchesSelector || o.msMatchesSelector;
		t.prototype.matchesSelector = function(e, t) {
			return a.call(e, t)
		}, t.prototype.querySelectorAll = function(e, t) {
			return t.querySelectorAll(e)
		}, t.prototype.indexes = [];
		var s = /^#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;
		t.prototype.indexes.push({
			name: "ID",
			selector: function(e) {
				var t;
				return (t = e.match(s)) ? t[0].slice(1) : void 0
			},
			element: function(e) {
				return e.id ? [e.id] : void 0
			}
		});
		var c = /^\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;
		t.prototype.indexes.push({
			name: "CLASS",
			selector: function(e) {
				var t;
				return (t = e.match(c)) ? t[0].slice(1) : void 0
			},
			element: function(e) {
				var t = e.className;
				if (t) {
					if ("string" == typeof t) return t.split(/\s/);
					if ("object" == typeof t && "baseVal" in t) return t.baseVal.split(/\s/)
				}
			}
		});
		var u = /^((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;
		t.prototype.indexes.push({
			name: "TAG",
			selector: function(e) {
				var t;
				return (t = e.match(u)) ? t[0].toUpperCase() : void 0
			},
			element: function(e) {
				return [e.nodeName.toUpperCase()]
			}
		}), t.prototype.indexes["default"] = {
			name: "UNIVERSAL",
			selector: function() {
				return !0
			},
			element: function() {
				return [!0]
			}
		};
		var l;
		l = "function" == typeof e.Map ? e.Map : function() {
			function e() {
				this.map = {}
			}
			return e.prototype.get = function(e) {
				return this.map[e + " "]
			}, e.prototype.set = function(e, t) {
				this.map[e + " "] = t
			}, e
		}();
		var f = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g;
		t.prototype.logDefaultIndexUsed = function() {}, t.prototype.add = function(e, t) {
			var i, o, a, s, c, u, f, d, p = this.activeIndexes,
				h = this.selectors;
			if ("string" == typeof e) {
				for (i = {
					id: this.uid++,
					selector: e,
					data: t
				}, f = n(this.indexes, e), o = 0; o < f.length; o++) d = f[o], s = d.key, a = d.index, c = r(p, a), c || (c = Object.create(a), c.map = new l, p.push(c)), a === this.indexes["default"] && this.logDefaultIndexUsed(i), u = c.map.get(s), u || (u = [], c.map.set(s, u)), u.push(i);
				this.size++, h.push(e)
			}
		}, t.prototype.remove = function(e, t) {
			if ("string" == typeof e) {
				var r, i, o, a, s, c, u, l, f = this.activeIndexes,
					d = {},
					p = 1 === arguments.length;
				for (r = n(this.indexes, e), o = 0; o < r.length; o++)
					for (i = r[o], a = f.length; a--;)
						if (c = f[a], i.index.isPrototypeOf(c)) {
							if (u = c.map.get(i.key))
								for (s = u.length; s--;) l = u[s], l.selector !== e || !p && l.data !== t || (u.splice(s, 1), d[l.id] = !0);
							break
						}
				this.size -= Object.keys(d).length
			}
		}, t.prototype.queryAll = function(e) {
			if (!this.selectors.length) return [];
			var t, n, r, o, a, s, c, u, l = {},
				f = [],
				d = this.querySelectorAll(this.selectors.join(", "), e);
			for (t = 0, r = d.length; r > t; t++)
				for (a = d[t], s = this.matches(a), n = 0, o = s.length; o > n; n++) u = s[n], l[u.id] ? c = l[u.id] : (c = {
					id: u.id,
					selector: u.selector,
					data: u.data,
					elements: []
				}, l[u.id] = c, f.push(c)), c.elements.push(a);
			return f.sort(i)
		}, t.prototype.matches = function(e) {
			if (!e) return [];
			var t, n, r, o, a, s, c, u, l, f, d, p = this.activeIndexes,
				h = {},
				m = [];
			for (t = 0, o = p.length; o > t; t++)
				if (c = p[t], u = c.element(e))
					for (n = 0, a = u.length; a > n; n++)
						if (l = c.map.get(u[n]))
							for (r = 0, s = l.length; s > r; r++) f = l[r], d = f.id, !h[d] && this.matchesSelector(e, f.selector) && (h[d] = !0, m.push(f));
			return m.sort(i)
		}, e.SelectorSet = t
	}(window),
	function() {
		var e, t, n, r, i, o, a, s, c, u, l, f, d, p, h, m, v, g, y, b, w, x, E, T, _;
		p = function() {
			var e, t, n;
			return e = document.createElement("div"), t = document.createElement("div"), n = document.createElement("div"), e.appendChild(t), t.appendChild(n), e.innerHTML = "", n.parentNode !== t
		}(), _ = 0, s = [], E = new SelectorSet, E.querySelectorAll = $.find, E.matchesSelector = $.find.matchesSelector, f = new WeakMap, n = new WeakMap, d = new WeakMap, b = function(e, t) {
			var n, r;
			(n = f.get(e)) || (n = [], f.set(e, n)), -1 === n.indexOf(t.id) && (null != t.initialize && (r = t.initialize.call(e, e)), d.set(e, r), n.push(t.id))
		}, y = function(e, t) {
			var r, i, o, a;
			(r = n.get(e)) || (r = [], n.set(e, r)), -1 === r.indexOf(t.id) && (t.elements.push(e), (i = d.get(e)) && ("length" in i || null != (o = i.add) && o.call(e, e)), null != (a = t.add) && a.call(e, e), r.push(t.id))
		}, w = function(e, t) {
			var r, i, o, a, c, u, l, f, p, h, m;
			if (r = n.get(e))
				if (t) a = t.elements.indexOf(e), -1 !== a && t.elements.splice(a, 1), a = r.indexOf(t.id), -1 !== a && ((c = d.get(e)) && ("length" in c || null != (l = c.remove) && l.call(e, e)), null != (f = t.remove) && f.call(e, e), r.splice(a, 1)), 0 === r.length && n["delete"](e);
				else {
					for (p = r.slice(0), i = 0, u = p.length; u > i; i++) o = p[i], t = s[o], t && (a = t.elements.indexOf(e), -1 !== a && t.elements.splice(a, 1), (c = d.get(e)) && null != (h = c.remove) && h.call(e, e), null != (m = t.remove) && m.call(e, e));
					n["delete"](e)
				}
		}, r = function(e, t) {
			var n, r, i, o, a, s, c, u, l, f, d, p, h, m, v;
			for (a = 0, l = t.length; l > a; a++)
				if (i = t[a], i.nodeType === Node.ELEMENT_NODE) {
					for (h = E.matches(i), s = 0, f = h.length; f > s; s++) n = h[s].data, e.push(["add", i, n]);
					for (m = E.queryAll(i), c = 0, d = m.length; d > c; c++)
						for (v = m[c], n = v.data, o = v.elements, u = 0, p = o.length; p > u; u++) r = o[u], e.push(["add", r, n])
				}
		}, h = function(e, t) {
			var n, r, i, o, a, s, c;
			for (i = 0, a = t.length; a > i; i++)
				if (r = t[i], r.nodeType === Node.ELEMENT_NODE)
					for (e.push(["remove", r]), c = r.getElementsByTagName("*"), o = 0, s = c.length; s > o; o++) n = c[o], e.push(["remove", n])
		}, g = function(e) {
			var t, n, r, i, o, a, c;
			for (n = 0, i = s.length; i > n; n++)
				if (a = s[n])
					for (c = a.elements, r = 0, o = c.length; o > r; r++) t = c[r], t.parentNode || e.push(["remove", t])
		}, v = function(e, t) {
			var r, i, o, a, c, u, l, f, d;
			if (t.nodeType === Node.ELEMENT_NODE) {
				for (d = E.matches(t), i = 0, u = d.length; u > i; i++) r = d[i].data, e.push(["add", t, r]);
				if (a = n.get(t))
					for (c = 0, l = a.length; l > c; c++) o = a[c], (f = s[o]) && (E.matchesSelector(t, f.selector) || e.push(["remove", t, f]))
			}
		}, m = function(e, t) {
			var n, r, i, o;
			if (t.nodeType === Node.ELEMENT_NODE)
				for (v(e, t), o = t.getElementsByTagName("*"), r = 0, i = o.length; i > r; r++) n = o[r], v(e, n)
		}, i = function(e) {
			var t, n, r, i, o, a;
			for (n = 0, r = e.length; r > n; n++) o = e[n], a = o[0], t = o[1], i = o[2], "add" === a ? (b(t, i), y(t, i)) : "remove" === a && w(t, i)
		}, T = function(e) {
			var t, n, r, i;
			for (i = e.elements, n = 0, r = i.length; r > n; n++) t = i[n], w(t, e);
			E.remove(e.selector, e), delete s[e.id], $.observe.count--
		}, $.observe = function(e, t) {
			var n;
			return null != t.call && (t = {
				initialize: t
			}), n = {
				id: _++,
				selector: e,
				initialize: t.initialize || t.init,
				add: t.add,
				remove: t.remove,
				elements: [],
				stop: function() {
					return T(n)
				}
			}, E.add(e, n), s[n.id] = n, x(), $.observe.count++, n
		}, t = !1, x = function() {
			return t ? void 0 : (setImmediate(e), t = !0)
		}, e = function() {
			var e;
			return e = [], r(e, [document.documentElement]), i(e), t = !1
		}, $.observe.count = 0, $(document).on("observe:dirty", function(e) {
			var t;
			t = [], m(t, e.target), i(t)
		}), o = [], c = function() {
			var e, t, n, r, a, s, c, u, l;
			for (e = [], l = o, o = [], r = 0, s = l.length; s > r; r++)
				for (u = l[r], n = u.form ? u.form.elements : u.ownerDocument.getElementsByTagName("input"), a = 0, c = n.length; c > a; a++) t = n[a], v(e, t);
			i(e)
		}, u = function(e) {
			o.push(e.target), setImmediate(c)
		}, document.addEventListener("change", u, !1), $(document).on("change", u), l = function(e) {
			var t, n, o, a;
			for (t = [], n = 0, o = e.length; o > n; n++) a = e[n], "childList" === a.type ? (r(t, a.addedNodes), h(t, a.removedNodes)) : "attributes" === a.type && v(t, a.target);
			p && g(t), i(t)
		}, a = new MutationObserver(l), $(function() {
			var e;
			return a.observe(document, {
				childList: !0,
				attributes: !0,
				subtree: !0
			}), e = [], r(e, [document.documentElement]), i(e)
		}, !1)
	}.call(this),
	function() {
		var e, t, n, r, i, o, a, s, c;
		s = $.fn.clone, $.fn.clone = function() {
			var e, t, n, r, i;
			for (i = s.apply(this, arguments), r = i.find("[placeholder]"), t = 0, n = r.length; n > t; t++) e = r[t], e.value === e.getAttribute("placeholder") && (e.value = "");
			return i
		}, c = [], GitHub.support.placeholder_input || c.push("input[placeholder]"), GitHub.support.placeholder_textarea || c.push("textarea[placeholder]"), c = c.join(", "), c && (e = function() {
			try {
				return document.activeElement
			} catch (e) {}
		}, t = function(e) {
			return e.getAttribute("placeholder")
		}, a = function() {
			return this !== e() ? r.call(this) : void 0
		}, i = function() {
			return this.classList.contains("placeholder") ? (this.value === t(this) && (this.value = ""), this.classList.remove("placeholder")) : void 0
		}, r = function() {
			return this.value ? void 0 : (this.value = t(this), this.classList.add("placeholder"))
		}, o = function() {
			var e;
			return e = $(this), setTimeout(function() {
				return e.find(c).each(a)
			}, 10)
		}, n = function(e) {
			var t;
			return a.call(e), t = $(e.form), $(e).on("focus", i).on("blur", r), t.data("placeholder-handlers") ? void 0 : t.data("placeholder-handlers", !0).on("reset", o).on("submit", function() {
				t.find(c).each(i), o.call(this)
			})
		}, $.observe(c, function() {
			n(this)
		}), $(window).on("beforeunload", function() {
			$(c).each(i)
		}))
	}.call(this), // Copyright 2013 Nic Jansma
	function(e) {
		"use strict";
		"undefined" == typeof e && (e = {}), "undefined" == typeof e.performance && (e.performance = {}), e._perfRefForUserTimingPolyfill = e.performance, e.performance.userTimingJsNow = !1, e.performance.userTimingJsNowPrefixed = !1, e.performance.userTimingJsUserTiming = !1, e.performance.userTimingJsUserTimingPrefixed = !1, e.performance.userTimingJsPerformanceTimeline = !1, e.performance.userTimingJsPerformanceTimelinePrefixed = !1;
		var t, n, r = [],
			i = [],
			o = null;
		if ("function" != typeof e.performance.now) {
			for (e.performance.userTimingJsNow = !0, i = ["webkitNow", "msNow", "mozNow"], t = 0; t < i.length; t++)
				if ("function" == typeof e.performance[i[t]]) {
					e.performance.now = e.performance[i[t]], e.performance.userTimingJsNowPrefixed = !0;
					break
				}
			var a = +new Date;
			e.performance.timing && e.performance.timing.navigationStart && (a = e.performance.timing.navigationStart), "function" != typeof e.performance.now && (e.performance.now = Date.now ? function() {
				return Date.now() - a
			} : function() {
				return +new Date - a
			})
		}
		var s = function() {},
			c = function() {},
			u = [],
			l = !1,
			f = !1;
		if ("function" != typeof e.performance.getEntries || "function" != typeof e.performance.mark) {
			for ("function" == typeof e.performance.getEntries && "function" != typeof e.performance.mark && (f = !0), e.performance.userTimingJsPerformanceTimeline = !0, r = ["webkit", "moz"], i = ["getEntries", "getEntriesByName", "getEntriesByType"], t = 0; t < i.length; t++)
				for (n = 0; n < r.length; n++) o = r[n] + i[t].substr(0, 1).toUpperCase() + i[t].substr(1), "function" == typeof e.performance[o] && (e.performance[i[t]] = e.performance[o], e.performance.userTimingJsPerformanceTimelinePrefixed = !0);
			s = function(e) {
				u.push(e), "measure" === e.entryType && (l = !0)
			};
			var d = function() {
				l && (u.sort(function(e, t) {
					return e.startTime - t.startTime
				}), l = !1)
			};
			if (c = function(e, n) {
				for (t = 0; t < u.length;) u[t].entryType === e && ("undefined" == typeof n || u[t].name === n) ? u.splice(t, 1) : t++
			}, "function" != typeof e.performance.getEntries || f) {
				var p = e.performance.getEntries;
				e.performance.getEntries = function() {
					d();
					var t = u.slice(0);
					return f && p && (Array.prototype.push.apply(t, p.call(e.performance)), t.sort(function(e, t) {
						return e.startTime - t.startTime
					})), t
				}
			}
			if ("function" != typeof e.performance.getEntriesByType || f) {
				var h = e.performance.getEntriesByType;
				e.performance.getEntriesByType = function(n) {
					if ("undefined" == typeof n || "mark" !== n && "measure" !== n) return f && h ? h.call(e.performance, n) : [];
					"measure" === n && d();
					var r = [];
					for (t = 0; t < u.length; t++) u[t].entryType === n && r.push(u[t]);
					return r
				}
			}
			if ("function" != typeof e.performance.getEntriesByName || f) {
				var m = e.performance.getEntriesByName;
				e.performance.getEntriesByName = function(n, r) {
					if (r && "mark" !== r && "measure" !== r) return f && m ? m.call(e.performance, n, r) : [];
					"undefined" != typeof r && "measure" === r && d();
					var i = [];
					for (t = 0; t < u.length; t++)("undefined" == typeof r || u[t].entryType === r) && u[t].name === n && i.push(u[t]);
					return f && m && (Array.prototype.push.apply(i, m.call(e.performance, n, r)), i.sort(function(e, t) {
						return e.startTime - t.startTime
					})), i
				}
			}
		}
		if ("function" != typeof e.performance.mark) {
			for (e.performance.userTimingJsUserTiming = !0, r = ["webkit", "moz", "ms"], i = ["mark", "measure", "clearMarks", "clearMeasures"], t = 0; t < i.length; t++)
				for (n = 0; n < r.length; n++) o = r[n] + i[t].substr(0, 1).toUpperCase() + i[t].substr(1), "function" == typeof e.performance[o] && (e.performance[i[t]] = e.performance[o], e.performance.userTimingJsUserTimingPrefixed = !0);
			var v = {};
			"function" != typeof e.performance.mark && (e.performance.mark = function(t) {
				var n = e.performance.now();
				if ("undefined" == typeof t) throw new SyntaxError("Mark name must be specified");
				if (e.performance.timing && t in e.performance.timing) throw new SyntaxError("Mark name is not allowed");
				v[t] || (v[t] = []), v[t].push(n), s({
					entryType: "mark",
					name: t,
					startTime: n,
					duration: 0
				})
			}), "function" != typeof e.performance.clearMarks && (e.performance.clearMarks = function(e) {
				e ? v[e] = [] : v = {}, c("mark", e)
			}), "function" != typeof e.performance.measure && (e.performance.measure = function(t, n, r) {
				var i = e.performance.now();
				if (!t) throw new Error("Measure must be specified");
				if (!n) return void s({
					entryType: "measure",
					name: t,
					startTime: 0,
					duration: i
				});
				var o = 0;
				if (e.performance.timing && n in e.performance.timing) {
					if ("navigationStart" !== n && 0 === e.performance.timing[n]) throw new Error(n + " has a timing of 0");
					o = e.performance.timing[n] - e.performance.timing.navigationStart
				} else {
					if (!(n in v)) throw new Error(n + " mark not found");
					o = v[n][v[n].length - 1]
				}
				var a = i;
				if (r)
					if (a = 0, e.performance.timing && r in e.performance.timing) {
						if ("navigationStart" !== r && 0 === e.performance.timing[r]) throw new Error(r + " has a timing of 0");
						a = e.performance.timing[r] - e.performance.timing.navigationStart
					} else {
						if (!(r in v)) throw new Error(r + " mark not found");
						a = v[r][v[r].length - 1]
					}
				var c = a - o;
				s({
					entryType: "measure",
					name: t,
					startTime: o,
					duration: c
				})
			}), "function" != typeof e.performance.clearMeasures && (e.performance.clearMeasures = function(e) {
				c("measure", e)
			})
		}
		"undefined" != typeof define && define.amd ? define([], function() {
			return e.performance
		}) : "undefined" != typeof module && "undefined" != typeof module.exports && (module.exports = e.performance)
	}("undefined" != typeof window ? window : void 0),
	function(e, t) {
		function n(e) {
			var t = [],
				n = e.target,
				r = e.handleObj.selectorSet;
			do {
				if (1 !== n.nodeType) break;
				var i = r.matches(n);
				i.length && t.push({
					elem: n,
					handlers: i
				})
			} while (n = n.parentElement);
			return t
		}

		function r(e) {
			for (var t, r = n(e), i = 0;
				(t = r[i++]) && !e.isPropagationStopped();) {
				e.currentTarget = t.elem;
				for (var o, a = 0;
					(o = t.handlers[a++]) && !e.isImmediatePropagationStopped();) {
					var s = o.data.apply(t.elem, arguments);
					void 0 !== s && (e.result = s, s === !1 && (e.preventDefault(), e.stopPropagation()))
				}
			}
		}
		var i = e.document,
			o = e.SelectorSet,
			a = t.event.add,
			s = t.event.remove,
			c = {};
		if (!o) throw "SelectorSet undefined - https://github.com/josh/jquery-selector-set";
		t.event.add = function(e, n, s, u, l) {
			if (e !== i || n.match(/\./) || u || !l) a.call(this, e, n, s, u, l);
			else
				for (var f = n.match(/\S+/g), d = f.length; d--;) {
					var p = f[d],
						h = t.event.special[p] || {};
					p = h.delegateType || p;
					var m = c[p];
					m || (m = c[p] = {
						handler: r,
						selectorSet: new o
					}, m.selectorSet.matchesSelector = t.find.matchesSelector, a.call(this, e, p, m)), m.selectorSet.add(l, s), t.expr.cacheLength++, t.find.compile && t.find.compile(l)
				}
		}, t.event.remove = function(e, n, r, o, a) {
			if (e === i && n && !n.match(/\./) && o)
				for (var u = n.match(/\S+/g), l = u.length; l--;) {
					var f = u[l],
						d = t.event.special[f] || {};
					f = d.delegateType || f;
					var p = c[f];
					p && p.selectorSet.remove(o, r)
				}
			s.call(this, e, n, r, o, a)
		}
	}(window, jQuery),
	function() {
		var e;
		$(document.documentElement).hasClass("is-preview-features") && (e = /id|data-(ga|hotkey|remote)/, SelectorSet.prototype.logDefaultIndexUsed = function(t) {
			return t.selector.match(e) ? void 0 : console.warn(t.selector, "could not be indexed")
		})
	}.call(this),
	function() {
		var e, t;
		$.fn.inspect = function() {
			var t;
			if (t = this[0]) return e(t)
		}, e = function(e) {
			var n;
			for (n = []; null != e && (n.push(t(e)), e !== document.body && !e.id);) e = e.parentNode;
			return n.reverse().join(" > ")
		}, t = function(e) {
			var t, n, r, i;
			return e === window ? "window" : (n = [e.nodeName.toLowerCase()], (null != (r = e.id) ? r.length : void 0) && n.push("#" + e.id), t = "function" == typeof e.getAttribute && null != (i = e.getAttribute("class")) ? i.trim().split(/\s+/).join(".") : void 0, (null != t ? t.length : void 0) && n.push("." + t), n.join(""))
		}
	}.call(this),
	/*!
	 * Copyright 2012, Chris Wanstrath
	 * Released under the MIT License
	 * https://github.com/defunkt/jquery-pjax
	 */
	function(e) {
		function t(t, r, i) {
			var o = this;
			return this.on("click.pjax", t, function(t) {
				var a = e.extend({}, m(r, i));
				a.container || (a.container = e(this).attr("data-pjax") || o), n(t, a)
			})
		}

		function n(t, n, r) {
			r = m(n, r);
			var o = t.currentTarget;
			if ("A" !== o.tagName.toUpperCase()) throw "$.fn.pjax or $.pjax.click requires an anchor element";
			if (!(t.which > 1 || t.metaKey || t.ctrlKey || t.shiftKey || t.altKey || location.protocol !== o.protocol || location.hostname !== o.hostname || o.href.indexOf("#") > -1 && h(o) == h(location) || t.isDefaultPrevented())) {
				var a = {
						url: o.href,
						container: e(o).attr("data-pjax"),
						target: o
					},
					s = e.extend({}, a, r),
					c = e.Event("pjax:click");
				e(o).trigger(c, [s]), c.isDefaultPrevented() || (i(s), t.preventDefault(), e(o).trigger("pjax:clicked", [s]))
			}
		}

		function r(t, n, r) {
			r = m(n, r);
			var o = t.currentTarget;
			if ("FORM" !== o.tagName.toUpperCase()) throw "$.pjax.submit requires a form element";
			var a = {
				type: o.method.toUpperCase(),
				url: o.action,
				container: e(o).attr("data-pjax"),
				target: o
			};
			if ("GET" !== a.type && void 0 !== window.FormData) a.data = new FormData(o), a.processData = !1, a.contentType = !1;
			else {
				if (e(o).find(":file").length) return;
				a.data = e(o).serializeArray()
			}
			i(e.extend({}, a, r)), t.preventDefault()
		}

		function i(t) {
			function n(t, n, i) {
				i || (i = {}), i.relatedTarget = r;
				var o = e.Event(t, i);
				return s.trigger(o, n), !o.isDefaultPrevented()
			}
			t = e.extend(!0, {}, e.ajaxSettings, i.defaults, t), e.isFunction(t.url) && (t.url = t.url());
			var r = t.target,
				o = p(t.url).hash,
				s = t.context = v(t.container);
			t.data || (t.data = {}), e.isArray(t.data) ? t.data.push({
				name: "_pjax",
				value: s.selector
			}) : t.data._pjax = s.selector;
			var c;
			t.beforeSend = function(e, r) {
				if ("GET" !== r.type && (r.timeout = 0), e.setRequestHeader("X-PJAX", "true"), e.setRequestHeader("X-PJAX-Container", s.selector), !n("pjax:beforeSend", [e, r])) return !1;
				r.timeout > 0 && (c = setTimeout(function() {
					n("pjax:timeout", [e, t]) && e.abort("timeout")
				}, r.timeout), r.timeout = 0);
				var i = p(r.url);
				o && (i.hash = o), t.requestUrl = d(i)
			}, t.complete = function(e, r) {
				c && clearTimeout(c), n("pjax:complete", [e, r, t]), n("pjax:end", [e, t])
			}, t.error = function(e, r, i) {
				var o = b("", e, t),
					s = n("pjax:error", [e, r, i, t]);
				"GET" == t.type && "abort" !== r && s && a(o.url)
			}, t.success = function(r, c, u) {
				var f = i.state,
					d = "function" == typeof e.pjax.defaults.version ? e.pjax.defaults.version() : e.pjax.defaults.version,
					h = u.getResponseHeader("X-PJAX-Version"),
					m = b(r, u, t),
					v = p(m.url);
				if (o && (v.hash = o, m.url = v.href), d && h && d !== h) return void a(m.url);
				if (!m.contents) return void a(m.url);
				i.state = {
					id: t.id || l(),
					url: m.url,
					title: m.title,
					container: s.selector,
					fragment: t.fragment,
					timeout: t.timeout
				}, (t.push || t.replace) && window.history.replaceState(i.state, m.title, m.url);
				try {
					document.activeElement.blur()
				} catch (g) {}
				m.title && (document.title = m.title), n("pjax:beforeReplace", [m.contents, t], {
					state: i.state,
					previousState: f
				}), s.html(m.contents);
				var y = s.find("input[autofocus], textarea[autofocus]").last()[0];
				y && document.activeElement !== y && y.focus(), w(m.scripts);
				var x = t.scrollTo;
				if (o) {
					var E = decodeURIComponent(o.slice(1)),
						T = document.getElementById(E) || document.getElementsByName(E)[0];
					T && (x = e(T).offset().top)
				}
				"number" == typeof x && e(window).scrollTop(x), n("pjax:success", [r, c, u, t])
			}, i.state || (i.state = {
				id: l(),
				url: window.location.href,
				title: document.title,
				container: s.selector,
				fragment: t.fragment,
				timeout: t.timeout
			}, window.history.replaceState(i.state, document.title)), u(i.xhr), i.options = t;
			var h = i.xhr = e.ajax(t);
			return h.readyState > 0 && (t.push && !t.replace && (x(i.state.id, f(s)), window.history.pushState(null, "", t.requestUrl)), n("pjax:start", [h, t]), n("pjax:send", [h, t])), i.xhr
		}

		function o(t, n) {
			var r = {
				url: window.location.href,
				push: !1,
				replace: !0,
				scrollTo: !1
			};
			return i(e.extend(r, m(t, n)))
		}

		function a(e) {
			window.history.replaceState(null, "", i.state.url), window.location.replace(e)
		}

		function s(t) {
			S || u(i.xhr);
			var n, r = i.state,
				o = t.state;
			if (o && o.container) {
				if (S && A == o.url) return;
				if (r) {
					if (r.id === o.id) return;
					n = r.id < o.id ? "forward" : "back"
				}
				var s = D[o.id] || [],
					c = e(s[0] || o.container),
					l = s[1];
				if (c.length) {
					r && E(n, r.id, f(c));
					var d = e.Event("pjax:popstate", {
						state: o,
						direction: n
					});
					c.trigger(d);
					var p = {
						id: o.id,
						url: o.url,
						container: c,
						push: !1,
						fragment: o.fragment,
						timeout: o.timeout,
						scrollTo: !1
					};
					if (l) {
						c.trigger("pjax:start", [null, p]), i.state = o, o.title && (document.title = o.title);
						var h = e.Event("pjax:beforeReplace", {
							state: o,
							previousState: r
						});
						c.trigger(h, [l, p]), c.html(l), c.trigger("pjax:end", [null, p])
					} else i(p);
					c[0].offsetHeight
				} else a(location.href)
			}
			S = !1
		}

		function c(t) {
			var n = e.isFunction(t.url) ? t.url() : t.url,
				r = t.type ? t.type.toUpperCase() : "GET",
				i = e("<form>", {
					method: "GET" === r ? "GET" : "POST",
					action: n,
					style: "display:none"
				});
			"GET" !== r && "POST" !== r && i.append(e("<input>", {
				type: "hidden",
				name: "_method",
				value: r.toLowerCase()
			}));
			var o = t.data;
			if ("string" == typeof o) e.each(o.split("&"), function(t, n) {
				var r = n.split("=");
				i.append(e("<input>", {
					type: "hidden",
					name: r[0],
					value: r[1]
				}))
			});
			else if (e.isArray(o)) e.each(o, function(t, n) {
				i.append(e("<input>", {
					type: "hidden",
					name: n.name,
					value: n.value
				}))
			});
			else if ("object" == typeof o) {
				var a;
				for (a in o) i.append(e("<input>", {
					type: "hidden",
					name: a,
					value: o[a]
				}))
			}
			e(document.body).append(i), i.submit()
		}

		function u(t) {
			t && t.readyState < 4 && (t.onreadystatechange = e.noop, t.abort())
		}

		function l() {
			return (new Date).getTime()
		}

		function f(e) {
			var t = e.clone();
			return t.find("script").each(function() {
				this.src || jQuery._data(this, "globalEval", !1)
			}), [e.selector, t.contents()]
		}

		function d(e) {
			return e.search = e.search.replace(/([?&])(_pjax|_)=[^&]*/g, ""), e.href.replace(/\?($|#)/, "$1")
		}

		function p(e) {
			var t = document.createElement("a");
			return t.href = e, t
		}

		function h(e) {
			return e.href.replace(/#.*/, "")
		}

		function m(t, n) {
			return t && n ? n.container = t : n = e.isPlainObject(t) ? t : {
				container: t
			}, n.container && (n.container = v(n.container)), n
		}

		function v(t) {
			if (t = e(t), t.length) {
				if ("" !== t.selector && t.context === document) return t;
				if (t.attr("id")) return e("#" + t.attr("id"));
				throw "cant get selector for pjax container!"
			}
			throw "no pjax container for " + t.selector
		}

		function g(e, t) {
			return e.filter(t).add(e.find(t))
		}

		function y(t) {
			return e.parseHTML(t, document, !0)
		}

		function b(t, n, r) {
			var i = {},
				o = /<html/i.test(t),
				a = n.getResponseHeader("X-PJAX-URL");
			if (i.url = a ? d(p(a)) : r.requestUrl, o) var s = e(y(t.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0])),
				c = e(y(t.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0]));
			else var s = c = e(y(t)); if (0 === c.length) return i;
			if (i.title = g(s, "title").last().text(), r.fragment) {
				if ("body" === r.fragment) var u = c;
				else var u = g(c, r.fragment).first();
				u.length && (i.contents = "body" === r.fragment ? u : u.contents(), i.title || (i.title = u.attr("title") || u.data("title")))
			} else o || (i.contents = c);
			return i.contents && (i.contents = i.contents.not(function() {
				return e(this).is("title")
			}), i.contents.find("title").remove(), i.scripts = g(i.contents, "script[src]").remove(), i.contents = i.contents.not(i.scripts)), i.title && (i.title = e.trim(i.title)), i
		}

		function w(t) {
			if (t) {
				var n = e("script[src]");
				t.each(function() {
					var t = this.src,
						r = n.filter(function() {
							return this.src === t
						});
					if (!r.length) {
						var i = document.createElement("script"),
							o = e(this).attr("type");
						o && (i.type = o), i.src = e(this).attr("src"), document.head.appendChild(i)
					}
				})
			}
		}

		function x(e, t) {
			D[e] = t, P.push(e), T(j, 0), T(P, i.defaults.maxCacheLength)
		}

		function E(e, t, n) {
			var r, o;
			D[t] = n, "forward" === e ? (r = P, o = j) : (r = j, o = P), r.push(t), (t = o.pop()) && delete D[t], T(r, i.defaults.maxCacheLength)
		}

		function T(e, t) {
			for (; e.length > t;) delete D[e.shift()]
		}

		function _() {
			return e("meta").filter(function() {
				var t = e(this).attr("http-equiv");
				return t && "X-PJAX-VERSION" === t.toUpperCase()
			}).attr("content")
		}

		function C() {
			e.fn.pjax = t, e.pjax = i, e.pjax.enable = e.noop, e.pjax.disable = k, e.pjax.click = n, e.pjax.submit = r, e.pjax.reload = o, e.pjax.defaults = {
				timeout: 650,
				push: !0,
				replace: !1,
				type: "GET",
				dataType: "html",
				scrollTo: 0,
				maxCacheLength: 20,
				version: _
			}, e(window).on("popstate.pjax", s)
		}

		function k() {
			e.fn.pjax = function() {
				return this
			}, e.pjax = c, e.pjax.enable = C, e.pjax.disable = e.noop, e.pjax.click = e.noop, e.pjax.submit = e.noop, e.pjax.reload = function() {
				window.location.reload()
			}, e(window).off("popstate.pjax", s)
		}
		var S = !0,
			A = window.location.href,
			N = window.history.state;
		N && N.container && (i.state = N), "state" in window.history && (S = !1);
		var D = {},
			j = [],
			P = [];
		e.inArray("state", e.event.props) < 0 && e.event.props.push("state"), e.support.pjax = window.history && window.history.pushState && window.history.replaceState && !navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]\D|WebApps\/.+CFNetwork)/), e.support.pjax ? C() : k()
	}(jQuery),
	function() {
		("undefined" == typeof Zepto || null === Zepto) && $.ajaxSetup({
			beforeSend: function(e, t) {
				var n, r;
				if (t.global) return n = t.context || document, r = $.Event("ajaxBeforeSend"), $(n).trigger(r, [e, t]), r.isDefaultPrevented() ? !1 : r.result
			}
		})
	}.call(this),
	function() {
		var e, t, n, r, i;
		"undefined" != typeof Zepto && null !== Zepto ? (e = function(e) {
			var t, n, r, i;
			n = document.createEvent("Events");
			for (r in e) i = e[r], n[r] = i;
			return n.initEvent(e.type + ":prepare", !0, !0), t = function(t, r) {
				return function() {
					return t.apply(e), r.apply(n)
				}
			}, n.preventDefault = t(e.preventDefault, n.preventDefault), n.stopPropagation = t(e.stopPropagation, n.stopPropagation), n.stopImmediatePropagation = t(e.stopImmediatePropagation, n.stopImmediatePropagation), e.target.dispatchEvent(n), n.result
		}, window.addEventListener("click", e, !0), window.addEventListener("submit", e, !0)) : (t = null, n = function(e) {
			var n, r;
			r = e.type + ":" + e.timeStamp, r !== t && (n = e.type, e.type = n + ":prepare", $.event.trigger(e, [], e.target, !1), e.type = n, t = r)
		}, r = function(e) {
			return function() {
				$(this).on(e + ".prepare", function() {})
			}
		}, i = function(e) {
			return function() {
				$(this).off(e + ".prepare", function() {})
			}
		}, $.event.special.click = {
			preDispatch: n
		}, $.event.special.submit = {
			preDispatch: n
		}, $.event.special["click:prepare"] = {
			setup: r("click"),
			teardown: i("click")
		}, $.event.special["submit:prepare"] = {
			setup: r("submit"),
			teardown: i("submit")
		})
	}.call(this),
	function() {
		$(document).on("ajaxBeforeSend", function(e, t, n) {
			return n.dataType ? void 0 : t.setRequestHeader("Accept", "*/*;q=0.5, " + n.accepts.script)
		})
	}.call(this),
	function() {
		$(document).on("click:prepare", "a[data-confirm], input[type=submit][data-confirm], button[data-confirm]", function(e) {
			var t;
			(t = $(this).attr("data-confirm")) && (confirm(t) || (e.stopImmediatePropagation(), e.preventDefault()))
		})
	}.call(this),
	function() {
		var e, t;
		$(document).on("ajaxBeforeSend", function(e, t, n) {
			var r;
			if (!n.crossDomain && "GET" !== n.type) return (r = $('meta[name="csrf-token"]').attr("content")) ? t.setRequestHeader("X-CSRF-Token", r) : void 0
		}), $(document).on("submit:prepare", "form", function() {
			var t, n, r, i, o;
			n = $(this), n.is("form[data-remote]") || this.method && "GET" !== this.method.toUpperCase() && e(n.attr("action")) && (i = $('meta[name="csrf-param"]').attr("content"), o = $('meta[name="csrf-token"]').attr("content"), null != i && null != o && (n.find("input[name=" + i + "]")[0] || (r = document.createElement("input"), r.setAttribute("type", "hidden"), r.setAttribute("name", i), r.setAttribute("value", o), n.prepend(r), t = new Error("csrf token inserted"), t.failbotContext = {
				form: $(this).inspect(),
				method: this.method,
				action: this.action
			}, setImmediate(function() {
				throw t
			}))))
		}), t = document.createElement("a"), t.href = location.href, e = function(e) {
			var n;
			return n = document.createElement("a"), n.href = e, n.href = n.href, n.protocol && n.host && t.protocol + "//" + t.host == n.protocol + "//" + n.host
		}
	}.call(this),
	function() {
		$(document).on("submit:prepare", "form", function() {
			var e, t, n, r, i, o, a, s, c;
			for (a = $(this).find("input[type=submit][data-disable-with]"), t = 0, i = a.length; i > t; t++) n = a[t], n = $(n), n.attr("data-enable-with", n.val() || "Submit"), (c = n.attr("data-disable-with")) && n.val(c), n[0].disabled = !0;
			for (s = $(this).find("button[type=submit][data-disable-with]"), r = 0, o = s.length; o > r; r++) e = s[r], e = $(e), e.attr("data-enable-with", e.html() || ""), (c = e.attr("data-disable-with")) && e.html(c), e[0].disabled = !0
		}), $(document).on("ajaxComplete", "form", function() {
			var e, t, n, r, i, o, a, s;
			for (a = $(this).find("input[type=submit][data-enable-with]"), t = 0, i = a.length; i > t; t++) n = a[t], $(n).val($(n).attr("data-enable-with")), n.disabled = !1;
			for (s = $(this).find("button[type=submit][data-enable-with]"), r = 0, o = s.length; o > r; r++) e = s[r], $(e).html($(e).attr("data-enable-with")), e.disabled = !1
		})
	}.call(this),
	function() {
		$(document).on("click", "a[data-method]", function(e) {
			var t, n, r, i;
			return t = $(this), t.is("a[data-remote]") || (i = t.attr("data-method").toLowerCase(), "get" === i) ? void 0 : (n = document.createElement("form"), n.method = "POST", n.action = t.attr("href"), n.style.display = "none", "post" !== i && (r = document.createElement("input"), r.setAttribute("type", "hidden"), r.setAttribute("name", "_method"), r.setAttribute("value", i), n.appendChild(r)), document.body.appendChild(n), $(n).submit(), e.preventDefault(), !1)
		})
	}.call(this),
	function() {
		$(document).on("click", "a[data-remote]", function(e) {
			var t, n, r, i, o;
			return n = $(this), r = {}, r.context = this, (i = n.attr("data-method")) && (r.type = i), (o = this.href) && (r.url = o), (t = n.attr("data-type")) && (r.dataType = t), $.ajax(r), e.preventDefault(), !1
		}), $(document).on("submit", "form[data-remote]", function(e) {
			var t, n, r, i, o, a;
			return r = $(this), i = {}, i.context = this, (o = r.attr("method")) && (i.type = o), (a = this.action) && (i.url = a), (t = r.serializeArray()) && (i.data = t), (n = r.attr("data-type")) && (i.dataType = n), $.ajax(i), e.preventDefault(), !1
		}), $(document).on("ajaxSend", "[data-remote]", function(e, t) {
			$(this).data("remote-xhr", t)
		}), $(document).on("ajaxComplete", "[data-remote]", function() {
			var e;
			"function" == typeof(e = $(this)).removeData && e.removeData("remote-xhr")
		})
	}.call(this),
	function() {
		var e;
		e = "form[data-remote] input[type=submit],\nform[data-remote] button[type=submit],\nform[data-remote] button:not([type]),\nform[data-remote-submit] input[type=submit],\nform[data-remote-submit] button[type=submit],\nform[data-remote-submit] button:not([type])", $(document).on("click", e, function() {
			var e, t, n, r, i, o;
			i = $(this), t = i.closest("form"), n = t.find(".js-submit-button-value"), (r = i.attr("name")) ? (e = i.is("input[type=submit]") ? "Submit" : "", o = i.val() || e, n[0] ? (n.attr("name", r), n.attr("value", o)) : (n = document.createElement("input"), n.setAttribute("type", "hidden"), n.setAttribute("name", r), n.setAttribute("value", o), n.setAttribute("class", "js-submit-button-value"), t.prepend(n))) : n.remove()
		})
	}.call(this),
	/*!
	 * Pulled from https://js.braintreegateway.com/v2/braintree.js on 15 July, 2014
	 *
	 * We have a small number of minor customization to this file for image asset
	 * hosting.
	 *
	 * Braintree End-to-End Encryption Library
	 * https://www.braintreepayments.com
	 * Copyright (c) 2009-2014 Braintree, a division of PayPal, Inc.
	 *
	 * JSBN
	 * Copyright (c) 2005  Tom Wu
	 *
	 * Both Licensed under the MIT License.
	 * http://opensource.org/licenses/MIT
	 *
	 * ASN.1 JavaScript decoder
	 * Copyright (c) 2008-2009 Lapo Luchini <lapo@lapo.it>
	 * Licensed under the ISC License.
	 * http://opensource.org/licenses/ISC
	 */
	! function() {
		function e(t, n) {
			t instanceof e ? (this.enc = t.enc, this.pos = t.pos) : (this.enc = t, this.pos = n)
		}

		function t(e, t, n, r, i) {
			this.stream = e, this.header = t, this.length = n, this.tag = r, this.sub = i
		}

		function n(e) {
			var t, n, r = "";
			for (t = 0; t + 3 <= e.length; t += 3) n = parseInt(e.substring(t, t + 3), 16), r += tt.charAt(n >> 6) + tt.charAt(63 & n);
			for (t + 1 == e.length ? (n = parseInt(e.substring(t, t + 1), 16), r += tt.charAt(n << 2)) : t + 2 == e.length && (n = parseInt(e.substring(t, t + 2), 16), r += tt.charAt(n >> 2) + tt.charAt((3 & n) << 4));
				(3 & r.length) > 0;) r += nt;
			return r
		}

		function r(e) {
			var t, n, r, i = "",
				o = 0;
			for (t = 0; t < e.length && e.charAt(t) != nt; ++t) r = tt.indexOf(e.charAt(t)), 0 > r || (0 == o ? (i += l(r >> 2), n = 3 & r, o = 1) : 1 == o ? (i += l(n << 2 | r >> 4), n = 15 & r, o = 2) : 2 == o ? (i += l(n), i += l(r >> 2), n = 3 & r, o = 3) : (i += l(n << 2 | r >> 4), i += l(15 & r), o = 0));
			return 1 == o && (i += l(n << 2)), i
		}

		function i(e) {
			var t, n = r(e),
				i = new Array;
			for (t = 0; 2 * t < n.length; ++t) i[t] = parseInt(n.substring(2 * t, 2 * t + 2), 16);
			return i
		}

		function o(e, t, n) {
			null != e && ("number" == typeof e ? this.fromNumber(e, t, n) : null == t && "string" != typeof e ? this.fromString(e, 256) : this.fromString(e, t))
		}

		function a() {
			return new o(null)
		}

		function s(e, t, n, r, i, o) {
			for (; --o >= 0;) {
				var a = t * this[e++] + n[r] + i;
				i = Math.floor(a / 67108864), n[r++] = 67108863 & a
			}
			return i
		}

		function c(e, t, n, r, i, o) {
			for (var a = 32767 & t, s = t >> 15; --o >= 0;) {
				var c = 32767 & this[e],
					u = this[e++] >> 15,
					l = s * c + u * a;
				c = a * c + ((32767 & l) << 15) + n[r] + (1073741823 & i), i = (c >>> 30) + (l >>> 15) + s * u + (i >>> 30), n[r++] = 1073741823 & c
			}
			return i
		}

		function u(e, t, n, r, i, o) {
			for (var a = 16383 & t, s = t >> 14; --o >= 0;) {
				var c = 16383 & this[e],
					u = this[e++] >> 14,
					l = s * c + u * a;
				c = a * c + ((16383 & l) << 14) + n[r] + i, i = (c >> 28) + (l >> 14) + s * u, n[r++] = 268435455 & c
			}
			return i
		}

		function l(e) {
			return ct.charAt(e)
		}

		function f(e, t) {
			var n = ut[e.charCodeAt(t)];
			return null == n ? -1 : n
		}

		function d(e) {
			for (var t = this.t - 1; t >= 0; --t) e[t] = this[t];
			e.t = this.t, e.s = this.s
		}

		function p(e) {
			this.t = 1, this.s = 0 > e ? -1 : 0, e > 0 ? this[0] = e : -1 > e ? this[0] = e + this.DV : this.t = 0
		}

		function h(e) {
			var t = a();
			return t.fromInt(e), t
		}

		function m(e, t) {
			var n;
			if (16 == t) n = 4;
			else if (8 == t) n = 3;
			else if (256 == t) n = 8;
			else if (2 == t) n = 1;
			else if (32 == t) n = 5;
			else {
				if (4 != t) return void this.fromRadix(e, t);
				n = 2
			}
			this.t = 0, this.s = 0;
			for (var r = e.length, i = !1, a = 0; --r >= 0;) {
				var s = 8 == n ? 255 & e[r] : f(e, r);
				0 > s ? "-" == e.charAt(r) && (i = !0) : (i = !1, 0 == a ? this[this.t++] = s : a + n > this.DB ? (this[this.t - 1] |= (s & (1 << this.DB - a) - 1) << a, this[this.t++] = s >> this.DB - a) : this[this.t - 1] |= s << a, a += n, a >= this.DB && (a -= this.DB))
			}
			8 == n && 0 != (128 & e[0]) && (this.s = -1, a > 0 && (this[this.t - 1] |= (1 << this.DB - a) - 1 << a)), this.clamp(), i && o.ZERO.subTo(this, this)
		}

		function v() {
			for (var e = this.s & this.DM; this.t > 0 && this[this.t - 1] == e;) --this.t
		}

		function g(e) {
			if (this.s < 0) return "-" + this.negate().toString(e);
			var t;
			if (16 == e) t = 4;
			else if (8 == e) t = 3;
			else if (2 == e) t = 1;
			else if (32 == e) t = 5;
			else {
				if (4 != e) return this.toRadix(e);
				t = 2
			}
			var n, r = (1 << t) - 1,
				i = !1,
				o = "",
				a = this.t,
				s = this.DB - a * this.DB % t;
			if (a-- > 0)
				for (s < this.DB && (n = this[a] >> s) > 0 && (i = !0, o = l(n)); a >= 0;) t > s ? (n = (this[a] & (1 << s) - 1) << t - s, n |= this[--a] >> (s += this.DB - t)) : (n = this[a] >> (s -= t) & r, 0 >= s && (s += this.DB, --a)), n > 0 && (i = !0), i && (o += l(n));
			return i ? o : "0"
		}

		function y() {
			var e = a();
			return o.ZERO.subTo(this, e), e
		}

		function b() {
			return this.s < 0 ? this.negate() : this
		}

		function w(e) {
			var t = this.s - e.s;
			if (0 != t) return t;
			var n = this.t;
			if (t = n - e.t, 0 != t) return this.s < 0 ? -t : t;
			for (; --n >= 0;)
				if (0 != (t = this[n] - e[n])) return t;
			return 0
		}

		function x(e) {
			var t, n = 1;
			return 0 != (t = e >>> 16) && (e = t, n += 16), 0 != (t = e >> 8) && (e = t, n += 8), 0 != (t = e >> 4) && (e = t, n += 4), 0 != (t = e >> 2) && (e = t, n += 2), 0 != (t = e >> 1) && (e = t, n += 1), n
		}

		function E() {
			return this.t <= 0 ? 0 : this.DB * (this.t - 1) + x(this[this.t - 1] ^ this.s & this.DM)
		}

		function T(e, t) {
			var n;
			for (n = this.t - 1; n >= 0; --n) t[n + e] = this[n];
			for (n = e - 1; n >= 0; --n) t[n] = 0;
			t.t = this.t + e, t.s = this.s
		}

		function _(e, t) {
			for (var n = e; n < this.t; ++n) t[n - e] = this[n];
			t.t = Math.max(this.t - e, 0), t.s = this.s
		}

		function C(e, t) {
			var n, r = e % this.DB,
				i = this.DB - r,
				o = (1 << i) - 1,
				a = Math.floor(e / this.DB),
				s = this.s << r & this.DM;
			for (n = this.t - 1; n >= 0; --n) t[n + a + 1] = this[n] >> i | s, s = (this[n] & o) << r;
			for (n = a - 1; n >= 0; --n) t[n] = 0;
			t[a] = s, t.t = this.t + a + 1, t.s = this.s, t.clamp()
		}

		function k(e, t) {
			t.s = this.s;
			var n = Math.floor(e / this.DB);
			if (n >= this.t) return void(t.t = 0);
			var r = e % this.DB,
				i = this.DB - r,
				o = (1 << r) - 1;
			t[0] = this[n] >> r;
			for (var a = n + 1; a < this.t; ++a) t[a - n - 1] |= (this[a] & o) << i, t[a - n] = this[a] >> r;
			r > 0 && (t[this.t - n - 1] |= (this.s & o) << i), t.t = this.t - n, t.clamp()
		}

		function S(e, t) {
			for (var n = 0, r = 0, i = Math.min(e.t, this.t); i > n;) r += this[n] - e[n], t[n++] = r & this.DM, r >>= this.DB;
			if (e.t < this.t) {
				for (r -= e.s; n < this.t;) r += this[n], t[n++] = r & this.DM, r >>= this.DB;
				r += this.s
			} else {
				for (r += this.s; n < e.t;) r -= e[n], t[n++] = r & this.DM, r >>= this.DB;
				r -= e.s
			}
			t.s = 0 > r ? -1 : 0, -1 > r ? t[n++] = this.DV + r : r > 0 && (t[n++] = r), t.t = n, t.clamp()
		}

		function A(e, t) {
			var n = this.abs(),
				r = e.abs(),
				i = n.t;
			for (t.t = i + r.t; --i >= 0;) t[i] = 0;
			for (i = 0; i < r.t; ++i) t[i + n.t] = n.am(0, r[i], t, i, 0, n.t);
			t.s = 0, t.clamp(), this.s != e.s && o.ZERO.subTo(t, t)
		}

		function N(e) {
			for (var t = this.abs(), n = e.t = 2 * t.t; --n >= 0;) e[n] = 0;
			for (n = 0; n < t.t - 1; ++n) {
				var r = t.am(n, t[n], e, 2 * n, 0, 1);
				(e[n + t.t] += t.am(n + 1, 2 * t[n], e, 2 * n + 1, r, t.t - n - 1)) >= t.DV && (e[n + t.t] -= t.DV, e[n + t.t + 1] = 1)
			}
			e.t > 0 && (e[e.t - 1] += t.am(n, t[n], e, 2 * n, 0, 1)), e.s = 0, e.clamp()
		}

		function D(e, t, n) {
			var r = e.abs();
			if (!(r.t <= 0)) {
				var i = this.abs();
				if (i.t < r.t) return null != t && t.fromInt(0), void(null != n && this.copyTo(n));
				null == n && (n = a());
				var s = a(),
					c = this.s,
					u = e.s,
					l = this.DB - x(r[r.t - 1]);
				l > 0 ? (r.lShiftTo(l, s), i.lShiftTo(l, n)) : (r.copyTo(s), i.copyTo(n));
				var f = s.t,
					d = s[f - 1];
				if (0 != d) {
					var p = d * (1 << this.F1) + (f > 1 ? s[f - 2] >> this.F2 : 0),
						h = this.FV / p,
						m = (1 << this.F1) / p,
						v = 1 << this.F2,
						g = n.t,
						y = g - f,
						b = null == t ? a() : t;
					for (s.dlShiftTo(y, b), n.compareTo(b) >= 0 && (n[n.t++] = 1, n.subTo(b, n)), o.ONE.dlShiftTo(f, b), b.subTo(s, s); s.t < f;) s[s.t++] = 0;
					for (; --y >= 0;) {
						var w = n[--g] == d ? this.DM : Math.floor(n[g] * h + (n[g - 1] + v) * m);
						if ((n[g] += s.am(0, w, n, y, 0, f)) < w)
							for (s.dlShiftTo(y, b), n.subTo(b, n); n[g] < --w;) n.subTo(b, n)
					}
					null != t && (n.drShiftTo(f, t), c != u && o.ZERO.subTo(t, t)), n.t = f, n.clamp(), l > 0 && n.rShiftTo(l, n), 0 > c && o.ZERO.subTo(n, n)
				}
			}
		}

		function j(e) {
			var t = a();
			return this.abs().divRemTo(e, null, t), this.s < 0 && t.compareTo(o.ZERO) > 0 && e.subTo(t, t), t
		}

		function P(e) {
			this.m = e
		}

		function L(e) {
			return e.s < 0 || e.compareTo(this.m) >= 0 ? e.mod(this.m) : e
		}

		function O(e) {
			return e
		}

		function I(e) {
			e.divRemTo(this.m, null, e)
		}

		function M(e, t, n) {
			e.multiplyTo(t, n), this.reduce(n)
		}

		function $(e, t) {
			e.squareTo(t), this.reduce(t)
		}

		function F() {
			if (this.t < 1) return 0;
			var e = this[0];
			if (0 == (1 & e)) return 0;
			var t = 3 & e;
			return t = t * (2 - (15 & e) * t) & 15, t = t * (2 - (255 & e) * t) & 255, t = t * (2 - ((65535 & e) * t & 65535)) & 65535, t = t * (2 - e * t % this.DV) % this.DV, t > 0 ? this.DV - t : -t
		}

		function R(e) {
			this.m = e, this.mp = e.invDigit(), this.mpl = 32767 & this.mp, this.mph = this.mp >> 15, this.um = (1 << e.DB - 15) - 1, this.mt2 = 2 * e.t
		}

		function U(e) {
			var t = a();
			return e.abs().dlShiftTo(this.m.t, t), t.divRemTo(this.m, null, t), e.s < 0 && t.compareTo(o.ZERO) > 0 && this.m.subTo(t, t), t
		}

		function H(e) {
			var t = a();
			return e.copyTo(t), this.reduce(t), t
		}

		function B(e) {
			for (; e.t <= this.mt2;) e[e.t++] = 0;
			for (var t = 0; t < this.m.t; ++t) {
				var n = 32767 & e[t],
					r = n * this.mpl + ((n * this.mph + (e[t] >> 15) * this.mpl & this.um) << 15) & e.DM;
				for (n = t + this.m.t, e[n] += this.m.am(0, r, e, t, 0, this.m.t); e[n] >= e.DV;) e[n] -= e.DV, e[++n] ++
			}
			e.clamp(), e.drShiftTo(this.m.t, e), e.compareTo(this.m) >= 0 && e.subTo(this.m, e)
		}

		function z(e, t) {
			e.squareTo(t), this.reduce(t)
		}

		function q(e, t, n) {
			e.multiplyTo(t, n), this.reduce(n)
		}

		function W() {
			return 0 == (this.t > 0 ? 1 & this[0] : this.s)
		}

		function V(e, t) {
			if (e > 4294967295 || 1 > e) return o.ONE;
			var n = a(),
				r = a(),
				i = t.convert(this),
				s = x(e) - 1;
			for (i.copyTo(n); --s >= 0;)
				if (t.sqrTo(n, r), (e & 1 << s) > 0) t.mulTo(r, i, n);
				else {
					var c = n;
					n = r, r = c
				}
			return t.revert(n)
		}

		function X(e, t) {
			var n;
			return n = 256 > e || t.isEven() ? new P(t) : new R(t), this.exp(e, n)
		}

		function Y(e, t) {
			return new o(e, t)
		}

		function G(e, t) {
			if (t < e.length + 11) throw new Error("Message too long for RSA");
			for (var n = new Array, r = e.length - 1; r >= 0 && t > 0;) {
				var i = e.charCodeAt(r--);
				128 > i ? n[--t] = i : i > 127 && 2048 > i ? (n[--t] = 63 & i | 128, n[--t] = i >> 6 | 192) : (n[--t] = 63 & i | 128, n[--t] = i >> 6 & 63 | 128, n[--t] = i >> 12 | 224)
			}
			n[--t] = 0;
			for (var a = 0, s = 0, c = 0; t > 2;) 0 == c && (s = lt.random.randomWords(1, 0)[0]), a = s >> c & 255, c = (c + 8) % 32, 0 != a && (n[--t] = a);
			return n[--t] = 2, n[--t] = 0, new o(n)
		}

		function J() {
			this.n = null, this.e = 0, this.d = null, this.p = null, this.q = null, this.dmp1 = null, this.dmq1 = null, this.coeff = null
		}

		function K(e, t) {
			if (!(null != e && null != t && e.length > 0 && t.length > 0)) throw new Error("Invalid RSA public key");
			this.n = Y(e, 16), this.e = parseInt(t, 16)
		}

		function Q(e) {
			return e.modPowInt(this.e, this.n)
		}

		function Z(e) {
			var t = G(e, this.n.bitLength() + 7 >> 3);
			if (null == t) return null;
			var n = this.doPublic(t);
			if (null == n) return null;
			var r = n.toString(16);
			return 0 == (1 & r.length) ? r : "0" + r
		}
		e.prototype.get = function(e) {
			if (void 0 == e && (e = this.pos++), e >= this.enc.length) throw "Requesting byte offset " + e + " on a stream of length " + this.enc.length;
			return this.enc[e]
		}, e.prototype.hexDigits = "0123456789ABCDEF", e.prototype.hexByte = function(e) {
			return this.hexDigits.charAt(e >> 4 & 15) + this.hexDigits.charAt(15 & e)
		}, e.prototype.hexDump = function(e, t) {
			for (var n = "", r = e; t > r; ++r) switch (n += this.hexByte(this.get(r)), 15 & r) {
				case 7:
					n += "  ";
					break;
				case 15:
					n += "\n";
					break;
				default:
					n += " "
			}
			return n
		}, e.prototype.parseStringISO = function(e, t) {
			for (var n = "", r = e; t > r; ++r) n += String.fromCharCode(this.get(r));
			return n
		}, e.prototype.parseStringUTF = function(e, t) {
			for (var n = "", r = 0, i = e; t > i;) {
				var r = this.get(i++);
				n += String.fromCharCode(128 > r ? r : r > 191 && 224 > r ? (31 & r) << 6 | 63 & this.get(i++) : (15 & r) << 12 | (63 & this.get(i++)) << 6 | 63 & this.get(i++))
			}
			return n
		}, e.prototype.reTime = /^((?:1[89]|2\d)?\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/, e.prototype.parseTime = function(e, t) {
			var n = this.parseStringISO(e, t),
				r = this.reTime.exec(n);
			return r ? (n = r[1] + "-" + r[2] + "-" + r[3] + " " + r[4], r[5] && (n += ":" + r[5], r[6] && (n += ":" + r[6], r[7] && (n += "." + r[7]))), r[8] && (n += " UTC", "Z" != r[8] && (n += r[8], r[9] && (n += ":" + r[9]))), n) : "Unrecognized time: " + n
		}, e.prototype.parseInteger = function(e, t) {
			var n = t - e;
			if (n > 4) {
				n <<= 3;
				var r = this.get(e);
				if (0 == r) n -= 8;
				else
					for (; 128 > r;) r <<= 1, --n;
				return "(" + n + " bit)"
			}
			for (var i = 0, o = e; t > o; ++o) i = i << 8 | this.get(o);
			return i
		}, e.prototype.parseBitString = function(e, t) {
			var n = this.get(e),
				r = (t - e - 1 << 3) - n,
				i = "(" + r + " bit)";
			if (20 >= r) {
				var o = n;
				i += " ";
				for (var a = t - 1; a > e; --a) {
					for (var s = this.get(a), c = o; 8 > c; ++c) i += s >> c & 1 ? "1" : "0";
					o = 0
				}
			}
			return i
		}, e.prototype.parseOctetString = function(e, t) {
			var n = t - e,
				r = "(" + n + " byte) ";
			n > 20 && (t = e + 20);
			for (var i = e; t > i; ++i) r += this.hexByte(this.get(i));
			return n > 20 && (r += String.fromCharCode(8230)), r
		}, e.prototype.parseOID = function(e, t) {
			for (var n, r = 0, i = 0, o = e; t > o; ++o) {
				var a = this.get(o);
				r = r << 7 | 127 & a, i += 7, 128 & a || (void 0 == n ? n = parseInt(r / 40) + "." + r % 40 : n += "." + (i >= 31 ? "bigint" : r), r = i = 0), n += String.fromCharCode()
			}
			return n
		}, t.prototype.typeName = function() {
			if (void 0 == this.tag) return "unknown";
			var e = this.tag >> 6,
				t = (this.tag >> 5 & 1, 31 & this.tag);
			switch (e) {
				case 0:
					switch (t) {
						case 0:
							return "EOC";
						case 1:
							return "BOOLEAN";
						case 2:
							return "INTEGER";
						case 3:
							return "BIT_STRING";
						case 4:
							return "OCTET_STRING";
						case 5:
							return "NULL";
						case 6:
							return "OBJECT_IDENTIFIER";
						case 7:
							return "ObjectDescriptor";
						case 8:
							return "EXTERNAL";
						case 9:
							return "REAL";
						case 10:
							return "ENUMERATED";
						case 11:
							return "EMBEDDED_PDV";
						case 12:
							return "UTF8String";
						case 16:
							return "SEQUENCE";
						case 17:
							return "SET";
						case 18:
							return "NumericString";
						case 19:
							return "PrintableString";
						case 20:
							return "TeletexString";
						case 21:
							return "VideotexString";
						case 22:
							return "IA5String";
						case 23:
							return "UTCTime";
						case 24:
							return "GeneralizedTime";
						case 25:
							return "GraphicString";
						case 26:
							return "VisibleString";
						case 27:
							return "GeneralString";
						case 28:
							return "UniversalString";
						case 30:
							return "BMPString";
						default:
							return "Universal_" + t.toString(16)
					}
				case 1:
					return "Application_" + t.toString(16);
				case 2:
					return "[" + t + "]";
				case 3:
					return "Private_" + t.toString(16)
			}
		}, t.prototype.content = function() {
			if (void 0 == this.tag) return null;
			var e = this.tag >> 6;
			if (0 != e) return null == this.sub ? null : "(" + this.sub.length + ")";
			var t = 31 & this.tag,
				n = this.posContent(),
				r = Math.abs(this.length);
			switch (t) {
				case 1:
					return 0 == this.stream.get(n) ? "false" : "true";
				case 2:
					return this.stream.parseInteger(n, n + r);
				case 3:
					return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(n, n + r);
				case 4:
					return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(n, n + r);
				case 6:
					return this.stream.parseOID(n, n + r);
				case 16:
				case 17:
					return "(" + this.sub.length + " elem)";
				case 12:
					return this.stream.parseStringUTF(n, n + r);
				case 18:
				case 19:
				case 20:
				case 21:
				case 22:
				case 26:
					return this.stream.parseStringISO(n, n + r);
				case 23:
				case 24:
					return this.stream.parseTime(n, n + r)
			}
			return null
		}, t.prototype.toString = function() {
			return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (null == this.sub ? "null" : this.sub.length) + "]"
		}, t.prototype.print = function(e) {
			if (void 0 == e && (e = ""), document.writeln(e + this), null != this.sub) {
				e += "  ";
				for (var t = 0, n = this.sub.length; n > t; ++t) this.sub[t].print(e)
			}
		}, t.prototype.toPrettyString = function(e) {
			void 0 == e && (e = "");
			var t = e + this.typeName() + " @" + this.stream.pos;
			if (this.length >= 0 && (t += "+"), t += this.length, 32 & this.tag ? t += " (constructed)" : 3 != this.tag && 4 != this.tag || null == this.sub || (t += " (encapsulates)"), t += "\n", null != this.sub) {
				e += "  ";
				for (var n = 0, r = this.sub.length; r > n; ++n) t += this.sub[n].toPrettyString(e)
			}
			return t
		}, t.prototype.posStart = function() {
			return this.stream.pos
		}, t.prototype.posContent = function() {
			return this.stream.pos + this.header
		}, t.prototype.posEnd = function() {
			return this.stream.pos + this.header + Math.abs(this.length)
		}, t.decodeLength = function(e) {
			var t = e.get(),
				n = 127 & t;
			if (n == t) return n;
			if (n > 3) throw "Length over 24 bits not supported at position " + (e.pos - 1);
			if (0 == n) return -1;
			t = 0;
			for (var r = 0; n > r; ++r) t = t << 8 | e.get();
			return t
		}, t.hasContent = function(n, r, i) {
			if (32 & n) return !0;
			if (3 > n || n > 4) return !1;
			var o = new e(i);
			3 == n && o.get();
			var a = o.get();
			if (a >> 6 & 1) return !1;
			try {
				var s = t.decodeLength(o);
				return o.pos - i.pos + s == r
			} catch (c) {
				return !1
			}
		}, t.decode = function(n) {
			n instanceof e || (n = new e(n, 0));
			var r = new e(n),
				i = n.get(),
				o = t.decodeLength(n),
				a = n.pos - r.pos,
				s = null;
			if (t.hasContent(i, o, n)) {
				var c = n.pos;
				if (3 == i && n.get(), s = [], o >= 0) {
					for (var u = c + o; n.pos < u;) s[s.length] = t.decode(n);
					if (n.pos != u) throw "Content size is not correct for container starting at offset " + c
				} else try {
					for (;;) {
						var l = t.decode(n);
						if (0 == l.tag) break;
						s[s.length] = l
					}
					o = c - n.pos
				} catch (f) {
					throw "Exception while decoding undefined length content: " + f
				}
			} else n.pos += o;
			return new t(r, a, o, i, s)
		};
		var et, tt = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
			nt = "=",
			rt = 0xdeadbeefcafe,
			it = 15715070 == (16777215 & rt);
		it && "Microsoft Internet Explorer" == navigator.appName ? (o.prototype.am = c, et = 30) : it && "Netscape" != navigator.appName ? (o.prototype.am = s, et = 26) : (o.prototype.am = u, et = 28), o.prototype.DB = et, o.prototype.DM = (1 << et) - 1, o.prototype.DV = 1 << et;
		var ot = 52;
		o.prototype.FV = Math.pow(2, ot), o.prototype.F1 = ot - et, o.prototype.F2 = 2 * et - ot;
		var at, st, ct = "0123456789abcdefghijklmnopqrstuvwxyz",
			ut = new Array;
		for (at = "0".charCodeAt(0), st = 0; 9 >= st; ++st) ut[at++] = st;
		for (at = "a".charCodeAt(0), st = 10; 36 > st; ++st) ut[at++] = st;
		for (at = "A".charCodeAt(0), st = 10; 36 > st; ++st) ut[at++] = st;
		P.prototype.convert = L, P.prototype.revert = O, P.prototype.reduce = I, P.prototype.mulTo = M, P.prototype.sqrTo = $, R.prototype.convert = U, R.prototype.revert = H, R.prototype.reduce = B, R.prototype.mulTo = q, R.prototype.sqrTo = z, o.prototype.copyTo = d, o.prototype.fromInt = p, o.prototype.fromString = m, o.prototype.clamp = v, o.prototype.dlShiftTo = T, o.prototype.drShiftTo = _, o.prototype.lShiftTo = C, o.prototype.rShiftTo = k, o.prototype.subTo = S, o.prototype.multiplyTo = A, o.prototype.squareTo = N, o.prototype.divRemTo = D, o.prototype.invDigit = F, o.prototype.isEven = W, o.prototype.exp = V, o.prototype.toString = g, o.prototype.negate = y, o.prototype.abs = b, o.prototype.compareTo = w, o.prototype.bitLength = E, o.prototype.mod = j, o.prototype.modPowInt = X, o.ZERO = h(0), o.ONE = h(1), J.prototype.doPublic = Q, J.prototype.setPublic = K, J.prototype.encrypt = Z;
		var lt = {
			cipher: {},
			hash: {},
			keyexchange: {},
			mode: {},
			misc: {},
			codec: {},
			exception: {
				corrupt: function(e) {
					this.toString = function() {
						return "CORRUPT: " + this.message
					}, this.message = e
				},
				invalid: function(e) {
					this.toString = function() {
						return "INVALID: " + this.message
					}, this.message = e
				},
				bug: function(e) {
					this.toString = function() {
						return "BUG: " + this.message
					}, this.message = e
				},
				notReady: function(e) {
					this.toString = function() {
						return "NOT READY: " + this.message
					}, this.message = e
				}
			}
		};
		"undefined" != typeof module && module.exports && (module.exports = lt), lt.cipher.aes = function(e) {
				this._tables[0][0][0] || this._precompute();
				var t, n, r, i, o, a = this._tables[0][4],
					s = this._tables[1],
					c = e.length,
					u = 1;
				if (4 !== c && 6 !== c && 8 !== c) throw new lt.exception.invalid("invalid aes key size");
				for (this._key = [i = e.slice(0), o = []], t = c; 4 * c + 28 > t; t++) r = i[t - 1], (t % c === 0 || 8 === c && t % c === 4) && (r = a[r >>> 24] << 24 ^ a[r >> 16 & 255] << 16 ^ a[r >> 8 & 255] << 8 ^ a[255 & r], t % c === 0 && (r = r << 8 ^ r >>> 24 ^ u << 24, u = u << 1 ^ 283 * (u >> 7))), i[t] = i[t - c] ^ r;
				for (n = 0; t; n++, t--) r = i[3 & n ? t : t - 4], o[n] = 4 >= t || 4 > n ? r : s[0][a[r >>> 24]] ^ s[1][a[r >> 16 & 255]] ^ s[2][a[r >> 8 & 255]] ^ s[3][a[255 & r]]
			}, lt.cipher.aes.prototype = {
				encrypt: function(e) {
					return this._crypt(e, 0)
				},
				decrypt: function(e) {
					return this._crypt(e, 1)
				},
				_tables: [
					[
						[],
						[],
						[],
						[],
						[]
					],
					[
						[],
						[],
						[],
						[],
						[]
					]
				],
				_precompute: function() {
					var e, t, n, r, i, o, a, s, c, u = this._tables[0],
						l = this._tables[1],
						f = u[4],
						d = l[4],
						p = [],
						h = [];
					for (e = 0; 256 > e; e++) h[(p[e] = e << 1 ^ 283 * (e >> 7)) ^ e] = e;
					for (t = n = 0; !f[t]; t ^= r || 1, n = h[n] || 1)
						for (a = n ^ n << 1 ^ n << 2 ^ n << 3 ^ n << 4, a = a >> 8 ^ 255 & a ^ 99, f[t] = a, d[a] = t, o = p[i = p[r = p[t]]], c = 16843009 * o ^ 65537 * i ^ 257 * r ^ 16843008 * t, s = 257 * p[a] ^ 16843008 * a, e = 0; 4 > e; e++) u[e][t] = s = s << 24 ^ s >>> 8, l[e][a] = c = c << 24 ^ c >>> 8;
					for (e = 0; 5 > e; e++) u[e] = u[e].slice(0), l[e] = l[e].slice(0)
				},
				_crypt: function(e, t) {
					if (4 !== e.length) throw new lt.exception.invalid("invalid aes block size");
					var n, r, i, o, a = this._key[t],
						s = e[0] ^ a[0],
						c = e[t ? 3 : 1] ^ a[1],
						u = e[2] ^ a[2],
						l = e[t ? 1 : 3] ^ a[3],
						f = a.length / 4 - 2,
						d = 4,
						p = [0, 0, 0, 0],
						h = this._tables[t],
						m = h[0],
						v = h[1],
						g = h[2],
						y = h[3],
						b = h[4];
					for (o = 0; f > o; o++) n = m[s >>> 24] ^ v[c >> 16 & 255] ^ g[u >> 8 & 255] ^ y[255 & l] ^ a[d], r = m[c >>> 24] ^ v[u >> 16 & 255] ^ g[l >> 8 & 255] ^ y[255 & s] ^ a[d + 1], i = m[u >>> 24] ^ v[l >> 16 & 255] ^ g[s >> 8 & 255] ^ y[255 & c] ^ a[d + 2], l = m[l >>> 24] ^ v[s >> 16 & 255] ^ g[c >> 8 & 255] ^ y[255 & u] ^ a[d + 3], d += 4, s = n, c = r, u = i;
					for (o = 0; 4 > o; o++) p[t ? 3 & -o : o] = b[s >>> 24] << 24 ^ b[c >> 16 & 255] << 16 ^ b[u >> 8 & 255] << 8 ^ b[255 & l] ^ a[d++], n = s, s = c, c = u, u = l, l = n;
					return p
				}
			}, lt.bitArray = {
				bitSlice: function(e, t, n) {
					return e = lt.bitArray._shiftRight(e.slice(t / 32), 32 - (31 & t)).slice(1), void 0 === n ? e : lt.bitArray.clamp(e, n - t)
				},
				extract: function(e, t, n) {
					var r, i = Math.floor(-t - n & 31);
					return r = -32 & (t + n - 1 ^ t) ? e[t / 32 | 0] << 32 - i ^ e[t / 32 + 1 | 0] >>> i : e[t / 32 | 0] >>> i, r & (1 << n) - 1
				},
				concat: function(e, t) {
					if (0 === e.length || 0 === t.length) return e.concat(t);
					var n = e[e.length - 1],
						r = lt.bitArray.getPartial(n);
					return 32 === r ? e.concat(t) : lt.bitArray._shiftRight(t, r, 0 | n, e.slice(0, e.length - 1))
				},
				bitLength: function(e) {
					var t, n = e.length;
					return 0 === n ? 0 : (t = e[n - 1], 32 * (n - 1) + lt.bitArray.getPartial(t))
				},
				clamp: function(e, t) {
					if (32 * e.length < t) return e;
					e = e.slice(0, Math.ceil(t / 32));
					var n = e.length;
					return t = 31 & t, n > 0 && t && (e[n - 1] = lt.bitArray.partial(t, e[n - 1] & 2147483648 >> t - 1, 1)), e
				},
				partial: function(e, t, n) {
					return 32 === e ? t : (n ? 0 | t : t << 32 - e) + 1099511627776 * e
				},
				getPartial: function(e) {
					return Math.round(e / 1099511627776) || 32
				},
				equal: function(e, t) {
					if (lt.bitArray.bitLength(e) !== lt.bitArray.bitLength(t)) return !1;
					var n, r = 0;
					for (n = 0; n < e.length; n++) r |= e[n] ^ t[n];
					return 0 === r
				},
				_shiftRight: function(e, t, n, r) {
					var i, o, a = 0;
					for (void 0 === r && (r = []); t >= 32; t -= 32) r.push(n), n = 0;
					if (0 === t) return r.concat(e);
					for (i = 0; i < e.length; i++) r.push(n | e[i] >>> t), n = e[i] << 32 - t;
					return a = e.length ? e[e.length - 1] : 0, o = lt.bitArray.getPartial(a), r.push(lt.bitArray.partial(t + o & 31, t + o > 32 ? n : r.pop(), 1)), r
				},
				_xor4: function(e, t) {
					return [e[0] ^ t[0], e[1] ^ t[1], e[2] ^ t[2], e[3] ^ t[3]]
				}
			}, lt.codec.hex = {
				fromBits: function(e) {
					var t, n = "";
					for (t = 0; t < e.length; t++) n += ((0 | e[t]) + 0xf00000000000).toString(16).substr(4);
					return n.substr(0, lt.bitArray.bitLength(e) / 4)
				},
				toBits: function(e) {
					var t, n, r = [];
					for (e = e.replace(/\s|0x/g, ""), n = e.length, e += "00000000", t = 0; t < e.length; t += 8) r.push(0 ^ parseInt(e.substr(t, 8), 16));
					return lt.bitArray.clamp(r, 4 * n)
				}
			}, lt.codec.utf8String = {
				fromBits: function(e) {
					var t, n, r = "",
						i = lt.bitArray.bitLength(e);
					for (t = 0; i / 8 > t; t++) 0 === (3 & t) && (n = e[t / 4]), r += String.fromCharCode(n >>> 24), n <<= 8;
					return decodeURIComponent(escape(r))
				},
				toBits: function(e) {
					e = unescape(encodeURIComponent(e));
					var t, n = [],
						r = 0;
					for (t = 0; t < e.length; t++) r = r << 8 | e.charCodeAt(t), 3 === (3 & t) && (n.push(r), r = 0);
					return 3 & t && n.push(lt.bitArray.partial(8 * (3 & t), r)), n
				}
			}, lt.codec.base64 = {
				_chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
				fromBits: function(e, t, n) {
					var r, i = "",
						o = 0,
						a = lt.codec.base64._chars,
						s = 0,
						c = lt.bitArray.bitLength(e);
					for (n && (a = a.substr(0, 62) + "-_"), r = 0; 6 * i.length < c;) i += a.charAt((s ^ e[r] >>> o) >>> 26), 6 > o ? (s = e[r] << 6 - o, o += 26, r++) : (s <<= 6, o -= 6);
					for (; 3 & i.length && !t;) i += "=";
					return i
				},
				toBits: function(e, t) {
					e = e.replace(/\s|=/g, "");
					var n, r, i = [],
						o = 0,
						a = lt.codec.base64._chars,
						s = 0;
					for (t && (a = a.substr(0, 62) + "-_"), n = 0; n < e.length; n++) {
						if (r = a.indexOf(e.charAt(n)), 0 > r) throw new lt.exception.invalid("this isn't base64!");
						o > 26 ? (o -= 26, i.push(s ^ r >>> o), s = r << 32 - o) : (o += 6, s ^= r << 32 - o)
					}
					return 56 & o && i.push(lt.bitArray.partial(56 & o, s, 1)), i
				}
			}, lt.codec.base64url = {
				fromBits: function(e) {
					return lt.codec.base64.fromBits(e, 1, 1)
				},
				toBits: function(e) {
					return lt.codec.base64.toBits(e, 1)
				}
			}, void 0 === lt.beware && (lt.beware = {}), lt.beware["CBC mode is dangerous because it doesn't protect message integrity."] = function() {
				lt.mode.cbc = {
					name: "cbc",
					encrypt: function(e, t, n, r) {
						if (r && r.length) throw new lt.exception.invalid("cbc can't authenticate data");
						if (128 !== lt.bitArray.bitLength(n)) throw new lt.exception.invalid("cbc iv must be 128 bits");
						var i, o = lt.bitArray,
							a = o._xor4,
							s = o.bitLength(t),
							c = 0,
							u = [];
						if (7 & s) throw new lt.exception.invalid("pkcs#5 padding only works for multiples of a byte");
						for (i = 0; s >= c + 128; i += 4, c += 128) n = e.encrypt(a(n, t.slice(i, i + 4))), u.splice(i, 0, n[0], n[1], n[2], n[3]);
						return s = 16843009 * (16 - (s >> 3 & 15)), n = e.encrypt(a(n, o.concat(t, [s, s, s, s]).slice(i, i + 4))), u.splice(i, 0, n[0], n[1], n[2], n[3]), u
					},
					decrypt: function(e, t, n, r) {
						if (r && r.length) throw new lt.exception.invalid("cbc can't authenticate data");
						if (128 !== lt.bitArray.bitLength(n)) throw new lt.exception.invalid("cbc iv must be 128 bits");
						if (127 & lt.bitArray.bitLength(t) || !t.length) throw new lt.exception.corrupt("cbc ciphertext must be a positive multiple of the block size");
						var i, o, a, s = lt.bitArray,
							c = s._xor4,
							u = [];
						for (r = r || [], i = 0; i < t.length; i += 4) o = t.slice(i, i + 4), a = c(n, e.decrypt(o)), u.splice(i, 0, a[0], a[1], a[2], a[3]), n = o;
						if (o = 255 & u[i - 1], 0 == o || o > 16) throw new lt.exception.corrupt("pkcs#5 padding corrupt");
						if (a = 16843009 * o, !s.equal(s.bitSlice([a, a, a, a], 0, 8 * o), s.bitSlice(u, 32 * u.length - 8 * o, 32 * u.length))) throw new lt.exception.corrupt("pkcs#5 padding corrupt");
						return s.bitSlice(u, 0, 32 * u.length - 8 * o)
					}
				}
			}, lt.misc.hmac = function(e, t) {
				this._hash = t = t || lt.hash.sha256;
				var n, r = [
						[],
						[]
					],
					i = t.prototype.blockSize / 32;
				for (this._baseHash = [new t, new t], e.length > i && (e = t.hash(e)), n = 0; i > n; n++) r[0][n] = 909522486 ^ e[n], r[1][n] = 1549556828 ^ e[n];
				this._baseHash[0].update(r[0]), this._baseHash[1].update(r[1])
			}, lt.misc.hmac.prototype.encrypt = lt.misc.hmac.prototype.mac = function(e, t) {
				var n = new this._hash(this._baseHash[0]).update(e, t).finalize();
				return new this._hash(this._baseHash[1]).update(n).finalize()
			}, lt.hash.sha256 = function(e) {
				this._key[0] || this._precompute(), e ? (this._h = e._h.slice(0), this._buffer = e._buffer.slice(0), this._length = e._length) : this.reset()
			}, lt.hash.sha256.hash = function(e) {
				return (new lt.hash.sha256).update(e).finalize()
			}, lt.hash.sha256.prototype = {
				blockSize: 512,
				reset: function() {
					return this._h = this._init.slice(0), this._buffer = [], this._length = 0, this
				},
				update: function(e) {
					"string" == typeof e && (e = lt.codec.utf8String.toBits(e));
					var t, n = this._buffer = lt.bitArray.concat(this._buffer, e),
						r = this._length,
						i = this._length = r + lt.bitArray.bitLength(e);
					for (t = 512 + r & -512; i >= t; t += 512) this._block(n.splice(0, 16));
					return this
				},
				finalize: function() {
					var e, t = this._buffer,
						n = this._h;
					for (t = lt.bitArray.concat(t, [lt.bitArray.partial(1, 1)]), e = t.length + 2; 15 & e; e++) t.push(0);
					for (t.push(Math.floor(this._length / 4294967296)), t.push(0 | this._length); t.length;) this._block(t.splice(0, 16));
					return this.reset(), n
				},
				_init: [],
				_key: [],
				_precompute: function() {
					function e(e) {
						return 4294967296 * (e - Math.floor(e)) | 0
					}
					var t, n = 0,
						r = 2;
					e: for (; 64 > n; r++) {
						for (t = 2; r >= t * t; t++)
							if (r % t === 0) continue e;
						8 > n && (this._init[n] = e(Math.pow(r, .5))), this._key[n] = e(Math.pow(r, 1 / 3)), n++
					}
				},
				_block: function(e) {
					var t, n, r, i, o = e.slice(0),
						a = this._h,
						s = this._key,
						c = a[0],
						u = a[1],
						l = a[2],
						f = a[3],
						d = a[4],
						p = a[5],
						h = a[6],
						m = a[7];
					for (t = 0; 64 > t; t++) 16 > t ? n = o[t] : (r = o[t + 1 & 15], i = o[t + 14 & 15], n = o[15 & t] = (r >>> 7 ^ r >>> 18 ^ r >>> 3 ^ r << 25 ^ r << 14) + (i >>> 17 ^ i >>> 19 ^ i >>> 10 ^ i << 15 ^ i << 13) + o[15 & t] + o[t + 9 & 15] | 0), n = n + m + (d >>> 6 ^ d >>> 11 ^ d >>> 25 ^ d << 26 ^ d << 21 ^ d << 7) + (h ^ d & (p ^ h)) + s[t], m = h, h = p, p = d, d = f + n | 0, f = l, l = u, u = c, c = n + (u & l ^ f & (u ^ l)) + (u >>> 2 ^ u >>> 13 ^ u >>> 22 ^ u << 30 ^ u << 19 ^ u << 10) | 0;
					a[0] = a[0] + c | 0, a[1] = a[1] + u | 0, a[2] = a[2] + l | 0, a[3] = a[3] + f | 0, a[4] = a[4] + d | 0, a[5] = a[5] + p | 0, a[6] = a[6] + h | 0, a[7] = a[7] + m | 0
				}
			}, lt.random = {
				randomWords: function(e, t) {
					var n, r, i = [],
						o = this.isReady(t);
					if (o === this._NOT_READY) throw new lt.exception.notReady("generator isn't seeded");
					for (o & this._REQUIRES_RESEED && this._reseedFromPools(!(o & this._READY)), n = 0; e > n; n += 4)(n + 1) % this._MAX_WORDS_PER_BURST === 0 && this._gate(), r = this._gen4words(), i.push(r[0], r[1], r[2], r[3]);
					return this._gate(), i.slice(0, e)
				},
				setDefaultParanoia: function(e) {
					this._defaultParanoia = e
				},
				addEntropy: function(e, t, n) {
					n = n || "user";
					var r, i, o, a = (new Date).valueOf(),
						s = this._robins[n],
						c = this.isReady(),
						u = 0;
					switch (r = this._collectorIds[n], void 0 === r && (r = this._collectorIds[n] = this._collectorIdNext++), void 0 === s && (s = this._robins[n] = 0), this._robins[n] = (this._robins[n] + 1) % this._pools.length, typeof e) {
						case "number":
							void 0 === t && (t = 1), this._pools[s].update([r, this._eventId++, 1, t, a, 1, 0 | e]);
							break;
						case "object":
							var l = Object.prototype.toString.call(e);
							if ("[object Uint32Array]" === l) {
								for (o = [], i = 0; i < e.length; i++) o.push(e[i]);
								e = o
							} else
								for ("[object Array]" !== l && (u = 1), i = 0; i < e.length && !u; i++) "number" != typeof e[i] && (u = 1); if (!u) {
								if (void 0 === t)
									for (t = 0, i = 0; i < e.length; i++)
										for (o = e[i]; o > 0;) t++, o >>>= 1;
								this._pools[s].update([r, this._eventId++, 2, t, a, e.length].concat(e))
							}
							break;
						case "string":
							void 0 === t && (t = e.length), this._pools[s].update([r, this._eventId++, 3, t, a, e.length]), this._pools[s].update(e);
							break;
						default:
							u = 1
					}
					if (u) throw new lt.exception.bug("random: addEntropy only supports number, array of numbers or string");
					this._poolEntropy[s] += t, this._poolStrength += t, c === this._NOT_READY && (this.isReady() !== this._NOT_READY && this._fireEvent("seeded", Math.max(this._strength, this._poolStrength)), this._fireEvent("progress", this.getProgress()))
				},
				isReady: function(e) {
					var t = this._PARANOIA_LEVELS[void 0 !== e ? e : this._defaultParanoia];
					return this._strength && this._strength >= t ? this._poolEntropy[0] > this._BITS_PER_RESEED && (new Date).valueOf() > this._nextReseed ? this._REQUIRES_RESEED | this._READY : this._READY : this._poolStrength >= t ? this._REQUIRES_RESEED | this._NOT_READY : this._NOT_READY
				},
				getProgress: function(e) {
					var t = this._PARANOIA_LEVELS[e ? e : this._defaultParanoia];
					return this._strength >= t ? 1 : this._poolStrength > t ? 1 : this._poolStrength / t
				},
				startCollectors: function() {
					if (!this._collectorsStarted) {
						if (window.addEventListener) window.addEventListener("load", this._loadTimeCollector, !1), window.addEventListener("mousemove", this._mouseCollector, !1);
						else {
							if (!document.attachEvent) throw new lt.exception.bug("can't attach event");
							document.attachEvent("onload", this._loadTimeCollector), document.attachEvent("onmousemove", this._mouseCollector)
						}
						this._collectorsStarted = !0
					}
				},
				stopCollectors: function() {
					this._collectorsStarted && (window.removeEventListener ? (window.removeEventListener("load", this._loadTimeCollector, !1), window.removeEventListener("mousemove", this._mouseCollector, !1)) : window.detachEvent && (window.detachEvent("onload", this._loadTimeCollector), window.detachEvent("onmousemove", this._mouseCollector)), this._collectorsStarted = !1)
				},
				addEventListener: function(e, t) {
					this._callbacks[e][this._callbackI++] = t
				},
				removeEventListener: function(e, t) {
					var n, r, i = this._callbacks[e],
						o = [];
					for (r in i) i.hasOwnProperty(r) && i[r] === t && o.push(r);
					for (n = 0; n < o.length; n++) r = o[n], delete i[r]
				},
				_pools: [new lt.hash.sha256],
				_poolEntropy: [0],
				_reseedCount: 0,
				_robins: {},
				_eventId: 0,
				_collectorIds: {},
				_collectorIdNext: 0,
				_strength: 0,
				_poolStrength: 0,
				_nextReseed: 0,
				_key: [0, 0, 0, 0, 0, 0, 0, 0],
				_counter: [0, 0, 0, 0],
				_cipher: void 0,
				_defaultParanoia: 6,
				_collectorsStarted: !1,
				_callbacks: {
					progress: {},
					seeded: {}
				},
				_callbackI: 0,
				_NOT_READY: 0,
				_READY: 1,
				_REQUIRES_RESEED: 2,
				_MAX_WORDS_PER_BURST: 65536,
				_PARANOIA_LEVELS: [0, 48, 64, 96, 128, 192, 256, 384, 512, 768, 1024],
				_MILLISECONDS_PER_RESEED: 3e4,
				_BITS_PER_RESEED: 80,
				_gen4words: function() {
					for (var e = 0; 4 > e && (this._counter[e] = this._counter[e] + 1 | 0, !this._counter[e]); e++);
					return this._cipher.encrypt(this._counter)
				},
				_gate: function() {
					this._key = this._gen4words().concat(this._gen4words()), this._cipher = new lt.cipher.aes(this._key)
				},
				_reseed: function(e) {
					this._key = lt.hash.sha256.hash(this._key.concat(e)), this._cipher = new lt.cipher.aes(this._key);
					for (var t = 0; 4 > t && (this._counter[t] = this._counter[t] + 1 | 0, !this._counter[t]); t++);
				},
				_reseedFromPools: function(e) {
					var t, n = [],
						r = 0;
					for (this._nextReseed = n[0] = (new Date).valueOf() + this._MILLISECONDS_PER_RESEED, t = 0; 16 > t; t++) n.push(4294967296 * Math.random() | 0);
					for (t = 0; t < this._pools.length && (n = n.concat(this._pools[t].finalize()), r += this._poolEntropy[t], this._poolEntropy[t] = 0, e || !(this._reseedCount & 1 << t)); t++);
					this._reseedCount >= 1 << this._pools.length && (this._pools.push(new lt.hash.sha256), this._poolEntropy.push(0)), this._poolStrength -= r, r > this._strength && (this._strength = r), this._reseedCount++, this._reseed(n)
				},
				_mouseCollector: function(e) {
					var t = e.x || e.clientX || e.offsetX || 0,
						n = e.y || e.clientY || e.offsetY || 0;
					lt.random.addEntropy([t, n], 2, "mouse")
				},
				_loadTimeCollector: function() {
					lt.random.addEntropy((new Date).valueOf(), 2, "loadtime")
				},
				_fireEvent: function(e, t) {
					var n, r = lt.random._callbacks[e],
						i = [];
					for (n in r) r.hasOwnProperty(n) && i.push(r[n]);
					for (n = 0; n < i.length; n++) i[n](t)
				}
			},
			function() {
				try {
					var e = new Uint32Array(32);
					crypto.getRandomValues(e), lt.random.addEntropy(e, 1024, "crypto.getRandomValues")
				} catch (t) {}
			}(),
			function() {
				for (var e in lt.beware) lt.beware.hasOwnProperty(e) && lt.beware[e]()
			}();
		var ft = {
			sjcl: lt,
			version: "1.3.10"
		};
		ft.generateAesKey = function() {
			return {
				key: lt.random.randomWords(8, 0),
				encrypt: function(e) {
					return this.encryptWithIv(e, lt.random.randomWords(4, 0))
				},
				encryptWithIv: function(e, t) {
					var n = new lt.cipher.aes(this.key),
						r = lt.codec.utf8String.toBits(e),
						i = lt.mode.cbc.encrypt(n, r, t),
						o = lt.bitArray.concat(t, i);
					return lt.codec.base64.fromBits(o)
				}
			}
		}, ft.create = function(e) {
			return new ft.EncryptionClient(e)
		}, ft.EncryptionClient = function(e) {
			var r = this,
				o = [];
			r.publicKey = e, r.version = ft.version;
			var a = function(e, t) {
					var n, r, i;
					n = document.createElement(e);
					for (r in t) t.hasOwnProperty(r) && (i = t[r], n.setAttribute(r, i));
					return n
				},
				s = function(e) {
					return window.jQuery && e instanceof jQuery ? e[0] : e.nodeType && 1 === e.nodeType ? e : document.getElementById(e)
				},
				c = function(e) {
					var t, n, r, i, o = [];
					if ("INTEGER" === e.typeName() && (t = e.posContent(), n = e.posEnd(), r = e.stream.hexDump(t, n).replace(/[ \n]/g, ""), o.push(r)), null !== e.sub)
						for (i = 0; i < e.sub.length; i++) o = o.concat(c(e.sub[i]));
					return o
				},
				u = function(e) {
					var t, n, r = [],
						i = e.children;
					for (n = 0; n < i.length; n++) t = i[n], 1 === t.nodeType && t.attributes["data-encrypted-name"] ? r.push(t) : t.children && t.children.length > 0 && (r = r.concat(u(t)));
					return r
				},
				l = function() {
					var n, r, o, a, s, u;
					try {
						s = i(e), n = t.decode(s)
					} catch (l) {
						throw "Invalid encryption key. Please use the key labeled 'Client-Side Encryption Key'"
					}
					if (o = c(n), 2 !== o.length) throw "Invalid encryption key. Please use the key labeled 'Client-Side Encryption Key'";
					return a = o[0], r = o[1], u = new J, u.setPublic(a, r), u
				},
				f = function() {
					return {
						key: lt.random.randomWords(8, 0),
						sign: function(e) {
							var t = new lt.misc.hmac(this.key, lt.hash.sha256),
								n = t.encrypt(e);
							return lt.codec.base64.fromBits(n)
						}
					}
				};
			r.encrypt = function(e) {
				var t = l(),
					i = ft.generateAesKey(),
					o = f(),
					a = i.encrypt(e),
					s = o.sign(lt.codec.base64.toBits(a)),
					c = lt.bitArray.concat(i.key, o.key),
					u = lt.codec.base64.fromBits(c),
					d = t.encrypt(u),
					p = "$bt4|javascript_" + r.version.replace(/\./g, "_") + "$",
					h = null;
				return d && (h = n(d)), p + h + "$" + a + "$" + s
			}, r.encryptForm = function(e) {
				var t, n, i, c, l, f;
				for (e = s(e), f = u(e); o.length > 0;) {
					try {
						e.removeChild(o[0])
					} catch (d) {}
					o.splice(0, 1)
				}
				for (l = 0; l < f.length; l++) t = f[l], i = t.getAttribute("data-encrypted-name"), n = r.encrypt(t.value), t.removeAttribute("name"), c = a("input", {
					value: n,
					type: "hidden",
					name: i
				}), o.push(c), e.appendChild(c)
			}, r.onSubmitEncryptForm = function(e, t) {
				var n;
				e = s(e), n = function(n) {
					return r.encryptForm(e), t ? t(n) : n
				}, window.jQuery ? window.jQuery(e).submit(n) : e.addEventListener ? e.addEventListener("submit", n, !1) : e.attachEvent && e.attachEvent("onsubmit", n)
			}, r.formEncrypter = {
				encryptForm: r.encryptForm,
				extractForm: s,
				onSubmitEncryptForm: r.onSubmitEncryptForm
			}, lt.random.startCollectors()
		}, window.Braintree = ft, "function" == typeof define && define("braintree", function() {
			return ft
		})
	}(),
	function() {
		function e(e) {
			switch (e) {
				case null:
				case void 0:
					return "";
				case !0:
					return "1";
				case !1:
					return "0";
				default:
					return encodeURIComponent(e)
			}
		}
		var t = window || t,
			n = t.braintree || {},
			r = n.Utils || {};
		r.makeQueryString = function(t, n) {
			var i, o, a = [];
			for (o in t)
				if (t.hasOwnProperty(o)) {
					var s = t[o];
					i = n ? n + "[" + o + "]" : o, "object" == typeof s ? a.push(r.makeQueryString(s, i)) : void 0 !== s && null !== s && a.push(e(i) + "=" + e(s))
				}
			return a.join("&")
		}, r.decodeQueryString = function(e) {
			for (var t = {}, n = e.split("&"), r = 0; r < n.length; r++) {
				var i = n[r].split("="),
					o = i[0],
					a = decodeURIComponent(i[1]);
				t[o] = a
			}
			return t
		}, r.getParams = function(e) {
			var t = e.split("?");
			return 2 !== t.length ? {} : n.Utils.decodeQueryString(t[1])
		}, r.isFunction = function(e) {
			return "[object Function]" === Object.prototype.toString.call(e)
		}, r.bind = function(e, t) {
			return function() {
				e.apply(t, arguments)
			}
		}, r.addEventListener = function(e, t, n) {
			e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent && e.attachEvent("on" + t, n)
		}, r.removeEventListener = function(e, t, n) {
			e.removeEventListener ? e.removeEventListener(t, n, !1) : e.detachEvent && e.detachEvent("on" + t, n)
		}, r.normalizeElement = function(e, t) {
			if (t = t || "[" + e + "] is not a valid DOM Element", e && e.nodeType && 1 === e.nodeType) return e;
			if (e && window.jQuery && e instanceof jQuery && 0 !== e.length) return e[0];
			if ("string" == typeof e && document.getElementById(e)) return document.getElementById(e);
			throw new Error(t)
		}, n.Utils = r, t.braintree = n
	}(),
	function() {
		function e(e) {
			this.host = e || window, this.handlers = [], n.Utils.addEventListener(this.host, "message", n.Utils.bind(this.receive, this))
		}
		var t = window || t,
			n = t.braintree || {};
		e.prototype.receive = function(t) {
			var n, r, i, o;
			try {
				i = JSON.parse(t.data)
			} catch (a) {
				return
			}
			for (o = i.type, r = new e.Message(this, t.source, i.data), n = 0; n < this.handlers.length; n++) this.handlers[n].type === o && this.handlers[n].handler(r)
		}, e.prototype.send = function(e, t, n) {
			e.postMessage(JSON.stringify({
				type: t,
				data: n
			}), "*")
		}, e.prototype.register = function(e, t) {
			this.handlers.push({
				type: e,
				handler: t
			})
		}, e.prototype.unregister = function(e, t) {
			for (var n = this.handlers.length - 1; n >= 0; n--)
				if (this.handlers[n].type === e && this.handlers[n].handler === t) return this.handlers.splice(n, 1)
		}, e.Message = function(e, t, n) {
			this.bus = e, this.source = t, this.content = n
		}, e.Message.prototype.reply = function(e, t) {
			this.bus.send(this.source, e, t)
		}, n.MessageBus = e, t.braintree = n
	}(),
	function() {
		function e(e) {
			this.bus = e, this.methods = {}, this.bus.register("rpc_request", n.Utils.bind(this._handleRequest, this))
		}
		var t = window || t,
			n = t.braintree || {};
		e.prototype._handleRequest = function(e) {
			var t, n = e.content,
				r = n.args || [],
				i = this.methods[n.method];
			"function" == typeof i && (t = function() {
				e.reply("rpc_response", {
					id: n.id,
					response: Array.prototype.slice.call(arguments)
				})
			}, r.push(t), i.apply(null, r))
		}, e.prototype.define = function(e, t) {
			this.methods[e] = t
		}, n.RPCServer = e, t.braintree = n
	}(),
	function() {
		function e(e, t) {
			this.bus = e, this.target = t || window.parent, this.counter = 0, this.callbacks = {}, this.bus.register("rpc_response", n.Utils.bind(this._handleResponse, this))
		}
		var t = window || t,
			n = t.braintree || {};
		e.prototype._handleResponse = function(e) {
			var t = e.content,
				n = this.callbacks[t.id];
			"function" == typeof n && (n.apply(null, t.response), delete this.callbacks[t.id])
		}, e.prototype.invoke = function(e, t, n) {
			var r = this.counter++;
			this.callbacks[r] = n, this.bus.send(this.target, "rpc_request", {
				id: r,
				method: e,
				args: t
			})
		}, n.RPCClient = e, t.braintree = n
	}(),
	function(e) {
		"use strict";
		var t = e.braintree || {};
		t.api = t.api || {}, t.api.configure = function(e) {
			return new t.api.Client(e)
		}, t.api.parseClientToken = function(e) {
			var t;
			if (!e) throw new Error("Braintree API Client Misconfigured: clientToken required.");
			if ("object" == typeof e && null !== e) t = e;
			else {
				try {
					e = atob(e)
				} catch (n) {}
				try {
					t = JSON.parse(e)
				} catch (r) {
					throw new Error("Braintree API Client Misconfigured: clientToken is invalid.")
				}
			} if (!t.hasOwnProperty("authUrl") || !t.hasOwnProperty("clientApiUrl")) throw new Error("Braintree API Client Misconfigured: clientToken is invalid.");
			return t
		}, e.braintree = t
	}(this),
	function(e) {
		"use strict";

		function t(e, t) {
			return e.status >= 400 ? [e, null] : [null, t(e)]
		}

		function n(e) {
			var t;
			this.attrs = {}, e.hasOwnProperty("sharedCustomerIdentifier") && (this.attrs.sharedCustomerIdentifier = e.sharedCustomerIdentifier), t = i.api.parseClientToken(e.clientToken), this.driver = e.driver || i.api.JSONPDriver, this.authUrl = t.authUrl, this.analyticsUrl = t.analytics ? t.analytics.url : void 0, this.clientApiUrl = t.clientApiUrl, this.customerId = e.customerId, this.challenges = t.challenges, this.attrs.authorizationFingerprint = t.authorizationFingerprint, this.attrs.sharedCustomerIdentifierType = e.sharedCustomerIdentifierType, this.timeoutWatchers = [], this.requestTimeout = e.hasOwnProperty("timeout") ? e.timeout : 6e4
		}

		function r(e, t) {
			var n, r = {};
			for (n in e) e.hasOwnProperty(n) && (r[n] = e[n]);
			for (n in t) t.hasOwnProperty(n) && (r[n] = t[n]);
			return r
		}
		var i = e.braintree || {};
		i.api = i.api || {}, n.prototype.requestWithTimeout = function(e, n, r, i, o) {
			var a = this,
				s = i(e, n, function(e, n) {
					if (a.timeoutWatchers[n]) {
						clearTimeout(a.timeoutWatchers[n]);
						var i = t(e, function(e) {
							return r(e)
						});
						o.apply(null, i)
					}
				});
			a.requestTimeout > 0 ? this.timeoutWatchers[s] = setTimeout(function() {
				a.timeoutWatchers[s] = null, o.apply(null, [{
						errors: "Unknown error"
					},
					null
				])
			}, a.requestTimeout) : o.apply(null, [{
					errors: "Unknown error"
				},
				null
			])
		}, n.prototype.post = function(e, t, n, r) {
			this.requestWithTimeout(e, t, n, this.driver.post, r)
		}, n.prototype.get = function(e, t, n, r) {
			this.requestWithTimeout(e, t, n, this.driver.get, r)
		}, n.prototype.put = function(e, t, n, r) {
			this.requestWithTimeout(e, t, n, this.driver.put, r)
		}, n.prototype.getCreditCards = function(t) {
			this.get(i.api.util.joinUrlFragments([this.clientApiUrl, "v1", "payment_methods"]), this.attrs, function(t) {
				var n = 0,
					r = t.paymentMethods.length,
					i = [];
				for (n; r > n; n++) i.push(new e.braintree.api.CreditCard(t.paymentMethods[n]));
				return i
			}, t)
		}, n.prototype.tokenizeCard = function(e, t) {
			e.options = {
				validate: !1
			}, this.addCreditCard(e, function(e, n) {
				n && n.nonce ? t(e, n.nonce) : t("Unable to tokenize card.", null)
			})
		}, n.prototype.addSEPAMandate = function(t, n) {
			var o = r(this.attrs, {
				sepaMandate: t
			});
			this.post(i.api.util.joinUrlFragments([this.clientApiUrl, "v1", "sepa_mandates.json"]), o, function(t) {
				return new e.braintree.api.SEPAMandate(t.sepaMandates[0])
			}, n)
		}, n.prototype.acceptSEPAMandate = function(t, n) {
			this.put(i.api.util.joinUrlFragments([this.clientApiUrl, "v1", "sepa_mandates", t, "accept"]), this.attrs, function(t) {
				return new e.braintree.api.SEPABankAccount(t.sepaBankAccounts[0])
			}, n)
		}, n.prototype.getSEPAMandate = function(t, n) {
			var o;
			o = t.paymentMethodToken ? r(this.attrs, {
				paymentMethodToken: t.paymentMethodToken
			}) : this.attrs, this.get(i.api.util.joinUrlFragments([this.clientApiUrl, "v1", "sepa_mandates", t.mandateReferenceNumber || ""]), o, function(t) {
				return new e.braintree.api.SEPAMandate(t.sepaMandates[0])
			}, n)
		}, n.prototype.addCreditCard = function(t, n) {
			var o = t.share;
			delete t.share;
			var a = r(this.attrs, {
				share: o,
				creditCard: t
			});
			this.post(i.api.util.joinUrlFragments([this.clientApiUrl, "v1", "payment_methods/credit_cards"]), a, function(t) {
				return new e.braintree.api.CreditCard(t.creditCards[0])
			}, n)
		}, n.prototype.unlockCreditCard = function(t, n, o) {
			var a = r(this.attrs, {
				challengeResponses: n
			});
			this.put(i.api.util.joinUrlFragments([this.clientApiUrl, "v1", "payment_methods/", t.nonce]), a, function(t) {
				return new e.braintree.api.CreditCard(t.paymentMethods[0])
			}, o)
		}, n.prototype.sendAnalyticsEvents = function(n, i) {
			var o, a, s, c = this,
				u = [];
			if (n = e.braintree.api.util.isArray(n) ? n : [n], !this.analyticsUrl) return void(i && i.apply(null, [null, {}]));
			for (var l in n) n.hasOwnProperty(l) && u.push({
				kind: n[l]
			});
			o = this.analyticsUrl, a = r(this.attrs, {
				analytics: u
			}), s = this.driver.post(o, a, function(e, n) {
				if (c.timeoutWatchers[n]) {
					clearTimeout(c.timeoutWatchers[n]);
					var r = t(e, function(e) {
						return e
					});
					i && i.apply(null, r)
				}
			}), this.timeoutWatchers[s] = setTimeout(function() {
				c.timeoutWatchers[s] = null, i.apply(null, [{
						errors: "Unknown error"
					},
					null
				])
			}, this.requestTimeout)
		}, i.api.Client = n, e.braintree = i
	}(this),
	function(e) {
		"use strict";

		function t(e) {
			for (var t = 0; t < r.length; t++) {
				var n = r[t];
				this[n] = e[n]
			}
		}
		var n = e.braintree || {};
		n.api = n.api || {};
		var r = ["billingAddress", "branding", "createdAt", "createdAtMerchant", "createdAtMerchantName", "details", "isLocked", "lastUsedAt", "lastUsedAtMerchant", "lastUsedAtMerchantName", "lastUsedByCurrentMerchant", "nonce", "securityQuestions", "type"];
		n.api.CreditCard = t, e.braintree = n
	}(this),
	function(e) {
		"use strict";
		var t = e.braintree || {};
		t.api = t.api || {}, t.api.JSONPDriver = {}, t.api.JSONPDriver.get = function(e, n, r) {
			return t.api.JSONP.get(e, n, r)
		}, t.api.JSONPDriver.post = function(e, n, r) {
			return n._method = "POST", t.api.JSONP.get(e, n, r)
		}, t.api.JSONPDriver.put = function(e, n, r) {
			return n._method = "PUT", t.api.JSONP.get(e, n, r)
		}, e.braintree = t
	}(this),
	function(e) {
		function t(e, t) {
			var n = document.createElement("script"),
				r = !1;
			n.src = e, n.async = !0;
			var i = t || l.error;
			"function" == typeof i && (n.onerror = function(t) {
				i({
					url: e,
					event: t
				})
			}), n.onload = n.onreadystatechange = function() {
				r || this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState || (r = !0, n.onload = n.onreadystatechange = null, n && n.parentNode && n.parentNode.removeChild(n))
			}, s || (s = document.getElementsByTagName("head")[0]), s.appendChild(n)
		}

		function n(e, t) {
			var r, i, o = [];
			for (var i in e) v = e[i], r = t ? a.api.util.isArray(e) ? t + "[]" : t + "[" + i + "]" : i, o.push("object" == typeof v ? n(v, r) : encodeURIComponent(r) + "=" + encodeURIComponent(v));
			return o.join("&")
		}

		function r(e, r, i, a) {
			var s = -1 === (e || "").indexOf("?") ? "?" : "&";
			a = a || l.callbackName || "callback";
			var f = a + "_json" + ++c;
			return s += n(o(r)), u[f] = function(e) {
				i(e, f);
				try {
					delete u[f]
				} catch (t) {}
				u[f] = null
			}, t(e + s + "&" + a + "=" + f), f
		}

		function i(e) {
			l = e
		}

		function o(e) {
			return e.braintreeLibraryVersion = "js/" + a.api.version, e
		}
		var a = e.braintree || {};
		a.api = a.api || {};
		var s, c = 0,
			u = this,
			l = {};
		a.api.JSONP = {
			get: r,
			init: i,
			stringify: n,
			populateParams: o
		}, e.braintree = a
	}(this),
	function(e) {
		"use strict";
		e.atob = e.atob || function(e) {
			var t = new RegExp("^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})([=]{1,2})?$"),
				n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
				r = "";
			if (!t.test(e)) throw new Error("Braintree API Client Misconfigured: clientToken is invalid.");
			var i = 0;
			do {
				var o = n.indexOf(e.charAt(i++)),
					a = n.indexOf(e.charAt(i++)),
					s = n.indexOf(e.charAt(i++)),
					c = n.indexOf(e.charAt(i++)),
					u = (63 & o) << 2 | a >> 4 & 3,
					l = (15 & a) << 4 | s >> 2 & 15,
					f = (3 & s) << 6 | 63 & c;
				r += String.fromCharCode(u) + (l ? String.fromCharCode(l) : "") + (f ? String.fromCharCode(f) : "")
			} while (i < e.length);
			return r
		}
	}(this),
	function(e) {
		"use strict";

		function t(e) {
			for (var t = 0; t < r.length; t++) {
				var n = r[t];
				this[n] = e[n]
			}
		}
		var n = e.braintree || {};
		n.api = n.api || {};
		var r = ["bic", "maskedIBAN", "nonce", "accountHolderName"];
		n.api.SEPABankAccount = t, e.braintree = n
	}(this),
	function(e) {
		"use strict";

		function t(e) {
			for (var t = 0; t < r.length; t++) {
				var n = r[t];
				this[n] = e[n]
			}
		}
		var n = e.braintree || {};
		n.api = n.api || {};
		var r = ["accountHolderName", "bic", "longFormURL", "mandateReferenceNumber", "maskedIBAN", "shortForm"];
		n.api.SEPAMandate = t, e.braintree = n
	}(this),
	function(e) {
		"use strict";
		var t = e.braintree || {};
		t.api = t.api || {}, t.api.testing = {}, t.api.testing.createClient = function(n, r) {
			var i = n.driver || t.api.JSONPDriver,
				o = n.sharedCustomerIdentifier || Math.random() + "",
				a = t.api.util.joinUrlFragments([e.GATEWAY_HOST + ":" + e.GATEWAY_PORT, "merchants", n.merchantId]),
				s = {
					merchantId: n.merchantId,
					publicKey: n.publicKey,
					customer: n.customer,
					sharedCustomerIdentifierType: "testing",
					sharedCustomerIdentifier: o,
					baseUrl: a
				};
			n.creditCard && (s.creditCard = n.creditCard), n.SEPAMandateType && (s.sepaMandateType = n.SEPAMandateType), i.post(t.api.util.joinUrlFragments([a, "client_api/testing/setup"]), s, function(e) {
				n.clientToken = JSON.stringify({
					authUrl: "fake_auth_url",
					clientApiUrl: t.api.util.joinUrlFragments([a, "client_api"]),
					authorizationFingerprint: e.authorizationFingerprint,
					analytics: n && n.analytics ? n.analytics : {}
				}), n.sharedCustomerIdentifier = o, n.sharedCustomerIdentifierType = "testing", n.customerId = e.token;
				var i = new t.api.Client(n);
				r(i)
			})
		}, e.braintree = t
	}(this),
	function(e) {
		"use strict";

		function t() {}
		var n = e.braintree || {};
		n.api = n.api || {}, t.prototype.joinUrlFragments = function(e) {
			var t, n, r = [];
			for (n = 0; n < e.length; n++) t = e[n], "/" === t.charAt(t.length - 1) && (t = t.substring(0, t.length - 1)), "/" === t.charAt(0) && (t = t.substring(1)), r.push(t);
			return r.join("/")
		}, t.prototype.isArray = function(e) {
			return e && "object" == typeof e && "number" == typeof e.length && "[object Array]" === Object.prototype.toString.call(e) || !1
		}, n.api.util = new t
	}(this),
	function(e) {
		"use strict";
		var t = "1.0.0",
			n = e.braintree || {};
		n.api = n.api || {}, n.api.version = t
	}(this),
	function(e) {
		"use strict";

		function t(e) {
			if ("object" == typeof e) return e;
			var t = "payment_method_nonce";
			"string" == typeof e && (t = e);
			var n = document.createElement("input");
			return n.name = t, n.type = "hidden", n
		}

		function n(e) {
			for (var t = e.getElementsByTagName("*"), n = {}, r = 0; r < t.length; r++) {
				var i = t[r].getAttribute("data-braintree-name");
				n[i] = !0
			}
			if (!n.number) throw 'Unable to find an input with data-braintree-name="number" in your form. Please add one.';
			if (n.expiration_date) {
				if (n.expiration_month || n.expiration_year) throw 'You have inputs with data-braintree-name="expiration_date" AND data-braintree-name="expiration_(year|month)". Please use either "expiration_date" or "expiration_year" and "expiration_month".'
			} else {
				if (!n.expiration_month && !n.expiration_year) throw 'Unable to find an input with data-braintree-name="expiration_date" in your form. Please add one.';
				if (!n.expiration_month) throw 'Unable to find an input with data-braintree-name="expiration_month" in your form. Please add one.';
				if (!n.expiration_year) throw 'Unable to find an input with data-braintree-name="expiration_year" in your form. Please add one.'
			}
		}
		var r = e.braintree || {};
		r.Form = function(e, t, n) {
			this.client = e, this.htmlForm = t, this.paymentMethodNonce = n
		}, r.Form.setup = function(e, i) {
			var o = document.getElementById(i.id);
			if (!o) throw 'Unable to find form with id: "' + i.id + '"';
			n(o);
			var a = t(i.paymentMethodNonceInputField);
			o.appendChild(a);
			var s = new r.Form(e, o, a);
			return s.hijackForm(), s
		}, r.Form.prototype.registerAsyncTaskOnSubmit = function(e, t) {
			function n(n) {
				n.preventDefault ? n.preventDefault() : n.returnValue = !1, t(function() {
					i(), "function" == typeof e.submit ? e.submit() : setTimeout(function() {
						e.querySelector('[type="submit"]').click()
					}, 1)
				})
			}

			function r() {
				e.addEventListener ? e.addEventListener("submit", n) : e.attachEvent && e.attachEvent("onsubmit", n)
			}

			function i() {
				e.removeEventListener ? e.removeEventListener("submit", n) : e.detachEvent && e.detachEvent("onsubmit", n)
			}
			r()
		}, r.Form.prototype.hijackForm = function() {
			var e = this;
			this.registerAsyncTaskOnSubmit(this.htmlForm, function(t) {
				return e.paymentMethodNonce.value && "" !== e.paymentMethodNonce.value ? void t() : void e.client.tokenizeCard(e.extractValues(e.htmlForm), function(n, r) {
					if (n) throw "Unable to process payments at this time.";
					e.paymentMethodNonce.value = r, t()
				})
			})
		}, r.Form.prototype.extractValues = function(e, t) {
			t = t || {};
			var n, r, i = e.children;
			for (r = 0; r < i.length; r++)
				if (n = i[r], 1 === n.nodeType && n.attributes["data-braintree-name"]) {
					var o = n.getAttribute("data-braintree-name");
					"postal_code" === o ? t.billingAddress = {
						postalCode: n.value
					} : t[o] = n.value, this.scrubAttributes(n)
				} else n.children && n.children.length > 0 && this.extractValues(n, t);
			return t
		}, r.Form.prototype.scrubAttributes = function(e) {
			try {
				e.attributes.removeNamedItem("name")
			} catch (t) {}
		}, e.braintree = r
	}(this),
	function() {
		"use strict";
		! function() {
			var e = window.braintree || {};
			e.paypal = e.paypal || {}, window.braintree = e
		}(),
		function() {
			braintree.paypal.VERSION = [1, 0, 0].join("."), braintree.paypal.constants = {
				POPUP_NAME: "braintree_paypal_popup",
				POPUP_PATH: "/pwpp/" + braintree.paypal.VERSION + "/html/braintree-frame.html",
				POPUP_OPTIONS: "height=470,width=410,resizable=true"
			}
		}(),
		function() {
			braintree.paypal.browser = {}, braintree.paypal.browser.DEFAULT_POPUP_TARGET = "braintree_paypal_external_popup", braintree.paypal.browser.DEFAULT_POPUP_HEIGHT = 600, braintree.paypal.browser.DEFAULT_POPUP_WIDTH = 800, braintree.paypal.browser.isMobile = function() {
				return braintree.paypal.browser.isMobileDevice() && window.outerWidth < 600
			}, braintree.paypal.browser.isMobileDevice = function() {
				return /Android|webOS|iPhone|iPod|iOS|Blackberry/i.test(window.navigator.userAgent)
			}, braintree.paypal.browser.detectedPostMessage = function() {
				return !!window.postMessage
			}, braintree.paypal.browser.isPopupSupported = function() {
				return /pwpp=popup/.test(document.location.search)
			}, braintree.paypal.browser.popup = function(e, t) {
				t || (t = {}), t.target = t.target || e.target || braintree.paypal.browser.DEFAULT_POPUP_TARGET, t.height = t.height || braintree.paypal.browser.DEFAULT_POPUP_HEIGHT, t.width = t.width || braintree.paypal.browser.DEFAULT_POPUP_WIDTH;
				var n = "undefined" != typeof e.href ? e.href : String(e),
					r = t.target || e.target,
					i = [];
				for (var o in t)
					if (t.hasOwnProperty(o)) switch (o) {
						case "width":
						case "height":
						case "top":
						case "left":
							i.push(o + "=" + t[o]);
							break;
						case "target":
						case "noreferrer":
							break;
						default:
							i.push(o + "=" + (t[o] ? 1 : 0))
					}
					var a = i.join(","),
						s = window.open(n, r, a);
				return s ? (s.focus(), !1) : !0
			}
		}(),
		function() {
			braintree.paypal.dom = {}, braintree.paypal.dom.setTextContent = function(e, t) {
				var n = "innerText";
				document && document.body && "textContent" in document.body && (n = "textContent"), e[n] = t
			}, braintree.paypal.dom.normalizeElement = function(e) {
				if (e && e.nodeType && 1 === e.nodeType) return e;
				if (e && window.jQuery && e instanceof jQuery && 0 !== e.length) return e[0];
				if ("string" == typeof e && document.getElementById(e)) return document.getElementById(e);
				throw new Error("[" + e + "] is not a valid DOM Element")
			}
		}(),
		function() {
			braintree.paypal.util = {}, braintree.paypal.util.trim = "function" == typeof String.prototype.trim ? function(e) {
				return e.trim()
			} : function(e) {
				return e.replace(/^\s+|\s+$/, "")
			}, braintree.paypal.util.btoa = "function" == typeof window.btoa ? function(e) {
				return window.btoa(e)
			} : function(e) {
				for (var t, n, r, i, o, a, s, c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", u = "", l = 0; l < e.length;) t = e.charCodeAt(l++), n = e.charCodeAt(l++), r = e.charCodeAt(l++), i = t >> 2, o = (3 & t) << 4 | n >> 4, a = (15 & n) << 2 | r >> 6, s = 63 & r, isNaN(n) ? a = s = 64 : isNaN(r) && (s = 64), u = u + c.charAt(i) + c.charAt(o) + c.charAt(a) + c.charAt(s);
				return u
			}, braintree.paypal.util.generateUid = function() {
				for (var e = "", t = 0; 32 > t; t++) {
					var n = Math.floor(16 * Math.random());
					e += n.toString(16)
				}
				return e
			}, braintree.paypal.util.castToBoolean = function(e) {
				return /^(true|1)$/i.test(e)
			}
		}(),
		function() {
			braintree.paypal.create = function(e, t) {
				if (!braintree.paypal.browser.detectedPostMessage()) return void("function" == typeof t.onUnsupported && t.onUnsupported(new Error("unsupported browser detected")));
				var n = new braintree.paypal.Client(e, t);
				return n.initialize(), n
			}
		}(),
		function() {
			function e(e) {
				this.options = e, this.container = this.createViewContainer(), this.createPayPalName(), this.emailNode = this.createEmailNode(), this.logoutNode = this.createLogoutNode()
			}
			e.prototype.createViewContainer = function() {
				var e = document.createElement("div");
				e.id = "braintree-paypal-loggedin";
				var t = ["display: none", "max-width: 500px", "overflow: hidden", "padding: 16px", "background-image: url(/images/paypal/paypal-small.png)", "background-image: url(/images/paypal/paypal-small.svg), none", "background-position: 20px 50%", "background-repeat: no-repeat", "background-size: 13px 15px", "border-top: 1px solid #d1d4d6", "border-bottom: 1px solid #d1d4d6"].join(";");
				return e.style.cssText = t, this.options.container.appendChild(e), e
			}, e.prototype.createPayPalName = function() {
				var e = document.createElement("span");
				e.id = "bt-pp-name", e.innerHTML = "PayPal";
				var t = ["color: #283036", "font-size: 13px", "font-weight: 800", 'font-family: "Helvetica Neue", Helvetica, Arial, sans-serif', "margin-left: 36px", "-webkit-font-smoothing: antialiased", "-moz-font-smoothing: antialiased", "-ms-font-smoothing: antialiased", "font-smoothing: antialiased"].join(";");
				return e.style.cssText = t, this.container.appendChild(e)
			}, e.prototype.createEmailNode = function() {
				var e = document.createElement("span");
				e.id = "bt-pp-email";
				var t = ["color: #6e787f", "font-size: 13px", 'font-family: "Helvetica Neue", Helvetica, Arial, sans-serif', "margin-left: 5px", "-webkit-font-smoothing: antialiased", "-moz-font-smoothing: antialiased", "-ms-font-smoothing: antialiased", "font-smoothing: antialiased"].join(";");
				return e.style.cssText = t, this.container.appendChild(e)
			}, e.prototype.createLogoutNode = function() {
				var e = document.createElement("button");
				e.id = "bt-pp-cancel", e.innerHTML = "Cancel";
				var t = ["color: #3d95ce", "font-size: 11px", 'font-family: "Helvetica Neue", Helvetica, Arial, sans-serif', "line-height: 20px", "margin: 0 0 0 25px", "padding: 0", "background-color: transparent", "border: 0", "cursor: pointer", "text-decoration: underline", "float: right", "-webkit-font-smoothing: antialiased", "-moz-font-smoothing: antialiased", "-ms-font-smoothing: antialiased", "font-smoothing: antialiased"].join(";");
				return e.style.cssText = t, this.container.appendChild(e)
			}, e.prototype.show = function() {
				this.container.style.display = "block"
			}, e.prototype.hide = function() {
				this.container.style.display = "none"
			}, braintree.paypal.LoggedInView = e
		}(),
		function() {
			function e(e) {
				this.options = e, this.assetsUrl = this.options.assetsUrl, this.container = this.createViewContainer(), this.buttonNode = this.createPayWithPayPalButton()
			}
			e.prototype.createViewContainer = function() {
				var e = document.createElement("div");
				return e.id = "braintree-paypal-loggedout", this.options.container.appendChild(e), e
			}, e.prototype.createPayWithPayPalButton = function() {
				var e = document.createElement("a");
				e.id = "braintree-paypal-button", e.href = "#";
				var t = ["display: block", "width: 115px", "height: 44px", "overflow: hidden"].join(";");
				e.style.cssText = t;
				var n = new Image;
				n.src = "/images/paypal/pay-with-paypal.png", n.setAttribute("alt", "Pay with PayPal");
				var r = ["max-width: 100%", "display: block", "width: 100%", "height: 100%", "outline: none", "border: 0"].join(";");
				return n.style.cssText = r, e.appendChild(n), this.container.appendChild(e)
			}, e.prototype.show = function() {
				this.container.style.display = "block"
			}, e.prototype.hide = function() {
				this.container.style.display = "none"
			}, braintree.paypal.LoggedOutView = e
		}(),
		function() {
			function e(e) {
				var t = window.getComputedStyle ? getComputedStyle(e) : e.currentStyle;
				return {
					overflow: t.overflow || "",
					height: e.style.height || ""
				}
			}

			function t() {
				return {
					html: {
						node: document.documentElement,
						styles: e(document.documentElement)
					},
					body: {
						node: document.body,
						styles: e(document.body)
					}
				}
			}

			function n(e, t) {
				t = t || {}, this.clientToken = e, this.parsedClientToken = this._parseClientToken(e), this.parsedClientToken && t.displayName && (this.parsedClientToken.paypalDisplayName = t.displayName), this.locale = t.locale || "en", this.singleUse = t.singleUse || !1, this.demoMode = t.demo || !1, this.container = t.container, this.merchantPageDefaultStyles = null, this.paymentMethodNonceInputField = t.paymentMethodNonceInputField, this.frame = null, this.popup = null, this.communicationFrame = null, this.windowResizeListener = braintree.Utils.bind(this._handleWindowResize, this), this.insertFrameFunction = t.insertFrame, this.onSuccess = t.onSuccess, this.onCancelled = t.onCancelled, this.onUnsupported = t.onUnsupported, this.rpcServer = null, this.loggedInView = null, this.loggedOutView = null, this.insertUI = !0
			}
			n.prototype.initialize = function() {
				return this._isPayPalEnabled() ? this._hasSecureBrowserProtocol() ? (this._setupDomElements(), this._setupPaymentMethodNonceInputField(), this._setupViews(), void this._setupRPCServer()) : void("function" == typeof this.onUnsupported && this.onUnsupported(new Error("unsupported protocol detected"))) : void("function" == typeof this.onUnsupported && this.onUnsupported(new Error("PayPal is not enabled")))
			}, n.prototype._isPayPalEnabled = function() {
				return !(!this.parsedClientToken || !this.parsedClientToken.paypalEnabled)
			}, n.prototype._hasSecureBrowserProtocol = function() {
				return /https/.test(window.location.protocol) || this.parsedClientToken.paypalAllowHttp
			}, n.prototype._canBeInitialized = function() {
				return this._isPayPalEnabled() && this._hasSecureBrowserProtocol()
			}, n.prototype._setupDomElements = function() {
				this.insertUI && (this.container = braintree.paypal.dom.normalizeElement(this.container))
			}, n.prototype._setupPaymentMethodNonceInputField = function() {
				if (this.insertUI) {
					var e = this.paymentMethodNonceInputField;
					braintree.Utils.isFunction(e) || (e = void 0 !== e ? braintree.paypal.dom.normalizeElement(e) : this._createPaymentMethodNonceInputField(), this.paymentMethodNonceInputField = e)
				}
			}, n.prototype._setupViews = function() {
				this.insertUI && (this.loggedInView = new braintree.paypal.LoggedInView({
					container: this.container,
					assetsUrl: this.parsedClientToken.assetsUrl
				}), this.loggedOutView = new braintree.paypal.LoggedOutView({
					assetsUrl: this.parsedClientToken.assetsUrl,
					container: this.container
				}), braintree.Utils.addEventListener(this.loggedOutView.buttonNode, "click", braintree.Utils.bind(this._handleButtonClick, this)), braintree.Utils.addEventListener(this.loggedInView.logoutNode, "click", braintree.Utils.bind(this._handleLogout, this)))
			}, n.prototype._setupRPCServer = function() {
				var e = new braintree.MessageBus(window);
				this.rpcServer = new braintree.RPCServer(e, window), this.rpcServer.define("closePayPalModal", braintree.Utils.bind(this._handleCloseMessage, this)), this.rpcServer.define("receivePayPalData", braintree.Utils.bind(this._handleSuccessfulAuthentication, this))
			}, n.prototype._createFrameUrl = function() {
				var e = "";
				return e += this.parsedClientToken.assetsUrl + "/pwpp/" + braintree.paypal.VERSION + "/html/braintree-frame.html", e += "?locale=" + this.locale, e += "&singleUse=" + this.singleUse, e += "&demo=" + this.demoMode, e += "&displayName=" + encodeURIComponent(this.parsedClientToken.paypalDisplayName), e += "&clientApiUrl=" + this.parsedClientToken.clientApiUrl, e += "&authUrl=" + this.parsedClientToken.authUrl, e += "&authorizationFingerprint=" + this.parsedClientToken.authorizationFingerprint, e += "&paypalBaseUrl=" + this.parsedClientToken.paypalBaseUrl, e += "&paypalClientId=" + this.parsedClientToken.paypalClientId, e += "&paypalPrivacyUrl=" + this.parsedClientToken.paypalPrivacyUrl, e += "&paypalUserAgreementUrl=" + this.parsedClientToken.paypalUserAgreementUrl, e += "&offline=" + this.parsedClientToken.paypalEnvironmentNoNetwork
			}, n.prototype._createPaymentMethodNonceInputField = function() {
				var e = document.createElement("input");
				return e.name = "payment_method_nonce", e.type = "hidden", this.container.appendChild(e)
			}, n.prototype._createFrame = function() {
				var e = this._createFrameUrl(),
					t = document.createElement("iframe");
				return t.src = e, t.id = "braintree-paypal-frame", t.allowTransparency = !0, t.height = "100%", t.width = "100%", t.frameBorder = 0, t.style.position = braintree.paypal.browser.isMobile() ? "absolute" : "fixed", t.style.top = 0, t.style.left = 0, t.style.bottom = 0, t.style.zIndex = 20001, t.style.padding = 0, t.style.margin = 0, t.style.border = 0, t.style.outline = "none", t
			}, n.prototype._removeFrame = function(e) {
				e = e || document.body, this.frame && e.contains(this.frame) && (e.removeChild(this.frame), this._unlockMerchantWindowSize())
			}, n.prototype._insertFrame = function() {
				this.insertFrameFunction ? this.insertFrameFunction(this._createFrameUrl()) : (this.frame = this._createFrame(), document.body.appendChild(this.frame)), this._lockMerchantWindowSize()
			}, n.prototype._handleButtonClick = function(e) {
				e.preventDefault ? e.preventDefault() : e.returnValue = !1, this._open()
			}, n.prototype._setMerchantPageDefaultStyles = function() {
				this.merchantPageDefaultStyles = t()
			}, n.prototype._open = function() {
				braintree.paypal.browser.isPopupSupported() ? this._openPopup() : this._openModal()
			}, n.prototype._close = function() {
				braintree.paypal.browser.isPopupSupported() ? this._closePopup() : this._closeModal()
			}, n.prototype._openModal = function() {
				this._removeFrame(), this._insertFrame()
			}, n.prototype._openPopup = function() {
				var e = braintree.paypal.constants.POPUP_NAME,
					t = braintree.paypal.constants.POPUP_OPTIONS;
				return this.popup = window.open(this._createFrameUrl(), e, t), this.popup.focus(), this.popup
			}, n.prototype._closeModal = function() {
				this._removeFrame()
			}, n.prototype._closePopup = function() {
				this.popup && (this.popup.close(), this.popup = null)
			}, n.prototype._handleSuccessfulAuthentication = function(e, t) {
				braintree.Utils.isFunction(this.onSuccess) && this.onSuccess(e, t), this._close(), braintree.Utils.isFunction(this.paymentMethodNonceInputField) ? this.paymentMethodNonceInputField(e) : (this._showLoggedInContent(t), this._setNonceInputValue(e))
			}, n.prototype._lockMerchantWindowSize = function() {
				this._setMerchantPageDefaultStyles(), document.documentElement.style.overflow = "hidden", document.body.style.height = "100%", document.body.style.overflow = "hidden", braintree.paypal.browser.isMobile() && (window.scrollTo(0, 0), this._updateMerchantWindowHeight(document.documentElement.clientHeight), braintree.Utils.addEventListener("resize", this.windowResizeListener))
			}, n.prototype._unlockMerchantWindowSize = function() {
				this.merchantPageDefaultStyles && (document.documentElement.style.height = this.merchantPageDefaultStyles.html.styles.height, document.documentElement.style.overflow = this.merchantPageDefaultStyles.html.styles.overflow, document.body.style.height = this.merchantPageDefaultStyles.body.styles.height, document.body.style.overflow = this.merchantPageDefaultStyles.body.styles.overflow), braintree.Utils.removeEventListener("resize", this.windowResizeListener)
			}, n.prototype._handleWindowResize = function() {
				this._updateMerchantWindowHeight(document.documentElement.clientHeight)
			}, n.prototype._updateMerchantWindowHeight = function(e) {
				document.documentElement.style.height = e + "px", this.frame.style.minHeight = e + "px"
			}, n.prototype._handleCloseMessage = function() {
				this._removeFrame()
			}, n.prototype._showLoggedInContent = function(e) {
				this.loggedOutView.hide(), braintree.paypal.dom.setTextContent(this.loggedInView.emailNode, e), this.loggedInView.show()
			}, n.prototype._handleLogout = function(e) {
				e.preventDefault ? e.preventDefault() : e.returnValue = !1, this.loggedInView.hide(), this.loggedOutView.show(), this._setNonceInputValue(""), braintree.Utils.isFunction(this.onCancelled) && this.onCancelled()
			}, n.prototype._setNonceInputValue = function(e) {
				this.paymentMethodNonceInputField.value = e
			}, n.prototype._parseClientToken = function(e) {
				if (!e || 0 === e.length) throw new Error("clientToken not provided.");
				var t = braintree.api.parseClientToken(e);
				return t.paypalEnabled ? {
					assetsUrl: t.paypal.assetsUrl,
					authUrl: t.authUrl,
					authorizationFingerprint: encodeURIComponent(t.authorizationFingerprint),
					clientApiUrl: encodeURIComponent(t.clientApiUrl),
					paypalAllowHttp: braintree.paypal.util.castToBoolean(t.paypal.allowHttp),
					paypalBaseUrl: t.paypal.assetsUrl,
					paypalClientId: t.paypal.clientId,
					paypalDisplayName: t.paypal.displayName,
					paypalEnvironmentNoNetwork: braintree.paypal.util.castToBoolean(t.paypal.environmentNoNetwork),
					paypalPrivacyUrl: encodeURIComponent(t.paypal.privacyUrl),
					paypalUserAgreementUrl: encodeURIComponent(t.paypal.userAgreementUrl),
					paypalEnabled: braintree.paypal.util.castToBoolean(t.paypalEnabled)
				} : !1
			}, braintree.paypal.Client = n
		}()
	}(),
	function() {
		"use strict";
		! function() {
			var e = e || window,
				t = e.braintree || {};
			t.dropin = t.dropin || {}, t.dropin.version = "1.0.4", t.dropin.Shared = {}, t.dropin.InlineFrame = {}, e.braintree = t
		}(),
		function() {
			braintree.dropin.create = function(e, t) {
				t.clientToken = e;
				var n = new braintree.dropin.Client(t);
				return n.initialize(), n
			}
		}(),
		function() {
			function e(e) {
				this.form = e.form, this.frames = e.frames, this.onSubmit = e.onSubmit, this.apiClient = e.apiClient
			}
			e.prototype.initialize = function() {
				return this._isSubmitBased() && this._setElements(), this._setEvents(), this
			}, e.prototype.writeNonce = function(e) {
				this.currentNonce = e
			}, e.prototype._isSubmitBased = function() {
				return !this.onSubmit
			}, e.prototype._isCallbackBased = function() {
				return !!this.onSubmit
			}, e.prototype._setElements = function() {
				if (!this.form.payment_method_nonce) {
					var e = document.createElement("input");
					e.type = "hidden", e.name = "payment_method_nonce", this.form.appendChild(e)
				}
				this.nonceField = this.form.payment_method_nonce
			}, e.prototype._setEvents = function() {
				var e = this;
				braintree.Utils.addEventListener(this.form, "submit", function() {
					e._handleFormSubmit.apply(e, arguments)
				})
			}, e.prototype._handleFormSubmit = function(e) {
				this._shouldSubmit() || (e && e.preventDefault ? e.preventDefault() : e.returnValue = !1, this.currentNonce ? this._handleNonceReply(e) : this.frames.inline.rpcClient.invoke("requestNonce", [], braintree.Utils.bind(function(t) {
					this.writeNonce(t), this._handleNonceReply(e)
				}, this)))
			}, e.prototype._shouldSubmit = function() {
				return this._isCallbackBased() ? !1 : this.nonceField.value.length > 0
			}, e.prototype._handleNonceReply = function(e) {
				this._isCallbackBased() ? this.apiClient.sendAnalyticsEvents("dropin.web.end.callback", braintree.Utils.bind(function() {
					this.onSubmit(e, this.currentNonce), setTimeout(braintree.Utils.bind(function() {
						this.frames.inline.rpcClient.invoke("clearLoadingState")
					}, this), 200)
				}, this)) : this._triggerFormSubmission()
			}, e.prototype._triggerFormSubmission = function() {
				this.nonceField.value = this.currentNonce, this.apiClient.sendAnalyticsEvents("dropin.web.end.auto-submit", braintree.Utils.bind(function() {
					"function" == typeof this.form.submit ? this.form.submit() : this.form.querySelector('[type="submit"]').click()
				}, this))
			}, braintree.dropin.MerchantFormManager = e
		}(),
		function() {
			function e(e, t) {
				var n = window.getComputedStyle ? getComputedStyle(e) : e.currentStyle;
				return n[t]
			}

			function t() {
				return {
					html: {
						height: i.style.height || "",
						overflow: e(i, "overflow"),
						position: e(i, "position")
					},
					body: {
						height: o.style.height || "",
						overflow: e(o, "overflow")
					}
				}
			}

			function n() {
				var e = /Android|iPhone|iPod|iPad/i.test(window.navigator.userAgent);
				return e
			}

			function r(e) {
				var t, n, r, a = braintree.dropin.version;
				this.encodedClientToken = e.clientToken, this.paypalOptions = e.paypal, this.container = null, this.merchantFormManager = null, this.root = e.root, this.configurationRequests = [], this.braintreeApiClient = braintree.api.configure({
					clientToken: e.clientToken
				}), this.paymentMethodNonceReceivedCallback = e.paymentMethodNonceReceived, this.clientToken = braintree.api.parseClientToken(e.clientToken), this.bus = new braintree.MessageBus(this.root), this.rpcServer = new braintree.RPCServer(this.bus), this.apiProxyServer = new braintree.dropin.APIProxyServer(this.braintreeApiClient), this.apiProxyServer.attach(this.rpcServer), t = e.inlineFramePath || this.clientToken.assetsUrl + "/dropin/" + a + "/inline_frame.html", n = e.modalFramePath || this.clientToken.assetsUrl + "/dropin/" + a + "/modal_frame.html", i = document.documentElement, o = document.body, this.frames = {
					inline: this._createFrame(t),
					modal: this._createFrame(n)
				}, this.container = braintree.Utils.normalizeElement(e.container, "Unable to find valid container."), r = braintree.Utils.normalizeElement(e.form || this._findClosest(this.container, "form")), this.merchantFormManager = new braintree.dropin.MerchantFormManager({
					form: r,
					frames: this.frames,
					onSubmit: this.paymentMethodNonceReceivedCallback,
					apiClient: this.braintreeApiClient
				}).initialize(), this.clientToken.paypalEnabled && this._configurePayPal(), this.braintreeApiClient.sendAnalyticsEvents("dropin.web.initialized")
			}
			var i, o;
			r.prototype.initialize = function() {
				var e = this;
				this._initializeModal(), this.container.appendChild(this.frames.inline.element), o.appendChild(this.frames.modal.element), this.rpcServer.define("receiveSharedCustomerIdentifier", function(t) {
					e.braintreeApiClient.attrs.sharedCustomerIdentifier = t, e.braintreeApiClient.attrs.sharedCustomerIdentifierType = "browser_session_cookie_store";
					for (var n = 0; n < e.configurationRequests.length; n++) e.configurationRequests[n](e.encodedClientToken);
					e.configurationRequests = []
				}), this.rpcServer.define("getConfiguration", function(t) {
					t(e.encodedClientToken)
				}), this.rpcServer.define("getPayPalOptions", function(t) {
					t(e.paypalOptions)
				}), this.rpcServer.define("selectPaymentMethod", function(t) {
					e.frames.modal.rpcClient.invoke("selectPaymentMethod", [t]), e._showModal()
				}), this.rpcServer.define("sendAddedPaymentMethod", function(t) {
					e.merchantFormManager.writeNonce(t.nonce), e.frames.inline.rpcClient.invoke("receiveNewPaymentMethod", [t])
				}), this.rpcServer.define("sendUsedPaymentMethod", function(t) {
					e.frames.inline.rpcClient.invoke("selectPaymentMethod", [t])
				}), this.rpcServer.define("sendUnlockedNonce", function(t) {
					e.merchantFormManager.writeNonce(t)
				}), this.rpcServer.define("clearNonce", function() {
					e.merchantFormManager.writeNonce("")
				}), this.rpcServer.define("closeDropInModal", function() {
					e._hideModal()
				}), this.rpcServer.define("setInlineFrameHeight", function(t) {
					e.frames.inline.element.style.height = t + "px"
				}), this.bus.register("ready", function(t) {
					t.source === e.frames.inline.element.contentWindow ? e.frames.inline.rpcClient = new braintree.RPCClient(e.bus, t.source) : t.source === e.frames.modal.element.contentWindow && (e.frames.modal.rpcClient = new braintree.RPCClient(e.bus, t.source))
				})
			}, r.prototype._createFrame = function(e) {
				return new braintree.dropin.FrameContainer(e)
			}, r.prototype._initializeModal = function() {
				this.frames.modal.element.style.display = "none", this.frames.modal.element.style.position = n() ? "absolute" : "fixed", this.frames.modal.element.style.top = "0", this.frames.modal.element.style.left = "0", this.frames.modal.element.style.height = "100%", this.frames.modal.element.style.width = "100%"
			}, r.prototype._lockMerchantWindowSize = function() {
				setTimeout(function() {
					i.style.overflow = "hidden", o.style.overflow = "hidden", o.style.height = "100%", n() && (i.style.position = "relative", i.style.height = window.innerHeight + "px")
				}, 160)
			}, r.prototype._unlockMerchantWindowSize = function() {
				var e = this.merchantPageDefaultStyles;
				o.style.height = e.body.height, o.style.overflow = e.body.overflow, i.style.overflow = e.html.overflow, n() && (i.style.height = e.html.height, i.style.position = e.html.position)
			}, r.prototype._showModal = function() {
				var e = this,
					n = this.frames.modal.element;
				this.merchantPageDefaultStyles = t(), n.style.display = "block", this.frames.modal.rpcClient.invoke("open", [], function() {
					setTimeout(function() {
						e._lockMerchantWindowSize(), n.contentWindow.focus()
					}, 200)
				})
			}, r.prototype._hideModal = function() {
				this._unlockMerchantWindowSize(), this.frames.modal.element.style.display = "none"
			}, r.prototype._configurePayPal = function() {
				braintree.paypal.browser.isPopupSupported() || (this.ppClient = new braintree.dropin.PayPalService({
					clientToken: this.clientToken,
					paypal: this.paypalOptions
				}), this.rpcServer.define("openPayPalModal", braintree.Utils.bind(this.ppClient._openModal, this.ppClient))), this.rpcServer.define("receivePayPalData", braintree.Utils.bind(this._handlePayPalData, this))
			}, r.prototype._handlePayPalData = function(e, t) {
				this.merchantFormManager.writeNonce(e), this.frames.inline.rpcClient.invoke("receiveNewPaymentMethod", [{
					nonce: e,
					email: t
				}]), this.frames.modal.rpcClient.invoke("paypalViewClose")
			}, r.prototype._findClosest = function(e, t) {
				t = t.toUpperCase();
				do
					if (e.nodeName === t) return e;
				while (e = e.parentNode);
				throw "Unable to find a valid " + t
			}, braintree.dropin.Client = r
		}(),
		function() {
			function e(e) {
				this.apiClient = e
			}
			var t = ["getCreditCards", "unlockCreditCard", "sendAnalyticsEvents"];
			e.prototype.attach = function(e) {
				function n(t) {
					e.define(t, function() {
						r.apiClient[t].apply(r.apiClient, arguments)
					})
				}
				var r = this,
					i = 0,
					o = t.length;
				for (i; o > i; i++) n(t[i])
			}, braintree.dropin.APIProxyServer = e
		}(),
		function() {
			function e(e) {
				this.element = document.createElement("iframe"), this.element.setAttribute("allowtransparency", "true"), this.element.setAttribute("width", "100%"), this.element.setAttribute("height", "68"), this.element.setAttribute("style", "-webkit-transition: height 210ms cubic-bezier(0.390, 0.575, 0.565, 1.000); -moz-transition: height 210ms cubic-bezier(0.390, 0.575, 0.565, 1.000); -ms-transition: height 210ms cubic-bezier(0.390, 0.575, 0.565, 1.000); -o-transition: height 210ms cubic-bezier(0.390, 0.575, 0.565, 1.000); transition: height 210ms cubic-bezier(0.390, 0.575, 0.565, 1.000);"), this.element.src = e, this.element.setAttribute("frameborder", "0"), this.element.setAttribute("allowtransparency", "true"), this.element.style.border = "0", this.element.style.zIndex = "9999"
			}
			braintree.dropin.FrameContainer = e
		}(),
		function() {
			function e(e) {
				var t = e.clientToken,
					n = e.paypal || {},
					r = new braintree.paypal.Client(t, {
						container: document.createElement("div"),
						displayName: n.displayName,
						locale: n.locale,
						singleUse: n.singleUse,
						onSuccess: n.onSuccess
					});
				return r.initialize(), r
			}
			braintree.dropin.PayPalService = e
		}()
	}(this),
	function(e) {
		var t = e.braintree || {};
		t.setup = function(e, n, r) {
			if ("dropin" === n || "paypal" === n) t[n].create(e, r);
			else {
				if ("custom" !== n) throw new Error(n + " is an unsupported integration");
				var i = new t.api.Client({
						clientToken: e
					}),
					o = t.Form.setup(i, r);
				r.paypal && (void 0 == r.paypal.paymentMethodNonceInputField && (r.paypal.paymentMethodNonceInputField = o.paymentMethodNonce), t.paypal.create(e, r.paypal))
			}
		}, t.cse = Braintree
	}(this);
var deviceIsAndroid = navigator.userAgent.indexOf("Android") > 0,
	deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent),
	deviceIsIOS4 = deviceIsIOS && /OS 4_\d(_\d)?/.test(navigator.userAgent),
	deviceIsIOSWithBadTarget = deviceIsIOS && /OS ([6-9]|\d{2})_\d/.test(navigator.userAgent);
FastClick.prototype.needsClick = function(e) {
		"use strict";
		switch (e.nodeName.toLowerCase()) {
			case "button":
			case "select":
			case "textarea":
				if (e.disabled) return !0;
				break;
			case "input":
				if (deviceIsIOS && "file" === e.type || e.disabled) return !0;
				break;
			case "label":
			case "video":
				return !0
		}
		return /\bneedsclick\b/.test(e.className)
	}, FastClick.prototype.needsFocus = function(e) {
		"use strict";
		switch (e.nodeName.toLowerCase()) {
			case "textarea":
				return !0;
			case "select":
				return !deviceIsAndroid;
			case "input":
				switch (e.type) {
					case "button":
					case "checkbox":
					case "file":
					case "image":
					case "radio":
					case "submit":
						return !1
				}
				return !e.disabled && !e.readOnly;
			default:
				return /\bneedsfocus\b/.test(e.className)
		}
	}, FastClick.prototype.sendClick = function(e, t) {
		"use strict";
		var n, r;
		document.activeElement && document.activeElement !== e && document.activeElement.blur(), r = t.changedTouches[0], n = document.createEvent("MouseEvents"), n.initMouseEvent(this.determineEventType(e), !0, !0, window, 1, r.screenX, r.screenY, r.clientX, r.clientY, !1, !1, !1, !1, 0, null), n.forwardedTouchEvent = !0, e.dispatchEvent(n)
	}, FastClick.prototype.determineEventType = function(e) {
		"use strict";
		return deviceIsAndroid && "select" === e.tagName.toLowerCase() ? "mousedown" : "click"
	}, FastClick.prototype.focus = function(e) {
		"use strict";
		var t;
		deviceIsIOS && e.setSelectionRange && 0 !== e.type.indexOf("date") && "time" !== e.type ? (t = e.value.length, e.setSelectionRange(t, t)) : e.focus()
	}, FastClick.prototype.updateScrollParent = function(e) {
		"use strict";
		var t, n;
		if (t = e.fastClickScrollParent, !t || !t.contains(e)) {
			n = e;
			do {
				if (n.scrollHeight > n.offsetHeight) {
					t = n, e.fastClickScrollParent = n;
					break
				}
				n = n.parentElement
			} while (n)
		}
		t && (t.fastClickLastScrollTop = t.scrollTop)
	}, FastClick.prototype.getTargetElementFromEventTarget = function(e) {
		"use strict";
		return e.nodeType === Node.TEXT_NODE ? e.parentNode : e
	}, FastClick.prototype.onTouchStart = function(e) {
		"use strict";
		var t, n, r;
		if (e.targetTouches.length > 1) return !0;
		if (t = this.getTargetElementFromEventTarget(e.target), n = e.targetTouches[0], deviceIsIOS) {
			if (r = window.getSelection(), r.rangeCount && !r.isCollapsed) return !0;
			if (!deviceIsIOS4) {
				if (n.identifier === this.lastTouchIdentifier) return e.preventDefault(), !1;
				this.lastTouchIdentifier = n.identifier, this.updateScrollParent(t)
			}
		}
		return this.trackingClick = !0, this.trackingClickStart = e.timeStamp, this.targetElement = t, this.touchStartX = n.pageX, this.touchStartY = n.pageY, e.timeStamp - this.lastClickTime < this.tapDelay && e.preventDefault(), !0
	}, FastClick.prototype.touchHasMoved = function(e) {
		"use strict";
		var t = e.changedTouches[0],
			n = this.touchBoundary;
		return Math.abs(t.pageX - this.touchStartX) > n || Math.abs(t.pageY - this.touchStartY) > n ? !0 : !1
	}, FastClick.prototype.onTouchMove = function(e) {
		"use strict";
		return this.trackingClick ? ((this.targetElement !== this.getTargetElementFromEventTarget(e.target) || this.touchHasMoved(e)) && (this.trackingClick = !1, this.targetElement = null), !0) : !0
	}, FastClick.prototype.findControl = function(e) {
		"use strict";
		return void 0 !== e.control ? e.control : e.htmlFor ? document.getElementById(e.htmlFor) : e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
	}, FastClick.prototype.onTouchEnd = function(e) {
		"use strict";
		var t, n, r, i, o, a = this.targetElement;
		if (!this.trackingClick) return !0;
		if (e.timeStamp - this.lastClickTime < this.tapDelay) return this.cancelNextClick = !0, !0;
		if (this.cancelNextClick = !1, this.lastClickTime = e.timeStamp, n = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, deviceIsIOSWithBadTarget && (o = e.changedTouches[0], a = document.elementFromPoint(o.pageX - window.pageXOffset, o.pageY - window.pageYOffset) || a, a.fastClickScrollParent = this.targetElement.fastClickScrollParent), r = a.tagName.toLowerCase(), "label" === r) {
			if (t = this.findControl(a)) {
				if (this.focus(a), deviceIsAndroid) return !1;
				a = t
			}
		} else if (this.needsFocus(a)) return e.timeStamp - n > 100 || deviceIsIOS && window.top !== window && "input" === r ? (this.targetElement = null, !1) : (this.focus(a), this.sendClick(a, e), deviceIsIOS && "select" === r || (this.targetElement = null, e.preventDefault()), !1);
		return deviceIsIOS && !deviceIsIOS4 && (i = a.fastClickScrollParent, i && i.fastClickLastScrollTop !== i.scrollTop) ? !0 : (this.needsClick(a) || (e.preventDefault(), this.sendClick(a, e)), !1)
	}, FastClick.prototype.onTouchCancel = function() {
		"use strict";
		this.trackingClick = !1, this.targetElement = null
	}, FastClick.prototype.onMouse = function(e) {
		"use strict";
		return this.targetElement ? e.forwardedTouchEvent ? !0 : e.cancelable && (!this.needsClick(this.targetElement) || this.cancelNextClick) ? (e.stopImmediatePropagation ? e.stopImmediatePropagation() : e.propagationStopped = !0, e.stopPropagation(), e.preventDefault(), !1) : !0 : !0
	}, FastClick.prototype.onClick = function(e) {
		"use strict";
		var t;
		return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : "submit" === e.target.type && 0 === e.detail ? !0 : (t = this.onMouse(e), t || (this.targetElement = null), t)
	}, FastClick.prototype.destroy = function() {
		"use strict";
		var e = this.layer;
		deviceIsAndroid && (e.removeEventListener("mouseover", this.onMouse, !0), e.removeEventListener("mousedown", this.onMouse, !0), e.removeEventListener("mouseup", this.onMouse, !0)), e.removeEventListener("click", this.onClick, !0), e.removeEventListener("touchstart", this.onTouchStart, !1), e.removeEventListener("touchmove", this.onTouchMove, !1), e.removeEventListener("touchend", this.onTouchEnd, !1), e.removeEventListener("touchcancel", this.onTouchCancel, !1)
	}, FastClick.notNeeded = function(e) {
		"use strict";
		var t, n;
		if ("undefined" == typeof window.ontouchstart) return !0;
		if (n = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) {
			if (!deviceIsAndroid) return !0;
			if (t = document.querySelector("meta[name=viewport]")) {
				if (-1 !== t.content.indexOf("user-scalable=no")) return !0;
				if (n > 31 && window.innerWidth <= window.screen.width) return !0
			}
		}
		return "none" === e.style.msTouchAction ? !0 : !1
	}, FastClick.attach = function(e, t) {
		"use strict";
		return new FastClick(e, t)
	}, "undefined" != typeof define && define.amd ? define(function() {
		"use strict";
		return FastClick
	}) : "undefined" != typeof module && module.exports ? (module.exports = FastClick.attach, module.exports.FastClick = FastClick) : window.FastClick = FastClick,
	function() {
		var e, t, n, r, i, o, a, s, c, u, l, f, d, p, h = [].indexOf || function(e) {
			for (var t = 0, n = this.length; n > t; t++)
				if (t in this && this[t] === e) return t;
			return -1
		};
		c = "[ ]", t = "[x]", s = function(e) {
			return e.replace(/([\[\]])/g, "\\$1").replace(/\s/, "\\s").replace("x", "[xX]")
		}, u = RegExp("" + s(c)), n = RegExp("" + s(t)), l = RegExp("^(?:\\s*(?:>\\s*)*(?:[-+*]|(?:\\d+\\.)))\\s*(" + s(t) + "|" + s(c) + ")\\s+(?!\\(.*?\\))(?=(?:\\[.*?\\]\\s*(?:\\[.*?\\]|\\(.*?\\))\\s*)*(?:[^\\[]|$))"), e = /^`{3}(?:\s*\w+)?[\S\s].*[\S\s]^`{3}$/gm, f = RegExp("^(" + s(t) + "|" + s(c) + ").+$", "g"), p = function(r, i, o) {
			var a, s, d, p;
			return a = r.replace(/\r/g, "").replace(e, "").replace(f, "").split("\n"), s = 0, p = function() {
				var e, f, p, m;
				for (p = r.split("\n"), m = [], e = 0, f = p.length; f > e; e++) d = p[e], h.call(a, d) >= 0 && d.match(l) && (s += 1, s === i && (d = o ? d.replace(u, t) : d.replace(n, c))), m.push(d);
				return m
			}(), p.join("\n")
		}, d = function(e) {
			var t, n, r, i, o;
			return t = e.closest(".js-task-list-container"), n = t.find(".js-task-list-field"), o = 1 + t.find(".task-list-item-checkbox").index(e), r = e.prop("checked"), i = $.Event("tasklist:change"), n.trigger(i, [o, r]), i.isDefaultPrevented() ? void 0 : (n.val(p(n.val(), o, r)), n.trigger("change"), n.trigger("tasklist:changed", [o, r]))
		}, $(document).on("change", ".task-list-item-checkbox", function() {
			return d($(this))
		}), o = function(e) {
			return e.find(".js-task-list-field").length > 0 ? (e.find(".task-list-item").addClass("enabled").find(".task-list-item-checkbox").attr("disabled", null), e.addClass("is-task-list-enabled").trigger("tasklist:enabled")) : void 0
		}, a = function(e) {
			var t, n, r, i;
			for (i = [], n = 0, r = e.length; r > n; n++) t = e[n], i.push(o($(t)));
			return i
		}, r = function(e) {
			return e.find(".task-list-item").removeClass("enabled").find(".task-list-item-checkbox").attr("disabled", "disabled"), e.removeClass("is-task-list-enabled").trigger("tasklist:disabled")
		}, i = function(e) {
			var t, n, i, o;
			for (o = [], n = 0, i = e.length; i > n; n++) t = e[n], o.push(r($(t)));
			return o
		}, $.fn.taskList = function(e) {
			var t, n;
			return t = $(this).closest(".js-task-list-container"), n = {
				enable: a,
				disable: i
			}, n[e || "enable"](t)
		}
	}.call(this),
	/*!
	 * ZeroClipboard
	 * The ZeroClipboard library provides an easy way to copy text to the clipboard using an invisible Adobe Flash movie and a JavaScript interface.
	 * Copyright (c) 2014 Jon Rohan, James M. Greene
	 * Licensed MIT
	 * http://zeroclipboard.org/
	 * v2.1.6
	 */
	function(e, t) {
		"use strict";
		var n, r, i = e,
			o = i.document,
			a = i.navigator,
			s = i.setTimeout,
			c = i.encodeURIComponent,
			u = i.ActiveXObject,
			l = i.Error,
			f = i.Number.parseInt || i.parseInt,
			d = i.Number.parseFloat || i.parseFloat,
			p = i.Number.isNaN || i.isNaN,
			h = i.Math.round,
			m = i.Date.now,
			v = i.Object.keys,
			g = i.Object.defineProperty,
			y = i.Object.prototype.hasOwnProperty,
			b = i.Array.prototype.slice,
			w = function() {
				var e = function(e) {
					return e
				};
				if ("function" == typeof i.wrap && "function" == typeof i.unwrap) try {
					var t = o.createElement("div"),
						n = i.unwrap(t);
					1 === t.nodeType && n && 1 === n.nodeType && (e = i.unwrap)
				} catch (r) {}
				return e
			}(),
			x = function(e) {
				return b.call(e, 0)
			},
			E = function() {
				var e, n, r, i, o, a, s = x(arguments),
					c = s[0] || {};
				for (e = 1, n = s.length; n > e; e++)
					if (null != (r = s[e]))
						for (i in r) y.call(r, i) && (o = c[i], a = r[i], c !== a && a !== t && (c[i] = a));
				return c
			},
			T = function(e) {
				var t, n, r, i;
				if ("object" != typeof e || null == e) t = e;
				else if ("number" == typeof e.length)
					for (t = [], n = 0, r = e.length; r > n; n++) y.call(e, n) && (t[n] = T(e[n]));
				else {
					t = {};
					for (i in e) y.call(e, i) && (t[i] = T(e[i]))
				}
				return t
			},
			_ = function(e, t) {
				for (var n = {}, r = 0, i = t.length; i > r; r++) t[r] in e && (n[t[r]] = e[t[r]]);
				return n
			},
			C = function(e, t) {
				var n = {};
				for (var r in e) - 1 === t.indexOf(r) && (n[r] = e[r]);
				return n
			},
			k = function(e) {
				if (e)
					for (var t in e) y.call(e, t) && delete e[t];
				return e
			},
			S = function(e, t) {
				if (e && 1 === e.nodeType && e.ownerDocument && t && (1 === t.nodeType && t.ownerDocument && t.ownerDocument === e.ownerDocument || 9 === t.nodeType && !t.ownerDocument && t === e.ownerDocument))
					do {
						if (e === t) return !0;
						e = e.parentNode
					} while (e);
				return !1
			},
			A = function(e) {
				var t;
				return "string" == typeof e && e && (t = e.split("#")[0].split("?")[0], t = e.slice(0, e.lastIndexOf("/") + 1)), t
			},
			N = function(e) {
				var t, n;
				return "string" == typeof e && e && (n = e.match(/^(?:|[^:@]*@|.+\)@(?=http[s]?|file)|.+?\s+(?: at |@)(?:[^:\(]+ )*[\(]?)((?:http[s]?|file):\/\/[\/]?.+?\/[^:\)]*?)(?::\d+)(?::\d+)?/), n && n[1] ? t = n[1] : (n = e.match(/\)@((?:http[s]?|file):\/\/[\/]?.+?\/[^:\)]*?)(?::\d+)(?::\d+)?/), n && n[1] && (t = n[1]))), t
			},
			D = function() {
				var e, t;
				try {
					throw new l
				} catch (n) {
					t = n
				}
				return t && (e = t.sourceURL || t.fileName || N(t.stack)), e
			},
			j = function() {
				var e, n, r;
				if (o.currentScript && (e = o.currentScript.src)) return e;
				if (n = o.getElementsByTagName("script"), 1 === n.length) return n[0].src || t;
				if ("readyState" in n[0])
					for (r = n.length; r--;)
						if ("interactive" === n[r].readyState && (e = n[r].src)) return e;
				return "loading" === o.readyState && (e = n[n.length - 1].src) ? e : (e = D()) ? e : t
			},
			P = function() {
				var e, n, r, i = o.getElementsByTagName("script");
				for (e = i.length; e--;) {
					if (!(r = i[e].src)) {
						n = null;
						break
					}
					if (r = A(r), null == n) n = r;
					else if (n !== r) {
						n = null;
						break
					}
				}
				return n || t
			},
			L = function() {
				var e = A(j()) || P() || "";
				return e + "ZeroClipboard.swf"
			},
			O = {
				bridge: null,
				version: "0.0.0",
				pluginType: "unknown",
				disabled: null,
				outdated: null,
				unavailable: null,
				deactivated: null,
				overdue: null,
				ready: null
			},
			I = "11.0.0",
			M = {},
			$ = {},
			F = null,
			R = {
				ready: "Flash communication is established",
				error: {
					"flash-disabled": "Flash is disabled or not installed",
					"flash-outdated": "Flash is too outdated to support ZeroClipboard",
					"flash-unavailable": "Flash is unable to communicate bidirectionally with JavaScript",
					"flash-deactivated": "Flash is too outdated for your browser and/or is configured as click-to-activate",
					"flash-overdue": "Flash communication was established but NOT within the acceptable time limit"
				}
			},
			U = {
				swfPath: L(),
				trustedDomains: e.location.host ? [e.location.host] : [],
				cacheBust: !0,
				forceEnhancedClipboard: !1,
				flashLoadTimeout: 3e4,
				autoActivate: !0,
				bubbleEvents: !0,
				containerId: "global-zeroclipboard-html-bridge",
				containerClass: "global-zeroclipboard-container",
				swfObjectId: "global-zeroclipboard-flash-bridge",
				hoverClass: "zeroclipboard-is-hover",
				activeClass: "zeroclipboard-is-active",
				forceHandCursor: !1,
				title: null,
				zIndex: 999999999
			},
			H = function(e) {
				if ("object" == typeof e && null !== e)
					for (var t in e)
						if (y.call(e, t))
							if (/^(?:forceHandCursor|title|zIndex|bubbleEvents)$/.test(t)) U[t] = e[t];
							else if (null == O.bridge)
					if ("containerId" === t || "swfObjectId" === t) {
						if (!nt(e[t])) throw new Error("The specified `" + t + "` value is not valid as an HTML4 Element ID");
						U[t] = e[t]
					} else U[t] = e[t]; {
						if ("string" != typeof e || !e) return T(U);
						if (y.call(U, e)) return U[e]
					}
			},
			B = function() {
				return {
					browser: _(a, ["userAgent", "platform", "appName"]),
					flash: C(O, ["bridge"]),
					zeroclipboard: {
						version: jt.version,
						config: jt.config()
					}
				}
			},
			z = function() {
				return !!(O.disabled || O.outdated || O.unavailable || O.deactivated)
			},
			q = function(e, t) {
				var n, r, i, o = {};
				if ("string" == typeof e && e) i = e.toLowerCase().split(/\s+/);
				else if ("object" == typeof e && e && "undefined" == typeof t)
					for (n in e) y.call(e, n) && "string" == typeof n && n && "function" == typeof e[n] && jt.on(n, e[n]);
				if (i && i.length) {
					for (n = 0, r = i.length; r > n; n++) e = i[n].replace(/^on/, ""), o[e] = !0, M[e] || (M[e] = []), M[e].push(t);
					if (o.ready && O.ready && jt.emit({
						type: "ready"
					}), o.error) {
						var a = ["disabled", "outdated", "unavailable", "deactivated", "overdue"];
						for (n = 0, r = a.length; r > n; n++)
							if (O[a[n]] === !0) {
								jt.emit({
									type: "error",
									name: "flash-" + a[n]
								});
								break
							}
					}
				}
				return jt
			},
			W = function(e, t) {
				var n, r, i, o, a;
				if (0 === arguments.length) o = v(M);
				else if ("string" == typeof e && e) o = e.split(/\s+/);
				else if ("object" == typeof e && e && "undefined" == typeof t)
					for (n in e) y.call(e, n) && "string" == typeof n && n && "function" == typeof e[n] && jt.off(n, e[n]);
				if (o && o.length)
					for (n = 0, r = o.length; r > n; n++)
						if (e = o[n].toLowerCase().replace(/^on/, ""), a = M[e], a && a.length)
							if (t)
								for (i = a.indexOf(t); - 1 !== i;) a.splice(i, 1), i = a.indexOf(t, i);
							else a.length = 0;
				return jt
			},
			V = function(e) {
				var t;
				return t = "string" == typeof e && e ? T(M[e]) || null : T(M)
			},
			X = function(e) {
				var t, n, r;
				return e = rt(e), e && !ut(e) ? "ready" === e.type && O.overdue === !0 ? jt.emit({
					type: "error",
					name: "flash-overdue"
				}) : (t = E({}, e), ct.call(this, t), "copy" === e.type && (r = mt($), n = r.data, F = r.formatMap), n) : void 0
			},
			Y = function() {
				if ("boolean" != typeof O.ready && (O.ready = !1), !jt.isFlashUnusable() && null === O.bridge) {
					var e = U.flashLoadTimeout;
					"number" == typeof e && e >= 0 && s(function() {
						"boolean" != typeof O.deactivated && (O.deactivated = !0), O.deactivated === !0 && jt.emit({
							type: "error",
							name: "flash-deactivated"
						})
					}, e), O.overdue = !1, pt()
				}
			},
			G = function() {
				jt.clearData(), jt.blur(), jt.emit("destroy"), ht(), jt.off()
			},
			J = function(e, t) {
				var n;
				if ("object" == typeof e && e && "undefined" == typeof t) n = e, jt.clearData();
				else {
					if ("string" != typeof e || !e) return;
					n = {}, n[e] = t
				}
				for (var r in n) "string" == typeof r && r && y.call(n, r) && "string" == typeof n[r] && n[r] && ($[r] = n[r])
			},
			K = function(e) {
				"undefined" == typeof e ? (k($), F = null) : "string" == typeof e && y.call($, e) && delete $[e]
			},
			Q = function(e) {
				return "undefined" == typeof e ? T($) : "string" == typeof e && y.call($, e) ? $[e] : void 0
			},
			Z = function(e) {
				if (e && 1 === e.nodeType) {
					n && (Tt(n, U.activeClass), n !== e && Tt(n, U.hoverClass)), n = e, Et(e, U.hoverClass);
					var t = e.getAttribute("title") || U.title;
					if ("string" == typeof t && t) {
						var r = dt(O.bridge);
						r && r.setAttribute("title", t)
					}
					var i = U.forceHandCursor === !0 || "pointer" === _t(e, "cursor");
					At(i), St()
				}
			},
			et = function() {
				var e = dt(O.bridge);
				e && (e.removeAttribute("title"), e.style.left = "0px", e.style.top = "-9999px", e.style.width = "1px", e.style.top = "1px"), n && (Tt(n, U.hoverClass), Tt(n, U.activeClass), n = null)
			},
			tt = function() {
				return n || null
			},
			nt = function(e) {
				return "string" == typeof e && e && /^[A-Za-z][A-Za-z0-9_:\-\.]*$/.test(e)
			},
			rt = function(e) {
				var t;
				if ("string" == typeof e && e ? (t = e, e = {}) : "object" == typeof e && e && "string" == typeof e.type && e.type && (t = e.type), t) {
					!e.target && /^(copy|aftercopy|_click)$/.test(t.toLowerCase()) && (e.target = r), E(e, {
						type: t.toLowerCase(),
						target: e.target || n || null,
						relatedTarget: e.relatedTarget || null,
						currentTarget: O && O.bridge || null,
						timeStamp: e.timeStamp || m() || null
					});
					var i = R[e.type];
					return "error" === e.type && e.name && i && (i = i[e.name]), i && (e.message = i), "ready" === e.type && E(e, {
						target: null,
						version: O.version
					}), "error" === e.type && (/^flash-(disabled|outdated|unavailable|deactivated|overdue)$/.test(e.name) && E(e, {
						target: null,
						minimumVersion: I
					}), /^flash-(outdated|unavailable|deactivated|overdue)$/.test(e.name) && E(e, {
						version: O.version
					})), "copy" === e.type && (e.clipboardData = {
						setData: jt.setData,
						clearData: jt.clearData
					}), "aftercopy" === e.type && (e = vt(e, F)), e.target && !e.relatedTarget && (e.relatedTarget = it(e.target)), e = ot(e)
				}
			},
			it = function(e) {
				var t = e && e.getAttribute && e.getAttribute("data-clipboard-target");
				return t ? o.getElementById(t) : null
			},
			ot = function(e) {
				if (e && /^_(?:click|mouse(?:over|out|down|up|move))$/.test(e.type)) {
					var n = e.target,
						r = "_mouseover" === e.type && e.relatedTarget ? e.relatedTarget : t,
						a = "_mouseout" === e.type && e.relatedTarget ? e.relatedTarget : t,
						s = kt(n),
						c = i.screenLeft || i.screenX || 0,
						u = i.screenTop || i.screenY || 0,
						l = o.body.scrollLeft + o.documentElement.scrollLeft,
						f = o.body.scrollTop + o.documentElement.scrollTop,
						d = s.left + ("number" == typeof e._stageX ? e._stageX : 0),
						p = s.top + ("number" == typeof e._stageY ? e._stageY : 0),
						h = d - l,
						m = p - f,
						v = c + h,
						g = u + m,
						y = "number" == typeof e.movementX ? e.movementX : 0,
						b = "number" == typeof e.movementY ? e.movementY : 0;
					delete e._stageX, delete e._stageY, E(e, {
						srcElement: n,
						fromElement: r,
						toElement: a,
						screenX: v,
						screenY: g,
						pageX: d,
						pageY: p,
						clientX: h,
						clientY: m,
						x: h,
						y: m,
						movementX: y,
						movementY: b,
						offsetX: 0,
						offsetY: 0,
						layerX: 0,
						layerY: 0
					})
				}
				return e
			},
			at = function(e) {
				var t = e && "string" == typeof e.type && e.type || "";
				return !/^(?:(?:before)?copy|destroy)$/.test(t)
			},
			st = function(e, t, n, r) {
				r ? s(function() {
					e.apply(t, n)
				}, 0) : e.apply(t, n)
			},
			ct = function(e) {
				if ("object" == typeof e && e && e.type) {
					var t = at(e),
						n = M["*"] || [],
						r = M[e.type] || [],
						o = n.concat(r);
					if (o && o.length) {
						var a, s, c, u, l, f = this;
						for (a = 0, s = o.length; s > a; a++) c = o[a], u = f, "string" == typeof c && "function" == typeof i[c] && (c = i[c]), "object" == typeof c && c && "function" == typeof c.handleEvent && (u = c, c = c.handleEvent), "function" == typeof c && (l = E({}, e), st(c, u, [l], t))
					}
					return this
				}
			},
			ut = function(e) {
				var t = e.target || n || null,
					i = "swf" === e._source;
				delete e._source;
				var o = ["flash-disabled", "flash-outdated", "flash-unavailable", "flash-deactivated", "flash-overdue"];
				switch (e.type) {
					case "error":
						-1 !== o.indexOf(e.name) && E(O, {
							disabled: "flash-disabled" === e.name,
							outdated: "flash-outdated" === e.name,
							unavailable: "flash-unavailable" === e.name,
							deactivated: "flash-deactivated" === e.name,
							overdue: "flash-overdue" === e.name,
							ready: !1
						});
						break;
					case "ready":
						var a = O.deactivated === !0;
						E(O, {
							disabled: !1,
							outdated: !1,
							unavailable: !1,
							deactivated: !1,
							overdue: a,
							ready: !a
						});
						break;
					case "beforecopy":
						r = t;
						break;
					case "copy":
						var s, c, u = e.relatedTarget;
						!$["text/html"] && !$["text/plain"] && u && (c = u.value || u.outerHTML || u.innerHTML) && (s = u.value || u.textContent || u.innerText) ? (e.clipboardData.clearData(), e.clipboardData.setData("text/plain", s), c !== s && e.clipboardData.setData("text/html", c)) : !$["text/plain"] && e.target && (s = e.target.getAttribute("data-clipboard-text")) && (e.clipboardData.clearData(), e.clipboardData.setData("text/plain", s));
						break;
					case "aftercopy":
						jt.clearData(), t && t !== xt() && t.focus && t.focus();
						break;
					case "_mouseover":
						jt.focus(t), U.bubbleEvents === !0 && i && (t && t !== e.relatedTarget && !S(e.relatedTarget, t) && lt(E({}, e, {
							type: "mouseenter",
							bubbles: !1,
							cancelable: !1
						})), lt(E({}, e, {
							type: "mouseover"
						})));
						break;
					case "_mouseout":
						jt.blur(), U.bubbleEvents === !0 && i && (t && t !== e.relatedTarget && !S(e.relatedTarget, t) && lt(E({}, e, {
							type: "mouseleave",
							bubbles: !1,
							cancelable: !1
						})), lt(E({}, e, {
							type: "mouseout"
						})));
						break;
					case "_mousedown":
						Et(t, U.activeClass), U.bubbleEvents === !0 && i && lt(E({}, e, {
							type: e.type.slice(1)
						}));
						break;
					case "_mouseup":
						Tt(t, U.activeClass), U.bubbleEvents === !0 && i && lt(E({}, e, {
							type: e.type.slice(1)
						}));
						break;
					case "_click":
						r = null, U.bubbleEvents === !0 && i && lt(E({}, e, {
							type: e.type.slice(1)
						}));
						break;
					case "_mousemove":
						U.bubbleEvents === !0 && i && lt(E({}, e, {
							type: e.type.slice(1)
						}))
				}
				return /^_(?:click|mouse(?:over|out|down|up|move))$/.test(e.type) ? !0 : void 0
			},
			lt = function(e) {
				if (e && "string" == typeof e.type && e) {
					var t, n = e.target || null,
						r = n && n.ownerDocument || o,
						a = {
							view: r.defaultView || i,
							canBubble: !0,
							cancelable: !0,
							detail: "click" === e.type ? 1 : 0,
							button: "number" == typeof e.which ? e.which - 1 : "number" == typeof e.button ? e.button : r.createEvent ? 0 : 1
						},
						s = E(a, e);
					n && r.createEvent && n.dispatchEvent && (s = [s.type, s.canBubble, s.cancelable, s.view, s.detail, s.screenX, s.screenY, s.clientX, s.clientY, s.ctrlKey, s.altKey, s.shiftKey, s.metaKey, s.button, s.relatedTarget], t = r.createEvent("MouseEvents"), t.initMouseEvent && (t.initMouseEvent.apply(t, s), t._source = "js", n.dispatchEvent(t)))
				}
			},
			ft = function() {
				var e = o.createElement("div");
				return e.id = U.containerId, e.className = U.containerClass, e.style.position = "absolute", e.style.left = "0px", e.style.top = "-9999px", e.style.width = "1px", e.style.height = "1px", e.style.zIndex = "" + Nt(U.zIndex), e
			},
			dt = function(e) {
				for (var t = e && e.parentNode; t && "OBJECT" === t.nodeName && t.parentNode;) t = t.parentNode;
				return t || null
			},
			pt = function() {
				var e, t = O.bridge,
					n = dt(t);
				if (!t) {
					var r = wt(i.location.host, U),
						a = "never" === r ? "none" : "all",
						s = yt(U),
						c = U.swfPath + gt(U.swfPath, U);
					n = ft();
					var u = o.createElement("div");
					n.appendChild(u), o.body.appendChild(n);
					var l = o.createElement("div"),
						f = "activex" === O.pluginType;
					l.innerHTML = '<object id="' + U.swfObjectId + '" name="' + U.swfObjectId + '" width="100%" height="100%" ' + (f ? 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"' : 'type="application/x-shockwave-flash" data="' + c + '"') + ">" + (f ? '<param name="movie" value="' + c + '"/>' : "") + '<param name="allowScriptAccess" value="' + r + '"/><param name="allowNetworking" value="' + a + '"/><param name="menu" value="false"/><param name="wmode" value="transparent"/><param name="flashvars" value="' + s + '"/></object>', t = l.firstChild, l = null, w(t).ZeroClipboard = jt, n.replaceChild(t, u)
				}
				return t || (t = o[U.swfObjectId], t && (e = t.length) && (t = t[e - 1]), !t && n && (t = n.firstChild)), O.bridge = t || null, t
			},
			ht = function() {
				var e = O.bridge;
				if (e) {
					var t = dt(e);
					t && ("activex" === O.pluginType && "readyState" in e ? (e.style.display = "none", function n() {
						if (4 === e.readyState) {
							for (var r in e) "function" == typeof e[r] && (e[r] = null);
							e.parentNode && e.parentNode.removeChild(e), t.parentNode && t.parentNode.removeChild(t)
						} else s(n, 10)
					}()) : (e.parentNode && e.parentNode.removeChild(e), t.parentNode && t.parentNode.removeChild(t))), O.ready = null, O.bridge = null, O.deactivated = null
				}
			},
			mt = function(e) {
				var t = {},
					n = {};
				if ("object" == typeof e && e) {
					for (var r in e)
						if (r && y.call(e, r) && "string" == typeof e[r] && e[r]) switch (r.toLowerCase()) {
							case "text/plain":
							case "text":
							case "air:text":
							case "flash:text":
								t.text = e[r], n.text = r;
								break;
							case "text/html":
							case "html":
							case "air:html":
							case "flash:html":
								t.html = e[r], n.html = r;
								break;
							case "application/rtf":
							case "text/rtf":
							case "rtf":
							case "richtext":
							case "air:rtf":
							case "flash:rtf":
								t.rtf = e[r], n.rtf = r
						}
						return {
							data: t,
							formatMap: n
						}
				}
			},
			vt = function(e, t) {
				if ("object" != typeof e || !e || "object" != typeof t || !t) return e;
				var n = {};
				for (var r in e)
					if (y.call(e, r)) {
						if ("success" !== r && "data" !== r) {
							n[r] = e[r];
							continue
						}
						n[r] = {};
						var i = e[r];
						for (var o in i) o && y.call(i, o) && y.call(t, o) && (n[r][t[o]] = i[o])
					}
				return n
			},
			gt = function(e, t) {
				var n = null == t || t && t.cacheBust === !0;
				return n ? (-1 === e.indexOf("?") ? "?" : "&") + "noCache=" + m() : ""
			},
			yt = function(e) {
				var t, n, r, o, a = "",
					s = [];
				if (e.trustedDomains && ("string" == typeof e.trustedDomains ? o = [e.trustedDomains] : "object" == typeof e.trustedDomains && "length" in e.trustedDomains && (o = e.trustedDomains)), o && o.length)
					for (t = 0, n = o.length; n > t; t++)
						if (y.call(o, t) && o[t] && "string" == typeof o[t]) {
							if (r = bt(o[t]), !r) continue;
							if ("*" === r) {
								s.length = 0, s.push(r);
								break
							}
							s.push.apply(s, [r, "//" + r, i.location.protocol + "//" + r])
						}
				return s.length && (a += "trustedOrigins=" + c(s.join(","))), e.forceEnhancedClipboard === !0 && (a += (a ? "&" : "") + "forceEnhancedClipboard=true"), "string" == typeof e.swfObjectId && e.swfObjectId && (a += (a ? "&" : "") + "swfObjectId=" + c(e.swfObjectId)), a
			},
			bt = function(e) {
				if (null == e || "" === e) return null;
				if (e = e.replace(/^\s+|\s+$/g, ""), "" === e) return null;
				var t = e.indexOf("//");
				e = -1 === t ? e : e.slice(t + 2);
				var n = e.indexOf("/");
				return e = -1 === n ? e : -1 === t || 0 === n ? null : e.slice(0, n), e && ".swf" === e.slice(-4).toLowerCase() ? null : e || null
			},
			wt = function() {
				var e = function(e) {
					var t, n, r, i = [];
					if ("string" == typeof e && (e = [e]), "object" != typeof e || !e || "number" != typeof e.length) return i;
					for (t = 0, n = e.length; n > t; t++)
						if (y.call(e, t) && (r = bt(e[t]))) {
							if ("*" === r) {
								i.length = 0, i.push("*");
								break
							} - 1 === i.indexOf(r) && i.push(r)
						}
					return i
				};
				return function(t, n) {
					var r = bt(n.swfPath);
					null === r && (r = t);
					var i = e(n.trustedDomains),
						o = i.length;
					if (o > 0) {
						if (1 === o && "*" === i[0]) return "always";
						if (-1 !== i.indexOf(t)) return 1 === o && t === r ? "sameDomain" : "always"
					}
					return "never"
				}
			}(),
			xt = function() {
				try {
					return o.activeElement
				} catch (e) {
					return null
				}
			},
			Et = function(e, t) {
				if (!e || 1 !== e.nodeType) return e;
				if (e.classList) return e.classList.contains(t) || e.classList.add(t), e;
				if (t && "string" == typeof t) {
					var n = (t || "").split(/\s+/);
					if (1 === e.nodeType)
						if (e.className) {
							for (var r = " " + e.className + " ", i = e.className, o = 0, a = n.length; a > o; o++) r.indexOf(" " + n[o] + " ") < 0 && (i += " " + n[o]);
							e.className = i.replace(/^\s+|\s+$/g, "")
						} else e.className = t
				}
				return e
			},
			Tt = function(e, t) {
				if (!e || 1 !== e.nodeType) return e;
				if (e.classList) return e.classList.contains(t) && e.classList.remove(t), e;
				if ("string" == typeof t && t) {
					var n = t.split(/\s+/);
					if (1 === e.nodeType && e.className) {
						for (var r = (" " + e.className + " ").replace(/[\n\t]/g, " "), i = 0, o = n.length; o > i; i++) r = r.replace(" " + n[i] + " ", " ");
						e.className = r.replace(/^\s+|\s+$/g, "")
					}
				}
				return e
			},
			_t = function(e, t) {
				var n = i.getComputedStyle(e, null).getPropertyValue(t);
				return "cursor" !== t || n && "auto" !== n || "A" !== e.nodeName ? n : "pointer"
			},
			Ct = function() {
				var e, t, n, r = 1;
				return "function" == typeof o.body.getBoundingClientRect && (e = o.body.getBoundingClientRect(), t = e.right - e.left, n = o.body.offsetWidth, r = h(t / n * 100) / 100), r
			},
			kt = function(e) {
				var t = {
					left: 0,
					top: 0,
					width: 0,
					height: 0
				};
				if (e.getBoundingClientRect) {
					var n, r, a, s = e.getBoundingClientRect();
					"pageXOffset" in i && "pageYOffset" in i ? (n = i.pageXOffset, r = i.pageYOffset) : (a = Ct(), n = h(o.documentElement.scrollLeft / a), r = h(o.documentElement.scrollTop / a));
					var c = o.documentElement.clientLeft || 0,
						u = o.documentElement.clientTop || 0;
					t.left = s.left + n - c, t.top = s.top + r - u, t.width = "width" in s ? s.width : s.right - s.left, t.height = "height" in s ? s.height : s.bottom - s.top
				}
				return t
			},
			St = function() {
				var e;
				if (n && (e = dt(O.bridge))) {
					var t = kt(n);
					E(e.style, {
						width: t.width + "px",
						height: t.height + "px",
						top: t.top + "px",
						left: t.left + "px",
						zIndex: "" + Nt(U.zIndex)
					})
				}
			},
			At = function(e) {
				O.ready === !0 && (O.bridge && "function" == typeof O.bridge.setHandCursor ? O.bridge.setHandCursor(e) : O.ready = !1)
			},
			Nt = function(e) {
				if (/^(?:auto|inherit)$/.test(e)) return e;
				var t;
				return "number" != typeof e || p(e) ? "string" == typeof e && (t = Nt(f(e, 10))) : t = e, "number" == typeof t ? t : "auto"
			},
			Dt = function(e) {
				function t(e) {
					var t = e.match(/[\d]+/g);
					return t.length = 3, t.join(".")
				}

				function n(e) {
					return !!e && (e = e.toLowerCase()) && (/^(pepflashplayer\.dll|libpepflashplayer\.so|pepperflashplayer\.plugin)$/.test(e) || "chrome.plugin" === e.slice(-13))
				}

				function r(e) {
					e && (c = !0, e.version && (f = t(e.version)), !f && e.description && (f = t(e.description)), e.filename && (l = n(e.filename)))
				}
				var i, o, s, c = !1,
					u = !1,
					l = !1,
					f = "";
				if (a.plugins && a.plugins.length) i = a.plugins["Shockwave Flash"], r(i), a.plugins["Shockwave Flash 2.0"] && (c = !0, f = "2.0.0.11");
				else if (a.mimeTypes && a.mimeTypes.length) s = a.mimeTypes["application/x-shockwave-flash"], i = s && s.enabledPlugin, r(i);
				else if ("undefined" != typeof e) {
					u = !0;
					try {
						o = new e("ShockwaveFlash.ShockwaveFlash.7"), c = !0, f = t(o.GetVariable("$version"))
					} catch (p) {
						try {
							o = new e("ShockwaveFlash.ShockwaveFlash.6"), c = !0, f = "6.0.21"
						} catch (h) {
							try {
								o = new e("ShockwaveFlash.ShockwaveFlash"), c = !0, f = t(o.GetVariable("$version"))
							} catch (m) {
								u = !1
							}
						}
					}
				}
				O.disabled = c !== !0, O.outdated = f && d(f) < d(I), O.version = f || "0.0.0", O.pluginType = l ? "pepper" : u ? "activex" : c ? "netscape" : "unknown"
			};
		Dt(u);
		var jt = function() {
			return this instanceof jt ? void("function" == typeof jt._createClient && jt._createClient.apply(this, x(arguments))) : new jt
		};
		g(jt, "version", {
			value: "2.1.6",
			writable: !1,
			configurable: !0,
			enumerable: !0
		}), jt.config = function() {
			return H.apply(this, x(arguments))
		}, jt.state = function() {
			return B.apply(this, x(arguments))
		}, jt.isFlashUnusable = function() {
			return z.apply(this, x(arguments))
		}, jt.on = function() {
			return q.apply(this, x(arguments))
		}, jt.off = function() {
			return W.apply(this, x(arguments))
		}, jt.handlers = function() {
			return V.apply(this, x(arguments))
		}, jt.emit = function() {
			return X.apply(this, x(arguments))
		}, jt.create = function() {
			return Y.apply(this, x(arguments))
		}, jt.destroy = function() {
			return G.apply(this, x(arguments))
		}, jt.setData = function() {
			return J.apply(this, x(arguments))
		}, jt.clearData = function() {
			return K.apply(this, x(arguments))
		}, jt.getData = function() {
			return Q.apply(this, x(arguments))
		}, jt.focus = jt.activate = function() {
			return Z.apply(this, x(arguments))
		}, jt.blur = jt.deactivate = function() {
			return et.apply(this, x(arguments))
		}, jt.activeElement = function() {
			return tt.apply(this, x(arguments))
		};
		var Pt = 0,
			Lt = {},
			Ot = 0,
			It = {},
			Mt = {};
		E(U, {
			autoActivate: !0
		});
		var $t = function(e) {
				var t = this;
				t.id = "" + Pt++, Lt[t.id] = {
					instance: t,
					elements: [],
					handlers: {}
				}, e && t.clip(e), jt.on("*", function(e) {
					return t.emit(e)
				}), jt.on("destroy", function() {
					t.destroy()
				}), jt.create()
			},
			Ft = function(e, t) {
				var n, r, i, o = {},
					a = Lt[this.id] && Lt[this.id].handlers;
				if ("string" == typeof e && e) i = e.toLowerCase().split(/\s+/);
				else if ("object" == typeof e && e && "undefined" == typeof t)
					for (n in e) y.call(e, n) && "string" == typeof n && n && "function" == typeof e[n] && this.on(n, e[n]);
				if (i && i.length) {
					for (n = 0, r = i.length; r > n; n++) e = i[n].replace(/^on/, ""), o[e] = !0, a[e] || (a[e] = []), a[e].push(t);
					if (o.ready && O.ready && this.emit({
						type: "ready",
						client: this
					}), o.error) {
						var s = ["disabled", "outdated", "unavailable", "deactivated", "overdue"];
						for (n = 0, r = s.length; r > n; n++)
							if (O[s[n]]) {
								this.emit({
									type: "error",
									name: "flash-" + s[n],
									client: this
								});
								break
							}
					}
				}
				return this
			},
			Rt = function(e, t) {
				var n, r, i, o, a, s = Lt[this.id] && Lt[this.id].handlers;
				if (0 === arguments.length) o = v(s);
				else if ("string" == typeof e && e) o = e.split(/\s+/);
				else if ("object" == typeof e && e && "undefined" == typeof t)
					for (n in e) y.call(e, n) && "string" == typeof n && n && "function" == typeof e[n] && this.off(n, e[n]);
				if (o && o.length)
					for (n = 0, r = o.length; r > n; n++)
						if (e = o[n].toLowerCase().replace(/^on/, ""), a = s[e], a && a.length)
							if (t)
								for (i = a.indexOf(t); - 1 !== i;) a.splice(i, 1), i = a.indexOf(t, i);
							else a.length = 0;
				return this
			},
			Ut = function(e) {
				var t = null,
					n = Lt[this.id] && Lt[this.id].handlers;
				return n && (t = "string" == typeof e && e ? n[e] ? n[e].slice(0) : [] : T(n)), t
			},
			Ht = function(e) {
				if (Vt.call(this, e)) {
					"object" == typeof e && e && "string" == typeof e.type && e.type && (e = E({}, e));
					var t = E({}, rt(e), {
						client: this
					});
					Xt.call(this, t)
				}
				return this
			},
			Bt = function(e) {
				e = Yt(e);
				for (var t = 0; t < e.length; t++)
					if (y.call(e, t) && e[t] && 1 === e[t].nodeType) {
						e[t].zcClippingId ? -1 === It[e[t].zcClippingId].indexOf(this.id) && It[e[t].zcClippingId].push(this.id) : (e[t].zcClippingId = "zcClippingId_" + Ot++, It[e[t].zcClippingId] = [this.id], U.autoActivate === !0 && Gt(e[t]));
						var n = Lt[this.id] && Lt[this.id].elements; - 1 === n.indexOf(e[t]) && n.push(e[t])
					}
				return this
			},
			zt = function(e) {
				var t = Lt[this.id];
				if (!t) return this;
				var n, r = t.elements;
				e = "undefined" == typeof e ? r.slice(0) : Yt(e);
				for (var i = e.length; i--;)
					if (y.call(e, i) && e[i] && 1 === e[i].nodeType) {
						for (n = 0; - 1 !== (n = r.indexOf(e[i], n));) r.splice(n, 1);
						var o = It[e[i].zcClippingId];
						if (o) {
							for (n = 0; - 1 !== (n = o.indexOf(this.id, n));) o.splice(n, 1);
							0 === o.length && (U.autoActivate === !0 && Jt(e[i]), delete e[i].zcClippingId)
						}
					}
				return this
			},
			qt = function() {
				var e = Lt[this.id];
				return e && e.elements ? e.elements.slice(0) : []
			},
			Wt = function() {
				this.unclip(), this.off(), delete Lt[this.id]
			},
			Vt = function(e) {
				if (!e || !e.type) return !1;
				if (e.client && e.client !== this) return !1;
				var t = Lt[this.id] && Lt[this.id].elements,
					n = !!t && t.length > 0,
					r = !e.target || n && -1 !== t.indexOf(e.target),
					i = e.relatedTarget && n && -1 !== t.indexOf(e.relatedTarget),
					o = e.client && e.client === this;
				return r || i || o ? !0 : !1
			},
			Xt = function(e) {
				if ("object" == typeof e && e && e.type) {
					var t = at(e),
						n = Lt[this.id] && Lt[this.id].handlers["*"] || [],
						r = Lt[this.id] && Lt[this.id].handlers[e.type] || [],
						o = n.concat(r);
					if (o && o.length) {
						var a, s, c, u, l, f = this;
						for (a = 0, s = o.length; s > a; a++) c = o[a], u = f, "string" == typeof c && "function" == typeof i[c] && (c = i[c]), "object" == typeof c && c && "function" == typeof c.handleEvent && (u = c, c = c.handleEvent), "function" == typeof c && (l = E({}, e), st(c, u, [l], t))
					}
					return this
				}
			},
			Yt = function(e) {
				return "string" == typeof e && (e = []), "number" != typeof e.length ? [e] : e
			},
			Gt = function(e) {
				if (e && 1 === e.nodeType) {
					var t = function(e) {
							(e || (e = i.event)) && ("js" !== e._source && (e.stopImmediatePropagation(), e.preventDefault()), delete e._source)
						},
						n = function(n) {
							(n || (n = i.event)) && (t(n), jt.focus(e))
						};
					e.addEventListener("mouseover", n, !1), e.addEventListener("mouseout", t, !1), e.addEventListener("mouseenter", t, !1), e.addEventListener("mouseleave", t, !1), e.addEventListener("mousemove", t, !1), Mt[e.zcClippingId] = {
						mouseover: n,
						mouseout: t,
						mouseenter: t,
						mouseleave: t,
						mousemove: t
					}
				}
			},
			Jt = function(e) {
				if (e && 1 === e.nodeType) {
					var t = Mt[e.zcClippingId];
					if ("object" == typeof t && t) {
						for (var n, r, i = ["move", "leave", "enter", "out", "over"], o = 0, a = i.length; a > o; o++) n = "mouse" + i[o], r = t[n], "function" == typeof r && e.removeEventListener(n, r, !1);
						delete Mt[e.zcClippingId]
					}
				}
			};
		jt._createClient = function() {
			$t.apply(this, x(arguments))
		}, jt.prototype.on = function() {
			return Ft.apply(this, x(arguments))
		}, jt.prototype.off = function() {
			return Rt.apply(this, x(arguments))
		}, jt.prototype.handlers = function() {
			return Ut.apply(this, x(arguments))
		}, jt.prototype.emit = function() {
			return Ht.apply(this, x(arguments))
		}, jt.prototype.clip = function() {
			return Bt.apply(this, x(arguments))
		}, jt.prototype.unclip = function() {
			return zt.apply(this, x(arguments))
		}, jt.prototype.elements = function() {
			return qt.apply(this, x(arguments))
		}, jt.prototype.destroy = function() {
			return Wt.apply(this, x(arguments))
		}, jt.prototype.setText = function(e) {
			return jt.setData("text/plain", e), this
		}, jt.prototype.setHtml = function(e) {
			return jt.setData("text/html", e), this
		}, jt.prototype.setRichText = function(e) {
			return jt.setData("application/rtf", e), this
		}, jt.prototype.setData = function() {
			return jt.setData.apply(this, x(arguments)), this
		}, jt.prototype.clearData = function() {
			return jt.clearData.apply(this, x(arguments)), this
		}, jt.prototype.getData = function() {
			return jt.getData.apply(this, x(arguments))
		}, "function" == typeof define && define.amd ? define(function() {
			return jt
		}) : "object" == typeof module && module && "object" == typeof module.exports && module.exports ? module.exports = jt : e.ZeroClipboard = jt
	}(function() {
		return this || window
	}()),
	/*
	 * Facebox (for jQuery)
	 * version: 1.3
	 * @requires jQuery v1.2 or later
	 * @homepage https://github.com/defunkt/facebox
	 *
	 * Licensed under the MIT:
	 *   http://www.opensource.org/licenses/mit-license.php
	 *
	 * Copyright Forever Chris Wanstrath, Kyle Neath
	 *
	 * Usage:
	 *
	 *  jQuery(document).ready(function() {
	 *    jQuery('a[rel*=facebox]').facebox()
	 *  })
	 *
	 *  <a href="#terms" rel="facebox">Terms</a>
	 *    Loads the #terms div in the box
	 *
	 *  You can also use it programmatically:
	 *
	 *    jQuery.facebox('some html')
	 *    jQuery.facebox('some html', 'my-groovy-style')
	 *
	 *  The above will open a facebox with "some html" as the content.
	 *
	 *    jQuery.facebox(function($) {
	 *      $.get('blah.html', function(data) { $.facebox(data) })
	 *    })
	 *
	 *  The above will show a loading screen before the passed function is called,
	 *  allowing for a better ajaxy experience.
	 *
	 *  The facebox function can also display the contents of a div:
	 *
	 *    jQuery.facebox({ div: '#box' })
	 *    jQuery.facebox({ div: '#box' }, 'my-groovy-style')
	 *
	 *  Want to close the facebox?  Trigger the 'close.facebox' document event:
	 *
	 *    jQuery(document).trigger('close.facebox')
	 *
	 *  Facebox also has a bunch of other hooks:
	 *
	 *    loading.facebox
	 *    beforeReveal.facebox
	 *    reveal.facebox (aliased as 'afterReveal.facebox')
	 *    init.facebox
	 *    afterClose.facebox
	 *
	 *  Simply bind a function to any of these hooks:
	 *
	 *   $(document).bind('reveal.facebox', function() { ...stuff to do after the facebox and contents are revealed... })
	 *
	 */
	function(e) {
		function t(t) {
			return e.facebox.settings.inited ? !0 : (e.facebox.settings.inited = !0, e(document).trigger("init.facebox"), i(), t && e.extend(e.facebox.settings, t), void e("body").append(e.facebox.settings.faceboxHtml))
		}

		function n() {
			var e, t;
			return self.pageYOffset ? (t = self.pageYOffset, e = self.pageXOffset) : document.documentElement && document.documentElement.scrollTop ? (t = document.documentElement.scrollTop, e = document.documentElement.scrollLeft) : document.body && (t = document.body.scrollTop, e = document.body.scrollLeft), new Array(e, t)
		}

		function r() {
			var e;
			return self.innerHeight ? e = self.innerHeight : document.documentElement && document.documentElement.clientHeight ? e = document.documentElement.clientHeight : document.body && (e = document.body.clientHeight), e
		}

		function i() {
			var t = e.facebox.settings;
			t.faceboxHtml = t.facebox_html || t.faceboxHtml
		}

		function o(t, n) {
			if (t.match(/#/)) {
				var r = window.location.href.split("#")[0],
					i = t.replace(r, "");
				if ("#" == i) return;
				e.facebox.reveal(e(i).html(), n)
			}
		}

		function a() {
			return 0 == e.facebox.settings.overlay || null === e.facebox.settings.opacity
		}

		function s() {
			return a() ? void 0 : (0 == e(".facebox-overlay").length && e("body").append('<div class="facebox-overlay facebox-overlay-hide"></div>'), e(".facebox-overlay").hide().addClass("facebox-overlay-active").css("opacity", e.facebox.settings.opacity).click(function() {
				e(document).trigger("close.facebox")
			}).fadeIn(200), !1)
		}

		function c() {
			return a() ? void 0 : (e(".facebox-overlay").fadeOut(200, function() {
				e(".facebox-overlay").removeClass("facebox-overlay-active"), e(".facebox-overlay").addClass("facebox-overlay-hide"), e(".facebox-overlay").remove()
			}), !1)
		}
		e.facebox = function(t, n) {
			return e.facebox.loading(), new Promise(function(r) {
				e(document).one("reveal.facebox", function() {
					r(e(".facebox-content")[0])
				}), t.div ? o(t.div, n) : e.isFunction(t) ? t.call(e) : e.facebox.reveal(t, n)
			})
		}, e.extend(e.facebox, {
			settings: {
				opacity: .5,
				overlay: !0,
				faceboxHtml: '    <div class="facebox" id="facebox" style="display:none;">       <div class="facebox-popup">         <div class="facebox-content">         </div>         <button type="button" class="facebox-close js-facebox-close" aria-label="Close modal">           <span class="octicon octicon-remove-close"></span>         </button>       </div>     </div>'
			},
			loading: function() {
				return t(), 1 == e(".facebox-loading").length ? !0 : (s(), e(".facebox-content").empty().append('<div class="facebox-loading"></div>'), e(".facebox").show().css({
					top: n()[1] + r() / 10,
					left: e(window).width() / 2 - e(".facebox-popup").outerWidth() / 2
				}), e(document).bind("keydown.facebox", function(t) {
					return 27 == t.keyCode && e.facebox.close(), !0
				}), void e(document).trigger("loading.facebox"))
			},
			reveal: function(t, n) {
				e(document).trigger("beforeReveal.facebox"), n && e(".facebox-content").addClass(n), e(".facebox-content").empty().append(t), e(".facebox-loading").remove(), e(".facebox-popup").children().fadeIn("normal"), e(".facebox").css("left", e(window).width() / 2 - e(".facebox-popup").outerWidth() / 2), e(document).trigger("reveal.facebox").trigger("afterReveal.facebox")
			},
			close: function() {
				return e(document).trigger("close.facebox"), !1
			}
		}), e.fn.facebox = function(n) {
			function r() {
				e.facebox.loading(!0);
				var t = this.rel.match(/facebox\[?\.(\w+)\]?/);
				return t && (t = t[1]), o(this.href, t), !1
			}
			if (0 != e(this).length) return t(n), this.bind("click.facebox", r)
		}, e(document).bind("close.facebox", function() {
			e(document).unbind("keydown.facebox"), e(".facebox").fadeOut(function() {
				e(".facebox-content").removeClass().addClass("facebox-content"), e(".facebox-loading").remove(), e(document).trigger("afterClose.facebox")
			}), c()
		}), e(document).on("click", ".js-facebox-close", e.facebox.close)
	}(jQuery),
	function() {
		"use strict";

		function e(e, t) {
			setTimeout(function() {
				var n = t.ownerDocument.createEvent("Event");
				n.initEvent(e, !0, !0), t.dispatchEvent(n)
			}, 0)
		}

		function t(e, t) {
			return t.then(function(t) {
				e.insertAdjacentHTML("afterend", t), e.parentNode.removeChild(e)
			}, function() {
				e.classList.add("is-error")
			})
		}

		function n(e) {
			var t = e.src,
				n = r.get(e);
			return n && n.src === t ? n.data : (n = e.load(t), r.set(e, {
				src: t,
				data: n
			}), n)
		}
		var r = new WeakMap,
			i = Object.create(window.HTMLElement.prototype);
		Object.defineProperty(i, "src", {
			get: function() {
				var e = this.getAttribute("src");
				if (e) {
					var t = this.ownerDocument.createElement("a");
					return t.href = e, t.href
				}
				return ""
			},
			set: function(e) {
				this.setAttribute("src", e)
			}
		}), Object.defineProperty(i, "data", {
			get: function() {
				return n(this)
			}
		}), i.attributeChangedCallback = function(e) {
			if ("src" === e) {
				var r = n(this);
				this._attached && t(this, r)
			}
		}, i.createdCallback = function() {
			n(this)["catch"](function() {})
		}, i.attachedCallback = function() {
			this._attached = !0, this.src && t(this, n(this))
		}, i.detachedCallback = function() {
			this._attached = !1
		}, i.load = function(t) {
			var n = this;
			return t ? (e("loadstart", n), n.fetch(t).then(function(t) {
				return e("load", n), e("loadend", n), t
			}, function(t) {
				throw e("error", n), e("loadend", n), t
			})) : Promise.reject(new Error("missing src"))
		}, i.fetch = function(e) {
			return new Promise(function(t, n) {
				var r = new XMLHttpRequest;
				r.onload = function() {
					if (200 === r.status) {
						var e = r.getResponseHeader("Content-Type");
						e && e.match(/^text\/html/) ? t(r.responseText) : n(new Error("Failed to load resource: expected text/html but was " + e))
					} else n(new Error("Failed to load resource: the server responded with a status of " + r.status))
				}, r.onerror = n, r.open("GET", e), r.setRequestHeader("Accept", "text/html"), r.send()
			})
		}, window.IncludeFragmentElement = document.registerElement("include-fragment", {
			prototype: i
		})
	}(),
	function() {
		var e, t, n;
		e = null != (n = IncludeFragmentElement.prototype) ? n : Object.getPrototypeOf(new IncludeFragmentElement), t = Object.create(e), t.fetch = function(e) {
			return new Promise(function(t, n) {
				var r;
				return (r = function(i) {
					var o;
					return o = new XMLHttpRequest, o.onload = function() {
						switch (o.status) {
							case 200:
								return t(o.responseText);
							case 202:
								return window.setTimeout(function() {
									return r(1.5 * i)
								}, i);
							default:
								return n()
						}
					}, o.onerror = n, o.open("GET", e), o.send()
				})(1e3)
			})
		}, window.PollIncludeFragmentElement = document.registerElement("poll-include-fragment", {
			prototype: t
		})
	}.call(this),
	function() {
		var e, t;
		t = function() {}, window.SlidingPromiseQueue = e = function() {
			function e() {
				this.previousReceiver = new Object
			}
			return e.prototype.push = function(e) {
				return this.previousReceiver.resolve = this.previousReceiver.reject = t, new Promise(function(t) {
					return function(n, r) {
						var i, o, a;
						return t.previousReceiver = a = {
							resolve: n,
							reject: r
						}, i = function() {
							return a.resolve.apply(this, arguments)
						}, o = function() {
							return a.reject.apply(this, arguments)
						}, e.then(i, o)
					}
				}(this))
			}, e
		}()
	}.call(this),
	function() {
		"use strict";

		function e(e) {
			return ("0" + e).slice(-2)
		}

		function t(n, r) {
			var i = n.getDay(),
				o = n.getDate(),
				a = n.getMonth(),
				s = n.getFullYear(),
				c = n.getHours(),
				f = n.getMinutes(),
				d = n.getSeconds();
			return r.replace(/%([%aAbBcdeHIlmMpPSwyYZz])/g, function(r) {
				var p, h = r[1];
				switch (h) {
					case "%":
						return "%";
					case "a":
						return u[i].slice(0, 3);
					case "A":
						return u[i];
					case "b":
						return l[a].slice(0, 3);
					case "B":
						return l[a];
					case "c":
						return n.toString();
					case "d":
						return e(o);
					case "e":
						return o;
					case "H":
						return e(c);
					case "I":
						return e(t(n, "%l"));
					case "l":
						return 0 === c || 12 === c ? 12 : (c + 12) % 12;
					case "m":
						return e(a + 1);
					case "M":
						return e(f);
					case "p":
						return c > 11 ? "PM" : "AM";
					case "P":
						return c > 11 ? "pm" : "am";
					case "S":
						return e(d);
					case "w":
						return i;
					case "y":
						return e(s % 100);
					case "Y":
						return s;
					case "Z":
						return p = n.toString().match(/\((\w+)\)$/), p ? p[1] : "";
					case "z":
						return p = n.toString().match(/\w([+-]\d\d\d\d) /), p ? p[1] : ""
				}
			})
		}

		function n(e) {
			this.date = e
		}

		function r() {
			if (null !== f) return f;
			if (!("Intl" in window)) return !1;
			var e = {
					day: "numeric",
					month: "short"
				},
				t = new window.Intl.DateTimeFormat(void 0, e),
				n = t.format(new Date(0));
			return f = !!n.match(/^\d/)
		}

		function i() {
			if (null !== d) return d;
			if (!("Intl" in window)) return !0;
			var e = {
					day: "numeric",
					month: "short",
					year: "numeric"
				},
				t = new window.Intl.DateTimeFormat(void 0, e),
				n = t.format(new Date(0));
			return d = !!n.match(/\d,/)
		}

		function o(e) {
			var t = new Date;
			return t.getUTCFullYear() === e.getUTCFullYear()
		}

		function a() {
			var e, t, n;
			for (t = 0, n = m.length; n > t; t++) e = m[t], e.textContent = e.getFormattedDate()
		}

		function s(e) {
			var n = {
					weekday: {
						"short": "%a",
						"long": "%A"
					},
					day: {
						numeric: "%e",
						"2-digit": "%d"
					},
					month: {
						"short": "%b",
						"long": "%B"
					},
					year: {
						numeric: "%Y",
						"2-digit": "%y"
					}
				},
				i = r() ? "weekday day month year" : "weekday month day, year";
			for (var o in n) {
				var a = n[o][e.getAttribute(o)];
				i = i.replace(o, a || "")
			}
			return i = i.replace(/(\s,)|(,\s$)/, ""), t(e._date, i).replace(/\s+/, " ").trim()
		}

		function c(e) {
			var n = {
				hour: e.getAttribute("hour"),
				minute: e.getAttribute("minute"),
				second: e.getAttribute("second")
			};
			for (var r in n) n[r] || delete n[r];
			if (0 !== Object.keys(n).length) {
				if ("Intl" in window) {
					var i = new window.Intl.DateTimeFormat(void 0, n);
					return i.format(e._date)
				}
				var o = n.second ? "%H:%M:%S" : "%H:%M";
				return t(e._date, o)
			}
		}
		var u = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
			l = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		n.prototype.toString = function() {
			var e = this.timeElapsed();
			return e ? e : "on " + this.formatDate()
		}, n.prototype.timeElapsed = function() {
			var e = (new Date).getTime() - this.date.getTime(),
				t = Math.round(e / 1e3),
				n = Math.round(t / 60),
				r = Math.round(n / 60),
				i = Math.round(r / 24);
			return 0 > e ? "just now" : 10 > t ? "just now" : 45 > t ? t + " seconds ago" : 90 > t ? "a minute ago" : 45 > n ? n + " minutes ago" : 90 > n ? "an hour ago" : 24 > r ? r + " hours ago" : 36 > r ? "a day ago" : 30 > i ? i + " days ago" : null
		}, n.prototype.timeAgo = function() {
			var e = (new Date).getTime() - this.date.getTime(),
				t = Math.round(e / 1e3),
				n = Math.round(t / 60),
				r = Math.round(n / 60),
				i = Math.round(r / 24),
				o = Math.round(i / 30),
				a = Math.round(o / 12);
			return 0 > e ? "just now" : 10 > t ? "just now" : 45 > t ? t + " seconds ago" : 90 > t ? "a minute ago" : 45 > n ? n + " minutes ago" : 90 > n ? "an hour ago" : 24 > r ? r + " hours ago" : 36 > r ? "a day ago" : 30 > i ? i + " days ago" : 45 > i ? "a month ago" : 12 > o ? o + " months ago" : 18 > o ? "a year ago" : a + " years ago"
		}, n.prototype.microTimeAgo = function() {
			var e = (new Date).getTime() - this.date.getTime(),
				t = e / 1e3,
				n = t / 60,
				r = n / 60,
				i = r / 24,
				o = i / 30,
				a = o / 12;
			return 1 > n ? "1m" : 60 > n ? Math.round(n) + "m" : 24 > r ? Math.round(r) + "h" : 365 > i ? Math.round(i) + "d" : Math.round(a) + "y"
		};
		var f = null,
			d = null;
		n.prototype.formatDate = function() {
			var e = r() ? "%e %b" : "%b %e";
			return o(this.date) || (e += i() ? ", %Y" : " %Y"), t(this.date, e)
		}, n.prototype.formatTime = function() {
			if ("Intl" in window) {
				var e = new window.Intl.DateTimeFormat(void 0, {
					hour: "numeric",
					minute: "2-digit"
				});
				return e.format(this.date)
			}
			return t(this.date, "%l:%M%P")
		};
		var p, h, m = [];
		h = Object.create("HTMLTimeElement" in window ? window.HTMLTimeElement.prototype : window.HTMLElement.prototype), h.attributeChangedCallback = function(e, t, n) {
			if ("datetime" === e) {
				var r = Date.parse(n);
				this._date = isNaN(r) ? null : new Date(r)
			}
			var i = this.getFormattedTitle();
			i && this.setAttribute("title", i);
			var o = this.getFormattedDate();
			o && (this.textContent = o)
		}, h.getFormattedTitle = function() {
			if (this._date) {
				if (this.hasAttribute("title")) return this.getAttribute("title");
				if ("Intl" in window) {
					var e = {
							day: "numeric",
							month: "short",
							year: "numeric",
							hour: "numeric",
							minute: "2-digit",
							timeZoneName: "short"
						},
						t = new window.Intl.DateTimeFormat(void 0, e);
					return t.format(this._date)
				}
				return this._date.toLocaleString()
			}
		};
		var v = Object.create(h);
		v.createdCallback = function() {
			var e = this.getAttribute("datetime");
			e && this.attributeChangedCallback("datetime", null, e)
		}, v.getFormattedDate = function() {
			return this._date ? new n(this._date).toString() : void 0
		}, v.attachedCallback = function() {
			m.push(this), p || (a(), p = setInterval(a, 6e4))
		}, v.detachedCallback = function() {
			var e = m.indexOf(this); - 1 !== e && m.splice(e, 1), m.length || p && (clearInterval(p), p = null)
		};
		var g = Object.create(v);
		g.getFormattedDate = function() {
			if (this._date) {
				var e = this.getAttribute("format");
				return "micro" === e ? new n(this._date).microTimeAgo() : new n(this._date).timeAgo()
			}
		};
		var y = Object.create(h);
		y.createdCallback = function() {
			var e;
			(e = this.getAttribute("datetime")) && this.attributeChangedCallback("datetime", null, e), (e = this.getAttribute("format")) && this.attributeChangedCallback("format", null, e)
		}, y.getFormattedDate = function() {
			if (this._date) {
				var e = s(this) || "",
					t = c(this) || "";
				return (e + " " + t).trim()
			}
		}, window.RelativeTimeElement = document.registerElement("relative-time", {
			prototype: v,
			"extends": "time"
		}), window.TimeAgoElement = document.registerElement("time-ago", {
			prototype: g,
			"extends": "time"
		}), window.LocalTimeElement = document.registerElement("local-time", {
			prototype: y,
			"extends": "time"
		})
	}(),
	function() {
		$(document).on("change", "form[data-autosubmit]", function() {
			return $(this).submit()
		})
	}.call(this),
	function() {
		var e, t, n;
		t = "ontransitionend" in window, $.fn.performTransition = function(r) {
			var i, o, a, s, c, u, l, f;
			if (!t) return void r.apply(this);
			for (a = this.find(".js-transitionable"), a = a.add(this.filter(".js-transitionable")), s = 0, u = a.length; u > s; s++) o = a[s], i = $(o), f = e(o), i.one("transitionend", function() {
				return o.style.display = null, o.style.visibility = null, f ? n(o, function() {
					return o.style.height = null
				}) : void 0
			}), o.style.display = "block", o.style.visibility = "visible", f && n(o, function() {
				return o.style.height = i.height() + "px"
			}), o.offsetHeight;
			for (r.apply(this), c = 0, l = a.length; l > c; c++) o = a[c], e(o) && (o.style.height = 0 === $(o).height() ? o.scrollHeight + "px" : "0px");
			return this
		}, e = function(e) {
			return "height" === $(e).css("transitionProperty")
		}, n = function(e, t) {
			e.style.transition = "none", t(e), e.offsetHeight, e.style.transition = null
		}
	}.call(this),
	function() {
		$.fn.fire = function(e) {
			var t, n, r, i, o;
			return (t = arguments[1]) && ($.isPlainObject(t) ? i = t : $.isFunction(t) && (n = t)), (t = arguments[2]) && $.isFunction(t) && (n = t), r = this[0], null == i && (i = {}), null == i.cancelable && (i.cancelable = !!n), null == i.bubbles && (i.bubbles = !0), o = function() {
				var t;
				return t = $.Event(e, i), $.event.trigger(t, [], r, !t.bubbles), n && !t.isDefaultPrevented() && n.call(r, t), t
			}, i.async ? (delete i.async, void setImmediate(o)) : o()
		}
	}.call(this),
	function() {
		$(document).on("click", ".js-details-container .js-details-target", function(e) {
			var t, n;
			n = $(this), t = n.closest(".js-details-container"), n.fire("details:toggle", {
				relatedTarget: e.target
			}, function() {
				return function() {
					t.performTransition(function() {
						this.toggleClass("open"), this.fire("details:toggled", {
							relatedTarget: e.target,
							async: !0
						})
					}), e.preventDefault()
				}
			}(this))
		})
	}.call(this),
	function() {
		var e, t;
		$.fuzzyScore = function(e, n) {
			var r, i;
			return i = t(e, n), i && -1 === n.indexOf("/") && (r = e.substring(e.lastIndexOf("/") + 1), i += t(r, n)), i
		}, $.fuzzySort = function(t, n) {
			var r, i, o, a, s, c;
			for (t = function() {
				var e, r, i;
				for (i = [], e = 0, r = t.length; r > e; e++) c = t[e], (s = $.fuzzyScore(c, n)) && i.push([c, s]);
				return i
			}(), t.sort(e), a = [], i = 0, o = t.length; o > i; i++) r = t[i], a.push(r[0]);
			return a
		}, e = function(e, t) {
			var n, r, i, o;
			return r = e[0], o = t[0], n = e[1], i = t[1], n > i ? -1 : i > n ? 1 : o > r ? -1 : r > o ? 1 : 0
		}, $.fuzzyRegexp = function(e) {
			var t, n, r;
			return r = e.toLowerCase(), t = "+.*?[]{}()^$|\\".replace(/(.)/g, "\\$1"), n = new RegExp("\\(([" + t + "])\\)", "g"), e = r.replace(/(.)/g, "($1)(.*?)").replace(n, "(\\$1)"), new RegExp("(.*)" + e + "$", "i")
		}, $.fuzzyHighlight = function(e, t, n) {
			var r, i, o, a, s, c, u, l;
			if (null == n && (n = null), i = e.innerHTML.trim(), t) {
				if (null == n && (n = $.fuzzyRegexp(t)), !(c = i.match(n))) return;
				for (u = !1, i = [], o = a = 1, l = c.length; l >= 1 ? l > a : a > l; o = l >= 1 ? ++a : --a) s = c[o], s && (o % 2 === 0 ? u || (i.push("<mark>"), u = !0) : u && (i.push("</mark>"), u = !1), i.push(s));
				e.innerHTML = i.join("")
			} else r = i.replace(/<\/?mark>/g, ""), i !== r && (e.innerHTML = r)
		}, t = function(e, t) {
			var n, r, i, o, a, s, c, u, l, f, d, p, h, m;
			if (e === t) return 1;
			for (h = e.length, m = 0, p = 0, a = l = 0, f = t.length; f > l; a = ++l) {
				if (i = t[a], s = e.indexOf(i.toLowerCase()), c = e.indexOf(i.toUpperCase()), d = Math.min(s, c), u = d > -1 ? d : Math.max(s, c), -1 === u) return 0;
				m += .1, e[u] === i && (m += .1), 0 === u && (m += .8, 0 === a && (p = 1)), " " === e.charAt(u - 1) && (m += .8), e = e.substring(u + 1, h)
			}
			return n = t.length, r = m / n, o = (r * (n / h) + r) / 2, p && 1 > o + .1 && (o += .1), o
		}
	}.call(this),
	function() {
		var e, t, n, r, i;
		r = new WeakMap, $.fn.fuzzyFilterSortList = function(o, a) {
			var s, c, u, l, f, d, p, h, m, v, g, y, b, w, x, E, T, _, C, k, S, A, N, D, j, P, L;
			if (null == a && (a = {}), E = this[0]) {
				for (o = o.toLowerCase(), l = null != (C = a.content) ? C : e, j = null != (k = a.text) ? k : n, D = null != (S = a.score) ? S : $.fuzzyScore, x = a.limit, a.mark === !0 ? T = t : null != (null != (A = a.mark) ? A.call : void 0) && (T = a.mark), (s = r.get(E)) ? u = $(E).children() : (u = s = $(E).children(), r.set(E, s.slice(0))), f = 0, g = u.length; g > f; f++) d = u[f], E.removeChild(d), d.style.display = "";
				if (N = document.createDocumentFragment(), P = 0, L = 0, o) {
					for (p = s.slice(0), m = 0, b = p.length; b > m; m++) d = p[m], null == d.fuzzyFilterTextCache && (d.fuzzyFilterTextCache = j(l(d))), d.fuzzyFilterScoreCache = D(d.fuzzyFilterTextCache, o);
					for (p.sort(i), _ = $.fuzzyRegexp(o), v = 0, w = p.length; w > v; v++) d = p[v], (!x || x > P) && d.fuzzyFilterScoreCache > 0 && (L++, T && (c = l(d), T(c), T(c, o, _)), N.appendChild(d)), P++
				} else
					for (h = 0, y = s.length; y > h; h++) d = s[h], (!x || x > P) && (L++, T && T(l(d)), N.appendChild(d)), P++;
				return E.appendChild(N), L
			}
		}, i = function(e, t) {
			var n, r, i, o;
			return n = e.fuzzyFilterScoreCache, i = t.fuzzyFilterScoreCache, r = e.fuzzyFilterTextCache, o = t.fuzzyFilterTextCache, n > i ? -1 : i > n ? 1 : o > r ? -1 : r > o ? 1 : 0
		}, e = function(e) {
			return e
		}, n = function(e) {
			return $.trim(e.textContent.toLowerCase())
		}, t = $.fuzzyHighlight
	}.call(this),
	function() {
		var e, t;
		$.fn.prefixFilterList = function(n, r) {
			var i, o, a, s, c, u, l, f, d, p, h;
			if (null == r && (r = {}), u = this[0]) {
				for (n = n.toLowerCase(), p = null != (f = r.text) ? f : t, a = $(u).children(), c = r.limit, r.mark === !0 ? l = e : null != (null != (d = r.mark) ? d.call : void 0) && (l = r.mark), h = 0, i = 0, s = a.length; s > i; i++) o = a[i], 0 === p(o).indexOf(n) ? c && h >= c ? o.style.display = "none" : (h++, o.style.display = "", l && (l(o), l(o, n))) : o.style.display = "none";
				return h
			}
		}, t = function(e) {
			return $.trim(e.textContent.toLowerCase())
		}, e = function(e, t) {
			var n, r, i;
			r = e.innerHTML, t ? (i = new RegExp(t, "i"), e.innerHTML = r.replace(i, "<mark>$&</mark>")) : (n = r.replace(/<\/?mark>/g, ""), r !== n && (e.innerHTML = n))
		}
	}.call(this),
	function() {
		var e, t;
		$.fn.substringFilterList = function(n, r) {
			var i, o, a, s, c, u, l, f, d, p, h;
			if (null == r && (r = {}), u = this[0]) {
				for (n = n.toLowerCase(), p = null != (f = r.text) ? f : t, c = r.limit, a = $(u).children(), r.mark === !0 ? l = e : null != (null != (d = r.mark) ? d.call : void 0) && (l = r.mark), h = 0, i = 0, s = a.length; s > i; i++) o = a[i], -1 !== p(o).indexOf(n) ? c && h >= c ? o.style.display = "none" : (h++, o.style.display = "", l && (l(o), l(o, n))) : o.style.display = "none";
				return h
			}
		}, t = function(e) {
			return $.trim(e.textContent.toLowerCase())
		}, e = function(e, t) {
			var n, r, i;
			r = e.innerHTML, t ? (i = new RegExp(t, "i"), e.innerHTML = r.replace(i, "<mark>$&</mark>")) : (n = r.replace(/<\/?mark>/g, ""), r !== n && (e.innerHTML = n))
		}
	}.call(this),
	function() {
		$.fn.focused = function(e) {
			var t, n, r;
			return n = [], r = [], t = e ? this.find(e).filter(document.activeElement)[0] : this.filter(document.activeElement)[0], this.on("focusin", e, function() {
				var e, r, i;
				if (!t)
					for (t = this, r = 0, i = n.length; i > r; r++) e = n[r], e.call(this)
			}), this.on("focusout", e, function() {
				var e, n, i;
				if (t)
					for (t = null, n = 0, i = r.length; i > n; n++) e = r[n], e.call(this)
			}), {
				"in": function(e) {
					return n.push(e), t && e.call(t), this
				},
				out: function(e) {
					return r.push(e), this
				}
			}
		}
	}.call(this),
	function() {
		var e, t;
		e = function() {
			var e, t, n, r, i;
			return n = !1, t = !1, i = null, e = 100, r = function(n) {
				return function(r) {
					i && clearTimeout(i), i = setTimeout(function() {
						var e;
						i = null, t = !1, e = new $.Event("throttled:input", {
							target: r
						}), $.event.trigger(e, null, n, !0)
					}, e)
				}
			}(this), $(this).on("keydown.throttledInput", function() {
				n = !0, i && clearTimeout(i)
			}), $(this).on("keyup.throttledInput", function(e) {
				n = !1, t && r(e.target)
			}), $(this).on("input.throttledInput", function(e) {
				t = !0, n || r(e.target)
			})
		}, t = function() {
			return $(this).off("keydown.throttledInput"), $(this).off("keyup.throttledInput"), $(this).off("input.throttledInput")
		}, $.event.special["throttled:input"] = {
			setup: e,
			teardown: t
		}
	}.call(this),
	function() {
		var e;
		$(document).focused(".js-filterable-field")["in"](function() {
			var e;
			return e = $(this).val(), $(this).on("throttled:input.filterable", function() {
				return e !== $(this).val() ? (e = $(this).val(), $(this).fire("filterable:change", {
					async: !0
				})) : void 0
			}), $(this).fire("filterable:change", {
				async: !0
			})
		}).out(function() {
			return $(this).off(".filterable")
		}), $(document).on("filterable:change", ".js-filterable-field", function() {
			var t, n, r, i, o, a;
			for (o = $.trim($(this).val().toLowerCase()), a = $("[data-filterable-for=" + this.id + "]"), n = 0, r = a.length; r > n; n++) i = a[n], t = $(i), e(t, o), t.fire("filterable:change", {
				relatedTarget: this
			})
		}), e = function(e, t) {
			var n, r, i;
			r = void 0 !== e.attr("data-filterable-highlight"), n = e.attr("data-filterable-limit"), i = function() {
				switch (e.attr("data-filterable-type")) {
					case "fuzzy":
						return e.fuzzyFilterSortList(t, {
							mark: r,
							limit: n
						});
					case "substring":
						return e.substringFilterList(t, {
							mark: r,
							limit: n
						});
					default:
						return e.prefixFilterList(t, {
							mark: r,
							limit: n
						})
				}
			}(), e.toggleClass("filterable-active", t.length > 0), e.toggleClass("filterable-empty", 0 === i)
		}
	}.call(this),
	function() {
		var e, t, n, r, i;
		r = {
			8: "backspace",
			9: "tab",
			13: "enter",
			16: "shift",
			17: "ctrl",
			18: "alt",
			19: "pause",
			20: "capslock",
			27: "esc",
			32: "space",
			33: "pageup",
			34: "pagedown",
			35: "end",
			36: "home",
			37: "left",
			38: "up",
			39: "right",
			40: "down",
			45: "insert",
			46: "del",
			48: "0",
			49: "1",
			50: "2",
			51: "3",
			52: "4",
			53: "5",
			54: "6",
			55: "7",
			56: "8",
			57: "9",
			65: "a",
			66: "b",
			67: "c",
			68: "d",
			69: "e",
			70: "f",
			71: "g",
			72: "h",
			73: "i",
			74: "j",
			75: "k",
			76: "l",
			77: "m",
			78: "n",
			79: "o",
			80: "p",
			81: "q",
			82: "r",
			83: "s",
			84: "t",
			85: "u",
			86: "v",
			87: "w",
			88: "x",
			89: "y",
			90: "z",
			91: "meta",
			93: "meta",
			96: "0",
			97: "1",
			98: "2",
			99: "3",
			100: "4",
			101: "5",
			102: "6",
			103: "7",
			104: "8",
			105: "9",
			106: "*",
			107: "+",
			109: "-",
			110: ".",
			111: "/",
			112: "f1",
			113: "f2",
			114: "f3",
			115: "f4",
			116: "f5",
			117: "f6",
			118: "f7",
			119: "f8",
			120: "f9",
			121: "f10",
			122: "f11",
			123: "f12",
			144: "numlock",
			145: "scroll",
			186: ";",
			187: "=",
			188: ",",
			189: "-",
			190: ".",
			191: "/",
			192: "`",
			219: "[",
			220: "\\",
			221: "]",
			222: "'"
		}, i = {
			48: ")",
			49: "!",
			50: "@",
			51: "#",
			52: "$",
			53: "%",
			54: "^",
			55: "&",
			56: "*",
			57: "(",
			65: "A",
			66: "B",
			67: "C",
			68: "D",
			69: "E",
			70: "F",
			71: "G",
			72: "H",
			73: "I",
			74: "J",
			75: "K",
			76: "L",
			77: "M",
			78: "N",
			79: "O",
			80: "P",
			81: "Q",
			82: "R",
			83: "S",
			84: "T",
			85: "U",
			86: "V",
			87: "W",
			88: "X",
			89: "Y",
			90: "Z",
			186: ":",
			187: "+",
			188: "<",
			189: "_",
			190: ">",
			191: "?",
			192: "~",
			219: "{",
			220: "|",
			221: "}",
			222: '"'
		}, e = function(e) {
			var t, n, o;
			return t = r[e.which], n = "", e.ctrlKey && "ctrl" !== t && (n += "ctrl+"), e.altKey && "alt" !== t && (n += "alt+"), e.metaKey && !e.ctrlKey && "meta" !== t && (n += "meta+"), e.shiftKey ? (o = i[e.which]) ? "" + n + o : "shift" === t ? n + "shift" : t ? n + "shift+" + t : null : t ? "" + n + t : null
		}, n = function(e) {
			var t, n;
			return 1 !== e.nodeType ? !1 : (t = e.nodeName.toLowerCase(), n = (e.getAttribute("type") || "").toLowerCase(), "select" === t || "textarea" === t || "input" === t && "submit" !== n && "reset" !== n)
		}, t = function(t) {
			var r;
			return null == t.hotkey && (t.hotkey = e(t)), r = null, null == t.isFormInteraction && (t.isFormInteraction = function() {
				return null != r ? r : r = n(this.target)
			}), t.handleObj.handler.apply(this, arguments)
		}, $.event.special.keydown = {
			handle: t
		}, $.event.special.keyup = {
			handle: t
		}
	}.call(this),
	function() {
		var e, t, n, r, i, o, a;
		r = e = {}, o = null, a = function() {
			return o = null, e = r
		}, $(document).on("keydown", function(t) {
			var n;
			if (!t.isFormInteraction())
				if (o && clearTimeout(o), n = e[t.hotkey]) {
					if (!("nodeType" in n)) return e = n, void(o = setTimeout(a, 1500));
					a(), $(n).fire("hotkey:activate", {
						originalEvent: t
					}, function() {
						return $(n).is("input, textarea") ? void $(n).focus() : void $(n).click()
					}), t.preventDefault()
				} else a()
		}), t = function(e) {
			var t, n, r, i, o;
			for (i = e.getAttribute("data-hotkey").split(/\s*,\s*/), o = [], n = 0, r = i.length; r > n; n++) t = i[n], o.push(t.split(/\s+/));
			return o
		}, n = function(e) {
			var n, i, o, a, s, c, u, l, f;
			for (l = t(e), f = [], o = 0, c = l.length; c > o; o++) s = l[o], u = r, f.push(function() {
				var t, r, o;
				for (o = [], i = t = 0, r = s.length; r > t; i = ++t) a = s[i], i < s.length - 1 ? (n = u[a], (!n || "nodeType" in n) && (u[a] = {}), o.push(u = u[a])) : o.push(u[a] = e);
				return o
			}());
			return f
		}, i = function(t) {
			var i, o, a, s;
			for (r = e = {}, a = $("[data-hotkey]"), s = [], i = 0, o = a.length; o > i; i++) t = a[i], s.push(n(t));
			return s
		}, $.observe("[data-hotkey]", {
			add: n,
			remove: i
		})
	}.call(this),
	function() {
		var e, t, n, r, i, o = [].indexOf || function(e) {
			for (var t = 0, n = this.length; n > t; t++)
				if (t in this && this[t] === e) return t;
			return -1
		};
		t = null, e = function(e) {
			t && n(t), $(e).fire("menu:activate", function() {
				return $(document).on("keydown.menu", i), $(document).on("click.menu", r), t = e, $(e).performTransition(function() {
					return document.body.classList.add("menu-active"), e.classList.add("active"), $(e).find(".js-menu-content[aria-hidden]").attr("aria-hidden", "false")
				}), $(e).fire("menu:activated", {
					async: !0
				})
			})
		}, n = function(e) {
			$(e).fire("menu:deactivate", function() {
				return $(document).off(".menu"), t = null, $(e).performTransition(function() {
					return document.body.classList.remove("menu-active"), e.classList.remove("active"), $(e).find(".js-menu-content[aria-hidden]").attr("aria-hidden", "true")
				}), $(e).fire("menu:deactivated", {
					async: !0
				})
			})
		}, r = function(e) {
			t && ($(e.target).closest(t)[0] || (e.preventDefault(), n(t)))
		}, i = function(e) {
			t && "esc" === e.hotkey && (o.call($(document.activeElement).parents(), t) >= 0 && document.activeElement.blur(), e.preventDefault(), n(t))
		}, $(document).on("click", ".js-menu-container", function(r) {
			var i, o, a;
			i = this, (a = $(r.target).closest(".js-menu-target")[0]) ? (r.preventDefault(), i === t ? n(i) : e(i)) : (o = $(r.target).closest(".js-menu-content")[0]) || i === t && (r.preventDefault(), n(i))
		}), $(document).on("click", ".js-menu-container .js-menu-close", function(e) {
			n($(this).closest(".js-menu-container")[0]), e.preventDefault()
		}), $.fn.menu = function(t) {
			var r, i;
			return (r = $(this).closest(".js-menu-container")[0]) ? (i = {
				activate: function() {
					return function() {
						return e(r)
					}
				}(this),
				deactivate: function() {
					return function() {
						return n(r)
					}
				}(this)
			}, "function" == typeof i[t] ? i[t]() : void 0) : void 0
		}
	}.call(this),
	function() {
		$.fn.positionedOffset = function(e) {
			var t, n, r, i, o, a, s, c, u;
			if (n = this[0]) {
				for ((null != e ? e.jquery : void 0) && (e = e[0]), c = 0, i = 0, r = n.offsetHeight, u = n.offsetWidth; n !== document.body && n !== e;)
					if (c += n.offsetTop || 0, i += n.offsetLeft || 0, n = n.offsetParent, !n) return;
				return e && e.offsetParent ? (a = e.scrollHeight, s = e.scrollWidth) : (a = $(document).height(), s = $(document).width()), t = a - (c + r), o = s - (i + u), {
					top: c,
					left: i,
					bottom: t,
					right: o
				}
			}
		}
	}.call(this),
	function() {
		var e, t = [].slice;
		$.fn.scrollTo = function() {
			var n, r, i, o, a, s, c;
			return n = 1 <= arguments.length ? t.call(arguments, 0) : [], (r = this[0]) ? (o = {}, $.isPlainObject(n[0]) ? (o = n[0], $.isFunction(n[1]) && null == o.complete && (o.complete = n[1])) : null != n[0] && (o.target = n[0]), null == o.top && null == o.left && (o.target ? (a = $(o.target).positionedOffset(r), c = a.top, i = a.left, o.top = c, o.left = i) : (s = $(r).positionedOffset(), c = s.top, i = s.left, o.top = c, o.left = i, r = document)), r.offsetParent ? o.duration ? e(r, o) : (null != o.top && (r.scrollTop = o.top), null != o.left && (r.scrollLeft = o.left), "function" == typeof o.complete && o.complete()) : o.duration ? e("html, body", o) : (null != o.top && $(document).scrollTop(o.top), null != o.left && $(document).scrollLeft(o.left), "function" == typeof o.complete && o.complete()), this) : this
		}, e = function(e, t) {
			var n, r, i;
			return i = {}, null != t.top && (i.scrollTop = t.top), null != t.left && (i.scrollLeft = t.left), r = {
				duration: t.duration,
				queue: !1
			}, t.complete && (n = $(e).length, r.complete = function() {
				return 0 === --n ? setImmediate(t.complete) : void 0
			}), $(e).animate(i, r)
		}
	}.call(this),
	function() {
		$.hidden = function() {
			return this.offsetWidth <= 0 && this.offsetHeight <= 0
		}, $.visible = function() {
			return !$.hidden.call(this)
		}, $.fn.hidden = function() {
			return this.filter($.hidden)
		}, $.fn.visible = function() {
			return this.filter($.visible)
		}
	}.call(this),
	function() {
		$.fn.overflowOffset = function(e) {
			var t, n, r, i, o, a, s, c, u;
			return null == e && (e = document.body), (n = this[0]) && (o = $(n).positionedOffset(e)) ? (e.offsetParent ? s = {
				top: $(e).scrollTop(),
				left: $(e).scrollLeft()
			} : (s = {
				top: $(window).scrollTop(),
				left: $(window).scrollLeft()
			}, e = document.documentElement), c = o.top - s.top, i = o.left - s.left, r = e.clientHeight, u = e.clientWidth, t = r - (c + n.offsetHeight), a = u - (i + n.offsetWidth), {
				top: c,
				left: i,
				bottom: t,
				right: a,
				height: r,
				width: u
			}) : void 0
		}
	}.call(this),
	function() {
		$.fn.overflowParent = function() {
			var e, t, n;
			if (!(e = this[0])) return $();
			if (e === document.body) return $();
			for (; e !== document.body;) {
				if (e = e.parentElement, !e) return $();
				if (n = $(e).css("overflow-y"), t = $(e).css("overflow-x"), "auto" === n || "auto" === t || "scroll" === n || "scroll" === t) break
			}
			return $(e)
		}
	}.call(this),
	function() {
		var e, t, n, r, i, o, a, s, c, u, l, f, d, p, h, m, v, g, y, b, w, x, E, T, _, C, k, S;
		i = navigator.userAgent.match(/Macintosh/), v = navigator.userAgent.match(/Macintosh/) ? "meta" : "ctrl", c = !1, g = {
			x: 0,
			y: 0
		}, t = function(e) {
			e.addEventListener("mousemove", y, !1), e.addEventListener("mouseover", b, !1)
		}, S = function(e) {
			e.removeEventListener("mousemove", y, !1), e.removeEventListener("mouseover", b, !1)
		}, $.observe(".js-navigation-container", {
			add: t,
			remove: S
		}), y = function(e) {
			(g.x !== e.clientX || g.y !== e.clientY) && (c = !1), g = {
				x: e.clientX,
				y: e.clientY
			}
		}, b = function(e) {
			c || $(e.target).trigger("navigation:mouseover")
		}, $(document).on("keydown", function(e) {
			var t, n, r;
			(e.target === document.body || e.target.classList.contains("js-navigation-enable")) && (t = d()) && (c = !0, r = $(t).find(".js-navigation-item.navigation-focus")[0] || t, n = $(r).fire("navigation:keydown", {
				originalEvent: e,
				hotkey: e.hotkey,
				relatedTarget: t
			}), n.isDefaultPrevented() && e.preventDefault())
		}), $(document).on("navigation:keydown", ".js-active-navigation-container", function(e) {
			var t, n, r;
			if (t = this, n = $(e.originalEvent.target).is("input, textarea"), $(e.target).is(".js-navigation-item"))
				if (r = e.target, n) {
					if (i) switch (e.hotkey) {
						case "ctrl+n":
							o(r, t);
							break;
						case "ctrl+p":
							a(r, t)
					}
					switch (e.hotkey) {
						case "up":
							a(r, t);
							break;
						case "down":
							o(r, t);
							break;
						case "enter":
							m(r);
							break;
						case v + "+enter":
							m(r, !0)
					}
				} else {
					if (i) switch (e.hotkey) {
						case "ctrl+n":
							o(r, t);
							break;
						case "ctrl+p":
							a(r, t);
							break;
						case "alt+v":
							x(r, t);
							break;
						case "ctrl+v":
							w(r, t)
					}
					switch (e.hotkey) {
						case "j":
							o(r, t);
							break;
						case "k":
							a(r, t);
							break;
						case "o":
						case "enter":
							m(r);
							break;
						case v + "+enter":
							m(r, !0)
					}
				} else if (r = p(t)[0])
				if (n) {
					if (i) switch (e.hotkey) {
						case "ctrl+n":
							f(r, t)
					}
					switch (e.hotkey) {
						case "down":
							f(r, t)
					}
				} else {
					if (i) switch (e.hotkey) {
						case "ctrl+n":
						case "ctrl+v":
							f(r, t)
					}
					switch (e.hotkey) {
						case "j":
							f(r, t)
					}
				}
			if (n) {
				if (i) switch (e.hotkey) {
					case "ctrl+n":
					case "ctrl+p":
						e.preventDefault()
				}
				switch (e.hotkey) {
					case "up":
					case "down":
						e.preventDefault();
						break;
					case "enter":
					case v + "+enter":
						e.preventDefault()
				}
			} else {
				if (i) switch (e.hotkey) {
					case "ctrl+n":
					case "ctrl+p":
					case "alt+v":
					case "ctrl+v":
						e.preventDefault()
				}
				switch (e.hotkey) {
					case "j":
					case "k":
						e.preventDefault();
						break;
					case "o":
					case "enter":
					case v + "+enter":
						e.preventDefault()
				}
			}
		}), $(document).on("navigation:mouseover", ".js-active-navigation-container .js-navigation-item", function(e) {
			var t;
			t = $(e.currentTarget).closest(".js-navigation-container")[0], f(e.currentTarget, t)
		}), u = function(e) {
			var t, n, r;
			r = e.currentTarget, n = e.modifierKey || e.altKey || e.ctrlKey || e.metaKey, t = $(r).fire("navigation:open", {
				modifierKey: n
			}), t.isDefaultPrevented() && e.preventDefault()
		}, $(document).on("click", ".js-active-navigation-container .js-navigation-item", function(e) {
			u(e)
		}), $(document).on("navigation:keyopen", ".js-active-navigation-container .js-navigation-item", function(e) {
			var t;
			(t = $(this).filter(".js-navigation-open")[0] || $(this).find(".js-navigation-open")[0]) ? (e.modifierKey ? (window.open(t.href, "_blank"), window.focus()) : $(t).click(), e.preventDefault()) : u(e)
		}), e = function(e) {
			var t;
			return t = d(), e !== t ? $(e).fire("navigation:activate", function() {
				return function() {
					return t && t.classList.remove("js-active-navigation-container"), e.classList.add("js-active-navigation-container"), $(e).fire("navigation:activated", {
						async: !0
					})
				}
			}(this)) : void 0
		}, s = function(e) {
			return $(e).fire("navigation:deactivate", function() {
				return function() {
					return e.classList.remove("js-active-navigation-container"), $(e).fire("navigation:deactivated", {
						async: !0
					})
				}
			}(this))
		}, r = [], T = function(t) {
			var n;
			(n = d()) && r.push(n), e(t)
		}, E = function(t) {
			var i;
			s(t), n(t), (i = r.pop()) && e(i)
		}, l = function(t, n) {
			var r, i, o;
			if (r = p(n)[0], o = $(t).closest(".js-navigation-item")[0] || r, e(n), o) {
				if (i = f(o, n)) return;
				k($(o).overflowParent()[0], o)
			}
		}, n = function(e) {
			$(e).find(".navigation-focus.js-navigation-item").removeClass("navigation-focus")
		}, _ = function(e, t) {
			n(t), l(e, t)
		}, a = function(e, t) {
			var n, r, i, o, a;
			if (i = p(t), r = $.inArray(e, i), a = i[r - 1]) {
				if (n = f(a, t)) return;
				o = $(a).overflowParent()[0], "page" === h(t) ? k(o, a) : C(o, a)
			}
		}, o = function(e, t) {
			var n, r, i, o, a;
			if (i = p(t), r = $.inArray(e, i), o = i[r + 1]) {
				if (n = f(o, t)) return;
				a = $(o).overflowParent()[0], "page" === h(t) ? k(a, o) : C(a, o)
			}
		}, x = function(e, t) {
			var n, r, i, o, a;
			for (i = p(t), r = $.inArray(e, i), o = $(e).overflowParent()[0];
				(a = i[r - 1]) && $(a).overflowOffset(o).top >= 0;) r--;
			if (a) {
				if (n = f(a, t)) return;
				k(o, a)
			}
		}, w = function(e, t) {
			var n, r, i, o, a;
			for (i = p(t), r = $.inArray(e, i), a = $(e).overflowParent()[0];
				(o = i[r + 1]) && $(o).overflowOffset(a).bottom >= 0;) r++;
			if (o) {
				if (n = f(o, t)) return;
				k(a, o)
			}
		}, m = function(e, t) {
			null == t && (t = !1), $(e).fire("navigation:keyopen", {
				modifierKey: t
			})
		}, f = function(e, t) {
			var r;
			return r = $(e).fire("navigation:focus", function() {
				return n(t), e.classList.add("navigation-focus"), $(e).fire("navigation:focused", {
					async: !0
				})
			}), r.isDefaultPrevented()
		}, d = function() {
			return $(".js-active-navigation-container")[0]
		}, p = function(e) {
			return $(e).find(".js-navigation-item").visible()
		}, h = function(e) {
			var t;
			return null != (t = $(e).attr("data-navigation-scroll")) ? t : "item"
		}, k = function(e, t) {
			var n, r, i, o;
			return r = $(t).positionedOffset(e), n = $(t).overflowOffset(e), n.bottom <= 0 ? $(e).scrollTo({
				top: r.top - 30,
				duration: 200
			}) : n.top <= 0 ? (i = null != e.offsetParent ? e.scrollHeight : $(document).height(), o = i - (r.bottom + n.height), $(e).scrollTo({
				top: o + 30,
				duration: 200
			})) : void 0
		}, C = function(e, t) {
			var n, r, i, o;
			return r = $(t).positionedOffset(e), n = $(t).overflowOffset(e), n.bottom <= 0 ? (i = null != e.offsetParent ? e.scrollHeight : $(document).height(), o = i - (r.bottom + n.height), $(e).scrollTo({
				top: o
			})) : n.top <= 0 ? $(e).scrollTo({
				top: r.top
			}) : void 0
		}, $.fn.navigation = function(t) {
			var r, i;
			if ("active" === t) return d();
			if (r = $(this).closest(".js-navigation-container")[0]) return i = {
				activate: function() {
					return function() {
						return e(r)
					}
				}(this),
				deactivate: function() {
					return function() {
						return s(r)
					}
				}(this),
				push: function() {
					return function() {
						return T(r)
					}
				}(this),
				pop: function() {
					return function() {
						return E(r)
					}
				}(this),
				focus: function(e) {
					return function() {
						return l(e, r)
					}
				}(this),
				clear: function() {
					return function() {
						return n(r)
					}
				}(this),
				refocus: function(e) {
					return function() {
						return _(e, r)
					}
				}(this)
			}, "function" == typeof i[t] ? i[t]() : void 0
		}
	}.call(this),
	function() {
		$(document).on("keydown", function(e) {
			var t, n, r, i, o, a, s, c, u;
			if ("r" === e.hotkey && !e.isDefaultPrevented() && !e.isFormInteraction() && (c = window.getSelection(), r = $(c.focusNode), (u = $.trim(c.toString())) && (t = r.closest(".js-quote-selection-container"), t.length))) {
				if (o = $.Event("quote:selection"), t.trigger(o), o.isDefaultPrevented()) return !1;
				if (n = t.find(".js-quote-selection-target").visible().first(), a = n[0]) return s = "> " + u.replace(/\n/g, "\n> ") + "\n\n", (i = a.value) && (s = i + "\n\n" + s), a.value = s, n.trigger("change"), n.scrollTo({
					duration: 300
				}, function() {
					return a.focus(), a.selectionStart = a.value.length, n.scrollTop(a.scrollHeight)
				}), e.preventDefault()
			}
		})
	}.call(this),
	function() {
		var e;
		null != window.getSelection && (e = function(t, n) {
			var r, i, o, a;
			if (t === n) return !0;
			for (a = t.childNodes, r = 0, i = a.length; i > r; r++)
				if (o = a[r], e(o, n)) return !0;
			return !1
		}, $(document).on("click", ".js-selectable-text", function() {
			var t, n;
			n = window.getSelection(), n.rangeCount && (t = n.getRangeAt(0).commonAncestorContainer, e(this, t) || n.selectAllChildren(this))
		}))
	}.call(this),
	function() {
		$.debounce = function(e, t) {
			var n;
			return n = null,
				function() {
					n && clearTimeout(n), n = setTimeout(e, t)
				}
		}
	}.call(this),
	function() {
		var e, t;
		e = function() {
			var e, t, n;
			e = null, n = $.debounce(function() {
				return e = null
			}, 200), t = {
				x: 0,
				y: 0
			}, $(this).on("mousemove.userResize", function(r) {
				var i;
				(t.x !== r.clientX || t.y !== r.clientY) && (i = this.style.height, e && e !== i && $(this).trigger("user:resize"), e = i, n()), t = {
					x: r.clientX,
					y: r.clientY
				}
			})
		}, t = function() {
			$(this).off("mousemove.userResize")
		}, $.event.special["user:resize"] = {
			setup: e,
			teardown: t
		}
	}.call(this),
	function() {
		var e, t, n, r;
		n = function(e) {
			return $(e).on("user:resize.trackUserResize", function() {
				return $(e).addClass("is-user-resized"), $(e).css({
					"max-height": ""
				})
			})
		}, r = function(e) {
			return $(e).off("user:resize.trackUserResize")
		}, $(document).on("reset", "form", function() {
			var e;
			e = $(this).find("textarea.js-size-to-fit"), e.removeClass("is-user-resized"), e.css({
				height: "",
				"max-height": ""
			})
		}), $.observe("textarea.js-size-to-fit", {
			add: n,
			remove: r
		}), e = function(e) {
			var t, n, r;
			t = $(e), n = null, r = function() {
				var r, i, o, a;
				e.value !== n && t.is($.visible) && (a = t.overflowOffset(), a.top < 0 || a.bottom < 0 || (o = t.outerHeight() + a.bottom, e.style.maxHeight = o - 100 + "px", r = e.parentNode, i = r.style.height, r.style.height = $(r).css("height"), e.style.height = "auto", t.innerHeight(e.scrollHeight), r.style.height = i, n = e.value))
			}, t.on("change.sizeToFit", function() {
				return r()
			}), t.on("input.sizeToFit", function() {
				return r()
			}), e.value && r()
		}, t = function(e) {
			$(e).off(".sizeToFit")
		}, $.observe("textarea.js-size-to-fit:not(.is-user-resized)", {
			add: e,
			remove: t
		})
	}.call(this),
	function() {
		var e, t, n;
		t = 0, e = /^\(\d+\)\s+/, n = function() {
			var n;
			return n = t ? "(" + t + ") " : "", document.title = document.title.match(e) ? document.title.replace(e, n) : "" + n + document.title
		}, $.observe(".js-unread-item", {
			add: function() {
				return t++, n()
			},
			remove: function() {
				return t--, n()
			}
		})
	}.call(this),
	function() {
		$.fn.ajax = function(e) {
			var t, n, r, i, o;
			return null == e && (e = {}), o = $.Deferred(), 1 !== this.length ? (o.reject(), o.promise()) : (t = this[0], (i = this.attr("data-url")) ? (o = this.data("xhr")) ? o : (n = {
				type: "GET",
				url: i,
				context: t
			}, r = $.extend(n, e), o = $.ajax(r), this.data("xhr", o), o.always(function(e) {
				return function() {
					return e.removeData("xhr")
				}
			}(this)), o) : (o.rejectWith(t), o.promise()))
		}
	}.call(this),
	function() {
		$.fn.hasDirtyFields = function() {
			var e, t, n, r;
			for (r = this.find("input, textarea"), t = 0, n = r.length; n > t; t++)
				if (e = r[t], e.value !== e.defaultValue) return !0;
			return !1
		}
	}.call(this),
	function() {
		$.fn.hasFocus = function() {
			var e, t;
			return (e = this[0]) ? (t = document.activeElement, $(t).is("input, textarea") && e === t || $.contains(e, t)) : !1
		}
	}.call(this),
	function() {
		$.fn.hasMousedown = function() {
			var e;
			return (e = this[0]) ? $(e).is(":active") : !1
		}
	}.call(this),
	function() {
		$.fn.markedAsDirty = function() {
			return this.closest(".is-dirty").length > 0 || this.find(".is-dirty").length > 0
		}
	}.call(this),
	function() {
		$.fn.hasInteractions = function() {
			return this.hasDirtyFields() || this.hasFocus() || this.hasMousedown() || this.markedAsDirty()
		}
	}.call(this),
	function() {
		var e, t;
		$.fn.notScrolling = function() {
			return new Promise(function(e) {
				return function(n) {
					return 1 === e.length ? t(e[0], n) : n()
				}
			}(this))
		}, e = 0, window.addEventListener("scroll", function(t) {
			e = t.timeStamp || (new Date).getTime()
		}, !0), t = function(t, n) {
			var r;
			return t === window && e < (new Date).getTime() - 500 ? void setImmediate(n) : (r = $.debounce(function() {
				return t.removeEventListener("scroll", r, !1), n()
			}, 500), t.addEventListener("scroll", r, !1), void r())
		}
	}.call(this),
	function() {
		var e;
		$.fn.scrollBy = function(t, n) {
			var r, i;
			return 0 === t && 0 === n ? [0, 0] : (i = e(this[0]), this.scrollTo({
				top: i.top + n,
				left: i.left + t
			}), r = e(this[0]), [r.left - i.left, r.top - i.top])
		}, e = function(e) {
			return e.offsetParent ? {
				top: $(e).scrollTop(),
				left: $(e).scrollLeft()
			} : {
				top: $(document).scrollTop(),
				left: $(document).scrollLeft()
			}
		}
	}.call(this),
	function() {
		$.fn.cumulativeScrollBy = function(e, t) {
			var n, r, i, o, a, s;
			for (r = i = 0, n = this.overflowParent(); n[0] && (o = n.scrollBy(e - r, t - i), a = o[0], s = o[1], r += a, i += s, r !== e || i !== t);) n = n.overflowParent()
		}
	}.call(this),
	function() {
		var e, t;
		$.fn.preservingScrollPosition = function(e) {
			return $.preservingScrollPosition(this[0], e), this
		}, $.preservingScrollPosition = function(n, r) {
			var i, o, a, s, c, u, l, f;
			return n ? (a = e(n), l = r.call(n), (o = t(a)) ? (n = o.element, c = o.top, s = o.left, u = n.getBoundingClientRect(), f = u.top, i = u.left, $(n).cumulativeScrollBy(i - s, f - c), l) : void 0) : r()
		}, e = function(e) {
			var t, n, r, i;
			for (n = []; e;) r = e.getBoundingClientRect(), i = r.top, t = r.left, n.push({
				element: e,
				top: i,
				left: t
			}), e = e.parentElement;
			return n
		}, t = function(e) {
			var t, n, r;
			for (t = 0, n = e.length; n > t; t++)
				if (r = e[t], $.contains(document, r.element)) return r
		}
	}.call(this),
	function() {
		$.interactiveElement = function() {
			var e, t, n;
			return document.activeElement !== document.body ? e = document.activeElement : (t = document.querySelectorAll(":hover"), (n = t.length) && (e = t[n - 1])), $(e)
		}
	}.call(this),
	function() {
		$.preserveInteractivePosition = function(e) {
			return $(window).notScrolling().then(function() {
				var t;
				return t = $.interactiveElement()[0], $.preservingScrollPosition(t, e)
			})
		}
	}.call(this),
	function() {
		var e, t;
		t = function(e, t, n) {
			var r, i;
			return r = e.value.substring(0, e.selectionEnd), i = e.value.substring(e.selectionEnd), r = r.replace(t, n), i = i.replace(t, n), e.value = r + i, e.selectionStart = r.length, e.selectionEnd = r.length
		}, e = function(e, t) {
			var n, r, i, o;
			return i = e.selectionEnd, n = e.value.substring(0, i), o = e.value.substring(i), r = "" === e.value || n.match(/\n$/) ? "" : "\n", e.value = n + r + t + o, e.selectionStart = i + t.length, e.selectionEnd = i + t.length
		}, $.fn.replaceText = function(e, n) {
			var r, i, o;
			for (i = 0, o = this.length; o > i; i++) r = this[i], t(r, e, n);
			return this
		}, $.fn.insertText = function(t) {
			var n, r, i;
			for (r = 0, i = this.length; i > r; r++) n = this[r], e(n, t);
			return this
		}
	}.call(this),
	function() {
		var e;
		e = new WeakMap, $(document).on("focusin.delay", function(t) {
			var n;
			n = t.target, e.get(n) || $(n).fire("focusin:delay", function() {
				e.set(n, !0), $(n).trigger("focusin:delayed")
			})
		}), $(document).on("focusout.delay", function(t) {
			return setTimeout(function() {
				var n;
				n = t.target, n !== document.activeElement && $(n).fire("focusout:delay", function() {
					e["delete"](t.target), $(n).trigger("focusout:delayed")
				})
			}, 200)
		})
	}.call(this),
	function() {
		$.fn.onFocusedInput = function(e, t) {
			var n;
			return n = "focusInput" + Math.floor(1e3 * Math.random()), this.focused(e)["in"](function() {
				var e;
				return (e = t.call(this, n)) ? $(this).on("input." + n, e) : void 0
			}).out(function() {
				return $(this).off("." + n)
			}), this
		}
	}.call(this),
	function() {
		$.fn.onFocusedKeydown = function(e, t) {
			var n;
			return n = "focusKeydown" + Math.floor(1e3 * Math.random()), this.focused(e)["in"](function() {
				var e;
				return (e = t.call(this, n)) ? $(this).on("keydown." + n, e) : void 0
			}).out(function() {
				return $(this).off("." + n)
			}), this
		}
	}.call(this),
	function() {
		var e;
		e = /complete|loaded|interactive/, $.readyQueue = function(t) {
			var n, r, i, o, a, s, c;
			return r = [], o = 0, c = !1, s = function() {
				var e;
				c = !1, e = o, o = r.length, t(r.slice(e))
			}, a = function() {
				s(), document.removeEventListener("DOMContentLoaded", a, !1)
			}, i = function(t) {
				t && r.push(t), c || (e.test(document.readyState) ? setImmediate(s) : document.addEventListener("DOMContentLoaded", a, !1), c = !0)
			}, n = function() {
				r.length = o = 0, c = !1
			}, {
				handlers: r,
				push: i,
				clear: n
			}
		}
	}.call(this),
	function() {
		var e, t, n, r;
		n = $.readyQueue(function(e) {
			r(e, null, window.location.href)
		}), $.hashChange = n.push, e = window.location.href, $(window).on("popstate", function() {
			return e = window.location.href
		}), $(window).on("hashchange", function(t) {
			var i, o, a;
			o = null != (a = t.originalEvent.oldURL) ? a : e, i = window.location.href, r(n.handlers, o, i), e = i
		}), t = null, $(document).on("pjax:start", function() {
			return t = window.location.href
		}), $(document).on("pjax:end", function() {
			var e;
			return e = window.location.href, r(n.handlers, t, e)
		}), r = function(e, t, n) {
			var r, i, o, a, s, c;
			for ((a = window.location.hash.slice(1)) && (c = document.getElementById(a)), null == c && (c = window), r = {
				oldURL: t,
				newURL: n,
				target: c
			}, o = 0, s = e.length; s > o; o++) i = e[o], i.call(c, r)
		}, $.hashChange.clear = function() {
			return n.clear()
		}
	}.call(this),
	function() {
		$.pageFocused = function() {
			return new Promise(function(e) {
				var t;
				return t = function() {
					document.hasFocus() && (e(), document.removeEventListener("visibilitychange", t), window.removeEventListener("focus", t), window.removeEventListener("blur", t))
				}, document.addEventListener("visibilitychange", t), window.addEventListener("focus", t), window.addEventListener("blur", t), t()
			})
		}
	}.call(this),
	function() {
		var e, t, n;
		t = ["position:absolute;", "overflow:auto;", "word-wrap:break-word;", "top:0px;", "left:-9999px;"], n = ["box-sizing", "font-family", "font-size", "font-style", "font-variant", "font-weight", "height", "letter-spacing", "line-height", "max-height", "min-height", "padding-bottom", "padding-left", "padding-right", "padding-top", "border-bottom", "border-left", "border-right", "border-top", "text-decoration", "text-indent", "text-transform", "width", "word-spacing"], e = new WeakMap, $.fn.textFieldMirror = function(r) {
			var i, o, a, s, c, u, l, f, d, p, h, m;
			if ((m = this[0]) && (f = m.nodeName.toLowerCase(), "textarea" === f || "input" === f)) {
				if (u = e.get(m), u && u.parentElement === m.parentElement) u.innerHTML = "";
				else {
					for (u = document.createElement("div"), e.set(m, u), p = window.getComputedStyle(m), d = t.slice(0), d.push("textarea" === f ? "white-space:pre-wrap;" : "white-space:nowrap;"), a = 0, s = n.length; s > a; a++) l = n[a], d.push(l + ":" + p.getPropertyValue(l) + ";");
					u.style.cssText = d.join(" ")
				}
				return r !== !1 && (c = document.createElement("span"), c.style.cssText = "position: absolute;", c.className = "js-marker", c.innerHTML = "&nbsp;"), "number" == typeof r ? ((h = m.value.substring(0, r)) && (o = document.createTextNode(h)), (h = m.value.substring(r)) && (i = document.createTextNode(h))) : (h = m.value) && (o = document.createTextNode(h)), o && u.appendChild(o), c && u.appendChild(c), i && u.appendChild(i), u.parentElement || m.parentElement.insertBefore(u, m), u.scrollTop = m.scrollTop, u.scrollLeft = m.scrollLeft, u
			}
		}
	}.call(this),
	function() {
		$.fn.textFieldSelectionPosition = function(e) {
			var t, n, r;
			if ((r = this[0]) && (null == e && (e = r.selectionEnd), t = $(r).textFieldMirror(e))) return n = $(t).find(".js-marker").position(), n.top += parseInt($(t).css("border-top-width"), 10), n.left += parseInt($(t).css("border-left-width"), 10), setTimeout(function() {
				return $(t).remove()
			}, 5e3), n
		}
	}.call(this),
	function() {
		$.commafy = function(e) {
			return ("" + e).replace(/(^|[^\w.])(\d{4,})/g, function(e, t, n) {
				return t + n.replace(/\d(?=(?:\d\d\d)+(?!\d))/g, "$&,")
			})
		}
	}.call(this),
	function() {
		$.pluralize = function(e, t) {
			return t + (e > 1 || 0 === e ? "s" : "")
		}
	}.call(this),
	function() {
		var e, t, n, r, i;
		r = function(e) {
			var t, n;
			return 200 <= (n = e.status) && 300 > n ? Promise.resolve(e) : (t = new Error(e.statusText || e.status), t.response = e, Promise.reject(t))
		}, t = function(e) {
			return null == e && (e = {}), e.headers || (e.headers = {}), e.headers["X-Requested-With"] = "XMLHttpRequest", e
		}, e = function(e) {
			return null == e && (e = {}), null == e.credentials && (e.credentials = "same-origin"), e
		}, n = function(e) {
			return e.json()
		}, i = function(e) {
			return e.text()
		}, $.fetch = function(n, i) {
			return i = t(e(i)), fetch(n, i).then(r)
		}, $.fetchText = function(n, o) {
			return o = t(e(o)), fetch(n, o).then(r).then(i)
		}, $.fetchJSON = function(i, o) {
			return o = t(e(o)), o.headers.Accept = "application/json", fetch(i, o).then(r).then(n)
		}
	}.call(this),
	function() {
		$.fetchPoll = function(e, t) {
			return new Promise(function(n, r) {
				var i;
				return (i = function(o) {
					var a;
					return a = function(e) {
						switch (e.status) {
							case 200:
								return n(e);
							case 202:
								return setTimeout(function() {
									return i(1.5 * o)
								}, o);
							default:
								return r()
						}
					}, $.fetch(e, t).then(a, r)
				})(1e3)
			})
		}
	}.call(this),
	function() {
		! function() {
			var e;
			return e = 2
		}()
	}.call(this);