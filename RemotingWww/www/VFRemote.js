/*
 * This code is for Internal Salesforce use only, and subject to change without notice.
 * Customers shouldn't reference this file in any web pages.
 */
window.undefined = window.undefined;
VFExt3 = {
    version: "3.2.2",
    versionDetail: {
        major: 3,
        minor: 2,
        patch: 2
    },
    apply: function(d, e, c) {
        c && VFExt3.apply(d, c);
        if (d && e && "object" == typeof e)
            for (var b in e) d[b] = e[b];
        return d
    }
};
(function() {
    var d = 0,
        e = Object.prototype.toString,
        c = navigator.userAgent.toLowerCase(),
        b = function(a) {
            return a.test(c)
        },
        a = document,
        g = "CSS1Compat" == a.compatMode,
        k = b(/opera/),
        h = b(/\bchrome\b/),
        q = b(/webkit/),
        f = !h && b(/safari/),
        m = f && b(/applewebkit\/4/),
        l = f && b(/version\/3/),
        n = f && b(/version\/4/),
        p = !k && b(/msie/),
        s = p && b(/msie 7/),
        t = p && b(/msie 8/),
        v = p && !s && !t,
        r = !q && b(/gecko/),
        u = r && b(/rv:1\.8/),
        x = r && b(/rv:1\.9/),
        y = p && !g,
        B = b(/windows|win32/),
        z = b(/macintosh|mac os x/),
        A = b(/adobeair/),
        b = b(/linux/),
        w = /^https/i.test(window.location.protocol);
    if (v) try {
        a.execCommand("BackgroundImageCache", !1, !0)
    } catch (C) {}
    VFExt3.apply(VFExt3, {
        SSL_SECURE_URL: w && p ? 'javascript:""' : "about:blank",
        isStrict: g,
        isSecure: w,
        isReady: !1,
        enableGarbageCollector: !0,
        enableListenerCollection: !1,
        enableNestedListenerRemoval: !1,
        USE_NATIVE_JSON: !1,
        applyIf: function(a, b) {
            if (a)
                for (var f in b) VFExt3.isDefined(a[f]) || (a[f] = b[f]);
            return a
        },
        id: function(a, b) {
            a = VFExt3.getDom(a, !0) || {};
            a.id || (a.id = (b || "ext-gen") + ++d);
            return a.id
        },
        extend: function() {
            var a = function(a) {
                    for (var b in a) this[b] =
                        a[b]
                },
                b = Object.prototype.constructor;
            return function(f, c, d) {
                "object" == typeof c && (d = c, c = f, f = d.constructor != b ? d.constructor : function() {
                    c.apply(this, arguments)
                });
                var h = function() {},
                    m = c.prototype;
                h.prototype = m;
                h = f.prototype = new h;
                h.constructor = f;
                f.superclass = m;
                m.constructor == b && (m.constructor = c);
                f.override = function(a) {
                    VFExt3.override(f, a)
                };
                h.superclass = h.supr = function() {
                    return m
                };
                h.override = a;
                VFExt3.override(f, d);
                f.extend = function(a) {
                    return VFExt3.extend(f, a)
                };
                return f
            }
        }(),
        override: function(a, b) {
            if (b) {
                var f =
                    a.prototype;
                VFExt3.apply(f, b);
                VFExt3.isIE && b.hasOwnProperty("toString") && (f.toString = b.toString)
            }
        },
        namespace: function() {
            var a, b;
            VFExt3.each(arguments, function(f) {
                b = f.split(".");
                a = window[b[0]] = window[b[0]] || {};
                VFExt3.each(b.slice(1), function(b) {
                    a = a[b] = a[b] || {}
                })
            });
            return a
        },
        urlEncode: function(a, b) {
            var f, c = [],
                d = encodeURIComponent;
            VFExt3.iterate(a, function(a, b) {
                f = VFExt3.isEmpty(b);
                VFExt3.each(f ? a : b, function(b) {
                    c.push("\x26", d(a), "\x3d", !VFExt3.isEmpty(b) && (b != a || !f) ? VFExt3.isDate(b) ? VFExt3.encode(b).replace(/"/g,
                        "") : d(b) : "")
                })
            });
            b || (c.shift(), b = "");
            return b + c.join("")
        },
        urlDecode: function(a, b) {
            if (VFExt3.isEmpty(a)) return {};
            var f = {},
                c = a.split("\x26"),
                d = decodeURIComponent,
                h, m;
            VFExt3.each(c, function(a) {
                a = a.split("\x3d");
                h = d(a[0]);
                m = d(a[1]);
                f[h] = b || !f[h] ? m : [].concat(f[h]).concat(m)
            });
            return f
        },
        urlAppend: function(a, b) {
            return !VFExt3.isEmpty(b) ? a + (-1 === a.indexOf("?") ? "?" : "\x26") + b : a
        },
        toArray: function() {
            return p ? function(a, b, f, c) {
                c = [];
                for (var d = 0, h = a.length; d < h; d++) c.push(a[d]);
                return c.slice(b || 0, f || c.length)
            } : function(a,
                b, f) {
                return Array.prototype.slice.call(a, b || 0, f || a.length)
            }
        }(),
        isIterable: function(a) {
            return VFExt3.isArray(a) || a.callee || /NodeList|HTMLCollection/.test(e.call(a)) ? !0 : ("undefined" != typeof a.nextNode || a.item) && VFExt3.isNumber(a.length)
        },
        each: function(a, b, f) {
            if (!VFExt3.isEmpty(a, !0)) {
                if (!VFExt3.isIterable(a) || VFExt3.isPrimitive(a)) a = [a];
                for (var c = 0, d = a.length; c < d; c++)
                    if (!1 === b.call(f || a[c], a[c], c, a)) return c
            }
        },
        iterate: function(a, b, f) {
            if (!VFExt3.isEmpty(a))
                if (VFExt3.isIterable(a)) VFExt3.each(a, b, f);
                else if ("object" == typeof a)
                for (var c in a)
                    if (a.hasOwnProperty(c) && !1 === b.call(f || a, c, a[c], a)) break
        },
        getDom: function(b, f) {
            if (!b || !a) return null;
            if (b.dom) return b.dom;
            if ("string" == typeof b) {
                var c = a.getElementById(b);
                return c && (p && f) && b != c.getAttribute("id") ? null : c
            }
            return b
        },
        getBody: function() {
            return VFExt3.get(a.body || a.documentElement)
        },
        getHead: function() {
            var b;
            return function() {
                void 0 == b && (b = VFExt3.get(a.getElementsByTagName("head")[0]));
                return b
            }
        }(),
        removeNode: p && !t ? function() {
            var b;
            return function(f) {
                f &&
                    "BODY" != f.tagName && (VFExt3.enableNestedListenerRemoval ? VFExt3.EventManager.purgeElement(f, !0) : VFExt3.EventManager.removeAll(f), b = b || a.createElement("div"), b.appendChild(f), b.innerHTML = "", delete VFExt3.elCache[f.id])
            }
        }() : function(a) {
            a && (a.parentNode && "BODY" != a.tagName) && (VFExt3.enableNestedListenerRemoval ? VFExt3.EventManager.purgeElement(a, !0) : VFExt3.EventManager.removeAll(a), a.parentNode.removeChild(a), delete VFExt3.elCache[a.id])
        },
        isEmpty: function(a, b) {
            return null === a || void 0 === a || VFExt3.isArray(a) &&
                !a.length || (!b ? "" === a : !1)
        },
        isArray: function(a) {
            return "[object Array]" === e.apply(a)
        },
        isDate: function(a) {
            return "[object Date]" === e.apply(a)
        },
        isObject: function(a) {
            return !!a && "[object Object]" === Object.prototype.toString.call(a)
        },
        isPrimitive: function(a) {
            return VFExt3.isString(a) || VFExt3.isNumber(a) || VFExt3.isBoolean(a)
        },
        isFunction: function(a) {
            return "[object Function]" === e.apply(a)
        },
        isNumber: function(a) {
            return "number" === typeof a && isFinite(a)
        },
        isString: function(a) {
            return "string" === typeof a
        },
        isBoolean: function(a) {
            return "boolean" ===
                typeof a
        },
        isElement: function(a) {
            return a ? !!a.tagName : !1
        },
        isDefined: function(a) {
            return "undefined" !== typeof a
        },
        isOpera: k,
        isWebKit: q,
        isChrome: h,
        isSafari: f,
        isSafari3: l,
        isSafari4: n,
        isSafari2: m,
        isIE: p,
        isIE6: v,
        isIE7: s,
        isIE8: t,
        isGecko: r,
        isGecko2: u,
        isGecko3: x,
        isBorderBox: y,
        isLinux: b,
        isWindows: B,
        isMac: z,
        isAir: A,
        IE: {
            addEvent: function(a, b, f, c) {
                a.attachEvent ? a.attachEvent(b, f) : a.addEventListener && a.addEventListener(b, f, c)
            },
            removeEvent: function(a, b, f, c) {
                a.detachEvent ? a.detachEvent(b, f) : a.removeEventListener && a.removeEventListener(b,
                    f, c)
            }
        }
    });
    VFExt3.ns = VFExt3.namespace
})();
VFExt3.ns("VFExt3.util", "VFExt3.lib", "VFExt3.data");
VFExt3.elCache = {};
VFExt3.apply(Function.prototype, {
    createInterceptor: function(d, e) {
        var c = this;
        return !VFExt3.isFunction(d) ? this : function() {
            var b = arguments;
            d.target = this;
            d.method = c;
            return !1 !== d.apply(e || this || window, b) ? c.apply(this || window, b) : null
        }
    },
    createCallback: function() {
        var d = arguments,
            e = this;
        return function() {
            return e.apply(window, d)
        }
    },
    createDelegate: function(d, e, c) {
        var b = this;
        return function() {
            var a = e || arguments;
            if (!0 === c) a = Array.prototype.slice.call(arguments, 0), a = a.concat(e);
            else if (VFExt3.isNumber(c)) {
                var a =
                    Array.prototype.slice.call(arguments, 0),
                    g = [c, 0].concat(e);
                Array.prototype.splice.apply(a, g)
            }
            return b.apply(d || window, a)
        }
    },
    defer: function(d, e, c, b) {
        e = this.createDelegate(e, c, b);
        if (0 < d) return setTimeout(e, d);
        e();
        return 0
    }
});
VFExt3.applyIf(String, {
    format: function(d) {
        var e = VFExt3.toArray(arguments, 1);
        return d.replace(/\{(\d+)\}/g, function(c, b) {
            return e[b]
        })
    }
});
VFExt3.applyIf(Array.prototype, {
    indexOf: function(d, e) {
        var c = this.length;
        e = e || 0;
        for (e += 0 > e ? c : 0; e < c; ++e)
            if (this[e] === d) return e;
        return -1
    },
    remove: function(d) {
        d = this.indexOf(d); - 1 != d && this.splice(d, 1);
        return this
    }
});
VFExt3.ns("VFExt3.grid", "VFExt3.list", "VFExt3.dd", "VFExt3.tree", "VFExt3.form", "VFExt3.menu", "VFExt3.state", "VFExt3.layout", "VFExt3.app", "VFExt3.ux", "VFExt3.chart", "VFExt3.direct");
VFExt3.apply(VFExt3, function() {
    var d = VFExt3,
        e = null;
    return {
        emptyFn: function() {},
        BLANK_IMAGE_URL: VFExt3.isIE6 || VFExt3.isIE7 || VFExt3.isAir ? "http://www.extjs.com/s.gif" : "data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw\x3d\x3d",
        extendX: function(c, b) {
            return VFExt3.extend(c, b(c.prototype))
        },
        getDoc: function() {
            return VFExt3.get(document)
        },
        num: function(c, b) {
            c = Number(VFExt3.isEmpty(c) || VFExt3.isArray(c) || "boolean" == typeof c || "string" == typeof c && 0 == c.trim().length ? NaN : c);
            return isNaN(c) ?
                b : c
        },
        value: function(c, b, a) {
            return VFExt3.isEmpty(c, a) ? b : c
        },
        escapeRe: function(c) {
            return c.replace(/([-.*+?^${}()|[\]\/\\])/g, "\\$1")
        },
        sequence: function(c, b, a, d) {
            c[b] = c[b].createSequence(a, d)
        },
        addBehaviors: function(c) {
            if (VFExt3.isReady) {
                var b = {},
                    a, d, e;
                for (d in c)
                    if ((a = d.split("@"))[1]) e = a[0], b[e] || (b[e] = VFExt3.select(e)), b[e].on(a[1], c[d]);
                b = null
            } else VFExt3.onReady(function() {
                VFExt3.addBehaviors(c)
            })
        },
        getScrollBarWidth: function(c) {
            if (!VFExt3.isReady) return 0;
            if (!0 === c || null === e) {
                c = VFExt3.getBody().createChild('\x3cdiv class\x3d"x-hide-offsets" style\x3d"width:100px;height:50px;overflow:hidden;"\x3e\x3cdiv style\x3d"height:200px;"\x3e\x3c/div\x3e\x3c/div\x3e');
                var b = c.child("div", !0),
                    a = b.offsetWidth;
                c.setStyle("overflow", VFExt3.isWebKit || VFExt3.isGecko ? "auto" : "scroll");
                b = b.offsetWidth;
                c.remove();
                e = a - b + 2
            }
            return e
        },
        combine: function() {
            for (var c = arguments, b = c.length, a = [], d = 0; d < b; d++) {
                var e = c[d];
                VFExt3.isArray(e) ? a = a.concat(e) : void 0 !== e.length && !e.substr ? a = a.concat(Array.prototype.slice.call(e, 0)) : a.push(e)
            }
            return a
        },
        copyTo: function(c, b, a) {
            "string" == typeof a && (a = a.split(/[,;\s]/));
            VFExt3.each(a, function(a) {
                b.hasOwnProperty(a) && (c[a] = b[a])
            }, this);
            return c
        },
        destroy: function() {
            VFExt3.each(arguments, function(c) {
                c && (VFExt3.isArray(c) ? this.destroy.apply(this, c) : "function" == typeof c.destroy ? c.destroy() : c.dom && c.remove())
            }, this)
        },
        destroyMembers: function(c, b, a, d) {
            for (var e = 1, h = arguments, q = h.length; e < q; e++) VFExt3.destroy(c[h[e]]), delete c[h[e]]
        },
        clean: function(c) {
            var b = [];
            VFExt3.each(c, function(a) {
                a && b.push(a)
            });
            return b
        },
        unique: function(c) {
            var b = [],
                a = {};
            VFExt3.each(c, function(c) {
                a[c] || b.push(c);
                a[c] = !0
            });
            return b
        },
        flatten: function(c) {
            function b(c) {
                VFExt3.each(c,
                    function(c) {
                        VFExt3.isArray(c) ? b(c) : a.push(c)
                    });
                return a
            }
            var a = [];
            return b(c)
        },
        min: function(c, b) {
            var a = c[0];
            b = b || function(a, b) {
                return a < b ? -1 : 1
            };
            VFExt3.each(c, function(c) {
                a = -1 == b(a, c) ? a : c
            });
            return a
        },
        max: function(c, b) {
            var a = c[0];
            b = b || function(a, b) {
                return a > b ? 1 : -1
            };
            VFExt3.each(c, function(c) {
                a = 1 == b(a, c) ? a : c
            });
            return a
        },
        mean: function(c) {
            return 0 < c.length ? VFExt3.sum(c) / c.length : void 0
        },
        sum: function(c) {
            var b = 0;
            VFExt3.each(c, function(a) {
                b += a
            });
            return b
        },
        partition: function(c, b) {
            var a = [
                [],
                []
            ];
            VFExt3.each(c,
                function(c, d, h) {
                    a[b && b(c, d, h) || !b && c ? 0 : 1].push(c)
                });
            return a
        },
        invoke: function(c, b) {
            var a = [],
                d = Array.prototype.slice.call(arguments, 2);
            VFExt3.each(c, function(c, h) {
                c && "function" == typeof c[b] ? a.push(c[b].apply(c, d)) : a.push(void 0)
            });
            return a
        },
        pluck: function(c, b) {
            var a = [];
            VFExt3.each(c, function(c) {
                a.push(c[b])
            });
            return a
        },
        zip: function() {
            for (var c = VFExt3.partition(arguments, function(a) {
                    return "function" != typeof a
                }), b = c[0], c = c[1][0], a = VFExt3.max(VFExt3.pluck(b, "length")), d = [], e = 0; e < a; e++)
                if (d[e] = [], c) d[e] =
                    c.apply(c, VFExt3.pluck(b, e));
                else
                    for (var h = 0, q = b.length; h < q; h++) d[e].push(b[h][e]);
            return d
        },
        getCmp: function(c) {
            return VFExt3.ComponentMgr.get(c)
        },
        useShims: d.isIE6 || d.isMac && d.isGecko2,
        type: function(c) {
            if (void 0 === c || null === c) return !1;
            if (c.htmlElement) return "element";
            var b = typeof c;
            if ("object" == b && c.nodeName) switch (c.nodeType) {
                case 1:
                    return "element";
                case 3:
                    return /\S/.test(c.nodeValue) ? "textnode" : "whitespace"
            }
            if ("object" == b || "function" == b) {
                switch (c.constructor) {
                    case Array:
                        return "array";
                    case RegExp:
                        return "regexp";
                    case Date:
                        return "date"
                }
                if ("number" == typeof c.length && "function" == typeof c.item) return "nodelist"
            }
            return b
        },
        intercept: function(c, b, a, d) {
            c[b] = c[b].createInterceptor(a, d)
        },
        callback: function(c, b, a, d) {
            "function" == typeof c && (d ? c.defer(d, b, a || []) : c.apply(b, a || []))
        }
    }
}());
VFExt3.apply(Function.prototype, {
    createSequence: function(d, e) {
        var c = this;
        return "function" != typeof d ? this : function() {
            var b = c.apply(this || window, arguments);
            d.apply(e || this || window, arguments);
            return b
        }
    }
});
VFExt3.applyIf(String, {
    escape: function(d) {
        return d.replace(/('|\\)/g, "\\$1")
    },
    leftPad: function(d, e, c) {
        d = String(d);
        for (c || (c = " "); d.length < e;) d = c + d;
        return d
    }
});
String.prototype.toggle = function(d, e) {
    return this == d ? e : d
};
String.prototype.trim = function() {
    var d = /^\s+|\s+$/g;
    return function() {
        return this.replace(d, "")
    }
}();
Date.prototype.getElapsed = function(d) {
    return Math.abs((d || new Date).getTime() - this.getTime())
};
VFExt3.applyIf(Number.prototype, {
    constrain: function(d, e) {
        return Math.min(Math.max(this, d), e)
    }
});
(function() {
    VFExt3.lib.Event = function() {
        function d(a) {
            var b;
            a: {
                b = a.currentTarget;a = u.getRelatedTarget(a);
                if (b && b.firstChild)
                    for (; a;) {
                        if (a === b) {
                            b = !0;
                            break a
                        }(a = a.parentNode) && 1 != a.nodeType && (a = null)
                    }
                b = !1
            }
            return !b
        }

        function c() {
            var a = !1,
                c = [],
                d, e, l, k = !g || 0 < h;
            if (!m) {
                m = !0;
                for (a = 0; a < q.length; ++a)
                    if ((e = q[a]) && (d = n.getElementById(e.id))) !e.checkReady || g || d.nextSibling || n && n.body ? (d = (l = e.override) ? !0 === l ? e.obj : l : d, e.fn.call(d, e.obj), q.remove(e), --a) : c.push(e);
                h = 0 === c.length ? 0 : h - 1;
                k ? b() : (clearInterval(f), f =
                    null);
                a = !(m = !1)
            }
            return a
        }

        function b() {
            f || (f = setInterval(function() {
                c()
            }, p))
        }

        function a(a, b) {
            a = a.browserEvent || a;
            var c = a["page" + b];
            if (!c && 0 !== c && (c = a["client" + b] || 0, VFExt3.isIE)) var f = n.documentElement,
                d = n.body,
                c = c + (f && (f[t] || f[s]) ? [f[s], f[t]] : d ? [d[s], d[t]] : [0, 0])["X" == b ? 0 : 1];
            return c
        }
        var g = !1,
            k = {},
            h = 0,
            q = [],
            f, m = !1,
            l = window,
            n = document,
            p = 20,
            s = "scrollLeft",
            t = "scrollTop",
            v = function() {
                return l.addEventListener ? function(a, b, c, f) {
                    "mouseenter" == b ? (c = c.createInterceptor(d), a.addEventListener("mouseover", c,
                        f)) : "mouseleave" == b ? (c = c.createInterceptor(d), a.addEventListener("mouseout", c, f)) : a.addEventListener(b, c, f);
                    return c
                } : l.attachEvent ? function(a, b, c, f) {
                    a.attachEvent("on" + b, c);
                    return c
                } : function() {}
            }(),
            r = function() {
                return l.removeEventListener ? function(a, b, c, f) {
                    "mouseenter" == b ? b = "mouseover" : "mouseleave" == b && (b = "mouseout");
                    a.removeEventListener(b, c, f)
                } : l.detachEvent ? function(a, b, c) {
                    a.detachEvent("on" + b, c)
                } : function() {}
            }(),
            u = {
                extAdapter: !0,
                onAvailable: function(a, c, f, d) {
                    q.push({
                        id: a,
                        fn: c,
                        obj: f,
                        override: d,
                        checkReady: !1
                    });
                    h = 200;
                    b()
                },
                addListener: function(a, b, c) {
                    return (a = VFExt3.getDom(a)) && c ? "unload" == b ? (void 0 === k[a.id] && (k[a.id] = []), k[a.id].push([b, c]), c) : v(a, b, c, !1) : !1
                },
                removeListener: function(a, b, c) {
                    a = VFExt3.getDom(a);
                    var f, d, h, m;
                    if (a && c)
                        if ("unload" == b) {
                            if (void 0 !== (m = k[a.id])) {
                                f = 0;
                                for (d = m.length; f < d; f++)(h = m[f]) && (h[0] == b && h[1] == c) && k[a.id].splice(f, 1)
                            }
                        } else r(a, b, c, !1)
                },
                getTarget: function(a) {
                    a = a.browserEvent || a;
                    return this.resolveTextNode(a.target || a.srcElement)
                },
                resolveTextNode: VFExt3.isGecko ?
                    function(a) {
                        if (a) {
                            var b = HTMLElement.prototype.toString.call(a);
                            if (!("[xpconnect wrapped native prototype]" == b || "[object XULElement]" == b)) return 3 == a.nodeType ? a.parentNode : a
                        }
                    } : function(a) {
                        return a && 3 == a.nodeType ? a.parentNode : a
                    },
                getRelatedTarget: function(a) {
                    a = a.browserEvent || a;
                    return this.resolveTextNode(a.relatedTarget || (/(mouseout|mouseleave)/.test(a.type) ? a.toElement : /(mouseover|mouseenter)/.test(a.type) ? a.fromElement : null))
                },
                getPageX: function(b) {
                    return a(b, "X")
                },
                getPageY: function(b) {
                    return a(b,
                        "Y")
                },
                getXY: function(a) {
                    return [this.getPageX(a), this.getPageY(a)]
                },
                stopEvent: function(a) {
                    this.stopPropagation(a);
                    this.preventDefault(a)
                },
                stopPropagation: function(a) {
                    a = a.browserEvent || a;
                    a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0
                },
                preventDefault: function(a) {
                    a = a.browserEvent || a;
                    a.preventDefault ? a.preventDefault() : a.returnValue = !1
                },
                getEvent: function(a) {
                    a = a || l.event;
                    if (!a)
                        for (var b = this.getEvent.caller; b && !((a = b.arguments[0]) && Event == a.constructor);) b = b.caller;
                    return a
                },
                getCharCode: function(a) {
                    a =
                        a.browserEvent || a;
                    return a.charCode || a.keyCode || 0
                },
                getListeners: function(a, b) {
                    VFExt3.EventManager.getListeners(a, b)
                },
                purgeElement: function(a, b, c) {
                    VFExt3.EventManager.purgeElement(a, b, c)
                },
                _load: function(a) {
                    g = !0;
                    VFExt3.isIE && !0 !== a && r(l, "load", arguments.callee)
                },
                _unload: function(a) {
                    var b = VFExt3.lib.Event,
                        c, f, d, h, m, e;
                    for (h in k) {
                        d = k[h];
                        c = 0;
                        for (m = d.length; c < m; c++)
                            if (f = d[c]) try {
                                e = f[3] ? !0 === f[3] ? f[2] : f[3] : l, f[1].call(e, b.getEvent(a), f[2])
                            } catch (q) {}
                    }
                    VFExt3.EventManager._unload();
                    r(l, "unload", b._unload)
                }
            };
        u.on = u.addListener;
        u.un = u.removeListener;
        n && n.body ? u._load(!0) : v(l, "load", u._load);
        v(l, "unload", u._unload);
        c();
        return u
    }();
    VFExt3.lib.Ajax = function() {
        function d(a) {
            function b(a, f) {
                for (c in f) f.hasOwnProperty(c) && a.setRequestHeader(c, f[c])
            }
            a = a.conn;
            var c;
            h.defaultHeaders && b(a, h.defaultHeaders);
            h.headers && (b(a, h.headers), delete h.headers)
        }

        function c(a, b) {
            (h.headers = h.headers || {})[a] = b
        }

        function b(a, b) {
            var c = {},
                d, h = a.conn,
                e, g, k = 1223 == h.status;
            try {
                d = a.conn.getAllResponseHeaders(), VFExt3.each(d.replace(/\r\n/g,
                    "\n").split("\n"), function(a) {
                    e = a.indexOf(":");
                    0 <= e && (g = a.substr(0, e).toLowerCase(), " " == a.charAt(e + 1) && ++e, c[g] = a.substr(e + 1))
                })
            } catch (v) {}
            return {
                tId: a.tId,
                status: k ? 204 : h.status,
                statusText: k ? "No Content" : h.statusText,
                getResponseHeader: function(a) {
                    return c[a.toLowerCase()]
                },
                getAllResponseHeaders: function() {
                    return d
                },
                responseText: h.responseText,
                responseXML: h.responseXML,
                argument: b
            }
        }

        function a(a, c, d, e) {
            if (c) {
                var g;
                try {
                    g = void 0 !== a.conn.status && 0 != a.conn.status ? a.conn.status : 13030
                } catch (k) {
                    g = 13030
                }
                if (200 <=
                    g && 300 > g || VFExt3.isIE && 1223 == g) e = b(a, c.argument), c.success && (c.scope ? c.success.apply(c.scope, [e]) : c.success(e));
                else switch (g) {
                    case 12002:
                    case 12029:
                    case 12030:
                    case 12031:
                    case 12152:
                    case 13030:
                        g = (d = d ? d : !1) ? "transaction aborted" : "communication failure";
                        e && (g += ": timeout");
                        e = {
                            tId: a.tId,
                            status: d ? -1 : 0,
                            statusText: g,
                            isAbort: d,
                            isTimeout: e,
                            argument: c.argument
                        };
                        c.failure && (c.scope ? c.failure.apply(c.scope, [e]) : c.failure(e));
                        break;
                    default:
                        e = b(a, c.argument), c.failure && (c.scope ? c.failure.apply(c.scope, [e]) : c.failure(e))
                }
            }
            a.tId &&
                (h.conn[a.tId] = null);
            a.conn = null
        }

        function g(b, c) {
            c = c || {};
            var d = b.conn,
                e = b.tId,
                g = h.poll,
                k = c.timeout || null;
            k && (h.conn[e] = d, h.timeout[e] = setTimeout(function() {
                h.abort(b, c, !0)
            }, k));
            g[e] = setInterval(function() {
                d && 4 == d.readyState && (clearInterval(g[e]), g[e] = null, k && (clearTimeout(h.timeout[e]), h.timeout[e] = null), a(b, c))
            }, h.pollInterval)
        }
        var k = ["MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"],
            h = {
                request: function(a, b, m, l, n) {
                    if (n) {
                        var p = n.xmlData,
                            s = n.jsonData;
                        VFExt3.applyIf(this, n);
                        if (p || s) {
                            l = this.headers;
                            if (!l || !l["Content-Type"]) c("Content-Type", p ? "text/xml" : "application/json");
                            l = p || (!VFExt3.isPrimitive(s) ? VFExt3.encode(s) : s)
                        }
                    }
                    a = a || n.method || "POST";
                    a: {
                        var t;
                        try {
                            var v;
                            b: {
                                var r = h.transactionId,
                                    u;
                                try {
                                    u = new XMLHttpRequest
                                } catch (x) {
                                    for (n = 0; n < k.length; ++n) try {
                                        u = new ActiveXObject(k[n]);
                                        break
                                    } catch (y) {}
                                } finally {
                                    v = {
                                        conn: u,
                                        tId: r
                                    };
                                    break b
                                }
                            }(t = v) && h.transactionId++
                        } catch (B) {} finally {
                            break a
                        }
                    }
                    if (t = t || null) t.conn.open(a, b, !0), h.useDefaultXhrHeader && c("X-Requested-With", h.defaultXhrHeader), l && (h.useDefaultHeader &&
                        (!h.headers || !h.headers["Content-Type"])) && c("Content-Type", h.defaultPostHeader), (h.defaultHeaders || h.headers) && d(t), g(t, m), t.conn.send(l || null);
                    return t
                },
                serializeForm: function(a) {
                    a = a.elements || (document.forms[a] || VFExt3.getDom(a)).elements;
                    var b = !1,
                        c = encodeURIComponent,
                        d, h = "",
                        e;
                    VFExt3.each(a, function(a) {
                        d = a.name;
                        e = a.type;
                        if (!a.disabled && d)
                            if (/select-(one|multiple)/i.test(e)) VFExt3.each(a.options, function(a) {
                                a.selected && (h += String.format("{0}\x3d{1}\x26", c(d), c((a.hasAttribute ? a.hasAttribute("value") :
                                    null !== a.getAttribute("value")) ? a.value : a.text)))
                            });
                            else if (!/file|undefined|reset|button/i.test(e) && (!/radio|checkbox/i.test(e) || a.checked) && !("submit" == e && b)) h += c(d) + "\x3d" + c(a.value) + "\x26", b = /submit/i.test(e)
                    });
                    return h.substr(0, h.length - 1)
                },
                useDefaultHeader: !0,
                defaultPostHeader: "application/x-www-form-urlencoded; charset\x3dUTF-8",
                useDefaultXhrHeader: !0,
                defaultXhrHeader: "XMLHttpRequest",
                poll: {},
                timeout: {},
                conn: {},
                pollInterval: 50,
                transactionId: 0,
                abort: function(b, c, d) {
                    var e = b.tId,
                        g = !1;
                    this.isCallInProgress(b) &&
                        (b.conn.abort(), clearInterval(this.poll[e]), this.poll[e] = null, clearTimeout(h.timeout[e]), this.timeout[e] = null, a(b, c, g = !0, d));
                    return g
                },
                isCallInProgress: function(a) {
                    return a.conn && !{
                        0: !0,
                        4: !0
                    } [a.conn.readyState]
                }
            };
        return h
    }();
    if (VFExt3.isIE) {
        var d = function() {
            var e = Function.prototype;
            delete e.createSequence;
            delete e.defer;
            delete e.createDelegate;
            delete e.createCallback;
            delete e.createInterceptor;
            VFExt3.IE.removeEvent(window, "onunload", d)
        };
        VFExt3.IE.addEvent(window, "onunload", d)
    }
})();
(function() {
    function d(a, b, c) {
        return function() {
            b.target == arguments[0] && a.apply(c, Array.prototype.slice.call(arguments, 0))
        }
    }

    function e(b, c, d, e) {
        d.task = new a.DelayedTask;
        return function() {
            d.task.delay(c.buffer, b, e, Array.prototype.slice.call(arguments, 0))
        }
    }

    function c(a, b, c, d) {
        return function() {
            b.removeListener(c, d);
            return a.apply(d, arguments)
        }
    }

    function b(b, c, d, e) {
        return function() {
            var g = new a.DelayedTask;
            d.tasks || (d.tasks = []);
            d.tasks.push(g);
            g.delay(c.delay || 10, b, e, Array.prototype.slice.call(arguments,
                0))
        }
    }
    var a = VFExt3.util,
        g = VFExt3.each;
    a.Observable = function() {
        var a = this.events;
        this.listeners && (this.on(this.listeners), delete this.listeners);
        this.events = a || {}
    };
    a.Observable.prototype = {
        filterOptRe: /^(?:scope|delay|buffer|single)$/,
        fireEvent: function() {
            var a = Array.prototype.slice.call(arguments, 0),
                b = a[0].toLowerCase(),
                c = !0,
                d = this.events[b],
                e;
            if (!0 === this.eventsSuspended)(e = this.eventQueue) && e.push(a);
            else if ("object" == typeof d)
                if (d.bubble) {
                    if (!1 === d.fire.apply(d, a.slice(1))) return !1;
                    if ((d = this.getBubbleTarget &&
                            this.getBubbleTarget()) && d.enableBubble) return c = d.events[b], (!c || "object" != typeof c || !c.bubble) && d.enableBubble(b), d.fireEvent.apply(d, a)
                } else a.shift(), c = d.fire.apply(d, a);
            return c
        },
        addListener: function(b, c, d, e) {
            var g;
            if ("object" == typeof b)
                for (g in e = b, e) b = e[g], this.filterOptRe.test(g) || this.addListener(g, b.fn || b, b.scope || e.scope, b.fn ? b : e);
            else b = b.toLowerCase(), g = this.events[b] || !0, "boolean" == typeof g && (this.events[b] = g = new a.Event(this, b)), g.addListener(c, d, "object" == typeof e ? e : {})
        },
        removeListener: function(a,
            b, c) {
            a = this.events[a.toLowerCase()];
            "object" == typeof a && a.removeListener(b, c)
        },
        purgeListeners: function() {
            var a = this.events,
                b, c;
            for (c in a) b = a[c], "object" == typeof b && b.clearListeners()
        },
        addEvents: function(a) {
            this.events = this.events || {};
            if ("string" == typeof a)
                for (var b = arguments, c = b.length; c--;) this.events[b[c]] = this.events[b[c]] || !0;
            else VFExt3.applyIf(this.events, a)
        },
        hasListener: function(a) {
            a = this.events[a.toLowerCase()];
            return "object" == typeof a && 0 < a.listeners.length
        },
        suspendEvents: function(a) {
            this.eventsSuspended = !0;
            a && !this.eventQueue && (this.eventQueue = [])
        },
        resumeEvents: function() {
            var a = this,
                b = a.eventQueue || [];
            a.eventsSuspended = !1;
            delete a.eventQueue;
            g(b, function(b) {
                a.fireEvent.apply(a, b)
            })
        }
    };
    var k = a.Observable.prototype;
    k.on = k.addListener;
    k.un = k.removeListener;
    a.Observable.releaseCapture = function(a) {
        a.fireEvent = k.fireEvent
    };
    a.Event = function(a, b) {
        this.name = b;
        this.obj = a;
        this.listeners = []
    };
    a.Event.prototype = {
        addListener: function(a, b, c) {
            b = b || this.obj;
            this.isListening(a, b) || (a = this.createListener(a, b, c), this.firing &&
                (this.listeners = this.listeners.slice(0)), this.listeners.push(a))
        },
        createListener: function(a, g, f) {
            f = f || {};
            g = g || this.obj;
            var m = {
                    fn: a,
                    scope: g,
                    options: f
                },
                k = a;
            f.target && (k = d(k, f, g));
            f.delay && (k = b(k, f, m, g));
            f.single && (k = c(k, this, a, g));
            f.buffer && (k = e(k, f, m, g));
            m.fireFn = k;
            return m
        },
        findListener: function(a, b) {
            var c = this.listeners,
                d = c.length,
                e;
            for (b = b || this.obj; d--;)
                if ((e = c[d]) && e.fn == a && e.scope == b) return d;
            return -1
        },
        isListening: function(a, b) {
            return -1 != this.findListener(a, b)
        },
        removeListener: function(a, b) {
            var c,
                d, e;
            d = !1;
            if (-1 != (c = this.findListener(a, b))) {
                this.firing && (this.listeners = this.listeners.slice(0));
                d = this.listeners[c];
                d.task && (d.task.cancel(), delete d.task);
                if (e = d.tasks && d.tasks.length) {
                    for (; e--;) d.tasks[e].cancel();
                    delete d.tasks
                }
                this.listeners.splice(c, 1);
                d = !0
            }
            return d
        },
        clearListeners: function() {
            for (var a = this.listeners, b = a.length; b--;) this.removeListener(a[b].fn, a[b].scope)
        },
        fire: function() {
            var a = this.listeners,
                b = a.length,
                c = 0,
                d;
            if (0 < b) {
                this.firing = !0;
                for (var e = Array.prototype.slice.call(arguments,
                        0); c < b; c++)
                    if ((d = a[c]) && !1 === d.fireFn.apply(d.scope || this.obj || window, e)) return this.firing = !1
            }
            this.firing = !1;
            return !0
        }
    }
})();
VFExt3.EventManager = function() {
    function d(a) {
        var b = !1,
            c = 0,
            d = z.length,
            e = b = !1,
            f;
        if (a) {
            if (a.getElementById || a.navigator) {
                for (; c < d; ++c)
                    if (f = z[c], f.el === a) {
                        b = f.id;
                        break
                    } b || (b = VFExt3.id(a), z.push({
                    id: b,
                    el: a
                }), e = !0)
            } else b = VFExt3.id(a);
            VFExt3.elCache[b] || (VFExt3.Element.addToCache(new VFExt3.Element(a), b), e && (VFExt3.elCache[b].skipGC = !0))
        }
        return b
    }

    function e(a, b, c, e, f, g) {
        a = VFExt3.getDom(a);
        var h = d(a),
            h = VFExt3.elCache[h].events,
            m;
        m = v.on(a, b, f);
        h[b] = h[b] || [];
        h[b].push([c, f, g, m, e]);
        if (a.addEventListener && "mousewheel" ==
            b) {
            var k = ["DOMMouseScroll", f, !1];
            a.addEventListener.apply(a, k);
            VFExt3.EventManager.addListener(u, "unload", function() {
                a.removeEventListener.apply(a, k)
            })
        }
        a == r && "mousedown" == b && VFExt3.EventManager.stoppedMouseDownEvent.addListener(f)
    }

    function c() {
        if (window != top) return !1;
        try {
            r.documentElement.doScroll("left")
        } catch (a) {
            return !1
        }
        k();
        return !0
    }

    function b(a) {
        if (VFExt3.isIE && c()) return !0;
        if (r.readyState == y) return k(), !0;
        s || (p = setTimeout(arguments.callee, 2));
        return !1
    }

    function a(a) {
        A || (A = VFExt3.query("style, link[rel\x3dstylesheet]"));
        if (A.length == r.styleSheets.length) return k(), !0;
        s || (p = setTimeout(arguments.callee, 2));
        return !1
    }

    function g(b) {
        r.removeEventListener(x, arguments.callee, !1);
        a()
    }

    function k(a) {
        s || (s = !0, p && clearTimeout(p), t && r.removeEventListener(x, k, !1), VFExt3.isIE && b.bindIE && VFExt3.IE.removeEvent(r, "onreadystatechange", b), v.un(u, "load", arguments.callee));
        n && !VFExt3.isReady && (VFExt3.isReady = !0, n.fire(), n.listeners = [])
    }

    function h(a, b) {
        return function() {
            var c = VFExt3.toArray(arguments);
            b.target == VFExt3.EventObject.setEvent(c[0]).target &&
                a.apply(this, c)
        }
    }

    function q(a, b, c) {
        return function(d) {
            c.delay(b.buffer, a, null, [new VFExt3.EventObjectImpl(d)])
        }
    }

    function f(a, b, c, d, e) {
        return function(f) {
            VFExt3.EventManager.removeListener(b, c, d, e);
            a(f)
        }
    }

    function m(a, b, c) {
        return function(d) {
            var e = new VFExt3.util.DelayedTask(a);
            c.tasks || (c.tasks = []);
            c.tasks.push(e);
            e.delay(b.delay || 10, a, null, [new VFExt3.EventObjectImpl(d)])
        }
    }

    function l(a, b, c, d, g) {
        function k(a) {
            if (VFExt3) {
                a = VFExt3.EventObject.setEvent(a);
                var b;
                if (l.delegate) {
                    if (!(b = a.getTarget(l.delegate,
                            n))) return
                } else b = a.target;
                l.stopEvent && a.stopEvent();
                l.preventDefault && a.preventDefault();
                l.stopPropagation && a.stopPropagation();
                l.normalized && (a = a.browserEvent);
                d.call(g || n, a, b, l)
            }
        }
        var l = !c || "boolean" == typeof c ? {} : c,
            n = VFExt3.getDom(a),
            p;
        d = d || l.fn;
        g = g || l.scope;
        if (!n) throw 'Error listening for "' + b + '". Element "' + a + "\" doesn't exist.";
        l.target && (k = h(k, l));
        l.delay && (k = m(k, l, d));
        l.single && (k = f(k, n, b, d, g));
        l.buffer && (p = new VFExt3.util.DelayedTask(k), k = q(k, l, p));
        e(n, b, d, p, k, g);
        return k
    }
    var n, p, s = !1,
        t =
        VFExt3.isGecko || VFExt3.isWebKit || VFExt3.isSafari,
        v = VFExt3.lib.Event,
        r = document,
        u = window,
        x = "DOMContentLoaded",
        y = "complete",
        B = /^(?:scope|delay|buffer|single|stopEvent|preventDefault|stopPropagation|normalized|args|delegate)$/,
        z = [],
        A, w = {
            addListener: function(a, b, c, d, e) {
                if ("object" == typeof b)
                    for (var f in b) c = b[f], B.test(f) || (VFExt3.isFunction(c) ? l(a, f, b, c, b.scope) : l(a, f, c));
                else l(a, b, e, c, d)
            },
            removeListener: function(a, b, c, e) {
                a = VFExt3.getDom(a);
                var f = d(a),
                    g = a && VFExt3.elCache[f].events[b] || [],
                    h, m, k;
                h = 0;
                for (m = g.length; h < m; h++)
                    if (VFExt3.isArray(k = g[h]) && k[0] == c && (!e || k[2] == e)) {
                        k[4] && k[4].cancel();
                        if (e = c.tasks && c.tasks.length) {
                            for (; e--;) c.tasks[e].cancel();
                            delete c.tasks
                        }
                        c = k[1];
                        v.un(a, b, v.extAdapter ? k[3] : c);
                        c && (a.addEventListener && "mousewheel" == b) && a.removeEventListener("DOMMouseScroll", c, !1);
                        c && (a == r && "mousedown" == b) && VFExt3.EventManager.stoppedMouseDownEvent.removeListener(c);
                        g.splice(h, 1);
                        0 === g.length && delete VFExt3.elCache[f].events[b];
                        for (e in VFExt3.elCache[f].events) return !1;
                        VFExt3.elCache[f].events = {};
                        return !1
                    }
            },
            removeAll: function(a) {
                a = VFExt3.getDom(a);
                var b = d(a),
                    c = (VFExt3.elCache[b] || {}).events || {},
                    e, f, g, h, k, m, l;
                for (h in c)
                    if (c.hasOwnProperty(h)) {
                        e = c[h];
                        f = 0;
                        for (g = e.length; f < g; f++) {
                            k = e[f];
                            k[4] && k[4].cancel();
                            if (k[0].tasks && (m = k[0].tasks.length)) {
                                for (; m--;) k[0].tasks[m].cancel();
                                delete k.tasks
                            }
                            l = k[1];
                            v.un(a, h, v.extAdapter ? k[3] : l);
                            a.addEventListener && (l && "mousewheel" == h) && a.removeEventListener("DOMMouseScroll", l, !1);
                            l && (a == r && "mousedown" == h) && VFExt3.EventManager.stoppedMouseDownEvent.removeListener(l)
                        }
                    } VFExt3.elCache[b] &&
                    (VFExt3.elCache[b].events = {})
            },
            getListeners: function(a, b) {
                a = VFExt3.getDom(a);
                var c = d(a);
                return (c = (VFExt3.elCache[c] || {}).events || {}) && c[b] ? c[b] : null
            },
            purgeElement: function(a, b, c) {
                a = VFExt3.getDom(a);
                var e = d(a),
                    e = (VFExt3.elCache[e] || {}).events || {},
                    f, g;
                if (c) {
                    if (e && e.hasOwnProperty(c)) {
                        f = e[c];
                        e = 0;
                        for (g = f.length; e < g; e++) VFExt3.EventManager.removeListener(a, c, f[e][0])
                    }
                } else VFExt3.EventManager.removeAll(a);
                if (b && a && a.childNodes) {
                    e = 0;
                    for (g = a.childNodes.length; e < g; e++) VFExt3.EventManager.purgeElement(a.childNodes[e],
                        b, c)
                }
            },
            _unload: function() {
                for (var a in VFExt3.elCache) VFExt3.EventManager.removeAll(a);
                delete VFExt3.elCache;
                delete VFExt3.Element._flyweights;
                var b, c, d = VFExt3.lib.Ajax;
                "object" == typeof d.conn ? b = d.conn : b = {};
                for (c in b)(a = b[c]) && d.abort({
                    conn: a,
                    tId: c
                })
            },
            onDocumentReady: function(c, d, e) {
                VFExt3.isReady ? (n || (n = new VFExt3.util.Event), n.addListener(c, d, e), n.fire(), n.listeners = []) : (n || (n || (n = new VFExt3.util.Event), t && r.addEventListener(x, k, !1), VFExt3.isIE ? b() || (b.bindIE = !0, VFExt3.IE.addEvent(r, "onreadystatechange",
                    b)) : VFExt3.isOpera ? r.readyState == y && a() || r.addEventListener(x, g, !1) : VFExt3.isWebKit && b(), v.on(u, "load", k)), e = e || {}, e.delay = e.delay || 1, n.addListener(c, d, e))
            },
            fireDocReady: k
        };
    w.on = w.addListener;
    w.un = w.removeListener;
    w.stoppedMouseDownEvent = new VFExt3.util.Event;
    return w
}();
VFExt3.onReady = VFExt3.EventManager.onDocumentReady;
(function() {
    var d = function() {
        var d = document.body || document.getElementsByTagName("body")[0];
        if (!d) return !1;
        var c = [" ", VFExt3.isIE ? "ext-ie " + (VFExt3.isIE6 ? "ext-ie6" : VFExt3.isIE7 ? "ext-ie7" : "ext-ie8") : VFExt3.isGecko ? "ext-gecko " + (VFExt3.isGecko2 ? "ext-gecko2" : "ext-gecko3") : VFExt3.isOpera ? "ext-opera" : VFExt3.isWebKit ? "ext-webkit" : ""];
        VFExt3.isSafari ? c.push("ext-safari " + (VFExt3.isSafari2 ? "ext-safari2" : VFExt3.isSafari3 ? "ext-safari3" : "ext-safari4")) : VFExt3.isChrome && c.push("ext-chrome");
        VFExt3.isMac && c.push("ext-mac");
        VFExt3.isLinux && c.push("ext-linux");
        if (VFExt3.isStrict || VFExt3.isBorderBox) {
            var b = d.parentNode;
            b && (b.className += VFExt3.isStrict ? " ext-strict" : " ext-border-box")
        }
        d.className += c.join(" ");
        return !0
    };
    if (!d()) VFExt3.onReady(d)
})();
VFExt3.EventObject = function() {
    var d = VFExt3.lib.Event,
        e = /(dbl)?click/,
        c = {
            3: 13,
            63234: 37,
            63235: 39,
            63232: 38,
            63233: 40,
            63276: 33,
            63277: 34,
            63272: 46,
            63273: 36,
            63275: 35
        },
        b = VFExt3.isIE ? {
            1: 0,
            4: 1,
            2: 2
        } : VFExt3.isWebKit ? {
            1: 0,
            2: 1,
            3: 2
        } : {
            0: 0,
            1: 1,
            2: 2
        };
    VFExt3.EventObjectImpl = function(a) {
        a && this.setEvent(a.browserEvent || a)
    };
    VFExt3.EventObjectImpl.prototype = {
        setEvent: function(a) {
            if (a == this || a && a.browserEvent) return a;
            (this.browserEvent = a) ? (this.button = a.button ? b[a.button] : a.which ? a.which - 1 : -1, e.test(a.type) && -1 == this.button &&
                (this.button = 0), this.type = a.type, this.shiftKey = a.shiftKey, this.ctrlKey = a.ctrlKey || a.metaKey || !1, this.altKey = a.altKey, this.keyCode = a.keyCode, this.charCode = a.charCode, this.target = d.getTarget(a), this.xy = d.getXY(a)) : (this.button = -1, this.altKey = this.ctrlKey = this.shiftKey = !1, this.charCode = this.keyCode = 0, this.target = null, this.xy = [0, 0]);
            return this
        },
        stopEvent: function() {
            this.browserEvent && ("mousedown" == this.browserEvent.type && VFExt3.EventManager.stoppedMouseDownEvent.fire(this), d.stopEvent(this.browserEvent))
        },
        preventDefault: function() {
            this.browserEvent && d.preventDefault(this.browserEvent)
        },
        stopPropagation: function() {
            this.browserEvent && ("mousedown" == this.browserEvent.type && VFExt3.EventManager.stoppedMouseDownEvent.fire(this), d.stopPropagation(this.browserEvent))
        },
        getCharCode: function() {
            return this.charCode || this.keyCode
        },
        getKey: function() {
            return this.normalizeKey(this.keyCode || this.charCode)
        },
        normalizeKey: function(a) {
            return VFExt3.isSafari ? c[a] || a : a
        },
        getPageX: function() {
            return this.xy[0]
        },
        getPageY: function() {
            return this.xy[1]
        },
        getXY: function() {
            return this.xy
        },
        getTarget: function(a, b, c) {
            return a ? VFExt3.fly(this.target).findParent(a, b, c) : c ? VFExt3.get(this.target) : this.target
        },
        getRelatedTarget: function() {
            return this.browserEvent ? d.getRelatedTarget(this.browserEvent) : null
        },
        getWheelDelta: function() {
            var a = this.browserEvent,
                b = 0;
            a.wheelDelta ? b = a.wheelDelta / 120 : a.detail && (b = -a.detail / 3);
            return b
        },
        within: function(a, b, c) {
            return a ? (b = this[b ? "getRelatedTarget" : "getTarget"]()) && ((c ? b == VFExt3.getDom(a) : !1) || VFExt3.fly(a).contains(b)) :
                !1
        }
    };
    return new VFExt3.EventObjectImpl
}();
(function() {
    var d = "requestcomplete",
        e = "load",
        c = window;
    VFExt3.data.Connection = function(b) {
        VFExt3.apply(this, b);
        this.addEvents("beforerequest", d, "requestexception");
        VFExt3.data.Connection.superclass.constructor.call(this)
    };
    VFExt3.extend(VFExt3.data.Connection, VFExt3.util.Observable, {
        timeout: 3E4,
        autoAbort: !1,
        disableCaching: !0,
        disableCachingParam: "_dc",
        request: function(b) {
            if (this.fireEvent("beforerequest", this, b)) {
                b.el && (VFExt3.isEmpty(b.indicatorText) || (this.indicatorText = '\x3cdiv class\x3d"loading-indicator"\x3e' +
                    b.indicatorText + "\x3c/div\x3e"), this.indicatorText && (VFExt3.getDom(b.el).innerHTML = this.indicatorText), b.success = (VFExt3.isFunction(b.success) ? b.success : function() {}).createInterceptor(function(a) {
                    VFExt3.getDom(b.el).innerHTML = a.responseText
                }));
                var a = b.params,
                    d = b.url || this.url,
                    e, h = {
                        success: this.handleResponse,
                        failure: this.handleFailure,
                        scope: this,
                        argument: {
                            options: b
                        },
                        timeout: b.timeout || this.timeout
                    };
                VFExt3.isFunction(a) && (a = a.call(b.scope || c, b));
                a = VFExt3.urlEncode(this.extraParams, VFExt3.isObject(a) ?
                    VFExt3.urlEncode(a) : a);
                VFExt3.isFunction(d) && (d = d.call(b.scope || c, b));
                if (e = VFExt3.getDom(b.form)) {
                    d = d || e.action;
                    if (b.isUpload || /multipart\/form-data/i.test(e.getAttribute("enctype"))) return this.doFormUpload.call(this, b, a, d);
                    e = VFExt3.lib.Ajax.serializeForm(e);
                    a = a ? a + "\x26" + e : e
                }
                e = b.method || this.method || (a || b.xmlData || b.jsonData ? "POST" : "GET");
                if ("GET" === e && this.disableCaching && !1 !== b.disableCaching || !0 === b.disableCaching) d = VFExt3.urlAppend(d, (b.disableCachingParam || this.disableCachingParam) + "\x3d" + (new Date).getTime());
                b.headers = VFExt3.apply(b.headers || {}, this.defaultHeaders || {});
                (!0 === b.autoAbort || this.autoAbort) && this.abort();
                if (("GET" == e || b.xmlData || b.jsonData) && a) d = VFExt3.urlAppend(d, a), a = "";
                return this.transId = VFExt3.lib.Ajax.request(e, d, h, a, b)
            }
            return b.callback ? b.callback.apply(b.scope, [b, void 0, void 0]) : null
        },
        isLoading: function(b) {
            return b ? VFExt3.lib.Ajax.isCallInProgress(b) : !!this.transId
        },
        abort: function(b) {
            if (b || this.isLoading()) VFExt3.lib.Ajax.abort(b || this.transId)
        },
        handleResponse: function(b) {
            this.transId = !1;
            var a = b.argument.options;
            b.argument = a ? a.argument : null;
            this.fireEvent(d, this, b, a);
            a.success && a.success.call(a.scope, b, a);
            a.callback && a.callback.call(a.scope, a, !0, b)
        },
        handleFailure: function(b, a) {
            this.transId = !1;
            var c = b.argument.options;
            b.argument = c ? c.argument : null;
            this.fireEvent("requestexception", this, b, c, a);
            c.failure && c.failure.call(c.scope, b, c);
            c.callback && c.callback.call(c.scope, c, !1, b)
        },
        doFormUpload: function(b, a, g) {
            function k() {
                function a(b, c, d) {
                    VFExt3.isFunction(b) && b.apply(c, d)
                }
                var g = {
                        responseText: "",
                        responseXML: null,
                        argument: b.argument
                    },
                    m, l;
                try {
                    if (m = f.contentWindow.document || f.contentDocument || c.frames[h].document) m.body && (/textarea/i.test((l = m.body.firstChild || {}).tagName) ? g.responseText = l.value : g.responseText = m.body.innerHTML), g.responseXML = m.XMLDocument || m
                } catch (n) {}
                VFExt3.EventManager.removeListener(f, e, k, this);
                this.fireEvent(d, this, g, b);
                a(b.success, b.scope, [g, b]);
                a(b.callback, b.scope, [b, !0, g]);
                this.debugUploads || setTimeout(function() {
                    VFExt3.removeNode(f)
                }, 100)
            }
            var h = VFExt3.id(),
                q = document,
                f = q.createElement("iframe"),
                m = VFExt3.getDom(b.form),
                l = [],
                n, p = {
                    target: m.target,
                    method: m.method,
                    encoding: m.encoding,
                    enctype: m.enctype,
                    action: m.action
                };
            VFExt3.fly(f).set({
                id: h,
                name: h,
                cls: "x-hidden",
                src: VFExt3.SSL_SECURE_URL
            });
            q.body.appendChild(f);
            VFExt3.isIE && (document.frames[h].name = h);
            VFExt3.fly(m).set({
                target: h,
                method: "POST",
                enctype: "multipart/form-data",
                encoding: "multipart/form-data",
                action: g || p.action
            });
            VFExt3.iterate(VFExt3.urlDecode(a, !1), function(a, b) {
                n = q.createElement("input");
                VFExt3.fly(n).set({
                    type: "hidden",
                    value: b,
                    name: a
                });
                m.appendChild(n);
                l.push(n)
            });
            VFExt3.EventManager.on(f, e, k, this);
            m.submit();
            VFExt3.fly(m).set(p);
            VFExt3.each(l, function(a) {
                VFExt3.removeNode(a)
            })
        }
    })
})();
VFExt3.Ajax = new VFExt3.data.Connection({
    autoAbort: !1,
    serializeForm: function(d) {
        return VFExt3.lib.Ajax.serializeForm(d)
    }
});
VFExt3.util.DelayedTask = function(d, e, c) {
    var b = this,
        a, g = function() {
            clearInterval(a);
            a = null;
            d.apply(e, c || [])
        };
    b.delay = function(k, h, q, f) {
        b.cancel();
        d = h || d;
        e = q || e;
        c = f || c;
        a = setInterval(g, k)
    };
    b.cancel = function() {
        a && (clearInterval(a), a = null)
    }
};
VFExt3.util.JSON = new function() {
    var d = !!{}.hasOwnProperty,
        e = function() {
            var a = null;
            return function() {
                null === a && (a = VFExt3.USE_NATIVE_JSON && window.JSON && "[object JSON]" == JSON.toString());
                return a
            }
        }(),
        c = function(a) {
            return 10 > a ? "0" + a : a
        },
        b = function(a) {
            return eval("(" + a + ")")
        },
        a = function(b) {
            if (!VFExt3.isDefined(b) || null === b) return "null";
            if (VFExt3.isArray(b)) {
                var c = ["["],
                    e, g, l = b.length,
                    n;
                for (g = 0; g < l; g += 1) switch (n = b[g], typeof n) {
                    case "undefined":
                    case "function":
                    case "unknown":
                        break;
                    default:
                        e && c.push(","), c.push(null ===
                            n ? "null" : VFExt3.util.JSON.encode(n)), e = !0
                }
                c.push("]");
                return c.join("")
            }
            if (VFExt3.isDate(b)) return VFExt3.util.JSON.encodeDate(b);
            if (VFExt3.isString(b)) return k(b);
            if ("number" == typeof b) return isFinite(b) ? String(b) : "null";
            if (VFExt3.isBoolean(b)) return String(b);
            e = ["{"];
            for (g in b)
                if (!b.getElementsByTagName && (!d || b.hasOwnProperty(g))) switch (l = b[g], typeof l) {
                    case "undefined":
                    case "function":
                    case "unknown":
                        break;
                    default:
                        c && e.push(","), e.push(a(g), ":", null === l ? "null" : a(l)), c = !0
                }
            e.push("}");
            return e.join("")
        },
        g = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        },
        k = function(a) {
            return /["\\\x00-\x1f]/.test(a) ? '"' + a.replace(/([\x00-\x1f\\"])/g, function(a, b) {
                var c = g[b];
                if (c) return c;
                c = b.charCodeAt();
                return "\\u00" + Math.floor(c / 16).toString(16) + (c % 16).toString(16)
            }) + '"' : '"' + a + '"'
        };
    this.encodeDate = function(a) {
        return '"' + a.getFullYear() + "-" + c(a.getMonth() + 1) + "-" + c(a.getDate()) + "T" + c(a.getHours()) + ":" + c(a.getMinutes()) + ":" + c(a.getSeconds()) + '"'
    };
    this.encode = function() {
        var b;
        return function(c) {
            b ||
                (b = e() ? JSON.stringify : a);
            return b(c)
        }
    }();
    this.decode = function() {
        var a;
        return function(c) {
            a || (a = e() ? JSON.parse : b);
            return a(c)
        }
    }()
};
VFExt3.encode = VFExt3.util.JSON.encode;
VFExt3.decode = VFExt3.util.JSON.decode;
VFExt3.Direct = VFExt3.extend(VFExt3.util.Observable, {
    exceptions: {
        TRANSPORT: "xhr",
        PARSE: "parse",
        LOGIN: "login",
        SERVER: "exception"
    },
    constructor: function() {
        this.addEvents("event", "exception");
        this.transactions = {};
        this.providers = {}
    },
    addProvider: function(d) {
        var e = arguments;
        if (1 < e.length)
            for (var c = 0, b = e.length; c < b; c++) this.addProvider(e[c]);
        else return d.events || (d = new VFExt3.Direct.PROVIDERS[d.type](d)), d.id = d.id || VFExt3.id(), this.providers[d.id] = d, d.on("data", this.onProviderData, this), d.on("exception",
            this.onProviderException, this), d.isConnected() || d.connect(), d
    },
    getProvider: function(d) {
        return this.providers[d]
    },
    removeProvider: function(d) {
        d = d.id ? d : this.providers[d];
        d.un("data", this.onProviderData, this);
        d.un("exception", this.onProviderException, this);
        delete this.providers[d.id];
        return d
    },
    addTransaction: function(d) {
        return this.transactions[d.tid] = d
    },
    removeTransaction: function(d) {
        delete this.transactions[d.tid || d];
        return d
    },
    getTransaction: function(d) {
        return this.transactions[d.tid || d]
    },
    onProviderData: function(d,
        e) {
        if (VFExt3.isArray(e))
            for (var c = 0, b = e.length; c < b; c++) this.onProviderData(d, e[c]);
        else e.name && "event" != e.name && "exception" != e.name ? this.fireEvent(e.name, e) : "exception" == e.type && this.fireEvent("exception", e), this.fireEvent("event", e, d)
    },
    createEvent: function(d, e) {
        return new VFExt3.Direct.eventTypes[d.type](VFExt3.apply(d, e))
    }
});
VFExt3.Direct = new VFExt3.Direct;
VFExt3.Direct.TID = 1;
VFExt3.Direct.PROVIDERS = {};
VFExt3.Direct.Transaction = function(d) {
    VFExt3.apply(this, d);
    this.tid = ++VFExt3.Direct.TID;
    this.retryCount = 0
};
VFExt3.Direct.Transaction.prototype = {
    send: function() {
        this.provider.queueTransaction(this)
    },
    retry: function() {
        this.retryCount++;
        this.send()
    },
    getProvider: function() {
        return this.provider
    }
};
VFExt3.Direct.Event = function(d) {
    VFExt3.apply(this, d)
};
VFExt3.Direct.Event.prototype = {
    status: !0,
    getData: function() {
        return this.data
    }
};
VFExt3.Direct.RemotingEvent = VFExt3.extend(VFExt3.Direct.Event, {
    type: "rpc",
    getTransaction: function() {
        return this.transaction || VFExt3.Direct.getTransaction(this.tid)
    }
});
VFExt3.Direct.ExceptionEvent = VFExt3.extend(VFExt3.Direct.RemotingEvent, {
    status: !1,
    type: "exception"
});
VFExt3.Direct.eventTypes = {
    rpc: VFExt3.Direct.RemotingEvent,
    event: VFExt3.Direct.Event,
    exception: VFExt3.Direct.ExceptionEvent
};
VFExt3.direct.Provider = VFExt3.extend(VFExt3.util.Observable, {
    priority: 1,
    constructor: function(d) {
        VFExt3.apply(this, d);
        this.addEvents("connect", "disconnect", "data", "exception");
        VFExt3.direct.Provider.superclass.constructor.call(this, d)
    },
    isConnected: function() {
        return !1
    },
    connect: VFExt3.emptyFn,
    disconnect: VFExt3.emptyFn
});
VFExt3.direct.JsonProvider = VFExt3.extend(VFExt3.direct.Provider, {
    parseResponse: function(d) {
        return !VFExt3.isEmpty(d.responseText) ? "object" == typeof d.responseText ? d.responseText : VFExt3.decode(d.responseText) : null
    },
    getEvents: function(d, e) {
        var c = null,
            b = [];
        try {
            c = this.parseResponse(d)
        } catch (a) {
            c = new VFExt3.Direct.ExceptionEvent({
                data: a,
                xhr: d,
                code: VFExt3.Direct.exceptions.PARSE,
                message: "Error parsing json response: \n\n '" + a.message + "'.  Logged in?"
            });
            if (e && e.transaction && VFExt3.isArray(e.transaction))
                for (var g =
                        0, k = e.transaction.length; g < k; g++) {
                    var h = VFExt3.apply({
                        tid: e.transaction[g].tid
                    }, c);
                    b.push(h)
                } else b.push(c);
            return b
        }
        if (VFExt3.isArray(c)) {
            g = 0;
            for (k = c.length; g < k; g++) b.push(VFExt3.Direct.createEvent(c[g]))
        } else if (e && e.transaction && VFExt3.isArray(e.transaction)) {
            g = 0;
            for (k = e.transaction.length; g < k; g++) h = VFExt3.apply({
                tid: e.transaction[g].tid
            }, c), b.push(VFExt3.Direct.createEvent(h))
        } else b.push(VFExt3.Direct.createEvent(c));
        return b
    }
});
VFExt3.direct.RemotingProvider = VFExt3.extend(VFExt3.direct.JsonProvider, {
    enableBuffer: 10,
    maxRetries: 1,
    timeout: void 0,
    constructor: function(d) {
        VFExt3.direct.RemotingProvider.superclass.constructor.call(this, d);
        this.addEvents("beforecall", "call");
        this.namespace = VFExt3.isString(this.namespace) ? VFExt3.ns(this.namespace) : this.namespace || window;
        this.transactions = {};
        this.callBuffer = []
    },
    initAPI: function() {
        var d = this.actions,
            e;
        for (e in d)
            for (var c = this.namespace[e] || (this.namespace[e] = {}), b = d[e], a = 0, g = b.length; a <
                g; a++) {
                var k = b[a];
                c[k.name] = this.createMethod(e, k)
            }
    },
    isConnected: function() {
        return !!this.connected
    },
    connect: function() {
        if (this.url) this.initAPI(), this.connected = !0, this.fireEvent("connect", this);
        else if (!this.url) throw "Error initializing RemotingProvider, no url configured.";
    },
    disconnect: function() {
        this.connected && (this.connected = !1, this.fireEvent("disconnect", this))
    },
    onData: function(d, e, c) {
        if (e) {
            c = this.getEvents(c, d);
            e = 0;
            for (var b = c.length; e < b; e++) {
                var a = c[e];
                !a.tid && d.transaction && (a.tid = d.transaction.tid);
                var g = this.getTransaction(a);
                this.fireEvent("data", this, a);
                g && (this.doCallback(g, a, !0), VFExt3.Direct.removeTransaction(g))
            }
        } else {
            d = [].concat(d.transaction);
            e = 0;
            for (b = d.length; e < b; e++)(g = this.getTransaction(d[e])) && g.retryCount < this.maxRetries ? g.retry() : (a = new VFExt3.Direct.ExceptionEvent({
                data: a,
                transaction: g,
                code: VFExt3.Direct.exceptions.TRANSPORT,
                message: "Unable to connect to the server" + (c && c.statusText ? " (" + c.statusText + ")" : "") + ".",
                xhr: c
            }), this.fireEvent("data", this, a), g && (this.doCallback(g, a,
                !1), VFExt3.Direct.removeTransaction(g)))
        }
    },
    getCallData: function(d) {
        return {
            action: d.action,
            method: d.method,
            data: d.data,
            type: "rpc",
            tid: d.tid
        }
    },
    doSend: function(d) {
        var e = {
                url: this.url,
                callback: this.onData,
                scope: this,
                transaction: d,
                timeout: this.timeout
            },
            c;
        if (VFExt3.isArray(d)) {
            c = [];
            for (var b = 0, a = d.length; b < a; b++) c.push(this.getCallData(d[b]))
        } else c = this.getCallData(d);
        this.enableUrlEncode ? (d = {}, d[VFExt3.isString(this.enableUrlEncode) ? this.enableUrlEncode : "data"] = VFExt3.encode(c), e.params = d) : e.jsonData =
            c;
        VFExt3.Ajax.request(e)
    },
    combineAndSend: function() {
        var d = this.callBuffer.length;
        0 < d && (this.doSend(1 == d ? this.callBuffer[0] : this.callBuffer), this.callBuffer = [])
    },
    queueTransaction: function(d) {
        d.form ? this.processForm(d) : (this.callBuffer.push(d), this.enableBuffer ? (this.callTask || (this.callTask = new VFExt3.util.DelayedTask(this.combineAndSend, this)), this.callTask.delay(VFExt3.isNumber(this.enableBuffer) ? this.enableBuffer : 10)) : this.combineAndSend())
    },
    doCall: function(d, e, c) {
        var b = null,
            a = c[e.len],
            g = c[e.len +
                1];
        0 !== e.len && (b = c.slice(0, e.len));
        d = new VFExt3.Direct.Transaction({
            provider: this,
            args: c,
            action: d,
            method: e.name,
            data: b,
            cb: g && VFExt3.isFunction(a) ? a.createDelegate(g) : a
        });
        !1 !== this.fireEvent("beforecall", this, d, e) && (VFExt3.Direct.addTransaction(d), this.queueTransaction(d), this.fireEvent("call", this, d, e))
    },
    doForm: function(d, e, c, b, a) {
        a = new VFExt3.Direct.Transaction({
            provider: this,
            action: d,
            method: e.name,
            args: [c, b, a],
            cb: a && VFExt3.isFunction(b) ? b.createDelegate(a) : b,
            isForm: !0
        });
        if (!1 !== this.fireEvent("beforecall",
                this, a, e)) {
            VFExt3.Direct.addTransaction(a);
            var g = "multipart/form-data" == String(c.getAttribute("enctype")).toLowerCase();
            d = {
                extTID: a.tid,
                extAction: d,
                extMethod: e.name,
                extType: "rpc",
                extUpload: String(g)
            };
            VFExt3.apply(a, {
                form: VFExt3.getDom(c),
                isUpload: g,
                params: b && VFExt3.isObject(b.params) ? VFExt3.apply(d, b.params) : d
            });
            this.fireEvent("call", this, a, e);
            this.processForm(a)
        }
    },
    processForm: function(d) {
        VFExt3.Ajax.request({
            url: this.url,
            params: d.params,
            callback: this.onData,
            scope: this,
            form: d.form,
            isUpload: d.isUpload,
            transaction: d
        })
    },
    createMethod: function(d, e) {
        var c;
        c = e.formHandler ? function(b, a, c) {
            this.doForm(d, e, b, a, c)
        }.createDelegate(this) : function() {
            this.doCall(d, e, Array.prototype.slice.call(arguments, 0))
        }.createDelegate(this);
        c.directCfg = {
            action: d,
            method: e
        };
        return c
    },
    getTransaction: function(d) {
        return d && d.tid ? VFExt3.Direct.getTransaction(d.tid) : null
    },
    doCallback: function(d, e) {
        var c = e.status ? "success" : "failure";
        if (d && d.cb) {
            var b = d.cb,
                a = VFExt3.isDefined(e.result) ? e.result : e.data;
            VFExt3.isFunction(b) ? b(a, e) : (VFExt3.callback(b[c],
                b.scope, [a, e]), VFExt3.callback(b.callback, b.scope, [a, e]))
        }
    }
});
VFExt3.Direct.PROVIDERS.remoting = VFExt3.direct.RemotingProvider;
VFExt3.util.Format = function() {
    var d = /^\s+|\s+$/g,
        e = /<\/?[^>]+>/gi,
        c = /(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)/ig,
        b = /\r?\n/g;
    return {
        ellipsis: function(a, b, c) {
            if (a && a.length > b) {
                if (c) {
                    c = a.substr(0, b - 2);
                    var d = Math.max(c.lastIndexOf(" "), c.lastIndexOf("."), c.lastIndexOf("!"), c.lastIndexOf("?"));
                    return -1 == d || d < b - 15 ? a.substr(0, b - 3) + "..." : c.substr(0, d) + "..."
                }
                return a.substr(0, b - 3) + "..."
            }
            return a
        },
        undef: function(a) {
            return void 0 !== a ? a : ""
        },
        defaultValue: function(a, b) {
            return void 0 !== a && "" !== a ? a : b
        },
        htmlEncode: function(a) {
            return !a ?
                a : String(a).replace(/&/g, "\x26amp;").replace(/>/g, "\x26gt;").replace(/</g, "\x26lt;").replace(/"/g, "\x26quot;").replace(/'/g, "\x26#39;")
        },
        htmlDecode: function(a) {
            return !a ? a : String(a).replace(/&gt;/g, "\x3e").replace(/&lt;/g, "\x3c").replace(/&quot;/g, '"').replace(/&amp;/g, "\x26").replace(/&#39;/g, "'")
        },
        trim: function(a) {
            return String(a).replace(d, "")
        },
        substr: function(a, b, c) {
            return String(a).substr(b, c)
        },
        lowercase: function(a) {
            return String(a).toLowerCase()
        },
        uppercase: function(a) {
            return String(a).toUpperCase()
        },
        capitalize: function(a) {
            return !a ? a : a.charAt(0).toUpperCase() + a.substr(1).toLowerCase()
        },
        call: function(a, b) {
            if (2 < arguments.length) {
                var c = Array.prototype.slice.call(arguments, 2);
                c.unshift(a);
                return eval(b).apply(window, c)
            }
            return eval(b).call(window, a)
        },
        usMoney: function(a) {
            a = Math.round(100 * (a - 0)) / 100;
            a = a == Math.floor(a) ? a + ".00" : 10 * a == Math.floor(10 * a) ? a + "0" : a;
            a = String(a);
            var b = a.split(".");
            a = b[0];
            for (var b = b[1] ? "." + b[1] : ".00", c = /(\d+)(\d{3})/; c.test(a);) a = a.replace(c, "$1,$2");
            a += b;
            return "-" == a.charAt(0) ?
                "-$" + a.substr(1) : "$" + a
        },
        date: function(a, b) {
            if (!a) return "";
            VFExt3.isDate(a) || (a = new Date(Date.parse(a)));
            return a.dateFormat(b || "m/d/Y")
        },
        dateRenderer: function(a) {
            return function(b) {
                return VFExt3.util.Format.date(b, a)
            }
        },
        stripTags: function(a) {
            return !a ? a : String(a).replace(e, "")
        },
        stripScripts: function(a) {
            return !a ? a : String(a).replace(c, "")
        },
        fileSize: function(a) {
            return 1024 > a ? a + " bytes" : 1048576 > a ? Math.round(10 * a / 1024) / 10 + " KB" : Math.round(10 * a / 1048576) / 10 + " MB"
        },
        math: function() {
            var a = {};
            return function(b,
                c) {
                a[c] || (a[c] = new Function("v", "return v " + c + ";"));
                return a[c](b)
            }
        }(),
        round: function(a, b) {
            var c = Number(a);
            "number" == typeof b && (b = Math.pow(10, b), c = Math.round(a * b) / b);
            return c
        },
        number: function(a, b) {
            if (!b) return a;
            a = VFExt3.num(a, NaN);
            if (isNaN(a)) return "";
            var c = ",",
                d = ".",
                e = !1,
                f = 0 > a;
            a = Math.abs(a);
            "/i" == b.substr(b.length - 2) && (b = b.substr(0, b.length - 2), e = !0, c = ".", d = ",");
            var m = -1 != b.indexOf(c),
                e = (e ? b.replace(/[^\d\,]/g, "") : b.replace(/[^\d\.]/g, "")).split(d);
            if (1 < e.length) a = a.toFixed(e[1].length);
            else {
                if (2 <
                    e.length) throw "NumberFormatException: invalid format, formats should have no more than 1 period: " + b;
                a = a.toFixed(0)
            }
            var l = a.toString(),
                e = l.split(".");
            if (m) {
                for (var m = e[0], l = [], n = m.length, p = m.length % 3 || 3, s = 0; s < n; s += p) 0 != s && (p = 3), l[l.length] = m.substr(s, p);
                l = l.join(c);
                e[1] && (l += d + e[1])
            } else e[1] && (l = e[0] + d + e[1]);
            return (f ? "-" : "") + b.replace(/[\d,?\.?]+/, l)
        },
        numberRenderer: function(a) {
            return function(b) {
                return VFExt3.util.Format.number(b, a)
            }
        },
        plural: function(a, b, c) {
            return a + " " + (1 == a ? b : c ? c : b + "s")
        },
        nl2br: function(a) {
            return VFExt3.isEmpty(a) ?
                "" : a.replace(b, "\x3cbr/\x3e")
        }
    }
}();
(function() {
    var d = document;
    VFExt3.Element = function(a, b) {
        var c = "string" == typeof a ? d.getElementById(a) : a,
            e;
        if (!c) return null;
        e = c.id;
        if (!b && e && VFExt3.elCache[e]) return VFExt3.elCache[e].el;
        this.dom = c;
        this.id = e || VFExt3.id(c)
    };
    var e = VFExt3.DomHelper,
        c = VFExt3.Element,
        b = VFExt3.elCache;
    c.prototype = {
        set: function(a, b) {
            var c = this.dom,
                d, g;
            b = !1 !== b && !!c.setAttribute;
            for (d in a) a.hasOwnProperty(d) && (g = a[d], "style" == d ? e.applyStyles(c, g) : "cls" == d ? c.className = g : b ? c.setAttribute(d, g) : c[d] = g);
            return this
        },
        defaultUnit: "px",
        is: function(a) {
            return VFExt3.DomQuery.is(this.dom, a)
        },
        focus: function(a, b) {
            b = b || this.dom;
            try {
                Number(a) ? this.focus.defer(a, null, [null, b]) : b.focus()
            } catch (c) {}
            return this
        },
        blur: function() {
            try {
                this.dom.blur()
            } catch (a) {}
            return this
        },
        getValue: function(a) {
            var b = this.dom.value;
            return a ? parseInt(b, 10) : b
        },
        addListener: function(a, b, c, d) {
            VFExt3.EventManager.on(this.dom, a, b, c || this, d);
            return this
        },
        removeListener: function(a, b, c) {
            VFExt3.EventManager.removeListener(this.dom, a, b, c || this);
            return this
        },
        removeAllListeners: function() {
            VFExt3.EventManager.removeAll(this.dom);
            return this
        },
        purgeAllListeners: function() {
            VFExt3.EventManager.purgeElement(this, !0);
            return this
        },
        addUnits: function(a) {
            if ("" === a || "auto" == a || void 0 === a) a = a || "";
            else if (!isNaN(a) || !g.test(a)) a += this.defaultUnit || "px";
            return a
        },
        load: function(a, b, c) {
            VFExt3.Ajax.request(VFExt3.apply({
                params: b,
                url: a.url || a,
                callback: c,
                el: this.dom,
                indicatorText: a.indicatorText || ""
            }, VFExt3.isObject(a) ? a : {}));
            return this
        },
        isBorderBox: function() {
            return q[(this.dom.tagName || "").toLowerCase()] || VFExt3.isBorderBox
        },
        remove: function() {
            var a =
                this.dom;
            a && (delete this.dom, VFExt3.removeNode(a))
        },
        hover: function(a, b, c, d) {
            this.on("mouseenter", a, c || this.dom, d);
            this.on("mouseleave", b, c || this.dom, d);
            return this
        },
        contains: function(a) {
            return !a ? !1 : VFExt3.lib.Dom.isAncestor(this.dom, a.dom ? a.dom : a)
        },
        getAttributeNS: function(a, b) {
            return this.getAttribute(b, a)
        },
        getAttribute: VFExt3.isIE ? function(a, b) {
            var c = this.dom;
            return -1 == ["undefined", "unknown"].indexOf(typeof c[b + ":" + a]) ? c[b + ":" + a] : c[a]
        } : function(a, b) {
            var c = this.dom;
            return c.getAttributeNS(b, a) || c.getAttribute(b +
                ":" + a) || c.getAttribute(a) || c[a]
        },
        update: function(a) {
            this.dom && (this.dom.innerHTML = a);
            return this
        }
    };
    var a = c.prototype;
    c.addMethods = function(b) {
        VFExt3.apply(a, b)
    };
    a.on = a.addListener;
    a.un = a.removeListener;
    a.autoBoxAdjust = !0;
    var g = /\d+(px|em|%|en|ex|pt|in|cm|mm|pc)$/i,
        k;
    c.get = function(a) {
        var e, g;
        if (!a) return null;
        if ("string" == typeof a) {
            if (!(g = d.getElementById(a))) return null;
            b[a] && b[a].el ? (e = b[a].el, e.dom = g) : e = c.addToCache(new c(g));
            return e
        }
        if (a.tagName) {
            if (!(e = a.id)) e = VFExt3.id(a);
            b[e] && b[e].el ? (e =
                b[e].el, e.dom = a) : e = c.addToCache(new c(a));
            return e
        }
        return a instanceof c ? (a != k && (a.dom = VFExt3.isIE && (void 0 == a.id || "" == a.id) ? a.dom : d.getElementById(a.id) || a.dom), a) : a.isComposite ? a : VFExt3.isArray(a) ? c.select(a) : a == d ? (k || (a = function() {}, a.prototype = c.prototype, k = new a, k.dom = d), k) : null
    };
    c.addToCache = function(a, c) {
        c = c || a.id;
        b[c] = {
            el: a,
            data: {},
            events: {}
        };
        return a
    };
    c.data = function(a, d, e) {
        a = c.get(a);
        if (!a) return null;
        var g = b[a.id].data;
        return 2 == arguments.length ? g[d] : g[d] = e
    };
    c.collectorThreadId = setInterval(function() {
        if (VFExt3.enableGarbageCollector) {
            var a,
                e;
            for (a in b)
                if (e = b[a], !e.skipGC && (e = e.el, e = e.dom, !e || !e.parentNode || !e.offsetParent && !d.getElementById(a))) VFExt3.enableListenerCollection && VFExt3.EventManager.removeAll(e), delete b[a];
            if (VFExt3.isIE) {
                e = {};
                for (a in b) e[a] = b[a];
                b = VFExt3.elCache = e
            }
        } else clearInterval(c.collectorThreadId)
    }, 3E4);
    var h = function() {};
    h.prototype = c.prototype;
    c.Flyweight = function(a) {
        this.dom = a
    };
    c.Flyweight.prototype = new h;
    c.Flyweight.prototype.isFlyweight = !0;
    c._flyweights = {};
    c.fly = function(a, b) {
        var d = null;
        b = b || "_global";
        if (a = VFExt3.getDom(a))(c._flyweights[b] = c._flyweights[b] || new c.Flyweight).dom = a, d = c._flyweights[b];
        return d
    };
    VFExt3.get = c.get;
    VFExt3.fly = c.fly;
    var q = VFExt3.isStrict ? {
        select: 1
    } : {
        input: 1,
        select: 1,
        textarea: 1
    };
    if (VFExt3.isIE || VFExt3.isGecko) q.button = 1
})();
VFExt3.ns("Visualforce.remoting");
$VFRM = Visualforce.remoting;
$VFRM.Util = {
    log: function(a, b) {
        if (!("undefined" === typeof console || !console.groupCollapsed || !console.log || !console.groupEnd))
            if ("undefined" !== typeof b && null !== b) try {
                console.groupCollapsed(a), console.log(b), console.groupEnd()
            } catch (c) {} else try {
                console.log(a)
            } catch (d) {}
    },
    warn: function(a) {
        if ("undefined" !== typeof console && console.warn && a) try {
            console.warn(a)
        } catch (b) {}
    },
    error: function(a, b) {
        if ("undefined" !== typeof console && console.error && a)
            if (b) try {
                console.error(a, b)
            } catch (c) {} else try {
                console.error(a)
            } catch (d) {}
    },
    isArray: function(a) {
        return a && a.constructor === Array
    },
    isObject: function(a) {
        return !!a && "[object Object]" === Object.prototype.toString.apply(a)
    },
    isFunction: function(a) {
        return a && "function" === typeof a
    },
    isString: function(a) {
        return "string" === typeof a
    },
    isEmpty: function(a) {
        return void 0 === a || null === a || this.isArray(a) && 0 === a.length || "" === a
    },
    isNotEmpty: function(a) {
        return !this.isEmpty(a)
    },
    decode: function(a, b) {
        var c = eval("(" + a + ")");
        return b ? this.resolveRefs(c) : c
    },
    __resolveRefs: function(a, b, c) {
        if (this.isArray(a)) {
            for (var d =
                    c || [], g = 0; g < a.length; g++) d.push(this.__resolveRefs(a[g], b));
            return d
        }
        if (this.isObject(a)) {
            d = a.s;
            if (void 0 !== d) return a = a.v, g = this.isArray(a) ? [] : {}, b[d] = g, this.__resolveRefs(a, b, g);
            d = a.r;
            if (void 0 !== d) return b[d];
            d = c || {};
            for (g in a) d[g] = this.__resolveRefs(a[g], b);
            return d
        }
        return a
    },
    resolveRefs: function(a) {
        return !this.isEmpty(a) ? this.__resolveRefs(a, {}) : a
    },
    encode: function(a) {
        return !this.isEmpty(a) ? JSON.stringify(a) : a
    },
    escape: function(a) {
        return !this.isEmpty(a) ? this.each(a, function(a) {
                return escape(a)
            }) :
            a
    },
    unescape: function(a) {
        return !this.isEmpty(a) ? this.each(a, function(a) {
            return unescape(a)
        }) : a
    },
    htmlEncode: function(a) {
        return !this.isEmpty(a) ? this.each(a, function(a) {
            return a && "string" === typeof a ? VFExt3.util.Format.htmlEncode(a) : a
        }) : a
    },
    each: function(a, b) {
        if (this.isEmpty(a)) return a;
        if (this.isArray(a)) {
            for (var c = [], d = 0, g = a.length; d < g; d++) c.push(this.each(a[d], b));
            return c
        }
        if (this.isObject(a)) {
            c = {};
            for (d in a) c[d] = this.each(a[d], b);
            return c
        }
        return b(a)
    },
    clone: function(a, b) {
        if (null === a || "object" !== typeof a) return a;
        if (a instanceof Object) {
            var c = {},
                d;
            for (d in a) b(d, a[d]) && (c[d] = this.clone(a[d], b));
            return c
        }
        this.error("Type " + typeof a + " not supported")
    },
    newlineToBr: function(a) {
        return a ? a.replace(/\n/g, "\x3cbr /\x3e") : a
    },
    getObject: function(a, b) {
        if (!a) return null;
        b = b || window;
        var c, d = a;
        if (-1 < a.indexOf(".")) {
            c = a.split(".");
            for (var d = c.pop(), g = 0; g < c.length; g++) b = b[c[g]]
        }
        return b[d]
    },
    isEmptyObject: function(a) {
        for (var b in a)
            if (Object.prototype.hasOwnProperty.call(a, b)) return !1;
        return !0
    },
    get: function(a) {
        if (a = RegExp("[?\x26]" +
                encodeURIComponent(a) + "\x3d([^\x26]*)").exec(location.search)) return decodeURIComponent(a[1])
    }
};
$VFRM.RemotingProviderImpl = VFExt3.extend(VFExt3.direct.RemotingProvider, {
    constructor: function(a) {
        function b(a, b) {
            d.warn(g + a, b)
        }
        var c = this,
            d = $VFRM.Util,
            g = "Visualforce Remoting: ";
        this.cmdParam = "__vfr__";
        if (!a.vf) throw g + "Visualforce configuration not provided";
        var h = a.vf,
            n = h.dbg || h.tst || "yes" === d.get("__vfrmtdbg");
        this.id = h.vid;
        this.pageUri = h.vn;
        this.timestamp = h.tm;
        this.ns = h.ns;
        delete a.vf;
        VFExt3.apply(a, {
            type: "remoting",
            maxRetries: 0,
            url: "https://c.ap5.visual.force.com/apexremote"
        });
        $VFRM.RemotingProviderImpl.superclass.constructor.call(this, a);
        this.dump = function() {
            var a = "Provider[" + this.id + (!d.isEmpty(this.ns) ? ", " + this.ns : "") + "] last updated at " + (new Date(this.timestamp)).toLocaleString();
            d.log(g + a, c.actions)
        };
        this.reInit = function(a, b) {
            var e, f;
            if (c.actions) {
                for (var g in c.actions) {
                    if (e = d.getObject(g)) {
                        f = c.actions[g].ms;
                        for (var m = 0, p = f.length; m < p; m++) e[f[m].name] && delete e[f[m].name]
                    }
                    d.isEmptyObject(e) && delete e
                }
                d.isEmptyObject(c.ns) && delete e;
                a && c.initAPI()
            }
            b && d.isFunction(b) &&
                b(!0, this)
        };
        this.initAPI = function() {
            var a = c.actions,
                l, e, f, k;
            for (k in a) {
                l = 1 === a[k].prm;
                e = h.dev;
                f = h.tst;
                var m = h.ovrprm;
                if (top !== self && l && (!e || top.document.location.pathname !== self.document.location.pathname) && !f && !m) a[k] = null, l = "Javascript proxies were not generated for controller " + k + ": may not use public remoted methods inside an iframe.", alert(l), b(l);
                else {
                    f = k.indexOf(".");
                    l = a[k].ms; - 1 < f ? (e = k.substring(0, f), e = c.namespace[e] || (c.namespace[e] = {}), f = k.substring(f + 1), f = e[f] || (e[f] = {})) : f = c.namespace[k] ||
                        (c.namespace[k] = {});
                    for (var m = 0, p = l.length; m < p; m++) e = l[m], f[e.name] && !h.xhr ? d.error(g + ("Unable to create method '" + e.name + "': already exists on object '" + k + "'"), void 0) : f[e.name] = c.createMethod(k, e);
                    n && d.log(g + k, f)
                }
            }
        };
        this.queueTransaction = function(a) {
            if (a.form) this.processForm(a);
            else {
                if (a.args && d.isArray(a.args)) {
                    var b = a.args[a.args.length - 1];
                    if (d.isObject(b) && !1 === b.buffer) {
                        this.doSend(a);
                        return
                    }
                }
                this.callBuffer.push(a);
                this.enableBuffer ? (this.callTask || (this.callTask = new VFExt3.util.DelayedTask(this.combineAndSend,
                    this)), this.callTask.delay(VFExt3.isNumber(this.enableBuffer) ? this.enableBuffer : 10)) : this.combineAndSend()
            }
        };
        this.doCall = function(a, b, e) {
            n && ("undefined" !== typeof console && console.time) && console.time("VF Remoting: " + b.name);
            if (d.isFunction(e[b.len])) {
                if (d.isObject(e[b.len + 1])) {
                    var c = e.pop();
                    e.push(void 0);
                    e.push(c)
                }
                $VFRM.RemotingProviderImpl.superclass.doCall.call(this, a, b, e)
            } else d.error(g + ("Parameter length does not match remote action parameters: expected " + b.len + " parameters, got "), void 0)
        };
        this.isRemotingTx =
            function(b) {
                return b && b.scope.service == a.service
            };
        this.setTimeout = function(a) {
            var b;
            a.transaction && a.transaction.args && (b = a.transaction.args[a.transaction.args.length - 1], d.isObject(b) && b.timeout && (a.timeout = b.timeout));
            a.timeout = a.timeout || $VFRM.timeout || VFExt3.Ajax.timeout;
            12E4 < a.timeout && (a.timeout = 12E4)
        };
        this.refresh = function(a) {
            var c = {},
                e;
            for (e in this.actions)
                if (this.actions[e].ms)
                    for (var f = 0, k = this.actions[e].ms.length; f < k; f++) c[e + "." + this.actions[e].ms[f].name] = this.actions[e].ms[f];
            a = {
                url: this.url,
                success: function(a) {
                    return function(c) {
                        var e, l = VFExt3.decode(c.responseText),
                            f, k = !0;
                        if (l.actions)
                            if (f = VFExt3.decode(l.actions), !f || !d.isObject(f)) d.error(g + "Unable to refresh actions: actions result not found or not an object", void 0);
                            else {
                                for (var h in f)
                                    if (e = h.substring(0, h.lastIndexOf(".")), c = this.actions[e], !c || !c.ms) b("Unable to refresh action '" + h + "', controller '" + e + "' not found"), k = !1;
                                    else {
                                        e = 0;
                                        for (var q = c.ms.length; e < q; e++)
                                            if (c.ms[e].name === h.substring(h.lastIndexOf(".") + 1)) {
                                                c.ms[e].csrf = f[h];
                                                n && d.log(g + ("Refreshed action '" + h + "'"), void 0);
                                                break
                                            }
                                    } k && (l.tm && l.tm > this.timestamp) && (this.timestamp = l.tm);
                                a && d.isFunction(a) && a(!0, this)
                            }
                        else d.error(g + "Unable to refresh actions: actions result not found", void 0)
                    }
                }(a),
                failure: function(a) {
                    return function(b) {
                        d.error(g + ("Unable to refresh actions: " + (b ? b.statusText : "unknown")), void 0);
                        a && d.isFunction(a) && a(!1, b)
                    }
                }(a),
                scope: this,
                timeout: this.timeout,
                jsonData: c,
                params: this.cmdParam + "\x3d2"
            };
            VFExt3.Ajax.request(a)
        };
        this.getCallData = function(a) {
            var b =
                $VFRM.RemotingProviderImpl.superclass.getCallData.call(this, a) || {};
            b.ctx = a.ctx;
            return b
        };
        this.addListener("beforecall", function(a, c, e) {
            d.isEmpty(c) ? b("Context not applied") : (c.ctx = {
                csrf: e.csrf,
                vid: h.vid,
                ns: e.ns,
                ver: e.ver
            }, "p1" === h.isdtp && (c.ctx.isdtp = "p1"), d.isEmpty(c.ctx.csrf) && b("Context incomplete - CSRF not provided", c.ctx), d.isEmpty(c.ctx.vid) && b("Context incomplete - Visualforce id not provided", c.ctx), ("undefined" === typeof c.ctx.ns || null === c.ctx.ns) && b("Context incomplete - namespace not provided",
                c.ctx), d.isEmpty(c.ctx.ver) && b("Context incomplete - version not provided", c.ctx), n && d.log(g + "Added context to transaction request", c))
        });
        this.addListener("data", function(a, b) {
            if (!d.isEmpty(a) && !d.isEmpty(b)) {
                "undefined" === typeof b.result && (b.result = null);
                var e = b.getTransaction(),
                    f = !d.isEmpty(e) && !d.isEmpty(e.args) && d.isObject(e.args[e.args.length - 1]) ? e.args[e.args.length - 1] : null;
                n && c.fireEvent("beforedata", this, b);
                if (d.isEmpty(f) || d.isEmpty(f.escape) || !0 === f.escape) b.result = d.htmlEncode(b.result);
                !0 === b.ref && (b.result = d.resolveRefs(b.result));
                n && d.log(g + "Response result", b.result);
                n && ("undefined" !== typeof console && console.timeEnd) && console.timeEnd("VF Remoting: " + b.method);
                if (!d.isEmpty(e) && d.isFunction(e.cb)) {
                    var h = e.cb;
                    e.cb = function(a, b) {
                        b = $VFRM.Util.clone(b, function(a, b) {
                            return !("function" === typeof b || $VFRM.Util.isObject(b) && "provider" == a)
                        });
                        h(a, b)
                    }
                }
            }
        })
    }
});
VFExt3.Direct.on("exception", function(a) {
    a.vfTx && a.where && "" !== a.where ? $VFRM.Util.error("Visualforce Remoting Exception: " + a.message, a.where) : $VFRM.Util.error("Visualforce Remoting Exception: " + a.message, a)
});
VFExt3.Ajax.on("beforerequest", function(a, b) {
    $VFRM.last.isRemotingTx(b) && (b.headers || (b.headers = {}), $VFRM.Util.isNotEmpty($VFRM.oauthAccessToken) && $VFRM.Util.isString($VFRM.oauthAccessToken) && (b.headers.Authorization = "OAuth " + $VFRM.oauthAccessToken), b.headers["X-User-Agent"] = "Visualforce-Remoting", $VFRM.last.setTimeout(b))
}, this);
$VFRM.ProviderManager = VFExt3.extend(VFExt3.util.Observable, {
    constructor: function(a) {
        this.addEvents("beforeadd", "afteradd");
        $VFRM.ProviderManager.superclass.constructor.call(this, a)
    },
    providers: {},
    add: function(a) {
        !1 !== this.fireEvent("beforeadd", a) && (VFExt3.Direct.addProvider(a), this.providers[a.id] = a, $VFRM.last = a, this.fireEvent("afteradd", a))
    },
    get: function(a) {
        return this.providers[a]
    },
    on: function(a, b) {
        if (this.events[a]) $VFRM.ProviderManager.superclass.on.call(this, a, b);
        else
            for (var c in this.providers) this.providers[c].on(a,
                b)
    },
    getController: function(a) {
        if (!a || !$VFRM.Util.isString(a)) return null;
        var b = $VFRM.Util.getObject(a);
        if (!b)
            for (var c in this.providers) b && $VFRM.Util.warn("Multiple remoting controllers found for '" + a + "'"), this.providers[c].ns && (b = $VFRM.Util.getObject(this.providers[c].ns + "." + a));
        (!b || !$VFRM.Util.isObject(b)) && $VFRM.Util.warn("Controller not found for '" + a + "'");
        return b
    },
    getAction: function(a) {
        if (!a || !$VFRM.Util.isString(a) || -1 == a.indexOf(".")) return null;
        var b = this.getController(a.substring(0, a.lastIndexOf("."))),
            c;
        b && (c = b[a.substring(a.lastIndexOf(".") + 1)], (!c || !$VFRM.Util.isFunction(c)) && $VFRM.Util.warn("Action function not found for '" + a + "'"));
        return c
    },
    invokeAction: function() {
        (null === arguments || 0 === arguments.length) && $VFRM.Util.error("Unable to invoke action '" + a + "': action and action parameters not provided", null);
        var a = Array.prototype.shift.call(arguments),
            b = this.getAction(a);
        b && $VFRM.Util.isFunction(b) ? b.apply(this, arguments) : $VFRM.Util.error("Unable to invoke action '" + a + "': no controller and/or function found",
            null)
    }
});
$VFRM.Manager = new $VFRM.ProviderManager;

//# sourceMappingURL=/javascript/1551445877000/sfdc/source/VFRemote.js.map