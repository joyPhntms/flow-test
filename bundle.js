/*! For license information please see bundle.js.LICENSE.txt */
(() => {
  var e = {
      890: (e) => {
        "use strict";
        e.exports = (function () {
          try {
            return !!new Blob();
          } catch (e) {
            return !1;
          }
        })();
      },
      995: (e, t, n) => {
        "use strict";
        var r = n(7).EventEmitter;
        function o() {
          r.call(this), this.setMaxListeners(20);
        }
        (o.prototype = Object.create(r.prototype)),
          (o.prototype.constructor = o),
          (o.prototype.off = function (e, t) {
            return t
              ? this.removeListener(e, t)
              : e
              ? this.removeAllListeners(e)
              : this.removeAllListeners();
          }),
          (e.exports = o);
      },
      794: (e, t, n) => {
        "use strict";
        var r = n(995),
          o = n(170),
          i = 0;
        e.exports = function e(t) {
          var n,
            a = {},
            s = [],
            c = [],
            u = 0,
            l = 0,
            h = {},
            d = function (r) {
              return Array.isArray(r)
                ? (r.forEach(d), n)
                : ((i =
                    r.assets && Array.isArray(r.assets)
                      ? e(f(r, t))
                      : o(f(r, t))).once("destroy", v),
                  c.push(i),
                  (h[i.id] = i),
                  n);
              var i;
            },
            _ = function (e) {
              return arguments.length ? (a[e] ? a[e] : h[e]) : s;
            },
            f = function (e, t) {
              return (
                "string" == typeof e && (e = { url: e }),
                void 0 === e.isTouchLocked &&
                  (e.isTouchLocked = t.isTouchLocked),
                void 0 === e.blob && (e.blob = t.blob),
                void 0 === e.basePath && (e.basePath = t.basePath),
                (e.id = e.id || e.url || String(++i)),
                (e.type =
                  e.type ||
                  ((n = e.url) &&
                    n.split("?")[0].split(".").pop().toLowerCase())),
                (e.crossOrigin = e.crossOrigin || t.crossOrigin),
                (e.webAudioContext = e.webAudioContext || t.webAudioContext),
                (e.log = t.log),
                e
              );
              var n;
            },
            p = function (e) {
              var t = u + e;
              n.emit("progress", t / l);
            },
            m = function (e, t, r) {
              Array.isArray(e) && (e = { id: t, file: e, type: r }),
                u++,
                n.emit("progress", u / l),
                (a[e.id] = e.file),
                s.push(e),
                n.emit("childcomplete", e),
                g();
            },
            E = function (e) {
              l--,
                n.listeners("error").length
                  ? n.emit("error", e)
                  : console.error(e),
                g();
            },
            v = function (e) {
              (h[e] = null),
                delete h[e],
                (a[e] = null),
                delete a[e],
                s.some(function (t, n) {
                  if (t.id === e) return s.splice(n, 1), !0;
                });
            },
            g = function () {
              u >= l && n.emit("complete", s, a, t.id, "group");
            };
          return (
            (n = Object.create(r.prototype, {
              _events: { value: {} },
              id: {
                get: function () {
                  return t.id;
                },
              },
              add: { value: d },
              start: {
                value: function () {
                  return (
                    (l = c.length),
                    c.forEach(function (e) {
                      e.on("progress", p)
                        .once("complete", m)
                        .once("error", E)
                        .start();
                    }),
                    (c = []),
                    n
                  );
                },
              },
              get: { value: _ },
              find: {
                value: function (e) {
                  if (_(e)) return _(e);
                  var t = null;
                  return (
                    Object.keys(h).some(function (n) {
                      return !!(t = h[n].find && h[n].find(e));
                    }),
                    t
                  );
                },
              },
              getLoader: {
                value: function (e) {
                  return h[e];
                },
              },
              loaded: {
                get: function () {
                  return u >= l;
                },
              },
              file: {
                get: function () {
                  return s;
                },
              },
              destroy: {
                value: function () {
                  for (; c.length; ) c.pop().destroy();
                  return (
                    n.off("error"),
                    n.off("progress"),
                    n.off("complete"),
                    (s = []),
                    (a = {}),
                    (t.webAudioContext = null),
                    (l = 0),
                    (u = 0),
                    Object.keys(h).forEach(function (e) {
                      h[e].destroy();
                    }),
                    (h = {}),
                    n.emit("destroy", n.id),
                    n
                  );
                },
              },
            })),
            (t = f(t || {}, {
              basePath: "",
              blob: !1,
              touchLocked: !1,
              crossOrigin: null,
              webAudioContext: null,
              log: !1,
            })),
            Array.isArray(t.assets) && d(t.assets),
            n
          );
        };
      },
      757: (e, t, n) => {
        "use strict";
        var r = n(794);
        (r.stats = n(302)), (e.exports = r);
      },
      170: (e, t, n) => {
        "use strict";
        var r = n(995),
          o = n(890),
          i = n(302);
        e.exports = function (e) {
          var t,
            n,
            a,
            s,
            c,
            u,
            l = e.id,
            h = e.basePath || "",
            d = e.url,
            _ = e.type,
            f = e.crossOrigin,
            p = e.isTouchLocked,
            m = e.blob && o,
            E = e.webAudioContext,
            v = e.log,
            g = function (e) {
              e &&
                ((u = { id: l, file: e, type: _ }),
                t.emit("progress", 1),
                t.emit("complete", u, l, _),
                N());
            },
            x = function (e, t) {
              (n = t || b),
                (a = new XMLHttpRequest()).open("GET", h + d, !0),
                (a.responseType = e),
                a.addEventListener("progress", T),
                a.addEventListener("load", n),
                a.addEventListener("error", L),
                a.send();
            },
            T = function (e) {
              e.lengthComputable && t.emit("progress", e.loaded / e.total);
            },
            b = function () {
              A() && g(a.response);
            },
            A = function () {
              return a && a.status < 400
                ? (i.update(a, s, d, v), !0)
                : (L(a && a.statusText), !1);
            },
            y = function () {
              (a = new Image()),
                f && (a.crossOrigin = "anonymous"),
                a.addEventListener("error", L, !1),
                a.addEventListener("load", R, !1),
                (a.src = h + d);
            },
            R = function (e) {
              window.clearTimeout(c),
                e || (!a.error && a.readyState) ? g(a) : L();
            },
            M = function () {
              x("blob", function () {
                A() &&
                  ((a = new Image()).addEventListener("error", L, !1),
                  a.addEventListener("load", S, !1),
                  (a.src = window.URL.createObjectURL(a.response)));
              });
            },
            S = function () {
              window.URL.revokeObjectURL(a.src), g(a);
            },
            C = function () {
              x("arraybuffer", function () {
                A() &&
                  E.decodeAudioData(
                    a.response,
                    function (e) {
                      (a = null), g(e);
                    },
                    function (e) {
                      L(e);
                    }
                  );
              });
            },
            w = function (e) {
              (a = document.createElement(e)),
                p ||
                  (window.clearTimeout(c),
                  (c = window.setTimeout(R, 2e3)),
                  a.addEventListener("canplaythrough", R, !1)),
                a.addEventListener("error", L, !1),
                (a.preload = "auto"),
                (a.src = h + d),
                a.load(),
                p && g(a);
            },
            L = function (e) {
              window.clearTimeout(c);
              var n = e;
              a && a.tagName && a.error
                ? (n =
                    "MediaError: " +
                    ["", "ABORTED", "NETWORK", "DECODE", "SRC_NOT_SUPPORTED"][
                      a.error.code
                    ] +
                    " " +
                    a.src)
                : a && a.statusText
                ? (n = a.statusText)
                : e && e.message
                ? (n = e.message)
                : e && e.type && (n = e.type),
                t.emit("error", 'Error loading "' + h + d + '" ' + n),
                I();
            },
            N = function () {
              t.off("error"),
                t.off("progress"),
                t.off("complete"),
                a &&
                  (a.removeEventListener("progress", T),
                  a.removeEventListener("load", n),
                  a.removeEventListener("error", L),
                  a.removeEventListener("load", R),
                  a.removeEventListener("canplaythrough", R),
                  a.removeEventListener("load", S));
            },
            I = function () {
              N(),
                a && a.abort && a.readyState < 4 && a.abort(),
                (a = null),
                (E = null),
                (u = null),
                window.clearTimeout(c),
                t.emit("destroy", l);
            };
          return (t = Object.create(r.prototype, {
            _events: { value: {} },
            id: { value: e.id },
            start: {
              value: function () {
                switch (((s = Date.now()), _)) {
                  case "json":
                    x("json", function () {
                      if (A()) {
                        var e = a.response;
                        "string" == typeof e && (e = JSON.parse(e)), g(e);
                      }
                    });
                    break;
                  case "jpg":
                  case "png":
                  case "gif":
                  case "webp":
                  case "svg":
                    m ? M() : y();
                    break;
                  case "mp3":
                  case "ogg":
                  case "opus":
                  case "wav":
                  case "m4a":
                    E ? C() : w("audio");
                    break;
                  case "ogv":
                  case "mp4":
                  case "webm":
                  case "hls":
                    m ? x("blob") : w("video");
                    break;
                  case "bin":
                  case "binary":
                    x("arraybuffer");
                    break;
                  case "txt":
                  case "text":
                    x("text");
                    break;
                  default:
                    throw (
                      "AssetsLoader ERROR: Unknown type for file with URL: " +
                      h +
                      d +
                      " (" +
                      _ +
                      ")"
                    );
                }
              },
            },
            loaded: {
              get: function () {
                return !!u;
              },
            },
            file: {
              get: function () {
                return u;
              },
            },
            destroy: { value: I },
          }));
        };
      },
      302: (e) => {
        "use strict";
        e.exports = {
          mbs: 0,
          secs: 0,
          update: function (e, t, n, r) {
            var o,
              i = e.getAllResponseHeaders();
            if (i) {
              var a = i.match(/content-length: (\d+)/i);
              a && a.length && (o = a[1]);
            }
            if (o) {
              var s = (o = parseInt(o, 10)) / 1024 / 1024,
                c = (Date.now() - t) / 1e3;
              (this.secs += c), (this.mbs += s), r && this.log(n, s, c);
            } else
              r && console.warn.call(console, "Can't get Content-Length:", n);
          },
          log: function (e, t, n) {
            if (e) {
              var r =
                "File loaded: " +
                e.substr(e.lastIndexOf("/") + 1) +
                " size:" +
                t.toFixed(2) +
                "mb time:" +
                n.toFixed(2) +
                "s speed:" +
                (t / n).toFixed(2) +
                "mbps";
              console.log.call(console, r);
            }
            var o =
              "Total loaded: " +
              this.mbs.toFixed(2) +
              "mb time:" +
              this.secs.toFixed(2) +
              "s speed:" +
              this.getMbps().toFixed(2) +
              "mbps";
            console.log.call(console, o);
          },
          getMbps: function () {
            return this.mbs / this.secs;
          },
        };
      },
      7: (e) => {
        "use strict";
        var t,
          n = "object" == typeof Reflect ? Reflect : null,
          r =
            n && "function" == typeof n.apply
              ? n.apply
              : function (e, t, n) {
                  return Function.prototype.apply.call(e, t, n);
                };
        t =
          n && "function" == typeof n.ownKeys
            ? n.ownKeys
            : Object.getOwnPropertySymbols
            ? function (e) {
                return Object.getOwnPropertyNames(e).concat(
                  Object.getOwnPropertySymbols(e)
                );
              }
            : function (e) {
                return Object.getOwnPropertyNames(e);
              };
        var o =
          Number.isNaN ||
          function (e) {
            return e != e;
          };
        function i() {
          i.init.call(this);
        }
        (e.exports = i),
          (e.exports.once = function (e, t) {
            return new Promise(function (n, r) {
              function o(n) {
                e.removeListener(t, i), r(n);
              }
              function i() {
                "function" == typeof e.removeListener &&
                  e.removeListener("error", o),
                  n([].slice.call(arguments));
              }
              p(e, t, i, { once: !0 }),
                "error" !== t &&
                  (function (e, t, n) {
                    "function" == typeof e.on && p(e, "error", t, { once: !0 });
                  })(e, o);
            });
          }),
          (i.EventEmitter = i),
          (i.prototype._events = void 0),
          (i.prototype._eventsCount = 0),
          (i.prototype._maxListeners = void 0);
        var a = 10;
        function s(e) {
          if ("function" != typeof e)
            throw new TypeError(
              'The "listener" argument must be of type Function. Received type ' +
                typeof e
            );
        }
        function c(e) {
          return void 0 === e._maxListeners
            ? i.defaultMaxListeners
            : e._maxListeners;
        }
        function u(e, t, n, r) {
          var o, i, a, u;
          if (
            (s(n),
            void 0 === (i = e._events)
              ? ((i = e._events = Object.create(null)), (e._eventsCount = 0))
              : (void 0 !== i.newListener &&
                  (e.emit("newListener", t, n.listener ? n.listener : n),
                  (i = e._events)),
                (a = i[t])),
            void 0 === a)
          )
            (a = i[t] = n), ++e._eventsCount;
          else if (
            ("function" == typeof a
              ? (a = i[t] = r ? [n, a] : [a, n])
              : r
              ? a.unshift(n)
              : a.push(n),
            (o = c(e)) > 0 && a.length > o && !a.warned)
          ) {
            a.warned = !0;
            var l = new Error(
              "Possible EventEmitter memory leak detected. " +
                a.length +
                " " +
                String(t) +
                " listeners added. Use emitter.setMaxListeners() to increase limit"
            );
            (l.name = "MaxListenersExceededWarning"),
              (l.emitter = e),
              (l.type = t),
              (l.count = a.length),
              (u = l),
              console && console.warn && console.warn(u);
          }
          return e;
        }
        function l() {
          if (!this.fired)
            return (
              this.target.removeListener(this.type, this.wrapFn),
              (this.fired = !0),
              0 === arguments.length
                ? this.listener.call(this.target)
                : this.listener.apply(this.target, arguments)
            );
        }
        function h(e, t, n) {
          var r = {
              fired: !1,
              wrapFn: void 0,
              target: e,
              type: t,
              listener: n,
            },
            o = l.bind(r);
          return (o.listener = n), (r.wrapFn = o), o;
        }
        function d(e, t, n) {
          var r = e._events;
          if (void 0 === r) return [];
          var o = r[t];
          return void 0 === o
            ? []
            : "function" == typeof o
            ? n
              ? [o.listener || o]
              : [o]
            : n
            ? (function (e) {
                for (var t = new Array(e.length), n = 0; n < t.length; ++n)
                  t[n] = e[n].listener || e[n];
                return t;
              })(o)
            : f(o, o.length);
        }
        function _(e) {
          var t = this._events;
          if (void 0 !== t) {
            var n = t[e];
            if ("function" == typeof n) return 1;
            if (void 0 !== n) return n.length;
          }
          return 0;
        }
        function f(e, t) {
          for (var n = new Array(t), r = 0; r < t; ++r) n[r] = e[r];
          return n;
        }
        function p(e, t, n, r) {
          if ("function" == typeof e.on) r.once ? e.once(t, n) : e.on(t, n);
          else {
            if ("function" != typeof e.addEventListener)
              throw new TypeError(
                'The "emitter" argument must be of type EventEmitter. Received type ' +
                  typeof e
              );
            e.addEventListener(t, function o(i) {
              r.once && e.removeEventListener(t, o), n(i);
            });
          }
        }
        Object.defineProperty(i, "defaultMaxListeners", {
          enumerable: !0,
          get: function () {
            return a;
          },
          set: function (e) {
            if ("number" != typeof e || e < 0 || o(e))
              throw new RangeError(
                'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
                  e +
                  "."
              );
            a = e;
          },
        }),
          (i.init = function () {
            (void 0 !== this._events &&
              this._events !== Object.getPrototypeOf(this)._events) ||
              ((this._events = Object.create(null)), (this._eventsCount = 0)),
              (this._maxListeners = this._maxListeners || void 0);
          }),
          (i.prototype.setMaxListeners = function (e) {
            if ("number" != typeof e || e < 0 || o(e))
              throw new RangeError(
                'The value of "n" is out of range. It must be a non-negative number. Received ' +
                  e +
                  "."
              );
            return (this._maxListeners = e), this;
          }),
          (i.prototype.getMaxListeners = function () {
            return c(this);
          }),
          (i.prototype.emit = function (e) {
            for (var t = [], n = 1; n < arguments.length; n++)
              t.push(arguments[n]);
            var o = "error" === e,
              i = this._events;
            if (void 0 !== i) o = o && void 0 === i.error;
            else if (!o) return !1;
            if (o) {
              var a;
              if ((t.length > 0 && (a = t[0]), a instanceof Error)) throw a;
              var s = new Error(
                "Unhandled error." + (a ? " (" + a.message + ")" : "")
              );
              throw ((s.context = a), s);
            }
            var c = i[e];
            if (void 0 === c) return !1;
            if ("function" == typeof c) r(c, this, t);
            else {
              var u = c.length,
                l = f(c, u);
              for (n = 0; n < u; ++n) r(l[n], this, t);
            }
            return !0;
          }),
          (i.prototype.addListener = function (e, t) {
            return u(this, e, t, !1);
          }),
          (i.prototype.on = i.prototype.addListener),
          (i.prototype.prependListener = function (e, t) {
            return u(this, e, t, !0);
          }),
          (i.prototype.once = function (e, t) {
            return s(t), this.on(e, h(this, e, t)), this;
          }),
          (i.prototype.prependOnceListener = function (e, t) {
            return s(t), this.prependListener(e, h(this, e, t)), this;
          }),
          (i.prototype.removeListener = function (e, t) {
            var n, r, o, i, a;
            if ((s(t), void 0 === (r = this._events))) return this;
            if (void 0 === (n = r[e])) return this;
            if (n === t || n.listener === t)
              0 == --this._eventsCount
                ? (this._events = Object.create(null))
                : (delete r[e],
                  r.removeListener &&
                    this.emit("removeListener", e, n.listener || t));
            else if ("function" != typeof n) {
              for (o = -1, i = n.length - 1; i >= 0; i--)
                if (n[i] === t || n[i].listener === t) {
                  (a = n[i].listener), (o = i);
                  break;
                }
              if (o < 0) return this;
              0 === o
                ? n.shift()
                : (function (e, t) {
                    for (; t + 1 < e.length; t++) e[t] = e[t + 1];
                    e.pop();
                  })(n, o),
                1 === n.length && (r[e] = n[0]),
                void 0 !== r.removeListener &&
                  this.emit("removeListener", e, a || t);
            }
            return this;
          }),
          (i.prototype.off = i.prototype.removeListener),
          (i.prototype.removeAllListeners = function (e) {
            var t, n, r;
            if (void 0 === (n = this._events)) return this;
            if (void 0 === n.removeListener)
              return (
                0 === arguments.length
                  ? ((this._events = Object.create(null)),
                    (this._eventsCount = 0))
                  : void 0 !== n[e] &&
                    (0 == --this._eventsCount
                      ? (this._events = Object.create(null))
                      : delete n[e]),
                this
              );
            if (0 === arguments.length) {
              var o,
                i = Object.keys(n);
              for (r = 0; r < i.length; ++r)
                "removeListener" !== (o = i[r]) && this.removeAllListeners(o);
              return (
                this.removeAllListeners("removeListener"),
                (this._events = Object.create(null)),
                (this._eventsCount = 0),
                this
              );
            }
            if ("function" == typeof (t = n[e])) this.removeListener(e, t);
            else if (void 0 !== t)
              for (r = t.length - 1; r >= 0; r--) this.removeListener(e, t[r]);
            return this;
          }),
          (i.prototype.listeners = function (e) {
            return d(this, e, !0);
          }),
          (i.prototype.rawListeners = function (e) {
            return d(this, e, !1);
          }),
          (i.listenerCount = function (e, t) {
            return "function" == typeof e.listenerCount
              ? e.listenerCount(t)
              : _.call(e, t);
          }),
          (i.prototype.listenerCount = _),
          (i.prototype.eventNames = function () {
            return this._eventsCount > 0 ? t(this._events) : [];
          });
      },
      823: (e, t, n) => {
        "use strict";
        n.r(t),
          n.d(t, {
            ARRAY_TYPE: () => o,
            EPSILON: () => r,
            RANDOM: () => i,
            equals: () => u,
            setMatrixArrayType: () => a,
            toRadian: () => c,
          });
        var r = 1e-6,
          o = "undefined" != typeof Float32Array ? Float32Array : Array,
          i = Math.random;
        function a(e) {
          o = e;
        }
        var s = Math.PI / 180;
        function c(e) {
          return e * s;
        }
        function u(e, t) {
          return Math.abs(e - t) <= r * Math.max(1, Math.abs(e), Math.abs(t));
        }
        Math.hypot ||
          (Math.hypot = function () {
            for (var e = 0, t = arguments.length; t--; )
              e += arguments[t] * arguments[t];
            return Math.sqrt(e);
          });
      },
      400: (e, t, n) => {
        "use strict";
        n.r(t),
          n.d(t, {
            glMatrix: () => s,
            mat2: () => r,
            mat2d: () => o,
            mat3: () => ie,
            mat4: () => ae,
            quat: () => se,
            quat2: () => i,
            vec2: () => a,
            vec3: () => zt,
            vec4: () => Gt,
          });
        var r = {};
        n.r(r),
          n.d(r, {
            LDU: () => R,
            add: () => M,
            adjoint: () => m,
            clone: () => u,
            copy: () => l,
            create: () => c,
            determinant: () => E,
            equals: () => w,
            exactEquals: () => C,
            frob: () => y,
            fromRotation: () => T,
            fromScaling: () => b,
            fromValues: () => d,
            identity: () => h,
            invert: () => p,
            mul: () => I,
            multiply: () => v,
            multiplyScalar: () => L,
            multiplyScalarAndAdd: () => N,
            rotate: () => g,
            scale: () => x,
            set: () => _,
            str: () => A,
            sub: () => O,
            subtract: () => S,
            transpose: () => f,
          });
        var o = {};
        n.r(o),
          n.d(o, {
            add: () => Q,
            clone: () => F,
            copy: () => U,
            create: () => P,
            determinant: () => V,
            equals: () => ne,
            exactEquals: () => te,
            frob: () => Z,
            fromRotation: () => j,
            fromScaling: () => W,
            fromTranslation: () => q,
            fromValues: () => B,
            identity: () => D,
            invert: () => G,
            mul: () => re,
            multiply: () => X,
            multiplyScalar: () => $,
            multiplyScalarAndAdd: () => ee,
            rotate: () => k,
            scale: () => H,
            set: () => z,
            str: () => K,
            sub: () => oe,
            subtract: () => J,
            translate: () => Y,
          });
        var i = {};
        n.r(i),
          n.d(i, {
            add: () => Ne,
            clone: () => ue,
            conjugate: () => Be,
            copy: () => me,
            create: () => ce,
            dot: () => Fe,
            equals: () => je,
            exactEquals: () => Ye,
            fromMat4: () => pe,
            fromRotation: () => fe,
            fromRotationTranslation: () => de,
            fromRotationTranslationValues: () => he,
            fromTranslation: () => _e,
            fromValues: () => le,
            getDual: () => xe,
            getReal: () => ge,
            getTranslation: () => Ae,
            identity: () => Ee,
            invert: () => De,
            len: () => Ge,
            length: () => ze,
            lerp: () => Ue,
            mul: () => Oe,
            multiply: () => Ie,
            normalize: () => ke,
            rotateAroundAxis: () => Le,
            rotateByQuatAppend: () => Ce,
            rotateByQuatPrepend: () => we,
            rotateX: () => Re,
            rotateY: () => Me,
            rotateZ: () => Se,
            scale: () => Pe,
            set: () => ve,
            setDual: () => be,
            setReal: () => Te,
            sqrLen: () => Xe,
            squaredLength: () => Ve,
            str: () => He,
            translate: () => ye,
          });
        var a = {};
        n.r(a),
          n.d(a, {
            add: () => Je,
            angle: () => Rt,
            ceil: () => nt,
            clone: () => qe,
            copy: () => Ze,
            create: () => We,
            cross: () => Et,
            dist: () => Ft,
            distance: () => ut,
            div: () => Pt,
            divide: () => tt,
            dot: () => mt,
            equals: () => wt,
            exactEquals: () => Ct,
            floor: () => rt,
            forEach: () => Bt,
            fromValues: () => Ke,
            inverse: () => ft,
            len: () => Nt,
            length: () => ht,
            lerp: () => vt,
            max: () => it,
            min: () => ot,
            mul: () => Ot,
            multiply: () => et,
            negate: () => _t,
            normalize: () => pt,
            random: () => gt,
            rotate: () => yt,
            round: () => at,
            scale: () => st,
            scaleAndAdd: () => ct,
            set: () => Qe,
            sqrDist: () => Ut,
            sqrLen: () => Dt,
            squaredDistance: () => lt,
            squaredLength: () => dt,
            str: () => St,
            sub: () => It,
            subtract: () => $e,
            transformMat2: () => xt,
            transformMat2d: () => Tt,
            transformMat3: () => bt,
            transformMat4: () => At,
            zero: () => Mt,
          });
        var s = n(823);
        function c() {
          var e = new s.ARRAY_TYPE(4);
          return (
            s.ARRAY_TYPE != Float32Array && ((e[1] = 0), (e[2] = 0)),
            (e[0] = 1),
            (e[3] = 1),
            e
          );
        }
        function u(e) {
          var t = new s.ARRAY_TYPE(4);
          return (t[0] = e[0]), (t[1] = e[1]), (t[2] = e[2]), (t[3] = e[3]), t;
        }
        function l(e, t) {
          return (e[0] = t[0]), (e[1] = t[1]), (e[2] = t[2]), (e[3] = t[3]), e;
        }
        function h(e) {
          return (e[0] = 1), (e[1] = 0), (e[2] = 0), (e[3] = 1), e;
        }
        function d(e, t, n, r) {
          var o = new s.ARRAY_TYPE(4);
          return (o[0] = e), (o[1] = t), (o[2] = n), (o[3] = r), o;
        }
        function _(e, t, n, r, o) {
          return (e[0] = t), (e[1] = n), (e[2] = r), (e[3] = o), e;
        }
        function f(e, t) {
          if (e === t) {
            var n = t[1];
            (e[1] = t[2]), (e[2] = n);
          } else (e[0] = t[0]), (e[1] = t[2]), (e[2] = t[1]), (e[3] = t[3]);
          return e;
        }
        function p(e, t) {
          var n = t[0],
            r = t[1],
            o = t[2],
            i = t[3],
            a = n * i - o * r;
          return a
            ? ((a = 1 / a),
              (e[0] = i * a),
              (e[1] = -r * a),
              (e[2] = -o * a),
              (e[3] = n * a),
              e)
            : null;
        }
        function m(e, t) {
          var n = t[0];
          return (e[0] = t[3]), (e[1] = -t[1]), (e[2] = -t[2]), (e[3] = n), e;
        }
        function E(e) {
          return e[0] * e[3] - e[2] * e[1];
        }
        function v(e, t, n) {
          var r = t[0],
            o = t[1],
            i = t[2],
            a = t[3],
            s = n[0],
            c = n[1],
            u = n[2],
            l = n[3];
          return (
            (e[0] = r * s + i * c),
            (e[1] = o * s + a * c),
            (e[2] = r * u + i * l),
            (e[3] = o * u + a * l),
            e
          );
        }
        function g(e, t, n) {
          var r = t[0],
            o = t[1],
            i = t[2],
            a = t[3],
            s = Math.sin(n),
            c = Math.cos(n);
          return (
            (e[0] = r * c + i * s),
            (e[1] = o * c + a * s),
            (e[2] = r * -s + i * c),
            (e[3] = o * -s + a * c),
            e
          );
        }
        function x(e, t, n) {
          var r = t[0],
            o = t[1],
            i = t[2],
            a = t[3],
            s = n[0],
            c = n[1];
          return (
            (e[0] = r * s), (e[1] = o * s), (e[2] = i * c), (e[3] = a * c), e
          );
        }
        function T(e, t) {
          var n = Math.sin(t),
            r = Math.cos(t);
          return (e[0] = r), (e[1] = n), (e[2] = -n), (e[3] = r), e;
        }
        function b(e, t) {
          return (e[0] = t[0]), (e[1] = 0), (e[2] = 0), (e[3] = t[1]), e;
        }
        function A(e) {
          return "mat2(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ")";
        }
        function y(e) {
          return Math.hypot(e[0], e[1], e[2], e[3]);
        }
        function R(e, t, n, r) {
          return (
            (e[2] = r[2] / r[0]),
            (n[0] = r[0]),
            (n[1] = r[1]),
            (n[3] = r[3] - e[2] * n[1]),
            [e, t, n]
          );
        }
        function M(e, t, n) {
          return (
            (e[0] = t[0] + n[0]),
            (e[1] = t[1] + n[1]),
            (e[2] = t[2] + n[2]),
            (e[3] = t[3] + n[3]),
            e
          );
        }
        function S(e, t, n) {
          return (
            (e[0] = t[0] - n[0]),
            (e[1] = t[1] - n[1]),
            (e[2] = t[2] - n[2]),
            (e[3] = t[3] - n[3]),
            e
          );
        }
        function C(e, t) {
          return (
            e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3]
          );
        }
        function w(e, t) {
          var n = e[0],
            r = e[1],
            o = e[2],
            i = e[3],
            a = t[0],
            c = t[1],
            u = t[2],
            l = t[3];
          return (
            Math.abs(n - a) <=
              s.EPSILON * Math.max(1, Math.abs(n), Math.abs(a)) &&
            Math.abs(r - c) <=
              s.EPSILON * Math.max(1, Math.abs(r), Math.abs(c)) &&
            Math.abs(o - u) <=
              s.EPSILON * Math.max(1, Math.abs(o), Math.abs(u)) &&
            Math.abs(i - l) <= s.EPSILON * Math.max(1, Math.abs(i), Math.abs(l))
          );
        }
        function L(e, t, n) {
          return (
            (e[0] = t[0] * n),
            (e[1] = t[1] * n),
            (e[2] = t[2] * n),
            (e[3] = t[3] * n),
            e
          );
        }
        function N(e, t, n, r) {
          return (
            (e[0] = t[0] + n[0] * r),
            (e[1] = t[1] + n[1] * r),
            (e[2] = t[2] + n[2] * r),
            (e[3] = t[3] + n[3] * r),
            e
          );
        }
        var I = v,
          O = S;
        function P() {
          var e = new s.ARRAY_TYPE(6);
          return (
            s.ARRAY_TYPE != Float32Array &&
              ((e[1] = 0), (e[2] = 0), (e[4] = 0), (e[5] = 0)),
            (e[0] = 1),
            (e[3] = 1),
            e
          );
        }
        function F(e) {
          var t = new s.ARRAY_TYPE(6);
          return (
            (t[0] = e[0]),
            (t[1] = e[1]),
            (t[2] = e[2]),
            (t[3] = e[3]),
            (t[4] = e[4]),
            (t[5] = e[5]),
            t
          );
        }
        function U(e, t) {
          return (
            (e[0] = t[0]),
            (e[1] = t[1]),
            (e[2] = t[2]),
            (e[3] = t[3]),
            (e[4] = t[4]),
            (e[5] = t[5]),
            e
          );
        }
        function D(e) {
          return (
            (e[0] = 1),
            (e[1] = 0),
            (e[2] = 0),
            (e[3] = 1),
            (e[4] = 0),
            (e[5] = 0),
            e
          );
        }
        function B(e, t, n, r, o, i) {
          var a = new s.ARRAY_TYPE(6);
          return (
            (a[0] = e),
            (a[1] = t),
            (a[2] = n),
            (a[3] = r),
            (a[4] = o),
            (a[5] = i),
            a
          );
        }
        function z(e, t, n, r, o, i, a) {
          return (
            (e[0] = t),
            (e[1] = n),
            (e[2] = r),
            (e[3] = o),
            (e[4] = i),
            (e[5] = a),
            e
          );
        }
        function G(e, t) {
          var n = t[0],
            r = t[1],
            o = t[2],
            i = t[3],
            a = t[4],
            s = t[5],
            c = n * i - r * o;
          return c
            ? ((c = 1 / c),
              (e[0] = i * c),
              (e[1] = -r * c),
              (e[2] = -o * c),
              (e[3] = n * c),
              (e[4] = (o * s - i * a) * c),
              (e[5] = (r * a - n * s) * c),
              e)
            : null;
        }
        function V(e) {
          return e[0] * e[3] - e[1] * e[2];
        }
        function X(e, t, n) {
          var r = t[0],
            o = t[1],
            i = t[2],
            a = t[3],
            s = t[4],
            c = t[5],
            u = n[0],
            l = n[1],
            h = n[2],
            d = n[3],
            _ = n[4],
            f = n[5];
          return (
            (e[0] = r * u + i * l),
            (e[1] = o * u + a * l),
            (e[2] = r * h + i * d),
            (e[3] = o * h + a * d),
            (e[4] = r * _ + i * f + s),
            (e[5] = o * _ + a * f + c),
            e
          );
        }
        function k(e, t, n) {
          var r = t[0],
            o = t[1],
            i = t[2],
            a = t[3],
            s = t[4],
            c = t[5],
            u = Math.sin(n),
            l = Math.cos(n);
          return (
            (e[0] = r * l + i * u),
            (e[1] = o * l + a * u),
            (e[2] = r * -u + i * l),
            (e[3] = o * -u + a * l),
            (e[4] = s),
            (e[5] = c),
            e
          );
        }
        function H(e, t, n) {
          var r = t[0],
            o = t[1],
            i = t[2],
            a = t[3],
            s = t[4],
            c = t[5],
            u = n[0],
            l = n[1];
          return (
            (e[0] = r * u),
            (e[1] = o * u),
            (e[2] = i * l),
            (e[3] = a * l),
            (e[4] = s),
            (e[5] = c),
            e
          );
        }
        function Y(e, t, n) {
          var r = t[0],
            o = t[1],
            i = t[2],
            a = t[3],
            s = t[4],
            c = t[5],
            u = n[0],
            l = n[1];
          return (
            (e[0] = r),
            (e[1] = o),
            (e[2] = i),
            (e[3] = a),
            (e[4] = r * u + i * l + s),
            (e[5] = o * u + a * l + c),
            e
          );
        }
        function j(e, t) {
          var n = Math.sin(t),
            r = Math.cos(t);
          return (
            (e[0] = r),
            (e[1] = n),
            (e[2] = -n),
            (e[3] = r),
            (e[4] = 0),
            (e[5] = 0),
            e
          );
        }
        function W(e, t) {
          return (
            (e[0] = t[0]),
            (e[1] = 0),
            (e[2] = 0),
            (e[3] = t[1]),
            (e[4] = 0),
            (e[5] = 0),
            e
          );
        }
        function q(e, t) {
          return (
            (e[0] = 1),
            (e[1] = 0),
            (e[2] = 0),
            (e[3] = 1),
            (e[4] = t[0]),
            (e[5] = t[1]),
            e
          );
        }
        function K(e) {
          return (
            "mat2d(" +
            e[0] +
            ", " +
            e[1] +
            ", " +
            e[2] +
            ", " +
            e[3] +
            ", " +
            e[4] +
            ", " +
            e[5] +
            ")"
          );
        }
        function Z(e) {
          return Math.hypot(e[0], e[1], e[2], e[3], e[4], e[5], 1);
        }
        function Q(e, t, n) {
          return (
            (e[0] = t[0] + n[0]),
            (e[1] = t[1] + n[1]),
            (e[2] = t[2] + n[2]),
            (e[3] = t[3] + n[3]),
            (e[4] = t[4] + n[4]),
            (e[5] = t[5] + n[5]),
            e
          );
        }
        function J(e, t, n) {
          return (
            (e[0] = t[0] - n[0]),
            (e[1] = t[1] - n[1]),
            (e[2] = t[2] - n[2]),
            (e[3] = t[3] - n[3]),
            (e[4] = t[4] - n[4]),
            (e[5] = t[5] - n[5]),
            e
          );
        }
        function $(e, t, n) {
          return (
            (e[0] = t[0] * n),
            (e[1] = t[1] * n),
            (e[2] = t[2] * n),
            (e[3] = t[3] * n),
            (e[4] = t[4] * n),
            (e[5] = t[5] * n),
            e
          );
        }
        function ee(e, t, n, r) {
          return (
            (e[0] = t[0] + n[0] * r),
            (e[1] = t[1] + n[1] * r),
            (e[2] = t[2] + n[2] * r),
            (e[3] = t[3] + n[3] * r),
            (e[4] = t[4] + n[4] * r),
            (e[5] = t[5] + n[5] * r),
            e
          );
        }
        function te(e, t) {
          return (
            e[0] === t[0] &&
            e[1] === t[1] &&
            e[2] === t[2] &&
            e[3] === t[3] &&
            e[4] === t[4] &&
            e[5] === t[5]
          );
        }
        function ne(e, t) {
          var n = e[0],
            r = e[1],
            o = e[2],
            i = e[3],
            a = e[4],
            c = e[5],
            u = t[0],
            l = t[1],
            h = t[2],
            d = t[3],
            _ = t[4],
            f = t[5];
          return (
            Math.abs(n - u) <=
              s.EPSILON * Math.max(1, Math.abs(n), Math.abs(u)) &&
            Math.abs(r - l) <=
              s.EPSILON * Math.max(1, Math.abs(r), Math.abs(l)) &&
            Math.abs(o - h) <=
              s.EPSILON * Math.max(1, Math.abs(o), Math.abs(h)) &&
            Math.abs(i - d) <=
              s.EPSILON * Math.max(1, Math.abs(i), Math.abs(d)) &&
            Math.abs(a - _) <=
              s.EPSILON * Math.max(1, Math.abs(a), Math.abs(_)) &&
            Math.abs(c - f) <= s.EPSILON * Math.max(1, Math.abs(c), Math.abs(f))
          );
        }
        var re = X,
          oe = J,
          ie = n(409),
          ae = n(684),
          se = n(221);
        function ce() {
          var e = new s.ARRAY_TYPE(8);
          return (
            s.ARRAY_TYPE != Float32Array &&
              ((e[0] = 0),
              (e[1] = 0),
              (e[2] = 0),
              (e[4] = 0),
              (e[5] = 0),
              (e[6] = 0),
              (e[7] = 0)),
            (e[3] = 1),
            e
          );
        }
        function ue(e) {
          var t = new s.ARRAY_TYPE(8);
          return (
            (t[0] = e[0]),
            (t[1] = e[1]),
            (t[2] = e[2]),
            (t[3] = e[3]),
            (t[4] = e[4]),
            (t[5] = e[5]),
            (t[6] = e[6]),
            (t[7] = e[7]),
            t
          );
        }
        function le(e, t, n, r, o, i, a, c) {
          var u = new s.ARRAY_TYPE(8);
          return (
            (u[0] = e),
            (u[1] = t),
            (u[2] = n),
            (u[3] = r),
            (u[4] = o),
            (u[5] = i),
            (u[6] = a),
            (u[7] = c),
            u
          );
        }
        function he(e, t, n, r, o, i, a) {
          var c = new s.ARRAY_TYPE(8);
          (c[0] = e), (c[1] = t), (c[2] = n), (c[3] = r);
          var u = 0.5 * o,
            l = 0.5 * i,
            h = 0.5 * a;
          return (
            (c[4] = u * r + l * n - h * t),
            (c[5] = l * r + h * e - u * n),
            (c[6] = h * r + u * t - l * e),
            (c[7] = -u * e - l * t - h * n),
            c
          );
        }
        function de(e, t, n) {
          var r = 0.5 * n[0],
            o = 0.5 * n[1],
            i = 0.5 * n[2],
            a = t[0],
            s = t[1],
            c = t[2],
            u = t[3];
          return (
            (e[0] = a),
            (e[1] = s),
            (e[2] = c),
            (e[3] = u),
            (e[4] = r * u + o * c - i * s),
            (e[5] = o * u + i * a - r * c),
            (e[6] = i * u + r * s - o * a),
            (e[7] = -r * a - o * s - i * c),
            e
          );
        }
        function _e(e, t) {
          return (
            (e[0] = 0),
            (e[1] = 0),
            (e[2] = 0),
            (e[3] = 1),
            (e[4] = 0.5 * t[0]),
            (e[5] = 0.5 * t[1]),
            (e[6] = 0.5 * t[2]),
            (e[7] = 0),
            e
          );
        }
        function fe(e, t) {
          return (
            (e[0] = t[0]),
            (e[1] = t[1]),
            (e[2] = t[2]),
            (e[3] = t[3]),
            (e[4] = 0),
            (e[5] = 0),
            (e[6] = 0),
            (e[7] = 0),
            e
          );
        }
        function pe(e, t) {
          var n = se.create();
          ae.getRotation(n, t);
          var r = new s.ARRAY_TYPE(3);
          return ae.getTranslation(r, t), de(e, n, r), e;
        }
        function me(e, t) {
          return (
            (e[0] = t[0]),
            (e[1] = t[1]),
            (e[2] = t[2]),
            (e[3] = t[3]),
            (e[4] = t[4]),
            (e[5] = t[5]),
            (e[6] = t[6]),
            (e[7] = t[7]),
            e
          );
        }
        function Ee(e) {
          return (
            (e[0] = 0),
            (e[1] = 0),
            (e[2] = 0),
            (e[3] = 1),
            (e[4] = 0),
            (e[5] = 0),
            (e[6] = 0),
            (e[7] = 0),
            e
          );
        }
        function ve(e, t, n, r, o, i, a, s, c) {
          return (
            (e[0] = t),
            (e[1] = n),
            (e[2] = r),
            (e[3] = o),
            (e[4] = i),
            (e[5] = a),
            (e[6] = s),
            (e[7] = c),
            e
          );
        }
        var ge = se.copy;
        function xe(e, t) {
          return (e[0] = t[4]), (e[1] = t[5]), (e[2] = t[6]), (e[3] = t[7]), e;
        }
        var Te = se.copy;
        function be(e, t) {
          return (e[4] = t[0]), (e[5] = t[1]), (e[6] = t[2]), (e[7] = t[3]), e;
        }
        function Ae(e, t) {
          var n = t[4],
            r = t[5],
            o = t[6],
            i = t[7],
            a = -t[0],
            s = -t[1],
            c = -t[2],
            u = t[3];
          return (
            (e[0] = 2 * (n * u + i * a + r * c - o * s)),
            (e[1] = 2 * (r * u + i * s + o * a - n * c)),
            (e[2] = 2 * (o * u + i * c + n * s - r * a)),
            e
          );
        }
        function ye(e, t, n) {
          var r = t[0],
            o = t[1],
            i = t[2],
            a = t[3],
            s = 0.5 * n[0],
            c = 0.5 * n[1],
            u = 0.5 * n[2],
            l = t[4],
            h = t[5],
            d = t[6],
            _ = t[7];
          return (
            (e[0] = r),
            (e[1] = o),
            (e[2] = i),
            (e[3] = a),
            (e[4] = a * s + o * u - i * c + l),
            (e[5] = a * c + i * s - r * u + h),
            (e[6] = a * u + r * c - o * s + d),
            (e[7] = -r * s - o * c - i * u + _),
            e
          );
        }
        function Re(e, t, n) {
          var r = -t[0],
            o = -t[1],
            i = -t[2],
            a = t[3],
            s = t[4],
            c = t[5],
            u = t[6],
            l = t[7],
            h = s * a + l * r + c * i - u * o,
            d = c * a + l * o + u * r - s * i,
            _ = u * a + l * i + s * o - c * r,
            f = l * a - s * r - c * o - u * i;
          return (
            se.rotateX(e, t, n),
            (r = e[0]),
            (o = e[1]),
            (i = e[2]),
            (a = e[3]),
            (e[4] = h * a + f * r + d * i - _ * o),
            (e[5] = d * a + f * o + _ * r - h * i),
            (e[6] = _ * a + f * i + h * o - d * r),
            (e[7] = f * a - h * r - d * o - _ * i),
            e
          );
        }
        function Me(e, t, n) {
          var r = -t[0],
            o = -t[1],
            i = -t[2],
            a = t[3],
            s = t[4],
            c = t[5],
            u = t[6],
            l = t[7],
            h = s * a + l * r + c * i - u * o,
            d = c * a + l * o + u * r - s * i,
            _ = u * a + l * i + s * o - c * r,
            f = l * a - s * r - c * o - u * i;
          return (
            se.rotateY(e, t, n),
            (r = e[0]),
            (o = e[1]),
            (i = e[2]),
            (a = e[3]),
            (e[4] = h * a + f * r + d * i - _ * o),
            (e[5] = d * a + f * o + _ * r - h * i),
            (e[6] = _ * a + f * i + h * o - d * r),
            (e[7] = f * a - h * r - d * o - _ * i),
            e
          );
        }
        function Se(e, t, n) {
          var r = -t[0],
            o = -t[1],
            i = -t[2],
            a = t[3],
            s = t[4],
            c = t[5],
            u = t[6],
            l = t[7],
            h = s * a + l * r + c * i - u * o,
            d = c * a + l * o + u * r - s * i,
            _ = u * a + l * i + s * o - c * r,
            f = l * a - s * r - c * o - u * i;
          return (
            se.rotateZ(e, t, n),
            (r = e[0]),
            (o = e[1]),
            (i = e[2]),
            (a = e[3]),
            (e[4] = h * a + f * r + d * i - _ * o),
            (e[5] = d * a + f * o + _ * r - h * i),
            (e[6] = _ * a + f * i + h * o - d * r),
            (e[7] = f * a - h * r - d * o - _ * i),
            e
          );
        }
        function Ce(e, t, n) {
          var r = n[0],
            o = n[1],
            i = n[2],
            a = n[3],
            s = t[0],
            c = t[1],
            u = t[2],
            l = t[3];
          return (
            (e[0] = s * a + l * r + c * i - u * o),
            (e[1] = c * a + l * o + u * r - s * i),
            (e[2] = u * a + l * i + s * o - c * r),
            (e[3] = l * a - s * r - c * o - u * i),
            (s = t[4]),
            (c = t[5]),
            (u = t[6]),
            (l = t[7]),
            (e[4] = s * a + l * r + c * i - u * o),
            (e[5] = c * a + l * o + u * r - s * i),
            (e[6] = u * a + l * i + s * o - c * r),
            (e[7] = l * a - s * r - c * o - u * i),
            e
          );
        }
        function we(e, t, n) {
          var r = t[0],
            o = t[1],
            i = t[2],
            a = t[3],
            s = n[0],
            c = n[1],
            u = n[2],
            l = n[3];
          return (
            (e[0] = r * l + a * s + o * u - i * c),
            (e[1] = o * l + a * c + i * s - r * u),
            (e[2] = i * l + a * u + r * c - o * s),
            (e[3] = a * l - r * s - o * c - i * u),
            (s = n[4]),
            (c = n[5]),
            (u = n[6]),
            (l = n[7]),
            (e[4] = r * l + a * s + o * u - i * c),
            (e[5] = o * l + a * c + i * s - r * u),
            (e[6] = i * l + a * u + r * c - o * s),
            (e[7] = a * l - r * s - o * c - i * u),
            e
          );
        }
        function Le(e, t, n, r) {
          if (Math.abs(r) < s.EPSILON) return me(e, t);
          var o = Math.hypot(n[0], n[1], n[2]);
          r *= 0.5;
          var i = Math.sin(r),
            a = (i * n[0]) / o,
            c = (i * n[1]) / o,
            u = (i * n[2]) / o,
            l = Math.cos(r),
            h = t[0],
            d = t[1],
            _ = t[2],
            f = t[3];
          (e[0] = h * l + f * a + d * u - _ * c),
            (e[1] = d * l + f * c + _ * a - h * u),
            (e[2] = _ * l + f * u + h * c - d * a),
            (e[3] = f * l - h * a - d * c - _ * u);
          var p = t[4],
            m = t[5],
            E = t[6],
            v = t[7];
          return (
            (e[4] = p * l + v * a + m * u - E * c),
            (e[5] = m * l + v * c + E * a - p * u),
            (e[6] = E * l + v * u + p * c - m * a),
            (e[7] = v * l - p * a - m * c - E * u),
            e
          );
        }
        function Ne(e, t, n) {
          return (
            (e[0] = t[0] + n[0]),
            (e[1] = t[1] + n[1]),
            (e[2] = t[2] + n[2]),
            (e[3] = t[3] + n[3]),
            (e[4] = t[4] + n[4]),
            (e[5] = t[5] + n[5]),
            (e[6] = t[6] + n[6]),
            (e[7] = t[7] + n[7]),
            e
          );
        }
        function Ie(e, t, n) {
          var r = t[0],
            o = t[1],
            i = t[2],
            a = t[3],
            s = n[4],
            c = n[5],
            u = n[6],
            l = n[7],
            h = t[4],
            d = t[5],
            _ = t[6],
            f = t[7],
            p = n[0],
            m = n[1],
            E = n[2],
            v = n[3];
          return (
            (e[0] = r * v + a * p + o * E - i * m),
            (e[1] = o * v + a * m + i * p - r * E),
            (e[2] = i * v + a * E + r * m - o * p),
            (e[3] = a * v - r * p - o * m - i * E),
            (e[4] =
              r * l + a * s + o * u - i * c + h * v + f * p + d * E - _ * m),
            (e[5] =
              o * l + a * c + i * s - r * u + d * v + f * m + _ * p - h * E),
            (e[6] =
              i * l + a * u + r * c - o * s + _ * v + f * E + h * m - d * p),
            (e[7] =
              a * l - r * s - o * c - i * u + f * v - h * p - d * m - _ * E),
            e
          );
        }
        var Oe = Ie;
        function Pe(e, t, n) {
          return (
            (e[0] = t[0] * n),
            (e[1] = t[1] * n),
            (e[2] = t[2] * n),
            (e[3] = t[3] * n),
            (e[4] = t[4] * n),
            (e[5] = t[5] * n),
            (e[6] = t[6] * n),
            (e[7] = t[7] * n),
            e
          );
        }
        var Fe = se.dot;
        function Ue(e, t, n, r) {
          var o = 1 - r;
          return (
            Fe(t, n) < 0 && (r = -r),
            (e[0] = t[0] * o + n[0] * r),
            (e[1] = t[1] * o + n[1] * r),
            (e[2] = t[2] * o + n[2] * r),
            (e[3] = t[3] * o + n[3] * r),
            (e[4] = t[4] * o + n[4] * r),
            (e[5] = t[5] * o + n[5] * r),
            (e[6] = t[6] * o + n[6] * r),
            (e[7] = t[7] * o + n[7] * r),
            e
          );
        }
        function De(e, t) {
          var n = Ve(t);
          return (
            (e[0] = -t[0] / n),
            (e[1] = -t[1] / n),
            (e[2] = -t[2] / n),
            (e[3] = t[3] / n),
            (e[4] = -t[4] / n),
            (e[5] = -t[5] / n),
            (e[6] = -t[6] / n),
            (e[7] = t[7] / n),
            e
          );
        }
        function Be(e, t) {
          return (
            (e[0] = -t[0]),
            (e[1] = -t[1]),
            (e[2] = -t[2]),
            (e[3] = t[3]),
            (e[4] = -t[4]),
            (e[5] = -t[5]),
            (e[6] = -t[6]),
            (e[7] = t[7]),
            e
          );
        }
        var ze = se.length,
          Ge = ze,
          Ve = se.squaredLength,
          Xe = Ve;
        function ke(e, t) {
          var n = Ve(t);
          if (n > 0) {
            n = Math.sqrt(n);
            var r = t[0] / n,
              o = t[1] / n,
              i = t[2] / n,
              a = t[3] / n,
              s = t[4],
              c = t[5],
              u = t[6],
              l = t[7],
              h = r * s + o * c + i * u + a * l;
            (e[0] = r),
              (e[1] = o),
              (e[2] = i),
              (e[3] = a),
              (e[4] = (s - r * h) / n),
              (e[5] = (c - o * h) / n),
              (e[6] = (u - i * h) / n),
              (e[7] = (l - a * h) / n);
          }
          return e;
        }
        function He(e) {
          return (
            "quat2(" +
            e[0] +
            ", " +
            e[1] +
            ", " +
            e[2] +
            ", " +
            e[3] +
            ", " +
            e[4] +
            ", " +
            e[5] +
            ", " +
            e[6] +
            ", " +
            e[7] +
            ")"
          );
        }
        function Ye(e, t) {
          return (
            e[0] === t[0] &&
            e[1] === t[1] &&
            e[2] === t[2] &&
            e[3] === t[3] &&
            e[4] === t[4] &&
            e[5] === t[5] &&
            e[6] === t[6] &&
            e[7] === t[7]
          );
        }
        function je(e, t) {
          var n = e[0],
            r = e[1],
            o = e[2],
            i = e[3],
            a = e[4],
            c = e[5],
            u = e[6],
            l = e[7],
            h = t[0],
            d = t[1],
            _ = t[2],
            f = t[3],
            p = t[4],
            m = t[5],
            E = t[6],
            v = t[7];
          return (
            Math.abs(n - h) <=
              s.EPSILON * Math.max(1, Math.abs(n), Math.abs(h)) &&
            Math.abs(r - d) <=
              s.EPSILON * Math.max(1, Math.abs(r), Math.abs(d)) &&
            Math.abs(o - _) <=
              s.EPSILON * Math.max(1, Math.abs(o), Math.abs(_)) &&
            Math.abs(i - f) <=
              s.EPSILON * Math.max(1, Math.abs(i), Math.abs(f)) &&
            Math.abs(a - p) <=
              s.EPSILON * Math.max(1, Math.abs(a), Math.abs(p)) &&
            Math.abs(c - m) <=
              s.EPSILON * Math.max(1, Math.abs(c), Math.abs(m)) &&
            Math.abs(u - E) <=
              s.EPSILON * Math.max(1, Math.abs(u), Math.abs(E)) &&
            Math.abs(l - v) <= s.EPSILON * Math.max(1, Math.abs(l), Math.abs(v))
          );
        }
        function We() {
          var e = new s.ARRAY_TYPE(2);
          return s.ARRAY_TYPE != Float32Array && ((e[0] = 0), (e[1] = 0)), e;
        }
        function qe(e) {
          var t = new s.ARRAY_TYPE(2);
          return (t[0] = e[0]), (t[1] = e[1]), t;
        }
        function Ke(e, t) {
          var n = new s.ARRAY_TYPE(2);
          return (n[0] = e), (n[1] = t), n;
        }
        function Ze(e, t) {
          return (e[0] = t[0]), (e[1] = t[1]), e;
        }
        function Qe(e, t, n) {
          return (e[0] = t), (e[1] = n), e;
        }
        function Je(e, t, n) {
          return (e[0] = t[0] + n[0]), (e[1] = t[1] + n[1]), e;
        }
        function $e(e, t, n) {
          return (e[0] = t[0] - n[0]), (e[1] = t[1] - n[1]), e;
        }
        function et(e, t, n) {
          return (e[0] = t[0] * n[0]), (e[1] = t[1] * n[1]), e;
        }
        function tt(e, t, n) {
          return (e[0] = t[0] / n[0]), (e[1] = t[1] / n[1]), e;
        }
        function nt(e, t) {
          return (e[0] = Math.ceil(t[0])), (e[1] = Math.ceil(t[1])), e;
        }
        function rt(e, t) {
          return (e[0] = Math.floor(t[0])), (e[1] = Math.floor(t[1])), e;
        }
        function ot(e, t, n) {
          return (
            (e[0] = Math.min(t[0], n[0])), (e[1] = Math.min(t[1], n[1])), e
          );
        }
        function it(e, t, n) {
          return (
            (e[0] = Math.max(t[0], n[0])), (e[1] = Math.max(t[1], n[1])), e
          );
        }
        function at(e, t) {
          return (e[0] = Math.round(t[0])), (e[1] = Math.round(t[1])), e;
        }
        function st(e, t, n) {
          return (e[0] = t[0] * n), (e[1] = t[1] * n), e;
        }
        function ct(e, t, n, r) {
          return (e[0] = t[0] + n[0] * r), (e[1] = t[1] + n[1] * r), e;
        }
        function ut(e, t) {
          var n = t[0] - e[0],
            r = t[1] - e[1];
          return Math.hypot(n, r);
        }
        function lt(e, t) {
          var n = t[0] - e[0],
            r = t[1] - e[1];
          return n * n + r * r;
        }
        function ht(e) {
          var t = e[0],
            n = e[1];
          return Math.hypot(t, n);
        }
        function dt(e) {
          var t = e[0],
            n = e[1];
          return t * t + n * n;
        }
        function _t(e, t) {
          return (e[0] = -t[0]), (e[1] = -t[1]), e;
        }
        function ft(e, t) {
          return (e[0] = 1 / t[0]), (e[1] = 1 / t[1]), e;
        }
        function pt(e, t) {
          var n = t[0],
            r = t[1],
            o = n * n + r * r;
          return (
            o > 0 && (o = 1 / Math.sqrt(o)),
            (e[0] = t[0] * o),
            (e[1] = t[1] * o),
            e
          );
        }
        function mt(e, t) {
          return e[0] * t[0] + e[1] * t[1];
        }
        function Et(e, t, n) {
          var r = t[0] * n[1] - t[1] * n[0];
          return (e[0] = e[1] = 0), (e[2] = r), e;
        }
        function vt(e, t, n, r) {
          var o = t[0],
            i = t[1];
          return (e[0] = o + r * (n[0] - o)), (e[1] = i + r * (n[1] - i)), e;
        }
        function gt(e, t) {
          t = t || 1;
          var n = 2 * s.RANDOM() * Math.PI;
          return (e[0] = Math.cos(n) * t), (e[1] = Math.sin(n) * t), e;
        }
        function xt(e, t, n) {
          var r = t[0],
            o = t[1];
          return (e[0] = n[0] * r + n[2] * o), (e[1] = n[1] * r + n[3] * o), e;
        }
        function Tt(e, t, n) {
          var r = t[0],
            o = t[1];
          return (
            (e[0] = n[0] * r + n[2] * o + n[4]),
            (e[1] = n[1] * r + n[3] * o + n[5]),
            e
          );
        }
        function bt(e, t, n) {
          var r = t[0],
            o = t[1];
          return (
            (e[0] = n[0] * r + n[3] * o + n[6]),
            (e[1] = n[1] * r + n[4] * o + n[7]),
            e
          );
        }
        function At(e, t, n) {
          var r = t[0],
            o = t[1];
          return (
            (e[0] = n[0] * r + n[4] * o + n[12]),
            (e[1] = n[1] * r + n[5] * o + n[13]),
            e
          );
        }
        function yt(e, t, n, r) {
          var o = t[0] - n[0],
            i = t[1] - n[1],
            a = Math.sin(r),
            s = Math.cos(r);
          return (
            (e[0] = o * s - i * a + n[0]), (e[1] = o * a + i * s + n[1]), e
          );
        }
        function Rt(e, t) {
          var n = e[0],
            r = e[1],
            o = t[0],
            i = t[1],
            a = Math.sqrt(n * n + r * r) * Math.sqrt(o * o + i * i),
            s = a && (n * o + r * i) / a;
          return Math.acos(Math.min(Math.max(s, -1), 1));
        }
        function Mt(e) {
          return (e[0] = 0), (e[1] = 0), e;
        }
        function St(e) {
          return "vec2(" + e[0] + ", " + e[1] + ")";
        }
        function Ct(e, t) {
          return e[0] === t[0] && e[1] === t[1];
        }
        function wt(e, t) {
          var n = e[0],
            r = e[1],
            o = t[0],
            i = t[1];
          return (
            Math.abs(n - o) <=
              s.EPSILON * Math.max(1, Math.abs(n), Math.abs(o)) &&
            Math.abs(r - i) <= s.EPSILON * Math.max(1, Math.abs(r), Math.abs(i))
          );
        }
        var Lt,
          Nt = ht,
          It = $e,
          Ot = et,
          Pt = tt,
          Ft = ut,
          Ut = lt,
          Dt = dt,
          Bt =
            ((Lt = We()),
            function (e, t, n, r, o, i) {
              var a, s;
              for (
                t || (t = 2),
                  n || (n = 0),
                  s = r ? Math.min(r * t + n, e.length) : e.length,
                  a = n;
                a < s;
                a += t
              )
                (Lt[0] = e[a]),
                  (Lt[1] = e[a + 1]),
                  o(Lt, Lt, i),
                  (e[a] = Lt[0]),
                  (e[a + 1] = Lt[1]);
              return e;
            }),
          zt = n(329),
          Gt = n(796);
      },
      409: (e, t, n) => {
        "use strict";
        n.r(t),
          n.d(t, {
            add: () => C,
            adjoint: () => _,
            clone: () => a,
            copy: () => s,
            create: () => o,
            determinant: () => f,
            equals: () => O,
            exactEquals: () => I,
            frob: () => S,
            fromMat2d: () => b,
            fromMat4: () => i,
            fromQuat: () => A,
            fromRotation: () => x,
            fromScaling: () => T,
            fromTranslation: () => g,
            fromValues: () => c,
            identity: () => l,
            invert: () => d,
            mul: () => P,
            multiply: () => p,
            multiplyScalar: () => L,
            multiplyScalarAndAdd: () => N,
            normalFromMat4: () => y,
            projection: () => R,
            rotate: () => E,
            scale: () => v,
            set: () => u,
            str: () => M,
            sub: () => F,
            subtract: () => w,
            translate: () => m,
            transpose: () => h,
          });
        var r = n(823);
        function o() {
          var e = new r.ARRAY_TYPE(9);
          return (
            r.ARRAY_TYPE != Float32Array &&
              ((e[1] = 0),
              (e[2] = 0),
              (e[3] = 0),
              (e[5] = 0),
              (e[6] = 0),
              (e[7] = 0)),
            (e[0] = 1),
            (e[4] = 1),
            (e[8] = 1),
            e
          );
        }
        function i(e, t) {
          return (
            (e[0] = t[0]),
            (e[1] = t[1]),
            (e[2] = t[2]),
            (e[3] = t[4]),
            (e[4] = t[5]),
            (e[5] = t[6]),
            (e[6] = t[8]),
            (e[7] = t[9]),
            (e[8] = t[10]),
            e
          );
        }
        function a(e) {
          var t = new r.ARRAY_TYPE(9);
          return (
            (t[0] = e[0]),
            (t[1] = e[1]),
            (t[2] = e[2]),
            (t[3] = e[3]),
            (t[4] = e[4]),
            (t[5] = e[5]),
            (t[6] = e[6]),
            (t[7] = e[7]),
            (t[8] = e[8]),
            t
          );
        }
        function s(e, t) {
          return (
            (e[0] = t[0]),
            (e[1] = t[1]),
            (e[2] = t[2]),
            (e[3] = t[3]),
            (e[4] = t[4]),
            (e[5] = t[5]),
            (e[6] = t[6]),
            (e[7] = t[7]),
            (e[8] = t[8]),
            e
          );
        }
        function c(e, t, n, o, i, a, s, c, u) {
          var l = new r.ARRAY_TYPE(9);
          return (
            (l[0] = e),
            (l[1] = t),
            (l[2] = n),
            (l[3] = o),
            (l[4] = i),
            (l[5] = a),
            (l[6] = s),
            (l[7] = c),
            (l[8] = u),
            l
          );
        }
        function u(e, t, n, r, o, i, a, s, c, u) {
          return (
            (e[0] = t),
            (e[1] = n),
            (e[2] = r),
            (e[3] = o),
            (e[4] = i),
            (e[5] = a),
            (e[6] = s),
            (e[7] = c),
            (e[8] = u),
            e
          );
        }
        function l(e) {
          return (
            (e[0] = 1),
            (e[1] = 0),
            (e[2] = 0),
            (e[3] = 0),
            (e[4] = 1),
            (e[5] = 0),
            (e[6] = 0),
            (e[7] = 0),
            (e[8] = 1),
            e
          );
        }
        function h(e, t) {
          if (e === t) {
            var n = t[1],
              r = t[2],
              o = t[5];
            (e[1] = t[3]),
              (e[2] = t[6]),
              (e[3] = n),
              (e[5] = t[7]),
              (e[6] = r),
              (e[7] = o);
          } else
            (e[0] = t[0]),
              (e[1] = t[3]),
              (e[2] = t[6]),
              (e[3] = t[1]),
              (e[4] = t[4]),
              (e[5] = t[7]),
              (e[6] = t[2]),
              (e[7] = t[5]),
              (e[8] = t[8]);
          return e;
        }
        function d(e, t) {
          var n = t[0],
            r = t[1],
            o = t[2],
            i = t[3],
            a = t[4],
            s = t[5],
            c = t[6],
            u = t[7],
            l = t[8],
            h = l * a - s * u,
            d = -l * i + s * c,
            _ = u * i - a * c,
            f = n * h + r * d + o * _;
          return f
            ? ((f = 1 / f),
              (e[0] = h * f),
              (e[1] = (-l * r + o * u) * f),
              (e[2] = (s * r - o * a) * f),
              (e[3] = d * f),
              (e[4] = (l * n - o * c) * f),
              (e[5] = (-s * n + o * i) * f),
              (e[6] = _ * f),
              (e[7] = (-u * n + r * c) * f),
              (e[8] = (a * n - r * i) * f),
              e)
            : null;
        }
        function _(e, t) {
          var n = t[0],
            r = t[1],
            o = t[2],
            i = t[3],
            a = t[4],
            s = t[5],
            c = t[6],
            u = t[7],
            l = t[8];
          return (
            (e[0] = a * l - s * u),
            (e[1] = o * u - r * l),
            (e[2] = r * s - o * a),
            (e[3] = s * c - i * l),
            (e[4] = n * l - o * c),
            (e[5] = o * i - n * s),
            (e[6] = i * u - a * c),
            (e[7] = r * c - n * u),
            (e[8] = n * a - r * i),
            e
          );
        }
        function f(e) {
          var t = e[0],
            n = e[1],
            r = e[2],
            o = e[3],
            i = e[4],
            a = e[5],
            s = e[6],
            c = e[7],
            u = e[8];
          return (
            t * (u * i - a * c) + n * (-u * o + a * s) + r * (c * o - i * s)
          );
        }
        function p(e, t, n) {
          var r = t[0],
            o = t[1],
            i = t[2],
            a = t[3],
            s = t[4],
            c = t[5],
            u = t[6],
            l = t[7],
            h = t[8],
            d = n[0],
            _ = n[1],
            f = n[2],
            p = n[3],
            m = n[4],
            E = n[5],
            v = n[6],
            g = n[7],
            x = n[8];
          return (
            (e[0] = d * r + _ * a + f * u),
            (e[1] = d * o + _ * s + f * l),
            (e[2] = d * i + _ * c + f * h),
            (e[3] = p * r + m * a + E * u),
            (e[4] = p * o + m * s + E * l),
            (e[5] = p * i + m * c + E * h),
            (e[6] = v * r + g * a + x * u),
            (e[7] = v * o + g * s + x * l),
            (e[8] = v * i + g * c + x * h),
            e
          );
        }
        function m(e, t, n) {
          var r = t[0],
            o = t[1],
            i = t[2],
            a = t[3],
            s = t[4],
            c = t[5],
            u = t[6],
            l = t[7],
            h = t[8],
            d = n[0],
            _ = n[1];
          return (
            (e[0] = r),
            (e[1] = o),
            (e[2] = i),
            (e[3] = a),
            (e[4] = s),
            (e[5] = c),
            (e[6] = d * r + _ * a + u),
            (e[7] = d * o + _ * s + l),
            (e[8] = d * i + _ * c + h),
            e
          );
        }
        function E(e, t, n) {
          var r = t[0],
            o = t[1],
            i = t[2],
            a = t[3],
            s = t[4],
            c = t[5],
            u = t[6],
            l = t[7],
            h = t[8],
            d = Math.sin(n),
            _ = Math.cos(n);
          return (
            (e[0] = _ * r + d * a),
            (e[1] = _ * o + d * s),
            (e[2] = _ * i + d * c),
            (e[3] = _ * a - d * r),
            (e[4] = _ * s - d * o),
            (e[5] = _ * c - d * i),
            (e[6] = u),
            (e[7] = l),
            (e[8] = h),
            e
          );
        }
        function v(e, t, n) {
          var r = n[0],
            o = n[1];
          return (
            (e[0] = r * t[0]),
            (e[1] = r * t[1]),
            (e[2] = r * t[2]),
            (e[3] = o * t[3]),
            (e[4] = o * t[4]),
            (e[5] = o * t[5]),
            (e[6] = t[6]),
            (e[7] = t[7]),
            (e[8] = t[8]),
            e
          );
        }
        function g(e, t) {
          return (
            (e[0] = 1),
            (e[1] = 0),
            (e[2] = 0),
            (e[3] = 0),
            (e[4] = 1),
            (e[5] = 0),
            (e[6] = t[0]),
            (e[7] = t[1]),
            (e[8] = 1),
            e
          );
        }
        function x(e, t) {
          var n = Math.sin(t),
            r = Math.cos(t);
          return (
            (e[0] = r),
            (e[1] = n),
            (e[2] = 0),
            (e[3] = -n),
            (e[4] = r),
            (e[5] = 0),
            (e[6] = 0),
            (e[7] = 0),
            (e[8] = 1),
            e
          );
        }
        function T(e, t) {
          return (
            (e[0] = t[0]),
            (e[1] = 0),
            (e[2] = 0),
            (e[3] = 0),
            (e[4] = t[1]),
            (e[5] = 0),
            (e[6] = 0),
            (e[7] = 0),
            (e[8] = 1),
            e
          );
        }
        function b(e, t) {
          return (
            (e[0] = t[0]),
            (e[1] = t[1]),
            (e[2] = 0),
            (e[3] = t[2]),
            (e[4] = t[3]),
            (e[5] = 0),
            (e[6] = t[4]),
            (e[7] = t[5]),
            (e[8] = 1),
            e
          );
        }
        function A(e, t) {
          var n = t[0],
            r = t[1],
            o = t[2],
            i = t[3],
            a = n + n,
            s = r + r,
            c = o + o,
            u = n * a,
            l = r * a,
            h = r * s,
            d = o * a,
            _ = o * s,
            f = o * c,
            p = i * a,
            m = i * s,
            E = i * c;
          return (
            (e[0] = 1 - h - f),
            (e[3] = l - E),
            (e[6] = d + m),
            (e[1] = l + E),
            (e[4] = 1 - u - f),
            (e[7] = _ - p),
            (e[2] = d - m),
            (e[5] = _ + p),
            (e[8] = 1 - u - h),
            e
          );
        }
        function y(e, t) {
          var n = t[0],
            r = t[1],
            o = t[2],
            i = t[3],
            a = t[4],
            s = t[5],
            c = t[6],
            u = t[7],
            l = t[8],
            h = t[9],
            d = t[10],
            _ = t[11],
            f = t[12],
            p = t[13],
            m = t[14],
            E = t[15],
            v = n * s - r * a,
            g = n * c - o * a,
            x = n * u - i * a,
            T = r * c - o * s,
            b = r * u - i * s,
            A = o * u - i * c,
            y = l * p - h * f,
            R = l * m - d * f,
            M = l * E - _ * f,
            S = h * m - d * p,
            C = h * E - _ * p,
            w = d * E - _ * m,
            L = v * w - g * C + x * S + T * M - b * R + A * y;
          return L
            ? ((L = 1 / L),
              (e[0] = (s * w - c * C + u * S) * L),
              (e[1] = (c * M - a * w - u * R) * L),
              (e[2] = (a * C - s * M + u * y) * L),
              (e[3] = (o * C - r * w - i * S) * L),
              (e[4] = (n * w - o * M + i * R) * L),
              (e[5] = (r * M - n * C - i * y) * L),
              (e[6] = (p * A - m * b + E * T) * L),
              (e[7] = (m * x - f * A - E * g) * L),
              (e[8] = (f * b - p * x + E * v) * L),
              e)
            : null;
        }
        function R(e, t, n) {
          return (
            (e[0] = 2 / t),
            (e[1] = 0),
            (e[2] = 0),
            (e[3] = 0),
            (e[4] = -2 / n),
            (e[5] = 0),
            (e[6] = -1),
            (e[7] = 1),
            (e[8] = 1),
            e
          );
        }
        function M(e) {
          return (
            "mat3(" +
            e[0] +
            ", " +
            e[1] +
            ", " +
            e[2] +
            ", " +
            e[3] +
            ", " +
            e[4] +
            ", " +
            e[5] +
            ", " +
            e[6] +
            ", " +
            e[7] +
            ", " +
            e[8] +
            ")"
          );
        }
        function S(e) {
          return Math.hypot(
            e[0],
            e[1],
            e[2],
            e[3],
            e[4],
            e[5],
            e[6],
            e[7],
            e[8]
          );
        }
        function C(e, t, n) {
          return (
            (e[0] = t[0] + n[0]),
            (e[1] = t[1] + n[1]),
            (e[2] = t[2] + n[2]),
            (e[3] = t[3] + n[3]),
            (e[4] = t[4] + n[4]),
            (e[5] = t[5] + n[5]),
            (e[6] = t[6] + n[6]),
            (e[7] = t[7] + n[7]),
            (e[8] = t[8] + n[8]),
            e
          );
        }
        function w(e, t, n) {
          return (
            (e[0] = t[0] - n[0]),
            (e[1] = t[1] - n[1]),
            (e[2] = t[2] - n[2]),
            (e[3] = t[3] - n[3]),
            (e[4] = t[4] - n[4]),
            (e[5] = t[5] - n[5]),
            (e[6] = t[6] - n[6]),
            (e[7] = t[7] - n[7]),
            (e[8] = t[8] - n[8]),
            e
          );
        }
        function L(e, t, n) {
          return (
            (e[0] = t[0] * n),
            (e[1] = t[1] * n),
            (e[2] = t[2] * n),
            (e[3] = t[3] * n),
            (e[4] = t[4] * n),
            (e[5] = t[5] * n),
            (e[6] = t[6] * n),
            (e[7] = t[7] * n),
            (e[8] = t[8] * n),
            e
          );
        }
        function N(e, t, n, r) {
          return (
            (e[0] = t[0] + n[0] * r),
            (e[1] = t[1] + n[1] * r),
            (e[2] = t[2] + n[2] * r),
            (e[3] = t[3] + n[3] * r),
            (e[4] = t[4] + n[4] * r),
            (e[5] = t[5] + n[5] * r),
            (e[6] = t[6] + n[6] * r),
            (e[7] = t[7] + n[7] * r),
            (e[8] = t[8] + n[8] * r),
            e
          );
        }
        function I(e, t) {
          return (
            e[0] === t[0] &&
            e[1] === t[1] &&
            e[2] === t[2] &&
            e[3] === t[3] &&
            e[4] === t[4] &&
            e[5] === t[5] &&
            e[6] === t[6] &&
            e[7] === t[7] &&
            e[8] === t[8]
          );
        }
        function O(e, t) {
          var n = e[0],
            o = e[1],
            i = e[2],
            a = e[3],
            s = e[4],
            c = e[5],
            u = e[6],
            l = e[7],
            h = e[8],
            d = t[0],
            _ = t[1],
            f = t[2],
            p = t[3],
            m = t[4],
            E = t[5],
            v = t[6],
            g = t[7],
            x = t[8];
          return (
            Math.abs(n - d) <=
              r.EPSILON * Math.max(1, Math.abs(n), Math.abs(d)) &&
            Math.abs(o - _) <=
              r.EPSILON * Math.max(1, Math.abs(o), Math.abs(_)) &&
            Math.abs(i - f) <=
              r.EPSILON * Math.max(1, Math.abs(i), Math.abs(f)) &&
            Math.abs(a - p) <=
              r.EPSILON * Math.max(1, Math.abs(a), Math.abs(p)) &&
            Math.abs(s - m) <=
              r.EPSILON * Math.max(1, Math.abs(s), Math.abs(m)) &&
            Math.abs(c - E) <=
              r.EPSILON * Math.max(1, Math.abs(c), Math.abs(E)) &&
            Math.abs(u - v) <=
              r.EPSILON * Math.max(1, Math.abs(u), Math.abs(v)) &&
            Math.abs(l - g) <=
              r.EPSILON * Math.max(1, Math.abs(l), Math.abs(g)) &&
            Math.abs(h - x) <= r.EPSILON * Math.max(1, Math.abs(h), Math.abs(x))
          );
        }
        var P = p,
          F = w;
      },
      684: (e, t, n) => {
        "use strict";
        n.r(t),
          n.d(t, {
            add: () => W,
            adjoint: () => d,
            clone: () => i,
            copy: () => a,
            create: () => o,
            determinant: () => _,
            equals: () => J,
            exactEquals: () => Q,
            frob: () => j,
            fromQuat: () => P,
            fromQuat2: () => C,
            fromRotation: () => A,
            fromRotationTranslation: () => S,
            fromRotationTranslationScale: () => I,
            fromRotationTranslationScaleOrigin: () => O,
            fromScaling: () => b,
            fromTranslation: () => T,
            fromValues: () => s,
            fromXRotation: () => y,
            fromYRotation: () => R,
            fromZRotation: () => M,
            frustum: () => F,
            getRotation: () => N,
            getScaling: () => L,
            getTranslation: () => w,
            identity: () => u,
            invert: () => h,
            lookAt: () => k,
            mul: () => $,
            multiply: () => f,
            multiplyScalar: () => K,
            multiplyScalarAndAdd: () => Z,
            ortho: () => V,
            orthoNO: () => G,
            orthoZO: () => X,
            perspective: () => D,
            perspectiveFromFieldOfView: () => z,
            perspectiveNO: () => U,
            perspectiveZO: () => B,
            rotate: () => E,
            rotateX: () => v,
            rotateY: () => g,
            rotateZ: () => x,
            scale: () => m,
            set: () => c,
            str: () => Y,
            sub: () => ee,
            subtract: () => q,
            targetTo: () => H,
            translate: () => p,
            transpose: () => l,
          });
        var r = n(823);
        function o() {
          var e = new r.ARRAY_TYPE(16);
          return (
            r.ARRAY_TYPE != Float32Array &&
              ((e[1] = 0),
              (e[2] = 0),
              (e[3] = 0),
              (e[4] = 0),
              (e[6] = 0),
              (e[7] = 0),
              (e[8] = 0),
              (e[9] = 0),
              (e[11] = 0),
              (e[12] = 0),
              (e[13] = 0),
              (e[14] = 0)),
            (e[0] = 1),
            (e[5] = 1),
            (e[10] = 1),
            (e[15] = 1),
            e
          );
        }
        function i(e) {
          var t = new r.ARRAY_TYPE(16);
          return (
            (t[0] = e[0]),
            (t[1] = e[1]),
            (t[2] = e[2]),
            (t[3] = e[3]),
            (t[4] = e[4]),
            (t[5] = e[5]),
            (t[6] = e[6]),
            (t[7] = e[7]),
            (t[8] = e[8]),
            (t[9] = e[9]),
            (t[10] = e[10]),
            (t[11] = e[11]),
            (t[12] = e[12]),
            (t[13] = e[13]),
            (t[14] = e[14]),
            (t[15] = e[15]),
            t
          );
        }
        function a(e, t) {
          return (
            (e[0] = t[0]),
            (e[1] = t[1]),
            (e[2] = t[2]),
            (e[3] = t[3]),
            (e[4] = t[4]),
            (e[5] = t[5]),
            (e[6] = t[6]),
            (e[7] = t[7]),
            (e[8] = t[8]),
            (e[9] = t[9]),
            (e[10] = t[10]),
            (e[11] = t[11]),
            (e[12] = t[12]),
            (e[13] = t[13]),
            (e[14] = t[14]),
            (e[15] = t[15]),
            e
          );
        }
        function s(e, t, n, o, i, a, s, c, u, l, h, d, _, f, p, m) {
          var E = new r.ARRAY_TYPE(16);
          return (
            (E[0] = e),
            (E[1] = t),
            (E[2] = n),
            (E[3] = o),
            (E[4] = i),
            (E[5] = a),
            (E[6] = s),
            (E[7] = c),
            (E[8] = u),
            (E[9] = l),
            (E[10] = h),
            (E[11] = d),
            (E[12] = _),
            (E[13] = f),
            (E[14] = p),
            (E[15] = m),
            E
          );
        }
        function c(e, t, n, r, o, i, a, s, c, u, l, h, d, _, f, p, m) {
          return (
            (e[0] = t),
            (e[1] = n),
            (e[2] = r),
            (e[3] = o),
            (e[4] = i),
            (e[5] = a),
            (e[6] = s),
            (e[7] = c),
            (e[8] = u),
            (e[9] = l),
            (e[10] = h),
            (e[11] = d),
            (e[12] = _),
            (e[13] = f),
            (e[14] = p),
            (e[15] = m),
            e
          );
        }
        function u(e) {
          return (
            (e[0] = 1),
            (e[1] = 0),
            (e[2] = 0),
            (e[3] = 0),
            (e[4] = 0),
            (e[5] = 1),
            (e[6] = 0),
            (e[7] = 0),
            (e[8] = 0),
            (e[9] = 0),
            (e[10] = 1),
            (e[11] = 0),
            (e[12] = 0),
            (e[13] = 0),
            (e[14] = 0),
            (e[15] = 1),
            e
          );
        }
        function l(e, t) {
          if (e === t) {
            var n = t[1],
              r = t[2],
              o = t[3],
              i = t[6],
              a = t[7],
              s = t[11];
            (e[1] = t[4]),
              (e[2] = t[8]),
              (e[3] = t[12]),
              (e[4] = n),
              (e[6] = t[9]),
              (e[7] = t[13]),
              (e[8] = r),
              (e[9] = i),
              (e[11] = t[14]),
              (e[12] = o),
              (e[13] = a),
              (e[14] = s);
          } else
            (e[0] = t[0]),
              (e[1] = t[4]),
              (e[2] = t[8]),
              (e[3] = t[12]),
              (e[4] = t[1]),
              (e[5] = t[5]),
              (e[6] = t[9]),
              (e[7] = t[13]),
              (e[8] = t[2]),
              (e[9] = t[6]),
              (e[10] = t[10]),
              (e[11] = t[14]),
              (e[12] = t[3]),
              (e[13] = t[7]),
              (e[14] = t[11]),
              (e[15] = t[15]);
          return e;
        }
        function h(e, t) {
          var n = t[0],
            r = t[1],
            o = t[2],
            i = t[3],
            a = t[4],
            s = t[5],
            c = t[6],
            u = t[7],
            l = t[8],
            h = t[9],
            d = t[10],
            _ = t[11],
            f = t[12],
            p = t[13],
            m = t[14],
            E = t[15],
            v = n * s - r * a,
            g = n * c - o * a,
            x = n * u - i * a,
            T = r * c - o * s,
            b = r * u - i * s,
            A = o * u - i * c,
            y = l * p - h * f,
            R = l * m - d * f,
            M = l * E - _ * f,
            S = h * m - d * p,
            C = h * E - _ * p,
            w = d * E - _ * m,
            L = v * w - g * C + x * S + T * M - b * R + A * y;
          return L
            ? ((L = 1 / L),
              (e[0] = (s * w - c * C + u * S) * L),
              (e[1] = (o * C - r * w - i * S) * L),
              (e[2] = (p * A - m * b + E * T) * L),
              (e[3] = (d * b - h * A - _ * T) * L),
              (e[4] = (c * M - a * w - u * R) * L),
              (e[5] = (n * w - o * M + i * R) * L),
              (e[6] = (m * x - f * A - E * g) * L),
              (e[7] = (l * A - d * x + _ * g) * L),
              (e[8] = (a * C - s * M + u * y) * L),
              (e[9] = (r * M - n * C - i * y) * L),
              (e[10] = (f * b - p * x + E * v) * L),
              (e[11] = (h * x - l * b - _ * v) * L),
              (e[12] = (s * R - a * S - c * y) * L),
              (e[13] = (n * S - r * R + o * y) * L),
              (e[14] = (p * g - f * T - m * v) * L),
              (e[15] = (l * T - h * g + d * v) * L),
              e)
            : null;
        }
        function d(e, t) {
          var n = t[0],
            r = t[1],
            o = t[2],
            i = t[3],
            a = t[4],
            s = t[5],
            c = t[6],
            u = t[7],
            l = t[8],
            h = t[9],
            d = t[10],
            _ = t[11],
            f = t[12],
            p = t[13],
            m = t[14],
            E = t[15];
          return (
            (e[0] =
              s * (d * E - _ * m) - h * (c * E - u * m) + p * (c * _ - u * d)),
            (e[1] = -(
              r * (d * E - _ * m) -
              h * (o * E - i * m) +
              p * (o * _ - i * d)
            )),
            (e[2] =
              r * (c * E - u * m) - s * (o * E - i * m) + p * (o * u - i * c)),
            (e[3] = -(
              r * (c * _ - u * d) -
              s * (o * _ - i * d) +
              h * (o * u - i * c)
            )),
            (e[4] = -(
              a * (d * E - _ * m) -
              l * (c * E - u * m) +
              f * (c * _ - u * d)
            )),
            (e[5] =
              n * (d * E - _ * m) - l * (o * E - i * m) + f * (o * _ - i * d)),
            (e[6] = -(
              n * (c * E - u * m) -
              a * (o * E - i * m) +
              f * (o * u - i * c)
            )),
            (e[7] =
              n * (c * _ - u * d) - a * (o * _ - i * d) + l * (o * u - i * c)),
            (e[8] =
              a * (h * E - _ * p) - l * (s * E - u * p) + f * (s * _ - u * h)),
            (e[9] = -(
              n * (h * E - _ * p) -
              l * (r * E - i * p) +
              f * (r * _ - i * h)
            )),
            (e[10] =
              n * (s * E - u * p) - a * (r * E - i * p) + f * (r * u - i * s)),
            (e[11] = -(
              n * (s * _ - u * h) -
              a * (r * _ - i * h) +
              l * (r * u - i * s)
            )),
            (e[12] = -(
              a * (h * m - d * p) -
              l * (s * m - c * p) +
              f * (s * d - c * h)
            )),
            (e[13] =
              n * (h * m - d * p) - l * (r * m - o * p) + f * (r * d - o * h)),
            (e[14] = -(
              n * (s * m - c * p) -
              a * (r * m - o * p) +
              f * (r * c - o * s)
            )),
            (e[15] =
              n * (s * d - c * h) - a * (r * d - o * h) + l * (r * c - o * s)),
            e
          );
        }
        function _(e) {
          var t = e[0],
            n = e[1],
            r = e[2],
            o = e[3],
            i = e[4],
            a = e[5],
            s = e[6],
            c = e[7],
            u = e[8],
            l = e[9],
            h = e[10],
            d = e[11],
            _ = e[12],
            f = e[13],
            p = e[14],
            m = e[15];
          return (
            (t * a - n * i) * (h * m - d * p) -
            (t * s - r * i) * (l * m - d * f) +
            (t * c - o * i) * (l * p - h * f) +
            (n * s - r * a) * (u * m - d * _) -
            (n * c - o * a) * (u * p - h * _) +
            (r * c - o * s) * (u * f - l * _)
          );
        }
        function f(e, t, n) {
          var r = t[0],
            o = t[1],
            i = t[2],
            a = t[3],
            s = t[4],
            c = t[5],
            u = t[6],
            l = t[7],
            h = t[8],
            d = t[9],
            _ = t[10],
            f = t[11],
            p = t[12],
            m = t[13],
            E = t[14],
            v = t[15],
            g = n[0],
            x = n[1],
            T = n[2],
            b = n[3];
          return (
            (e[0] = g * r + x * s + T * h + b * p),
            (e[1] = g * o + x * c + T * d + b * m),
            (e[2] = g * i + x * u + T * _ + b * E),
            (e[3] = g * a + x * l + T * f + b * v),
            (g = n[4]),
            (x = n[5]),
            (T = n[6]),
            (b = n[7]),
            (e[4] = g * r + x * s + T * h + b * p),
            (e[5] = g * o + x * c + T * d + b * m),
            (e[6] = g * i + x * u + T * _ + b * E),
            (e[7] = g * a + x * l + T * f + b * v),
            (g = n[8]),
            (x = n[9]),
            (T = n[10]),
            (b = n[11]),
            (e[8] = g * r + x * s + T * h + b * p),
            (e[9] = g * o + x * c + T * d + b * m),
            (e[10] = g * i + x * u + T * _ + b * E),
            (e[11] = g * a + x * l + T * f + b * v),
            (g = n[12]),
            (x = n[13]),
            (T = n[14]),
            (b = n[15]),
            (e[12] = g * r + x * s + T * h + b * p),
            (e[13] = g * o + x * c + T * d + b * m),
            (e[14] = g * i + x * u + T * _ + b * E),
            (e[15] = g * a + x * l + T * f + b * v),
            e
          );
        }
        function p(e, t, n) {
          var r,
            o,
            i,
            a,
            s,
            c,
            u,
            l,
            h,
            d,
            _,
            f,
            p = n[0],
            m = n[1],
            E = n[2];
          return (
            t === e
              ? ((e[12] = t[0] * p + t[4] * m + t[8] * E + t[12]),
                (e[13] = t[1] * p + t[5] * m + t[9] * E + t[13]),
                (e[14] = t[2] * p + t[6] * m + t[10] * E + t[14]),
                (e[15] = t[3] * p + t[7] * m + t[11] * E + t[15]))
              : ((r = t[0]),
                (o = t[1]),
                (i = t[2]),
                (a = t[3]),
                (s = t[4]),
                (c = t[5]),
                (u = t[6]),
                (l = t[7]),
                (h = t[8]),
                (d = t[9]),
                (_ = t[10]),
                (f = t[11]),
                (e[0] = r),
                (e[1] = o),
                (e[2] = i),
                (e[3] = a),
                (e[4] = s),
                (e[5] = c),
                (e[6] = u),
                (e[7] = l),
                (e[8] = h),
                (e[9] = d),
                (e[10] = _),
                (e[11] = f),
                (e[12] = r * p + s * m + h * E + t[12]),
                (e[13] = o * p + c * m + d * E + t[13]),
                (e[14] = i * p + u * m + _ * E + t[14]),
                (e[15] = a * p + l * m + f * E + t[15])),
            e
          );
        }
        function m(e, t, n) {
          var r = n[0],
            o = n[1],
            i = n[2];
          return (
            (e[0] = t[0] * r),
            (e[1] = t[1] * r),
            (e[2] = t[2] * r),
            (e[3] = t[3] * r),
            (e[4] = t[4] * o),
            (e[5] = t[5] * o),
            (e[6] = t[6] * o),
            (e[7] = t[7] * o),
            (e[8] = t[8] * i),
            (e[9] = t[9] * i),
            (e[10] = t[10] * i),
            (e[11] = t[11] * i),
            (e[12] = t[12]),
            (e[13] = t[13]),
            (e[14] = t[14]),
            (e[15] = t[15]),
            e
          );
        }
        function E(e, t, n, o) {
          var i,
            a,
            s,
            c,
            u,
            l,
            h,
            d,
            _,
            f,
            p,
            m,
            E,
            v,
            g,
            x,
            T,
            b,
            A,
            y,
            R,
            M,
            S,
            C,
            w = o[0],
            L = o[1],
            N = o[2],
            I = Math.hypot(w, L, N);
          return I < r.EPSILON
            ? null
            : ((w *= I = 1 / I),
              (L *= I),
              (N *= I),
              (i = Math.sin(n)),
              (s = 1 - (a = Math.cos(n))),
              (c = t[0]),
              (u = t[1]),
              (l = t[2]),
              (h = t[3]),
              (d = t[4]),
              (_ = t[5]),
              (f = t[6]),
              (p = t[7]),
              (m = t[8]),
              (E = t[9]),
              (v = t[10]),
              (g = t[11]),
              (x = w * w * s + a),
              (T = L * w * s + N * i),
              (b = N * w * s - L * i),
              (A = w * L * s - N * i),
              (y = L * L * s + a),
              (R = N * L * s + w * i),
              (M = w * N * s + L * i),
              (S = L * N * s - w * i),
              (C = N * N * s + a),
              (e[0] = c * x + d * T + m * b),
              (e[1] = u * x + _ * T + E * b),
              (e[2] = l * x + f * T + v * b),
              (e[3] = h * x + p * T + g * b),
              (e[4] = c * A + d * y + m * R),
              (e[5] = u * A + _ * y + E * R),
              (e[6] = l * A + f * y + v * R),
              (e[7] = h * A + p * y + g * R),
              (e[8] = c * M + d * S + m * C),
              (e[9] = u * M + _ * S + E * C),
              (e[10] = l * M + f * S + v * C),
              (e[11] = h * M + p * S + g * C),
              t !== e &&
                ((e[12] = t[12]),
                (e[13] = t[13]),
                (e[14] = t[14]),
                (e[15] = t[15])),
              e);
        }
        function v(e, t, n) {
          var r = Math.sin(n),
            o = Math.cos(n),
            i = t[4],
            a = t[5],
            s = t[6],
            c = t[7],
            u = t[8],
            l = t[9],
            h = t[10],
            d = t[11];
          return (
            t !== e &&
              ((e[0] = t[0]),
              (e[1] = t[1]),
              (e[2] = t[2]),
              (e[3] = t[3]),
              (e[12] = t[12]),
              (e[13] = t[13]),
              (e[14] = t[14]),
              (e[15] = t[15])),
            (e[4] = i * o + u * r),
            (e[5] = a * o + l * r),
            (e[6] = s * o + h * r),
            (e[7] = c * o + d * r),
            (e[8] = u * o - i * r),
            (e[9] = l * o - a * r),
            (e[10] = h * o - s * r),
            (e[11] = d * o - c * r),
            e
          );
        }
        function g(e, t, n) {
          var r = Math.sin(n),
            o = Math.cos(n),
            i = t[0],
            a = t[1],
            s = t[2],
            c = t[3],
            u = t[8],
            l = t[9],
            h = t[10],
            d = t[11];
          return (
            t !== e &&
              ((e[4] = t[4]),
              (e[5] = t[5]),
              (e[6] = t[6]),
              (e[7] = t[7]),
              (e[12] = t[12]),
              (e[13] = t[13]),
              (e[14] = t[14]),
              (e[15] = t[15])),
            (e[0] = i * o - u * r),
            (e[1] = a * o - l * r),
            (e[2] = s * o - h * r),
            (e[3] = c * o - d * r),
            (e[8] = i * r + u * o),
            (e[9] = a * r + l * o),
            (e[10] = s * r + h * o),
            (e[11] = c * r + d * o),
            e
          );
        }
        function x(e, t, n) {
          var r = Math.sin(n),
            o = Math.cos(n),
            i = t[0],
            a = t[1],
            s = t[2],
            c = t[3],
            u = t[4],
            l = t[5],
            h = t[6],
            d = t[7];
          return (
            t !== e &&
              ((e[8] = t[8]),
              (e[9] = t[9]),
              (e[10] = t[10]),
              (e[11] = t[11]),
              (e[12] = t[12]),
              (e[13] = t[13]),
              (e[14] = t[14]),
              (e[15] = t[15])),
            (e[0] = i * o + u * r),
            (e[1] = a * o + l * r),
            (e[2] = s * o + h * r),
            (e[3] = c * o + d * r),
            (e[4] = u * o - i * r),
            (e[5] = l * o - a * r),
            (e[6] = h * o - s * r),
            (e[7] = d * o - c * r),
            e
          );
        }
        function T(e, t) {
          return (
            (e[0] = 1),
            (e[1] = 0),
            (e[2] = 0),
            (e[3] = 0),
            (e[4] = 0),
            (e[5] = 1),
            (e[6] = 0),
            (e[7] = 0),
            (e[8] = 0),
            (e[9] = 0),
            (e[10] = 1),
            (e[11] = 0),
            (e[12] = t[0]),
            (e[13] = t[1]),
            (e[14] = t[2]),
            (e[15] = 1),
            e
          );
        }
        function b(e, t) {
          return (
            (e[0] = t[0]),
            (e[1] = 0),
            (e[2] = 0),
            (e[3] = 0),
            (e[4] = 0),
            (e[5] = t[1]),
            (e[6] = 0),
            (e[7] = 0),
            (e[8] = 0),
            (e[9] = 0),
            (e[10] = t[2]),
            (e[11] = 0),
            (e[12] = 0),
            (e[13] = 0),
            (e[14] = 0),
            (e[15] = 1),
            e
          );
        }
        function A(e, t, n) {
          var o,
            i,
            a,
            s = n[0],
            c = n[1],
            u = n[2],
            l = Math.hypot(s, c, u);
          return l < r.EPSILON
            ? null
            : ((s *= l = 1 / l),
              (c *= l),
              (u *= l),
              (o = Math.sin(t)),
              (a = 1 - (i = Math.cos(t))),
              (e[0] = s * s * a + i),
              (e[1] = c * s * a + u * o),
              (e[2] = u * s * a - c * o),
              (e[3] = 0),
              (e[4] = s * c * a - u * o),
              (e[5] = c * c * a + i),
              (e[6] = u * c * a + s * o),
              (e[7] = 0),
              (e[8] = s * u * a + c * o),
              (e[9] = c * u * a - s * o),
              (e[10] = u * u * a + i),
              (e[11] = 0),
              (e[12] = 0),
              (e[13] = 0),
              (e[14] = 0),
              (e[15] = 1),
              e);
        }
        function y(e, t) {
          var n = Math.sin(t),
            r = Math.cos(t);
          return (
            (e[0] = 1),
            (e[1] = 0),
            (e[2] = 0),
            (e[3] = 0),
            (e[4] = 0),
            (e[5] = r),
            (e[6] = n),
            (e[7] = 0),
            (e[8] = 0),
            (e[9] = -n),
            (e[10] = r),
            (e[11] = 0),
            (e[12] = 0),
            (e[13] = 0),
            (e[14] = 0),
            (e[15] = 1),
            e
          );
        }
        function R(e, t) {
          var n = Math.sin(t),
            r = Math.cos(t);
          return (
            (e[0] = r),
            (e[1] = 0),
            (e[2] = -n),
            (e[3] = 0),
            (e[4] = 0),
            (e[5] = 1),
            (e[6] = 0),
            (e[7] = 0),
            (e[8] = n),
            (e[9] = 0),
            (e[10] = r),
            (e[11] = 0),
            (e[12] = 0),
            (e[13] = 0),
            (e[14] = 0),
            (e[15] = 1),
            e
          );
        }
        function M(e, t) {
          var n = Math.sin(t),
            r = Math.cos(t);
          return (
            (e[0] = r),
            (e[1] = n),
            (e[2] = 0),
            (e[3] = 0),
            (e[4] = -n),
            (e[5] = r),
            (e[6] = 0),
            (e[7] = 0),
            (e[8] = 0),
            (e[9] = 0),
            (e[10] = 1),
            (e[11] = 0),
            (e[12] = 0),
            (e[13] = 0),
            (e[14] = 0),
            (e[15] = 1),
            e
          );
        }
        function S(e, t, n) {
          var r = t[0],
            o = t[1],
            i = t[2],
            a = t[3],
            s = r + r,
            c = o + o,
            u = i + i,
            l = r * s,
            h = r * c,
            d = r * u,
            _ = o * c,
            f = o * u,
            p = i * u,
            m = a * s,
            E = a * c,
            v = a * u;
          return (
            (e[0] = 1 - (_ + p)),
            (e[1] = h + v),
            (e[2] = d - E),
            (e[3] = 0),
            (e[4] = h - v),
            (e[5] = 1 - (l + p)),
            (e[6] = f + m),
            (e[7] = 0),
            (e[8] = d + E),
            (e[9] = f - m),
            (e[10] = 1 - (l + _)),
            (e[11] = 0),
            (e[12] = n[0]),
            (e[13] = n[1]),
            (e[14] = n[2]),
            (e[15] = 1),
            e
          );
        }
        function C(e, t) {
          var n = new r.ARRAY_TYPE(3),
            o = -t[0],
            i = -t[1],
            a = -t[2],
            s = t[3],
            c = t[4],
            u = t[5],
            l = t[6],
            h = t[7],
            d = o * o + i * i + a * a + s * s;
          return (
            d > 0
              ? ((n[0] = (2 * (c * s + h * o + u * a - l * i)) / d),
                (n[1] = (2 * (u * s + h * i + l * o - c * a)) / d),
                (n[2] = (2 * (l * s + h * a + c * i - u * o)) / d))
              : ((n[0] = 2 * (c * s + h * o + u * a - l * i)),
                (n[1] = 2 * (u * s + h * i + l * o - c * a)),
                (n[2] = 2 * (l * s + h * a + c * i - u * o))),
            S(e, t, n),
            e
          );
        }
        function w(e, t) {
          return (e[0] = t[12]), (e[1] = t[13]), (e[2] = t[14]), e;
        }
        function L(e, t) {
          var n = t[0],
            r = t[1],
            o = t[2],
            i = t[4],
            a = t[5],
            s = t[6],
            c = t[8],
            u = t[9],
            l = t[10];
          return (
            (e[0] = Math.hypot(n, r, o)),
            (e[1] = Math.hypot(i, a, s)),
            (e[2] = Math.hypot(c, u, l)),
            e
          );
        }
        function N(e, t) {
          var n = new r.ARRAY_TYPE(3);
          L(n, t);
          var o = 1 / n[0],
            i = 1 / n[1],
            a = 1 / n[2],
            s = t[0] * o,
            c = t[1] * i,
            u = t[2] * a,
            l = t[4] * o,
            h = t[5] * i,
            d = t[6] * a,
            _ = t[8] * o,
            f = t[9] * i,
            p = t[10] * a,
            m = s + h + p,
            E = 0;
          return (
            m > 0
              ? ((E = 2 * Math.sqrt(m + 1)),
                (e[3] = 0.25 * E),
                (e[0] = (d - f) / E),
                (e[1] = (_ - u) / E),
                (e[2] = (c - l) / E))
              : s > h && s > p
              ? ((E = 2 * Math.sqrt(1 + s - h - p)),
                (e[3] = (d - f) / E),
                (e[0] = 0.25 * E),
                (e[1] = (c + l) / E),
                (e[2] = (_ + u) / E))
              : h > p
              ? ((E = 2 * Math.sqrt(1 + h - s - p)),
                (e[3] = (_ - u) / E),
                (e[0] = (c + l) / E),
                (e[1] = 0.25 * E),
                (e[2] = (d + f) / E))
              : ((E = 2 * Math.sqrt(1 + p - s - h)),
                (e[3] = (c - l) / E),
                (e[0] = (_ + u) / E),
                (e[1] = (d + f) / E),
                (e[2] = 0.25 * E)),
            e
          );
        }
        function I(e, t, n, r) {
          var o = t[0],
            i = t[1],
            a = t[2],
            s = t[3],
            c = o + o,
            u = i + i,
            l = a + a,
            h = o * c,
            d = o * u,
            _ = o * l,
            f = i * u,
            p = i * l,
            m = a * l,
            E = s * c,
            v = s * u,
            g = s * l,
            x = r[0],
            T = r[1],
            b = r[2];
          return (
            (e[0] = (1 - (f + m)) * x),
            (e[1] = (d + g) * x),
            (e[2] = (_ - v) * x),
            (e[3] = 0),
            (e[4] = (d - g) * T),
            (e[5] = (1 - (h + m)) * T),
            (e[6] = (p + E) * T),
            (e[7] = 0),
            (e[8] = (_ + v) * b),
            (e[9] = (p - E) * b),
            (e[10] = (1 - (h + f)) * b),
            (e[11] = 0),
            (e[12] = n[0]),
            (e[13] = n[1]),
            (e[14] = n[2]),
            (e[15] = 1),
            e
          );
        }
        function O(e, t, n, r, o) {
          var i = t[0],
            a = t[1],
            s = t[2],
            c = t[3],
            u = i + i,
            l = a + a,
            h = s + s,
            d = i * u,
            _ = i * l,
            f = i * h,
            p = a * l,
            m = a * h,
            E = s * h,
            v = c * u,
            g = c * l,
            x = c * h,
            T = r[0],
            b = r[1],
            A = r[2],
            y = o[0],
            R = o[1],
            M = o[2],
            S = (1 - (p + E)) * T,
            C = (_ + x) * T,
            w = (f - g) * T,
            L = (_ - x) * b,
            N = (1 - (d + E)) * b,
            I = (m + v) * b,
            O = (f + g) * A,
            P = (m - v) * A,
            F = (1 - (d + p)) * A;
          return (
            (e[0] = S),
            (e[1] = C),
            (e[2] = w),
            (e[3] = 0),
            (e[4] = L),
            (e[5] = N),
            (e[6] = I),
            (e[7] = 0),
            (e[8] = O),
            (e[9] = P),
            (e[10] = F),
            (e[11] = 0),
            (e[12] = n[0] + y - (S * y + L * R + O * M)),
            (e[13] = n[1] + R - (C * y + N * R + P * M)),
            (e[14] = n[2] + M - (w * y + I * R + F * M)),
            (e[15] = 1),
            e
          );
        }
        function P(e, t) {
          var n = t[0],
            r = t[1],
            o = t[2],
            i = t[3],
            a = n + n,
            s = r + r,
            c = o + o,
            u = n * a,
            l = r * a,
            h = r * s,
            d = o * a,
            _ = o * s,
            f = o * c,
            p = i * a,
            m = i * s,
            E = i * c;
          return (
            (e[0] = 1 - h - f),
            (e[1] = l + E),
            (e[2] = d - m),
            (e[3] = 0),
            (e[4] = l - E),
            (e[5] = 1 - u - f),
            (e[6] = _ + p),
            (e[7] = 0),
            (e[8] = d + m),
            (e[9] = _ - p),
            (e[10] = 1 - u - h),
            (e[11] = 0),
            (e[12] = 0),
            (e[13] = 0),
            (e[14] = 0),
            (e[15] = 1),
            e
          );
        }
        function F(e, t, n, r, o, i, a) {
          var s = 1 / (n - t),
            c = 1 / (o - r),
            u = 1 / (i - a);
          return (
            (e[0] = 2 * i * s),
            (e[1] = 0),
            (e[2] = 0),
            (e[3] = 0),
            (e[4] = 0),
            (e[5] = 2 * i * c),
            (e[6] = 0),
            (e[7] = 0),
            (e[8] = (n + t) * s),
            (e[9] = (o + r) * c),
            (e[10] = (a + i) * u),
            (e[11] = -1),
            (e[12] = 0),
            (e[13] = 0),
            (e[14] = a * i * 2 * u),
            (e[15] = 0),
            e
          );
        }
        function U(e, t, n, r, o) {
          var i,
            a = 1 / Math.tan(t / 2);
          return (
            (e[0] = a / n),
            (e[1] = 0),
            (e[2] = 0),
            (e[3] = 0),
            (e[4] = 0),
            (e[5] = a),
            (e[6] = 0),
            (e[7] = 0),
            (e[8] = 0),
            (e[9] = 0),
            (e[11] = -1),
            (e[12] = 0),
            (e[13] = 0),
            (e[15] = 0),
            null != o && o !== 1 / 0
              ? ((i = 1 / (r - o)),
                (e[10] = (o + r) * i),
                (e[14] = 2 * o * r * i))
              : ((e[10] = -1), (e[14] = -2 * r)),
            e
          );
        }
        var D = U;
        function B(e, t, n, r, o) {
          var i,
            a = 1 / Math.tan(t / 2);
          return (
            (e[0] = a / n),
            (e[1] = 0),
            (e[2] = 0),
            (e[3] = 0),
            (e[4] = 0),
            (e[5] = a),
            (e[6] = 0),
            (e[7] = 0),
            (e[8] = 0),
            (e[9] = 0),
            (e[11] = -1),
            (e[12] = 0),
            (e[13] = 0),
            (e[15] = 0),
            null != o && o !== 1 / 0
              ? ((i = 1 / (r - o)), (e[10] = o * i), (e[14] = o * r * i))
              : ((e[10] = -1), (e[14] = -r)),
            e
          );
        }
        function z(e, t, n, r) {
          var o = Math.tan((t.upDegrees * Math.PI) / 180),
            i = Math.tan((t.downDegrees * Math.PI) / 180),
            a = Math.tan((t.leftDegrees * Math.PI) / 180),
            s = Math.tan((t.rightDegrees * Math.PI) / 180),
            c = 2 / (a + s),
            u = 2 / (o + i);
          return (
            (e[0] = c),
            (e[1] = 0),
            (e[2] = 0),
            (e[3] = 0),
            (e[4] = 0),
            (e[5] = u),
            (e[6] = 0),
            (e[7] = 0),
            (e[8] = -(a - s) * c * 0.5),
            (e[9] = (o - i) * u * 0.5),
            (e[10] = r / (n - r)),
            (e[11] = -1),
            (e[12] = 0),
            (e[13] = 0),
            (e[14] = (r * n) / (n - r)),
            (e[15] = 0),
            e
          );
        }
        function G(e, t, n, r, o, i, a) {
          var s = 1 / (t - n),
            c = 1 / (r - o),
            u = 1 / (i - a);
          return (
            (e[0] = -2 * s),
            (e[1] = 0),
            (e[2] = 0),
            (e[3] = 0),
            (e[4] = 0),
            (e[5] = -2 * c),
            (e[6] = 0),
            (e[7] = 0),
            (e[8] = 0),
            (e[9] = 0),
            (e[10] = 2 * u),
            (e[11] = 0),
            (e[12] = (t + n) * s),
            (e[13] = (o + r) * c),
            (e[14] = (a + i) * u),
            (e[15] = 1),
            e
          );
        }
        var V = G;
        function X(e, t, n, r, o, i, a) {
          var s = 1 / (t - n),
            c = 1 / (r - o),
            u = 1 / (i - a);
          return (
            (e[0] = -2 * s),
            (e[1] = 0),
            (e[2] = 0),
            (e[3] = 0),
            (e[4] = 0),
            (e[5] = -2 * c),
            (e[6] = 0),
            (e[7] = 0),
            (e[8] = 0),
            (e[9] = 0),
            (e[10] = u),
            (e[11] = 0),
            (e[12] = (t + n) * s),
            (e[13] = (o + r) * c),
            (e[14] = i * u),
            (e[15] = 1),
            e
          );
        }
        function k(e, t, n, o) {
          var i,
            a,
            s,
            c,
            l,
            h,
            d,
            _,
            f,
            p,
            m = t[0],
            E = t[1],
            v = t[2],
            g = o[0],
            x = o[1],
            T = o[2],
            b = n[0],
            A = n[1],
            y = n[2];
          return Math.abs(m - b) < r.EPSILON &&
            Math.abs(E - A) < r.EPSILON &&
            Math.abs(v - y) < r.EPSILON
            ? u(e)
            : ((d = m - b),
              (_ = E - A),
              (f = v - y),
              (i = x * (f *= p = 1 / Math.hypot(d, _, f)) - T * (_ *= p)),
              (a = T * (d *= p) - g * f),
              (s = g * _ - x * d),
              (p = Math.hypot(i, a, s))
                ? ((i *= p = 1 / p), (a *= p), (s *= p))
                : ((i = 0), (a = 0), (s = 0)),
              (c = _ * s - f * a),
              (l = f * i - d * s),
              (h = d * a - _ * i),
              (p = Math.hypot(c, l, h))
                ? ((c *= p = 1 / p), (l *= p), (h *= p))
                : ((c = 0), (l = 0), (h = 0)),
              (e[0] = i),
              (e[1] = c),
              (e[2] = d),
              (e[3] = 0),
              (e[4] = a),
              (e[5] = l),
              (e[6] = _),
              (e[7] = 0),
              (e[8] = s),
              (e[9] = h),
              (e[10] = f),
              (e[11] = 0),
              (e[12] = -(i * m + a * E + s * v)),
              (e[13] = -(c * m + l * E + h * v)),
              (e[14] = -(d * m + _ * E + f * v)),
              (e[15] = 1),
              e);
        }
        function H(e, t, n, r) {
          var o = t[0],
            i = t[1],
            a = t[2],
            s = r[0],
            c = r[1],
            u = r[2],
            l = o - n[0],
            h = i - n[1],
            d = a - n[2],
            _ = l * l + h * h + d * d;
          _ > 0 && ((l *= _ = 1 / Math.sqrt(_)), (h *= _), (d *= _));
          var f = c * d - u * h,
            p = u * l - s * d,
            m = s * h - c * l;
          return (
            (_ = f * f + p * p + m * m) > 0 &&
              ((f *= _ = 1 / Math.sqrt(_)), (p *= _), (m *= _)),
            (e[0] = f),
            (e[1] = p),
            (e[2] = m),
            (e[3] = 0),
            (e[4] = h * m - d * p),
            (e[5] = d * f - l * m),
            (e[6] = l * p - h * f),
            (e[7] = 0),
            (e[8] = l),
            (e[9] = h),
            (e[10] = d),
            (e[11] = 0),
            (e[12] = o),
            (e[13] = i),
            (e[14] = a),
            (e[15] = 1),
            e
          );
        }
        function Y(e) {
          return (
            "mat4(" +
            e[0] +
            ", " +
            e[1] +
            ", " +
            e[2] +
            ", " +
            e[3] +
            ", " +
            e[4] +
            ", " +
            e[5] +
            ", " +
            e[6] +
            ", " +
            e[7] +
            ", " +
            e[8] +
            ", " +
            e[9] +
            ", " +
            e[10] +
            ", " +
            e[11] +
            ", " +
            e[12] +
            ", " +
            e[13] +
            ", " +
            e[14] +
            ", " +
            e[15] +
            ")"
          );
        }
        function j(e) {
          return Math.hypot(
            e[0],
            e[1],
            e[2],
            e[3],
            e[4],
            e[5],
            e[6],
            e[7],
            e[8],
            e[9],
            e[10],
            e[11],
            e[12],
            e[13],
            e[14],
            e[15]
          );
        }
        function W(e, t, n) {
          return (
            (e[0] = t[0] + n[0]),
            (e[1] = t[1] + n[1]),
            (e[2] = t[2] + n[2]),
            (e[3] = t[3] + n[3]),
            (e[4] = t[4] + n[4]),
            (e[5] = t[5] + n[5]),
            (e[6] = t[6] + n[6]),
            (e[7] = t[7] + n[7]),
            (e[8] = t[8] + n[8]),
            (e[9] = t[9] + n[9]),
            (e[10] = t[10] + n[10]),
            (e[11] = t[11] + n[11]),
            (e[12] = t[12] + n[12]),
            (e[13] = t[13] + n[13]),
            (e[14] = t[14] + n[14]),
            (e[15] = t[15] + n[15]),
            e
          );
        }
        function q(e, t, n) {
          return (
            (e[0] = t[0] - n[0]),
            (e[1] = t[1] - n[1]),
            (e[2] = t[2] - n[2]),
            (e[3] = t[3] - n[3]),
            (e[4] = t[4] - n[4]),
            (e[5] = t[5] - n[5]),
            (e[6] = t[6] - n[6]),
            (e[7] = t[7] - n[7]),
            (e[8] = t[8] - n[8]),
            (e[9] = t[9] - n[9]),
            (e[10] = t[10] - n[10]),
            (e[11] = t[11] - n[11]),
            (e[12] = t[12] - n[12]),
            (e[13] = t[13] - n[13]),
            (e[14] = t[14] - n[14]),
            (e[15] = t[15] - n[15]),
            e
          );
        }
        function K(e, t, n) {
          return (
            (e[0] = t[0] * n),
            (e[1] = t[1] * n),
            (e[2] = t[2] * n),
            (e[3] = t[3] * n),
            (e[4] = t[4] * n),
            (e[5] = t[5] * n),
            (e[6] = t[6] * n),
            (e[7] = t[7] * n),
            (e[8] = t[8] * n),
            (e[9] = t[9] * n),
            (e[10] = t[10] * n),
            (e[11] = t[11] * n),
            (e[12] = t[12] * n),
            (e[13] = t[13] * n),
            (e[14] = t[14] * n),
            (e[15] = t[15] * n),
            e
          );
        }
        function Z(e, t, n, r) {
          return (
            (e[0] = t[0] + n[0] * r),
            (e[1] = t[1] + n[1] * r),
            (e[2] = t[2] + n[2] * r),
            (e[3] = t[3] + n[3] * r),
            (e[4] = t[4] + n[4] * r),
            (e[5] = t[5] + n[5] * r),
            (e[6] = t[6] + n[6] * r),
            (e[7] = t[7] + n[7] * r),
            (e[8] = t[8] + n[8] * r),
            (e[9] = t[9] + n[9] * r),
            (e[10] = t[10] + n[10] * r),
            (e[11] = t[11] + n[11] * r),
            (e[12] = t[12] + n[12] * r),
            (e[13] = t[13] + n[13] * r),
            (e[14] = t[14] + n[14] * r),
            (e[15] = t[15] + n[15] * r),
            e
          );
        }
        function Q(e, t) {
          return (
            e[0] === t[0] &&
            e[1] === t[1] &&
            e[2] === t[2] &&
            e[3] === t[3] &&
            e[4] === t[4] &&
            e[5] === t[5] &&
            e[6] === t[6] &&
            e[7] === t[7] &&
            e[8] === t[8] &&
            e[9] === t[9] &&
            e[10] === t[10] &&
            e[11] === t[11] &&
            e[12] === t[12] &&
            e[13] === t[13] &&
            e[14] === t[14] &&
            e[15] === t[15]
          );
        }
        function J(e, t) {
          var n = e[0],
            o = e[1],
            i = e[2],
            a = e[3],
            s = e[4],
            c = e[5],
            u = e[6],
            l = e[7],
            h = e[8],
            d = e[9],
            _ = e[10],
            f = e[11],
            p = e[12],
            m = e[13],
            E = e[14],
            v = e[15],
            g = t[0],
            x = t[1],
            T = t[2],
            b = t[3],
            A = t[4],
            y = t[5],
            R = t[6],
            M = t[7],
            S = t[8],
            C = t[9],
            w = t[10],
            L = t[11],
            N = t[12],
            I = t[13],
            O = t[14],
            P = t[15];
          return (
            Math.abs(n - g) <=
              r.EPSILON * Math.max(1, Math.abs(n), Math.abs(g)) &&
            Math.abs(o - x) <=
              r.EPSILON * Math.max(1, Math.abs(o), Math.abs(x)) &&
            Math.abs(i - T) <=
              r.EPSILON * Math.max(1, Math.abs(i), Math.abs(T)) &&
            Math.abs(a - b) <=
              r.EPSILON * Math.max(1, Math.abs(a), Math.abs(b)) &&
            Math.abs(s - A) <=
              r.EPSILON * Math.max(1, Math.abs(s), Math.abs(A)) &&
            Math.abs(c - y) <=
              r.EPSILON * Math.max(1, Math.abs(c), Math.abs(y)) &&
            Math.abs(u - R) <=
              r.EPSILON * Math.max(1, Math.abs(u), Math.abs(R)) &&
            Math.abs(l - M) <=
              r.EPSILON * Math.max(1, Math.abs(l), Math.abs(M)) &&
            Math.abs(h - S) <=
              r.EPSILON * Math.max(1, Math.abs(h), Math.abs(S)) &&
            Math.abs(d - C) <=
              r.EPSILON * Math.max(1, Math.abs(d), Math.abs(C)) &&
            Math.abs(_ - w) <=
              r.EPSILON * Math.max(1, Math.abs(_), Math.abs(w)) &&
            Math.abs(f - L) <=
              r.EPSILON * Math.max(1, Math.abs(f), Math.abs(L)) &&
            Math.abs(p - N) <=
              r.EPSILON * Math.max(1, Math.abs(p), Math.abs(N)) &&
            Math.abs(m - I) <=
              r.EPSILON * Math.max(1, Math.abs(m), Math.abs(I)) &&
            Math.abs(E - O) <=
              r.EPSILON * Math.max(1, Math.abs(E), Math.abs(O)) &&
            Math.abs(v - P) <= r.EPSILON * Math.max(1, Math.abs(v), Math.abs(P))
          );
        }
        var $ = f,
          ee = q;
      },
      221: (e, t, n) => {
        "use strict";
        n.r(t),
          n.d(t, {
            add: () => D,
            calculateW: () => m,
            clone: () => O,
            conjugate: () => A,
            copy: () => F,
            create: () => s,
            dot: () => G,
            equals: () => q,
            exactEquals: () => W,
            exp: () => E,
            fromEuler: () => R,
            fromMat3: () => y,
            fromValues: () => P,
            getAngle: () => h,
            getAxisAngle: () => l,
            identity: () => c,
            invert: () => b,
            len: () => k,
            length: () => X,
            lerp: () => V,
            ln: () => v,
            mul: () => B,
            multiply: () => d,
            normalize: () => j,
            pow: () => g,
            random: () => T,
            rotateX: () => _,
            rotateY: () => f,
            rotateZ: () => p,
            rotationTo: () => K,
            scale: () => z,
            set: () => U,
            setAxes: () => Q,
            setAxisAngle: () => u,
            slerp: () => x,
            sqlerp: () => Z,
            sqrLen: () => Y,
            squaredLength: () => H,
            str: () => M,
          });
        var r = n(823),
          o = n(409),
          i = n(329),
          a = n(796);
        function s() {
          var e = new r.ARRAY_TYPE(4);
          return (
            r.ARRAY_TYPE != Float32Array &&
              ((e[0] = 0), (e[1] = 0), (e[2] = 0)),
            (e[3] = 1),
            e
          );
        }
        function c(e) {
          return (e[0] = 0), (e[1] = 0), (e[2] = 0), (e[3] = 1), e;
        }
        function u(e, t, n) {
          n *= 0.5;
          var r = Math.sin(n);
          return (
            (e[0] = r * t[0]),
            (e[1] = r * t[1]),
            (e[2] = r * t[2]),
            (e[3] = Math.cos(n)),
            e
          );
        }
        function l(e, t) {
          var n = 2 * Math.acos(t[3]),
            o = Math.sin(n / 2);
          return (
            o > r.EPSILON
              ? ((e[0] = t[0] / o), (e[1] = t[1] / o), (e[2] = t[2] / o))
              : ((e[0] = 1), (e[1] = 0), (e[2] = 0)),
            n
          );
        }
        function h(e, t) {
          var n = G(e, t);
          return Math.acos(2 * n * n - 1);
        }
        function d(e, t, n) {
          var r = t[0],
            o = t[1],
            i = t[2],
            a = t[3],
            s = n[0],
            c = n[1],
            u = n[2],
            l = n[3];
          return (
            (e[0] = r * l + a * s + o * u - i * c),
            (e[1] = o * l + a * c + i * s - r * u),
            (e[2] = i * l + a * u + r * c - o * s),
            (e[3] = a * l - r * s - o * c - i * u),
            e
          );
        }
        function _(e, t, n) {
          n *= 0.5;
          var r = t[0],
            o = t[1],
            i = t[2],
            a = t[3],
            s = Math.sin(n),
            c = Math.cos(n);
          return (
            (e[0] = r * c + a * s),
            (e[1] = o * c + i * s),
            (e[2] = i * c - o * s),
            (e[3] = a * c - r * s),
            e
          );
        }
        function f(e, t, n) {
          n *= 0.5;
          var r = t[0],
            o = t[1],
            i = t[2],
            a = t[3],
            s = Math.sin(n),
            c = Math.cos(n);
          return (
            (e[0] = r * c - i * s),
            (e[1] = o * c + a * s),
            (e[2] = i * c + r * s),
            (e[3] = a * c - o * s),
            e
          );
        }
        function p(e, t, n) {
          n *= 0.5;
          var r = t[0],
            o = t[1],
            i = t[2],
            a = t[3],
            s = Math.sin(n),
            c = Math.cos(n);
          return (
            (e[0] = r * c + o * s),
            (e[1] = o * c - r * s),
            (e[2] = i * c + a * s),
            (e[3] = a * c - i * s),
            e
          );
        }
        function m(e, t) {
          var n = t[0],
            r = t[1],
            o = t[2];
          return (
            (e[0] = n),
            (e[1] = r),
            (e[2] = o),
            (e[3] = Math.sqrt(Math.abs(1 - n * n - r * r - o * o))),
            e
          );
        }
        function E(e, t) {
          var n = t[0],
            r = t[1],
            o = t[2],
            i = t[3],
            a = Math.sqrt(n * n + r * r + o * o),
            s = Math.exp(i),
            c = a > 0 ? (s * Math.sin(a)) / a : 0;
          return (
            (e[0] = n * c),
            (e[1] = r * c),
            (e[2] = o * c),
            (e[3] = s * Math.cos(a)),
            e
          );
        }
        function v(e, t) {
          var n = t[0],
            r = t[1],
            o = t[2],
            i = t[3],
            a = Math.sqrt(n * n + r * r + o * o),
            s = a > 0 ? Math.atan2(a, i) / a : 0;
          return (
            (e[0] = n * s),
            (e[1] = r * s),
            (e[2] = o * s),
            (e[3] = 0.5 * Math.log(n * n + r * r + o * o + i * i)),
            e
          );
        }
        function g(e, t, n) {
          return v(e, t), z(e, e, n), E(e, e), e;
        }
        function x(e, t, n, o) {
          var i,
            a,
            s,
            c,
            u,
            l = t[0],
            h = t[1],
            d = t[2],
            _ = t[3],
            f = n[0],
            p = n[1],
            m = n[2],
            E = n[3];
          return (
            (a = l * f + h * p + d * m + _ * E) < 0 &&
              ((a = -a), (f = -f), (p = -p), (m = -m), (E = -E)),
            1 - a > r.EPSILON
              ? ((i = Math.acos(a)),
                (s = Math.sin(i)),
                (c = Math.sin((1 - o) * i) / s),
                (u = Math.sin(o * i) / s))
              : ((c = 1 - o), (u = o)),
            (e[0] = c * l + u * f),
            (e[1] = c * h + u * p),
            (e[2] = c * d + u * m),
            (e[3] = c * _ + u * E),
            e
          );
        }
        function T(e) {
          var t = r.RANDOM(),
            n = r.RANDOM(),
            o = r.RANDOM(),
            i = Math.sqrt(1 - t),
            a = Math.sqrt(t);
          return (
            (e[0] = i * Math.sin(2 * Math.PI * n)),
            (e[1] = i * Math.cos(2 * Math.PI * n)),
            (e[2] = a * Math.sin(2 * Math.PI * o)),
            (e[3] = a * Math.cos(2 * Math.PI * o)),
            e
          );
        }
        function b(e, t) {
          var n = t[0],
            r = t[1],
            o = t[2],
            i = t[3],
            a = n * n + r * r + o * o + i * i,
            s = a ? 1 / a : 0;
          return (
            (e[0] = -n * s), (e[1] = -r * s), (e[2] = -o * s), (e[3] = i * s), e
          );
        }
        function A(e, t) {
          return (
            (e[0] = -t[0]), (e[1] = -t[1]), (e[2] = -t[2]), (e[3] = t[3]), e
          );
        }
        function y(e, t) {
          var n,
            r = t[0] + t[4] + t[8];
          if (r > 0)
            (n = Math.sqrt(r + 1)),
              (e[3] = 0.5 * n),
              (n = 0.5 / n),
              (e[0] = (t[5] - t[7]) * n),
              (e[1] = (t[6] - t[2]) * n),
              (e[2] = (t[1] - t[3]) * n);
          else {
            var o = 0;
            t[4] > t[0] && (o = 1), t[8] > t[3 * o + o] && (o = 2);
            var i = (o + 1) % 3,
              a = (o + 2) % 3;
            (n = Math.sqrt(t[3 * o + o] - t[3 * i + i] - t[3 * a + a] + 1)),
              (e[o] = 0.5 * n),
              (n = 0.5 / n),
              (e[3] = (t[3 * i + a] - t[3 * a + i]) * n),
              (e[i] = (t[3 * i + o] + t[3 * o + i]) * n),
              (e[a] = (t[3 * a + o] + t[3 * o + a]) * n);
          }
          return e;
        }
        function R(e, t, n, r) {
          var o = (0.5 * Math.PI) / 180;
          (t *= o), (n *= o), (r *= o);
          var i = Math.sin(t),
            a = Math.cos(t),
            s = Math.sin(n),
            c = Math.cos(n),
            u = Math.sin(r),
            l = Math.cos(r);
          return (
            (e[0] = i * c * l - a * s * u),
            (e[1] = a * s * l + i * c * u),
            (e[2] = a * c * u - i * s * l),
            (e[3] = a * c * l + i * s * u),
            e
          );
        }
        function M(e) {
          return "quat(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ")";
        }
        var S,
          C,
          w,
          L,
          N,
          I,
          O = a.clone,
          P = a.fromValues,
          F = a.copy,
          U = a.set,
          D = a.add,
          B = d,
          z = a.scale,
          G = a.dot,
          V = a.lerp,
          X = a.length,
          k = X,
          H = a.squaredLength,
          Y = H,
          j = a.normalize,
          W = a.exactEquals,
          q = a.equals,
          K =
            ((S = i.create()),
            (C = i.fromValues(1, 0, 0)),
            (w = i.fromValues(0, 1, 0)),
            function (e, t, n) {
              var r = i.dot(t, n);
              return r < -0.999999
                ? (i.cross(S, C, t),
                  i.len(S) < 1e-6 && i.cross(S, w, t),
                  i.normalize(S, S),
                  u(e, S, Math.PI),
                  e)
                : r > 0.999999
                ? ((e[0] = 0), (e[1] = 0), (e[2] = 0), (e[3] = 1), e)
                : (i.cross(S, t, n),
                  (e[0] = S[0]),
                  (e[1] = S[1]),
                  (e[2] = S[2]),
                  (e[3] = 1 + r),
                  j(e, e));
            }),
          Z =
            ((L = s()),
            (N = s()),
            function (e, t, n, r, o, i) {
              return (
                x(L, t, o, i), x(N, n, r, i), x(e, L, N, 2 * i * (1 - i)), e
              );
            }),
          Q =
            ((I = o.create()),
            function (e, t, n, r) {
              return (
                (I[0] = n[0]),
                (I[3] = n[1]),
                (I[6] = n[2]),
                (I[1] = r[0]),
                (I[4] = r[1]),
                (I[7] = r[2]),
                (I[2] = -t[0]),
                (I[5] = -t[1]),
                (I[8] = -t[2]),
                j(e, y(e, I))
              );
            });
      },
      329: (e, t, n) => {
        "use strict";
        n.r(t),
          n.d(t, {
            add: () => l,
            angle: () => z,
            bezier: () => N,
            ceil: () => f,
            clone: () => i,
            copy: () => c,
            create: () => o,
            cross: () => C,
            dist: () => q,
            distance: () => T,
            div: () => W,
            divide: () => _,
            dot: () => S,
            equals: () => k,
            exactEquals: () => X,
            floor: () => p,
            forEach: () => J,
            fromValues: () => s,
            hermite: () => L,
            inverse: () => R,
            len: () => Z,
            length: () => a,
            lerp: () => w,
            max: () => E,
            min: () => m,
            mul: () => j,
            multiply: () => d,
            negate: () => y,
            normalize: () => M,
            random: () => I,
            rotateX: () => U,
            rotateY: () => D,
            rotateZ: () => B,
            round: () => v,
            scale: () => g,
            scaleAndAdd: () => x,
            set: () => u,
            sqrDist: () => K,
            sqrLen: () => Q,
            squaredDistance: () => b,
            squaredLength: () => A,
            str: () => V,
            sub: () => Y,
            subtract: () => h,
            transformMat3: () => P,
            transformMat4: () => O,
            transformQuat: () => F,
            zero: () => G,
          });
        var r = n(823);
        function o() {
          var e = new r.ARRAY_TYPE(3);
          return (
            r.ARRAY_TYPE != Float32Array &&
              ((e[0] = 0), (e[1] = 0), (e[2] = 0)),
            e
          );
        }
        function i(e) {
          var t = new r.ARRAY_TYPE(3);
          return (t[0] = e[0]), (t[1] = e[1]), (t[2] = e[2]), t;
        }
        function a(e) {
          var t = e[0],
            n = e[1],
            r = e[2];
          return Math.hypot(t, n, r);
        }
        function s(e, t, n) {
          var o = new r.ARRAY_TYPE(3);
          return (o[0] = e), (o[1] = t), (o[2] = n), o;
        }
        function c(e, t) {
          return (e[0] = t[0]), (e[1] = t[1]), (e[2] = t[2]), e;
        }
        function u(e, t, n, r) {
          return (e[0] = t), (e[1] = n), (e[2] = r), e;
        }
        function l(e, t, n) {
          return (
            (e[0] = t[0] + n[0]), (e[1] = t[1] + n[1]), (e[2] = t[2] + n[2]), e
          );
        }
        function h(e, t, n) {
          return (
            (e[0] = t[0] - n[0]), (e[1] = t[1] - n[1]), (e[2] = t[2] - n[2]), e
          );
        }
        function d(e, t, n) {
          return (
            (e[0] = t[0] * n[0]), (e[1] = t[1] * n[1]), (e[2] = t[2] * n[2]), e
          );
        }
        function _(e, t, n) {
          return (
            (e[0] = t[0] / n[0]), (e[1] = t[1] / n[1]), (e[2] = t[2] / n[2]), e
          );
        }
        function f(e, t) {
          return (
            (e[0] = Math.ceil(t[0])),
            (e[1] = Math.ceil(t[1])),
            (e[2] = Math.ceil(t[2])),
            e
          );
        }
        function p(e, t) {
          return (
            (e[0] = Math.floor(t[0])),
            (e[1] = Math.floor(t[1])),
            (e[2] = Math.floor(t[2])),
            e
          );
        }
        function m(e, t, n) {
          return (
            (e[0] = Math.min(t[0], n[0])),
            (e[1] = Math.min(t[1], n[1])),
            (e[2] = Math.min(t[2], n[2])),
            e
          );
        }
        function E(e, t, n) {
          return (
            (e[0] = Math.max(t[0], n[0])),
            (e[1] = Math.max(t[1], n[1])),
            (e[2] = Math.max(t[2], n[2])),
            e
          );
        }
        function v(e, t) {
          return (
            (e[0] = Math.round(t[0])),
            (e[1] = Math.round(t[1])),
            (e[2] = Math.round(t[2])),
            e
          );
        }
        function g(e, t, n) {
          return (e[0] = t[0] * n), (e[1] = t[1] * n), (e[2] = t[2] * n), e;
        }
        function x(e, t, n, r) {
          return (
            (e[0] = t[0] + n[0] * r),
            (e[1] = t[1] + n[1] * r),
            (e[2] = t[2] + n[2] * r),
            e
          );
        }
        function T(e, t) {
          var n = t[0] - e[0],
            r = t[1] - e[1],
            o = t[2] - e[2];
          return Math.hypot(n, r, o);
        }
        function b(e, t) {
          var n = t[0] - e[0],
            r = t[1] - e[1],
            o = t[2] - e[2];
          return n * n + r * r + o * o;
        }
        function A(e) {
          var t = e[0],
            n = e[1],
            r = e[2];
          return t * t + n * n + r * r;
        }
        function y(e, t) {
          return (e[0] = -t[0]), (e[1] = -t[1]), (e[2] = -t[2]), e;
        }
        function R(e, t) {
          return (e[0] = 1 / t[0]), (e[1] = 1 / t[1]), (e[2] = 1 / t[2]), e;
        }
        function M(e, t) {
          var n = t[0],
            r = t[1],
            o = t[2],
            i = n * n + r * r + o * o;
          return (
            i > 0 && (i = 1 / Math.sqrt(i)),
            (e[0] = t[0] * i),
            (e[1] = t[1] * i),
            (e[2] = t[2] * i),
            e
          );
        }
        function S(e, t) {
          return e[0] * t[0] + e[1] * t[1] + e[2] * t[2];
        }
        function C(e, t, n) {
          var r = t[0],
            o = t[1],
            i = t[2],
            a = n[0],
            s = n[1],
            c = n[2];
          return (
            (e[0] = o * c - i * s),
            (e[1] = i * a - r * c),
            (e[2] = r * s - o * a),
            e
          );
        }
        function w(e, t, n, r) {
          var o = t[0],
            i = t[1],
            a = t[2];
          return (
            (e[0] = o + r * (n[0] - o)),
            (e[1] = i + r * (n[1] - i)),
            (e[2] = a + r * (n[2] - a)),
            e
          );
        }
        function L(e, t, n, r, o, i) {
          var a = i * i,
            s = a * (2 * i - 3) + 1,
            c = a * (i - 2) + i,
            u = a * (i - 1),
            l = a * (3 - 2 * i);
          return (
            (e[0] = t[0] * s + n[0] * c + r[0] * u + o[0] * l),
            (e[1] = t[1] * s + n[1] * c + r[1] * u + o[1] * l),
            (e[2] = t[2] * s + n[2] * c + r[2] * u + o[2] * l),
            e
          );
        }
        function N(e, t, n, r, o, i) {
          var a = 1 - i,
            s = a * a,
            c = i * i,
            u = s * a,
            l = 3 * i * s,
            h = 3 * c * a,
            d = c * i;
          return (
            (e[0] = t[0] * u + n[0] * l + r[0] * h + o[0] * d),
            (e[1] = t[1] * u + n[1] * l + r[1] * h + o[1] * d),
            (e[2] = t[2] * u + n[2] * l + r[2] * h + o[2] * d),
            e
          );
        }
        function I(e, t) {
          t = t || 1;
          var n = 2 * r.RANDOM() * Math.PI,
            o = 2 * r.RANDOM() - 1,
            i = Math.sqrt(1 - o * o) * t;
          return (
            (e[0] = Math.cos(n) * i),
            (e[1] = Math.sin(n) * i),
            (e[2] = o * t),
            e
          );
        }
        function O(e, t, n) {
          var r = t[0],
            o = t[1],
            i = t[2],
            a = n[3] * r + n[7] * o + n[11] * i + n[15];
          return (
            (a = a || 1),
            (e[0] = (n[0] * r + n[4] * o + n[8] * i + n[12]) / a),
            (e[1] = (n[1] * r + n[5] * o + n[9] * i + n[13]) / a),
            (e[2] = (n[2] * r + n[6] * o + n[10] * i + n[14]) / a),
            e
          );
        }
        function P(e, t, n) {
          var r = t[0],
            o = t[1],
            i = t[2];
          return (
            (e[0] = r * n[0] + o * n[3] + i * n[6]),
            (e[1] = r * n[1] + o * n[4] + i * n[7]),
            (e[2] = r * n[2] + o * n[5] + i * n[8]),
            e
          );
        }
        function F(e, t, n) {
          var r = n[0],
            o = n[1],
            i = n[2],
            a = n[3],
            s = t[0],
            c = t[1],
            u = t[2],
            l = o * u - i * c,
            h = i * s - r * u,
            d = r * c - o * s,
            _ = o * d - i * h,
            f = i * l - r * d,
            p = r * h - o * l,
            m = 2 * a;
          return (
            (l *= m),
            (h *= m),
            (d *= m),
            (_ *= 2),
            (f *= 2),
            (p *= 2),
            (e[0] = s + l + _),
            (e[1] = c + h + f),
            (e[2] = u + d + p),
            e
          );
        }
        function U(e, t, n, r) {
          var o = [],
            i = [];
          return (
            (o[0] = t[0] - n[0]),
            (o[1] = t[1] - n[1]),
            (o[2] = t[2] - n[2]),
            (i[0] = o[0]),
            (i[1] = o[1] * Math.cos(r) - o[2] * Math.sin(r)),
            (i[2] = o[1] * Math.sin(r) + o[2] * Math.cos(r)),
            (e[0] = i[0] + n[0]),
            (e[1] = i[1] + n[1]),
            (e[2] = i[2] + n[2]),
            e
          );
        }
        function D(e, t, n, r) {
          var o = [],
            i = [];
          return (
            (o[0] = t[0] - n[0]),
            (o[1] = t[1] - n[1]),
            (o[2] = t[2] - n[2]),
            (i[0] = o[2] * Math.sin(r) + o[0] * Math.cos(r)),
            (i[1] = o[1]),
            (i[2] = o[2] * Math.cos(r) - o[0] * Math.sin(r)),
            (e[0] = i[0] + n[0]),
            (e[1] = i[1] + n[1]),
            (e[2] = i[2] + n[2]),
            e
          );
        }
        function B(e, t, n, r) {
          var o = [],
            i = [];
          return (
            (o[0] = t[0] - n[0]),
            (o[1] = t[1] - n[1]),
            (o[2] = t[2] - n[2]),
            (i[0] = o[0] * Math.cos(r) - o[1] * Math.sin(r)),
            (i[1] = o[0] * Math.sin(r) + o[1] * Math.cos(r)),
            (i[2] = o[2]),
            (e[0] = i[0] + n[0]),
            (e[1] = i[1] + n[1]),
            (e[2] = i[2] + n[2]),
            e
          );
        }
        function z(e, t) {
          var n = e[0],
            r = e[1],
            o = e[2],
            i = t[0],
            a = t[1],
            s = t[2],
            c =
              Math.sqrt(n * n + r * r + o * o) *
              Math.sqrt(i * i + a * a + s * s),
            u = c && S(e, t) / c;
          return Math.acos(Math.min(Math.max(u, -1), 1));
        }
        function G(e) {
          return (e[0] = 0), (e[1] = 0), (e[2] = 0), e;
        }
        function V(e) {
          return "vec3(" + e[0] + ", " + e[1] + ", " + e[2] + ")";
        }
        function X(e, t) {
          return e[0] === t[0] && e[1] === t[1] && e[2] === t[2];
        }
        function k(e, t) {
          var n = e[0],
            o = e[1],
            i = e[2],
            a = t[0],
            s = t[1],
            c = t[2];
          return (
            Math.abs(n - a) <=
              r.EPSILON * Math.max(1, Math.abs(n), Math.abs(a)) &&
            Math.abs(o - s) <=
              r.EPSILON * Math.max(1, Math.abs(o), Math.abs(s)) &&
            Math.abs(i - c) <= r.EPSILON * Math.max(1, Math.abs(i), Math.abs(c))
          );
        }
        var H,
          Y = h,
          j = d,
          W = _,
          q = T,
          K = b,
          Z = a,
          Q = A,
          J =
            ((H = o()),
            function (e, t, n, r, o, i) {
              var a, s;
              for (
                t || (t = 3),
                  n || (n = 0),
                  s = r ? Math.min(r * t + n, e.length) : e.length,
                  a = n;
                a < s;
                a += t
              )
                (H[0] = e[a]),
                  (H[1] = e[a + 1]),
                  (H[2] = e[a + 2]),
                  o(H, H, i),
                  (e[a] = H[0]),
                  (e[a + 1] = H[1]),
                  (e[a + 2] = H[2]);
              return e;
            });
      },
      796: (e, t, n) => {
        "use strict";
        n.r(t),
          n.d(t, {
            add: () => u,
            ceil: () => _,
            clone: () => i,
            copy: () => s,
            create: () => o,
            cross: () => C,
            dist: () => V,
            distance: () => x,
            div: () => G,
            divide: () => d,
            dot: () => S,
            equals: () => U,
            exactEquals: () => F,
            floor: () => f,
            forEach: () => Y,
            fromValues: () => a,
            inverse: () => R,
            len: () => k,
            length: () => b,
            lerp: () => w,
            max: () => m,
            min: () => p,
            mul: () => z,
            multiply: () => h,
            negate: () => y,
            normalize: () => M,
            random: () => L,
            round: () => E,
            scale: () => v,
            scaleAndAdd: () => g,
            set: () => c,
            sqrDist: () => X,
            sqrLen: () => H,
            squaredDistance: () => T,
            squaredLength: () => A,
            str: () => P,
            sub: () => B,
            subtract: () => l,
            transformMat4: () => N,
            transformQuat: () => I,
            zero: () => O,
          });
        var r = n(823);
        function o() {
          var e = new r.ARRAY_TYPE(4);
          return (
            r.ARRAY_TYPE != Float32Array &&
              ((e[0] = 0), (e[1] = 0), (e[2] = 0), (e[3] = 0)),
            e
          );
        }
        function i(e) {
          var t = new r.ARRAY_TYPE(4);
          return (t[0] = e[0]), (t[1] = e[1]), (t[2] = e[2]), (t[3] = e[3]), t;
        }
        function a(e, t, n, o) {
          var i = new r.ARRAY_TYPE(4);
          return (i[0] = e), (i[1] = t), (i[2] = n), (i[3] = o), i;
        }
        function s(e, t) {
          return (e[0] = t[0]), (e[1] = t[1]), (e[2] = t[2]), (e[3] = t[3]), e;
        }
        function c(e, t, n, r, o) {
          return (e[0] = t), (e[1] = n), (e[2] = r), (e[3] = o), e;
        }
        function u(e, t, n) {
          return (
            (e[0] = t[0] + n[0]),
            (e[1] = t[1] + n[1]),
            (e[2] = t[2] + n[2]),
            (e[3] = t[3] + n[3]),
            e
          );
        }
        function l(e, t, n) {
          return (
            (e[0] = t[0] - n[0]),
            (e[1] = t[1] - n[1]),
            (e[2] = t[2] - n[2]),
            (e[3] = t[3] - n[3]),
            e
          );
        }
        function h(e, t, n) {
          return (
            (e[0] = t[0] * n[0]),
            (e[1] = t[1] * n[1]),
            (e[2] = t[2] * n[2]),
            (e[3] = t[3] * n[3]),
            e
          );
        }
        function d(e, t, n) {
          return (
            (e[0] = t[0] / n[0]),
            (e[1] = t[1] / n[1]),
            (e[2] = t[2] / n[2]),
            (e[3] = t[3] / n[3]),
            e
          );
        }
        function _(e, t) {
          return (
            (e[0] = Math.ceil(t[0])),
            (e[1] = Math.ceil(t[1])),
            (e[2] = Math.ceil(t[2])),
            (e[3] = Math.ceil(t[3])),
            e
          );
        }
        function f(e, t) {
          return (
            (e[0] = Math.floor(t[0])),
            (e[1] = Math.floor(t[1])),
            (e[2] = Math.floor(t[2])),
            (e[3] = Math.floor(t[3])),
            e
          );
        }
        function p(e, t, n) {
          return (
            (e[0] = Math.min(t[0], n[0])),
            (e[1] = Math.min(t[1], n[1])),
            (e[2] = Math.min(t[2], n[2])),
            (e[3] = Math.min(t[3], n[3])),
            e
          );
        }
        function m(e, t, n) {
          return (
            (e[0] = Math.max(t[0], n[0])),
            (e[1] = Math.max(t[1], n[1])),
            (e[2] = Math.max(t[2], n[2])),
            (e[3] = Math.max(t[3], n[3])),
            e
          );
        }
        function E(e, t) {
          return (
            (e[0] = Math.round(t[0])),
            (e[1] = Math.round(t[1])),
            (e[2] = Math.round(t[2])),
            (e[3] = Math.round(t[3])),
            e
          );
        }
        function v(e, t, n) {
          return (
            (e[0] = t[0] * n),
            (e[1] = t[1] * n),
            (e[2] = t[2] * n),
            (e[3] = t[3] * n),
            e
          );
        }
        function g(e, t, n, r) {
          return (
            (e[0] = t[0] + n[0] * r),
            (e[1] = t[1] + n[1] * r),
            (e[2] = t[2] + n[2] * r),
            (e[3] = t[3] + n[3] * r),
            e
          );
        }
        function x(e, t) {
          var n = t[0] - e[0],
            r = t[1] - e[1],
            o = t[2] - e[2],
            i = t[3] - e[3];
          return Math.hypot(n, r, o, i);
        }
        function T(e, t) {
          var n = t[0] - e[0],
            r = t[1] - e[1],
            o = t[2] - e[2],
            i = t[3] - e[3];
          return n * n + r * r + o * o + i * i;
        }
        function b(e) {
          var t = e[0],
            n = e[1],
            r = e[2],
            o = e[3];
          return Math.hypot(t, n, r, o);
        }
        function A(e) {
          var t = e[0],
            n = e[1],
            r = e[2],
            o = e[3];
          return t * t + n * n + r * r + o * o;
        }
        function y(e, t) {
          return (
            (e[0] = -t[0]), (e[1] = -t[1]), (e[2] = -t[2]), (e[3] = -t[3]), e
          );
        }
        function R(e, t) {
          return (
            (e[0] = 1 / t[0]),
            (e[1] = 1 / t[1]),
            (e[2] = 1 / t[2]),
            (e[3] = 1 / t[3]),
            e
          );
        }
        function M(e, t) {
          var n = t[0],
            r = t[1],
            o = t[2],
            i = t[3],
            a = n * n + r * r + o * o + i * i;
          return (
            a > 0 && (a = 1 / Math.sqrt(a)),
            (e[0] = n * a),
            (e[1] = r * a),
            (e[2] = o * a),
            (e[3] = i * a),
            e
          );
        }
        function S(e, t) {
          return e[0] * t[0] + e[1] * t[1] + e[2] * t[2] + e[3] * t[3];
        }
        function C(e, t, n, r) {
          var o = n[0] * r[1] - n[1] * r[0],
            i = n[0] * r[2] - n[2] * r[0],
            a = n[0] * r[3] - n[3] * r[0],
            s = n[1] * r[2] - n[2] * r[1],
            c = n[1] * r[3] - n[3] * r[1],
            u = n[2] * r[3] - n[3] * r[2],
            l = t[0],
            h = t[1],
            d = t[2],
            _ = t[3];
          return (
            (e[0] = h * u - d * c + _ * s),
            (e[1] = -l * u + d * a - _ * i),
            (e[2] = l * c - h * a + _ * o),
            (e[3] = -l * s + h * i - d * o),
            e
          );
        }
        function w(e, t, n, r) {
          var o = t[0],
            i = t[1],
            a = t[2],
            s = t[3];
          return (
            (e[0] = o + r * (n[0] - o)),
            (e[1] = i + r * (n[1] - i)),
            (e[2] = a + r * (n[2] - a)),
            (e[3] = s + r * (n[3] - s)),
            e
          );
        }
        function L(e, t) {
          var n, o, i, a, s, c;
          t = t || 1;
          do {
            s = (n = 2 * r.RANDOM() - 1) * n + (o = 2 * r.RANDOM() - 1) * o;
          } while (s >= 1);
          do {
            c = (i = 2 * r.RANDOM() - 1) * i + (a = 2 * r.RANDOM() - 1) * a;
          } while (c >= 1);
          var u = Math.sqrt((1 - s) / c);
          return (
            (e[0] = t * n),
            (e[1] = t * o),
            (e[2] = t * i * u),
            (e[3] = t * a * u),
            e
          );
        }
        function N(e, t, n) {
          var r = t[0],
            o = t[1],
            i = t[2],
            a = t[3];
          return (
            (e[0] = n[0] * r + n[4] * o + n[8] * i + n[12] * a),
            (e[1] = n[1] * r + n[5] * o + n[9] * i + n[13] * a),
            (e[2] = n[2] * r + n[6] * o + n[10] * i + n[14] * a),
            (e[3] = n[3] * r + n[7] * o + n[11] * i + n[15] * a),
            e
          );
        }
        function I(e, t, n) {
          var r = t[0],
            o = t[1],
            i = t[2],
            a = n[0],
            s = n[1],
            c = n[2],
            u = n[3],
            l = u * r + s * i - c * o,
            h = u * o + c * r - a * i,
            d = u * i + a * o - s * r,
            _ = -a * r - s * o - c * i;
          return (
            (e[0] = l * u + _ * -a + h * -c - d * -s),
            (e[1] = h * u + _ * -s + d * -a - l * -c),
            (e[2] = d * u + _ * -c + l * -s - h * -a),
            (e[3] = t[3]),
            e
          );
        }
        function O(e) {
          return (e[0] = 0), (e[1] = 0), (e[2] = 0), (e[3] = 0), e;
        }
        function P(e) {
          return "vec4(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ")";
        }
        function F(e, t) {
          return (
            e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3]
          );
        }
        function U(e, t) {
          var n = e[0],
            o = e[1],
            i = e[2],
            a = e[3],
            s = t[0],
            c = t[1],
            u = t[2],
            l = t[3];
          return (
            Math.abs(n - s) <=
              r.EPSILON * Math.max(1, Math.abs(n), Math.abs(s)) &&
            Math.abs(o - c) <=
              r.EPSILON * Math.max(1, Math.abs(o), Math.abs(c)) &&
            Math.abs(i - u) <=
              r.EPSILON * Math.max(1, Math.abs(i), Math.abs(u)) &&
            Math.abs(a - l) <= r.EPSILON * Math.max(1, Math.abs(a), Math.abs(l))
          );
        }
        var D,
          B = l,
          z = h,
          G = d,
          V = x,
          X = T,
          k = b,
          H = A,
          Y =
            ((D = o()),
            function (e, t, n, r, o, i) {
              var a, s;
              for (
                t || (t = 4),
                  n || (n = 0),
                  s = r ? Math.min(r * t + n, e.length) : e.length,
                  a = n;
                a < s;
                a += t
              )
                (D[0] = e[a]),
                  (D[1] = e[a + 1]),
                  (D[2] = e[a + 2]),
                  (D[3] = e[a + 3]),
                  o(D, D, i),
                  (e[a] = D[0]),
                  (e[a + 1] = D[1]),
                  (e[a + 2] = D[2]),
                  (e[a + 3] = D[3]);
              return e;
            });
      },
      228: (e) => {
        "use strict";
        var t = Object.getOwnPropertySymbols,
          n = Object.prototype.hasOwnProperty,
          r = Object.prototype.propertyIsEnumerable;
        e.exports = (function () {
          try {
            if (!Object.assign) return !1;
            var e = new String("abc");
            if (((e[5] = "de"), "5" === Object.getOwnPropertyNames(e)[0]))
              return !1;
            for (var t = {}, n = 0; n < 10; n++)
              t["_" + String.fromCharCode(n)] = n;
            if (
              "0123456789" !==
              Object.getOwnPropertyNames(t)
                .map(function (e) {
                  return t[e];
                })
                .join("")
            )
              return !1;
            var r = {};
            return (
              "abcdefghijklmnopqrst".split("").forEach(function (e) {
                r[e] = e;
              }),
              "abcdefghijklmnopqrst" ===
                Object.keys(Object.assign({}, r)).join("")
            );
          } catch (e) {
            return !1;
          }
        })()
          ? Object.assign
          : function (e, o) {
              for (
                var i,
                  a,
                  s = (function (e) {
                    if (null == e)
                      throw new TypeError(
                        "Object.assign cannot be called with null or undefined"
                      );
                    return Object(e);
                  })(e),
                  c = 1;
                c < arguments.length;
                c++
              ) {
                for (var u in (i = Object(arguments[c])))
                  n.call(i, u) && (s[u] = i[u]);
                if (t) {
                  a = t(i);
                  for (var l = 0; l < a.length; l++)
                    r.call(i, a[l]) && (s[a[l]] = i[a[l]]);
                }
              }
              return s;
            };
      },
      992: (e, t) => {
        "use strict";
        var n = Object.prototype.hasOwnProperty;
        function r(e) {
          try {
            return decodeURIComponent(e.replace(/\+/g, " "));
          } catch (e) {
            return null;
          }
        }
        function o(e) {
          try {
            return encodeURIComponent(e);
          } catch (e) {
            return null;
          }
        }
        (t.stringify = function (e, t) {
          t = t || "";
          var r,
            i,
            a = [];
          for (i in ("string" != typeof t && (t = "?"), e))
            if (n.call(e, i)) {
              if (
                ((r = e[i]) || (null != r && !isNaN(r)) || (r = ""),
                (i = o(i)),
                (r = o(r)),
                null === i || null === r)
              )
                continue;
              a.push(i + "=" + r);
            }
          return a.length ? t + a.join("&") : "";
        }),
          (t.parse = function (e) {
            for (var t, n = /([^=?#&]+)=?([^&]*)/g, o = {}; (t = n.exec(e)); ) {
              var i = r(t[1]),
                a = r(t[2]);
              null === i || null === a || i in o || (o[i] = a);
            }
            return o;
          });
      },
      63: (e) => {
        "use strict";
        e.exports = function (e, t) {
          if (((t = t.split(":")[0]), !(e = +e))) return !1;
          switch (t) {
            case "http":
            case "ws":
              return 80 !== e;
            case "https":
            case "wss":
              return 443 !== e;
            case "ftp":
              return 21 !== e;
            case "gopher":
              return 70 !== e;
            case "file":
              return !1;
          }
          return 0 !== e;
        };
      },
      571: function (e) {
        var t;
        e.exports =
          (((t = function () {
            function e(e) {
              return o.appendChild(e.dom), e;
            }
            function n(e) {
              for (var t = 0; t < o.children.length; t++)
                o.children[t].style.display = t === e ? "block" : "none";
              r = e;
            }
            var r = 0,
              o = document.createElement("div");
            (o.style.cssText =
              "position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000"),
              o.addEventListener(
                "click",
                function (e) {
                  e.preventDefault(), n(++r % o.children.length);
                },
                !1
              );
            var i = (performance || Date).now(),
              a = i,
              s = 0,
              c = e(new t.Panel("FPS", "#0ff", "#002")),
              u = e(new t.Panel("MS", "#0f0", "#020"));
            if (self.performance && self.performance.memory)
              var l = e(new t.Panel("MB", "#f08", "#201"));
            return (
              n(0),
              {
                REVISION: 16,
                dom: o,
                addPanel: e,
                showPanel: n,
                begin: function () {
                  i = (performance || Date).now();
                },
                end: function () {
                  s++;
                  var e = (performance || Date).now();
                  if (
                    (u.update(e - i, 200),
                    e > a + 1e3 &&
                      (c.update((1e3 * s) / (e - a), 100), (a = e), (s = 0), l))
                  ) {
                    var t = performance.memory;
                    l.update(
                      t.usedJSHeapSize / 1048576,
                      t.jsHeapSizeLimit / 1048576
                    );
                  }
                  return e;
                },
                update: function () {
                  i = this.end();
                },
                domElement: o,
                setMode: n,
              }
            );
          }).Panel = function (e, t, n) {
            var r = 1 / 0,
              o = 0,
              i = Math.round,
              a = i(window.devicePixelRatio || 1),
              s = 80 * a,
              c = 48 * a,
              u = 3 * a,
              l = 2 * a,
              h = 3 * a,
              d = 15 * a,
              _ = 74 * a,
              f = 30 * a,
              p = document.createElement("canvas");
            (p.width = s),
              (p.height = c),
              (p.style.cssText = "width:80px;height:48px");
            var m = p.getContext("2d");
            return (
              (m.font = "bold " + 9 * a + "px Helvetica,Arial,sans-serif"),
              (m.textBaseline = "top"),
              (m.fillStyle = n),
              m.fillRect(0, 0, s, c),
              (m.fillStyle = t),
              m.fillText(e, u, l),
              m.fillRect(h, d, _, f),
              (m.fillStyle = n),
              (m.globalAlpha = 0.9),
              m.fillRect(h, d, _, f),
              {
                dom: p,
                update: function (c, E) {
                  (r = Math.min(r, c)),
                    (o = Math.max(o, c)),
                    (m.fillStyle = n),
                    (m.globalAlpha = 1),
                    m.fillRect(0, 0, s, d),
                    (m.fillStyle = t),
                    m.fillText(
                      i(c) + " " + e + " (" + i(r) + "-" + i(o) + ")",
                      u,
                      l
                    ),
                    m.drawImage(p, h + a, d, _ - a, f, h, d, _ - a, f),
                    m.fillRect(h + _ - a, d, a, f),
                    (m.fillStyle = n),
                    (m.globalAlpha = 0.9),
                    m.fillRect(h + _ - a, d, a, i((1 - c / E) * f));
                },
              }
            );
          }),
          t);
      },
      160: (e, t, n) => {
        "use strict";
        var r = n(63),
          o = n(992),
          i =
            /^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/,
          a = /[\n\r\t]/g,
          s = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//,
          c = /:\d+$/,
          u = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i,
          l = /^[a-zA-Z]:/;
        function h(e) {
          return (e || "").toString().replace(i, "");
        }
        var d = [
            ["#", "hash"],
            ["?", "query"],
            function (e, t) {
              return p(t.protocol) ? e.replace(/\\/g, "/") : e;
            },
            ["/", "pathname"],
            ["@", "auth", 1],
            [NaN, "host", void 0, 1, 1],
            [/:(\d*)$/, "port", void 0, 1],
            [NaN, "hostname", void 0, 1, 1],
          ],
          _ = { hash: 1, query: 1 };
        function f(e) {
          var t,
            r =
              ("undefined" != typeof window
                ? window
                : void 0 !== n.g
                ? n.g
                : "undefined" != typeof self
                ? self
                : {}
              ).location || {},
            o = {},
            i = typeof (e = e || r);
          if ("blob:" === e.protocol) o = new E(unescape(e.pathname), {});
          else if ("string" === i)
            for (t in ((o = new E(e, {})), _)) delete o[t];
          else if ("object" === i) {
            for (t in e) t in _ || (o[t] = e[t]);
            void 0 === o.slashes && (o.slashes = s.test(e.href));
          }
          return o;
        }
        function p(e) {
          return (
            "file:" === e ||
            "ftp:" === e ||
            "http:" === e ||
            "https:" === e ||
            "ws:" === e ||
            "wss:" === e
          );
        }
        function m(e, t) {
          (e = (e = h(e)).replace(a, "")), (t = t || {});
          var n,
            r = u.exec(e),
            o = r[1] ? r[1].toLowerCase() : "",
            i = !!r[2],
            s = !!r[3],
            c = 0;
          return (
            i
              ? s
                ? ((n = r[2] + r[3] + r[4]), (c = r[2].length + r[3].length))
                : ((n = r[2] + r[4]), (c = r[2].length))
              : s
              ? ((n = r[3] + r[4]), (c = r[3].length))
              : (n = r[4]),
            "file:" === o
              ? c >= 2 && (n = n.slice(2))
              : p(o)
              ? (n = r[4])
              : o
              ? i && (n = n.slice(2))
              : c >= 2 && p(t.protocol) && (n = r[4]),
            { protocol: o, slashes: i || p(o), slashesCount: c, rest: n }
          );
        }
        function E(e, t, n) {
          if (((e = (e = h(e)).replace(a, "")), !(this instanceof E)))
            return new E(e, t, n);
          var i,
            s,
            c,
            u,
            _,
            v,
            g = d.slice(),
            x = typeof t,
            T = this,
            b = 0;
          for (
            "object" !== x && "string" !== x && ((n = t), (t = null)),
              n && "function" != typeof n && (n = o.parse),
              i = !(s = m(e || "", (t = f(t)))).protocol && !s.slashes,
              T.slashes = s.slashes || (i && t.slashes),
              T.protocol = s.protocol || t.protocol || "",
              e = s.rest,
              (("file:" === s.protocol &&
                (2 !== s.slashesCount || l.test(e))) ||
                (!s.slashes &&
                  (s.protocol || s.slashesCount < 2 || !p(T.protocol)))) &&
                (g[3] = [/(.*)/, "pathname"]);
            b < g.length;
            b++
          )
            "function" != typeof (u = g[b])
              ? ((c = u[0]),
                (v = u[1]),
                c != c
                  ? (T[v] = e)
                  : "string" == typeof c
                  ? ~(_ = "@" === c ? e.lastIndexOf(c) : e.indexOf(c)) &&
                    ("number" == typeof u[2]
                      ? ((T[v] = e.slice(0, _)), (e = e.slice(_ + u[2])))
                      : ((T[v] = e.slice(_)), (e = e.slice(0, _))))
                  : (_ = c.exec(e)) &&
                    ((T[v] = _[1]), (e = e.slice(0, _.index))),
                (T[v] = T[v] || (i && u[3] && t[v]) || ""),
                u[4] && (T[v] = T[v].toLowerCase()))
              : (e = u(e, T));
          n && (T.query = n(T.query)),
            i &&
              t.slashes &&
              "/" !== T.pathname.charAt(0) &&
              ("" !== T.pathname || "" !== t.pathname) &&
              (T.pathname = (function (e, t) {
                if ("" === e) return t;
                for (
                  var n = (t || "/")
                      .split("/")
                      .slice(0, -1)
                      .concat(e.split("/")),
                    r = n.length,
                    o = n[r - 1],
                    i = !1,
                    a = 0;
                  r--;

                )
                  "." === n[r]
                    ? n.splice(r, 1)
                    : ".." === n[r]
                    ? (n.splice(r, 1), a++)
                    : a && (0 === r && (i = !0), n.splice(r, 1), a--);
                return (
                  i && n.unshift(""),
                  ("." !== o && ".." !== o) || n.push(""),
                  n.join("/")
                );
              })(T.pathname, t.pathname)),
            "/" !== T.pathname.charAt(0) &&
              p(T.protocol) &&
              (T.pathname = "/" + T.pathname),
            r(T.port, T.protocol) || ((T.host = T.hostname), (T.port = "")),
            (T.username = T.password = ""),
            T.auth &&
              (~(_ = T.auth.indexOf(":"))
                ? ((T.username = T.auth.slice(0, _)),
                  (T.username = encodeURIComponent(
                    decodeURIComponent(T.username)
                  )),
                  (T.password = T.auth.slice(_ + 1)),
                  (T.password = encodeURIComponent(
                    decodeURIComponent(T.password)
                  )))
                : (T.username = encodeURIComponent(decodeURIComponent(T.auth))),
              (T.auth = T.password
                ? T.username + ":" + T.password
                : T.username)),
            (T.origin =
              "file:" !== T.protocol && p(T.protocol) && T.host
                ? T.protocol + "//" + T.host
                : "null"),
            (T.href = T.toString());
        }
        (E.prototype = {
          set: function (e, t, n) {
            var i = this;
            switch (e) {
              case "query":
                "string" == typeof t && t.length && (t = (n || o.parse)(t)),
                  (i[e] = t);
                break;
              case "port":
                (i[e] = t),
                  r(t, i.protocol)
                    ? t && (i.host = i.hostname + ":" + t)
                    : ((i.host = i.hostname), (i[e] = ""));
                break;
              case "hostname":
                (i[e] = t), i.port && (t += ":" + i.port), (i.host = t);
                break;
              case "host":
                (i[e] = t),
                  c.test(t)
                    ? ((t = t.split(":")),
                      (i.port = t.pop()),
                      (i.hostname = t.join(":")))
                    : ((i.hostname = t), (i.port = ""));
                break;
              case "protocol":
                (i.protocol = t.toLowerCase()), (i.slashes = !n);
                break;
              case "pathname":
              case "hash":
                if (t) {
                  var a = "pathname" === e ? "/" : "#";
                  i[e] = t.charAt(0) !== a ? a + t : t;
                } else i[e] = t;
                break;
              case "username":
              case "password":
                i[e] = encodeURIComponent(t);
                break;
              case "auth":
                var s = t.indexOf(":");
                ~s
                  ? ((i.username = t.slice(0, s)),
                    (i.username = encodeURIComponent(
                      decodeURIComponent(i.username)
                    )),
                    (i.password = t.slice(s + 1)),
                    (i.password = encodeURIComponent(
                      decodeURIComponent(i.password)
                    )))
                  : (i.username = encodeURIComponent(decodeURIComponent(t)));
            }
            for (var u = 0; u < d.length; u++) {
              var l = d[u];
              l[4] && (i[l[1]] = i[l[1]].toLowerCase());
            }
            return (
              (i.auth = i.password
                ? i.username + ":" + i.password
                : i.username),
              (i.origin =
                "file:" !== i.protocol && p(i.protocol) && i.host
                  ? i.protocol + "//" + i.host
                  : "null"),
              (i.href = i.toString()),
              i
            );
          },
          toString: function (e) {
            (e && "function" == typeof e) || (e = o.stringify);
            var t,
              n = this,
              r = n.host,
              i = n.protocol;
            i && ":" !== i.charAt(i.length - 1) && (i += ":");
            var a =
              i + ((n.protocol && n.slashes) || p(n.protocol) ? "//" : "");
            return (
              n.username
                ? ((a += n.username),
                  n.password && (a += ":" + n.password),
                  (a += "@"))
                : n.password
                ? ((a += ":" + n.password), (a += "@"))
                : "file:" !== n.protocol &&
                  p(n.protocol) &&
                  !r &&
                  "/" !== n.pathname &&
                  (a += "@"),
              (":" === r[r.length - 1] || (c.test(n.hostname) && !n.port)) &&
                (r += ":"),
              (a += r + n.pathname),
              (t = "object" == typeof n.query ? e(n.query) : n.query) &&
                (a += "?" !== t.charAt(0) ? "?" + t : t),
              n.hash && (a += n.hash),
              a
            );
          },
        }),
          (E.extractProtocol = m),
          (E.location = f),
          (E.trimLeft = h),
          (E.qs = o),
          (e.exports = E);
      },
      470: () => {
        Array.prototype.flat ||
          Object.defineProperty(Array.prototype, "flat", {
            configurable: !0,
            value: function e() {
              var t = isNaN(arguments[0]) ? 1 : Number(arguments[0]);
              return t
                ? Array.prototype.reduce.call(
                    this,
                    function (n, r) {
                      return (
                        Array.isArray(r)
                          ? n.push.apply(n, e.call(r, t - 1))
                          : n.push(r),
                        n
                      );
                    },
                    []
                  )
                : Array.prototype.slice.call(this);
            },
            writable: !0,
          });
      },
    },
    t = {};
  function n(r) {
    var o = t[r];
    if (void 0 !== o) return o.exports;
    var i = (t[r] = { exports: {} });
    return e[r].call(i.exports, i, i.exports, n), i.exports;
  }
  (n.n = (e) => {
    var t = e && e.__esModule ? () => e.default : () => e;
    return n.d(t, { a: t }), t;
  }),
    (n.d = (e, t) => {
      for (var r in t)
        n.o(t, r) &&
          !n.o(e, r) &&
          Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
    }),
    (n.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if ("object" == typeof window) return window;
      }
    })()),
    (n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (n.r = (e) => {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (() => {
      "use strict";
      var e = n(7),
        t = n.n(e),
        r = n(228),
        o = n.n(r),
        i = n(823);
      function a(e, t) {
        const n = e.getExtension(t);
        if (!n) return !1;
        const r = t.split("_")[0],
          o = new RegExp(`${r}$`);
        for (const t in n)
          if ("function" == typeof n[t]) {
            const r = t.replace(o, "");
            t.substring && (e[r] = n[t].bind(n));
          }
        return !0;
      }
      const s = [
          "EXT_shader_texture_lod",
          "EXT_sRGB",
          "EXT_frag_depth",
          "OES_texture_float",
          "OES_texture_half_float",
          "OES_texture_float_linear",
          "OES_texture_half_float_linear",
          "OES_standard_derivatives",
          "OES_element_index_uint",
          "EXT_texture_filter_anisotropic",
          "EXT_color_buffer_half_float",
          "OES_vertex_array_object",
          "WEBGL_depth_texture",
          "ANGLE_instanced_arrays",
          "WEBGL_color_buffer_float",
          "WEBGL_draw_buffers",
          "EXT_color_buffer_float",
        ],
        c = (() => {
          let e = !1;
          return (
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
              navigator.userAgent
            ) && (e = !0),
            e
          );
        })(),
        u = (e, t) => {
          if ("number" == typeof e) return i.equals(e, t);
          if (e.length !== t.length) return !1;
          let n = !0;
          return (
            e.forEach((e, r) => {
              n = i.equals(e, t[r]) && n;
            }),
            n
          );
        },
        l = {
          ACTIVE_ATTRIBUTES: 35721,
          ACTIVE_ATTRIBUTE_MAX_LENGTH: 35722,
          ACTIVE_TEXTURE: 34016,
          ACTIVE_UNIFORMS: 35718,
          ACTIVE_UNIFORM_MAX_LENGTH: 35719,
          ALIASED_LINE_WIDTH_RANGE: 33902,
          ALIASED_POINT_SIZE_RANGE: 33901,
          ALPHA: 6406,
          ALPHA_BITS: 3413,
          ALWAYS: 519,
          ARRAY_BUFFER: 34962,
          ARRAY_BUFFER_BINDING: 34964,
          ATTACHED_SHADERS: 35717,
          BACK: 1029,
          BLEND: 3042,
          BLEND_COLOR: 32773,
          BLEND_DST_ALPHA: 32970,
          BLEND_DST_RGB: 32968,
          BLEND_EQUATION: 32777,
          BLEND_EQUATION_ALPHA: 34877,
          BLEND_EQUATION_RGB: 32777,
          BLEND_SRC_ALPHA: 32971,
          BLEND_SRC_RGB: 32969,
          BLUE_BITS: 3412,
          BOOL: 35670,
          BOOL_VEC2: 35671,
          BOOL_VEC3: 35672,
          BOOL_VEC4: 35673,
          BROWSER_DEFAULT_WEBGL: 37444,
          BUFFER_SIZE: 34660,
          BUFFER_USAGE: 34661,
          BYTE: 5120,
          CCW: 2305,
          CLAMP_TO_EDGE: 33071,
          COLOR_ATTACHMENT0: 36064,
          COLOR_BUFFER_BIT: 16384,
          COLOR_CLEAR_VALUE: 3106,
          COLOR_WRITEMASK: 3107,
          COMPILE_STATUS: 35713,
          COMPRESSED_TEXTURE_FORMATS: 34467,
          CONSTANT_ALPHA: 32771,
          CONSTANT_COLOR: 32769,
          CONTEXT_LOST_WEBGL: 37442,
          CULL_FACE: 2884,
          CULL_FACE_MODE: 2885,
          CURRENT_PROGRAM: 35725,
          CURRENT_VERTEX_ATTRIB: 34342,
          CW: 2304,
          DECR: 7683,
          DECR_WRAP: 34056,
          DELETE_STATUS: 35712,
          DEPTH_ATTACHMENT: 36096,
          DEPTH_BITS: 3414,
          DEPTH_BUFFER_BIT: 256,
          DEPTH_CLEAR_VALUE: 2931,
          DEPTH_COMPONENT: 6402,
          RED: 6403,
          DEPTH_COMPONENT16: 33189,
          DEPTH_FUNC: 2932,
          DEPTH_RANGE: 2928,
          DEPTH_STENCIL: 34041,
          DEPTH_STENCIL_ATTACHMENT: 33306,
          DEPTH_TEST: 2929,
          DEPTH_WRITEMASK: 2930,
          DITHER: 3024,
          DONT_CARE: 4352,
          DST_ALPHA: 772,
          DST_COLOR: 774,
          DYNAMIC_DRAW: 35048,
          ELEMENT_ARRAY_BUFFER: 34963,
          ELEMENT_ARRAY_BUFFER_BINDING: 34965,
          EQUAL: 514,
          FASTEST: 4353,
          FLOAT: 5126,
          FLOAT_MAT2: 35674,
          FLOAT_MAT3: 35675,
          FLOAT_MAT4: 35676,
          FLOAT_VEC2: 35664,
          FLOAT_VEC3: 35665,
          FLOAT_VEC4: 35666,
          FRAGMENT_SHADER: 35632,
          FRAMEBUFFER: 36160,
          FRAMEBUFFER_ATTACHMENT_OBJECT_NAME: 36049,
          FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE: 36048,
          FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE: 36051,
          FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL: 36050,
          FRAMEBUFFER_BINDING: 36006,
          FRAMEBUFFER_COMPLETE: 36053,
          FRAMEBUFFER_INCOMPLETE_ATTACHMENT: 36054,
          FRAMEBUFFER_INCOMPLETE_DIMENSIONS: 36057,
          FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT: 36055,
          FRAMEBUFFER_UNSUPPORTED: 36061,
          FRONT: 1028,
          FRONT_AND_BACK: 1032,
          FRONT_FACE: 2886,
          FUNC_ADD: 32774,
          FUNC_REVERSE_SUBTRACT: 32779,
          FUNC_SUBTRACT: 32778,
          GENERATE_MIPMAP_HINT: 33170,
          GEQUAL: 518,
          GREATER: 516,
          GREEN_BITS: 3411,
          HALF_FLOAT: 36193,
          HIGH_FLOAT: 36338,
          HIGH_INT: 36341,
          INCR: 7682,
          INCR_WRAP: 34055,
          INFO_LOG_LENGTH: 35716,
          INT: 5124,
          INT_VEC2: 35667,
          INT_VEC3: 35668,
          INT_VEC4: 35669,
          INVALID_ENUM: 1280,
          INVALID_FRAMEBUFFER_OPERATION: 1286,
          INVALID_OPERATION: 1282,
          INVALID_VALUE: 1281,
          INVERT: 5386,
          KEEP: 7680,
          LEQUAL: 515,
          LESS: 513,
          LINEAR: 9729,
          LINEAR_MIPMAP_LINEAR: 9987,
          LINEAR_MIPMAP_NEAREST: 9985,
          LINES: 1,
          LINE_LOOP: 2,
          LINE_STRIP: 3,
          LINE_WIDTH: 2849,
          LINK_STATUS: 35714,
          LOW_FLOAT: 36336,
          LOW_INT: 36339,
          LUMINANCE: 6409,
          LUMINANCE_ALPHA: 6410,
          MAX_COMBINED_TEXTURE_IMAGE_UNITS: 35661,
          MAX_CUBE_MAP_TEXTURE_SIZE: 34076,
          MAX_FRAGMENT_UNIFORM_VECTORS: 36349,
          MAX_RENDERBUFFER_SIZE: 34024,
          MAX_TEXTURE_IMAGE_UNITS: 34930,
          MAX_TEXTURE_SIZE: 3379,
          MAX_VARYING_VECTORS: 36348,
          MAX_VERTEX_ATTRIBS: 34921,
          MAX_VERTEX_TEXTURE_IMAGE_UNITS: 35660,
          MAX_VERTEX_UNIFORM_VECTORS: 36347,
          MAX_VIEWPORT_DIMS: 3386,
          MEDIUM_FLOAT: 36337,
          MEDIUM_INT: 36340,
          MIRRORED_REPEAT: 33648,
          NEAREST: 9728,
          NEAREST_MIPMAP_LINEAR: 9986,
          NEAREST_MIPMAP_NEAREST: 9984,
          NEVER: 512,
          NICEST: 4354,
          NONE: 0,
          NOTEQUAL: 517,
          NO_ERROR: 0,
          NUM_COMPRESSED_TEXTURE_FORMATS: 34466,
          ONE: 1,
          ONE_MINUS_CONSTANT_ALPHA: 32772,
          ONE_MINUS_CONSTANT_COLOR: 32770,
          ONE_MINUS_DST_ALPHA: 773,
          ONE_MINUS_DST_COLOR: 775,
          ONE_MINUS_SRC_ALPHA: 771,
          ONE_MINUS_SRC_COLOR: 769,
          OUT_OF_MEMORY: 1285,
          PACK_ALIGNMENT: 3333,
          POINTS: 0,
          POLYGON_OFFSET_FACTOR: 32824,
          POLYGON_OFFSET_FILL: 32823,
          POLYGON_OFFSET_UNITS: 10752,
          RED_BITS: 3410,
          RENDERBUFFER: 36161,
          RENDERBUFFER_ALPHA_SIZE: 36179,
          RENDERBUFFER_BINDING: 36007,
          RENDERBUFFER_BLUE_SIZE: 36178,
          RENDERBUFFER_DEPTH_SIZE: 36180,
          RENDERBUFFER_GREEN_SIZE: 36177,
          RENDERBUFFER_HEIGHT: 36163,
          RENDERBUFFER_INTERNAL_FORMAT: 36164,
          RENDERBUFFER_RED_SIZE: 36176,
          RENDERBUFFER_STENCIL_SIZE: 36181,
          RENDERBUFFER_WIDTH: 36162,
          RENDERER: 7937,
          REPEAT: 10497,
          REPLACE: 7681,
          RGB: 6407,
          RGB5_A1: 32855,
          RGB565: 36194,
          RGBA: 6408,
          RGBA4: 32854,
          SAMPLER_2D: 35678,
          SAMPLER_CUBE: 35680,
          SAMPLES: 32937,
          SAMPLE_ALPHA_TO_COVERAGE: 32926,
          SAMPLE_BUFFERS: 32936,
          SAMPLE_COVERAGE: 32928,
          SAMPLE_COVERAGE_INVERT: 32939,
          SAMPLE_COVERAGE_VALUE: 32938,
          SCISSOR_BOX: 3088,
          SCISSOR_TEST: 3089,
          SHADER_COMPILER: 36346,
          SHADER_SOURCE_LENGTH: 35720,
          SHADER_TYPE: 35663,
          SHADING_LANGUAGE_VERSION: 35724,
          SHORT: 5122,
          SRC_ALPHA: 770,
          SRC_ALPHA_SATURATE: 776,
          SRC_COLOR: 768,
          STATIC_DRAW: 35044,
          STENCIL_ATTACHMENT: 36128,
          STENCIL_BACK_FAIL: 34817,
          STENCIL_BACK_FUNC: 34816,
          STENCIL_BACK_PASS_DEPTH_FAIL: 34818,
          STENCIL_BACK_PASS_DEPTH_PASS: 34819,
          STENCIL_BACK_REF: 36003,
          STENCIL_BACK_VALUE_MASK: 36004,
          STENCIL_BACK_WRITEMASK: 36005,
          STENCIL_BITS: 3415,
          STENCIL_BUFFER_BIT: 1024,
          STENCIL_CLEAR_VALUE: 2961,
          STENCIL_FAIL: 2964,
          STENCIL_FUNC: 2962,
          STENCIL_INDEX: 6401,
          STENCIL_INDEX8: 36168,
          STENCIL_PASS_DEPTH_FAIL: 2965,
          STENCIL_PASS_DEPTH_PASS: 2966,
          STENCIL_REF: 2967,
          STENCIL_TEST: 2960,
          STENCIL_VALUE_MASK: 2963,
          STENCIL_WRITEMASK: 2968,
          STREAM_DRAW: 35040,
          SUBPIXEL_BITS: 3408,
          TEXTURE: 5890,
          TEXTURE0: 33984,
          TEXTURE1: 33985,
          TEXTURE2: 33986,
          TEXTURE3: 33987,
          TEXTURE4: 33988,
          TEXTURE5: 33989,
          TEXTURE6: 33990,
          TEXTURE7: 33991,
          TEXTURE8: 33992,
          TEXTURE9: 33993,
          TEXTURE10: 33994,
          TEXTURE11: 33995,
          TEXTURE12: 33996,
          TEXTURE13: 33997,
          TEXTURE14: 33998,
          TEXTURE15: 33999,
          TEXTURE16: 34e3,
          TEXTURE17: 34001,
          TEXTURE18: 34002,
          TEXTURE19: 34003,
          TEXTURE20: 34004,
          TEXTURE21: 34005,
          TEXTURE22: 34006,
          TEXTURE23: 34007,
          TEXTURE24: 34008,
          TEXTURE25: 34009,
          TEXTURE26: 34010,
          TEXTURE27: 34011,
          TEXTURE28: 34012,
          TEXTURE29: 34013,
          TEXTURE30: 34014,
          TEXTURE31: 34015,
          TEXTURE_2D: 3553,
          TEXTURE_BINDING_2D: 32873,
          TEXTURE_BINDING_CUBE_MAP: 34068,
          TEXTURE_CUBE_MAP: 34067,
          TEXTURE_CUBE_MAP_NEGATIVE_X: 34070,
          TEXTURE_CUBE_MAP_NEGATIVE_Y: 34072,
          TEXTURE_CUBE_MAP_NEGATIVE_Z: 34074,
          TEXTURE_CUBE_MAP_POSITIVE_X: 34069,
          TEXTURE_CUBE_MAP_POSITIVE_Y: 34071,
          TEXTURE_CUBE_MAP_POSITIVE_Z: 34073,
          TEXTURE_MAG_FILTER: 10240,
          TEXTURE_MIN_FILTER: 10241,
          TEXTURE_WRAP_S: 10242,
          TEXTURE_WRAP_T: 10243,
          TRIANGLES: 4,
          TRIANGLE_FAN: 6,
          TRIANGLE_STRIP: 5,
          UNPACK_ALIGNMENT: 3317,
          UNPACK_COLORSPACE_CONVERSION_WEBGL: 37443,
          UNPACK_FLIP_Y_WEBGL: 37440,
          UNPACK_PREMULTIPLY_ALPHA_WEBGL: 37441,
          UNSIGNED_BYTE: 5121,
          UNSIGNED_INT: 5125,
          UNSIGNED_SHORT: 5123,
          UNSIGNED_SHORT_4_4_4_4: 32819,
          UNSIGNED_SHORT_5_5_5_1: 32820,
          UNSIGNED_SHORT_5_6_5: 33635,
          VALIDATE_STATUS: 35715,
          VENDOR: 7936,
          VERSION: 7938,
          VERTEX_ATTRIB_ARRAY_BUFFER_BINDING: 34975,
          VERTEX_ATTRIB_ARRAY_ENABLED: 34338,
          VERTEX_ATTRIB_ARRAY_NORMALIZED: 34922,
          VERTEX_ATTRIB_ARRAY_POINTER: 34373,
          VERTEX_ATTRIB_ARRAY_SIZE: 34339,
          VERTEX_ATTRIB_ARRAY_STRIDE: 34340,
          VERTEX_ATTRIB_ARRAY_TYPE: 34341,
          VERTEX_SHADER: 35633,
          VIEWPORT: 2978,
          ZERO: 0,
          R8: 33321,
        },
        h = {
          0: "NONE",
          1: "ONE",
          2: "LINE_LOOP",
          3: "LINE_STRIP",
          4: "TRIANGLES",
          5: "TRIANGLE_STRIP",
          6: "TRIANGLE_FAN",
          256: "DEPTH_BUFFER_BIT",
          512: "NEVER",
          513: "LESS",
          514: "EQUAL",
          515: "LEQUAL",
          516: "GREATER",
          517: "NOTEQUAL",
          518: "GEQUAL",
          519: "ALWAYS",
          768: "SRC_COLOR",
          769: "ONE_MINUS_SRC_COLOR",
          770: "SRC_ALPHA",
          771: "ONE_MINUS_SRC_ALPHA",
          772: "DST_ALPHA",
          773: "ONE_MINUS_DST_ALPHA",
          774: "DST_COLOR",
          775: "ONE_MINUS_DST_COLOR",
          776: "SRC_ALPHA_SATURATE",
          1024: "STENCIL_BUFFER_BIT",
          1028: "FRONT",
          1029: "BACK",
          1032: "FRONT_AND_BACK",
          1280: "INVALID_ENUM",
          1281: "INVALID_VALUE",
          1282: "INVALID_OPERATION",
          1285: "OUT_OF_MEMORY",
          1286: "INVALID_FRAMEBUFFER_OPERATION",
          2304: "CW",
          2305: "CCW",
          2849: "LINE_WIDTH",
          2884: "CULL_FACE",
          2885: "CULL_FACE_MODE",
          2886: "FRONT_FACE",
          2928: "DEPTH_RANGE",
          2929: "DEPTH_TEST",
          2930: "DEPTH_WRITEMASK",
          2931: "DEPTH_CLEAR_VALUE",
          2932: "DEPTH_FUNC",
          2960: "STENCIL_TEST",
          2961: "STENCIL_CLEAR_VALUE",
          2962: "STENCIL_FUNC",
          2963: "STENCIL_VALUE_MASK",
          2964: "STENCIL_FAIL",
          2965: "STENCIL_PASS_DEPTH_FAIL",
          2966: "STENCIL_PASS_DEPTH_PASS",
          2967: "STENCIL_REF",
          2968: "STENCIL_WRITEMASK",
          2978: "VIEWPORT",
          3024: "DITHER",
          3042: "BLEND",
          3088: "SCISSOR_BOX",
          3089: "SCISSOR_TEST",
          3106: "COLOR_CLEAR_VALUE",
          3107: "COLOR_WRITEMASK",
          3317: "UNPACK_ALIGNMENT",
          3333: "PACK_ALIGNMENT",
          3379: "MAX_TEXTURE_SIZE",
          3386: "MAX_VIEWPORT_DIMS",
          3408: "SUBPIXEL_BITS",
          3410: "RED_BITS",
          3411: "GREEN_BITS",
          3412: "BLUE_BITS",
          3413: "ALPHA_BITS",
          3414: "DEPTH_BITS",
          3415: "STENCIL_BITS",
          3553: "TEXTURE_2D",
          4352: "DONT_CARE",
          4353: "FASTEST",
          4354: "NICEST",
          5120: "BYTE",
          5121: "UNSIGNED_BYTE",
          5122: "SHORT",
          5123: "UNSIGNED_SHORT",
          5124: "INT",
          5125: "UNSIGNED_INT",
          5126: "FLOAT",
          5386: "INVERT",
          5890: "TEXTURE",
          6401: "STENCIL_INDEX",
          6402: "DEPTH_COMPONENT",
          6403: "RED",
          6406: "ALPHA",
          6407: "RGB",
          6408: "RGBA",
          6409: "LUMINANCE",
          6410: "LUMINANCE_ALPHA",
          7680: "KEEP",
          7681: "REPLACE",
          7682: "INCR",
          7683: "DECR",
          7936: "VENDOR",
          7937: "RENDERER",
          7938: "VERSION",
          9728: "NEAREST",
          9729: "LINEAR",
          9984: "NEAREST_MIPMAP_NEAREST",
          9985: "LINEAR_MIPMAP_NEAREST",
          9986: "NEAREST_MIPMAP_LINEAR",
          9987: "LINEAR_MIPMAP_LINEAR",
          10240: "TEXTURE_MAG_FILTER",
          10241: "TEXTURE_MIN_FILTER",
          10242: "TEXTURE_WRAP_S",
          10243: "TEXTURE_WRAP_T",
          10497: "REPEAT",
          10752: "POLYGON_OFFSET_UNITS",
          16384: "COLOR_BUFFER_BIT",
          32769: "CONSTANT_COLOR",
          32770: "ONE_MINUS_CONSTANT_COLOR",
          32771: "CONSTANT_ALPHA",
          32772: "ONE_MINUS_CONSTANT_ALPHA",
          32773: "BLEND_COLOR",
          32774: "FUNC_ADD",
          32777: "BLEND_EQUATION_RGB",
          32778: "FUNC_SUBTRACT",
          32779: "FUNC_REVERSE_SUBTRACT",
          32819: "UNSIGNED_SHORT_4_4_4_4",
          32820: "UNSIGNED_SHORT_5_5_5_1",
          32823: "POLYGON_OFFSET_FILL",
          32824: "POLYGON_OFFSET_FACTOR",
          32854: "RGBA4",
          32855: "RGB5_A1",
          32873: "TEXTURE_BINDING_2D",
          32926: "SAMPLE_ALPHA_TO_COVERAGE",
          32928: "SAMPLE_COVERAGE",
          32936: "SAMPLE_BUFFERS",
          32937: "SAMPLES",
          32938: "SAMPLE_COVERAGE_VALUE",
          32939: "SAMPLE_COVERAGE_INVERT",
          32968: "BLEND_DST_RGB",
          32969: "BLEND_SRC_RGB",
          32970: "BLEND_DST_ALPHA",
          32971: "BLEND_SRC_ALPHA",
          33071: "CLAMP_TO_EDGE",
          33170: "GENERATE_MIPMAP_HINT",
          33189: "DEPTH_COMPONENT16",
          33306: "DEPTH_STENCIL_ATTACHMENT",
          33321: "R8",
          33635: "UNSIGNED_SHORT_5_6_5",
          33648: "MIRRORED_REPEAT",
          33901: "ALIASED_POINT_SIZE_RANGE",
          33902: "ALIASED_LINE_WIDTH_RANGE",
          33984: "TEXTURE0",
          33985: "TEXTURE1",
          33986: "TEXTURE2",
          33987: "TEXTURE3",
          33988: "TEXTURE4",
          33989: "TEXTURE5",
          33990: "TEXTURE6",
          33991: "TEXTURE7",
          33992: "TEXTURE8",
          33993: "TEXTURE9",
          33994: "TEXTURE10",
          33995: "TEXTURE11",
          33996: "TEXTURE12",
          33997: "TEXTURE13",
          33998: "TEXTURE14",
          33999: "TEXTURE15",
          34e3: "TEXTURE16",
          34001: "TEXTURE17",
          34002: "TEXTURE18",
          34003: "TEXTURE19",
          34004: "TEXTURE20",
          34005: "TEXTURE21",
          34006: "TEXTURE22",
          34007: "TEXTURE23",
          34008: "TEXTURE24",
          34009: "TEXTURE25",
          34010: "TEXTURE26",
          34011: "TEXTURE27",
          34012: "TEXTURE28",
          34013: "TEXTURE29",
          34014: "TEXTURE30",
          34015: "TEXTURE31",
          34016: "ACTIVE_TEXTURE",
          34024: "MAX_RENDERBUFFER_SIZE",
          34041: "DEPTH_STENCIL",
          34055: "INCR_WRAP",
          34056: "DECR_WRAP",
          34067: "TEXTURE_CUBE_MAP",
          34068: "TEXTURE_BINDING_CUBE_MAP",
          34069: "TEXTURE_CUBE_MAP_POSITIVE_X",
          34070: "TEXTURE_CUBE_MAP_NEGATIVE_X",
          34071: "TEXTURE_CUBE_MAP_POSITIVE_Y",
          34072: "TEXTURE_CUBE_MAP_NEGATIVE_Y",
          34073: "TEXTURE_CUBE_MAP_POSITIVE_Z",
          34074: "TEXTURE_CUBE_MAP_NEGATIVE_Z",
          34076: "MAX_CUBE_MAP_TEXTURE_SIZE",
          34338: "VERTEX_ATTRIB_ARRAY_ENABLED",
          34339: "VERTEX_ATTRIB_ARRAY_SIZE",
          34340: "VERTEX_ATTRIB_ARRAY_STRIDE",
          34341: "VERTEX_ATTRIB_ARRAY_TYPE",
          34342: "CURRENT_VERTEX_ATTRIB",
          34373: "VERTEX_ATTRIB_ARRAY_POINTER",
          34466: "NUM_COMPRESSED_TEXTURE_FORMATS",
          34467: "COMPRESSED_TEXTURE_FORMATS",
          34660: "BUFFER_SIZE",
          34661: "BUFFER_USAGE",
          34816: "STENCIL_BACK_FUNC",
          34817: "STENCIL_BACK_FAIL",
          34818: "STENCIL_BACK_PASS_DEPTH_FAIL",
          34819: "STENCIL_BACK_PASS_DEPTH_PASS",
          34877: "BLEND_EQUATION_ALPHA",
          34921: "MAX_VERTEX_ATTRIBS",
          34922: "VERTEX_ATTRIB_ARRAY_NORMALIZED",
          34930: "MAX_TEXTURE_IMAGE_UNITS",
          34962: "ARRAY_BUFFER",
          34963: "ELEMENT_ARRAY_BUFFER",
          34964: "ARRAY_BUFFER_BINDING",
          34965: "ELEMENT_ARRAY_BUFFER_BINDING",
          34975: "VERTEX_ATTRIB_ARRAY_BUFFER_BINDING",
          35040: "STREAM_DRAW",
          35044: "STATIC_DRAW",
          35048: "DYNAMIC_DRAW",
          35632: "FRAGMENT_SHADER",
          35633: "VERTEX_SHADER",
          35660: "MAX_VERTEX_TEXTURE_IMAGE_UNITS",
          35661: "MAX_COMBINED_TEXTURE_IMAGE_UNITS",
          35663: "SHADER_TYPE",
          35664: "FLOAT_VEC2",
          35665: "FLOAT_VEC3",
          35666: "FLOAT_VEC4",
          35667: "INT_VEC2",
          35668: "INT_VEC3",
          35669: "INT_VEC4",
          35670: "BOOL",
          35671: "BOOL_VEC2",
          35672: "BOOL_VEC3",
          35673: "BOOL_VEC4",
          35674: "FLOAT_MAT2",
          35675: "FLOAT_MAT3",
          35676: "FLOAT_MAT4",
          35678: "SAMPLER_2D",
          35680: "SAMPLER_CUBE",
          35712: "DELETE_STATUS",
          35713: "COMPILE_STATUS",
          35714: "LINK_STATUS",
          35715: "VALIDATE_STATUS",
          35716: "INFO_LOG_LENGTH",
          35717: "ATTACHED_SHADERS",
          35718: "ACTIVE_UNIFORMS",
          35719: "ACTIVE_UNIFORM_MAX_LENGTH",
          35720: "SHADER_SOURCE_LENGTH",
          35721: "ACTIVE_ATTRIBUTES",
          35722: "ACTIVE_ATTRIBUTE_MAX_LENGTH",
          35724: "SHADING_LANGUAGE_VERSION",
          35725: "CURRENT_PROGRAM",
          36003: "STENCIL_BACK_REF",
          36004: "STENCIL_BACK_VALUE_MASK",
          36005: "STENCIL_BACK_WRITEMASK",
          36006: "FRAMEBUFFER_BINDING",
          36007: "RENDERBUFFER_BINDING",
          36048: "FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE",
          36049: "FRAMEBUFFER_ATTACHMENT_OBJECT_NAME",
          36050: "FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL",
          36051: "FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE",
          36053: "FRAMEBUFFER_COMPLETE",
          36054: "FRAMEBUFFER_INCOMPLETE_ATTACHMENT",
          36055: "FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT",
          36057: "FRAMEBUFFER_INCOMPLETE_DIMENSIONS",
          36061: "FRAMEBUFFER_UNSUPPORTED",
          36064: "COLOR_ATTACHMENT0",
          36096: "DEPTH_ATTACHMENT",
          36128: "STENCIL_ATTACHMENT",
          36160: "FRAMEBUFFER",
          36161: "RENDERBUFFER",
          36162: "RENDERBUFFER_WIDTH",
          36163: "RENDERBUFFER_HEIGHT",
          36164: "RENDERBUFFER_INTERNAL_FORMAT",
          36168: "STENCIL_INDEX8",
          36176: "RENDERBUFFER_RED_SIZE",
          36177: "RENDERBUFFER_GREEN_SIZE",
          36178: "RENDERBUFFER_BLUE_SIZE",
          36179: "RENDERBUFFER_ALPHA_SIZE",
          36180: "RENDERBUFFER_DEPTH_SIZE",
          36181: "RENDERBUFFER_STENCIL_SIZE",
          36193: "HALF_FLOAT",
          36194: "RGB565",
          36336: "LOW_FLOAT",
          36337: "MEDIUM_FLOAT",
          36338: "HIGH_FLOAT",
          36339: "LOW_INT",
          36340: "MEDIUM_INT",
          36341: "HIGH_INT",
          36346: "SHADER_COMPILER",
          36347: "MAX_VERTEX_UNIFORM_VECTORS",
          36348: "MAX_VARYING_VECTORS",
          36349: "MAX_FRAGMENT_UNIFORM_VECTORS",
          37440: "UNPACK_FLIP_Y_WEBGL",
          37441: "UNPACK_PREMULTIPLY_ALPHA_WEBGL",
          37442: "CONTEXT_LOST_WEBGL",
          37443: "UNPACK_COLORSPACE_CONVERSION_WEBGL",
          37444: "BROWSER_DEFAULT_WEBGL",
        },
        d = { alpha: !1, depth: !0, premultipliedAlpha: !1 };
      var _ = n(684),
        f = n(409);
      let p = 0;
      function m() {
        let e,
          t,
          n = [0, 0, 0, 0],
          r = 0,
          i = 0,
          m = 0,
          v = (() => {
            const e = document.createElement("canvas");
            return !(
              !e.getContext("experimental-webgl2") && !e.getContext("webgl2")
            );
          })(),
          g = c;
        const x = _.create(),
          T = _.create(),
          b = _.create(),
          A = f.create(),
          y = _.create(),
          R = f.create();
        (this.id = "WebGLContext" + p++),
          this.canvas,
          this.gl,
          (this.CONTEXT_LOST = "contextLost"),
          (this.CONTEXT_RESTORED = "contextRestored"),
          (this.shaderCount = 0),
          (this.bufferCount = 0),
          (this.textureCount = 0),
          (this.frameBufferCount = 0),
          (this.maxAnisotropy = 0),
          (this.multiRenderTargetSupport = !1),
          (this.maxMultiRenderTargets = 0),
          (this.init = function (e, t = {}) {
            const n = o()({}, d, t);
            if (void 0 !== e) {
              if (e instanceof HTMLCanvasElement) {
                this.canvas = e;
                let r = v ? "webgl2" : "webgl";
                t.webgl1 && ((r = "webgl"), (v = !1)),
                  (this.gl = e.getContext(r, n));
              } else
                window.WebGL2RenderingContext &&
                e instanceof WebGL2RenderingContext
                  ? ((v = !0), (this.gl = e), (this.canvas = e.canvas))
                  : e instanceof WebGLRenderingContext
                  ? ((v = !1), (this.gl = e), (this.canvas = e.canvas))
                  : console.error(
                      "The source has to be one of the following : Canvas, WebGLRenderingContext or WebGL2RenderingContext"
                    );
              this.canvas.addEventListener("webglcontextlost", S),
                this.canvas.addEventListener("webglcontextrestored", C),
                (this.extensions = ((e) => {
                  const { gl: t } = e,
                    n =
                      window.WebGL2RenderingContext &&
                      t instanceof WebGL2RenderingContext,
                    r = {};
                  s.forEach((e) => {
                    r[e] = t.getExtension(e);
                  }),
                    n ||
                      (r.OES_vertex_array_object ||
                        console.error(
                          "OES_vertex_array_object extension is not supported"
                        ),
                      a(t, "OES_vertex_array_object"),
                      a(t, "ANGLE_instanced_arrays"),
                      a(t, "WEBGL_draw_buffers"));
                  const o = r.EXT_texture_filter_anisotropic;
                  if (
                    (o &&
                      (e.maxAnisotropy = t.getParameter(
                        o.MAX_TEXTURE_MAX_ANISOTROPY_EXT
                      )),
                    (e.multiRenderTargetSupport = !!e.gl.drawBuffers),
                    e.multiRenderTargetSupport)
                  ) {
                    const n =
                      e.gl.MAX_DRAW_BUFFERS ||
                      r.WEBGL_draw_buffers.MAX_DRAW_BUFFERS_WEBGL;
                    e.maxMultiRenderTargets = t.getParameter(n);
                  }
                  return r;
                })(this)),
                ((e) => {
                  for (const t in l)
                    e[t] ? console.log("already exist : ", t) : (e[t] = l[t]);
                  if (e.webgl2) {
                    const t = /^[^a-z]*$/;
                    for (const n in e.gl)
                      t.test(n) &&
                        -1 === n.indexOf("FLOAT") &&
                        ((e[n] = e.gl[n]), (l[n] = e.gl[n]), (h[e[n]] = n));
                  }
                })(this),
                this.setSize(this.canvas.width, this.canvas.height),
                this.enable(this.BLEND),
                this.enableAlphaBlending(),
                this.enable(this.DEPTH_TEST),
                this.enable(this.CULL_FACE),
                this.cullFace(E.BACK);
            } else {
              const e = document.createElement("canvas");
              this.init(e, n);
            }
          }),
          (this.clear = function (e = 0, t = 0, n = 0, r = 0) {
            const { gl: o } = this;
            o.clearColor(e, t, n, r),
              o.clear(o.COLOR_BUFFER_BIT | o.DEPTH_BUFFER_BIT);
          }),
          (this.setSize = function (e, t) {
            (i = Math.floor(e)),
              (m = Math.floor(t)),
              (this.canvas.width = i),
              (this.canvas.height = m),
              (r = i / m),
              this.viewport(0, 0, i, m);
          }),
          (this.viewport = function (e, t, r, o) {
            u(n, [e, t, r, o]) ||
              ((n = [e, t, r, o]), this.gl.viewport(e, t, r, o));
          }),
          (this.scissor = function (e, t, n, r) {
            this.gl.scissor(e, t, n, r);
          }),
          (this.getViewport = function () {
            return n;
          }),
          (this.getAspectRatio = function () {
            return r;
          }),
          (this.enable = function (e) {
            this.gl.enable(e);
          }),
          (this.disable = function (e) {
            this.gl.disable(e);
          }),
          (this.cullFace = function (e) {
            this.gl.cullFace(e);
          }),
          (this.enableAlphaBlending = function () {
            const { gl: e } = this;
            e.blendFunc(e.SRC_ALPHA, e.ONE_MINUS_SRC_ALPHA);
          }),
          (this.enableAdditiveBlending = function () {
            const { gl: e } = this;
            e.blendFunc(e.ONE, e.ONE);
          }),
          (this.setMatrices = function (e) {
            (t = e), this.setModelMatrix(T);
          }),
          (this.setModelMatrix = function (e) {
            _.copy(b, e),
              void 0 !== t &&
                (_.multiply(x, t.viewMatrix, b),
                f.fromMat4(A, x),
                f.invert(A, A),
                f.transpose(A, A),
                f.fromMat4(R, x),
                f.invert(R, R),
                _.invert(y, t.viewMatrix));
          }),
          (this.useShader = function (t) {
            (e = t),
              (this.shaderProgram = t.shaderProgram),
              this.gl.useProgram(this.shaderProgram);
          }),
          (this.draw = function (t) {
            if (t.length) return void t.forEach((e) => this.draw(e));
            M(), e.updateUniforms(), t.bind(this);
            const { drawType: n } = t,
              { gl: r } = this;
            t.isInstanced
              ? r.drawElementsInstanced(
                  t.drawType,
                  t.numItems,
                  r.UNSIGNED_INT,
                  0,
                  t.numInstance
                )
              : n === r.POINTS
              ? r.drawArrays(n, 0, t.vertexSize)
              : r.drawElements(n, t.numItems, r.UNSIGNED_INT, 0),
              t.unbind();
          }),
          (this.getCamera = function () {
            return t;
          }),
          (this.destroy = function (e = !0) {
            this.gl.getExtension("WEBGL_lose_context").loseContext(),
              e &&
                void 0 !== this.canvas.parentNode &&
                this.canvas.parentNode.removeChild(this.canvas);
          }),
          this.__defineGetter__("width", function () {
            return i;
          }),
          this.__defineGetter__("height", function () {
            return m;
          }),
          this.__defineGetter__("webgl2", function () {
            return v;
          }),
          this.__defineGetter__("isMobile", function () {
            return g;
          }),
          this.__defineGetter__("aspectRatio", function () {
            return r;
          });
        const M = () => {
            void 0 !== t &&
              (e.uniform("uProjectionMatrix", "mat4", t.projectionMatrix),
              e.uniform("uViewMatrix", "mat4", t.viewMatrix),
              e.uniform("uNormalMatrix", "mat3", A),
              e.uniform("uModelViewMatrixInverse", "mat3", R)),
              e.uniform("uModelMatrix", "mat4", b);
          },
          S = () => {
            this.emit(this.CONTEXT_LOST);
          },
          C = () => {
            this.emit(this.CONTEXT_RESTORED);
          };
      }
      m.prototype = Object.assign(Object.create(t().prototype), {
        constructor: m,
      });
      const E = new m(),
        v = {
          float: "uniform1f",
          vec2: "uniform2fv",
          vec3: "uniform3fv",
          vec4: "uniform4fv",
          int: "uniform1i",
          ivec2: "uniform2i",
          ivec3: "uniform3i",
          ivec4: "uniform4i",
          mat2: "uniformMatrix2fv",
          mat3: "uniformMatrix3fv",
          mat4: "uniformMatrix4fv",
        },
        g = (e) =>
          "number" == typeof e ? e : e.slice ? e.slice(0) : new Float32Array(e),
        x = (e) =>
          "object" == typeof e
            ? (function (e) {
                return 9 === e.length
                  ? "mat3"
                  : 16 === e.length
                  ? "mat4"
                  : `vec${e.length}`;
              })(e)
            : "float";
      function T(e, t) {
        let n;
        (this.vertexShader =
          e ||
          "// basic.vert\n\nprecision highp float;\n#define GLSLIFY 1\nattribute vec3 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec3 aNormal;\n\nuniform mat4 uModelMatrix;\nuniform mat4 uViewMatrix;\nuniform mat4 uProjectionMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec3 vNormal;\n\nvoid main(void) {\n    gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);\n    vTextureCoord = aTextureCoord;\n    vNormal = aNormal;\n}"),
          (this.fragmentShader =
            t ||
            "precision highp float;\n#define GLSLIFY 1\n// varying vec2 vTextureCoord;\n\nvoid main(void) {\n    gl_FragColor = vec4(1.0);\n}"),
          this.shaderProgram;
        let r = {};
        (this.bind = function (e) {
          if (void 0 === e || void 0 === n || e === n) {
            if (((n = e || E), !this.shaderProgram)) {
              const e = o(this.vertexShader, !0),
                t = o(this.fragmentShader, !1);
              i(e, t);
            }
            n.useShader(this);
          } else
            console.error(
              "this shader has been bind to a different WebGL Rendering Context",
              n.id
            );
        }),
          (this.uniform = function (e, t, n) {
            let o, i;
            void 0 === n ? ((i = x(t)), (o = t)) : ((i = t), (o = n));
            const a = v[i];
            if (r[e]) {
              const t = r[e];
              u(t.value, o) || ((t.value = g(o)), (t.changed = !0));
            } else r[e] = { type: i, uniformType: a, value: g(o), changed: !0 };
            return this;
          }),
          (this.updateUniforms = function () {
            if (!n)
              return void console.warn(
                "No WebGL Context has been set yet, please call shader.bind() first"
              );
            const { gl: e } = n;
            for (let t in r) {
              const n = r[t];
              if (n.changed) {
                const r = t;
                n.uniformLoc ||
                  (n.uniformLoc = e.getUniformLocation(this.shaderProgram, r));
                const { uniformLoc: o, uniformType: i, value: a } = n;
                null !== o &&
                  (-1 === i.indexOf("Matrix") ? e[i](o, a) : e[i](o, !1, a)),
                  (n.changed = !1);
              }
            }
          }),
          (this.destroy = function () {
            const { gl: e } = n;
            e.deleteProgram(this.shaderProgram), n.shaderCount--;
          });
        const o = (e, t) => {
            const { gl: r } = n,
              o = t ? n.VERTEX_SHADER : n.FRAGMENT_SHADER,
              i = r.createShader(o);
            return (
              r.shaderSource(i, e),
              r.compileShader(i),
              r.getShaderParameter(i, r.COMPILE_STATUS)
                ? i
                : (console.warn("Error in Shader : ", r.getShaderInfoLog(i)),
                  console.log(
                    ((e) => {
                      const t = e.split("\n");
                      for (let e = 0; e < t.length; e++)
                        t[e] = `${e + 1}: ${t[e]}`;
                      return t.join("\n");
                    })(e)
                  ),
                  null)
            );
          },
          i = (e, t) => {
            const { gl: r } = n;
            (this.shaderProgram = r.createProgram()),
              r.attachShader(this.shaderProgram, e),
              r.attachShader(this.shaderProgram, t),
              r.deleteShader(e),
              r.deleteShader(t),
              r.linkProgram(this.shaderProgram),
              n.shaderCount++;
          };
      }
      function b(e = l.TRIANGLES) {
        (this.drawType = e), (this.numItems = 0);
        let t,
          n,
          r,
          o,
          i,
          a = [],
          s = [],
          c = [],
          u = !0,
          h = !1,
          d = 0;
        (this.bufferData = function (e, t, n, r = l.STATIC_DRAW, o = !1) {
          let i,
            a = [];
          if ("number" == typeof e[0]) {
            if (((i = e), void 0 === n))
              return (
                console.error("Missing element size for flatten data :", t),
                this
              );
            for (let e = 0; e < i.length; e += n) {
              const t = [];
              for (let r = 0; r < n; r++) t.push(i[e + r]);
              a.push(t);
            }
          } else
            (a = e),
              (i = ((e) => {
                if (e[0] instanceof Float32Array) {
                  const t = e.reduce((e, t) => {
                    for (let n = 0; n < t.length; n++) e.push(t[n]);
                    return e;
                  }, []);
                  return t;
                }
                return e.flat();
              })(e));
          const s = void 0 === n ? e[0].length : n;
          return _(i, e, t, s, r, o);
        }),
          (this.bufferInstance = function (e, t) {
            const n = e[0].length;
            return (d = e.length), this.bufferData(e, t, n, l.STATIC_DRAW, !0);
          }),
          (this.bufferVertex = function (e, t = l.STATIC_DRAW) {
            return this.bufferData(e, "aVertexPosition", 3, t);
          }),
          (this.bufferTexCoord = function (e, t = l.STATIC_DRAW) {
            return this.bufferData(e, "aTextureCoord", 2, t);
          }),
          (this.bufferNormal = function (e, t = l.STATIC_DRAW) {
            return this.bufferData(e, "aNormal", 3, t);
          }),
          (this.bufferIndex = function (e, t = l.STATIC_DRAW) {
            return (
              (n = t),
              (r = new Uint32Array(e)),
              (this.numItems = r.length),
              (u = !0),
              this
            );
          }),
          (this.bind = function (e) {
            if (void 0 !== e && void 0 !== i && e !== i)
              return void console.error(
                "this mesh has been bind to a different WebGL Rendering Context"
              );
            i = e || GL;
            const { gl: n } = i;
            f(),
              n.bindVertexArray(t),
              (this.vertexSize = this.getSource("aVertexPosition").length);
          }),
          (this.unbind = function () {}),
          (this.getAttribute = function (e) {
            return a.find((t) => t.name === e);
          }),
          (this.getAttributes = function () {
            return a;
          }),
          (this.getSource = function (e) {
            const t = this.getAttribute(e);
            return t ? t.source : [];
          }),
          (this.generateFaces = function () {
            let e, t, n, o, i, a;
            c = [];
            const { vertices: s } = this;
            for (let u = 0; u < r.length; u += 3) {
              (e = r[u]),
                (t = r[u + 1]),
                (n = r[u + 2]),
                (o = s[e]),
                (i = s[t]),
                (a = s[n]);
              const l = { indices: [e, t, n], vertices: [o, i, a] };
              c.push(l);
            }
          }),
          (this.destroy = function () {
            const { gl: e } = i;
            a.forEach((t) => {
              e.deleteBuffer(t.buffer),
                (t.source = []),
                (t.dataArray = []),
                i.bufferCount--;
            }),
              o && (e.deleteBuffer(o), i.bufferCount--),
              e.deleteVertexArray(t),
              (a = []),
              (r = []),
              (s = []);
          }),
          this.__defineGetter__("vertices", function () {
            return this.getSource("aVertexPosition");
          }),
          this.__defineGetter__("coords", function () {
            return this.getSource("aTextureCoord");
          }),
          this.__defineGetter__("normal", function () {
            return this.getSource("aNormal");
          }),
          this.__defineGetter__("indices", function () {
            return r;
          }),
          this.__defineGetter__("faces", function () {
            return c;
          }),
          this.__defineGetter__("isInstanced", function () {
            return h;
          }),
          this.__defineGetter__("numInstance", function () {
            return d;
          });
        const _ = (e, t, n, r, o = l.STATIC_DRAW, i = !1) => {
            const c = o;
            h = i || h;
            const u = new Float32Array(e),
              d = this.getAttribute(n);
            return (
              d
                ? ((d.itemSize = r), (d.dataArray = u), (d.source = t))
                : a.push({
                    name: n,
                    source: t,
                    itemSize: r,
                    usage: c,
                    dataArray: u,
                    isInstanced: i,
                  }),
              s.push(n),
              this
            );
          },
          f = () => {
            const { shaderProgram: e, gl: n } = i;
            0 != s.length &&
              (t || (t = n.createVertexArray()),
              n.bindVertexArray(t),
              a.forEach((t) => {
                if (-1 !== s.indexOf(t.name)) {
                  const r = (function (e, t) {
                    let n;
                    const { gl: r } = t;
                    return (
                      void 0 !== e.buffer
                        ? (n = e.buffer)
                        : ((n = r.createBuffer()),
                          (e.buffer = n),
                          t.bufferCount++),
                      n
                    );
                  })(t, i);
                  n.bindBuffer(n.ARRAY_BUFFER, r),
                    n.bufferData(n.ARRAY_BUFFER, t.dataArray, t.usage);
                  const o = ((e, t, n) => (
                    void 0 === t.cacheAttribLoc && (t.cacheAttribLoc = {}),
                    void 0 === t.cacheAttribLoc[n] &&
                      (t.cacheAttribLoc[n] = e.getAttribLocation(t, n)),
                    t.cacheAttribLoc[n]
                  ))(n, e, t.name);
                  o >= 0 &&
                    (n.enableVertexAttribArray(o),
                    n.vertexAttribPointer(o, t.itemSize, n.FLOAT, !1, 0, 0)),
                    (t.attrPosition = o),
                    t.isInstanced && n.vertexAttribDivisor(o, 1);
                }
              }),
              p(),
              n.bindVertexArray(null),
              (u = !1),
              (s = []));
          },
          p = () => {
            const { gl: e } = i;
            u &&
              (o || ((o = e.createBuffer()), i.bufferCount++),
              e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, o),
              e.bufferData(e.ELEMENT_ARRAY_BUFFER, r, n));
          };
      }
      const A = (e) => 0 !== e && !(e & (e - 1));
      class y {
        constructor(e) {
          this._value = e;
        }
        set(e, t = 1) {
          (this._value = this._value),
            (this._value =
              0 === t ? this._value & (0 << e) : this._value | (1 << e));
        }
        get(e) {
          let t = this._value & (1 << e);
          return (t >>= e), 1 === t;
        }
        reset(e) {
          this._value = e;
        }
        get value() {
          return this._value;
        }
      }
      const R =
          "This browser doesn't support multi render targets : WEBGL_draw_buffers",
        M =
          "This framebuffer has been bind to a different WebGL Rendering Context",
        S = "This texture has been bind to a different WebGL Rendering Context",
        C = (e, t = "") => {
          console.error(e, t);
        };
      class w {
        constructor(e, t = {}, n = 0, r = 0) {
          (this._source = e),
            (this._isHtmlElement = ((e) =>
              e instanceof HTMLImageElement ||
              e instanceof HTMLCanvasElement ||
              e instanceof HTMLVideoElement)(this._source)),
            (this._isHtmlElement ||
              !e ||
              ((e, t) => {
                let n = !0;
                return (
                  "Array" === e.constructor.name &&
                    (console.error(
                      "Please convert texture source to Unit8Array or Float32Array"
                    ),
                    (n = !1)),
                  void 0 === t.type &&
                    "Uint8Array" !== e.constructor.name &&
                    console.error(
                      "Using none Unit8Array, pleaes specify type in the texture parameters"
                    ),
                  n
                );
              })(e, t)) &&
              (this._getDimension(e, n, r),
              (this._params = (function (e, t, n) {
                if (!e.minFilter) {
                  let r = l.LINEAR;
                  t && t && A(t) && A(n) && (r = l.NEAREST_MIPMAP_LINEAR),
                    (e.minFilter = r);
                }
                return (
                  (e.mipmap = void 0 === e.mipmap || e.mipmap),
                  (e.magFilter = e.magFilter || l.LINEAR),
                  (e.wrapS = e.wrapS || l.CLAMP_TO_EDGE),
                  (e.wrapT = e.wrapT || l.CLAMP_TO_EDGE),
                  (e.internalFormat = e.internalFormat || l.RGBA),
                  (e.format = e.format || l.RGBA),
                  (e.premultiplyAlpha =
                    void 0 !== e.premultiplyAlpha && e.premultiplyAlpha),
                  (e.level = e.level || 0),
                  (e.type = e.type || l.UNSIGNED_BYTE),
                  e
                );
              })(t, this._width, this._height)),
              this._checkMipmap(),
              (this._parametersState = new y(0)));
        }
        bind(e, t) {
          if (void 0 !== t && void 0 !== this.GL && t !== this.GL)
            return void C(S, this.GL.id);
          this.GL = t || E;
          const { gl: n } = this.GL;
          this.createTexture(this.GL),
            n.activeTexture(n.TEXTURE0 + e),
            n.bindTexture(n.TEXTURE_2D, this._texture),
            this._checkParameters();
        }
        createTexture(e) {
          void 0 === e || void 0 === this.GL || e === this.GL
            ? ((this.GL = e || E),
              this._texture ||
                (((e, t) => {
                  e.webgl2 &&
                    (t.type === l.HALF_FLOAT
                      ? ((t.type = e.gl.HALF_FLOAT),
                        (t.internalFormat = l.RGBA16F))
                      : t.type === l.FLOAT && (t.internalFormat = l.RGBA32F));
                })(this.GL, this._params),
                this._uploadTexture()))
            : C(S, this.GL.id);
        }
        updateTexture(e) {
          (this._source = e), this._uploadTexture();
        }
        generateMipmap() {
          if (!this._generateMipmap) return;
          const { gl: e } = this.GL;
          e.bindTexture(e.TEXTURE_2D, this._texture),
            e.generateMipmap(e.TEXTURE_2D);
        }
        destroy() {
          const { gl: e } = this.GL;
          e.deleteTexture(this._texture), this.GL.textureCount--;
        }
        showProperties() {
          console.log("Dimension :", this._width, this._height);
          for (const e in this._params)
            console.log(e, h[this._params[e]] || this._params[e]);
        }
        _uploadTexture() {
          const { gl: e } = this.GL;
          this._texture ||
            ((this._texture = e.createTexture()), this.GL.textureCount++),
            e.bindTexture(e.TEXTURE_2D, this._texture),
            e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, !0),
            this._isHtmlElement && !this.GL.webgl2
              ? e.texImage2D(
                  e.TEXTURE_2D,
                  0,
                  this._params.internalFormat,
                  this._params.format,
                  this._params.type,
                  this._source
                )
              : e.texImage2D(
                  e.TEXTURE_2D,
                  0,
                  this._params.internalFormat,
                  this._width,
                  this._height,
                  0,
                  this._params.format,
                  this._params.type,
                  this._source
                ),
            e.texParameteri(
              e.TEXTURE_2D,
              e.TEXTURE_MAG_FILTER,
              this._params.magFilter
            ),
            e.texParameteri(
              e.TEXTURE_2D,
              e.TEXTURE_MIN_FILTER,
              this._params.minFilter
            ),
            e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, this._params.wrapS),
            e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, this._params.wrapT),
            e.pixelStorei(
              e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,
              this._premultiplyAlpha
            ),
            this._generateMipmap && e.generateMipmap(e.TEXTURE_2D);
        }
        _checkParameters() {
          const { gl: e } = this.GL;
          this._parametersState.value > 0 &&
            (this._parametersState.get(0)
              ? e.texParameteri(
                  e.TEXTURE_2D,
                  e.TEXTURE_MIN_FILTER,
                  this._params.minFilter
                )
              : this._parametersState.get(1)
              ? e.texParameteri(
                  e.TEXTURE_2D,
                  e.TEXTURE_MAG_FILTER,
                  this._params.magFilter
                )
              : this._parametersState.get(2)
              ? e.texParameteri(
                  e.TEXTURE_2D,
                  e.TEXTURE_WRAP_S,
                  this._params.wrapS
                )
              : e.texParameteri(
                  e.TEXTURE_2D,
                  e.TEXTURE_WRAP_T,
                  this._params.wrapT
                )),
            this._parametersState.reset(0);
        }
        _getDimension(e, t, n) {
          e
            ? ((this._width = e.width || e.videoWidth),
              (this._height = e.height || e.videoWidth),
              (this._width = this._width || t),
              (this._height = this._height || n),
              (this._width && this._height) ||
                (this._width = this._height = Math.sqrt(e.length / 4)))
            : ((this._width = t), (this._height = n));
        }
        _checkMipmap() {
          (this._generateMipmap = this._params.mipmap),
            (A(this._width) && A(this._height)) || (this._generateMipmap = !1),
            -1 === h[this._params.minFilter].indexOf("MIPMAP") &&
              (this._generateMipmap = !1);
        }
        get texture() {
          return this._texture;
        }
        set minFilter(e) {
          (this._params.minFilter = e), this._parametersState.set(0, 1);
        }
        get minFilter() {
          return this._params.minFilter;
        }
        set magFilter(e) {
          (this._params.magFilter = e), this._parametersState.set(1, 1);
        }
        get magFilter() {
          return this._params.magFilter;
        }
        set wrapS(e) {
          (this._params.wrapS = e), this._parametersState.set(2, 1);
        }
        get wrapS() {
          return this._params.wrapS;
        }
        set wrapT(e) {
          (this._params.wrapT = e), this._parametersState.set(3, 1);
        }
        get wrapT() {
          return this._params.wrapT;
        }
        get width() {
          return this._width;
        }
        get height() {
          return this._height;
        }
      }
      function L(e, t, n = {}, r = 1) {
        let o, i;
        const a = e,
          s = t,
          c = n,
          u = r,
          h = [];
        let d;
        (this.bind = function (e, t = !0) {
          if (void 0 !== e && void 0 !== o && e !== o) return void C(M, o.id);
          o = e || E;
          const { gl: n } = o;
          u > 1 && !o.multiRenderTargetSupport && C(R, o.id),
            i || _(),
            t && o.viewport(0, 0, a, s),
            n.bindFramebuffer(n.FRAMEBUFFER, i);
        }),
          (this.unbind = function (e = !0) {
            e && o.viewport(0, 0, o.width, o.height);
            const { gl: t } = o;
            t.bindFramebuffer(t.FRAMEBUFFER, null),
              h.forEach((e) => {
                e.generateMipmap();
              });
          }),
          (this.getTexture = function (e = 0) {
            return h[e];
          }),
          (this.destroy = function () {
            const { gl: e } = o;
            h.forEach((e) => e.destroy()),
              d.destroy(),
              e.deleteFramebuffer(i),
              o.frameBufferCount--;
          });
        const _ = () => {
            f();
            const { gl: e } = o;
            (i = e.createFramebuffer()),
              e.bindFramebuffer(e.FRAMEBUFFER, i),
              o.frameBufferCount++;
            const t = o.webgl2 ? e.DRAW_FRAMEBUFFER : e.FRAMEBUFFER,
              n = [];
            for (let r = 0; r < u; r++)
              e.framebufferTexture2D(
                t,
                e.COLOR_ATTACHMENT0 + r,
                e.TEXTURE_2D,
                h[r].texture,
                0
              ),
                n.push(l[`COLOR_ATTACHMENT${r}`]);
            o.multiRenderTargetSupport && e.drawBuffers(n),
              e.framebufferTexture2D(
                e.FRAMEBUFFER,
                e.DEPTH_ATTACHMENT,
                e.TEXTURE_2D,
                d.texture,
                0
              ),
              e.bindTexture(e.TEXTURE_2D, null),
              e.bindRenderbuffer(e.RENDERBUFFER, null),
              e.bindFramebuffer(e.FRAMEBUFFER, null);
          },
          f = () => {
            for (let e = 0; e < u; e++) h.push(p());
            const { gl: e } = o,
              t = o.webgl2 ? e.DEPTH_COMPONENT16 : e.DEPTH_COMPONENT;
            d = p(t, l.UNSIGNED_INT, l.DEPTH_COMPONENT, {
              minFilter: l.NEAREST,
              magFilter: l.NEAREST,
              mipmap: !1,
            });
          },
          p = (e, t, n, r = {}) => {
            const i = Object.assign({}, c);
            n || (n = e),
              (i.internalFormat = e || l.RGBA),
              (i.format = n || l.RGBA),
              (i.type = t || i.type),
              Object.assign(i, r);
            const u = new w(null, i, a, s);
            return u.createTexture(o), u;
          };
        this.__defineGetter__("texture", function () {
          return h[0];
        }),
          this.__defineGetter__("depthTexture", function () {
            return d;
          }),
          this.__defineGetter__("width", function () {
            return a;
          }),
          this.__defineGetter__("height", function () {
            return s;
          });
      }
      var N = n(329);
      class I {
        constructor() {
          (this._mtxView = _.create()),
            (this._mtxProj = _.create()),
            (this._near = 0),
            (this._far = 0),
            (this._lookDir = N.create());
        }
        lookAt(e, t, n = [0, 1, 0]) {
          _.lookAt(this._mtxView, e, t, n);
        }
        setFromViewProjection(e, t) {
          _.copy(this._mtxView, e), _.copy(this._mtxProj, t);
        }
        setViewMatrix(e) {
          _.copy(this._mtxView, e);
        }
        setProjectionMatrix(e) {
          _.copy(this._mtxProj, e);
        }
        _updateMatrices() {}
        get viewMatrix() {
          return this._mtxView;
        }
        get view() {
          return this._mtxView;
        }
        get projectionMatrix() {
          return this._mtxProj;
        }
        get projection() {
          return this._mtxProj;
        }
        get position() {
          const e = _.create();
          return _.invert(e, this._mtxView), [e[12], e[13], e[14]];
        }
        get direction() {
          const e = f.create();
          return (
            f.fromMat4(e, this._mtxView),
            f.transpose(e, e),
            N.transformMat3(this._lookDir, [0, 0, -1], e),
            N.normalize(this._lookDir, this._lookDir),
            this._lookDir
          );
        }
        set near(e) {
          (this._near = e), this._updateMatrices();
        }
        get near() {
          return this._near;
        }
        set far(e) {
          (this._far = e), this._updateMatrices();
        }
        get far() {
          return this._far;
        }
      }
      function O(e, t) {
        (this.origin = e), (this.direction = t);
        const n = N.create(),
          r = N.create(),
          o = N.create(),
          i = N.create(),
          a = N.create(),
          s = N.create(),
          c = N.create(),
          u = N.create();
        (this.at = function (e) {
          return (
            N.copy(i, this.direction),
            N.scale(i, i, e),
            N.add(i, i, this.origin),
            i
          );
        }),
          (this.lookAt = function (e) {
            N.sub(this.direction, e, this.origin),
              N.normalize(this.origin, this.origin);
          }),
          (this.closestPointToPoint = function (e) {
            const t = N.create();
            N.sub(e, this.origin);
            const n = N.dot(t, this.direction);
            return n < 0
              ? N.clone(this.origin)
              : (N.copy(t, this.direction),
                N.scale(t, t, n),
                N.add(t, t, this.origin),
                t);
          }),
          (this.distanceToPoint = function (e) {
            return Math.sqrt(this.distanceSqToPoint(e));
          }),
          (this.distanceSqToPoint = function (e) {
            const t = N.create();
            N.sub(t, e, this.origin);
            const n = N.dot(t, this.direction);
            return n < 0
              ? N.squaredDistance(this.origin, e)
              : (N.copy(t, this.direction),
                N.scale(t, t, n),
                N.add(t, t, this.origin),
                N.squaredDistance(t, e));
          }),
          (this.intersectsSphere = function (e, t) {
            return this.distanceToPoint(e) <= t;
          }),
          (this.intersectSphere = function (e, t) {
            const n = N.create();
            N.sub(n, e, this.origin);
            const r = N.dot(n, this.direction),
              o = N.dot(n, n) - r * r,
              i = t * t;
            if (o > i) return null;
            const a = Math.sqrt(i - o),
              s = r - a,
              c = r + a;
            return s < 0 && c < 0 ? null : s < 0 ? this.at(c) : this.at(s);
          }),
          (this.intersectTriangle = function (e, t, i, l = !0) {
            N.copy(n, e),
              N.copy(r, t),
              N.copy(o, i),
              N.sub(a, r, n),
              N.sub(s, o, n),
              N.cross(c, a, s);
            let h,
              d = N.dot(this.direction, c);
            if (d > 0) {
              if (l) return null;
              h = 1;
            } else {
              if (!(d < 0)) return null;
              (h = -1), (d = -d);
            }
            N.sub(u, this.origin, n), N.cross(s, u, s);
            const _ = h * N.dot(this.direction, s);
            if (_ < 0) return null;
            N.cross(a, a, u);
            const f = h * N.dot(this.direction, a);
            if (f < 0) return null;
            if (_ + f > d) return null;
            const p = -h * N.dot(u, c);
            return p < 0 ? null : this.at(p / d);
          });
      }
      class P extends I {
        constructor(e, t, n, r) {
          super(),
            (this._fov = 0),
            (this._ratio = 0),
            this.setPerspective(e, t, n, r);
        }
        setPerspective(e, t, n, r) {
          _.perspective(this._mtxProj, e, t, n, r),
            (this._near = n),
            (this._far = r),
            (this._fov = e),
            (this._ratio = t);
        }
        setAspectRatio(e) {
          (this._ratio = e), this._updateMatrices();
        }
        generateRay(e, t) {
          const n = _.create(),
            r = N.create(),
            o = this._mtxProj,
            i = this._mtxView;
          return (
            _.multiply(n, o, i),
            _.invert(n, n),
            N.transformMat4(r, e, n),
            N.sub(r, r, this.position),
            N.normalize(r, r),
            t
              ? ((t.origin = this.position), (t.direction = r))
              : (t = new O(this.position, r)),
            t
          );
        }
        _updateMatrices() {
          this.setPerspective(this._fov, this._ratio, this._near, this._far);
        }
      }
      class F {
        constructor(e) {
          return (
            (this._GL = e || E),
            (this._uniforms = {}),
            (this._uniformTextures = []),
            this._fbo,
            (this._clearColor = { r: 0, g: 0, b: 0, a: 0 }),
            this
          );
        }
        setClearColor(e = 0, t = 0, n = 0, r = 0) {
          return (
            (this._clearColor.r = e),
            (this._clearColor.g = t),
            (this._clearColor.b = n),
            (this._clearColor.a = r),
            this
          );
        }
        useProgram(e, t) {
          return (this._shader = e instanceof T ? e : new T(e, t)), this;
        }
        setMesh(e) {
          return (this._mesh = e), this;
        }
        createMesh(e) {
          return (this._mesh = new b(e)), this;
        }
        bufferVertex(e) {
          return (
            this._mesh || (this._mesh = new b()),
            this._mesh.bufferVertex(e),
            this
          );
        }
        bufferTexCoord(e) {
          return (
            this._mesh || (this._mesh = new b()),
            this._mesh.bufferTexCoord(e),
            this
          );
        }
        bufferNormal(e) {
          return (
            this._mesh || (this._mesh = new b()),
            this._mesh.bufferNormal(e),
            this
          );
        }
        bufferIndex(e) {
          return (
            this._mesh || (this._mesh = new b()),
            this._mesh.bufferIndex(e),
            this
          );
        }
        bufferInstance(e, t) {
          return this._mesh
            ? (this._mesh.bufferInstance(e, t), this)
            : (console.warn("Need to create mesh first"), this);
        }
        bufferData(e, t) {
          return (
            this._mesh || (this._mesh = new b()),
            this._mesh.bufferData(e, t),
            this
          );
        }
        uniform(e, t, n) {
          const r = e;
          let o, i;
          return (
            void 0 === n ? ((i = x(t)), (o = t)) : ((i = t), (o = n)),
            (this._uniforms[r] = { type: i, value: o }),
            this
          );
        }
        uniformTexture(e, t, n) {
          return this.bindTexture(e, t, n);
        }
        bindTexture(e, t, n) {
          return (
            void 0 !== n
              ? (this._uniformTextures[n] = { name: e, texture: t })
              : this._uniformTextures.push({ name: e, texture: t }),
            this
          );
        }
        bindFrameBuffer(e) {
          return (this._fbo = e), this;
        }
        draw() {
          if (this._shader) {
            if (this._mesh) {
              if (this._fbo) {
                const { r: e, g: t, b: n, a: r } = this._clearColor;
                this._fbo.bind(this._GL), this._GL.clear(e, t, n, r);
              }
              this._shader.bind(this._GL);
              for (const e in this._uniforms) {
                const t = this._uniforms[e];
                this._shader.uniform(e, t.type, t.value);
              }
              return (
                this._uniformTextures.forEach((e, t) => {
                  void 0 !== e &&
                    (this._shader.uniform(e.name, "int", t),
                    e.texture.bind(t, this._GL));
                }),
                this._GL.draw(this._mesh),
                this._fbo && this._fbo.unbind(),
                this
              );
            }
            console.warn("No Mesh assigned for draw call");
          } else console.warn("No GLShader assigned for draw call");
        }
        get shader() {
          return this._shader;
        }
        get framebuffer() {
          return this._fbo;
        }
      }
      class U extends F {
        constructor(e) {
          super(e);
          const t = this._GL,
            n = 1e3,
            r = [
              [-n, 0, 0],
              [n, 0, 0],
              [0, -n, 0],
              [0, n, 0],
              [0, 0, -n],
              [0, 0, n],
            ];
          this.createMesh(t.LINES)
            .bufferVertex(r)
            .bufferData(
              [
                [1, 0, 0],
                [1, 0, 0],
                [0, 1, 0],
                [0, 1, 0],
                [0, 0, 1],
                [0, 0, 1],
              ],
              "aColor"
            )
            .bufferIndex([0, 1, 2, 3, 4, 5])
            .useProgram(
              "precision highp float;\n#define GLSLIFY 1\nattribute vec3 aVertexPosition;\nattribute vec3 aColor;\n\nuniform mat4 uModelMatrix;\nuniform mat4 uViewMatrix;\nuniform mat4 uProjectionMatrix;\n\nvarying vec3 vColor;\n\nvoid main(void) {\n  gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);\n  vColor = aColor;\n}",
              "precision highp float;\n#define GLSLIFY 1\nvarying vec3 vColor;\nuniform float uOpacity;\n\nvoid main(void) {\n    gl_FragColor = vec4(vColor, uOpacity);\n}"
            ),
            (this.opacity = 0.75);
        }
        draw() {
          this.uniform("uOpacity", this.opacity), super.draw();
        }
      }
      const D = () =>
        new b()
          .bufferData(
            [
              [-1, -1],
              [-1, 4],
              [4, -1],
            ],
            "aPosition",
            2
          )
          .bufferIndex([2, 1, 0]);
      class B extends F {
        constructor(e) {
          super(e),
            this.setMesh(
              ((e, t, n = !1) => {
                const r = [],
                  o = [],
                  i = [],
                  a = [],
                  s = 1 / t;
                let c = 0;
                function u(n, r, o = !1) {
                  const i = (n / t) * Math.PI - 0.5 * Math.PI,
                    a = (r / t) * Math.PI * 2,
                    s = o ? 1 : e,
                    c = [];
                  c[1] = Math.sin(i) * s;
                  const u = Math.cos(i) * s;
                  (c[0] = Math.cos(a) * u), (c[2] = Math.sin(a) * u);
                  const l = 1e4;
                  return (
                    (c[0] = Math.floor(c[0] * l) / l),
                    (c[1] = Math.floor(c[1] * l) / l),
                    (c[2] = Math.floor(c[2] * l) / l),
                    c
                  );
                }
                for (let e = 0; e < t; e++)
                  for (let n = 0; n < t; n++) {
                    r.push(u(e, n)),
                      r.push(u(e + 1, n)),
                      r.push(u(e + 1, n + 1)),
                      r.push(u(e, n + 1)),
                      a.push(u(e, n, !0)),
                      a.push(u(e + 1, n, !0)),
                      a.push(u(e + 1, n + 1, !0)),
                      a.push(u(e, n + 1, !0));
                    const l = n / t,
                      h = e / t;
                    o.push([1 - l, h]),
                      o.push([1 - l, h + s]),
                      o.push([1 - l - s, h + s]),
                      o.push([1 - l - s, h]),
                      i.push(4 * c + 0),
                      i.push(4 * c + 1),
                      i.push(4 * c + 2),
                      i.push(4 * c + 0),
                      i.push(4 * c + 2),
                      i.push(4 * c + 3),
                      c++;
                  }
                return (
                  n && i.reverse(),
                  new b()
                    .bufferVertex(r)
                    .bufferTexCoord(o)
                    .bufferIndex(i)
                    .bufferNormal(a)
                );
              })(1, 12)
            )
              .useProgram(
                "// basic.vert\n\nprecision highp float;\n#define GLSLIFY 1\nattribute vec3 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec3 aNormal;\n\nuniform mat4 uModelMatrix;\nuniform mat4 uViewMatrix;\nuniform mat4 uProjectionMatrix;\n\nuniform vec3 uTranslate;\nuniform vec3 uScale;\nuniform vec3 uRotation;\n\nvarying vec2 vTextureCoord;\nvarying vec3 vNormal;\n\nvec2 rotate(vec2 v, float a) {\n\tfloat s = sin(a);\n\tfloat c = cos(a);\n\tmat2 m = mat2(c, s, -s, c);\n\treturn m * v;\n}\n\nvoid main(void) {\n  vec3 pos = aVertexPosition * uScale;\n  pos.yz = rotate(pos.yz, uRotation.x);\n  pos.xz = rotate(pos.xz, uRotation.y);\n  pos.xy = rotate(pos.xy, uRotation.z);\n  pos += uTranslate;\n\n  gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(pos, 1.0);\n  vTextureCoord = aTextureCoord;\n  vNormal = aNormal;\n}",
                "precision highp float;\n#define GLSLIFY 1\n\nuniform vec3 uColor;\nuniform float uOpacity;\n\nvoid main(void) {\n    gl_FragColor = vec4(uColor, uOpacity);\n}"
              )
              .uniform("uRotation", [0, 0, 0]);
        }
        draw(e, t = [1, 1, 1], n = [1, 1, 1], r = 1) {
          this.uniform("uTranslate", e)
            .uniform("uScale", t)
            .uniform("uColor", n)
            .uniform("uOpacity", r),
            super.draw(0);
        }
      }
      class z extends F {
        constructor(e) {
          super(e),
            this.setMesh(D()).useProgram(
              "// bigTriangle.vert\n\n#define SHADER_NAME BIG_TRIANGLE_VERTEX\n\nprecision mediump float;\n#define GLSLIFY 1\nattribute vec2 aPosition;\nvarying vec2 vTextureCoord;\n\nvoid main(void) {\n    gl_Position = vec4(aPosition, 0.0, 1.0);\n    vTextureCoord = aPosition * .5 + .5;\n}",
              "// copy.frag\n\n#define SHADER_NAME SIMPLE_TEXTURE\n\nprecision highp float;\n#define GLSLIFY 1\nvarying vec2 vTextureCoord;\nuniform sampler2D texture;\n\nvoid main(void) {\n    gl_FragColor = texture2D(texture, vTextureCoord);\n}"
            );
        }
        draw(e) {
          this.bindTexture("texture", e, 0), super.draw(0);
        }
      }
      const { mat4: G, vec4: V } = n(400);
      var X = n(221);
      function k() {
        let e = N.create(),
          t = N.create(),
          n = N.fromValues(1, 1, 1),
          r = _.create(),
          o = _.create(),
          i = _.create(),
          a = _.create(),
          s = _.create(),
          c = _.create(),
          u = X.create(),
          l = [],
          h = !0;
        (this.update = function (e) {
          void 0 !== e && _.copy(o, e), (h = !0), d();
        }),
          (this.addChild = function (e) {
            l.push(e);
          }),
          (this.removeChild = function (e) {
            const t = l.indexOf(e);
            -1 != t ? l.splice(t, 1) : console.warn("Child no exist");
          }),
          (this.setRotationFromQuaternion = function (e) {
            X.copy(u, e), (h = !0);
          });
        const d = () => {
          h &&
            (_.identity(i, i),
            _.identity(s, s),
            _.identity(a, a),
            _.rotateX(a, a, t[0]),
            _.rotateY(a, a, t[1]),
            _.rotateZ(a, a, t[2]),
            _.fromQuat(c, u),
            _.mul(a, c, a),
            _.scale(s, s, n),
            _.translate(i, i, e),
            _.mul(r, i, a),
            _.mul(r, r, s),
            _.mul(r, o, r),
            l.forEach((e) => {
              e.update(r);
            }),
            (h = !1));
        };
        this.__defineGetter__("matrix", function () {
          return d(), r;
        }),
          this.__defineSetter__("x", function (t) {
            (e[0] = t), (h = !0);
          }),
          this.__defineGetter__("x", function () {
            return e[0];
          }),
          this.__defineSetter__("y", function (t) {
            (e[1] = t), (h = !0);
          }),
          this.__defineGetter__("y", function () {
            return e[1];
          }),
          this.__defineSetter__("z", function (t) {
            (e[2] = t), (h = !0);
          }),
          this.__defineGetter__("z", function () {
            return e[2];
          }),
          this.__defineSetter__("scaleX", function (e) {
            (n[0] = e), (h = !0);
          }),
          this.__defineGetter__("scaleX", function () {
            return n[0];
          }),
          this.__defineSetter__("scaleY", function (e) {
            (n[1] = e), (h = !0);
          }),
          this.__defineGetter__("scaleY", function () {
            return n[1];
          }),
          this.__defineSetter__("scaleZ", function (e) {
            (n[2] = e), (h = !0);
          }),
          this.__defineGetter__("scaleZ", function () {
            return n[2];
          }),
          this.__defineSetter__("rotationX", function (e) {
            (t[0] = e), (h = !0);
          }),
          this.__defineGetter__("rotationX", function () {
            return t[0];
          }),
          this.__defineSetter__("rotationY", function (e) {
            (t[1] = e), (h = !0);
          }),
          this.__defineGetter__("rotationY", function () {
            return t[1];
          }),
          this.__defineSetter__("rotationZ", function (e) {
            (t[2] = e), (h = !0);
          }),
          this.__defineGetter__("rotationZ", function () {
            return t[2];
          }),
          this.__defineGetter__("children", function () {
            return l;
          });
      }
      class H {
        constructor(e, t, n, r = {}, o = 1) {
          this._fbos = [];
          for (let i = 0; i < e; i++) {
            const e = new L(t, n, r, o);
            this._fbos.push(e);
          }
        }
        swap() {
          const e = this._fbos.shift();
          this._fbos.push(e);
        }
        get read() {
          return this._fbos[this._fbos.length - 1];
        }
        get write() {
          return this._fbos[0];
        }
        get all() {
          return this._fbos;
        }
      }
      class Y extends H {
        constructor(e, t, n = {}, r = 1) {
          super(2, e, t, n, r);
        }
      }
      let j = window,
        W = 60,
        q = performance.now(),
        K = 0,
        Z = 0,
        Q = q;
      const J = [],
        $ = [],
        ee = [],
        te = [];
      let ne = [],
        re = [],
        oe = -1,
        ie = 0;
      function ae() {
        !(function () {
          let e,
            t = 0,
            n = 1e3 / W,
            r = 0;
          for (t = 0; t < J.length; t++)
            (e = J[t]), null != e && e.func(e.args);
          for (; ne.length > 0; ) (e = ne.pop()), e.func(e.args);
          let o = performance.now();
          for (Z = (o - q) / 1e3, K = o - Q, t = 0; t < $.length; t++)
            (e = $[t]),
              o - e.time > e.delay && (e.func(e.args), $.splice(t, 1));
          for (o = performance.now(); ee.length > 0; ) {
            if (((e = ee.shift()), (r = performance.now()), !(r - o < n))) {
              ee.unshift(e);
              break;
            }
            e.func(e.args);
          }
          for (o = performance.now(); te.length > 0; )
            (e = te.shift()),
              (r = performance.now()),
              r - o < n && e.func(e.args);
          (Q = o), (ne = ne.concat(re)), (re = []);
        })(),
          (oe = j.requestAnimationFrame(ae));
      }
      ae();
      var se = {
        addEF: function (e, t) {
          const n = ++ie;
          return (J[n] = { func: e, args: t }), n;
        },
        removeEF: function (e) {
          return void 0 !== J[e] && (J[e] = null), -1;
        },
        delay: function (e, t, n) {
          const r = performance.now();
          $.push({ func: e, args: t, delay: n, time: r });
        },
        next: function (e, t) {
          re.push({ func: e, args: t });
        },
        defer: function (e, t) {
          ee.push({ func: e, args: t });
        },
        usurp: function (e, t) {
          te.push({ func: e, args: t });
        },
        setRequestAnimationFrameSource: function (e) {
          oe > -1 && window.cancelAnimationFrame(oe), (j = e), ae();
        },
        setFrameRate: function (e) {
          W = e;
        },
        getElapsedTime: function () {
          return Z;
        },
        getDeltaTime: function () {
          return K;
        },
      };
      const ce = se;
      class ue {
        constructor(e, t = 0.1) {
          (this.easing = t),
            (this._value = e),
            (this._targetValue = e),
            (this._efIndex = ce.addEF(() => this._update()));
        }
        _update() {
          this._checkLimit(),
            (this._value += (this._targetValue - this._value) * this.easing),
            Math.abs(this._targetValue - this._value) < 1e-4 &&
              (this._value = this._targetValue);
        }
        setTo(e) {
          this._targetValue = this._value = e;
        }
        add(e) {
          this._targetValue += e;
        }
        limit(e, t) {
          e > t
            ? this.limit(t, e)
            : ((this._min = e), (this._max = t), this._checkLimit());
        }
        _checkLimit() {
          void 0 !== this._min &&
            this._targetValue < this._min &&
            (this._targetValue = this._min),
            void 0 !== this._max &&
              this._targetValue > this._max &&
              (this._targetValue = this._max);
        }
        destroy() {
          ce.removeEF(this._efIndex);
        }
        set value(e) {
          this._targetValue = e;
        }
        get value() {
          return this._value;
        }
        get targetValue() {
          return this._targetValue;
        }
      }
      const le = function (e, t) {
        const n = t || {};
        return (
          e.touches
            ? ((n.x = e.touches[0].pageX), (n.y = e.touches[0].pageY))
            : ((n.x = e.clientX), (n.y = e.clientY)),
          n
        );
      };
      class he {
        constructor(e, t = window, n = 10) {
          (this._target = e),
            (this._listenerTarget = t),
            (this._mouse = {}),
            (this._preMouse = {}),
            (this.center = N.create()),
            (this._up = N.fromValues(0, 1, 0)),
            (this.radius = new ue(n)),
            (this.position = N.fromValues(0, 0, this.radius.value)),
            (this.positionOffset = N.create()),
            (this._rx = new ue(0)),
            this._rx.limit(-Math.PI / 2, Math.PI / 2),
            (this._ry = new ue(0)),
            (this._preRX = 0),
            (this._preRY = 0),
            (this._isLockZoom = !1),
            (this._isLockRotation = !1),
            (this._isInvert = !1),
            (this.sensitivity = 1),
            (this._wheelBind = (e) => this._onWheel(e)),
            (this._downBind = (e) => this._onDown(e)),
            (this._moveBind = (e) => this._onMove(e)),
            (this._upBind = () => this._onUp()),
            this.connect(),
            ce.addEF(() => this._loop());
        }
        connect() {
          this.disconnect(),
            this._listenerTarget.addEventListener(
              "mousewheel",
              this._wheelBind
            ),
            this._listenerTarget.addEventListener(
              "DOMMouseScroll",
              this._wheelBind
            ),
            this._listenerTarget.addEventListener("mousedown", this._downBind),
            this._listenerTarget.addEventListener("touchstart", this._downBind),
            this._listenerTarget.addEventListener("mousemove", this._moveBind),
            this._listenerTarget.addEventListener("touchmove", this._moveBind),
            window.addEventListener("touchend", this._upBind),
            window.addEventListener("mouseup", this._upBind);
        }
        disconnect() {
          this._listenerTarget.removeEventListener(
            "mousewheel",
            this._wheelBind
          ),
            this._listenerTarget.removeEventListener(
              "DOMMouseScroll",
              this._wheelBind
            ),
            this._listenerTarget.removeEventListener(
              "mousedown",
              this._downBind
            ),
            this._listenerTarget.removeEventListener(
              "touchstart",
              this._downBind
            ),
            this._listenerTarget.removeEventListener(
              "mousemove",
              this._moveBind
            ),
            this._listenerTarget.removeEventListener(
              "touchmove",
              this._moveBind
            ),
            window.removeEventListener("touchend", this._upBind),
            window.removeEventListener("mouseup", this._upBind);
        }
        lock(e = !0) {
          (this._isLockZoom = e),
            (this._isLockRotation = e),
            (this._isMouseDown = !1);
        }
        lockZoom(e = !0) {
          this._isLockZoom = e;
        }
        lockRotation(e = !0) {
          this._isLockRotation = e;
        }
        inverseControl(e = !0) {
          this._isInvert = e;
        }
        _onDown(e) {
          this._isLockRotation ||
            ((this._isMouseDown = !0),
            le(e, this._mouse),
            le(e, this._preMouse),
            (this._preRX = this._rx.targetValue),
            (this._preRY = this._ry.targetValue));
        }
        _onMove(e) {
          if (
            !this._isLockRotation &&
            (le(e, this._mouse),
            e.touches && e.preventDefault(),
            this._isMouseDown)
          ) {
            let e = -(this._mouse.x - this._preMouse.x);
            this._isInvert && (e *= -1),
              (this._ry.value = this._preRY - 0.01 * e * this.sensitivity);
            let t = -(this._mouse.y - this._preMouse.y);
            this._isInvert && (t *= -1),
              (this._rx.value = this._preRX - 0.01 * t * this.sensitivity);
          }
        }
        _onUp() {
          this._isLockRotation || (this._isMouseDown = !1);
        }
        _onWheel(e) {
          if (this._isLockZoom) return;
          const t = e.wheelDelta,
            n = e.detail;
          let r = 0;
          (r = n ? (t ? ((t / n / 40) * n > 0 ? 1 : -1) : -n / 3) : t / 120),
            this.radius.add(2 * -r),
            this.radius.targetValue < 0 && (this.radius.value = 1e-4);
        }
        _loop() {
          this._updatePosition(), this._target && this._updateCamera();
        }
        update() {
          this._updatePosition();
        }
        _updatePosition() {
          this.position[1] = Math.sin(this._rx.value) * this.radius.value;
          const e = Math.cos(this._rx.value) * this.radius.value;
          (this.position[0] = Math.cos(this._ry.value + 0.5 * Math.PI) * e),
            (this.position[2] = Math.sin(this._ry.value + 0.5 * Math.PI) * e),
            N.add(this.position, this.position, this.positionOffset);
        }
        _updateCamera() {
          this._target.lookAt(this.position, this.center, this._up);
        }
        get rx() {
          return this._rx;
        }
        get ry() {
          return this._ry;
        }
      }
      t();
      class de {
        constructor(e) {
          (this._GL = e || E),
            (this.camera = new P()),
            this.camera.setPerspective(
              (45 * Math.PI) / 180,
              E.aspectRatio,
              0.1,
              100
            ),
            (this.orbitalControl = new he(this.camera, window, 15)),
            (this.orbitalControl.radius.value = 10),
            (this._isRunning = !0),
            this._initTextures(),
            this._initViews(),
            window.addEventListener("resize", () => this.resize()),
            (this._efIndex = ce.addEF(() => this._loop()));
        }
        stop() {
          this._isRunning = !1;
        }
        resume() {
          this._isRunning = !0;
        }
        _initTextures() {}
        _initViews() {}
        update() {}
        render() {}
        _loop() {
          this._isRunning &&
            (this.update(),
            this._GL.viewport(0, 0, this._GL.width, this._GL.height),
            this._GL.setMatrices(this.camera),
            this.render());
        }
        resize() {
          this._GL.setSize(window.innerWidth, window.innerHeight),
            this.camera.setAspectRatio(this._GL.aspectRatio);
        }
      }
      let _e;
      n(470);
      const fe = {
          init: (e) => {
            (_e = e.map(({ id: e, file: t, type: n }) => {
              const r = t;
              let o;
              switch (n) {
                case "jpg":
                case "png":
                  o = new w(t);
                  break;
                case "text":
                  o = ((e) => {
                    const t = e.split("\n"),
                      n = [],
                      r = [],
                      o = [],
                      i = [],
                      a = [],
                      s = [],
                      c = [];
                    let u,
                      l = 0;
                    const h =
                        /v( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/,
                      d =
                        /vn( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/,
                      _ = /vt( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/,
                      f = /f( +-?\d+)( +-?\d+)( +-?\d+)( +-?\d+)?/,
                      p =
                        /f( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))?/,
                      m =
                        /f( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))?/,
                      E =
                        /f( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))?/;
                    function v(e) {
                      const t = parseInt(e);
                      return 3 * (t >= 0 ? t - 1 : t + i.length / 3);
                    }
                    function g(e) {
                      const t = parseInt(e);
                      return 3 * (t >= 0 ? t - 1 : t + a.length / 3);
                    }
                    function x(e) {
                      const t = parseInt(e);
                      return 2 * (t >= 0 ? t - 1 : t + s.length / 2);
                    }
                    function T(e, t, r) {
                      n.push([i[e], i[e + 1], i[e + 2]]),
                        n.push([i[t], i[t + 1], i[t + 2]]),
                        n.push([i[r], i[r + 1], i[r + 2]]),
                        c.push(3 * l + 0),
                        c.push(3 * l + 1),
                        c.push(3 * l + 2),
                        l++;
                    }
                    function A(e, t, n) {
                      r.push([s[e], s[e + 1]]),
                        r.push([s[t], s[t + 1]]),
                        r.push([s[n], s[n + 1]]);
                    }
                    function y(e, t, n) {
                      o.push([a[e], a[e + 1], a[e + 2]]),
                        o.push([a[t], a[t + 1], a[t + 2]]),
                        o.push([a[n], a[n + 1], a[n + 2]]);
                    }
                    function R(e, t, n, r, o, i, a, s, c, u, l, h) {
                      let d,
                        _ = v(e),
                        f = v(t),
                        p = v(n);
                      void 0 === r
                        ? T(_, f, p)
                        : ((d = v(r)), T(_, f, d), T(f, p, d)),
                        void 0 !== o &&
                          ((_ = x(o)),
                          (f = x(i)),
                          (p = x(a)),
                          void 0 === r
                            ? A(_, f, p)
                            : ((d = x(s)), A(_, f, d), A(f, p, d))),
                        void 0 !== c &&
                          ((_ = g(c)),
                          (f = g(u)),
                          (p = g(l)),
                          void 0 === r
                            ? y(_, f, p)
                            : ((d = g(h)), y(_, f, d), y(f, p, d)));
                    }
                    for (let e = 0; e < t.length; e++) {
                      let n = t[e];
                      (n = n.trim()),
                        0 !== n.length &&
                          "#" !== n.charAt(0) &&
                          (null !== (u = h.exec(n))
                            ? i.push(
                                parseFloat(u[1]),
                                parseFloat(u[2]),
                                parseFloat(u[3])
                              )
                            : null !== (u = d.exec(n))
                            ? a.push(
                                parseFloat(u[1]),
                                parseFloat(u[2]),
                                parseFloat(u[3])
                              )
                            : null !== (u = _.exec(n))
                            ? s.push(parseFloat(u[1]), parseFloat(u[2]))
                            : null !== (u = f.exec(n))
                            ? R(u[1], u[2], u[3], u[4])
                            : null !== (u = p.exec(n))
                            ? R(
                                u[2],
                                u[5],
                                u[8],
                                u[11],
                                u[3],
                                u[6],
                                u[9],
                                u[12]
                              )
                            : null !== (u = m.exec(n))
                            ? R(
                                u[2],
                                u[6],
                                u[10],
                                u[14],
                                u[3],
                                u[7],
                                u[11],
                                u[15],
                                u[4],
                                u[8],
                                u[12],
                                u[16]
                              )
                            : null !== (u = E.exec(n)) &&
                              R(
                                u[2],
                                u[5],
                                u[8],
                                u[11],
                                void 0,
                                void 0,
                                void 0,
                                void 0,
                                u[3],
                                u[6],
                                u[9],
                                u[12]
                              ));
                    }
                    return ((e) => {
                      const t = e.normals.length > 0,
                        n = e.coords.length > 0;
                      let r;
                      if (e.positions.length > 65535) {
                        const o = [];
                        let i = 0;
                        const a = {};
                        for (
                          a.positions = e.positions.concat(),
                            a.coords = e.coords.concat(),
                            a.indices = e.indices.concat(),
                            a.normals = e.normals.concat();
                          e.indices.length > 0;

                        ) {
                          const s = Math.min(65535, e.positions.length),
                            c = e.indices.splice(0, s),
                            u = [],
                            l = [],
                            h = [];
                          let d,
                            _ = 0;
                          for (let e = 0; e < c.length; e++)
                            c[e] > _ && (_ = c[e]),
                              (d = c[e]),
                              u.push(a.positions[d]),
                              n && l.push(a.coords[d]),
                              t && h.push(a.normals[d]),
                              (c[e] -= i);
                          (i = _ + 1),
                            (r = new b()),
                            r.bufferVertex(u),
                            n && r.bufferTexCoord(l),
                            r.bufferIndex(c),
                            t && r.bufferNormal(h),
                            o.push(r);
                        }
                        return o;
                      }
                      return (
                        (r = new b()),
                        r.bufferVertex(e.positions),
                        n && r.bufferTexCoord(e.coords),
                        r.bufferIndex(e.indices),
                        t && r.bufferNormal(e.normals),
                        r
                      );
                    })({ positions: n, coords: r, normals: o, indices: c });
                  })(t);
              }
              return { id: e, source: r, type: n, file: o };
            })),
              console.table(_e);
          },
          get: (e) => {
            const t = _e.find((t) => t.id === e);
            return t ? t.file : null;
          },
        },
        pe = fe;
      _.fromValues(0.5, 0, 0, 0, 0, 0.5, 0, 0, 0, 0, 0.5, 0, 0.5, 0.5, 0.5, 1);
      const me = (e, t) =>
          void 0 === e
            ? fxrand()
            : void 0 === t
            ? fxrand() * e
            : e + (t - e) * fxrand(),
        Ee =
          (Math.PI,
          () =>
            [
              "iPad Simulator",
              "iPhone Simulator",
              "iPod Simulator",
              "iPad",
              "iPhone",
              "iPod",
            ].includes(navigator.platform) ||
            (navigator.userAgent.includes("Mac") && "ontouchend" in document)),
        ve =
          "#version 300 es\n\nprecision highp float;\n#define GLSLIFY 1\nin vec2 aPosition;\nout vec2 vTextureCoord;\nout vec3 vPositionOffset;\n\nvoid main(void) {\n    gl_Position = vec4(aPosition, 0.0, 1.0);\n    vTextureCoord = aPosition * .5 + .5;\n}",
        ge = {
          numParticles: 500,
          posX: -0.01,
          posY: 0,
          acc_X: 3.84,
          acc_Y: 1.23,
          color1: [12, 75, 96],
          color2: [13, 80, 111],
          color3: [72, 163, 192],
          color4: [125, 199, 204],
          color5: [205, 179, 128],
          colorEdge1: 0.31,
          colorEdge2: 0.43,
          colorEdge3: 0.57,
          colorEdge4: 0.58,
          brightness: 1.6,
          particleSize: 0.5,
          noiseScale: 0.32,
          noiseStrength: 3.43,
          flowSpeed: 0.8,
          lockCamera: !1,
          autoSave: !1,
        },
        xe = class extends de {
          constructor() {
            super(),
              (this._seed = me(1e4)),
              (this.container = new k()),
              (this.changeCamera = !1),
              this.resize();
          }
          _initTextures() {
            const { numParticles: e } = ge,
              t = Ee ? E.HALF_FLOAT : E.FLOAT;
            this._fbo = new Y(
              e,
              e,
              { type: t, minFilter: E.NEAREST, magFilter: E.NEAREST },
              4
            );
          }
          _initViews() {
            const { numParticles: e } = ge;
            (this._dAxis = new U()),
              (this._dCopy = new z()),
              (this._dBall = new B());
            let t = [];
            [
              [12, 75, 96],
              [13, 80, 111],
              [72, 163, 192],
              [125, 199, 204],
              [205, 179, 128],
            ].forEach((e) => {
              t.push(e[0], e[1], e[2]);
            }),
              (t = t.map((e) => e / 255));
            const n = [],
              r = [],
              o = [];
            for (let t = 0; t < e; t++)
              for (let i = 0; i < e; i++)
                n.push([i / e, t / e]),
                  r.push([me(), me(), me()]),
                  o.push([me(1), me(1), me(1)]);
            const i = new F()
              .setMesh(D())
              .useProgram(
                ve,
                "#version 300 es\n\nprecision highp float;\n#define GLSLIFY 1\nin vec2 vTextureCoord;\nuniform float uSeed;\n\n// curlNoise.glsl\n\nvec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0;  }\n\nvec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0;  }\n\n// snoise.glsl\nvec4 permute_0(vec4 x) {  return mod(((x*34.0)+1.0)*x, 289.0);    }\nvec4 taylorInvSqrt_0(vec4 r) {    return 1.79284291400159 - 0.85373472095314 * r; }\n\nfloat snoise_0(vec3 v){\n    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n    const vec4  D_0 = vec4(0.0, 0.5, 1.0, 2.0);\n    \n    vec3 i  = floor(v + dot(v, C.yyy) );\n    vec3 x0 = v - i + dot(i, C.xxx) ;\n    \n    vec3 g_0 = step(x0.yzx, x0.xyz);\n    vec3 l = 1.0 - g_0;\n    vec3 i1 = min( g_0.xyz, l.zxy );\n    vec3 i2 = max( g_0.xyz, l.zxy );\n    \n    vec3 x1 = x0 - i1 + 1.0 * C.xxx;\n    vec3 x2 = x0 - i2 + 2.0 * C.xxx;\n    vec3 x3 = x0 - 1. + 3.0 * C.xxx;\n    \n    i = mod(i, 289.0 );\n    vec4 p = permute_0( permute_0( permute_0( i.z + vec4(0.0, i1.z, i2.z, 1.0 )) + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n    \n    float n_ = 1.0/7.0;\n    vec3  ns = n_ * D_0.wyz - D_0.xzx;\n    \n    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);\n    \n    vec4 x_ = floor(j * ns.z);\n    vec4 y_ = floor(j - 7.0 * x_ );\n    \n    vec4 x = x_ *ns.x + ns.yyyy;\n    vec4 y = y_ *ns.x + ns.yyyy;\n    vec4 h = 1.0 - abs(x) - abs(y);\n    \n    vec4 b0 = vec4( x.xy, y.xy );\n    vec4 b1 = vec4( x.zw, y.zw );\n    \n    vec4 s0 = floor(b0)*2.0 + 1.0;\n    vec4 s1 = floor(b1)*2.0 + 1.0;\n    vec4 sh = -step(h, vec4(0.0));\n    \n    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n    vec4 a1_0 = b1.xzyw + s1.xzyw*sh.zzww ;\n    \n    vec3 p0_0 = vec3(a0.xy,h.x);\n    vec3 p1 = vec3(a0.zw,h.y);\n    vec3 p2 = vec3(a1_0.xy,h.z);\n    vec3 p3 = vec3(a1_0.zw,h.w);\n    \n    vec4 norm = taylorInvSqrt_0(vec4(dot(p0_0,p0_0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n    p0_0 *= norm.x;\n    p1 *= norm.y;\n    p2 *= norm.z;\n    p3 *= norm.w;\n    \n    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n    m = m * m;\n    return 42.0 * dot( m*m, vec4( dot(p0_0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );\n}\n\nfloat snoise_0(float x, float y, float z){\n    return snoise_0(vec3(x, y, z));\n}\n\nvec3 snoiseVec3( vec3 x ){\n\n\tfloat s  = snoise_0(vec3( x ));\n\tfloat s1 = snoise_0(vec3( x.y - 19.1 , x.z + 33.4 , x.x + 47.2 ));\n\tfloat s2 = snoise_0(vec3( x.z + 74.2 , x.x - 124.5 , x.y + 99.4 ));\n\tvec3 c = vec3( s , s1 , s2 );\n\treturn c;\n\n}\n\nvec3 curlNoise( vec3 p ){\n\t\n\tconst float e = .1;\n\tvec3 dx = vec3( e   , 0.0 , 0.0 );\n\tvec3 dy = vec3( 0.0 , e   , 0.0 );\n\tvec3 dz = vec3( 0.0 , 0.0 , e   );\n\n\tvec3 p_x0 = snoiseVec3( p - dx );\n\tvec3 p_x1 = snoiseVec3( p + dx );\n\tvec3 p_y0 = snoiseVec3( p - dy );\n\tvec3 p_y1 = snoiseVec3( p + dy );\n\tvec3 p_z0 = snoiseVec3( p - dz );\n\tvec3 p_z1 = snoiseVec3( p + dz );\n\n\tfloat x = p_y1.z - p_y0.z - p_z1.y + p_z0.y;\n\tfloat y = p_z1.x - p_z0.x - p_x1.z + p_x0.z;\n\tfloat z = p_x1.y - p_x0.y - p_y1.x + p_y0.x;\n\n\tconst float divisor = 1.0 / ( 2.0 * e );\n\treturn normalize( vec3( x , y , z ) * divisor );\n\n}\n\n// snoise.glsl\nvec4 permute_1(vec4 x) {  return mod(((x*34.0)+1.0)*x, 289.0);    }\nvec4 taylorInvSqrt_1(vec4 r) {    return 1.79284291400159 - 0.85373472095314 * r; }\n\nfloat snoise_1(vec3 v){\n    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n    const vec4  D_1 = vec4(0.0, 0.5, 1.0, 2.0);\n    \n    vec3 i  = floor(v + dot(v, C.yyy) );\n    vec3 x0 = v - i + dot(i, C.xxx) ;\n    \n    vec3 g_1 = step(x0.yzx, x0.xyz);\n    vec3 l = 1.0 - g_1;\n    vec3 i1 = min( g_1.xyz, l.zxy );\n    vec3 i2 = max( g_1.xyz, l.zxy );\n    \n    vec3 x1 = x0 - i1 + 1.0 * C.xxx;\n    vec3 x2 = x0 - i2 + 2.0 * C.xxx;\n    vec3 x3 = x0 - 1. + 3.0 * C.xxx;\n    \n    i = mod(i, 289.0 );\n    vec4 p = permute_1( permute_1( permute_1( i.z + vec4(0.0, i1.z, i2.z, 1.0 )) + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n    \n    float n_ = 1.0/7.0;\n    vec3  ns = n_ * D_1.wyz - D_1.xzx;\n    \n    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);\n    \n    vec4 x_ = floor(j * ns.z);\n    vec4 y_ = floor(j - 7.0 * x_ );\n    \n    vec4 x = x_ *ns.x + ns.yyyy;\n    vec4 y = y_ *ns.x + ns.yyyy;\n    vec4 h = 1.0 - abs(x) - abs(y);\n    \n    vec4 b0 = vec4( x.xy, y.xy );\n    vec4 b1 = vec4( x.zw, y.zw );\n    \n    vec4 s0 = floor(b0)*2.0 + 1.0;\n    vec4 s1 = floor(b1)*2.0 + 1.0;\n    vec4 sh = -step(h, vec4(0.0));\n    \n    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n    vec4 a1_1 = b1.xzyw + s1.xzyw*sh.zzww ;\n    \n    vec3 p0_1 = vec3(a0.xy,h.x);\n    vec3 p1 = vec3(a0.zw,h.y);\n    vec3 p2 = vec3(a1_1.xy,h.z);\n    vec3 p3 = vec3(a1_1.zw,h.w);\n    \n    vec4 norm = taylorInvSqrt_1(vec4(dot(p0_1,p0_1), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n    p0_1 *= norm.x;\n    p1 *= norm.y;\n    p2 *= norm.z;\n    p3 *= norm.w;\n    \n    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n    m = m * m;\n    return 42.0 * dot( m*m, vec4( dot(p0_1,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );\n}\n\nfloat snoise_1(float x, float y, float z){\n    return snoise_1(vec3(x, y, z));\n}\n\nlayout (location = 0) out vec4 oColor0;\nlayout (location = 1) out vec4 oColor1;\nlayout (location = 2) out vec4 oColor2;\nlayout (location = 3) out vec4 oColor3;\n\nvoid main(void) {\n    //vec3 pos = curlNoise(vec3(vTextureCoord, uSeed) * 100.0) * 1.1;\n    //float t = snoise(vec3(uSeed, vTextureCoord));\n    //pos *= (t) ;\n    //pos.x -= 5.;\n    //pos.y -= 3.;\n\n    vec3 pos = vec3((vTextureCoord - vec2(0.5)) * 12., 0.) ;\n    pos.y = pos.y / 16. * 10.;\n\n    vec3 extra = curlNoise(vec3(vTextureCoord.x, uSeed, vTextureCoord.y) * 200.0);\n\n    oColor0 = vec4(pos, 1.);\n    oColor1 = vec4(vec3(0.0), 1.);\n    oColor2 = vec4(extra * .5 + .5, 1.0);\n    oColor3 = vec4(pos, 1.0);\n}"
              );
            this._fbo.write.bind(),
              E.clear(0, 0, 0, 0),
              i.uniform("uSeed", me(1e3)).draw(),
              this._fbo.write.unbind(),
              this._fbo.swap();
            const a = new b(E.POINTS).bufferVertex(r).bufferTexCoord(n);
            (this._drawParticles = new F()
              .setMesh(a)
              .useProgram(
                "// basic.vert\n\nprecision highp float;\n#define GLSLIFY 1\nattribute vec3 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat4 uModelMatrix;\nuniform mat4 uViewMatrix;\nuniform mat4 uProjectionMatrix;\nuniform vec2 uViewport;\n\nuniform vec3 uColors[5];\nuniform float uColorSeed;\n\nuniform sampler2D uPosMap;\nuniform sampler2D uExtraMap;\n\nuniform float uBrightness;\nuniform float uColorEdge1;\nuniform float uColorEdge2;\nuniform float uColorEdge3;\nuniform float uColorEdge4;\n\nuniform float uParticleSize;\nuniform vec3 uPosOffset;\n\nvarying vec3 vColor;\n\n// snoise.glsl\nvec4 permute(vec4 x) {  return mod(((x*34.0)+1.0)*x, 289.0);    }\nvec4 taylorInvSqrt(vec4 r) {    return 1.79284291400159 - 0.85373472095314 * r; }\n\nfloat snoise(vec3 v){\n    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\n    \n    vec3 i  = floor(v + dot(v, C.yyy) );\n    vec3 x0 = v - i + dot(i, C.xxx) ;\n    \n    vec3 g = step(x0.yzx, x0.xyz);\n    vec3 l = 1.0 - g;\n    vec3 i1 = min( g.xyz, l.zxy );\n    vec3 i2 = max( g.xyz, l.zxy );\n    \n    vec3 x1 = x0 - i1 + 1.0 * C.xxx;\n    vec3 x2 = x0 - i2 + 2.0 * C.xxx;\n    vec3 x3 = x0 - 1. + 3.0 * C.xxx;\n    \n    i = mod(i, 289.0 );\n    vec4 p = permute( permute( permute( i.z + vec4(0.0, i1.z, i2.z, 1.0 )) + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n    \n    float n_ = 1.0/7.0;\n    vec3  ns = n_ * D.wyz - D.xzx;\n    \n    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);\n    \n    vec4 x_ = floor(j * ns.z);\n    vec4 y_ = floor(j - 7.0 * x_ );\n    \n    vec4 x = x_ *ns.x + ns.yyyy;\n    vec4 y = y_ *ns.x + ns.yyyy;\n    vec4 h = 1.0 - abs(x) - abs(y);\n    \n    vec4 b0 = vec4( x.xy, y.xy );\n    vec4 b1 = vec4( x.zw, y.zw );\n    \n    vec4 s0 = floor(b0)*2.0 + 1.0;\n    vec4 s1 = floor(b1)*2.0 + 1.0;\n    vec4 sh = -step(h, vec4(0.0));\n    \n    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\n    \n    vec3 p0 = vec3(a0.xy,h.x);\n    vec3 p1 = vec3(a0.zw,h.y);\n    vec3 p2 = vec3(a1.xy,h.z);\n    vec3 p3 = vec3(a1.zw,h.w);\n    \n    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n    p0 *= norm.x;\n    p1 *= norm.y;\n    p2 *= norm.z;\n    p3 *= norm.w;\n    \n    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n    m = m * m;\n    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );\n}\n\nfloat snoise(float x, float y, float z){\n    return snoise(vec3(x, y, z));\n}\n\nvec2 rotate(vec2 v, float a) {\n\tfloat s = sin(a);\n\tfloat c = cos(a);\n\tmat2 m = mat2(c, -s, s, c);\n\treturn m * v;\n}\n\nmat4 rotationMatrix(vec3 axis, float angle) {\n    axis = normalize(axis);\n    float s = sin(angle);\n    float c = cos(angle);\n    float oc = 1.0 - c;\n    \n    return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,\n                oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,\n                oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,\n                0.0,                                0.0,                                0.0,                                1.0);\n}\n\nvec3 rotate(vec3 v, vec3 axis, float angle) {\n\tmat4 m = rotationMatrix(axis, angle);\n\treturn (m * vec4(v, 1.0)).xyz;\n}\n\n#define PI 3.141592653589793\n\nfloat particleSize(vec4 screenPos, mat4 mtxProj, vec2 viewport, float radius) {\n\treturn viewport.y * mtxProj[1][1] * radius / screenPos.w;\n}\n\nvoid main(void) {\n    vec3 pos = texture2D(uPosMap, aTextureCoord).xyz;\n    pos.x -= 1.;\n    pos.x += uPosOffset.x;\n    pos.y += uPosOffset.y;\n    //pos.y -= 0.95;\n    //pos.xy = rotate(pos.xy, -0.14 * PI);\n\n    vec4 worldSpace = uModelMatrix * vec4(pos, 1.0);\n    vec4 cameraSpace = uViewMatrix * worldSpace;\n    vec4 screenSpace = uProjectionMatrix * cameraSpace;\n    gl_Position = screenSpace;\n\n    // gl_PointSize = mix(12.0, 5.0, aVertexPosition.x);\n    float radius = mix(0.01, 0.03, aVertexPosition.x);\n    gl_PointSize = particleSize(gl_Position, uProjectionMatrix, uViewport, radius * 0.4 * uParticleSize);\n\n    vec3 color = vec3(0.);\n    \n    float rnd = ((pos.z) + 1.)*3. - 2.6 ;\n    //+  snoise(vec3(uColorSeed, aTextureCoord)) * 0.02;\n    //rnd += extra.y * 0.45;\n\n    if(rnd < uColorEdge1) {\n        color = uColors[0] * 2.;\n    } else if(rnd < uColorEdge2) {\n        color = uColors[1] * 1.5;\n    } else if(rnd < uColorEdge3) {\n        color = uColors[2];\n    } else if(rnd < uColorEdge4) {\n        color = uColors[3];\n    } else {\n        color = uColors[4];\n    }\n\n    //color += 0.2;\n    color *= mix(0.8, 1.1, (pos.z + 1.)*0.5) * uBrightness;\n    color = pow(color, vec3(1.5));\n    vColor = color;\n}",
                "precision highp float;\n#define GLSLIFY 1\nuniform sampler2D uParticleMap;\nvarying vec3 vColor;\n\nvoid main(void) {\n    float dist = distance(gl_PointCoord, vec2(0.5));\n    if(dist > 0.5) {\n        discard;\n    }\n\n    vec2 uv = gl_PointCoord;\n    uv.y = 1.0 - uv.y;\n    vec3 color = texture2D(uParticleMap, uv).rgb;\n\n    gl_FragColor = vec4(color * vColor * 1.6, 1.0);\n}"
              )
              .uniform("uColors", "vec3", t)
              .uniform("uColorSeed", me(1))),
              (this._drawSim = new F()
                .setMesh(D())
                .useProgram(
                  ve,
                  "#version 300 es\n\nprecision highp float;\n#define GLSLIFY 1\nin vec2 vTextureCoord;\n\nuniform sampler2D uPosMap;\nuniform sampler2D uVelMap;\nuniform sampler2D uExtraMap;\nuniform sampler2D uPosOrgMap;\n\nuniform float uTime;\nuniform float uNoiseScale;\nuniform float uNoiseStrength;\nuniform float uFlowSpeed;\nuniform float uAccX;\nuniform float uAccY;\n\n// curlNoise.glsl\n\nvec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0;  }\n\nvec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0;  }\n\n// snoise.glsl\nvec4 permute_0(vec4 x) {  return mod(((x*34.0)+1.0)*x, 289.0);    }\nvec4 taylorInvSqrt_0(vec4 r) {    return 1.79284291400159 - 0.85373472095314 * r; }\n\nfloat snoise_0(vec3 v){\n    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n    const vec4  D_0 = vec4(0.0, 0.5, 1.0, 2.0);\n    \n    vec3 i  = floor(v + dot(v, C.yyy) );\n    vec3 x0 = v - i + dot(i, C.xxx) ;\n    \n    vec3 g_0 = step(x0.yzx, x0.xyz);\n    vec3 l = 1.0 - g_0;\n    vec3 i1 = min( g_0.xyz, l.zxy );\n    vec3 i2 = max( g_0.xyz, l.zxy );\n    \n    vec3 x1 = x0 - i1 + 1.0 * C.xxx;\n    vec3 x2 = x0 - i2 + 2.0 * C.xxx;\n    vec3 x3 = x0 - 1. + 3.0 * C.xxx;\n    \n    i = mod(i, 289.0 );\n    vec4 p = permute_0( permute_0( permute_0( i.z + vec4(0.0, i1.z, i2.z, 1.0 )) + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n    \n    float n_ = 1.0/7.0;\n    vec3  ns = n_ * D_0.wyz - D_0.xzx;\n    \n    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);\n    \n    vec4 x_ = floor(j * ns.z);\n    vec4 y_ = floor(j - 7.0 * x_ );\n    \n    vec4 x = x_ *ns.x + ns.yyyy;\n    vec4 y = y_ *ns.x + ns.yyyy;\n    vec4 h = 1.0 - abs(x) - abs(y);\n    \n    vec4 b0 = vec4( x.xy, y.xy );\n    vec4 b1 = vec4( x.zw, y.zw );\n    \n    vec4 s0 = floor(b0)*2.0 + 1.0;\n    vec4 s1 = floor(b1)*2.0 + 1.0;\n    vec4 sh = -step(h, vec4(0.0));\n    \n    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n    vec4 a1_0 = b1.xzyw + s1.xzyw*sh.zzww ;\n    \n    vec3 p0_0 = vec3(a0.xy,h.x);\n    vec3 p1 = vec3(a0.zw,h.y);\n    vec3 p2 = vec3(a1_0.xy,h.z);\n    vec3 p3 = vec3(a1_0.zw,h.w);\n    \n    vec4 norm = taylorInvSqrt_0(vec4(dot(p0_0,p0_0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n    p0_0 *= norm.x;\n    p1 *= norm.y;\n    p2 *= norm.z;\n    p3 *= norm.w;\n    \n    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n    m = m * m;\n    return 42.0 * dot( m*m, vec4( dot(p0_0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );\n}\n\nfloat snoise_0(float x, float y, float z){\n    return snoise_0(vec3(x, y, z));\n}\n\nvec3 snoiseVec3( vec3 x ){\n\n\tfloat s  = snoise_0(vec3( x ));\n\tfloat s1 = snoise_0(vec3( x.y - 19.1 , x.z + 33.4 , x.x + 47.2 ));\n\tfloat s2 = snoise_0(vec3( x.z + 74.2 , x.x - 124.5 , x.y + 99.4 ));\n\tvec3 c = vec3( s , s1 , s2 );\n\treturn c;\n\n}\n\nvec3 curlNoise( vec3 p ){\n\t\n\tconst float e = .1;\n\tvec3 dx = vec3( e   , 0.0 , 0.0 );\n\tvec3 dy = vec3( 0.0 , e   , 0.0 );\n\tvec3 dz = vec3( 0.0 , 0.0 , e   );\n\n\tvec3 p_x0 = snoiseVec3( p - dx );\n\tvec3 p_x1 = snoiseVec3( p + dx );\n\tvec3 p_y0 = snoiseVec3( p - dy );\n\tvec3 p_y1 = snoiseVec3( p + dy );\n\tvec3 p_z0 = snoiseVec3( p - dz );\n\tvec3 p_z1 = snoiseVec3( p + dz );\n\n\tfloat x = p_y1.z - p_y0.z - p_z1.y + p_z0.y;\n\tfloat y = p_z1.x - p_z0.x - p_x1.z + p_x0.z;\n\tfloat z = p_x1.y - p_x0.y - p_y1.x + p_y0.x;\n\n\tconst float divisor = 1.0 / ( 2.0 * e );\n\treturn normalize( vec3( x , y , z ) * divisor );\n\n}\n\n// snoise.glsl\nvec4 permute_1(vec4 x) {  return mod(((x*34.0)+1.0)*x, 289.0);    }\nvec4 taylorInvSqrt_1(vec4 r) {    return 1.79284291400159 - 0.85373472095314 * r; }\n\nfloat snoise_1(vec3 v){\n    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n    const vec4  D_1 = vec4(0.0, 0.5, 1.0, 2.0);\n    \n    vec3 i  = floor(v + dot(v, C.yyy) );\n    vec3 x0 = v - i + dot(i, C.xxx) ;\n    \n    vec3 g_1 = step(x0.yzx, x0.xyz);\n    vec3 l = 1.0 - g_1;\n    vec3 i1 = min( g_1.xyz, l.zxy );\n    vec3 i2 = max( g_1.xyz, l.zxy );\n    \n    vec3 x1 = x0 - i1 + 1.0 * C.xxx;\n    vec3 x2 = x0 - i2 + 2.0 * C.xxx;\n    vec3 x3 = x0 - 1. + 3.0 * C.xxx;\n    \n    i = mod(i, 289.0 );\n    vec4 p = permute_1( permute_1( permute_1( i.z + vec4(0.0, i1.z, i2.z, 1.0 )) + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n    \n    float n_ = 1.0/7.0;\n    vec3  ns = n_ * D_1.wyz - D_1.xzx;\n    \n    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);\n    \n    vec4 x_ = floor(j * ns.z);\n    vec4 y_ = floor(j - 7.0 * x_ );\n    \n    vec4 x = x_ *ns.x + ns.yyyy;\n    vec4 y = y_ *ns.x + ns.yyyy;\n    vec4 h = 1.0 - abs(x) - abs(y);\n    \n    vec4 b0 = vec4( x.xy, y.xy );\n    vec4 b1 = vec4( x.zw, y.zw );\n    \n    vec4 s0 = floor(b0)*2.0 + 1.0;\n    vec4 s1 = floor(b1)*2.0 + 1.0;\n    vec4 sh = -step(h, vec4(0.0));\n    \n    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n    vec4 a1_1 = b1.xzyw + s1.xzyw*sh.zzww ;\n    \n    vec3 p0_1 = vec3(a0.xy,h.x);\n    vec3 p1 = vec3(a0.zw,h.y);\n    vec3 p2 = vec3(a1_1.xy,h.z);\n    vec3 p3 = vec3(a1_1.zw,h.w);\n    \n    vec4 norm = taylorInvSqrt_1(vec4(dot(p0_1,p0_1), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n    p0_1 *= norm.x;\n    p1 *= norm.y;\n    p2 *= norm.z;\n    p3 *= norm.w;\n    \n    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n    m = m * m;\n    return 42.0 * dot( m*m, vec4( dot(p0_1,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );\n}\n\nfloat snoise_1(float x, float y, float z){\n    return snoise_1(vec3(x, y, z));\n}\n\nvec2 rotate(vec2 v, float a) {\n\tfloat s = sin(a);\n\tfloat c = cos(a);\n\tmat2 m = mat2(c, -s, s, c);\n\treturn m * v;\n}\n\nmat4 rotationMatrix(vec3 axis, float angle) {\n    axis = normalize(axis);\n    float s = sin(angle);\n    float c = cos(angle);\n    float oc = 1.0 - c;\n    \n    return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,\n                oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,\n                oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,\n                0.0,                                0.0,                                0.0,                                1.0);\n}\n\nvec3 rotate(vec3 v, vec3 axis, float angle) {\n\tmat4 m = rotationMatrix(axis, angle);\n\treturn (m * vec4(v, 1.0)).xyz;\n}\n\nlayout (location = 0) out vec4 oColor0;\nlayout (location = 1) out vec4 oColor1;\nlayout (location = 2) out vec4 oColor2;\nlayout (location = 3) out vec4 oColor3;\n\n#define PI 3.141592653589793\n\nvec3 _normalize(vec3 v) {\n    if(length(v) <= 0.0) {\n        return vec3(0.0);\n    } else {\n        return normalize(v);\n    }\n}\n\nvec3 fbm(vec3 p){\n    vec3 n = vec3(0.0);\n    for(int i = 0; i < 5; i++){\n        float mul = pow(2.0, float(i));\n        n += curlNoise(p*mul) / mul;    \n    }\n\n    return n;\n}\n\nvoid main(void) {\n    vec3 pos = texture(uPosMap, vTextureCoord).xyz;\n    vec3 vel = texture(uVelMap, vTextureCoord).xyz;\n    vec3 extra = texture(uExtraMap, vTextureCoord).xyz;\n    vec3 posOrg = texture(uPosOrgMap, vTextureCoord).xyz;\n\n    //float speed = mix(1.0, 2.0, extra.x);\n\n    //float offset = snoise(pos * 0.2 + uTime * 0.1) * 0.5 + 0.5;\n    //offset = mix(0.2, 0.4, offset);\n\n    //float rotSpeed = 0.01;\n    //posOrg.xz = rotate(posOrg.xz, rotSpeed);\n    //posOrg.yz = rotate(posOrg.zy, -rotSpeed);\n\n    vec3 acc = vec3(0.);\n\n    // noise force\n    //acc += curlNoise(pos * 0.5 + uTime * 0.1);\n    //vec3 acc = curlNoise(pos * offset + uTime * 0.1);\n\n    //vec3 acc = fbm(pos * offset + uTime * 0.1);\n    acc += (fbm(pos * uNoiseScale + uTime * 0.1) * uNoiseStrength);\n    acc.x += uAccX;\n    acc.y += uAccY;\n    acc.z *= 0.05;\n\n    // rotating force\n    /*\n    vec3 dir = pos * vec3(1.0, 0.0, 1.0);\n    dir = _normalize(dir);   // be careful dir = vec3(0.0, 0.0, 0.0);\n    dir.xz = rotate(dir.xz, PI * 0.65);\n    float f = mix(1.0, .8, extra.y);\n    acc += dir * f;*/\n\n    // pulling back force\n    /*float maxRadius = 1.5;\n    vec3 center = vec3(-3., -2.0, 0.0);\n    float distToCenter = distance(pos, center);\n    float f1 = smoothstep(0.5, 2.0, distToCenter);\n    vec3 dir = normalize(pos - center);\n    acc -= dir * f1;*/\n\n    /*if(distToCenter > maxRadius) {\n        vec3 dir = -normalize(pos);\n        float f = (distToCenter - maxRadius) * 10.0;\n        //acc += dir * f * mix(0.5, 1.0, extra.y);\n    }*/\n\n    float speedOffset = mix(0.95, 1.0, extra.z);\n    \n    vel += acc * 0.0006 * speedOffset * uFlowSpeed;\n    pos += vel;\n    vel *= 0.9;\n\n    if(abs(pos.x) > 7. || abs(pos.y) > 4.){\n        pos = -posOrg + vel* 2.;\n        vel = vec3(0.0);\n    }\n \n    oColor0 = vec4(pos, 1.0);\n    oColor1 = vec4(vel, 1.);\n    oColor2 = vec4(extra, 1.0);\n    oColor3 = vec4(posOrg, 1.0);\n}"
                )
                .setClearColor(0, 0, 0, 1));
          }
          update() {
            this._drawSim
              .bindFrameBuffer(this._fbo.write)
              .bindTexture("uPosMap", this._fbo.read.getTexture(0), 0)
              .bindTexture("uVelMap", this._fbo.read.getTexture(1), 1)
              .bindTexture("uExtraMap", this._fbo.read.getTexture(2), 2)
              .bindTexture("uPosOrgMap", this._fbo.read.getTexture(3), 3)
              .uniform("uTime", ce.getElapsedTime() + this._seed)
              .uniform("uNoiseScale", ge.noiseScale)
              .uniform("uNoiseStrength", ge.noiseStrength)
              .uniform("uFlowSpeed", ge.flowSpeed)
              .uniform("uAccX", ge.acc_X)
              .uniform("uAccY", ge.acc_Y)
              .draw(),
              this._fbo.swap();
          }
          render() {
            E.clear(0.1, 0.1, 0.1, 1),
              E.setMatrices(this.camera),
              E.setModelMatrix(this.container.matrix),
              this._drawParticles
                .bindTexture("uPosMap", this._fbo.read.texture, 0)
                .bindTexture("uParticleMap", pe.get("particle"), 1)
                .bindTexture("uExtraMap", this._fbo.read.getTexture(2), 2)
                .uniform("uViewport", [E.width, E.height])
                .uniform("uParticleSize", ge.particleSize)
                .uniform("uBrightness", ge.brightness)
                .uniform("uColorEdge1", ge.colorEdge1)
                .uniform("uColorEdge2", ge.colorEdge2)
                .uniform("uColorEdge3", ge.colorEdge3)
                .uniform("uColorEdge4", ge.colorEdge4)
                .uniform(
                  "uColors[0]",
                  ge.color1.map((e) => e / 255)
                )
                .uniform(
                  "uColors[1]",
                  ge.color2.map((e) => e / 255)
                )
                .uniform(
                  "uColors[2]",
                  ge.color3.map((e) => e / 255)
                )
                .uniform(
                  "uColors[3]",
                  ge.color4.map((e) => e / 255)
                )
                .uniform(
                  "uColors[4]",
                  ge.color5.map((e) => e / 255)
                )
                .uniform("uPosOffset", [ge.posX, ge.posY, 1])
                .draw(),
              ge.lockCamera
                ? this.changeCamera ||
                  (this.orbitalControl.lock(), (this.changeCamera = !0))
                : this.changeCamera &&
                  ((this.orbitalControl._isLockZoom = !1),
                  (this.orbitalControl._isLockRotation = !1),
                  (this.changeCamera = !1));
          }
          resize() {
            const {
              innerWidth: e,
              innerHeight: t,
              devicePixelRatio: n,
            } = window;
            let r = Math.max(2, n);
            r = 1;
            const o = e,
              i = t;
            ((e, t, n, r) => {
              const { innerWidth: o, innerHeight: i } = window;
              (t = t || o), (n = n || i), r && r.setSize(t, n);
              let a = Math.min(t, o),
                s = Math.min(n, i);
              const c = o / t,
                u = i / n,
                l = Math.min(c, u);
              (a = t * l), (s = n * l);
              const h = Math.floor(o - a) / 2,
                d = Math.floor(i - s) / 2;
              e.style.cssText = `\n    position:absolute;\n    width:${a}px;\n    height:${s}px;\n    top:${d}px;\n    left:${
                0 * h
              }px;\n  `;
            })(E.canvas, 1 * o, 1 * i, E),
              this.camera.setAspectRatio(E.aspectRatio);
          }
        };
      var Te = n(160),
        be = n.n(Te);
      let Ae = !0;
      const ye = () => {
        Ae &&
          window.history.pushState(
            "experiment",
            "Title",
            window.location.origin +
              window.location.pathname +
              "?config=" +
              JSON.stringify(ge)
          );
      };
      let Re = -1;
      const Me = {
          enabled: Ae,
          reload: () => {
            Ae &&
              (window.location.href =
                window.location.origin +
                window.location.pathname +
                "?config=" +
                JSON.stringify(ge));
          },
          reset: () => {
            window.location.href =
              window.location.origin + window.location.pathname;
          },
          refresh: ye,
          delayReload: () => {
            Ae &&
              (window.clearTimeout(Re),
              (Re = window.setTimeout(() => {
                window.location.href =
                  window.location.origin +
                  window.location.pathname +
                  "?config=" +
                  JSON.stringify(ge);
              }, 500)));
          },
          init: (e = !0) => {
            Ae = e;
            const t = be()(window.location.search, !0);
            let n = {};
            t.query.config && (n = JSON.parse(t.query.config)),
              Object.assign(ge, n),
              ye();
          },
        },
        Se = [
          { id: "particle", url: "assets/particle.png", type: "png" },
          { id: "sphere", url: "assets/sphere.obj", type: "text" },
        ];
      var Ce = n(757),
        we = n.n(Ce);
      (String.prototype.replaceAll = function (e, t) {
        return this.replace(new RegExp(e, "g"), t);
      }),
        window.addEventListener("keydown", (e) => {
          if (83 === e.keyCode && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            const t = (() => {
              const e = new Date();
              return `${e.getFullYear()}.${
                e.getMonth() + 1
              }.${e.getDate()}-${e.getHours()}.${e.getMinutes()}.${e.getSeconds()}`;
            })();
            ((e, t) => {
              var n = document.createElement("a"),
                r = ((e) => {
                  for (
                    var t = e.split(","),
                      n = t[0].match(/:(.*?);/)[1],
                      r = atob(t[1]),
                      o = r.length,
                      i = new Uint8Array(o);
                    o--;

                  )
                    i[o] = r.charCodeAt(o);
                  return new Blob([i], { type: n });
                })(e.toDataURL({ format: "png", multiplier: 4 })),
                o = URL.createObjectURL(r);
              (n.download = `${t}.png`), (n.href = o), n.click();
            })(document.querySelector("#main-canvas"), t);
          }
        });
      var Le = n(571);
      const Ne = new (n.n(Le)())();
      function Ie(e, t) {
        var n = e.__state.conversionName.toString(),
          r = Math.round(e.r),
          o = Math.round(e.g),
          i = Math.round(e.b),
          a = e.a,
          s = Math.round(e.h),
          c = e.s.toFixed(1),
          u = e.v.toFixed(1);
        if (t || "THREE_CHAR_HEX" === n || "SIX_CHAR_HEX" === n) {
          for (var l = e.hex.toString(16); l.length < 6; ) l = "0" + l;
          return "#" + l;
        }
        return "CSS_RGB" === n
          ? "rgb(" + r + "," + o + "," + i + ")"
          : "CSS_RGBA" === n
          ? "rgba(" + r + "," + o + "," + i + "," + a + ")"
          : "HEX" === n
          ? "0x" + e.hex.toString(16)
          : "RGB_ARRAY" === n
          ? "[" + r + "," + o + "," + i + "]"
          : "RGBA_ARRAY" === n
          ? "[" + r + "," + o + "," + i + "," + a + "]"
          : "RGB_OBJ" === n
          ? "{r:" + r + ",g:" + o + ",b:" + i + "}"
          : "RGBA_OBJ" === n
          ? "{r:" + r + ",g:" + o + ",b:" + i + ",a:" + a + "}"
          : "HSV_OBJ" === n
          ? "{h:" + s + ",s:" + c + ",v:" + u + "}"
          : "HSVA_OBJ" === n
          ? "{h:" + s + ",s:" + c + ",v:" + u + ",a:" + a + "}"
          : "unknown format";
      }
      document.body.appendChild(Ne.domElement),
        ce.addEF(() => {
          Ne.update();
        });
      var Oe = Array.prototype.forEach,
        Pe = Array.prototype.slice,
        Fe = {
          BREAK: {},
          extend: function (e) {
            return (
              this.each(
                Pe.call(arguments, 1),
                function (t) {
                  (this.isObject(t) ? Object.keys(t) : []).forEach(
                    function (n) {
                      this.isUndefined(t[n]) || (e[n] = t[n]);
                    }.bind(this)
                  );
                },
                this
              ),
              e
            );
          },
          defaults: function (e) {
            return (
              this.each(
                Pe.call(arguments, 1),
                function (t) {
                  (this.isObject(t) ? Object.keys(t) : []).forEach(
                    function (n) {
                      this.isUndefined(e[n]) && (e[n] = t[n]);
                    }.bind(this)
                  );
                },
                this
              ),
              e
            );
          },
          compose: function () {
            var e = Pe.call(arguments);
            return function () {
              for (var t = Pe.call(arguments), n = e.length - 1; n >= 0; n--)
                t = [e[n].apply(this, t)];
              return t[0];
            };
          },
          each: function (e, t, n) {
            if (e)
              if (Oe && e.forEach && e.forEach === Oe) e.forEach(t, n);
              else if (e.length === e.length + 0) {
                var r,
                  o = void 0;
                for (o = 0, r = e.length; o < r; o++)
                  if (o in e && t.call(n, e[o], o) === this.BREAK) return;
              } else
                for (var i in e) if (t.call(n, e[i], i) === this.BREAK) return;
          },
          defer: function (e) {
            setTimeout(e, 0);
          },
          debounce: function (e, t, n) {
            var r = void 0;
            return function () {
              var o = this,
                i = arguments,
                a = n || !r;
              clearTimeout(r),
                (r = setTimeout(function () {
                  (r = null), n || e.apply(o, i);
                }, t)),
                a && e.apply(o, i);
            };
          },
          toArray: function (e) {
            return e.toArray ? e.toArray() : Pe.call(e);
          },
          isUndefined: function (e) {
            return void 0 === e;
          },
          isNull: function (e) {
            return null === e;
          },
          isNaN: (function (e) {
            function t(t) {
              return e.apply(this, arguments);
            }
            return (
              (t.toString = function () {
                return e.toString();
              }),
              t
            );
          })(function (e) {
            return isNaN(e);
          }),
          isArray:
            Array.isArray ||
            function (e) {
              return e.constructor === Array;
            },
          isObject: function (e) {
            return e === Object(e);
          },
          isNumber: function (e) {
            return e === e + 0;
          },
          isString: function (e) {
            return e === e + "";
          },
          isBoolean: function (e) {
            return !1 === e || !0 === e;
          },
          isFunction: function (e) {
            return e instanceof Function;
          },
        },
        Ue = [
          {
            litmus: Fe.isString,
            conversions: {
              THREE_CHAR_HEX: {
                read: function (e) {
                  var t = e.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
                  return (
                    null !== t && {
                      space: "HEX",
                      hex: parseInt(
                        "0x" +
                          t[1].toString() +
                          t[1].toString() +
                          t[2].toString() +
                          t[2].toString() +
                          t[3].toString() +
                          t[3].toString(),
                        0
                      ),
                    }
                  );
                },
                write: Ie,
              },
              SIX_CHAR_HEX: {
                read: function (e) {
                  var t = e.match(/^#([A-F0-9]{6})$/i);
                  return (
                    null !== t && {
                      space: "HEX",
                      hex: parseInt("0x" + t[1].toString(), 0),
                    }
                  );
                },
                write: Ie,
              },
              CSS_RGB: {
                read: function (e) {
                  var t = e.match(
                    /^rgb\(\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*\)/
                  );
                  return (
                    null !== t && {
                      space: "RGB",
                      r: parseFloat(t[1]),
                      g: parseFloat(t[2]),
                      b: parseFloat(t[3]),
                    }
                  );
                },
                write: Ie,
              },
              CSS_RGBA: {
                read: function (e) {
                  var t = e.match(
                    /^rgba\(\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*\)/
                  );
                  return (
                    null !== t && {
                      space: "RGB",
                      r: parseFloat(t[1]),
                      g: parseFloat(t[2]),
                      b: parseFloat(t[3]),
                      a: parseFloat(t[4]),
                    }
                  );
                },
                write: Ie,
              },
            },
          },
          {
            litmus: Fe.isNumber,
            conversions: {
              HEX: {
                read: function (e) {
                  return { space: "HEX", hex: e, conversionName: "HEX" };
                },
                write: function (e) {
                  return e.hex;
                },
              },
            },
          },
          {
            litmus: Fe.isArray,
            conversions: {
              RGB_ARRAY: {
                read: function (e) {
                  return (
                    3 === e.length && {
                      space: "RGB",
                      r: e[0],
                      g: e[1],
                      b: e[2],
                    }
                  );
                },
                write: function (e) {
                  return [e.r, e.g, e.b];
                },
              },
              RGBA_ARRAY: {
                read: function (e) {
                  return (
                    4 === e.length && {
                      space: "RGB",
                      r: e[0],
                      g: e[1],
                      b: e[2],
                      a: e[3],
                    }
                  );
                },
                write: function (e) {
                  return [e.r, e.g, e.b, e.a];
                },
              },
            },
          },
          {
            litmus: Fe.isObject,
            conversions: {
              RGBA_OBJ: {
                read: function (e) {
                  return (
                    !!(
                      Fe.isNumber(e.r) &&
                      Fe.isNumber(e.g) &&
                      Fe.isNumber(e.b) &&
                      Fe.isNumber(e.a)
                    ) && { space: "RGB", r: e.r, g: e.g, b: e.b, a: e.a }
                  );
                },
                write: function (e) {
                  return { r: e.r, g: e.g, b: e.b, a: e.a };
                },
              },
              RGB_OBJ: {
                read: function (e) {
                  return (
                    !!(
                      Fe.isNumber(e.r) &&
                      Fe.isNumber(e.g) &&
                      Fe.isNumber(e.b)
                    ) && { space: "RGB", r: e.r, g: e.g, b: e.b }
                  );
                },
                write: function (e) {
                  return { r: e.r, g: e.g, b: e.b };
                },
              },
              HSVA_OBJ: {
                read: function (e) {
                  return (
                    !!(
                      Fe.isNumber(e.h) &&
                      Fe.isNumber(e.s) &&
                      Fe.isNumber(e.v) &&
                      Fe.isNumber(e.a)
                    ) && { space: "HSV", h: e.h, s: e.s, v: e.v, a: e.a }
                  );
                },
                write: function (e) {
                  return { h: e.h, s: e.s, v: e.v, a: e.a };
                },
              },
              HSV_OBJ: {
                read: function (e) {
                  return (
                    !!(
                      Fe.isNumber(e.h) &&
                      Fe.isNumber(e.s) &&
                      Fe.isNumber(e.v)
                    ) && { space: "HSV", h: e.h, s: e.s, v: e.v }
                  );
                },
                write: function (e) {
                  return { h: e.h, s: e.s, v: e.v };
                },
              },
            },
          },
        ],
        De = void 0,
        Be = void 0,
        ze = function () {
          Be = !1;
          var e = arguments.length > 1 ? Fe.toArray(arguments) : arguments[0];
          return (
            Fe.each(Ue, function (t) {
              if (t.litmus(e))
                return (
                  Fe.each(t.conversions, function (t, n) {
                    if (((De = t.read(e)), !1 === Be && !1 !== De))
                      return (
                        (Be = De),
                        (De.conversionName = n),
                        (De.conversion = t),
                        Fe.BREAK
                      );
                  }),
                  Fe.BREAK
                );
            }),
            Be
          );
        },
        Ge = void 0,
        Ve = {
          hsv_to_rgb: function (e, t, n) {
            var r = Math.floor(e / 60) % 6,
              o = e / 60 - Math.floor(e / 60),
              i = n * (1 - t),
              a = n * (1 - o * t),
              s = n * (1 - (1 - o) * t),
              c = [
                [n, s, i],
                [a, n, i],
                [i, n, s],
                [i, a, n],
                [s, i, n],
                [n, i, a],
              ][r];
            return { r: 255 * c[0], g: 255 * c[1], b: 255 * c[2] };
          },
          rgb_to_hsv: function (e, t, n) {
            var r = Math.min(e, t, n),
              o = Math.max(e, t, n),
              i = o - r,
              a = void 0;
            return 0 === o
              ? { h: NaN, s: 0, v: 0 }
              : ((a =
                  e === o
                    ? (t - n) / i
                    : t === o
                    ? 2 + (n - e) / i
                    : 4 + (e - t) / i),
                (a /= 6) < 0 && (a += 1),
                { h: 360 * a, s: i / o, v: o / 255 });
          },
          rgb_to_hex: function (e, t, n) {
            var r = this.hex_with_component(0, 2, e);
            return (
              (r = this.hex_with_component(r, 1, t)),
              this.hex_with_component(r, 0, n)
            );
          },
          component_from_hex: function (e, t) {
            return (e >> (8 * t)) & 255;
          },
          hex_with_component: function (e, t, n) {
            return (n << (Ge = 8 * t)) | (e & ~(255 << Ge));
          },
        },
        Xe =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              },
        ke = function (e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        },
        He = (function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                "value" in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function (t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t;
          };
        })(),
        Ye = function e(t, n, r) {
          null === t && (t = Function.prototype);
          var o = Object.getOwnPropertyDescriptor(t, n);
          if (void 0 === o) {
            var i = Object.getPrototypeOf(t);
            return null === i ? void 0 : e(i, n, r);
          }
          if ("value" in o) return o.value;
          var a = o.get;
          return void 0 !== a ? a.call(r) : void 0;
        },
        je = function (e, t) {
          if ("function" != typeof t && null !== t)
            throw new TypeError(
              "Super expression must either be null or a function, not " +
                typeof t
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: {
              value: e,
              enumerable: !1,
              writable: !0,
              configurable: !0,
            },
          })),
            t &&
              (Object.setPrototypeOf
                ? Object.setPrototypeOf(e, t)
                : (e.__proto__ = t));
        },
        We = function (e, t) {
          if (!e)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            );
          return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
        },
        qe = (function () {
          function e() {
            if (
              (ke(this, e),
              (this.__state = ze.apply(this, arguments)),
              !1 === this.__state)
            )
              throw new Error("Failed to interpret color arguments");
            this.__state.a = this.__state.a || 1;
          }
          return (
            He(e, [
              {
                key: "toString",
                value: function () {
                  return Ie(this);
                },
              },
              {
                key: "toHexString",
                value: function () {
                  return Ie(this, !0);
                },
              },
              {
                key: "toOriginal",
                value: function () {
                  return this.__state.conversion.write(this);
                },
              },
            ]),
            e
          );
        })();
      function Ke(e, t, n) {
        Object.defineProperty(e, t, {
          get: function () {
            return (
              "RGB" === this.__state.space || qe.recalculateRGB(this, t, n),
              this.__state[t]
            );
          },
          set: function (e) {
            "RGB" !== this.__state.space &&
              (qe.recalculateRGB(this, t, n), (this.__state.space = "RGB")),
              (this.__state[t] = e);
          },
        });
      }
      function Ze(e, t) {
        Object.defineProperty(e, t, {
          get: function () {
            return (
              "HSV" === this.__state.space || qe.recalculateHSV(this),
              this.__state[t]
            );
          },
          set: function (e) {
            "HSV" !== this.__state.space &&
              (qe.recalculateHSV(this), (this.__state.space = "HSV")),
              (this.__state[t] = e);
          },
        });
      }
      (qe.recalculateRGB = function (e, t, n) {
        if ("HEX" === e.__state.space)
          e.__state[t] = Ve.component_from_hex(e.__state.hex, n);
        else {
          if ("HSV" !== e.__state.space)
            throw new Error("Corrupted color state");
          Fe.extend(
            e.__state,
            Ve.hsv_to_rgb(e.__state.h, e.__state.s, e.__state.v)
          );
        }
      }),
        (qe.recalculateHSV = function (e) {
          var t = Ve.rgb_to_hsv(e.r, e.g, e.b);
          Fe.extend(e.__state, { s: t.s, v: t.v }),
            Fe.isNaN(t.h)
              ? Fe.isUndefined(e.__state.h) && (e.__state.h = 0)
              : (e.__state.h = t.h);
        }),
        (qe.COMPONENTS = ["r", "g", "b", "h", "s", "v", "hex", "a"]),
        Ke(qe.prototype, "r", 2),
        Ke(qe.prototype, "g", 1),
        Ke(qe.prototype, "b", 0),
        Ze(qe.prototype, "h"),
        Ze(qe.prototype, "s"),
        Ze(qe.prototype, "v"),
        Object.defineProperty(qe.prototype, "a", {
          get: function () {
            return this.__state.a;
          },
          set: function (e) {
            this.__state.a = e;
          },
        }),
        Object.defineProperty(qe.prototype, "hex", {
          get: function () {
            return (
              "HEX" !== this.__state.space &&
                ((this.__state.hex = Ve.rgb_to_hex(this.r, this.g, this.b)),
                (this.__state.space = "HEX")),
              this.__state.hex
            );
          },
          set: function (e) {
            (this.__state.space = "HEX"), (this.__state.hex = e);
          },
        });
      var Qe = (function () {
          function e(t, n) {
            ke(this, e),
              (this.initialValue = t[n]),
              (this.domElement = document.createElement("div")),
              (this.object = t),
              (this.property = n),
              (this.__onChange = void 0),
              (this.__onFinishChange = void 0);
          }
          return (
            He(e, [
              {
                key: "onChange",
                value: function (e) {
                  return (this.__onChange = e), this;
                },
              },
              {
                key: "onFinishChange",
                value: function (e) {
                  return (this.__onFinishChange = e), this;
                },
              },
              {
                key: "setValue",
                value: function (e) {
                  return (
                    (this.object[this.property] = e),
                    this.__onChange && this.__onChange.call(this, e),
                    this.updateDisplay(),
                    this
                  );
                },
              },
              {
                key: "getValue",
                value: function () {
                  return this.object[this.property];
                },
              },
              {
                key: "updateDisplay",
                value: function () {
                  return this;
                },
              },
              {
                key: "isModified",
                value: function () {
                  return this.initialValue !== this.getValue();
                },
              },
            ]),
            e
          );
        })(),
        Je = {};
      Fe.each(
        {
          HTMLEvents: ["change"],
          MouseEvents: [
            "click",
            "mousemove",
            "mousedown",
            "mouseup",
            "mouseover",
          ],
          KeyboardEvents: ["keydown"],
        },
        function (e, t) {
          Fe.each(e, function (e) {
            Je[e] = t;
          });
        }
      );
      var $e = /(\d+(\.\d+)?)px/;
      function et(e) {
        if ("0" === e || Fe.isUndefined(e)) return 0;
        var t = e.match($e);
        return Fe.isNull(t) ? 0 : parseFloat(t[1]);
      }
      var tt = {
          makeSelectable: function (e, t) {
            void 0 !== e &&
              void 0 !== e.style &&
              ((e.onselectstart = t
                ? function () {
                    return !1;
                  }
                : function () {}),
              (e.style.MozUserSelect = t ? "auto" : "none"),
              (e.style.KhtmlUserSelect = t ? "auto" : "none"),
              (e.unselectable = t ? "on" : "off"));
          },
          makeFullscreen: function (e, t, n) {
            var r = n,
              o = t;
            Fe.isUndefined(o) && (o = !0),
              Fe.isUndefined(r) && (r = !0),
              (e.style.position = "absolute"),
              o && ((e.style.left = 0), (e.style.right = 0)),
              r && ((e.style.top = 0), (e.style.bottom = 0));
          },
          fakeEvent: function (e, t, n, r) {
            var o = n || {},
              i = Je[t];
            if (!i) throw new Error("Event type " + t + " not supported.");
            var a = document.createEvent(i);
            switch (i) {
              case "MouseEvents":
                var s = o.x || o.clientX || 0,
                  c = o.y || o.clientY || 0;
                a.initMouseEvent(
                  t,
                  o.bubbles || !1,
                  o.cancelable || !0,
                  window,
                  o.clickCount || 1,
                  0,
                  0,
                  s,
                  c,
                  !1,
                  !1,
                  !1,
                  !1,
                  0,
                  null
                );
                break;
              case "KeyboardEvents":
                var u = a.initKeyboardEvent || a.initKeyEvent;
                Fe.defaults(o, {
                  cancelable: !0,
                  ctrlKey: !1,
                  altKey: !1,
                  shiftKey: !1,
                  metaKey: !1,
                  keyCode: void 0,
                  charCode: void 0,
                }),
                  u(
                    t,
                    o.bubbles || !1,
                    o.cancelable,
                    window,
                    o.ctrlKey,
                    o.altKey,
                    o.shiftKey,
                    o.metaKey,
                    o.keyCode,
                    o.charCode
                  );
                break;
              default:
                a.initEvent(t, o.bubbles || !1, o.cancelable || !0);
            }
            Fe.defaults(a, r), e.dispatchEvent(a);
          },
          bind: function (e, t, n, r) {
            var o = r || !1;
            return (
              e.addEventListener
                ? e.addEventListener(t, n, o)
                : e.attachEvent && e.attachEvent("on" + t, n),
              tt
            );
          },
          unbind: function (e, t, n, r) {
            var o = r || !1;
            return (
              e.removeEventListener
                ? e.removeEventListener(t, n, o)
                : e.detachEvent && e.detachEvent("on" + t, n),
              tt
            );
          },
          addClass: function (e, t) {
            if (void 0 === e.className) e.className = t;
            else if (e.className !== t) {
              var n = e.className.split(/ +/);
              -1 === n.indexOf(t) &&
                (n.push(t),
                (e.className = n
                  .join(" ")
                  .replace(/^\s+/, "")
                  .replace(/\s+$/, "")));
            }
            return tt;
          },
          removeClass: function (e, t) {
            if (t)
              if (e.className === t) e.removeAttribute("class");
              else {
                var n = e.className.split(/ +/),
                  r = n.indexOf(t);
                -1 !== r && (n.splice(r, 1), (e.className = n.join(" ")));
              }
            else e.className = void 0;
            return tt;
          },
          hasClass: function (e, t) {
            return (
              new RegExp("(?:^|\\s+)" + t + "(?:\\s+|$)").test(e.className) ||
              !1
            );
          },
          getWidth: function (e) {
            var t = getComputedStyle(e);
            return (
              et(t["border-left-width"]) +
              et(t["border-right-width"]) +
              et(t["padding-left"]) +
              et(t["padding-right"]) +
              et(t.width)
            );
          },
          getHeight: function (e) {
            var t = getComputedStyle(e);
            return (
              et(t["border-top-width"]) +
              et(t["border-bottom-width"]) +
              et(t["padding-top"]) +
              et(t["padding-bottom"]) +
              et(t.height)
            );
          },
          getOffset: function (e) {
            var t = e,
              n = { left: 0, top: 0 };
            if (t.offsetParent)
              do {
                (n.left += t.offsetLeft),
                  (n.top += t.offsetTop),
                  (t = t.offsetParent);
              } while (t);
            return n;
          },
          isActive: function (e) {
            return e === document.activeElement && (e.type || e.href);
          },
        },
        nt = (function (e) {
          function t(e, n) {
            ke(this, t);
            var r = We(
                this,
                (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n)
              ),
              o = r;
            return (
              (r.__prev = r.getValue()),
              (r.__checkbox = document.createElement("input")),
              r.__checkbox.setAttribute("type", "checkbox"),
              tt.bind(
                r.__checkbox,
                "change",
                function () {
                  o.setValue(!o.__prev);
                },
                !1
              ),
              r.domElement.appendChild(r.__checkbox),
              r.updateDisplay(),
              r
            );
          }
          return (
            je(t, e),
            He(t, [
              {
                key: "setValue",
                value: function (e) {
                  var n = Ye(
                    t.prototype.__proto__ || Object.getPrototypeOf(t.prototype),
                    "setValue",
                    this
                  ).call(this, e);
                  return (
                    this.__onFinishChange &&
                      this.__onFinishChange.call(this, this.getValue()),
                    (this.__prev = this.getValue()),
                    n
                  );
                },
              },
              {
                key: "updateDisplay",
                value: function () {
                  return (
                    !0 === this.getValue()
                      ? (this.__checkbox.setAttribute("checked", "checked"),
                        (this.__checkbox.checked = !0),
                        (this.__prev = !0))
                      : ((this.__checkbox.checked = !1), (this.__prev = !1)),
                    Ye(
                      t.prototype.__proto__ ||
                        Object.getPrototypeOf(t.prototype),
                      "updateDisplay",
                      this
                    ).call(this)
                  );
                },
              },
            ]),
            t
          );
        })(Qe),
        rt = (function (e) {
          function t(e, n, r) {
            ke(this, t);
            var o = We(
                this,
                (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n)
              ),
              i = r,
              a = o;
            if (
              ((o.__select = document.createElement("select")), Fe.isArray(i))
            ) {
              var s = {};
              Fe.each(i, function (e) {
                s[e] = e;
              }),
                (i = s);
            }
            return (
              Fe.each(i, function (e, t) {
                var n = document.createElement("option");
                (n.innerHTML = t),
                  n.setAttribute("value", e),
                  a.__select.appendChild(n);
              }),
              o.updateDisplay(),
              tt.bind(o.__select, "change", function () {
                var e = this.options[this.selectedIndex].value;
                a.setValue(e);
              }),
              o.domElement.appendChild(o.__select),
              o
            );
          }
          return (
            je(t, e),
            He(t, [
              {
                key: "setValue",
                value: function (e) {
                  var n = Ye(
                    t.prototype.__proto__ || Object.getPrototypeOf(t.prototype),
                    "setValue",
                    this
                  ).call(this, e);
                  return (
                    this.__onFinishChange &&
                      this.__onFinishChange.call(this, this.getValue()),
                    n
                  );
                },
              },
              {
                key: "updateDisplay",
                value: function () {
                  return tt.isActive(this.__select)
                    ? this
                    : ((this.__select.value = this.getValue()),
                      Ye(
                        t.prototype.__proto__ ||
                          Object.getPrototypeOf(t.prototype),
                        "updateDisplay",
                        this
                      ).call(this));
                },
              },
            ]),
            t
          );
        })(Qe),
        ot = (function (e) {
          function t(e, n) {
            ke(this, t);
            var r = We(
                this,
                (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n)
              ),
              o = r;
            function i() {
              o.setValue(o.__input.value);
            }
            return (
              (r.__input = document.createElement("input")),
              r.__input.setAttribute("type", "text"),
              tt.bind(r.__input, "keyup", i),
              tt.bind(r.__input, "change", i),
              tt.bind(r.__input, "blur", function () {
                o.__onFinishChange && o.__onFinishChange.call(o, o.getValue());
              }),
              tt.bind(r.__input, "keydown", function (e) {
                13 === e.keyCode && this.blur();
              }),
              r.updateDisplay(),
              r.domElement.appendChild(r.__input),
              r
            );
          }
          return (
            je(t, e),
            He(t, [
              {
                key: "updateDisplay",
                value: function () {
                  return (
                    tt.isActive(this.__input) ||
                      (this.__input.value = this.getValue()),
                    Ye(
                      t.prototype.__proto__ ||
                        Object.getPrototypeOf(t.prototype),
                      "updateDisplay",
                      this
                    ).call(this)
                  );
                },
              },
            ]),
            t
          );
        })(Qe);
      function it(e) {
        var t = e.toString();
        return t.indexOf(".") > -1 ? t.length - t.indexOf(".") - 1 : 0;
      }
      var at = (function (e) {
          function t(e, n, r) {
            ke(this, t);
            var o = We(
                this,
                (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n)
              ),
              i = r || {};
            return (
              (o.__min = i.min),
              (o.__max = i.max),
              (o.__step = i.step),
              Fe.isUndefined(o.__step)
                ? 0 === o.initialValue
                  ? (o.__impliedStep = 1)
                  : (o.__impliedStep =
                      Math.pow(
                        10,
                        Math.floor(
                          Math.log(Math.abs(o.initialValue)) / Math.LN10
                        )
                      ) / 10)
                : (o.__impliedStep = o.__step),
              (o.__precision = it(o.__impliedStep)),
              o
            );
          }
          return (
            je(t, e),
            He(t, [
              {
                key: "setValue",
                value: function (e) {
                  var n = e;
                  return (
                    void 0 !== this.__min && n < this.__min
                      ? (n = this.__min)
                      : void 0 !== this.__max &&
                        n > this.__max &&
                        (n = this.__max),
                    void 0 !== this.__step &&
                      n % this.__step != 0 &&
                      (n = Math.round(n / this.__step) * this.__step),
                    Ye(
                      t.prototype.__proto__ ||
                        Object.getPrototypeOf(t.prototype),
                      "setValue",
                      this
                    ).call(this, n)
                  );
                },
              },
              {
                key: "min",
                value: function (e) {
                  return (this.__min = e), this;
                },
              },
              {
                key: "max",
                value: function (e) {
                  return (this.__max = e), this;
                },
              },
              {
                key: "step",
                value: function (e) {
                  return (
                    (this.__step = e),
                    (this.__impliedStep = e),
                    (this.__precision = it(e)),
                    this
                  );
                },
              },
            ]),
            t
          );
        })(Qe),
        st = (function (e) {
          function t(e, n, r) {
            ke(this, t);
            var o = We(
              this,
              (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n, r)
            );
            o.__truncationSuspended = !1;
            var i = o,
              a = void 0;
            function s() {
              i.__onFinishChange && i.__onFinishChange.call(i, i.getValue());
            }
            function c(e) {
              var t = a - e.clientY;
              i.setValue(i.getValue() + t * i.__impliedStep), (a = e.clientY);
            }
            function u() {
              tt.unbind(window, "mousemove", c),
                tt.unbind(window, "mouseup", u),
                s();
            }
            return (
              (o.__input = document.createElement("input")),
              o.__input.setAttribute("type", "text"),
              tt.bind(o.__input, "change", function () {
                var e = parseFloat(i.__input.value);
                Fe.isNaN(e) || i.setValue(e);
              }),
              tt.bind(o.__input, "blur", function () {
                s();
              }),
              tt.bind(o.__input, "mousedown", function (e) {
                tt.bind(window, "mousemove", c),
                  tt.bind(window, "mouseup", u),
                  (a = e.clientY);
              }),
              tt.bind(o.__input, "keydown", function (e) {
                13 === e.keyCode &&
                  ((i.__truncationSuspended = !0),
                  this.blur(),
                  (i.__truncationSuspended = !1),
                  s());
              }),
              o.updateDisplay(),
              o.domElement.appendChild(o.__input),
              o
            );
          }
          return (
            je(t, e),
            He(t, [
              {
                key: "updateDisplay",
                value: function () {
                  var e, n, r;
                  return (
                    (this.__input.value = this.__truncationSuspended
                      ? this.getValue()
                      : ((e = this.getValue()),
                        (n = this.__precision),
                        (r = Math.pow(10, n)),
                        Math.round(e * r) / r)),
                    Ye(
                      t.prototype.__proto__ ||
                        Object.getPrototypeOf(t.prototype),
                      "updateDisplay",
                      this
                    ).call(this)
                  );
                },
              },
            ]),
            t
          );
        })(at);
      function ct(e, t, n, r, o) {
        return r + ((e - t) / (n - t)) * (o - r);
      }
      var ut = (function (e) {
          function t(e, n, r, o, i) {
            ke(this, t);
            var a = We(
                this,
                (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n, {
                  min: r,
                  max: o,
                  step: i,
                })
              ),
              s = a;
            function c(e) {
              e.preventDefault();
              var t = s.__background.getBoundingClientRect();
              return (
                s.setValue(ct(e.clientX, t.left, t.right, s.__min, s.__max)), !1
              );
            }
            function u() {
              tt.unbind(window, "mousemove", c),
                tt.unbind(window, "mouseup", u),
                s.__onFinishChange && s.__onFinishChange.call(s, s.getValue());
            }
            function l(e) {
              var t = e.touches[0].clientX,
                n = s.__background.getBoundingClientRect();
              s.setValue(ct(t, n.left, n.right, s.__min, s.__max));
            }
            function h() {
              tt.unbind(window, "touchmove", l),
                tt.unbind(window, "touchend", h),
                s.__onFinishChange && s.__onFinishChange.call(s, s.getValue());
            }
            return (
              (a.__background = document.createElement("div")),
              (a.__foreground = document.createElement("div")),
              tt.bind(a.__background, "mousedown", function (e) {
                document.activeElement.blur(),
                  tt.bind(window, "mousemove", c),
                  tt.bind(window, "mouseup", u),
                  c(e);
              }),
              tt.bind(a.__background, "touchstart", function (e) {
                1 === e.touches.length &&
                  (tt.bind(window, "touchmove", l),
                  tt.bind(window, "touchend", h),
                  l(e));
              }),
              tt.addClass(a.__background, "slider"),
              tt.addClass(a.__foreground, "slider-fg"),
              a.updateDisplay(),
              a.__background.appendChild(a.__foreground),
              a.domElement.appendChild(a.__background),
              a
            );
          }
          return (
            je(t, e),
            He(t, [
              {
                key: "updateDisplay",
                value: function () {
                  var e =
                    (this.getValue() - this.__min) / (this.__max - this.__min);
                  return (
                    (this.__foreground.style.width = 100 * e + "%"),
                    Ye(
                      t.prototype.__proto__ ||
                        Object.getPrototypeOf(t.prototype),
                      "updateDisplay",
                      this
                    ).call(this)
                  );
                },
              },
            ]),
            t
          );
        })(at),
        lt = (function (e) {
          function t(e, n, r) {
            ke(this, t);
            var o = We(
                this,
                (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n)
              ),
              i = o;
            return (
              (o.__button = document.createElement("div")),
              (o.__button.innerHTML = void 0 === r ? "Fire" : r),
              tt.bind(o.__button, "click", function (e) {
                return e.preventDefault(), i.fire(), !1;
              }),
              tt.addClass(o.__button, "button"),
              o.domElement.appendChild(o.__button),
              o
            );
          }
          return (
            je(t, e),
            He(t, [
              {
                key: "fire",
                value: function () {
                  this.__onChange && this.__onChange.call(this),
                    this.getValue().call(this.object),
                    this.__onFinishChange &&
                      this.__onFinishChange.call(this, this.getValue());
                },
              },
            ]),
            t
          );
        })(Qe),
        ht = (function (e) {
          function t(e, n) {
            ke(this, t);
            var r = We(
              this,
              (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n)
            );
            (r.__color = new qe(r.getValue())), (r.__temp = new qe(0));
            var o = r;
            (r.domElement = document.createElement("div")),
              tt.makeSelectable(r.domElement, !1),
              (r.__selector = document.createElement("div")),
              (r.__selector.className = "selector"),
              (r.__saturation_field = document.createElement("div")),
              (r.__saturation_field.className = "saturation-field"),
              (r.__field_knob = document.createElement("div")),
              (r.__field_knob.className = "field-knob"),
              (r.__field_knob_border = "2px solid "),
              (r.__hue_knob = document.createElement("div")),
              (r.__hue_knob.className = "hue-knob"),
              (r.__hue_field = document.createElement("div")),
              (r.__hue_field.className = "hue-field"),
              (r.__input = document.createElement("input")),
              (r.__input.type = "text"),
              (r.__input_textShadow = "0 1px 1px "),
              tt.bind(r.__input, "keydown", function (e) {
                13 === e.keyCode && h.call(this);
              }),
              tt.bind(r.__input, "blur", h),
              tt.bind(r.__selector, "mousedown", function () {
                tt.addClass(this, "drag").bind(window, "mouseup", function () {
                  tt.removeClass(o.__selector, "drag");
                });
              }),
              tt.bind(r.__selector, "touchstart", function () {
                tt.addClass(this, "drag").bind(window, "touchend", function () {
                  tt.removeClass(o.__selector, "drag");
                });
              });
            var i,
              a = document.createElement("div");
            function s(e) {
              _(e),
                tt.bind(window, "mousemove", _),
                tt.bind(window, "touchmove", _),
                tt.bind(window, "mouseup", u),
                tt.bind(window, "touchend", u);
            }
            function c(e) {
              f(e),
                tt.bind(window, "mousemove", f),
                tt.bind(window, "touchmove", f),
                tt.bind(window, "mouseup", l),
                tt.bind(window, "touchend", l);
            }
            function u() {
              tt.unbind(window, "mousemove", _),
                tt.unbind(window, "touchmove", _),
                tt.unbind(window, "mouseup", u),
                tt.unbind(window, "touchend", u),
                d();
            }
            function l() {
              tt.unbind(window, "mousemove", f),
                tt.unbind(window, "touchmove", f),
                tt.unbind(window, "mouseup", l),
                tt.unbind(window, "touchend", l),
                d();
            }
            function h() {
              var e = ze(this.value);
              !1 !== e
                ? ((o.__color.__state = e), o.setValue(o.__color.toOriginal()))
                : (this.value = o.__color.toString());
            }
            function d() {
              o.__onFinishChange &&
                o.__onFinishChange.call(o, o.__color.toOriginal());
            }
            function _(e) {
              -1 === e.type.indexOf("touch") && e.preventDefault();
              var t = o.__saturation_field.getBoundingClientRect(),
                n = (e.touches && e.touches[0]) || e,
                r = n.clientX,
                i = n.clientY,
                a = (r - t.left) / (t.right - t.left),
                s = 1 - (i - t.top) / (t.bottom - t.top);
              return (
                s > 1 ? (s = 1) : s < 0 && (s = 0),
                a > 1 ? (a = 1) : a < 0 && (a = 0),
                (o.__color.v = s),
                (o.__color.s = a),
                o.setValue(o.__color.toOriginal()),
                !1
              );
            }
            function f(e) {
              -1 === e.type.indexOf("touch") && e.preventDefault();
              var t = o.__hue_field.getBoundingClientRect(),
                n =
                  1 -
                  (((e.touches && e.touches[0]) || e).clientY - t.top) /
                    (t.bottom - t.top);
              return (
                n > 1 ? (n = 1) : n < 0 && (n = 0),
                (o.__color.h = 360 * n),
                o.setValue(o.__color.toOriginal()),
                !1
              );
            }
            return (
              Fe.extend(r.__selector.style, {
                width: "122px",
                height: "102px",
                padding: "3px",
                backgroundColor: "#222",
                boxShadow: "0px 1px 3px rgba(0,0,0,0.3)",
              }),
              Fe.extend(r.__field_knob.style, {
                position: "absolute",
                width: "12px",
                height: "12px",
                border:
                  r.__field_knob_border + (r.__color.v < 0.5 ? "#fff" : "#000"),
                boxShadow: "0px 1px 3px rgba(0,0,0,0.5)",
                borderRadius: "12px",
                zIndex: 1,
              }),
              Fe.extend(r.__hue_knob.style, {
                position: "absolute",
                width: "15px",
                height: "2px",
                borderRight: "4px solid #fff",
                zIndex: 1,
              }),
              Fe.extend(r.__saturation_field.style, {
                width: "100px",
                height: "100px",
                border: "1px solid #555",
                marginRight: "3px",
                display: "inline-block",
                cursor: "pointer",
              }),
              Fe.extend(a.style, {
                width: "100%",
                height: "100%",
                background: "none",
              }),
              _t(a, "top", "rgba(0,0,0,0)", "#000"),
              Fe.extend(r.__hue_field.style, {
                width: "15px",
                height: "100px",
                border: "1px solid #555",
                cursor: "ns-resize",
                position: "absolute",
                top: "3px",
                right: "3px",
              }),
              ((i = r.__hue_field).style.background = ""),
              (i.style.cssText +=
                "background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);"),
              (i.style.cssText +=
                "background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);"),
              (i.style.cssText +=
                "background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);"),
              (i.style.cssText +=
                "background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);"),
              (i.style.cssText +=
                "background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);"),
              Fe.extend(r.__input.style, {
                outline: "none",
                textAlign: "center",
                color: "#fff",
                border: 0,
                fontWeight: "bold",
                textShadow: r.__input_textShadow + "rgba(0,0,0,0.7)",
              }),
              tt.bind(r.__saturation_field, "mousedown", s),
              tt.bind(r.__saturation_field, "touchstart", s),
              tt.bind(r.__field_knob, "mousedown", s),
              tt.bind(r.__field_knob, "touchstart", s),
              tt.bind(r.__hue_field, "mousedown", c),
              tt.bind(r.__hue_field, "touchstart", c),
              r.__saturation_field.appendChild(a),
              r.__selector.appendChild(r.__field_knob),
              r.__selector.appendChild(r.__saturation_field),
              r.__selector.appendChild(r.__hue_field),
              r.__hue_field.appendChild(r.__hue_knob),
              r.domElement.appendChild(r.__input),
              r.domElement.appendChild(r.__selector),
              r.updateDisplay(),
              r
            );
          }
          return (
            je(t, e),
            He(t, [
              {
                key: "updateDisplay",
                value: function () {
                  var e = ze(this.getValue());
                  if (!1 !== e) {
                    var t = !1;
                    Fe.each(
                      qe.COMPONENTS,
                      function (n) {
                        if (
                          !Fe.isUndefined(e[n]) &&
                          !Fe.isUndefined(this.__color.__state[n]) &&
                          e[n] !== this.__color.__state[n]
                        )
                          return (t = !0), {};
                      },
                      this
                    ),
                      t && Fe.extend(this.__color.__state, e);
                  }
                  Fe.extend(this.__temp.__state, this.__color.__state),
                    (this.__temp.a = 1);
                  var n =
                      this.__color.v < 0.5 || this.__color.s > 0.5 ? 255 : 0,
                    r = 255 - n;
                  Fe.extend(this.__field_knob.style, {
                    marginLeft: 100 * this.__color.s - 7 + "px",
                    marginTop: 100 * (1 - this.__color.v) - 7 + "px",
                    backgroundColor: this.__temp.toHexString(),
                    border:
                      this.__field_knob_border +
                      "rgb(" +
                      n +
                      "," +
                      n +
                      "," +
                      n +
                      ")",
                  }),
                    (this.__hue_knob.style.marginTop =
                      100 * (1 - this.__color.h / 360) + "px"),
                    (this.__temp.s = 1),
                    (this.__temp.v = 1),
                    _t(
                      this.__saturation_field,
                      "left",
                      "#fff",
                      this.__temp.toHexString()
                    ),
                    (this.__input.value = this.__color.toString()),
                    Fe.extend(this.__input.style, {
                      backgroundColor: this.__color.toHexString(),
                      color: "rgb(" + n + "," + n + "," + n + ")",
                      textShadow:
                        this.__input_textShadow +
                        "rgba(" +
                        r +
                        "," +
                        r +
                        "," +
                        r +
                        ",.7)",
                    });
                },
              },
            ]),
            t
          );
        })(Qe),
        dt = ["-moz-", "-o-", "-webkit-", "-ms-", ""];
      function _t(e, t, n, r) {
        (e.style.background = ""),
          Fe.each(dt, function (o) {
            e.style.cssText +=
              "background: " +
              o +
              "linear-gradient(" +
              t +
              ", " +
              n +
              " 0%, " +
              r +
              " 100%); ";
          });
      }
      var ft = function (e, t) {
          var n = e[t];
          return Fe.isArray(arguments[2]) || Fe.isObject(arguments[2])
            ? new rt(e, t, arguments[2])
            : Fe.isNumber(n)
            ? Fe.isNumber(arguments[2]) && Fe.isNumber(arguments[3])
              ? Fe.isNumber(arguments[4])
                ? new ut(e, t, arguments[2], arguments[3], arguments[4])
                : new ut(e, t, arguments[2], arguments[3])
              : Fe.isNumber(arguments[4])
              ? new st(e, t, {
                  min: arguments[2],
                  max: arguments[3],
                  step: arguments[4],
                })
              : new st(e, t, { min: arguments[2], max: arguments[3] })
            : Fe.isString(n)
            ? new ot(e, t)
            : Fe.isFunction(n)
            ? new lt(e, t, "")
            : Fe.isBoolean(n)
            ? new nt(e, t)
            : null;
        },
        pt =
          window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function (e) {
            setTimeout(e, 1e3 / 60);
          },
        mt = (function () {
          function e() {
            ke(this, e),
              (this.backgroundElement = document.createElement("div")),
              Fe.extend(this.backgroundElement.style, {
                backgroundColor: "rgba(0,0,0,0.8)",
                top: 0,
                left: 0,
                display: "none",
                zIndex: "1000",
                opacity: 0,
                WebkitTransition: "opacity 0.2s linear",
                transition: "opacity 0.2s linear",
              }),
              tt.makeFullscreen(this.backgroundElement),
              (this.backgroundElement.style.position = "fixed"),
              (this.domElement = document.createElement("div")),
              Fe.extend(this.domElement.style, {
                position: "fixed",
                display: "none",
                zIndex: "1001",
                opacity: 0,
                WebkitTransition:
                  "-webkit-transform 0.2s ease-out, opacity 0.2s linear",
                transition: "transform 0.2s ease-out, opacity 0.2s linear",
              }),
              document.body.appendChild(this.backgroundElement),
              document.body.appendChild(this.domElement);
            var t = this;
            tt.bind(this.backgroundElement, "click", function () {
              t.hide();
            });
          }
          return (
            He(e, [
              {
                key: "show",
                value: function () {
                  var e = this;
                  (this.backgroundElement.style.display = "block"),
                    (this.domElement.style.display = "block"),
                    (this.domElement.style.opacity = 0),
                    (this.domElement.style.webkitTransform = "scale(1.1)"),
                    this.layout(),
                    Fe.defer(function () {
                      (e.backgroundElement.style.opacity = 1),
                        (e.domElement.style.opacity = 1),
                        (e.domElement.style.webkitTransform = "scale(1)");
                    });
                },
              },
              {
                key: "hide",
                value: function () {
                  var e = this,
                    t = function t() {
                      (e.domElement.style.display = "none"),
                        (e.backgroundElement.style.display = "none"),
                        tt.unbind(e.domElement, "webkitTransitionEnd", t),
                        tt.unbind(e.domElement, "transitionend", t),
                        tt.unbind(e.domElement, "oTransitionEnd", t);
                    };
                  tt.bind(this.domElement, "webkitTransitionEnd", t),
                    tt.bind(this.domElement, "transitionend", t),
                    tt.bind(this.domElement, "oTransitionEnd", t),
                    (this.backgroundElement.style.opacity = 0),
                    (this.domElement.style.opacity = 0),
                    (this.domElement.style.webkitTransform = "scale(1.1)");
                },
              },
              {
                key: "layout",
                value: function () {
                  (this.domElement.style.left =
                    window.innerWidth / 2 -
                    tt.getWidth(this.domElement) / 2 +
                    "px"),
                    (this.domElement.style.top =
                      window.innerHeight / 2 -
                      tt.getHeight(this.domElement) / 2 +
                      "px");
                },
              },
            ]),
            e
          );
        })();
      !(function (e, t) {
        var n = t || document,
          r = document.createElement("style");
        (r.type = "text/css"), (r.innerHTML = e);
        var o = n.getElementsByTagName("head")[0];
        try {
          o.appendChild(r);
        } catch (e) {}
      })(
        (function (e) {
          if (e && "undefined" != typeof window) {
            var t = document.createElement("style");
            return (
              t.setAttribute("type", "text/css"),
              (t.innerHTML = e),
              document.head.appendChild(t),
              e
            );
          }
        })(
          ".dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear;border:0;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button.close-top{position:relative}.dg.main .close-button.close-bottom{position:absolute}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-y:visible}.dg.a.has-save>ul.close-top{margin-top:0}.dg.a.has-save>ul.close-bottom{margin-top:27px}.dg.a.has-save>ul.closed{margin-top:0}.dg.a .save-row{top:0;z-index:1002}.dg.a .save-row.close-top{position:relative}.dg.a .save-row.close-bottom{position:fixed}.dg li{-webkit-transition:height .1s ease-out;-o-transition:height .1s ease-out;-moz-transition:height .1s ease-out;transition:height .1s ease-out;-webkit-transition:overflow .1s linear;-o-transition:overflow .1s linear;-moz-transition:overflow .1s linear;transition:overflow .1s linear}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li>*{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px;overflow:hidden}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .cr.function .property-name{width:100%}.dg .c{float:left;width:60%;position:relative}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:7px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .cr.color{overflow:visible}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.color{border-left:3px solid}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2FA1D6}.dg .cr.number input[type=text]{color:#2FA1D6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2FA1D6;max-width:100%}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}\n"
        )
      );
      var Et = "Default",
        vt = (function () {
          try {
            return !!window.localStorage;
          } catch (e) {
            return !1;
          }
        })(),
        gt = void 0,
        xt = !0,
        Tt = void 0,
        bt = !1,
        At = [],
        yt = function e(t) {
          var n = this,
            r = t || {};
          (this.domElement = document.createElement("div")),
            (this.__ul = document.createElement("ul")),
            this.domElement.appendChild(this.__ul),
            tt.addClass(this.domElement, "dg"),
            (this.__folders = {}),
            (this.__controllers = []),
            (this.__rememberedObjects = []),
            (this.__rememberedObjectIndecesToControllers = []),
            (this.__listening = []),
            (r = Fe.defaults(r, {
              closeOnTop: !1,
              autoPlace: !0,
              width: e.DEFAULT_WIDTH,
            })),
            (r = Fe.defaults(r, {
              resizable: r.autoPlace,
              hideable: r.autoPlace,
            })),
            Fe.isUndefined(r.load)
              ? (r.load = { preset: Et })
              : r.preset && (r.load.preset = r.preset),
            Fe.isUndefined(r.parent) && r.hideable && At.push(this),
            (r.resizable = Fe.isUndefined(r.parent) && r.resizable),
            r.autoPlace && Fe.isUndefined(r.scrollable) && (r.scrollable = !0);
          var o,
            i = vt && "true" === localStorage.getItem(Lt(0, "isLocal")),
            a = void 0,
            s = void 0;
          if (
            (Object.defineProperties(this, {
              parent: {
                get: function () {
                  return r.parent;
                },
              },
              scrollable: {
                get: function () {
                  return r.scrollable;
                },
              },
              autoPlace: {
                get: function () {
                  return r.autoPlace;
                },
              },
              closeOnTop: {
                get: function () {
                  return r.closeOnTop;
                },
              },
              preset: {
                get: function () {
                  return n.parent ? n.getRoot().preset : r.load.preset;
                },
                set: function (e) {
                  n.parent ? (n.getRoot().preset = e) : (r.load.preset = e),
                    (function (e) {
                      for (var t = 0; t < e.__preset_select.length; t++)
                        e.__preset_select[t].value === e.preset &&
                          (e.__preset_select.selectedIndex = t);
                    })(this),
                    n.revert();
                },
              },
              width: {
                get: function () {
                  return r.width;
                },
                set: function (e) {
                  (r.width = e), Pt(n, e);
                },
              },
              name: {
                get: function () {
                  return r.name;
                },
                set: function (e) {
                  (r.name = e), s && (s.innerHTML = r.name);
                },
              },
              closed: {
                get: function () {
                  return r.closed;
                },
                set: function (t) {
                  (r.closed = t),
                    r.closed
                      ? tt.addClass(n.__ul, e.CLASS_CLOSED)
                      : tt.removeClass(n.__ul, e.CLASS_CLOSED),
                    this.onResize(),
                    n.__closeButton &&
                      (n.__closeButton.innerHTML = t
                        ? e.TEXT_OPEN
                        : e.TEXT_CLOSED);
                },
              },
              load: {
                get: function () {
                  return r.load;
                },
              },
              useLocalStorage: {
                get: function () {
                  return i;
                },
                set: function (e) {
                  vt &&
                    ((i = e),
                    e
                      ? tt.bind(window, "unload", a)
                      : tt.unbind(window, "unload", a),
                    localStorage.setItem(Lt(0, "isLocal"), e));
                },
              },
            }),
            Fe.isUndefined(r.parent))
          ) {
            if (
              ((this.closed = r.closed || !1),
              tt.addClass(this.domElement, e.CLASS_MAIN),
              tt.makeSelectable(this.domElement, !1),
              vt && i)
            ) {
              n.useLocalStorage = !0;
              var c = localStorage.getItem(Lt(0, "gui"));
              c && (r.load = JSON.parse(c));
            }
            (this.__closeButton = document.createElement("div")),
              (this.__closeButton.innerHTML = e.TEXT_CLOSED),
              tt.addClass(this.__closeButton, e.CLASS_CLOSE_BUTTON),
              r.closeOnTop
                ? (tt.addClass(this.__closeButton, e.CLASS_CLOSE_TOP),
                  this.domElement.insertBefore(
                    this.__closeButton,
                    this.domElement.childNodes[0]
                  ))
                : (tt.addClass(this.__closeButton, e.CLASS_CLOSE_BOTTOM),
                  this.domElement.appendChild(this.__closeButton)),
              tt.bind(this.__closeButton, "click", function () {
                n.closed = !n.closed;
              });
          } else {
            void 0 === r.closed && (r.closed = !0);
            var u = document.createTextNode(r.name);
            tt.addClass(u, "controller-name"),
              (s = Rt(n, u)),
              tt.addClass(this.__ul, e.CLASS_CLOSED),
              tt.addClass(s, "title"),
              tt.bind(s, "click", function (e) {
                return e.preventDefault(), (n.closed = !n.closed), !1;
              }),
              r.closed || (this.closed = !1);
          }
          r.autoPlace &&
            (Fe.isUndefined(r.parent) &&
              (xt &&
                ((Tt = document.createElement("div")),
                tt.addClass(Tt, "dg"),
                tt.addClass(Tt, e.CLASS_AUTO_PLACE_CONTAINER),
                document.body.appendChild(Tt),
                (xt = !1)),
              Tt.appendChild(this.domElement),
              tt.addClass(this.domElement, e.CLASS_AUTO_PLACE)),
            this.parent || Pt(n, r.width)),
            (this.__resizeHandler = function () {
              n.onResizeDebounced();
            }),
            tt.bind(window, "resize", this.__resizeHandler),
            tt.bind(this.__ul, "webkitTransitionEnd", this.__resizeHandler),
            tt.bind(this.__ul, "transitionend", this.__resizeHandler),
            tt.bind(this.__ul, "oTransitionEnd", this.__resizeHandler),
            this.onResize(),
            r.resizable && Ot(this),
            (a = function () {
              vt &&
                "true" === localStorage.getItem(Lt(0, "isLocal")) &&
                localStorage.setItem(
                  Lt(0, "gui"),
                  JSON.stringify(n.getSaveObject())
                );
            }),
            (this.saveToLocalStorageIfPossible = a),
            r.parent ||
              (((o = n.getRoot()).width += 1),
              Fe.defer(function () {
                o.width -= 1;
              }));
        };
      function Rt(e, t, n) {
        var r = document.createElement("li");
        return (
          t && r.appendChild(t),
          n ? e.__ul.insertBefore(r, n) : e.__ul.appendChild(r),
          e.onResize(),
          r
        );
      }
      function Mt(e) {
        tt.unbind(window, "resize", e.__resizeHandler),
          e.saveToLocalStorageIfPossible &&
            tt.unbind(window, "unload", e.saveToLocalStorageIfPossible);
      }
      function St(e, t) {
        var n = e.__preset_select[e.__preset_select.selectedIndex];
        n.innerHTML = t ? n.value + "*" : n.value;
      }
      function Ct(e, t) {
        var n = e.getRoot(),
          r = n.__rememberedObjects.indexOf(t.object);
        if (-1 !== r) {
          var o = n.__rememberedObjectIndecesToControllers[r];
          if (
            (void 0 === o &&
              ((o = {}), (n.__rememberedObjectIndecesToControllers[r] = o)),
            (o[t.property] = t),
            n.load && n.load.remembered)
          ) {
            var i = n.load.remembered,
              a = void 0;
            if (i[e.preset]) a = i[e.preset];
            else {
              if (!i[Et]) return;
              a = i[Et];
            }
            if (a[r] && void 0 !== a[r][t.property]) {
              var s = a[r][t.property];
              (t.initialValue = s), t.setValue(s);
            }
          }
        }
      }
      function wt(e, t, n, r) {
        if (void 0 === t[n])
          throw new Error('Object "' + t + '" has no property "' + n + '"');
        var o = void 0;
        if (r.color) o = new ht(t, n);
        else {
          var i = [t, n].concat(r.factoryArgs);
          o = ft.apply(e, i);
        }
        r.before instanceof Qe && (r.before = r.before.__li),
          Ct(e, o),
          tt.addClass(o.domElement, "c");
        var a = document.createElement("span");
        tt.addClass(a, "property-name"), (a.innerHTML = o.property);
        var s = document.createElement("div");
        s.appendChild(a), s.appendChild(o.domElement);
        var c = Rt(e, s, r.before);
        return (
          tt.addClass(c, yt.CLASS_CONTROLLER_ROW),
          o instanceof ht
            ? tt.addClass(c, "color")
            : tt.addClass(c, Xe(o.getValue())),
          (function (e, t, n) {
            if (
              ((n.__li = t),
              (n.__gui = e),
              Fe.extend(n, {
                options: function (t) {
                  if (arguments.length > 1) {
                    var r = n.__li.nextElementSibling;
                    return (
                      n.remove(),
                      wt(e, n.object, n.property, {
                        before: r,
                        factoryArgs: [Fe.toArray(arguments)],
                      })
                    );
                  }
                  if (Fe.isArray(t) || Fe.isObject(t)) {
                    var o = n.__li.nextElementSibling;
                    return (
                      n.remove(),
                      wt(e, n.object, n.property, {
                        before: o,
                        factoryArgs: [t],
                      })
                    );
                  }
                },
                name: function (e) {
                  return (
                    (n.__li.firstElementChild.firstElementChild.innerHTML = e),
                    n
                  );
                },
                listen: function () {
                  return n.__gui.listen(n), n;
                },
                remove: function () {
                  return n.__gui.remove(n), n;
                },
              }),
              n instanceof ut)
            ) {
              var r = new st(n.object, n.property, {
                min: n.__min,
                max: n.__max,
                step: n.__step,
              });
              Fe.each(
                [
                  "updateDisplay",
                  "onChange",
                  "onFinishChange",
                  "step",
                  "min",
                  "max",
                ],
                function (e) {
                  var t = n[e],
                    o = r[e];
                  n[e] = r[e] = function () {
                    var e = Array.prototype.slice.call(arguments);
                    return o.apply(r, e), t.apply(n, e);
                  };
                }
              ),
                tt.addClass(t, "has-slider"),
                n.domElement.insertBefore(
                  r.domElement,
                  n.domElement.firstElementChild
                );
            } else if (n instanceof st) {
              var o = function (t) {
                if (Fe.isNumber(n.__min) && Fe.isNumber(n.__max)) {
                  var r = n.__li.firstElementChild.firstElementChild.innerHTML,
                    o = n.__gui.__listening.indexOf(n) > -1;
                  n.remove();
                  var i = wt(e, n.object, n.property, {
                    before: n.__li.nextElementSibling,
                    factoryArgs: [n.__min, n.__max, n.__step],
                  });
                  return i.name(r), o && i.listen(), i;
                }
                return t;
              };
              (n.min = Fe.compose(o, n.min)), (n.max = Fe.compose(o, n.max));
            } else
              n instanceof nt
                ? (tt.bind(t, "click", function () {
                    tt.fakeEvent(n.__checkbox, "click");
                  }),
                  tt.bind(n.__checkbox, "click", function (e) {
                    e.stopPropagation();
                  }))
                : n instanceof lt
                ? (tt.bind(t, "click", function () {
                    tt.fakeEvent(n.__button, "click");
                  }),
                  tt.bind(t, "mouseover", function () {
                    tt.addClass(n.__button, "hover");
                  }),
                  tt.bind(t, "mouseout", function () {
                    tt.removeClass(n.__button, "hover");
                  }))
                : n instanceof ht &&
                  (tt.addClass(t, "color"),
                  (n.updateDisplay = Fe.compose(function (e) {
                    return (t.style.borderLeftColor = n.__color.toString()), e;
                  }, n.updateDisplay)),
                  n.updateDisplay());
            n.setValue = Fe.compose(function (t) {
              return (
                e.getRoot().__preset_select &&
                  n.isModified() &&
                  St(e.getRoot(), !0),
                t
              );
            }, n.setValue);
          })(e, c, o),
          e.__controllers.push(o),
          o
        );
      }
      function Lt(e, t) {
        return document.location.href + "." + t;
      }
      function Nt(e, t, n) {
        var r = document.createElement("option");
        (r.innerHTML = t),
          (r.value = t),
          e.__preset_select.appendChild(r),
          n && (e.__preset_select.selectedIndex = e.__preset_select.length - 1);
      }
      function It(e, t) {
        t.style.display = e.useLocalStorage ? "block" : "none";
      }
      function Ot(e) {
        var t = void 0;
        function n(n) {
          return (
            n.preventDefault(),
            (e.width += t - n.clientX),
            e.onResize(),
            (t = n.clientX),
            !1
          );
        }
        function r() {
          tt.removeClass(e.__closeButton, yt.CLASS_DRAG),
            tt.unbind(window, "mousemove", n),
            tt.unbind(window, "mouseup", r);
        }
        function o(o) {
          return (
            o.preventDefault(),
            (t = o.clientX),
            tt.addClass(e.__closeButton, yt.CLASS_DRAG),
            tt.bind(window, "mousemove", n),
            tt.bind(window, "mouseup", r),
            !1
          );
        }
        (e.__resize_handle = document.createElement("div")),
          Fe.extend(e.__resize_handle.style, {
            width: "6px",
            marginLeft: "-3px",
            height: "200px",
            cursor: "ew-resize",
            position: "absolute",
          }),
          tt.bind(e.__resize_handle, "mousedown", o),
          tt.bind(e.__closeButton, "mousedown", o),
          e.domElement.insertBefore(
            e.__resize_handle,
            e.domElement.firstElementChild
          );
      }
      function Pt(e, t) {
        (e.domElement.style.width = t + "px"),
          e.__save_row && e.autoPlace && (e.__save_row.style.width = t + "px"),
          e.__closeButton && (e.__closeButton.style.width = t + "px");
      }
      function Ft(e, t) {
        var n = {};
        return (
          Fe.each(e.__rememberedObjects, function (r, o) {
            var i = {},
              a = e.__rememberedObjectIndecesToControllers[o];
            Fe.each(a, function (e, n) {
              i[n] = t ? e.initialValue : e.getValue();
            }),
              (n[o] = i);
          }),
          n
        );
      }
      function Ut(e) {
        0 !== e.length &&
          pt.call(window, function () {
            Ut(e);
          }),
          Fe.each(e, function (e) {
            e.updateDisplay();
          });
      }
      (yt.toggleHide = function () {
        (bt = !bt),
          Fe.each(At, function (e) {
            e.domElement.style.display = bt ? "none" : "";
          });
      }),
        (yt.CLASS_AUTO_PLACE = "a"),
        (yt.CLASS_AUTO_PLACE_CONTAINER = "ac"),
        (yt.CLASS_MAIN = "main"),
        (yt.CLASS_CONTROLLER_ROW = "cr"),
        (yt.CLASS_TOO_TALL = "taller-than-window"),
        (yt.CLASS_CLOSED = "closed"),
        (yt.CLASS_CLOSE_BUTTON = "close-button"),
        (yt.CLASS_CLOSE_TOP = "close-top"),
        (yt.CLASS_CLOSE_BOTTOM = "close-bottom"),
        (yt.CLASS_DRAG = "drag"),
        (yt.DEFAULT_WIDTH = 245),
        (yt.TEXT_CLOSED = "Close Controls"),
        (yt.TEXT_OPEN = "Open Controls"),
        (yt._keydownHandler = function (e) {
          "text" === document.activeElement.type ||
            (72 !== e.which && 72 !== e.keyCode) ||
            yt.toggleHide();
        }),
        tt.bind(window, "keydown", yt._keydownHandler, !1),
        Fe.extend(yt.prototype, {
          add: function (e, t) {
            return wt(this, e, t, {
              factoryArgs: Array.prototype.slice.call(arguments, 2),
            });
          },
          addColor: function (e, t) {
            return wt(this, e, t, { color: !0 });
          },
          remove: function (e) {
            this.__ul.removeChild(e.__li),
              this.__controllers.splice(this.__controllers.indexOf(e), 1);
            var t = this;
            Fe.defer(function () {
              t.onResize();
            });
          },
          destroy: function () {
            if (this.parent)
              throw new Error(
                "Only the root GUI should be removed with .destroy(). For subfolders, use gui.removeFolder(folder) instead."
              );
            this.autoPlace && Tt.removeChild(this.domElement);
            var e = this;
            Fe.each(this.__folders, function (t) {
              e.removeFolder(t);
            }),
              tt.unbind(window, "keydown", yt._keydownHandler, !1),
              Mt(this);
          },
          addFolder: function (e) {
            if (void 0 !== this.__folders[e])
              throw new Error(
                'You already have a folder in this GUI by the name "' + e + '"'
              );
            var t = { name: e, parent: this };
            (t.autoPlace = this.autoPlace),
              this.load &&
                this.load.folders &&
                this.load.folders[e] &&
                ((t.closed = this.load.folders[e].closed),
                (t.load = this.load.folders[e]));
            var n = new yt(t);
            this.__folders[e] = n;
            var r = Rt(this, n.domElement);
            return tt.addClass(r, "folder"), n;
          },
          removeFolder: function (e) {
            this.__ul.removeChild(e.domElement.parentElement),
              delete this.__folders[e.name],
              this.load &&
                this.load.folders &&
                this.load.folders[e.name] &&
                delete this.load.folders[e.name],
              Mt(e);
            var t = this;
            Fe.each(e.__folders, function (t) {
              e.removeFolder(t);
            }),
              Fe.defer(function () {
                t.onResize();
              });
          },
          open: function () {
            this.closed = !1;
          },
          close: function () {
            this.closed = !0;
          },
          hide: function () {
            this.domElement.style.display = "none";
          },
          show: function () {
            this.domElement.style.display = "";
          },
          onResize: function () {
            var e = this.getRoot();
            if (e.scrollable) {
              var t = tt.getOffset(e.__ul).top,
                n = 0;
              Fe.each(e.__ul.childNodes, function (t) {
                (e.autoPlace && t === e.__save_row) || (n += tt.getHeight(t));
              }),
                window.innerHeight - t - 20 < n
                  ? (tt.addClass(e.domElement, yt.CLASS_TOO_TALL),
                    (e.__ul.style.height = window.innerHeight - t - 20 + "px"))
                  : (tt.removeClass(e.domElement, yt.CLASS_TOO_TALL),
                    (e.__ul.style.height = "auto"));
            }
            e.__resize_handle &&
              Fe.defer(function () {
                e.__resize_handle.style.height = e.__ul.offsetHeight + "px";
              }),
              e.__closeButton && (e.__closeButton.style.width = e.width + "px");
          },
          onResizeDebounced: Fe.debounce(function () {
            this.onResize();
          }, 50),
          remember: function () {
            if (
              (Fe.isUndefined(gt) &&
                ((gt = new mt()).domElement.innerHTML =
                  '<div id="dg-save" class="dg dialogue">\n\n  Here\'s the new load parameter for your <code>GUI</code>\'s constructor:\n\n  <textarea id="dg-new-constructor"></textarea>\n\n  <div id="dg-save-locally">\n\n    <input id="dg-local-storage" type="checkbox"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id="dg-local-explain">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>\'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n\n    </div>\n\n  </div>\n\n</div>'),
              this.parent)
            )
              throw new Error("You can only call remember on a top level GUI.");
            var e = this;
            Fe.each(Array.prototype.slice.call(arguments), function (t) {
              0 === e.__rememberedObjects.length &&
                (function (e) {
                  var t = (e.__save_row = document.createElement("li"));
                  tt.addClass(e.domElement, "has-save"),
                    e.__ul.insertBefore(t, e.__ul.firstChild),
                    tt.addClass(t, "save-row");
                  var n = document.createElement("span");
                  (n.innerHTML = "&nbsp;"), tt.addClass(n, "button gears");
                  var r = document.createElement("span");
                  (r.innerHTML = "Save"),
                    tt.addClass(r, "button"),
                    tt.addClass(r, "save");
                  var o = document.createElement("span");
                  (o.innerHTML = "New"),
                    tt.addClass(o, "button"),
                    tt.addClass(o, "save-as");
                  var i = document.createElement("span");
                  (i.innerHTML = "Revert"),
                    tt.addClass(i, "button"),
                    tt.addClass(i, "revert");
                  var a = (e.__preset_select =
                    document.createElement("select"));
                  if (
                    (e.load && e.load.remembered
                      ? Fe.each(e.load.remembered, function (t, n) {
                          Nt(e, n, n === e.preset);
                        })
                      : Nt(e, Et, !1),
                    tt.bind(a, "change", function () {
                      for (var t = 0; t < e.__preset_select.length; t++)
                        e.__preset_select[t].innerHTML =
                          e.__preset_select[t].value;
                      e.preset = this.value;
                    }),
                    t.appendChild(a),
                    t.appendChild(n),
                    t.appendChild(r),
                    t.appendChild(o),
                    t.appendChild(i),
                    vt)
                  ) {
                    var s = document.getElementById("dg-local-explain"),
                      c = document.getElementById("dg-local-storage");
                    (document.getElementById("dg-save-locally").style.display =
                      "block"),
                      "true" === localStorage.getItem(Lt(0, "isLocal")) &&
                        c.setAttribute("checked", "checked"),
                      It(e, s),
                      tt.bind(c, "change", function () {
                        (e.useLocalStorage = !e.useLocalStorage), It(e, s);
                      });
                  }
                  var u = document.getElementById("dg-new-constructor");
                  tt.bind(u, "keydown", function (e) {
                    !e.metaKey ||
                      (67 !== e.which && 67 !== e.keyCode) ||
                      gt.hide();
                  }),
                    tt.bind(n, "click", function () {
                      (u.innerHTML = JSON.stringify(
                        e.getSaveObject(),
                        void 0,
                        2
                      )),
                        gt.show(),
                        u.focus(),
                        u.select();
                    }),
                    tt.bind(r, "click", function () {
                      e.save();
                    }),
                    tt.bind(o, "click", function () {
                      var t = prompt("Enter a new preset name.");
                      t && e.saveAs(t);
                    }),
                    tt.bind(i, "click", function () {
                      e.revert();
                    });
                })(e),
                -1 === e.__rememberedObjects.indexOf(t) &&
                  e.__rememberedObjects.push(t);
            }),
              this.autoPlace && Pt(this, this.width);
          },
          getRoot: function () {
            for (var e = this; e.parent; ) e = e.parent;
            return e;
          },
          getSaveObject: function () {
            var e = this.load;
            return (
              (e.closed = this.closed),
              this.__rememberedObjects.length > 0 &&
                ((e.preset = this.preset),
                e.remembered || (e.remembered = {}),
                (e.remembered[this.preset] = Ft(this))),
              (e.folders = {}),
              Fe.each(this.__folders, function (t, n) {
                e.folders[n] = t.getSaveObject();
              }),
              e
            );
          },
          save: function () {
            this.load.remembered || (this.load.remembered = {}),
              (this.load.remembered[this.preset] = Ft(this)),
              St(this, !1),
              this.saveToLocalStorageIfPossible();
          },
          saveAs: function (e) {
            this.load.remembered ||
              ((this.load.remembered = {}),
              (this.load.remembered[Et] = Ft(this, !0))),
              (this.load.remembered[e] = Ft(this)),
              (this.preset = e),
              Nt(this, e, !0),
              this.saveToLocalStorageIfPossible();
          },
          revert: function (e) {
            Fe.each(
              this.__controllers,
              function (t) {
                this.getRoot().load.remembered
                  ? Ct(e || this.getRoot(), t)
                  : t.setValue(t.initialValue),
                  t.__onFinishChange &&
                    t.__onFinishChange.call(t, t.getValue());
              },
              this
            ),
              Fe.each(this.__folders, function (e) {
                e.revert(e);
              }),
              e || St(this.getRoot(), !1);
          },
          listen: function (e) {
            var t = 0 === this.__listening.length;
            this.__listening.push(e), t && Ut(this.__listening);
          },
          updateDisplay: function () {
            Fe.each(this.__controllers, function (e) {
              e.updateDisplay();
            }),
              Fe.each(this.__folders, function (e) {
                e.updateDisplay();
              });
          },
        });
      var Dt = yt;
      const Bt = (e) => {
        const { refresh: t, reload: n } = Me,
          r = {
            save: () => {
              ((e, t = "data", n = !0) => {
                var r = ((e) => {
                    for (var t = [], n = 0; n < e.length; n++)
                      t[n] = e.charCodeAt(n);
                    return new Uint8Array(t);
                  })(n ? JSON.stringify(e, null, 4) : JSON.stringify(e)),
                  o = new Blob([r], { type: "application/octet-stream" }),
                  i = URL.createObjectURL(o),
                  a = document.createElement("a");
                a.setAttribute("href", i),
                  a.setAttribute("download", `${t}.json`);
                var s = document.createEvent("MouseEvents");
                s.initMouseEvent(
                  "click",
                  !0,
                  !0,
                  window,
                  1,
                  0,
                  0,
                  0,
                  0,
                  !1,
                  !1,
                  !1,
                  !1,
                  0,
                  null
                ),
                  a.dispatchEvent(s);
              })(ge, "Settings");
            },
          },
          o = new Dt({ width: 200 });
        window.gui = o;
        const i = o.addFolder("System");
        i.add(ge, "lockCamera").onFinishChange(t),
          i.add(Me, "refresh").name("RESTART"),
          i.add(r, "save").name("Save Settings"),
          i.add(Me, "reset").name("Reset Default"),
          i.open();
        const a = o.addFolder("Basic");
        a.add(ge, "posX", -10, 10, 0.01).onFinishChange(t),
          a.add(ge, "posY", -10, 10, 0.01).onFinishChange(t),
          a.open();
        const s = o.addFolder("Particles");
        s
          .add(
            ge,
            "numParticles",
            [
              128, 256, 300, 400, 500, 600, 650, 700, 750, 800, 850, 900, 950,
              1e3,
            ]
          )
          .onFinishChange(n),
          s.add(ge, "flowSpeed", 0.1, 4, 0.01).onFinishChange(t),
          s.add(ge, "particleSize", 0.1, 10, 0.01).onFinishChange(t),
          s.add(ge, "acc_X", -5, 5, 0.01).onFinishChange(t),
          s.add(ge, "acc_Y", -5, 5, 0.01).onFinishChange(t),
          s.add(ge, "noiseScale", 0.1, 2, 0.01).onFinishChange(t),
          s.add(ge, "noiseStrength", 0, 4, 0.01).onFinishChange(t),
          s.open();
        const c = o.addFolder("Colors");
        c.add(ge, "brightness", 0.1, 5, 0.01).onFinishChange(t),
          c.addColor(ge, "color1").onFinishChange(t),
          c.addColor(ge, "color2").onFinishChange(t),
          c.addColor(ge, "color3").onFinishChange(t),
          c.addColor(ge, "color4").onFinishChange(t),
          c.addColor(ge, "color5").onFinishChange(t),
          c.add(ge, "colorEdge1", 0, 1, 0.01).onFinishChange(t),
          c.add(ge, "colorEdge2", 0, 1, 0.01).onFinishChange(t),
          c.add(ge, "colorEdge3", 0, 1, 0.01).onFinishChange(t),
          c.add(ge, "colorEdge4", 0, 1, 0.01).onFinishChange(t),
          c.open();
      };
      let zt, Gt;
      var Vt;
      ((Vt = ""),
      new Promise((e, t) => {
        const n = document.body.querySelector(".Loading-Bar"),
          r = Se.map(({ id: e, url: t, type: n }) => ({
            id: e,
            url: Vt + t,
            type: n,
          }));
        Se.length > 0
          ? (document.body.classList.add("isLoading"),
            new (we())({ assets: r })
              .on("error", (e) => {
                console.log("Error :", e);
              })
              .on("progress", (e) => {
                n && (n.style.width = 100 * e + "%");
              })
              .on("complete", (t) => {
                n && (n.style.width = "100%"),
                  pe.init(t),
                  setTimeout(() => {
                    document.body.classList.remove("isLoading"), e();
                  }, 500);
              })
              .start())
          : e();
      })).then(
        function () {
          Me.init(),
            (Gt = document.createElement("canvas")),
            (Gt.id = "main-canvas"),
            document.body.appendChild(Gt),
            E.init(Gt, { alpha: !1, preserveDrawingBuffer: !0 }),
            (zt = new xe()),
            Bt();
        },
        (e) => {
          console.error(e);
        }
      );
    })();
})();
