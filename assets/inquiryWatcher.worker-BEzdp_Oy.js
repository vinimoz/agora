/*! third party licenses: js/vendor.LICENSE.txt */
;(function () {
  'use strict'
  const or = globalThis || void 0 || self
  function sr(r) {
    return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, 'default') ? r.default : r
  }
  var rt = { exports: {} },
    _ = (rt.exports = {}),
    K,
    G
  function Pe() {
    throw new Error('setTimeout has not been defined')
  }
  function ke() {
    throw new Error('clearTimeout has not been defined')
  }
  ;(function () {
    try {
      typeof setTimeout == 'function' ? (K = setTimeout) : (K = Pe)
    } catch {
      K = Pe
    }
    try {
      typeof clearTimeout == 'function' ? (G = clearTimeout) : (G = ke)
    } catch {
      G = ke
    }
  })()
  function nt(r) {
    if (K === setTimeout) return setTimeout(r, 0)
    if ((K === Pe || !K) && setTimeout) return ((K = setTimeout), setTimeout(r, 0))
    try {
      return K(r, 0)
    } catch {
      try {
        return K.call(null, r, 0)
      } catch {
        return K.call(this, r, 0)
      }
    }
  }
  function ar(r) {
    if (G === clearTimeout) return clearTimeout(r)
    if ((G === ke || !G) && clearTimeout) return ((G = clearTimeout), clearTimeout(r))
    try {
      return G(r)
    } catch {
      try {
        return G.call(null, r)
      } catch {
        return G.call(this, r)
      }
    }
  }
  var Z = [],
    ae = !1,
    ne,
    xe = -1
  function ur() {
    !ae || !ne || ((ae = !1), ne.length ? (Z = ne.concat(Z)) : (xe = -1), Z.length && it())
  }
  function it() {
    if (!ae) {
      var r = nt(ur)
      ae = !0
      for (var n = Z.length; n; ) {
        for (ne = Z, Z = []; ++xe < n; ) ne && ne[xe].run()
        ;((xe = -1), (n = Z.length))
      }
      ;((ne = null), (ae = !1), ar(r))
    }
  }
  _.nextTick = function (r) {
    var n = new Array(arguments.length - 1)
    if (arguments.length > 1) for (var i = 1; i < arguments.length; i++) n[i - 1] = arguments[i]
    ;(Z.push(new ot(r, n)), Z.length === 1 && !ae && nt(it))
  }
  function ot(r, n) {
    ;((this.fun = r), (this.array = n))
  }
  ;((ot.prototype.run = function () {
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
    (_.listeners = function (r) {
      return []
    }),
    (_.binding = function (r) {
      throw new Error('process.binding is not supported')
    }),
    (_.cwd = function () {
      return '/'
    }),
    (_.chdir = function (r) {
      throw new Error('process.chdir is not supported')
    }),
    (_.umask = function () {
      return 0
    }))
  var cr = rt.exports
  const st = sr(cr)
  function at(r, n) {
    return function () {
      return r.apply(n, arguments)
    }
  }
  const { toString: lr } = Object.prototype,
    { getPrototypeOf: De } = Object,
    { iterator: be, toStringTag: ut } = Symbol,
    Be = ((r) => (n) => {
      const i = lr.call(n)
      return r[i] || (r[i] = i.slice(8, -1).toLowerCase())
    })(Object.create(null)),
    J = (r) => ((r = r.toLowerCase()), (n) => Be(n) === r),
    Re = (r) => (n) => typeof n === r,
    { isArray: ue } = Array,
    pe = Re('undefined')
  function fr(r) {
    return (
      r !== null &&
      !pe(r) &&
      r.constructor !== null &&
      !pe(r.constructor) &&
      q(r.constructor.isBuffer) &&
      r.constructor.isBuffer(r)
    )
  }
  const ct = J('ArrayBuffer')
  function hr(r) {
    let n
    return (
      typeof ArrayBuffer < 'u' && ArrayBuffer.isView
        ? (n = ArrayBuffer.isView(r))
        : (n = r && r.buffer && ct(r.buffer)),
      n
    )
  }
  const pr = Re('string'),
    q = Re('function'),
    lt = Re('number'),
    Te = (r) => r !== null && typeof r == 'object',
    dr = (r) => r === !0 || r === !1,
    Ae = (r) => {
      if (Be(r) !== 'object') return !1
      const n = De(r)
      return (
        (n === null || n === Object.prototype || Object.getPrototypeOf(n) === null) &&
        !(ut in r) &&
        !(be in r)
      )
    },
    mr = J('Date'),
    yr = J('File'),
    wr = J('Blob'),
    Er = J('FileList'),
    gr = (r) => Te(r) && q(r.pipe),
    xr = (r) => {
      let n
      return (
        r &&
        ((typeof FormData == 'function' && r instanceof FormData) ||
          (q(r.append) &&
            ((n = Be(r)) === 'formdata' ||
              (n === 'object' && q(r.toString) && r.toString() === '[object FormData]'))))
      )
    },
    br = J('URLSearchParams'),
    [Br, Rr, Tr, Ar] = ['ReadableStream', 'Request', 'Response', 'Headers'].map(J),
    Sr = (r) => (r.trim ? r.trim() : r.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ''))
  function de(r, n, { allOwnKeys: i = !1 } = {}) {
    if (r === null || typeof r > 'u') return
    let s, u
    if ((typeof r != 'object' && (r = [r]), ue(r)))
      for (s = 0, u = r.length; s < u; s++) n.call(null, r[s], s, r)
    else {
      const l = i ? Object.getOwnPropertyNames(r) : Object.keys(r),
        f = l.length
      let m
      for (s = 0; s < f; s++) ((m = l[s]), n.call(null, r[m], m, r))
    }
  }
  function ft(r, n) {
    n = n.toLowerCase()
    const i = Object.keys(r)
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
            : or,
    ht = (r) => !pe(r) && r !== ie
  function Me() {
    const { caseless: r } = (ht(this) && this) || {},
      n = {},
      i = (s, u) => {
        const l = (r && ft(n, u)) || u
        Ae(n[l]) && Ae(s)
          ? (n[l] = Me(n[l], s))
          : Ae(s)
            ? (n[l] = Me({}, s))
            : ue(s)
              ? (n[l] = s.slice())
              : (n[l] = s)
      }
    for (let s = 0, u = arguments.length; s < u; s++) arguments[s] && de(arguments[s], i)
    return n
  }
  const Fr = (r, n, i, { allOwnKeys: s } = {}) => (
      de(
        n,
        (u, l) => {
          i && q(u) ? (r[l] = at(u, i)) : (r[l] = u)
        },
        { allOwnKeys: s }
      ),
      r
    ),
    Ir = (r) => (r.charCodeAt(0) === 65279 && (r = r.slice(1)), r),
    Cr = (r, n, i, s) => {
      ;((r.prototype = Object.create(n.prototype, s)),
        (r.prototype.constructor = r),
        Object.defineProperty(r, 'super', { value: n.prototype }),
        i && Object.assign(r.prototype, i))
    },
    Ur = (r, n, i, s) => {
      let u, l, f
      const m = {}
      if (((n = n || {}), r == null)) return n
      do {
        for (u = Object.getOwnPropertyNames(r), l = u.length; l-- > 0; )
          ((f = u[l]), (!s || s(f, r, n)) && !m[f] && ((n[f] = r[f]), (m[f] = !0)))
        r = i !== !1 && De(r)
      } while (r && (!i || i(r, n)) && r !== Object.prototype)
      return n
    },
    Or = (r, n, i) => {
      ;((r = String(r)), (i === void 0 || i > r.length) && (i = r.length), (i -= n.length))
      const s = r.indexOf(n, i)
      return s !== -1 && s === i
    },
    Nr = (r) => {
      if (!r) return null
      if (ue(r)) return r
      let n = r.length
      if (!lt(n)) return null
      const i = new Array(n)
      for (; n-- > 0; ) i[n] = r[n]
      return i
    },
    _r = (
      (r) => (n) =>
        r && n instanceof r
    )(typeof Uint8Array < 'u' && De(Uint8Array)),
    Lr = (r, n) => {
      const s = (r && r[be]).call(r)
      let u
      for (; (u = s.next()) && !u.done; ) {
        const l = u.value
        n.call(r, l[0], l[1])
      }
    },
    Pr = (r, n) => {
      let i
      const s = []
      for (; (i = r.exec(n)) !== null; ) s.push(i)
      return s
    },
    kr = J('HTMLFormElement'),
    Dr = (r) =>
      r.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (i, s, u) {
        return s.toUpperCase() + u
      }),
    pt = (
      ({ hasOwnProperty: r }) =>
      (n, i) =>
        r.call(n, i)
    )(Object.prototype),
    Mr = J('RegExp'),
    dt = (r, n) => {
      const i = Object.getOwnPropertyDescriptors(r),
        s = {}
      ;(de(i, (u, l) => {
        let f
        ;(f = n(u, l, r)) !== !1 && (s[l] = f || u)
      }),
        Object.defineProperties(r, s))
    },
    qr = (r) => {
      dt(r, (n, i) => {
        if (q(r) && ['arguments', 'caller', 'callee'].indexOf(i) !== -1) return !1
        const s = r[i]
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
    jr = (r, n) => {
      const i = {},
        s = (u) => {
          u.forEach((l) => {
            i[l] = !0
          })
        }
      return (ue(r) ? s(r) : s(String(r).split(n)), i)
    },
    $r = () => {},
    Hr = (r, n) => (r != null && Number.isFinite((r = +r)) ? r : n)
  function Wr(r) {
    return !!(r && q(r.append) && r[ut] === 'FormData' && r[be])
  }
  const zr = (r) => {
      const n = new Array(10),
        i = (s, u) => {
          if (Te(s)) {
            if (n.indexOf(s) >= 0) return
            if (!('toJSON' in s)) {
              n[u] = s
              const l = ue(s) ? [] : {}
              return (
                de(s, (f, m) => {
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
      return i(r, 0)
    },
    Jr = J('AsyncFunction'),
    Vr = (r) => r && (Te(r) || q(r)) && q(r.then) && q(r.catch),
    mt = ((r, n) =>
      r
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
    Kr =
      typeof queueMicrotask < 'u' ? queueMicrotask.bind(ie) : (typeof st < 'u' && st.nextTick) || mt
  var d = {
      isArray: ue,
      isArrayBuffer: ct,
      isBuffer: fr,
      isFormData: xr,
      isArrayBufferView: hr,
      isString: pr,
      isNumber: lt,
      isBoolean: dr,
      isObject: Te,
      isPlainObject: Ae,
      isReadableStream: Br,
      isRequest: Rr,
      isResponse: Tr,
      isHeaders: Ar,
      isUndefined: pe,
      isDate: mr,
      isFile: yr,
      isBlob: wr,
      isRegExp: Mr,
      isFunction: q,
      isStream: gr,
      isURLSearchParams: br,
      isTypedArray: _r,
      isFileList: Er,
      forEach: de,
      merge: Me,
      extend: Fr,
      trim: Sr,
      stripBOM: Ir,
      inherits: Cr,
      toFlatObject: Ur,
      kindOf: Be,
      kindOfTest: J,
      endsWith: Or,
      toArray: Nr,
      forEachEntry: Lr,
      matchAll: Pr,
      isHTMLForm: kr,
      hasOwnProperty: pt,
      hasOwnProp: pt,
      reduceDescriptors: dt,
      freezeMethods: qr,
      toObjectSet: jr,
      toCamelCase: Dr,
      noop: $r,
      toFiniteNumber: Hr,
      findKey: ft,
      global: ie,
      isContextDefined: ht,
      isSpecCompliantForm: Wr,
      toJSONObject: zr,
      isAsyncFn: Jr,
      isThenable: Vr,
      setImmediate: mt,
      asap: Kr,
      isIterable: (r) => r != null && q(r[be]),
    },
    yt = {},
    Se = {}
  ;((Se.byteLength = Yr), (Se.toByteArray = Zr), (Se.fromByteArray = tn))
  for (
    var X = [],
      W = [],
      Gr = typeof Uint8Array < 'u' ? Uint8Array : Array,
      qe = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
      ce = 0,
      Xr = qe.length;
    ce < Xr;
    ++ce
  )
    ((X[ce] = qe[ce]), (W[qe.charCodeAt(ce)] = ce))
  ;((W[45] = 62), (W[95] = 63))
  function wt(r) {
    var n = r.length
    if (n % 4 > 0) throw new Error('Invalid string. Length must be a multiple of 4')
    var i = r.indexOf('=')
    i === -1 && (i = n)
    var s = i === n ? 0 : 4 - (i % 4)
    return [i, s]
  }
  function Yr(r) {
    var n = wt(r),
      i = n[0],
      s = n[1]
    return ((i + s) * 3) / 4 - s
  }
  function Qr(r, n, i) {
    return ((n + i) * 3) / 4 - i
  }
  function Zr(r) {
    var n,
      i = wt(r),
      s = i[0],
      u = i[1],
      l = new Gr(Qr(r, s, u)),
      f = 0,
      m = u > 0 ? s - 4 : s,
      E
    for (E = 0; E < m; E += 4)
      ((n =
        (W[r.charCodeAt(E)] << 18) |
        (W[r.charCodeAt(E + 1)] << 12) |
        (W[r.charCodeAt(E + 2)] << 6) |
        W[r.charCodeAt(E + 3)]),
        (l[f++] = (n >> 16) & 255),
        (l[f++] = (n >> 8) & 255),
        (l[f++] = n & 255))
    return (
      u === 2 &&
        ((n = (W[r.charCodeAt(E)] << 2) | (W[r.charCodeAt(E + 1)] >> 4)), (l[f++] = n & 255)),
      u === 1 &&
        ((n =
          (W[r.charCodeAt(E)] << 10) |
          (W[r.charCodeAt(E + 1)] << 4) |
          (W[r.charCodeAt(E + 2)] >> 2)),
        (l[f++] = (n >> 8) & 255),
        (l[f++] = n & 255)),
      l
    )
  }
  function vr(r) {
    return X[(r >> 18) & 63] + X[(r >> 12) & 63] + X[(r >> 6) & 63] + X[r & 63]
  }
  function en(r, n, i) {
    for (var s, u = [], l = n; l < i; l += 3)
      ((s = ((r[l] << 16) & 16711680) + ((r[l + 1] << 8) & 65280) + (r[l + 2] & 255)),
        u.push(vr(s)))
    return u.join('')
  }
  function tn(r) {
    for (var n, i = r.length, s = i % 3, u = [], l = 16383, f = 0, m = i - s; f < m; f += l)
      u.push(en(r, f, f + l > m ? m : f + l))
    return (
      s === 1
        ? ((n = r[i - 1]), u.push(X[n >> 2] + X[(n << 4) & 63] + '=='))
        : s === 2 &&
          ((n = (r[i - 2] << 8) + r[i - 1]),
          u.push(X[n >> 10] + X[(n >> 4) & 63] + X[(n << 2) & 63] + '=')),
      u.join('')
    )
  }
  var je = {}
  /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */ ;((je.read =
    function (r, n, i, s, u) {
      var l,
        f,
        m = u * 8 - s - 1,
        E = (1 << m) - 1,
        w = E >> 1,
        c = -7,
        g = i ? u - 1 : 0,
        T = i ? -1 : 1,
        S = r[n + g]
      for (
        g += T, l = S & ((1 << -c) - 1), S >>= -c, c += m;
        c > 0;
        l = l * 256 + r[n + g], g += T, c -= 8
      );
      for (
        f = l & ((1 << -c) - 1), l >>= -c, c += s;
        c > 0;
        f = f * 256 + r[n + g], g += T, c -= 8
      );
      if (l === 0) l = 1 - w
      else {
        if (l === E) return f ? NaN : (S ? -1 : 1) * (1 / 0)
        ;((f = f + Math.pow(2, s)), (l = l - w))
      }
      return (S ? -1 : 1) * f * Math.pow(2, l - s)
    }),
    (je.write = function (r, n, i, s, u, l) {
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
        r[i + S] = m & 255, S += x, m /= 256, u -= 8
      );
      for (f = (f << u) | m, w += u; w > 0; r[i + S] = f & 255, S += x, f /= 256, w -= 8);
      r[i + S - x] |= B * 128
    }))
  /*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   */
  ;(function (r) {
    const n = Se,
      i = je,
      s =
        typeof Symbol == 'function' && typeof Symbol.for == 'function'
          ? Symbol.for('nodejs.util.inspect.custom')
          : null
    ;((r.Buffer = c), (r.SlowBuffer = M), (r.INSPECT_MAX_BYTES = 50))
    const u = 2147483647
    r.kMaxLength = u
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
    function c(o, e, t) {
      if (typeof o == 'number') {
        if (typeof e == 'string')
          throw new TypeError('The "string" argument must be of type string. Received type number')
        return x(o)
      }
      return g(o, e, t)
    }
    c.poolSize = 8192
    function g(o, e, t) {
      if (typeof o == 'string') return B(o, e)
      if (f.isView(o)) return C(o)
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
        return U(o, e, t)
      if (typeof o == 'number')
        throw new TypeError('The "value" argument must not be of type number. Received type number')
      const a = o.valueOf && o.valueOf()
      if (a != null && a !== o) return c.from(a, e, t)
      const h = P(o)
      if (h) return h
      if (
        typeof Symbol < 'u' &&
        Symbol.toPrimitive != null &&
        typeof o[Symbol.toPrimitive] == 'function'
      )
        return c.from(o[Symbol.toPrimitive]('string'), e, t)
      throw new TypeError(
        'The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type ' +
          typeof o
      )
    }
    ;((c.from = function (o, e, t) {
      return g(o, e, t)
    }),
      Object.setPrototypeOf(c.prototype, l.prototype),
      Object.setPrototypeOf(c, l))
    function T(o) {
      if (typeof o != 'number') throw new TypeError('"size" argument must be of type number')
      if (o < 0) throw new RangeError('The value "' + o + '" is invalid for option "size"')
    }
    function S(o, e, t) {
      return (
        T(o),
        o <= 0
          ? w(o)
          : e !== void 0
            ? typeof t == 'string'
              ? w(o).fill(e, t)
              : w(o).fill(e)
            : w(o)
      )
    }
    c.alloc = function (o, e, t) {
      return S(o, e, t)
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
      const t = V(o, e) | 0
      let a = w(t)
      const h = a.write(o, e)
      return (h !== t && (a = a.slice(0, h)), a)
    }
    function b(o) {
      const e = o.length < 0 ? 0 : H(o.length) | 0,
        t = w(e)
      for (let a = 0; a < e; a += 1) t[a] = o[a] & 255
      return t
    }
    function C(o) {
      if (Q(o, l)) {
        const e = new l(o)
        return U(e.buffer, e.byteOffset, e.byteLength)
      }
      return b(o)
    }
    function U(o, e, t) {
      if (e < 0 || o.byteLength < e) throw new RangeError('"offset" is outside of buffer bounds')
      if (o.byteLength < e + (t || 0)) throw new RangeError('"length" is outside of buffer bounds')
      let a
      return (
        e === void 0 && t === void 0
          ? (a = new l(o))
          : t === void 0
            ? (a = new l(o, e))
            : (a = new l(o, e, t)),
        Object.setPrototypeOf(a, c.prototype),
        a
      )
    }
    function P(o) {
      if (c.isBuffer(o)) {
        const e = H(o.length) | 0,
          t = w(e)
        return (t.length === 0 || o.copy(t, 0, 0, e), t)
      }
      if (o.length !== void 0) return typeof o.length != 'number' || tt(o.length) ? w(0) : b(o)
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
      (c.compare = function (e, t) {
        if (
          (Q(e, l) && (e = c.from(e, e.offset, e.byteLength)),
          Q(t, l) && (t = c.from(t, t.offset, t.byteLength)),
          !c.isBuffer(e) || !c.isBuffer(t))
        )
          throw new TypeError(
            'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
          )
        if (e === t) return 0
        let a = e.length,
          h = t.length
        for (let p = 0, y = Math.min(a, h); p < y; ++p)
          if (e[p] !== t[p]) {
            ;((a = e[p]), (h = t[p]))
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
      (c.concat = function (e, t) {
        if (!Array.isArray(e)) throw new TypeError('"list" argument must be an Array of Buffers')
        if (e.length === 0) return c.alloc(0)
        let a
        if (t === void 0) for (t = 0, a = 0; a < e.length; ++a) t += e[a].length
        const h = c.allocUnsafe(t)
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
      const t = o.length,
        a = arguments.length > 2 && arguments[2] === !0
      if (!a && t === 0) return 0
      let h = !1
      for (;;)
        switch (e) {
          case 'ascii':
          case 'latin1':
          case 'binary':
            return t
          case 'utf8':
          case 'utf-8':
            return et(o).length
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return t * 2
          case 'hex':
            return t >>> 1
          case 'base64':
            return nr(o).length
          default:
            if (h) return a ? -1 : et(o).length
            ;((e = ('' + e).toLowerCase()), (h = !0))
        }
    }
    c.byteLength = V
    function ee(o, e, t) {
      let a = !1
      if (
        ((e === void 0 || e < 0) && (e = 0),
        e > this.length ||
          ((t === void 0 || t > this.length) && (t = this.length), t <= 0) ||
          ((t >>>= 0), (e >>>= 0), t <= e))
      )
        return ''
      for (o || (o = 'utf8'); ; )
        switch (o) {
          case 'hex':
            return ii(this, e, t)
          case 'utf8':
          case 'utf-8':
            return Gt(this, e, t)
          case 'ascii':
            return ri(this, e, t)
          case 'latin1':
          case 'binary':
            return ni(this, e, t)
          case 'base64':
            return ei(this, e, t)
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return oi(this, e, t)
          default:
            if (a) throw new TypeError('Unknown encoding: ' + o)
            ;((o = (o + '').toLowerCase()), (a = !0))
        }
    }
    c.prototype._isBuffer = !0
    function z(o, e, t) {
      const a = o[e]
      ;((o[e] = o[t]), (o[t] = a))
    }
    ;((c.prototype.swap16 = function () {
      const e = this.length
      if (e % 2 !== 0) throw new RangeError('Buffer size must be a multiple of 16-bits')
      for (let t = 0; t < e; t += 2) z(this, t, t + 1)
      return this
    }),
      (c.prototype.swap32 = function () {
        const e = this.length
        if (e % 4 !== 0) throw new RangeError('Buffer size must be a multiple of 32-bits')
        for (let t = 0; t < e; t += 4) (z(this, t, t + 3), z(this, t + 1, t + 2))
        return this
      }),
      (c.prototype.swap64 = function () {
        const e = this.length
        if (e % 8 !== 0) throw new RangeError('Buffer size must be a multiple of 64-bits')
        for (let t = 0; t < e; t += 8)
          (z(this, t, t + 7), z(this, t + 1, t + 6), z(this, t + 2, t + 5), z(this, t + 3, t + 4))
        return this
      }),
      (c.prototype.toString = function () {
        const e = this.length
        return e === 0 ? '' : arguments.length === 0 ? Gt(this, 0, e) : ee.apply(this, arguments)
      }),
      (c.prototype.toLocaleString = c.prototype.toString),
      (c.prototype.equals = function (e) {
        if (!c.isBuffer(e)) throw new TypeError('Argument must be a Buffer')
        return this === e ? !0 : c.compare(this, e) === 0
      }),
      (c.prototype.inspect = function () {
        let e = ''
        const t = r.INSPECT_MAX_BYTES
        return (
          (e = this.toString('hex', 0, t)
            .replace(/(.{2})/g, '$1 ')
            .trim()),
          this.length > t && (e += ' ... '),
          '<Buffer ' + e + '>'
        )
      }),
      s && (c.prototype[s] = c.prototype.inspect),
      (c.prototype.compare = function (e, t, a, h, p) {
        if ((Q(e, l) && (e = c.from(e, e.offset, e.byteLength)), !c.isBuffer(e)))
          throw new TypeError(
            'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
              typeof e
          )
        if (
          (t === void 0 && (t = 0),
          a === void 0 && (a = e ? e.length : 0),
          h === void 0 && (h = 0),
          p === void 0 && (p = this.length),
          t < 0 || a > e.length || h < 0 || p > this.length)
        )
          throw new RangeError('out of range index')
        if (h >= p && t >= a) return 0
        if (h >= p) return -1
        if (t >= a) return 1
        if (((t >>>= 0), (a >>>= 0), (h >>>= 0), (p >>>= 0), this === e)) return 0
        let y = p - h,
          A = a - t
        const O = Math.min(y, A),
          I = this.slice(h, p),
          N = e.slice(t, a)
        for (let F = 0; F < O; ++F)
          if (I[F] !== N[F]) {
            ;((y = I[F]), (A = N[F]))
            break
          }
        return y < A ? -1 : A < y ? 1 : 0
      }))
    function Ee(o, e, t, a, h) {
      if (o.length === 0) return -1
      if (
        (typeof t == 'string'
          ? ((a = t), (t = 0))
          : t > 2147483647
            ? (t = 2147483647)
            : t < -2147483648 && (t = -2147483648),
        (t = +t),
        tt(t) && (t = h ? 0 : o.length - 1),
        t < 0 && (t = o.length + t),
        t >= o.length)
      ) {
        if (h) return -1
        t = o.length - 1
      } else if (t < 0)
        if (h) t = 0
        else return -1
      if ((typeof e == 'string' && (e = c.from(e, a)), c.isBuffer(e)))
        return e.length === 0 ? -1 : Kt(o, e, t, a, h)
      if (typeof e == 'number')
        return (
          (e = e & 255),
          typeof l.prototype.indexOf == 'function'
            ? h
              ? l.prototype.indexOf.call(o, e, t)
              : l.prototype.lastIndexOf.call(o, e, t)
            : Kt(o, [e], t, a, h)
        )
      throw new TypeError('val must be string, number or Buffer')
    }
    function Kt(o, e, t, a, h) {
      let p = 1,
        y = o.length,
        A = e.length
      if (
        a !== void 0 &&
        ((a = String(a).toLowerCase()),
        a === 'ucs2' || a === 'ucs-2' || a === 'utf16le' || a === 'utf-16le')
      ) {
        if (o.length < 2 || e.length < 2) return -1
        ;((p = 2), (y /= 2), (A /= 2), (t /= 2))
      }
      function O(N, F) {
        return p === 1 ? N[F] : N.readUInt16BE(F * p)
      }
      let I
      if (h) {
        let N = -1
        for (I = t; I < y; I++)
          if (O(o, I) === O(e, N === -1 ? 0 : I - N)) {
            if ((N === -1 && (N = I), I - N + 1 === A)) return N * p
          } else (N !== -1 && (I -= I - N), (N = -1))
      } else
        for (t + A > y && (t = y - A), I = t; I >= 0; I--) {
          let N = !0
          for (let F = 0; F < A; F++)
            if (O(o, I + F) !== O(e, F)) {
              N = !1
              break
            }
          if (N) return I
        }
      return -1
    }
    ;((c.prototype.includes = function (e, t, a) {
      return this.indexOf(e, t, a) !== -1
    }),
      (c.prototype.indexOf = function (e, t, a) {
        return Ee(this, e, t, a, !0)
      }),
      (c.prototype.lastIndexOf = function (e, t, a) {
        return Ee(this, e, t, a, !1)
      }))
    function Xn(o, e, t, a) {
      t = Number(t) || 0
      const h = o.length - t
      a ? ((a = Number(a)), a > h && (a = h)) : (a = h)
      const p = e.length
      a > p / 2 && (a = p / 2)
      let y
      for (y = 0; y < a; ++y) {
        const A = parseInt(e.substr(y * 2, 2), 16)
        if (tt(A)) return y
        o[t + y] = A
      }
      return y
    }
    function Yn(o, e, t, a) {
      return Le(et(e, o.length - t), o, t, a)
    }
    function Qn(o, e, t, a) {
      return Le(ci(e), o, t, a)
    }
    function Zn(o, e, t, a) {
      return Le(nr(e), o, t, a)
    }
    function vn(o, e, t, a) {
      return Le(li(e, o.length - t), o, t, a)
    }
    ;((c.prototype.write = function (e, t, a, h) {
      if (t === void 0) ((h = 'utf8'), (a = this.length), (t = 0))
      else if (a === void 0 && typeof t == 'string') ((h = t), (a = this.length), (t = 0))
      else if (isFinite(t))
        ((t = t >>> 0),
          isFinite(a) ? ((a = a >>> 0), h === void 0 && (h = 'utf8')) : ((h = a), (a = void 0)))
      else
        throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported')
      const p = this.length - t
      if (
        ((a === void 0 || a > p) && (a = p), (e.length > 0 && (a < 0 || t < 0)) || t > this.length)
      )
        throw new RangeError('Attempt to write outside buffer bounds')
      h || (h = 'utf8')
      let y = !1
      for (;;)
        switch (h) {
          case 'hex':
            return Xn(this, e, t, a)
          case 'utf8':
          case 'utf-8':
            return Yn(this, e, t, a)
          case 'ascii':
          case 'latin1':
          case 'binary':
            return Qn(this, e, t, a)
          case 'base64':
            return Zn(this, e, t, a)
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return vn(this, e, t, a)
          default:
            if (y) throw new TypeError('Unknown encoding: ' + h)
            ;((h = ('' + h).toLowerCase()), (y = !0))
        }
    }),
      (c.prototype.toJSON = function () {
        return { type: 'Buffer', data: Array.prototype.slice.call(this._arr || this, 0) }
      }))
    function ei(o, e, t) {
      return e === 0 && t === o.length ? n.fromByteArray(o) : n.fromByteArray(o.slice(e, t))
    }
    function Gt(o, e, t) {
      t = Math.min(o.length, t)
      const a = []
      let h = e
      for (; h < t; ) {
        const p = o[h]
        let y = null,
          A = p > 239 ? 4 : p > 223 ? 3 : p > 191 ? 2 : 1
        if (h + A <= t) {
          let O, I, N, F
          switch (A) {
            case 1:
              p < 128 && (y = p)
              break
            case 2:
              ;((O = o[h + 1]),
                (O & 192) === 128 && ((F = ((p & 31) << 6) | (O & 63)), F > 127 && (y = F)))
              break
            case 3:
              ;((O = o[h + 1]),
                (I = o[h + 2]),
                (O & 192) === 128 &&
                  (I & 192) === 128 &&
                  ((F = ((p & 15) << 12) | ((O & 63) << 6) | (I & 63)),
                  F > 2047 && (F < 55296 || F > 57343) && (y = F)))
              break
            case 4:
              ;((O = o[h + 1]),
                (I = o[h + 2]),
                (N = o[h + 3]),
                (O & 192) === 128 &&
                  (I & 192) === 128 &&
                  (N & 192) === 128 &&
                  ((F = ((p & 15) << 18) | ((O & 63) << 12) | ((I & 63) << 6) | (N & 63)),
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
      return ti(a)
    }
    const Xt = 4096
    function ti(o) {
      const e = o.length
      if (e <= Xt) return String.fromCharCode.apply(String, o)
      let t = '',
        a = 0
      for (; a < e; ) t += String.fromCharCode.apply(String, o.slice(a, (a += Xt)))
      return t
    }
    function ri(o, e, t) {
      let a = ''
      t = Math.min(o.length, t)
      for (let h = e; h < t; ++h) a += String.fromCharCode(o[h] & 127)
      return a
    }
    function ni(o, e, t) {
      let a = ''
      t = Math.min(o.length, t)
      for (let h = e; h < t; ++h) a += String.fromCharCode(o[h])
      return a
    }
    function ii(o, e, t) {
      const a = o.length
      ;((!e || e < 0) && (e = 0), (!t || t < 0 || t > a) && (t = a))
      let h = ''
      for (let p = e; p < t; ++p) h += fi[o[p]]
      return h
    }
    function oi(o, e, t) {
      const a = o.slice(e, t)
      let h = ''
      for (let p = 0; p < a.length - 1; p += 2) h += String.fromCharCode(a[p] + a[p + 1] * 256)
      return h
    }
    c.prototype.slice = function (e, t) {
      const a = this.length
      ;((e = ~~e),
        (t = t === void 0 ? a : ~~t),
        e < 0 ? ((e += a), e < 0 && (e = 0)) : e > a && (e = a),
        t < 0 ? ((t += a), t < 0 && (t = 0)) : t > a && (t = a),
        t < e && (t = e))
      const h = this.subarray(e, t)
      return (Object.setPrototypeOf(h, c.prototype), h)
    }
    function k(o, e, t) {
      if (o % 1 !== 0 || o < 0) throw new RangeError('offset is not uint')
      if (o + e > t) throw new RangeError('Trying to access beyond buffer length')
    }
    ;((c.prototype.readUintLE = c.prototype.readUIntLE =
      function (e, t, a) {
        ;((e = e >>> 0), (t = t >>> 0), a || k(e, t, this.length))
        let h = this[e],
          p = 1,
          y = 0
        for (; ++y < t && (p *= 256); ) h += this[e + y] * p
        return h
      }),
      (c.prototype.readUintBE = c.prototype.readUIntBE =
        function (e, t, a) {
          ;((e = e >>> 0), (t = t >>> 0), a || k(e, t, this.length))
          let h = this[e + --t],
            p = 1
          for (; t > 0 && (p *= 256); ) h += this[e + --t] * p
          return h
        }),
      (c.prototype.readUint8 = c.prototype.readUInt8 =
        function (e, t) {
          return ((e = e >>> 0), t || k(e, 1, this.length), this[e])
        }),
      (c.prototype.readUint16LE = c.prototype.readUInt16LE =
        function (e, t) {
          return ((e = e >>> 0), t || k(e, 2, this.length), this[e] | (this[e + 1] << 8))
        }),
      (c.prototype.readUint16BE = c.prototype.readUInt16BE =
        function (e, t) {
          return ((e = e >>> 0), t || k(e, 2, this.length), (this[e] << 8) | this[e + 1])
        }),
      (c.prototype.readUint32LE = c.prototype.readUInt32LE =
        function (e, t) {
          return (
            (e = e >>> 0),
            t || k(e, 4, this.length),
            (this[e] | (this[e + 1] << 8) | (this[e + 2] << 16)) + this[e + 3] * 16777216
          )
        }),
      (c.prototype.readUint32BE = c.prototype.readUInt32BE =
        function (e, t) {
          return (
            (e = e >>> 0),
            t || k(e, 4, this.length),
            this[e] * 16777216 + ((this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3])
          )
        }),
      (c.prototype.readBigUInt64LE = re(function (e) {
        ;((e = e >>> 0), he(e, 'offset'))
        const t = this[e],
          a = this[e + 7]
        ;(t === void 0 || a === void 0) && ge(e, this.length - 8)
        const h = t + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + this[++e] * 2 ** 24,
          p = this[++e] + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + a * 2 ** 24
        return BigInt(h) + (BigInt(p) << BigInt(32))
      })),
      (c.prototype.readBigUInt64BE = re(function (e) {
        ;((e = e >>> 0), he(e, 'offset'))
        const t = this[e],
          a = this[e + 7]
        ;(t === void 0 || a === void 0) && ge(e, this.length - 8)
        const h = t * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + this[++e],
          p = this[++e] * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + a
        return (BigInt(h) << BigInt(32)) + BigInt(p)
      })),
      (c.prototype.readIntLE = function (e, t, a) {
        ;((e = e >>> 0), (t = t >>> 0), a || k(e, t, this.length))
        let h = this[e],
          p = 1,
          y = 0
        for (; ++y < t && (p *= 256); ) h += this[e + y] * p
        return ((p *= 128), h >= p && (h -= Math.pow(2, 8 * t)), h)
      }),
      (c.prototype.readIntBE = function (e, t, a) {
        ;((e = e >>> 0), (t = t >>> 0), a || k(e, t, this.length))
        let h = t,
          p = 1,
          y = this[e + --h]
        for (; h > 0 && (p *= 256); ) y += this[e + --h] * p
        return ((p *= 128), y >= p && (y -= Math.pow(2, 8 * t)), y)
      }),
      (c.prototype.readInt8 = function (e, t) {
        return (
          (e = e >>> 0),
          t || k(e, 1, this.length),
          this[e] & 128 ? (255 - this[e] + 1) * -1 : this[e]
        )
      }),
      (c.prototype.readInt16LE = function (e, t) {
        ;((e = e >>> 0), t || k(e, 2, this.length))
        const a = this[e] | (this[e + 1] << 8)
        return a & 32768 ? a | 4294901760 : a
      }),
      (c.prototype.readInt16BE = function (e, t) {
        ;((e = e >>> 0), t || k(e, 2, this.length))
        const a = this[e + 1] | (this[e] << 8)
        return a & 32768 ? a | 4294901760 : a
      }),
      (c.prototype.readInt32LE = function (e, t) {
        return (
          (e = e >>> 0),
          t || k(e, 4, this.length),
          this[e] | (this[e + 1] << 8) | (this[e + 2] << 16) | (this[e + 3] << 24)
        )
      }),
      (c.prototype.readInt32BE = function (e, t) {
        return (
          (e = e >>> 0),
          t || k(e, 4, this.length),
          (this[e] << 24) | (this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3]
        )
      }),
      (c.prototype.readBigInt64LE = re(function (e) {
        ;((e = e >>> 0), he(e, 'offset'))
        const t = this[e],
          a = this[e + 7]
        ;(t === void 0 || a === void 0) && ge(e, this.length - 8)
        const h = this[e + 4] + this[e + 5] * 2 ** 8 + this[e + 6] * 2 ** 16 + (a << 24)
        return (
          (BigInt(h) << BigInt(32)) +
          BigInt(t + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + this[++e] * 2 ** 24)
        )
      })),
      (c.prototype.readBigInt64BE = re(function (e) {
        ;((e = e >>> 0), he(e, 'offset'))
        const t = this[e],
          a = this[e + 7]
        ;(t === void 0 || a === void 0) && ge(e, this.length - 8)
        const h = (t << 24) + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + this[++e]
        return (
          (BigInt(h) << BigInt(32)) +
          BigInt(this[++e] * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + a)
        )
      })),
      (c.prototype.readFloatLE = function (e, t) {
        return ((e = e >>> 0), t || k(e, 4, this.length), i.read(this, e, !0, 23, 4))
      }),
      (c.prototype.readFloatBE = function (e, t) {
        return ((e = e >>> 0), t || k(e, 4, this.length), i.read(this, e, !1, 23, 4))
      }),
      (c.prototype.readDoubleLE = function (e, t) {
        return ((e = e >>> 0), t || k(e, 8, this.length), i.read(this, e, !0, 52, 8))
      }),
      (c.prototype.readDoubleBE = function (e, t) {
        return ((e = e >>> 0), t || k(e, 8, this.length), i.read(this, e, !1, 52, 8))
      }))
    function $(o, e, t, a, h, p) {
      if (!c.isBuffer(o)) throw new TypeError('"buffer" argument must be a Buffer instance')
      if (e > h || e < p) throw new RangeError('"value" argument is out of bounds')
      if (t + a > o.length) throw new RangeError('Index out of range')
    }
    ;((c.prototype.writeUintLE = c.prototype.writeUIntLE =
      function (e, t, a, h) {
        if (((e = +e), (t = t >>> 0), (a = a >>> 0), !h)) {
          const A = Math.pow(2, 8 * a) - 1
          $(this, e, t, a, A, 0)
        }
        let p = 1,
          y = 0
        for (this[t] = e & 255; ++y < a && (p *= 256); ) this[t + y] = (e / p) & 255
        return t + a
      }),
      (c.prototype.writeUintBE = c.prototype.writeUIntBE =
        function (e, t, a, h) {
          if (((e = +e), (t = t >>> 0), (a = a >>> 0), !h)) {
            const A = Math.pow(2, 8 * a) - 1
            $(this, e, t, a, A, 0)
          }
          let p = a - 1,
            y = 1
          for (this[t + p] = e & 255; --p >= 0 && (y *= 256); ) this[t + p] = (e / y) & 255
          return t + a
        }),
      (c.prototype.writeUint8 = c.prototype.writeUInt8 =
        function (e, t, a) {
          return (
            (e = +e),
            (t = t >>> 0),
            a || $(this, e, t, 1, 255, 0),
            (this[t] = e & 255),
            t + 1
          )
        }),
      (c.prototype.writeUint16LE = c.prototype.writeUInt16LE =
        function (e, t, a) {
          return (
            (e = +e),
            (t = t >>> 0),
            a || $(this, e, t, 2, 65535, 0),
            (this[t] = e & 255),
            (this[t + 1] = e >>> 8),
            t + 2
          )
        }),
      (c.prototype.writeUint16BE = c.prototype.writeUInt16BE =
        function (e, t, a) {
          return (
            (e = +e),
            (t = t >>> 0),
            a || $(this, e, t, 2, 65535, 0),
            (this[t] = e >>> 8),
            (this[t + 1] = e & 255),
            t + 2
          )
        }),
      (c.prototype.writeUint32LE = c.prototype.writeUInt32LE =
        function (e, t, a) {
          return (
            (e = +e),
            (t = t >>> 0),
            a || $(this, e, t, 4, 4294967295, 0),
            (this[t + 3] = e >>> 24),
            (this[t + 2] = e >>> 16),
            (this[t + 1] = e >>> 8),
            (this[t] = e & 255),
            t + 4
          )
        }),
      (c.prototype.writeUint32BE = c.prototype.writeUInt32BE =
        function (e, t, a) {
          return (
            (e = +e),
            (t = t >>> 0),
            a || $(this, e, t, 4, 4294967295, 0),
            (this[t] = e >>> 24),
            (this[t + 1] = e >>> 16),
            (this[t + 2] = e >>> 8),
            (this[t + 3] = e & 255),
            t + 4
          )
        }))
    function Yt(o, e, t, a, h) {
      rr(e, a, h, o, t, 7)
      let p = Number(e & BigInt(4294967295))
      ;((o[t++] = p),
        (p = p >> 8),
        (o[t++] = p),
        (p = p >> 8),
        (o[t++] = p),
        (p = p >> 8),
        (o[t++] = p))
      let y = Number((e >> BigInt(32)) & BigInt(4294967295))
      return (
        (o[t++] = y),
        (y = y >> 8),
        (o[t++] = y),
        (y = y >> 8),
        (o[t++] = y),
        (y = y >> 8),
        (o[t++] = y),
        t
      )
    }
    function Qt(o, e, t, a, h) {
      rr(e, a, h, o, t, 7)
      let p = Number(e & BigInt(4294967295))
      ;((o[t + 7] = p),
        (p = p >> 8),
        (o[t + 6] = p),
        (p = p >> 8),
        (o[t + 5] = p),
        (p = p >> 8),
        (o[t + 4] = p))
      let y = Number((e >> BigInt(32)) & BigInt(4294967295))
      return (
        (o[t + 3] = y),
        (y = y >> 8),
        (o[t + 2] = y),
        (y = y >> 8),
        (o[t + 1] = y),
        (y = y >> 8),
        (o[t] = y),
        t + 8
      )
    }
    ;((c.prototype.writeBigUInt64LE = re(function (e, t = 0) {
      return Yt(this, e, t, BigInt(0), BigInt('0xffffffffffffffff'))
    })),
      (c.prototype.writeBigUInt64BE = re(function (e, t = 0) {
        return Qt(this, e, t, BigInt(0), BigInt('0xffffffffffffffff'))
      })),
      (c.prototype.writeIntLE = function (e, t, a, h) {
        if (((e = +e), (t = t >>> 0), !h)) {
          const O = Math.pow(2, 8 * a - 1)
          $(this, e, t, a, O - 1, -O)
        }
        let p = 0,
          y = 1,
          A = 0
        for (this[t] = e & 255; ++p < a && (y *= 256); )
          (e < 0 && A === 0 && this[t + p - 1] !== 0 && (A = 1),
            (this[t + p] = (((e / y) >> 0) - A) & 255))
        return t + a
      }),
      (c.prototype.writeIntBE = function (e, t, a, h) {
        if (((e = +e), (t = t >>> 0), !h)) {
          const O = Math.pow(2, 8 * a - 1)
          $(this, e, t, a, O - 1, -O)
        }
        let p = a - 1,
          y = 1,
          A = 0
        for (this[t + p] = e & 255; --p >= 0 && (y *= 256); )
          (e < 0 && A === 0 && this[t + p + 1] !== 0 && (A = 1),
            (this[t + p] = (((e / y) >> 0) - A) & 255))
        return t + a
      }),
      (c.prototype.writeInt8 = function (e, t, a) {
        return (
          (e = +e),
          (t = t >>> 0),
          a || $(this, e, t, 1, 127, -128),
          e < 0 && (e = 255 + e + 1),
          (this[t] = e & 255),
          t + 1
        )
      }),
      (c.prototype.writeInt16LE = function (e, t, a) {
        return (
          (e = +e),
          (t = t >>> 0),
          a || $(this, e, t, 2, 32767, -32768),
          (this[t] = e & 255),
          (this[t + 1] = e >>> 8),
          t + 2
        )
      }),
      (c.prototype.writeInt16BE = function (e, t, a) {
        return (
          (e = +e),
          (t = t >>> 0),
          a || $(this, e, t, 2, 32767, -32768),
          (this[t] = e >>> 8),
          (this[t + 1] = e & 255),
          t + 2
        )
      }),
      (c.prototype.writeInt32LE = function (e, t, a) {
        return (
          (e = +e),
          (t = t >>> 0),
          a || $(this, e, t, 4, 2147483647, -2147483648),
          (this[t] = e & 255),
          (this[t + 1] = e >>> 8),
          (this[t + 2] = e >>> 16),
          (this[t + 3] = e >>> 24),
          t + 4
        )
      }),
      (c.prototype.writeInt32BE = function (e, t, a) {
        return (
          (e = +e),
          (t = t >>> 0),
          a || $(this, e, t, 4, 2147483647, -2147483648),
          e < 0 && (e = 4294967295 + e + 1),
          (this[t] = e >>> 24),
          (this[t + 1] = e >>> 16),
          (this[t + 2] = e >>> 8),
          (this[t + 3] = e & 255),
          t + 4
        )
      }),
      (c.prototype.writeBigInt64LE = re(function (e, t = 0) {
        return Yt(this, e, t, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
      })),
      (c.prototype.writeBigInt64BE = re(function (e, t = 0) {
        return Qt(this, e, t, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
      })))
    function Zt(o, e, t, a, h, p) {
      if (t + a > o.length) throw new RangeError('Index out of range')
      if (t < 0) throw new RangeError('Index out of range')
    }
    function vt(o, e, t, a, h) {
      return ((e = +e), (t = t >>> 0), h || Zt(o, e, t, 4), i.write(o, e, t, a, 23, 4), t + 4)
    }
    ;((c.prototype.writeFloatLE = function (e, t, a) {
      return vt(this, e, t, !0, a)
    }),
      (c.prototype.writeFloatBE = function (e, t, a) {
        return vt(this, e, t, !1, a)
      }))
    function er(o, e, t, a, h) {
      return ((e = +e), (t = t >>> 0), h || Zt(o, e, t, 8), i.write(o, e, t, a, 52, 8), t + 8)
    }
    ;((c.prototype.writeDoubleLE = function (e, t, a) {
      return er(this, e, t, !0, a)
    }),
      (c.prototype.writeDoubleBE = function (e, t, a) {
        return er(this, e, t, !1, a)
      }),
      (c.prototype.copy = function (e, t, a, h) {
        if (!c.isBuffer(e)) throw new TypeError('argument should be a Buffer')
        if (
          (a || (a = 0),
          !h && h !== 0 && (h = this.length),
          t >= e.length && (t = e.length),
          t || (t = 0),
          h > 0 && h < a && (h = a),
          h === a || e.length === 0 || this.length === 0)
        )
          return 0
        if (t < 0) throw new RangeError('targetStart out of bounds')
        if (a < 0 || a >= this.length) throw new RangeError('Index out of range')
        if (h < 0) throw new RangeError('sourceEnd out of bounds')
        ;(h > this.length && (h = this.length), e.length - t < h - a && (h = e.length - t + a))
        const p = h - a
        return (
          this === e && typeof l.prototype.copyWithin == 'function'
            ? this.copyWithin(t, a, h)
            : l.prototype.set.call(e, this.subarray(a, h), t),
          p
        )
      }),
      (c.prototype.fill = function (e, t, a, h) {
        if (typeof e == 'string') {
          if (
            (typeof t == 'string'
              ? ((h = t), (t = 0), (a = this.length))
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
        if (t < 0 || this.length < t || this.length < a) throw new RangeError('Out of range index')
        if (a <= t) return this
        ;((t = t >>> 0), (a = a === void 0 ? this.length : a >>> 0), e || (e = 0))
        let p
        if (typeof e == 'number') for (p = t; p < a; ++p) this[p] = e
        else {
          const y = c.isBuffer(e) ? e : c.from(e, h),
            A = y.length
          if (A === 0) throw new TypeError('The value "' + e + '" is invalid for argument "value"')
          for (p = 0; p < a - t; ++p) this[p + t] = y[p % A]
        }
        return this
      }))
    const fe = {}
    function ve(o, e, t) {
      fe[o] = class extends t {
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
    ;(ve(
      'ERR_BUFFER_OUT_OF_BOUNDS',
      function (o) {
        return o
          ? `${o} is outside of buffer bounds`
          : 'Attempt to access memory outside buffer bounds'
      },
      RangeError
    ),
      ve(
        'ERR_INVALID_ARG_TYPE',
        function (o, e) {
          return `The "${o}" argument must be of type number. Received type ${typeof e}`
        },
        TypeError
      ),
      ve(
        'ERR_OUT_OF_RANGE',
        function (o, e, t) {
          let a = `The value of "${o}" is out of range.`,
            h = t
          return (
            Number.isInteger(t) && Math.abs(t) > 2 ** 32
              ? (h = tr(String(t)))
              : typeof t == 'bigint' &&
                ((h = String(t)),
                (t > BigInt(2) ** BigInt(32) || t < -(BigInt(2) ** BigInt(32))) && (h = tr(h)),
                (h += 'n')),
            (a += ` It must be ${e}. Received ${h}`),
            a
          )
        },
        RangeError
      ))
    function tr(o) {
      let e = '',
        t = o.length
      const a = o[0] === '-' ? 1 : 0
      for (; t >= a + 4; t -= 3) e = `_${o.slice(t - 3, t)}${e}`
      return `${o.slice(0, t)}${e}`
    }
    function si(o, e, t) {
      ;(he(e, 'offset'), (o[e] === void 0 || o[e + t] === void 0) && ge(e, o.length - (t + 1)))
    }
    function rr(o, e, t, a, h, p) {
      if (o > t || o < e) {
        const y = typeof e == 'bigint' ? 'n' : ''
        let A
        throw (
          e === 0 || e === BigInt(0)
            ? (A = `>= 0${y} and < 2${y} ** ${(p + 1) * 8}${y}`)
            : (A = `>= -(2${y} ** ${(p + 1) * 8 - 1}${y}) and < 2 ** ${(p + 1) * 8 - 1}${y}`),
          new fe.ERR_OUT_OF_RANGE('value', A, o)
        )
      }
      si(a, h, p)
    }
    function he(o, e) {
      if (typeof o != 'number') throw new fe.ERR_INVALID_ARG_TYPE(e, 'number', o)
    }
    function ge(o, e, t) {
      throw Math.floor(o) !== o
        ? (he(o, t), new fe.ERR_OUT_OF_RANGE('offset', 'an integer', o))
        : e < 0
          ? new fe.ERR_BUFFER_OUT_OF_BOUNDS()
          : new fe.ERR_OUT_OF_RANGE('offset', `>= 0 and <= ${e}`, o)
    }
    const ai = /[^+/0-9A-Za-z-_]/g
    function ui(o) {
      if (((o = o.split('=')[0]), (o = o.trim().replace(ai, '')), o.length < 2)) return ''
      for (; o.length % 4 !== 0; ) o = o + '='
      return o
    }
    function et(o, e) {
      e = e || 1 / 0
      let t
      const a = o.length
      let h = null
      const p = []
      for (let y = 0; y < a; ++y) {
        if (((t = o.charCodeAt(y)), t > 55295 && t < 57344)) {
          if (!h) {
            if (t > 56319) {
              ;(e -= 3) > -1 && p.push(239, 191, 189)
              continue
            } else if (y + 1 === a) {
              ;(e -= 3) > -1 && p.push(239, 191, 189)
              continue
            }
            h = t
            continue
          }
          if (t < 56320) {
            ;((e -= 3) > -1 && p.push(239, 191, 189), (h = t))
            continue
          }
          t = (((h - 55296) << 10) | (t - 56320)) + 65536
        } else h && (e -= 3) > -1 && p.push(239, 191, 189)
        if (((h = null), t < 128)) {
          if ((e -= 1) < 0) break
          p.push(t)
        } else if (t < 2048) {
          if ((e -= 2) < 0) break
          p.push((t >> 6) | 192, (t & 63) | 128)
        } else if (t < 65536) {
          if ((e -= 3) < 0) break
          p.push((t >> 12) | 224, ((t >> 6) & 63) | 128, (t & 63) | 128)
        } else if (t < 1114112) {
          if ((e -= 4) < 0) break
          p.push((t >> 18) | 240, ((t >> 12) & 63) | 128, ((t >> 6) & 63) | 128, (t & 63) | 128)
        } else throw new Error('Invalid code point')
      }
      return p
    }
    function ci(o) {
      const e = []
      for (let t = 0; t < o.length; ++t) e.push(o.charCodeAt(t) & 255)
      return e
    }
    function li(o, e) {
      let t, a, h
      const p = []
      for (let y = 0; y < o.length && !((e -= 2) < 0); ++y)
        ((t = o.charCodeAt(y)), (a = t >> 8), (h = t % 256), p.push(h), p.push(a))
      return p
    }
    function nr(o) {
      return n.toByteArray(ui(o))
    }
    function Le(o, e, t, a) {
      let h
      for (h = 0; h < a && !(h + t >= e.length || h >= o.length); ++h) e[h + t] = o[h]
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
    function tt(o) {
      return o !== o
    }
    const fi = (function () {
      const o = '0123456789abcdef',
        e = new Array(256)
      for (let t = 0; t < 16; ++t) {
        const a = t * 16
        for (let h = 0; h < 16; ++h) e[a + h] = o[t] + o[h]
      }
      return e
    })()
    function re(o) {
      return typeof BigInt > 'u' ? hi : o
    }
    function hi() {
      throw new Error('BigInt not supported')
    }
  })(yt)
  const rn = yt.Buffer
  function R(r, n, i, s, u) {
    ;(Error.call(this),
      Error.captureStackTrace
        ? Error.captureStackTrace(this, this.constructor)
        : (this.stack = new Error().stack),
      (this.message = r),
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
  const Et = R.prototype,
    gt = {}
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
  ].forEach((r) => {
    gt[r] = { value: r }
  }),
    Object.defineProperties(R, gt),
    Object.defineProperty(Et, 'isAxiosError', { value: !0 }),
    (R.from = (r, n, i, s, u, l) => {
      const f = Object.create(Et)
      return (
        d.toFlatObject(
          r,
          f,
          function (E) {
            return E !== Error.prototype
          },
          (m) => m !== 'isAxiosError'
        ),
        R.call(f, r.message, n, i, s, u),
        (f.cause = r),
        (f.name = r.name),
        l && Object.assign(f, l),
        f
      )
    }))
  var nn = null
  function $e(r) {
    return d.isPlainObject(r) || d.isArray(r)
  }
  function xt(r) {
    return d.endsWith(r, '[]') ? r.slice(0, -2) : r
  }
  function bt(r, n, i) {
    return r
      ? r
          .concat(n)
          .map(function (u, l) {
            return ((u = xt(u)), !i && l ? '[' + u + ']' : u)
          })
          .join(i ? '.' : '')
      : n
  }
  function on(r) {
    return d.isArray(r) && !r.some($e)
  }
  const sn = d.toFlatObject(d, {}, null, function (n) {
    return /^is[A-Z]/.test(n)
  })
  function Fe(r, n, i) {
    if (!d.isObject(r)) throw new TypeError('target must be an object')
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
          : rn.from(x)
        : x
    }
    function c(x, B, b) {
      let C = x
      if (x && !b && typeof x == 'object') {
        if (d.endsWith(B, '{}')) ((B = s ? B : B.slice(0, -2)), (x = JSON.stringify(x)))
        else if (
          (d.isArray(x) && on(x)) ||
          ((d.isFileList(x) || d.endsWith(B, '[]')) && (C = d.toArray(x)))
        )
          return (
            (B = xt(B)),
            C.forEach(function (P, H) {
              !(d.isUndefined(P) || P === null) &&
                n.append(f === !0 ? bt([B], H, l) : f === null ? B : B + '[]', w(P))
            }),
            !1
          )
      }
      return $e(x) ? !0 : (n.append(bt(b, B, l), w(x)), !1)
    }
    const g = [],
      T = Object.assign(sn, { defaultVisitor: c, convertValue: w, isVisitable: $e })
    function S(x, B) {
      if (!d.isUndefined(x)) {
        if (g.indexOf(x) !== -1) throw Error('Circular reference detected in ' + B.join('.'))
        ;(g.push(x),
          d.forEach(x, function (C, U) {
            ;(!(d.isUndefined(C) || C === null) &&
              u.call(n, C, d.isString(U) ? U.trim() : U, B, T)) === !0 &&
              S(C, B ? B.concat(U) : [U])
          }),
          g.pop())
      }
    }
    if (!d.isObject(r)) throw new TypeError('data must be an object')
    return (S(r), n)
  }
  function Bt(r) {
    const n = {
      '!': '%21',
      "'": '%27',
      '(': '%28',
      ')': '%29',
      '~': '%7E',
      '%20': '+',
      '%00': '\0',
    }
    return encodeURIComponent(r).replace(/[!'()~]|%20|%00/g, function (s) {
      return n[s]
    })
  }
  function He(r, n) {
    ;((this._pairs = []), r && Fe(r, this, n))
  }
  const Rt = He.prototype
  ;((Rt.append = function (n, i) {
    this._pairs.push([n, i])
  }),
    (Rt.toString = function (n) {
      const i = n
        ? function (s) {
            return n.call(this, s, Bt)
          }
        : Bt
      return this._pairs
        .map(function (u) {
          return i(u[0]) + '=' + i(u[1])
        }, '')
        .join('&')
    }))
  function an(r) {
    return encodeURIComponent(r)
      .replace(/%3A/gi, ':')
      .replace(/%24/g, '$')
      .replace(/%2C/gi, ',')
      .replace(/%20/g, '+')
      .replace(/%5B/gi, '[')
      .replace(/%5D/gi, ']')
  }
  function Tt(r, n, i) {
    if (!n) return r
    const s = (i && i.encode) || an
    d.isFunction(i) && (i = { serialize: i })
    const u = i && i.serialize
    let l
    if (
      (u ? (l = u(n, i)) : (l = d.isURLSearchParams(n) ? n.toString() : new He(n, i).toString(s)),
      l)
    ) {
      const f = r.indexOf('#')
      ;(f !== -1 && (r = r.slice(0, f)), (r += (r.indexOf('?') === -1 ? '?' : '&') + l))
    }
    return r
  }
  class At {
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
  var St = { silentJSONParsing: !0, forcedJSONParsing: !0, clarifyTimeoutError: !1 },
    un = typeof URLSearchParams < 'u' ? URLSearchParams : He,
    cn = typeof FormData < 'u' ? FormData : null,
    ln = typeof Blob < 'u' ? Blob : null,
    fn = {
      isBrowser: !0,
      classes: { URLSearchParams: un, FormData: cn, Blob: ln },
      protocols: ['http', 'https', 'file', 'blob', 'url', 'data'],
    }
  const We = typeof window < 'u' && typeof document < 'u',
    ze = (typeof navigator == 'object' && navigator) || void 0,
    hn = We && (!ze || ['ReactNative', 'NativeScript', 'NS'].indexOf(ze.product) < 0),
    pn =
      typeof WorkerGlobalScope < 'u' &&
      self instanceof WorkerGlobalScope &&
      typeof self.importScripts == 'function',
    dn = (We && window.location.href) || 'http://localhost'
  var mn = Object.freeze({
      __proto__: null,
      hasBrowserEnv: We,
      hasStandardBrowserEnv: hn,
      hasStandardBrowserWebWorkerEnv: pn,
      navigator: ze,
      origin: dn,
    }),
    D = { ...mn, ...fn }
  function yn(r, n) {
    return Fe(
      r,
      new D.classes.URLSearchParams(),
      Object.assign(
        {
          visitor: function (i, s, u, l) {
            return D.isNode && d.isBuffer(i)
              ? (this.append(s, i.toString('base64')), !1)
              : l.defaultVisitor.apply(this, arguments)
          },
        },
        n
      )
    )
  }
  function wn(r) {
    return d.matchAll(/\w+|\[(\w*)]/g, r).map((n) => (n[0] === '[]' ? '' : n[1] || n[0]))
  }
  function En(r) {
    const n = {},
      i = Object.keys(r)
    let s
    const u = i.length
    let l
    for (s = 0; s < u; s++) ((l = i[s]), (n[l] = r[l]))
    return n
  }
  function Ft(r) {
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
            n(i, s, u[f], l) && d.isArray(u[f]) && (u[f] = En(u[f])),
            !m)
      )
    }
    if (d.isFormData(r) && d.isFunction(r.entries)) {
      const i = {}
      return (
        d.forEachEntry(r, (s, u) => {
          n(wn(s), u, i, 0)
        }),
        i
      )
    }
    return null
  }
  function gn(r, n, i) {
    if (d.isString(r))
      try {
        return ((n || JSON.parse)(r), d.trim(r))
      } catch (s) {
        if (s.name !== 'SyntaxError') throw s
      }
    return (i || JSON.stringify)(r)
  }
  const me = {
    transitional: St,
    adapter: ['xhr', 'http', 'fetch'],
    transformRequest: [
      function (n, i) {
        const s = i.getContentType() || '',
          u = s.indexOf('application/json') > -1,
          l = d.isObject(n)
        if ((l && d.isHTMLForm(n) && (n = new FormData(n)), d.isFormData(n)))
          return u ? JSON.stringify(Ft(n)) : n
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
            return yn(n, this.formSerializer).toString()
          if ((m = d.isFileList(n)) || s.indexOf('multipart/form-data') > -1) {
            const E = this.env && this.env.FormData
            return Fe(m ? { 'files[]': n } : n, E && new E(), this.formSerializer)
          }
        }
        return l || u ? (i.setContentType('application/json', !1), gn(n)) : n
      },
    ],
    transformResponse: [
      function (n) {
        const i = this.transitional || me.transitional,
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
  d.forEach(['delete', 'get', 'head', 'post', 'put', 'patch'], (r) => {
    me.headers[r] = {}
  })
  const xn = d.toObjectSet([
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
  var bn = (r) => {
    const n = {}
    let i, s, u
    return (
      r &&
        r
          .split(
            `
`
          )
          .forEach(function (f) {
            ;((u = f.indexOf(':')),
              (i = f.substring(0, u).trim().toLowerCase()),
              (s = f.substring(u + 1).trim()),
              !(!i || (n[i] && xn[i])) &&
                (i === 'set-cookie'
                  ? n[i]
                    ? n[i].push(s)
                    : (n[i] = [s])
                  : (n[i] = n[i] ? n[i] + ', ' + s : s)))
          }),
      n
    )
  }
  const It = Symbol('internals')
  function ye(r) {
    return r && String(r).trim().toLowerCase()
  }
  function Ie(r) {
    return r === !1 || r == null ? r : d.isArray(r) ? r.map(Ie) : String(r)
  }
  function Bn(r) {
    const n = Object.create(null),
      i = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g
    let s
    for (; (s = i.exec(r)); ) n[s[1]] = s[2]
    return n
  }
  const Rn = (r) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(r.trim())
  function Je(r, n, i, s, u) {
    if (d.isFunction(s)) return s.call(this, n, i)
    if ((u && (n = i), !!d.isString(n))) {
      if (d.isString(s)) return n.indexOf(s) !== -1
      if (d.isRegExp(s)) return s.test(n)
    }
  }
  function Tn(r) {
    return r
      .trim()
      .toLowerCase()
      .replace(/([a-z\d])(\w*)/g, (n, i, s) => i.toUpperCase() + s)
  }
  function An(r, n) {
    const i = d.toCamelCase(' ' + n)
    ;['get', 'set', 'has'].forEach((s) => {
      Object.defineProperty(r, s + i, {
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
        const c = ye(E)
        if (!c) throw new Error('header name must be a non-empty string')
        const g = d.findKey(u, c)
        ;(!g || u[g] === void 0 || w === !0 || (w === void 0 && u[g] !== !1)) && (u[g || E] = Ie(m))
      }
      const f = (m, E) => d.forEach(m, (w, c) => l(w, c, E))
      if (d.isPlainObject(n) || n instanceof this.constructor) f(n, i)
      else if (d.isString(n) && (n = n.trim()) && !Rn(n)) f(bn(n), i)
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
      if (((n = ye(n)), n)) {
        const s = d.findKey(this, n)
        if (s) {
          const u = this[s]
          if (!i) return u
          if (i === !0) return Bn(u)
          if (d.isFunction(i)) return i.call(this, u, s)
          if (d.isRegExp(i)) return i.exec(u)
          throw new TypeError('parser must be boolean|regexp|function')
        }
      }
    }
    has(n, i) {
      if (((n = ye(n)), n)) {
        const s = d.findKey(this, n)
        return !!(s && this[s] !== void 0 && (!i || Je(this, this[s], s, i)))
      }
      return !1
    }
    delete(n, i) {
      const s = this
      let u = !1
      function l(f) {
        if (((f = ye(f)), f)) {
          const m = d.findKey(s, f)
          m && (!i || Je(s, s[m], m, i)) && (delete s[m], (u = !0))
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
        ;(!n || Je(this, this[l], l, n, !0)) && (delete this[l], (u = !0))
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
            ;((i[f] = Ie(u)), delete i[l])
            return
          }
          const m = n ? Tn(l) : String(l).trim()
          ;(m !== l && delete i[l], (i[m] = Ie(u)), (s[m] = !0))
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
      const s = (this[It] = this[It] = { accessors: {} }).accessors,
        u = this.prototype
      function l(f) {
        const m = ye(f)
        s[m] || (An(u, f), (s[m] = !0))
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
    d.reduceDescriptors(j.prototype, ({ value: r }, n) => {
      let i = n[0].toUpperCase() + n.slice(1)
      return {
        get: () => r,
        set(s) {
          this[i] = s
        },
      }
    }),
    d.freezeMethods(j))
  function Ve(r, n) {
    const i = this || me,
      s = n || i,
      u = j.from(s.headers)
    let l = s.data
    return (
      d.forEach(r, function (m) {
        l = m.call(i, l, u.normalize(), n ? n.status : void 0)
      }),
      u.normalize(),
      l
    )
  }
  function Ct(r) {
    return !!(r && r.__CANCEL__)
  }
  function le(r, n, i) {
    ;(R.call(this, r ?? 'canceled', R.ERR_CANCELED, n, i), (this.name = 'CanceledError'))
  }
  d.inherits(le, R, { __CANCEL__: !0 })
  function Ut(r, n, i) {
    const s = i.config.validateStatus
    !i.status || !s || s(i.status)
      ? r(i)
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
  function Sn(r) {
    const n = /^([-+\w]{1,25})(:?\/\/|:)/.exec(r)
    return (n && n[1]) || ''
  }
  function Fn(r, n) {
    r = r || 10
    const i = new Array(r),
      s = new Array(r)
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
        for (; g !== u; ) ((T += i[g++]), (g = g % r))
        if (((u = (u + 1) % r), u === l && (l = (l + 1) % r), w - f < n)) return
        const S = c && w - c
        return S ? Math.round((T * 1e3) / S) : void 0
      }
    )
  }
  function In(r, n) {
    let i = 0,
      s = 1e3 / n,
      u,
      l
    const f = (w, c = Date.now()) => {
      ;((i = c), (u = null), l && (clearTimeout(l), (l = null)), r.apply(null, w))
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
  const Ce = (r, n, i = 3) => {
      let s = 0
      const u = Fn(50, 250)
      return In((l) => {
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
        r(g)
      }, i)
    },
    Ot = (r, n) => {
      const i = r != null
      return [(s) => n[0]({ lengthComputable: i, total: r, loaded: s }), n[1]]
    },
    Nt =
      (r) =>
      (...n) =>
        d.asap(() => r(...n))
  var Cn = D.hasStandardBrowserEnv
      ? ((r, n) => (i) => (
          (i = new URL(i, D.origin)),
          r.protocol === i.protocol && r.host === i.host && (n || r.port === i.port)
        ))(new URL(D.origin), D.navigator && /(msie|trident)/i.test(D.navigator.userAgent))
      : () => !0,
    Un = D.hasStandardBrowserEnv
      ? {
          write(r, n, i, s, u, l) {
            const f = [r + '=' + encodeURIComponent(n)]
            ;(d.isNumber(i) && f.push('expires=' + new Date(i).toGMTString()),
              d.isString(s) && f.push('path=' + s),
              d.isString(u) && f.push('domain=' + u),
              l === !0 && f.push('secure'),
              (document.cookie = f.join('; ')))
          },
          read(r) {
            const n = document.cookie.match(new RegExp('(^|;\\s*)(' + r + ')=([^;]*)'))
            return n ? decodeURIComponent(n[3]) : null
          },
          remove(r) {
            this.write(r, '', Date.now() - 864e5)
          },
        }
      : {
          write() {},
          read() {
            return null
          },
          remove() {},
        }
  function On(r) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(r)
  }
  function Nn(r, n) {
    return n ? r.replace(/\/?\/$/, '') + '/' + n.replace(/^\/+/, '') : r
  }
  function _t(r, n, i) {
    let s = !On(n)
    return r && (s || i == !1) ? Nn(r, n) : n
  }
  const Lt = (r) => (r instanceof j ? { ...r } : r)
  function oe(r, n) {
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
      if (g in r) return s(void 0, w)
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
      headers: (w, c, g) => u(Lt(w), Lt(c), g, !0),
    }
    return (
      d.forEach(Object.keys(Object.assign({}, r, n)), function (c) {
        const g = E[c] || u,
          T = g(r[c], n[c], c)
        ;(d.isUndefined(T) && g !== m) || (i[c] = T)
      }),
      i
    )
  }
  var Pt = (r) => {
      const n = oe({}, r)
      let {
        data: i,
        withXSRFToken: s,
        xsrfHeaderName: u,
        xsrfCookieName: l,
        headers: f,
        auth: m,
      } = n
      ;((n.headers = f = j.from(f)),
        (n.url = Tt(_t(n.baseURL, n.url, n.allowAbsoluteUrls), r.params, r.paramsSerializer)),
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
    _n =
      typeof XMLHttpRequest < 'u' &&
      function (r) {
        return new Promise(function (i, s) {
          const u = Pt(r)
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
          function C() {
            if (!b) return
            const P = j.from('getAllResponseHeaders' in b && b.getAllResponseHeaders()),
              M = {
                data: !m || m === 'text' || m === 'json' ? b.responseText : b.response,
                status: b.status,
                statusText: b.statusText,
                headers: P,
                config: r,
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
            ? (b.onloadend = C)
            : (b.onreadystatechange = function () {
                !b ||
                  b.readyState !== 4 ||
                  (b.status === 0 && !(b.responseURL && b.responseURL.indexOf('file:') === 0)) ||
                  setTimeout(C)
              }),
            (b.onabort = function () {
              b && (s(new R('Request aborted', R.ECONNABORTED, r, b)), (b = null))
            }),
            (b.onerror = function () {
              ;(s(new R('Network Error', R.ERR_NETWORK, r, b)), (b = null))
            }),
            (b.ontimeout = function () {
              let H = u.timeout ? 'timeout of ' + u.timeout + 'ms exceeded' : 'timeout exceeded'
              const M = u.transitional || St
              ;(u.timeoutErrorMessage && (H = u.timeoutErrorMessage),
                s(new R(H, M.clarifyTimeoutError ? R.ETIMEDOUT : R.ECONNABORTED, r, b)),
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
                b && (s(!P || P.type ? new le(null, r, b) : P), b.abort(), (b = null))
              }),
              u.cancelToken && u.cancelToken.subscribe(c),
              u.signal && (u.signal.aborted ? c() : u.signal.addEventListener('abort', c))))
          const U = Sn(u.url)
          if (U && D.protocols.indexOf(U) === -1) {
            s(new R('Unsupported protocol ' + U + ':', R.ERR_BAD_REQUEST, r))
            return
          }
          b.send(l || null)
        })
      }
  const Ln = (r, n) => {
      const { length: i } = (r = r ? r.filter(Boolean) : [])
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
          r &&
            (f && clearTimeout(f),
            (f = null),
            r.forEach((w) => {
              w.unsubscribe ? w.unsubscribe(l) : w.removeEventListener('abort', l)
            }),
            (r = null))
        }
        r.forEach((w) => w.addEventListener('abort', l))
        const { signal: E } = s
        return ((E.unsubscribe = () => d.asap(m)), E)
      }
    },
    Pn = function* (r, n) {
      let i = r.byteLength
      if (i < n) {
        yield r
        return
      }
      let s = 0,
        u
      for (; s < i; ) ((u = s + n), yield r.slice(s, u), (s = u))
    },
    kn = async function* (r, n) {
      for await (const i of Dn(r)) yield* Pn(i, n)
    },
    Dn = async function* (r) {
      if (r[Symbol.asyncIterator]) {
        yield* r
        return
      }
      const n = r.getReader()
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
    kt = (r, n, i, s) => {
      const u = kn(r, n)
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
    Dt = Ue && typeof ReadableStream == 'function',
    Mn =
      Ue &&
      (typeof TextEncoder == 'function'
        ? (
            (r) => (n) =>
              r.encode(n)
          )(new TextEncoder())
        : async (r) => new Uint8Array(await new Response(r).arrayBuffer())),
    Mt = (r, ...n) => {
      try {
        return !!r(...n)
      } catch {
        return !1
      }
    },
    qn =
      Dt &&
      Mt(() => {
        let r = !1
        const n = new Request(D.origin, {
          body: new ReadableStream(),
          method: 'POST',
          get duplex() {
            return ((r = !0), 'half')
          },
        }).headers.has('Content-Type')
        return r && !n
      }),
    qt = 64 * 1024,
    Ke = Dt && Mt(() => d.isReadableStream(new Response('').body)),
    Oe = { stream: Ke && ((r) => r.body) }
  Ue &&
    ((r) => {
      ;['text', 'arrayBuffer', 'blob', 'formData', 'stream'].forEach((n) => {
        !Oe[n] &&
          (Oe[n] = d.isFunction(r[n])
            ? (i) => i[n]()
            : (i, s) => {
                throw new R(`Response type '${n}' is not supported`, R.ERR_NOT_SUPPORT, s)
              })
      })
    })(new Response())
  const jn = async (r) => {
      if (r == null) return 0
      if (d.isBlob(r)) return r.size
      if (d.isSpecCompliantForm(r))
        return (await new Request(D.origin, { method: 'POST', body: r }).arrayBuffer()).byteLength
      if (d.isArrayBufferView(r) || d.isArrayBuffer(r)) return r.byteLength
      if ((d.isURLSearchParams(r) && (r = r + ''), d.isString(r))) return (await Mn(r)).byteLength
    },
    $n = async (r, n) => {
      const i = d.toFiniteNumber(r.getContentLength())
      return i ?? jn(n)
    }
  var Hn =
    Ue &&
    (async (r) => {
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
      } = Pt(r)
      w = w ? (w + '').toLowerCase() : 'text'
      let S = Ln([u, l && l.toAbortSignal()], f),
        x
      const B =
        S &&
        S.unsubscribe &&
        (() => {
          S.unsubscribe()
        })
      let b
      try {
        if (E && qn && i !== 'get' && i !== 'head' && (b = await $n(c, s)) !== 0) {
          let M = new Request(n, { method: 'POST', body: s, duplex: 'half' }),
            V
          if (
            (d.isFormData(s) && (V = M.headers.get('content-type')) && c.setContentType(V), M.body)
          ) {
            const [ee, z] = Ot(b, Ce(Nt(E)))
            s = kt(M.body, qt, ee, z)
          }
        }
        d.isString(g) || (g = g ? 'include' : 'omit')
        const C = 'credentials' in Request.prototype
        x = new Request(n, {
          ...T,
          signal: S,
          method: i.toUpperCase(),
          headers: c.normalize().toJSON(),
          body: s,
          duplex: 'half',
          credentials: C ? g : void 0,
        })
        let U = await fetch(x, T)
        const P = Ke && (w === 'stream' || w === 'response')
        if (Ke && (m || (P && B))) {
          const M = {}
          ;['status', 'statusText', 'headers'].forEach((Ee) => {
            M[Ee] = U[Ee]
          })
          const V = d.toFiniteNumber(U.headers.get('content-length')),
            [ee, z] = (m && Ot(V, Ce(Nt(m), !0))) || []
          U = new Response(
            kt(U.body, qt, ee, () => {
              ;(z && z(), B && B())
            }),
            M
          )
        }
        w = w || 'text'
        let H = await Oe[d.findKey(Oe, w) || 'text'](U, r)
        return (
          !P && B && B(),
          await new Promise((M, V) => {
            Ut(M, V, {
              data: H,
              headers: j.from(U.headers),
              status: U.status,
              statusText: U.statusText,
              config: r,
              request: x,
            })
          })
        )
      } catch (C) {
        throw (
          B && B(),
          C && C.name === 'TypeError' && /Load failed|fetch/i.test(C.message)
            ? Object.assign(new R('Network Error', R.ERR_NETWORK, r, x), { cause: C.cause || C })
            : R.from(C, C && C.code, r, x)
        )
      }
    })
  const Ge = { http: nn, xhr: _n, fetch: Hn }
  d.forEach(Ge, (r, n) => {
    if (r) {
      try {
        Object.defineProperty(r, 'name', { value: n })
      } catch {}
      Object.defineProperty(r, 'adapterName', { value: n })
    }
  })
  const jt = (r) => `- ${r}`,
    Wn = (r) => d.isFunction(r) || r === null || r === !1
  var $t = {
    getAdapter: (r) => {
      r = d.isArray(r) ? r : [r]
      const { length: n } = r
      let i, s
      const u = {}
      for (let l = 0; l < n; l++) {
        i = r[l]
        let f
        if (((s = i), !Wn(i) && ((s = Ge[(f = String(i)).toLowerCase()]), s === void 0)))
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
              l.map(jt).join(`
`)
            : ' ' + jt(l[0])
          : 'as no adapter specified'
        throw new R('There is no suitable adapter to dispatch the request ' + f, 'ERR_NOT_SUPPORT')
      }
      return s
    },
    adapters: Ge,
  }
  function Xe(r) {
    if ((r.cancelToken && r.cancelToken.throwIfRequested(), r.signal && r.signal.aborted))
      throw new le(null, r)
  }
  function Ht(r) {
    return (
      Xe(r),
      (r.headers = j.from(r.headers)),
      (r.data = Ve.call(r, r.transformRequest)),
      ['post', 'put', 'patch'].indexOf(r.method) !== -1 &&
        r.headers.setContentType('application/x-www-form-urlencoded', !1),
      $t
        .getAdapter(r.adapter || me.adapter)(r)
        .then(
          function (s) {
            return (
              Xe(r),
              (s.data = Ve.call(r, r.transformResponse, s)),
              (s.headers = j.from(s.headers)),
              s
            )
          },
          function (s) {
            return (
              Ct(s) ||
                (Xe(r),
                s &&
                  s.response &&
                  ((s.response.data = Ve.call(r, r.transformResponse, s.response)),
                  (s.response.headers = j.from(s.response.headers)))),
              Promise.reject(s)
            )
          }
        )
    )
  }
  const Wt = '1.10.0',
    Ne = {}
  ;['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((r, n) => {
    Ne[r] = function (s) {
      return typeof s === r || 'a' + (n < 1 ? 'n ' : ' ') + r
    }
  })
  const zt = {}
  ;((Ne.transitional = function (n, i, s) {
    function u(l, f) {
      return '[Axios v' + Wt + "] Transitional option '" + l + "'" + f + (s ? '. ' + s : '')
    }
    return (l, f, m) => {
      if (n === !1) throw new R(u(f, ' has been removed' + (i ? ' in ' + i : '')), R.ERR_DEPRECATED)
      return (
        i &&
          !zt[f] &&
          ((zt[f] = !0),
          console.warn(
            u(f, ' has been deprecated since v' + i + ' and will be removed in the near future')
          )),
        n ? n(l, f, m) : !0
      )
    }
  }),
    (Ne.spelling = function (n) {
      return (i, s) => (console.warn(`${s} is likely a misspelling of ${n}`), !0)
    }))
  function zn(r, n, i) {
    if (typeof r != 'object') throw new R('options must be an object', R.ERR_BAD_OPTION_VALUE)
    const s = Object.keys(r)
    let u = s.length
    for (; u-- > 0; ) {
      const l = s[u],
        f = n[l]
      if (f) {
        const m = r[l],
          E = m === void 0 || f(m, l, r)
        if (E !== !0) throw new R('option ' + l + ' must be ' + E, R.ERR_BAD_OPTION_VALUE)
        continue
      }
      if (i !== !0) throw new R('Unknown option ' + l, R.ERR_BAD_OPTION)
    }
  }
  var _e = { assertOptions: zn, validators: Ne }
  const Y = _e.validators
  let se = class {
    constructor(n) {
      ;((this.defaults = n || {}), (this.interceptors = { request: new At(), response: new At() }))
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
        _e.assertOptions(
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
            : _e.assertOptions(u, { encode: Y.function, serialize: Y.function }, !0)),
        i.allowAbsoluteUrls !== void 0 ||
          (this.defaults.allowAbsoluteUrls !== void 0
            ? (i.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls)
            : (i.allowAbsoluteUrls = !0)),
        _e.assertOptions(
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
        const x = [Ht.bind(this), void 0]
        for (
          x.unshift.apply(x, m), x.push.apply(x, w), T = x.length, c = Promise.resolve(i);
          g < T;

        )
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
        c = Ht.call(this, S)
      } catch (x) {
        return Promise.reject(x)
      }
      for (g = 0, T = w.length; g < T; ) c = c.then(w[g++], w[g++])
      return c
    }
    getUri(n) {
      n = oe(this.defaults, n)
      const i = _t(n.baseURL, n.url, n.allowAbsoluteUrls)
      return Tt(i, n.params, n.paramsSerializer)
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
  let Jn = class ir {
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
        token: new ir(function (u) {
          n = u
        }),
        cancel: n,
      }
    }
  }
  function Vn(r) {
    return function (i) {
      return r.apply(null, i)
    }
  }
  function Kn(r) {
    return d.isObject(r) && r.isAxiosError === !0
  }
  const Ye = {
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
  Object.entries(Ye).forEach(([r, n]) => {
    Ye[n] = r
  })
  function Jt(r) {
    const n = new se(r),
      i = at(se.prototype.request, n)
    return (
      d.extend(i, se.prototype, n, { allOwnKeys: !0 }),
      d.extend(i, n, null, { allOwnKeys: !0 }),
      (i.create = function (u) {
        return Jt(oe(r, u))
      }),
      i
    )
  }
  const L = Jt(me)
  ;((L.Axios = se),
    (L.CanceledError = le),
    (L.CancelToken = Jn),
    (L.isCancel = Ct),
    (L.VERSION = Wt),
    (L.toFormData = Fe),
    (L.AxiosError = R),
    (L.Cancel = L.CanceledError),
    (L.all = function (n) {
      return Promise.all(n)
    }),
    (L.spread = Vn),
    (L.isAxiosError = Kn),
    (L.mergeConfig = oe),
    (L.AxiosHeaders = j),
    (L.formToJSON = (r) => Ft(d.isHTMLForm(r) ? new FormData(r) : r)),
    (L.getAdapter = $t.getAdapter),
    (L.HttpStatusCode = Ye),
    (L.default = L))
  const {
    Axios: mi,
    AxiosError: yi,
    CanceledError: wi,
    isCancel: Ei,
    CancelToken: gi,
    VERSION: xi,
    all: bi,
    Cancel: Bi,
    isAxiosError: Ri,
    spread: Ti,
    toFormData: Ai,
    AxiosHeaders: Si,
    HttpStatusCode: Fi,
    formToJSON: Ii,
    getAdapter: Ci,
    mergeConfig: Ui,
  } = L
  /*! third party licenses: js/vendor.LICENSE.txt */ const Qe = 5,
    Gn = 3e4
  let te = 0,
    Ze,
    we = 0
  const Vt = (r) => new Promise((n) => setTimeout(n, r))
  self.onmessage = async (r) => {
    const {
      updateType: n,
      inquiryId: i,
      interval: s = Gn,
      baseUrl: u,
      token: l,
      watcherId: f,
      lastUpdate: m = te,
    } = r.data
    if (
      ((te = m),
      self.postMessage({
        type: 'status',
        status: 'starting',
        mode: n,
        interval: s,
        message: '[Worker] Recieved new parameters.',
      }),
      Ze ||
        (Ze = L.create({
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
        const c = await Ze.get(w, { params: { offset: te } })
        ;((we = 0),
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
          ((we = we + 1),
          self.postMessage({
            type: 'error',
            status: 'error',
            mode: n,
            interval: s,
            message: `[Worker] Request failed (${we}/${Qe})`,
          }),
          we >= Qe)
        ) {
          ;(self.postMessage({
            type: 'fatal',
            status: 'error',
            mode: n,
            interval: s,
            message: `[Worker] Stopping after ${Qe} consecutive errors`,
          }),
            self.close())
          return
        }
        await Vt(s)
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
          await Vt(s))
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
//# sourceMappingURL=inquiryWatcher.worker-BEzdp_Oy.js.map
