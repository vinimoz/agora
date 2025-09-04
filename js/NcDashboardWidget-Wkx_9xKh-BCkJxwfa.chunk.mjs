(function() {
  "use strict";
  try {
    if (typeof document != "undefined") {
      var elementStyle = document.createElement("style");
      elementStyle.appendChild(document.createTextNode("/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/*\n* Ensure proper alignment of the vue material icons\n*/\n.material-design-icon {\n  display: flex;\n  align-self: center;\n  justify-self: center;\n  align-items: center;\n  justify-content: center;\n}\n\n/** When having the small dialog style we override the modal styling so dialogs look more dialog like */\n@media only screen and (max-width: 512px) {\n.dialog__modal .modal-wrapper--small .modal-container {\n    width: fit-content;\n    height: unset;\n    max-height: 90%;\n    position: relative;\n    top: unset;\n    border-radius: var(--border-radius-element);\n}\n}/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/*\n* Ensure proper alignment of the vue material icons\n*/\n.material-design-icon[data-v-5392f82b] {\n  display: flex;\n  align-self: center;\n  justify-self: center;\n  align-items: center;\n  justify-content: center;\n}\n.dialog[data-v-5392f82b] {\n  height: 100%;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  overflow: hidden;\n}\n.dialog__modal[data-v-5392f82b] .modal-wrapper .modal-container {\n  display: flex !important;\n  padding-block: 4px 0;\n  padding-inline: 12px 0;\n}\n.dialog__modal[data-v-5392f82b] .modal-wrapper .modal-container__content {\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.dialog__wrapper[data-v-5392f82b] {\n  display: flex;\n  flex-direction: row;\n  flex: 1;\n  min-height: 0;\n  overflow: hidden;\n}\n.dialog__wrapper--collapsed[data-v-5392f82b] {\n  flex-direction: column;\n}\n.dialog__navigation[data-v-5392f82b] {\n  display: flex;\n  flex-shrink: 0;\n}\n.dialog__wrapper:not(.dialog__wrapper--collapsed) .dialog__navigation[data-v-5392f82b] {\n  flex-direction: column;\n  overflow: hidden auto;\n  height: 100%;\n  min-width: 200px;\n  margin-inline-end: 20px;\n}\n.dialog__wrapper.dialog__wrapper--collapsed .dialog__navigation[data-v-5392f82b] {\n  flex-direction: row;\n  justify-content: space-between;\n  overflow: auto hidden;\n  width: 100%;\n  min-width: 100%;\n}\n.dialog__name[data-v-5392f82b] {\n  font-size: 21px;\n  text-align: center;\n  height: fit-content;\n  min-height: var(--default-clickable-area);\n  line-height: var(--default-clickable-area);\n  overflow-wrap: break-word;\n  margin-block: 0 12px;\n}\n.dialog__content[data-v-5392f82b] {\n  flex: 1;\n  min-height: 0;\n  overflow: auto;\n  padding-inline-end: 12px;\n}\n.dialog__text[data-v-5392f82b] {\n  padding-block-end: 6px;\n}\n.dialog__actions[data-v-5392f82b] {\n  display: flex;\n  gap: 6px;\n  align-content: center;\n  justify-content: end;\n  width: 100%;\n  max-width: 100%;\n  padding-inline: 0 12px;\n  margin-inline: 0;\n  margin-block: 0;\n}\n.dialog__actions[data-v-5392f82b]:not(:empty) {\n  margin-block: 6px 12px;\n}\n@media only screen and (max-width: 512px) {\n.dialog__name[data-v-5392f82b] {\n    text-align: start;\n    margin-inline-end: var(--default-clickable-area);\n}\n}/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/*\n* Ensure proper alignment of the vue material icons\n*/\n.material-design-icon[data-v-1893b364] {\n  display: flex;\n  align-self: center;\n  justify-self: center;\n  align-items: center;\n  justify-content: center;\n}\n.notecard[data-v-1893b364] {\n  --note-card-icon-size: 20px;\n  --note-card-padding: calc(2 * var(--default-grid-baseline));\n  color: var(--color-main-text) !important;\n  background-color: var(--note-background) !important;\n  border-inline-start: var(--default-grid-baseline) solid var(--note-theme);\n  border-radius: var(--border-radius-small);\n  margin: 1rem 0;\n  padding: var(--note-card-padding);\n  display: flex;\n  flex-direction: row;\n  gap: var(--note-card-padding);\n}\n.notecard__heading[data-v-1893b364] {\n  font-size: var(--note-card-icon-size);\n  font-weight: 600;\n}\n.notecard__icon[data-v-1893b364] {\n  color: var(--note-theme);\n}\n.notecard__icon--heading[data-v-1893b364] {\n  font-size: var(--note-card-icon-size);\n  margin-block: calc((1lh - 1em) / 2) auto;\n}\n.notecard--success[data-v-1893b364] {\n  --note-background: var(--color-success);\n  --note-theme: var(--color-success-text);\n}\n.notecard--info[data-v-1893b364] {\n  --note-background: var(--color-info);\n  --note-theme: var(--color-info-text);\n}\n.notecard--error[data-v-1893b364] {\n  --note-background: var(--color-error);\n  --note-theme: var(--color-error-text);\n}\n.notecard--warning[data-v-1893b364] {\n  --note-background: var(--color-warning);\n  --note-theme: var(--color-warning-text);\n}/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/*\n* Ensure proper alignment of the vue material icons\n*/\n.material-design-icon[data-v-2d259f64] {\n  display: flex;\n  align-self: center;\n  justify-self: center;\n  align-items: center;\n  justify-content: center;\n}\n.dashboard-widget[data-v-2d259f64] .empty-content {\n  text-align: center;\n  padding-top: 5vh;\n}\n.dashboard-widget[data-v-2d259f64] .empty-content.half-screen {\n  padding-top: 0;\n  margin-bottom: 1vh;\n}\n.more[data-v-2d259f64] {\n  display: block;\n  text-align: center;\n  color: var(--color-text-maxcontrast);\n  line-height: 60px;\n  cursor: pointer;\n}\n.more[data-v-2d259f64]:hover, .more[data-v-2d259f64]:focus {\n  background-color: var(--color-background-hover);\n  border-radius: var(--border-radius-element);\n  color: var(--color-main-text);\n}\n\n/* skeleton */\n.item-list__entry[data-v-2d259f64] {\n  display: flex;\n  align-items: flex-start;\n  padding: 8px;\n}\n.item-list__entry .item-avatar[data-v-2d259f64] {\n  position: relative;\n  margin-block: auto;\n  background-color: var(--color-background-dark) !important;\n}\n.item-list__entry .item__details[data-v-2d259f64] {\n  padding-inline-start: 8px;\n  max-height: var(--default-clickable-area);\n  flex-grow: 1;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n}\n.item-list__entry .item__details h3[data-v-2d259f64],\n.item-list__entry .item__details .message[data-v-2d259f64] {\n  white-space: nowrap;\n  background-color: var(--color-background-dark);\n}\n.item-list__entry .item__details h3[data-v-2d259f64] {\n  font-size: 100%;\n  margin: 0;\n}\n.item-list__entry .item__details .message[data-v-2d259f64] {\n  width: 80%;\n  height: 15px;\n  margin-top: 5px;\n}/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/*\n* Ensure proper alignment of the vue material icons\n*/\n.material-design-icon[data-v-68bcbc90] {\n  display: flex;\n  align-self: center;\n  justify-self: center;\n  align-items: center;\n  justify-content: center;\n}\n.item-list__entry[data-v-68bcbc90] {\n  display: flex;\n  align-items: center;\n  position: relative;\n  padding: 8px;\n}\n.item-list__entry[data-v-68bcbc90]:hover, .item-list__entry[data-v-68bcbc90]:focus {\n  background-color: var(--color-background-hover);\n  border-radius: var(--border-radius-element);\n}\n.item-list__entry .item-avatar[data-v-68bcbc90] {\n  position: relative;\n  margin-top: auto;\n  margin-bottom: auto;\n}\n.item-list__entry .item__details[data-v-68bcbc90] {\n  padding-inline-start: 8px;\n  max-height: fit-content;\n  flex-grow: 1;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  min-height: var(--default-clickable-area);\n}\n.item-list__entry .item__details h3[data-v-68bcbc90],\n.item-list__entry .item__details .message[data-v-68bcbc90] {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.item-list__entry .item__details .message span[data-v-68bcbc90] {\n  width: 10px;\n  display: inline-block;\n  margin-bottom: -3px;\n}\n.item-list__entry .item__details h3[data-v-68bcbc90] {\n  font-size: 100%;\n  margin: 0;\n}\n.item-list__entry .item__details .message[data-v-68bcbc90] {\n  width: 100%;\n  color: var(--color-text-maxcontrast);\n}\n.item-list__entry .item-icon[data-v-68bcbc90] {\n  position: relative;\n  width: 14px;\n  height: 14px;\n  margin-top: 25px;\n  margin-inline: -10px -2px;\n}\n.item-list__entry button.primary[data-v-68bcbc90] {\n  padding: 21px;\n  margin: 0;\n}\n\n/*\n.content-popover {\n	height: 0px;\n	width: 0px;\n	margin-inline: auto;\n}\n.popover-container {\n	width: 100%;\n	height: 0px;\n}\n*/"));
      document.head.appendChild(elementStyle);
    }
  } catch (e) {
    console.error("vite-plugin-css-injected-by-js", e);
  }
})();
const xY = "agora", NY = "1.0.0rc3";
import { aU as b_, X as Qc, aV as zM, aW as F_, a3 as x_, d as Xc, P as tr, e as Ya, o as qe, w as sr, B as eg, z as Ca, r as Vs, x as Cs, u as Od, ab as BM, a4 as N_, J as WM, U as $M, aX as Ud, K as Ks, aY as zd, aZ as Bd, a_ as tg, a$ as Sa, b0 as A_, b1 as Wd, b2 as GM, k as $d, t as re, O as JM, aO as Gd, C as VM, aQ as KM, aP as sg, b3 as ZM, D as QM, b4 as XM, b as eL, q as tL, b5 as sL, ar as ng, aJ as nL, i as Jd, c as dt, b6 as aL, b7 as rL, N as E_, V as nr, a as ba, f as Vd, L as ag, M as rg, ae as iL, I as oL, s as lL, b8 as dL, v as H_, aa as uL } from "./NcEmptyContent-q-geAf0w-BTrjHyYY.chunk.mjs";
const Z = b_().setApp("agora").detectUser().build();
function mL(s) {
  const r = s.reduce((m, g) => (m[g.id] = g, m), {}), i = s.filter((m) => m.parent === 0).sort((m, g) => g.timestamp - m.timestamp).map((m) => {
    const h = l(m.id).sort((p, M) => {
      const v = r[p.id], D = r[M.id];
      return v && D ? v.timestamp !== D.timestamp ? D.timestamp - v.timestamp : D.id - v.id : M.id - p.id;
    });
    return { ...m, comments: h };
  });
  function l(m) {
    const g = [], h = [m];
    for (; h.length > 0; ) {
      const p = h.pop();
      if (p !== void 0) {
        const M = r[p];
        if (M) {
          g.push({ ...M });
          const v = s.filter((D) => D.parent === p).map((D) => D.id);
          h.push(...v);
        }
      }
    }
    return g;
  }
  return i;
}
function cL(s) {
  const r = s.reduce((m, g) => (m[g.id] = g, m), {}), i = s.filter((m) => m.parent === 0).sort((m, g) => g.timestamp - m.timestamp).map((m) => {
    const h = l(m.id).sort((p, M) => {
      const v = r[p.id], D = r[M.id];
      return v && D ? v.timestamp !== D.timestamp ? D.timestamp - v.timestamp : D.id - v.id : M.id - p.id;
    });
    return { ...m, supports: h };
  });
  function l(m) {
    const g = [], h = [m];
    for (; h.length > 0; ) {
      const p = h.pop();
      if (p !== void 0) {
        const M = r[p];
        if (M) {
          g.push({ ...M });
          const v = s.filter((D) => D.parent === p).map((D) => D.id);
          h.push(...v);
        }
      }
    }
    return g;
  }
  return i;
}
function ig() {
  return { async: false, breaks: false, extensions: null, gfm: true, hooks: null, pedantic: false, renderer: null, silent: false, tokenizer: null, walkTokens: null };
}
var ar = ig();
function P_(s) {
  ar = s;
}
var Lo = { exec: () => null };
function Fe(s, r = "") {
  let i = typeof s == "string" ? s : s.source;
  const l = { replace: (m, g) => {
    let h = typeof g == "string" ? g : g.source;
    return h = h.replace(qt.caret, "$1"), i = i.replace(m, h), l;
  }, getRegex: () => new RegExp(i, r) };
  return l;
}
var qt = { codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, listReplaceTabs: /^\t+/, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\] /, listReplaceTask: /^\[[ xX]\] +/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (s) => new RegExp(`^( {0,3}${s})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: (s) => new RegExp(`^ {0,${Math.min(3, s - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), hrRegex: (s) => new RegExp(`^ {0,${Math.min(3, s - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), fencesBeginRegex: (s) => new RegExp(`^ {0,${Math.min(3, s - 1)}}(?:\`\`\`|~~~)`), headingBeginRegex: (s) => new RegExp(`^ {0,${Math.min(3, s - 1)}}#`), htmlBeginRegex: (s) => new RegExp(`^ {0,${Math.min(3, s - 1)}}<(?:[a-z].*>|!--)`, "i") }, gL = /^(?:[ \t]*(?:\n|$))+/, hL = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, fL = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, ko = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, _L = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, og = /(?:[*+-]|\d{1,9}[.)])/, j_ = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, q_ = Fe(j_).replace(/bull/g, og).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), pL = Fe(j_).replace(/bull/g, og).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), lg = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, yL = /^[^\n]+/, dg = /(?!\s*\])(?:\\.|[^\[\]\\])+/, wL = Fe(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", dg).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), vL = Fe(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, og).getRegex(), Kd = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", ug = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, ML = Fe("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", ug).replace("tag", Kd).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), I_ = Fe(lg).replace("hr", ko).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Kd).getRegex(), LL = Fe(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", I_).getRegex(), mg = { blockquote: LL, code: hL, def: wL, fences: fL, heading: _L, hr: ko, html: ML, lheading: q_, list: vL, newline: gL, paragraph: I_, table: Lo, text: yL }, R_ = Fe("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", ko).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Kd).getRegex(), kL = { ...mg, lheading: pL, table: R_, paragraph: Fe(lg).replace("hr", ko).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", R_).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Kd).getRegex() }, TL = { ...mg, html: Fe(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", ug).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: Lo, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: Fe(lg).replace("hr", ko).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", q_).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() }, DL = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, YL = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, O_ = /^( {2,}|\\)\n(?!\s*$)/, CL = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, Zd = /[\p{P}\p{S}]/u, cg = /[\s\p{P}\p{S}]/u, U_ = /[^\s\p{P}\p{S}]/u, SL = Fe(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, cg).getRegex(), z_ = /(?!~)[\p{P}\p{S}]/u, bL = /(?!~)[\s\p{P}\p{S}]/u, FL = /(?:[^\s\p{P}\p{S}]|~)/u, xL = /\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g, B_ = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/, NL = Fe(B_, "u").replace(/punct/g, Zd).getRegex(), AL = Fe(B_, "u").replace(/punct/g, z_).getRegex(), W_ = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", EL = Fe(W_, "gu").replace(/notPunctSpace/g, U_).replace(/punctSpace/g, cg).replace(/punct/g, Zd).getRegex(), HL = Fe(W_, "gu").replace(/notPunctSpace/g, FL).replace(/punctSpace/g, bL).replace(/punct/g, z_).getRegex(), PL = Fe("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, U_).replace(/punctSpace/g, cg).replace(/punct/g, Zd).getRegex(), jL = Fe(/\\(punct)/, "gu").replace(/punct/g, Zd).getRegex(), qL = Fe(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), IL = Fe(ug).replace("(?:-->|$)", "-->").getRegex(), RL = Fe("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", IL).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), Qd = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/, OL = Fe(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", Qd).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), $_ = Fe(/^!?\[(label)\]\[(ref)\]/).replace("label", Qd).replace("ref", dg).getRegex(), G_ = Fe(/^!?\[(ref)\](?:\[\])?/).replace("ref", dg).getRegex(), UL = Fe("reflink|nolink(?!\\()", "g").replace("reflink", $_).replace("nolink", G_).getRegex(), gg = { _backpedal: Lo, anyPunctuation: jL, autolink: qL, blockSkip: xL, br: O_, code: YL, del: Lo, emStrongLDelim: NL, emStrongRDelimAst: EL, emStrongRDelimUnd: PL, escape: DL, link: OL, nolink: G_, punctuation: SL, reflink: $_, reflinkSearch: UL, tag: RL, text: CL, url: Lo }, zL = { ...gg, link: Fe(/^!?\[(label)\]\((.*?)\)/).replace("label", Qd).getRegex(), reflink: Fe(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", Qd).getRegex() }, hg = { ...gg, emStrongRDelimAst: HL, emStrongLDelim: AL, url: Fe(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/, text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/ }, BL = { ...hg, br: Fe(O_).replace("{2,}", "*").getRegex(), text: Fe(hg.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() }, Xd = { normal: mg, gfm: kL, pedantic: TL }, To = { normal: gg, gfm: hg, breaks: BL, pedantic: zL }, WL = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, J_ = (s) => WL[s];
function yn(s, r) {
  if (r) {
    if (qt.escapeTest.test(s)) return s.replace(qt.escapeReplace, J_);
  } else if (qt.escapeTestNoEncode.test(s)) return s.replace(qt.escapeReplaceNoEncode, J_);
  return s;
}
function V_(s) {
  try {
    s = encodeURI(s).replace(qt.percentDecode, "%");
  } catch {
    return null;
  }
  return s;
}
function K_(s, r) {
  const i = s.replace(qt.findPipe, (g, h, p) => {
    let M = false, v = h;
    for (; --v >= 0 && p[v] === "\\"; ) M = !M;
    return M ? "|" : " |";
  }), l = i.split(qt.splitPipe);
  let m = 0;
  if (l[0].trim() || l.shift(), l.length > 0 && !l.at(-1)?.trim() && l.pop(), r) if (l.length > r) l.splice(r);
  else for (; l.length < r; ) l.push("");
  for (; m < l.length; m++) l[m] = l[m].trim().replace(qt.slashPipe, "|");
  return l;
}
function Do(s, r, i) {
  const l = s.length;
  if (l === 0) return "";
  let m = 0;
  for (; m < l && s.charAt(l - m - 1) === r; ) m++;
  return s.slice(0, l - m);
}
function $L(s, r) {
  if (s.indexOf(r[1]) === -1) return -1;
  let i = 0;
  for (let l = 0; l < s.length; l++) if (s[l] === "\\") l++;
  else if (s[l] === r[0]) i++;
  else if (s[l] === r[1] && (i--, i < 0)) return l;
  return i > 0 ? -2 : -1;
}
function Z_(s, r, i, l, m) {
  const g = r.href, h = r.title || null, p = s[1].replace(m.other.outputLinkReplace, "$1");
  l.state.inLink = true;
  const M = { type: s[0].charAt(0) === "!" ? "image" : "link", raw: i, href: g, title: h, text: p, tokens: l.inlineTokens(p) };
  return l.state.inLink = false, M;
}
function GL(s, r, i) {
  const l = s.match(i.other.indentCodeCompensation);
  if (l === null) return r;
  const m = l[1];
  return r.split(`
`).map((g) => {
    const h = g.match(i.other.beginningSpace);
    if (h === null) return g;
    const [p] = h;
    return p.length >= m.length ? g.slice(m.length) : g;
  }).join(`
`);
}
var eu = class {
  options;
  rules;
  lexer;
  constructor(s) {
    this.options = s || ar;
  }
  space(s) {
    const r = this.rules.block.newline.exec(s);
    if (r && r[0].length > 0) return { type: "space", raw: r[0] };
  }
  code(s) {
    const r = this.rules.block.code.exec(s);
    if (r) {
      const i = r[0].replace(this.rules.other.codeRemoveIndent, "");
      return { type: "code", raw: r[0], codeBlockStyle: "indented", text: this.options.pedantic ? i : Do(i, `
`) };
    }
  }
  fences(s) {
    const r = this.rules.block.fences.exec(s);
    if (r) {
      const i = r[0], l = GL(i, r[3] || "", this.rules);
      return { type: "code", raw: i, lang: r[2] ? r[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : r[2], text: l };
    }
  }
  heading(s) {
    const r = this.rules.block.heading.exec(s);
    if (r) {
      let i = r[2].trim();
      if (this.rules.other.endingHash.test(i)) {
        const l = Do(i, "#");
        (this.options.pedantic || !l || this.rules.other.endingSpaceChar.test(l)) && (i = l.trim());
      }
      return { type: "heading", raw: r[0], depth: r[1].length, text: i, tokens: this.lexer.inline(i) };
    }
  }
  hr(s) {
    const r = this.rules.block.hr.exec(s);
    if (r) return { type: "hr", raw: Do(r[0], `
`) };
  }
  blockquote(s) {
    const r = this.rules.block.blockquote.exec(s);
    if (r) {
      let i = Do(r[0], `
`).split(`
`), l = "", m = "";
      const g = [];
      for (; i.length > 0; ) {
        let h = false;
        const p = [];
        let M;
        for (M = 0; M < i.length; M++) if (this.rules.other.blockquoteStart.test(i[M])) p.push(i[M]), h = true;
        else if (!h) p.push(i[M]);
        else break;
        i = i.slice(M);
        const v = p.join(`
`), D = v.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        l = l ? `${l}
${v}` : v, m = m ? `${m}
${D}` : D;
        const S = this.lexer.state.top;
        if (this.lexer.state.top = true, this.lexer.blockTokens(D, g, true), this.lexer.state.top = S, i.length === 0) break;
        const E = g.at(-1);
        if (E?.type === "code") break;
        if (E?.type === "blockquote") {
          const N = E, j = N.raw + `
` + i.join(`
`), R = this.blockquote(j);
          g[g.length - 1] = R, l = l.substring(0, l.length - N.raw.length) + R.raw, m = m.substring(0, m.length - N.text.length) + R.text;
          break;
        } else if (E?.type === "list") {
          const N = E, j = N.raw + `
` + i.join(`
`), R = this.list(j);
          g[g.length - 1] = R, l = l.substring(0, l.length - E.raw.length) + R.raw, m = m.substring(0, m.length - N.raw.length) + R.raw, i = j.substring(g.at(-1).raw.length).split(`
`);
          continue;
        }
      }
      return { type: "blockquote", raw: l, tokens: g, text: m };
    }
  }
  list(s) {
    let r = this.rules.block.list.exec(s);
    if (r) {
      let i = r[1].trim();
      const l = i.length > 1, m = { type: "list", raw: "", ordered: l, start: l ? +i.slice(0, -1) : "", loose: false, items: [] };
      i = l ? `\\d{1,9}\\${i.slice(-1)}` : `\\${i}`, this.options.pedantic && (i = l ? i : "[*+-]");
      const g = this.rules.other.listItemRegex(i);
      let h = false;
      for (; s; ) {
        let M = false, v = "", D = "";
        if (!(r = g.exec(s)) || this.rules.block.hr.test(s)) break;
        v = r[0], s = s.substring(v.length);
        let S = r[2].split(`
`, 1)[0].replace(this.rules.other.listReplaceTabs, (X) => " ".repeat(3 * X.length)), E = s.split(`
`, 1)[0], N = !S.trim(), j = 0;
        if (this.options.pedantic ? (j = 2, D = S.trimStart()) : N ? j = r[1].length + 1 : (j = r[2].search(this.rules.other.nonSpaceChar), j = j > 4 ? 1 : j, D = S.slice(j), j += r[1].length), N && this.rules.other.blankLine.test(E) && (v += E + `
`, s = s.substring(E.length + 1), M = true), !M) {
          const X = this.rules.other.nextBulletRegex(j), ee = this.rules.other.hrRegex(j), se = this.rules.other.fencesBeginRegex(j), Q = this.rules.other.headingBeginRegex(j), ge = this.rules.other.htmlBeginRegex(j);
          for (; s; ) {
            const B = s.split(`
`, 1)[0];
            let J;
            if (E = B, this.options.pedantic ? (E = E.replace(this.rules.other.listReplaceNesting, "  "), J = E) : J = E.replace(this.rules.other.tabCharGlobal, "    "), se.test(E) || Q.test(E) || ge.test(E) || X.test(E) || ee.test(E)) break;
            if (J.search(this.rules.other.nonSpaceChar) >= j || !E.trim()) D += `
` + J.slice(j);
            else {
              if (N || S.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || se.test(S) || Q.test(S) || ee.test(S)) break;
              D += `
` + E;
            }
            !N && !E.trim() && (N = true), v += B + `
`, s = s.substring(B.length + 1), S = J.slice(j);
          }
        }
        m.loose || (h ? m.loose = true : this.rules.other.doubleBlankLine.test(v) && (h = true));
        let R = null, x;
        this.options.gfm && (R = this.rules.other.listIsTask.exec(D), R && (x = R[0] !== "[ ] ", D = D.replace(this.rules.other.listReplaceTask, ""))), m.items.push({ type: "list_item", raw: v, task: !!R, checked: x, loose: false, text: D, tokens: [] }), m.raw += v;
      }
      const p = m.items.at(-1);
      if (p) p.raw = p.raw.trimEnd(), p.text = p.text.trimEnd();
      else return;
      m.raw = m.raw.trimEnd();
      for (let M = 0; M < m.items.length; M++) if (this.lexer.state.top = false, m.items[M].tokens = this.lexer.blockTokens(m.items[M].text, []), !m.loose) {
        const v = m.items[M].tokens.filter((S) => S.type === "space"), D = v.length > 0 && v.some((S) => this.rules.other.anyLine.test(S.raw));
        m.loose = D;
      }
      if (m.loose) for (let M = 0; M < m.items.length; M++) m.items[M].loose = true;
      return m;
    }
  }
  html(s) {
    const r = this.rules.block.html.exec(s);
    if (r) return { type: "html", block: true, raw: r[0], pre: r[1] === "pre" || r[1] === "script" || r[1] === "style", text: r[0] };
  }
  def(s) {
    const r = this.rules.block.def.exec(s);
    if (r) {
      const i = r[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "), l = r[2] ? r[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", m = r[3] ? r[3].substring(1, r[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : r[3];
      return { type: "def", tag: i, raw: r[0], href: l, title: m };
    }
  }
  table(s) {
    const r = this.rules.block.table.exec(s);
    if (!r || !this.rules.other.tableDelimiter.test(r[2])) return;
    const i = K_(r[1]), l = r[2].replace(this.rules.other.tableAlignChars, "").split("|"), m = r[3]?.trim() ? r[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], g = { type: "table", raw: r[0], header: [], align: [], rows: [] };
    if (i.length === l.length) {
      for (const h of l) this.rules.other.tableAlignRight.test(h) ? g.align.push("right") : this.rules.other.tableAlignCenter.test(h) ? g.align.push("center") : this.rules.other.tableAlignLeft.test(h) ? g.align.push("left") : g.align.push(null);
      for (let h = 0; h < i.length; h++) g.header.push({ text: i[h], tokens: this.lexer.inline(i[h]), header: true, align: g.align[h] });
      for (const h of m) g.rows.push(K_(h, g.header.length).map((p, M) => ({ text: p, tokens: this.lexer.inline(p), header: false, align: g.align[M] })));
      return g;
    }
  }
  lheading(s) {
    const r = this.rules.block.lheading.exec(s);
    if (r) return { type: "heading", raw: r[0], depth: r[2].charAt(0) === "=" ? 1 : 2, text: r[1], tokens: this.lexer.inline(r[1]) };
  }
  paragraph(s) {
    const r = this.rules.block.paragraph.exec(s);
    if (r) {
      const i = r[1].charAt(r[1].length - 1) === `
` ? r[1].slice(0, -1) : r[1];
      return { type: "paragraph", raw: r[0], text: i, tokens: this.lexer.inline(i) };
    }
  }
  text(s) {
    const r = this.rules.block.text.exec(s);
    if (r) return { type: "text", raw: r[0], text: r[0], tokens: this.lexer.inline(r[0]) };
  }
  escape(s) {
    const r = this.rules.inline.escape.exec(s);
    if (r) return { type: "escape", raw: r[0], text: r[1] };
  }
  tag(s) {
    const r = this.rules.inline.tag.exec(s);
    if (r) return !this.lexer.state.inLink && this.rules.other.startATag.test(r[0]) ? this.lexer.state.inLink = true : this.lexer.state.inLink && this.rules.other.endATag.test(r[0]) && (this.lexer.state.inLink = false), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(r[0]) ? this.lexer.state.inRawBlock = true : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(r[0]) && (this.lexer.state.inRawBlock = false), { type: "html", raw: r[0], inLink: this.lexer.state.inLink, inRawBlock: this.lexer.state.inRawBlock, block: false, text: r[0] };
  }
  link(s) {
    const r = this.rules.inline.link.exec(s);
    if (r) {
      const i = r[2].trim();
      if (!this.options.pedantic && this.rules.other.startAngleBracket.test(i)) {
        if (!this.rules.other.endAngleBracket.test(i)) return;
        const g = Do(i.slice(0, -1), "\\");
        if ((i.length - g.length) % 2 === 0) return;
      } else {
        const g = $L(r[2], "()");
        if (g === -2) return;
        if (g > -1) {
          const p = (r[0].indexOf("!") === 0 ? 5 : 4) + r[1].length + g;
          r[2] = r[2].substring(0, g), r[0] = r[0].substring(0, p).trim(), r[3] = "";
        }
      }
      let l = r[2], m = "";
      if (this.options.pedantic) {
        const g = this.rules.other.pedanticHrefTitle.exec(l);
        g && (l = g[1], m = g[3]);
      } else m = r[3] ? r[3].slice(1, -1) : "";
      return l = l.trim(), this.rules.other.startAngleBracket.test(l) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(i) ? l = l.slice(1) : l = l.slice(1, -1)), Z_(r, { href: l && l.replace(this.rules.inline.anyPunctuation, "$1"), title: m && m.replace(this.rules.inline.anyPunctuation, "$1") }, r[0], this.lexer, this.rules);
    }
  }
  reflink(s, r) {
    let i;
    if ((i = this.rules.inline.reflink.exec(s)) || (i = this.rules.inline.nolink.exec(s))) {
      const l = (i[2] || i[1]).replace(this.rules.other.multipleSpaceGlobal, " "), m = r[l.toLowerCase()];
      if (!m) {
        const g = i[0].charAt(0);
        return { type: "text", raw: g, text: g };
      }
      return Z_(i, m, i[0], this.lexer, this.rules);
    }
  }
  emStrong(s, r, i = "") {
    let l = this.rules.inline.emStrongLDelim.exec(s);
    if (!l || l[3] && i.match(this.rules.other.unicodeAlphaNumeric)) return;
    if (!(l[1] || l[2] || "") || !i || this.rules.inline.punctuation.exec(i)) {
      const g = [...l[0]].length - 1;
      let h, p, M = g, v = 0;
      const D = l[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (D.lastIndex = 0, r = r.slice(-1 * s.length + g); (l = D.exec(r)) != null; ) {
        if (h = l[1] || l[2] || l[3] || l[4] || l[5] || l[6], !h) continue;
        if (p = [...h].length, l[3] || l[4]) {
          M += p;
          continue;
        } else if ((l[5] || l[6]) && g % 3 && !((g + p) % 3)) {
          v += p;
          continue;
        }
        if (M -= p, M > 0) continue;
        p = Math.min(p, p + M + v);
        const S = [...l[0]][0].length, E = s.slice(0, g + l.index + S + p);
        if (Math.min(g, p) % 2) {
          const j = E.slice(1, -1);
          return { type: "em", raw: E, text: j, tokens: this.lexer.inlineTokens(j) };
        }
        const N = E.slice(2, -2);
        return { type: "strong", raw: E, text: N, tokens: this.lexer.inlineTokens(N) };
      }
    }
  }
  codespan(s) {
    const r = this.rules.inline.code.exec(s);
    if (r) {
      let i = r[2].replace(this.rules.other.newLineCharGlobal, " ");
      const l = this.rules.other.nonSpaceChar.test(i), m = this.rules.other.startingSpaceChar.test(i) && this.rules.other.endingSpaceChar.test(i);
      return l && m && (i = i.substring(1, i.length - 1)), { type: "codespan", raw: r[0], text: i };
    }
  }
  br(s) {
    const r = this.rules.inline.br.exec(s);
    if (r) return { type: "br", raw: r[0] };
  }
  del(s) {
    const r = this.rules.inline.del.exec(s);
    if (r) return { type: "del", raw: r[0], text: r[2], tokens: this.lexer.inlineTokens(r[2]) };
  }
  autolink(s) {
    const r = this.rules.inline.autolink.exec(s);
    if (r) {
      let i, l;
      return r[2] === "@" ? (i = r[1], l = "mailto:" + i) : (i = r[1], l = i), { type: "link", raw: r[0], text: i, href: l, tokens: [{ type: "text", raw: i, text: i }] };
    }
  }
  url(s) {
    let r;
    if (r = this.rules.inline.url.exec(s)) {
      let i, l;
      if (r[2] === "@") i = r[0], l = "mailto:" + i;
      else {
        let m;
        do
          m = r[0], r[0] = this.rules.inline._backpedal.exec(r[0])?.[0] ?? "";
        while (m !== r[0]);
        i = r[0], r[1] === "www." ? l = "http://" + r[0] : l = r[0];
      }
      return { type: "link", raw: r[0], text: i, href: l, tokens: [{ type: "text", raw: i, text: i }] };
    }
  }
  inlineText(s) {
    const r = this.rules.inline.text.exec(s);
    if (r) {
      const i = this.lexer.state.inRawBlock;
      return { type: "text", raw: r[0], text: r[0], escaped: i };
    }
  }
}, On = class Xf {
  tokens;
  options;
  state;
  tokenizer;
  inlineQueue;
  constructor(r) {
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = r || ar, this.options.tokenizer = this.options.tokenizer || new eu(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: false, inRawBlock: false, top: true };
    const i = { other: qt, block: Xd.normal, inline: To.normal };
    this.options.pedantic ? (i.block = Xd.pedantic, i.inline = To.pedantic) : this.options.gfm && (i.block = Xd.gfm, this.options.breaks ? i.inline = To.breaks : i.inline = To.gfm), this.tokenizer.rules = i;
  }
  static get rules() {
    return { block: Xd, inline: To };
  }
  static lex(r, i) {
    return new Xf(i).lex(r);
  }
  static lexInline(r, i) {
    return new Xf(i).inlineTokens(r);
  }
  lex(r) {
    r = r.replace(qt.carriageReturn, `
`), this.blockTokens(r, this.tokens);
    for (let i = 0; i < this.inlineQueue.length; i++) {
      const l = this.inlineQueue[i];
      this.inlineTokens(l.src, l.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(r, i = [], l = false) {
    for (this.options.pedantic && (r = r.replace(qt.tabCharGlobal, "    ").replace(qt.spaceLine, "")); r; ) {
      let m;
      if (this.options.extensions?.block?.some((h) => (m = h.call({ lexer: this }, r, i)) ? (r = r.substring(m.raw.length), i.push(m), true) : false)) continue;
      if (m = this.tokenizer.space(r)) {
        r = r.substring(m.raw.length);
        const h = i.at(-1);
        m.raw.length === 1 && h !== void 0 ? h.raw += `
` : i.push(m);
        continue;
      }
      if (m = this.tokenizer.code(r)) {
        r = r.substring(m.raw.length);
        const h = i.at(-1);
        h?.type === "paragraph" || h?.type === "text" ? (h.raw += `
` + m.raw, h.text += `
` + m.text, this.inlineQueue.at(-1).src = h.text) : i.push(m);
        continue;
      }
      if (m = this.tokenizer.fences(r)) {
        r = r.substring(m.raw.length), i.push(m);
        continue;
      }
      if (m = this.tokenizer.heading(r)) {
        r = r.substring(m.raw.length), i.push(m);
        continue;
      }
      if (m = this.tokenizer.hr(r)) {
        r = r.substring(m.raw.length), i.push(m);
        continue;
      }
      if (m = this.tokenizer.blockquote(r)) {
        r = r.substring(m.raw.length), i.push(m);
        continue;
      }
      if (m = this.tokenizer.list(r)) {
        r = r.substring(m.raw.length), i.push(m);
        continue;
      }
      if (m = this.tokenizer.html(r)) {
        r = r.substring(m.raw.length), i.push(m);
        continue;
      }
      if (m = this.tokenizer.def(r)) {
        r = r.substring(m.raw.length);
        const h = i.at(-1);
        h?.type === "paragraph" || h?.type === "text" ? (h.raw += `
` + m.raw, h.text += `
` + m.raw, this.inlineQueue.at(-1).src = h.text) : this.tokens.links[m.tag] || (this.tokens.links[m.tag] = { href: m.href, title: m.title });
        continue;
      }
      if (m = this.tokenizer.table(r)) {
        r = r.substring(m.raw.length), i.push(m);
        continue;
      }
      if (m = this.tokenizer.lheading(r)) {
        r = r.substring(m.raw.length), i.push(m);
        continue;
      }
      let g = r;
      if (this.options.extensions?.startBlock) {
        let h = 1 / 0;
        const p = r.slice(1);
        let M;
        this.options.extensions.startBlock.forEach((v) => {
          M = v.call({ lexer: this }, p), typeof M == "number" && M >= 0 && (h = Math.min(h, M));
        }), h < 1 / 0 && h >= 0 && (g = r.substring(0, h + 1));
      }
      if (this.state.top && (m = this.tokenizer.paragraph(g))) {
        const h = i.at(-1);
        l && h?.type === "paragraph" ? (h.raw += `
` + m.raw, h.text += `
` + m.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = h.text) : i.push(m), l = g.length !== r.length, r = r.substring(m.raw.length);
        continue;
      }
      if (m = this.tokenizer.text(r)) {
        r = r.substring(m.raw.length);
        const h = i.at(-1);
        h?.type === "text" ? (h.raw += `
` + m.raw, h.text += `
` + m.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = h.text) : i.push(m);
        continue;
      }
      if (r) {
        const h = "Infinite loop on byte: " + r.charCodeAt(0);
        if (this.options.silent) {
          console.error(h);
          break;
        } else throw new Error(h);
      }
    }
    return this.state.top = true, i;
  }
  inline(r, i = []) {
    return this.inlineQueue.push({ src: r, tokens: i }), i;
  }
  inlineTokens(r, i = []) {
    let l = r, m = null;
    if (this.tokens.links) {
      const p = Object.keys(this.tokens.links);
      if (p.length > 0) for (; (m = this.tokenizer.rules.inline.reflinkSearch.exec(l)) != null; ) p.includes(m[0].slice(m[0].lastIndexOf("[") + 1, -1)) && (l = l.slice(0, m.index) + "[" + "a".repeat(m[0].length - 2) + "]" + l.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (m = this.tokenizer.rules.inline.anyPunctuation.exec(l)) != null; ) l = l.slice(0, m.index) + "++" + l.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    for (; (m = this.tokenizer.rules.inline.blockSkip.exec(l)) != null; ) l = l.slice(0, m.index) + "[" + "a".repeat(m[0].length - 2) + "]" + l.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    let g = false, h = "";
    for (; r; ) {
      g || (h = ""), g = false;
      let p;
      if (this.options.extensions?.inline?.some((v) => (p = v.call({ lexer: this }, r, i)) ? (r = r.substring(p.raw.length), i.push(p), true) : false)) continue;
      if (p = this.tokenizer.escape(r)) {
        r = r.substring(p.raw.length), i.push(p);
        continue;
      }
      if (p = this.tokenizer.tag(r)) {
        r = r.substring(p.raw.length), i.push(p);
        continue;
      }
      if (p = this.tokenizer.link(r)) {
        r = r.substring(p.raw.length), i.push(p);
        continue;
      }
      if (p = this.tokenizer.reflink(r, this.tokens.links)) {
        r = r.substring(p.raw.length);
        const v = i.at(-1);
        p.type === "text" && v?.type === "text" ? (v.raw += p.raw, v.text += p.text) : i.push(p);
        continue;
      }
      if (p = this.tokenizer.emStrong(r, l, h)) {
        r = r.substring(p.raw.length), i.push(p);
        continue;
      }
      if (p = this.tokenizer.codespan(r)) {
        r = r.substring(p.raw.length), i.push(p);
        continue;
      }
      if (p = this.tokenizer.br(r)) {
        r = r.substring(p.raw.length), i.push(p);
        continue;
      }
      if (p = this.tokenizer.del(r)) {
        r = r.substring(p.raw.length), i.push(p);
        continue;
      }
      if (p = this.tokenizer.autolink(r)) {
        r = r.substring(p.raw.length), i.push(p);
        continue;
      }
      if (!this.state.inLink && (p = this.tokenizer.url(r))) {
        r = r.substring(p.raw.length), i.push(p);
        continue;
      }
      let M = r;
      if (this.options.extensions?.startInline) {
        let v = 1 / 0;
        const D = r.slice(1);
        let S;
        this.options.extensions.startInline.forEach((E) => {
          S = E.call({ lexer: this }, D), typeof S == "number" && S >= 0 && (v = Math.min(v, S));
        }), v < 1 / 0 && v >= 0 && (M = r.substring(0, v + 1));
      }
      if (p = this.tokenizer.inlineText(M)) {
        r = r.substring(p.raw.length), p.raw.slice(-1) !== "_" && (h = p.raw.slice(-1)), g = true;
        const v = i.at(-1);
        v?.type === "text" ? (v.raw += p.raw, v.text += p.text) : i.push(p);
        continue;
      }
      if (r) {
        const v = "Infinite loop on byte: " + r.charCodeAt(0);
        if (this.options.silent) {
          console.error(v);
          break;
        } else throw new Error(v);
      }
    }
    return i;
  }
}, tu = class {
  options;
  parser;
  constructor(s) {
    this.options = s || ar;
  }
  space(s) {
    return "";
  }
  code({ text: s, lang: r, escaped: i }) {
    const l = (r || "").match(qt.notSpaceStart)?.[0], m = s.replace(qt.endingNewline, "") + `
`;
    return l ? '<pre><code class="language-' + yn(l) + '">' + (i ? m : yn(m, true)) + `</code></pre>
` : "<pre><code>" + (i ? m : yn(m, true)) + `</code></pre>
`;
  }
  blockquote({ tokens: s }) {
    return `<blockquote>
${this.parser.parse(s)}</blockquote>
`;
  }
  html({ text: s }) {
    return s;
  }
  heading({ tokens: s, depth: r }) {
    return `<h${r}>${this.parser.parseInline(s)}</h${r}>
`;
  }
  hr(s) {
    return `<hr>
`;
  }
  list(s) {
    const r = s.ordered, i = s.start;
    let l = "";
    for (let h = 0; h < s.items.length; h++) {
      const p = s.items[h];
      l += this.listitem(p);
    }
    const m = r ? "ol" : "ul", g = r && i !== 1 ? ' start="' + i + '"' : "";
    return "<" + m + g + `>
` + l + "</" + m + `>
`;
  }
  listitem(s) {
    let r = "";
    if (s.task) {
      const i = this.checkbox({ checked: !!s.checked });
      s.loose ? s.tokens[0]?.type === "paragraph" ? (s.tokens[0].text = i + " " + s.tokens[0].text, s.tokens[0].tokens && s.tokens[0].tokens.length > 0 && s.tokens[0].tokens[0].type === "text" && (s.tokens[0].tokens[0].text = i + " " + yn(s.tokens[0].tokens[0].text), s.tokens[0].tokens[0].escaped = true)) : s.tokens.unshift({ type: "text", raw: i + " ", text: i + " ", escaped: true }) : r += i + " ";
    }
    return r += this.parser.parse(s.tokens, !!s.loose), `<li>${r}</li>
`;
  }
  checkbox({ checked: s }) {
    return "<input " + (s ? 'checked="" ' : "") + 'disabled="" type="checkbox">';
  }
  paragraph({ tokens: s }) {
    return `<p>${this.parser.parseInline(s)}</p>
`;
  }
  table(s) {
    let r = "", i = "";
    for (let m = 0; m < s.header.length; m++) i += this.tablecell(s.header[m]);
    r += this.tablerow({ text: i });
    let l = "";
    for (let m = 0; m < s.rows.length; m++) {
      const g = s.rows[m];
      i = "";
      for (let h = 0; h < g.length; h++) i += this.tablecell(g[h]);
      l += this.tablerow({ text: i });
    }
    return l && (l = `<tbody>${l}</tbody>`), `<table>
<thead>
` + r + `</thead>
` + l + `</table>
`;
  }
  tablerow({ text: s }) {
    return `<tr>
${s}</tr>
`;
  }
  tablecell(s) {
    const r = this.parser.parseInline(s.tokens), i = s.header ? "th" : "td";
    return (s.align ? `<${i} align="${s.align}">` : `<${i}>`) + r + `</${i}>
`;
  }
  strong({ tokens: s }) {
    return `<strong>${this.parser.parseInline(s)}</strong>`;
  }
  em({ tokens: s }) {
    return `<em>${this.parser.parseInline(s)}</em>`;
  }
  codespan({ text: s }) {
    return `<code>${yn(s, true)}</code>`;
  }
  br(s) {
    return "<br>";
  }
  del({ tokens: s }) {
    return `<del>${this.parser.parseInline(s)}</del>`;
  }
  link({ href: s, title: r, tokens: i }) {
    const l = this.parser.parseInline(i), m = V_(s);
    if (m === null) return l;
    s = m;
    let g = '<a href="' + s + '"';
    return r && (g += ' title="' + yn(r) + '"'), g += ">" + l + "</a>", g;
  }
  image({ href: s, title: r, text: i, tokens: l }) {
    l && (i = this.parser.parseInline(l, this.parser.textRenderer));
    const m = V_(s);
    if (m === null) return yn(i);
    s = m;
    let g = `<img src="${s}" alt="${i}"`;
    return r && (g += ` title="${yn(r)}"`), g += ">", g;
  }
  text(s) {
    return "tokens" in s && s.tokens ? this.parser.parseInline(s.tokens) : "escaped" in s && s.escaped ? s.text : yn(s.text);
  }
}, fg = class {
  strong({ text: s }) {
    return s;
  }
  em({ text: s }) {
    return s;
  }
  codespan({ text: s }) {
    return s;
  }
  del({ text: s }) {
    return s;
  }
  html({ text: s }) {
    return s;
  }
  text({ text: s }) {
    return s;
  }
  link({ text: s }) {
    return "" + s;
  }
  image({ text: s }) {
    return "" + s;
  }
  br() {
    return "";
  }
}, Un = class e_ {
  options;
  renderer;
  textRenderer;
  constructor(r) {
    this.options = r || ar, this.options.renderer = this.options.renderer || new tu(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new fg();
  }
  static parse(r, i) {
    return new e_(i).parse(r);
  }
  static parseInline(r, i) {
    return new e_(i).parseInline(r);
  }
  parse(r, i = true) {
    let l = "";
    for (let m = 0; m < r.length; m++) {
      const g = r[m];
      if (this.options.extensions?.renderers?.[g.type]) {
        const p = g, M = this.options.extensions.renderers[p.type].call({ parser: this }, p);
        if (M !== false || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(p.type)) {
          l += M || "";
          continue;
        }
      }
      const h = g;
      switch (h.type) {
        case "space": {
          l += this.renderer.space(h);
          continue;
        }
        case "hr": {
          l += this.renderer.hr(h);
          continue;
        }
        case "heading": {
          l += this.renderer.heading(h);
          continue;
        }
        case "code": {
          l += this.renderer.code(h);
          continue;
        }
        case "table": {
          l += this.renderer.table(h);
          continue;
        }
        case "blockquote": {
          l += this.renderer.blockquote(h);
          continue;
        }
        case "list": {
          l += this.renderer.list(h);
          continue;
        }
        case "html": {
          l += this.renderer.html(h);
          continue;
        }
        case "paragraph": {
          l += this.renderer.paragraph(h);
          continue;
        }
        case "text": {
          let p = h, M = this.renderer.text(p);
          for (; m + 1 < r.length && r[m + 1].type === "text"; ) p = r[++m], M += `
` + this.renderer.text(p);
          i ? l += this.renderer.paragraph({ type: "paragraph", raw: M, text: M, tokens: [{ type: "text", raw: M, text: M, escaped: true }] }) : l += M;
          continue;
        }
        default: {
          const p = 'Token with "' + h.type + '" type was not found.';
          if (this.options.silent) return console.error(p), "";
          throw new Error(p);
        }
      }
    }
    return l;
  }
  parseInline(r, i = this.renderer) {
    let l = "";
    for (let m = 0; m < r.length; m++) {
      const g = r[m];
      if (this.options.extensions?.renderers?.[g.type]) {
        const p = this.options.extensions.renderers[g.type].call({ parser: this }, g);
        if (p !== false || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(g.type)) {
          l += p || "";
          continue;
        }
      }
      const h = g;
      switch (h.type) {
        case "escape": {
          l += i.text(h);
          break;
        }
        case "html": {
          l += i.html(h);
          break;
        }
        case "link": {
          l += i.link(h);
          break;
        }
        case "image": {
          l += i.image(h);
          break;
        }
        case "strong": {
          l += i.strong(h);
          break;
        }
        case "em": {
          l += i.em(h);
          break;
        }
        case "codespan": {
          l += i.codespan(h);
          break;
        }
        case "br": {
          l += i.br(h);
          break;
        }
        case "del": {
          l += i.del(h);
          break;
        }
        case "text": {
          l += i.text(h);
          break;
        }
        default: {
          const p = 'Token with "' + h.type + '" type was not found.';
          if (this.options.silent) return console.error(p), "";
          throw new Error(p);
        }
      }
    }
    return l;
  }
}, su = class {
  options;
  block;
  constructor(s) {
    this.options = s || ar;
  }
  static passThroughHooks = /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens"]);
  preprocess(s) {
    return s;
  }
  postprocess(s) {
    return s;
  }
  processAllTokens(s) {
    return s;
  }
  provideLexer() {
    return this.block ? On.lex : On.lexInline;
  }
  provideParser() {
    return this.block ? Un.parse : Un.parseInline;
  }
}, JL = class {
  defaults = ig();
  options = this.setOptions;
  parse = this.parseMarkdown(true);
  parseInline = this.parseMarkdown(false);
  Parser = Un;
  Renderer = tu;
  TextRenderer = fg;
  Lexer = On;
  Tokenizer = eu;
  Hooks = su;
  constructor(...s) {
    this.use(...s);
  }
  walkTokens(s, r) {
    let i = [];
    for (const l of s) switch (i = i.concat(r.call(this, l)), l.type) {
      case "table": {
        const m = l;
        for (const g of m.header) i = i.concat(this.walkTokens(g.tokens, r));
        for (const g of m.rows) for (const h of g) i = i.concat(this.walkTokens(h.tokens, r));
        break;
      }
      case "list": {
        const m = l;
        i = i.concat(this.walkTokens(m.items, r));
        break;
      }
      default: {
        const m = l;
        this.defaults.extensions?.childTokens?.[m.type] ? this.defaults.extensions.childTokens[m.type].forEach((g) => {
          const h = m[g].flat(1 / 0);
          i = i.concat(this.walkTokens(h, r));
        }) : m.tokens && (i = i.concat(this.walkTokens(m.tokens, r)));
      }
    }
    return i;
  }
  use(...s) {
    const r = this.defaults.extensions || { renderers: {}, childTokens: {} };
    return s.forEach((i) => {
      const l = { ...i };
      if (l.async = this.defaults.async || l.async || false, i.extensions && (i.extensions.forEach((m) => {
        if (!m.name) throw new Error("extension name required");
        if ("renderer" in m) {
          const g = r.renderers[m.name];
          g ? r.renderers[m.name] = function(...h) {
            let p = m.renderer.apply(this, h);
            return p === false && (p = g.apply(this, h)), p;
          } : r.renderers[m.name] = m.renderer;
        }
        if ("tokenizer" in m) {
          if (!m.level || m.level !== "block" && m.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
          const g = r[m.level];
          g ? g.unshift(m.tokenizer) : r[m.level] = [m.tokenizer], m.start && (m.level === "block" ? r.startBlock ? r.startBlock.push(m.start) : r.startBlock = [m.start] : m.level === "inline" && (r.startInline ? r.startInline.push(m.start) : r.startInline = [m.start]));
        }
        "childTokens" in m && m.childTokens && (r.childTokens[m.name] = m.childTokens);
      }), l.extensions = r), i.renderer) {
        const m = this.defaults.renderer || new tu(this.defaults);
        for (const g in i.renderer) {
          if (!(g in m)) throw new Error(`renderer '${g}' does not exist`);
          if (["options", "parser"].includes(g)) continue;
          const h = g, p = i.renderer[h], M = m[h];
          m[h] = (...v) => {
            let D = p.apply(m, v);
            return D === false && (D = M.apply(m, v)), D || "";
          };
        }
        l.renderer = m;
      }
      if (i.tokenizer) {
        const m = this.defaults.tokenizer || new eu(this.defaults);
        for (const g in i.tokenizer) {
          if (!(g in m)) throw new Error(`tokenizer '${g}' does not exist`);
          if (["options", "rules", "lexer"].includes(g)) continue;
          const h = g, p = i.tokenizer[h], M = m[h];
          m[h] = (...v) => {
            let D = p.apply(m, v);
            return D === false && (D = M.apply(m, v)), D;
          };
        }
        l.tokenizer = m;
      }
      if (i.hooks) {
        const m = this.defaults.hooks || new su();
        for (const g in i.hooks) {
          if (!(g in m)) throw new Error(`hook '${g}' does not exist`);
          if (["options", "block"].includes(g)) continue;
          const h = g, p = i.hooks[h], M = m[h];
          su.passThroughHooks.has(g) ? m[h] = (v) => {
            if (this.defaults.async) return Promise.resolve(p.call(m, v)).then((S) => M.call(m, S));
            const D = p.call(m, v);
            return M.call(m, D);
          } : m[h] = (...v) => {
            let D = p.apply(m, v);
            return D === false && (D = M.apply(m, v)), D;
          };
        }
        l.hooks = m;
      }
      if (i.walkTokens) {
        const m = this.defaults.walkTokens, g = i.walkTokens;
        l.walkTokens = function(h) {
          let p = [];
          return p.push(g.call(this, h)), m && (p = p.concat(m.call(this, h))), p;
        };
      }
      this.defaults = { ...this.defaults, ...l };
    }), this;
  }
  setOptions(s) {
    return this.defaults = { ...this.defaults, ...s }, this;
  }
  lexer(s, r) {
    return On.lex(s, r ?? this.defaults);
  }
  parser(s, r) {
    return Un.parse(s, r ?? this.defaults);
  }
  parseMarkdown(s) {
    return (i, l) => {
      const m = { ...l }, g = { ...this.defaults, ...m }, h = this.onError(!!g.silent, !!g.async);
      if (this.defaults.async === true && m.async === false) return h(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof i > "u" || i === null) return h(new Error("marked(): input parameter is undefined or null"));
      if (typeof i != "string") return h(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(i) + ", string expected"));
      g.hooks && (g.hooks.options = g, g.hooks.block = s);
      const p = g.hooks ? g.hooks.provideLexer() : s ? On.lex : On.lexInline, M = g.hooks ? g.hooks.provideParser() : s ? Un.parse : Un.parseInline;
      if (g.async) return Promise.resolve(g.hooks ? g.hooks.preprocess(i) : i).then((v) => p(v, g)).then((v) => g.hooks ? g.hooks.processAllTokens(v) : v).then((v) => g.walkTokens ? Promise.all(this.walkTokens(v, g.walkTokens)).then(() => v) : v).then((v) => M(v, g)).then((v) => g.hooks ? g.hooks.postprocess(v) : v).catch(h);
      try {
        g.hooks && (i = g.hooks.preprocess(i));
        let v = p(i, g);
        g.hooks && (v = g.hooks.processAllTokens(v)), g.walkTokens && this.walkTokens(v, g.walkTokens);
        let D = M(v, g);
        return g.hooks && (D = g.hooks.postprocess(D)), D;
      } catch (v) {
        return h(v);
      }
    };
  }
  onError(s, r) {
    return (i) => {
      if (i.message += `
Please report this to https://github.com/markedjs/marked.`, s) {
        const l = "<p>An error occurred:</p><pre>" + yn(i.message + "", true) + "</pre>";
        return r ? Promise.resolve(l) : l;
      }
      if (r) return Promise.reject(i);
      throw i;
    };
  }
}, rr = new JL();
function Ce(s, r) {
  return rr.parse(s, r);
}
Ce.options = Ce.setOptions = function(s) {
  return rr.setOptions(s), Ce.defaults = rr.defaults, P_(Ce.defaults), Ce;
}, Ce.getDefaults = ig, Ce.defaults = ar, Ce.use = function(...s) {
  return rr.use(...s), Ce.defaults = rr.defaults, P_(Ce.defaults), Ce;
}, Ce.walkTokens = function(s, r) {
  return rr.walkTokens(s, r);
}, Ce.parseInline = rr.parseInline, Ce.Parser = Un, Ce.parser = Un.parse, Ce.Renderer = tu, Ce.TextRenderer = fg, Ce.Lexer = On, Ce.lexer = On.lex, Ce.Tokenizer = eu, Ce.Hooks = su, Ce.parse = Ce, Ce.options, Ce.setOptions, Ce.use, Ce.walkTokens, Ce.parseInline, Un.parse, On.lex;
const VL = /[\0-\x1F!-,\.\/:-@\[-\^`\{-\xA9\xAB-\xB4\xB6-\xB9\xBB-\xBF\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0378\u0379\u037E\u0380-\u0385\u0387\u038B\u038D\u03A2\u03F6\u0482\u0530\u0557\u0558\u055A-\u055F\u0589-\u0590\u05BE\u05C0\u05C3\u05C6\u05C8-\u05CF\u05EB-\u05EE\u05F3-\u060F\u061B-\u061F\u066A-\u066D\u06D4\u06DD\u06DE\u06E9\u06FD\u06FE\u0700-\u070F\u074B\u074C\u07B2-\u07BF\u07F6-\u07F9\u07FB\u07FC\u07FE\u07FF\u082E-\u083F\u085C-\u085F\u086B-\u089F\u08B5\u08C8-\u08D2\u08E2\u0964\u0965\u0970\u0984\u098D\u098E\u0991\u0992\u09A9\u09B1\u09B3-\u09B5\u09BA\u09BB\u09C5\u09C6\u09C9\u09CA\u09CF-\u09D6\u09D8-\u09DB\u09DE\u09E4\u09E5\u09F2-\u09FB\u09FD\u09FF\u0A00\u0A04\u0A0B-\u0A0E\u0A11\u0A12\u0A29\u0A31\u0A34\u0A37\u0A3A\u0A3B\u0A3D\u0A43-\u0A46\u0A49\u0A4A\u0A4E-\u0A50\u0A52-\u0A58\u0A5D\u0A5F-\u0A65\u0A76-\u0A80\u0A84\u0A8E\u0A92\u0AA9\u0AB1\u0AB4\u0ABA\u0ABB\u0AC6\u0ACA\u0ACE\u0ACF\u0AD1-\u0ADF\u0AE4\u0AE5\u0AF0-\u0AF8\u0B00\u0B04\u0B0D\u0B0E\u0B11\u0B12\u0B29\u0B31\u0B34\u0B3A\u0B3B\u0B45\u0B46\u0B49\u0B4A\u0B4E-\u0B54\u0B58-\u0B5B\u0B5E\u0B64\u0B65\u0B70\u0B72-\u0B81\u0B84\u0B8B-\u0B8D\u0B91\u0B96-\u0B98\u0B9B\u0B9D\u0BA0-\u0BA2\u0BA5-\u0BA7\u0BAB-\u0BAD\u0BBA-\u0BBD\u0BC3-\u0BC5\u0BC9\u0BCE\u0BCF\u0BD1-\u0BD6\u0BD8-\u0BE5\u0BF0-\u0BFF\u0C0D\u0C11\u0C29\u0C3A-\u0C3C\u0C45\u0C49\u0C4E-\u0C54\u0C57\u0C5B-\u0C5F\u0C64\u0C65\u0C70-\u0C7F\u0C84\u0C8D\u0C91\u0CA9\u0CB4\u0CBA\u0CBB\u0CC5\u0CC9\u0CCE-\u0CD4\u0CD7-\u0CDD\u0CDF\u0CE4\u0CE5\u0CF0\u0CF3-\u0CFF\u0D0D\u0D11\u0D45\u0D49\u0D4F-\u0D53\u0D58-\u0D5E\u0D64\u0D65\u0D70-\u0D79\u0D80\u0D84\u0D97-\u0D99\u0DB2\u0DBC\u0DBE\u0DBF\u0DC7-\u0DC9\u0DCB-\u0DCE\u0DD5\u0DD7\u0DE0-\u0DE5\u0DF0\u0DF1\u0DF4-\u0E00\u0E3B-\u0E3F\u0E4F\u0E5A-\u0E80\u0E83\u0E85\u0E8B\u0EA4\u0EA6\u0EBE\u0EBF\u0EC5\u0EC7\u0ECE\u0ECF\u0EDA\u0EDB\u0EE0-\u0EFF\u0F01-\u0F17\u0F1A-\u0F1F\u0F2A-\u0F34\u0F36\u0F38\u0F3A-\u0F3D\u0F48\u0F6D-\u0F70\u0F85\u0F98\u0FBD-\u0FC5\u0FC7-\u0FFF\u104A-\u104F\u109E\u109F\u10C6\u10C8-\u10CC\u10CE\u10CF\u10FB\u1249\u124E\u124F\u1257\u1259\u125E\u125F\u1289\u128E\u128F\u12B1\u12B6\u12B7\u12BF\u12C1\u12C6\u12C7\u12D7\u1311\u1316\u1317\u135B\u135C\u1360-\u137F\u1390-\u139F\u13F6\u13F7\u13FE-\u1400\u166D\u166E\u1680\u169B-\u169F\u16EB-\u16ED\u16F9-\u16FF\u170D\u1715-\u171F\u1735-\u173F\u1754-\u175F\u176D\u1771\u1774-\u177F\u17D4-\u17D6\u17D8-\u17DB\u17DE\u17DF\u17EA-\u180A\u180E\u180F\u181A-\u181F\u1879-\u187F\u18AB-\u18AF\u18F6-\u18FF\u191F\u192C-\u192F\u193C-\u1945\u196E\u196F\u1975-\u197F\u19AC-\u19AF\u19CA-\u19CF\u19DA-\u19FF\u1A1C-\u1A1F\u1A5F\u1A7D\u1A7E\u1A8A-\u1A8F\u1A9A-\u1AA6\u1AA8-\u1AAF\u1AC1-\u1AFF\u1B4C-\u1B4F\u1B5A-\u1B6A\u1B74-\u1B7F\u1BF4-\u1BFF\u1C38-\u1C3F\u1C4A-\u1C4C\u1C7E\u1C7F\u1C89-\u1C8F\u1CBB\u1CBC\u1CC0-\u1CCF\u1CD3\u1CFB-\u1CFF\u1DFA\u1F16\u1F17\u1F1E\u1F1F\u1F46\u1F47\u1F4E\u1F4F\u1F58\u1F5A\u1F5C\u1F5E\u1F7E\u1F7F\u1FB5\u1FBD\u1FBF-\u1FC1\u1FC5\u1FCD-\u1FCF\u1FD4\u1FD5\u1FDC-\u1FDF\u1FED-\u1FF1\u1FF5\u1FFD-\u203E\u2041-\u2053\u2055-\u2070\u2072-\u207E\u2080-\u208F\u209D-\u20CF\u20F1-\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F-\u215F\u2189-\u24B5\u24EA-\u2BFF\u2C2F\u2C5F\u2CE5-\u2CEA\u2CF4-\u2CFF\u2D26\u2D28-\u2D2C\u2D2E\u2D2F\u2D68-\u2D6E\u2D70-\u2D7E\u2D97-\u2D9F\u2DA7\u2DAF\u2DB7\u2DBF\u2DC7\u2DCF\u2DD7\u2DDF\u2E00-\u2E2E\u2E30-\u3004\u3008-\u3020\u3030\u3036\u3037\u303D-\u3040\u3097\u3098\u309B\u309C\u30A0\u30FB\u3100-\u3104\u3130\u318F-\u319F\u31C0-\u31EF\u3200-\u33FF\u4DC0-\u4DFF\u9FFD-\u9FFF\uA48D-\uA4CF\uA4FE\uA4FF\uA60D-\uA60F\uA62C-\uA63F\uA673\uA67E\uA6F2-\uA716\uA720\uA721\uA789\uA78A\uA7C0\uA7C1\uA7CB-\uA7F4\uA828-\uA82B\uA82D-\uA83F\uA874-\uA87F\uA8C6-\uA8CF\uA8DA-\uA8DF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA954-\uA95F\uA97D-\uA97F\uA9C1-\uA9CE\uA9DA-\uA9DF\uA9FF\uAA37-\uAA3F\uAA4E\uAA4F\uAA5A-\uAA5F\uAA77-\uAA79\uAAC3-\uAADA\uAADE\uAADF\uAAF0\uAAF1\uAAF7-\uAB00\uAB07\uAB08\uAB0F\uAB10\uAB17-\uAB1F\uAB27\uAB2F\uAB5B\uAB6A-\uAB6F\uABEB\uABEE\uABEF\uABFA-\uABFF\uD7A4-\uD7AF\uD7C7-\uD7CA\uD7FC-\uD7FF\uE000-\uF8FF\uFA6E\uFA6F\uFADA-\uFAFF\uFB07-\uFB12\uFB18-\uFB1C\uFB29\uFB37\uFB3D\uFB3F\uFB42\uFB45\uFBB2-\uFBD2\uFD3E-\uFD4F\uFD90\uFD91\uFDC8-\uFDEF\uFDFC-\uFDFF\uFE10-\uFE1F\uFE30-\uFE32\uFE35-\uFE4C\uFE50-\uFE6F\uFE75\uFEFD-\uFF0F\uFF1A-\uFF20\uFF3B-\uFF3E\uFF40\uFF5B-\uFF65\uFFBF-\uFFC1\uFFC8\uFFC9\uFFD0\uFFD1\uFFD8\uFFD9\uFFDD-\uFFFF]|\uD800[\uDC0C\uDC27\uDC3B\uDC3E\uDC4E\uDC4F\uDC5E-\uDC7F\uDCFB-\uDD3F\uDD75-\uDDFC\uDDFE-\uDE7F\uDE9D-\uDE9F\uDED1-\uDEDF\uDEE1-\uDEFF\uDF20-\uDF2C\uDF4B-\uDF4F\uDF7B-\uDF7F\uDF9E\uDF9F\uDFC4-\uDFC7\uDFD0\uDFD6-\uDFFF]|\uD801[\uDC9E\uDC9F\uDCAA-\uDCAF\uDCD4-\uDCD7\uDCFC-\uDCFF\uDD28-\uDD2F\uDD64-\uDDFF\uDF37-\uDF3F\uDF56-\uDF5F\uDF68-\uDFFF]|\uD802[\uDC06\uDC07\uDC09\uDC36\uDC39-\uDC3B\uDC3D\uDC3E\uDC56-\uDC5F\uDC77-\uDC7F\uDC9F-\uDCDF\uDCF3\uDCF6-\uDCFF\uDD16-\uDD1F\uDD3A-\uDD7F\uDDB8-\uDDBD\uDDC0-\uDDFF\uDE04\uDE07-\uDE0B\uDE14\uDE18\uDE36\uDE37\uDE3B-\uDE3E\uDE40-\uDE5F\uDE7D-\uDE7F\uDE9D-\uDEBF\uDEC8\uDEE7-\uDEFF\uDF36-\uDF3F\uDF56-\uDF5F\uDF73-\uDF7F\uDF92-\uDFFF]|\uD803[\uDC49-\uDC7F\uDCB3-\uDCBF\uDCF3-\uDCFF\uDD28-\uDD2F\uDD3A-\uDE7F\uDEAA\uDEAD-\uDEAF\uDEB2-\uDEFF\uDF1D-\uDF26\uDF28-\uDF2F\uDF51-\uDFAF\uDFC5-\uDFDF\uDFF7-\uDFFF]|\uD804[\uDC47-\uDC65\uDC70-\uDC7E\uDCBB-\uDCCF\uDCE9-\uDCEF\uDCFA-\uDCFF\uDD35\uDD40-\uDD43\uDD48-\uDD4F\uDD74\uDD75\uDD77-\uDD7F\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDFF\uDE12\uDE38-\uDE3D\uDE3F-\uDE7F\uDE87\uDE89\uDE8E\uDE9E\uDEA9-\uDEAF\uDEEB-\uDEEF\uDEFA-\uDEFF\uDF04\uDF0D\uDF0E\uDF11\uDF12\uDF29\uDF31\uDF34\uDF3A\uDF45\uDF46\uDF49\uDF4A\uDF4E\uDF4F\uDF51-\uDF56\uDF58-\uDF5C\uDF64\uDF65\uDF6D-\uDF6F\uDF75-\uDFFF]|\uD805[\uDC4B-\uDC4F\uDC5A-\uDC5D\uDC62-\uDC7F\uDCC6\uDCC8-\uDCCF\uDCDA-\uDD7F\uDDB6\uDDB7\uDDC1-\uDDD7\uDDDE-\uDDFF\uDE41-\uDE43\uDE45-\uDE4F\uDE5A-\uDE7F\uDEB9-\uDEBF\uDECA-\uDEFF\uDF1B\uDF1C\uDF2C-\uDF2F\uDF3A-\uDFFF]|\uD806[\uDC3B-\uDC9F\uDCEA-\uDCFE\uDD07\uDD08\uDD0A\uDD0B\uDD14\uDD17\uDD36\uDD39\uDD3A\uDD44-\uDD4F\uDD5A-\uDD9F\uDDA8\uDDA9\uDDD8\uDDD9\uDDE2\uDDE5-\uDDFF\uDE3F-\uDE46\uDE48-\uDE4F\uDE9A-\uDE9C\uDE9E-\uDEBF\uDEF9-\uDFFF]|\uD807[\uDC09\uDC37\uDC41-\uDC4F\uDC5A-\uDC71\uDC90\uDC91\uDCA8\uDCB7-\uDCFF\uDD07\uDD0A\uDD37-\uDD39\uDD3B\uDD3E\uDD48-\uDD4F\uDD5A-\uDD5F\uDD66\uDD69\uDD8F\uDD92\uDD99-\uDD9F\uDDAA-\uDEDF\uDEF7-\uDFAF\uDFB1-\uDFFF]|\uD808[\uDF9A-\uDFFF]|\uD809[\uDC6F-\uDC7F\uDD44-\uDFFF]|[\uD80A\uD80B\uD80E-\uD810\uD812-\uD819\uD824-\uD82B\uD82D\uD82E\uD830-\uD833\uD837\uD839\uD83D\uD83F\uD87B-\uD87D\uD87F\uD885-\uDB3F\uDB41-\uDBFF][\uDC00-\uDFFF]|\uD80D[\uDC2F-\uDFFF]|\uD811[\uDE47-\uDFFF]|\uD81A[\uDE39-\uDE3F\uDE5F\uDE6A-\uDECF\uDEEE\uDEEF\uDEF5-\uDEFF\uDF37-\uDF3F\uDF44-\uDF4F\uDF5A-\uDF62\uDF78-\uDF7C\uDF90-\uDFFF]|\uD81B[\uDC00-\uDE3F\uDE80-\uDEFF\uDF4B-\uDF4E\uDF88-\uDF8E\uDFA0-\uDFDF\uDFE2\uDFE5-\uDFEF\uDFF2-\uDFFF]|\uD821[\uDFF8-\uDFFF]|\uD823[\uDCD6-\uDCFF\uDD09-\uDFFF]|\uD82C[\uDD1F-\uDD4F\uDD53-\uDD63\uDD68-\uDD6F\uDEFC-\uDFFF]|\uD82F[\uDC6B-\uDC6F\uDC7D-\uDC7F\uDC89-\uDC8F\uDC9A-\uDC9C\uDC9F-\uDFFF]|\uD834[\uDC00-\uDD64\uDD6A-\uDD6C\uDD73-\uDD7A\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDE41\uDE45-\uDFFF]|\uD835[\uDC55\uDC9D\uDCA0\uDCA1\uDCA3\uDCA4\uDCA7\uDCA8\uDCAD\uDCBA\uDCBC\uDCC4\uDD06\uDD0B\uDD0C\uDD15\uDD1D\uDD3A\uDD3F\uDD45\uDD47-\uDD49\uDD51\uDEA6\uDEA7\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3\uDFCC\uDFCD]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85-\uDE9A\uDEA0\uDEB0-\uDFFF]|\uD838[\uDC07\uDC19\uDC1A\uDC22\uDC25\uDC2B-\uDCFF\uDD2D-\uDD2F\uDD3E\uDD3F\uDD4A-\uDD4D\uDD4F-\uDEBF\uDEFA-\uDFFF]|\uD83A[\uDCC5-\uDCCF\uDCD7-\uDCFF\uDD4C-\uDD4F\uDD5A-\uDFFF]|\uD83B[\uDC00-\uDDFF\uDE04\uDE20\uDE23\uDE25\uDE26\uDE28\uDE33\uDE38\uDE3A\uDE3C-\uDE41\uDE43-\uDE46\uDE48\uDE4A\uDE4C\uDE50\uDE53\uDE55\uDE56\uDE58\uDE5A\uDE5C\uDE5E\uDE60\uDE63\uDE65\uDE66\uDE6B\uDE73\uDE78\uDE7D\uDE7F\uDE8A\uDE9C-\uDEA0\uDEA4\uDEAA\uDEBC-\uDFFF]|\uD83C[\uDC00-\uDD2F\uDD4A-\uDD4F\uDD6A-\uDD6F\uDD8A-\uDFFF]|\uD83E[\uDC00-\uDFEF\uDFFA-\uDFFF]|\uD869[\uDEDE-\uDEFF]|\uD86D[\uDF35-\uDF3F]|\uD86E[\uDC1E\uDC1F]|\uD873[\uDEA2-\uDEAF]|\uD87A[\uDFE1-\uDFFF]|\uD87E[\uDE1E-\uDFFF]|\uD884[\uDF4B-\uDFFF]|\uDB40[\uDC00-\uDCFF\uDDF0-\uDFFF]/g, KL = Object.hasOwnProperty;
class Q_ {
  constructor() {
    this.occurrences, this.reset();
  }
  slug(r, i) {
    const l = this;
    let m = ZL(r, i === true);
    const g = m;
    for (; KL.call(l.occurrences, m); ) l.occurrences[g]++, m = g + "-" + l.occurrences[g];
    return l.occurrences[m] = 0, m;
  }
  reset() {
    this.occurrences = /* @__PURE__ */ Object.create(null);
  }
}
function ZL(s, r) {
  return typeof s != "string" ? "" : (r || (s = s.toLowerCase()), s.replace(VL, "").replace(/ /g, "-"));
}
let X_ = new Q_(), ep = [];
const QL = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;
function XL(s) {
  return s.replace(QL, (r, i) => (i = i.toLowerCase(), i === "colon" ? ":" : i.charAt(0) === "#" ? i.charAt(1) === "x" ? String.fromCharCode(parseInt(i.substring(2), 16)) : String.fromCharCode(+i.substring(1)) : ""));
}
function tp({ prefix: s = "", globalSlugs: r = false } = {}) {
  return { headerIds: false, hooks: { preprocess(i) {
    return r || e2(), i;
  } }, useNewRenderer: true, renderer: { heading({ tokens: i, depth: l }) {
    const m = this.parser.parseInline(i), g = XL(m).trim().replace(/<[!\/a-z].*?>/gi, ""), h = l, p = `${s}${X_.slug(g.toLowerCase())}`, M = { level: h, text: m, id: p, raw: g };
    return ep.push(M), `<h${h} id="${p}">${m}</h${h}>
`;
  } } };
}
function e2() {
  ep = [], X_ = new Q_();
}
function sp(s) {
  throw new Error('Could not dynamically require "' + s + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var nu = { exports: {} }, t2 = nu.exports, np;
function s2() {
  return np || (np = 1, (function(s, r) {
    (function(i, l) {
      s.exports = l();
    })(t2, (function() {
      var i;
      function l() {
        return i.apply(null, arguments);
      }
      function m(e) {
        i = e;
      }
      function g(e) {
        return e instanceof Array || Object.prototype.toString.call(e) === "[object Array]";
      }
      function h(e) {
        return e != null && Object.prototype.toString.call(e) === "[object Object]";
      }
      function p(e, n) {
        return Object.prototype.hasOwnProperty.call(e, n);
      }
      function M(e) {
        if (Object.getOwnPropertyNames) return Object.getOwnPropertyNames(e).length === 0;
        var n;
        for (n in e) if (p(e, n)) return false;
        return true;
      }
      function v(e) {
        return e === void 0;
      }
      function D(e) {
        return typeof e == "number" || Object.prototype.toString.call(e) === "[object Number]";
      }
      function S(e) {
        return e instanceof Date || Object.prototype.toString.call(e) === "[object Date]";
      }
      function E(e, n) {
        var d = [], u, f = e.length;
        for (u = 0; u < f; ++u) d.push(n(e[u], u));
        return d;
      }
      function N(e, n) {
        for (var d in n) p(n, d) && (e[d] = n[d]);
        return p(n, "toString") && (e.toString = n.toString), p(n, "valueOf") && (e.valueOf = n.valueOf), e;
      }
      function j(e, n, d, u) {
        return ia(e, n, d, u, true).utc();
      }
      function R() {
        return { empty: false, unusedTokens: [], unusedInput: [], overflow: -2, charsLeftOver: 0, nullInput: false, invalidEra: null, invalidMonth: null, invalidFormat: false, userInvalidated: false, iso: false, parsedDateParts: [], era: null, meridiem: null, rfc2822: false, weekdayMismatch: false };
      }
      function x(e) {
        return e._pf == null && (e._pf = R()), e._pf;
      }
      var X;
      Array.prototype.some ? X = Array.prototype.some : X = function(e) {
        var n = Object(this), d = n.length >>> 0, u;
        for (u = 0; u < d; u++) if (u in n && e.call(this, n[u], u, n)) return true;
        return false;
      };
      function ee(e) {
        var n = null, d = false, u = e._d && !isNaN(e._d.getTime());
        if (u && (n = x(e), d = X.call(n.parsedDateParts, function(f) {
          return f != null;
        }), u = n.overflow < 0 && !n.empty && !n.invalidEra && !n.invalidMonth && !n.invalidWeekday && !n.weekdayMismatch && !n.nullInput && !n.invalidFormat && !n.userInvalidated && (!n.meridiem || n.meridiem && d), e._strict && (u = u && n.charsLeftOver === 0 && n.unusedTokens.length === 0 && n.bigHour === void 0)), Object.isFrozen == null || !Object.isFrozen(e)) e._isValid = u;
        else return u;
        return e._isValid;
      }
      function se(e) {
        var n = j(NaN);
        return e != null ? N(x(n), e) : x(n).userInvalidated = true, n;
      }
      var Q = l.momentProperties = [], ge = false;
      function B(e, n) {
        var d, u, f, k = Q.length;
        if (v(n._isAMomentObject) || (e._isAMomentObject = n._isAMomentObject), v(n._i) || (e._i = n._i), v(n._f) || (e._f = n._f), v(n._l) || (e._l = n._l), v(n._strict) || (e._strict = n._strict), v(n._tzm) || (e._tzm = n._tzm), v(n._isUTC) || (e._isUTC = n._isUTC), v(n._offset) || (e._offset = n._offset), v(n._pf) || (e._pf = x(n)), v(n._locale) || (e._locale = n._locale), k > 0) for (d = 0; d < k; d++) u = Q[d], f = n[u], v(f) || (e[u] = f);
        return e;
      }
      function J(e) {
        B(this, e), this._d = new Date(e._d != null ? e._d.getTime() : NaN), this.isValid() || (this._d = /* @__PURE__ */ new Date(NaN)), ge === false && (ge = true, l.updateOffset(this), ge = false);
      }
      function he(e) {
        return e instanceof J || e != null && e._isAMomentObject != null;
      }
      function je(e) {
        l.suppressDeprecationWarnings === false && typeof console < "u" && console.warn && console.warn("Deprecation warning: " + e);
      }
      function Te(e, n) {
        var d = true;
        return N(function() {
          if (l.deprecationHandler != null && l.deprecationHandler(null, e), d) {
            var u = [], f, k, b, W = arguments.length;
            for (k = 0; k < W; k++) {
              if (f = "", typeof arguments[k] == "object") {
                f += `
[` + k + "] ";
                for (b in arguments[0]) p(arguments[0], b) && (f += b + ": " + arguments[0][b] + ", ");
                f = f.slice(0, -2);
              } else f = arguments[k];
              u.push(f);
            }
            je(e + `
Arguments: ` + Array.prototype.slice.call(u).join("") + `
` + new Error().stack), d = false;
          }
          return n.apply(this, arguments);
        }, n);
      }
      var pe = {};
      function Ot(e, n) {
        l.deprecationHandler != null && l.deprecationHandler(e, n), pe[e] || (je(n), pe[e] = true);
      }
      l.suppressDeprecationWarnings = false, l.deprecationHandler = null;
      function Re(e) {
        return typeof Function < "u" && e instanceof Function || Object.prototype.toString.call(e) === "[object Function]";
      }
      function zn(e) {
        var n, d;
        for (d in e) p(e, d) && (n = e[d], Re(n) ? this[d] = n : this["_" + d] = n);
        this._config = e, this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source);
      }
      function Zs(e, n) {
        var d = N({}, e), u;
        for (u in n) p(n, u) && (h(e[u]) && h(n[u]) ? (d[u] = {}, N(d[u], e[u]), N(d[u], n[u])) : n[u] != null ? d[u] = n[u] : delete d[u]);
        for (u in e) p(e, u) && !p(n, u) && h(e[u]) && (d[u] = N({}, d[u]));
        return d;
      }
      function Fa(e) {
        e != null && this.set(e);
      }
      var Fs;
      Object.keys ? Fs = Object.keys : Fs = function(e) {
        var n, d = [];
        for (n in e) p(e, n) && d.push(n);
        return d;
      };
      var Qs = { sameDay: "[Today at] LT", nextDay: "[Tomorrow at] LT", nextWeek: "dddd [at] LT", lastDay: "[Yesterday at] LT", lastWeek: "[Last] dddd [at] LT", sameElse: "L" };
      function Mu(e, n, d) {
        var u = this._calendar[e] || this._calendar.sameElse;
        return Re(u) ? u.call(n, d) : u;
      }
      function Yt(e, n, d) {
        var u = "" + Math.abs(e), f = n - u.length, k = e >= 0;
        return (k ? d ? "+" : "" : "-") + Math.pow(10, Math.max(0, f)).toString().substr(1) + u;
      }
      var Ut = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, dr = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, mi = {}, Bn = {};
      function V(e, n, d, u) {
        var f = u;
        typeof u == "string" && (f = function() {
          return this[u]();
        }), e && (Bn[e] = f), n && (Bn[n[0]] = function() {
          return Yt(f.apply(this, arguments), n[1], n[2]);
        }), d && (Bn[d] = function() {
          return this.localeData().ordinal(f.apply(this, arguments), e);
        });
      }
      function ur(e) {
        return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "");
      }
      function Lu(e) {
        var n = e.match(Ut), d, u;
        for (d = 0, u = n.length; d < u; d++) Bn[n[d]] ? n[d] = Bn[n[d]] : n[d] = ur(n[d]);
        return function(f) {
          var k = "", b;
          for (b = 0; b < u; b++) k += Re(n[b]) ? n[b].call(f, e) : n[b];
          return k;
        };
      }
      function Xs(e, n) {
        return e.isValid() ? (n = Wn(n, e.localeData()), mi[n] = mi[n] || Lu(n), mi[n](e)) : e.localeData().invalidDate();
      }
      function Wn(e, n) {
        var d = 5;
        function u(f) {
          return n.longDateFormat(f) || f;
        }
        for (dr.lastIndex = 0; d >= 0 && dr.test(e); ) e = e.replace(dr, u), dr.lastIndex = 0, d -= 1;
        return e;
      }
      var ku = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" };
      function mr(e) {
        var n = this._longDateFormat[e], d = this._longDateFormat[e.toUpperCase()];
        return n || !d ? n : (this._longDateFormat[e] = d.match(Ut).map(function(u) {
          return u === "MMMM" || u === "MM" || u === "DD" || u === "dddd" ? u.slice(1) : u;
        }).join(""), this._longDateFormat[e]);
      }
      var cr = "Invalid date";
      function Io() {
        return this._invalidDate;
      }
      var es = "%d", xa = /\d{1,2}/;
      function Tu(e) {
        return this._ordinal.replace("%d", e);
      }
      var xs = { future: "in %s", past: "%s ago", s: "a few seconds", ss: "%d seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", w: "a week", ww: "%d weeks", M: "a month", MM: "%d months", y: "a year", yy: "%d years" };
      function Ro(e, n, d, u) {
        var f = this._relativeTime[d];
        return Re(f) ? f(e, n, d, u) : f.replace(/%d/i, e);
      }
      function Du(e, n) {
        var d = this._relativeTime[e > 0 ? "future" : "past"];
        return Re(d) ? d(n) : d.replace(/%s/i, n);
      }
      var $n = { D: "date", dates: "date", date: "date", d: "day", days: "day", day: "day", e: "weekday", weekdays: "weekday", weekday: "weekday", E: "isoWeekday", isoweekdays: "isoWeekday", isoweekday: "isoWeekday", DDD: "dayOfYear", dayofyears: "dayOfYear", dayofyear: "dayOfYear", h: "hour", hours: "hour", hour: "hour", ms: "millisecond", milliseconds: "millisecond", millisecond: "millisecond", m: "minute", minutes: "minute", minute: "minute", M: "month", months: "month", month: "month", Q: "quarter", quarters: "quarter", quarter: "quarter", s: "second", seconds: "second", second: "second", gg: "weekYear", weekyears: "weekYear", weekyear: "weekYear", GG: "isoWeekYear", isoweekyears: "isoWeekYear", isoweekyear: "isoWeekYear", w: "week", weeks: "week", week: "week", W: "isoWeek", isoweeks: "isoWeek", isoweek: "isoWeek", y: "year", years: "year", year: "year" };
      function Oe(e) {
        return typeof e == "string" ? $n[e] || $n[e.toLowerCase()] : void 0;
      }
      function Mn(e) {
        var n = {}, d, u;
        for (u in e) p(e, u) && (d = Oe(u), d && (n[d] = e[u]));
        return n;
      }
      var gr = { date: 9, day: 11, weekday: 11, isoWeekday: 11, dayOfYear: 4, hour: 13, millisecond: 16, minute: 14, month: 8, quarter: 7, second: 15, weekYear: 1, isoWeekYear: 1, week: 5, isoWeek: 5, year: 1 };
      function Yu(e) {
        var n = [], d;
        for (d in e) p(e, d) && n.push({ unit: d, priority: gr[d] });
        return n.sort(function(u, f) {
          return u.priority - f.priority;
        }), n;
      }
      var Gn = /\d/, Ct = /\d\d/, Jn = /\d{3}/, en = /\d{4}/, Vn = /[+-]?\d{6}/, xe = /\d\d?/, hr = /\d\d\d\d?/, fr = /\d\d\d\d\d\d?/, Kn = /\d{1,3}/, Na = /\d{1,4}/, Zn = /[+-]?\d{1,6}/, tn = /\d+/, Qn = /[+-]?\d+/, Cu = /Z|[+-]\d\d:?\d\d/gi, _r = /Z|[+-]\d\d(?::?\d\d)?/gi, Su = /[+-]?\d+(\.\d{1,3})?/, Xn = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, Ln = /^[1-9]\d?/, ci = /^([1-9]\d|\d)/, pr;
      pr = {};
      function $(e, n, d) {
        pr[e] = Re(n) ? n : function(u, f) {
          return u && d ? d : n;
        };
      }
      function bu(e, n) {
        return p(pr, e) ? pr[e](n._strict, n._locale) : new RegExp(Oo(e));
      }
      function Oo(e) {
        return Ns(e.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(n, d, u, f, k) {
          return d || u || f || k;
        }));
      }
      function Ns(e) {
        return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
      }
      function zt(e) {
        return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);
      }
      function _e(e) {
        var n = +e, d = 0;
        return n !== 0 && isFinite(n) && (d = zt(n)), d;
      }
      var Aa = {};
      function Se(e, n) {
        var d, u = n, f;
        for (typeof e == "string" && (e = [e]), D(n) && (u = function(k, b) {
          b[n] = _e(k);
        }), f = e.length, d = 0; d < f; d++) Aa[e[d]] = u;
      }
      function kn(e, n) {
        Se(e, function(d, u, f, k) {
          f._w = f._w || {}, n(d, f._w, f, k);
        });
      }
      function Fu(e, n, d) {
        n != null && p(Aa, e) && Aa[e](n, d._a, d, e);
      }
      function yr(e) {
        return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0;
      }
      var it = 0, As = 1, gs = 2, Qe = 3, ts = 4, Es = 5, sn = 6, xu = 7, Nu = 8;
      V("Y", 0, 0, function() {
        var e = this.year();
        return e <= 9999 ? Yt(e, 4) : "+" + e;
      }), V(0, ["YY", 2], 0, function() {
        return this.year() % 100;
      }), V(0, ["YYYY", 4], 0, "year"), V(0, ["YYYYY", 5], 0, "year"), V(0, ["YYYYYY", 6, true], 0, "year"), $("Y", Qn), $("YY", xe, Ct), $("YYYY", Na, en), $("YYYYY", Zn, Vn), $("YYYYYY", Zn, Vn), Se(["YYYYY", "YYYYYY"], it), Se("YYYY", function(e, n) {
        n[it] = e.length === 2 ? l.parseTwoDigitYear(e) : _e(e);
      }), Se("YY", function(e, n) {
        n[it] = l.parseTwoDigitYear(e);
      }), Se("Y", function(e, n) {
        n[it] = parseInt(e, 10);
      });
      function Ea(e) {
        return yr(e) ? 366 : 365;
      }
      l.parseTwoDigitYear = function(e) {
        return _e(e) + (_e(e) > 68 ? 1900 : 2e3);
      };
      var Uo = ea("FullYear", true);
      function Au() {
        return yr(this.year());
      }
      function ea(e, n) {
        return function(d) {
          return d != null ? (zo(this, e, d), l.updateOffset(this, n), this) : nn(this, e);
        };
      }
      function nn(e, n) {
        if (!e.isValid()) return NaN;
        var d = e._d, u = e._isUTC;
        switch (n) {
          case "Milliseconds":
            return u ? d.getUTCMilliseconds() : d.getMilliseconds();
          case "Seconds":
            return u ? d.getUTCSeconds() : d.getSeconds();
          case "Minutes":
            return u ? d.getUTCMinutes() : d.getMinutes();
          case "Hours":
            return u ? d.getUTCHours() : d.getHours();
          case "Date":
            return u ? d.getUTCDate() : d.getDate();
          case "Day":
            return u ? d.getUTCDay() : d.getDay();
          case "Month":
            return u ? d.getUTCMonth() : d.getMonth();
          case "FullYear":
            return u ? d.getUTCFullYear() : d.getFullYear();
          default:
            return NaN;
        }
      }
      function zo(e, n, d) {
        var u, f, k, b, W;
        if (!(!e.isValid() || isNaN(d))) {
          switch (u = e._d, f = e._isUTC, n) {
            case "Milliseconds":
              return void (f ? u.setUTCMilliseconds(d) : u.setMilliseconds(d));
            case "Seconds":
              return void (f ? u.setUTCSeconds(d) : u.setSeconds(d));
            case "Minutes":
              return void (f ? u.setUTCMinutes(d) : u.setMinutes(d));
            case "Hours":
              return void (f ? u.setUTCHours(d) : u.setHours(d));
            case "Date":
              return void (f ? u.setUTCDate(d) : u.setDate(d));
            case "FullYear":
              break;
            default:
              return;
          }
          k = d, b = e.month(), W = e.date(), W = W === 29 && b === 1 && !yr(k) ? 28 : W, f ? u.setUTCFullYear(k, b, W) : u.setFullYear(k, b, W);
        }
      }
      function wr(e) {
        return e = Oe(e), Re(this[e]) ? this[e]() : this;
      }
      function Eu(e, n) {
        if (typeof e == "object") {
          e = Mn(e);
          var d = Yu(e), u, f = d.length;
          for (u = 0; u < f; u++) this[d[u].unit](e[d[u].unit]);
        } else if (e = Oe(e), Re(this[e])) return this[e](n);
        return this;
      }
      function Hu(e, n) {
        return (e % n + n) % n;
      }
      var ze;
      Array.prototype.indexOf ? ze = Array.prototype.indexOf : ze = function(e) {
        var n;
        for (n = 0; n < this.length; ++n) if (this[n] === e) return n;
        return -1;
      };
      function vr(e, n) {
        if (isNaN(e) || isNaN(n)) return NaN;
        var d = Hu(n, 12);
        return e += (n - d) / 12, d === 1 ? yr(e) ? 29 : 28 : 31 - d % 7 % 2;
      }
      V("M", ["MM", 2], "Mo", function() {
        return this.month() + 1;
      }), V("MMM", 0, 0, function(e) {
        return this.localeData().monthsShort(this, e);
      }), V("MMMM", 0, 0, function(e) {
        return this.localeData().months(this, e);
      }), $("M", xe, Ln), $("MM", xe, Ct), $("MMM", function(e, n) {
        return n.monthsShortRegex(e);
      }), $("MMMM", function(e, n) {
        return n.monthsRegex(e);
      }), Se(["M", "MM"], function(e, n) {
        n[As] = _e(e) - 1;
      }), Se(["MMM", "MMMM"], function(e, n, d, u) {
        var f = d._locale.monthsParse(e, u, d._strict);
        f != null ? n[As] = f : x(d).invalidMonth = e;
      });
      var Bo = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), gi = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), Wo = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, Pu = Xn, ju = Xn;
      function qu(e, n) {
        return e ? g(this._months) ? this._months[e.month()] : this._months[(this._months.isFormat || Wo).test(n) ? "format" : "standalone"][e.month()] : g(this._months) ? this._months : this._months.standalone;
      }
      function $o(e, n) {
        return e ? g(this._monthsShort) ? this._monthsShort[e.month()] : this._monthsShort[Wo.test(n) ? "format" : "standalone"][e.month()] : g(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone;
      }
      function Go(e, n, d) {
        var u, f, k, b = e.toLocaleLowerCase();
        if (!this._monthsParse) for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], u = 0; u < 12; ++u) k = j([2e3, u]), this._shortMonthsParse[u] = this.monthsShort(k, "").toLocaleLowerCase(), this._longMonthsParse[u] = this.months(k, "").toLocaleLowerCase();
        return d ? n === "MMM" ? (f = ze.call(this._shortMonthsParse, b), f !== -1 ? f : null) : (f = ze.call(this._longMonthsParse, b), f !== -1 ? f : null) : n === "MMM" ? (f = ze.call(this._shortMonthsParse, b), f !== -1 ? f : (f = ze.call(this._longMonthsParse, b), f !== -1 ? f : null)) : (f = ze.call(this._longMonthsParse, b), f !== -1 ? f : (f = ze.call(this._shortMonthsParse, b), f !== -1 ? f : null));
      }
      function Jo(e, n, d) {
        var u, f, k;
        if (this._monthsParseExact) return Go.call(this, e, n, d);
        for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), u = 0; u < 12; u++) {
          if (f = j([2e3, u]), d && !this._longMonthsParse[u] && (this._longMonthsParse[u] = new RegExp("^" + this.months(f, "").replace(".", "") + "$", "i"), this._shortMonthsParse[u] = new RegExp("^" + this.monthsShort(f, "").replace(".", "") + "$", "i")), !d && !this._monthsParse[u] && (k = "^" + this.months(f, "") + "|^" + this.monthsShort(f, ""), this._monthsParse[u] = new RegExp(k.replace(".", ""), "i")), d && n === "MMMM" && this._longMonthsParse[u].test(e)) return u;
          if (d && n === "MMM" && this._shortMonthsParse[u].test(e)) return u;
          if (!d && this._monthsParse[u].test(e)) return u;
        }
      }
      function Mr(e, n) {
        if (!e.isValid()) return e;
        if (typeof n == "string") {
          if (/^\d+$/.test(n)) n = _e(n);
          else if (n = e.localeData().monthsParse(n), !D(n)) return e;
        }
        var d = n, u = e.date();
        return u = u < 29 ? u : Math.min(u, vr(e.year(), d)), e._isUTC ? e._d.setUTCMonth(d, u) : e._d.setMonth(d, u), e;
      }
      function Vo(e) {
        return e != null ? (Mr(this, e), l.updateOffset(this, true), this) : nn(this, "Month");
      }
      function Ko() {
        return vr(this.year(), this.month());
      }
      function Lr(e) {
        return this._monthsParseExact ? (p(this, "_monthsRegex") || Qo.call(this), e ? this._monthsShortStrictRegex : this._monthsShortRegex) : (p(this, "_monthsShortRegex") || (this._monthsShortRegex = Pu), this._monthsShortStrictRegex && e ? this._monthsShortStrictRegex : this._monthsShortRegex);
      }
      function Zo(e) {
        return this._monthsParseExact ? (p(this, "_monthsRegex") || Qo.call(this), e ? this._monthsStrictRegex : this._monthsRegex) : (p(this, "_monthsRegex") || (this._monthsRegex = ju), this._monthsStrictRegex && e ? this._monthsStrictRegex : this._monthsRegex);
      }
      function Qo() {
        function e(ie, ye) {
          return ye.length - ie.length;
        }
        var n = [], d = [], u = [], f, k, b, W;
        for (f = 0; f < 12; f++) k = j([2e3, f]), b = Ns(this.monthsShort(k, "")), W = Ns(this.months(k, "")), n.push(b), d.push(W), u.push(W), u.push(b);
        n.sort(e), d.sort(e), u.sort(e), this._monthsRegex = new RegExp("^(" + u.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp("^(" + d.join("|") + ")", "i"), this._monthsShortStrictRegex = new RegExp("^(" + n.join("|") + ")", "i");
      }
      function Xo(e, n, d, u, f, k, b) {
        var W;
        return e < 100 && e >= 0 ? (W = new Date(e + 400, n, d, u, f, k, b), isFinite(W.getFullYear()) && W.setFullYear(e)) : W = new Date(e, n, d, u, f, k, b), W;
      }
      function ta(e) {
        var n, d;
        return e < 100 && e >= 0 ? (d = Array.prototype.slice.call(arguments), d[0] = e + 400, n = new Date(Date.UTC.apply(null, d)), isFinite(n.getUTCFullYear()) && n.setUTCFullYear(e)) : n = new Date(Date.UTC.apply(null, arguments)), n;
      }
      function sa(e, n, d) {
        var u = 7 + n - d, f = (7 + ta(e, 0, u).getUTCDay() - n) % 7;
        return -f + u - 1;
      }
      function el(e, n, d, u, f) {
        var k = (7 + d - u) % 7, b = sa(e, u, f), W = 1 + 7 * (n - 1) + k + b, ie, ye;
        return W <= 0 ? (ie = e - 1, ye = Ea(ie) + W) : W > Ea(e) ? (ie = e + 1, ye = W - Ea(e)) : (ie = e, ye = W), { year: ie, dayOfYear: ye };
      }
      function na(e, n, d) {
        var u = sa(e.year(), n, d), f = Math.floor((e.dayOfYear() - u - 1) / 7) + 1, k, b;
        return f < 1 ? (b = e.year() - 1, k = f + ss(b, n, d)) : f > ss(e.year(), n, d) ? (k = f - ss(e.year(), n, d), b = e.year() + 1) : (b = e.year(), k = f), { week: k, year: b };
      }
      function ss(e, n, d) {
        var u = sa(e, n, d), f = sa(e + 1, n, d);
        return (Ea(e) - u + f) / 7;
      }
      V("w", ["ww", 2], "wo", "week"), V("W", ["WW", 2], "Wo", "isoWeek"), $("w", xe, Ln), $("ww", xe, Ct), $("W", xe, Ln), $("WW", xe, Ct), kn(["w", "ww", "W", "WW"], function(e, n, d, u) {
        n[u.substr(0, 1)] = _e(e);
      });
      function hi(e) {
        return na(e, this._week.dow, this._week.doy).week;
      }
      var aa = { dow: 0, doy: 6 };
      function tl() {
        return this._week.dow;
      }
      function sl() {
        return this._week.doy;
      }
      function Iu(e) {
        var n = this.localeData().week(this);
        return e == null ? n : this.add((e - n) * 7, "d");
      }
      function nl(e) {
        var n = na(this, 1, 4).week;
        return e == null ? n : this.add((e - n) * 7, "d");
      }
      V("d", 0, "do", "day"), V("dd", 0, 0, function(e) {
        return this.localeData().weekdaysMin(this, e);
      }), V("ddd", 0, 0, function(e) {
        return this.localeData().weekdaysShort(this, e);
      }), V("dddd", 0, 0, function(e) {
        return this.localeData().weekdays(this, e);
      }), V("e", 0, 0, "weekday"), V("E", 0, 0, "isoWeekday"), $("d", xe), $("e", xe), $("E", xe), $("dd", function(e, n) {
        return n.weekdaysMinRegex(e);
      }), $("ddd", function(e, n) {
        return n.weekdaysShortRegex(e);
      }), $("dddd", function(e, n) {
        return n.weekdaysRegex(e);
      }), kn(["dd", "ddd", "dddd"], function(e, n, d, u) {
        var f = d._locale.weekdaysParse(e, u, d._strict);
        f != null ? n.d = f : x(d).invalidWeekday = e;
      }), kn(["d", "e", "E"], function(e, n, d, u) {
        n[u] = _e(e);
      });
      function al(e, n) {
        return typeof e != "string" ? e : isNaN(e) ? (e = n.weekdaysParse(e), typeof e == "number" ? e : null) : parseInt(e, 10);
      }
      function rl(e, n) {
        return typeof e == "string" ? n.weekdaysParse(e) % 7 || 7 : isNaN(e) ? null : e;
      }
      function kr(e, n) {
        return e.slice(n, 7).concat(e.slice(0, n));
      }
      var Ru = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), il = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), Ou = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), ol = Xn, Uu = Xn, zu = Xn;
      function Bu(e, n) {
        var d = g(this._weekdays) ? this._weekdays : this._weekdays[e && e !== true && this._weekdays.isFormat.test(n) ? "format" : "standalone"];
        return e === true ? kr(d, this._week.dow) : e ? d[e.day()] : d;
      }
      function Wu(e) {
        return e === true ? kr(this._weekdaysShort, this._week.dow) : e ? this._weekdaysShort[e.day()] : this._weekdaysShort;
      }
      function fi(e) {
        return e === true ? kr(this._weekdaysMin, this._week.dow) : e ? this._weekdaysMin[e.day()] : this._weekdaysMin;
      }
      function $u(e, n, d) {
        var u, f, k, b = e.toLocaleLowerCase();
        if (!this._weekdaysParse) for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], u = 0; u < 7; ++u) k = j([2e3, 1]).day(u), this._minWeekdaysParse[u] = this.weekdaysMin(k, "").toLocaleLowerCase(), this._shortWeekdaysParse[u] = this.weekdaysShort(k, "").toLocaleLowerCase(), this._weekdaysParse[u] = this.weekdays(k, "").toLocaleLowerCase();
        return d ? n === "dddd" ? (f = ze.call(this._weekdaysParse, b), f !== -1 ? f : null) : n === "ddd" ? (f = ze.call(this._shortWeekdaysParse, b), f !== -1 ? f : null) : (f = ze.call(this._minWeekdaysParse, b), f !== -1 ? f : null) : n === "dddd" ? (f = ze.call(this._weekdaysParse, b), f !== -1 || (f = ze.call(this._shortWeekdaysParse, b), f !== -1) ? f : (f = ze.call(this._minWeekdaysParse, b), f !== -1 ? f : null)) : n === "ddd" ? (f = ze.call(this._shortWeekdaysParse, b), f !== -1 || (f = ze.call(this._weekdaysParse, b), f !== -1) ? f : (f = ze.call(this._minWeekdaysParse, b), f !== -1 ? f : null)) : (f = ze.call(this._minWeekdaysParse, b), f !== -1 || (f = ze.call(this._weekdaysParse, b), f !== -1) ? f : (f = ze.call(this._shortWeekdaysParse, b), f !== -1 ? f : null));
      }
      function Gu(e, n, d) {
        var u, f, k;
        if (this._weekdaysParseExact) return $u.call(this, e, n, d);
        for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), u = 0; u < 7; u++) {
          if (f = j([2e3, 1]).day(u), d && !this._fullWeekdaysParse[u] && (this._fullWeekdaysParse[u] = new RegExp("^" + this.weekdays(f, "").replace(".", "\\.?") + "$", "i"), this._shortWeekdaysParse[u] = new RegExp("^" + this.weekdaysShort(f, "").replace(".", "\\.?") + "$", "i"), this._minWeekdaysParse[u] = new RegExp("^" + this.weekdaysMin(f, "").replace(".", "\\.?") + "$", "i")), this._weekdaysParse[u] || (k = "^" + this.weekdays(f, "") + "|^" + this.weekdaysShort(f, "") + "|^" + this.weekdaysMin(f, ""), this._weekdaysParse[u] = new RegExp(k.replace(".", ""), "i")), d && n === "dddd" && this._fullWeekdaysParse[u].test(e)) return u;
          if (d && n === "ddd" && this._shortWeekdaysParse[u].test(e)) return u;
          if (d && n === "dd" && this._minWeekdaysParse[u].test(e)) return u;
          if (!d && this._weekdaysParse[u].test(e)) return u;
        }
      }
      function Ju(e) {
        if (!this.isValid()) return e != null ? this : NaN;
        var n = nn(this, "Day");
        return e != null ? (e = al(e, this.localeData()), this.add(e - n, "d")) : n;
      }
      function Vu(e) {
        if (!this.isValid()) return e != null ? this : NaN;
        var n = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return e == null ? n : this.add(e - n, "d");
      }
      function Ku(e) {
        if (!this.isValid()) return e != null ? this : NaN;
        if (e != null) {
          var n = rl(e, this.localeData());
          return this.day(this.day() % 7 ? n : n - 7);
        } else return this.day() || 7;
      }
      function He(e) {
        return this._weekdaysParseExact ? (p(this, "_weekdaysRegex") || _i.call(this), e ? this._weekdaysStrictRegex : this._weekdaysRegex) : (p(this, "_weekdaysRegex") || (this._weekdaysRegex = ol), this._weekdaysStrictRegex && e ? this._weekdaysStrictRegex : this._weekdaysRegex);
      }
      function Ae(e) {
        return this._weekdaysParseExact ? (p(this, "_weekdaysRegex") || _i.call(this), e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (p(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = Uu), this._weekdaysShortStrictRegex && e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex);
      }
      function Zu(e) {
        return this._weekdaysParseExact ? (p(this, "_weekdaysRegex") || _i.call(this), e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (p(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = zu), this._weekdaysMinStrictRegex && e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex);
      }
      function _i() {
        function e(at, Ds) {
          return Ds.length - at.length;
        }
        var n = [], d = [], u = [], f = [], k, b, W, ie, ye;
        for (k = 0; k < 7; k++) b = j([2e3, 1]).day(k), W = Ns(this.weekdaysMin(b, "")), ie = Ns(this.weekdaysShort(b, "")), ye = Ns(this.weekdays(b, "")), n.push(W), d.push(ie), u.push(ye), f.push(W), f.push(ie), f.push(ye);
        n.sort(e), d.sort(e), u.sort(e), f.sort(e), this._weekdaysRegex = new RegExp("^(" + f.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp("^(" + u.join("|") + ")", "i"), this._weekdaysShortStrictRegex = new RegExp("^(" + d.join("|") + ")", "i"), this._weekdaysMinStrictRegex = new RegExp("^(" + n.join("|") + ")", "i");
      }
      function pi() {
        return this.hours() % 12 || 12;
      }
      function Qu() {
        return this.hours() || 24;
      }
      V("H", ["HH", 2], 0, "hour"), V("h", ["hh", 2], 0, pi), V("k", ["kk", 2], 0, Qu), V("hmm", 0, 0, function() {
        return "" + pi.apply(this) + Yt(this.minutes(), 2);
      }), V("hmmss", 0, 0, function() {
        return "" + pi.apply(this) + Yt(this.minutes(), 2) + Yt(this.seconds(), 2);
      }), V("Hmm", 0, 0, function() {
        return "" + this.hours() + Yt(this.minutes(), 2);
      }), V("Hmmss", 0, 0, function() {
        return "" + this.hours() + Yt(this.minutes(), 2) + Yt(this.seconds(), 2);
      });
      function ll(e, n) {
        V(e, 0, 0, function() {
          return this.localeData().meridiem(this.hours(), this.minutes(), n);
        });
      }
      ll("a", true), ll("A", false);
      function dl(e, n) {
        return n._meridiemParse;
      }
      $("a", dl), $("A", dl), $("H", xe, ci), $("h", xe, Ln), $("k", xe, Ln), $("HH", xe, Ct), $("hh", xe, Ct), $("kk", xe, Ct), $("hmm", hr), $("hmmss", fr), $("Hmm", hr), $("Hmmss", fr), Se(["H", "HH"], Qe), Se(["k", "kk"], function(e, n, d) {
        var u = _e(e);
        n[Qe] = u === 24 ? 0 : u;
      }), Se(["a", "A"], function(e, n, d) {
        d._isPm = d._locale.isPM(e), d._meridiem = e;
      }), Se(["h", "hh"], function(e, n, d) {
        n[Qe] = _e(e), x(d).bigHour = true;
      }), Se("hmm", function(e, n, d) {
        var u = e.length - 2;
        n[Qe] = _e(e.substr(0, u)), n[ts] = _e(e.substr(u)), x(d).bigHour = true;
      }), Se("hmmss", function(e, n, d) {
        var u = e.length - 4, f = e.length - 2;
        n[Qe] = _e(e.substr(0, u)), n[ts] = _e(e.substr(u, 2)), n[Es] = _e(e.substr(f)), x(d).bigHour = true;
      }), Se("Hmm", function(e, n, d) {
        var u = e.length - 2;
        n[Qe] = _e(e.substr(0, u)), n[ts] = _e(e.substr(u));
      }), Se("Hmmss", function(e, n, d) {
        var u = e.length - 4, f = e.length - 2;
        n[Qe] = _e(e.substr(0, u)), n[ts] = _e(e.substr(u, 2)), n[Es] = _e(e.substr(f));
      });
      function ul(e) {
        return (e + "").toLowerCase().charAt(0) === "p";
      }
      var Xu = /[ap]\.?m?\.?/i, st = ea("Hours", true);
      function yi(e, n, d) {
        return e > 11 ? d ? "pm" : "PM" : d ? "am" : "AM";
      }
      var an = { calendar: Qs, longDateFormat: ku, invalidDate: cr, ordinal: es, dayOfMonthOrdinalParse: xa, relativeTime: xs, months: Bo, monthsShort: gi, week: aa, weekdays: Ru, weekdaysMin: Ou, weekdaysShort: il, meridiemParse: Xu }, Pe = {}, Tn = {}, ot;
      function ml(e, n) {
        var d, u = Math.min(e.length, n.length);
        for (d = 0; d < u; d += 1) if (e[d] !== n[d]) return d;
        return u;
      }
      function wi(e) {
        return e && e.toLowerCase().replace("_", "-");
      }
      function cl(e) {
        for (var n = 0, d, u, f, k; n < e.length; ) {
          for (k = wi(e[n]).split("-"), d = k.length, u = wi(e[n + 1]), u = u ? u.split("-") : null; d > 0; ) {
            if (f = Ha(k.slice(0, d).join("-")), f) return f;
            if (u && u.length >= d && ml(k, u) >= d - 1) break;
            d--;
          }
          n++;
        }
        return ot;
      }
      function gl(e) {
        return !!(e && e.match("^[^/\\\\]*$"));
      }
      function Ha(e) {
        var n = null, d;
        if (Pe[e] === void 0 && s && s.exports && gl(e)) try {
          n = ot._abbr, d = sp, d("./locale/" + e), Hs(n);
        } catch {
          Pe[e] = null;
        }
        return Pe[e];
      }
      function Hs(e, n) {
        var d;
        return e && (v(n) ? d = Je(e) : d = ut(e, n), d ? ot = d : typeof console < "u" && console.warn && console.warn("Locale " + e + " not found. Did you forget to load it?")), ot._abbr;
      }
      function ut(e, n) {
        if (n !== null) {
          var d, u = an;
          if (n.abbr = e, Pe[e] != null) Ot("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."), u = Pe[e]._config;
          else if (n.parentLocale != null) if (Pe[n.parentLocale] != null) u = Pe[n.parentLocale]._config;
          else if (d = Ha(n.parentLocale), d != null) u = d._config;
          else return Tn[n.parentLocale] || (Tn[n.parentLocale] = []), Tn[n.parentLocale].push({ name: e, config: n }), null;
          return Pe[e] = new Fa(Zs(u, n)), Tn[e] && Tn[e].forEach(function(f) {
            ut(f.name, f.config);
          }), Hs(e), Pe[e];
        } else return delete Pe[e], null;
      }
      function em(e, n) {
        if (n != null) {
          var d, u, f = an;
          Pe[e] != null && Pe[e].parentLocale != null ? Pe[e].set(Zs(Pe[e]._config, n)) : (u = Ha(e), u != null && (f = u._config), n = Zs(f, n), u == null && (n.abbr = e), d = new Fa(n), d.parentLocale = Pe[e], Pe[e] = d), Hs(e);
        } else Pe[e] != null && (Pe[e].parentLocale != null ? (Pe[e] = Pe[e].parentLocale, e === Hs() && Hs(e)) : Pe[e] != null && delete Pe[e]);
        return Pe[e];
      }
      function Je(e) {
        var n;
        if (e && e._locale && e._locale._abbr && (e = e._locale._abbr), !e) return ot;
        if (!g(e)) {
          if (n = Ha(e), n) return n;
          e = [e];
        }
        return cl(e);
      }
      function tm() {
        return Fs(Pe);
      }
      function Tr(e) {
        var n, d = e._a;
        return d && x(e).overflow === -2 && (n = d[As] < 0 || d[As] > 11 ? As : d[gs] < 1 || d[gs] > vr(d[it], d[As]) ? gs : d[Qe] < 0 || d[Qe] > 24 || d[Qe] === 24 && (d[ts] !== 0 || d[Es] !== 0 || d[sn] !== 0) ? Qe : d[ts] < 0 || d[ts] > 59 ? ts : d[Es] < 0 || d[Es] > 59 ? Es : d[sn] < 0 || d[sn] > 999 ? sn : -1, x(e)._overflowDayOfYear && (n < it || n > gs) && (n = gs), x(e)._overflowWeeks && n === -1 && (n = xu), x(e)._overflowWeekday && n === -1 && (n = Nu), x(e).overflow = n), e;
      }
      var rn = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, Dr = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, vi = /Z|[+-]\d\d(?::?\d\d)?/, Ne = [["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/], ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/], ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/], ["GGGG-[W]WW", /\d{4}-W\d\d/, false], ["YYYY-DDD", /\d{4}-\d{3}/], ["YYYY-MM", /\d{4}-\d\d/, false], ["YYYYYYMMDD", /[+-]\d{10}/], ["YYYYMMDD", /\d{8}/], ["GGGG[W]WWE", /\d{4}W\d{3}/], ["GGGG[W]WW", /\d{4}W\d{2}/, false], ["YYYYDDD", /\d{7}/], ["YYYYMM", /\d{6}/, false], ["YYYY", /\d{4}/, false]], hs = [["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/], ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/], ["HH:mm:ss", /\d\d:\d\d:\d\d/], ["HH:mm", /\d\d:\d\d/], ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/], ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/], ["HHmmss", /\d\d\d\d\d\d/], ["HHmm", /\d\d\d\d/], ["HH", /\d\d/]], Mi = /^\/?Date\((-?\d+)/i, sm = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/, Li = { UT: 0, GMT: 0, EDT: -240, EST: -300, CDT: -300, CST: -360, MDT: -360, MST: -420, PDT: -420, PST: -480 };
      function hl(e) {
        var n, d, u = e._i, f = rn.exec(u) || Dr.exec(u), k, b, W, ie, ye = Ne.length, at = hs.length;
        if (f) {
          for (x(e).iso = true, n = 0, d = ye; n < d; n++) if (Ne[n][1].exec(f[1])) {
            b = Ne[n][0], k = Ne[n][2] !== false;
            break;
          }
          if (b == null) {
            e._isValid = false;
            return;
          }
          if (f[3]) {
            for (n = 0, d = at; n < d; n++) if (hs[n][1].exec(f[3])) {
              W = (f[2] || " ") + hs[n][0];
              break;
            }
            if (W == null) {
              e._isValid = false;
              return;
            }
          }
          if (!k && W != null) {
            e._isValid = false;
            return;
          }
          if (f[4]) if (vi.exec(f[4])) ie = "Z";
          else {
            e._isValid = false;
            return;
          }
          e._f = b + (W || "") + (ie || ""), Ti(e);
        } else e._isValid = false;
      }
      function nm(e, n, d, u, f, k) {
        var b = [am(e), gi.indexOf(n), parseInt(d, 10), parseInt(u, 10), parseInt(f, 10)];
        return k && b.push(parseInt(k, 10)), b;
      }
      function am(e) {
        var n = parseInt(e, 10);
        return n <= 49 ? 2e3 + n : n <= 999 ? 1900 + n : n;
      }
      function fl(e) {
        return e.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
      }
      function Yr(e, n, d) {
        if (e) {
          var u = il.indexOf(e), f = new Date(n[0], n[1], n[2]).getDay();
          if (u !== f) return x(d).weekdayMismatch = true, d._isValid = false, false;
        }
        return true;
      }
      function ra(e, n, d) {
        if (e) return Li[e];
        if (n) return 0;
        var u = parseInt(d, 10), f = u % 100, k = (u - f) / 100;
        return k * 60 + f;
      }
      function _l(e) {
        var n = sm.exec(fl(e._i)), d;
        if (n) {
          if (d = nm(n[4], n[3], n[2], n[5], n[6], n[7]), !Yr(n[1], d, e)) return;
          e._a = d, e._tzm = ra(n[8], n[9], n[10]), e._d = ta.apply(null, e._a), e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), x(e).rfc2822 = true;
        } else e._isValid = false;
      }
      function pl(e) {
        var n = Mi.exec(e._i);
        if (n !== null) {
          e._d = /* @__PURE__ */ new Date(+n[1]);
          return;
        }
        if (hl(e), e._isValid === false) delete e._isValid;
        else return;
        if (_l(e), e._isValid === false) delete e._isValid;
        else return;
        e._strict ? e._isValid = false : l.createFromInputFallback(e);
      }
      l.createFromInputFallback = Te("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function(e) {
        e._d = /* @__PURE__ */ new Date(e._i + (e._useUTC ? " UTC" : ""));
      });
      function Dn(e, n, d) {
        return e ?? n ?? d;
      }
      function ki(e) {
        var n = new Date(l.now());
        return e._useUTC ? [n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate()] : [n.getFullYear(), n.getMonth(), n.getDate()];
      }
      function Pa(e) {
        var n, d, u = [], f, k, b;
        if (!e._d) {
          for (f = ki(e), e._w && e._a[gs] == null && e._a[As] == null && yl(e), e._dayOfYear != null && (b = Dn(e._a[it], f[it]), (e._dayOfYear > Ea(b) || e._dayOfYear === 0) && (x(e)._overflowDayOfYear = true), d = ta(b, 0, e._dayOfYear), e._a[As] = d.getUTCMonth(), e._a[gs] = d.getUTCDate()), n = 0; n < 3 && e._a[n] == null; ++n) e._a[n] = u[n] = f[n];
          for (; n < 7; n++) e._a[n] = u[n] = e._a[n] == null ? n === 2 ? 1 : 0 : e._a[n];
          e._a[Qe] === 24 && e._a[ts] === 0 && e._a[Es] === 0 && e._a[sn] === 0 && (e._nextDay = true, e._a[Qe] = 0), e._d = (e._useUTC ? ta : Xo).apply(null, u), k = e._useUTC ? e._d.getUTCDay() : e._d.getDay(), e._tzm != null && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), e._nextDay && (e._a[Qe] = 24), e._w && typeof e._w.d < "u" && e._w.d !== k && (x(e).weekdayMismatch = true);
        }
      }
      function yl(e) {
        var n, d, u, f, k, b, W, ie, ye;
        n = e._w, n.GG != null || n.W != null || n.E != null ? (k = 1, b = 4, d = Dn(n.GG, e._a[it], na(Ee(), 1, 4).year), u = Dn(n.W, 1), f = Dn(n.E, 1), (f < 1 || f > 7) && (ie = true)) : (k = e._locale._week.dow, b = e._locale._week.doy, ye = na(Ee(), k, b), d = Dn(n.gg, e._a[it], ye.year), u = Dn(n.w, ye.week), n.d != null ? (f = n.d, (f < 0 || f > 6) && (ie = true)) : n.e != null ? (f = n.e + k, (n.e < 0 || n.e > 6) && (ie = true)) : f = k), u < 1 || u > ss(d, k, b) ? x(e)._overflowWeeks = true : ie != null ? x(e)._overflowWeekday = true : (W = el(d, u, f, k, b), e._a[it] = W.year, e._dayOfYear = W.dayOfYear);
      }
      l.ISO_8601 = function() {
      }, l.RFC_2822 = function() {
      };
      function Ti(e) {
        if (e._f === l.ISO_8601) {
          hl(e);
          return;
        }
        if (e._f === l.RFC_2822) {
          _l(e);
          return;
        }
        e._a = [], x(e).empty = true;
        var n = "" + e._i, d, u, f, k, b, W = n.length, ie = 0, ye, at;
        for (f = Wn(e._f, e._locale).match(Ut) || [], at = f.length, d = 0; d < at; d++) k = f[d], u = (n.match(bu(k, e)) || [])[0], u && (b = n.substr(0, n.indexOf(u)), b.length > 0 && x(e).unusedInput.push(b), n = n.slice(n.indexOf(u) + u.length), ie += u.length), Bn[k] ? (u ? x(e).empty = false : x(e).unusedTokens.push(k), Fu(k, u, e)) : e._strict && !u && x(e).unusedTokens.push(k);
        x(e).charsLeftOver = W - ie, n.length > 0 && x(e).unusedInput.push(n), e._a[Qe] <= 12 && x(e).bigHour === true && e._a[Qe] > 0 && (x(e).bigHour = void 0), x(e).parsedDateParts = e._a.slice(0), x(e).meridiem = e._meridiem, e._a[Qe] = Di(e._locale, e._a[Qe], e._meridiem), ye = x(e).era, ye !== null && (e._a[it] = e._locale.erasConvertYear(ye, e._a[it])), Pa(e), Tr(e);
      }
      function Di(e, n, d) {
        var u;
        return d == null ? n : e.meridiemHour != null ? e.meridiemHour(n, d) : (e.isPM != null && (u = e.isPM(d), u && n < 12 && (n += 12), !u && n === 12 && (n = 0)), n);
      }
      function Yi(e) {
        var n, d, u, f, k, b, W = false, ie = e._f.length;
        if (ie === 0) {
          x(e).invalidFormat = true, e._d = /* @__PURE__ */ new Date(NaN);
          return;
        }
        for (f = 0; f < ie; f++) k = 0, b = false, n = B({}, e), e._useUTC != null && (n._useUTC = e._useUTC), n._f = e._f[f], Ti(n), ee(n) && (b = true), k += x(n).charsLeftOver, k += x(n).unusedTokens.length * 10, x(n).score = k, W ? k < u && (u = k, d = n) : (u == null || k < u || b) && (u = k, d = n, b && (W = true));
        N(e, d || n);
      }
      function rm(e) {
        if (!e._d) {
          var n = Mn(e._i), d = n.day === void 0 ? n.date : n.day;
          e._a = E([n.year, n.month, d, n.hour, n.minute, n.second, n.millisecond], function(u) {
            return u && parseInt(u, 10);
          }), Pa(e);
        }
      }
      function wl(e) {
        var n = new J(Tr(_t(e)));
        return n._nextDay && (n.add(1, "d"), n._nextDay = void 0), n;
      }
      function _t(e) {
        var n = e._i, d = e._f;
        return e._locale = e._locale || Je(e._l), n === null || d === void 0 && n === "" ? se({ nullInput: true }) : (typeof n == "string" && (e._i = n = e._locale.preparse(n)), he(n) ? new J(Tr(n)) : (S(n) ? e._d = n : g(d) ? Yi(e) : d ? Ti(e) : Ci(e), ee(e) || (e._d = null), e));
      }
      function Ci(e) {
        var n = e._i;
        v(n) ? e._d = new Date(l.now()) : S(n) ? e._d = new Date(n.valueOf()) : typeof n == "string" ? pl(e) : g(n) ? (e._a = E(n.slice(0), function(d) {
          return parseInt(d, 10);
        }), Pa(e)) : h(n) ? rm(e) : D(n) ? e._d = new Date(n) : l.createFromInputFallback(e);
      }
      function ia(e, n, d, u, f) {
        var k = {};
        return (n === true || n === false) && (u = n, n = void 0), (d === true || d === false) && (u = d, d = void 0), (h(e) && M(e) || g(e) && e.length === 0) && (e = void 0), k._isAMomentObject = true, k._useUTC = k._isUTC = f, k._l = d, k._i = e, k._f = n, k._strict = u, wl(k);
      }
      function Ee(e, n, d, u) {
        return ia(e, n, d, u, false);
      }
      var vl = Te("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
        var e = Ee.apply(null, arguments);
        return this.isValid() && e.isValid() ? e < this ? this : e : se();
      }), im = Te("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
        var e = Ee.apply(null, arguments);
        return this.isValid() && e.isValid() ? e > this ? this : e : se();
      });
      function Ml(e, n) {
        var d, u;
        if (n.length === 1 && g(n[0]) && (n = n[0]), !n.length) return Ee();
        for (d = n[0], u = 1; u < n.length; ++u) (!n[u].isValid() || n[u][e](d)) && (d = n[u]);
        return d;
      }
      function om() {
        var e = [].slice.call(arguments, 0);
        return Ml("isBefore", e);
      }
      function lm() {
        var e = [].slice.call(arguments, 0);
        return Ml("isAfter", e);
      }
      var dm = function() {
        return Date.now ? Date.now() : +/* @__PURE__ */ new Date();
      }, fs = ["year", "quarter", "month", "week", "day", "hour", "minute", "second", "millisecond"];
      function um(e) {
        var n, d = false, u, f = fs.length;
        for (n in e) if (p(e, n) && !(ze.call(fs, n) !== -1 && (e[n] == null || !isNaN(e[n])))) return false;
        for (u = 0; u < f; ++u) if (e[fs[u]]) {
          if (d) return false;
          parseFloat(e[fs[u]]) !== _e(e[fs[u]]) && (d = true);
        }
        return true;
      }
      function mm() {
        return this._isValid;
      }
      function Si() {
        return fe(NaN);
      }
      function ja(e) {
        var n = Mn(e), d = n.year || 0, u = n.quarter || 0, f = n.month || 0, k = n.week || n.isoWeek || 0, b = n.day || 0, W = n.hour || 0, ie = n.minute || 0, ye = n.second || 0, at = n.millisecond || 0;
        this._isValid = um(n), this._milliseconds = +at + ye * 1e3 + ie * 6e4 + W * 1e3 * 60 * 60, this._days = +b + k * 7, this._months = +f + u * 3 + d * 12, this._data = {}, this._locale = Je(), this._bubble();
      }
      function ns(e) {
        return e instanceof ja;
      }
      function oa(e) {
        return e < 0 ? Math.round(-1 * e) * -1 : Math.round(e);
      }
      function cm(e, n, d) {
        var u = Math.min(e.length, n.length), f = Math.abs(e.length - n.length), k = 0, b;
        for (b = 0; b < u; b++) _e(e[b]) !== _e(n[b]) && k++;
        return k + f;
      }
      function Ll(e, n) {
        V(e, 0, 0, function() {
          var d = this.utcOffset(), u = "+";
          return d < 0 && (d = -d, u = "-"), u + Yt(~~(d / 60), 2) + n + Yt(~~d % 60, 2);
        });
      }
      Ll("Z", ":"), Ll("ZZ", ""), $("Z", _r), $("ZZ", _r), Se(["Z", "ZZ"], function(e, n, d) {
        d._useUTC = true, d._tzm = on(_r, e);
      });
      var gm = /([\+\-]|\d\d)/gi;
      function on(e, n) {
        var d = (n || "").match(e), u, f, k;
        return d === null ? null : (u = d[d.length - 1] || [], f = (u + "").match(gm) || ["-", 0, 0], k = +(f[1] * 60) + _e(f[2]), k === 0 ? 0 : f[0] === "+" ? k : -k);
      }
      function St(e, n) {
        var d, u;
        return n._isUTC ? (d = n.clone(), u = (he(e) || S(e) ? e.valueOf() : Ee(e).valueOf()) - d.valueOf(), d._d.setTime(d._d.valueOf() + u), l.updateOffset(d, false), d) : Ee(e).local();
      }
      function Cr(e) {
        return -Math.round(e._d.getTimezoneOffset());
      }
      l.updateOffset = function() {
      };
      function hm(e, n, d) {
        var u = this._offset || 0, f;
        if (!this.isValid()) return e != null ? this : NaN;
        if (e != null) {
          if (typeof e == "string") {
            if (e = on(_r, e), e === null) return this;
          } else Math.abs(e) < 16 && !d && (e = e * 60);
          return !this._isUTC && n && (f = Cr(this)), this._offset = e, this._isUTC = true, f != null && this.add(f, "m"), u !== e && (!n || this._changeInProgress ? Tl(this, fe(e - u, "m"), 1, false) : this._changeInProgress || (this._changeInProgress = true, l.updateOffset(this, true), this._changeInProgress = null)), this;
        } else return this._isUTC ? u : Cr(this);
      }
      function fm(e, n) {
        return e != null ? (typeof e != "string" && (e = -e), this.utcOffset(e, n), this) : -this.utcOffset();
      }
      function _m(e) {
        return this.utcOffset(0, e);
      }
      function pm(e) {
        return this._isUTC && (this.utcOffset(0, e), this._isUTC = false, e && this.subtract(Cr(this), "m")), this;
      }
      function ym() {
        if (this._tzm != null) this.utcOffset(this._tzm, false, true);
        else if (typeof this._i == "string") {
          var e = on(Cu, this._i);
          e != null ? this.utcOffset(e) : this.utcOffset(0, true);
        }
        return this;
      }
      function la(e) {
        return this.isValid() ? (e = e ? Ee(e).utcOffset() : 0, (this.utcOffset() - e) % 60 === 0) : false;
      }
      function Y() {
        return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
      }
      function A() {
        if (!v(this._isDSTShifted)) return this._isDSTShifted;
        var e = {}, n;
        return B(e, this), e = _t(e), e._a ? (n = e._isUTC ? j(e._a) : Ee(e._a), this._isDSTShifted = this.isValid() && cm(e._a, n.toArray()) > 0) : this._isDSTShifted = false, this._isDSTShifted;
      }
      function F() {
        return this.isValid() ? !this._isUTC : false;
      }
      function G() {
        return this.isValid() ? this._isUTC : false;
      }
      function oe() {
        return this.isValid() ? this._isUTC && this._offset === 0 : false;
      }
      var De = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/, Xe = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
      function fe(e, n) {
        var d = e, u = null, f, k, b;
        return ns(e) ? d = { ms: e._milliseconds, d: e._days, M: e._months } : D(e) || !isNaN(+e) ? (d = {}, n ? d[n] = +e : d.milliseconds = +e) : (u = De.exec(e)) ? (f = u[1] === "-" ? -1 : 1, d = { y: 0, d: _e(u[gs]) * f, h: _e(u[Qe]) * f, m: _e(u[ts]) * f, s: _e(u[Es]) * f, ms: _e(oa(u[sn] * 1e3)) * f }) : (u = Xe.exec(e)) ? (f = u[1] === "-" ? -1 : 1, d = { y: Ps(u[2], f), M: Ps(u[3], f), w: Ps(u[4], f), d: Ps(u[5], f), h: Ps(u[6], f), m: Ps(u[7], f), s: Ps(u[8], f) }) : d == null ? d = {} : typeof d == "object" && ("from" in d || "to" in d) && (b = Bt(Ee(d.from), Ee(d.to)), d = {}, d.ms = b.milliseconds, d.M = b.months), k = new ja(d), ns(e) && p(e, "_locale") && (k._locale = e._locale), ns(e) && p(e, "_isValid") && (k._isValid = e._isValid), k;
      }
      fe.fn = ja.prototype, fe.invalid = Si;
      function Ps(e, n) {
        var d = e && parseFloat(e.replace(",", "."));
        return (isNaN(d) ? 0 : d) * n;
      }
      function kl(e, n) {
        var d = {};
        return d.months = n.month() - e.month() + (n.year() - e.year()) * 12, e.clone().add(d.months, "M").isAfter(n) && --d.months, d.milliseconds = +n - +e.clone().add(d.months, "M"), d;
      }
      function Bt(e, n) {
        var d;
        return e.isValid() && n.isValid() ? (n = St(n, e), e.isBefore(n) ? d = kl(e, n) : (d = kl(n, e), d.milliseconds = -d.milliseconds, d.months = -d.months), d) : { milliseconds: 0, months: 0 };
      }
      function qa(e, n) {
        return function(d, u) {
          var f, k;
          return u !== null && !isNaN(+u) && (Ot(n, "moment()." + n + "(period, number) is deprecated. Please use moment()." + n + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."), k = d, d = u, u = k), f = fe(d, u), Tl(this, f, e), this;
        };
      }
      function Tl(e, n, d, u) {
        var f = n._milliseconds, k = oa(n._days), b = oa(n._months);
        e.isValid() && (u = u ?? true, b && Mr(e, nn(e, "Month") + b * d), k && zo(e, "Date", nn(e, "Date") + k * d), f && e._d.setTime(e._d.valueOf() + f * d), u && l.updateOffset(e, k || b));
      }
      var da = qa(1, "add"), Sr = qa(-1, "subtract");
      function Ia(e) {
        return typeof e == "string" || e instanceof String;
      }
      function Ye(e) {
        return he(e) || S(e) || Ia(e) || D(e) || Dl(e) || wm(e) || e === null || e === void 0;
      }
      function wm(e) {
        var n = h(e) && !M(e), d = false, u = ["years", "year", "y", "months", "month", "M", "days", "day", "d", "dates", "date", "D", "hours", "hour", "h", "minutes", "minute", "m", "seconds", "second", "s", "milliseconds", "millisecond", "ms"], f, k, b = u.length;
        for (f = 0; f < b; f += 1) k = u[f], d = d || p(e, k);
        return n && d;
      }
      function Dl(e) {
        var n = g(e), d = false;
        return n && (d = e.filter(function(u) {
          return !D(u) && Ia(e);
        }).length === 0), n && d;
      }
      function br(e) {
        var n = h(e) && !M(e), d = false, u = ["sameDay", "nextDay", "lastDay", "nextWeek", "lastWeek", "sameElse"], f, k;
        for (f = 0; f < u.length; f += 1) k = u[f], d = d || p(e, k);
        return n && d;
      }
      function vm(e, n) {
        var d = e.diff(n, "days", true);
        return d < -6 ? "sameElse" : d < -1 ? "lastWeek" : d < 0 ? "lastDay" : d < 1 ? "sameDay" : d < 2 ? "nextDay" : d < 7 ? "nextWeek" : "sameElse";
      }
      function Mm(e, n) {
        arguments.length === 1 && (arguments[0] ? Ye(arguments[0]) ? (e = arguments[0], n = void 0) : br(arguments[0]) && (n = arguments[0], e = void 0) : (e = void 0, n = void 0));
        var d = e || Ee(), u = St(d, this).startOf("day"), f = l.calendarFormat(this, u) || "sameElse", k = n && (Re(n[f]) ? n[f].call(this, d) : n[f]);
        return this.format(k || this.localeData().calendar(f, this, Ee(d)));
      }
      function Lm() {
        return new J(this);
      }
      function Fr(e, n) {
        var d = he(e) ? e : Ee(e);
        return this.isValid() && d.isValid() ? (n = Oe(n) || "millisecond", n === "millisecond" ? this.valueOf() > d.valueOf() : d.valueOf() < this.clone().startOf(n).valueOf()) : false;
      }
      function ln(e, n) {
        var d = he(e) ? e : Ee(e);
        return this.isValid() && d.isValid() ? (n = Oe(n) || "millisecond", n === "millisecond" ? this.valueOf() < d.valueOf() : this.clone().endOf(n).valueOf() < d.valueOf()) : false;
      }
      function xr(e, n, d, u) {
        var f = he(e) ? e : Ee(e), k = he(n) ? n : Ee(n);
        return this.isValid() && f.isValid() && k.isValid() ? (u = u || "()", (u[0] === "(" ? this.isAfter(f, d) : !this.isBefore(f, d)) && (u[1] === ")" ? this.isBefore(k, d) : !this.isAfter(k, d))) : false;
      }
      function Yl(e, n) {
        var d = he(e) ? e : Ee(e), u;
        return this.isValid() && d.isValid() ? (n = Oe(n) || "millisecond", n === "millisecond" ? this.valueOf() === d.valueOf() : (u = d.valueOf(), this.clone().startOf(n).valueOf() <= u && u <= this.clone().endOf(n).valueOf())) : false;
      }
      function Nr(e, n) {
        return this.isSame(e, n) || this.isAfter(e, n);
      }
      function Cl(e, n) {
        return this.isSame(e, n) || this.isBefore(e, n);
      }
      function Sl(e, n, d) {
        var u, f, k;
        if (!this.isValid()) return NaN;
        if (u = St(e, this), !u.isValid()) return NaN;
        switch (f = (u.utcOffset() - this.utcOffset()) * 6e4, n = Oe(n), n) {
          case "year":
            k = Yn(this, u) / 12;
            break;
          case "month":
            k = Yn(this, u);
            break;
          case "quarter":
            k = Yn(this, u) / 3;
            break;
          case "second":
            k = (this - u) / 1e3;
            break;
          case "minute":
            k = (this - u) / 6e4;
            break;
          case "hour":
            k = (this - u) / 36e5;
            break;
          case "day":
            k = (this - u - f) / 864e5;
            break;
          case "week":
            k = (this - u - f) / 6048e5;
            break;
          default:
            k = this - u;
        }
        return d ? k : zt(k);
      }
      function Yn(e, n) {
        if (e.date() < n.date()) return -Yn(n, e);
        var d = (n.year() - e.year()) * 12 + (n.month() - e.month()), u = e.clone().add(d, "months"), f, k;
        return n - u < 0 ? (f = e.clone().add(d - 1, "months"), k = (n - u) / (u - f)) : (f = e.clone().add(d + 1, "months"), k = (n - u) / (f - u)), -(d + k) || 0;
      }
      l.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ", l.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
      function bl() {
        return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
      }
      function Ra(e) {
        if (!this.isValid()) return null;
        var n = e !== true, d = n ? this.clone().utc() : this;
        return d.year() < 0 || d.year() > 9999 ? Xs(d, n ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ") : Re(Date.prototype.toISOString) ? n ? this.toDate().toISOString() : new Date(this.valueOf() + this.utcOffset() * 60 * 1e3).toISOString().replace("Z", Xs(d, "Z")) : Xs(d, n ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ");
      }
      function Cn() {
        if (!this.isValid()) return "moment.invalid(/* " + this._i + " */)";
        var e = "moment", n = "", d, u, f, k;
        return this.isLocal() || (e = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone", n = "Z"), d = "[" + e + '("]', u = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY", f = "-MM-DD[T]HH:mm:ss.SSS", k = n + '[")]', this.format(d + u + f + k);
      }
      function Ar(e) {
        e || (e = this.isUtc() ? l.defaultFormatUtc : l.defaultFormat);
        var n = Xs(this, e);
        return this.localeData().postformat(n);
      }
      function km(e, n) {
        return this.isValid() && (he(e) && e.isValid() || Ee(e).isValid()) ? fe({ to: this, from: e }).locale(this.locale()).humanize(!n) : this.localeData().invalidDate();
      }
      function Tm(e) {
        return this.from(Ee(), e);
      }
      function Dm(e, n) {
        return this.isValid() && (he(e) && e.isValid() || Ee(e).isValid()) ? fe({ from: this, to: e }).locale(this.locale()).humanize(!n) : this.localeData().invalidDate();
      }
      function Er(e) {
        return this.to(Ee(), e);
      }
      function Oa(e) {
        var n;
        return e === void 0 ? this._locale._abbr : (n = Je(e), n != null && (this._locale = n), this);
      }
      var Hr = Te("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(e) {
        return e === void 0 ? this.localeData() : this.locale(e);
      });
      function Fl() {
        return this._locale;
      }
      var Ua = 1e3, ua = 60 * Ua, Pr = 60 * ua, Ve = (365 * 400 + 97) * 24 * Pr;
      function Be(e, n) {
        return (e % n + n) % n;
      }
      function xl(e, n, d) {
        return e < 100 && e >= 0 ? new Date(e + 400, n, d) - Ve : new Date(e, n, d).valueOf();
      }
      function Nl(e, n, d) {
        return e < 100 && e >= 0 ? Date.UTC(e + 400, n, d) - Ve : Date.UTC(e, n, d);
      }
      function Al(e) {
        var n, d;
        if (e = Oe(e), e === void 0 || e === "millisecond" || !this.isValid()) return this;
        switch (d = this._isUTC ? Nl : xl, e) {
          case "year":
            n = d(this.year(), 0, 1);
            break;
          case "quarter":
            n = d(this.year(), this.month() - this.month() % 3, 1);
            break;
          case "month":
            n = d(this.year(), this.month(), 1);
            break;
          case "week":
            n = d(this.year(), this.month(), this.date() - this.weekday());
            break;
          case "isoWeek":
            n = d(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
            break;
          case "day":
          case "date":
            n = d(this.year(), this.month(), this.date());
            break;
          case "hour":
            n = this._d.valueOf(), n -= Be(n + (this._isUTC ? 0 : this.utcOffset() * ua), Pr);
            break;
          case "minute":
            n = this._d.valueOf(), n -= Be(n, ua);
            break;
          case "second":
            n = this._d.valueOf(), n -= Be(n, Ua);
            break;
        }
        return this._d.setTime(n), l.updateOffset(this, true), this;
      }
      function Ym(e) {
        var n, d;
        if (e = Oe(e), e === void 0 || e === "millisecond" || !this.isValid()) return this;
        switch (d = this._isUTC ? Nl : xl, e) {
          case "year":
            n = d(this.year() + 1, 0, 1) - 1;
            break;
          case "quarter":
            n = d(this.year(), this.month() - this.month() % 3 + 3, 1) - 1;
            break;
          case "month":
            n = d(this.year(), this.month() + 1, 1) - 1;
            break;
          case "week":
            n = d(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
            break;
          case "isoWeek":
            n = d(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
            break;
          case "day":
          case "date":
            n = d(this.year(), this.month(), this.date() + 1) - 1;
            break;
          case "hour":
            n = this._d.valueOf(), n += Pr - Be(n + (this._isUTC ? 0 : this.utcOffset() * ua), Pr) - 1;
            break;
          case "minute":
            n = this._d.valueOf(), n += ua - Be(n, ua) - 1;
            break;
          case "second":
            n = this._d.valueOf(), n += Ua - Be(n, Ua) - 1;
            break;
        }
        return this._d.setTime(n), l.updateOffset(this, true), this;
      }
      function bi() {
        return this._d.valueOf() - (this._offset || 0) * 6e4;
      }
      function za() {
        return Math.floor(this.valueOf() / 1e3);
      }
      function Fi() {
        return new Date(this.valueOf());
      }
      function ma() {
        var e = this;
        return [e.year(), e.month(), e.date(), e.hour(), e.minute(), e.second(), e.millisecond()];
      }
      function Ba() {
        var e = this;
        return { years: e.year(), months: e.month(), date: e.date(), hours: e.hours(), minutes: e.minutes(), seconds: e.seconds(), milliseconds: e.milliseconds() };
      }
      function Wa() {
        return this.isValid() ? this.toISOString() : null;
      }
      function jr() {
        return ee(this);
      }
      function ca() {
        return N({}, x(this));
      }
      function Cm() {
        return x(this).overflow;
      }
      function Sm() {
        return { input: this._i, format: this._f, locale: this._locale, isUTC: this._isUTC, strict: this._strict };
      }
      V("N", 0, 0, "eraAbbr"), V("NN", 0, 0, "eraAbbr"), V("NNN", 0, 0, "eraAbbr"), V("NNNN", 0, 0, "eraName"), V("NNNNN", 0, 0, "eraNarrow"), V("y", ["y", 1], "yo", "eraYear"), V("y", ["yy", 2], 0, "eraYear"), V("y", ["yyy", 3], 0, "eraYear"), V("y", ["yyyy", 4], 0, "eraYear"), $("N", me), $("NN", me), $("NNN", me), $("NNNN", Nm), $("NNNNN", Am), Se(["N", "NN", "NNN", "NNNN", "NNNNN"], function(e, n, d, u) {
        var f = d._locale.erasParse(e, u, d._strict);
        f ? x(d).era = f : x(d).invalidEra = e;
      }), $("y", tn), $("yy", tn), $("yyy", tn), $("yyyy", tn), $("yo", Em), Se(["y", "yy", "yyy", "yyyy"], it), Se(["yo"], function(e, n, d, u) {
        var f;
        d._locale._eraYearOrdinalRegex && (f = e.match(d._locale._eraYearOrdinalRegex)), d._locale.eraYearOrdinalParse ? n[it] = d._locale.eraYearOrdinalParse(e, f) : n[it] = parseInt(e, 10);
      });
      function bm(e, n) {
        var d, u, f, k = this._eras || Je("en")._eras;
        for (d = 0, u = k.length; d < u; ++d) {
          switch (typeof k[d].since) {
            case "string":
              f = l(k[d].since).startOf("day"), k[d].since = f.valueOf();
              break;
          }
          switch (typeof k[d].until) {
            case "undefined":
              k[d].until = 1 / 0;
              break;
            case "string":
              f = l(k[d].until).startOf("day").valueOf(), k[d].until = f.valueOf();
              break;
          }
        }
        return k;
      }
      function Fm(e, n, d) {
        var u, f, k = this.eras(), b, W, ie;
        for (e = e.toUpperCase(), u = 0, f = k.length; u < f; ++u) if (b = k[u].name.toUpperCase(), W = k[u].abbr.toUpperCase(), ie = k[u].narrow.toUpperCase(), d) switch (n) {
          case "N":
          case "NN":
          case "NNN":
            if (W === e) return k[u];
            break;
          case "NNNN":
            if (b === e) return k[u];
            break;
          case "NNNNN":
            if (ie === e) return k[u];
            break;
        }
        else if ([b, W, ie].indexOf(e) >= 0) return k[u];
      }
      function xm(e, n) {
        var d = e.since <= e.until ? 1 : -1;
        return n === void 0 ? l(e.since).year() : l(e.since).year() + (n - e.offset) * d;
      }
      function qr() {
        var e, n, d, u = this.localeData().eras();
        for (e = 0, n = u.length; e < n; ++e) if (d = this.clone().startOf("day").valueOf(), u[e].since <= d && d <= u[e].until || u[e].until <= d && d <= u[e].since) return u[e].name;
        return "";
      }
      function $a() {
        var e, n, d, u = this.localeData().eras();
        for (e = 0, n = u.length; e < n; ++e) if (d = this.clone().startOf("day").valueOf(), u[e].since <= d && d <= u[e].until || u[e].until <= d && d <= u[e].since) return u[e].narrow;
        return "";
      }
      function El() {
        var e, n, d, u = this.localeData().eras();
        for (e = 0, n = u.length; e < n; ++e) if (d = this.clone().startOf("day").valueOf(), u[e].since <= d && d <= u[e].until || u[e].until <= d && d <= u[e].since) return u[e].abbr;
        return "";
      }
      function y() {
        var e, n, d, u, f = this.localeData().eras();
        for (e = 0, n = f.length; e < n; ++e) if (d = f[e].since <= f[e].until ? 1 : -1, u = this.clone().startOf("day").valueOf(), f[e].since <= u && u <= f[e].until || f[e].until <= u && u <= f[e].since) return (this.year() - l(f[e].since).year()) * d + f[e].offset;
        return this.year();
      }
      function ga(e) {
        return p(this, "_erasNameRegex") || js.call(this), e ? this._erasNameRegex : this._erasRegex;
      }
      function Ir(e) {
        return p(this, "_erasAbbrRegex") || js.call(this), e ? this._erasAbbrRegex : this._erasRegex;
      }
      function Wt(e) {
        return p(this, "_erasNarrowRegex") || js.call(this), e ? this._erasNarrowRegex : this._erasRegex;
      }
      function me(e, n) {
        return n.erasAbbrRegex(e);
      }
      function Nm(e, n) {
        return n.erasNameRegex(e);
      }
      function Am(e, n) {
        return n.erasNarrowRegex(e);
      }
      function Em(e, n) {
        return n._eraYearOrdinalRegex || tn;
      }
      function js() {
        var e = [], n = [], d = [], u = [], f, k, b, W, ie, ye = this.eras();
        for (f = 0, k = ye.length; f < k; ++f) b = Ns(ye[f].name), W = Ns(ye[f].abbr), ie = Ns(ye[f].narrow), n.push(b), e.push(W), d.push(ie), u.push(b), u.push(W), u.push(ie);
        this._erasRegex = new RegExp("^(" + u.join("|") + ")", "i"), this._erasNameRegex = new RegExp("^(" + n.join("|") + ")", "i"), this._erasAbbrRegex = new RegExp("^(" + e.join("|") + ")", "i"), this._erasNarrowRegex = new RegExp("^(" + d.join("|") + ")", "i");
      }
      V(0, ["gg", 2], 0, function() {
        return this.weekYear() % 100;
      }), V(0, ["GG", 2], 0, function() {
        return this.isoWeekYear() % 100;
      });
      function Rr(e, n) {
        V(0, [e, e.length], 0, n);
      }
      Rr("gggg", "weekYear"), Rr("ggggg", "weekYear"), Rr("GGGG", "isoWeekYear"), Rr("GGGGG", "isoWeekYear"), $("G", Qn), $("g", Qn), $("GG", xe, Ct), $("gg", xe, Ct), $("GGGG", Na, en), $("gggg", Na, en), $("GGGGG", Zn, Vn), $("ggggg", Zn, Vn), kn(["gggg", "ggggg", "GGGG", "GGGGG"], function(e, n, d, u) {
        n[u.substr(0, 2)] = _e(e);
      }), kn(["gg", "GG"], function(e, n, d, u) {
        n[u] = l.parseTwoDigitYear(e);
      });
      function Hm(e) {
        return Hl.call(this, e, this.week(), this.weekday() + this.localeData()._week.dow, this.localeData()._week.dow, this.localeData()._week.doy);
      }
      function Pm(e) {
        return Hl.call(this, e, this.isoWeek(), this.isoWeekday(), 1, 4);
      }
      function jm() {
        return ss(this.year(), 1, 4);
      }
      function qm() {
        return ss(this.isoWeekYear(), 1, 4);
      }
      function qs() {
        var e = this.localeData()._week;
        return ss(this.year(), e.dow, e.doy);
      }
      function Im() {
        var e = this.localeData()._week;
        return ss(this.weekYear(), e.dow, e.doy);
      }
      function Hl(e, n, d, u, f) {
        var k;
        return e == null ? na(this, u, f).year : (k = ss(e, u, f), n > k && (n = k), Rm.call(this, e, n, d, u, f));
      }
      function Rm(e, n, d, u, f) {
        var k = el(e, n, d, u, f), b = ta(k.year, 0, k.dayOfYear);
        return this.year(b.getUTCFullYear()), this.month(b.getUTCMonth()), this.date(b.getUTCDate()), this;
      }
      V("Q", 0, "Qo", "quarter"), $("Q", Gn), Se("Q", function(e, n) {
        n[As] = (_e(e) - 1) * 3;
      });
      function Om(e) {
        return e == null ? Math.ceil((this.month() + 1) / 3) : this.month((e - 1) * 3 + this.month() % 3);
      }
      V("D", ["DD", 2], "Do", "date"), $("D", xe, Ln), $("DD", xe, Ct), $("Do", function(e, n) {
        return e ? n._dayOfMonthOrdinalParse || n._ordinalParse : n._dayOfMonthOrdinalParseLenient;
      }), Se(["D", "DD"], gs), Se("Do", function(e, n) {
        n[gs] = _e(e.match(xe)[0]);
      });
      var Pl = ea("Date", true);
      V("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), $("DDD", Kn), $("DDDD", Jn), Se(["DDD", "DDDD"], function(e, n, d) {
        d._dayOfYear = _e(e);
      });
      function Is(e) {
        var n = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
        return e == null ? n : this.add(e - n, "d");
      }
      V("m", ["mm", 2], 0, "minute"), $("m", xe, ci), $("mm", xe, Ct), Se(["m", "mm"], ts);
      var Um = ea("Minutes", false);
      V("s", ["ss", 2], 0, "second"), $("s", xe, ci), $("ss", xe, Ct), Se(["s", "ss"], Es);
      var zm = ea("Seconds", false);
      V("S", 0, 0, function() {
        return ~~(this.millisecond() / 100);
      }), V(0, ["SS", 2], 0, function() {
        return ~~(this.millisecond() / 10);
      }), V(0, ["SSS", 3], 0, "millisecond"), V(0, ["SSSS", 4], 0, function() {
        return this.millisecond() * 10;
      }), V(0, ["SSSSS", 5], 0, function() {
        return this.millisecond() * 100;
      }), V(0, ["SSSSSS", 6], 0, function() {
        return this.millisecond() * 1e3;
      }), V(0, ["SSSSSSS", 7], 0, function() {
        return this.millisecond() * 1e4;
      }), V(0, ["SSSSSSSS", 8], 0, function() {
        return this.millisecond() * 1e5;
      }), V(0, ["SSSSSSSSS", 9], 0, function() {
        return this.millisecond() * 1e6;
      }), $("S", Kn, Gn), $("SS", Kn, Ct), $("SSS", Kn, Jn);
      var dn, jl;
      for (dn = "SSSS"; dn.length <= 9; dn += "S") $(dn, tn);
      function Bm(e, n) {
        n[sn] = _e(("0." + e) * 1e3);
      }
      for (dn = "S"; dn.length <= 9; dn += "S") Se(dn, Bm);
      jl = ea("Milliseconds", false), V("z", 0, 0, "zoneAbbr"), V("zz", 0, 0, "zoneName");
      function Sn() {
        return this._isUTC ? "UTC" : "";
      }
      function Wm() {
        return this._isUTC ? "Coordinated Universal Time" : "";
      }
      var O = J.prototype;
      O.add = da, O.calendar = Mm, O.clone = Lm, O.diff = Sl, O.endOf = Ym, O.format = Ar, O.from = km, O.fromNow = Tm, O.to = Dm, O.toNow = Er, O.get = wr, O.invalidAt = Cm, O.isAfter = Fr, O.isBefore = ln, O.isBetween = xr, O.isSame = Yl, O.isSameOrAfter = Nr, O.isSameOrBefore = Cl, O.isValid = jr, O.lang = Hr, O.locale = Oa, O.localeData = Fl, O.max = im, O.min = vl, O.parsingFlags = ca, O.set = Eu, O.startOf = Al, O.subtract = Sr, O.toArray = ma, O.toObject = Ba, O.toDate = Fi, O.toISOString = Ra, O.inspect = Cn, typeof Symbol < "u" && Symbol.for != null && (O[Symbol.for("nodejs.util.inspect.custom")] = function() {
        return "Moment<" + this.format() + ">";
      }), O.toJSON = Wa, O.toString = bl, O.unix = za, O.valueOf = bi, O.creationData = Sm, O.eraName = qr, O.eraNarrow = $a, O.eraAbbr = El, O.eraYear = y, O.year = Uo, O.isLeapYear = Au, O.weekYear = Hm, O.isoWeekYear = Pm, O.quarter = O.quarters = Om, O.month = Vo, O.daysInMonth = Ko, O.week = O.weeks = Iu, O.isoWeek = O.isoWeeks = nl, O.weeksInYear = qs, O.weeksInWeekYear = Im, O.isoWeeksInYear = jm, O.isoWeeksInISOWeekYear = qm, O.date = Pl, O.day = O.days = Ju, O.weekday = Vu, O.isoWeekday = Ku, O.dayOfYear = Is, O.hour = O.hours = st, O.minute = O.minutes = Um, O.second = O.seconds = zm, O.millisecond = O.milliseconds = jl, O.utcOffset = hm, O.utc = _m, O.local = pm, O.parseZone = ym, O.hasAlignedHourOffset = la, O.isDST = Y, O.isLocal = F, O.isUtcOffset = G, O.isUtc = oe, O.isUTC = oe, O.zoneAbbr = Sn, O.zoneName = Wm, O.dates = Te("dates accessor is deprecated. Use date instead.", Pl), O.months = Te("months accessor is deprecated. Use month instead", Vo), O.years = Te("years accessor is deprecated. Use year instead", Uo), O.zone = Te("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", fm), O.isDSTShifted = Te("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", A);
      function as(e) {
        return Ee(e * 1e3);
      }
      function $m() {
        return Ee.apply(null, arguments).parseZone();
      }
      function ql(e) {
        return e;
      }
      var Le = Fa.prototype;
      Le.calendar = Mu, Le.longDateFormat = mr, Le.invalidDate = Io, Le.ordinal = Tu, Le.preparse = ql, Le.postformat = ql, Le.relativeTime = Ro, Le.pastFuture = Du, Le.set = zn, Le.eras = bm, Le.erasParse = Fm, Le.erasConvertYear = xm, Le.erasAbbrRegex = Ir, Le.erasNameRegex = ga, Le.erasNarrowRegex = Wt, Le.months = qu, Le.monthsShort = $o, Le.monthsParse = Jo, Le.monthsRegex = Zo, Le.monthsShortRegex = Lr, Le.week = hi, Le.firstDayOfYear = sl, Le.firstDayOfWeek = tl, Le.weekdays = Bu, Le.weekdaysMin = fi, Le.weekdaysShort = Wu, Le.weekdaysParse = Gu, Le.weekdaysRegex = He, Le.weekdaysShortRegex = Ae, Le.weekdaysMinRegex = Zu, Le.isPM = ul, Le.meridiem = yi;
      function Or(e, n, d, u) {
        var f = Je(), k = j().set(u, n);
        return f[d](k, e);
      }
      function Il(e, n, d) {
        if (D(e) && (n = e, e = void 0), e = e || "", n != null) return Or(e, n, d, "month");
        var u, f = [];
        for (u = 0; u < 12; u++) f[u] = Or(e, u, d, "month");
        return f;
      }
      function Ur(e, n, d, u) {
        typeof e == "boolean" ? (D(n) && (d = n, n = void 0), n = n || "") : (n = e, d = n, e = false, D(n) && (d = n, n = void 0), n = n || "");
        var f = Je(), k = e ? f._week.dow : 0, b, W = [];
        if (d != null) return Or(n, (d + k) % 7, u, "day");
        for (b = 0; b < 7; b++) W[b] = Or(n, (b + k) % 7, u, "day");
        return W;
      }
      function Rl(e, n) {
        return Il(e, n, "months");
      }
      function Gm(e, n) {
        return Il(e, n, "monthsShort");
      }
      function Jm(e, n, d) {
        return Ur(e, n, d, "weekdays");
      }
      function xi(e, n, d) {
        return Ur(e, n, d, "weekdaysShort");
      }
      function Ga(e, n, d) {
        return Ur(e, n, d, "weekdaysMin");
      }
      Hs("en", { eras: [{ since: "0001-01-01", until: 1 / 0, offset: 1, name: "Anno Domini", narrow: "AD", abbr: "AD" }, { since: "0000-12-31", until: -1 / 0, offset: 1, name: "Before Christ", narrow: "BC", abbr: "BC" }], dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/, ordinal: function(e) {
        var n = e % 10, d = _e(e % 100 / 10) === 1 ? "th" : n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th";
        return e + d;
      } }), l.lang = Te("moment.lang is deprecated. Use moment.locale instead.", Hs), l.langData = Te("moment.langData is deprecated. Use moment.localeData instead.", Je);
      var $t = Math.abs;
      function Vm() {
        var e = this._data;
        return this._milliseconds = $t(this._milliseconds), this._days = $t(this._days), this._months = $t(this._months), e.milliseconds = $t(e.milliseconds), e.seconds = $t(e.seconds), e.minutes = $t(e.minutes), e.hours = $t(e.hours), e.months = $t(e.months), e.years = $t(e.years), this;
      }
      function Ni(e, n, d, u) {
        var f = fe(n, d);
        return e._milliseconds += u * f._milliseconds, e._days += u * f._days, e._months += u * f._months, e._bubble();
      }
      function Km(e, n) {
        return Ni(this, e, n, 1);
      }
      function Rs(e, n) {
        return Ni(this, e, n, -1);
      }
      function zr(e) {
        return e < 0 ? Math.floor(e) : Math.ceil(e);
      }
      function bn() {
        var e = this._milliseconds, n = this._days, d = this._months, u = this._data, f, k, b, W, ie;
        return e >= 0 && n >= 0 && d >= 0 || e <= 0 && n <= 0 && d <= 0 || (e += zr(Ai(d) + n) * 864e5, n = 0, d = 0), u.milliseconds = e % 1e3, f = zt(e / 1e3), u.seconds = f % 60, k = zt(f / 60), u.minutes = k % 60, b = zt(k / 60), u.hours = b % 24, n += zt(b / 24), ie = zt(bt(n)), d += ie, n -= zr(Ai(ie)), W = zt(d / 12), d %= 12, u.days = n, u.months = d, u.years = W, this;
      }
      function bt(e) {
        return e * 4800 / 146097;
      }
      function Ai(e) {
        return e * 146097 / 4800;
      }
      function Ol(e) {
        if (!this.isValid()) return NaN;
        var n, d, u = this._milliseconds;
        if (e = Oe(e), e === "month" || e === "quarter" || e === "year") switch (n = this._days + u / 864e5, d = this._months + bt(n), e) {
          case "month":
            return d;
          case "quarter":
            return d / 3;
          case "year":
            return d / 12;
        }
        else switch (n = this._days + Math.round(Ai(this._months)), e) {
          case "week":
            return n / 7 + u / 6048e5;
          case "day":
            return n + u / 864e5;
          case "hour":
            return n * 24 + u / 36e5;
          case "minute":
            return n * 1440 + u / 6e4;
          case "second":
            return n * 86400 + u / 1e3;
          case "millisecond":
            return Math.floor(n * 864e5) + u;
          default:
            throw new Error("Unknown unit " + e);
        }
      }
      function _s(e) {
        return function() {
          return this.as(e);
        };
      }
      var ha = _s("ms"), un = _s("s"), Ul = _s("m"), Zm = _s("h"), Br = _s("d"), Qm = _s("w"), zl = _s("M"), nt = _s("Q"), Ei = _s("y"), Bl = ha;
      function ps() {
        return fe(this);
      }
      function Hi(e) {
        return e = Oe(e), this.isValid() ? this[e + "s"]() : NaN;
      }
      function ys(e) {
        return function() {
          return this.isValid() ? this._data[e] : NaN;
        };
      }
      var Fn = ys("milliseconds"), Wl = ys("seconds"), mt = ys("minutes"), Pi = ys("hours"), Xm = ys("days"), ec = ys("months"), tc = ys("years");
      function ji() {
        return zt(this.days() / 7);
      }
      var Os = Math.round, ws = { ss: 44, s: 45, m: 45, h: 22, d: 26, w: null, M: 11 };
      function $l(e, n, d, u, f) {
        return f.relativeTime(n || 1, !!d, e, u);
      }
      function sc(e, n, d, u) {
        var f = fe(e).abs(), k = Os(f.as("s")), b = Os(f.as("m")), W = Os(f.as("h")), ie = Os(f.as("d")), ye = Os(f.as("M")), at = Os(f.as("w")), Ds = Os(f.as("y")), pn = k <= d.ss && ["s", k] || k < d.s && ["ss", k] || b <= 1 && ["m"] || b < d.m && ["mm", b] || W <= 1 && ["h"] || W < d.h && ["hh", W] || ie <= 1 && ["d"] || ie < d.d && ["dd", ie];
        return d.w != null && (pn = pn || at <= 1 && ["w"] || at < d.w && ["ww", at]), pn = pn || ye <= 1 && ["M"] || ye < d.M && ["MM", ye] || Ds <= 1 && ["y"] || ["yy", Ds], pn[2] = n, pn[3] = +e > 0, pn[4] = u, $l.apply(null, pn);
      }
      function nc(e) {
        return e === void 0 ? Os : typeof e == "function" ? (Os = e, true) : false;
      }
      function Ja(e, n) {
        return ws[e] === void 0 ? false : n === void 0 ? ws[e] : (ws[e] = n, e === "s" && (ws.ss = n - 1), true);
      }
      function ac(e, n) {
        if (!this.isValid()) return this.localeData().invalidDate();
        var d = false, u = ws, f, k;
        return typeof e == "object" && (n = e, e = false), typeof e == "boolean" && (d = e), typeof n == "object" && (u = Object.assign({}, ws, n), n.s != null && n.ss == null && (u.ss = n.s - 1)), f = this.localeData(), k = sc(this, !d, u, f), d && (k = f.pastFuture(+this, k)), f.postformat(k);
      }
      var qi = Math.abs;
      function mn(e) {
        return (e > 0) - (e < 0) || +e;
      }
      function Va() {
        if (!this.isValid()) return this.localeData().invalidDate();
        var e = qi(this._milliseconds) / 1e3, n = qi(this._days), d = qi(this._months), u, f, k, b, W = this.asSeconds(), ie, ye, at, Ds;
        return W ? (u = zt(e / 60), f = zt(u / 60), e %= 60, u %= 60, k = zt(d / 12), d %= 12, b = e ? e.toFixed(3).replace(/\.?0+$/, "") : "", ie = W < 0 ? "-" : "", ye = mn(this._months) !== mn(W) ? "-" : "", at = mn(this._days) !== mn(W) ? "-" : "", Ds = mn(this._milliseconds) !== mn(W) ? "-" : "", ie + "P" + (k ? ye + k + "Y" : "") + (d ? ye + d + "M" : "") + (n ? at + n + "D" : "") + (f || u || e ? "T" : "") + (f ? Ds + f + "H" : "") + (u ? Ds + u + "M" : "") + (e ? Ds + b + "S" : "")) : "P0D";
      }
      var ve = ja.prototype;
      ve.isValid = mm, ve.abs = Vm, ve.add = Km, ve.subtract = Rs, ve.as = Ol, ve.asMilliseconds = ha, ve.asSeconds = un, ve.asMinutes = Ul, ve.asHours = Zm, ve.asDays = Br, ve.asWeeks = Qm, ve.asMonths = zl, ve.asQuarters = nt, ve.asYears = Ei, ve.valueOf = Bl, ve._bubble = bn, ve.clone = ps, ve.get = Hi, ve.milliseconds = Fn, ve.seconds = Wl, ve.minutes = mt, ve.hours = Pi, ve.days = Xm, ve.weeks = ji, ve.months = ec, ve.years = tc, ve.humanize = ac, ve.toISOString = Va, ve.toString = Va, ve.toJSON = Va, ve.locale = Oa, ve.localeData = Fl, ve.toIsoString = Te("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", Va), ve.lang = Hr, V("X", 0, 0, "unix"), V("x", 0, 0, "valueOf"), $("x", Qn), $("X", Su), Se("X", function(e, n, d) {
        d._d = new Date(parseFloat(e) * 1e3);
      }), Se("x", function(e, n, d) {
        d._d = new Date(_e(e));
      });
      l.version = "2.30.1", m(Ee), l.fn = O, l.min = om, l.max = lm, l.now = dm, l.utc = j, l.unix = as, l.months = Rl, l.isDate = S, l.locale = Hs, l.invalid = se, l.duration = fe, l.isMoment = he, l.weekdays = Jm, l.parseZone = $m, l.localeData = Je, l.isDuration = ns, l.monthsShort = Gm, l.weekdaysMin = Ga, l.defineLocale = ut, l.updateLocale = em, l.locales = tm, l.weekdaysShort = xi, l.normalizeUnits = Oe, l.relativeTimeRounding = nc, l.relativeTimeThreshold = Ja, l.calendarFormat = vm, l.prototype = O, l.HTML5_FMT = { DATETIME_LOCAL: "YYYY-MM-DDTHH:mm", DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss", DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS", DATE: "YYYY-MM-DD", TIME: "HH:mm", TIME_SECONDS: "HH:mm:ss", TIME_MS: "HH:mm:ss.SSS", WEEK: "GGGG-[W]WW", MONTH: "YYYY-MM" };
      l.defineLocale("af", { months: "Januarie_Februarie_Maart_April_Mei_Junie_Julie_Augustus_September_Oktober_November_Desember".split("_"), monthsShort: "Jan_Feb_Mrt_Apr_Mei_Jun_Jul_Aug_Sep_Okt_Nov_Des".split("_"), weekdays: "Sondag_Maandag_Dinsdag_Woensdag_Donderdag_Vrydag_Saterdag".split("_"), weekdaysShort: "Son_Maa_Din_Woe_Don_Vry_Sat".split("_"), weekdaysMin: "So_Ma_Di_Wo_Do_Vr_Sa".split("_"), meridiemParse: /vm|nm/i, isPM: function(e) {
        return /^nm$/i.test(e);
      }, meridiem: function(e, n, d) {
        return e < 12 ? d ? "vm" : "VM" : d ? "nm" : "NM";
      }, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[Vandag om] LT", nextDay: "[Môre om] LT", nextWeek: "dddd [om] LT", lastDay: "[Gister om] LT", lastWeek: "[Laas] dddd [om] LT", sameElse: "L" }, relativeTime: { future: "oor %s", past: "%s gelede", s: "'n paar sekondes", ss: "%d sekondes", m: "'n minuut", mm: "%d minute", h: "'n uur", hh: "%d ure", d: "'n dag", dd: "%d dae", M: "'n maand", MM: "%d maande", y: "'n jaar", yy: "%d jaar" }, dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/, ordinal: function(e) {
        return e + (e === 1 || e === 8 || e >= 20 ? "ste" : "de");
      }, week: { dow: 1, doy: 4 } });
      var Gl = function(e) {
        return e === 0 ? 0 : e === 1 ? 1 : e === 2 ? 2 : e % 100 >= 3 && e % 100 <= 10 ? 3 : e % 100 >= 11 ? 4 : 5;
      }, rc = { s: ["أقل من ثانية", "ثانية واحدة", ["ثانيتان", "ثانيتين"], "%d ثوان", "%d ثانية", "%d ثانية"], m: ["أقل من دقيقة", "دقيقة واحدة", ["دقيقتان", "دقيقتين"], "%d دقائق", "%d دقيقة", "%d دقيقة"], h: ["أقل من ساعة", "ساعة واحدة", ["ساعتان", "ساعتين"], "%d ساعات", "%d ساعة", "%d ساعة"], d: ["أقل من يوم", "يوم واحد", ["يومان", "يومين"], "%d أيام", "%d يومًا", "%d يوم"], M: ["أقل من شهر", "شهر واحد", ["شهران", "شهرين"], "%d أشهر", "%d شهرا", "%d شهر"], y: ["أقل من عام", "عام واحد", ["عامان", "عامين"], "%d أعوام", "%d عامًا", "%d عام"] }, Ft = function(e) {
        return function(n, d, u, f) {
          var k = Gl(n), b = rc[e][Gl(n)];
          return k === 2 && (b = b[d ? 0 : 1]), b.replace(/%d/i, n);
        };
      }, Wr = ["جانفي", "فيفري", "مارس", "أفريل", "ماي", "جوان", "جويلية", "أوت", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
      l.defineLocale("ar-dz", { months: Wr, monthsShort: Wr, weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"), weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"), weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "D/‏M/‏YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, meridiemParse: /ص|م/, isPM: function(e) {
        return e === "م";
      }, meridiem: function(e, n, d) {
        return e < 12 ? "ص" : "م";
      }, calendar: { sameDay: "[اليوم عند الساعة] LT", nextDay: "[غدًا عند الساعة] LT", nextWeek: "dddd [عند الساعة] LT", lastDay: "[أمس عند الساعة] LT", lastWeek: "dddd [عند الساعة] LT", sameElse: "L" }, relativeTime: { future: "بعد %s", past: "منذ %s", s: Ft("s"), ss: Ft("s"), m: Ft("m"), mm: Ft("m"), h: Ft("h"), hh: Ft("h"), d: Ft("d"), dd: Ft("d"), M: Ft("M"), MM: Ft("M"), y: Ft("y"), yy: Ft("y") }, postformat: function(e) {
        return e.replace(/,/g, "،");
      }, week: { dow: 0, doy: 4 } });
      l.defineLocale("ar-kw", { months: "يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"), monthsShort: "يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"), weekdays: "الأحد_الإتنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"), weekdaysShort: "احد_اتنين_ثلاثاء_اربعاء_خميس_جمعة_سبت".split("_"), weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, calendar: { sameDay: "[اليوم على الساعة] LT", nextDay: "[غدا على الساعة] LT", nextWeek: "dddd [على الساعة] LT", lastDay: "[أمس على الساعة] LT", lastWeek: "dddd [على الساعة] LT", sameElse: "L" }, relativeTime: { future: "في %s", past: "منذ %s", s: "ثوان", ss: "%d ثانية", m: "دقيقة", mm: "%d دقائق", h: "ساعة", hh: "%d ساعات", d: "يوم", dd: "%d أيام", M: "شهر", MM: "%d أشهر", y: "سنة", yy: "%d سنوات" }, week: { dow: 0, doy: 12 } });
      var ic = { 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9", 0: "0" }, $r = function(e) {
        return e === 0 ? 0 : e === 1 ? 1 : e === 2 ? 2 : e % 100 >= 3 && e % 100 <= 10 ? 3 : e % 100 >= 11 ? 4 : 5;
      }, Jl = { s: ["أقل من ثانية", "ثانية واحدة", ["ثانيتان", "ثانيتين"], "%d ثوان", "%d ثانية", "%d ثانية"], m: ["أقل من دقيقة", "دقيقة واحدة", ["دقيقتان", "دقيقتين"], "%d دقائق", "%d دقيقة", "%d دقيقة"], h: ["أقل من ساعة", "ساعة واحدة", ["ساعتان", "ساعتين"], "%d ساعات", "%d ساعة", "%d ساعة"], d: ["أقل من يوم", "يوم واحد", ["يومان", "يومين"], "%d أيام", "%d يومًا", "%d يوم"], M: ["أقل من شهر", "شهر واحد", ["شهران", "شهرين"], "%d أشهر", "%d شهرا", "%d شهر"], y: ["أقل من عام", "عام واحد", ["عامان", "عامين"], "%d أعوام", "%d عامًا", "%d عام"] }, xt = function(e) {
        return function(n, d, u, f) {
          var k = $r(n), b = Jl[e][$r(n)];
          return k === 2 && (b = b[d ? 0 : 1]), b.replace(/%d/i, n);
        };
      }, Ii = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
      l.defineLocale("ar-ly", { months: Ii, monthsShort: Ii, weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"), weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"), weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "D/‏M/‏YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, meridiemParse: /ص|م/, isPM: function(e) {
        return e === "م";
      }, meridiem: function(e, n, d) {
        return e < 12 ? "ص" : "م";
      }, calendar: { sameDay: "[اليوم عند الساعة] LT", nextDay: "[غدًا عند الساعة] LT", nextWeek: "dddd [عند الساعة] LT", lastDay: "[أمس عند الساعة] LT", lastWeek: "dddd [عند الساعة] LT", sameElse: "L" }, relativeTime: { future: "بعد %s", past: "منذ %s", s: xt("s"), ss: xt("s"), m: xt("m"), mm: xt("m"), h: xt("h"), hh: xt("h"), d: xt("d"), dd: xt("d"), M: xt("M"), MM: xt("M"), y: xt("y"), yy: xt("y") }, preparse: function(e) {
        return e.replace(/،/g, ",");
      }, postformat: function(e) {
        return e.replace(/\d/g, function(n) {
          return ic[n];
        }).replace(/,/g, "،");
      }, week: { dow: 6, doy: 12 } });
      l.defineLocale("ar-ma", { months: "يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"), monthsShort: "يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"), weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"), weekdaysShort: "احد_اثنين_ثلاثاء_اربعاء_خميس_جمعة_سبت".split("_"), weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, calendar: { sameDay: "[اليوم على الساعة] LT", nextDay: "[غدا على الساعة] LT", nextWeek: "dddd [على الساعة] LT", lastDay: "[أمس على الساعة] LT", lastWeek: "dddd [على الساعة] LT", sameElse: "L" }, relativeTime: { future: "في %s", past: "منذ %s", s: "ثوان", ss: "%d ثانية", m: "دقيقة", mm: "%d دقائق", h: "ساعة", hh: "%d ساعات", d: "يوم", dd: "%d أيام", M: "شهر", MM: "%d أشهر", y: "سنة", yy: "%d سنوات" }, week: { dow: 1, doy: 4 } });
      var Gr = { 1: "١", 2: "٢", 3: "٣", 4: "٤", 5: "٥", 6: "٦", 7: "٧", 8: "٨", 9: "٩", 0: "٠" }, Vl = { "١": "1", "٢": "2", "٣": "3", "٤": "4", "٥": "5", "٦": "6", "٧": "7", "٨": "8", "٩": "9", "٠": "0" };
      l.defineLocale("ar-ps", { months: "كانون الثاني_شباط_آذار_نيسان_أيّار_حزيران_تمّوز_آب_أيلول_تشري الأوّل_تشرين الثاني_كانون الأوّل".split("_"), monthsShort: "ك٢_شباط_آذار_نيسان_أيّار_حزيران_تمّوز_آب_أيلول_ت١_ت٢_ك١".split("_"), weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"), weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"), weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, meridiemParse: /ص|م/, isPM: function(e) {
        return e === "م";
      }, meridiem: function(e, n, d) {
        return e < 12 ? "ص" : "م";
      }, calendar: { sameDay: "[اليوم على الساعة] LT", nextDay: "[غدا على الساعة] LT", nextWeek: "dddd [على الساعة] LT", lastDay: "[أمس على الساعة] LT", lastWeek: "dddd [على الساعة] LT", sameElse: "L" }, relativeTime: { future: "في %s", past: "منذ %s", s: "ثوان", ss: "%d ثانية", m: "دقيقة", mm: "%d دقائق", h: "ساعة", hh: "%d ساعات", d: "يوم", dd: "%d أيام", M: "شهر", MM: "%d أشهر", y: "سنة", yy: "%d سنوات" }, preparse: function(e) {
        return e.replace(/[٣٤٥٦٧٨٩٠]/g, function(n) {
          return Vl[n];
        }).split("").reverse().join("").replace(/[١٢](?![\u062a\u0643])/g, function(n) {
          return Vl[n];
        }).split("").reverse().join("").replace(/،/g, ",");
      }, postformat: function(e) {
        return e.replace(/\d/g, function(n) {
          return Gr[n];
        }).replace(/,/g, "،");
      }, week: { dow: 0, doy: 6 } });
      var Kl = { 1: "١", 2: "٢", 3: "٣", 4: "٤", 5: "٥", 6: "٦", 7: "٧", 8: "٨", 9: "٩", 0: "٠" }, Zl = { "١": "1", "٢": "2", "٣": "3", "٤": "4", "٥": "5", "٦": "6", "٧": "7", "٨": "8", "٩": "9", "٠": "0" };
      l.defineLocale("ar-sa", { months: "يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"), monthsShort: "يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"), weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"), weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"), weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, meridiemParse: /ص|م/, isPM: function(e) {
        return e === "م";
      }, meridiem: function(e, n, d) {
        return e < 12 ? "ص" : "م";
      }, calendar: { sameDay: "[اليوم على الساعة] LT", nextDay: "[غدا على الساعة] LT", nextWeek: "dddd [على الساعة] LT", lastDay: "[أمس على الساعة] LT", lastWeek: "dddd [على الساعة] LT", sameElse: "L" }, relativeTime: { future: "في %s", past: "منذ %s", s: "ثوان", ss: "%d ثانية", m: "دقيقة", mm: "%d دقائق", h: "ساعة", hh: "%d ساعات", d: "يوم", dd: "%d أيام", M: "شهر", MM: "%d أشهر", y: "سنة", yy: "%d سنوات" }, preparse: function(e) {
        return e.replace(/[١٢٣٤٥٦٧٨٩٠]/g, function(n) {
          return Zl[n];
        }).replace(/،/g, ",");
      }, postformat: function(e) {
        return e.replace(/\d/g, function(n) {
          return Kl[n];
        }).replace(/,/g, "،");
      }, week: { dow: 0, doy: 6 } });
      l.defineLocale("ar-tn", { months: "جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"), monthsShort: "جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"), weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"), weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"), weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, calendar: { sameDay: "[اليوم على الساعة] LT", nextDay: "[غدا على الساعة] LT", nextWeek: "dddd [على الساعة] LT", lastDay: "[أمس على الساعة] LT", lastWeek: "dddd [على الساعة] LT", sameElse: "L" }, relativeTime: { future: "في %s", past: "منذ %s", s: "ثوان", ss: "%d ثانية", m: "دقيقة", mm: "%d دقائق", h: "ساعة", hh: "%d ساعات", d: "يوم", dd: "%d أيام", M: "شهر", MM: "%d أشهر", y: "سنة", yy: "%d سنوات" }, week: { dow: 1, doy: 4 } });
      var oc = { 1: "١", 2: "٢", 3: "٣", 4: "٤", 5: "٥", 6: "٦", 7: "٧", 8: "٨", 9: "٩", 0: "٠" }, Ql = { "١": "1", "٢": "2", "٣": "3", "٤": "4", "٥": "5", "٦": "6", "٧": "7", "٨": "8", "٩": "9", "٠": "0" }, Xl = function(e) {
        return e === 0 ? 0 : e === 1 ? 1 : e === 2 ? 2 : e % 100 >= 3 && e % 100 <= 10 ? 3 : e % 100 >= 11 ? 4 : 5;
      }, Ri = { s: ["أقل من ثانية", "ثانية واحدة", ["ثانيتان", "ثانيتين"], "%d ثوان", "%d ثانية", "%d ثانية"], m: ["أقل من دقيقة", "دقيقة واحدة", ["دقيقتان", "دقيقتين"], "%d دقائق", "%d دقيقة", "%d دقيقة"], h: ["أقل من ساعة", "ساعة واحدة", ["ساعتان", "ساعتين"], "%d ساعات", "%d ساعة", "%d ساعة"], d: ["أقل من يوم", "يوم واحد", ["يومان", "يومين"], "%d أيام", "%d يومًا", "%d يوم"], M: ["أقل من شهر", "شهر واحد", ["شهران", "شهرين"], "%d أشهر", "%d شهرا", "%d شهر"], y: ["أقل من عام", "عام واحد", ["عامان", "عامين"], "%d أعوام", "%d عامًا", "%d عام"] }, Nt = function(e) {
        return function(n, d, u, f) {
          var k = Xl(n), b = Ri[e][Xl(n)];
          return k === 2 && (b = b[d ? 0 : 1]), b.replace(/%d/i, n);
        };
      }, Jr = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
      l.defineLocale("ar", { months: Jr, monthsShort: Jr, weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"), weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"), weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "D/‏M/‏YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, meridiemParse: /ص|م/, isPM: function(e) {
        return e === "م";
      }, meridiem: function(e, n, d) {
        return e < 12 ? "ص" : "م";
      }, calendar: { sameDay: "[اليوم عند الساعة] LT", nextDay: "[غدًا عند الساعة] LT", nextWeek: "dddd [عند الساعة] LT", lastDay: "[أمس عند الساعة] LT", lastWeek: "dddd [عند الساعة] LT", sameElse: "L" }, relativeTime: { future: "بعد %s", past: "منذ %s", s: Nt("s"), ss: Nt("s"), m: Nt("m"), mm: Nt("m"), h: Nt("h"), hh: Nt("h"), d: Nt("d"), dd: Nt("d"), M: Nt("M"), MM: Nt("M"), y: Nt("y"), yy: Nt("y") }, preparse: function(e) {
        return e.replace(/[١٢٣٤٥٦٧٨٩٠]/g, function(n) {
          return Ql[n];
        }).replace(/،/g, ",");
      }, postformat: function(e) {
        return e.replace(/\d/g, function(n) {
          return oc[n];
        }).replace(/,/g, "،");
      }, week: { dow: 6, doy: 12 } });
      var Oi = { 1: "-inci", 5: "-inci", 8: "-inci", 70: "-inci", 80: "-inci", 2: "-nci", 7: "-nci", 20: "-nci", 50: "-nci", 3: "-üncü", 4: "-üncü", 100: "-üncü", 6: "-ncı", 9: "-uncu", 10: "-uncu", 30: "-uncu", 60: "-ıncı", 90: "-ıncı" };
      l.defineLocale("az", { months: "yanvar_fevral_mart_aprel_may_iyun_iyul_avqust_sentyabr_oktyabr_noyabr_dekabr".split("_"), monthsShort: "yan_fev_mar_apr_may_iyn_iyl_avq_sen_okt_noy_dek".split("_"), weekdays: "Bazar_Bazar ertəsi_Çərşənbə axşamı_Çərşənbə_Cümə axşamı_Cümə_Şənbə".split("_"), weekdaysShort: "Baz_BzE_ÇAx_Çər_CAx_Cüm_Şən".split("_"), weekdaysMin: "Bz_BE_ÇA_Çə_CA_Cü_Şə".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[bugün saat] LT", nextDay: "[sabah saat] LT", nextWeek: "[gələn həftə] dddd [saat] LT", lastDay: "[dünən] LT", lastWeek: "[keçən həftə] dddd [saat] LT", sameElse: "L" }, relativeTime: { future: "%s sonra", past: "%s əvvəl", s: "bir neçə saniyə", ss: "%d saniyə", m: "bir dəqiqə", mm: "%d dəqiqə", h: "bir saat", hh: "%d saat", d: "bir gün", dd: "%d gün", M: "bir ay", MM: "%d ay", y: "bir il", yy: "%d il" }, meridiemParse: /gecə|səhər|gündüz|axşam/, isPM: function(e) {
        return /^(gündüz|axşam)$/.test(e);
      }, meridiem: function(e, n, d) {
        return e < 4 ? "gecə" : e < 12 ? "səhər" : e < 17 ? "gündüz" : "axşam";
      }, dayOfMonthOrdinalParse: /\d{1,2}-(ıncı|inci|nci|üncü|ncı|uncu)/, ordinal: function(e) {
        if (e === 0) return e + "-ıncı";
        var n = e % 10, d = e % 100 - n, u = e >= 100 ? 100 : null;
        return e + (Oi[n] || Oi[d] || Oi[u]);
      }, week: { dow: 1, doy: 7 } });
      function Ui(e, n) {
        var d = e.split("_");
        return n % 10 === 1 && n % 100 !== 11 ? d[0] : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? d[1] : d[2];
      }
      function le(e, n, d) {
        var u = { ss: n ? "секунда_секунды_секунд" : "секунду_секунды_секунд", mm: n ? "хвіліна_хвіліны_хвілін" : "хвіліну_хвіліны_хвілін", hh: n ? "гадзіна_гадзіны_гадзін" : "гадзіну_гадзіны_гадзін", dd: "дзень_дні_дзён", MM: "месяц_месяцы_месяцаў", yy: "год_гады_гадоў" };
        return d === "m" ? n ? "хвіліна" : "хвіліну" : d === "h" ? n ? "гадзіна" : "гадзіну" : e + " " + Ui(u[d], +e);
      }
      l.defineLocale("be", { months: { format: "студзеня_лютага_сакавіка_красавіка_траўня_чэрвеня_ліпеня_жніўня_верасня_кастрычніка_лістапада_снежня".split("_"), standalone: "студзень_люты_сакавік_красавік_травень_чэрвень_ліпень_жнівень_верасень_кастрычнік_лістапад_снежань".split("_") }, monthsShort: "студ_лют_сак_крас_трав_чэрв_ліп_жнів_вер_каст_ліст_снеж".split("_"), weekdays: { format: "нядзелю_панядзелак_аўторак_сераду_чацвер_пятніцу_суботу".split("_"), standalone: "нядзеля_панядзелак_аўторак_серада_чацвер_пятніца_субота".split("_"), isFormat: /\[ ?[Ууў] ?(?:мінулую|наступную)? ?\] ?dddd/ }, weekdaysShort: "нд_пн_ат_ср_чц_пт_сб".split("_"), weekdaysMin: "нд_пн_ат_ср_чц_пт_сб".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY г.", LLL: "D MMMM YYYY г., HH:mm", LLLL: "dddd, D MMMM YYYY г., HH:mm" }, calendar: { sameDay: "[Сёння ў] LT", nextDay: "[Заўтра ў] LT", lastDay: "[Учора ў] LT", nextWeek: function() {
        return "[У] dddd [ў] LT";
      }, lastWeek: function() {
        switch (this.day()) {
          case 0:
          case 3:
          case 5:
          case 6:
            return "[У мінулую] dddd [ў] LT";
          case 1:
          case 2:
          case 4:
            return "[У мінулы] dddd [ў] LT";
        }
      }, sameElse: "L" }, relativeTime: { future: "праз %s", past: "%s таму", s: "некалькі секунд", m: le, mm: le, h: le, hh: le, d: "дзень", dd: le, M: "месяц", MM: le, y: "год", yy: le }, meridiemParse: /ночы|раніцы|дня|вечара/, isPM: function(e) {
        return /^(дня|вечара)$/.test(e);
      }, meridiem: function(e, n, d) {
        return e < 4 ? "ночы" : e < 12 ? "раніцы" : e < 17 ? "дня" : "вечара";
      }, dayOfMonthOrdinalParse: /\d{1,2}-(і|ы|га)/, ordinal: function(e, n) {
        switch (n) {
          case "M":
          case "d":
          case "DDD":
          case "w":
          case "W":
            return (e % 10 === 2 || e % 10 === 3) && e % 100 !== 12 && e % 100 !== 13 ? e + "-і" : e + "-ы";
          case "D":
            return e + "-га";
          default:
            return e;
        }
      }, week: { dow: 1, doy: 7 } });
      l.defineLocale("bg", { months: "януари_февруари_март_април_май_юни_юли_август_септември_октомври_ноември_декември".split("_"), monthsShort: "яну_фев_мар_апр_май_юни_юли_авг_сеп_окт_ное_дек".split("_"), weekdays: "неделя_понеделник_вторник_сряда_четвъртък_петък_събота".split("_"), weekdaysShort: "нед_пон_вто_сря_чет_пет_съб".split("_"), weekdaysMin: "нд_пн_вт_ср_чт_пт_сб".split("_"), longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "D.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY H:mm", LLLL: "dddd, D MMMM YYYY H:mm" }, calendar: { sameDay: "[Днес в] LT", nextDay: "[Утре в] LT", nextWeek: "dddd [в] LT", lastDay: "[Вчера в] LT", lastWeek: function() {
        switch (this.day()) {
          case 0:
          case 3:
          case 6:
            return "[Миналата] dddd [в] LT";
          case 1:
          case 2:
          case 4:
          case 5:
            return "[Миналия] dddd [в] LT";
        }
      }, sameElse: "L" }, relativeTime: { future: "след %s", past: "преди %s", s: "няколко секунди", ss: "%d секунди", m: "минута", mm: "%d минути", h: "час", hh: "%d часа", d: "ден", dd: "%d дена", w: "седмица", ww: "%d седмици", M: "месец", MM: "%d месеца", y: "година", yy: "%d години" }, dayOfMonthOrdinalParse: /\d{1,2}-(ев|ен|ти|ви|ри|ми)/, ordinal: function(e) {
        var n = e % 10, d = e % 100;
        return e === 0 ? e + "-ев" : d === 0 ? e + "-ен" : d > 10 && d < 20 ? e + "-ти" : n === 1 ? e + "-ви" : n === 2 ? e + "-ри" : n === 7 || n === 8 ? e + "-ми" : e + "-ти";
      }, week: { dow: 1, doy: 7 } });
      l.defineLocale("bm", { months: "Zanwuyekalo_Fewuruyekalo_Marisikalo_Awirilikalo_Mɛkalo_Zuwɛnkalo_Zuluyekalo_Utikalo_Sɛtanburukalo_ɔkutɔburukalo_Nowanburukalo_Desanburukalo".split("_"), monthsShort: "Zan_Few_Mar_Awi_Mɛ_Zuw_Zul_Uti_Sɛt_ɔku_Now_Des".split("_"), weekdays: "Kari_Ntɛnɛn_Tarata_Araba_Alamisa_Juma_Sibiri".split("_"), weekdaysShort: "Kar_Ntɛ_Tar_Ara_Ala_Jum_Sib".split("_"), weekdaysMin: "Ka_Nt_Ta_Ar_Al_Ju_Si".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "MMMM [tile] D [san] YYYY", LLL: "MMMM [tile] D [san] YYYY [lɛrɛ] HH:mm", LLLL: "dddd MMMM [tile] D [san] YYYY [lɛrɛ] HH:mm" }, calendar: { sameDay: "[Bi lɛrɛ] LT", nextDay: "[Sini lɛrɛ] LT", nextWeek: "dddd [don lɛrɛ] LT", lastDay: "[Kunu lɛrɛ] LT", lastWeek: "dddd [tɛmɛnen lɛrɛ] LT", sameElse: "L" }, relativeTime: { future: "%s kɔnɔ", past: "a bɛ %s bɔ", s: "sanga dama dama", ss: "sekondi %d", m: "miniti kelen", mm: "miniti %d", h: "lɛrɛ kelen", hh: "lɛrɛ %d", d: "tile kelen", dd: "tile %d", M: "kalo kelen", MM: "kalo %d", y: "san kelen", yy: "san %d" }, week: { dow: 1, doy: 4 } });
      var lc = { 1: "১", 2: "২", 3: "৩", 4: "৪", 5: "৫", 6: "৬", 7: "৭", 8: "৮", 9: "৯", 0: "০" }, dc = { "১": "1", "২": "2", "৩": "3", "৪": "4", "৫": "5", "৬": "6", "৭": "7", "৮": "8", "৯": "9", "০": "0" };
      l.defineLocale("bn-bd", { months: "জানুয়ারি_ফেব্রুয়ারি_মার্চ_এপ্রিল_মে_জুন_জুলাই_আগস্ট_সেপ্টেম্বর_অক্টোবর_নভেম্বর_ডিসেম্বর".split("_"), monthsShort: "জানু_ফেব্রু_মার্চ_এপ্রিল_মে_জুন_জুলাই_আগস্ট_সেপ্ট_অক্টো_নভে_ডিসে".split("_"), weekdays: "রবিবার_সোমবার_মঙ্গলবার_বুধবার_বৃহস্পতিবার_শুক্রবার_শনিবার".split("_"), weekdaysShort: "রবি_সোম_মঙ্গল_বুধ_বৃহস্পতি_শুক্র_শনি".split("_"), weekdaysMin: "রবি_সোম_মঙ্গল_বুধ_বৃহ_শুক্র_শনি".split("_"), longDateFormat: { LT: "A h:mm সময়", LTS: "A h:mm:ss সময়", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, A h:mm সময়", LLLL: "dddd, D MMMM YYYY, A h:mm সময়" }, calendar: { sameDay: "[আজ] LT", nextDay: "[আগামীকাল] LT", nextWeek: "dddd, LT", lastDay: "[গতকাল] LT", lastWeek: "[গত] dddd, LT", sameElse: "L" }, relativeTime: { future: "%s পরে", past: "%s আগে", s: "কয়েক সেকেন্ড", ss: "%d সেকেন্ড", m: "এক মিনিট", mm: "%d মিনিট", h: "এক ঘন্টা", hh: "%d ঘন্টা", d: "এক দিন", dd: "%d দিন", M: "এক মাস", MM: "%d মাস", y: "এক বছর", yy: "%d বছর" }, preparse: function(e) {
        return e.replace(/[১২৩৪৫৬৭৮৯০]/g, function(n) {
          return dc[n];
        });
      }, postformat: function(e) {
        return e.replace(/\d/g, function(n) {
          return lc[n];
        });
      }, meridiemParse: /রাত|ভোর|সকাল|দুপুর|বিকাল|সন্ধ্যা|রাত/, meridiemHour: function(e, n) {
        if (e === 12 && (e = 0), n === "রাত") return e < 4 ? e : e + 12;
        if (n === "ভোর") return e;
        if (n === "সকাল") return e;
        if (n === "দুপুর") return e >= 3 ? e : e + 12;
        if (n === "বিকাল") return e + 12;
        if (n === "সন্ধ্যা") return e + 12;
      }, meridiem: function(e, n, d) {
        return e < 4 ? "রাত" : e < 6 ? "ভোর" : e < 12 ? "সকাল" : e < 15 ? "দুপুর" : e < 18 ? "বিকাল" : e < 20 ? "সন্ধ্যা" : "রাত";
      }, week: { dow: 0, doy: 6 } });
      var Ka = { 1: "১", 2: "২", 3: "৩", 4: "৪", 5: "৫", 6: "৬", 7: "৭", 8: "৮", 9: "৯", 0: "০" }, ed = { "১": "1", "২": "2", "৩": "3", "৪": "4", "৫": "5", "৬": "6", "৭": "7", "৮": "8", "৯": "9", "০": "0" };
      l.defineLocale("bn", { months: "জানুয়ারি_ফেব্রুয়ারি_মার্চ_এপ্রিল_মে_জুন_জুলাই_আগস্ট_সেপ্টেম্বর_অক্টোবর_নভেম্বর_ডিসেম্বর".split("_"), monthsShort: "জানু_ফেব্রু_মার্চ_এপ্রিল_মে_জুন_জুলাই_আগস্ট_সেপ্ট_অক্টো_নভে_ডিসে".split("_"), weekdays: "রবিবার_সোমবার_মঙ্গলবার_বুধবার_বৃহস্পতিবার_শুক্রবার_শনিবার".split("_"), weekdaysShort: "রবি_সোম_মঙ্গল_বুধ_বৃহস্পতি_শুক্র_শনি".split("_"), weekdaysMin: "রবি_সোম_মঙ্গল_বুধ_বৃহ_শুক্র_শনি".split("_"), longDateFormat: { LT: "A h:mm সময়", LTS: "A h:mm:ss সময়", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, A h:mm সময়", LLLL: "dddd, D MMMM YYYY, A h:mm সময়" }, calendar: { sameDay: "[আজ] LT", nextDay: "[আগামীকাল] LT", nextWeek: "dddd, LT", lastDay: "[গতকাল] LT", lastWeek: "[গত] dddd, LT", sameElse: "L" }, relativeTime: { future: "%s পরে", past: "%s আগে", s: "কয়েক সেকেন্ড", ss: "%d সেকেন্ড", m: "এক মিনিট", mm: "%d মিনিট", h: "এক ঘন্টা", hh: "%d ঘন্টা", d: "এক দিন", dd: "%d দিন", M: "এক মাস", MM: "%d মাস", y: "এক বছর", yy: "%d বছর" }, preparse: function(e) {
        return e.replace(/[১২৩৪৫৬৭৮৯০]/g, function(n) {
          return ed[n];
        });
      }, postformat: function(e) {
        return e.replace(/\d/g, function(n) {
          return Ka[n];
        });
      }, meridiemParse: /রাত|সকাল|দুপুর|বিকাল|রাত/, meridiemHour: function(e, n) {
        return e === 12 && (e = 0), n === "রাত" && e >= 4 || n === "দুপুর" && e < 5 || n === "বিকাল" ? e + 12 : e;
      }, meridiem: function(e, n, d) {
        return e < 4 ? "রাত" : e < 10 ? "সকাল" : e < 17 ? "দুপুর" : e < 20 ? "বিকাল" : "রাত";
      }, week: { dow: 0, doy: 6 } });
      var uc = { 1: "༡", 2: "༢", 3: "༣", 4: "༤", 5: "༥", 6: "༦", 7: "༧", 8: "༨", 9: "༩", 0: "༠" }, mc = { "༡": "1", "༢": "2", "༣": "3", "༤": "4", "༥": "5", "༦": "6", "༧": "7", "༨": "8", "༩": "9", "༠": "0" };
      l.defineLocale("bo", { months: "ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ".split("_"), monthsShort: "ཟླ་1_ཟླ་2_ཟླ་3_ཟླ་4_ཟླ་5_ཟླ་6_ཟླ་7_ཟླ་8_ཟླ་9_ཟླ་10_ཟླ་11_ཟླ་12".split("_"), monthsShortRegex: /^(ཟླ་\d{1,2})/, monthsParseExact: true, weekdays: "གཟའ་ཉི་མ་_གཟའ་ཟླ་བ་_གཟའ་མིག་དམར་_གཟའ་ལྷག་པ་_གཟའ་ཕུར་བུ_གཟའ་པ་སངས་_གཟའ་སྤེན་པ་".split("_"), weekdaysShort: "ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་".split("_"), weekdaysMin: "ཉི_ཟླ_མིག_ལྷག_ཕུར_སངས_སྤེན".split("_"), longDateFormat: { LT: "A h:mm", LTS: "A h:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, A h:mm", LLLL: "dddd, D MMMM YYYY, A h:mm" }, calendar: { sameDay: "[དི་རིང] LT", nextDay: "[སང་ཉིན] LT", nextWeek: "[བདུན་ཕྲག་རྗེས་མ], LT", lastDay: "[ཁ་སང] LT", lastWeek: "[བདུན་ཕྲག་མཐའ་མ] dddd, LT", sameElse: "L" }, relativeTime: { future: "%s ལ་", past: "%s སྔན་ལ", s: "ལམ་སང", ss: "%d སྐར་ཆ།", m: "སྐར་མ་གཅིག", mm: "%d སྐར་མ", h: "ཆུ་ཚོད་གཅིག", hh: "%d ཆུ་ཚོད", d: "ཉིན་གཅིག", dd: "%d ཉིན་", M: "ཟླ་བ་གཅིག", MM: "%d ཟླ་བ", y: "ལོ་གཅིག", yy: "%d ལོ" }, preparse: function(e) {
        return e.replace(/[༡༢༣༤༥༦༧༨༩༠]/g, function(n) {
          return mc[n];
        });
      }, postformat: function(e) {
        return e.replace(/\d/g, function(n) {
          return uc[n];
        });
      }, meridiemParse: /མཚན་མོ|ཞོགས་ཀས|ཉིན་གུང|དགོང་དག|མཚན་མོ/, meridiemHour: function(e, n) {
        return e === 12 && (e = 0), n === "མཚན་མོ" && e >= 4 || n === "ཉིན་གུང" && e < 5 || n === "དགོང་དག" ? e + 12 : e;
      }, meridiem: function(e, n, d) {
        return e < 4 ? "མཚན་མོ" : e < 10 ? "ཞོགས་ཀས" : e < 17 ? "ཉིན་གུང" : e < 20 ? "དགོང་དག" : "མཚན་མོ";
      }, week: { dow: 0, doy: 6 } });
      function pt(e, n, d) {
        var u = { mm: "munutenn", MM: "miz", dd: "devezh" };
        return e + " " + zi(u[d], e);
      }
      function cc(e) {
        switch (Za(e)) {
          case 1:
          case 3:
          case 4:
          case 5:
          case 9:
            return e + " bloaz";
          default:
            return e + " vloaz";
        }
      }
      function Za(e) {
        return e > 9 ? Za(e % 10) : e;
      }
      function zi(e, n) {
        return n === 2 ? td(e) : e;
      }
      function td(e) {
        var n = { m: "v", b: "v", d: "z" };
        return n[e.charAt(0)] === void 0 ? e : n[e.charAt(0)] + e.substring(1);
      }
      var Vr = [/^gen/i, /^c[ʼ\']hwe/i, /^meu/i, /^ebr/i, /^mae/i, /^(mez|eve)/i, /^gou/i, /^eos/i, /^gwe/i, /^her/i, /^du/i, /^ker/i], yt = /^(genver|c[ʼ\']hwevrer|meurzh|ebrel|mae|mezheven|gouere|eost|gwengolo|here|du|kerzu|gen|c[ʼ\']hwe|meu|ebr|mae|eve|gou|eos|gwe|her|du|ker)/i, cn = /^(genver|c[ʼ\']hwevrer|meurzh|ebrel|mae|mezheven|gouere|eost|gwengolo|here|du|kerzu)/i, Bi = /^(gen|c[ʼ\']hwe|meu|ebr|mae|eve|gou|eos|gwe|her|du|ker)/i, sd = [/^sul/i, /^lun/i, /^meurzh/i, /^merc[ʼ\']her/i, /^yaou/i, /^gwener/i, /^sadorn/i], Kr = [/^Sul/i, /^Lun/i, /^Meu/i, /^Mer/i, /^Yao/i, /^Gwe/i, /^Sad/i], Wi = [/^Su/i, /^Lu/i, /^Me([^r]|$)/i, /^Mer/i, /^Ya/i, /^Gw/i, /^Sa/i];
      l.defineLocale("br", { months: "Genver_Cʼhwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu".split("_"), monthsShort: "Gen_Cʼhwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker".split("_"), weekdays: "Sul_Lun_Meurzh_Mercʼher_Yaou_Gwener_Sadorn".split("_"), weekdaysShort: "Sul_Lun_Meu_Mer_Yao_Gwe_Sad".split("_"), weekdaysMin: "Su_Lu_Me_Mer_Ya_Gw_Sa".split("_"), weekdaysParse: Wi, fullWeekdaysParse: sd, shortWeekdaysParse: Kr, minWeekdaysParse: Wi, monthsRegex: yt, monthsShortRegex: yt, monthsStrictRegex: cn, monthsShortStrictRegex: Bi, monthsParse: Vr, longMonthsParse: Vr, shortMonthsParse: Vr, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D [a viz] MMMM YYYY", LLL: "D [a viz] MMMM YYYY HH:mm", LLLL: "dddd, D [a viz] MMMM YYYY HH:mm" }, calendar: { sameDay: "[Hiziv da] LT", nextDay: "[Warcʼhoazh da] LT", nextWeek: "dddd [da] LT", lastDay: "[Decʼh da] LT", lastWeek: "dddd [paset da] LT", sameElse: "L" }, relativeTime: { future: "a-benn %s", past: "%s ʼzo", s: "un nebeud segondennoù", ss: "%d eilenn", m: "ur vunutenn", mm: pt, h: "un eur", hh: "%d eur", d: "un devezh", dd: pt, M: "ur miz", MM: pt, y: "ur bloaz", yy: cc }, dayOfMonthOrdinalParse: /\d{1,2}(añ|vet)/, ordinal: function(e) {
        var n = e === 1 ? "añ" : "vet";
        return e + n;
      }, week: { dow: 1, doy: 4 }, meridiemParse: /a.m.|g.m./, isPM: function(e) {
        return e === "g.m.";
      }, meridiem: function(e, n, d) {
        return e < 12 ? "a.m." : "g.m.";
      } });
      function $i(e, n, d, u) {
        switch (d) {
          case "m":
            return n ? "jedna minuta" : u ? "jednu minutu" : "jedne minute";
        }
      }
      function gn(e, n, d) {
        var u = e + " ";
        switch (d) {
          case "ss":
            return e === 1 ? u += "sekunda" : e === 2 || e === 3 || e === 4 ? u += "sekunde" : u += "sekundi", u;
          case "mm":
            return e === 1 ? u += "minuta" : e === 2 || e === 3 || e === 4 ? u += "minute" : u += "minuta", u;
          case "h":
            return "jedan sat";
          case "hh":
            return e === 1 ? u += "sat" : e === 2 || e === 3 || e === 4 ? u += "sata" : u += "sati", u;
          case "dd":
            return e === 1 ? u += "dan" : u += "dana", u;
          case "MM":
            return e === 1 ? u += "mjesec" : e === 2 || e === 3 || e === 4 ? u += "mjeseca" : u += "mjeseci", u;
          case "yy":
            return e === 1 ? u += "godina" : e === 2 || e === 3 || e === 4 ? u += "godine" : u += "godina", u;
        }
      }
      l.defineLocale("bs", { months: "januar_februar_mart_april_maj_juni_juli_august_septembar_oktobar_novembar_decembar".split("_"), monthsShort: "jan._feb._mar._apr._maj._jun._jul._aug._sep._okt._nov._dec.".split("_"), monthsParseExact: true, weekdays: "nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota".split("_"), weekdaysShort: "ned._pon._uto._sri._čet._pet._sub.".split("_"), weekdaysMin: "ne_po_ut_sr_če_pe_su".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY H:mm", LLLL: "dddd, D. MMMM YYYY H:mm" }, calendar: { sameDay: "[danas u] LT", nextDay: "[sutra u] LT", nextWeek: function() {
        switch (this.day()) {
          case 0:
            return "[u] [nedjelju] [u] LT";
          case 3:
            return "[u] [srijedu] [u] LT";
          case 6:
            return "[u] [subotu] [u] LT";
          case 1:
          case 2:
          case 4:
          case 5:
            return "[u] dddd [u] LT";
        }
      }, lastDay: "[jučer u] LT", lastWeek: function() {
        switch (this.day()) {
          case 0:
          case 3:
            return "[prošlu] dddd [u] LT";
          case 6:
            return "[prošle] [subote] [u] LT";
          case 1:
          case 2:
          case 4:
          case 5:
            return "[prošli] dddd [u] LT";
        }
      }, sameElse: "L" }, relativeTime: { future: "za %s", past: "prije %s", s: "par sekundi", ss: gn, m: $i, mm: gn, h: gn, hh: gn, d: "dan", dd: gn, M: "mjesec", MM: gn, y: "godinu", yy: gn }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 7 } });
      l.defineLocale("ca", { months: { standalone: "gener_febrer_març_abril_maig_juny_juliol_agost_setembre_octubre_novembre_desembre".split("_"), format: "de gener_de febrer_de març_d'abril_de maig_de juny_de juliol_d'agost_de setembre_d'octubre_de novembre_de desembre".split("_"), isFormat: /D[oD]?(\s)+MMMM/ }, monthsShort: "gen._febr._març_abr._maig_juny_jul._ag._set._oct._nov._des.".split("_"), monthsParseExact: true, weekdays: "diumenge_dilluns_dimarts_dimecres_dijous_divendres_dissabte".split("_"), weekdaysShort: "dg._dl._dt._dc._dj._dv._ds.".split("_"), weekdaysMin: "dg_dl_dt_dc_dj_dv_ds".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM [de] YYYY", ll: "D MMM YYYY", LLL: "D MMMM [de] YYYY [a les] H:mm", lll: "D MMM YYYY, H:mm", LLLL: "dddd D MMMM [de] YYYY [a les] H:mm", llll: "ddd D MMM YYYY, H:mm" }, calendar: { sameDay: function() {
        return "[avui a " + (this.hours() !== 1 ? "les" : "la") + "] LT";
      }, nextDay: function() {
        return "[demà a " + (this.hours() !== 1 ? "les" : "la") + "] LT";
      }, nextWeek: function() {
        return "dddd [a " + (this.hours() !== 1 ? "les" : "la") + "] LT";
      }, lastDay: function() {
        return "[ahir a " + (this.hours() !== 1 ? "les" : "la") + "] LT";
      }, lastWeek: function() {
        return "[el] dddd [passat a " + (this.hours() !== 1 ? "les" : "la") + "] LT";
      }, sameElse: "L" }, relativeTime: { future: "d'aquí %s", past: "fa %s", s: "uns segons", ss: "%d segons", m: "un minut", mm: "%d minuts", h: "una hora", hh: "%d hores", d: "un dia", dd: "%d dies", M: "un mes", MM: "%d mesos", y: "un any", yy: "%d anys" }, dayOfMonthOrdinalParse: /\d{1,2}(r|n|t|è|a)/, ordinal: function(e, n) {
        var d = e === 1 ? "r" : e === 2 ? "n" : e === 3 ? "r" : e === 4 ? "t" : "è";
        return (n === "w" || n === "W") && (d = "a"), e + d;
      }, week: { dow: 1, doy: 4 } });
      var Gi = { standalone: "leden_únor_březen_duben_květen_červen_červenec_srpen_září_říjen_listopad_prosinec".split("_"), format: "ledna_února_března_dubna_května_června_července_srpna_září_října_listopadu_prosince".split("_"), isFormat: /DD?[o.]?(\[[^\[\]]*\]|\s)+MMMM/ }, Ji = "led_úno_bře_dub_kvě_čvn_čvc_srp_zář_říj_lis_pro".split("_"), vs = [/^led/i, /^úno/i, /^bře/i, /^dub/i, /^kvě/i, /^(čvn|červen$|června)/i, /^(čvc|červenec|července)/i, /^srp/i, /^zář/i, /^říj/i, /^lis/i, /^pro/i], nd = /^(leden|únor|březen|duben|květen|červenec|července|červen|června|srpen|září|říjen|listopad|prosinec|led|úno|bře|dub|kvě|čvn|čvc|srp|zář|říj|lis|pro)/i;
      function At(e) {
        return e > 1 && e < 5 && ~~(e / 10) !== 1;
      }
      function Et(e, n, d, u) {
        var f = e + " ";
        switch (d) {
          case "s":
            return n || u ? "pár sekund" : "pár sekundami";
          case "ss":
            return n || u ? f + (At(e) ? "sekundy" : "sekund") : f + "sekundami";
          case "m":
            return n ? "minuta" : u ? "minutu" : "minutou";
          case "mm":
            return n || u ? f + (At(e) ? "minuty" : "minut") : f + "minutami";
          case "h":
            return n ? "hodina" : u ? "hodinu" : "hodinou";
          case "hh":
            return n || u ? f + (At(e) ? "hodiny" : "hodin") : f + "hodinami";
          case "d":
            return n || u ? "den" : "dnem";
          case "dd":
            return n || u ? f + (At(e) ? "dny" : "dní") : f + "dny";
          case "M":
            return n || u ? "měsíc" : "měsícem";
          case "MM":
            return n || u ? f + (At(e) ? "měsíce" : "měsíců") : f + "měsíci";
          case "y":
            return n || u ? "rok" : "rokem";
          case "yy":
            return n || u ? f + (At(e) ? "roky" : "let") : f + "lety";
        }
      }
      l.defineLocale("cs", { months: Gi, monthsShort: Ji, monthsRegex: nd, monthsShortRegex: nd, monthsStrictRegex: /^(leden|ledna|února|únor|březen|března|duben|dubna|květen|května|červenec|července|červen|června|srpen|srpna|září|říjen|října|listopadu|listopad|prosinec|prosince)/i, monthsShortStrictRegex: /^(led|úno|bře|dub|kvě|čvn|čvc|srp|zář|říj|lis|pro)/i, monthsParse: vs, longMonthsParse: vs, shortMonthsParse: vs, weekdays: "neděle_pondělí_úterý_středa_čtvrtek_pátek_sobota".split("_"), weekdaysShort: "ne_po_út_st_čt_pá_so".split("_"), weekdaysMin: "ne_po_út_st_čt_pá_so".split("_"), longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY H:mm", LLLL: "dddd D. MMMM YYYY H:mm", l: "D. M. YYYY" }, calendar: { sameDay: "[dnes v] LT", nextDay: "[zítra v] LT", nextWeek: function() {
        switch (this.day()) {
          case 0:
            return "[v neděli v] LT";
          case 1:
          case 2:
            return "[v] dddd [v] LT";
          case 3:
            return "[ve středu v] LT";
          case 4:
            return "[ve čtvrtek v] LT";
          case 5:
            return "[v pátek v] LT";
          case 6:
            return "[v sobotu v] LT";
        }
      }, lastDay: "[včera v] LT", lastWeek: function() {
        switch (this.day()) {
          case 0:
            return "[minulou neděli v] LT";
          case 1:
          case 2:
            return "[minulé] dddd [v] LT";
          case 3:
            return "[minulou středu v] LT";
          case 4:
          case 5:
            return "[minulý] dddd [v] LT";
          case 6:
            return "[minulou sobotu v] LT";
        }
      }, sameElse: "L" }, relativeTime: { future: "za %s", past: "před %s", s: Et, ss: Et, m: Et, mm: Et, h: Et, hh: Et, d: Et, dd: Et, M: Et, MM: Et, y: Et, yy: Et }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } });
      l.defineLocale("cv", { months: "кӑрлач_нарӑс_пуш_ака_май_ҫӗртме_утӑ_ҫурла_авӑн_юпа_чӳк_раштав".split("_"), monthsShort: "кӑр_нар_пуш_ака_май_ҫӗр_утӑ_ҫур_авн_юпа_чӳк_раш".split("_"), weekdays: "вырсарникун_тунтикун_ытларикун_юнкун_кӗҫнерникун_эрнекун_шӑматкун".split("_"), weekdaysShort: "выр_тун_ытл_юн_кӗҫ_эрн_шӑм".split("_"), weekdaysMin: "вр_тн_ыт_юн_кҫ_эр_шм".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD-MM-YYYY", LL: "YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ]", LLL: "YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm", LLLL: "dddd, YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm" }, calendar: { sameDay: "[Паян] LT [сехетре]", nextDay: "[Ыран] LT [сехетре]", lastDay: "[Ӗнер] LT [сехетре]", nextWeek: "[Ҫитес] dddd LT [сехетре]", lastWeek: "[Иртнӗ] dddd LT [сехетре]", sameElse: "L" }, relativeTime: { future: function(e) {
        var n = /сехет$/i.exec(e) ? "рен" : /ҫул$/i.exec(e) ? "тан" : "ран";
        return e + n;
      }, past: "%s каялла", s: "пӗр-ик ҫеккунт", ss: "%d ҫеккунт", m: "пӗр минут", mm: "%d минут", h: "пӗр сехет", hh: "%d сехет", d: "пӗр кун", dd: "%d кун", M: "пӗр уйӑх", MM: "%d уйӑх", y: "пӗр ҫул", yy: "%d ҫул" }, dayOfMonthOrdinalParse: /\d{1,2}-мӗш/, ordinal: "%d-мӗш", week: { dow: 1, doy: 7 } });
      l.defineLocale("cy", { months: "Ionawr_Chwefror_Mawrth_Ebrill_Mai_Mehefin_Gorffennaf_Awst_Medi_Hydref_Tachwedd_Rhagfyr".split("_"), monthsShort: "Ion_Chwe_Maw_Ebr_Mai_Meh_Gor_Aws_Med_Hyd_Tach_Rhag".split("_"), weekdays: "Dydd Sul_Dydd Llun_Dydd Mawrth_Dydd Mercher_Dydd Iau_Dydd Gwener_Dydd Sadwrn".split("_"), weekdaysShort: "Sul_Llun_Maw_Mer_Iau_Gwe_Sad".split("_"), weekdaysMin: "Su_Ll_Ma_Me_Ia_Gw_Sa".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[Heddiw am] LT", nextDay: "[Yfory am] LT", nextWeek: "dddd [am] LT", lastDay: "[Ddoe am] LT", lastWeek: "dddd [diwethaf am] LT", sameElse: "L" }, relativeTime: { future: "mewn %s", past: "%s yn ôl", s: "ychydig eiliadau", ss: "%d eiliad", m: "munud", mm: "%d munud", h: "awr", hh: "%d awr", d: "diwrnod", dd: "%d diwrnod", M: "mis", MM: "%d mis", y: "blwyddyn", yy: "%d flynedd" }, dayOfMonthOrdinalParse: /\d{1,2}(fed|ain|af|il|ydd|ed|eg)/, ordinal: function(e) {
        var n = e, d = "", u = ["", "af", "il", "ydd", "ydd", "ed", "ed", "ed", "fed", "fed", "fed", "eg", "fed", "eg", "eg", "fed", "eg", "eg", "fed", "eg", "fed"];
        return n > 20 ? n === 40 || n === 50 || n === 60 || n === 80 || n === 100 ? d = "fed" : d = "ain" : n > 0 && (d = u[n]), e + d;
      }, week: { dow: 1, doy: 4 } });
      l.defineLocale("da", { months: "januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december".split("_"), monthsShort: "jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"), weekdays: "søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"), weekdaysShort: "søn_man_tir_ons_tor_fre_lør".split("_"), weekdaysMin: "sø_ma_ti_on_to_fr_lø".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY HH:mm", LLLL: "dddd [d.] D. MMMM YYYY [kl.] HH:mm" }, calendar: { sameDay: "[i dag kl.] LT", nextDay: "[i morgen kl.] LT", nextWeek: "på dddd [kl.] LT", lastDay: "[i går kl.] LT", lastWeek: "[i] dddd[s kl.] LT", sameElse: "L" }, relativeTime: { future: "om %s", past: "%s siden", s: "få sekunder", ss: "%d sekunder", m: "et minut", mm: "%d minutter", h: "en time", hh: "%d timer", d: "en dag", dd: "%d dage", M: "en måned", MM: "%d måneder", y: "et år", yy: "%d år" }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } });
      function Ms(e, n, d, u) {
        var f = { m: ["eine Minute", "einer Minute"], h: ["eine Stunde", "einer Stunde"], d: ["ein Tag", "einem Tag"], dd: [e + " Tage", e + " Tagen"], w: ["eine Woche", "einer Woche"], M: ["ein Monat", "einem Monat"], MM: [e + " Monate", e + " Monaten"], y: ["ein Jahr", "einem Jahr"], yy: [e + " Jahre", e + " Jahren"] };
        return n ? f[d][0] : f[d][1];
      }
      l.defineLocale("de-at", { months: "Jänner_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"), monthsShort: "Jän._Feb._März_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.".split("_"), monthsParseExact: true, weekdays: "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"), weekdaysShort: "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"), weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY HH:mm", LLLL: "dddd, D. MMMM YYYY HH:mm" }, calendar: { sameDay: "[heute um] LT [Uhr]", sameElse: "L", nextDay: "[morgen um] LT [Uhr]", nextWeek: "dddd [um] LT [Uhr]", lastDay: "[gestern um] LT [Uhr]", lastWeek: "[letzten] dddd [um] LT [Uhr]" }, relativeTime: { future: "in %s", past: "vor %s", s: "ein paar Sekunden", ss: "%d Sekunden", m: Ms, mm: "%d Minuten", h: Ms, hh: "%d Stunden", d: Ms, dd: Ms, w: Ms, ww: "%d Wochen", M: Ms, MM: Ms, y: Ms, yy: Ms }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } });
      function rs(e, n, d, u) {
        var f = { m: ["eine Minute", "einer Minute"], h: ["eine Stunde", "einer Stunde"], d: ["ein Tag", "einem Tag"], dd: [e + " Tage", e + " Tagen"], w: ["eine Woche", "einer Woche"], M: ["ein Monat", "einem Monat"], MM: [e + " Monate", e + " Monaten"], y: ["ein Jahr", "einem Jahr"], yy: [e + " Jahre", e + " Jahren"] };
        return n ? f[d][0] : f[d][1];
      }
      l.defineLocale("de-ch", { months: "Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"), monthsShort: "Jan._Feb._März_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.".split("_"), monthsParseExact: true, weekdays: "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"), weekdaysShort: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"), weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY HH:mm", LLLL: "dddd, D. MMMM YYYY HH:mm" }, calendar: { sameDay: "[heute um] LT [Uhr]", sameElse: "L", nextDay: "[morgen um] LT [Uhr]", nextWeek: "dddd [um] LT [Uhr]", lastDay: "[gestern um] LT [Uhr]", lastWeek: "[letzten] dddd [um] LT [Uhr]" }, relativeTime: { future: "in %s", past: "vor %s", s: "ein paar Sekunden", ss: "%d Sekunden", m: rs, mm: "%d Minuten", h: rs, hh: "%d Stunden", d: rs, dd: rs, w: rs, ww: "%d Wochen", M: rs, MM: rs, y: rs, yy: rs }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } });
      function Us(e, n, d, u) {
        var f = { m: ["eine Minute", "einer Minute"], h: ["eine Stunde", "einer Stunde"], d: ["ein Tag", "einem Tag"], dd: [e + " Tage", e + " Tagen"], w: ["eine Woche", "einer Woche"], M: ["ein Monat", "einem Monat"], MM: [e + " Monate", e + " Monaten"], y: ["ein Jahr", "einem Jahr"], yy: [e + " Jahre", e + " Jahren"] };
        return n ? f[d][0] : f[d][1];
      }
      l.defineLocale("de", { months: "Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"), monthsShort: "Jan._Feb._März_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.".split("_"), monthsParseExact: true, weekdays: "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"), weekdaysShort: "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"), weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY HH:mm", LLLL: "dddd, D. MMMM YYYY HH:mm" }, calendar: { sameDay: "[heute um] LT [Uhr]", sameElse: "L", nextDay: "[morgen um] LT [Uhr]", nextWeek: "dddd [um] LT [Uhr]", lastDay: "[gestern um] LT [Uhr]", lastWeek: "[letzten] dddd [um] LT [Uhr]" }, relativeTime: { future: "in %s", past: "vor %s", s: "ein paar Sekunden", ss: "%d Sekunden", m: Us, mm: "%d Minuten", h: Us, hh: "%d Stunden", d: Us, dd: Us, w: Us, ww: "%d Wochen", M: Us, MM: Us, y: Us, yy: Us }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } });
      var ad = ["ޖެނުއަރީ", "ފެބްރުއަރީ", "މާރިޗު", "އޭޕްރީލު", "މޭ", "ޖޫން", "ޖުލައި", "އޯގަސްޓު", "ސެޕްޓެމްބަރު", "އޮކްޓޯބަރު", "ނޮވެމްބަރު", "ޑިސެމްބަރު"], rd = ["އާދިއްތަ", "ހޯމަ", "އަންގާރަ", "ބުދަ", "ބުރާސްފަތި", "ހުކުރު", "ހޮނިހިރު"];
      l.defineLocale("dv", { months: ad, monthsShort: ad, weekdays: rd, weekdaysShort: rd, weekdaysMin: "އާދި_ހޯމަ_އަން_ބުދަ_ބުރާ_ހުކު_ހޮނި".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "D/M/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, meridiemParse: /މކ|މފ/, isPM: function(e) {
        return e === "މފ";
      }, meridiem: function(e, n, d) {
        return e < 12 ? "މކ" : "މފ";
      }, calendar: { sameDay: "[މިއަދު] LT", nextDay: "[މާދަމާ] LT", nextWeek: "dddd LT", lastDay: "[އިއްޔެ] LT", lastWeek: "[ފާއިތުވި] dddd LT", sameElse: "L" }, relativeTime: { future: "ތެރޭގައި %s", past: "ކުރިން %s", s: "ސިކުންތުކޮޅެއް", ss: "d% ސިކުންތު", m: "މިނިޓެއް", mm: "މިނިޓު %d", h: "ގަޑިއިރެއް", hh: "ގަޑިއިރު %d", d: "ދުވަހެއް", dd: "ދުވަސް %d", M: "މަހެއް", MM: "މަސް %d", y: "އަހަރެއް", yy: "އަހަރު %d" }, preparse: function(e) {
        return e.replace(/،/g, ",");
      }, postformat: function(e) {
        return e.replace(/,/g, "،");
      }, week: { dow: 7, doy: 12 } });
      function id(e) {
        return typeof Function < "u" && e instanceof Function || Object.prototype.toString.call(e) === "[object Function]";
      }
      l.defineLocale("el", { monthsNominativeEl: "Ιανουάριος_Φεβρουάριος_Μάρτιος_Απρίλιος_Μάιος_Ιούνιος_Ιούλιος_Αύγουστος_Σεπτέμβριος_Οκτώβριος_Νοέμβριος_Δεκέμβριος".split("_"), monthsGenitiveEl: "Ιανουαρίου_Φεβρουαρίου_Μαρτίου_Απριλίου_Μαΐου_Ιουνίου_Ιουλίου_Αυγούστου_Σεπτεμβρίου_Οκτωβρίου_Νοεμβρίου_Δεκεμβρίου".split("_"), months: function(e, n) {
        return e ? typeof n == "string" && /D/.test(n.substring(0, n.indexOf("MMMM"))) ? this._monthsGenitiveEl[e.month()] : this._monthsNominativeEl[e.month()] : this._monthsNominativeEl;
      }, monthsShort: "Ιαν_Φεβ_Μαρ_Απρ_Μαϊ_Ιουν_Ιουλ_Αυγ_Σεπ_Οκτ_Νοε_Δεκ".split("_"), weekdays: "Κυριακή_Δευτέρα_Τρίτη_Τετάρτη_Πέμπτη_Παρασκευή_Σάββατο".split("_"), weekdaysShort: "Κυρ_Δευ_Τρι_Τετ_Πεμ_Παρ_Σαβ".split("_"), weekdaysMin: "Κυ_Δε_Τρ_Τε_Πε_Πα_Σα".split("_"), meridiem: function(e, n, d) {
        return e > 11 ? d ? "μμ" : "ΜΜ" : d ? "πμ" : "ΠΜ";
      }, isPM: function(e) {
        return (e + "").toLowerCase()[0] === "μ";
      }, meridiemParse: /[ΠΜ]\.?Μ?\.?/i, longDateFormat: { LT: "h:mm A", LTS: "h:mm:ss A", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY h:mm A", LLLL: "dddd, D MMMM YYYY h:mm A" }, calendarEl: { sameDay: "[Σήμερα {}] LT", nextDay: "[Αύριο {}] LT", nextWeek: "dddd [{}] LT", lastDay: "[Χθες {}] LT", lastWeek: function() {
        switch (this.day()) {
          case 6:
            return "[το προηγούμενο] dddd [{}] LT";
          default:
            return "[την προηγούμενη] dddd [{}] LT";
        }
      }, sameElse: "L" }, calendar: function(e, n) {
        var d = this._calendarEl[e], u = n && n.hours();
        return id(d) && (d = d.apply(n)), d.replace("{}", u % 12 === 1 ? "στη" : "στις");
      }, relativeTime: { future: "σε %s", past: "%s πριν", s: "λίγα δευτερόλεπτα", ss: "%d δευτερόλεπτα", m: "ένα λεπτό", mm: "%d λεπτά", h: "μία ώρα", hh: "%d ώρες", d: "μία μέρα", dd: "%d μέρες", M: "ένας μήνας", MM: "%d μήνες", y: "ένας χρόνος", yy: "%d χρόνια" }, dayOfMonthOrdinalParse: /\d{1,2}η/, ordinal: "%dη", week: { dow: 1, doy: 4 } });
      l.defineLocale("en-au", { months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), longDateFormat: { LT: "h:mm A", LTS: "h:mm:ss A", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY h:mm A", LLLL: "dddd, D MMMM YYYY h:mm A" }, calendar: { sameDay: "[Today at] LT", nextDay: "[Tomorrow at] LT", nextWeek: "dddd [at] LT", lastDay: "[Yesterday at] LT", lastWeek: "[Last] dddd [at] LT", sameElse: "L" }, relativeTime: { future: "in %s", past: "%s ago", s: "a few seconds", ss: "%d seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" }, dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/, ordinal: function(e) {
        var n = e % 10, d = ~~(e % 100 / 10) === 1 ? "th" : n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th";
        return e + d;
      }, week: { dow: 0, doy: 4 } });
      l.defineLocale("en-ca", { months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), longDateFormat: { LT: "h:mm A", LTS: "h:mm:ss A", L: "YYYY-MM-DD", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, calendar: { sameDay: "[Today at] LT", nextDay: "[Tomorrow at] LT", nextWeek: "dddd [at] LT", lastDay: "[Yesterday at] LT", lastWeek: "[Last] dddd [at] LT", sameElse: "L" }, relativeTime: { future: "in %s", past: "%s ago", s: "a few seconds", ss: "%d seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" }, dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/, ordinal: function(e) {
        var n = e % 10, d = ~~(e % 100 / 10) === 1 ? "th" : n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th";
        return e + d;
      } });
      l.defineLocale("en-gb", { months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[Today at] LT", nextDay: "[Tomorrow at] LT", nextWeek: "dddd [at] LT", lastDay: "[Yesterday at] LT", lastWeek: "[Last] dddd [at] LT", sameElse: "L" }, relativeTime: { future: "in %s", past: "%s ago", s: "a few seconds", ss: "%d seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" }, dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/, ordinal: function(e) {
        var n = e % 10, d = ~~(e % 100 / 10) === 1 ? "th" : n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th";
        return e + d;
      }, week: { dow: 1, doy: 4 } });
      l.defineLocale("en-ie", { months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, calendar: { sameDay: "[Today at] LT", nextDay: "[Tomorrow at] LT", nextWeek: "dddd [at] LT", lastDay: "[Yesterday at] LT", lastWeek: "[Last] dddd [at] LT", sameElse: "L" }, relativeTime: { future: "in %s", past: "%s ago", s: "a few seconds", ss: "%d seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" }, dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/, ordinal: function(e) {
        var n = e % 10, d = ~~(e % 100 / 10) === 1 ? "th" : n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th";
        return e + d;
      }, week: { dow: 1, doy: 4 } });
      l.defineLocale("en-il", { months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[Today at] LT", nextDay: "[Tomorrow at] LT", nextWeek: "dddd [at] LT", lastDay: "[Yesterday at] LT", lastWeek: "[Last] dddd [at] LT", sameElse: "L" }, relativeTime: { future: "in %s", past: "%s ago", s: "a few seconds", ss: "%d seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" }, dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/, ordinal: function(e) {
        var n = e % 10, d = ~~(e % 100 / 10) === 1 ? "th" : n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th";
        return e + d;
      } });
      l.defineLocale("en-in", { months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), longDateFormat: { LT: "h:mm A", LTS: "h:mm:ss A", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY h:mm A", LLLL: "dddd, D MMMM YYYY h:mm A" }, calendar: { sameDay: "[Today at] LT", nextDay: "[Tomorrow at] LT", nextWeek: "dddd [at] LT", lastDay: "[Yesterday at] LT", lastWeek: "[Last] dddd [at] LT", sameElse: "L" }, relativeTime: { future: "in %s", past: "%s ago", s: "a few seconds", ss: "%d seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" }, dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/, ordinal: function(e) {
        var n = e % 10, d = ~~(e % 100 / 10) === 1 ? "th" : n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th";
        return e + d;
      }, week: { dow: 0, doy: 6 } });
      l.defineLocale("en-nz", { months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), longDateFormat: { LT: "h:mm A", LTS: "h:mm:ss A", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY h:mm A", LLLL: "dddd, D MMMM YYYY h:mm A" }, calendar: { sameDay: "[Today at] LT", nextDay: "[Tomorrow at] LT", nextWeek: "dddd [at] LT", lastDay: "[Yesterday at] LT", lastWeek: "[Last] dddd [at] LT", sameElse: "L" }, relativeTime: { future: "in %s", past: "%s ago", s: "a few seconds", ss: "%d seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" }, dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/, ordinal: function(e) {
        var n = e % 10, d = ~~(e % 100 / 10) === 1 ? "th" : n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th";
        return e + d;
      }, week: { dow: 1, doy: 4 } });
      l.defineLocale("en-sg", { months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[Today at] LT", nextDay: "[Tomorrow at] LT", nextWeek: "dddd [at] LT", lastDay: "[Yesterday at] LT", lastWeek: "[Last] dddd [at] LT", sameElse: "L" }, relativeTime: { future: "in %s", past: "%s ago", s: "a few seconds", ss: "%d seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" }, dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/, ordinal: function(e) {
        var n = e % 10, d = ~~(e % 100 / 10) === 1 ? "th" : n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th";
        return e + d;
      }, week: { dow: 1, doy: 4 } });
      l.defineLocale("eo", { months: "januaro_februaro_marto_aprilo_majo_junio_julio_aŭgusto_septembro_oktobro_novembro_decembro".split("_"), monthsShort: "jan_feb_mart_apr_maj_jun_jul_aŭg_sept_okt_nov_dec".split("_"), weekdays: "dimanĉo_lundo_mardo_merkredo_ĵaŭdo_vendredo_sabato".split("_"), weekdaysShort: "dim_lun_mard_merk_ĵaŭ_ven_sab".split("_"), weekdaysMin: "di_lu_ma_me_ĵa_ve_sa".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY-MM-DD", LL: "[la] D[-an de] MMMM, YYYY", LLL: "[la] D[-an de] MMMM, YYYY HH:mm", LLLL: "dddd[n], [la] D[-an de] MMMM, YYYY HH:mm", llll: "ddd, [la] D[-an de] MMM, YYYY HH:mm" }, meridiemParse: /[ap]\.t\.m/i, isPM: function(e) {
        return e.charAt(0).toLowerCase() === "p";
      }, meridiem: function(e, n, d) {
        return e > 11 ? d ? "p.t.m." : "P.T.M." : d ? "a.t.m." : "A.T.M.";
      }, calendar: { sameDay: "[Hodiaŭ je] LT", nextDay: "[Morgaŭ je] LT", nextWeek: "dddd[n je] LT", lastDay: "[Hieraŭ je] LT", lastWeek: "[pasintan] dddd[n je] LT", sameElse: "L" }, relativeTime: { future: "post %s", past: "antaŭ %s", s: "kelkaj sekundoj", ss: "%d sekundoj", m: "unu minuto", mm: "%d minutoj", h: "unu horo", hh: "%d horoj", d: "unu tago", dd: "%d tagoj", M: "unu monato", MM: "%d monatoj", y: "unu jaro", yy: "%d jaroj" }, dayOfMonthOrdinalParse: /\d{1,2}a/, ordinal: "%da", week: { dow: 1, doy: 7 } });
      var Vi = "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"), gc = "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"), Zr = [/^ene/i, /^feb/i, /^mar/i, /^abr/i, /^may/i, /^jun/i, /^jul/i, /^ago/i, /^sep/i, /^oct/i, /^nov/i, /^dic/i], Ki = /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i;
      l.defineLocale("es-do", { months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"), monthsShort: function(e, n) {
        return e ? /-MMM-/.test(n) ? gc[e.month()] : Vi[e.month()] : Vi;
      }, monthsRegex: Ki, monthsShortRegex: Ki, monthsStrictRegex: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i, monthsShortStrictRegex: /^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i, monthsParse: Zr, longMonthsParse: Zr, shortMonthsParse: Zr, weekdays: "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"), weekdaysShort: "dom._lun._mar._mié._jue._vie._sáb.".split("_"), weekdaysMin: "do_lu_ma_mi_ju_vi_sá".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "h:mm A", LTS: "h:mm:ss A", L: "DD/MM/YYYY", LL: "D [de] MMMM [de] YYYY", LLL: "D [de] MMMM [de] YYYY h:mm A", LLLL: "dddd, D [de] MMMM [de] YYYY h:mm A" }, calendar: { sameDay: function() {
        return "[hoy a la" + (this.hours() !== 1 ? "s" : "") + "] LT";
      }, nextDay: function() {
        return "[mañana a la" + (this.hours() !== 1 ? "s" : "") + "] LT";
      }, nextWeek: function() {
        return "dddd [a la" + (this.hours() !== 1 ? "s" : "") + "] LT";
      }, lastDay: function() {
        return "[ayer a la" + (this.hours() !== 1 ? "s" : "") + "] LT";
      }, lastWeek: function() {
        return "[el] dddd [pasado a la" + (this.hours() !== 1 ? "s" : "") + "] LT";
      }, sameElse: "L" }, relativeTime: { future: "en %s", past: "hace %s", s: "unos segundos", ss: "%d segundos", m: "un minuto", mm: "%d minutos", h: "una hora", hh: "%d horas", d: "un día", dd: "%d días", w: "una semana", ww: "%d semanas", M: "un mes", MM: "%d meses", y: "un año", yy: "%d años" }, dayOfMonthOrdinalParse: /\d{1,2}º/, ordinal: "%dº", week: { dow: 1, doy: 4 } });
      var ct = "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"), Ls = "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"), Zi = [/^ene/i, /^feb/i, /^mar/i, /^abr/i, /^may/i, /^jun/i, /^jul/i, /^ago/i, /^sep/i, /^oct/i, /^nov/i, /^dic/i], od = /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i;
      l.defineLocale("es-mx", { months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"), monthsShort: function(e, n) {
        return e ? /-MMM-/.test(n) ? Ls[e.month()] : ct[e.month()] : ct;
      }, monthsRegex: od, monthsShortRegex: od, monthsStrictRegex: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i, monthsShortStrictRegex: /^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i, monthsParse: Zi, longMonthsParse: Zi, shortMonthsParse: Zi, weekdays: "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"), weekdaysShort: "dom._lun._mar._mié._jue._vie._sáb.".split("_"), weekdaysMin: "do_lu_ma_mi_ju_vi_sá".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "DD/MM/YYYY", LL: "D [de] MMMM [de] YYYY", LLL: "D [de] MMMM [de] YYYY H:mm", LLLL: "dddd, D [de] MMMM [de] YYYY H:mm" }, calendar: { sameDay: function() {
        return "[hoy a la" + (this.hours() !== 1 ? "s" : "") + "] LT";
      }, nextDay: function() {
        return "[mañana a la" + (this.hours() !== 1 ? "s" : "") + "] LT";
      }, nextWeek: function() {
        return "dddd [a la" + (this.hours() !== 1 ? "s" : "") + "] LT";
      }, lastDay: function() {
        return "[ayer a la" + (this.hours() !== 1 ? "s" : "") + "] LT";
      }, lastWeek: function() {
        return "[el] dddd [pasado a la" + (this.hours() !== 1 ? "s" : "") + "] LT";
      }, sameElse: "L" }, relativeTime: { future: "en %s", past: "hace %s", s: "unos segundos", ss: "%d segundos", m: "un minuto", mm: "%d minutos", h: "una hora", hh: "%d horas", d: "un día", dd: "%d días", w: "una semana", ww: "%d semanas", M: "un mes", MM: "%d meses", y: "un año", yy: "%d años" }, dayOfMonthOrdinalParse: /\d{1,2}º/, ordinal: "%dº", week: { dow: 0, doy: 4 }, invalidDate: "Fecha inválida" });
      var Qa = "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"), fa = "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"), Qr = [/^ene/i, /^feb/i, /^mar/i, /^abr/i, /^may/i, /^jun/i, /^jul/i, /^ago/i, /^sep/i, /^oct/i, /^nov/i, /^dic/i], Qi = /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i;
      l.defineLocale("es-us", { months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"), monthsShort: function(e, n) {
        return e ? /-MMM-/.test(n) ? fa[e.month()] : Qa[e.month()] : Qa;
      }, monthsRegex: Qi, monthsShortRegex: Qi, monthsStrictRegex: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i, monthsShortStrictRegex: /^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i, monthsParse: Qr, longMonthsParse: Qr, shortMonthsParse: Qr, weekdays: "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"), weekdaysShort: "dom._lun._mar._mié._jue._vie._sáb.".split("_"), weekdaysMin: "do_lu_ma_mi_ju_vi_sá".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "h:mm A", LTS: "h:mm:ss A", L: "MM/DD/YYYY", LL: "D [de] MMMM [de] YYYY", LLL: "D [de] MMMM [de] YYYY h:mm A", LLLL: "dddd, D [de] MMMM [de] YYYY h:mm A" }, calendar: { sameDay: function() {
        return "[hoy a la" + (this.hours() !== 1 ? "s" : "") + "] LT";
      }, nextDay: function() {
        return "[mañana a la" + (this.hours() !== 1 ? "s" : "") + "] LT";
      }, nextWeek: function() {
        return "dddd [a la" + (this.hours() !== 1 ? "s" : "") + "] LT";
      }, lastDay: function() {
        return "[ayer a la" + (this.hours() !== 1 ? "s" : "") + "] LT";
      }, lastWeek: function() {
        return "[el] dddd [pasado a la" + (this.hours() !== 1 ? "s" : "") + "] LT";
      }, sameElse: "L" }, relativeTime: { future: "en %s", past: "hace %s", s: "unos segundos", ss: "%d segundos", m: "un minuto", mm: "%d minutos", h: "una hora", hh: "%d horas", d: "un día", dd: "%d días", w: "una semana", ww: "%d semanas", M: "un mes", MM: "%d meses", y: "un año", yy: "%d años" }, dayOfMonthOrdinalParse: /\d{1,2}º/, ordinal: "%dº", week: { dow: 0, doy: 6 } });
      var ld = "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"), dd = "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"), hn = [/^ene/i, /^feb/i, /^mar/i, /^abr/i, /^may/i, /^jun/i, /^jul/i, /^ago/i, /^sep/i, /^oct/i, /^nov/i, /^dic/i], _a = /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i;
      l.defineLocale("es", { months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"), monthsShort: function(e, n) {
        return e ? /-MMM-/.test(n) ? dd[e.month()] : ld[e.month()] : ld;
      }, monthsRegex: _a, monthsShortRegex: _a, monthsStrictRegex: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i, monthsShortStrictRegex: /^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i, monthsParse: hn, longMonthsParse: hn, shortMonthsParse: hn, weekdays: "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"), weekdaysShort: "dom._lun._mar._mié._jue._vie._sáb.".split("_"), weekdaysMin: "do_lu_ma_mi_ju_vi_sá".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "DD/MM/YYYY", LL: "D [de] MMMM [de] YYYY", LLL: "D [de] MMMM [de] YYYY H:mm", LLLL: "dddd, D [de] MMMM [de] YYYY H:mm" }, calendar: { sameDay: function() {
        return "[hoy a la" + (this.hours() !== 1 ? "s" : "") + "] LT";
      }, nextDay: function() {
        return "[mañana a la" + (this.hours() !== 1 ? "s" : "") + "] LT";
      }, nextWeek: function() {
        return "dddd [a la" + (this.hours() !== 1 ? "s" : "") + "] LT";
      }, lastDay: function() {
        return "[ayer a la" + (this.hours() !== 1 ? "s" : "") + "] LT";
      }, lastWeek: function() {
        return "[el] dddd [pasado a la" + (this.hours() !== 1 ? "s" : "") + "] LT";
      }, sameElse: "L" }, relativeTime: { future: "en %s", past: "hace %s", s: "unos segundos", ss: "%d segundos", m: "un minuto", mm: "%d minutos", h: "una hora", hh: "%d horas", d: "un día", dd: "%d días", w: "una semana", ww: "%d semanas", M: "un mes", MM: "%d meses", y: "un año", yy: "%d años" }, dayOfMonthOrdinalParse: /\d{1,2}º/, ordinal: "%dº", week: { dow: 1, doy: 4 }, invalidDate: "Fecha inválida" });
      function is(e, n, d, u) {
        var f = { s: ["mõne sekundi", "mõni sekund", "paar sekundit"], ss: [e + "sekundi", e + "sekundit"], m: ["ühe minuti", "üks minut"], mm: [e + " minuti", e + " minutit"], h: ["ühe tunni", "tund aega", "üks tund"], hh: [e + " tunni", e + " tundi"], d: ["ühe päeva", "üks päev"], M: ["kuu aja", "kuu aega", "üks kuu"], MM: [e + " kuu", e + " kuud"], y: ["ühe aasta", "aasta", "üks aasta"], yy: [e + " aasta", e + " aastat"] };
        return n ? f[d][2] ? f[d][2] : f[d][1] : u ? f[d][0] : f[d][1];
      }
      l.defineLocale("et", { months: "jaanuar_veebruar_märts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember".split("_"), monthsShort: "jaan_veebr_märts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets".split("_"), weekdays: "pühapäev_esmaspäev_teisipäev_kolmapäev_neljapäev_reede_laupäev".split("_"), weekdaysShort: "P_E_T_K_N_R_L".split("_"), weekdaysMin: "P_E_T_K_N_R_L".split("_"), longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY H:mm", LLLL: "dddd, D. MMMM YYYY H:mm" }, calendar: { sameDay: "[Täna,] LT", nextDay: "[Homme,] LT", nextWeek: "[Järgmine] dddd LT", lastDay: "[Eile,] LT", lastWeek: "[Eelmine] dddd LT", sameElse: "L" }, relativeTime: { future: "%s pärast", past: "%s tagasi", s: is, ss: is, m: is, mm: is, h: is, hh: is, d: is, dd: "%d päeva", M: is, MM: is, y: is, yy: is }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } });
      l.defineLocale("eu", { months: "urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua".split("_"), monthsShort: "urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.".split("_"), monthsParseExact: true, weekdays: "igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata".split("_"), weekdaysShort: "ig._al._ar._az._og._ol._lr.".split("_"), weekdaysMin: "ig_al_ar_az_og_ol_lr".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY-MM-DD", LL: "YYYY[ko] MMMM[ren] D[a]", LLL: "YYYY[ko] MMMM[ren] D[a] HH:mm", LLLL: "dddd, YYYY[ko] MMMM[ren] D[a] HH:mm", l: "YYYY-M-D", ll: "YYYY[ko] MMM D[a]", lll: "YYYY[ko] MMM D[a] HH:mm", llll: "ddd, YYYY[ko] MMM D[a] HH:mm" }, calendar: { sameDay: "[gaur] LT[etan]", nextDay: "[bihar] LT[etan]", nextWeek: "dddd LT[etan]", lastDay: "[atzo] LT[etan]", lastWeek: "[aurreko] dddd LT[etan]", sameElse: "L" }, relativeTime: { future: "%s barru", past: "duela %s", s: "segundo batzuk", ss: "%d segundo", m: "minutu bat", mm: "%d minutu", h: "ordu bat", hh: "%d ordu", d: "egun bat", dd: "%d egun", M: "hilabete bat", MM: "%d hilabete", y: "urte bat", yy: "%d urte" }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 7 } });
      var ud = { 1: "۱", 2: "۲", 3: "۳", 4: "۴", 5: "۵", 6: "۶", 7: "۷", 8: "۸", 9: "۹", 0: "۰" }, md = { "۱": "1", "۲": "2", "۳": "3", "۴": "4", "۵": "5", "۶": "6", "۷": "7", "۸": "8", "۹": "9", "۰": "0" };
      l.defineLocale("fa", { months: "ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر".split("_"), monthsShort: "ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر".split("_"), weekdays: "یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه".split("_"), weekdaysShort: "یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه".split("_"), weekdaysMin: "ی_د_س_چ_پ_ج_ش".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, meridiemParse: /قبل از ظهر|بعد از ظهر/, isPM: function(e) {
        return /بعد از ظهر/.test(e);
      }, meridiem: function(e, n, d) {
        return e < 12 ? "قبل از ظهر" : "بعد از ظهر";
      }, calendar: { sameDay: "[امروز ساعت] LT", nextDay: "[فردا ساعت] LT", nextWeek: "dddd [ساعت] LT", lastDay: "[دیروز ساعت] LT", lastWeek: "dddd [پیش] [ساعت] LT", sameElse: "L" }, relativeTime: { future: "در %s", past: "%s پیش", s: "چند ثانیه", ss: "%d ثانیه", m: "یک دقیقه", mm: "%d دقیقه", h: "یک ساعت", hh: "%d ساعت", d: "یک روز", dd: "%d روز", M: "یک ماه", MM: "%d ماه", y: "یک سال", yy: "%d سال" }, preparse: function(e) {
        return e.replace(/[۰-۹]/g, function(n) {
          return md[n];
        }).replace(/،/g, ",");
      }, postformat: function(e) {
        return e.replace(/\d/g, function(n) {
          return ud[n];
        }).replace(/,/g, "،");
      }, dayOfMonthOrdinalParse: /\d{1,2}م/, ordinal: "%dم", week: { dow: 6, doy: 12 } });
      var xn = "nolla yksi kaksi kolme neljä viisi kuusi seitsemän kahdeksan yhdeksän".split(" "), cd = ["nolla", "yhden", "kahden", "kolmen", "neljän", "viiden", "kuuden", xn[7], xn[8], xn[9]];
      function gt(e, n, d, u) {
        var f = "";
        switch (d) {
          case "s":
            return u ? "muutaman sekunnin" : "muutama sekunti";
          case "ss":
            f = u ? "sekunnin" : "sekuntia";
            break;
          case "m":
            return u ? "minuutin" : "minuutti";
          case "mm":
            f = u ? "minuutin" : "minuuttia";
            break;
          case "h":
            return u ? "tunnin" : "tunti";
          case "hh":
            f = u ? "tunnin" : "tuntia";
            break;
          case "d":
            return u ? "päivän" : "päivä";
          case "dd":
            f = u ? "päivän" : "päivää";
            break;
          case "M":
            return u ? "kuukauden" : "kuukausi";
          case "MM":
            f = u ? "kuukauden" : "kuukautta";
            break;
          case "y":
            return u ? "vuoden" : "vuosi";
          case "yy":
            f = u ? "vuoden" : "vuotta";
            break;
        }
        return f = Xi(e, u) + " " + f, f;
      }
      function Xi(e, n) {
        return e < 10 ? n ? cd[e] : xn[e] : e;
      }
      l.defineLocale("fi", { months: "tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesäkuu_heinäkuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu".split("_"), monthsShort: "tammi_helmi_maalis_huhti_touko_kesä_heinä_elo_syys_loka_marras_joulu".split("_"), weekdays: "sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai".split("_"), weekdaysShort: "su_ma_ti_ke_to_pe_la".split("_"), weekdaysMin: "su_ma_ti_ke_to_pe_la".split("_"), longDateFormat: { LT: "HH.mm", LTS: "HH.mm.ss", L: "DD.MM.YYYY", LL: "Do MMMM[ta] YYYY", LLL: "Do MMMM[ta] YYYY, [klo] HH.mm", LLLL: "dddd, Do MMMM[ta] YYYY, [klo] HH.mm", l: "D.M.YYYY", ll: "Do MMM YYYY", lll: "Do MMM YYYY, [klo] HH.mm", llll: "ddd, Do MMM YYYY, [klo] HH.mm" }, calendar: { sameDay: "[tänään] [klo] LT", nextDay: "[huomenna] [klo] LT", nextWeek: "dddd [klo] LT", lastDay: "[eilen] [klo] LT", lastWeek: "[viime] dddd[na] [klo] LT", sameElse: "L" }, relativeTime: { future: "%s päästä", past: "%s sitten", s: gt, ss: gt, m: gt, mm: gt, h: gt, hh: gt, d: gt, dd: gt, M: gt, MM: gt, y: gt, yy: gt }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } });
      l.defineLocale("fil", { months: "Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre".split("_"), monthsShort: "Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis".split("_"), weekdays: "Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado".split("_"), weekdaysShort: "Lin_Lun_Mar_Miy_Huw_Biy_Sab".split("_"), weekdaysMin: "Li_Lu_Ma_Mi_Hu_Bi_Sab".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "MM/D/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY HH:mm", LLLL: "dddd, MMMM DD, YYYY HH:mm" }, calendar: { sameDay: "LT [ngayong araw]", nextDay: "[Bukas ng] LT", nextWeek: "LT [sa susunod na] dddd", lastDay: "LT [kahapon]", lastWeek: "LT [noong nakaraang] dddd", sameElse: "L" }, relativeTime: { future: "sa loob ng %s", past: "%s ang nakalipas", s: "ilang segundo", ss: "%d segundo", m: "isang minuto", mm: "%d minuto", h: "isang oras", hh: "%d oras", d: "isang araw", dd: "%d araw", M: "isang buwan", MM: "%d buwan", y: "isang taon", yy: "%d taon" }, dayOfMonthOrdinalParse: /\d{1,2}/, ordinal: function(e) {
        return e;
      }, week: { dow: 1, doy: 4 } });
      l.defineLocale("fo", { months: "januar_februar_mars_apríl_mai_juni_juli_august_september_oktober_november_desember".split("_"), monthsShort: "jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"), weekdays: "sunnudagur_mánadagur_týsdagur_mikudagur_hósdagur_fríggjadagur_leygardagur".split("_"), weekdaysShort: "sun_mán_týs_mik_hós_frí_ley".split("_"), weekdaysMin: "su_má_tý_mi_hó_fr_le".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D. MMMM, YYYY HH:mm" }, calendar: { sameDay: "[Í dag kl.] LT", nextDay: "[Í morgin kl.] LT", nextWeek: "dddd [kl.] LT", lastDay: "[Í gjár kl.] LT", lastWeek: "[síðstu] dddd [kl] LT", sameElse: "L" }, relativeTime: { future: "um %s", past: "%s síðani", s: "fá sekund", ss: "%d sekundir", m: "ein minuttur", mm: "%d minuttir", h: "ein tími", hh: "%d tímar", d: "ein dagur", dd: "%d dagar", M: "ein mánaður", MM: "%d mánaðir", y: "eitt ár", yy: "%d ár" }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } });
      l.defineLocale("fr-ca", { months: "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"), monthsShort: "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"), monthsParseExact: true, weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"), weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"), weekdaysMin: "di_lu_ma_me_je_ve_sa".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY-MM-DD", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, calendar: { sameDay: "[Aujourd’hui à] LT", nextDay: "[Demain à] LT", nextWeek: "dddd [à] LT", lastDay: "[Hier à] LT", lastWeek: "dddd [dernier à] LT", sameElse: "L" }, relativeTime: { future: "dans %s", past: "il y a %s", s: "quelques secondes", ss: "%d secondes", m: "une minute", mm: "%d minutes", h: "une heure", hh: "%d heures", d: "un jour", dd: "%d jours", M: "un mois", MM: "%d mois", y: "un an", yy: "%d ans" }, dayOfMonthOrdinalParse: /\d{1,2}(er|e)/, ordinal: function(e, n) {
        switch (n) {
          default:
          case "M":
          case "Q":
          case "D":
          case "DDD":
          case "d":
            return e + (e === 1 ? "er" : "e");
          case "w":
          case "W":
            return e + (e === 1 ? "re" : "e");
        }
      } });
      l.defineLocale("fr-ch", { months: "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"), monthsShort: "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"), monthsParseExact: true, weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"), weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"), weekdaysMin: "di_lu_ma_me_je_ve_sa".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, calendar: { sameDay: "[Aujourd’hui à] LT", nextDay: "[Demain à] LT", nextWeek: "dddd [à] LT", lastDay: "[Hier à] LT", lastWeek: "dddd [dernier à] LT", sameElse: "L" }, relativeTime: { future: "dans %s", past: "il y a %s", s: "quelques secondes", ss: "%d secondes", m: "une minute", mm: "%d minutes", h: "une heure", hh: "%d heures", d: "un jour", dd: "%d jours", M: "un mois", MM: "%d mois", y: "un an", yy: "%d ans" }, dayOfMonthOrdinalParse: /\d{1,2}(er|e)/, ordinal: function(e, n) {
        switch (n) {
          default:
          case "M":
          case "Q":
          case "D":
          case "DDD":
          case "d":
            return e + (e === 1 ? "er" : "e");
          case "w":
          case "W":
            return e + (e === 1 ? "re" : "e");
        }
      }, week: { dow: 1, doy: 4 } });
      var Xr = /^(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)/i, hc = /(janv\.?|févr\.?|mars|avr\.?|mai|juin|juil\.?|août|sept\.?|oct\.?|nov\.?|déc\.?)/i, eo = /(janv\.?|févr\.?|mars|avr\.?|mai|juin|juil\.?|août|sept\.?|oct\.?|nov\.?|déc\.?|janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)/i, pa = [/^janv/i, /^févr/i, /^mars/i, /^avr/i, /^mai/i, /^juin/i, /^juil/i, /^août/i, /^sept/i, /^oct/i, /^nov/i, /^déc/i];
      l.defineLocale("fr", { months: "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"), monthsShort: "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"), monthsRegex: eo, monthsShortRegex: eo, monthsStrictRegex: Xr, monthsShortStrictRegex: hc, monthsParse: pa, longMonthsParse: pa, shortMonthsParse: pa, weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"), weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"), weekdaysMin: "di_lu_ma_me_je_ve_sa".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, calendar: { sameDay: "[Aujourd’hui à] LT", nextDay: "[Demain à] LT", nextWeek: "dddd [à] LT", lastDay: "[Hier à] LT", lastWeek: "dddd [dernier à] LT", sameElse: "L" }, relativeTime: { future: "dans %s", past: "il y a %s", s: "quelques secondes", ss: "%d secondes", m: "une minute", mm: "%d minutes", h: "une heure", hh: "%d heures", d: "un jour", dd: "%d jours", w: "une semaine", ww: "%d semaines", M: "un mois", MM: "%d mois", y: "un an", yy: "%d ans" }, dayOfMonthOrdinalParse: /\d{1,2}(er|)/, ordinal: function(e, n) {
        switch (n) {
          case "D":
            return e + (e === 1 ? "er" : "");
          default:
          case "M":
          case "Q":
          case "DDD":
          case "d":
            return e + (e === 1 ? "er" : "e");
          case "w":
          case "W":
            return e + (e === 1 ? "re" : "e");
        }
      }, week: { dow: 1, doy: 4 } });
      var to = "jan._feb._mrt._apr._mai_jun._jul._aug._sep._okt._nov._des.".split("_"), so = "jan_feb_mrt_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_");
      l.defineLocale("fy", { months: "jannewaris_febrewaris_maart_april_maaie_juny_july_augustus_septimber_oktober_novimber_desimber".split("_"), monthsShort: function(e, n) {
        return e ? /-MMM-/.test(n) ? so[e.month()] : to[e.month()] : to;
      }, monthsParseExact: true, weekdays: "snein_moandei_tiisdei_woansdei_tongersdei_freed_sneon".split("_"), weekdaysShort: "si._mo._ti._wo._to._fr._so.".split("_"), weekdaysMin: "Si_Mo_Ti_Wo_To_Fr_So".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD-MM-YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, calendar: { sameDay: "[hjoed om] LT", nextDay: "[moarn om] LT", nextWeek: "dddd [om] LT", lastDay: "[juster om] LT", lastWeek: "[ôfrûne] dddd [om] LT", sameElse: "L" }, relativeTime: { future: "oer %s", past: "%s lyn", s: "in pear sekonden", ss: "%d sekonden", m: "ien minút", mm: "%d minuten", h: "ien oere", hh: "%d oeren", d: "ien dei", dd: "%d dagen", M: "ien moanne", MM: "%d moannen", y: "ien jier", yy: "%d jierren" }, dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/, ordinal: function(e) {
        return e + (e === 1 || e === 8 || e >= 20 ? "ste" : "de");
      }, week: { dow: 1, doy: 4 } });
      var fc = ["Eanáir", "Feabhra", "Márta", "Aibreán", "Bealtaine", "Meitheamh", "Iúil", "Lúnasa", "Meán Fómhair", "Deireadh Fómhair", "Samhain", "Nollaig"], gd = ["Ean", "Feabh", "Márt", "Aib", "Beal", "Meith", "Iúil", "Lún", "M.F.", "D.F.", "Samh", "Noll"], zs = ["Dé Domhnaigh", "Dé Luain", "Dé Máirt", "Dé Céadaoin", "Déardaoin", "Dé hAoine", "Dé Sathairn"], hd = ["Domh", "Luan", "Máirt", "Céad", "Déar", "Aoine", "Sath"], fd = ["Do", "Lu", "Má", "Cé", "Dé", "A", "Sa"];
      l.defineLocale("ga", { months: fc, monthsShort: gd, monthsParseExact: true, weekdays: zs, weekdaysShort: hd, weekdaysMin: fd, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[Inniu ag] LT", nextDay: "[Amárach ag] LT", nextWeek: "dddd [ag] LT", lastDay: "[Inné ag] LT", lastWeek: "dddd [seo caite] [ag] LT", sameElse: "L" }, relativeTime: { future: "i %s", past: "%s ó shin", s: "cúpla soicind", ss: "%d soicind", m: "nóiméad", mm: "%d nóiméad", h: "uair an chloig", hh: "%d uair an chloig", d: "lá", dd: "%d lá", M: "mí", MM: "%d míonna", y: "bliain", yy: "%d bliain" }, dayOfMonthOrdinalParse: /\d{1,2}(d|na|mh)/, ordinal: function(e) {
        var n = e === 1 ? "d" : e % 10 === 2 ? "na" : "mh";
        return e + n;
      }, week: { dow: 1, doy: 4 } });
      var _c = ["Am Faoilleach", "An Gearran", "Am Màrt", "An Giblean", "An Cèitean", "An t-Ògmhios", "An t-Iuchar", "An Lùnastal", "An t-Sultain", "An Dàmhair", "An t-Samhain", "An Dùbhlachd"], _d = ["Faoi", "Gear", "Màrt", "Gibl", "Cèit", "Ògmh", "Iuch", "Lùn", "Sult", "Dàmh", "Samh", "Dùbh"], pc = ["Didòmhnaich", "Diluain", "Dimàirt", "Diciadain", "Diardaoin", "Dihaoine", "Disathairne"], yc = ["Did", "Dil", "Dim", "Dic", "Dia", "Dih", "Dis"], Bs = ["Dò", "Lu", "Mà", "Ci", "Ar", "Ha", "Sa"];
      l.defineLocale("gd", { months: _c, monthsShort: _d, monthsParseExact: true, weekdays: pc, weekdaysShort: yc, weekdaysMin: Bs, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[An-diugh aig] LT", nextDay: "[A-màireach aig] LT", nextWeek: "dddd [aig] LT", lastDay: "[An-dè aig] LT", lastWeek: "dddd [seo chaidh] [aig] LT", sameElse: "L" }, relativeTime: { future: "ann an %s", past: "bho chionn %s", s: "beagan diogan", ss: "%d diogan", m: "mionaid", mm: "%d mionaidean", h: "uair", hh: "%d uairean", d: "latha", dd: "%d latha", M: "mìos", MM: "%d mìosan", y: "bliadhna", yy: "%d bliadhna" }, dayOfMonthOrdinalParse: /\d{1,2}(d|na|mh)/, ordinal: function(e) {
        var n = e === 1 ? "d" : e % 10 === 2 ? "na" : "mh";
        return e + n;
      }, week: { dow: 1, doy: 4 } });
      l.defineLocale("gl", { months: "xaneiro_febreiro_marzo_abril_maio_xuño_xullo_agosto_setembro_outubro_novembro_decembro".split("_"), monthsShort: "xan._feb._mar._abr._mai._xuñ._xul._ago._set._out._nov._dec.".split("_"), monthsParseExact: true, weekdays: "domingo_luns_martes_mércores_xoves_venres_sábado".split("_"), weekdaysShort: "dom._lun._mar._mér._xov._ven._sáb.".split("_"), weekdaysMin: "do_lu_ma_mé_xo_ve_sá".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "DD/MM/YYYY", LL: "D [de] MMMM [de] YYYY", LLL: "D [de] MMMM [de] YYYY H:mm", LLLL: "dddd, D [de] MMMM [de] YYYY H:mm" }, calendar: { sameDay: function() {
        return "[hoxe " + (this.hours() !== 1 ? "ás" : "á") + "] LT";
      }, nextDay: function() {
        return "[mañá " + (this.hours() !== 1 ? "ás" : "á") + "] LT";
      }, nextWeek: function() {
        return "dddd [" + (this.hours() !== 1 ? "ás" : "a") + "] LT";
      }, lastDay: function() {
        return "[onte " + (this.hours() !== 1 ? "á" : "a") + "] LT";
      }, lastWeek: function() {
        return "[o] dddd [pasado " + (this.hours() !== 1 ? "ás" : "a") + "] LT";
      }, sameElse: "L" }, relativeTime: { future: function(e) {
        return e.indexOf("un") === 0 ? "n" + e : "en " + e;
      }, past: "hai %s", s: "uns segundos", ss: "%d segundos", m: "un minuto", mm: "%d minutos", h: "unha hora", hh: "%d horas", d: "un día", dd: "%d días", M: "un mes", MM: "%d meses", y: "un ano", yy: "%d anos" }, dayOfMonthOrdinalParse: /\d{1,2}º/, ordinal: "%dº", week: { dow: 1, doy: 4 } });
      function wt(e, n, d, u) {
        var f = { s: ["थोडया सॅकंडांनी", "थोडे सॅकंड"], ss: [e + " सॅकंडांनी", e + " सॅकंड"], m: ["एका मिणटान", "एक मिनूट"], mm: [e + " मिणटांनी", e + " मिणटां"], h: ["एका वरान", "एक वर"], hh: [e + " वरांनी", e + " वरां"], d: ["एका दिसान", "एक दीस"], dd: [e + " दिसांनी", e + " दीस"], M: ["एका म्हयन्यान", "एक म्हयनो"], MM: [e + " म्हयन्यानी", e + " म्हयने"], y: ["एका वर्सान", "एक वर्स"], yy: [e + " वर्सांनी", e + " वर्सां"] };
        return u ? f[d][0] : f[d][1];
      }
      l.defineLocale("gom-deva", { months: { standalone: "जानेवारी_फेब्रुवारी_मार्च_एप्रील_मे_जून_जुलय_ऑगस्ट_सप्टेंबर_ऑक्टोबर_नोव्हेंबर_डिसेंबर".split("_"), format: "जानेवारीच्या_फेब्रुवारीच्या_मार्चाच्या_एप्रीलाच्या_मेयाच्या_जूनाच्या_जुलयाच्या_ऑगस्टाच्या_सप्टेंबराच्या_ऑक्टोबराच्या_नोव्हेंबराच्या_डिसेंबराच्या".split("_"), isFormat: /MMMM(\s)+D[oD]?/ }, monthsShort: "जाने._फेब्रु._मार्च_एप्री._मे_जून_जुल._ऑग._सप्टें._ऑक्टो._नोव्हें._डिसें.".split("_"), monthsParseExact: true, weekdays: "आयतार_सोमार_मंगळार_बुधवार_बिरेस्तार_सुक्रार_शेनवार".split("_"), weekdaysShort: "आयत._सोम._मंगळ._बुध._ब्रेस्त._सुक्र._शेन.".split("_"), weekdaysMin: "आ_सो_मं_बु_ब्रे_सु_शे".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "A h:mm [वाजतां]", LTS: "A h:mm:ss [वाजतां]", L: "DD-MM-YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY A h:mm [वाजतां]", LLLL: "dddd, MMMM Do, YYYY, A h:mm [वाजतां]", llll: "ddd, D MMM YYYY, A h:mm [वाजतां]" }, calendar: { sameDay: "[आयज] LT", nextDay: "[फाल्यां] LT", nextWeek: "[फुडलो] dddd[,] LT", lastDay: "[काल] LT", lastWeek: "[फाटलो] dddd[,] LT", sameElse: "L" }, relativeTime: { future: "%s", past: "%s आदीं", s: wt, ss: wt, m: wt, mm: wt, h: wt, hh: wt, d: wt, dd: wt, M: wt, MM: wt, y: wt, yy: wt }, dayOfMonthOrdinalParse: /\d{1,2}(वेर)/, ordinal: function(e, n) {
        switch (n) {
          case "D":
            return e + "वेर";
          default:
          case "M":
          case "Q":
          case "DDD":
          case "d":
          case "w":
          case "W":
            return e;
        }
      }, week: { dow: 0, doy: 3 }, meridiemParse: /राती|सकाळीं|दनपारां|सांजे/, meridiemHour: function(e, n) {
        if (e === 12 && (e = 0), n === "राती") return e < 4 ? e : e + 12;
        if (n === "सकाळीं") return e;
        if (n === "दनपारां") return e > 12 ? e : e + 12;
        if (n === "सांजे") return e + 12;
      }, meridiem: function(e, n, d) {
        return e < 4 ? "राती" : e < 12 ? "सकाळीं" : e < 16 ? "दनपारां" : e < 20 ? "सांजे" : "राती";
      } });
      function vt(e, n, d, u) {
        var f = { s: ["thoddea sekondamni", "thodde sekond"], ss: [e + " sekondamni", e + " sekond"], m: ["eka mintan", "ek minut"], mm: [e + " mintamni", e + " mintam"], h: ["eka voran", "ek vor"], hh: [e + " voramni", e + " voram"], d: ["eka disan", "ek dis"], dd: [e + " disamni", e + " dis"], M: ["eka mhoinean", "ek mhoino"], MM: [e + " mhoineamni", e + " mhoine"], y: ["eka vorsan", "ek voros"], yy: [e + " vorsamni", e + " vorsam"] };
        return u ? f[d][0] : f[d][1];
      }
      l.defineLocale("gom-latn", { months: { standalone: "Janer_Febrer_Mars_Abril_Mai_Jun_Julai_Agost_Setembr_Otubr_Novembr_Dezembr".split("_"), format: "Janerachea_Febrerachea_Marsachea_Abrilachea_Maiachea_Junachea_Julaiachea_Agostachea_Setembrachea_Otubrachea_Novembrachea_Dezembrachea".split("_"), isFormat: /MMMM(\s)+D[oD]?/ }, monthsShort: "Jan._Feb._Mars_Abr._Mai_Jun_Jul._Ago._Set._Otu._Nov._Dez.".split("_"), monthsParseExact: true, weekdays: "Aitar_Somar_Mongllar_Budhvar_Birestar_Sukrar_Son'var".split("_"), weekdaysShort: "Ait._Som._Mon._Bud._Bre._Suk._Son.".split("_"), weekdaysMin: "Ai_Sm_Mo_Bu_Br_Su_Sn".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "A h:mm [vazta]", LTS: "A h:mm:ss [vazta]", L: "DD-MM-YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY A h:mm [vazta]", LLLL: "dddd, MMMM Do, YYYY, A h:mm [vazta]", llll: "ddd, D MMM YYYY, A h:mm [vazta]" }, calendar: { sameDay: "[Aiz] LT", nextDay: "[Faleam] LT", nextWeek: "[Fuddlo] dddd[,] LT", lastDay: "[Kal] LT", lastWeek: "[Fattlo] dddd[,] LT", sameElse: "L" }, relativeTime: { future: "%s", past: "%s adim", s: vt, ss: vt, m: vt, mm: vt, h: vt, hh: vt, d: vt, dd: vt, M: vt, MM: vt, y: vt, yy: vt }, dayOfMonthOrdinalParse: /\d{1,2}(er)/, ordinal: function(e, n) {
        switch (n) {
          case "D":
            return e + "er";
          default:
          case "M":
          case "Q":
          case "DDD":
          case "d":
          case "w":
          case "W":
            return e;
        }
      }, week: { dow: 0, doy: 3 }, meridiemParse: /rati|sokallim|donparam|sanje/, meridiemHour: function(e, n) {
        if (e === 12 && (e = 0), n === "rati") return e < 4 ? e : e + 12;
        if (n === "sokallim") return e;
        if (n === "donparam") return e > 12 ? e : e + 12;
        if (n === "sanje") return e + 12;
      }, meridiem: function(e, n, d) {
        return e < 4 ? "rati" : e < 12 ? "sokallim" : e < 16 ? "donparam" : e < 20 ? "sanje" : "rati";
      } });
      var no = { 1: "૧", 2: "૨", 3: "૩", 4: "૪", 5: "૫", 6: "૬", 7: "૭", 8: "૮", 9: "૯", 0: "૦" }, ei = { "૧": "1", "૨": "2", "૩": "3", "૪": "4", "૫": "5", "૬": "6", "૭": "7", "૮": "8", "૯": "9", "૦": "0" };
      l.defineLocale("gu", { months: "જાન્યુઆરી_ફેબ્રુઆરી_માર્ચ_એપ્રિલ_મે_જૂન_જુલાઈ_ઑગસ્ટ_સપ્ટેમ્બર_ઑક્ટ્બર_નવેમ્બર_ડિસેમ્બર".split("_"), monthsShort: "જાન્યુ._ફેબ્રુ._માર્ચ_એપ્રિ._મે_જૂન_જુલા._ઑગ._સપ્ટે._ઑક્ટ્._નવે._ડિસે.".split("_"), monthsParseExact: true, weekdays: "રવિવાર_સોમવાર_મંગળવાર_બુધ્વાર_ગુરુવાર_શુક્રવાર_શનિવાર".split("_"), weekdaysShort: "રવિ_સોમ_મંગળ_બુધ્_ગુરુ_શુક્ર_શનિ".split("_"), weekdaysMin: "ર_સો_મં_બુ_ગુ_શુ_શ".split("_"), longDateFormat: { LT: "A h:mm વાગ્યે", LTS: "A h:mm:ss વાગ્યે", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, A h:mm વાગ્યે", LLLL: "dddd, D MMMM YYYY, A h:mm વાગ્યે" }, calendar: { sameDay: "[આજ] LT", nextDay: "[કાલે] LT", nextWeek: "dddd, LT", lastDay: "[ગઇકાલે] LT", lastWeek: "[પાછલા] dddd, LT", sameElse: "L" }, relativeTime: { future: "%s મા", past: "%s પહેલા", s: "અમુક પળો", ss: "%d સેકંડ", m: "એક મિનિટ", mm: "%d મિનિટ", h: "એક કલાક", hh: "%d કલાક", d: "એક દિવસ", dd: "%d દિવસ", M: "એક મહિનો", MM: "%d મહિનો", y: "એક વર્ષ", yy: "%d વર્ષ" }, preparse: function(e) {
        return e.replace(/[૧૨૩૪૫૬૭૮૯૦]/g, function(n) {
          return ei[n];
        });
      }, postformat: function(e) {
        return e.replace(/\d/g, function(n) {
          return no[n];
        });
      }, meridiemParse: /રાત|બપોર|સવાર|સાંજ/, meridiemHour: function(e, n) {
        if (e === 12 && (e = 0), n === "રાત") return e < 4 ? e : e + 12;
        if (n === "સવાર") return e;
        if (n === "બપોર") return e >= 10 ? e : e + 12;
        if (n === "સાંજ") return e + 12;
      }, meridiem: function(e, n, d) {
        return e < 4 ? "રાત" : e < 10 ? "સવાર" : e < 17 ? "બપોર" : e < 20 ? "સાંજ" : "રાત";
      }, week: { dow: 0, doy: 6 } });
      l.defineLocale("he", { months: "ינואר_פברואר_מרץ_אפריל_מאי_יוני_יולי_אוגוסט_ספטמבר_אוקטובר_נובמבר_דצמבר".split("_"), monthsShort: "ינו׳_פבר׳_מרץ_אפר׳_מאי_יוני_יולי_אוג׳_ספט׳_אוק׳_נוב׳_דצמ׳".split("_"), weekdays: "ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת".split("_"), weekdaysShort: "א׳_ב׳_ג׳_ד׳_ה׳_ו׳_ש׳".split("_"), weekdaysMin: "א_ב_ג_ד_ה_ו_ש".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D [ב]MMMM YYYY", LLL: "D [ב]MMMM YYYY HH:mm", LLLL: "dddd, D [ב]MMMM YYYY HH:mm", l: "D/M/YYYY", ll: "D MMM YYYY", lll: "D MMM YYYY HH:mm", llll: "ddd, D MMM YYYY HH:mm" }, calendar: { sameDay: "[היום ב־]LT", nextDay: "[מחר ב־]LT", nextWeek: "dddd [בשעה] LT", lastDay: "[אתמול ב־]LT", lastWeek: "[ביום] dddd [האחרון בשעה] LT", sameElse: "L" }, relativeTime: { future: "בעוד %s", past: "לפני %s", s: "מספר שניות", ss: "%d שניות", m: "דקה", mm: "%d דקות", h: "שעה", hh: function(e) {
        return e === 2 ? "שעתיים" : e + " שעות";
      }, d: "יום", dd: function(e) {
        return e === 2 ? "יומיים" : e + " ימים";
      }, M: "חודש", MM: function(e) {
        return e === 2 ? "חודשיים" : e + " חודשים";
      }, y: "שנה", yy: function(e) {
        return e === 2 ? "שנתיים" : e % 10 === 0 && e !== 10 ? e + " שנה" : e + " שנים";
      } }, meridiemParse: /אחה"צ|לפנה"צ|אחרי הצהריים|לפני הצהריים|לפנות בוקר|בבוקר|בערב/i, isPM: function(e) {
        return /^(אחה"צ|אחרי הצהריים|בערב)$/.test(e);
      }, meridiem: function(e, n, d) {
        return e < 5 ? "לפנות בוקר" : e < 10 ? "בבוקר" : e < 12 ? d ? 'לפנה"צ' : "לפני הצהריים" : e < 18 ? d ? 'אחה"צ' : "אחרי הצהריים" : "בערב";
      } });
      var ya = { 1: "१", 2: "२", 3: "३", 4: "४", 5: "५", 6: "६", 7: "७", 8: "८", 9: "९", 0: "०" }, te = { "१": "1", "२": "2", "३": "3", "४": "4", "५": "5", "६": "6", "७": "7", "८": "8", "९": "9", "०": "0" }, Xa = [/^जन/i, /^फ़र|फर/i, /^मार्च/i, /^अप्रै/i, /^मई/i, /^जून/i, /^जुल/i, /^अग/i, /^सितं|सित/i, /^अक्टू/i, /^नव|नवं/i, /^दिसं|दिस/i], ao = [/^जन/i, /^फ़र/i, /^मार्च/i, /^अप्रै/i, /^मई/i, /^जून/i, /^जुल/i, /^अग/i, /^सित/i, /^अक्टू/i, /^नव/i, /^दिस/i];
      l.defineLocale("hi", { months: { format: "जनवरी_फ़रवरी_मार्च_अप्रैल_मई_जून_जुलाई_अगस्त_सितम्बर_अक्टूबर_नवम्बर_दिसम्बर".split("_"), standalone: "जनवरी_फरवरी_मार्च_अप्रैल_मई_जून_जुलाई_अगस्त_सितंबर_अक्टूबर_नवंबर_दिसंबर".split("_") }, monthsShort: "जन._फ़र._मार्च_अप्रै._मई_जून_जुल._अग._सित._अक्टू._नव._दिस.".split("_"), weekdays: "रविवार_सोमवार_मंगलवार_बुधवार_गुरूवार_शुक्रवार_शनिवार".split("_"), weekdaysShort: "रवि_सोम_मंगल_बुध_गुरू_शुक्र_शनि".split("_"), weekdaysMin: "र_सो_मं_बु_गु_शु_श".split("_"), longDateFormat: { LT: "A h:mm बजे", LTS: "A h:mm:ss बजे", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, A h:mm बजे", LLLL: "dddd, D MMMM YYYY, A h:mm बजे" }, monthsParse: Xa, longMonthsParse: Xa, shortMonthsParse: ao, monthsRegex: /^(जनवरी|जन\.?|फ़रवरी|फरवरी|फ़र\.?|मार्च?|अप्रैल|अप्रै\.?|मई?|जून?|जुलाई|जुल\.?|अगस्त|अग\.?|सितम्बर|सितंबर|सित\.?|अक्टूबर|अक्टू\.?|नवम्बर|नवंबर|नव\.?|दिसम्बर|दिसंबर|दिस\.?)/i, monthsShortRegex: /^(जनवरी|जन\.?|फ़रवरी|फरवरी|फ़र\.?|मार्च?|अप्रैल|अप्रै\.?|मई?|जून?|जुलाई|जुल\.?|अगस्त|अग\.?|सितम्बर|सितंबर|सित\.?|अक्टूबर|अक्टू\.?|नवम्बर|नवंबर|नव\.?|दिसम्बर|दिसंबर|दिस\.?)/i, monthsStrictRegex: /^(जनवरी?|फ़रवरी|फरवरी?|मार्च?|अप्रैल?|मई?|जून?|जुलाई?|अगस्त?|सितम्बर|सितंबर|सित?\.?|अक्टूबर|अक्टू\.?|नवम्बर|नवंबर?|दिसम्बर|दिसंबर?)/i, monthsShortStrictRegex: /^(जन\.?|फ़र\.?|मार्च?|अप्रै\.?|मई?|जून?|जुल\.?|अग\.?|सित\.?|अक्टू\.?|नव\.?|दिस\.?)/i, calendar: { sameDay: "[आज] LT", nextDay: "[कल] LT", nextWeek: "dddd, LT", lastDay: "[कल] LT", lastWeek: "[पिछले] dddd, LT", sameElse: "L" }, relativeTime: { future: "%s में", past: "%s पहले", s: "कुछ ही क्षण", ss: "%d सेकंड", m: "एक मिनट", mm: "%d मिनट", h: "एक घंटा", hh: "%d घंटे", d: "एक दिन", dd: "%d दिन", M: "एक महीने", MM: "%d महीने", y: "एक वर्ष", yy: "%d वर्ष" }, preparse: function(e) {
        return e.replace(/[१२३४५६७८९०]/g, function(n) {
          return te[n];
        });
      }, postformat: function(e) {
        return e.replace(/\d/g, function(n) {
          return ya[n];
        });
      }, meridiemParse: /रात|सुबह|दोपहर|शाम/, meridiemHour: function(e, n) {
        if (e === 12 && (e = 0), n === "रात") return e < 4 ? e : e + 12;
        if (n === "सुबह") return e;
        if (n === "दोपहर") return e >= 10 ? e : e + 12;
        if (n === "शाम") return e + 12;
      }, meridiem: function(e, n, d) {
        return e < 4 ? "रात" : e < 10 ? "सुबह" : e < 17 ? "दोपहर" : e < 20 ? "शाम" : "रात";
      }, week: { dow: 0, doy: 6 } });
      function Mt(e, n, d) {
        var u = e + " ";
        switch (d) {
          case "ss":
            return e === 1 ? u += "sekunda" : e === 2 || e === 3 || e === 4 ? u += "sekunde" : u += "sekundi", u;
          case "m":
            return n ? "jedna minuta" : "jedne minute";
          case "mm":
            return e === 1 ? u += "minuta" : e === 2 || e === 3 || e === 4 ? u += "minute" : u += "minuta", u;
          case "h":
            return n ? "jedan sat" : "jednog sata";
          case "hh":
            return e === 1 ? u += "sat" : e === 2 || e === 3 || e === 4 ? u += "sata" : u += "sati", u;
          case "dd":
            return e === 1 ? u += "dan" : u += "dana", u;
          case "MM":
            return e === 1 ? u += "mjesec" : e === 2 || e === 3 || e === 4 ? u += "mjeseca" : u += "mjeseci", u;
          case "yy":
            return e === 1 ? u += "godina" : e === 2 || e === 3 || e === 4 ? u += "godine" : u += "godina", u;
        }
      }
      l.defineLocale("hr", { months: { format: "siječnja_veljače_ožujka_travnja_svibnja_lipnja_srpnja_kolovoza_rujna_listopada_studenoga_prosinca".split("_"), standalone: "siječanj_veljača_ožujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac".split("_") }, monthsShort: "sij._velj._ožu._tra._svi._lip._srp._kol._ruj._lis._stu._pro.".split("_"), monthsParseExact: true, weekdays: "nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota".split("_"), weekdaysShort: "ned._pon._uto._sri._čet._pet._sub.".split("_"), weekdaysMin: "ne_po_ut_sr_če_pe_su".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "DD.MM.YYYY", LL: "Do MMMM YYYY", LLL: "Do MMMM YYYY H:mm", LLLL: "dddd, Do MMMM YYYY H:mm" }, calendar: { sameDay: "[danas u] LT", nextDay: "[sutra u] LT", nextWeek: function() {
        switch (this.day()) {
          case 0:
            return "[u] [nedjelju] [u] LT";
          case 3:
            return "[u] [srijedu] [u] LT";
          case 6:
            return "[u] [subotu] [u] LT";
          case 1:
          case 2:
          case 4:
          case 5:
            return "[u] dddd [u] LT";
        }
      }, lastDay: "[jučer u] LT", lastWeek: function() {
        switch (this.day()) {
          case 0:
            return "[prošlu] [nedjelju] [u] LT";
          case 3:
            return "[prošlu] [srijedu] [u] LT";
          case 6:
            return "[prošle] [subote] [u] LT";
          case 1:
          case 2:
          case 4:
          case 5:
            return "[prošli] dddd [u] LT";
        }
      }, sameElse: "L" }, relativeTime: { future: "za %s", past: "prije %s", s: "par sekundi", ss: Mt, m: Mt, mm: Mt, h: Mt, hh: Mt, d: "dan", dd: Mt, M: "mjesec", MM: Mt, y: "godinu", yy: Mt }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 7 } });
      var wc = "vasárnap hétfőn kedden szerdán csütörtökön pénteken szombaton".split(" ");
      function Lt(e, n, d, u) {
        var f = e;
        switch (d) {
          case "s":
            return u || n ? "néhány másodperc" : "néhány másodperce";
          case "ss":
            return f + (u || n) ? " másodperc" : " másodperce";
          case "m":
            return "egy" + (u || n ? " perc" : " perce");
          case "mm":
            return f + (u || n ? " perc" : " perce");
          case "h":
            return "egy" + (u || n ? " óra" : " órája");
          case "hh":
            return f + (u || n ? " óra" : " órája");
          case "d":
            return "egy" + (u || n ? " nap" : " napja");
          case "dd":
            return f + (u || n ? " nap" : " napja");
          case "M":
            return "egy" + (u || n ? " hónap" : " hónapja");
          case "MM":
            return f + (u || n ? " hónap" : " hónapja");
          case "y":
            return "egy" + (u || n ? " év" : " éve");
          case "yy":
            return f + (u || n ? " év" : " éve");
        }
        return "";
      }
      function ro(e) {
        return (e ? "" : "[múlt] ") + "[" + wc[this.day()] + "] LT[-kor]";
      }
      l.defineLocale("hu", { months: "január_február_március_április_május_június_július_augusztus_szeptember_október_november_december".split("_"), monthsShort: "jan._feb._márc._ápr._máj._jún._júl._aug._szept._okt._nov._dec.".split("_"), monthsParseExact: true, weekdays: "vasárnap_hétfő_kedd_szerda_csütörtök_péntek_szombat".split("_"), weekdaysShort: "vas_hét_kedd_sze_csüt_pén_szo".split("_"), weekdaysMin: "v_h_k_sze_cs_p_szo".split("_"), longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "YYYY.MM.DD.", LL: "YYYY. MMMM D.", LLL: "YYYY. MMMM D. H:mm", LLLL: "YYYY. MMMM D., dddd H:mm" }, meridiemParse: /de|du/i, isPM: function(e) {
        return e.charAt(1).toLowerCase() === "u";
      }, meridiem: function(e, n, d) {
        return e < 12 ? d === true ? "de" : "DE" : d === true ? "du" : "DU";
      }, calendar: { sameDay: "[ma] LT[-kor]", nextDay: "[holnap] LT[-kor]", nextWeek: function() {
        return ro.call(this, true);
      }, lastDay: "[tegnap] LT[-kor]", lastWeek: function() {
        return ro.call(this, false);
      }, sameElse: "L" }, relativeTime: { future: "%s múlva", past: "%s", s: Lt, ss: Lt, m: Lt, mm: Lt, h: Lt, hh: Lt, d: Lt, dd: Lt, M: Lt, MM: Lt, y: Lt, yy: Lt }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } });
      l.defineLocale("hy-am", { months: { format: "հունվարի_փետրվարի_մարտի_ապրիլի_մայիսի_հունիսի_հուլիսի_օգոստոսի_սեպտեմբերի_հոկտեմբերի_նոյեմբերի_դեկտեմբերի".split("_"), standalone: "հունվար_փետրվար_մարտ_ապրիլ_մայիս_հունիս_հուլիս_օգոստոս_սեպտեմբեր_հոկտեմբեր_նոյեմբեր_դեկտեմբեր".split("_") }, monthsShort: "հնվ_փտր_մրտ_ապր_մյս_հնս_հլս_օգս_սպտ_հկտ_նմբ_դկտ".split("_"), weekdays: "կիրակի_երկուշաբթի_երեքշաբթի_չորեքշաբթի_հինգշաբթի_ուրբաթ_շաբաթ".split("_"), weekdaysShort: "կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ".split("_"), weekdaysMin: "կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY թ.", LLL: "D MMMM YYYY թ., HH:mm", LLLL: "dddd, D MMMM YYYY թ., HH:mm" }, calendar: { sameDay: "[այսօր] LT", nextDay: "[վաղը] LT", lastDay: "[երեկ] LT", nextWeek: function() {
        return "dddd [օրը ժամը] LT";
      }, lastWeek: function() {
        return "[անցած] dddd [օրը ժամը] LT";
      }, sameElse: "L" }, relativeTime: { future: "%s հետո", past: "%s առաջ", s: "մի քանի վայրկյան", ss: "%d վայրկյան", m: "րոպե", mm: "%d րոպե", h: "ժամ", hh: "%d ժամ", d: "օր", dd: "%d օր", M: "ամիս", MM: "%d ամիս", y: "տարի", yy: "%d տարի" }, meridiemParse: /գիշերվա|առավոտվա|ցերեկվա|երեկոյան/, isPM: function(e) {
        return /^(ցերեկվա|երեկոյան)$/.test(e);
      }, meridiem: function(e) {
        return e < 4 ? "գիշերվա" : e < 12 ? "առավոտվա" : e < 17 ? "ցերեկվա" : "երեկոյան";
      }, dayOfMonthOrdinalParse: /\d{1,2}|\d{1,2}-(ին|րդ)/, ordinal: function(e, n) {
        switch (n) {
          case "DDD":
          case "w":
          case "W":
          case "DDDo":
            return e === 1 ? e + "-ին" : e + "-րդ";
          default:
            return e;
        }
      }, week: { dow: 1, doy: 7 } });
      l.defineLocale("id", { months: "Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember".split("_"), monthsShort: "Jan_Feb_Mar_Apr_Mei_Jun_Jul_Agt_Sep_Okt_Nov_Des".split("_"), weekdays: "Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu".split("_"), weekdaysShort: "Min_Sen_Sel_Rab_Kam_Jum_Sab".split("_"), weekdaysMin: "Mg_Sn_Sl_Rb_Km_Jm_Sb".split("_"), longDateFormat: { LT: "HH.mm", LTS: "HH.mm.ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY [pukul] HH.mm", LLLL: "dddd, D MMMM YYYY [pukul] HH.mm" }, meridiemParse: /pagi|siang|sore|malam/, meridiemHour: function(e, n) {
        if (e === 12 && (e = 0), n === "pagi") return e;
        if (n === "siang") return e >= 11 ? e : e + 12;
        if (n === "sore" || n === "malam") return e + 12;
      }, meridiem: function(e, n, d) {
        return e < 11 ? "pagi" : e < 15 ? "siang" : e < 19 ? "sore" : "malam";
      }, calendar: { sameDay: "[Hari ini pukul] LT", nextDay: "[Besok pukul] LT", nextWeek: "dddd [pukul] LT", lastDay: "[Kemarin pukul] LT", lastWeek: "dddd [lalu pukul] LT", sameElse: "L" }, relativeTime: { future: "dalam %s", past: "%s yang lalu", s: "beberapa detik", ss: "%d detik", m: "semenit", mm: "%d menit", h: "sejam", hh: "%d jam", d: "sehari", dd: "%d hari", M: "sebulan", MM: "%d bulan", y: "setahun", yy: "%d tahun" }, week: { dow: 0, doy: 6 } });
      function We(e) {
        return e % 100 === 11 ? true : e % 10 !== 1;
      }
      function os(e, n, d, u) {
        var f = e + " ";
        switch (d) {
          case "s":
            return n || u ? "nokkrar sekúndur" : "nokkrum sekúndum";
          case "ss":
            return We(e) ? f + (n || u ? "sekúndur" : "sekúndum") : f + "sekúnda";
          case "m":
            return n ? "mínúta" : "mínútu";
          case "mm":
            return We(e) ? f + (n || u ? "mínútur" : "mínútum") : n ? f + "mínúta" : f + "mínútu";
          case "hh":
            return We(e) ? f + (n || u ? "klukkustundir" : "klukkustundum") : f + "klukkustund";
          case "d":
            return n ? "dagur" : u ? "dag" : "degi";
          case "dd":
            return We(e) ? n ? f + "dagar" : f + (u ? "daga" : "dögum") : n ? f + "dagur" : f + (u ? "dag" : "degi");
          case "M":
            return n ? "mánuður" : u ? "mánuð" : "mánuði";
          case "MM":
            return We(e) ? n ? f + "mánuðir" : f + (u ? "mánuði" : "mánuðum") : n ? f + "mánuður" : f + (u ? "mánuð" : "mánuði");
          case "y":
            return n || u ? "ár" : "ári";
          case "yy":
            return We(e) ? f + (n || u ? "ár" : "árum") : f + (n || u ? "ár" : "ári");
        }
      }
      l.defineLocale("is", { months: "janúar_febrúar_mars_apríl_maí_júní_júlí_ágúst_september_október_nóvember_desember".split("_"), monthsShort: "jan_feb_mar_apr_maí_jún_júl_ágú_sep_okt_nóv_des".split("_"), weekdays: "sunnudagur_mánudagur_þriðjudagur_miðvikudagur_fimmtudagur_föstudagur_laugardagur".split("_"), weekdaysShort: "sun_mán_þri_mið_fim_fös_lau".split("_"), weekdaysMin: "Su_Má_Þr_Mi_Fi_Fö_La".split("_"), longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY [kl.] H:mm", LLLL: "dddd, D. MMMM YYYY [kl.] H:mm" }, calendar: { sameDay: "[í dag kl.] LT", nextDay: "[á morgun kl.] LT", nextWeek: "dddd [kl.] LT", lastDay: "[í gær kl.] LT", lastWeek: "[síðasta] dddd [kl.] LT", sameElse: "L" }, relativeTime: { future: "eftir %s", past: "fyrir %s síðan", s: os, ss: os, m: os, mm: os, h: "klukkustund", hh: os, d: os, dd: os, M: os, MM: os, y: os, yy: os }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } });
      l.defineLocale("it-ch", { months: "gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre".split("_"), monthsShort: "gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic".split("_"), weekdays: "domenica_lunedì_martedì_mercoledì_giovedì_venerdì_sabato".split("_"), weekdaysShort: "dom_lun_mar_mer_gio_ven_sab".split("_"), weekdaysMin: "do_lu_ma_me_gi_ve_sa".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, calendar: { sameDay: "[Oggi alle] LT", nextDay: "[Domani alle] LT", nextWeek: "dddd [alle] LT", lastDay: "[Ieri alle] LT", lastWeek: function() {
        switch (this.day()) {
          case 0:
            return "[la scorsa] dddd [alle] LT";
          default:
            return "[lo scorso] dddd [alle] LT";
        }
      }, sameElse: "L" }, relativeTime: { future: function(e) {
        return (/^[0-9].+$/.test(e) ? "tra" : "in") + " " + e;
      }, past: "%s fa", s: "alcuni secondi", ss: "%d secondi", m: "un minuto", mm: "%d minuti", h: "un'ora", hh: "%d ore", d: "un giorno", dd: "%d giorni", M: "un mese", MM: "%d mesi", y: "un anno", yy: "%d anni" }, dayOfMonthOrdinalParse: /\d{1,2}º/, ordinal: "%dº", week: { dow: 1, doy: 4 } });
      l.defineLocale("it", { months: "gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre".split("_"), monthsShort: "gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic".split("_"), weekdays: "domenica_lunedì_martedì_mercoledì_giovedì_venerdì_sabato".split("_"), weekdaysShort: "dom_lun_mar_mer_gio_ven_sab".split("_"), weekdaysMin: "do_lu_ma_me_gi_ve_sa".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, calendar: { sameDay: function() {
        return "[Oggi a" + (this.hours() > 1 ? "lle " : this.hours() === 0 ? " " : "ll'") + "]LT";
      }, nextDay: function() {
        return "[Domani a" + (this.hours() > 1 ? "lle " : this.hours() === 0 ? " " : "ll'") + "]LT";
      }, nextWeek: function() {
        return "dddd [a" + (this.hours() > 1 ? "lle " : this.hours() === 0 ? " " : "ll'") + "]LT";
      }, lastDay: function() {
        return "[Ieri a" + (this.hours() > 1 ? "lle " : this.hours() === 0 ? " " : "ll'") + "]LT";
      }, lastWeek: function() {
        switch (this.day()) {
          case 0:
            return "[La scorsa] dddd [a" + (this.hours() > 1 ? "lle " : this.hours() === 0 ? " " : "ll'") + "]LT";
          default:
            return "[Lo scorso] dddd [a" + (this.hours() > 1 ? "lle " : this.hours() === 0 ? " " : "ll'") + "]LT";
        }
      }, sameElse: "L" }, relativeTime: { future: "tra %s", past: "%s fa", s: "alcuni secondi", ss: "%d secondi", m: "un minuto", mm: "%d minuti", h: "un'ora", hh: "%d ore", d: "un giorno", dd: "%d giorni", w: "una settimana", ww: "%d settimane", M: "un mese", MM: "%d mesi", y: "un anno", yy: "%d anni" }, dayOfMonthOrdinalParse: /\d{1,2}º/, ordinal: "%dº", week: { dow: 1, doy: 4 } });
      l.defineLocale("ja", { eras: [{ since: "2019-05-01", offset: 1, name: "令和", narrow: "㋿", abbr: "R" }, { since: "1989-01-08", until: "2019-04-30", offset: 1, name: "平成", narrow: "㍻", abbr: "H" }, { since: "1926-12-25", until: "1989-01-07", offset: 1, name: "昭和", narrow: "㍼", abbr: "S" }, { since: "1912-07-30", until: "1926-12-24", offset: 1, name: "大正", narrow: "㍽", abbr: "T" }, { since: "1873-01-01", until: "1912-07-29", offset: 6, name: "明治", narrow: "㍾", abbr: "M" }, { since: "0001-01-01", until: "1873-12-31", offset: 1, name: "西暦", narrow: "AD", abbr: "AD" }, { since: "0000-12-31", until: -1 / 0, offset: 1, name: "紀元前", narrow: "BC", abbr: "BC" }], eraYearOrdinalRegex: /(元|\d+)年/, eraYearOrdinalParse: function(e, n) {
        return n[1] === "元" ? 1 : parseInt(n[1] || e, 10);
      }, months: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), weekdays: "日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日".split("_"), weekdaysShort: "日_月_火_水_木_金_土".split("_"), weekdaysMin: "日_月_火_水_木_金_土".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY/MM/DD", LL: "YYYY年M月D日", LLL: "YYYY年M月D日 HH:mm", LLLL: "YYYY年M月D日 dddd HH:mm", l: "YYYY/MM/DD", ll: "YYYY年M月D日", lll: "YYYY年M月D日 HH:mm", llll: "YYYY年M月D日(ddd) HH:mm" }, meridiemParse: /午前|午後/i, isPM: function(e) {
        return e === "午後";
      }, meridiem: function(e, n, d) {
        return e < 12 ? "午前" : "午後";
      }, calendar: { sameDay: "[今日] LT", nextDay: "[明日] LT", nextWeek: function(e) {
        return e.week() !== this.week() ? "[来週]dddd LT" : "dddd LT";
      }, lastDay: "[昨日] LT", lastWeek: function(e) {
        return this.week() !== e.week() ? "[先週]dddd LT" : "dddd LT";
      }, sameElse: "L" }, dayOfMonthOrdinalParse: /\d{1,2}日/, ordinal: function(e, n) {
        switch (n) {
          case "y":
            return e === 1 ? "元年" : e + "年";
          case "d":
          case "D":
          case "DDD":
            return e + "日";
          default:
            return e;
        }
      }, relativeTime: { future: "%s後", past: "%s前", s: "数秒", ss: "%d秒", m: "1分", mm: "%d分", h: "1時間", hh: "%d時間", d: "1日", dd: "%d日", M: "1ヶ月", MM: "%dヶ月", y: "1年", yy: "%d年" } });
      l.defineLocale("jv", { months: "Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_Nopember_Desember".split("_"), monthsShort: "Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nop_Des".split("_"), weekdays: "Minggu_Senen_Seloso_Rebu_Kemis_Jemuwah_Septu".split("_"), weekdaysShort: "Min_Sen_Sel_Reb_Kem_Jem_Sep".split("_"), weekdaysMin: "Mg_Sn_Sl_Rb_Km_Jm_Sp".split("_"), longDateFormat: { LT: "HH.mm", LTS: "HH.mm.ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY [pukul] HH.mm", LLLL: "dddd, D MMMM YYYY [pukul] HH.mm" }, meridiemParse: /enjing|siyang|sonten|ndalu/, meridiemHour: function(e, n) {
        if (e === 12 && (e = 0), n === "enjing") return e;
        if (n === "siyang") return e >= 11 ? e : e + 12;
        if (n === "sonten" || n === "ndalu") return e + 12;
      }, meridiem: function(e, n, d) {
        return e < 11 ? "enjing" : e < 15 ? "siyang" : e < 19 ? "sonten" : "ndalu";
      }, calendar: { sameDay: "[Dinten puniko pukul] LT", nextDay: "[Mbenjang pukul] LT", nextWeek: "dddd [pukul] LT", lastDay: "[Kala wingi pukul] LT", lastWeek: "dddd [kepengker pukul] LT", sameElse: "L" }, relativeTime: { future: "wonten ing %s", past: "%s ingkang kepengker", s: "sawetawis detik", ss: "%d detik", m: "setunggal menit", mm: "%d menit", h: "setunggal jam", hh: "%d jam", d: "sedinten", dd: "%d dinten", M: "sewulan", MM: "%d wulan", y: "setaun", yy: "%d taun" }, week: { dow: 1, doy: 7 } });
      l.defineLocale("ka", { months: "იანვარი_თებერვალი_მარტი_აპრილი_მაისი_ივნისი_ივლისი_აგვისტო_სექტემბერი_ოქტომბერი_ნოემბერი_დეკემბერი".split("_"), monthsShort: "იან_თებ_მარ_აპრ_მაი_ივნ_ივლ_აგვ_სექ_ოქტ_ნოე_დეკ".split("_"), weekdays: { standalone: "კვირა_ორშაბათი_სამშაბათი_ოთხშაბათი_ხუთშაბათი_პარასკევი_შაბათი".split("_"), format: "კვირას_ორშაბათს_სამშაბათს_ოთხშაბათს_ხუთშაბათს_პარასკევს_შაბათს".split("_"), isFormat: /(წინა|შემდეგ)/ }, weekdaysShort: "კვი_ორშ_სამ_ოთხ_ხუთ_პარ_შაბ".split("_"), weekdaysMin: "კვ_ორ_სა_ოთ_ხუ_პა_შა".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[დღეს] LT[-ზე]", nextDay: "[ხვალ] LT[-ზე]", lastDay: "[გუშინ] LT[-ზე]", nextWeek: "[შემდეგ] dddd LT[-ზე]", lastWeek: "[წინა] dddd LT-ზე", sameElse: "L" }, relativeTime: { future: function(e) {
        return e.replace(/(წამ|წუთ|საათ|წელ|დღ|თვ)(ი|ე)/, function(n, d, u) {
          return u === "ი" ? d + "ში" : d + u + "ში";
        });
      }, past: function(e) {
        return /(წამი|წუთი|საათი|დღე|თვე)/.test(e) ? e.replace(/(ი|ე)$/, "ის წინ") : /წელი/.test(e) ? e.replace(/წელი$/, "წლის წინ") : e;
      }, s: "რამდენიმე წამი", ss: "%d წამი", m: "წუთი", mm: "%d წუთი", h: "საათი", hh: "%d საათი", d: "დღე", dd: "%d დღე", M: "თვე", MM: "%d თვე", y: "წელი", yy: "%d წელი" }, dayOfMonthOrdinalParse: /0|1-ლი|მე-\d{1,2}|\d{1,2}-ე/, ordinal: function(e) {
        return e === 0 ? e : e === 1 ? e + "-ლი" : e < 20 || e <= 100 && e % 20 === 0 || e % 100 === 0 ? "მე-" + e : e + "-ე";
      }, week: { dow: 1, doy: 7 } });
      var io = { 0: "-ші", 1: "-ші", 2: "-ші", 3: "-ші", 4: "-ші", 5: "-ші", 6: "-шы", 7: "-ші", 8: "-ші", 9: "-шы", 10: "-шы", 20: "-шы", 30: "-шы", 40: "-шы", 50: "-ші", 60: "-шы", 70: "-ші", 80: "-ші", 90: "-шы", 100: "-ші" };
      l.defineLocale("kk", { months: "қаңтар_ақпан_наурыз_сәуір_мамыр_маусым_шілде_тамыз_қыркүйек_қазан_қараша_желтоқсан".split("_"), monthsShort: "қаң_ақп_нау_сәу_мам_мау_шіл_там_қыр_қаз_қар_жел".split("_"), weekdays: "жексенбі_дүйсенбі_сейсенбі_сәрсенбі_бейсенбі_жұма_сенбі".split("_"), weekdaysShort: "жек_дүй_сей_сәр_бей_жұм_сен".split("_"), weekdaysMin: "жк_дй_сй_ср_бй_жм_сн".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[Бүгін сағат] LT", nextDay: "[Ертең сағат] LT", nextWeek: "dddd [сағат] LT", lastDay: "[Кеше сағат] LT", lastWeek: "[Өткен аптаның] dddd [сағат] LT", sameElse: "L" }, relativeTime: { future: "%s ішінде", past: "%s бұрын", s: "бірнеше секунд", ss: "%d секунд", m: "бір минут", mm: "%d минут", h: "бір сағат", hh: "%d сағат", d: "бір күн", dd: "%d күн", M: "бір ай", MM: "%d ай", y: "бір жыл", yy: "%d жыл" }, dayOfMonthOrdinalParse: /\d{1,2}-(ші|шы)/, ordinal: function(e) {
        var n = e % 10, d = e >= 100 ? 100 : null;
        return e + (io[e] || io[n] || io[d]);
      }, week: { dow: 1, doy: 7 } });
      var pd = { 1: "១", 2: "២", 3: "៣", 4: "៤", 5: "៥", 6: "៦", 7: "៧", 8: "៨", 9: "៩", 0: "០" }, vc = { "១": "1", "២": "2", "៣": "3", "៤": "4", "៥": "5", "៦": "6", "៧": "7", "៨": "8", "៩": "9", "០": "0" };
      l.defineLocale("km", { months: "មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ".split("_"), monthsShort: "មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ".split("_"), weekdays: "អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍".split("_"), weekdaysShort: "អា_ច_អ_ព_ព្រ_សុ_ស".split("_"), weekdaysMin: "អា_ច_អ_ព_ព្រ_សុ_ស".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, meridiemParse: /ព្រឹក|ល្ងាច/, isPM: function(e) {
        return e === "ល្ងាច";
      }, meridiem: function(e, n, d) {
        return e < 12 ? "ព្រឹក" : "ល្ងាច";
      }, calendar: { sameDay: "[ថ្ងៃនេះ ម៉ោង] LT", nextDay: "[ស្អែក ម៉ោង] LT", nextWeek: "dddd [ម៉ោង] LT", lastDay: "[ម្សិលមិញ ម៉ោង] LT", lastWeek: "dddd [សប្តាហ៍មុន] [ម៉ោង] LT", sameElse: "L" }, relativeTime: { future: "%sទៀត", past: "%sមុន", s: "ប៉ុន្មានវិនាទី", ss: "%d វិនាទី", m: "មួយនាទី", mm: "%d នាទី", h: "មួយម៉ោង", hh: "%d ម៉ោង", d: "មួយថ្ងៃ", dd: "%d ថ្ងៃ", M: "មួយខែ", MM: "%d ខែ", y: "មួយឆ្នាំ", yy: "%d ឆ្នាំ" }, dayOfMonthOrdinalParse: /ទី\d{1,2}/, ordinal: "ទី%d", preparse: function(e) {
        return e.replace(/[១២៣៤៥៦៧៨៩០]/g, function(n) {
          return vc[n];
        });
      }, postformat: function(e) {
        return e.replace(/\d/g, function(n) {
          return pd[n];
        });
      }, week: { dow: 1, doy: 4 } });
      var yd = { 1: "೧", 2: "೨", 3: "೩", 4: "೪", 5: "೫", 6: "೬", 7: "೭", 8: "೮", 9: "೯", 0: "೦" }, Mc = { "೧": "1", "೨": "2", "೩": "3", "೪": "4", "೫": "5", "೬": "6", "೭": "7", "೮": "8", "೯": "9", "೦": "0" };
      l.defineLocale("kn", { months: "ಜನವರಿ_ಫೆಬ್ರವರಿ_ಮಾರ್ಚ್_ಏಪ್ರಿಲ್_ಮೇ_ಜೂನ್_ಜುಲೈ_ಆಗಸ್ಟ್_ಸೆಪ್ಟೆಂಬರ್_ಅಕ್ಟೋಬರ್_ನವೆಂಬರ್_ಡಿಸೆಂಬರ್".split("_"), monthsShort: "ಜನ_ಫೆಬ್ರ_ಮಾರ್ಚ್_ಏಪ್ರಿಲ್_ಮೇ_ಜೂನ್_ಜುಲೈ_ಆಗಸ್ಟ್_ಸೆಪ್ಟೆಂ_ಅಕ್ಟೋ_ನವೆಂ_ಡಿಸೆಂ".split("_"), monthsParseExact: true, weekdays: "ಭಾನುವಾರ_ಸೋಮವಾರ_ಮಂಗಳವಾರ_ಬುಧವಾರ_ಗುರುವಾರ_ಶುಕ್ರವಾರ_ಶನಿವಾರ".split("_"), weekdaysShort: "ಭಾನು_ಸೋಮ_ಮಂಗಳ_ಬುಧ_ಗುರು_ಶುಕ್ರ_ಶನಿ".split("_"), weekdaysMin: "ಭಾ_ಸೋ_ಮಂ_ಬು_ಗು_ಶು_ಶ".split("_"), longDateFormat: { LT: "A h:mm", LTS: "A h:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, A h:mm", LLLL: "dddd, D MMMM YYYY, A h:mm" }, calendar: { sameDay: "[ಇಂದು] LT", nextDay: "[ನಾಳೆ] LT", nextWeek: "dddd, LT", lastDay: "[ನಿನ್ನೆ] LT", lastWeek: "[ಕೊನೆಯ] dddd, LT", sameElse: "L" }, relativeTime: { future: "%s ನಂತರ", past: "%s ಹಿಂದೆ", s: "ಕೆಲವು ಕ್ಷಣಗಳು", ss: "%d ಸೆಕೆಂಡುಗಳು", m: "ಒಂದು ನಿಮಿಷ", mm: "%d ನಿಮಿಷ", h: "ಒಂದು ಗಂಟೆ", hh: "%d ಗಂಟೆ", d: "ಒಂದು ದಿನ", dd: "%d ದಿನ", M: "ಒಂದು ತಿಂಗಳು", MM: "%d ತಿಂಗಳು", y: "ಒಂದು ವರ್ಷ", yy: "%d ವರ್ಷ" }, preparse: function(e) {
        return e.replace(/[೧೨೩೪೫೬೭೮೯೦]/g, function(n) {
          return Mc[n];
        });
      }, postformat: function(e) {
        return e.replace(/\d/g, function(n) {
          return yd[n];
        });
      }, meridiemParse: /ರಾತ್ರಿ|ಬೆಳಿಗ್ಗೆ|ಮಧ್ಯಾಹ್ನ|ಸಂಜೆ/, meridiemHour: function(e, n) {
        if (e === 12 && (e = 0), n === "ರಾತ್ರಿ") return e < 4 ? e : e + 12;
        if (n === "ಬೆಳಿಗ್ಗೆ") return e;
        if (n === "ಮಧ್ಯಾಹ್ನ") return e >= 10 ? e : e + 12;
        if (n === "ಸಂಜೆ") return e + 12;
      }, meridiem: function(e, n, d) {
        return e < 4 ? "ರಾತ್ರಿ" : e < 10 ? "ಬೆಳಿಗ್ಗೆ" : e < 17 ? "ಮಧ್ಯಾಹ್ನ" : e < 20 ? "ಸಂಜೆ" : "ರಾತ್ರಿ";
      }, dayOfMonthOrdinalParse: /\d{1,2}(ನೇ)/, ordinal: function(e) {
        return e + "ನೇ";
      }, week: { dow: 0, doy: 6 } });
      l.defineLocale("ko", { months: "1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"), monthsShort: "1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"), weekdays: "일요일_월요일_화요일_수요일_목요일_금요일_토요일".split("_"), weekdaysShort: "일_월_화_수_목_금_토".split("_"), weekdaysMin: "일_월_화_수_목_금_토".split("_"), longDateFormat: { LT: "A h:mm", LTS: "A h:mm:ss", L: "YYYY.MM.DD.", LL: "YYYY년 MMMM D일", LLL: "YYYY년 MMMM D일 A h:mm", LLLL: "YYYY년 MMMM D일 dddd A h:mm", l: "YYYY.MM.DD.", ll: "YYYY년 MMMM D일", lll: "YYYY년 MMMM D일 A h:mm", llll: "YYYY년 MMMM D일 dddd A h:mm" }, calendar: { sameDay: "오늘 LT", nextDay: "내일 LT", nextWeek: "dddd LT", lastDay: "어제 LT", lastWeek: "지난주 dddd LT", sameElse: "L" }, relativeTime: { future: "%s 후", past: "%s 전", s: "몇 초", ss: "%d초", m: "1분", mm: "%d분", h: "한 시간", hh: "%d시간", d: "하루", dd: "%d일", M: "한 달", MM: "%d달", y: "일 년", yy: "%d년" }, dayOfMonthOrdinalParse: /\d{1,2}(일|월|주)/, ordinal: function(e, n) {
        switch (n) {
          case "d":
          case "D":
          case "DDD":
            return e + "일";
          case "M":
            return e + "월";
          case "w":
          case "W":
            return e + "주";
          default:
            return e;
        }
      }, meridiemParse: /오전|오후/, isPM: function(e) {
        return e === "오후";
      }, meridiem: function(e, n, d) {
        return e < 12 ? "오전" : "오후";
      } });
      function kt(e, n, d, u) {
        var f = { s: ["çend sanîye", "çend sanîyeyan"], ss: [e + " sanîye", e + " sanîyeyan"], m: ["deqîqeyek", "deqîqeyekê"], mm: [e + " deqîqe", e + " deqîqeyan"], h: ["saetek", "saetekê"], hh: [e + " saet", e + " saetan"], d: ["rojek", "rojekê"], dd: [e + " roj", e + " rojan"], w: ["hefteyek", "hefteyekê"], ww: [e + " hefte", e + " hefteyan"], M: ["mehek", "mehekê"], MM: [e + " meh", e + " mehan"], y: ["salek", "salekê"], yy: [e + " sal", e + " salan"] };
        return n ? f[d][0] : f[d][1];
      }
      function Lc(e) {
        e = "" + e;
        var n = e.substring(e.length - 1), d = e.length > 1 ? e.substring(e.length - 2) : "";
        return !(d == 12 || d == 13) && (n == "2" || n == "3" || d == "50" || n == "70" || n == "80") ? "yê" : "ê";
      }
      l.defineLocale("ku-kmr", { months: "Rêbendan_Sibat_Adar_Nîsan_Gulan_Hezîran_Tîrmeh_Tebax_Îlon_Cotmeh_Mijdar_Berfanbar".split("_"), monthsShort: "Rêb_Sib_Ada_Nîs_Gul_Hez_Tîr_Teb_Îlo_Cot_Mij_Ber".split("_"), monthsParseExact: true, weekdays: "Yekşem_Duşem_Sêşem_Çarşem_Pêncşem_În_Şemî".split("_"), weekdaysShort: "Yek_Du_Sê_Çar_Pên_În_Şem".split("_"), weekdaysMin: "Ye_Du_Sê_Ça_Pê_În_Şe".split("_"), meridiem: function(e, n, d) {
        return e < 12 ? d ? "bn" : "BN" : d ? "pn" : "PN";
      }, meridiemParse: /bn|BN|pn|PN/, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "Do MMMM[a] YYYY[an]", LLL: "Do MMMM[a] YYYY[an] HH:mm", LLLL: "dddd, Do MMMM[a] YYYY[an] HH:mm", ll: "Do MMM[.] YYYY[an]", lll: "Do MMM[.] YYYY[an] HH:mm", llll: "ddd[.], Do MMM[.] YYYY[an] HH:mm" }, calendar: { sameDay: "[Îro di saet] LT [de]", nextDay: "[Sibê di saet] LT [de]", nextWeek: "dddd [di saet] LT [de]", lastDay: "[Duh di saet] LT [de]", lastWeek: "dddd[a borî di saet] LT [de]", sameElse: "L" }, relativeTime: { future: "di %s de", past: "berî %s", s: kt, ss: kt, m: kt, mm: kt, h: kt, hh: kt, d: kt, dd: kt, w: kt, ww: kt, M: kt, MM: kt, y: kt, yy: kt }, dayOfMonthOrdinalParse: /\d{1,2}(?:yê|ê|\.)/, ordinal: function(e, n) {
        var d = n.toLowerCase();
        return d.includes("w") || d.includes("m") ? e + "." : e + Lc(e);
      }, week: { dow: 1, doy: 4 } });
      var Ws = { 1: "١", 2: "٢", 3: "٣", 4: "٤", 5: "٥", 6: "٦", 7: "٧", 8: "٨", 9: "٩", 0: "٠" }, ht = { "١": "1", "٢": "2", "٣": "3", "٤": "4", "٥": "5", "٦": "6", "٧": "7", "٨": "8", "٩": "9", "٠": "0" }, ti = ["کانونی دووەم", "شوبات", "ئازار", "نیسان", "ئایار", "حوزەیران", "تەمموز", "ئاب", "ئەیلوول", "تشرینی یەكەم", "تشرینی دووەم", "كانونی یەکەم"];
      l.defineLocale("ku", { months: ti, monthsShort: ti, weekdays: "یه‌كشه‌ممه‌_دووشه‌ممه‌_سێشه‌ممه‌_چوارشه‌ممه‌_پێنجشه‌ممه‌_هه‌ینی_شه‌ممه‌".split("_"), weekdaysShort: "یه‌كشه‌م_دووشه‌م_سێشه‌م_چوارشه‌م_پێنجشه‌م_هه‌ینی_شه‌ممه‌".split("_"), weekdaysMin: "ی_د_س_چ_پ_ه_ش".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, meridiemParse: /ئێواره‌|به‌یانی/, isPM: function(e) {
        return /ئێواره‌/.test(e);
      }, meridiem: function(e, n, d) {
        return e < 12 ? "به‌یانی" : "ئێواره‌";
      }, calendar: { sameDay: "[ئه‌مرۆ كاتژمێر] LT", nextDay: "[به‌یانی كاتژمێر] LT", nextWeek: "dddd [كاتژمێر] LT", lastDay: "[دوێنێ كاتژمێر] LT", lastWeek: "dddd [كاتژمێر] LT", sameElse: "L" }, relativeTime: { future: "له‌ %s", past: "%s", s: "چه‌ند چركه‌یه‌ك", ss: "چركه‌ %d", m: "یه‌ك خوله‌ك", mm: "%d خوله‌ك", h: "یه‌ك كاتژمێر", hh: "%d كاتژمێر", d: "یه‌ك ڕۆژ", dd: "%d ڕۆژ", M: "یه‌ك مانگ", MM: "%d مانگ", y: "یه‌ك ساڵ", yy: "%d ساڵ" }, preparse: function(e) {
        return e.replace(/[١٢٣٤٥٦٧٨٩٠]/g, function(n) {
          return ht[n];
        }).replace(/،/g, ",");
      }, postformat: function(e) {
        return e.replace(/\d/g, function(n) {
          return Ws[n];
        }).replace(/,/g, "،");
      }, week: { dow: 6, doy: 12 } });
      var oo = { 0: "-чү", 1: "-чи", 2: "-чи", 3: "-чү", 4: "-чү", 5: "-чи", 6: "-чы", 7: "-чи", 8: "-чи", 9: "-чу", 10: "-чу", 20: "-чы", 30: "-чу", 40: "-чы", 50: "-чү", 60: "-чы", 70: "-чи", 80: "-чи", 90: "-чу", 100: "-чү" };
      l.defineLocale("ky", { months: "январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_"), monthsShort: "янв_фев_март_апр_май_июнь_июль_авг_сен_окт_ноя_дек".split("_"), weekdays: "Жекшемби_Дүйшөмбү_Шейшемби_Шаршемби_Бейшемби_Жума_Ишемби".split("_"), weekdaysShort: "Жек_Дүй_Шей_Шар_Бей_Жум_Ише".split("_"), weekdaysMin: "Жк_Дй_Шй_Шр_Бй_Жм_Иш".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[Бүгүн саат] LT", nextDay: "[Эртең саат] LT", nextWeek: "dddd [саат] LT", lastDay: "[Кечээ саат] LT", lastWeek: "[Өткөн аптанын] dddd [күнү] [саат] LT", sameElse: "L" }, relativeTime: { future: "%s ичинде", past: "%s мурун", s: "бирнече секунд", ss: "%d секунд", m: "бир мүнөт", mm: "%d мүнөт", h: "бир саат", hh: "%d саат", d: "бир күн", dd: "%d күн", M: "бир ай", MM: "%d ай", y: "бир жыл", yy: "%d жыл" }, dayOfMonthOrdinalParse: /\d{1,2}-(чи|чы|чү|чу)/, ordinal: function(e) {
        var n = e % 10, d = e >= 100 ? 100 : null;
        return e + (oo[e] || oo[n] || oo[d]);
      }, week: { dow: 1, doy: 7 } });
      function Nn(e, n, d, u) {
        var f = { m: ["eng Minutt", "enger Minutt"], h: ["eng Stonn", "enger Stonn"], d: ["een Dag", "engem Dag"], M: ["ee Mount", "engem Mount"], y: ["ee Joer", "engem Joer"] };
        return n ? f[d][0] : f[d][1];
      }
      function kc(e) {
        var n = e.substr(0, e.indexOf(" "));
        return ks(n) ? "a " + e : "an " + e;
      }
      function Tc(e) {
        var n = e.substr(0, e.indexOf(" "));
        return ks(n) ? "viru " + e : "virun " + e;
      }
      function ks(e) {
        if (e = parseInt(e, 10), isNaN(e)) return false;
        if (e < 0) return true;
        if (e < 10) return 4 <= e && e <= 7;
        if (e < 100) {
          var n = e % 10, d = e / 10;
          return ks(n === 0 ? d : n);
        } else if (e < 1e4) {
          for (; e >= 10; ) e = e / 10;
          return ks(e);
        } else return e = e / 1e3, ks(e);
      }
      l.defineLocale("lb", { months: "Januar_Februar_Mäerz_Abrëll_Mee_Juni_Juli_August_September_Oktober_November_Dezember".split("_"), monthsShort: "Jan._Febr._Mrz._Abr._Mee_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"), monthsParseExact: true, weekdays: "Sonndeg_Méindeg_Dënschdeg_Mëttwoch_Donneschdeg_Freideg_Samschdeg".split("_"), weekdaysShort: "So._Mé._Dë._Më._Do._Fr._Sa.".split("_"), weekdaysMin: "So_Mé_Dë_Më_Do_Fr_Sa".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "H:mm [Auer]", LTS: "H:mm:ss [Auer]", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY H:mm [Auer]", LLLL: "dddd, D. MMMM YYYY H:mm [Auer]" }, calendar: { sameDay: "[Haut um] LT", sameElse: "L", nextDay: "[Muer um] LT", nextWeek: "dddd [um] LT", lastDay: "[Gëschter um] LT", lastWeek: function() {
        switch (this.day()) {
          case 2:
          case 4:
            return "[Leschten] dddd [um] LT";
          default:
            return "[Leschte] dddd [um] LT";
        }
      } }, relativeTime: { future: kc, past: Tc, s: "e puer Sekonnen", ss: "%d Sekonnen", m: Nn, mm: "%d Minutten", h: Nn, hh: "%d Stonnen", d: Nn, dd: "%d Deeg", M: Nn, MM: "%d Méint", y: Nn, yy: "%d Joer" }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } });
      l.defineLocale("lo", { months: "ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ".split("_"), monthsShort: "ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ".split("_"), weekdays: "ອາທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ".split("_"), weekdaysShort: "ທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ".split("_"), weekdaysMin: "ທ_ຈ_ອຄ_ພ_ພຫ_ສກ_ສ".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "ວັນdddd D MMMM YYYY HH:mm" }, meridiemParse: /ຕອນເຊົ້າ|ຕອນແລງ/, isPM: function(e) {
        return e === "ຕອນແລງ";
      }, meridiem: function(e, n, d) {
        return e < 12 ? "ຕອນເຊົ້າ" : "ຕອນແລງ";
      }, calendar: { sameDay: "[ມື້ນີ້ເວລາ] LT", nextDay: "[ມື້ອື່ນເວລາ] LT", nextWeek: "[ວັນ]dddd[ໜ້າເວລາ] LT", lastDay: "[ມື້ວານນີ້ເວລາ] LT", lastWeek: "[ວັນ]dddd[ແລ້ວນີ້ເວລາ] LT", sameElse: "L" }, relativeTime: { future: "ອີກ %s", past: "%sຜ່ານມາ", s: "ບໍ່ເທົ່າໃດວິນາທີ", ss: "%d ວິນາທີ", m: "1 ນາທີ", mm: "%d ນາທີ", h: "1 ຊົ່ວໂມງ", hh: "%d ຊົ່ວໂມງ", d: "1 ມື້", dd: "%d ມື້", M: "1 ເດືອນ", MM: "%d ເດືອນ", y: "1 ປີ", yy: "%d ປີ" }, dayOfMonthOrdinalParse: /(ທີ່)\d{1,2}/, ordinal: function(e) {
        return "ທີ່" + e;
      } });
      var wd = { ss: "sekundė_sekundžių_sekundes", m: "minutė_minutės_minutę", mm: "minutės_minučių_minutes", h: "valanda_valandos_valandą", hh: "valandos_valandų_valandas", d: "diena_dienos_dieną", dd: "dienos_dienų_dienas", M: "mėnuo_mėnesio_mėnesį", MM: "mėnesiai_mėnesių_mėnesius", y: "metai_metų_metus", yy: "metai_metų_metus" };
      function vd(e, n, d, u) {
        return n ? "kelios sekundės" : u ? "kelių sekundžių" : "kelias sekundes";
      }
      function wa(e, n, d, u) {
        return n ? fn(d)[0] : u ? fn(d)[1] : fn(d)[2];
      }
      function Md(e) {
        return e % 10 === 0 || e > 10 && e < 20;
      }
      function fn(e) {
        return wd[e].split("_");
      }
      function va(e, n, d, u) {
        var f = e + " ";
        return e === 1 ? f + wa(e, n, d[0], u) : n ? f + (Md(e) ? fn(d)[1] : fn(d)[0]) : u ? f + fn(d)[1] : f + (Md(e) ? fn(d)[1] : fn(d)[2]);
      }
      l.defineLocale("lt", { months: { format: "sausio_vasario_kovo_balandžio_gegužės_birželio_liepos_rugpjūčio_rugsėjo_spalio_lapkričio_gruodžio".split("_"), standalone: "sausis_vasaris_kovas_balandis_gegužė_birželis_liepa_rugpjūtis_rugsėjis_spalis_lapkritis_gruodis".split("_"), isFormat: /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?|MMMM?(\[[^\[\]]*\]|\s)+D[oD]?/ }, monthsShort: "sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd".split("_"), weekdays: { format: "sekmadienį_pirmadienį_antradienį_trečiadienį_ketvirtadienį_penktadienį_šeštadienį".split("_"), standalone: "sekmadienis_pirmadienis_antradienis_trečiadienis_ketvirtadienis_penktadienis_šeštadienis".split("_"), isFormat: /dddd HH:mm/ }, weekdaysShort: "Sek_Pir_Ant_Tre_Ket_Pen_Šeš".split("_"), weekdaysMin: "S_P_A_T_K_Pn_Š".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY-MM-DD", LL: "YYYY [m.] MMMM D [d.]", LLL: "YYYY [m.] MMMM D [d.], HH:mm [val.]", LLLL: "YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]", l: "YYYY-MM-DD", ll: "YYYY [m.] MMMM D [d.]", lll: "YYYY [m.] MMMM D [d.], HH:mm [val.]", llll: "YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]" }, calendar: { sameDay: "[Šiandien] LT", nextDay: "[Rytoj] LT", nextWeek: "dddd LT", lastDay: "[Vakar] LT", lastWeek: "[Praėjusį] dddd LT", sameElse: "L" }, relativeTime: { future: "po %s", past: "prieš %s", s: vd, ss: va, m: wa, mm: va, h: wa, hh: va, d: wa, dd: va, M: wa, MM: va, y: wa, yy: va }, dayOfMonthOrdinalParse: /\d{1,2}-oji/, ordinal: function(e) {
        return e + "-oji";
      }, week: { dow: 1, doy: 4 } });
      var lo = { ss: "sekundes_sekundēm_sekunde_sekundes".split("_"), m: "minūtes_minūtēm_minūte_minūtes".split("_"), mm: "minūtes_minūtēm_minūte_minūtes".split("_"), h: "stundas_stundām_stunda_stundas".split("_"), hh: "stundas_stundām_stunda_stundas".split("_"), d: "dienas_dienām_diena_dienas".split("_"), dd: "dienas_dienām_diena_dienas".split("_"), M: "mēneša_mēnešiem_mēnesis_mēneši".split("_"), MM: "mēneša_mēnešiem_mēnesis_mēneši".split("_"), y: "gada_gadiem_gads_gadi".split("_"), yy: "gada_gadiem_gads_gadi".split("_") };
      function uo(e, n, d) {
        return d ? n % 10 === 1 && n % 100 !== 11 ? e[2] : e[3] : n % 10 === 1 && n % 100 !== 11 ? e[0] : e[1];
      }
      function Ma(e, n, d) {
        return e + " " + uo(lo[d], e, n);
      }
      function An(e, n, d) {
        return uo(lo[d], e, n);
      }
      function Ld(e, n) {
        return n ? "dažas sekundes" : "dažām sekundēm";
      }
      l.defineLocale("lv", { months: "janvāris_februāris_marts_aprīlis_maijs_jūnijs_jūlijs_augusts_septembris_oktobris_novembris_decembris".split("_"), monthsShort: "jan_feb_mar_apr_mai_jūn_jūl_aug_sep_okt_nov_dec".split("_"), weekdays: "svētdiena_pirmdiena_otrdiena_trešdiena_ceturtdiena_piektdiena_sestdiena".split("_"), weekdaysShort: "Sv_P_O_T_C_Pk_S".split("_"), weekdaysMin: "Sv_P_O_T_C_Pk_S".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY.", LL: "YYYY. [gada] D. MMMM", LLL: "YYYY. [gada] D. MMMM, HH:mm", LLLL: "YYYY. [gada] D. MMMM, dddd, HH:mm" }, calendar: { sameDay: "[Šodien pulksten] LT", nextDay: "[Rīt pulksten] LT", nextWeek: "dddd [pulksten] LT", lastDay: "[Vakar pulksten] LT", lastWeek: "[Pagājušā] dddd [pulksten] LT", sameElse: "L" }, relativeTime: { future: "pēc %s", past: "pirms %s", s: Ld, ss: Ma, m: An, mm: Ma, h: An, hh: Ma, d: An, dd: Ma, M: An, MM: Ma, y: An, yy: Ma }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } });
      var Tt = { words: { ss: ["sekund", "sekunda", "sekundi"], m: ["jedan minut", "jednog minuta"], mm: ["minut", "minuta", "minuta"], h: ["jedan sat", "jednog sata"], hh: ["sat", "sata", "sati"], dd: ["dan", "dana", "dana"], MM: ["mjesec", "mjeseca", "mjeseci"], yy: ["godina", "godine", "godina"] }, correctGrammaticalCase: function(e, n) {
        return e === 1 ? n[0] : e >= 2 && e <= 4 ? n[1] : n[2];
      }, translate: function(e, n, d) {
        var u = Tt.words[d];
        return d.length === 1 ? n ? u[0] : u[1] : e + " " + Tt.correctGrammaticalCase(e, u);
      } };
      l.defineLocale("me", { months: "januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar".split("_"), monthsShort: "jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.".split("_"), monthsParseExact: true, weekdays: "nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota".split("_"), weekdaysShort: "ned._pon._uto._sri._čet._pet._sub.".split("_"), weekdaysMin: "ne_po_ut_sr_če_pe_su".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY H:mm", LLLL: "dddd, D. MMMM YYYY H:mm" }, calendar: { sameDay: "[danas u] LT", nextDay: "[sjutra u] LT", nextWeek: function() {
        switch (this.day()) {
          case 0:
            return "[u] [nedjelju] [u] LT";
          case 3:
            return "[u] [srijedu] [u] LT";
          case 6:
            return "[u] [subotu] [u] LT";
          case 1:
          case 2:
          case 4:
          case 5:
            return "[u] dddd [u] LT";
        }
      }, lastDay: "[juče u] LT", lastWeek: function() {
        var e = ["[prošle] [nedjelje] [u] LT", "[prošlog] [ponedjeljka] [u] LT", "[prošlog] [utorka] [u] LT", "[prošle] [srijede] [u] LT", "[prošlog] [četvrtka] [u] LT", "[prošlog] [petka] [u] LT", "[prošle] [subote] [u] LT"];
        return e[this.day()];
      }, sameElse: "L" }, relativeTime: { future: "za %s", past: "prije %s", s: "nekoliko sekundi", ss: Tt.translate, m: Tt.translate, mm: Tt.translate, h: Tt.translate, hh: Tt.translate, d: "dan", dd: Tt.translate, M: "mjesec", MM: Tt.translate, y: "godinu", yy: Tt.translate }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 7 } });
      l.defineLocale("mi", { months: "Kohi-tāte_Hui-tanguru_Poutū-te-rangi_Paenga-whāwhā_Haratua_Pipiri_Hōngoingoi_Here-turi-kōkā_Mahuru_Whiringa-ā-nuku_Whiringa-ā-rangi_Hakihea".split("_"), monthsShort: "Kohi_Hui_Pou_Pae_Hara_Pipi_Hōngoi_Here_Mahu_Whi-nu_Whi-ra_Haki".split("_"), monthsRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i, monthsStrictRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i, monthsShortRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i, monthsShortStrictRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,2}/i, weekdays: "Rātapu_Mane_Tūrei_Wenerei_Tāite_Paraire_Hātarei".split("_"), weekdaysShort: "Ta_Ma_Tū_We_Tāi_Pa_Hā".split("_"), weekdaysMin: "Ta_Ma_Tū_We_Tāi_Pa_Hā".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY [i] HH:mm", LLLL: "dddd, D MMMM YYYY [i] HH:mm" }, calendar: { sameDay: "[i teie mahana, i] LT", nextDay: "[apopo i] LT", nextWeek: "dddd [i] LT", lastDay: "[inanahi i] LT", lastWeek: "dddd [whakamutunga i] LT", sameElse: "L" }, relativeTime: { future: "i roto i %s", past: "%s i mua", s: "te hēkona ruarua", ss: "%d hēkona", m: "he meneti", mm: "%d meneti", h: "te haora", hh: "%d haora", d: "he ra", dd: "%d ra", M: "he marama", MM: "%d marama", y: "he tau", yy: "%d tau" }, dayOfMonthOrdinalParse: /\d{1,2}º/, ordinal: "%dº", week: { dow: 1, doy: 4 } });
      l.defineLocale("mk", { months: "јануари_февруари_март_април_мај_јуни_јули_август_септември_октомври_ноември_декември".split("_"), monthsShort: "јан_фев_мар_апр_мај_јун_јул_авг_сеп_окт_ное_дек".split("_"), weekdays: "недела_понеделник_вторник_среда_четврток_петок_сабота".split("_"), weekdaysShort: "нед_пон_вто_сре_чет_пет_саб".split("_"), weekdaysMin: "нe_пo_вт_ср_че_пе_сa".split("_"), longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "D.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY H:mm", LLLL: "dddd, D MMMM YYYY H:mm" }, calendar: { sameDay: "[Денес во] LT", nextDay: "[Утре во] LT", nextWeek: "[Во] dddd [во] LT", lastDay: "[Вчера во] LT", lastWeek: function() {
        switch (this.day()) {
          case 0:
          case 3:
          case 6:
            return "[Изминатата] dddd [во] LT";
          case 1:
          case 2:
          case 4:
          case 5:
            return "[Изминатиот] dddd [во] LT";
        }
      }, sameElse: "L" }, relativeTime: { future: "за %s", past: "пред %s", s: "неколку секунди", ss: "%d секунди", m: "една минута", mm: "%d минути", h: "еден час", hh: "%d часа", d: "еден ден", dd: "%d дена", M: "еден месец", MM: "%d месеци", y: "една година", yy: "%d години" }, dayOfMonthOrdinalParse: /\d{1,2}-(ев|ен|ти|ви|ри|ми)/, ordinal: function(e) {
        var n = e % 10, d = e % 100;
        return e === 0 ? e + "-ев" : d === 0 ? e + "-ен" : d > 10 && d < 20 ? e + "-ти" : n === 1 ? e + "-ви" : n === 2 ? e + "-ри" : n === 7 || n === 8 ? e + "-ми" : e + "-ти";
      }, week: { dow: 1, doy: 7 } });
      l.defineLocale("ml", { months: "ജനുവരി_ഫെബ്രുവരി_മാർച്ച്_ഏപ്രിൽ_മേയ്_ജൂൺ_ജൂലൈ_ഓഗസ്റ്റ്_സെപ്റ്റംബർ_ഒക്ടോബർ_നവംബർ_ഡിസംബർ".split("_"), monthsShort: "ജനു._ഫെബ്രു._മാർ._ഏപ്രി._മേയ്_ജൂൺ_ജൂലൈ._ഓഗ._സെപ്റ്റ._ഒക്ടോ._നവം._ഡിസം.".split("_"), monthsParseExact: true, weekdays: "ഞായറാഴ്ച_തിങ്കളാഴ്ച_ചൊവ്വാഴ്ച_ബുധനാഴ്ച_വ്യാഴാഴ്ച_വെള്ളിയാഴ്ച_ശനിയാഴ്ച".split("_"), weekdaysShort: "ഞായർ_തിങ്കൾ_ചൊവ്വ_ബുധൻ_വ്യാഴം_വെള്ളി_ശനി".split("_"), weekdaysMin: "ഞാ_തി_ചൊ_ബു_വ്യാ_വെ_ശ".split("_"), longDateFormat: { LT: "A h:mm -നു", LTS: "A h:mm:ss -നു", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, A h:mm -നു", LLLL: "dddd, D MMMM YYYY, A h:mm -നു" }, calendar: { sameDay: "[ഇന്ന്] LT", nextDay: "[നാളെ] LT", nextWeek: "dddd, LT", lastDay: "[ഇന്നലെ] LT", lastWeek: "[കഴിഞ്ഞ] dddd, LT", sameElse: "L" }, relativeTime: { future: "%s കഴിഞ്ഞ്", past: "%s മുൻപ്", s: "അൽപ നിമിഷങ്ങൾ", ss: "%d സെക്കൻഡ്", m: "ഒരു മിനിറ്റ്", mm: "%d മിനിറ്റ്", h: "ഒരു മണിക്കൂർ", hh: "%d മണിക്കൂർ", d: "ഒരു ദിവസം", dd: "%d ദിവസം", M: "ഒരു മാസം", MM: "%d മാസം", y: "ഒരു വർഷം", yy: "%d വർഷം" }, meridiemParse: /രാത്രി|രാവിലെ|ഉച്ച കഴിഞ്ഞ്|വൈകുന്നേരം|രാത്രി/i, meridiemHour: function(e, n) {
        return e === 12 && (e = 0), n === "രാത്രി" && e >= 4 || n === "ഉച്ച കഴിഞ്ഞ്" || n === "വൈകുന്നേരം" ? e + 12 : e;
      }, meridiem: function(e, n, d) {
        return e < 4 ? "രാത്രി" : e < 12 ? "രാവിലെ" : e < 17 ? "ഉച്ച കഴിഞ്ഞ്" : e < 20 ? "വൈകുന്നേരം" : "രാത്രി";
      } });
      function Dt(e, n, d, u) {
        switch (d) {
          case "s":
            return n ? "хэдхэн секунд" : "хэдхэн секундын";
          case "ss":
            return e + (n ? " секунд" : " секундын");
          case "m":
          case "mm":
            return e + (n ? " минут" : " минутын");
          case "h":
          case "hh":
            return e + (n ? " цаг" : " цагийн");
          case "d":
          case "dd":
            return e + (n ? " өдөр" : " өдрийн");
          case "M":
          case "MM":
            return e + (n ? " сар" : " сарын");
          case "y":
          case "yy":
            return e + (n ? " жил" : " жилийн");
          default:
            return e;
        }
      }
      l.defineLocale("mn", { months: "Нэгдүгээр сар_Хоёрдугаар сар_Гуравдугаар сар_Дөрөвдүгээр сар_Тавдугаар сар_Зургадугаар сар_Долдугаар сар_Наймдугаар сар_Есдүгээр сар_Аравдугаар сар_Арван нэгдүгээр сар_Арван хоёрдугаар сар".split("_"), monthsShort: "1 сар_2 сар_3 сар_4 сар_5 сар_6 сар_7 сар_8 сар_9 сар_10 сар_11 сар_12 сар".split("_"), monthsParseExact: true, weekdays: "Ням_Даваа_Мягмар_Лхагва_Пүрэв_Баасан_Бямба".split("_"), weekdaysShort: "Ням_Дав_Мяг_Лха_Пүр_Баа_Бям".split("_"), weekdaysMin: "Ня_Да_Мя_Лх_Пү_Ба_Бя".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY-MM-DD", LL: "YYYY оны MMMMын D", LLL: "YYYY оны MMMMын D HH:mm", LLLL: "dddd, YYYY оны MMMMын D HH:mm" }, meridiemParse: /ҮӨ|ҮХ/i, isPM: function(e) {
        return e === "ҮХ";
      }, meridiem: function(e, n, d) {
        return e < 12 ? "ҮӨ" : "ҮХ";
      }, calendar: { sameDay: "[Өнөөдөр] LT", nextDay: "[Маргааш] LT", nextWeek: "[Ирэх] dddd LT", lastDay: "[Өчигдөр] LT", lastWeek: "[Өнгөрсөн] dddd LT", sameElse: "L" }, relativeTime: { future: "%s дараа", past: "%s өмнө", s: Dt, ss: Dt, m: Dt, mm: Dt, h: Dt, hh: Dt, d: Dt, dd: Dt, M: Dt, MM: Dt, y: Dt, yy: Dt }, dayOfMonthOrdinalParse: /\d{1,2} өдөр/, ordinal: function(e, n) {
        switch (n) {
          case "d":
          case "D":
          case "DDD":
            return e + " өдөр";
          default:
            return e;
        }
      } });
      var kd = { 1: "१", 2: "२", 3: "३", 4: "४", 5: "५", 6: "६", 7: "७", 8: "८", 9: "९", 0: "०" }, Td = { "१": "1", "२": "2", "३": "3", "४": "4", "५": "5", "६": "6", "७": "7", "८": "8", "९": "9", "०": "0" };
      function ft(e, n, d, u) {
        var f = "";
        if (n) switch (d) {
          case "s":
            f = "काही सेकंद";
            break;
          case "ss":
            f = "%d सेकंद";
            break;
          case "m":
            f = "एक मिनिट";
            break;
          case "mm":
            f = "%d मिनिटे";
            break;
          case "h":
            f = "एक तास";
            break;
          case "hh":
            f = "%d तास";
            break;
          case "d":
            f = "एक दिवस";
            break;
          case "dd":
            f = "%d दिवस";
            break;
          case "M":
            f = "एक महिना";
            break;
          case "MM":
            f = "%d महिने";
            break;
          case "y":
            f = "एक वर्ष";
            break;
          case "yy":
            f = "%d वर्षे";
            break;
        }
        else switch (d) {
          case "s":
            f = "काही सेकंदां";
            break;
          case "ss":
            f = "%d सेकंदां";
            break;
          case "m":
            f = "एका मिनिटा";
            break;
          case "mm":
            f = "%d मिनिटां";
            break;
          case "h":
            f = "एका तासा";
            break;
          case "hh":
            f = "%d तासां";
            break;
          case "d":
            f = "एका दिवसा";
            break;
          case "dd":
            f = "%d दिवसां";
            break;
          case "M":
            f = "एका महिन्या";
            break;
          case "MM":
            f = "%d महिन्यां";
            break;
          case "y":
            f = "एका वर्षा";
            break;
          case "yy":
            f = "%d वर्षां";
            break;
        }
        return f.replace(/%d/i, e);
      }
      l.defineLocale("mr", { months: "जानेवारी_फेब्रुवारी_मार्च_एप्रिल_मे_जून_जुलै_ऑगस्ट_सप्टेंबर_ऑक्टोबर_नोव्हेंबर_डिसेंबर".split("_"), monthsShort: "जाने._फेब्रु._मार्च._एप्रि._मे._जून._जुलै._ऑग._सप्टें._ऑक्टो._नोव्हें._डिसें.".split("_"), monthsParseExact: true, weekdays: "रविवार_सोमवार_मंगळवार_बुधवार_गुरूवार_शुक्रवार_शनिवार".split("_"), weekdaysShort: "रवि_सोम_मंगळ_बुध_गुरू_शुक्र_शनि".split("_"), weekdaysMin: "र_सो_मं_बु_गु_शु_श".split("_"), longDateFormat: { LT: "A h:mm वाजता", LTS: "A h:mm:ss वाजता", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, A h:mm वाजता", LLLL: "dddd, D MMMM YYYY, A h:mm वाजता" }, calendar: { sameDay: "[आज] LT", nextDay: "[उद्या] LT", nextWeek: "dddd, LT", lastDay: "[काल] LT", lastWeek: "[मागील] dddd, LT", sameElse: "L" }, relativeTime: { future: "%sमध्ये", past: "%sपूर्वी", s: ft, ss: ft, m: ft, mm: ft, h: ft, hh: ft, d: ft, dd: ft, M: ft, MM: ft, y: ft, yy: ft }, preparse: function(e) {
        return e.replace(/[१२३४५६७८९०]/g, function(n) {
          return Td[n];
        });
      }, postformat: function(e) {
        return e.replace(/\d/g, function(n) {
          return kd[n];
        });
      }, meridiemParse: /पहाटे|सकाळी|दुपारी|सायंकाळी|रात्री/, meridiemHour: function(e, n) {
        if (e === 12 && (e = 0), n === "पहाटे" || n === "सकाळी") return e;
        if (n === "दुपारी" || n === "सायंकाळी" || n === "रात्री") return e >= 12 ? e : e + 12;
      }, meridiem: function(e, n, d) {
        return e >= 0 && e < 6 ? "पहाटे" : e < 12 ? "सकाळी" : e < 17 ? "दुपारी" : e < 20 ? "सायंकाळी" : "रात्री";
      }, week: { dow: 0, doy: 6 } });
      l.defineLocale("ms-my", { months: "Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split("_"), monthsShort: "Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"), weekdays: "Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"), weekdaysShort: "Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"), weekdaysMin: "Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"), longDateFormat: { LT: "HH.mm", LTS: "HH.mm.ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY [pukul] HH.mm", LLLL: "dddd, D MMMM YYYY [pukul] HH.mm" }, meridiemParse: /pagi|tengahari|petang|malam/, meridiemHour: function(e, n) {
        if (e === 12 && (e = 0), n === "pagi") return e;
        if (n === "tengahari") return e >= 11 ? e : e + 12;
        if (n === "petang" || n === "malam") return e + 12;
      }, meridiem: function(e, n, d) {
        return e < 11 ? "pagi" : e < 15 ? "tengahari" : e < 19 ? "petang" : "malam";
      }, calendar: { sameDay: "[Hari ini pukul] LT", nextDay: "[Esok pukul] LT", nextWeek: "dddd [pukul] LT", lastDay: "[Kelmarin pukul] LT", lastWeek: "dddd [lepas pukul] LT", sameElse: "L" }, relativeTime: { future: "dalam %s", past: "%s yang lepas", s: "beberapa saat", ss: "%d saat", m: "seminit", mm: "%d minit", h: "sejam", hh: "%d jam", d: "sehari", dd: "%d hari", M: "sebulan", MM: "%d bulan", y: "setahun", yy: "%d tahun" }, week: { dow: 1, doy: 7 } });
      l.defineLocale("ms", { months: "Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split("_"), monthsShort: "Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"), weekdays: "Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"), weekdaysShort: "Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"), weekdaysMin: "Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"), longDateFormat: { LT: "HH.mm", LTS: "HH.mm.ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY [pukul] HH.mm", LLLL: "dddd, D MMMM YYYY [pukul] HH.mm" }, meridiemParse: /pagi|tengahari|petang|malam/, meridiemHour: function(e, n) {
        if (e === 12 && (e = 0), n === "pagi") return e;
        if (n === "tengahari") return e >= 11 ? e : e + 12;
        if (n === "petang" || n === "malam") return e + 12;
      }, meridiem: function(e, n, d) {
        return e < 11 ? "pagi" : e < 15 ? "tengahari" : e < 19 ? "petang" : "malam";
      }, calendar: { sameDay: "[Hari ini pukul] LT", nextDay: "[Esok pukul] LT", nextWeek: "dddd [pukul] LT", lastDay: "[Kelmarin pukul] LT", lastWeek: "dddd [lepas pukul] LT", sameElse: "L" }, relativeTime: { future: "dalam %s", past: "%s yang lepas", s: "beberapa saat", ss: "%d saat", m: "seminit", mm: "%d minit", h: "sejam", hh: "%d jam", d: "sehari", dd: "%d hari", M: "sebulan", MM: "%d bulan", y: "setahun", yy: "%d tahun" }, week: { dow: 1, doy: 7 } });
      l.defineLocale("mt", { months: "Jannar_Frar_Marzu_April_Mejju_Ġunju_Lulju_Awwissu_Settembru_Ottubru_Novembru_Diċembru".split("_"), monthsShort: "Jan_Fra_Mar_Apr_Mej_Ġun_Lul_Aww_Set_Ott_Nov_Diċ".split("_"), weekdays: "Il-Ħadd_It-Tnejn_It-Tlieta_L-Erbgħa_Il-Ħamis_Il-Ġimgħa_Is-Sibt".split("_"), weekdaysShort: "Ħad_Tne_Tli_Erb_Ħam_Ġim_Sib".split("_"), weekdaysMin: "Ħa_Tn_Tl_Er_Ħa_Ġi_Si".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[Illum fil-]LT", nextDay: "[Għada fil-]LT", nextWeek: "dddd [fil-]LT", lastDay: "[Il-bieraħ fil-]LT", lastWeek: "dddd [li għadda] [fil-]LT", sameElse: "L" }, relativeTime: { future: "f’ %s", past: "%s ilu", s: "ftit sekondi", ss: "%d sekondi", m: "minuta", mm: "%d minuti", h: "siegħa", hh: "%d siegħat", d: "ġurnata", dd: "%d ġranet", M: "xahar", MM: "%d xhur", y: "sena", yy: "%d sni" }, dayOfMonthOrdinalParse: /\d{1,2}º/, ordinal: "%dº", week: { dow: 1, doy: 4 } });
      var Dd = { 1: "၁", 2: "၂", 3: "၃", 4: "၄", 5: "၅", 6: "၆", 7: "၇", 8: "၈", 9: "၉", 0: "၀" }, Ts = { "၁": "1", "၂": "2", "၃": "3", "၄": "4", "၅": "5", "၆": "6", "၇": "7", "၈": "8", "၉": "9", "၀": "0" };
      l.defineLocale("my", { months: "ဇန်နဝါရီ_ဖေဖော်ဝါရီ_မတ်_ဧပြီ_မေ_ဇွန်_ဇူလိုင်_သြဂုတ်_စက်တင်ဘာ_အောက်တိုဘာ_နိုဝင်ဘာ_ဒီဇင်ဘာ".split("_"), monthsShort: "ဇန်_ဖေ_မတ်_ပြီ_မေ_ဇွန်_လိုင်_သြ_စက်_အောက်_နို_ဒီ".split("_"), weekdays: "တနင်္ဂနွေ_တနင်္လာ_အင်္ဂါ_ဗုဒ္ဓဟူး_ကြာသပတေး_သောကြာ_စနေ".split("_"), weekdaysShort: "နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ".split("_"), weekdaysMin: "နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, calendar: { sameDay: "[ယနေ.] LT [မှာ]", nextDay: "[မနက်ဖြန်] LT [မှာ]", nextWeek: "dddd LT [မှာ]", lastDay: "[မနေ.က] LT [မှာ]", lastWeek: "[ပြီးခဲ့သော] dddd LT [မှာ]", sameElse: "L" }, relativeTime: { future: "လာမည့် %s မှာ", past: "လွန်ခဲ့သော %s က", s: "စက္ကန်.အနည်းငယ်", ss: "%d စက္ကန့်", m: "တစ်မိနစ်", mm: "%d မိနစ်", h: "တစ်နာရီ", hh: "%d နာရီ", d: "တစ်ရက်", dd: "%d ရက်", M: "တစ်လ", MM: "%d လ", y: "တစ်နှစ်", yy: "%d နှစ်" }, preparse: function(e) {
        return e.replace(/[၁၂၃၄၅၆၇၈၉၀]/g, function(n) {
          return Ts[n];
        });
      }, postformat: function(e) {
        return e.replace(/\d/g, function(n) {
          return Dd[n];
        });
      }, week: { dow: 1, doy: 4 } });
      l.defineLocale("nb", { months: "januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"), monthsShort: "jan._feb._mars_apr._mai_juni_juli_aug._sep._okt._nov._des.".split("_"), monthsParseExact: true, weekdays: "søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"), weekdaysShort: "sø._ma._ti._on._to._fr._lø.".split("_"), weekdaysMin: "sø_ma_ti_on_to_fr_lø".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY [kl.] HH:mm", LLLL: "dddd D. MMMM YYYY [kl.] HH:mm" }, calendar: { sameDay: "[i dag kl.] LT", nextDay: "[i morgen kl.] LT", nextWeek: "dddd [kl.] LT", lastDay: "[i går kl.] LT", lastWeek: "[forrige] dddd [kl.] LT", sameElse: "L" }, relativeTime: { future: "om %s", past: "%s siden", s: "noen sekunder", ss: "%d sekunder", m: "ett minutt", mm: "%d minutter", h: "én time", hh: "%d timer", d: "én dag", dd: "%d dager", w: "én uke", ww: "%d uker", M: "én måned", MM: "%d måneder", y: "ett år", yy: "%d år" }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } });
      var En = { 1: "१", 2: "२", 3: "३", 4: "४", 5: "५", 6: "६", 7: "७", 8: "८", 9: "९", 0: "०" }, Dc = { "१": "1", "२": "2", "३": "3", "४": "4", "५": "5", "६": "6", "७": "7", "८": "8", "९": "9", "०": "0" };
      l.defineLocale("ne", { months: "जनवरी_फेब्रुवरी_मार्च_अप्रिल_मई_जुन_जुलाई_अगष्ट_सेप्टेम्बर_अक्टोबर_नोभेम्बर_डिसेम्बर".split("_"), monthsShort: "जन._फेब्रु._मार्च_अप्रि._मई_जुन_जुलाई._अग._सेप्ट._अक्टो._नोभे._डिसे.".split("_"), monthsParseExact: true, weekdays: "आइतबार_सोमबार_मङ्गलबार_बुधबार_बिहिबार_शुक्रबार_शनिबार".split("_"), weekdaysShort: "आइत._सोम._मङ्गल._बुध._बिहि._शुक्र._शनि.".split("_"), weekdaysMin: "आ._सो._मं._बु._बि._शु._श.".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "Aको h:mm बजे", LTS: "Aको h:mm:ss बजे", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, Aको h:mm बजे", LLLL: "dddd, D MMMM YYYY, Aको h:mm बजे" }, preparse: function(e) {
        return e.replace(/[१२३४५६७८९०]/g, function(n) {
          return Dc[n];
        });
      }, postformat: function(e) {
        return e.replace(/\d/g, function(n) {
          return En[n];
        });
      }, meridiemParse: /राति|बिहान|दिउँसो|साँझ/, meridiemHour: function(e, n) {
        if (e === 12 && (e = 0), n === "राति") return e < 4 ? e : e + 12;
        if (n === "बिहान") return e;
        if (n === "दिउँसो") return e >= 10 ? e : e + 12;
        if (n === "साँझ") return e + 12;
      }, meridiem: function(e, n, d) {
        return e < 3 ? "राति" : e < 12 ? "बिहान" : e < 16 ? "दिउँसो" : e < 20 ? "साँझ" : "राति";
      }, calendar: { sameDay: "[आज] LT", nextDay: "[भोलि] LT", nextWeek: "[आउँदो] dddd[,] LT", lastDay: "[हिजो] LT", lastWeek: "[गएको] dddd[,] LT", sameElse: "L" }, relativeTime: { future: "%sमा", past: "%s अगाडि", s: "केही क्षण", ss: "%d सेकेण्ड", m: "एक मिनेट", mm: "%d मिनेट", h: "एक घण्टा", hh: "%d घण्टा", d: "एक दिन", dd: "%d दिन", M: "एक महिना", MM: "%d महिना", y: "एक बर्ष", yy: "%d बर्ष" }, week: { dow: 0, doy: 6 } });
      var mo = "jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_"), Yc = "jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_"), co = [/^jan/i, /^feb/i, /^(maart|mrt\.?)$/i, /^apr/i, /^mei$/i, /^jun[i.]?$/i, /^jul[i.]?$/i, /^aug/i, /^sep/i, /^okt/i, /^nov/i, /^dec/i], Yd = /^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;
      l.defineLocale("nl-be", { months: "januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"), monthsShort: function(e, n) {
        return e ? /-MMM-/.test(n) ? Yc[e.month()] : mo[e.month()] : mo;
      }, monthsRegex: Yd, monthsShortRegex: Yd, monthsStrictRegex: /^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december)/i, monthsShortStrictRegex: /^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i, monthsParse: co, longMonthsParse: co, shortMonthsParse: co, weekdays: "zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"), weekdaysShort: "zo._ma._di._wo._do._vr._za.".split("_"), weekdaysMin: "zo_ma_di_wo_do_vr_za".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, calendar: { sameDay: "[vandaag om] LT", nextDay: "[morgen om] LT", nextWeek: "dddd [om] LT", lastDay: "[gisteren om] LT", lastWeek: "[afgelopen] dddd [om] LT", sameElse: "L" }, relativeTime: { future: "over %s", past: "%s geleden", s: "een paar seconden", ss: "%d seconden", m: "één minuut", mm: "%d minuten", h: "één uur", hh: "%d uur", d: "één dag", dd: "%d dagen", M: "één maand", MM: "%d maanden", y: "één jaar", yy: "%d jaar" }, dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/, ordinal: function(e) {
        return e + (e === 1 || e === 8 || e >= 20 ? "ste" : "de");
      }, week: { dow: 1, doy: 4 } });
      var Cd = "jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_"), Cc = "jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_"), go = [/^jan/i, /^feb/i, /^(maart|mrt\.?)$/i, /^apr/i, /^mei$/i, /^jun[i.]?$/i, /^jul[i.]?$/i, /^aug/i, /^sep/i, /^okt/i, /^nov/i, /^dec/i], Sd = /^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;
      l.defineLocale("nl", { months: "januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"), monthsShort: function(e, n) {
        return e ? /-MMM-/.test(n) ? Cc[e.month()] : Cd[e.month()] : Cd;
      }, monthsRegex: Sd, monthsShortRegex: Sd, monthsStrictRegex: /^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december)/i, monthsShortStrictRegex: /^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i, monthsParse: go, longMonthsParse: go, shortMonthsParse: go, weekdays: "zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"), weekdaysShort: "zo._ma._di._wo._do._vr._za.".split("_"), weekdaysMin: "zo_ma_di_wo_do_vr_za".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD-MM-YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, calendar: { sameDay: "[vandaag om] LT", nextDay: "[morgen om] LT", nextWeek: "dddd [om] LT", lastDay: "[gisteren om] LT", lastWeek: "[afgelopen] dddd [om] LT", sameElse: "L" }, relativeTime: { future: "over %s", past: "%s geleden", s: "een paar seconden", ss: "%d seconden", m: "één minuut", mm: "%d minuten", h: "één uur", hh: "%d uur", d: "één dag", dd: "%d dagen", w: "één week", ww: "%d weken", M: "één maand", MM: "%d maanden", y: "één jaar", yy: "%d jaar" }, dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/, ordinal: function(e) {
        return e + (e === 1 || e === 8 || e >= 20 ? "ste" : "de");
      }, week: { dow: 1, doy: 4 } });
      l.defineLocale("nn", { months: "januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"), monthsShort: "jan._feb._mars_apr._mai_juni_juli_aug._sep._okt._nov._des.".split("_"), monthsParseExact: true, weekdays: "sundag_måndag_tysdag_onsdag_torsdag_fredag_laurdag".split("_"), weekdaysShort: "su._må._ty._on._to._fr._lau.".split("_"), weekdaysMin: "su_må_ty_on_to_fr_la".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY [kl.] H:mm", LLLL: "dddd D. MMMM YYYY [kl.] HH:mm" }, calendar: { sameDay: "[I dag klokka] LT", nextDay: "[I morgon klokka] LT", nextWeek: "dddd [klokka] LT", lastDay: "[I går klokka] LT", lastWeek: "[Føregåande] dddd [klokka] LT", sameElse: "L" }, relativeTime: { future: "om %s", past: "%s sidan", s: "nokre sekund", ss: "%d sekund", m: "eit minutt", mm: "%d minutt", h: "ein time", hh: "%d timar", d: "ein dag", dd: "%d dagar", w: "ei veke", ww: "%d veker", M: "ein månad", MM: "%d månader", y: "eit år", yy: "%d år" }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } });
      l.defineLocale("oc-lnc", { months: { standalone: "genièr_febrièr_març_abril_mai_junh_julhet_agost_setembre_octòbre_novembre_decembre".split("_"), format: "de genièr_de febrièr_de març_d'abril_de mai_de junh_de julhet_d'agost_de setembre_d'octòbre_de novembre_de decembre".split("_"), isFormat: /D[oD]?(\s)+MMMM/ }, monthsShort: "gen._febr._març_abr._mai_junh_julh._ago._set._oct._nov._dec.".split("_"), monthsParseExact: true, weekdays: "dimenge_diluns_dimars_dimècres_dijòus_divendres_dissabte".split("_"), weekdaysShort: "dg._dl._dm._dc._dj._dv._ds.".split("_"), weekdaysMin: "dg_dl_dm_dc_dj_dv_ds".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM [de] YYYY", ll: "D MMM YYYY", LLL: "D MMMM [de] YYYY [a] H:mm", lll: "D MMM YYYY, H:mm", LLLL: "dddd D MMMM [de] YYYY [a] H:mm", llll: "ddd D MMM YYYY, H:mm" }, calendar: { sameDay: "[uèi a] LT", nextDay: "[deman a] LT", nextWeek: "dddd [a] LT", lastDay: "[ièr a] LT", lastWeek: "dddd [passat a] LT", sameElse: "L" }, relativeTime: { future: "d'aquí %s", past: "fa %s", s: "unas segondas", ss: "%d segondas", m: "una minuta", mm: "%d minutas", h: "una ora", hh: "%d oras", d: "un jorn", dd: "%d jorns", M: "un mes", MM: "%d meses", y: "un an", yy: "%d ans" }, dayOfMonthOrdinalParse: /\d{1,2}(r|n|t|è|a)/, ordinal: function(e, n) {
        var d = e === 1 ? "r" : e === 2 ? "n" : e === 3 ? "r" : e === 4 ? "t" : "è";
        return (n === "w" || n === "W") && (d = "a"), e + d;
      }, week: { dow: 1, doy: 4 } });
      var Sc = { 1: "੧", 2: "੨", 3: "੩", 4: "੪", 5: "੫", 6: "੬", 7: "੭", 8: "੮", 9: "੯", 0: "੦" }, bc = { "੧": "1", "੨": "2", "੩": "3", "੪": "4", "੫": "5", "੬": "6", "੭": "7", "੮": "8", "੯": "9", "੦": "0" };
      l.defineLocale("pa-in", { months: "ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ".split("_"), monthsShort: "ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ".split("_"), weekdays: "ਐਤਵਾਰ_ਸੋਮਵਾਰ_ਮੰਗਲਵਾਰ_ਬੁਧਵਾਰ_ਵੀਰਵਾਰ_ਸ਼ੁੱਕਰਵਾਰ_ਸ਼ਨੀਚਰਵਾਰ".split("_"), weekdaysShort: "ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ".split("_"), weekdaysMin: "ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ".split("_"), longDateFormat: { LT: "A h:mm ਵਜੇ", LTS: "A h:mm:ss ਵਜੇ", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, A h:mm ਵਜੇ", LLLL: "dddd, D MMMM YYYY, A h:mm ਵਜੇ" }, calendar: { sameDay: "[ਅਜ] LT", nextDay: "[ਕਲ] LT", nextWeek: "[ਅਗਲਾ] dddd, LT", lastDay: "[ਕਲ] LT", lastWeek: "[ਪਿਛਲੇ] dddd, LT", sameElse: "L" }, relativeTime: { future: "%s ਵਿੱਚ", past: "%s ਪਿਛਲੇ", s: "ਕੁਝ ਸਕਿੰਟ", ss: "%d ਸਕਿੰਟ", m: "ਇਕ ਮਿੰਟ", mm: "%d ਮਿੰਟ", h: "ਇੱਕ ਘੰਟਾ", hh: "%d ਘੰਟੇ", d: "ਇੱਕ ਦਿਨ", dd: "%d ਦਿਨ", M: "ਇੱਕ ਮਹੀਨਾ", MM: "%d ਮਹੀਨੇ", y: "ਇੱਕ ਸਾਲ", yy: "%d ਸਾਲ" }, preparse: function(e) {
        return e.replace(/[੧੨੩੪੫੬੭੮੯੦]/g, function(n) {
          return bc[n];
        });
      }, postformat: function(e) {
        return e.replace(/\d/g, function(n) {
          return Sc[n];
        });
      }, meridiemParse: /ਰਾਤ|ਸਵੇਰ|ਦੁਪਹਿਰ|ਸ਼ਾਮ/, meridiemHour: function(e, n) {
        if (e === 12 && (e = 0), n === "ਰਾਤ") return e < 4 ? e : e + 12;
        if (n === "ਸਵੇਰ") return e;
        if (n === "ਦੁਪਹਿਰ") return e >= 10 ? e : e + 12;
        if (n === "ਸ਼ਾਮ") return e + 12;
      }, meridiem: function(e, n, d) {
        return e < 4 ? "ਰਾਤ" : e < 10 ? "ਸਵੇਰ" : e < 17 ? "ਦੁਪਹਿਰ" : e < 20 ? "ਸ਼ਾਮ" : "ਰਾਤ";
      }, week: { dow: 0, doy: 6 } });
      var bd = "styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień".split("_"), Fc = "stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia".split("_"), si = [/^sty/i, /^lut/i, /^mar/i, /^kwi/i, /^maj/i, /^cze/i, /^lip/i, /^sie/i, /^wrz/i, /^paź/i, /^lis/i, /^gru/i];
      function Hn(e) {
        return e % 10 < 5 && e % 10 > 1 && ~~(e / 10) % 10 !== 1;
      }
      function $s(e, n, d) {
        var u = e + " ";
        switch (d) {
          case "ss":
            return u + (Hn(e) ? "sekundy" : "sekund");
          case "m":
            return n ? "minuta" : "minutę";
          case "mm":
            return u + (Hn(e) ? "minuty" : "minut");
          case "h":
            return n ? "godzina" : "godzinę";
          case "hh":
            return u + (Hn(e) ? "godziny" : "godzin");
          case "ww":
            return u + (Hn(e) ? "tygodnie" : "tygodni");
          case "MM":
            return u + (Hn(e) ? "miesiące" : "miesięcy");
          case "yy":
            return u + (Hn(e) ? "lata" : "lat");
        }
      }
      l.defineLocale("pl", { months: function(e, n) {
        return e ? /D MMMM/.test(n) ? Fc[e.month()] : bd[e.month()] : bd;
      }, monthsShort: "sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru".split("_"), monthsParse: si, longMonthsParse: si, shortMonthsParse: si, weekdays: "niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota".split("_"), weekdaysShort: "ndz_pon_wt_śr_czw_pt_sob".split("_"), weekdaysMin: "Nd_Pn_Wt_Śr_Cz_Pt_So".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[Dziś o] LT", nextDay: "[Jutro o] LT", nextWeek: function() {
        switch (this.day()) {
          case 0:
            return "[W niedzielę o] LT";
          case 2:
            return "[We wtorek o] LT";
          case 3:
            return "[W środę o] LT";
          case 6:
            return "[W sobotę o] LT";
          default:
            return "[W] dddd [o] LT";
        }
      }, lastDay: "[Wczoraj o] LT", lastWeek: function() {
        switch (this.day()) {
          case 0:
            return "[W zeszłą niedzielę o] LT";
          case 3:
            return "[W zeszłą środę o] LT";
          case 6:
            return "[W zeszłą sobotę o] LT";
          default:
            return "[W zeszły] dddd [o] LT";
        }
      }, sameElse: "L" }, relativeTime: { future: "za %s", past: "%s temu", s: "kilka sekund", ss: $s, m: $s, mm: $s, h: $s, hh: $s, d: "1 dzień", dd: "%d dni", w: "tydzień", ww: $s, M: "miesiąc", MM: $s, y: "rok", yy: $s }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } });
      l.defineLocale("pt-br", { months: "janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro".split("_"), monthsShort: "jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez".split("_"), weekdays: "domingo_segunda-feira_terça-feira_quarta-feira_quinta-feira_sexta-feira_sábado".split("_"), weekdaysShort: "dom_seg_ter_qua_qui_sex_sáb".split("_"), weekdaysMin: "do_2ª_3ª_4ª_5ª_6ª_sá".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D [de] MMMM [de] YYYY", LLL: "D [de] MMMM [de] YYYY [às] HH:mm", LLLL: "dddd, D [de] MMMM [de] YYYY [às] HH:mm" }, calendar: { sameDay: "[Hoje às] LT", nextDay: "[Amanhã às] LT", nextWeek: "dddd [às] LT", lastDay: "[Ontem às] LT", lastWeek: function() {
        return this.day() === 0 || this.day() === 6 ? "[Último] dddd [às] LT" : "[Última] dddd [às] LT";
      }, sameElse: "L" }, relativeTime: { future: "em %s", past: "há %s", s: "poucos segundos", ss: "%d segundos", m: "um minuto", mm: "%d minutos", h: "uma hora", hh: "%d horas", d: "um dia", dd: "%d dias", M: "um mês", MM: "%d meses", y: "um ano", yy: "%d anos" }, dayOfMonthOrdinalParse: /\d{1,2}º/, ordinal: "%dº", invalidDate: "Data inválida" });
      l.defineLocale("pt", { months: "janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro".split("_"), monthsShort: "jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez".split("_"), weekdays: "Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado".split("_"), weekdaysShort: "Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"), weekdaysMin: "Do_2ª_3ª_4ª_5ª_6ª_Sá".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D [de] MMMM [de] YYYY", LLL: "D [de] MMMM [de] YYYY HH:mm", LLLL: "dddd, D [de] MMMM [de] YYYY HH:mm" }, calendar: { sameDay: "[Hoje às] LT", nextDay: "[Amanhã às] LT", nextWeek: "dddd [às] LT", lastDay: "[Ontem às] LT", lastWeek: function() {
        return this.day() === 0 || this.day() === 6 ? "[Último] dddd [às] LT" : "[Última] dddd [às] LT";
      }, sameElse: "L" }, relativeTime: { future: "em %s", past: "há %s", s: "segundos", ss: "%d segundos", m: "um minuto", mm: "%d minutos", h: "uma hora", hh: "%d horas", d: "um dia", dd: "%d dias", w: "uma semana", ww: "%d semanas", M: "um mês", MM: "%d meses", y: "um ano", yy: "%d anos" }, dayOfMonthOrdinalParse: /\d{1,2}º/, ordinal: "%dº", week: { dow: 1, doy: 4 } });
      function Pn(e, n, d) {
        var u = { ss: "secunde", mm: "minute", hh: "ore", dd: "zile", ww: "săptămâni", MM: "luni", yy: "ani" }, f = " ";
        return (e % 100 >= 20 || e >= 100 && e % 100 === 0) && (f = " de "), e + f + u[d];
      }
      l.defineLocale("ro", { months: "ianuarie_februarie_martie_aprilie_mai_iunie_iulie_august_septembrie_octombrie_noiembrie_decembrie".split("_"), monthsShort: "ian._feb._mart._apr._mai_iun._iul._aug._sept._oct._nov._dec.".split("_"), monthsParseExact: true, weekdays: "duminică_luni_marți_miercuri_joi_vineri_sâmbătă".split("_"), weekdaysShort: "Dum_Lun_Mar_Mie_Joi_Vin_Sâm".split("_"), weekdaysMin: "Du_Lu_Ma_Mi_Jo_Vi_Sâ".split("_"), longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY H:mm", LLLL: "dddd, D MMMM YYYY H:mm" }, calendar: { sameDay: "[azi la] LT", nextDay: "[mâine la] LT", nextWeek: "dddd [la] LT", lastDay: "[ieri la] LT", lastWeek: "[fosta] dddd [la] LT", sameElse: "L" }, relativeTime: { future: "peste %s", past: "%s în urmă", s: "câteva secunde", ss: Pn, m: "un minut", mm: Pn, h: "o oră", hh: Pn, d: "o zi", dd: Pn, w: "o săptămână", ww: Pn, M: "o lună", MM: Pn, y: "un an", yy: Pn }, week: { dow: 1, doy: 7 } });
      function xc(e, n) {
        var d = e.split("_");
        return n % 10 === 1 && n % 100 !== 11 ? d[0] : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? d[1] : d[2];
      }
      function _n(e, n, d) {
        var u = { ss: n ? "секунда_секунды_секунд" : "секунду_секунды_секунд", mm: n ? "минута_минуты_минут" : "минуту_минуты_минут", hh: "час_часа_часов", dd: "день_дня_дней", ww: "неделя_недели_недель", MM: "месяц_месяца_месяцев", yy: "год_года_лет" };
        return d === "m" ? n ? "минута" : "минуту" : e + " " + xc(u[d], +e);
      }
      var ni = [/^янв/i, /^фев/i, /^мар/i, /^апр/i, /^ма[йя]/i, /^июн/i, /^июл/i, /^авг/i, /^сен/i, /^окт/i, /^ноя/i, /^дек/i];
      l.defineLocale("ru", { months: { format: "января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря".split("_"), standalone: "январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_") }, monthsShort: { format: "янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.".split("_"), standalone: "янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.".split("_") }, weekdays: { standalone: "воскресенье_понедельник_вторник_среда_четверг_пятница_суббота".split("_"), format: "воскресенье_понедельник_вторник_среду_четверг_пятницу_субботу".split("_"), isFormat: /\[ ?[Вв] ?(?:прошлую|следующую|эту)? ?] ?dddd/ }, weekdaysShort: "вс_пн_вт_ср_чт_пт_сб".split("_"), weekdaysMin: "вс_пн_вт_ср_чт_пт_сб".split("_"), monthsParse: ni, longMonthsParse: ni, shortMonthsParse: ni, monthsRegex: /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i, monthsShortRegex: /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i, monthsStrictRegex: /^(январ[яь]|феврал[яь]|марта?|апрел[яь]|ма[яй]|июн[яь]|июл[яь]|августа?|сентябр[яь]|октябр[яь]|ноябр[яь]|декабр[яь])/i, monthsShortStrictRegex: /^(янв\.|февр?\.|мар[т.]|апр\.|ма[яй]|июн[ья.]|июл[ья.]|авг\.|сент?\.|окт\.|нояб?\.|дек\.)/i, longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY г.", LLL: "D MMMM YYYY г., H:mm", LLLL: "dddd, D MMMM YYYY г., H:mm" }, calendar: { sameDay: "[Сегодня, в] LT", nextDay: "[Завтра, в] LT", lastDay: "[Вчера, в] LT", nextWeek: function(e) {
        if (e.week() !== this.week()) switch (this.day()) {
          case 0:
            return "[В следующее] dddd, [в] LT";
          case 1:
          case 2:
          case 4:
            return "[В следующий] dddd, [в] LT";
          case 3:
          case 5:
          case 6:
            return "[В следующую] dddd, [в] LT";
        }
        else return this.day() === 2 ? "[Во] dddd, [в] LT" : "[В] dddd, [в] LT";
      }, lastWeek: function(e) {
        if (e.week() !== this.week()) switch (this.day()) {
          case 0:
            return "[В прошлое] dddd, [в] LT";
          case 1:
          case 2:
          case 4:
            return "[В прошлый] dddd, [в] LT";
          case 3:
          case 5:
          case 6:
            return "[В прошлую] dddd, [в] LT";
        }
        else return this.day() === 2 ? "[Во] dddd, [в] LT" : "[В] dddd, [в] LT";
      }, sameElse: "L" }, relativeTime: { future: "через %s", past: "%s назад", s: "несколько секунд", ss: _n, m: _n, mm: _n, h: "час", hh: _n, d: "день", dd: _n, w: "неделя", ww: _n, M: "месяц", MM: _n, y: "год", yy: _n }, meridiemParse: /ночи|утра|дня|вечера/i, isPM: function(e) {
        return /^(дня|вечера)$/.test(e);
      }, meridiem: function(e, n, d) {
        return e < 4 ? "ночи" : e < 12 ? "утра" : e < 17 ? "дня" : "вечера";
      }, dayOfMonthOrdinalParse: /\d{1,2}-(й|го|я)/, ordinal: function(e, n) {
        switch (n) {
          case "M":
          case "d":
          case "DDD":
            return e + "-й";
          case "D":
            return e + "-го";
          case "w":
          case "W":
            return e + "-я";
          default:
            return e;
        }
      }, week: { dow: 1, doy: 4 } });
      var Fd = ["جنوري", "فيبروري", "مارچ", "اپريل", "مئي", "جون", "جولاءِ", "آگسٽ", "سيپٽمبر", "آڪٽوبر", "نومبر", "ڊسمبر"], ho = ["آچر", "سومر", "اڱارو", "اربع", "خميس", "جمع", "ڇنڇر"];
      l.defineLocale("sd", { months: Fd, monthsShort: Fd, weekdays: ho, weekdaysShort: ho, weekdaysMin: ho, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd، D MMMM YYYY HH:mm" }, meridiemParse: /صبح|شام/, isPM: function(e) {
        return e === "شام";
      }, meridiem: function(e, n, d) {
        return e < 12 ? "صبح" : "شام";
      }, calendar: { sameDay: "[اڄ] LT", nextDay: "[سڀاڻي] LT", nextWeek: "dddd [اڳين هفتي تي] LT", lastDay: "[ڪالهه] LT", lastWeek: "[گزريل هفتي] dddd [تي] LT", sameElse: "L" }, relativeTime: { future: "%s پوء", past: "%s اڳ", s: "چند سيڪنڊ", ss: "%d سيڪنڊ", m: "هڪ منٽ", mm: "%d منٽ", h: "هڪ ڪلاڪ", hh: "%d ڪلاڪ", d: "هڪ ڏينهن", dd: "%d ڏينهن", M: "هڪ مهينو", MM: "%d مهينا", y: "هڪ سال", yy: "%d سال" }, preparse: function(e) {
        return e.replace(/،/g, ",");
      }, postformat: function(e) {
        return e.replace(/,/g, "،");
      }, week: { dow: 1, doy: 4 } });
      l.defineLocale("se", { months: "ođđajagemánnu_guovvamánnu_njukčamánnu_cuoŋománnu_miessemánnu_geassemánnu_suoidnemánnu_borgemánnu_čakčamánnu_golggotmánnu_skábmamánnu_juovlamánnu".split("_"), monthsShort: "ođđj_guov_njuk_cuo_mies_geas_suoi_borg_čakč_golg_skáb_juov".split("_"), weekdays: "sotnabeaivi_vuossárga_maŋŋebárga_gaskavahkku_duorastat_bearjadat_lávvardat".split("_"), weekdaysShort: "sotn_vuos_maŋ_gask_duor_bear_láv".split("_"), weekdaysMin: "s_v_m_g_d_b_L".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "MMMM D. [b.] YYYY", LLL: "MMMM D. [b.] YYYY [ti.] HH:mm", LLLL: "dddd, MMMM D. [b.] YYYY [ti.] HH:mm" }, calendar: { sameDay: "[otne ti] LT", nextDay: "[ihttin ti] LT", nextWeek: "dddd [ti] LT", lastDay: "[ikte ti] LT", lastWeek: "[ovddit] dddd [ti] LT", sameElse: "L" }, relativeTime: { future: "%s geažes", past: "maŋit %s", s: "moadde sekunddat", ss: "%d sekunddat", m: "okta minuhta", mm: "%d minuhtat", h: "okta diimmu", hh: "%d diimmut", d: "okta beaivi", dd: "%d beaivvit", M: "okta mánnu", MM: "%d mánut", y: "okta jahki", yy: "%d jagit" }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } });
      l.defineLocale("si", { months: "ජනවාරි_පෙබරවාරි_මාර්තු_අප්‍රේල්_මැයි_ජූනි_ජූලි_අගෝස්තු_සැප්තැම්බර්_ඔක්තෝබර්_නොවැම්බර්_දෙසැම්බර්".split("_"), monthsShort: "ජන_පෙබ_මාර්_අප්_මැයි_ජූනි_ජූලි_අගෝ_සැප්_ඔක්_නොවැ_දෙසැ".split("_"), weekdays: "ඉරිදා_සඳුදා_අඟහරුවාදා_බදාදා_බ්‍රහස්පතින්දා_සිකුරාදා_සෙනසුරාදා".split("_"), weekdaysShort: "ඉරි_සඳු_අඟ_බදා_බ්‍රහ_සිකු_සෙන".split("_"), weekdaysMin: "ඉ_ස_අ_බ_බ්‍ර_සි_සෙ".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "a h:mm", LTS: "a h:mm:ss", L: "YYYY/MM/DD", LL: "YYYY MMMM D", LLL: "YYYY MMMM D, a h:mm", LLLL: "YYYY MMMM D [වැනි] dddd, a h:mm:ss" }, calendar: { sameDay: "[අද] LT[ට]", nextDay: "[හෙට] LT[ට]", nextWeek: "dddd LT[ට]", lastDay: "[ඊයේ] LT[ට]", lastWeek: "[පසුගිය] dddd LT[ට]", sameElse: "L" }, relativeTime: { future: "%sකින්", past: "%sකට පෙර", s: "තත්පර කිහිපය", ss: "තත්පර %d", m: "මිනිත්තුව", mm: "මිනිත්තු %d", h: "පැය", hh: "පැය %d", d: "දිනය", dd: "දින %d", M: "මාසය", MM: "මාස %d", y: "වසර", yy: "වසර %d" }, dayOfMonthOrdinalParse: /\d{1,2} වැනි/, ordinal: function(e) {
        return e + " වැනි";
      }, meridiemParse: /පෙර වරු|පස් වරු|පෙ.ව|ප.ව./, isPM: function(e) {
        return e === "ප.ව." || e === "පස් වරු";
      }, meridiem: function(e, n, d) {
        return e > 11 ? d ? "ප.ව." : "පස් වරු" : d ? "පෙ.ව." : "පෙර වරු";
      } });
      var Nc = "január_február_marec_apríl_máj_jún_júl_august_september_október_november_december".split("_"), Ac = "jan_feb_mar_apr_máj_jún_júl_aug_sep_okt_nov_dec".split("_");
      function La(e) {
        return e > 1 && e < 5;
      }
      function Gt(e, n, d, u) {
        var f = e + " ";
        switch (d) {
          case "s":
            return n || u ? "pár sekúnd" : "pár sekundami";
          case "ss":
            return n || u ? f + (La(e) ? "sekundy" : "sekúnd") : f + "sekundami";
          case "m":
            return n ? "minúta" : u ? "minútu" : "minútou";
          case "mm":
            return n || u ? f + (La(e) ? "minúty" : "minút") : f + "minútami";
          case "h":
            return n ? "hodina" : u ? "hodinu" : "hodinou";
          case "hh":
            return n || u ? f + (La(e) ? "hodiny" : "hodín") : f + "hodinami";
          case "d":
            return n || u ? "deň" : "dňom";
          case "dd":
            return n || u ? f + (La(e) ? "dni" : "dní") : f + "dňami";
          case "M":
            return n || u ? "mesiac" : "mesiacom";
          case "MM":
            return n || u ? f + (La(e) ? "mesiace" : "mesiacov") : f + "mesiacmi";
          case "y":
            return n || u ? "rok" : "rokom";
          case "yy":
            return n || u ? f + (La(e) ? "roky" : "rokov") : f + "rokmi";
        }
      }
      l.defineLocale("sk", { months: Nc, monthsShort: Ac, weekdays: "nedeľa_pondelok_utorok_streda_štvrtok_piatok_sobota".split("_"), weekdaysShort: "ne_po_ut_st_št_pi_so".split("_"), weekdaysMin: "ne_po_ut_st_št_pi_so".split("_"), longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY H:mm", LLLL: "dddd D. MMMM YYYY H:mm" }, calendar: { sameDay: "[dnes o] LT", nextDay: "[zajtra o] LT", nextWeek: function() {
        switch (this.day()) {
          case 0:
            return "[v nedeľu o] LT";
          case 1:
          case 2:
            return "[v] dddd [o] LT";
          case 3:
            return "[v stredu o] LT";
          case 4:
            return "[vo štvrtok o] LT";
          case 5:
            return "[v piatok o] LT";
          case 6:
            return "[v sobotu o] LT";
        }
      }, lastDay: "[včera o] LT", lastWeek: function() {
        switch (this.day()) {
          case 0:
            return "[minulú nedeľu o] LT";
          case 1:
          case 2:
            return "[minulý] dddd [o] LT";
          case 3:
            return "[minulú stredu o] LT";
          case 4:
          case 5:
            return "[minulý] dddd [o] LT";
          case 6:
            return "[minulú sobotu o] LT";
        }
      }, sameElse: "L" }, relativeTime: { future: "za %s", past: "pred %s", s: Gt, ss: Gt, m: Gt, mm: Gt, h: Gt, hh: Gt, d: Gt, dd: Gt, M: Gt, MM: Gt, y: Gt, yy: Gt }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } });
      function Ie(e, n, d, u) {
        var f = e + " ";
        switch (d) {
          case "s":
            return n || u ? "nekaj sekund" : "nekaj sekundami";
          case "ss":
            return e === 1 ? f += n ? "sekundo" : "sekundi" : e === 2 ? f += n || u ? "sekundi" : "sekundah" : e < 5 ? f += n || u ? "sekunde" : "sekundah" : f += "sekund", f;
          case "m":
            return n ? "ena minuta" : "eno minuto";
          case "mm":
            return e === 1 ? f += n ? "minuta" : "minuto" : e === 2 ? f += n || u ? "minuti" : "minutama" : e < 5 ? f += n || u ? "minute" : "minutami" : f += n || u ? "minut" : "minutami", f;
          case "h":
            return n ? "ena ura" : "eno uro";
          case "hh":
            return e === 1 ? f += n ? "ura" : "uro" : e === 2 ? f += n || u ? "uri" : "urama" : e < 5 ? f += n || u ? "ure" : "urami" : f += n || u ? "ur" : "urami", f;
          case "d":
            return n || u ? "en dan" : "enim dnem";
          case "dd":
            return e === 1 ? f += n || u ? "dan" : "dnem" : e === 2 ? f += n || u ? "dni" : "dnevoma" : f += n || u ? "dni" : "dnevi", f;
          case "M":
            return n || u ? "en mesec" : "enim mesecem";
          case "MM":
            return e === 1 ? f += n || u ? "mesec" : "mesecem" : e === 2 ? f += n || u ? "meseca" : "mesecema" : e < 5 ? f += n || u ? "mesece" : "meseci" : f += n || u ? "mesecev" : "meseci", f;
          case "y":
            return n || u ? "eno leto" : "enim letom";
          case "yy":
            return e === 1 ? f += n || u ? "leto" : "letom" : e === 2 ? f += n || u ? "leti" : "letoma" : e < 5 ? f += n || u ? "leta" : "leti" : f += n || u ? "let" : "leti", f;
        }
      }
      l.defineLocale("sl", { months: "januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december".split("_"), monthsShort: "jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.".split("_"), monthsParseExact: true, weekdays: "nedelja_ponedeljek_torek_sreda_četrtek_petek_sobota".split("_"), weekdaysShort: "ned._pon._tor._sre._čet._pet._sob.".split("_"), weekdaysMin: "ne_po_to_sr_če_pe_so".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "DD. MM. YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY H:mm", LLLL: "dddd, D. MMMM YYYY H:mm" }, calendar: { sameDay: "[danes ob] LT", nextDay: "[jutri ob] LT", nextWeek: function() {
        switch (this.day()) {
          case 0:
            return "[v] [nedeljo] [ob] LT";
          case 3:
            return "[v] [sredo] [ob] LT";
          case 6:
            return "[v] [soboto] [ob] LT";
          case 1:
          case 2:
          case 4:
          case 5:
            return "[v] dddd [ob] LT";
        }
      }, lastDay: "[včeraj ob] LT", lastWeek: function() {
        switch (this.day()) {
          case 0:
            return "[prejšnjo] [nedeljo] [ob] LT";
          case 3:
            return "[prejšnjo] [sredo] [ob] LT";
          case 6:
            return "[prejšnjo] [soboto] [ob] LT";
          case 1:
          case 2:
          case 4:
          case 5:
            return "[prejšnji] dddd [ob] LT";
        }
      }, sameElse: "L" }, relativeTime: { future: "čez %s", past: "pred %s", s: Ie, ss: Ie, m: Ie, mm: Ie, h: Ie, hh: Ie, d: Ie, dd: Ie, M: Ie, MM: Ie, y: Ie, yy: Ie }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 7 } });
      l.defineLocale("sq", { months: "Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_Nëntor_Dhjetor".split("_"), monthsShort: "Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_Nën_Dhj".split("_"), weekdays: "E Diel_E Hënë_E Martë_E Mërkurë_E Enjte_E Premte_E Shtunë".split("_"), weekdaysShort: "Die_Hën_Mar_Mër_Enj_Pre_Sht".split("_"), weekdaysMin: "D_H_Ma_Më_E_P_Sh".split("_"), weekdaysParseExact: true, meridiemParse: /PD|MD/, isPM: function(e) {
        return e.charAt(0) === "M";
      }, meridiem: function(e, n, d) {
        return e < 12 ? "PD" : "MD";
      }, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[Sot në] LT", nextDay: "[Nesër në] LT", nextWeek: "dddd [në] LT", lastDay: "[Dje në] LT", lastWeek: "dddd [e kaluar në] LT", sameElse: "L" }, relativeTime: { future: "në %s", past: "%s më parë", s: "disa sekonda", ss: "%d sekonda", m: "një minutë", mm: "%d minuta", h: "një orë", hh: "%d orë", d: "një ditë", dd: "%d ditë", M: "një muaj", MM: "%d muaj", y: "një vit", yy: "%d vite" }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } });
      var Ht = { words: { ss: ["секунда", "секунде", "секунди"], m: ["један минут", "једног минута"], mm: ["минут", "минута", "минута"], h: ["један сат", "једног сата"], hh: ["сат", "сата", "сати"], d: ["један дан", "једног дана"], dd: ["дан", "дана", "дана"], M: ["један месец", "једног месеца"], MM: ["месец", "месеца", "месеци"], y: ["једну годину", "једне године"], yy: ["годину", "године", "година"] }, correctGrammaticalCase: function(e, n) {
        return e % 10 >= 1 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? e % 10 === 1 ? n[0] : n[1] : n[2];
      }, translate: function(e, n, d, u) {
        var f = Ht.words[d], k;
        return d.length === 1 ? d === "y" && n ? "једна година" : u || n ? f[0] : f[1] : (k = Ht.correctGrammaticalCase(e, f), d === "yy" && n && k === "годину" ? e + " година" : e + " " + k);
      } };
      l.defineLocale("sr-cyrl", { months: "јануар_фебруар_март_април_мај_јун_јул_август_септембар_октобар_новембар_децембар".split("_"), monthsShort: "јан._феб._мар._апр._мај_јун_јул_авг._сеп._окт._нов._дец.".split("_"), monthsParseExact: true, weekdays: "недеља_понедељак_уторак_среда_четвртак_петак_субота".split("_"), weekdaysShort: "нед._пон._уто._сре._чет._пет._суб.".split("_"), weekdaysMin: "не_по_ут_ср_че_пе_су".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "D. M. YYYY.", LL: "D. MMMM YYYY.", LLL: "D. MMMM YYYY. H:mm", LLLL: "dddd, D. MMMM YYYY. H:mm" }, calendar: { sameDay: "[данас у] LT", nextDay: "[сутра у] LT", nextWeek: function() {
        switch (this.day()) {
          case 0:
            return "[у] [недељу] [у] LT";
          case 3:
            return "[у] [среду] [у] LT";
          case 6:
            return "[у] [суботу] [у] LT";
          case 1:
          case 2:
          case 4:
          case 5:
            return "[у] dddd [у] LT";
        }
      }, lastDay: "[јуче у] LT", lastWeek: function() {
        var e = ["[прошле] [недеље] [у] LT", "[прошлог] [понедељка] [у] LT", "[прошлог] [уторка] [у] LT", "[прошле] [среде] [у] LT", "[прошлог] [четвртка] [у] LT", "[прошлог] [петка] [у] LT", "[прошле] [суботе] [у] LT"];
        return e[this.day()];
      }, sameElse: "L" }, relativeTime: { future: "за %s", past: "пре %s", s: "неколико секунди", ss: Ht.translate, m: Ht.translate, mm: Ht.translate, h: Ht.translate, hh: Ht.translate, d: Ht.translate, dd: Ht.translate, M: Ht.translate, MM: Ht.translate, y: Ht.translate, yy: Ht.translate }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 7 } });
      var Pt = { words: { ss: ["sekunda", "sekunde", "sekundi"], m: ["jedan minut", "jednog minuta"], mm: ["minut", "minuta", "minuta"], h: ["jedan sat", "jednog sata"], hh: ["sat", "sata", "sati"], d: ["jedan dan", "jednog dana"], dd: ["dan", "dana", "dana"], M: ["jedan mesec", "jednog meseca"], MM: ["mesec", "meseca", "meseci"], y: ["jednu godinu", "jedne godine"], yy: ["godinu", "godine", "godina"] }, correctGrammaticalCase: function(e, n) {
        return e % 10 >= 1 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? e % 10 === 1 ? n[0] : n[1] : n[2];
      }, translate: function(e, n, d, u) {
        var f = Pt.words[d], k;
        return d.length === 1 ? d === "y" && n ? "jedna godina" : u || n ? f[0] : f[1] : (k = Pt.correctGrammaticalCase(e, f), d === "yy" && n && k === "godinu" ? e + " godina" : e + " " + k);
      } };
      l.defineLocale("sr", { months: "januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar".split("_"), monthsShort: "jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.".split("_"), monthsParseExact: true, weekdays: "nedelja_ponedeljak_utorak_sreda_četvrtak_petak_subota".split("_"), weekdaysShort: "ned._pon._uto._sre._čet._pet._sub.".split("_"), weekdaysMin: "ne_po_ut_sr_če_pe_su".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "D. M. YYYY.", LL: "D. MMMM YYYY.", LLL: "D. MMMM YYYY. H:mm", LLLL: "dddd, D. MMMM YYYY. H:mm" }, calendar: { sameDay: "[danas u] LT", nextDay: "[sutra u] LT", nextWeek: function() {
        switch (this.day()) {
          case 0:
            return "[u] [nedelju] [u] LT";
          case 3:
            return "[u] [sredu] [u] LT";
          case 6:
            return "[u] [subotu] [u] LT";
          case 1:
          case 2:
          case 4:
          case 5:
            return "[u] dddd [u] LT";
        }
      }, lastDay: "[juče u] LT", lastWeek: function() {
        var e = ["[prošle] [nedelje] [u] LT", "[prošlog] [ponedeljka] [u] LT", "[prošlog] [utorka] [u] LT", "[prošle] [srede] [u] LT", "[prošlog] [četvrtka] [u] LT", "[prošlog] [petka] [u] LT", "[prošle] [subote] [u] LT"];
        return e[this.day()];
      }, sameElse: "L" }, relativeTime: { future: "za %s", past: "pre %s", s: "nekoliko sekundi", ss: Pt.translate, m: Pt.translate, mm: Pt.translate, h: Pt.translate, hh: Pt.translate, d: Pt.translate, dd: Pt.translate, M: Pt.translate, MM: Pt.translate, y: Pt.translate, yy: Pt.translate }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 7 } });
      l.defineLocale("ss", { months: "Bhimbidvwane_Indlovana_Indlov'lenkhulu_Mabasa_Inkhwekhweti_Inhlaba_Kholwane_Ingci_Inyoni_Imphala_Lweti_Ingongoni".split("_"), monthsShort: "Bhi_Ina_Inu_Mab_Ink_Inh_Kho_Igc_Iny_Imp_Lwe_Igo".split("_"), weekdays: "Lisontfo_Umsombuluko_Lesibili_Lesitsatfu_Lesine_Lesihlanu_Umgcibelo".split("_"), weekdaysShort: "Lis_Umb_Lsb_Les_Lsi_Lsh_Umg".split("_"), weekdaysMin: "Li_Us_Lb_Lt_Ls_Lh_Ug".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "h:mm A", LTS: "h:mm:ss A", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY h:mm A", LLLL: "dddd, D MMMM YYYY h:mm A" }, calendar: { sameDay: "[Namuhla nga] LT", nextDay: "[Kusasa nga] LT", nextWeek: "dddd [nga] LT", lastDay: "[Itolo nga] LT", lastWeek: "dddd [leliphelile] [nga] LT", sameElse: "L" }, relativeTime: { future: "nga %s", past: "wenteka nga %s", s: "emizuzwana lomcane", ss: "%d mzuzwana", m: "umzuzu", mm: "%d emizuzu", h: "lihora", hh: "%d emahora", d: "lilanga", dd: "%d emalanga", M: "inyanga", MM: "%d tinyanga", y: "umnyaka", yy: "%d iminyaka" }, meridiemParse: /ekuseni|emini|entsambama|ebusuku/, meridiem: function(e, n, d) {
        return e < 11 ? "ekuseni" : e < 15 ? "emini" : e < 19 ? "entsambama" : "ebusuku";
      }, meridiemHour: function(e, n) {
        if (e === 12 && (e = 0), n === "ekuseni") return e;
        if (n === "emini") return e >= 11 ? e : e + 12;
        if (n === "entsambama" || n === "ebusuku") return e === 0 ? 0 : e + 12;
      }, dayOfMonthOrdinalParse: /\d{1,2}/, ordinal: "%d", week: { dow: 1, doy: 4 } });
      l.defineLocale("sv", { months: "januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december".split("_"), monthsShort: "jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"), weekdays: "söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag".split("_"), weekdaysShort: "sön_mån_tis_ons_tor_fre_lör".split("_"), weekdaysMin: "sö_må_ti_on_to_fr_lö".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY-MM-DD", LL: "D MMMM YYYY", LLL: "D MMMM YYYY [kl.] HH:mm", LLLL: "dddd D MMMM YYYY [kl.] HH:mm", lll: "D MMM YYYY HH:mm", llll: "ddd D MMM YYYY HH:mm" }, calendar: { sameDay: "[Idag] LT", nextDay: "[Imorgon] LT", lastDay: "[Igår] LT", nextWeek: "[På] dddd LT", lastWeek: "[I] dddd[s] LT", sameElse: "L" }, relativeTime: { future: "om %s", past: "för %s sedan", s: "några sekunder", ss: "%d sekunder", m: "en minut", mm: "%d minuter", h: "en timme", hh: "%d timmar", d: "en dag", dd: "%d dagar", M: "en månad", MM: "%d månader", y: "ett år", yy: "%d år" }, dayOfMonthOrdinalParse: /\d{1,2}(\:e|\:a)/, ordinal: function(e) {
        var n = e % 10, d = ~~(e % 100 / 10) === 1 ? ":e" : n === 1 || n === 2 ? ":a" : ":e";
        return e + d;
      }, week: { dow: 1, doy: 4 } });
      l.defineLocale("sw", { months: "Januari_Februari_Machi_Aprili_Mei_Juni_Julai_Agosti_Septemba_Oktoba_Novemba_Desemba".split("_"), monthsShort: "Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ago_Sep_Okt_Nov_Des".split("_"), weekdays: "Jumapili_Jumatatu_Jumanne_Jumatano_Alhamisi_Ijumaa_Jumamosi".split("_"), weekdaysShort: "Jpl_Jtat_Jnne_Jtan_Alh_Ijm_Jmos".split("_"), weekdaysMin: "J2_J3_J4_J5_Al_Ij_J1".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "hh:mm A", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[leo saa] LT", nextDay: "[kesho saa] LT", nextWeek: "[wiki ijayo] dddd [saat] LT", lastDay: "[jana] LT", lastWeek: "[wiki iliyopita] dddd [saat] LT", sameElse: "L" }, relativeTime: { future: "%s baadaye", past: "tokea %s", s: "hivi punde", ss: "sekunde %d", m: "dakika moja", mm: "dakika %d", h: "saa limoja", hh: "masaa %d", d: "siku moja", dd: "siku %d", M: "mwezi mmoja", MM: "miezi %d", y: "mwaka mmoja", yy: "miaka %d" }, week: { dow: 1, doy: 7 } });
      var Ec = { 1: "௧", 2: "௨", 3: "௩", 4: "௪", 5: "௫", 6: "௬", 7: "௭", 8: "௮", 9: "௯", 0: "௦" }, xd = { "௧": "1", "௨": "2", "௩": "3", "௪": "4", "௫": "5", "௬": "6", "௭": "7", "௮": "8", "௯": "9", "௦": "0" };
      l.defineLocale("ta", { months: "ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்".split("_"), monthsShort: "ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்".split("_"), weekdays: "ஞாயிற்றுக்கிழமை_திங்கட்கிழமை_செவ்வாய்கிழமை_புதன்கிழமை_வியாழக்கிழமை_வெள்ளிக்கிழமை_சனிக்கிழமை".split("_"), weekdaysShort: "ஞாயிறு_திங்கள்_செவ்வாய்_புதன்_வியாழன்_வெள்ளி_சனி".split("_"), weekdaysMin: "ஞா_தி_செ_பு_வி_வெ_ச".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, HH:mm", LLLL: "dddd, D MMMM YYYY, HH:mm" }, calendar: { sameDay: "[இன்று] LT", nextDay: "[நாளை] LT", nextWeek: "dddd, LT", lastDay: "[நேற்று] LT", lastWeek: "[கடந்த வாரம்] dddd, LT", sameElse: "L" }, relativeTime: { future: "%s இல்", past: "%s முன்", s: "ஒரு சில விநாடிகள்", ss: "%d விநாடிகள்", m: "ஒரு நிமிடம்", mm: "%d நிமிடங்கள்", h: "ஒரு மணி நேரம்", hh: "%d மணி நேரம்", d: "ஒரு நாள்", dd: "%d நாட்கள்", M: "ஒரு மாதம்", MM: "%d மாதங்கள்", y: "ஒரு வருடம்", yy: "%d ஆண்டுகள்" }, dayOfMonthOrdinalParse: /\d{1,2}வது/, ordinal: function(e) {
        return e + "வது";
      }, preparse: function(e) {
        return e.replace(/[௧௨௩௪௫௬௭௮௯௦]/g, function(n) {
          return xd[n];
        });
      }, postformat: function(e) {
        return e.replace(/\d/g, function(n) {
          return Ec[n];
        });
      }, meridiemParse: /யாமம்|வைகறை|காலை|நண்பகல்|எற்பாடு|மாலை/, meridiem: function(e, n, d) {
        return e < 2 ? " யாமம்" : e < 6 ? " வைகறை" : e < 10 ? " காலை" : e < 14 ? " நண்பகல்" : e < 18 ? " எற்பாடு" : e < 22 ? " மாலை" : " யாமம்";
      }, meridiemHour: function(e, n) {
        return e === 12 && (e = 0), n === "யாமம்" ? e < 2 ? e : e + 12 : n === "வைகறை" || n === "காலை" || n === "நண்பகல்" && e >= 10 ? e : e + 12;
      }, week: { dow: 0, doy: 6 } });
      l.defineLocale("te", { months: "జనవరి_ఫిబ్రవరి_మార్చి_ఏప్రిల్_మే_జూన్_జులై_ఆగస్టు_సెప్టెంబర్_అక్టోబర్_నవంబర్_డిసెంబర్".split("_"), monthsShort: "జన._ఫిబ్ర._మార్చి_ఏప్రి._మే_జూన్_జులై_ఆగ._సెప్._అక్టో._నవ._డిసె.".split("_"), monthsParseExact: true, weekdays: "ఆదివారం_సోమవారం_మంగళవారం_బుధవారం_గురువారం_శుక్రవారం_శనివారం".split("_"), weekdaysShort: "ఆది_సోమ_మంగళ_బుధ_గురు_శుక్ర_శని".split("_"), weekdaysMin: "ఆ_సో_మం_బు_గు_శు_శ".split("_"), longDateFormat: { LT: "A h:mm", LTS: "A h:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, A h:mm", LLLL: "dddd, D MMMM YYYY, A h:mm" }, calendar: { sameDay: "[నేడు] LT", nextDay: "[రేపు] LT", nextWeek: "dddd, LT", lastDay: "[నిన్న] LT", lastWeek: "[గత] dddd, LT", sameElse: "L" }, relativeTime: { future: "%s లో", past: "%s క్రితం", s: "కొన్ని క్షణాలు", ss: "%d సెకన్లు", m: "ఒక నిమిషం", mm: "%d నిమిషాలు", h: "ఒక గంట", hh: "%d గంటలు", d: "ఒక రోజు", dd: "%d రోజులు", M: "ఒక నెల", MM: "%d నెలలు", y: "ఒక సంవత్సరం", yy: "%d సంవత్సరాలు" }, dayOfMonthOrdinalParse: /\d{1,2}వ/, ordinal: "%dవ", meridiemParse: /రాత్రి|ఉదయం|మధ్యాహ్నం|సాయంత్రం/, meridiemHour: function(e, n) {
        if (e === 12 && (e = 0), n === "రాత్రి") return e < 4 ? e : e + 12;
        if (n === "ఉదయం") return e;
        if (n === "మధ్యాహ్నం") return e >= 10 ? e : e + 12;
        if (n === "సాయంత్రం") return e + 12;
      }, meridiem: function(e, n, d) {
        return e < 4 ? "రాత్రి" : e < 10 ? "ఉదయం" : e < 17 ? "మధ్యాహ్నం" : e < 20 ? "సాయంత్రం" : "రాత్రి";
      }, week: { dow: 0, doy: 6 } });
      l.defineLocale("tet", { months: "Janeiru_Fevereiru_Marsu_Abril_Maiu_Juñu_Jullu_Agustu_Setembru_Outubru_Novembru_Dezembru".split("_"), monthsShort: "Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"), weekdays: "Domingu_Segunda_Tersa_Kuarta_Kinta_Sesta_Sabadu".split("_"), weekdaysShort: "Dom_Seg_Ters_Kua_Kint_Sest_Sab".split("_"), weekdaysMin: "Do_Seg_Te_Ku_Ki_Ses_Sa".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[Ohin iha] LT", nextDay: "[Aban iha] LT", nextWeek: "dddd [iha] LT", lastDay: "[Horiseik iha] LT", lastWeek: "dddd [semana kotuk] [iha] LT", sameElse: "L" }, relativeTime: { future: "iha %s", past: "%s liuba", s: "segundu balun", ss: "segundu %d", m: "minutu ida", mm: "minutu %d", h: "oras ida", hh: "oras %d", d: "loron ida", dd: "loron %d", M: "fulan ida", MM: "fulan %d", y: "tinan ida", yy: "tinan %d" }, dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/, ordinal: function(e) {
        var n = e % 10, d = ~~(e % 100 / 10) === 1 ? "th" : n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th";
        return e + d;
      }, week: { dow: 1, doy: 4 } });
      var fo = { 0: "-ум", 1: "-ум", 2: "-юм", 3: "-юм", 4: "-ум", 5: "-ум", 6: "-ум", 7: "-ум", 8: "-ум", 9: "-ум", 10: "-ум", 12: "-ум", 13: "-ум", 20: "-ум", 30: "-юм", 40: "-ум", 50: "-ум", 60: "-ум", 70: "-ум", 80: "-ум", 90: "-ум", 100: "-ум" };
      l.defineLocale("tg", { months: { format: "январи_феврали_марти_апрели_майи_июни_июли_августи_сентябри_октябри_ноябри_декабри".split("_"), standalone: "январ_феврал_март_апрел_май_июн_июл_август_сентябр_октябр_ноябр_декабр".split("_") }, monthsShort: "янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек".split("_"), weekdays: "якшанбе_душанбе_сешанбе_чоршанбе_панҷшанбе_ҷумъа_шанбе".split("_"), weekdaysShort: "яшб_дшб_сшб_чшб_пшб_ҷум_шнб".split("_"), weekdaysMin: "яш_дш_сш_чш_пш_ҷм_шб".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[Имрӯз соати] LT", nextDay: "[Фардо соати] LT", lastDay: "[Дирӯз соати] LT", nextWeek: "dddd[и] [ҳафтаи оянда соати] LT", lastWeek: "dddd[и] [ҳафтаи гузашта соати] LT", sameElse: "L" }, relativeTime: { future: "баъди %s", past: "%s пеш", s: "якчанд сония", m: "як дақиқа", mm: "%d дақиқа", h: "як соат", hh: "%d соат", d: "як рӯз", dd: "%d рӯз", M: "як моҳ", MM: "%d моҳ", y: "як сол", yy: "%d сол" }, meridiemParse: /шаб|субҳ|рӯз|бегоҳ/, meridiemHour: function(e, n) {
        if (e === 12 && (e = 0), n === "шаб") return e < 4 ? e : e + 12;
        if (n === "субҳ") return e;
        if (n === "рӯз") return e >= 11 ? e : e + 12;
        if (n === "бегоҳ") return e + 12;
      }, meridiem: function(e, n, d) {
        return e < 4 ? "шаб" : e < 11 ? "субҳ" : e < 16 ? "рӯз" : e < 19 ? "бегоҳ" : "шаб";
      }, dayOfMonthOrdinalParse: /\d{1,2}-(ум|юм)/, ordinal: function(e) {
        var n = e % 10, d = e >= 100 ? 100 : null;
        return e + (fo[e] || fo[n] || fo[d]);
      }, week: { dow: 1, doy: 7 } });
      l.defineLocale("th", { months: "มกราคม_กุมภาพันธ์_มีนาคม_เมษายน_พฤษภาคม_มิถุนายน_กรกฎาคม_สิงหาคม_กันยายน_ตุลาคม_พฤศจิกายน_ธันวาคม".split("_"), monthsShort: "ม.ค._ก.พ._มี.ค._เม.ย._พ.ค._มิ.ย._ก.ค._ส.ค._ก.ย._ต.ค._พ.ย._ธ.ค.".split("_"), monthsParseExact: true, weekdays: "อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัสบดี_ศุกร์_เสาร์".split("_"), weekdaysShort: "อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัส_ศุกร์_เสาร์".split("_"), weekdaysMin: "อา._จ._อ._พ._พฤ._ศ._ส.".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY เวลา H:mm", LLLL: "วันddddที่ D MMMM YYYY เวลา H:mm" }, meridiemParse: /ก่อนเที่ยง|หลังเที่ยง/, isPM: function(e) {
        return e === "หลังเที่ยง";
      }, meridiem: function(e, n, d) {
        return e < 12 ? "ก่อนเที่ยง" : "หลังเที่ยง";
      }, calendar: { sameDay: "[วันนี้ เวลา] LT", nextDay: "[พรุ่งนี้ เวลา] LT", nextWeek: "dddd[หน้า เวลา] LT", lastDay: "[เมื่อวานนี้ เวลา] LT", lastWeek: "[วัน]dddd[ที่แล้ว เวลา] LT", sameElse: "L" }, relativeTime: { future: "อีก %s", past: "%sที่แล้ว", s: "ไม่กี่วินาที", ss: "%d วินาที", m: "1 นาที", mm: "%d นาที", h: "1 ชั่วโมง", hh: "%d ชั่วโมง", d: "1 วัน", dd: "%d วัน", w: "1 สัปดาห์", ww: "%d สัปดาห์", M: "1 เดือน", MM: "%d เดือน", y: "1 ปี", yy: "%d ปี" } });
      var _o = { 1: "'inji", 5: "'inji", 8: "'inji", 70: "'inji", 80: "'inji", 2: "'nji", 7: "'nji", 20: "'nji", 50: "'nji", 3: "'ünji", 4: "'ünji", 100: "'ünji", 6: "'njy", 9: "'unjy", 10: "'unjy", 30: "'unjy", 60: "'ynjy", 90: "'ynjy" };
      l.defineLocale("tk", { months: "Ýanwar_Fewral_Mart_Aprel_Maý_Iýun_Iýul_Awgust_Sentýabr_Oktýabr_Noýabr_Dekabr".split("_"), monthsShort: "Ýan_Few_Mar_Apr_Maý_Iýn_Iýl_Awg_Sen_Okt_Noý_Dek".split("_"), weekdays: "Ýekşenbe_Duşenbe_Sişenbe_Çarşenbe_Penşenbe_Anna_Şenbe".split("_"), weekdaysShort: "Ýek_Duş_Siş_Çar_Pen_Ann_Şen".split("_"), weekdaysMin: "Ýk_Dş_Sş_Çr_Pn_An_Şn".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[bugün sagat] LT", nextDay: "[ertir sagat] LT", nextWeek: "[indiki] dddd [sagat] LT", lastDay: "[düýn] LT", lastWeek: "[geçen] dddd [sagat] LT", sameElse: "L" }, relativeTime: { future: "%s soň", past: "%s öň", s: "birnäçe sekunt", m: "bir minut", mm: "%d minut", h: "bir sagat", hh: "%d sagat", d: "bir gün", dd: "%d gün", M: "bir aý", MM: "%d aý", y: "bir ýyl", yy: "%d ýyl" }, ordinal: function(e, n) {
        switch (n) {
          case "d":
          case "D":
          case "Do":
          case "DD":
            return e;
          default:
            if (e === 0) return e + "'unjy";
            var d = e % 10, u = e % 100 - d, f = e >= 100 ? 100 : null;
            return e + (_o[d] || _o[u] || _o[f]);
        }
      }, week: { dow: 1, doy: 7 } });
      l.defineLocale("tl-ph", { months: "Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre".split("_"), monthsShort: "Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis".split("_"), weekdays: "Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado".split("_"), weekdaysShort: "Lin_Lun_Mar_Miy_Huw_Biy_Sab".split("_"), weekdaysMin: "Li_Lu_Ma_Mi_Hu_Bi_Sab".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "MM/D/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY HH:mm", LLLL: "dddd, MMMM DD, YYYY HH:mm" }, calendar: { sameDay: "LT [ngayong araw]", nextDay: "[Bukas ng] LT", nextWeek: "LT [sa susunod na] dddd", lastDay: "LT [kahapon]", lastWeek: "LT [noong nakaraang] dddd", sameElse: "L" }, relativeTime: { future: "sa loob ng %s", past: "%s ang nakalipas", s: "ilang segundo", ss: "%d segundo", m: "isang minuto", mm: "%d minuto", h: "isang oras", hh: "%d oras", d: "isang araw", dd: "%d araw", M: "isang buwan", MM: "%d buwan", y: "isang taon", yy: "%d taon" }, dayOfMonthOrdinalParse: /\d{1,2}/, ordinal: function(e) {
        return e;
      }, week: { dow: 1, doy: 4 } });
      var po = "pagh_wa’_cha’_wej_loS_vagh_jav_Soch_chorgh_Hut".split("_");
      function Hc(e) {
        var n = e;
        return n = e.indexOf("jaj") !== -1 ? n.slice(0, -3) + "leS" : e.indexOf("jar") !== -1 ? n.slice(0, -3) + "waQ" : e.indexOf("DIS") !== -1 ? n.slice(0, -3) + "nem" : n + " pIq", n;
      }
      function yo(e) {
        var n = e;
        return n = e.indexOf("jaj") !== -1 ? n.slice(0, -3) + "Hu’" : e.indexOf("jar") !== -1 ? n.slice(0, -3) + "wen" : e.indexOf("DIS") !== -1 ? n.slice(0, -3) + "ben" : n + " ret", n;
      }
      function ka(e, n, d, u) {
        var f = Pc(e);
        switch (d) {
          case "ss":
            return f + " lup";
          case "mm":
            return f + " tup";
          case "hh":
            return f + " rep";
          case "dd":
            return f + " jaj";
          case "MM":
            return f + " jar";
          case "yy":
            return f + " DIS";
        }
      }
      function Pc(e) {
        var n = Math.floor(e % 1e3 / 100), d = Math.floor(e % 100 / 10), u = e % 10, f = "";
        return n > 0 && (f += po[n] + "vatlh"), d > 0 && (f += (f !== "" ? " " : "") + po[d] + "maH"), u > 0 && (f += (f !== "" ? " " : "") + po[u]), f === "" ? "pagh" : f;
      }
      l.defineLocale("tlh", { months: "tera’ jar wa’_tera’ jar cha’_tera’ jar wej_tera’ jar loS_tera’ jar vagh_tera’ jar jav_tera’ jar Soch_tera’ jar chorgh_tera’ jar Hut_tera’ jar wa’maH_tera’ jar wa’maH wa’_tera’ jar wa’maH cha’".split("_"), monthsShort: "jar wa’_jar cha’_jar wej_jar loS_jar vagh_jar jav_jar Soch_jar chorgh_jar Hut_jar wa’maH_jar wa’maH wa’_jar wa’maH cha’".split("_"), monthsParseExact: true, weekdays: "lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"), weekdaysShort: "lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"), weekdaysMin: "lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[DaHjaj] LT", nextDay: "[wa’leS] LT", nextWeek: "LLL", lastDay: "[wa’Hu’] LT", lastWeek: "LLL", sameElse: "L" }, relativeTime: { future: Hc, past: yo, s: "puS lup", ss: ka, m: "wa’ tup", mm: ka, h: "wa’ rep", hh: ka, d: "wa’ jaj", dd: ka, M: "wa’ jar", MM: ka, y: "wa’ DIS", yy: ka }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } });
      var wo = { 1: "'inci", 5: "'inci", 8: "'inci", 70: "'inci", 80: "'inci", 2: "'nci", 7: "'nci", 20: "'nci", 50: "'nci", 3: "'üncü", 4: "'üncü", 100: "'üncü", 6: "'ncı", 9: "'uncu", 10: "'uncu", 30: "'uncu", 60: "'ıncı", 90: "'ıncı" };
      l.defineLocale("tr", { months: "Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık".split("_"), monthsShort: "Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara".split("_"), weekdays: "Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi".split("_"), weekdaysShort: "Paz_Pzt_Sal_Çar_Per_Cum_Cmt".split("_"), weekdaysMin: "Pz_Pt_Sa_Ça_Pe_Cu_Ct".split("_"), meridiem: function(e, n, d) {
        return e < 12 ? d ? "öö" : "ÖÖ" : d ? "ös" : "ÖS";
      }, meridiemParse: /öö|ÖÖ|ös|ÖS/, isPM: function(e) {
        return e === "ös" || e === "ÖS";
      }, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[bugün saat] LT", nextDay: "[yarın saat] LT", nextWeek: "[gelecek] dddd [saat] LT", lastDay: "[dün] LT", lastWeek: "[geçen] dddd [saat] LT", sameElse: "L" }, relativeTime: { future: "%s sonra", past: "%s önce", s: "birkaç saniye", ss: "%d saniye", m: "bir dakika", mm: "%d dakika", h: "bir saat", hh: "%d saat", d: "bir gün", dd: "%d gün", w: "bir hafta", ww: "%d hafta", M: "bir ay", MM: "%d ay", y: "bir yıl", yy: "%d yıl" }, ordinal: function(e, n) {
        switch (n) {
          case "d":
          case "D":
          case "Do":
          case "DD":
            return e;
          default:
            if (e === 0) return e + "'ıncı";
            var d = e % 10, u = e % 100 - d, f = e >= 100 ? 100 : null;
            return e + (wo[d] || wo[u] || wo[f]);
        }
      }, week: { dow: 1, doy: 7 } });
      l.defineLocale("tzl", { months: "Januar_Fevraglh_Març_Avrïu_Mai_Gün_Julia_Guscht_Setemvar_Listopäts_Noemvar_Zecemvar".split("_"), monthsShort: "Jan_Fev_Mar_Avr_Mai_Gün_Jul_Gus_Set_Lis_Noe_Zec".split("_"), weekdays: "Súladi_Lúneçi_Maitzi_Márcuri_Xhúadi_Viénerçi_Sáturi".split("_"), weekdaysShort: "Súl_Lún_Mai_Már_Xhú_Vié_Sát".split("_"), weekdaysMin: "Sú_Lú_Ma_Má_Xh_Vi_Sá".split("_"), longDateFormat: { LT: "HH.mm", LTS: "HH.mm.ss", L: "DD.MM.YYYY", LL: "D. MMMM [dallas] YYYY", LLL: "D. MMMM [dallas] YYYY HH.mm", LLLL: "dddd, [li] D. MMMM [dallas] YYYY HH.mm" }, meridiemParse: /d\'o|d\'a/i, isPM: function(e) {
        return e.toLowerCase() === "d'o";
      }, meridiem: function(e, n, d) {
        return e > 11 ? d ? "d'o" : "D'O" : d ? "d'a" : "D'A";
      }, calendar: { sameDay: "[oxhi à] LT", nextDay: "[demà à] LT", nextWeek: "dddd [à] LT", lastDay: "[ieiri à] LT", lastWeek: "[sür el] dddd [lasteu à] LT", sameElse: "L" }, relativeTime: { future: "osprei %s", past: "ja%s", s: Jt, ss: Jt, m: Jt, mm: Jt, h: Jt, hh: Jt, d: Jt, dd: Jt, M: Jt, MM: Jt, y: Jt, yy: Jt }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } });
      function Jt(e, n, d, u) {
        var f = { s: ["viensas secunds", "'iensas secunds"], ss: [e + " secunds", "" + e + " secunds"], m: ["'n míut", "'iens míut"], mm: [e + " míuts", "" + e + " míuts"], h: ["'n þora", "'iensa þora"], hh: [e + " þoras", "" + e + " þoras"], d: ["'n ziua", "'iensa ziua"], dd: [e + " ziuas", "" + e + " ziuas"], M: ["'n mes", "'iens mes"], MM: [e + " mesen", "" + e + " mesen"], y: ["'n ar", "'iens ar"], yy: [e + " ars", "" + e + " ars"] };
        return u || n ? f[d][0] : f[d][1];
      }
      l.defineLocale("tzm-latn", { months: "innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir".split("_"), monthsShort: "innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir".split("_"), weekdays: "asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"), weekdaysShort: "asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"), weekdaysMin: "asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, calendar: { sameDay: "[asdkh g] LT", nextDay: "[aska g] LT", nextWeek: "dddd [g] LT", lastDay: "[assant g] LT", lastWeek: "dddd [g] LT", sameElse: "L" }, relativeTime: { future: "dadkh s yan %s", past: "yan %s", s: "imik", ss: "%d imik", m: "minuḍ", mm: "%d minuḍ", h: "saɛa", hh: "%d tassaɛin", d: "ass", dd: "%d ossan", M: "ayowr", MM: "%d iyyirn", y: "asgas", yy: "%d isgasn" }, week: { dow: 6, doy: 12 } });
      l.defineLocale("tzm", { months: "ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ".split("_"), monthsShort: "ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ".split("_"), weekdays: "ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"), weekdaysShort: "ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"), weekdaysMin: "ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, calendar: { sameDay: "[ⴰⵙⴷⵅ ⴴ] LT", nextDay: "[ⴰⵙⴽⴰ ⴴ] LT", nextWeek: "dddd [ⴴ] LT", lastDay: "[ⴰⵚⴰⵏⵜ ⴴ] LT", lastWeek: "dddd [ⴴ] LT", sameElse: "L" }, relativeTime: { future: "ⴷⴰⴷⵅ ⵙ ⵢⴰⵏ %s", past: "ⵢⴰⵏ %s", s: "ⵉⵎⵉⴽ", ss: "%d ⵉⵎⵉⴽ", m: "ⵎⵉⵏⵓⴺ", mm: "%d ⵎⵉⵏⵓⴺ", h: "ⵙⴰⵄⴰ", hh: "%d ⵜⴰⵙⵙⴰⵄⵉⵏ", d: "ⴰⵙⵙ", dd: "%d oⵙⵙⴰⵏ", M: "ⴰⵢoⵓⵔ", MM: "%d ⵉⵢⵢⵉⵔⵏ", y: "ⴰⵙⴳⴰⵙ", yy: "%d ⵉⵙⴳⴰⵙⵏ" }, week: { dow: 6, doy: 12 } });
      l.defineLocale("ug-cn", { months: "يانۋار_فېۋرال_مارت_ئاپرېل_ماي_ئىيۇن_ئىيۇل_ئاۋغۇست_سېنتەبىر_ئۆكتەبىر_نويابىر_دېكابىر".split("_"), monthsShort: "يانۋار_فېۋرال_مارت_ئاپرېل_ماي_ئىيۇن_ئىيۇل_ئاۋغۇست_سېنتەبىر_ئۆكتەبىر_نويابىر_دېكابىر".split("_"), weekdays: "يەكشەنبە_دۈشەنبە_سەيشەنبە_چارشەنبە_پەيشەنبە_جۈمە_شەنبە".split("_"), weekdaysShort: "يە_دۈ_سە_چا_پە_جۈ_شە".split("_"), weekdaysMin: "يە_دۈ_سە_چا_پە_جۈ_شە".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY-MM-DD", LL: "YYYY-يىلىM-ئاينىڭD-كۈنى", LLL: "YYYY-يىلىM-ئاينىڭD-كۈنى، HH:mm", LLLL: "dddd، YYYY-يىلىM-ئاينىڭD-كۈنى، HH:mm" }, meridiemParse: /يېرىم كېچە|سەھەر|چۈشتىن بۇرۇن|چۈش|چۈشتىن كېيىن|كەچ/, meridiemHour: function(e, n) {
        return e === 12 && (e = 0), n === "يېرىم كېچە" || n === "سەھەر" || n === "چۈشتىن بۇرۇن" ? e : n === "چۈشتىن كېيىن" || n === "كەچ" ? e + 12 : e >= 11 ? e : e + 12;
      }, meridiem: function(e, n, d) {
        var u = e * 100 + n;
        return u < 600 ? "يېرىم كېچە" : u < 900 ? "سەھەر" : u < 1130 ? "چۈشتىن بۇرۇن" : u < 1230 ? "چۈش" : u < 1800 ? "چۈشتىن كېيىن" : "كەچ";
      }, calendar: { sameDay: "[بۈگۈن سائەت] LT", nextDay: "[ئەتە سائەت] LT", nextWeek: "[كېلەركى] dddd [سائەت] LT", lastDay: "[تۆنۈگۈن] LT", lastWeek: "[ئالدىنقى] dddd [سائەت] LT", sameElse: "L" }, relativeTime: { future: "%s كېيىن", past: "%s بۇرۇن", s: "نەچچە سېكونت", ss: "%d سېكونت", m: "بىر مىنۇت", mm: "%d مىنۇت", h: "بىر سائەت", hh: "%d سائەت", d: "بىر كۈن", dd: "%d كۈن", M: "بىر ئاي", MM: "%d ئاي", y: "بىر يىل", yy: "%d يىل" }, dayOfMonthOrdinalParse: /\d{1,2}(-كۈنى|-ئاي|-ھەپتە)/, ordinal: function(e, n) {
        switch (n) {
          case "d":
          case "D":
          case "DDD":
            return e + "-كۈنى";
          case "w":
          case "W":
            return e + "-ھەپتە";
          default:
            return e;
        }
      }, preparse: function(e) {
        return e.replace(/،/g, ",");
      }, postformat: function(e) {
        return e.replace(/,/g, "،");
      }, week: { dow: 1, doy: 7 } });
      function jc(e, n) {
        var d = e.split("_");
        return n % 10 === 1 && n % 100 !== 11 ? d[0] : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? d[1] : d[2];
      }
      function jn(e, n, d) {
        var u = { ss: n ? "секунда_секунди_секунд" : "секунду_секунди_секунд", mm: n ? "хвилина_хвилини_хвилин" : "хвилину_хвилини_хвилин", hh: n ? "година_години_годин" : "годину_години_годин", dd: "день_дні_днів", MM: "місяць_місяці_місяців", yy: "рік_роки_років" };
        return d === "m" ? n ? "хвилина" : "хвилину" : d === "h" ? n ? "година" : "годину" : e + " " + jc(u[d], +e);
      }
      function qc(e, n) {
        var d = { nominative: "неділя_понеділок_вівторок_середа_четвер_п’ятниця_субота".split("_"), accusative: "неділю_понеділок_вівторок_середу_четвер_п’ятницю_суботу".split("_"), genitive: "неділі_понеділка_вівторка_середи_четверга_п’ятниці_суботи".split("_") }, u;
        return e === true ? d.nominative.slice(1, 7).concat(d.nominative.slice(0, 1)) : e ? (u = /(\[[ВвУу]\]) ?dddd/.test(n) ? "accusative" : /\[?(?:минулої|наступної)? ?\] ?dddd/.test(n) ? "genitive" : "nominative", d[u][e.day()]) : d.nominative;
      }
      function Ta(e) {
        return function() {
          return e + "о" + (this.hours() === 11 ? "б" : "") + "] LT";
        };
      }
      l.defineLocale("uk", { months: { format: "січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня".split("_"), standalone: "січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень".split("_") }, monthsShort: "січ_лют_бер_квіт_трав_черв_лип_серп_вер_жовт_лист_груд".split("_"), weekdays: qc, weekdaysShort: "нд_пн_вт_ср_чт_пт_сб".split("_"), weekdaysMin: "нд_пн_вт_ср_чт_пт_сб".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY р.", LLL: "D MMMM YYYY р., HH:mm", LLLL: "dddd, D MMMM YYYY р., HH:mm" }, calendar: { sameDay: Ta("[Сьогодні "), nextDay: Ta("[Завтра "), lastDay: Ta("[Вчора "), nextWeek: Ta("[У] dddd ["), lastWeek: function() {
        switch (this.day()) {
          case 0:
          case 3:
          case 5:
          case 6:
            return Ta("[Минулої] dddd [").call(this);
          case 1:
          case 2:
          case 4:
            return Ta("[Минулого] dddd [").call(this);
        }
      }, sameElse: "L" }, relativeTime: { future: "за %s", past: "%s тому", s: "декілька секунд", ss: jn, m: jn, mm: jn, h: "годину", hh: jn, d: "день", dd: jn, M: "місяць", MM: jn, y: "рік", yy: jn }, meridiemParse: /ночі|ранку|дня|вечора/, isPM: function(e) {
        return /^(дня|вечора)$/.test(e);
      }, meridiem: function(e, n, d) {
        return e < 4 ? "ночі" : e < 12 ? "ранку" : e < 17 ? "дня" : "вечора";
      }, dayOfMonthOrdinalParse: /\d{1,2}-(й|го)/, ordinal: function(e, n) {
        switch (n) {
          case "M":
          case "d":
          case "DDD":
          case "w":
          case "W":
            return e + "-й";
          case "D":
            return e + "-го";
          default:
            return e;
        }
      }, week: { dow: 1, doy: 7 } });
      var Nd = ["جنوری", "فروری", "مارچ", "اپریل", "مئی", "جون", "جولائی", "اگست", "ستمبر", "اکتوبر", "نومبر", "دسمبر"], vo = ["اتوار", "پیر", "منگل", "بدھ", "جمعرات", "جمعہ", "ہفتہ"];
      l.defineLocale("ur", { months: Nd, monthsShort: Nd, weekdays: vo, weekdaysShort: vo, weekdaysMin: vo, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd، D MMMM YYYY HH:mm" }, meridiemParse: /صبح|شام/, isPM: function(e) {
        return e === "شام";
      }, meridiem: function(e, n, d) {
        return e < 12 ? "صبح" : "شام";
      }, calendar: { sameDay: "[آج بوقت] LT", nextDay: "[کل بوقت] LT", nextWeek: "dddd [بوقت] LT", lastDay: "[گذشتہ روز بوقت] LT", lastWeek: "[گذشتہ] dddd [بوقت] LT", sameElse: "L" }, relativeTime: { future: "%s بعد", past: "%s قبل", s: "چند سیکنڈ", ss: "%d سیکنڈ", m: "ایک منٹ", mm: "%d منٹ", h: "ایک گھنٹہ", hh: "%d گھنٹے", d: "ایک دن", dd: "%d دن", M: "ایک ماہ", MM: "%d ماہ", y: "ایک سال", yy: "%d سال" }, preparse: function(e) {
        return e.replace(/،/g, ",");
      }, postformat: function(e) {
        return e.replace(/,/g, "،");
      }, week: { dow: 1, doy: 4 } });
      l.defineLocale("uz-latn", { months: "Yanvar_Fevral_Mart_Aprel_May_Iyun_Iyul_Avgust_Sentabr_Oktabr_Noyabr_Dekabr".split("_"), monthsShort: "Yan_Fev_Mar_Apr_May_Iyun_Iyul_Avg_Sen_Okt_Noy_Dek".split("_"), weekdays: "Yakshanba_Dushanba_Seshanba_Chorshanba_Payshanba_Juma_Shanba".split("_"), weekdaysShort: "Yak_Dush_Sesh_Chor_Pay_Jum_Shan".split("_"), weekdaysMin: "Ya_Du_Se_Cho_Pa_Ju_Sha".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "D MMMM YYYY, dddd HH:mm" }, calendar: { sameDay: "[Bugun soat] LT [da]", nextDay: "[Ertaga] LT [da]", nextWeek: "dddd [kuni soat] LT [da]", lastDay: "[Kecha soat] LT [da]", lastWeek: "[O'tgan] dddd [kuni soat] LT [da]", sameElse: "L" }, relativeTime: { future: "Yaqin %s ichida", past: "Bir necha %s oldin", s: "soniya", ss: "%d soniya", m: "bir daqiqa", mm: "%d daqiqa", h: "bir soat", hh: "%d soat", d: "bir kun", dd: "%d kun", M: "bir oy", MM: "%d oy", y: "bir yil", yy: "%d yil" }, week: { dow: 1, doy: 7 } });
      l.defineLocale("uz", { months: "январ_феврал_март_апрел_май_июн_июл_август_сентябр_октябр_ноябр_декабр".split("_"), monthsShort: "янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек".split("_"), weekdays: "Якшанба_Душанба_Сешанба_Чоршанба_Пайшанба_Жума_Шанба".split("_"), weekdaysShort: "Якш_Душ_Сеш_Чор_Пай_Жум_Шан".split("_"), weekdaysMin: "Як_Ду_Се_Чо_Па_Жу_Ша".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "D MMMM YYYY, dddd HH:mm" }, calendar: { sameDay: "[Бугун соат] LT [да]", nextDay: "[Эртага] LT [да]", nextWeek: "dddd [куни соат] LT [да]", lastDay: "[Кеча соат] LT [да]", lastWeek: "[Утган] dddd [куни соат] LT [да]", sameElse: "L" }, relativeTime: { future: "Якин %s ичида", past: "Бир неча %s олдин", s: "фурсат", ss: "%d фурсат", m: "бир дакика", mm: "%d дакика", h: "бир соат", hh: "%d соат", d: "бир кун", dd: "%d кун", M: "бир ой", MM: "%d ой", y: "бир йил", yy: "%d йил" }, week: { dow: 1, doy: 7 } });
      l.defineLocale("vi", { months: "tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12".split("_"), monthsShort: "Thg 01_Thg 02_Thg 03_Thg 04_Thg 05_Thg 06_Thg 07_Thg 08_Thg 09_Thg 10_Thg 11_Thg 12".split("_"), monthsParseExact: true, weekdays: "chủ nhật_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy".split("_"), weekdaysShort: "CN_T2_T3_T4_T5_T6_T7".split("_"), weekdaysMin: "CN_T2_T3_T4_T5_T6_T7".split("_"), weekdaysParseExact: true, meridiemParse: /sa|ch/i, isPM: function(e) {
        return /^ch$/i.test(e);
      }, meridiem: function(e, n, d) {
        return e < 12 ? d ? "sa" : "SA" : d ? "ch" : "CH";
      }, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM [năm] YYYY", LLL: "D MMMM [năm] YYYY HH:mm", LLLL: "dddd, D MMMM [năm] YYYY HH:mm", l: "DD/M/YYYY", ll: "D MMM YYYY", lll: "D MMM YYYY HH:mm", llll: "ddd, D MMM YYYY HH:mm" }, calendar: { sameDay: "[Hôm nay lúc] LT", nextDay: "[Ngày mai lúc] LT", nextWeek: "dddd [tuần tới lúc] LT", lastDay: "[Hôm qua lúc] LT", lastWeek: "dddd [tuần trước lúc] LT", sameElse: "L" }, relativeTime: { future: "%s tới", past: "%s trước", s: "vài giây", ss: "%d giây", m: "một phút", mm: "%d phút", h: "một giờ", hh: "%d giờ", d: "một ngày", dd: "%d ngày", w: "một tuần", ww: "%d tuần", M: "một tháng", MM: "%d tháng", y: "một năm", yy: "%d năm" }, dayOfMonthOrdinalParse: /\d{1,2}/, ordinal: function(e) {
        return e;
      }, week: { dow: 1, doy: 4 } });
      l.defineLocale("x-pseudo", { months: "J~áñúá~rý_F~ébrú~árý_~Márc~h_Áp~ríl_~Máý_~Júñé~_Júl~ý_Áú~gúst~_Sép~témb~ér_Ó~ctób~ér_Ñ~óvém~bér_~Décé~mbér".split("_"), monthsShort: "J~áñ_~Féb_~Már_~Ápr_~Máý_~Júñ_~Júl_~Áúg_~Sép_~Óct_~Ñóv_~Déc".split("_"), monthsParseExact: true, weekdays: "S~úñdá~ý_Mó~ñdáý~_Túé~sdáý~_Wéd~ñésd~áý_T~húrs~dáý_~Fríd~áý_S~átúr~dáý".split("_"), weekdaysShort: "S~úñ_~Móñ_~Túé_~Wéd_~Thú_~Frí_~Sát".split("_"), weekdaysMin: "S~ú_Mó~_Tú_~Wé_T~h_Fr~_Sá".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[T~ódá~ý át] LT", nextDay: "[T~ómó~rró~w át] LT", nextWeek: "dddd [át] LT", lastDay: "[Ý~ést~érdá~ý át] LT", lastWeek: "[L~ást] dddd [át] LT", sameElse: "L" }, relativeTime: { future: "í~ñ %s", past: "%s á~gó", s: "á ~féw ~sécó~ñds", ss: "%d s~écóñ~ds", m: "á ~míñ~úté", mm: "%d m~íñú~tés", h: "á~ñ hó~úr", hh: "%d h~óúrs", d: "á ~dáý", dd: "%d d~áýs", M: "á ~móñ~th", MM: "%d m~óñt~hs", y: "á ~ýéár", yy: "%d ý~éárs" }, dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/, ordinal: function(e) {
        var n = e % 10, d = ~~(e % 100 / 10) === 1 ? "th" : n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th";
        return e + d;
      }, week: { dow: 1, doy: 4 } });
      l.defineLocale("yo", { months: "Sẹ́rẹ́_Èrèlè_Ẹrẹ̀nà_Ìgbé_Èbibi_Òkùdu_Agẹmo_Ògún_Owewe_Ọ̀wàrà_Bélú_Ọ̀pẹ̀̀".split("_"), monthsShort: "Sẹ́r_Èrl_Ẹrn_Ìgb_Èbi_Òkù_Agẹ_Ògú_Owe_Ọ̀wà_Bél_Ọ̀pẹ̀̀".split("_"), weekdays: "Àìkú_Ajé_Ìsẹ́gun_Ọjọ́rú_Ọjọ́bọ_Ẹtì_Àbámẹ́ta".split("_"), weekdaysShort: "Àìk_Ajé_Ìsẹ́_Ọjr_Ọjb_Ẹtì_Àbá".split("_"), weekdaysMin: "Àì_Aj_Ìs_Ọr_Ọb_Ẹt_Àb".split("_"), longDateFormat: { LT: "h:mm A", LTS: "h:mm:ss A", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY h:mm A", LLLL: "dddd, D MMMM YYYY h:mm A" }, calendar: { sameDay: "[Ònì ni] LT", nextDay: "[Ọ̀la ni] LT", nextWeek: "dddd [Ọsẹ̀ tón'bọ] [ni] LT", lastDay: "[Àna ni] LT", lastWeek: "dddd [Ọsẹ̀ tólọ́] [ni] LT", sameElse: "L" }, relativeTime: { future: "ní %s", past: "%s kọjá", s: "ìsẹjú aayá die", ss: "aayá %d", m: "ìsẹjú kan", mm: "ìsẹjú %d", h: "wákati kan", hh: "wákati %d", d: "ọjọ́ kan", dd: "ọjọ́ %d", M: "osù kan", MM: "osù %d", y: "ọdún kan", yy: "ọdún %d" }, dayOfMonthOrdinalParse: /ọjọ́\s\d{1,2}/, ordinal: "ọjọ́ %d", week: { dow: 1, doy: 4 } });
      l.defineLocale("zh-cn", { months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"), monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"), weekdaysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"), weekdaysMin: "日_一_二_三_四_五_六".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY/MM/DD", LL: "YYYY年M月D日", LLL: "YYYY年M月D日Ah点mm分", LLLL: "YYYY年M月D日ddddAh点mm分", l: "YYYY/M/D", ll: "YYYY年M月D日", lll: "YYYY年M月D日 HH:mm", llll: "YYYY年M月D日dddd HH:mm" }, meridiemParse: /凌晨|早上|上午|中午|下午|晚上/, meridiemHour: function(e, n) {
        return e === 12 && (e = 0), n === "凌晨" || n === "早上" || n === "上午" ? e : n === "下午" || n === "晚上" ? e + 12 : e >= 11 ? e : e + 12;
      }, meridiem: function(e, n, d) {
        var u = e * 100 + n;
        return u < 600 ? "凌晨" : u < 900 ? "早上" : u < 1130 ? "上午" : u < 1230 ? "中午" : u < 1800 ? "下午" : "晚上";
      }, calendar: { sameDay: "[今天]LT", nextDay: "[明天]LT", nextWeek: function(e) {
        return e.week() !== this.week() ? "[下]dddLT" : "[本]dddLT";
      }, lastDay: "[昨天]LT", lastWeek: function(e) {
        return this.week() !== e.week() ? "[上]dddLT" : "[本]dddLT";
      }, sameElse: "L" }, dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/, ordinal: function(e, n) {
        switch (n) {
          case "d":
          case "D":
          case "DDD":
            return e + "日";
          case "M":
            return e + "月";
          case "w":
          case "W":
            return e + "周";
          default:
            return e;
        }
      }, relativeTime: { future: "%s后", past: "%s前", s: "几秒", ss: "%d 秒", m: "1 分钟", mm: "%d 分钟", h: "1 小时", hh: "%d 小时", d: "1 天", dd: "%d 天", w: "1 周", ww: "%d 周", M: "1 个月", MM: "%d 个月", y: "1 年", yy: "%d 年" }, week: { dow: 1, doy: 4 } });
      l.defineLocale("zh-hk", { months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"), monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"), weekdaysShort: "週日_週一_週二_週三_週四_週五_週六".split("_"), weekdaysMin: "日_一_二_三_四_五_六".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY/MM/DD", LL: "YYYY年M月D日", LLL: "YYYY年M月D日 HH:mm", LLLL: "YYYY年M月D日dddd HH:mm", l: "YYYY/M/D", ll: "YYYY年M月D日", lll: "YYYY年M月D日 HH:mm", llll: "YYYY年M月D日dddd HH:mm" }, meridiemParse: /凌晨|早上|上午|中午|下午|晚上/, meridiemHour: function(e, n) {
        if (e === 12 && (e = 0), n === "凌晨" || n === "早上" || n === "上午") return e;
        if (n === "中午") return e >= 11 ? e : e + 12;
        if (n === "下午" || n === "晚上") return e + 12;
      }, meridiem: function(e, n, d) {
        var u = e * 100 + n;
        return u < 600 ? "凌晨" : u < 900 ? "早上" : u < 1200 ? "上午" : u === 1200 ? "中午" : u < 1800 ? "下午" : "晚上";
      }, calendar: { sameDay: "[今天]LT", nextDay: "[明天]LT", nextWeek: "[下]ddddLT", lastDay: "[昨天]LT", lastWeek: "[上]ddddLT", sameElse: "L" }, dayOfMonthOrdinalParse: /\d{1,2}(日|月|週)/, ordinal: function(e, n) {
        switch (n) {
          case "d":
          case "D":
          case "DDD":
            return e + "日";
          case "M":
            return e + "月";
          case "w":
          case "W":
            return e + "週";
          default:
            return e;
        }
      }, relativeTime: { future: "%s後", past: "%s前", s: "幾秒", ss: "%d 秒", m: "1 分鐘", mm: "%d 分鐘", h: "1 小時", hh: "%d 小時", d: "1 天", dd: "%d 天", M: "1 個月", MM: "%d 個月", y: "1 年", yy: "%d 年" } });
      l.defineLocale("zh-mo", { months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"), monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"), weekdaysShort: "週日_週一_週二_週三_週四_週五_週六".split("_"), weekdaysMin: "日_一_二_三_四_五_六".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "YYYY年M月D日", LLL: "YYYY年M月D日 HH:mm", LLLL: "YYYY年M月D日dddd HH:mm", l: "D/M/YYYY", ll: "YYYY年M月D日", lll: "YYYY年M月D日 HH:mm", llll: "YYYY年M月D日dddd HH:mm" }, meridiemParse: /凌晨|早上|上午|中午|下午|晚上/, meridiemHour: function(e, n) {
        if (e === 12 && (e = 0), n === "凌晨" || n === "早上" || n === "上午") return e;
        if (n === "中午") return e >= 11 ? e : e + 12;
        if (n === "下午" || n === "晚上") return e + 12;
      }, meridiem: function(e, n, d) {
        var u = e * 100 + n;
        return u < 600 ? "凌晨" : u < 900 ? "早上" : u < 1130 ? "上午" : u < 1230 ? "中午" : u < 1800 ? "下午" : "晚上";
      }, calendar: { sameDay: "[今天] LT", nextDay: "[明天] LT", nextWeek: "[下]dddd LT", lastDay: "[昨天] LT", lastWeek: "[上]dddd LT", sameElse: "L" }, dayOfMonthOrdinalParse: /\d{1,2}(日|月|週)/, ordinal: function(e, n) {
        switch (n) {
          case "d":
          case "D":
          case "DDD":
            return e + "日";
          case "M":
            return e + "月";
          case "w":
          case "W":
            return e + "週";
          default:
            return e;
        }
      }, relativeTime: { future: "%s內", past: "%s前", s: "幾秒", ss: "%d 秒", m: "1 分鐘", mm: "%d 分鐘", h: "1 小時", hh: "%d 小時", d: "1 天", dd: "%d 天", M: "1 個月", MM: "%d 個月", y: "1 年", yy: "%d 年" } });
      return l.defineLocale("zh-tw", { months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"), monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"), weekdaysShort: "週日_週一_週二_週三_週四_週五_週六".split("_"), weekdaysMin: "日_一_二_三_四_五_六".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY/MM/DD", LL: "YYYY年M月D日", LLL: "YYYY年M月D日 HH:mm", LLLL: "YYYY年M月D日dddd HH:mm", l: "YYYY/M/D", ll: "YYYY年M月D日", lll: "YYYY年M月D日 HH:mm", llll: "YYYY年M月D日dddd HH:mm" }, meridiemParse: /凌晨|早上|上午|中午|下午|晚上/, meridiemHour: function(e, n) {
        if (e === 12 && (e = 0), n === "凌晨" || n === "早上" || n === "上午") return e;
        if (n === "中午") return e >= 11 ? e : e + 12;
        if (n === "下午" || n === "晚上") return e + 12;
      }, meridiem: function(e, n, d) {
        var u = e * 100 + n;
        return u < 600 ? "凌晨" : u < 900 ? "早上" : u < 1130 ? "上午" : u < 1230 ? "中午" : u < 1800 ? "下午" : "晚上";
      }, calendar: { sameDay: "[今天] LT", nextDay: "[明天] LT", nextWeek: "[下]dddd LT", lastDay: "[昨天] LT", lastWeek: "[上]dddd LT", sameElse: "L" }, dayOfMonthOrdinalParse: /\d{1,2}(日|月|週)/, ordinal: function(e, n) {
        switch (n) {
          case "d":
          case "D":
          case "DDD":
            return e + "日";
          case "M":
            return e + "月";
          case "w":
          case "W":
            return e + "週";
          default:
            return e;
        }
      }, relativeTime: { future: "%s後", past: "%s前", s: "幾秒", ss: "%d 秒", m: "1 分鐘", mm: "%d 分鐘", h: "1 小時", hh: "%d 小時", d: "1 天", dd: "%d 天", M: "1 個月", MM: "%d 個月", y: "1 年", yy: "%d 年" } }), l.locale("en"), l;
    }));
  })(nu)), nu.exports;
}
var n2 = s2();
const Ss = Qc(n2), ii = zM(), ap = { ar: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["ثوانٍ"] } } } }, ast: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["segundos"] } } } }, az: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["saniyə"] } } } }, be: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["секунды"] } } } }, br: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["eilennoù"] } } } }, ca: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["segons"] } } } }, cs: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["sekund(y)"] } } } }, cs_CZ: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["sekund(y)"] } } } }, da: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["sekunder"] } } } }, de: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["Sekunden"] } } } }, de_DE: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["Sekunden"] } } } }, el: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["δευτερόλεπτα"] } } } }, en_GB: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["seconds"] } } } }, eo: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["sekundoj"] } } } }, es: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["segundos"] } } } }, es_AR: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["segundos"] } } } }, es_CL: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["segundos"] } } } }, es_MX: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["segundos"] } } } }, et_EE: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["sekundid"] } } } }, eu: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["segundo"] } } } }, fa: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["ثانیه"] } } } }, fi: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["sekuntia"] } } } }, fi_FI: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["sekuntia"] } } } }, fr: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["secondes"] } } } }, ga: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["soicindí"] } } } }, gl: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["segundos"] } } } }, he: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["שניות"] } } } }, hr: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["sekunde"] } } } }, hu: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["másodperc"] } } } }, hu_HU: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["másodperc"] } } } }, id: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["detik"] } } } }, is: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["sekúndur"] } } } }, it: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["secondi"] } } } }, ja: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["秒後"] } } } }, ja_JP: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["秒"] } } } }, kab: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["tasinin"] } } } }, ko: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["초"] } } } }, lo: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["ວິນາທີ"] } } } }, lt_LT: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["sek."] } } } }, lv: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["sekundes"] } } } }, mk: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["секунди"] } } } }, mn: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["секунд"] } } } }, ms_MY: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["saat"] } } } }, my: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["စက္ကန့်"] } } } }, nb: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["sekunder"] } } } }, nb_NO: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["sekunder"] } } } }, nl: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["seconden"] } } } }, oc: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["segondas"] } } } }, pl: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["sekundy"] } } } }, pt_BR: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["segundos"] } } } }, pt_PT: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["segundos"] } } } }, ro: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["secunde"] } } } }, ru: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["секунды"] } } } }, si: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["තත්පර"] } } } }, sk: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["sekúnd"] } } } }, sk_SK: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["sekundy"] } } } }, sl: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["sekunde"] } } } }, sq: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["sekonda"] } } } }, sr: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["секунде"] } } } }, sv: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["sekunder"] } } } }, th_TH: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["วินาที"] } } } }, tr: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["saniye"] } } } }, uk: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["секунд"] } } } }, uz: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["ikkinchi"] } } } }, vi: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["giây"] } } } }, zh_CN: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["秒"] } } } }, zh_HK: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["秒"] } } } }, zh_TW: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["秒"] } } } } };
if (Ss.locale(ii), ii === "en" && Ss.updateLocale(Ss.locale(), { relativeTime: { s: "seconds" } }), ii in ap) {
  const s = F_().setLanguage(ii).addTranslation(ii, ap[ii]).build();
  Ss.updateLocale(Ss.locale(), { relativeTime: { s: s.gettext("seconds") } });
}
var au = { exports: {} };
var a2 = au.exports, rp;
function r2() {
  return rp || (rp = 1, (function(s) {
    (function(r, i) {
      s.exports ? s.exports = i() : r.Toastify = i();
    })(a2, function(r) {
      var i = function(h) {
        return new i.lib.init(h);
      }, l = "1.12.0";
      i.defaults = { oldestFirst: true, text: "Toastify is awesome!", node: void 0, duration: 3e3, selector: void 0, callback: function() {
      }, destination: void 0, newWindow: false, close: false, gravity: "toastify-top", positionLeft: false, position: "", backgroundColor: "", avatar: "", className: "", stopOnFocus: true, onClick: function() {
      }, offset: { x: 0, y: 0 }, escapeMarkup: true, ariaLive: "polite", style: { background: "" } }, i.lib = i.prototype = { toastify: l, constructor: i, init: function(h) {
        return h || (h = {}), this.options = {}, this.toastElement = null, this.options.text = h.text || i.defaults.text, this.options.node = h.node || i.defaults.node, this.options.duration = h.duration === 0 ? 0 : h.duration || i.defaults.duration, this.options.selector = h.selector || i.defaults.selector, this.options.callback = h.callback || i.defaults.callback, this.options.destination = h.destination || i.defaults.destination, this.options.newWindow = h.newWindow || i.defaults.newWindow, this.options.close = h.close || i.defaults.close, this.options.gravity = h.gravity === "bottom" ? "toastify-bottom" : i.defaults.gravity, this.options.positionLeft = h.positionLeft || i.defaults.positionLeft, this.options.position = h.position || i.defaults.position, this.options.backgroundColor = h.backgroundColor || i.defaults.backgroundColor, this.options.avatar = h.avatar || i.defaults.avatar, this.options.className = h.className || i.defaults.className, this.options.stopOnFocus = h.stopOnFocus === void 0 ? i.defaults.stopOnFocus : h.stopOnFocus, this.options.onClick = h.onClick || i.defaults.onClick, this.options.offset = h.offset || i.defaults.offset, this.options.escapeMarkup = h.escapeMarkup !== void 0 ? h.escapeMarkup : i.defaults.escapeMarkup, this.options.ariaLive = h.ariaLive || i.defaults.ariaLive, this.options.style = h.style || i.defaults.style, h.backgroundColor && (this.options.style.background = h.backgroundColor), this;
      }, buildToast: function() {
        if (!this.options) throw "Toastify is not initialized";
        var h = document.createElement("div");
        h.className = "toastify on " + this.options.className, this.options.position ? h.className += " toastify-" + this.options.position : this.options.positionLeft === true ? (h.className += " toastify-left", console.warn("Property `positionLeft` will be depreciated in further versions. Please use `position` instead.")) : h.className += " toastify-right", h.className += " " + this.options.gravity, this.options.backgroundColor && console.warn('DEPRECATION NOTICE: "backgroundColor" is being deprecated. Please use the "style.background" property.');
        for (var p in this.options.style) h.style[p] = this.options.style[p];
        if (this.options.ariaLive && h.setAttribute("aria-live", this.options.ariaLive), this.options.node && this.options.node.nodeType === Node.ELEMENT_NODE) h.appendChild(this.options.node);
        else if (this.options.escapeMarkup ? h.innerText = this.options.text : h.innerHTML = this.options.text, this.options.avatar !== "") {
          var M = document.createElement("img");
          M.src = this.options.avatar, M.className = "toastify-avatar", this.options.position == "left" || this.options.positionLeft === true ? h.appendChild(M) : h.insertAdjacentElement("afterbegin", M);
        }
        if (this.options.close === true) {
          var v = document.createElement("button");
          v.type = "button", v.setAttribute("aria-label", "Close"), v.className = "toast-close", v.innerHTML = "&#10006;", v.addEventListener("click", function(x) {
            x.stopPropagation(), this.removeElement(this.toastElement), window.clearTimeout(this.toastElement.timeOutValue);
          }.bind(this));
          var D = window.innerWidth > 0 ? window.innerWidth : screen.width;
          (this.options.position == "left" || this.options.positionLeft === true) && D > 360 ? h.insertAdjacentElement("afterbegin", v) : h.appendChild(v);
        }
        if (this.options.stopOnFocus && this.options.duration > 0) {
          var S = this;
          h.addEventListener("mouseover", function(x) {
            window.clearTimeout(h.timeOutValue);
          }), h.addEventListener("mouseleave", function() {
            h.timeOutValue = window.setTimeout(function() {
              S.removeElement(h);
            }, S.options.duration);
          });
        }
        if (typeof this.options.destination < "u" && h.addEventListener("click", function(x) {
          x.stopPropagation(), this.options.newWindow === true ? window.open(this.options.destination, "_blank") : window.location = this.options.destination;
        }.bind(this)), typeof this.options.onClick == "function" && typeof this.options.destination > "u" && h.addEventListener("click", function(x) {
          x.stopPropagation(), this.options.onClick();
        }.bind(this)), typeof this.options.offset == "object") {
          var E = m("x", this.options), N = m("y", this.options), j = this.options.position == "left" ? E : "-" + E, R = this.options.gravity == "toastify-top" ? N : "-" + N;
          h.style.transform = "translate(" + j + "," + R + ")";
        }
        return h;
      }, showToast: function() {
        this.toastElement = this.buildToast();
        var h;
        if (typeof this.options.selector == "string" ? h = document.getElementById(this.options.selector) : this.options.selector instanceof HTMLElement || typeof ShadowRoot < "u" && this.options.selector instanceof ShadowRoot ? h = this.options.selector : h = document.body, !h) throw "Root element is not defined";
        var p = i.defaults.oldestFirst ? h.firstChild : h.lastChild;
        return h.insertBefore(this.toastElement, p), i.reposition(), this.options.duration > 0 && (this.toastElement.timeOutValue = window.setTimeout(function() {
          this.removeElement(this.toastElement);
        }.bind(this), this.options.duration)), this;
      }, hideToast: function() {
        this.toastElement.timeOutValue && clearTimeout(this.toastElement.timeOutValue), this.removeElement(this.toastElement);
      }, removeElement: function(h) {
        h.className = h.className.replace(" on", ""), window.setTimeout(function() {
          this.options.node && this.options.node.parentNode && this.options.node.parentNode.removeChild(this.options.node), h.parentNode && h.parentNode.removeChild(h), this.options.callback.call(h), i.reposition();
        }.bind(this), 400);
      } }, i.reposition = function() {
        for (var h = { top: 15, bottom: 15 }, p = { top: 15, bottom: 15 }, M = { top: 15, bottom: 15 }, v = document.getElementsByClassName("toastify"), D, S = 0; S < v.length; S++) {
          g(v[S], "toastify-top") === true ? D = "toastify-top" : D = "toastify-bottom";
          var E = v[S].offsetHeight;
          D = D.substr(9, D.length - 1);
          var N = 15, j = window.innerWidth > 0 ? window.innerWidth : screen.width;
          j <= 360 ? (v[S].style[D] = M[D] + "px", M[D] += E + N) : g(v[S], "toastify-left") === true ? (v[S].style[D] = h[D] + "px", h[D] += E + N) : (v[S].style[D] = p[D] + "px", p[D] += E + N);
        }
        return this;
      };
      function m(h, p) {
        return p.offset[h] ? isNaN(p.offset[h]) ? p.offset[h] : p.offset[h] + "px" : "0px";
      }
      function g(h, p) {
        return !h || typeof p != "string" ? false : !!(h.className && h.className.trim().split(/\s+/gi).indexOf(p) > -1);
      }
      return i.lib.init.prototype = i.lib, i;
    });
  })(au)), au.exports;
}
var i2 = r2();
const o2 = Qc(i2);
x_();
const l2 = Xc({ __name: "NcDialogButton", props: { callback: { type: Function, default: () => {
} }, disabled: { type: Boolean, default: false }, icon: { default: void 0 }, label: {}, type: { default: "button" }, variant: { default: "tertiary" } }, emits: ["click"], setup(s, { emit: r }) {
  const i = s, l = r, m = tr(false);
  async function g(h) {
    if (!m.value) {
      m.value = true;
      try {
        const p = i.type === "reset" ? false : void 0, M = await i.callback?.() ?? p;
        M !== false && l("click", h, M);
      } finally {
        m.value = false;
      }
    }
  }
  return (h, p) => (qe(), Ya(Od($M), { "aria-label": h.label, disabled: h.disabled, type: h.type, variant: h.variant, onClick: g }, { icon: sr(() => [Vs(h.$slots, "icon", {}, () => [m.value ? (qe(), Ya(Od(BM), { key: 0, name: Od(N_)("Loading …") }, null, 8, ["name"])) : h.icon !== void 0 ? (qe(), Ya(Od(WM), { key: 1, svg: h.icon }, null, 8, ["svg"])) : Cs("", true)])]), default: sr(() => [eg(Ca(h.label) + " ", 1)]), _: 3 }, 8, ["aria-label", "disabled", "type", "variant"]));
} }), ip = F_().detectLanguage();
[{ locale: "af", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Afrikaans (https://app.transifex.com/nextcloud/teams/64236/af/)", "Content-Type": "text/plain; charset=UTF-8", Language: "af", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Afrikaans (https://app.transifex.com/nextcloud/teams/64236/af/)
Content-Type: text/plain; charset=UTF-8
Language: af
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "ar", json: { charset: "utf-8", headers: { "Last-Translator": "abusaud, 2024", "Language-Team": "Arabic (https://app.transifex.com/nextcloud/teams/64236/ar/)", "Content-Type": "text/plain; charset=UTF-8", Language: "ar", "Plural-Forms": "nplurals=6; plural=n==0 ? 0 : n==1 ? 1 : n==2 ? 2 : n%100>=3 && n%100<=10 ? 3 : n%100>=11 && n%100<=99 ? 4 : 5;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
Ali <alimahwer@yahoo.com>, 2024
abusaud, 2024
` }, msgstr: [`Last-Translator: abusaud, 2024
Language-Team: Arabic (https://app.transifex.com/nextcloud/teams/64236/ar/)
Content-Type: text/plain; charset=UTF-8
Language: ar
Plural-Forms: nplurals=6; plural=n==0 ? 0 : n==1 ? 1 : n==2 ? 2 : n%100>=3 && n%100<=10 ? 3 : n%100>=11 && n%100<=99 ? 4 : 5;
`] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ['"{name}" لا يصلح كاسم مجلد.'] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ['"{name}" غير مسموح به كاسم مجلد'] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ['"/" غير مسموح به داخل اسم مجلد.'] }, "All files": { msgid: "All files", msgstr: ["كل الملفات"] }, Choose: { msgid: "Choose", msgstr: ["إختَر"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["إختر {file}"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["إختَر %n ملف", "إختَر %n ملف", "إختَر %n ملف", "إختَر %n ملفات", "إختَر %n ملف", "إختر %n ملف"] }, Copy: { msgid: "Copy", msgstr: ["نسخ"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["نسخ إلى {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["تعذّر إنشاء المجلد الجديد"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["يتعذّر تحميل إعدادات الملفات"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["تعذر تحميل عرض الملفات"] }, "Create directory": { msgid: "Create directory", msgstr: ["إنشاء مجلد"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["محدد العرض الحالي"] }, Favorites: { msgid: "Favorites", msgstr: ["المفضلة"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["الملفات والمجلدات التي تحددها كمفضلة ستظهر هنا."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["الملفات و المجلدات التي قمت مؤخراً بتعديلها سوف تظهر هنا."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["تصفية قائمة الملفات"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["اسم المجلد لا يمكن أن يكون فارغاً."] }, Home: { msgid: "Home", msgstr: ["البداية"] }, Modified: { msgid: "Modified", msgstr: ["التعديل"] }, Move: { msgid: "Move", msgstr: ["نقل"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["نقل إلى {target}"] }, Name: { msgid: "Name", msgstr: ["الاسم"] }, New: { msgid: "New", msgstr: ["جديد"] }, "New folder": { msgid: "New folder", msgstr: ["مجلد جديد"] }, "New folder name": { msgid: "New folder name", msgstr: ["اسم المجلد الجديد"] }, "No files in here": { msgid: "No files in here", msgstr: ["لا توجد ملفات هنا"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["لا توجد ملفات تتطابق مع عامل التصفية الذي وضعته"] }, "No matching files": { msgid: "No matching files", msgstr: ["لا توجد ملفات مطابقة"] }, Recent: { msgid: "Recent", msgstr: ["الحالي"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["حدد جميع الإدخالات"] }, "Select entry": { msgid: "Select entry", msgstr: ["إختَر المدخل"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["إختر سطر الـ {nodename}"] }, Size: { msgid: "Size", msgstr: ["الحجم"] }, Undo: { msgid: "Undo", msgstr: ["تراجع"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["قم برفع بعض المحتوى أو المزامنة مع أجهزتك!"] } } } } }, { locale: "ast", json: { charset: "utf-8", headers: { "Last-Translator": "enolp <enolp@softastur.org>, 2024", "Language-Team": "Asturian (https://app.transifex.com/nextcloud/teams/64236/ast/)", "Content-Type": "text/plain; charset=UTF-8", Language: "ast", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
enolp <enolp@softastur.org>, 2024
` }, msgstr: [`Last-Translator: enolp <enolp@softastur.org>, 2024
Language-Team: Asturian (https://app.transifex.com/nextcloud/teams/64236/ast/)
Content-Type: text/plain; charset=UTF-8
Language: ast
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ["«{name}» ye un nome de carpeta inválidu."] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ["«{name}» ye un nome de carpeta inválidu"] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ["Nun se permite'l caráuter «/» dientro'l nome de les carpetes."] }, "All files": { msgid: "All files", msgstr: ["Tolos ficheros"] }, Choose: { msgid: "Choose", msgstr: ["Escoyer"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Escoyer «{ficheru}»"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["Escoyer %n ficheru", "Escoyer %n ficheros"] }, Copy: { msgid: "Copy", msgstr: ["Copiar"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Copiar en: {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Nun se pudo crear la carpeta"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["Nun se pudo cargar la configuración de los ficheros"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["Nun se pudieron cargar les vistes de los ficheros"] }, "Create directory": { msgid: "Create directory", msgstr: ["Crear un direutoriu"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Selector de la vista actual"] }, Favorites: { msgid: "Favorites", msgstr: ["Favoritos"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Equí apaecen los ficheros y les carpetes que metas en Favoritos."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Equí apaecen los fichero y les carpetes que modificares apocayá."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Peñerar la llista de ficheros"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["El nome de la carpeta nun pue tar baleru."] }, Home: { msgid: "Home", msgstr: ["Aniciu"] }, Modified: { msgid: "Modified", msgstr: ["Modificóse"] }, Move: { msgid: "Move", msgstr: ["Mover"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Mover a {target}"] }, Name: { msgid: "Name", msgstr: ["Nome"] }, New: { msgid: "New", msgstr: ["Nuevu"] }, "New folder": { msgid: "New folder", msgstr: ["Carpeta nueva"] }, "New folder name": { msgid: "New folder name", msgstr: ["Nome de carpeta nuevu"] }, "No files in here": { msgid: "No files in here", msgstr: ["Equí nun hai nengún ficheru"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Nun s'atopó nengún ficheru que concasare cola peñera."] }, "No matching files": { msgid: "No matching files", msgstr: ["Nun hai nengún ficheru que concase"] }, Recent: { msgid: "Recent", msgstr: ["De recién"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Seleicionar toles entraes"] }, "Select entry": { msgid: "Select entry", msgstr: ["Seleicionar la entrada"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Seleicionar la filera de: {nodename}"] }, Size: { msgid: "Size", msgstr: ["Tamañu"] }, Undo: { msgid: "Undo", msgstr: ["Desfacer"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["¡Xubi dalgún elementu o sincroniza colos tos preseos!"] } } } } }, { locale: "az", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Azerbaijani (https://app.transifex.com/nextcloud/teams/64236/az/)", "Content-Type": "text/plain; charset=UTF-8", Language: "az", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Azerbaijani (https://app.transifex.com/nextcloud/teams/64236/az/)
Content-Type: text/plain; charset=UTF-8
Language: az
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "be", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Belarusian (https://app.transifex.com/nextcloud/teams/64236/be/)", "Content-Type": "text/plain; charset=UTF-8", Language: "be", "Plural-Forms": "nplurals=4; plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<12 || n%100>14) ? 1 : n%10==0 || (n%10>=5 && n%10<=9) || (n%100>=11 && n%100<=14)? 2 : 3);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Belarusian (https://app.transifex.com/nextcloud/teams/64236/be/)
Content-Type: text/plain; charset=UTF-8
Language: be
Plural-Forms: nplurals=4; plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<12 || n%100>14) ? 1 : n%10==0 || (n%10>=5 && n%10<=9) || (n%100>=11 && n%100<=14)? 2 : 3);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "bg_BG", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Bulgarian (Bulgaria) (https://app.transifex.com/nextcloud/teams/64236/bg_BG/)", "Content-Type": "text/plain; charset=UTF-8", Language: "bg_BG", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Bulgarian (Bulgaria) (https://app.transifex.com/nextcloud/teams/64236/bg_BG/)
Content-Type: text/plain; charset=UTF-8
Language: bg_BG
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "bn_BD", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Bengali (Bangladesh) (https://app.transifex.com/nextcloud/teams/64236/bn_BD/)", "Content-Type": "text/plain; charset=UTF-8", Language: "bn_BD", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Bengali (Bangladesh) (https://app.transifex.com/nextcloud/teams/64236/bn_BD/)
Content-Type: text/plain; charset=UTF-8
Language: bn_BD
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "br", json: { charset: "utf-8", headers: { "Last-Translator": "Joas Schilling, 2023", "Language-Team": "Breton (https://app.transifex.com/nextcloud/teams/64236/br/)", "Content-Type": "text/plain; charset=UTF-8", Language: "br", "Plural-Forms": "nplurals=5; plural=((n%10 == 1) && (n%100 != 11) && (n%100 !=71) && (n%100 !=91) ? 0 :(n%10 == 2) && (n%100 != 12) && (n%100 !=72) && (n%100 !=92) ? 1 :(n%10 ==3 || n%10==4 || n%10==9) && (n%100 < 10 || n% 100 > 19) && (n%100 < 70 || n%100 > 79) && (n%100 < 90 || n%100 > 99) ? 2 :(n != 0 && n % 1000000 == 0) ? 3 : 4);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Joas Schilling, 2023
` }, msgstr: [`Last-Translator: Joas Schilling, 2023
Language-Team: Breton (https://app.transifex.com/nextcloud/teams/64236/br/)
Content-Type: text/plain; charset=UTF-8
Language: br
Plural-Forms: nplurals=5; plural=((n%10 == 1) && (n%100 != 11) && (n%100 !=71) && (n%100 !=91) ? 0 :(n%10 == 2) && (n%100 != 12) && (n%100 !=72) && (n%100 !=92) ? 1 :(n%10 ==3 || n%10==4 || n%10==9) && (n%100 < 10 || n% 100 > 19) && (n%100 < 70 || n%100 > 79) && (n%100 < 90 || n%100 > 99) ? 2 :(n != 0 && n % 1000000 == 0) ? 3 : 4);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: ["Disober"] } } } } }, { locale: "bs", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Bosnian (https://app.transifex.com/nextcloud/teams/64236/bs/)", "Content-Type": "text/plain; charset=UTF-8", Language: "bs", "Plural-Forms": "nplurals=3; plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Bosnian (https://app.transifex.com/nextcloud/teams/64236/bs/)
Content-Type: text/plain; charset=UTF-8
Language: bs
Plural-Forms: nplurals=3; plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "ca", json: { charset: "utf-8", headers: { "Last-Translator": "Benet Joan Darder <benetj@gmail.com>, 2025", "Language-Team": "Catalan (https://app.transifex.com/nextcloud/teams/64236/ca/)", "Content-Type": "text/plain; charset=UTF-8", Language: "ca", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
v v <e670006006@gmail.com>, 2024
Marc Riera <marcriera@softcatala.org>, 2024
Sergi Font, 2024
Benet Joan Darder <benetj@gmail.com>, 2025
` }, msgstr: [`Last-Translator: Benet Joan Darder <benetj@gmail.com>, 2025
Language-Team: Catalan (https://app.transifex.com/nextcloud/teams/64236/ca/)
Content-Type: text/plain; charset=UTF-8
Language: ca
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ['"{name}" és un nom de carpeta no vàlid.'] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ['"{name}" no és permès com a nom de carpeta'] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ['"/" no és permès en el nom de carpeta.'] }, "All files": { msgid: "All files", msgstr: ["Tots els fitxers"] }, Choose: { msgid: "Choose", msgstr: ["Tria"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Tria {file}"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["Tria %n fitxer", "Tria %n fitxers"] }, Copy: { msgid: "Copy", msgstr: ["Copia"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Copia a {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["No s'ha pogut crear la carpeta nova"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["No es poden carregar fitxers de configuració"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["No es poden carregar fitxers de vistes"] }, "Create directory": { msgid: "Create directory", msgstr: ["Crear directori"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Selector de visualització actual"] }, Favorites: { msgid: "Favorites", msgstr: ["Preferits"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Els fitxers i les carpetes que marqueu com a favorits es mostraran aquí."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Els fitxers i les carpetes recentment modificats es mostraran aquí."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Filtrar llistat de fitxers"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["El nom de la carpeta no pot estar buit."] }, Home: { msgid: "Home", msgstr: ["Inici"] }, Modified: { msgid: "Modified", msgstr: ["Data de modificació"] }, Move: { msgid: "Move", msgstr: ["Desplaça"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Desplaça a {target}"] }, Name: { msgid: "Name", msgstr: ["Nom"] }, New: { msgid: "New", msgstr: ["Crea"] }, "New folder": { msgid: "New folder", msgstr: ["Carpeta nova"] }, "New folder name": { msgid: "New folder name", msgstr: ["Nom de la carpeta nova"] }, "No files in here": { msgid: "No files in here", msgstr: ["No hi ha cap fitxer"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["No s'ha trobat cap fitxer que coincideixi amb el filtre."] }, "No matching files": { msgid: "No matching files", msgstr: ["No hi ha cap fitxer que coincideixi"] }, Recent: { msgid: "Recent", msgstr: ["Recents"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Selecciona totes les entrades"] }, "Select entry": { msgid: "Select entry", msgstr: ["Selecciona l'entrada"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Selecciona la fila per a {nodename}"] }, Size: { msgid: "Size", msgstr: ["Mida"] }, Undo: { msgid: "Undo", msgstr: ["Desfés"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Pugeu contingut o sincronitzeu-lo amb els vostres dispositius!"] } } } } }, { locale: "cs", json: { charset: "utf-8", headers: { "Last-Translator": "Pavel Borecki <pavel.borecki@gmail.com>, 2020", "Language-Team": "Czech (https://www.transifex.com/nextcloud/teams/64236/cs/)", "Content-Type": "text/plain; charset=UTF-8", Language: "cs", "Plural-Forms": "nplurals=4; plural=(n == 1 && n % 1 == 0) ? 0 : (n >= 2 && n <= 4 && n % 1 == 0) ? 1: (n % 1 != 0 ) ? 2 : 3;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Pavel Borecki <pavel.borecki@gmail.com>, 2020
` }, msgstr: [`Last-Translator: Pavel Borecki <pavel.borecki@gmail.com>, 2020
Language-Team: Czech (https://www.transifex.com/nextcloud/teams/64236/cs/)
Content-Type: text/plain; charset=UTF-8
Language: cs
Plural-Forms: nplurals=4; plural=(n == 1 && n % 1 == 0) ? 0 : (n >= 2 && n <= 4 && n % 1 == 0) ? 1: (n % 1 != 0 ) ? 2 : 3;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:187" }, msgstr: ["Zpět"] } } } } }, { locale: "cs_CZ", json: { charset: "utf-8", headers: { "Last-Translator": "Pavel Borecki <pavel.borecki@gmail.com>, 2025", "Language-Team": "Czech (Czech Republic) (https://app.transifex.com/nextcloud/teams/64236/cs_CZ/)", "Content-Type": "text/plain; charset=UTF-8", Language: "cs_CZ", "Plural-Forms": "nplurals=4; plural=(n == 1 && n % 1 == 0) ? 0 : (n >= 2 && n <= 4 && n % 1 == 0) ? 1: (n % 1 != 0 ) ? 2 : 3;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
Pavel Borecki <pavel.borecki@gmail.com>, 2025
` }, msgstr: [`Last-Translator: Pavel Borecki <pavel.borecki@gmail.com>, 2025
Language-Team: Czech (Czech Republic) (https://app.transifex.com/nextcloud/teams/64236/cs_CZ/)
Content-Type: text/plain; charset=UTF-8
Language: cs_CZ
Plural-Forms: nplurals=4; plural=(n == 1 && n % 1 == 0) ? 0 : (n >= 2 && n <= 4 && n % 1 == 0) ? 1: (n % 1 != 0 ) ? 2 : 3;
`] }, '"{char}" is not allowed inside a name.': { msgid: '"{char}" is not allowed inside a name.', msgstr: ["„{char}“ není možné použít uvnitř názvu."] }, '"{extension}" is not an allowed name.': { msgid: '"{extension}" is not an allowed name.', msgstr: ["„{extension}“ není možné použít jako název."] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ["„{name}“ není platný název složky."] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ["„{name}“ není povolený název složky."] }, '"{segment}" is a reserved name and not allowed.': { msgid: '"{segment}" is a reserved name and not allowed.', msgstr: ["„{segment}“ je vyhrazeným názvem a není možné ho použít."] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ["znak „/“ (dopředné lomítko) není možné použít uvnitř názvu složky."] }, "All files": { msgid: "All files", msgstr: ["Veškeré soubory"] }, Cancel: { msgid: "Cancel", msgstr: ["Storno"] }, Choose: { msgid: "Choose", msgstr: ["Zvolit"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Zvolit {file}"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["Zvolte %n soubor", "Zvolte %n soubory", "Zvolte %n souborů", "Zvolte %n soubory"] }, Copy: { msgid: "Copy", msgstr: ["Zkopírovat"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Zkopírovat do {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Novou složku se nepodařilo vytvořit"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["Nepodařilo se načíst nastavení pro soubory"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["Nepodařilo se načíst pohledy souborů"] }, "Create directory": { msgid: "Create directory", msgstr: ["Vytvořit složku"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Výběr stávajícího zobrazení"] }, "Enter your name": { msgid: "Enter your name", msgstr: ["Zadejte své jméno"] }, "Failed to set nickname.": { msgid: "Failed to set nickname.", msgstr: ["Nepodařilo se nastavit přezdívku."] }, Favorites: { msgid: "Favorites", msgstr: ["Oblíbené"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Zde se zobrazí soubory a složky, které označíte jako oblíbené."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Zde se zobrazí soubory a složky, které jste nedávno pozměnili."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Filtrovat seznam souborů"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["Složku je třeba nějak nazvat."] }, "Guest identification": { msgid: "Guest identification", msgstr: ["Identifikace hosta"] }, Home: { msgid: "Home", msgstr: ["Domů"] }, "Invalid name.": { msgid: "Invalid name.", msgstr: ["Neplatný název."] }, Modified: { msgid: "Modified", msgstr: ["Změněno"] }, Move: { msgid: "Move", msgstr: ["Přesounout"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Přesunout do {target}"] }, Name: { msgid: "Name", msgstr: ["Název"] }, "Names must not be empty.": { msgid: "Names must not be empty.", msgstr: ["Názvy je třeba vyplnit."] }, 'Names must not end with "{extension}".': { msgid: 'Names must not end with "{extension}".', msgstr: ["Názvy nemohou končit na „{extension}“."] }, "Names must not start with a dot.": { msgid: "Names must not start with a dot.", msgstr: ["Názvy nemohou začínat tečkou."] }, New: { msgid: "New", msgstr: ["Nové"] }, "New folder": { msgid: "New folder", msgstr: ["Nová složka"] }, "New folder name": { msgid: "New folder name", msgstr: ["Název pro novou složku"] }, "No files in here": { msgid: "No files in here", msgstr: ["Nejsou zde žádné soubory"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Nenalezeny žádné soubory odpovídající vašemu filtru"] }, "No matching files": { msgid: "No matching files", msgstr: ["Žádné odpovídající soubory"] }, "Please enter a name with at least 2 characters.": { msgid: "Please enter a name with at least 2 characters.", msgstr: ["Zadejte jméno dlouhé alespoň 2 znaky."] }, Recent: { msgid: "Recent", msgstr: ["Nedávné"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Vybrat všechny položky"] }, "Select entry": { msgid: "Select entry", msgstr: ["Vybrat položku"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Vybrat řádek pro {nodename}"] }, Size: { msgid: "Size", msgstr: ["Velikost"] }, "Submit name": { msgid: "Submit name", msgstr: ["Odeslat jméno"] }, Undo: { msgid: "Undo", msgstr: ["Zpět"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Nahrajte sem nějaký obsah nebo proveďte synchronizaci se svými zařízeními!"] }, "You are currently not identified.": { msgid: "You are currently not identified.", msgstr: ["V tuto chvíli nejste identifikovaní."] }, "You cannot leave the name empty.": { msgid: "You cannot leave the name empty.", msgstr: ["Jméno nelze ponechat nevyplněné."] } } } } }, { locale: "cy_GB", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Welsh (United Kingdom) (https://app.transifex.com/nextcloud/teams/64236/cy_GB/)", "Content-Type": "text/plain; charset=UTF-8", Language: "cy_GB", "Plural-Forms": "nplurals=4; plural=(n==1) ? 0 : (n==2) ? 1 : (n != 8 && n != 11) ? 2 : 3;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Welsh (United Kingdom) (https://app.transifex.com/nextcloud/teams/64236/cy_GB/)
Content-Type: text/plain; charset=UTF-8
Language: cy_GB
Plural-Forms: nplurals=4; plural=(n==1) ? 0 : (n==2) ? 1 : (n != 8 && n != 11) ? 2 : 3;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "da", json: { charset: "utf-8", headers: { "Last-Translator": "Martin Bonde <Martin@maboni.dk>, 2024", "Language-Team": "Danish (https://app.transifex.com/nextcloud/teams/64236/da/)", "Content-Type": "text/plain; charset=UTF-8", Language: "da", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
Martin Bonde <Martin@maboni.dk>, 2024
` }, msgstr: [`Last-Translator: Martin Bonde <Martin@maboni.dk>, 2024
Language-Team: Danish (https://app.transifex.com/nextcloud/teams/64236/da/)
Content-Type: text/plain; charset=UTF-8
Language: da
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ['"{name}" er et ugyldigt mappenavn.'] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ['"{name}" er ikke et tilladt mappenavn'] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ['"/" er ikke tilladt i et mappenavn.'] }, "All files": { msgid: "All files", msgstr: ["Alle filer"] }, Choose: { msgid: "Choose", msgstr: ["Vælg"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Vælg {file}"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["Vælg %n fil", "Vælg %n filer"] }, Copy: { msgid: "Copy", msgstr: ["Kopier"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Kopier til {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Kunne ikke oprette den nye mappe"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["Filindstillingerne kunne ikke indlæses"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["Kunne ikke indlæse filvisninger"] }, "Create directory": { msgid: "Create directory", msgstr: ["Opret mappe"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Aktuel visningsvælger"] }, Favorites: { msgid: "Favorites", msgstr: ["Favoritter"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Filer og mapper, du markerer som foretrukne, vises her."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Filer og mapper, du for nylig har ændret, vises her."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Filtrer fil liste"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["Mappenavnet må ikke være tomt."] }, Home: { msgid: "Home", msgstr: ["Hjem"] }, Modified: { msgid: "Modified", msgstr: ["Ændret"] }, Move: { msgid: "Move", msgstr: ["Flyt"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Flyt til {target}"] }, Name: { msgid: "Name", msgstr: ["Navn"] }, New: { msgid: "New", msgstr: ["Ny"] }, "New folder": { msgid: "New folder", msgstr: ["Ny mappe"] }, "New folder name": { msgid: "New folder name", msgstr: ["Ny mappe navn"] }, "No files in here": { msgid: "No files in here", msgstr: ["Ingen filer here"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Der blev ikke fundet nogen filer, der matcher dit filter."] }, "No matching files": { msgid: "No matching files", msgstr: ["Ingen matchende filer"] }, Recent: { msgid: "Recent", msgstr: ["Seneste"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Vælg alle poster"] }, "Select entry": { msgid: "Select entry", msgstr: ["Vælg post"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Vælg rækken for {nodenavn}"] }, Size: { msgid: "Size", msgstr: ["Størelse"] }, Undo: { msgid: "Undo", msgstr: ["Fortryd"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Upload noget indhold eller synkroniser med dine enheder!"] } } } } }, { locale: "de", json: { charset: "utf-8", headers: { "Last-Translator": "Mario Siegmann <mario_siegmann@web.de>, 2025", "Language-Team": "German (https://app.transifex.com/nextcloud/teams/64236/de/)", "Content-Type": "text/plain; charset=UTF-8", Language: "de", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Markus Eckstein, 2023
Andy Scherzinger <info@andy-scherzinger.de>, 2023
Ettore Atalan <atalanttore@googlemail.com>, 2024
Martin Wilichowski, 2025
Mario Siegmann <mario_siegmann@web.de>, 2025
` }, msgstr: [`Last-Translator: Mario Siegmann <mario_siegmann@web.de>, 2025
Language-Team: German (https://app.transifex.com/nextcloud/teams/64236/de/)
Content-Type: text/plain; charset=UTF-8
Language: de
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, '"{char}" is not allowed inside a name.': { msgid: '"{char}" is not allowed inside a name.', msgstr: ['"{char}" ist innerhalb eines Namens nicht zulässig.'] }, '"{extension}" is not an allowed name.': { msgid: '"{extension}" is not an allowed name.', msgstr: ['"{extension}" ist kein zulässiger Name.'] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ['"{name}" ist ein ungültiger Ordnername.'] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ['"{name}" ist kein zulässiger Ordnername'] }, '"{segment}" is a reserved name and not allowed.': { msgid: '"{segment}" is a reserved name and not allowed.', msgstr: ['"{segment}" ist ein reservierter Name und nicht zulässig.'] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ['"/" ist innerhalb eines Ordnernamens nicht zulässig.'] }, "All files": { msgid: "All files", msgstr: ["Alle Dateien"] }, Cancel: { msgid: "Cancel", msgstr: ["Abbrechen"] }, Choose: { msgid: "Choose", msgstr: ["Auswählen"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["{file} auswählen"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["%n Datei auswählen", "%n Dateien auswählen"] }, Copy: { msgid: "Copy", msgstr: ["Kopieren"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Nach {target} kopieren"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Der neue Ordner konnte nicht erstellt werden"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["Dateieinstellungen konnten nicht geladen werden"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["Dateiansichten konnten nicht geladen werden"] }, "Create directory": { msgid: "Create directory", msgstr: ["Verzeichnis erstellen"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Aktuelle Ansichtsauswahl"] }, "Enter your name": { msgid: "Enter your name", msgstr: ["Gib deinen Namen ein"] }, "Failed to set nickname.": { msgid: "Failed to set nickname.", msgstr: ["Spitzname konnte nicht gespeichert werden."] }, Favorites: { msgid: "Favorites", msgstr: ["Favoriten"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Dateien und Ordner, die du als Favorit markierst, werden hier angezeigt."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Dateien und Ordner, die du kürzlich geändert hast, werden hier angezeigt."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Dateiliste filtern"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["Der Ordnername darf nicht leer sein."] }, "Guest identification": { msgid: "Guest identification", msgstr: ["Gast-Identifikation"] }, Home: { msgid: "Home", msgstr: ["Home"] }, "Invalid name.": { msgid: "Invalid name.", msgstr: ["Ungültiger Name."] }, Modified: { msgid: "Modified", msgstr: ["Geändert"] }, Move: { msgid: "Move", msgstr: ["Verschieben"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Nach {target} verschieben"] }, Name: { msgid: "Name", msgstr: ["Name"] }, "Names must not be empty.": { msgid: "Names must not be empty.", msgstr: ["Namen dürfen nicht leer sein."] }, 'Names must not end with "{extension}".': { msgid: 'Names must not end with "{extension}".', msgstr: ['Namen dürfen nicht mit "{extension}" enden.'] }, "Names must not start with a dot.": { msgid: "Names must not start with a dot.", msgstr: ["Namen dürfen nicht mit einem Punkt beginnen."] }, New: { msgid: "New", msgstr: ["Neu"] }, "New folder": { msgid: "New folder", msgstr: ["Neuer Ordner"] }, "New folder name": { msgid: "New folder name", msgstr: ["Neuer Ordnername"] }, "No files in here": { msgid: "No files in here", msgstr: ["Hier sind keine Dateien"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Es wurden keine Dateien gefunden, die deinem Filter entsprechen."] }, "No matching files": { msgid: "No matching files", msgstr: ["Keine passenden Dateien"] }, "Please enter a name with at least 2 characters.": { msgid: "Please enter a name with at least 2 characters.", msgstr: ["Bitte einen Namen mit mindestens zwei Zeichen eingeben."] }, Recent: { msgid: "Recent", msgstr: ["Neueste"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Alle Einträge auswählen"] }, "Select entry": { msgid: "Select entry", msgstr: ["Eintrag auswählen"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Die Zeile für {nodename} auswählen."] }, Size: { msgid: "Size", msgstr: ["Größe"] }, "Submit name": { msgid: "Submit name", msgstr: ["Namen senden"] }, Undo: { msgid: "Undo", msgstr: ["Rückgängig machen"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Lade Inhalte hoch oder synchronisiere diese mit deinen Geräten!"] }, "You are currently identified as {nickname}.": { msgid: "You are currently identified as {nickname}.", msgstr: ["Du bist derzeit als {nickname} identifiziert."] }, "You are currently not identified.": { msgid: "You are currently not identified.", msgstr: ["Du bist momentan nicht identifiziert."] }, "You cannot leave the name empty.": { msgid: "You cannot leave the name empty.", msgstr: ["Du kannst den Namen nicht leer lassen."] } } } } }, { locale: "de_DE", json: { charset: "utf-8", headers: { "Last-Translator": "Mario Siegmann <mario_siegmann@web.de>, 2025", "Language-Team": "German (Germany) (https://app.transifex.com/nextcloud/teams/64236/de_DE/)", "Content-Type": "text/plain; charset=UTF-8", Language: "de_DE", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
Mark Ziegler <mark.ziegler@rakekniven.de>, 2025
Martin Wilichowski, 2025
Mario Siegmann <mario_siegmann@web.de>, 2025
` }, msgstr: [`Last-Translator: Mario Siegmann <mario_siegmann@web.de>, 2025
Language-Team: German (Germany) (https://app.transifex.com/nextcloud/teams/64236/de_DE/)
Content-Type: text/plain; charset=UTF-8
Language: de_DE
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, '"{char}" is not allowed inside a name.': { msgid: '"{char}" is not allowed inside a name.', msgstr: ['"{char}" ist innerhalb eines Namens nicht zulässig.'] }, '"{extension}" is not an allowed name.': { msgid: '"{extension}" is not an allowed name.', msgstr: ['"{extension}" ist kein zulässiger Name.'] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ['"{name}" ist ein ungültiger Ordnername.'] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ['"{name}" ist kein zulässiger Ordnername'] }, '"{segment}" is a reserved name and not allowed.': { msgid: '"{segment}" is a reserved name and not allowed.', msgstr: ['"{segment}" ist ein reservierter Name und nicht zulässig.'] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ['"/" ist innerhalb eines Ordnernamens nicht zulässig.'] }, "All files": { msgid: "All files", msgstr: ["Alle Dateien"] }, Cancel: { msgid: "Cancel", msgstr: ["Abbrechen"] }, Choose: { msgid: "Choose", msgstr: ["Auswählen"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["{file} auswählen"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["%n Datei auswählen", "%n Dateien auswählen"] }, Copy: { msgid: "Copy", msgstr: ["Kopieren"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Nach {target} kopieren"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Der neue Ordner konnte nicht erstellt werden"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["Dateieinstellungen konnten nicht geladen werden"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["Dateiansichten konnten nicht geladen werden"] }, "Create directory": { msgid: "Create directory", msgstr: ["Verzeichnis erstellen"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Aktuelle Ansichtsauswahl"] }, "Enter your name": { msgid: "Enter your name", msgstr: ["Geben Sie Ihren Namen ein"] }, "Failed to set nickname.": { msgid: "Failed to set nickname.", msgstr: ["Spitzname konnte nicht gespeichert werden."] }, Favorites: { msgid: "Favorites", msgstr: ["Favoriten"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Dateien und Ordner, die Sie als Favorit markieren, werden hier angezeigt."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Dateien und Ordner, die Sie kürzlich geändert haben, werden hier angezeigt."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Dateiliste filtern"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["Der Ordnername darf nicht leer sein."] }, "Guest identification": { msgid: "Guest identification", msgstr: ["Gast-Identifikation"] }, Home: { msgid: "Home", msgstr: ["Home"] }, "Invalid name.": { msgid: "Invalid name.", msgstr: ["Ungültiger Name."] }, Modified: { msgid: "Modified", msgstr: ["Geändert"] }, Move: { msgid: "Move", msgstr: ["Verschieben"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Nach {target} verschieben"] }, Name: { msgid: "Name", msgstr: ["Name"] }, "Names must not be empty.": { msgid: "Names must not be empty.", msgstr: ["Namen dürfen nicht leer sein."] }, 'Names must not end with "{extension}".': { msgid: 'Names must not end with "{extension}".', msgstr: ['Namen dürfen nicht mit "{extension}" enden.'] }, "Names must not start with a dot.": { msgid: "Names must not start with a dot.", msgstr: ["Namen dürfen nicht mit einem Punkt beginnen."] }, New: { msgid: "New", msgstr: ["Neu"] }, "New folder": { msgid: "New folder", msgstr: ["Neuer Ordner"] }, "New folder name": { msgid: "New folder name", msgstr: ["Neuer Ordnername"] }, "No files in here": { msgid: "No files in here", msgstr: ["Hier sind keine Dateien"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Es wurden keine Dateien gefunden, die Ihrem Filter entsprechen."] }, "No matching files": { msgid: "No matching files", msgstr: ["Keine passenden Dateien"] }, "Please enter a name with at least 2 characters.": { msgid: "Please enter a name with at least 2 characters.", msgstr: ["Bitte einen Namen mit mindestens zwei Zeichen eingeben."] }, Recent: { msgid: "Recent", msgstr: ["Neueste"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Alle Einträge auswählen"] }, "Select entry": { msgid: "Select entry", msgstr: ["Eintrag auswählen"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Die Zeile für {nodename} auswählen."] }, Size: { msgid: "Size", msgstr: ["Größe"] }, "Submit name": { msgid: "Submit name", msgstr: ["Namen senden"] }, Undo: { msgid: "Undo", msgstr: ["Rückgängig machen"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Laden Sie Inhalte hoch oder synchronisieren Sie diese mit Ihren Geräten!"] }, "You are currently identified as {nickname}.": { msgid: "You are currently identified as {nickname}.", msgstr: ["Sie sind derzeit als {nickname} identifiziert."] }, "You are currently not identified.": { msgid: "You are currently not identified.", msgstr: ["Sie sind momentan nicht identifiziert."] }, "You cannot leave the name empty.": { msgid: "You cannot leave the name empty.", msgstr: ["Sie können den Namen nicht leer lassen."] } } } } }, { locale: "el", json: { charset: "utf-8", headers: { "Last-Translator": "Efstathios Iosifidis <iefstathios@gmail.com>, 2025", "Language-Team": "Greek (https://app.transifex.com/nextcloud/teams/64236/el/)", "Content-Type": "text/plain; charset=UTF-8", Language: "el", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
Efstathios Iosifidis <iefstathios@gmail.com>, 2025
` }, msgstr: [`Last-Translator: Efstathios Iosifidis <iefstathios@gmail.com>, 2025
Language-Team: Greek (https://app.transifex.com/nextcloud/teams/64236/el/)
Content-Type: text/plain; charset=UTF-8
Language: el
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ['Το "{name}" δεν είναι έγκυρο όνομα φακέλου.'] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ['Το "{name}" δεν είναι επιτρεπτό όνομα φακέλου'] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ['Το "/" δεν επιτρέπεται μέσα στο όνομα ενός φακέλου.'] }, "All files": { msgid: "All files", msgstr: ["Όλα τα αρχεία"] }, Choose: { msgid: "Choose", msgstr: ["Επιλογή"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Επιλέξτε {file}"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["Επιλέξτε %n αρχείο", "Επιλέξτε %n αρχεία"] }, Copy: { msgid: "Copy", msgstr: ["Αντιγραφή"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Αντιγραφή στο {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Αδυναμία δημιουργίας νέου φακέλου"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["Αδυναμία φόρτωσης ρυθμίσεων αρχείων"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["Αδυναμία φόρτωσης προβολών αρχείων"] }, "Create directory": { msgid: "Create directory", msgstr: ["Δημιουργία καταλόγου"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Επιλογέας τρέχουσας προβολής"] }, Favorites: { msgid: "Favorites", msgstr: ["Αγαπημένα"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Τα αρχεία και οι φάκελοι που επισημάνετε ως αγαπημένα θα εμφανίζονται εδώ."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Τα αρχεία και οι φάκελοι που τροποποιήσατε πρόσφατα θα εμφανίζονται εδώ."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Φιλτράρισμα λίστας αρχείων"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["Το όνομα του φακέλου δεν μπορεί να είναι κενό."] }, Home: { msgid: "Home", msgstr: ["Αρχική"] }, Modified: { msgid: "Modified", msgstr: ["Τροποποιήθηκε"] }, Move: { msgid: "Move", msgstr: ["Μετακίνηση"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Μετακίνηση στο {target}"] }, Name: { msgid: "Name", msgstr: ["Όνομα"] }, New: { msgid: "New", msgstr: ["Νέο"] }, "New folder": { msgid: "New folder", msgstr: ["Νέος φάκελος"] }, "New folder name": { msgid: "New folder name", msgstr: ["Όνομα νέου φακέλου"] }, "No files in here": { msgid: "No files in here", msgstr: ["Δεν υπάρχουν αρχεία εδώ"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Δεν βρέθηκαν αρχεία που να ταιριάζουν με το φίλτρο σας."] }, "No matching files": { msgid: "No matching files", msgstr: ["Κανένα αρχείο δεν ταιριάζει"] }, Recent: { msgid: "Recent", msgstr: ["Πρόσφατα"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Επιλογή όλων των εγγραφών"] }, "Select entry": { msgid: "Select entry", msgstr: ["Επιλογή εγγραφής"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Επιλέξτε τη γραμμή για το {nodename}"] }, Size: { msgid: "Size", msgstr: ["Μέγεθος"] }, Undo: { msgid: "Undo", msgstr: ["Αναίρεση"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Ανεβάστε κάποιο περιεχόμενο ή συγχρονίστε με τις συσκευές σας!"] } } } } }, { locale: "en_GB", json: { charset: "utf-8", headers: { "Last-Translator": "Andi Chandler <andi@gowling.com>, 2025", "Language-Team": "English (United Kingdom) (https://app.transifex.com/nextcloud/teams/64236/en_GB/)", "Content-Type": "text/plain; charset=UTF-8", Language: "en_GB", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
Café Tango, 2023
Andi Chandler <andi@gowling.com>, 2025
` }, msgstr: [`Last-Translator: Andi Chandler <andi@gowling.com>, 2025
Language-Team: English (United Kingdom) (https://app.transifex.com/nextcloud/teams/64236/en_GB/)
Content-Type: text/plain; charset=UTF-8
Language: en_GB
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, '"{char}" is not allowed inside a name.': { msgid: '"{char}" is not allowed inside a name.', msgstr: ['"{char}" is not allowed inside a name.'] }, '"{extension}" is not an allowed name.': { msgid: '"{extension}" is not an allowed name.', msgstr: ['"{extension}" is not an allowed name.'] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ['"{name}" is an invalid folder name.'] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ['"{name}" is not an allowed folder name'] }, '"{segment}" is a reserved name and not allowed.': { msgid: '"{segment}" is a reserved name and not allowed.', msgstr: ['"{segment}" is a reserved name and not allowed.'] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ['"/" is not allowed inside a folder name.'] }, "All files": { msgid: "All files", msgstr: ["All files"] }, Cancel: { msgid: "Cancel", msgstr: ["Cancel"] }, Choose: { msgid: "Choose", msgstr: ["Choose"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Choose {file}"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["Choose %n file", "Choose %n files"] }, Copy: { msgid: "Copy", msgstr: ["Copy"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Copy to {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Could not create the new folder"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["Could not load files settings"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["Could not load files views"] }, "Create directory": { msgid: "Create directory", msgstr: ["Create directory"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Current view selector"] }, "Enter your name": { msgid: "Enter your name", msgstr: ["Enter your name"] }, "Failed to set nickname.": { msgid: "Failed to set nickname.", msgstr: ["Failed to set nickname."] }, Favorites: { msgid: "Favorites", msgstr: ["Favourites"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Files and folders you mark as favourite will show up here."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Files and folders you recently modified will show up here."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Filter file list"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["Folder name cannot be empty."] }, "Guest identification": { msgid: "Guest identification", msgstr: ["Guest identification"] }, Home: { msgid: "Home", msgstr: ["Home"] }, "Invalid name.": { msgid: "Invalid name.", msgstr: ["Invalid name."] }, Modified: { msgid: "Modified", msgstr: ["Modified"] }, Move: { msgid: "Move", msgstr: ["Move"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Move to {target}"] }, Name: { msgid: "Name", msgstr: ["Name"] }, "Names must not be empty.": { msgid: "Names must not be empty.", msgstr: ["Names must not be empty."] }, 'Names must not end with "{extension}".': { msgid: 'Names must not end with "{extension}".', msgstr: ['Names must not end with "{extension}".'] }, "Names must not start with a dot.": { msgid: "Names must not start with a dot.", msgstr: ["Names must not start with a dot."] }, New: { msgid: "New", msgstr: ["New"] }, "New folder": { msgid: "New folder", msgstr: ["New folder"] }, "New folder name": { msgid: "New folder name", msgstr: ["New folder name"] }, "No files in here": { msgid: "No files in here", msgstr: ["No files in here"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["No files matching your filter were found."] }, "No matching files": { msgid: "No matching files", msgstr: ["No matching files"] }, "Please enter a name with at least 2 characters.": { msgid: "Please enter a name with at least 2 characters.", msgstr: ["Please enter a name with at least 2 characters."] }, Recent: { msgid: "Recent", msgstr: ["Recent"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Select all entries"] }, "Select entry": { msgid: "Select entry", msgstr: ["Select entry"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Select the row for {nodename}"] }, Size: { msgid: "Size", msgstr: ["Size"] }, "Submit name": { msgid: "Submit name", msgstr: ["Submit name"] }, Undo: { msgid: "Undo", msgstr: ["Undo"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Upload some content or sync with your devices!"] }, "You are currently not identified.": { msgid: "You are currently not identified.", msgstr: ["You are currently not identified."] }, "You cannot leave the name empty.": { msgid: "You cannot leave the name empty.", msgstr: ["You cannot leave the name empty."] } } } } }, { locale: "eo", json: { charset: "utf-8", headers: { "Last-Translator": "Joas Schilling, 2023", "Language-Team": "Esperanto (https://app.transifex.com/nextcloud/teams/64236/eo/)", "Content-Type": "text/plain; charset=UTF-8", Language: "eo", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Joas Schilling, 2023
` }, msgstr: [`Last-Translator: Joas Schilling, 2023
Language-Team: Esperanto (https://app.transifex.com/nextcloud/teams/64236/eo/)
Content-Type: text/plain; charset=UTF-8
Language: eo
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: ["Malfari"] } } } } }, { locale: "es", json: { charset: "utf-8", headers: { "Last-Translator": "Julio C. Ortega, 2025", "Language-Team": "Spanish (https://app.transifex.com/nextcloud/teams/64236/es/)", "Content-Type": "text/plain; charset=UTF-8", Language: "es", "Plural-Forms": "nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
FranciscoFJ <dev-ooo@satel-sa.com>, 2023
Mark Ziegler <mark.ziegler@rakekniven.de>, 2024
Julio C. Ortega, 2025
` }, msgstr: [`Last-Translator: Julio C. Ortega, 2025
Language-Team: Spanish (https://app.transifex.com/nextcloud/teams/64236/es/)
Content-Type: text/plain; charset=UTF-8
Language: es
Plural-Forms: nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;
`] }, '"{char}" is not allowed inside a name.': { msgid: '"{char}" is not allowed inside a name.', msgstr: ['"{char}" no está permitido dentro de un nombre.'] }, '"{extension}" is not an allowed name.': { msgid: '"{extension}" is not an allowed name.', msgstr: ['"{extension}" no es un nombre permitido.'] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ['"{name}" es un nombre de carpeta no válido.'] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ['"{name}" no es un nombre de carpeta permitido'] }, '"{segment}" is a reserved name and not allowed.': { msgid: '"{segment}" is a reserved name and not allowed.', msgstr: ['"{segment}" es un nombre reservado y no está permitido.'] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ['"/" no está permitido dentro del nombre de una carpeta.'] }, "All files": { msgid: "All files", msgstr: ["Todos los archivos"] }, Cancel: { msgid: "Cancel", msgstr: ["Cancelar"] }, Choose: { msgid: "Choose", msgstr: ["Seleccionar"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Seleccionar {file}"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["Elige %n archivo", "Elige %n archivos", "Seleccione %n archivos"] }, Copy: { msgid: "Copy", msgstr: ["Copiar"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Copiar a {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["No se pudo crear la nueva carpeta"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["No se pudieron cargar los ajustes de archivos"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["No se pudieron cargar las vistas de los archivos"] }, "Create directory": { msgid: "Create directory", msgstr: ["Crear directorio"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Selector de vista actual"] }, "Enter your name": { msgid: "Enter your name", msgstr: ["Ingrese su nombre"] }, "Failed to set nickname.": { msgid: "Failed to set nickname.", msgstr: ["Fallo al establecer apodo."] }, Favorites: { msgid: "Favorites", msgstr: ["Favoritos"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Los archivos y carpetas que marque como favoritos aparecerán aquí."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Los archivos y carpetas que modificó recientemente aparecerán aquí."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Filtrar lista de archivos"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["El nombre de la carpeta no puede estar vacío."] }, "Guest identification": { msgid: "Guest identification", msgstr: ["Identificación de invitado"] }, Home: { msgid: "Home", msgstr: ["Inicio"] }, "Invalid name.": { msgid: "Invalid name.", msgstr: ["Nombre inválido."] }, Modified: { msgid: "Modified", msgstr: ["Modificado"] }, Move: { msgid: "Move", msgstr: ["Mover"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Mover a {target}"] }, Name: { msgid: "Name", msgstr: ["Nombre"] }, "Names must not be empty.": { msgid: "Names must not be empty.", msgstr: ["Los nombres no deben estar vacíos."] }, 'Names must not end with "{extension}".': { msgid: 'Names must not end with "{extension}".', msgstr: ['Los nombres no deben terminar con "{extension}".'] }, "Names must not start with a dot.": { msgid: "Names must not start with a dot.", msgstr: ["Los nombres no deben iniciar con un punto."] }, New: { msgid: "New", msgstr: ["Nuevo"] }, "New folder": { msgid: "New folder", msgstr: [" Nueva carpeta"] }, "New folder name": { msgid: "New folder name", msgstr: ["Nuevo nombre de carpeta"] }, "No files in here": { msgid: "No files in here", msgstr: ["No hay archivos aquí"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["No se encontraron archivos que coincidiesen con su filtro."] }, "No matching files": { msgid: "No matching files", msgstr: ["No hay archivos coincidentes"] }, "Please enter a name with at least 2 characters.": { msgid: "Please enter a name with at least 2 characters.", msgstr: ["Por favor, ingrese un nombre con al menos 2 caracteres."] }, Recent: { msgid: "Recent", msgstr: ["Reciente"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Seleccionar todas las entradas"] }, "Select entry": { msgid: "Select entry", msgstr: ["Seleccionar entrada"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Seleccione la fila para {nodename}"] }, Size: { msgid: "Size", msgstr: ["Tamaño"] }, "Submit name": { msgid: "Submit name", msgstr: ["Enviar nombre"] }, Undo: { msgid: "Undo", msgstr: ["Deshacer"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["¡Cargue algún contenido o sincronice con sus dispositivos!"] }, "You are currently not identified.": { msgid: "You are currently not identified.", msgstr: ["Ud. no se encuentra identificado actualmente."] }, "You cannot leave the name empty.": { msgid: "You cannot leave the name empty.", msgstr: ["No puede dejar el nombre vacío."] } } } } }, { locale: "es_419", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Spanish (Latin America) (https://app.transifex.com/nextcloud/teams/64236/es_419/)", "Content-Type": "text/plain; charset=UTF-8", Language: "es_419", "Plural-Forms": "nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Spanish (Latin America) (https://app.transifex.com/nextcloud/teams/64236/es_419/)
Content-Type: text/plain; charset=UTF-8
Language: es_419
Plural-Forms: nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "es_AR", json: { charset: "utf-8", headers: { "Last-Translator": "Matías Campo Hoet <matiascampo@gmail.com>, 2024", "Language-Team": "Spanish (Argentina) (https://app.transifex.com/nextcloud/teams/64236/es_AR/)", "Content-Type": "text/plain; charset=UTF-8", Language: "es_AR", "Plural-Forms": "nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
Matías Campo Hoet <matiascampo@gmail.com>, 2024
` }, msgstr: [`Last-Translator: Matías Campo Hoet <matiascampo@gmail.com>, 2024
Language-Team: Spanish (Argentina) (https://app.transifex.com/nextcloud/teams/64236/es_AR/)
Content-Type: text/plain; charset=UTF-8
Language: es_AR
Plural-Forms: nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;
`] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ['"{name}" es un nombre de carpeta inválido.'] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ['"{name}" no es un nombre de carpeta permitido'] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ['"/" no está permitido en el nombre de una carpeta.'] }, "All files": { msgid: "All files", msgstr: ["Todos los archivos"] }, Choose: { msgid: "Choose", msgstr: ["Elegir"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Elija {file}"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["Elija %n archivo", "Elija %n archivos", "Elija %n archivos"] }, Copy: { msgid: "Copy", msgstr: ["Copiar"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Copiar a {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["No se pudo crear la nueva carpeta"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["No se pudo cargar la configuración de archivos"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["No se pudieron cargar las vistas de los archivos"] }, "Create directory": { msgid: "Create directory", msgstr: ["Crear directorio"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Selector de vista actual"] }, Favorites: { msgid: "Favorites", msgstr: ["Favoritos"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Los archivos y carpetas que marque como favoritos aparecerán aquí."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Los archivos y carpetas que modificó recientemente aparecerán aquí."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Filtrar lista de archivos"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["El nombre de la carpeta no puede estar vacío."] }, Home: { msgid: "Home", msgstr: ["Inicio"] }, Modified: { msgid: "Modified", msgstr: ["Modificado"] }, Move: { msgid: "Move", msgstr: ["Mover"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Mover a {target}"] }, Name: { msgid: "Name", msgstr: ["Nombre"] }, New: { msgid: "New", msgstr: ["Nuevo"] }, "New folder": { msgid: "New folder", msgstr: ["Nueva carpeta"] }, "New folder name": { msgid: "New folder name", msgstr: ["Nombre de nueva carpeta"] }, "No files in here": { msgid: "No files in here", msgstr: ["No hay archivos aquí"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["No se encontraron archivos que coincidan con su filtro."] }, "No matching files": { msgid: "No matching files", msgstr: ["No hay archivos coincidentes"] }, Recent: { msgid: "Recent", msgstr: ["Reciente"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Seleccionar todas las entradas"] }, "Select entry": { msgid: "Select entry", msgstr: ["Seleccionar entrada"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Seleccione la fila para {nodename}"] }, Size: { msgid: "Size", msgstr: ["Tamaño"] }, Undo: { msgid: "Undo", msgstr: ["Deshacer"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["¡Cargue algún contenido o sincronice con sus dispositivos!"] } } } } }, { locale: "es_CL", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Spanish (Chile) (https://app.transifex.com/nextcloud/teams/64236/es_CL/)", "Content-Type": "text/plain; charset=UTF-8", Language: "es_CL", "Plural-Forms": "nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Spanish (Chile) (https://app.transifex.com/nextcloud/teams/64236/es_CL/)
Content-Type: text/plain; charset=UTF-8
Language: es_CL
Plural-Forms: nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "es_CO", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Spanish (Colombia) (https://app.transifex.com/nextcloud/teams/64236/es_CO/)", "Content-Type": "text/plain; charset=UTF-8", Language: "es_CO", "Plural-Forms": "nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Spanish (Colombia) (https://app.transifex.com/nextcloud/teams/64236/es_CO/)
Content-Type: text/plain; charset=UTF-8
Language: es_CO
Plural-Forms: nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "es_CR", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Spanish (Costa Rica) (https://app.transifex.com/nextcloud/teams/64236/es_CR/)", "Content-Type": "text/plain; charset=UTF-8", Language: "es_CR", "Plural-Forms": "nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Spanish (Costa Rica) (https://app.transifex.com/nextcloud/teams/64236/es_CR/)
Content-Type: text/plain; charset=UTF-8
Language: es_CR
Plural-Forms: nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "es_DO", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Spanish (Dominican Republic) (https://app.transifex.com/nextcloud/teams/64236/es_DO/)", "Content-Type": "text/plain; charset=UTF-8", Language: "es_DO", "Plural-Forms": "nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Spanish (Dominican Republic) (https://app.transifex.com/nextcloud/teams/64236/es_DO/)
Content-Type: text/plain; charset=UTF-8
Language: es_DO
Plural-Forms: nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "es_EC", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Spanish (Ecuador) (https://app.transifex.com/nextcloud/teams/64236/es_EC/)", "Content-Type": "text/plain; charset=UTF-8", Language: "es_EC", "Plural-Forms": "nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Spanish (Ecuador) (https://app.transifex.com/nextcloud/teams/64236/es_EC/)
Content-Type: text/plain; charset=UTF-8
Language: es_EC
Plural-Forms: nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "es_GT", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Spanish (Guatemala) (https://app.transifex.com/nextcloud/teams/64236/es_GT/)", "Content-Type": "text/plain; charset=UTF-8", Language: "es_GT", "Plural-Forms": "nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Spanish (Guatemala) (https://app.transifex.com/nextcloud/teams/64236/es_GT/)
Content-Type: text/plain; charset=UTF-8
Language: es_GT
Plural-Forms: nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "es_HN", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Spanish (Honduras) (https://app.transifex.com/nextcloud/teams/64236/es_HN/)", "Content-Type": "text/plain; charset=UTF-8", Language: "es_HN", "Plural-Forms": "nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Spanish (Honduras) (https://app.transifex.com/nextcloud/teams/64236/es_HN/)
Content-Type: text/plain; charset=UTF-8
Language: es_HN
Plural-Forms: nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "es_MX", json: { charset: "utf-8", headers: { "Last-Translator": "Jehu Marcos Herrera Puentes, 2024", "Language-Team": "Spanish (Mexico) (https://app.transifex.com/nextcloud/teams/64236/es_MX/)", "Content-Type": "text/plain; charset=UTF-8", Language: "es_MX", "Plural-Forms": "nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
Jehu Marcos Herrera Puentes, 2024
` }, msgstr: [`Last-Translator: Jehu Marcos Herrera Puentes, 2024
Language-Team: Spanish (Mexico) (https://app.transifex.com/nextcloud/teams/64236/es_MX/)
Content-Type: text/plain; charset=UTF-8
Language: es_MX
Plural-Forms: nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;
`] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ['"{name}" es un nombre de carpeta inválido.'] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ['"{name}" no es un nombre de carpeta permitido.'] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ['"/" no está permitido en el nombre de la carpeta.'] }, "All files": { msgid: "All files", msgstr: ["Todos los archivos"] }, Choose: { msgid: "Choose", msgstr: ["Seleccionar"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Seleccionar {file}"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["Seleccionar %n archivo", "Seleccionar %n archivos", "Seleccionar %n archivos"] }, Copy: { msgid: "Copy", msgstr: ["Copiar"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Copiar a {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["No se pudo crear la nueva carpeta"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["No se pudo cargar la configuración de archivos"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["No se pudieron cargar las vistas de los archivos"] }, "Create directory": { msgid: "Create directory", msgstr: ["Crear carpeta"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Selector de vista actual"] }, Favorites: { msgid: "Favorites", msgstr: ["Favoritos"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Los archivos y carpetas que marque como favoritos aparecerán aquí."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Los archivos y carpetas que modificó recientemente aparecerán aquí."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Filtrar lista de archivos"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["El nombre de la carpeta no puede estar vacío."] }, Home: { msgid: "Home", msgstr: ["Inicio"] }, Modified: { msgid: "Modified", msgstr: ["Modificado"] }, Move: { msgid: "Move", msgstr: ["Mover"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Mover a {target}"] }, Name: { msgid: "Name", msgstr: ["Nombre"] }, New: { msgid: "New", msgstr: ["Nuevo"] }, "New folder": { msgid: "New folder", msgstr: ["Nueva carpeta"] }, "New folder name": { msgid: "New folder name", msgstr: ["Nombre de nueva carpeta"] }, "No files in here": { msgid: "No files in here", msgstr: ["No hay archivos aquí"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["No se encontraron archivos que coincidan con su filtro."] }, "No matching files": { msgid: "No matching files", msgstr: ["No hay archivos coincidentes"] }, Recent: { msgid: "Recent", msgstr: ["Reciente"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Seleccionar todas las entradas"] }, "Select entry": { msgid: "Select entry", msgstr: ["Seleccionar entrada"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Seleccione la fila para {nodename}"] }, Size: { msgid: "Size", msgstr: ["Tamaño"] }, Undo: { msgid: "Undo", msgstr: ["Deshacer"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["¡Suba algún contenido o sincronice con sus dispositivos!"] } } } } }, { locale: "es_NI", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Spanish (Nicaragua) (https://app.transifex.com/nextcloud/teams/64236/es_NI/)", "Content-Type": "text/plain; charset=UTF-8", Language: "es_NI", "Plural-Forms": "nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Spanish (Nicaragua) (https://app.transifex.com/nextcloud/teams/64236/es_NI/)
Content-Type: text/plain; charset=UTF-8
Language: es_NI
Plural-Forms: nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "es_PA", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Spanish (Panama) (https://app.transifex.com/nextcloud/teams/64236/es_PA/)", "Content-Type": "text/plain; charset=UTF-8", Language: "es_PA", "Plural-Forms": "nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Spanish (Panama) (https://app.transifex.com/nextcloud/teams/64236/es_PA/)
Content-Type: text/plain; charset=UTF-8
Language: es_PA
Plural-Forms: nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "es_PE", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Spanish (Peru) (https://app.transifex.com/nextcloud/teams/64236/es_PE/)", "Content-Type": "text/plain; charset=UTF-8", Language: "es_PE", "Plural-Forms": "nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Spanish (Peru) (https://app.transifex.com/nextcloud/teams/64236/es_PE/)
Content-Type: text/plain; charset=UTF-8
Language: es_PE
Plural-Forms: nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "es_PR", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Spanish (Puerto Rico) (https://app.transifex.com/nextcloud/teams/64236/es_PR/)", "Content-Type": "text/plain; charset=UTF-8", Language: "es_PR", "Plural-Forms": "nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Spanish (Puerto Rico) (https://app.transifex.com/nextcloud/teams/64236/es_PR/)
Content-Type: text/plain; charset=UTF-8
Language: es_PR
Plural-Forms: nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "es_PY", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Spanish (Paraguay) (https://app.transifex.com/nextcloud/teams/64236/es_PY/)", "Content-Type": "text/plain; charset=UTF-8", Language: "es_PY", "Plural-Forms": "nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Spanish (Paraguay) (https://app.transifex.com/nextcloud/teams/64236/es_PY/)
Content-Type: text/plain; charset=UTF-8
Language: es_PY
Plural-Forms: nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "es_SV", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Spanish (El Salvador) (https://app.transifex.com/nextcloud/teams/64236/es_SV/)", "Content-Type": "text/plain; charset=UTF-8", Language: "es_SV", "Plural-Forms": "nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Spanish (El Salvador) (https://app.transifex.com/nextcloud/teams/64236/es_SV/)
Content-Type: text/plain; charset=UTF-8
Language: es_SV
Plural-Forms: nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "es_UY", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Spanish (Uruguay) (https://app.transifex.com/nextcloud/teams/64236/es_UY/)", "Content-Type": "text/plain; charset=UTF-8", Language: "es_UY", "Plural-Forms": "nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Spanish (Uruguay) (https://app.transifex.com/nextcloud/teams/64236/es_UY/)
Content-Type: text/plain; charset=UTF-8
Language: es_UY
Plural-Forms: nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "et_EE", json: { charset: "utf-8", headers: { "Last-Translator": "Priit Jõerüüt <transifex@joeruut.com>, 2025", "Language-Team": "Estonian (Estonia) (https://app.transifex.com/nextcloud/teams/64236/et_EE/)", "Content-Type": "text/plain; charset=UTF-8", Language: "et_EE", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Mait R, 2023
Priit Jõerüüt <transifex@joeruut.com>, 2025
` }, msgstr: [`Last-Translator: Priit Jõerüüt <transifex@joeruut.com>, 2025
Language-Team: Estonian (Estonia) (https://app.transifex.com/nextcloud/teams/64236/et_EE/)
Content-Type: text/plain; charset=UTF-8
Language: et_EE
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, '"{char}" is not allowed inside a name.': { msgid: '"{char}" is not allowed inside a name.', msgstr: ["„{char}“ pole nimes lubatud."] }, '"{extension}" is not an allowed name.': { msgid: '"{extension}" is not an allowed name.', msgstr: ["„{extension}“ pole lubatud nimi."] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ["„{name}“ on vigane kausta nimi."] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ["„{name}“ pole kausta nimes lubatud"] }, '"{segment}" is a reserved name and not allowed.': { msgid: '"{segment}" is a reserved name and not allowed.', msgstr: ["„{segment}“ on reserveeritud nimi ja pole kasutamiseks lubatud."] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ["„/“ pole kausta nimes lubatud."] }, "All files": { msgid: "All files", msgstr: ["Kõik failid"] }, Cancel: { msgid: "Cancel", msgstr: ["Katkesta"] }, Choose: { msgid: "Choose", msgstr: ["Tee valik"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Vali {file} fail"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["Vali %n fail", "Vali %n faili"] }, Copy: { msgid: "Copy", msgstr: ["Kopeeri"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Kopeeri sihtkohta {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Uut kausta ei saanud luua"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["Failide seadistusi ei õnnestunud laadida"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["Failide vaatamiskordi ei õnnestunud laadida"] }, "Create directory": { msgid: "Create directory", msgstr: ["Loo kaust"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Praeguse vaate valija"] }, "Enter your name": { msgid: "Enter your name", msgstr: ["Sisesta oma nimi"] }, "Failed to set nickname.": { msgid: "Failed to set nickname.", msgstr: ["Hüüdnime ei õnnestunud lisada"] }, Favorites: { msgid: "Favorites", msgstr: ["Lemmikud"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Failid ja kaustad, mida märgistad lemmikuks, kuvatakse siin."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Siin kuvatakse hiljuti muudetud failid ja kaustad."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Filtreeri faililoendit"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["Kausta nimi ei saa olla tühi."] }, "Guest identification": { msgid: "Guest identification", msgstr: ["Külalise tuvastamine"] }, Home: { msgid: "Home", msgstr: ["Avaleht"] }, "Invalid name.": { msgid: "Invalid name.", msgstr: ["Vigane nimi."] }, Modified: { msgid: "Modified", msgstr: ["Muudetud"] }, Move: { msgid: "Move", msgstr: ["Teisalda"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Teisalda kausta {target}"] }, Name: { msgid: "Name", msgstr: ["Nimi"] }, "Names must not be empty.": { msgid: "Names must not be empty.", msgstr: ["Nimi ei saa olla tühi."] }, 'Names must not end with "{extension}".': { msgid: 'Names must not end with "{extension}".', msgstr: ["Nime lõpus ei tohi olla „{extension}“."] }, "Names must not start with a dot.": { msgid: "Names must not start with a dot.", msgstr: ["Nime alguses ei tohi olla punkt."] }, New: { msgid: "New", msgstr: ["Uus"] }, "New folder": { msgid: "New folder", msgstr: ["Uus kaust"] }, "New folder name": { msgid: "New folder name", msgstr: ["Uue kausta nimi"] }, "No files in here": { msgid: "No files in here", msgstr: ["Siin puuduvad failid"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Sinu filtrile vastavaid faile ei leidunud."] }, "No matching files": { msgid: "No matching files", msgstr: ["Puuduvad sobivad failid"] }, "Please enter a name with at least 2 characters.": { msgid: "Please enter a name with at least 2 characters.", msgstr: ["Palun sisesta vähemalt 2 tähemärki pikk nimi."] }, Recent: { msgid: "Recent", msgstr: ["Hiljutine"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Vali kõik kirjed"] }, "Select entry": { msgid: "Select entry", msgstr: ["Vali kirje"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Vali rida „{nodename}“ jaoks"] }, Size: { msgid: "Size", msgstr: ["Suurus"] }, "Submit name": { msgid: "Submit name", msgstr: ["Lisa nimi"] }, Undo: { msgid: "Undo", msgstr: ["Tühista"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Lisa mingit sisu või sünkroniseeri see oma seadmestest!"] }, "You are currently identified as {nickname}.": { msgid: "You are currently identified as {nickname}.", msgstr: ["Sa oled hetkel tuvastatav kui {nickname}.."] }, "You are currently not identified.": { msgid: "You are currently not identified.", msgstr: ["Sa oled hetkel tuvastamata."] }, "You cannot leave the name empty.": { msgid: "You cannot leave the name empty.", msgstr: ["Sa ei saa jätte nime tühjaks."] } } } } }, { locale: "eu", json: { charset: "utf-8", headers: { "Last-Translator": "Joas Schilling, 2023", "Language-Team": "Basque (https://app.transifex.com/nextcloud/teams/64236/eu/)", "Content-Type": "text/plain; charset=UTF-8", Language: "eu", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Joas Schilling, 2023
` }, msgstr: [`Last-Translator: Joas Schilling, 2023
Language-Team: Basque (https://app.transifex.com/nextcloud/teams/64236/eu/)
Content-Type: text/plain; charset=UTF-8
Language: eu
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: ["Desegin"] } } } } }, { locale: "fa", json: { charset: "utf-8", headers: { "Last-Translator": "Omid Nateghi, 2025", "Language-Team": "Persian (https://app.transifex.com/nextcloud/teams/64236/fa/)", "Content-Type": "text/plain; charset=UTF-8", Language: "fa", "Plural-Forms": "nplurals=2; plural=(n > 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
Amir Shekoohi, 2024
reza reza <forghan89@yahoo.com>, 2024
Omid Nateghi, 2025
` }, msgstr: [`Last-Translator: Omid Nateghi, 2025
Language-Team: Persian (https://app.transifex.com/nextcloud/teams/64236/fa/)
Content-Type: text/plain; charset=UTF-8
Language: fa
Plural-Forms: nplurals=2; plural=(n > 1);
`] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ["{name} نام پوشه معتبر نیست"] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ["{name} نام پوشه مجاز نیست"] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ['"/" نمی‌تواند در نام پوشه استفاده شود.'] }, "All files": { msgid: "All files", msgstr: ["همه فایل‌ها"] }, Cancel: { msgid: "Cancel", msgstr: ["لغو"] }, Choose: { msgid: "Choose", msgstr: ["انتخاب"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["انتخاب {file}"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["انتخاب %n فایل", "انتخاب %n فایل"] }, Copy: { msgid: "Copy", msgstr: ["رونوشت"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["رونوشت از {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["پوشه جدید ایجاد نشد"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["تنظیمات فایل باز نشد"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["نمای فایل‌ها بارگیری نشد"] }, "Create directory": { msgid: "Create directory", msgstr: ["ایجاد فهرست"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["انتخابگر نماگر فعلی"] }, "Enter your name": { msgid: "Enter your name", msgstr: ["نام خود را وارد کنید"] }, "Failed to set nickname.": { msgid: "Failed to set nickname.", msgstr: ["تنظیم نام مستعار ناموفق بود."] }, Favorites: { msgid: "Favorites", msgstr: ["علایق"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["فایل‌ها و پوشه‌هایی که به‌عنوان مورد علاقه علامت‌گذاری می‌کنید در اینجا نشان داده می‌شوند."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["فایل‌ها و پوشه‌هایی که اخیراً تغییر داده‌اید در اینجا نمایش داده می‌شوند."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["فیلتر لیست فایل"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["نام پوشه نمی تواند خالی باشد."] }, "Guest identification": { msgid: "Guest identification", msgstr: ["شناسایی مهمان"] }, Home: { msgid: "Home", msgstr: ["خانه"] }, Modified: { msgid: "Modified", msgstr: ["اصلاح شده"] }, Move: { msgid: "Move", msgstr: ["انتقال"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["انتقال به {target}"] }, Name: { msgid: "Name", msgstr: ["نام"] }, New: { msgid: "New", msgstr: ["جدید"] }, "New folder": { msgid: "New folder", msgstr: ["پوشه جدید"] }, "New folder name": { msgid: "New folder name", msgstr: ["نام پوشه جدید"] }, "No files in here": { msgid: "No files in here", msgstr: ["فایلی اینجا نیست"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["هیچ فایلی مطابق با فیلتر شما یافت نشد."] }, "No matching files": { msgid: "No matching files", msgstr: ["فایل منطبقی وجود ندارد"] }, "Please enter a name with at least 2 characters.": { msgid: "Please enter a name with at least 2 characters.", msgstr: ["لطفاً نامی با حداقل ۲ کاراکتر وارد کنید."] }, Recent: { msgid: "Recent", msgstr: ["اخیر"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["انتخاب همه ورودی ها"] }, "Select entry": { msgid: "Select entry", msgstr: ["انتخاب ورودی"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["انتخاب ردیف برای {nodename}"] }, Size: { msgid: "Size", msgstr: ["اندازه"] }, "Submit name": { msgid: "Submit name", msgstr: ["ارسال نام"] }, Undo: { msgid: "Undo", msgstr: ["بازگردانی"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["مقداری محتوا آپلود کنید یا با دستگاه های خود همگام سازی کنید!"] }, "You are currently not identified.": { msgid: "You are currently not identified.", msgstr: ["شما در حال حاضر شناسایی نشده‌اید."] }, "You cannot leave the name empty.": { msgid: "You cannot leave the name empty.", msgstr: ["نمی‌توانید نام را خالی بگذارید."] } } } } }, { locale: "fi_FI", json: { charset: "utf-8", headers: { "Last-Translator": "Susanna Ånäs <susanna.anas@gmail.com>, 2025", "Language-Team": "Finnish (Finland) (https://app.transifex.com/nextcloud/teams/64236/fi_FI/)", "Content-Type": "text/plain; charset=UTF-8", Language: "fi_FI", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
thingumy, 2024
Jiri Grönroos <jiri.gronroos@iki.fi>, 2025
Susanna Ånäs <susanna.anas@gmail.com>, 2025
` }, msgstr: [`Last-Translator: Susanna Ånäs <susanna.anas@gmail.com>, 2025
Language-Team: Finnish (Finland) (https://app.transifex.com/nextcloud/teams/64236/fi_FI/)
Content-Type: text/plain; charset=UTF-8
Language: fi_FI
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, '"{char}" is not allowed inside a name.': { msgid: '"{char}" is not allowed inside a name.', msgstr: ['"{char}" ei ole sallittu nimessä.'] }, '"{extension}" is not an allowed name.': { msgid: '"{extension}" is not an allowed name.', msgstr: ['"{extension}" ei ole sallittu nimi.'] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ['"{name}" on virheellinen kansion nimi.'] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ['"{name}" ei ole sallittu kansion nimi'] }, '"{segment}" is a reserved name and not allowed.': { msgid: '"{segment}" is a reserved name and not allowed.', msgstr: ['"{segment}" on varattu nimi eikä se ole sallittu.'] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ['"/" ei ole sallittu kansion nimessä.'] }, "All files": { msgid: "All files", msgstr: ["Kaikki tiedostot"] }, Cancel: { msgid: "Cancel", msgstr: ["Peruuta"] }, Choose: { msgid: "Choose", msgstr: ["Valitse"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Valitse {file}"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["Valitse %n tiedosto", "Valitse %n tiedostoa"] }, Copy: { msgid: "Copy", msgstr: ["Kopioi"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Kopioi sijaintiin {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Uutta kansiota ei voitu luoda"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["Tiedoston asetuksia ei saa ladattua"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["Tiedoston näkymiä ei saa ladattua"] }, "Create directory": { msgid: "Create directory", msgstr: ["Luo kansio"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Nykyisen näkymän valinta"] }, "Enter your name": { msgid: "Enter your name", msgstr: ["Kirjoita nimesi"] }, "Failed to set nickname.": { msgid: "Failed to set nickname.", msgstr: ["Kutsumanimen asettaminen epäonnistui."] }, Favorites: { msgid: "Favorites", msgstr: ["Suosikit"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Tiedostot ja kansiot, jotka merkitset suosikkeihisi, näkyvät täällä."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Tiedostot ja kansiot, joita muokkasit äskettäin, näkyvät täällä."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Suodata tiedostolistaa"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["Kansion nimi ei voi olla tyhjä."] }, "Guest identification": { msgid: "Guest identification", msgstr: ["Vieraan tunnistaminen"] }, Home: { msgid: "Home", msgstr: ["Koti"] }, "Invalid name.": { msgid: "Invalid name.", msgstr: ["Virheellinen nimi."] }, Modified: { msgid: "Modified", msgstr: ["Muokattu"] }, Move: { msgid: "Move", msgstr: ["Siirrä"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Siirrä sijaintiin {target}"] }, Name: { msgid: "Name", msgstr: ["Nimi"] }, "Names must not be empty.": { msgid: "Names must not be empty.", msgstr: ["Nimet eivät saa olla tyhjiä."] }, 'Names must not end with "{extension}".': { msgid: 'Names must not end with "{extension}".', msgstr: ['Nimet eivät saa päättyä sanaan "{extension}".'] }, "Names must not start with a dot.": { msgid: "Names must not start with a dot.", msgstr: ["Nimet eivät saa alkaa pisteellä."] }, New: { msgid: "New", msgstr: ["Uusi"] }, "New folder": { msgid: "New folder", msgstr: ["Uusi kansio"] }, "New folder name": { msgid: "New folder name", msgstr: ["Uuden kansion nimi"] }, "No files in here": { msgid: "No files in here", msgstr: ["Täällä ei ole tiedostoja"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Suodatinta vastaavia tiedostoja ei löytynyt."] }, "No matching files": { msgid: "No matching files", msgstr: ["Ei vastaavia tiedostoja"] }, "Please enter a name with at least 2 characters.": { msgid: "Please enter a name with at least 2 characters.", msgstr: ["Kirjoita vähintään kaksi merkkiä sisältävä nimi."] }, Recent: { msgid: "Recent", msgstr: ["Viimeisimmät"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Valitse kaikki tietueet"] }, "Select entry": { msgid: "Select entry", msgstr: ["Valitse tietue"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Valitse rivi {nodename}:lle"] }, Size: { msgid: "Size", msgstr: ["Koko"] }, "Submit name": { msgid: "Submit name", msgstr: ["Lähetä nimi"] }, Undo: { msgid: "Undo", msgstr: ["Kumoa"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Lähetä jotain sisältöä tai synkronoi laitteidesi kanssa!"] }, "You are currently not identified.": { msgid: "You are currently not identified.", msgstr: ["Sinua ei ole tunnistettu."] }, "You cannot leave the name empty.": { msgid: "You cannot leave the name empty.", msgstr: ["Nimeä ei voi jättää tyhjäksi."] } } } } }, { locale: "fo", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Faroese (https://app.transifex.com/nextcloud/teams/64236/fo/)", "Content-Type": "text/plain; charset=UTF-8", Language: "fo", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Faroese (https://app.transifex.com/nextcloud/teams/64236/fo/)
Content-Type: text/plain; charset=UTF-8
Language: fo
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "fr", json: { charset: "utf-8", headers: { "Last-Translator": "Benoit Pruneau, 2025", "Language-Team": "French (https://app.transifex.com/nextcloud/teams/64236/fr/)", "Content-Type": "text/plain; charset=UTF-8", Language: "fr", "Plural-Forms": "nplurals=3; plural=(n == 0 || n == 1) ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
Rémi LEBLOND, 2023
Mordecai, 2023
fleopaulD, 2023
L. Ch., 2024
Jérôme HERBINET, 2024
DEV314R, 2024
Benoit Pruneau, 2025
` }, msgstr: [`Last-Translator: Benoit Pruneau, 2025
Language-Team: French (https://app.transifex.com/nextcloud/teams/64236/fr/)
Content-Type: text/plain; charset=UTF-8
Language: fr
Plural-Forms: nplurals=3; plural=(n == 0 || n == 1) ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;
`] }, '"{char}" is not allowed inside a name.': { msgid: '"{char}" is not allowed inside a name.', msgstr: ["« {char} » n'est pas permis dans un nom."] }, '"{extension}" is not an allowed name.': { msgid: '"{extension}" is not an allowed name.', msgstr: ["« {extension} » n'est pas un nom permis."] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: [`"{name}" n'est pas un nom de dossier valide.`] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: [`"{name}" n'est pas un nom de dossier autorisé.`] }, '"{segment}" is a reserved name and not allowed.': { msgid: '"{segment}" is a reserved name and not allowed.', msgstr: ["« {segment} » est un nom réservé et n'est pas autorisé."] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ["Le caractère « / » n'est pas autorisé dans un nom de dossier."] }, "All files": { msgid: "All files", msgstr: ["Tous les fichiers"] }, Cancel: { msgid: "Cancel", msgstr: ["Annuler"] }, Choose: { msgid: "Choose", msgstr: ["Choisir"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Choisir {file}"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["Choisir %n fichier", "Choisir %n fichiers", "Choisir %n fichiers "] }, Copy: { msgid: "Copy", msgstr: ["Copier"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Copier vers {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Impossible de créer le nouveau dossier"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["Les paramètres des fichiers n'ont pas pu être chargés"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["Les aperçus des fichiers n'ont pas pu être chargés"] }, "Create directory": { msgid: "Create directory", msgstr: ["Créer un répertoire"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Sélecteur de vue courante"] }, "Enter your name": { msgid: "Enter your name", msgstr: ["Entrez votre nom"] }, "Failed to set nickname.": { msgid: "Failed to set nickname.", msgstr: ["Échec de définition du surnom."] }, Favorites: { msgid: "Favorites", msgstr: ["Favoris"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Les fichiers et répertoires marqués en favoris apparaîtront ici."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Les fichiers et répertoires modifiés récemment apparaîtront ici."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Filtrer la liste des fichiers"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["Le nom du dossier ne peut pas être vide."] }, "Guest identification": { msgid: "Guest identification", msgstr: ["Identification d'invité"] }, Home: { msgid: "Home", msgstr: ["Accueil"] }, "Invalid name.": { msgid: "Invalid name.", msgstr: ["Nom invalide."] }, Modified: { msgid: "Modified", msgstr: ["Modifié"] }, Move: { msgid: "Move", msgstr: ["Déplacer"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Déplacer vers {target}"] }, Name: { msgid: "Name", msgstr: ["Nom"] }, "Names must not be empty.": { msgid: "Names must not be empty.", msgstr: ["Les noms ne peuvent pas être vides."] }, 'Names must not end with "{extension}".': { msgid: 'Names must not end with "{extension}".', msgstr: ["Les noms ne peuvent pas se terminer par « {extension} »."] }, "Names must not start with a dot.": { msgid: "Names must not start with a dot.", msgstr: ["Les noms ne peuvent pas débuter par un point."] }, New: { msgid: "New", msgstr: ["Nouveau"] }, "New folder": { msgid: "New folder", msgstr: ["Nouveau répertoire"] }, "New folder name": { msgid: "New folder name", msgstr: ["Nom du nouveau répertoire"] }, "No files in here": { msgid: "No files in here", msgstr: ["Aucun fichier ici"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Aucun fichier trouvé correspondant à votre filtre."] }, "No matching files": { msgid: "No matching files", msgstr: ["Aucun fichier trouvé"] }, "Please enter a name with at least 2 characters.": { msgid: "Please enter a name with at least 2 characters.", msgstr: ["Veuillez entrer un nom avec au moins 2 caractères."] }, Recent: { msgid: "Recent", msgstr: ["Récents"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Tout sélectionner"] }, "Select entry": { msgid: "Select entry", msgstr: ["Sélectionner une entrée"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Sélectionner l'enregistrement pour {nodename}"] }, Size: { msgid: "Size", msgstr: ["Taille"] }, "Submit name": { msgid: "Submit name", msgstr: ["Envoyer le nom"] }, Undo: { msgid: "Undo", msgstr: ["Rétablir"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Charger du contenu ou synchroniser avec vos équipements !"] }, "You are currently not identified.": { msgid: "You are currently not identified.", msgstr: ["Vous n'êtes pas identifié actuellement."] }, "You cannot leave the name empty.": { msgid: "You cannot leave the name empty.", msgstr: ["Vous ne pouvez pas laisser le nom vide."] } } } } }, { locale: "ga", json: { charset: "utf-8", headers: { "Last-Translator": "Aindriú Mac Giolla Eoin, 2025", "Language-Team": "Irish (https://app.transifex.com/nextcloud/teams/64236/ga/)", "Content-Type": "text/plain; charset=UTF-8", Language: "ga", "Plural-Forms": "nplurals=5; plural=(n==1 ? 0 : n==2 ? 1 : n<7 ? 2 : n<11 ? 3 : 4);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Aindriú Mac Giolla Eoin, 2025
` }, msgstr: [`Last-Translator: Aindriú Mac Giolla Eoin, 2025
Language-Team: Irish (https://app.transifex.com/nextcloud/teams/64236/ga/)
Content-Type: text/plain; charset=UTF-8
Language: ga
Plural-Forms: nplurals=5; plural=(n==1 ? 0 : n==2 ? 1 : n<7 ? 2 : n<11 ? 3 : 4);
`] }, '"{char}" is not allowed inside a name.': { msgid: '"{char}" is not allowed inside a name.', msgstr: [`Ní cheadaítear "{char}" laistigh d'ainm.`] }, '"{extension}" is not an allowed name.': { msgid: '"{extension}" is not an allowed name.', msgstr: ['Ní ainm ceadaithe é "{extension}".'] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ['Is ainm fillteáin neamhbhailí é "{name}".'] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ['Ní ainm fillteáin ceadaithe é "{name}".'] }, '"{segment}" is a reserved name and not allowed.': { msgid: '"{segment}" is a reserved name and not allowed.', msgstr: ['Is ainm curtha in áirithe é "{segment}" agus ní cheadaítear é.'] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: [`Ní cheadaítear "/" taobh istigh d'ainm fillteáin.`] }, "All files": { msgid: "All files", msgstr: ["Gach comhad"] }, Cancel: { msgid: "Cancel", msgstr: ["Cealaigh"] }, Choose: { msgid: "Choose", msgstr: ["Roghnaigh"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Roghnaigh {file}"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["Roghnaigh %n comhad", "Roghnaigh %n comhaid", "Roghnaigh %n comhaid", "Roghnaigh %n comhaid", "Roghnaigh %n comhaid"] }, Copy: { msgid: "Copy", msgstr: ["Cóip"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Cóipeáil chuig {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Níorbh fhéidir an fillteán nua a chruthú"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["Níorbh fhéidir socruithe comhaid a lódáil"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["Níorbh fhéidir radhairc comhad a lódáil"] }, "Create directory": { msgid: "Create directory", msgstr: ["Cruthaigh eolaire"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Roghnóir amhairc reatha"] }, "Enter your name": { msgid: "Enter your name", msgstr: ["Cuir isteach d'ainm"] }, "Failed to set nickname.": { msgid: "Failed to set nickname.", msgstr: ["Theip ar leasainm a shocrú."] }, Favorites: { msgid: "Favorites", msgstr: ["Ceanáin"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Taispeánfar comhaid agus fillteáin a mharcálann tú mar is fearr leat anseo."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Taispeánfar comhaid agus fillteáin a d'athraigh tú le déanaí anseo."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Scag liosta comhad"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["Ní féidir ainm fillteáin a bheith folamh."] }, "Guest identification": { msgid: "Guest identification", msgstr: ["Aitheantas aoi"] }, Home: { msgid: "Home", msgstr: ["Baile"] }, "Invalid name.": { msgid: "Invalid name.", msgstr: ["Ainm neamhbhailí."] }, Modified: { msgid: "Modified", msgstr: ["Athraithe"] }, Move: { msgid: "Move", msgstr: ["Bog"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Bog go{target}"] }, Name: { msgid: "Name", msgstr: ["Ainm"] }, "Names must not be empty.": { msgid: "Names must not be empty.", msgstr: ["Ní féidir ainmneacha a bheith folamh."] }, 'Names must not end with "{extension}".': { msgid: 'Names must not end with "{extension}".', msgstr: ['Ní féidir ainmneacha a chríochnú le "{extension}".'] }, "Names must not start with a dot.": { msgid: "Names must not start with a dot.", msgstr: ["Ní mór ainmneacha a bheith ag tosú le ponc."] }, New: { msgid: "New", msgstr: ["Nua"] }, "New folder": { msgid: "New folder", msgstr: ["Fillteán nua"] }, "New folder name": { msgid: "New folder name", msgstr: ["Ainm fillteáin nua"] }, "No files in here": { msgid: "No files in here", msgstr: ["Níl aon chomhaid istigh anseo"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Níor aimsíodh aon chomhad a tháinig le do scagaire."] }, "No matching files": { msgid: "No matching files", msgstr: ["Gan comhaid meaitseála"] }, "Please enter a name with at least 2 characters.": { msgid: "Please enter a name with at least 2 characters.", msgstr: ["Cuir isteach ainm ina bhfuil 2 charachtar ar a laghad."] }, Recent: { msgid: "Recent", msgstr: ["le déanaí"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Roghnaigh gach iontráil"] }, "Select entry": { msgid: "Select entry", msgstr: ["Roghnaigh iontráil"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Roghnaigh an ró do {nodename}"] }, Size: { msgid: "Size", msgstr: ["Méid"] }, "Submit name": { msgid: "Submit name", msgstr: ["Cuir isteach ainm"] }, Undo: { msgid: "Undo", msgstr: ["Cealaigh"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Uaslódáil roinnt ábhair nó sioncronaigh le do ghléasanna!"] }, "You are currently not identified.": { msgid: "You are currently not identified.", msgstr: ["Níl aitheantas tugtha duit faoi láthair."] }, "You cannot leave the name empty.": { msgid: "You cannot leave the name empty.", msgstr: ["Ní féidir leat an t-ainm a fhágáil folamh."] } } } } }, { locale: "gd", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Gaelic, Scottish (https://app.transifex.com/nextcloud/teams/64236/gd/)", "Content-Type": "text/plain; charset=UTF-8", Language: "gd", "Plural-Forms": "nplurals=4; plural=(n==1 || n==11) ? 0 : (n==2 || n==12) ? 1 : (n > 2 && n < 20) ? 2 : 3;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Gaelic, Scottish (https://app.transifex.com/nextcloud/teams/64236/gd/)
Content-Type: text/plain; charset=UTF-8
Language: gd
Plural-Forms: nplurals=4; plural=(n==1 || n==11) ? 0 : (n==2 || n==12) ? 1 : (n > 2 && n < 20) ? 2 : 3;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "gl", json: { charset: "utf-8", headers: { "Last-Translator": "Miguel Anxo Bouzada <mbouzada@gmail.com>, 2024", "Language-Team": "Galician (https://app.transifex.com/nextcloud/teams/64236/gl/)", "Content-Type": "text/plain; charset=UTF-8", Language: "gl", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
Miguel Anxo Bouzada <mbouzada@gmail.com>, 2024
` }, msgstr: [`Last-Translator: Miguel Anxo Bouzada <mbouzada@gmail.com>, 2024
Language-Team: Galician (https://app.transifex.com/nextcloud/teams/64236/gl/)
Content-Type: text/plain; charset=UTF-8
Language: gl
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ["«{name}» non é un nome de cartafol válido."] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ["«{name}» non é un nome de cartafol permitido"] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ["A «/» non está permitida no nome dun cartafol."] }, "All files": { msgid: "All files", msgstr: ["Todos os ficheiros"] }, Choose: { msgid: "Choose", msgstr: ["Escoller"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Escoller {file}"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["Escoller %n ficheiro", "Escoller %n ficheiros"] }, Copy: { msgid: "Copy", msgstr: ["Copiar"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Copiar en  {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Non foi posíbel crear o novo cartafol"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["Non foi posíbel cargar os axustes dos ficheiros"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["Non foi posíbel cargar as vistas dos ficheiros"] }, "Create directory": { msgid: "Create directory", msgstr: ["Crear un directorio"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Selector de vista actual"] }, Favorites: { msgid: "Favorites", msgstr: ["Favoritos"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Os ficheiros e cartafoles que marque como favoritos aparecerán aquí."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Os ficheiros e cartafoles que modificou recentemente aparecerán aquí."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Filtrar a lista de ficheiros"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["O nome do cartafol non pode estar baleiro."] }, Home: { msgid: "Home", msgstr: ["Inicio"] }, Modified: { msgid: "Modified", msgstr: ["Modificado"] }, Move: { msgid: "Move", msgstr: ["Mover"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Mover cara a {target}"] }, Name: { msgid: "Name", msgstr: ["Nome"] }, New: { msgid: "New", msgstr: ["Novo"] }, "New folder": { msgid: "New folder", msgstr: ["Novo cartafol"] }, "New folder name": { msgid: "New folder name", msgstr: ["Novo nome do cartafol"] }, "No files in here": { msgid: "No files in here", msgstr: ["Aquí non hai ficheiros"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Non se atopou ningún ficheiro que coincida co filtro."] }, "No matching files": { msgid: "No matching files", msgstr: ["Non hai ficheiros coincidentes"] }, Recent: { msgid: "Recent", msgstr: ["Recente"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Seleccionar todas as entradas"] }, "Select entry": { msgid: "Select entry", msgstr: ["Seleccionar a entrada"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Seleccionar a fila para {nodename}"] }, Size: { msgid: "Size", msgstr: ["Tamaño"] }, Undo: { msgid: "Undo", msgstr: ["Desfacer"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Enviar algún contido ou sincronizalo cos seus dispositivos!"] } } } } }, { locale: "he", json: { charset: "utf-8", headers: { "Last-Translator": "Joas Schilling, 2023", "Language-Team": "Hebrew (https://app.transifex.com/nextcloud/teams/64236/he/)", "Content-Type": "text/plain; charset=UTF-8", Language: "he", "Plural-Forms": "nplurals=4; plural=(n == 1 && n % 1 == 0) ? 0 : (n == 2 && n % 1 == 0) ? 1: (n % 10 == 0 && n % 1 == 0 && n > 10) ? 2 : 3;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Joas Schilling, 2023
` }, msgstr: [`Last-Translator: Joas Schilling, 2023
Language-Team: Hebrew (https://app.transifex.com/nextcloud/teams/64236/he/)
Content-Type: text/plain; charset=UTF-8
Language: he
Plural-Forms: nplurals=4; plural=(n == 1 && n % 1 == 0) ? 0 : (n == 2 && n % 1 == 0) ? 1: (n % 10 == 0 && n % 1 == 0 && n > 10) ? 2 : 3;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: ["ביטול"] } } } } }, { locale: "hi_IN", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Hindi (India) (https://app.transifex.com/nextcloud/teams/64236/hi_IN/)", "Content-Type": "text/plain; charset=UTF-8", Language: "hi_IN", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Hindi (India) (https://app.transifex.com/nextcloud/teams/64236/hi_IN/)
Content-Type: text/plain; charset=UTF-8
Language: hi_IN
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "hr", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Croatian (https://app.transifex.com/nextcloud/teams/64236/hr/)", "Content-Type": "text/plain; charset=UTF-8", Language: "hr", "Plural-Forms": "nplurals=3; plural=n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Croatian (https://app.transifex.com/nextcloud/teams/64236/hr/)
Content-Type: text/plain; charset=UTF-8
Language: hr
Plural-Forms: nplurals=3; plural=n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "hsb", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Upper Sorbian (https://app.transifex.com/nextcloud/teams/64236/hsb/)", "Content-Type": "text/plain; charset=UTF-8", Language: "hsb", "Plural-Forms": "nplurals=4; plural=(n%100==1 ? 0 : n%100==2 ? 1 : n%100==3 || n%100==4 ? 2 : 3);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Upper Sorbian (https://app.transifex.com/nextcloud/teams/64236/hsb/)
Content-Type: text/plain; charset=UTF-8
Language: hsb
Plural-Forms: nplurals=4; plural=(n%100==1 ? 0 : n%100==2 ? 1 : n%100==3 || n%100==4 ? 2 : 3);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "hu_HU", json: { charset: "utf-8", headers: { "Last-Translator": "János Schrempf <schrempf.janos@gmail.com>, 2025", "Language-Team": "Hungarian (Hungary) (https://app.transifex.com/nextcloud/teams/64236/hu_HU/)", "Content-Type": "text/plain; charset=UTF-8", Language: "hu_HU", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
Főnyedi Áron <sajtman@gmail.com>, 2023
Gyuris Gellért <jobel@ujevangelizacio.hu>, 2024
János Schrempf <schrempf.janos@gmail.com>, 2025
` }, msgstr: [`Last-Translator: János Schrempf <schrempf.janos@gmail.com>, 2025
Language-Team: Hungarian (Hungary) (https://app.transifex.com/nextcloud/teams/64236/hu_HU/)
Content-Type: text/plain; charset=UTF-8
Language: hu_HU
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, '"{char}" is not allowed inside a name.': { msgid: '"{char}" is not allowed inside a name.', msgstr: ['"{char}" nem engedélyezett névben.'] }, '"{extension}" is not an allowed name.': { msgid: '"{extension}" is not an allowed name.', msgstr: ['"{extension}" nem engedélyezett név.'] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ["„{name}” érvénytelen mappanév."] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ["„{name}” nem engedélyezett mappanév"] }, '"{segment}" is a reserved name and not allowed.': { msgid: '"{segment}" is a reserved name and not allowed.', msgstr: ['"{segment}" foglalt név és nem engedélyezett.'] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ["„/” jel nem szerepelhet mappa nevében."] }, "All files": { msgid: "All files", msgstr: ["Minden fájl"] }, Cancel: { msgid: "Cancel", msgstr: ["Mégse"] }, Choose: { msgid: "Choose", msgstr: ["Kiválasztás"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["{file} kiválasztása"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["%n fájl kiválasztása", "%n fájl kiválasztása"] }, Copy: { msgid: "Copy", msgstr: ["Másolás"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Másolás ide: {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Az új mappa létrehozása nem lehetséges"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["Fájlbeállítások betöltése nem lehetséges"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["Fájlnézetek betöltése nem lehetséges"] }, "Create directory": { msgid: "Create directory", msgstr: ["Mappa létrehozása"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Jelenlegi nézet választó"] }, "Enter your name": { msgid: "Enter your name", msgstr: ["Add meg a neved"] }, "Failed to set nickname.": { msgid: "Failed to set nickname.", msgstr: ["Becenév beállítás sikertelen."] }, Favorites: { msgid: "Favorites", msgstr: ["Kedvencek"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["A kedvencként megjelölt fájlok és mappák itt jelennek meg."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["A nemrég módosított fájlok és mappák itt jelennek meg."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Fájl lista szűrése"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["A mappa neve nem lehet üres."] }, "Guest identification": { msgid: "Guest identification", msgstr: ["Vendég azonosítás"] }, Home: { msgid: "Home", msgstr: ["Kezdőlap"] }, "Invalid name.": { msgid: "Invalid name.", msgstr: ["Érvénytelen név."] }, Modified: { msgid: "Modified", msgstr: ["Módosítva"] }, Move: { msgid: "Move", msgstr: ["Mozgatás"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Mozgatás ide: {target}"] }, Name: { msgid: "Name", msgstr: ["Név"] }, "Names must not be empty.": { msgid: "Names must not be empty.", msgstr: ["Nevek nem lehetnek üresek."] }, 'Names must not end with "{extension}".': { msgid: 'Names must not end with "{extension}".', msgstr: ['Nevek nem végződhetnek "{extension}"-re.'] }, "Names must not start with a dot.": { msgid: "Names must not start with a dot.", msgstr: ["Nevek nem kezdődhetnek ponttal."] }, New: { msgid: "New", msgstr: ["Új"] }, "New folder": { msgid: "New folder", msgstr: ["Új mappa"] }, "New folder name": { msgid: "New folder name", msgstr: ["Új mappa név"] }, "No files in here": { msgid: "No files in here", msgstr: ["Itt nincsenek fájlok"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Nincs a szűrési feltételeknek megfelelő fájl."] }, "No matching files": { msgid: "No matching files", msgstr: ["Nincs ilyen fájl"] }, "Please enter a name with at least 2 characters.": { msgid: "Please enter a name with at least 2 characters.", msgstr: ["Kérlek adj meg egy legalább 2 karakteres nevet."] }, Recent: { msgid: "Recent", msgstr: ["Gyakori"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Minden bejegyzés kijelölése"] }, "Select entry": { msgid: "Select entry", msgstr: ["Bejegyzés kijelölése"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Válassz sort a következőnek: {nodename}"] }, Size: { msgid: "Size", msgstr: ["Méret"] }, "Submit name": { msgid: "Submit name", msgstr: ["Név beküldése"] }, Undo: { msgid: "Undo", msgstr: ["Visszavonás"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Tölts fel tartalmat vagy szinkronizálj az eszközeiddel!"] }, "You are currently not identified.": { msgid: "You are currently not identified.", msgstr: ["Jelenleg nem vagy azonosítva."] }, "You cannot leave the name empty.": { msgid: "You cannot leave the name empty.", msgstr: ["A nevet nem hagyhatod üresen."] } } } } }, { locale: "hy", json: { charset: "utf-8", headers: { "Last-Translator": "Sos Aghamiryan <sosavagh@gmail.com>, 2025", "Language-Team": "Armenian (https://app.transifex.com/nextcloud/teams/64236/hy/)", "Content-Type": "text/plain; charset=UTF-8", Language: "hy", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Sos Aghamiryan <sosavagh@gmail.com>, 2025
` }, msgstr: [`Last-Translator: Sos Aghamiryan <sosavagh@gmail.com>, 2025
Language-Team: Armenian (https://app.transifex.com/nextcloud/teams/64236/hy/)
Content-Type: text/plain; charset=UTF-8
Language: hy
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ["{name} սխալ թղթապանակի անվանում է"] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ["{name} համարվում է անթույլատրելի թղթապանակի անվանում"] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ["/ չի թույլատրվում օգտագործել անվանման մեջ"] }, "All files": { msgid: "All files", msgstr: ["Բոլոր ֆայլերը"] }, Choose: { msgid: "Choose", msgstr: ["Ընտրել"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Ընտրել {file}"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["Ընտրել %n ֆայլ", "Ընտրել %n ֆայլեր"] }, Copy: { msgid: "Copy", msgstr: ["Պատճենել"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Պատճենել {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Չստացվեց ստեղծել նոր թղթապանակը"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["Չստացվեց բեռնել ֆայլի կարգավորումները"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["Չստացվեց բեռնել ֆայլերի դիտումները"] }, "Create directory": { msgid: "Create directory", msgstr: ["Ստեղծել դիրեկտորիա"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Ընթացիկ դիտման ընտրիչ"] }, Favorites: { msgid: "Favorites", msgstr: ["Նախընտրելիներ"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Այստեղ կցուցադրվեն այն ֆայլերն ու պանակները, որոնք դուք նշել եք որպես նախընտրելիներ:"] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Այստեղ կցուցադրվեն այն ֆայլերն ու պանակները, որոնք վերջերս փոխել եք:"] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Ֆիլտրել ֆայլերի ցուցակը"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["Թղթապանակի անունը չի կարող դատարկ լինել:"] }, Home: { msgid: "Home", msgstr: ["Սկիզբ"] }, Modified: { msgid: "Modified", msgstr: ["Փոփոխված"] }, Move: { msgid: "Move", msgstr: ["Տեղափոխել"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Տեղափոխել {target}"] }, Name: { msgid: "Name", msgstr: ["Անուն"] }, New: { msgid: "New", msgstr: ["Նոր"] }, "New folder": { msgid: "New folder", msgstr: ["Նոր թղթապանակ"] }, "New folder name": { msgid: "New folder name", msgstr: ["Նոր թղթապանակի անվանում"] }, "No files in here": { msgid: "No files in here", msgstr: ["Այստեղ չկան ֆայլեր"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Ձեր ֆիլտրին համապատասխանող ֆայլերը չեն գտնվել:"] }, "No matching files": { msgid: "No matching files", msgstr: ["Չկան համապատասխան ֆայլեր"] }, Recent: { msgid: "Recent", msgstr: ["Վերջին"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Ընտրել բոլոր գրառումները"] }, "Select entry": { msgid: "Select entry", msgstr: ["Ընտրել բոլոր գրառումը"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Ընտրեք տողը {nodename}-ի համար "] }, Size: { msgid: "Size", msgstr: ["Չափ"] }, Undo: { msgid: "Undo", msgstr: ["Ետարկել"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Ներբեռնեք որոշ բովանդակություն կամ համաժամացրեք այն ձեր սարքերի հետ:"] } } } } }, { locale: "ia", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Interlingua (https://app.transifex.com/nextcloud/teams/64236/ia/)", "Content-Type": "text/plain; charset=UTF-8", Language: "ia", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Interlingua (https://app.transifex.com/nextcloud/teams/64236/ia/)
Content-Type: text/plain; charset=UTF-8
Language: ia
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "id", json: { charset: "utf-8", headers: { "Last-Translator": "Lun May, 2024", "Language-Team": "Indonesian (https://app.transifex.com/nextcloud/teams/64236/id/)", "Content-Type": "text/plain; charset=UTF-8", Language: "id", "Plural-Forms": "nplurals=1; plural=0;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
Linerly <linerly@proton.me>, 2023
Lun May, 2024
` }, msgstr: [`Last-Translator: Lun May, 2024
Language-Team: Indonesian (https://app.transifex.com/nextcloud/teams/64236/id/)
Content-Type: text/plain; charset=UTF-8
Language: id
Plural-Forms: nplurals=1; plural=0;
`] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ['"{name}" bukan nama folder yang valid.'] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ['"{name}" merupakan nama folder yang tidak diperbolehkan'] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ['"/" tidak diperbolehkan di dalam nama folder.'] }, "All files": { msgid: "All files", msgstr: ["Semua berkas"] }, Choose: { msgid: "Choose", msgstr: ["Pilih"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Pilih {file}"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["Pilih %n file"] }, Copy: { msgid: "Copy", msgstr: ["Salin"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Salin ke {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Tidak dapat membuat folder baru"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["Tidak dapat memuat pengaturan file"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["Tidak dapat memuat tampilan file"] }, "Create directory": { msgid: "Create directory", msgstr: ["Buat direktori"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Pemilih tampilan saat ini"] }, Favorites: { msgid: "Favorites", msgstr: ["Favorit"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Berkas dan folder yang Anda tandai sebagai favorit akan muncul di sini."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Berkas dan folder yang Anda ubah baru-baru ini akan muncul di sini."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Saring daftar berkas"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["Name berkas tidak boleh kosong."] }, Home: { msgid: "Home", msgstr: ["Beranda"] }, Modified: { msgid: "Modified", msgstr: ["Diubah"] }, Move: { msgid: "Move", msgstr: ["Pindahkan"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Pindahkan ke {target}"] }, Name: { msgid: "Name", msgstr: ["Nama"] }, New: { msgid: "New", msgstr: ["Baru"] }, "New folder": { msgid: "New folder", msgstr: ["Folder baru"] }, "New folder name": { msgid: "New folder name", msgstr: ["Nama folder baru"] }, "No files in here": { msgid: "No files in here", msgstr: ["Tidak ada berkas di sini"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Tidak ada berkas yang cocok dengan penyaringan Anda."] }, "No matching files": { msgid: "No matching files", msgstr: ["Tidak ada berkas yang cocok"] }, Recent: { msgid: "Recent", msgstr: ["Terkini"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Pilih semua entri"] }, "Select entry": { msgid: "Select entry", msgstr: ["Pilih entri"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Pilih baris untuk {nodename}"] }, Size: { msgid: "Size", msgstr: ["Ukuran"] }, Undo: { msgid: "Undo", msgstr: ["Tidak jadi"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Unggah beberapa konten atau sinkronkan dengan perangkat Anda!"] } } } } }, { locale: "ig", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Igbo (https://app.transifex.com/nextcloud/teams/64236/ig/)", "Content-Type": "text/plain; charset=UTF-8", Language: "ig", "Plural-Forms": "nplurals=1; plural=0;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Igbo (https://app.transifex.com/nextcloud/teams/64236/ig/)
Content-Type: text/plain; charset=UTF-8
Language: ig
Plural-Forms: nplurals=1; plural=0;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "is", json: { charset: "utf-8", headers: { "Last-Translator": "Sveinn í Felli <sv1@fellsnet.is>, 2025", "Language-Team": "Icelandic (https://app.transifex.com/nextcloud/teams/64236/is/)", "Content-Type": "text/plain; charset=UTF-8", Language: "is", "Plural-Forms": "nplurals=2; plural=(n % 10 != 1 || n % 100 == 11);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
Sveinn í Felli <sv1@fellsnet.is>, 2025
` }, msgstr: [`Last-Translator: Sveinn í Felli <sv1@fellsnet.is>, 2025
Language-Team: Icelandic (https://app.transifex.com/nextcloud/teams/64236/is/)
Content-Type: text/plain; charset=UTF-8
Language: is
Plural-Forms: nplurals=2; plural=(n % 10 != 1 || n % 100 == 11);
`] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ['"{name}" er ógilt möppuheiti.'] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ['"{name}" er ekki leyfilegt möppuheiti'] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ['"/" er er ekki leyfilegt innan í skráarheiti.'] }, "All files": { msgid: "All files", msgstr: ["Allar skrár"] }, Choose: { msgid: "Choose", msgstr: ["Veldu"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Veldu {file}"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["Veldu %n skrá", "Veldu %n skrár"] }, Copy: { msgid: "Copy", msgstr: ["Afrita"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Afrita í {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Get ekki búið til nýju möppuna"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["Tókst ekki að hlaða inn stillingum skráa"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["Tókst ekki að hlaða inn sýnum skráa"] }, "Create directory": { msgid: "Create directory", msgstr: ["Búa til möppu"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Núverandi val sýnar"] }, Favorites: { msgid: "Favorites", msgstr: ["Eftirlæti"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Skrár og möppur sem þú merkir sem eftirlæti birtast hér."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Skrár og möppur sem þú breyttir nýlega birtast hér."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Sía skráalista"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["Möppuheiti má ekki vera tómt."] }, Home: { msgid: "Home", msgstr: ["Heim"] }, Modified: { msgid: "Modified", msgstr: ["Breytt"] }, Move: { msgid: "Move", msgstr: ["Færa"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Færa í {target}"] }, Name: { msgid: "Name", msgstr: ["Heiti"] }, New: { msgid: "New", msgstr: ["Nýtt"] }, "New folder": { msgid: "New folder", msgstr: ["Ný mappa"] }, "New folder name": { msgid: "New folder name", msgstr: ["Heiti nýrrar möppu"] }, "No files in here": { msgid: "No files in here", msgstr: ["Engar skrár hér"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Engar skrár fundust sem passa við síuna."] }, "No matching files": { msgid: "No matching files", msgstr: ["Engar samsvarandi skrár"] }, Recent: { msgid: "Recent", msgstr: ["Nýlegt"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Velja allar færslur"] }, "Select entry": { msgid: "Select entry", msgstr: ["Velja færslu"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Veldu röðina fyrir {nodename}"] }, Size: { msgid: "Size", msgstr: ["Stærð"] }, Undo: { msgid: "Undo", msgstr: ["Afturkalla"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Sendu inn eitthvað efni eða samstilltu við tækin þín!"] } } } } }, { locale: "it", json: { charset: "utf-8", headers: { "Last-Translator": "Sebastiano Furlan, 2024", "Language-Team": "Italian (https://app.transifex.com/nextcloud/teams/64236/it/)", "Content-Type": "text/plain; charset=UTF-8", Language: "it", "Plural-Forms": "nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
Claudio Scandella, 2023
Raffaele Silano <raffaelone@gmail.com>, 2024
Sebastiano Furlan, 2024
` }, msgstr: [`Last-Translator: Sebastiano Furlan, 2024
Language-Team: Italian (https://app.transifex.com/nextcloud/teams/64236/it/)
Content-Type: text/plain; charset=UTF-8
Language: it
Plural-Forms: nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;
`] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ['"{name}" non è un nome di cartella valido.'] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ['"{name}"  non è un nome di cartella ammesso'] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: [`"/" non è ammesso all'interno del nome di una cartella.`] }, "All files": { msgid: "All files", msgstr: ["Tutti i file"] }, Choose: { msgid: "Choose", msgstr: ["Scegli"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Scegli {file}"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["Seleziona %n file", "Seleziona %n file", "Seleziona %n file"] }, Copy: { msgid: "Copy", msgstr: ["Copia"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Copia in {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Impossibile creare la nuova cartella"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["Impossibile caricare le impostazioni dei file"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["Impossibile caricare le visualizzazioni dei file"] }, "Create directory": { msgid: "Create directory", msgstr: ["Crea directory"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Selettore della vista corrente"] }, Favorites: { msgid: "Favorites", msgstr: ["Preferiti"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["I file e le cartelle contrassegnate come preferite saranno mostrate qui."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["I file e le cartelle che hai modificato di recente saranno mostrate qui."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Filtra elenco file"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["Il nome della cartella non può essere vuoto."] }, Home: { msgid: "Home", msgstr: ["Home"] }, Modified: { msgid: "Modified", msgstr: ["Modificato"] }, Move: { msgid: "Move", msgstr: ["Sposta"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Sposta in {target}"] }, Name: { msgid: "Name", msgstr: ["Nome"] }, New: { msgid: "New", msgstr: ["Nuovo"] }, "New folder": { msgid: "New folder", msgstr: ["Nuova cartella"] }, "New folder name": { msgid: "New folder name", msgstr: ["Nuovo nome cartella"] }, "No files in here": { msgid: "No files in here", msgstr: ["Nessun file qui"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Nessun file che corrisponde al tuo filtro è stato trovato."] }, "No matching files": { msgid: "No matching files", msgstr: ["Nessun file corrispondente"] }, Recent: { msgid: "Recent", msgstr: ["Recente"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Scegli tutte le voci"] }, "Select entry": { msgid: "Select entry", msgstr: ["Seleziona la voce"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Seleziona la riga per {nodename}"] }, Size: { msgid: "Size", msgstr: ["Taglia/dimensioni"] }, Undo: { msgid: "Undo", msgstr: ["Annulla"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Carica qualche contenuto o sincronizza con i tuoi dispositivi!"] } } } } }, { locale: "ja_JP", json: { charset: "utf-8", headers: { "Last-Translator": "kshimohata, 2025", "Language-Team": "Japanese (Japan) (https://app.transifex.com/nextcloud/teams/64236/ja_JP/)", "Content-Type": "text/plain; charset=UTF-8", Language: "ja_JP", "Plural-Forms": "nplurals=1; plural=0;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
Uchiyama Takuya <uchiyama@j-wmc.com>, 2023
takehito K kondo, 2023
kojima.imamura, 2024
Takafumi AKAMATSU, 2024
devi, 2024
kshimohata, 2025
` }, msgstr: [`Last-Translator: kshimohata, 2025
Language-Team: Japanese (Japan) (https://app.transifex.com/nextcloud/teams/64236/ja_JP/)
Content-Type: text/plain; charset=UTF-8
Language: ja_JP
Plural-Forms: nplurals=1; plural=0;
`] }, '"{char}" is not allowed inside a name.': { msgid: '"{char}" is not allowed inside a name.', msgstr: ['名前に"{char}"は使用できません。'] }, '"{extension}" is not an allowed name.': { msgid: '"{extension}" is not an allowed name.', msgstr: ['"{extension}"は許可された名前ではありません'] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ['"{name}" はフォルダー名に使用できません。'] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ['"{name}"は許可されたフォルダー名ではありません'] }, '"{segment}" is a reserved name and not allowed.': { msgid: '"{segment}" is a reserved name and not allowed.', msgstr: ['"{segment}"は予約名であり使用できません。'] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ["フォルダー名に「/（スラッシュ）」は使用できません。"] }, "All files": { msgid: "All files", msgstr: ["すべてのファイル"] }, Cancel: { msgid: "Cancel", msgstr: ["キャンセル"] }, Choose: { msgid: "Choose", msgstr: ["選択"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["{file} を選択"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["%n 個のファイルを選択"] }, Copy: { msgid: "Copy", msgstr: ["コピー"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["{target} にコピー"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["新しいフォルダーを作成できませんでした"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["ファイル設定を読み込めませんでした"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["ファイルビューを読み込めませんでした"] }, "Create directory": { msgid: "Create directory", msgstr: ["ディレクトリを作成"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["現在のビューセレクタ"] }, "Enter your name": { msgid: "Enter your name", msgstr: ["名前を入力してください"] }, "Failed to set nickname.": { msgid: "Failed to set nickname.", msgstr: ["ニックネームの設定に失敗しました。"] }, Favorites: { msgid: "Favorites", msgstr: ["お気に入り"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["お気に入りとしてマークしたファイルとフォルダがここに表示されます。"] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["最近変更したファイルとフォルダがここに表示されます。"] }, "Filter file list": { msgid: "Filter file list", msgstr: ["ファイルリストをフィルタ"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["フォルダ名は空にできません。"] }, "Guest identification": { msgid: "Guest identification", msgstr: ["ゲスト識別"] }, Home: { msgid: "Home", msgstr: ["ホーム"] }, "Invalid name.": { msgid: "Invalid name.", msgstr: ["無効な名前です。"] }, Modified: { msgid: "Modified", msgstr: ["変更済み"] }, Move: { msgid: "Move", msgstr: ["移動"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["{target} に移動"] }, Name: { msgid: "Name", msgstr: ["名前"] }, "Names must not be empty.": { msgid: "Names must not be empty.", msgstr: ["名前は空にできません。"] }, 'Names must not end with "{extension}".': { msgid: 'Names must not end with "{extension}".', msgstr: ['名前の末尾に"{extension}"は使用できません'] }, "Names must not start with a dot.": { msgid: "Names must not start with a dot.", msgstr: ["ドットで始まる名前は使用できません。"] }, New: { msgid: "New", msgstr: ["新規作成"] }, "New folder": { msgid: "New folder", msgstr: ["新しいフォルダー"] }, "New folder name": { msgid: "New folder name", msgstr: ["新しいフォルダーの名前"] }, "No files in here": { msgid: "No files in here", msgstr: ["ファイルがありません"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["フィルタに一致するファイルは見つかりませんでした。"] }, "No matching files": { msgid: "No matching files", msgstr: ["一致するファイルはありません"] }, "Please enter a name with at least 2 characters.": { msgid: "Please enter a name with at least 2 characters.", msgstr: ["名前を2文字以上で入力してください。"] }, Recent: { msgid: "Recent", msgstr: ["最近"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["すべてのエントリを選択"] }, "Select entry": { msgid: "Select entry", msgstr: ["エントリを選択"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["{nodename} の行を選択"] }, Size: { msgid: "Size", msgstr: ["サイズ"] }, "Submit name": { msgid: "Submit name", msgstr: ["名前を送信する"] }, Undo: { msgid: "Undo", msgstr: ["元に戻す"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["コンテンツをアップロードするか、デバイスと同期してください！"] }, "You are currently not identified.": { msgid: "You are currently not identified.", msgstr: ["現在あなたは識別されていません。"] }, "You cannot leave the name empty.": { msgid: "You cannot leave the name empty.", msgstr: ["名前を空にすることはできません。"] } } } } }, { locale: "ka", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Georgian (https://app.transifex.com/nextcloud/teams/64236/ka/)", "Content-Type": "text/plain; charset=UTF-8", Language: "ka", "Plural-Forms": "nplurals=2; plural=(n!=1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Georgian (https://app.transifex.com/nextcloud/teams/64236/ka/)
Content-Type: text/plain; charset=UTF-8
Language: ka
Plural-Forms: nplurals=2; plural=(n!=1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "ka_GE", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Georgian (Georgia) (https://app.transifex.com/nextcloud/teams/64236/ka_GE/)", "Content-Type": "text/plain; charset=UTF-8", Language: "ka_GE", "Plural-Forms": "nplurals=2; plural=(n!=1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Georgian (Georgia) (https://app.transifex.com/nextcloud/teams/64236/ka_GE/)
Content-Type: text/plain; charset=UTF-8
Language: ka_GE
Plural-Forms: nplurals=2; plural=(n!=1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "kab", json: { charset: "utf-8", headers: { "Last-Translator": "Joas Schilling, 2023", "Language-Team": "Kabyle (https://app.transifex.com/nextcloud/teams/64236/kab/)", "Content-Type": "text/plain; charset=UTF-8", Language: "kab", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Joas Schilling, 2023
` }, msgstr: [`Last-Translator: Joas Schilling, 2023
Language-Team: Kabyle (https://app.transifex.com/nextcloud/teams/64236/kab/)
Content-Type: text/plain; charset=UTF-8
Language: kab
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: ["Sefsex"] } } } } }, { locale: "kk", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Kazakh (https://app.transifex.com/nextcloud/teams/64236/kk/)", "Content-Type": "text/plain; charset=UTF-8", Language: "kk", "Plural-Forms": "nplurals=2; plural=(n!=1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Kazakh (https://app.transifex.com/nextcloud/teams/64236/kk/)
Content-Type: text/plain; charset=UTF-8
Language: kk
Plural-Forms: nplurals=2; plural=(n!=1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "km", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Khmer (https://app.transifex.com/nextcloud/teams/64236/km/)", "Content-Type": "text/plain; charset=UTF-8", Language: "km", "Plural-Forms": "nplurals=1; plural=0;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Khmer (https://app.transifex.com/nextcloud/teams/64236/km/)
Content-Type: text/plain; charset=UTF-8
Language: km
Plural-Forms: nplurals=1; plural=0;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "kn", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Kannada (https://app.transifex.com/nextcloud/teams/64236/kn/)", "Content-Type": "text/plain; charset=UTF-8", Language: "kn", "Plural-Forms": "nplurals=2; plural=(n > 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Kannada (https://app.transifex.com/nextcloud/teams/64236/kn/)
Content-Type: text/plain; charset=UTF-8
Language: kn
Plural-Forms: nplurals=2; plural=(n > 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "ko", json: { charset: "utf-8", headers: { "Last-Translator": "보헤민, 2025", "Language-Team": "Korean (https://app.transifex.com/nextcloud/teams/64236/ko/)", "Content-Type": "text/plain; charset=UTF-8", Language: "ko", "Plural-Forms": "nplurals=1; plural=0;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
Jihwan Ahn, 2023
Brandon Han, 2024
이상오, 2024
Hyeongjin Park, 2025
LEE Hwanyong <hwan@ajou.ac.kr>, 2025
보헤민, 2025
` }, msgstr: [`Last-Translator: 보헤민, 2025
Language-Team: Korean (https://app.transifex.com/nextcloud/teams/64236/ko/)
Content-Type: text/plain; charset=UTF-8
Language: ko
Plural-Forms: nplurals=1; plural=0;
`] }, '"{char}" is not allowed inside a name.': { msgid: '"{char}" is not allowed inside a name.', msgstr: ['"{char}"는 이름 내에 사용할 수 없습니다.'] }, '"{extension}" is not an allowed name.': { msgid: '"{extension}" is not an allowed name.', msgstr: ['"{extension}"은 허용되는 이름이 아닙니다.'] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ['"{name}"은 사용할 수 없는 폴더명입니다.'] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ['"{name}"은 허용되지 않은 폴더명입니다.'] }, '"{segment}" is a reserved name and not allowed.': { msgid: '"{segment}" is a reserved name and not allowed.', msgstr: ['같은 이름을 가진 "{segment}"이 이미 사용 중입니다.'] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ['"/"는 폴더명에 사용할 수 없는 기호입니다.'] }, "All files": { msgid: "All files", msgstr: ["모든 파일"] }, Cancel: { msgid: "Cancel", msgstr: ["취소"] }, Choose: { msgid: "Choose", msgstr: ["선택"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["{file} 선택"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["%n개의 파일 선택"] }, Copy: { msgid: "Copy", msgstr: ["복사"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["{target}으로 복사"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["새 폴더를 만들 수 없음"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["파일 설정을 불러오지 못함"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["파일 보기를 불러오지 못함"] }, "Create directory": { msgid: "Create directory", msgstr: ["디렉토리 만들기"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["현재 뷰 선택자"] }, "Enter your name": { msgid: "Enter your name", msgstr: ["이름을 입력하세요 "] }, "Failed to set nickname.": { msgid: "Failed to set nickname.", msgstr: [`닉네임을 설정하지 못했습니다.
 `] }, Favorites: { msgid: "Favorites", msgstr: ["즐겨찾기"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["즐겨찾기로 표시한 파일 및 폴더가 이곳에 표시됩니다."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["최근 수정한 파일 및 폴더가 이곳에 표시됩니다."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["파일 목록 필터링"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["폴더명을 비울 수 없습니다."] }, "Guest identification": { msgid: "Guest identification", msgstr: ["게스트 확인"] }, Home: { msgid: "Home", msgstr: ["홈"] }, "Invalid name.": { msgid: "Invalid name.", msgstr: ["잘못된 이름입니다. "] }, Modified: { msgid: "Modified", msgstr: ["수정됨"] }, Move: { msgid: "Move", msgstr: ["이동"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["{target}으로 이동"] }, Name: { msgid: "Name", msgstr: ["이름"] }, "Names must not be empty.": { msgid: "Names must not be empty.", msgstr: ["이름은 비어 있으면 안 됩니다."] }, 'Names must not end with "{extension}".': { msgid: 'Names must not end with "{extension}".', msgstr: ['이름은 "{extension}"로 끝나지 않아야 합니다.'] }, "Names must not start with a dot.": { msgid: "Names must not start with a dot.", msgstr: ["이름은 점으로 시작해서는 안 됩니다."] }, New: { msgid: "New", msgstr: ["새로 만들기"] }, "New folder": { msgid: "New folder", msgstr: ["새 폴더"] }, "New folder name": { msgid: "New folder name", msgstr: ["새 폴더명"] }, "No files in here": { msgid: "No files in here", msgstr: ["파일이 없습니다"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["선택한 필터에 해당하는 파일이 없습니다."] }, "No matching files": { msgid: "No matching files", msgstr: ["일치하는 파일 없음"] }, "Please enter a name with at least 2 characters.": { msgid: "Please enter a name with at least 2 characters.", msgstr: ["최소 2자 이상의 이름을 입력하십시오. "] }, Recent: { msgid: "Recent", msgstr: ["최근"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["모두 선택"] }, "Select entry": { msgid: "Select entry", msgstr: ["항목 선택"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["{nodename}의 행 선택"] }, Size: { msgid: "Size", msgstr: ["크기"] }, "Submit name": { msgid: "Submit name", msgstr: ["이름 제출"] }, Undo: { msgid: "Undo", msgstr: ["되돌리기"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["기기에서 파일을 업로드 또는 동기화하세요!"] }, "You are currently not identified.": { msgid: "You are currently not identified.", msgstr: ["현재 인증되지 않았습니다."] }, "You cannot leave the name empty.": { msgid: "You cannot leave the name empty.", msgstr: ["이름은 비워 둘 수 없습니다. "] } } } } }, { locale: "la", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Latin (https://app.transifex.com/nextcloud/teams/64236/la/)", "Content-Type": "text/plain; charset=UTF-8", Language: "la", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Latin (https://app.transifex.com/nextcloud/teams/64236/la/)
Content-Type: text/plain; charset=UTF-8
Language: la
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "lb", json: { charset: "utf-8", headers: { "Last-Translator": "VoXaN24ch, 2024", "Language-Team": "Luxembourgish (https://app.transifex.com/nextcloud/teams/64236/lb/)", "Content-Type": "text/plain; charset=UTF-8", Language: "lb", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
VoXaN24ch, 2024
` }, msgstr: [`Last-Translator: VoXaN24ch, 2024
Language-Team: Luxembourgish (https://app.transifex.com/nextcloud/teams/64236/lb/)
Content-Type: text/plain; charset=UTF-8
Language: lb
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ["{name} ass en ongëlteg Dossier"] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ["{name} ass net en erlaabten Dossiernumm"] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ['"/" ass net an engem Dossier Numm erlaabt'] }, "All files": { msgid: "All files", msgstr: ["All Dateien"] }, Choose: { msgid: "Choose", msgstr: ["Wielt"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Wielt {file}"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["Wielt %n Fichieren", "Wielt %n Fichier"] }, Copy: { msgid: "Copy", msgstr: ["Kopie"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Kopie op {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Konnt den neien Dossier net erstellen"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["Konnt d'Dateienastellungen net lueden"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["Konnt d'Dateien net lueden"] }, "Create directory": { msgid: "Create directory", msgstr: ["Erstellt Verzeechnes"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Aktuell Vue selector"] }, Favorites: { msgid: "Favorites", msgstr: ["Favoritten"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Dateien an Ordner, déi Dir als Favorit markéiert, ginn hei gewisen"] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Dateien an Ordner déi Dir viru kuerzem geännert hutt ginn hei op"] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Filter Datei Lëscht"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["Dossier Numm kann net eidel sinn"] }, Home: { msgid: "Home", msgstr: ["Wëllkomm"] }, Modified: { msgid: "Modified", msgstr: ["Geännert"] }, Move: { msgid: "Move", msgstr: ["Plënne"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Plënneren {target}"] }, Name: { msgid: "Name", msgstr: ["Numm"] }, New: { msgid: "New", msgstr: ["Nei"] }, "New folder": { msgid: "New folder", msgstr: ["Neien dossier"] }, "New folder name": { msgid: "New folder name", msgstr: ["Neien dossier numm"] }, "No files in here": { msgid: "No files in here", msgstr: ["Kee fichier hei"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Kee fichier deen äre filter passt gouf fonnt"] }, "No matching files": { msgid: "No matching files", msgstr: ["Keng passende dateien"] }, Recent: { msgid: "Recent", msgstr: ["Rezent"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Wielt all entréen"] }, "Select entry": { msgid: "Select entry", msgstr: ["Wielt entrée"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Wielt d'zeil fir {nodename}"] }, Size: { msgid: "Size", msgstr: ["Gréisst"] }, Undo: { msgid: "Undo", msgstr: ["Undoen"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Luet en inhalt erop oder synchroniséiert mat ären apparater"] } } } } }, { locale: "lo", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Lao (https://app.transifex.com/nextcloud/teams/64236/lo/)", "Content-Type": "text/plain; charset=UTF-8", Language: "lo", "Plural-Forms": "nplurals=1; plural=0;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Lao (https://app.transifex.com/nextcloud/teams/64236/lo/)
Content-Type: text/plain; charset=UTF-8
Language: lo
Plural-Forms: nplurals=1; plural=0;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "lt_LT", json: { charset: "utf-8", headers: { "Last-Translator": "M G, 2025", "Language-Team": "Lithuanian (Lithuania) (https://app.transifex.com/nextcloud/teams/64236/lt_LT/)", "Content-Type": "text/plain; charset=UTF-8", Language: "lt_LT", "Plural-Forms": "nplurals=4; plural=(n % 10 == 1 && (n % 100 > 19 || n % 100 < 11) ? 0 : (n % 10 >= 2 && n % 10 <=9) && (n % 100 > 19 || n % 100 < 11) ? 1 : n % 1 != 0 ? 2: 3);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
Paulius Liškauskas, 2024
Moo, 2025
M G, 2025
` }, msgstr: [`Last-Translator: M G, 2025
Language-Team: Lithuanian (Lithuania) (https://app.transifex.com/nextcloud/teams/64236/lt_LT/)
Content-Type: text/plain; charset=UTF-8
Language: lt_LT
Plural-Forms: nplurals=4; plural=(n % 10 == 1 && (n % 100 > 19 || n % 100 < 11) ? 0 : (n % 10 >= 2 && n % 10 <=9) && (n % 100 > 19 || n % 100 < 11) ? 1 : n % 1 != 0 ? 2: 3);
`] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ["„{name}“ yra netinkamas aplanko pavadinimas."] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ["„{name}“ yra neleidžiamas aplanko pavadinimas"] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ["„/“ yra neleidžiamas aplanko pavadinime."] }, "All files": { msgid: "All files", msgstr: ["Visi failai"] }, Cancel: { msgid: "Cancel", msgstr: ["Atšaukti"] }, Choose: { msgid: "Choose", msgstr: ["Pasirinkti"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Pasirinkti {file}"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["Pasirinkti %n failą", "Pasirinkti %n failus", "Pasirinkti %n failų", "Pasirinkti %n failą"] }, Copy: { msgid: "Copy", msgstr: ["Kopijuoti"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Kopijuoti į {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Nepavyko sukurti naujo aplanko"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["Nepavyko įkelti failų nustatymų"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["Nepavyko įkelti failų peržiūrų"] }, "Create directory": { msgid: "Create directory", msgstr: ["Sukurti katalogą"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Dabartinis peržiūros pasirinkimas"] }, "Enter your name": { msgid: "Enter your name", msgstr: ["Įrašykite savo vardą"] }, "Failed to set nickname.": { msgid: "Failed to set nickname.", msgstr: ["Nepavyko nustatyti slapyvardžio"] }, Favorites: { msgid: "Favorites", msgstr: ["Populiariausi"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Failai ir aplankai, kuriuos pažymėsite kaip mėgstamiausius, bus rodomi čia."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Čia bus rodomi failai ir aplankai, kuriuos neseniai pakeitėte."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Filtruoti failų sąrašą"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["Aplanko pavadinimas negali būti tuščias."] }, "Guest identification": { msgid: "Guest identification", msgstr: ["Svečio identifikacija"] }, Home: { msgid: "Home", msgstr: ["Pradžia"] }, Modified: { msgid: "Modified", msgstr: ["Pakeista"] }, Move: { msgid: "Move", msgstr: ["Perkelti"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Perkelti į {target}"] }, Name: { msgid: "Name", msgstr: ["Vardas"] }, New: { msgid: "New", msgstr: ["Naujas"] }, "New folder": { msgid: "New folder", msgstr: ["Naujas aplankas"] }, "New folder name": { msgid: "New folder name", msgstr: ["Naujas aplanko pavadinimas"] }, "No files in here": { msgid: "No files in here", msgstr: ["Čia failų nėra"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Nepavyko rasti failų pagal filtro nustatymus"] }, "No matching files": { msgid: "No matching files", msgstr: ["Nėra atitinkančių failų"] }, "Please enter a name with at least 2 characters.": { msgid: "Please enter a name with at least 2 characters.", msgstr: ["Įrašykite vardą iš mažiausiai dviejų ženklų."] }, Recent: { msgid: "Recent", msgstr: ["Nauji"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Žymėti visus įrašus"] }, "Select entry": { msgid: "Select entry", msgstr: ["Žymėti įrašą"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Pasirinkite eilutę {nodename}"] }, Size: { msgid: "Size", msgstr: ["Dydis"] }, "Submit name": { msgid: "Submit name", msgstr: ["Patvirtinti vardą"] }, Undo: { msgid: "Undo", msgstr: ["Atšaukti"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Įkelkite turinio arba sinchronizuokite su savo įrenginiais!"] }, "You are currently not identified.": { msgid: "You are currently not identified.", msgstr: ["Šiuo metu nesate identifikuotas."] }, "You cannot leave the name empty.": { msgid: "You cannot leave the name empty.", msgstr: ["Negalite palikti tuščio vardo lauko."] } } } } }, { locale: "lv", json: { charset: "utf-8", headers: { "Last-Translator": "Edgars Andersons, 2025", "Language-Team": "Latvian (https://app.transifex.com/nextcloud/teams/64236/lv/)", "Content-Type": "text/plain; charset=UTF-8", Language: "lv", "Plural-Forms": "nplurals=3; plural=(n%10==1 && n%100!=11 ? 0 : n != 0 ? 1 : 2);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Papuass <martinsb@gmail.com>, 2024
Armīns Jeltajevs <armins.jeltajevs@gmail.com>, 2024
Edgars Andersons, 2025
` }, msgstr: [`Last-Translator: Edgars Andersons, 2025
Language-Team: Latvian (https://app.transifex.com/nextcloud/teams/64236/lv/)
Content-Type: text/plain; charset=UTF-8
Language: lv
Plural-Forms: nplurals=3; plural=(n%10==1 && n%100!=11 ? 0 : n != 0 ? 1 : 2);
`] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ['"{name}" nav derīgs mapes nosaukums.'] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ['"{name}" nav atļauts mapes nosaukums'] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ['"/" nav atļauts mapes nosaukuma izmantošanā.'] }, "All files": { msgid: "All files", msgstr: ["Visas datnes"] }, Choose: { msgid: "Choose", msgstr: ["Izvēlieties"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Izvēlieties {file}"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["Izvēlēties %n datņu", "Izvēlēties %n datni", "Izvēlēties %n datnes"] }, Copy: { msgid: "Copy", msgstr: ["Kopēt"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Kopēt uz {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Nevarēja izveidot jaunu mapi"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["Nevarēja ielādēt datņu iestatījumus"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["Nevarēja ielādēt datņu apskatījumus"] }, "Create directory": { msgid: "Create directory", msgstr: ["Izveidot direktoriju"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Pašreizēja skata atlasītājs"] }, Favorites: { msgid: "Favorites", msgstr: ["Favorīti"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Šeit parādīsies datnes un mapes, kas tiks atzīmētas kā iecienītas."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Šeit parādīsies datnes un mapes, kuras nesen tika izmainītas."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Atlasīt datņu sarakstu"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["Mapes nosaukums nevar būt tukšs."] }, Home: { msgid: "Home", msgstr: ["Sākums"] }, Modified: { msgid: "Modified", msgstr: ["Izmaninīta"] }, Move: { msgid: "Move", msgstr: ["Pārvietot"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Pārvietot uz {target}"] }, Name: { msgid: "Name", msgstr: ["Nosaukums"] }, New: { msgid: "New", msgstr: ["Jauns"] }, "New folder": { msgid: "New folder", msgstr: ["Jauna mape"] }, "New folder name": { msgid: "New folder name", msgstr: ["Jaunas mapes nosaukums"] }, "No files in here": { msgid: "No files in here", msgstr: ["Šeit nav datņu"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Netika atrasta neviena datne, kas atbilst atlasei."] }, "No matching files": { msgid: "No matching files", msgstr: ["Nav atbilstošu datņu"] }, Recent: { msgid: "Recent", msgstr: ["Nesenās"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Atlasīt visus ierakstus"] }, "Select entry": { msgid: "Select entry", msgstr: ["Atlasīt ierakstu"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Atlasīt rindu {nodename}"] }, Size: { msgid: "Size", msgstr: ["Izmērs"] }, Undo: { msgid: "Undo", msgstr: ["Atsaukt"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Augšupielādē kādu saturu vai sinhronizē savās iekārtās!"] } } } } }, { locale: "mk", json: { charset: "utf-8", headers: { "Last-Translator": "Сашко Тодоров <sasetodorov@gmail.com>, 2025", "Language-Team": "Macedonian (https://app.transifex.com/nextcloud/teams/64236/mk/)", "Content-Type": "text/plain; charset=UTF-8", Language: "mk", "Plural-Forms": "nplurals=2; plural=(n % 10 == 1 && n % 100 != 11) ? 0 : 1;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
Сашко Тодоров <sasetodorov@gmail.com>, 2025
` }, msgstr: [`Last-Translator: Сашко Тодоров <sasetodorov@gmail.com>, 2025
Language-Team: Macedonian (https://app.transifex.com/nextcloud/teams/64236/mk/)
Content-Type: text/plain; charset=UTF-8
Language: mk
Plural-Forms: nplurals=2; plural=(n % 10 == 1 && n % 100 != 11) ? 0 : 1;
`] }, '"{char}" is not allowed inside a name.': { msgid: '"{char}" is not allowed inside a name.', msgstr: ['"{char}" не е дозволено во име.'] }, '"{extension}" is not an allowed name.': { msgid: '"{extension}" is not an allowed name.', msgstr: ['"{extension}" не е дозволено име.'] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ['"{name}" не е валидно име за папка/'] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ['"{name}" не е дозволено име за папка'] }, '"{segment}" is a reserved name and not allowed.': { msgid: '"{segment}" is a reserved name and not allowed.', msgstr: ['"{segment}" е резервирано име и не е дозволено.'] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ['"/" не е дозволена во име на папка.'] }, "All files": { msgid: "All files", msgstr: ["Сите датотеки"] }, Cancel: { msgid: "Cancel", msgstr: ["Откажи"] }, Choose: { msgid: "Choose", msgstr: ["Избери"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Избери {file}"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["Избери %n датотека", "Избери %n датотеки"] }, Copy: { msgid: "Copy", msgstr: ["Копирај"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Копирај во {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Неможе да се креира нова папка"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["Неможе да се вчиаат параметрите за датотеките"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["Неможе да се вчитаат погледите за датотеките"] }, "Create directory": { msgid: "Create directory", msgstr: ["Креирај папка"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Избирач на тековен приказ"] }, "Enter your name": { msgid: "Enter your name", msgstr: ["Внесете го вашето име"] }, "Failed to set nickname.": { msgid: "Failed to set nickname.", msgstr: ["Неуспешно поставување прекар."] }, Favorites: { msgid: "Favorites", msgstr: ["Фаворити"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Датотеките и папките кој ќе ги означите за омилени ќе се појават овде."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Датотеките и папките кој неодамна сте ги измениле ќе се појават овде."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Филтрирај листа на датотеки"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["Името на папката неможе да биде празно."] }, "Guest identification": { msgid: "Guest identification", msgstr: ["Гостинска идентификација"] }, Home: { msgid: "Home", msgstr: ["Почетна"] }, "Invalid name.": { msgid: "Invalid name.", msgstr: ["Невалидно име."] }, Modified: { msgid: "Modified", msgstr: ["Променето"] }, Move: { msgid: "Move", msgstr: ["Премести"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Премести во {target}"] }, Name: { msgid: "Name", msgstr: ["Име"] }, "Names must not be empty.": { msgid: "Names must not be empty.", msgstr: ["Имињата неможе да бидат празни."] }, 'Names must not end with "{extension}".': { msgid: 'Names must not end with "{extension}".', msgstr: ['Имињата неможе да завршуваат со "{extension}".'] }, "Names must not start with a dot.": { msgid: "Names must not start with a dot.", msgstr: ["Имињата неможе да започнуваат со точка."] }, New: { msgid: "New", msgstr: ["Нова"] }, "New folder": { msgid: "New folder", msgstr: ["Нова папка"] }, "New folder name": { msgid: "New folder name", msgstr: ["Ново име на папка"] }, "No files in here": { msgid: "No files in here", msgstr: ["Овде нема датотеки"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Не се пронајдени датотеки што одговараат на вашиот филтер."] }, "No matching files": { msgid: "No matching files", msgstr: ["Нема датотеки што се совпаѓаат"] }, "Please enter a name with at least 2 characters.": { msgid: "Please enter a name with at least 2 characters.", msgstr: ["Внесете име со најмалку 2 карактери."] }, Recent: { msgid: "Recent", msgstr: ["Неодамнешни"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Изберете ги сите записи"] }, "Select entry": { msgid: "Select entry", msgstr: ["Избери запис"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Избери ред за {nodename}"] }, Size: { msgid: "Size", msgstr: ["Големина"] }, "Submit name": { msgid: "Submit name", msgstr: ["Испрати име"] }, Undo: { msgid: "Undo", msgstr: ["Врати"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Прикачи содржина или синхронизирај со ваши уреди!"] }, "You are currently not identified.": { msgid: "You are currently not identified.", msgstr: ["Моментално не сте идентификувани."] }, "You cannot leave the name empty.": { msgid: "You cannot leave the name empty.", msgstr: ["Не можете да го оставите името празно."] } } } } }, { locale: "mn", json: { charset: "utf-8", headers: { "Last-Translator": "Joas Schilling, 2023", "Language-Team": "Mongolian (https://app.transifex.com/nextcloud/teams/64236/mn/)", "Content-Type": "text/plain; charset=UTF-8", Language: "mn", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Joas Schilling, 2023
` }, msgstr: [`Last-Translator: Joas Schilling, 2023
Language-Team: Mongolian (https://app.transifex.com/nextcloud/teams/64236/mn/)
Content-Type: text/plain; charset=UTF-8
Language: mn
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: ["Буцаах"] } } } } }, { locale: "mr", json: { charset: "utf-8", headers: { "Last-Translator": "Joas Schilling, 2023", "Language-Team": "Marathi (https://app.transifex.com/nextcloud/teams/64236/mr/)", "Content-Type": "text/plain; charset=UTF-8", Language: "mr", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Joas Schilling, 2023
` }, msgstr: [`Last-Translator: Joas Schilling, 2023
Language-Team: Marathi (https://app.transifex.com/nextcloud/teams/64236/mr/)
Content-Type: text/plain; charset=UTF-8
Language: mr
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: ["पूर्ववत करा"] } } } } }, { locale: "ms_MY", json: { charset: "utf-8", headers: { "Last-Translator": "DT Navy, 2024", "Language-Team": "Malay (Malaysia) (https://app.transifex.com/nextcloud/teams/64236/ms_MY/)", "Content-Type": "text/plain; charset=UTF-8", Language: "ms_MY", "Plural-Forms": "nplurals=1; plural=0;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
DT Navy, 2024
` }, msgstr: [`Last-Translator: DT Navy, 2024
Language-Team: Malay (Malaysia) (https://app.transifex.com/nextcloud/teams/64236/ms_MY/)
Content-Type: text/plain; charset=UTF-8
Language: ms_MY
Plural-Forms: nplurals=1; plural=0;
`] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ['"{name}" adalah nama folder yang tidak sesuai '] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ['"{name}" nama folder yang tidak dibenarkan'] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ['"/" tidak dibenarkan dalam nama folder'] }, "All files": { msgid: "All files", msgstr: ["Semua fail"] }, Choose: { msgid: "Choose", msgstr: ["Pilih"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Pilih {file}"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["Pilih fail %n"] }, Copy: { msgid: "Copy", msgstr: ["menyalin"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["menyalin ke {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Tidak dapat mewujudkan folder baharu"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["Tidak dapat memuatkan tetapan fail"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["Tidak dapat memuatkan paparan fail"] }, "Create directory": { msgid: "Create directory", msgstr: ["mewujudkan direktori"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["pemilih pandangan semasa"] }, Favorites: { msgid: "Favorites", msgstr: ["Pilihan"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Fail dan folder yang anda tanda sebagai pilihan akan dipaparkan di sini."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Fail dan folder yang anda telah ubah suai baru-baru ini dipaparkan di sini."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Menapis senarai fail"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["Nama folder tidak boleh kosong."] }, Home: { msgid: "Home", msgstr: ["Utama"] }, Modified: { msgid: "Modified", msgstr: ["Ubah suai"] }, Move: { msgid: "Move", msgstr: ["pindah"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["pindah ke {target}"] }, Name: { msgid: "Name", msgstr: ["Nama"] }, New: { msgid: "New", msgstr: ["Baru"] }, "New folder": { msgid: "New folder", msgstr: ["Folder Baharu"] }, "New folder name": { msgid: "New folder name", msgstr: ["Nama folder baharu"] }, "No files in here": { msgid: "No files in here", msgstr: ["Tiada fail di sini"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Tiada fail yang sepadan dengan tapisan anda."] }, "No matching files": { msgid: "No matching files", msgstr: ["Tiada fail yang sepadan"] }, Recent: { msgid: "Recent", msgstr: ["baru-baru ini"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Pilih semua entri"] }, "Select entry": { msgid: "Select entry", msgstr: ["Pilih entri"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["memilih baris {nodename}"] }, Size: { msgid: "Size", msgstr: ["Saiz"] }, Undo: { msgid: "Undo", msgstr: ["buat asal"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Muat naik beberapa kandungan atau selaras dengan peranti anda!"] } } } } }, { locale: "my", json: { charset: "utf-8", headers: { "Last-Translator": "Joas Schilling, 2023", "Language-Team": "Burmese (https://app.transifex.com/nextcloud/teams/64236/my/)", "Content-Type": "text/plain; charset=UTF-8", Language: "my", "Plural-Forms": "nplurals=1; plural=0;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Joas Schilling, 2023
` }, msgstr: [`Last-Translator: Joas Schilling, 2023
Language-Team: Burmese (https://app.transifex.com/nextcloud/teams/64236/my/)
Content-Type: text/plain; charset=UTF-8
Language: my
Plural-Forms: nplurals=1; plural=0;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: ["နဂိုအတိုင်းပြန်ထားရန်"] } } } } }, { locale: "nb_NO", json: { charset: "utf-8", headers: { "Last-Translator": "Magnus Granås, 2025", "Language-Team": "Norwegian Bokmål (Norway) (https://app.transifex.com/nextcloud/teams/64236/nb_NO/)", "Content-Type": "text/plain; charset=UTF-8", Language: "nb_NO", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
D PE, 2023
Syvert Fossdal, 2024
armandg <geirawsm@pm.me>, 2024
Magnus Granås, 2025
` }, msgstr: [`Last-Translator: Magnus Granås, 2025
Language-Team: Norwegian Bokmål (Norway) (https://app.transifex.com/nextcloud/teams/64236/nb_NO/)
Content-Type: text/plain; charset=UTF-8
Language: nb_NO
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ["«{name}» er ikke et gyldig mappenavn."] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ["«{name}» er ikke et tillatt mappenavn."] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ['"/" er ikke tillatt inne i et mappenavn.'] }, "All files": { msgid: "All files", msgstr: ["Alle filer"] }, Choose: { msgid: "Choose", msgstr: ["Velg"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Velg {file}"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["Velg %n fil", "Velg %n filer"] }, Copy: { msgid: "Copy", msgstr: ["Kopier"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Kopier til {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Kunne ikke opprette den nye mappen"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["Kunne ikke laste filinnstillinger"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["Kunne ikke laste filvisninger"] }, "Create directory": { msgid: "Create directory", msgstr: ["Opprett mappe"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Nåværende visningsvelger"] }, Favorites: { msgid: "Favorites", msgstr: ["Favoritter"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Filer og mapper du markerer som favoritter vil vises her."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Filer og mapper du nylig har endret, vil vises her."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Filtrer filliste"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["Mappenavn kan ikke være tomt."] }, Home: { msgid: "Home", msgstr: ["Hjem"] }, Modified: { msgid: "Modified", msgstr: ["Modifisert"] }, Move: { msgid: "Move", msgstr: ["Flytt"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Flytt til {target}"] }, Name: { msgid: "Name", msgstr: ["Navn"] }, New: { msgid: "New", msgstr: ["Ny"] }, "New folder": { msgid: "New folder", msgstr: ["Ny mappe"] }, "New folder name": { msgid: "New folder name", msgstr: ["Nytt mappenavn"] }, "No files in here": { msgid: "No files in here", msgstr: ["Ingen filer her"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Ingen filer funnet med ditt filter."] }, "No matching files": { msgid: "No matching files", msgstr: ["Ingen filer samsvarer"] }, Recent: { msgid: "Recent", msgstr: ["Nylige"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Velg alle oppføringer"] }, "Select entry": { msgid: "Select entry", msgstr: ["Velg oppføring"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Velg raden for {nodename}"] }, Size: { msgid: "Size", msgstr: ["Størrelse"] }, Undo: { msgid: "Undo", msgstr: ["Angre"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Last opp innhold eller synkroniser med enhetene dine!"] } } } } }, { locale: "ne", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Nepali (https://app.transifex.com/nextcloud/teams/64236/ne/)", "Content-Type": "text/plain; charset=UTF-8", Language: "ne", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Nepali (https://app.transifex.com/nextcloud/teams/64236/ne/)
Content-Type: text/plain; charset=UTF-8
Language: ne
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "nl", json: { charset: "utf-8", headers: { "Last-Translator": "Stephan Paternotte <stephan@paternottes.net>, 2025", "Language-Team": "Dutch (https://app.transifex.com/nextcloud/teams/64236/nl/)", "Content-Type": "text/plain; charset=UTF-8", Language: "nl", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
Joost <joho500@proton.me>, 2023
Jeroen Gui, 2023
Casper <casper@vrije-mens.org>, 2024
Denise Wiesner, 2025
Stephan Paternotte <stephan@paternottes.net>, 2025
` }, msgstr: [`Last-Translator: Stephan Paternotte <stephan@paternottes.net>, 2025
Language-Team: Dutch (https://app.transifex.com/nextcloud/teams/64236/nl/)
Content-Type: text/plain; charset=UTF-8
Language: nl
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, '"{char}" is not allowed inside a name.': { msgid: '"{char}" is not allowed inside a name.', msgstr: ['"{char}" kan niet gebruikt worden in de benaming.'] }, '"{extension}" is not an allowed name.': { msgid: '"{extension}" is not an allowed name.', msgstr: ['"{extension}" is geen toegestane naam.'] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ['"{name}" is een ongeldige mapnaam.'] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ['"{name}" is geen toegestane mapnaam'] }, '"{segment}" is a reserved name and not allowed.': { msgid: '"{segment}" is a reserved name and not allowed.', msgstr: ['"{segment}" is een gereserveerde naam en niet toegestaan.'] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ['"/" is niet toegestaan binnen een bestandsnaam'] }, "All files": { msgid: "All files", msgstr: ["Alle bestanden"] }, Cancel: { msgid: "Cancel", msgstr: ["Annuleren"] }, Choose: { msgid: "Choose", msgstr: ["Kiezen"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Kies {file}"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["Kies %n bestand", "Kies %n bestanden"] }, Copy: { msgid: "Copy", msgstr: ["Kopiëren"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Kopiëren naar {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Kon de nieuwe map niet maken"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["Kon de bestandsinstellingen niet laden"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["Kon de bestandsweergaves niet laden"] }, "Create directory": { msgid: "Create directory", msgstr: ["Map aanmaken"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Huidige weergave keuze"] }, "Enter your name": { msgid: "Enter your name", msgstr: ["Voer je naam in"] }, "Failed to set nickname.": { msgid: "Failed to set nickname.", msgstr: ["Kon geen bijnaam instellen."] }, Favorites: { msgid: "Favorites", msgstr: ["Favorieten"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Bestanden en mappen die je als favoriet markeert, verschijnen hier."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Bestanden en mappen die je recentelijk hebt gewijzigd, verschijnen hier."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Bestandslijst filteren"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["Mapnaam mag niet leeg zijn."] }, "Guest identification": { msgid: "Guest identification", msgstr: ["Gastenidentificatie"] }, Home: { msgid: "Home", msgstr: ["Thuis"] }, "Invalid name.": { msgid: "Invalid name.", msgstr: ["Ongeldige naam."] }, Modified: { msgid: "Modified", msgstr: ["Gewijzigd"] }, Move: { msgid: "Move", msgstr: ["Verplaatsen"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Verplaatsen naar {target}"] }, Name: { msgid: "Name", msgstr: ["Naam"] }, "Names must not be empty.": { msgid: "Names must not be empty.", msgstr: ["Namen mogen niet leeg zijn."] }, 'Names must not end with "{extension}".': { msgid: 'Names must not end with "{extension}".', msgstr: ['Namen mogen niet eindigen met "{extension}".'] }, "Names must not start with a dot.": { msgid: "Names must not start with a dot.", msgstr: ["Namen mogen niet begonnen met een punt."] }, New: { msgid: "New", msgstr: ["Nieuw"] }, "New folder": { msgid: "New folder", msgstr: ["Nieuwe map"] }, "New folder name": { msgid: "New folder name", msgstr: ["Nieuwe mapnaam"] }, "No files in here": { msgid: "No files in here", msgstr: ["Geen bestanden hier"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Geen bestanden gevonden die voldoen aan je filter."] }, "No matching files": { msgid: "No matching files", msgstr: ["Geen overeenkomende bestanden"] }, "Please enter a name with at least 2 characters.": { msgid: "Please enter a name with at least 2 characters.", msgstr: ["Voer een naam in met minimaal 2 tekens."] }, Recent: { msgid: "Recent", msgstr: ["Recent"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Alle invoer selecteren"] }, "Select entry": { msgid: "Select entry", msgstr: ["Invoer selecteren"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Selecteer de rij voor {nodename}"] }, Size: { msgid: "Size", msgstr: ["Grootte"] }, "Submit name": { msgid: "Submit name", msgstr: ["Naam indienen"] }, Undo: { msgid: "Undo", msgstr: ["Ongedaan maken"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Upload inhoud of synchroniseer met je apparaten!"] }, "You are currently identified as {nickname}.": { msgid: "You are currently identified as {nickname}.", msgstr: ["Je wordt momenteel geïdentificeerd als {nickname}."] }, "You are currently not identified.": { msgid: "You are currently not identified.", msgstr: ["Je bent momenteel niet geïdentificeerd."] }, "You cannot leave the name empty.": { msgid: "You cannot leave the name empty.", msgstr: ["Je kunt de naam niet leeg laten."] } } } } }, { locale: "nn_NO", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Norwegian Nynorsk (Norway) (https://app.transifex.com/nextcloud/teams/64236/nn_NO/)", "Content-Type": "text/plain; charset=UTF-8", Language: "nn_NO", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Norwegian Nynorsk (Norway) (https://app.transifex.com/nextcloud/teams/64236/nn_NO/)
Content-Type: text/plain; charset=UTF-8
Language: nn_NO
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "oc", json: { charset: "utf-8", headers: { "Last-Translator": "Joas Schilling, 2023", "Language-Team": "Occitan (post 1500) (https://app.transifex.com/nextcloud/teams/64236/oc/)", "Content-Type": "text/plain; charset=UTF-8", Language: "oc", "Plural-Forms": "nplurals=2; plural=(n > 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Joas Schilling, 2023
` }, msgstr: [`Last-Translator: Joas Schilling, 2023
Language-Team: Occitan (post 1500) (https://app.transifex.com/nextcloud/teams/64236/oc/)
Content-Type: text/plain; charset=UTF-8
Language: oc
Plural-Forms: nplurals=2; plural=(n > 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: ["Anullar"] } } } } }, { locale: "pl", json: { charset: "utf-8", headers: { "Last-Translator": "ayeteere, 2025", "Language-Team": "Polish (https://app.transifex.com/nextcloud/teams/64236/pl/)", "Content-Type": "text/plain; charset=UTF-8", Language: "pl", "Plural-Forms": "nplurals=4; plural=(n==1 ? 0 : (n%10>=2 && n%10<=4) && (n%100<12 || n%100>14) ? 1 : n!=1 && (n%10>=0 && n%10<=1) || (n%10>=5 && n%10<=9) || (n%100>=12 && n%100<=14) ? 2 : 3);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
JUJER wtf, 2023
M H <haincu@o2.pl>, 2023
Valdnet, 2024
Piotr Strebski <strebski@gmail.com>, 2024
ayeteere, 2025
` }, msgstr: [`Last-Translator: ayeteere, 2025
Language-Team: Polish (https://app.transifex.com/nextcloud/teams/64236/pl/)
Content-Type: text/plain; charset=UTF-8
Language: pl
Plural-Forms: nplurals=4; plural=(n==1 ? 0 : (n%10>=2 && n%10<=4) && (n%100<12 || n%100>14) ? 1 : n!=1 && (n%10>=0 && n%10<=1) || (n%10>=5 && n%10<=9) || (n%100>=12 && n%100<=14) ? 2 : 3);
`] }, '"{char}" is not allowed inside a name.': { msgid: '"{char}" is not allowed inside a name.', msgstr: ['"{char}" nie jest dozwolone w nazwie.'] }, '"{extension}" is not an allowed name.': { msgid: '"{extension}" is not an allowed name.', msgstr: ['"{extension}" nie jest dozwoloną nazwą.'] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ['"{name}" jest nieprawidłową nazwą folderu'] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ['"{name}" nie jest dozwoloną nazwą folderu'] }, '"{segment}" is a reserved name and not allowed.': { msgid: '"{segment}" is a reserved name and not allowed.', msgstr: ['"{segment}" jest zastrzeżoną nazwą i nie jest dozwolone.'] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ['Znak "/" nie jest dozwolony w nazwie folderu'] }, "All files": { msgid: "All files", msgstr: ["Wszystkie pliki"] }, Cancel: { msgid: "Cancel", msgstr: ["Anuluj"] }, Choose: { msgid: "Choose", msgstr: ["Wybierz"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Wybierz {file}"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["Wybierz %n plik", "Wybierz %n pliki", "Wybierz %n plików", "Wybierz %n plików"] }, Copy: { msgid: "Copy", msgstr: ["Kopiuj"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Skopiuj do {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Nie można utworzyć nowego folderu"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["Nie można wczytać ustawień plików"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["Nie można wczytać widoków plików"] }, "Create directory": { msgid: "Create directory", msgstr: ["Utwórz katalog"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Bieżący selektor widoku"] }, "Enter your name": { msgid: "Enter your name", msgstr: ["Wprowadź nazwę"] }, "Failed to set nickname.": { msgid: "Failed to set nickname.", msgstr: ["Nie udało się utworzyć pseudonimu."] }, Favorites: { msgid: "Favorites", msgstr: ["Ulubione"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Pliki i foldery które oznaczysz jako ulubione będą wyświetlały się tutaj"] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Pliki i foldery które ostatnio modyfikowałeś będą wyświetlały się tutaj"] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Filtruj listę plików"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["Nazwa folderu nie może być pusta"] }, "Guest identification": { msgid: "Guest identification", msgstr: ["Identyfikacja gościa"] }, Home: { msgid: "Home", msgstr: ["Strona główna"] }, "Invalid name.": { msgid: "Invalid name.", msgstr: ["Nieprawidłowa nazwa."] }, Modified: { msgid: "Modified", msgstr: ["Zmodyfikowano"] }, Move: { msgid: "Move", msgstr: ["Przenieś"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Przejdź do {target}"] }, Name: { msgid: "Name", msgstr: ["Nazwa"] }, "Names must not be empty.": { msgid: "Names must not be empty.", msgstr: ["Nazwy nie mogą być puste."] }, 'Names must not end with "{extension}".': { msgid: 'Names must not end with "{extension}".', msgstr: ['Nazwy nie mogą kończyć się na "{extension}".'] }, "Names must not start with a dot.": { msgid: "Names must not start with a dot.", msgstr: ["Nazwy nie mogą zaczynać się od kropki."] }, New: { msgid: "New", msgstr: ["Nowy"] }, "New folder": { msgid: "New folder", msgstr: ["Nowy folder"] }, "New folder name": { msgid: "New folder name", msgstr: ["Nowa nazwa folderu"] }, "No files in here": { msgid: "No files in here", msgstr: ["Brak plików"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Nie znaleziono plików spełniających warunki filtru"] }, "No matching files": { msgid: "No matching files", msgstr: ["Brak pasujących plików"] }, "Please enter a name with at least 2 characters.": { msgid: "Please enter a name with at least 2 characters.", msgstr: ["Wprowadź nazwę zawierającą minimum 2 znaki."] }, Recent: { msgid: "Recent", msgstr: ["Ostatni"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Wybierz wszystkie wpisy"] }, "Select entry": { msgid: "Select entry", msgstr: ["Wybierz wpis"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Wybierz wiersz dla {nodename}"] }, Size: { msgid: "Size", msgstr: ["Rozmiar"] }, "Submit name": { msgid: "Submit name", msgstr: ["Zatwierdź nazwę"] }, Undo: { msgid: "Undo", msgstr: ["Cofnij"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Wyślij zawartość lub zsynchronizuj ze swoimi urządzeniami!"] }, "You are currently not identified.": { msgid: "You are currently not identified.", msgstr: ["Użytkownik nie został uwierzytelniony."] }, "You cannot leave the name empty.": { msgid: "You cannot leave the name empty.", msgstr: ["Nazwa nie może być pusta."] } } } } }, { locale: "ps", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Pashto (https://app.transifex.com/nextcloud/teams/64236/ps/)", "Content-Type": "text/plain; charset=UTF-8", Language: "ps", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Pashto (https://app.transifex.com/nextcloud/teams/64236/ps/)
Content-Type: text/plain; charset=UTF-8
Language: ps
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "pt_BR", json: { charset: "utf-8", headers: { "Last-Translator": "F Bausch, 2025", "Language-Team": "Portuguese (Brazil) (https://app.transifex.com/nextcloud/teams/64236/pt_BR/)", "Content-Type": "text/plain; charset=UTF-8", Language: "pt_BR", "Plural-Forms": "nplurals=3; plural=(n == 0 || n == 1) ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
Flávio Veras <flaviove@gmail.com>, 2023
Cauan Henrique Zorzenon <cauanzorzenon1@protonmail.com>, 2024
Cristiano Silva, 2024
F Bausch, 2025
` }, msgstr: [`Last-Translator: F Bausch, 2025
Language-Team: Portuguese (Brazil) (https://app.transifex.com/nextcloud/teams/64236/pt_BR/)
Content-Type: text/plain; charset=UTF-8
Language: pt_BR
Plural-Forms: nplurals=3; plural=(n == 0 || n == 1) ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;
`] }, '"{char}" is not allowed inside a name.': { msgid: '"{char}" is not allowed inside a name.', msgstr: ['"{char}" não é permitido dentro de um nome.'] }, '"{extension}" is not an allowed name.': { msgid: '"{extension}" is not an allowed name.', msgstr: ['"{extension}" não é um nome permitido.'] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ['"{name}" é um nome de pasta inválido.'] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ['"{name}" não é um nome de pasta permitido'] }, '"{segment}" is a reserved name and not allowed.': { msgid: '"{segment}" is a reserved name and not allowed.', msgstr: ['"{segment}" é um nome reservado e não permitido.'] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ['"/" não é permitido dentro de um nome de pasta.'] }, "All files": { msgid: "All files", msgstr: ["Todos os arquivos"] }, Cancel: { msgid: "Cancel", msgstr: ["Cancelar"] }, Choose: { msgid: "Choose", msgstr: ["Escolher"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Escolher {file}"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["Escolher %n arquivo", "Escolher %n arquivos", "Escolher %n arquivos"] }, Copy: { msgid: "Copy", msgstr: ["Copiar"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Copiar para {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Não foi possível criar a nova pasta"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["Não foi possível carregar configurações de arquivos"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["Não foi possível carregar visualições de arquivos"] }, "Create directory": { msgid: "Create directory", msgstr: ["Criar diretório"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Seletor de visualização atual"] }, "Enter your name": { msgid: "Enter your name", msgstr: ["Digite seu nome"] }, "Failed to set nickname.": { msgid: "Failed to set nickname.", msgstr: ["Falha ao definir apelido."] }, Favorites: { msgid: "Favorites", msgstr: ["Favoritos"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Os arquivos e pastas que você marca como favoritos aparecerão aqui."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Arquivos e pastas que você modificou recentemente aparecerão aqui."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Filtrar lista de arquivos"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["O nome da pasta não pode ser vazio."] }, "Guest identification": { msgid: "Guest identification", msgstr: ["Identificação de convidados"] }, Home: { msgid: "Home", msgstr: ["Início"] }, "Invalid name.": { msgid: "Invalid name.", msgstr: ["Nome inválido."] }, Modified: { msgid: "Modified", msgstr: ["Modificado"] }, Move: { msgid: "Move", msgstr: ["Mover"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Mover para {target}"] }, Name: { msgid: "Name", msgstr: ["Nome"] }, "Names must not be empty.": { msgid: "Names must not be empty.", msgstr: ["Nomes não podem estar vazios."] }, 'Names must not end with "{extension}".': { msgid: 'Names must not end with "{extension}".', msgstr: ['Nomes não podem terminar com "{extension}".'] }, "Names must not start with a dot.": { msgid: "Names must not start with a dot.", msgstr: ["Nomes não podem começar com um ponto."] }, New: { msgid: "New", msgstr: ["Novo"] }, "New folder": { msgid: "New folder", msgstr: ["Nova pasta"] }, "New folder name": { msgid: "New folder name", msgstr: ["Novo nome de pasta"] }, "No files in here": { msgid: "No files in here", msgstr: ["Nenhum arquivo aqui"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Nenhum arquivo correspondente ao seu filtro foi encontrado."] }, "No matching files": { msgid: "No matching files", msgstr: ["Nenhum arquivo correspondente"] }, "Please enter a name with at least 2 characters.": { msgid: "Please enter a name with at least 2 characters.", msgstr: ["Digite um nome com pelo menos 2 caracteres."] }, Recent: { msgid: "Recent", msgstr: ["Recente"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Selecionar todas as entradas"] }, "Select entry": { msgid: "Select entry", msgstr: ["Selecionar entrada"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Selecionar a linha para {nodename}"] }, Size: { msgid: "Size", msgstr: ["Tamanho"] }, "Submit name": { msgid: "Submit name", msgstr: ["Enviar nome"] }, Undo: { msgid: "Undo", msgstr: ["Desfazer"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Faça upload de algum conteúdo ou sincronize com seus dispositivos!"] }, "You are currently not identified.": { msgid: "You are currently not identified.", msgstr: ["No momento, você não está identificado."] }, "You cannot leave the name empty.": { msgid: "You cannot leave the name empty.", msgstr: ["Você não pode deixar o nome vazio."] } } } } }, { locale: "pt_PT", json: { charset: "utf-8", headers: { "Last-Translator": "artur25 <arturdiogo1997@hotmail.com>, 2025", "Language-Team": "Portuguese (Portugal) (https://app.transifex.com/nextcloud/teams/64236/pt_PT/)", "Content-Type": "text/plain; charset=UTF-8", Language: "pt_PT", "Plural-Forms": "nplurals=3; plural=(n == 0 || n == 1) ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
Miguel Ferreira, 2024
Claudio Almeida, 2025
Manuela Silva <mmsrs@sky.com>, 2025
artur25 <arturdiogo1997@hotmail.com>, 2025
` }, msgstr: [`Last-Translator: artur25 <arturdiogo1997@hotmail.com>, 2025
Language-Team: Portuguese (Portugal) (https://app.transifex.com/nextcloud/teams/64236/pt_PT/)
Content-Type: text/plain; charset=UTF-8
Language: pt_PT
Plural-Forms: nplurals=3; plural=(n == 0 || n == 1) ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;
`] }, '"{char}" is not allowed inside a name.': { msgid: '"{char}" is not allowed inside a name.', msgstr: ['"{char}" não é permitido dentro de um nome.'] }, '"{extension}" is not an allowed name.': { msgid: '"{extension}" is not an allowed name.', msgstr: ['"{extension}" não é um nome permitido.'] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ['"{name}" é um nome de pasta inválido.'] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ['"{name}" não é um nome de pasta permitido'] }, '"{segment}" is a reserved name and not allowed.': { msgid: '"{segment}" is a reserved name and not allowed.', msgstr: ['"{segment}" é um nome reservado e não é permitido.'] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ['"/" não é permitido dentro do nome de pasta.'] }, "All files": { msgid: "All files", msgstr: ["Todos os ficheiros"] }, Cancel: { msgid: "Cancel", msgstr: ["Cancelar"] }, Choose: { msgid: "Choose", msgstr: ["Escolher"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Escolher {file}"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["Escolha %n ficheiro", "Escolha %n ficheiros", "Escolha %n ficheiros"] }, Copy: { msgid: "Copy", msgstr: ["Copiar"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Copiar para {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Não foi possível criar a nova pasta "] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["Não foi possível carregar as definições dos ficheiros"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["Não foi possível carregar as visualizações dos ficheiros"] }, "Create directory": { msgid: "Create directory", msgstr: ["Criar pasta"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Seletor de visualização atual"] }, "Enter your name": { msgid: "Enter your name", msgstr: ["Introduza o seu nome"] }, "Failed to set nickname.": { msgid: "Failed to set nickname.", msgstr: ["Falha ao definir o nome alternativo."] }, Favorites: { msgid: "Favorites", msgstr: ["Favoritos"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Os ficheiros e as pastas que marcar como favoritos aparecerão aqui."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Os ficheiros e as pastas que modificou recentemente aparecerão aqui."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Filtrar lista de ficheiros"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["O nome da pasta não pode estar vazio."] }, "Guest identification": { msgid: "Guest identification", msgstr: ["Identificação de convidado"] }, Home: { msgid: "Home", msgstr: ["Início"] }, "Invalid name.": { msgid: "Invalid name.", msgstr: ["Nome inválido."] }, Modified: { msgid: "Modified", msgstr: ["Modificado"] }, Move: { msgid: "Move", msgstr: ["Mover"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Mover para {target}"] }, Name: { msgid: "Name", msgstr: ["Nome"] }, "Names must not be empty.": { msgid: "Names must not be empty.", msgstr: ["O nome não pode ficar em branco."] }, 'Names must not end with "{extension}".': { msgid: 'Names must not end with "{extension}".', msgstr: ['Nomes não podem terminar em "{extension}".'] }, "Names must not start with a dot.": { msgid: "Names must not start with a dot.", msgstr: ["Os nomes não podem começar por um ponto."] }, New: { msgid: "New", msgstr: ["Novo"] }, "New folder": { msgid: "New folder", msgstr: ["Nova pasta"] }, "New folder name": { msgid: "New folder name", msgstr: ["Novo nome da pasta"] }, "No files in here": { msgid: "No files in here", msgstr: ["Sem ficheiros aqui"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Não foi encontrado nenhum ficheiro correspondente ao seu filtro."] }, "No matching files": { msgid: "No matching files", msgstr: ["Nenhum ficheiro correspondente"] }, "Please enter a name with at least 2 characters.": { msgid: "Please enter a name with at least 2 characters.", msgstr: ["Introduza um nome com, pelo menos, 2 caracteres."] }, Recent: { msgid: "Recent", msgstr: ["Recentes"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Selecionar todas as entradas"] }, "Select entry": { msgid: "Select entry", msgstr: ["Selecionar entrada"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Selecione a linha para {nodename}"] }, Size: { msgid: "Size", msgstr: ["Tamanho"] }, "Submit name": { msgid: "Submit name", msgstr: ["Submeter nome"] }, Undo: { msgid: "Undo", msgstr: ["Anular"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Envie algum conteúdo ou sincronize com os seus dispositivos!"] }, "You are currently not identified.": { msgid: "You are currently not identified.", msgstr: ["Atualmente, não está identificado."] }, "You cannot leave the name empty.": { msgid: "You cannot leave the name empty.", msgstr: ["Não pode deixar o nome em branco."] } } } } }, { locale: "ro", json: { charset: "utf-8", headers: { "Last-Translator": "Cosmin Humeniuc <cosmin@hume.ro>, 2025", "Language-Team": "Romanian (https://app.transifex.com/nextcloud/teams/64236/ro/)", "Content-Type": "text/plain; charset=UTF-8", Language: "ro", "Plural-Forms": "nplurals=3; plural=(n==1?0:(((n%100>19)||((n%100==0)&&(n!=0)))?2:1));" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
Daniel MD <dmihaidumitru@gmail.com>, 2023
George Varga, 2024
Cosmin Humeniuc <cosmin@hume.ro>, 2025
` }, msgstr: [`Last-Translator: Cosmin Humeniuc <cosmin@hume.ro>, 2025
Language-Team: Romanian (https://app.transifex.com/nextcloud/teams/64236/ro/)
Content-Type: text/plain; charset=UTF-8
Language: ro
Plural-Forms: nplurals=3; plural=(n==1?0:(((n%100>19)||((n%100==0)&&(n!=0)))?2:1));
`] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ['"{name}" este un nume de director invalid.'] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ['"{name}" nu este un nume de director permis'] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ['"/" nu este permis în numele unui director.'] }, "All files": { msgid: "All files", msgstr: ["Toate fișierele"] }, Choose: { msgid: "Choose", msgstr: ["Alege"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Alege {file}"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["Alege %n fișier", "Alege %n fișiere", "Alege %n fișiere"] }, Copy: { msgid: "Copy", msgstr: ["Copiază"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Copiază în {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Nu s-a putut crea noul director"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["Nu s-au putut încărca setările fișierelor"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["Nu s-au putut încărca vizualizările fișierelor"] }, "Create directory": { msgid: "Create directory", msgstr: ["Creează director"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Selectorul curent al vizualizării"] }, Favorites: { msgid: "Favorites", msgstr: ["Favorite"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Fișiere și directoare pe care le marcați ca favorite vor apărea aici."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Fișiere și directoare pe care le-ați modificat recent vor apărea aici."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Filtrează lista de fișiere"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["Numele de director nu poate fi necompletat."] }, Home: { msgid: "Home", msgstr: ["Acasă"] }, Modified: { msgid: "Modified", msgstr: ["Modificat"] }, Move: { msgid: "Move", msgstr: ["Mută"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Mută către {target}"] }, Name: { msgid: "Name", msgstr: ["Nume"] }, New: { msgid: "New", msgstr: ["Nou"] }, "New folder": { msgid: "New folder", msgstr: ["Director nou"] }, "New folder name": { msgid: "New folder name", msgstr: ["Numele noului director"] }, "No files in here": { msgid: "No files in here", msgstr: ["Nu există fișiere"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Nu există fișiere potrivite pentru filtrul selectat"] }, "No matching files": { msgid: "No matching files", msgstr: ["Nu există fișiere potrivite"] }, Recent: { msgid: "Recent", msgstr: ["Recente"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Selectează toate înregistrările"] }, "Select entry": { msgid: "Select entry", msgstr: ["Selectează înregistrarea"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Selectează rândul pentru {nodename}"] }, Size: { msgid: "Size", msgstr: ["Mărime"] }, Undo: { msgid: "Undo", msgstr: ["Anulează"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Încărcați conținut sau sincronizați cu dispozitivele dumneavoastră!"] } } } } }, { locale: "ru", json: { charset: "utf-8", headers: { "Last-Translator": "Leonid Fedotov, 2025", "Language-Team": "Russian (https://app.transifex.com/nextcloud/teams/64236/ru/)", "Content-Type": "text/plain; charset=UTF-8", Language: "ru", "Plural-Forms": "nplurals=4; plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<12 || n%100>14) ? 1 : n%10==0 || (n%10>=5 && n%10<=9) || (n%100>=11 && n%100<=14)? 2 : 3);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
Max Smith <sevinfolds@gmail.com>, 2023
ashed <craysy@gmail.com>, 2023
Alex <kekcuha@gmail.com>, 2024
R4SAS, 2024
Влад, 2024
Alexey Rusakov, 2024
Александр, 2024
Maksim Sukharev, 2024
Igor Orlov, 2025
Leonid Fedotov, 2025
` }, msgstr: [`Last-Translator: Leonid Fedotov, 2025
Language-Team: Russian (https://app.transifex.com/nextcloud/teams/64236/ru/)
Content-Type: text/plain; charset=UTF-8
Language: ru
Plural-Forms: nplurals=4; plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<12 || n%100>14) ? 1 : n%10==0 || (n%10>=5 && n%10<=9) || (n%100>=11 && n%100<=14)? 2 : 3);
`] }, '"{char}" is not allowed inside a name.': { msgid: '"{char}" is not allowed inside a name.', msgstr: ['"{char}" не допускается внутри имени.'] }, '"{extension}" is not an allowed name.': { msgid: '"{extension}" is not an allowed name.', msgstr: ['"{extension}" это не допустимое имя.'] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ["«{name}» — недопустимое имя папки."] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ["«{name}» не является разрешенным именем папки"] }, '"{segment}" is a reserved name and not allowed.': { msgid: '"{segment}" is a reserved name and not allowed.', msgstr: ['"{segment}" это зарезервированное имя и не допустимо.'] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ["Символ «/» не допускается внутри имени папки."] }, "All files": { msgid: "All files", msgstr: ["Все файлы"] }, Cancel: { msgid: "Cancel", msgstr: ["Отмена"] }, Choose: { msgid: "Choose", msgstr: ["Выбрать"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Выбрать «{file}»"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["Выбрать %n файл", "Выбрать %n файла", "Выбрать %n файлов", "Выбрать %n файлов"] }, Copy: { msgid: "Copy", msgstr: ["Копировать"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Копировать в «{target}»"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Не удалось создать новую папку"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["Не удалось загрузить настройки файлов"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["Не удалось загрузить конфигурацию просмотра файлов"] }, "Create directory": { msgid: "Create directory", msgstr: ["Создать папку"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Переключатель текущего вида"] }, "Enter your name": { msgid: "Enter your name", msgstr: ["Введите ваше имя"] }, "Failed to set nickname.": { msgid: "Failed to set nickname.", msgstr: ["Не удалось задать никнейм."] }, Favorites: { msgid: "Favorites", msgstr: ["Избранное"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Здесь будут отображаться файлы и папки, которые вы пометили как избранные."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Здесь будут отображаться файлы и папки, которые вы недавно изменили."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Фильтровать список файлов"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["Имя папки не может быть пустым."] }, "Guest identification": { msgid: "Guest identification", msgstr: ["Гостевая идентификация"] }, Home: { msgid: "Home", msgstr: ["Домой"] }, "Invalid name.": { msgid: "Invalid name.", msgstr: ["Неверное имя."] }, Modified: { msgid: "Modified", msgstr: ["Изменен"] }, Move: { msgid: "Move", msgstr: ["Переместить"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Переместить в «{target}»"] }, Name: { msgid: "Name", msgstr: ["Имя"] }, "Names must not be empty.": { msgid: "Names must not be empty.", msgstr: ["Имена не могут быть пустыми."] }, 'Names must not end with "{extension}".': { msgid: 'Names must not end with "{extension}".', msgstr: ['Имена не могут оканчиваться на "{extension}".'] }, "Names must not start with a dot.": { msgid: "Names must not start with a dot.", msgstr: ["Имена должны начинаться с точки."] }, New: { msgid: "New", msgstr: ["Новый"] }, "New folder": { msgid: "New folder", msgstr: ["Новая папка"] }, "New folder name": { msgid: "New folder name", msgstr: ["Имя новой папки"] }, "No files in here": { msgid: "No files in here", msgstr: ["Здесь нет файлов"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Файлы, соответствующие вашему фильтру, не найдены."] }, "No matching files": { msgid: "No matching files", msgstr: ["Нет подходящих файлов"] }, "Please enter a name with at least 2 characters.": { msgid: "Please enter a name with at least 2 characters.", msgstr: ["Пожалуйста введите имя длиной не менее 2 символов."] }, Recent: { msgid: "Recent", msgstr: ["Недавний"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Выбрать все записи"] }, "Select entry": { msgid: "Select entry", msgstr: ["Выбрать запись"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Выбрать строку для «{nodename}»"] }, Size: { msgid: "Size", msgstr: ["Размер"] }, "Submit name": { msgid: "Submit name", msgstr: ["Отправить имя"] }, Undo: { msgid: "Undo", msgstr: ["Отменить"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Загрузите контент или синхронизируйте его со своими устройствами!"] }, "You are currently not identified.": { msgid: "You are currently not identified.", msgstr: ["В данный момент вы не идентифицированы."] }, "You cannot leave the name empty.": { msgid: "You cannot leave the name empty.", msgstr: ["Вы не можете оставить имя пустым."] } } } } }, { locale: "sc", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Sardinian (https://app.transifex.com/nextcloud/teams/64236/sc/)", "Content-Type": "text/plain; charset=UTF-8", Language: "sc", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Sardinian (https://app.transifex.com/nextcloud/teams/64236/sc/)
Content-Type: text/plain; charset=UTF-8
Language: sc
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "si", json: { charset: "utf-8", headers: { "Last-Translator": "Joas Schilling, 2023", "Language-Team": "Sinhala (https://app.transifex.com/nextcloud/teams/64236/si/)", "Content-Type": "text/plain; charset=UTF-8", Language: "si", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Joas Schilling, 2023
` }, msgstr: [`Last-Translator: Joas Schilling, 2023
Language-Team: Sinhala (https://app.transifex.com/nextcloud/teams/64236/si/)
Content-Type: text/plain; charset=UTF-8
Language: si
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: ["පෙරසේ"] } } } } }, { locale: "sk_SK", json: { charset: "utf-8", headers: { "Last-Translator": "Tomas Rusnak <linkermail@gmail.com>, 2024", "Language-Team": "Slovak (Slovakia) (https://app.transifex.com/nextcloud/teams/64236/sk_SK/)", "Content-Type": "text/plain; charset=UTF-8", Language: "sk_SK", "Plural-Forms": "nplurals=4; plural=(n % 1 == 0 && n == 1 ? 0 : n % 1 == 0 && n >= 2 && n <= 4 ? 1 : n % 1 != 0 ? 2: 3);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
Stanislav Prekop <prekop3@gmail.com>, 2024
Tomas Rusnak <linkermail@gmail.com>, 2024
` }, msgstr: [`Last-Translator: Tomas Rusnak <linkermail@gmail.com>, 2024
Language-Team: Slovak (Slovakia) (https://app.transifex.com/nextcloud/teams/64236/sk_SK/)
Content-Type: text/plain; charset=UTF-8
Language: sk_SK
Plural-Forms: nplurals=4; plural=(n % 1 == 0 && n == 1 ? 0 : n % 1 == 0 && n >= 2 && n <= 4 ? 1 : n % 1 != 0 ? 2: 3);
`] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ['"{name}" je neplatný názov pričinka.'] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ['"{name}" nie je povolený názov priečinka.'] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ['"/" nie je povolené v názve priečinka.'] }, "All files": { msgid: "All files", msgstr: ["Všetky súbory"] }, Choose: { msgid: "Choose", msgstr: ["Vybrať"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Vybrať {súbor}"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["Vybraný %n súbor", "Vybrané %n súbory", "Vybraných %n súborov", "Vybraných %n súborov"] }, Copy: { msgid: "Copy", msgstr: ["Kopírovať"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Kopírovať do {umiestnenia}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Nepodarilo sa vytvoriť nový priečinok"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["Nepodarilo sa načítať nastavenia súborov"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["Nepodarilo sa načítať pohľady súborov"] }, "Create directory": { msgid: "Create directory", msgstr: ["Vytvoriť adresár"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Výber aktuálneho zobrazenia"] }, Favorites: { msgid: "Favorites", msgstr: ["Obľúbené"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Tu sa zobrazia súbory a priečinky, ktoré označíte ako obľúbené."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Tu sa zobrazia súbory a priečinky, ktoré ste nedávno upravili."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Filtrovať zoznam súborov"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["Názov priečinka nemôže byť prázdny."] }, Home: { msgid: "Home", msgstr: ["Domov"] }, Modified: { msgid: "Modified", msgstr: ["Upravené"] }, Move: { msgid: "Move", msgstr: ["Prejsť"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Prejsť na {umiestnenie}"] }, Name: { msgid: "Name", msgstr: ["Názov"] }, New: { msgid: "New", msgstr: ["Pridať"] }, "New folder": { msgid: "New folder", msgstr: ["Pridať priečinok"] }, "New folder name": { msgid: "New folder name", msgstr: ["Pridať názov priečinka"] }, "No files in here": { msgid: "No files in here", msgstr: ["Nie sú tu žiadne súbory"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Nenašli sa žiadne súbory zodpovedajúce vášmu filtru."] }, "No matching files": { msgid: "No matching files", msgstr: ["Žiadne zodpovedajúce súbory"] }, Recent: { msgid: "Recent", msgstr: ["Nedávne"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Vybrať všetky položky"] }, "Select entry": { msgid: "Select entry", msgstr: ["Vybrať položku"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Vyberte riadok pre {názov uzla}"] }, Size: { msgid: "Size", msgstr: ["Veľkosť"] }, Undo: { msgid: "Undo", msgstr: ["Späť"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Nahrajte nejaký obsah alebo synchronizujte so svojimi zariadeniami!"] } } } } }, { locale: "sl", json: { charset: "utf-8", headers: { "Last-Translator": "Simon Bogina, 2024", "Language-Team": "Slovenian (https://app.transifex.com/nextcloud/teams/64236/sl/)", "Content-Type": "text/plain; charset=UTF-8", Language: "sl", "Plural-Forms": "nplurals=4; plural=(n%100==1 ? 0 : n%100==2 ? 1 : n%100==3 || n%100==4 ? 2 : 3);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
Simon Bogina, 2024
` }, msgstr: [`Last-Translator: Simon Bogina, 2024
Language-Team: Slovenian (https://app.transifex.com/nextcloud/teams/64236/sl/)
Content-Type: text/plain; charset=UTF-8
Language: sl
Plural-Forms: nplurals=4; plural=(n%100==1 ? 0 : n%100==2 ? 1 : n%100==3 || n%100==4 ? 2 : 3);
`] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ["{name} je neveljavno ime mape."] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ["{name} ni dovoljeno ime mape"] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ['"/" ni dovoljen v imenu mape.'] }, "All files": { msgid: "All files", msgstr: ["Vse datoteke"] }, Choose: { msgid: "Choose", msgstr: ["Izberi"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Izberi {file}"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["Izberi %n datoteko", "Izberi %n datoteki", "Izberi %n datotek", "Izberi %n datotek"] }, Copy: { msgid: "Copy", msgstr: ["Kopiraj"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Kopiraj v {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Nisem mogel ustvariti nove mape"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["NIsem mogel naložiti nastavitev datotek"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["Nisem mogel naložiti pogledov datotek"] }, "Create directory": { msgid: "Create directory", msgstr: ["Ustvari mapo"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Izbirnik trenutnega pogleda"] }, Favorites: { msgid: "Favorites", msgstr: ["Priljubljene"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Datoteke in mape ki jih označite kot priljubljene se bodo prikazale tukaj."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Daoteke in mape ki ste jih pred kratkim spremenili se bodo prikazale tukaj."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Filtriraj seznam datotek"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["Ime mape ne more biti prazno"] }, Home: { msgid: "Home", msgstr: ["Domov"] }, Modified: { msgid: "Modified", msgstr: ["Spremenjeno"] }, Move: { msgid: "Move", msgstr: ["Premakni"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Premakni v {target}"] }, Name: { msgid: "Name", msgstr: ["Ime"] }, New: { msgid: "New", msgstr: ["Nov"] }, "New folder": { msgid: "New folder", msgstr: ["Nova mapa"] }, "New folder name": { msgid: "New folder name", msgstr: ["Novo ime mape"] }, "No files in here": { msgid: "No files in here", msgstr: ["Tukaj ni datotek"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Ni bilo najdenih ujemajočih datotek glede na vaš filter."] }, "No matching files": { msgid: "No matching files", msgstr: ["Ni ujemajočih datotek"] }, Recent: { msgid: "Recent", msgstr: ["Nedavne"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Izberi vse vnose"] }, "Select entry": { msgid: "Select entry", msgstr: ["Izberi vnos"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Izberi vrstico za {nodename}"] }, Size: { msgid: "Size", msgstr: ["Velikost"] }, Undo: { msgid: "Undo", msgstr: ["Razveljavi"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Naloži nekaj vsebine ali sinhroniziraj s svojimi napravami!"] } } } } }, { locale: "sq", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Albanian (https://app.transifex.com/nextcloud/teams/64236/sq/)", "Content-Type": "text/plain; charset=UTF-8", Language: "sq", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Albanian (https://app.transifex.com/nextcloud/teams/64236/sq/)
Content-Type: text/plain; charset=UTF-8
Language: sq
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "sr", json: { charset: "utf-8", headers: { "Last-Translator": "Иван Пешић, 2024", "Language-Team": "Serbian (https://app.transifex.com/nextcloud/teams/64236/sr/)", "Content-Type": "text/plain; charset=UTF-8", Language: "sr", "Plural-Forms": "nplurals=3; plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
Иван Пешић, 2024
` }, msgstr: [`Last-Translator: Иван Пешић, 2024
Language-Team: Serbian (https://app.transifex.com/nextcloud/teams/64236/sr/)
Content-Type: text/plain; charset=UTF-8
Language: sr
Plural-Forms: nplurals=3; plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2);
`] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ["„{name}” није исправно име фолдера."] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ["„{name}” није дозвољено име за фолдер."] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ["„/” није дозвољено унутар имена фолдера."] }, "All files": { msgid: "All files", msgstr: ["Сви фајлови"] }, Choose: { msgid: "Choose", msgstr: ["Изаберите"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Изаберите {file}"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["Изаберите %n фајл", "Изаберите %n фајла", "Изаберите %n фајлова"] }, Copy: { msgid: "Copy", msgstr: ["Копирај"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Копирај у {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Није могао да се креира нови фолдер"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["Не могу да се учитају подешавања фајлова"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["Не могу да се учитају прикази фајлова"] }, "Create directory": { msgid: "Create directory", msgstr: ["Креирај директоријум"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Бирач тренутног приказа"] }, Favorites: { msgid: "Favorites", msgstr: ["Омиљено"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Овде ће се појавити фајлови и фолдери које сте означили као омиљене."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Овде ће се појавити фајлови и фолдери који се се недавно изменили."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Фитрирање листе фајлова"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["Име фолдера не може бити празно."] }, Home: { msgid: "Home", msgstr: ["Почетак"] }, Modified: { msgid: "Modified", msgstr: ["Измењено"] }, Move: { msgid: "Move", msgstr: ["Премести"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Премести у {target}"] }, Name: { msgid: "Name", msgstr: ["Име"] }, New: { msgid: "New", msgstr: ["Ново"] }, "New folder": { msgid: "New folder", msgstr: ["Нови фолдер"] }, "New folder name": { msgid: "New folder name", msgstr: ["Име новог фолдера"] }, "No files in here": { msgid: "No files in here", msgstr: ["Овде нема фајлова"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Није пронађен ниједан фајл који задовољава ваш филтер."] }, "No matching files": { msgid: "No matching files", msgstr: ["Нема таквих фајлова"] }, Recent: { msgid: "Recent", msgstr: ["Скорашње"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Изаберите све ставке"] }, "Select entry": { msgid: "Select entry", msgstr: ["Изаберите ставку"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Изаберите ред за {nodename}"] }, Size: { msgid: "Size", msgstr: ["Величина"] }, Undo: { msgid: "Undo", msgstr: ["Поништи"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Отпремите нешто или синхронизујте са својим уређајима!"] } } } } }, { locale: "sr@latin", json: { charset: "utf-8", headers: { "Last-Translator": "Bogdan Vuković, 2024", "Language-Team": "Serbian (Latin) (https://app.transifex.com/nextcloud/teams/64236/sr@latin/)", "Content-Type": "text/plain; charset=UTF-8", Language: "sr@latin", "Plural-Forms": "nplurals=3; plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Bogdan Vuković, 2024
` }, msgstr: [`Last-Translator: Bogdan Vuković, 2024
Language-Team: Serbian (Latin) (https://app.transifex.com/nextcloud/teams/64236/sr@latin/)
Content-Type: text/plain; charset=UTF-8
Language: sr@latin
Plural-Forms: nplurals=3; plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2);
`] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ["„{name}” je neispravan naziv foldera."] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ["„{name}” je nedozvoljen naziv foldera."] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ["„/” se ne može koristiti unutar naziva foldera."] }, "All files": { msgid: "All files", msgstr: ["Svi fajlovi"] }, Choose: { msgid: "Choose", msgstr: ["Izaberite"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Izaberite {file}"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["Izaberite %n fajl", "Izaberite %n fajla", "Izaberite %n fajlova"] }, Copy: { msgid: "Copy", msgstr: ["Kopiraj"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Kopiraj u {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Neuspešno kreiranje novog foldera"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["Neuspešno učitavanje podešavanja fajlova"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["Neuspešno učitavanje prikaza fajlova"] }, "Create directory": { msgid: "Create directory", msgstr: ["Kreiraj direktorijum"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Birač trenutnog prikaza"] }, Favorites: { msgid: "Favorites", msgstr: ["Omiljeno"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Lista omiljenih fajlova i foldera."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Lista fajlova i foldera sa skorašnjim izmenama."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Fitriranje liste fajlova"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["Naziv foldera ne može biti prazan."] }, Home: { msgid: "Home", msgstr: ["Početak"] }, Modified: { msgid: "Modified", msgstr: ["Izmenjeno"] }, Move: { msgid: "Move", msgstr: ["Premesti"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Premesti u {target}"] }, Name: { msgid: "Name", msgstr: ["Naziv"] }, New: { msgid: "New", msgstr: ["Novo"] }, "New folder": { msgid: "New folder", msgstr: ["Novi folder"] }, "New folder name": { msgid: "New folder name", msgstr: ["Naziv novog foldera"] }, "No files in here": { msgid: "No files in here", msgstr: ["Bez fajlova"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Nema fajlova koji zadovoljavaju uslove filtera."] }, "No matching files": { msgid: "No matching files", msgstr: ["Nema takvih fajlova"] }, Recent: { msgid: "Recent", msgstr: ["Skorašnje"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Izaberite sve stavke"] }, "Select entry": { msgid: "Select entry", msgstr: ["Izaberite stavku"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Izaberite red za {nodename}"] }, Size: { msgid: "Size", msgstr: ["Veličina"] }, Undo: { msgid: "Undo", msgstr: ["Vrati"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Otpremite sadržaj ili sinhronizujte sa svojim uređajima!"] } } } } }, { locale: "sv", json: { charset: "utf-8", headers: { "Last-Translator": "Magnus Höglund, 2025", "Language-Team": "Swedish (https://app.transifex.com/nextcloud/teams/64236/sv/)", "Content-Type": "text/plain; charset=UTF-8", Language: "sv", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
Martin H <pilino+transifex@posteo.de>, 2025
Magnus Höglund, 2025
` }, msgstr: [`Last-Translator: Magnus Höglund, 2025
Language-Team: Swedish (https://app.transifex.com/nextcloud/teams/64236/sv/)
Content-Type: text/plain; charset=UTF-8
Language: sv
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, '"{char}" is not allowed inside a name.': { msgid: '"{char}" is not allowed inside a name.', msgstr: ['"{char}" är inte tillåtet i ett namn.'] }, '"{extension}" is not an allowed name.': { msgid: '"{extension}" is not an allowed name.', msgstr: ['"{extension}" är inte ett tillåtet namn.'] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ['"{name}" är ett ogiltigt mappnamn.'] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ['"{name}" är inte ett tillåtet mappnamn'] }, '"{segment}" is a reserved name and not allowed.': { msgid: '"{segment}" is a reserved name and not allowed.', msgstr: ['"{segment}" är ett reserverat namn och inte tillåtet.'] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ['"/" är inte tillåtet i ett mappnamn.'] }, "All files": { msgid: "All files", msgstr: ["Alla filer"] }, Cancel: { msgid: "Cancel", msgstr: ["Avbryt"] }, Choose: { msgid: "Choose", msgstr: ["Välj"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Välj {file}"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["Välj %n fil", "Välj %n filer"] }, Copy: { msgid: "Copy", msgstr: ["Kopiera"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Kopiera till {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Kunde inte skapa den nya mappen"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["Kunde inte ladda filinställningar"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["Kunde inte ladda filvyer"] }, "Create directory": { msgid: "Create directory", msgstr: ["Skapa katalog"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Aktuell vyväljare"] }, "Enter your name": { msgid: "Enter your name", msgstr: ["Ange ditt namn"] }, "Failed to set nickname.": { msgid: "Failed to set nickname.", msgstr: ["Kunde inte ställa in smeknamn."] }, Favorites: { msgid: "Favorites", msgstr: ["Favoriter"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Filer och mappar som du markerar som favorit kommer att visas här."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Filer och mappar som du nyligen ändrat kommer att visas här."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Filtrera fillistan"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["Mappnamnet får inte vara tomt."] }, "Guest identification": { msgid: "Guest identification", msgstr: ["Gästidentifiering"] }, Home: { msgid: "Home", msgstr: ["Hem"] }, "Invalid name.": { msgid: "Invalid name.", msgstr: ["Ogiltigt namn."] }, Modified: { msgid: "Modified", msgstr: ["Ändrad"] }, Move: { msgid: "Move", msgstr: ["Flytta"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Flytta till {target}"] }, Name: { msgid: "Name", msgstr: ["Namn"] }, "Names must not be empty.": { msgid: "Names must not be empty.", msgstr: ["Namn får inte vara tomt."] }, 'Names must not end with "{extension}".': { msgid: 'Names must not end with "{extension}".', msgstr: ['Namn får inte sluta med "{extension}".'] }, "Names must not start with a dot.": { msgid: "Names must not start with a dot.", msgstr: ["Namn får inte börja med en punkt."] }, New: { msgid: "New", msgstr: ["Ny"] }, "New folder": { msgid: "New folder", msgstr: ["Ny mapp"] }, "New folder name": { msgid: "New folder name", msgstr: ["Nytt mappnamn"] }, "No files in here": { msgid: "No files in here", msgstr: ["Inga filer här"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Inga filer som matchar ditt filter hittades."] }, "No matching files": { msgid: "No matching files", msgstr: ["Inga matchande filer"] }, "Please enter a name with at least 2 characters.": { msgid: "Please enter a name with at least 2 characters.", msgstr: ["Ange ett namn med minst 2 tecken."] }, Recent: { msgid: "Recent", msgstr: ["Nyligen"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Välj alla poster"] }, "Select entry": { msgid: "Select entry", msgstr: ["Välj post"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Välj raden för {nodename}"] }, Size: { msgid: "Size", msgstr: ["Storlek"] }, "Submit name": { msgid: "Submit name", msgstr: ["Skicka namn"] }, Undo: { msgid: "Undo", msgstr: ["Ångra"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Ladda upp lite innehåll eller synkronisera med dina enheter!"] }, "You are currently not identified.": { msgid: "You are currently not identified.", msgstr: ["Du är för närvarande inte identifierad."] }, "You cannot leave the name empty.": { msgid: "You cannot leave the name empty.", msgstr: ["Du kan inte lämna namnet tomt."] } } } } }, { locale: "sw", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Swahili (https://app.transifex.com/nextcloud/teams/64236/sw/)", "Content-Type": "text/plain; charset=UTF-8", Language: "sw", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Swahili (https://app.transifex.com/nextcloud/teams/64236/sw/)
Content-Type: text/plain; charset=UTF-8
Language: sw
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "ta", json: { charset: "utf-8", headers: { "Last-Translator": "Joas Schilling, 2023", "Language-Team": "Tamil (https://app.transifex.com/nextcloud/teams/64236/ta/)", "Content-Type": "text/plain; charset=UTF-8", Language: "ta", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Joas Schilling, 2023
` }, msgstr: [`Last-Translator: Joas Schilling, 2023
Language-Team: Tamil (https://app.transifex.com/nextcloud/teams/64236/ta/)
Content-Type: text/plain; charset=UTF-8
Language: ta
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: ["செயல்தவிர்"] } } } } }, { locale: "th_TH", json: { charset: "utf-8", headers: { "Last-Translator": "Joas Schilling, 2023", "Language-Team": "Thai (Thailand) (https://app.transifex.com/nextcloud/teams/64236/th_TH/)", "Content-Type": "text/plain; charset=UTF-8", Language: "th_TH", "Plural-Forms": "nplurals=1; plural=0;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Joas Schilling, 2023
` }, msgstr: [`Last-Translator: Joas Schilling, 2023
Language-Team: Thai (Thailand) (https://app.transifex.com/nextcloud/teams/64236/th_TH/)
Content-Type: text/plain; charset=UTF-8
Language: th_TH
Plural-Forms: nplurals=1; plural=0;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: ["เลิกทำ"] } } } } }, { locale: "tk", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Turkmen (https://app.transifex.com/nextcloud/teams/64236/tk/)", "Content-Type": "text/plain; charset=UTF-8", Language: "tk", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Turkmen (https://app.transifex.com/nextcloud/teams/64236/tk/)
Content-Type: text/plain; charset=UTF-8
Language: tk
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "tr", json: { charset: "utf-8", headers: { "Last-Translator": "Kaya Zeren <kayazeren@gmail.com>, 2025", "Language-Team": "Turkish (https://app.transifex.com/nextcloud/teams/64236/tr/)", "Content-Type": "text/plain; charset=UTF-8", Language: "tr", "Plural-Forms": "nplurals=2; plural=(n > 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
Kaya Zeren <kayazeren@gmail.com>, 2025
` }, msgstr: [`Last-Translator: Kaya Zeren <kayazeren@gmail.com>, 2025
Language-Team: Turkish (https://app.transifex.com/nextcloud/teams/64236/tr/)
Content-Type: text/plain; charset=UTF-8
Language: tr
Plural-Forms: nplurals=2; plural=(n > 1);
`] }, '"{char}" is not allowed inside a name.': { msgid: '"{char}" is not allowed inside a name.', msgstr: ['Bir ad içinde "{char}" karakteri kullanılamaz.'] }, '"{extension}" is not an allowed name.': { msgid: '"{extension}" is not an allowed name.', msgstr: ['"{extension}" adına izin verilmiyor.'] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ['"{name}" geçersiz bir klasör adı.'] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ['"{name}" izin verilen bir klasör adı değil'] }, '"{segment}" is a reserved name and not allowed.': { msgid: '"{segment}" is a reserved name and not allowed.', msgstr: ['"{segment}" adı sistem için ayrılmış olduğundan kullanılamaz.'] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ['"/" karakteri klasör adında kullanılamaz.'] }, "All files": { msgid: "All files", msgstr: ["Tüm dosyalar"] }, Cancel: { msgid: "Cancel", msgstr: ["İptal"] }, Choose: { msgid: "Choose", msgstr: ["Seçin"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["{file} seçin"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["%n dosya seçin", "%n dosya seçin"] }, Copy: { msgid: "Copy", msgstr: ["Kopyala"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["{target} üzerine kopyala"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Yeni klasör oluşturulamadı"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["Dosyalar uygulamasının ayarları yüklenemedi"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["Dosyalar uygulamasının görünümleri yüklenemedi"] }, "Create directory": { msgid: "Create directory", msgstr: ["Klasör oluştur"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Geçerli görünüm seçici"] }, "Enter your name": { msgid: "Enter your name", msgstr: ["Adınızı yazın"] }, "Failed to set nickname.": { msgid: "Failed to set nickname.", msgstr: ["Takma ad ayarlanamadı."] }, Favorites: { msgid: "Favorites", msgstr: ["Sık kullanılanlar"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Sık kullanılan olarak seçtiğiniz dosyalar burada görüntülenir."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Son zamanlarda değiştirdiğiniz dosya ve klasörler burada görüntülenir."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Dosya listesini süz"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["Klasör adı boş olamaz."] }, "Guest identification": { msgid: "Guest identification", msgstr: ["Konuk kimliği"] }, Home: { msgid: "Home", msgstr: ["Giriş"] }, "Invalid name.": { msgid: "Invalid name.", msgstr: ["Ad geçersiz."] }, Modified: { msgid: "Modified", msgstr: ["Değiştirilme"] }, Move: { msgid: "Move", msgstr: ["Taşı"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["{target} üzerine taşı"] }, Name: { msgid: "Name", msgstr: ["Ad"] }, "Names must not be empty.": { msgid: "Names must not be empty.", msgstr: ["Ad boş olamaz."] }, 'Names must not end with "{extension}".': { msgid: 'Names must not end with "{extension}".', msgstr: ['Ad "{extension}" ile bitemez.'] }, "Names must not start with a dot.": { msgid: "Names must not start with a dot.", msgstr: ["Ad nokta karakteri ile başlayamaz."] }, New: { msgid: "New", msgstr: ["Yeni"] }, "New folder": { msgid: "New folder", msgstr: ["Yeni klasör"] }, "New folder name": { msgid: "New folder name", msgstr: ["Yeni klasör adı"] }, "No files in here": { msgid: "No files in here", msgstr: ["Burada herhangi bir dosya yok"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Süzgece uyan bir dosya bulunamadı."] }, "No matching files": { msgid: "No matching files", msgstr: ["Eşleşen bir dosya yok"] }, "Please enter a name with at least 2 characters.": { msgid: "Please enter a name with at least 2 characters.", msgstr: ["Ad en az 2 karakter uzunluğunda olmalıdır."] }, Recent: { msgid: "Recent", msgstr: ["Son kullanılanlar"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Tüm kayıtları seç"] }, "Select entry": { msgid: "Select entry", msgstr: ["Kaydı seç"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["{nodename} satırını seçin"] }, Size: { msgid: "Size", msgstr: ["Boyut"] }, "Submit name": { msgid: "Submit name", msgstr: ["Adı gönder"] }, Undo: { msgid: "Undo", msgstr: ["Geri al"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Bazı içerikler yükleyin ya da aygıtlarınızla eşitleyin!"] }, "You are currently identified as {nickname}.": { msgid: "You are currently identified as {nickname}.", msgstr: ["{nickname} olarak tanınıyorsunuz."] }, "You are currently not identified.": { msgid: "You are currently not identified.", msgstr: ["Henüz kendinizi tanıtmadınız."] }, "You cannot leave the name empty.": { msgid: "You cannot leave the name empty.", msgstr: ["Ad boş bırakılamaz."] } } } } }, { locale: "ug", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Uyghur (https://app.transifex.com/nextcloud/teams/64236/ug/)", "Content-Type": "text/plain; charset=UTF-8", Language: "ug", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Uyghur (https://app.transifex.com/nextcloud/teams/64236/ug/)
Content-Type: text/plain; charset=UTF-8
Language: ug
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "uk", json: { charset: "utf-8", headers: { "Last-Translator": "O St, 2025", "Language-Team": "Ukrainian (https://app.transifex.com/nextcloud/teams/64236/uk/)", "Content-Type": "text/plain; charset=UTF-8", Language: "uk", "Plural-Forms": "nplurals=4; plural=(n % 1 == 0 && n % 10 == 1 && n % 100 != 11 ? 0 : n % 1 == 0 && n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? 1 : n % 1 == 0 && (n % 10 ==0 || (n % 10 >=5 && n % 10 <=9) || (n % 100 >=11 && n % 100 <=14 )) ? 2: 3);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
O St, 2025
` }, msgstr: [`Last-Translator: O St, 2025
Language-Team: Ukrainian (https://app.transifex.com/nextcloud/teams/64236/uk/)
Content-Type: text/plain; charset=UTF-8
Language: uk
Plural-Forms: nplurals=4; plural=(n % 1 == 0 && n % 10 == 1 && n % 100 != 11 ? 0 : n % 1 == 0 && n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? 1 : n % 1 == 0 && (n % 10 ==0 || (n % 10 >=5 && n % 10 <=9) || (n % 100 >=11 && n % 100 <=14 )) ? 2: 3);
`] }, '"{char}" is not allowed inside a name.': { msgid: '"{char}" is not allowed inside a name.', msgstr: ['"{char}" не дозволено всередині імени.'] }, '"{extension}" is not an allowed name.': { msgid: '"{extension}" is not an allowed name.', msgstr: [`"{extension}" недозволене ім'я.`] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: [`"{name}" недійсне ім'я каталогу.`] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: [`"{name}" недозволене ім'я каталогу.`] }, '"{segment}" is a reserved name and not allowed.': { msgid: '"{segment}" is a reserved name and not allowed.', msgstr: [`"{segment}" зарезервоване ім'я і не дозволено для використання.`] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ['"/" не дозволено у імені каталогу.'] }, "All files": { msgid: "All files", msgstr: ["Всі файли"] }, Cancel: { msgid: "Cancel", msgstr: ["Скасувати"] }, Choose: { msgid: "Choose", msgstr: ["Вибрати"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Вибрати {file}"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["Вибрати %n файл", "Вибрати %n файли", "Вибрати %n файлів", "Вибрати %n файлів"] }, Copy: { msgid: "Copy", msgstr: ["Копіювати"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Копіювати до {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Не вдалося створити новий каталог"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["Не вдалося завантажити налаштування файлів"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["Не вдалося завантажити подання файлів"] }, "Create directory": { msgid: "Create directory", msgstr: ["Створити каталог"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Вибір подання"] }, "Enter your name": { msgid: "Enter your name", msgstr: ["Зазначте ваше ім'я"] }, "Failed to set nickname.": { msgid: "Failed to set nickname.", msgstr: ["Не вдалося встановити псевдо."] }, Favorites: { msgid: "Favorites", msgstr: ["Із зірочкою"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Тут показуватимуться файли та каталоги, які ви позначите зірочкою."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Тут показуватимуться файли та каталоги, які було нещодавно змінено."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Фільтрувати список файлів"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["Ім'я каталогу не може бути порожнє."] }, "Guest identification": { msgid: "Guest identification", msgstr: ["Ім'я для гостя"] }, Home: { msgid: "Home", msgstr: ["Домівка"] }, "Invalid name.": { msgid: "Invalid name.", msgstr: ["Недійсне ім'я."] }, Modified: { msgid: "Modified", msgstr: ["Змінено"] }, Move: { msgid: "Move", msgstr: ["Перемістити"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Перемістити до {target}"] }, Name: { msgid: "Name", msgstr: ["Ім'я"] }, "Names must not be empty.": { msgid: "Names must not be empty.", msgstr: ["Ім'я не може бути порожнє."] }, 'Names must not end with "{extension}".': { msgid: 'Names must not end with "{extension}".', msgstr: [`Ім'я не може закінчуватися на "{extension}".`] }, "Names must not start with a dot.": { msgid: "Names must not start with a dot.", msgstr: ["Ім'я не може починатися з крапки."] }, New: { msgid: "New", msgstr: ["Новий"] }, "New folder": { msgid: "New folder", msgstr: ["Новий каталог"] }, "New folder name": { msgid: "New folder name", msgstr: ["Ім'я нового каталогу"] }, "No files in here": { msgid: "No files in here", msgstr: ["Тут відсутні файли"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Відсутні збіги за фільтром."] }, "No matching files": { msgid: "No matching files", msgstr: ["Відсутні збіги файлів."] }, "Please enter a name with at least 2 characters.": { msgid: "Please enter a name with at least 2 characters.", msgstr: ["Зазначте ім'я довжиною не менше 2 символів"] }, Recent: { msgid: "Recent", msgstr: ["Останні"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Вибрати всі записи"] }, "Select entry": { msgid: "Select entry", msgstr: ["Вибрати запис"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Вибрати рядок для {nodename}"] }, Size: { msgid: "Size", msgstr: ["Розмір"] }, "Submit name": { msgid: "Submit name", msgstr: ["Встановити ім'я"] }, Undo: { msgid: "Undo", msgstr: ["Повернути"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Завантажте вміст або синхронізуйте з вашим пристроєм!"] }, "You are currently not identified.": { msgid: "You are currently not identified.", msgstr: ["Вас не ідентифіковано."] }, "You cannot leave the name empty.": { msgid: "You cannot leave the name empty.", msgstr: ["Потрібно зазначити ім'я."] } } } } }, { locale: "ur_PK", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Urdu (Pakistan) (https://app.transifex.com/nextcloud/teams/64236/ur_PK/)", "Content-Type": "text/plain; charset=UTF-8", Language: "ur_PK", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Urdu (Pakistan) (https://app.transifex.com/nextcloud/teams/64236/ur_PK/)
Content-Type: text/plain; charset=UTF-8
Language: ur_PK
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "uz", json: { charset: "utf-8", headers: { "Last-Translator": "Khurshid Ibatov <x.ibatov@dtsj.uz>, 2025", "Language-Team": "Uzbek (https://app.transifex.com/nextcloud/teams/64236/uz/)", "Content-Type": "text/plain; charset=UTF-8", Language: "uz", "Plural-Forms": "nplurals=1; plural=0;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Khurshid Ibatov <x.ibatov@dtsj.uz>, 2025
` }, msgstr: [`Last-Translator: Khurshid Ibatov <x.ibatov@dtsj.uz>, 2025
Language-Team: Uzbek (https://app.transifex.com/nextcloud/teams/64236/uz/)
Content-Type: text/plain; charset=UTF-8
Language: uz
Plural-Forms: nplurals=1; plural=0;
`] }, '"{char}" is not allowed inside a name.': { msgid: '"{char}" is not allowed inside a name.', msgstr: ['Nom ichida "{char}" ga ruxsat berilmagan.'] }, '"{extension}" is not an allowed name.': { msgid: '"{extension}" is not an allowed name.', msgstr: ['"{extension}" ruxsat etilgan nom emas.'] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ['"{name}" jild nomi yaroqsiz.'] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ['"{name}" ruxsat etilgan jild nomi emas'] }, '"{segment}" is a reserved name and not allowed.': { msgid: '"{segment}" is a reserved name and not allowed.', msgstr: ['"{segment}" - zaxiralangan nom va ruxsat berilmaydi.'] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ['"/" papka nomi ichida ruxsat berilmaydi.'] }, "All files": { msgid: "All files", msgstr: ["Barcha fayllar"] }, Cancel: { msgid: "Cancel", msgstr: ["Bekor qilish"] }, Choose: { msgid: "Choose", msgstr: ["Tanlang"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Tanlang {file}"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["Tanlang %n faylni"] }, Copy: { msgid: "Copy", msgstr: ["Nusxa"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: [" {target} ga nusxa"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Yangi jild yaratib bo‘lmadi"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["Fayl sozlamalari yuklanmadi"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["Fayllarni koʻrishni yuklab boʻlmadi"] }, "Create directory": { msgid: "Create directory", msgstr: ["Katalog yaratish"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Joriy ko'rinish selektori"] }, "Enter your name": { msgid: "Enter your name", msgstr: ["Ismingizni kiriting"] }, "Failed to set nickname.": { msgid: "Failed to set nickname.", msgstr: ["Taxallusni o‘rnatib bo‘lmadi."] }, Favorites: { msgid: "Favorites", msgstr: ["Tanlanganlar"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Tanlangan deb belgilagan fayl va papkalar shu yerda koʻrinadi."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Siz yaqinda oʻzgartirgan fayl va papkalar shu yerda koʻrinadi."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Fayl ro'yxatini filtrlash"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["Jild nomi boʻsh boʻlishi mumkin emas."] }, "Guest identification": { msgid: "Guest identification", msgstr: ["Foydalanuvchini identifikatsiyalash"] }, Home: { msgid: "Home", msgstr: ["Uy"] }, "Invalid name.": { msgid: "Invalid name.", msgstr: ["Nomi noto‘g‘ri."] }, Modified: { msgid: "Modified", msgstr: ["Modifikatsiyalangan"] }, Move: { msgid: "Move", msgstr: ["Ko'chirish"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: [" {target} ga ko'chirish"] }, Name: { msgid: "Name", msgstr: ["Nomi"] }, "Names must not be empty.": { msgid: "Names must not be empty.", msgstr: ["Ismlar bo'sh bo'lmasligi kerak."] }, 'Names must not end with "{extension}".': { msgid: 'Names must not end with "{extension}".', msgstr: ['Ismlar "{extension}" bilan tugamasligi kerak.'] }, "Names must not start with a dot.": { msgid: "Names must not start with a dot.", msgstr: ["Ismlar nuqta bilan boshlanmasligi kerak."] }, New: { msgid: "New", msgstr: ["Yangi"] }, "New folder": { msgid: "New folder", msgstr: ["Yangi jild"] }, "New folder name": { msgid: "New folder name", msgstr: ["Yangi jild nomi"] }, "No files in here": { msgid: "No files in here", msgstr: ["Fayl mavjud emas"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Filtringizga mos keladigan fayl topilmadi."] }, "No matching files": { msgid: "No matching files", msgstr: ["Mos fayllar yo'q"] }, "Please enter a name with at least 2 characters.": { msgid: "Please enter a name with at least 2 characters.", msgstr: ["Kamida 2 ta belgidan iborat nom kiriting."] }, Recent: { msgid: "Recent", msgstr: ["Yaqinda"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Barcha yozuvlarni tanlang"] }, "Select entry": { msgid: "Select entry", msgstr: ["Yozuvni tanlang"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["{nodename} uchun qatorni tanlang"] }, Size: { msgid: "Size", msgstr: ["O`lcham"] }, "Submit name": { msgid: "Submit name", msgstr: ["Ismni tasdiqlang"] }, Undo: { msgid: "Undo", msgstr: ["Bekor qilish"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Qurilmangizga ba'zi kontentni yuklang yoki sinxronlang!"] }, "You are currently not identified.": { msgid: "You are currently not identified.", msgstr: ["Siz hozirda identifikatsiyadan o'tmagansiz"] }, "You cannot leave the name empty.": { msgid: "You cannot leave the name empty.", msgstr: ["Ism katagini bo'sh qoldirib bo'lmaydi."] } } } } }, { locale: "vi", json: { charset: "utf-8", headers: { "Last-Translator": "Trần Đình Tuyển, 2024", "Language-Team": "Vietnamese (https://app.transifex.com/nextcloud/teams/64236/vi/)", "Content-Type": "text/plain; charset=UTF-8", Language: "vi", "Plural-Forms": "nplurals=1; plural=0;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
Tran Duc, 2024
Trần Đình Tuyển, 2024
` }, msgstr: [`Last-Translator: Trần Đình Tuyển, 2024
Language-Team: Vietnamese (https://app.transifex.com/nextcloud/teams/64236/vi/)
Content-Type: text/plain; charset=UTF-8
Language: vi
Plural-Forms: nplurals=1; plural=0;
`] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ['"{name}" là tên thư mục không hợp lệ.'] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ['"1{name}"không phải là tên thư mục được cho phép'] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ['"/"không được phép đặt trong tên thư mục.'] }, "All files": { msgid: "All files", msgstr: ["Tất cả tệp"] }, Choose: { msgid: "Choose", msgstr: ["Chọn"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Chọn {file}"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["Chọn %n tệp"] }, Copy: { msgid: "Copy", msgstr: ["Sao chép"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Sao chép đến {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Không thể tạo thư mục mới"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["Không thể tải tập tin cài đặt"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["Không thể tải xuống tệp xem"] }, "Create directory": { msgid: "Create directory", msgstr: ["Tạo thư mục"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Hiện tại chế độ xem của bộ chọn"] }, Favorites: { msgid: "Favorites", msgstr: ["Yêu cầu thích"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Các tập tin và thư mục bạn đánh dấu yêu thích sẽ hiển thị ở đây."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Các tập tin và thư mục bạn sửa đổi gần đây sẽ hiển thị ở đây."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Filter list file"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["Thư mục tên không được để trống."] }, Home: { msgid: "Home", msgstr: ["Trang chủ"] }, Modified: { msgid: "Modified", msgstr: ["Đã sửa đổi"] }, Move: { msgid: "Move", msgstr: ["Di chuyển"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Di chuyển đến{target}"] }, Name: { msgid: "Name", msgstr: ["Tên"] }, New: { msgid: "New", msgstr: ["Mới"] }, "New folder": { msgid: "New folder", msgstr: ["New thư mục"] }, "New folder name": { msgid: "New folder name", msgstr: ["New thư mục tên"] }, "No files in here": { msgid: "No files in here", msgstr: ["No file at here"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Không tìm thấy tệp nào phù hợp với bộ lọc của bạn."] }, "No matching files": { msgid: "No matching files", msgstr: ["No file phù hợp"] }, Recent: { msgid: "Recent", msgstr: ["Gần đây"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Choose all items"] }, "Select entry": { msgid: "Select entry", msgstr: ["Chọn mục nhập"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Choose hang cho{nodename}"] }, Size: { msgid: "Size", msgstr: ["Kích cỡ"] }, Undo: { msgid: "Undo", msgstr: ["Hoàn tác"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Tải lên một số nội dung hoặc đồng bộ hóa với thiết bị của bạn!"] } } } } }, { locale: "zh_CN", json: { charset: "utf-8", headers: { "Last-Translator": "Gloryandel, 2024", "Language-Team": "Chinese (China) (https://app.transifex.com/nextcloud/teams/64236/zh_CN/)", "Content-Type": "text/plain; charset=UTF-8", Language: "zh_CN", "Plural-Forms": "nplurals=1; plural=0;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
ken, 2023
Eric, 2023
Phonebook3599, 2024
Gloryandel, 2024
` }, msgstr: [`Last-Translator: Gloryandel, 2024
Language-Team: Chinese (China) (https://app.transifex.com/nextcloud/teams/64236/zh_CN/)
Content-Type: text/plain; charset=UTF-8
Language: zh_CN
Plural-Forms: nplurals=1; plural=0;
`] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ["“{name}” 是无效的文件夹名称。"] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ["“{name}” 不是允许的文件夹名称"] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ["文件夹名称中不允许包含 “/”。"] }, "All files": { msgid: "All files", msgstr: ["所有文件"] }, Choose: { msgid: "Choose", msgstr: ["选择"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["选择 {file}"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["选择 %n 个文件"] }, Copy: { msgid: "Copy", msgstr: ["复制"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["复制到 {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["无法创建新文件夹"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["无法加载文件设置"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["无法加载文件视图"] }, "Create directory": { msgid: "Create directory", msgstr: ["创建目录"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["当前视图选择器"] }, Favorites: { msgid: "Favorites", msgstr: ["最爱"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["您标记为最爱的文件与文件夹会显示在这里"] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["您最近修改的文件与文件夹会显示在这里"] }, "Filter file list": { msgid: "Filter file list", msgstr: ["过滤文件列表"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["文件夹名称不能为空。"] }, Home: { msgid: "Home", msgstr: ["主目录"] }, Modified: { msgid: "Modified", msgstr: ["已修改"] }, Move: { msgid: "Move", msgstr: ["移动"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["移动至 {target}"] }, Name: { msgid: "Name", msgstr: ["名称"] }, New: { msgid: "New", msgstr: ["新建"] }, "New folder": { msgid: "New folder", msgstr: ["新文件夹"] }, "New folder name": { msgid: "New folder name", msgstr: ["新文件夹名称"] }, "No files in here": { msgid: "No files in here", msgstr: ["此处无文件"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["找不到符合您过滤条件的文件"] }, "No matching files": { msgid: "No matching files", msgstr: ["无符合的文件"] }, Recent: { msgid: "Recent", msgstr: ["最近"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["选择所有条目"] }, "Select entry": { msgid: "Select entry", msgstr: ["选择条目"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["选择 {nodename} 的列"] }, Size: { msgid: "Size", msgstr: ["大小"] }, Undo: { msgid: "Undo", msgstr: [" 撤消"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["上传一些项目或与您的设备同步！"] } } } } }, { locale: "zh_HK", json: { charset: "utf-8", headers: { "Last-Translator": "Café Tango, 2025", "Language-Team": "Chinese (Hong Kong) (https://app.transifex.com/nextcloud/teams/64236/zh_HK/)", "Content-Type": "text/plain; charset=UTF-8", Language: "zh_HK", "Plural-Forms": "nplurals=1; plural=0;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
Café Tango, 2025
` }, msgstr: [`Last-Translator: Café Tango, 2025
Language-Team: Chinese (Hong Kong) (https://app.transifex.com/nextcloud/teams/64236/zh_HK/)
Content-Type: text/plain; charset=UTF-8
Language: zh_HK
Plural-Forms: nplurals=1; plural=0;
`] }, '"{char}" is not allowed inside a name.': { msgid: '"{char}" is not allowed inside a name.', msgstr: ['名稱中不能使用 "{char}"。'] }, '"{extension}" is not an allowed name.': { msgid: '"{extension}" is not an allowed name.', msgstr: ["「{extension}」並非允許的名稱。"] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ["「{name}」是無效的資料夾名稱。"] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ["資料夾名稱「{name}」不符合允許的規範。"] }, '"{segment}" is a reserved name and not allowed.': { msgid: '"{segment}" is a reserved name and not allowed.', msgstr: ["「{segment}」是一個保留名稱，不能使用。"] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ['資料夾名稱中不允許使用 "/"。'] }, "All files": { msgid: "All files", msgstr: ["所有檔案"] }, Cancel: { msgid: "Cancel", msgstr: ["取消"] }, Choose: { msgid: "Choose", msgstr: ["選擇"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["選擇 {file}"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["選擇 %n 個檔案"] }, Copy: { msgid: "Copy", msgstr: ["複製"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["複製到 {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["無法建立新資料夾"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["無法載入檔案設定"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["無法載入檔案視圖"] }, "Create directory": { msgid: "Create directory", msgstr: ["建立目錄"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["目前視圖選擇器"] }, "Enter your name": { msgid: "Enter your name", msgstr: ["輸入您的名字"] }, "Failed to set nickname.": { msgid: "Failed to set nickname.", msgstr: ["無法設置暱稱。"] }, Favorites: { msgid: "Favorites", msgstr: ["最愛"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["您標記為最愛的檔案與資料夾將會顯示在此處。"] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["您最近修改的檔案與資料夾將會顯示在此處。"] }, "Filter file list": { msgid: "Filter file list", msgstr: ["過濾檔案清單"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["資料夾名稱不能為空。"] }, "Guest identification": { msgid: "Guest identification", msgstr: ["訪客身份識別"] }, Home: { msgid: "Home", msgstr: ["首頁"] }, "Invalid name.": { msgid: "Invalid name.", msgstr: ["無效的名字。"] }, Modified: { msgid: "Modified", msgstr: ["已修改"] }, Move: { msgid: "Move", msgstr: ["移動"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["移動至 {target}"] }, Name: { msgid: "Name", msgstr: ["名稱"] }, "Names must not be empty.": { msgid: "Names must not be empty.", msgstr: ["名稱不能為空。"] }, 'Names must not end with "{extension}".': { msgid: 'Names must not end with "{extension}".', msgstr: ["名稱不得以「{extension}」結尾。"] }, "Names must not start with a dot.": { msgid: "Names must not start with a dot.", msgstr: ["名稱不得以點開頭。"] }, New: { msgid: "New", msgstr: ["新"] }, "New folder": { msgid: "New folder", msgstr: ["新資料夾"] }, "New folder name": { msgid: "New folder name", msgstr: ["新資料夾名稱"] }, "No files in here": { msgid: "No files in here", msgstr: ["此處無檔案"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["找不到符合您過濾條件的檔案。"] }, "No matching files": { msgid: "No matching files", msgstr: ["沒有匹配的檔案"] }, "Please enter a name with at least 2 characters.": { msgid: "Please enter a name with at least 2 characters.", msgstr: ["請輸入至少 2 個字符的名稱。"] }, Recent: { msgid: "Recent", msgstr: ["最近"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["選擇所有項目"] }, "Select entry": { msgid: "Select entry", msgstr: ["選擇項目"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["選擇 {nodename} 的列"] }, Size: { msgid: "Size", msgstr: ["大小"] }, "Submit name": { msgid: "Submit name", msgstr: ["遞交名字"] }, Undo: { msgid: "Undo", msgstr: ["還原"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["上傳一些內容或與您的裝置同步！"] }, "You are currently not identified.": { msgid: "You are currently not identified.", msgstr: ["您目前尚未被識別。"] }, "You cannot leave the name empty.": { msgid: "You cannot leave the name empty.", msgstr: ["名稱不能留空。"] } } } } }, { locale: "zh_TW", json: { charset: "utf-8", headers: { "Last-Translator": "黃柏諺 <s8321414@gmail.com>, 2023", "Language-Team": "Chinese (Taiwan) (https://app.transifex.com/nextcloud/teams/64236/zh_TW/)", "Content-Type": "text/plain; charset=UTF-8", Language: "zh_TW", "Plural-Forms": "nplurals=1; plural=0;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
黃柏諺 <s8321414@gmail.com>, 2023
` }, msgstr: [`Last-Translator: 黃柏諺 <s8321414@gmail.com>, 2023
Language-Team: Chinese (Taiwan) (https://app.transifex.com/nextcloud/teams/64236/zh_TW/)
Content-Type: text/plain; charset=UTF-8
Language: zh_TW
Plural-Forms: nplurals=1; plural=0;
`] }, '"{name}" is an invalid file name.': { msgid: '"{name}" is an invalid file name.', msgstr: ["「{name}」是無效的檔案名稱。"] }, '"{name}" is not an allowed filetype': { msgid: '"{name}" is not an allowed filetype', msgstr: ["「{name}」並非允許的檔案類型"] }, '"/" is not allowed inside a file name.': { msgid: '"/" is not allowed inside a file name.', msgstr: ["檔案名稱中不允許使用「/」。"] }, "All files": { msgid: "All files", msgstr: ["所有檔案"] }, Choose: { msgid: "Choose", msgstr: ["選擇"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["選擇 {file}"] }, Copy: { msgid: "Copy", msgstr: ["複製"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["複製到 {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["無法建立新資料夾"] }, "Create directory": { msgid: "Create directory", msgstr: ["建立目錄"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["目前檢視選取器"] }, Favorites: { msgid: "Favorites", msgstr: ["最愛"] }, "File name cannot be empty.": { msgid: "File name cannot be empty.", msgstr: ["檔案名稱不能為空。"] }, "Filepicker sections": { msgid: "Filepicker sections", msgstr: ["檔案挑選器選取"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["您標記為最愛的檔案與資料夾將會顯示在此處。"] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["您最近修改的檔案與資料夾將會顯示在此處。"] }, "Filter file list": { msgid: "Filter file list", msgstr: ["過濾檔案清單"] }, Home: { msgid: "Home", msgstr: ["家"] }, "Mime type {mime}": { msgid: "Mime type {mime}", msgstr: ["Mime type {mime}"] }, Modified: { msgid: "Modified", msgstr: ["已修改"] }, Move: { msgid: "Move", msgstr: ["移動"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["移動至 {target}"] }, Name: { msgid: "Name", msgstr: ["名稱"] }, New: { msgid: "New", msgstr: ["新"] }, "New folder": { msgid: "New folder", msgstr: ["新資料夾"] }, "New folder name": { msgid: "New folder name", msgstr: ["新資料夾名稱"] }, "No files in here": { msgid: "No files in here", msgstr: ["此處無檔案"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["找不到符合您過濾條件的檔案。"] }, "No matching files": { msgid: "No matching files", msgstr: ["無符合的檔案"] }, Recent: { msgid: "Recent", msgstr: ["最近"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["選取所有條目"] }, "Select entry": { msgid: "Select entry", msgstr: ["選取條目"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["選取 {nodename} 的列"] }, Size: { msgid: "Size", msgstr: ["大小"] }, Undo: { msgid: "Undo", msgstr: ["復原"] }, unknown: { msgid: "unknown", msgstr: ["未知"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["上傳一些內容或與您的裝置同步"] } } } } }, { locale: "zu_ZA", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Zulu (South Africa) (https://app.transifex.com/nextcloud/teams/64236/zu_ZA/)", "Content-Type": "text/plain; charset=UTF-8", Language: "zu_ZA", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Zulu (South Africa) (https://app.transifex.com/nextcloud/teams/64236/zu_ZA/)
Content-Type: text/plain; charset=UTF-8
Language: zu_ZA
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }].map((s) => ip.addTranslation(s.locale, s.json));
const ru = ip.build();
ru.ngettext.bind(ru), ru.gettext.bind(ru);
b_().setApp("@nextcloud/dialogs").detectLogLevel().build();
const d2 = "off", u2 = "polite", m2 = "assertive";
var _g = ((s) => (s[s.OFF = d2] = "OFF", s[s.POLITE = u2] = "POLITE", s[s.ASSERTIVE = m2] = "ASSERTIVE", s))(_g || {});
const c2 = 7e3;
function pg(s, r) {
  if (r = { timeout: c2, isHTML: false, type: void 0, selector: void 0, onRemove: () => {
  }, onClick: void 0, close: true, ...r }, typeof s == "string" && !r.isHTML) {
    const h = document.createElement("div");
    h.innerHTML = s, s = h.innerText;
  }
  let i = r.type ?? "";
  typeof r.onClick == "function" && (i += " toast-with-click ");
  const l = s instanceof Node;
  let m = _g.POLITE;
  r.ariaLive ? m = r.ariaLive : (r.type === "toast-error" || r.type === "toast-undo") && (m = _g.ASSERTIVE);
  const g = o2({ [l ? "node" : "text"]: s, duration: r.timeout, callback: r.onRemove, onClick: r.onClick, close: r.close, gravity: "top", selector: r.selector, position: "right", backgroundColor: "", className: "dialogs " + i, escapeMarkup: !r.isHTML, ariaLive: m });
  return g.showToast(), g;
}
function yg(s, r) {
  return pg(s, { ...r, type: "toast-error" });
}
function g2(s, r) {
  return pg(s, { ...r, type: "toast-info" });
}
function h2(s, r) {
  return pg(s, { ...r, type: "toast-success" });
}
var Yo = { exports: {} };
var f2 = Yo.exports, op;
function _2() {
  return op || (op = 1, (function(s, r) {
    (function() {
      var i, l = "4.17.21", m = 200, g = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", h = "Expected a function", p = "Invalid `variable` option passed into `_.template`", M = "__lodash_hash_undefined__", v = 500, D = "__lodash_placeholder__", S = 1, E = 2, N = 4, j = 1, R = 2, x = 1, X = 2, ee = 4, se = 8, Q = 16, ge = 32, B = 64, J = 128, he = 256, je = 512, Te = 30, pe = "...", Ot = 800, Re = 16, zn = 1, Zs = 2, Fa = 3, Fs = 1 / 0, Qs = 9007199254740991, Mu = 17976931348623157e292, Yt = NaN, Ut = 4294967295, dr = Ut - 1, mi = Ut >>> 1, Bn = [["ary", J], ["bind", x], ["bindKey", X], ["curry", se], ["curryRight", Q], ["flip", je], ["partial", ge], ["partialRight", B], ["rearg", he]], V = "[object Arguments]", ur = "[object Array]", Lu = "[object AsyncFunction]", Xs = "[object Boolean]", Wn = "[object Date]", ku = "[object DOMException]", mr = "[object Error]", cr = "[object Function]", Io = "[object GeneratorFunction]", es = "[object Map]", xa = "[object Number]", Tu = "[object Null]", xs = "[object Object]", Ro = "[object Promise]", Du = "[object Proxy]", $n = "[object RegExp]", Oe = "[object Set]", Mn = "[object String]", gr = "[object Symbol]", Yu = "[object Undefined]", Gn = "[object WeakMap]", Ct = "[object WeakSet]", Jn = "[object ArrayBuffer]", en = "[object DataView]", Vn = "[object Float32Array]", xe = "[object Float64Array]", hr = "[object Int8Array]", fr = "[object Int16Array]", Kn = "[object Int32Array]", Na = "[object Uint8Array]", Zn = "[object Uint8ClampedArray]", tn = "[object Uint16Array]", Qn = "[object Uint32Array]", Cu = /\b__p \+= '';/g, _r = /\b(__p \+=) '' \+/g, Su = /(__e\(.*?\)|\b__t\)) \+\n'';/g, Xn = /&(?:amp|lt|gt|quot|#39);/g, Ln = /[&<>"']/g, ci = RegExp(Xn.source), pr = RegExp(Ln.source), $ = /<%-([\s\S]+?)%>/g, bu = /<%([\s\S]+?)%>/g, Oo = /<%=([\s\S]+?)%>/g, Ns = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, zt = /^\w*$/, _e = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Aa = /[\\^$.*+?()[\]{}|]/g, Se = RegExp(Aa.source), kn = /^\s+/, Fu = /\s/, yr = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, it = /\{\n\/\* \[wrapped with (.+)\] \*/, As = /,? & /, gs = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, Qe = /[()=,{}\[\]\/\s]/, ts = /\\(\\)?/g, Es = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, sn = /\w*$/, xu = /^[-+]0x[0-9a-f]+$/i, Nu = /^0b[01]+$/i, Ea = /^\[object .+?Constructor\]$/, Uo = /^0o[0-7]+$/i, Au = /^(?:0|[1-9]\d*)$/, ea = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, nn = /($^)/, zo = /['\n\r\u2028\u2029\\]/g, wr = "\\ud800-\\udfff", Eu = "\\u0300-\\u036f", Hu = "\\ufe20-\\ufe2f", ze = "\\u20d0-\\u20ff", vr = Eu + Hu + ze, Bo = "\\u2700-\\u27bf", gi = "a-z\\xdf-\\xf6\\xf8-\\xff", Wo = "\\xac\\xb1\\xd7\\xf7", Pu = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", ju = "\\u2000-\\u206f", qu = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", $o = "A-Z\\xc0-\\xd6\\xd8-\\xde", Go = "\\ufe0e\\ufe0f", Jo = Wo + Pu + ju + qu, Mr = "['’]", Vo = "[" + wr + "]", Ko = "[" + Jo + "]", Lr = "[" + vr + "]", Zo = "\\d+", Qo = "[" + Bo + "]", Xo = "[" + gi + "]", ta = "[^" + wr + Jo + Zo + Bo + gi + $o + "]", sa = "\\ud83c[\\udffb-\\udfff]", el = "(?:" + Lr + "|" + sa + ")", na = "[^" + wr + "]", ss = "(?:\\ud83c[\\udde6-\\uddff]){2}", hi = "[\\ud800-\\udbff][\\udc00-\\udfff]", aa = "[" + $o + "]", tl = "\\u200d", sl = "(?:" + Xo + "|" + ta + ")", Iu = "(?:" + aa + "|" + ta + ")", nl = "(?:" + Mr + "(?:d|ll|m|re|s|t|ve))?", al = "(?:" + Mr + "(?:D|LL|M|RE|S|T|VE))?", rl = el + "?", kr = "[" + Go + "]?", Ru = "(?:" + tl + "(?:" + [na, ss, hi].join("|") + ")" + kr + rl + ")*", il = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", Ou = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", ol = kr + rl + Ru, Uu = "(?:" + [Qo, ss, hi].join("|") + ")" + ol, zu = "(?:" + [na + Lr + "?", Lr, ss, hi, Vo].join("|") + ")", Bu = RegExp(Mr, "g"), Wu = RegExp(Lr, "g"), fi = RegExp(sa + "(?=" + sa + ")|" + zu + ol, "g"), $u = RegExp([aa + "?" + Xo + "+" + nl + "(?=" + [Ko, aa, "$"].join("|") + ")", Iu + "+" + al + "(?=" + [Ko, aa + sl, "$"].join("|") + ")", aa + "?" + sl + "+" + nl, aa + "+" + al, Ou, il, Zo, Uu].join("|"), "g"), Gu = RegExp("[" + tl + wr + vr + Go + "]"), Ju = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, Vu = ["Array", "Buffer", "DataView", "Date", "Error", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Map", "Math", "Object", "Promise", "RegExp", "Set", "String", "Symbol", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "WeakMap", "_", "clearTimeout", "isFinite", "parseInt", "setTimeout"], Ku = -1, He = {};
      He[Vn] = He[xe] = He[hr] = He[fr] = He[Kn] = He[Na] = He[Zn] = He[tn] = He[Qn] = true, He[V] = He[ur] = He[Jn] = He[Xs] = He[en] = He[Wn] = He[mr] = He[cr] = He[es] = He[xa] = He[xs] = He[$n] = He[Oe] = He[Mn] = He[Gn] = false;
      var Ae = {};
      Ae[V] = Ae[ur] = Ae[Jn] = Ae[en] = Ae[Xs] = Ae[Wn] = Ae[Vn] = Ae[xe] = Ae[hr] = Ae[fr] = Ae[Kn] = Ae[es] = Ae[xa] = Ae[xs] = Ae[$n] = Ae[Oe] = Ae[Mn] = Ae[gr] = Ae[Na] = Ae[Zn] = Ae[tn] = Ae[Qn] = true, Ae[mr] = Ae[cr] = Ae[Gn] = false;
      var Zu = { À: "A", Á: "A", Â: "A", Ã: "A", Ä: "A", Å: "A", à: "a", á: "a", â: "a", ã: "a", ä: "a", å: "a", Ç: "C", ç: "c", Ð: "D", ð: "d", È: "E", É: "E", Ê: "E", Ë: "E", è: "e", é: "e", ê: "e", ë: "e", Ì: "I", Í: "I", Î: "I", Ï: "I", ì: "i", í: "i", î: "i", ï: "i", Ñ: "N", ñ: "n", Ò: "O", Ó: "O", Ô: "O", Õ: "O", Ö: "O", Ø: "O", ò: "o", ó: "o", ô: "o", õ: "o", ö: "o", ø: "o", Ù: "U", Ú: "U", Û: "U", Ü: "U", ù: "u", ú: "u", û: "u", ü: "u", Ý: "Y", ý: "y", ÿ: "y", Æ: "Ae", æ: "ae", Þ: "Th", þ: "th", ß: "ss", Ā: "A", Ă: "A", Ą: "A", ā: "a", ă: "a", ą: "a", Ć: "C", Ĉ: "C", Ċ: "C", Č: "C", ć: "c", ĉ: "c", ċ: "c", č: "c", Ď: "D", Đ: "D", ď: "d", đ: "d", Ē: "E", Ĕ: "E", Ė: "E", Ę: "E", Ě: "E", ē: "e", ĕ: "e", ė: "e", ę: "e", ě: "e", Ĝ: "G", Ğ: "G", Ġ: "G", Ģ: "G", ĝ: "g", ğ: "g", ġ: "g", ģ: "g", Ĥ: "H", Ħ: "H", ĥ: "h", ħ: "h", Ĩ: "I", Ī: "I", Ĭ: "I", Į: "I", İ: "I", ĩ: "i", ī: "i", ĭ: "i", į: "i", ı: "i", Ĵ: "J", ĵ: "j", Ķ: "K", ķ: "k", ĸ: "k", Ĺ: "L", Ļ: "L", Ľ: "L", Ŀ: "L", Ł: "L", ĺ: "l", ļ: "l", ľ: "l", ŀ: "l", ł: "l", Ń: "N", Ņ: "N", Ň: "N", Ŋ: "N", ń: "n", ņ: "n", ň: "n", ŋ: "n", Ō: "O", Ŏ: "O", Ő: "O", ō: "o", ŏ: "o", ő: "o", Ŕ: "R", Ŗ: "R", Ř: "R", ŕ: "r", ŗ: "r", ř: "r", Ś: "S", Ŝ: "S", Ş: "S", Š: "S", ś: "s", ŝ: "s", ş: "s", š: "s", Ţ: "T", Ť: "T", Ŧ: "T", ţ: "t", ť: "t", ŧ: "t", Ũ: "U", Ū: "U", Ŭ: "U", Ů: "U", Ű: "U", Ų: "U", ũ: "u", ū: "u", ŭ: "u", ů: "u", ű: "u", ų: "u", Ŵ: "W", ŵ: "w", Ŷ: "Y", ŷ: "y", Ÿ: "Y", Ź: "Z", Ż: "Z", Ž: "Z", ź: "z", ż: "z", ž: "z", Ĳ: "IJ", ĳ: "ij", Œ: "Oe", œ: "oe", ŉ: "'n", ſ: "s" }, _i = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, pi = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'" }, Qu = { "\\": "\\", "'": "'", "\n": "n", "\r": "r", "\u2028": "u2028", "\u2029": "u2029" }, ll = parseFloat, dl = parseInt, ul = typeof Ud == "object" && Ud && Ud.Object === Object && Ud, Xu = typeof self == "object" && self && self.Object === Object && self, st = ul || Xu || Function("return this")(), yi = r && !r.nodeType && r, an = yi && true && s && !s.nodeType && s, Pe = an && an.exports === yi, Tn = Pe && ul.process, ot = (function() {
        try {
          var Y = an && an.require && an.require("util").types;
          return Y || Tn && Tn.binding && Tn.binding("util");
        } catch {
        }
      })(), ml = ot && ot.isArrayBuffer, wi = ot && ot.isDate, cl = ot && ot.isMap, gl = ot && ot.isRegExp, Ha = ot && ot.isSet, Hs = ot && ot.isTypedArray;
      function ut(Y, A, F) {
        switch (F.length) {
          case 0:
            return Y.call(A);
          case 1:
            return Y.call(A, F[0]);
          case 2:
            return Y.call(A, F[0], F[1]);
          case 3:
            return Y.call(A, F[0], F[1], F[2]);
        }
        return Y.apply(A, F);
      }
      function em(Y, A, F, G) {
        for (var oe = -1, De = Y == null ? 0 : Y.length; ++oe < De; ) {
          var Xe = Y[oe];
          A(G, Xe, F(Xe), Y);
        }
        return G;
      }
      function Je(Y, A) {
        for (var F = -1, G = Y == null ? 0 : Y.length; ++F < G && A(Y[F], F, Y) !== false; ) ;
        return Y;
      }
      function tm(Y, A) {
        for (var F = Y == null ? 0 : Y.length; F-- && A(Y[F], F, Y) !== false; ) ;
        return Y;
      }
      function Tr(Y, A) {
        for (var F = -1, G = Y == null ? 0 : Y.length; ++F < G; ) if (!A(Y[F], F, Y)) return false;
        return true;
      }
      function rn(Y, A) {
        for (var F = -1, G = Y == null ? 0 : Y.length, oe = 0, De = []; ++F < G; ) {
          var Xe = Y[F];
          A(Xe, F, Y) && (De[oe++] = Xe);
        }
        return De;
      }
      function Dr(Y, A) {
        var F = Y == null ? 0 : Y.length;
        return !!F && ra(Y, A, 0) > -1;
      }
      function vi(Y, A, F) {
        for (var G = -1, oe = Y == null ? 0 : Y.length; ++G < oe; ) if (F(A, Y[G])) return true;
        return false;
      }
      function Ne(Y, A) {
        for (var F = -1, G = Y == null ? 0 : Y.length, oe = Array(G); ++F < G; ) oe[F] = A(Y[F], F, Y);
        return oe;
      }
      function hs(Y, A) {
        for (var F = -1, G = A.length, oe = Y.length; ++F < G; ) Y[oe + F] = A[F];
        return Y;
      }
      function Mi(Y, A, F, G) {
        var oe = -1, De = Y == null ? 0 : Y.length;
        for (G && De && (F = Y[++oe]); ++oe < De; ) F = A(F, Y[oe], oe, Y);
        return F;
      }
      function sm(Y, A, F, G) {
        var oe = Y == null ? 0 : Y.length;
        for (G && oe && (F = Y[--oe]); oe--; ) F = A(F, Y[oe], oe, Y);
        return F;
      }
      function Li(Y, A) {
        for (var F = -1, G = Y == null ? 0 : Y.length; ++F < G; ) if (A(Y[F], F, Y)) return true;
        return false;
      }
      var hl = ki("length");
      function nm(Y) {
        return Y.split("");
      }
      function am(Y) {
        return Y.match(gs) || [];
      }
      function fl(Y, A, F) {
        var G;
        return F(Y, function(oe, De, Xe) {
          if (A(oe, De, Xe)) return G = De, false;
        }), G;
      }
      function Yr(Y, A, F, G) {
        for (var oe = Y.length, De = F + (G ? 1 : -1); G ? De-- : ++De < oe; ) if (A(Y[De], De, Y)) return De;
        return -1;
      }
      function ra(Y, A, F) {
        return A === A ? Ll(Y, A, F) : Yr(Y, pl, F);
      }
      function _l(Y, A, F, G) {
        for (var oe = F - 1, De = Y.length; ++oe < De; ) if (G(Y[oe], A)) return oe;
        return -1;
      }
      function pl(Y) {
        return Y !== Y;
      }
      function Dn(Y, A) {
        var F = Y == null ? 0 : Y.length;
        return F ? Di(Y, A) / F : Yt;
      }
      function ki(Y) {
        return function(A) {
          return A == null ? i : A[Y];
        };
      }
      function Pa(Y) {
        return function(A) {
          return Y == null ? i : Y[A];
        };
      }
      function yl(Y, A, F, G, oe) {
        return oe(Y, function(De, Xe, fe) {
          F = G ? (G = false, De) : A(F, De, Xe, fe);
        }), F;
      }
      function Ti(Y, A) {
        var F = Y.length;
        for (Y.sort(A); F--; ) Y[F] = Y[F].value;
        return Y;
      }
      function Di(Y, A) {
        for (var F, G = -1, oe = Y.length; ++G < oe; ) {
          var De = A(Y[G]);
          De !== i && (F = F === i ? De : F + De);
        }
        return F;
      }
      function Yi(Y, A) {
        for (var F = -1, G = Array(Y); ++F < Y; ) G[F] = A(F);
        return G;
      }
      function rm(Y, A) {
        return Ne(A, function(F) {
          return [F, Y[F]];
        });
      }
      function wl(Y) {
        return Y && Y.slice(0, Cr(Y) + 1).replace(kn, "");
      }
      function _t(Y) {
        return function(A) {
          return Y(A);
        };
      }
      function Ci(Y, A) {
        return Ne(A, function(F) {
          return Y[F];
        });
      }
      function ia(Y, A) {
        return Y.has(A);
      }
      function Ee(Y, A) {
        for (var F = -1, G = Y.length; ++F < G && ra(A, Y[F], 0) > -1; ) ;
        return F;
      }
      function vl(Y, A) {
        for (var F = Y.length; F-- && ra(A, Y[F], 0) > -1; ) ;
        return F;
      }
      function im(Y, A) {
        for (var F = Y.length, G = 0; F--; ) Y[F] === A && ++G;
        return G;
      }
      var Ml = Pa(Zu), om = Pa(_i);
      function lm(Y) {
        return "\\" + Qu[Y];
      }
      function dm(Y, A) {
        return Y == null ? i : Y[A];
      }
      function fs(Y) {
        return Gu.test(Y);
      }
      function um(Y) {
        return Ju.test(Y);
      }
      function mm(Y) {
        for (var A, F = []; !(A = Y.next()).done; ) F.push(A.value);
        return F;
      }
      function Si(Y) {
        var A = -1, F = Array(Y.size);
        return Y.forEach(function(G, oe) {
          F[++A] = [oe, G];
        }), F;
      }
      function ja(Y, A) {
        return function(F) {
          return Y(A(F));
        };
      }
      function ns(Y, A) {
        for (var F = -1, G = Y.length, oe = 0, De = []; ++F < G; ) {
          var Xe = Y[F];
          (Xe === A || Xe === D) && (Y[F] = D, De[oe++] = F);
        }
        return De;
      }
      function oa(Y) {
        var A = -1, F = Array(Y.size);
        return Y.forEach(function(G) {
          F[++A] = G;
        }), F;
      }
      function cm(Y) {
        var A = -1, F = Array(Y.size);
        return Y.forEach(function(G) {
          F[++A] = [G, G];
        }), F;
      }
      function Ll(Y, A, F) {
        for (var G = F - 1, oe = Y.length; ++G < oe; ) if (Y[G] === A) return G;
        return -1;
      }
      function gm(Y, A, F) {
        for (var G = F + 1; G--; ) if (Y[G] === A) return G;
        return G;
      }
      function on(Y) {
        return fs(Y) ? fm(Y) : hl(Y);
      }
      function St(Y) {
        return fs(Y) ? _m(Y) : nm(Y);
      }
      function Cr(Y) {
        for (var A = Y.length; A-- && Fu.test(Y.charAt(A)); ) ;
        return A;
      }
      var hm = Pa(pi);
      function fm(Y) {
        for (var A = fi.lastIndex = 0; fi.test(Y); ) ++A;
        return A;
      }
      function _m(Y) {
        return Y.match(fi) || [];
      }
      function pm(Y) {
        return Y.match($u) || [];
      }
      var ym = (function Y(A) {
        A = A == null ? st : la.defaults(st.Object(), A, la.pick(st, Vu));
        var F = A.Array, G = A.Date, oe = A.Error, De = A.Function, Xe = A.Math, fe = A.Object, Ps = A.RegExp, kl = A.String, Bt = A.TypeError, qa = F.prototype, Tl = De.prototype, da = fe.prototype, Sr = A["__core-js_shared__"], Ia = Tl.toString, Ye = da.hasOwnProperty, wm = 0, Dl = (function() {
          var t = /[^.]+$/.exec(Sr && Sr.keys && Sr.keys.IE_PROTO || "");
          return t ? "Symbol(src)_1." + t : "";
        })(), br = da.toString, vm = Ia.call(fe), Mm = st._, Lm = Ps("^" + Ia.call(Ye).replace(Aa, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), Fr = Pe ? A.Buffer : i, ln = A.Symbol, xr = A.Uint8Array, Yl = Fr ? Fr.allocUnsafe : i, Nr = ja(fe.getPrototypeOf, fe), Cl = fe.create, Sl = da.propertyIsEnumerable, Yn = qa.splice, bl = ln ? ln.isConcatSpreadable : i, Ra = ln ? ln.iterator : i, Cn = ln ? ln.toStringTag : i, Ar = (function() {
          try {
            var t = Mt(fe, "defineProperty");
            return t({}, "", {}), t;
          } catch {
          }
        })(), km = A.clearTimeout !== st.clearTimeout && A.clearTimeout, Tm = G && G.now !== st.Date.now && G.now, Dm = A.setTimeout !== st.setTimeout && A.setTimeout, Er = Xe.ceil, Oa = Xe.floor, Hr = fe.getOwnPropertySymbols, Fl = Fr ? Fr.isBuffer : i, Ua = A.isFinite, ua = qa.join, Pr = ja(fe.keys, fe), Ve = Xe.max, Be = Xe.min, xl = G.now, Nl = A.parseInt, Al = Xe.random, Ym = qa.reverse, bi = Mt(A, "DataView"), za = Mt(A, "Map"), Fi = Mt(A, "Promise"), ma = Mt(A, "Set"), Ba = Mt(A, "WeakMap"), Wa = Mt(fe, "create"), jr = Ba && new Ba(), ca = {}, Cm = En(bi), Sm = En(za), bm = En(Fi), Fm = En(ma), xm = En(Ba), qr = ln ? ln.prototype : i, $a = qr ? qr.valueOf : i, El = qr ? qr.toString : i;
        function y(t) {
          if (Ke(t) && !de(t) && !(t instanceof me)) {
            if (t instanceof Wt) return t;
            if (Ye.call(t, "__wrapped__")) return mo(t);
          }
          return new Wt(t);
        }
        var ga = /* @__PURE__ */ (function() {
          function t() {
          }
          return function(a) {
            if (!$e(a)) return {};
            if (Cl) return Cl(a);
            t.prototype = a;
            var o = new t();
            return t.prototype = i, o;
          };
        })();
        function Ir() {
        }
        function Wt(t, a) {
          this.__wrapped__ = t, this.__actions__ = [], this.__chain__ = !!a, this.__index__ = 0, this.__values__ = i;
        }
        y.templateSettings = { escape: $, evaluate: bu, interpolate: Oo, variable: "", imports: { _: y } }, y.prototype = Ir.prototype, y.prototype.constructor = y, Wt.prototype = ga(Ir.prototype), Wt.prototype.constructor = Wt;
        function me(t) {
          this.__wrapped__ = t, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = false, this.__iteratees__ = [], this.__takeCount__ = Ut, this.__views__ = [];
        }
        function Nm() {
          var t = new me(this.__wrapped__);
          return t.__actions__ = ct(this.__actions__), t.__dir__ = this.__dir__, t.__filtered__ = this.__filtered__, t.__iteratees__ = ct(this.__iteratees__), t.__takeCount__ = this.__takeCount__, t.__views__ = ct(this.__views__), t;
        }
        function Am() {
          if (this.__filtered__) {
            var t = new me(this);
            t.__dir__ = -1, t.__filtered__ = true;
          } else t = this.clone(), t.__dir__ *= -1;
          return t;
        }
        function Em() {
          var t = this.__wrapped__.value(), a = this.__dir__, o = de(t), c = a < 0, _ = o ? t.length : 0, w = os(0, _, this.__views__), L = w.start, T = w.end, C = T - L, H = c ? T : L - 1, P = this.__iteratees__, I = P.length, z = 0, K = Be(C, this.__takeCount__);
          if (!o || !c && _ == C && K == C) return Wi(t, this.__actions__);
          var ne = [];
          e: for (; C-- && z < K; ) {
            H += a;
            for (var ce = -1, ae = t[H]; ++ce < I; ) {
              var we = P[ce], Me = we.iteratee, ds = we.type, jt = Me(ae);
              if (ds == Zs) ae = jt;
              else if (!jt) {
                if (ds == zn) continue e;
                break e;
              }
            }
            ne[z++] = ae;
          }
          return ne;
        }
        me.prototype = ga(Ir.prototype), me.prototype.constructor = me;
        function js(t) {
          var a = -1, o = t == null ? 0 : t.length;
          for (this.clear(); ++a < o; ) {
            var c = t[a];
            this.set(c[0], c[1]);
          }
        }
        function Rr() {
          this.__data__ = Wa ? Wa(null) : {}, this.size = 0;
        }
        function Hm(t) {
          var a = this.has(t) && delete this.__data__[t];
          return this.size -= a ? 1 : 0, a;
        }
        function Pm(t) {
          var a = this.__data__;
          if (Wa) {
            var o = a[t];
            return o === M ? i : o;
          }
          return Ye.call(a, t) ? a[t] : i;
        }
        function jm(t) {
          var a = this.__data__;
          return Wa ? a[t] !== i : Ye.call(a, t);
        }
        function qm(t, a) {
          var o = this.__data__;
          return this.size += this.has(t) ? 0 : 1, o[t] = Wa && a === i ? M : a, this;
        }
        js.prototype.clear = Rr, js.prototype.delete = Hm, js.prototype.get = Pm, js.prototype.has = jm, js.prototype.set = qm;
        function qs(t) {
          var a = -1, o = t == null ? 0 : t.length;
          for (this.clear(); ++a < o; ) {
            var c = t[a];
            this.set(c[0], c[1]);
          }
        }
        function Im() {
          this.__data__ = [], this.size = 0;
        }
        function Hl(t) {
          var a = this.__data__, o = $t(a, t);
          if (o < 0) return false;
          var c = a.length - 1;
          return o == c ? a.pop() : Yn.call(a, o, 1), --this.size, true;
        }
        function Rm(t) {
          var a = this.__data__, o = $t(a, t);
          return o < 0 ? i : a[o][1];
        }
        function Om(t) {
          return $t(this.__data__, t) > -1;
        }
        function Pl(t, a) {
          var o = this.__data__, c = $t(o, t);
          return c < 0 ? (++this.size, o.push([t, a])) : o[c][1] = a, this;
        }
        qs.prototype.clear = Im, qs.prototype.delete = Hl, qs.prototype.get = Rm, qs.prototype.has = Om, qs.prototype.set = Pl;
        function Is(t) {
          var a = -1, o = t == null ? 0 : t.length;
          for (this.clear(); ++a < o; ) {
            var c = t[a];
            this.set(c[0], c[1]);
          }
        }
        function Um() {
          this.size = 0, this.__data__ = { hash: new js(), map: new (za || qs)(), string: new js() };
        }
        function zm(t) {
          var a = Xa(this, t).delete(t);
          return this.size -= a ? 1 : 0, a;
        }
        function dn(t) {
          return Xa(this, t).get(t);
        }
        function jl(t) {
          return Xa(this, t).has(t);
        }
        function Bm(t, a) {
          var o = Xa(this, t), c = o.size;
          return o.set(t, a), this.size += o.size == c ? 0 : 1, this;
        }
        Is.prototype.clear = Um, Is.prototype.delete = zm, Is.prototype.get = dn, Is.prototype.has = jl, Is.prototype.set = Bm;
        function Sn(t) {
          var a = -1, o = t == null ? 0 : t.length;
          for (this.__data__ = new Is(); ++a < o; ) this.add(t[a]);
        }
        function Wm(t) {
          return this.__data__.set(t, M), this;
        }
        function O(t) {
          return this.__data__.has(t);
        }
        Sn.prototype.add = Sn.prototype.push = Wm, Sn.prototype.has = O;
        function as(t) {
          var a = this.__data__ = new qs(t);
          this.size = a.size;
        }
        function $m() {
          this.__data__ = new qs(), this.size = 0;
        }
        function ql(t) {
          var a = this.__data__, o = a.delete(t);
          return this.size = a.size, o;
        }
        function Le(t) {
          return this.__data__.get(t);
        }
        function Or(t) {
          return this.__data__.has(t);
        }
        function Il(t, a) {
          var o = this.__data__;
          if (o instanceof qs) {
            var c = o.__data__;
            if (!za || c.length < m - 1) return c.push([t, a]), this.size = ++o.size, this;
            o = this.__data__ = new Is(c);
          }
          return o.set(t, a), this.size = o.size, this;
        }
        as.prototype.clear = $m, as.prototype.delete = ql, as.prototype.get = Le, as.prototype.has = Or, as.prototype.set = Il;
        function Ur(t, a) {
          var o = de(t), c = !o && er(t), _ = !o && !c && Da(t), w = !o && !c && !_ && ai(t), L = o || c || _ || w, T = L ? Yi(t.length, kl) : [], C = T.length;
          for (var H in t) (a || Ye.call(t, H)) && !(L && (H == "length" || _ && (H == "offset" || H == "parent") || w && (H == "buffer" || H == "byteLength" || H == "byteOffset") || Ws(H, C))) && T.push(H);
          return T;
        }
        function Rl(t) {
          var a = t.length;
          return a ? t[Jr(0, a - 1)] : i;
        }
        function Gm(t, a) {
          return ft(ct(t), bn(a, 0, t.length));
        }
        function Jm(t) {
          return ft(ct(t));
        }
        function xi(t, a, o) {
          (o !== i && !Gs(t[a], o) || o === i && !(a in t)) && Rs(t, a, o);
        }
        function Ga(t, a, o) {
          var c = t[a];
          (!(Ye.call(t, a) && Gs(c, o)) || o === i && !(a in t)) && Rs(t, a, o);
        }
        function $t(t, a) {
          for (var o = t.length; o--; ) if (Gs(t[o][0], a)) return o;
          return -1;
        }
        function Vm(t, a, o, c) {
          return un(t, function(_, w, L) {
            a(c, _, o(_), L);
          }), c;
        }
        function Ni(t, a) {
          return t && Ls(a, lt(a), t);
        }
        function Km(t, a) {
          return t && Ls(a, Kt(a), t);
        }
        function Rs(t, a, o) {
          a == "__proto__" && Ar ? Ar(t, a, { configurable: true, enumerable: true, value: o, writable: true }) : t[a] = o;
        }
        function zr(t, a) {
          for (var o = -1, c = a.length, _ = F(c), w = t == null; ++o < c; ) _[o] = w ? i : zc(t, a[o]);
          return _;
        }
        function bn(t, a, o) {
          return t === t && (o !== i && (t = t <= o ? t : o), a !== i && (t = t >= a ? t : a)), t;
        }
        function bt(t, a, o, c, _, w) {
          var L, T = a & S, C = a & E, H = a & N;
          if (o && (L = _ ? o(t, c, _, w) : o(t)), L !== i) return L;
          if (!$e(t)) return t;
          var P = de(t);
          if (P) {
            if (L = vc(t), !T) return ct(t, L);
          } else {
            var I = We(t), z = I == cr || I == Io;
            if (Da(t)) return Ms(t, T);
            if (I == xs || I == V || z && !_) {
              if (L = C || z ? {} : yd(t), !T) return C ? od(t, Km(L, t)) : Zi(t, Ni(L, t));
            } else {
              if (!Ae[I]) return _ ? t : {};
              L = Mc(t, I, T);
            }
          }
          w || (w = new as());
          var K = w.get(t);
          if (K) return K;
          w.set(t, L), h_(t) ? t.forEach(function(ae) {
            L.add(bt(ae, a, o, ae, t, w));
          }) : c_(t) && t.forEach(function(ae, we) {
            L.set(we, bt(ae, a, o, we, t, w));
          });
          var ne = H ? C ? vt : wt : C ? Kt : lt, ce = P ? i : ne(t);
          return Je(ce || t, function(ae, we) {
            ce && (we = ae, ae = t[we]), Ga(L, we, bt(ae, a, o, we, t, w));
          }), L;
        }
        function Ai(t) {
          var a = lt(t);
          return function(o) {
            return Ol(o, t, a);
          };
        }
        function Ol(t, a, o) {
          var c = o.length;
          if (t == null) return !c;
          for (t = fe(t); c--; ) {
            var _ = o[c], w = a[_], L = t[_];
            if (L === i && !(_ in t) || !w(L)) return false;
          }
          return true;
        }
        function _s(t, a, o) {
          if (typeof t != "function") throw new Bt(h);
          return Tt(function() {
            t.apply(i, o);
          }, a);
        }
        function ha(t, a, o, c) {
          var _ = -1, w = Dr, L = true, T = t.length, C = [], H = a.length;
          if (!T) return C;
          o && (a = Ne(a, _t(o))), c ? (w = vi, L = false) : a.length >= m && (w = ia, L = false, a = new Sn(a));
          e: for (; ++_ < T; ) {
            var P = t[_], I = o == null ? P : o(P);
            if (P = c || P !== 0 ? P : 0, L && I === I) {
              for (var z = H; z--; ) if (a[z] === I) continue e;
              C.push(P);
            } else w(a, I, c) || C.push(P);
          }
          return C;
        }
        var un = Qr(ps), Ul = Qr(Hi, true);
        function Zm(t, a) {
          var o = true;
          return un(t, function(c, _, w) {
            return o = !!a(c, _, w), o;
          }), o;
        }
        function Br(t, a, o) {
          for (var c = -1, _ = t.length; ++c < _; ) {
            var w = t[c], L = a(w);
            if (L != null && (T === i ? L === L && !ls(L) : o(L, T))) var T = L, C = w;
          }
          return C;
        }
        function Qm(t, a, o, c) {
          var _ = t.length;
          for (o = ue(o), o < 0 && (o = -o > _ ? 0 : _ + o), c = c === i || c > _ ? _ : ue(c), c < 0 && (c += _), c = o > c ? 0 : __(c); o < c; ) t[o++] = a;
          return t;
        }
        function zl(t, a) {
          var o = [];
          return un(t, function(c, _, w) {
            a(c, _, w) && o.push(c);
          }), o;
        }
        function nt(t, a, o, c, _) {
          var w = -1, L = t.length;
          for (o || (o = Lc), _ || (_ = []); ++w < L; ) {
            var T = t[w];
            a > 0 && o(T) ? a > 1 ? nt(T, a - 1, o, c, _) : hs(_, T) : c || (_[_.length] = T);
          }
          return _;
        }
        var Ei = Qi(), Bl = Qi(true);
        function ps(t, a) {
          return t && Ei(t, a, lt);
        }
        function Hi(t, a) {
          return t && Bl(t, a, lt);
        }
        function ys(t, a) {
          return rn(a, function(o) {
            return qn(t[o]);
          });
        }
        function Fn(t, a) {
          a = vs(a, t);
          for (var o = 0, c = a.length; t != null && o < c; ) t = t[Ts(a[o++])];
          return o && o == c ? t : i;
        }
        function Wl(t, a, o) {
          var c = a(t);
          return de(t) ? c : hs(c, o(t));
        }
        function mt(t) {
          return t == null ? t === i ? Yu : Tu : Cn && Cn in fe(t) ? wc(t) : va(t);
        }
        function Pi(t, a) {
          return t > a;
        }
        function Xm(t, a) {
          return t != null && Ye.call(t, a);
        }
        function ec(t, a) {
          return t != null && a in fe(t);
        }
        function tc(t, a, o) {
          return t >= Be(a, o) && t < Ve(a, o);
        }
        function ji(t, a, o) {
          for (var c = o ? vi : Dr, _ = t[0].length, w = t.length, L = w, T = F(w), C = 1 / 0, H = []; L--; ) {
            var P = t[L];
            L && a && (P = Ne(P, _t(a))), C = Be(P.length, C), T[L] = !o && (a || _ >= 120 && P.length >= 120) ? new Sn(L && P) : i;
          }
          P = t[0];
          var I = -1, z = T[0];
          e: for (; ++I < _ && H.length < C; ) {
            var K = P[I], ne = a ? a(K) : K;
            if (K = o || K !== 0 ? K : 0, !(z ? ia(z, ne) : c(H, ne, o))) {
              for (L = w; --L; ) {
                var ce = T[L];
                if (!(ce ? ia(ce, ne) : c(t[L], ne, o))) continue e;
              }
              z && z.push(ne), H.push(K);
            }
          }
          return H;
        }
        function Os(t, a, o, c) {
          return ps(t, function(_, w, L) {
            a(c, o(_), w, L);
          }), c;
        }
        function ws(t, a, o) {
          a = vs(a, t), t = uo(t, a);
          var c = t == null ? t : t[Ts(Ie(a))];
          return c == null ? i : ut(c, t, o);
        }
        function $l(t) {
          return Ke(t) && mt(t) == V;
        }
        function sc(t) {
          return Ke(t) && mt(t) == Jn;
        }
        function nc(t) {
          return Ke(t) && mt(t) == Wn;
        }
        function Ja(t, a, o, c, _) {
          return t === a ? true : t == null || a == null || !Ke(t) && !Ke(a) ? t !== t && a !== a : ac(t, a, o, c, Ja, _);
        }
        function ac(t, a, o, c, _, w) {
          var L = de(t), T = de(a), C = L ? ur : We(t), H = T ? ur : We(a);
          C = C == V ? xs : C, H = H == V ? xs : H;
          var P = C == xs, I = H == xs, z = C == H;
          if (z && Da(t)) {
            if (!Da(a)) return false;
            L = true, P = false;
          }
          if (z && !P) return w || (w = new as()), L || ai(t) ? _d(t, a, o, c, _, w) : pc(t, a, C, o, c, _, w);
          if (!(o & j)) {
            var K = P && Ye.call(t, "__wrapped__"), ne = I && Ye.call(a, "__wrapped__");
            if (K || ne) {
              var ce = K ? t.value() : t, ae = ne ? a.value() : a;
              return w || (w = new as()), _(ce, ae, o, c, w);
            }
          }
          return z ? (w || (w = new as()), yc(t, a, o, c, _, w)) : false;
        }
        function qi(t) {
          return Ke(t) && We(t) == es;
        }
        function mn(t, a, o, c) {
          var _ = o.length, w = _, L = !c;
          if (t == null) return !w;
          for (t = fe(t); _--; ) {
            var T = o[_];
            if (L && T[2] ? T[1] !== t[T[0]] : !(T[0] in t)) return false;
          }
          for (; ++_ < w; ) {
            T = o[_];
            var C = T[0], H = t[C], P = T[1];
            if (L && T[2]) {
              if (H === i && !(C in t)) return false;
            } else {
              var I = new as();
              if (c) var z = c(H, P, C, t, a, I);
              if (!(z === i ? Ja(P, H, j | R, c, I) : z)) return false;
            }
          }
          return true;
        }
        function Va(t) {
          if (!$e(t) || kc(t)) return false;
          var a = qn(t) ? Lm : Ea;
          return a.test(En(t));
        }
        function ve(t) {
          return Ke(t) && mt(t) == $n;
        }
        function Gl(t) {
          return Ke(t) && We(t) == Oe;
        }
        function rc(t) {
          return Ke(t) && qd(t.length) && !!He[mt(t)];
        }
        function Ft(t) {
          return typeof t == "function" ? t : t == null ? Zt : typeof t == "object" ? de(t) ? Ii(t[0], t[1]) : xt(t) : C_(t);
        }
        function Wr(t) {
          if (!ks(t)) return Pr(t);
          var a = [];
          for (var o in fe(t)) Ye.call(t, o) && o != "constructor" && a.push(o);
          return a;
        }
        function ic(t) {
          if (!$e(t)) return fn(t);
          var a = ks(t), o = [];
          for (var c in t) c == "constructor" && (a || !Ye.call(t, c)) || o.push(c);
          return o;
        }
        function $r(t, a) {
          return t < a;
        }
        function Jl(t, a) {
          var o = -1, c = Vt(t) ? F(t.length) : [];
          return un(t, function(_, w, L) {
            c[++o] = a(_, w, L);
          }), c;
        }
        function xt(t) {
          var a = ao(t);
          return a.length == 1 && a[0][2] ? vd(a[0][0], a[0][1]) : function(o) {
            return o === t || mn(o, t, a);
          };
        }
        function Ii(t, a) {
          return ti(t) && wd(a) ? vd(Ts(t), a) : function(o) {
            var c = zc(o, t);
            return c === i && c === a ? Bc(o, t) : Ja(a, c, j | R);
          };
        }
        function Gr(t, a, o, c, _) {
          t !== a && Ei(a, function(w, L) {
            if (_ || (_ = new as()), $e(w)) Vl(t, a, L, o, Gr, c, _);
            else {
              var T = c ? c(An(t, L), w, L + "", t, a, _) : i;
              T === i && (T = w), xi(t, L, T);
            }
          }, Kt);
        }
        function Vl(t, a, o, c, _, w, L) {
          var T = An(t, o), C = An(a, o), H = L.get(C);
          if (H) {
            xi(t, o, H);
            return;
          }
          var P = w ? w(T, C, o + "", t, a, L) : i, I = P === i;
          if (I) {
            var z = de(C), K = !z && Da(C), ne = !z && !K && ai(C);
            P = C, z || K || ne ? de(T) ? P = T : et(T) ? P = ct(T) : K ? (I = false, P = Ms(C, true)) : ne ? (I = false, P = id(C, true)) : P = [] : Mo(C) || er(C) ? (P = T, er(T) ? P = p_(T) : (!$e(T) || qn(T)) && (P = yd(C))) : I = false;
          }
          I && (L.set(C, P), _(P, C, c, w, L), L.delete(C)), xi(t, o, P);
        }
        function Kl(t, a) {
          var o = t.length;
          if (o) return a += a < 0 ? o : 0, Ws(a, o) ? t[a] : i;
        }
        function Zl(t, a, o) {
          a.length ? a = Ne(a, function(w) {
            return de(w) ? function(L) {
              return Fn(L, w.length === 1 ? w[0] : w);
            } : w;
          }) : a = [Zt];
          var c = -1;
          a = Ne(a, _t(te()));
          var _ = Jl(t, function(w, L, T) {
            var C = Ne(a, function(H) {
              return H(w);
            });
            return { criteria: C, index: ++c, value: w };
          });
          return Ti(_, function(w, L) {
            return gc(w, L, o);
          });
        }
        function oc(t, a) {
          return Ql(t, a, function(o, c) {
            return Bc(t, c);
          });
        }
        function Ql(t, a, o) {
          for (var c = -1, _ = a.length, w = {}; ++c < _; ) {
            var L = a[c], T = Fn(t, L);
            o(T, L) && Ka(w, vs(L, t), T);
          }
          return w;
        }
        function Xl(t) {
          return function(a) {
            return Fn(a, t);
          };
        }
        function Ri(t, a, o, c) {
          var _ = c ? _l : ra, w = -1, L = a.length, T = t;
          for (t === a && (a = ct(a)), o && (T = Ne(t, _t(o))); ++w < L; ) for (var C = 0, H = a[w], P = o ? o(H) : H; (C = _(T, P, C, c)) > -1; ) T !== t && Yn.call(T, C, 1), Yn.call(t, C, 1);
          return t;
        }
        function Nt(t, a) {
          for (var o = t ? a.length : 0, c = o - 1; o--; ) {
            var _ = a[o];
            if (o == c || _ !== w) {
              var w = _;
              Ws(_) ? Yn.call(t, _, 1) : Bi(t, _);
            }
          }
          return t;
        }
        function Jr(t, a) {
          return t + Oa(Al() * (a - t + 1));
        }
        function Oi(t, a, o, c) {
          for (var _ = -1, w = Ve(Er((a - t) / (o || 1)), 0), L = F(w); w--; ) L[c ? w : ++_] = t, t += o;
          return L;
        }
        function Ui(t, a) {
          var o = "";
          if (!t || a < 1 || a > Qs) return o;
          do
            a % 2 && (o += t), a = Oa(a / 2), a && (t += t);
          while (a);
          return o;
        }
        function le(t, a) {
          return Dt(lo(t, a, Zt), t + "");
        }
        function lc(t) {
          return Rl(ri(t));
        }
        function dc(t, a) {
          var o = ri(t);
          return ft(o, bn(a, 0, o.length));
        }
        function Ka(t, a, o, c) {
          if (!$e(t)) return t;
          a = vs(a, t);
          for (var _ = -1, w = a.length, L = w - 1, T = t; T != null && ++_ < w; ) {
            var C = Ts(a[_]), H = o;
            if (C === "__proto__" || C === "constructor" || C === "prototype") return t;
            if (_ != L) {
              var P = T[C];
              H = c ? c(P, C, T) : i, H === i && (H = $e(P) ? P : Ws(a[_ + 1]) ? [] : {});
            }
            Ga(T, C, H), T = T[C];
          }
          return t;
        }
        var ed = jr ? function(t, a) {
          return jr.set(t, a), t;
        } : Zt, uc = Ar ? function(t, a) {
          return Ar(t, "toString", { configurable: true, enumerable: false, value: $c(a), writable: true });
        } : Zt;
        function mc(t) {
          return ft(ri(t));
        }
        function pt(t, a, o) {
          var c = -1, _ = t.length;
          a < 0 && (a = -a > _ ? 0 : _ + a), o = o > _ ? _ : o, o < 0 && (o += _), _ = a > o ? 0 : o - a >>> 0, a >>>= 0;
          for (var w = F(_); ++c < _; ) w[c] = t[c + a];
          return w;
        }
        function cc(t, a) {
          var o;
          return un(t, function(c, _, w) {
            return o = a(c, _, w), !o;
          }), !!o;
        }
        function Za(t, a, o) {
          var c = 0, _ = t == null ? c : t.length;
          if (typeof a == "number" && a === a && _ <= mi) {
            for (; c < _; ) {
              var w = c + _ >>> 1, L = t[w];
              L !== null && !ls(L) && (o ? L <= a : L < a) ? c = w + 1 : _ = w;
            }
            return _;
          }
          return zi(t, a, Zt, o);
        }
        function zi(t, a, o, c) {
          var _ = 0, w = t == null ? 0 : t.length;
          if (w === 0) return 0;
          a = o(a);
          for (var L = a !== a, T = a === null, C = ls(a), H = a === i; _ < w; ) {
            var P = Oa((_ + w) / 2), I = o(t[P]), z = I !== i, K = I === null, ne = I === I, ce = ls(I);
            if (L) var ae = c || ne;
            else H ? ae = ne && (c || z) : T ? ae = ne && z && (c || !K) : C ? ae = ne && z && !K && (c || !ce) : K || ce ? ae = false : ae = c ? I <= a : I < a;
            ae ? _ = P + 1 : w = P;
          }
          return Be(w, dr);
        }
        function td(t, a) {
          for (var o = -1, c = t.length, _ = 0, w = []; ++o < c; ) {
            var L = t[o], T = a ? a(L) : L;
            if (!o || !Gs(T, C)) {
              var C = T;
              w[_++] = L === 0 ? 0 : L;
            }
          }
          return w;
        }
        function Vr(t) {
          return typeof t == "number" ? t : ls(t) ? Yt : +t;
        }
        function yt(t) {
          if (typeof t == "string") return t;
          if (de(t)) return Ne(t, yt) + "";
          if (ls(t)) return El ? El.call(t) : "";
          var a = t + "";
          return a == "0" && 1 / t == -Fs ? "-0" : a;
        }
        function cn(t, a, o) {
          var c = -1, _ = Dr, w = t.length, L = true, T = [], C = T;
          if (o) L = false, _ = vi;
          else if (w >= m) {
            var H = a ? null : fc(t);
            if (H) return oa(H);
            L = false, _ = ia, C = new Sn();
          } else C = a ? [] : T;
          e: for (; ++c < w; ) {
            var P = t[c], I = a ? a(P) : P;
            if (P = o || P !== 0 ? P : 0, L && I === I) {
              for (var z = C.length; z--; ) if (C[z] === I) continue e;
              a && C.push(I), T.push(P);
            } else _(C, I, o) || (C !== T && C.push(I), T.push(P));
          }
          return T;
        }
        function Bi(t, a) {
          return a = vs(a, t), t = uo(t, a), t == null || delete t[Ts(Ie(a))];
        }
        function sd(t, a, o, c) {
          return Ka(t, a, o(Fn(t, a)), c);
        }
        function Kr(t, a, o, c) {
          for (var _ = t.length, w = c ? _ : -1; (c ? w-- : ++w < _) && a(t[w], w, t); ) ;
          return o ? pt(t, c ? 0 : w, c ? w + 1 : _) : pt(t, c ? w + 1 : 0, c ? _ : w);
        }
        function Wi(t, a) {
          var o = t;
          return o instanceof me && (o = o.value()), Mi(a, function(c, _) {
            return _.func.apply(_.thisArg, hs([c], _.args));
          }, o);
        }
        function $i(t, a, o) {
          var c = t.length;
          if (c < 2) return c ? cn(t[0]) : [];
          for (var _ = -1, w = F(c); ++_ < c; ) for (var L = t[_], T = -1; ++T < c; ) T != _ && (w[_] = ha(w[_] || L, t[T], a, o));
          return cn(nt(w, 1), a, o);
        }
        function gn(t, a, o) {
          for (var c = -1, _ = t.length, w = a.length, L = {}; ++c < _; ) {
            var T = c < w ? a[c] : i;
            o(L, t[c], T);
          }
          return L;
        }
        function Gi(t) {
          return et(t) ? t : [];
        }
        function Ji(t) {
          return typeof t == "function" ? t : Zt;
        }
        function vs(t, a) {
          return de(t) ? t : ti(t, a) ? [t] : Dd(be(t));
        }
        var nd = le;
        function At(t, a, o) {
          var c = t.length;
          return o = o === i ? c : o, !a && o >= c ? t : pt(t, a, o);
        }
        var Et = km || function(t) {
          return st.clearTimeout(t);
        };
        function Ms(t, a) {
          if (a) return t.slice();
          var o = t.length, c = Yl ? Yl(o) : new t.constructor(o);
          return t.copy(c), c;
        }
        function rs(t) {
          var a = new t.constructor(t.byteLength);
          return new xr(a).set(new xr(t)), a;
        }
        function Us(t, a) {
          var o = a ? rs(t.buffer) : t.buffer;
          return new t.constructor(o, t.byteOffset, t.byteLength);
        }
        function ad(t) {
          var a = new t.constructor(t.source, sn.exec(t));
          return a.lastIndex = t.lastIndex, a;
        }
        function rd(t) {
          return $a ? fe($a.call(t)) : {};
        }
        function id(t, a) {
          var o = a ? rs(t.buffer) : t.buffer;
          return new t.constructor(o, t.byteOffset, t.length);
        }
        function Vi(t, a) {
          if (t !== a) {
            var o = t !== i, c = t === null, _ = t === t, w = ls(t), L = a !== i, T = a === null, C = a === a, H = ls(a);
            if (!T && !H && !w && t > a || w && L && C && !T && !H || c && L && C || !o && C || !_) return 1;
            if (!c && !w && !H && t < a || H && o && _ && !c && !w || T && o && _ || !L && _ || !C) return -1;
          }
          return 0;
        }
        function gc(t, a, o) {
          for (var c = -1, _ = t.criteria, w = a.criteria, L = _.length, T = o.length; ++c < L; ) {
            var C = Vi(_[c], w[c]);
            if (C) {
              if (c >= T) return C;
              var H = o[c];
              return C * (H == "desc" ? -1 : 1);
            }
          }
          return t.index - a.index;
        }
        function Zr(t, a, o, c) {
          for (var _ = -1, w = t.length, L = o.length, T = -1, C = a.length, H = Ve(w - L, 0), P = F(C + H), I = !c; ++T < C; ) P[T] = a[T];
          for (; ++_ < L; ) (I || _ < w) && (P[o[_]] = t[_]);
          for (; H--; ) P[T++] = t[_++];
          return P;
        }
        function Ki(t, a, o, c) {
          for (var _ = -1, w = t.length, L = -1, T = o.length, C = -1, H = a.length, P = Ve(w - T, 0), I = F(P + H), z = !c; ++_ < P; ) I[_] = t[_];
          for (var K = _; ++C < H; ) I[K + C] = a[C];
          for (; ++L < T; ) (z || _ < w) && (I[K + o[L]] = t[_++]);
          return I;
        }
        function ct(t, a) {
          var o = -1, c = t.length;
          for (a || (a = F(c)); ++o < c; ) a[o] = t[o];
          return a;
        }
        function Ls(t, a, o, c) {
          var _ = !o;
          o || (o = {});
          for (var w = -1, L = a.length; ++w < L; ) {
            var T = a[w], C = c ? c(o[T], t[T], T, o, t) : i;
            C === i && (C = t[T]), _ ? Rs(o, T, C) : Ga(o, T, C);
          }
          return o;
        }
        function Zi(t, a) {
          return Ls(t, Lt(t), a);
        }
        function od(t, a) {
          return Ls(t, ro(t), a);
        }
        function Qa(t, a) {
          return function(o, c) {
            var _ = de(o) ? em : Vm, w = a ? a() : {};
            return _(o, t, te(c, 2), w);
          };
        }
        function fa(t) {
          return le(function(a, o) {
            var c = -1, _ = o.length, w = _ > 1 ? o[_ - 1] : i, L = _ > 2 ? o[2] : i;
            for (w = t.length > 3 && typeof w == "function" ? (_--, w) : i, L && ht(o[0], o[1], L) && (w = _ < 3 ? i : w, _ = 1), a = fe(a); ++c < _; ) {
              var T = o[c];
              T && t(a, T, c, w);
            }
            return a;
          });
        }
        function Qr(t, a) {
          return function(o, c) {
            if (o == null) return o;
            if (!Vt(o)) return t(o, c);
            for (var _ = o.length, w = a ? _ : -1, L = fe(o); (a ? w-- : ++w < _) && c(L[w], w, L) !== false; ) ;
            return o;
          };
        }
        function Qi(t) {
          return function(a, o, c) {
            for (var _ = -1, w = fe(a), L = c(a), T = L.length; T--; ) {
              var C = L[t ? T : ++_];
              if (o(w[C], C, w) === false) break;
            }
            return a;
          };
        }
        function ld(t, a, o) {
          var c = a & x, _ = _a(t);
          function w() {
            var L = this && this !== st && this instanceof w ? _ : t;
            return L.apply(c ? o : this, arguments);
          }
          return w;
        }
        function dd(t) {
          return function(a) {
            a = be(a);
            var o = fs(a) ? St(a) : i, c = o ? o[0] : a.charAt(0), _ = o ? At(o, 1).join("") : a.slice(1);
            return c[t]() + _;
          };
        }
        function hn(t) {
          return function(a) {
            return Mi(D_(T_(a).replace(Bu, "")), t, "");
          };
        }
        function _a(t) {
          return function() {
            var a = arguments;
            switch (a.length) {
              case 0:
                return new t();
              case 1:
                return new t(a[0]);
              case 2:
                return new t(a[0], a[1]);
              case 3:
                return new t(a[0], a[1], a[2]);
              case 4:
                return new t(a[0], a[1], a[2], a[3]);
              case 5:
                return new t(a[0], a[1], a[2], a[3], a[4]);
              case 6:
                return new t(a[0], a[1], a[2], a[3], a[4], a[5]);
              case 7:
                return new t(a[0], a[1], a[2], a[3], a[4], a[5], a[6]);
            }
            var o = ga(t.prototype), c = t.apply(o, a);
            return $e(c) ? c : o;
          };
        }
        function is(t, a, o) {
          var c = _a(t);
          function _() {
            for (var w = arguments.length, L = F(w), T = w, C = ya(_); T--; ) L[T] = arguments[T];
            var H = w < 3 && L[0] !== C && L[w - 1] !== C ? [] : ns(L, C);
            if (w -= H.length, w < o) return to(t, a, xn, _.placeholder, i, L, H, i, i, o - w);
            var P = this && this !== st && this instanceof _ ? c : t;
            return ut(P, this, L);
          }
          return _;
        }
        function ud(t) {
          return function(a, o, c) {
            var _ = fe(a);
            if (!Vt(a)) {
              var w = te(o, 3);
              a = lt(a), o = function(T) {
                return w(_[T], T, _);
              };
            }
            var L = t(a, o, c);
            return L > -1 ? _[w ? a[L] : L] : i;
          };
        }
        function md(t) {
          return Bs(function(a) {
            var o = a.length, c = o, _ = Wt.prototype.thru;
            for (t && a.reverse(); c--; ) {
              var w = a[c];
              if (typeof w != "function") throw new Bt(h);
              if (_ && !L && ei(w) == "wrapper") var L = new Wt([], true);
            }
            for (c = L ? c : o; ++c < o; ) {
              w = a[c];
              var T = ei(w), C = T == "wrapper" ? no(w) : i;
              C && Nn(C[0]) && C[1] == (J | se | ge | he) && !C[4].length && C[9] == 1 ? L = L[ei(C[0])].apply(L, C[3]) : L = w.length == 1 && Nn(w) ? L[T]() : L.thru(w);
            }
            return function() {
              var H = arguments, P = H[0];
              if (L && H.length == 1 && de(P)) return L.plant(P).value();
              for (var I = 0, z = o ? a[I].apply(this, H) : P; ++I < o; ) z = a[I].call(this, z);
              return z;
            };
          });
        }
        function xn(t, a, o, c, _, w, L, T, C, H) {
          var P = a & J, I = a & x, z = a & X, K = a & (se | Q), ne = a & je, ce = z ? i : _a(t);
          function ae() {
            for (var we = arguments.length, Me = F(we), ds = we; ds--; ) Me[ds] = arguments[ds];
            if (K) var jt = ya(ae), us = im(Me, jt);
            if (c && (Me = Zr(Me, c, _, K)), w && (Me = Ki(Me, w, L, K)), we -= us, K && we < H) {
              var tt = ns(Me, jt);
              return to(t, a, xn, ae.placeholder, o, Me, tt, T, C, H - we);
            }
            var Js = I ? o : this, Rn = z ? Js[t] : t;
            return we = Me.length, T ? Me = Ma(Me, T) : ne && we > 1 && Me.reverse(), P && C < we && (Me.length = C), this && this !== st && this instanceof ae && (Rn = ce || _a(Rn)), Rn.apply(Js, Me);
          }
          return ae;
        }
        function cd(t, a) {
          return function(o, c) {
            return Os(o, t, a(c), {});
          };
        }
        function gt(t, a) {
          return function(o, c) {
            var _;
            if (o === i && c === i) return a;
            if (o !== i && (_ = o), c !== i) {
              if (_ === i) return c;
              typeof o == "string" || typeof c == "string" ? (o = yt(o), c = yt(c)) : (o = Vr(o), c = Vr(c)), _ = t(o, c);
            }
            return _;
          };
        }
        function Xi(t) {
          return Bs(function(a) {
            return a = Ne(a, _t(te())), le(function(o) {
              var c = this;
              return t(a, function(_) {
                return ut(_, c, o);
              });
            });
          });
        }
        function Xr(t, a) {
          a = a === i ? " " : yt(a);
          var o = a.length;
          if (o < 2) return o ? Ui(a, t) : a;
          var c = Ui(a, Er(t / on(a)));
          return fs(a) ? At(St(c), 0, t).join("") : c.slice(0, t);
        }
        function hc(t, a, o, c) {
          var _ = a & x, w = _a(t);
          function L() {
            for (var T = -1, C = arguments.length, H = -1, P = c.length, I = F(P + C), z = this && this !== st && this instanceof L ? w : t; ++H < P; ) I[H] = c[H];
            for (; C--; ) I[H++] = arguments[++T];
            return ut(z, _ ? o : this, I);
          }
          return L;
        }
        function eo(t) {
          return function(a, o, c) {
            return c && typeof c != "number" && ht(a, o, c) && (o = c = i), a = In(a), o === i ? (o = a, a = 0) : o = In(o), c = c === i ? a < o ? 1 : -1 : In(c), Oi(a, o, c, t);
          };
        }
        function pa(t) {
          return function(a, o) {
            return typeof a == "string" && typeof o == "string" || (a = Ys(a), o = Ys(o)), t(a, o);
          };
        }
        function to(t, a, o, c, _, w, L, T, C, H) {
          var P = a & se, I = P ? L : i, z = P ? i : L, K = P ? w : i, ne = P ? i : w;
          a |= P ? ge : B, a &= ~(P ? B : ge), a & ee || (a &= -4);
          var ce = [t, a, _, K, I, ne, z, T, C, H], ae = o.apply(i, ce);
          return Nn(t) && Ld(ae, ce), ae.placeholder = c, kd(ae, t, a);
        }
        function so(t) {
          var a = Xe[t];
          return function(o, c) {
            if (o = Ys(o), c = c == null ? 0 : Be(ue(c), 292), c && Ua(o)) {
              var _ = (be(o) + "e").split("e"), w = a(_[0] + "e" + (+_[1] + c));
              return _ = (be(w) + "e").split("e"), +(_[0] + "e" + (+_[1] - c));
            }
            return a(o);
          };
        }
        var fc = ma && 1 / oa(new ma([, -0]))[1] == Fs ? function(t) {
          return new ma(t);
        } : Vc;
        function gd(t) {
          return function(a) {
            var o = We(a);
            return o == es ? Si(a) : o == Oe ? cm(a) : rm(a, t(a));
          };
        }
        function zs(t, a, o, c, _, w, L, T) {
          var C = a & X;
          if (!C && typeof t != "function") throw new Bt(h);
          var H = c ? c.length : 0;
          if (H || (a &= -97, c = _ = i), L = L === i ? L : Ve(ue(L), 0), T = T === i ? T : ue(T), H -= _ ? _.length : 0, a & B) {
            var P = c, I = _;
            c = _ = i;
          }
          var z = C ? i : no(t), K = [t, a, o, c, _, P, I, w, L, T];
          if (z && Md(K, z), t = K[0], a = K[1], o = K[2], c = K[3], _ = K[4], T = K[9] = K[9] === i ? C ? 0 : t.length : Ve(K[9] - H, 0), !T && a & (se | Q) && (a &= -25), !a || a == x) var ne = ld(t, a, o);
          else a == se || a == Q ? ne = is(t, a, T) : (a == ge || a == (x | ge)) && !_.length ? ne = hc(t, a, o, c) : ne = xn.apply(i, K);
          var ce = z ? ed : Ld;
          return kd(ce(ne, K), t, a);
        }
        function hd(t, a, o, c) {
          return t === i || Gs(t, da[o]) && !Ye.call(c, o) ? a : t;
        }
        function fd(t, a, o, c, _, w) {
          return $e(t) && $e(a) && (w.set(a, t), Gr(t, a, i, fd, w), w.delete(a)), t;
        }
        function _c(t) {
          return Mo(t) ? i : t;
        }
        function _d(t, a, o, c, _, w) {
          var L = o & j, T = t.length, C = a.length;
          if (T != C && !(L && C > T)) return false;
          var H = w.get(t), P = w.get(a);
          if (H && P) return H == a && P == t;
          var I = -1, z = true, K = o & R ? new Sn() : i;
          for (w.set(t, a), w.set(a, t); ++I < T; ) {
            var ne = t[I], ce = a[I];
            if (c) var ae = L ? c(ce, ne, I, a, t, w) : c(ne, ce, I, t, a, w);
            if (ae !== i) {
              if (ae) continue;
              z = false;
              break;
            }
            if (K) {
              if (!Li(a, function(we, Me) {
                if (!ia(K, Me) && (ne === we || _(ne, we, o, c, w))) return K.push(Me);
              })) {
                z = false;
                break;
              }
            } else if (!(ne === ce || _(ne, ce, o, c, w))) {
              z = false;
              break;
            }
          }
          return w.delete(t), w.delete(a), z;
        }
        function pc(t, a, o, c, _, w, L) {
          switch (o) {
            case en:
              if (t.byteLength != a.byteLength || t.byteOffset != a.byteOffset) return false;
              t = t.buffer, a = a.buffer;
            case Jn:
              return !(t.byteLength != a.byteLength || !w(new xr(t), new xr(a)));
            case Xs:
            case Wn:
            case xa:
              return Gs(+t, +a);
            case mr:
              return t.name == a.name && t.message == a.message;
            case $n:
            case Mn:
              return t == a + "";
            case es:
              var T = Si;
            case Oe:
              var C = c & j;
              if (T || (T = oa), t.size != a.size && !C) return false;
              var H = L.get(t);
              if (H) return H == a;
              c |= R, L.set(t, a);
              var P = _d(T(t), T(a), c, _, w, L);
              return L.delete(t), P;
            case gr:
              if ($a) return $a.call(t) == $a.call(a);
          }
          return false;
        }
        function yc(t, a, o, c, _, w) {
          var L = o & j, T = wt(t), C = T.length, H = wt(a), P = H.length;
          if (C != P && !L) return false;
          for (var I = C; I--; ) {
            var z = T[I];
            if (!(L ? z in a : Ye.call(a, z))) return false;
          }
          var K = w.get(t), ne = w.get(a);
          if (K && ne) return K == a && ne == t;
          var ce = true;
          w.set(t, a), w.set(a, t);
          for (var ae = L; ++I < C; ) {
            z = T[I];
            var we = t[z], Me = a[z];
            if (c) var ds = L ? c(Me, we, z, a, t, w) : c(we, Me, z, t, a, w);
            if (!(ds === i ? we === Me || _(we, Me, o, c, w) : ds)) {
              ce = false;
              break;
            }
            ae || (ae = z == "constructor");
          }
          if (ce && !ae) {
            var jt = t.constructor, us = a.constructor;
            jt != us && "constructor" in t && "constructor" in a && !(typeof jt == "function" && jt instanceof jt && typeof us == "function" && us instanceof us) && (ce = false);
          }
          return w.delete(t), w.delete(a), ce;
        }
        function Bs(t) {
          return Dt(lo(t, i, $s), t + "");
        }
        function wt(t) {
          return Wl(t, lt, Lt);
        }
        function vt(t) {
          return Wl(t, Kt, ro);
        }
        var no = jr ? function(t) {
          return jr.get(t);
        } : Vc;
        function ei(t) {
          for (var a = t.name + "", o = ca[a], c = Ye.call(ca, a) ? o.length : 0; c--; ) {
            var _ = o[c], w = _.func;
            if (w == null || w == t) return _.name;
          }
          return a;
        }
        function ya(t) {
          var a = Ye.call(y, "placeholder") ? y : t;
          return a.placeholder;
        }
        function te() {
          var t = y.iteratee || Gc;
          return t = t === Gc ? Ft : t, arguments.length ? t(arguments[0], arguments[1]) : t;
        }
        function Xa(t, a) {
          var o = t.__data__;
          return oo(a) ? o[typeof a == "string" ? "string" : "hash"] : o.map;
        }
        function ao(t) {
          for (var a = lt(t), o = a.length; o--; ) {
            var c = a[o], _ = t[c];
            a[o] = [c, _, wd(_)];
          }
          return a;
        }
        function Mt(t, a) {
          var o = dm(t, a);
          return Va(o) ? o : i;
        }
        function wc(t) {
          var a = Ye.call(t, Cn), o = t[Cn];
          try {
            t[Cn] = i;
            var c = true;
          } catch {
          }
          var _ = br.call(t);
          return c && (a ? t[Cn] = o : delete t[Cn]), _;
        }
        var Lt = Hr ? function(t) {
          return t == null ? [] : (t = fe(t), rn(Hr(t), function(a) {
            return Sl.call(t, a);
          }));
        } : Kc, ro = Hr ? function(t) {
          for (var a = []; t; ) hs(a, Lt(t)), t = Nr(t);
          return a;
        } : Kc, We = mt;
        (bi && We(new bi(new ArrayBuffer(1))) != en || za && We(new za()) != es || Fi && We(Fi.resolve()) != Ro || ma && We(new ma()) != Oe || Ba && We(new Ba()) != Gn) && (We = function(t) {
          var a = mt(t), o = a == xs ? t.constructor : i, c = o ? En(o) : "";
          if (c) switch (c) {
            case Cm:
              return en;
            case Sm:
              return es;
            case bm:
              return Ro;
            case Fm:
              return Oe;
            case xm:
              return Gn;
          }
          return a;
        });
        function os(t, a, o) {
          for (var c = -1, _ = o.length; ++c < _; ) {
            var w = o[c], L = w.size;
            switch (w.type) {
              case "drop":
                t += L;
                break;
              case "dropRight":
                a -= L;
                break;
              case "take":
                a = Be(a, t + L);
                break;
              case "takeRight":
                t = Ve(t, a - L);
                break;
            }
          }
          return { start: t, end: a };
        }
        function io(t) {
          var a = t.match(it);
          return a ? a[1].split(As) : [];
        }
        function pd(t, a, o) {
          a = vs(a, t);
          for (var c = -1, _ = a.length, w = false; ++c < _; ) {
            var L = Ts(a[c]);
            if (!(w = t != null && o(t, L))) break;
            t = t[L];
          }
          return w || ++c != _ ? w : (_ = t == null ? 0 : t.length, !!_ && qd(_) && Ws(L, _) && (de(t) || er(t)));
        }
        function vc(t) {
          var a = t.length, o = new t.constructor(a);
          return a && typeof t[0] == "string" && Ye.call(t, "index") && (o.index = t.index, o.input = t.input), o;
        }
        function yd(t) {
          return typeof t.constructor == "function" && !ks(t) ? ga(Nr(t)) : {};
        }
        function Mc(t, a, o) {
          var c = t.constructor;
          switch (a) {
            case Jn:
              return rs(t);
            case Xs:
            case Wn:
              return new c(+t);
            case en:
              return Us(t, o);
            case Vn:
            case xe:
            case hr:
            case fr:
            case Kn:
            case Na:
            case Zn:
            case tn:
            case Qn:
              return id(t, o);
            case es:
              return new c();
            case xa:
            case Mn:
              return new c(t);
            case $n:
              return ad(t);
            case Oe:
              return new c();
            case gr:
              return rd(t);
          }
        }
        function kt(t, a) {
          var o = a.length;
          if (!o) return t;
          var c = o - 1;
          return a[c] = (o > 1 ? "& " : "") + a[c], a = a.join(o > 2 ? ", " : " "), t.replace(yr, `{
/* [wrapped with ` + a + `] */
`);
        }
        function Lc(t) {
          return de(t) || er(t) || !!(bl && t && t[bl]);
        }
        function Ws(t, a) {
          var o = typeof t;
          return a = a ?? Qs, !!a && (o == "number" || o != "symbol" && Au.test(t)) && t > -1 && t % 1 == 0 && t < a;
        }
        function ht(t, a, o) {
          if (!$e(o)) return false;
          var c = typeof a;
          return (c == "number" ? Vt(o) && Ws(a, o.length) : c == "string" && a in o) ? Gs(o[a], t) : false;
        }
        function ti(t, a) {
          if (de(t)) return false;
          var o = typeof t;
          return o == "number" || o == "symbol" || o == "boolean" || t == null || ls(t) ? true : zt.test(t) || !Ns.test(t) || a != null && t in fe(a);
        }
        function oo(t) {
          var a = typeof t;
          return a == "string" || a == "number" || a == "symbol" || a == "boolean" ? t !== "__proto__" : t === null;
        }
        function Nn(t) {
          var a = ei(t), o = y[a];
          if (typeof o != "function" || !(a in me.prototype)) return false;
          if (t === o) return true;
          var c = no(o);
          return !!c && t === c[0];
        }
        function kc(t) {
          return !!Dl && Dl in t;
        }
        var Tc = Sr ? qn : Zc;
        function ks(t) {
          var a = t && t.constructor, o = typeof a == "function" && a.prototype || da;
          return t === o;
        }
        function wd(t) {
          return t === t && !$e(t);
        }
        function vd(t, a) {
          return function(o) {
            return o == null ? false : o[t] === a && (a !== i || t in fe(o));
          };
        }
        function wa(t) {
          var a = Pd(t, function(c) {
            return o.size === v && o.clear(), c;
          }), o = a.cache;
          return a;
        }
        function Md(t, a) {
          var o = t[1], c = a[1], _ = o | c, w = _ < (x | X | J), L = c == J && o == se || c == J && o == he && t[7].length <= a[8] || c == (J | he) && a[7].length <= a[8] && o == se;
          if (!(w || L)) return t;
          c & x && (t[2] = a[2], _ |= o & x ? 0 : ee);
          var T = a[3];
          if (T) {
            var C = t[3];
            t[3] = C ? Zr(C, T, a[4]) : T, t[4] = C ? ns(t[3], D) : a[4];
          }
          return T = a[5], T && (C = t[5], t[5] = C ? Ki(C, T, a[6]) : T, t[6] = C ? ns(t[5], D) : a[6]), T = a[7], T && (t[7] = T), c & J && (t[8] = t[8] == null ? a[8] : Be(t[8], a[8])), t[9] == null && (t[9] = a[9]), t[0] = a[0], t[1] = _, t;
        }
        function fn(t) {
          var a = [];
          if (t != null) for (var o in fe(t)) a.push(o);
          return a;
        }
        function va(t) {
          return br.call(t);
        }
        function lo(t, a, o) {
          return a = Ve(a === i ? t.length - 1 : a, 0), function() {
            for (var c = arguments, _ = -1, w = Ve(c.length - a, 0), L = F(w); ++_ < w; ) L[_] = c[a + _];
            _ = -1;
            for (var T = F(a + 1); ++_ < a; ) T[_] = c[_];
            return T[a] = o(L), ut(t, this, T);
          };
        }
        function uo(t, a) {
          return a.length < 2 ? t : Fn(t, pt(a, 0, -1));
        }
        function Ma(t, a) {
          for (var o = t.length, c = Be(a.length, o), _ = ct(t); c--; ) {
            var w = a[c];
            t[c] = Ws(w, o) ? _[w] : i;
          }
          return t;
        }
        function An(t, a) {
          if (!(a === "constructor" && typeof t[a] == "function") && a != "__proto__") return t[a];
        }
        var Ld = Td(ed), Tt = Dm || function(t, a) {
          return st.setTimeout(t, a);
        }, Dt = Td(uc);
        function kd(t, a, o) {
          var c = a + "";
          return Dt(t, kt(c, Dc(io(c), o)));
        }
        function Td(t) {
          var a = 0, o = 0;
          return function() {
            var c = xl(), _ = Re - (c - o);
            if (o = c, _ > 0) {
              if (++a >= Ot) return arguments[0];
            } else a = 0;
            return t.apply(i, arguments);
          };
        }
        function ft(t, a) {
          var o = -1, c = t.length, _ = c - 1;
          for (a = a === i ? c : a; ++o < a; ) {
            var w = Jr(o, _), L = t[w];
            t[w] = t[o], t[o] = L;
          }
          return t.length = a, t;
        }
        var Dd = wa(function(t) {
          var a = [];
          return t.charCodeAt(0) === 46 && a.push(""), t.replace(_e, function(o, c, _, w) {
            a.push(_ ? w.replace(ts, "$1") : c || o);
          }), a;
        });
        function Ts(t) {
          if (typeof t == "string" || ls(t)) return t;
          var a = t + "";
          return a == "0" && 1 / t == -Fs ? "-0" : a;
        }
        function En(t) {
          if (t != null) {
            try {
              return Ia.call(t);
            } catch {
            }
            try {
              return t + "";
            } catch {
            }
          }
          return "";
        }
        function Dc(t, a) {
          return Je(Bn, function(o) {
            var c = "_." + o[0];
            a & o[1] && !Dr(t, c) && t.push(c);
          }), t.sort();
        }
        function mo(t) {
          if (t instanceof me) return t.clone();
          var a = new Wt(t.__wrapped__, t.__chain__);
          return a.__actions__ = ct(t.__actions__), a.__index__ = t.__index__, a.__values__ = t.__values__, a;
        }
        function Yc(t, a, o) {
          (o ? ht(t, a, o) : a === i) ? a = 1 : a = Ve(ue(a), 0);
          var c = t == null ? 0 : t.length;
          if (!c || a < 1) return [];
          for (var _ = 0, w = 0, L = F(Er(c / a)); _ < c; ) L[w++] = pt(t, _, _ += a);
          return L;
        }
        function co(t) {
          for (var a = -1, o = t == null ? 0 : t.length, c = 0, _ = []; ++a < o; ) {
            var w = t[a];
            w && (_[c++] = w);
          }
          return _;
        }
        function Yd() {
          var t = arguments.length;
          if (!t) return [];
          for (var a = F(t - 1), o = arguments[0], c = t; c--; ) a[c - 1] = arguments[c];
          return hs(de(o) ? ct(o) : [o], nt(a, 1));
        }
        var Cd = le(function(t, a) {
          return et(t) ? ha(t, nt(a, 1, et, true)) : [];
        }), Cc = le(function(t, a) {
          var o = Ie(a);
          return et(o) && (o = i), et(t) ? ha(t, nt(a, 1, et, true), te(o, 2)) : [];
        }), go = le(function(t, a) {
          var o = Ie(a);
          return et(o) && (o = i), et(t) ? ha(t, nt(a, 1, et, true), i, o) : [];
        });
        function Sd(t, a, o) {
          var c = t == null ? 0 : t.length;
          return c ? (a = o || a === i ? 1 : ue(a), pt(t, a < 0 ? 0 : a, c)) : [];
        }
        function Sc(t, a, o) {
          var c = t == null ? 0 : t.length;
          return c ? (a = o || a === i ? 1 : ue(a), a = c - a, pt(t, 0, a < 0 ? 0 : a)) : [];
        }
        function bc(t, a) {
          return t && t.length ? Kr(t, te(a, 3), true, true) : [];
        }
        function bd(t, a) {
          return t && t.length ? Kr(t, te(a, 3), true) : [];
        }
        function Fc(t, a, o, c) {
          var _ = t == null ? 0 : t.length;
          return _ ? (o && typeof o != "number" && ht(t, a, o) && (o = 0, c = _), Qm(t, a, o, c)) : [];
        }
        function si(t, a, o) {
          var c = t == null ? 0 : t.length;
          if (!c) return -1;
          var _ = o == null ? 0 : ue(o);
          return _ < 0 && (_ = Ve(c + _, 0)), Yr(t, te(a, 3), _);
        }
        function Hn(t, a, o) {
          var c = t == null ? 0 : t.length;
          if (!c) return -1;
          var _ = c - 1;
          return o !== i && (_ = ue(o), _ = o < 0 ? Ve(c + _, 0) : Be(_, c - 1)), Yr(t, te(a, 3), _, true);
        }
        function $s(t) {
          var a = t == null ? 0 : t.length;
          return a ? nt(t, 1) : [];
        }
        function Pn(t) {
          var a = t == null ? 0 : t.length;
          return a ? nt(t, Fs) : [];
        }
        function xc(t, a) {
          var o = t == null ? 0 : t.length;
          return o ? (a = a === i ? 1 : ue(a), nt(t, a)) : [];
        }
        function _n(t) {
          for (var a = -1, o = t == null ? 0 : t.length, c = {}; ++a < o; ) {
            var _ = t[a];
            c[_[0]] = _[1];
          }
          return c;
        }
        function ni(t) {
          return t && t.length ? t[0] : i;
        }
        function Fd(t, a, o) {
          var c = t == null ? 0 : t.length;
          if (!c) return -1;
          var _ = o == null ? 0 : ue(o);
          return _ < 0 && (_ = Ve(c + _, 0)), ra(t, a, _);
        }
        function ho(t) {
          var a = t == null ? 0 : t.length;
          return a ? pt(t, 0, -1) : [];
        }
        var Nc = le(function(t) {
          var a = Ne(t, Gi);
          return a.length && a[0] === t[0] ? ji(a) : [];
        }), Ac = le(function(t) {
          var a = Ie(t), o = Ne(t, Gi);
          return a === Ie(o) ? a = i : o.pop(), o.length && o[0] === t[0] ? ji(o, te(a, 2)) : [];
        }), La = le(function(t) {
          var a = Ie(t), o = Ne(t, Gi);
          return a = typeof a == "function" ? a : i, a && o.pop(), o.length && o[0] === t[0] ? ji(o, i, a) : [];
        });
        function Gt(t, a) {
          return t == null ? "" : ua.call(t, a);
        }
        function Ie(t) {
          var a = t == null ? 0 : t.length;
          return a ? t[a - 1] : i;
        }
        function Ht(t, a, o) {
          var c = t == null ? 0 : t.length;
          if (!c) return -1;
          var _ = c;
          return o !== i && (_ = ue(o), _ = _ < 0 ? Ve(c + _, 0) : Be(_, c - 1)), a === a ? gm(t, a, _) : Yr(t, pl, _, true);
        }
        function Pt(t, a) {
          return t && t.length ? Kl(t, ue(a)) : i;
        }
        var Ec = le(xd);
        function xd(t, a) {
          return t && t.length && a && a.length ? Ri(t, a) : t;
        }
        function fo(t, a, o) {
          return t && t.length && a && a.length ? Ri(t, a, te(o, 2)) : t;
        }
        function _o(t, a, o) {
          return t && t.length && a && a.length ? Ri(t, a, i, o) : t;
        }
        var po = Bs(function(t, a) {
          var o = t == null ? 0 : t.length, c = zr(t, a);
          return Nt(t, Ne(a, function(_) {
            return Ws(_, o) ? +_ : _;
          }).sort(Vi)), c;
        });
        function Hc(t, a) {
          var o = [];
          if (!(t && t.length)) return o;
          var c = -1, _ = [], w = t.length;
          for (a = te(a, 3); ++c < w; ) {
            var L = t[c];
            a(L, c, t) && (o.push(L), _.push(c));
          }
          return Nt(t, _), o;
        }
        function yo(t) {
          return t == null ? t : Ym.call(t);
        }
        function ka(t, a, o) {
          var c = t == null ? 0 : t.length;
          return c ? (o && typeof o != "number" && ht(t, a, o) ? (a = 0, o = c) : (a = a == null ? 0 : ue(a), o = o === i ? c : ue(o)), pt(t, a, o)) : [];
        }
        function Pc(t, a) {
          return Za(t, a);
        }
        function wo(t, a, o) {
          return zi(t, a, te(o, 2));
        }
        function Jt(t, a) {
          var o = t == null ? 0 : t.length;
          if (o) {
            var c = Za(t, a);
            if (c < o && Gs(t[c], a)) return c;
          }
          return -1;
        }
        function jc(t, a) {
          return Za(t, a, true);
        }
        function jn(t, a, o) {
          return zi(t, a, te(o, 2), true);
        }
        function qc(t, a) {
          var o = t == null ? 0 : t.length;
          if (o) {
            var c = Za(t, a, true) - 1;
            if (Gs(t[c], a)) return c;
          }
          return -1;
        }
        function Ta(t) {
          return t && t.length ? td(t) : [];
        }
        function Nd(t, a) {
          return t && t.length ? td(t, te(a, 2)) : [];
        }
        function vo(t) {
          var a = t == null ? 0 : t.length;
          return a ? pt(t, 1, a) : [];
        }
        function e(t, a, o) {
          return t && t.length ? (a = o || a === i ? 1 : ue(a), pt(t, 0, a < 0 ? 0 : a)) : [];
        }
        function n(t, a, o) {
          var c = t == null ? 0 : t.length;
          return c ? (a = o || a === i ? 1 : ue(a), a = c - a, pt(t, a < 0 ? 0 : a, c)) : [];
        }
        function d(t, a) {
          return t && t.length ? Kr(t, te(a, 3), false, true) : [];
        }
        function u(t, a) {
          return t && t.length ? Kr(t, te(a, 3)) : [];
        }
        var f = le(function(t) {
          return cn(nt(t, 1, et, true));
        }), k = le(function(t) {
          var a = Ie(t);
          return et(a) && (a = i), cn(nt(t, 1, et, true), te(a, 2));
        }), b = le(function(t) {
          var a = Ie(t);
          return a = typeof a == "function" ? a : i, cn(nt(t, 1, et, true), i, a);
        });
        function W(t) {
          return t && t.length ? cn(t) : [];
        }
        function ie(t, a) {
          return t && t.length ? cn(t, te(a, 2)) : [];
        }
        function ye(t, a) {
          return a = typeof a == "function" ? a : i, t && t.length ? cn(t, i, a) : [];
        }
        function at(t) {
          if (!(t && t.length)) return [];
          var a = 0;
          return t = rn(t, function(o) {
            if (et(o)) return a = Ve(o.length, a), true;
          }), Yi(a, function(o) {
            return Ne(t, ki(o));
          });
        }
        function Ds(t, a) {
          if (!(t && t.length)) return [];
          var o = at(t);
          return a == null ? o : Ne(o, function(c) {
            return ut(a, i, c);
          });
        }
        var pn = le(function(t, a) {
          return et(t) ? ha(t, a) : [];
        }), D1 = le(function(t) {
          return $i(rn(t, et));
        }), Y1 = le(function(t) {
          var a = Ie(t);
          return et(a) && (a = i), $i(rn(t, et), te(a, 2));
        }), C1 = le(function(t) {
          var a = Ie(t);
          return a = typeof a == "function" ? a : i, $i(rn(t, et), i, a);
        }), S1 = le(at);
        function b1(t, a) {
          return gn(t || [], a || [], Ga);
        }
        function F1(t, a) {
          return gn(t || [], a || [], Ka);
        }
        var x1 = le(function(t) {
          var a = t.length, o = a > 1 ? t[a - 1] : i;
          return o = typeof o == "function" ? (t.pop(), o) : i, Ds(t, o);
        });
        function t_(t) {
          var a = y(t);
          return a.__chain__ = true, a;
        }
        function N1(t, a) {
          return a(t), t;
        }
        function Ad(t, a) {
          return a(t);
        }
        var A1 = Bs(function(t) {
          var a = t.length, o = a ? t[0] : 0, c = this.__wrapped__, _ = function(w) {
            return zr(w, t);
          };
          return a > 1 || this.__actions__.length || !(c instanceof me) || !Ws(o) ? this.thru(_) : (c = c.slice(o, +o + (a ? 1 : 0)), c.__actions__.push({ func: Ad, args: [_], thisArg: i }), new Wt(c, this.__chain__).thru(function(w) {
            return a && !w.length && w.push(i), w;
          }));
        });
        function E1() {
          return t_(this);
        }
        function H1() {
          return new Wt(this.value(), this.__chain__);
        }
        function P1() {
          this.__values__ === i && (this.__values__ = f_(this.value()));
          var t = this.__index__ >= this.__values__.length, a = t ? i : this.__values__[this.__index__++];
          return { done: t, value: a };
        }
        function j1() {
          return this;
        }
        function q1(t) {
          for (var a, o = this; o instanceof Ir; ) {
            var c = mo(o);
            c.__index__ = 0, c.__values__ = i, a ? _.__wrapped__ = c : a = c;
            var _ = c;
            o = o.__wrapped__;
          }
          return _.__wrapped__ = t, a;
        }
        function I1() {
          var t = this.__wrapped__;
          if (t instanceof me) {
            var a = t;
            return this.__actions__.length && (a = new me(this)), a = a.reverse(), a.__actions__.push({ func: Ad, args: [yo], thisArg: i }), new Wt(a, this.__chain__);
          }
          return this.thru(yo);
        }
        function R1() {
          return Wi(this.__wrapped__, this.__actions__);
        }
        var O1 = Qa(function(t, a, o) {
          Ye.call(t, o) ? ++t[o] : Rs(t, o, 1);
        });
        function U1(t, a, o) {
          var c = de(t) ? Tr : Zm;
          return o && ht(t, a, o) && (a = i), c(t, te(a, 3));
        }
        function z1(t, a) {
          var o = de(t) ? rn : zl;
          return o(t, te(a, 3));
        }
        var B1 = ud(si), W1 = ud(Hn);
        function $1(t, a) {
          return nt(Ed(t, a), 1);
        }
        function G1(t, a) {
          return nt(Ed(t, a), Fs);
        }
        function J1(t, a, o) {
          return o = o === i ? 1 : ue(o), nt(Ed(t, a), o);
        }
        function s_(t, a) {
          var o = de(t) ? Je : un;
          return o(t, te(a, 3));
        }
        function n_(t, a) {
          var o = de(t) ? tm : Ul;
          return o(t, te(a, 3));
        }
        var V1 = Qa(function(t, a, o) {
          Ye.call(t, o) ? t[o].push(a) : Rs(t, o, [a]);
        });
        function K1(t, a, o, c) {
          t = Vt(t) ? t : ri(t), o = o && !c ? ue(o) : 0;
          var _ = t.length;
          return o < 0 && (o = Ve(_ + o, 0)), Id(t) ? o <= _ && t.indexOf(a, o) > -1 : !!_ && ra(t, a, o) > -1;
        }
        var Z1 = le(function(t, a, o) {
          var c = -1, _ = typeof a == "function", w = Vt(t) ? F(t.length) : [];
          return un(t, function(L) {
            w[++c] = _ ? ut(a, L, o) : ws(L, a, o);
          }), w;
        }), Q1 = Qa(function(t, a, o) {
          Rs(t, o, a);
        });
        function Ed(t, a) {
          var o = de(t) ? Ne : Jl;
          return o(t, te(a, 3));
        }
        function X1(t, a, o, c) {
          return t == null ? [] : (de(a) || (a = a == null ? [] : [a]), o = c ? i : o, de(o) || (o = o == null ? [] : [o]), Zl(t, a, o));
        }
        var ew = Qa(function(t, a, o) {
          t[o ? 0 : 1].push(a);
        }, function() {
          return [[], []];
        });
        function tw(t, a, o) {
          var c = de(t) ? Mi : yl, _ = arguments.length < 3;
          return c(t, te(a, 4), o, _, un);
        }
        function sw(t, a, o) {
          var c = de(t) ? sm : yl, _ = arguments.length < 3;
          return c(t, te(a, 4), o, _, Ul);
        }
        function nw(t, a) {
          var o = de(t) ? rn : zl;
          return o(t, jd(te(a, 3)));
        }
        function aw(t) {
          var a = de(t) ? Rl : lc;
          return a(t);
        }
        function rw(t, a, o) {
          (o ? ht(t, a, o) : a === i) ? a = 1 : a = ue(a);
          var c = de(t) ? Gm : dc;
          return c(t, a);
        }
        function iw(t) {
          var a = de(t) ? Jm : mc;
          return a(t);
        }
        function ow(t) {
          if (t == null) return 0;
          if (Vt(t)) return Id(t) ? on(t) : t.length;
          var a = We(t);
          return a == es || a == Oe ? t.size : Wr(t).length;
        }
        function lw(t, a, o) {
          var c = de(t) ? Li : cc;
          return o && ht(t, a, o) && (a = i), c(t, te(a, 3));
        }
        var dw = le(function(t, a) {
          if (t == null) return [];
          var o = a.length;
          return o > 1 && ht(t, a[0], a[1]) ? a = [] : o > 2 && ht(a[0], a[1], a[2]) && (a = [a[0]]), Zl(t, nt(a, 1), []);
        }), Hd = Tm || function() {
          return st.Date.now();
        };
        function uw(t, a) {
          if (typeof a != "function") throw new Bt(h);
          return t = ue(t), function() {
            if (--t < 1) return a.apply(this, arguments);
          };
        }
        function a_(t, a, o) {
          return a = o ? i : a, a = t && a == null ? t.length : a, zs(t, J, i, i, i, i, a);
        }
        function r_(t, a) {
          var o;
          if (typeof a != "function") throw new Bt(h);
          return t = ue(t), function() {
            return --t > 0 && (o = a.apply(this, arguments)), t <= 1 && (a = i), o;
          };
        }
        var Ic = le(function(t, a, o) {
          var c = x;
          if (o.length) {
            var _ = ns(o, ya(Ic));
            c |= ge;
          }
          return zs(t, c, a, o, _);
        }), i_ = le(function(t, a, o) {
          var c = x | X;
          if (o.length) {
            var _ = ns(o, ya(i_));
            c |= ge;
          }
          return zs(a, c, t, o, _);
        });
        function o_(t, a, o) {
          a = o ? i : a;
          var c = zs(t, se, i, i, i, i, i, a);
          return c.placeholder = o_.placeholder, c;
        }
        function l_(t, a, o) {
          a = o ? i : a;
          var c = zs(t, Q, i, i, i, i, i, a);
          return c.placeholder = l_.placeholder, c;
        }
        function d_(t, a, o) {
          var c, _, w, L, T, C, H = 0, P = false, I = false, z = true;
          if (typeof t != "function") throw new Bt(h);
          a = Ys(a) || 0, $e(o) && (P = !!o.leading, I = "maxWait" in o, w = I ? Ve(Ys(o.maxWait) || 0, a) : w, z = "trailing" in o ? !!o.trailing : z);
          function K(tt) {
            var Js = c, Rn = _;
            return c = _ = i, H = tt, L = t.apply(Rn, Js), L;
          }
          function ne(tt) {
            return H = tt, T = Tt(we, a), P ? K(tt) : L;
          }
          function ce(tt) {
            var Js = tt - C, Rn = tt - H, S_ = a - Js;
            return I ? Be(S_, w - Rn) : S_;
          }
          function ae(tt) {
            var Js = tt - C, Rn = tt - H;
            return C === i || Js >= a || Js < 0 || I && Rn >= w;
          }
          function we() {
            var tt = Hd();
            if (ae(tt)) return Me(tt);
            T = Tt(we, ce(tt));
          }
          function Me(tt) {
            return T = i, z && c ? K(tt) : (c = _ = i, L);
          }
          function ds() {
            T !== i && Et(T), H = 0, c = C = _ = T = i;
          }
          function jt() {
            return T === i ? L : Me(Hd());
          }
          function us() {
            var tt = Hd(), Js = ae(tt);
            if (c = arguments, _ = this, C = tt, Js) {
              if (T === i) return ne(C);
              if (I) return Et(T), T = Tt(we, a), K(C);
            }
            return T === i && (T = Tt(we, a)), L;
          }
          return us.cancel = ds, us.flush = jt, us;
        }
        var mw = le(function(t, a) {
          return _s(t, 1, a);
        }), cw = le(function(t, a, o) {
          return _s(t, Ys(a) || 0, o);
        });
        function gw(t) {
          return zs(t, je);
        }
        function Pd(t, a) {
          if (typeof t != "function" || a != null && typeof a != "function") throw new Bt(h);
          var o = function() {
            var c = arguments, _ = a ? a.apply(this, c) : c[0], w = o.cache;
            if (w.has(_)) return w.get(_);
            var L = t.apply(this, c);
            return o.cache = w.set(_, L) || w, L;
          };
          return o.cache = new (Pd.Cache || Is)(), o;
        }
        Pd.Cache = Is;
        function jd(t) {
          if (typeof t != "function") throw new Bt(h);
          return function() {
            var a = arguments;
            switch (a.length) {
              case 0:
                return !t.call(this);
              case 1:
                return !t.call(this, a[0]);
              case 2:
                return !t.call(this, a[0], a[1]);
              case 3:
                return !t.call(this, a[0], a[1], a[2]);
            }
            return !t.apply(this, a);
          };
        }
        function hw(t) {
          return r_(2, t);
        }
        var fw = nd(function(t, a) {
          a = a.length == 1 && de(a[0]) ? Ne(a[0], _t(te())) : Ne(nt(a, 1), _t(te()));
          var o = a.length;
          return le(function(c) {
            for (var _ = -1, w = Be(c.length, o); ++_ < w; ) c[_] = a[_].call(this, c[_]);
            return ut(t, this, c);
          });
        }), Rc = le(function(t, a) {
          var o = ns(a, ya(Rc));
          return zs(t, ge, i, a, o);
        }), u_ = le(function(t, a) {
          var o = ns(a, ya(u_));
          return zs(t, B, i, a, o);
        }), _w = Bs(function(t, a) {
          return zs(t, he, i, i, i, a);
        });
        function pw(t, a) {
          if (typeof t != "function") throw new Bt(h);
          return a = a === i ? a : ue(a), le(t, a);
        }
        function yw(t, a) {
          if (typeof t != "function") throw new Bt(h);
          return a = a == null ? 0 : Ve(ue(a), 0), le(function(o) {
            var c = o[a], _ = At(o, 0, a);
            return c && hs(_, c), ut(t, this, _);
          });
        }
        function ww(t, a, o) {
          var c = true, _ = true;
          if (typeof t != "function") throw new Bt(h);
          return $e(o) && (c = "leading" in o ? !!o.leading : c, _ = "trailing" in o ? !!o.trailing : _), d_(t, a, { leading: c, maxWait: a, trailing: _ });
        }
        function vw(t) {
          return a_(t, 1);
        }
        function Mw(t, a) {
          return Rc(Ji(a), t);
        }
        function Lw() {
          if (!arguments.length) return [];
          var t = arguments[0];
          return de(t) ? t : [t];
        }
        function kw(t) {
          return bt(t, N);
        }
        function Tw(t, a) {
          return a = typeof a == "function" ? a : i, bt(t, N, a);
        }
        function Dw(t) {
          return bt(t, S | N);
        }
        function Yw(t, a) {
          return a = typeof a == "function" ? a : i, bt(t, S | N, a);
        }
        function Cw(t, a) {
          return a == null || Ol(t, a, lt(a));
        }
        function Gs(t, a) {
          return t === a || t !== t && a !== a;
        }
        var Sw = pa(Pi), bw = pa(function(t, a) {
          return t >= a;
        }), er = $l(/* @__PURE__ */ (function() {
          return arguments;
        })()) ? $l : function(t) {
          return Ke(t) && Ye.call(t, "callee") && !Sl.call(t, "callee");
        }, de = F.isArray, Fw = ml ? _t(ml) : sc;
        function Vt(t) {
          return t != null && qd(t.length) && !qn(t);
        }
        function et(t) {
          return Ke(t) && Vt(t);
        }
        function xw(t) {
          return t === true || t === false || Ke(t) && mt(t) == Xs;
        }
        var Da = Fl || Zc, Nw = wi ? _t(wi) : nc;
        function Aw(t) {
          return Ke(t) && t.nodeType === 1 && !Mo(t);
        }
        function Ew(t) {
          if (t == null) return true;
          if (Vt(t) && (de(t) || typeof t == "string" || typeof t.splice == "function" || Da(t) || ai(t) || er(t))) return !t.length;
          var a = We(t);
          if (a == es || a == Oe) return !t.size;
          if (ks(t)) return !Wr(t).length;
          for (var o in t) if (Ye.call(t, o)) return false;
          return true;
        }
        function Hw(t, a) {
          return Ja(t, a);
        }
        function Pw(t, a, o) {
          o = typeof o == "function" ? o : i;
          var c = o ? o(t, a) : i;
          return c === i ? Ja(t, a, i, o) : !!c;
        }
        function Oc(t) {
          if (!Ke(t)) return false;
          var a = mt(t);
          return a == mr || a == ku || typeof t.message == "string" && typeof t.name == "string" && !Mo(t);
        }
        function jw(t) {
          return typeof t == "number" && Ua(t);
        }
        function qn(t) {
          if (!$e(t)) return false;
          var a = mt(t);
          return a == cr || a == Io || a == Lu || a == Du;
        }
        function m_(t) {
          return typeof t == "number" && t == ue(t);
        }
        function qd(t) {
          return typeof t == "number" && t > -1 && t % 1 == 0 && t <= Qs;
        }
        function $e(t) {
          var a = typeof t;
          return t != null && (a == "object" || a == "function");
        }
        function Ke(t) {
          return t != null && typeof t == "object";
        }
        var c_ = cl ? _t(cl) : qi;
        function qw(t, a) {
          return t === a || mn(t, a, ao(a));
        }
        function Iw(t, a, o) {
          return o = typeof o == "function" ? o : i, mn(t, a, ao(a), o);
        }
        function Rw(t) {
          return g_(t) && t != +t;
        }
        function Ow(t) {
          if (Tc(t)) throw new oe(g);
          return Va(t);
        }
        function Uw(t) {
          return t === null;
        }
        function zw(t) {
          return t == null;
        }
        function g_(t) {
          return typeof t == "number" || Ke(t) && mt(t) == xa;
        }
        function Mo(t) {
          if (!Ke(t) || mt(t) != xs) return false;
          var a = Nr(t);
          if (a === null) return true;
          var o = Ye.call(a, "constructor") && a.constructor;
          return typeof o == "function" && o instanceof o && Ia.call(o) == vm;
        }
        var Uc = gl ? _t(gl) : ve;
        function Bw(t) {
          return m_(t) && t >= -Qs && t <= Qs;
        }
        var h_ = Ha ? _t(Ha) : Gl;
        function Id(t) {
          return typeof t == "string" || !de(t) && Ke(t) && mt(t) == Mn;
        }
        function ls(t) {
          return typeof t == "symbol" || Ke(t) && mt(t) == gr;
        }
        var ai = Hs ? _t(Hs) : rc;
        function Ww(t) {
          return t === i;
        }
        function $w(t) {
          return Ke(t) && We(t) == Gn;
        }
        function Gw(t) {
          return Ke(t) && mt(t) == Ct;
        }
        var Jw = pa($r), Vw = pa(function(t, a) {
          return t <= a;
        });
        function f_(t) {
          if (!t) return [];
          if (Vt(t)) return Id(t) ? St(t) : ct(t);
          if (Ra && t[Ra]) return mm(t[Ra]());
          var a = We(t), o = a == es ? Si : a == Oe ? oa : ri;
          return o(t);
        }
        function In(t) {
          if (!t) return t === 0 ? t : 0;
          if (t = Ys(t), t === Fs || t === -Fs) {
            var a = t < 0 ? -1 : 1;
            return a * Mu;
          }
          return t === t ? t : 0;
        }
        function ue(t) {
          var a = In(t), o = a % 1;
          return a === a ? o ? a - o : a : 0;
        }
        function __(t) {
          return t ? bn(ue(t), 0, Ut) : 0;
        }
        function Ys(t) {
          if (typeof t == "number") return t;
          if (ls(t)) return Yt;
          if ($e(t)) {
            var a = typeof t.valueOf == "function" ? t.valueOf() : t;
            t = $e(a) ? a + "" : a;
          }
          if (typeof t != "string") return t === 0 ? t : +t;
          t = wl(t);
          var o = Nu.test(t);
          return o || Uo.test(t) ? dl(t.slice(2), o ? 2 : 8) : xu.test(t) ? Yt : +t;
        }
        function p_(t) {
          return Ls(t, Kt(t));
        }
        function Kw(t) {
          return t ? bn(ue(t), -Qs, Qs) : t === 0 ? t : 0;
        }
        function be(t) {
          return t == null ? "" : yt(t);
        }
        var Zw = fa(function(t, a) {
          if (ks(a) || Vt(a)) {
            Ls(a, lt(a), t);
            return;
          }
          for (var o in a) Ye.call(a, o) && Ga(t, o, a[o]);
        }), y_ = fa(function(t, a) {
          Ls(a, Kt(a), t);
        }), Rd = fa(function(t, a, o, c) {
          Ls(a, Kt(a), t, c);
        }), Qw = fa(function(t, a, o, c) {
          Ls(a, lt(a), t, c);
        }), Xw = Bs(zr);
        function ev(t, a) {
          var o = ga(t);
          return a == null ? o : Ni(o, a);
        }
        var tv = le(function(t, a) {
          t = fe(t);
          var o = -1, c = a.length, _ = c > 2 ? a[2] : i;
          for (_ && ht(a[0], a[1], _) && (c = 1); ++o < c; ) for (var w = a[o], L = Kt(w), T = -1, C = L.length; ++T < C; ) {
            var H = L[T], P = t[H];
            (P === i || Gs(P, da[H]) && !Ye.call(t, H)) && (t[H] = w[H]);
          }
          return t;
        }), sv = le(function(t) {
          return t.push(i, fd), ut(w_, i, t);
        });
        function nv(t, a) {
          return fl(t, te(a, 3), ps);
        }
        function av(t, a) {
          return fl(t, te(a, 3), Hi);
        }
        function rv(t, a) {
          return t == null ? t : Ei(t, te(a, 3), Kt);
        }
        function iv(t, a) {
          return t == null ? t : Bl(t, te(a, 3), Kt);
        }
        function ov(t, a) {
          return t && ps(t, te(a, 3));
        }
        function lv(t, a) {
          return t && Hi(t, te(a, 3));
        }
        function dv(t) {
          return t == null ? [] : ys(t, lt(t));
        }
        function uv(t) {
          return t == null ? [] : ys(t, Kt(t));
        }
        function zc(t, a, o) {
          var c = t == null ? i : Fn(t, a);
          return c === i ? o : c;
        }
        function mv(t, a) {
          return t != null && pd(t, a, Xm);
        }
        function Bc(t, a) {
          return t != null && pd(t, a, ec);
        }
        var cv = cd(function(t, a, o) {
          a != null && typeof a.toString != "function" && (a = br.call(a)), t[a] = o;
        }, $c(Zt)), gv = cd(function(t, a, o) {
          a != null && typeof a.toString != "function" && (a = br.call(a)), Ye.call(t, a) ? t[a].push(o) : t[a] = [o];
        }, te), hv = le(ws);
        function lt(t) {
          return Vt(t) ? Ur(t) : Wr(t);
        }
        function Kt(t) {
          return Vt(t) ? Ur(t, true) : ic(t);
        }
        function fv(t, a) {
          var o = {};
          return a = te(a, 3), ps(t, function(c, _, w) {
            Rs(o, a(c, _, w), c);
          }), o;
        }
        function _v(t, a) {
          var o = {};
          return a = te(a, 3), ps(t, function(c, _, w) {
            Rs(o, _, a(c, _, w));
          }), o;
        }
        var pv = fa(function(t, a, o) {
          Gr(t, a, o);
        }), w_ = fa(function(t, a, o, c) {
          Gr(t, a, o, c);
        }), yv = Bs(function(t, a) {
          var o = {};
          if (t == null) return o;
          var c = false;
          a = Ne(a, function(w) {
            return w = vs(w, t), c || (c = w.length > 1), w;
          }), Ls(t, vt(t), o), c && (o = bt(o, S | E | N, _c));
          for (var _ = a.length; _--; ) Bi(o, a[_]);
          return o;
        });
        function wv(t, a) {
          return v_(t, jd(te(a)));
        }
        var vv = Bs(function(t, a) {
          return t == null ? {} : oc(t, a);
        });
        function v_(t, a) {
          if (t == null) return {};
          var o = Ne(vt(t), function(c) {
            return [c];
          });
          return a = te(a), Ql(t, o, function(c, _) {
            return a(c, _[0]);
          });
        }
        function Mv(t, a, o) {
          a = vs(a, t);
          var c = -1, _ = a.length;
          for (_ || (_ = 1, t = i); ++c < _; ) {
            var w = t == null ? i : t[Ts(a[c])];
            w === i && (c = _, w = o), t = qn(w) ? w.call(t) : w;
          }
          return t;
        }
        function Lv(t, a, o) {
          return t == null ? t : Ka(t, a, o);
        }
        function kv(t, a, o, c) {
          return c = typeof c == "function" ? c : i, t == null ? t : Ka(t, a, o, c);
        }
        var M_ = gd(lt), L_ = gd(Kt);
        function Tv(t, a, o) {
          var c = de(t), _ = c || Da(t) || ai(t);
          if (a = te(a, 4), o == null) {
            var w = t && t.constructor;
            _ ? o = c ? new w() : [] : $e(t) ? o = qn(w) ? ga(Nr(t)) : {} : o = {};
          }
          return (_ ? Je : ps)(t, function(L, T, C) {
            return a(o, L, T, C);
          }), o;
        }
        function Dv(t, a) {
          return t == null ? true : Bi(t, a);
        }
        function Yv(t, a, o) {
          return t == null ? t : sd(t, a, Ji(o));
        }
        function Cv(t, a, o, c) {
          return c = typeof c == "function" ? c : i, t == null ? t : sd(t, a, Ji(o), c);
        }
        function ri(t) {
          return t == null ? [] : Ci(t, lt(t));
        }
        function Sv(t) {
          return t == null ? [] : Ci(t, Kt(t));
        }
        function bv(t, a, o) {
          return o === i && (o = a, a = i), o !== i && (o = Ys(o), o = o === o ? o : 0), a !== i && (a = Ys(a), a = a === a ? a : 0), bn(Ys(t), a, o);
        }
        function Fv(t, a, o) {
          return a = In(a), o === i ? (o = a, a = 0) : o = In(o), t = Ys(t), tc(t, a, o);
        }
        function xv(t, a, o) {
          if (o && typeof o != "boolean" && ht(t, a, o) && (a = o = i), o === i && (typeof a == "boolean" ? (o = a, a = i) : typeof t == "boolean" && (o = t, t = i)), t === i && a === i ? (t = 0, a = 1) : (t = In(t), a === i ? (a = t, t = 0) : a = In(a)), t > a) {
            var c = t;
            t = a, a = c;
          }
          if (o || t % 1 || a % 1) {
            var _ = Al();
            return Be(t + _ * (a - t + ll("1e-" + ((_ + "").length - 1))), a);
          }
          return Jr(t, a);
        }
        var Nv = hn(function(t, a, o) {
          return a = a.toLowerCase(), t + (o ? k_(a) : a);
        });
        function k_(t) {
          return Wc(be(t).toLowerCase());
        }
        function T_(t) {
          return t = be(t), t && t.replace(ea, Ml).replace(Wu, "");
        }
        function Av(t, a, o) {
          t = be(t), a = yt(a);
          var c = t.length;
          o = o === i ? c : bn(ue(o), 0, c);
          var _ = o;
          return o -= a.length, o >= 0 && t.slice(o, _) == a;
        }
        function Ev(t) {
          return t = be(t), t && pr.test(t) ? t.replace(Ln, om) : t;
        }
        function Hv(t) {
          return t = be(t), t && Se.test(t) ? t.replace(Aa, "\\$&") : t;
        }
        var Pv = hn(function(t, a, o) {
          return t + (o ? "-" : "") + a.toLowerCase();
        }), jv = hn(function(t, a, o) {
          return t + (o ? " " : "") + a.toLowerCase();
        }), qv = dd("toLowerCase");
        function Iv(t, a, o) {
          t = be(t), a = ue(a);
          var c = a ? on(t) : 0;
          if (!a || c >= a) return t;
          var _ = (a - c) / 2;
          return Xr(Oa(_), o) + t + Xr(Er(_), o);
        }
        function Rv(t, a, o) {
          t = be(t), a = ue(a);
          var c = a ? on(t) : 0;
          return a && c < a ? t + Xr(a - c, o) : t;
        }
        function Ov(t, a, o) {
          t = be(t), a = ue(a);
          var c = a ? on(t) : 0;
          return a && c < a ? Xr(a - c, o) + t : t;
        }
        function Uv(t, a, o) {
          return o || a == null ? a = 0 : a && (a = +a), Nl(be(t).replace(kn, ""), a || 0);
        }
        function zv(t, a, o) {
          return (o ? ht(t, a, o) : a === i) ? a = 1 : a = ue(a), Ui(be(t), a);
        }
        function Bv() {
          var t = arguments, a = be(t[0]);
          return t.length < 3 ? a : a.replace(t[1], t[2]);
        }
        var Wv = hn(function(t, a, o) {
          return t + (o ? "_" : "") + a.toLowerCase();
        });
        function $v(t, a, o) {
          return o && typeof o != "number" && ht(t, a, o) && (a = o = i), o = o === i ? Ut : o >>> 0, o ? (t = be(t), t && (typeof a == "string" || a != null && !Uc(a)) && (a = yt(a), !a && fs(t)) ? At(St(t), 0, o) : t.split(a, o)) : [];
        }
        var Gv = hn(function(t, a, o) {
          return t + (o ? " " : "") + Wc(a);
        });
        function Jv(t, a, o) {
          return t = be(t), o = o == null ? 0 : bn(ue(o), 0, t.length), a = yt(a), t.slice(o, o + a.length) == a;
        }
        function Vv(t, a, o) {
          var c = y.templateSettings;
          o && ht(t, a, o) && (a = i), t = be(t), a = Rd({}, a, c, hd);
          var _ = Rd({}, a.imports, c.imports, hd), w = lt(_), L = Ci(_, w), T, C, H = 0, P = a.interpolate || nn, I = "__p += '", z = Ps((a.escape || nn).source + "|" + P.source + "|" + (P === Oo ? Es : nn).source + "|" + (a.evaluate || nn).source + "|$", "g"), K = "//# sourceURL=" + (Ye.call(a, "sourceURL") ? (a.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++Ku + "]") + `
`;
          t.replace(z, function(ae, we, Me, ds, jt, us) {
            return Me || (Me = ds), I += t.slice(H, us).replace(zo, lm), we && (T = true, I += `' +
__e(` + we + `) +
'`), jt && (C = true, I += `';
` + jt + `;
__p += '`), Me && (I += `' +
((__t = (` + Me + `)) == null ? '' : __t) +
'`), H = us + ae.length, ae;
          }), I += `';
`;
          var ne = Ye.call(a, "variable") && a.variable;
          if (!ne) I = `with (obj) {
` + I + `
}
`;
          else if (Qe.test(ne)) throw new oe(p);
          I = (C ? I.replace(Cu, "") : I).replace(_r, "$1").replace(Su, "$1;"), I = "function(" + (ne || "obj") + `) {
` + (ne ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (T ? ", __e = _.escape" : "") + (C ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + I + `return __p
}`;
          var ce = Y_(function() {
            return De(w, K + "return " + I).apply(i, L);
          });
          if (ce.source = I, Oc(ce)) throw ce;
          return ce;
        }
        function Kv(t) {
          return be(t).toLowerCase();
        }
        function Zv(t) {
          return be(t).toUpperCase();
        }
        function Qv(t, a, o) {
          if (t = be(t), t && (o || a === i)) return wl(t);
          if (!t || !(a = yt(a))) return t;
          var c = St(t), _ = St(a), w = Ee(c, _), L = vl(c, _) + 1;
          return At(c, w, L).join("");
        }
        function Xv(t, a, o) {
          if (t = be(t), t && (o || a === i)) return t.slice(0, Cr(t) + 1);
          if (!t || !(a = yt(a))) return t;
          var c = St(t), _ = vl(c, St(a)) + 1;
          return At(c, 0, _).join("");
        }
        function eM(t, a, o) {
          if (t = be(t), t && (o || a === i)) return t.replace(kn, "");
          if (!t || !(a = yt(a))) return t;
          var c = St(t), _ = Ee(c, St(a));
          return At(c, _).join("");
        }
        function tM(t, a) {
          var o = Te, c = pe;
          if ($e(a)) {
            var _ = "separator" in a ? a.separator : _;
            o = "length" in a ? ue(a.length) : o, c = "omission" in a ? yt(a.omission) : c;
          }
          t = be(t);
          var w = t.length;
          if (fs(t)) {
            var L = St(t);
            w = L.length;
          }
          if (o >= w) return t;
          var T = o - on(c);
          if (T < 1) return c;
          var C = L ? At(L, 0, T).join("") : t.slice(0, T);
          if (_ === i) return C + c;
          if (L && (T += C.length - T), Uc(_)) {
            if (t.slice(T).search(_)) {
              var H, P = C;
              for (_.global || (_ = Ps(_.source, be(sn.exec(_)) + "g")), _.lastIndex = 0; H = _.exec(P); ) var I = H.index;
              C = C.slice(0, I === i ? T : I);
            }
          } else if (t.indexOf(yt(_), T) != T) {
            var z = C.lastIndexOf(_);
            z > -1 && (C = C.slice(0, z));
          }
          return C + c;
        }
        function sM(t) {
          return t = be(t), t && ci.test(t) ? t.replace(Xn, hm) : t;
        }
        var nM = hn(function(t, a, o) {
          return t + (o ? " " : "") + a.toUpperCase();
        }), Wc = dd("toUpperCase");
        function D_(t, a, o) {
          return t = be(t), a = o ? i : a, a === i ? um(t) ? pm(t) : am(t) : t.match(a) || [];
        }
        var Y_ = le(function(t, a) {
          try {
            return ut(t, i, a);
          } catch (o) {
            return Oc(o) ? o : new oe(o);
          }
        }), aM = Bs(function(t, a) {
          return Je(a, function(o) {
            o = Ts(o), Rs(t, o, Ic(t[o], t));
          }), t;
        });
        function rM(t) {
          var a = t == null ? 0 : t.length, o = te();
          return t = a ? Ne(t, function(c) {
            if (typeof c[1] != "function") throw new Bt(h);
            return [o(c[0]), c[1]];
          }) : [], le(function(c) {
            for (var _ = -1; ++_ < a; ) {
              var w = t[_];
              if (ut(w[0], this, c)) return ut(w[1], this, c);
            }
          });
        }
        function iM(t) {
          return Ai(bt(t, S));
        }
        function $c(t) {
          return function() {
            return t;
          };
        }
        function oM(t, a) {
          return t == null || t !== t ? a : t;
        }
        var lM = md(), dM = md(true);
        function Zt(t) {
          return t;
        }
        function Gc(t) {
          return Ft(typeof t == "function" ? t : bt(t, S));
        }
        function uM(t) {
          return xt(bt(t, S));
        }
        function mM(t, a) {
          return Ii(t, bt(a, S));
        }
        var cM = le(function(t, a) {
          return function(o) {
            return ws(o, t, a);
          };
        }), gM = le(function(t, a) {
          return function(o) {
            return ws(t, o, a);
          };
        });
        function Jc(t, a, o) {
          var c = lt(a), _ = ys(a, c);
          o == null && !($e(a) && (_.length || !c.length)) && (o = a, a = t, t = this, _ = ys(a, lt(a)));
          var w = !($e(o) && "chain" in o) || !!o.chain, L = qn(t);
          return Je(_, function(T) {
            var C = a[T];
            t[T] = C, L && (t.prototype[T] = function() {
              var H = this.__chain__;
              if (w || H) {
                var P = t(this.__wrapped__), I = P.__actions__ = ct(this.__actions__);
                return I.push({ func: C, args: arguments, thisArg: t }), P.__chain__ = H, P;
              }
              return C.apply(t, hs([this.value()], arguments));
            });
          }), t;
        }
        function hM() {
          return st._ === this && (st._ = Mm), this;
        }
        function Vc() {
        }
        function fM(t) {
          return t = ue(t), le(function(a) {
            return Kl(a, t);
          });
        }
        var _M = Xi(Ne), pM = Xi(Tr), yM = Xi(Li);
        function C_(t) {
          return ti(t) ? ki(Ts(t)) : Xl(t);
        }
        function wM(t) {
          return function(a) {
            return t == null ? i : Fn(t, a);
          };
        }
        var vM = eo(), MM = eo(true);
        function Kc() {
          return [];
        }
        function Zc() {
          return false;
        }
        function LM() {
          return {};
        }
        function kM() {
          return "";
        }
        function TM() {
          return true;
        }
        function DM(t, a) {
          if (t = ue(t), t < 1 || t > Qs) return [];
          var o = Ut, c = Be(t, Ut);
          a = te(a), t -= Ut;
          for (var _ = Yi(c, a); ++o < t; ) a(o);
          return _;
        }
        function YM(t) {
          return de(t) ? Ne(t, Ts) : ls(t) ? [t] : ct(Dd(be(t)));
        }
        function CM(t) {
          var a = ++wm;
          return be(t) + a;
        }
        var SM = gt(function(t, a) {
          return t + a;
        }, 0), bM = so("ceil"), FM = gt(function(t, a) {
          return t / a;
        }, 1), xM = so("floor");
        function NM(t) {
          return t && t.length ? Br(t, Zt, Pi) : i;
        }
        function AM(t, a) {
          return t && t.length ? Br(t, te(a, 2), Pi) : i;
        }
        function EM(t) {
          return Dn(t, Zt);
        }
        function HM(t, a) {
          return Dn(t, te(a, 2));
        }
        function PM(t) {
          return t && t.length ? Br(t, Zt, $r) : i;
        }
        function jM(t, a) {
          return t && t.length ? Br(t, te(a, 2), $r) : i;
        }
        var qM = gt(function(t, a) {
          return t * a;
        }, 1), IM = so("round"), RM = gt(function(t, a) {
          return t - a;
        }, 0);
        function OM(t) {
          return t && t.length ? Di(t, Zt) : 0;
        }
        function UM(t, a) {
          return t && t.length ? Di(t, te(a, 2)) : 0;
        }
        return y.after = uw, y.ary = a_, y.assign = Zw, y.assignIn = y_, y.assignInWith = Rd, y.assignWith = Qw, y.at = Xw, y.before = r_, y.bind = Ic, y.bindAll = aM, y.bindKey = i_, y.castArray = Lw, y.chain = t_, y.chunk = Yc, y.compact = co, y.concat = Yd, y.cond = rM, y.conforms = iM, y.constant = $c, y.countBy = O1, y.create = ev, y.curry = o_, y.curryRight = l_, y.debounce = d_, y.defaults = tv, y.defaultsDeep = sv, y.defer = mw, y.delay = cw, y.difference = Cd, y.differenceBy = Cc, y.differenceWith = go, y.drop = Sd, y.dropRight = Sc, y.dropRightWhile = bc, y.dropWhile = bd, y.fill = Fc, y.filter = z1, y.flatMap = $1, y.flatMapDeep = G1, y.flatMapDepth = J1, y.flatten = $s, y.flattenDeep = Pn, y.flattenDepth = xc, y.flip = gw, y.flow = lM, y.flowRight = dM, y.fromPairs = _n, y.functions = dv, y.functionsIn = uv, y.groupBy = V1, y.initial = ho, y.intersection = Nc, y.intersectionBy = Ac, y.intersectionWith = La, y.invert = cv, y.invertBy = gv, y.invokeMap = Z1, y.iteratee = Gc, y.keyBy = Q1, y.keys = lt, y.keysIn = Kt, y.map = Ed, y.mapKeys = fv, y.mapValues = _v, y.matches = uM, y.matchesProperty = mM, y.memoize = Pd, y.merge = pv, y.mergeWith = w_, y.method = cM, y.methodOf = gM, y.mixin = Jc, y.negate = jd, y.nthArg = fM, y.omit = yv, y.omitBy = wv, y.once = hw, y.orderBy = X1, y.over = _M, y.overArgs = fw, y.overEvery = pM, y.overSome = yM, y.partial = Rc, y.partialRight = u_, y.partition = ew, y.pick = vv, y.pickBy = v_, y.property = C_, y.propertyOf = wM, y.pull = Ec, y.pullAll = xd, y.pullAllBy = fo, y.pullAllWith = _o, y.pullAt = po, y.range = vM, y.rangeRight = MM, y.rearg = _w, y.reject = nw, y.remove = Hc, y.rest = pw, y.reverse = yo, y.sampleSize = rw, y.set = Lv, y.setWith = kv, y.shuffle = iw, y.slice = ka, y.sortBy = dw, y.sortedUniq = Ta, y.sortedUniqBy = Nd, y.split = $v, y.spread = yw, y.tail = vo, y.take = e, y.takeRight = n, y.takeRightWhile = d, y.takeWhile = u, y.tap = N1, y.throttle = ww, y.thru = Ad, y.toArray = f_, y.toPairs = M_, y.toPairsIn = L_, y.toPath = YM, y.toPlainObject = p_, y.transform = Tv, y.unary = vw, y.union = f, y.unionBy = k, y.unionWith = b, y.uniq = W, y.uniqBy = ie, y.uniqWith = ye, y.unset = Dv, y.unzip = at, y.unzipWith = Ds, y.update = Yv, y.updateWith = Cv, y.values = ri, y.valuesIn = Sv, y.without = pn, y.words = D_, y.wrap = Mw, y.xor = D1, y.xorBy = Y1, y.xorWith = C1, y.zip = S1, y.zipObject = b1, y.zipObjectDeep = F1, y.zipWith = x1, y.entries = M_, y.entriesIn = L_, y.extend = y_, y.extendWith = Rd, Jc(y, y), y.add = SM, y.attempt = Y_, y.camelCase = Nv, y.capitalize = k_, y.ceil = bM, y.clamp = bv, y.clone = kw, y.cloneDeep = Dw, y.cloneDeepWith = Yw, y.cloneWith = Tw, y.conformsTo = Cw, y.deburr = T_, y.defaultTo = oM, y.divide = FM, y.endsWith = Av, y.eq = Gs, y.escape = Ev, y.escapeRegExp = Hv, y.every = U1, y.find = B1, y.findIndex = si, y.findKey = nv, y.findLast = W1, y.findLastIndex = Hn, y.findLastKey = av, y.floor = xM, y.forEach = s_, y.forEachRight = n_, y.forIn = rv, y.forInRight = iv, y.forOwn = ov, y.forOwnRight = lv, y.get = zc, y.gt = Sw, y.gte = bw, y.has = mv, y.hasIn = Bc, y.head = ni, y.identity = Zt, y.includes = K1, y.indexOf = Fd, y.inRange = Fv, y.invoke = hv, y.isArguments = er, y.isArray = de, y.isArrayBuffer = Fw, y.isArrayLike = Vt, y.isArrayLikeObject = et, y.isBoolean = xw, y.isBuffer = Da, y.isDate = Nw, y.isElement = Aw, y.isEmpty = Ew, y.isEqual = Hw, y.isEqualWith = Pw, y.isError = Oc, y.isFinite = jw, y.isFunction = qn, y.isInteger = m_, y.isLength = qd, y.isMap = c_, y.isMatch = qw, y.isMatchWith = Iw, y.isNaN = Rw, y.isNative = Ow, y.isNil = zw, y.isNull = Uw, y.isNumber = g_, y.isObject = $e, y.isObjectLike = Ke, y.isPlainObject = Mo, y.isRegExp = Uc, y.isSafeInteger = Bw, y.isSet = h_, y.isString = Id, y.isSymbol = ls, y.isTypedArray = ai, y.isUndefined = Ww, y.isWeakMap = $w, y.isWeakSet = Gw, y.join = Gt, y.kebabCase = Pv, y.last = Ie, y.lastIndexOf = Ht, y.lowerCase = jv, y.lowerFirst = qv, y.lt = Jw, y.lte = Vw, y.max = NM, y.maxBy = AM, y.mean = EM, y.meanBy = HM, y.min = PM, y.minBy = jM, y.stubArray = Kc, y.stubFalse = Zc, y.stubObject = LM, y.stubString = kM, y.stubTrue = TM, y.multiply = qM, y.nth = Pt, y.noConflict = hM, y.noop = Vc, y.now = Hd, y.pad = Iv, y.padEnd = Rv, y.padStart = Ov, y.parseInt = Uv, y.random = xv, y.reduce = tw, y.reduceRight = sw, y.repeat = zv, y.replace = Bv, y.result = Mv, y.round = IM, y.runInContext = Y, y.sample = aw, y.size = ow, y.snakeCase = Wv, y.some = lw, y.sortedIndex = Pc, y.sortedIndexBy = wo, y.sortedIndexOf = Jt, y.sortedLastIndex = jc, y.sortedLastIndexBy = jn, y.sortedLastIndexOf = qc, y.startCase = Gv, y.startsWith = Jv, y.subtract = RM, y.sum = OM, y.sumBy = UM, y.template = Vv, y.times = DM, y.toFinite = In, y.toInteger = ue, y.toLength = __, y.toLower = Kv, y.toNumber = Ys, y.toSafeInteger = Kw, y.toString = be, y.toUpper = Zv, y.trim = Qv, y.trimEnd = Xv, y.trimStart = eM, y.truncate = tM, y.unescape = sM, y.uniqueId = CM, y.upperCase = nM, y.upperFirst = Wc, y.each = s_, y.eachRight = n_, y.first = ni, Jc(y, (function() {
          var t = {};
          return ps(y, function(a, o) {
            Ye.call(y.prototype, o) || (t[o] = a);
          }), t;
        })(), { chain: false }), y.VERSION = l, Je(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(t) {
          y[t].placeholder = y;
        }), Je(["drop", "take"], function(t, a) {
          me.prototype[t] = function(o) {
            o = o === i ? 1 : Ve(ue(o), 0);
            var c = this.__filtered__ && !a ? new me(this) : this.clone();
            return c.__filtered__ ? c.__takeCount__ = Be(o, c.__takeCount__) : c.__views__.push({ size: Be(o, Ut), type: t + (c.__dir__ < 0 ? "Right" : "") }), c;
          }, me.prototype[t + "Right"] = function(o) {
            return this.reverse()[t](o).reverse();
          };
        }), Je(["filter", "map", "takeWhile"], function(t, a) {
          var o = a + 1, c = o == zn || o == Fa;
          me.prototype[t] = function(_) {
            var w = this.clone();
            return w.__iteratees__.push({ iteratee: te(_, 3), type: o }), w.__filtered__ = w.__filtered__ || c, w;
          };
        }), Je(["head", "last"], function(t, a) {
          var o = "take" + (a ? "Right" : "");
          me.prototype[t] = function() {
            return this[o](1).value()[0];
          };
        }), Je(["initial", "tail"], function(t, a) {
          var o = "drop" + (a ? "" : "Right");
          me.prototype[t] = function() {
            return this.__filtered__ ? new me(this) : this[o](1);
          };
        }), me.prototype.compact = function() {
          return this.filter(Zt);
        }, me.prototype.find = function(t) {
          return this.filter(t).head();
        }, me.prototype.findLast = function(t) {
          return this.reverse().find(t);
        }, me.prototype.invokeMap = le(function(t, a) {
          return typeof t == "function" ? new me(this) : this.map(function(o) {
            return ws(o, t, a);
          });
        }), me.prototype.reject = function(t) {
          return this.filter(jd(te(t)));
        }, me.prototype.slice = function(t, a) {
          t = ue(t);
          var o = this;
          return o.__filtered__ && (t > 0 || a < 0) ? new me(o) : (t < 0 ? o = o.takeRight(-t) : t && (o = o.drop(t)), a !== i && (a = ue(a), o = a < 0 ? o.dropRight(-a) : o.take(a - t)), o);
        }, me.prototype.takeRightWhile = function(t) {
          return this.reverse().takeWhile(t).reverse();
        }, me.prototype.toArray = function() {
          return this.take(Ut);
        }, ps(me.prototype, function(t, a) {
          var o = /^(?:filter|find|map|reject)|While$/.test(a), c = /^(?:head|last)$/.test(a), _ = y[c ? "take" + (a == "last" ? "Right" : "") : a], w = c || /^find/.test(a);
          _ && (y.prototype[a] = function() {
            var L = this.__wrapped__, T = c ? [1] : arguments, C = L instanceof me, H = T[0], P = C || de(L), I = function(we) {
              var Me = _.apply(y, hs([we], T));
              return c && z ? Me[0] : Me;
            };
            P && o && typeof H == "function" && H.length != 1 && (C = P = false);
            var z = this.__chain__, K = !!this.__actions__.length, ne = w && !z, ce = C && !K;
            if (!w && P) {
              L = ce ? L : new me(this);
              var ae = t.apply(L, T);
              return ae.__actions__.push({ func: Ad, args: [I], thisArg: i }), new Wt(ae, z);
            }
            return ne && ce ? t.apply(this, T) : (ae = this.thru(I), ne ? c ? ae.value()[0] : ae.value() : ae);
          });
        }), Je(["pop", "push", "shift", "sort", "splice", "unshift"], function(t) {
          var a = qa[t], o = /^(?:push|sort|unshift)$/.test(t) ? "tap" : "thru", c = /^(?:pop|shift)$/.test(t);
          y.prototype[t] = function() {
            var _ = arguments;
            if (c && !this.__chain__) {
              var w = this.value();
              return a.apply(de(w) ? w : [], _);
            }
            return this[o](function(L) {
              return a.apply(de(L) ? L : [], _);
            });
          };
        }), ps(me.prototype, function(t, a) {
          var o = y[a];
          if (o) {
            var c = o.name + "";
            Ye.call(ca, c) || (ca[c] = []), ca[c].push({ name: a, func: o });
          }
        }), ca[xn(i, X).name] = [{ name: "wrapper", func: i }], me.prototype.clone = Nm, me.prototype.reverse = Am, me.prototype.value = Em, y.prototype.at = A1, y.prototype.chain = E1, y.prototype.commit = H1, y.prototype.next = P1, y.prototype.plant = q1, y.prototype.reverse = I1, y.prototype.toJSON = y.prototype.valueOf = y.prototype.value = R1, y.prototype.first = y.prototype.head, Ra && (y.prototype[Ra] = j1), y;
      }), la = ym();
      an ? ((an.exports = la)._ = la, yi._ = la) : st._ = la;
    }).call(f2);
  })(Yo, Yo.exports)), Yo.exports;
}
var lp = _2();
const ir = Ks("preferences", { state: () => ({ user: { calendarPeek: false, checkCalendars: [], checkCalendarsHoursBefore: 0, checkCalendarsHoursAfter: 0, defaultViewInquiry: "table-view", inquiryCombo: [], relevantOffset: 30, useNewInquiryDialogInNavigation: false, useNewInquiryInInquiryist: false, useCommentsAlternativeStyling: false, useAlternativeStyling: false, verboseInquiriesList: false }, session: { manualViewInquiry: "" }, availableCalendars: [] }), getters: { viewInquiry(s) {
  return s.session.manualViewInquiry ? s.session.manualViewInquiry : window.innerWidth > 480 ? s.user.defaultViewInquiry : "list-view";
}, useNcAppNavigationNew(s) {
  return !s.user.useNewInquiryDialogInNavigation && !s.user.useNewInquiryInInquiryist;
}, useActionAddInquiryInNavigation(s) {
  return s.user.useNewInquiryDialogInNavigation && !s.user.useNewInquiryInInquiryist;
} }, actions: { setCalendars(s) {
  this.availableCalendars = s.calendars;
}, addCheckCalendar(s) {
  this.user.checkCalendars.push(s.key), this.write();
}, removeCheckCalendar(s) {
  const r = this.user.checkCalendars.indexOf(s.key);
  r !== -1 && this.user.checkCalendars.splice(r, 1), this.write();
}, setViewInquiry(s) {
  this.session.manualViewInquiry = s;
}, async load() {
  try {
    const s = await qf.getUserSettings();
    this.$patch({ user: s.data.preferences });
  } catch (s) {
    if (s?.code === "ERR_CANCELED") return;
    throw this.$reset(), s;
  }
}, async write() {
  try {
    const s = await qf.writeUserSettings(this.user);
    this.$patch({ user: s.data.preferences });
  } catch (s) {
    if (s?.code === "ERR_CANCELED") return;
    throw Z.error("Error writing preferences", { error: s, preferences: this.user }), s;
  }
}, async getCalendars() {
  try {
    const s = await q0.getCalendars();
    return this.setCalendars({ calendars: s.data.calendars }), s;
  } catch (s) {
    if (s?.code === "ERR_CANCELED") return;
    throw s;
  }
} } });
var wg, dp;
function up() {
  if (dp) return wg;
  dp = 1;
  function s(r, i) {
    for (var l = -1, m = r == null ? 0 : r.length, g = Array(m); ++l < m; ) g[l] = i(r[l], l, r);
    return g;
  }
  return wg = s, wg;
}
var vg, mp;
function wn() {
  if (mp) return vg;
  mp = 1;
  var s = Array.isArray;
  return vg = s, vg;
}
var Mg, cp;
function Lg() {
  if (cp) return Mg;
  cp = 1;
  var s = wn(), r = zd(), i = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, l = /^\w*$/;
  function m(g, h) {
    if (s(g)) return false;
    var p = typeof g;
    return p == "number" || p == "symbol" || p == "boolean" || g == null || r(g) ? true : l.test(g) || !i.test(g) || h != null && g in Object(h);
  }
  return Mg = m, Mg;
}
var kg, gp;
function hp() {
  if (gp) return kg;
  gp = 1;
  var s = Bd(), r = tg(), i = "[object AsyncFunction]", l = "[object Function]", m = "[object GeneratorFunction]", g = "[object Proxy]";
  function h(p) {
    if (!r(p)) return false;
    var M = s(p);
    return M == l || M == m || M == i || M == g;
  }
  return kg = h, kg;
}
var Tg, fp;
function p2() {
  if (fp) return Tg;
  fp = 1;
  var s = Sa(), r = s["__core-js_shared__"];
  return Tg = r, Tg;
}
var Dg, _p;
function y2() {
  if (_p) return Dg;
  _p = 1;
  var s = p2(), r = (function() {
    var l = /[^.]+$/.exec(s && s.keys && s.keys.IE_PROTO || "");
    return l ? "Symbol(src)_1." + l : "";
  })();
  function i(l) {
    return !!r && r in l;
  }
  return Dg = i, Dg;
}
var Yg, pp;
function yp() {
  if (pp) return Yg;
  pp = 1;
  var s = Function.prototype, r = s.toString;
  function i(l) {
    if (l != null) {
      try {
        return r.call(l);
      } catch {
      }
      try {
        return l + "";
      } catch {
      }
    }
    return "";
  }
  return Yg = i, Yg;
}
var Cg, wp;
function w2() {
  if (wp) return Cg;
  wp = 1;
  var s = hp(), r = y2(), i = tg(), l = yp(), m = /[\\^$.*+?()[\]{}|]/g, g = /^\[object .+?Constructor\]$/, h = Function.prototype, p = Object.prototype, M = h.toString, v = p.hasOwnProperty, D = RegExp("^" + M.call(v).replace(m, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
  function S(E) {
    if (!i(E) || r(E)) return false;
    var N = s(E) ? D : g;
    return N.test(l(E));
  }
  return Cg = S, Cg;
}
var Sg, vp;
function v2() {
  if (vp) return Sg;
  vp = 1;
  function s(r, i) {
    return r?.[i];
  }
  return Sg = s, Sg;
}
var bg, Mp;
function oi() {
  if (Mp) return bg;
  Mp = 1;
  var s = w2(), r = v2();
  function i(l, m) {
    var g = r(l, m);
    return s(g) ? g : void 0;
  }
  return bg = i, bg;
}
var Fg, Lp;
function iu() {
  if (Lp) return Fg;
  Lp = 1;
  var s = oi(), r = s(Object, "create");
  return Fg = r, Fg;
}
var xg, kp;
function M2() {
  if (kp) return xg;
  kp = 1;
  var s = iu();
  function r() {
    this.__data__ = s ? s(null) : {}, this.size = 0;
  }
  return xg = r, xg;
}
var Ng, Tp;
function L2() {
  if (Tp) return Ng;
  Tp = 1;
  function s(r) {
    var i = this.has(r) && delete this.__data__[r];
    return this.size -= i ? 1 : 0, i;
  }
  return Ng = s, Ng;
}
var Ag, Dp;
function k2() {
  if (Dp) return Ag;
  Dp = 1;
  var s = iu(), r = "__lodash_hash_undefined__", i = Object.prototype, l = i.hasOwnProperty;
  function m(g) {
    var h = this.__data__;
    if (s) {
      var p = h[g];
      return p === r ? void 0 : p;
    }
    return l.call(h, g) ? h[g] : void 0;
  }
  return Ag = m, Ag;
}
var Eg, Yp;
function T2() {
  if (Yp) return Eg;
  Yp = 1;
  var s = iu(), r = Object.prototype, i = r.hasOwnProperty;
  function l(m) {
    var g = this.__data__;
    return s ? g[m] !== void 0 : i.call(g, m);
  }
  return Eg = l, Eg;
}
var Hg, Cp;
function D2() {
  if (Cp) return Hg;
  Cp = 1;
  var s = iu(), r = "__lodash_hash_undefined__";
  function i(l, m) {
    var g = this.__data__;
    return this.size += this.has(l) ? 0 : 1, g[l] = s && m === void 0 ? r : m, this;
  }
  return Hg = i, Hg;
}
var Pg, Sp;
function Y2() {
  if (Sp) return Pg;
  Sp = 1;
  var s = M2(), r = L2(), i = k2(), l = T2(), m = D2();
  function g(h) {
    var p = -1, M = h == null ? 0 : h.length;
    for (this.clear(); ++p < M; ) {
      var v = h[p];
      this.set(v[0], v[1]);
    }
  }
  return g.prototype.clear = s, g.prototype.delete = r, g.prototype.get = i, g.prototype.has = l, g.prototype.set = m, Pg = g, Pg;
}
var jg, bp;
function C2() {
  if (bp) return jg;
  bp = 1;
  function s() {
    this.__data__ = [], this.size = 0;
  }
  return jg = s, jg;
}
var qg, Fp;
function xp() {
  if (Fp) return qg;
  Fp = 1;
  function s(r, i) {
    return r === i || r !== r && i !== i;
  }
  return qg = s, qg;
}
var Ig, Np;
function ou() {
  if (Np) return Ig;
  Np = 1;
  var s = xp();
  function r(i, l) {
    for (var m = i.length; m--; ) if (s(i[m][0], l)) return m;
    return -1;
  }
  return Ig = r, Ig;
}
var Rg, Ap;
function S2() {
  if (Ap) return Rg;
  Ap = 1;
  var s = ou(), r = Array.prototype, i = r.splice;
  function l(m) {
    var g = this.__data__, h = s(g, m);
    if (h < 0) return false;
    var p = g.length - 1;
    return h == p ? g.pop() : i.call(g, h, 1), --this.size, true;
  }
  return Rg = l, Rg;
}
var Og, Ep;
function b2() {
  if (Ep) return Og;
  Ep = 1;
  var s = ou();
  function r(i) {
    var l = this.__data__, m = s(l, i);
    return m < 0 ? void 0 : l[m][1];
  }
  return Og = r, Og;
}
var Ug, Hp;
function F2() {
  if (Hp) return Ug;
  Hp = 1;
  var s = ou();
  function r(i) {
    return s(this.__data__, i) > -1;
  }
  return Ug = r, Ug;
}
var zg, Pp;
function x2() {
  if (Pp) return zg;
  Pp = 1;
  var s = ou();
  function r(i, l) {
    var m = this.__data__, g = s(m, i);
    return g < 0 ? (++this.size, m.push([i, l])) : m[g][1] = l, this;
  }
  return zg = r, zg;
}
var Bg, jp;
function lu() {
  if (jp) return Bg;
  jp = 1;
  var s = C2(), r = S2(), i = b2(), l = F2(), m = x2();
  function g(h) {
    var p = -1, M = h == null ? 0 : h.length;
    for (this.clear(); ++p < M; ) {
      var v = h[p];
      this.set(v[0], v[1]);
    }
  }
  return g.prototype.clear = s, g.prototype.delete = r, g.prototype.get = i, g.prototype.has = l, g.prototype.set = m, Bg = g, Bg;
}
var Wg, qp;
function $g() {
  if (qp) return Wg;
  qp = 1;
  var s = oi(), r = Sa(), i = s(r, "Map");
  return Wg = i, Wg;
}
var Gg, Ip;
function N2() {
  if (Ip) return Gg;
  Ip = 1;
  var s = Y2(), r = lu(), i = $g();
  function l() {
    this.size = 0, this.__data__ = { hash: new s(), map: new (i || r)(), string: new s() };
  }
  return Gg = l, Gg;
}
var Jg, Rp;
function A2() {
  if (Rp) return Jg;
  Rp = 1;
  function s(r) {
    var i = typeof r;
    return i == "string" || i == "number" || i == "symbol" || i == "boolean" ? r !== "__proto__" : r === null;
  }
  return Jg = s, Jg;
}
var Vg, Op;
function du() {
  if (Op) return Vg;
  Op = 1;
  var s = A2();
  function r(i, l) {
    var m = i.__data__;
    return s(l) ? m[typeof l == "string" ? "string" : "hash"] : m.map;
  }
  return Vg = r, Vg;
}
var Kg, Up;
function E2() {
  if (Up) return Kg;
  Up = 1;
  var s = du();
  function r(i) {
    var l = s(this, i).delete(i);
    return this.size -= l ? 1 : 0, l;
  }
  return Kg = r, Kg;
}
var Zg, zp;
function H2() {
  if (zp) return Zg;
  zp = 1;
  var s = du();
  function r(i) {
    return s(this, i).get(i);
  }
  return Zg = r, Zg;
}
var Qg, Bp;
function P2() {
  if (Bp) return Qg;
  Bp = 1;
  var s = du();
  function r(i) {
    return s(this, i).has(i);
  }
  return Qg = r, Qg;
}
var Xg, Wp;
function j2() {
  if (Wp) return Xg;
  Wp = 1;
  var s = du();
  function r(i, l) {
    var m = s(this, i), g = m.size;
    return m.set(i, l), this.size += m.size == g ? 0 : 1, this;
  }
  return Xg = r, Xg;
}
var eh, $p;
function th() {
  if ($p) return eh;
  $p = 1;
  var s = N2(), r = E2(), i = H2(), l = P2(), m = j2();
  function g(h) {
    var p = -1, M = h == null ? 0 : h.length;
    for (this.clear(); ++p < M; ) {
      var v = h[p];
      this.set(v[0], v[1]);
    }
  }
  return g.prototype.clear = s, g.prototype.delete = r, g.prototype.get = i, g.prototype.has = l, g.prototype.set = m, eh = g, eh;
}
var sh, Gp;
function q2() {
  if (Gp) return sh;
  Gp = 1;
  var s = th(), r = "Expected a function";
  function i(l, m) {
    if (typeof l != "function" || m != null && typeof m != "function") throw new TypeError(r);
    var g = function() {
      var h = arguments, p = m ? m.apply(this, h) : h[0], M = g.cache;
      if (M.has(p)) return M.get(p);
      var v = l.apply(this, h);
      return g.cache = M.set(p, v) || M, v;
    };
    return g.cache = new (i.Cache || s)(), g;
  }
  return i.Cache = s, sh = i, sh;
}
var nh, Jp;
function I2() {
  if (Jp) return nh;
  Jp = 1;
  var s = q2(), r = 500;
  function i(l) {
    var m = s(l, function(h) {
      return g.size === r && g.clear(), h;
    }), g = m.cache;
    return m;
  }
  return nh = i, nh;
}
var ah, Vp;
function R2() {
  if (Vp) return ah;
  Vp = 1;
  var s = I2(), r = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, i = /\\(\\)?/g, l = s(function(m) {
    var g = [];
    return m.charCodeAt(0) === 46 && g.push(""), m.replace(r, function(h, p, M, v) {
      g.push(M ? v.replace(i, "$1") : p || h);
    }), g;
  });
  return ah = l, ah;
}
var rh, Kp;
function O2() {
  if (Kp) return rh;
  Kp = 1;
  var s = A_(), r = up(), i = wn(), l = zd(), m = s ? s.prototype : void 0, g = m ? m.toString : void 0;
  function h(p) {
    if (typeof p == "string") return p;
    if (i(p)) return r(p, h) + "";
    if (l(p)) return g ? g.call(p) : "";
    var M = p + "";
    return M == "0" && 1 / p == -1 / 0 ? "-0" : M;
  }
  return rh = h, rh;
}
var ih, Zp;
function U2() {
  if (Zp) return ih;
  Zp = 1;
  var s = O2();
  function r(i) {
    return i == null ? "" : s(i);
  }
  return ih = r, ih;
}
var oh, Qp;
function Xp() {
  if (Qp) return oh;
  Qp = 1;
  var s = wn(), r = Lg(), i = R2(), l = U2();
  function m(g, h) {
    return s(g) ? g : r(g, h) ? [g] : i(l(g));
  }
  return oh = m, oh;
}
var lh, ey;
function uu() {
  if (ey) return lh;
  ey = 1;
  var s = zd();
  function r(i) {
    if (typeof i == "string" || s(i)) return i;
    var l = i + "";
    return l == "0" && 1 / i == -1 / 0 ? "-0" : l;
  }
  return lh = r, lh;
}
var dh, ty;
function uh() {
  if (ty) return dh;
  ty = 1;
  var s = Xp(), r = uu();
  function i(l, m) {
    m = s(m, l);
    for (var g = 0, h = m.length; l != null && g < h; ) l = l[r(m[g++])];
    return g && g == h ? l : void 0;
  }
  return dh = i, dh;
}
var mh, sy;
function z2() {
  if (sy) return mh;
  sy = 1;
  var s = lu();
  function r() {
    this.__data__ = new s(), this.size = 0;
  }
  return mh = r, mh;
}
var ch, ny;
function B2() {
  if (ny) return ch;
  ny = 1;
  function s(r) {
    var i = this.__data__, l = i.delete(r);
    return this.size = i.size, l;
  }
  return ch = s, ch;
}
var gh, ay;
function W2() {
  if (ay) return gh;
  ay = 1;
  function s(r) {
    return this.__data__.get(r);
  }
  return gh = s, gh;
}
var hh, ry;
function $2() {
  if (ry) return hh;
  ry = 1;
  function s(r) {
    return this.__data__.has(r);
  }
  return hh = s, hh;
}
var fh, iy;
function G2() {
  if (iy) return fh;
  iy = 1;
  var s = lu(), r = $g(), i = th(), l = 200;
  function m(g, h) {
    var p = this.__data__;
    if (p instanceof s) {
      var M = p.__data__;
      if (!r || M.length < l - 1) return M.push([g, h]), this.size = ++p.size, this;
      p = this.__data__ = new i(M);
    }
    return p.set(g, h), this.size = p.size, this;
  }
  return fh = m, fh;
}
var _h, oy;
function ly() {
  if (oy) return _h;
  oy = 1;
  var s = lu(), r = z2(), i = B2(), l = W2(), m = $2(), g = G2();
  function h(p) {
    var M = this.__data__ = new s(p);
    this.size = M.size;
  }
  return h.prototype.clear = r, h.prototype.delete = i, h.prototype.get = l, h.prototype.has = m, h.prototype.set = g, _h = h, _h;
}
var ph, dy;
function J2() {
  if (dy) return ph;
  dy = 1;
  var s = "__lodash_hash_undefined__";
  function r(i) {
    return this.__data__.set(i, s), this;
  }
  return ph = r, ph;
}
var yh, uy;
function V2() {
  if (uy) return yh;
  uy = 1;
  function s(r) {
    return this.__data__.has(r);
  }
  return yh = s, yh;
}
var wh, my;
function K2() {
  if (my) return wh;
  my = 1;
  var s = th(), r = J2(), i = V2();
  function l(m) {
    var g = -1, h = m == null ? 0 : m.length;
    for (this.__data__ = new s(); ++g < h; ) this.add(m[g]);
  }
  return l.prototype.add = l.prototype.push = r, l.prototype.has = i, wh = l, wh;
}
var vh, cy;
function Z2() {
  if (cy) return vh;
  cy = 1;
  function s(r, i) {
    for (var l = -1, m = r == null ? 0 : r.length; ++l < m; ) if (i(r[l], l, r)) return true;
    return false;
  }
  return vh = s, vh;
}
var Mh, gy;
function Q2() {
  if (gy) return Mh;
  gy = 1;
  function s(r, i) {
    return r.has(i);
  }
  return Mh = s, Mh;
}
var Lh, hy;
function fy() {
  if (hy) return Lh;
  hy = 1;
  var s = K2(), r = Z2(), i = Q2(), l = 1, m = 2;
  function g(h, p, M, v, D, S) {
    var E = M & l, N = h.length, j = p.length;
    if (N != j && !(E && j > N)) return false;
    var R = S.get(h), x = S.get(p);
    if (R && x) return R == p && x == h;
    var X = -1, ee = true, se = M & m ? new s() : void 0;
    for (S.set(h, p), S.set(p, h); ++X < N; ) {
      var Q = h[X], ge = p[X];
      if (v) var B = E ? v(ge, Q, X, p, h, S) : v(Q, ge, X, h, p, S);
      if (B !== void 0) {
        if (B) continue;
        ee = false;
        break;
      }
      if (se) {
        if (!r(p, function(J, he) {
          if (!i(se, he) && (Q === J || D(Q, J, M, v, S))) return se.push(he);
        })) {
          ee = false;
          break;
        }
      } else if (!(Q === ge || D(Q, ge, M, v, S))) {
        ee = false;
        break;
      }
    }
    return S.delete(h), S.delete(p), ee;
  }
  return Lh = g, Lh;
}
var kh, _y;
function X2() {
  if (_y) return kh;
  _y = 1;
  var s = Sa(), r = s.Uint8Array;
  return kh = r, kh;
}
var Th, py;
function ek() {
  if (py) return Th;
  py = 1;
  function s(r) {
    var i = -1, l = Array(r.size);
    return r.forEach(function(m, g) {
      l[++i] = [g, m];
    }), l;
  }
  return Th = s, Th;
}
var Dh, yy;
function tk() {
  if (yy) return Dh;
  yy = 1;
  function s(r) {
    var i = -1, l = Array(r.size);
    return r.forEach(function(m) {
      l[++i] = m;
    }), l;
  }
  return Dh = s, Dh;
}
var Yh, wy;
function sk() {
  if (wy) return Yh;
  wy = 1;
  var s = A_(), r = X2(), i = xp(), l = fy(), m = ek(), g = tk(), h = 1, p = 2, M = "[object Boolean]", v = "[object Date]", D = "[object Error]", S = "[object Map]", E = "[object Number]", N = "[object RegExp]", j = "[object Set]", R = "[object String]", x = "[object Symbol]", X = "[object ArrayBuffer]", ee = "[object DataView]", se = s ? s.prototype : void 0, Q = se ? se.valueOf : void 0;
  function ge(B, J, he, je, Te, pe, Ot) {
    switch (he) {
      case ee:
        if (B.byteLength != J.byteLength || B.byteOffset != J.byteOffset) return false;
        B = B.buffer, J = J.buffer;
      case X:
        return !(B.byteLength != J.byteLength || !pe(new r(B), new r(J)));
      case M:
      case v:
      case E:
        return i(+B, +J);
      case D:
        return B.name == J.name && B.message == J.message;
      case N:
      case R:
        return B == J + "";
      case S:
        var Re = m;
      case j:
        var zn = je & h;
        if (Re || (Re = g), B.size != J.size && !zn) return false;
        var Zs = Ot.get(B);
        if (Zs) return Zs == J;
        je |= p, Ot.set(B, J);
        var Fa = l(Re(B), Re(J), je, Te, pe, Ot);
        return Ot.delete(B), Fa;
      case x:
        if (Q) return Q.call(B) == Q.call(J);
    }
    return false;
  }
  return Yh = ge, Yh;
}
var Ch, vy;
function nk() {
  if (vy) return Ch;
  vy = 1;
  function s(r, i) {
    for (var l = -1, m = i.length, g = r.length; ++l < m; ) r[g + l] = i[l];
    return r;
  }
  return Ch = s, Ch;
}
var Sh, My;
function ak() {
  if (My) return Sh;
  My = 1;
  var s = nk(), r = wn();
  function i(l, m, g) {
    var h = m(l);
    return r(l) ? h : s(h, g(l));
  }
  return Sh = i, Sh;
}
var bh, Ly;
function rk() {
  if (Ly) return bh;
  Ly = 1;
  function s(r, i) {
    for (var l = -1, m = r == null ? 0 : r.length, g = 0, h = []; ++l < m; ) {
      var p = r[l];
      i(p, l, r) && (h[g++] = p);
    }
    return h;
  }
  return bh = s, bh;
}
var Fh, ky;
function ik() {
  if (ky) return Fh;
  ky = 1;
  function s() {
    return [];
  }
  return Fh = s, Fh;
}
var xh, Ty;
function ok() {
  if (Ty) return xh;
  Ty = 1;
  var s = rk(), r = ik(), i = Object.prototype, l = i.propertyIsEnumerable, m = Object.getOwnPropertySymbols, g = m ? function(h) {
    return h == null ? [] : (h = Object(h), s(m(h), function(p) {
      return l.call(h, p);
    }));
  } : r;
  return xh = g, xh;
}
var Nh, Dy;
function lk() {
  if (Dy) return Nh;
  Dy = 1;
  function s(r, i) {
    for (var l = -1, m = Array(r); ++l < r; ) m[l] = i(l);
    return m;
  }
  return Nh = s, Nh;
}
var Ah, Yy;
function dk() {
  if (Yy) return Ah;
  Yy = 1;
  var s = Bd(), r = Wd(), i = "[object Arguments]";
  function l(m) {
    return r(m) && s(m) == i;
  }
  return Ah = l, Ah;
}
var Eh, Cy;
function Sy() {
  if (Cy) return Eh;
  Cy = 1;
  var s = dk(), r = Wd(), i = Object.prototype, l = i.hasOwnProperty, m = i.propertyIsEnumerable, g = s(/* @__PURE__ */ (function() {
    return arguments;
  })()) ? s : function(h) {
    return r(h) && l.call(h, "callee") && !m.call(h, "callee");
  };
  return Eh = g, Eh;
}
var Co = { exports: {} }, Hh, by;
function uk() {
  if (by) return Hh;
  by = 1;
  function s() {
    return false;
  }
  return Hh = s, Hh;
}
Co.exports;
var Fy;
function xy() {
  return Fy || (Fy = 1, (function(s, r) {
    var i = Sa(), l = uk(), m = r && !r.nodeType && r, g = m && true && s && !s.nodeType && s, h = g && g.exports === m, p = h ? i.Buffer : void 0, M = p ? p.isBuffer : void 0, v = M || l;
    s.exports = v;
  })(Co, Co.exports)), Co.exports;
}
var Ph, Ny;
function Ay() {
  if (Ny) return Ph;
  Ny = 1;
  var s = 9007199254740991, r = /^(?:0|[1-9]\d*)$/;
  function i(l, m) {
    var g = typeof l;
    return m = m ?? s, !!m && (g == "number" || g != "symbol" && r.test(l)) && l > -1 && l % 1 == 0 && l < m;
  }
  return Ph = i, Ph;
}
var jh, Ey;
function qh() {
  if (Ey) return jh;
  Ey = 1;
  var s = 9007199254740991;
  function r(i) {
    return typeof i == "number" && i > -1 && i % 1 == 0 && i <= s;
  }
  return jh = r, jh;
}
var Ih, Hy;
function mk() {
  if (Hy) return Ih;
  Hy = 1;
  var s = Bd(), r = qh(), i = Wd(), l = "[object Arguments]", m = "[object Array]", g = "[object Boolean]", h = "[object Date]", p = "[object Error]", M = "[object Function]", v = "[object Map]", D = "[object Number]", S = "[object Object]", E = "[object RegExp]", N = "[object Set]", j = "[object String]", R = "[object WeakMap]", x = "[object ArrayBuffer]", X = "[object DataView]", ee = "[object Float32Array]", se = "[object Float64Array]", Q = "[object Int8Array]", ge = "[object Int16Array]", B = "[object Int32Array]", J = "[object Uint8Array]", he = "[object Uint8ClampedArray]", je = "[object Uint16Array]", Te = "[object Uint32Array]", pe = {};
  pe[ee] = pe[se] = pe[Q] = pe[ge] = pe[B] = pe[J] = pe[he] = pe[je] = pe[Te] = true, pe[l] = pe[m] = pe[x] = pe[g] = pe[X] = pe[h] = pe[p] = pe[M] = pe[v] = pe[D] = pe[S] = pe[E] = pe[N] = pe[j] = pe[R] = false;
  function Ot(Re) {
    return i(Re) && r(Re.length) && !!pe[s(Re)];
  }
  return Ih = Ot, Ih;
}
var Rh, Py;
function jy() {
  if (Py) return Rh;
  Py = 1;
  function s(r) {
    return function(i) {
      return r(i);
    };
  }
  return Rh = s, Rh;
}
var So = { exports: {} };
So.exports;
var qy;
function ck() {
  return qy || (qy = 1, (function(s, r) {
    var i = GM(), l = r && !r.nodeType && r, m = l && true && s && !s.nodeType && s, g = m && m.exports === l, h = g && i.process, p = (function() {
      try {
        var M = m && m.require && m.require("util").types;
        return M || h && h.binding && h.binding("util");
      } catch {
      }
    })();
    s.exports = p;
  })(So, So.exports)), So.exports;
}
var Oh, Iy;
function Ry() {
  if (Iy) return Oh;
  Iy = 1;
  var s = mk(), r = jy(), i = ck(), l = i && i.isTypedArray, m = l ? r(l) : s;
  return Oh = m, Oh;
}
var Uh, Oy;
function gk() {
  if (Oy) return Uh;
  Oy = 1;
  var s = lk(), r = Sy(), i = wn(), l = xy(), m = Ay(), g = Ry(), h = Object.prototype, p = h.hasOwnProperty;
  function M(v, D) {
    var S = i(v), E = !S && r(v), N = !S && !E && l(v), j = !S && !E && !N && g(v), R = S || E || N || j, x = R ? s(v.length, String) : [], X = x.length;
    for (var ee in v) (D || p.call(v, ee)) && !(R && (ee == "length" || N && (ee == "offset" || ee == "parent") || j && (ee == "buffer" || ee == "byteLength" || ee == "byteOffset") || m(ee, X))) && x.push(ee);
    return x;
  }
  return Uh = M, Uh;
}
var zh, Uy;
function hk() {
  if (Uy) return zh;
  Uy = 1;
  var s = Object.prototype;
  function r(i) {
    var l = i && i.constructor, m = typeof l == "function" && l.prototype || s;
    return i === m;
  }
  return zh = r, zh;
}
var Bh, zy;
function fk() {
  if (zy) return Bh;
  zy = 1;
  function s(r, i) {
    return function(l) {
      return r(i(l));
    };
  }
  return Bh = s, Bh;
}
var Wh, By;
function _k() {
  if (By) return Wh;
  By = 1;
  var s = fk(), r = s(Object.keys, Object);
  return Wh = r, Wh;
}
var $h, Wy;
function pk() {
  if (Wy) return $h;
  Wy = 1;
  var s = hk(), r = _k(), i = Object.prototype, l = i.hasOwnProperty;
  function m(g) {
    if (!s(g)) return r(g);
    var h = [];
    for (var p in Object(g)) l.call(g, p) && p != "constructor" && h.push(p);
    return h;
  }
  return $h = m, $h;
}
var Gh, $y;
function Jh() {
  if ($y) return Gh;
  $y = 1;
  var s = hp(), r = qh();
  function i(l) {
    return l != null && r(l.length) && !s(l);
  }
  return Gh = i, Gh;
}
var Vh, Gy;
function Kh() {
  if (Gy) return Vh;
  Gy = 1;
  var s = gk(), r = pk(), i = Jh();
  function l(m) {
    return i(m) ? s(m) : r(m);
  }
  return Vh = l, Vh;
}
var Zh, Jy;
function yk() {
  if (Jy) return Zh;
  Jy = 1;
  var s = ak(), r = ok(), i = Kh();
  function l(m) {
    return s(m, i, r);
  }
  return Zh = l, Zh;
}
var Qh, Vy;
function wk() {
  if (Vy) return Qh;
  Vy = 1;
  var s = yk(), r = 1, i = Object.prototype, l = i.hasOwnProperty;
  function m(g, h, p, M, v, D) {
    var S = p & r, E = s(g), N = E.length, j = s(h), R = j.length;
    if (N != R && !S) return false;
    for (var x = N; x--; ) {
      var X = E[x];
      if (!(S ? X in h : l.call(h, X))) return false;
    }
    var ee = D.get(g), se = D.get(h);
    if (ee && se) return ee == h && se == g;
    var Q = true;
    D.set(g, h), D.set(h, g);
    for (var ge = S; ++x < N; ) {
      X = E[x];
      var B = g[X], J = h[X];
      if (M) var he = S ? M(J, B, X, h, g, D) : M(B, J, X, g, h, D);
      if (!(he === void 0 ? B === J || v(B, J, p, M, D) : he)) {
        Q = false;
        break;
      }
      ge || (ge = X == "constructor");
    }
    if (Q && !ge) {
      var je = g.constructor, Te = h.constructor;
      je != Te && "constructor" in g && "constructor" in h && !(typeof je == "function" && je instanceof je && typeof Te == "function" && Te instanceof Te) && (Q = false);
    }
    return D.delete(g), D.delete(h), Q;
  }
  return Qh = m, Qh;
}
var Xh, Ky;
function vk() {
  if (Ky) return Xh;
  Ky = 1;
  var s = oi(), r = Sa(), i = s(r, "DataView");
  return Xh = i, Xh;
}
var ef, Zy;
function Mk() {
  if (Zy) return ef;
  Zy = 1;
  var s = oi(), r = Sa(), i = s(r, "Promise");
  return ef = i, ef;
}
var tf, Qy;
function Lk() {
  if (Qy) return tf;
  Qy = 1;
  var s = oi(), r = Sa(), i = s(r, "Set");
  return tf = i, tf;
}
var sf, Xy;
function kk() {
  if (Xy) return sf;
  Xy = 1;
  var s = oi(), r = Sa(), i = s(r, "WeakMap");
  return sf = i, sf;
}
var nf, e0;
function Tk() {
  if (e0) return nf;
  e0 = 1;
  var s = vk(), r = $g(), i = Mk(), l = Lk(), m = kk(), g = Bd(), h = yp(), p = "[object Map]", M = "[object Object]", v = "[object Promise]", D = "[object Set]", S = "[object WeakMap]", E = "[object DataView]", N = h(s), j = h(r), R = h(i), x = h(l), X = h(m), ee = g;
  return (s && ee(new s(new ArrayBuffer(1))) != E || r && ee(new r()) != p || i && ee(i.resolve()) != v || l && ee(new l()) != D || m && ee(new m()) != S) && (ee = function(se) {
    var Q = g(se), ge = Q == M ? se.constructor : void 0, B = ge ? h(ge) : "";
    if (B) switch (B) {
      case N:
        return E;
      case j:
        return p;
      case R:
        return v;
      case x:
        return D;
      case X:
        return S;
    }
    return Q;
  }), nf = ee, nf;
}
var af, t0;
function Dk() {
  if (t0) return af;
  t0 = 1;
  var s = ly(), r = fy(), i = sk(), l = wk(), m = Tk(), g = wn(), h = xy(), p = Ry(), M = 1, v = "[object Arguments]", D = "[object Array]", S = "[object Object]", E = Object.prototype, N = E.hasOwnProperty;
  function j(R, x, X, ee, se, Q) {
    var ge = g(R), B = g(x), J = ge ? D : m(R), he = B ? D : m(x);
    J = J == v ? S : J, he = he == v ? S : he;
    var je = J == S, Te = he == S, pe = J == he;
    if (pe && h(R)) {
      if (!h(x)) return false;
      ge = true, je = false;
    }
    if (pe && !je) return Q || (Q = new s()), ge || p(R) ? r(R, x, X, ee, se, Q) : i(R, x, J, X, ee, se, Q);
    if (!(X & M)) {
      var Ot = je && N.call(R, "__wrapped__"), Re = Te && N.call(x, "__wrapped__");
      if (Ot || Re) {
        var zn = Ot ? R.value() : R, Zs = Re ? x.value() : x;
        return Q || (Q = new s()), se(zn, Zs, X, ee, Q);
      }
    }
    return pe ? (Q || (Q = new s()), l(R, x, X, ee, se, Q)) : false;
  }
  return af = j, af;
}
var rf, s0;
function n0() {
  if (s0) return rf;
  s0 = 1;
  var s = Dk(), r = Wd();
  function i(l, m, g, h, p) {
    return l === m ? true : l == null || m == null || !r(l) && !r(m) ? l !== l && m !== m : s(l, m, g, h, i, p);
  }
  return rf = i, rf;
}
var of, a0;
function Yk() {
  if (a0) return of;
  a0 = 1;
  var s = ly(), r = n0(), i = 1, l = 2;
  function m(g, h, p, M) {
    var v = p.length, D = v, S = !M;
    if (g == null) return !D;
    for (g = Object(g); v--; ) {
      var E = p[v];
      if (S && E[2] ? E[1] !== g[E[0]] : !(E[0] in g)) return false;
    }
    for (; ++v < D; ) {
      E = p[v];
      var N = E[0], j = g[N], R = E[1];
      if (S && E[2]) {
        if (j === void 0 && !(N in g)) return false;
      } else {
        var x = new s();
        if (M) var X = M(j, R, N, g, h, x);
        if (!(X === void 0 ? r(R, j, i | l, M, x) : X)) return false;
      }
    }
    return true;
  }
  return of = m, of;
}
var lf, r0;
function i0() {
  if (r0) return lf;
  r0 = 1;
  var s = tg();
  function r(i) {
    return i === i && !s(i);
  }
  return lf = r, lf;
}
var df, o0;
function Ck() {
  if (o0) return df;
  o0 = 1;
  var s = i0(), r = Kh();
  function i(l) {
    for (var m = r(l), g = m.length; g--; ) {
      var h = m[g], p = l[h];
      m[g] = [h, p, s(p)];
    }
    return m;
  }
  return df = i, df;
}
var uf, l0;
function d0() {
  if (l0) return uf;
  l0 = 1;
  function s(r, i) {
    return function(l) {
      return l == null ? false : l[r] === i && (i !== void 0 || r in Object(l));
    };
  }
  return uf = s, uf;
}
var mf, u0;
function Sk() {
  if (u0) return mf;
  u0 = 1;
  var s = Yk(), r = Ck(), i = d0();
  function l(m) {
    var g = r(m);
    return g.length == 1 && g[0][2] ? i(g[0][0], g[0][1]) : function(h) {
      return h === m || s(h, m, g);
    };
  }
  return mf = l, mf;
}
var cf, m0;
function bk() {
  if (m0) return cf;
  m0 = 1;
  var s = uh();
  function r(i, l, m) {
    var g = i == null ? void 0 : s(i, l);
    return g === void 0 ? m : g;
  }
  return cf = r, cf;
}
var gf, c0;
function Fk() {
  if (c0) return gf;
  c0 = 1;
  function s(r, i) {
    return r != null && i in Object(r);
  }
  return gf = s, gf;
}
var hf, g0;
function xk() {
  if (g0) return hf;
  g0 = 1;
  var s = Xp(), r = Sy(), i = wn(), l = Ay(), m = qh(), g = uu();
  function h(p, M, v) {
    M = s(M, p);
    for (var D = -1, S = M.length, E = false; ++D < S; ) {
      var N = g(M[D]);
      if (!(E = p != null && v(p, N))) break;
      p = p[N];
    }
    return E || ++D != S ? E : (S = p == null ? 0 : p.length, !!S && m(S) && l(N, S) && (i(p) || r(p)));
  }
  return hf = h, hf;
}
var ff, h0;
function Nk() {
  if (h0) return ff;
  h0 = 1;
  var s = Fk(), r = xk();
  function i(l, m) {
    return l != null && r(l, m, s);
  }
  return ff = i, ff;
}
var _f, f0;
function Ak() {
  if (f0) return _f;
  f0 = 1;
  var s = n0(), r = bk(), i = Nk(), l = Lg(), m = i0(), g = d0(), h = uu(), p = 1, M = 2;
  function v(D, S) {
    return l(D) && m(S) ? g(h(D), S) : function(E) {
      var N = r(E, D);
      return N === void 0 && N === S ? i(E, D) : s(S, N, p | M);
    };
  }
  return _f = v, _f;
}
var pf, _0;
function p0() {
  if (_0) return pf;
  _0 = 1;
  function s(r) {
    return r;
  }
  return pf = s, pf;
}
var yf, y0;
function Ek() {
  if (y0) return yf;
  y0 = 1;
  function s(r) {
    return function(i) {
      return i?.[r];
    };
  }
  return yf = s, yf;
}
var wf, w0;
function Hk() {
  if (w0) return wf;
  w0 = 1;
  var s = uh();
  function r(i) {
    return function(l) {
      return s(l, i);
    };
  }
  return wf = r, wf;
}
var vf, v0;
function Pk() {
  if (v0) return vf;
  v0 = 1;
  var s = Ek(), r = Hk(), i = Lg(), l = uu();
  function m(g) {
    return i(g) ? s(l(g)) : r(g);
  }
  return vf = m, vf;
}
var Mf, M0;
function jk() {
  if (M0) return Mf;
  M0 = 1;
  var s = Sk(), r = Ak(), i = p0(), l = wn(), m = Pk();
  function g(h) {
    return typeof h == "function" ? h : h == null ? i : typeof h == "object" ? l(h) ? r(h[0], h[1]) : s(h) : m(h);
  }
  return Mf = g, Mf;
}
var Lf, L0;
function qk() {
  if (L0) return Lf;
  L0 = 1;
  function s(r) {
    return function(i, l, m) {
      for (var g = -1, h = Object(i), p = m(i), M = p.length; M--; ) {
        var v = p[r ? M : ++g];
        if (l(h[v], v, h) === false) break;
      }
      return i;
    };
  }
  return Lf = s, Lf;
}
var kf, k0;
function Ik() {
  if (k0) return kf;
  k0 = 1;
  var s = qk(), r = s();
  return kf = r, kf;
}
var Tf, T0;
function Rk() {
  if (T0) return Tf;
  T0 = 1;
  var s = Ik(), r = Kh();
  function i(l, m) {
    return l && s(l, m, r);
  }
  return Tf = i, Tf;
}
var Df, D0;
function Ok() {
  if (D0) return Df;
  D0 = 1;
  var s = Jh();
  function r(i, l) {
    return function(m, g) {
      if (m == null) return m;
      if (!s(m)) return i(m, g);
      for (var h = m.length, p = l ? h : -1, M = Object(m); (l ? p-- : ++p < h) && g(M[p], p, M) !== false; ) ;
      return m;
    };
  }
  return Df = r, Df;
}
var Yf, Y0;
function Uk() {
  if (Y0) return Yf;
  Y0 = 1;
  var s = Rk(), r = Ok(), i = r(s);
  return Yf = i, Yf;
}
var Cf, C0;
function zk() {
  if (C0) return Cf;
  C0 = 1;
  var s = Uk(), r = Jh();
  function i(l, m) {
    var g = -1, h = r(l) ? Array(l.length) : [];
    return s(l, function(p, M, v) {
      h[++g] = m(p, M, v);
    }), h;
  }
  return Cf = i, Cf;
}
var Sf, S0;
function Bk() {
  if (S0) return Sf;
  S0 = 1;
  function s(r, i) {
    var l = r.length;
    for (r.sort(i); l--; ) r[l] = r[l].value;
    return r;
  }
  return Sf = s, Sf;
}
var bf, b0;
function Wk() {
  if (b0) return bf;
  b0 = 1;
  var s = zd();
  function r(i, l) {
    if (i !== l) {
      var m = i !== void 0, g = i === null, h = i === i, p = s(i), M = l !== void 0, v = l === null, D = l === l, S = s(l);
      if (!v && !S && !p && i > l || p && M && D && !v && !S || g && M && D || !m && D || !h) return 1;
      if (!g && !p && !S && i < l || S && m && h && !g && !p || v && m && h || !M && h || !D) return -1;
    }
    return 0;
  }
  return bf = r, bf;
}
var Ff, F0;
function $k() {
  if (F0) return Ff;
  F0 = 1;
  var s = Wk();
  function r(i, l, m) {
    for (var g = -1, h = i.criteria, p = l.criteria, M = h.length, v = m.length; ++g < M; ) {
      var D = s(h[g], p[g]);
      if (D) {
        if (g >= v) return D;
        var S = m[g];
        return D * (S == "desc" ? -1 : 1);
      }
    }
    return i.index - l.index;
  }
  return Ff = r, Ff;
}
var xf, x0;
function Gk() {
  if (x0) return xf;
  x0 = 1;
  var s = up(), r = uh(), i = jk(), l = zk(), m = Bk(), g = jy(), h = $k(), p = p0(), M = wn();
  function v(D, S, E) {
    S.length ? S = s(S, function(R) {
      return M(R) ? function(x) {
        return r(x, R.length === 1 ? R[0] : R);
      } : R;
    }) : S = [p];
    var N = -1;
    S = s(S, g(i));
    var j = l(D, function(R, x, X) {
      var ee = s(S, function(se) {
        return se(R);
      });
      return { criteria: ee, index: ++N, value: R };
    });
    return m(j, function(R, x) {
      return h(R, x, E);
    });
  }
  return xf = v, xf;
}
var Nf, N0;
function Jk() {
  if (N0) return Nf;
  N0 = 1;
  var s = Gk(), r = wn();
  function i(l, m, g, h) {
    return l == null ? [] : (r(m) || (m = m == null ? [] : [m]), g = h ? void 0 : g, r(g) || (g = g == null ? [] : [g]), s(l, m, g));
  }
  return Nf = i, Nf;
}
var Vk = Jk();
const or = Qc(Vk), li = Ks("inquiryGroups", () => {
  const s = tr([]), r = tr(false), i = $d(() => {
    const N = ke();
    if (N.route.name === "group") return s.value.find((j) => j.slug === N.route.params.slug);
  }), l = $d(() => lp.orderBy(s.value.filter((N) => g.value[N.id] > 0), ["title"], ["asc"])), m = $d(() => {
    const N = It();
    return i.value ? N.inquiries.filter((j) => i.value?.inquiryIds.includes(j.id)) : [];
  }), g = $d(() => {
    const N = {}, j = It();
    return s.value.forEach((R) => {
      N[R.id] = j.inquiries.filter((x) => R.inquiryIds.includes(x.id)).length;
    }), N;
  });
  function h(N) {
    return s.value.filter((j) => !j.inquiryIds.includes(N));
  }
  function p(N) {
    if (!i.value) throw new Error("No current inquiry group set");
    s.value = s.value.map((j) => j.id === i.value?.id ? { ...j, name: N.name ?? j.name, titleExt: N.titleExt ?? j.titleExt, description: N.description ?? j.description } : j);
  }
  async function M() {
    if (!i.value) throw new Error("No current inquiry group set");
    try {
      const N = await cu.updateInquiryGroup({ ...i.value });
      return v({ inquiryGroup: N.data.inquiryGroup }), N.data.inquiryGroup;
    } catch (N) {
      if (N?.code === "ERR_CANCELED") return;
      throw Z.error("Error updating inquiry group", { error: N, inquiryGroup: i.value }), N;
    }
  }
  function v(N) {
    s.value = s.value.filter((j) => j.id !== N.inquiryGroup.id).concat(N.inquiryGroup);
  }
  async function D(N) {
    const j = It();
    try {
      const R = await cu.addInquiryToGroup(N.inquiryId, N.inquiryGroupId, N.groupTitle);
      v({ inquiryGroup: R.data.inquiryGroup }), j.addOrUpdateInquiryGroupInList({ inquiry: R.data.inquiry });
    } catch (R) {
      if (R?.code === "ERR_CANCELED") return;
      throw Z.error("Error adding inquiry to group", { error: R, payload: N }), j.load(), R;
    }
  }
  async function S(N) {
    const j = It();
    try {
      const R = await cu.removeInquiryFromGroup(N.inquiryGroupId, N.inquiryId);
      if (j.addOrUpdateInquiryGroupInList({ inquiry: R.data.inquiry }), R.data.inquiryGroup === null) {
        s.value = s.value.filter((x) => x.id !== N.inquiryGroupId);
        return;
      }
      v({ inquiryGroup: R.data.inquiryGroup });
    } catch (R) {
      if (R?.code !== "ERR_CANCELED") throw Z.error("Error removing inquiry from group", { error: R, payload: N }), R;
    } finally {
    }
  }
  function E(N) {
    const j = s.value.find((R) => R.id === N);
    return j ? j.name : re("inquiries", "Invalid Group ID");
  }
  return { inquiryGroups: s, updating: r, inquiryGroupsSorted: l, countInquiriesInInquiryGroups: g, currentInquiryGroup: i, inquiriesInCurrendInquiryGroup: m, addableInquiryGroups: h, setCurrentInquiryGroup: p, setInquiryGroupElement: v, writeCurrentInquiryGroup: M, addInquiryToInquiryGroup: D, removeInquiryFromGroup: S, getInquiryGroupName: E };
}), Kk = { created: "status.created", title: "title", type: "type", access: "configuration.access", owner: "owner.displayName", expire: "configuration.expire", interaction: "status.lastInteraction", countComments: "status.countComments", countSupports: "status.countSupports" }, Zk = { created: re("agora", "Created"), title: re("agora", "Title"), type: re("agora", "Type"), access: re("agora", "Access"), owner: re("agora", "Owner"), expire: re("agora", "Expire"), interaction: re("agora", "Last interaction"), countComments: re("agora", "Comments count"), countSupports: re("agora", "Supports count") }, Qk = { relevant: { id: "relevant", title: re("agora", "Relevant"), titleExt: re("agora", "Relevant inquiries"), description: re("agora", "Relevant inquiries which are relevant to you, because you are a participant, the owner or you are invited. Only inquiries not older than 100 days compared to creation, last interaction, expiration or latest option (for date inquiries) are shown."), pinned: false, showInNavigation: () => true, filterCondition: (s) => !s.status.isArchived && JM.fromSeconds(s.status.relevantThreshold).diffNow("days").days > -100 && (s.currentUserStatus.isInvolved || s.permissions.view && s.configuration.access !== "open") }, my: { id: "my", title: re("agora", "My inquiries"), titleExt: re("agora", "My inquiries"), description: re("agora", "These are all inquiries where you are the owner."), pinned: false, showInNavigation: () => ke().appPermissions.inquiryCreation, filterCondition: (s) => !s.status.isArchived && s.currentUserStatus.isOwner }, private: { id: "private", title: re("agora", "Private inquiries"), titleExt: re("agora", "Private inquiries"), description: re("agora", "All private inquiries, to which you have access."), pinned: false, showInNavigation: () => ke().appPermissions.inquiryCreation, filterCondition: (s) => !s.status.isArchived && s.permissions.view && s.configuration.access === "private" }, participated: { id: "participated", title: re("agora", "Participated"), titleExt: re("agora", "Participated"), description: re("agora", "All inquiries who get participation."), pinned: false, showInNavigation: () => true, filterCondition: (s) => !s.status.isArchived && s.status.countParticipants > 0 }, open: { id: "open", title: re("agora", "Openly accessible inquiries"), titleExt: re("agora", "Openly accessible inquiries"), description: re("agora", "A complete list with all openly accessible inquiries on this site."), pinned: false, showInNavigation: () => ke().appPermissions.inquiryCreation, filterCondition: (s) => !s.status.isArchived && s.configuration.access === "open" }, all: { id: "all", title: re("agora", "All inquiries"), titleExt: re("agora", "All inquiries"), description: re("agora", "All inquiries, where you have access to."), pinned: false, showInNavigation: () => true, filterCondition: (s) => !s.status.isArchived && s.permissions.view }, closed: { id: "closed", title: re("agora", "Closed inquiries"), titleExt: re("agora", "Closed inquiries"), description: re("agora", "All closed inquiries, where voting is disabled."), pinned: false, showInNavigation: () => true, filterCondition: (s) => !s.status.isArchived && s.status.isExpired && s.permissions.view }, archived: { id: "archived", title: re("agora", "Archive"), titleExt: re("agora", "My archived inquiries"), description: re("agora", "Your archived inquiries are only accessible to you."), pinned: true, showInNavigation: () => ke().appPermissions.inquiryCreation, filterCondition: (s) => s.status.isArchived && s.permissions.view }, admin: { id: "admin", title: re("agora", "Administration"), titleExt: re("agora", "Administrative access"), description: re("agora", "You can delete, archive and take over inquiries in this list, but access is still not possible."), pinned: true, showInNavigation: () => !!ke().currentUser?.isAdmin, filterCondition: (s) => s.permissions.view } }, It = Ks("inquiries", { state: () => ({ inquiries: [], meta: { chunks: { size: 20, loaded: 1 }, maxInquiriesInNavigation: 6, status: "" }, sort: { by: "created", reverse: true }, status: { loadingGroups: false }, categories: Qk, currentFilter: "relevant", advancedFilters: {} }), getters: { navigationCategories(s) {
  return Object.values(s.categories).filter((r) => r.showInNavigation());
}, navigationListWithFilters: (s) => (r) => {
  let i = s.inquiries.filter((l) => s.categories[r].filterCondition(l));
  return s.advancedFilters.type && (i = i.filter((l) => l.type === s.advancedFilters.type)), or(i, ["created"], ["desc"]).slice(0, s.meta.maxInquiriesInNavigation);
}, navigationList: (s) => (r) => or(s.inquiries.filter((i) => s.categories[r].filterCondition(i)) ?? [], ["created"], ["desc"]).slice(0, s.meta.maxInquiriesInNavigation), currentCategory(s) {
  const r = ke();
  return r.route.name === "list" && r.route.params.type ? s.categories[r.route.params.type] : s.categories.relevant;
}, inquiriesFilteredSorted(s) {
  const r = ke(), i = li();
  if (r.route.name === "group") return i.inquiriesInCurrendInquiryGroup;
  let l = s.inquiries.filter((m) => this.currentCategory?.filterCondition(m)) ?? [];
  if (s.advancedFilters.type && (l = l.filter((m) => m.type === s.advancedFilters.type)), s.advancedFilters.categoryId && (l = l.filter((m) => m.categoryId === s.advancedFilters.categoryId)), s.advancedFilters.locationId && (l = l.filter((m) => m.locationId === s.advancedFilters.locationId)), s.advancedFilters.hasComments !== void 0 && (l = l.filter((m) => s.advancedFilters.hasComments ? m.status.countComments > 0 : m.status.countComments === 0)), s.advancedFilters.hasSupports !== void 0 && (l = l.filter((m) => s.advancedFilters.hasSupports ? m.status.countSupports > 0 : m.status.countSupports === 0)), s.advancedFilters.search) {
    const m = s.advancedFilters.search.toLowerCase();
    l = l.filter((g) => g.title.toLowerCase().includes(m) || g.description.toLowerCase().includes(m));
  }
  return or(l, [Kk[s.sort.by]], [s.sort.reverse ? "desc" : "asc"]);
}, chunkedList() {
  return this.inquiriesFilteredSorted.slice(0, this.loaded);
}, inquiriesCount(s) {
  const r = {};
  for (const [i, l] of Object.entries(s.categories)) r[i] = s.inquiries.filter((m) => l.filterCondition(m)).length;
  return r;
}, dashboardList(s) {
  return or(s.inquiries.filter((r) => s.categories.relevant.filterCondition(r)), ["created"], ["desc"]).slice(0, 7);
}, loaded(s) {
  return s.meta.chunks.loaded * s.meta.chunks.size;
}, proposalInquiries(s) {
  return s.inquiries.filter((r) => r.type === "proposal" && !r.status.isArchived);
}, inquiriesLoading(s) {
  return s.meta.status === "loading";
}, countByCategory: (s) => (r) => s.inquiries.filter((i) => s.categories[r].filterCondition(i)).length }, actions: { setFilters(s) {
  this.advancedFilters = { ...s }, this.resetChunks();
}, resetFilters() {
  this.advancedFilters = {}, this.resetChunks();
}, setCurrentFilter(s) {
  this.currentFilter = s, this.resetChunks(), this.resetFilters();
}, updateFilter(s, r) {
  this.advancedFilters[s] = r, this.resetChunks();
}, async load(s = true) {
  const r = li();
  if (this.meta.status === "loading" || !s && this.meta.status === "loaded") {
    Z.debug("Inquiries already loaded or loading, skipping load", { status: this.meta.status, forced: s });
    return;
  }
  this.meta.status = "loading";
  try {
    const i = await rt.getInquiries();
    this.inquiries = i.data.inquiries, r.inquiryGroups = i.data.inquiryGroups, this.meta.status = "loaded";
  } catch (i) {
    if (i?.code === "ERR_CANCELED") return;
    throw this.meta.status = "error", Z.error("Error loading inquiries", { error: i }), i;
  }
}, groupList(s) {
  return or(this.inquiries.filter((r) => s.includes(r.id)) ?? [], ["created"], ["desc"]).slice(0, this.meta.maxInquiriesInNavigation);
}, addOrUpdateInquiryGroupInList(s) {
  this.inquiries = this.inquiries.filter((r) => r.id !== s.inquiry?.id).concat(s.inquiry);
}, reset() {
  this.$reset();
}, async changeOwner(s) {
  try {
    await rt.changeOwner(s.inquiryId, s.userId);
  } catch (r) {
    if (r?.code === "ERR_CANCELED") return;
    throw Z.error("Error changing inquiry owner", { error: r, payload: s }), r;
  } finally {
    this.load();
  }
}, addChunk() {
  this.meta.chunks.loaded = this.meta.chunks.loaded + 1;
}, resetChunks() {
  this.meta.chunks.loaded = 1;
}, async clone(s) {
  try {
    await rt.cloneInquiry(s.inquiryId);
  } catch (r) {
    if (r?.code === "ERR_CANCELED") return;
    throw Z.error("Error cloning inquiry", { error: r, payload: s }), r;
  } finally {
    this.load();
  }
}, async delete(s) {
  try {
    await rt.deleteInquiry(s.inquiryId);
  } catch (r) {
    if (r?.code === "ERR_CANCELED") return;
    throw Z.error("Error deleting inquiry", { error: r, payload: s }), r;
  } finally {
    this.load();
  }
}, async toggleArchive(s) {
  try {
    await rt.toggleArchive(s.inquiryId);
  } catch (r) {
    if (r?.code === "ERR_CANCELED") return;
    throw Z.error("Error archiving/restoring inquiry", { error: r, payload: s }), r;
  } finally {
    this.load();
  }
}, async takeOver(s) {
  try {
    await rt.takeOver(s.inquiryId);
  } catch (r) {
    if (r?.code === "ERR_CANCELED") return;
    throw Z.error("Error archiving/restoring inquiry", { error: r, payload: s }), r;
  } finally {
    this.load();
  }
} } }), Af = Ks("comments", { state: () => ({ comments: [] }), getters: { count: (s) => s.comments.length, groupedComments: (s) => mL(s.comments) }, actions: { async load() {
  const s = ke();
  try {
    const r = await (s.route.name === "publicInquiry" ? Ge.getComments(s.route.params.token) : s.route.name === "inquiry" ? No.getComments(s.currentInquiryId) : null);
    if (!r) {
      this.$reset();
      return;
    }
    this.comments = r.data.comments;
  } catch (r) {
    if (r?.code === "ERR_CANCELED") return;
    this.$reset();
  }
}, async add(s) {
  const r = ke();
  try {
    if (!await (r.route.name === "publicInquiry" ? Ge.addComment(r.publicToken, s.message, s.confidential) : r.route.name === "inquiry" ? No.addComment(r.currentInquiryId, s.message, s.confidential) : null)) {
      this.$reset();
      return;
    }
    this.load();
  } catch (i) {
    if (i?.code === "ERR_CANCELED") return;
    throw Z.error("Error writing comment", { error: i, payload: s }), i;
  }
}, setItem(s) {
  const r = this.comments.findIndex((i) => i.id === s.comment.id);
  r < 0 ? this.comments.push(s.comment) : this.comments[r] = Object.assign(this.comments[r], s.comment);
}, async delete(s) {
  const r = ke();
  try {
    const i = await (r.route.name === "publicInquiry" ? Ge.deleteComment(r.publicToken, s.comment.id) : No.deleteComment(s.comment.id));
    this.setItem({ comment: i.data.comment });
  } catch (i) {
    if (i?.code === "ERR_CANCELED") return;
    throw Z.error("Error deleting comment", { error: i, payload: s }), i;
  }
}, async restore(s) {
  const r = ke();
  try {
    const i = await (r.route.name === "publicInquiry" ? Ge.restoreComment(r.publicToken, s.comment.id) : No.restoreComment(s.comment.id));
    this.setItem({ comment: i.data.comment });
  } catch (i) {
    if (i?.code === "ERR_CANCELED") return;
    throw Z.error("Error restoring comment", { error: i, payload: s }), i;
  }
} } }), bo = Ks("supports", { state: () => ({ supports: [] }), getters: { count: (s) => s.supports.length, groupedSupports: (s) => cL(s.supports), hasSupport: (s) => (r, i) => s.supports.some((l) => l.userId === i) }, actions: { toggleSupport(s, r) {
  this.hasSupport(s, r) ? this.removeSupport(s, r) : this.addSupport(s, r);
}, async load() {
  const s = ke();
  try {
    const r = await (s.route.name === "publicInquiry" ? Ge.getSupports(s.route.params.token) : s.route.name === "inquiry" ? lr.getInquiryId(s.currentInquiryId) : null);
    if (!r) {
      this.$reset();
      return;
    }
    this.supports = r.data.supports;
  } catch (r) {
    if (r?.code === "ERR_CANCELED") return;
    this.$reset();
  }
}, async add() {
  const s = ke();
  try {
    if (!await (s.route.name === "publicInquiry" ? Ge.addSupport(s.publicToken, s.currentInquiryId, s.currentUser.id) : s.route.name === "inquiry" ? lr.addSupport(s.currentInquiryId, s.currentUser.id) : null)) {
      this.$reset();
      return;
    }
    this.load();
  } catch (r) {
    if (r?.code === "ERR_CANCELED") return;
    throw Z.error("Error writing support", { error: r }), r;
  }
}, async remove() {
  const s = ke();
  try {
    await (s.route.name === "publicInquiry" ? Ge.removeSupport(s.publicToken, s.currentInquiryId, s.currentUser.id) : lr.removeSupport(s.currentInquiryId, s.currentUser.id));
  } catch (r) {
    if (r?.code === "ERR_CANCELED") return;
    throw Z.error("Error deleting support", { error: r }), r;
  }
}, async addSupport(s, r) {
  try {
    await lr.addSupport(s, r), this.supports.push({ inquiryId: s, userId: r, created: Date.now() });
  } catch (i) {
    throw console.error("Error removing support", i), Z.error("Error removing suppport:", { error: i, userId: r, inquiryId: s, state: this.$state }), i;
  }
}, async removeSupport(s, r) {
  try {
    await lr.removeSupport(s, r), this.supports = this.supports.filter((i) => !(i.userId === r && i.inquiryId === s));
  } catch (i) {
    throw Z.error("Error removing suppport:", { error: i, userId: r, inquiryId: s, state: this.$state }), i;
  }
}, async restore(s) {
  const r = ke();
  try {
    const i = await (r.route.name === "publicInquiry" ? Ge.restoreSupport(r.publicToken, s.support.id) : lr.restoreSupport(s.support.id));
    this.setItem({ support: i.data.support });
  } catch (i) {
    if (i?.code === "ERR_CANCELED") return;
    throw Z.error("Error restoring support", { error: i, payload: s }), i;
  }
} } }), Ef = Ks("options", { state: () => ({ options: [], ranked: "no" }), getters: { countAvailable(s) {
  return s.options.filter((r) => !r.locked && !r.deleted).length;
}, countInquirydByCurrentUser(s) {
  return s.options.filter((r) => r.inquiries.currentUser === "yes").length;
}, countOptionsLeft() {
  return this.countAvailable - this.countInquirydByCurrentUser;
}, rankedOptions(s) {
  return or(s.options, ["inquiries.yes", "inquiries.maybe"], ["desc", "desc"]);
}, sortedOptions(s) {
  return di().type === "proposal" ? or(s.options, ["timestamp", "duration"], ["asc", "asc"]) : s.options;
}, orderedOptions(s) {
  return s.ranked === "yes" ? this.rankedOptions : this.sortedOptions;
}, confirmed(s) {
  return s.options.filter((r) => r.confirmed > 0);
}, countSuggestions(s) {
  return s.options.filter((r) => r.owner !== null).length;
} }, actions: { find(s, r) {
  return this.options.find((i) => i.timestamp === s && i.duration === r);
}, async load() {
  const s = ke();
  try {
    const r = await (s.route.name === "publicInquiry" ? Ge.getOptions(s.route.params.token) : s.currentInquiryId ? bs.getOptions(s.currentInquiryId) : null);
    if (!r) {
      this.$reset();
      return;
    }
    this.options = r.data.options;
  } catch (r) {
    if (r?.code === "ERR_CANCELED") return;
    throw Z.error("Error loding options", { error: r, inquiryId: s.currentInquiryId }), r;
  }
}, updateOption(s) {
  const r = this.options.findIndex((i) => i.id === s.option.id);
  r < 0 ? this.options.push(s.option) : this.options.splice(r, 1, s.option), this.options.sort((i, l) => i.order < l.order ? -1 : i.order > l.order ? 1 : 0);
}, async add(s, r = null, i = false) {
  const l = ke();
  try {
    const m = await (l.route.name === "publicInquiry" ? Ge.addOption(l.route.params.token, s, r, i) : bs.addOption(l.currentInquiryId, s, r, i));
    if (this.options = m.data.options, m.data.inquiries) {
      const g = It();
      g.inquiries = m.data.inquiries;
    }
  } catch (m) {
    if (m?.code !== "ERR_CANCELED") throw Z.error("Error adding option", { error: m, simpleOption: s }), this.load(), m;
  }
}, async update(s) {
  try {
    const r = await bs.updateOption(s.option);
    this.updateOption({ option: r.data.option });
  } catch (r) {
    throw Z.error("Error updating option", { error: r, payload: s }), this.load(), r;
  }
}, async delete(s) {
  const r = ke();
  try {
    const i = await (r.route.name === "publicInquiry" ? Ge.deleteOption(r.route.params.token, s.option.id) : bs.deleteOption(s.option.id));
    this.updateOption({ option: i.data.option });
  } catch (i) {
    if (i?.code === "ERR_CANCELED") return;
    throw Z.error("Error deleting option", { error: i, payload: s }), i;
  }
}, async restore(s) {
  const r = ke();
  try {
    const i = await (r.route.name === "publicInquiry" ? Ge.restoreOption(r.route.params.token, s.option.id) : bs.restoreOption(s.option.id));
    this.updateOption({ option: i.data.option });
  } catch (i) {
    if (i?.code === "ERR_CANCELED") return;
    throw Z.error("Error restoring option", { error: i, payload: s }), i;
  }
}, async addBulk(s) {
  const r = ke();
  try {
    const i = await bs.addOptions(r.currentInquiryId, s.text);
    this.options = i.data.options;
  } catch (i) {
    if (i?.code === "ERR_CANCELED") return;
    throw Z.error("Error adding option", { error: i, payload: s }), this.load(), i;
  }
}, async confirm(s) {
  const r = this.options.findIndex((i) => i.id === s.option.id);
  this.options[r].confirmed = Math.abs(this.options[r].confirmed - 1);
  try {
    const i = await bs.confirmOption(s.option.id);
    this.updateOption({ option: i.data.option });
  } catch (i) {
    if (i?.code === "ERR_CANCELED") return;
    throw Z.error("Error confirming option", { error: i, payload: s }), this.load(), i;
  }
}, async changeOrder(s, r) {
  const i = ke();
  this.options.splice(r, 0, this.options.splice(s, 1)[0]);
  try {
    const l = await bs.reorderOptions(i.currentInquiryId, this.options.map(({ id: m, text: g }) => ({ id: m, text: g })));
    this.options = l.data.options;
  } catch (l) {
    throw Z.error("Error reordering option", { error: l, options: this.options, oldIndex: s, newIndex: r }), this.load(), l;
  }
}, async sequence(s) {
  try {
    const r = await bs.addOptionsSequence(s.option.id, s.sequence);
    this.options = r.data.options;
  } catch (r) {
    if (r?.code === "ERR_CANCELED") return;
    throw Z.error("Error creating sequence", { error: r, payload: s }), this.load(), r;
  }
}, async shift(s) {
  const r = ke();
  try {
    const i = await bs.shiftOptions(r.currentInquiryId, s.shift.value, s.shift.unit.id);
    this.options = i.data.options;
  } catch (i) {
    if (i?.code === "ERR_CANCELED") return;
    throw Z.error("Error shifting dates", { error: i, payload: s }), this.load(), i;
  }
} } }), Hf = Ks("shares", { state: () => ({ shares: [] }), getters: { active: (s) => {
  const r = ["email", "external", "contact"], i = ["user", "group", "admin", "public"];
  return s.shares.filter((l) => !l.locked && (i.includes(l.type) || r.includes(l.type) && (l.type === "external" || l.invitationSent || l.supportedd)));
}, locked: (s) => s.shares.filter((r) => !!r.locked), unsentInvitations: (s) => s.shares.filter((r) => (r.user.emailAddress || r.type === "group" || r.type === "contactGroup" || r.type === "circle") && !r.invitationSent && !r.locked && !r.supported), public: (s) => s.shares.filter((r) => r.type === "public"), hasShares: (s) => s.shares.length > 0, hasLocked() {
  return this.locked.length > 0;
} }, actions: { async load(s = "inquiry") {
  let r = 0;
  if (s === "inquiryGroup") {
    const i = li();
    if (Z.info("Loading group shares"), !i.currentInquiryGroup) throw new Error("Current group is not set");
    r = i.currentInquiryGroup.id;
  } else Z.info("Loading inquiry shares"), r = ke().currentInquiryId;
  try {
    const i = await Qt.getShares(r, s);
    this.shares = i.data.shares;
  } catch (i) {
    this.handleError(i, "Error loading shares", { inquiryId: r });
  }
}, async add(s, r = "inquiry") {
  let i = 0;
  if (r === "inquiryGroup") {
    const l = li();
    if (!l.currentInquiryGroup) throw new Error("Current group is not set");
    i = l.currentInquiryGroup.id;
  } else i = ke().currentInquiryId;
  try {
    const l = await Qt.addUserShare(i, s, r);
    this.shares.push(l.data.share);
  } catch (l) {
    this.handleError(l, "Error adding user share", { purpose: r, id: i, payload: s });
  }
}, async addPublicShare() {
  const s = ke();
  try {
    const r = await Qt.addPublicShare(s.currentInquiryId);
    this.shares.push(r.data.share);
  } catch (r) {
    this.handleError(r, "Error adding public share", { inquiryId: s.currentInquiryId });
  }
}, update(s) {
  const r = this.shares.findIndex((i) => i.id === s.share.id);
  Object.assign(this.shares[r], s.share);
}, async switchAdmin(s) {
  const r = s.share.type === "user" ? "admin" : "user";
  try {
    const i = await Qt.switchAdmin(s.share.token, r);
    this.update(i.data);
  } catch (i) {
    this.handleError(i, `Error switching type to ${r}`, s);
  }
}, async setPublicInquiryEmail(s) {
  try {
    const r = await Qt.setEmailAddressConstraint(s.share.token, s.value);
    this.update(r.data);
  } catch (r) {
    this.handleError(r, "Error changing email register setting", s);
  }
}, async writeLabel(s) {
  try {
    const r = await Qt.writeLabel(s.token, s.label);
    this.update(r.data);
  } catch (r) {
    this.handleError(r, "Error writing label", s);
  }
}, async inviteAll(s) {
  try {
    const r = await Qt.inviteAll(s.inquiryId);
    return this.load(), r;
  } catch (r) {
    this.handleError(r, "Error inviting all users", s);
  }
}, async sendInvitation(s) {
  try {
    const r = await Qt.sendInvitation(s.share.token);
    return this.load(), r.data;
  } catch (r) {
    this.handleError(r, "Error sending share invitation", s);
  }
}, async resolveGroup(s) {
  try {
    await Qt.resolveShare(s.share.token), this.load();
  } catch (r) {
    this.handleError(r, "Error resolving group share", s);
  }
}, async lock(s) {
  try {
    const r = await Qt.lockShare(s.share.token);
    this.update(r.data);
  } catch (r) {
    this.handleError(r, "Error locking share", s);
  }
}, async unlock(s) {
  try {
    const r = await Qt.unlockShare(s.share.token);
    this.update(r.data);
  } catch (r) {
    this.handleError(r, "Error unlocking share", s);
  }
}, async delete(s) {
  try {
    const r = await Qt.deleteShare(s.share.token);
    this.update(r.data);
  } catch (r) {
    this.handleError(r, "Error deleting share", s);
  }
}, async restore(s) {
  try {
    const r = await Qt.restoreShare(s.share.token);
    this.update(r.data);
  } catch (r) {
    this.handleError(r, "Error restoring share", s);
  }
}, handleError(s, r, i) {
  if (s?.code !== "ERR_CANCELED") throw Z.error(r, { error: s, payload: i }), this.load(), s;
} } });
re("inquiries", "Minute"), re("inquiries", "Hour"), re("inquiries", "Day"), re("inquiries", "Week"), re("inquiries", "Month"), re("inquiries", "Year");
var Pf = ((s) => (s.TransitionsOff = "agora:transitions:off", s.TransitionsOn = "agora:transitions:on", s.UpdateInquiry = "agora:inquiry:update", s.LoadInquiry = "agora:inquiry:load", s.SidebarChangeTab = "agora:sidebar:changeTab", s.SidebarToggle = "agora:sidebar:toggle", s.ChangeShares = "agora:change:shares", s.UpdateOptions = "agora:options:update", s.AddDate = "agora:options:add-date", s.UpdateComments = "agora:comments:update", s.UpdateSupports = "agora:supports:update", s.UpdateActivity = "agora:activity:update", s.ShowSettings = "agora:settings:show", s))(Pf || {});
function Fo() {
  return {};
}
const A0 = Ks("subscription", () => {
  const s = tr(false), r = () => {
    s.value = false;
  };
  async function i() {
    const m = ke();
    try {
      const g = await (m.route.name === "publicInquiry" ? Ge.getSubscription(m.route.params.token) : m.route.name === "inquiry" ? rt.getSubscription(m.currentInquiryId) : null);
      if (g) {
        s.value = g.data.subscribed;
        return;
      }
      s.value = false;
    } catch (g) {
      if (g?.code === "ERR_CANCELED") return;
      throw s.value = false, g;
    }
  }
  async function l() {
    const m = ke();
    try {
      const g = await (m.route.name === "publicInquiry" ? Ge.setSubscription(m.route.params.token, !s.value) : m.route.name === "inquiry" ? rt.setSubscription(m.currentInquiryId, !s.value) : null);
      if (g) {
        s.value = g.data.subscribed;
        return;
      }
      s.value = false;
    } catch (g) {
      if (g?.code === "ERR_CANCELED") return;
      throw Z.error("Error on changing subscription", { error: g }), g;
    }
  }
  return { subscribed: s, load: i, reset: r, write: l };
}), xo = 480;
let E0 = null;
const ke = Ks("session", { state: () => ({ appPermissions: { addShares: false, addSharesExternal: false, allAccess: false, changeForeignInquiries: false, comboView: false, deanonymizeInquiry: false, inquiryCreation: false, inquiryDownload: false, publicShares: false, seeMailAddresses: false, unrestrictedOwner: false }, sessionSettings: { manualViewProjectInquiry: "", manualViewPetitionInquiry: "", manualViewDebateInquiry: "", manualViewProposalInquiry: "", manualViewSuggestionInquiry: "", manualViewOfficialInquiry: "" }, appSettings: Fo(), route: { currentRoute: "", name: "", path: "", params: { id: 0, token: "", type: "relevant", slug: "" } }, userStatus: { isLoggedin: !!Gd(), isAdmin: !!Gd()?.isAdmin, isOfficial: !!Gd()?.isOfficial, isModerator: !!Gd()?.isModerator }, watcher: { id: "", mode: "noInquirying", status: "stopped", lastUpdate: Math.floor(Date.now() / 1e3) }, token: null, currentUser: Fo(), share: Fo(), isLoaded: false }), getters: { publicToken(s) {
  return s.route.params.token ? s.route.params.token : "";
}, currentInquiryId(s) {
  return s.route.name === "inquiry" ? Number(s.route.params.id) : 0;
}, viewProjectInquiry(s) {
  const r = ir();
  return s.sessionSettings.manualViewProjectInquiry ? s.sessionSettings.manualViewProjectInquiry : window.innerWidth > xo ? r.user.defaultViewProjectInquiry : "list-view";
}, viewProposalInquiry(s) {
  const r = ir();
  return s.sessionSettings.manualViewProposalInquiry ? s.sessionSettings.manualViewProposalInquiry : window.innerWidth > xo ? r.user.defaultViewProposalInquiry : "list-view";
}, viewDebateInquiry(s) {
  const r = ir();
  return s.sessionSettings.manualViewDebateInquiry ? s.sessionSettings.manualViewDebateInquiry : window.innerWidth > xo ? r.user.defaultViewDebateInquiry : "list-view";
}, viewGrievanceInquiry(s) {
  const r = ir();
  return s.sessionSettings.manualViewGrievanceInquiry ? s.sessionSettings.manualViewGrievanceInquiry : window.innerWidth > xo ? r.user.defaultViewGrievanceInquiry : "list-view";
}, viewPetitionInquiry(s) {
  const r = ir();
  return s.sessionSettings.manualViewPetitionInquiry ? s.sessionSettings.manualViewPetitionInquiry : window.innerWidth > xo ? r.user.defaultViewPetitionInquiry : "list-view";
}, windowTitle(s) {
  const r = di(), i = { prefix: `${re("agora", "Agora")}`, name: "Nextcloud" };
  if (s.route.name === "list") {
    const l = It();
    i.name = l.categories[this.route.params.type].titleExt;
  } else if (s.route.name === "group") {
    const l = li();
    i.name = l.currentInquiryGroup?.titleExt || l.currentInquiryGroup?.name || "";
  } else s.route.name === "publicInquiry" ? i.name = r.title : s.route.name === "inquiry" && (i.name = r.title ?? re("agora", "Enter title"));
  return `${i.prefix} – ${i.name}`;
} }, actions: { generateWatcherId() {
  this.watcher.id = Math.random().toString(36).substring(2);
}, async load(s, r = false, i = false) {
  if (Z.debug("Loading session"), !i && this.isLoaded && this.currentUser.id === E0) {
    Z.debug("Session already loaded for same user, skipping, route set to:", s), s !== null && await this.setRouter(s);
    return;
  }
  if (this.generateWatcherId(), s !== null && (Z.debug("Set requested route", { to: s }), await this.setRouter(s), Z.debug("Route set", { route: this.route })), r) {
    Z.debug("Same route, skipping session load");
    return;
  }
  try {
    const l = await (this.route.name === "publicInquiry" ? Ge.getSession(this.publicToken) : z0.getSession());
    this.$patch(l.data), this.isLoaded = true, E0 = this.currentUser.id;
  } catch (l) {
    if (l?.code === "ERR_CANCELED") return;
    if (this.$reset(), this.route.name === null) this.$reset();
    else throw l;
  }
  Z.debug("Session loaded");
}, setViewProposalInquiry(s) {
  this.sessionSettings.manualViewProposalInquiry = s;
}, setViewProjectInquiry(s) {
  this.sessionSettings.manualViewProjectInquiry = s;
}, setViewDebateInquiry(s) {
  this.sessionSettings.manualViewDebateInquiry = s;
}, setViewPetitionInquiry(s) {
  this.sessionSettings.manualViewPetitionInquiry = s;
}, setViewGrievanceInquiry(s) {
  this.sessionSettings.manualViewGrievanceInquiry = s;
}, async setRouter(s) {
  this.route.currentRoute = s.fullPath, this.route.name = s.name, this.route.path = s.path, this.route.params.id = s.params.id, this.route.params.token = s.params.token, this.route.params.type = s.params.type, this.route.params.slug = s.params.slug;
}, async loadShare() {
  if (this.route.name !== "publicInquiry") {
    this.share = Fo();
    return;
  }
  try {
    const s = await Ge.getShare(this.publicToken);
    this.share = s.data.share;
  } catch (s) {
    if (s?.code === "ERR_CANCELED") return;
    throw Z.error("Error retrieving share", { error: s }), s;
  }
}, async updateEmailAddress(s) {
  const r = di();
  if (this.route.name === "publicInquiry") try {
    const i = await Ge.setEmailAddress(this.publicToken, s.emailAddress);
    this.share = i.data.share, r.load();
  } catch (i) {
    if (i?.code === "ERR_CANCELED") return;
    throw Z.error("Error writing email address", { error: i, payload: s }), i;
  }
}, async updateDisplayName(s) {
  const r = di();
  if (this.route.name === "publicInquiry") try {
    const i = await Ge.setDisplayName(this.publicToken, s.displayName);
    this.share = i.data.share, r.load();
  } catch (i) {
    if (i?.code === "ERR_CANCELED") return;
    throw Z.error("Error changing name", { error: i, payload: s }), i;
  }
}, async deleteEmailAddress() {
  const s = di(), r = A0();
  if (this.route.name === "publicInquiry") try {
    const i = await Ge.deleteEmailAddress(this.publicToken);
    this.share = i.data.share, r.$state.subscribed = false, r.write(), s.load();
  } catch (i) {
    if (i?.code === "ERR_CANCELED") return;
    throw Z.error("Error deleting email address", { error: i }), i;
  }
}, async resendInvitation() {
  if (this.route.name !== "publicInquiry") throw new Error("Not on public inquiry page");
  try {
    return await Ge.resendInvitation(this.publicToken);
  } catch (s) {
    if (s?.code === "ERR_CANCELED") return;
    throw Z.error("Error sending invitation", { error: s, token: this.route.params.token }), s;
  }
} } }), Xk = { baseURL: VM("apps/agora/"), headers: { Accept: "application/json", "Nc-Agora-Client-Time-Zone": Intl.DateTimeFormat().resolvedOptions().timeZone } }, eT = { baseURL: KM("apps/"), headers: { Accept: "application/json" } }, tT = sg.CancelToken, q = sg.create(Xk), sT = sg.create(eT);
q.interceptors.request.use((s) => {
  try {
    const r = ke();
    s.headers = { ...s.headers, "Nc-Agora-Client-Id": r.watcher.id };
  } catch {
  }
  return s;
});
const Rt = (s) => {
  const r = {};
  return Object.getOwnPropertyNames(s).forEach((i) => {
    const l = { cancelToken: void 0 };
    r[i] = { handleRequestCancellation: () => (l.cancelToken && l.cancelToken.cancel(`${i} canceled`), l.cancelToken = tT.source(), l.cancelToken) };
  }), r;
}, H0 = { getActivities(s) {
  return sT.request({ method: "GET", url: "activity/api/v2/activity/inquiries", params: { format: "json", since: 0, limit: 50, object_type: "inquiry", object_id: s }, cancelToken: nT[this.getActivities.name].handleRequestCancellation().token });
} }, nT = Rt(H0), P0 = { runAutoReminder() {
  return q.request({ method: "GET", url: "administration/autoreminder/run", cancelToken: jf[this.runAutoReminder.name].handleRequestCancellation().token });
}, runJanitor() {
  return q.request({ method: "GET", url: "administration/janitor/run", cancelToken: jf[this.runJanitor.name].handleRequestCancellation().token });
}, runNotification() {
  return q.request({ method: "GET", url: "administration/notification/run", cancelToken: jf[this.runNotification.name].handleRequestCancellation().token });
} }, jf = Rt(P0), j0 = { getAppSettings() {
  return q.request({ method: "GET", url: "settings/app", params: { time: +/* @__PURE__ */ new Date() }, cancelToken: ms[this.getAppSettings.name].handleRequestCancellation().token });
}, writeAppSettings(s) {
  return q.request({ method: "POST", url: "settings/app", data: { appSettings: s }, cancelToken: ms[this.writeAppSettings.name].handleRequestCancellation().token });
}, getGroups(s) {
  return q.request({ method: "GET", url: `groups${s.trim() ? `/${s.trim()}` : ""}`, cancelToken: ms[this.getGroups.name].handleRequestCancellation().token });
}, getUsers(s, r) {
  return q.request({ method: "GET", url: `search/users${s.trim() ? `/${s.trim()}` : ""}`, params: { types: r.toString() }, cancelToken: ms[this.getUsers.name].handleRequestCancellation().token });
}, addCategory(s) {
  return q.request({ method: "POST", url: "settings/categories", data: { category: s }, cancelToken: ms[this.addCategory.name].handleRequestCancellation().token });
}, deleteCategory(s) {
  return q.request({ method: "DELETE", url: `settings/categories/${s}`, cancelToken: ms[this.deleteCategory.name].handleRequestCancellation().token });
}, updateCategory(s, r, i) {
  return q.request({ method: "PUT", url: `settings/categories/${s}`, data: { name: r, parentId: i }, cancelToken: ms[this.updateCategory.name].handleRequestCancellation().token });
}, addLocation(s) {
  return q.request({ method: "POST", url: "settings/locations", data: { location: s }, cancelToken: ms[this.addLocation.name].handleRequestCancellation().token });
}, deleteLocation(s) {
  return q.request({ method: "DELETE", url: `settings/locations/${s}`, cancelToken: ms[this.deleteLocation.name].handleRequestCancellation().token });
}, updateLocation(s, r, i) {
  return q.request({ method: "PUT", url: `settings/locations/${s}`, data: { name: r, parentId: i }, cancelToken: ms[this.updateLocation.name].handleRequestCancellation().token });
}, addModerationStatus(s) {
  return q.request({ method: "POST", url: "settings/moderation-statuses", data: { moderationStatus: s }, cancelToken: ms[this.addModerationStatus.name].handleRequestCancellation().token });
}, deleteModerationStatus(s) {
  return q.request({ method: "DELETE", url: `settings/moderation-statuses/${s}`, cancelToken: ms[this.deleteModerationStatus.name].handleRequestCancellation().token });
}, updateModerationStatus(s, r) {
  return q.request({ method: "PUT", url: `settings/moderation-statuses/${s}`, data: { moderationStatus: r }, cancelToken: ms[this.updateModerationStatus.name].handleRequestCancellation().token });
} }, ms = Rt(j0), q0 = { getCalendars() {
  return q.request({ method: "GET", url: "calendars", params: { time: +/* @__PURE__ */ new Date() }, cancelToken: I0[this.getCalendars.name].handleRequestCancellation().token });
}, getEvents(s) {
  return q.request({ method: "GET", url: `option/${s}/events`, params: { tz: Intl.DateTimeFormat().resolvedOptions().timeZone, time: +/* @__PURE__ */ new Date() }, cancelToken: I0[this.getEvents.name].handleRequestCancellation().token });
} }, I0 = Rt(q0), No = { getComments(s) {
  return q.request({ method: "GET", url: `inquiry/${s}/comments`, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: mu[this.getComments.name].handleRequestCancellation().token });
}, addComment(s, r, i = false) {
  return q.request({ method: "POST", url: `inquiry/${s}/comment`, data: { message: r, confidential: i }, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: mu[this.addComment.name].handleRequestCancellation().token });
}, deleteComment(s) {
  return q.request({ method: "DELETE", url: `comment/${s}`, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: mu[this.deleteComment.name].handleRequestCancellation().token });
}, restoreComment(s) {
  return q.request({ method: "PUT", url: `comment/${s}/restore`, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: mu[this.restoreComment.name].handleRequestCancellation().token });
} }, mu = Rt(No), bs = { getOptions(s) {
  return q.request({ method: "GET", url: `inquiry/${s}/options`, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: vn[this.getOptions.name].handleRequestCancellation().token });
}, addOption(s, r, i) {
  return q.request({ method: "POST", url: `inquiry/${s}/option`, data: { option: r, sequence: i }, cancelToken: vn[this.addOption.name].handleRequestCancellation().token });
}, updateOption(s) {
  return q.request({ method: "PUT", url: `option/${s.id}`, data: { ...s }, cancelToken: vn[this.updateOption.name].handleRequestCancellation().token });
}, deleteOption(s) {
  return q.request({ method: "DELETE", url: `option/${s}`, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: vn[this.deleteOption.name].handleRequestCancellation().token });
}, restoreOption(s) {
  return q.request({ method: "PUT", url: `option/${s}/restore`, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: vn[this.restoreOption.name].handleRequestCancellation().token });
}, addOptions(s, r) {
  return q.request({ method: "POST", url: "option/bulk", data: { inquiryId: s, text: r }, cancelToken: vn[this.addOptions.name].handleRequestCancellation().token });
}, confirmOption(s) {
  return q.request({ method: "PUT", url: `option/${s}/confirm`, cancelToken: vn[this.confirmOption.name].handleRequestCancellation().token });
}, reorderOptions(s, r) {
  return q.request({ method: "POST", url: `inquiry/${s}/options/reorder`, data: { options: r }, cancelToken: vn[this.reorderOptions.name].handleRequestCancellation().token });
}, addOptionsSequence(s, r) {
  return q.request({ method: "POST", url: `option/${s}/sequence`, data: { sequence: r }, cancelToken: vn[this.addOptionsSequence.name].handleRequestCancellation().token });
}, shiftOptions(s, r, i) {
  return q.request({ method: "POST", url: `inquiry/${s}/shift`, data: { step: r, unit: i }, cancelToken: vn[this.shiftOptions.name].handleRequestCancellation().token });
} }, vn = Rt(bs), rt = { getInquiries() {
  return q.request({ method: "GET", url: "inquiries", params: { time: +/* @__PURE__ */ new Date() }, cancelToken: Ue[this.getInquiries.name].handleRequestCancellation().token });
}, getChildInquiryIds(s) {
  return q.request({ method: "GET", url: `inquiry/${s}/childs`, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: Ue[this.getInquiry.name].handleRequestCancellation().token });
}, getInquiry(s) {
  return q.request({ method: "GET", url: `inquiry/${s}/inquiry`, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: Ue[this.getInquiry.name].handleRequestCancellation().token });
}, getFullInquiry(s) {
  return q.request({ method: "GET", url: `inquiry/${s}`, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: Ue[this.getInquiry.name].handleRequestCancellation().token });
}, takeOver(s) {
  return q.request({ method: "PUT", url: `administration/inquiry/${s}/takeover`, cancelToken: Ue[this.takeOver.name].handleRequestCancellation().token });
}, changeOwner(s, r) {
  return q.request({ method: "PUT", url: `inquiry/${s}/changeowner/${r}`, cancelToken: Ue[this.changeOwner.name].handleRequestCancellation().token });
}, updateModerationStatus(s, r) {
  return q.request({ method: "PUT", url: `inquiry/updatemoderation/${s}/${r}`, cancelToken: Ue[this.updateModerationStatus.name].handleRequestCancellation().token });
}, updateInquiryConfig(s, r) {
  return q.request({ method: "PUT", url: `inquiry/updateconfig/${s}`, data: { inquiry: r }, cancelToken: Ue[this.updateInquiryConfig.name].handleRequestCancellation().token });
}, addInquiry(s) {
  return q.request({ method: "POST", url: "inquiry/add", data: s, cancelToken: Ue[this.addInquiry.name].handleRequestCancellation().token });
}, updateInquiry(s, r) {
  return q.request({ method: "PUT", url: `inquiry/${s}`, data: r, cancelToken: Ue[this.updateInquiry.name].handleRequestCancellation().token });
}, lockAnonymous(s) {
  return q.request({ method: "PUT", url: `inquiry/${s}/lockAnonymous`, cancelToken: Ue[this.lockAnonymous.name].handleRequestCancellation().token });
}, deleteInquiry(s) {
  return q.request({ method: "DELETE", url: `inquiry/${s}`, cancelToken: Ue[this.deleteInquiry.name].handleRequestCancellation().token });
}, closeInquiry(s) {
  return q.request({ method: "PUT", url: `inquiry/${s}/close`, cancelToken: Ue[this.closeInquiry.name].handleRequestCancellation().token });
}, reopenInquiry(s) {
  return q.request({ method: "PUT", url: `inquiry/${s}/reopen`, cancelToken: Ue[this.reopenInquiry.name].handleRequestCancellation().token });
}, toggleArchive(s) {
  return q.request({ method: "PUT", url: `inquiry/${s}/toggleArchive`, cancelToken: Ue[this.toggleArchive.name].handleRequestCancellation().token });
}, cloneInquiry(s) {
  return q.request({ method: "POST", url: `inquiry/${s}/clone`, cancelToken: Ue[this.cloneInquiry.name].handleRequestCancellation().token });
}, sendConfirmation(s) {
  return q.request({ method: "POST", url: `inquiry/${s}/confirmation`, cancelToken: Ue[this.sendConfirmation.name].handleRequestCancellation().token });
}, getParticipantsEmailAddresses(s) {
  return q.request({ method: "GET", url: `inquiry/${s}/addresses`, cancelToken: Ue[this.getParticipantsEmailAddresses.name].handleRequestCancellation().token });
}, getSubscription(s) {
  return q.request({ method: "GET", url: `inquiry/${s}/subscription`, cancelToken: Ue[this.getSubscription.name].handleRequestCancellation().token });
}, setSubscription(s, r) {
  return q.request({ method: "PUT", url: `inquiry/${s}${r ? "/subscribe" : "/unsubscribe"}`, cancelToken: Ue[this.setSubscription.name].handleRequestCancellation().token });
}, getCommentsCount(s) {
  return q.request({ method: "GET", url: `inquiry/${s}/comment-count`, cancelToken: Ue[this.getCommentsCount.name].handleRequestCancellation().token });
}, getSupportsCount(s) {
  return q.request({ method: "GET", url: `inquiry/${s}/support-count`, cancelToken: Ue[this.getSupportsCount.name].handleRequestCancellation().token });
}, getCategories() {
  return q.request({ method: "GET", url: `inquiry/${inquiryId}/categories`, cancelToken: Ue[this.getCategories.name].handleRequestCancellation().token });
}, getLocations() {
  return q.request({ method: "GET", url: `inquiry/${inquiryId}/locations`, cancelToken: Ue[this.getLocations.name].handleRequestCancellation().token });
} }, Ue = Rt(rt), cu = { getInquiryGroups() {
  return q.request({ method: "GET", url: "inquirygroups", params: { time: +/* @__PURE__ */ new Date() }, cancelToken: gu[this.getInquiryGroups.name].handleRequestCancellation().token });
}, addInquiryToGroup(s, r, i) {
  let l = "", m = "PUT", g = {};
  if (r) l = `inquirygroup/${r}/inquiry/${s}`;
  else if (i) m = "POST", l = `inquirygroup/new/inquiry/${s}`, g = { inquiryGroupName: i };
  else throw new Error("You must provide either a inquiryGroupId or a inquiryGroupName");
  return q.request({ method: m, url: l, data: g, cancelToken: gu[this.addInquiryToGroup.name].handleRequestCancellation().token });
}, removeInquiryFromGroup(s, r) {
  return q.request({ method: "DELETE", url: `inquirygroup/${s}/inquiry/${r}`, cancelToken: gu[this.removeInquiryFromGroup.name].handleRequestCancellation().token });
}, updateInquiryGroup(s) {
  return q.request({ method: "PUT", url: `inquirygroup/${s.id}/update`, data: { name: s.name, titleExt: s.titleExt, description: s.description }, cancelToken: gu[this.updateInquiryGroup.name].handleRequestCancellation().token });
} }, gu = Rt(cu), Ge = { getInquiry(s) {
  return q.request({ method: "GET", url: `/s/${s}/inquiry`, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: Ze[this.getInquiry.name].handleRequestCancellation().token });
}, getSession(s) {
  return q.request({ method: "GET", url: `/s/${s}/session`, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: Ze[this.getSession.name].handleRequestCancellation().token });
}, getOptions(s) {
  return q.request({ method: "GET", url: `/s/${s}/options`, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: Ze[this.getOptions.name].handleRequestCancellation().token });
}, addOption(s, r, i, l = false) {
  return q.request({ method: "POST", url: `/s/${s}/option`, data: { option: r, sequence: i, inquiryYes: l }, cancelToken: Ze[this.addOption.name].handleRequestCancellation().token });
}, deleteOption(s, r) {
  return q.request({ method: "DELETE", url: `s/${s}/option/${r}`, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: Ze[this.deleteOption.name].handleRequestCancellation().token });
}, restoreOption(s, r) {
  return q.request({ method: "PUT", url: `s/${s}/option/${r}/restore`, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: Ze[this.restoreOption.name].handleRequestCancellation().token });
}, getInquiries(s) {
  return q.request({ method: "GET", url: `/s/${s}/inquiries`, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: Ze[this.getInquiries.name].handleRequestCancellation().token });
}, setInquiry(s, r, i) {
  return q.request({ method: "PUT", url: `s/${s}/inquiry`, data: { optionId: r, setTo: i }, cancelToken: Ze[this.setInquiry.name].handleRequestCancellation().token });
}, resetInquiries(s) {
  return q.request({ method: "DELETE", url: `s/${s}/user`, cancelToken: Ze[this.resetInquiries.name].handleRequestCancellation().token });
}, removeOrphanedInquiries(s) {
  return q.request({ method: "DELETE", url: `s/${s}/inquiries/orphaned`, cancelToken: Ze[this.removeOrphanedInquiries.name].handleRequestCancellation().token });
}, getComments(s) {
  return q.request({ method: "GET", url: `/s/${s}/comments`, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: Ze[this.getComments.name].handleRequestCancellation().token });
}, addComment(s, r, i = false) {
  return q.request({ method: "POST", url: `s/${s}/comment`, data: { message: r, confidential: i }, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: Ze[this.addComment.name].handleRequestCancellation().token });
}, deleteComment(s, r) {
  return q.request({ method: "DELETE", url: `s/${s}/comment/${r}`, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: Ze[this.deleteComment.name].handleRequestCancellation().token });
}, restoreComment(s, r) {
  return q.request({ method: "PUT", url: `s/${s}/comment/${r}/restore`, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: Ze[this.restoreComment.name].handleRequestCancellation().token });
}, getShare(s) {
  return q.request({ method: "GET", url: `s/${s}/share`, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: Ze[this.getShare.name].handleRequestCancellation().token });
}, setEmailAddress(s, r) {
  return q.request({ method: "PUT", url: `s/${s}/email/${r}`, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: Ze[this.setEmailAddress.name].handleRequestCancellation().token });
}, deleteEmailAddress(s) {
  return q.request({ method: "DELETE", url: `s/${s}/email`, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: Ze[this.deleteEmailAddress.name].handleRequestCancellation().token });
}, setDisplayName(s, r) {
  return q.request({ method: "PUT", url: `s/${s}/name/${r}`, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: Ze[this.setDisplayName.name].handleRequestCancellation().token });
}, resendInvitation(s) {
  return q.request({ method: "POST", url: `s/${s}/resend`, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: Ze[this.resendInvitation.name].handleRequestCancellation().token });
}, getSubscription(s) {
  return q.request({ method: "GET", url: `s/${s}/subscription`, cancelToken: Ze[this.getSubscription.name].handleRequestCancellation().token });
}, setSubscription(s, r) {
  return q.request({ method: "PUT", url: `s/${s}${r ? "/subscribe" : "/unsubscribe"}`, cancelToken: Ze[this.setSubscription.name].handleRequestCancellation().token });
}, register(s, r, i, l = void 0) {
  return q.request({ method: "POST", url: `s/${s}/register`, data: { displayName: r, emailAddress: i, timeZone: l }, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: Ze[this.register.name].handleRequestCancellation().token });
} }, Ze = Rt(Ge), Qt = { getShares(s, r = "inquiry") {
  return q.request({ method: "GET", url: `${r.toLowerCase()}/${s}/shares`, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: cs[this.getShares.name].handleRequestCancellation().token });
}, addUserShare(s, r, i = "inquiry") {
  return q.request({ method: "POST", url: `${i.toLowerCase()}/${s}/share`, data: r, cancelToken: cs[this.addUserShare.name].handleRequestCancellation().token });
}, addPublicShare(s) {
  return q.request({ method: "POST", url: `inquiry/${s}/publicshare`, cancelToken: cs[this.addPublicShare.name].handleRequestCancellation().token });
}, writeLabel(s, r) {
  return q.request({ method: "PUT", url: `share/${s}/setlabel`, data: { label: r }, cancelToken: cs[this.writeLabel.name].handleRequestCancellation().token });
}, switchAdmin(s, r) {
  return q.request({ method: "PUT", url: `share/${s}/${r}`, cancelToken: cs[this.switchAdmin.name].handleRequestCancellation().token });
}, setEmailAddressConstraint(s, r) {
  return q.request({ method: "PUT", url: `share/${s}/publicinquiryemail/${r}`, cancelToken: cs[this.setEmailAddressConstraint.name].handleRequestCancellation().token });
}, sendInvitation(s) {
  return q.request({ method: "POST", url: `share/${s}/invite`, cancelToken: cs[this.sendInvitation.name].handleRequestCancellation().token });
}, resolveShare(s) {
  return q.request({ method: "GET", url: `share/${s}/resolve`, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: cs[this.resolveShare.name].handleRequestCancellation().token });
}, deleteShare(s) {
  return q.request({ method: "DELETE", url: `share/${s}`, cancelToken: cs[this.deleteShare.name].handleRequestCancellation().token });
}, restoreShare(s) {
  return q.request({ method: "PUT", url: `share/${s}/restore`, cancelToken: cs[this.restoreShare.name].handleRequestCancellation().token });
}, lockShare(s) {
  return q.request({ method: "PUT", url: `share/${s}/lock`, cancelToken: cs[this.lockShare.name].handleRequestCancellation().token });
}, unlockShare(s) {
  return q.request({ method: "PUT", url: `share/${s}/unlock`, cancelToken: cs[this.unlockShare.name].handleRequestCancellation().token });
}, inviteAll(s) {
  return q.request({ method: "PUT", url: `inquiry/${s}/inviteAll`, cancelToken: cs[this.inviteAll.name].handleRequestCancellation().token });
} }, cs = Rt(Qt), qf = { getUserSettings() {
  return q.request({ method: "GET", url: "preferences", params: { time: +/* @__PURE__ */ new Date() }, cancelToken: R0[this.getUserSettings.name].handleRequestCancellation().token });
}, writeUserSettings(s) {
  return q.request({ method: "POST", url: "preferences", data: { preferences: s }, cancelToken: R0[this.writeUserSettings.name].handleRequestCancellation().token });
} }, R0 = Rt(qf), O0 = { validateEmailAddress(s) {
  return q.request({ method: "GET", url: `check/emailaddress/${s}`, cancelToken: U0[this.validateEmailAddress.name].handleRequestCancellation().token });
}, validateName(s, r) {
  return q.request({ method: "POST", url: "check/username", cancelToken: U0[this.validateName.name].handleRequestCancellation().token, data: { displayName: r, token: s }, headers: { "Nc-Agora-Share-Token": s } });
} }, U0 = Rt(O0), lr = { addSupport(s, r) {
  return q.request({ method: "POST", url: `inquiry/support/${s}/${r}`, cancelToken: Ao[this.addSupport.name].handleRequestCancellation().token });
}, removeSupport(s, r) {
  return q.request({ method: "DELETE", url: `inquiry/support/${s}/${r}`, cancelToken: Ao[this.removeSupport.name].handleRequestCancellation().token });
}, getByInquiryId(s) {
  return q.request({ method: "GET", url: `inquiry/support/inquiry/${s}`, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: Ao[this.getByInquiryId.name].handleRequestCancellation().token });
}, getByUserId(s) {
  return q.request({ method: "GET", url: `inquiry/support/user/${s}`, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: Ao[this.getByUserId.name].handleRequestCancellation().token });
}, getSupportStats() {
  return q.request({ method: "GET", url: "inquiry/support/stats/grouped", cancelToken: Ao[this.getSupportStats.name].handleRequestCancellation().token });
} }, Ao = Rt(lr), z0 = { getSession() {
  return q.request({ method: "GET", url: "/session", params: { time: +/* @__PURE__ */ new Date() }, cancelToken: aT[this.getSession.name].handleRequestCancellation().token });
} }, aT = Rt(z0), hu = { uploadAttachment(s, r) {
  const i = new FormData();
  return i.append("file", r), q.request({ method: "POST", url: `inquiry/${s}/attachment`, data: i, headers: { "X-Requested-With": "XMLHttpRequest", requesttoken: OC.requestToken || "" }, cancelToken: If[this.uploadAttachment.name].handleRequestCancellation().token });
}, deleteAttachment(s) {
  return q.request({ method: "DELETE", url: `attachment/${s}`, cancelToken: If[this.deleteAttachment.name].handleRequestCancellation().token });
}, getAttachments(s) {
  return q.request({ method: "GET", url: `inquiry/${s}/attachments`, cancelToken: If[this.getAttachments.name].handleRequestCancellation().token });
} }, If = Rt(hu), B0 = Ks("attachments", { state: () => ({ attachments: [] }), getters: { getByCommentId: (s) => (r) => s.attachments.filter((i) => i.inquiryId === r) }, actions: { async upload(s, r) {
  try {
    return (await hu.uploadAttachment(s, r)).data.attachment;
  } catch (i) {
    if (i?.code === "ERR_CANCELED") return;
    throw Z.error("Error uploading attachment", { error: i }), i;
  }
}, async delete(s) {
  try {
    await hu.deleteAttachment(s);
  } catch (r) {
    if (r?.code === "ERR_CANCELED") return;
    throw Z.error("Error deleting attachment", { error: r }), r;
  }
}, async load(s) {
  try {
    const r = await hu.getAttachments(s);
    this.attachments = this.attachments.filter((i) => i.inquiryId !== s), this.attachments.push(...r.data.attachments);
  } catch (r) {
    if (r?.code === "ERR_CANCELED") return;
    throw Z.error("Error loading attachments", { error: r }), r;
  }
} } }), rT = { prefix: "desc-" }, di = Ks("inquiry", { state: () => ({ id: 0, title: "", type: "proposal", description: "", descriptionSafe: "", moderationStatus: "draft", parentId: 0, locationId: 0, categoryId: 0, childs: [], configuration: { description: "", access: "private", anonymous: false, autoReminder: false, collapseDescription: true, expire: 0, forceConfidentialComments: false, hideBookedUp: false, suggestionsExpire: 0, showResults: "always", maxInquiriesPerOption: 0, maxInquiriesPerUser: 0 }, owner: Fo(), inquiryGroups: [], status: { forceEditMode: false, anonymizeLevel: "ANON_NONE", lastInteraction: 0, created: 0, isAnonymous: false, isArchived: false, isExpired: false, isRealAnonymous: false, relevantThreshold: 0, deletionDate: 0, archivedDate: 0, countParticipants: 0 }, currentUserStatus: { groupInvitations: [], isInvolved: false, isLocked: false, isLoggedIn: false, isOwner: false, orphanedInquiries: 0, shareToken: "", userId: "", userRole: "", countInquiries: 0 }, permissions: { addOptions: false, addShares: false, addSharesExternal: false, archive: false, changeForeignInquiries: false, changeOwner: false, clone: false, comment: false, support: false, confirmOptions: false, deanonymize: false, delete: false, edit: false, reorderOptions: false, seeResults: false, seeUsernames: false, subscribe: false, takeOver: false, view: false, suppport: false }, revealParticipants: false, sortParticipants: "alphabetical", meta: { chunking: { size: 0, loaded: 0 }, status: "loaded" } }), getters: { isSupportedByCurrentUser(s) {
  const r = ke(), i = bo();
  return !r.currentUser || !i.supports ? false : i.supports.some((l) => l.userId === r.currentUser.id && l.inquiryId === s.id);
}, viewMode(s) {
  const r = ir();
  return s.type === "proposal" ? r.viewProposalInquiry : s.type === "petition" ? r.viewPetitionInquiry : s.type === "debate" ? r.viewDebateInquiry : s.type === "grievance" ? r.viewGrievanceInquiry : s.type === "project" ? r.viewProjectInquiry : "table-view";
}, safeParticipants() {
  const s = ke(), r = It();
  return this.viewMode === "list-view" ? [s.currentUser] : r.getChunkedParticipants;
}, displayResults(s) {
  return s.configuration.showResults === "always" || s.configuration.showResults === "closed" && !this.status.isExpired;
}, isConfirmationAllowed(s) {
  return s.permissions.confirmOptions || !this.isClosed;
}, isOptionCloneAllowed(s) {
  return !this.isClosed && s.permissions.edit;
}, isSuggestionExpired(s) {
  return this.isSuggestionAllowed && s.configuration.suggestionsExpire > 0 && Ss.unix(s.configuration.suggestionsExpire).diff() < 0;
}, isSuggestionExpirySet(s) {
  return this.isSuggestionAllowed && s.configuration.suggestionsExpire > 0;
}, suggestionsExpireRelative(s) {
  return Ss.unix(s.configuration.suggestionsExpire).fromNow();
}, suggestionsExpire_d(s) {
  return Ss.unix(s.configuration.suggestionsExpire)._d;
}, isClosed(s) {
  return s.status.isExpired || s.configuration.expire > 0 && Ss.unix(s.configuration.expire).diff() < 1e3;
}, descriptionMarkDown() {
  return Ce.use(tp(rT)), QM.sanitize(Ce.parse(this.description).toString());
} }, actions: { reset() {
  this.$reset();
}, toggleSupport() {
  const s = ke(), r = bo(), i = s.currentUser?.id, l = this.id;
  if (!i) return;
  const m = r.supports.findIndex((g) => g.userId === i && g.inquiryId === l);
  return m !== -1 ? (r.supports.splice(m, 1), r.remove()) : (r.supports.push({ userId: i, inquiryId: l }), r.add());
}, setSuggestionExpiration(s) {
  this.configuration.suggestionsExpire = Ss(s.expire).unix(), this.write();
}, setExpiration(s) {
  this.configuration.suggestionsExpire = Ss(s.expire).unix(), this.write();
}, async resetInquiry() {
  const s = It(), r = Ef(), i = Hf(), l = Af(), m = bo();
  this.$reset(), s.$reset(), r.$reset(), i.$reset(), l.$reset(), m.$reset();
}, async load(s = null) {
  const r = ke(), i = Ef(), l = Hf(), m = Af(), g = bo(), h = B0(), p = A0();
  this.meta.status = "loading";
  try {
    const M = await (() => {
      if (r.route.name === "publicInquiry") return Ge.getInquiry(r.route.params.token);
      if (r.route.name === "inquiry") return rt.getFullInquiry(s ?? r.currentInquiryId);
    })();
    if (!M) {
      this.$reset();
      return;
    }
    return this.$patch(M.data.inquiry), i.options = M.data.options, l.shares = M.data.shares, m.comments = M.data.comments, g.supports = M.data.supports, p.subscribed = M.data.subscribed, h.attachments = M.data.attachments, this.childs = M.data.childs, M.data.inquiry.owner.id === r.currentUser.id ? r.currentUser.isOwner = true : r.currentUser.isOwner = false, this.meta.status = "loaded", M;
  } catch (M) {
    if (M?.code === "ERR_CANCELED") return;
    throw this.meta.status = "error", Z.error("Error loading inquiry", { error: M }), M;
  }
}, async add(s) {
  const r = It();
  try {
    return (await rt.addInquiry({ title: s.title, type: s.type, configuration: s.configuration, description: s.description, parentId: s.parentId, locationId: s.locationId, categoryId: s.categoryId, owner: s.owner, currentUserStatus: s.currentUserStatus, permissions: s.permissions })).data.inquiry;
  } catch (i) {
    if (i?.code === "ERR_CANCELED") return;
    throw Z.error("Error adding inquiry:", { error: i, payload: s, state: this.$state }), i;
  } finally {
    r.load();
  }
}, async update(s) {
  const r = It();
  this.$debounce(async () => {
    try {
      return (await rt.updateInquiry(s.id, { title: s.title, type: s.type, description: s.description, parentId: s.parentId, locationId: s.locationId, categoryId: s.categoryId })).data.inquiry;
    } catch (l) {
      if (l?.code === "ERR_CANCELED") return;
      throw Z.error("Error updating inquiry", { error: l, state: this.$state }), l;
    } finally {
      this.load(), r.load();
    }
  }, 500)();
}, async setModerationStatus(s) {
  try {
    await rt.updateModerationStatus(this.id, s);
  } catch (r) {
    if (r?.code === "ERR_CANCELED") return;
    throw Z.error("Error setting moderation status:", { error: r, state: this.$state }), r;
  }
}, async LockAnonymous() {
  try {
    await rt.lockAnonymous(this.id);
  } catch (s) {
    if (s?.code === "ERR_CANCELED") return;
    throw Z.error("Error locking inquiry to anonymous:", { error: s, state: this.$state }), s;
  } finally {
    this.load();
  }
}, write() {
  const s = It();
  this.$debounce(async () => {
    if (this.title === "") {
      yg(re("agora", "Title must not be empty!"));
      return;
    }
    try {
      const i = await rt.updateInquiryConfig(this.id, this.configuration);
      this.$patch(i.data.inquiry), ZM(Pf.UpdateInquiry, { store: "inquiry", message: re("inquiries", "Inquiry updated") });
    } catch (i) {
      if (i?.code === "ERR_CANCELED") return;
      throw Z.error("Error updating inquiry:", { error: i, inquiry: this.$state }), yg(re("agora", "Error writing inquiry")), i;
    } finally {
      this.load(), s.load();
    }
  }, 500)();
}, async close() {
  const s = It();
  try {
    const r = await rt.closeInquiry(this.id);
    this.$patch(r.data.inquiry);
  } catch (r) {
    if (r?.code === "ERR_CANCELED") return;
    throw Z.error("Error closing inquiry", { error: r, inquiryId: this.id }), this.load(), r;
  } finally {
    s.load();
  }
}, async reopen() {
  const s = It();
  try {
    const r = await rt.reopenInquiry(this.id);
    this.$patch(r.data.inquiry);
  } catch (r) {
    if (r?.code === "ERR_CANCELED") return;
    throw Z.error("Error reopening inquiry", { error: r, inquiryId: this.id }), this.load(), r;
  } finally {
    s.load();
  }
}, async toggleArchive(s) {
  const r = It();
  try {
    const i = await rt.toggleArchive(s.inquiryId);
    this.id === s.inquiryId && this.$patch(i.data.inquiry);
  } catch (i) {
    if (i?.code === "ERR_CANCELED") return;
    throw Z.error("Error archiving/restoring", { error: i, payload: s }), i;
  } finally {
    r.load();
  }
} } }), W0 = /^[a-z0-9]+(-[a-z0-9]+)*$/, fu = (s, r, i, l = "") => {
  const m = s.split(":");
  if (s.slice(0, 1) === "@") {
    if (m.length < 2 || m.length > 3) return null;
    l = m.shift().slice(1);
  }
  if (m.length > 3 || !m.length) return null;
  if (m.length > 1) {
    const p = m.pop(), M = m.pop(), v = { provider: m.length > 0 ? m[0] : l, prefix: M, name: p };
    return r && !_u(v) ? null : v;
  }
  const g = m[0], h = g.split("-");
  if (h.length > 1) {
    const p = { provider: l, prefix: h.shift(), name: h.join("-") };
    return r && !_u(p) ? null : p;
  }
  if (i && l === "") {
    const p = { provider: l, prefix: "", name: g };
    return r && !_u(p, i) ? null : p;
  }
  return null;
}, _u = (s, r) => s ? !!((r && s.prefix === "" || s.prefix) && s.name) : false, $0 = Object.freeze({ left: 0, top: 0, width: 16, height: 16 }), pu = Object.freeze({ rotate: 0, vFlip: false, hFlip: false }), yu = Object.freeze({ ...$0, ...pu }), Rf = Object.freeze({ ...yu, body: "", hidden: false });
function iT(s, r) {
  const i = {};
  !s.hFlip != !r.hFlip && (i.hFlip = true), !s.vFlip != !r.vFlip && (i.vFlip = true);
  const l = ((s.rotate || 0) + (r.rotate || 0)) % 4;
  return l && (i.rotate = l), i;
}
function G0(s, r) {
  const i = iT(s, r);
  for (const l in Rf) l in pu ? l in s && !(l in i) && (i[l] = pu[l]) : l in r ? i[l] = r[l] : l in s && (i[l] = s[l]);
  return i;
}
function oT(s, r) {
  const i = s.icons, l = s.aliases || /* @__PURE__ */ Object.create(null), m = /* @__PURE__ */ Object.create(null);
  function g(h) {
    if (i[h]) return m[h] = [];
    if (!(h in m)) {
      m[h] = null;
      const p = l[h] && l[h].parent, M = p && g(p);
      M && (m[h] = [p].concat(M));
    }
    return m[h];
  }
  return Object.keys(i).concat(Object.keys(l)).forEach(g), m;
}
function lT(s, r, i) {
  const l = s.icons, m = s.aliases || /* @__PURE__ */ Object.create(null);
  let g = {};
  function h(p) {
    g = G0(l[p] || m[p], g);
  }
  return h(r), i.forEach(h), G0(s, g);
}
function J0(s, r) {
  const i = [];
  if (typeof s != "object" || typeof s.icons != "object") return i;
  s.not_found instanceof Array && s.not_found.forEach((m) => {
    r(m, null), i.push(m);
  });
  const l = oT(s);
  for (const m in l) {
    const g = l[m];
    g && (r(m, lT(s, m, g)), i.push(m));
  }
  return i;
}
const dT = { provider: "", aliases: {}, not_found: {}, ...$0 };
function Of(s, r) {
  for (const i in r) if (i in s && typeof s[i] != typeof r[i]) return false;
  return true;
}
function V0(s) {
  if (typeof s != "object" || s === null) return null;
  const r = s;
  if (typeof r.prefix != "string" || !s.icons || typeof s.icons != "object" || !Of(s, dT)) return null;
  const i = r.icons;
  for (const m in i) {
    const g = i[m];
    if (!m || typeof g.body != "string" || !Of(g, Rf)) return null;
  }
  const l = r.aliases || /* @__PURE__ */ Object.create(null);
  for (const m in l) {
    const g = l[m], h = g.parent;
    if (!m || typeof h != "string" || !i[h] && !l[h] || !Of(g, Rf)) return null;
  }
  return r;
}
const K0 = /* @__PURE__ */ Object.create(null);
function uT(s, r) {
  return { provider: s, prefix: r, icons: /* @__PURE__ */ Object.create(null), missing: /* @__PURE__ */ new Set() };
}
function ui(s, r) {
  const i = K0[s] || (K0[s] = /* @__PURE__ */ Object.create(null));
  return i[r] || (i[r] = uT(s, r));
}
function Z0(s, r) {
  return V0(r) ? J0(r, (i, l) => {
    l ? s.icons[i] = l : s.missing.add(i);
  }) : [];
}
function mT(s, r, i) {
  try {
    if (typeof i.body == "string") return s.icons[r] = { ...i }, true;
  } catch {
  }
  return false;
}
let Eo = false;
function Q0(s) {
  return typeof s == "boolean" && (Eo = s), Eo;
}
function cT(s) {
  const r = typeof s == "string" ? fu(s, true, Eo) : s;
  if (r) {
    const i = ui(r.provider, r.prefix), l = r.name;
    return i.icons[l] || (i.missing.has(l) ? null : void 0);
  }
}
function gT(s, r) {
  const i = fu(s, true, Eo);
  if (!i) return false;
  const l = ui(i.provider, i.prefix);
  return r ? mT(l, i.name, r) : (l.missing.add(i.name), true);
}
function hT(s, r) {
  if (typeof s != "object") return false;
  if (typeof r != "string" && (r = s.provider || ""), Eo && !r && !s.prefix) {
    let m = false;
    return V0(s) && (s.prefix = "", J0(s, (g, h) => {
      gT(g, h) && (m = true);
    })), m;
  }
  const i = s.prefix;
  if (!_u({ prefix: i, name: "a" })) return false;
  const l = ui(r, i);
  return !!Z0(l, s);
}
const X0 = Object.freeze({ width: null, height: null }), e1 = Object.freeze({ ...X0, ...pu }), fT = /(-?[0-9.]*[0-9]+[0-9.]*)/g, _T = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function t1(s, r, i) {
  if (r === 1) return s;
  if (i = i || 100, typeof s == "number") return Math.ceil(s * r * i) / i;
  if (typeof s != "string") return s;
  const l = s.split(fT);
  if (l === null || !l.length) return s;
  const m = [];
  let g = l.shift(), h = _T.test(g);
  for (; ; ) {
    if (h) {
      const p = parseFloat(g);
      isNaN(p) ? m.push(g) : m.push(Math.ceil(p * r * i) / i);
    } else m.push(g);
    if (g = l.shift(), g === void 0) return m.join("");
    h = !h;
  }
}
function pT(s, r = "defs") {
  let i = "";
  const l = s.indexOf("<" + r);
  for (; l >= 0; ) {
    const m = s.indexOf(">", l), g = s.indexOf("</" + r);
    if (m === -1 || g === -1) break;
    const h = s.indexOf(">", g);
    if (h === -1) break;
    i += s.slice(m + 1, g).trim(), s = s.slice(0, l).trim() + s.slice(h + 1);
  }
  return { defs: i, content: s };
}
function yT(s, r) {
  return s ? "<defs>" + s + "</defs>" + r : r;
}
function wT(s, r, i) {
  const l = pT(s);
  return yT(l.defs, r + l.content + i);
}
const vT = (s) => s === "unset" || s === "undefined" || s === "none";
function MT(s, r) {
  const i = { ...yu, ...s }, l = { ...e1, ...r }, m = { left: i.left, top: i.top, width: i.width, height: i.height };
  let g = i.body;
  [i, l].forEach((R) => {
    const x = [], X = R.hFlip, ee = R.vFlip;
    let se = R.rotate;
    X ? ee ? se += 2 : (x.push("translate(" + (m.width + m.left).toString() + " " + (0 - m.top).toString() + ")"), x.push("scale(-1 1)"), m.top = m.left = 0) : ee && (x.push("translate(" + (0 - m.left).toString() + " " + (m.height + m.top).toString() + ")"), x.push("scale(1 -1)"), m.top = m.left = 0);
    let Q;
    switch (se < 0 && (se -= Math.floor(se / 4) * 4), se = se % 4, se) {
      case 1:
        Q = m.height / 2 + m.top, x.unshift("rotate(90 " + Q.toString() + " " + Q.toString() + ")");
        break;
      case 2:
        x.unshift("rotate(180 " + (m.width / 2 + m.left).toString() + " " + (m.height / 2 + m.top).toString() + ")");
        break;
      case 3:
        Q = m.width / 2 + m.left, x.unshift("rotate(-90 " + Q.toString() + " " + Q.toString() + ")");
        break;
    }
    se % 2 === 1 && (m.left !== m.top && (Q = m.left, m.left = m.top, m.top = Q), m.width !== m.height && (Q = m.width, m.width = m.height, m.height = Q)), x.length && (g = wT(g, '<g transform="' + x.join(" ") + '">', "</g>"));
  });
  const h = l.width, p = l.height, M = m.width, v = m.height;
  let D, S;
  h === null ? (S = p === null ? "1em" : p === "auto" ? v : p, D = t1(S, M / v)) : (D = h === "auto" ? M : h, S = p === null ? t1(D, v / M) : p === "auto" ? v : p);
  const E = {}, N = (R, x) => {
    vT(x) || (E[R] = x.toString());
  };
  N("width", D), N("height", S);
  const j = [m.left, m.top, M, v];
  return E.viewBox = j.join(" "), { attributes: E, viewBox: j, body: g };
}
const LT = /\sid="(\S+)"/g, kT = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
let TT = 0;
function DT(s, r = kT) {
  const i = [];
  let l;
  for (; l = LT.exec(s); ) i.push(l[1]);
  if (!i.length) return s;
  const m = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
  return i.forEach((g) => {
    const h = typeof r == "function" ? r(g) : r + (TT++).toString(), p = g.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    s = s.replace(new RegExp('([#;"])(' + p + ')([")]|\\.[a-z])', "g"), "$1" + h + m + "$3");
  }), s = s.replace(new RegExp(m, "g"), ""), s;
}
const Uf = /* @__PURE__ */ Object.create(null);
function YT(s, r) {
  Uf[s] = r;
}
function zf(s) {
  return Uf[s] || Uf[""];
}
function Bf(s) {
  let r;
  if (typeof s.resources == "string") r = [s.resources];
  else if (r = s.resources, !(r instanceof Array) || !r.length) return null;
  return { resources: r, path: s.path || "/", maxURL: s.maxURL || 500, rotate: s.rotate || 750, timeout: s.timeout || 5e3, random: s.random === true, index: s.index || 0, dataAfterTimeout: s.dataAfterTimeout !== false };
}
const Wf = /* @__PURE__ */ Object.create(null), Ho = ["https://api.simplesvg.com", "https://api.unisvg.com"], wu = [];
for (; Ho.length > 0; ) Ho.length === 1 || Math.random() > 0.5 ? wu.push(Ho.shift()) : wu.push(Ho.pop());
Wf[""] = Bf({ resources: ["https://api.iconify.design"].concat(wu) });
function CT(s, r) {
  const i = Bf(r);
  return i === null ? false : (Wf[s] = i, true);
}
function $f(s) {
  return Wf[s];
}
const ST = () => {
  let s;
  try {
    if (s = fetch, typeof s == "function") return s;
  } catch {
  }
};
let s1 = ST();
function bT(s, r) {
  const i = $f(s);
  if (!i) return 0;
  let l;
  if (!i.maxURL) l = 0;
  else {
    let m = 0;
    i.resources.forEach((h) => {
      m = Math.max(m, h.length);
    });
    const g = r + ".json?icons=";
    l = i.maxURL - m - i.path.length - g.length;
  }
  return l;
}
function FT(s) {
  return s === 404;
}
const xT = (s, r, i) => {
  const l = [], m = bT(s, r), g = "icons";
  let h = { type: g, provider: s, prefix: r, icons: [] }, p = 0;
  return i.forEach((M, v) => {
    p += M.length + 1, p >= m && v > 0 && (l.push(h), h = { type: g, provider: s, prefix: r, icons: [] }, p = M.length), h.icons.push(M);
  }), l.push(h), l;
};
function NT(s) {
  if (typeof s == "string") {
    const r = $f(s);
    if (r) return r.path;
  }
  return "/";
}
const AT = (s, r, i) => {
  if (!s1) {
    i("abort", 424);
    return;
  }
  let l = NT(r.provider);
  switch (r.type) {
    case "icons": {
      const g = r.prefix, p = r.icons.join(","), M = new URLSearchParams({ icons: p });
      l += g + ".json?" + M.toString();
      break;
    }
    case "custom": {
      const g = r.uri;
      l += g.slice(0, 1) === "/" ? g.slice(1) : g;
      break;
    }
    default:
      i("abort", 400);
      return;
  }
  let m = 503;
  s1(s + l).then((g) => {
    const h = g.status;
    if (h !== 200) {
      setTimeout(() => {
        i(FT(h) ? "abort" : "next", h);
      });
      return;
    }
    return m = 501, g.json();
  }).then((g) => {
    if (typeof g != "object" || g === null) {
      setTimeout(() => {
        g === 404 ? i("abort", g) : i("next", m);
      });
      return;
    }
    setTimeout(() => {
      i("success", g);
    });
  }).catch(() => {
    i("next", m);
  });
}, ET = { prepare: xT, send: AT };
function HT(s) {
  const r = { loaded: [], missing: [], pending: [] }, i = /* @__PURE__ */ Object.create(null);
  s.sort((m, g) => m.provider !== g.provider ? m.provider.localeCompare(g.provider) : m.prefix !== g.prefix ? m.prefix.localeCompare(g.prefix) : m.name.localeCompare(g.name));
  let l = { provider: "", prefix: "", name: "" };
  return s.forEach((m) => {
    if (l.name === m.name && l.prefix === m.prefix && l.provider === m.provider) return;
    l = m;
    const g = m.provider, h = m.prefix, p = m.name, M = i[g] || (i[g] = /* @__PURE__ */ Object.create(null)), v = M[h] || (M[h] = ui(g, h));
    let D;
    p in v.icons ? D = r.loaded : h === "" || v.missing.has(p) ? D = r.missing : D = r.pending;
    const S = { provider: g, prefix: h, name: p };
    D.push(S);
  }), r;
}
function n1(s, r) {
  s.forEach((i) => {
    const l = i.loaderCallbacks;
    l && (i.loaderCallbacks = l.filter((m) => m.id !== r));
  });
}
function PT(s) {
  s.pendingCallbacksFlag || (s.pendingCallbacksFlag = true, setTimeout(() => {
    s.pendingCallbacksFlag = false;
    const r = s.loaderCallbacks ? s.loaderCallbacks.slice(0) : [];
    if (!r.length) return;
    let i = false;
    const l = s.provider, m = s.prefix;
    r.forEach((g) => {
      const h = g.icons, p = h.pending.length;
      h.pending = h.pending.filter((M) => {
        if (M.prefix !== m) return true;
        const v = M.name;
        if (s.icons[v]) h.loaded.push({ provider: l, prefix: m, name: v });
        else if (s.missing.has(v)) h.missing.push({ provider: l, prefix: m, name: v });
        else return i = true, true;
        return false;
      }), h.pending.length !== p && (i || n1([s], g.id), g.callback(h.loaded.slice(0), h.missing.slice(0), h.pending.slice(0), g.abort));
    });
  }));
}
let jT = 0;
function qT(s, r, i) {
  const l = jT++, m = n1.bind(null, i, l);
  if (!r.pending.length) return m;
  const g = { id: l, icons: r, callback: s, abort: m };
  return i.forEach((h) => {
    (h.loaderCallbacks || (h.loaderCallbacks = [])).push(g);
  }), m;
}
function IT(s, r = true, i = false) {
  const l = [];
  return s.forEach((m) => {
    const g = typeof m == "string" ? fu(m, r, i) : m;
    g && l.push(g);
  }), l;
}
var RT = { resources: [], index: 0, timeout: 2e3, rotate: 750, random: false, dataAfterTimeout: false };
function OT(s, r, i, l) {
  const m = s.resources.length, g = s.random ? Math.floor(Math.random() * m) : s.index;
  let h;
  if (s.random) {
    let B = s.resources.slice(0);
    for (h = []; B.length > 1; ) {
      const J = Math.floor(Math.random() * B.length);
      h.push(B[J]), B = B.slice(0, J).concat(B.slice(J + 1));
    }
    h = h.concat(B);
  } else h = s.resources.slice(g).concat(s.resources.slice(0, g));
  const p = Date.now();
  let M = "pending", v = 0, D, S = null, E = [], N = [];
  typeof l == "function" && N.push(l);
  function j() {
    S && (clearTimeout(S), S = null);
  }
  function R() {
    M === "pending" && (M = "aborted"), j(), E.forEach((B) => {
      B.status === "pending" && (B.status = "aborted");
    }), E = [];
  }
  function x(B, J) {
    J && (N = []), typeof B == "function" && N.push(B);
  }
  function X() {
    return { startTime: p, payload: r, status: M, queriesSent: v, queriesPending: E.length, subscribe: x, abort: R };
  }
  function ee() {
    M = "failed", N.forEach((B) => {
      B(void 0, D);
    });
  }
  function se() {
    E.forEach((B) => {
      B.status === "pending" && (B.status = "aborted");
    }), E = [];
  }
  function Q(B, J, he) {
    const je = J !== "success";
    switch (E = E.filter((Te) => Te !== B), M) {
      case "pending":
        break;
      case "failed":
        if (je || !s.dataAfterTimeout) return;
        break;
      default:
        return;
    }
    if (J === "abort") {
      D = he, ee();
      return;
    }
    if (je) {
      D = he, E.length || (h.length ? ge() : ee());
      return;
    }
    if (j(), se(), !s.random) {
      const Te = s.resources.indexOf(B.resource);
      Te !== -1 && Te !== s.index && (s.index = Te);
    }
    M = "completed", N.forEach((Te) => {
      Te(he);
    });
  }
  function ge() {
    if (M !== "pending") return;
    j();
    const B = h.shift();
    if (B === void 0) {
      if (E.length) {
        S = setTimeout(() => {
          j(), M === "pending" && (se(), ee());
        }, s.timeout);
        return;
      }
      ee();
      return;
    }
    const J = { status: "pending", resource: B, callback: (he, je) => {
      Q(J, he, je);
    } };
    E.push(J), v++, S = setTimeout(ge, s.rotate), i(B, r, J.callback);
  }
  return setTimeout(ge), X;
}
function a1(s) {
  const r = { ...RT, ...s };
  let i = [];
  function l() {
    i = i.filter((p) => p().status === "pending");
  }
  function m(p, M, v) {
    const D = OT(r, p, M, (S, E) => {
      l(), v && v(S, E);
    });
    return i.push(D), D;
  }
  function g(p) {
    return i.find((M) => p(M)) || null;
  }
  return { query: m, find: g, setIndex: (p) => {
    r.index = p;
  }, getIndex: () => r.index, cleanup: l };
}
function r1() {
}
const Gf = /* @__PURE__ */ Object.create(null);
function UT(s) {
  if (!Gf[s]) {
    const r = $f(s);
    if (!r) return;
    const i = a1(r), l = { config: r, redundancy: i };
    Gf[s] = l;
  }
  return Gf[s];
}
function zT(s, r, i) {
  let l, m;
  if (typeof s == "string") {
    const g = zf(s);
    if (!g) return i(void 0, 424), r1;
    m = g.send;
    const h = UT(s);
    h && (l = h.redundancy);
  } else {
    const g = Bf(s);
    if (g) {
      l = a1(g);
      const h = s.resources ? s.resources[0] : "", p = zf(h);
      p && (m = p.send);
    }
  }
  return !l || !m ? (i(void 0, 424), r1) : l.query(r, m, i)().abort;
}
function i1() {
}
function BT(s) {
  s.iconsLoaderFlag || (s.iconsLoaderFlag = true, setTimeout(() => {
    s.iconsLoaderFlag = false, PT(s);
  }));
}
function WT(s) {
  const r = [], i = [];
  return s.forEach((l) => {
    (l.match(W0) ? r : i).push(l);
  }), { valid: r, invalid: i };
}
function Po(s, r, i) {
  function l() {
    const m = s.pendingIcons;
    r.forEach((g) => {
      m && m.delete(g), s.icons[g] || s.missing.add(g);
    });
  }
  if (i && typeof i == "object") try {
    if (!Z0(s, i).length) {
      l();
      return;
    }
  } catch (m) {
    console.error(m);
  }
  l(), BT(s);
}
function o1(s, r) {
  s instanceof Promise ? s.then((i) => {
    r(i);
  }).catch(() => {
    r(null);
  }) : r(s);
}
function $T(s, r) {
  s.iconsToLoad ? s.iconsToLoad = s.iconsToLoad.concat(r).sort() : s.iconsToLoad = r, s.iconsQueueFlag || (s.iconsQueueFlag = true, setTimeout(() => {
    s.iconsQueueFlag = false;
    const { provider: i, prefix: l } = s, m = s.iconsToLoad;
    if (delete s.iconsToLoad, !m || !m.length) return;
    const g = s.loadIcon;
    if (s.loadIcons && (m.length > 1 || !g)) {
      o1(s.loadIcons(m, l, i), (D) => {
        Po(s, m, D);
      });
      return;
    }
    if (g) {
      m.forEach((D) => {
        const S = g(D, l, i);
        o1(S, (E) => {
          const N = E ? { prefix: l, icons: { [D]: E } } : null;
          Po(s, [D], N);
        });
      });
      return;
    }
    const { valid: h, invalid: p } = WT(m);
    if (p.length && Po(s, p, null), !h.length) return;
    const M = l.match(W0) ? zf(i) : null;
    if (!M) {
      Po(s, h, null);
      return;
    }
    M.prepare(i, l, h).forEach((D) => {
      zT(i, D, (S) => {
        Po(s, D.icons, S);
      });
    });
  }));
}
const GT = (s, r) => {
  const i = IT(s, true, Q0()), l = HT(i);
  if (!l.pending.length) {
    let M = true;
    return r && setTimeout(() => {
      M && r(l.loaded, l.missing, l.pending, i1);
    }), () => {
      M = false;
    };
  }
  const m = /* @__PURE__ */ Object.create(null), g = [];
  let h, p;
  return l.pending.forEach((M) => {
    const { provider: v, prefix: D } = M;
    if (D === p && v === h) return;
    h = v, p = D, g.push(ui(v, D));
    const S = m[v] || (m[v] = /* @__PURE__ */ Object.create(null));
    S[D] || (S[D] = []);
  }), l.pending.forEach((M) => {
    const { provider: v, prefix: D, name: S } = M, E = ui(v, D), N = E.pendingIcons || (E.pendingIcons = /* @__PURE__ */ new Set());
    N.has(S) || (N.add(S), m[v][D].push(S));
  }), g.forEach((M) => {
    const v = m[M.provider][M.prefix];
    v.length && $T(M, v);
  }), r ? qT(r, l, g) : i1;
};
function JT(s, r) {
  const i = { ...s };
  for (const l in r) {
    const m = r[l], g = typeof m;
    l in X0 ? (m === null || m && (g === "string" || g === "number")) && (i[l] = m) : g === typeof i[l] && (i[l] = l === "rotate" ? m % 4 : m);
  }
  return i;
}
const VT = /[\s,]+/;
function KT(s, r) {
  r.split(VT).forEach((i) => {
    switch (i.trim()) {
      case "horizontal":
        s.hFlip = true;
        break;
      case "vertical":
        s.vFlip = true;
        break;
    }
  });
}
function ZT(s, r = 0) {
  const i = s.replace(/^-?[0-9.]*/, "");
  function l(m) {
    for (; m < 0; ) m += 4;
    return m % 4;
  }
  if (i === "") {
    const m = parseInt(s);
    return isNaN(m) ? 0 : l(m);
  } else if (i !== s) {
    let m = 0;
    switch (i) {
      case "%":
        m = 25;
        break;
      case "deg":
        m = 90;
    }
    if (m) {
      let g = parseFloat(s.slice(0, s.length - i.length));
      return isNaN(g) ? 0 : (g = g / m, g % 1 === 0 ? l(g) : 0);
    }
  }
  return r;
}
function QT(s, r) {
  let i = s.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const l in r) i += " " + l + '="' + r[l] + '"';
  return '<svg xmlns="http://www.w3.org/2000/svg"' + i + ">" + s + "</svg>";
}
function XT(s) {
  return s.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function eD(s) {
  return "data:image/svg+xml," + XT(s);
}
function tD(s) {
  return 'url("' + eD(s) + '")';
}
const l1 = { ...e1, inline: false }, sD = { xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", "aria-hidden": true, role: "img" }, nD = { display: "inline-block" }, Jf = { backgroundColor: "currentColor" }, d1 = { backgroundColor: "transparent" }, u1 = { Image: "var(--svg)", Repeat: "no-repeat", Size: "100% 100%" }, m1 = { webkitMask: Jf, mask: Jf, background: d1 };
for (const s in m1) {
  const r = m1[s];
  for (const i in u1) r[s + i] = u1[i];
}
const vu = {};
["horizontal", "vertical"].forEach((s) => {
  const r = s.slice(0, 1) + "Flip";
  vu[s + "-flip"] = r, vu[s.slice(0, 1) + "-flip"] = r, vu[s + "Flip"] = r;
});
function c1(s) {
  return s + (s.match(/^[-0-9.]+$/) ? "px" : "");
}
const g1 = (s, r) => {
  const i = JT(l1, r), l = { ...sD }, m = r.mode || "svg", g = {}, h = r.style, p = typeof h == "object" && !(h instanceof Array) ? h : {};
  for (let R in r) {
    const x = r[R];
    if (x !== void 0) switch (R) {
      case "icon":
      case "style":
      case "onLoad":
      case "mode":
      case "ssr":
        break;
      case "inline":
      case "hFlip":
      case "vFlip":
        i[R] = x === true || x === "true" || x === 1;
        break;
      case "flip":
        typeof x == "string" && KT(i, x);
        break;
      case "color":
        g.color = x;
        break;
      case "rotate":
        typeof x == "string" ? i[R] = ZT(x) : typeof x == "number" && (i[R] = x);
        break;
      case "ariaHidden":
      case "aria-hidden":
        x !== true && x !== "true" && delete l["aria-hidden"];
        break;
      default: {
        const X = vu[R];
        X ? (x === true || x === "true" || x === 1) && (i[X] = true) : l1[R] === void 0 && (l[R] = x);
      }
    }
  }
  const M = MT(s, i), v = M.attributes;
  if (i.inline && (g.verticalAlign = "-0.125em"), m === "svg") {
    l.style = { ...g, ...p }, Object.assign(l, v);
    let R = 0, x = r.id;
    return typeof x == "string" && (x = x.replace(/-/g, "_")), l.innerHTML = DT(M.body, x ? () => x + "ID" + R++ : "iconifyVue"), ng("svg", l);
  }
  const { body: D, width: S, height: E } = s, N = m === "mask" || (m === "bg" ? false : D.indexOf("currentColor") !== -1), j = QT(D, { ...v, width: S + "", height: E + "" });
  return l.style = { ...g, "--svg": tD(j), width: c1(v.width), height: c1(v.height), ...nD, ...N ? Jf : d1, ...p }, ng("span", l);
};
if (Q0(true), YT("", ET), typeof document < "u" && typeof window < "u") {
  const s = window;
  if (s.IconifyPreload !== void 0) {
    const r = s.IconifyPreload, i = "Invalid IconifyPreload syntax.";
    typeof r == "object" && r !== null && (r instanceof Array ? r : [r]).forEach((l) => {
      try {
        (typeof l != "object" || l === null || l instanceof Array || typeof l.icons != "object" || typeof l.prefix != "string" || !hT(l)) && console.error(i);
      } catch {
        console.error(i);
      }
    });
  }
  if (s.IconifyProviders !== void 0) {
    const r = s.IconifyProviders;
    if (typeof r == "object" && r !== null) for (let i in r) {
      const l = "IconifyProviders[" + i + "] is invalid.";
      try {
        const m = r[i];
        if (typeof m != "object" || !m || m.resources === void 0) continue;
        CT(i, m) || console.error(l);
      } catch {
        console.error(l);
      }
    }
  }
}
const aD = { ...yu, body: "" }, rD = Xc((s, { emit: r }) => {
  const i = tr(null);
  function l() {
    i.value && (i.value.abort?.(), i.value = null);
  }
  const m = tr(!!s.ssr), g = tr(""), h = XM(null);
  function p() {
    const v = s.icon;
    if (typeof v == "object" && v !== null && typeof v.body == "string") return g.value = "", { data: v };
    let D;
    if (typeof v != "string" || (D = fu(v, false, true)) === null) return null;
    let S = cT(D);
    if (!S) {
      const j = i.value;
      return (!j || j.name !== v) && (S === null ? i.value = { name: v } : i.value = { name: v, abort: GT([D], M) }), null;
    }
    l(), g.value !== v && (g.value = v, nL(() => {
      r("load", v);
    }));
    const E = s.customise;
    if (E) {
      S = Object.assign({}, S);
      const j = E(S.body, D.name, D.prefix, D.provider);
      typeof j == "string" && (S.body = j);
    }
    const N = ["iconify"];
    return D.prefix !== "" && N.push("iconify--" + D.prefix), D.provider !== "" && N.push("iconify--" + D.provider), { data: S, classes: N };
  }
  function M() {
    const v = p();
    v ? v.data !== h.value?.data && (h.value = v) : h.value = null;
  }
  return m.value ? M() : eL(() => {
    m.value = true, M();
  }), tL(() => s.icon, M), sL(l), () => {
    const v = h.value;
    if (!v) return g1(aD, s);
    let D = s;
    return v.classes && (D = { ...s, class: v.classes.join(" ") }), g1({ ...yu, ...v.data }, D);
  };
}, { props: ["icon", "mode", "ssr", "width", "height", "style", "color", "inline", "rotate", "hFlip", "horizontalFlip", "vFlip", "verticalFlip", "flip", "id", "ariaHidden", "customise", "title"], emits: ["load"] }), iD = { width: 24, height: 24, body: '<path fill="currentColor" d="M12 6a6 6 0 0 1 6 6c0 2.22-1.21 4.16-3 5.2V19a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-1.8c-1.79-1.04-3-2.98-3-5.2a6 6 0 0 1 6-6m2 15v1a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-1h4m6-10h3v2h-3v-2M1 11h3v2H1v-2M13 1v3h-2V1h2M4.92 3.5l2.13 2.14l-1.42 1.41L3.5 4.93L4.92 3.5m12.03 2.13l2.12-2.13l1.43 1.43l-2.13 2.12l-1.42-1.42Z"/>' }, oD = { width: 24, height: 24, body: '<path fill="currentColor" d="M17 12V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v14l4-4h10a1 1 0 0 0 1-1m4-6h-2v9H6v2a1 1 0 0 0 1 1h11l4 4V7a1 1 0 0 0-1-1Z"/>' }, lD = { width: 24, height: 24, body: '<path fill="currentColor" d="M20 17q.86 0 1.45.6t.58 1.4L14 22l-7-2v-9h1.95l7.27 2.69q.78.31.78 1.12q0 .47-.34.82t-.86.37H13l-1.75-.67l-.33.94L13 17h7M16 3.23Q17.06 2 18.7 2q1.36 0 2.3 1t1 2.3q0 1.03-1 2.46t-1.97 2.39T16 13q-2.08-1.89-3.06-2.85t-1.97-2.39T10 5.3q0-1.36.97-2.3t2.34-1q1.6 0 2.69 1.23M.984 11H5v11H.984V11Z"/>' }, dD = { width: 24, height: 24, body: '<path fill="currentColor" d="M3 3h6v4H3V3m12 7h6v4h-6v-4m0 7h6v4h-6v-4m-2-4H7v5h6v2H5V9h2v2h6v2Z"/>' }, uD = { width: 24, height: 24, body: '<path fill="currentColor" d="M13 13h-2V7h2m0 10h-2v-2h2M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2Z"/>' }, mD = { width: 24, height: 24, body: '<path fill="currentColor" d="M11.5 1L2 6v2h19V6m-5 4v7h3v-7M2 22h19v-3H2m8-9v7h3v-7m-9 0v7h3v-7H4Z"/>' }, cD = { width: 24, height: 24, body: '<path fill="currentColor" d="M21 10.12h-6.78l2.74-2.82c-2.73-2.7-7.15-2.8-9.88-.1a6.887 6.887 0 0 0 0 9.8c2.73 2.7 7.15 2.7 9.88 0c1.36-1.35 2.04-2.92 2.04-4.9h2c0 1.98-.88 4.55-2.64 6.29c-3.51 3.48-9.21 3.48-12.72 0c-3.5-3.47-3.53-9.11-.02-12.58a8.987 8.987 0 0 1 12.65 0L21 3v7.12M12.5 8v4.25l3.5 2.08l-.72 1.21L11 13V8h1.5Z"/>' }, gD = { width: 24, height: 24, body: '<path fill="currentColor" d="M19 19H5V8h14m-3-7v2H8V1H6v2H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-1V1m-1 11h-5v5h5v-5Z"/>' }, h1 = { width: 24, height: 24, body: '<path fill="currentColor" d="M20.8 22.7L15 16.9V20H9v-6H5l3.6-3.6L1.1 3l1.3-1.3l19.7 19.7l-1.3 1.3M19 6V4H7.2l2 2H19m-1.8 8H19l-7-7l-.9.9l6.1 6.1Z"/>' }, jo = { width: 24, height: 24, body: '<path fill="currentColor" d="M12 17a2 2 0 0 0 2-2a2 2 0 0 0-2-2a2 2 0 0 0-2 2a2 2 0 0 0 2 2m6-9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h1V6a5 5 0 0 1 5-5a5 5 0 0 1 5 5v2h1m-6-5a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3Z"/>' }, Vf = { width: 24, height: 24, body: '<path fill="currentColor" d="M12 20a8 8 0 0 0 8-8a8 8 0 0 0-8-8a8 8 0 0 0-8 8a8 8 0 0 0 8 8m0-18a10 10 0 0 1 10 10a10 10 0 0 1-10 10C6.47 22 2 17.5 2 12A10 10 0 0 1 12 2m.5 5v5.25l4.5 2.67l-.75 1.23L11 13V7h1.5Z"/>' }, Kf = { width: 24, height: 24, body: '<path fill="currentColor" d="M22 14v8h-2v-4l-4 4v-3h-5v-2h5v-3l4 4v-4h2M5 19h4v2H5c-1.1 0-2-.9-2-2V5a2 2 0 0 1 2-2h1V.998h2V3h8V.998h2V3h1c1.11 0 2 .89 2 2v7h-2V8H5v11Z"/>' }, hD = { width: 24, height: 24, body: '<path fill="currentColor" d="M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12S6.5 2 12 2m0 2c-1.9 0-3.6.6-4.9 1.7l11.2 11.2c1-1.4 1.7-3.1 1.7-4.9c0-4.4-3.6-8-8-8m4.9 14.3L5.7 7.1C4.6 8.4 4 10.1 4 12c0 4.4 3.6 8 8 8c1.9 0 3.6-.6 4.9-1.7Z"/>' }, fD = { width: 24, height: 24, body: '<path fill="currentColor" d="M21 7L9 19l-5.5-5.5l1.41-1.41L9 16.17L19.59 5.59L21 7Z"/>' }, _D = { width: 24, height: 24, body: '<path fill="currentColor" d="M12 9a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-4.5c5 0 9.27 3.11 11 7.5c-1.73 4.39-6 7.5-11 7.5S2.73 16.39 1 12c1.73-4.39 6-7.5 11-7.5M3.18 12a9.821 9.821 0 0 0 17.64 0a9.821 9.821 0 0 0-17.64 0Z"/>' }, pD = { width: 24, height: 24, body: '<path fill="currentColor" d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5l-1.5 1.5l-5-5v-.79l-.27-.27A6.516 6.516 0 0 1 9.5 16A6.5 6.5 0 0 1 3 9.5A6.5 6.5 0 0 1 9.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14S14 12 14 9.5S12 5 9.5 5Z"/>' }, yD = { width: 24, height: 24, body: '<path fill="currentColor" d="M11 15h2v2h-2v-2m0-8h2v6h-2V7m1-5C6.47 2 2 6.5 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m0 18a8 8 0 0 1-8-8a8 8 0 0 1 8-8a8 8 0 0 1 8 8a8 8 0 0 1-8 8Z"/>' }, wD = { width: 24, height: 24, body: '<path fill="currentColor" d="M15 4v7H5.17L4 12.17V4h11m1-2H3a1 1 0 0 0-1 1v14l4-4h10a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1m5 4h-2v9H6v2a1 1 0 0 0 1 1h11l4 4V7a1 1 0 0 0-1-1Z"/>' }, f1 = { width: 24, height: 24, body: '<path fill="currentColor" d="M21 13c.6 0 1.1.2 1.4.6c.4.4.6.9.6 1.4l-8 3l-7-2V7h1.9l7.3 2.7c.5.2.8.6.8 1.1c0 .3-.1.6-.3.8c-.2.2-.5.4-.9.4H14l-1.7-.7l-.3.9l2 .8h7M2 7h4v11H2V7Z"/>' }, vD = { width: 24, height: 24, body: '<path fill="currentColor" d="M12 8a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 2a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2m-2 12c-.25 0-.46-.18-.5-.42l-.37-2.65c-.63-.25-1.17-.59-1.69-.99l-2.49 1.01c-.22.08-.49 0-.61-.22l-2-3.46a.493.493 0 0 1 .12-.64l2.11-1.66L4.5 12l.07-1l-2.11-1.63a.493.493 0 0 1-.12-.64l2-3.46c.12-.22.39-.31.61-.22l2.49 1c.52-.39 1.06-.73 1.69-.98l.37-2.65c.04-.24.25-.42.5-.42h4c.25 0 .46.18.5.42l.37 2.65c.63.25 1.17.59 1.69.98l2.49-1c.22-.09.49 0 .61.22l2 3.46c.13.22.07.49-.12.64L19.43 11l.07 1l-.07 1l2.11 1.63c.19.15.25.42.12.64l-2 3.46c-.12.22-.39.31-.61.22l-2.49-1c-.52.39-1.06.73-1.69.98l-.37 2.65c-.04.24-.25.42-.5.42h-4m1.25-18l-.37 2.61c-1.2.25-2.26.89-3.03 1.78L5.44 7.35l-.75 1.3L6.8 10.2a5.55 5.55 0 0 0 0 3.6l-2.12 1.56l.75 1.3l2.43-1.04c.77.88 1.82 1.52 3.01 1.76l.37 2.62h1.52l.37-2.61c1.19-.25 2.24-.89 3.01-1.77l2.43 1.04l.75-1.3l-2.12-1.55c.4-1.17.4-2.44 0-3.61l2.11-1.55l-.75-1.3l-2.41 1.04a5.42 5.42 0 0 0-3.03-1.77L12.75 4h-1.5Z"/>' }, MD = { width: 24, height: 24, body: '<path fill="currentColor" d="M8.5 8.64L13.77 12L8.5 15.36V8.64M6.5 5v14l11-7"/>' }, Zf = { width: 24, height: 24, body: '<path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2Z"/>' }, _1 = { width: 24, height: 24, body: '<path fill="currentColor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2L9.19 8.62L2 9.24l5.45 4.73L5.82 21L12 17.27Z"/>' }, LD = { width: 24, height: 24, body: '<path fill="currentColor" d="M18 8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h9V6a3 3 0 0 0-3-3a3 3 0 0 0-3 3H7a5 5 0 0 1 5-5a5 5 0 0 1 5 5v2h1m-6 9a2 2 0 0 0 2-2a2 2 0 0 0-2-2a2 2 0 0 0-2 2a2 2 0 0 0 2 2Z"/>' }, kD = { width: 24, height: 24, body: '<path fill="currentColor" d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75L3 17.25Z"/>' }, TD = { width: 24, height: 24, body: '<path fill="currentColor" d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35Z"/>' }, p1 = { width: 24, height: 24, body: '<path fill="currentColor" d="M23 10a2 2 0 0 0-2-2h-6.32l.96-4.57c.02-.1.03-.21.03-.32c0-.41-.17-.79-.44-1.06L14.17 1L7.59 7.58C7.22 7.95 7 8.45 7 9v10a2 2 0 0 0 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2M1 21h4V9H1v12Z"/>' }, DD = { width: 24, height: 24, body: '<path fill="currentColor" d="M19 15h4V3h-4m-4 0H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2a2 2 0 0 0 2 2h6.31l-.95 4.57c-.02.1-.03.2-.03.31c0 .42.17.79.44 1.06L9.83 23l6.58-6.59c.37-.36.59-.86.59-1.41V5a2 2 0 0 0-2-2Z"/>' }, y1 = { width: 24, height: 24, body: '<path fill="currentColor" d="M16 17v2H2v-2s0-4 7-4s7 4 7 4m-3.5-9.5A3.5 3.5 0 1 0 9 11a3.5 3.5 0 0 0 3.5-3.5m3.44 5.5A5.32 5.32 0 0 1 18 17v2h4v-2s0-3.63-6.06-4M15 4a3.39 3.39 0 0 0-1.93.59a5 5 0 0 1 0 5.82A3.39 3.39 0 0 0 15 11a3.5 3.5 0 0 0 0-7Z"/>' }, YD = { width: 24, height: 24, body: '<path fill="currentColor" d="M10.59 13.41c.41.39.41 1.03 0 1.42c-.39.39-1.03.39-1.42 0a5.003 5.003 0 0 1 0-7.07l3.54-3.54a5.003 5.003 0 0 1 7.07 0a5.003 5.003 0 0 1 0 7.07l-1.49 1.49c.01-.82-.12-1.64-.4-2.42l.47-.48a2.982 2.982 0 0 0 0-4.24a2.982 2.982 0 0 0-4.24 0l-3.53 3.53a2.982 2.982 0 0 0 0 4.24m2.82-4.24c.39-.39 1.03-.39 1.42 0a5.003 5.003 0 0 1 0 7.07l-3.54 3.54a5.003 5.003 0 0 1-7.07 0a5.003 5.003 0 0 1 0-7.07l1.49-1.49c-.01.82.12 1.64.4 2.43l-.47.47a2.982 2.982 0 0 0 0 4.24a2.982 2.982 0 0 0 4.24 0l3.53-3.53a2.982 2.982 0 0 0 0-4.24a.973.973 0 0 1 0-1.42Z"/>' }, CD = { width: 24, height: 24, body: '<path fill="currentColor" d="M2 3h20c1.05 0 2 .95 2 2v14c0 1.05-.95 2-2 2H2c-1.05 0-2-.95-2-2V5c0-1.05.95-2 2-2m12 3v1h8V6h-8m0 2v1h8V8h-8m0 2v1h7v-1h-7m-6 3.91C6 13.91 2 15 2 17v1h12v-1c0-2-4-3.09-6-3.09M8 6a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3Z"/>' }, SD = { width: 24, height: 24, body: '<path fill="currentColor" d="m20 8l-8 5l-8-5V6l8 5l8-5m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z"/>' }, bD = { width: 24, height: 24, body: '<path fill="currentColor" d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7c0-.24-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81a3 3 0 0 0 3-3a3 3 0 0 0-3-3a3 3 0 0 0-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.15c-.05.21-.08.43-.08.66c0 1.61 1.31 2.91 2.92 2.91c1.61 0 2.92-1.3 2.92-2.91A2.92 2.92 0 0 0 18 16.08Z"/>' }, FD = { width: 24, height: 24, body: '<path fill="currentColor" d="M12 5a3.5 3.5 0 0 0-3.5 3.5A3.5 3.5 0 0 0 12 12a3.5 3.5 0 0 0 3.5-3.5A3.5 3.5 0 0 0 12 5m0 2a1.5 1.5 0 0 1 1.5 1.5A1.5 1.5 0 0 1 12 10a1.5 1.5 0 0 1-1.5-1.5A1.5 1.5 0 0 1 12 7M5.5 8A2.5 2.5 0 0 0 3 10.5c0 .94.53 1.75 1.29 2.18c.36.2.77.32 1.21.32c.44 0 .85-.12 1.21-.32c.37-.21.68-.51.91-.87A5.42 5.42 0 0 1 6.5 8.5v-.28c-.3-.14-.64-.22-1-.22m13 0c-.36 0-.7.08-1 .22v.28c0 1.2-.39 2.36-1.12 3.31c.12.19.25.34.4.49a2.482 2.482 0 0 0 1.72.7c.44 0 .85-.12 1.21-.32c.76-.43 1.29-1.24 1.29-2.18A2.5 2.5 0 0 0 18.5 8M12 14c-2.34 0-7 1.17-7 3.5V19h14v-1.5c0-2.33-4.66-3.5-7-3.5m-7.29.55C2.78 14.78 0 15.76 0 17.5V19h3v-1.93c0-1.01.69-1.85 1.71-2.52m14.58 0c1.02.67 1.71 1.51 1.71 2.52V19h3v-1.5c0-1.74-2.78-2.72-4.71-2.95M12 16c1.53 0 3.24.5 4.23 1H7.77c.99-.5 2.7-1 4.23-1Z"/>' }, xD = { width: 24, height: 24, body: '<path fill="currentColor" d="M18 19a2 2 0 0 1-2-2c0-1.11.89-2 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2m0-6a4 4 0 0 0-4 4a4 4 0 0 0 4 4a4 4 0 0 0 4-4a4 4 0 0 0-4-4m-6-1.9a1.9 1.9 0 0 0-1.9 1.9a1.9 1.9 0 0 0 1.9 1.9a1.9 1.9 0 0 0 1.9-1.9a1.9 1.9 0 0 0-1.9-1.9M6 19a2 2 0 0 1-2-2c0-1.11.89-2 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2m0-6a4 4 0 0 0-4 4a4 4 0 0 0 4 4a4 4 0 0 0 4-4a4 4 0 0 0-4-4m6-9a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2m0 6a4 4 0 0 0 4-4a4 4 0 0 0-4-4a4 4 0 0 0-4 4a4 4 0 0 0 4 4Z"/>' }, ND = { width: 24, height: 24, body: '<path fill="currentColor" d="M12 4a4 4 0 0 1 4 4c0 1.95-1.4 3.58-3.25 3.93L8.07 7.25A4.004 4.004 0 0 1 12 4m.28 10l6 6L20 21.72L18.73 23l-3-3H4v-2c0-1.84 2.5-3.39 5.87-3.86L2.78 7.05l1.27-1.27L12.28 14M20 18v1.18l-4.86-4.86C18 14.93 20 16.35 20 18Z"/>' }, AD = { width: 24, height: 24, body: '<path fill="currentColor" d="M17.06 13c-1.86 0-3.42 1.33-3.82 3.1c-.95-.41-1.82-.3-2.48-.01C10.35 14.31 8.79 13 6.94 13C4.77 13 3 14.79 3 17s1.77 4 3.94 4c2.06 0 3.74-1.62 3.9-3.68c.34-.24 1.23-.69 2.32.02c.18 2.05 1.84 3.66 3.9 3.66c2.17 0 3.94-1.79 3.94-4s-1.77-4-3.94-4M6.94 19.86c-1.56 0-2.81-1.28-2.81-2.86s1.26-2.86 2.81-2.86c1.56 0 2.81 1.28 2.81 2.86s-1.25 2.86-2.81 2.86m10.12 0c-1.56 0-2.81-1.28-2.81-2.86s1.25-2.86 2.81-2.86s2.82 1.28 2.82 2.86s-1.27 2.86-2.82 2.86M22 10.5H2V12h20v-1.5m-6.47-7.87c-.22-.49-.78-.75-1.31-.58L12 2.79l-2.23-.74l-.05-.01c-.53-.15-1.09.13-1.29.64L6 9h12l-2.44-6.32l-.03-.05Z"/>' }, ED = { width: 24, height: 24, body: '<path fill="currentColor" d="M8 3a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2H3v2h1a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h2v-2H8v-5a2 2 0 0 0-2-2a2 2 0 0 0 2-2V5h2V3m6 0a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1v2h-1a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2h-2v-2h2v-5a2 2 0 0 1 2-2a2 2 0 0 1-2-2V5h-2V3h2Z"/>' }, w1 = { width: 24, height: 24, body: '<path fill="currentColor" d="M9 22a1 1 0 0 1-1-1v-3H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6.1l-3.7 3.71c-.2.19-.45.29-.7.29H9Z"/>' }, HD = { width: 24, height: 24, body: '<path fill="currentColor" d="M19 17v2H7v-2s0-4 6-4s6 4 6 4m-3-9a3 3 0 1 0-3 3a3 3 0 0 0 3-3m3.2 5.06A5.6 5.6 0 0 1 21 17v2h3v-2s0-3.45-4.8-3.94M18 5a2.91 2.91 0 0 0-.89.14a5 5 0 0 1 0 5.72A2.91 2.91 0 0 0 18 11a3 3 0 0 0 0-6M7.34 8.92l1.16 1.41l-4.75 4.75l-2.75-3l1.16-1.16l1.59 1.58l3.59-3.58"/>' }, v1 = { width: 24, height: 24, body: '<path fill="currentColor" d="m21.1 12.5l1.4 1.41l-6.53 6.59L12.5 17l1.4-1.41l2.07 2.08l5.13-5.17M10 17l3 3H3v-2c0-2.21 3.58-4 8-4l1.89.11L10 17m1-13a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4Z"/>' }, PD = { width: 24, height: 24, body: '<path fill="currentColor" d="M7 14c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2m5.6-4c-.8-2.3-3-4-5.6-4c-3.3 0-6 2.7-6 6s2.7 6 6 6c2.6 0 4.8-1.7 5.6-4H16v4h4v-4h3v-4H12.6Z"/>' }, M1 = { width: 24, height: 24, body: '<path fill="currentColor" d="M17.9 17.39c-.26-.8-1.01-1.39-1.9-1.39h-1v-3a1 1 0 0 0-1-1H8v-2h2a1 1 0 0 0 1-1V7h2a2 2 0 0 0 2-2v-.41a7.984 7.984 0 0 1 2.9 12.8M11 19.93c-3.95-.49-7-3.85-7-7.93c0-.62.08-1.22.21-1.79L9 15v1a2 2 0 0 0 2 2m1-16A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2Z"/>' }, Qf = { width: 24, height: 24, body: '<path fill="currentColor" d="m12 1l9 4v6c0 5.55-3.84 10.74-9 12c-5.16-1.26-9-6.45-9-12V5l9-4m4 13H8v1.5c0 .27.19.46.47.5h6.96c.31 0 .52-.16.57-.41V14m1-6l-2.67 2.67L12 8.34l-2.33 2.33L7 8l1 5h8l1-5Z"/>' }, jD = { width: 24, height: 24, body: '<path fill="currentColor" d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/>' }, qD = { width: 24, height: 24, body: '<path fill="currentColor" d="M15 14c-2.67 0-8 1.33-8 4v2h16v-2c0-2.67-5.33-4-8-4m0-2a4 4 0 0 0 4-4a4 4 0 0 0-4-4a4 4 0 0 0-4 4a4 4 0 0 0 4 4M5 13.28l2.45 1.49l-.65-2.81L9 10.08l-2.89-.25L5 7.19L3.87 9.83L1 10.08l2.18 1.88l-.68 2.81L5 13.28Z"/>' }, ID = { width: 24, height: 24, body: '<path fill="currentColor" d="M7 5h14v2H7V5m0 8v-2h14v2H7M4 4.5A1.5 1.5 0 0 1 5.5 6A1.5 1.5 0 0 1 4 7.5A1.5 1.5 0 0 1 2.5 6A1.5 1.5 0 0 1 4 4.5m0 6A1.5 1.5 0 0 1 5.5 12A1.5 1.5 0 0 1 4 13.5A1.5 1.5 0 0 1 2.5 12A1.5 1.5 0 0 1 4 10.5M7 19v-2h14v2H7m-3-2.5A1.5 1.5 0 0 1 5.5 18A1.5 1.5 0 0 1 4 19.5A1.5 1.5 0 0 1 2.5 18A1.5 1.5 0 0 1 4 16.5Z"/>' }, RD = { width: 24, height: 24, body: '<path fill="currentColor" d="M19 13c.34 0 .67.04 1 .09V10a2 2 0 0 0-2-2h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6a2 2 0 0 0-2 2v10c0 1.11.89 2 2 2h7.81c-.51-.88-.81-1.9-.81-3c0-3.31 2.69-6 6-6M9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6m3 11a2 2 0 1 1 2-2c0 1.11-.89 2-2 2m10.5.25L17.75 22L15 19l1.16-1.16l1.59 1.59l3.59-3.59l1.16 1.41Z"/>' }, OD = { width: 24, height: 24, body: '<path fill="currentColor" d="M4 11v2h12l-5.5 5.5l1.42 1.42L19.84 12l-7.92-7.92L10.5 5.5L16 11H4Z"/>' }, L1 = { width: 24, height: 24, body: '<path fill="currentColor" d="M12 5.5A3.5 3.5 0 0 1 15.5 9a3.5 3.5 0 0 1-3.5 3.5A3.5 3.5 0 0 1 8.5 9A3.5 3.5 0 0 1 12 5.5M5 8c.56 0 1.08.15 1.53.42c-.15 1.43.27 2.85 1.13 3.96C7.16 13.34 6.16 14 5 14a3 3 0 0 1-3-3a3 3 0 0 1 3-3m14 0a3 3 0 0 1 3 3a3 3 0 0 1-3 3c-1.16 0-2.16-.66-2.66-1.62a5.536 5.536 0 0 0 1.13-3.96c.45-.27.97-.42 1.53-.42M5.5 18.25c0-2.07 2.91-3.75 6.5-3.75s6.5 1.68 6.5 3.75V20h-13v-1.75M0 20v-1.5c0-1.39 1.89-2.56 4.45-2.9c-.59.68-.95 1.62-.95 2.65V20H0m24 0h-3.5v-1.75c0-1.03-.36-1.97-.95-2.65c2.56.34 4.45 1.51 4.45 2.9V20Z"/>' }, UD = { width: 24, height: 24, body: '<path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v3c0 .6.4 1 1 1h.5c.2 0 .5-.1.7-.3l3.7-3.7H20c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m-9 11H7V8.8L8.3 6h2L8.9 9H11v4m6 0h-4V8.8L14.3 6h2l-1.4 3H17v4Z"/>' }, qo = { width: 24, height: 24, body: '<path fill="currentColor" d="M3 3h18v4H3V3m1 5h16v13H4V8m5.5 3a.5.5 0 0 0-.5.5V13h6v-1.5a.5.5 0 0 0-.5-.5h-5Z"/>' }, zD = { width: 24, height: 24, body: '<path fill="currentColor" d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12Z"/>' }, BD = { width: 24, height: 24, body: '<path fill="currentColor" d="M20 11v2H8l5.5 5.5l-1.42 1.42L4.16 12l7.92-7.92L13.5 5.5L8 11h12Z"/>' }, WD = { width: 24, height: 24, body: '<path fill="currentColor" d="M19 13H5v-2h14v2Z"/>' }, $D = { width: 24, height: 24, body: '<path fill="currentColor" d="m21.82 15.42l-2.5 4.33c-.49.86-1.4 1.31-2.32 1.25h-2v2l-2.5-4.5L15 14v2h2.82l-2.22-3.85l4.33-2.5l1.8 3.12c.52.77.59 1.8.09 2.65M9.21 3.06h5c.98 0 1.83.57 2.24 1.39l1 1.74l1.73-1l-2.64 4.41l-5.15.09l1.73-1l-1.41-2.45l-2.21 3.85l-4.34-2.5l1.8-3.12c.41-.83 1.26-1.41 2.25-1.41m-4.16 16.7l-2.5-4.33c-.49-.85-.42-1.87.09-2.64l1-1.73l-1.73-1l5.14.08l2.65 4.42l-1.73-1L6.56 16H11v5H7.4a2.51 2.51 0 0 1-2.35-1.24Z"/>' }, GD = { width: 24, height: 24, body: '<path fill="currentColor" d="M16 9c6 0 6 4 6 4v2h-6v-2s0-1.69-1.15-3.2c-.17-.23-.38-.45-.6-.66C14.77 9.06 15.34 9 16 9m-8 2c3.5 0 3.94 1.56 4 2H4c.06-.44.5-2 4-2m0-2c-6 0-6 4-6 4v2h12v-2s0-4-6-4m1 8v2h6v-2l3 3l-3 3v-2H9v2l-3-3l3-3M8 3c.55 0 1 .45 1 1s-.45 1-1 1s-1-.45-1-1s.45-1 1-1m0-2C6.34 1 5 2.34 5 4s1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3m8 0c-1.66 0-3 1.34-3 3s1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3Z"/>' }, k1 = { width: 24, height: 24, body: '<path fill="currentColor" d="M6 2c-1.11 0-2 .89-2 2v16a2 2 0 0 0 2 2h4v-1.91L12.09 18H6v-2h8.09l2-2H6v-2h12.09L20 10.09V8l-6-6H6m7 1.5L18.5 9H13V3.5m7.15 9.5a.55.55 0 0 0-.4.16l-1.02 1.02l2.09 2.08l1.02-1.01c.21-.22.21-.58 0-.79l-1.3-1.3a.544.544 0 0 0-.39-.16m-2.01 1.77L12 20.92V23h2.08l6.15-6.15l-2.09-2.08Z"/>' }, JD = { width: 24, height: 24, body: '<path fill="currentColor" d="M12 3C6.5 3 2 6.58 2 11a7.218 7.218 0 0 0 2.75 5.5c0 .6-.42 2.17-2.75 4.5c2.37-.11 4.64-1 6.47-2.5c1.14.33 2.34.5 3.53.5c5.5 0 10-3.58 10-8s-4.5-8-10-8m0 14c-4.42 0-8-2.69-8-6s3.58-6 8-6s8 2.69 8 6s-3.58 6-8 6Z"/>' }, VD = { width: 24, height: 24, body: '<path fill="currentColor" d="M17 7h5v10h-5v2a1 1 0 0 0 1 1h2v2h-2.5c-.55 0-1.5-.45-1.5-1c0 .55-.95 1-1.5 1H12v-2h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-2V2h2.5c.55 0 1.5.45 1.5 1c0-.55.95-1 1.5-1H20v2h-2a1 1 0 0 0-1 1v2M2 7h11v2H4v6h9v2H2V7m18 8V9h-3v6h3Z"/>' }, KD = { width: 24, height: 24, body: '<path fill="currentColor" d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z"/>' }, U = (s, r = "#000", i = 24) => ({ name: `Icon-${s.name || "custom"}`, render() {
  return ng(rD, { icon: s, color: r, width: i, height: i });
} }), ZD = { archive: U(qo, "#607D8B"), delete: U(zD, "#F44336"), back: U(BD, "#2196F3"), minus: U(WD, "#9E9E9E"), plus: U(Zf, "#4CAF50"), restore: U($D, "#009688"), transfer: U(GD, "#3F51B5"), comment: U(w1, "#2196F3"), talk: U(JD, "#00BCD4"), collectives: U(L1, "#795548"), form: U(VD, "#9C27B0"), menu: U(KD, "#607D8B"), unpublished: U(h1, "#9E9E9E"), archived: U(qo, "#9E9E9E"), closed: U(jo, "#F44336"), creation: U(Vf, "#FFC107"), suggestions: U(f1, "#4CAF50"), expiration: U(Kf, "#E91E63") }, QD = { administration: U(Qf, "#FF9800"), settings: U(jD, "#607D8B"), relevant: U(_1, "#FFC107"), myInquiries: U(qD, "#3F51B5"), private: U(jo, "#F44336"), participated: U(v1, "#009688"), open: U(M1, "#4CAF50"), all: U(ID, "#2196F3"), closed: U(RD, "#795548"), archived: U(qo, "#9E9E9E"), goTo: U(OD, "#673AB7"), group: U(L1, "#00BCD4"), add: U(Zf, "#4CAF50") }, XD = { comments: U(w1, "#2196F3"), supports: U(p1, "#4CAF50"), participants: U(HD, "#673AB7"), participated: U(v1, "#009688"), admin: U(Qf, "#FF9800"), private: U(PD, "#F44336"), open: U(M1, "#4CAF50"), archived: U(qo, "#607D8B"), expiration: U(Kf, "#F44336"), closed: U(jo, "#795548") }, Xt = { proposal: U(iD, "#FFC107"), debate: U(oD, "#2196F3"), petition: U(lD, "#E91E63"), project: U(dD, "#4CAF50"), grievance: U(uD, "#F44336"), suggestion: U(UD, "#9C27B0"), official: U(mD, "#3F51B5") }, eY = { proposal: { label: "Proposal", icon: Xt.proposal }, debate: { label: "Debate", icon: Xt.debate }, petition: { label: "Petition", icon: Xt.petition }, project: { label: "Project", icon: Xt.project }, grievance: { label: "Grievance", icon: Xt.grievance }, suggestion: { label: "Suggestion", icon: Xt.suggestion }, official: { label: "Official", icon: Xt.official } };
U(h1, "#9E9E9E"), U(qo, "#607D8B"), U(jo, "#795548"), U(Vf, "#FF9800"), U(Kf, "#F44336");
const tY = { Updated: U(cD, "#FF9800"), Calendar: U(gD, "#3F51B5"), ClockOutline: U(Vf, "#2196F3"), Cancel: U(hD, "#F44336"), Offer: U(f1, "#009688"), Check: U(fD, "#4CAF50"), EyeOutline: U(_D, "#9C27B0"), Magnify: U(pD, "#3F51B5"), AlertCircleOutline: U(yD, "#FF5722"), ForumOutline: U(wD, "#673AB7"), CogOutline: U(vD, "#607D8B"), PlayOutline: U(MD, "#8BC34A"), Plus: U(Zf, "#00BCD4"), Star: U(_1, "#FFD700"), Lock: U(jo, "#795548"), LockOpen: U(LD, "#4CAF50"), Pencil: U(kD, "#FF9800"), Heart: U(TD, "#E91E63"), ThumbUp: U(p1, "#4CAF50"), ThumbDown: U(DD, "#F44336"), AccountMultiple: U(y1, "#4CAF50"), AdminIcon: U(Qf, "#FBC02D"), LinkIcon: U(YD, "#2196F3"), ContactIcon: U(CD, "#4CAF50"), EmailIcon: U(SD, "#FF9800"), ShareIcon: U(bD, "#03A9F4"), ContactGroupIcon: U(FD, "#9C27B0"), GroupIcon: U(y1, "#4CAF50"), CircleIcon: U(xD, "#00BCD4"), DeletedUserIcon: U(ND, "#F44336"), AnoymousIcon: U(AD, "#9E9E9E"), InquiryGroupIcon: U(ED, "#673AB7"), Draft: U(k1, "#6E3ABE"), default: U(k1, "#9E9E9E") };
async function sY(s) {
  return Promise.resolve(window.confirm(s));
}
const nY = { proposal: { label: re("agora", "Proposal"), icon: Xt.proposal }, debate: { label: "Debate", icon: Xt.debate }, petition: { label: "Petition", icon: Xt.petition }, project: { label: "Project", icon: Xt.project }, grievance: { label: "Grievance", icon: Xt.grievance }, suggestion: { label: "Suggestion", icon: Xt.suggestion }, official: { label: "Official Response", icon: Xt.official } }, aY = { PROPOSAL: "proposal", PROJECT: "project", GRIEVANCE: "grievance", DEBATE: "debate", PETITION: "petition", SUGGESTION: "suggestion", OFFICIAL: "official" }, rY = { class: "empty-content", role: "note" }, iY = { key: 0, class: "empty-content__icon", "aria-hidden": "true" }, oY = { key: 0, class: "empty-content__name" }, lY = { key: 1, class: "empty-content__description" }, dY = { key: 2, class: "empty-content__action" }, uY = Xc({ __name: "NcEmptyContent", props: { description: { default: "" }, name: { default: "" } }, setup(s) {
  return (r, i) => (qe(), dt("div", rY, [r.$slots.icon ? (qe(), dt("div", iY, [Vs(r.$slots, "icon", {}, void 0, true)])) : Cs("", true), Vs(r.$slots, "name", {}, () => [r.name !== "" ? (qe(), dt("span", oY, Ca(r.name), 1)) : Cs("", true)], true), r.description !== "" || r.$slots.description ? (qe(), dt("p", lY, [Vs(r.$slots, "description", {}, () => [eg(Ca(r.description), 1)], true)])) : Cs("", true), r.$slots.action ? (qe(), dt("div", dY, [Vs(r.$slots, "action", {}, void 0, true)])) : Cs("", true)]));
} }), T1 = Jd(uY, [["__scopeId", "data-v-697cfd8f"]]), mY = { name: "NcDashboardWidgetItem", components: { NcAvatar: E_, NcActions: rL, NcActionButton: aL }, props: { id: { type: [String, Number], default: void 0 }, targetUrl: { type: String, default: void 0 }, avatarUrl: { type: String, default: void 0 }, avatarUsername: { type: String, default: void 0 }, avatarIsNoUser: { type: Boolean, default: false }, overlayIconUrl: { type: String, default: void 0 }, mainText: { type: String, required: true }, subText: { type: String, default: "" }, itemMenu: { type: Object, default: () => ({}) }, forceMenu: { type: Boolean, default: true } }, data() {
  return { hovered: false };
}, computed: { item() {
  return { id: this.id, targetUrl: this.targetUrl, avatarUrl: this.avatarUrl, avatarUsername: this.avatarUsername, overlayIconUrl: this.overlayIconUrl, mainText: this.mainText, subText: this.subText };
}, gotMenu() {
  return Object.keys(this.itemMenu).length !== 0 || !!this.$slots.actions;
}, gotOverlayIcon() {
  return this.overlayIconUrl && this.overlayIconUrl !== "";
} }, methods: { onLinkClick(s) {
  s.target.closest(".action-item") && s.preventDefault();
} } }, cY = ["src"], gY = { class: "item__details" }, hY = ["title"], fY = ["title"];
function _Y(s, r, i, l, m, g) {
  const h = nr("NcAvatar"), p = nr("NcActionButton"), M = nr("NcActions");
  return qe(), dt("div", { onMouseover: r[0] || (r[0] = (v) => m.hovered = true), onMouseleave: r[1] || (r[1] = (v) => m.hovered = false) }, [(qe(), Ya(lL(i.targetUrl ? "a" : "div"), { href: i.targetUrl || void 0, target: i.targetUrl ? "_blank" : void 0, class: oL({ "item-list__entry": true, "item-list__entry--has-actions-menu": g.gotMenu }), onClick: g.onLinkClick }, { default: sr(() => [Vs(s.$slots, "avatar", { avatarUrl: i.avatarUrl, avatarUsername: i.avatarUsername }, () => [Vd(h, { class: "item-avatar", size: 44, url: i.avatarUrl, user: i.avatarUsername, "is-no-user": i.avatarIsNoUser, "hide-status": g.gotOverlayIcon }, null, 8, ["url", "user", "is-no-user", "hide-status"])], true), i.overlayIconUrl ? (qe(), dt("img", { key: 0, class: "item-icon", alt: "", src: i.overlayIconUrl }, null, 8, cY)) : Cs("", true), ba("div", gY, [ba("h3", { title: i.mainText }, Ca(i.mainText), 9, hY), i.subText !== "" ? (qe(), dt("span", { key: 0, class: "message", title: i.subText }, Ca(i.subText), 9, fY)) : Cs("", true)]), g.gotMenu ? (qe(), Ya(M, { key: 1, "force-menu": i.forceMenu }, { default: sr(() => [Vs(s.$slots, "actions", {}, () => [(qe(true), dt(ag, null, rg(i.itemMenu, (v, D) => (qe(), Ya(p, { key: D, icon: v.icon, "close-after-click": true, onClick: iL((S) => s.$emit(D, g.item), ["prevent", "stop"]) }, { default: sr(() => [eg(Ca(v.text), 1)]), _: 2 }, 1032, ["icon", "onClick"]))), 128))], true)]), _: 3 }, 8, ["force-menu"])) : Cs("", true)]), _: 3 }, 8, ["href", "target", "class", "onClick"]))], 32);
}
const pY = Jd(mY, [["render", _Y], ["__scopeId", "data-v-68bcbc90"]]), yY = { name: "CheckIcon", emits: ["click"], props: { title: { type: String }, fillColor: { type: String, default: "currentColor" }, size: { type: Number, default: 24 } } }, wY = ["aria-hidden", "aria-label"], vY = ["fill", "width", "height"], MY = { d: "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" }, LY = { key: 0 };
function kY(s, r, i, l, m, g) {
  return qe(), dt("span", H_(s.$attrs, { "aria-hidden": i.title ? null : "true", "aria-label": i.title, class: "material-design-icon check-icon", role: "img", onClick: r[0] || (r[0] = (h) => s.$emit("click", h)) }), [(qe(), dt("svg", { fill: i.fillColor, class: "material-design-icon__svg", width: i.size, height: i.size, viewBox: "0 0 24 24" }, [ba("path", MY, [i.title ? (qe(), dt("title", LY, Ca(i.title), 1)) : Cs("", true)])], 8, vY))], 16, wY);
}
const TY = Jd(yY, [["render", kY]]);
x_(dL);
const DY = { name: "NcDashboardWidget", components: { NcAvatar: E_, NcDashboardWidgetItem: pY, NcEmptyContent: T1, Check: TY }, props: { items: { type: Array, default: () => [] }, showMoreUrl: { type: String, default: "" }, showMoreLabel: { type: String, default: N_("More items …") }, loading: { type: Boolean, default: false }, itemMenu: { type: Object, default: () => ({}) }, showItemsAndEmptyContent: { type: Boolean, default: false }, emptyContentMessage: { type: String, default: "" }, halfEmptyContentMessage: { type: String, default: "" } }, computed: { handlers() {
  const s = {};
  for (const r in this.itemMenu) s[r] = (i) => {
    this.$emit(r, i);
  };
  return s;
}, displayedItems() {
  const s = this.showMoreUrl && this.items.length >= this.maxItemNumber ? this.maxItemNumber - 1 : this.maxItemNumber;
  return this.items.slice(0, s);
}, showHalfEmptyContentArea() {
  return this.showItemsAndEmptyContent && this.halfEmptyContentString && this.items.length !== 0;
}, halfEmptyContentString() {
  return this.halfEmptyContentMessage || this.emptyContentMessage;
}, maxItemNumber() {
  return this.showItemsAndEmptyContent ? 5 : 7;
}, showMore() {
  return this.showMoreUrl && this.items.length >= this.maxItemNumber;
} } }, YY = { class: "dashboard-widget" }, CY = { key: 1 }, SY = ["href"];
function bY(s, r, i, l, m, g) {
  const h = nr("Check"), p = nr("NcEmptyContent"), M = nr("NcDashboardWidgetItem"), v = nr("NcAvatar");
  return qe(), dt("div", YY, [g.showHalfEmptyContentArea ? (qe(), Ya(p, { key: 0, description: g.halfEmptyContentString, class: "half-screen" }, { icon: sr(() => [Vs(s.$slots, "halfEmptyContentIcon", {}, () => [Vd(h)], true)]), _: 3 }, 8, ["description"])) : Cs("", true), ba("ul", null, [(qe(true), dt(ag, null, rg(g.displayedItems, (D) => (qe(), dt("li", { key: D.id }, [Vs(s.$slots, "default", { item: D }, () => [Vd(M, H_({ ref_for: true }, D, { "item-menu": i.itemMenu }, uL(g.handlers)), null, 16, ["item-menu"])], true)]))), 128))]), i.loading ? (qe(), dt("div", CY, [(qe(), dt(ag, null, rg(7, (D) => ba("div", { key: D, class: "item-list__entry" }, [Vd(v, { class: "item-avatar", size: 44 }), r[0] || (r[0] = ba("div", { class: "item__details" }, [ba("h3", null, " "), ba("p", { class: "message" }, "   ")], -1))])), 64))])) : i.items.length === 0 ? Vs(s.$slots, "empty-content", { key: 2 }, () => [i.emptyContentMessage ? (qe(), Ya(p, { key: 0, description: i.emptyContentMessage }, { icon: sr(() => [Vs(s.$slots, "emptyContentIcon", {}, void 0, true)]), _: 3 }, 8, ["description"])) : Cs("", true)], true) : g.showMore ? (qe(), dt("a", { key: 3, href: i.showMoreUrl, target: "_blank", class: "more", tabindex: "0" }, Ca(i.showMoreLabel), 9, SY)) : Cs("", true)]);
}
const FY = Jd(DY, [["render", bY], ["__scopeId", "data-v-2d259f64"]]);
export {
  sp as A,
  XD as B,
  Af as C,
  bo as D,
  Pf as E,
  sY as F,
  Ef as G,
  B0 as H,
  nY as I,
  Z as L,
  FY as N,
  tY as S,
  l2 as _,
  It as a,
  ke as b,
  j0 as c,
  P0 as d,
  aY as e,
  H0 as f,
  tp as g,
  ZD as h,
  rt as i,
  di as j,
  h2 as k,
  lp as l,
  Ce as m,
  li as n,
  bs as o,
  QD as p,
  Ge as q,
  T1 as r,
  yg as s,
  eY as t,
  ir as u,
  O0 as v,
  Zk as w,
  g2 as x,
  Hf as y,
  Ss as z
};
//# sourceMappingURL=NcDashboardWidget-Wkx_9xKh-BCkJxwfa.chunk.mjs.map
