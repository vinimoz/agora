const Ma = "agora", ka = "1.0.0rc1";
import { W as zn, X as Gn, Y as Kn } from "./NcEmptyContent-q-geAf0w-C5KNLRzH.chunk.mjs";
import { c as Re } from "./NcRichText-G8kzsdwx-8HncRjZ1.chunk.mjs";
const Ct = (function(e, t, i) {
  const a = zn(i);
  if (!e || !e.type || !e.children) throw new Error("Expected parent node");
  if (typeof t == "number") {
    if (t < 0 || t === Number.POSITIVE_INFINITY) throw new Error("Expected positive finite number as index");
  } else if (t = e.children.indexOf(t), t < 0) throw new Error("Expected child node or index");
  for (; ++t < e.children.length; ) if (a(e.children[t], t, e)) return e.children[t];
}), xt = /\n/g, Dt = /[\t ]+/g, dt = Re("br"), Lt = Re(Qn), Hn = Re("p"), Bt = Re("tr"), Wn = Re(["datalist", "head", "noembed", "noframes", "noscript", "rp", "script", "style", "template", "title", Xn, Jn]), Pt = Re(["address", "article", "aside", "blockquote", "body", "caption", "center", "dd", "dialog", "dir", "dl", "dt", "div", "figure", "figcaption", "footer", "form,", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "html", "legend", "li", "listing", "main", "menu", "nav", "ol", "p", "plaintext", "pre", "section", "ul", "xmp"]);
function qn(e, t) {
  const i = t || {}, a = "children" in e ? e.children : [], r = Pt(e), g = $t(e, { whitespace: i.whitespace || "normal" }), s = [];
  (e.type === "text" || e.type === "comment") && s.push(...Ft(e, { breakBefore: true, breakAfter: true }));
  let o = -1;
  for (; ++o < a.length; ) s.push(...Ut(a[o], e, { whitespace: g, breakBefore: o ? void 0 : r, breakAfter: o < a.length - 1 ? dt(a[o + 1]) : r }));
  const d = [];
  let c;
  for (o = -1; ++o < s.length; ) {
    const u = s[o];
    typeof u == "number" ? c !== void 0 && u > c && (c = u) : u && (c !== void 0 && c > -1 && d.push(`
`.repeat(c) || " "), c = -1, d.push(u));
  }
  return d.join("");
}
function Ut(e, t, i) {
  return e.type === "element" ? Yn(e, t, i) : e.type === "text" ? i.whitespace === "normal" ? Ft(e, i) : Zn(e) : [];
}
function Yn(e, t, i) {
  const a = $t(e, i), r = e.children || [];
  let g = -1, s = [];
  if (Wn(e)) return s;
  let o, d;
  for (dt(e) || Bt(e) && Ct(t, e, Bt) ? d = `
` : Hn(e) ? (o = 2, d = 2) : Pt(e) && (o = 1, d = 1); ++g < r.length; ) s = s.concat(Ut(r[g], e, { whitespace: a, breakBefore: g ? void 0 : o, breakAfter: g < r.length - 1 ? dt(r[g + 1]) : d }));
  return Lt(e) && Ct(t, e, Lt) && s.push("	"), o && s.unshift(o), d && s.push(d), s;
}
function Ft(e, t) {
  const i = String(e.value), a = [], r = [];
  let g = 0;
  for (; g <= i.length; ) {
    xt.lastIndex = g;
    const d = xt.exec(i), c = d && "index" in d ? d.index : i.length;
    a.push(Vn(i.slice(g, c).replace(/[\u061C\u200E\u200F\u202A-\u202E\u2066-\u2069]/g, ""), g === 0 ? t.breakBefore : true, c === i.length ? t.breakAfter : true)), g = c + 1;
  }
  let s = -1, o;
  for (; ++s < a.length; ) a[s].charCodeAt(a[s].length - 1) === 8203 || s < a.length - 1 && a[s + 1].charCodeAt(0) === 8203 ? (r.push(a[s]), o = void 0) : a[s] ? (typeof o == "number" && r.push(o), r.push(a[s]), o = 0) : (s === 0 || s === a.length - 1) && r.push(0);
  return r;
}
function Zn(e) {
  return [String(e.value)];
}
function Vn(e, t, i) {
  const a = [];
  let r = 0, g;
  for (; r < e.length; ) {
    Dt.lastIndex = r;
    const s = Dt.exec(e);
    g = s ? s.index : e.length, !r && !g && s && !t && a.push(""), r !== g && a.push(e.slice(r, g)), r = s ? g + s[0].length : g;
  }
  return r !== g && !i && a.push(""), a.join(" ");
}
function $t(e, t) {
  if (e.type === "element") {
    const i = e.properties || {};
    switch (e.tagName) {
      case "listing":
      case "plaintext":
      case "xmp":
        return "pre";
      case "nobr":
        return "nowrap";
      case "pre":
        return i.wrap ? "pre-wrap" : "pre";
      case "td":
      case "th":
        return i.noWrap ? "nowrap" : t.whitespace;
      case "textarea":
        return "pre-wrap";
    }
  }
  return t.whitespace;
}
function Xn(e) {
  return !!(e.properties || {}).hidden;
}
function Qn(e) {
  return e.tagName === "td" || e.tagName === "th";
}
function Jn(e) {
  return e.tagName === "dialog" && !(e.properties || {}).open;
}
function jn(e) {
  const t = e.regex, i = e.COMMENT("//", "$", { contains: [{ begin: /\\\n/ }] }), a = "decltype\\(auto\\)", r = "[a-zA-Z_]\\w*::", s = "(?!struct)(" + a + "|" + t.optional(r) + "[a-zA-Z_]\\w*" + t.optional("<[^<>]+>") + ")", o = { className: "type", begin: "\\b[a-z\\d_]*_t\\b" }, c = { className: "string", variants: [{ begin: '(u8?|U|L)?"', end: '"', illegal: "\\n", contains: [e.BACKSLASH_ESCAPE] }, { begin: "(u8?|U|L)?'(\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)|.)", end: "'", illegal: "." }, e.END_SAME_AS_BEGIN({ begin: /(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/, end: /\)([^()\\ ]{0,16})"/ })] }, u = { className: "number", variants: [{ begin: "[+-]?(?:(?:[0-9](?:'?[0-9])*\\.(?:[0-9](?:'?[0-9])*)?|\\.[0-9](?:'?[0-9])*)(?:[Ee][+-]?[0-9](?:'?[0-9])*)?|[0-9](?:'?[0-9])*[Ee][+-]?[0-9](?:'?[0-9])*|0[Xx](?:[0-9A-Fa-f](?:'?[0-9A-Fa-f])*(?:\\.(?:[0-9A-Fa-f](?:'?[0-9A-Fa-f])*)?)?|\\.[0-9A-Fa-f](?:'?[0-9A-Fa-f])*)[Pp][+-]?[0-9](?:'?[0-9])*)(?:[Ff](?:16|32|64|128)?|(BF|bf)16|[Ll]|)" }, { begin: "[+-]?\\b(?:0[Bb][01](?:'?[01])*|0[Xx][0-9A-Fa-f](?:'?[0-9A-Fa-f])*|0(?:'?[0-7])*|[1-9](?:'?[0-9])*)(?:[Uu](?:LL?|ll?)|[Uu][Zz]?|(?:LL?|ll?)[Uu]?|[Zz][Uu]|)" }], relevance: 0 }, m = { className: "meta", begin: /#\s*[a-z]+\b/, end: /$/, keywords: { keyword: "if else elif endif define undef warning error line pragma _Pragma ifdef ifndef include" }, contains: [{ begin: /\\\n/, relevance: 0 }, e.inherit(c, { className: "string" }), { className: "string", begin: /<.*?>/ }, i, e.C_BLOCK_COMMENT_MODE] }, b = { className: "title", begin: t.optional(r) + e.IDENT_RE, relevance: 0 }, f = t.optional(r) + e.IDENT_RE + "\\s*\\(", S = ["alignas", "alignof", "and", "and_eq", "asm", "atomic_cancel", "atomic_commit", "atomic_noexcept", "auto", "bitand", "bitor", "break", "case", "catch", "class", "co_await", "co_return", "co_yield", "compl", "concept", "const_cast|10", "consteval", "constexpr", "constinit", "continue", "decltype", "default", "delete", "do", "dynamic_cast|10", "else", "enum", "explicit", "export", "extern", "false", "final", "for", "friend", "goto", "if", "import", "inline", "module", "mutable", "namespace", "new", "noexcept", "not", "not_eq", "nullptr", "operator", "or", "or_eq", "override", "private", "protected", "public", "reflexpr", "register", "reinterpret_cast|10", "requires", "return", "sizeof", "static_assert", "static_cast|10", "struct", "switch", "synchronized", "template", "this", "thread_local", "throw", "transaction_safe", "transaction_safe_dynamic", "true", "try", "typedef", "typeid", "typename", "union", "using", "virtual", "volatile", "while", "xor", "xor_eq"], E = ["bool", "char", "char16_t", "char32_t", "char8_t", "double", "float", "int", "long", "short", "void", "wchar_t", "unsigned", "signed", "const", "static"], y = ["any", "auto_ptr", "barrier", "binary_semaphore", "bitset", "complex", "condition_variable", "condition_variable_any", "counting_semaphore", "deque", "false_type", "flat_map", "flat_set", "future", "imaginary", "initializer_list", "istringstream", "jthread", "latch", "lock_guard", "multimap", "multiset", "mutex", "optional", "ostringstream", "packaged_task", "pair", "promise", "priority_queue", "queue", "recursive_mutex", "recursive_timed_mutex", "scoped_lock", "set", "shared_future", "shared_lock", "shared_mutex", "shared_timed_mutex", "shared_ptr", "stack", "string_view", "stringstream", "timed_mutex", "thread", "true_type", "tuple", "unique_lock", "unique_ptr", "unordered_map", "unordered_multimap", "unordered_multiset", "unordered_set", "variant", "vector", "weak_ptr", "wstring", "wstring_view"], w = ["abort", "abs", "acos", "apply", "as_const", "asin", "atan", "atan2", "calloc", "ceil", "cerr", "cin", "clog", "cos", "cosh", "cout", "declval", "endl", "exchange", "exit", "exp", "fabs", "floor", "fmod", "forward", "fprintf", "fputs", "free", "frexp", "fscanf", "future", "invoke", "isalnum", "isalpha", "iscntrl", "isdigit", "isgraph", "islower", "isprint", "ispunct", "isspace", "isupper", "isxdigit", "labs", "launder", "ldexp", "log", "log10", "make_pair", "make_shared", "make_shared_for_overwrite", "make_tuple", "make_unique", "malloc", "memchr", "memcmp", "memcpy", "memset", "modf", "move", "pow", "printf", "putchar", "puts", "realloc", "scanf", "sin", "sinh", "snprintf", "sprintf", "sqrt", "sscanf", "std", "stderr", "stdin", "stdout", "strcat", "strchr", "strcmp", "strcpy", "strcspn", "strlen", "strncat", "strncmp", "strncpy", "strpbrk", "strrchr", "strspn", "strstr", "swap", "tan", "tanh", "terminate", "to_underlying", "tolower", "toupper", "vfprintf", "visit", "vprintf", "vsprintf"], M = { type: E, keyword: S, literal: ["NULL", "false", "nullopt", "nullptr", "true"], built_in: ["_Pragma"], _type_hints: y }, L = { className: "function.dispatch", relevance: 0, keywords: { _hint: w }, begin: t.concat(/\b/, /(?!decltype)/, /(?!if)/, /(?!for)/, /(?!switch)/, /(?!while)/, e.IDENT_RE, t.lookahead(/(<[^<>]+>|)\s*\(/)) }, C = [L, m, o, i, e.C_BLOCK_COMMENT_MODE, u, c], W = { variants: [{ begin: /=/, end: /;/ }, { begin: /\(/, end: /\)/ }, { beginKeywords: "new throw return else", end: /;/ }], keywords: M, contains: C.concat([{ begin: /\(/, end: /\)/, keywords: M, contains: C.concat(["self"]), relevance: 0 }]), relevance: 0 }, z = { className: "function", begin: "(" + s + "[\\*&\\s]+)+" + f, returnBegin: true, end: /[{;=]/, excludeEnd: true, keywords: M, illegal: /[^\w\s\*&:<>.]/, contains: [{ begin: a, keywords: M, relevance: 0 }, { begin: f, returnBegin: true, contains: [b], relevance: 0 }, { begin: /::/, relevance: 0 }, { begin: /:/, endsWithParent: true, contains: [c, u] }, { relevance: 0, match: /,/ }, { className: "params", begin: /\(/, end: /\)/, keywords: M, relevance: 0, contains: [i, e.C_BLOCK_COMMENT_MODE, c, u, o, { begin: /\(/, end: /\)/, keywords: M, relevance: 0, contains: ["self", i, e.C_BLOCK_COMMENT_MODE, c, u, o] }] }, o, i, e.C_BLOCK_COMMENT_MODE, m] };
  return { name: "C++", aliases: ["cc", "c++", "h++", "hpp", "hh", "hxx", "cxx"], keywords: M, illegal: "</", classNameAliases: { "function.dispatch": "built_in" }, contains: [].concat(W, z, L, C, [m, { begin: "\\b(deque|list|queue|priority_queue|pair|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array|tuple|optional|variant|function|flat_map|flat_set)\\s*<(?!<)", end: ">", keywords: M, contains: ["self", o] }, { begin: e.IDENT_RE + "::", keywords: M }, { match: [/\b(?:enum(?:\s+(?:class|struct))?|class|struct|union)/, /\s+/, /\w+/], className: { 1: "keyword", 3: "title.class" } }]) };
}
function ei(e) {
  const t = { type: ["boolean", "byte", "word", "String"], built_in: ["KeyboardController", "MouseController", "SoftwareSerial", "EthernetServer", "EthernetClient", "LiquidCrystal", "RobotControl", "GSMVoiceCall", "EthernetUDP", "EsploraTFT", "HttpClient", "RobotMotor", "WiFiClient", "GSMScanner", "FileSystem", "Scheduler", "GSMServer", "YunClient", "YunServer", "IPAddress", "GSMClient", "GSMModem", "Keyboard", "Ethernet", "Console", "GSMBand", "Esplora", "Stepper", "Process", "WiFiUDP", "GSM_SMS", "Mailbox", "USBHost", "Firmata", "PImage", "Client", "Server", "GSMPIN", "FileIO", "Bridge", "Serial", "EEPROM", "Stream", "Mouse", "Audio", "Servo", "File", "Task", "GPRS", "WiFi", "Wire", "TFT", "GSM", "SPI", "SD"], _hints: ["setup", "loop", "runShellCommandAsynchronously", "analogWriteResolution", "retrieveCallingNumber", "printFirmwareVersion", "analogReadResolution", "sendDigitalPortPair", "noListenOnLocalhost", "readJoystickButton", "setFirmwareVersion", "readJoystickSwitch", "scrollDisplayRight", "getVoiceCallStatus", "scrollDisplayLeft", "writeMicroseconds", "delayMicroseconds", "beginTransmission", "getSignalStrength", "runAsynchronously", "getAsynchronously", "listenOnLocalhost", "getCurrentCarrier", "readAccelerometer", "messageAvailable", "sendDigitalPorts", "lineFollowConfig", "countryNameWrite", "runShellCommand", "readStringUntil", "rewindDirectory", "readTemperature", "setClockDivider", "readLightSensor", "endTransmission", "analogReference", "detachInterrupt", "countryNameRead", "attachInterrupt", "encryptionType", "readBytesUntil", "robotNameWrite", "readMicrophone", "robotNameRead", "cityNameWrite", "userNameWrite", "readJoystickY", "readJoystickX", "mouseReleased", "openNextFile", "scanNetworks", "noInterrupts", "digitalWrite", "beginSpeaker", "mousePressed", "isActionDone", "mouseDragged", "displayLogos", "noAutoscroll", "addParameter", "remoteNumber", "getModifiers", "keyboardRead", "userNameRead", "waitContinue", "processInput", "parseCommand", "printVersion", "readNetworks", "writeMessage", "blinkVersion", "cityNameRead", "readMessage", "setDataMode", "parsePacket", "isListening", "setBitOrder", "beginPacket", "isDirectory", "motorsWrite", "drawCompass", "digitalRead", "clearScreen", "serialEvent", "rightToLeft", "setTextSize", "leftToRight", "requestFrom", "keyReleased", "compassRead", "analogWrite", "interrupts", "WiFiServer", "disconnect", "playMelody", "parseFloat", "autoscroll", "getPINUsed", "setPINUsed", "setTimeout", "sendAnalog", "readSlider", "analogRead", "beginWrite", "createChar", "motorsStop", "keyPressed", "tempoWrite", "readButton", "subnetMask", "debugPrint", "macAddress", "writeGreen", "randomSeed", "attachGPRS", "readString", "sendString", "remotePort", "releaseAll", "mouseMoved", "background", "getXChange", "getYChange", "answerCall", "getResult", "voiceCall", "endPacket", "constrain", "getSocket", "writeJSON", "getButton", "available", "connected", "findUntil", "readBytes", "exitValue", "readGreen", "writeBlue", "startLoop", "IPAddress", "isPressed", "sendSysex", "pauseMode", "gatewayIP", "setCursor", "getOemKey", "tuneWrite", "noDisplay", "loadImage", "switchPIN", "onRequest", "onReceive", "changePIN", "playFile", "noBuffer", "parseInt", "overflow", "checkPIN", "knobRead", "beginTFT", "bitClear", "updateIR", "bitWrite", "position", "writeRGB", "highByte", "writeRed", "setSpeed", "readBlue", "noStroke", "remoteIP", "transfer", "shutdown", "hangCall", "beginSMS", "endWrite", "attached", "maintain", "noCursor", "checkReg", "checkPUK", "shiftOut", "isValid", "shiftIn", "pulseIn", "connect", "println", "localIP", "pinMode", "getIMEI", "display", "noBlink", "process", "getBand", "running", "beginSD", "drawBMP", "lowByte", "setBand", "release", "bitRead", "prepare", "pointTo", "readRed", "setMode", "noFill", "remove", "listen", "stroke", "detach", "attach", "noTone", "exists", "buffer", "height", "bitSet", "circle", "config", "cursor", "random", "IRread", "setDNS", "endSMS", "getKey", "micros", "millis", "begin", "print", "write", "ready", "flush", "width", "isPIN", "blink", "clear", "press", "mkdir", "rmdir", "close", "point", "yield", "image", "BSSID", "click", "delay", "read", "text", "move", "peek", "beep", "rect", "line", "open", "seek", "fill", "size", "turn", "stop", "home", "find", "step", "tone", "sqrt", "RSSI", "SSID", "end", "bit", "tan", "cos", "sin", "pow", "map", "abs", "max", "min", "get", "run", "put"], literal: ["DIGITAL_MESSAGE", "FIRMATA_STRING", "ANALOG_MESSAGE", "REPORT_DIGITAL", "REPORT_ANALOG", "INPUT_PULLUP", "SET_PIN_MODE", "INTERNAL2V56", "SYSTEM_RESET", "LED_BUILTIN", "INTERNAL1V1", "SYSEX_START", "INTERNAL", "EXTERNAL", "DEFAULT", "OUTPUT", "INPUT", "HIGH", "LOW"] }, i = jn(e), a = i.keywords;
  return a.type = [...a.type, ...t.type], a.literal = [...a.literal, ...t.literal], a.built_in = [...a.built_in, ...t.built_in], a._hints = t._hints, i.name = "Arduino", i.aliases = ["ino"], i.supersetOf = "cpp", i;
}
function ti(e) {
  const t = e.regex, i = {}, a = { begin: /\$\{/, end: /\}/, contains: ["self", { begin: /:-/, contains: [i] }] };
  Object.assign(i, { className: "variable", variants: [{ begin: t.concat(/\$[\w\d#@][\w\d_]*/, "(?![\\w\\d])(?![$])") }, a] });
  const r = { className: "subst", begin: /\$\(/, end: /\)/, contains: [e.BACKSLASH_ESCAPE] }, g = e.inherit(e.COMMENT(), { match: [/(^|\s)/, /#.*$/], scope: { 2: "comment" } }), s = { begin: /<<-?\s*(?=\w+)/, starts: { contains: [e.END_SAME_AS_BEGIN({ begin: /(\w+)/, end: /(\w+)/, className: "string" })] } }, o = { className: "string", begin: /"/, end: /"/, contains: [e.BACKSLASH_ESCAPE, i, r] };
  r.contains.push(o);
  const d = { match: /\\"/ }, c = { className: "string", begin: /'/, end: /'/ }, u = { match: /\\'/ }, m = { begin: /\$?\(\(/, end: /\)\)/, contains: [{ begin: /\d+#[0-9a-f]+/, className: "number" }, e.NUMBER_MODE, i] }, b = ["fish", "bash", "zsh", "sh", "csh", "ksh", "tcsh", "dash", "scsh"], f = e.SHEBANG({ binary: `(${b.join("|")})`, relevance: 10 }), S = { className: "function", begin: /\w[\w\d_]*\s*\(\s*\)\s*\{/, returnBegin: true, contains: [e.inherit(e.TITLE_MODE, { begin: /\w[\w\d_]*/ })], relevance: 0 }, E = ["if", "then", "else", "elif", "fi", "time", "for", "while", "until", "in", "do", "done", "case", "esac", "coproc", "function", "select"], y = ["true", "false"], w = { match: /(\/[a-z._-]+)+/ }, I = ["break", "cd", "continue", "eval", "exec", "exit", "export", "getopts", "hash", "pwd", "readonly", "return", "shift", "test", "times", "trap", "umask", "unset"], D = ["alias", "bind", "builtin", "caller", "command", "declare", "echo", "enable", "help", "let", "local", "logout", "mapfile", "printf", "read", "readarray", "source", "sudo", "type", "typeset", "ulimit", "unalias"], M = ["autoload", "bg", "bindkey", "bye", "cap", "chdir", "clone", "comparguments", "compcall", "compctl", "compdescribe", "compfiles", "compgroups", "compquote", "comptags", "comptry", "compvalues", "dirs", "disable", "disown", "echotc", "echoti", "emulate", "fc", "fg", "float", "functions", "getcap", "getln", "history", "integer", "jobs", "kill", "limit", "log", "noglob", "popd", "print", "pushd", "pushln", "rehash", "sched", "setcap", "setopt", "stat", "suspend", "ttyctl", "unfunction", "unhash", "unlimit", "unsetopt", "vared", "wait", "whence", "where", "which", "zcompile", "zformat", "zftp", "zle", "zmodload", "zparseopts", "zprof", "zpty", "zregexparse", "zsocket", "zstyle", "ztcp"], L = ["chcon", "chgrp", "chown", "chmod", "cp", "dd", "df", "dir", "dircolors", "ln", "ls", "mkdir", "mkfifo", "mknod", "mktemp", "mv", "realpath", "rm", "rmdir", "shred", "sync", "touch", "truncate", "vdir", "b2sum", "base32", "base64", "cat", "cksum", "comm", "csplit", "cut", "expand", "fmt", "fold", "head", "join", "md5sum", "nl", "numfmt", "od", "paste", "ptx", "pr", "sha1sum", "sha224sum", "sha256sum", "sha384sum", "sha512sum", "shuf", "sort", "split", "sum", "tac", "tail", "tr", "tsort", "unexpand", "uniq", "wc", "arch", "basename", "chroot", "date", "dirname", "du", "echo", "env", "expr", "factor", "groups", "hostid", "id", "link", "logname", "nice", "nohup", "nproc", "pathchk", "pinky", "printenv", "printf", "pwd", "readlink", "runcon", "seq", "sleep", "stat", "stdbuf", "stty", "tee", "test", "timeout", "tty", "uname", "unlink", "uptime", "users", "who", "whoami", "yes"];
  return { name: "Bash", aliases: ["sh", "zsh"], keywords: { $pattern: /\b[a-z][a-z0-9._-]+\b/, keyword: E, literal: y, built_in: [...I, ...D, "set", "shopt", ...M, ...L] }, contains: [f, e.SHEBANG(), S, m, g, s, w, o, d, c, u, i] };
}
function ni(e) {
  const t = e.regex, i = e.COMMENT("//", "$", { contains: [{ begin: /\\\n/ }] }), a = "decltype\\(auto\\)", r = "[a-zA-Z_]\\w*::", s = "(" + a + "|" + t.optional(r) + "[a-zA-Z_]\\w*" + t.optional("<[^<>]+>") + ")", o = { className: "type", variants: [{ begin: "\\b[a-z\\d_]*_t\\b" }, { match: /\batomic_[a-z]{3,6}\b/ }] }, c = { className: "string", variants: [{ begin: '(u8?|U|L)?"', end: '"', illegal: "\\n", contains: [e.BACKSLASH_ESCAPE] }, { begin: "(u8?|U|L)?'(\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)|.)", end: "'", illegal: "." }, e.END_SAME_AS_BEGIN({ begin: /(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/, end: /\)([^()\\ ]{0,16})"/ })] }, u = { className: "number", variants: [{ match: /\b(0b[01']+)/ }, { match: /(-?)\b([\d']+(\.[\d']*)?|\.[\d']+)((ll|LL|l|L)(u|U)?|(u|U)(ll|LL|l|L)?|f|F|b|B)/ }, { match: /(-?)\b(0[xX][a-fA-F0-9]+(?:'[a-fA-F0-9]+)*(?:\.[a-fA-F0-9]*(?:'[a-fA-F0-9]*)*)?(?:[pP][-+]?[0-9]+)?(l|L)?(u|U)?)/ }, { match: /(-?)\b\d+(?:'\d+)*(?:\.\d*(?:'\d*)*)?(?:[eE][-+]?\d+)?/ }], relevance: 0 }, m = { className: "meta", begin: /#\s*[a-z]+\b/, end: /$/, keywords: { keyword: "if else elif endif define undef warning error line pragma _Pragma ifdef ifndef elifdef elifndef include" }, contains: [{ begin: /\\\n/, relevance: 0 }, e.inherit(c, { className: "string" }), { className: "string", begin: /<.*?>/ }, i, e.C_BLOCK_COMMENT_MODE] }, b = { className: "title", begin: t.optional(r) + e.IDENT_RE, relevance: 0 }, f = t.optional(r) + e.IDENT_RE + "\\s*\\(", y = { keyword: ["asm", "auto", "break", "case", "continue", "default", "do", "else", "enum", "extern", "for", "fortran", "goto", "if", "inline", "register", "restrict", "return", "sizeof", "typeof", "typeof_unqual", "struct", "switch", "typedef", "union", "volatile", "while", "_Alignas", "_Alignof", "_Atomic", "_Generic", "_Noreturn", "_Static_assert", "_Thread_local", "alignas", "alignof", "noreturn", "static_assert", "thread_local", "_Pragma"], type: ["float", "double", "signed", "unsigned", "int", "short", "long", "char", "void", "_Bool", "_BitInt", "_Complex", "_Imaginary", "_Decimal32", "_Decimal64", "_Decimal96", "_Decimal128", "_Decimal64x", "_Decimal128x", "_Float16", "_Float32", "_Float64", "_Float128", "_Float32x", "_Float64x", "_Float128x", "const", "static", "constexpr", "complex", "bool", "imaginary"], literal: "true false NULL", built_in: "std string wstring cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set pair bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap priority_queue make_pair array shared_ptr abort terminate abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf future isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf endl initializer_list unique_ptr" }, w = [m, o, i, e.C_BLOCK_COMMENT_MODE, u, c], I = { variants: [{ begin: /=/, end: /;/ }, { begin: /\(/, end: /\)/ }, { beginKeywords: "new throw return else", end: /;/ }], keywords: y, contains: w.concat([{ begin: /\(/, end: /\)/, keywords: y, contains: w.concat(["self"]), relevance: 0 }]), relevance: 0 }, D = { begin: "(" + s + "[\\*&\\s]+)+" + f, returnBegin: true, end: /[{;=]/, excludeEnd: true, keywords: y, illegal: /[^\w\s\*&:<>.]/, contains: [{ begin: a, keywords: y, relevance: 0 }, { begin: f, returnBegin: true, contains: [e.inherit(b, { className: "title.function" })], relevance: 0 }, { relevance: 0, match: /,/ }, { className: "params", begin: /\(/, end: /\)/, keywords: y, relevance: 0, contains: [i, e.C_BLOCK_COMMENT_MODE, c, u, o, { begin: /\(/, end: /\)/, keywords: y, relevance: 0, contains: ["self", i, e.C_BLOCK_COMMENT_MODE, c, u, o] }] }, o, i, e.C_BLOCK_COMMENT_MODE, m] };
  return { name: "C", aliases: ["h"], keywords: y, disableAutodetect: true, illegal: "</", contains: [].concat(I, D, w, [m, { begin: e.IDENT_RE + "::", keywords: y }, { className: "class", beginKeywords: "enum class struct union", end: /[{;:<>=]/, contains: [{ beginKeywords: "final class struct" }, e.TITLE_MODE] }]), exports: { preprocessor: m, strings: c, keywords: y } };
}
function ii(e) {
  const t = e.regex, i = e.COMMENT("//", "$", { contains: [{ begin: /\\\n/ }] }), a = "decltype\\(auto\\)", r = "[a-zA-Z_]\\w*::", s = "(?!struct)(" + a + "|" + t.optional(r) + "[a-zA-Z_]\\w*" + t.optional("<[^<>]+>") + ")", o = { className: "type", begin: "\\b[a-z\\d_]*_t\\b" }, c = { className: "string", variants: [{ begin: '(u8?|U|L)?"', end: '"', illegal: "\\n", contains: [e.BACKSLASH_ESCAPE] }, { begin: "(u8?|U|L)?'(\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)|.)", end: "'", illegal: "." }, e.END_SAME_AS_BEGIN({ begin: /(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/, end: /\)([^()\\ ]{0,16})"/ })] }, u = { className: "number", variants: [{ begin: "[+-]?(?:(?:[0-9](?:'?[0-9])*\\.(?:[0-9](?:'?[0-9])*)?|\\.[0-9](?:'?[0-9])*)(?:[Ee][+-]?[0-9](?:'?[0-9])*)?|[0-9](?:'?[0-9])*[Ee][+-]?[0-9](?:'?[0-9])*|0[Xx](?:[0-9A-Fa-f](?:'?[0-9A-Fa-f])*(?:\\.(?:[0-9A-Fa-f](?:'?[0-9A-Fa-f])*)?)?|\\.[0-9A-Fa-f](?:'?[0-9A-Fa-f])*)[Pp][+-]?[0-9](?:'?[0-9])*)(?:[Ff](?:16|32|64|128)?|(BF|bf)16|[Ll]|)" }, { begin: "[+-]?\\b(?:0[Bb][01](?:'?[01])*|0[Xx][0-9A-Fa-f](?:'?[0-9A-Fa-f])*|0(?:'?[0-7])*|[1-9](?:'?[0-9])*)(?:[Uu](?:LL?|ll?)|[Uu][Zz]?|(?:LL?|ll?)[Uu]?|[Zz][Uu]|)" }], relevance: 0 }, m = { className: "meta", begin: /#\s*[a-z]+\b/, end: /$/, keywords: { keyword: "if else elif endif define undef warning error line pragma _Pragma ifdef ifndef include" }, contains: [{ begin: /\\\n/, relevance: 0 }, e.inherit(c, { className: "string" }), { className: "string", begin: /<.*?>/ }, i, e.C_BLOCK_COMMENT_MODE] }, b = { className: "title", begin: t.optional(r) + e.IDENT_RE, relevance: 0 }, f = t.optional(r) + e.IDENT_RE + "\\s*\\(", S = ["alignas", "alignof", "and", "and_eq", "asm", "atomic_cancel", "atomic_commit", "atomic_noexcept", "auto", "bitand", "bitor", "break", "case", "catch", "class", "co_await", "co_return", "co_yield", "compl", "concept", "const_cast|10", "consteval", "constexpr", "constinit", "continue", "decltype", "default", "delete", "do", "dynamic_cast|10", "else", "enum", "explicit", "export", "extern", "false", "final", "for", "friend", "goto", "if", "import", "inline", "module", "mutable", "namespace", "new", "noexcept", "not", "not_eq", "nullptr", "operator", "or", "or_eq", "override", "private", "protected", "public", "reflexpr", "register", "reinterpret_cast|10", "requires", "return", "sizeof", "static_assert", "static_cast|10", "struct", "switch", "synchronized", "template", "this", "thread_local", "throw", "transaction_safe", "transaction_safe_dynamic", "true", "try", "typedef", "typeid", "typename", "union", "using", "virtual", "volatile", "while", "xor", "xor_eq"], E = ["bool", "char", "char16_t", "char32_t", "char8_t", "double", "float", "int", "long", "short", "void", "wchar_t", "unsigned", "signed", "const", "static"], y = ["any", "auto_ptr", "barrier", "binary_semaphore", "bitset", "complex", "condition_variable", "condition_variable_any", "counting_semaphore", "deque", "false_type", "flat_map", "flat_set", "future", "imaginary", "initializer_list", "istringstream", "jthread", "latch", "lock_guard", "multimap", "multiset", "mutex", "optional", "ostringstream", "packaged_task", "pair", "promise", "priority_queue", "queue", "recursive_mutex", "recursive_timed_mutex", "scoped_lock", "set", "shared_future", "shared_lock", "shared_mutex", "shared_timed_mutex", "shared_ptr", "stack", "string_view", "stringstream", "timed_mutex", "thread", "true_type", "tuple", "unique_lock", "unique_ptr", "unordered_map", "unordered_multimap", "unordered_multiset", "unordered_set", "variant", "vector", "weak_ptr", "wstring", "wstring_view"], w = ["abort", "abs", "acos", "apply", "as_const", "asin", "atan", "atan2", "calloc", "ceil", "cerr", "cin", "clog", "cos", "cosh", "cout", "declval", "endl", "exchange", "exit", "exp", "fabs", "floor", "fmod", "forward", "fprintf", "fputs", "free", "frexp", "fscanf", "future", "invoke", "isalnum", "isalpha", "iscntrl", "isdigit", "isgraph", "islower", "isprint", "ispunct", "isspace", "isupper", "isxdigit", "labs", "launder", "ldexp", "log", "log10", "make_pair", "make_shared", "make_shared_for_overwrite", "make_tuple", "make_unique", "malloc", "memchr", "memcmp", "memcpy", "memset", "modf", "move", "pow", "printf", "putchar", "puts", "realloc", "scanf", "sin", "sinh", "snprintf", "sprintf", "sqrt", "sscanf", "std", "stderr", "stdin", "stdout", "strcat", "strchr", "strcmp", "strcpy", "strcspn", "strlen", "strncat", "strncmp", "strncpy", "strpbrk", "strrchr", "strspn", "strstr", "swap", "tan", "tanh", "terminate", "to_underlying", "tolower", "toupper", "vfprintf", "visit", "vprintf", "vsprintf"], M = { type: E, keyword: S, literal: ["NULL", "false", "nullopt", "nullptr", "true"], built_in: ["_Pragma"], _type_hints: y }, L = { className: "function.dispatch", relevance: 0, keywords: { _hint: w }, begin: t.concat(/\b/, /(?!decltype)/, /(?!if)/, /(?!for)/, /(?!switch)/, /(?!while)/, e.IDENT_RE, t.lookahead(/(<[^<>]+>|)\s*\(/)) }, C = [L, m, o, i, e.C_BLOCK_COMMENT_MODE, u, c], W = { variants: [{ begin: /=/, end: /;/ }, { begin: /\(/, end: /\)/ }, { beginKeywords: "new throw return else", end: /;/ }], keywords: M, contains: C.concat([{ begin: /\(/, end: /\)/, keywords: M, contains: C.concat(["self"]), relevance: 0 }]), relevance: 0 }, z = { className: "function", begin: "(" + s + "[\\*&\\s]+)+" + f, returnBegin: true, end: /[{;=]/, excludeEnd: true, keywords: M, illegal: /[^\w\s\*&:<>.]/, contains: [{ begin: a, keywords: M, relevance: 0 }, { begin: f, returnBegin: true, contains: [b], relevance: 0 }, { begin: /::/, relevance: 0 }, { begin: /:/, endsWithParent: true, contains: [c, u] }, { relevance: 0, match: /,/ }, { className: "params", begin: /\(/, end: /\)/, keywords: M, relevance: 0, contains: [i, e.C_BLOCK_COMMENT_MODE, c, u, o, { begin: /\(/, end: /\)/, keywords: M, relevance: 0, contains: ["self", i, e.C_BLOCK_COMMENT_MODE, c, u, o] }] }, o, i, e.C_BLOCK_COMMENT_MODE, m] };
  return { name: "C++", aliases: ["cc", "c++", "h++", "hpp", "hh", "hxx", "cxx"], keywords: M, illegal: "</", classNameAliases: { "function.dispatch": "built_in" }, contains: [].concat(W, z, L, C, [m, { begin: "\\b(deque|list|queue|priority_queue|pair|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array|tuple|optional|variant|function|flat_map|flat_set)\\s*<(?!<)", end: ">", keywords: M, contains: ["self", o] }, { begin: e.IDENT_RE + "::", keywords: M }, { match: [/\b(?:enum(?:\s+(?:class|struct))?|class|struct|union)/, /\s+/, /\w+/], className: { 1: "keyword", 3: "title.class" } }]) };
}
function ai(e) {
  const t = ["bool", "byte", "char", "decimal", "delegate", "double", "dynamic", "enum", "float", "int", "long", "nint", "nuint", "object", "sbyte", "short", "string", "ulong", "uint", "ushort"], i = ["public", "private", "protected", "static", "internal", "protected", "abstract", "async", "extern", "override", "unsafe", "virtual", "new", "sealed", "partial"], a = ["default", "false", "null", "true"], r = ["abstract", "as", "base", "break", "case", "catch", "class", "const", "continue", "do", "else", "event", "explicit", "extern", "finally", "fixed", "for", "foreach", "goto", "if", "implicit", "in", "interface", "internal", "is", "lock", "namespace", "new", "operator", "out", "override", "params", "private", "protected", "public", "readonly", "record", "ref", "return", "scoped", "sealed", "sizeof", "stackalloc", "static", "struct", "switch", "this", "throw", "try", "typeof", "unchecked", "unsafe", "using", "virtual", "void", "volatile", "while"], g = ["add", "alias", "and", "ascending", "args", "async", "await", "by", "descending", "dynamic", "equals", "file", "from", "get", "global", "group", "init", "into", "join", "let", "nameof", "not", "notnull", "on", "or", "orderby", "partial", "record", "remove", "required", "scoped", "select", "set", "unmanaged", "value|0", "var", "when", "where", "with", "yield"], s = { keyword: r.concat(g), built_in: t, literal: a }, o = e.inherit(e.TITLE_MODE, { begin: "[a-zA-Z](\\.?\\w)*" }), d = { className: "number", variants: [{ begin: "\\b(0b[01']+)" }, { begin: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)(u|U|l|L|ul|UL|f|F|b|B)" }, { begin: "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)" }], relevance: 0 }, c = { className: "string", begin: /"""("*)(?!")(.|\n)*?"""\1/, relevance: 1 }, u = { className: "string", begin: '@"', end: '"', contains: [{ begin: '""' }] }, m = e.inherit(u, { illegal: /\n/ }), b = { className: "subst", begin: /\{/, end: /\}/, keywords: s }, f = e.inherit(b, { illegal: /\n/ }), S = { className: "string", begin: /\$"/, end: '"', illegal: /\n/, contains: [{ begin: /\{\{/ }, { begin: /\}\}/ }, e.BACKSLASH_ESCAPE, f] }, E = { className: "string", begin: /\$@"/, end: '"', contains: [{ begin: /\{\{/ }, { begin: /\}\}/ }, { begin: '""' }, b] }, y = e.inherit(E, { illegal: /\n/, contains: [{ begin: /\{\{/ }, { begin: /\}\}/ }, { begin: '""' }, f] });
  b.contains = [E, S, u, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, d, e.C_BLOCK_COMMENT_MODE], f.contains = [y, S, m, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, d, e.inherit(e.C_BLOCK_COMMENT_MODE, { illegal: /\n/ })];
  const w = { variants: [c, E, S, u, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE] }, I = { begin: "<", end: ">", contains: [{ beginKeywords: "in out" }, o] }, D = e.IDENT_RE + "(<" + e.IDENT_RE + "(\\s*,\\s*" + e.IDENT_RE + ")*>)?(\\[\\])?", M = { begin: "@" + e.IDENT_RE, relevance: 0 };
  return { name: "C#", aliases: ["cs", "c#"], keywords: s, illegal: /::/, contains: [e.COMMENT("///", "$", { returnBegin: true, contains: [{ className: "doctag", variants: [{ begin: "///", relevance: 0 }, { begin: "<!--|-->" }, { begin: "</?", end: ">" }] }] }), e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, { className: "meta", begin: "#", end: "$", keywords: { keyword: "if else elif endif define undef warning error line region endregion pragma checksum" } }, w, d, { beginKeywords: "class interface", relevance: 0, end: /[{;=]/, illegal: /[^\s:,]/, contains: [{ beginKeywords: "where class" }, o, I, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE] }, { beginKeywords: "namespace", relevance: 0, end: /[{;=]/, illegal: /[^\s:]/, contains: [o, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE] }, { beginKeywords: "record", relevance: 0, end: /[{;=]/, illegal: /[^\s:]/, contains: [o, I, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE] }, { className: "meta", begin: "^\\s*\\[(?=[\\w])", excludeBegin: true, end: "\\]", excludeEnd: true, contains: [{ className: "string", begin: /"/, end: /"/ }] }, { beginKeywords: "new return throw await else", relevance: 0 }, { className: "function", begin: "(" + D + "\\s+)+" + e.IDENT_RE + "\\s*(<[^=]+>\\s*)?\\(", returnBegin: true, end: /\s*[{;=]/, excludeEnd: true, keywords: s, contains: [{ beginKeywords: i.join(" "), relevance: 0 }, { begin: e.IDENT_RE + "\\s*(<[^=]+>\\s*)?\\(", returnBegin: true, contains: [e.TITLE_MODE, I], relevance: 0 }, { match: /\(\)/ }, { className: "params", begin: /\(/, end: /\)/, excludeBegin: true, excludeEnd: true, keywords: s, relevance: 0, contains: [w, d, e.C_BLOCK_COMMENT_MODE] }, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE] }, M] };
}
const ri = (e) => ({ IMPORTANT: { scope: "meta", begin: "!important" }, BLOCK_COMMENT: e.C_BLOCK_COMMENT_MODE, HEXCOLOR: { scope: "number", begin: /#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\b/ }, FUNCTION_DISPATCH: { className: "built_in", begin: /[\w-]+(?=\()/ }, ATTRIBUTE_SELECTOR_MODE: { scope: "selector-attr", begin: /\[/, end: /\]/, illegal: "$", contains: [e.APOS_STRING_MODE, e.QUOTE_STRING_MODE] }, CSS_NUMBER_MODE: { scope: "number", begin: e.NUMBER_RE + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?", relevance: 0 }, CSS_VARIABLE: { className: "attr", begin: /--[A-Za-z_][A-Za-z0-9_-]*/ } }), si = ["a", "abbr", "address", "article", "aside", "audio", "b", "blockquote", "body", "button", "canvas", "caption", "cite", "code", "dd", "del", "details", "dfn", "div", "dl", "dt", "em", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "mark", "menu", "nav", "object", "ol", "optgroup", "option", "p", "picture", "q", "quote", "samp", "section", "select", "source", "span", "strong", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "tr", "ul", "var", "video"], oi = ["defs", "g", "marker", "mask", "pattern", "svg", "switch", "symbol", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feFlood", "feGaussianBlur", "feImage", "feMerge", "feMorphology", "feOffset", "feSpecularLighting", "feTile", "feTurbulence", "linearGradient", "radialGradient", "stop", "circle", "ellipse", "image", "line", "path", "polygon", "polyline", "rect", "text", "use", "textPath", "tspan", "foreignObject", "clipPath"], ci = [...si, ...oi], li = ["any-hover", "any-pointer", "aspect-ratio", "color", "color-gamut", "color-index", "device-aspect-ratio", "device-height", "device-width", "display-mode", "forced-colors", "grid", "height", "hover", "inverted-colors", "monochrome", "orientation", "overflow-block", "overflow-inline", "pointer", "prefers-color-scheme", "prefers-contrast", "prefers-reduced-motion", "prefers-reduced-transparency", "resolution", "scan", "scripting", "update", "width", "min-width", "max-width", "min-height", "max-height"].sort().reverse(), di = ["active", "any-link", "blank", "checked", "current", "default", "defined", "dir", "disabled", "drop", "empty", "enabled", "first", "first-child", "first-of-type", "fullscreen", "future", "focus", "focus-visible", "focus-within", "has", "host", "host-context", "hover", "indeterminate", "in-range", "invalid", "is", "lang", "last-child", "last-of-type", "left", "link", "local-link", "not", "nth-child", "nth-col", "nth-last-child", "nth-last-col", "nth-last-of-type", "nth-of-type", "only-child", "only-of-type", "optional", "out-of-range", "past", "placeholder-shown", "read-only", "read-write", "required", "right", "root", "scope", "target", "target-within", "user-invalid", "valid", "visited", "where"].sort().reverse(), ui = ["after", "backdrop", "before", "cue", "cue-region", "first-letter", "first-line", "grammar-error", "marker", "part", "placeholder", "selection", "slotted", "spelling-error"].sort().reverse(), gi = ["accent-color", "align-content", "align-items", "align-self", "alignment-baseline", "all", "anchor-name", "animation", "animation-composition", "animation-delay", "animation-direction", "animation-duration", "animation-fill-mode", "animation-iteration-count", "animation-name", "animation-play-state", "animation-range", "animation-range-end", "animation-range-start", "animation-timeline", "animation-timing-function", "appearance", "aspect-ratio", "backdrop-filter", "backface-visibility", "background", "background-attachment", "background-blend-mode", "background-clip", "background-color", "background-image", "background-origin", "background-position", "background-position-x", "background-position-y", "background-repeat", "background-size", "baseline-shift", "block-size", "border", "border-block", "border-block-color", "border-block-end", "border-block-end-color", "border-block-end-style", "border-block-end-width", "border-block-start", "border-block-start-color", "border-block-start-style", "border-block-start-width", "border-block-style", "border-block-width", "border-bottom", "border-bottom-color", "border-bottom-left-radius", "border-bottom-right-radius", "border-bottom-style", "border-bottom-width", "border-collapse", "border-color", "border-end-end-radius", "border-end-start-radius", "border-image", "border-image-outset", "border-image-repeat", "border-image-slice", "border-image-source", "border-image-width", "border-inline", "border-inline-color", "border-inline-end", "border-inline-end-color", "border-inline-end-style", "border-inline-end-width", "border-inline-start", "border-inline-start-color", "border-inline-start-style", "border-inline-start-width", "border-inline-style", "border-inline-width", "border-left", "border-left-color", "border-left-style", "border-left-width", "border-radius", "border-right", "border-right-color", "border-right-style", "border-right-width", "border-spacing", "border-start-end-radius", "border-start-start-radius", "border-style", "border-top", "border-top-color", "border-top-left-radius", "border-top-right-radius", "border-top-style", "border-top-width", "border-width", "bottom", "box-align", "box-decoration-break", "box-direction", "box-flex", "box-flex-group", "box-lines", "box-ordinal-group", "box-orient", "box-pack", "box-shadow", "box-sizing", "break-after", "break-before", "break-inside", "caption-side", "caret-color", "clear", "clip", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "color-scheme", "column-count", "column-fill", "column-gap", "column-rule", "column-rule-color", "column-rule-style", "column-rule-width", "column-span", "column-width", "columns", "contain", "contain-intrinsic-block-size", "contain-intrinsic-height", "contain-intrinsic-inline-size", "contain-intrinsic-size", "contain-intrinsic-width", "container", "container-name", "container-type", "content", "content-visibility", "counter-increment", "counter-reset", "counter-set", "cue", "cue-after", "cue-before", "cursor", "cx", "cy", "direction", "display", "dominant-baseline", "empty-cells", "enable-background", "field-sizing", "fill", "fill-opacity", "fill-rule", "filter", "flex", "flex-basis", "flex-direction", "flex-flow", "flex-grow", "flex-shrink", "flex-wrap", "float", "flood-color", "flood-opacity", "flow", "font", "font-display", "font-family", "font-feature-settings", "font-kerning", "font-language-override", "font-optical-sizing", "font-palette", "font-size", "font-size-adjust", "font-smooth", "font-smoothing", "font-stretch", "font-style", "font-synthesis", "font-synthesis-position", "font-synthesis-small-caps", "font-synthesis-style", "font-synthesis-weight", "font-variant", "font-variant-alternates", "font-variant-caps", "font-variant-east-asian", "font-variant-emoji", "font-variant-ligatures", "font-variant-numeric", "font-variant-position", "font-variation-settings", "font-weight", "forced-color-adjust", "gap", "glyph-orientation-horizontal", "glyph-orientation-vertical", "grid", "grid-area", "grid-auto-columns", "grid-auto-flow", "grid-auto-rows", "grid-column", "grid-column-end", "grid-column-start", "grid-gap", "grid-row", "grid-row-end", "grid-row-start", "grid-template", "grid-template-areas", "grid-template-columns", "grid-template-rows", "hanging-punctuation", "height", "hyphenate-character", "hyphenate-limit-chars", "hyphens", "icon", "image-orientation", "image-rendering", "image-resolution", "ime-mode", "initial-letter", "initial-letter-align", "inline-size", "inset", "inset-area", "inset-block", "inset-block-end", "inset-block-start", "inset-inline", "inset-inline-end", "inset-inline-start", "isolation", "justify-content", "justify-items", "justify-self", "kerning", "left", "letter-spacing", "lighting-color", "line-break", "line-height", "line-height-step", "list-style", "list-style-image", "list-style-position", "list-style-type", "margin", "margin-block", "margin-block-end", "margin-block-start", "margin-bottom", "margin-inline", "margin-inline-end", "margin-inline-start", "margin-left", "margin-right", "margin-top", "margin-trim", "marker", "marker-end", "marker-mid", "marker-start", "marks", "mask", "mask-border", "mask-border-mode", "mask-border-outset", "mask-border-repeat", "mask-border-slice", "mask-border-source", "mask-border-width", "mask-clip", "mask-composite", "mask-image", "mask-mode", "mask-origin", "mask-position", "mask-repeat", "mask-size", "mask-type", "masonry-auto-flow", "math-depth", "math-shift", "math-style", "max-block-size", "max-height", "max-inline-size", "max-width", "min-block-size", "min-height", "min-inline-size", "min-width", "mix-blend-mode", "nav-down", "nav-index", "nav-left", "nav-right", "nav-up", "none", "normal", "object-fit", "object-position", "offset", "offset-anchor", "offset-distance", "offset-path", "offset-position", "offset-rotate", "opacity", "order", "orphans", "outline", "outline-color", "outline-offset", "outline-style", "outline-width", "overflow", "overflow-anchor", "overflow-block", "overflow-clip-margin", "overflow-inline", "overflow-wrap", "overflow-x", "overflow-y", "overlay", "overscroll-behavior", "overscroll-behavior-block", "overscroll-behavior-inline", "overscroll-behavior-x", "overscroll-behavior-y", "padding", "padding-block", "padding-block-end", "padding-block-start", "padding-bottom", "padding-inline", "padding-inline-end", "padding-inline-start", "padding-left", "padding-right", "padding-top", "page", "page-break-after", "page-break-before", "page-break-inside", "paint-order", "pause", "pause-after", "pause-before", "perspective", "perspective-origin", "place-content", "place-items", "place-self", "pointer-events", "position", "position-anchor", "position-visibility", "print-color-adjust", "quotes", "r", "resize", "rest", "rest-after", "rest-before", "right", "rotate", "row-gap", "ruby-align", "ruby-position", "scale", "scroll-behavior", "scroll-margin", "scroll-margin-block", "scroll-margin-block-end", "scroll-margin-block-start", "scroll-margin-bottom", "scroll-margin-inline", "scroll-margin-inline-end", "scroll-margin-inline-start", "scroll-margin-left", "scroll-margin-right", "scroll-margin-top", "scroll-padding", "scroll-padding-block", "scroll-padding-block-end", "scroll-padding-block-start", "scroll-padding-bottom", "scroll-padding-inline", "scroll-padding-inline-end", "scroll-padding-inline-start", "scroll-padding-left", "scroll-padding-right", "scroll-padding-top", "scroll-snap-align", "scroll-snap-stop", "scroll-snap-type", "scroll-timeline", "scroll-timeline-axis", "scroll-timeline-name", "scrollbar-color", "scrollbar-gutter", "scrollbar-width", "shape-image-threshold", "shape-margin", "shape-outside", "shape-rendering", "speak", "speak-as", "src", "stop-color", "stop-opacity", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "tab-size", "table-layout", "text-align", "text-align-all", "text-align-last", "text-anchor", "text-combine-upright", "text-decoration", "text-decoration-color", "text-decoration-line", "text-decoration-skip", "text-decoration-skip-ink", "text-decoration-style", "text-decoration-thickness", "text-emphasis", "text-emphasis-color", "text-emphasis-position", "text-emphasis-style", "text-indent", "text-justify", "text-orientation", "text-overflow", "text-rendering", "text-shadow", "text-size-adjust", "text-transform", "text-underline-offset", "text-underline-position", "text-wrap", "text-wrap-mode", "text-wrap-style", "timeline-scope", "top", "touch-action", "transform", "transform-box", "transform-origin", "transform-style", "transition", "transition-behavior", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "translate", "unicode-bidi", "user-modify", "user-select", "vector-effect", "vertical-align", "view-timeline", "view-timeline-axis", "view-timeline-inset", "view-timeline-name", "view-transition-name", "visibility", "voice-balance", "voice-duration", "voice-family", "voice-pitch", "voice-range", "voice-rate", "voice-stress", "voice-volume", "white-space", "white-space-collapse", "widows", "width", "will-change", "word-break", "word-spacing", "word-wrap", "writing-mode", "x", "y", "z-index", "zoom"].sort().reverse();
function pi(e) {
  const t = e.regex, i = ri(e), a = { begin: /-(webkit|moz|ms|o)-(?=[a-z])/ }, r = "and or not only", g = /@-?\w[\w]*(-\w+)*/, s = "[a-zA-Z-][a-zA-Z0-9_-]*", o = [e.APOS_STRING_MODE, e.QUOTE_STRING_MODE];
  return { name: "CSS", case_insensitive: true, illegal: /[=|'\$]/, keywords: { keyframePosition: "from to" }, classNameAliases: { keyframePosition: "selector-tag" }, contains: [i.BLOCK_COMMENT, a, i.CSS_NUMBER_MODE, { className: "selector-id", begin: /#[A-Za-z0-9_-]+/, relevance: 0 }, { className: "selector-class", begin: "\\." + s, relevance: 0 }, i.ATTRIBUTE_SELECTOR_MODE, { className: "selector-pseudo", variants: [{ begin: ":(" + di.join("|") + ")" }, { begin: ":(:)?(" + ui.join("|") + ")" }] }, i.CSS_VARIABLE, { className: "attribute", begin: "\\b(" + gi.join("|") + ")\\b" }, { begin: /:/, end: /[;}{]/, contains: [i.BLOCK_COMMENT, i.HEXCOLOR, i.IMPORTANT, i.CSS_NUMBER_MODE, ...o, { begin: /(url|data-uri)\(/, end: /\)/, relevance: 0, keywords: { built_in: "url data-uri" }, contains: [...o, { className: "string", begin: /[^)]/, endsWithParent: true, excludeEnd: true }] }, i.FUNCTION_DISPATCH] }, { begin: t.lookahead(/@/), end: "[{;]", relevance: 0, illegal: /:/, contains: [{ className: "keyword", begin: g }, { begin: /\s/, endsWithParent: true, excludeEnd: true, relevance: 0, keywords: { $pattern: /[a-z-]+/, keyword: r, attribute: li.join(" ") }, contains: [{ begin: /[a-z-]+(?=:)/, className: "attribute" }, ...o, i.CSS_NUMBER_MODE] }] }, { className: "selector-tag", begin: "\\b(" + ci.join("|") + ")\\b" }] };
}
function bi(e) {
  const t = e.regex;
  return { name: "Diff", aliases: ["patch"], contains: [{ className: "meta", relevance: 10, match: t.either(/^@@ +-\d+,\d+ +\+\d+,\d+ +@@/, /^\*\*\* +\d+,\d+ +\*\*\*\*$/, /^--- +\d+,\d+ +----$/) }, { className: "comment", variants: [{ begin: t.either(/Index: /, /^index/, /={3,}/, /^-{3}/, /^\*{3} /, /^\+{3}/, /^diff --git/), end: /$/ }, { match: /^\*{15}$/ }] }, { className: "addition", begin: /^\+/, end: /$/ }, { className: "deletion", begin: /^-/, end: /$/ }, { className: "addition", begin: /^!/, end: /$/ }] };
}
function mi(e) {
  const g = { keyword: ["break", "case", "chan", "const", "continue", "default", "defer", "else", "fallthrough", "for", "func", "go", "goto", "if", "import", "interface", "map", "package", "range", "return", "select", "struct", "switch", "type", "var"], type: ["bool", "byte", "complex64", "complex128", "error", "float32", "float64", "int8", "int16", "int32", "int64", "string", "uint8", "uint16", "uint32", "uint64", "int", "uint", "uintptr", "rune"], literal: ["true", "false", "iota", "nil"], built_in: ["append", "cap", "close", "complex", "copy", "imag", "len", "make", "new", "panic", "print", "println", "real", "recover", "delete"] };
  return { name: "Go", aliases: ["golang"], keywords: g, illegal: "</", contains: [e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, { className: "string", variants: [e.QUOTE_STRING_MODE, e.APOS_STRING_MODE, { begin: "`", end: "`" }] }, { className: "number", variants: [{ match: /-?\b0[xX]\.[a-fA-F0-9](_?[a-fA-F0-9])*[pP][+-]?\d(_?\d)*i?/, relevance: 0 }, { match: /-?\b0[xX](_?[a-fA-F0-9])+((\.([a-fA-F0-9](_?[a-fA-F0-9])*)?)?[pP][+-]?\d(_?\d)*)?i?/, relevance: 0 }, { match: /-?\b0[oO](_?[0-7])*i?/, relevance: 0 }, { match: /-?\.\d(_?\d)*([eE][+-]?\d(_?\d)*)?i?/, relevance: 0 }, { match: /-?\b\d(_?\d)*(\.(\d(_?\d)*)?)?([eE][+-]?\d(_?\d)*)?i?/, relevance: 0 }] }, { begin: /:=/ }, { className: "function", beginKeywords: "func", end: "\\s*(\\{|$)", excludeEnd: true, contains: [e.TITLE_MODE, { className: "params", begin: /\(/, end: /\)/, endsParent: true, keywords: g, illegal: /["']/ }] }] };
}
function _i(e) {
  const t = e.regex, i = /[_A-Za-z][_0-9A-Za-z]*/;
  return { name: "GraphQL", aliases: ["gql"], case_insensitive: true, disableAutodetect: false, keywords: { keyword: ["query", "mutation", "subscription", "type", "input", "schema", "directive", "interface", "union", "scalar", "fragment", "enum", "on"], literal: ["true", "false", "null"] }, contains: [e.HASH_COMMENT_MODE, e.QUOTE_STRING_MODE, e.NUMBER_MODE, { scope: "punctuation", match: /[.]{3}/, relevance: 0 }, { scope: "punctuation", begin: /[\!\(\)\:\=\[\]\{\|\}]{1}/, relevance: 0 }, { scope: "variable", begin: /\$/, end: /\W/, excludeEnd: true, relevance: 0 }, { scope: "meta", match: /@\w+/, excludeEnd: true }, { scope: "symbol", begin: t.concat(i, t.lookahead(/\s*:/)), relevance: 0 }], illegal: [/[;<']/, /BEGIN/] };
}
function fi(e) {
  const t = e.regex, i = { className: "number", relevance: 0, variants: [{ begin: /([+-]+)?[\d]+_[\d_]+/ }, { begin: e.NUMBER_RE }] }, a = e.COMMENT();
  a.variants = [{ begin: /;/, end: /$/ }, { begin: /#/, end: /$/ }];
  const r = { className: "variable", variants: [{ begin: /\$[\w\d"][\w\d_]*/ }, { begin: /\$\{(.*?)\}/ }] }, g = { className: "literal", begin: /\bon|off|true|false|yes|no\b/ }, s = { className: "string", contains: [e.BACKSLASH_ESCAPE], variants: [{ begin: "'''", end: "'''", relevance: 10 }, { begin: '"""', end: '"""', relevance: 10 }, { begin: '"', end: '"' }, { begin: "'", end: "'" }] }, o = { begin: /\[/, end: /\]/, contains: [a, g, r, s, i, "self"], relevance: 0 }, d = /[A-Za-z0-9_-]+/, c = /"(\\"|[^"])*"/, u = /'[^']*'/, m = t.either(d, c, u), b = t.concat(m, "(\\s*\\.\\s*", m, ")*", t.lookahead(/\s*=\s*[^#\s]/));
  return { name: "TOML, also INI", aliases: ["toml"], case_insensitive: true, illegal: /\S/, contains: [a, { className: "section", begin: /\[+/, end: /\]+/ }, { begin: b, className: "attr", starts: { end: /$/, contains: [a, o, g, r, s, i] } }] };
}
var Me = "[0-9](_*[0-9])*", Ge = `\\.(${Me})`, Ke = "[0-9a-fA-F](_*[0-9a-fA-F])*", zt = { className: "number", variants: [{ begin: `(\\b(${Me})((${Ge})|\\.)?|(${Ge}))[eE][+-]?(${Me})[fFdD]?\\b` }, { begin: `\\b(${Me})((${Ge})[fFdD]?\\b|\\.([fFdD]\\b)?)` }, { begin: `(${Ge})[fFdD]?\\b` }, { begin: `\\b(${Me})[fFdD]\\b` }, { begin: `\\b0[xX]((${Ke})\\.?|(${Ke})?\\.(${Ke}))[pP][+-]?(${Me})[fFdD]?\\b` }, { begin: "\\b(0|[1-9](_*[0-9])*)[lL]?\\b" }, { begin: `\\b0[xX](${Ke})[lL]?\\b` }, { begin: "\\b0(_*[0-7])*[lL]?\\b" }, { begin: "\\b0[bB][01](_*[01])*[lL]?\\b" }], relevance: 0 };
function Gt(e, t, i) {
  return i === -1 ? "" : e.replace(t, (a) => Gt(e, t, i - 1));
}
function Ei(e) {
  const t = e.regex, i = "[À-ʸa-zA-Z_$][À-ʸa-zA-Z_$0-9]*", a = i + Gt("(?:<" + i + "~~~(?:\\s*,\\s*" + i + "~~~)*>)?", /~~~/g, 2), d = { keyword: ["synchronized", "abstract", "private", "var", "static", "if", "const ", "for", "while", "strictfp", "finally", "protected", "import", "native", "final", "void", "enum", "else", "break", "transient", "catch", "instanceof", "volatile", "case", "assert", "package", "default", "public", "try", "switch", "continue", "throws", "protected", "public", "private", "module", "requires", "exports", "do", "sealed", "yield", "permits", "goto", "when"], literal: ["false", "true", "null"], type: ["char", "boolean", "long", "float", "int", "byte", "short", "double"], built_in: ["super", "this"] }, c = { className: "meta", begin: "@" + i, contains: [{ begin: /\(/, end: /\)/, contains: ["self"] }] }, u = { className: "params", begin: /\(/, end: /\)/, keywords: d, relevance: 0, contains: [e.C_BLOCK_COMMENT_MODE], endsParent: true };
  return { name: "Java", aliases: ["jsp"], keywords: d, illegal: /<\/|#/, contains: [e.COMMENT("/\\*\\*", "\\*/", { relevance: 0, contains: [{ begin: /\w+@/, relevance: 0 }, { className: "doctag", begin: "@[A-Za-z]+" }] }), { begin: /import java\.[a-z]+\./, keywords: "import", relevance: 2 }, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, { begin: /"""/, end: /"""/, className: "string", contains: [e.BACKSLASH_ESCAPE] }, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, { match: [/\b(?:class|interface|enum|extends|implements|new)/, /\s+/, i], className: { 1: "keyword", 3: "title.class" } }, { match: /non-sealed/, scope: "keyword" }, { begin: [t.concat(/(?!else)/, i), /\s+/, i, /\s+/, /=(?!=)/], className: { 1: "type", 3: "variable", 5: "operator" } }, { begin: [/record/, /\s+/, i], className: { 1: "keyword", 3: "title.class" }, contains: [u, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE] }, { beginKeywords: "new throw return else", relevance: 0 }, { begin: ["(?:" + a + "\\s+)", e.UNDERSCORE_IDENT_RE, /\s*(?=\()/], className: { 2: "title.function" }, keywords: d, contains: [{ className: "params", begin: /\(/, end: /\)/, keywords: d, relevance: 0, contains: [c, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, zt, e.C_BLOCK_COMMENT_MODE] }, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE] }, zt, c] };
}
const Kt = "[A-Za-z$_][0-9A-Za-z$_]*", hi = ["as", "in", "of", "if", "for", "while", "finally", "var", "new", "function", "do", "return", "void", "else", "break", "catch", "instanceof", "with", "throw", "case", "default", "try", "switch", "continue", "typeof", "delete", "let", "yield", "const", "class", "debugger", "async", "await", "static", "import", "from", "export", "extends", "using"], Ni = ["true", "false", "null", "undefined", "NaN", "Infinity"], Ht = ["Object", "Function", "Boolean", "Symbol", "Math", "Date", "Number", "BigInt", "String", "RegExp", "Array", "Float32Array", "Float64Array", "Int8Array", "Uint8Array", "Uint8ClampedArray", "Int16Array", "Int32Array", "Uint16Array", "Uint32Array", "BigInt64Array", "BigUint64Array", "Set", "Map", "WeakSet", "WeakMap", "ArrayBuffer", "SharedArrayBuffer", "Atomics", "DataView", "JSON", "Promise", "Generator", "GeneratorFunction", "AsyncFunction", "Reflect", "Proxy", "Intl", "WebAssembly"], Wt = ["Error", "EvalError", "InternalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError"], qt = ["setInterval", "setTimeout", "clearInterval", "clearTimeout", "require", "exports", "eval", "isFinite", "isNaN", "parseFloat", "parseInt", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "escape", "unescape"], yi = ["arguments", "this", "super", "console", "window", "document", "localStorage", "sessionStorage", "module", "global"], Ti = [].concat(qt, Ht, Wt);
function Si(e) {
  const t = e.regex, i = (P, { after: j }) => {
    const re = "</" + P[0].slice(1);
    return P.input.indexOf(re, j) !== -1;
  }, a = Kt, r = { begin: "<>", end: "</>" }, g = /<[A-Za-z0-9\\._:-]+\s*\/>/, s = { begin: /<[A-Za-z0-9\\._:-]+/, end: /\/[A-Za-z0-9\\._:-]+>|\/>/, isTrulyOpeningTag: (P, j) => {
    const re = P[0].length + P.index, ne = P.input[re];
    if (ne === "<" || ne === ",") {
      j.ignoreMatch();
      return;
    }
    ne === ">" && (i(P, { after: re }) || j.ignoreMatch());
    let ee;
    const fe = P.input.substring(re);
    if (ee = fe.match(/^\s*=/)) {
      j.ignoreMatch();
      return;
    }
    if ((ee = fe.match(/^\s+extends\s+/)) && ee.index === 0) {
      j.ignoreMatch();
      return;
    }
  } }, o = { $pattern: Kt, keyword: hi, literal: Ni, built_in: Ti, "variable.language": yi }, d = "[0-9](_?[0-9])*", c = `\\.(${d})`, u = "0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*", m = { className: "number", variants: [{ begin: `(\\b(${u})((${c})|\\.)?|(${c}))[eE][+-]?(${d})\\b` }, { begin: `\\b(${u})\\b((${c})\\b|\\.)?|(${c})\\b` }, { begin: "\\b(0|[1-9](_?[0-9])*)n\\b" }, { begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b" }, { begin: "\\b0[bB][0-1](_?[0-1])*n?\\b" }, { begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" }, { begin: "\\b0[0-7]+n?\\b" }], relevance: 0 }, b = { className: "subst", begin: "\\$\\{", end: "\\}", keywords: o, contains: [] }, f = { begin: ".?html`", end: "", starts: { end: "`", returnEnd: false, contains: [e.BACKSLASH_ESCAPE, b], subLanguage: "xml" } }, S = { begin: ".?css`", end: "", starts: { end: "`", returnEnd: false, contains: [e.BACKSLASH_ESCAPE, b], subLanguage: "css" } }, E = { begin: ".?gql`", end: "", starts: { end: "`", returnEnd: false, contains: [e.BACKSLASH_ESCAPE, b], subLanguage: "graphql" } }, y = { className: "string", begin: "`", end: "`", contains: [e.BACKSLASH_ESCAPE, b] }, I = { className: "comment", variants: [e.COMMENT(/\/\*\*(?!\/)/, "\\*/", { relevance: 0, contains: [{ begin: "(?=@[A-Za-z]+)", relevance: 0, contains: [{ className: "doctag", begin: "@[A-Za-z]+" }, { className: "type", begin: "\\{", end: "\\}", excludeEnd: true, excludeBegin: true, relevance: 0 }, { className: "variable", begin: a + "(?=\\s*(-)|$)", endsParent: true, relevance: 0 }, { begin: /(?=[^\n])\s/, relevance: 0 }] }] }), e.C_BLOCK_COMMENT_MODE, e.C_LINE_COMMENT_MODE] }, D = [e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, f, S, E, y, { match: /\$\d+/ }, m];
  b.contains = D.concat({ begin: /\{/, end: /\}/, keywords: o, contains: ["self"].concat(D) });
  const M = [].concat(I, b.contains), L = M.concat([{ begin: /(\s*)\(/, end: /\)/, keywords: o, contains: ["self"].concat(M) }]), C = { className: "params", begin: /(\s*)\(/, end: /\)/, excludeBegin: true, excludeEnd: true, keywords: o, contains: L }, W = { variants: [{ match: [/class/, /\s+/, a, /\s+/, /extends/, /\s+/, t.concat(a, "(", t.concat(/\./, a), ")*")], scope: { 1: "keyword", 3: "title.class", 5: "keyword", 7: "title.class.inherited" } }, { match: [/class/, /\s+/, a], scope: { 1: "keyword", 3: "title.class" } }] }, z = { relevance: 0, match: t.either(/\bJSON/, /\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/, /\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/, /\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/), className: "title.class", keywords: { _: [...Ht, ...Wt] } }, H = { label: "use_strict", className: "meta", relevance: 10, begin: /^\s*['"]use (strict|asm)['"]/ }, oe = { variants: [{ match: [/function/, /\s+/, a, /(?=\s*\()/] }, { match: [/function/, /\s*(?=\()/] }], className: { 1: "keyword", 3: "title.function" }, label: "func.def", contains: [C], illegal: /%/ }, de = { relevance: 0, match: /\b[A-Z][A-Z_0-9]+\b/, className: "variable.constant" };
  function le(P) {
    return t.concat("(?!", P.join("|"), ")");
  }
  const ue = { match: t.concat(/\b/, le([...qt, "super", "import"].map((P) => `${P}\\s*\\(`)), a, t.lookahead(/\s*\(/)), className: "title.function", relevance: 0 }, q = { begin: t.concat(/\./, t.lookahead(t.concat(a, /(?![0-9A-Za-z$_(])/))), end: a, excludeBegin: true, keywords: "prototype", className: "property", relevance: 0 }, X = { match: [/get|set/, /\s+/, a, /(?=\()/], className: { 1: "keyword", 3: "title.function" }, contains: [{ begin: /\(\)/ }, C] }, ae = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + e.UNDERSCORE_IDENT_RE + ")\\s*=>", _e = { match: [/const|var|let/, /\s+/, a, /\s*/, /=\s*/, /(async\s*)?/, t.lookahead(ae)], keywords: "async", className: { 1: "keyword", 3: "title.function" }, contains: [C] };
  return { name: "JavaScript", aliases: ["js", "jsx", "mjs", "cjs"], keywords: o, exports: { PARAMS_CONTAINS: L, CLASS_REFERENCE: z }, illegal: /#(?![$_A-z])/, contains: [e.SHEBANG({ label: "shebang", binary: "node", relevance: 5 }), H, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, f, S, E, y, I, { match: /\$\d+/ }, m, z, { scope: "attr", match: a + t.lookahead(":"), relevance: 0 }, _e, { begin: "(" + e.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*", keywords: "return throw case", relevance: 0, contains: [I, e.REGEXP_MODE, { className: "function", begin: ae, returnBegin: true, end: "\\s*=>", contains: [{ className: "params", variants: [{ begin: e.UNDERSCORE_IDENT_RE, relevance: 0 }, { className: null, begin: /\(\s*\)/, skip: true }, { begin: /(\s*)\(/, end: /\)/, excludeBegin: true, excludeEnd: true, keywords: o, contains: L }] }] }, { begin: /,/, relevance: 0 }, { match: /\s+/, relevance: 0 }, { variants: [{ begin: r.begin, end: r.end }, { match: g }, { begin: s.begin, "on:begin": s.isTrulyOpeningTag, end: s.end }], subLanguage: "xml", contains: [{ begin: s.begin, end: s.end, skip: true, contains: ["self"] }] }] }, oe, { beginKeywords: "while if switch catch for" }, { begin: "\\b(?!function)" + e.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{", returnBegin: true, label: "func.def", contains: [C, e.inherit(e.TITLE_MODE, { begin: a, className: "title.function" })] }, { match: /\.\.\./, relevance: 0 }, q, { match: "\\$" + a, relevance: 0 }, { match: [/\bconstructor(?=\s*\()/], className: { 1: "title.function" }, contains: [C] }, ue, de, W, X, { match: /\$[(.]/ }] };
}
function wi(e) {
  const t = { className: "attr", begin: /"(\\.|[^\\"\r\n])*"(?=\s*:)/, relevance: 1.01 }, i = { match: /[{}[\],:]/, className: "punctuation", relevance: 0 }, a = ["true", "false", "null"], r = { scope: "literal", beginKeywords: a.join(" ") };
  return { name: "JSON", aliases: ["jsonc"], keywords: { literal: a }, contains: [t, i, e.QUOTE_STRING_MODE, r, e.C_NUMBER_MODE, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE], illegal: "\\S" };
}
var ke = "[0-9](_*[0-9])*", He = `\\.(${ke})`, We = "[0-9a-fA-F](_*[0-9a-fA-F])*", vi = { className: "number", variants: [{ begin: `(\\b(${ke})((${He})|\\.)?|(${He}))[eE][+-]?(${ke})[fFdD]?\\b` }, { begin: `\\b(${ke})((${He})[fFdD]?\\b|\\.([fFdD]\\b)?)` }, { begin: `(${He})[fFdD]?\\b` }, { begin: `\\b(${ke})[fFdD]\\b` }, { begin: `\\b0[xX]((${We})\\.?|(${We})?\\.(${We}))[pP][+-]?(${ke})[fFdD]?\\b` }, { begin: "\\b(0|[1-9](_*[0-9])*)[lL]?\\b" }, { begin: `\\b0[xX](${We})[lL]?\\b` }, { begin: "\\b0(_*[0-7])*[lL]?\\b" }, { begin: "\\b0[bB][01](_*[01])*[lL]?\\b" }], relevance: 0 };
function Ai(e) {
  const t = { keyword: "abstract as val var vararg get set class object open private protected public noinline crossinline dynamic final enum if else do while for when throw try catch finally import package is in fun override companion reified inline lateinit init interface annotation data sealed internal infix operator out by constructor super tailrec where const inner suspend typealias external expect actual", built_in: "Byte Short Char Int Long Boolean Float Double Void Unit Nothing", literal: "true false null" }, i = { className: "keyword", begin: /\b(break|continue|return|this)\b/, starts: { contains: [{ className: "symbol", begin: /@\w+/ }] } }, a = { className: "symbol", begin: e.UNDERSCORE_IDENT_RE + "@" }, r = { className: "subst", begin: /\$\{/, end: /\}/, contains: [e.C_NUMBER_MODE] }, g = { className: "variable", begin: "\\$" + e.UNDERSCORE_IDENT_RE }, s = { className: "string", variants: [{ begin: '"""', end: '"""(?=[^"])', contains: [g, r] }, { begin: "'", end: "'", illegal: /\n/, contains: [e.BACKSLASH_ESCAPE] }, { begin: '"', end: '"', illegal: /\n/, contains: [e.BACKSLASH_ESCAPE, g, r] }] };
  r.contains.push(s);
  const o = { className: "meta", begin: "@(?:file|property|field|get|set|receiver|param|setparam|delegate)\\s*:(?:\\s*" + e.UNDERSCORE_IDENT_RE + ")?" }, d = { className: "meta", begin: "@" + e.UNDERSCORE_IDENT_RE, contains: [{ begin: /\(/, end: /\)/, contains: [e.inherit(s, { className: "string" }), "self"] }] }, c = vi, u = e.COMMENT("/\\*", "\\*/", { contains: [e.C_BLOCK_COMMENT_MODE] }), m = { variants: [{ className: "type", begin: e.UNDERSCORE_IDENT_RE }, { begin: /\(/, end: /\)/, contains: [] }] }, b = m;
  return b.variants[1].contains = [m], m.variants[1].contains = [b], { name: "Kotlin", aliases: ["kt", "kts"], keywords: t, contains: [e.COMMENT("/\\*\\*", "\\*/", { relevance: 0, contains: [{ className: "doctag", begin: "@[A-Za-z]+" }] }), e.C_LINE_COMMENT_MODE, u, i, a, o, d, { className: "function", beginKeywords: "fun", end: "[(]|$", returnBegin: true, excludeEnd: true, keywords: t, relevance: 5, contains: [{ begin: e.UNDERSCORE_IDENT_RE + "\\s*\\(", returnBegin: true, relevance: 0, contains: [e.UNDERSCORE_TITLE_MODE] }, { className: "type", begin: /</, end: />/, keywords: "reified", relevance: 0 }, { className: "params", begin: /\(/, end: /\)/, endsParent: true, keywords: t, relevance: 0, contains: [{ begin: /:/, end: /[=,\/]/, endsWithParent: true, contains: [m, e.C_LINE_COMMENT_MODE, u], relevance: 0 }, e.C_LINE_COMMENT_MODE, u, o, d, s, e.C_NUMBER_MODE] }, u] }, { begin: [/class|interface|trait/, /\s+/, e.UNDERSCORE_IDENT_RE], beginScope: { 3: "title.class" }, keywords: "class interface trait", end: /[:\{(]|$/, excludeEnd: true, illegal: "extends implements", contains: [{ beginKeywords: "public protected internal private constructor" }, e.UNDERSCORE_TITLE_MODE, { className: "type", begin: /</, end: />/, excludeBegin: true, excludeEnd: true, relevance: 0 }, { className: "type", begin: /[,:]\s*/, end: /[<\(,){\s]|$/, excludeBegin: true, returnEnd: true }, o, d] }, s, { className: "meta", begin: "^#!/usr/bin/env", end: "$", illegal: `
` }, c] };
}
const Oi = (e) => ({ IMPORTANT: { scope: "meta", begin: "!important" }, BLOCK_COMMENT: e.C_BLOCK_COMMENT_MODE, HEXCOLOR: { scope: "number", begin: /#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\b/ }, FUNCTION_DISPATCH: { className: "built_in", begin: /[\w-]+(?=\()/ }, ATTRIBUTE_SELECTOR_MODE: { scope: "selector-attr", begin: /\[/, end: /\]/, illegal: "$", contains: [e.APOS_STRING_MODE, e.QUOTE_STRING_MODE] }, CSS_NUMBER_MODE: { scope: "number", begin: e.NUMBER_RE + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?", relevance: 0 }, CSS_VARIABLE: { className: "attr", begin: /--[A-Za-z_][A-Za-z0-9_-]*/ } }), Ri = ["a", "abbr", "address", "article", "aside", "audio", "b", "blockquote", "body", "button", "canvas", "caption", "cite", "code", "dd", "del", "details", "dfn", "div", "dl", "dt", "em", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "mark", "menu", "nav", "object", "ol", "optgroup", "option", "p", "picture", "q", "quote", "samp", "section", "select", "source", "span", "strong", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "tr", "ul", "var", "video"], Mi = ["defs", "g", "marker", "mask", "pattern", "svg", "switch", "symbol", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feFlood", "feGaussianBlur", "feImage", "feMerge", "feMorphology", "feOffset", "feSpecularLighting", "feTile", "feTurbulence", "linearGradient", "radialGradient", "stop", "circle", "ellipse", "image", "line", "path", "polygon", "polyline", "rect", "text", "use", "textPath", "tspan", "foreignObject", "clipPath"], ki = [...Ri, ...Mi], Ii = ["any-hover", "any-pointer", "aspect-ratio", "color", "color-gamut", "color-index", "device-aspect-ratio", "device-height", "device-width", "display-mode", "forced-colors", "grid", "height", "hover", "inverted-colors", "monochrome", "orientation", "overflow-block", "overflow-inline", "pointer", "prefers-color-scheme", "prefers-contrast", "prefers-reduced-motion", "prefers-reduced-transparency", "resolution", "scan", "scripting", "update", "width", "min-width", "max-width", "min-height", "max-height"].sort().reverse(), Yt = ["active", "any-link", "blank", "checked", "current", "default", "defined", "dir", "disabled", "drop", "empty", "enabled", "first", "first-child", "first-of-type", "fullscreen", "future", "focus", "focus-visible", "focus-within", "has", "host", "host-context", "hover", "indeterminate", "in-range", "invalid", "is", "lang", "last-child", "last-of-type", "left", "link", "local-link", "not", "nth-child", "nth-col", "nth-last-child", "nth-last-col", "nth-last-of-type", "nth-of-type", "only-child", "only-of-type", "optional", "out-of-range", "past", "placeholder-shown", "read-only", "read-write", "required", "right", "root", "scope", "target", "target-within", "user-invalid", "valid", "visited", "where"].sort().reverse(), Zt = ["after", "backdrop", "before", "cue", "cue-region", "first-letter", "first-line", "grammar-error", "marker", "part", "placeholder", "selection", "slotted", "spelling-error"].sort().reverse(), Ci = ["accent-color", "align-content", "align-items", "align-self", "alignment-baseline", "all", "anchor-name", "animation", "animation-composition", "animation-delay", "animation-direction", "animation-duration", "animation-fill-mode", "animation-iteration-count", "animation-name", "animation-play-state", "animation-range", "animation-range-end", "animation-range-start", "animation-timeline", "animation-timing-function", "appearance", "aspect-ratio", "backdrop-filter", "backface-visibility", "background", "background-attachment", "background-blend-mode", "background-clip", "background-color", "background-image", "background-origin", "background-position", "background-position-x", "background-position-y", "background-repeat", "background-size", "baseline-shift", "block-size", "border", "border-block", "border-block-color", "border-block-end", "border-block-end-color", "border-block-end-style", "border-block-end-width", "border-block-start", "border-block-start-color", "border-block-start-style", "border-block-start-width", "border-block-style", "border-block-width", "border-bottom", "border-bottom-color", "border-bottom-left-radius", "border-bottom-right-radius", "border-bottom-style", "border-bottom-width", "border-collapse", "border-color", "border-end-end-radius", "border-end-start-radius", "border-image", "border-image-outset", "border-image-repeat", "border-image-slice", "border-image-source", "border-image-width", "border-inline", "border-inline-color", "border-inline-end", "border-inline-end-color", "border-inline-end-style", "border-inline-end-width", "border-inline-start", "border-inline-start-color", "border-inline-start-style", "border-inline-start-width", "border-inline-style", "border-inline-width", "border-left", "border-left-color", "border-left-style", "border-left-width", "border-radius", "border-right", "border-right-color", "border-right-style", "border-right-width", "border-spacing", "border-start-end-radius", "border-start-start-radius", "border-style", "border-top", "border-top-color", "border-top-left-radius", "border-top-right-radius", "border-top-style", "border-top-width", "border-width", "bottom", "box-align", "box-decoration-break", "box-direction", "box-flex", "box-flex-group", "box-lines", "box-ordinal-group", "box-orient", "box-pack", "box-shadow", "box-sizing", "break-after", "break-before", "break-inside", "caption-side", "caret-color", "clear", "clip", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "color-scheme", "column-count", "column-fill", "column-gap", "column-rule", "column-rule-color", "column-rule-style", "column-rule-width", "column-span", "column-width", "columns", "contain", "contain-intrinsic-block-size", "contain-intrinsic-height", "contain-intrinsic-inline-size", "contain-intrinsic-size", "contain-intrinsic-width", "container", "container-name", "container-type", "content", "content-visibility", "counter-increment", "counter-reset", "counter-set", "cue", "cue-after", "cue-before", "cursor", "cx", "cy", "direction", "display", "dominant-baseline", "empty-cells", "enable-background", "field-sizing", "fill", "fill-opacity", "fill-rule", "filter", "flex", "flex-basis", "flex-direction", "flex-flow", "flex-grow", "flex-shrink", "flex-wrap", "float", "flood-color", "flood-opacity", "flow", "font", "font-display", "font-family", "font-feature-settings", "font-kerning", "font-language-override", "font-optical-sizing", "font-palette", "font-size", "font-size-adjust", "font-smooth", "font-smoothing", "font-stretch", "font-style", "font-synthesis", "font-synthesis-position", "font-synthesis-small-caps", "font-synthesis-style", "font-synthesis-weight", "font-variant", "font-variant-alternates", "font-variant-caps", "font-variant-east-asian", "font-variant-emoji", "font-variant-ligatures", "font-variant-numeric", "font-variant-position", "font-variation-settings", "font-weight", "forced-color-adjust", "gap", "glyph-orientation-horizontal", "glyph-orientation-vertical", "grid", "grid-area", "grid-auto-columns", "grid-auto-flow", "grid-auto-rows", "grid-column", "grid-column-end", "grid-column-start", "grid-gap", "grid-row", "grid-row-end", "grid-row-start", "grid-template", "grid-template-areas", "grid-template-columns", "grid-template-rows", "hanging-punctuation", "height", "hyphenate-character", "hyphenate-limit-chars", "hyphens", "icon", "image-orientation", "image-rendering", "image-resolution", "ime-mode", "initial-letter", "initial-letter-align", "inline-size", "inset", "inset-area", "inset-block", "inset-block-end", "inset-block-start", "inset-inline", "inset-inline-end", "inset-inline-start", "isolation", "justify-content", "justify-items", "justify-self", "kerning", "left", "letter-spacing", "lighting-color", "line-break", "line-height", "line-height-step", "list-style", "list-style-image", "list-style-position", "list-style-type", "margin", "margin-block", "margin-block-end", "margin-block-start", "margin-bottom", "margin-inline", "margin-inline-end", "margin-inline-start", "margin-left", "margin-right", "margin-top", "margin-trim", "marker", "marker-end", "marker-mid", "marker-start", "marks", "mask", "mask-border", "mask-border-mode", "mask-border-outset", "mask-border-repeat", "mask-border-slice", "mask-border-source", "mask-border-width", "mask-clip", "mask-composite", "mask-image", "mask-mode", "mask-origin", "mask-position", "mask-repeat", "mask-size", "mask-type", "masonry-auto-flow", "math-depth", "math-shift", "math-style", "max-block-size", "max-height", "max-inline-size", "max-width", "min-block-size", "min-height", "min-inline-size", "min-width", "mix-blend-mode", "nav-down", "nav-index", "nav-left", "nav-right", "nav-up", "none", "normal", "object-fit", "object-position", "offset", "offset-anchor", "offset-distance", "offset-path", "offset-position", "offset-rotate", "opacity", "order", "orphans", "outline", "outline-color", "outline-offset", "outline-style", "outline-width", "overflow", "overflow-anchor", "overflow-block", "overflow-clip-margin", "overflow-inline", "overflow-wrap", "overflow-x", "overflow-y", "overlay", "overscroll-behavior", "overscroll-behavior-block", "overscroll-behavior-inline", "overscroll-behavior-x", "overscroll-behavior-y", "padding", "padding-block", "padding-block-end", "padding-block-start", "padding-bottom", "padding-inline", "padding-inline-end", "padding-inline-start", "padding-left", "padding-right", "padding-top", "page", "page-break-after", "page-break-before", "page-break-inside", "paint-order", "pause", "pause-after", "pause-before", "perspective", "perspective-origin", "place-content", "place-items", "place-self", "pointer-events", "position", "position-anchor", "position-visibility", "print-color-adjust", "quotes", "r", "resize", "rest", "rest-after", "rest-before", "right", "rotate", "row-gap", "ruby-align", "ruby-position", "scale", "scroll-behavior", "scroll-margin", "scroll-margin-block", "scroll-margin-block-end", "scroll-margin-block-start", "scroll-margin-bottom", "scroll-margin-inline", "scroll-margin-inline-end", "scroll-margin-inline-start", "scroll-margin-left", "scroll-margin-right", "scroll-margin-top", "scroll-padding", "scroll-padding-block", "scroll-padding-block-end", "scroll-padding-block-start", "scroll-padding-bottom", "scroll-padding-inline", "scroll-padding-inline-end", "scroll-padding-inline-start", "scroll-padding-left", "scroll-padding-right", "scroll-padding-top", "scroll-snap-align", "scroll-snap-stop", "scroll-snap-type", "scroll-timeline", "scroll-timeline-axis", "scroll-timeline-name", "scrollbar-color", "scrollbar-gutter", "scrollbar-width", "shape-image-threshold", "shape-margin", "shape-outside", "shape-rendering", "speak", "speak-as", "src", "stop-color", "stop-opacity", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "tab-size", "table-layout", "text-align", "text-align-all", "text-align-last", "text-anchor", "text-combine-upright", "text-decoration", "text-decoration-color", "text-decoration-line", "text-decoration-skip", "text-decoration-skip-ink", "text-decoration-style", "text-decoration-thickness", "text-emphasis", "text-emphasis-color", "text-emphasis-position", "text-emphasis-style", "text-indent", "text-justify", "text-orientation", "text-overflow", "text-rendering", "text-shadow", "text-size-adjust", "text-transform", "text-underline-offset", "text-underline-position", "text-wrap", "text-wrap-mode", "text-wrap-style", "timeline-scope", "top", "touch-action", "transform", "transform-box", "transform-origin", "transform-style", "transition", "transition-behavior", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "translate", "unicode-bidi", "user-modify", "user-select", "vector-effect", "vertical-align", "view-timeline", "view-timeline-axis", "view-timeline-inset", "view-timeline-name", "view-transition-name", "visibility", "voice-balance", "voice-duration", "voice-family", "voice-pitch", "voice-range", "voice-rate", "voice-stress", "voice-volume", "white-space", "white-space-collapse", "widows", "width", "will-change", "word-break", "word-spacing", "word-wrap", "writing-mode", "x", "y", "z-index", "zoom"].sort().reverse(), xi = Yt.concat(Zt).sort().reverse();
function Di(e) {
  const t = Oi(e), i = xi, a = "and or not only", r = "[\\w-]+", g = "(" + r + "|@\\{" + r + "\\})", s = [], o = [], d = function(D) {
    return { className: "string", begin: "~?" + D + ".*?" + D };
  }, c = function(D, M, L) {
    return { className: D, begin: M, relevance: L };
  }, u = { $pattern: /[a-z-]+/, keyword: a, attribute: Ii.join(" ") }, m = { begin: "\\(", end: "\\)", contains: o, keywords: u, relevance: 0 };
  o.push(e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, d("'"), d('"'), t.CSS_NUMBER_MODE, { begin: "(url|data-uri)\\(", starts: { className: "string", end: "[\\)\\n]", excludeEnd: true } }, t.HEXCOLOR, m, c("variable", "@@?" + r, 10), c("variable", "@\\{" + r + "\\}"), c("built_in", "~?`[^`]*?`"), { className: "attribute", begin: r + "\\s*:", end: ":", returnBegin: true, excludeEnd: true }, t.IMPORTANT, { beginKeywords: "and not" }, t.FUNCTION_DISPATCH);
  const b = o.concat({ begin: /\{/, end: /\}/, contains: s }), f = { beginKeywords: "when", endsWithParent: true, contains: [{ beginKeywords: "and not" }].concat(o) }, S = { begin: g + "\\s*:", returnBegin: true, end: /[;}]/, relevance: 0, contains: [{ begin: /-(webkit|moz|ms|o)-/ }, t.CSS_VARIABLE, { className: "attribute", begin: "\\b(" + Ci.join("|") + ")\\b", end: /(?=:)/, starts: { endsWithParent: true, illegal: "[<=$]", relevance: 0, contains: o } }] }, E = { className: "keyword", begin: "@(import|media|charset|font-face|(-[a-z]+-)?keyframes|supports|document|namespace|page|viewport|host)\\b", starts: { end: "[;{}]", keywords: u, returnEnd: true, contains: o, relevance: 0 } }, y = { className: "variable", variants: [{ begin: "@" + r + "\\s*:", relevance: 15 }, { begin: "@" + r }], starts: { end: "[;}]", returnEnd: true, contains: b } }, w = { variants: [{ begin: "[\\.#:&\\[>]", end: "[;{}]" }, { begin: g, end: /\{/ }], returnBegin: true, returnEnd: true, illegal: `[<='$"]`, relevance: 0, contains: [e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, f, c("keyword", "all\\b"), c("variable", "@\\{" + r + "\\}"), { begin: "\\b(" + ki.join("|") + ")\\b", className: "selector-tag" }, t.CSS_NUMBER_MODE, c("selector-tag", g, 0), c("selector-id", "#" + g), c("selector-class", "\\." + g, 0), c("selector-tag", "&", 0), t.ATTRIBUTE_SELECTOR_MODE, { className: "selector-pseudo", begin: ":(" + Yt.join("|") + ")" }, { className: "selector-pseudo", begin: ":(:)?(" + Zt.join("|") + ")" }, { begin: /\(/, end: /\)/, relevance: 0, contains: b }, { begin: "!important" }, t.FUNCTION_DISPATCH] }, I = { begin: r + `:(:)?(${i.join("|")})`, returnBegin: true, contains: [w] };
  return s.push(e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, E, y, I, S, w, f, t.FUNCTION_DISPATCH), { name: "Less", case_insensitive: true, illegal: `[=>'/<($"]`, contains: s };
}
function Li(e) {
  const t = "\\[=*\\[", i = "\\]=*\\]", a = { begin: t, end: i, contains: ["self"] }, r = [e.COMMENT("--(?!" + t + ")", "$"), e.COMMENT("--" + t, i, { contains: [a], relevance: 10 })];
  return { name: "Lua", aliases: ["pluto"], keywords: { $pattern: e.UNDERSCORE_IDENT_RE, literal: "true false nil", keyword: "and break do else elseif end for goto if in local not or repeat return then until while", built_in: "_G _ENV _VERSION __index __newindex __mode __call __metatable __tostring __len __gc __add __sub __mul __div __mod __pow __concat __unm __eq __lt __le assert collectgarbage dofile error getfenv getmetatable ipairs load loadfile loadstring module next pairs pcall print rawequal rawget rawset require select setfenv setmetatable tonumber tostring type unpack xpcall arg self coroutine resume yield status wrap create running debug getupvalue debug sethook getmetatable gethook setmetatable setlocal traceback setfenv getinfo setupvalue getlocal getregistry getfenv io lines write close flush open output type read stderr stdin input stdout popen tmpfile math log max acos huge ldexp pi cos tanh pow deg tan cosh sinh random randomseed frexp ceil floor rad abs sqrt modf asin min mod fmod log10 atan2 exp sin atan os exit setlocale date getenv difftime remove time clock tmpname rename execute package preload loadlib loaded loaders cpath config path seeall string sub upper len gfind rep find match char dump gmatch reverse byte format gsub lower table setn insert getn foreachi maxn foreach concat sort remove" }, contains: r.concat([{ className: "function", beginKeywords: "function", end: "\\)", contains: [e.inherit(e.TITLE_MODE, { begin: "([_a-zA-Z]\\w*\\.)*([_a-zA-Z]\\w*:)?[_a-zA-Z]\\w*" }), { className: "params", begin: "\\(", endsWithParent: true, contains: r }].concat(r) }, e.C_NUMBER_MODE, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, { className: "string", begin: t, end: i, contains: [a], relevance: 5 }]) };
}
function Bi(e) {
  const t = { className: "variable", variants: [{ begin: "\\$\\(" + e.UNDERSCORE_IDENT_RE + "\\)", contains: [e.BACKSLASH_ESCAPE] }, { begin: /\$[@%<?\^\+\*]/ }] }, i = { className: "string", begin: /"/, end: /"/, contains: [e.BACKSLASH_ESCAPE, t] }, a = { className: "variable", begin: /\$\([\w-]+\s/, end: /\)/, keywords: { built_in: "subst patsubst strip findstring filter filter-out sort word wordlist firstword lastword dir notdir suffix basename addsuffix addprefix join wildcard realpath abspath error warning shell origin flavor foreach if or and call eval file value" }, contains: [t, i] }, r = { begin: "^" + e.UNDERSCORE_IDENT_RE + "\\s*(?=[:+?]?=)" }, g = { className: "meta", begin: /^\.PHONY:/, end: /$/, keywords: { $pattern: /[\.\w]+/, keyword: ".PHONY" } }, s = { className: "section", begin: /^[^\s]+:/, end: /$/, contains: [t] };
  return { name: "Makefile", aliases: ["mk", "mak", "make"], keywords: { $pattern: /[\w-]+/, keyword: "define endef undefine ifdef ifndef ifeq ifneq else endif include -include sinclude override export unexport private vpath" }, contains: [e.HASH_COMMENT_MODE, t, i, a, r, g, s] };
}
function Pi(e) {
  const t = e.regex, i = { begin: /<\/?[A-Za-z_]/, end: ">", subLanguage: "xml", relevance: 0 }, a = { begin: "^[-\\*]{3,}", end: "$" }, r = { className: "code", variants: [{ begin: "(`{3,})[^`](.|\\n)*?\\1`*[ ]*" }, { begin: "(~{3,})[^~](.|\\n)*?\\1~*[ ]*" }, { begin: "```", end: "```+[ ]*$" }, { begin: "~~~", end: "~~~+[ ]*$" }, { begin: "`.+?`" }, { begin: "(?=^( {4}|\\t))", contains: [{ begin: "^( {4}|\\t)", end: "(\\n)$" }], relevance: 0 }] }, g = { className: "bullet", begin: "^[ 	]*([*+-]|(\\d+\\.))(?=\\s+)", end: "\\s+", excludeEnd: true }, s = { begin: /^\[[^\n]+\]:/, returnBegin: true, contains: [{ className: "symbol", begin: /\[/, end: /\]/, excludeBegin: true, excludeEnd: true }, { className: "link", begin: /:\s*/, end: /$/, excludeBegin: true }] }, o = /[A-Za-z][A-Za-z0-9+.-]*/, d = { variants: [{ begin: /\[.+?\]\[.*?\]/, relevance: 0 }, { begin: /\[.+?\]\(((data|javascript|mailto):|(?:http|ftp)s?:\/\/).*?\)/, relevance: 2 }, { begin: t.concat(/\[.+?\]\(/, o, /:\/\/.*?\)/), relevance: 2 }, { begin: /\[.+?\]\([./?&#].*?\)/, relevance: 1 }, { begin: /\[.*?\]\(.*?\)/, relevance: 0 }], returnBegin: true, contains: [{ match: /\[(?=\])/ }, { className: "string", relevance: 0, begin: "\\[", end: "\\]", excludeBegin: true, returnEnd: true }, { className: "link", relevance: 0, begin: "\\]\\(", end: "\\)", excludeBegin: true, excludeEnd: true }, { className: "symbol", relevance: 0, begin: "\\]\\[", end: "\\]", excludeBegin: true, excludeEnd: true }] }, c = { className: "strong", contains: [], variants: [{ begin: /_{2}(?!\s)/, end: /_{2}/ }, { begin: /\*{2}(?!\s)/, end: /\*{2}/ }] }, u = { className: "emphasis", contains: [], variants: [{ begin: /\*(?![*\s])/, end: /\*/ }, { begin: /_(?![_\s])/, end: /_/, relevance: 0 }] }, m = e.inherit(c, { contains: [] }), b = e.inherit(u, { contains: [] });
  c.contains.push(b), u.contains.push(m);
  let f = [i, d];
  return [c, u, m, b].forEach((w) => {
    w.contains = w.contains.concat(f);
  }), f = f.concat(c, u), { name: "Markdown", aliases: ["md", "mkdown", "mkd"], contains: [{ className: "section", variants: [{ begin: "^#{1,6}", end: "$", contains: f }, { begin: "(?=^.+?\\n[=-]{2,}$)", contains: [{ begin: "^[=-]*$" }, { begin: "^", end: "\\n", contains: f }] }] }, i, g, c, u, { className: "quote", begin: "^>\\s+", contains: f, end: "$" }, r, a, d, s, { scope: "literal", match: /&([a-zA-Z0-9]+|#[0-9]{1,7}|#[Xx][0-9a-fA-F]{1,6});/ }] };
}
function Ui(e) {
  const t = { className: "built_in", begin: "\\b(AV|CA|CF|CG|CI|CL|CM|CN|CT|MK|MP|MTK|MTL|NS|SCN|SK|UI|WK|XC)\\w+" }, i = /[a-zA-Z@][a-zA-Z0-9_]*/, o = { "variable.language": ["this", "super"], $pattern: i, keyword: ["while", "export", "sizeof", "typedef", "const", "struct", "for", "union", "volatile", "static", "mutable", "if", "do", "return", "goto", "enum", "else", "break", "extern", "asm", "case", "default", "register", "explicit", "typename", "switch", "continue", "inline", "readonly", "assign", "readwrite", "self", "@synchronized", "id", "typeof", "nonatomic", "IBOutlet", "IBAction", "strong", "weak", "copy", "in", "out", "inout", "bycopy", "byref", "oneway", "__strong", "__weak", "__block", "__autoreleasing", "@private", "@protected", "@public", "@try", "@property", "@end", "@throw", "@catch", "@finally", "@autoreleasepool", "@synthesize", "@dynamic", "@selector", "@optional", "@required", "@encode", "@package", "@import", "@defs", "@compatibility_alias", "__bridge", "__bridge_transfer", "__bridge_retained", "__bridge_retain", "__covariant", "__contravariant", "__kindof", "_Nonnull", "_Nullable", "_Null_unspecified", "__FUNCTION__", "__PRETTY_FUNCTION__", "__attribute__", "getter", "setter", "retain", "unsafe_unretained", "nonnull", "nullable", "null_unspecified", "null_resettable", "class", "instancetype", "NS_DESIGNATED_INITIALIZER", "NS_UNAVAILABLE", "NS_REQUIRES_SUPER", "NS_RETURNS_INNER_POINTER", "NS_INLINE", "NS_AVAILABLE", "NS_DEPRECATED", "NS_ENUM", "NS_OPTIONS", "NS_SWIFT_UNAVAILABLE", "NS_ASSUME_NONNULL_BEGIN", "NS_ASSUME_NONNULL_END", "NS_REFINED_FOR_SWIFT", "NS_SWIFT_NAME", "NS_SWIFT_NOTHROW", "NS_DURING", "NS_HANDLER", "NS_ENDHANDLER", "NS_VALUERETURN", "NS_VOIDRETURN"], literal: ["false", "true", "FALSE", "TRUE", "nil", "YES", "NO", "NULL"], built_in: ["dispatch_once_t", "dispatch_queue_t", "dispatch_sync", "dispatch_async", "dispatch_once"], type: ["int", "float", "char", "unsigned", "signed", "short", "long", "double", "wchar_t", "unichar", "void", "bool", "BOOL", "id|0", "_Bool"] }, d = { $pattern: i, keyword: ["@interface", "@class", "@protocol", "@implementation"] };
  return { name: "Objective-C", aliases: ["mm", "objc", "obj-c", "obj-c++", "objective-c++"], keywords: o, illegal: "</", contains: [t, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, e.C_NUMBER_MODE, e.QUOTE_STRING_MODE, e.APOS_STRING_MODE, { className: "string", variants: [{ begin: '@"', end: '"', illegal: "\\n", contains: [e.BACKSLASH_ESCAPE] }] }, { className: "meta", begin: /#\s*[a-z]+\b/, end: /$/, keywords: { keyword: "if else elif endif define undef warning error line pragma ifdef ifndef include" }, contains: [{ begin: /\\\n/, relevance: 0 }, e.inherit(e.QUOTE_STRING_MODE, { className: "string" }), { className: "string", begin: /<.*?>/, end: /$/, illegal: "\\n" }, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE] }, { className: "class", begin: "(" + d.keyword.join("|") + ")\\b", end: /(\{|$)/, excludeEnd: true, keywords: d, contains: [e.UNDERSCORE_TITLE_MODE] }, { begin: "\\." + e.UNDERSCORE_IDENT_RE, relevance: 0 }] };
}
function Fi(e) {
  const t = e.regex, i = ["abs", "accept", "alarm", "and", "atan2", "bind", "binmode", "bless", "break", "caller", "chdir", "chmod", "chomp", "chop", "chown", "chr", "chroot", "class", "close", "closedir", "connect", "continue", "cos", "crypt", "dbmclose", "dbmopen", "defined", "delete", "die", "do", "dump", "each", "else", "elsif", "endgrent", "endhostent", "endnetent", "endprotoent", "endpwent", "endservent", "eof", "eval", "exec", "exists", "exit", "exp", "fcntl", "field", "fileno", "flock", "for", "foreach", "fork", "format", "formline", "getc", "getgrent", "getgrgid", "getgrnam", "gethostbyaddr", "gethostbyname", "gethostent", "getlogin", "getnetbyaddr", "getnetbyname", "getnetent", "getpeername", "getpgrp", "getpriority", "getprotobyname", "getprotobynumber", "getprotoent", "getpwent", "getpwnam", "getpwuid", "getservbyname", "getservbyport", "getservent", "getsockname", "getsockopt", "given", "glob", "gmtime", "goto", "grep", "gt", "hex", "if", "index", "int", "ioctl", "join", "keys", "kill", "last", "lc", "lcfirst", "length", "link", "listen", "local", "localtime", "log", "lstat", "lt", "ma", "map", "method", "mkdir", "msgctl", "msgget", "msgrcv", "msgsnd", "my", "ne", "next", "no", "not", "oct", "open", "opendir", "or", "ord", "our", "pack", "package", "pipe", "pop", "pos", "print", "printf", "prototype", "push", "q|0", "qq", "quotemeta", "qw", "qx", "rand", "read", "readdir", "readline", "readlink", "readpipe", "recv", "redo", "ref", "rename", "require", "reset", "return", "reverse", "rewinddir", "rindex", "rmdir", "say", "scalar", "seek", "seekdir", "select", "semctl", "semget", "semop", "send", "setgrent", "sethostent", "setnetent", "setpgrp", "setpriority", "setprotoent", "setpwent", "setservent", "setsockopt", "shift", "shmctl", "shmget", "shmread", "shmwrite", "shutdown", "sin", "sleep", "socket", "socketpair", "sort", "splice", "split", "sprintf", "sqrt", "srand", "stat", "state", "study", "sub", "substr", "symlink", "syscall", "sysopen", "sysread", "sysseek", "system", "syswrite", "tell", "telldir", "tie", "tied", "time", "times", "tr", "truncate", "uc", "ucfirst", "umask", "undef", "unless", "unlink", "unpack", "unshift", "untie", "until", "use", "utime", "values", "vec", "wait", "waitpid", "wantarray", "warn", "when", "while", "write", "x|0", "xor", "y|0"], a = /[dualxmsipngr]{0,12}/, r = { $pattern: /[\w.]+/, keyword: i.join(" ") }, g = { className: "subst", begin: "[$@]\\{", end: "\\}", keywords: r }, s = { begin: /->\{/, end: /\}/ }, o = { scope: "attr", match: /\s+:\s*\w+(\s*\(.*?\))?/ }, d = { scope: "variable", variants: [{ begin: /\$\d/ }, { begin: t.concat(/[$%@](?!")(\^\w\b|#\w+(::\w+)*|\{\w+\}|\w+(::\w*)*)/, "(?![A-Za-z])(?![@$%])") }, { begin: /[$%@](?!")[^\s\w{=]|\$=/, relevance: 0 }], contains: [o] }, c = { className: "number", variants: [{ match: /0?\.[0-9][0-9_]+\b/ }, { match: /\bv?(0|[1-9][0-9_]*(\.[0-9_]+)?|[1-9][0-9_]*)\b/ }, { match: /\b0[0-7][0-7_]*\b/ }, { match: /\b0x[0-9a-fA-F][0-9a-fA-F_]*\b/ }, { match: /\b0b[0-1][0-1_]*\b/ }], relevance: 0 }, u = [e.BACKSLASH_ESCAPE, g, d], m = [/!/, /\//, /\|/, /\?/, /'/, /"/, /#/], b = (E, y, w = "\\1") => {
    const I = w === "\\1" ? w : t.concat(w, y);
    return t.concat(t.concat("(?:", E, ")"), y, /(?:\\.|[^\\\/])*?/, I, /(?:\\.|[^\\\/])*?/, w, a);
  }, f = (E, y, w) => t.concat(t.concat("(?:", E, ")"), y, /(?:\\.|[^\\\/])*?/, w, a), S = [d, e.HASH_COMMENT_MODE, e.COMMENT(/^=\w/, /=cut/, { endsWithParent: true }), s, { className: "string", contains: u, variants: [{ begin: "q[qwxr]?\\s*\\(", end: "\\)", relevance: 5 }, { begin: "q[qwxr]?\\s*\\[", end: "\\]", relevance: 5 }, { begin: "q[qwxr]?\\s*\\{", end: "\\}", relevance: 5 }, { begin: "q[qwxr]?\\s*\\|", end: "\\|", relevance: 5 }, { begin: "q[qwxr]?\\s*<", end: ">", relevance: 5 }, { begin: "qw\\s+q", end: "q", relevance: 5 }, { begin: "'", end: "'", contains: [e.BACKSLASH_ESCAPE] }, { begin: '"', end: '"' }, { begin: "`", end: "`", contains: [e.BACKSLASH_ESCAPE] }, { begin: /\{\w+\}/, relevance: 0 }, { begin: "-?\\w+\\s*=>", relevance: 0 }] }, c, { begin: "(\\/\\/|" + e.RE_STARTERS_RE + "|\\b(split|return|print|reverse|grep)\\b)\\s*", keywords: "split return print reverse grep", relevance: 0, contains: [e.HASH_COMMENT_MODE, { className: "regexp", variants: [{ begin: b("s|tr|y", t.either(...m, { capture: true })) }, { begin: b("s|tr|y", "\\(", "\\)") }, { begin: b("s|tr|y", "\\[", "\\]") }, { begin: b("s|tr|y", "\\{", "\\}") }], relevance: 2 }, { className: "regexp", variants: [{ begin: /(m|qr)\/\//, relevance: 0 }, { begin: f("(?:m|qr)?", /\//, /\//) }, { begin: f("m|qr", t.either(...m, { capture: true }), /\1/) }, { begin: f("m|qr", /\(/, /\)/) }, { begin: f("m|qr", /\[/, /\]/) }, { begin: f("m|qr", /\{/, /\}/) }] }] }, { className: "function", beginKeywords: "sub method", end: "(\\s*\\(.*?\\))?[;{]", excludeEnd: true, relevance: 5, contains: [e.TITLE_MODE, o] }, { className: "class", beginKeywords: "class", end: "[;{]", excludeEnd: true, relevance: 5, contains: [e.TITLE_MODE, o, c] }, { begin: "-\\w\\b", relevance: 0 }, { begin: "^__DATA__$", end: "^__END__$", subLanguage: "mojolicious", contains: [{ begin: "^@@.*", end: "$", className: "comment" }] }];
  return g.contains = S, s.contains = S, { name: "Perl", aliases: ["pl", "pm"], keywords: r, contains: S };
}
function $i(e) {
  const t = e.regex, i = /(?![A-Za-z0-9])(?![$])/, a = t.concat(/[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/, i), r = t.concat(/(\\?[A-Z][a-z0-9_\x7f-\xff]+|\\?[A-Z]+(?=[A-Z][a-z0-9_\x7f-\xff])){1,}/, i), g = t.concat(/[A-Z]+/, i), s = { scope: "variable", match: "\\$+" + a }, o = { scope: "meta", variants: [{ begin: /<\?php/, relevance: 10 }, { begin: /<\?=/ }, { begin: /<\?/, relevance: 0.1 }, { begin: /\?>/ }] }, d = { scope: "subst", variants: [{ begin: /\$\w+/ }, { begin: /\{\$/, end: /\}/ }] }, c = e.inherit(e.APOS_STRING_MODE, { illegal: null }), u = e.inherit(e.QUOTE_STRING_MODE, { illegal: null, contains: e.QUOTE_STRING_MODE.contains.concat(d) }), m = { begin: /<<<[ \t]*(?:(\w+)|"(\w+)")\n/, end: /[ \t]*(\w+)\b/, contains: e.QUOTE_STRING_MODE.contains.concat(d), "on:begin": (q, X) => {
    X.data._beginMatch = q[1] || q[2];
  }, "on:end": (q, X) => {
    X.data._beginMatch !== q[1] && X.ignoreMatch();
  } }, b = e.END_SAME_AS_BEGIN({ begin: /<<<[ \t]*'(\w+)'\n/, end: /[ \t]*(\w+)\b/ }), f = `[ 	
]`, S = { scope: "string", variants: [u, c, m, b] }, E = { scope: "number", variants: [{ begin: "\\b0[bB][01]+(?:_[01]+)*\\b" }, { begin: "\\b0[oO][0-7]+(?:_[0-7]+)*\\b" }, { begin: "\\b0[xX][\\da-fA-F]+(?:_[\\da-fA-F]+)*\\b" }, { begin: "(?:\\b\\d+(?:_\\d+)*(\\.(?:\\d+(?:_\\d+)*))?|\\B\\.\\d+)(?:[eE][+-]?\\d+)?" }], relevance: 0 }, y = ["false", "null", "true"], w = ["__CLASS__", "__DIR__", "__FILE__", "__FUNCTION__", "__COMPILER_HALT_OFFSET__", "__LINE__", "__METHOD__", "__NAMESPACE__", "__TRAIT__", "die", "echo", "exit", "include", "include_once", "print", "require", "require_once", "array", "abstract", "and", "as", "binary", "bool", "boolean", "break", "callable", "case", "catch", "class", "clone", "const", "continue", "declare", "default", "do", "double", "else", "elseif", "empty", "enddeclare", "endfor", "endforeach", "endif", "endswitch", "endwhile", "enum", "eval", "extends", "final", "finally", "float", "for", "foreach", "from", "global", "goto", "if", "implements", "instanceof", "insteadof", "int", "integer", "interface", "isset", "iterable", "list", "match|0", "mixed", "new", "never", "object", "or", "private", "protected", "public", "readonly", "real", "return", "string", "switch", "throw", "trait", "try", "unset", "use", "var", "void", "while", "xor", "yield"], I = ["Error|0", "AppendIterator", "ArgumentCountError", "ArithmeticError", "ArrayIterator", "ArrayObject", "AssertionError", "BadFunctionCallException", "BadMethodCallException", "CachingIterator", "CallbackFilterIterator", "CompileError", "Countable", "DirectoryIterator", "DivisionByZeroError", "DomainException", "EmptyIterator", "ErrorException", "Exception", "FilesystemIterator", "FilterIterator", "GlobIterator", "InfiniteIterator", "InvalidArgumentException", "IteratorIterator", "LengthException", "LimitIterator", "LogicException", "MultipleIterator", "NoRewindIterator", "OutOfBoundsException", "OutOfRangeException", "OuterIterator", "OverflowException", "ParentIterator", "ParseError", "RangeException", "RecursiveArrayIterator", "RecursiveCachingIterator", "RecursiveCallbackFilterIterator", "RecursiveDirectoryIterator", "RecursiveFilterIterator", "RecursiveIterator", "RecursiveIteratorIterator", "RecursiveRegexIterator", "RecursiveTreeIterator", "RegexIterator", "RuntimeException", "SeekableIterator", "SplDoublyLinkedList", "SplFileInfo", "SplFileObject", "SplFixedArray", "SplHeap", "SplMaxHeap", "SplMinHeap", "SplObjectStorage", "SplObserver", "SplPriorityQueue", "SplQueue", "SplStack", "SplSubject", "SplTempFileObject", "TypeError", "UnderflowException", "UnexpectedValueException", "UnhandledMatchError", "ArrayAccess", "BackedEnum", "Closure", "Fiber", "Generator", "Iterator", "IteratorAggregate", "Serializable", "Stringable", "Throwable", "Traversable", "UnitEnum", "WeakReference", "WeakMap", "Directory", "__PHP_Incomplete_Class", "parent", "php_user_filter", "self", "static", "stdClass"], M = { keyword: w, literal: ((q) => {
    const X = [];
    return q.forEach((ae) => {
      X.push(ae), ae.toLowerCase() === ae ? X.push(ae.toUpperCase()) : X.push(ae.toLowerCase());
    }), X;
  })(y), built_in: I }, L = (q) => q.map((X) => X.replace(/\|\d+$/, "")), C = { variants: [{ match: [/new/, t.concat(f, "+"), t.concat("(?!", L(I).join("\\b|"), "\\b)"), r], scope: { 1: "keyword", 4: "title.class" } }] }, W = t.concat(a, "\\b(?!\\()"), z = { variants: [{ match: [t.concat(/::/, t.lookahead(/(?!class\b)/)), W], scope: { 2: "variable.constant" } }, { match: [/::/, /class/], scope: { 2: "variable.language" } }, { match: [r, t.concat(/::/, t.lookahead(/(?!class\b)/)), W], scope: { 1: "title.class", 3: "variable.constant" } }, { match: [r, t.concat("::", t.lookahead(/(?!class\b)/))], scope: { 1: "title.class" } }, { match: [r, /::/, /class/], scope: { 1: "title.class", 3: "variable.language" } }] }, H = { scope: "attr", match: t.concat(a, t.lookahead(":"), t.lookahead(/(?!::)/)) }, oe = { relevance: 0, begin: /\(/, end: /\)/, keywords: M, contains: [H, s, z, e.C_BLOCK_COMMENT_MODE, S, E, C] }, de = { relevance: 0, match: [/\b/, t.concat("(?!fn\\b|function\\b|", L(w).join("\\b|"), "|", L(I).join("\\b|"), "\\b)"), a, t.concat(f, "*"), t.lookahead(/(?=\()/)], scope: { 3: "title.function.invoke" }, contains: [oe] };
  oe.contains.push(de);
  const le = [H, z, e.C_BLOCK_COMMENT_MODE, S, E, C], ue = { begin: t.concat(/#\[\s*\\?/, t.either(r, g)), beginScope: "meta", end: /]/, endScope: "meta", keywords: { literal: y, keyword: ["new", "array"] }, contains: [{ begin: /\[/, end: /]/, keywords: { literal: y, keyword: ["new", "array"] }, contains: ["self", ...le] }, ...le, { scope: "meta", variants: [{ match: r }, { match: g }] }] };
  return { case_insensitive: false, keywords: M, contains: [ue, e.HASH_COMMENT_MODE, e.COMMENT("//", "$"), e.COMMENT("/\\*", "\\*/", { contains: [{ scope: "doctag", match: "@[A-Za-z]+" }] }), { match: /__halt_compiler\(\);/, keywords: "__halt_compiler", starts: { scope: "comment", end: e.MATCH_NOTHING_RE, contains: [{ match: /\?>/, scope: "meta", endsParent: true }] } }, o, { scope: "variable.language", match: /\$this\b/ }, s, de, z, { match: [/const/, /\s/, a], scope: { 1: "keyword", 3: "variable.constant" } }, C, { scope: "function", relevance: 0, beginKeywords: "fn function", end: /[;{]/, excludeEnd: true, illegal: "[$%\\[]", contains: [{ beginKeywords: "use" }, e.UNDERSCORE_TITLE_MODE, { begin: "=>", endsParent: true }, { scope: "params", begin: "\\(", end: "\\)", excludeBegin: true, excludeEnd: true, keywords: M, contains: ["self", ue, s, z, e.C_BLOCK_COMMENT_MODE, S, E] }] }, { scope: "class", variants: [{ beginKeywords: "enum", illegal: /[($"]/ }, { beginKeywords: "class interface trait", illegal: /[:($"]/ }], relevance: 0, end: /\{/, excludeEnd: true, contains: [{ beginKeywords: "extends implements" }, e.UNDERSCORE_TITLE_MODE] }, { beginKeywords: "namespace", relevance: 0, end: ";", illegal: /[.']/, contains: [e.inherit(e.UNDERSCORE_TITLE_MODE, { scope: "title.class" })] }, { beginKeywords: "use", relevance: 0, end: ";", contains: [{ match: /\b(as|const|function)\b/, scope: "keyword" }, e.UNDERSCORE_TITLE_MODE] }, S, E] };
}
function zi(e) {
  return { name: "PHP template", subLanguage: "xml", contains: [{ begin: /<\?(php|=)?/, end: /\?>/, subLanguage: "php", contains: [{ begin: "/\\*", end: "\\*/", skip: true }, { begin: 'b"', end: '"', skip: true }, { begin: "b'", end: "'", skip: true }, e.inherit(e.APOS_STRING_MODE, { illegal: null, className: null, contains: null, skip: true }), e.inherit(e.QUOTE_STRING_MODE, { illegal: null, className: null, contains: null, skip: true })] }] };
}
function Gi(e) {
  return { name: "Plain text", aliases: ["text", "txt"], disableAutodetect: true };
}
function Ki(e) {
  const t = e.regex, i = new RegExp("[\\p{XID_Start}_]\\p{XID_Continue}*", "u"), a = ["and", "as", "assert", "async", "await", "break", "case", "class", "continue", "def", "del", "elif", "else", "except", "finally", "for", "from", "global", "if", "import", "in", "is", "lambda", "match", "nonlocal|10", "not", "or", "pass", "raise", "return", "try", "while", "with", "yield"], o = { $pattern: /[A-Za-z]\w+|__\w+__/, keyword: a, built_in: ["__import__", "abs", "all", "any", "ascii", "bin", "bool", "breakpoint", "bytearray", "bytes", "callable", "chr", "classmethod", "compile", "complex", "delattr", "dict", "dir", "divmod", "enumerate", "eval", "exec", "filter", "float", "format", "frozenset", "getattr", "globals", "hasattr", "hash", "help", "hex", "id", "input", "int", "isinstance", "issubclass", "iter", "len", "list", "locals", "map", "max", "memoryview", "min", "next", "object", "oct", "open", "ord", "pow", "print", "property", "range", "repr", "reversed", "round", "set", "setattr", "slice", "sorted", "staticmethod", "str", "sum", "super", "tuple", "type", "vars", "zip"], literal: ["__debug__", "Ellipsis", "False", "None", "NotImplemented", "True"], type: ["Any", "Callable", "Coroutine", "Dict", "List", "Literal", "Generic", "Optional", "Sequence", "Set", "Tuple", "Type", "Union"] }, d = { className: "meta", begin: /^(>>>|\.\.\.) / }, c = { className: "subst", begin: /\{/, end: /\}/, keywords: o, illegal: /#/ }, u = { begin: /\{\{/, relevance: 0 }, m = { className: "string", contains: [e.BACKSLASH_ESCAPE], variants: [{ begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?'''/, end: /'''/, contains: [e.BACKSLASH_ESCAPE, d], relevance: 10 }, { begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?"""/, end: /"""/, contains: [e.BACKSLASH_ESCAPE, d], relevance: 10 }, { begin: /([fF][rR]|[rR][fF]|[fF])'''/, end: /'''/, contains: [e.BACKSLASH_ESCAPE, d, u, c] }, { begin: /([fF][rR]|[rR][fF]|[fF])"""/, end: /"""/, contains: [e.BACKSLASH_ESCAPE, d, u, c] }, { begin: /([uU]|[rR])'/, end: /'/, relevance: 10 }, { begin: /([uU]|[rR])"/, end: /"/, relevance: 10 }, { begin: /([bB]|[bB][rR]|[rR][bB])'/, end: /'/ }, { begin: /([bB]|[bB][rR]|[rR][bB])"/, end: /"/ }, { begin: /([fF][rR]|[rR][fF]|[fF])'/, end: /'/, contains: [e.BACKSLASH_ESCAPE, u, c] }, { begin: /([fF][rR]|[rR][fF]|[fF])"/, end: /"/, contains: [e.BACKSLASH_ESCAPE, u, c] }, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE] }, b = "[0-9](_?[0-9])*", f = `(\\b(${b}))?\\.(${b})|\\b(${b})\\.`, S = `\\b|${a.join("|")}`, E = { className: "number", relevance: 0, variants: [{ begin: `(\\b(${b})|(${f}))[eE][+-]?(${b})[jJ]?(?=${S})` }, { begin: `(${f})[jJ]?` }, { begin: `\\b([1-9](_?[0-9])*|0+(_?0)*)[lLjJ]?(?=${S})` }, { begin: `\\b0[bB](_?[01])+[lL]?(?=${S})` }, { begin: `\\b0[oO](_?[0-7])+[lL]?(?=${S})` }, { begin: `\\b0[xX](_?[0-9a-fA-F])+[lL]?(?=${S})` }, { begin: `\\b(${b})[jJ](?=${S})` }] }, y = { className: "comment", begin: t.lookahead(/# type:/), end: /$/, keywords: o, contains: [{ begin: /# type:/ }, { begin: /#/, end: /\b\B/, endsWithParent: true }] }, w = { className: "params", variants: [{ className: "", begin: /\(\s*\)/, skip: true }, { begin: /\(/, end: /\)/, excludeBegin: true, excludeEnd: true, keywords: o, contains: ["self", d, E, m, e.HASH_COMMENT_MODE] }] };
  return c.contains = [m, E, d], { name: "Python", aliases: ["py", "gyp", "ipython"], unicodeRegex: true, keywords: o, illegal: /(<\/|\?)|=>/, contains: [d, E, { scope: "variable.language", match: /\bself\b/ }, { beginKeywords: "if", relevance: 0 }, { match: /\bor\b/, scope: "keyword" }, m, y, e.HASH_COMMENT_MODE, { match: [/\bdef/, /\s+/, i], scope: { 1: "keyword", 3: "title.function" }, contains: [w] }, { variants: [{ match: [/\bclass/, /\s+/, i, /\s*/, /\(\s*/, i, /\s*\)/] }, { match: [/\bclass/, /\s+/, i] }], scope: { 1: "keyword", 3: "title.class", 6: "title.class.inherited" } }, { className: "meta", begin: /^[\t ]*@/, end: /(?=#)|$/, contains: [E, w, m] }] };
}
function Hi(e) {
  return { aliases: ["pycon"], contains: [{ className: "meta.prompt", starts: { end: / |$/, starts: { end: "$", subLanguage: "python" } }, variants: [{ begin: /^>>>(?=[ ]|$)/ }, { begin: /^\.\.\.(?=[ ]|$)/ }] }] };
}
function Wi(e) {
  const t = e.regex, i = /(?:(?:[a-zA-Z]|\.[._a-zA-Z])[._a-zA-Z0-9]*)|\.(?!\d)/, a = t.either(/0[xX][0-9a-fA-F]+\.[0-9a-fA-F]*[pP][+-]?\d+i?/, /0[xX][0-9a-fA-F]+(?:[pP][+-]?\d+)?[Li]?/, /(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?[Li]?/), r = /[=!<>:]=|\|\||&&|:::?|<-|<<-|->>|->|\|>|[-+*\/?!$&|:<=>@^~]|\*\*/, g = t.either(/[()]/, /[{}]/, /\[\[/, /[[\]]/, /\\/, /,/);
  return { name: "R", keywords: { $pattern: i, keyword: "function if in break next repeat else for while", literal: "NULL NA TRUE FALSE Inf NaN NA_integer_|10 NA_real_|10 NA_character_|10 NA_complex_|10", built_in: "LETTERS letters month.abb month.name pi T F abs acos acosh all any anyNA Arg as.call as.character as.complex as.double as.environment as.integer as.logical as.null.default as.numeric as.raw asin asinh atan atanh attr attributes baseenv browser c call ceiling class Conj cos cosh cospi cummax cummin cumprod cumsum digamma dim dimnames emptyenv exp expression floor forceAndCall gamma gc.time globalenv Im interactive invisible is.array is.atomic is.call is.character is.complex is.double is.environment is.expression is.finite is.function is.infinite is.integer is.language is.list is.logical is.matrix is.na is.name is.nan is.null is.numeric is.object is.pairlist is.raw is.recursive is.single is.symbol lazyLoadDBfetch length lgamma list log max min missing Mod names nargs nzchar oldClass on.exit pos.to.env proc.time prod quote range Re rep retracemem return round seq_along seq_len seq.int sign signif sin sinh sinpi sqrt standardGeneric substitute sum switch tan tanh tanpi tracemem trigamma trunc unclass untracemem UseMethod xtfrm" }, contains: [e.COMMENT(/#'/, /$/, { contains: [{ scope: "doctag", match: /@examples/, starts: { end: t.lookahead(t.either(/\n^#'\s*(?=@[a-zA-Z]+)/, /\n^(?!#')/)), endsParent: true } }, { scope: "doctag", begin: "@param", end: /$/, contains: [{ scope: "variable", variants: [{ match: i }, { match: /`(?:\\.|[^`\\])+`/ }], endsParent: true }] }, { scope: "doctag", match: /@[a-zA-Z]+/ }, { scope: "keyword", match: /\\[a-zA-Z]+/ }] }), e.HASH_COMMENT_MODE, { scope: "string", contains: [e.BACKSLASH_ESCAPE], variants: [e.END_SAME_AS_BEGIN({ begin: /[rR]"(-*)\(/, end: /\)(-*)"/ }), e.END_SAME_AS_BEGIN({ begin: /[rR]"(-*)\{/, end: /\}(-*)"/ }), e.END_SAME_AS_BEGIN({ begin: /[rR]"(-*)\[/, end: /\](-*)"/ }), e.END_SAME_AS_BEGIN({ begin: /[rR]'(-*)\(/, end: /\)(-*)'/ }), e.END_SAME_AS_BEGIN({ begin: /[rR]'(-*)\{/, end: /\}(-*)'/ }), e.END_SAME_AS_BEGIN({ begin: /[rR]'(-*)\[/, end: /\](-*)'/ }), { begin: '"', end: '"', relevance: 0 }, { begin: "'", end: "'", relevance: 0 }] }, { relevance: 0, variants: [{ scope: { 1: "operator", 2: "number" }, match: [r, a] }, { scope: { 1: "operator", 2: "number" }, match: [/%[^%]*%/, a] }, { scope: { 1: "punctuation", 2: "number" }, match: [g, a] }, { scope: { 2: "number" }, match: [/[^a-zA-Z0-9._]|^/, a] }] }, { scope: { 3: "operator" }, match: [i, /\s+/, /<-/, /\s+/] }, { scope: "operator", relevance: 0, variants: [{ match: r }, { match: /%[^%]*%/ }] }, { scope: "punctuation", relevance: 0, match: g }, { begin: "`", end: "`", contains: [{ begin: /\\./ }] }] };
}
function qi(e) {
  const t = e.regex, i = "([a-zA-Z_]\\w*[!?=]?|[-+~]@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?)", a = t.either(/\b([A-Z]+[a-z0-9]+)+/, /\b([A-Z]+[a-z0-9]+)+[A-Z]+/), r = t.concat(a, /(::\w+)*/), s = { "variable.constant": ["__FILE__", "__LINE__", "__ENCODING__"], "variable.language": ["self", "super"], keyword: ["alias", "and", "begin", "BEGIN", "break", "case", "class", "defined", "do", "else", "elsif", "end", "END", "ensure", "for", "if", "in", "module", "next", "not", "or", "redo", "require", "rescue", "retry", "return", "then", "undef", "unless", "until", "when", "while", "yield", ...["include", "extend", "prepend", "public", "private", "protected", "raise", "throw"]], built_in: ["proc", "lambda", "attr_accessor", "attr_reader", "attr_writer", "define_method", "private_constant", "module_function"], literal: ["true", "false", "nil"] }, o = { className: "doctag", begin: "@[A-Za-z]+" }, d = { begin: "#<", end: ">" }, c = [e.COMMENT("#", "$", { contains: [o] }), e.COMMENT("^=begin", "^=end", { contains: [o], relevance: 10 }), e.COMMENT("^__END__", e.MATCH_NOTHING_RE)], u = { className: "subst", begin: /#\{/, end: /\}/, keywords: s }, m = { className: "string", contains: [e.BACKSLASH_ESCAPE, u], variants: [{ begin: /'/, end: /'/ }, { begin: /"/, end: /"/ }, { begin: /`/, end: /`/ }, { begin: /%[qQwWx]?\(/, end: /\)/ }, { begin: /%[qQwWx]?\[/, end: /\]/ }, { begin: /%[qQwWx]?\{/, end: /\}/ }, { begin: /%[qQwWx]?</, end: />/ }, { begin: /%[qQwWx]?\//, end: /\// }, { begin: /%[qQwWx]?%/, end: /%/ }, { begin: /%[qQwWx]?-/, end: /-/ }, { begin: /%[qQwWx]?\|/, end: /\|/ }, { begin: /\B\?(\\\d{1,3})/ }, { begin: /\B\?(\\x[A-Fa-f0-9]{1,2})/ }, { begin: /\B\?(\\u\{?[A-Fa-f0-9]{1,6}\}?)/ }, { begin: /\B\?(\\M-\\C-|\\M-\\c|\\c\\M-|\\M-|\\C-\\M-)[\x20-\x7e]/ }, { begin: /\B\?\\(c|C-)[\x20-\x7e]/ }, { begin: /\B\?\\?\S/ }, { begin: t.concat(/<<[-~]?'?/, t.lookahead(/(\w+)(?=\W)[^\n]*\n(?:[^\n]*\n)*?\s*\1\b/)), contains: [e.END_SAME_AS_BEGIN({ begin: /(\w+)/, end: /(\w+)/, contains: [e.BACKSLASH_ESCAPE, u] })] }] }, b = "[1-9](_?[0-9])*|0", f = "[0-9](_?[0-9])*", S = { className: "number", relevance: 0, variants: [{ begin: `\\b(${b})(\\.(${f}))?([eE][+-]?(${f})|r)?i?\\b` }, { begin: "\\b0[dD][0-9](_?[0-9])*r?i?\\b" }, { begin: "\\b0[bB][0-1](_?[0-1])*r?i?\\b" }, { begin: "\\b0[oO][0-7](_?[0-7])*r?i?\\b" }, { begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*r?i?\\b" }, { begin: "\\b0(_?[0-7])+r?i?\\b" }] }, E = { variants: [{ match: /\(\)/ }, { className: "params", begin: /\(/, end: /(?=\))/, excludeBegin: true, endsParent: true, keywords: s }] }, C = [m, { variants: [{ match: [/class\s+/, r, /\s+<\s+/, r] }, { match: [/\b(class|module)\s+/, r] }], scope: { 2: "title.class", 4: "title.class.inherited" }, keywords: s }, { match: [/(include|extend)\s+/, r], scope: { 2: "title.class" }, keywords: s }, { relevance: 0, match: [r, /\.new[. (]/], scope: { 1: "title.class" } }, { relevance: 0, match: /\b[A-Z][A-Z_0-9]+\b/, className: "variable.constant" }, { relevance: 0, match: a, scope: "title.class" }, { match: [/def/, /\s+/, i], scope: { 1: "keyword", 3: "title.function" }, contains: [E] }, { begin: e.IDENT_RE + "::" }, { className: "symbol", begin: e.UNDERSCORE_IDENT_RE + "(!|\\?)?:", relevance: 0 }, { className: "symbol", begin: ":(?!\\s)", contains: [m, { begin: i }], relevance: 0 }, S, { className: "variable", begin: "(\\$\\W)|((\\$|@@?)(\\w+))(?=[^@$?])(?![A-Za-z])(?![@$?'])" }, { className: "params", begin: /\|(?!=)/, end: /\|/, excludeBegin: true, excludeEnd: true, relevance: 0, keywords: s }, { begin: "(" + e.RE_STARTERS_RE + "|unless)\\s*", keywords: "unless", contains: [{ className: "regexp", contains: [e.BACKSLASH_ESCAPE, u], illegal: /\n/, variants: [{ begin: "/", end: "/[a-z]*" }, { begin: /%r\{/, end: /\}[a-z]*/ }, { begin: "%r\\(", end: "\\)[a-z]*" }, { begin: "%r!", end: "![a-z]*" }, { begin: "%r\\[", end: "\\][a-z]*" }] }].concat(d, c), relevance: 0 }].concat(d, c);
  u.contains = C, E.contains = C;
  const oe = [{ begin: /^\s*=>/, starts: { end: "$", contains: C } }, { className: "meta.prompt", begin: "^([>?]>|[\\w#]+\\(\\w+\\):\\d+:\\d+[>*]|(\\w+-)?\\d+\\.\\d+\\.\\d+(p\\d+)?[^\\d][^>]+>)(?=[ ])", starts: { end: "$", keywords: s, contains: C } }];
  return c.unshift(d), { name: "Ruby", aliases: ["rb", "gemspec", "podspec", "thor", "irb"], keywords: s, illegal: /\/\*/, contains: [e.SHEBANG({ binary: "ruby" })].concat(oe).concat(c).concat(C) };
}
function Yi(e) {
  const t = e.regex, i = /(r#)?/, a = t.concat(i, e.UNDERSCORE_IDENT_RE), r = t.concat(i, e.IDENT_RE), g = { className: "title.function.invoke", relevance: 0, begin: t.concat(/\b/, /(?!let|for|while|if|else|match\b)/, r, t.lookahead(/\s*\(/)) }, s = "([ui](8|16|32|64|128|size)|f(32|64))?", o = ["abstract", "as", "async", "await", "become", "box", "break", "const", "continue", "crate", "do", "dyn", "else", "enum", "extern", "false", "final", "fn", "for", "if", "impl", "in", "let", "loop", "macro", "match", "mod", "move", "mut", "override", "priv", "pub", "ref", "return", "self", "Self", "static", "struct", "super", "trait", "true", "try", "type", "typeof", "union", "unsafe", "unsized", "use", "virtual", "where", "while", "yield"], d = ["true", "false", "Some", "None", "Ok", "Err"], c = ["drop ", "Copy", "Send", "Sized", "Sync", "Drop", "Fn", "FnMut", "FnOnce", "ToOwned", "Clone", "Debug", "PartialEq", "PartialOrd", "Eq", "Ord", "AsRef", "AsMut", "Into", "From", "Default", "Iterator", "Extend", "IntoIterator", "DoubleEndedIterator", "ExactSizeIterator", "SliceConcatExt", "ToString", "assert!", "assert_eq!", "bitflags!", "bytes!", "cfg!", "col!", "concat!", "concat_idents!", "debug_assert!", "debug_assert_eq!", "env!", "eprintln!", "panic!", "file!", "format!", "format_args!", "include_bytes!", "include_str!", "line!", "local_data_key!", "module_path!", "option_env!", "print!", "println!", "select!", "stringify!", "try!", "unimplemented!", "unreachable!", "vec!", "write!", "writeln!", "macro_rules!", "assert_ne!", "debug_assert_ne!"], u = ["i8", "i16", "i32", "i64", "i128", "isize", "u8", "u16", "u32", "u64", "u128", "usize", "f32", "f64", "str", "char", "bool", "Box", "Option", "Result", "String", "Vec"];
  return { name: "Rust", aliases: ["rs"], keywords: { $pattern: e.IDENT_RE + "!?", type: u, keyword: o, literal: d, built_in: c }, illegal: "</", contains: [e.C_LINE_COMMENT_MODE, e.COMMENT("/\\*", "\\*/", { contains: ["self"] }), e.inherit(e.QUOTE_STRING_MODE, { begin: /b?"/, illegal: null }), { className: "symbol", begin: /'[a-zA-Z_][a-zA-Z0-9_]*(?!')/ }, { scope: "string", variants: [{ begin: /b?r(#*)"(.|\n)*?"\1(?!#)/ }, { begin: /b?'/, end: /'/, contains: [{ scope: "char.escape", match: /\\('|\w|x\w{2}|u\w{4}|U\w{8})/ }] }] }, { className: "number", variants: [{ begin: "\\b0b([01_]+)" + s }, { begin: "\\b0o([0-7_]+)" + s }, { begin: "\\b0x([A-Fa-f0-9_]+)" + s }, { begin: "\\b(\\d[\\d_]*(\\.[0-9_]+)?([eE][+-]?[0-9_]+)?)" + s }], relevance: 0 }, { begin: [/fn/, /\s+/, a], className: { 1: "keyword", 3: "title.function" } }, { className: "meta", begin: "#!?\\[", end: "\\]", contains: [{ className: "string", begin: /"/, end: /"/, contains: [e.BACKSLASH_ESCAPE] }] }, { begin: [/let/, /\s+/, /(?:mut\s+)?/, a], className: { 1: "keyword", 3: "keyword", 4: "variable" } }, { begin: [/for/, /\s+/, a, /\s+/, /in/], className: { 1: "keyword", 3: "variable", 5: "keyword" } }, { begin: [/type/, /\s+/, a], className: { 1: "keyword", 3: "title.class" } }, { begin: [/(?:trait|enum|struct|union|impl|for)/, /\s+/, a], className: { 1: "keyword", 3: "title.class" } }, { begin: e.IDENT_RE + "::", keywords: { keyword: "Self", built_in: c, type: u } }, { className: "punctuation", begin: "->" }, g] };
}
const Zi = (e) => ({ IMPORTANT: { scope: "meta", begin: "!important" }, BLOCK_COMMENT: e.C_BLOCK_COMMENT_MODE, HEXCOLOR: { scope: "number", begin: /#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\b/ }, FUNCTION_DISPATCH: { className: "built_in", begin: /[\w-]+(?=\()/ }, ATTRIBUTE_SELECTOR_MODE: { scope: "selector-attr", begin: /\[/, end: /\]/, illegal: "$", contains: [e.APOS_STRING_MODE, e.QUOTE_STRING_MODE] }, CSS_NUMBER_MODE: { scope: "number", begin: e.NUMBER_RE + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?", relevance: 0 }, CSS_VARIABLE: { className: "attr", begin: /--[A-Za-z_][A-Za-z0-9_-]*/ } }), Vi = ["a", "abbr", "address", "article", "aside", "audio", "b", "blockquote", "body", "button", "canvas", "caption", "cite", "code", "dd", "del", "details", "dfn", "div", "dl", "dt", "em", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "mark", "menu", "nav", "object", "ol", "optgroup", "option", "p", "picture", "q", "quote", "samp", "section", "select", "source", "span", "strong", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "tr", "ul", "var", "video"], Xi = ["defs", "g", "marker", "mask", "pattern", "svg", "switch", "symbol", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feFlood", "feGaussianBlur", "feImage", "feMerge", "feMorphology", "feOffset", "feSpecularLighting", "feTile", "feTurbulence", "linearGradient", "radialGradient", "stop", "circle", "ellipse", "image", "line", "path", "polygon", "polyline", "rect", "text", "use", "textPath", "tspan", "foreignObject", "clipPath"], Qi = [...Vi, ...Xi], Ji = ["any-hover", "any-pointer", "aspect-ratio", "color", "color-gamut", "color-index", "device-aspect-ratio", "device-height", "device-width", "display-mode", "forced-colors", "grid", "height", "hover", "inverted-colors", "monochrome", "orientation", "overflow-block", "overflow-inline", "pointer", "prefers-color-scheme", "prefers-contrast", "prefers-reduced-motion", "prefers-reduced-transparency", "resolution", "scan", "scripting", "update", "width", "min-width", "max-width", "min-height", "max-height"].sort().reverse(), ji = ["active", "any-link", "blank", "checked", "current", "default", "defined", "dir", "disabled", "drop", "empty", "enabled", "first", "first-child", "first-of-type", "fullscreen", "future", "focus", "focus-visible", "focus-within", "has", "host", "host-context", "hover", "indeterminate", "in-range", "invalid", "is", "lang", "last-child", "last-of-type", "left", "link", "local-link", "not", "nth-child", "nth-col", "nth-last-child", "nth-last-col", "nth-last-of-type", "nth-of-type", "only-child", "only-of-type", "optional", "out-of-range", "past", "placeholder-shown", "read-only", "read-write", "required", "right", "root", "scope", "target", "target-within", "user-invalid", "valid", "visited", "where"].sort().reverse(), ea = ["after", "backdrop", "before", "cue", "cue-region", "first-letter", "first-line", "grammar-error", "marker", "part", "placeholder", "selection", "slotted", "spelling-error"].sort().reverse(), ta = ["accent-color", "align-content", "align-items", "align-self", "alignment-baseline", "all", "anchor-name", "animation", "animation-composition", "animation-delay", "animation-direction", "animation-duration", "animation-fill-mode", "animation-iteration-count", "animation-name", "animation-play-state", "animation-range", "animation-range-end", "animation-range-start", "animation-timeline", "animation-timing-function", "appearance", "aspect-ratio", "backdrop-filter", "backface-visibility", "background", "background-attachment", "background-blend-mode", "background-clip", "background-color", "background-image", "background-origin", "background-position", "background-position-x", "background-position-y", "background-repeat", "background-size", "baseline-shift", "block-size", "border", "border-block", "border-block-color", "border-block-end", "border-block-end-color", "border-block-end-style", "border-block-end-width", "border-block-start", "border-block-start-color", "border-block-start-style", "border-block-start-width", "border-block-style", "border-block-width", "border-bottom", "border-bottom-color", "border-bottom-left-radius", "border-bottom-right-radius", "border-bottom-style", "border-bottom-width", "border-collapse", "border-color", "border-end-end-radius", "border-end-start-radius", "border-image", "border-image-outset", "border-image-repeat", "border-image-slice", "border-image-source", "border-image-width", "border-inline", "border-inline-color", "border-inline-end", "border-inline-end-color", "border-inline-end-style", "border-inline-end-width", "border-inline-start", "border-inline-start-color", "border-inline-start-style", "border-inline-start-width", "border-inline-style", "border-inline-width", "border-left", "border-left-color", "border-left-style", "border-left-width", "border-radius", "border-right", "border-right-color", "border-right-style", "border-right-width", "border-spacing", "border-start-end-radius", "border-start-start-radius", "border-style", "border-top", "border-top-color", "border-top-left-radius", "border-top-right-radius", "border-top-style", "border-top-width", "border-width", "bottom", "box-align", "box-decoration-break", "box-direction", "box-flex", "box-flex-group", "box-lines", "box-ordinal-group", "box-orient", "box-pack", "box-shadow", "box-sizing", "break-after", "break-before", "break-inside", "caption-side", "caret-color", "clear", "clip", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "color-scheme", "column-count", "column-fill", "column-gap", "column-rule", "column-rule-color", "column-rule-style", "column-rule-width", "column-span", "column-width", "columns", "contain", "contain-intrinsic-block-size", "contain-intrinsic-height", "contain-intrinsic-inline-size", "contain-intrinsic-size", "contain-intrinsic-width", "container", "container-name", "container-type", "content", "content-visibility", "counter-increment", "counter-reset", "counter-set", "cue", "cue-after", "cue-before", "cursor", "cx", "cy", "direction", "display", "dominant-baseline", "empty-cells", "enable-background", "field-sizing", "fill", "fill-opacity", "fill-rule", "filter", "flex", "flex-basis", "flex-direction", "flex-flow", "flex-grow", "flex-shrink", "flex-wrap", "float", "flood-color", "flood-opacity", "flow", "font", "font-display", "font-family", "font-feature-settings", "font-kerning", "font-language-override", "font-optical-sizing", "font-palette", "font-size", "font-size-adjust", "font-smooth", "font-smoothing", "font-stretch", "font-style", "font-synthesis", "font-synthesis-position", "font-synthesis-small-caps", "font-synthesis-style", "font-synthesis-weight", "font-variant", "font-variant-alternates", "font-variant-caps", "font-variant-east-asian", "font-variant-emoji", "font-variant-ligatures", "font-variant-numeric", "font-variant-position", "font-variation-settings", "font-weight", "forced-color-adjust", "gap", "glyph-orientation-horizontal", "glyph-orientation-vertical", "grid", "grid-area", "grid-auto-columns", "grid-auto-flow", "grid-auto-rows", "grid-column", "grid-column-end", "grid-column-start", "grid-gap", "grid-row", "grid-row-end", "grid-row-start", "grid-template", "grid-template-areas", "grid-template-columns", "grid-template-rows", "hanging-punctuation", "height", "hyphenate-character", "hyphenate-limit-chars", "hyphens", "icon", "image-orientation", "image-rendering", "image-resolution", "ime-mode", "initial-letter", "initial-letter-align", "inline-size", "inset", "inset-area", "inset-block", "inset-block-end", "inset-block-start", "inset-inline", "inset-inline-end", "inset-inline-start", "isolation", "justify-content", "justify-items", "justify-self", "kerning", "left", "letter-spacing", "lighting-color", "line-break", "line-height", "line-height-step", "list-style", "list-style-image", "list-style-position", "list-style-type", "margin", "margin-block", "margin-block-end", "margin-block-start", "margin-bottom", "margin-inline", "margin-inline-end", "margin-inline-start", "margin-left", "margin-right", "margin-top", "margin-trim", "marker", "marker-end", "marker-mid", "marker-start", "marks", "mask", "mask-border", "mask-border-mode", "mask-border-outset", "mask-border-repeat", "mask-border-slice", "mask-border-source", "mask-border-width", "mask-clip", "mask-composite", "mask-image", "mask-mode", "mask-origin", "mask-position", "mask-repeat", "mask-size", "mask-type", "masonry-auto-flow", "math-depth", "math-shift", "math-style", "max-block-size", "max-height", "max-inline-size", "max-width", "min-block-size", "min-height", "min-inline-size", "min-width", "mix-blend-mode", "nav-down", "nav-index", "nav-left", "nav-right", "nav-up", "none", "normal", "object-fit", "object-position", "offset", "offset-anchor", "offset-distance", "offset-path", "offset-position", "offset-rotate", "opacity", "order", "orphans", "outline", "outline-color", "outline-offset", "outline-style", "outline-width", "overflow", "overflow-anchor", "overflow-block", "overflow-clip-margin", "overflow-inline", "overflow-wrap", "overflow-x", "overflow-y", "overlay", "overscroll-behavior", "overscroll-behavior-block", "overscroll-behavior-inline", "overscroll-behavior-x", "overscroll-behavior-y", "padding", "padding-block", "padding-block-end", "padding-block-start", "padding-bottom", "padding-inline", "padding-inline-end", "padding-inline-start", "padding-left", "padding-right", "padding-top", "page", "page-break-after", "page-break-before", "page-break-inside", "paint-order", "pause", "pause-after", "pause-before", "perspective", "perspective-origin", "place-content", "place-items", "place-self", "pointer-events", "position", "position-anchor", "position-visibility", "print-color-adjust", "quotes", "r", "resize", "rest", "rest-after", "rest-before", "right", "rotate", "row-gap", "ruby-align", "ruby-position", "scale", "scroll-behavior", "scroll-margin", "scroll-margin-block", "scroll-margin-block-end", "scroll-margin-block-start", "scroll-margin-bottom", "scroll-margin-inline", "scroll-margin-inline-end", "scroll-margin-inline-start", "scroll-margin-left", "scroll-margin-right", "scroll-margin-top", "scroll-padding", "scroll-padding-block", "scroll-padding-block-end", "scroll-padding-block-start", "scroll-padding-bottom", "scroll-padding-inline", "scroll-padding-inline-end", "scroll-padding-inline-start", "scroll-padding-left", "scroll-padding-right", "scroll-padding-top", "scroll-snap-align", "scroll-snap-stop", "scroll-snap-type", "scroll-timeline", "scroll-timeline-axis", "scroll-timeline-name", "scrollbar-color", "scrollbar-gutter", "scrollbar-width", "shape-image-threshold", "shape-margin", "shape-outside", "shape-rendering", "speak", "speak-as", "src", "stop-color", "stop-opacity", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "tab-size", "table-layout", "text-align", "text-align-all", "text-align-last", "text-anchor", "text-combine-upright", "text-decoration", "text-decoration-color", "text-decoration-line", "text-decoration-skip", "text-decoration-skip-ink", "text-decoration-style", "text-decoration-thickness", "text-emphasis", "text-emphasis-color", "text-emphasis-position", "text-emphasis-style", "text-indent", "text-justify", "text-orientation", "text-overflow", "text-rendering", "text-shadow", "text-size-adjust", "text-transform", "text-underline-offset", "text-underline-position", "text-wrap", "text-wrap-mode", "text-wrap-style", "timeline-scope", "top", "touch-action", "transform", "transform-box", "transform-origin", "transform-style", "transition", "transition-behavior", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "translate", "unicode-bidi", "user-modify", "user-select", "vector-effect", "vertical-align", "view-timeline", "view-timeline-axis", "view-timeline-inset", "view-timeline-name", "view-transition-name", "visibility", "voice-balance", "voice-duration", "voice-family", "voice-pitch", "voice-range", "voice-rate", "voice-stress", "voice-volume", "white-space", "white-space-collapse", "widows", "width", "will-change", "word-break", "word-spacing", "word-wrap", "writing-mode", "x", "y", "z-index", "zoom"].sort().reverse();
function na(e) {
  const t = Zi(e), i = ea, a = ji, r = "@[a-z-]+", g = "and or not only", o = { className: "variable", begin: "(\\$[a-zA-Z-][a-zA-Z0-9_-]*)\\b", relevance: 0 };
  return { name: "SCSS", case_insensitive: true, illegal: "[=/|']", contains: [e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, t.CSS_NUMBER_MODE, { className: "selector-id", begin: "#[A-Za-z0-9_-]+", relevance: 0 }, { className: "selector-class", begin: "\\.[A-Za-z0-9_-]+", relevance: 0 }, t.ATTRIBUTE_SELECTOR_MODE, { className: "selector-tag", begin: "\\b(" + Qi.join("|") + ")\\b", relevance: 0 }, { className: "selector-pseudo", begin: ":(" + a.join("|") + ")" }, { className: "selector-pseudo", begin: ":(:)?(" + i.join("|") + ")" }, o, { begin: /\(/, end: /\)/, contains: [t.CSS_NUMBER_MODE] }, t.CSS_VARIABLE, { className: "attribute", begin: "\\b(" + ta.join("|") + ")\\b" }, { begin: "\\b(whitespace|wait|w-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|sw-resize|super|strict|static|square|solid|small-caps|separate|se-resize|scroll|s-resize|rtl|row-resize|ridge|right|repeat|repeat-y|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|ne-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b" }, { begin: /:/, end: /[;}{]/, relevance: 0, contains: [t.BLOCK_COMMENT, o, t.HEXCOLOR, t.CSS_NUMBER_MODE, e.QUOTE_STRING_MODE, e.APOS_STRING_MODE, t.IMPORTANT, t.FUNCTION_DISPATCH] }, { begin: "@(page|font-face)", keywords: { $pattern: r, keyword: "@page @font-face" } }, { begin: "@", end: "[{;]", returnBegin: true, keywords: { $pattern: /[a-z-]+/, keyword: g, attribute: Ji.join(" ") }, contains: [{ begin: r, className: "keyword" }, { begin: /[a-z-]+(?=:)/, className: "attribute" }, o, e.QUOTE_STRING_MODE, e.APOS_STRING_MODE, t.HEXCOLOR, t.CSS_NUMBER_MODE] }, t.FUNCTION_DISPATCH] };
}
function ia(e) {
  return { name: "Shell Session", aliases: ["console", "shellsession"], contains: [{ className: "meta.prompt", begin: /^\s{0,3}[/~\w\d[\]()@-]*[>%$#][ ]?/, starts: { end: /[^\\](?=\s*$)/, subLanguage: "bash" } }] };
}
function aa(e) {
  const t = e.regex, i = e.COMMENT("--", "$"), a = { scope: "string", variants: [{ begin: /'/, end: /'/, contains: [{ match: /''/ }] }] }, r = { begin: /"/, end: /"/, contains: [{ match: /""/ }] }, g = ["true", "false", "unknown"], s = ["double precision", "large object", "with timezone", "without timezone"], o = ["bigint", "binary", "blob", "boolean", "char", "character", "clob", "date", "dec", "decfloat", "decimal", "float", "int", "integer", "interval", "nchar", "nclob", "national", "numeric", "real", "row", "smallint", "time", "timestamp", "varchar", "varying", "varbinary"], d = ["add", "asc", "collation", "desc", "final", "first", "last", "view"], c = ["abs", "acos", "all", "allocate", "alter", "and", "any", "are", "array", "array_agg", "array_max_cardinality", "as", "asensitive", "asin", "asymmetric", "at", "atan", "atomic", "authorization", "avg", "begin", "begin_frame", "begin_partition", "between", "bigint", "binary", "blob", "boolean", "both", "by", "call", "called", "cardinality", "cascaded", "case", "cast", "ceil", "ceiling", "char", "char_length", "character", "character_length", "check", "classifier", "clob", "close", "coalesce", "collate", "collect", "column", "commit", "condition", "connect", "constraint", "contains", "convert", "copy", "corr", "corresponding", "cos", "cosh", "count", "covar_pop", "covar_samp", "create", "cross", "cube", "cume_dist", "current", "current_catalog", "current_date", "current_default_transform_group", "current_path", "current_role", "current_row", "current_schema", "current_time", "current_timestamp", "current_path", "current_role", "current_transform_group_for_type", "current_user", "cursor", "cycle", "date", "day", "deallocate", "dec", "decimal", "decfloat", "declare", "default", "define", "delete", "dense_rank", "deref", "describe", "deterministic", "disconnect", "distinct", "double", "drop", "dynamic", "each", "element", "else", "empty", "end", "end_frame", "end_partition", "end-exec", "equals", "escape", "every", "except", "exec", "execute", "exists", "exp", "external", "extract", "false", "fetch", "filter", "first_value", "float", "floor", "for", "foreign", "frame_row", "free", "from", "full", "function", "fusion", "get", "global", "grant", "group", "grouping", "groups", "having", "hold", "hour", "identity", "in", "indicator", "initial", "inner", "inout", "insensitive", "insert", "int", "integer", "intersect", "intersection", "interval", "into", "is", "join", "json_array", "json_arrayagg", "json_exists", "json_object", "json_objectagg", "json_query", "json_table", "json_table_primitive", "json_value", "lag", "language", "large", "last_value", "lateral", "lead", "leading", "left", "like", "like_regex", "listagg", "ln", "local", "localtime", "localtimestamp", "log", "log10", "lower", "match", "match_number", "match_recognize", "matches", "max", "member", "merge", "method", "min", "minute", "mod", "modifies", "module", "month", "multiset", "national", "natural", "nchar", "nclob", "new", "no", "none", "normalize", "not", "nth_value", "ntile", "null", "nullif", "numeric", "octet_length", "occurrences_regex", "of", "offset", "old", "omit", "on", "one", "only", "open", "or", "order", "out", "outer", "over", "overlaps", "overlay", "parameter", "partition", "pattern", "per", "percent", "percent_rank", "percentile_cont", "percentile_disc", "period", "portion", "position", "position_regex", "power", "precedes", "precision", "prepare", "primary", "procedure", "ptf", "range", "rank", "reads", "real", "recursive", "ref", "references", "referencing", "regr_avgx", "regr_avgy", "regr_count", "regr_intercept", "regr_r2", "regr_slope", "regr_sxx", "regr_sxy", "regr_syy", "release", "result", "return", "returns", "revoke", "right", "rollback", "rollup", "row", "row_number", "rows", "running", "savepoint", "scope", "scroll", "search", "second", "seek", "select", "sensitive", "session_user", "set", "show", "similar", "sin", "sinh", "skip", "smallint", "some", "specific", "specifictype", "sql", "sqlexception", "sqlstate", "sqlwarning", "sqrt", "start", "static", "stddev_pop", "stddev_samp", "submultiset", "subset", "substring", "substring_regex", "succeeds", "sum", "symmetric", "system", "system_time", "system_user", "table", "tablesample", "tan", "tanh", "then", "time", "timestamp", "timezone_hour", "timezone_minute", "to", "trailing", "translate", "translate_regex", "translation", "treat", "trigger", "trim", "trim_array", "true", "truncate", "uescape", "union", "unique", "unknown", "unnest", "update", "upper", "user", "using", "value", "values", "value_of", "var_pop", "var_samp", "varbinary", "varchar", "varying", "versioning", "when", "whenever", "where", "width_bucket", "window", "with", "within", "without", "year"], u = ["abs", "acos", "array_agg", "asin", "atan", "avg", "cast", "ceil", "ceiling", "coalesce", "corr", "cos", "cosh", "count", "covar_pop", "covar_samp", "cume_dist", "dense_rank", "deref", "element", "exp", "extract", "first_value", "floor", "json_array", "json_arrayagg", "json_exists", "json_object", "json_objectagg", "json_query", "json_table", "json_table_primitive", "json_value", "lag", "last_value", "lead", "listagg", "ln", "log", "log10", "lower", "max", "min", "mod", "nth_value", "ntile", "nullif", "percent_rank", "percentile_cont", "percentile_disc", "position", "position_regex", "power", "rank", "regr_avgx", "regr_avgy", "regr_count", "regr_intercept", "regr_r2", "regr_slope", "regr_sxx", "regr_sxy", "regr_syy", "row_number", "sin", "sinh", "sqrt", "stddev_pop", "stddev_samp", "substring", "substring_regex", "sum", "tan", "tanh", "translate", "translate_regex", "treat", "trim", "trim_array", "unnest", "upper", "value_of", "var_pop", "var_samp", "width_bucket"], m = ["current_catalog", "current_date", "current_default_transform_group", "current_path", "current_role", "current_schema", "current_transform_group_for_type", "current_user", "session_user", "system_time", "system_user", "current_time", "localtime", "current_timestamp", "localtimestamp"], b = ["create table", "insert into", "primary key", "foreign key", "not null", "alter table", "add constraint", "grouping sets", "on overflow", "character set", "respect nulls", "ignore nulls", "nulls first", "nulls last", "depth first", "breadth first"], f = u, S = [...c, ...d].filter((L) => !u.includes(L)), E = { scope: "variable", match: /@[a-z0-9][a-z0-9_]*/ }, y = { scope: "operator", match: /[-+*/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?/, relevance: 0 }, w = { match: t.concat(/\b/, t.either(...f), /\s*\(/), relevance: 0, keywords: { built_in: f } };
  function I(L) {
    return t.concat(/\b/, t.either(...L.map((C) => C.replace(/\s+/, "\\s+"))), /\b/);
  }
  const D = { scope: "keyword", match: I(b), relevance: 0 };
  function M(L, { exceptions: C, when: W } = {}) {
    const z = W;
    return C = C || [], L.map((H) => H.match(/\|\d+$/) || C.includes(H) ? H : z(H) ? `${H}|0` : H);
  }
  return { name: "SQL", case_insensitive: true, illegal: /[{}]|<\//, keywords: { $pattern: /\b[\w\.]+/, keyword: M(S, { when: (L) => L.length < 3 }), literal: g, type: o, built_in: m }, contains: [{ scope: "type", match: I(s) }, D, w, E, a, r, e.C_NUMBER_MODE, e.C_BLOCK_COMMENT_MODE, i, y] };
}
function Vt(e) {
  return e ? typeof e == "string" ? e : e.source : null;
}
function xe(e) {
  return $("(?=", e, ")");
}
function $(...e) {
  return e.map((i) => Vt(i)).join("");
}
function ra(e) {
  const t = e[e.length - 1];
  return typeof t == "object" && t.constructor === Object ? (e.splice(e.length - 1, 1), t) : {};
}
function se(...e) {
  return "(" + (ra(e).capture ? "" : "?:") + e.map((a) => Vt(a)).join("|") + ")";
}
const ut = (e) => $(/\b/, e, /\w$/.test(e) ? /\b/ : /\B/), sa = ["Protocol", "Type"].map(ut), Xt = ["init", "self"].map(ut), oa = ["Any", "Self"], gt = ["actor", "any", "associatedtype", "async", "await", /as\?/, /as!/, "as", "borrowing", "break", "case", "catch", "class", "consume", "consuming", "continue", "convenience", "copy", "default", "defer", "deinit", "didSet", "distributed", "do", "dynamic", "each", "else", "enum", "extension", "fallthrough", /fileprivate\(set\)/, "fileprivate", "final", "for", "func", "get", "guard", "if", "import", "indirect", "infix", /init\?/, /init!/, "inout", /internal\(set\)/, "internal", "in", "is", "isolated", "nonisolated", "lazy", "let", "macro", "mutating", "nonmutating", /open\(set\)/, "open", "operator", "optional", "override", "package", "postfix", "precedencegroup", "prefix", /private\(set\)/, "private", "protocol", /public\(set\)/, "public", "repeat", "required", "rethrows", "return", "set", "some", "static", "struct", "subscript", "super", "switch", "throws", "throw", /try\?/, /try!/, "try", "typealias", /unowned\(safe\)/, /unowned\(unsafe\)/, "unowned", "var", "weak", "where", "while", "willSet"], Qt = ["false", "nil", "true"], ca = ["assignment", "associativity", "higherThan", "left", "lowerThan", "none", "right"], la = ["#colorLiteral", "#column", "#dsohandle", "#else", "#elseif", "#endif", "#error", "#file", "#fileID", "#fileLiteral", "#filePath", "#function", "#if", "#imageLiteral", "#keyPath", "#line", "#selector", "#sourceLocation", "#warning"], Jt = ["abs", "all", "any", "assert", "assertionFailure", "debugPrint", "dump", "fatalError", "getVaList", "isKnownUniquelyReferenced", "max", "min", "numericCast", "pointwiseMax", "pointwiseMin", "precondition", "preconditionFailure", "print", "readLine", "repeatElement", "sequence", "stride", "swap", "swift_unboxFromSwiftValueWithType", "transcode", "type", "unsafeBitCast", "unsafeDowncast", "withExtendedLifetime", "withUnsafeMutablePointer", "withUnsafePointer", "withVaList", "withoutActuallyEscaping", "zip"], jt = se(/[/=\-+!*%<>&|^~?]/, /[\u00A1-\u00A7]/, /[\u00A9\u00AB]/, /[\u00AC\u00AE]/, /[\u00B0\u00B1]/, /[\u00B6\u00BB\u00BF\u00D7\u00F7]/, /[\u2016-\u2017]/, /[\u2020-\u2027]/, /[\u2030-\u203E]/, /[\u2041-\u2053]/, /[\u2055-\u205E]/, /[\u2190-\u23FF]/, /[\u2500-\u2775]/, /[\u2794-\u2BFF]/, /[\u2E00-\u2E7F]/, /[\u3001-\u3003]/, /[\u3008-\u3020]/, /[\u3030]/), en = se(jt, /[\u0300-\u036F]/, /[\u1DC0-\u1DFF]/, /[\u20D0-\u20FF]/, /[\uFE00-\uFE0F]/, /[\uFE20-\uFE2F]/), pt = $(jt, en, "*"), tn = se(/[a-zA-Z_]/, /[\u00A8\u00AA\u00AD\u00AF\u00B2-\u00B5\u00B7-\u00BA]/, /[\u00BC-\u00BE\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF]/, /[\u0100-\u02FF\u0370-\u167F\u1681-\u180D\u180F-\u1DBF]/, /[\u1E00-\u1FFF]/, /[\u200B-\u200D\u202A-\u202E\u203F-\u2040\u2054\u2060-\u206F]/, /[\u2070-\u20CF\u2100-\u218F\u2460-\u24FF\u2776-\u2793]/, /[\u2C00-\u2DFF\u2E80-\u2FFF]/, /[\u3004-\u3007\u3021-\u302F\u3031-\u303F\u3040-\uD7FF]/, /[\uF900-\uFD3D\uFD40-\uFDCF\uFDF0-\uFE1F\uFE30-\uFE44]/, /[\uFE47-\uFEFE\uFF00-\uFFFD]/), qe = se(tn, /\d/, /[\u0300-\u036F\u1DC0-\u1DFF\u20D0-\u20FF\uFE20-\uFE2F]/), me = $(tn, qe, "*"), Ye = $(/[A-Z]/, qe, "*"), da = ["attached", "autoclosure", $(/convention\(/, se("swift", "block", "c"), /\)/), "discardableResult", "dynamicCallable", "dynamicMemberLookup", "escaping", "freestanding", "frozen", "GKInspectable", "IBAction", "IBDesignable", "IBInspectable", "IBOutlet", "IBSegueAction", "inlinable", "main", "nonobjc", "NSApplicationMain", "NSCopying", "NSManaged", $(/objc\(/, me, /\)/), "objc", "objcMembers", "propertyWrapper", "requires_stored_property_inits", "resultBuilder", "Sendable", "testable", "UIApplicationMain", "unchecked", "unknown", "usableFromInline", "warn_unqualified_access"], ua = ["iOS", "iOSApplicationExtension", "macOS", "macOSApplicationExtension", "macCatalyst", "macCatalystApplicationExtension", "watchOS", "watchOSApplicationExtension", "tvOS", "tvOSApplicationExtension", "swift"];
function ga(e) {
  const t = { match: /\s+/, relevance: 0 }, i = e.COMMENT("/\\*", "\\*/", { contains: ["self"] }), a = [e.C_LINE_COMMENT_MODE, i], r = { match: [/\./, se(...sa, ...Xt)], className: { 2: "keyword" } }, g = { match: $(/\./, se(...gt)), relevance: 0 }, s = gt.filter((F) => typeof F == "string").concat(["_|0"]), o = gt.filter((F) => typeof F != "string").concat(oa).map(ut), d = { variants: [{ className: "keyword", match: se(...o, ...Xt) }] }, c = { $pattern: se(/\b\w+/, /#\w+/), keyword: s.concat(la), literal: Qt }, u = [r, g, d], m = { match: $(/\./, se(...Jt)), relevance: 0 }, b = { className: "built_in", match: $(/\b/, se(...Jt), /(?=\()/) }, f = [m, b], S = { match: /->/, relevance: 0 }, E = { className: "operator", relevance: 0, variants: [{ match: pt }, { match: `\\.(\\.|${en})+` }] }, y = [S, E], w = "([0-9]_*)+", I = "([0-9a-fA-F]_*)+", D = { className: "number", relevance: 0, variants: [{ match: `\\b(${w})(\\.(${w}))?([eE][+-]?(${w}))?\\b` }, { match: `\\b0x(${I})(\\.(${I}))?([pP][+-]?(${w}))?\\b` }, { match: /\b0o([0-7]_*)+\b/ }, { match: /\b0b([01]_*)+\b/ }] }, M = (F = "") => ({ className: "subst", variants: [{ match: $(/\\/, F, /[0\\tnr"']/) }, { match: $(/\\/, F, /u\{[0-9a-fA-F]{1,8}\}/) }] }), L = (F = "") => ({ className: "subst", match: $(/\\/, F, /[\t ]*(?:[\r\n]|\r\n)/) }), C = (F = "") => ({ className: "subst", label: "interpol", begin: $(/\\/, F, /\(/), end: /\)/ }), W = (F = "") => ({ begin: $(F, /"""/), end: $(/"""/, F), contains: [M(F), L(F), C(F)] }), z = (F = "") => ({ begin: $(F, /"/), end: $(/"/, F), contains: [M(F), C(F)] }), H = { className: "string", variants: [W(), W("#"), W("##"), W("###"), z(), z("#"), z("##"), z("###")] }, oe = [e.BACKSLASH_ESCAPE, { begin: /\[/, end: /\]/, relevance: 0, contains: [e.BACKSLASH_ESCAPE] }], de = { begin: /\/[^\s](?=[^/\n]*\/)/, end: /\//, contains: oe }, le = (F) => {
    const ve = $(F, /\//), ye = $(/\//, F);
    return { begin: ve, end: ye, contains: [...oe, { scope: "comment", begin: `#(?!.*${ye})`, end: /$/ }] };
  }, ue = { scope: "regexp", variants: [le("###"), le("##"), le("#"), de] }, q = { match: $(/`/, me, /`/) }, X = { className: "variable", match: /\$\d+/ }, ae = { className: "variable", match: `\\$${qe}+` }, _e = [q, X, ae], P = { match: /(@|#(un)?)available/, scope: "keyword", starts: { contains: [{ begin: /\(/, end: /\)/, keywords: ua, contains: [...y, D, H] }] } }, j = { scope: "keyword", match: $(/@/, se(...da), xe(se(/\(/, /\s+/))) }, re = { scope: "meta", match: $(/@/, me) }, ne = [P, j, re], ee = { match: xe(/\b[A-Z]/), relevance: 0, contains: [{ className: "type", match: $(/(AV|CA|CF|CG|CI|CL|CM|CN|CT|MK|MP|MTK|MTL|NS|SCN|SK|UI|WK|XC)/, qe, "+") }, { className: "type", match: Ye, relevance: 0 }, { match: /[?!]+/, relevance: 0 }, { match: /\.\.\./, relevance: 0 }, { match: $(/\s+&\s+/, xe(Ye)), relevance: 0 }] }, fe = { begin: /</, end: />/, keywords: c, contains: [...a, ...u, ...ne, S, ee] };
  ee.contains.push(fe);
  const Ve = { match: $(me, /\s*:/), keywords: "_|0", relevance: 0 }, De = { begin: /\(/, end: /\)/, relevance: 0, keywords: c, contains: ["self", Ve, ...a, ue, ...u, ...f, ...y, D, H, ..._e, ...ne, ee] }, Ie = { begin: /</, end: />/, keywords: "repeat each", contains: [...a, ee] }, Xe = { begin: se(xe($(me, /\s*:/)), xe($(me, /\s+/, me, /\s*:/))), end: /:/, relevance: 0, contains: [{ className: "keyword", match: /\b_\b/ }, { className: "params", match: me }] }, Le = { begin: /\(/, end: /\)/, keywords: c, contains: [Xe, ...a, ...u, ...y, D, H, ...ne, ee, De], endsParent: true, illegal: /["']/ }, mt = { match: [/(func|macro)/, /\s+/, se(q.match, me, pt)], className: { 1: "keyword", 3: "title.function" }, contains: [Ie, Le, t], illegal: [/\[/, /%/] }, we = { match: [/\b(?:subscript|init[?!]?)/, /\s*(?=[<(])/], className: { 1: "keyword" }, contains: [Ie, Le, t], illegal: /\[|%/ }, Qe = { match: [/operator/, /\s+/, pt], className: { 1: "keyword", 3: "title" } }, Je = { begin: [/precedencegroup/, /\s+/, Ye], className: { 1: "keyword", 3: "title" }, contains: [ee], keywords: [...ca, ...Qt], end: /}/ }, je = { match: [/class\b/, /\s+/, /func\b/, /\s+/, /\b[A-Za-z_][A-Za-z0-9_]*\b/], scope: { 1: "keyword", 3: "keyword", 5: "title.function" } }, et = { match: [/class\b/, /\s+/, /var\b/], scope: { 1: "keyword", 3: "keyword" } }, tt = { begin: [/(struct|protocol|class|extension|enum|actor)/, /\s+/, me, /\s*/], beginScope: { 1: "keyword", 3: "title.class" }, keywords: c, contains: [Ie, ...u, { begin: /:/, end: /\{/, keywords: c, contains: [{ scope: "title.class.inherited", match: Ye }, ...u], relevance: 0 }] };
  for (const F of H.variants) {
    const ve = F.contains.find((nt) => nt.label === "interpol");
    ve.keywords = c;
    const ye = [...u, ...f, ...y, D, H, ..._e];
    ve.contains = [...ye, { begin: /\(/, end: /\)/, contains: ["self", ...ye] }];
  }
  return { name: "Swift", keywords: c, contains: [...a, mt, we, je, et, tt, Qe, Je, { beginKeywords: "import", end: /$/, contains: [...a], relevance: 0 }, ue, ...u, ...f, ...y, D, H, ..._e, ...ne, ee, De] };
}
const Ze = "[A-Za-z$_][0-9A-Za-z$_]*", nn = ["as", "in", "of", "if", "for", "while", "finally", "var", "new", "function", "do", "return", "void", "else", "break", "catch", "instanceof", "with", "throw", "case", "default", "try", "switch", "continue", "typeof", "delete", "let", "yield", "const", "class", "debugger", "async", "await", "static", "import", "from", "export", "extends", "using"], an = ["true", "false", "null", "undefined", "NaN", "Infinity"], rn = ["Object", "Function", "Boolean", "Symbol", "Math", "Date", "Number", "BigInt", "String", "RegExp", "Array", "Float32Array", "Float64Array", "Int8Array", "Uint8Array", "Uint8ClampedArray", "Int16Array", "Int32Array", "Uint16Array", "Uint32Array", "BigInt64Array", "BigUint64Array", "Set", "Map", "WeakSet", "WeakMap", "ArrayBuffer", "SharedArrayBuffer", "Atomics", "DataView", "JSON", "Promise", "Generator", "GeneratorFunction", "AsyncFunction", "Reflect", "Proxy", "Intl", "WebAssembly"], sn = ["Error", "EvalError", "InternalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError"], on = ["setInterval", "setTimeout", "clearInterval", "clearTimeout", "require", "exports", "eval", "isFinite", "isNaN", "parseFloat", "parseInt", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "escape", "unescape"], cn = ["arguments", "this", "super", "console", "window", "document", "localStorage", "sessionStorage", "module", "global"], ln = [].concat(on, rn, sn);
function pa(e) {
  const t = e.regex, i = (P, { after: j }) => {
    const re = "</" + P[0].slice(1);
    return P.input.indexOf(re, j) !== -1;
  }, a = Ze, r = { begin: "<>", end: "</>" }, g = /<[A-Za-z0-9\\._:-]+\s*\/>/, s = { begin: /<[A-Za-z0-9\\._:-]+/, end: /\/[A-Za-z0-9\\._:-]+>|\/>/, isTrulyOpeningTag: (P, j) => {
    const re = P[0].length + P.index, ne = P.input[re];
    if (ne === "<" || ne === ",") {
      j.ignoreMatch();
      return;
    }
    ne === ">" && (i(P, { after: re }) || j.ignoreMatch());
    let ee;
    const fe = P.input.substring(re);
    if (ee = fe.match(/^\s*=/)) {
      j.ignoreMatch();
      return;
    }
    if ((ee = fe.match(/^\s+extends\s+/)) && ee.index === 0) {
      j.ignoreMatch();
      return;
    }
  } }, o = { $pattern: Ze, keyword: nn, literal: an, built_in: ln, "variable.language": cn }, d = "[0-9](_?[0-9])*", c = `\\.(${d})`, u = "0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*", m = { className: "number", variants: [{ begin: `(\\b(${u})((${c})|\\.)?|(${c}))[eE][+-]?(${d})\\b` }, { begin: `\\b(${u})\\b((${c})\\b|\\.)?|(${c})\\b` }, { begin: "\\b(0|[1-9](_?[0-9])*)n\\b" }, { begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b" }, { begin: "\\b0[bB][0-1](_?[0-1])*n?\\b" }, { begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" }, { begin: "\\b0[0-7]+n?\\b" }], relevance: 0 }, b = { className: "subst", begin: "\\$\\{", end: "\\}", keywords: o, contains: [] }, f = { begin: ".?html`", end: "", starts: { end: "`", returnEnd: false, contains: [e.BACKSLASH_ESCAPE, b], subLanguage: "xml" } }, S = { begin: ".?css`", end: "", starts: { end: "`", returnEnd: false, contains: [e.BACKSLASH_ESCAPE, b], subLanguage: "css" } }, E = { begin: ".?gql`", end: "", starts: { end: "`", returnEnd: false, contains: [e.BACKSLASH_ESCAPE, b], subLanguage: "graphql" } }, y = { className: "string", begin: "`", end: "`", contains: [e.BACKSLASH_ESCAPE, b] }, I = { className: "comment", variants: [e.COMMENT(/\/\*\*(?!\/)/, "\\*/", { relevance: 0, contains: [{ begin: "(?=@[A-Za-z]+)", relevance: 0, contains: [{ className: "doctag", begin: "@[A-Za-z]+" }, { className: "type", begin: "\\{", end: "\\}", excludeEnd: true, excludeBegin: true, relevance: 0 }, { className: "variable", begin: a + "(?=\\s*(-)|$)", endsParent: true, relevance: 0 }, { begin: /(?=[^\n])\s/, relevance: 0 }] }] }), e.C_BLOCK_COMMENT_MODE, e.C_LINE_COMMENT_MODE] }, D = [e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, f, S, E, y, { match: /\$\d+/ }, m];
  b.contains = D.concat({ begin: /\{/, end: /\}/, keywords: o, contains: ["self"].concat(D) });
  const M = [].concat(I, b.contains), L = M.concat([{ begin: /(\s*)\(/, end: /\)/, keywords: o, contains: ["self"].concat(M) }]), C = { className: "params", begin: /(\s*)\(/, end: /\)/, excludeBegin: true, excludeEnd: true, keywords: o, contains: L }, W = { variants: [{ match: [/class/, /\s+/, a, /\s+/, /extends/, /\s+/, t.concat(a, "(", t.concat(/\./, a), ")*")], scope: { 1: "keyword", 3: "title.class", 5: "keyword", 7: "title.class.inherited" } }, { match: [/class/, /\s+/, a], scope: { 1: "keyword", 3: "title.class" } }] }, z = { relevance: 0, match: t.either(/\bJSON/, /\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/, /\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/, /\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/), className: "title.class", keywords: { _: [...rn, ...sn] } }, H = { label: "use_strict", className: "meta", relevance: 10, begin: /^\s*['"]use (strict|asm)['"]/ }, oe = { variants: [{ match: [/function/, /\s+/, a, /(?=\s*\()/] }, { match: [/function/, /\s*(?=\()/] }], className: { 1: "keyword", 3: "title.function" }, label: "func.def", contains: [C], illegal: /%/ }, de = { relevance: 0, match: /\b[A-Z][A-Z_0-9]+\b/, className: "variable.constant" };
  function le(P) {
    return t.concat("(?!", P.join("|"), ")");
  }
  const ue = { match: t.concat(/\b/, le([...on, "super", "import"].map((P) => `${P}\\s*\\(`)), a, t.lookahead(/\s*\(/)), className: "title.function", relevance: 0 }, q = { begin: t.concat(/\./, t.lookahead(t.concat(a, /(?![0-9A-Za-z$_(])/))), end: a, excludeBegin: true, keywords: "prototype", className: "property", relevance: 0 }, X = { match: [/get|set/, /\s+/, a, /(?=\()/], className: { 1: "keyword", 3: "title.function" }, contains: [{ begin: /\(\)/ }, C] }, ae = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + e.UNDERSCORE_IDENT_RE + ")\\s*=>", _e = { match: [/const|var|let/, /\s+/, a, /\s*/, /=\s*/, /(async\s*)?/, t.lookahead(ae)], keywords: "async", className: { 1: "keyword", 3: "title.function" }, contains: [C] };
  return { name: "JavaScript", aliases: ["js", "jsx", "mjs", "cjs"], keywords: o, exports: { PARAMS_CONTAINS: L, CLASS_REFERENCE: z }, illegal: /#(?![$_A-z])/, contains: [e.SHEBANG({ label: "shebang", binary: "node", relevance: 5 }), H, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, f, S, E, y, I, { match: /\$\d+/ }, m, z, { scope: "attr", match: a + t.lookahead(":"), relevance: 0 }, _e, { begin: "(" + e.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*", keywords: "return throw case", relevance: 0, contains: [I, e.REGEXP_MODE, { className: "function", begin: ae, returnBegin: true, end: "\\s*=>", contains: [{ className: "params", variants: [{ begin: e.UNDERSCORE_IDENT_RE, relevance: 0 }, { className: null, begin: /\(\s*\)/, skip: true }, { begin: /(\s*)\(/, end: /\)/, excludeBegin: true, excludeEnd: true, keywords: o, contains: L }] }] }, { begin: /,/, relevance: 0 }, { match: /\s+/, relevance: 0 }, { variants: [{ begin: r.begin, end: r.end }, { match: g }, { begin: s.begin, "on:begin": s.isTrulyOpeningTag, end: s.end }], subLanguage: "xml", contains: [{ begin: s.begin, end: s.end, skip: true, contains: ["self"] }] }] }, oe, { beginKeywords: "while if switch catch for" }, { begin: "\\b(?!function)" + e.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{", returnBegin: true, label: "func.def", contains: [C, e.inherit(e.TITLE_MODE, { begin: a, className: "title.function" })] }, { match: /\.\.\./, relevance: 0 }, q, { match: "\\$" + a, relevance: 0 }, { match: [/\bconstructor(?=\s*\()/], className: { 1: "title.function" }, contains: [C] }, ue, de, W, X, { match: /\$[(.]/ }] };
}
function ba(e) {
  const t = e.regex, i = pa(e), a = Ze, r = ["any", "void", "number", "boolean", "string", "object", "never", "symbol", "bigint", "unknown"], g = { begin: [/namespace/, /\s+/, e.IDENT_RE], beginScope: { 1: "keyword", 3: "title.class" } }, s = { beginKeywords: "interface", end: /\{/, excludeEnd: true, keywords: { keyword: "interface extends", built_in: r }, contains: [i.exports.CLASS_REFERENCE] }, o = { className: "meta", relevance: 10, begin: /^\s*['"]use strict['"]/ }, d = ["type", "interface", "public", "private", "protected", "implements", "declare", "abstract", "readonly", "enum", "override", "satisfies"], c = { $pattern: Ze, keyword: nn.concat(d), literal: an, built_in: ln.concat(r), "variable.language": cn }, u = { className: "meta", begin: "@" + a }, m = (E, y, w) => {
    const I = E.contains.findIndex((D) => D.label === y);
    if (I === -1) throw new Error("can not find mode to replace");
    E.contains.splice(I, 1, w);
  };
  Object.assign(i.keywords, c), i.exports.PARAMS_CONTAINS.push(u);
  const b = i.contains.find((E) => E.scope === "attr"), f = Object.assign({}, b, { match: t.concat(a, t.lookahead(/\s*\?:/)) });
  i.exports.PARAMS_CONTAINS.push([i.exports.CLASS_REFERENCE, b, f]), i.contains = i.contains.concat([u, g, s, f]), m(i, "shebang", e.SHEBANG()), m(i, "use_strict", o);
  const S = i.contains.find((E) => E.label === "func.def");
  return S.relevance = 0, Object.assign(i, { name: "TypeScript", aliases: ["ts", "tsx", "mts", "cts"] }), i;
}
function ma(e) {
  const t = e.regex, i = { className: "string", begin: /"(""|[^/n])"C\b/ }, a = { className: "string", begin: /"/, end: /"/, illegal: /\n/, contains: [{ begin: /""/ }] }, r = /\d{1,2}\/\d{1,2}\/\d{4}/, g = /\d{4}-\d{1,2}-\d{1,2}/, s = /(\d|1[012])(:\d+){0,2} *(AM|PM)/, o = /\d{1,2}(:\d{1,2}){1,2}/, d = { className: "literal", variants: [{ begin: t.concat(/# */, t.either(g, r), / *#/) }, { begin: t.concat(/# */, o, / *#/) }, { begin: t.concat(/# */, s, / *#/) }, { begin: t.concat(/# */, t.either(g, r), / +/, t.either(s, o), / *#/) }] }, c = { className: "number", relevance: 0, variants: [{ begin: /\b\d[\d_]*((\.[\d_]+(E[+-]?[\d_]+)?)|(E[+-]?[\d_]+))[RFD@!#]?/ }, { begin: /\b\d[\d_]*((U?[SIL])|[%&])?/ }, { begin: /&H[\dA-F_]+((U?[SIL])|[%&])?/ }, { begin: /&O[0-7_]+((U?[SIL])|[%&])?/ }, { begin: /&B[01_]+((U?[SIL])|[%&])?/ }] }, u = { className: "label", begin: /^\w+:/ }, m = e.COMMENT(/'''/, /$/, { contains: [{ className: "doctag", begin: /<\/?/, end: />/ }] }), b = e.COMMENT(null, /$/, { variants: [{ begin: /'/ }, { begin: /([\t ]|^)REM(?=\s)/ }] });
  return { name: "Visual Basic .NET", aliases: ["vb"], case_insensitive: true, classNameAliases: { label: "symbol" }, keywords: { keyword: "addhandler alias aggregate ansi as async assembly auto binary by byref byval call case catch class compare const continue custom declare default delegate dim distinct do each equals else elseif end enum erase error event exit explicit finally for friend from function get global goto group handles if implements imports in inherits interface into iterator join key let lib loop me mid module mustinherit mustoverride mybase myclass namespace narrowing new next notinheritable notoverridable of off on operator option optional order overloads overridable overrides paramarray partial preserve private property protected public raiseevent readonly redim removehandler resume return select set shadows shared skip static step stop structure strict sub synclock take text then throw to try unicode until using when where while widening with withevents writeonly yield", built_in: "addressof and andalso await directcast gettype getxmlnamespace is isfalse isnot istrue like mod nameof new not or orelse trycast typeof xor cbool cbyte cchar cdate cdbl cdec cint clng cobj csbyte cshort csng cstr cuint culng cushort", type: "boolean byte char date decimal double integer long object sbyte short single string uinteger ulong ushort", literal: "true false nothing" }, illegal: "//|\\{|\\}|endif|gosub|variant|wend|^\\$ ", contains: [i, a, d, c, u, m, b, { className: "meta", begin: /[\t ]*#(const|disable|else|elseif|enable|end|externalsource|if|region)\b/, end: /$/, keywords: { keyword: "const disable else elseif enable end externalsource if region then" }, contains: [b] }] };
}
function _a(e) {
  e.regex;
  const t = e.COMMENT(/\(;/, /;\)/);
  t.contains.push("self");
  const i = e.COMMENT(/;;/, /$/), a = ["anyfunc", "block", "br", "br_if", "br_table", "call", "call_indirect", "data", "drop", "elem", "else", "end", "export", "func", "global.get", "global.set", "local.get", "local.set", "local.tee", "get_global", "get_local", "global", "if", "import", "local", "loop", "memory", "memory.grow", "memory.size", "module", "mut", "nop", "offset", "param", "result", "return", "select", "set_global", "set_local", "start", "table", "tee_local", "then", "type", "unreachable"], r = { begin: [/(?:func|call|call_indirect)/, /\s+/, /\$[^\s)]+/], className: { 1: "keyword", 3: "title.function" } }, g = { className: "variable", begin: /\$[\w_]+/ }, s = { match: /(\((?!;)|\))+/, className: "punctuation", relevance: 0 }, o = { className: "number", relevance: 0, match: /[+-]?\b(?:\d(?:_?\d)*(?:\.\d(?:_?\d)*)?(?:[eE][+-]?\d(?:_?\d)*)?|0x[\da-fA-F](?:_?[\da-fA-F])*(?:\.[\da-fA-F](?:_?[\da-fA-D])*)?(?:[pP][+-]?\d(?:_?\d)*)?)\b|\binf\b|\bnan(?::0x[\da-fA-F](?:_?[\da-fA-D])*)?\b/ }, d = { match: /(i32|i64|f32|f64)(?!\.)/, className: "type" }, c = { className: "keyword", match: /\b(f32|f64|i32|i64)(?:\.(?:abs|add|and|ceil|clz|const|convert_[su]\/i(?:32|64)|copysign|ctz|demote\/f64|div(?:_[su])?|eqz?|extend_[su]\/i32|floor|ge(?:_[su])?|gt(?:_[su])?|le(?:_[su])?|load(?:(?:8|16|32)_[su])?|lt(?:_[su])?|max|min|mul|nearest|neg?|or|popcnt|promote\/f32|reinterpret\/[fi](?:32|64)|rem_[su]|rot[lr]|shl|shr_[su]|store(?:8|16|32)?|sqrt|sub|trunc(?:_[su]\/f(?:32|64))?|wrap\/i64|xor))\b/ };
  return { name: "WebAssembly", keywords: { $pattern: /[\w.]+/, keyword: a }, contains: [i, t, { match: [/(?:offset|align)/, /\s*/, /=/], className: { 1: "keyword", 3: "operator" } }, g, s, r, e.QUOTE_STRING_MODE, d, c, o] };
}
function fa(e) {
  const t = e.regex, i = t.concat(/[\p{L}_]/u, t.optional(/[\p{L}0-9_.-]*:/u), /[\p{L}0-9_.-]*/u), a = /[\p{L}0-9._:-]+/u, r = { className: "symbol", begin: /&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/ }, g = { begin: /\s/, contains: [{ className: "keyword", begin: /#?[a-z_][a-z1-9_-]+/, illegal: /\n/ }] }, s = e.inherit(g, { begin: /\(/, end: /\)/ }), o = e.inherit(e.APOS_STRING_MODE, { className: "string" }), d = e.inherit(e.QUOTE_STRING_MODE, { className: "string" }), c = { endsWithParent: true, illegal: /</, relevance: 0, contains: [{ className: "attr", begin: a, relevance: 0 }, { begin: /=\s*/, relevance: 0, contains: [{ className: "string", endsParent: true, variants: [{ begin: /"/, end: /"/, contains: [r] }, { begin: /'/, end: /'/, contains: [r] }, { begin: /[^\s"'=<>`]+/ }] }] }] };
  return { name: "HTML, XML", aliases: ["html", "xhtml", "rss", "atom", "xjb", "xsd", "xsl", "plist", "wsf", "svg"], case_insensitive: true, unicodeRegex: true, contains: [{ className: "meta", begin: /<![a-z]/, end: />/, relevance: 10, contains: [g, d, o, s, { begin: /\[/, end: /\]/, contains: [{ className: "meta", begin: /<![a-z]/, end: />/, contains: [g, s, d, o] }] }] }, e.COMMENT(/<!--/, /-->/, { relevance: 10 }), { begin: /<!\[CDATA\[/, end: /\]\]>/, relevance: 10 }, r, { className: "meta", end: /\?>/, variants: [{ begin: /<\?xml/, relevance: 10, contains: [d] }, { begin: /<\?[a-z][a-z0-9]+/ }] }, { className: "tag", begin: /<style(?=\s|>)/, end: />/, keywords: { name: "style" }, contains: [c], starts: { end: /<\/style>/, returnEnd: true, subLanguage: ["css", "xml"] } }, { className: "tag", begin: /<script(?=\s|>)/, end: />/, keywords: { name: "script" }, contains: [c], starts: { end: /<\/script>/, returnEnd: true, subLanguage: ["javascript", "handlebars", "xml"] } }, { className: "tag", begin: /<>|<\/>/ }, { className: "tag", begin: t.concat(/</, t.lookahead(t.concat(i, t.either(/\/>/, />/, /\s/)))), end: /\/?>/, contains: [{ className: "name", begin: i, relevance: 0, starts: c }] }, { className: "tag", begin: t.concat(/<\//, t.lookahead(t.concat(i, />/))), contains: [{ className: "name", begin: i, relevance: 0 }, { begin: />/, relevance: 0, endsParent: true }] }] };
}
function Ea(e) {
  const t = "true false yes no null", i = "[\\w#;/?:@&=+$,.~*'()[\\]]+", a = { className: "attr", variants: [{ begin: /[\w*@][\w*@ :()\./-]*:(?=[ \t]|$)/ }, { begin: /"[\w*@][\w*@ :()\./-]*":(?=[ \t]|$)/ }, { begin: /'[\w*@][\w*@ :()\./-]*':(?=[ \t]|$)/ }] }, r = { className: "template-variable", variants: [{ begin: /\{\{/, end: /\}\}/ }, { begin: /%\{/, end: /\}/ }] }, g = { className: "string", relevance: 0, begin: /'/, end: /'/, contains: [{ match: /''/, scope: "char.escape", relevance: 0 }] }, s = { className: "string", relevance: 0, variants: [{ begin: /"/, end: /"/ }, { begin: /\S+/ }], contains: [e.BACKSLASH_ESCAPE, r] }, o = e.inherit(s, { variants: [{ begin: /'/, end: /'/, contains: [{ begin: /''/, relevance: 0 }] }, { begin: /"/, end: /"/ }, { begin: /[^\s,{}[\]]+/ }] }), b = { className: "number", begin: "\\b[0-9]{4}(-[0-9][0-9]){0,2}([Tt \\t][0-9][0-9]?(:[0-9][0-9]){2})?(\\.[0-9]*)?([ \\t])*(Z|[-+][0-9][0-9]?(:[0-9][0-9])?)?\\b" }, f = { end: ",", endsWithParent: true, excludeEnd: true, keywords: t, relevance: 0 }, S = { begin: /\{/, end: /\}/, contains: [f], illegal: "\\n", relevance: 0 }, E = { begin: "\\[", end: "\\]", contains: [f], illegal: "\\n", relevance: 0 }, y = [a, { className: "meta", begin: "^---\\s*$", relevance: 10 }, { className: "string", begin: "[\\|>]([1-9]?[+-])?[ ]*\\n( +)[^ ][^\\n]*\\n(\\2[^\\n]+\\n?)*" }, { begin: "<%[%=-]?", end: "[%-]?%>", subLanguage: "ruby", excludeBegin: true, excludeEnd: true, relevance: 0 }, { className: "type", begin: "!\\w+!" + i }, { className: "type", begin: "!<" + i + ">" }, { className: "type", begin: "!" + i }, { className: "type", begin: "!!" + i }, { className: "meta", begin: "&" + e.UNDERSCORE_IDENT_RE + "$" }, { className: "meta", begin: "\\*" + e.UNDERSCORE_IDENT_RE + "$" }, { className: "bullet", begin: "-(?=[ ]|$)", relevance: 0 }, e.HASH_COMMENT_MODE, { beginKeywords: t, keywords: { literal: t } }, b, { className: "number", begin: e.C_NUMBER_RE + "\\b", relevance: 0 }, S, E, g, s], w = [...y];
  return w.pop(), w.push(o), f.contains = w, { name: "YAML", case_insensitive: true, aliases: ["yml"], contains: y };
}
const ha = { arduino: ei, bash: ti, c: ni, cpp: ii, csharp: ai, css: pi, diff: bi, go: mi, graphql: _i, ini: fi, java: Ei, javascript: Si, json: wi, kotlin: Ai, less: Di, lua: Li, makefile: Bi, markdown: Pi, objectivec: Ui, perl: Fi, php: $i, "php-template": zi, plaintext: Gi, python: Ki, "python-repl": Hi, r: Wi, ruby: qi, rust: Yi, scss: na, shell: ia, sql: aa, swift: ga, typescript: ba, vbnet: ma, wasm: _a, xml: fa, yaml: Ea };
var bt, dn;
function Na() {
  if (dn) return bt;
  dn = 1;
  function e(n) {
    return n instanceof Map ? n.clear = n.delete = n.set = function() {
      throw new Error("map is read-only");
    } : n instanceof Set && (n.add = n.clear = n.delete = function() {
      throw new Error("set is read-only");
    }), Object.freeze(n), Object.getOwnPropertyNames(n).forEach((l) => {
      const _ = n[l], R = typeof _;
      (R === "object" || R === "function") && !Object.isFrozen(_) && e(_);
    }), n;
  }
  class t {
    constructor(l) {
      l.data === void 0 && (l.data = {}), this.data = l.data, this.isMatchIgnored = false;
    }
    ignoreMatch() {
      this.isMatchIgnored = true;
    }
  }
  function i(n) {
    return n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
  }
  function a(n, ...l) {
    const _ = /* @__PURE__ */ Object.create(null);
    for (const R in n) _[R] = n[R];
    return l.forEach(function(R) {
      for (const Y in R) _[Y] = R[Y];
    }), _;
  }
  const r = "</span>", g = (n) => !!n.scope, s = (n, { prefix: l }) => {
    if (n.startsWith("language:")) return n.replace("language:", "language-");
    if (n.includes(".")) {
      const _ = n.split(".");
      return [`${l}${_.shift()}`, ..._.map((R, Y) => `${R}${"_".repeat(Y + 1)}`)].join(" ");
    }
    return `${l}${n}`;
  };
  class o {
    constructor(l, _) {
      this.buffer = "", this.classPrefix = _.classPrefix, l.walk(this);
    }
    addText(l) {
      this.buffer += i(l);
    }
    openNode(l) {
      if (!g(l)) return;
      const _ = s(l.scope, { prefix: this.classPrefix });
      this.span(_);
    }
    closeNode(l) {
      g(l) && (this.buffer += r);
    }
    value() {
      return this.buffer;
    }
    span(l) {
      this.buffer += `<span class="${l}">`;
    }
  }
  const d = (n = {}) => {
    const l = { children: [] };
    return Object.assign(l, n), l;
  };
  class c {
    constructor() {
      this.rootNode = d(), this.stack = [this.rootNode];
    }
    get top() {
      return this.stack[this.stack.length - 1];
    }
    get root() {
      return this.rootNode;
    }
    add(l) {
      this.top.children.push(l);
    }
    openNode(l) {
      const _ = d({ scope: l });
      this.add(_), this.stack.push(_);
    }
    closeNode() {
      if (this.stack.length > 1) return this.stack.pop();
    }
    closeAllNodes() {
      for (; this.closeNode(); ) ;
    }
    toJSON() {
      return JSON.stringify(this.rootNode, null, 4);
    }
    walk(l) {
      return this.constructor._walk(l, this.rootNode);
    }
    static _walk(l, _) {
      return typeof _ == "string" ? l.addText(_) : _.children && (l.openNode(_), _.children.forEach((R) => this._walk(l, R)), l.closeNode(_)), l;
    }
    static _collapse(l) {
      typeof l != "string" && l.children && (l.children.every((_) => typeof _ == "string") ? l.children = [l.children.join("")] : l.children.forEach((_) => {
        c._collapse(_);
      }));
    }
  }
  class u extends c {
    constructor(l) {
      super(), this.options = l;
    }
    addText(l) {
      l !== "" && this.add(l);
    }
    startScope(l) {
      this.openNode(l);
    }
    endScope() {
      this.closeNode();
    }
    __addSublanguage(l, _) {
      const R = l.root;
      _ && (R.scope = `language:${_}`), this.add(R);
    }
    toHTML() {
      return new o(this, this.options).value();
    }
    finalize() {
      return this.closeAllNodes(), true;
    }
  }
  function m(n) {
    return n ? typeof n == "string" ? n : n.source : null;
  }
  function b(n) {
    return E("(?=", n, ")");
  }
  function f(n) {
    return E("(?:", n, ")*");
  }
  function S(n) {
    return E("(?:", n, ")?");
  }
  function E(...n) {
    return n.map((_) => m(_)).join("");
  }
  function y(n) {
    const l = n[n.length - 1];
    return typeof l == "object" && l.constructor === Object ? (n.splice(n.length - 1, 1), l) : {};
  }
  function w(...n) {
    return "(" + (y(n).capture ? "" : "?:") + n.map((R) => m(R)).join("|") + ")";
  }
  function I(n) {
    return new RegExp(n.toString() + "|").exec("").length - 1;
  }
  function D(n, l) {
    const _ = n && n.exec(l);
    return _ && _.index === 0;
  }
  const M = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
  function L(n, { joinWith: l }) {
    let _ = 0;
    return n.map((R) => {
      _ += 1;
      const Y = _;
      let Z = m(R), T = "";
      for (; Z.length > 0; ) {
        const N = M.exec(Z);
        if (!N) {
          T += Z;
          break;
        }
        T += Z.substring(0, N.index), Z = Z.substring(N.index + N[0].length), N[0][0] === "\\" && N[1] ? T += "\\" + String(Number(N[1]) + Y) : (T += N[0], N[0] === "(" && _++);
      }
      return T;
    }).map((R) => `(${R})`).join(l);
  }
  const C = /\b\B/, W = "[a-zA-Z]\\w*", z = "[a-zA-Z_]\\w*", H = "\\b\\d+(\\.\\d+)?", oe = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", de = "\\b(0b[01]+)", le = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", ue = (n = {}) => {
    const l = /^#![ ]*\//;
    return n.binary && (n.begin = E(l, /.*\b/, n.binary, /\b.*/)), a({ scope: "meta", begin: l, end: /$/, relevance: 0, "on:begin": (_, R) => {
      _.index !== 0 && R.ignoreMatch();
    } }, n);
  }, q = { begin: "\\\\[\\s\\S]", relevance: 0 }, X = { scope: "string", begin: "'", end: "'", illegal: "\\n", contains: [q] }, ae = { scope: "string", begin: '"', end: '"', illegal: "\\n", contains: [q] }, _e = { begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/ }, P = function(n, l, _ = {}) {
    const R = a({ scope: "comment", begin: n, end: l, contains: [] }, _);
    R.contains.push({ scope: "doctag", begin: "[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)", end: /(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/, excludeBegin: true, relevance: 0 });
    const Y = w("I", "a", "is", "so", "us", "to", "at", "if", "in", "it", "on", /[A-Za-z]+['](d|ve|re|ll|t|s|n)/, /[A-Za-z]+[-][a-z]+/, /[A-Za-z][a-z]{2,}/);
    return R.contains.push({ begin: E(/[ ]+/, "(", Y, /[.]?[:]?([.][ ]|[ ])/, "){3}") }), R;
  }, j = P("//", "$"), re = P("/\\*", "\\*/"), ne = P("#", "$"), ee = { scope: "number", begin: H, relevance: 0 }, fe = { scope: "number", begin: oe, relevance: 0 }, Ve = { scope: "number", begin: de, relevance: 0 }, De = { scope: "regexp", begin: /\/(?=[^/\n]*\/)/, end: /\/[gimuy]*/, contains: [q, { begin: /\[/, end: /\]/, relevance: 0, contains: [q] }] }, Ie = { scope: "title", begin: W, relevance: 0 }, Xe = { scope: "title", begin: z, relevance: 0 }, Le = { begin: "\\.\\s*" + z, relevance: 0 };
  var we = Object.freeze({ __proto__: null, APOS_STRING_MODE: X, BACKSLASH_ESCAPE: q, BINARY_NUMBER_MODE: Ve, BINARY_NUMBER_RE: de, COMMENT: P, C_BLOCK_COMMENT_MODE: re, C_LINE_COMMENT_MODE: j, C_NUMBER_MODE: fe, C_NUMBER_RE: oe, END_SAME_AS_BEGIN: function(n) {
    return Object.assign(n, { "on:begin": (l, _) => {
      _.data._beginMatch = l[1];
    }, "on:end": (l, _) => {
      _.data._beginMatch !== l[1] && _.ignoreMatch();
    } });
  }, HASH_COMMENT_MODE: ne, IDENT_RE: W, MATCH_NOTHING_RE: C, METHOD_GUARD: Le, NUMBER_MODE: ee, NUMBER_RE: H, PHRASAL_WORDS_MODE: _e, QUOTE_STRING_MODE: ae, REGEXP_MODE: De, RE_STARTERS_RE: le, SHEBANG: ue, TITLE_MODE: Ie, UNDERSCORE_IDENT_RE: z, UNDERSCORE_TITLE_MODE: Xe });
  function Qe(n, l) {
    n.input[n.index - 1] === "." && l.ignoreMatch();
  }
  function Je(n, l) {
    n.className !== void 0 && (n.scope = n.className, delete n.className);
  }
  function je(n, l) {
    l && n.beginKeywords && (n.begin = "\\b(" + n.beginKeywords.split(" ").join("|") + ")(?!\\.)(?=\\b|\\s)", n.__beforeBegin = Qe, n.keywords = n.keywords || n.beginKeywords, delete n.beginKeywords, n.relevance === void 0 && (n.relevance = 0));
  }
  function et(n, l) {
    Array.isArray(n.illegal) && (n.illegal = w(...n.illegal));
  }
  function tt(n, l) {
    if (n.match) {
      if (n.begin || n.end) throw new Error("begin & end are not supported with match");
      n.begin = n.match, delete n.match;
    }
  }
  function F(n, l) {
    n.relevance === void 0 && (n.relevance = 1);
  }
  const ve = (n, l) => {
    if (!n.beforeMatch) return;
    if (n.starts) throw new Error("beforeMatch cannot be used with starts");
    const _ = Object.assign({}, n);
    Object.keys(n).forEach((R) => {
      delete n[R];
    }), n.keywords = _.keywords, n.begin = E(_.beforeMatch, b(_.begin)), n.starts = { relevance: 0, contains: [Object.assign(_, { endsParent: true })] }, n.relevance = 0, delete _.beforeMatch;
  }, ye = ["of", "and", "for", "in", "not", "or", "if", "then", "parent", "list", "value"], nt = "keyword";
  function _t(n, l, _ = nt) {
    const R = /* @__PURE__ */ Object.create(null);
    return typeof n == "string" ? Y(_, n.split(" ")) : Array.isArray(n) ? Y(_, n) : Object.keys(n).forEach(function(Z) {
      Object.assign(R, _t(n[Z], l, Z));
    }), R;
    function Y(Z, T) {
      l && (T = T.map((N) => N.toLowerCase())), T.forEach(function(N) {
        const O = N.split("|");
        R[O[0]] = [Z, gn(O[0], O[1])];
      });
    }
  }
  function gn(n, l) {
    return l ? Number(l) : pn(n) ? 0 : 1;
  }
  function pn(n) {
    return ye.includes(n.toLowerCase());
  }
  const ft = {}, Te = (n) => {
    console.error(n);
  }, Et = (n, ...l) => {
    console.log(`WARN: ${n}`, ...l);
  }, Ae = (n, l) => {
    ft[`${n}/${l}`] || (console.log(`Deprecated as of ${n}. ${l}`), ft[`${n}/${l}`] = true);
  }, Be = new Error();
  function ht(n, l, { key: _ }) {
    let R = 0;
    const Y = n[_], Z = {}, T = {};
    for (let N = 1; N <= l.length; N++) T[N + R] = Y[N], Z[N + R] = true, R += I(l[N - 1]);
    n[_] = T, n[_]._emit = Z, n[_]._multi = true;
  }
  function bn(n) {
    if (Array.isArray(n.begin)) {
      if (n.skip || n.excludeBegin || n.returnBegin) throw Te("skip, excludeBegin, returnBegin not compatible with beginScope: {}"), Be;
      if (typeof n.beginScope != "object" || n.beginScope === null) throw Te("beginScope must be object"), Be;
      ht(n, n.begin, { key: "beginScope" }), n.begin = L(n.begin, { joinWith: "" });
    }
  }
  function mn(n) {
    if (Array.isArray(n.end)) {
      if (n.skip || n.excludeEnd || n.returnEnd) throw Te("skip, excludeEnd, returnEnd not compatible with endScope: {}"), Be;
      if (typeof n.endScope != "object" || n.endScope === null) throw Te("endScope must be object"), Be;
      ht(n, n.end, { key: "endScope" }), n.end = L(n.end, { joinWith: "" });
    }
  }
  function _n(n) {
    n.scope && typeof n.scope == "object" && n.scope !== null && (n.beginScope = n.scope, delete n.scope);
  }
  function fn(n) {
    _n(n), typeof n.beginScope == "string" && (n.beginScope = { _wrap: n.beginScope }), typeof n.endScope == "string" && (n.endScope = { _wrap: n.endScope }), bn(n), mn(n);
  }
  function En(n) {
    function l(T, N) {
      return new RegExp(m(T), "m" + (n.case_insensitive ? "i" : "") + (n.unicodeRegex ? "u" : "") + (N ? "g" : ""));
    }
    class _ {
      constructor() {
        this.matchIndexes = {}, this.regexes = [], this.matchAt = 1, this.position = 0;
      }
      addRule(N, O) {
        O.position = this.position++, this.matchIndexes[this.matchAt] = O, this.regexes.push([O, N]), this.matchAt += I(N) + 1;
      }
      compile() {
        this.regexes.length === 0 && (this.exec = () => null);
        const N = this.regexes.map((O) => O[1]);
        this.matcherRe = l(L(N, { joinWith: "|" }), true), this.lastIndex = 0;
      }
      exec(N) {
        this.matcherRe.lastIndex = this.lastIndex;
        const O = this.matcherRe.exec(N);
        if (!O) return null;
        const J = O.findIndex((Ce, at) => at > 0 && Ce !== void 0), V = this.matchIndexes[J];
        return O.splice(0, J), Object.assign(O, V);
      }
    }
    class R {
      constructor() {
        this.rules = [], this.multiRegexes = [], this.count = 0, this.lastIndex = 0, this.regexIndex = 0;
      }
      getMatcher(N) {
        if (this.multiRegexes[N]) return this.multiRegexes[N];
        const O = new _();
        return this.rules.slice(N).forEach(([J, V]) => O.addRule(J, V)), O.compile(), this.multiRegexes[N] = O, O;
      }
      resumingScanAtSamePosition() {
        return this.regexIndex !== 0;
      }
      considerAll() {
        this.regexIndex = 0;
      }
      addRule(N, O) {
        this.rules.push([N, O]), O.type === "begin" && this.count++;
      }
      exec(N) {
        const O = this.getMatcher(this.regexIndex);
        O.lastIndex = this.lastIndex;
        let J = O.exec(N);
        if (this.resumingScanAtSamePosition() && !(J && J.index === this.lastIndex)) {
          const V = this.getMatcher(0);
          V.lastIndex = this.lastIndex + 1, J = V.exec(N);
        }
        return J && (this.regexIndex += J.position + 1, this.regexIndex === this.count && this.considerAll()), J;
      }
    }
    function Y(T) {
      const N = new R();
      return T.contains.forEach((O) => N.addRule(O.begin, { rule: O, type: "begin" })), T.terminatorEnd && N.addRule(T.terminatorEnd, { type: "end" }), T.illegal && N.addRule(T.illegal, { type: "illegal" }), N;
    }
    function Z(T, N) {
      const O = T;
      if (T.isCompiled) return O;
      [Je, tt, fn, ve].forEach((V) => V(T, N)), n.compilerExtensions.forEach((V) => V(T, N)), T.__beforeBegin = null, [je, et, F].forEach((V) => V(T, N)), T.isCompiled = true;
      let J = null;
      return typeof T.keywords == "object" && T.keywords.$pattern && (T.keywords = Object.assign({}, T.keywords), J = T.keywords.$pattern, delete T.keywords.$pattern), J = J || /\w+/, T.keywords && (T.keywords = _t(T.keywords, n.case_insensitive)), O.keywordPatternRe = l(J, true), N && (T.begin || (T.begin = /\B|\b/), O.beginRe = l(O.begin), !T.end && !T.endsWithParent && (T.end = /\B|\b/), T.end && (O.endRe = l(O.end)), O.terminatorEnd = m(O.end) || "", T.endsWithParent && N.terminatorEnd && (O.terminatorEnd += (T.end ? "|" : "") + N.terminatorEnd)), T.illegal && (O.illegalRe = l(T.illegal)), T.contains || (T.contains = []), T.contains = [].concat(...T.contains.map(function(V) {
        return hn(V === "self" ? T : V);
      })), T.contains.forEach(function(V) {
        Z(V, O);
      }), T.starts && Z(T.starts, N), O.matcher = Y(O), O;
    }
    if (n.compilerExtensions || (n.compilerExtensions = []), n.contains && n.contains.includes("self")) throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
    return n.classNameAliases = a(n.classNameAliases || {}), Z(n);
  }
  function Nt(n) {
    return n ? n.endsWithParent || Nt(n.starts) : false;
  }
  function hn(n) {
    return n.variants && !n.cachedVariants && (n.cachedVariants = n.variants.map(function(l) {
      return a(n, { variants: null }, l);
    })), n.cachedVariants ? n.cachedVariants : Nt(n) ? a(n, { starts: n.starts ? a(n.starts) : null }) : Object.isFrozen(n) ? a(n) : n;
  }
  var Nn = "11.11.1";
  class yn extends Error {
    constructor(l, _) {
      super(l), this.name = "HTMLInjectionError", this.html = _;
    }
  }
  const it = i, yt = a, Tt = Symbol("nomatch"), Tn = 7, St = function(n) {
    const l = /* @__PURE__ */ Object.create(null), _ = /* @__PURE__ */ Object.create(null), R = [];
    let Y = true;
    const Z = "Could not find the language '{}', did you forget to load/include a language module?", T = { disableAutodetect: true, name: "Plain text", contains: [] };
    let N = { ignoreUnescapedHTML: false, throwUnescapedHTML: false, noHighlightRe: /^(no-?highlight)$/i, languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i, classPrefix: "hljs-", cssSelector: "pre code", languages: null, __emitter: u };
    function O(p) {
      return N.noHighlightRe.test(p);
    }
    function J(p) {
      let A = p.className + " ";
      A += p.parentNode ? p.parentNode.className : "";
      const B = N.languageDetectRe.exec(A);
      if (B) {
        const G = he(B[1]);
        return G || (Et(Z.replace("{}", B[1])), Et("Falling back to no-highlight mode for this block.", p)), G ? B[1] : "no-highlight";
      }
      return A.split(/\s+/).find((G) => O(G) || he(G));
    }
    function V(p, A, B) {
      let G = "", Q = "";
      typeof A == "object" ? (G = p, B = A.ignoreIllegals, Q = A.language) : (Ae("10.7.0", "highlight(lang, code, ...args) has been deprecated."), Ae("10.7.0", `Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`), Q = p, G = A), B === void 0 && (B = true);
      const ge = { code: G, language: Q };
      Ue("before:highlight", ge);
      const Ne = ge.result ? ge.result : Ce(ge.language, ge.code, B);
      return Ne.code = ge.code, Ue("after:highlight", Ne), Ne;
    }
    function Ce(p, A, B, G) {
      const Q = /* @__PURE__ */ Object.create(null);
      function ge(h, v) {
        return h.keywords[v];
      }
      function Ne() {
        if (!k.keywords) {
          te.addText(K);
          return;
        }
        let h = 0;
        k.keywordPatternRe.lastIndex = 0;
        let v = k.keywordPatternRe.exec(K), x = "";
        for (; v; ) {
          x += K.substring(h, v.index);
          const U = be.case_insensitive ? v[0].toLowerCase() : v[0], ie = ge(k, U);
          if (ie) {
            const [Ee, Fn] = ie;
            if (te.addText(x), x = "", Q[U] = (Q[U] || 0) + 1, Q[U] <= Tn && (ze += Fn), Ee.startsWith("_")) x += v[0];
            else {
              const $n = be.classNameAliases[Ee] || Ee;
              pe(v[0], $n);
            }
          } else x += v[0];
          h = k.keywordPatternRe.lastIndex, v = k.keywordPatternRe.exec(K);
        }
        x += K.substring(h), te.addText(x);
      }
      function Fe() {
        if (K === "") return;
        let h = null;
        if (typeof k.subLanguage == "string") {
          if (!l[k.subLanguage]) {
            te.addText(K);
            return;
          }
          h = Ce(k.subLanguage, K, true, It[k.subLanguage]), It[k.subLanguage] = h._top;
        } else h = rt(K, k.subLanguage.length ? k.subLanguage : null);
        k.relevance > 0 && (ze += h.relevance), te.__addSublanguage(h._emitter, h.language);
      }
      function ce() {
        k.subLanguage != null ? Fe() : Ne(), K = "";
      }
      function pe(h, v) {
        h !== "" && (te.startScope(v), te.addText(h), te.endScope());
      }
      function Ot(h, v) {
        let x = 1;
        const U = v.length - 1;
        for (; x <= U; ) {
          if (!h._emit[x]) {
            x++;
            continue;
          }
          const ie = be.classNameAliases[h[x]] || h[x], Ee = v[x];
          ie ? pe(Ee, ie) : (K = Ee, Ne(), K = ""), x++;
        }
      }
      function Rt(h, v) {
        return h.scope && typeof h.scope == "string" && te.openNode(be.classNameAliases[h.scope] || h.scope), h.beginScope && (h.beginScope._wrap ? (pe(K, be.classNameAliases[h.beginScope._wrap] || h.beginScope._wrap), K = "") : h.beginScope._multi && (Ot(h.beginScope, v), K = "")), k = Object.create(h, { parent: { value: k } }), k;
      }
      function Mt(h, v, x) {
        let U = D(h.endRe, x);
        if (U) {
          if (h["on:end"]) {
            const ie = new t(h);
            h["on:end"](v, ie), ie.isMatchIgnored && (U = false);
          }
          if (U) {
            for (; h.endsParent && h.parent; ) h = h.parent;
            return h;
          }
        }
        if (h.endsWithParent) return Mt(h.parent, v, x);
      }
      function Dn(h) {
        return k.matcher.regexIndex === 0 ? (K += h[0], 1) : (lt = true, 0);
      }
      function Ln(h) {
        const v = h[0], x = h.rule, U = new t(x), ie = [x.__beforeBegin, x["on:begin"]];
        for (const Ee of ie) if (Ee && (Ee(h, U), U.isMatchIgnored)) return Dn(v);
        return x.skip ? K += v : (x.excludeBegin && (K += v), ce(), !x.returnBegin && !x.excludeBegin && (K = v)), Rt(x, h), x.returnBegin ? 0 : v.length;
      }
      function Bn(h) {
        const v = h[0], x = A.substring(h.index), U = Mt(k, h, x);
        if (!U) return Tt;
        const ie = k;
        k.endScope && k.endScope._wrap ? (ce(), pe(v, k.endScope._wrap)) : k.endScope && k.endScope._multi ? (ce(), Ot(k.endScope, h)) : ie.skip ? K += v : (ie.returnEnd || ie.excludeEnd || (K += v), ce(), ie.excludeEnd && (K = v));
        do
          k.scope && te.closeNode(), !k.skip && !k.subLanguage && (ze += k.relevance), k = k.parent;
        while (k !== U.parent);
        return U.starts && Rt(U.starts, h), ie.returnEnd ? 0 : v.length;
      }
      function Pn() {
        const h = [];
        for (let v = k; v !== be; v = v.parent) v.scope && h.unshift(v.scope);
        h.forEach((v) => te.openNode(v));
      }
      let $e = {};
      function kt(h, v) {
        const x = v && v[0];
        if (K += h, x == null) return ce(), 0;
        if ($e.type === "begin" && v.type === "end" && $e.index === v.index && x === "") {
          if (K += A.slice(v.index, v.index + 1), !Y) {
            const U = new Error(`0 width match regex (${p})`);
            throw U.languageName = p, U.badRule = $e.rule, U;
          }
          return 1;
        }
        if ($e = v, v.type === "begin") return Ln(v);
        if (v.type === "illegal" && !B) {
          const U = new Error('Illegal lexeme "' + x + '" for mode "' + (k.scope || "<unnamed>") + '"');
          throw U.mode = k, U;
        } else if (v.type === "end") {
          const U = Bn(v);
          if (U !== Tt) return U;
        }
        if (v.type === "illegal" && x === "") return K += `
`, 1;
        if (ct > 1e5 && ct > v.index * 3) throw new Error("potential infinite loop, way more iterations than matches");
        return K += x, x.length;
      }
      const be = he(p);
      if (!be) throw Te(Z.replace("{}", p)), new Error('Unknown language: "' + p + '"');
      const Un = En(be);
      let ot = "", k = G || Un;
      const It = {}, te = new N.__emitter(N);
      Pn();
      let K = "", ze = 0, Se = 0, ct = 0, lt = false;
      try {
        if (be.__emitTokens) be.__emitTokens(A, te);
        else {
          for (k.matcher.considerAll(); ; ) {
            ct++, lt ? lt = false : k.matcher.considerAll(), k.matcher.lastIndex = Se;
            const h = k.matcher.exec(A);
            if (!h) break;
            const v = A.substring(Se, h.index), x = kt(v, h);
            Se = h.index + x;
          }
          kt(A.substring(Se));
        }
        return te.finalize(), ot = te.toHTML(), { language: p, value: ot, relevance: ze, illegal: false, _emitter: te, _top: k };
      } catch (h) {
        if (h.message && h.message.includes("Illegal")) return { language: p, value: it(A), illegal: true, relevance: 0, _illegalBy: { message: h.message, index: Se, context: A.slice(Se - 100, Se + 100), mode: h.mode, resultSoFar: ot }, _emitter: te };
        if (Y) return { language: p, value: it(A), illegal: false, relevance: 0, errorRaised: h, _emitter: te, _top: k };
        throw h;
      }
    }
    function at(p) {
      const A = { value: it(p), illegal: false, relevance: 0, _top: T, _emitter: new N.__emitter(N) };
      return A._emitter.addText(p), A;
    }
    function rt(p, A) {
      A = A || N.languages || Object.keys(l);
      const B = at(p), G = A.filter(he).filter(At).map((ce) => Ce(ce, p, false));
      G.unshift(B);
      const Q = G.sort((ce, pe) => {
        if (ce.relevance !== pe.relevance) return pe.relevance - ce.relevance;
        if (ce.language && pe.language) {
          if (he(ce.language).supersetOf === pe.language) return 1;
          if (he(pe.language).supersetOf === ce.language) return -1;
        }
        return 0;
      }), [ge, Ne] = Q, Fe = ge;
      return Fe.secondBest = Ne, Fe;
    }
    function Sn(p, A, B) {
      const G = A && _[A] || B;
      p.classList.add("hljs"), p.classList.add(`language-${G}`);
    }
    function st(p) {
      let A = null;
      const B = J(p);
      if (O(B)) return;
      if (Ue("before:highlightElement", { el: p, language: B }), p.dataset.highlighted) {
        console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.", p);
        return;
      }
      if (p.children.length > 0 && (N.ignoreUnescapedHTML || (console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."), console.warn("https://github.com/highlightjs/highlight.js/wiki/security"), console.warn("The element with unescaped HTML:"), console.warn(p)), N.throwUnescapedHTML)) throw new yn("One of your code blocks includes unescaped HTML.", p.innerHTML);
      A = p;
      const G = A.textContent, Q = B ? V(G, { language: B, ignoreIllegals: true }) : rt(G);
      p.innerHTML = Q.value, p.dataset.highlighted = "yes", Sn(p, B, Q.language), p.result = { language: Q.language, re: Q.relevance, relevance: Q.relevance }, Q.secondBest && (p.secondBest = { language: Q.secondBest.language, relevance: Q.secondBest.relevance }), Ue("after:highlightElement", { el: p, result: Q, text: G });
    }
    function wn(p) {
      N = yt(N, p);
    }
    const vn = () => {
      Pe(), Ae("10.6.0", "initHighlighting() deprecated.  Use highlightAll() now.");
    };
    function An() {
      Pe(), Ae("10.6.0", "initHighlightingOnLoad() deprecated.  Use highlightAll() now.");
    }
    let wt = false;
    function Pe() {
      function p() {
        Pe();
      }
      if (document.readyState === "loading") {
        wt || window.addEventListener("DOMContentLoaded", p, false), wt = true;
        return;
      }
      document.querySelectorAll(N.cssSelector).forEach(st);
    }
    function On(p, A) {
      let B = null;
      try {
        B = A(n);
      } catch (G) {
        if (Te("Language definition for '{}' could not be registered.".replace("{}", p)), Y) Te(G);
        else throw G;
        B = T;
      }
      B.name || (B.name = p), l[p] = B, B.rawDefinition = A.bind(null, n), B.aliases && vt(B.aliases, { languageName: p });
    }
    function Rn(p) {
      delete l[p];
      for (const A of Object.keys(_)) _[A] === p && delete _[A];
    }
    function Mn() {
      return Object.keys(l);
    }
    function he(p) {
      return p = (p || "").toLowerCase(), l[p] || l[_[p]];
    }
    function vt(p, { languageName: A }) {
      typeof p == "string" && (p = [p]), p.forEach((B) => {
        _[B.toLowerCase()] = A;
      });
    }
    function At(p) {
      const A = he(p);
      return A && !A.disableAutodetect;
    }
    function kn(p) {
      p["before:highlightBlock"] && !p["before:highlightElement"] && (p["before:highlightElement"] = (A) => {
        p["before:highlightBlock"](Object.assign({ block: A.el }, A));
      }), p["after:highlightBlock"] && !p["after:highlightElement"] && (p["after:highlightElement"] = (A) => {
        p["after:highlightBlock"](Object.assign({ block: A.el }, A));
      });
    }
    function In(p) {
      kn(p), R.push(p);
    }
    function Cn(p) {
      const A = R.indexOf(p);
      A !== -1 && R.splice(A, 1);
    }
    function Ue(p, A) {
      const B = p;
      R.forEach(function(G) {
        G[B] && G[B](A);
      });
    }
    function xn(p) {
      return Ae("10.7.0", "highlightBlock will be removed entirely in v12.0"), Ae("10.7.0", "Please use highlightElement now."), st(p);
    }
    Object.assign(n, { highlight: V, highlightAuto: rt, highlightAll: Pe, highlightElement: st, highlightBlock: xn, configure: wn, initHighlighting: vn, initHighlightingOnLoad: An, registerLanguage: On, unregisterLanguage: Rn, listLanguages: Mn, getLanguage: he, registerAliases: vt, autoDetection: At, inherit: yt, addPlugin: In, removePlugin: Cn }), n.debugMode = function() {
      Y = false;
    }, n.safeMode = function() {
      Y = true;
    }, n.versionString = Nn, n.regex = { concat: E, lookahead: b, either: w, optional: S, anyNumberOfTimes: f };
    for (const p in we) typeof we[p] == "object" && e(we[p]);
    return Object.assign(n, we), n;
  }, Oe = St({});
  return Oe.newInstance = () => St({}), bt = Oe, Oe.HighlightJS = Oe, Oe.default = Oe, bt;
}
var ya = Na();
const Ta = Gn(ya), un = {}, Sa = "hljs-";
function wa(e) {
  const t = Ta.newInstance();
  return e && g(e), { highlight: i, highlightAuto: a, listLanguages: r, register: g, registerAlias: s, registered: o };
  function i(d, c, u) {
    const m = u || un, b = typeof m.prefix == "string" ? m.prefix : Sa;
    if (!t.getLanguage(d)) throw new Error("Unknown language: `" + d + "` is not registered");
    t.configure({ __emitter: va, classPrefix: b });
    const f = t.highlight(c, { ignoreIllegals: true, language: d });
    if (f.errorRaised) throw new Error("Could not highlight with `Highlight.js`", { cause: f.errorRaised });
    const S = f._emitter.root, E = S.data;
    return E.language = f.language, E.relevance = f.relevance, S;
  }
  function a(d, c) {
    const m = (c || un).subset || r();
    let b = -1, f = 0, S;
    for (; ++b < m.length; ) {
      const E = m[b];
      if (!t.getLanguage(E)) continue;
      const y = i(E, d, c);
      y.data && y.data.relevance !== void 0 && y.data.relevance > f && (f = y.data.relevance, S = y);
    }
    return S || { type: "root", children: [], data: { language: void 0, relevance: f } };
  }
  function r() {
    return t.listLanguages();
  }
  function g(d, c) {
    if (typeof d == "string") t.registerLanguage(d, c);
    else {
      let u;
      for (u in d) Object.hasOwn(d, u) && t.registerLanguage(u, d[u]);
    }
  }
  function s(d, c) {
    if (typeof d == "string") t.registerAliases(typeof c == "string" ? c : [...c], { languageName: d });
    else {
      let u;
      for (u in d) if (Object.hasOwn(d, u)) {
        const m = d[u];
        t.registerAliases(typeof m == "string" ? m : [...m], { languageName: u });
      }
    }
  }
  function o(d) {
    return !!t.getLanguage(d);
  }
}
class va {
  constructor(t) {
    this.options = t, this.root = { type: "root", children: [], data: { language: void 0, relevance: 0 } }, this.stack = [this.root];
  }
  addText(t) {
    if (t === "") return;
    const i = this.stack[this.stack.length - 1], a = i.children[i.children.length - 1];
    a && a.type === "text" ? a.value += t : i.children.push({ type: "text", value: t });
  }
  startScope(t) {
    this.openNode(String(t));
  }
  endScope() {
    this.closeNode();
  }
  __addSublanguage(t, i) {
    const a = this.stack[this.stack.length - 1], r = t.root.children;
    i ? a.children.push({ type: "element", tagName: "span", properties: { className: [i] }, children: r }) : a.children.push(...r);
  }
  openNode(t) {
    const i = this, a = t.split(".").map(function(s, o) {
      return o ? s + "_".repeat(o) : i.options.classPrefix + s;
    }), r = this.stack[this.stack.length - 1], g = { type: "element", tagName: "span", properties: { className: a }, children: [] };
    r.children.push(g), this.stack.push(g);
  }
  closeNode() {
    this.stack.pop();
  }
  finalize() {
  }
  toHTML() {
    return "";
  }
}
const Aa = {};
function Oa(e) {
  const t = e || Aa, i = t.aliases, a = t.detect || false, r = t.languages || ha, g = t.plainText, s = t.prefix, o = t.subset;
  let d = "hljs";
  const c = wa(r);
  if (i && c.registerAlias(i), s) {
    const u = s.indexOf("-");
    d = u === -1 ? s : s.slice(0, u);
  }
  return function(u, m) {
    Kn(u, "element", function(b, f, S) {
      if (b.tagName !== "code" || !S || S.type !== "element" || S.tagName !== "pre") return;
      const E = Ra(b);
      if (E === false || !E && !a || E && g && g.includes(E)) return;
      Array.isArray(b.properties.className) || (b.properties.className = []), b.properties.className.includes(d) || b.properties.className.unshift(d);
      const y = qn(b, { whitespace: "pre" });
      let w;
      try {
        w = E ? c.highlight(E, y, { prefix: s }) : c.highlightAuto(y, { prefix: s, subset: o });
      } catch (I) {
        const D = I;
        if (E && /Unknown language/.test(D.message)) {
          m.message("Cannot highlight as `" + E + "`, it’s not registered", { ancestors: [S, b], cause: D, place: b.position, ruleId: "missing-language", source: "rehype-highlight" });
          return;
        }
        throw D;
      }
      !E && w.data && w.data.language && b.properties.className.push("language-" + w.data.language), w.children.length > 0 && (b.children = w.children);
    });
  };
}
function Ra(e) {
  const t = e.properties.className;
  let i = -1;
  if (!Array.isArray(t)) return;
  let a;
  for (; ++i < t.length; ) {
    const r = String(t[i]);
    if (r === "no-highlight" || r === "nohighlight") return false;
    !a && r.slice(0, 5) === "lang-" && (a = r.slice(5)), !a && r.slice(0, 9) === "language-" && (a = r.slice(9));
  }
  return a;
}
export {
  Oa as default
};
//# sourceMappingURL=index-1A8_O6CM.chunk.mjs.map
