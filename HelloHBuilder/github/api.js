(function() {
	var e, t, n, r, i, s = {}.hasOwnProperty,
		o = [].slice;
	n = function(e) {
		if (console && console.log) return console.log(e)
	}, i = function(e) {
		if (console && console.warn) return console.warn(e)
	}, t = function(e, t) {
		var n, r, i;
		if (e.length !== t.length) return !1;
		for (n = r = 0, i = e.length; 0 <= i ? r < i : r > i; n = 0 <= i ? ++r : --r)
			if (e[n] !== t[n]) return !1;
		return !0
	}, e = {
		host: "collector.githubapp.com",
		type: "page_view",
		dimensions: {},
		measures: {},
		context: {},
		actor: {},
		image: new Image,
		performance: {},
		expectedPerformanceTimingKeys: ["connectEnd", "connectStart", "domComplete", "domContentLoadedEventEnd", "domContentLoadedEventStart", "domInteractive", "domLoading", "domainLookupEnd", "domainLookupStart", "fetchStart", "loadEventEnd", "loadEventStart", "navigationStart", "redirectEnd", "redirectStart", "requestStart", "responseEnd", "responseStart", "secureConnectionStart", "unloadEventEnd", "unloadEventStart"],
		recordPageView: function() {
			return this.applyMetaTags(), this.app == null ? (i("App not set, you are doing something wrong"), !1) : this.host == null ? (i("Host not set, you are doing something wrong"), !1) : (this.image.src = this._src(), this._clearPerformance(), !0)
		},
		setHost: function(e) {
			return this.host = e
		},
		setApp: function(e) {
			return this.app = e
		},
		setDimensions: function(e) {
			return this.dimensions = e
		},
		addDimensions: function(e) {
			var t, n, r, i;
			(r = this.dimensions) == null && (this.dimensions = {}), i = [];
			for (t in e) {
				if (!s.call(e, t)) continue;
				n = e[t], i.push(this.dimensions[t] = n)
			}
			return i
		},
		setMeasures: function(e) {
			return this.measures = e
		},
		setMeasures: function(e) {
			return this.measures = e
		},
		addMeasures: function(e) {
			var t, n, r, i;
			(r = this.measures) == null && (this.measures = {}), i = [];
			for (t in e) {
				if (!s.call(e, t)) continue;
				n = e[t], i.push(this.measures[t] = n)
			}
			return i
		},
		setContext: function(e) {
			return this.context = e
		},
		addContext: function(e) {
			var t, n, r, i;
			(r = this.context) == null && (this.context = {}), i = [];
			for (t in e) {
				if (!s.call(e, t)) continue;
				n = e[t], i.push(this.context[t] = n)
			}
			return i
		},
		setActor: function(e) {
			return this.actor = e
		},
		push: function(e) {
			return this.applyCall(e)
		},
		enablePerformance: function() {
			return this.performance = this._performanceTiming()
		},
		_recordSrc: function(e, t, n, r) {
			return "//" + this.host + "/" + this.app + "/" + e + "?" + this._queryString(t, n, r)
		},
		_src: function() {
			return "//" + this.host + "/" + this.app + "/" + this.type + "?" + this._queryString()
		},
		_queryString: function(e, t, n) {
			var r, i, s;
			return i = function() {
				var e, t;
				e = this._params(), t = [];
				for (r in e) s = e[r], t.push("dimensions[" + r + "]=" + s);
				return t
			}.call(this), i.push(this._encodeObject("dimensions", this._merge(this.dimensions, e))), i.push(this._encodeObject("measures", this._merge(this.measures, t))), this.performance != null && i.push(this._encodeObject("measures", {
				performance_timing: this.performance
			})), i.push(this._encodeObject("context", this._merge(this.context, n))), i.push(this._actor()), i.push(this._encodeObject("dimensions", {
				cid: this._clientId()
			})), i.join("&")
		},
		_clearPerformance: function() {
			return this.performance = null
		},
		_performanceTiming: function() {
			var e, t, n, r, i, s, o, u, a, f, l, c, h;
			if (((f = window.performance) != null ? (l = f.timing) != null ? l.navigationStart : void 0 : void 0) == null) return null;
			i = {}, c = this.expectedPerformanceTimingKeys;
			for (u = 0, a = c.length; u < a; u++) t = c[u], i[t] = (h = window.performance.timing[t]) != null ? h : 0;
			o = 1, r = [], e = i.navigationStart;
			for (t in i) s = i[t], n = s === 0 ? null : s - e, r.push(n);
			return o + "-" + r.join("-")
		},
		_params: function() {
			return {
				page: this._encode(this._page()),
				title: this._encode(this._title()),
				referrer: this._encode(this._referrer()),
				user_agent: this._encode(this._agent()),
				screen_resolution: this._encode(this._screenResolution()),
				pixel_ratio: this._encode(this._pixelRatio()),
				browser_resolution: this._encode(this._browserResolution()),
				tz_seconds: this._encode(this._tzSeconds()),
				timestamp: (new Date).getTime()
			}
		},
		_page: function() {
			try {
				return document.location.href
			} catch (e) {
				return ""
			}
		},
		_title: function() {
			try {
				return document.title
			} catch (e) {
				return ""
			}
		},
		_referrer: function() {
			var e;
			e = "";
			try {
				e = window.top.document.referrer
			} catch (t) {
				if (window.parent) try {
					e = window.parent.document.referrer
				} catch (t) {}
			}
			return e === "" && (e = document.referrer), e
		},
		_agent: function() {
			try {
				return navigator.userAgent
			} catch (e) {
				return ""
			}
		},
		_screenResolution: function() {
			try {
				return screen.width + "x" + screen.height
			} catch (e) {
				return "unknown"
			}
		},
		_pixelRatio: function() {
			return window.devicePixelRatio
		},
		_browserResolution: function() {
			var e, t, n, r;
			try {
				return t = 0, e = 0, typeof window.innerWidth == "number" ? (t = window.innerWidth, e = window.innerHeight) : ((n = document.documentElement) != null ? n.clientWidth : void 0) != null ? (t = document.documentElement.clientWidth, e = document.documentElement.clientHeight) : ((r = document.body) != null ? r.clientWidth : void 0) != null && (t = document.body.clientWidth, e = document.body.clientHeight), t + "x" + e
			} catch (i) {
				return "unknown"
			}
		},
		_tzSeconds: function() {
			try {
				return (new Date).getTimezoneOffset() * -60
			} catch (e) {
				return ""
			}
		},
		_merge: function() {
			var e, t, n, r, i, s, u;
			r = 1 <= arguments.length ? o.call(arguments, 0) : [], t = {};
			for (s = 0, u = r.length; s < u; s++) {
				n = r[s];
				for (e in n) i = n[e], t[e] = i
			}
			return t
		},
		_encodeObject: function(e, t) {
			var n, r, i, s, o;
			r = [];
			if (Array.isArray != null && Array.isArray(t) || Object.prototype.toString.call(t) === "[object Array]")
				for (s = 0, o = t.length; s < o; s++) n = t[s], r.push(this._encodeObject("" + e + "[]", n));
			else if (t === Object(t))
				for (i in t) r.push(this._encodeObject("" + e + "[" + i + "]", t[i]));
			else r.push("" + e + "=" + this._encode(t));
			return r.join("&")
		},
		_actor: function() {
			var e, t, n, r, i, s, o, u;
			t = [], u = this.actor;
			for (r in u) {
				i = u[r], e = "dimensions[actor_" + r + "]";
				if (i.join)
					for (s = 0, o = i.length; s < o; s++) n = i[s], t.push("" + e + "[]=" + this._encode(n));
				else t.push("" + e + "=" + this._encode(i))
			}
			return t.join("&")
		},
		_getCookie: function(e) {
			var t, n, r, i, s, o, u, a;
			r = [], a = document.cookie.split(";");
			for (o = 0, u = a.length; o < u; o++) {
				t = a[o], i = t.trim().split("=");
				if (i.length < 2) continue;
				n = i[0], s = i[1], n === e && r.push({
					key: n,
					value: s
				})
			}
			return r
		},
		_clientId: function() {
			var e;
			return e = this._getClientId(), e === "" && (e = this._setClientId()), e
		},
		_getClientId: function() {
			var e, t, n, r, i, s, o, u, a;
			r = this._getCookie("_octo"), t = [];
			for (u = 0, a = r.length; u < a; u++) n = r[u], s = n.value.split("."), i = s.shift(), i === "GH1" && s.length > 1 && (o = s.shift().split("-"), o.length === 1 && (o[1] = "1"), o[0] *= 1, o[1] *= 1, e = s.join("."), t.push([o, e]));
			return e = "", t.length > 0 && (e = t.sort().reverse()[0][1]), e
		},
		_setClientId: function() {
			var e, t, n, r, i;
			return i = (new Date).getTime(), e = Math.round(Math.random() * (Math.pow(2, 31) - 1)) + "." + Math.round(i / 1e3), t = "GH1.1." + e, r = (new Date(i + 63072e6)).toGMTString(), n = "." + document.domain.split(".").reverse().slice(0, 2).reverse().join("."), document.cookie = "_octo=" + t + "; expires=" + r + "; path=/; domain=" + n, e
		},
		_encode: function(e) {
			return e != null ? window.encodeURIComponent(e) : ""
		},
		applyQueuedCalls: function(e) {
			var t, n, r, i;
			i = [];
			for (n = 0, r = e.length; n < r; n++) t = e[n], i.push(this.applyCall(t));
			return i
		},
		applyCall: function(e) {
			var t, n;
			return n = e[0], t = e.slice(1), this[n] ? this[n].apply(this, t) : i("" + n + " is not a valid method")
		},
		applyMetaTags: function() {
			var e;
			return e = this.loadMetaTags(), e.host && this.setHost(e.host), e.app && this.setApp(e.app), this._objectIsEmpty(e.actor) || this.setActor(e.actor), this.addDimensions(e.dimensions), this.addMeasures(e.measures), this.addContext(e.context)
		},
		loadMetaTags: function() {
			var e, t, n, r, i, s;
			n = {
				dimensions: {},
				measures: {},
				context: {},
				actor: {}
			}, s = document.getElementsByTagName("meta");
			for (r = 0, i = s.length; r < i; r++) {
				e = s[r];
				if (e.name && e.content)
					if (t = e.name.match(this.octolyticsMetaTagName)) switch (t[1]) {
						case "host":
							n.host = e.content;
							break;
						case "app-id":
							n.app = e.content;
							break;
						case "app":
							n.app = e.content;
							break;
						case "dimension":
							this._addField(n.dimensions, t[2], e);
							break;
						case "measure":
							this._addField(n.measures, t[2], e);
							break;
						case "context":
							this._addField(n.context, t[2], e);
							break;
						case "actor":
							this._addField(n.actor, t[2], e)
					}
			}
			return n
		},
		_addField: function(e, t, n) {
			var r;
			return n.attributes["data-array"] ? ((r = e[t]) == null && (e[t] = []), e[t].push(n.content)) : e[t] = n.content
		},
		_objectIsEmpty: function(e) {
			var t, n;
			for (t in e) {
				if (!s.call(e, t)) continue;
				return n = e[t], !1
			}
			return !0
		},
		octolyticsMetaTagName: /^octolytics-(host|app-id|app|dimension|measure|context|actor)-?(.*)/
	}, window._octo ? window._octo.slice && (r = window._octo.slice(0), window._octo = e, window._octo.applyQueuedCalls(r)) : window._octo = e
}).call(this);