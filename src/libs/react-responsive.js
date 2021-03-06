// https://github.com/contra/react-responsive
/* eslint-disable */
!(function(e, t) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = t(require('react')))
    : 'function' == typeof define && define.amd
      ? define(['react'], t)
      : 'object' == typeof exports
        ? (exports.MediaQuery = t(require('react')))
        : (e.MediaQuery = t(e.react));
})('undefined' != typeof self ? self : this, function(e) {
  return (function(e) {
    function t(r) {
      if (n[r]) return n[r].exports;
      var o = (n[r] = { i: r, l: !1, exports: {} });
      return e[r].call(o.exports, o, o.exports, t), (o.l = !0), o.exports;
    }
    var n = {};
    return (
      (t.m = e),
      (t.c = n),
      (t.d = function(e, n, r) {
        t.o(e, n) ||
          Object.defineProperty(e, n, {
            configurable: !1,
            enumerable: !0,
            get: r,
          });
      }),
      (t.n = function(e) {
        var n =
          e && e.__esModule
            ? function() {
                return e.default;
              }
            : function() {
                return e;
              };
        return t.d(n, 'a', n), n;
      }),
      (t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (t.p = ''),
      t((t.s = 3))
    );
  })([
    function(e, t, n) {
      e.exports = n(5)();
    },
    function(e, t, n) {
      'use strict';
      function r(e) {
        return e in i
          ? i[e]
          : (i[e] = e
              .replace(o, '-$&')
              .toLowerCase()
              .replace(a, '-ms-'));
      }
      var o = /[A-Z]/g,
        a = /^ms-/,
        i = {};
      e.exports = r;
    },
    function(e, t, n) {
      'use strict';
      function r(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {},
            r = Object.keys(n);
          'function' == typeof Object.getOwnPropertySymbols &&
            (r = r.concat(
              Object.getOwnPropertySymbols(n).filter(function(e) {
                return Object.getOwnPropertyDescriptor(n, e).enumerable;
              }),
            )),
            r.forEach(function(t) {
              o(e, t, n[t]);
            });
        }
        return e;
      }
      function o(e, t, n) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = n),
          e
        );
      }
      var a = n(0),
        i = n.n(a),
        c = i.a.oneOfType([i.a.string, i.a.number]),
        s = {
          orientation: i.a.oneOf(['portrait', 'landscape']),
          scan: i.a.oneOf(['progressive', 'interlace']),
          aspectRatio: i.a.string,
          deviceAspectRatio: i.a.string,
          height: c,
          deviceHeight: c,
          width: c,
          deviceWidth: c,
          color: i.a.bool,
          colorIndex: i.a.bool,
          monochrome: i.a.bool,
          resolution: c,
        },
        u = r(
          {
            minAspectRatio: i.a.string,
            maxAspectRatio: i.a.string,
            minDeviceAspectRatio: i.a.string,
            maxDeviceAspectRatio: i.a.string,
            minHeight: c,
            maxHeight: c,
            minDeviceHeight: c,
            maxDeviceHeight: c,
            minWidth: c,
            maxWidth: c,
            minDeviceWidth: c,
            maxDeviceWidth: c,
            minColor: i.a.number,
            maxColor: i.a.number,
            minColorIndex: i.a.number,
            maxColorIndex: i.a.number,
            minMonochrome: i.a.number,
            maxMonochrome: i.a.number,
            minResolution: c,
            maxResolution: c,
          },
          s,
        ),
        f = {
          all: i.a.bool,
          grid: i.a.bool,
          aural: i.a.bool,
          braille: i.a.bool,
          handheld: i.a.bool,
          print: i.a.bool,
          projection: i.a.bool,
          screen: i.a.bool,
          tty: i.a.bool,
          tv: i.a.bool,
          embossed: i.a.bool,
        },
        p = r({}, f, u);
      (s.type = Object.keys(f)),
        (t.a = { all: p, types: f, matchers: s, features: u });
    },
    function(e, t, n) {
      'use strict';
      function r(e) {
        return (r =
          'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
            ? function(e) {
                return typeof e;
              }
            : function(e) {
                return e &&
                  'function' == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? 'symbol'
                  : typeof e;
              })(e);
      }
      function o(e, t) {
        if (!(e instanceof t))
          throw new TypeError('Cannot call a class as a function');
      }
      function a(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            'value' in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r);
        }
      }
      function i(e, t, n) {
        return t && a(e.prototype, t), n && a(e, n), e;
      }
      function c(e, t) {
        return !t || ('object' !== r(t) && 'function' != typeof t) ? p(e) : t;
      }
      function s(e) {
        return (s = Object.setPrototypeOf
          ? Object.getPrototypeOf
          : function(e) {
              return e.__proto__ || Object.getPrototypeOf(e);
            })(e);
      }
      function u(e, t) {
        if ('function' != typeof t && null !== t)
          throw new TypeError(
            'Super expression must either be null or a function',
          );
        (e.prototype = Object.create(t && t.prototype, {
          constructor: { value: e, writable: !0, configurable: !0 },
        })),
          t && f(e, t);
      }
      function f(e, t) {
        return (f =
          Object.setPrototypeOf ||
          function(e, t) {
            return (e.__proto__ = t), e;
          })(e, t);
      }
      function p(e) {
        if (void 0 === e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called",
          );
        return e;
      }
      function l(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {},
            r = Object.keys(n);
          'function' == typeof Object.getOwnPropertySymbols &&
            (r = r.concat(
              Object.getOwnPropertySymbols(n).filter(function(e) {
                return Object.getOwnPropertyDescriptor(n, e).enumerable;
              }),
            )),
            r.forEach(function(t) {
              m(e, t, n[t]);
            });
        }
        return e;
      }
      function m(e, t, n) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = n),
          e
        );
      }
      Object.defineProperty(t, '__esModule', { value: !0 }),
        n.d(t, 'default', function() {
          return C;
        });
      var h = n(4),
        d = n.n(h),
        y = n(0),
        b = n.n(y),
        v = n(7),
        g = n.n(v),
        O = n(1),
        w = n.n(O),
        x = n(2),
        j = n(9);
      n.d(t, 'toQuery', function() {
        return j.a;
      });
      var P = {
          component: b.a.node,
          query: b.a.string,
          values: b.a.shape(x.a.matchers),
          children: b.a.oneOfType([b.a.node, b.a.func]),
          onChange: b.a.func,
        },
        _ = Object.keys(P),
        k = function(e, t) {
          var n = l({}, e);
          return (
            t.forEach(function(e) {
              return delete n[e];
            }),
            n
          );
        },
        q = function(e) {
          var t = e.values,
            n = void 0 === t ? {} : t;
          return Object.keys(n).reduce(function(e, t) {
            return (e[w()(t)] = n[t]), e;
          }, {});
        },
        M = function(e) {
          return e.query || Object(j.a)(k(e, _));
        },
        S = function(e, t) {
          var n = q(e),
            r = 0 === n.length;
          return g()(t, n, r);
        },
        C = (function(e) {
          function t() {
            var e, n;
            o(this, t);
            for (var r = arguments.length, a = new Array(r), i = 0; i < r; i++)
              a[i] = arguments[i];
            return (
              (n = c(this, (e = s(t)).call.apply(e, [this].concat(a)))),
              m(p(p(n)), 'state', { matches: !1, mq: null, query: '' }),
              m(p(p(n)), 'cleanupMediaQuery', function(e) {
                e && (e.removeListener(n.updateMatches), e.dispose());
              }),
              m(p(p(n)), 'updateMatches', function() {
                n._unmounted ||
                  (n.state.mq.matches !== n.state.matches &&
                    n.setState({ matches: n.state.mq.matches }));
              }),
              n
            );
          }
          return (
            u(t, e),
            i(
              t,
              [
                {
                  key: 'componentDidMount',
                  value: function() {
                    this.state.mq.addListener(this.updateMatches),
                      this.updateMatches();
                  },
                },
                {
                  key: 'componentDidUpdate',
                  value: function(e, t) {
                    this.state.mq !== t.mq &&
                      (this.cleanupMediaQuery(t.mq),
                      this.state.mq.addListener(this.updateMatches)),
                      this.props.onChange &&
                        t.matches !== this.state.matches &&
                        this.props.onChange(this.state.matches);
                  },
                },
                {
                  key: 'componentWillUnmount',
                  value: function() {
                    (this._unmounted = !0),
                      this.cleanupMediaQuery(this.state.mq);
                  },
                },
                {
                  key: 'render',
                  value: function() {
                    return 'function' == typeof this.props.children
                      ? this.props.children(this.state.matches)
                      : this.state.matches
                        ? this.props.children
                        : null;
                  },
                },
              ],
              [
                {
                  key: 'getDerivedStateFromProps',
                  value: function(e, t) {
                    var n = M(e);
                    if (!n) throw new Error('Invalid or missing MediaQuery!');
                    if (n === t.query) return null;
                    var r = S(e, n);
                    return { matches: r.matches, mq: r, query: n };
                  },
                },
              ],
            ),
            t
          );
        })(d.a.Component);
      m(C, 'displayName', 'MediaQuery'), m(C, 'defaultProps', { values: {} });
    },
    function(t, n) {
      t.exports = e;
    },
    function(e, t, n) {
      'use strict';
      function r() {}
      var o = n(6);
      e.exports = function() {
        function e(e, t, n, r, a, i) {
          if (i !== o) {
            var c = new Error(
              'Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types',
            );
            throw ((c.name = 'Invariant Violation'), c);
          }
        }
        function t() {
          return e;
        }
        e.isRequired = e;
        var n = {
          array: e,
          bool: e,
          func: e,
          number: e,
          object: e,
          string: e,
          symbol: e,
          any: e,
          arrayOf: t,
          element: e,
          instanceOf: t,
          node: e,
          objectOf: t,
          oneOf: t,
          oneOfType: t,
          shape: t,
          exact: t,
        };
        return (n.checkPropTypes = r), (n.PropTypes = n), n;
      };
    },
    function(e, t, n) {
      'use strict';
      e.exports = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
    },
    function(e, t, n) {
      'use strict';
      function r(e, t, n) {
        function r(e) {
          f && f.addListener(e);
        }
        function o(e) {
          f && f.removeListener(e);
        }
        function c(e) {
          (u.matches = e.matches), (u.media = e.media);
        }
        function s() {
          f && f.removeListener(c);
        }
        var u = this;
        if (i && !n) {
          var f = i.call(window, e);
          (this.matches = f.matches), (this.media = f.media), f.addListener(c);
        } else (this.matches = a(e, t)), (this.media = e);
        (this.addListener = r), (this.removeListener = o), (this.dispose = s);
      }
      function o(e, t, n) {
        return new r(e, t, n);
      }
      var a = n(8).match,
        i = 'undefined' != typeof window ? window.matchMedia : null;
      e.exports = o;
    },
    function(e, t, n) {
      'use strict';
      function r(e, t) {
        return o(e).some(function(e) {
          var n = e.inverse,
            r = 'all' === e.type || t.type === e.type;
          if ((r && n) || (!r && !n)) return !1;
          var o = e.expressions.every(function(e) {
            var n = e.feature,
              r = e.modifier,
              o = e.value,
              s = t[n];
            if (!s) return !1;
            switch (n) {
              case 'orientation':
              case 'scan':
                return s.toLowerCase() === o.toLowerCase();
              case 'width':
              case 'height':
              case 'device-width':
              case 'device-height':
                (o = c(o)), (s = c(s));
                break;
              case 'resolution':
                (o = i(o)), (s = i(s));
                break;
              case 'aspect-ratio':
              case 'device-aspect-ratio':
              case 'device-pixel-ratio':
                (o = a(o)), (s = a(s));
                break;
              case 'grid':
              case 'color':
              case 'color-index':
              case 'monochrome':
                (o = parseInt(o, 10) || 1), (s = parseInt(s, 10) || 0);
            }
            switch (r) {
              case 'min':
                return s >= o;
              case 'max':
                return s <= o;
              default:
                return s === o;
            }
          });
          return (o && !n) || (!o && n);
        });
      }
      function o(e) {
        return e.split(',').map(function(e) {
          e = e.trim();
          var t = e.match(s),
            n = t[1],
            r = t[2],
            o = t[3] || '',
            a = {};
          return (
            (a.inverse = !!n && 'not' === n.toLowerCase()),
            (a.type = r ? r.toLowerCase() : 'all'),
            (o = o.match(/\([^\)]+\)/g) || []),
            (a.expressions = o.map(function(e) {
              var t = e.match(u),
                n = t[1].toLowerCase().match(f);
              return { modifier: n[1], feature: n[2], value: t[2] };
            })),
            a
          );
        });
      }
      function a(e) {
        var t,
          n = Number(e);
        return (
          n || ((t = e.match(/^(\d+)\s*\/\s*(\d+)$/)), (n = t[1] / t[2])), n
        );
      }
      function i(e) {
        var t = parseFloat(e);
        switch (String(e).match(l)[1]) {
          case 'dpcm':
            return t / 2.54;
          case 'dppx':
            return 96 * t;
          default:
            return t;
        }
      }
      function c(e) {
        var t = parseFloat(e);
        switch (String(e).match(p)[1]) {
          case 'em':
          case 'rem':
            return 16 * t;
          case 'cm':
            return 96 * t / 2.54;
          case 'mm':
            return 96 * t / 2.54 / 10;
          case 'in':
            return 96 * t;
          case 'pt':
            return 72 * t;
          case 'pc':
            return 72 * t / 12;
          default:
            return t;
        }
      }
      (t.match = r), (t.parse = o);
      var s = /(?:(only|not)?\s*([^\s\(\)]+)(?:\s*and)?\s*)?(.+)?/i,
        u = /\(\s*([^\s\:\)]+)\s*(?:\:\s*([^\s\)]+))?\s*\)/,
        f = /^(?:(min|max)-)?(.+)/,
        p = /(em|rem|px|cm|mm|in|pt|pc)?$/,
        l = /(dpi|dpcm|dppx)?$/;
    },
    function(e, t, n) {
      'use strict';
      function r(e, t) {
        var n = i()(e);
        return (
          'number' == typeof t && (t = ''.concat(t, 'px')),
          !0 === t ? e : !1 === t ? s(e) : '('.concat(n, ': ').concat(t, ')')
        );
      }
      function o(e) {
        return e.join(' and ');
      }
      var a = n(1),
        i = n.n(a),
        c = n(2),
        s = function(e) {
          return 'not '.concat(e);
        };
      t.a = function(e) {
        var t = [];
        return (
          Object.keys(c.a.all).forEach(function(n) {
            var o = e[n];
            null != o && t.push(r(n, o));
          }),
          o(t)
        );
      };
    },
  ]);
});
/* eslint-enable */
