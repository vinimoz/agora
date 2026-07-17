(function() {
  "use strict";
  function bind(fn, thisArg) {
    return function wrap() {
      return fn.apply(thisArg, arguments);
    };
  }
  const { toString } = Object.prototype;
  const { getPrototypeOf } = Object;
  const { iterator, toStringTag } = Symbol;
  const hasOwnProperty = (({ hasOwnProperty: hasOwnProperty2 }) => (obj, prop) => hasOwnProperty2.call(obj, prop))(Object.prototype);
  const hasOwnInPrototypeChain = (thing, prop) => {
    let obj = thing;
    const seen = [];
    while (obj != null && obj !== Object.prototype) {
      if (seen.indexOf(obj) !== -1) {
        return false;
      }
      seen.push(obj);
      if (hasOwnProperty(obj, prop)) {
        return true;
      }
      obj = getPrototypeOf(obj);
    }
    return false;
  };
  const getSafeProp = (obj, prop) => obj != null && hasOwnInPrototypeChain(obj, prop) ? obj[prop] : void 0;
  const kindOf = /* @__PURE__ */ ((cache) => (thing) => {
    const str = toString.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
  })(/* @__PURE__ */ Object.create(null));
  const kindOfTest = (type) => {
    type = type.toLowerCase();
    return (thing) => kindOf(thing) === type;
  };
  const typeOfTest = (type) => (thing) => typeof thing === type;
  const { isArray } = Array;
  const isUndefined = typeOfTest("undefined");
  function isBuffer(val) {
    return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction$1(val.constructor.isBuffer) && val.constructor.isBuffer(val);
  }
  const isArrayBuffer = kindOfTest("ArrayBuffer");
  function isArrayBufferView(val) {
    let result;
    if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
      result = ArrayBuffer.isView(val);
    } else {
      result = val && val.buffer && isArrayBuffer(val.buffer);
    }
    return result;
  }
  const isString = typeOfTest("string");
  const isFunction$1 = typeOfTest("function");
  const isNumber = typeOfTest("number");
  const isObject = (thing) => thing !== null && typeof thing === "object";
  const isBoolean = (thing) => thing === true || thing === false;
  const isPlainObject = (val) => {
    if (!isObject(val)) {
      return false;
    }
    const prototype2 = getPrototypeOf(val);
    return (prototype2 === null || prototype2 === Object.prototype || getPrototypeOf(prototype2) === null) && // Treat any genuine (non-Object.prototype-polluted) Symbol.toStringTag or
    // Symbol.iterator as evidence the value is a tagged/iterable type rather
    // than a plain object, while ignoring keys injected onto Object.prototype.
    !hasOwnInPrototypeChain(val, toStringTag) && !hasOwnInPrototypeChain(val, iterator);
  };
  const isEmptyObject = (val) => {
    if (!isObject(val) || isBuffer(val)) {
      return false;
    }
    try {
      return Object.keys(val).length === 0 && Object.getPrototypeOf(val) === Object.prototype;
    } catch (e) {
      return false;
    }
  };
  const isDate = kindOfTest("Date");
  const isFile = kindOfTest("File");
  const isReactNativeBlob = (value) => {
    return !!(value && typeof value.uri !== "undefined");
  };
  const isReactNative = (formData) => formData && typeof formData.getParts !== "undefined";
  const isBlob = kindOfTest("Blob");
  const isFileList = kindOfTest("FileList");
  const isStream = (val) => isObject(val) && isFunction$1(val.pipe);
  function getGlobal() {
    if (typeof globalThis !== "undefined") return globalThis;
    if (typeof self !== "undefined") return self;
    if (typeof window !== "undefined") return window;
    if (typeof global !== "undefined") return global;
    return {};
  }
  const G = getGlobal();
  const FormDataCtor = typeof G.FormData !== "undefined" ? G.FormData : void 0;
  const isFormData = (thing) => {
    if (!thing) return false;
    if (FormDataCtor && thing instanceof FormDataCtor) return true;
    const proto = getPrototypeOf(thing);
    if (!proto || proto === Object.prototype) return false;
    if (!isFunction$1(thing.append)) return false;
    const kind = kindOf(thing);
    return kind === "formdata" || // detect form-data instance
    kind === "object" && isFunction$1(thing.toString) && thing.toString() === "[object FormData]";
  };
  const isURLSearchParams = kindOfTest("URLSearchParams");
  const [isReadableStream, isRequest, isResponse, isHeaders] = [
    "ReadableStream",
    "Request",
    "Response",
    "Headers"
  ].map(kindOfTest);
  const trim = (str) => {
    return str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
  };
  function forEach(obj, fn, { allOwnKeys = false } = {}) {
    if (obj === null || typeof obj === "undefined") {
      return;
    }
    let i;
    let l;
    if (typeof obj !== "object") {
      obj = [obj];
    }
    if (isArray(obj)) {
      for (i = 0, l = obj.length; i < l; i++) {
        fn.call(null, obj[i], i, obj);
      }
    } else {
      if (isBuffer(obj)) {
        return;
      }
      const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
      const len = keys.length;
      let key;
      for (i = 0; i < len; i++) {
        key = keys[i];
        fn.call(null, obj[key], key, obj);
      }
    }
  }
  function findKey(obj, key) {
    if (isBuffer(obj)) {
      return null;
    }
    key = key.toLowerCase();
    const keys = Object.keys(obj);
    let i = keys.length;
    let _key;
    while (i-- > 0) {
      _key = keys[i];
      if (key === _key.toLowerCase()) {
        return _key;
      }
    }
    return null;
  }
  const _global = (() => {
    if (typeof globalThis !== "undefined") return globalThis;
    return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
  })();
  const isContextDefined = (context) => !isUndefined(context) && context !== _global;
  function merge(...objs) {
    const { caseless, skipUndefined } = isContextDefined(this) && this || {};
    const result = {};
    const assignValue = (val, key) => {
      if (key === "__proto__" || key === "constructor" || key === "prototype") {
        return;
      }
      const targetKey = caseless && typeof key === "string" && findKey(result, key) || key;
      const existing = hasOwnProperty(result, targetKey) ? result[targetKey] : void 0;
      if (isPlainObject(existing) && isPlainObject(val)) {
        result[targetKey] = merge(existing, val);
      } else if (isPlainObject(val)) {
        result[targetKey] = merge({}, val);
      } else if (isArray(val)) {
        result[targetKey] = val.slice();
      } else if (!skipUndefined || !isUndefined(val)) {
        result[targetKey] = val;
      }
    };
    for (let i = 0, l = objs.length; i < l; i++) {
      const source = objs[i];
      if (!source || isBuffer(source)) {
        continue;
      }
      forEach(source, assignValue);
      if (typeof source !== "object" || isArray(source)) {
        continue;
      }
      const symbols = Object.getOwnPropertySymbols(source);
      for (let j = 0; j < symbols.length; j++) {
        const symbol = symbols[j];
        if (propertyIsEnumerable.call(source, symbol)) {
          assignValue(source[symbol], symbol);
        }
      }
    }
    return result;
  }
  const extend = (a, b, thisArg, { allOwnKeys } = {}) => {
    forEach(
      b,
      (val, key) => {
        if (thisArg && isFunction$1(val)) {
          Object.defineProperty(a, key, {
            // Null-proto descriptor so a polluted Object.prototype.get cannot
            // hijack defineProperty's accessor-vs-data resolution.
            __proto__: null,
            value: bind(val, thisArg),
            writable: true,
            enumerable: true,
            configurable: true
          });
        } else {
          Object.defineProperty(a, key, {
            __proto__: null,
            value: val,
            writable: true,
            enumerable: true,
            configurable: true
          });
        }
      },
      { allOwnKeys }
    );
    return a;
  };
  const stripBOM = (content) => {
    if (content.charCodeAt(0) === 65279) {
      content = content.slice(1);
    }
    return content;
  };
  const inherits = (constructor, superConstructor, props, descriptors) => {
    constructor.prototype = Object.create(superConstructor.prototype, descriptors);
    Object.defineProperty(constructor.prototype, "constructor", {
      __proto__: null,
      value: constructor,
      writable: true,
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(constructor, "super", {
      __proto__: null,
      value: superConstructor.prototype
    });
    props && Object.assign(constructor.prototype, props);
  };
  const toFlatObject = (sourceObj, destObj, filter, propFilter) => {
    let props;
    let i;
    let prop;
    const merged = {};
    destObj = destObj || {};
    if (sourceObj == null) return destObj;
    do {
      props = Object.getOwnPropertyNames(sourceObj);
      i = props.length;
      while (i-- > 0) {
        prop = props[i];
        if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
          destObj[prop] = sourceObj[prop];
          merged[prop] = true;
        }
      }
      sourceObj = filter !== false && getPrototypeOf(sourceObj);
    } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);
    return destObj;
  };
  const endsWith = (str, searchString, position) => {
    str = String(str);
    if (position === void 0 || position > str.length) {
      position = str.length;
    }
    position -= searchString.length;
    const lastIndex = str.indexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
  };
  const toArray = (thing) => {
    if (!thing) return null;
    if (isArray(thing)) return thing;
    let i = thing.length;
    if (!isNumber(i)) return null;
    const arr = new Array(i);
    while (i-- > 0) {
      arr[i] = thing[i];
    }
    return arr;
  };
  const isTypedArray = /* @__PURE__ */ ((TypedArray) => {
    return (thing) => {
      return TypedArray && thing instanceof TypedArray;
    };
  })(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
  const forEachEntry = (obj, fn) => {
    const generator = obj && obj[iterator];
    const _iterator = generator.call(obj);
    let result;
    while ((result = _iterator.next()) && !result.done) {
      const pair = result.value;
      fn.call(obj, pair[0], pair[1]);
    }
  };
  const matchAll = (regExp, str) => {
    let matches;
    const arr = [];
    while ((matches = regExp.exec(str)) !== null) {
      arr.push(matches);
    }
    return arr;
  };
  const isHTMLForm = kindOfTest("HTMLFormElement");
  const toCamelCase = (str) => {
    return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function replacer(m, p1, p2) {
      return p1.toUpperCase() + p2;
    });
  };
  const { propertyIsEnumerable } = Object.prototype;
  const isRegExp = kindOfTest("RegExp");
  const reduceDescriptors = (obj, reducer) => {
    const descriptors = Object.getOwnPropertyDescriptors(obj);
    const reducedDescriptors = {};
    forEach(descriptors, (descriptor, name) => {
      let ret;
      if ((ret = reducer(descriptor, name, obj)) !== false) {
        reducedDescriptors[name] = ret || descriptor;
      }
    });
    Object.defineProperties(obj, reducedDescriptors);
  };
  const freezeMethods = (obj) => {
    reduceDescriptors(obj, (descriptor, name) => {
      if (isFunction$1(obj) && ["arguments", "caller", "callee"].includes(name)) {
        return false;
      }
      const value = obj[name];
      if (!isFunction$1(value)) return;
      descriptor.enumerable = false;
      if ("writable" in descriptor) {
        descriptor.writable = false;
        return;
      }
      if (!descriptor.set) {
        descriptor.set = () => {
          throw Error("Can not rewrite read-only method '" + name + "'");
        };
      }
    });
  };
  const toObjectSet = (arrayOrString, delimiter) => {
    const obj = {};
    const define = (arr) => {
      arr.forEach((value) => {
        obj[value] = true;
      });
    };
    isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
    return obj;
  };
  const noop = () => {
  };
  const toFiniteNumber = (value, defaultValue) => {
    return value != null && Number.isFinite(value = +value) ? value : defaultValue;
  };
  function isSpecCompliantForm(thing) {
    return !!(thing && isFunction$1(thing.append) && thing[toStringTag] === "FormData" && thing[iterator]);
  }
  const toJSONObject = (obj) => {
    const visited = /* @__PURE__ */ new WeakSet();
    const visit = (source) => {
      if (isObject(source)) {
        if (visited.has(source)) {
          return;
        }
        if (isBuffer(source)) {
          return source;
        }
        if (!("toJSON" in source)) {
          visited.add(source);
          const target = isArray(source) ? [] : {};
          forEach(source, (value, key) => {
            const reducedValue = visit(value);
            !isUndefined(reducedValue) && (target[key] = reducedValue);
          });
          visited.delete(source);
          return target;
        }
      }
      return source;
    };
    return visit(obj);
  };
  const isAsyncFn = kindOfTest("AsyncFunction");
  const isThenable = (thing) => thing && (isObject(thing) || isFunction$1(thing)) && isFunction$1(thing.then) && isFunction$1(thing.catch);
  const _setImmediate = ((setImmediateSupported, postMessageSupported) => {
    if (setImmediateSupported) {
      return setImmediate;
    }
    return postMessageSupported ? ((token, callbacks) => {
      _global.addEventListener(
        "message",
        ({ source, data }) => {
          if (source === _global && data === token) {
            callbacks.length && callbacks.shift()();
          }
        },
        false
      );
      return (cb) => {
        callbacks.push(cb);
        _global.postMessage(token, "*");
      };
    })(`axios@${Math.random()}`, []) : (cb) => setTimeout(cb);
  })(typeof setImmediate === "function", isFunction$1(_global.postMessage));
  const asap = typeof queueMicrotask !== "undefined" ? queueMicrotask.bind(_global) : typeof process !== "undefined" && process.nextTick || _setImmediate;
  const isIterable = (thing) => thing != null && isFunction$1(thing[iterator]);
  const isSafeIterable = (thing) => thing != null && hasOwnInPrototypeChain(thing, iterator) && isIterable(thing);
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
    isReactNativeBlob,
    isReactNative,
    isBlob,
    isRegExp,
    isFunction: isFunction$1,
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
    hasOwnInPrototypeChain,
    getSafeProp,
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
    isSafeIterable
  };
  const ignoreDuplicateOf = utils$1.toObjectSet([
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent"
  ]);
  var parseHeaders = (rawHeaders) => {
    const parsed = {};
    let key;
    let val;
    let i;
    rawHeaders && rawHeaders.split("\n").forEach(function parser(line) {
      i = line.indexOf(":");
      key = line.substring(0, i).trim().toLowerCase();
      val = line.substring(i + 1).trim();
      if (!key || parsed[key] && ignoreDuplicateOf[key]) {
        return;
      }
      if (key === "set-cookie") {
        if (parsed[key]) {
          parsed[key].push(val);
        } else {
          parsed[key] = [val];
        }
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
      }
    });
    return parsed;
  };
  function trimSPorHTAB(str) {
    let start = 0;
    let end = str.length;
    while (start < end) {
      const code = str.charCodeAt(start);
      if (code !== 9 && code !== 32) {
        break;
      }
      start += 1;
    }
    while (end > start) {
      const code = str.charCodeAt(end - 1);
      if (code !== 9 && code !== 32) {
        break;
      }
      end -= 1;
    }
    return start === 0 && end === str.length ? str : str.slice(start, end);
  }
  const INVALID_UNICODE_HEADER_VALUE_CHARS = new RegExp("[\\u0000-\\u0008\\u000a-\\u001f\\u007f]+", "g");
  const INVALID_BYTE_STRING_HEADER_VALUE_CHARS = new RegExp("[^\\u0009\\u0020-\\u007e\\u0080-\\u00ff]+", "g");
  function sanitizeValue(value, invalidChars) {
    if (utils$1.isArray(value)) {
      return value.map((item) => sanitizeValue(item, invalidChars));
    }
    return trimSPorHTAB(String(value).replace(invalidChars, ""));
  }
  const sanitizeHeaderValue = (value) => sanitizeValue(value, INVALID_UNICODE_HEADER_VALUE_CHARS);
  const sanitizeByteStringHeaderValue = (value) => sanitizeValue(value, INVALID_BYTE_STRING_HEADER_VALUE_CHARS);
  function toByteStringHeaderObject(headers) {
    const byteStringHeaders = /* @__PURE__ */ Object.create(null);
    utils$1.forEach(headers.toJSON(), (value, header) => {
      byteStringHeaders[header] = sanitizeByteStringHeaderValue(value);
    });
    return byteStringHeaders;
  }
  const $internals = /* @__PURE__ */ Symbol("internals");
  function normalizeHeader(header) {
    return header && String(header).trim().toLowerCase();
  }
  function normalizeValue(value) {
    if (value === false || value == null) {
      return value;
    }
    return utils$1.isArray(value) ? value.map(normalizeValue) : sanitizeHeaderValue(String(value));
  }
  function parseTokens(str) {
    const tokens = /* @__PURE__ */ Object.create(null);
    const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
    let match;
    while (match = tokensRE.exec(str)) {
      tokens[match[1]] = match[2];
    }
    return tokens;
  }
  const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
  function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
    if (utils$1.isFunction(filter)) {
      return filter.call(this, value, header);
    }
    if (isHeaderNameFilter) {
      value = header;
    }
    if (!utils$1.isString(value)) return;
    if (utils$1.isString(filter)) {
      return value.indexOf(filter) !== -1;
    }
    if (utils$1.isRegExp(filter)) {
      return filter.test(value);
    }
  }
  function formatHeader(header) {
    return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
      return char.toUpperCase() + str;
    });
  }
  function buildAccessors(obj, header) {
    const accessorName = utils$1.toCamelCase(" " + header);
    ["get", "set", "has"].forEach((methodName) => {
      Object.defineProperty(obj, methodName + accessorName, {
        // Null-proto descriptor so a polluted Object.prototype.get cannot turn
        // this data descriptor into an accessor descriptor on the way in.
        __proto__: null,
        value: function(arg1, arg2, arg3) {
          return this[methodName].call(this, header, arg1, arg2, arg3);
        },
        configurable: true
      });
    });
  }
  let AxiosHeaders$1 = class AxiosHeaders {
    constructor(headers) {
      headers && this.set(headers);
    }
    set(header, valueOrRewrite, rewrite) {
      const self2 = this;
      function setHeader(_value, _header, _rewrite) {
        const lHeader = normalizeHeader(_header);
        if (!lHeader) {
          return;
        }
        const key = utils$1.findKey(self2, lHeader);
        if (!key || self2[key] === void 0 || _rewrite === true || _rewrite === void 0 && self2[key] !== false) {
          self2[key || _header] = normalizeValue(_value);
        }
      }
      const setHeaders = (headers, _rewrite) => utils$1.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
      if (utils$1.isPlainObject(header) || header instanceof this.constructor) {
        setHeaders(header, valueOrRewrite);
      } else if (utils$1.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
        setHeaders(parseHeaders(header), valueOrRewrite);
      } else if (utils$1.isObject(header) && utils$1.isSafeIterable(header)) {
        let obj = /* @__PURE__ */ Object.create(null), dest, key;
        for (const entry of header) {
          if (!utils$1.isArray(entry)) {
            throw new TypeError("Object iterator must return a key-value pair");
          }
          key = entry[0];
          if (utils$1.hasOwnProp(obj, key)) {
            dest = obj[key];
            obj[key] = utils$1.isArray(dest) ? [...dest, entry[1]] : [dest, entry[1]];
          } else {
            obj[key] = entry[1];
          }
        }
        setHeaders(obj, valueOrRewrite);
      } else {
        header != null && setHeader(valueOrRewrite, header, rewrite);
      }
      return this;
    }
    get(header, parser) {
      header = normalizeHeader(header);
      if (header) {
        const key = utils$1.findKey(this, header);
        if (key) {
          const value = this[key];
          if (!parser) {
            return value;
          }
          if (parser === true) {
            return parseTokens(value);
          }
          if (utils$1.isFunction(parser)) {
            return parser.call(this, value, key);
          }
          if (utils$1.isRegExp(parser)) {
            return parser.exec(value);
          }
          throw new TypeError("parser must be boolean|regexp|function");
        }
      }
    }
    has(header, matcher) {
      header = normalizeHeader(header);
      if (header) {
        const key = utils$1.findKey(this, header);
        return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
      }
      return false;
    }
    delete(header, matcher) {
      const self2 = this;
      let deleted = false;
      function deleteHeader(_header) {
        _header = normalizeHeader(_header);
        if (_header) {
          const key = utils$1.findKey(self2, _header);
          if (key && (!matcher || matchHeaderValue(self2, self2[key], key, matcher))) {
            delete self2[key];
            deleted = true;
          }
        }
      }
      if (utils$1.isArray(header)) {
        header.forEach(deleteHeader);
      } else {
        deleteHeader(header);
      }
      return deleted;
    }
    clear(matcher) {
      const keys = Object.keys(this);
      let i = keys.length;
      let deleted = false;
      while (i--) {
        const key = keys[i];
        if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
          delete this[key];
          deleted = true;
        }
      }
      return deleted;
    }
    normalize(format) {
      const self2 = this;
      const headers = {};
      utils$1.forEach(this, (value, header) => {
        const key = utils$1.findKey(headers, header);
        if (key) {
          self2[key] = normalizeValue(value);
          delete self2[header];
          return;
        }
        const normalized = format ? formatHeader(header) : String(header).trim();
        if (normalized !== header) {
          delete self2[header];
        }
        self2[normalized] = normalizeValue(value);
        headers[normalized] = true;
      });
      return this;
    }
    concat(...targets) {
      return this.constructor.concat(this, ...targets);
    }
    toJSON(asStrings) {
      const obj = /* @__PURE__ */ Object.create(null);
      utils$1.forEach(this, (value, header) => {
        value != null && value !== false && (obj[header] = asStrings && utils$1.isArray(value) ? value.join(", ") : value);
      });
      return obj;
    }
    [Symbol.iterator]() {
      return Object.entries(this.toJSON())[Symbol.iterator]();
    }
    toString() {
      return Object.entries(this.toJSON()).map(([header, value]) => header + ": " + value).join("\n");
    }
    getSetCookie() {
      return this.get("set-cookie") || [];
    }
    get [Symbol.toStringTag]() {
      return "AxiosHeaders";
    }
    static from(thing) {
      return thing instanceof this ? thing : new this(thing);
    }
    static concat(first, ...targets) {
      const computed = new this(first);
      targets.forEach((target) => computed.set(target));
      return computed;
    }
    static accessor(header) {
      const internals = this[$internals] = this[$internals] = {
        accessors: {}
      };
      const accessors = internals.accessors;
      const prototype2 = this.prototype;
      function defineAccessor(_header) {
        const lHeader = normalizeHeader(_header);
        if (!accessors[lHeader]) {
          buildAccessors(prototype2, _header);
          accessors[lHeader] = true;
        }
      }
      utils$1.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
      return this;
    }
  };
  AxiosHeaders$1.accessor([
    "Content-Type",
    "Content-Length",
    "Accept",
    "Accept-Encoding",
    "User-Agent",
    "Authorization"
  ]);
  utils$1.reduceDescriptors(AxiosHeaders$1.prototype, ({ value }, key) => {
    let mapped = key[0].toUpperCase() + key.slice(1);
    return {
      get: () => value,
      set(headerValue) {
        this[mapped] = headerValue;
      }
    };
  });
  utils$1.freezeMethods(AxiosHeaders$1);
  const REDACTED = "[REDACTED ****]";
  function hasOwnOrPrototypeToJSON(source) {
    if (utils$1.hasOwnProp(source, "toJSON")) {
      return true;
    }
    let prototype2 = Object.getPrototypeOf(source);
    while (prototype2 && prototype2 !== Object.prototype) {
      if (utils$1.hasOwnProp(prototype2, "toJSON")) {
        return true;
      }
      prototype2 = Object.getPrototypeOf(prototype2);
    }
    return false;
  }
  function redactConfig(config, redactKeys) {
    const lowerKeys = new Set(redactKeys.map((k) => String(k).toLowerCase()));
    const seen = [];
    const visit = (source) => {
      if (source === null || typeof source !== "object") return source;
      if (utils$1.isBuffer(source)) return source;
      if (seen.indexOf(source) !== -1) return void 0;
      if (source instanceof AxiosHeaders$1) {
        source = source.toJSON();
      }
      seen.push(source);
      let result;
      if (utils$1.isArray(source)) {
        result = [];
        source.forEach((v, i) => {
          const reducedValue = visit(v);
          if (!utils$1.isUndefined(reducedValue)) {
            result[i] = reducedValue;
          }
        });
      } else {
        if (!utils$1.isPlainObject(source) && hasOwnOrPrototypeToJSON(source)) {
          seen.pop();
          return source;
        }
        result = /* @__PURE__ */ Object.create(null);
        for (const [key, value] of Object.entries(source)) {
          const reducedValue = lowerKeys.has(key.toLowerCase()) ? REDACTED : visit(value);
          if (!utils$1.isUndefined(reducedValue)) {
            result[key] = reducedValue;
          }
        }
      }
      seen.pop();
      return result;
    };
    return visit(config);
  }
  let AxiosError$1 = class AxiosError2 extends Error {
    static from(error, code, config, request, response, customProps) {
      const axiosError = new AxiosError2(error.message, code || error.code, config, request, response);
      Object.defineProperty(axiosError, "cause", {
        __proto__: null,
        value: error,
        writable: true,
        enumerable: false,
        configurable: true
      });
      axiosError.name = error.name;
      if (error.status != null && axiosError.status == null) {
        axiosError.status = error.status;
      }
      customProps && Object.assign(axiosError, customProps);
      return axiosError;
    }
    /**
     * Create an Error with the specified message, config, error code, request and response.
     *
     * @param {string} message The error message.
     * @param {string} [code] The error code (for example, 'ECONNABORTED').
     * @param {Object} [config] The config.
     * @param {Object} [request] The request.
     * @param {Object} [response] The response.
     *
     * @returns {Error} The created error.
     */
    constructor(message, code, config, request, response) {
      super(message);
      Object.defineProperty(this, "message", {
        // Null-proto descriptor so a polluted Object.prototype.get cannot turn
        // this data descriptor into an accessor descriptor on the way in.
        __proto__: null,
        value: message,
        enumerable: true,
        writable: true,
        configurable: true
      });
      this.name = "AxiosError";
      this.isAxiosError = true;
      code && (this.code = code);
      config && (this.config = config);
      request && (this.request = request);
      if (response) {
        this.response = response;
        this.status = response.status;
      }
    }
    toJSON() {
      const config = this.config;
      const redactKeys = config && utils$1.hasOwnProp(config, "redact") ? config.redact : void 0;
      const serializedConfig = utils$1.isArray(redactKeys) && redactKeys.length > 0 ? redactConfig(config, redactKeys) : utils$1.toJSONObject(config);
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
        config: serializedConfig,
        code: this.code,
        status: this.status
      };
    }
  };
  AxiosError$1.ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE";
  AxiosError$1.ERR_BAD_OPTION = "ERR_BAD_OPTION";
  AxiosError$1.ECONNABORTED = "ECONNABORTED";
  AxiosError$1.ETIMEDOUT = "ETIMEDOUT";
  AxiosError$1.ECONNREFUSED = "ECONNREFUSED";
  AxiosError$1.ERR_NETWORK = "ERR_NETWORK";
  AxiosError$1.ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS";
  AxiosError$1.ERR_DEPRECATED = "ERR_DEPRECATED";
  AxiosError$1.ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE";
  AxiosError$1.ERR_BAD_REQUEST = "ERR_BAD_REQUEST";
  AxiosError$1.ERR_CANCELED = "ERR_CANCELED";
  AxiosError$1.ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT";
  AxiosError$1.ERR_INVALID_URL = "ERR_INVALID_URL";
  AxiosError$1.ERR_FORM_DATA_DEPTH_EXCEEDED = "ERR_FORM_DATA_DEPTH_EXCEEDED";
  var httpAdapter = null;
  const DEFAULT_FORM_DATA_MAX_DEPTH = 100;
  function isVisitable(thing) {
    return utils$1.isPlainObject(thing) || utils$1.isArray(thing);
  }
  function removeBrackets(key) {
    return utils$1.endsWith(key, "[]") ? key.slice(0, -2) : key;
  }
  function renderKey(path, key, dots) {
    if (!path) return key;
    return path.concat(key).map(function each(token, i) {
      token = removeBrackets(token);
      return !dots && i ? "[" + token + "]" : token;
    }).join(dots ? "." : "");
  }
  function isFlatArray(arr) {
    return utils$1.isArray(arr) && !arr.some(isVisitable);
  }
  const predicates = utils$1.toFlatObject(utils$1, {}, null, function filter(prop) {
    return /^is[A-Z]/.test(prop);
  });
  function toFormData$1(obj, formData, options) {
    if (!utils$1.isObject(obj)) {
      throw new TypeError("target must be an object");
    }
    formData = formData || new FormData();
    options = utils$1.toFlatObject(
      options,
      {
        metaTokens: true,
        dots: false,
        indexes: false
      },
      false,
      function defined(option, source) {
        return !utils$1.isUndefined(source[option]);
      }
    );
    const metaTokens = options.metaTokens;
    const visitor = options.visitor || defaultVisitor;
    const dots = options.dots;
    const indexes = options.indexes;
    const _Blob = options.Blob || typeof Blob !== "undefined" && Blob;
    const maxDepth = options.maxDepth === void 0 ? DEFAULT_FORM_DATA_MAX_DEPTH : options.maxDepth;
    const useBlob = _Blob && utils$1.isSpecCompliantForm(formData);
    const stack = [];
    if (!utils$1.isFunction(visitor)) {
      throw new TypeError("visitor must be a function");
    }
    function convertValue(value) {
      if (value === null) return "";
      if (utils$1.isDate(value)) {
        return value.toISOString();
      }
      if (utils$1.isBoolean(value)) {
        return value.toString();
      }
      if (!useBlob && utils$1.isBlob(value)) {
        throw new AxiosError$1("Blob is not supported. Use a Buffer instead.");
      }
      if (utils$1.isArrayBuffer(value) || utils$1.isTypedArray(value)) {
        if (useBlob && typeof _Blob === "function") {
          return new _Blob([value]);
        }
        if (typeof Buffer !== "undefined") {
          return Buffer.from(value);
        }
        throw new AxiosError$1("Blob is not supported. Use a Buffer instead.", AxiosError$1.ERR_NOT_SUPPORT);
      }
      return value;
    }
    function throwIfMaxDepthExceeded(depth) {
      if (depth > maxDepth) {
        throw new AxiosError$1(
          "Object is too deeply nested (" + depth + " levels). Max depth: " + maxDepth,
          AxiosError$1.ERR_FORM_DATA_DEPTH_EXCEEDED
        );
      }
    }
    function stringifyWithDepthLimit(value, depth) {
      if (maxDepth === Infinity) {
        return JSON.stringify(value);
      }
      const ancestors = [];
      return JSON.stringify(value, function limitDepth(_key, currentValue) {
        if (!utils$1.isObject(currentValue)) {
          return currentValue;
        }
        while (ancestors.length && ancestors[ancestors.length - 1] !== this) {
          ancestors.pop();
        }
        ancestors.push(currentValue);
        throwIfMaxDepthExceeded(depth + ancestors.length - 1);
        return currentValue;
      });
    }
    function defaultVisitor(value, key, path) {
      let arr = value;
      if (utils$1.isReactNative(formData) && utils$1.isReactNativeBlob(value)) {
        formData.append(renderKey(path, key, dots), convertValue(value));
        return false;
      }
      if (value && !path && typeof value === "object") {
        if (utils$1.endsWith(key, "{}")) {
          key = metaTokens ? key : key.slice(0, -2);
          value = stringifyWithDepthLimit(value, 1);
        } else if (utils$1.isArray(value) && isFlatArray(value) || (utils$1.isFileList(value) || utils$1.endsWith(key, "[]")) && (arr = utils$1.toArray(value))) {
          key = removeBrackets(key);
          arr.forEach(function each(el, index) {
            !(utils$1.isUndefined(el) || el === null) && formData.append(
              // eslint-disable-next-line no-nested-ternary
              indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + "[]",
              convertValue(el)
            );
          });
          return false;
        }
      }
      if (isVisitable(value)) {
        return true;
      }
      formData.append(renderKey(path, key, dots), convertValue(value));
      return false;
    }
    const exposedHelpers = Object.assign(predicates, {
      defaultVisitor,
      convertValue,
      isVisitable
    });
    function build(value, path, depth = 0) {
      if (utils$1.isUndefined(value)) return;
      throwIfMaxDepthExceeded(depth);
      if (stack.indexOf(value) !== -1) {
        throw new Error("Circular reference detected in " + path.join("."));
      }
      stack.push(value);
      utils$1.forEach(value, function each(el, key) {
        const result = !(utils$1.isUndefined(el) || el === null) && visitor.call(formData, el, utils$1.isString(key) ? key.trim() : key, path, exposedHelpers);
        if (result === true) {
          build(el, path ? path.concat(key) : [key], depth + 1);
        }
      });
      stack.pop();
    }
    if (!utils$1.isObject(obj)) {
      throw new TypeError("data must be an object");
    }
    build(obj);
    return formData;
  }
  function encode$1(str) {
    const charMap = {
      "!": "%21",
      "'": "%27",
      "(": "%28",
      ")": "%29",
      "~": "%7E",
      "%20": "+"
    };
    return encodeURIComponent(str).replace(/[!'()~]|%20/g, function replacer(match) {
      return charMap[match];
    });
  }
  function AxiosURLSearchParams(params, options) {
    this._pairs = [];
    params && toFormData$1(params, this, options);
  }
  const prototype = AxiosURLSearchParams.prototype;
  prototype.append = function append(name, value) {
    this._pairs.push([name, value]);
  };
  prototype.toString = function toString2(encoder) {
    const _encode = encoder ? (value) => encoder.call(this, value, encode$1) : encode$1;
    return this._pairs.map(function each(pair) {
      return _encode(pair[0]) + "=" + _encode(pair[1]);
    }, "").join("&");
  };
  function encode(val) {
    return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
  }
  function buildURL(url, params, options) {
    if (!params) {
      return url;
    }
    url = url || "";
    const _options = utils$1.isFunction(options) ? {
      serialize: options
    } : options;
    const _encode = utils$1.getSafeProp(_options, "encode") || encode;
    const serializeFn = utils$1.getSafeProp(_options, "serialize");
    let serializedParams;
    if (serializeFn) {
      serializedParams = serializeFn(params, _options);
    } else {
      serializedParams = utils$1.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams(params, _options).toString(_encode);
    }
    if (serializedParams) {
      const hashmarkIndex = url.indexOf("#");
      if (hashmarkIndex !== -1) {
        url = url.slice(0, hashmarkIndex);
      }
      url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
    }
    return url;
  }
  class InterceptorManager {
    constructor() {
      this.handlers = [];
    }
    /**
     * Add a new interceptor to the stack
     *
     * @param {Function} fulfilled The function to handle `then` for a `Promise`
     * @param {Function} rejected The function to handle `reject` for a `Promise`
     * @param {Object} options The options for the interceptor, synchronous and runWhen
     *
     * @return {Number} An ID used to remove interceptor later
     */
    use(fulfilled, rejected, options) {
      this.handlers.push({
        fulfilled,
        rejected,
        synchronous: options ? options.synchronous : false,
        runWhen: options ? options.runWhen : null
      });
      return this.handlers.length - 1;
    }
    /**
     * Remove an interceptor from the stack
     *
     * @param {Number} id The ID that was returned by `use`
     *
     * @returns {void}
     */
    eject(id) {
      if (this.handlers[id]) {
        this.handlers[id] = null;
      }
    }
    /**
     * Clear all interceptors from the stack
     *
     * @returns {void}
     */
    clear() {
      if (this.handlers) {
        this.handlers = [];
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
          fn(h);
        }
      });
    }
  }
  var transitionalDefaults = {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false,
    legacyInterceptorReqResOrdering: true,
    advertiseZstdAcceptEncoding: false,
    validateStatusUndefinedResolves: true
  };
  var URLSearchParams$1 = typeof URLSearchParams !== "undefined" ? URLSearchParams : AxiosURLSearchParams;
  var FormData$1 = typeof FormData !== "undefined" ? FormData : null;
  var Blob$1 = typeof Blob !== "undefined" ? Blob : null;
  var platform$1 = {
    isBrowser: true,
    classes: {
      URLSearchParams: URLSearchParams$1,
      FormData: FormData$1,
      Blob: Blob$1
    },
    protocols: ["http", "https", "file", "blob", "url", "data"]
  };
  const hasBrowserEnv = typeof window !== "undefined" && typeof document !== "undefined";
  const _navigator = typeof navigator === "object" && navigator || void 0;
  const hasStandardBrowserEnv = hasBrowserEnv && (!_navigator || ["ReactNative", "NativeScript", "NS"].indexOf(_navigator.product) < 0);
  const hasStandardBrowserWebWorkerEnv = (() => {
    return typeof WorkerGlobalScope !== "undefined" && // eslint-disable-next-line no-undef
    self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
  })();
  const origin = hasBrowserEnv && window.location.href || "http://localhost";
  var utils = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    hasBrowserEnv,
    hasStandardBrowserEnv,
    hasStandardBrowserWebWorkerEnv,
    navigator: _navigator,
    origin
  });
  var platform = {
    ...utils,
    ...platform$1
  };
  function toURLEncodedForm(data, options) {
    return toFormData$1(data, new platform.classes.URLSearchParams(), {
      visitor: function(value, key, path, helpers) {
        if (platform.isNode && utils$1.isBuffer(value)) {
          this.append(key, value.toString("base64"));
          return false;
        }
        return helpers.defaultVisitor.apply(this, arguments);
      },
      ...options
    });
  }
  const MAX_DEPTH = DEFAULT_FORM_DATA_MAX_DEPTH;
  function throwIfDepthExceeded(index) {
    if (index > MAX_DEPTH) {
      throw new AxiosError$1(
        "FormData field is too deeply nested (" + index + " levels). Max depth: " + MAX_DEPTH,
        AxiosError$1.ERR_FORM_DATA_DEPTH_EXCEEDED
      );
    }
  }
  function parsePropPath(name) {
    const path = [];
    const pattern = /\w+|\[(\w*)]/g;
    let match;
    while ((match = pattern.exec(name)) !== null) {
      throwIfDepthExceeded(path.length);
      path.push(match[0] === "[]" ? "" : match[1] || match[0]);
    }
    return path;
  }
  function arrayToObject(arr) {
    const obj = {};
    const keys = Object.keys(arr);
    let i;
    const len = keys.length;
    let key;
    for (i = 0; i < len; i++) {
      key = keys[i];
      obj[key] = arr[key];
    }
    return obj;
  }
  function formDataToJSON(formData) {
    function buildPath(path, value, target, index) {
      throwIfDepthExceeded(index);
      let name = path[index++];
      if (name === "__proto__") return true;
      const isNumericKey = Number.isFinite(+name);
      const isLast = index >= path.length;
      name = !name && utils$1.isArray(target) ? target.length : name;
      if (isLast) {
        if (utils$1.hasOwnProp(target, name)) {
          target[name] = utils$1.isArray(target[name]) ? target[name].concat(value) : [target[name], value];
        } else {
          target[name] = value;
        }
        return !isNumericKey;
      }
      if (!utils$1.hasOwnProp(target, name) || !utils$1.isObject(target[name])) {
        target[name] = [];
      }
      const result = buildPath(path, value, target[name], index);
      if (result && utils$1.isArray(target[name])) {
        target[name] = arrayToObject(target[name]);
      }
      return !isNumericKey;
    }
    if (utils$1.isFormData(formData) && utils$1.isFunction(formData.entries)) {
      const obj = {};
      utils$1.forEachEntry(formData, (name, value) => {
        buildPath(parsePropPath(name), value, obj, 0);
      });
      return obj;
    }
    return null;
  }
  const own = (obj, key) => obj != null && utils$1.hasOwnProp(obj, key) ? obj[key] : void 0;
  function stringifySafely(rawValue, parser, encoder) {
    if (utils$1.isString(rawValue)) {
      try {
        (parser || JSON.parse)(rawValue);
        return utils$1.trim(rawValue);
      } catch (e) {
        if (e.name !== "SyntaxError") {
          throw e;
        }
      }
    }
    return (encoder || JSON.stringify)(rawValue);
  }
  const defaults = {
    transitional: transitionalDefaults,
    adapter: ["xhr", "http", "fetch"],
    transformRequest: [
      function transformRequest(data, headers) {
        const contentType = headers.getContentType() || "";
        const hasJSONContentType = contentType.indexOf("application/json") > -1;
        const isObjectPayload = utils$1.isObject(data);
        if (isObjectPayload && utils$1.isHTMLForm(data)) {
          data = new FormData(data);
        }
        const isFormData2 = utils$1.isFormData(data);
        if (isFormData2) {
          return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
        }
        if (utils$1.isArrayBuffer(data) || utils$1.isBuffer(data) || utils$1.isStream(data) || utils$1.isFile(data) || utils$1.isBlob(data) || utils$1.isReadableStream(data)) {
          return data;
        }
        if (utils$1.isArrayBufferView(data)) {
          return data.buffer;
        }
        if (utils$1.isURLSearchParams(data)) {
          headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
          return data.toString();
        }
        let isFileList2;
        if (isObjectPayload) {
          const formSerializer = own(this, "formSerializer");
          if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
            return toURLEncodedForm(data, formSerializer).toString();
          }
          if ((isFileList2 = utils$1.isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
            const env = own(this, "env");
            const _FormData = env && env.FormData;
            return toFormData$1(
              isFileList2 ? { "files[]": data } : data,
              _FormData && new _FormData(),
              formSerializer
            );
          }
        }
        if (isObjectPayload || hasJSONContentType) {
          headers.setContentType("application/json", false);
          return stringifySafely(data);
        }
        return data;
      }
    ],
    transformResponse: [
      function transformResponse(data) {
        const transitional = own(this, "transitional") || defaults.transitional;
        const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
        const responseType = own(this, "responseType");
        const JSONRequested = responseType === "json";
        if (utils$1.isResponse(data) || utils$1.isReadableStream(data)) {
          return data;
        }
        if (data && utils$1.isString(data) && (forcedJSONParsing && !responseType || JSONRequested)) {
          const silentJSONParsing = transitional && transitional.silentJSONParsing;
          const strictJSONParsing = !silentJSONParsing && JSONRequested;
          try {
            return JSON.parse(data, own(this, "parseReviver"));
          } catch (e) {
            if (strictJSONParsing) {
              if (e.name === "SyntaxError") {
                throw AxiosError$1.from(e, AxiosError$1.ERR_BAD_RESPONSE, this, null, own(this, "response"));
              }
              throw e;
            }
          }
        }
        return data;
      }
    ],
    /**
     * A timeout in milliseconds to abort a request. If set to 0 (default) a
     * timeout is not created.
     */
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {
      FormData: platform.classes.FormData,
      Blob: platform.classes.Blob
    },
    validateStatus: function validateStatus(status) {
      return status >= 200 && status < 300;
    },
    headers: {
      common: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": void 0
      }
    }
  };
  utils$1.forEach(["delete", "get", "head", "post", "put", "patch", "query"], (method) => {
    defaults.headers[method] = {};
  });
  function transformData(fns, response) {
    const config = this || defaults;
    const context = response || config;
    const headers = AxiosHeaders$1.from(context.headers);
    let data = context.data;
    utils$1.forEach(fns, function transform(fn) {
      data = fn.call(config, data, headers.normalize(), response ? response.status : void 0);
    });
    headers.normalize();
    return data;
  }
  function isCancel$1(value) {
    return !!(value && value.__CANCEL__);
  }
  let CanceledError$1 = class CanceledError extends AxiosError$1 {
    /**
     * A `CanceledError` is an object that is thrown when an operation is canceled.
     *
     * @param {string=} message The message.
     * @param {Object=} config The config.
     * @param {Object=} request The request.
     *
     * @returns {CanceledError} The created error.
     */
    constructor(message, config, request) {
      super(message == null ? "canceled" : message, AxiosError$1.ERR_CANCELED, config, request);
      this.name = "CanceledError";
      this.__CANCEL__ = true;
    }
  };
  function settle(resolve, reject, response) {
    const validateStatus = response.config.validateStatus;
    if (!response.status || !validateStatus || validateStatus(response.status)) {
      resolve(response);
    } else {
      reject(new AxiosError$1(
        "Request failed with status code " + response.status,
        response.status >= 400 && response.status < 500 ? AxiosError$1.ERR_BAD_REQUEST : AxiosError$1.ERR_BAD_RESPONSE,
        response.config,
        response.request,
        response
      ));
    }
  }
  function parseProtocol(url) {
    const match = /^([-+\w]{1,25}):(?:\/\/)?/.exec(url);
    return match && match[1] || "";
  }
  function speedometer(samplesCount, min) {
    samplesCount = samplesCount || 10;
    const bytes = new Array(samplesCount);
    const timestamps = new Array(samplesCount);
    let head = 0;
    let tail = 0;
    let firstSampleTS;
    min = min !== void 0 ? min : 1e3;
    return function push(chunkLength) {
      const now = Date.now();
      const startedAt = timestamps[tail];
      if (!firstSampleTS) {
        firstSampleTS = now;
      }
      bytes[head] = chunkLength;
      timestamps[head] = now;
      let i = tail;
      let bytesCount = 0;
      while (i !== head) {
        bytesCount += bytes[i++];
        i = i % samplesCount;
      }
      head = (head + 1) % samplesCount;
      if (head === tail) {
        tail = (tail + 1) % samplesCount;
      }
      if (now - firstSampleTS < min) {
        return;
      }
      const passed = startedAt && now - startedAt;
      return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
    };
  }
  function throttle(fn, freq) {
    let timestamp = 0;
    let threshold = 1e3 / freq;
    let lastArgs;
    let timer;
    const invoke = (args, now = Date.now()) => {
      timestamp = now;
      lastArgs = null;
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      fn(...args);
    };
    const throttled = (...args) => {
      const now = Date.now();
      const passed = now - timestamp;
      if (passed >= threshold) {
        invoke(args, now);
      } else {
        lastArgs = args;
        if (!timer) {
          timer = setTimeout(() => {
            timer = null;
            invoke(lastArgs);
          }, threshold - passed);
        }
      }
    };
    const flush = () => lastArgs && invoke(lastArgs);
    return [throttled, flush];
  }
  const progressEventReducer = (listener, isDownloadStream, freq = 3) => {
    let bytesNotified = 0;
    const _speedometer = speedometer(50, 250);
    return throttle((e) => {
      if (!e || typeof e.loaded !== "number") {
        return;
      }
      const rawLoaded = e.loaded;
      const total = e.lengthComputable ? e.total : void 0;
      const loaded = total != null ? Math.min(rawLoaded, total) : rawLoaded;
      const progressBytes = Math.max(0, loaded - bytesNotified);
      const rate = _speedometer(progressBytes);
      bytesNotified = Math.max(bytesNotified, loaded);
      const data = {
        loaded,
        total,
        progress: total ? loaded / total : void 0,
        bytes: progressBytes,
        rate: rate ? rate : void 0,
        estimated: rate && total ? (total - loaded) / rate : void 0,
        event: e,
        lengthComputable: total != null,
        [isDownloadStream ? "download" : "upload"]: true
      };
      listener(data);
    }, freq);
  };
  const progressEventDecorator = (total, throttled) => {
    const lengthComputable = total != null;
    return [
      (loaded) => throttled[0]({
        lengthComputable,
        total,
        loaded
      }),
      throttled[1]
    ];
  };
  const asyncDecorator = (fn) => (...args) => utils$1.asap(() => fn(...args));
  var isURLSameOrigin = platform.hasStandardBrowserEnv ? /* @__PURE__ */ ((origin2, isMSIE) => (url) => {
    url = new URL(url, platform.origin);
    return origin2.protocol === url.protocol && origin2.host === url.host && (isMSIE || origin2.port === url.port);
  })(
    new URL(platform.origin),
    platform.navigator && /(msie|trident)/i.test(platform.navigator.userAgent)
  ) : () => true;
  var cookies = platform.hasStandardBrowserEnv ? (
    // Standard browser envs support document.cookie
    {
      write(name, value, expires, path, domain, secure, sameSite) {
        if (typeof document === "undefined") return;
        const cookie = [`${name}=${encodeURIComponent(value)}`];
        if (utils$1.isNumber(expires)) {
          cookie.push(`expires=${new Date(expires).toUTCString()}`);
        }
        if (utils$1.isString(path)) {
          cookie.push(`path=${path}`);
        }
        if (utils$1.isString(domain)) {
          cookie.push(`domain=${domain}`);
        }
        if (secure === true) {
          cookie.push("secure");
        }
        if (utils$1.isString(sameSite)) {
          cookie.push(`SameSite=${sameSite}`);
        }
        document.cookie = cookie.join("; ");
      },
      read(name) {
        if (typeof document === "undefined") return null;
        const cookies2 = document.cookie.split(";");
        for (let i = 0; i < cookies2.length; i++) {
          const cookie = cookies2[i].replace(/^\s+/, "");
          const eq = cookie.indexOf("=");
          if (eq !== -1 && cookie.slice(0, eq) === name) {
            try {
              return decodeURIComponent(cookie.slice(eq + 1));
            } catch (e) {
              return cookie.slice(eq + 1);
            }
          }
        }
        return null;
      },
      remove(name) {
        this.write(name, "", Date.now() - 864e5, "/");
      }
    }
  ) : (
    // Non-standard browser env (web workers, react-native) lack needed support.
    {
      write() {
      },
      read() {
        return null;
      },
      remove() {
      }
    }
  );
  function isAbsoluteURL(url) {
    if (typeof url !== "string") {
      return false;
    }
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
  }
  function combineURLs(baseURL, relativeURL) {
    return relativeURL ? baseURL.replace(/\/?\/$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
  }
  const malformedHttpProtocol = /^https?:(?!\/\/)/i;
  const httpProtocolControlCharacters = /[\t\n\r]/g;
  function stripLeadingC0ControlOrSpace(url) {
    let i = 0;
    while (i < url.length && url.charCodeAt(i) <= 32) {
      i++;
    }
    return url.slice(i);
  }
  function normalizeURLForProtocolCheck(url) {
    return stripLeadingC0ControlOrSpace(url).replace(httpProtocolControlCharacters, "");
  }
  function assertValidHttpProtocolURL(url, config) {
    if (typeof url === "string" && malformedHttpProtocol.test(normalizeURLForProtocolCheck(url))) {
      throw new AxiosError$1(
        'Invalid URL: missing "//" after protocol',
        AxiosError$1.ERR_INVALID_URL,
        config
      );
    }
  }
  function buildFullPath(baseURL, requestedURL, allowAbsoluteUrls, config) {
    assertValidHttpProtocolURL(requestedURL, config);
    let isRelativeUrl = !isAbsoluteURL(requestedURL);
    if (baseURL && (isRelativeUrl || allowAbsoluteUrls === false)) {
      assertValidHttpProtocolURL(baseURL, config);
      return combineURLs(baseURL, requestedURL);
    }
    return requestedURL;
  }
  const headersToObject = (thing) => thing instanceof AxiosHeaders$1 ? { ...thing } : thing;
  function mergeConfig$1(config1, config2) {
    config1 = config1 || {};
    config2 = config2 || {};
    const config = /* @__PURE__ */ Object.create(null);
    Object.defineProperty(config, "hasOwnProperty", {
      // Null-proto descriptor so a polluted Object.prototype.get cannot turn
      // this data descriptor into an accessor descriptor on the way in.
      __proto__: null,
      value: Object.prototype.hasOwnProperty,
      enumerable: false,
      writable: true,
      configurable: true
    });
    function getMergedValue(target, source, prop, caseless) {
      if (utils$1.isPlainObject(target) && utils$1.isPlainObject(source)) {
        return utils$1.merge.call({ caseless }, target, source);
      } else if (utils$1.isPlainObject(source)) {
        return utils$1.merge({}, source);
      } else if (utils$1.isArray(source)) {
        return source.slice();
      }
      return source;
    }
    function mergeDeepProperties(a, b, prop, caseless) {
      if (!utils$1.isUndefined(b)) {
        return getMergedValue(a, b, prop, caseless);
      } else if (!utils$1.isUndefined(a)) {
        return getMergedValue(void 0, a, prop, caseless);
      }
    }
    function valueFromConfig2(a, b) {
      if (!utils$1.isUndefined(b)) {
        return getMergedValue(void 0, b);
      }
    }
    function defaultToConfig2(a, b) {
      if (!utils$1.isUndefined(b)) {
        return getMergedValue(void 0, b);
      } else if (!utils$1.isUndefined(a)) {
        return getMergedValue(void 0, a);
      }
    }
    function getMergedTransitionalOption(prop) {
      const transitional2 = utils$1.hasOwnProp(config2, "transitional") ? config2.transitional : void 0;
      if (!utils$1.isUndefined(transitional2)) {
        if (utils$1.isPlainObject(transitional2)) {
          if (utils$1.hasOwnProp(transitional2, prop)) {
            return transitional2[prop];
          }
        } else {
          return void 0;
        }
      }
      const transitional1 = utils$1.hasOwnProp(config1, "transitional") ? config1.transitional : void 0;
      if (utils$1.isPlainObject(transitional1) && utils$1.hasOwnProp(transitional1, prop)) {
        return transitional1[prop];
      }
      return void 0;
    }
    function mergeDirectKeys(a, b, prop) {
      if (utils$1.hasOwnProp(config2, prop)) {
        return getMergedValue(a, b);
      } else if (utils$1.hasOwnProp(config1, prop)) {
        return getMergedValue(void 0, a);
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
      allowedSocketPaths: defaultToConfig2,
      responseEncoding: defaultToConfig2,
      validateStatus: mergeDirectKeys,
      headers: (a, b, prop) => mergeDeepProperties(headersToObject(a), headersToObject(b), prop, true)
    };
    utils$1.forEach(Object.keys({ ...config1, ...config2 }), function computeConfigValue(prop) {
      if (prop === "__proto__" || prop === "constructor" || prop === "prototype") return;
      const merge2 = utils$1.hasOwnProp(mergeMap, prop) ? mergeMap[prop] : mergeDeepProperties;
      const a = utils$1.hasOwnProp(config1, prop) ? config1[prop] : void 0;
      const b = utils$1.hasOwnProp(config2, prop) ? config2[prop] : void 0;
      const configValue = merge2(a, b, prop);
      utils$1.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config[prop] = configValue);
    });
    if (utils$1.hasOwnProp(config2, "validateStatus") && utils$1.isUndefined(config2.validateStatus) && getMergedTransitionalOption("validateStatusUndefinedResolves") === false) {
      if (utils$1.hasOwnProp(config1, "validateStatus")) {
        config.validateStatus = getMergedValue(void 0, config1.validateStatus);
      } else {
        delete config.validateStatus;
      }
    }
    return config;
  }
  const FORM_DATA_CONTENT_HEADERS = ["content-type", "content-length"];
  function setFormDataHeaders(headers, formHeaders, policy) {
    if (policy !== "content-only") {
      headers.set(formHeaders);
      return;
    }
    Object.entries(formHeaders || {}).forEach(([key, val]) => {
      if (FORM_DATA_CONTENT_HEADERS.includes(key.toLowerCase())) {
        headers.set(key, val);
      }
    });
  }
  const encodeUTF8$1 = (str) => encodeURIComponent(str).replace(
    /%([0-9A-F]{2})/gi,
    (_, hex) => String.fromCharCode(parseInt(hex, 16))
  );
  function resolveConfig(config) {
    const newConfig = mergeConfig$1({}, config);
    const own2 = (key) => utils$1.hasOwnProp(newConfig, key) ? newConfig[key] : void 0;
    const data = own2("data");
    let withXSRFToken = own2("withXSRFToken");
    const xsrfHeaderName = own2("xsrfHeaderName");
    const xsrfCookieName = own2("xsrfCookieName");
    let headers = own2("headers");
    const auth = own2("auth");
    const baseURL = own2("baseURL");
    const allowAbsoluteUrls = own2("allowAbsoluteUrls");
    const url = own2("url");
    newConfig.headers = headers = AxiosHeaders$1.from(headers);
    newConfig.url = buildURL(
      buildFullPath(baseURL, url, allowAbsoluteUrls, newConfig),
      own2("params"),
      own2("paramsSerializer")
    );
    if (auth) {
      const username = utils$1.getSafeProp(auth, "username") || "";
      const password = utils$1.getSafeProp(auth, "password") || "";
      try {
        headers.set(
          "Authorization",
          "Basic " + btoa(username + ":" + (password ? encodeUTF8$1(password) : ""))
        );
      } catch (e) {
        throw AxiosError$1.from(e, AxiosError$1.ERR_BAD_OPTION_VALUE, config);
      }
    }
    if (utils$1.isFormData(data)) {
      if (platform.hasStandardBrowserEnv || platform.hasStandardBrowserWebWorkerEnv || utils$1.isReactNative(data)) {
        headers.setContentType(void 0);
      } else if (utils$1.isFunction(data.getHeaders)) {
        setFormDataHeaders(headers, data.getHeaders(), own2("formDataHeaderPolicy"));
      }
    }
    if (platform.hasStandardBrowserEnv) {
      if (utils$1.isFunction(withXSRFToken)) {
        withXSRFToken = withXSRFToken(newConfig);
      }
      const shouldSendXSRF = withXSRFToken === true || withXSRFToken == null && isURLSameOrigin(newConfig.url);
      if (shouldSendXSRF) {
        const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies.read(xsrfCookieName);
        if (xsrfValue) {
          headers.set(xsrfHeaderName, xsrfValue);
        }
      }
    }
    return newConfig;
  }
  const isXHRAdapterSupported = typeof XMLHttpRequest !== "undefined";
  var xhrAdapter = isXHRAdapterSupported && function(config) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
      const _config = resolveConfig(config);
      let requestData = _config.data;
      const requestHeaders = AxiosHeaders$1.from(_config.headers).normalize();
      let { responseType, onUploadProgress, onDownloadProgress } = _config;
      let onCanceled;
      let uploadThrottled, downloadThrottled;
      let flushUpload, flushDownload;
      function done() {
        flushUpload && flushUpload();
        flushDownload && flushDownload();
        _config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);
        _config.signal && _config.signal.removeEventListener("abort", onCanceled);
      }
      let request = new XMLHttpRequest();
      request.open(_config.method.toUpperCase(), _config.url, true);
      request.timeout = _config.timeout;
      function onloadend() {
        if (!request) {
          return;
        }
        const responseHeaders = AxiosHeaders$1.from(
          "getAllResponseHeaders" in request && request.getAllResponseHeaders()
        );
        const responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
        const response = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config,
          request
        };
        settle(
          function _resolve(value) {
            resolve(value);
            done();
          },
          function _reject(err) {
            reject(err);
            done();
          },
          response
        );
        request = null;
      }
      if ("onloadend" in request) {
        request.onloadend = onloadend;
      } else {
        request.onreadystatechange = function handleLoad() {
          if (!request || request.readyState !== 4) {
            return;
          }
          if (request.status === 0 && !(request.responseURL && request.responseURL.startsWith("file:"))) {
            return;
          }
          setTimeout(onloadend);
        };
      }
      request.onabort = function handleAbort() {
        if (!request) {
          return;
        }
        reject(new AxiosError$1("Request aborted", AxiosError$1.ECONNABORTED, config, request));
        done();
        request = null;
      };
      request.onerror = function handleError(event) {
        const msg = event && event.message ? event.message : "Network Error";
        const err = new AxiosError$1(msg, AxiosError$1.ERR_NETWORK, config, request);
        err.event = event || null;
        reject(err);
        done();
        request = null;
      };
      request.ontimeout = function handleTimeout() {
        let timeoutErrorMessage = _config.timeout ? "timeout of " + _config.timeout + "ms exceeded" : "timeout exceeded";
        const transitional = _config.transitional || transitionalDefaults;
        if (_config.timeoutErrorMessage) {
          timeoutErrorMessage = _config.timeoutErrorMessage;
        }
        reject(
          new AxiosError$1(
            timeoutErrorMessage,
            transitional.clarifyTimeoutError ? AxiosError$1.ETIMEDOUT : AxiosError$1.ECONNABORTED,
            config,
            request
          )
        );
        done();
        request = null;
      };
      requestData === void 0 && requestHeaders.setContentType(null);
      if ("setRequestHeader" in request) {
        utils$1.forEach(toByteStringHeaderObject(requestHeaders), function setRequestHeader(val, key) {
          request.setRequestHeader(key, val);
        });
      }
      if (!utils$1.isUndefined(_config.withCredentials)) {
        request.withCredentials = !!_config.withCredentials;
      }
      if (responseType && responseType !== "json") {
        request.responseType = _config.responseType;
      }
      if (onDownloadProgress) {
        [downloadThrottled, flushDownload] = progressEventReducer(onDownloadProgress, true);
        request.addEventListener("progress", downloadThrottled);
      }
      if (onUploadProgress && request.upload) {
        [uploadThrottled, flushUpload] = progressEventReducer(onUploadProgress);
        request.upload.addEventListener("progress", uploadThrottled);
        request.upload.addEventListener("loadend", flushUpload);
      }
      if (_config.cancelToken || _config.signal) {
        onCanceled = (cancel) => {
          if (!request) {
            return;
          }
          reject(!cancel || cancel.type ? new CanceledError$1(null, config, request) : cancel);
          request.abort();
          done();
          request = null;
        };
        _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
        if (_config.signal) {
          _config.signal.aborted ? onCanceled() : _config.signal.addEventListener("abort", onCanceled);
        }
      }
      const protocol = parseProtocol(_config.url);
      if (protocol && !platform.protocols.includes(protocol)) {
        reject(
          new AxiosError$1(
            "Unsupported protocol " + protocol + ":",
            AxiosError$1.ERR_BAD_REQUEST,
            config
          )
        );
        done();
        return;
      }
      request.send(requestData || null);
    });
  };
  const composeSignals = (signals, timeout) => {
    signals = signals ? signals.filter(Boolean) : [];
    if (!timeout && !signals.length) {
      return;
    }
    const controller = new AbortController();
    let aborted = false;
    const onabort = function(reason) {
      if (!aborted) {
        aborted = true;
        unsubscribe();
        const err = reason instanceof Error ? reason : this.reason;
        controller.abort(
          err instanceof AxiosError$1 ? err : new CanceledError$1(err instanceof Error ? err.message : err)
        );
      }
    };
    let timer = timeout && setTimeout(() => {
      timer = null;
      onabort(new AxiosError$1(`timeout of ${timeout}ms exceeded`, AxiosError$1.ETIMEDOUT));
    }, timeout);
    const unsubscribe = () => {
      if (!signals) {
        return;
      }
      timer && clearTimeout(timer);
      timer = null;
      signals.forEach((signal2) => {
        signal2.unsubscribe ? signal2.unsubscribe(onabort) : signal2.removeEventListener("abort", onabort);
      });
      signals = null;
    };
    signals.forEach((signal2) => signal2.addEventListener("abort", onabort, { once: true }));
    const { signal } = controller;
    signal.unsubscribe = () => utils$1.asap(unsubscribe);
    return signal;
  };
  const streamChunk = function* (chunk, chunkSize) {
    let len = chunk.byteLength;
    if (len < chunkSize) {
      yield chunk;
      return;
    }
    let pos = 0;
    let end;
    while (pos < len) {
      end = pos + chunkSize;
      yield chunk.slice(pos, end);
      pos = end;
    }
  };
  const readBytes = async function* (iterable, chunkSize) {
    for await (const chunk of readStream(iterable)) {
      yield* streamChunk(chunk, chunkSize);
    }
  };
  const readStream = async function* (stream) {
    if (stream[Symbol.asyncIterator]) {
      yield* stream;
      return;
    }
    const reader = stream.getReader();
    try {
      for (; ; ) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        yield value;
      }
    } finally {
      await reader.cancel();
    }
  };
  const trackStream = (stream, chunkSize, onProgress, onFinish) => {
    const iterator2 = readBytes(stream, chunkSize);
    let bytes = 0;
    let done;
    let _onFinish = (e) => {
      if (!done) {
        done = true;
        onFinish && onFinish(e);
      }
    };
    return new ReadableStream(
      {
        async pull(controller) {
          try {
            const { done: done2, value } = await iterator2.next();
            if (done2) {
              _onFinish();
              controller.close();
              return;
            }
            let len = value.byteLength;
            if (onProgress) {
              let loadedBytes = bytes += len;
              onProgress(loadedBytes);
            }
            controller.enqueue(new Uint8Array(value));
          } catch (err) {
            _onFinish(err);
            throw err;
          }
        },
        cancel(reason) {
          _onFinish(reason);
          return iterator2.return();
        }
      },
      {
        highWaterMark: 2
      }
    );
  };
  const isHexDigit = (charCode) => charCode >= 48 && charCode <= 57 || charCode >= 65 && charCode <= 70 || charCode >= 97 && charCode <= 102;
  const isPercentEncodedByte = (str, i, len) => i + 2 < len && isHexDigit(str.charCodeAt(i + 1)) && isHexDigit(str.charCodeAt(i + 2));
  function estimateDataURLDecodedBytes(url) {
    if (!url || typeof url !== "string") return 0;
    if (!url.startsWith("data:")) return 0;
    const comma = url.indexOf(",");
    if (comma < 0) return 0;
    const meta = url.slice(5, comma);
    const body = url.slice(comma + 1);
    const isBase64 = /;base64/i.test(meta);
    if (isBase64) {
      let effectiveLen = body.length;
      const len = body.length;
      for (let i = 0; i < len; i++) {
        if (body.charCodeAt(i) === 37 && i + 2 < len) {
          const a = body.charCodeAt(i + 1);
          const b = body.charCodeAt(i + 2);
          const isHex = isHexDigit(a) && isHexDigit(b);
          if (isHex) {
            effectiveLen -= 2;
            i += 2;
          }
        }
      }
      let pad = 0;
      let idx = len - 1;
      const tailIsPct3D = (j) => j >= 2 && body.charCodeAt(j - 2) === 37 && // '%'
      body.charCodeAt(j - 1) === 51 && // '3'
      (body.charCodeAt(j) === 68 || body.charCodeAt(j) === 100);
      if (idx >= 0) {
        if (body.charCodeAt(idx) === 61) {
          pad++;
          idx--;
        } else if (tailIsPct3D(idx)) {
          pad++;
          idx -= 3;
        }
      }
      if (pad === 1 && idx >= 0) {
        if (body.charCodeAt(idx) === 61) {
          pad++;
        } else if (tailIsPct3D(idx)) {
          pad++;
        }
      }
      const groups = Math.floor(effectiveLen / 4);
      const bytes2 = groups * 3 - (pad || 0);
      return bytes2 > 0 ? bytes2 : 0;
    }
    let bytes = 0;
    for (let i = 0, len = body.length; i < len; i++) {
      const c = body.charCodeAt(i);
      if (c === 37 && isPercentEncodedByte(body, i, len)) {
        bytes += 1;
        i += 2;
      } else if (c < 128) {
        bytes += 1;
      } else if (c < 2048) {
        bytes += 2;
      } else if (c >= 55296 && c <= 56319 && i + 1 < len) {
        const next = body.charCodeAt(i + 1);
        if (next >= 56320 && next <= 57343) {
          bytes += 4;
          i++;
        } else {
          bytes += 3;
        }
      } else {
        bytes += 3;
      }
    }
    return bytes;
  }
  const VERSION$1 = "1.18.1";
  const DEFAULT_CHUNK_SIZE = 64 * 1024;
  const { isFunction } = utils$1;
  const encodeUTF8 = (str) => encodeURIComponent(str).replace(
    /%([0-9A-F]{2})/gi,
    (_, hex) => String.fromCharCode(parseInt(hex, 16))
  );
  const decodeURIComponentSafe = (value) => {
    if (!utils$1.isString(value)) {
      return value;
    }
    try {
      return decodeURIComponent(value);
    } catch (error) {
      return value;
    }
  };
  const test = (fn, ...args) => {
    try {
      return !!fn(...args);
    } catch (e) {
      return false;
    }
  };
  const maybeWithAuthCredentials = (url) => {
    const protocolIndex = url.indexOf("://");
    let urlToCheck = url;
    if (protocolIndex !== -1) {
      urlToCheck = urlToCheck.slice(protocolIndex + 3);
    }
    return urlToCheck.includes("@") || urlToCheck.includes(":");
  };
  const factory = (env) => {
    const globalObject = utils$1.global !== void 0 && utils$1.global !== null ? utils$1.global : globalThis;
    const { ReadableStream: ReadableStream2, TextEncoder } = globalObject;
    env = utils$1.merge.call(
      {
        skipUndefined: true
      },
      {
        Request: globalObject.Request,
        Response: globalObject.Response
      },
      env
    );
    const { fetch: envFetch, Request, Response } = env;
    const isFetchSupported = envFetch ? isFunction(envFetch) : typeof fetch === "function";
    const isRequestSupported = isFunction(Request);
    const isResponseSupported = isFunction(Response);
    if (!isFetchSupported) {
      return false;
    }
    const isReadableStreamSupported = isFetchSupported && isFunction(ReadableStream2);
    const encodeText = isFetchSupported && (typeof TextEncoder === "function" ? /* @__PURE__ */ ((encoder) => (str) => encoder.encode(str))(new TextEncoder()) : async (str) => new Uint8Array(await new Request(str).arrayBuffer()));
    const supportsRequestStream = isRequestSupported && isReadableStreamSupported && test(() => {
      let duplexAccessed = false;
      const request = new Request(platform.origin, {
        body: new ReadableStream2(),
        method: "POST",
        get duplex() {
          duplexAccessed = true;
          return "half";
        }
      });
      const hasContentType = request.headers.has("Content-Type");
      if (request.body != null) {
        request.body.cancel();
      }
      return duplexAccessed && !hasContentType;
    });
    const supportsResponseStream = isResponseSupported && isReadableStreamSupported && test(() => utils$1.isReadableStream(new Response("").body));
    const resolvers = {
      stream: supportsResponseStream && ((res) => res.body)
    };
    isFetchSupported && (() => {
      ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((type) => {
        !resolvers[type] && (resolvers[type] = (res, config) => {
          let method = res && res[type];
          if (method) {
            return method.call(res);
          }
          throw new AxiosError$1(
            `Response type '${type}' is not supported`,
            AxiosError$1.ERR_NOT_SUPPORT,
            config
          );
        });
      });
    })();
    const getBodyLength = async (body) => {
      if (body == null) {
        return 0;
      }
      if (utils$1.isBlob(body)) {
        return body.size;
      }
      if (utils$1.isSpecCompliantForm(body)) {
        const _request = new Request(platform.origin, {
          method: "POST",
          body
        });
        return (await _request.arrayBuffer()).byteLength;
      }
      if (utils$1.isArrayBufferView(body) || utils$1.isArrayBuffer(body)) {
        return body.byteLength;
      }
      if (utils$1.isURLSearchParams(body)) {
        body = body + "";
      }
      if (utils$1.isString(body)) {
        return (await encodeText(body)).byteLength;
      }
    };
    const resolveBodyLength = async (headers, body) => {
      const length = utils$1.toFiniteNumber(headers.getContentLength());
      return length == null ? getBodyLength(body) : length;
    };
    return async (config) => {
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
        withCredentials = "same-origin",
        fetchOptions,
        maxContentLength,
        maxBodyLength
      } = resolveConfig(config);
      const hasMaxContentLength = utils$1.isNumber(maxContentLength) && maxContentLength > -1;
      const hasMaxBodyLength = utils$1.isNumber(maxBodyLength) && maxBodyLength > -1;
      const own2 = (key) => utils$1.hasOwnProp(config, key) ? config[key] : void 0;
      let _fetch = envFetch || fetch;
      responseType = responseType ? (responseType + "").toLowerCase() : "text";
      let composedSignal = composeSignals(
        [signal, cancelToken && cancelToken.toAbortSignal()],
        timeout
      );
      let request = null;
      const unsubscribe = composedSignal && composedSignal.unsubscribe && (() => {
        composedSignal.unsubscribe();
      });
      let requestContentLength;
      let pendingBodyError = null;
      const maxBodyLengthError = () => new AxiosError$1(
        "Request body larger than maxBodyLength limit",
        AxiosError$1.ERR_BAD_REQUEST,
        config,
        request
      );
      try {
        let auth = void 0;
        const configAuth = own2("auth");
        if (configAuth) {
          const username = utils$1.getSafeProp(configAuth, "username") || "";
          const password = utils$1.getSafeProp(configAuth, "password") || "";
          auth = {
            username,
            password
          };
        }
        if (maybeWithAuthCredentials(url)) {
          const parsedURL = new URL(url, platform.origin);
          if (!auth && (parsedURL.username || parsedURL.password)) {
            const urlUsername = decodeURIComponentSafe(parsedURL.username);
            const urlPassword = decodeURIComponentSafe(parsedURL.password);
            auth = {
              username: urlUsername,
              password: urlPassword
            };
          }
          if (parsedURL.username || parsedURL.password) {
            parsedURL.username = "";
            parsedURL.password = "";
            url = parsedURL.href;
          }
        }
        if (auth) {
          headers.delete("authorization");
          headers.set(
            "Authorization",
            "Basic " + btoa(encodeUTF8((auth.username || "") + ":" + (auth.password || "")))
          );
        }
        if (hasMaxContentLength && typeof url === "string" && url.startsWith("data:")) {
          const estimated = estimateDataURLDecodedBytes(url);
          if (estimated > maxContentLength) {
            throw new AxiosError$1(
              "maxContentLength size of " + maxContentLength + " exceeded",
              AxiosError$1.ERR_BAD_RESPONSE,
              config,
              request
            );
          }
        }
        if (hasMaxBodyLength && method !== "get" && method !== "head") {
          const outboundLength = await getBodyLength(data);
          if (typeof outboundLength === "number" && isFinite(outboundLength)) {
            requestContentLength = outboundLength;
            if (outboundLength > maxBodyLength) {
              throw maxBodyLengthError();
            }
          }
        }
        const mustEnforceStreamBody = hasMaxBodyLength && (utils$1.isReadableStream(data) || utils$1.isStream(data));
        const trackRequestStream = (stream, onProgress, flush) => trackStream(
          stream,
          DEFAULT_CHUNK_SIZE,
          (loadedBytes) => {
            if (hasMaxBodyLength && loadedBytes > maxBodyLength) {
              throw pendingBodyError = maxBodyLengthError();
            }
            onProgress && onProgress(loadedBytes);
          },
          flush
        );
        if (supportsRequestStream && method !== "get" && method !== "head" && (onUploadProgress || mustEnforceStreamBody)) {
          requestContentLength = requestContentLength == null ? await resolveBodyLength(headers, data) : requestContentLength;
          if (requestContentLength !== 0 || mustEnforceStreamBody) {
            let _request = new Request(url, {
              method: "POST",
              body: data,
              duplex: "half"
            });
            let contentTypeHeader;
            if (utils$1.isFormData(data) && (contentTypeHeader = _request.headers.get("content-type"))) {
              headers.setContentType(contentTypeHeader);
            }
            if (_request.body) {
              const [onProgress, flush] = onUploadProgress && progressEventDecorator(
                requestContentLength,
                progressEventReducer(asyncDecorator(onUploadProgress))
              ) || [];
              data = trackRequestStream(_request.body, onProgress, flush);
            }
          }
        } else if (mustEnforceStreamBody && !isRequestSupported && isReadableStreamSupported && method !== "get" && method !== "head") {
          data = trackRequestStream(data);
        } else if (mustEnforceStreamBody && isRequestSupported && !supportsRequestStream && method !== "get" && method !== "head") {
          throw new AxiosError$1(
            "Stream request bodies are not supported by the current fetch implementation",
            AxiosError$1.ERR_NOT_SUPPORT,
            config,
            request
          );
        }
        if (!utils$1.isString(withCredentials)) {
          withCredentials = withCredentials ? "include" : "omit";
        }
        const isCredentialsSupported = isRequestSupported && "credentials" in Request.prototype;
        if (utils$1.isFormData(data)) {
          const contentType = headers.getContentType();
          if (contentType && /^multipart\/form-data/i.test(contentType) && !/boundary=/i.test(contentType)) {
            headers.delete("content-type");
          }
        }
        headers.set("User-Agent", "axios/" + VERSION$1, false);
        const resolvedOptions = {
          ...fetchOptions,
          signal: composedSignal,
          method: method.toUpperCase(),
          headers: toByteStringHeaderObject(headers.normalize()),
          body: data,
          duplex: "half",
          credentials: isCredentialsSupported ? withCredentials : void 0
        };
        request = isRequestSupported && new Request(url, resolvedOptions);
        let response = await (isRequestSupported ? _fetch(request, fetchOptions) : _fetch(url, resolvedOptions));
        const responseHeaders = AxiosHeaders$1.from(response.headers);
        if (hasMaxContentLength) {
          const declaredLength = utils$1.toFiniteNumber(responseHeaders.getContentLength());
          if (declaredLength != null && declaredLength > maxContentLength) {
            throw new AxiosError$1(
              "maxContentLength size of " + maxContentLength + " exceeded",
              AxiosError$1.ERR_BAD_RESPONSE,
              config,
              request
            );
          }
        }
        const isStreamResponse = supportsResponseStream && (responseType === "stream" || responseType === "response");
        if (supportsResponseStream && response.body && (onDownloadProgress || hasMaxContentLength || isStreamResponse && unsubscribe)) {
          const options = {};
          ["status", "statusText", "headers"].forEach((prop) => {
            options[prop] = response[prop];
          });
          const responseContentLength = utils$1.toFiniteNumber(responseHeaders.getContentLength());
          const [onProgress, flush] = onDownloadProgress && progressEventDecorator(
            responseContentLength,
            progressEventReducer(asyncDecorator(onDownloadProgress), true)
          ) || [];
          let bytesRead = 0;
          const onChunkProgress = (loadedBytes) => {
            if (hasMaxContentLength) {
              bytesRead = loadedBytes;
              if (bytesRead > maxContentLength) {
                throw new AxiosError$1(
                  "maxContentLength size of " + maxContentLength + " exceeded",
                  AxiosError$1.ERR_BAD_RESPONSE,
                  config,
                  request
                );
              }
            }
            onProgress && onProgress(loadedBytes);
          };
          response = new Response(
            trackStream(response.body, DEFAULT_CHUNK_SIZE, onChunkProgress, () => {
              flush && flush();
              unsubscribe && unsubscribe();
            }),
            options
          );
        }
        responseType = responseType || "text";
        let responseData = await resolvers[utils$1.findKey(resolvers, responseType) || "text"](
          response,
          config
        );
        if (hasMaxContentLength && !supportsResponseStream && !isStreamResponse) {
          let materializedSize;
          if (responseData != null) {
            if (typeof responseData.byteLength === "number") {
              materializedSize = responseData.byteLength;
            } else if (typeof responseData.size === "number") {
              materializedSize = responseData.size;
            } else if (typeof responseData === "string") {
              materializedSize = typeof TextEncoder === "function" ? new TextEncoder().encode(responseData).byteLength : responseData.length;
            }
          }
          if (typeof materializedSize === "number" && materializedSize > maxContentLength) {
            throw new AxiosError$1(
              "maxContentLength size of " + maxContentLength + " exceeded",
              AxiosError$1.ERR_BAD_RESPONSE,
              config,
              request
            );
          }
        }
        !isStreamResponse && unsubscribe && unsubscribe();
        return await new Promise((resolve, reject) => {
          settle(resolve, reject, {
            data: responseData,
            headers: AxiosHeaders$1.from(response.headers),
            status: response.status,
            statusText: response.statusText,
            config,
            request
          });
        });
      } catch (err) {
        unsubscribe && unsubscribe();
        if (composedSignal && composedSignal.aborted && composedSignal.reason instanceof AxiosError$1) {
          const canceledError = composedSignal.reason;
          canceledError.config = config;
          request && (canceledError.request = request);
          if (err !== canceledError) {
            Object.defineProperty(canceledError, "cause", {
              __proto__: null,
              value: err,
              writable: true,
              enumerable: false,
              configurable: true
            });
          }
          throw canceledError;
        }
        if (pendingBodyError) {
          request && !pendingBodyError.request && (pendingBodyError.request = request);
          throw pendingBodyError;
        }
        if (err instanceof AxiosError$1) {
          request && !err.request && (err.request = request);
          throw err;
        }
        if (err && err.name === "TypeError" && /Load failed|fetch/i.test(err.message)) {
          const networkError = new AxiosError$1(
            "Network Error",
            AxiosError$1.ERR_NETWORK,
            config,
            request,
            err && err.response
          );
          Object.defineProperty(networkError, "cause", {
            __proto__: null,
            value: err.cause || err,
            writable: true,
            enumerable: false,
            configurable: true
          });
          throw networkError;
        }
        throw AxiosError$1.from(err, err && err.code, config, request, err && err.response);
      }
    };
  };
  const seedCache = /* @__PURE__ */ new Map();
  const getFetch = (config) => {
    let env = config && config.env || {};
    const { fetch: fetch2, Request, Response } = env;
    const seeds = [Request, Response, fetch2];
    let len = seeds.length, i = len, seed, target, map = seedCache;
    while (i--) {
      seed = seeds[i];
      target = map.get(seed);
      target === void 0 && map.set(seed, target = i ? /* @__PURE__ */ new Map() : factory(env));
      map = target;
    }
    return target;
  };
  getFetch();
  const knownAdapters = {
    http: httpAdapter,
    xhr: xhrAdapter,
    fetch: {
      get: getFetch
    }
  };
  utils$1.forEach(knownAdapters, (fn, value) => {
    if (fn) {
      try {
        Object.defineProperty(fn, "name", { __proto__: null, value });
      } catch (e) {
      }
      Object.defineProperty(fn, "adapterName", { __proto__: null, value });
    }
  });
  const renderReason = (reason) => `- ${reason}`;
  const isResolvedHandle = (adapter) => utils$1.isFunction(adapter) || adapter === null || adapter === false;
  function getAdapter$1(adapters2, config) {
    adapters2 = utils$1.isArray(adapters2) ? adapters2 : [adapters2];
    const { length } = adapters2;
    let nameOrAdapter;
    let adapter;
    const rejectedReasons = {};
    for (let i = 0; i < length; i++) {
      nameOrAdapter = adapters2[i];
      let id;
      adapter = nameOrAdapter;
      if (!isResolvedHandle(nameOrAdapter)) {
        adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];
        if (adapter === void 0) {
          throw new AxiosError$1(`Unknown adapter '${id}'`);
        }
      }
      if (adapter && (utils$1.isFunction(adapter) || (adapter = adapter.get(config)))) {
        break;
      }
      rejectedReasons[id || "#" + i] = adapter;
    }
    if (!adapter) {
      const reasons = Object.entries(rejectedReasons).map(
        ([id, state]) => `adapter ${id} ` + (state === false ? "is not supported by the environment" : "is not available in the build")
      );
      let s = length ? reasons.length > 1 ? "since :\n" + reasons.map(renderReason).join("\n") : " " + renderReason(reasons[0]) : "as no adapter specified";
      throw new AxiosError$1(
        `There is no suitable adapter to dispatch the request ` + s,
        AxiosError$1.ERR_NOT_SUPPORT
      );
    }
    return adapter;
  }
  var adapters = {
    /**
     * Resolve an adapter from a list of adapter names or functions.
     * @type {Function}
     */
    getAdapter: getAdapter$1,
    /**
     * Exposes all known adapters
     * @type {Object<string, Function|Object>}
     */
    adapters: knownAdapters
  };
  function throwIfCancellationRequested(config) {
    if (config.cancelToken) {
      config.cancelToken.throwIfRequested();
    }
    if (config.signal && config.signal.aborted) {
      throw new CanceledError$1(null, config);
    }
  }
  function dispatchRequest(config) {
    throwIfCancellationRequested(config);
    config.headers = AxiosHeaders$1.from(config.headers);
    config.data = transformData.call(config, config.transformRequest);
    if (["post", "put", "patch"].indexOf(config.method) !== -1) {
      config.headers.setContentType("application/x-www-form-urlencoded", false);
    }
    const adapter = adapters.getAdapter(config.adapter || defaults.adapter, config);
    return adapter(config).then(
      function onAdapterResolution(response) {
        throwIfCancellationRequested(config);
        config.response = response;
        try {
          response.data = transformData.call(config, config.transformResponse, response);
        } finally {
          delete config.response;
        }
        response.headers = AxiosHeaders$1.from(response.headers);
        return response;
      },
      function onAdapterRejection(reason) {
        if (!isCancel$1(reason)) {
          throwIfCancellationRequested(config);
          if (reason && reason.response) {
            config.response = reason.response;
            try {
              reason.response.data = transformData.call(
                config,
                config.transformResponse,
                reason.response
              );
            } finally {
              delete config.response;
            }
            reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
          }
        }
        return Promise.reject(reason);
      }
    );
  }
  const validators$1 = {};
  ["object", "boolean", "number", "function", "string", "symbol"].forEach((type, i) => {
    validators$1[type] = function validator2(thing) {
      return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
    };
  });
  const deprecatedWarnings = {};
  validators$1.transitional = function transitional(validator2, version, message) {
    function formatMessage(opt, desc) {
      return "[Axios v" + VERSION$1 + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
    }
    return (value, opt, opts) => {
      if (validator2 === false) {
        throw new AxiosError$1(
          formatMessage(opt, " has been removed" + (version ? " in " + version : "")),
          AxiosError$1.ERR_DEPRECATED
        );
      }
      if (version && !deprecatedWarnings[opt]) {
        deprecatedWarnings[opt] = true;
        console.warn(
          formatMessage(
            opt,
            " has been deprecated since v" + version + " and will be removed in the near future"
          )
        );
      }
      return validator2 ? validator2(value, opt, opts) : true;
    };
  };
  validators$1.spelling = function spelling(correctSpelling) {
    return (value, opt) => {
      console.warn(`${opt} is likely a misspelling of ${correctSpelling}`);
      return true;
    };
  };
  function assertOptions(options, schema, allowUnknown) {
    if (typeof options !== "object" || options === null) {
      throw new AxiosError$1("options must be an object", AxiosError$1.ERR_BAD_OPTION_VALUE);
    }
    const keys = Object.keys(options);
    let i = keys.length;
    while (i-- > 0) {
      const opt = keys[i];
      const validator2 = Object.prototype.hasOwnProperty.call(schema, opt) ? schema[opt] : void 0;
      if (validator2) {
        const value = options[opt];
        const result = value === void 0 || validator2(value, opt, options);
        if (result !== true) {
          throw new AxiosError$1(
            "option " + opt + " must be " + result,
            AxiosError$1.ERR_BAD_OPTION_VALUE
          );
        }
        continue;
      }
      if (allowUnknown !== true) {
        throw new AxiosError$1("Unknown option " + opt, AxiosError$1.ERR_BAD_OPTION);
      }
    }
  }
  var validator = {
    assertOptions,
    validators: validators$1
  };
  const validators = validator.validators;
  let Axios$1 = class Axios {
    constructor(instanceConfig) {
      this.defaults = instanceConfig || {};
      this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
      };
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
        return await this._request(configOrUrl, config);
      } catch (err) {
        if (err instanceof Error) {
          let dummy = {};
          Error.captureStackTrace ? Error.captureStackTrace(dummy) : dummy = new Error();
          const stack = (() => {
            if (!dummy.stack) {
              return "";
            }
            const firstNewlineIndex = dummy.stack.indexOf("\n");
            return firstNewlineIndex === -1 ? "" : dummy.stack.slice(firstNewlineIndex + 1);
          })();
          try {
            if (!err.stack) {
              err.stack = stack;
            } else if (stack) {
              const firstNewlineIndex = stack.indexOf("\n");
              const secondNewlineIndex = firstNewlineIndex === -1 ? -1 : stack.indexOf("\n", firstNewlineIndex + 1);
              const stackWithoutTwoTopLines = secondNewlineIndex === -1 ? "" : stack.slice(secondNewlineIndex + 1);
              if (!String(err.stack).endsWith(stackWithoutTwoTopLines)) {
                err.stack += "\n" + stack;
              }
            }
          } catch (e) {
          }
        }
        throw err;
      }
    }
    _request(configOrUrl, config) {
      if (typeof configOrUrl === "string") {
        config = config || {};
        config.url = configOrUrl;
      } else {
        config = configOrUrl || {};
      }
      config = mergeConfig$1(this.defaults, config);
      const { transitional, paramsSerializer, headers } = config;
      if (transitional !== void 0) {
        validator.assertOptions(
          transitional,
          {
            silentJSONParsing: validators.transitional(validators.boolean),
            forcedJSONParsing: validators.transitional(validators.boolean),
            clarifyTimeoutError: validators.transitional(validators.boolean),
            legacyInterceptorReqResOrdering: validators.transitional(validators.boolean),
            advertiseZstdAcceptEncoding: validators.transitional(validators.boolean),
            validateStatusUndefinedResolves: validators.transitional(validators.boolean)
          },
          false
        );
      }
      if (paramsSerializer != null) {
        if (utils$1.isFunction(paramsSerializer)) {
          config.paramsSerializer = {
            serialize: paramsSerializer
          };
        } else {
          validator.assertOptions(
            paramsSerializer,
            {
              encode: validators.function,
              serialize: validators.function
            },
            true
          );
        }
      }
      if (config.allowAbsoluteUrls !== void 0) ;
      else if (this.defaults.allowAbsoluteUrls !== void 0) {
        config.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls;
      } else {
        config.allowAbsoluteUrls = true;
      }
      validator.assertOptions(
        config,
        {
          baseUrl: validators.spelling("baseURL"),
          withXsrfToken: validators.spelling("withXSRFToken")
        },
        true
      );
      config.method = (config.method || this.defaults.method || "get").toLowerCase();
      let contextHeaders = headers && utils$1.merge(headers.common, headers[config.method]);
      headers && utils$1.forEach(["delete", "get", "head", "post", "put", "patch", "query", "common"], (method) => {
        delete headers[method];
      });
      config.headers = AxiosHeaders$1.concat(contextHeaders, headers);
      const requestInterceptorChain = [];
      let synchronousRequestInterceptors = true;
      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
          return;
        }
        synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
        const transitional2 = config.transitional || transitionalDefaults;
        const legacyInterceptorReqResOrdering = transitional2 && transitional2.legacyInterceptorReqResOrdering;
        if (legacyInterceptorReqResOrdering) {
          requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
        } else {
          requestInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
        }
      });
      const responseInterceptorChain = [];
      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
      });
      let promise;
      let i = 0;
      let len;
      if (!synchronousRequestInterceptors) {
        const chain = [dispatchRequest.bind(this), void 0];
        chain.unshift(...requestInterceptorChain);
        chain.push(...responseInterceptorChain);
        len = chain.length;
        promise = Promise.resolve(config);
        while (i < len) {
          promise = promise.then(chain[i++], chain[i++]);
        }
        return promise;
      }
      len = requestInterceptorChain.length;
      let newConfig = config;
      while (i < len) {
        const onFulfilled = requestInterceptorChain[i++];
        const onRejected = requestInterceptorChain[i++];
        try {
          newConfig = onFulfilled(newConfig);
        } catch (error) {
          onRejected.call(this, error);
          break;
        }
      }
      try {
        promise = dispatchRequest.call(this, newConfig);
      } catch (error) {
        return Promise.reject(error);
      }
      i = 0;
      len = responseInterceptorChain.length;
      while (i < len) {
        promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
      }
      return promise;
    }
    getUri(config) {
      config = mergeConfig$1(this.defaults, config);
      const fullPath = buildFullPath(config.baseURL, config.url, config.allowAbsoluteUrls, config);
      return buildURL(fullPath, config.params, config.paramsSerializer);
    }
  };
  utils$1.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
    Axios$1.prototype[method] = function(url, config) {
      return this.request(
        mergeConfig$1(config || {}, {
          method,
          url,
          data: config && utils$1.hasOwnProp(config, "data") ? config.data : void 0
        })
      );
    };
  });
  utils$1.forEach(["post", "put", "patch", "query"], function forEachMethodWithData(method) {
    function generateHTTPMethod(isForm) {
      return function httpMethod(url, data, config) {
        return this.request(
          mergeConfig$1(config || {}, {
            method,
            headers: isForm ? {
              "Content-Type": "multipart/form-data"
            } : {},
            url,
            data
          })
        );
      };
    }
    Axios$1.prototype[method] = generateHTTPMethod();
    if (method !== "query") {
      Axios$1.prototype[method + "Form"] = generateHTTPMethod(true);
    }
  });
  let CancelToken$1 = class CancelToken2 {
    constructor(executor) {
      if (typeof executor !== "function") {
        throw new TypeError("executor must be a function.");
      }
      let resolvePromise;
      this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
      });
      const token = this;
      this.promise.then((cancel) => {
        if (!token._listeners) return;
        let i = token._listeners.length;
        while (i-- > 0) {
          token._listeners[i](cancel);
        }
        token._listeners = null;
      });
      this.promise.then = (onfulfilled) => {
        let _resolve;
        const promise = new Promise((resolve) => {
          token.subscribe(resolve);
          _resolve = resolve;
        }).then(onfulfilled);
        promise.cancel = function reject() {
          token.unsubscribe(_resolve);
        };
        return promise;
      };
      executor(function cancel(message, config, request) {
        if (token.reason) {
          return;
        }
        token.reason = new CanceledError$1(message, config, request);
        resolvePromise(token.reason);
      });
    }
    /**
     * Throws a `CanceledError` if cancellation has been requested.
     */
    throwIfRequested() {
      if (this.reason) {
        throw this.reason;
      }
    }
    /**
     * Subscribe to the cancel signal
     */
    subscribe(listener) {
      if (this.reason) {
        listener(this.reason);
        return;
      }
      if (this._listeners) {
        this._listeners.push(listener);
      } else {
        this._listeners = [listener];
      }
    }
    /**
     * Unsubscribe from the cancel signal
     */
    unsubscribe(listener) {
      if (!this._listeners) {
        return;
      }
      const index = this._listeners.indexOf(listener);
      if (index !== -1) {
        this._listeners.splice(index, 1);
      }
    }
    toAbortSignal() {
      const controller = new AbortController();
      const abort = (err) => {
        controller.abort(err);
      };
      this.subscribe(abort);
      controller.signal.unsubscribe = () => this.unsubscribe(abort);
      return controller.signal;
    }
    /**
     * Returns an object that contains a new `CancelToken` and a function that, when called,
     * cancels the `CancelToken`.
     */
    static source() {
      let cancel;
      const token = new CancelToken2(function executor(c) {
        cancel = c;
      });
      return {
        token,
        cancel
      };
    }
  };
  function spread$1(callback) {
    return function wrap(arr) {
      return callback.apply(null, arr);
    };
  }
  function isAxiosError$1(payload) {
    return utils$1.isObject(payload) && payload.isAxiosError === true;
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
    WebServerIsDown: 521,
    ConnectionTimedOut: 522,
    OriginIsUnreachable: 523,
    TimeoutOccurred: 524,
    SslHandshakeFailed: 525,
    InvalidSslCertificate: 526
  };
  Object.entries(HttpStatusCode$1).forEach(([key, value]) => {
    HttpStatusCode$1[value] = key;
  });
  function createInstance(defaultConfig) {
    const context = new Axios$1(defaultConfig);
    const instance = bind(Axios$1.prototype.request, context);
    utils$1.extend(instance, Axios$1.prototype, context, { allOwnKeys: true });
    utils$1.extend(instance, context, null, { allOwnKeys: true });
    instance.create = function create2(instanceConfig) {
      return createInstance(mergeConfig$1(defaultConfig, instanceConfig));
    };
    return instance;
  }
  const axios = createInstance(defaults);
  axios.Axios = Axios$1;
  axios.CanceledError = CanceledError$1;
  axios.CancelToken = CancelToken$1;
  axios.isCancel = isCancel$1;
  axios.VERSION = VERSION$1;
  axios.toFormData = toFormData$1;
  axios.AxiosError = AxiosError$1;
  axios.Cancel = axios.CanceledError;
  axios.all = function all2(promises) {
    return Promise.all(promises);
  };
  axios.spread = spread$1;
  axios.isAxiosError = isAxiosError$1;
  axios.mergeConfig = mergeConfig$1;
  axios.AxiosHeaders = AxiosHeaders$1;
  axios.formToJSON = (thing) => formDataToJSON(utils$1.isHTMLForm(thing) ? new FormData(thing) : thing);
  axios.getAdapter = adapters.getAdapter;
  axios.HttpStatusCode = HttpStatusCode$1;
  axios.default = axios;
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
    create
  } = axios;
  const MAX_ERRORS = 5;
  const SLEEP_TIMEOUT_DEFAULT = 3e4;
  let lastUpdated = 0;
  let http;
  let consecutiveErrors = 0;
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  self.onmessage = async (props) => {
    const {
      updateType,
      inquiryId,
      interval = SLEEP_TIMEOUT_DEFAULT,
      baseUrl,
      token,
      watcherId,
      lastUpdate = lastUpdated
    } = props.data;
    lastUpdated = lastUpdate;
    const sendMessage = (msg) => self.postMessage(msg);
    sendMessage({
      type: "status",
      status: "starting",
      mode: updateType,
      interval,
      message: "[Worker] Received new parameters."
    });
    if (!http) {
      http = axios.create({
        baseURL: baseUrl,
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Nc-Agora-Client-Id": watcherId
        },
        validateStatus: (status) => [200, 304].includes(status)
      });
    }
    if (updateType === "noInquirying") {
      sendMessage({
        type: "info",
        status: "stopped",
        mode: updateType,
        interval,
        message: "[Worker] noInquirying: exiting."
      });
      self.close();
      return;
    }
    const run = async () => {
      try {
        const endPoint = token ? `s/${token}/watch` : `inquiry/${inquiryId}/watch`;
        const response = await http.get(endPoint, { params: { offset: lastUpdated } });
        consecutiveErrors = 0;
        if (response.status === 200 && response.data.updates?.length) {
          lastUpdated = response.data.updates[response.data.updates.length - 1].updated;
          sendMessage({
            type: "update",
            status: "running",
            mode: updateType,
            interval,
            message: "[Worker] Got updates",
            updates: response.data.updates,
            lastUpdate: lastUpdated
          });
        } else if (response.status === 304) {
          sendMessage({
            type: "info",
            status: "running",
            mode: updateType,
            interval,
            message: "[Worker] 304 – no changes",
            lastUpdate: lastUpdated
          });
        }
      } catch {
        consecutiveErrors += 1;
        sendMessage({
          type: "warning",
          status: "error",
          mode: updateType,
          interval,
          message: `[Worker] Request failed (${consecutiveErrors}/${MAX_ERRORS})`
        });
        if (consecutiveErrors >= MAX_ERRORS) {
          sendMessage({
            type: "fatal",
            status: "error",
            mode: updateType,
            interval,
            message: `[Worker] Stopping after ${MAX_ERRORS} consecutive errors`
          });
          self.close();
        }
        await sleep(interval);
      }
    };
    if (updateType === "periodicInquirying") {
      sendMessage({
        type: "info",
        status: "starting",
        mode: updateType,
        interval,
        message: "[Worker] Started periodic inquirying."
      });
      while (true) {
        await run();
        sendMessage({ type: "status", status: "idle", mode: updateType, interval });
        await sleep(interval);
      }
    }
    if (updateType === "longInquirying") {
      sendMessage({
        type: "info",
        status: "starting",
        mode: updateType,
        interval,
        message: "[Worker] Started long inquirying."
      });
      while (true) await run();
    }
  };
})();
//# sourceMappingURL=inquiryWatcher.worker-CqLFexTQ.js.map
