! function(e, t) {
	function r(e) {
		return function(t) {
			return Object.prototype.toString.call(t) === "[object " + e + "]";
		};
	}

	function n() {
		return S++;
	}

	function a(e) {
		return e.match(q)[0];
	}

	function i(e) {
		for (e = e.replace(C, "/"); e.match(I);) e = e.replace(I, "/");
		return e;
	}

	function s(e) {
		var t = e.length - 1,
			r = e.charAt(t);
		return "#" === r ? e.substring(0, t) : ".js" === e.substring(t - 2) || e.indexOf("?") > 0 || ".css" === e.substring(t - 3) || "/" === r ? e : e + ".js";
	}

	function o(e) {
		var t = b.alias;
		return t && T(t[e]) ? t[e] : e;
	}

	function u(e) {
		var t, r = b.paths;
		return r && (t = e.match(G)) && T(r[t[1]]) && (e = r[t[1]] + t[2]), e;
	}

	function c(e) {
		var t = b.vars;
		return t && e.indexOf("{") > -1 && (e = e.replace(R, function(e, r) {
			return T(t[r]) ? t[r] : e;
		})), e;
	}

	function f(e) {
		var t = b.map,
			r = e;
		if (t)
			for (var n = 0, a = t.length; a > n; n++) {
				var i = t[n];
				if (r = w(i) ? i(e) || e : e.replace(i[0], i[1]), r !== e) break;
			}
		return r;
	}

	function l(e, t) {
		var r, n = e.charAt(0);
		if ($.test(e)) r = e;
		else if ("." === n) r = i((t ? a(t) : b.cwd) + e);
		else if ("/" === n) {
			var s = b.cwd.match(k);
			r = s ? s[0] + e.substring(1) : e;
		} else r = b.base + e;
		return r;
	}

	function d(e, t) {
		if (!e) return "";
		e = o(e), e = u(e), e = c(e), e = s(e);
		var r = l(e, t);
		return r = f(r);
	}

	function v(e) {
		return e.hasAttribute ? e.src : e.getAttribute("src", 4);
	}

	function h(e, t, r) {
		var n = K.test(e),
			a = L.createElement(n ? "link" : "script");
		if (r) {
			var i = w(r) ? r(e) : r;
			i && (a.charset = i);
		}
		p(a, t, n), n ? (a.rel = "stylesheet", a.href = e) : (a.async = !0, a.src = e), O = a, P ? M.insertBefore(a, P) : M.appendChild(a),
			O = null;
	}

	function p(e, t, r) {
		var n = r && (Y || !("onload" in e));
		return n ? void setTimeout(function() {
			g(e, t);
		}, 1) : void(e.onload = e.onerror = e.onreadystatechange = function() {
			W.test(e.readyState) && (e.onload = e.onerror = e.onreadystatechange = null, r || b.debug || M.removeChild(e),
				e = null, t());
		});
	}

	function g(e, t) {
		var r, n = e.sheet;
		if (Y) n && (r = !0);
		else if (n) try {
			n.cssRules && (r = !0);
		} catch (a) {
			"NS_ERROR_DOM_SECURITY_ERR" === a.name && (r = !0);
		}
		setTimeout(function() {
			r ? t() : g(e, t);
		}, 20);
	}

	function m() {
		if (O) return O;
		if (x && "interactive" === x.readyState) return x;
		for (var e = M.getElementsByTagName("script"), t = e.length - 1; t >= 0; t--) {
			var r = e[t];
			if ("interactive" === r.readyState) return x = r;
		}
	}

	function E(e) {
		var t = [];
		return e.replace(J, "").replace(z, function(e, r, n) {
			n && t.push(n);
		}), t;
	}

	function y(e, t) {
		this.uri = e, this.dependencies = t || [], this.exports = null, this.status = 0, this._waitings = {},
			this._remain = 0;
	}
	if (!e.seajs) {
		var _ = e.seajs = {
				version: "2.1.1"
			},
			b = _.data = {},
			A = r("Object"),
			T = r("String"),
			D = Array.isArray || r("Array"),
			w = r("Function"),
			S = 0,
			N = b.events = {};
		_.on = function(e, t) {
			var r = N[e] || (N[e] = []);
			return r.push(t), _;
		}, _.off = function(e, t) {
			if (!e && !t) return N = b.events = {}, _;
			var r = N[e];
			if (r)
				if (t)
					for (var n = r.length - 1; n >= 0; n--) r[n] === t && r.splice(n, 1);
				else delete N[e];
			return _;
		};
		var O, x, U, j = _.emit = function(e, t) {
				var r, n = N[e];
				if (n)
					for (n = n.slice(); r = n.shift();) r(t);
				return _;
			},
			q = /[^?#]*\//,
			C = /\/\.\//g,
			I = /\/[^/]+\/\.\.\//,
			G = /^([^/:]+)(\/.+)$/,
			R = /{([^{]+)}/g,
			$ = /^\/\/.|:\//,
			k = /^.*?\/\/.*?\//,
			L = document,
			B = location,
			X = a(B.href),
			F = L.getElementsByTagName("script"),
			V = L.getElementById("seajsnode") || F[F.length - 1],
			H = a(v(V) || X),
			M = L.getElementsByTagName("head")[0] || L.documentElement,
			P = M.getElementsByTagName("base")[0],
			K = /\.css(?:\?|$)/i,
			W = /^(?:loaded|complete|undefined)$/,
			Y = 1 * navigator.userAgent.replace(/.*AppleWebKit\/(\d+)\..*/, "$1") < 536,
			z = /"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g,
			J = /\\\\/g,
			Q = _.cache = {},
			Z = {},
			et = {},
			tt = {},
			rt = y.STATUS = {
				FETCHING: 1,
				SAVED: 2,
				LOADING: 3,
				LOADED: 4,
				EXECUTING: 5,
				EXECUTED: 6
			};
		y.prototype.resolve = function() {
				for (var e = this, t = e.dependencies, r = [], n = 0, a = t.length; a > n; n++) r[n] = y.resolve(t[n], e.uri);
				return r;
			}, y.prototype.load = function() {
				var e = this;
				if (!(e.status >= rt.LOADING)) {
					e.status = rt.LOADING;
					var t = e.resolve();
					j("load", t);
					for (var r, n = e._remain = t.length, a = 0; n > a; a++) r = y.get(t[a]), r.status < rt.LOADED ? r._waitings[e.uri] = (r._waitings[e.uri] || 0) + 1 : e._remain--;
					if (0 === e._remain) return void e.onload();
					var i = {};
					for (a = 0; n > a; a++) r = Q[t[a]], r.status < rt.FETCHING ? r.fetch(i) : r.status === rt.SAVED && r.load();
					for (var s in i) i.hasOwnProperty(s) && i[s]();
				}
			}, y.prototype.onload = function() {
				var e = this;
				e.status = rt.LOADED, e.callback && e.callback();
				var t, r, n = e._waitings;
				for (t in n) n.hasOwnProperty(t) && (r = Q[t], r._remain -= n[t], 0 === r._remain && r.onload());
				delete e._waitings, delete e._remain;
			}, y.prototype.fetch = function(e) {
				function t() {
					h(i.requestUri, i.onRequest, i.charset);
				}

				function r() {
					delete Z[s], et[s] = !0, U && (y.save(a, U), U = null);
					var e, t = tt[s];
					for (delete tt[s]; t && (e = t.shift());) e.load();
				}
				var n = this,
					a = n.uri;
				n.status = rt.FETCHING;
				var i = {
					uri: a
				};
				j("fetch", i);
				var s = i.requestUri || a;
				return !s || et[s] ? void n.load() : Z[s] ? void tt[s].push(n) : (Z[s] = !0, tt[s] = [n], j("request", i = {
					uri: a,
					requestUri: s,
					onRequest: r,
					charset: b.charset
				}), void(i.requested || (e ? e[i.requestUri] = t : t())));
			}, y.prototype.exec = function() {
				function e(t) {
					return y.get(e.resolve(t)).exec();
				}
				var r = this;
				if (r.status >= rt.EXECUTING) return r.exports;
				r.status = rt.EXECUTING;
				var a = r.uri;
				e.resolve = function(e) {
					return y.resolve(e, a);
				}, e.async = function(t, r) {
					return y.use(t, r, a + "_async_" + n()), e;
				};
				var i = r.factory,
					s = w(i) ? i(e, r.exports = {}, r) : i;
				return s === t && (s = r.exports), null !== s || K.test(a) || j("error", r), delete r.factory, r.exports = s,
					r.status = rt.EXECUTED, j("exec", r), s;
			}, y.resolve = function(e, t) {
				var r = {
					id: e,
					refUri: t
				};
				return j("resolve", r), r.uri || d(r.id, t);
			}, y.define = function(e, r, n) {
				var a = arguments.length;
				1 === a ? (n = e, e = t) : 2 === a && (n = r, D(e) ? (r = e, e = t) : r = t), !D(r) && w(n) && (r = E(n.toString()));
				var i = {
					id: e,
					uri: y.resolve(e),
					deps: r,
					factory: n
				};
				if (!i.uri && L.attachEvent) {
					var s = m();
					s && (i.uri = s.src);
				}
				j("define", i), i.uri ? y.save(i.uri, i) : U = i;
			}, y.save = function(e, t) {
				var r = y.get(e);
				r.status < rt.SAVED && (r.id = t.id || e, r.dependencies = t.deps || [], r.factory = t.factory, r.status = rt.SAVED);
			}, y.get = function(e, t) {
				return Q[e] || (Q[e] = new y(e, t));
			}, y.use = function(t, r, n) {
				var a = y.get(n, D(t) ? t : [t]);
				a.callback = function() {
					for (var t = [], n = a.resolve(), i = 0, s = n.length; s > i; i++) t[i] = Q[n[i]].exec();
					r && r.apply(e, t), delete a.callback;
				}, a.load();
			}, y.preload = function(e) {
				var t = b.preload,
					r = t.length;
				r ? y.use(t, function() {
					t.splice(0, r), y.preload(e);
				}, b.cwd + "_preload_" + n()) : e();
			}, _.use = function(e, t) {
				return y.preload(function() {
					y.use(e, t, b.cwd + "_use_" + n());
				}), _;
			}, y.define.cmd = {}, e.define = y.define, _.Module = y, b.fetchedList = et, b.cid = n, _.resolve = d,
			_.require = function(e) {
				return (Q[y.resolve(e)] || {}).exports;
			};
		var nt = /^(.+?\/)(\?\?)?(seajs\/)+/;
		b.base = (H.match(nt) || ["", H])[1], b.dir = H, b.cwd = X, b.charset = "utf-8", b.preload = function() {
			var e = [],
				t = B.search.replace(/(seajs-\w+)(&|$)/g, "$1=1$2");
			return t += " " + L.cookie, t.replace(/(seajs-\w+)=1/g, function(t, r) {
				e.push(r);
			}), e;
		}(), _.config = function(e) {
			for (var t in e) {
				var r = e[t],
					n = b[t];
				if (n && A(n))
					for (var a in r) n[a] = r[a];
				else D(n) ? r = n.concat(r) : "base" === t && ("/" === r.slice(-1) || (r += "/"),
					r = l(r)), b[t] = r;
			}
			return j("config", e), _;
		};
	}
}(this);;
! function(a) {
	function t(t) {
		var n = t.length;
		if (!(2 > n)) {
			u.comboSyntax && (p = u.comboSyntax), u.comboMaxLength && (f = u.comboMaxLength), i = u.comboExcludes;
			for (var x = [], v = 0; n > v; v++) {
				var b = t[v];
				if (!h[b]) {
					var l = c.get(b),
						g = r(b);
					!(l.status < d) || s(b) || o(b) || ".js" != g && ".css" != g || x.push(b);
				}
			}
			if (x.length > 1)
				for (var m = e(x), p = u.comboSyntax || ["/c/=", ","], S = a.data.base, j = S.replace(p[0], ""), v = 0; v < x.length; ++v) {
					var b = x[v],
						y = (r(b), b.substr(j.length));
					"/" != y[0] && (y = "/" + y), h[b] = m[y];
				}
		}
	}

	function n(a) {
		var t = r(a.uri);
		a.requestUri = ".js" == t || ".css" == t ? h[a.uri] || a.uri.replace("/c/=", "") : a.uri;
	}

	function e(t) {
		var n = u.comboSyntax || ["/c/=", ","],
			e = a.data.base,
			s = [],
			o = {},
			i = e.replace(n[0], ""),
			s = {};
		"/" == e[e.length - 1] && (e = e.substr(0, e.length - 1));
		for (var c = 0; c < t.length; ++c) {
			var d = t[c],
				h = d.substr(i.length),
				f = r(d);
			"/" != h[0] && (h = "/" + h), o[f] = o[f] || {
				idx: 0,
				data: []
			};
			var x = o[f];
			x.data[x.idx] = x.data[x.idx] || [], x.data[x.idx].join(n[1]).length >= 1024 && (x.idx++,
				x.data[x.idx] = []), x.data[x.idx].push(h), s[h] = x.idx, o[f] = x;
		}
		for (var v in s) {
			var f = r(v);
			s[v] = e + o[f].data[s[v]].join(n[1]);
		}
		return s;
	}

	function r(a) {
		var t = a.lastIndexOf(".");
		return t >= 0 ? a.substring(t) : "";
	}

	function s(a) {
		return i ? i.test ? i.test(a) : i(a) : void 0;
	}

	function o(a) {
		var t = u.comboSyntax || ["??", ","],
			n = t[0],
			e = t[1];
		return n && a.indexOf(n) > 0 || e && a.indexOf(e) > 0;
	}
	var i, c = a.Module,
		d = c.STATUS.FETCHING,
		u = a.data,
		h = u.comboHash = {},
		f = 2e3;
	if (a.on("load", t), a.on("fetch", n), u.test) {
		var x = a.test || (a.test = {});
		x.uris2paths = e, x.paths2hash = paths2hash;
	}
	define("seajs-combo-debug", [], {});
}(seajs);;
! function(e) {
	var t = "mp.weixin.qq.com" == location.hostname || "mpc.weixin.qq.com" == location.hostname || "mpd.weixin.qq.com" == location.hostname ? "https://res.wx.qq.com/" : "/",
		n = function(e) {
			var t = e.lastIndexOf(".");
			return t >= 0 ? e.substring(t) : "";
		};
	"undefined" != typeof MODULES && (t += "c/=");
	var i = e.data.pathinfo = {
		".js": "mpres/zh_CN/htmledition/js/",
		".tpl": "mpres/zh_CN/htmledition/js/",
		".html": "mpres/zh_CN/htmledition/js/",
		".css": "mpres/htmledition/style/"
	};
	e.config({
		base: t,
		map: [
			function(t) {
				var s = n(t),
					a = e.data.base,
					o = t.substr(a.length);
				if ("undefined" != typeof MODULES && MODULES[o]) {
					var c = MODULES[o],
						r = c;
					return 0 == r.indexOf("http://") || 0 == r.indexOf("https://") ? r : (-1 == r.indexOf(a.replace("/c/=", "")) && (r = a + c),
						".js" != s && ".css" != s && (r = r.replace("/c/=", "")), r);
				}
				return a.replace("/c/=", "") + i[s] + o + "?20130807";
			}
		]
	});
}(seajs);;