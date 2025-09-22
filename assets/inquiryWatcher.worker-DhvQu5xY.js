;(function () {
  'use strict'
  const sr = globalThis || void 0 || self
  function ar(t) {
    return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, 'default') ? t.default : t
  }
  var nt = { exports: {} },
    _ = (nt.exports = {}),
    K,
    G
  function ke() {
    throw new Error('setTimeout has not been defined')
  }
  function De() {
    throw new Error('clearTimeout has not been defined')
  }
  ;(function () {
    try {
      typeof setTimeout == 'function' ? (K = setTimeout) : (K = ke)
    } catch {
      K = ke
    }
    try {
      typeof clearTimeout == 'function' ? (G = clearTimeout) : (G = De)
    } catch {
      G = De
    }
  })()
  function it(t) {
    if (K === setTimeout) return setTimeout(t, 0)
    if ((K === ke || !K) && setTimeout) return ((K = setTimeout), setTimeout(t, 0))
    try {
      return K(t, 0)
    } catch {
      try {
        return K.call(null, t, 0)
      } catch {
        return K.call(this, t, 0)
      }
    }
  }
  function ur(t) {
    if (G === clearTimeout) return clearTimeout(t)
    if ((G === De || !G) && clearTimeout) return ((G = clearTimeout), clearTimeout(t))
    try {
      return G(t)
    } catch {
      try {
        return G.call(null, t)
      } catch {
        return G.call(this, t)
      }
    }
  }
  var Z = [],
    ae = !1,
    ne,
    Be = -1
  function cr() {
    !ae || !ne || ((ae = !1), ne.length ? (Z = ne.concat(Z)) : (Be = -1), Z.length && ot())
  }
  function ot() {
    if (!ae) {
      var t = it(cr)
      ae = !0
      for (var n = Z.length; n; ) {
        for (ne = Z, Z = []; ++Be < n; ) ne && ne[Be].run()
        ;((Be = -1), (n = Z.length))
      }
      ;((ne = null), (ae = !1), ur(t))
    }
  }
  _.nextTick = function (t) {
    var n = new Array(arguments.length - 1)
    if (arguments.length > 1) for (var i = 1; i < arguments.length; i++) n[i - 1] = arguments[i]
    ;(Z.push(new st(t, n)), Z.length === 1 && !ae && it(ot))
  }
  function st(t, n) {
    ;((this.fun = t), (this.array = n))
  }
  ;((st.prototype.run = function () {
    this.fun.apply(null, this.array)
  }),
    (_.title = 'browser'),
    (_.browser = !0),
    (_.env = {}),
    (_.argv = []),
    (_.version = ''),
    (_.versions = {}))
  function v() {}
  ;((_.on = v),
    (_.addListener = v),
    (_.once = v),
    (_.off = v),
    (_.removeListener = v),
    (_.removeAllListeners = v),
    (_.emit = v),
    (_.prependListener = v),
    (_.prependOnceListener = v),
    (_.listeners = function (t) {
      return []
    }),
    (_.binding = function (t) {
      throw new Error('process.binding is not supported')
    }),
    (_.cwd = function () {
      return '/'
    }),
    (_.chdir = function (t) {
      throw new Error('process.chdir is not supported')
    }),
    (_.umask = function () {
      return 0
    }))
  var lr = nt.exports
  const at = ar(lr)
  function ut(t, n) {
    return function () {
      return t.apply(n, arguments)
    }
  }
  const { toString: fr } = Object.prototype,
    { getPrototypeOf: Me } = Object,
    { iterator: Re, toStringTag: ct } = Symbol,
    Te = ((t) => (n) => {
      const i = fr.call(n)
      return t[i] || (t[i] = i.slice(8, -1).toLowerCase())
    })(Object.create(null)),
    J = (t) => ((t = t.toLowerCase()), (n) => Te(n) === t),
    Ae = (t) => (n) => typeof n === t,
    { isArray: ue } = Array,
    pe = Ae('undefined')
  function de(t) {
    return (
      t !== null &&
      !pe(t) &&
      t.constructor !== null &&
      !pe(t.constructor) &&
      q(t.constructor.isBuffer) &&
      t.constructor.isBuffer(t)
    )
  }
  const lt = J('ArrayBuffer')
  function hr(t) {
    let n
    return (
      typeof ArrayBuffer < 'u' && ArrayBuffer.isView
        ? (n = ArrayBuffer.isView(t))
        : (n = t && t.buffer && lt(t.buffer)),
      n
    )
  }
  const pr = Ae('string'),
    q = Ae('function'),
    ft = Ae('number'),
    me = (t) => t !== null && typeof t == 'object',
    dr = (t) => t === !0 || t === !1,
    Se = (t) => {
      if (Te(t) !== 'object') return !1
      const n = Me(t)
      return (
        (n === null || n === Object.prototype || Object.getPrototypeOf(n) === null) &&
        !(ct in t) &&
        !(Re in t)
      )
    },
    mr = (t) => {
      if (!me(t) || de(t)) return !1
      try {
        return Object.keys(t).length === 0 && Object.getPrototypeOf(t) === Object.prototype
      } catch {
        return !1
      }
    },
    yr = J('Date'),
    wr = J('File'),
    Er = J('Blob'),
    gr = J('FileList'),
    xr = (t) => me(t) && q(t.pipe),
    br = (t) => {
      let n
      return (
        t &&
        ((typeof FormData == 'function' && t instanceof FormData) ||
          (q(t.append) &&
            ((n = Te(t)) === 'formdata' ||
              (n === 'object' && q(t.toString) && t.toString() === '[object FormData]'))))
      )
    },
    Br = J('URLSearchParams'),
    [Rr, Tr, Ar, Sr] = ['ReadableStream', 'Request', 'Response', 'Headers'].map(J),
    Fr = (t) => (t.trim ? t.trim() : t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ''))
  function ye(t, n, { allOwnKeys: i = !1 } = {}) {
    if (t === null || typeof t > 'u') return
    let s, u
    if ((typeof t != 'object' && (t = [t]), ue(t)))
      for (s = 0, u = t.length; s < u; s++) n.call(null, t[s], s, t)
    else {
      if (de(t)) return
      const l = i ? Object.getOwnPropertyNames(t) : Object.keys(t),
        f = l.length
      let m
      for (s = 0; s < f; s++) ((m = l[s]), n.call(null, t[m], m, t))
    }
  }
  function ht(t, n) {
    if (de(t)) return null
    n = n.toLowerCase()
    const i = Object.keys(t)
    let s = i.length,
      u
    for (; s-- > 0; ) if (((u = i[s]), n === u.toLowerCase())) return u
    return null
  }
  const ie =
      typeof globalThis < 'u'
        ? globalThis
        : typeof self < 'u'
          ? self
          : typeof window < 'u'
            ? window
            : sr,
    pt = (t) => !pe(t) && t !== ie
  function qe() {
    const { caseless: t } = (pt(this) && this) || {},
      n = {},
      i = (s, u) => {
        const l = (t && ht(n, u)) || u
        Se(n[l]) && Se(s)
          ? (n[l] = qe(n[l], s))
          : Se(s)
            ? (n[l] = qe({}, s))
            : ue(s)
              ? (n[l] = s.slice())
              : (n[l] = s)
      }
    for (let s = 0, u = arguments.length; s < u; s++) arguments[s] && ye(arguments[s], i)
    return n
  }
  const Ir = (t, n, i, { allOwnKeys: s } = {}) => (
      ye(
        n,
        (u, l) => {
          i && q(u) ? (t[l] = ut(u, i)) : (t[l] = u)
        },
        { allOwnKeys: s }
      ),
      t
    ),
    Or = (t) => (t.charCodeAt(0) === 65279 && (t = t.slice(1)), t),
    Cr = (t, n, i, s) => {
      ;((t.prototype = Object.create(n.prototype, s)),
        (t.prototype.constructor = t),
        Object.defineProperty(t, 'super', { value: n.prototype }),
        i && Object.assign(t.prototype, i))
    },
    Ur = (t, n, i, s) => {
      let u, l, f
      const m = {}
      if (((n = n || {}), t == null)) return n
      do {
        for (u = Object.getOwnPropertyNames(t), l = u.length; l-- > 0; )
          ((f = u[l]), (!s || s(f, t, n)) && !m[f] && ((n[f] = t[f]), (m[f] = !0)))
        t = i !== !1 && Me(t)
      } while (t && (!i || i(t, n)) && t !== Object.prototype)
      return n
    },
    Nr = (t, n, i) => {
      ;((t = String(t)), (i === void 0 || i > t.length) && (i = t.length), (i -= n.length))
      const s = t.indexOf(n, i)
      return s !== -1 && s === i
    },
    _r = (t) => {
      if (!t) return null
      if (ue(t)) return t
      let n = t.length
      if (!ft(n)) return null
      const i = new Array(n)
      for (; n-- > 0; ) i[n] = t[n]
      return i
    },
    Lr = (
      (t) => (n) =>
        t && n instanceof t
    )(typeof Uint8Array < 'u' && Me(Uint8Array)),
    Pr = (t, n) => {
      const s = (t && t[Re]).call(t)
      let u
      for (; (u = s.next()) && !u.done; ) {
        const l = u.value
        n.call(t, l[0], l[1])
      }
    },
    kr = (t, n) => {
      let i
      const s = []
      for (; (i = t.exec(n)) !== null; ) s.push(i)
      return s
    },
    Dr = J('HTMLFormElement'),
    Mr = (t) =>
      t.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (i, s, u) {
        return s.toUpperCase() + u
      }),
    dt = (
      ({ hasOwnProperty: t }) =>
      (n, i) =>
        t.call(n, i)
    )(Object.prototype),
    qr = J('RegExp'),
    mt = (t, n) => {
      const i = Object.getOwnPropertyDescriptors(t),
        s = {}
      ;(ye(i, (u, l) => {
        let f
        ;(f = n(u, l, t)) !== !1 && (s[l] = f || u)
      }),
        Object.defineProperties(t, s))
    },
    jr = (t) => {
      mt(t, (n, i) => {
        if (q(t) && ['arguments', 'caller', 'callee'].indexOf(i) !== -1) return !1
        const s = t[i]
        if (q(s)) {
          if (((n.enumerable = !1), 'writable' in n)) {
            n.writable = !1
            return
          }
          n.set ||
            (n.set = () => {
              throw Error("Can not rewrite read-only method '" + i + "'")
            })
        }
      })
    },
    $r = (t, n) => {
      const i = {},
        s = (u) => {
          u.forEach((l) => {
            i[l] = !0
          })
        }
      return (ue(t) ? s(t) : s(String(t).split(n)), i)
    },
    Hr = () => {},
    Wr = (t, n) => (t != null && Number.isFinite((t = +t)) ? t : n)
  function zr(t) {
    return !!(t && q(t.append) && t[ct] === 'FormData' && t[Re])
  }
  const Jr = (t) => {
      const n = new Array(10),
        i = (s, u) => {
          if (me(s)) {
            if (n.indexOf(s) >= 0) return
            if (de(s)) return s
            if (!('toJSON' in s)) {
              n[u] = s
              const l = ue(s) ? [] : {}
              return (
                ye(s, (f, m) => {
                  const E = i(f, u + 1)
                  !pe(E) && (l[m] = E)
                }),
                (n[u] = void 0),
                l
              )
            }
          }
          return s
        }
      return i(t, 0)
    },
    Vr = J('AsyncFunction'),
    Kr = (t) => t && (me(t) || q(t)) && q(t.then) && q(t.catch),
    yt = ((t, n) =>
      t
        ? setImmediate
        : n
          ? ((i, s) => (
              ie.addEventListener(
                'message',
                ({ source: u, data: l }) => {
                  u === ie && l === i && s.length && s.shift()()
                },
                !1
              ),
              (u) => {
                ;(s.push(u), ie.postMessage(i, '*'))
              }
            ))(`axios@${Math.random()}`, [])
          : (i) => setTimeout(i))(typeof setImmediate == 'function', q(ie.postMessage)),
    Gr =
      typeof queueMicrotask < 'u' ? queueMicrotask.bind(ie) : (typeof at < 'u' && at.nextTick) || yt
  var d = {
      isArray: ue,
      isArrayBuffer: lt,
      isBuffer: de,
      isFormData: br,
      isArrayBufferView: hr,
      isString: pr,
      isNumber: ft,
      isBoolean: dr,
      isObject: me,
      isPlainObject: Se,
      isEmptyObject: mr,
      isReadableStream: Rr,
      isRequest: Tr,
      isResponse: Ar,
      isHeaders: Sr,
      isUndefined: pe,
      isDate: yr,
      isFile: wr,
      isBlob: Er,
      isRegExp: qr,
      isFunction: q,
      isStream: xr,
      isURLSearchParams: Br,
      isTypedArray: Lr,
      isFileList: gr,
      forEach: ye,
      merge: qe,
      extend: Ir,
      trim: Fr,
      stripBOM: Or,
      inherits: Cr,
      toFlatObject: Ur,
      kindOf: Te,
      kindOfTest: J,
      endsWith: Nr,
      toArray: _r,
      forEachEntry: Pr,
      matchAll: kr,
      isHTMLForm: Dr,
      hasOwnProperty: dt,
      hasOwnProp: dt,
      reduceDescriptors: mt,
      freezeMethods: jr,
      toObjectSet: $r,
      toCamelCase: Mr,
      noop: Hr,
      toFiniteNumber: Wr,
      findKey: ht,
      global: ie,
      isContextDefined: pt,
      isSpecCompliantForm: zr,
      toJSONObject: Jr,
      isAsyncFn: Vr,
      isThenable: Kr,
      setImmediate: yt,
      asap: Gr,
      isIterable: (t) => t != null && q(t[Re]),
    },
    wt = {},
    Fe = {}
  ;((Fe.byteLength = Qr), (Fe.toByteArray = vr), (Fe.fromByteArray = rn))
  for (
    var X = [],
      W = [],
      Xr = typeof Uint8Array < 'u' ? Uint8Array : Array,
      je = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
      ce = 0,
      Yr = je.length;
    ce < Yr;
    ++ce
  )
    ((X[ce] = je[ce]), (W[je.charCodeAt(ce)] = ce))
  ;((W[45] = 62), (W[95] = 63))
  function Et(t) {
    var n = t.length
    if (n % 4 > 0) throw new Error('Invalid string. Length must be a multiple of 4')
    var i = t.indexOf('=')
    i === -1 && (i = n)
    var s = i === n ? 0 : 4 - (i % 4)
    return [i, s]
  }
  function Qr(t) {
    var n = Et(t),
      i = n[0],
      s = n[1]
    return ((i + s) * 3) / 4 - s
  }
  function Zr(t, n, i) {
    return ((n + i) * 3) / 4 - i
  }
  function vr(t) {
    var n,
      i = Et(t),
      s = i[0],
      u = i[1],
      l = new Xr(Zr(t, s, u)),
      f = 0,
      m = u > 0 ? s - 4 : s,
      E
    for (E = 0; E < m; E += 4)
      ((n =
        (W[t.charCodeAt(E)] << 18) |
        (W[t.charCodeAt(E + 1)] << 12) |
        (W[t.charCodeAt(E + 2)] << 6) |
        W[t.charCodeAt(E + 3)]),
        (l[f++] = (n >> 16) & 255),
        (l[f++] = (n >> 8) & 255),
        (l[f++] = n & 255))
    return (
      u === 2 &&
        ((n = (W[t.charCodeAt(E)] << 2) | (W[t.charCodeAt(E + 1)] >> 4)), (l[f++] = n & 255)),
      u === 1 &&
        ((n =
          (W[t.charCodeAt(E)] << 10) |
          (W[t.charCodeAt(E + 1)] << 4) |
          (W[t.charCodeAt(E + 2)] >> 2)),
        (l[f++] = (n >> 8) & 255),
        (l[f++] = n & 255)),
      l
    )
  }
  function en(t) {
    return X[(t >> 18) & 63] + X[(t >> 12) & 63] + X[(t >> 6) & 63] + X[t & 63]
  }
  function tn(t, n, i) {
    for (var s, u = [], l = n; l < i; l += 3)
      ((s = ((t[l] << 16) & 16711680) + ((t[l + 1] << 8) & 65280) + (t[l + 2] & 255)),
        u.push(en(s)))
    return u.join('')
  }
  function rn(t) {
    for (var n, i = t.length, s = i % 3, u = [], l = 16383, f = 0, m = i - s; f < m; f += l)
      u.push(tn(t, f, f + l > m ? m : f + l))
    return (
      s === 1
        ? ((n = t[i - 1]), u.push(X[n >> 2] + X[(n << 4) & 63] + '=='))
        : s === 2 &&
          ((n = (t[i - 2] << 8) + t[i - 1]),
          u.push(X[n >> 10] + X[(n >> 4) & 63] + X[(n << 2) & 63] + '=')),
      u.join('')
    )
  }
  var $e = {}
  /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */ ;(($e.read =
    function (t, n, i, s, u) {
      var l,
        f,
        m = u * 8 - s - 1,
        E = (1 << m) - 1,
        w = E >> 1,
        c = -7,
        g = i ? u - 1 : 0,
        T = i ? -1 : 1,
        S = t[n + g]
      for (
        g += T, l = S & ((1 << -c) - 1), S >>= -c, c += m;
        c > 0;
        l = l * 256 + t[n + g], g += T, c -= 8
      );
      for (
        f = l & ((1 << -c) - 1), l >>= -c, c += s;
        c > 0;
        f = f * 256 + t[n + g], g += T, c -= 8
      );
      if (l === 0) l = 1 - w
      else {
        if (l === E) return f ? NaN : (S ? -1 : 1) * (1 / 0)
        ;((f = f + Math.pow(2, s)), (l = l - w))
      }
      return (S ? -1 : 1) * f * Math.pow(2, l - s)
    }),
    ($e.write = function (t, n, i, s, u, l) {
      var f,
        m,
        E,
        w = l * 8 - u - 1,
        c = (1 << w) - 1,
        g = c >> 1,
        T = u === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
        S = s ? 0 : l - 1,
        x = s ? 1 : -1,
        B = n < 0 || (n === 0 && 1 / n < 0) ? 1 : 0
      for (
        n = Math.abs(n),
          isNaN(n) || n === 1 / 0
            ? ((m = isNaN(n) ? 1 : 0), (f = c))
            : ((f = Math.floor(Math.log(n) / Math.LN2)),
              n * (E = Math.pow(2, -f)) < 1 && (f--, (E *= 2)),
              f + g >= 1 ? (n += T / E) : (n += T * Math.pow(2, 1 - g)),
              n * E >= 2 && (f++, (E /= 2)),
              f + g >= c
                ? ((m = 0), (f = c))
                : f + g >= 1
                  ? ((m = (n * E - 1) * Math.pow(2, u)), (f = f + g))
                  : ((m = n * Math.pow(2, g - 1) * Math.pow(2, u)), (f = 0)));
        u >= 8;
        t[i + S] = m & 255, S += x, m /= 256, u -= 8
      );
      for (f = (f << u) | m, w += u; w > 0; t[i + S] = f & 255, S += x, f /= 256, w -= 8);
      t[i + S - x] |= B * 128
    }))
  /*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   */
  ;(function (t) {
    const n = Fe,
      i = $e,
      s =
        typeof Symbol == 'function' && typeof Symbol.for == 'function'
          ? Symbol.for('nodejs.util.inspect.custom')
          : null
    ;((t.Buffer = c), (t.SlowBuffer = M), (t.INSPECT_MAX_BYTES = 50))
    const u = 2147483647
    t.kMaxLength = u
    const { Uint8Array: l, ArrayBuffer: f, SharedArrayBuffer: m } = globalThis
    ;((c.TYPED_ARRAY_SUPPORT = E()),
      !c.TYPED_ARRAY_SUPPORT &&
        typeof console < 'u' &&
        typeof console.error == 'function' &&
        console.error(
          'This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
        ))
    function E() {
      try {
        const o = new l(1),
          e = {
            foo: function () {
              return 42
            },
          }
        return (Object.setPrototypeOf(e, l.prototype), Object.setPrototypeOf(o, e), o.foo() === 42)
      } catch {
        return !1
      }
    }
    ;(Object.defineProperty(c.prototype, 'parent', {
      enumerable: !0,
      get: function () {
        if (c.isBuffer(this)) return this.buffer
      },
    }),
      Object.defineProperty(c.prototype, 'offset', {
        enumerable: !0,
        get: function () {
          if (c.isBuffer(this)) return this.byteOffset
        },
      }))
    function w(o) {
      if (o > u) throw new RangeError('The value "' + o + '" is invalid for option "size"')
      const e = new l(o)
      return (Object.setPrototypeOf(e, c.prototype), e)
    }
    function c(o, e, r) {
      if (typeof o == 'number') {
        if (typeof e == 'string')
          throw new TypeError('The "string" argument must be of type string. Received type number')
        return x(o)
      }
      return g(o, e, r)
    }
    c.poolSize = 8192
    function g(o, e, r) {
      if (typeof o == 'string') return B(o, e)
      if (f.isView(o)) return O(o)
      if (o == null)
        throw new TypeError(
          'The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type ' +
            typeof o
        )
      if (
        Q(o, f) ||
        (o && Q(o.buffer, f)) ||
        (typeof m < 'u' && (Q(o, m) || (o && Q(o.buffer, m))))
      )
        return C(o, e, r)
      if (typeof o == 'number')
        throw new TypeError('The "value" argument must not be of type number. Received type number')
      const a = o.valueOf && o.valueOf()
      if (a != null && a !== o) return c.from(a, e, r)
      const h = P(o)
      if (h) return h
      if (
        typeof Symbol < 'u' &&
        Symbol.toPrimitive != null &&
        typeof o[Symbol.toPrimitive] == 'function'
      )
        return c.from(o[Symbol.toPrimitive]('string'), e, r)
      throw new TypeError(
        'The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type ' +
          typeof o
      )
    }
    ;((c.from = function (o, e, r) {
      return g(o, e, r)
    }),
      Object.setPrototypeOf(c.prototype, l.prototype),
      Object.setPrototypeOf(c, l))
    function T(o) {
      if (typeof o != 'number') throw new TypeError('"size" argument must be of type number')
      if (o < 0) throw new RangeError('The value "' + o + '" is invalid for option "size"')
    }
    function S(o, e, r) {
      return (
        T(o),
        o <= 0
          ? w(o)
          : e !== void 0
            ? typeof r == 'string'
              ? w(o).fill(e, r)
              : w(o).fill(e)
            : w(o)
      )
    }
    c.alloc = function (o, e, r) {
      return S(o, e, r)
    }
    function x(o) {
      return (T(o), w(o < 0 ? 0 : H(o) | 0))
    }
    ;((c.allocUnsafe = function (o) {
      return x(o)
    }),
      (c.allocUnsafeSlow = function (o) {
        return x(o)
      }))
    function B(o, e) {
      if (((typeof e != 'string' || e === '') && (e = 'utf8'), !c.isEncoding(e)))
        throw new TypeError('Unknown encoding: ' + e)
      const r = V(o, e) | 0
      let a = w(r)
      const h = a.write(o, e)
      return (h !== r && (a = a.slice(0, h)), a)
    }
    function b(o) {
      const e = o.length < 0 ? 0 : H(o.length) | 0,
        r = w(e)
      for (let a = 0; a < e; a += 1) r[a] = o[a] & 255
      return r
    }
    function O(o) {
      if (Q(o, l)) {
        const e = new l(o)
        return C(e.buffer, e.byteOffset, e.byteLength)
      }
      return b(o)
    }
    function C(o, e, r) {
      if (e < 0 || o.byteLength < e) throw new RangeError('"offset" is outside of buffer bounds')
      if (o.byteLength < e + (r || 0)) throw new RangeError('"length" is outside of buffer bounds')
      let a
      return (
        e === void 0 && r === void 0
          ? (a = new l(o))
          : r === void 0
            ? (a = new l(o, e))
            : (a = new l(o, e, r)),
        Object.setPrototypeOf(a, c.prototype),
        a
      )
    }
    function P(o) {
      if (c.isBuffer(o)) {
        const e = H(o.length) | 0,
          r = w(e)
        return (r.length === 0 || o.copy(r, 0, 0, e), r)
      }
      if (o.length !== void 0) return typeof o.length != 'number' || rt(o.length) ? w(0) : b(o)
      if (o.type === 'Buffer' && Array.isArray(o.data)) return b(o.data)
    }
    function H(o) {
      if (o >= u)
        throw new RangeError(
          'Attempt to allocate Buffer larger than maximum size: 0x' + u.toString(16) + ' bytes'
        )
      return o | 0
    }
    function M(o) {
      return (+o != o && (o = 0), c.alloc(+o))
    }
    ;((c.isBuffer = function (e) {
      return e != null && e._isBuffer === !0 && e !== c.prototype
    }),
      (c.compare = function (e, r) {
        if (
          (Q(e, l) && (e = c.from(e, e.offset, e.byteLength)),
          Q(r, l) && (r = c.from(r, r.offset, r.byteLength)),
          !c.isBuffer(e) || !c.isBuffer(r))
        )
          throw new TypeError(
            'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
          )
        if (e === r) return 0
        let a = e.length,
          h = r.length
        for (let p = 0, y = Math.min(a, h); p < y; ++p)
          if (e[p] !== r[p]) {
            ;((a = e[p]), (h = r[p]))
            break
          }
        return a < h ? -1 : h < a ? 1 : 0
      }),
      (c.isEncoding = function (e) {
        switch (String(e).toLowerCase()) {
          case 'hex':
          case 'utf8':
          case 'utf-8':
          case 'ascii':
          case 'latin1':
          case 'binary':
          case 'base64':
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return !0
          default:
            return !1
        }
      }),
      (c.concat = function (e, r) {
        if (!Array.isArray(e)) throw new TypeError('"list" argument must be an Array of Buffers')
        if (e.length === 0) return c.alloc(0)
        let a
        if (r === void 0) for (r = 0, a = 0; a < e.length; ++a) r += e[a].length
        const h = c.allocUnsafe(r)
        let p = 0
        for (a = 0; a < e.length; ++a) {
          let y = e[a]
          if (Q(y, l))
            p + y.length > h.length
              ? (c.isBuffer(y) || (y = c.from(y)), y.copy(h, p))
              : l.prototype.set.call(h, y, p)
          else if (c.isBuffer(y)) y.copy(h, p)
          else throw new TypeError('"list" argument must be an Array of Buffers')
          p += y.length
        }
        return h
      }))
    function V(o, e) {
      if (c.isBuffer(o)) return o.length
      if (f.isView(o) || Q(o, f)) return o.byteLength
      if (typeof o != 'string')
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
            typeof o
        )
      const r = o.length,
        a = arguments.length > 2 && arguments[2] === !0
      if (!a && r === 0) return 0
      let h = !1
      for (;;)
        switch (e) {
          case 'ascii':
          case 'latin1':
          case 'binary':
            return r
          case 'utf8':
          case 'utf-8':
            return tt(o).length
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return r * 2
          case 'hex':
            return r >>> 1
          case 'base64':
            return ir(o).length
          default:
            if (h) return a ? -1 : tt(o).length
            ;((e = ('' + e).toLowerCase()), (h = !0))
        }
    }
    c.byteLength = V
    function ee(o, e, r) {
      let a = !1
      if (
        ((e === void 0 || e < 0) && (e = 0),
        e > this.length ||
          ((r === void 0 || r > this.length) && (r = this.length), r <= 0) ||
          ((r >>>= 0), (e >>>= 0), r <= e))
      )
        return ''
      for (o || (o = 'utf8'); ; )
        switch (o) {
          case 'hex':
            return oi(this, e, r)
          case 'utf8':
          case 'utf-8':
            return Xt(this, e, r)
          case 'ascii':
            return ni(this, e, r)
          case 'latin1':
          case 'binary':
            return ii(this, e, r)
          case 'base64':
            return ti(this, e, r)
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return si(this, e, r)
          default:
            if (a) throw new TypeError('Unknown encoding: ' + o)
            ;((o = (o + '').toLowerCase()), (a = !0))
        }
    }
    c.prototype._isBuffer = !0
    function z(o, e, r) {
      const a = o[e]
      ;((o[e] = o[r]), (o[r] = a))
    }
    ;((c.prototype.swap16 = function () {
      const e = this.length
      if (e % 2 !== 0) throw new RangeError('Buffer size must be a multiple of 16-bits')
      for (let r = 0; r < e; r += 2) z(this, r, r + 1)
      return this
    }),
      (c.prototype.swap32 = function () {
        const e = this.length
        if (e % 4 !== 0) throw new RangeError('Buffer size must be a multiple of 32-bits')
        for (let r = 0; r < e; r += 4) (z(this, r, r + 3), z(this, r + 1, r + 2))
        return this
      }),
      (c.prototype.swap64 = function () {
        const e = this.length
        if (e % 8 !== 0) throw new RangeError('Buffer size must be a multiple of 64-bits')
        for (let r = 0; r < e; r += 8)
          (z(this, r, r + 7), z(this, r + 1, r + 6), z(this, r + 2, r + 5), z(this, r + 3, r + 4))
        return this
      }),
      (c.prototype.toString = function () {
        const e = this.length
        return e === 0 ? '' : arguments.length === 0 ? Xt(this, 0, e) : ee.apply(this, arguments)
      }),
      (c.prototype.toLocaleString = c.prototype.toString),
      (c.prototype.equals = function (e) {
        if (!c.isBuffer(e)) throw new TypeError('Argument must be a Buffer')
        return this === e ? !0 : c.compare(this, e) === 0
      }),
      (c.prototype.inspect = function () {
        let e = ''
        const r = t.INSPECT_MAX_BYTES
        return (
          (e = this.toString('hex', 0, r)
            .replace(/(.{2})/g, '$1 ')
            .trim()),
          this.length > r && (e += ' ... '),
          '<Buffer ' + e + '>'
        )
      }),
      s && (c.prototype[s] = c.prototype.inspect),
      (c.prototype.compare = function (e, r, a, h, p) {
        if ((Q(e, l) && (e = c.from(e, e.offset, e.byteLength)), !c.isBuffer(e)))
          throw new TypeError(
            'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
              typeof e
          )
        if (
          (r === void 0 && (r = 0),
          a === void 0 && (a = e ? e.length : 0),
          h === void 0 && (h = 0),
          p === void 0 && (p = this.length),
          r < 0 || a > e.length || h < 0 || p > this.length)
        )
          throw new RangeError('out of range index')
        if (h >= p && r >= a) return 0
        if (h >= p) return -1
        if (r >= a) return 1
        if (((r >>>= 0), (a >>>= 0), (h >>>= 0), (p >>>= 0), this === e)) return 0
        let y = p - h,
          A = a - r
        const U = Math.min(y, A),
          I = this.slice(h, p),
          N = e.slice(r, a)
        for (let F = 0; F < U; ++F)
          if (I[F] !== N[F]) {
            ;((y = I[F]), (A = N[F]))
            break
          }
        return y < A ? -1 : A < y ? 1 : 0
      }))
    function xe(o, e, r, a, h) {
      if (o.length === 0) return -1
      if (
        (typeof r == 'string'
          ? ((a = r), (r = 0))
          : r > 2147483647
            ? (r = 2147483647)
            : r < -2147483648 && (r = -2147483648),
        (r = +r),
        rt(r) && (r = h ? 0 : o.length - 1),
        r < 0 && (r = o.length + r),
        r >= o.length)
      ) {
        if (h) return -1
        r = o.length - 1
      } else if (r < 0)
        if (h) r = 0
        else return -1
      if ((typeof e == 'string' && (e = c.from(e, a)), c.isBuffer(e)))
        return e.length === 0 ? -1 : Gt(o, e, r, a, h)
      if (typeof e == 'number')
        return (
          (e = e & 255),
          typeof l.prototype.indexOf == 'function'
            ? h
              ? l.prototype.indexOf.call(o, e, r)
              : l.prototype.lastIndexOf.call(o, e, r)
            : Gt(o, [e], r, a, h)
        )
      throw new TypeError('val must be string, number or Buffer')
    }
    function Gt(o, e, r, a, h) {
      let p = 1,
        y = o.length,
        A = e.length
      if (
        a !== void 0 &&
        ((a = String(a).toLowerCase()),
        a === 'ucs2' || a === 'ucs-2' || a === 'utf16le' || a === 'utf-16le')
      ) {
        if (o.length < 2 || e.length < 2) return -1
        ;((p = 2), (y /= 2), (A /= 2), (r /= 2))
      }
      function U(N, F) {
        return p === 1 ? N[F] : N.readUInt16BE(F * p)
      }
      let I
      if (h) {
        let N = -1
        for (I = r; I < y; I++)
          if (U(o, I) === U(e, N === -1 ? 0 : I - N)) {
            if ((N === -1 && (N = I), I - N + 1 === A)) return N * p
          } else (N !== -1 && (I -= I - N), (N = -1))
      } else
        for (r + A > y && (r = y - A), I = r; I >= 0; I--) {
          let N = !0
          for (let F = 0; F < A; F++)
            if (U(o, I + F) !== U(e, F)) {
              N = !1
              break
            }
          if (N) return I
        }
      return -1
    }
    ;((c.prototype.includes = function (e, r, a) {
      return this.indexOf(e, r, a) !== -1
    }),
      (c.prototype.indexOf = function (e, r, a) {
        return xe(this, e, r, a, !0)
      }),
      (c.prototype.lastIndexOf = function (e, r, a) {
        return xe(this, e, r, a, !1)
      }))
    function Yn(o, e, r, a) {
      r = Number(r) || 0
      const h = o.length - r
      a ? ((a = Number(a)), a > h && (a = h)) : (a = h)
      const p = e.length
      a > p / 2 && (a = p / 2)
      let y
      for (y = 0; y < a; ++y) {
        const A = parseInt(e.substr(y * 2, 2), 16)
        if (rt(A)) return y
        o[r + y] = A
      }
      return y
    }
    function Qn(o, e, r, a) {
      return Pe(tt(e, o.length - r), o, r, a)
    }
    function Zn(o, e, r, a) {
      return Pe(li(e), o, r, a)
    }
    function vn(o, e, r, a) {
      return Pe(ir(e), o, r, a)
    }
    function ei(o, e, r, a) {
      return Pe(fi(e, o.length - r), o, r, a)
    }
    ;((c.prototype.write = function (e, r, a, h) {
      if (r === void 0) ((h = 'utf8'), (a = this.length), (r = 0))
      else if (a === void 0 && typeof r == 'string') ((h = r), (a = this.length), (r = 0))
      else if (isFinite(r))
        ((r = r >>> 0),
          isFinite(a) ? ((a = a >>> 0), h === void 0 && (h = 'utf8')) : ((h = a), (a = void 0)))
      else
        throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported')
      const p = this.length - r
      if (
        ((a === void 0 || a > p) && (a = p), (e.length > 0 && (a < 0 || r < 0)) || r > this.length)
      )
        throw new RangeError('Attempt to write outside buffer bounds')
      h || (h = 'utf8')
      let y = !1
      for (;;)
        switch (h) {
          case 'hex':
            return Yn(this, e, r, a)
          case 'utf8':
          case 'utf-8':
            return Qn(this, e, r, a)
          case 'ascii':
          case 'latin1':
          case 'binary':
            return Zn(this, e, r, a)
          case 'base64':
            return vn(this, e, r, a)
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return ei(this, e, r, a)
          default:
            if (y) throw new TypeError('Unknown encoding: ' + h)
            ;((h = ('' + h).toLowerCase()), (y = !0))
        }
    }),
      (c.prototype.toJSON = function () {
        return { type: 'Buffer', data: Array.prototype.slice.call(this._arr || this, 0) }
      }))
    function ti(o, e, r) {
      return e === 0 && r === o.length ? n.fromByteArray(o) : n.fromByteArray(o.slice(e, r))
    }
    function Xt(o, e, r) {
      r = Math.min(o.length, r)
      const a = []
      let h = e
      for (; h < r; ) {
        const p = o[h]
        let y = null,
          A = p > 239 ? 4 : p > 223 ? 3 : p > 191 ? 2 : 1
        if (h + A <= r) {
          let U, I, N, F
          switch (A) {
            case 1:
              p < 128 && (y = p)
              break
            case 2:
              ;((U = o[h + 1]),
                (U & 192) === 128 && ((F = ((p & 31) << 6) | (U & 63)), F > 127 && (y = F)))
              break
            case 3:
              ;((U = o[h + 1]),
                (I = o[h + 2]),
                (U & 192) === 128 &&
                  (I & 192) === 128 &&
                  ((F = ((p & 15) << 12) | ((U & 63) << 6) | (I & 63)),
                  F > 2047 && (F < 55296 || F > 57343) && (y = F)))
              break
            case 4:
              ;((U = o[h + 1]),
                (I = o[h + 2]),
                (N = o[h + 3]),
                (U & 192) === 128 &&
                  (I & 192) === 128 &&
                  (N & 192) === 128 &&
                  ((F = ((p & 15) << 18) | ((U & 63) << 12) | ((I & 63) << 6) | (N & 63)),
                  F > 65535 && F < 1114112 && (y = F)))
          }
        }
        ;(y === null
          ? ((y = 65533), (A = 1))
          : y > 65535 &&
            ((y -= 65536), a.push(((y >>> 10) & 1023) | 55296), (y = 56320 | (y & 1023))),
          a.push(y),
          (h += A))
      }
      return ri(a)
    }
    const Yt = 4096
    function ri(o) {
      const e = o.length
      if (e <= Yt) return String.fromCharCode.apply(String, o)
      let r = '',
        a = 0
      for (; a < e; ) r += String.fromCharCode.apply(String, o.slice(a, (a += Yt)))
      return r
    }
    function ni(o, e, r) {
      let a = ''
      r = Math.min(o.length, r)
      for (let h = e; h < r; ++h) a += String.fromCharCode(o[h] & 127)
      return a
    }
    function ii(o, e, r) {
      let a = ''
      r = Math.min(o.length, r)
      for (let h = e; h < r; ++h) a += String.fromCharCode(o[h])
      return a
    }
    function oi(o, e, r) {
      const a = o.length
      ;((!e || e < 0) && (e = 0), (!r || r < 0 || r > a) && (r = a))
      let h = ''
      for (let p = e; p < r; ++p) h += hi[o[p]]
      return h
    }
    function si(o, e, r) {
      const a = o.slice(e, r)
      let h = ''
      for (let p = 0; p < a.length - 1; p += 2) h += String.fromCharCode(a[p] + a[p + 1] * 256)
      return h
    }
    c.prototype.slice = function (e, r) {
      const a = this.length
      ;((e = ~~e),
        (r = r === void 0 ? a : ~~r),
        e < 0 ? ((e += a), e < 0 && (e = 0)) : e > a && (e = a),
        r < 0 ? ((r += a), r < 0 && (r = 0)) : r > a && (r = a),
        r < e && (r = e))
      const h = this.subarray(e, r)
      return (Object.setPrototypeOf(h, c.prototype), h)
    }
    function k(o, e, r) {
      if (o % 1 !== 0 || o < 0) throw new RangeError('offset is not uint')
      if (o + e > r) throw new RangeError('Trying to access beyond buffer length')
    }
    ;((c.prototype.readUintLE = c.prototype.readUIntLE =
      function (e, r, a) {
        ;((e = e >>> 0), (r = r >>> 0), a || k(e, r, this.length))
        let h = this[e],
          p = 1,
          y = 0
        for (; ++y < r && (p *= 256); ) h += this[e + y] * p
        return h
      }),
      (c.prototype.readUintBE = c.prototype.readUIntBE =
        function (e, r, a) {
          ;((e = e >>> 0), (r = r >>> 0), a || k(e, r, this.length))
          let h = this[e + --r],
            p = 1
          for (; r > 0 && (p *= 256); ) h += this[e + --r] * p
          return h
        }),
      (c.prototype.readUint8 = c.prototype.readUInt8 =
        function (e, r) {
          return ((e = e >>> 0), r || k(e, 1, this.length), this[e])
        }),
      (c.prototype.readUint16LE = c.prototype.readUInt16LE =
        function (e, r) {
          return ((e = e >>> 0), r || k(e, 2, this.length), this[e] | (this[e + 1] << 8))
        }),
      (c.prototype.readUint16BE = c.prototype.readUInt16BE =
        function (e, r) {
          return ((e = e >>> 0), r || k(e, 2, this.length), (this[e] << 8) | this[e + 1])
        }),
      (c.prototype.readUint32LE = c.prototype.readUInt32LE =
        function (e, r) {
          return (
            (e = e >>> 0),
            r || k(e, 4, this.length),
            (this[e] | (this[e + 1] << 8) | (this[e + 2] << 16)) + this[e + 3] * 16777216
          )
        }),
      (c.prototype.readUint32BE = c.prototype.readUInt32BE =
        function (e, r) {
          return (
            (e = e >>> 0),
            r || k(e, 4, this.length),
            this[e] * 16777216 + ((this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3])
          )
        }),
      (c.prototype.readBigUInt64LE = re(function (e) {
        ;((e = e >>> 0), he(e, 'offset'))
        const r = this[e],
          a = this[e + 7]
        ;(r === void 0 || a === void 0) && be(e, this.length - 8)
        const h = r + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + this[++e] * 2 ** 24,
          p = this[++e] + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + a * 2 ** 24
        return BigInt(h) + (BigInt(p) << BigInt(32))
      })),
      (c.prototype.readBigUInt64BE = re(function (e) {
        ;((e = e >>> 0), he(e, 'offset'))
        const r = this[e],
          a = this[e + 7]
        ;(r === void 0 || a === void 0) && be(e, this.length - 8)
        const h = r * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + this[++e],
          p = this[++e] * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + a
        return (BigInt(h) << BigInt(32)) + BigInt(p)
      })),
      (c.prototype.readIntLE = function (e, r, a) {
        ;((e = e >>> 0), (r = r >>> 0), a || k(e, r, this.length))
        let h = this[e],
          p = 1,
          y = 0
        for (; ++y < r && (p *= 256); ) h += this[e + y] * p
        return ((p *= 128), h >= p && (h -= Math.pow(2, 8 * r)), h)
      }),
      (c.prototype.readIntBE = function (e, r, a) {
        ;((e = e >>> 0), (r = r >>> 0), a || k(e, r, this.length))
        let h = r,
          p = 1,
          y = this[e + --h]
        for (; h > 0 && (p *= 256); ) y += this[e + --h] * p
        return ((p *= 128), y >= p && (y -= Math.pow(2, 8 * r)), y)
      }),
      (c.prototype.readInt8 = function (e, r) {
        return (
          (e = e >>> 0),
          r || k(e, 1, this.length),
          this[e] & 128 ? (255 - this[e] + 1) * -1 : this[e]
        )
      }),
      (c.prototype.readInt16LE = function (e, r) {
        ;((e = e >>> 0), r || k(e, 2, this.length))
        const a = this[e] | (this[e + 1] << 8)
        return a & 32768 ? a | 4294901760 : a
      }),
      (c.prototype.readInt16BE = function (e, r) {
        ;((e = e >>> 0), r || k(e, 2, this.length))
        const a = this[e + 1] | (this[e] << 8)
        return a & 32768 ? a | 4294901760 : a
      }),
      (c.prototype.readInt32LE = function (e, r) {
        return (
          (e = e >>> 0),
          r || k(e, 4, this.length),
          this[e] | (this[e + 1] << 8) | (this[e + 2] << 16) | (this[e + 3] << 24)
        )
      }),
      (c.prototype.readInt32BE = function (e, r) {
        return (
          (e = e >>> 0),
          r || k(e, 4, this.length),
          (this[e] << 24) | (this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3]
        )
      }),
      (c.prototype.readBigInt64LE = re(function (e) {
        ;((e = e >>> 0), he(e, 'offset'))
        const r = this[e],
          a = this[e + 7]
        ;(r === void 0 || a === void 0) && be(e, this.length - 8)
        const h = this[e + 4] + this[e + 5] * 2 ** 8 + this[e + 6] * 2 ** 16 + (a << 24)
        return (
          (BigInt(h) << BigInt(32)) +
          BigInt(r + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + this[++e] * 2 ** 24)
        )
      })),
      (c.prototype.readBigInt64BE = re(function (e) {
        ;((e = e >>> 0), he(e, 'offset'))
        const r = this[e],
          a = this[e + 7]
        ;(r === void 0 || a === void 0) && be(e, this.length - 8)
        const h = (r << 24) + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + this[++e]
        return (
          (BigInt(h) << BigInt(32)) +
          BigInt(this[++e] * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + a)
        )
      })),
      (c.prototype.readFloatLE = function (e, r) {
        return ((e = e >>> 0), r || k(e, 4, this.length), i.read(this, e, !0, 23, 4))
      }),
      (c.prototype.readFloatBE = function (e, r) {
        return ((e = e >>> 0), r || k(e, 4, this.length), i.read(this, e, !1, 23, 4))
      }),
      (c.prototype.readDoubleLE = function (e, r) {
        return ((e = e >>> 0), r || k(e, 8, this.length), i.read(this, e, !0, 52, 8))
      }),
      (c.prototype.readDoubleBE = function (e, r) {
        return ((e = e >>> 0), r || k(e, 8, this.length), i.read(this, e, !1, 52, 8))
      }))
    function $(o, e, r, a, h, p) {
      if (!c.isBuffer(o)) throw new TypeError('"buffer" argument must be a Buffer instance')
      if (e > h || e < p) throw new RangeError('"value" argument is out of bounds')
      if (r + a > o.length) throw new RangeError('Index out of range')
    }
    ;((c.prototype.writeUintLE = c.prototype.writeUIntLE =
      function (e, r, a, h) {
        if (((e = +e), (r = r >>> 0), (a = a >>> 0), !h)) {
          const A = Math.pow(2, 8 * a) - 1
          $(this, e, r, a, A, 0)
        }
        let p = 1,
          y = 0
        for (this[r] = e & 255; ++y < a && (p *= 256); ) this[r + y] = (e / p) & 255
        return r + a
      }),
      (c.prototype.writeUintBE = c.prototype.writeUIntBE =
        function (e, r, a, h) {
          if (((e = +e), (r = r >>> 0), (a = a >>> 0), !h)) {
            const A = Math.pow(2, 8 * a) - 1
            $(this, e, r, a, A, 0)
          }
          let p = a - 1,
            y = 1
          for (this[r + p] = e & 255; --p >= 0 && (y *= 256); ) this[r + p] = (e / y) & 255
          return r + a
        }),
      (c.prototype.writeUint8 = c.prototype.writeUInt8 =
        function (e, r, a) {
          return (
            (e = +e),
            (r = r >>> 0),
            a || $(this, e, r, 1, 255, 0),
            (this[r] = e & 255),
            r + 1
          )
        }),
      (c.prototype.writeUint16LE = c.prototype.writeUInt16LE =
        function (e, r, a) {
          return (
            (e = +e),
            (r = r >>> 0),
            a || $(this, e, r, 2, 65535, 0),
            (this[r] = e & 255),
            (this[r + 1] = e >>> 8),
            r + 2
          )
        }),
      (c.prototype.writeUint16BE = c.prototype.writeUInt16BE =
        function (e, r, a) {
          return (
            (e = +e),
            (r = r >>> 0),
            a || $(this, e, r, 2, 65535, 0),
            (this[r] = e >>> 8),
            (this[r + 1] = e & 255),
            r + 2
          )
        }),
      (c.prototype.writeUint32LE = c.prototype.writeUInt32LE =
        function (e, r, a) {
          return (
            (e = +e),
            (r = r >>> 0),
            a || $(this, e, r, 4, 4294967295, 0),
            (this[r + 3] = e >>> 24),
            (this[r + 2] = e >>> 16),
            (this[r + 1] = e >>> 8),
            (this[r] = e & 255),
            r + 4
          )
        }),
      (c.prototype.writeUint32BE = c.prototype.writeUInt32BE =
        function (e, r, a) {
          return (
            (e = +e),
            (r = r >>> 0),
            a || $(this, e, r, 4, 4294967295, 0),
            (this[r] = e >>> 24),
            (this[r + 1] = e >>> 16),
            (this[r + 2] = e >>> 8),
            (this[r + 3] = e & 255),
            r + 4
          )
        }))
    function Qt(o, e, r, a, h) {
      nr(e, a, h, o, r, 7)
      let p = Number(e & BigInt(4294967295))
      ;((o[r++] = p),
        (p = p >> 8),
        (o[r++] = p),
        (p = p >> 8),
        (o[r++] = p),
        (p = p >> 8),
        (o[r++] = p))
      let y = Number((e >> BigInt(32)) & BigInt(4294967295))
      return (
        (o[r++] = y),
        (y = y >> 8),
        (o[r++] = y),
        (y = y >> 8),
        (o[r++] = y),
        (y = y >> 8),
        (o[r++] = y),
        r
      )
    }
    function Zt(o, e, r, a, h) {
      nr(e, a, h, o, r, 7)
      let p = Number(e & BigInt(4294967295))
      ;((o[r + 7] = p),
        (p = p >> 8),
        (o[r + 6] = p),
        (p = p >> 8),
        (o[r + 5] = p),
        (p = p >> 8),
        (o[r + 4] = p))
      let y = Number((e >> BigInt(32)) & BigInt(4294967295))
      return (
        (o[r + 3] = y),
        (y = y >> 8),
        (o[r + 2] = y),
        (y = y >> 8),
        (o[r + 1] = y),
        (y = y >> 8),
        (o[r] = y),
        r + 8
      )
    }
    ;((c.prototype.writeBigUInt64LE = re(function (e, r = 0) {
      return Qt(this, e, r, BigInt(0), BigInt('0xffffffffffffffff'))
    })),
      (c.prototype.writeBigUInt64BE = re(function (e, r = 0) {
        return Zt(this, e, r, BigInt(0), BigInt('0xffffffffffffffff'))
      })),
      (c.prototype.writeIntLE = function (e, r, a, h) {
        if (((e = +e), (r = r >>> 0), !h)) {
          const U = Math.pow(2, 8 * a - 1)
          $(this, e, r, a, U - 1, -U)
        }
        let p = 0,
          y = 1,
          A = 0
        for (this[r] = e & 255; ++p < a && (y *= 256); )
          (e < 0 && A === 0 && this[r + p - 1] !== 0 && (A = 1),
            (this[r + p] = (((e / y) >> 0) - A) & 255))
        return r + a
      }),
      (c.prototype.writeIntBE = function (e, r, a, h) {
        if (((e = +e), (r = r >>> 0), !h)) {
          const U = Math.pow(2, 8 * a - 1)
          $(this, e, r, a, U - 1, -U)
        }
        let p = a - 1,
          y = 1,
          A = 0
        for (this[r + p] = e & 255; --p >= 0 && (y *= 256); )
          (e < 0 && A === 0 && this[r + p + 1] !== 0 && (A = 1),
            (this[r + p] = (((e / y) >> 0) - A) & 255))
        return r + a
      }),
      (c.prototype.writeInt8 = function (e, r, a) {
        return (
          (e = +e),
          (r = r >>> 0),
          a || $(this, e, r, 1, 127, -128),
          e < 0 && (e = 255 + e + 1),
          (this[r] = e & 255),
          r + 1
        )
      }),
      (c.prototype.writeInt16LE = function (e, r, a) {
        return (
          (e = +e),
          (r = r >>> 0),
          a || $(this, e, r, 2, 32767, -32768),
          (this[r] = e & 255),
          (this[r + 1] = e >>> 8),
          r + 2
        )
      }),
      (c.prototype.writeInt16BE = function (e, r, a) {
        return (
          (e = +e),
          (r = r >>> 0),
          a || $(this, e, r, 2, 32767, -32768),
          (this[r] = e >>> 8),
          (this[r + 1] = e & 255),
          r + 2
        )
      }),
      (c.prototype.writeInt32LE = function (e, r, a) {
        return (
          (e = +e),
          (r = r >>> 0),
          a || $(this, e, r, 4, 2147483647, -2147483648),
          (this[r] = e & 255),
          (this[r + 1] = e >>> 8),
          (this[r + 2] = e >>> 16),
          (this[r + 3] = e >>> 24),
          r + 4
        )
      }),
      (c.prototype.writeInt32BE = function (e, r, a) {
        return (
          (e = +e),
          (r = r >>> 0),
          a || $(this, e, r, 4, 2147483647, -2147483648),
          e < 0 && (e = 4294967295 + e + 1),
          (this[r] = e >>> 24),
          (this[r + 1] = e >>> 16),
          (this[r + 2] = e >>> 8),
          (this[r + 3] = e & 255),
          r + 4
        )
      }),
      (c.prototype.writeBigInt64LE = re(function (e, r = 0) {
        return Qt(this, e, r, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
      })),
      (c.prototype.writeBigInt64BE = re(function (e, r = 0) {
        return Zt(this, e, r, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
      })))
    function vt(o, e, r, a, h, p) {
      if (r + a > o.length) throw new RangeError('Index out of range')
      if (r < 0) throw new RangeError('Index out of range')
    }
    function er(o, e, r, a, h) {
      return ((e = +e), (r = r >>> 0), h || vt(o, e, r, 4), i.write(o, e, r, a, 23, 4), r + 4)
    }
    ;((c.prototype.writeFloatLE = function (e, r, a) {
      return er(this, e, r, !0, a)
    }),
      (c.prototype.writeFloatBE = function (e, r, a) {
        return er(this, e, r, !1, a)
      }))
    function tr(o, e, r, a, h) {
      return ((e = +e), (r = r >>> 0), h || vt(o, e, r, 8), i.write(o, e, r, a, 52, 8), r + 8)
    }
    ;((c.prototype.writeDoubleLE = function (e, r, a) {
      return tr(this, e, r, !0, a)
    }),
      (c.prototype.writeDoubleBE = function (e, r, a) {
        return tr(this, e, r, !1, a)
      }),
      (c.prototype.copy = function (e, r, a, h) {
        if (!c.isBuffer(e)) throw new TypeError('argument should be a Buffer')
        if (
          (a || (a = 0),
          !h && h !== 0 && (h = this.length),
          r >= e.length && (r = e.length),
          r || (r = 0),
          h > 0 && h < a && (h = a),
          h === a || e.length === 0 || this.length === 0)
        )
          return 0
        if (r < 0) throw new RangeError('targetStart out of bounds')
        if (a < 0 || a >= this.length) throw new RangeError('Index out of range')
        if (h < 0) throw new RangeError('sourceEnd out of bounds')
        ;(h > this.length && (h = this.length), e.length - r < h - a && (h = e.length - r + a))
        const p = h - a
        return (
          this === e && typeof l.prototype.copyWithin == 'function'
            ? this.copyWithin(r, a, h)
            : l.prototype.set.call(e, this.subarray(a, h), r),
          p
        )
      }),
      (c.prototype.fill = function (e, r, a, h) {
        if (typeof e == 'string') {
          if (
            (typeof r == 'string'
              ? ((h = r), (r = 0), (a = this.length))
              : typeof a == 'string' && ((h = a), (a = this.length)),
            h !== void 0 && typeof h != 'string')
          )
            throw new TypeError('encoding must be a string')
          if (typeof h == 'string' && !c.isEncoding(h))
            throw new TypeError('Unknown encoding: ' + h)
          if (e.length === 1) {
            const y = e.charCodeAt(0)
            ;((h === 'utf8' && y < 128) || h === 'latin1') && (e = y)
          }
        } else typeof e == 'number' ? (e = e & 255) : typeof e == 'boolean' && (e = Number(e))
        if (r < 0 || this.length < r || this.length < a) throw new RangeError('Out of range index')
        if (a <= r) return this
        ;((r = r >>> 0), (a = a === void 0 ? this.length : a >>> 0), e || (e = 0))
        let p
        if (typeof e == 'number') for (p = r; p < a; ++p) this[p] = e
        else {
          const y = c.isBuffer(e) ? e : c.from(e, h),
            A = y.length
          if (A === 0) throw new TypeError('The value "' + e + '" is invalid for argument "value"')
          for (p = 0; p < a - r; ++p) this[p + r] = y[p % A]
        }
        return this
      }))
    const fe = {}
    function et(o, e, r) {
      fe[o] = class extends r {
        constructor() {
          ;(super(),
            Object.defineProperty(this, 'message', {
              value: e.apply(this, arguments),
              writable: !0,
              configurable: !0,
            }),
            (this.name = `${this.name} [${o}]`),
            this.stack,
            delete this.name)
        }
        get code() {
          return o
        }
        set code(h) {
          Object.defineProperty(this, 'code', {
            configurable: !0,
            enumerable: !0,
            value: h,
            writable: !0,
          })
        }
        toString() {
          return `${this.name} [${o}]: ${this.message}`
        }
      }
    }
    ;(et(
      'ERR_BUFFER_OUT_OF_BOUNDS',
      function (o) {
        return o
          ? `${o} is outside of buffer bounds`
          : 'Attempt to access memory outside buffer bounds'
      },
      RangeError
    ),
      et(
        'ERR_INVALID_ARG_TYPE',
        function (o, e) {
          return `The "${o}" argument must be of type number. Received type ${typeof e}`
        },
        TypeError
      ),
      et(
        'ERR_OUT_OF_RANGE',
        function (o, e, r) {
          let a = `The value of "${o}" is out of range.`,
            h = r
          return (
            Number.isInteger(r) && Math.abs(r) > 2 ** 32
              ? (h = rr(String(r)))
              : typeof r == 'bigint' &&
                ((h = String(r)),
                (r > BigInt(2) ** BigInt(32) || r < -(BigInt(2) ** BigInt(32))) && (h = rr(h)),
                (h += 'n')),
            (a += ` It must be ${e}. Received ${h}`),
            a
          )
        },
        RangeError
      ))
    function rr(o) {
      let e = '',
        r = o.length
      const a = o[0] === '-' ? 1 : 0
      for (; r >= a + 4; r -= 3) e = `_${o.slice(r - 3, r)}${e}`
      return `${o.slice(0, r)}${e}`
    }
    function ai(o, e, r) {
      ;(he(e, 'offset'), (o[e] === void 0 || o[e + r] === void 0) && be(e, o.length - (r + 1)))
    }
    function nr(o, e, r, a, h, p) {
      if (o > r || o < e) {
        const y = typeof e == 'bigint' ? 'n' : ''
        let A
        throw (
          e === 0 || e === BigInt(0)
            ? (A = `>= 0${y} and < 2${y} ** ${(p + 1) * 8}${y}`)
            : (A = `>= -(2${y} ** ${(p + 1) * 8 - 1}${y}) and < 2 ** ${(p + 1) * 8 - 1}${y}`),
          new fe.ERR_OUT_OF_RANGE('value', A, o)
        )
      }
      ai(a, h, p)
    }
    function he(o, e) {
      if (typeof o != 'number') throw new fe.ERR_INVALID_ARG_TYPE(e, 'number', o)
    }
    function be(o, e, r) {
      throw Math.floor(o) !== o
        ? (he(o, r), new fe.ERR_OUT_OF_RANGE('offset', 'an integer', o))
        : e < 0
          ? new fe.ERR_BUFFER_OUT_OF_BOUNDS()
          : new fe.ERR_OUT_OF_RANGE('offset', `>= 0 and <= ${e}`, o)
    }
    const ui = /[^+/0-9A-Za-z-_]/g
    function ci(o) {
      if (((o = o.split('=')[0]), (o = o.trim().replace(ui, '')), o.length < 2)) return ''
      for (; o.length % 4 !== 0; ) o = o + '='
      return o
    }
    function tt(o, e) {
      e = e || 1 / 0
      let r
      const a = o.length
      let h = null
      const p = []
      for (let y = 0; y < a; ++y) {
        if (((r = o.charCodeAt(y)), r > 55295 && r < 57344)) {
          if (!h) {
            if (r > 56319) {
              ;(e -= 3) > -1 && p.push(239, 191, 189)
              continue
            } else if (y + 1 === a) {
              ;(e -= 3) > -1 && p.push(239, 191, 189)
              continue
            }
            h = r
            continue
          }
          if (r < 56320) {
            ;((e -= 3) > -1 && p.push(239, 191, 189), (h = r))
            continue
          }
          r = (((h - 55296) << 10) | (r - 56320)) + 65536
        } else h && (e -= 3) > -1 && p.push(239, 191, 189)
        if (((h = null), r < 128)) {
          if ((e -= 1) < 0) break
          p.push(r)
        } else if (r < 2048) {
          if ((e -= 2) < 0) break
          p.push((r >> 6) | 192, (r & 63) | 128)
        } else if (r < 65536) {
          if ((e -= 3) < 0) break
          p.push((r >> 12) | 224, ((r >> 6) & 63) | 128, (r & 63) | 128)
        } else if (r < 1114112) {
          if ((e -= 4) < 0) break
          p.push((r >> 18) | 240, ((r >> 12) & 63) | 128, ((r >> 6) & 63) | 128, (r & 63) | 128)
        } else throw new Error('Invalid code point')
      }
      return p
    }
    function li(o) {
      const e = []
      for (let r = 0; r < o.length; ++r) e.push(o.charCodeAt(r) & 255)
      return e
    }
    function fi(o, e) {
      let r, a, h
      const p = []
      for (let y = 0; y < o.length && !((e -= 2) < 0); ++y)
        ((r = o.charCodeAt(y)), (a = r >> 8), (h = r % 256), p.push(h), p.push(a))
      return p
    }
    function ir(o) {
      return n.toByteArray(ci(o))
    }
    function Pe(o, e, r, a) {
      let h
      for (h = 0; h < a && !(h + r >= e.length || h >= o.length); ++h) e[h + r] = o[h]
      return h
    }
    function Q(o, e) {
      return (
        o instanceof e ||
        (o != null &&
          o.constructor != null &&
          o.constructor.name != null &&
          o.constructor.name === e.name)
      )
    }
    function rt(o) {
      return o !== o
    }
    const hi = (function () {
      const o = '0123456789abcdef',
        e = new Array(256)
      for (let r = 0; r < 16; ++r) {
        const a = r * 16
        for (let h = 0; h < 16; ++h) e[a + h] = o[r] + o[h]
      }
      return e
    })()
    function re(o) {
      return typeof BigInt > 'u' ? pi : o
    }
    function pi() {
      throw new Error('BigInt not supported')
    }
  })(wt)
  const nn = wt.Buffer
  function R(t, n, i, s, u) {
    ;(Error.call(this),
      Error.captureStackTrace
        ? Error.captureStackTrace(this, this.constructor)
        : (this.stack = new Error().stack),
      (this.message = t),
      (this.name = 'AxiosError'),
      n && (this.code = n),
      i && (this.config = i),
      s && (this.request = s),
      u && ((this.response = u), (this.status = u.status ? u.status : null)))
  }
  d.inherits(R, Error, {
    toJSON: function () {
      return {
        message: this.message,
        name: this.name,
        description: this.description,
        number: this.number,
        fileName: this.fileName,
        lineNumber: this.lineNumber,
        columnNumber: this.columnNumber,
        stack: this.stack,
        config: d.toJSONObject(this.config),
        code: this.code,
        status: this.status,
      }
    },
  })
  const gt = R.prototype,
    xt = {}
  ;([
    'ERR_BAD_OPTION_VALUE',
    'ERR_BAD_OPTION',
    'ECONNABORTED',
    'ETIMEDOUT',
    'ERR_NETWORK',
    'ERR_FR_TOO_MANY_REDIRECTS',
    'ERR_DEPRECATED',
    'ERR_BAD_RESPONSE',
    'ERR_BAD_REQUEST',
    'ERR_CANCELED',
    'ERR_NOT_SUPPORT',
    'ERR_INVALID_URL',
  ].forEach((t) => {
    xt[t] = { value: t }
  }),
    Object.defineProperties(R, xt),
    Object.defineProperty(gt, 'isAxiosError', { value: !0 }),
    (R.from = (t, n, i, s, u, l) => {
      const f = Object.create(gt)
      return (
        d.toFlatObject(
          t,
          f,
          function (E) {
            return E !== Error.prototype
          },
          (m) => m !== 'isAxiosError'
        ),
        R.call(f, t.message, n, i, s, u),
        (f.cause = t),
        (f.name = t.name),
        l && Object.assign(f, l),
        f
      )
    }))
  var on = null
  function He(t) {
    return d.isPlainObject(t) || d.isArray(t)
  }
  function bt(t) {
    return d.endsWith(t, '[]') ? t.slice(0, -2) : t
  }
  function Bt(t, n, i) {
    return t
      ? t
          .concat(n)
          .map(function (u, l) {
            return ((u = bt(u)), !i && l ? '[' + u + ']' : u)
          })
          .join(i ? '.' : '')
      : n
  }
  function sn(t) {
    return d.isArray(t) && !t.some(He)
  }
  const an = d.toFlatObject(d, {}, null, function (n) {
    return /^is[A-Z]/.test(n)
  })
  function Ie(t, n, i) {
    if (!d.isObject(t)) throw new TypeError('target must be an object')
    ;((n = n || new FormData()),
      (i = d.toFlatObject(i, { metaTokens: !0, dots: !1, indexes: !1 }, !1, function (B, b) {
        return !d.isUndefined(b[B])
      })))
    const s = i.metaTokens,
      u = i.visitor || c,
      l = i.dots,
      f = i.indexes,
      E = (i.Blob || (typeof Blob < 'u' && Blob)) && d.isSpecCompliantForm(n)
    if (!d.isFunction(u)) throw new TypeError('visitor must be a function')
    function w(x) {
      if (x === null) return ''
      if (d.isDate(x)) return x.toISOString()
      if (d.isBoolean(x)) return x.toString()
      if (!E && d.isBlob(x)) throw new R('Blob is not supported. Use a Buffer instead.')
      return d.isArrayBuffer(x) || d.isTypedArray(x)
        ? E && typeof Blob == 'function'
          ? new Blob([x])
          : nn.from(x)
        : x
    }
    function c(x, B, b) {
      let O = x
      if (x && !b && typeof x == 'object') {
        if (d.endsWith(B, '{}')) ((B = s ? B : B.slice(0, -2)), (x = JSON.stringify(x)))
        else if (
          (d.isArray(x) && sn(x)) ||
          ((d.isFileList(x) || d.endsWith(B, '[]')) && (O = d.toArray(x)))
        )
          return (
            (B = bt(B)),
            O.forEach(function (P, H) {
              !(d.isUndefined(P) || P === null) &&
                n.append(f === !0 ? Bt([B], H, l) : f === null ? B : B + '[]', w(P))
            }),
            !1
          )
      }
      return He(x) ? !0 : (n.append(Bt(b, B, l), w(x)), !1)
    }
    const g = [],
      T = Object.assign(an, { defaultVisitor: c, convertValue: w, isVisitable: He })
    function S(x, B) {
      if (!d.isUndefined(x)) {
        if (g.indexOf(x) !== -1) throw Error('Circular reference detected in ' + B.join('.'))
        ;(g.push(x),
          d.forEach(x, function (O, C) {
            ;(!(d.isUndefined(O) || O === null) &&
              u.call(n, O, d.isString(C) ? C.trim() : C, B, T)) === !0 &&
              S(O, B ? B.concat(C) : [C])
          }),
          g.pop())
      }
    }
    if (!d.isObject(t)) throw new TypeError('data must be an object')
    return (S(t), n)
  }
  function Rt(t) {
    const n = {
      '!': '%21',
      "'": '%27',
      '(': '%28',
      ')': '%29',
      '~': '%7E',
      '%20': '+',
      '%00': '\0',
    }
    return encodeURIComponent(t).replace(/[!'()~]|%20|%00/g, function (s) {
      return n[s]
    })
  }
  function We(t, n) {
    ;((this._pairs = []), t && Ie(t, this, n))
  }
  const Tt = We.prototype
  ;((Tt.append = function (n, i) {
    this._pairs.push([n, i])
  }),
    (Tt.toString = function (n) {
      const i = n
        ? function (s) {
            return n.call(this, s, Rt)
          }
        : Rt
      return this._pairs
        .map(function (u) {
          return i(u[0]) + '=' + i(u[1])
        }, '')
        .join('&')
    }))
  function un(t) {
    return encodeURIComponent(t)
      .replace(/%3A/gi, ':')
      .replace(/%24/g, '$')
      .replace(/%2C/gi, ',')
      .replace(/%20/g, '+')
      .replace(/%5B/gi, '[')
      .replace(/%5D/gi, ']')
  }
  function At(t, n, i) {
    if (!n) return t
    const s = (i && i.encode) || un
    d.isFunction(i) && (i = { serialize: i })
    const u = i && i.serialize
    let l
    if (
      (u ? (l = u(n, i)) : (l = d.isURLSearchParams(n) ? n.toString() : new We(n, i).toString(s)),
      l)
    ) {
      const f = t.indexOf('#')
      ;(f !== -1 && (t = t.slice(0, f)), (t += (t.indexOf('?') === -1 ? '?' : '&') + l))
    }
    return t
  }
  class St {
    constructor() {
      this.handlers = []
    }
    use(n, i, s) {
      return (
        this.handlers.push({
          fulfilled: n,
          rejected: i,
          synchronous: s ? s.synchronous : !1,
          runWhen: s ? s.runWhen : null,
        }),
        this.handlers.length - 1
      )
    }
    eject(n) {
      this.handlers[n] && (this.handlers[n] = null)
    }
    clear() {
      this.handlers && (this.handlers = [])
    }
    forEach(n) {
      d.forEach(this.handlers, function (s) {
        s !== null && n(s)
      })
    }
  }
  var Ft = { silentJSONParsing: !0, forcedJSONParsing: !0, clarifyTimeoutError: !1 },
    cn = typeof URLSearchParams < 'u' ? URLSearchParams : We,
    ln = typeof FormData < 'u' ? FormData : null,
    fn = typeof Blob < 'u' ? Blob : null,
    hn = {
      isBrowser: !0,
      classes: { URLSearchParams: cn, FormData: ln, Blob: fn },
      protocols: ['http', 'https', 'file', 'blob', 'url', 'data'],
    }
  const ze = typeof window < 'u' && typeof document < 'u',
    Je = (typeof navigator == 'object' && navigator) || void 0,
    pn = ze && (!Je || ['ReactNative', 'NativeScript', 'NS'].indexOf(Je.product) < 0),
    dn =
      typeof WorkerGlobalScope < 'u' &&
      self instanceof WorkerGlobalScope &&
      typeof self.importScripts == 'function',
    mn = (ze && window.location.href) || 'http://localhost'
  var yn = Object.freeze({
      __proto__: null,
      hasBrowserEnv: ze,
      hasStandardBrowserEnv: pn,
      hasStandardBrowserWebWorkerEnv: dn,
      navigator: Je,
      origin: mn,
    }),
    D = { ...yn, ...hn }
  function wn(t, n) {
    return Ie(t, new D.classes.URLSearchParams(), {
      visitor: function (i, s, u, l) {
        return D.isNode && d.isBuffer(i)
          ? (this.append(s, i.toString('base64')), !1)
          : l.defaultVisitor.apply(this, arguments)
      },
      ...n,
    })
  }
  function En(t) {
    return d.matchAll(/\w+|\[(\w*)]/g, t).map((n) => (n[0] === '[]' ? '' : n[1] || n[0]))
  }
  function gn(t) {
    const n = {},
      i = Object.keys(t)
    let s
    const u = i.length
    let l
    for (s = 0; s < u; s++) ((l = i[s]), (n[l] = t[l]))
    return n
  }
  function It(t) {
    function n(i, s, u, l) {
      let f = i[l++]
      if (f === '__proto__') return !0
      const m = Number.isFinite(+f),
        E = l >= i.length
      return (
        (f = !f && d.isArray(u) ? u.length : f),
        E
          ? (d.hasOwnProp(u, f) ? (u[f] = [u[f], s]) : (u[f] = s), !m)
          : ((!u[f] || !d.isObject(u[f])) && (u[f] = []),
            n(i, s, u[f], l) && d.isArray(u[f]) && (u[f] = gn(u[f])),
            !m)
      )
    }
    if (d.isFormData(t) && d.isFunction(t.entries)) {
      const i = {}
      return (
        d.forEachEntry(t, (s, u) => {
          n(En(s), u, i, 0)
        }),
        i
      )
    }
    return null
  }
  function xn(t, n, i) {
    if (d.isString(t))
      try {
        return ((n || JSON.parse)(t), d.trim(t))
      } catch (s) {
        if (s.name !== 'SyntaxError') throw s
      }
    return (i || JSON.stringify)(t)
  }
  const we = {
    transitional: Ft,
    adapter: ['xhr', 'http', 'fetch'],
    transformRequest: [
      function (n, i) {
        const s = i.getContentType() || '',
          u = s.indexOf('application/json') > -1,
          l = d.isObject(n)
        if ((l && d.isHTMLForm(n) && (n = new FormData(n)), d.isFormData(n)))
          return u ? JSON.stringify(It(n)) : n
        if (
          d.isArrayBuffer(n) ||
          d.isBuffer(n) ||
          d.isStream(n) ||
          d.isFile(n) ||
          d.isBlob(n) ||
          d.isReadableStream(n)
        )
          return n
        if (d.isArrayBufferView(n)) return n.buffer
        if (d.isURLSearchParams(n))
          return (
            i.setContentType('application/x-www-form-urlencoded;charset=utf-8', !1),
            n.toString()
          )
        let m
        if (l) {
          if (s.indexOf('application/x-www-form-urlencoded') > -1)
            return wn(n, this.formSerializer).toString()
          if ((m = d.isFileList(n)) || s.indexOf('multipart/form-data') > -1) {
            const E = this.env && this.env.FormData
            return Ie(m ? { 'files[]': n } : n, E && new E(), this.formSerializer)
          }
        }
        return l || u ? (i.setContentType('application/json', !1), xn(n)) : n
      },
    ],
    transformResponse: [
      function (n) {
        const i = this.transitional || we.transitional,
          s = i && i.forcedJSONParsing,
          u = this.responseType === 'json'
        if (d.isResponse(n) || d.isReadableStream(n)) return n
        if (n && d.isString(n) && ((s && !this.responseType) || u)) {
          const f = !(i && i.silentJSONParsing) && u
          try {
            return JSON.parse(n)
          } catch (m) {
            if (f)
              throw m.name === 'SyntaxError'
                ? R.from(m, R.ERR_BAD_RESPONSE, this, null, this.response)
                : m
          }
        }
        return n
      },
    ],
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    env: { FormData: D.classes.FormData, Blob: D.classes.Blob },
    validateStatus: function (n) {
      return n >= 200 && n < 300
    },
    headers: { common: { Accept: 'application/json, text/plain, */*', 'Content-Type': void 0 } },
  }
  d.forEach(['delete', 'get', 'head', 'post', 'put', 'patch'], (t) => {
    we.headers[t] = {}
  })
  const bn = d.toObjectSet([
    'age',
    'authorization',
    'content-length',
    'content-type',
    'etag',
    'expires',
    'from',
    'host',
    'if-modified-since',
    'if-unmodified-since',
    'last-modified',
    'location',
    'max-forwards',
    'proxy-authorization',
    'referer',
    'retry-after',
    'user-agent',
  ])
  var Bn = (t) => {
    const n = {}
    let i, s, u
    return (
      t &&
        t
          .split(
            `
`
          )
          .forEach(function (f) {
            ;((u = f.indexOf(':')),
              (i = f.substring(0, u).trim().toLowerCase()),
              (s = f.substring(u + 1).trim()),
              !(!i || (n[i] && bn[i])) &&
                (i === 'set-cookie'
                  ? n[i]
                    ? n[i].push(s)
                    : (n[i] = [s])
                  : (n[i] = n[i] ? n[i] + ', ' + s : s)))
          }),
      n
    )
  }
  const Ot = Symbol('internals')
  function Ee(t) {
    return t && String(t).trim().toLowerCase()
  }
  function Oe(t) {
    return t === !1 || t == null ? t : d.isArray(t) ? t.map(Oe) : String(t)
  }
  function Rn(t) {
    const n = Object.create(null),
      i = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g
    let s
    for (; (s = i.exec(t)); ) n[s[1]] = s[2]
    return n
  }
  const Tn = (t) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(t.trim())
  function Ve(t, n, i, s, u) {
    if (d.isFunction(s)) return s.call(this, n, i)
    if ((u && (n = i), !!d.isString(n))) {
      if (d.isString(s)) return n.indexOf(s) !== -1
      if (d.isRegExp(s)) return s.test(n)
    }
  }
  function An(t) {
    return t
      .trim()
      .toLowerCase()
      .replace(/([a-z\d])(\w*)/g, (n, i, s) => i.toUpperCase() + s)
  }
  function Sn(t, n) {
    const i = d.toCamelCase(' ' + n)
    ;['get', 'set', 'has'].forEach((s) => {
      Object.defineProperty(t, s + i, {
        value: function (u, l, f) {
          return this[s].call(this, n, u, l, f)
        },
        configurable: !0,
      })
    })
  }
  let j = class {
    constructor(n) {
      n && this.set(n)
    }
    set(n, i, s) {
      const u = this
      function l(m, E, w) {
        const c = Ee(E)
        if (!c) throw new Error('header name must be a non-empty string')
        const g = d.findKey(u, c)
        ;(!g || u[g] === void 0 || w === !0 || (w === void 0 && u[g] !== !1)) && (u[g || E] = Oe(m))
      }
      const f = (m, E) => d.forEach(m, (w, c) => l(w, c, E))
      if (d.isPlainObject(n) || n instanceof this.constructor) f(n, i)
      else if (d.isString(n) && (n = n.trim()) && !Tn(n)) f(Bn(n), i)
      else if (d.isObject(n) && d.isIterable(n)) {
        let m = {},
          E,
          w
        for (const c of n) {
          if (!d.isArray(c)) throw TypeError('Object iterator must return a key-value pair')
          m[(w = c[0])] = (E = m[w]) ? (d.isArray(E) ? [...E, c[1]] : [E, c[1]]) : c[1]
        }
        f(m, i)
      } else n != null && l(i, n, s)
      return this
    }
    get(n, i) {
      if (((n = Ee(n)), n)) {
        const s = d.findKey(this, n)
        if (s) {
          const u = this[s]
          if (!i) return u
          if (i === !0) return Rn(u)
          if (d.isFunction(i)) return i.call(this, u, s)
          if (d.isRegExp(i)) return i.exec(u)
          throw new TypeError('parser must be boolean|regexp|function')
        }
      }
    }
    has(n, i) {
      if (((n = Ee(n)), n)) {
        const s = d.findKey(this, n)
        return !!(s && this[s] !== void 0 && (!i || Ve(this, this[s], s, i)))
      }
      return !1
    }
    delete(n, i) {
      const s = this
      let u = !1
      function l(f) {
        if (((f = Ee(f)), f)) {
          const m = d.findKey(s, f)
          m && (!i || Ve(s, s[m], m, i)) && (delete s[m], (u = !0))
        }
      }
      return (d.isArray(n) ? n.forEach(l) : l(n), u)
    }
    clear(n) {
      const i = Object.keys(this)
      let s = i.length,
        u = !1
      for (; s--; ) {
        const l = i[s]
        ;(!n || Ve(this, this[l], l, n, !0)) && (delete this[l], (u = !0))
      }
      return u
    }
    normalize(n) {
      const i = this,
        s = {}
      return (
        d.forEach(this, (u, l) => {
          const f = d.findKey(s, l)
          if (f) {
            ;((i[f] = Oe(u)), delete i[l])
            return
          }
          const m = n ? An(l) : String(l).trim()
          ;(m !== l && delete i[l], (i[m] = Oe(u)), (s[m] = !0))
        }),
        this
      )
    }
    concat(...n) {
      return this.constructor.concat(this, ...n)
    }
    toJSON(n) {
      const i = Object.create(null)
      return (
        d.forEach(this, (s, u) => {
          s != null && s !== !1 && (i[u] = n && d.isArray(s) ? s.join(', ') : s)
        }),
        i
      )
    }
    [Symbol.iterator]() {
      return Object.entries(this.toJSON())[Symbol.iterator]()
    }
    toString() {
      return Object.entries(this.toJSON()).map(([n, i]) => n + ': ' + i).join(`
`)
    }
    getSetCookie() {
      return this.get('set-cookie') || []
    }
    get [Symbol.toStringTag]() {
      return 'AxiosHeaders'
    }
    static from(n) {
      return n instanceof this ? n : new this(n)
    }
    static concat(n, ...i) {
      const s = new this(n)
      return (i.forEach((u) => s.set(u)), s)
    }
    static accessor(n) {
      const s = (this[Ot] = this[Ot] = { accessors: {} }).accessors,
        u = this.prototype
      function l(f) {
        const m = Ee(f)
        s[m] || (Sn(u, f), (s[m] = !0))
      }
      return (d.isArray(n) ? n.forEach(l) : l(n), this)
    }
  }
  ;(j.accessor([
    'Content-Type',
    'Content-Length',
    'Accept',
    'Accept-Encoding',
    'User-Agent',
    'Authorization',
  ]),
    d.reduceDescriptors(j.prototype, ({ value: t }, n) => {
      let i = n[0].toUpperCase() + n.slice(1)
      return {
        get: () => t,
        set(s) {
          this[i] = s
        },
      }
    }),
    d.freezeMethods(j))
  function Ke(t, n) {
    const i = this || we,
      s = n || i,
      u = j.from(s.headers)
    let l = s.data
    return (
      d.forEach(t, function (m) {
        l = m.call(i, l, u.normalize(), n ? n.status : void 0)
      }),
      u.normalize(),
      l
    )
  }
  function Ct(t) {
    return !!(t && t.__CANCEL__)
  }
  function le(t, n, i) {
    ;(R.call(this, t ?? 'canceled', R.ERR_CANCELED, n, i), (this.name = 'CanceledError'))
  }
  d.inherits(le, R, { __CANCEL__: !0 })
  function Ut(t, n, i) {
    const s = i.config.validateStatus
    !i.status || !s || s(i.status)
      ? t(i)
      : n(
          new R(
            'Request failed with status code ' + i.status,
            [R.ERR_BAD_REQUEST, R.ERR_BAD_RESPONSE][Math.floor(i.status / 100) - 4],
            i.config,
            i.request,
            i
          )
        )
  }
  function Fn(t) {
    const n = /^([-+\w]{1,25})(:?\/\/|:)/.exec(t)
    return (n && n[1]) || ''
  }
  function In(t, n) {
    t = t || 10
    const i = new Array(t),
      s = new Array(t)
    let u = 0,
      l = 0,
      f
    return (
      (n = n !== void 0 ? n : 1e3),
      function (E) {
        const w = Date.now(),
          c = s[l]
        ;(f || (f = w), (i[u] = E), (s[u] = w))
        let g = l,
          T = 0
        for (; g !== u; ) ((T += i[g++]), (g = g % t))
        if (((u = (u + 1) % t), u === l && (l = (l + 1) % t), w - f < n)) return
        const S = c && w - c
        return S ? Math.round((T * 1e3) / S) : void 0
      }
    )
  }
  function On(t, n) {
    let i = 0,
      s = 1e3 / n,
      u,
      l
    const f = (w, c = Date.now()) => {
      ;((i = c), (u = null), l && (clearTimeout(l), (l = null)), t(...w))
    }
    return [
      (...w) => {
        const c = Date.now(),
          g = c - i
        g >= s
          ? f(w, c)
          : ((u = w),
            l ||
              (l = setTimeout(() => {
                ;((l = null), f(u))
              }, s - g)))
      },
      () => u && f(u),
    ]
  }
  const Ce = (t, n, i = 3) => {
      let s = 0
      const u = In(50, 250)
      return On((l) => {
        const f = l.loaded,
          m = l.lengthComputable ? l.total : void 0,
          E = f - s,
          w = u(E),
          c = f <= m
        s = f
        const g = {
          loaded: f,
          total: m,
          progress: m ? f / m : void 0,
          bytes: E,
          rate: w || void 0,
          estimated: w && m && c ? (m - f) / w : void 0,
          event: l,
          lengthComputable: m != null,
          [n ? 'download' : 'upload']: !0,
        }
        t(g)
      }, i)
    },
    Nt = (t, n) => {
      const i = t != null
      return [(s) => n[0]({ lengthComputable: i, total: t, loaded: s }), n[1]]
    },
    _t =
      (t) =>
      (...n) =>
        d.asap(() => t(...n))
  var Cn = D.hasStandardBrowserEnv
      ? ((t, n) => (i) => (
          (i = new URL(i, D.origin)),
          t.protocol === i.protocol && t.host === i.host && (n || t.port === i.port)
        ))(new URL(D.origin), D.navigator && /(msie|trident)/i.test(D.navigator.userAgent))
      : () => !0,
    Un = D.hasStandardBrowserEnv
      ? {
          write(t, n, i, s, u, l) {
            const f = [t + '=' + encodeURIComponent(n)]
            ;(d.isNumber(i) && f.push('expires=' + new Date(i).toGMTString()),
              d.isString(s) && f.push('path=' + s),
              d.isString(u) && f.push('domain=' + u),
              l === !0 && f.push('secure'),
              (document.cookie = f.join('; ')))
          },
          read(t) {
            const n = document.cookie.match(new RegExp('(^|;\\s*)(' + t + ')=([^;]*)'))
            return n ? decodeURIComponent(n[3]) : null
          },
          remove(t) {
            this.write(t, '', Date.now() - 864e5)
          },
        }
      : {
          write() {},
          read() {
            return null
          },
          remove() {},
        }
  function Nn(t) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(t)
  }
  function _n(t, n) {
    return n ? t.replace(/\/?\/$/, '') + '/' + n.replace(/^\/+/, '') : t
  }
  function Lt(t, n, i) {
    let s = !Nn(n)
    return t && (s || i == !1) ? _n(t, n) : n
  }
  const Pt = (t) => (t instanceof j ? { ...t } : t)
  function oe(t, n) {
    n = n || {}
    const i = {}
    function s(w, c, g, T) {
      return d.isPlainObject(w) && d.isPlainObject(c)
        ? d.merge.call({ caseless: T }, w, c)
        : d.isPlainObject(c)
          ? d.merge({}, c)
          : d.isArray(c)
            ? c.slice()
            : c
    }
    function u(w, c, g, T) {
      if (d.isUndefined(c)) {
        if (!d.isUndefined(w)) return s(void 0, w, g, T)
      } else return s(w, c, g, T)
    }
    function l(w, c) {
      if (!d.isUndefined(c)) return s(void 0, c)
    }
    function f(w, c) {
      if (d.isUndefined(c)) {
        if (!d.isUndefined(w)) return s(void 0, w)
      } else return s(void 0, c)
    }
    function m(w, c, g) {
      if (g in n) return s(w, c)
      if (g in t) return s(void 0, w)
    }
    const E = {
      url: l,
      method: l,
      data: l,
      baseURL: f,
      transformRequest: f,
      transformResponse: f,
      paramsSerializer: f,
      timeout: f,
      timeoutMessage: f,
      withCredentials: f,
      withXSRFToken: f,
      adapter: f,
      responseType: f,
      xsrfCookieName: f,
      xsrfHeaderName: f,
      onUploadProgress: f,
      onDownloadProgress: f,
      decompress: f,
      maxContentLength: f,
      maxBodyLength: f,
      beforeRedirect: f,
      transport: f,
      httpAgent: f,
      httpsAgent: f,
      cancelToken: f,
      socketPath: f,
      responseEncoding: f,
      validateStatus: m,
      headers: (w, c, g) => u(Pt(w), Pt(c), g, !0),
    }
    return (
      d.forEach(Object.keys({ ...t, ...n }), function (c) {
        const g = E[c] || u,
          T = g(t[c], n[c], c)
        ;(d.isUndefined(T) && g !== m) || (i[c] = T)
      }),
      i
    )
  }
  var kt = (t) => {
      const n = oe({}, t)
      let {
        data: i,
        withXSRFToken: s,
        xsrfHeaderName: u,
        xsrfCookieName: l,
        headers: f,
        auth: m,
      } = n
      ;((n.headers = f = j.from(f)),
        (n.url = At(Lt(n.baseURL, n.url, n.allowAbsoluteUrls), t.params, t.paramsSerializer)),
        m &&
          f.set(
            'Authorization',
            'Basic ' +
              btoa(
                (m.username || '') +
                  ':' +
                  (m.password ? unescape(encodeURIComponent(m.password)) : '')
              )
          ))
      let E
      if (d.isFormData(i)) {
        if (D.hasStandardBrowserEnv || D.hasStandardBrowserWebWorkerEnv) f.setContentType(void 0)
        else if ((E = f.getContentType()) !== !1) {
          const [w, ...c] = E
            ? E.split(';')
                .map((g) => g.trim())
                .filter(Boolean)
            : []
          f.setContentType([w || 'multipart/form-data', ...c].join('; '))
        }
      }
      if (
        D.hasStandardBrowserEnv &&
        (s && d.isFunction(s) && (s = s(n)), s || (s !== !1 && Cn(n.url)))
      ) {
        const w = u && l && Un.read(l)
        w && f.set(u, w)
      }
      return n
    },
    Ln =
      typeof XMLHttpRequest < 'u' &&
      function (t) {
        return new Promise(function (i, s) {
          const u = kt(t)
          let l = u.data
          const f = j.from(u.headers).normalize()
          let { responseType: m, onUploadProgress: E, onDownloadProgress: w } = u,
            c,
            g,
            T,
            S,
            x
          function B() {
            ;(S && S(),
              x && x(),
              u.cancelToken && u.cancelToken.unsubscribe(c),
              u.signal && u.signal.removeEventListener('abort', c))
          }
          let b = new XMLHttpRequest()
          ;(b.open(u.method.toUpperCase(), u.url, !0), (b.timeout = u.timeout))
          function O() {
            if (!b) return
            const P = j.from('getAllResponseHeaders' in b && b.getAllResponseHeaders()),
              M = {
                data: !m || m === 'text' || m === 'json' ? b.responseText : b.response,
                status: b.status,
                statusText: b.statusText,
                headers: P,
                config: t,
                request: b,
              }
            ;(Ut(
              function (ee) {
                ;(i(ee), B())
              },
              function (ee) {
                ;(s(ee), B())
              },
              M
            ),
              (b = null))
          }
          ;('onloadend' in b
            ? (b.onloadend = O)
            : (b.onreadystatechange = function () {
                !b ||
                  b.readyState !== 4 ||
                  (b.status === 0 && !(b.responseURL && b.responseURL.indexOf('file:') === 0)) ||
                  setTimeout(O)
              }),
            (b.onabort = function () {
              b && (s(new R('Request aborted', R.ECONNABORTED, t, b)), (b = null))
            }),
            (b.onerror = function () {
              ;(s(new R('Network Error', R.ERR_NETWORK, t, b)), (b = null))
            }),
            (b.ontimeout = function () {
              let H = u.timeout ? 'timeout of ' + u.timeout + 'ms exceeded' : 'timeout exceeded'
              const M = u.transitional || Ft
              ;(u.timeoutErrorMessage && (H = u.timeoutErrorMessage),
                s(new R(H, M.clarifyTimeoutError ? R.ETIMEDOUT : R.ECONNABORTED, t, b)),
                (b = null))
            }),
            l === void 0 && f.setContentType(null),
            'setRequestHeader' in b &&
              d.forEach(f.toJSON(), function (H, M) {
                b.setRequestHeader(M, H)
              }),
            d.isUndefined(u.withCredentials) || (b.withCredentials = !!u.withCredentials),
            m && m !== 'json' && (b.responseType = u.responseType),
            w && (([T, x] = Ce(w, !0)), b.addEventListener('progress', T)),
            E &&
              b.upload &&
              (([g, S] = Ce(E)),
              b.upload.addEventListener('progress', g),
              b.upload.addEventListener('loadend', S)),
            (u.cancelToken || u.signal) &&
              ((c = (P) => {
                b && (s(!P || P.type ? new le(null, t, b) : P), b.abort(), (b = null))
              }),
              u.cancelToken && u.cancelToken.subscribe(c),
              u.signal && (u.signal.aborted ? c() : u.signal.addEventListener('abort', c))))
          const C = Fn(u.url)
          if (C && D.protocols.indexOf(C) === -1) {
            s(new R('Unsupported protocol ' + C + ':', R.ERR_BAD_REQUEST, t))
            return
          }
          b.send(l || null)
        })
      }
  const Pn = (t, n) => {
      const { length: i } = (t = t ? t.filter(Boolean) : [])
      if (n || i) {
        let s = new AbortController(),
          u
        const l = function (w) {
          if (!u) {
            ;((u = !0), m())
            const c = w instanceof Error ? w : this.reason
            s.abort(c instanceof R ? c : new le(c instanceof Error ? c.message : c))
          }
        }
        let f =
          n &&
          setTimeout(() => {
            ;((f = null), l(new R(`timeout ${n} of ms exceeded`, R.ETIMEDOUT)))
          }, n)
        const m = () => {
          t &&
            (f && clearTimeout(f),
            (f = null),
            t.forEach((w) => {
              w.unsubscribe ? w.unsubscribe(l) : w.removeEventListener('abort', l)
            }),
            (t = null))
        }
        t.forEach((w) => w.addEventListener('abort', l))
        const { signal: E } = s
        return ((E.unsubscribe = () => d.asap(m)), E)
      }
    },
    kn = function* (t, n) {
      let i = t.byteLength
      if (i < n) {
        yield t
        return
      }
      let s = 0,
        u
      for (; s < i; ) ((u = s + n), yield t.slice(s, u), (s = u))
    },
    Dn = async function* (t, n) {
      for await (const i of Mn(t)) yield* kn(i, n)
    },
    Mn = async function* (t) {
      if (t[Symbol.asyncIterator]) {
        yield* t
        return
      }
      const n = t.getReader()
      try {
        for (;;) {
          const { done: i, value: s } = await n.read()
          if (i) break
          yield s
        }
      } finally {
        await n.cancel()
      }
    },
    Dt = (t, n, i, s) => {
      const u = Dn(t, n)
      let l = 0,
        f,
        m = (E) => {
          f || ((f = !0), s && s(E))
        }
      return new ReadableStream(
        {
          async pull(E) {
            try {
              const { done: w, value: c } = await u.next()
              if (w) {
                ;(m(), E.close())
                return
              }
              let g = c.byteLength
              if (i) {
                let T = (l += g)
                i(T)
              }
              E.enqueue(new Uint8Array(c))
            } catch (w) {
              throw (m(w), w)
            }
          },
          cancel(E) {
            return (m(E), u.return())
          },
        },
        { highWaterMark: 2 }
      )
    },
    Ue =
      typeof fetch == 'function' && typeof Request == 'function' && typeof Response == 'function',
    Mt = Ue && typeof ReadableStream == 'function',
    qn =
      Ue &&
      (typeof TextEncoder == 'function'
        ? (
            (t) => (n) =>
              t.encode(n)
          )(new TextEncoder())
        : async (t) => new Uint8Array(await new Response(t).arrayBuffer())),
    qt = (t, ...n) => {
      try {
        return !!t(...n)
      } catch {
        return !1
      }
    },
    jn =
      Mt &&
      qt(() => {
        let t = !1
        const n = new Request(D.origin, {
          body: new ReadableStream(),
          method: 'POST',
          get duplex() {
            return ((t = !0), 'half')
          },
        }).headers.has('Content-Type')
        return t && !n
      }),
    jt = 64 * 1024,
    Ge = Mt && qt(() => d.isReadableStream(new Response('').body)),
    Ne = { stream: Ge && ((t) => t.body) }
  Ue &&
    ((t) => {
      ;['text', 'arrayBuffer', 'blob', 'formData', 'stream'].forEach((n) => {
        !Ne[n] &&
          (Ne[n] = d.isFunction(t[n])
            ? (i) => i[n]()
            : (i, s) => {
                throw new R(`Response type '${n}' is not supported`, R.ERR_NOT_SUPPORT, s)
              })
      })
    })(new Response())
  const $n = async (t) => {
      if (t == null) return 0
      if (d.isBlob(t)) return t.size
      if (d.isSpecCompliantForm(t))
        return (await new Request(D.origin, { method: 'POST', body: t }).arrayBuffer()).byteLength
      if (d.isArrayBufferView(t) || d.isArrayBuffer(t)) return t.byteLength
      if ((d.isURLSearchParams(t) && (t = t + ''), d.isString(t))) return (await qn(t)).byteLength
    },
    Hn = async (t, n) => {
      const i = d.toFiniteNumber(t.getContentLength())
      return i ?? $n(n)
    }
  var Wn =
    Ue &&
    (async (t) => {
      let {
        url: n,
        method: i,
        data: s,
        signal: u,
        cancelToken: l,
        timeout: f,
        onDownloadProgress: m,
        onUploadProgress: E,
        responseType: w,
        headers: c,
        withCredentials: g = 'same-origin',
        fetchOptions: T,
      } = kt(t)
      w = w ? (w + '').toLowerCase() : 'text'
      let S = Pn([u, l && l.toAbortSignal()], f),
        x
      const B =
        S &&
        S.unsubscribe &&
        (() => {
          S.unsubscribe()
        })
      let b
      try {
        if (E && jn && i !== 'get' && i !== 'head' && (b = await Hn(c, s)) !== 0) {
          let M = new Request(n, { method: 'POST', body: s, duplex: 'half' }),
            V
          if (
            (d.isFormData(s) && (V = M.headers.get('content-type')) && c.setContentType(V), M.body)
          ) {
            const [ee, z] = Nt(b, Ce(_t(E)))
            s = Dt(M.body, jt, ee, z)
          }
        }
        d.isString(g) || (g = g ? 'include' : 'omit')
        const O = 'credentials' in Request.prototype
        x = new Request(n, {
          ...T,
          signal: S,
          method: i.toUpperCase(),
          headers: c.normalize().toJSON(),
          body: s,
          duplex: 'half',
          credentials: O ? g : void 0,
        })
        let C = await fetch(x, T)
        const P = Ge && (w === 'stream' || w === 'response')
        if (Ge && (m || (P && B))) {
          const M = {}
          ;['status', 'statusText', 'headers'].forEach((xe) => {
            M[xe] = C[xe]
          })
          const V = d.toFiniteNumber(C.headers.get('content-length')),
            [ee, z] = (m && Nt(V, Ce(_t(m), !0))) || []
          C = new Response(
            Dt(C.body, jt, ee, () => {
              ;(z && z(), B && B())
            }),
            M
          )
        }
        w = w || 'text'
        let H = await Ne[d.findKey(Ne, w) || 'text'](C, t)
        return (
          !P && B && B(),
          await new Promise((M, V) => {
            Ut(M, V, {
              data: H,
              headers: j.from(C.headers),
              status: C.status,
              statusText: C.statusText,
              config: t,
              request: x,
            })
          })
        )
      } catch (O) {
        throw (
          B && B(),
          O && O.name === 'TypeError' && /Load failed|fetch/i.test(O.message)
            ? Object.assign(new R('Network Error', R.ERR_NETWORK, t, x), { cause: O.cause || O })
            : R.from(O, O && O.code, t, x)
        )
      }
    })
  const Xe = { http: on, xhr: Ln, fetch: Wn }
  d.forEach(Xe, (t, n) => {
    if (t) {
      try {
        Object.defineProperty(t, 'name', { value: n })
      } catch {}
      Object.defineProperty(t, 'adapterName', { value: n })
    }
  })
  const $t = (t) => `- ${t}`,
    zn = (t) => d.isFunction(t) || t === null || t === !1
  var Ht = {
    getAdapter: (t) => {
      t = d.isArray(t) ? t : [t]
      const { length: n } = t
      let i, s
      const u = {}
      for (let l = 0; l < n; l++) {
        i = t[l]
        let f
        if (((s = i), !zn(i) && ((s = Xe[(f = String(i)).toLowerCase()]), s === void 0)))
          throw new R(`Unknown adapter '${f}'`)
        if (s) break
        u[f || '#' + l] = s
      }
      if (!s) {
        const l = Object.entries(u).map(
          ([m, E]) =>
            `adapter ${m} ` +
            (E === !1 ? 'is not supported by the environment' : 'is not available in the build')
        )
        let f = n
          ? l.length > 1
            ? `since :
` +
              l.map($t).join(`
`)
            : ' ' + $t(l[0])
          : 'as no adapter specified'
        throw new R('There is no suitable adapter to dispatch the request ' + f, 'ERR_NOT_SUPPORT')
      }
      return s
    },
    adapters: Xe,
  }
  function Ye(t) {
    if ((t.cancelToken && t.cancelToken.throwIfRequested(), t.signal && t.signal.aborted))
      throw new le(null, t)
  }
  function Wt(t) {
    return (
      Ye(t),
      (t.headers = j.from(t.headers)),
      (t.data = Ke.call(t, t.transformRequest)),
      ['post', 'put', 'patch'].indexOf(t.method) !== -1 &&
        t.headers.setContentType('application/x-www-form-urlencoded', !1),
      Ht.getAdapter(t.adapter || we.adapter)(t).then(
        function (s) {
          return (
            Ye(t),
            (s.data = Ke.call(t, t.transformResponse, s)),
            (s.headers = j.from(s.headers)),
            s
          )
        },
        function (s) {
          return (
            Ct(s) ||
              (Ye(t),
              s &&
                s.response &&
                ((s.response.data = Ke.call(t, t.transformResponse, s.response)),
                (s.response.headers = j.from(s.response.headers)))),
            Promise.reject(s)
          )
        }
      )
    )
  }
  const zt = '1.11.0',
    _e = {}
  ;['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((t, n) => {
    _e[t] = function (s) {
      return typeof s === t || 'a' + (n < 1 ? 'n ' : ' ') + t
    }
  })
  const Jt = {}
  ;((_e.transitional = function (n, i, s) {
    function u(l, f) {
      return '[Axios v' + zt + "] Transitional option '" + l + "'" + f + (s ? '. ' + s : '')
    }
    return (l, f, m) => {
      if (n === !1) throw new R(u(f, ' has been removed' + (i ? ' in ' + i : '')), R.ERR_DEPRECATED)
      return (
        i &&
          !Jt[f] &&
          ((Jt[f] = !0),
          console.warn(
            u(f, ' has been deprecated since v' + i + ' and will be removed in the near future')
          )),
        n ? n(l, f, m) : !0
      )
    }
  }),
    (_e.spelling = function (n) {
      return (i, s) => (console.warn(`${s} is likely a misspelling of ${n}`), !0)
    }))
  function Jn(t, n, i) {
    if (typeof t != 'object') throw new R('options must be an object', R.ERR_BAD_OPTION_VALUE)
    const s = Object.keys(t)
    let u = s.length
    for (; u-- > 0; ) {
      const l = s[u],
        f = n[l]
      if (f) {
        const m = t[l],
          E = m === void 0 || f(m, l, t)
        if (E !== !0) throw new R('option ' + l + ' must be ' + E, R.ERR_BAD_OPTION_VALUE)
        continue
      }
      if (i !== !0) throw new R('Unknown option ' + l, R.ERR_BAD_OPTION)
    }
  }
  var Le = { assertOptions: Jn, validators: _e }
  const Y = Le.validators
  let se = class {
    constructor(n) {
      ;((this.defaults = n || {}), (this.interceptors = { request: new St(), response: new St() }))
    }
    async request(n, i) {
      try {
        return await this._request(n, i)
      } catch (s) {
        if (s instanceof Error) {
          let u = {}
          Error.captureStackTrace ? Error.captureStackTrace(u) : (u = new Error())
          const l = u.stack ? u.stack.replace(/^.+\n/, '') : ''
          try {
            s.stack
              ? l &&
                !String(s.stack).endsWith(l.replace(/^.+\n.+\n/, '')) &&
                (s.stack +=
                  `
` + l)
              : (s.stack = l)
          } catch {}
        }
        throw s
      }
    }
    _request(n, i) {
      ;(typeof n == 'string' ? ((i = i || {}), (i.url = n)) : (i = n || {}),
        (i = oe(this.defaults, i)))
      const { transitional: s, paramsSerializer: u, headers: l } = i
      ;(s !== void 0 &&
        Le.assertOptions(
          s,
          {
            silentJSONParsing: Y.transitional(Y.boolean),
            forcedJSONParsing: Y.transitional(Y.boolean),
            clarifyTimeoutError: Y.transitional(Y.boolean),
          },
          !1
        ),
        u != null &&
          (d.isFunction(u)
            ? (i.paramsSerializer = { serialize: u })
            : Le.assertOptions(u, { encode: Y.function, serialize: Y.function }, !0)),
        i.allowAbsoluteUrls !== void 0 ||
          (this.defaults.allowAbsoluteUrls !== void 0
            ? (i.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls)
            : (i.allowAbsoluteUrls = !0)),
        Le.assertOptions(
          i,
          { baseUrl: Y.spelling('baseURL'), withXsrfToken: Y.spelling('withXSRFToken') },
          !0
        ),
        (i.method = (i.method || this.defaults.method || 'get').toLowerCase()))
      let f = l && d.merge(l.common, l[i.method])
      ;(l &&
        d.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], (x) => {
          delete l[x]
        }),
        (i.headers = j.concat(f, l)))
      const m = []
      let E = !0
      this.interceptors.request.forEach(function (B) {
        ;(typeof B.runWhen == 'function' && B.runWhen(i) === !1) ||
          ((E = E && B.synchronous), m.unshift(B.fulfilled, B.rejected))
      })
      const w = []
      this.interceptors.response.forEach(function (B) {
        w.push(B.fulfilled, B.rejected)
      })
      let c,
        g = 0,
        T
      if (!E) {
        const x = [Wt.bind(this), void 0]
        for (x.unshift(...m), x.push(...w), T = x.length, c = Promise.resolve(i); g < T; )
          c = c.then(x[g++], x[g++])
        return c
      }
      T = m.length
      let S = i
      for (g = 0; g < T; ) {
        const x = m[g++],
          B = m[g++]
        try {
          S = x(S)
        } catch (b) {
          B.call(this, b)
          break
        }
      }
      try {
        c = Wt.call(this, S)
      } catch (x) {
        return Promise.reject(x)
      }
      for (g = 0, T = w.length; g < T; ) c = c.then(w[g++], w[g++])
      return c
    }
    getUri(n) {
      n = oe(this.defaults, n)
      const i = Lt(n.baseURL, n.url, n.allowAbsoluteUrls)
      return At(i, n.params, n.paramsSerializer)
    }
  }
  ;(d.forEach(['delete', 'get', 'head', 'options'], function (n) {
    se.prototype[n] = function (i, s) {
      return this.request(oe(s || {}, { method: n, url: i, data: (s || {}).data }))
    }
  }),
    d.forEach(['post', 'put', 'patch'], function (n) {
      function i(s) {
        return function (l, f, m) {
          return this.request(
            oe(m || {}, {
              method: n,
              headers: s ? { 'Content-Type': 'multipart/form-data' } : {},
              url: l,
              data: f,
            })
          )
        }
      }
      ;((se.prototype[n] = i()), (se.prototype[n + 'Form'] = i(!0)))
    }))
  let Vn = class or {
    constructor(n) {
      if (typeof n != 'function') throw new TypeError('executor must be a function.')
      let i
      this.promise = new Promise(function (l) {
        i = l
      })
      const s = this
      ;(this.promise.then((u) => {
        if (!s._listeners) return
        let l = s._listeners.length
        for (; l-- > 0; ) s._listeners[l](u)
        s._listeners = null
      }),
        (this.promise.then = (u) => {
          let l
          const f = new Promise((m) => {
            ;(s.subscribe(m), (l = m))
          }).then(u)
          return (
            (f.cancel = function () {
              s.unsubscribe(l)
            }),
            f
          )
        }),
        n(function (l, f, m) {
          s.reason || ((s.reason = new le(l, f, m)), i(s.reason))
        }))
    }
    throwIfRequested() {
      if (this.reason) throw this.reason
    }
    subscribe(n) {
      if (this.reason) {
        n(this.reason)
        return
      }
      this._listeners ? this._listeners.push(n) : (this._listeners = [n])
    }
    unsubscribe(n) {
      if (!this._listeners) return
      const i = this._listeners.indexOf(n)
      i !== -1 && this._listeners.splice(i, 1)
    }
    toAbortSignal() {
      const n = new AbortController(),
        i = (s) => {
          n.abort(s)
        }
      return (this.subscribe(i), (n.signal.unsubscribe = () => this.unsubscribe(i)), n.signal)
    }
    static source() {
      let n
      return {
        token: new or(function (u) {
          n = u
        }),
        cancel: n,
      }
    }
  }
  function Kn(t) {
    return function (i) {
      return t.apply(null, i)
    }
  }
  function Gn(t) {
    return d.isObject(t) && t.isAxiosError === !0
  }
  const Qe = {
    Continue: 100,
    SwitchingProtocols: 101,
    Processing: 102,
    EarlyHints: 103,
    Ok: 200,
    Created: 201,
    Accepted: 202,
    NonAuthoritativeInformation: 203,
    NoContent: 204,
    ResetContent: 205,
    PartialContent: 206,
    MultiStatus: 207,
    AlreadyReported: 208,
    ImUsed: 226,
    MultipleChoices: 300,
    MovedPermanently: 301,
    Found: 302,
    SeeOther: 303,
    NotModified: 304,
    UseProxy: 305,
    Unused: 306,
    TemporaryRedirect: 307,
    PermanentRedirect: 308,
    BadRequest: 400,
    Unauthorized: 401,
    PaymentRequired: 402,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    NotAcceptable: 406,
    ProxyAuthenticationRequired: 407,
    RequestTimeout: 408,
    Conflict: 409,
    Gone: 410,
    LengthRequired: 411,
    PreconditionFailed: 412,
    PayloadTooLarge: 413,
    UriTooLong: 414,
    UnsupportedMediaType: 415,
    RangeNotSatisfiable: 416,
    ExpectationFailed: 417,
    ImATeapot: 418,
    MisdirectedRequest: 421,
    UnprocessableEntity: 422,
    Locked: 423,
    FailedDependency: 424,
    TooEarly: 425,
    UpgradeRequired: 426,
    PreconditionRequired: 428,
    TooManyRequests: 429,
    RequestHeaderFieldsTooLarge: 431,
    UnavailableForLegalReasons: 451,
    InternalServerError: 500,
    NotImplemented: 501,
    BadGateway: 502,
    ServiceUnavailable: 503,
    GatewayTimeout: 504,
    HttpVersionNotSupported: 505,
    VariantAlsoNegotiates: 506,
    InsufficientStorage: 507,
    LoopDetected: 508,
    NotExtended: 510,
    NetworkAuthenticationRequired: 511,
  }
  Object.entries(Qe).forEach(([t, n]) => {
    Qe[n] = t
  })
  function Vt(t) {
    const n = new se(t),
      i = ut(se.prototype.request, n)
    return (
      d.extend(i, se.prototype, n, { allOwnKeys: !0 }),
      d.extend(i, n, null, { allOwnKeys: !0 }),
      (i.create = function (u) {
        return Vt(oe(t, u))
      }),
      i
    )
  }
  const L = Vt(we)
  ;((L.Axios = se),
    (L.CanceledError = le),
    (L.CancelToken = Vn),
    (L.isCancel = Ct),
    (L.VERSION = zt),
    (L.toFormData = Ie),
    (L.AxiosError = R),
    (L.Cancel = L.CanceledError),
    (L.all = function (n) {
      return Promise.all(n)
    }),
    (L.spread = Kn),
    (L.isAxiosError = Gn),
    (L.mergeConfig = oe),
    (L.AxiosHeaders = j),
    (L.formToJSON = (t) => It(d.isHTMLForm(t) ? new FormData(t) : t)),
    (L.getAdapter = Ht.getAdapter),
    (L.HttpStatusCode = Qe),
    (L.default = L))
  const {
      Axios: yi,
      AxiosError: wi,
      CanceledError: Ei,
      isCancel: gi,
      CancelToken: xi,
      VERSION: bi,
      all: Bi,
      Cancel: Ri,
      isAxiosError: Ti,
      spread: Ai,
      toFormData: Si,
      AxiosHeaders: Fi,
      HttpStatusCode: Ii,
      formToJSON: Oi,
      getAdapter: Ci,
      mergeConfig: Ui,
    } = L,
    Ze = 5,
    Xn = 3e4
  let te = 0,
    ve,
    ge = 0
  const Kt = (t) => new Promise((n) => setTimeout(n, t))
  self.onmessage = async (t) => {
    const {
      updateType: n,
      inquiryId: i,
      interval: s = Xn,
      baseUrl: u,
      token: l,
      watcherId: f,
      lastUpdate: m = te,
    } = t.data
    if (
      ((te = m),
      self.postMessage({
        type: 'status',
        status: 'starting',
        mode: n,
        interval: s,
        message: '[Worker] Recieved new parameters.',
      }),
      ve ||
        (ve = L.create({
          baseURL: u,
          withCredentials: !0,
          headers: { Accept: 'application/json', 'Nc-Agora-Client-Id': f },
          validateStatus: (w) => [200, 304].includes(w),
        })),
      n === 'noInquirying')
    ) {
      ;(self.postMessage({
        type: 'info',
        status: 'stopped',
        mode: n,
        interval: s,
        message: '[Worker] noInquirying: exiting.',
      }),
        self.close())
      return
    }
    const E = async () => {
      try {
        let w = `inquiry/${i}/watch`
        l && (w = `s/${l}/watch`)
        const c = await ve.get(w, { params: { offset: te } })
        ;((ge = 0),
          c.status === 200 && c.data.updates?.length > 0
            ? ((te = c.data.updates[c.data.updates.length - 1].updated),
              self.postMessage({
                type: 'update',
                status: 'running',
                mode: n,
                interval: s,
                message: '[Worker] 200 got updates',
                updates: c.data.updates,
                lastUpdate: te,
              }))
            : c.status === 304
              ? self.postMessage({
                  type: 'info',
                  status: 'running',
                  mode: n,
                  interval: s,
                  message: '[Worker] 304 – no changes',
                  lastUpdate: te,
                })
              : self.postMessage({
                  type: 'info',
                  status: 'running',
                  mode: n,
                  interval: s,
                  message: '[Worker] 200 but no updates',
                  lastUpdate: te,
                }))
      } catch (w) {
        const c = w
        if (c.code === 'ECONNABORTED' || c.code === 'ERR_CANCELED') {
          self.postMessage({
            type: 'status',
            status: 'stopping',
            mode: n,
            interval: s,
            message: '[Worker] Request aborted by intention',
            lastUpdate: te,
          })
          return
        }
        if (
          ((ge = ge + 1),
          self.postMessage({
            type: 'error',
            status: 'error',
            mode: n,
            interval: s,
            message: `[Worker] Request failed (${ge}/${Ze})`,
          }),
          ge >= Ze)
        ) {
          ;(self.postMessage({
            type: 'fatal',
            status: 'error',
            mode: n,
            interval: s,
            message: `[Worker] Stopping after ${Ze} consecutive errors`,
          }),
            self.close())
          return
        }
        await Kt(s)
      }
    }
    if (n === 'periodicInquirying')
      for (
        self.postMessage({
          type: 'info',
          status: 'starting',
          mode: n,
          interval: s,
          message: '[Worker] Started periodic inquirying.',
        });
        ;

      )
        (await E(),
          self.postMessage({ type: 'status', status: 'idle', mode: n, interval: s }),
          await Kt(s))
    if (n === 'longInquirying')
      for (
        self.postMessage({
          type: 'info',
          status: 'starting',
          mode: n,
          interval: s,
          message: '[Worker] Started long inquirying.',
        });
        ;

      )
        await E()
  }
})()
//# sourceMappingURL=inquiryWatcher.worker-DhvQu5xY.js.map
