! function(a) {
    a.Parse = a.Parse || {}, a.Parse.VERSION = "js1.3.2"
}(this),
function() {
    var a = this,
        b = a._,
        c = {},
        d = Array.prototype,
        e = Object.prototype,
        f = Function.prototype,
        g = d.push,
        h = d.slice,
        i = d.concat,
        j = e.toString,
        k = e.hasOwnProperty,
        l = d.forEach,
        m = d.map,
        n = d.reduce,
        o = d.reduceRight,
        p = d.filter,
        q = d.every,
        r = d.some,
        s = d.indexOf,
        t = d.lastIndexOf,
        u = Array.isArray,
        v = Object.keys,
        w = f.bind,
        x = function(a) {
            return a instanceof x ? a : this instanceof x ? (this._wrapped = a, void 0) : new x(a)
        };
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = x), exports._ = x) : a._ = x, x.VERSION = "1.4.4";
    var y = x.each = x.forEach = function(a, b, d) {
        if (null != a)
            if (l && a.forEach === l) a.forEach(b, d);
            else if (a.length === +a.length) {
            for (var e = 0, f = a.length; f > e; e++)
                if (b.call(d, a[e], e, a) === c) return
        } else
            for (var g in a)
                if (x.has(a, g) && b.call(d, a[g], g, a) === c) return
    };
    x.map = x.collect = function(a, b, c) {
        var d = [];
        return null == a ? d : m && a.map === m ? a.map(b, c) : (y(a, function(a, e, f) {
            d[d.length] = b.call(c, a, e, f)
        }), d)
    };
    var z = "Reduce of empty array with no initial value";
    x.reduce = x.foldl = x.inject = function(a, b, c, d) {
        var e = arguments.length > 2;
        if (null == a && (a = []), n && a.reduce === n) return d && (b = x.bind(b, d)), e ? a.reduce(b, c) : a.reduce(b);
        if (y(a, function(a, f, g) {
                e ? c = b.call(d, c, a, f, g) : (c = a, e = !0)
            }), !e) throw new TypeError(z);
        return c
    }, x.reduceRight = x.foldr = function(a, b, c, d) {
        var e = arguments.length > 2;
        if (null == a && (a = []), o && a.reduceRight === o) return d && (b = x.bind(b, d)), e ? a.reduceRight(b, c) : a.reduceRight(b);
        var f = a.length;
        if (f !== +f) {
            var g = x.keys(a);
            f = g.length
        }
        if (y(a, function(h, i, j) {
                i = g ? g[--f] : --f, e ? c = b.call(d, c, a[i], i, j) : (c = a[i], e = !0)
            }), !e) throw new TypeError(z);
        return c
    }, x.find = x.detect = function(a, b, c) {
        var d;
        return A(a, function(a, e, f) {
            return b.call(c, a, e, f) ? (d = a, !0) : void 0
        }), d
    }, x.filter = x.select = function(a, b, c) {
        var d = [];
        return null == a ? d : p && a.filter === p ? a.filter(b, c) : (y(a, function(a, e, f) {
            b.call(c, a, e, f) && (d[d.length] = a)
        }), d)
    }, x.reject = function(a, b, c) {
        return x.filter(a, function(a, d, e) {
            return !b.call(c, a, d, e)
        }, c)
    }, x.every = x.all = function(a, b, d) {
        b || (b = x.identity);
        var e = !0;
        return null == a ? e : q && a.every === q ? a.every(b, d) : (y(a, function(a, f, g) {
            return (e = e && b.call(d, a, f, g)) ? void 0 : c
        }), !!e)
    };
    var A = x.some = x.any = function(a, b, d) {
        b || (b = x.identity);
        var e = !1;
        return null == a ? e : r && a.some === r ? a.some(b, d) : (y(a, function(a, f, g) {
            return e || (e = b.call(d, a, f, g)) ? c : void 0
        }), !!e)
    };
    x.contains = x.include = function(a, b) {
        return null == a ? !1 : s && a.indexOf === s ? -1 != a.indexOf(b) : A(a, function(a) {
            return a === b
        })
    }, x.invoke = function(a, b) {
        var c = h.call(arguments, 2),
            d = x.isFunction(b);
        return x.map(a, function(a) {
            return (d ? b : a[b]).apply(a, c)
        })
    }, x.pluck = function(a, b) {
        return x.map(a, function(a) {
            return a[b]
        })
    }, x.where = function(a, b, c) {
        return x.isEmpty(b) ? c ? null : [] : x[c ? "find" : "filter"](a, function(a) {
            for (var c in b)
                if (b[c] !== a[c]) return !1;
            return !0
        })
    }, x.findWhere = function(a, b) {
        return x.where(a, b, !0)
    }, x.max = function(a, b, c) {
        if (!b && x.isArray(a) && a[0] === +a[0] && a.length < 65535) return Math.max.apply(Math, a);
        if (!b && x.isEmpty(a)) return -1 / 0;
        var d = {
            computed: -1 / 0,
            value: -1 / 0
        };
        return y(a, function(a, e, f) {
            var g = b ? b.call(c, a, e, f) : a;
            g >= d.computed && (d = {
                value: a,
                computed: g
            })
        }), d.value
    }, x.min = function(a, b, c) {
        if (!b && x.isArray(a) && a[0] === +a[0] && a.length < 65535) return Math.min.apply(Math, a);
        if (!b && x.isEmpty(a)) return 1 / 0;
        var d = {
            computed: 1 / 0,
            value: 1 / 0
        };
        return y(a, function(a, e, f) {
            var g = b ? b.call(c, a, e, f) : a;
            g < d.computed && (d = {
                value: a,
                computed: g
            })
        }), d.value
    }, x.shuffle = function(a) {
        var b, c = 0,
            d = [];
        return y(a, function(a) {
            b = x.random(c++), d[c - 1] = d[b], d[b] = a
        }), d
    };
    var B = function(a) {
        return x.isFunction(a) ? a : function(b) {
            return b[a]
        }
    };
    x.sortBy = function(a, b, c) {
        var d = B(b);
        return x.pluck(x.map(a, function(a, b, e) {
            return {
                value: a,
                index: b,
                criteria: d.call(c, a, b, e)
            }
        }).sort(function(a, b) {
            var c = a.criteria,
                d = b.criteria;
            if (c !== d) {
                if (c > d || void 0 === c) return 1;
                if (d > c || void 0 === d) return -1
            }
            return a.index < b.index ? -1 : 1
        }), "value")
    };
    var C = function(a, b, c, d) {
        var e = {},
            f = B(b || x.identity);
        return y(a, function(b, g) {
            var h = f.call(c, b, g, a);
            d(e, h, b)
        }), e
    };
    x.groupBy = function(a, b, c) {
        return C(a, b, c, function(a, b, c) {
            (x.has(a, b) ? a[b] : a[b] = []).push(c)
        })
    }, x.countBy = function(a, b, c) {
        return C(a, b, c, function(a, b) {
            x.has(a, b) || (a[b] = 0), a[b] ++
        })
    }, x.sortedIndex = function(a, b, c, d) {
        c = null == c ? x.identity : B(c);
        for (var e = c.call(d, b), f = 0, g = a.length; g > f;) {
            var h = f + g >>> 1;
            c.call(d, a[h]) < e ? f = h + 1 : g = h
        }
        return f
    }, x.toArray = function(a) {
        return a ? x.isArray(a) ? h.call(a) : a.length === +a.length ? x.map(a, x.identity) : x.values(a) : []
    }, x.size = function(a) {
        return null == a ? 0 : a.length === +a.length ? a.length : x.keys(a).length
    }, x.first = x.head = x.take = function(a, b, c) {
        return null == a ? void 0 : null == b || c ? a[0] : h.call(a, 0, b)
    }, x.initial = function(a, b, c) {
        return h.call(a, 0, a.length - (null == b || c ? 1 : b))
    }, x.last = function(a, b, c) {
        return null == a ? void 0 : null == b || c ? a[a.length - 1] : h.call(a, Math.max(a.length - b, 0))
    }, x.rest = x.tail = x.drop = function(a, b, c) {
        return h.call(a, null == b || c ? 1 : b)
    }, x.compact = function(a) {
        return x.filter(a, x.identity)
    };
    var D = function(a, b, c) {
        return y(a, function(a) {
            x.isArray(a) ? b ? g.apply(c, a) : D(a, b, c) : c.push(a)
        }), c
    };
    x.flatten = function(a, b) {
        return D(a, b, [])
    }, x.without = function(a) {
        return x.difference(a, h.call(arguments, 1))
    }, x.uniq = x.unique = function(a, b, c, d) {
        x.isFunction(b) && (d = c, c = b, b = !1);
        var e = c ? x.map(a, c, d) : a,
            f = [],
            g = [];
        return y(e, function(c, d) {
            (b ? d && g[g.length - 1] === c : x.contains(g, c)) || (g.push(c), f.push(a[d]))
        }), f
    }, x.union = function() {
        return x.uniq(i.apply(d, arguments))
    }, x.intersection = function(a) {
        var b = h.call(arguments, 1);
        return x.filter(x.uniq(a), function(a) {
            return x.every(b, function(b) {
                return x.indexOf(b, a) >= 0
            })
        })
    }, x.difference = function(a) {
        var b = i.apply(d, h.call(arguments, 1));
        return x.filter(a, function(a) {
            return !x.contains(b, a)
        })
    }, x.zip = function() {
        for (var a = h.call(arguments), b = x.max(x.pluck(a, "length")), c = new Array(b), d = 0; b > d; d++) c[d] = x.pluck(a, "" + d);
        return c
    }, x.object = function(a, b) {
        if (null == a) return {};
        for (var c = {}, d = 0, e = a.length; e > d; d++) b ? c[a[d]] = b[d] : c[a[d][0]] = a[d][1];
        return c
    }, x.indexOf = function(a, b, c) {
        if (null == a) return -1;
        var d = 0,
            e = a.length;
        if (c) {
            if ("number" != typeof c) return d = x.sortedIndex(a, b), a[d] === b ? d : -1;
            d = 0 > c ? Math.max(0, e + c) : c
        }
        if (s && a.indexOf === s) return a.indexOf(b, c);
        for (; e > d; d++)
            if (a[d] === b) return d;
        return -1
    }, x.lastIndexOf = function(a, b, c) {
        if (null == a) return -1;
        var d = null != c;
        if (t && a.lastIndexOf === t) return d ? a.lastIndexOf(b, c) : a.lastIndexOf(b);
        for (var e = d ? c : a.length; e--;)
            if (a[e] === b) return e;
        return -1
    }, x.range = function(a, b, c) {
        arguments.length <= 1 && (b = a || 0, a = 0), c = arguments[2] || 1;
        for (var d = Math.max(Math.ceil((b - a) / c), 0), e = 0, f = new Array(d); d > e;) f[e++] = a, a += c;
        return f
    }, x.bind = function(a, b) {
        if (a.bind === w && w) return w.apply(a, h.call(arguments, 1));
        var c = h.call(arguments, 2);
        return function() {
            return a.apply(b, c.concat(h.call(arguments)))
        }
    }, x.partial = function(a) {
        var b = h.call(arguments, 1);
        return function() {
            return a.apply(this, b.concat(h.call(arguments)))
        }
    }, x.bindAll = function(a) {
        var b = h.call(arguments, 1);
        return 0 === b.length && (b = x.functions(a)), y(b, function(b) {
            a[b] = x.bind(a[b], a)
        }), a
    }, x.memoize = function(a, b) {
        var c = {};
        return b || (b = x.identity),
            function() {
                var d = b.apply(this, arguments);
                return x.has(c, d) ? c[d] : c[d] = a.apply(this, arguments)
            }
    }, x.delay = function(a, b) {
        var c = h.call(arguments, 2);
        return setTimeout(function() {
            return a.apply(null, c)
        }, b)
    }, x.defer = function(a) {
        return x.delay.apply(x, [a, 1].concat(h.call(arguments, 1)))
    }, x.throttle = function(a, b) {
        var c, d, e, f, g = 0,
            h = function() {
                g = new Date, e = null, f = a.apply(c, d)
            };
        return function() {
            var i = new Date,
                j = b - (i - g);
            return c = this, d = arguments, 0 >= j ? (clearTimeout(e), e = null, g = i, f = a.apply(c, d)) : e || (e = setTimeout(h, j)), f
        }
    }, x.debounce = function(a, b, c) {
        var d, e;
        return function() {
            var f = this,
                g = arguments,
                h = function() {
                    d = null, c || (e = a.apply(f, g))
                },
                i = c && !d;
            return clearTimeout(d), d = setTimeout(h, b), i && (e = a.apply(f, g)), e
        }
    }, x.once = function(a) {
        var b, c = !1;
        return function() {
            return c ? b : (c = !0, b = a.apply(this, arguments), a = null, b)
        }
    }, x.wrap = function(a, b) {
        return function() {
            var c = [a];
            return g.apply(c, arguments), b.apply(this, c)
        }
    }, x.compose = function() {
        var a = arguments;
        return function() {
            for (var b = arguments, c = a.length - 1; c >= 0; c--) b = [a[c].apply(this, b)];
            return b[0]
        }
    }, x.after = function(a, b) {
        return 0 >= a ? b() : function() {
            return --a < 1 ? b.apply(this, arguments) : void 0
        }
    }, x.keys = v || function(a) {
        if (a !== Object(a)) throw new TypeError("Invalid object");
        var b = [];
        for (var c in a) x.has(a, c) && (b[b.length] = c);
        return b
    }, x.values = function(a) {
        var b = [];
        for (var c in a) x.has(a, c) && b.push(a[c]);
        return b
    }, x.pairs = function(a) {
        var b = [];
        for (var c in a) x.has(a, c) && b.push([c, a[c]]);
        return b
    }, x.invert = function(a) {
        var b = {};
        for (var c in a) x.has(a, c) && (b[a[c]] = c);
        return b
    }, x.functions = x.methods = function(a) {
        var b = [];
        for (var c in a) x.isFunction(a[c]) && b.push(c);
        return b.sort()
    }, x.extend = function(a) {
        return y(h.call(arguments, 1), function(b) {
            if (b)
                for (var c in b) a[c] = b[c]
        }), a
    }, x.pick = function(a) {
        var b = {},
            c = i.apply(d, h.call(arguments, 1));
        return y(c, function(c) {
            c in a && (b[c] = a[c])
        }), b
    }, x.omit = function(a) {
        var b = {},
            c = i.apply(d, h.call(arguments, 1));
        for (var e in a) x.contains(c, e) || (b[e] = a[e]);
        return b
    }, x.defaults = function(a) {
        return y(h.call(arguments, 1), function(b) {
            if (b)
                for (var c in b) null == a[c] && (a[c] = b[c])
        }), a
    }, x.clone = function(a) {
        return x.isObject(a) ? x.isArray(a) ? a.slice() : x.extend({}, a) : a
    }, x.tap = function(a, b) {
        return b(a), a
    };
    var E = function(a, b, c, d) {
        if (a === b) return 0 !== a || 1 / a == 1 / b;
        if (null == a || null == b) return a === b;
        a instanceof x && (a = a._wrapped), b instanceof x && (b = b._wrapped);
        var e = j.call(a);
        if (e != j.call(b)) return !1;
        switch (e) {
            case "[object String]":
                return a == String(b);
            case "[object Number]":
                return a != +a ? b != +b : 0 == a ? 1 / a == 1 / b : a == +b;
            case "[object Date]":
            case "[object Boolean]":
                return +a == +b;
            case "[object RegExp]":
                return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase
        }
        if ("object" != typeof a || "object" != typeof b) return !1;
        for (var f = c.length; f--;)
            if (c[f] == a) return d[f] == b;
        c.push(a), d.push(b);
        var g = 0,
            h = !0;
        if ("[object Array]" == e) {
            if (g = a.length, h = g == b.length)
                for (; g-- && (h = E(a[g], b[g], c, d)););
        } else {
            var i = a.constructor,
                k = b.constructor;
            if (i !== k && !(x.isFunction(i) && i instanceof i && x.isFunction(k) && k instanceof k)) return !1;
            for (var l in a)
                if (x.has(a, l) && (g++, !(h = x.has(b, l) && E(a[l], b[l], c, d)))) break;
            if (h) {
                for (l in b)
                    if (x.has(b, l) && !g--) break;
                h = !g
            }
        }
        return c.pop(), d.pop(), h
    };
    x.isEqual = function(a, b) {
        return E(a, b, [], [])
    }, x.isEmpty = function(a) {
        if (null == a) return !0;
        if (x.isArray(a) || x.isString(a)) return 0 === a.length;
        for (var b in a)
            if (x.has(a, b)) return !1;
        return !0
    }, x.isElement = function(a) {
        return !(!a || 1 !== a.nodeType)
    }, x.isArray = u || function(a) {
        return "[object Array]" == j.call(a)
    }, x.isObject = function(a) {
        return a === Object(a)
    }, y(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function(a) {
        x["is" + a] = function(b) {
            return j.call(b) == "[object " + a + "]"
        }
    }), x.isArguments(arguments) || (x.isArguments = function(a) {
        return !(!a || !x.has(a, "callee"))
    }), "function" != typeof /./ && (x.isFunction = function(a) {
        return "function" == typeof a
    }), x.isFinite = function(a) {
        return isFinite(a) && !isNaN(parseFloat(a))
    }, x.isNaN = function(a) {
        return x.isNumber(a) && a != +a
    }, x.isBoolean = function(a) {
        return a === !0 || a === !1 || "[object Boolean]" == j.call(a)
    }, x.isNull = function(a) {
        return null === a
    }, x.isUndefined = function(a) {
        return void 0 === a
    }, x.has = function(a, b) {
        return k.call(a, b)
    }, x.noConflict = function() {
        return a._ = b, this
    }, x.identity = function(a) {
        return a
    }, x.times = function(a, b, c) {
        for (var d = Array(a), e = 0; a > e; e++) d[e] = b.call(c, e);
        return d
    }, x.random = function(a, b) {
        return null == b && (b = a, a = 0), a + Math.floor(Math.random() * (b - a + 1))
    };
    var F = {
        escape: {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "/": "&#x2F;"
        }
    };
    F.unescape = x.invert(F.escape);
    var G = {
        escape: new RegExp("[" + x.keys(F.escape).join("") + "]", "g"),
        unescape: new RegExp("(" + x.keys(F.unescape).join("|") + ")", "g")
    };
    x.each(["escape", "unescape"], function(a) {
        x[a] = function(b) {
            return null == b ? "" : ("" + b).replace(G[a], function(b) {
                return F[a][b]
            })
        }
    }), x.result = function(a, b) {
        if (null == a) return null;
        var c = a[b];
        return x.isFunction(c) ? c.call(a) : c
    }, x.mixin = function(a) {
        y(x.functions(a), function(b) {
            var c = x[b] = a[b];
            x.prototype[b] = function() {
                var a = [this._wrapped];
                return g.apply(a, arguments), L.call(this, c.apply(x, a))
            }
        })
    };
    var H = 0;
    x.uniqueId = function(a) {
        var b = ++H + "";
        return a ? a + b : b
    }, x.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var I = /(.)^/,
        J = {
            "'": "'",
            "\\": "\\",
            "\r": "r",
            "\n": "n",
            "	": "t",
            "\u2028": "u2028",
            "\u2029": "u2029"
        },
        K = /\\|'|\r|\n|\t|\u2028|\u2029/g;
    x.template = function(a, b, c) {
        var d;
        c = x.defaults({}, c, x.templateSettings);
        var e = new RegExp([(c.escape || I).source, (c.interpolate || I).source, (c.evaluate || I).source].join("|") + "|$", "g"),
            f = 0,
            g = "__p+='";
        a.replace(e, function(b, c, d, e, h) {
            return g += a.slice(f, h).replace(K, function(a) {
                return "\\" + J[a]
            }), c && (g += "'+\n((__t=(" + c + "))==null?'':_.escape(__t))+\n'"), d && (g += "'+\n((__t=(" + d + "))==null?'':__t)+\n'"), e && (g += "';\n" + e + "\n__p+='"), f = h + b.length, b
        }), g += "';\n", c.variable || (g = "with(obj||{}){\n" + g + "}\n"), g = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + g + "return __p;\n";
        try {
            d = new Function(c.variable || "obj", "_", g)
        } catch (h) {
            throw h.source = g, h
        }
        if (b) return d(b, x);
        var i = function(a) {
            return d.call(this, a, x)
        };
        return i.source = "function(" + (c.variable || "obj") + "){\n" + g + "}", i
    }, x.chain = function(a) {
        return x(a).chain()
    };
    var L = function(a) {
        return this._chain ? x(a).chain() : a
    };
    x.mixin(x), y(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(a) {
        var b = d[a];
        x.prototype[a] = function() {
            var c = this._wrapped;
            return b.apply(c, arguments), "shift" != a && "splice" != a || 0 !== c.length || delete c[0], L.call(this, c)
        }
    }), y(["concat", "join", "slice"], function(a) {
        var b = d[a];
        x.prototype[a] = function() {
            return L.call(this, b.apply(this._wrapped, arguments))
        }
    }), x.extend(x.prototype, {
        chain: function() {
            return this._chain = !0, this
        },
        value: function() {
            return this._wrapped
        }
    })
}.call(this),
    function(a) {
        a.Parse = a.Parse || {};
        var b = a.Parse;
        "undefined" != typeof exports && exports._ ? (b._ = exports._.noConflict(), b.localStorage = require("localStorage"), b.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest, exports.Parse = b) : (b._ = _.noConflict(), "undefined" != typeof localStorage && (b.localStorage = localStorage), "undefined" != typeof XMLHttpRequest && (b.XMLHttpRequest = XMLHttpRequest)), "undefined" != typeof $ && (b.$ = $);
        var c = function() {},
            d = function(a, d, e) {
                var f;
                return f = d && d.hasOwnProperty("constructor") ? d.constructor : function() {
                    a.apply(this, arguments)
                }, b._.extend(f, a), c.prototype = a.prototype, f.prototype = new c, d && b._.extend(f.prototype, d), e && b._.extend(f, e), f.prototype.constructor = f, f.__super__ = a.prototype, f
            };
        b.serverURL = "https://api.parse.com", "undefined" != typeof process && process.versions && process.versions.node && (b._isNode = !0), b.initialize = function(a, c, d) {
            if (d) throw "Parse.initialize() was passed a Master Key, which is only allowed from within Node.js.";
            b._initialize(a, c)
        }, b._initialize = function(a, c, d) {
            b.applicationId = a, b.javaScriptKey = c, b.masterKey = d, b._useMasterKey = !1
        }, b._isNode && (b.initialize = b._initialize, b.Cloud = b.Cloud || {}, b.Cloud.useMasterKey = function() {
            b._useMasterKey = !0
        }), b._getParsePath = function(a) {
            if (!b.applicationId) throw "You need to call Parse.initialize before using Parse.";
            if (a || (a = ""), !b._.isString(a)) throw "Tried to get a localStorage path that wasn't a String.";
            return "/" === a[0] && (a = a.substring(1)), "Parse/" + b.applicationId + "/" + a
        }, b._installationId = null, b._getInstallationId = function() {
            if (b._installationId) return b._installationId;
            var a = b._getParsePath("installationId");
            if (b._installationId = b.localStorage.getItem(a), !b._installationId || "" === b._installationId) {
                var c = function() {
                    return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
                };
                b._installationId = c() + c() + "-" + c() + "-" + c() + "-" + c() + "-" + c() + c() + c(), b.localStorage.setItem(a, b._installationId)
            }
            return b._installationId
        }, b._parseDate = function(a) {
            var b = new RegExp("^([0-9]{1,4})-([0-9]{1,2})-([0-9]{1,2})T([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})(.([0-9]+))?Z$"),
                c = b.exec(a);
            if (!c) return null;
            var d = c[1] || 0,
                e = (c[2] || 1) - 1,
                f = c[3] || 0,
                g = c[4] || 0,
                h = c[5] || 0,
                i = c[6] || 0,
                j = c[8] || 0;
            return new Date(Date.UTC(d, e, f, g, h, i, j))
        }, b._ajaxIE8 = function(a, c, d) {
            var e = new b.Promise,
                f = new XDomainRequest;
            return f.onload = function() {
                var a;
                try {
                    a = JSON.parse(f.responseText)
                } catch (b) {
                    e.reject(b)
                }
                a && e.resolve(a)
            }, f.onerror = f.ontimeout = function() {
                var a = {
                    responseText: JSON.stringify({
                        code: b.Error.X_DOMAIN_REQUEST,
                        error: "IE's XDomainRequest does not supply error info."
                    })
                };
                e.reject(a)
            }, f.onprogress = function() {}, f.open(a, c), f.send(d), e
        }, b._useXDomainRequest = function() {
            return "undefined" != typeof XDomainRequest ? "withCredentials" in new XMLHttpRequest ? !1 : !0 : !1
        }, b._ajax = function(a, c, d, e, f) {
            var g = {
                success: e,
                error: f
            };
            if (b._useXDomainRequest()) return b._ajaxIE8(a, c, d)._thenRunCallbacks(g);
            var h = new b.Promise,
                i = !1,
                j = new b.XMLHttpRequest;
            return j.onreadystatechange = function() {
                if (4 === j.readyState) {
                    if (i) return;
                    if (i = !0, j.status >= 200 && j.status < 300) {
                        var a;
                        try {
                            a = JSON.parse(j.responseText)
                        } catch (b) {
                            h.reject(b)
                        }
                        a && h.resolve(a, j.status, j)
                    } else h.reject(j)
                }
            }, j.open(a, c, !0), j.setRequestHeader("Content-Type", "text/plain"), b._isNode && j.setRequestHeader("User-Agent", "Parse/" + b.VERSION + " (NodeJS " + process.versions.node + ")"), j.send(d), h._thenRunCallbacks(g)
        }, b._extend = function(a, b) {
            var c = d(this, a, b);
            return c.extend = this.extend, c
        }, b._request = function(a) {
            var c = a.route,
                d = a.className,
                e = a.objectId,
                f = a.method,
                g = a.useMasterKey,
                h = a.sessionToken,
                i = a.data;
            if (!b.applicationId) throw "You must specify your applicationId using Parse.initialize.";
            if (!b.javaScriptKey && !b.masterKey) throw "You must specify a key using Parse.initialize.";
            if (!h) {
                var j = b.User.current();
                j && j._sessionToken && (h = j._sessionToken)
            }
            if ("batch" !== c && "classes" !== c && "events" !== c && "files" !== c && "functions" !== c && "login" !== c && "push" !== c && "requestPasswordReset" !== c && "rest_verify_analytics" !== c && "users" !== c && "jobs" !== c && "config" !== c) throw "Bad route: '" + c + "'.";
            var k = b.serverURL;
            "/" !== k.charAt(k.length - 1) && (k += "/"), k += "1/" + c, d && (k += "/" + d), e && (k += "/" + e), i = b._.clone(i || {}), "POST" !== f && (i._method = f, f = "POST"), b._.isUndefined(g) && (g = b._useMasterKey), i._ApplicationId = b.applicationId, g ? i._MasterKey = b.masterKey : i._JavaScriptKey = b.javaScriptKey, i._ClientVersion = b.VERSION, i._InstallationId = b._getInstallationId(), h && (i._SessionToken = h);
            var l = JSON.stringify(i);
            return b._ajax(f, k, l).then(null, function(a) {
                var c;
                if (a && a.responseText) try {
                    var d = JSON.parse(a.responseText);
                    c = new b.Error(d.code, d.error)
                } catch (e) {
                    c = new b.Error(b.Error.INVALID_JSON, "Received an error with invalid JSON from Parse: " + a.responseText)
                } else c = new b.Error(b.Error.CONNECTION_FAILED, "XMLHttpRequest failed: " + JSON.stringify(a));
                return b.Promise.error(c)
            })
        }, b._getValue = function(a, c) {
            return a && a[c] ? b._.isFunction(a[c]) ? a[c]() : a[c] : null
        }, b._encode = function(a, c, d) {
            var e = b._;
            if (a instanceof b.Object) {
                if (d) throw "Parse.Objects not allowed here";
                if (!c || e.include(c, a) || !a._hasData) return a._toPointer();
                if (!a.dirty()) return c = c.concat(a), b._encode(a._toFullJSON(c), c, d);
                throw "Tried to save an object with a pointer to a new, unsaved object."
            }
            if (a instanceof b.ACL) return a.toJSON();
            if (e.isDate(a)) return {
                __type: "Date",
                iso: a.toJSON()
            };
            if (a instanceof b.GeoPoint) return a.toJSON();
            if (e.isArray(a)) return e.map(a, function(a) {
                return b._encode(a, c, d)
            });
            if (e.isRegExp(a)) return a.source;
            if (a instanceof b.Relation) return a.toJSON();
            if (a instanceof b.Op) return a.toJSON();
            if (a instanceof b.File) {
                if (!a.url()) throw "Tried to save an object containing an unsaved file.";
                return {
                    __type: "File",
                    name: a.name(),
                    url: a.url()
                }
            }
            if (e.isObject(a)) {
                var f = {};
                return b._objectEach(a, function(a, e) {
                    f[e] = b._encode(a, c, d)
                }), f
            }
            return a
        }, b._decode = function(a, c) {
            var d = b._;
            if (!d.isObject(c)) return c;
            if (d.isArray(c)) return b._arrayEach(c, function(a, d) {
                c[d] = b._decode(d, a)
            }), c;
            if (c instanceof b.Object) return c;
            if (c instanceof b.File) return c;
            if (c instanceof b.Op) return c;
            if (c.__op) return b.Op._decode(c);
            if ("Pointer" === c.__type && c.className) {
                var e = b.Object._create(c.className);
                return e._finishFetch({
                    objectId: c.objectId
                }, !1), e
            }
            if ("Object" === c.__type && c.className) {
                var f = c.className;
                delete c.__type, delete c.className;
                var g = b.Object._create(f);
                return g._finishFetch(c, !0), g
            }
            if ("Date" === c.__type) return b._parseDate(c.iso);
            if ("GeoPoint" === c.__type) return new b.GeoPoint({
                latitude: c.latitude,
                longitude: c.longitude
            });
            if ("ACL" === a) return c instanceof b.ACL ? c : new b.ACL(c);
            if ("Relation" === c.__type) {
                var h = new b.Relation(null, a);
                return h.targetClassName = c.className, h
            }
            if ("File" === c.__type) {
                var i = new b.File(c.name);
                return i._url = c.url, i
            }
            return b._objectEach(c, function(a, d) {
                c[d] = b._decode(d, a)
            }), c
        }, b._arrayEach = b._.each, b._traverse = function(a, c, d) {
            if (a instanceof b.Object) {
                if (d = d || [], b._.indexOf(d, a) >= 0) return;
                return d.push(a), b._traverse(a.attributes, c, d), c(a)
            }
            return a instanceof b.Relation || a instanceof b.File ? c(a) : b._.isArray(a) ? (b._.each(a, function(e, f) {
                var g = b._traverse(e, c, d);
                g && (a[f] = g)
            }), c(a)) : b._.isObject(a) ? (b._each(a, function(e, f) {
                var g = b._traverse(e, c, d);
                g && (a[f] = g)
            }), c(a)) : c(a)
        }, b._objectEach = b._each = function(a, c) {
            var d = b._;
            d.isObject(a) ? d.each(d.keys(a), function(b) {
                c(a[b], b)
            }) : d.each(a, c)
        }, b._isNullOrUndefined = function(a) {
            return b._.isNull(a) || b._.isUndefined(a)
        }
    }(this),
    function(a) {
        a.Parse = a.Parse || {};
        var b = a.Parse,
            c = b._;
        b.Analytics = b.Analytics || {}, c.extend(b.Analytics, {
            track: function(a, d, e) {
                if (a = a || "", a = a.replace(/^\s*/, ""), a = a.replace(/\s*$/, ""), 0 === a.length) throw "A name for the custom event must be provided";
                return c.each(d, function(a, b) {
                    if (!c.isString(b) || !c.isString(a)) throw 'track() dimensions expects keys and values of type "string".'
                }), e = e || {}, b._request({
                    route: "events",
                    className: a,
                    method: "POST",
                    data: {
                        dimensions: d
                    }
                })._thenRunCallbacks(e)
            }
        })
    }(this),
    function(a) {
        a.Parse = a.Parse || {};
        var b = a.Parse,
            c = b._;
        b.Config = function() {
            this.attributes = {}, this._escapedAttributes = {}
        }, b.Config.current = function() {
            if (b.Config._currentConfig) return b.Config._currentConfig;
            var a = b.localStorage.getItem(b._getParsePath(b.Config._CURRENT_CONFIG_KEY)),
                c = new b.Config;
            return a && (c._finishFetch(JSON.parse(a)), b.Config._currentConfig = c), c
        }, b.Config.get = function(a) {
            a = a || {};
            var c = b._request({
                route: "config",
                method: "GET"
            });
            return c.then(function(a) {
                if (!a || !a.params) {
                    var c = new b.Error(b.Error.INVALID_JSON, "Config JSON response invalid.");
                    return b.Promise.error(c)
                }
                var d = new b.Config;
                return d._finishFetch(a), b.Config._currentConfig = d, d
            })._thenRunCallbacks(a)
        }, b.Config.prototype = {
            escape: function(a) {
                var d = this._escapedAttributes[a];
                if (d) return d;
                var e, f = this.attributes[a];
                return e = b._isNullOrUndefined(f) ? "" : c.escape(f.toString()), this._escapedAttributes[a] = e, e
            },
            get: function(a) {
                return this.attributes[a]
            },
            _finishFetch: function(a) {
                this.attributes = b._decode(null, c.clone(a.params)), b.localStorage.setItem(b._getParsePath(b.Config._CURRENT_CONFIG_KEY), JSON.stringify(a))
            }
        }, b.Config._currentConfig = null, b.Config._CURRENT_CONFIG_KEY = "currentConfig"
    }(this),
    function(a) {
        a.Parse = a.Parse || {};
        var b = a.Parse,
            c = b._;
        b.Error = function(a, b) {
            this.code = a, this.message = b
        }, c.extend(b.Error, {
            OTHER_CAUSE: -1,
            INTERNAL_SERVER_ERROR: 1,
            CONNECTION_FAILED: 100,
            OBJECT_NOT_FOUND: 101,
            INVALID_QUERY: 102,
            INVALID_CLASS_NAME: 103,
            MISSING_OBJECT_ID: 104,
            INVALID_KEY_NAME: 105,
            INVALID_POINTER: 106,
            INVALID_JSON: 107,
            COMMAND_UNAVAILABLE: 108,
            NOT_INITIALIZED: 109,
            INCORRECT_TYPE: 111,
            INVALID_CHANNEL_NAME: 112,
            PUSH_MISCONFIGURED: 115,
            OBJECT_TOO_LARGE: 116,
            OPERATION_FORBIDDEN: 119,
            CACHE_MISS: 120,
            INVALID_NESTED_KEY: 121,
            INVALID_FILE_NAME: 122,
            INVALID_ACL: 123,
            TIMEOUT: 124,
            INVALID_EMAIL_ADDRESS: 125,
            MISSING_CONTENT_TYPE: 126,
            MISSING_CONTENT_LENGTH: 127,
            INVALID_CONTENT_LENGTH: 128,
            FILE_TOO_LARGE: 129,
            FILE_SAVE_ERROR: 130,
            FILE_DELETE_ERROR: 153,
            DUPLICATE_VALUE: 137,
            INVALID_ROLE_NAME: 139,
            EXCEEDED_QUOTA: 140,
            SCRIPT_FAILED: 141,
            VALIDATION_ERROR: 142,
            INVALID_IMAGE_DATA: 150,
            UNSAVED_FILE_ERROR: 151,
            INVALID_PUSH_TIME_ERROR: 152,
            INVALID_EVENT_NAME: 160,
            USERNAME_MISSING: 200,
            PASSWORD_MISSING: 201,
            USERNAME_TAKEN: 202,
            EMAIL_TAKEN: 203,
            EMAIL_MISSING: 204,
            EMAIL_NOT_FOUND: 205,
            SESSION_MISSING: 206,
            MUST_CREATE_USER_THROUGH_SIGNUP: 207,
            ACCOUNT_ALREADY_LINKED: 208,
            LINKED_ID_MISSING: 250,
            INVALID_LINKED_SESSION: 251,
            UNSUPPORTED_SERVICE: 252,
            AGGREGATE_ERROR: 600,
            FILE_READ_ERROR: 601,
            X_DOMAIN_REQUEST: 602
        })
    }(this),
    function() {
        var a = this,
            b = a.Parse || (a.Parse = {}),
            c = /\s+/,
            d = Array.prototype.slice;
        b.Events = {
            on: function(a, b, d) {
                var e, f, g, h, i;
                if (!b) return this;
                for (a = a.split(c), e = this._callbacks || (this._callbacks = {}), f = a.shift(); f;) i = e[f], g = i ? i.tail : {}, g.next = h = {}, g.context = d, g.callback = b, e[f] = {
                    tail: h,
                    next: i ? i.next : g
                }, f = a.shift();
                return this
            },
            off: function(a, b, d) {
                var e, f, g, h, i, j;
                if (f = this._callbacks) {
                    if (!(a || b || d)) return delete this._callbacks, this;
                    for (a = a ? a.split(c) : _.keys(f), e = a.shift(); e;)
                        if (g = f[e], delete f[e], g && (b || d)) {
                            for (h = g.tail, g = g.next; g !== h;) i = g.callback, j = g.context, (b && i !== b || d && j !== d) && this.on(e, i, j), g = g.next;
                            e = a.shift()
                        } else e = a.shift();
                    return this
                }
            },
            trigger: function(a) {
                var b, e, f, g, h, i, j;
                if (!(f = this._callbacks)) return this;
                for (i = f.all, a = a.split(c), j = d.call(arguments, 1), b = a.shift(); b;) {
                    if (e = f[b])
                        for (g = e.tail;
                            (e = e.next) !== g;) e.callback.apply(e.context || this, j);
                    if (e = i)
                        for (g = e.tail, h = [b].concat(j);
                            (e = e.next) !== g;) e.callback.apply(e.context || this, h);
                    b = a.shift()
                }
                return this
            }
        }, b.Events.bind = b.Events.on, b.Events.unbind = b.Events.off
    }.call(this),
    function(a) {
        a.Parse = a.Parse || {};
        var b = a.Parse,
            c = b._;
        b.GeoPoint = function(a, d) {
            c.isArray(a) ? (b.GeoPoint._validate(a[0], a[1]), this.latitude = a[0], this.longitude = a[1]) : c.isObject(a) ? (b.GeoPoint._validate(a.latitude, a.longitude), this.latitude = a.latitude, this.longitude = a.longitude) : c.isNumber(a) && c.isNumber(d) ? (b.GeoPoint._validate(a, d), this.latitude = a, this.longitude = d) : (this.latitude = 0, this.longitude = 0);
            var e = this;
            this.__defineGetter__ && this.__defineSetter__ && (this._latitude = this.latitude, this._longitude = this.longitude, this.__defineGetter__("latitude", function() {
                return e._latitude
            }), this.__defineGetter__("longitude", function() {
                return e._longitude
            }), this.__defineSetter__("latitude", function(a) {
                b.GeoPoint._validate(a, e.longitude), e._latitude = a
            }), this.__defineSetter__("longitude", function(a) {
                b.GeoPoint._validate(e.latitude, a), e._longitude = a
            }))
        }, b.GeoPoint._validate = function(a, b) {
            if (-90 > a) throw "Parse.GeoPoint latitude " + a + " < -90.0.";
            if (a > 90) throw "Parse.GeoPoint latitude " + a + " > 90.0.";
            if (-180 > b) throw "Parse.GeoPoint longitude " + b + " < -180.0.";
            if (b > 180) throw "Parse.GeoPoint longitude " + b + " > 180.0."
        }, b.GeoPoint.current = function(a) {
            var c = new b.Promise;
            return navigator.geolocation.getCurrentPosition(function(a) {
                c.resolve(new b.GeoPoint({
                    latitude: a.coords.latitude,
                    longitude: a.coords.longitude
                }))
            }, function(a) {
                c.reject(a)
            }), c._thenRunCallbacks(a)
        }, b.GeoPoint.prototype = {
            toJSON: function() {
                return b.GeoPoint._validate(this.latitude, this.longitude), {
                    __type: "GeoPoint",
                    latitude: this.latitude,
                    longitude: this.longitude
                }
            },
            radiansTo: function(a) {
                var b = Math.PI / 180,
                    c = this.latitude * b,
                    d = this.longitude * b,
                    e = a.latitude * b,
                    f = a.longitude * b,
                    g = c - e,
                    h = d - f,
                    i = Math.sin(g / 2),
                    j = Math.sin(h / 2),
                    k = i * i + Math.cos(c) * Math.cos(e) * j * j;
                return k = Math.min(1, k), 2 * Math.asin(Math.sqrt(k))
            },
            kilometersTo: function(a) {
                return 6371 * this.radiansTo(a)
            },
            milesTo: function(a) {
                return 3958.8 * this.radiansTo(a)
            }
        }
    }(this),
    function(a) {
        a.Parse = a.Parse || {};
        var b = a.Parse,
            c = b._,
            d = "*";
        b.ACL = function(a) {
            var d = this;
            if (d.permissionsById = {}, c.isObject(a))
                if (a instanceof b.User) d.setReadAccess(a, !0), d.setWriteAccess(a, !0);
                else {
                    if (c.isFunction(a)) throw "Parse.ACL() called with a function.  Did you forget ()?";
                    b._objectEach(a, function(a, e) {
                        if (!c.isString(e)) throw "Tried to create an ACL with an invalid userId.";
                        d.permissionsById[e] = {}, b._objectEach(a, function(a, b) {
                            if ("read" !== b && "write" !== b) throw "Tried to create an ACL with an invalid permission type.";
                            if (!c.isBoolean(a)) throw "Tried to create an ACL with an invalid permission value.";
                            d.permissionsById[e][b] = a
                        })
                    })
                }
        }, b.ACL.prototype.toJSON = function() {
            return c.clone(this.permissionsById)
        }, b.ACL.prototype._setAccess = function(a, d, e) {
            if (d instanceof b.User ? d = d.id : d instanceof b.Role && (d = "role:" + d.getName()), !c.isString(d)) throw "userId must be a string.";
            if (!c.isBoolean(e)) throw "allowed must be either true or false.";
            var f = this.permissionsById[d];
            if (!f) {
                if (!e) return;
                f = {}, this.permissionsById[d] = f
            }
            e ? this.permissionsById[d][a] = !0 : (delete f[a], c.isEmpty(f) && delete f[d])
        }, b.ACL.prototype._getAccess = function(a, c) {
            c instanceof b.User ? c = c.id : c instanceof b.Role && (c = "role:" + c.getName());
            var d = this.permissionsById[c];
            return d ? d[a] ? !0 : !1 : !1
        }, b.ACL.prototype.setReadAccess = function(a, b) {
            this._setAccess("read", a, b)
        }, b.ACL.prototype.getReadAccess = function(a) {
            return this._getAccess("read", a)
        }, b.ACL.prototype.setWriteAccess = function(a, b) {
            this._setAccess("write", a, b)
        }, b.ACL.prototype.getWriteAccess = function(a) {
            return this._getAccess("write", a)
        }, b.ACL.prototype.setPublicReadAccess = function(a) {
            this.setReadAccess(d, a)
        }, b.ACL.prototype.getPublicReadAccess = function() {
            return this.getReadAccess(d)
        }, b.ACL.prototype.setPublicWriteAccess = function(a) {
            this.setWriteAccess(d, a)
        }, b.ACL.prototype.getPublicWriteAccess = function() {
            return this.getWriteAccess(d)
        }, b.ACL.prototype.getRoleReadAccess = function(a) {
            if (a instanceof b.Role && (a = a.getName()), c.isString(a)) return this.getReadAccess("role:" + a);
            throw "role must be a Parse.Role or a String"
        }, b.ACL.prototype.getRoleWriteAccess = function(a) {
            if (a instanceof b.Role && (a = a.getName()), c.isString(a)) return this.getWriteAccess("role:" + a);
            throw "role must be a Parse.Role or a String"
        }, b.ACL.prototype.setRoleReadAccess = function(a, d) {
            if (a instanceof b.Role && (a = a.getName()), c.isString(a)) return this.setReadAccess("role:" + a, d), void 0;
            throw "role must be a Parse.Role or a String"
        }, b.ACL.prototype.setRoleWriteAccess = function(a, d) {
            if (a instanceof b.Role && (a = a.getName()), c.isString(a)) return this.setWriteAccess("role:" + a, d), void 0;
            throw "role must be a Parse.Role or a String"
        }
    }(this),
    function(a) {
        a.Parse = a.Parse || {};
        var b = a.Parse,
            c = b._;
        b.Op = function() {
            this._initialize.apply(this, arguments)
        }, b.Op.prototype = {
            _initialize: function() {}
        }, c.extend(b.Op, {
            _extend: b._extend,
            _opDecoderMap: {},
            _registerDecoder: function(a, c) {
                b.Op._opDecoderMap[a] = c
            },
            _decode: function(a) {
                var c = b.Op._opDecoderMap[a.__op];
                return c ? c(a) : void 0
            }
        }), b.Op._registerDecoder("Batch", function(a) {
            var c = null;
            return b._arrayEach(a.ops, function(a) {
                a = b.Op._decode(a), c = a._mergeWithPrevious(c)
            }), c
        }), b.Op.Set = b.Op._extend({
            _initialize: function(a) {
                this._value = a
            },
            value: function() {
                return this._value
            },
            toJSON: function() {
                return b._encode(this.value())
            },
            _mergeWithPrevious: function() {
                return this
            },
            _estimate: function() {
                return this.value()
            }
        }), b.Op._UNSET = {}, b.Op.Unset = b.Op._extend({
            toJSON: function() {
                return {
                    __op: "Delete"
                }
            },
            _mergeWithPrevious: function() {
                return this
            },
            _estimate: function() {
                return b.Op._UNSET
            }
        }), b.Op._registerDecoder("Delete", function() {
            return new b.Op.Unset
        }), b.Op.Increment = b.Op._extend({
            _initialize: function(a) {
                this._amount = a
            },
            amount: function() {
                return this._amount
            },
            toJSON: function() {
                return {
                    __op: "Increment",
                    amount: this._amount
                }
            },
            _mergeWithPrevious: function(a) {
                if (a) {
                    if (a instanceof b.Op.Unset) return new b.Op.Set(this.amount());
                    if (a instanceof b.Op.Set) return new b.Op.Set(a.value() + this.amount());
                    if (a instanceof b.Op.Increment) return new b.Op.Increment(this.amount() + a.amount());
                    throw "Op is invalid after previous op."
                }
                return this
            },
            _estimate: function(a) {
                return a ? a + this.amount() : this.amount()
            }
        }), b.Op._registerDecoder("Increment", function(a) {
            return new b.Op.Increment(a.amount)
        }), b.Op.Add = b.Op._extend({
            _initialize: function(a) {
                this._objects = a
            },
            objects: function() {
                return this._objects
            },
            toJSON: function() {
                return {
                    __op: "Add",
                    objects: b._encode(this.objects())
                }
            },
            _mergeWithPrevious: function(a) {
                if (a) {
                    if (a instanceof b.Op.Unset) return new b.Op.Set(this.objects());
                    if (a instanceof b.Op.Set) return new b.Op.Set(this._estimate(a.value()));
                    if (a instanceof b.Op.Add) return new b.Op.Add(a.objects().concat(this.objects()));
                    throw "Op is invalid after previous op."
                }
                return this
            },
            _estimate: function(a) {
                return a ? a.concat(this.objects()) : c.clone(this.objects())
            }
        }), b.Op._registerDecoder("Add", function(a) {
            return new b.Op.Add(b._decode(void 0, a.objects))
        }), b.Op.AddUnique = b.Op._extend({
            _initialize: function(a) {
                this._objects = c.uniq(a)
            },
            objects: function() {
                return this._objects
            },
            toJSON: function() {
                return {
                    __op: "AddUnique",
                    objects: b._encode(this.objects())
                }
            },
            _mergeWithPrevious: function(a) {
                if (a) {
                    if (a instanceof b.Op.Unset) return new b.Op.Set(this.objects());
                    if (a instanceof b.Op.Set) return new b.Op.Set(this._estimate(a.value()));
                    if (a instanceof b.Op.AddUnique) return new b.Op.AddUnique(this._estimate(a.objects()));
                    throw "Op is invalid after previous op."
                }
                return this
            },
            _estimate: function(a) {
                if (a) {
                    var d = c.clone(a);
                    return b._arrayEach(this.objects(), function(a) {
                        if (a instanceof b.Object && a.id) {
                            var e = c.find(d, function(c) {
                                return c instanceof b.Object && c.id === a.id
                            });
                            if (e) {
                                var f = c.indexOf(d, e);
                                d[f] = a
                            } else d.push(a)
                        } else c.contains(d, a) || d.push(a)
                    }), d
                }
                return c.clone(this.objects())
            }
        }), b.Op._registerDecoder("AddUnique", function(a) {
            return new b.Op.AddUnique(b._decode(void 0, a.objects))
        }), b.Op.Remove = b.Op._extend({
            _initialize: function(a) {
                this._objects = c.uniq(a)
            },
            objects: function() {
                return this._objects
            },
            toJSON: function() {
                return {
                    __op: "Remove",
                    objects: b._encode(this.objects())
                }
            },
            _mergeWithPrevious: function(a) {
                if (a) {
                    if (a instanceof b.Op.Unset) return a;
                    if (a instanceof b.Op.Set) return new b.Op.Set(this._estimate(a.value()));
                    if (a instanceof b.Op.Remove) return new b.Op.Remove(c.union(a.objects(), this.objects()));
                    throw "Op is invalid after previous op."
                }
                return this
            },
            _estimate: function(a) {
                if (a) {
                    var d = c.difference(a, this.objects());
                    return b._arrayEach(this.objects(), function(a) {
                        a instanceof b.Object && a.id && (d = c.reject(d, function(c) {
                            return c instanceof b.Object && c.id === a.id
                        }))
                    }), d
                }
                return []
            }
        }), b.Op._registerDecoder("Remove", function(a) {
            return new b.Op.Remove(b._decode(void 0, a.objects))
        }), b.Op.Relation = b.Op._extend({
            _initialize: function(a, d) {
                this._targetClassName = null;
                var e = this,
                    f = function(a) {
                        if (a instanceof b.Object) {
                            if (!a.id) throw "You can't add an unsaved Parse.Object to a relation.";
                            if (e._targetClassName || (e._targetClassName = a.className), e._targetClassName !== a.className) throw "Tried to create a Parse.Relation with 2 different types: " + e._targetClassName + " and " + a.className + ".";
                            return a.id
                        }
                        return a
                    };
                this.relationsToAdd = c.uniq(c.map(a, f)), this.relationsToRemove = c.uniq(c.map(d, f))
            },
            added: function() {
                var a = this;
                return c.map(this.relationsToAdd, function(c) {
                    var d = b.Object._create(a._targetClassName);
                    return d.id = c, d
                })
            },
            removed: function() {
                var a = this;
                return c.map(this.relationsToRemove, function(c) {
                    var d = b.Object._create(a._targetClassName);
                    return d.id = c, d
                })
            },
            toJSON: function() {
                var a = null,
                    b = null,
                    d = this,
                    e = function(a) {
                        return {
                            __type: "Pointer",
                            className: d._targetClassName,
                            objectId: a
                        }
                    },
                    f = null;
                return this.relationsToAdd.length > 0 && (f = c.map(this.relationsToAdd, e), a = {
                    __op: "AddRelation",
                    objects: f
                }), this.relationsToRemove.length > 0 && (f = c.map(this.relationsToRemove, e), b = {
                    __op: "RemoveRelation",
                    objects: f
                }), a && b ? {
                    __op: "Batch",
                    ops: [a, b]
                } : a || b || {}
            },
            _mergeWithPrevious: function(a) {
                if (a) {
                    if (a instanceof b.Op.Unset) throw "You can't modify a relation after deleting it.";
                    if (a instanceof b.Op.Relation) {
                        if (a._targetClassName && a._targetClassName !== this._targetClassName) throw "Related object must be of class " + a._targetClassName + ", but " + this._targetClassName + " was passed in.";
                        var d = c.union(c.difference(a.relationsToAdd, this.relationsToRemove), this.relationsToAdd),
                            e = c.union(c.difference(a.relationsToRemove, this.relationsToAdd), this.relationsToRemove),
                            f = new b.Op.Relation(d, e);
                        return f._targetClassName = this._targetClassName, f
                    }
                    throw "Op is invalid after previous op."
                }
                return this
            },
            _estimate: function(a, c, d) {
                if (a) {
                    if (a instanceof b.Relation) {
                        if (this._targetClassName)
                            if (a.targetClassName) {
                                if (a.targetClassName !== this._targetClassName) throw "Related object must be a " + a.targetClassName + ", but a " + this._targetClassName + " was passed in."
                            } else a.targetClassName = this._targetClassName;
                        return a
                    }
                    throw "Op is invalid after previous op."
                }
                var e = new b.Relation(c, d);
                e.targetClassName = this._targetClassName
            }
        }), b.Op._registerDecoder("AddRelation", function(a) {
            return new b.Op.Relation(b._decode(void 0, a.objects), [])
        }), b.Op._registerDecoder("RemoveRelation", function(a) {
            return new b.Op.Relation([], b._decode(void 0, a.objects))
        })
    }(this),
    function(a) {
        a.Parse = a.Parse || {};
        var b = a.Parse,
            c = b._;
        b.Relation = function(a, b) {
            this.parent = a, this.key = b, this.targetClassName = null
        }, b.Relation.prototype = {
            _ensureParentAndKey: function(a, b) {
                if (this.parent = this.parent || a, this.key = this.key || b, this.parent !== a) throw "Internal Error. Relation retrieved from two different Objects.";
                if (this.key !== b) throw "Internal Error. Relation retrieved from two different keys."
            },
            add: function(a) {
                c.isArray(a) || (a = [a]);
                var d = new b.Op.Relation(a, []);
                this.parent.set(this.key, d), this.targetClassName = d._targetClassName
            },
            remove: function(a) {
                c.isArray(a) || (a = [a]);
                var d = new b.Op.Relation([], a);
                this.parent.set(this.key, d), this.targetClassName = d._targetClassName
            },
            toJSON: function() {
                return {
                    __type: "Relation",
                    className: this.targetClassName
                }
            },
            query: function() {
                var a, c;
                return this.targetClassName ? (a = b.Object._getSubclass(this.targetClassName), c = new b.Query(a)) : (a = b.Object._getSubclass(this.parent.className), c = new b.Query(a), c._extraOptions.redirectClassNameForKey = this.key), c._addCondition("$relatedTo", "object", this.parent._toPointer()), c._addCondition("$relatedTo", "key", this.key), c
            }
        }
    }(this),
    function(a) {
        a.Parse = a.Parse || {};
        var b = a.Parse,
            c = b._;
        b.Promise = function() {
            this._resolved = !1, this._rejected = !1, this._resolvedCallbacks = [], this._rejectedCallbacks = []
        }, c.extend(b.Promise, {
            _isPromisesAPlusCompliant: !1,
            is: function(a) {
                return a && a.then && c.isFunction(a.then)
            },
            as: function() {
                var a = new b.Promise;
                return a.resolve.apply(a, arguments), a
            },
            error: function() {
                var a = new b.Promise;
                return a.reject.apply(a, arguments), a
            },
            when: function(a) {
                var c;
                c = a && b._isNullOrUndefined(a.length) ? arguments : a;
                var d = c.length,
                    e = !1,
                    f = [],
                    g = [];
                if (f.length = c.length, g.length = c.length, 0 === d) return b.Promise.as.apply(this, f);
                var h = new b.Promise,
                    i = function() {
                        d -= 1, 0 === d && (e ? h.reject(g) : h.resolve.apply(h, f))
                    };
                return b._arrayEach(c, function(a, c) {
                    b.Promise.is(a) ? a.then(function(a) {
                        f[c] = a, i()
                    }, function(a) {
                        g[c] = a, e = !0, i()
                    }) : (f[c] = a, i())
                }), h
            },
            _continueWhile: function(a, c) {
                return a() ? c().then(function() {
                    return b.Promise._continueWhile(a, c)
                }) : b.Promise.as()
            }
        }), c.extend(b.Promise.prototype, {
            resolve: function() {
                if (this._resolved || this._rejected) throw "A promise was resolved even though it had already been " + (this._resolved ? "resolved" : "rejected") + ".";
                this._resolved = !0, this._result = arguments;
                var a = arguments;
                b._arrayEach(this._resolvedCallbacks, function(b) {
                    b.apply(this, a)
                }), this._resolvedCallbacks = [], this._rejectedCallbacks = []
            },
            reject: function(a) {
                if (this._resolved || this._rejected) throw "A promise was rejected even though it had already been " + (this._resolved ? "resolved" : "rejected") + ".";
                this._rejected = !0, this._error = a, b._arrayEach(this._rejectedCallbacks, function(b) {
                    b(a)
                }), this._resolvedCallbacks = [], this._rejectedCallbacks = []
            },
            then: function(a, c) {
                var d = new b.Promise,
                    e = function() {
                        var c = arguments;
                        if (a)
                            if (b.Promise._isPromisesAPlusCompliant) try {
                                c = [a.apply(this, c)]
                            } catch (e) {
                                c = [b.Promise.error(e)]
                            } else c = [a.apply(this, c)];
                        1 === c.length && b.Promise.is(c[0]) ? c[0].then(function() {
                            d.resolve.apply(d, arguments)
                        }, function(a) {
                            d.reject(a)
                        }) : d.resolve.apply(d, c)
                    },
                    f = function(a) {
                        var e = [];
                        if (c) {
                            if (b.Promise._isPromisesAPlusCompliant) try {
                                e = [c(a)]
                            } catch (f) {
                                e = [b.Promise.error(f)]
                            } else e = [c(a)];
                            1 === e.length && b.Promise.is(e[0]) ? e[0].then(function() {
                                d.resolve.apply(d, arguments)
                            }, function(a) {
                                d.reject(a)
                            }) : b.Promise._isPromisesAPlusCompliant ? d.resolve.apply(d, e) : d.reject(e[0])
                        } else d.reject(a)
                    },
                    g = function(a) {
                        a.call()
                    };
                b.Promise._isPromisesAPlusCompliant && ("undefined" != typeof window && window.setTimeout ? g = function(a) {
                    window.setTimeout(a, 0)
                } : "undefined" != typeof process && process.nextTick && (g = function(a) {
                    process.nextTick(a)
                }));
                var h = this;
                return this._resolved ? g(function() {
                    e.apply(h, h._result)
                }) : this._rejected ? g(function() {
                    f(h._error)
                }) : (this._resolvedCallbacks.push(e), this._rejectedCallbacks.push(f)), d
            },
            always: function(a) {
                return this.then(a, a)
            },
            done: function(a) {
                return this.then(a)
            },
            fail: function(a) {
                return this.then(null, a)
            },
            _thenRunCallbacks: function(a, d) {
                var e;
                if (c.isFunction(a)) {
                    var f = a;
                    e = {
                        success: function(a) {
                            f(a, null)
                        },
                        error: function(a) {
                            f(null, a)
                        }
                    }
                } else e = c.clone(a);
                return e = e || {}, this.then(function(a) {
                    return e.success ? e.success.apply(this, arguments) : d && d.trigger("sync", d, a, e), b.Promise.as.apply(b.Promise, arguments)
                }, function(a) {
                    return e.error ? c.isUndefined(d) ? e.error(a) : e.error(d, a) : d && d.trigger("error", d, a, e), b.Promise.error(a)
                })
            },
            _continueWith: function(a) {
                return this.then(function() {
                    return a(arguments, null)
                }, function(b) {
                    return a(null, b)
                })
            }
        })
    }(this),
    function(a) {
        a.Parse = a.Parse || {};
        var b = a.Parse,
            c = b._,
            d = function(a) {
                if (26 > a) return String.fromCharCode(65 + a);
                if (52 > a) return String.fromCharCode(97 + (a - 26));
                if (62 > a) return String.fromCharCode(48 + (a - 52));
                if (62 === a) return "+";
                if (63 === a) return "/";
                throw "Tried to encode large digit " + a + " in base64."
            },
            e = function(a) {
                var b = [];
                return b.length = Math.ceil(a.length / 3), c.times(b.length, function(c) {
                    var e = a[3 * c],
                        f = a[3 * c + 1] || 0,
                        g = a[3 * c + 2] || 0,
                        h = 3 * c + 1 < a.length,
                        i = 3 * c + 2 < a.length;
                    b[c] = [d(63 & e >> 2), d(48 & e << 4 | 15 & f >> 4), h ? d(60 & f << 2 | 3 & g >> 6) : "=", i ? d(63 & g) : "="].join("")
                }), b.join("")
            },
            f = {
                ai: "application/postscript",
                aif: "audio/x-aiff",
                aifc: "audio/x-aiff",
                aiff: "audio/x-aiff",
                asc: "text/plain",
                atom: "application/atom+xml",
                au: "audio/basic",
                avi: "video/x-msvideo",
                bcpio: "application/x-bcpio",
                bin: "application/octet-stream",
                bmp: "image/bmp",
                cdf: "application/x-netcdf",
                cgm: "image/cgm",
                "class": "application/octet-stream",
                cpio: "application/x-cpio",
                cpt: "application/mac-compactpro",
                csh: "application/x-csh",
                css: "text/css",
                dcr: "application/x-director",
                dif: "video/x-dv",
                dir: "application/x-director",
                djv: "image/vnd.djvu",
                djvu: "image/vnd.djvu",
                dll: "application/octet-stream",
                dmg: "application/octet-stream",
                dms: "application/octet-stream",
                doc: "application/msword",
                docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                dotx: "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
                docm: "application/vnd.ms-word.document.macroEnabled.12",
                dotm: "application/vnd.ms-word.template.macroEnabled.12",
                dtd: "application/xml-dtd",
                dv: "video/x-dv",
                dvi: "application/x-dvi",
                dxr: "application/x-director",
                eps: "application/postscript",
                etx: "text/x-setext",
                exe: "application/octet-stream",
                ez: "application/andrew-inset",
                gif: "image/gif",
                gram: "application/srgs",
                grxml: "application/srgs+xml",
                gtar: "application/x-gtar",
                hdf: "application/x-hdf",
                hqx: "application/mac-binhex40",
                htm: "text/html",
                html: "text/html",
                ice: "x-conference/x-cooltalk",
                ico: "image/x-icon",
                ics: "text/calendar",
                ief: "image/ief",
                ifb: "text/calendar",
                iges: "model/iges",
                igs: "model/iges",
                jnlp: "application/x-java-jnlp-file",
                jp2: "image/jp2",
                jpe: "image/jpeg",
                jpeg: "image/jpeg",
                jpg: "image/jpeg",
                js: "application/x-javascript",
                kar: "audio/midi",
                latex: "application/x-latex",
                lha: "application/octet-stream",
                lzh: "application/octet-stream",
                m3u: "audio/x-mpegurl",
                m4a: "audio/mp4a-latm",
                m4b: "audio/mp4a-latm",
                m4p: "audio/mp4a-latm",
                m4u: "video/vnd.mpegurl",
                m4v: "video/x-m4v",
                mac: "image/x-macpaint",
                man: "application/x-troff-man",
                mathml: "application/mathml+xml",
                me: "application/x-troff-me",
                mesh: "model/mesh",
                mid: "audio/midi",
                midi: "audio/midi",
                mif: "application/vnd.mif",
                mov: "video/quicktime",
                movie: "video/x-sgi-movie",
                mp2: "audio/mpeg",
                mp3: "audio/mpeg",
                mp4: "video/mp4",
                mpe: "video/mpeg",
                mpeg: "video/mpeg",
                mpg: "video/mpeg",
                mpga: "audio/mpeg",
                ms: "application/x-troff-ms",
                msh: "model/mesh",
                mxu: "video/vnd.mpegurl",
                nc: "application/x-netcdf",
                oda: "application/oda",
                ogg: "application/ogg",
                pbm: "image/x-portable-bitmap",
                pct: "image/pict",
                pdb: "chemical/x-pdb",
                pdf: "application/pdf",
                pgm: "image/x-portable-graymap",
                pgn: "application/x-chess-pgn",
                pic: "image/pict",
                pict: "image/pict",
                png: "image/png",
                pnm: "image/x-portable-anymap",
                pnt: "image/x-macpaint",
                pntg: "image/x-macpaint",
                ppm: "image/x-portable-pixmap",
                ppt: "application/vnd.ms-powerpoint",
                pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                potx: "application/vnd.openxmlformats-officedocument.presentationml.template",
                ppsx: "application/vnd.openxmlformats-officedocument.presentationml.slideshow",
                ppam: "application/vnd.ms-powerpoint.addin.macroEnabled.12",
                pptm: "application/vnd.ms-powerpoint.presentation.macroEnabled.12",
                potm: "application/vnd.ms-powerpoint.template.macroEnabled.12",
                ppsm: "application/vnd.ms-powerpoint.slideshow.macroEnabled.12",
                ps: "application/postscript",
                qt: "video/quicktime",
                qti: "image/x-quicktime",
                qtif: "image/x-quicktime",
                ra: "audio/x-pn-realaudio",
                ram: "audio/x-pn-realaudio",
                ras: "image/x-cmu-raster",
                rdf: "application/rdf+xml",
                rgb: "image/x-rgb",
                rm: "application/vnd.rn-realmedia",
                roff: "application/x-troff",
                rtf: "text/rtf",
                rtx: "text/richtext",
                sgm: "text/sgml",
                sgml: "text/sgml",
                sh: "application/x-sh",
                shar: "application/x-shar",
                silo: "model/mesh",
                sit: "application/x-stuffit",
                skd: "application/x-koan",
                skm: "application/x-koan",
                skp: "application/x-koan",
                skt: "application/x-koan",
                smi: "application/smil",
                smil: "application/smil",
                snd: "audio/basic",
                so: "application/octet-stream",
                spl: "application/x-futuresplash",
                src: "application/x-wais-source",
                sv4cpio: "application/x-sv4cpio",
                sv4crc: "application/x-sv4crc",
                svg: "image/svg+xml",
                swf: "application/x-shockwave-flash",
                t: "application/x-troff",
                tar: "application/x-tar",
                tcl: "application/x-tcl",
                tex: "application/x-tex",
                texi: "application/x-texinfo",
                texinfo: "application/x-texinfo",
                tif: "image/tiff",
                tiff: "image/tiff",
                tr: "application/x-troff",
                tsv: "text/tab-separated-values",
                txt: "text/plain",
                ustar: "application/x-ustar",
                vcd: "application/x-cdlink",
                vrml: "model/vrml",
                vxml: "application/voicexml+xml",
                wav: "audio/x-wav",
                wbmp: "image/vnd.wap.wbmp",
                wbmxl: "application/vnd.wap.wbxml",
                wml: "text/vnd.wap.wml",
                wmlc: "application/vnd.wap.wmlc",
                wmls: "text/vnd.wap.wmlscript",
                wmlsc: "application/vnd.wap.wmlscriptc",
                wrl: "model/vrml",
                xbm: "image/x-xbitmap",
                xht: "application/xhtml+xml",
                xhtml: "application/xhtml+xml",
                xls: "application/vnd.ms-excel",
                xml: "application/xml",
                xpm: "image/x-xpixmap",
                xsl: "application/xml",
                xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                xltx: "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
                xlsm: "application/vnd.ms-excel.sheet.macroEnabled.12",
                xltm: "application/vnd.ms-excel.template.macroEnabled.12",
                xlam: "application/vnd.ms-excel.addin.macroEnabled.12",
                xlsb: "application/vnd.ms-excel.sheet.binary.macroEnabled.12",
                xslt: "application/xslt+xml",
                xul: "application/vnd.mozilla.xul+xml",
                xwd: "image/x-xwindowdump",
                xyz: "chemical/x-xyz",
                zip: "application/zip"
            },
            g = function(a, c) {
                var d = new b.Promise;
                if ("undefined" == typeof FileReader) return b.Promise.error(new b.Error(b.Error.FILE_READ_ERROR, "Attempted to use a FileReader on an unsupported browser."));
                var e = new FileReader;
                return e.onloadend = function() {
                    if (2 !== e.readyState) return d.reject(new b.Error(b.Error.FILE_READ_ERROR, "Error reading file.")), void 0;
                    var a = e.result,
                        f = /^data:([^;]*);base64,(.*)$/.exec(a);
                    return f ? (d.resolve(f[2], c || f[1]), void 0) : (d.reject(new b.Error(b.Error.FILE_READ_ERROR, "Unable to interpret data URL: " + a)), void 0)
                }, e.readAsDataURL(a), d
            };
        b.File = function(a, d, h) {
            this._name = a;
            var i = /\.([^.]*)$/.exec(a);
            i && (i = i[1].toLowerCase());
            var j = h || f[i] || "text/plain";
            if (c.isArray(d)) this._source = b.Promise.as(e(d), j);
            else if (d && d.base64) {
                var k = /^data:([a-zA-Z]*\/[a-zA-Z+.-]*);(charset=[a-zA-Z0-9\-\/\s]*,)?base64,(\S+)/,
                    l = k.exec(d.base64);
                this._source = l && l.length > 0 ? b.Promise.as(4 === l.length ? l[3] : l[2], l[1]) : b.Promise.as(d.base64, j)
            } else if ("undefined" != typeof File && d instanceof File) this._source = g(d, h);
            else if (c.isString(d)) throw "Creating a Parse.File from a String is not yet supported."
        }, b.File.prototype = {
            name: function() {
                return this._name
            },
            url: function() {
                return this._url
            },
            save: function(a) {
                a = a || {};
                var c = this;
                return c._previousSave || (c._previousSave = c._source.then(function(d, e) {
                    var f = {
                        base64: d,
                        _ContentType: e
                    };
                    return b._request({
                        route: "files",
                        className: c._name,
                        method: "POST",
                        data: f,
                        useMasterKey: a.useMasterKey
                    })
                }).then(function(a) {
                    return c._name = a.name, c._url = a.url, c
                })), c._previousSave._thenRunCallbacks(a)
            }
        }
    }(this),
    function(a) {
        a.Parse = a.Parse || {};
        var b = a.Parse,
            c = b._;
        b.Object = function(a, d) {
            if (c.isString(a)) return b.Object._create.apply(this, arguments);
            a = a || {}, d && d.parse && (a = this.parse(a));
            var e = b._getValue(this, "defaults");
            if (e && (a = c.extend({}, e, a)), d && d.collection && (this.collection = d.collection), this._serverData = {}, this._opSetQueue = [{}], this.attributes = {}, this._hashedJSON = {}, this._escapedAttributes = {}, this.cid = c.uniqueId("c"), this.changed = {}, this._silent = {}, this._pending = {}, !this.set(a, {
                    silent: !0
                })) throw new Error("Can't create an invalid Parse.Object");
            this.changed = {}, this._silent = {}, this._pending = {}, this._hasData = !0, this._previousAttributes = c.clone(this.attributes), this.initialize.apply(this, arguments)
        }, b.Object.saveAll = function(a, c) {
            return c = c || {}, b.Object._deepSaveAsync(a, {
                useMasterKey: c.useMasterKey
            })._thenRunCallbacks(c)
        }, b.Object.destroyAll = function(a, d) {
            d = d || {};
            var e = function(a) {
                    a.trigger("destroy", a, a.collection, d)
                },
                f = [],
                g = function(a) {
                    var g = b.Promise.as();
                    return a.length > 0 && (g = g.then(function() {
                        return b._request({
                            route: "batch",
                            method: "POST",
                            useMasterKey: d.useMasterKey,
                            data: {
                                requests: c.map(a, function(a) {
                                    return {
                                        method: "DELETE",
                                        path: "/1/classes/" + a.className + "/" + a.id
                                    }
                                })
                            }
                        })
                    }).then(function(c) {
                        b._arrayEach(a, function(a, g) {
                            if (c[g].success && d.wait) e(a);
                            else if (c[g].error) {
                                var h = new b.Error(c[g].error.code, c[g].error.error);
                                h.object = a, f.push(h)
                            }
                        })
                    })), g
                },
                h = b.Promise.as(),
                i = [];
            return b._arrayEach(a, function(b, c) {
                if (b.id && d.wait || e(b), b.id && i.push(b), 20 === i.length || c + 1 === a.length) {
                    var f = i;
                    i = [], h = h.then(function() {
                        return g(f)
                    })
                }
            }), h.then(function() {
                if (0 === f.length) return !0;
                var a = new b.Error(b.Error.AGGREGATE_ERROR, "Error deleting an object in destroyAll");
                return a.errors = f, b.Promise.error(a)
            })._thenRunCallbacks(d)
        }, b.Object.fetchAll = function(a, c) {
            return b.Object._fetchAll(a, !0)._thenRunCallbacks(c)
        }, b.Object.fetchAllIfNeeded = function(a, c) {
            return b.Object._fetchAll(a, !1)._thenRunCallbacks(c)
        }, c.extend(b.Object.prototype, b.Events, {
            _existed: !1,
            initialize: function() {},
            toJSON: function() {
                var a = this._toFullJSON();
                return b._arrayEach(["__type", "className"], function(b) {
                    delete a[b]
                }), a
            },
            _toFullJSON: function(a) {
                var d = c.clone(this.attributes);
                return b._objectEach(d, function(c, e) {
                    d[e] = b._encode(c, a)
                }), b._objectEach(this._operations, function(a, b) {
                    d[b] = a
                }), c.has(this, "id") && (d.objectId = this.id), c.has(this, "createdAt") && (d.createdAt = c.isDate(this.createdAt) ? this.createdAt.toJSON() : this.createdAt), c.has(this, "updatedAt") && (d.updatedAt = c.isDate(this.updatedAt) ? this.updatedAt.toJSON() : this.updatedAt), d.__type = "Object", d.className = this.className, d
            },
            _refreshCache: function() {
                var a = this;
                a._refreshingCache || (a._refreshingCache = !0, b._objectEach(this.attributes, function(d, e) {
                    d instanceof b.Object ? d._refreshCache() : c.isObject(d) && a._resetCacheForKey(e) && a.set(e, new b.Op.Set(d), {
                        silent: !0
                    })
                }), delete a._refreshingCache)
            },
            dirty: function(a) {
                this._refreshCache();
                var b = c.last(this._opSetQueue);
                return a ? b[a] ? !0 : !1 : this.id ? c.keys(b).length > 0 ? !0 : !1 : !0
            },
            dirtyKeys: function() {
                return c.keys(c.last(this._opSetQueue))
            },
            _toPointer: function() {
                if (!this.id) throw new Error("Can't serialize an unsaved Parse.Object");
                return {
                    __type: "Pointer",
                    className: this.className,
                    objectId: this.id
                }
            },
            get: function(a) {
                return this.attributes[a]
            },
            relation: function(a) {
                var c = this.get(a);
                if (c) {
                    if (!(c instanceof b.Relation)) throw "Called relation() on non-relation field " + a;
                    return c._ensureParentAndKey(this, a), c
                }
                return new b.Relation(this, a)
            },
            escape: function(a) {
                var d = this._escapedAttributes[a];
                if (d) return d;
                var e, f = this.attributes[a];
                return e = b._isNullOrUndefined(f) ? "" : c.escape(f.toString()), this._escapedAttributes[a] = e, e
            },
            has: function(a) {
                return !b._isNullOrUndefined(this.attributes[a])
            },
            _mergeMagicFields: function(a) {
                var d = this,
                    e = ["id", "objectId", "createdAt", "updatedAt"];
                b._arrayEach(e, function(e) {
                    a[e] && ("objectId" === e ? d.id = a[e] : d[e] = "createdAt" !== e && "updatedAt" !== e || c.isDate(a[e]) ? a[e] : b._parseDate(a[e]), delete a[e])
                })
            },
            _copyServerData: function(a) {
                var c = {};
                b._objectEach(a, function(a, d) {
                    c[d] = b._decode(d, a)
                }), this._serverData = c, this._rebuildAllEstimatedData(), this._refreshCache(), this._opSetQueue = [{}], this._rebuildAllEstimatedData()
            },
            _mergeFromObject: function(a) {
                a && (this.id = a.id, this.createdAt = a.createdAt, this.updatedAt = a.updatedAt, this._copyServerData(a._serverData), this._hasData = !0)
            },
            _startSave: function() {
                this._opSetQueue.push({})
            },
            _cancelSave: function() {
                var a = c.first(this._opSetQueue);
                this._opSetQueue = c.rest(this._opSetQueue);
                var d = c.first(this._opSetQueue);
                b._objectEach(a, function(b, c) {
                    var e = a[c],
                        f = d[c];
                    e && f ? d[c] = f._mergeWithPrevious(e) : e && (d[c] = e)
                }), this._saving = this._saving - 1
            },
            _finishSave: function(a) {
                var d = {};
                b._traverse(this.attributes, function(a) {
                    a instanceof b.Object && a.id && a._hasData && (d[a.id] = a)
                });
                var e = c.first(this._opSetQueue);
                this._opSetQueue = c.rest(this._opSetQueue), this._applyOpSet(e, this._serverData), this._mergeMagicFields(a);
                var f = this;
                b._objectEach(a, function(a, c) {
                    f._serverData[c] = b._decode(c, a);
                    var e = b._traverse(f._serverData[c], function(a) {
                        return a instanceof b.Object && d[a.id] ? d[a.id] : void 0
                    });
                    e && (f._serverData[c] = e)
                }), this._rebuildAllEstimatedData(), this._saving = this._saving - 1
            },
            _finishFetch: function(a, b) {
                this._opSetQueue = [{}], this._mergeMagicFields(a), this._copyServerData(a), this._hasData = b
            },
            _applyOpSet: function(a, c) {
                var d = this;
                b._objectEach(a, function(a, e) {
                    c[e] = a._estimate(c[e], d, e), c[e] === b.Op._UNSET && delete c[e]
                })
            },
            _resetCacheForKey: function(a) {
                var d = this.attributes[a];
                if (!(!c.isObject(d) || d instanceof b.Object || d instanceof b.File)) {
                    d = d.toJSON ? d.toJSON() : d;
                    var e = JSON.stringify(d);
                    if (this._hashedJSON[a] !== e) {
                        var f = !!this._hashedJSON[a];
                        return this._hashedJSON[a] = e, f
                    }
                }
                return !1
            },
            _rebuildEstimatedDataForKey: function(a) {
                var c = this;
                delete this.attributes[a], this._serverData[a] && (this.attributes[a] = this._serverData[a]), b._arrayEach(this._opSetQueue, function(d) {
                    var e = d[a];
                    e && (c.attributes[a] = e._estimate(c.attributes[a], c, a), c.attributes[a] === b.Op._UNSET ? delete c.attributes[a] : c._resetCacheForKey(a))
                })
            },
            _rebuildAllEstimatedData: function() {
                var a = this,
                    d = c.clone(this.attributes);
                this.attributes = c.clone(this._serverData), b._arrayEach(this._opSetQueue, function(c) {
                    a._applyOpSet(c, a.attributes), b._objectEach(c, function(b, c) {
                        a._resetCacheForKey(c)
                    })
                }), b._objectEach(d, function(b, c) {
                    a.attributes[c] !== b && a.trigger("change:" + c, a, a.attributes[c], {})
                }), b._objectEach(this.attributes, function(b, e) {
                    c.has(d, e) || a.trigger("change:" + e, a, b, {})
                })
            },
            set: function(a, d, e) {
                var f;
                if (c.isObject(a) || b._isNullOrUndefined(a) ? (f = a, b._objectEach(f, function(a, c) {
                        f[c] = b._decode(c, a)
                    }), e = d) : (f = {}, f[a] = b._decode(a, d)), e = e || {}, !f) return this;
                f instanceof b.Object && (f = f.attributes), e.unset && b._objectEach(f, function(a, c) {
                    f[c] = new b.Op.Unset
                });
                var g = c.clone(f),
                    h = this;
                if (b._objectEach(g, function(a, c) {
                        a instanceof b.Op && (g[c] = a._estimate(h.attributes[c], h, c), g[c] === b.Op._UNSET && delete g[c])
                    }), !this._validate(f, e)) return !1;
                this._mergeMagicFields(f), e.changes = {};
                var i = this._escapedAttributes;
                return this._previousAttributes || {}, b._arrayEach(c.keys(f), function(a) {
                    var d = f[a];
                    d instanceof b.Relation && (d.parent = h), d instanceof b.Op || (d = new b.Op.Set(d));
                    var g = !0;
                    d instanceof b.Op.Set && c.isEqual(h.attributes[a], d.value) && (g = !1), g && (delete i[a], e.silent ? h._silent[a] = !0 : e.changes[a] = !0);
                    var j = c.last(h._opSetQueue);
                    j[a] = d._mergeWithPrevious(j[a]), h._rebuildEstimatedDataForKey(a), g ? (h.changed[a] = h.attributes[a], e.silent || (h._pending[a] = !0)) : (delete h.changed[a], delete h._pending[a])
                }), e.silent || this.change(e), this
            },
            unset: function(a, b) {
                return b = b || {}, b.unset = !0, this.set(a, null, b)
            },
            increment: function(a, d) {
                return (c.isUndefined(d) || c.isNull(d)) && (d = 1), this.set(a, new b.Op.Increment(d))
            },
            add: function(a, c) {
                return this.set(a, new b.Op.Add([c]))
            },
            addUnique: function(a, c) {
                return this.set(a, new b.Op.AddUnique([c]))
            },
            remove: function(a, c) {
                return this.set(a, new b.Op.Remove([c]))
            },
            op: function(a) {
                return c.last(this._opSetQueue)[a]
            },
            clear: function(a) {
                a = a || {}, a.unset = !0;
                var b = c.extend(this.attributes, this._operations);
                return this.set(b, a)
            },
            _getSaveJSON: function() {
                var a = c.clone(c.first(this._opSetQueue));
                return b._objectEach(a, function(b, c) {
                    a[c] = b.toJSON()
                }), a
            },
            _canBeSerialized: function() {
                return b.Object._canBeSerializedAsValue(this.attributes)
            },
            fetch: function(a) {
                var c = this;
                a = a || {};
                var d = b._request({
                    method: "GET",
                    route: "classes",
                    className: this.className,
                    objectId: this.id,
                    useMasterKey: a.useMasterKey
                });
                return d.then(function(a, b, d) {
                    return c._finishFetch(c.parse(a, b, d), !0), c
                })._thenRunCallbacks(a, this)
            },
            save: function(a, d, e) {
                var f, g, h;
                if (c.isObject(a) || b._isNullOrUndefined(a) ? (f = a, h = d) : (f = {}, f[a] = d, h = e), !h && f) {
                    var i = c.reject(f, function(a, b) {
                        return c.include(["success", "error", "wait"], b)
                    });
                    if (0 === i.length) {
                        var j = !0;
                        if (c.has(f, "success") && !c.isFunction(f.success) && (j = !1), c.has(f, "error") && !c.isFunction(f.error) && (j = !1), j) return this.save(null, f)
                    }
                }
                h = c.clone(h) || {}, h.wait && (g = c.clone(this.attributes));
                var k = c.clone(h) || {};
                k.wait && (k.silent = !0);
                var l;
                if (k.error = function(a, b) {
                        l = b
                    }, f && !this.set(f, k)) return b.Promise.error(l)._thenRunCallbacks(h, this);
                var m = this;
                m._refreshCache();
                var n = [],
                    o = [];
                return b.Object._findUnsavedChildren(m.attributes, n, o), n.length + o.length > 0 ? b.Object._deepSaveAsync(this.attributes, {
                    useMasterKey: h.useMasterKey
                }).then(function() {
                    return m.save(null, h)
                }, function(a) {
                    return b.Promise.error(a)._thenRunCallbacks(h, m)
                }) : (this._startSave(), this._saving = (this._saving || 0) + 1, this._allPreviousSaves = this._allPreviousSaves || b.Promise.as(), this._allPreviousSaves = this._allPreviousSaves._continueWith(function() {
                    var a = m.id ? "PUT" : "POST",
                        d = m._getSaveJSON(),
                        e = "classes",
                        i = m.className;
                    "_User" !== m.className || m.id || (e = "users", i = null);
                    var j = b._request({
                        route: e,
                        className: i,
                        objectId: m.id,
                        method: a,
                        useMasterKey: h.useMasterKey,
                        data: d
                    });
                    return j = j.then(function(a, b, d) {
                        var e = m.parse(a, b, d);
                        return h.wait && (e = c.extend(f || {}, e)), m._finishSave(e), h.wait && m.set(g, k), m
                    }, function(a) {
                        return m._cancelSave(), b.Promise.error(a)
                    })._thenRunCallbacks(h, m)
                }), this._allPreviousSaves)
            },
            destroy: function(a) {
                a = a || {};
                var c = this,
                    d = function() {
                        c.trigger("destroy", c, c.collection, a)
                    };
                if (!this.id) return d();
                a.wait || d();
                var e = b._request({
                    route: "classes",
                    className: this.className,
                    objectId: this.id,
                    method: "DELETE",
                    useMasterKey: a.useMasterKey
                });
                return e.then(function() {
                    return a.wait && d(), c
                })._thenRunCallbacks(a, this)
            },
            parse: function(a, d) {
                var e = c.clone(a);
                return c(["createdAt", "updatedAt"]).each(function(a) {
                    e[a] && (e[a] = b._parseDate(e[a]))
                }), e.updatedAt || (e.updatedAt = e.createdAt), d && (this._existed = 201 !== d), e
            },
            clone: function() {
                return new this.constructor(this.attributes)
            },
            isNew: function() {
                return !this.id
            },
            change: function(a) {
                a = a || {};
                var d = this._changing;
                this._changing = !0;
                var e = this;
                b._objectEach(this._silent, function(a) {
                    e._pending[a] = !0
                });
                var f = c.extend({}, a.changes, this._silent);
                if (this._silent = {}, b._objectEach(f, function(b, c) {
                        e.trigger("change:" + c, e, e.get(c), a)
                    }), d) return this;
                for (var g = function(a, b) {
                        e._pending[b] || e._silent[b] || delete e.changed[b]
                    }; !c.isEmpty(this._pending);) this._pending = {}, this.trigger("change", this, a), b._objectEach(this.changed, g), e._previousAttributes = c.clone(this.attributes);
                return this._changing = !1, this
            },
            existed: function() {
                return this._existed
            },
            hasChanged: function(a) {
                return arguments.length ? this.changed && c.has(this.changed, a) : !c.isEmpty(this.changed)
            },
            changedAttributes: function(a) {
                if (!a) return this.hasChanged() ? c.clone(this.changed) : !1;
                var d = {},
                    e = this._previousAttributes;
                return b._objectEach(a, function(a, b) {
                    c.isEqual(e[b], a) || (d[b] = a)
                }), d
            },
            previous: function(a) {
                return arguments.length && this._previousAttributes ? this._previousAttributes[a] : null
            },
            previousAttributes: function() {
                return c.clone(this._previousAttributes)
            },
            isValid: function() {
                return !this.validate(this.attributes)
            },
            validate: function(a) {
                if (c.has(a, "ACL") && !(a.ACL instanceof b.ACL)) return new b.Error(b.Error.OTHER_CAUSE, "ACL must be a Parse.ACL.");
                var d = !0;
                return b._objectEach(a, function(a, b) {
                    /^[A-Za-z][0-9A-Za-z_]*$/.test(b) || (d = !1)
                }), d ? !1 : new b.Error(b.Error.INVALID_KEY_NAME)
            },
            _validate: function(a, b) {
                if (b.silent || !this.validate) return !0;
                a = c.extend({}, this.attributes, a);
                var d = this.validate(a, b);
                return d ? (b && b.error ? b.error(this, d, b) : this.trigger("error", this, d, b), !1) : !0
            },
            getACL: function() {
                return this.get("ACL")
            },
            setACL: function(a, b) {
                return this.set("ACL", a, b)
            }
        }), b.Object._getSubclass = function(a) {
            if (!c.isString(a)) throw "Parse.Object._getSubclass requires a string argument.";
            var d = b.Object._classMap[a];
            return d || (d = b.Object.extend(a), b.Object._classMap[a] = d), d
        }, b.Object._create = function(a, c, d) {
            var e = b.Object._getSubclass(a);
            return new e(c, d)
        }, b.Object._toObjectIdArray = function(a, c) {
            if (0 === a.length) return b.Promise.as(a);
            for (var d, e = a[0].className, f = [], g = 0; g < a.length; g++) {
                var h = a[g];
                if (e !== h.className) return d = new b.Error(b.Error.INVALID_CLASS_NAME, "All objects should be of the same class"), b.Promise.error(d);
                if (!h.id) return d = new b.Error(b.Error.MISSING_OBJECT_ID, "All objects must have an ID"), b.Promise.error(d);
                c && h._hasData || f.push(h.id)
            }
            return b.Promise.as(f)
        }, b.Object._updateWithFetchedResults = function(a, c, d) {
            var e = {};
            b._arrayEach(c, function(a) {
                e[a.id] = a
            });
            for (var f = 0; f < a.length; f++) {
                var g = a[f],
                    h = e[g.id];
                if (!h && d) {
                    var i = new b.Error(b.Error.OBJECT_NOT_FOUND, "All objects must exist on the server");
                    return b.Promise.error(i)
                }
                g._mergeFromObject(h)
            }
            return b.Promise.as(a)
        }, b.Object._fetchAll = function(a, c) {
            if (0 === a.length) return b.Promise.as(a);
            var d = !c;
            return b.Object._toObjectIdArray(a, d).then(function(c) {
                var d = a[0].className,
                    e = new b.Query(d);
                return e.containedIn("objectId", c), e.limit = c.length, e.find()
            }).then(function(d) {
                return b.Object._updateWithFetchedResults(a, d, c)
            })
        }, b.Object._classMap = {}, b.Object._extend = b._extend, b.Object.extend = function(a, d, e) {
            if (!c.isString(a)) {
                if (a && c.has(a, "className")) return b.Object.extend(a.className, a, d);
                throw new Error("Parse.Object.extend's first argument should be the className.")
            }
            "User" === a && b.User._performUserRewrite && (a = "_User"), d = d || {}, d.className = a;
            var f = null;
            if (c.has(b.Object._classMap, a)) {
                var g = b.Object._classMap[a];
                f = g._extend(d, e)
            } else f = this._extend(d, e);
            return f.extend = function(d) {
                if (c.isString(d) || d && c.has(d, "className")) return b.Object.extend.apply(f, arguments);
                var e = [a].concat(b._.toArray(arguments));
                return b.Object.extend.apply(f, e)
            }, b.Object._classMap[a] = f, f
        }, b.Object._findUnsavedChildren = function(a, c, d) {
            b._traverse(a, function(a) {
                return a instanceof b.Object ? (a._refreshCache(), a.dirty() && c.push(a), void 0) : a instanceof b.File ? (a.url() || d.push(a), void 0) : void 0
            })
        }, b.Object._canBeSerializedAsValue = function(a) {
            if (a instanceof b.Object) return !!a.id;
            if (a instanceof b.File) return !0;
            var d = !0;
            return c.isArray(a) ? b._arrayEach(a, function(a) {
                b.Object._canBeSerializedAsValue(a) || (d = !1)
            }) : c.isObject(a) && b._objectEach(a, function(a) {
                b.Object._canBeSerializedAsValue(a) || (d = !1)
            }), d
        }, b.Object._deepSaveAsync = function(a, d) {
            var e = [],
                f = [];
            b.Object._findUnsavedChildren(a, e, f);
            var g = b.Promise.as();
            c.each(f, function(a) {
                g = g.then(function() {
                    return a.save(d)
                })
            });
            var h = c.uniq(e),
                i = c.uniq(h);
            return g.then(function() {
                return b.Promise._continueWhile(function() {
                    return i.length > 0
                }, function() {
                    var a = [],
                        e = [];
                    if (b._arrayEach(i, function(b) {
                            return a.length > 20 ? (e.push(b), void 0) : (b._canBeSerialized() ? a.push(b) : e.push(b), void 0)
                        }), i = e, 0 === a.length) return b.Promise.error(new b.Error(b.Error.OTHER_CAUSE, "Tried to save a batch with a cycle."));
                    var f = b.Promise.when(c.map(a, function(a) {
                            return a._allPreviousSaves || b.Promise.as()
                        })),
                        g = new b.Promise;
                    return b._arrayEach(a, function(a) {
                        a._allPreviousSaves = g
                    }), f._continueWith(function() {
                        return b._request({
                            route: "batch",
                            method: "POST",
                            useMasterKey: d.useMasterKey,
                            data: {
                                requests: c.map(a, function(a) {
                                    var b = a._getSaveJSON(),
                                        c = "POST",
                                        d = "/1/classes/" + a.className;
                                    return a.id && (d = d + "/" + a.id, c = "PUT"), a._startSave(), {
                                        method: c,
                                        path: d,
                                        body: b
                                    }
                                })
                            }
                        }).then(function(c, d, e) {
                            var f;
                            return b._arrayEach(a, function(a, b) {
                                c[b].success ? a._finishSave(a.parse(c[b].success, d, e)) : (f = f || c[b].error, a._cancelSave())
                            }), f ? b.Promise.error(new b.Error(f.code, f.error)) : void 0
                        }).then(function(a) {
                            return g.resolve(a), a
                        }, function(a) {
                            return g.reject(a), b.Promise.error(a)
                        })
                    })
                })
            }).then(function() {
                return a
            })
        }
    }(this),
    function(a) {
        a.Parse = a.Parse || {};
        var b = a.Parse,
            c = b._;
        b.Role = b.Object.extend("_Role", {
            constructor: function(a, d) {
                c.isString(a) && d instanceof b.ACL ? (b.Object.prototype.constructor.call(this, null, null), this.setName(a), this.setACL(d)) : b.Object.prototype.constructor.call(this, a, d)
            },
            getName: function() {
                return this.get("name")
            },
            setName: function(a, b) {
                return this.set("name", a, b)
            },
            getUsers: function() {
                return this.relation("users")
            },
            getRoles: function() {
                return this.relation("roles")
            },
            validate: function(a, d) {
                if ("name" in a && a.name !== this.getName()) {
                    var e = a.name;
                    if (this.id && this.id !== a.objectId) return new b.Error(b.Error.OTHER_CAUSE, "A role's name can only be set before it has been saved.");
                    if (!c.isString(e)) return new b.Error(b.Error.OTHER_CAUSE, "A role's name must be a String.");
                    if (!/^[0-9a-zA-Z\-_ ]+$/.test(e)) return new b.Error(b.Error.OTHER_CAUSE, "A role's name can only contain alphanumeric characters, _, -, and spaces.")
                }
                return b.Object.prototype.validate ? b.Object.prototype.validate.call(this, a, d) : !1
            }
        })
    }(this),
    function(a) {
        a.Parse = a.Parse || {};
        var b = a.Parse,
            c = b._;
        b.Collection = function(a, b) {
            b = b || {}, b.comparator && (this.comparator = b.comparator), b.model && (this.model = b.model), b.query && (this.query = b.query), this._reset(), this.initialize.apply(this, arguments), a && this.reset(a, {
                silent: !0,
                parse: b.parse
            })
        }, c.extend(b.Collection.prototype, b.Events, {
            model: b.Object,
            initialize: function() {},
            toJSON: function() {
                return this.map(function(a) {
                    return a.toJSON()
                })
            },
            add: function(a, d) {
                var e, f, g, h, i, j, k = {},
                    l = {};
                for (d = d || {}, a = c.isArray(a) ? a.slice() : [a], e = 0, g = a.length; g > e; e++) {
                    if (a[e] = this._prepareModel(a[e], d), h = a[e], !h) throw new Error("Can't add an invalid model to a collection");
                    if (i = h.cid, k[i] || this._byCid[i]) throw new Error("Duplicate cid: can't add the same model to a collection twice");
                    if (j = h.id, !b._isNullOrUndefined(j) && (l[j] || this._byId[j])) throw new Error("Duplicate id: can't add the same model to a collection twice");
                    l[j] = h, k[i] = h
                }
                for (e = 0; g > e; e++)(h = a[e]).on("all", this._onModelEvent, this), this._byCid[h.cid] = h, h.id && (this._byId[h.id] = h);
                if (this.length += g, f = b._isNullOrUndefined(d.at) ? this.models.length : d.at, this.models.splice.apply(this.models, [f, 0].concat(a)), this.comparator && this.sort({
                        silent: !0
                    }), d.silent) return this;
                for (e = 0, g = this.models.length; g > e; e++) h = this.models[e], k[h.cid] && (d.index = e, h.trigger("add", h, this, d));
                return this
            },
            remove: function(a, b) {
                var d, e, f, g;
                for (b = b || {}, a = c.isArray(a) ? a.slice() : [a], d = 0, e = a.length; e > d; d++) g = this.getByCid(a[d]) || this.get(a[d]), g && (delete this._byId[g.id], delete this._byCid[g.cid], f = this.indexOf(g), this.models.splice(f, 1), this.length--, b.silent || (b.index = f, g.trigger("remove", g, this, b)), this._removeReference(g));
                return this
            },
            get: function(a) {
                return a && this._byId[a.id || a]
            },
            getByCid: function(a) {
                return a && this._byCid[a.cid || a]
            },
            at: function(a) {
                return this.models[a]
            },
            sort: function(a) {
                if (a = a || {}, !this.comparator) throw new Error("Cannot sort a set without a comparator");
                var b = c.bind(this.comparator, this);
                return 1 === this.comparator.length ? this.models = this.sortBy(b) : this.models.sort(b), a.silent || this.trigger("reset", this, a), this
            },
            pluck: function(a) {
                return c.map(this.models, function(b) {
                    return b.get(a)
                })
            },
            reset: function(a, c) {
                var d = this;
                return a = a || [], c = c || {}, b._arrayEach(this.models, function(a) {
                    d._removeReference(a)
                }), this._reset(), this.add(a, {
                    silent: !0,
                    parse: c.parse
                }), c.silent || this.trigger("reset", this, c), this
            },
            fetch: function(a) {
                a = c.clone(a) || {}, void 0 === a.parse && (a.parse = !0);
                var d = this,
                    e = this.query || new b.Query(this.model);
                return e.find({
                    useMasterKey: a.useMasterKey
                }).then(function(b) {
                    return a.add ? d.add(b, a) : d.reset(b, a), d
                })._thenRunCallbacks(a, this)
            },
            create: function(a, b) {
                var d = this;
                if (b = b ? c.clone(b) : {}, a = this._prepareModel(a, b), !a) return !1;
                b.wait || d.add(a, b);
                var e = b.success;
                return b.success = function(c, f) {
                    b.wait && d.add(c, b), e ? e(c, f) : c.trigger("sync", a, f, b)
                }, a.save(null, b), a
            },
            parse: function(a) {
                return a
            },
            chain: function() {
                return c(this.models).chain()
            },
            _reset: function() {
                this.length = 0, this.models = [], this._byId = {}, this._byCid = {}
            },
            _prepareModel: function(a, c) {
                if (a instanceof b.Object) a.collection || (a.collection = this);
                else {
                    var d = a;
                    c.collection = this, a = new this.model(d, c), a._validate(a.attributes, c) || (a = !1)
                }
                return a
            },
            _removeReference: function(a) {
                this === a.collection && delete a.collection, a.off("all", this._onModelEvent, this)
            },
            _onModelEvent: function(a, b, c, d) {
                ("add" !== a && "remove" !== a || c === this) && ("destroy" === a && this.remove(b, d), b && "change:objectId" === a && (delete this._byId[b.previous("objectId")], this._byId[b.id] = b), this.trigger.apply(this, arguments))
            }
        });
        var d = ["forEach", "each", "map", "reduce", "reduceRight", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "sortBy", "sortedIndex", "toArray", "size", "first", "initial", "rest", "last", "without", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "groupBy"];
        b._arrayEach(d, function(a) {
            b.Collection.prototype[a] = function() {
                return c[a].apply(c, [this.models].concat(c.toArray(arguments)))
            }
        }), b.Collection.extend = b._extend
    }(this),
    function(a) {
        a.Parse = a.Parse || {};
        var b = a.Parse,
            c = b._;
        b.View = function(a) {
            this.cid = c.uniqueId("view"), this._configure(a || {}), this._ensureElement(), this.initialize.apply(this, arguments), this.delegateEvents()
        };
        var d = /^(\S+)\s*(.*)$/,
            e = ["model", "collection", "el", "id", "attributes", "className", "tagName"];
        c.extend(b.View.prototype, b.Events, {
            tagName: "div",
            $: function(a) {
                return this.$el.find(a)
            },
            initialize: function() {},
            render: function() {
                return this
            },
            remove: function() {
                return this.$el.remove(), this
            },
            make: function(a, c, d) {
                var e = document.createElement(a);
                return c && b.$(e).attr(c), d && b.$(e).html(d), e
            },
            setElement: function(a, c) {
                return this.$el = b.$(a), this.el = this.$el[0], c !== !1 && this.delegateEvents(), this
            },
            delegateEvents: function(a) {
                if (a = a || b._getValue(this, "events")) {
                    this.undelegateEvents();
                    var e = this;
                    b._objectEach(a, function(b, f) {
                        if (c.isFunction(b) || (b = e[a[f]]), !b) throw new Error('Event "' + a[f] + '" does not exist');
                        var g = f.match(d),
                            h = g[1],
                            i = g[2];
                        b = c.bind(b, e), h += ".delegateEvents" + e.cid, "" === i ? e.$el.bind(h, b) : e.$el.delegate(i, h, b)
                    })
                }
            },
            undelegateEvents: function() {
                this.$el.unbind(".delegateEvents" + this.cid)
            },
            _configure: function(a) {
                this.options && (a = c.extend({}, this.options, a));
                var b = this;
                c.each(e, function(c) {
                    a[c] && (b[c] = a[c])
                }), this.options = a
            },
            _ensureElement: function() {
                if (this.el) this.setElement(this.el, !1);
                else {
                    var a = b._getValue(this, "attributes") || {};
                    this.id && (a.id = this.id), this.className && (a["class"] = this.className), this.setElement(this.make(this.tagName, a), !1)
                }
            }
        }), b.View.extend = b._extend
    }(this),
    function(a) {
        a.Parse = a.Parse || {};
        var b = a.Parse,
            c = b._;
        b.User = b.Object.extend("_User", {
            _isCurrentUser: !1,
            _mergeFromObject: function(a) {
                a.getSessionToken() && (this._sessionToken = a.getSessionToken()), b.User.__super__._mergeFromObject.call(this, a)
            },
            _mergeMagicFields: function(a) {
                a.sessionToken && (this._sessionToken = a.sessionToken, delete a.sessionToken), b.User.__super__._mergeMagicFields.call(this, a)
            },
            _cleanupAuthData: function() {
                if (this.isCurrent()) {
                    var a = this.get("authData");
                    a && b._objectEach(this.get("authData"), function(b, c) {
                        a[c] || delete a[c]
                    })
                }
            },
            _synchronizeAllAuthData: function() {
                var a = this.get("authData");
                if (a) {
                    var c = this;
                    b._objectEach(this.get("authData"), function(a, b) {
                        c._synchronizeAuthData(b)
                    })
                }
            },
            _synchronizeAuthData: function(a) {
                if (this.isCurrent()) {
                    var d;
                    c.isString(a) ? (d = a, a = b.User._authProviders[d]) : d = a.getAuthType();
                    var e = this.get("authData");
                    if (e && a) {
                        var f = a.restoreAuthentication(e[d]);
                        f || this._unlinkFrom(a)
                    }
                }
            },
            _handleSaveResult: function(a) {
                a && (this._isCurrentUser = !0), this._cleanupAuthData(), this._synchronizeAllAuthData(), delete this._serverData.password, this._rebuildEstimatedDataForKey("password"), this._refreshCache(), (a || this.isCurrent()) && b.User._saveCurrentUser(this)
            },
            _linkWith: function(a, d) {
                var e;
                if (c.isString(a) ? (e = a, a = b.User._authProviders[a]) : e = a.getAuthType(), c.has(d, "authData")) {
                    var f = this.get("authData") || {};
                    f[e] = d.authData, this.set("authData", f);
                    var g = c.clone(d) || {};
                    return g.success = function(a) {
                        a._handleSaveResult(!0), d.success && d.success.apply(this, arguments)
                    }, this.save({
                        authData: f
                    }, g)
                }
                var h = this,
                    i = new b.Promise;
                return a.authenticate({
                    success: function(a, b) {
                        h._linkWith(a, {
                            authData: b,
                            success: d.success,
                            error: d.error
                        }).then(function() {
                            i.resolve(h)
                        })
                    },
                    error: function(a, b) {
                        d.error && d.error(h, b), i.reject(b)
                    }
                }), i
            },
            _unlinkFrom: function(a, d) {
                var e;
                c.isString(a) ? (e = a, a = b.User._authProviders[a]) : e = a.getAuthType();
                var f = c.clone(d),
                    g = this;
                return f.authData = null, f.success = function() {
                    g._synchronizeAuthData(a), d.success && d.success.apply(this, arguments)
                }, this._linkWith(a, f)
            },
            _isLinked: function(a) {
                var b;
                b = c.isString(a) ? a : a.getAuthType();
                var d = this.get("authData") || {};
                return !!d[b]
            },
            _logOutWithAll: function() {
                var a = this.get("authData");
                if (a) {
                    var c = this;
                    b._objectEach(this.get("authData"), function(a, b) {
                        c._logOutWith(b)
                    })
                }
            },
            _logOutWith: function(a) {
                this.isCurrent() && (c.isString(a) && (a = b.User._authProviders[a]), a && a.deauthenticate && a.deauthenticate())
            },
            signUp: function(a, d) {
                var e;
                d = d || {};
                var f = a && a.username || this.get("username");
                if (!f || "" === f) return e = new b.Error(b.Error.OTHER_CAUSE, "Cannot sign up user with an empty name."), d && d.error && d.error(this, e), b.Promise.error(e);
                var g = a && a.password || this.get("password");
                if (!g || "" === g) return e = new b.Error(b.Error.OTHER_CAUSE, "Cannot sign up user with an empty password."), d && d.error && d.error(this, e), b.Promise.error(e);
                var h = c.clone(d);
                return h.success = function(a) {
                    a._handleSaveResult(!0), d.success && d.success.apply(this, arguments)
                }, this.save(a, h)
            },
            logIn: function(a) {
                var c = this;
                a = a || {};
                var d = b._request({
                    route: "login",
                    method: "GET",
                    useMasterKey: a.useMasterKey,
                    data: this.toJSON()
                });
                return d.then(function(a, b, d) {
                    var e = c.parse(a, b, d);
                    return c._finishFetch(e), c._handleSaveResult(!0), c
                })._thenRunCallbacks(a, this)
            },
            save: function(a, d, e) {
                var f, g;
                c.isObject(a) || c.isNull(a) || c.isUndefined(a) ? (f = a, g = d) : (f = {}, f[a] = d, g = e), g = g || {};
                var h = c.clone(g);
                return h.success = function(a) {
                    a._handleSaveResult(!1), g.success && g.success.apply(this, arguments)
                }, b.Object.prototype.save.call(this, f, h)
            },
            fetch: function(a) {
                var d = a ? c.clone(a) : {};
                return d.success = function(b) {
                    b._handleSaveResult(!1), a && a.success && a.success.apply(this, arguments)
                }, b.Object.prototype.fetch.call(this, d)
            },
            isCurrent: function() {
                return this._isCurrentUser
            },
            getUsername: function() {
                return this.get("username")
            },
            setUsername: function(a, b) {
                return this.set("username", a, b)
            },
            setPassword: function(a, b) {
                return this.set("password", a, b)
            },
            getEmail: function() {
                return this.get("email")
            },
            setEmail: function(a, b) {
                return this.set("email", a, b)
            },
            authenticated: function() {
                return !!this._sessionToken && b.User.current() && b.User.current().id === this.id
            },
            getSessionToken: function() {
                return this._sessionToken
            }
        }, {
            _currentUser: null,
            _currentUserMatchesDisk: !1,
            _CURRENT_USER_KEY: "currentUser",
            _authProviders: {},
            _performUserRewrite: !0,
            signUp: function(a, c, d, e) {
                d = d || {}, d.username = a, d.password = c;
                var f = b.Object._create("_User");
                return f.signUp(d, e)
            },
            logIn: function(a, c, d) {
                var e = b.Object._create("_User");
                return e._finishFetch({
                    username: a,
                    password: c
                }), e.logIn(d)
            },
            become: function(a, c) {
                c = c || {};
                var d = b.Object._create("_User");
                return b._request({
                    route: "users",
                    className: "me",
                    method: "GET",
                    useMasterKey: c.useMasterKey,
                    sessionToken: a
                }).then(function(a, b, c) {
                    var e = d.parse(a, b, c);
                    return d._finishFetch(e), d._handleSaveResult(!0), d
                })._thenRunCallbacks(c, d)
            },
            logOut: function() {
                null !== b.User._currentUser && (b.User._currentUser._logOutWithAll(), b.User._currentUser._isCurrentUser = !1), b.User._currentUserMatchesDisk = !0, b.User._currentUser = null, b.localStorage.removeItem(b._getParsePath(b.User._CURRENT_USER_KEY))
            },
            requestPasswordReset: function(a, c) {
                c = c || {};
                var d = b._request({
                    route: "requestPasswordReset",
                    method: "POST",
                    useMasterKey: c.useMasterKey,
                    data: {
                        email: a
                    }
                });
                return d._thenRunCallbacks(c)
            },
            current: function() {
                if (b.User._currentUser) return b.User._currentUser;
                if (b.User._currentUserMatchesDisk) return b.User._currentUser;
                b.User._currentUserMatchesDisk = !0;
                var a = b.localStorage.getItem(b._getParsePath(b.User._CURRENT_USER_KEY));
                if (!a) return null;
                b.User._currentUser = b.Object._create("_User"), b.User._currentUser._isCurrentUser = !0;
                var c = JSON.parse(a);
                return b.User._currentUser.id = c._id, delete c._id, b.User._currentUser._sessionToken = c._sessionToken, delete c._sessionToken, b.User._currentUser._finishFetch(c), b.User._currentUser._synchronizeAllAuthData(), b.User._currentUser._refreshCache(), b.User._currentUser._opSetQueue = [{}], b.User._currentUser
            },
            allowCustomUserClass: function(a) {
                this._performUserRewrite = !a
            },
            _saveCurrentUser: function(a) {
                b.User._currentUser !== a && b.User.logOut(), a._isCurrentUser = !0, b.User._currentUser = a, b.User._currentUserMatchesDisk = !0;
                var c = a.toJSON();
                c._id = a.id, c._sessionToken = a._sessionToken, b.localStorage.setItem(b._getParsePath(b.User._CURRENT_USER_KEY), JSON.stringify(c))
            },
            _registerAuthenticationProvider: function(a) {
                b.User._authProviders[a.getAuthType()] = a, b.User.current() && b.User.current()._synchronizeAuthData(a.getAuthType())
            },
            _logInWith: function(a, c) {
                var d = b.Object._create("_User");
                return d._linkWith(a, c)
            }
        })
    }(this),
    function(a) {
        a.Parse = a.Parse || {};
        var b = a.Parse,
            c = b._;
        b.Query = function(a) {
            c.isString(a) && (a = b.Object._getSubclass(a)), this.objectClass = a, this.className = a.prototype.className, this._where = {}, this._include = [], this._limit = -1, this._skip = 0, this._extraOptions = {}
        }, b.Query.or = function() {
            var a = c.toArray(arguments),
                d = null;
            b._arrayEach(a, function(a) {
                if (c.isNull(d) && (d = a.className), d !== a.className) throw "All queries must be for the same class"
            });
            var e = new b.Query(d);
            return e._orQuery(a), e
        }, b.Query.prototype = {
            get: function(a, d) {
                var e = this;
                e.equalTo("objectId", a);
                var f = {};
                return d && c.has(d, "useMasterKey") && (f = {
                    useMasterKey: d.useMasterKey
                }), e.first(f).then(function(a) {
                    if (a) return a;
                    var c = new b.Error(b.Error.OBJECT_NOT_FOUND, "Object not found.");
                    return b.Promise.error(c)
                })._thenRunCallbacks(d, null)
            },
            toJSON: function() {
                var a = {
                    where: this._where
                };
                return this._include.length > 0 && (a.include = this._include.join(",")), this._select && (a.keys = this._select.join(",")), this._limit >= 0 && (a.limit = this._limit), this._skip > 0 && (a.skip = this._skip), void 0 !== this._order && (a.order = this._order.join(",")), b._objectEach(this._extraOptions, function(b, c) {
                    a[c] = b
                }), a
            },
            find: function(a) {
                var d = this;
                a = a || {};
                var e = b._request({
                    route: "classes",
                    className: this.className,
                    method: "GET",
                    useMasterKey: a.useMasterKey,
                    data: this.toJSON()
                });
                return e.then(function(a) {
                    return c.map(a.results, function(c) {
                        var e;
                        return e = a.className ? new b.Object(a.className) : new d.objectClass, e._finishFetch(c, !0), e
                    })
                })._thenRunCallbacks(a)
            },
            count: function(a) {
                var c = this;
                a = a || {};
                var d = this.toJSON();
                d.limit = 0, d.count = 1;
                var e = b._request({
                    route: "classes",
                    className: c.className,
                    method: "GET",
                    useMasterKey: a.useMasterKey,
                    data: d
                });
                return e.then(function(a) {
                    return a.count
                })._thenRunCallbacks(a)
            },
            first: function(a) {
                var d = this;
                a = a || {};
                var e = this.toJSON();
                e.limit = 1;
                var f = b._request({
                    route: "classes",
                    className: this.className,
                    method: "GET",
                    useMasterKey: a.useMasterKey,
                    data: e
                });
                return f.then(function(a) {
                    return c.map(a.results, function(c) {
                        var e;
                        console.log(c);
                        console.log(a);
                        return e = a.className ? new b.Object(a.className) : new d.objectClass, e._finishFetch(c, !0), e
                    })[0]
                })._thenRunCallbacks(a)
            },
            collection: function(a, d) {
                return d = d || {}, new b.Collection(a, c.extend(d, {
                    model: this.objectClass,
                    query: this
                }))
            },
            skip: function(a) {
                return this._skip = a, this
            },
            limit: function(a) {
                return this._limit = a, this
            },
            equalTo: function(a, d) {
                return c.isUndefined(d) ? this.doesNotExist(a) : (this._where[a] = b._encode(d), this)
            },
            _addCondition: function(a, c, d) {
                return this._where[a] || (this._where[a] = {}), this._where[a][c] = b._encode(d), this
            },
            notEqualTo: function(a, b) {
                return this._addCondition(a, "$ne", b), this
            },
            lessThan: function(a, b) {
                return this._addCondition(a, "$lt", b), this
            },
            greaterThan: function(a, b) {
                return this._addCondition(a, "$gt", b), this
            },
            lessThanOrEqualTo: function(a, b) {
                return this._addCondition(a, "$lte", b), this
            },
            greaterThanOrEqualTo: function(a, b) {
                return this._addCondition(a, "$gte", b), this
            },
            containedIn: function(a, b) {
                return this._addCondition(a, "$in", b), this
            },
            notContainedIn: function(a, b) {
                return this._addCondition(a, "$nin", b), this
            },
            containsAll: function(a, b) {
                return this._addCondition(a, "$all", b), this
            },
            exists: function(a) {
                return this._addCondition(a, "$exists", !0), this
            },
            doesNotExist: function(a) {
                return this._addCondition(a, "$exists", !1), this
            },
            matches: function(a, b, c) {
                return this._addCondition(a, "$regex", b), c || (c = ""), b.ignoreCase && (c += "i"), b.multiline && (c += "m"), c && c.length && this._addCondition(a, "$options", c), this
            },
            matchesQuery: function(a, b) {
                var c = b.toJSON();
                return c.className = b.className, this._addCondition(a, "$inQuery", c), this
            },
            doesNotMatchQuery: function(a, b) {
                var c = b.toJSON();
                return c.className = b.className, this._addCondition(a, "$notInQuery", c), this
            },
            matchesKeyInQuery: function(a, b, c) {
                var d = c.toJSON();
                return d.className = c.className, this._addCondition(a, "$select", {
                    key: b,
                    query: d
                }), this
            },
            doesNotMatchKeyInQuery: function(a, b, c) {
                var d = c.toJSON();
                return d.className = c.className, this._addCondition(a, "$dontSelect", {
                    key: b,
                    query: d
                }), this
            },
            _orQuery: function(a) {
                var b = c.map(a, function(a) {
                    return a.toJSON().where
                });
                return this._where.$or = b, this
            },
            _quote: function(a) {
                return "\\Q" + a.replace("\\E", "\\E\\\\E\\Q") + "\\E"
            },
            contains: function(a, b) {
                return this._addCondition(a, "$regex", this._quote(b)), this
            },
            startsWith: function(a, b) {
                return this._addCondition(a, "$regex", "^" + this._quote(b)), this
            },
            endsWith: function(a, b) {
                return this._addCondition(a, "$regex", this._quote(b) + "$"), this
            },
            ascending: function() {
                return this._order = [], this.addAscending.apply(this, arguments)
            },
            addAscending: function() {
                var a = this;
                return this._order || (this._order = []), b._arrayEach(arguments, function(b) {
                    Array.isArray(b) && (b = b.join()), a._order = a._order.concat(b.replace(/\s/g, "").split(","))
                }), this
            },
            descending: function() {
                return this._order = [], this.addDescending.apply(this, arguments)
            },
            addDescending: function() {
                var a = this;
                return this._order || (this._order = []), b._arrayEach(arguments, function(b) {
                    Array.isArray(b) && (b = b.join()), a._order = a._order.concat(c.map(b.replace(/\s/g, "").split(","), function(a) {
                        return "-" + a
                    }))
                }), this
            },
            near: function(a, c) {
                return c instanceof b.GeoPoint || (c = new b.GeoPoint(c)), this._addCondition(a, "$nearSphere", c), this
            },
            withinRadians: function(a, b, c) {
                return this.near(a, b), this._addCondition(a, "$maxDistance", c), this
            },
            withinMiles: function(a, b, c) {
                return this.withinRadians(a, b, c / 3958.8)
            },
            withinKilometers: function(a, b, c) {
                return this.withinRadians(a, b, c / 6371)
            },
            withinGeoBox: function(a, c, d) {
                return c instanceof b.GeoPoint || (c = new b.GeoPoint(c)), d instanceof b.GeoPoint || (d = new b.GeoPoint(d)), this._addCondition(a, "$within", {
                    $box: [c, d]
                }), this
            },
            include: function() {
                var a = this;
                return b._arrayEach(arguments, function(b) {
                    c.isArray(b) ? a._include = a._include.concat(b) : a._include.push(b)
                }), this
            },
            select: function() {
                var a = this;
                return this._select = this._select || [], b._arrayEach(arguments, function(b) {
                    c.isArray(b) ? a._select = a._select.concat(b) : a._select.push(b)
                }), this
            },
            each: function(a, d) {
                if (d = d || {}, this._order || this._skip || this._limit >= 0) {
                    var e = "Cannot iterate on a query with sort, skip, or limit.";
                    return b.Promise.error(e)._thenRunCallbacks(d)
                }
                new b.Promise;
                var f = new b.Query(this.objectClass);
                f._limit = d.batchSize || 100, f._where = c.clone(this._where), f._include = c.clone(this._include), f.ascending("objectId");
                var g = {};
                c.has(d, "useMasterKey") && (g.useMasterKey = d.useMasterKey);
                var h = !1;
                return b.Promise._continueWhile(function() {
                    return !h
                }, function() {
                    return f.find(g).then(function(c) {
                        var d = b.Promise.as();
                        return b._.each(c, function(b) {
                            d = d.then(function() {
                                return a(b)
                            })
                        }), d.then(function() {
                            c.length >= f._limit ? f.greaterThan("objectId", c[c.length - 1].id) : h = !0
                        })
                    })
                })._thenRunCallbacks(d)
            }
        }
    }(this),
    function(a) {
        a.Parse = a.Parse || {};
        var b, c, d = a.Parse,
            e = d._,
            f = !1,
            g = {
                authenticate: function(a) {
                    var c = this;
                    FB.login(function(b) {
                        b.authResponse ? a.success && a.success(c, {
                            id: b.authResponse.userID,
                            access_token: b.authResponse.accessToken,
                            expiration_date: new Date(1e3 * b.authResponse.expiresIn + (new Date).getTime()).toJSON()
                        }) : a.error && a.error(c, b)
                    }, {
                        scope: b
                    })
                },
                restoreAuthentication: function(a) {
                    if (a) {
                        var b = {
                                userID: a.id,
                                accessToken: a.access_token,
                                expiresIn: (d._parseDate(a.expiration_date).getTime() - (new Date).getTime()) / 1e3
                            },
                            f = e.clone(c);
                        f.authResponse = b, f.status = !1;
                        var g = FB.getAuthResponse();
                        g && g.userID !== b.userID && FB.logout(), FB.init(f)
                    }
                    return !0
                },
                getAuthType: function() {
                    return "facebook"
                },
                deauthenticate: function() {
                    this.restoreAuthentication(null)
                }
            };
        d.FacebookUtils = {
            init: function(a) {
                if ("undefined" == typeof FB) throw "The Facebook JavaScript SDK must be loaded before calling init.";
                if (c = e.clone(a) || {}, c.status && "undefined" != typeof console) {
                    var b = console.warn || console.log || function() {};
                    b.call(console, "The 'status' flag passed into FB.init, when set to true, can interfere with Parse Facebook integration, so it has been suppressed. Please call FB.getLoginStatus() explicitly if you require this behavior.")
                }
                c.status = !1, FB.init(c), d.User._registerAuthenticationProvider(g), f = !0
            },
            isLinked: function(a) {
                return a._isLinked("facebook")
            },
            logIn: function(a, c) {
                if (!a || e.isString(a)) {
                    if (!f) throw "You must initialize FacebookUtils before calling logIn.";
                    return b = a, d.User._logInWith("facebook", c)
                }
                var g = e.clone(c) || {};
                return g.authData = a, d.User._logInWith("facebook", g)
            },
            link: function(a, c, d) {
                if (!c || e.isString(c)) {
                    if (!f) throw "You must initialize FacebookUtils before calling link.";
                    return b = c, a._linkWith("facebook", d)
                }
                var g = e.clone(d) || {};
                return g.authData = c, a._linkWith("facebook", g)
            },
            unlink: function(a, b) {
                if (!f) throw "You must initialize FacebookUtils before calling unlink.";
                return a._unlinkFrom("facebook", b)
            }
        }
    }(this),
    function(a) {
        a.Parse = a.Parse || {};
        var b = a.Parse,
            c = b._;
        b.History = function() {
            this.handlers = [], c.bindAll(this, "checkUrl")
        };
        var d = /^[#\/]/,
            e = /msie [\w.]+/;
        b.History.started = !1, c.extend(b.History.prototype, b.Events, {
            interval: 50,
            getHash: function(a) {
                var b = a ? a.location : window.location,
                    c = b.href.match(/#(.*)$/);
                return c ? c[1] : ""
            },
            getFragment: function(a, c) {
                if (b._isNullOrUndefined(a))
                    if (this._hasPushState || c) {
                        a = window.location.pathname;
                        var e = window.location.search;
                        e && (a += e)
                    } else a = this.getHash();
                return a.indexOf(this.options.root) || (a = a.substr(this.options.root.length)), a.replace(d, "")
            },
            start: function(a) {
                if (b.History.started) throw new Error("Parse.history has already been started");
                b.History.started = !0, this.options = c.extend({}, {
                    root: "/"
                }, this.options, a), this._wantsHashChange = this.options.hashChange !== !1, this._wantsPushState = !!this.options.pushState, this._hasPushState = !!(this.options.pushState && window.history && window.history.pushState);
                var f = this.getFragment(),
                    g = document.documentMode,
                    h = e.exec(navigator.userAgent.toLowerCase()) && (!g || 7 >= g);
                h && (this.iframe = b.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow, this.navigate(f)), this._hasPushState ? b.$(window).bind("popstate", this.checkUrl) : this._wantsHashChange && "onhashchange" in window && !h ? b.$(window).bind("hashchange", this.checkUrl) : this._wantsHashChange && (this._checkUrlInterval = window.setInterval(this.checkUrl, this.interval)), this.fragment = f;
                var i = window.location,
                    j = i.pathname === this.options.root;
                return this._wantsHashChange && this._wantsPushState && !this._hasPushState && !j ? (this.fragment = this.getFragment(null, !0), window.location.replace(this.options.root + "#" + this.fragment), !0) : (this._wantsPushState && this._hasPushState && j && i.hash && (this.fragment = this.getHash().replace(d, ""), window.history.replaceState({}, document.title, i.protocol + "//" + i.host + this.options.root + this.fragment)), this.options.silent ? void 0 : this.loadUrl())
            },
            stop: function() {
                b.$(window).unbind("popstate", this.checkUrl).unbind("hashchange", this.checkUrl), window.clearInterval(this._checkUrlInterval), b.History.started = !1
            },
            route: function(a, b) {
                this.handlers.unshift({
                    route: a,
                    callback: b
                })
            },
            checkUrl: function() {
                var a = this.getFragment();
                return a === this.fragment && this.iframe && (a = this.getFragment(this.getHash(this.iframe))), a === this.fragment ? !1 : (this.iframe && this.navigate(a), this.loadUrl() || this.loadUrl(this.getHash()), void 0)
            },
            loadUrl: function(a) {
                var b = this.fragment = this.getFragment(a),
                    d = c.any(this.handlers, function(a) {
                        return a.route.test(b) ? (a.callback(b), !0) : void 0
                    });
                return d
            },
            navigate: function(a, c) {
                if (!b.History.started) return !1;
                c && c !== !0 || (c = {
                    trigger: c
                });
                var e = (a || "").replace(d, "");
                if (this.fragment !== e) {
                    if (this._hasPushState) {
                        0 !== e.indexOf(this.options.root) && (e = this.options.root + e), this.fragment = e;
                        var f = c.replace ? "replaceState" : "pushState";
                        window.history[f]({}, document.title, e)
                    } else this._wantsHashChange ? (this.fragment = e, this._updateHash(window.location, e, c.replace), this.iframe && e !== this.getFragment(this.getHash(this.iframe)) && (c.replace || this.iframe.document.open().close(), this._updateHash(this.iframe.location, e, c.replace))) : window.location.assign(this.options.root + a);
                    c.trigger && this.loadUrl(a)
                }
            },
            _updateHash: function(a, b, c) {
                if (c) {
                    var d = a.toString().replace(/(javascript:|#).*$/, "");
                    a.replace(d + "#" + b)
                } else a.hash = b
            }
        })
    }(this),
    function(a) {
        a.Parse = a.Parse || {};
        var b = a.Parse,
            c = b._;
        b.Router = function(a) {
            a = a || {}, a.routes && (this.routes = a.routes), this._bindRoutes(), this.initialize.apply(this, arguments)
        };
        var d = /:\w+/g,
            e = /\*\w+/g,
            f = /[\-\[\]{}()+?.,\\\^\$\|#\s]/g;
        c.extend(b.Router.prototype, b.Events, {
            initialize: function() {},
            route: function(a, d, e) {
                return b.history = b.history || new b.History, c.isRegExp(a) || (a = this._routeToRegExp(a)), e || (e = this[d]), b.history.route(a, c.bind(function(c) {
                    var f = this._extractParameters(a, c);
                    e && e.apply(this, f), this.trigger.apply(this, ["route:" + d].concat(f)), b.history.trigger("route", this, d, f)
                }, this)), this
            },
            navigate: function(a, c) {
                b.history.navigate(a, c)
            },
            _bindRoutes: function() {
                if (this.routes) {
                    var a = [];
                    for (var b in this.routes) this.routes.hasOwnProperty(b) && a.unshift([b, this.routes[b]]);
                    for (var c = 0, d = a.length; d > c; c++) this.route(a[c][0], a[c][1], this[a[c][1]])
                }
            },
            _routeToRegExp: function(a) {
                return a = a.replace(f, "\\$&").replace(d, "([^/]+)").replace(e, "(.*?)"), new RegExp("^" + a + "$")
            },
            _extractParameters: function(a, b) {
                return a.exec(b).slice(1)
            }
        }), b.Router.extend = b._extend
    }(this),
    function(a) {
        a.Parse = a.Parse || {};
        var b = a.Parse,
            c = b._;
        b.Cloud = b.Cloud || {}, c.extend(b.Cloud, {
            run: function(a, c, d) {
                d = d || {};
                var e = b._request({
                    route: "functions",
                    className: a,
                    method: "POST",
                    useMasterKey: d.useMasterKey,
                    data: b._encode(c, null, !0)
                });
                return e.then(function(a) {
                    return b._decode(null, a).result
                })._thenRunCallbacks(d)
            }
        })
    }(this),
    function(a) {
        a.Parse = a.Parse || {};
        var b = a.Parse;
        b.Installation = b.Object.extend("_Installation"), b.Push = b.Push || {}, b.Push.send = function(a, c) {
            if (c = c || {}, a.where && (a.where = a.where.toJSON().where), a.push_time && (a.push_time = a.push_time.toJSON()), a.expiration_time && (a.expiration_time = a.expiration_time.toJSON()), a.expiration_time && a.expiration_interval) throw "Both expiration_time and expiration_interval can't be set";
            var d = b._request({
                route: "push",
                method: "POST",
                data: a,
                useMasterKey: c.useMasterKey
            });
            return d._thenRunCallbacks(c)
        }
    }(this);