;(function () {
  'use strict'
  const global = globalThis || void 0 || self
  function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default')
      ? x['default']
      : x
  }
  var browser = { exports: {} }
  var process = (browser.exports = {})
  var cachedSetTimeout
  var cachedClearTimeout
  function defaultSetTimout() {
    throw new Error('setTimeout has not been defined')
  }
  function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined')
  }
  ;(function () {
    try {
      if (typeof setTimeout === 'function') {
        cachedSetTimeout = setTimeout
      } else {
        cachedSetTimeout = defaultSetTimout
      }
    } catch (e) {
      cachedSetTimeout = defaultSetTimout
    }
    try {
      if (typeof clearTimeout === 'function') {
        cachedClearTimeout = clearTimeout
      } else {
        cachedClearTimeout = defaultClearTimeout
      }
    } catch (e) {
      cachedClearTimeout = defaultClearTimeout
    }
  })()
  function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
      return setTimeout(fun, 0)
    }
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
      cachedSetTimeout = setTimeout
      return setTimeout(fun, 0)
    }
    try {
      return cachedSetTimeout(fun, 0)
    } catch (e) {
      try {
        return cachedSetTimeout.call(null, fun, 0)
      } catch (e2) {
        return cachedSetTimeout.call(this, fun, 0)
      }
    }
  }
  function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
      return clearTimeout(marker)
    }
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
      cachedClearTimeout = clearTimeout
      return clearTimeout(marker)
    }
    try {
      return cachedClearTimeout(marker)
    } catch (e) {
      try {
        return cachedClearTimeout.call(null, marker)
      } catch (e2) {
        return cachedClearTimeout.call(this, marker)
      }
    }
  }
  var queue = []
  var draining = false
  var currentQueue
  var queueIndex = -1
  function cleanUpNextTick() {
    if (!draining || !currentQueue) {
      return
    }
    draining = false
    if (currentQueue.length) {
      queue = currentQueue.concat(queue)
    } else {
      queueIndex = -1
    }
    if (queue.length) {
      drainQueue()
    }
  }
  function drainQueue() {
    if (draining) {
      return
    }
    var timeout = runTimeout(cleanUpNextTick)
    draining = true
    var len2 = queue.length
    while (len2) {
      currentQueue = queue
      queue = []
      while (++queueIndex < len2) {
        if (currentQueue) {
          currentQueue[queueIndex].run()
        }
      }
      queueIndex = -1
      len2 = queue.length
    }
    currentQueue = null
    draining = false
    runClearTimeout(timeout)
  }
  process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1)
    if (arguments.length > 1) {
      for (var i2 = 1; i2 < arguments.length; i2++) {
        args[i2 - 1] = arguments[i2]
      }
    }
    queue.push(new Item(fun, args))
    if (queue.length === 1 && !draining) {
      runTimeout(drainQueue)
    }
  }
  function Item(fun, array) {
    this.fun = fun
    this.array = array
  }
  Item.prototype.run = function () {
    this.fun.apply(null, this.array)
  }
  process.title = 'browser'
  process.browser = true
  process.env = {}
  process.argv = []
  process.version = ''
  process.versions = {}
  function noop$1() {}
  process.on = noop$1
  process.addListener = noop$1
  process.once = noop$1
  process.off = noop$1
  process.removeListener = noop$1
  process.removeAllListeners = noop$1
  process.emit = noop$1
  process.prependListener = noop$1
  process.prependOnceListener = noop$1
  process.listeners = function (name) {
    return []
  }
  process.binding = function (name) {
    throw new Error('process.binding is not supported')
  }
  process.cwd = function () {
    return '/'
  }
  process.chdir = function (dir) {
    throw new Error('process.chdir is not supported')
  }
  process.umask = function () {
    return 0
  }
  var browserExports = browser.exports
  const process$1 = /* @__PURE__ */ getDefaultExportFromCjs(browserExports)
  function bind(fn, thisArg) {
    return function wrap() {
      return fn.apply(thisArg, arguments)
    }
  }
  const { toString } = Object.prototype
  const { getPrototypeOf } = Object
  const { iterator, toStringTag } = Symbol
  const kindOf = /* @__PURE__ */ ((cache) => (thing) => {
    const str = toString.call(thing)
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase())
  })(/* @__PURE__ */ Object.create(null))
  const kindOfTest = (type) => {
    type = type.toLowerCase()
    return (thing) => kindOf(thing) === type
  }
  const typeOfTest = (type) => (thing) => typeof thing === type
  const { isArray } = Array
  const isUndefined = typeOfTest('undefined')
  function isBuffer(val) {
    return (
      val !== null &&
      !isUndefined(val) &&
      val.constructor !== null &&
      !isUndefined(val.constructor) &&
      isFunction(val.constructor.isBuffer) &&
      val.constructor.isBuffer(val)
    )
  }
  const isArrayBuffer = kindOfTest('ArrayBuffer')
  function isArrayBufferView(val) {
    let result
    if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
      result = ArrayBuffer.isView(val)
    } else {
      result = val && val.buffer && isArrayBuffer(val.buffer)
    }
    return result
  }
  const isString = typeOfTest('string')
  const isFunction = typeOfTest('function')
  const isNumber = typeOfTest('number')
  const isObject = (thing) => thing !== null && typeof thing === 'object'
  const isBoolean = (thing) => thing === true || thing === false
  const isPlainObject = (val) => {
    if (kindOf(val) !== 'object') {
      return false
    }
    const prototype2 = getPrototypeOf(val)
    return (
      (prototype2 === null ||
        prototype2 === Object.prototype ||
        Object.getPrototypeOf(prototype2) === null) &&
      !(toStringTag in val) &&
      !(iterator in val)
    )
  }
  const isEmptyObject = (val) => {
    if (!isObject(val) || isBuffer(val)) {
      return false
    }
    try {
      return Object.keys(val).length === 0 && Object.getPrototypeOf(val) === Object.prototype
    } catch (e) {
      return false
    }
  }
  const isDate = kindOfTest('Date')
  const isFile = kindOfTest('File')
  const isBlob = kindOfTest('Blob')
  const isFileList = kindOfTest('FileList')
  const isStream = (val) => isObject(val) && isFunction(val.pipe)
  const isFormData = (thing) => {
    let kind
    return (
      thing &&
      ((typeof FormData === 'function' && thing instanceof FormData) ||
        (isFunction(thing.append) &&
          ((kind = kindOf(thing)) === 'formdata' || // detect form-data instance
            (kind === 'object' &&
              isFunction(thing.toString) &&
              thing.toString() === '[object FormData]'))))
    )
  }
  const isURLSearchParams = kindOfTest('URLSearchParams')
  const [isReadableStream, isRequest, isResponse, isHeaders] = [
    'ReadableStream',
    'Request',
    'Response',
    'Headers',
  ].map(kindOfTest)
  const trim = (str) =>
    str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')
  function forEach(obj, fn, { allOwnKeys = false } = {}) {
    if (obj === null || typeof obj === 'undefined') {
      return
    }
    let i2
    let l
    if (typeof obj !== 'object') {
      obj = [obj]
    }
    if (isArray(obj)) {
      for (i2 = 0, l = obj.length; i2 < l; i2++) {
        fn.call(null, obj[i2], i2, obj)
      }
    } else {
      if (isBuffer(obj)) {
        return
      }
      const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj)
      const len2 = keys.length
      let key
      for (i2 = 0; i2 < len2; i2++) {
        key = keys[i2]
        fn.call(null, obj[key], key, obj)
      }
    }
  }
  function findKey(obj, key) {
    if (isBuffer(obj)) {
      return null
    }
    key = key.toLowerCase()
    const keys = Object.keys(obj)
    let i2 = keys.length
    let _key
    while (i2-- > 0) {
      _key = keys[i2]
      if (key === _key.toLowerCase()) {
        return _key
      }
    }
    return null
  }
  const _global = (() => {
    if (typeof globalThis !== 'undefined') return globalThis
    return typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : global
  })()
  const isContextDefined = (context) => !isUndefined(context) && context !== _global
  function merge() {
    const { caseless } = (isContextDefined(this) && this) || {}
    const result = {}
    const assignValue = (val, key) => {
      const targetKey = (caseless && findKey(result, key)) || key
      if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
        result[targetKey] = merge(result[targetKey], val)
      } else if (isPlainObject(val)) {
        result[targetKey] = merge({}, val)
      } else if (isArray(val)) {
        result[targetKey] = val.slice()
      } else {
        result[targetKey] = val
      }
    }
    for (let i2 = 0, l = arguments.length; i2 < l; i2++) {
      arguments[i2] && forEach(arguments[i2], assignValue)
    }
    return result
  }
  const extend = (a, b, thisArg, { allOwnKeys } = {}) => {
    forEach(
      b,
      (val, key) => {
        if (thisArg && isFunction(val)) {
          a[key] = bind(val, thisArg)
        } else {
          a[key] = val
        }
      },
      { allOwnKeys }
    )
    return a
  }
  const stripBOM = (content) => {
    if (content.charCodeAt(0) === 65279) {
      content = content.slice(1)
    }
    return content
  }
  const inherits = (constructor, superConstructor, props, descriptors2) => {
    constructor.prototype = Object.create(superConstructor.prototype, descriptors2)
    constructor.prototype.constructor = constructor
    Object.defineProperty(constructor, 'super', {
      value: superConstructor.prototype,
    })
    props && Object.assign(constructor.prototype, props)
  }
  const toFlatObject = (sourceObj, destObj, filter, propFilter) => {
    let props
    let i2
    let prop
    const merged = {}
    destObj = destObj || {}
    if (sourceObj == null) return destObj
    do {
      props = Object.getOwnPropertyNames(sourceObj)
      i2 = props.length
      while (i2-- > 0) {
        prop = props[i2]
        if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
          destObj[prop] = sourceObj[prop]
          merged[prop] = true
        }
      }
      sourceObj = filter !== false && getPrototypeOf(sourceObj)
    } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype)
    return destObj
  }
  const endsWith = (str, searchString, position) => {
    str = String(str)
    if (position === void 0 || position > str.length) {
      position = str.length
    }
    position -= searchString.length
    const lastIndex = str.indexOf(searchString, position)
    return lastIndex !== -1 && lastIndex === position
  }
  const toArray = (thing) => {
    if (!thing) return null
    if (isArray(thing)) return thing
    let i2 = thing.length
    if (!isNumber(i2)) return null
    const arr = new Array(i2)
    while (i2-- > 0) {
      arr[i2] = thing[i2]
    }
    return arr
  }
  const isTypedArray = /* @__PURE__ */ ((TypedArray) => {
    return (thing) => {
      return TypedArray && thing instanceof TypedArray
    }
  })(typeof Uint8Array !== 'undefined' && getPrototypeOf(Uint8Array))
  const forEachEntry = (obj, fn) => {
    const generator = obj && obj[iterator]
    const _iterator = generator.call(obj)
    let result
    while ((result = _iterator.next()) && !result.done) {
      const pair = result.value
      fn.call(obj, pair[0], pair[1])
    }
  }
  const matchAll = (regExp, str) => {
    let matches
    const arr = []
    while ((matches = regExp.exec(str)) !== null) {
      arr.push(matches)
    }
    return arr
  }
  const isHTMLForm = kindOfTest('HTMLFormElement')
  const toCamelCase = (str) => {
    return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function replacer(m, p1, p2) {
      return p1.toUpperCase() + p2
    })
  }
  const hasOwnProperty = (
    ({ hasOwnProperty: hasOwnProperty2 }) =>
    (obj, prop) =>
      hasOwnProperty2.call(obj, prop)
  )(Object.prototype)
  const isRegExp = kindOfTest('RegExp')
  const reduceDescriptors = (obj, reducer) => {
    const descriptors2 = Object.getOwnPropertyDescriptors(obj)
    const reducedDescriptors = {}
    forEach(descriptors2, (descriptor, name) => {
      let ret
      if ((ret = reducer(descriptor, name, obj)) !== false) {
        reducedDescriptors[name] = ret || descriptor
      }
    })
    Object.defineProperties(obj, reducedDescriptors)
  }
  const freezeMethods = (obj) => {
    reduceDescriptors(obj, (descriptor, name) => {
      if (isFunction(obj) && ['arguments', 'caller', 'callee'].indexOf(name) !== -1) {
        return false
      }
      const value = obj[name]
      if (!isFunction(value)) return
      descriptor.enumerable = false
      if ('writable' in descriptor) {
        descriptor.writable = false
        return
      }
      if (!descriptor.set) {
        descriptor.set = () => {
          throw Error("Can not rewrite read-only method '" + name + "'")
        }
      }
    })
  }
  const toObjectSet = (arrayOrString, delimiter) => {
    const obj = {}
    const define = (arr) => {
      arr.forEach((value) => {
        obj[value] = true
      })
    }
    isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter))
    return obj
  }
  const noop = () => {}
  const toFiniteNumber = (value, defaultValue) => {
    return value != null && Number.isFinite((value = +value)) ? value : defaultValue
  }
  function isSpecCompliantForm(thing) {
    return !!(
      thing &&
      isFunction(thing.append) &&
      thing[toStringTag] === 'FormData' &&
      thing[iterator]
    )
  }
  const toJSONObject = (obj) => {
    const stack = new Array(10)
    const visit = (source, i2) => {
      if (isObject(source)) {
        if (stack.indexOf(source) >= 0) {
          return
        }
        if (isBuffer(source)) {
          return source
        }
        if (!('toJSON' in source)) {
          stack[i2] = source
          const target = isArray(source) ? [] : {}
          forEach(source, (value, key) => {
            const reducedValue = visit(value, i2 + 1)
            !isUndefined(reducedValue) && (target[key] = reducedValue)
          })
          stack[i2] = void 0
          return target
        }
      }
      return source
    }
    return visit(obj, 0)
  }
  const isAsyncFn = kindOfTest('AsyncFunction')
  const isThenable = (thing) =>
    thing &&
    (isObject(thing) || isFunction(thing)) &&
    isFunction(thing.then) &&
    isFunction(thing.catch)
  const _setImmediate = ((setImmediateSupported, postMessageSupported) => {
    if (setImmediateSupported) {
      return setImmediate
    }
    return postMessageSupported
      ? ((token, callbacks) => {
          _global.addEventListener(
            'message',
            ({ source, data }) => {
              if (source === _global && data === token) {
                callbacks.length && callbacks.shift()()
              }
            },
            false
          )
          return (cb) => {
            callbacks.push(cb)
            _global.postMessage(token, '*')
          }
        })(`axios@${Math.random()}`, [])
      : (cb) => setTimeout(cb)
  })(typeof setImmediate === 'function', isFunction(_global.postMessage))
  const asap =
    typeof queueMicrotask !== 'undefined'
      ? queueMicrotask.bind(_global)
      : (typeof process$1 !== 'undefined' && process$1.nextTick) || _setImmediate
  const isIterable = (thing) => thing != null && isFunction(thing[iterator])
  var utils$1 = {
    isArray,
    isArrayBuffer,
    isBuffer,
    isFormData,
    isArrayBufferView,
    isString,
    isNumber,
    isBoolean,
    isObject,
    isPlainObject,
    isEmptyObject,
    isReadableStream,
    isRequest,
    isResponse,
    isHeaders,
    isUndefined,
    isDate,
    isFile,
    isBlob,
    isRegExp,
    isFunction,
    isStream,
    isURLSearchParams,
    isTypedArray,
    isFileList,
    forEach,
    merge,
    extend,
    trim,
    stripBOM,
    inherits,
    toFlatObject,
    kindOf,
    kindOfTest,
    endsWith,
    toArray,
    forEachEntry,
    matchAll,
    isHTMLForm,
    hasOwnProperty,
    hasOwnProp: hasOwnProperty,
    // an alias to avoid ESLint no-prototype-builtins detection
    reduceDescriptors,
    freezeMethods,
    toObjectSet,
    toCamelCase,
    noop,
    toFiniteNumber,
    findKey,
    global: _global,
    isContextDefined,
    isSpecCompliantForm,
    toJSONObject,
    isAsyncFn,
    isThenable,
    setImmediate: _setImmediate,
    asap,
    isIterable,
  }
  var buffer = {}
  var base64Js = {}
  base64Js.byteLength = byteLength
  base64Js.toByteArray = toByteArray
  base64Js.fromByteArray = fromByteArray
  var lookup = []
  var revLookup = []
  var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array
  var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  for (var i = 0, len = code.length; i < len; ++i) {
    lookup[i] = code[i]
    revLookup[code.charCodeAt(i)] = i
  }
  revLookup['-'.charCodeAt(0)] = 62
  revLookup['_'.charCodeAt(0)] = 63
  function getLens(b64) {
    var len2 = b64.length
    if (len2 % 4 > 0) {
      throw new Error('Invalid string. Length must be a multiple of 4')
    }
    var validLen = b64.indexOf('=')
    if (validLen === -1) validLen = len2
    var placeHoldersLen = validLen === len2 ? 0 : 4 - (validLen % 4)
    return [validLen, placeHoldersLen]
  }
  function byteLength(b64) {
    var lens = getLens(b64)
    var validLen = lens[0]
    var placeHoldersLen = lens[1]
    return ((validLen + placeHoldersLen) * 3) / 4 - placeHoldersLen
  }
  function _byteLength(b64, validLen, placeHoldersLen) {
    return ((validLen + placeHoldersLen) * 3) / 4 - placeHoldersLen
  }
  function toByteArray(b64) {
    var tmp
    var lens = getLens(b64)
    var validLen = lens[0]
    var placeHoldersLen = lens[1]
    var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))
    var curByte = 0
    var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen
    var i2
    for (i2 = 0; i2 < len2; i2 += 4) {
      tmp =
        (revLookup[b64.charCodeAt(i2)] << 18) |
        (revLookup[b64.charCodeAt(i2 + 1)] << 12) |
        (revLookup[b64.charCodeAt(i2 + 2)] << 6) |
        revLookup[b64.charCodeAt(i2 + 3)]
      arr[curByte++] = (tmp >> 16) & 255
      arr[curByte++] = (tmp >> 8) & 255
      arr[curByte++] = tmp & 255
    }
    if (placeHoldersLen === 2) {
      tmp = (revLookup[b64.charCodeAt(i2)] << 2) | (revLookup[b64.charCodeAt(i2 + 1)] >> 4)
      arr[curByte++] = tmp & 255
    }
    if (placeHoldersLen === 1) {
      tmp =
        (revLookup[b64.charCodeAt(i2)] << 10) |
        (revLookup[b64.charCodeAt(i2 + 1)] << 4) |
        (revLookup[b64.charCodeAt(i2 + 2)] >> 2)
      arr[curByte++] = (tmp >> 8) & 255
      arr[curByte++] = tmp & 255
    }
    return arr
  }
  function tripletToBase64(num) {
    return (
      lookup[(num >> 18) & 63] +
      lookup[(num >> 12) & 63] +
      lookup[(num >> 6) & 63] +
      lookup[num & 63]
    )
  }
  function encodeChunk(uint8, start, end) {
    var tmp
    var output = []
    for (var i2 = start; i2 < end; i2 += 3) {
      tmp = ((uint8[i2] << 16) & 16711680) + ((uint8[i2 + 1] << 8) & 65280) + (uint8[i2 + 2] & 255)
      output.push(tripletToBase64(tmp))
    }
    return output.join('')
  }
  function fromByteArray(uint8) {
    var tmp
    var len2 = uint8.length
    var extraBytes = len2 % 3
    var parts = []
    var maxChunkLength = 16383
    for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
      parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength))
    }
    if (extraBytes === 1) {
      tmp = uint8[len2 - 1]
      parts.push(lookup[tmp >> 2] + lookup[(tmp << 4) & 63] + '==')
    } else if (extraBytes === 2) {
      tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1]
      parts.push(lookup[tmp >> 10] + lookup[(tmp >> 4) & 63] + lookup[(tmp << 2) & 63] + '=')
    }
    return parts.join('')
  }
  var ieee754 = {}
  /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
  ieee754.read = function (buffer2, offset, isLE, mLen, nBytes) {
    var e, m
    var eLen = nBytes * 8 - mLen - 1
    var eMax = (1 << eLen) - 1
    var eBias = eMax >> 1
    var nBits = -7
    var i2 = isLE ? nBytes - 1 : 0
    var d = isLE ? -1 : 1
    var s = buffer2[offset + i2]
    i2 += d
    e = s & ((1 << -nBits) - 1)
    s >>= -nBits
    nBits += eLen
    for (; nBits > 0; e = e * 256 + buffer2[offset + i2], i2 += d, nBits -= 8) {}
    m = e & ((1 << -nBits) - 1)
    e >>= -nBits
    nBits += mLen
    for (; nBits > 0; m = m * 256 + buffer2[offset + i2], i2 += d, nBits -= 8) {}
    if (e === 0) {
      e = 1 - eBias
    } else if (e === eMax) {
      return m ? NaN : (s ? -1 : 1) * Infinity
    } else {
      m = m + Math.pow(2, mLen)
      e = e - eBias
    }
    return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
  }
  ieee754.write = function (buffer2, value, offset, isLE, mLen, nBytes) {
    var e, m, c
    var eLen = nBytes * 8 - mLen - 1
    var eMax = (1 << eLen) - 1
    var eBias = eMax >> 1
    var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0
    var i2 = isLE ? 0 : nBytes - 1
    var d = isLE ? 1 : -1
    var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0
    value = Math.abs(value)
    if (isNaN(value) || value === Infinity) {
      m = isNaN(value) ? 1 : 0
      e = eMax
    } else {
      e = Math.floor(Math.log(value) / Math.LN2)
      if (value * (c = Math.pow(2, -e)) < 1) {
        e--
        c *= 2
      }
      if (e + eBias >= 1) {
        value += rt / c
      } else {
        value += rt * Math.pow(2, 1 - eBias)
      }
      if (value * c >= 2) {
        e++
        c /= 2
      }
      if (e + eBias >= eMax) {
        m = 0
        e = eMax
      } else if (e + eBias >= 1) {
        m = (value * c - 1) * Math.pow(2, mLen)
        e = e + eBias
      } else {
        m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
        e = 0
      }
    }
    for (; mLen >= 8; buffer2[offset + i2] = m & 255, i2 += d, m /= 256, mLen -= 8) {}
    e = (e << mLen) | m
    eLen += mLen
    for (; eLen > 0; buffer2[offset + i2] = e & 255, i2 += d, e /= 256, eLen -= 8) {}
    buffer2[offset + i2 - d] |= s * 128
  }
  /*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   */
  ;(function (exports) {
    const base64 = base64Js
    const ieee754$1 = ieee754
    const customInspectSymbol =
      typeof Symbol === 'function' && typeof Symbol['for'] === 'function'
        ? Symbol['for']('nodejs.util.inspect.custom')
        : null
    exports.Buffer = Buffer2
    exports.SlowBuffer = SlowBuffer
    exports.INSPECT_MAX_BYTES = 50
    const K_MAX_LENGTH = 2147483647
    exports.kMaxLength = K_MAX_LENGTH
    const {
      Uint8Array: GlobalUint8Array,
      ArrayBuffer: GlobalArrayBuffer,
      SharedArrayBuffer: GlobalSharedArrayBuffer,
    } = globalThis
    Buffer2.TYPED_ARRAY_SUPPORT = typedArraySupport()
    if (
      !Buffer2.TYPED_ARRAY_SUPPORT &&
      typeof console !== 'undefined' &&
      typeof console.error === 'function'
    ) {
      console.error(
        'This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
      )
    }
    function typedArraySupport() {
      try {
        const arr = new GlobalUint8Array(1)
        const proto = {
          foo: function () {
            return 42
          },
        }
        Object.setPrototypeOf(proto, GlobalUint8Array.prototype)
        Object.setPrototypeOf(arr, proto)
        return arr.foo() === 42
      } catch (e) {
        return false
      }
    }
    Object.defineProperty(Buffer2.prototype, 'parent', {
      enumerable: true,
      get: function () {
        if (!Buffer2.isBuffer(this)) return void 0
        return this.buffer
      },
    })
    Object.defineProperty(Buffer2.prototype, 'offset', {
      enumerable: true,
      get: function () {
        if (!Buffer2.isBuffer(this)) return void 0
        return this.byteOffset
      },
    })
    function createBuffer(length) {
      if (length > K_MAX_LENGTH) {
        throw new RangeError('The value "' + length + '" is invalid for option "size"')
      }
      const buf = new GlobalUint8Array(length)
      Object.setPrototypeOf(buf, Buffer2.prototype)
      return buf
    }
    function Buffer2(arg, encodingOrOffset, length) {
      if (typeof arg === 'number') {
        if (typeof encodingOrOffset === 'string') {
          throw new TypeError('The "string" argument must be of type string. Received type number')
        }
        return allocUnsafe(arg)
      }
      return from(arg, encodingOrOffset, length)
    }
    Buffer2.poolSize = 8192
    function from(value, encodingOrOffset, length) {
      if (typeof value === 'string') {
        return fromString(value, encodingOrOffset)
      }
      if (GlobalArrayBuffer.isView(value)) {
        return fromArrayView(value)
      }
      if (value == null) {
        throw new TypeError(
          'The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type ' +
            typeof value
        )
      }
      if (
        isInstance(value, GlobalArrayBuffer) ||
        (value && isInstance(value.buffer, GlobalArrayBuffer))
      ) {
        return fromArrayBuffer(value, encodingOrOffset, length)
      }
      if (
        typeof GlobalSharedArrayBuffer !== 'undefined' &&
        (isInstance(value, GlobalSharedArrayBuffer) ||
          (value && isInstance(value.buffer, GlobalSharedArrayBuffer)))
      ) {
        return fromArrayBuffer(value, encodingOrOffset, length)
      }
      if (typeof value === 'number') {
        throw new TypeError('The "value" argument must not be of type number. Received type number')
      }
      const valueOf = value.valueOf && value.valueOf()
      if (valueOf != null && valueOf !== value) {
        return Buffer2.from(valueOf, encodingOrOffset, length)
      }
      const b = fromObject(value)
      if (b) return b
      if (
        typeof Symbol !== 'undefined' &&
        Symbol.toPrimitive != null &&
        typeof value[Symbol.toPrimitive] === 'function'
      ) {
        return Buffer2.from(value[Symbol.toPrimitive]('string'), encodingOrOffset, length)
      }
      throw new TypeError(
        'The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type ' +
          typeof value
      )
    }
    Buffer2.from = function (value, encodingOrOffset, length) {
      return from(value, encodingOrOffset, length)
    }
    Object.setPrototypeOf(Buffer2.prototype, GlobalUint8Array.prototype)
    Object.setPrototypeOf(Buffer2, GlobalUint8Array)
    function assertSize(size) {
      if (typeof size !== 'number') {
        throw new TypeError('"size" argument must be of type number')
      } else if (size < 0) {
        throw new RangeError('The value "' + size + '" is invalid for option "size"')
      }
    }
    function alloc(size, fill, encoding) {
      assertSize(size)
      if (size <= 0) {
        return createBuffer(size)
      }
      if (fill !== void 0) {
        return typeof encoding === 'string'
          ? createBuffer(size).fill(fill, encoding)
          : createBuffer(size).fill(fill)
      }
      return createBuffer(size)
    }
    Buffer2.alloc = function (size, fill, encoding) {
      return alloc(size, fill, encoding)
    }
    function allocUnsafe(size) {
      assertSize(size)
      return createBuffer(size < 0 ? 0 : checked(size) | 0)
    }
    Buffer2.allocUnsafe = function (size) {
      return allocUnsafe(size)
    }
    Buffer2.allocUnsafeSlow = function (size) {
      return allocUnsafe(size)
    }
    function fromString(string, encoding) {
      if (typeof encoding !== 'string' || encoding === '') {
        encoding = 'utf8'
      }
      if (!Buffer2.isEncoding(encoding)) {
        throw new TypeError('Unknown encoding: ' + encoding)
      }
      const length = byteLength2(string, encoding) | 0
      let buf = createBuffer(length)
      const actual = buf.write(string, encoding)
      if (actual !== length) {
        buf = buf.slice(0, actual)
      }
      return buf
    }
    function fromArrayLike(array) {
      const length = array.length < 0 ? 0 : checked(array.length) | 0
      const buf = createBuffer(length)
      for (let i2 = 0; i2 < length; i2 += 1) {
        buf[i2] = array[i2] & 255
      }
      return buf
    }
    function fromArrayView(arrayView) {
      if (isInstance(arrayView, GlobalUint8Array)) {
        const copy = new GlobalUint8Array(arrayView)
        return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength)
      }
      return fromArrayLike(arrayView)
    }
    function fromArrayBuffer(array, byteOffset, length) {
      if (byteOffset < 0 || array.byteLength < byteOffset) {
        throw new RangeError('"offset" is outside of buffer bounds')
      }
      if (array.byteLength < byteOffset + (length || 0)) {
        throw new RangeError('"length" is outside of buffer bounds')
      }
      let buf
      if (byteOffset === void 0 && length === void 0) {
        buf = new GlobalUint8Array(array)
      } else if (length === void 0) {
        buf = new GlobalUint8Array(array, byteOffset)
      } else {
        buf = new GlobalUint8Array(array, byteOffset, length)
      }
      Object.setPrototypeOf(buf, Buffer2.prototype)
      return buf
    }
    function fromObject(obj) {
      if (Buffer2.isBuffer(obj)) {
        const len2 = checked(obj.length) | 0
        const buf = createBuffer(len2)
        if (buf.length === 0) {
          return buf
        }
        obj.copy(buf, 0, 0, len2)
        return buf
      }
      if (obj.length !== void 0) {
        if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
          return createBuffer(0)
        }
        return fromArrayLike(obj)
      }
      if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
        return fromArrayLike(obj.data)
      }
    }
    function checked(length) {
      if (length >= K_MAX_LENGTH) {
        throw new RangeError(
          'Attempt to allocate Buffer larger than maximum size: 0x' +
            K_MAX_LENGTH.toString(16) +
            ' bytes'
        )
      }
      return length | 0
    }
    function SlowBuffer(length) {
      if (+length != length) {
        length = 0
      }
      return Buffer2.alloc(+length)
    }
    Buffer2.isBuffer = function isBuffer2(b) {
      return b != null && b._isBuffer === true && b !== Buffer2.prototype
    }
    Buffer2.compare = function compare(a, b) {
      if (isInstance(a, GlobalUint8Array)) a = Buffer2.from(a, a.offset, a.byteLength)
      if (isInstance(b, GlobalUint8Array)) b = Buffer2.from(b, b.offset, b.byteLength)
      if (!Buffer2.isBuffer(a) || !Buffer2.isBuffer(b)) {
        throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array')
      }
      if (a === b) return 0
      let x = a.length
      let y = b.length
      for (let i2 = 0, len2 = Math.min(x, y); i2 < len2; ++i2) {
        if (a[i2] !== b[i2]) {
          x = a[i2]
          y = b[i2]
          break
        }
      }
      if (x < y) return -1
      if (y < x) return 1
      return 0
    }
    Buffer2.isEncoding = function isEncoding(encoding) {
      switch (String(encoding).toLowerCase()) {
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
          return true
        default:
          return false
      }
    }
    Buffer2.concat = function concat(list, length) {
      if (!Array.isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers')
      }
      if (list.length === 0) {
        return Buffer2.alloc(0)
      }
      let i2
      if (length === void 0) {
        length = 0
        for (i2 = 0; i2 < list.length; ++i2) {
          length += list[i2].length
        }
      }
      const buffer2 = Buffer2.allocUnsafe(length)
      let pos = 0
      for (i2 = 0; i2 < list.length; ++i2) {
        let buf = list[i2]
        if (isInstance(buf, GlobalUint8Array)) {
          if (pos + buf.length > buffer2.length) {
            if (!Buffer2.isBuffer(buf)) buf = Buffer2.from(buf)
            buf.copy(buffer2, pos)
          } else {
            GlobalUint8Array.prototype.set.call(buffer2, buf, pos)
          }
        } else if (!Buffer2.isBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers')
        } else {
          buf.copy(buffer2, pos)
        }
        pos += buf.length
      }
      return buffer2
    }
    function byteLength2(string, encoding) {
      if (Buffer2.isBuffer(string)) {
        return string.length
      }
      if (GlobalArrayBuffer.isView(string) || isInstance(string, GlobalArrayBuffer)) {
        return string.byteLength
      }
      if (typeof string !== 'string') {
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
            typeof string
        )
      }
      const len2 = string.length
      const mustMatch = arguments.length > 2 && arguments[2] === true
      if (!mustMatch && len2 === 0) return 0
      let loweredCase = false
      for (;;) {
        switch (encoding) {
          case 'ascii':
          case 'latin1':
          case 'binary':
            return len2
          case 'utf8':
          case 'utf-8':
            return utf8ToBytes(string).length
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return len2 * 2
          case 'hex':
            return len2 >>> 1
          case 'base64':
            return base64ToBytes(string).length
          default:
            if (loweredCase) {
              return mustMatch ? -1 : utf8ToBytes(string).length
            }
            encoding = ('' + encoding).toLowerCase()
            loweredCase = true
        }
      }
    }
    Buffer2.byteLength = byteLength2
    function slowToString(encoding, start, end) {
      let loweredCase = false
      if (start === void 0 || start < 0) {
        start = 0
      }
      if (start > this.length) {
        return ''
      }
      if (end === void 0 || end > this.length) {
        end = this.length
      }
      if (end <= 0) {
        return ''
      }
      end >>>= 0
      start >>>= 0
      if (end <= start) {
        return ''
      }
      if (!encoding) encoding = 'utf8'
      while (true) {
        switch (encoding) {
          case 'hex':
            return hexSlice(this, start, end)
          case 'utf8':
          case 'utf-8':
            return utf8Slice(this, start, end)
          case 'ascii':
            return asciiSlice(this, start, end)
          case 'latin1':
          case 'binary':
            return latin1Slice(this, start, end)
          case 'base64':
            return base64Slice(this, start, end)
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return utf16leSlice(this, start, end)
          default:
            if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
            encoding = (encoding + '').toLowerCase()
            loweredCase = true
        }
      }
    }
    Buffer2.prototype._isBuffer = true
    function swap(b, n, m) {
      const i2 = b[n]
      b[n] = b[m]
      b[m] = i2
    }
    Buffer2.prototype.swap16 = function swap16() {
      const len2 = this.length
      if (len2 % 2 !== 0) {
        throw new RangeError('Buffer size must be a multiple of 16-bits')
      }
      for (let i2 = 0; i2 < len2; i2 += 2) {
        swap(this, i2, i2 + 1)
      }
      return this
    }
    Buffer2.prototype.swap32 = function swap32() {
      const len2 = this.length
      if (len2 % 4 !== 0) {
        throw new RangeError('Buffer size must be a multiple of 32-bits')
      }
      for (let i2 = 0; i2 < len2; i2 += 4) {
        swap(this, i2, i2 + 3)
        swap(this, i2 + 1, i2 + 2)
      }
      return this
    }
    Buffer2.prototype.swap64 = function swap64() {
      const len2 = this.length
      if (len2 % 8 !== 0) {
        throw new RangeError('Buffer size must be a multiple of 64-bits')
      }
      for (let i2 = 0; i2 < len2; i2 += 8) {
        swap(this, i2, i2 + 7)
        swap(this, i2 + 1, i2 + 6)
        swap(this, i2 + 2, i2 + 5)
        swap(this, i2 + 3, i2 + 4)
      }
      return this
    }
    Buffer2.prototype.toString = function toString2() {
      const length = this.length
      if (length === 0) return ''
      if (arguments.length === 0) return utf8Slice(this, 0, length)
      return slowToString.apply(this, arguments)
    }
    Buffer2.prototype.toLocaleString = Buffer2.prototype.toString
    Buffer2.prototype.equals = function equals(b) {
      if (!Buffer2.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
      if (this === b) return true
      return Buffer2.compare(this, b) === 0
    }
    Buffer2.prototype.inspect = function inspect() {
      let str = ''
      const max = exports.INSPECT_MAX_BYTES
      str = this.toString('hex', 0, max)
        .replace(/(.{2})/g, '$1 ')
        .trim()
      if (this.length > max) str += ' ... '
      return '<Buffer ' + str + '>'
    }
    if (customInspectSymbol) {
      Buffer2.prototype[customInspectSymbol] = Buffer2.prototype.inspect
    }
    Buffer2.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
      if (isInstance(target, GlobalUint8Array)) {
        target = Buffer2.from(target, target.offset, target.byteLength)
      }
      if (!Buffer2.isBuffer(target)) {
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
            typeof target
        )
      }
      if (start === void 0) {
        start = 0
      }
      if (end === void 0) {
        end = target ? target.length : 0
      }
      if (thisStart === void 0) {
        thisStart = 0
      }
      if (thisEnd === void 0) {
        thisEnd = this.length
      }
      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError('out of range index')
      }
      if (thisStart >= thisEnd && start >= end) {
        return 0
      }
      if (thisStart >= thisEnd) {
        return -1
      }
      if (start >= end) {
        return 1
      }
      start >>>= 0
      end >>>= 0
      thisStart >>>= 0
      thisEnd >>>= 0
      if (this === target) return 0
      let x = thisEnd - thisStart
      let y = end - start
      const len2 = Math.min(x, y)
      const thisCopy = this.slice(thisStart, thisEnd)
      const targetCopy = target.slice(start, end)
      for (let i2 = 0; i2 < len2; ++i2) {
        if (thisCopy[i2] !== targetCopy[i2]) {
          x = thisCopy[i2]
          y = targetCopy[i2]
          break
        }
      }
      if (x < y) return -1
      if (y < x) return 1
      return 0
    }
    function bidirectionalIndexOf(buffer2, val, byteOffset, encoding, dir) {
      if (buffer2.length === 0) return -1
      if (typeof byteOffset === 'string') {
        encoding = byteOffset
        byteOffset = 0
      } else if (byteOffset > 2147483647) {
        byteOffset = 2147483647
      } else if (byteOffset < -2147483648) {
        byteOffset = -2147483648
      }
      byteOffset = +byteOffset
      if (numberIsNaN(byteOffset)) {
        byteOffset = dir ? 0 : buffer2.length - 1
      }
      if (byteOffset < 0) byteOffset = buffer2.length + byteOffset
      if (byteOffset >= buffer2.length) {
        if (dir) return -1
        else byteOffset = buffer2.length - 1
      } else if (byteOffset < 0) {
        if (dir) byteOffset = 0
        else return -1
      }
      if (typeof val === 'string') {
        val = Buffer2.from(val, encoding)
      }
      if (Buffer2.isBuffer(val)) {
        if (val.length === 0) {
          return -1
        }
        return arrayIndexOf(buffer2, val, byteOffset, encoding, dir)
      } else if (typeof val === 'number') {
        val = val & 255
        if (typeof GlobalUint8Array.prototype.indexOf === 'function') {
          if (dir) {
            return GlobalUint8Array.prototype.indexOf.call(buffer2, val, byteOffset)
          } else {
            return GlobalUint8Array.prototype.lastIndexOf.call(buffer2, val, byteOffset)
          }
        }
        return arrayIndexOf(buffer2, [val], byteOffset, encoding, dir)
      }
      throw new TypeError('val must be string, number or Buffer')
    }
    function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
      let indexSize = 1
      let arrLength = arr.length
      let valLength = val.length
      if (encoding !== void 0) {
        encoding = String(encoding).toLowerCase()
        if (
          encoding === 'ucs2' ||
          encoding === 'ucs-2' ||
          encoding === 'utf16le' ||
          encoding === 'utf-16le'
        ) {
          if (arr.length < 2 || val.length < 2) {
            return -1
          }
          indexSize = 2
          arrLength /= 2
          valLength /= 2
          byteOffset /= 2
        }
      }
      function read(buf, i3) {
        if (indexSize === 1) {
          return buf[i3]
        } else {
          return buf.readUInt16BE(i3 * indexSize)
        }
      }
      let i2
      if (dir) {
        let foundIndex = -1
        for (i2 = byteOffset; i2 < arrLength; i2++) {
          if (read(arr, i2) === read(val, foundIndex === -1 ? 0 : i2 - foundIndex)) {
            if (foundIndex === -1) foundIndex = i2
            if (i2 - foundIndex + 1 === valLength) return foundIndex * indexSize
          } else {
            if (foundIndex !== -1) i2 -= i2 - foundIndex
            foundIndex = -1
          }
        }
      } else {
        if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
        for (i2 = byteOffset; i2 >= 0; i2--) {
          let found = true
          for (let j = 0; j < valLength; j++) {
            if (read(arr, i2 + j) !== read(val, j)) {
              found = false
              break
            }
          }
          if (found) return i2
        }
      }
      return -1
    }
    Buffer2.prototype.includes = function includes(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1
    }
    Buffer2.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
    }
    Buffer2.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
    }
    function hexWrite(buf, string, offset, length) {
      offset = Number(offset) || 0
      const remaining = buf.length - offset
      if (!length) {
        length = remaining
      } else {
        length = Number(length)
        if (length > remaining) {
          length = remaining
        }
      }
      const strLen = string.length
      if (length > strLen / 2) {
        length = strLen / 2
      }
      let i2
      for (i2 = 0; i2 < length; ++i2) {
        const parsed = parseInt(string.substr(i2 * 2, 2), 16)
        if (numberIsNaN(parsed)) return i2
        buf[offset + i2] = parsed
      }
      return i2
    }
    function utf8Write(buf, string, offset, length) {
      return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
    }
    function asciiWrite(buf, string, offset, length) {
      return blitBuffer(asciiToBytes(string), buf, offset, length)
    }
    function base64Write(buf, string, offset, length) {
      return blitBuffer(base64ToBytes(string), buf, offset, length)
    }
    function ucs2Write(buf, string, offset, length) {
      return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
    }
    Buffer2.prototype.write = function write(string, offset, length, encoding) {
      if (offset === void 0) {
        encoding = 'utf8'
        length = this.length
        offset = 0
      } else if (length === void 0 && typeof offset === 'string') {
        encoding = offset
        length = this.length
        offset = 0
      } else if (isFinite(offset)) {
        offset = offset >>> 0
        if (isFinite(length)) {
          length = length >>> 0
          if (encoding === void 0) encoding = 'utf8'
        } else {
          encoding = length
          length = void 0
        }
      } else {
        throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported')
      }
      const remaining = this.length - offset
      if (length === void 0 || length > remaining) length = remaining
      if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
        throw new RangeError('Attempt to write outside buffer bounds')
      }
      if (!encoding) encoding = 'utf8'
      let loweredCase = false
      for (;;) {
        switch (encoding) {
          case 'hex':
            return hexWrite(this, string, offset, length)
          case 'utf8':
          case 'utf-8':
            return utf8Write(this, string, offset, length)
          case 'ascii':
          case 'latin1':
          case 'binary':
            return asciiWrite(this, string, offset, length)
          case 'base64':
            return base64Write(this, string, offset, length)
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return ucs2Write(this, string, offset, length)
          default:
            if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
            encoding = ('' + encoding).toLowerCase()
            loweredCase = true
        }
      }
    }
    Buffer2.prototype.toJSON = function toJSON() {
      return {
        type: 'Buffer',
        data: Array.prototype.slice.call(this._arr || this, 0),
      }
    }
    function base64Slice(buf, start, end) {
      if (start === 0 && end === buf.length) {
        return base64.fromByteArray(buf)
      } else {
        return base64.fromByteArray(buf.slice(start, end))
      }
    }
    function utf8Slice(buf, start, end) {
      end = Math.min(buf.length, end)
      const res = []
      let i2 = start
      while (i2 < end) {
        const firstByte = buf[i2]
        let codePoint = null
        let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1
        if (i2 + bytesPerSequence <= end) {
          let secondByte, thirdByte, fourthByte, tempCodePoint
          switch (bytesPerSequence) {
            case 1:
              if (firstByte < 128) {
                codePoint = firstByte
              }
              break
            case 2:
              secondByte = buf[i2 + 1]
              if ((secondByte & 192) === 128) {
                tempCodePoint = ((firstByte & 31) << 6) | (secondByte & 63)
                if (tempCodePoint > 127) {
                  codePoint = tempCodePoint
                }
              }
              break
            case 3:
              secondByte = buf[i2 + 1]
              thirdByte = buf[i2 + 2]
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                tempCodePoint =
                  ((firstByte & 15) << 12) | ((secondByte & 63) << 6) | (thirdByte & 63)
                if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                  codePoint = tempCodePoint
                }
              }
              break
            case 4:
              secondByte = buf[i2 + 1]
              thirdByte = buf[i2 + 2]
              fourthByte = buf[i2 + 3]
              if (
                (secondByte & 192) === 128 &&
                (thirdByte & 192) === 128 &&
                (fourthByte & 192) === 128
              ) {
                tempCodePoint =
                  ((firstByte & 15) << 18) |
                  ((secondByte & 63) << 12) |
                  ((thirdByte & 63) << 6) |
                  (fourthByte & 63)
                if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                  codePoint = tempCodePoint
                }
              }
          }
        }
        if (codePoint === null) {
          codePoint = 65533
          bytesPerSequence = 1
        } else if (codePoint > 65535) {
          codePoint -= 65536
          res.push(((codePoint >>> 10) & 1023) | 55296)
          codePoint = 56320 | (codePoint & 1023)
        }
        res.push(codePoint)
        i2 += bytesPerSequence
      }
      return decodeCodePointsArray(res)
    }
    const MAX_ARGUMENTS_LENGTH = 4096
    function decodeCodePointsArray(codePoints) {
      const len2 = codePoints.length
      if (len2 <= MAX_ARGUMENTS_LENGTH) {
        return String.fromCharCode.apply(String, codePoints)
      }
      let res = ''
      let i2 = 0
      while (i2 < len2) {
        res += String.fromCharCode.apply(String, codePoints.slice(i2, (i2 += MAX_ARGUMENTS_LENGTH)))
      }
      return res
    }
    function asciiSlice(buf, start, end) {
      let ret = ''
      end = Math.min(buf.length, end)
      for (let i2 = start; i2 < end; ++i2) {
        ret += String.fromCharCode(buf[i2] & 127)
      }
      return ret
    }
    function latin1Slice(buf, start, end) {
      let ret = ''
      end = Math.min(buf.length, end)
      for (let i2 = start; i2 < end; ++i2) {
        ret += String.fromCharCode(buf[i2])
      }
      return ret
    }
    function hexSlice(buf, start, end) {
      const len2 = buf.length
      if (!start || start < 0) start = 0
      if (!end || end < 0 || end > len2) end = len2
      let out = ''
      for (let i2 = start; i2 < end; ++i2) {
        out += hexSliceLookupTable[buf[i2]]
      }
      return out
    }
    function utf16leSlice(buf, start, end) {
      const bytes = buf.slice(start, end)
      let res = ''
      for (let i2 = 0; i2 < bytes.length - 1; i2 += 2) {
        res += String.fromCharCode(bytes[i2] + bytes[i2 + 1] * 256)
      }
      return res
    }
    Buffer2.prototype.slice = function slice(start, end) {
      const len2 = this.length
      start = ~~start
      end = end === void 0 ? len2 : ~~end
      if (start < 0) {
        start += len2
        if (start < 0) start = 0
      } else if (start > len2) {
        start = len2
      }
      if (end < 0) {
        end += len2
        if (end < 0) end = 0
      } else if (end > len2) {
        end = len2
      }
      if (end < start) end = start
      const newBuf = this.subarray(start, end)
      Object.setPrototypeOf(newBuf, Buffer2.prototype)
      return newBuf
    }
    function checkOffset(offset, ext, length) {
      if (offset % 1 !== 0 || offset < 0) throw new RangeError('offset is not uint')
      if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
    }
    Buffer2.prototype.readUintLE = Buffer2.prototype.readUIntLE = function readUIntLE(
      offset,
      byteLength3,
      noAssert
    ) {
      offset = offset >>> 0
      byteLength3 = byteLength3 >>> 0
      if (!noAssert) checkOffset(offset, byteLength3, this.length)
      let val = this[offset]
      let mul = 1
      let i2 = 0
      while (++i2 < byteLength3 && (mul *= 256)) {
        val += this[offset + i2] * mul
      }
      return val
    }
    Buffer2.prototype.readUintBE = Buffer2.prototype.readUIntBE = function readUIntBE(
      offset,
      byteLength3,
      noAssert
    ) {
      offset = offset >>> 0
      byteLength3 = byteLength3 >>> 0
      if (!noAssert) {
        checkOffset(offset, byteLength3, this.length)
      }
      let val = this[offset + --byteLength3]
      let mul = 1
      while (byteLength3 > 0 && (mul *= 256)) {
        val += this[offset + --byteLength3] * mul
      }
      return val
    }
    Buffer2.prototype.readUint8 = Buffer2.prototype.readUInt8 = function readUInt8(
      offset,
      noAssert
    ) {
      offset = offset >>> 0
      if (!noAssert) checkOffset(offset, 1, this.length)
      return this[offset]
    }
    Buffer2.prototype.readUint16LE = Buffer2.prototype.readUInt16LE = function readUInt16LE(
      offset,
      noAssert
    ) {
      offset = offset >>> 0
      if (!noAssert) checkOffset(offset, 2, this.length)
      return this[offset] | (this[offset + 1] << 8)
    }
    Buffer2.prototype.readUint16BE = Buffer2.prototype.readUInt16BE = function readUInt16BE(
      offset,
      noAssert
    ) {
      offset = offset >>> 0
      if (!noAssert) checkOffset(offset, 2, this.length)
      return (this[offset] << 8) | this[offset + 1]
    }
    Buffer2.prototype.readUint32LE = Buffer2.prototype.readUInt32LE = function readUInt32LE(
      offset,
      noAssert
    ) {
      offset = offset >>> 0
      if (!noAssert) checkOffset(offset, 4, this.length)
      return (
        (this[offset] | (this[offset + 1] << 8) | (this[offset + 2] << 16)) +
        this[offset + 3] * 16777216
      )
    }
    Buffer2.prototype.readUint32BE = Buffer2.prototype.readUInt32BE = function readUInt32BE(
      offset,
      noAssert
    ) {
      offset = offset >>> 0
      if (!noAssert) checkOffset(offset, 4, this.length)
      return (
        this[offset] * 16777216 +
        ((this[offset + 1] << 16) | (this[offset + 2] << 8) | this[offset + 3])
      )
    }
    Buffer2.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
      offset = offset >>> 0
      validateNumber(offset, 'offset')
      const first = this[offset]
      const last = this[offset + 7]
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8)
      }
      const lo =
        first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24
      const hi =
        this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24
      return BigInt(lo) + (BigInt(hi) << BigInt(32))
    })
    Buffer2.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
      offset = offset >>> 0
      validateNumber(offset, 'offset')
      const first = this[offset]
      const last = this[offset + 7]
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8)
      }
      const hi =
        first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset]
      const lo =
        this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last
      return (BigInt(hi) << BigInt(32)) + BigInt(lo)
    })
    Buffer2.prototype.readIntLE = function readIntLE(offset, byteLength3, noAssert) {
      offset = offset >>> 0
      byteLength3 = byteLength3 >>> 0
      if (!noAssert) checkOffset(offset, byteLength3, this.length)
      let val = this[offset]
      let mul = 1
      let i2 = 0
      while (++i2 < byteLength3 && (mul *= 256)) {
        val += this[offset + i2] * mul
      }
      mul *= 128
      if (val >= mul) val -= Math.pow(2, 8 * byteLength3)
      return val
    }
    Buffer2.prototype.readIntBE = function readIntBE(offset, byteLength3, noAssert) {
      offset = offset >>> 0
      byteLength3 = byteLength3 >>> 0
      if (!noAssert) checkOffset(offset, byteLength3, this.length)
      let i2 = byteLength3
      let mul = 1
      let val = this[offset + --i2]
      while (i2 > 0 && (mul *= 256)) {
        val += this[offset + --i2] * mul
      }
      mul *= 128
      if (val >= mul) val -= Math.pow(2, 8 * byteLength3)
      return val
    }
    Buffer2.prototype.readInt8 = function readInt8(offset, noAssert) {
      offset = offset >>> 0
      if (!noAssert) checkOffset(offset, 1, this.length)
      if (!(this[offset] & 128)) return this[offset]
      return (255 - this[offset] + 1) * -1
    }
    Buffer2.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
      offset = offset >>> 0
      if (!noAssert) checkOffset(offset, 2, this.length)
      const val = this[offset] | (this[offset + 1] << 8)
      return val & 32768 ? val | 4294901760 : val
    }
    Buffer2.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
      offset = offset >>> 0
      if (!noAssert) checkOffset(offset, 2, this.length)
      const val = this[offset + 1] | (this[offset] << 8)
      return val & 32768 ? val | 4294901760 : val
    }
    Buffer2.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
      offset = offset >>> 0
      if (!noAssert) checkOffset(offset, 4, this.length)
      return (
        this[offset] | (this[offset + 1] << 8) | (this[offset + 2] << 16) | (this[offset + 3] << 24)
      )
    }
    Buffer2.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
      offset = offset >>> 0
      if (!noAssert) checkOffset(offset, 4, this.length)
      return (
        (this[offset] << 24) | (this[offset + 1] << 16) | (this[offset + 2] << 8) | this[offset + 3]
      )
    }
    Buffer2.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
      offset = offset >>> 0
      validateNumber(offset, 'offset')
      const first = this[offset]
      const last = this[offset + 7]
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8)
      }
      const val =
        this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24)
      return (
        (BigInt(val) << BigInt(32)) +
        BigInt(
          first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24
        )
      )
    })
    Buffer2.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
      offset = offset >>> 0
      validateNumber(offset, 'offset')
      const first = this[offset]
      const last = this[offset + 7]
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8)
      }
      const val =
        (first << 24) + // Overflow
        this[++offset] * 2 ** 16 +
        this[++offset] * 2 ** 8 +
        this[++offset]
      return (
        (BigInt(val) << BigInt(32)) +
        BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last)
      )
    })
    Buffer2.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
      offset = offset >>> 0
      if (!noAssert) checkOffset(offset, 4, this.length)
      return ieee754$1.read(this, offset, true, 23, 4)
    }
    Buffer2.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
      offset = offset >>> 0
      if (!noAssert) checkOffset(offset, 4, this.length)
      return ieee754$1.read(this, offset, false, 23, 4)
    }
    Buffer2.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
      offset = offset >>> 0
      if (!noAssert) checkOffset(offset, 8, this.length)
      return ieee754$1.read(this, offset, true, 52, 8)
    }
    Buffer2.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
      offset = offset >>> 0
      if (!noAssert) checkOffset(offset, 8, this.length)
      return ieee754$1.read(this, offset, false, 52, 8)
    }
    function checkInt(buf, value, offset, ext, max, min) {
      if (!Buffer2.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
      if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
      if (offset + ext > buf.length) throw new RangeError('Index out of range')
    }
    Buffer2.prototype.writeUintLE = Buffer2.prototype.writeUIntLE = function writeUIntLE(
      value,
      offset,
      byteLength3,
      noAssert
    ) {
      value = +value
      offset = offset >>> 0
      byteLength3 = byteLength3 >>> 0
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength3) - 1
        checkInt(this, value, offset, byteLength3, maxBytes, 0)
      }
      let mul = 1
      let i2 = 0
      this[offset] = value & 255
      while (++i2 < byteLength3 && (mul *= 256)) {
        this[offset + i2] = (value / mul) & 255
      }
      return offset + byteLength3
    }
    Buffer2.prototype.writeUintBE = Buffer2.prototype.writeUIntBE = function writeUIntBE(
      value,
      offset,
      byteLength3,
      noAssert
    ) {
      value = +value
      offset = offset >>> 0
      byteLength3 = byteLength3 >>> 0
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength3) - 1
        checkInt(this, value, offset, byteLength3, maxBytes, 0)
      }
      let i2 = byteLength3 - 1
      let mul = 1
      this[offset + i2] = value & 255
      while (--i2 >= 0 && (mul *= 256)) {
        this[offset + i2] = (value / mul) & 255
      }
      return offset + byteLength3
    }
    Buffer2.prototype.writeUint8 = Buffer2.prototype.writeUInt8 = function writeUInt8(
      value,
      offset,
      noAssert
    ) {
      value = +value
      offset = offset >>> 0
      if (!noAssert) checkInt(this, value, offset, 1, 255, 0)
      this[offset] = value & 255
      return offset + 1
    }
    Buffer2.prototype.writeUint16LE = Buffer2.prototype.writeUInt16LE = function writeUInt16LE(
      value,
      offset,
      noAssert
    ) {
      value = +value
      offset = offset >>> 0
      if (!noAssert) checkInt(this, value, offset, 2, 65535, 0)
      this[offset] = value & 255
      this[offset + 1] = value >>> 8
      return offset + 2
    }
    Buffer2.prototype.writeUint16BE = Buffer2.prototype.writeUInt16BE = function writeUInt16BE(
      value,
      offset,
      noAssert
    ) {
      value = +value
      offset = offset >>> 0
      if (!noAssert) checkInt(this, value, offset, 2, 65535, 0)
      this[offset] = value >>> 8
      this[offset + 1] = value & 255
      return offset + 2
    }
    Buffer2.prototype.writeUint32LE = Buffer2.prototype.writeUInt32LE = function writeUInt32LE(
      value,
      offset,
      noAssert
    ) {
      value = +value
      offset = offset >>> 0
      if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0)
      this[offset + 3] = value >>> 24
      this[offset + 2] = value >>> 16
      this[offset + 1] = value >>> 8
      this[offset] = value & 255
      return offset + 4
    }
    Buffer2.prototype.writeUint32BE = Buffer2.prototype.writeUInt32BE = function writeUInt32BE(
      value,
      offset,
      noAssert
    ) {
      value = +value
      offset = offset >>> 0
      if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0)
      this[offset] = value >>> 24
      this[offset + 1] = value >>> 16
      this[offset + 2] = value >>> 8
      this[offset + 3] = value & 255
      return offset + 4
    }
    function wrtBigUInt64LE(buf, value, offset, min, max) {
      checkIntBI(value, min, max, buf, offset, 7)
      let lo = Number(value & BigInt(4294967295))
      buf[offset++] = lo
      lo = lo >> 8
      buf[offset++] = lo
      lo = lo >> 8
      buf[offset++] = lo
      lo = lo >> 8
      buf[offset++] = lo
      let hi = Number((value >> BigInt(32)) & BigInt(4294967295))
      buf[offset++] = hi
      hi = hi >> 8
      buf[offset++] = hi
      hi = hi >> 8
      buf[offset++] = hi
      hi = hi >> 8
      buf[offset++] = hi
      return offset
    }
    function wrtBigUInt64BE(buf, value, offset, min, max) {
      checkIntBI(value, min, max, buf, offset, 7)
      let lo = Number(value & BigInt(4294967295))
      buf[offset + 7] = lo
      lo = lo >> 8
      buf[offset + 6] = lo
      lo = lo >> 8
      buf[offset + 5] = lo
      lo = lo >> 8
      buf[offset + 4] = lo
      let hi = Number((value >> BigInt(32)) & BigInt(4294967295))
      buf[offset + 3] = hi
      hi = hi >> 8
      buf[offset + 2] = hi
      hi = hi >> 8
      buf[offset + 1] = hi
      hi = hi >> 8
      buf[offset] = hi
      return offset + 8
    }
    Buffer2.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(
      value,
      offset = 0
    ) {
      return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'))
    })
    Buffer2.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(
      value,
      offset = 0
    ) {
      return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'))
    })
    Buffer2.prototype.writeIntLE = function writeIntLE(value, offset, byteLength3, noAssert) {
      value = +value
      offset = offset >>> 0
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength3 - 1)
        checkInt(this, value, offset, byteLength3, limit - 1, -limit)
      }
      let i2 = 0
      let mul = 1
      let sub = 0
      this[offset] = value & 255
      while (++i2 < byteLength3 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i2 - 1] !== 0) {
          sub = 1
        }
        this[offset + i2] = (((value / mul) >> 0) - sub) & 255
      }
      return offset + byteLength3
    }
    Buffer2.prototype.writeIntBE = function writeIntBE(value, offset, byteLength3, noAssert) {
      value = +value
      offset = offset >>> 0
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength3 - 1)
        checkInt(this, value, offset, byteLength3, limit - 1, -limit)
      }
      let i2 = byteLength3 - 1
      let mul = 1
      let sub = 0
      this[offset + i2] = value & 255
      while (--i2 >= 0 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i2 + 1] !== 0) {
          sub = 1
        }
        this[offset + i2] = (((value / mul) >> 0) - sub) & 255
      }
      return offset + byteLength3
    }
    Buffer2.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
      value = +value
      offset = offset >>> 0
      if (!noAssert) checkInt(this, value, offset, 1, 127, -128)
      if (value < 0) value = 255 + value + 1
      this[offset] = value & 255
      return offset + 1
    }
    Buffer2.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
      value = +value
      offset = offset >>> 0
      if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768)
      this[offset] = value & 255
      this[offset + 1] = value >>> 8
      return offset + 2
    }
    Buffer2.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
      value = +value
      offset = offset >>> 0
      if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768)
      this[offset] = value >>> 8
      this[offset + 1] = value & 255
      return offset + 2
    }
    Buffer2.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
      value = +value
      offset = offset >>> 0
      if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648)
      this[offset] = value & 255
      this[offset + 1] = value >>> 8
      this[offset + 2] = value >>> 16
      this[offset + 3] = value >>> 24
      return offset + 4
    }
    Buffer2.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
      value = +value
      offset = offset >>> 0
      if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648)
      if (value < 0) value = 4294967295 + value + 1
      this[offset] = value >>> 24
      this[offset + 1] = value >>> 16
      this[offset + 2] = value >>> 8
      this[offset + 3] = value & 255
      return offset + 4
    }
    Buffer2.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(
      value,
      offset = 0
    ) {
      return wrtBigUInt64LE(
        this,
        value,
        offset,
        -BigInt('0x8000000000000000'),
        BigInt('0x7fffffffffffffff')
      )
    })
    Buffer2.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(
      value,
      offset = 0
    ) {
      return wrtBigUInt64BE(
        this,
        value,
        offset,
        -BigInt('0x8000000000000000'),
        BigInt('0x7fffffffffffffff')
      )
    })
    function checkIEEE754(buf, value, offset, ext, max, min) {
      if (offset + ext > buf.length) throw new RangeError('Index out of range')
      if (offset < 0) throw new RangeError('Index out of range')
    }
    function writeFloat(buf, value, offset, littleEndian, noAssert) {
      value = +value
      offset = offset >>> 0
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 4)
      }
      ieee754$1.write(buf, value, offset, littleEndian, 23, 4)
      return offset + 4
    }
    Buffer2.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
      return writeFloat(this, value, offset, true, noAssert)
    }
    Buffer2.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
      return writeFloat(this, value, offset, false, noAssert)
    }
    function writeDouble(buf, value, offset, littleEndian, noAssert) {
      value = +value
      offset = offset >>> 0
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 8)
      }
      ieee754$1.write(buf, value, offset, littleEndian, 52, 8)
      return offset + 8
    }
    Buffer2.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
      return writeDouble(this, value, offset, true, noAssert)
    }
    Buffer2.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
      return writeDouble(this, value, offset, false, noAssert)
    }
    Buffer2.prototype.copy = function copy(target, targetStart, start, end) {
      if (!Buffer2.isBuffer(target)) throw new TypeError('argument should be a Buffer')
      if (!start) start = 0
      if (!end && end !== 0) end = this.length
      if (targetStart >= target.length) targetStart = target.length
      if (!targetStart) targetStart = 0
      if (end > 0 && end < start) end = start
      if (end === start) return 0
      if (target.length === 0 || this.length === 0) return 0
      if (targetStart < 0) {
        throw new RangeError('targetStart out of bounds')
      }
      if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
      if (end < 0) throw new RangeError('sourceEnd out of bounds')
      if (end > this.length) end = this.length
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start
      }
      const len2 = end - start
      if (this === target && typeof GlobalUint8Array.prototype.copyWithin === 'function') {
        this.copyWithin(targetStart, start, end)
      } else {
        GlobalUint8Array.prototype.set.call(target, this.subarray(start, end), targetStart)
      }
      return len2
    }
    Buffer2.prototype.fill = function fill(val, start, end, encoding) {
      if (typeof val === 'string') {
        if (typeof start === 'string') {
          encoding = start
          start = 0
          end = this.length
        } else if (typeof end === 'string') {
          encoding = end
          end = this.length
        }
        if (encoding !== void 0 && typeof encoding !== 'string') {
          throw new TypeError('encoding must be a string')
        }
        if (typeof encoding === 'string' && !Buffer2.isEncoding(encoding)) {
          throw new TypeError('Unknown encoding: ' + encoding)
        }
        if (val.length === 1) {
          const code2 = val.charCodeAt(0)
          if ((encoding === 'utf8' && code2 < 128) || encoding === 'latin1') {
            val = code2
          }
        }
      } else if (typeof val === 'number') {
        val = val & 255
      } else if (typeof val === 'boolean') {
        val = Number(val)
      }
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError('Out of range index')
      }
      if (end <= start) {
        return this
      }
      start = start >>> 0
      end = end === void 0 ? this.length : end >>> 0
      if (!val) val = 0
      let i2
      if (typeof val === 'number') {
        for (i2 = start; i2 < end; ++i2) {
          this[i2] = val
        }
      } else {
        const bytes = Buffer2.isBuffer(val) ? val : Buffer2.from(val, encoding)
        const len2 = bytes.length
        if (len2 === 0) {
          throw new TypeError('The value "' + val + '" is invalid for argument "value"')
        }
        for (i2 = 0; i2 < end - start; ++i2) {
          this[i2 + start] = bytes[i2 % len2]
        }
      }
      return this
    }
    const errors = {}
    function E(sym, getMessage, Base) {
      errors[sym] = class NodeError extends Base {
        constructor() {
          super()
          Object.defineProperty(this, 'message', {
            value: getMessage.apply(this, arguments),
            writable: true,
            configurable: true,
          })
          this.name = `${this.name} [${sym}]`
          this.stack
          delete this.name
        }
        get code() {
          return sym
        }
        set code(value) {
          Object.defineProperty(this, 'code', {
            configurable: true,
            enumerable: true,
            value,
            writable: true,
          })
        }
        toString() {
          return `${this.name} [${sym}]: ${this.message}`
        }
      }
    }
    E(
      'ERR_BUFFER_OUT_OF_BOUNDS',
      function (name) {
        if (name) {
          return `${name} is outside of buffer bounds`
        }
        return 'Attempt to access memory outside buffer bounds'
      },
      RangeError
    )
    E(
      'ERR_INVALID_ARG_TYPE',
      function (name, actual) {
        return `The "${name}" argument must be of type number. Received type ${typeof actual}`
      },
      TypeError
    )
    E(
      'ERR_OUT_OF_RANGE',
      function (str, range, input) {
        let msg = `The value of "${str}" is out of range.`
        let received = input
        if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
          received = addNumericalSeparator(String(input))
        } else if (typeof input === 'bigint') {
          received = String(input)
          if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
            received = addNumericalSeparator(received)
          }
          received += 'n'
        }
        msg += ` It must be ${range}. Received ${received}`
        return msg
      },
      RangeError
    )
    function addNumericalSeparator(val) {
      let res = ''
      let i2 = val.length
      const start = val[0] === '-' ? 1 : 0
      for (; i2 >= start + 4; i2 -= 3) {
        res = `_${val.slice(i2 - 3, i2)}${res}`
      }
      return `${val.slice(0, i2)}${res}`
    }
    function checkBounds(buf, offset, byteLength3) {
      validateNumber(offset, 'offset')
      if (buf[offset] === void 0 || buf[offset + byteLength3] === void 0) {
        boundsError(offset, buf.length - (byteLength3 + 1))
      }
    }
    function checkIntBI(value, min, max, buf, offset, byteLength3) {
      if (value > max || value < min) {
        const n = typeof min === 'bigint' ? 'n' : ''
        let range
        {
          if (min === 0 || min === BigInt(0)) {
            range = `>= 0${n} and < 2${n} ** ${(byteLength3 + 1) * 8}${n}`
          } else {
            range = `>= -(2${n} ** ${(byteLength3 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength3 + 1) * 8 - 1}${n}`
          }
        }
        throw new errors.ERR_OUT_OF_RANGE('value', range, value)
      }
      checkBounds(buf, offset, byteLength3)
    }
    function validateNumber(value, name) {
      if (typeof value !== 'number') {
        throw new errors.ERR_INVALID_ARG_TYPE(name, 'number', value)
      }
    }
    function boundsError(value, length, type) {
      if (Math.floor(value) !== value) {
        validateNumber(value, type)
        throw new errors.ERR_OUT_OF_RANGE('offset', 'an integer', value)
      }
      if (length < 0) {
        throw new errors.ERR_BUFFER_OUT_OF_BOUNDS()
      }
      throw new errors.ERR_OUT_OF_RANGE('offset', `>= ${0} and <= ${length}`, value)
    }
    const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g
    function base64clean(str) {
      str = str.split('=')[0]
      str = str.trim().replace(INVALID_BASE64_RE, '')
      if (str.length < 2) return ''
      while (str.length % 4 !== 0) {
        str = str + '='
      }
      return str
    }
    function utf8ToBytes(string, units) {
      units = units || Infinity
      let codePoint
      const length = string.length
      let leadSurrogate = null
      const bytes = []
      for (let i2 = 0; i2 < length; ++i2) {
        codePoint = string.charCodeAt(i2)
        if (codePoint > 55295 && codePoint < 57344) {
          if (!leadSurrogate) {
            if (codePoint > 56319) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189)
              continue
            } else if (i2 + 1 === length) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189)
              continue
            }
            leadSurrogate = codePoint
            continue
          }
          if (codePoint < 56320) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189)
            leadSurrogate = codePoint
            continue
          }
          codePoint = (((leadSurrogate - 55296) << 10) | (codePoint - 56320)) + 65536
        } else if (leadSurrogate) {
          if ((units -= 3) > -1) bytes.push(239, 191, 189)
        }
        leadSurrogate = null
        if (codePoint < 128) {
          if ((units -= 1) < 0) break
          bytes.push(codePoint)
        } else if (codePoint < 2048) {
          if ((units -= 2) < 0) break
          bytes.push((codePoint >> 6) | 192, (codePoint & 63) | 128)
        } else if (codePoint < 65536) {
          if ((units -= 3) < 0) break
          bytes.push((codePoint >> 12) | 224, ((codePoint >> 6) & 63) | 128, (codePoint & 63) | 128)
        } else if (codePoint < 1114112) {
          if ((units -= 4) < 0) break
          bytes.push(
            (codePoint >> 18) | 240,
            ((codePoint >> 12) & 63) | 128,
            ((codePoint >> 6) & 63) | 128,
            (codePoint & 63) | 128
          )
        } else {
          throw new Error('Invalid code point')
        }
      }
      return bytes
    }
    function asciiToBytes(str) {
      const byteArray = []
      for (let i2 = 0; i2 < str.length; ++i2) {
        byteArray.push(str.charCodeAt(i2) & 255)
      }
      return byteArray
    }
    function utf16leToBytes(str, units) {
      let c, hi, lo
      const byteArray = []
      for (let i2 = 0; i2 < str.length; ++i2) {
        if ((units -= 2) < 0) break
        c = str.charCodeAt(i2)
        hi = c >> 8
        lo = c % 256
        byteArray.push(lo)
        byteArray.push(hi)
      }
      return byteArray
    }
    function base64ToBytes(str) {
      return base64.toByteArray(base64clean(str))
    }
    function blitBuffer(src, dst, offset, length) {
      let i2
      for (i2 = 0; i2 < length; ++i2) {
        if (i2 + offset >= dst.length || i2 >= src.length) break
        dst[i2 + offset] = src[i2]
      }
      return i2
    }
    function isInstance(obj, type) {
      return (
        obj instanceof type ||
        (obj != null &&
          obj.constructor != null &&
          obj.constructor.name != null &&
          obj.constructor.name === type.name)
      )
    }
    function numberIsNaN(obj) {
      return obj !== obj
    }
    const hexSliceLookupTable = (function () {
      const alphabet = '0123456789abcdef'
      const table = new Array(256)
      for (let i2 = 0; i2 < 16; ++i2) {
        const i16 = i2 * 16
        for (let j = 0; j < 16; ++j) {
          table[i16 + j] = alphabet[i2] + alphabet[j]
        }
      }
      return table
    })()
    function defineBigIntMethod(fn) {
      return typeof BigInt === 'undefined' ? BufferBigIntNotDefined : fn
    }
    function BufferBigIntNotDefined() {
      throw new Error('BigInt not supported')
    }
  })(buffer)
  const Buffer = buffer.Buffer
  function AxiosError$1(message, code2, config, request, response) {
    Error.call(this)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = new Error().stack
    }
    this.message = message
    this.name = 'AxiosError'
    code2 && (this.code = code2)
    config && (this.config = config)
    request && (this.request = request)
    if (response) {
      this.response = response
      this.status = response.status ? response.status : null
    }
  }
  utils$1.inherits(AxiosError$1, Error, {
    toJSON: function toJSON() {
      return {
        // Standard
        message: this.message,
        name: this.name,
        // Microsoft
        description: this.description,
        number: this.number,
        // Mozilla
        fileName: this.fileName,
        lineNumber: this.lineNumber,
        columnNumber: this.columnNumber,
        stack: this.stack,
        // Axios
        config: utils$1.toJSONObject(this.config),
        code: this.code,
        status: this.status,
      }
    },
  })
  const prototype$1 = AxiosError$1.prototype
  const descriptors = {}
  ;[
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
    // eslint-disable-next-line func-names
  ].forEach((code2) => {
    descriptors[code2] = { value: code2 }
  })
  Object.defineProperties(AxiosError$1, descriptors)
  Object.defineProperty(prototype$1, 'isAxiosError', { value: true })
  AxiosError$1.from = (error, code2, config, request, response, customProps) => {
    const axiosError = Object.create(prototype$1)
    utils$1.toFlatObject(
      error,
      axiosError,
      function filter(obj) {
        return obj !== Error.prototype
      },
      (prop) => {
        return prop !== 'isAxiosError'
      }
    )
    AxiosError$1.call(axiosError, error.message, code2, config, request, response)
    axiosError.cause = error
    axiosError.name = error.name
    customProps && Object.assign(axiosError, customProps)
    return axiosError
  }
  var httpAdapter = null
  function isVisitable(thing) {
    return utils$1.isPlainObject(thing) || utils$1.isArray(thing)
  }
  function removeBrackets(key) {
    return utils$1.endsWith(key, '[]') ? key.slice(0, -2) : key
  }
  function renderKey(path, key, dots) {
    if (!path) return key
    return path
      .concat(key)
      .map(function each(token, i2) {
        token = removeBrackets(token)
        return !dots && i2 ? '[' + token + ']' : token
      })
      .join(dots ? '.' : '')
  }
  function isFlatArray(arr) {
    return utils$1.isArray(arr) && !arr.some(isVisitable)
  }
  const predicates = utils$1.toFlatObject(utils$1, {}, null, function filter(prop) {
    return /^is[A-Z]/.test(prop)
  })
  function toFormData$1(obj, formData, options) {
    if (!utils$1.isObject(obj)) {
      throw new TypeError('target must be an object')
    }
    formData = formData || new FormData()
    options = utils$1.toFlatObject(
      options,
      {
        metaTokens: true,
        dots: false,
        indexes: false,
      },
      false,
      function defined(option, source) {
        return !utils$1.isUndefined(source[option])
      }
    )
    const metaTokens = options.metaTokens
    const visitor = options.visitor || defaultVisitor
    const dots = options.dots
    const indexes = options.indexes
    const _Blob = options.Blob || (typeof Blob !== 'undefined' && Blob)
    const useBlob = _Blob && utils$1.isSpecCompliantForm(formData)
    if (!utils$1.isFunction(visitor)) {
      throw new TypeError('visitor must be a function')
    }
    function convertValue(value) {
      if (value === null) return ''
      if (utils$1.isDate(value)) {
        return value.toISOString()
      }
      if (utils$1.isBoolean(value)) {
        return value.toString()
      }
      if (!useBlob && utils$1.isBlob(value)) {
        throw new AxiosError$1('Blob is not supported. Use a Buffer instead.')
      }
      if (utils$1.isArrayBuffer(value) || utils$1.isTypedArray(value)) {
        return useBlob && typeof Blob === 'function' ? new Blob([value]) : Buffer.from(value)
      }
      return value
    }
    function defaultVisitor(value, key, path) {
      let arr = value
      if (value && !path && typeof value === 'object') {
        if (utils$1.endsWith(key, '{}')) {
          key = metaTokens ? key : key.slice(0, -2)
          value = JSON.stringify(value)
        } else if (
          (utils$1.isArray(value) && isFlatArray(value)) ||
          ((utils$1.isFileList(value) || utils$1.endsWith(key, '[]')) &&
            (arr = utils$1.toArray(value)))
        ) {
          key = removeBrackets(key)
          arr.forEach(function each(el, index) {
            !(utils$1.isUndefined(el) || el === null) &&
              formData.append(
                // eslint-disable-next-line no-nested-ternary
                indexes === true
                  ? renderKey([key], index, dots)
                  : indexes === null
                    ? key
                    : key + '[]',
                convertValue(el)
              )
          })
          return false
        }
      }
      if (isVisitable(value)) {
        return true
      }
      formData.append(renderKey(path, key, dots), convertValue(value))
      return false
    }
    const stack = []
    const exposedHelpers = Object.assign(predicates, {
      defaultVisitor,
      convertValue,
      isVisitable,
    })
    function build(value, path) {
      if (utils$1.isUndefined(value)) return
      if (stack.indexOf(value) !== -1) {
        throw Error('Circular reference detected in ' + path.join('.'))
      }
      stack.push(value)
      utils$1.forEach(value, function each(el, key) {
        const result =
          !(utils$1.isUndefined(el) || el === null) &&
          visitor.call(formData, el, utils$1.isString(key) ? key.trim() : key, path, exposedHelpers)
        if (result === true) {
          build(el, path ? path.concat(key) : [key])
        }
      })
      stack.pop()
    }
    if (!utils$1.isObject(obj)) {
      throw new TypeError('data must be an object')
    }
    build(obj)
    return formData
  }
  function encode$1(str) {
    const charMap = {
      '!': '%21',
      "'": '%27',
      '(': '%28',
      ')': '%29',
      '~': '%7E',
      '%20': '+',
      '%00': '\0',
    }
    return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
      return charMap[match]
    })
  }
  function AxiosURLSearchParams(params, options) {
    this._pairs = []
    params && toFormData$1(params, this, options)
  }
  const prototype = AxiosURLSearchParams.prototype
  prototype.append = function append(name, value) {
    this._pairs.push([name, value])
  }
  prototype.toString = function toString2(encoder) {
    const _encode = encoder
      ? function (value) {
          return encoder.call(this, value, encode$1)
        }
      : encode$1
    return this._pairs
      .map(function each(pair) {
        return _encode(pair[0]) + '=' + _encode(pair[1])
      }, '')
      .join('&')
  }
  function encode(val) {
    return encodeURIComponent(val)
      .replace(/%3A/gi, ':')
      .replace(/%24/g, '$')
      .replace(/%2C/gi, ',')
      .replace(/%20/g, '+')
      .replace(/%5B/gi, '[')
      .replace(/%5D/gi, ']')
  }
  function buildURL(url, params, options) {
    if (!params) {
      return url
    }
    const _encode = (options && options.encode) || encode
    if (utils$1.isFunction(options)) {
      options = {
        serialize: options,
      }
    }
    const serializeFn = options && options.serialize
    let serializedParams
    if (serializeFn) {
      serializedParams = serializeFn(params, options)
    } else {
      serializedParams = utils$1.isURLSearchParams(params)
        ? params.toString()
        : new AxiosURLSearchParams(params, options).toString(_encode)
    }
    if (serializedParams) {
      const hashmarkIndex = url.indexOf('#')
      if (hashmarkIndex !== -1) {
        url = url.slice(0, hashmarkIndex)
      }
      url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
    }
    return url
  }
  class InterceptorManager {
    constructor() {
      this.handlers = []
    }
    /**
     * Add a new interceptor to the stack
     *
     * @param {Function} fulfilled The function to handle `then` for a `Promise`
     * @param {Function} rejected The function to handle `reject` for a `Promise`
     *
     * @return {Number} An ID used to remove interceptor later
     */
    use(fulfilled, rejected, options) {
      this.handlers.push({
        fulfilled,
        rejected,
        synchronous: options ? options.synchronous : false,
        runWhen: options ? options.runWhen : null,
      })
      return this.handlers.length - 1
    }
    /**
     * Remove an interceptor from the stack
     *
     * @param {Number} id The ID that was returned by `use`
     *
     * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
     */
    eject(id) {
      if (this.handlers[id]) {
        this.handlers[id] = null
      }
    }
    /**
     * Clear all interceptors from the stack
     *
     * @returns {void}
     */
    clear() {
      if (this.handlers) {
        this.handlers = []
      }
    }
    /**
     * Iterate over all the registered interceptors
     *
     * This method is particularly useful for skipping over any
     * interceptors that may have become `null` calling `eject`.
     *
     * @param {Function} fn The function to call for each interceptor
     *
     * @returns {void}
     */
    forEach(fn) {
      utils$1.forEach(this.handlers, function forEachHandler(h) {
        if (h !== null) {
          fn(h)
        }
      })
    }
  }
  var transitionalDefaults = {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false,
  }
  var URLSearchParams$1 =
    typeof URLSearchParams !== 'undefined' ? URLSearchParams : AxiosURLSearchParams
  var FormData$1 = typeof FormData !== 'undefined' ? FormData : null
  var Blob$1 = typeof Blob !== 'undefined' ? Blob : null
  var platform$1 = {
    isBrowser: true,
    classes: {
      URLSearchParams: URLSearchParams$1,
      FormData: FormData$1,
      Blob: Blob$1,
    },
    protocols: ['http', 'https', 'file', 'blob', 'url', 'data'],
  }
  const hasBrowserEnv = typeof window !== 'undefined' && typeof document !== 'undefined'
  const _navigator = (typeof navigator === 'object' && navigator) || void 0
  const hasStandardBrowserEnv =
    hasBrowserEnv &&
    (!_navigator || ['ReactNative', 'NativeScript', 'NS'].indexOf(_navigator.product) < 0)
  const hasStandardBrowserWebWorkerEnv = (() => {
    return (
      typeof WorkerGlobalScope !== 'undefined' && // eslint-disable-next-line no-undef
      self instanceof WorkerGlobalScope &&
      typeof self.importScripts === 'function'
    )
  })()
  const origin = (hasBrowserEnv && window.location.href) || 'http://localhost'
  var utils = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    hasBrowserEnv,
    hasStandardBrowserEnv,
    hasStandardBrowserWebWorkerEnv,
    navigator: _navigator,
    origin,
  })
  var platform = {
    ...utils,
    ...platform$1,
  }
  function toURLEncodedForm(data, options) {
    return toFormData$1(data, new platform.classes.URLSearchParams(), {
      visitor: function (value, key, path, helpers) {
        if (platform.isNode && utils$1.isBuffer(value)) {
          this.append(key, value.toString('base64'))
          return false
        }
        return helpers.defaultVisitor.apply(this, arguments)
      },
      ...options,
    })
  }
  function parsePropPath(name) {
    return utils$1.matchAll(/\w+|\[(\w*)]/g, name).map((match) => {
      return match[0] === '[]' ? '' : match[1] || match[0]
    })
  }
  function arrayToObject(arr) {
    const obj = {}
    const keys = Object.keys(arr)
    let i2
    const len2 = keys.length
    let key
    for (i2 = 0; i2 < len2; i2++) {
      key = keys[i2]
      obj[key] = arr[key]
    }
    return obj
  }
  function formDataToJSON(formData) {
    function buildPath(path, value, target, index) {
      let name = path[index++]
      if (name === '__proto__') return true
      const isNumericKey = Number.isFinite(+name)
      const isLast = index >= path.length
      name = !name && utils$1.isArray(target) ? target.length : name
      if (isLast) {
        if (utils$1.hasOwnProp(target, name)) {
          target[name] = [target[name], value]
        } else {
          target[name] = value
        }
        return !isNumericKey
      }
      if (!target[name] || !utils$1.isObject(target[name])) {
        target[name] = []
      }
      const result = buildPath(path, value, target[name], index)
      if (result && utils$1.isArray(target[name])) {
        target[name] = arrayToObject(target[name])
      }
      return !isNumericKey
    }
    if (utils$1.isFormData(formData) && utils$1.isFunction(formData.entries)) {
      const obj = {}
      utils$1.forEachEntry(formData, (name, value) => {
        buildPath(parsePropPath(name), value, obj, 0)
      })
      return obj
    }
    return null
  }
  function stringifySafely(rawValue, parser, encoder) {
    if (utils$1.isString(rawValue)) {
      try {
        ;(parser || JSON.parse)(rawValue)
        return utils$1.trim(rawValue)
      } catch (e) {
        if (e.name !== 'SyntaxError') {
          throw e
        }
      }
    }
    return (encoder || JSON.stringify)(rawValue)
  }
  const defaults = {
    transitional: transitionalDefaults,
    adapter: ['xhr', 'http', 'fetch'],
    transformRequest: [
      function transformRequest(data, headers) {
        const contentType = headers.getContentType() || ''
        const hasJSONContentType = contentType.indexOf('application/json') > -1
        const isObjectPayload = utils$1.isObject(data)
        if (isObjectPayload && utils$1.isHTMLForm(data)) {
          data = new FormData(data)
        }
        const isFormData2 = utils$1.isFormData(data)
        if (isFormData2) {
          return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data
        }
        if (
          utils$1.isArrayBuffer(data) ||
          utils$1.isBuffer(data) ||
          utils$1.isStream(data) ||
          utils$1.isFile(data) ||
          utils$1.isBlob(data) ||
          utils$1.isReadableStream(data)
        ) {
          return data
        }
        if (utils$1.isArrayBufferView(data)) {
          return data.buffer
        }
        if (utils$1.isURLSearchParams(data)) {
          headers.setContentType('application/x-www-form-urlencoded;charset=utf-8', false)
          return data.toString()
        }
        let isFileList2
        if (isObjectPayload) {
          if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
            return toURLEncodedForm(data, this.formSerializer).toString()
          }
          if (
            (isFileList2 = utils$1.isFileList(data)) ||
            contentType.indexOf('multipart/form-data') > -1
          ) {
            const _FormData = this.env && this.env.FormData
            return toFormData$1(
              isFileList2 ? { 'files[]': data } : data,
              _FormData && new _FormData(),
              this.formSerializer
            )
          }
        }
        if (isObjectPayload || hasJSONContentType) {
          headers.setContentType('application/json', false)
          return stringifySafely(data)
        }
        return data
      },
    ],
    transformResponse: [
      function transformResponse(data) {
        const transitional = this.transitional || defaults.transitional
        const forcedJSONParsing = transitional && transitional.forcedJSONParsing
        const JSONRequested = this.responseType === 'json'
        if (utils$1.isResponse(data) || utils$1.isReadableStream(data)) {
          return data
        }
        if (
          data &&
          utils$1.isString(data) &&
          ((forcedJSONParsing && !this.responseType) || JSONRequested)
        ) {
          const silentJSONParsing = transitional && transitional.silentJSONParsing
          const strictJSONParsing = !silentJSONParsing && JSONRequested
          try {
            return JSON.parse(data)
          } catch (e) {
            if (strictJSONParsing) {
              if (e.name === 'SyntaxError') {
                throw AxiosError$1.from(e, AxiosError$1.ERR_BAD_RESPONSE, this, null, this.response)
              }
              throw e
            }
          }
        }
        return data
      },
    ],
    /**
     * A timeout in milliseconds to abort a request. If set to 0 (default) a
     * timeout is not created.
     */
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {
      FormData: platform.classes.FormData,
      Blob: platform.classes.Blob,
    },
    validateStatus: function validateStatus(status) {
      return status >= 200 && status < 300
    },
    headers: {
      common: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': void 0,
      },
    },
  }
  utils$1.forEach(['delete', 'get', 'head', 'post', 'put', 'patch'], (method) => {
    defaults.headers[method] = {}
  })
  const ignoreDuplicateOf = utils$1.toObjectSet([
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
  var parseHeaders = (rawHeaders) => {
    const parsed = {}
    let key
    let val
    let i2
    rawHeaders &&
      rawHeaders.split('\n').forEach(function parser(line) {
        i2 = line.indexOf(':')
        key = line.substring(0, i2).trim().toLowerCase()
        val = line.substring(i2 + 1).trim()
        if (!key || (parsed[key] && ignoreDuplicateOf[key])) {
          return
        }
        if (key === 'set-cookie') {
          if (parsed[key]) {
            parsed[key].push(val)
          } else {
            parsed[key] = [val]
          }
        } else {
          parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val
        }
      })
    return parsed
  }
  const $internals = Symbol('internals')
  function normalizeHeader(header) {
    return header && String(header).trim().toLowerCase()
  }
  function normalizeValue(value) {
    if (value === false || value == null) {
      return value
    }
    return utils$1.isArray(value) ? value.map(normalizeValue) : String(value)
  }
  function parseTokens(str) {
    const tokens = /* @__PURE__ */ Object.create(null)
    const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g
    let match
    while ((match = tokensRE.exec(str))) {
      tokens[match[1]] = match[2]
    }
    return tokens
  }
  const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim())
  function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
    if (utils$1.isFunction(filter)) {
      return filter.call(this, value, header)
    }
    if (isHeaderNameFilter) {
      value = header
    }
    if (!utils$1.isString(value)) return
    if (utils$1.isString(filter)) {
      return value.indexOf(filter) !== -1
    }
    if (utils$1.isRegExp(filter)) {
      return filter.test(value)
    }
  }
  function formatHeader(header) {
    return header
      .trim()
      .toLowerCase()
      .replace(/([a-z\d])(\w*)/g, (w, char, str) => {
        return char.toUpperCase() + str
      })
  }
  function buildAccessors(obj, header) {
    const accessorName = utils$1.toCamelCase(' ' + header)
    ;['get', 'set', 'has'].forEach((methodName) => {
      Object.defineProperty(obj, methodName + accessorName, {
        value: function (arg1, arg2, arg3) {
          return this[methodName].call(this, header, arg1, arg2, arg3)
        },
        configurable: true,
      })
    })
  }
  let AxiosHeaders$1 = class AxiosHeaders {
    constructor(headers) {
      headers && this.set(headers)
    }
    set(header, valueOrRewrite, rewrite) {
      const self2 = this
      function setHeader(_value, _header, _rewrite) {
        const lHeader = normalizeHeader(_header)
        if (!lHeader) {
          throw new Error('header name must be a non-empty string')
        }
        const key = utils$1.findKey(self2, lHeader)
        if (
          !key ||
          self2[key] === void 0 ||
          _rewrite === true ||
          (_rewrite === void 0 && self2[key] !== false)
        ) {
          self2[key || _header] = normalizeValue(_value)
        }
      }
      const setHeaders = (headers, _rewrite) =>
        utils$1.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite))
      if (utils$1.isPlainObject(header) || header instanceof this.constructor) {
        setHeaders(header, valueOrRewrite)
      } else if (
        utils$1.isString(header) &&
        (header = header.trim()) &&
        !isValidHeaderName(header)
      ) {
        setHeaders(parseHeaders(header), valueOrRewrite)
      } else if (utils$1.isObject(header) && utils$1.isIterable(header)) {
        let obj = {},
          dest,
          key
        for (const entry of header) {
          if (!utils$1.isArray(entry)) {
            throw TypeError('Object iterator must return a key-value pair')
          }
          obj[(key = entry[0])] = (dest = obj[key])
            ? utils$1.isArray(dest)
              ? [...dest, entry[1]]
              : [dest, entry[1]]
            : entry[1]
        }
        setHeaders(obj, valueOrRewrite)
      } else {
        header != null && setHeader(valueOrRewrite, header, rewrite)
      }
      return this
    }
    get(header, parser) {
      header = normalizeHeader(header)
      if (header) {
        const key = utils$1.findKey(this, header)
        if (key) {
          const value = this[key]
          if (!parser) {
            return value
          }
          if (parser === true) {
            return parseTokens(value)
          }
          if (utils$1.isFunction(parser)) {
            return parser.call(this, value, key)
          }
          if (utils$1.isRegExp(parser)) {
            return parser.exec(value)
          }
          throw new TypeError('parser must be boolean|regexp|function')
        }
      }
    }
    has(header, matcher) {
      header = normalizeHeader(header)
      if (header) {
        const key = utils$1.findKey(this, header)
        return !!(
          key &&
          this[key] !== void 0 &&
          (!matcher || matchHeaderValue(this, this[key], key, matcher))
        )
      }
      return false
    }
    delete(header, matcher) {
      const self2 = this
      let deleted = false
      function deleteHeader(_header) {
        _header = normalizeHeader(_header)
        if (_header) {
          const key = utils$1.findKey(self2, _header)
          if (key && (!matcher || matchHeaderValue(self2, self2[key], key, matcher))) {
            delete self2[key]
            deleted = true
          }
        }
      }
      if (utils$1.isArray(header)) {
        header.forEach(deleteHeader)
      } else {
        deleteHeader(header)
      }
      return deleted
    }
    clear(matcher) {
      const keys = Object.keys(this)
      let i2 = keys.length
      let deleted = false
      while (i2--) {
        const key = keys[i2]
        if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
          delete this[key]
          deleted = true
        }
      }
      return deleted
    }
    normalize(format) {
      const self2 = this
      const headers = {}
      utils$1.forEach(this, (value, header) => {
        const key = utils$1.findKey(headers, header)
        if (key) {
          self2[key] = normalizeValue(value)
          delete self2[header]
          return
        }
        const normalized = format ? formatHeader(header) : String(header).trim()
        if (normalized !== header) {
          delete self2[header]
        }
        self2[normalized] = normalizeValue(value)
        headers[normalized] = true
      })
      return this
    }
    concat(...targets) {
      return this.constructor.concat(this, ...targets)
    }
    toJSON(asStrings) {
      const obj = /* @__PURE__ */ Object.create(null)
      utils$1.forEach(this, (value, header) => {
        value != null &&
          value !== false &&
          (obj[header] = asStrings && utils$1.isArray(value) ? value.join(', ') : value)
      })
      return obj
    }
    [Symbol.iterator]() {
      return Object.entries(this.toJSON())[Symbol.iterator]()
    }
    toString() {
      return Object.entries(this.toJSON())
        .map(([header, value]) => header + ': ' + value)
        .join('\n')
    }
    getSetCookie() {
      return this.get('set-cookie') || []
    }
    get [Symbol.toStringTag]() {
      return 'AxiosHeaders'
    }
    static from(thing) {
      return thing instanceof this ? thing : new this(thing)
    }
    static concat(first, ...targets) {
      const computed = new this(first)
      targets.forEach((target) => computed.set(target))
      return computed
    }
    static accessor(header) {
      const internals =
        (this[$internals] =
        this[$internals] =
          {
            accessors: {},
          })
      const accessors = internals.accessors
      const prototype2 = this.prototype
      function defineAccessor(_header) {
        const lHeader = normalizeHeader(_header)
        if (!accessors[lHeader]) {
          buildAccessors(prototype2, _header)
          accessors[lHeader] = true
        }
      }
      utils$1.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header)
      return this
    }
  }
  AxiosHeaders$1.accessor([
    'Content-Type',
    'Content-Length',
    'Accept',
    'Accept-Encoding',
    'User-Agent',
    'Authorization',
  ])
  utils$1.reduceDescriptors(AxiosHeaders$1.prototype, ({ value }, key) => {
    let mapped = key[0].toUpperCase() + key.slice(1)
    return {
      get: () => value,
      set(headerValue) {
        this[mapped] = headerValue
      },
    }
  })
  utils$1.freezeMethods(AxiosHeaders$1)
  function transformData(fns, response) {
    const config = this || defaults
    const context = response || config
    const headers = AxiosHeaders$1.from(context.headers)
    let data = context.data
    utils$1.forEach(fns, function transform(fn) {
      data = fn.call(config, data, headers.normalize(), response ? response.status : void 0)
    })
    headers.normalize()
    return data
  }
  function isCancel$1(value) {
    return !!(value && value.__CANCEL__)
  }
  function CanceledError$1(message, config, request) {
    AxiosError$1.call(
      this,
      message == null ? 'canceled' : message,
      AxiosError$1.ERR_CANCELED,
      config,
      request
    )
    this.name = 'CanceledError'
  }
  utils$1.inherits(CanceledError$1, AxiosError$1, {
    __CANCEL__: true,
  })
  function settle(resolve, reject, response) {
    const validateStatus = response.config.validateStatus
    if (!response.status || !validateStatus || validateStatus(response.status)) {
      resolve(response)
    } else {
      reject(
        new AxiosError$1(
          'Request failed with status code ' + response.status,
          [AxiosError$1.ERR_BAD_REQUEST, AxiosError$1.ERR_BAD_RESPONSE][
            Math.floor(response.status / 100) - 4
          ],
          response.config,
          response.request,
          response
        )
      )
    }
  }
  function parseProtocol(url) {
    const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url)
    return (match && match[1]) || ''
  }
  function speedometer(samplesCount, min) {
    samplesCount = samplesCount || 10
    const bytes = new Array(samplesCount)
    const timestamps = new Array(samplesCount)
    let head = 0
    let tail = 0
    let firstSampleTS
    min = min !== void 0 ? min : 1e3
    return function push(chunkLength) {
      const now = Date.now()
      const startedAt = timestamps[tail]
      if (!firstSampleTS) {
        firstSampleTS = now
      }
      bytes[head] = chunkLength
      timestamps[head] = now
      let i2 = tail
      let bytesCount = 0
      while (i2 !== head) {
        bytesCount += bytes[i2++]
        i2 = i2 % samplesCount
      }
      head = (head + 1) % samplesCount
      if (head === tail) {
        tail = (tail + 1) % samplesCount
      }
      if (now - firstSampleTS < min) {
        return
      }
      const passed = startedAt && now - startedAt
      return passed ? Math.round((bytesCount * 1e3) / passed) : void 0
    }
  }
  function throttle(fn, freq) {
    let timestamp = 0
    let threshold = 1e3 / freq
    let lastArgs
    let timer
    const invoke = (args, now = Date.now()) => {
      timestamp = now
      lastArgs = null
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      fn(...args)
    }
    const throttled = (...args) => {
      const now = Date.now()
      const passed = now - timestamp
      if (passed >= threshold) {
        invoke(args, now)
      } else {
        lastArgs = args
        if (!timer) {
          timer = setTimeout(() => {
            timer = null
            invoke(lastArgs)
          }, threshold - passed)
        }
      }
    }
    const flush = () => lastArgs && invoke(lastArgs)
    return [throttled, flush]
  }
  const progressEventReducer = (listener, isDownloadStream, freq = 3) => {
    let bytesNotified = 0
    const _speedometer = speedometer(50, 250)
    return throttle((e) => {
      const loaded = e.loaded
      const total = e.lengthComputable ? e.total : void 0
      const progressBytes = loaded - bytesNotified
      const rate = _speedometer(progressBytes)
      const inRange = loaded <= total
      bytesNotified = loaded
      const data = {
        loaded,
        total,
        progress: total ? loaded / total : void 0,
        bytes: progressBytes,
        rate: rate ? rate : void 0,
        estimated: rate && total && inRange ? (total - loaded) / rate : void 0,
        event: e,
        lengthComputable: total != null,
        [isDownloadStream ? 'download' : 'upload']: true,
      }
      listener(data)
    }, freq)
  }
  const progressEventDecorator = (total, throttled) => {
    const lengthComputable = total != null
    return [
      (loaded) =>
        throttled[0]({
          lengthComputable,
          total,
          loaded,
        }),
      throttled[1],
    ]
  }
  const asyncDecorator =
    (fn) =>
    (...args) =>
      utils$1.asap(() => fn(...args))
  var isURLSameOrigin = platform.hasStandardBrowserEnv
    ? /* @__PURE__ */ ((origin2, isMSIE) => (url) => {
        url = new URL(url, platform.origin)
        return (
          origin2.protocol === url.protocol &&
          origin2.host === url.host &&
          (isMSIE || origin2.port === url.port)
        )
      })(
        new URL(platform.origin),
        platform.navigator && /(msie|trident)/i.test(platform.navigator.userAgent)
      )
    : () => true
  var cookies = platform.hasStandardBrowserEnv
    ? // Standard browser envs support document.cookie
      {
        write(name, value, expires, path, domain, secure) {
          const cookie = [name + '=' + encodeURIComponent(value)]
          utils$1.isNumber(expires) && cookie.push('expires=' + new Date(expires).toGMTString())
          utils$1.isString(path) && cookie.push('path=' + path)
          utils$1.isString(domain) && cookie.push('domain=' + domain)
          secure === true && cookie.push('secure')
          document.cookie = cookie.join('; ')
        },
        read(name) {
          const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'))
          return match ? decodeURIComponent(match[3]) : null
        },
        remove(name) {
          this.write(name, '', Date.now() - 864e5)
        },
      }
    : // Non-standard browser env (web workers, react-native) lack needed support.
      {
        write() {},
        read() {
          return null
        },
        remove() {},
      }
  function isAbsoluteURL(url) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url)
  }
  function combineURLs(baseURL, relativeURL) {
    return relativeURL
      ? baseURL.replace(/\/?\/$/, '') + '/' + relativeURL.replace(/^\/+/, '')
      : baseURL
  }
  function buildFullPath(baseURL, requestedURL, allowAbsoluteUrls) {
    let isRelativeUrl = !isAbsoluteURL(requestedURL)
    if (baseURL && (isRelativeUrl || allowAbsoluteUrls == false)) {
      return combineURLs(baseURL, requestedURL)
    }
    return requestedURL
  }
  const headersToObject = (thing) => (thing instanceof AxiosHeaders$1 ? { ...thing } : thing)
  function mergeConfig$1(config1, config2) {
    config2 = config2 || {}
    const config = {}
    function getMergedValue(target, source, prop, caseless) {
      if (utils$1.isPlainObject(target) && utils$1.isPlainObject(source)) {
        return utils$1.merge.call({ caseless }, target, source)
      } else if (utils$1.isPlainObject(source)) {
        return utils$1.merge({}, source)
      } else if (utils$1.isArray(source)) {
        return source.slice()
      }
      return source
    }
    function mergeDeepProperties(a, b, prop, caseless) {
      if (!utils$1.isUndefined(b)) {
        return getMergedValue(a, b, prop, caseless)
      } else if (!utils$1.isUndefined(a)) {
        return getMergedValue(void 0, a, prop, caseless)
      }
    }
    function valueFromConfig2(a, b) {
      if (!utils$1.isUndefined(b)) {
        return getMergedValue(void 0, b)
      }
    }
    function defaultToConfig2(a, b) {
      if (!utils$1.isUndefined(b)) {
        return getMergedValue(void 0, b)
      } else if (!utils$1.isUndefined(a)) {
        return getMergedValue(void 0, a)
      }
    }
    function mergeDirectKeys(a, b, prop) {
      if (prop in config2) {
        return getMergedValue(a, b)
      } else if (prop in config1) {
        return getMergedValue(void 0, a)
      }
    }
    const mergeMap = {
      url: valueFromConfig2,
      method: valueFromConfig2,
      data: valueFromConfig2,
      baseURL: defaultToConfig2,
      transformRequest: defaultToConfig2,
      transformResponse: defaultToConfig2,
      paramsSerializer: defaultToConfig2,
      timeout: defaultToConfig2,
      timeoutMessage: defaultToConfig2,
      withCredentials: defaultToConfig2,
      withXSRFToken: defaultToConfig2,
      adapter: defaultToConfig2,
      responseType: defaultToConfig2,
      xsrfCookieName: defaultToConfig2,
      xsrfHeaderName: defaultToConfig2,
      onUploadProgress: defaultToConfig2,
      onDownloadProgress: defaultToConfig2,
      decompress: defaultToConfig2,
      maxContentLength: defaultToConfig2,
      maxBodyLength: defaultToConfig2,
      beforeRedirect: defaultToConfig2,
      transport: defaultToConfig2,
      httpAgent: defaultToConfig2,
      httpsAgent: defaultToConfig2,
      cancelToken: defaultToConfig2,
      socketPath: defaultToConfig2,
      responseEncoding: defaultToConfig2,
      validateStatus: mergeDirectKeys,
      headers: (a, b, prop) =>
        mergeDeepProperties(headersToObject(a), headersToObject(b), prop, true),
    }
    utils$1.forEach(Object.keys({ ...config1, ...config2 }), function computeConfigValue(prop) {
      const merge2 = mergeMap[prop] || mergeDeepProperties
      const configValue = merge2(config1[prop], config2[prop], prop)
      ;(utils$1.isUndefined(configValue) && merge2 !== mergeDirectKeys) ||
        (config[prop] = configValue)
    })
    return config
  }
  var resolveConfig = (config) => {
    const newConfig = mergeConfig$1({}, config)
    let { data, withXSRFToken, xsrfHeaderName, xsrfCookieName, headers, auth } = newConfig
    newConfig.headers = headers = AxiosHeaders$1.from(headers)
    newConfig.url = buildURL(
      buildFullPath(newConfig.baseURL, newConfig.url, newConfig.allowAbsoluteUrls),
      config.params,
      config.paramsSerializer
    )
    if (auth) {
      headers.set(
        'Authorization',
        'Basic ' +
          btoa(
            (auth.username || '') +
              ':' +
              (auth.password ? unescape(encodeURIComponent(auth.password)) : '')
          )
      )
    }
    let contentType
    if (utils$1.isFormData(data)) {
      if (platform.hasStandardBrowserEnv || platform.hasStandardBrowserWebWorkerEnv) {
        headers.setContentType(void 0)
      } else if ((contentType = headers.getContentType()) !== false) {
        const [type, ...tokens] = contentType
          ? contentType
              .split(';')
              .map((token) => token.trim())
              .filter(Boolean)
          : []
        headers.setContentType([type || 'multipart/form-data', ...tokens].join('; '))
      }
    }
    if (platform.hasStandardBrowserEnv) {
      withXSRFToken &&
        utils$1.isFunction(withXSRFToken) &&
        (withXSRFToken = withXSRFToken(newConfig))
      if (withXSRFToken || (withXSRFToken !== false && isURLSameOrigin(newConfig.url))) {
        const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies.read(xsrfCookieName)
        if (xsrfValue) {
          headers.set(xsrfHeaderName, xsrfValue)
        }
      }
    }
    return newConfig
  }
  const isXHRAdapterSupported = typeof XMLHttpRequest !== 'undefined'
  var xhrAdapter =
    isXHRAdapterSupported &&
    function (config) {
      return new Promise(function dispatchXhrRequest(resolve, reject) {
        const _config = resolveConfig(config)
        let requestData = _config.data
        const requestHeaders = AxiosHeaders$1.from(_config.headers).normalize()
        let { responseType, onUploadProgress, onDownloadProgress } = _config
        let onCanceled
        let uploadThrottled, downloadThrottled
        let flushUpload, flushDownload
        function done() {
          flushUpload && flushUpload()
          flushDownload && flushDownload()
          _config.cancelToken && _config.cancelToken.unsubscribe(onCanceled)
          _config.signal && _config.signal.removeEventListener('abort', onCanceled)
        }
        let request = new XMLHttpRequest()
        request.open(_config.method.toUpperCase(), _config.url, true)
        request.timeout = _config.timeout
        function onloadend() {
          if (!request) {
            return
          }
          const responseHeaders = AxiosHeaders$1.from(
            'getAllResponseHeaders' in request && request.getAllResponseHeaders()
          )
          const responseData =
            !responseType || responseType === 'text' || responseType === 'json'
              ? request.responseText
              : request.response
          const response = {
            data: responseData,
            status: request.status,
            statusText: request.statusText,
            headers: responseHeaders,
            config,
            request,
          }
          settle(
            function _resolve(value) {
              resolve(value)
              done()
            },
            function _reject(err) {
              reject(err)
              done()
            },
            response
          )
          request = null
        }
        if ('onloadend' in request) {
          request.onloadend = onloadend
        } else {
          request.onreadystatechange = function handleLoad() {
            if (!request || request.readyState !== 4) {
              return
            }
            if (
              request.status === 0 &&
              !(request.responseURL && request.responseURL.indexOf('file:') === 0)
            ) {
              return
            }
            setTimeout(onloadend)
          }
        }
        request.onabort = function handleAbort() {
          if (!request) {
            return
          }
          reject(new AxiosError$1('Request aborted', AxiosError$1.ECONNABORTED, config, request))
          request = null
        }
        request.onerror = function handleError() {
          reject(new AxiosError$1('Network Error', AxiosError$1.ERR_NETWORK, config, request))
          request = null
        }
        request.ontimeout = function handleTimeout() {
          let timeoutErrorMessage = _config.timeout
            ? 'timeout of ' + _config.timeout + 'ms exceeded'
            : 'timeout exceeded'
          const transitional = _config.transitional || transitionalDefaults
          if (_config.timeoutErrorMessage) {
            timeoutErrorMessage = _config.timeoutErrorMessage
          }
          reject(
            new AxiosError$1(
              timeoutErrorMessage,
              transitional.clarifyTimeoutError ? AxiosError$1.ETIMEDOUT : AxiosError$1.ECONNABORTED,
              config,
              request
            )
          )
          request = null
        }
        requestData === void 0 && requestHeaders.setContentType(null)
        if ('setRequestHeader' in request) {
          utils$1.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
            request.setRequestHeader(key, val)
          })
        }
        if (!utils$1.isUndefined(_config.withCredentials)) {
          request.withCredentials = !!_config.withCredentials
        }
        if (responseType && responseType !== 'json') {
          request.responseType = _config.responseType
        }
        if (onDownloadProgress) {
          ;[downloadThrottled, flushDownload] = progressEventReducer(onDownloadProgress, true)
          request.addEventListener('progress', downloadThrottled)
        }
        if (onUploadProgress && request.upload) {
          ;[uploadThrottled, flushUpload] = progressEventReducer(onUploadProgress)
          request.upload.addEventListener('progress', uploadThrottled)
          request.upload.addEventListener('loadend', flushUpload)
        }
        if (_config.cancelToken || _config.signal) {
          onCanceled = (cancel) => {
            if (!request) {
              return
            }
            reject(!cancel || cancel.type ? new CanceledError$1(null, config, request) : cancel)
            request.abort()
            request = null
          }
          _config.cancelToken && _config.cancelToken.subscribe(onCanceled)
          if (_config.signal) {
            _config.signal.aborted
              ? onCanceled()
              : _config.signal.addEventListener('abort', onCanceled)
          }
        }
        const protocol = parseProtocol(_config.url)
        if (protocol && platform.protocols.indexOf(protocol) === -1) {
          reject(
            new AxiosError$1(
              'Unsupported protocol ' + protocol + ':',
              AxiosError$1.ERR_BAD_REQUEST,
              config
            )
          )
          return
        }
        request.send(requestData || null)
      })
    }
  const composeSignals = (signals, timeout) => {
    const { length } = (signals = signals ? signals.filter(Boolean) : [])
    if (timeout || length) {
      let controller = new AbortController()
      let aborted
      const onabort = function (reason) {
        if (!aborted) {
          aborted = true
          unsubscribe()
          const err = reason instanceof Error ? reason : this.reason
          controller.abort(
            err instanceof AxiosError$1
              ? err
              : new CanceledError$1(err instanceof Error ? err.message : err)
          )
        }
      }
      let timer =
        timeout &&
        setTimeout(() => {
          timer = null
          onabort(new AxiosError$1(`timeout ${timeout} of ms exceeded`, AxiosError$1.ETIMEDOUT))
        }, timeout)
      const unsubscribe = () => {
        if (signals) {
          timer && clearTimeout(timer)
          timer = null
          signals.forEach((signal2) => {
            signal2.unsubscribe
              ? signal2.unsubscribe(onabort)
              : signal2.removeEventListener('abort', onabort)
          })
          signals = null
        }
      }
      signals.forEach((signal2) => signal2.addEventListener('abort', onabort))
      const { signal } = controller
      signal.unsubscribe = () => utils$1.asap(unsubscribe)
      return signal
    }
  }
  const streamChunk = function* (chunk, chunkSize) {
    let len2 = chunk.byteLength
    if (len2 < chunkSize) {
      yield chunk
      return
    }
    let pos = 0
    let end
    while (pos < len2) {
      end = pos + chunkSize
      yield chunk.slice(pos, end)
      pos = end
    }
  }
  const readBytes = async function* (iterable, chunkSize) {
    for await (const chunk of readStream(iterable)) {
      yield* streamChunk(chunk, chunkSize)
    }
  }
  const readStream = async function* (stream) {
    if (stream[Symbol.asyncIterator]) {
      yield* stream
      return
    }
    const reader = stream.getReader()
    try {
      for (;;) {
        const { done, value } = await reader.read()
        if (done) {
          break
        }
        yield value
      }
    } finally {
      await reader.cancel()
    }
  }
  const trackStream = (stream, chunkSize, onProgress, onFinish) => {
    const iterator2 = readBytes(stream, chunkSize)
    let bytes = 0
    let done
    let _onFinish = (e) => {
      if (!done) {
        done = true
        onFinish && onFinish(e)
      }
    }
    return new ReadableStream(
      {
        async pull(controller) {
          try {
            const { done: done2, value } = await iterator2.next()
            if (done2) {
              _onFinish()
              controller.close()
              return
            }
            let len2 = value.byteLength
            if (onProgress) {
              let loadedBytes = (bytes += len2)
              onProgress(loadedBytes)
            }
            controller.enqueue(new Uint8Array(value))
          } catch (err) {
            _onFinish(err)
            throw err
          }
        },
        cancel(reason) {
          _onFinish(reason)
          return iterator2.return()
        },
      },
      {
        highWaterMark: 2,
      }
    )
  }
  const isFetchSupported =
    typeof fetch === 'function' && typeof Request === 'function' && typeof Response === 'function'
  const isReadableStreamSupported = isFetchSupported && typeof ReadableStream === 'function'
  const encodeText =
    isFetchSupported &&
    (typeof TextEncoder === 'function'
      ? /* @__PURE__ */ (
          (encoder) => (str) =>
            encoder.encode(str)
        )(new TextEncoder())
      : async (str) => new Uint8Array(await new Response(str).arrayBuffer()))
  const test = (fn, ...args) => {
    try {
      return !!fn(...args)
    } catch (e) {
      return false
    }
  }
  const supportsRequestStream =
    isReadableStreamSupported &&
    test(() => {
      let duplexAccessed = false
      const hasContentType = new Request(platform.origin, {
        body: new ReadableStream(),
        method: 'POST',
        get duplex() {
          duplexAccessed = true
          return 'half'
        },
      }).headers.has('Content-Type')
      return duplexAccessed && !hasContentType
    })
  const DEFAULT_CHUNK_SIZE = 64 * 1024
  const supportsResponseStream =
    isReadableStreamSupported && test(() => utils$1.isReadableStream(new Response('').body))
  const resolvers = {
    stream: supportsResponseStream && ((res) => res.body),
  }
  isFetchSupported &&
    ((res) => {
      ;['text', 'arrayBuffer', 'blob', 'formData', 'stream'].forEach((type) => {
        !resolvers[type] &&
          (resolvers[type] = utils$1.isFunction(res[type])
            ? (res2) => res2[type]()
            : (_, config) => {
                throw new AxiosError$1(
                  `Response type '${type}' is not supported`,
                  AxiosError$1.ERR_NOT_SUPPORT,
                  config
                )
              })
      })
    })(new Response())
  const getBodyLength = async (body) => {
    if (body == null) {
      return 0
    }
    if (utils$1.isBlob(body)) {
      return body.size
    }
    if (utils$1.isSpecCompliantForm(body)) {
      const _request = new Request(platform.origin, {
        method: 'POST',
        body,
      })
      return (await _request.arrayBuffer()).byteLength
    }
    if (utils$1.isArrayBufferView(body) || utils$1.isArrayBuffer(body)) {
      return body.byteLength
    }
    if (utils$1.isURLSearchParams(body)) {
      body = body + ''
    }
    if (utils$1.isString(body)) {
      return (await encodeText(body)).byteLength
    }
  }
  const resolveBodyLength = async (headers, body) => {
    const length = utils$1.toFiniteNumber(headers.getContentLength())
    return length == null ? getBodyLength(body) : length
  }
  var fetchAdapter =
    isFetchSupported &&
    (async (config) => {
      let {
        url,
        method,
        data,
        signal,
        cancelToken,
        timeout,
        onDownloadProgress,
        onUploadProgress,
        responseType,
        headers,
        withCredentials = 'same-origin',
        fetchOptions,
      } = resolveConfig(config)
      responseType = responseType ? (responseType + '').toLowerCase() : 'text'
      let composedSignal = composeSignals(
        [signal, cancelToken && cancelToken.toAbortSignal()],
        timeout
      )
      let request
      const unsubscribe =
        composedSignal &&
        composedSignal.unsubscribe &&
        (() => {
          composedSignal.unsubscribe()
        })
      let requestContentLength
      try {
        if (
          onUploadProgress &&
          supportsRequestStream &&
          method !== 'get' &&
          method !== 'head' &&
          (requestContentLength = await resolveBodyLength(headers, data)) !== 0
        ) {
          let _request = new Request(url, {
            method: 'POST',
            body: data,
            duplex: 'half',
          })
          let contentTypeHeader
          if (
            utils$1.isFormData(data) &&
            (contentTypeHeader = _request.headers.get('content-type'))
          ) {
            headers.setContentType(contentTypeHeader)
          }
          if (_request.body) {
            const [onProgress, flush] = progressEventDecorator(
              requestContentLength,
              progressEventReducer(asyncDecorator(onUploadProgress))
            )
            data = trackStream(_request.body, DEFAULT_CHUNK_SIZE, onProgress, flush)
          }
        }
        if (!utils$1.isString(withCredentials)) {
          withCredentials = withCredentials ? 'include' : 'omit'
        }
        const isCredentialsSupported = 'credentials' in Request.prototype
        request = new Request(url, {
          ...fetchOptions,
          signal: composedSignal,
          method: method.toUpperCase(),
          headers: headers.normalize().toJSON(),
          body: data,
          duplex: 'half',
          credentials: isCredentialsSupported ? withCredentials : void 0,
        })
        let response = await fetch(request, fetchOptions)
        const isStreamResponse =
          supportsResponseStream && (responseType === 'stream' || responseType === 'response')
        if (supportsResponseStream && (onDownloadProgress || (isStreamResponse && unsubscribe))) {
          const options = {}
          ;['status', 'statusText', 'headers'].forEach((prop) => {
            options[prop] = response[prop]
          })
          const responseContentLength = utils$1.toFiniteNumber(
            response.headers.get('content-length')
          )
          const [onProgress, flush] =
            (onDownloadProgress &&
              progressEventDecorator(
                responseContentLength,
                progressEventReducer(asyncDecorator(onDownloadProgress), true)
              )) ||
            []
          response = new Response(
            trackStream(response.body, DEFAULT_CHUNK_SIZE, onProgress, () => {
              flush && flush()
              unsubscribe && unsubscribe()
            }),
            options
          )
        }
        responseType = responseType || 'text'
        let responseData = await resolvers[utils$1.findKey(resolvers, responseType) || 'text'](
          response,
          config
        )
        !isStreamResponse && unsubscribe && unsubscribe()
        return await new Promise((resolve, reject) => {
          settle(resolve, reject, {
            data: responseData,
            headers: AxiosHeaders$1.from(response.headers),
            status: response.status,
            statusText: response.statusText,
            config,
            request,
          })
        })
      } catch (err) {
        unsubscribe && unsubscribe()
        if (err && err.name === 'TypeError' && /Load failed|fetch/i.test(err.message)) {
          throw Object.assign(
            new AxiosError$1('Network Error', AxiosError$1.ERR_NETWORK, config, request),
            {
              cause: err.cause || err,
            }
          )
        }
        throw AxiosError$1.from(err, err && err.code, config, request)
      }
    })
  const knownAdapters = {
    http: httpAdapter,
    xhr: xhrAdapter,
    fetch: fetchAdapter,
  }
  utils$1.forEach(knownAdapters, (fn, value) => {
    if (fn) {
      try {
        Object.defineProperty(fn, 'name', { value })
      } catch (e) {}
      Object.defineProperty(fn, 'adapterName', { value })
    }
  })
  const renderReason = (reason) => `- ${reason}`
  const isResolvedHandle = (adapter) =>
    utils$1.isFunction(adapter) || adapter === null || adapter === false
  var adapters = {
    getAdapter: (adapters2) => {
      adapters2 = utils$1.isArray(adapters2) ? adapters2 : [adapters2]
      const { length } = adapters2
      let nameOrAdapter
      let adapter
      const rejectedReasons = {}
      for (let i2 = 0; i2 < length; i2++) {
        nameOrAdapter = adapters2[i2]
        let id
        adapter = nameOrAdapter
        if (!isResolvedHandle(nameOrAdapter)) {
          adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()]
          if (adapter === void 0) {
            throw new AxiosError$1(`Unknown adapter '${id}'`)
          }
        }
        if (adapter) {
          break
        }
        rejectedReasons[id || '#' + i2] = adapter
      }
      if (!adapter) {
        const reasons = Object.entries(rejectedReasons).map(
          ([id, state]) =>
            `adapter ${id} ` +
            (state === false
              ? 'is not supported by the environment'
              : 'is not available in the build')
        )
        let s = length
          ? reasons.length > 1
            ? 'since :\n' + reasons.map(renderReason).join('\n')
            : ' ' + renderReason(reasons[0])
          : 'as no adapter specified'
        throw new AxiosError$1(
          `There is no suitable adapter to dispatch the request ` + s,
          'ERR_NOT_SUPPORT'
        )
      }
      return adapter
    },
    adapters: knownAdapters,
  }
  function throwIfCancellationRequested(config) {
    if (config.cancelToken) {
      config.cancelToken.throwIfRequested()
    }
    if (config.signal && config.signal.aborted) {
      throw new CanceledError$1(null, config)
    }
  }
  function dispatchRequest(config) {
    throwIfCancellationRequested(config)
    config.headers = AxiosHeaders$1.from(config.headers)
    config.data = transformData.call(config, config.transformRequest)
    if (['post', 'put', 'patch'].indexOf(config.method) !== -1) {
      config.headers.setContentType('application/x-www-form-urlencoded', false)
    }
    const adapter = adapters.getAdapter(config.adapter || defaults.adapter)
    return adapter(config).then(
      function onAdapterResolution(response) {
        throwIfCancellationRequested(config)
        response.data = transformData.call(config, config.transformResponse, response)
        response.headers = AxiosHeaders$1.from(response.headers)
        return response
      },
      function onAdapterRejection(reason) {
        if (!isCancel$1(reason)) {
          throwIfCancellationRequested(config)
          if (reason && reason.response) {
            reason.response.data = transformData.call(
              config,
              config.transformResponse,
              reason.response
            )
            reason.response.headers = AxiosHeaders$1.from(reason.response.headers)
          }
        }
        return Promise.reject(reason)
      }
    )
  }
  const VERSION$1 = '1.11.0'
  const validators$1 = {}
  ;['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((type, i2) => {
    validators$1[type] = function validator2(thing) {
      return typeof thing === type || 'a' + (i2 < 1 ? 'n ' : ' ') + type
    }
  })
  const deprecatedWarnings = {}
  validators$1.transitional = function transitional(validator2, version, message) {
    function formatMessage(opt, desc) {
      return (
        '[Axios v' +
        VERSION$1 +
        "] Transitional option '" +
        opt +
        "'" +
        desc +
        (message ? '. ' + message : '')
      )
    }
    return (value, opt, opts) => {
      if (validator2 === false) {
        throw new AxiosError$1(
          formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')),
          AxiosError$1.ERR_DEPRECATED
        )
      }
      if (version && !deprecatedWarnings[opt]) {
        deprecatedWarnings[opt] = true
        console.warn(
          formatMessage(
            opt,
            ' has been deprecated since v' + version + ' and will be removed in the near future'
          )
        )
      }
      return validator2 ? validator2(value, opt, opts) : true
    }
  }
  validators$1.spelling = function spelling(correctSpelling) {
    return (value, opt) => {
      console.warn(`${opt} is likely a misspelling of ${correctSpelling}`)
      return true
    }
  }
  function assertOptions(options, schema, allowUnknown) {
    if (typeof options !== 'object') {
      throw new AxiosError$1('options must be an object', AxiosError$1.ERR_BAD_OPTION_VALUE)
    }
    const keys = Object.keys(options)
    let i2 = keys.length
    while (i2-- > 0) {
      const opt = keys[i2]
      const validator2 = schema[opt]
      if (validator2) {
        const value = options[opt]
        const result = value === void 0 || validator2(value, opt, options)
        if (result !== true) {
          throw new AxiosError$1(
            'option ' + opt + ' must be ' + result,
            AxiosError$1.ERR_BAD_OPTION_VALUE
          )
        }
        continue
      }
      if (allowUnknown !== true) {
        throw new AxiosError$1('Unknown option ' + opt, AxiosError$1.ERR_BAD_OPTION)
      }
    }
  }
  var validator = {
    assertOptions,
    validators: validators$1,
  }
  const validators = validator.validators
  let Axios$1 = class Axios {
    constructor(instanceConfig) {
      this.defaults = instanceConfig || {}
      this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager(),
      }
    }
    /**
     * Dispatch a request
     *
     * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
     * @param {?Object} config
     *
     * @returns {Promise} The Promise to be fulfilled
     */
    async request(configOrUrl, config) {
      try {
        return await this._request(configOrUrl, config)
      } catch (err) {
        if (err instanceof Error) {
          let dummy = {}
          Error.captureStackTrace ? Error.captureStackTrace(dummy) : (dummy = new Error())
          const stack = dummy.stack ? dummy.stack.replace(/^.+\n/, '') : ''
          try {
            if (!err.stack) {
              err.stack = stack
            } else if (stack && !String(err.stack).endsWith(stack.replace(/^.+\n.+\n/, ''))) {
              err.stack += '\n' + stack
            }
          } catch (e) {}
        }
        throw err
      }
    }
    _request(configOrUrl, config) {
      if (typeof configOrUrl === 'string') {
        config = config || {}
        config.url = configOrUrl
      } else {
        config = configOrUrl || {}
      }
      config = mergeConfig$1(this.defaults, config)
      const { transitional, paramsSerializer, headers } = config
      if (transitional !== void 0) {
        validator.assertOptions(
          transitional,
          {
            silentJSONParsing: validators.transitional(validators.boolean),
            forcedJSONParsing: validators.transitional(validators.boolean),
            clarifyTimeoutError: validators.transitional(validators.boolean),
          },
          false
        )
      }
      if (paramsSerializer != null) {
        if (utils$1.isFunction(paramsSerializer)) {
          config.paramsSerializer = {
            serialize: paramsSerializer,
          }
        } else {
          validator.assertOptions(
            paramsSerializer,
            {
              encode: validators.function,
              serialize: validators.function,
            },
            true
          )
        }
      }
      if (config.allowAbsoluteUrls !== void 0);
      else if (this.defaults.allowAbsoluteUrls !== void 0) {
        config.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls
      } else {
        config.allowAbsoluteUrls = true
      }
      validator.assertOptions(
        config,
        {
          baseUrl: validators.spelling('baseURL'),
          withXsrfToken: validators.spelling('withXSRFToken'),
        },
        true
      )
      config.method = (config.method || this.defaults.method || 'get').toLowerCase()
      let contextHeaders = headers && utils$1.merge(headers.common, headers[config.method])
      headers &&
        utils$1.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], (method) => {
          delete headers[method]
        })
      config.headers = AxiosHeaders$1.concat(contextHeaders, headers)
      const requestInterceptorChain = []
      let synchronousRequestInterceptors = true
      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
          return
        }
        synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous
        requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected)
      })
      const responseInterceptorChain = []
      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected)
      })
      let promise
      let i2 = 0
      let len2
      if (!synchronousRequestInterceptors) {
        const chain = [dispatchRequest.bind(this), void 0]
        chain.unshift(...requestInterceptorChain)
        chain.push(...responseInterceptorChain)
        len2 = chain.length
        promise = Promise.resolve(config)
        while (i2 < len2) {
          promise = promise.then(chain[i2++], chain[i2++])
        }
        return promise
      }
      len2 = requestInterceptorChain.length
      let newConfig = config
      i2 = 0
      while (i2 < len2) {
        const onFulfilled = requestInterceptorChain[i2++]
        const onRejected = requestInterceptorChain[i2++]
        try {
          newConfig = onFulfilled(newConfig)
        } catch (error) {
          onRejected.call(this, error)
          break
        }
      }
      try {
        promise = dispatchRequest.call(this, newConfig)
      } catch (error) {
        return Promise.reject(error)
      }
      i2 = 0
      len2 = responseInterceptorChain.length
      while (i2 < len2) {
        promise = promise.then(responseInterceptorChain[i2++], responseInterceptorChain[i2++])
      }
      return promise
    }
    getUri(config) {
      config = mergeConfig$1(this.defaults, config)
      const fullPath = buildFullPath(config.baseURL, config.url, config.allowAbsoluteUrls)
      return buildURL(fullPath, config.params, config.paramsSerializer)
    }
  }
  utils$1.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
    Axios$1.prototype[method] = function (url, config) {
      return this.request(
        mergeConfig$1(config || {}, {
          method,
          url,
          data: (config || {}).data,
        })
      )
    }
  })
  utils$1.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
    function generateHTTPMethod(isForm) {
      return function httpMethod(url, data, config) {
        return this.request(
          mergeConfig$1(config || {}, {
            method,
            headers: isForm
              ? {
                  'Content-Type': 'multipart/form-data',
                }
              : {},
            url,
            data,
          })
        )
      }
    }
    Axios$1.prototype[method] = generateHTTPMethod()
    Axios$1.prototype[method + 'Form'] = generateHTTPMethod(true)
  })
  let CancelToken$1 = class CancelToken2 {
    constructor(executor) {
      if (typeof executor !== 'function') {
        throw new TypeError('executor must be a function.')
      }
      let resolvePromise
      this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve
      })
      const token = this
      this.promise.then((cancel) => {
        if (!token._listeners) return
        let i2 = token._listeners.length
        while (i2-- > 0) {
          token._listeners[i2](cancel)
        }
        token._listeners = null
      })
      this.promise.then = (onfulfilled) => {
        let _resolve
        const promise = new Promise((resolve) => {
          token.subscribe(resolve)
          _resolve = resolve
        }).then(onfulfilled)
        promise.cancel = function reject() {
          token.unsubscribe(_resolve)
        }
        return promise
      }
      executor(function cancel(message, config, request) {
        if (token.reason) {
          return
        }
        token.reason = new CanceledError$1(message, config, request)
        resolvePromise(token.reason)
      })
    }
    /**
     * Throws a `CanceledError` if cancellation has been requested.
     */
    throwIfRequested() {
      if (this.reason) {
        throw this.reason
      }
    }
    /**
     * Subscribe to the cancel signal
     */
    subscribe(listener) {
      if (this.reason) {
        listener(this.reason)
        return
      }
      if (this._listeners) {
        this._listeners.push(listener)
      } else {
        this._listeners = [listener]
      }
    }
    /**
     * Unsubscribe from the cancel signal
     */
    unsubscribe(listener) {
      if (!this._listeners) {
        return
      }
      const index = this._listeners.indexOf(listener)
      if (index !== -1) {
        this._listeners.splice(index, 1)
      }
    }
    toAbortSignal() {
      const controller = new AbortController()
      const abort = (err) => {
        controller.abort(err)
      }
      this.subscribe(abort)
      controller.signal.unsubscribe = () => this.unsubscribe(abort)
      return controller.signal
    }
    /**
     * Returns an object that contains a new `CancelToken` and a function that, when called,
     * cancels the `CancelToken`.
     */
    static source() {
      let cancel
      const token = new CancelToken2(function executor(c) {
        cancel = c
      })
      return {
        token,
        cancel,
      }
    }
  }
  function spread$1(callback) {
    return function wrap(arr) {
      return callback.apply(null, arr)
    }
  }
  function isAxiosError$1(payload) {
    return utils$1.isObject(payload) && payload.isAxiosError === true
  }
  const HttpStatusCode$1 = {
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
  Object.entries(HttpStatusCode$1).forEach(([key, value]) => {
    HttpStatusCode$1[value] = key
  })
  function createInstance(defaultConfig) {
    const context = new Axios$1(defaultConfig)
    const instance = bind(Axios$1.prototype.request, context)
    utils$1.extend(instance, Axios$1.prototype, context, { allOwnKeys: true })
    utils$1.extend(instance, context, null, { allOwnKeys: true })
    instance.create = function create(instanceConfig) {
      return createInstance(mergeConfig$1(defaultConfig, instanceConfig))
    }
    return instance
  }
  const axios = createInstance(defaults)
  axios.Axios = Axios$1
  axios.CanceledError = CanceledError$1
  axios.CancelToken = CancelToken$1
  axios.isCancel = isCancel$1
  axios.VERSION = VERSION$1
  axios.toFormData = toFormData$1
  axios.AxiosError = AxiosError$1
  axios.Cancel = axios.CanceledError
  axios.all = function all2(promises) {
    return Promise.all(promises)
  }
  axios.spread = spread$1
  axios.isAxiosError = isAxiosError$1
  axios.mergeConfig = mergeConfig$1
  axios.AxiosHeaders = AxiosHeaders$1
  axios.formToJSON = (thing) =>
    formDataToJSON(utils$1.isHTMLForm(thing) ? new FormData(thing) : thing)
  axios.getAdapter = adapters.getAdapter
  axios.HttpStatusCode = HttpStatusCode$1
  axios.default = axios
  const {
    Axios,
    AxiosError,
    CanceledError,
    isCancel,
    CancelToken,
    VERSION,
    all,
    Cancel,
    isAxiosError,
    spread,
    toFormData,
    AxiosHeaders,
    HttpStatusCode,
    formToJSON,
    getAdapter,
    mergeConfig,
  } = axios
  const MAX_ERRORS = 5
  const SLEEP_TIMEOUT_DEFAULT = 3e4
  let lastUpdated = 0
  let http
  let consecutiveErrors = 0
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
  self.onmessage = async (props) => {
    const {
      updateType,
      inquiryId,
      interval = SLEEP_TIMEOUT_DEFAULT,
      baseUrl,
      token,
      watcherId,
      lastUpdate = lastUpdated,
    } = props.data
    lastUpdated = lastUpdate
    self.postMessage({
      type: 'status',
      status: 'starting',
      mode: updateType,
      interval,
      message: '[Worker] Recieved new parameters.',
    })
    if (!http) {
      http = axios.create({
        baseURL: baseUrl,
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'Nc-Agora-Client-Id': watcherId,
        },
        validateStatus: (status) => [200, 304].includes(status),
      })
    }
    if (updateType === 'noInquirying') {
      self.postMessage({
        type: 'info',
        status: 'stopped',
        mode: updateType,
        interval,
        message: '[Worker] noInquirying: exiting.',
      })
      self.close()
      return
    }
    const run = async () => {
      try {
        let endPoint = `inquiry/${inquiryId}/watch`
        if (token) {
          endPoint = `s/${token}/watch`
        }
        const response = await http.get(endPoint, {
          params: { offset: lastUpdated },
        })
        consecutiveErrors = 0
        if (response.status === 200 && response.data.updates?.length > 0) {
          lastUpdated = response.data.updates[response.data.updates.length - 1].updated
          self.postMessage({
            type: 'update',
            status: 'running',
            mode: updateType,
            interval,
            message: '[Worker] 200 got updates',
            updates: response.data.updates,
            lastUpdate: lastUpdated,
          })
        } else if (response.status === 304) {
          self.postMessage({
            type: 'info',
            status: 'running',
            mode: updateType,
            interval,
            message: '[Worker] 304 – no changes',
            lastUpdate: lastUpdated,
          })
        } else {
          self.postMessage({
            type: 'info',
            status: 'running',
            mode: updateType,
            interval,
            message: '[Worker] 200 but no updates',
            lastUpdate: lastUpdated,
          })
        }
      } catch (error) {
        const err = error
        if (err.code === 'ECONNABORTED' || err.code === 'ERR_CANCELED') {
          self.postMessage({
            type: 'status',
            status: 'stopping',
            mode: updateType,
            interval,
            message: '[Worker] Request aborted by intention',
            lastUpdate: lastUpdated,
          })
          return
        }
        consecutiveErrors = consecutiveErrors + 1
        self.postMessage({
          type: 'error',
          status: 'error',
          mode: updateType,
          interval,
          message: `[Worker] Request failed (${consecutiveErrors}/${MAX_ERRORS})`,
        })
        if (consecutiveErrors >= MAX_ERRORS) {
          self.postMessage({
            type: 'fatal',
            status: 'error',
            mode: updateType,
            interval,
            message: `[Worker] Stopping after ${MAX_ERRORS} consecutive errors`,
          })
          self.close()
          return
        }
        await sleep(interval)
      }
    }
    if (updateType === 'periodicInquirying') {
      self.postMessage({
        type: 'info',
        status: 'starting',
        mode: updateType,
        interval,
        message: '[Worker] Started periodic inquirying.',
      })
      while (true) {
        await run()
        self.postMessage({
          type: 'status',
          status: 'idle',
          mode: updateType,
          interval,
        })
        await sleep(interval)
      }
    }
    if (updateType === 'longInquirying') {
      self.postMessage({
        type: 'info',
        status: 'starting',
        mode: updateType,
        interval,
        message: '[Worker] Started long inquirying.',
      })
      while (true) {
        await run()
      }
    }
  }
})()
//# sourceMappingURL=inquiryWatcher.worker-BLsJ3pfJ.js.map
