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
const eC = "agora", tC = "1.0.0-rc5";
import { aU as C_, X as Kc, aV as $w, aW as b_, a3 as S_, d as Zc, P as tr, e as Ya, o as qe, w as sr, B as Qc, z as Ca, r as Js, x as Cs, u as qd, ab as Gw, a4 as F_, J as Vw, U as Jw, aX as Id, K as pn, aY as Rd, aZ as Od, a_ as Xc, a$ as ba, b0 as x_, b1 as Ud, b2 as Kw, k as zd, t as re, O as Zw, aO as Bd, C as Qw, aQ as Xw, aP as eg, b3 as eM, D as tM, b4 as sM, b as nM, q as aM, b5 as rM, ar as tg, aJ as iM, i as Wd, c as dt, b6 as oM, b7 as lM, N as N_, V as nr, a as Sa, f as $d, L as sg, M as ng, ae as dM, I as mM, s as uM, b8 as cM, v as A_, aa as gM } from "./NcEmptyContent-q-geAf0w-OoTkDdhx.chunk.mjs";
const te = C_().setApp("agora").detectUser().build();
function hM(s) {
  const i = s.reduce((u, g) => (u[g.id] = g, u), {}), r = s.filter((u) => u.parent === 0).sort((u, g) => g.timestamp - u.timestamp).map((u) => {
    const f = l(u.id).sort((p, L) => {
      const w = i[p.id], D = i[L.id];
      return w && D ? w.timestamp !== D.timestamp ? D.timestamp - w.timestamp : D.id - w.id : L.id - p.id;
    });
    return { ...u, comments: f };
  });
  function l(u) {
    const g = [], f = [u];
    for (; f.length > 0; ) {
      const p = f.pop();
      if (p !== void 0) {
        const L = i[p];
        if (L) {
          g.push({ ...L });
          const w = s.filter((D) => D.parent === p).map((D) => D.id);
          f.push(...w);
        }
      }
    }
    return g;
  }
  return r;
}
function ag() {
  return { async: false, breaks: false, extensions: null, gfm: true, hooks: null, pedantic: false, renderer: null, silent: false, tokenizer: null, walkTokens: null };
}
var ar = ag();
function E_(s) {
  ar = s;
}
var Mo = { exec: () => null };
function Se(s, i = "") {
  let r = typeof s == "string" ? s : s.source;
  const l = { replace: (u, g) => {
    let f = typeof g == "string" ? g : g.source;
    return f = f.replace(qt.caret, "$1"), r = r.replace(u, f), l;
  }, getRegex: () => new RegExp(r, i) };
  return l;
}
var qt = { codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, listReplaceTabs: /^\t+/, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\] /, listReplaceTask: /^\[[ xX]\] +/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (s) => new RegExp(`^( {0,3}${s})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: (s) => new RegExp(`^ {0,${Math.min(3, s - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), hrRegex: (s) => new RegExp(`^ {0,${Math.min(3, s - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), fencesBeginRegex: (s) => new RegExp(`^ {0,${Math.min(3, s - 1)}}(?:\`\`\`|~~~)`), headingBeginRegex: (s) => new RegExp(`^ {0,${Math.min(3, s - 1)}}#`), htmlBeginRegex: (s) => new RegExp(`^ {0,${Math.min(3, s - 1)}}<(?:[a-z].*>|!--)`, "i") }, fM = /^(?:[ \t]*(?:\n|$))+/, _M = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, pM = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, Lo = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, yM = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, rg = /(?:[*+-]|\d{1,9}[.)])/, H_ = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, P_ = Se(H_).replace(/bull/g, rg).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), vM = Se(H_).replace(/bull/g, rg).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), ig = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, wM = /^[^\n]+/, og = /(?!\s*\])(?:\\.|[^\[\]\\])+/, MM = Se(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", og).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), LM = Se(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, rg).getRegex(), Gd = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", lg = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, kM = Se("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", lg).replace("tag", Gd).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), j_ = Se(ig).replace("hr", Lo).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Gd).getRegex(), TM = Se(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", j_).getRegex(), dg = { blockquote: TM, code: _M, def: MM, fences: pM, heading: yM, hr: Lo, html: kM, lheading: P_, list: LM, newline: fM, paragraph: j_, table: Mo, text: wM }, q_ = Se("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", Lo).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Gd).getRegex(), DM = { ...dg, lheading: vM, table: q_, paragraph: Se(ig).replace("hr", Lo).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", q_).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Gd).getRegex() }, YM = { ...dg, html: Se(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", lg).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: Mo, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: Se(ig).replace("hr", Lo).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", P_).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() }, CM = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, bM = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, I_ = /^( {2,}|\\)\n(?!\s*$)/, SM = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, Vd = /[\p{P}\p{S}]/u, mg = /[\s\p{P}\p{S}]/u, R_ = /[^\s\p{P}\p{S}]/u, FM = Se(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, mg).getRegex(), O_ = /(?!~)[\p{P}\p{S}]/u, xM = /(?!~)[\s\p{P}\p{S}]/u, NM = /(?:[^\s\p{P}\p{S}]|~)/u, AM = /\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g, U_ = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/, EM = Se(U_, "u").replace(/punct/g, Vd).getRegex(), HM = Se(U_, "u").replace(/punct/g, O_).getRegex(), z_ = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", PM = Se(z_, "gu").replace(/notPunctSpace/g, R_).replace(/punctSpace/g, mg).replace(/punct/g, Vd).getRegex(), jM = Se(z_, "gu").replace(/notPunctSpace/g, NM).replace(/punctSpace/g, xM).replace(/punct/g, O_).getRegex(), qM = Se("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, R_).replace(/punctSpace/g, mg).replace(/punct/g, Vd).getRegex(), IM = Se(/\\(punct)/, "gu").replace(/punct/g, Vd).getRegex(), RM = Se(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), OM = Se(lg).replace("(?:-->|$)", "-->").getRegex(), UM = Se("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", OM).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), Jd = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/, zM = Se(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", Jd).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), B_ = Se(/^!?\[(label)\]\[(ref)\]/).replace("label", Jd).replace("ref", og).getRegex(), W_ = Se(/^!?\[(ref)\](?:\[\])?/).replace("ref", og).getRegex(), BM = Se("reflink|nolink(?!\\()", "g").replace("reflink", B_).replace("nolink", W_).getRegex(), ug = { _backpedal: Mo, anyPunctuation: IM, autolink: RM, blockSkip: AM, br: I_, code: bM, del: Mo, emStrongLDelim: EM, emStrongRDelimAst: PM, emStrongRDelimUnd: qM, escape: CM, link: zM, nolink: W_, punctuation: FM, reflink: B_, reflinkSearch: BM, tag: UM, text: SM, url: Mo }, WM = { ...ug, link: Se(/^!?\[(label)\]\((.*?)\)/).replace("label", Jd).getRegex(), reflink: Se(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", Jd).getRegex() }, cg = { ...ug, emStrongRDelimAst: jM, emStrongLDelim: HM, url: Se(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/, text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/ }, $M = { ...cg, br: Se(I_).replace("{2,}", "*").getRegex(), text: Se(cg.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() }, Kd = { normal: dg, gfm: DM, pedantic: YM }, ko = { normal: ug, gfm: cg, breaks: $M, pedantic: WM }, GM = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, $_ = (s) => GM[s];
function yn(s, i) {
  if (i) {
    if (qt.escapeTest.test(s)) return s.replace(qt.escapeReplace, $_);
  } else if (qt.escapeTestNoEncode.test(s)) return s.replace(qt.escapeReplaceNoEncode, $_);
  return s;
}
function G_(s) {
  try {
    s = encodeURI(s).replace(qt.percentDecode, "%");
  } catch {
    return null;
  }
  return s;
}
function V_(s, i) {
  const r = s.replace(qt.findPipe, (g, f, p) => {
    let L = false, w = f;
    for (; --w >= 0 && p[w] === "\\"; ) L = !L;
    return L ? "|" : " |";
  }), l = r.split(qt.splitPipe);
  let u = 0;
  if (l[0].trim() || l.shift(), l.length > 0 && !l.at(-1)?.trim() && l.pop(), i) if (l.length > i) l.splice(i);
  else for (; l.length < i; ) l.push("");
  for (; u < l.length; u++) l[u] = l[u].trim().replace(qt.slashPipe, "|");
  return l;
}
function To(s, i, r) {
  const l = s.length;
  if (l === 0) return "";
  let u = 0;
  for (; u < l && s.charAt(l - u - 1) === i; ) u++;
  return s.slice(0, l - u);
}
function VM(s, i) {
  if (s.indexOf(i[1]) === -1) return -1;
  let r = 0;
  for (let l = 0; l < s.length; l++) if (s[l] === "\\") l++;
  else if (s[l] === i[0]) r++;
  else if (s[l] === i[1] && (r--, r < 0)) return l;
  return r > 0 ? -2 : -1;
}
function J_(s, i, r, l, u) {
  const g = i.href, f = i.title || null, p = s[1].replace(u.other.outputLinkReplace, "$1");
  l.state.inLink = true;
  const L = { type: s[0].charAt(0) === "!" ? "image" : "link", raw: r, href: g, title: f, text: p, tokens: l.inlineTokens(p) };
  return l.state.inLink = false, L;
}
function JM(s, i, r) {
  const l = s.match(r.other.indentCodeCompensation);
  if (l === null) return i;
  const u = l[1];
  return i.split(`
`).map((g) => {
    const f = g.match(r.other.beginningSpace);
    if (f === null) return g;
    const [p] = f;
    return p.length >= u.length ? g.slice(u.length) : g;
  }).join(`
`);
}
var Zd = class {
  options;
  rules;
  lexer;
  constructor(s) {
    this.options = s || ar;
  }
  space(s) {
    const i = this.rules.block.newline.exec(s);
    if (i && i[0].length > 0) return { type: "space", raw: i[0] };
  }
  code(s) {
    const i = this.rules.block.code.exec(s);
    if (i) {
      const r = i[0].replace(this.rules.other.codeRemoveIndent, "");
      return { type: "code", raw: i[0], codeBlockStyle: "indented", text: this.options.pedantic ? r : To(r, `
`) };
    }
  }
  fences(s) {
    const i = this.rules.block.fences.exec(s);
    if (i) {
      const r = i[0], l = JM(r, i[3] || "", this.rules);
      return { type: "code", raw: r, lang: i[2] ? i[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : i[2], text: l };
    }
  }
  heading(s) {
    const i = this.rules.block.heading.exec(s);
    if (i) {
      let r = i[2].trim();
      if (this.rules.other.endingHash.test(r)) {
        const l = To(r, "#");
        (this.options.pedantic || !l || this.rules.other.endingSpaceChar.test(l)) && (r = l.trim());
      }
      return { type: "heading", raw: i[0], depth: i[1].length, text: r, tokens: this.lexer.inline(r) };
    }
  }
  hr(s) {
    const i = this.rules.block.hr.exec(s);
    if (i) return { type: "hr", raw: To(i[0], `
`) };
  }
  blockquote(s) {
    const i = this.rules.block.blockquote.exec(s);
    if (i) {
      let r = To(i[0], `
`).split(`
`), l = "", u = "";
      const g = [];
      for (; r.length > 0; ) {
        let f = false;
        const p = [];
        let L;
        for (L = 0; L < r.length; L++) if (this.rules.other.blockquoteStart.test(r[L])) p.push(r[L]), f = true;
        else if (!f) p.push(r[L]);
        else break;
        r = r.slice(L);
        const w = p.join(`
`), D = w.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        l = l ? `${l}
${w}` : w, u = u ? `${u}
${D}` : D;
        const b = this.lexer.state.top;
        if (this.lexer.state.top = true, this.lexer.blockTokens(D, g, true), this.lexer.state.top = b, r.length === 0) break;
        const H = g.at(-1);
        if (H?.type === "code") break;
        if (H?.type === "blockquote") {
          const N = H, q = N.raw + `
` + r.join(`
`), O = this.blockquote(q);
          g[g.length - 1] = O, l = l.substring(0, l.length - N.raw.length) + O.raw, u = u.substring(0, u.length - N.text.length) + O.text;
          break;
        } else if (H?.type === "list") {
          const N = H, q = N.raw + `
` + r.join(`
`), O = this.list(q);
          g[g.length - 1] = O, l = l.substring(0, l.length - H.raw.length) + O.raw, u = u.substring(0, u.length - N.raw.length) + O.raw, r = q.substring(g.at(-1).raw.length).split(`
`);
          continue;
        }
      }
      return { type: "blockquote", raw: l, tokens: g, text: u };
    }
  }
  list(s) {
    let i = this.rules.block.list.exec(s);
    if (i) {
      let r = i[1].trim();
      const l = r.length > 1, u = { type: "list", raw: "", ordered: l, start: l ? +r.slice(0, -1) : "", loose: false, items: [] };
      r = l ? `\\d{1,9}\\${r.slice(-1)}` : `\\${r}`, this.options.pedantic && (r = l ? r : "[*+-]");
      const g = this.rules.other.listItemRegex(r);
      let f = false;
      for (; s; ) {
        let L = false, w = "", D = "";
        if (!(i = g.exec(s)) || this.rules.block.hr.test(s)) break;
        w = i[0], s = s.substring(w.length);
        let b = i[2].split(`
`, 1)[0].replace(this.rules.other.listReplaceTabs, (Q) => " ".repeat(3 * Q.length)), H = s.split(`
`, 1)[0], N = !b.trim(), q = 0;
        if (this.options.pedantic ? (q = 2, D = b.trimStart()) : N ? q = i[1].length + 1 : (q = i[2].search(this.rules.other.nonSpaceChar), q = q > 4 ? 1 : q, D = b.slice(q), q += i[1].length), N && this.rules.other.blankLine.test(H) && (w += H + `
`, s = s.substring(H.length + 1), L = true), !L) {
          const Q = this.rules.other.nextBulletRegex(q), X = this.rules.other.hrRegex(q), se = this.rules.other.fencesBeginRegex(q), Z = this.rules.other.headingBeginRegex(q), ge = this.rules.other.htmlBeginRegex(q);
          for (; s; ) {
            const B = s.split(`
`, 1)[0];
            let V;
            if (H = B, this.options.pedantic ? (H = H.replace(this.rules.other.listReplaceNesting, "  "), V = H) : V = H.replace(this.rules.other.tabCharGlobal, "    "), se.test(H) || Z.test(H) || ge.test(H) || Q.test(H) || X.test(H)) break;
            if (V.search(this.rules.other.nonSpaceChar) >= q || !H.trim()) D += `
` + V.slice(q);
            else {
              if (N || b.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || se.test(b) || Z.test(b) || X.test(b)) break;
              D += `
` + H;
            }
            !N && !H.trim() && (N = true), w += B + `
`, s = s.substring(B.length + 1), b = V.slice(q);
          }
        }
        u.loose || (f ? u.loose = true : this.rules.other.doubleBlankLine.test(w) && (f = true));
        let O = null, x;
        this.options.gfm && (O = this.rules.other.listIsTask.exec(D), O && (x = O[0] !== "[ ] ", D = D.replace(this.rules.other.listReplaceTask, ""))), u.items.push({ type: "list_item", raw: w, task: !!O, checked: x, loose: false, text: D, tokens: [] }), u.raw += w;
      }
      const p = u.items.at(-1);
      if (p) p.raw = p.raw.trimEnd(), p.text = p.text.trimEnd();
      else return;
      u.raw = u.raw.trimEnd();
      for (let L = 0; L < u.items.length; L++) if (this.lexer.state.top = false, u.items[L].tokens = this.lexer.blockTokens(u.items[L].text, []), !u.loose) {
        const w = u.items[L].tokens.filter((b) => b.type === "space"), D = w.length > 0 && w.some((b) => this.rules.other.anyLine.test(b.raw));
        u.loose = D;
      }
      if (u.loose) for (let L = 0; L < u.items.length; L++) u.items[L].loose = true;
      return u;
    }
  }
  html(s) {
    const i = this.rules.block.html.exec(s);
    if (i) return { type: "html", block: true, raw: i[0], pre: i[1] === "pre" || i[1] === "script" || i[1] === "style", text: i[0] };
  }
  def(s) {
    const i = this.rules.block.def.exec(s);
    if (i) {
      const r = i[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "), l = i[2] ? i[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", u = i[3] ? i[3].substring(1, i[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : i[3];
      return { type: "def", tag: r, raw: i[0], href: l, title: u };
    }
  }
  table(s) {
    const i = this.rules.block.table.exec(s);
    if (!i || !this.rules.other.tableDelimiter.test(i[2])) return;
    const r = V_(i[1]), l = i[2].replace(this.rules.other.tableAlignChars, "").split("|"), u = i[3]?.trim() ? i[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], g = { type: "table", raw: i[0], header: [], align: [], rows: [] };
    if (r.length === l.length) {
      for (const f of l) this.rules.other.tableAlignRight.test(f) ? g.align.push("right") : this.rules.other.tableAlignCenter.test(f) ? g.align.push("center") : this.rules.other.tableAlignLeft.test(f) ? g.align.push("left") : g.align.push(null);
      for (let f = 0; f < r.length; f++) g.header.push({ text: r[f], tokens: this.lexer.inline(r[f]), header: true, align: g.align[f] });
      for (const f of u) g.rows.push(V_(f, g.header.length).map((p, L) => ({ text: p, tokens: this.lexer.inline(p), header: false, align: g.align[L] })));
      return g;
    }
  }
  lheading(s) {
    const i = this.rules.block.lheading.exec(s);
    if (i) return { type: "heading", raw: i[0], depth: i[2].charAt(0) === "=" ? 1 : 2, text: i[1], tokens: this.lexer.inline(i[1]) };
  }
  paragraph(s) {
    const i = this.rules.block.paragraph.exec(s);
    if (i) {
      const r = i[1].charAt(i[1].length - 1) === `
` ? i[1].slice(0, -1) : i[1];
      return { type: "paragraph", raw: i[0], text: r, tokens: this.lexer.inline(r) };
    }
  }
  text(s) {
    const i = this.rules.block.text.exec(s);
    if (i) return { type: "text", raw: i[0], text: i[0], tokens: this.lexer.inline(i[0]) };
  }
  escape(s) {
    const i = this.rules.inline.escape.exec(s);
    if (i) return { type: "escape", raw: i[0], text: i[1] };
  }
  tag(s) {
    const i = this.rules.inline.tag.exec(s);
    if (i) return !this.lexer.state.inLink && this.rules.other.startATag.test(i[0]) ? this.lexer.state.inLink = true : this.lexer.state.inLink && this.rules.other.endATag.test(i[0]) && (this.lexer.state.inLink = false), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(i[0]) ? this.lexer.state.inRawBlock = true : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(i[0]) && (this.lexer.state.inRawBlock = false), { type: "html", raw: i[0], inLink: this.lexer.state.inLink, inRawBlock: this.lexer.state.inRawBlock, block: false, text: i[0] };
  }
  link(s) {
    const i = this.rules.inline.link.exec(s);
    if (i) {
      const r = i[2].trim();
      if (!this.options.pedantic && this.rules.other.startAngleBracket.test(r)) {
        if (!this.rules.other.endAngleBracket.test(r)) return;
        const g = To(r.slice(0, -1), "\\");
        if ((r.length - g.length) % 2 === 0) return;
      } else {
        const g = VM(i[2], "()");
        if (g === -2) return;
        if (g > -1) {
          const p = (i[0].indexOf("!") === 0 ? 5 : 4) + i[1].length + g;
          i[2] = i[2].substring(0, g), i[0] = i[0].substring(0, p).trim(), i[3] = "";
        }
      }
      let l = i[2], u = "";
      if (this.options.pedantic) {
        const g = this.rules.other.pedanticHrefTitle.exec(l);
        g && (l = g[1], u = g[3]);
      } else u = i[3] ? i[3].slice(1, -1) : "";
      return l = l.trim(), this.rules.other.startAngleBracket.test(l) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(r) ? l = l.slice(1) : l = l.slice(1, -1)), J_(i, { href: l && l.replace(this.rules.inline.anyPunctuation, "$1"), title: u && u.replace(this.rules.inline.anyPunctuation, "$1") }, i[0], this.lexer, this.rules);
    }
  }
  reflink(s, i) {
    let r;
    if ((r = this.rules.inline.reflink.exec(s)) || (r = this.rules.inline.nolink.exec(s))) {
      const l = (r[2] || r[1]).replace(this.rules.other.multipleSpaceGlobal, " "), u = i[l.toLowerCase()];
      if (!u) {
        const g = r[0].charAt(0);
        return { type: "text", raw: g, text: g };
      }
      return J_(r, u, r[0], this.lexer, this.rules);
    }
  }
  emStrong(s, i, r = "") {
    let l = this.rules.inline.emStrongLDelim.exec(s);
    if (!l || l[3] && r.match(this.rules.other.unicodeAlphaNumeric)) return;
    if (!(l[1] || l[2] || "") || !r || this.rules.inline.punctuation.exec(r)) {
      const g = [...l[0]].length - 1;
      let f, p, L = g, w = 0;
      const D = l[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (D.lastIndex = 0, i = i.slice(-1 * s.length + g); (l = D.exec(i)) != null; ) {
        if (f = l[1] || l[2] || l[3] || l[4] || l[5] || l[6], !f) continue;
        if (p = [...f].length, l[3] || l[4]) {
          L += p;
          continue;
        } else if ((l[5] || l[6]) && g % 3 && !((g + p) % 3)) {
          w += p;
          continue;
        }
        if (L -= p, L > 0) continue;
        p = Math.min(p, p + L + w);
        const b = [...l[0]][0].length, H = s.slice(0, g + l.index + b + p);
        if (Math.min(g, p) % 2) {
          const q = H.slice(1, -1);
          return { type: "em", raw: H, text: q, tokens: this.lexer.inlineTokens(q) };
        }
        const N = H.slice(2, -2);
        return { type: "strong", raw: H, text: N, tokens: this.lexer.inlineTokens(N) };
      }
    }
  }
  codespan(s) {
    const i = this.rules.inline.code.exec(s);
    if (i) {
      let r = i[2].replace(this.rules.other.newLineCharGlobal, " ");
      const l = this.rules.other.nonSpaceChar.test(r), u = this.rules.other.startingSpaceChar.test(r) && this.rules.other.endingSpaceChar.test(r);
      return l && u && (r = r.substring(1, r.length - 1)), { type: "codespan", raw: i[0], text: r };
    }
  }
  br(s) {
    const i = this.rules.inline.br.exec(s);
    if (i) return { type: "br", raw: i[0] };
  }
  del(s) {
    const i = this.rules.inline.del.exec(s);
    if (i) return { type: "del", raw: i[0], text: i[2], tokens: this.lexer.inlineTokens(i[2]) };
  }
  autolink(s) {
    const i = this.rules.inline.autolink.exec(s);
    if (i) {
      let r, l;
      return i[2] === "@" ? (r = i[1], l = "mailto:" + r) : (r = i[1], l = r), { type: "link", raw: i[0], text: r, href: l, tokens: [{ type: "text", raw: r, text: r }] };
    }
  }
  url(s) {
    let i;
    if (i = this.rules.inline.url.exec(s)) {
      let r, l;
      if (i[2] === "@") r = i[0], l = "mailto:" + r;
      else {
        let u;
        do
          u = i[0], i[0] = this.rules.inline._backpedal.exec(i[0])?.[0] ?? "";
        while (u !== i[0]);
        r = i[0], i[1] === "www." ? l = "http://" + i[0] : l = i[0];
      }
      return { type: "link", raw: i[0], text: r, href: l, tokens: [{ type: "text", raw: r, text: r }] };
    }
  }
  inlineText(s) {
    const i = this.rules.inline.text.exec(s);
    if (i) {
      const r = this.lexer.state.inRawBlock;
      return { type: "text", raw: i[0], text: i[0], escaped: r };
    }
  }
}, On = class Zf {
  tokens;
  options;
  state;
  tokenizer;
  inlineQueue;
  constructor(i) {
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = i || ar, this.options.tokenizer = this.options.tokenizer || new Zd(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: false, inRawBlock: false, top: true };
    const r = { other: qt, block: Kd.normal, inline: ko.normal };
    this.options.pedantic ? (r.block = Kd.pedantic, r.inline = ko.pedantic) : this.options.gfm && (r.block = Kd.gfm, this.options.breaks ? r.inline = ko.breaks : r.inline = ko.gfm), this.tokenizer.rules = r;
  }
  static get rules() {
    return { block: Kd, inline: ko };
  }
  static lex(i, r) {
    return new Zf(r).lex(i);
  }
  static lexInline(i, r) {
    return new Zf(r).inlineTokens(i);
  }
  lex(i) {
    i = i.replace(qt.carriageReturn, `
`), this.blockTokens(i, this.tokens);
    for (let r = 0; r < this.inlineQueue.length; r++) {
      const l = this.inlineQueue[r];
      this.inlineTokens(l.src, l.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(i, r = [], l = false) {
    for (this.options.pedantic && (i = i.replace(qt.tabCharGlobal, "    ").replace(qt.spaceLine, "")); i; ) {
      let u;
      if (this.options.extensions?.block?.some((f) => (u = f.call({ lexer: this }, i, r)) ? (i = i.substring(u.raw.length), r.push(u), true) : false)) continue;
      if (u = this.tokenizer.space(i)) {
        i = i.substring(u.raw.length);
        const f = r.at(-1);
        u.raw.length === 1 && f !== void 0 ? f.raw += `
` : r.push(u);
        continue;
      }
      if (u = this.tokenizer.code(i)) {
        i = i.substring(u.raw.length);
        const f = r.at(-1);
        f?.type === "paragraph" || f?.type === "text" ? (f.raw += `
` + u.raw, f.text += `
` + u.text, this.inlineQueue.at(-1).src = f.text) : r.push(u);
        continue;
      }
      if (u = this.tokenizer.fences(i)) {
        i = i.substring(u.raw.length), r.push(u);
        continue;
      }
      if (u = this.tokenizer.heading(i)) {
        i = i.substring(u.raw.length), r.push(u);
        continue;
      }
      if (u = this.tokenizer.hr(i)) {
        i = i.substring(u.raw.length), r.push(u);
        continue;
      }
      if (u = this.tokenizer.blockquote(i)) {
        i = i.substring(u.raw.length), r.push(u);
        continue;
      }
      if (u = this.tokenizer.list(i)) {
        i = i.substring(u.raw.length), r.push(u);
        continue;
      }
      if (u = this.tokenizer.html(i)) {
        i = i.substring(u.raw.length), r.push(u);
        continue;
      }
      if (u = this.tokenizer.def(i)) {
        i = i.substring(u.raw.length);
        const f = r.at(-1);
        f?.type === "paragraph" || f?.type === "text" ? (f.raw += `
` + u.raw, f.text += `
` + u.raw, this.inlineQueue.at(-1).src = f.text) : this.tokens.links[u.tag] || (this.tokens.links[u.tag] = { href: u.href, title: u.title });
        continue;
      }
      if (u = this.tokenizer.table(i)) {
        i = i.substring(u.raw.length), r.push(u);
        continue;
      }
      if (u = this.tokenizer.lheading(i)) {
        i = i.substring(u.raw.length), r.push(u);
        continue;
      }
      let g = i;
      if (this.options.extensions?.startBlock) {
        let f = 1 / 0;
        const p = i.slice(1);
        let L;
        this.options.extensions.startBlock.forEach((w) => {
          L = w.call({ lexer: this }, p), typeof L == "number" && L >= 0 && (f = Math.min(f, L));
        }), f < 1 / 0 && f >= 0 && (g = i.substring(0, f + 1));
      }
      if (this.state.top && (u = this.tokenizer.paragraph(g))) {
        const f = r.at(-1);
        l && f?.type === "paragraph" ? (f.raw += `
` + u.raw, f.text += `
` + u.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = f.text) : r.push(u), l = g.length !== i.length, i = i.substring(u.raw.length);
        continue;
      }
      if (u = this.tokenizer.text(i)) {
        i = i.substring(u.raw.length);
        const f = r.at(-1);
        f?.type === "text" ? (f.raw += `
` + u.raw, f.text += `
` + u.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = f.text) : r.push(u);
        continue;
      }
      if (i) {
        const f = "Infinite loop on byte: " + i.charCodeAt(0);
        if (this.options.silent) {
          console.error(f);
          break;
        } else throw new Error(f);
      }
    }
    return this.state.top = true, r;
  }
  inline(i, r = []) {
    return this.inlineQueue.push({ src: i, tokens: r }), r;
  }
  inlineTokens(i, r = []) {
    let l = i, u = null;
    if (this.tokens.links) {
      const p = Object.keys(this.tokens.links);
      if (p.length > 0) for (; (u = this.tokenizer.rules.inline.reflinkSearch.exec(l)) != null; ) p.includes(u[0].slice(u[0].lastIndexOf("[") + 1, -1)) && (l = l.slice(0, u.index) + "[" + "a".repeat(u[0].length - 2) + "]" + l.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (u = this.tokenizer.rules.inline.anyPunctuation.exec(l)) != null; ) l = l.slice(0, u.index) + "++" + l.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    for (; (u = this.tokenizer.rules.inline.blockSkip.exec(l)) != null; ) l = l.slice(0, u.index) + "[" + "a".repeat(u[0].length - 2) + "]" + l.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    let g = false, f = "";
    for (; i; ) {
      g || (f = ""), g = false;
      let p;
      if (this.options.extensions?.inline?.some((w) => (p = w.call({ lexer: this }, i, r)) ? (i = i.substring(p.raw.length), r.push(p), true) : false)) continue;
      if (p = this.tokenizer.escape(i)) {
        i = i.substring(p.raw.length), r.push(p);
        continue;
      }
      if (p = this.tokenizer.tag(i)) {
        i = i.substring(p.raw.length), r.push(p);
        continue;
      }
      if (p = this.tokenizer.link(i)) {
        i = i.substring(p.raw.length), r.push(p);
        continue;
      }
      if (p = this.tokenizer.reflink(i, this.tokens.links)) {
        i = i.substring(p.raw.length);
        const w = r.at(-1);
        p.type === "text" && w?.type === "text" ? (w.raw += p.raw, w.text += p.text) : r.push(p);
        continue;
      }
      if (p = this.tokenizer.emStrong(i, l, f)) {
        i = i.substring(p.raw.length), r.push(p);
        continue;
      }
      if (p = this.tokenizer.codespan(i)) {
        i = i.substring(p.raw.length), r.push(p);
        continue;
      }
      if (p = this.tokenizer.br(i)) {
        i = i.substring(p.raw.length), r.push(p);
        continue;
      }
      if (p = this.tokenizer.del(i)) {
        i = i.substring(p.raw.length), r.push(p);
        continue;
      }
      if (p = this.tokenizer.autolink(i)) {
        i = i.substring(p.raw.length), r.push(p);
        continue;
      }
      if (!this.state.inLink && (p = this.tokenizer.url(i))) {
        i = i.substring(p.raw.length), r.push(p);
        continue;
      }
      let L = i;
      if (this.options.extensions?.startInline) {
        let w = 1 / 0;
        const D = i.slice(1);
        let b;
        this.options.extensions.startInline.forEach((H) => {
          b = H.call({ lexer: this }, D), typeof b == "number" && b >= 0 && (w = Math.min(w, b));
        }), w < 1 / 0 && w >= 0 && (L = i.substring(0, w + 1));
      }
      if (p = this.tokenizer.inlineText(L)) {
        i = i.substring(p.raw.length), p.raw.slice(-1) !== "_" && (f = p.raw.slice(-1)), g = true;
        const w = r.at(-1);
        w?.type === "text" ? (w.raw += p.raw, w.text += p.text) : r.push(p);
        continue;
      }
      if (i) {
        const w = "Infinite loop on byte: " + i.charCodeAt(0);
        if (this.options.silent) {
          console.error(w);
          break;
        } else throw new Error(w);
      }
    }
    return r;
  }
}, Qd = class {
  options;
  parser;
  constructor(s) {
    this.options = s || ar;
  }
  space(s) {
    return "";
  }
  code({ text: s, lang: i, escaped: r }) {
    const l = (i || "").match(qt.notSpaceStart)?.[0], u = s.replace(qt.endingNewline, "") + `
`;
    return l ? '<pre><code class="language-' + yn(l) + '">' + (r ? u : yn(u, true)) + `</code></pre>
` : "<pre><code>" + (r ? u : yn(u, true)) + `</code></pre>
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
  heading({ tokens: s, depth: i }) {
    return `<h${i}>${this.parser.parseInline(s)}</h${i}>
`;
  }
  hr(s) {
    return `<hr>
`;
  }
  list(s) {
    const i = s.ordered, r = s.start;
    let l = "";
    for (let f = 0; f < s.items.length; f++) {
      const p = s.items[f];
      l += this.listitem(p);
    }
    const u = i ? "ol" : "ul", g = i && r !== 1 ? ' start="' + r + '"' : "";
    return "<" + u + g + `>
` + l + "</" + u + `>
`;
  }
  listitem(s) {
    let i = "";
    if (s.task) {
      const r = this.checkbox({ checked: !!s.checked });
      s.loose ? s.tokens[0]?.type === "paragraph" ? (s.tokens[0].text = r + " " + s.tokens[0].text, s.tokens[0].tokens && s.tokens[0].tokens.length > 0 && s.tokens[0].tokens[0].type === "text" && (s.tokens[0].tokens[0].text = r + " " + yn(s.tokens[0].tokens[0].text), s.tokens[0].tokens[0].escaped = true)) : s.tokens.unshift({ type: "text", raw: r + " ", text: r + " ", escaped: true }) : i += r + " ";
    }
    return i += this.parser.parse(s.tokens, !!s.loose), `<li>${i}</li>
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
    let i = "", r = "";
    for (let u = 0; u < s.header.length; u++) r += this.tablecell(s.header[u]);
    i += this.tablerow({ text: r });
    let l = "";
    for (let u = 0; u < s.rows.length; u++) {
      const g = s.rows[u];
      r = "";
      for (let f = 0; f < g.length; f++) r += this.tablecell(g[f]);
      l += this.tablerow({ text: r });
    }
    return l && (l = `<tbody>${l}</tbody>`), `<table>
<thead>
` + i + `</thead>
` + l + `</table>
`;
  }
  tablerow({ text: s }) {
    return `<tr>
${s}</tr>
`;
  }
  tablecell(s) {
    const i = this.parser.parseInline(s.tokens), r = s.header ? "th" : "td";
    return (s.align ? `<${r} align="${s.align}">` : `<${r}>`) + i + `</${r}>
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
  link({ href: s, title: i, tokens: r }) {
    const l = this.parser.parseInline(r), u = G_(s);
    if (u === null) return l;
    s = u;
    let g = '<a href="' + s + '"';
    return i && (g += ' title="' + yn(i) + '"'), g += ">" + l + "</a>", g;
  }
  image({ href: s, title: i, text: r, tokens: l }) {
    l && (r = this.parser.parseInline(l, this.parser.textRenderer));
    const u = G_(s);
    if (u === null) return yn(r);
    s = u;
    let g = `<img src="${s}" alt="${r}"`;
    return i && (g += ` title="${yn(i)}"`), g += ">", g;
  }
  text(s) {
    return "tokens" in s && s.tokens ? this.parser.parseInline(s.tokens) : "escaped" in s && s.escaped ? s.text : yn(s.text);
  }
}, gg = class {
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
}, Un = class Qf {
  options;
  renderer;
  textRenderer;
  constructor(i) {
    this.options = i || ar, this.options.renderer = this.options.renderer || new Qd(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new gg();
  }
  static parse(i, r) {
    return new Qf(r).parse(i);
  }
  static parseInline(i, r) {
    return new Qf(r).parseInline(i);
  }
  parse(i, r = true) {
    let l = "";
    for (let u = 0; u < i.length; u++) {
      const g = i[u];
      if (this.options.extensions?.renderers?.[g.type]) {
        const p = g, L = this.options.extensions.renderers[p.type].call({ parser: this }, p);
        if (L !== false || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(p.type)) {
          l += L || "";
          continue;
        }
      }
      const f = g;
      switch (f.type) {
        case "space": {
          l += this.renderer.space(f);
          continue;
        }
        case "hr": {
          l += this.renderer.hr(f);
          continue;
        }
        case "heading": {
          l += this.renderer.heading(f);
          continue;
        }
        case "code": {
          l += this.renderer.code(f);
          continue;
        }
        case "table": {
          l += this.renderer.table(f);
          continue;
        }
        case "blockquote": {
          l += this.renderer.blockquote(f);
          continue;
        }
        case "list": {
          l += this.renderer.list(f);
          continue;
        }
        case "html": {
          l += this.renderer.html(f);
          continue;
        }
        case "paragraph": {
          l += this.renderer.paragraph(f);
          continue;
        }
        case "text": {
          let p = f, L = this.renderer.text(p);
          for (; u + 1 < i.length && i[u + 1].type === "text"; ) p = i[++u], L += `
` + this.renderer.text(p);
          r ? l += this.renderer.paragraph({ type: "paragraph", raw: L, text: L, tokens: [{ type: "text", raw: L, text: L, escaped: true }] }) : l += L;
          continue;
        }
        default: {
          const p = 'Token with "' + f.type + '" type was not found.';
          if (this.options.silent) return console.error(p), "";
          throw new Error(p);
        }
      }
    }
    return l;
  }
  parseInline(i, r = this.renderer) {
    let l = "";
    for (let u = 0; u < i.length; u++) {
      const g = i[u];
      if (this.options.extensions?.renderers?.[g.type]) {
        const p = this.options.extensions.renderers[g.type].call({ parser: this }, g);
        if (p !== false || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(g.type)) {
          l += p || "";
          continue;
        }
      }
      const f = g;
      switch (f.type) {
        case "escape": {
          l += r.text(f);
          break;
        }
        case "html": {
          l += r.html(f);
          break;
        }
        case "link": {
          l += r.link(f);
          break;
        }
        case "image": {
          l += r.image(f);
          break;
        }
        case "strong": {
          l += r.strong(f);
          break;
        }
        case "em": {
          l += r.em(f);
          break;
        }
        case "codespan": {
          l += r.codespan(f);
          break;
        }
        case "br": {
          l += r.br(f);
          break;
        }
        case "del": {
          l += r.del(f);
          break;
        }
        case "text": {
          l += r.text(f);
          break;
        }
        default: {
          const p = 'Token with "' + f.type + '" type was not found.';
          if (this.options.silent) return console.error(p), "";
          throw new Error(p);
        }
      }
    }
    return l;
  }
}, Xd = class {
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
}, KM = class {
  defaults = ag();
  options = this.setOptions;
  parse = this.parseMarkdown(true);
  parseInline = this.parseMarkdown(false);
  Parser = Un;
  Renderer = Qd;
  TextRenderer = gg;
  Lexer = On;
  Tokenizer = Zd;
  Hooks = Xd;
  constructor(...s) {
    this.use(...s);
  }
  walkTokens(s, i) {
    let r = [];
    for (const l of s) switch (r = r.concat(i.call(this, l)), l.type) {
      case "table": {
        const u = l;
        for (const g of u.header) r = r.concat(this.walkTokens(g.tokens, i));
        for (const g of u.rows) for (const f of g) r = r.concat(this.walkTokens(f.tokens, i));
        break;
      }
      case "list": {
        const u = l;
        r = r.concat(this.walkTokens(u.items, i));
        break;
      }
      default: {
        const u = l;
        this.defaults.extensions?.childTokens?.[u.type] ? this.defaults.extensions.childTokens[u.type].forEach((g) => {
          const f = u[g].flat(1 / 0);
          r = r.concat(this.walkTokens(f, i));
        }) : u.tokens && (r = r.concat(this.walkTokens(u.tokens, i)));
      }
    }
    return r;
  }
  use(...s) {
    const i = this.defaults.extensions || { renderers: {}, childTokens: {} };
    return s.forEach((r) => {
      const l = { ...r };
      if (l.async = this.defaults.async || l.async || false, r.extensions && (r.extensions.forEach((u) => {
        if (!u.name) throw new Error("extension name required");
        if ("renderer" in u) {
          const g = i.renderers[u.name];
          g ? i.renderers[u.name] = function(...f) {
            let p = u.renderer.apply(this, f);
            return p === false && (p = g.apply(this, f)), p;
          } : i.renderers[u.name] = u.renderer;
        }
        if ("tokenizer" in u) {
          if (!u.level || u.level !== "block" && u.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
          const g = i[u.level];
          g ? g.unshift(u.tokenizer) : i[u.level] = [u.tokenizer], u.start && (u.level === "block" ? i.startBlock ? i.startBlock.push(u.start) : i.startBlock = [u.start] : u.level === "inline" && (i.startInline ? i.startInline.push(u.start) : i.startInline = [u.start]));
        }
        "childTokens" in u && u.childTokens && (i.childTokens[u.name] = u.childTokens);
      }), l.extensions = i), r.renderer) {
        const u = this.defaults.renderer || new Qd(this.defaults);
        for (const g in r.renderer) {
          if (!(g in u)) throw new Error(`renderer '${g}' does not exist`);
          if (["options", "parser"].includes(g)) continue;
          const f = g, p = r.renderer[f], L = u[f];
          u[f] = (...w) => {
            let D = p.apply(u, w);
            return D === false && (D = L.apply(u, w)), D || "";
          };
        }
        l.renderer = u;
      }
      if (r.tokenizer) {
        const u = this.defaults.tokenizer || new Zd(this.defaults);
        for (const g in r.tokenizer) {
          if (!(g in u)) throw new Error(`tokenizer '${g}' does not exist`);
          if (["options", "rules", "lexer"].includes(g)) continue;
          const f = g, p = r.tokenizer[f], L = u[f];
          u[f] = (...w) => {
            let D = p.apply(u, w);
            return D === false && (D = L.apply(u, w)), D;
          };
        }
        l.tokenizer = u;
      }
      if (r.hooks) {
        const u = this.defaults.hooks || new Xd();
        for (const g in r.hooks) {
          if (!(g in u)) throw new Error(`hook '${g}' does not exist`);
          if (["options", "block"].includes(g)) continue;
          const f = g, p = r.hooks[f], L = u[f];
          Xd.passThroughHooks.has(g) ? u[f] = (w) => {
            if (this.defaults.async) return Promise.resolve(p.call(u, w)).then((b) => L.call(u, b));
            const D = p.call(u, w);
            return L.call(u, D);
          } : u[f] = (...w) => {
            let D = p.apply(u, w);
            return D === false && (D = L.apply(u, w)), D;
          };
        }
        l.hooks = u;
      }
      if (r.walkTokens) {
        const u = this.defaults.walkTokens, g = r.walkTokens;
        l.walkTokens = function(f) {
          let p = [];
          return p.push(g.call(this, f)), u && (p = p.concat(u.call(this, f))), p;
        };
      }
      this.defaults = { ...this.defaults, ...l };
    }), this;
  }
  setOptions(s) {
    return this.defaults = { ...this.defaults, ...s }, this;
  }
  lexer(s, i) {
    return On.lex(s, i ?? this.defaults);
  }
  parser(s, i) {
    return Un.parse(s, i ?? this.defaults);
  }
  parseMarkdown(s) {
    return (r, l) => {
      const u = { ...l }, g = { ...this.defaults, ...u }, f = this.onError(!!g.silent, !!g.async);
      if (this.defaults.async === true && u.async === false) return f(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof r > "u" || r === null) return f(new Error("marked(): input parameter is undefined or null"));
      if (typeof r != "string") return f(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(r) + ", string expected"));
      g.hooks && (g.hooks.options = g, g.hooks.block = s);
      const p = g.hooks ? g.hooks.provideLexer() : s ? On.lex : On.lexInline, L = g.hooks ? g.hooks.provideParser() : s ? Un.parse : Un.parseInline;
      if (g.async) return Promise.resolve(g.hooks ? g.hooks.preprocess(r) : r).then((w) => p(w, g)).then((w) => g.hooks ? g.hooks.processAllTokens(w) : w).then((w) => g.walkTokens ? Promise.all(this.walkTokens(w, g.walkTokens)).then(() => w) : w).then((w) => L(w, g)).then((w) => g.hooks ? g.hooks.postprocess(w) : w).catch(f);
      try {
        g.hooks && (r = g.hooks.preprocess(r));
        let w = p(r, g);
        g.hooks && (w = g.hooks.processAllTokens(w)), g.walkTokens && this.walkTokens(w, g.walkTokens);
        let D = L(w, g);
        return g.hooks && (D = g.hooks.postprocess(D)), D;
      } catch (w) {
        return f(w);
      }
    };
  }
  onError(s, i) {
    return (r) => {
      if (r.message += `
Please report this to https://github.com/markedjs/marked.`, s) {
        const l = "<p>An error occurred:</p><pre>" + yn(r.message + "", true) + "</pre>";
        return i ? Promise.resolve(l) : l;
      }
      if (i) return Promise.reject(r);
      throw r;
    };
  }
}, rr = new KM();
function Ye(s, i) {
  return rr.parse(s, i);
}
Ye.options = Ye.setOptions = function(s) {
  return rr.setOptions(s), Ye.defaults = rr.defaults, E_(Ye.defaults), Ye;
}, Ye.getDefaults = ag, Ye.defaults = ar, Ye.use = function(...s) {
  return rr.use(...s), Ye.defaults = rr.defaults, E_(Ye.defaults), Ye;
}, Ye.walkTokens = function(s, i) {
  return rr.walkTokens(s, i);
}, Ye.parseInline = rr.parseInline, Ye.Parser = Un, Ye.parser = Un.parse, Ye.Renderer = Qd, Ye.TextRenderer = gg, Ye.Lexer = On, Ye.lexer = On.lex, Ye.Tokenizer = Zd, Ye.Hooks = Xd, Ye.parse = Ye, Ye.options, Ye.setOptions, Ye.use, Ye.walkTokens, Ye.parseInline, Un.parse, On.lex;
const ZM = /[\0-\x1F!-,\.\/:-@\[-\^`\{-\xA9\xAB-\xB4\xB6-\xB9\xBB-\xBF\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0378\u0379\u037E\u0380-\u0385\u0387\u038B\u038D\u03A2\u03F6\u0482\u0530\u0557\u0558\u055A-\u055F\u0589-\u0590\u05BE\u05C0\u05C3\u05C6\u05C8-\u05CF\u05EB-\u05EE\u05F3-\u060F\u061B-\u061F\u066A-\u066D\u06D4\u06DD\u06DE\u06E9\u06FD\u06FE\u0700-\u070F\u074B\u074C\u07B2-\u07BF\u07F6-\u07F9\u07FB\u07FC\u07FE\u07FF\u082E-\u083F\u085C-\u085F\u086B-\u089F\u08B5\u08C8-\u08D2\u08E2\u0964\u0965\u0970\u0984\u098D\u098E\u0991\u0992\u09A9\u09B1\u09B3-\u09B5\u09BA\u09BB\u09C5\u09C6\u09C9\u09CA\u09CF-\u09D6\u09D8-\u09DB\u09DE\u09E4\u09E5\u09F2-\u09FB\u09FD\u09FF\u0A00\u0A04\u0A0B-\u0A0E\u0A11\u0A12\u0A29\u0A31\u0A34\u0A37\u0A3A\u0A3B\u0A3D\u0A43-\u0A46\u0A49\u0A4A\u0A4E-\u0A50\u0A52-\u0A58\u0A5D\u0A5F-\u0A65\u0A76-\u0A80\u0A84\u0A8E\u0A92\u0AA9\u0AB1\u0AB4\u0ABA\u0ABB\u0AC6\u0ACA\u0ACE\u0ACF\u0AD1-\u0ADF\u0AE4\u0AE5\u0AF0-\u0AF8\u0B00\u0B04\u0B0D\u0B0E\u0B11\u0B12\u0B29\u0B31\u0B34\u0B3A\u0B3B\u0B45\u0B46\u0B49\u0B4A\u0B4E-\u0B54\u0B58-\u0B5B\u0B5E\u0B64\u0B65\u0B70\u0B72-\u0B81\u0B84\u0B8B-\u0B8D\u0B91\u0B96-\u0B98\u0B9B\u0B9D\u0BA0-\u0BA2\u0BA5-\u0BA7\u0BAB-\u0BAD\u0BBA-\u0BBD\u0BC3-\u0BC5\u0BC9\u0BCE\u0BCF\u0BD1-\u0BD6\u0BD8-\u0BE5\u0BF0-\u0BFF\u0C0D\u0C11\u0C29\u0C3A-\u0C3C\u0C45\u0C49\u0C4E-\u0C54\u0C57\u0C5B-\u0C5F\u0C64\u0C65\u0C70-\u0C7F\u0C84\u0C8D\u0C91\u0CA9\u0CB4\u0CBA\u0CBB\u0CC5\u0CC9\u0CCE-\u0CD4\u0CD7-\u0CDD\u0CDF\u0CE4\u0CE5\u0CF0\u0CF3-\u0CFF\u0D0D\u0D11\u0D45\u0D49\u0D4F-\u0D53\u0D58-\u0D5E\u0D64\u0D65\u0D70-\u0D79\u0D80\u0D84\u0D97-\u0D99\u0DB2\u0DBC\u0DBE\u0DBF\u0DC7-\u0DC9\u0DCB-\u0DCE\u0DD5\u0DD7\u0DE0-\u0DE5\u0DF0\u0DF1\u0DF4-\u0E00\u0E3B-\u0E3F\u0E4F\u0E5A-\u0E80\u0E83\u0E85\u0E8B\u0EA4\u0EA6\u0EBE\u0EBF\u0EC5\u0EC7\u0ECE\u0ECF\u0EDA\u0EDB\u0EE0-\u0EFF\u0F01-\u0F17\u0F1A-\u0F1F\u0F2A-\u0F34\u0F36\u0F38\u0F3A-\u0F3D\u0F48\u0F6D-\u0F70\u0F85\u0F98\u0FBD-\u0FC5\u0FC7-\u0FFF\u104A-\u104F\u109E\u109F\u10C6\u10C8-\u10CC\u10CE\u10CF\u10FB\u1249\u124E\u124F\u1257\u1259\u125E\u125F\u1289\u128E\u128F\u12B1\u12B6\u12B7\u12BF\u12C1\u12C6\u12C7\u12D7\u1311\u1316\u1317\u135B\u135C\u1360-\u137F\u1390-\u139F\u13F6\u13F7\u13FE-\u1400\u166D\u166E\u1680\u169B-\u169F\u16EB-\u16ED\u16F9-\u16FF\u170D\u1715-\u171F\u1735-\u173F\u1754-\u175F\u176D\u1771\u1774-\u177F\u17D4-\u17D6\u17D8-\u17DB\u17DE\u17DF\u17EA-\u180A\u180E\u180F\u181A-\u181F\u1879-\u187F\u18AB-\u18AF\u18F6-\u18FF\u191F\u192C-\u192F\u193C-\u1945\u196E\u196F\u1975-\u197F\u19AC-\u19AF\u19CA-\u19CF\u19DA-\u19FF\u1A1C-\u1A1F\u1A5F\u1A7D\u1A7E\u1A8A-\u1A8F\u1A9A-\u1AA6\u1AA8-\u1AAF\u1AC1-\u1AFF\u1B4C-\u1B4F\u1B5A-\u1B6A\u1B74-\u1B7F\u1BF4-\u1BFF\u1C38-\u1C3F\u1C4A-\u1C4C\u1C7E\u1C7F\u1C89-\u1C8F\u1CBB\u1CBC\u1CC0-\u1CCF\u1CD3\u1CFB-\u1CFF\u1DFA\u1F16\u1F17\u1F1E\u1F1F\u1F46\u1F47\u1F4E\u1F4F\u1F58\u1F5A\u1F5C\u1F5E\u1F7E\u1F7F\u1FB5\u1FBD\u1FBF-\u1FC1\u1FC5\u1FCD-\u1FCF\u1FD4\u1FD5\u1FDC-\u1FDF\u1FED-\u1FF1\u1FF5\u1FFD-\u203E\u2041-\u2053\u2055-\u2070\u2072-\u207E\u2080-\u208F\u209D-\u20CF\u20F1-\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F-\u215F\u2189-\u24B5\u24EA-\u2BFF\u2C2F\u2C5F\u2CE5-\u2CEA\u2CF4-\u2CFF\u2D26\u2D28-\u2D2C\u2D2E\u2D2F\u2D68-\u2D6E\u2D70-\u2D7E\u2D97-\u2D9F\u2DA7\u2DAF\u2DB7\u2DBF\u2DC7\u2DCF\u2DD7\u2DDF\u2E00-\u2E2E\u2E30-\u3004\u3008-\u3020\u3030\u3036\u3037\u303D-\u3040\u3097\u3098\u309B\u309C\u30A0\u30FB\u3100-\u3104\u3130\u318F-\u319F\u31C0-\u31EF\u3200-\u33FF\u4DC0-\u4DFF\u9FFD-\u9FFF\uA48D-\uA4CF\uA4FE\uA4FF\uA60D-\uA60F\uA62C-\uA63F\uA673\uA67E\uA6F2-\uA716\uA720\uA721\uA789\uA78A\uA7C0\uA7C1\uA7CB-\uA7F4\uA828-\uA82B\uA82D-\uA83F\uA874-\uA87F\uA8C6-\uA8CF\uA8DA-\uA8DF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA954-\uA95F\uA97D-\uA97F\uA9C1-\uA9CE\uA9DA-\uA9DF\uA9FF\uAA37-\uAA3F\uAA4E\uAA4F\uAA5A-\uAA5F\uAA77-\uAA79\uAAC3-\uAADA\uAADE\uAADF\uAAF0\uAAF1\uAAF7-\uAB00\uAB07\uAB08\uAB0F\uAB10\uAB17-\uAB1F\uAB27\uAB2F\uAB5B\uAB6A-\uAB6F\uABEB\uABEE\uABEF\uABFA-\uABFF\uD7A4-\uD7AF\uD7C7-\uD7CA\uD7FC-\uD7FF\uE000-\uF8FF\uFA6E\uFA6F\uFADA-\uFAFF\uFB07-\uFB12\uFB18-\uFB1C\uFB29\uFB37\uFB3D\uFB3F\uFB42\uFB45\uFBB2-\uFBD2\uFD3E-\uFD4F\uFD90\uFD91\uFDC8-\uFDEF\uFDFC-\uFDFF\uFE10-\uFE1F\uFE30-\uFE32\uFE35-\uFE4C\uFE50-\uFE6F\uFE75\uFEFD-\uFF0F\uFF1A-\uFF20\uFF3B-\uFF3E\uFF40\uFF5B-\uFF65\uFFBF-\uFFC1\uFFC8\uFFC9\uFFD0\uFFD1\uFFD8\uFFD9\uFFDD-\uFFFF]|\uD800[\uDC0C\uDC27\uDC3B\uDC3E\uDC4E\uDC4F\uDC5E-\uDC7F\uDCFB-\uDD3F\uDD75-\uDDFC\uDDFE-\uDE7F\uDE9D-\uDE9F\uDED1-\uDEDF\uDEE1-\uDEFF\uDF20-\uDF2C\uDF4B-\uDF4F\uDF7B-\uDF7F\uDF9E\uDF9F\uDFC4-\uDFC7\uDFD0\uDFD6-\uDFFF]|\uD801[\uDC9E\uDC9F\uDCAA-\uDCAF\uDCD4-\uDCD7\uDCFC-\uDCFF\uDD28-\uDD2F\uDD64-\uDDFF\uDF37-\uDF3F\uDF56-\uDF5F\uDF68-\uDFFF]|\uD802[\uDC06\uDC07\uDC09\uDC36\uDC39-\uDC3B\uDC3D\uDC3E\uDC56-\uDC5F\uDC77-\uDC7F\uDC9F-\uDCDF\uDCF3\uDCF6-\uDCFF\uDD16-\uDD1F\uDD3A-\uDD7F\uDDB8-\uDDBD\uDDC0-\uDDFF\uDE04\uDE07-\uDE0B\uDE14\uDE18\uDE36\uDE37\uDE3B-\uDE3E\uDE40-\uDE5F\uDE7D-\uDE7F\uDE9D-\uDEBF\uDEC8\uDEE7-\uDEFF\uDF36-\uDF3F\uDF56-\uDF5F\uDF73-\uDF7F\uDF92-\uDFFF]|\uD803[\uDC49-\uDC7F\uDCB3-\uDCBF\uDCF3-\uDCFF\uDD28-\uDD2F\uDD3A-\uDE7F\uDEAA\uDEAD-\uDEAF\uDEB2-\uDEFF\uDF1D-\uDF26\uDF28-\uDF2F\uDF51-\uDFAF\uDFC5-\uDFDF\uDFF7-\uDFFF]|\uD804[\uDC47-\uDC65\uDC70-\uDC7E\uDCBB-\uDCCF\uDCE9-\uDCEF\uDCFA-\uDCFF\uDD35\uDD40-\uDD43\uDD48-\uDD4F\uDD74\uDD75\uDD77-\uDD7F\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDFF\uDE12\uDE38-\uDE3D\uDE3F-\uDE7F\uDE87\uDE89\uDE8E\uDE9E\uDEA9-\uDEAF\uDEEB-\uDEEF\uDEFA-\uDEFF\uDF04\uDF0D\uDF0E\uDF11\uDF12\uDF29\uDF31\uDF34\uDF3A\uDF45\uDF46\uDF49\uDF4A\uDF4E\uDF4F\uDF51-\uDF56\uDF58-\uDF5C\uDF64\uDF65\uDF6D-\uDF6F\uDF75-\uDFFF]|\uD805[\uDC4B-\uDC4F\uDC5A-\uDC5D\uDC62-\uDC7F\uDCC6\uDCC8-\uDCCF\uDCDA-\uDD7F\uDDB6\uDDB7\uDDC1-\uDDD7\uDDDE-\uDDFF\uDE41-\uDE43\uDE45-\uDE4F\uDE5A-\uDE7F\uDEB9-\uDEBF\uDECA-\uDEFF\uDF1B\uDF1C\uDF2C-\uDF2F\uDF3A-\uDFFF]|\uD806[\uDC3B-\uDC9F\uDCEA-\uDCFE\uDD07\uDD08\uDD0A\uDD0B\uDD14\uDD17\uDD36\uDD39\uDD3A\uDD44-\uDD4F\uDD5A-\uDD9F\uDDA8\uDDA9\uDDD8\uDDD9\uDDE2\uDDE5-\uDDFF\uDE3F-\uDE46\uDE48-\uDE4F\uDE9A-\uDE9C\uDE9E-\uDEBF\uDEF9-\uDFFF]|\uD807[\uDC09\uDC37\uDC41-\uDC4F\uDC5A-\uDC71\uDC90\uDC91\uDCA8\uDCB7-\uDCFF\uDD07\uDD0A\uDD37-\uDD39\uDD3B\uDD3E\uDD48-\uDD4F\uDD5A-\uDD5F\uDD66\uDD69\uDD8F\uDD92\uDD99-\uDD9F\uDDAA-\uDEDF\uDEF7-\uDFAF\uDFB1-\uDFFF]|\uD808[\uDF9A-\uDFFF]|\uD809[\uDC6F-\uDC7F\uDD44-\uDFFF]|[\uD80A\uD80B\uD80E-\uD810\uD812-\uD819\uD824-\uD82B\uD82D\uD82E\uD830-\uD833\uD837\uD839\uD83D\uD83F\uD87B-\uD87D\uD87F\uD885-\uDB3F\uDB41-\uDBFF][\uDC00-\uDFFF]|\uD80D[\uDC2F-\uDFFF]|\uD811[\uDE47-\uDFFF]|\uD81A[\uDE39-\uDE3F\uDE5F\uDE6A-\uDECF\uDEEE\uDEEF\uDEF5-\uDEFF\uDF37-\uDF3F\uDF44-\uDF4F\uDF5A-\uDF62\uDF78-\uDF7C\uDF90-\uDFFF]|\uD81B[\uDC00-\uDE3F\uDE80-\uDEFF\uDF4B-\uDF4E\uDF88-\uDF8E\uDFA0-\uDFDF\uDFE2\uDFE5-\uDFEF\uDFF2-\uDFFF]|\uD821[\uDFF8-\uDFFF]|\uD823[\uDCD6-\uDCFF\uDD09-\uDFFF]|\uD82C[\uDD1F-\uDD4F\uDD53-\uDD63\uDD68-\uDD6F\uDEFC-\uDFFF]|\uD82F[\uDC6B-\uDC6F\uDC7D-\uDC7F\uDC89-\uDC8F\uDC9A-\uDC9C\uDC9F-\uDFFF]|\uD834[\uDC00-\uDD64\uDD6A-\uDD6C\uDD73-\uDD7A\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDE41\uDE45-\uDFFF]|\uD835[\uDC55\uDC9D\uDCA0\uDCA1\uDCA3\uDCA4\uDCA7\uDCA8\uDCAD\uDCBA\uDCBC\uDCC4\uDD06\uDD0B\uDD0C\uDD15\uDD1D\uDD3A\uDD3F\uDD45\uDD47-\uDD49\uDD51\uDEA6\uDEA7\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3\uDFCC\uDFCD]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85-\uDE9A\uDEA0\uDEB0-\uDFFF]|\uD838[\uDC07\uDC19\uDC1A\uDC22\uDC25\uDC2B-\uDCFF\uDD2D-\uDD2F\uDD3E\uDD3F\uDD4A-\uDD4D\uDD4F-\uDEBF\uDEFA-\uDFFF]|\uD83A[\uDCC5-\uDCCF\uDCD7-\uDCFF\uDD4C-\uDD4F\uDD5A-\uDFFF]|\uD83B[\uDC00-\uDDFF\uDE04\uDE20\uDE23\uDE25\uDE26\uDE28\uDE33\uDE38\uDE3A\uDE3C-\uDE41\uDE43-\uDE46\uDE48\uDE4A\uDE4C\uDE50\uDE53\uDE55\uDE56\uDE58\uDE5A\uDE5C\uDE5E\uDE60\uDE63\uDE65\uDE66\uDE6B\uDE73\uDE78\uDE7D\uDE7F\uDE8A\uDE9C-\uDEA0\uDEA4\uDEAA\uDEBC-\uDFFF]|\uD83C[\uDC00-\uDD2F\uDD4A-\uDD4F\uDD6A-\uDD6F\uDD8A-\uDFFF]|\uD83E[\uDC00-\uDFEF\uDFFA-\uDFFF]|\uD869[\uDEDE-\uDEFF]|\uD86D[\uDF35-\uDF3F]|\uD86E[\uDC1E\uDC1F]|\uD873[\uDEA2-\uDEAF]|\uD87A[\uDFE1-\uDFFF]|\uD87E[\uDE1E-\uDFFF]|\uD884[\uDF4B-\uDFFF]|\uDB40[\uDC00-\uDCFF\uDDF0-\uDFFF]/g, QM = Object.hasOwnProperty;
class K_ {
  constructor() {
    this.occurrences, this.reset();
  }
  slug(i, r) {
    const l = this;
    let u = XM(i, r === true);
    const g = u;
    for (; QM.call(l.occurrences, u); ) l.occurrences[g]++, u = g + "-" + l.occurrences[g];
    return l.occurrences[u] = 0, u;
  }
  reset() {
    this.occurrences = /* @__PURE__ */ Object.create(null);
  }
}
function XM(s, i) {
  return typeof s != "string" ? "" : (i || (s = s.toLowerCase()), s.replace(ZM, "").replace(/ /g, "-"));
}
let Z_ = new K_(), Q_ = [];
const eL = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;
function tL(s) {
  return s.replace(eL, (i, r) => (r = r.toLowerCase(), r === "colon" ? ":" : r.charAt(0) === "#" ? r.charAt(1) === "x" ? String.fromCharCode(parseInt(r.substring(2), 16)) : String.fromCharCode(+r.substring(1)) : ""));
}
function X_({ prefix: s = "", globalSlugs: i = false } = {}) {
  return { headerIds: false, hooks: { preprocess(r) {
    return i || sL(), r;
  } }, useNewRenderer: true, renderer: { heading({ tokens: r, depth: l }) {
    const u = this.parser.parseInline(r), g = tL(u).trim().replace(/<[!\/a-z].*?>/gi, ""), f = l, p = `${s}${Z_.slug(g.toLowerCase())}`, L = { level: f, text: u, id: p, raw: g };
    return Q_.push(L), `<h${f} id="${p}">${u}</h${f}>
`;
  } } };
}
function sL() {
  Q_ = [], Z_ = new K_();
}
function ep(s) {
  throw new Error('Could not dynamically require "' + s + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var em = { exports: {} }, nL = em.exports, tp;
function aL() {
  return tp || (tp = 1, (function(s, i) {
    (function(r, l) {
      s.exports = l();
    })(nL, (function() {
      var r;
      function l() {
        return r.apply(null, arguments);
      }
      function u(e) {
        r = e;
      }
      function g(e) {
        return e instanceof Array || Object.prototype.toString.call(e) === "[object Array]";
      }
      function f(e) {
        return e != null && Object.prototype.toString.call(e) === "[object Object]";
      }
      function p(e, n) {
        return Object.prototype.hasOwnProperty.call(e, n);
      }
      function L(e) {
        if (Object.getOwnPropertyNames) return Object.getOwnPropertyNames(e).length === 0;
        var n;
        for (n in e) if (p(e, n)) return false;
        return true;
      }
      function w(e) {
        return e === void 0;
      }
      function D(e) {
        return typeof e == "number" || Object.prototype.toString.call(e) === "[object Number]";
      }
      function b(e) {
        return e instanceof Date || Object.prototype.toString.call(e) === "[object Date]";
      }
      function H(e, n) {
        var d = [], m, h = e.length;
        for (m = 0; m < h; ++m) d.push(n(e[m], m));
        return d;
      }
      function N(e, n) {
        for (var d in n) p(n, d) && (e[d] = n[d]);
        return p(n, "toString") && (e.toString = n.toString), p(n, "valueOf") && (e.valueOf = n.valueOf), e;
      }
      function q(e, n, d, m) {
        return ia(e, n, d, m, true).utc();
      }
      function O() {
        return { empty: false, unusedTokens: [], unusedInput: [], overflow: -2, charsLeftOver: 0, nullInput: false, invalidEra: null, invalidMonth: null, invalidFormat: false, userInvalidated: false, iso: false, parsedDateParts: [], era: null, meridiem: null, rfc2822: false, weekdayMismatch: false };
      }
      function x(e) {
        return e._pf == null && (e._pf = O()), e._pf;
      }
      var Q;
      Array.prototype.some ? Q = Array.prototype.some : Q = function(e) {
        var n = Object(this), d = n.length >>> 0, m;
        for (m = 0; m < d; m++) if (m in n && e.call(this, n[m], m, n)) return true;
        return false;
      };
      function X(e) {
        var n = null, d = false, m = e._d && !isNaN(e._d.getTime());
        if (m && (n = x(e), d = Q.call(n.parsedDateParts, function(h) {
          return h != null;
        }), m = n.overflow < 0 && !n.empty && !n.invalidEra && !n.invalidMonth && !n.invalidWeekday && !n.weekdayMismatch && !n.nullInput && !n.invalidFormat && !n.userInvalidated && (!n.meridiem || n.meridiem && d), e._strict && (m = m && n.charsLeftOver === 0 && n.unusedTokens.length === 0 && n.bigHour === void 0)), Object.isFrozen == null || !Object.isFrozen(e)) e._isValid = m;
        else return m;
        return e._isValid;
      }
      function se(e) {
        var n = q(NaN);
        return e != null ? N(x(n), e) : x(n).userInvalidated = true, n;
      }
      var Z = l.momentProperties = [], ge = false;
      function B(e, n) {
        var d, m, h, k = Z.length;
        if (w(n._isAMomentObject) || (e._isAMomentObject = n._isAMomentObject), w(n._i) || (e._i = n._i), w(n._f) || (e._f = n._f), w(n._l) || (e._l = n._l), w(n._strict) || (e._strict = n._strict), w(n._tzm) || (e._tzm = n._tzm), w(n._isUTC) || (e._isUTC = n._isUTC), w(n._offset) || (e._offset = n._offset), w(n._pf) || (e._pf = x(n)), w(n._locale) || (e._locale = n._locale), k > 0) for (d = 0; d < k; d++) m = Z[d], h = n[m], w(h) || (e[m] = h);
        return e;
      }
      function V(e) {
        B(this, e), this._d = new Date(e._d != null ? e._d.getTime() : NaN), this.isValid() || (this._d = /* @__PURE__ */ new Date(NaN)), ge === false && (ge = true, l.updateOffset(this), ge = false);
      }
      function he(e) {
        return e instanceof V || e != null && e._isAMomentObject != null;
      }
      function je(e) {
        l.suppressDeprecationWarnings === false && typeof console < "u" && console.warn && console.warn("Deprecation warning: " + e);
      }
      function ke(e, n) {
        var d = true;
        return N(function() {
          if (l.deprecationHandler != null && l.deprecationHandler(null, e), d) {
            var m = [], h, k, S, W = arguments.length;
            for (k = 0; k < W; k++) {
              if (h = "", typeof arguments[k] == "object") {
                h += `
[` + k + "] ";
                for (S in arguments[0]) p(arguments[0], S) && (h += S + ": " + arguments[0][S] + ", ");
                h = h.slice(0, -2);
              } else h = arguments[k];
              m.push(h);
            }
            je(e + `
Arguments: ` + Array.prototype.slice.call(m).join("") + `
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
      function Ks(e, n) {
        var d = N({}, e), m;
        for (m in n) p(n, m) && (f(e[m]) && f(n[m]) ? (d[m] = {}, N(d[m], e[m]), N(d[m], n[m])) : n[m] != null ? d[m] = n[m] : delete d[m]);
        for (m in e) p(e, m) && !p(n, m) && f(e[m]) && (d[m] = N({}, d[m]));
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
      var Zs = { sameDay: "[Today at] LT", nextDay: "[Tomorrow at] LT", nextWeek: "dddd [at] LT", lastDay: "[Yesterday at] LT", lastWeek: "[Last] dddd [at] LT", sameElse: "L" };
      function vm(e, n, d) {
        var m = this._calendar[e] || this._calendar.sameElse;
        return Re(m) ? m.call(n, d) : m;
      }
      function Yt(e, n, d) {
        var m = "" + Math.abs(e), h = n - m.length, k = e >= 0;
        return (k ? d ? "+" : "" : "-") + Math.pow(10, Math.max(0, h)).toString().substr(1) + m;
      }
      var Ut = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, or = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, mi = {}, Bn = {};
      function J(e, n, d, m) {
        var h = m;
        typeof m == "string" && (h = function() {
          return this[m]();
        }), e && (Bn[e] = h), n && (Bn[n[0]] = function() {
          return Yt(h.apply(this, arguments), n[1], n[2]);
        }), d && (Bn[d] = function() {
          return this.localeData().ordinal(h.apply(this, arguments), e);
        });
      }
      function lr(e) {
        return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "");
      }
      function wm(e) {
        var n = e.match(Ut), d, m;
        for (d = 0, m = n.length; d < m; d++) Bn[n[d]] ? n[d] = Bn[n[d]] : n[d] = lr(n[d]);
        return function(h) {
          var k = "", S;
          for (S = 0; S < m; S++) k += Re(n[S]) ? n[S].call(h, e) : n[S];
          return k;
        };
      }
      function Qs(e, n) {
        return e.isValid() ? (n = Wn(n, e.localeData()), mi[n] = mi[n] || wm(n), mi[n](e)) : e.localeData().invalidDate();
      }
      function Wn(e, n) {
        var d = 5;
        function m(h) {
          return n.longDateFormat(h) || h;
        }
        for (or.lastIndex = 0; d >= 0 && or.test(e); ) e = e.replace(or, m), or.lastIndex = 0, d -= 1;
        return e;
      }
      var Mm = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" };
      function dr(e) {
        var n = this._longDateFormat[e], d = this._longDateFormat[e.toUpperCase()];
        return n || !d ? n : (this._longDateFormat[e] = d.match(Ut).map(function(m) {
          return m === "MMMM" || m === "MM" || m === "DD" || m === "dddd" ? m.slice(1) : m;
        }).join(""), this._longDateFormat[e]);
      }
      var mr = "Invalid date";
      function Po() {
        return this._invalidDate;
      }
      var es = "%d", xa = /\d{1,2}/;
      function Lm(e) {
        return this._ordinal.replace("%d", e);
      }
      var xs = { future: "in %s", past: "%s ago", s: "a few seconds", ss: "%d seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", w: "a week", ww: "%d weeks", M: "a month", MM: "%d months", y: "a year", yy: "%d years" };
      function jo(e, n, d, m) {
        var h = this._relativeTime[d];
        return Re(h) ? h(e, n, d, m) : h.replace(/%d/i, e);
      }
      function km(e, n) {
        var d = this._relativeTime[e > 0 ? "future" : "past"];
        return Re(d) ? d(n) : d.replace(/%s/i, n);
      }
      var $n = { D: "date", dates: "date", date: "date", d: "day", days: "day", day: "day", e: "weekday", weekdays: "weekday", weekday: "weekday", E: "isoWeekday", isoweekdays: "isoWeekday", isoweekday: "isoWeekday", DDD: "dayOfYear", dayofyears: "dayOfYear", dayofyear: "dayOfYear", h: "hour", hours: "hour", hour: "hour", ms: "millisecond", milliseconds: "millisecond", millisecond: "millisecond", m: "minute", minutes: "minute", minute: "minute", M: "month", months: "month", month: "month", Q: "quarter", quarters: "quarter", quarter: "quarter", s: "second", seconds: "second", second: "second", gg: "weekYear", weekyears: "weekYear", weekyear: "weekYear", GG: "isoWeekYear", isoweekyears: "isoWeekYear", isoweekyear: "isoWeekYear", w: "week", weeks: "week", week: "week", W: "isoWeek", isoweeks: "isoWeek", isoweek: "isoWeek", y: "year", years: "year", year: "year" };
      function Oe(e) {
        return typeof e == "string" ? $n[e] || $n[e.toLowerCase()] : void 0;
      }
      function Mn(e) {
        var n = {}, d, m;
        for (m in e) p(e, m) && (d = Oe(m), d && (n[d] = e[m]));
        return n;
      }
      var ur = { date: 9, day: 11, weekday: 11, isoWeekday: 11, dayOfYear: 4, hour: 13, millisecond: 16, minute: 14, month: 8, quarter: 7, second: 15, weekYear: 1, isoWeekYear: 1, week: 5, isoWeek: 5, year: 1 };
      function Tm(e) {
        var n = [], d;
        for (d in e) p(e, d) && n.push({ unit: d, priority: ur[d] });
        return n.sort(function(m, h) {
          return m.priority - h.priority;
        }), n;
      }
      var Gn = /\d/, Ct = /\d\d/, Vn = /\d{3}/, Xs = /\d{4}/, Jn = /[+-]?\d{6}/, Fe = /\d\d?/, cr = /\d\d\d\d?/, gr = /\d\d\d\d\d\d?/, Kn = /\d{1,3}/, Na = /\d{1,4}/, Zn = /[+-]?\d{1,6}/, en = /\d+/, Qn = /[+-]?\d+/, Dm = /Z|[+-]\d\d:?\d\d/gi, hr = /Z|[+-]\d\d(?::?\d\d)?/gi, Ym = /[+-]?\d+(\.\d{1,3})?/, Xn = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, Ln = /^[1-9]\d?/, ui = /^([1-9]\d|\d)/, fr;
      fr = {};
      function $(e, n, d) {
        fr[e] = Re(n) ? n : function(m, h) {
          return m && d ? d : n;
        };
      }
      function Cm(e, n) {
        return p(fr, e) ? fr[e](n._strict, n._locale) : new RegExp(qo(e));
      }
      function qo(e) {
        return Ns(e.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(n, d, m, h, k) {
          return d || m || h || k;
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
      function Ce(e, n) {
        var d, m = n, h;
        for (typeof e == "string" && (e = [e]), D(n) && (m = function(k, S) {
          S[n] = _e(k);
        }), h = e.length, d = 0; d < h; d++) Aa[e[d]] = m;
      }
      function kn(e, n) {
        Ce(e, function(d, m, h, k) {
          h._w = h._w || {}, n(d, h._w, h, k);
        });
      }
      function bm(e, n, d) {
        n != null && p(Aa, e) && Aa[e](n, d._a, d, e);
      }
      function _r(e) {
        return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0;
      }
      var it = 0, As = 1, gs = 2, Ze = 3, ts = 4, Es = 5, tn = 6, Sm = 7, Fm = 8;
      J("Y", 0, 0, function() {
        var e = this.year();
        return e <= 9999 ? Yt(e, 4) : "+" + e;
      }), J(0, ["YY", 2], 0, function() {
        return this.year() % 100;
      }), J(0, ["YYYY", 4], 0, "year"), J(0, ["YYYYY", 5], 0, "year"), J(0, ["YYYYYY", 6, true], 0, "year"), $("Y", Qn), $("YY", Fe, Ct), $("YYYY", Na, Xs), $("YYYYY", Zn, Jn), $("YYYYYY", Zn, Jn), Ce(["YYYYY", "YYYYYY"], it), Ce("YYYY", function(e, n) {
        n[it] = e.length === 2 ? l.parseTwoDigitYear(e) : _e(e);
      }), Ce("YY", function(e, n) {
        n[it] = l.parseTwoDigitYear(e);
      }), Ce("Y", function(e, n) {
        n[it] = parseInt(e, 10);
      });
      function Ea(e) {
        return _r(e) ? 366 : 365;
      }
      l.parseTwoDigitYear = function(e) {
        return _e(e) + (_e(e) > 68 ? 1900 : 2e3);
      };
      var Io = ea("FullYear", true);
      function xm() {
        return _r(this.year());
      }
      function ea(e, n) {
        return function(d) {
          return d != null ? (Ro(this, e, d), l.updateOffset(this, n), this) : sn(this, e);
        };
      }
      function sn(e, n) {
        if (!e.isValid()) return NaN;
        var d = e._d, m = e._isUTC;
        switch (n) {
          case "Milliseconds":
            return m ? d.getUTCMilliseconds() : d.getMilliseconds();
          case "Seconds":
            return m ? d.getUTCSeconds() : d.getSeconds();
          case "Minutes":
            return m ? d.getUTCMinutes() : d.getMinutes();
          case "Hours":
            return m ? d.getUTCHours() : d.getHours();
          case "Date":
            return m ? d.getUTCDate() : d.getDate();
          case "Day":
            return m ? d.getUTCDay() : d.getDay();
          case "Month":
            return m ? d.getUTCMonth() : d.getMonth();
          case "FullYear":
            return m ? d.getUTCFullYear() : d.getFullYear();
          default:
            return NaN;
        }
      }
      function Ro(e, n, d) {
        var m, h, k, S, W;
        if (!(!e.isValid() || isNaN(d))) {
          switch (m = e._d, h = e._isUTC, n) {
            case "Milliseconds":
              return void (h ? m.setUTCMilliseconds(d) : m.setMilliseconds(d));
            case "Seconds":
              return void (h ? m.setUTCSeconds(d) : m.setSeconds(d));
            case "Minutes":
              return void (h ? m.setUTCMinutes(d) : m.setMinutes(d));
            case "Hours":
              return void (h ? m.setUTCHours(d) : m.setHours(d));
            case "Date":
              return void (h ? m.setUTCDate(d) : m.setDate(d));
            case "FullYear":
              break;
            default:
              return;
          }
          k = d, S = e.month(), W = e.date(), W = W === 29 && S === 1 && !_r(k) ? 28 : W, h ? m.setUTCFullYear(k, S, W) : m.setFullYear(k, S, W);
        }
      }
      function pr(e) {
        return e = Oe(e), Re(this[e]) ? this[e]() : this;
      }
      function Nm(e, n) {
        if (typeof e == "object") {
          e = Mn(e);
          var d = Tm(e), m, h = d.length;
          for (m = 0; m < h; m++) this[d[m].unit](e[d[m].unit]);
        } else if (e = Oe(e), Re(this[e])) return this[e](n);
        return this;
      }
      function Am(e, n) {
        return (e % n + n) % n;
      }
      var ze;
      Array.prototype.indexOf ? ze = Array.prototype.indexOf : ze = function(e) {
        var n;
        for (n = 0; n < this.length; ++n) if (this[n] === e) return n;
        return -1;
      };
      function yr(e, n) {
        if (isNaN(e) || isNaN(n)) return NaN;
        var d = Am(n, 12);
        return e += (n - d) / 12, d === 1 ? _r(e) ? 29 : 28 : 31 - d % 7 % 2;
      }
      J("M", ["MM", 2], "Mo", function() {
        return this.month() + 1;
      }), J("MMM", 0, 0, function(e) {
        return this.localeData().monthsShort(this, e);
      }), J("MMMM", 0, 0, function(e) {
        return this.localeData().months(this, e);
      }), $("M", Fe, Ln), $("MM", Fe, Ct), $("MMM", function(e, n) {
        return n.monthsShortRegex(e);
      }), $("MMMM", function(e, n) {
        return n.monthsRegex(e);
      }), Ce(["M", "MM"], function(e, n) {
        n[As] = _e(e) - 1;
      }), Ce(["MMM", "MMMM"], function(e, n, d, m) {
        var h = d._locale.monthsParse(e, m, d._strict);
        h != null ? n[As] = h : x(d).invalidMonth = e;
      });
      var Oo = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ci = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), Uo = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, Em = Xn, Hm = Xn;
      function Pm(e, n) {
        return e ? g(this._months) ? this._months[e.month()] : this._months[(this._months.isFormat || Uo).test(n) ? "format" : "standalone"][e.month()] : g(this._months) ? this._months : this._months.standalone;
      }
      function zo(e, n) {
        return e ? g(this._monthsShort) ? this._monthsShort[e.month()] : this._monthsShort[Uo.test(n) ? "format" : "standalone"][e.month()] : g(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone;
      }
      function Bo(e, n, d) {
        var m, h, k, S = e.toLocaleLowerCase();
        if (!this._monthsParse) for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], m = 0; m < 12; ++m) k = q([2e3, m]), this._shortMonthsParse[m] = this.monthsShort(k, "").toLocaleLowerCase(), this._longMonthsParse[m] = this.months(k, "").toLocaleLowerCase();
        return d ? n === "MMM" ? (h = ze.call(this._shortMonthsParse, S), h !== -1 ? h : null) : (h = ze.call(this._longMonthsParse, S), h !== -1 ? h : null) : n === "MMM" ? (h = ze.call(this._shortMonthsParse, S), h !== -1 ? h : (h = ze.call(this._longMonthsParse, S), h !== -1 ? h : null)) : (h = ze.call(this._longMonthsParse, S), h !== -1 ? h : (h = ze.call(this._shortMonthsParse, S), h !== -1 ? h : null));
      }
      function Wo(e, n, d) {
        var m, h, k;
        if (this._monthsParseExact) return Bo.call(this, e, n, d);
        for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), m = 0; m < 12; m++) {
          if (h = q([2e3, m]), d && !this._longMonthsParse[m] && (this._longMonthsParse[m] = new RegExp("^" + this.months(h, "").replace(".", "") + "$", "i"), this._shortMonthsParse[m] = new RegExp("^" + this.monthsShort(h, "").replace(".", "") + "$", "i")), !d && !this._monthsParse[m] && (k = "^" + this.months(h, "") + "|^" + this.monthsShort(h, ""), this._monthsParse[m] = new RegExp(k.replace(".", ""), "i")), d && n === "MMMM" && this._longMonthsParse[m].test(e)) return m;
          if (d && n === "MMM" && this._shortMonthsParse[m].test(e)) return m;
          if (!d && this._monthsParse[m].test(e)) return m;
        }
      }
      function vr(e, n) {
        if (!e.isValid()) return e;
        if (typeof n == "string") {
          if (/^\d+$/.test(n)) n = _e(n);
          else if (n = e.localeData().monthsParse(n), !D(n)) return e;
        }
        var d = n, m = e.date();
        return m = m < 29 ? m : Math.min(m, yr(e.year(), d)), e._isUTC ? e._d.setUTCMonth(d, m) : e._d.setMonth(d, m), e;
      }
      function $o(e) {
        return e != null ? (vr(this, e), l.updateOffset(this, true), this) : sn(this, "Month");
      }
      function Go() {
        return yr(this.year(), this.month());
      }
      function wr(e) {
        return this._monthsParseExact ? (p(this, "_monthsRegex") || Jo.call(this), e ? this._monthsShortStrictRegex : this._monthsShortRegex) : (p(this, "_monthsShortRegex") || (this._monthsShortRegex = Em), this._monthsShortStrictRegex && e ? this._monthsShortStrictRegex : this._monthsShortRegex);
      }
      function Vo(e) {
        return this._monthsParseExact ? (p(this, "_monthsRegex") || Jo.call(this), e ? this._monthsStrictRegex : this._monthsRegex) : (p(this, "_monthsRegex") || (this._monthsRegex = Hm), this._monthsStrictRegex && e ? this._monthsStrictRegex : this._monthsRegex);
      }
      function Jo() {
        function e(ie, ye) {
          return ye.length - ie.length;
        }
        var n = [], d = [], m = [], h, k, S, W;
        for (h = 0; h < 12; h++) k = q([2e3, h]), S = Ns(this.monthsShort(k, "")), W = Ns(this.months(k, "")), n.push(S), d.push(W), m.push(W), m.push(S);
        n.sort(e), d.sort(e), m.sort(e), this._monthsRegex = new RegExp("^(" + m.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp("^(" + d.join("|") + ")", "i"), this._monthsShortStrictRegex = new RegExp("^(" + n.join("|") + ")", "i");
      }
      function Ko(e, n, d, m, h, k, S) {
        var W;
        return e < 100 && e >= 0 ? (W = new Date(e + 400, n, d, m, h, k, S), isFinite(W.getFullYear()) && W.setFullYear(e)) : W = new Date(e, n, d, m, h, k, S), W;
      }
      function ta(e) {
        var n, d;
        return e < 100 && e >= 0 ? (d = Array.prototype.slice.call(arguments), d[0] = e + 400, n = new Date(Date.UTC.apply(null, d)), isFinite(n.getUTCFullYear()) && n.setUTCFullYear(e)) : n = new Date(Date.UTC.apply(null, arguments)), n;
      }
      function sa(e, n, d) {
        var m = 7 + n - d, h = (7 + ta(e, 0, m).getUTCDay() - n) % 7;
        return -h + m - 1;
      }
      function Zo(e, n, d, m, h) {
        var k = (7 + d - m) % 7, S = sa(e, m, h), W = 1 + 7 * (n - 1) + k + S, ie, ye;
        return W <= 0 ? (ie = e - 1, ye = Ea(ie) + W) : W > Ea(e) ? (ie = e + 1, ye = W - Ea(e)) : (ie = e, ye = W), { year: ie, dayOfYear: ye };
      }
      function na(e, n, d) {
        var m = sa(e.year(), n, d), h = Math.floor((e.dayOfYear() - m - 1) / 7) + 1, k, S;
        return h < 1 ? (S = e.year() - 1, k = h + ss(S, n, d)) : h > ss(e.year(), n, d) ? (k = h - ss(e.year(), n, d), S = e.year() + 1) : (S = e.year(), k = h), { week: k, year: S };
      }
      function ss(e, n, d) {
        var m = sa(e, n, d), h = sa(e + 1, n, d);
        return (Ea(e) - m + h) / 7;
      }
      J("w", ["ww", 2], "wo", "week"), J("W", ["WW", 2], "Wo", "isoWeek"), $("w", Fe, Ln), $("ww", Fe, Ct), $("W", Fe, Ln), $("WW", Fe, Ct), kn(["w", "ww", "W", "WW"], function(e, n, d, m) {
        n[m.substr(0, 1)] = _e(e);
      });
      function gi(e) {
        return na(e, this._week.dow, this._week.doy).week;
      }
      var aa = { dow: 0, doy: 6 };
      function Qo() {
        return this._week.dow;
      }
      function Xo() {
        return this._week.doy;
      }
      function jm(e) {
        var n = this.localeData().week(this);
        return e == null ? n : this.add((e - n) * 7, "d");
      }
      function el(e) {
        var n = na(this, 1, 4).week;
        return e == null ? n : this.add((e - n) * 7, "d");
      }
      J("d", 0, "do", "day"), J("dd", 0, 0, function(e) {
        return this.localeData().weekdaysMin(this, e);
      }), J("ddd", 0, 0, function(e) {
        return this.localeData().weekdaysShort(this, e);
      }), J("dddd", 0, 0, function(e) {
        return this.localeData().weekdays(this, e);
      }), J("e", 0, 0, "weekday"), J("E", 0, 0, "isoWeekday"), $("d", Fe), $("e", Fe), $("E", Fe), $("dd", function(e, n) {
        return n.weekdaysMinRegex(e);
      }), $("ddd", function(e, n) {
        return n.weekdaysShortRegex(e);
      }), $("dddd", function(e, n) {
        return n.weekdaysRegex(e);
      }), kn(["dd", "ddd", "dddd"], function(e, n, d, m) {
        var h = d._locale.weekdaysParse(e, m, d._strict);
        h != null ? n.d = h : x(d).invalidWeekday = e;
      }), kn(["d", "e", "E"], function(e, n, d, m) {
        n[m] = _e(e);
      });
      function tl(e, n) {
        return typeof e != "string" ? e : isNaN(e) ? (e = n.weekdaysParse(e), typeof e == "number" ? e : null) : parseInt(e, 10);
      }
      function sl(e, n) {
        return typeof e == "string" ? n.weekdaysParse(e) % 7 || 7 : isNaN(e) ? null : e;
      }
      function Mr(e, n) {
        return e.slice(n, 7).concat(e.slice(0, n));
      }
      var qm = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), nl = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), Im = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), al = Xn, Rm = Xn, Om = Xn;
      function Um(e, n) {
        var d = g(this._weekdays) ? this._weekdays : this._weekdays[e && e !== true && this._weekdays.isFormat.test(n) ? "format" : "standalone"];
        return e === true ? Mr(d, this._week.dow) : e ? d[e.day()] : d;
      }
      function zm(e) {
        return e === true ? Mr(this._weekdaysShort, this._week.dow) : e ? this._weekdaysShort[e.day()] : this._weekdaysShort;
      }
      function hi(e) {
        return e === true ? Mr(this._weekdaysMin, this._week.dow) : e ? this._weekdaysMin[e.day()] : this._weekdaysMin;
      }
      function Bm(e, n, d) {
        var m, h, k, S = e.toLocaleLowerCase();
        if (!this._weekdaysParse) for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], m = 0; m < 7; ++m) k = q([2e3, 1]).day(m), this._minWeekdaysParse[m] = this.weekdaysMin(k, "").toLocaleLowerCase(), this._shortWeekdaysParse[m] = this.weekdaysShort(k, "").toLocaleLowerCase(), this._weekdaysParse[m] = this.weekdays(k, "").toLocaleLowerCase();
        return d ? n === "dddd" ? (h = ze.call(this._weekdaysParse, S), h !== -1 ? h : null) : n === "ddd" ? (h = ze.call(this._shortWeekdaysParse, S), h !== -1 ? h : null) : (h = ze.call(this._minWeekdaysParse, S), h !== -1 ? h : null) : n === "dddd" ? (h = ze.call(this._weekdaysParse, S), h !== -1 || (h = ze.call(this._shortWeekdaysParse, S), h !== -1) ? h : (h = ze.call(this._minWeekdaysParse, S), h !== -1 ? h : null)) : n === "ddd" ? (h = ze.call(this._shortWeekdaysParse, S), h !== -1 || (h = ze.call(this._weekdaysParse, S), h !== -1) ? h : (h = ze.call(this._minWeekdaysParse, S), h !== -1 ? h : null)) : (h = ze.call(this._minWeekdaysParse, S), h !== -1 || (h = ze.call(this._weekdaysParse, S), h !== -1) ? h : (h = ze.call(this._shortWeekdaysParse, S), h !== -1 ? h : null));
      }
      function Wm(e, n, d) {
        var m, h, k;
        if (this._weekdaysParseExact) return Bm.call(this, e, n, d);
        for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), m = 0; m < 7; m++) {
          if (h = q([2e3, 1]).day(m), d && !this._fullWeekdaysParse[m] && (this._fullWeekdaysParse[m] = new RegExp("^" + this.weekdays(h, "").replace(".", "\\.?") + "$", "i"), this._shortWeekdaysParse[m] = new RegExp("^" + this.weekdaysShort(h, "").replace(".", "\\.?") + "$", "i"), this._minWeekdaysParse[m] = new RegExp("^" + this.weekdaysMin(h, "").replace(".", "\\.?") + "$", "i")), this._weekdaysParse[m] || (k = "^" + this.weekdays(h, "") + "|^" + this.weekdaysShort(h, "") + "|^" + this.weekdaysMin(h, ""), this._weekdaysParse[m] = new RegExp(k.replace(".", ""), "i")), d && n === "dddd" && this._fullWeekdaysParse[m].test(e)) return m;
          if (d && n === "ddd" && this._shortWeekdaysParse[m].test(e)) return m;
          if (d && n === "dd" && this._minWeekdaysParse[m].test(e)) return m;
          if (!d && this._weekdaysParse[m].test(e)) return m;
        }
      }
      function $m(e) {
        if (!this.isValid()) return e != null ? this : NaN;
        var n = sn(this, "Day");
        return e != null ? (e = tl(e, this.localeData()), this.add(e - n, "d")) : n;
      }
      function Gm(e) {
        if (!this.isValid()) return e != null ? this : NaN;
        var n = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return e == null ? n : this.add(e - n, "d");
      }
      function Vm(e) {
        if (!this.isValid()) return e != null ? this : NaN;
        if (e != null) {
          var n = sl(e, this.localeData());
          return this.day(this.day() % 7 ? n : n - 7);
        } else return this.day() || 7;
      }
      function He(e) {
        return this._weekdaysParseExact ? (p(this, "_weekdaysRegex") || fi.call(this), e ? this._weekdaysStrictRegex : this._weekdaysRegex) : (p(this, "_weekdaysRegex") || (this._weekdaysRegex = al), this._weekdaysStrictRegex && e ? this._weekdaysStrictRegex : this._weekdaysRegex);
      }
      function Ne(e) {
        return this._weekdaysParseExact ? (p(this, "_weekdaysRegex") || fi.call(this), e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (p(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = Rm), this._weekdaysShortStrictRegex && e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex);
      }
      function Jm(e) {
        return this._weekdaysParseExact ? (p(this, "_weekdaysRegex") || fi.call(this), e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (p(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = Om), this._weekdaysMinStrictRegex && e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex);
      }
      function fi() {
        function e(nt, Ds) {
          return Ds.length - nt.length;
        }
        var n = [], d = [], m = [], h = [], k, S, W, ie, ye;
        for (k = 0; k < 7; k++) S = q([2e3, 1]).day(k), W = Ns(this.weekdaysMin(S, "")), ie = Ns(this.weekdaysShort(S, "")), ye = Ns(this.weekdays(S, "")), n.push(W), d.push(ie), m.push(ye), h.push(W), h.push(ie), h.push(ye);
        n.sort(e), d.sort(e), m.sort(e), h.sort(e), this._weekdaysRegex = new RegExp("^(" + h.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp("^(" + m.join("|") + ")", "i"), this._weekdaysShortStrictRegex = new RegExp("^(" + d.join("|") + ")", "i"), this._weekdaysMinStrictRegex = new RegExp("^(" + n.join("|") + ")", "i");
      }
      function _i() {
        return this.hours() % 12 || 12;
      }
      function Km() {
        return this.hours() || 24;
      }
      J("H", ["HH", 2], 0, "hour"), J("h", ["hh", 2], 0, _i), J("k", ["kk", 2], 0, Km), J("hmm", 0, 0, function() {
        return "" + _i.apply(this) + Yt(this.minutes(), 2);
      }), J("hmmss", 0, 0, function() {
        return "" + _i.apply(this) + Yt(this.minutes(), 2) + Yt(this.seconds(), 2);
      }), J("Hmm", 0, 0, function() {
        return "" + this.hours() + Yt(this.minutes(), 2);
      }), J("Hmmss", 0, 0, function() {
        return "" + this.hours() + Yt(this.minutes(), 2) + Yt(this.seconds(), 2);
      });
      function rl(e, n) {
        J(e, 0, 0, function() {
          return this.localeData().meridiem(this.hours(), this.minutes(), n);
        });
      }
      rl("a", true), rl("A", false);
      function il(e, n) {
        return n._meridiemParse;
      }
      $("a", il), $("A", il), $("H", Fe, ui), $("h", Fe, Ln), $("k", Fe, Ln), $("HH", Fe, Ct), $("hh", Fe, Ct), $("kk", Fe, Ct), $("hmm", cr), $("hmmss", gr), $("Hmm", cr), $("Hmmss", gr), Ce(["H", "HH"], Ze), Ce(["k", "kk"], function(e, n, d) {
        var m = _e(e);
        n[Ze] = m === 24 ? 0 : m;
      }), Ce(["a", "A"], function(e, n, d) {
        d._isPm = d._locale.isPM(e), d._meridiem = e;
      }), Ce(["h", "hh"], function(e, n, d) {
        n[Ze] = _e(e), x(d).bigHour = true;
      }), Ce("hmm", function(e, n, d) {
        var m = e.length - 2;
        n[Ze] = _e(e.substr(0, m)), n[ts] = _e(e.substr(m)), x(d).bigHour = true;
      }), Ce("hmmss", function(e, n, d) {
        var m = e.length - 4, h = e.length - 2;
        n[Ze] = _e(e.substr(0, m)), n[ts] = _e(e.substr(m, 2)), n[Es] = _e(e.substr(h)), x(d).bigHour = true;
      }), Ce("Hmm", function(e, n, d) {
        var m = e.length - 2;
        n[Ze] = _e(e.substr(0, m)), n[ts] = _e(e.substr(m));
      }), Ce("Hmmss", function(e, n, d) {
        var m = e.length - 4, h = e.length - 2;
        n[Ze] = _e(e.substr(0, m)), n[ts] = _e(e.substr(m, 2)), n[Es] = _e(e.substr(h));
      });
      function ol(e) {
        return (e + "").toLowerCase().charAt(0) === "p";
      }
      var Zm = /[ap]\.?m?\.?/i, tt = ea("Hours", true);
      function pi(e, n, d) {
        return e > 11 ? d ? "pm" : "PM" : d ? "am" : "AM";
      }
      var nn = { calendar: Zs, longDateFormat: Mm, invalidDate: mr, ordinal: es, dayOfMonthOrdinalParse: xa, relativeTime: xs, months: Oo, monthsShort: ci, week: aa, weekdays: qm, weekdaysMin: Im, weekdaysShort: nl, meridiemParse: Zm }, Pe = {}, Tn = {}, ot;
      function ll(e, n) {
        var d, m = Math.min(e.length, n.length);
        for (d = 0; d < m; d += 1) if (e[d] !== n[d]) return d;
        return m;
      }
      function yi(e) {
        return e && e.toLowerCase().replace("_", "-");
      }
      function dl(e) {
        for (var n = 0, d, m, h, k; n < e.length; ) {
          for (k = yi(e[n]).split("-"), d = k.length, m = yi(e[n + 1]), m = m ? m.split("-") : null; d > 0; ) {
            if (h = Ha(k.slice(0, d).join("-")), h) return h;
            if (m && m.length >= d && ll(k, m) >= d - 1) break;
            d--;
          }
          n++;
        }
        return ot;
      }
      function ml(e) {
        return !!(e && e.match("^[^/\\\\]*$"));
      }
      function Ha(e) {
        var n = null, d;
        if (Pe[e] === void 0 && s && s.exports && ml(e)) try {
          n = ot._abbr, d = ep, d("./locale/" + e), Hs(n);
        } catch {
          Pe[e] = null;
        }
        return Pe[e];
      }
      function Hs(e, n) {
        var d;
        return e && (w(n) ? d = Ge(e) : d = mt(e, n), d ? ot = d : typeof console < "u" && console.warn && console.warn("Locale " + e + " not found. Did you forget to load it?")), ot._abbr;
      }
      function mt(e, n) {
        if (n !== null) {
          var d, m = nn;
          if (n.abbr = e, Pe[e] != null) Ot("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."), m = Pe[e]._config;
          else if (n.parentLocale != null) if (Pe[n.parentLocale] != null) m = Pe[n.parentLocale]._config;
          else if (d = Ha(n.parentLocale), d != null) m = d._config;
          else return Tn[n.parentLocale] || (Tn[n.parentLocale] = []), Tn[n.parentLocale].push({ name: e, config: n }), null;
          return Pe[e] = new Fa(Ks(m, n)), Tn[e] && Tn[e].forEach(function(h) {
            mt(h.name, h.config);
          }), Hs(e), Pe[e];
        } else return delete Pe[e], null;
      }
      function Qm(e, n) {
        if (n != null) {
          var d, m, h = nn;
          Pe[e] != null && Pe[e].parentLocale != null ? Pe[e].set(Ks(Pe[e]._config, n)) : (m = Ha(e), m != null && (h = m._config), n = Ks(h, n), m == null && (n.abbr = e), d = new Fa(n), d.parentLocale = Pe[e], Pe[e] = d), Hs(e);
        } else Pe[e] != null && (Pe[e].parentLocale != null ? (Pe[e] = Pe[e].parentLocale, e === Hs() && Hs(e)) : Pe[e] != null && delete Pe[e]);
        return Pe[e];
      }
      function Ge(e) {
        var n;
        if (e && e._locale && e._locale._abbr && (e = e._locale._abbr), !e) return ot;
        if (!g(e)) {
          if (n = Ha(e), n) return n;
          e = [e];
        }
        return dl(e);
      }
      function Xm() {
        return Fs(Pe);
      }
      function Lr(e) {
        var n, d = e._a;
        return d && x(e).overflow === -2 && (n = d[As] < 0 || d[As] > 11 ? As : d[gs] < 1 || d[gs] > yr(d[it], d[As]) ? gs : d[Ze] < 0 || d[Ze] > 24 || d[Ze] === 24 && (d[ts] !== 0 || d[Es] !== 0 || d[tn] !== 0) ? Ze : d[ts] < 0 || d[ts] > 59 ? ts : d[Es] < 0 || d[Es] > 59 ? Es : d[tn] < 0 || d[tn] > 999 ? tn : -1, x(e)._overflowDayOfYear && (n < it || n > gs) && (n = gs), x(e)._overflowWeeks && n === -1 && (n = Sm), x(e)._overflowWeekday && n === -1 && (n = Fm), x(e).overflow = n), e;
      }
      var an = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, kr = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, vi = /Z|[+-]\d\d(?::?\d\d)?/, xe = [["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/], ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/], ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/], ["GGGG-[W]WW", /\d{4}-W\d\d/, false], ["YYYY-DDD", /\d{4}-\d{3}/], ["YYYY-MM", /\d{4}-\d\d/, false], ["YYYYYYMMDD", /[+-]\d{10}/], ["YYYYMMDD", /\d{8}/], ["GGGG[W]WWE", /\d{4}W\d{3}/], ["GGGG[W]WW", /\d{4}W\d{2}/, false], ["YYYYDDD", /\d{7}/], ["YYYYMM", /\d{6}/, false], ["YYYY", /\d{4}/, false]], hs = [["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/], ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/], ["HH:mm:ss", /\d\d:\d\d:\d\d/], ["HH:mm", /\d\d:\d\d/], ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/], ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/], ["HHmmss", /\d\d\d\d\d\d/], ["HHmm", /\d\d\d\d/], ["HH", /\d\d/]], wi = /^\/?Date\((-?\d+)/i, eu = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/, Mi = { UT: 0, GMT: 0, EDT: -240, EST: -300, CDT: -300, CST: -360, MDT: -360, MST: -420, PDT: -420, PST: -480 };
      function ul(e) {
        var n, d, m = e._i, h = an.exec(m) || kr.exec(m), k, S, W, ie, ye = xe.length, nt = hs.length;
        if (h) {
          for (x(e).iso = true, n = 0, d = ye; n < d; n++) if (xe[n][1].exec(h[1])) {
            S = xe[n][0], k = xe[n][2] !== false;
            break;
          }
          if (S == null) {
            e._isValid = false;
            return;
          }
          if (h[3]) {
            for (n = 0, d = nt; n < d; n++) if (hs[n][1].exec(h[3])) {
              W = (h[2] || " ") + hs[n][0];
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
          if (h[4]) if (vi.exec(h[4])) ie = "Z";
          else {
            e._isValid = false;
            return;
          }
          e._f = S + (W || "") + (ie || ""), ki(e);
        } else e._isValid = false;
      }
      function tu(e, n, d, m, h, k) {
        var S = [su(e), ci.indexOf(n), parseInt(d, 10), parseInt(m, 10), parseInt(h, 10)];
        return k && S.push(parseInt(k, 10)), S;
      }
      function su(e) {
        var n = parseInt(e, 10);
        return n <= 49 ? 2e3 + n : n <= 999 ? 1900 + n : n;
      }
      function cl(e) {
        return e.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
      }
      function Tr(e, n, d) {
        if (e) {
          var m = nl.indexOf(e), h = new Date(n[0], n[1], n[2]).getDay();
          if (m !== h) return x(d).weekdayMismatch = true, d._isValid = false, false;
        }
        return true;
      }
      function ra(e, n, d) {
        if (e) return Mi[e];
        if (n) return 0;
        var m = parseInt(d, 10), h = m % 100, k = (m - h) / 100;
        return k * 60 + h;
      }
      function gl(e) {
        var n = eu.exec(cl(e._i)), d;
        if (n) {
          if (d = tu(n[4], n[3], n[2], n[5], n[6], n[7]), !Tr(n[1], d, e)) return;
          e._a = d, e._tzm = ra(n[8], n[9], n[10]), e._d = ta.apply(null, e._a), e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), x(e).rfc2822 = true;
        } else e._isValid = false;
      }
      function hl(e) {
        var n = wi.exec(e._i);
        if (n !== null) {
          e._d = /* @__PURE__ */ new Date(+n[1]);
          return;
        }
        if (ul(e), e._isValid === false) delete e._isValid;
        else return;
        if (gl(e), e._isValid === false) delete e._isValid;
        else return;
        e._strict ? e._isValid = false : l.createFromInputFallback(e);
      }
      l.createFromInputFallback = ke("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function(e) {
        e._d = /* @__PURE__ */ new Date(e._i + (e._useUTC ? " UTC" : ""));
      });
      function Dn(e, n, d) {
        return e ?? n ?? d;
      }
      function Li(e) {
        var n = new Date(l.now());
        return e._useUTC ? [n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate()] : [n.getFullYear(), n.getMonth(), n.getDate()];
      }
      function Pa(e) {
        var n, d, m = [], h, k, S;
        if (!e._d) {
          for (h = Li(e), e._w && e._a[gs] == null && e._a[As] == null && fl(e), e._dayOfYear != null && (S = Dn(e._a[it], h[it]), (e._dayOfYear > Ea(S) || e._dayOfYear === 0) && (x(e)._overflowDayOfYear = true), d = ta(S, 0, e._dayOfYear), e._a[As] = d.getUTCMonth(), e._a[gs] = d.getUTCDate()), n = 0; n < 3 && e._a[n] == null; ++n) e._a[n] = m[n] = h[n];
          for (; n < 7; n++) e._a[n] = m[n] = e._a[n] == null ? n === 2 ? 1 : 0 : e._a[n];
          e._a[Ze] === 24 && e._a[ts] === 0 && e._a[Es] === 0 && e._a[tn] === 0 && (e._nextDay = true, e._a[Ze] = 0), e._d = (e._useUTC ? ta : Ko).apply(null, m), k = e._useUTC ? e._d.getUTCDay() : e._d.getDay(), e._tzm != null && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), e._nextDay && (e._a[Ze] = 24), e._w && typeof e._w.d < "u" && e._w.d !== k && (x(e).weekdayMismatch = true);
        }
      }
      function fl(e) {
        var n, d, m, h, k, S, W, ie, ye;
        n = e._w, n.GG != null || n.W != null || n.E != null ? (k = 1, S = 4, d = Dn(n.GG, e._a[it], na(Ae(), 1, 4).year), m = Dn(n.W, 1), h = Dn(n.E, 1), (h < 1 || h > 7) && (ie = true)) : (k = e._locale._week.dow, S = e._locale._week.doy, ye = na(Ae(), k, S), d = Dn(n.gg, e._a[it], ye.year), m = Dn(n.w, ye.week), n.d != null ? (h = n.d, (h < 0 || h > 6) && (ie = true)) : n.e != null ? (h = n.e + k, (n.e < 0 || n.e > 6) && (ie = true)) : h = k), m < 1 || m > ss(d, k, S) ? x(e)._overflowWeeks = true : ie != null ? x(e)._overflowWeekday = true : (W = Zo(d, m, h, k, S), e._a[it] = W.year, e._dayOfYear = W.dayOfYear);
      }
      l.ISO_8601 = function() {
      }, l.RFC_2822 = function() {
      };
      function ki(e) {
        if (e._f === l.ISO_8601) {
          ul(e);
          return;
        }
        if (e._f === l.RFC_2822) {
          gl(e);
          return;
        }
        e._a = [], x(e).empty = true;
        var n = "" + e._i, d, m, h, k, S, W = n.length, ie = 0, ye, nt;
        for (h = Wn(e._f, e._locale).match(Ut) || [], nt = h.length, d = 0; d < nt; d++) k = h[d], m = (n.match(Cm(k, e)) || [])[0], m && (S = n.substr(0, n.indexOf(m)), S.length > 0 && x(e).unusedInput.push(S), n = n.slice(n.indexOf(m) + m.length), ie += m.length), Bn[k] ? (m ? x(e).empty = false : x(e).unusedTokens.push(k), bm(k, m, e)) : e._strict && !m && x(e).unusedTokens.push(k);
        x(e).charsLeftOver = W - ie, n.length > 0 && x(e).unusedInput.push(n), e._a[Ze] <= 12 && x(e).bigHour === true && e._a[Ze] > 0 && (x(e).bigHour = void 0), x(e).parsedDateParts = e._a.slice(0), x(e).meridiem = e._meridiem, e._a[Ze] = Ti(e._locale, e._a[Ze], e._meridiem), ye = x(e).era, ye !== null && (e._a[it] = e._locale.erasConvertYear(ye, e._a[it])), Pa(e), Lr(e);
      }
      function Ti(e, n, d) {
        var m;
        return d == null ? n : e.meridiemHour != null ? e.meridiemHour(n, d) : (e.isPM != null && (m = e.isPM(d), m && n < 12 && (n += 12), !m && n === 12 && (n = 0)), n);
      }
      function Di(e) {
        var n, d, m, h, k, S, W = false, ie = e._f.length;
        if (ie === 0) {
          x(e).invalidFormat = true, e._d = /* @__PURE__ */ new Date(NaN);
          return;
        }
        for (h = 0; h < ie; h++) k = 0, S = false, n = B({}, e), e._useUTC != null && (n._useUTC = e._useUTC), n._f = e._f[h], ki(n), X(n) && (S = true), k += x(n).charsLeftOver, k += x(n).unusedTokens.length * 10, x(n).score = k, W ? k < m && (m = k, d = n) : (m == null || k < m || S) && (m = k, d = n, S && (W = true));
        N(e, d || n);
      }
      function nu(e) {
        if (!e._d) {
          var n = Mn(e._i), d = n.day === void 0 ? n.date : n.day;
          e._a = H([n.year, n.month, d, n.hour, n.minute, n.second, n.millisecond], function(m) {
            return m && parseInt(m, 10);
          }), Pa(e);
        }
      }
      function _l(e) {
        var n = new V(Lr(_t(e)));
        return n._nextDay && (n.add(1, "d"), n._nextDay = void 0), n;
      }
      function _t(e) {
        var n = e._i, d = e._f;
        return e._locale = e._locale || Ge(e._l), n === null || d === void 0 && n === "" ? se({ nullInput: true }) : (typeof n == "string" && (e._i = n = e._locale.preparse(n)), he(n) ? new V(Lr(n)) : (b(n) ? e._d = n : g(d) ? Di(e) : d ? ki(e) : Yi(e), X(e) || (e._d = null), e));
      }
      function Yi(e) {
        var n = e._i;
        w(n) ? e._d = new Date(l.now()) : b(n) ? e._d = new Date(n.valueOf()) : typeof n == "string" ? hl(e) : g(n) ? (e._a = H(n.slice(0), function(d) {
          return parseInt(d, 10);
        }), Pa(e)) : f(n) ? nu(e) : D(n) ? e._d = new Date(n) : l.createFromInputFallback(e);
      }
      function ia(e, n, d, m, h) {
        var k = {};
        return (n === true || n === false) && (m = n, n = void 0), (d === true || d === false) && (m = d, d = void 0), (f(e) && L(e) || g(e) && e.length === 0) && (e = void 0), k._isAMomentObject = true, k._useUTC = k._isUTC = h, k._l = d, k._i = e, k._f = n, k._strict = m, _l(k);
      }
      function Ae(e, n, d, m) {
        return ia(e, n, d, m, false);
      }
      var pl = ke("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
        var e = Ae.apply(null, arguments);
        return this.isValid() && e.isValid() ? e < this ? this : e : se();
      }), au = ke("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
        var e = Ae.apply(null, arguments);
        return this.isValid() && e.isValid() ? e > this ? this : e : se();
      });
      function yl(e, n) {
        var d, m;
        if (n.length === 1 && g(n[0]) && (n = n[0]), !n.length) return Ae();
        for (d = n[0], m = 1; m < n.length; ++m) (!n[m].isValid() || n[m][e](d)) && (d = n[m]);
        return d;
      }
      function ru() {
        var e = [].slice.call(arguments, 0);
        return yl("isBefore", e);
      }
      function iu() {
        var e = [].slice.call(arguments, 0);
        return yl("isAfter", e);
      }
      var ou = function() {
        return Date.now ? Date.now() : +/* @__PURE__ */ new Date();
      }, fs = ["year", "quarter", "month", "week", "day", "hour", "minute", "second", "millisecond"];
      function lu(e) {
        var n, d = false, m, h = fs.length;
        for (n in e) if (p(e, n) && !(ze.call(fs, n) !== -1 && (e[n] == null || !isNaN(e[n])))) return false;
        for (m = 0; m < h; ++m) if (e[fs[m]]) {
          if (d) return false;
          parseFloat(e[fs[m]]) !== _e(e[fs[m]]) && (d = true);
        }
        return true;
      }
      function du() {
        return this._isValid;
      }
      function Ci() {
        return fe(NaN);
      }
      function ja(e) {
        var n = Mn(e), d = n.year || 0, m = n.quarter || 0, h = n.month || 0, k = n.week || n.isoWeek || 0, S = n.day || 0, W = n.hour || 0, ie = n.minute || 0, ye = n.second || 0, nt = n.millisecond || 0;
        this._isValid = lu(n), this._milliseconds = +nt + ye * 1e3 + ie * 6e4 + W * 1e3 * 60 * 60, this._days = +S + k * 7, this._months = +h + m * 3 + d * 12, this._data = {}, this._locale = Ge(), this._bubble();
      }
      function ns(e) {
        return e instanceof ja;
      }
      function oa(e) {
        return e < 0 ? Math.round(-1 * e) * -1 : Math.round(e);
      }
      function mu(e, n, d) {
        var m = Math.min(e.length, n.length), h = Math.abs(e.length - n.length), k = 0, S;
        for (S = 0; S < m; S++) _e(e[S]) !== _e(n[S]) && k++;
        return k + h;
      }
      function vl(e, n) {
        J(e, 0, 0, function() {
          var d = this.utcOffset(), m = "+";
          return d < 0 && (d = -d, m = "-"), m + Yt(~~(d / 60), 2) + n + Yt(~~d % 60, 2);
        });
      }
      vl("Z", ":"), vl("ZZ", ""), $("Z", hr), $("ZZ", hr), Ce(["Z", "ZZ"], function(e, n, d) {
        d._useUTC = true, d._tzm = rn(hr, e);
      });
      var uu = /([\+\-]|\d\d)/gi;
      function rn(e, n) {
        var d = (n || "").match(e), m, h, k;
        return d === null ? null : (m = d[d.length - 1] || [], h = (m + "").match(uu) || ["-", 0, 0], k = +(h[1] * 60) + _e(h[2]), k === 0 ? 0 : h[0] === "+" ? k : -k);
      }
      function bt(e, n) {
        var d, m;
        return n._isUTC ? (d = n.clone(), m = (he(e) || b(e) ? e.valueOf() : Ae(e).valueOf()) - d.valueOf(), d._d.setTime(d._d.valueOf() + m), l.updateOffset(d, false), d) : Ae(e).local();
      }
      function Dr(e) {
        return -Math.round(e._d.getTimezoneOffset());
      }
      l.updateOffset = function() {
      };
      function cu(e, n, d) {
        var m = this._offset || 0, h;
        if (!this.isValid()) return e != null ? this : NaN;
        if (e != null) {
          if (typeof e == "string") {
            if (e = rn(hr, e), e === null) return this;
          } else Math.abs(e) < 16 && !d && (e = e * 60);
          return !this._isUTC && n && (h = Dr(this)), this._offset = e, this._isUTC = true, h != null && this.add(h, "m"), m !== e && (!n || this._changeInProgress ? Ml(this, fe(e - m, "m"), 1, false) : this._changeInProgress || (this._changeInProgress = true, l.updateOffset(this, true), this._changeInProgress = null)), this;
        } else return this._isUTC ? m : Dr(this);
      }
      function gu(e, n) {
        return e != null ? (typeof e != "string" && (e = -e), this.utcOffset(e, n), this) : -this.utcOffset();
      }
      function hu(e) {
        return this.utcOffset(0, e);
      }
      function fu(e) {
        return this._isUTC && (this.utcOffset(0, e), this._isUTC = false, e && this.subtract(Dr(this), "m")), this;
      }
      function _u() {
        if (this._tzm != null) this.utcOffset(this._tzm, false, true);
        else if (typeof this._i == "string") {
          var e = rn(Dm, this._i);
          e != null ? this.utcOffset(e) : this.utcOffset(0, true);
        }
        return this;
      }
      function la(e) {
        return this.isValid() ? (e = e ? Ae(e).utcOffset() : 0, (this.utcOffset() - e) % 60 === 0) : false;
      }
      function Y() {
        return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
      }
      function A() {
        if (!w(this._isDSTShifted)) return this._isDSTShifted;
        var e = {}, n;
        return B(e, this), e = _t(e), e._a ? (n = e._isUTC ? q(e._a) : Ae(e._a), this._isDSTShifted = this.isValid() && mu(e._a, n.toArray()) > 0) : this._isDSTShifted = false, this._isDSTShifted;
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
      var Te = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/, Qe = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
      function fe(e, n) {
        var d = e, m = null, h, k, S;
        return ns(e) ? d = { ms: e._milliseconds, d: e._days, M: e._months } : D(e) || !isNaN(+e) ? (d = {}, n ? d[n] = +e : d.milliseconds = +e) : (m = Te.exec(e)) ? (h = m[1] === "-" ? -1 : 1, d = { y: 0, d: _e(m[gs]) * h, h: _e(m[Ze]) * h, m: _e(m[ts]) * h, s: _e(m[Es]) * h, ms: _e(oa(m[tn] * 1e3)) * h }) : (m = Qe.exec(e)) ? (h = m[1] === "-" ? -1 : 1, d = { y: Ps(m[2], h), M: Ps(m[3], h), w: Ps(m[4], h), d: Ps(m[5], h), h: Ps(m[6], h), m: Ps(m[7], h), s: Ps(m[8], h) }) : d == null ? d = {} : typeof d == "object" && ("from" in d || "to" in d) && (S = Bt(Ae(d.from), Ae(d.to)), d = {}, d.ms = S.milliseconds, d.M = S.months), k = new ja(d), ns(e) && p(e, "_locale") && (k._locale = e._locale), ns(e) && p(e, "_isValid") && (k._isValid = e._isValid), k;
      }
      fe.fn = ja.prototype, fe.invalid = Ci;
      function Ps(e, n) {
        var d = e && parseFloat(e.replace(",", "."));
        return (isNaN(d) ? 0 : d) * n;
      }
      function wl(e, n) {
        var d = {};
        return d.months = n.month() - e.month() + (n.year() - e.year()) * 12, e.clone().add(d.months, "M").isAfter(n) && --d.months, d.milliseconds = +n - +e.clone().add(d.months, "M"), d;
      }
      function Bt(e, n) {
        var d;
        return e.isValid() && n.isValid() ? (n = bt(n, e), e.isBefore(n) ? d = wl(e, n) : (d = wl(n, e), d.milliseconds = -d.milliseconds, d.months = -d.months), d) : { milliseconds: 0, months: 0 };
      }
      function qa(e, n) {
        return function(d, m) {
          var h, k;
          return m !== null && !isNaN(+m) && (Ot(n, "moment()." + n + "(period, number) is deprecated. Please use moment()." + n + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."), k = d, d = m, m = k), h = fe(d, m), Ml(this, h, e), this;
        };
      }
      function Ml(e, n, d, m) {
        var h = n._milliseconds, k = oa(n._days), S = oa(n._months);
        e.isValid() && (m = m ?? true, S && vr(e, sn(e, "Month") + S * d), k && Ro(e, "Date", sn(e, "Date") + k * d), h && e._d.setTime(e._d.valueOf() + h * d), m && l.updateOffset(e, k || S));
      }
      var da = qa(1, "add"), Yr = qa(-1, "subtract");
      function Ia(e) {
        return typeof e == "string" || e instanceof String;
      }
      function De(e) {
        return he(e) || b(e) || Ia(e) || D(e) || Ll(e) || pu(e) || e === null || e === void 0;
      }
      function pu(e) {
        var n = f(e) && !L(e), d = false, m = ["years", "year", "y", "months", "month", "M", "days", "day", "d", "dates", "date", "D", "hours", "hour", "h", "minutes", "minute", "m", "seconds", "second", "s", "milliseconds", "millisecond", "ms"], h, k, S = m.length;
        for (h = 0; h < S; h += 1) k = m[h], d = d || p(e, k);
        return n && d;
      }
      function Ll(e) {
        var n = g(e), d = false;
        return n && (d = e.filter(function(m) {
          return !D(m) && Ia(e);
        }).length === 0), n && d;
      }
      function Cr(e) {
        var n = f(e) && !L(e), d = false, m = ["sameDay", "nextDay", "lastDay", "nextWeek", "lastWeek", "sameElse"], h, k;
        for (h = 0; h < m.length; h += 1) k = m[h], d = d || p(e, k);
        return n && d;
      }
      function yu(e, n) {
        var d = e.diff(n, "days", true);
        return d < -6 ? "sameElse" : d < -1 ? "lastWeek" : d < 0 ? "lastDay" : d < 1 ? "sameDay" : d < 2 ? "nextDay" : d < 7 ? "nextWeek" : "sameElse";
      }
      function vu(e, n) {
        arguments.length === 1 && (arguments[0] ? De(arguments[0]) ? (e = arguments[0], n = void 0) : Cr(arguments[0]) && (n = arguments[0], e = void 0) : (e = void 0, n = void 0));
        var d = e || Ae(), m = bt(d, this).startOf("day"), h = l.calendarFormat(this, m) || "sameElse", k = n && (Re(n[h]) ? n[h].call(this, d) : n[h]);
        return this.format(k || this.localeData().calendar(h, this, Ae(d)));
      }
      function wu() {
        return new V(this);
      }
      function br(e, n) {
        var d = he(e) ? e : Ae(e);
        return this.isValid() && d.isValid() ? (n = Oe(n) || "millisecond", n === "millisecond" ? this.valueOf() > d.valueOf() : d.valueOf() < this.clone().startOf(n).valueOf()) : false;
      }
      function on(e, n) {
        var d = he(e) ? e : Ae(e);
        return this.isValid() && d.isValid() ? (n = Oe(n) || "millisecond", n === "millisecond" ? this.valueOf() < d.valueOf() : this.clone().endOf(n).valueOf() < d.valueOf()) : false;
      }
      function Sr(e, n, d, m) {
        var h = he(e) ? e : Ae(e), k = he(n) ? n : Ae(n);
        return this.isValid() && h.isValid() && k.isValid() ? (m = m || "()", (m[0] === "(" ? this.isAfter(h, d) : !this.isBefore(h, d)) && (m[1] === ")" ? this.isBefore(k, d) : !this.isAfter(k, d))) : false;
      }
      function kl(e, n) {
        var d = he(e) ? e : Ae(e), m;
        return this.isValid() && d.isValid() ? (n = Oe(n) || "millisecond", n === "millisecond" ? this.valueOf() === d.valueOf() : (m = d.valueOf(), this.clone().startOf(n).valueOf() <= m && m <= this.clone().endOf(n).valueOf())) : false;
      }
      function Fr(e, n) {
        return this.isSame(e, n) || this.isAfter(e, n);
      }
      function Tl(e, n) {
        return this.isSame(e, n) || this.isBefore(e, n);
      }
      function Dl(e, n, d) {
        var m, h, k;
        if (!this.isValid()) return NaN;
        if (m = bt(e, this), !m.isValid()) return NaN;
        switch (h = (m.utcOffset() - this.utcOffset()) * 6e4, n = Oe(n), n) {
          case "year":
            k = Yn(this, m) / 12;
            break;
          case "month":
            k = Yn(this, m);
            break;
          case "quarter":
            k = Yn(this, m) / 3;
            break;
          case "second":
            k = (this - m) / 1e3;
            break;
          case "minute":
            k = (this - m) / 6e4;
            break;
          case "hour":
            k = (this - m) / 36e5;
            break;
          case "day":
            k = (this - m - h) / 864e5;
            break;
          case "week":
            k = (this - m - h) / 6048e5;
            break;
          default:
            k = this - m;
        }
        return d ? k : zt(k);
      }
      function Yn(e, n) {
        if (e.date() < n.date()) return -Yn(n, e);
        var d = (n.year() - e.year()) * 12 + (n.month() - e.month()), m = e.clone().add(d, "months"), h, k;
        return n - m < 0 ? (h = e.clone().add(d - 1, "months"), k = (n - m) / (m - h)) : (h = e.clone().add(d + 1, "months"), k = (n - m) / (h - m)), -(d + k) || 0;
      }
      l.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ", l.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
      function Yl() {
        return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
      }
      function Ra(e) {
        if (!this.isValid()) return null;
        var n = e !== true, d = n ? this.clone().utc() : this;
        return d.year() < 0 || d.year() > 9999 ? Qs(d, n ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ") : Re(Date.prototype.toISOString) ? n ? this.toDate().toISOString() : new Date(this.valueOf() + this.utcOffset() * 60 * 1e3).toISOString().replace("Z", Qs(d, "Z")) : Qs(d, n ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ");
      }
      function Cn() {
        if (!this.isValid()) return "moment.invalid(/* " + this._i + " */)";
        var e = "moment", n = "", d, m, h, k;
        return this.isLocal() || (e = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone", n = "Z"), d = "[" + e + '("]', m = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY", h = "-MM-DD[T]HH:mm:ss.SSS", k = n + '[")]', this.format(d + m + h + k);
      }
      function xr(e) {
        e || (e = this.isUtc() ? l.defaultFormatUtc : l.defaultFormat);
        var n = Qs(this, e);
        return this.localeData().postformat(n);
      }
      function Mu(e, n) {
        return this.isValid() && (he(e) && e.isValid() || Ae(e).isValid()) ? fe({ to: this, from: e }).locale(this.locale()).humanize(!n) : this.localeData().invalidDate();
      }
      function Lu(e) {
        return this.from(Ae(), e);
      }
      function ku(e, n) {
        return this.isValid() && (he(e) && e.isValid() || Ae(e).isValid()) ? fe({ from: this, to: e }).locale(this.locale()).humanize(!n) : this.localeData().invalidDate();
      }
      function Nr(e) {
        return this.to(Ae(), e);
      }
      function Oa(e) {
        var n;
        return e === void 0 ? this._locale._abbr : (n = Ge(e), n != null && (this._locale = n), this);
      }
      var Ar = ke("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(e) {
        return e === void 0 ? this.localeData() : this.locale(e);
      });
      function Cl() {
        return this._locale;
      }
      var Ua = 1e3, ma = 60 * Ua, Er = 60 * ma, Ve = (365 * 400 + 97) * 24 * Er;
      function Be(e, n) {
        return (e % n + n) % n;
      }
      function bl(e, n, d) {
        return e < 100 && e >= 0 ? new Date(e + 400, n, d) - Ve : new Date(e, n, d).valueOf();
      }
      function Sl(e, n, d) {
        return e < 100 && e >= 0 ? Date.UTC(e + 400, n, d) - Ve : Date.UTC(e, n, d);
      }
      function Fl(e) {
        var n, d;
        if (e = Oe(e), e === void 0 || e === "millisecond" || !this.isValid()) return this;
        switch (d = this._isUTC ? Sl : bl, e) {
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
            n = this._d.valueOf(), n -= Be(n + (this._isUTC ? 0 : this.utcOffset() * ma), Er);
            break;
          case "minute":
            n = this._d.valueOf(), n -= Be(n, ma);
            break;
          case "second":
            n = this._d.valueOf(), n -= Be(n, Ua);
            break;
        }
        return this._d.setTime(n), l.updateOffset(this, true), this;
      }
      function Tu(e) {
        var n, d;
        if (e = Oe(e), e === void 0 || e === "millisecond" || !this.isValid()) return this;
        switch (d = this._isUTC ? Sl : bl, e) {
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
            n = this._d.valueOf(), n += Er - Be(n + (this._isUTC ? 0 : this.utcOffset() * ma), Er) - 1;
            break;
          case "minute":
            n = this._d.valueOf(), n += ma - Be(n, ma) - 1;
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
      function Si() {
        return new Date(this.valueOf());
      }
      function ua() {
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
      function Hr() {
        return X(this);
      }
      function ca() {
        return N({}, x(this));
      }
      function Du() {
        return x(this).overflow;
      }
      function Yu() {
        return { input: this._i, format: this._f, locale: this._locale, isUTC: this._isUTC, strict: this._strict };
      }
      J("N", 0, 0, "eraAbbr"), J("NN", 0, 0, "eraAbbr"), J("NNN", 0, 0, "eraAbbr"), J("NNNN", 0, 0, "eraName"), J("NNNNN", 0, 0, "eraNarrow"), J("y", ["y", 1], "yo", "eraYear"), J("y", ["yy", 2], 0, "eraYear"), J("y", ["yyy", 3], 0, "eraYear"), J("y", ["yyyy", 4], 0, "eraYear"), $("N", ue), $("NN", ue), $("NNN", ue), $("NNNN", Fu), $("NNNNN", xu), Ce(["N", "NN", "NNN", "NNNN", "NNNNN"], function(e, n, d, m) {
        var h = d._locale.erasParse(e, m, d._strict);
        h ? x(d).era = h : x(d).invalidEra = e;
      }), $("y", en), $("yy", en), $("yyy", en), $("yyyy", en), $("yo", Nu), Ce(["y", "yy", "yyy", "yyyy"], it), Ce(["yo"], function(e, n, d, m) {
        var h;
        d._locale._eraYearOrdinalRegex && (h = e.match(d._locale._eraYearOrdinalRegex)), d._locale.eraYearOrdinalParse ? n[it] = d._locale.eraYearOrdinalParse(e, h) : n[it] = parseInt(e, 10);
      });
      function Cu(e, n) {
        var d, m, h, k = this._eras || Ge("en")._eras;
        for (d = 0, m = k.length; d < m; ++d) {
          switch (typeof k[d].since) {
            case "string":
              h = l(k[d].since).startOf("day"), k[d].since = h.valueOf();
              break;
          }
          switch (typeof k[d].until) {
            case "undefined":
              k[d].until = 1 / 0;
              break;
            case "string":
              h = l(k[d].until).startOf("day").valueOf(), k[d].until = h.valueOf();
              break;
          }
        }
        return k;
      }
      function bu(e, n, d) {
        var m, h, k = this.eras(), S, W, ie;
        for (e = e.toUpperCase(), m = 0, h = k.length; m < h; ++m) if (S = k[m].name.toUpperCase(), W = k[m].abbr.toUpperCase(), ie = k[m].narrow.toUpperCase(), d) switch (n) {
          case "N":
          case "NN":
          case "NNN":
            if (W === e) return k[m];
            break;
          case "NNNN":
            if (S === e) return k[m];
            break;
          case "NNNNN":
            if (ie === e) return k[m];
            break;
        }
        else if ([S, W, ie].indexOf(e) >= 0) return k[m];
      }
      function Su(e, n) {
        var d = e.since <= e.until ? 1 : -1;
        return n === void 0 ? l(e.since).year() : l(e.since).year() + (n - e.offset) * d;
      }
      function Pr() {
        var e, n, d, m = this.localeData().eras();
        for (e = 0, n = m.length; e < n; ++e) if (d = this.clone().startOf("day").valueOf(), m[e].since <= d && d <= m[e].until || m[e].until <= d && d <= m[e].since) return m[e].name;
        return "";
      }
      function $a() {
        var e, n, d, m = this.localeData().eras();
        for (e = 0, n = m.length; e < n; ++e) if (d = this.clone().startOf("day").valueOf(), m[e].since <= d && d <= m[e].until || m[e].until <= d && d <= m[e].since) return m[e].narrow;
        return "";
      }
      function xl() {
        var e, n, d, m = this.localeData().eras();
        for (e = 0, n = m.length; e < n; ++e) if (d = this.clone().startOf("day").valueOf(), m[e].since <= d && d <= m[e].until || m[e].until <= d && d <= m[e].since) return m[e].abbr;
        return "";
      }
      function y() {
        var e, n, d, m, h = this.localeData().eras();
        for (e = 0, n = h.length; e < n; ++e) if (d = h[e].since <= h[e].until ? 1 : -1, m = this.clone().startOf("day").valueOf(), h[e].since <= m && m <= h[e].until || h[e].until <= m && m <= h[e].since) return (this.year() - l(h[e].since).year()) * d + h[e].offset;
        return this.year();
      }
      function ga(e) {
        return p(this, "_erasNameRegex") || js.call(this), e ? this._erasNameRegex : this._erasRegex;
      }
      function jr(e) {
        return p(this, "_erasAbbrRegex") || js.call(this), e ? this._erasAbbrRegex : this._erasRegex;
      }
      function Wt(e) {
        return p(this, "_erasNarrowRegex") || js.call(this), e ? this._erasNarrowRegex : this._erasRegex;
      }
      function ue(e, n) {
        return n.erasAbbrRegex(e);
      }
      function Fu(e, n) {
        return n.erasNameRegex(e);
      }
      function xu(e, n) {
        return n.erasNarrowRegex(e);
      }
      function Nu(e, n) {
        return n._eraYearOrdinalRegex || en;
      }
      function js() {
        var e = [], n = [], d = [], m = [], h, k, S, W, ie, ye = this.eras();
        for (h = 0, k = ye.length; h < k; ++h) S = Ns(ye[h].name), W = Ns(ye[h].abbr), ie = Ns(ye[h].narrow), n.push(S), e.push(W), d.push(ie), m.push(S), m.push(W), m.push(ie);
        this._erasRegex = new RegExp("^(" + m.join("|") + ")", "i"), this._erasNameRegex = new RegExp("^(" + n.join("|") + ")", "i"), this._erasAbbrRegex = new RegExp("^(" + e.join("|") + ")", "i"), this._erasNarrowRegex = new RegExp("^(" + d.join("|") + ")", "i");
      }
      J(0, ["gg", 2], 0, function() {
        return this.weekYear() % 100;
      }), J(0, ["GG", 2], 0, function() {
        return this.isoWeekYear() % 100;
      });
      function qr(e, n) {
        J(0, [e, e.length], 0, n);
      }
      qr("gggg", "weekYear"), qr("ggggg", "weekYear"), qr("GGGG", "isoWeekYear"), qr("GGGGG", "isoWeekYear"), $("G", Qn), $("g", Qn), $("GG", Fe, Ct), $("gg", Fe, Ct), $("GGGG", Na, Xs), $("gggg", Na, Xs), $("GGGGG", Zn, Jn), $("ggggg", Zn, Jn), kn(["gggg", "ggggg", "GGGG", "GGGGG"], function(e, n, d, m) {
        n[m.substr(0, 2)] = _e(e);
      }), kn(["gg", "GG"], function(e, n, d, m) {
        n[m] = l.parseTwoDigitYear(e);
      });
      function Au(e) {
        return Nl.call(this, e, this.week(), this.weekday() + this.localeData()._week.dow, this.localeData()._week.dow, this.localeData()._week.doy);
      }
      function Eu(e) {
        return Nl.call(this, e, this.isoWeek(), this.isoWeekday(), 1, 4);
      }
      function Hu() {
        return ss(this.year(), 1, 4);
      }
      function Pu() {
        return ss(this.isoWeekYear(), 1, 4);
      }
      function qs() {
        var e = this.localeData()._week;
        return ss(this.year(), e.dow, e.doy);
      }
      function ju() {
        var e = this.localeData()._week;
        return ss(this.weekYear(), e.dow, e.doy);
      }
      function Nl(e, n, d, m, h) {
        var k;
        return e == null ? na(this, m, h).year : (k = ss(e, m, h), n > k && (n = k), qu.call(this, e, n, d, m, h));
      }
      function qu(e, n, d, m, h) {
        var k = Zo(e, n, d, m, h), S = ta(k.year, 0, k.dayOfYear);
        return this.year(S.getUTCFullYear()), this.month(S.getUTCMonth()), this.date(S.getUTCDate()), this;
      }
      J("Q", 0, "Qo", "quarter"), $("Q", Gn), Ce("Q", function(e, n) {
        n[As] = (_e(e) - 1) * 3;
      });
      function Iu(e) {
        return e == null ? Math.ceil((this.month() + 1) / 3) : this.month((e - 1) * 3 + this.month() % 3);
      }
      J("D", ["DD", 2], "Do", "date"), $("D", Fe, Ln), $("DD", Fe, Ct), $("Do", function(e, n) {
        return e ? n._dayOfMonthOrdinalParse || n._ordinalParse : n._dayOfMonthOrdinalParseLenient;
      }), Ce(["D", "DD"], gs), Ce("Do", function(e, n) {
        n[gs] = _e(e.match(Fe)[0]);
      });
      var Al = ea("Date", true);
      J("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), $("DDD", Kn), $("DDDD", Vn), Ce(["DDD", "DDDD"], function(e, n, d) {
        d._dayOfYear = _e(e);
      });
      function Is(e) {
        var n = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
        return e == null ? n : this.add(e - n, "d");
      }
      J("m", ["mm", 2], 0, "minute"), $("m", Fe, ui), $("mm", Fe, Ct), Ce(["m", "mm"], ts);
      var Ru = ea("Minutes", false);
      J("s", ["ss", 2], 0, "second"), $("s", Fe, ui), $("ss", Fe, Ct), Ce(["s", "ss"], Es);
      var Ou = ea("Seconds", false);
      J("S", 0, 0, function() {
        return ~~(this.millisecond() / 100);
      }), J(0, ["SS", 2], 0, function() {
        return ~~(this.millisecond() / 10);
      }), J(0, ["SSS", 3], 0, "millisecond"), J(0, ["SSSS", 4], 0, function() {
        return this.millisecond() * 10;
      }), J(0, ["SSSSS", 5], 0, function() {
        return this.millisecond() * 100;
      }), J(0, ["SSSSSS", 6], 0, function() {
        return this.millisecond() * 1e3;
      }), J(0, ["SSSSSSS", 7], 0, function() {
        return this.millisecond() * 1e4;
      }), J(0, ["SSSSSSSS", 8], 0, function() {
        return this.millisecond() * 1e5;
      }), J(0, ["SSSSSSSSS", 9], 0, function() {
        return this.millisecond() * 1e6;
      }), $("S", Kn, Gn), $("SS", Kn, Ct), $("SSS", Kn, Vn);
      var ln, El;
      for (ln = "SSSS"; ln.length <= 9; ln += "S") $(ln, en);
      function Uu(e, n) {
        n[tn] = _e(("0." + e) * 1e3);
      }
      for (ln = "S"; ln.length <= 9; ln += "S") Ce(ln, Uu);
      El = ea("Milliseconds", false), J("z", 0, 0, "zoneAbbr"), J("zz", 0, 0, "zoneName");
      function bn() {
        return this._isUTC ? "UTC" : "";
      }
      function zu() {
        return this._isUTC ? "Coordinated Universal Time" : "";
      }
      var U = V.prototype;
      U.add = da, U.calendar = vu, U.clone = wu, U.diff = Dl, U.endOf = Tu, U.format = xr, U.from = Mu, U.fromNow = Lu, U.to = ku, U.toNow = Nr, U.get = pr, U.invalidAt = Du, U.isAfter = br, U.isBefore = on, U.isBetween = Sr, U.isSame = kl, U.isSameOrAfter = Fr, U.isSameOrBefore = Tl, U.isValid = Hr, U.lang = Ar, U.locale = Oa, U.localeData = Cl, U.max = au, U.min = pl, U.parsingFlags = ca, U.set = Nm, U.startOf = Fl, U.subtract = Yr, U.toArray = ua, U.toObject = Ba, U.toDate = Si, U.toISOString = Ra, U.inspect = Cn, typeof Symbol < "u" && Symbol.for != null && (U[Symbol.for("nodejs.util.inspect.custom")] = function() {
        return "Moment<" + this.format() + ">";
      }), U.toJSON = Wa, U.toString = Yl, U.unix = za, U.valueOf = bi, U.creationData = Yu, U.eraName = Pr, U.eraNarrow = $a, U.eraAbbr = xl, U.eraYear = y, U.year = Io, U.isLeapYear = xm, U.weekYear = Au, U.isoWeekYear = Eu, U.quarter = U.quarters = Iu, U.month = $o, U.daysInMonth = Go, U.week = U.weeks = jm, U.isoWeek = U.isoWeeks = el, U.weeksInYear = qs, U.weeksInWeekYear = ju, U.isoWeeksInYear = Hu, U.isoWeeksInISOWeekYear = Pu, U.date = Al, U.day = U.days = $m, U.weekday = Gm, U.isoWeekday = Vm, U.dayOfYear = Is, U.hour = U.hours = tt, U.minute = U.minutes = Ru, U.second = U.seconds = Ou, U.millisecond = U.milliseconds = El, U.utcOffset = cu, U.utc = hu, U.local = fu, U.parseZone = _u, U.hasAlignedHourOffset = la, U.isDST = Y, U.isLocal = F, U.isUtcOffset = G, U.isUtc = oe, U.isUTC = oe, U.zoneAbbr = bn, U.zoneName = zu, U.dates = ke("dates accessor is deprecated. Use date instead.", Al), U.months = ke("months accessor is deprecated. Use month instead", $o), U.years = ke("years accessor is deprecated. Use year instead", Io), U.zone = ke("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", gu), U.isDSTShifted = ke("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", A);
      function as(e) {
        return Ae(e * 1e3);
      }
      function Bu() {
        return Ae.apply(null, arguments).parseZone();
      }
      function Hl(e) {
        return e;
      }
      var Le = Fa.prototype;
      Le.calendar = vm, Le.longDateFormat = dr, Le.invalidDate = Po, Le.ordinal = Lm, Le.preparse = Hl, Le.postformat = Hl, Le.relativeTime = jo, Le.pastFuture = km, Le.set = zn, Le.eras = Cu, Le.erasParse = bu, Le.erasConvertYear = Su, Le.erasAbbrRegex = jr, Le.erasNameRegex = ga, Le.erasNarrowRegex = Wt, Le.months = Pm, Le.monthsShort = zo, Le.monthsParse = Wo, Le.monthsRegex = Vo, Le.monthsShortRegex = wr, Le.week = gi, Le.firstDayOfYear = Xo, Le.firstDayOfWeek = Qo, Le.weekdays = Um, Le.weekdaysMin = hi, Le.weekdaysShort = zm, Le.weekdaysParse = Wm, Le.weekdaysRegex = He, Le.weekdaysShortRegex = Ne, Le.weekdaysMinRegex = Jm, Le.isPM = ol, Le.meridiem = pi;
      function Ir(e, n, d, m) {
        var h = Ge(), k = q().set(m, n);
        return h[d](k, e);
      }
      function Pl(e, n, d) {
        if (D(e) && (n = e, e = void 0), e = e || "", n != null) return Ir(e, n, d, "month");
        var m, h = [];
        for (m = 0; m < 12; m++) h[m] = Ir(e, m, d, "month");
        return h;
      }
      function Rr(e, n, d, m) {
        typeof e == "boolean" ? (D(n) && (d = n, n = void 0), n = n || "") : (n = e, d = n, e = false, D(n) && (d = n, n = void 0), n = n || "");
        var h = Ge(), k = e ? h._week.dow : 0, S, W = [];
        if (d != null) return Ir(n, (d + k) % 7, m, "day");
        for (S = 0; S < 7; S++) W[S] = Ir(n, (S + k) % 7, m, "day");
        return W;
      }
      function jl(e, n) {
        return Pl(e, n, "months");
      }
      function Wu(e, n) {
        return Pl(e, n, "monthsShort");
      }
      function $u(e, n, d) {
        return Rr(e, n, d, "weekdays");
      }
      function Fi(e, n, d) {
        return Rr(e, n, d, "weekdaysShort");
      }
      function Ga(e, n, d) {
        return Rr(e, n, d, "weekdaysMin");
      }
      Hs("en", { eras: [{ since: "0001-01-01", until: 1 / 0, offset: 1, name: "Anno Domini", narrow: "AD", abbr: "AD" }, { since: "0000-12-31", until: -1 / 0, offset: 1, name: "Before Christ", narrow: "BC", abbr: "BC" }], dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/, ordinal: function(e) {
        var n = e % 10, d = _e(e % 100 / 10) === 1 ? "th" : n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th";
        return e + d;
      } }), l.lang = ke("moment.lang is deprecated. Use moment.locale instead.", Hs), l.langData = ke("moment.langData is deprecated. Use moment.localeData instead.", Ge);
      var $t = Math.abs;
      function Gu() {
        var e = this._data;
        return this._milliseconds = $t(this._milliseconds), this._days = $t(this._days), this._months = $t(this._months), e.milliseconds = $t(e.milliseconds), e.seconds = $t(e.seconds), e.minutes = $t(e.minutes), e.hours = $t(e.hours), e.months = $t(e.months), e.years = $t(e.years), this;
      }
      function xi(e, n, d, m) {
        var h = fe(n, d);
        return e._milliseconds += m * h._milliseconds, e._days += m * h._days, e._months += m * h._months, e._bubble();
      }
      function Vu(e, n) {
        return xi(this, e, n, 1);
      }
      function Rs(e, n) {
        return xi(this, e, n, -1);
      }
      function Or(e) {
        return e < 0 ? Math.floor(e) : Math.ceil(e);
      }
      function Sn() {
        var e = this._milliseconds, n = this._days, d = this._months, m = this._data, h, k, S, W, ie;
        return e >= 0 && n >= 0 && d >= 0 || e <= 0 && n <= 0 && d <= 0 || (e += Or(Ni(d) + n) * 864e5, n = 0, d = 0), m.milliseconds = e % 1e3, h = zt(e / 1e3), m.seconds = h % 60, k = zt(h / 60), m.minutes = k % 60, S = zt(k / 60), m.hours = S % 24, n += zt(S / 24), ie = zt(St(n)), d += ie, n -= Or(Ni(ie)), W = zt(d / 12), d %= 12, m.days = n, m.months = d, m.years = W, this;
      }
      function St(e) {
        return e * 4800 / 146097;
      }
      function Ni(e) {
        return e * 146097 / 4800;
      }
      function ql(e) {
        if (!this.isValid()) return NaN;
        var n, d, m = this._milliseconds;
        if (e = Oe(e), e === "month" || e === "quarter" || e === "year") switch (n = this._days + m / 864e5, d = this._months + St(n), e) {
          case "month":
            return d;
          case "quarter":
            return d / 3;
          case "year":
            return d / 12;
        }
        else switch (n = this._days + Math.round(Ni(this._months)), e) {
          case "week":
            return n / 7 + m / 6048e5;
          case "day":
            return n + m / 864e5;
          case "hour":
            return n * 24 + m / 36e5;
          case "minute":
            return n * 1440 + m / 6e4;
          case "second":
            return n * 86400 + m / 1e3;
          case "millisecond":
            return Math.floor(n * 864e5) + m;
          default:
            throw new Error("Unknown unit " + e);
        }
      }
      function _s(e) {
        return function() {
          return this.as(e);
        };
      }
      var ha = _s("ms"), dn = _s("s"), Il = _s("m"), Ju = _s("h"), Ur = _s("d"), Ku = _s("w"), Rl = _s("M"), st = _s("Q"), Ai = _s("y"), Ol = ha;
      function ps() {
        return fe(this);
      }
      function Ei(e) {
        return e = Oe(e), this.isValid() ? this[e + "s"]() : NaN;
      }
      function ys(e) {
        return function() {
          return this.isValid() ? this._data[e] : NaN;
        };
      }
      var Fn = ys("milliseconds"), Ul = ys("seconds"), ut = ys("minutes"), Hi = ys("hours"), Zu = ys("days"), Qu = ys("months"), Xu = ys("years");
      function Pi() {
        return zt(this.days() / 7);
      }
      var Os = Math.round, vs = { ss: 44, s: 45, m: 45, h: 22, d: 26, w: null, M: 11 };
      function zl(e, n, d, m, h) {
        return h.relativeTime(n || 1, !!d, e, m);
      }
      function ec(e, n, d, m) {
        var h = fe(e).abs(), k = Os(h.as("s")), S = Os(h.as("m")), W = Os(h.as("h")), ie = Os(h.as("d")), ye = Os(h.as("M")), nt = Os(h.as("w")), Ds = Os(h.as("y")), _n = k <= d.ss && ["s", k] || k < d.s && ["ss", k] || S <= 1 && ["m"] || S < d.m && ["mm", S] || W <= 1 && ["h"] || W < d.h && ["hh", W] || ie <= 1 && ["d"] || ie < d.d && ["dd", ie];
        return d.w != null && (_n = _n || nt <= 1 && ["w"] || nt < d.w && ["ww", nt]), _n = _n || ye <= 1 && ["M"] || ye < d.M && ["MM", ye] || Ds <= 1 && ["y"] || ["yy", Ds], _n[2] = n, _n[3] = +e > 0, _n[4] = m, zl.apply(null, _n);
      }
      function tc(e) {
        return e === void 0 ? Os : typeof e == "function" ? (Os = e, true) : false;
      }
      function Va(e, n) {
        return vs[e] === void 0 ? false : n === void 0 ? vs[e] : (vs[e] = n, e === "s" && (vs.ss = n - 1), true);
      }
      function sc(e, n) {
        if (!this.isValid()) return this.localeData().invalidDate();
        var d = false, m = vs, h, k;
        return typeof e == "object" && (n = e, e = false), typeof e == "boolean" && (d = e), typeof n == "object" && (m = Object.assign({}, vs, n), n.s != null && n.ss == null && (m.ss = n.s - 1)), h = this.localeData(), k = ec(this, !d, m, h), d && (k = h.pastFuture(+this, k)), h.postformat(k);
      }
      var ji = Math.abs;
      function mn(e) {
        return (e > 0) - (e < 0) || +e;
      }
      function Ja() {
        if (!this.isValid()) return this.localeData().invalidDate();
        var e = ji(this._milliseconds) / 1e3, n = ji(this._days), d = ji(this._months), m, h, k, S, W = this.asSeconds(), ie, ye, nt, Ds;
        return W ? (m = zt(e / 60), h = zt(m / 60), e %= 60, m %= 60, k = zt(d / 12), d %= 12, S = e ? e.toFixed(3).replace(/\.?0+$/, "") : "", ie = W < 0 ? "-" : "", ye = mn(this._months) !== mn(W) ? "-" : "", nt = mn(this._days) !== mn(W) ? "-" : "", Ds = mn(this._milliseconds) !== mn(W) ? "-" : "", ie + "P" + (k ? ye + k + "Y" : "") + (d ? ye + d + "M" : "") + (n ? nt + n + "D" : "") + (h || m || e ? "T" : "") + (h ? Ds + h + "H" : "") + (m ? Ds + m + "M" : "") + (e ? Ds + S + "S" : "")) : "P0D";
      }
      var we = ja.prototype;
      we.isValid = du, we.abs = Gu, we.add = Vu, we.subtract = Rs, we.as = ql, we.asMilliseconds = ha, we.asSeconds = dn, we.asMinutes = Il, we.asHours = Ju, we.asDays = Ur, we.asWeeks = Ku, we.asMonths = Rl, we.asQuarters = st, we.asYears = Ai, we.valueOf = Ol, we._bubble = Sn, we.clone = ps, we.get = Ei, we.milliseconds = Fn, we.seconds = Ul, we.minutes = ut, we.hours = Hi, we.days = Zu, we.weeks = Pi, we.months = Qu, we.years = Xu, we.humanize = sc, we.toISOString = Ja, we.toString = Ja, we.toJSON = Ja, we.locale = Oa, we.localeData = Cl, we.toIsoString = ke("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", Ja), we.lang = Ar, J("X", 0, 0, "unix"), J("x", 0, 0, "valueOf"), $("x", Qn), $("X", Ym), Ce("X", function(e, n, d) {
        d._d = new Date(parseFloat(e) * 1e3);
      }), Ce("x", function(e, n, d) {
        d._d = new Date(_e(e));
      });
      l.version = "2.30.1", u(Ae), l.fn = U, l.min = ru, l.max = iu, l.now = ou, l.utc = q, l.unix = as, l.months = jl, l.isDate = b, l.locale = Hs, l.invalid = se, l.duration = fe, l.isMoment = he, l.weekdays = $u, l.parseZone = Bu, l.localeData = Ge, l.isDuration = ns, l.monthsShort = Wu, l.weekdaysMin = Ga, l.defineLocale = mt, l.updateLocale = Qm, l.locales = Xm, l.weekdaysShort = Fi, l.normalizeUnits = Oe, l.relativeTimeRounding = tc, l.relativeTimeThreshold = Va, l.calendarFormat = yu, l.prototype = U, l.HTML5_FMT = { DATETIME_LOCAL: "YYYY-MM-DDTHH:mm", DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss", DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS", DATE: "YYYY-MM-DD", TIME: "HH:mm", TIME_SECONDS: "HH:mm:ss", TIME_MS: "HH:mm:ss.SSS", WEEK: "GGGG-[W]WW", MONTH: "YYYY-MM" };
      l.defineLocale("af", { months: "Januarie_Februarie_Maart_April_Mei_Junie_Julie_Augustus_September_Oktober_November_Desember".split("_"), monthsShort: "Jan_Feb_Mrt_Apr_Mei_Jun_Jul_Aug_Sep_Okt_Nov_Des".split("_"), weekdays: "Sondag_Maandag_Dinsdag_Woensdag_Donderdag_Vrydag_Saterdag".split("_"), weekdaysShort: "Son_Maa_Din_Woe_Don_Vry_Sat".split("_"), weekdaysMin: "So_Ma_Di_Wo_Do_Vr_Sa".split("_"), meridiemParse: /vm|nm/i, isPM: function(e) {
        return /^nm$/i.test(e);
      }, meridiem: function(e, n, d) {
        return e < 12 ? d ? "vm" : "VM" : d ? "nm" : "NM";
      }, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[Vandag om] LT", nextDay: "[Môre om] LT", nextWeek: "dddd [om] LT", lastDay: "[Gister om] LT", lastWeek: "[Laas] dddd [om] LT", sameElse: "L" }, relativeTime: { future: "oor %s", past: "%s gelede", s: "'n paar sekondes", ss: "%d sekondes", m: "'n minuut", mm: "%d minute", h: "'n uur", hh: "%d ure", d: "'n dag", dd: "%d dae", M: "'n maand", MM: "%d maande", y: "'n jaar", yy: "%d jaar" }, dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/, ordinal: function(e) {
        return e + (e === 1 || e === 8 || e >= 20 ? "ste" : "de");
      }, week: { dow: 1, doy: 4 } });
      var Bl = function(e) {
        return e === 0 ? 0 : e === 1 ? 1 : e === 2 ? 2 : e % 100 >= 3 && e % 100 <= 10 ? 3 : e % 100 >= 11 ? 4 : 5;
      }, nc = { s: ["أقل من ثانية", "ثانية واحدة", ["ثانيتان", "ثانيتين"], "%d ثوان", "%d ثانية", "%d ثانية"], m: ["أقل من دقيقة", "دقيقة واحدة", ["دقيقتان", "دقيقتين"], "%d دقائق", "%d دقيقة", "%d دقيقة"], h: ["أقل من ساعة", "ساعة واحدة", ["ساعتان", "ساعتين"], "%d ساعات", "%d ساعة", "%d ساعة"], d: ["أقل من يوم", "يوم واحد", ["يومان", "يومين"], "%d أيام", "%d يومًا", "%d يوم"], M: ["أقل من شهر", "شهر واحد", ["شهران", "شهرين"], "%d أشهر", "%d شهرا", "%d شهر"], y: ["أقل من عام", "عام واحد", ["عامان", "عامين"], "%d أعوام", "%d عامًا", "%d عام"] }, Ft = function(e) {
        return function(n, d, m, h) {
          var k = Bl(n), S = nc[e][Bl(n)];
          return k === 2 && (S = S[d ? 0 : 1]), S.replace(/%d/i, n);
        };
      }, zr = ["جانفي", "فيفري", "مارس", "أفريل", "ماي", "جوان", "جويلية", "أوت", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
      l.defineLocale("ar-dz", { months: zr, monthsShort: zr, weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"), weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"), weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "D/‏M/‏YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, meridiemParse: /ص|م/, isPM: function(e) {
        return e === "م";
      }, meridiem: function(e, n, d) {
        return e < 12 ? "ص" : "م";
      }, calendar: { sameDay: "[اليوم عند الساعة] LT", nextDay: "[غدًا عند الساعة] LT", nextWeek: "dddd [عند الساعة] LT", lastDay: "[أمس عند الساعة] LT", lastWeek: "dddd [عند الساعة] LT", sameElse: "L" }, relativeTime: { future: "بعد %s", past: "منذ %s", s: Ft("s"), ss: Ft("s"), m: Ft("m"), mm: Ft("m"), h: Ft("h"), hh: Ft("h"), d: Ft("d"), dd: Ft("d"), M: Ft("M"), MM: Ft("M"), y: Ft("y"), yy: Ft("y") }, postformat: function(e) {
        return e.replace(/,/g, "،");
      }, week: { dow: 0, doy: 4 } });
      l.defineLocale("ar-kw", { months: "يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"), monthsShort: "يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"), weekdays: "الأحد_الإتنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"), weekdaysShort: "احد_اتنين_ثلاثاء_اربعاء_خميس_جمعة_سبت".split("_"), weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, calendar: { sameDay: "[اليوم على الساعة] LT", nextDay: "[غدا على الساعة] LT", nextWeek: "dddd [على الساعة] LT", lastDay: "[أمس على الساعة] LT", lastWeek: "dddd [على الساعة] LT", sameElse: "L" }, relativeTime: { future: "في %s", past: "منذ %s", s: "ثوان", ss: "%d ثانية", m: "دقيقة", mm: "%d دقائق", h: "ساعة", hh: "%d ساعات", d: "يوم", dd: "%d أيام", M: "شهر", MM: "%d أشهر", y: "سنة", yy: "%d سنوات" }, week: { dow: 0, doy: 12 } });
      var ac = { 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9", 0: "0" }, Br = function(e) {
        return e === 0 ? 0 : e === 1 ? 1 : e === 2 ? 2 : e % 100 >= 3 && e % 100 <= 10 ? 3 : e % 100 >= 11 ? 4 : 5;
      }, Wl = { s: ["أقل من ثانية", "ثانية واحدة", ["ثانيتان", "ثانيتين"], "%d ثوان", "%d ثانية", "%d ثانية"], m: ["أقل من دقيقة", "دقيقة واحدة", ["دقيقتان", "دقيقتين"], "%d دقائق", "%d دقيقة", "%d دقيقة"], h: ["أقل من ساعة", "ساعة واحدة", ["ساعتان", "ساعتين"], "%d ساعات", "%d ساعة", "%d ساعة"], d: ["أقل من يوم", "يوم واحد", ["يومان", "يومين"], "%d أيام", "%d يومًا", "%d يوم"], M: ["أقل من شهر", "شهر واحد", ["شهران", "شهرين"], "%d أشهر", "%d شهرا", "%d شهر"], y: ["أقل من عام", "عام واحد", ["عامان", "عامين"], "%d أعوام", "%d عامًا", "%d عام"] }, xt = function(e) {
        return function(n, d, m, h) {
          var k = Br(n), S = Wl[e][Br(n)];
          return k === 2 && (S = S[d ? 0 : 1]), S.replace(/%d/i, n);
        };
      }, qi = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
      l.defineLocale("ar-ly", { months: qi, monthsShort: qi, weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"), weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"), weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "D/‏M/‏YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, meridiemParse: /ص|م/, isPM: function(e) {
        return e === "م";
      }, meridiem: function(e, n, d) {
        return e < 12 ? "ص" : "م";
      }, calendar: { sameDay: "[اليوم عند الساعة] LT", nextDay: "[غدًا عند الساعة] LT", nextWeek: "dddd [عند الساعة] LT", lastDay: "[أمس عند الساعة] LT", lastWeek: "dddd [عند الساعة] LT", sameElse: "L" }, relativeTime: { future: "بعد %s", past: "منذ %s", s: xt("s"), ss: xt("s"), m: xt("m"), mm: xt("m"), h: xt("h"), hh: xt("h"), d: xt("d"), dd: xt("d"), M: xt("M"), MM: xt("M"), y: xt("y"), yy: xt("y") }, preparse: function(e) {
        return e.replace(/،/g, ",");
      }, postformat: function(e) {
        return e.replace(/\d/g, function(n) {
          return ac[n];
        }).replace(/,/g, "،");
      }, week: { dow: 6, doy: 12 } });
      l.defineLocale("ar-ma", { months: "يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"), monthsShort: "يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"), weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"), weekdaysShort: "احد_اثنين_ثلاثاء_اربعاء_خميس_جمعة_سبت".split("_"), weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, calendar: { sameDay: "[اليوم على الساعة] LT", nextDay: "[غدا على الساعة] LT", nextWeek: "dddd [على الساعة] LT", lastDay: "[أمس على الساعة] LT", lastWeek: "dddd [على الساعة] LT", sameElse: "L" }, relativeTime: { future: "في %s", past: "منذ %s", s: "ثوان", ss: "%d ثانية", m: "دقيقة", mm: "%d دقائق", h: "ساعة", hh: "%d ساعات", d: "يوم", dd: "%d أيام", M: "شهر", MM: "%d أشهر", y: "سنة", yy: "%d سنوات" }, week: { dow: 1, doy: 4 } });
      var Wr = { 1: "١", 2: "٢", 3: "٣", 4: "٤", 5: "٥", 6: "٦", 7: "٧", 8: "٨", 9: "٩", 0: "٠" }, $l = { "١": "1", "٢": "2", "٣": "3", "٤": "4", "٥": "5", "٦": "6", "٧": "7", "٨": "8", "٩": "9", "٠": "0" };
      l.defineLocale("ar-ps", { months: "كانون الثاني_شباط_آذار_نيسان_أيّار_حزيران_تمّوز_آب_أيلول_تشري الأوّل_تشرين الثاني_كانون الأوّل".split("_"), monthsShort: "ك٢_شباط_آذار_نيسان_أيّار_حزيران_تمّوز_آب_أيلول_ت١_ت٢_ك١".split("_"), weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"), weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"), weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, meridiemParse: /ص|م/, isPM: function(e) {
        return e === "م";
      }, meridiem: function(e, n, d) {
        return e < 12 ? "ص" : "م";
      }, calendar: { sameDay: "[اليوم على الساعة] LT", nextDay: "[غدا على الساعة] LT", nextWeek: "dddd [على الساعة] LT", lastDay: "[أمس على الساعة] LT", lastWeek: "dddd [على الساعة] LT", sameElse: "L" }, relativeTime: { future: "في %s", past: "منذ %s", s: "ثوان", ss: "%d ثانية", m: "دقيقة", mm: "%d دقائق", h: "ساعة", hh: "%d ساعات", d: "يوم", dd: "%d أيام", M: "شهر", MM: "%d أشهر", y: "سنة", yy: "%d سنوات" }, preparse: function(e) {
        return e.replace(/[٣٤٥٦٧٨٩٠]/g, function(n) {
          return $l[n];
        }).split("").reverse().join("").replace(/[١٢](?![\u062a\u0643])/g, function(n) {
          return $l[n];
        }).split("").reverse().join("").replace(/،/g, ",");
      }, postformat: function(e) {
        return e.replace(/\d/g, function(n) {
          return Wr[n];
        }).replace(/,/g, "،");
      }, week: { dow: 0, doy: 6 } });
      var Gl = { 1: "١", 2: "٢", 3: "٣", 4: "٤", 5: "٥", 6: "٦", 7: "٧", 8: "٨", 9: "٩", 0: "٠" }, Vl = { "١": "1", "٢": "2", "٣": "3", "٤": "4", "٥": "5", "٦": "6", "٧": "7", "٨": "8", "٩": "9", "٠": "0" };
      l.defineLocale("ar-sa", { months: "يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"), monthsShort: "يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"), weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"), weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"), weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, meridiemParse: /ص|م/, isPM: function(e) {
        return e === "م";
      }, meridiem: function(e, n, d) {
        return e < 12 ? "ص" : "م";
      }, calendar: { sameDay: "[اليوم على الساعة] LT", nextDay: "[غدا على الساعة] LT", nextWeek: "dddd [على الساعة] LT", lastDay: "[أمس على الساعة] LT", lastWeek: "dddd [على الساعة] LT", sameElse: "L" }, relativeTime: { future: "في %s", past: "منذ %s", s: "ثوان", ss: "%d ثانية", m: "دقيقة", mm: "%d دقائق", h: "ساعة", hh: "%d ساعات", d: "يوم", dd: "%d أيام", M: "شهر", MM: "%d أشهر", y: "سنة", yy: "%d سنوات" }, preparse: function(e) {
        return e.replace(/[١٢٣٤٥٦٧٨٩٠]/g, function(n) {
          return Vl[n];
        }).replace(/،/g, ",");
      }, postformat: function(e) {
        return e.replace(/\d/g, function(n) {
          return Gl[n];
        }).replace(/,/g, "،");
      }, week: { dow: 0, doy: 6 } });
      l.defineLocale("ar-tn", { months: "جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"), monthsShort: "جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"), weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"), weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"), weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, calendar: { sameDay: "[اليوم على الساعة] LT", nextDay: "[غدا على الساعة] LT", nextWeek: "dddd [على الساعة] LT", lastDay: "[أمس على الساعة] LT", lastWeek: "dddd [على الساعة] LT", sameElse: "L" }, relativeTime: { future: "في %s", past: "منذ %s", s: "ثوان", ss: "%d ثانية", m: "دقيقة", mm: "%d دقائق", h: "ساعة", hh: "%d ساعات", d: "يوم", dd: "%d أيام", M: "شهر", MM: "%d أشهر", y: "سنة", yy: "%d سنوات" }, week: { dow: 1, doy: 4 } });
      var rc = { 1: "١", 2: "٢", 3: "٣", 4: "٤", 5: "٥", 6: "٦", 7: "٧", 8: "٨", 9: "٩", 0: "٠" }, Jl = { "١": "1", "٢": "2", "٣": "3", "٤": "4", "٥": "5", "٦": "6", "٧": "7", "٨": "8", "٩": "9", "٠": "0" }, Kl = function(e) {
        return e === 0 ? 0 : e === 1 ? 1 : e === 2 ? 2 : e % 100 >= 3 && e % 100 <= 10 ? 3 : e % 100 >= 11 ? 4 : 5;
      }, Ii = { s: ["أقل من ثانية", "ثانية واحدة", ["ثانيتان", "ثانيتين"], "%d ثوان", "%d ثانية", "%d ثانية"], m: ["أقل من دقيقة", "دقيقة واحدة", ["دقيقتان", "دقيقتين"], "%d دقائق", "%d دقيقة", "%d دقيقة"], h: ["أقل من ساعة", "ساعة واحدة", ["ساعتان", "ساعتين"], "%d ساعات", "%d ساعة", "%d ساعة"], d: ["أقل من يوم", "يوم واحد", ["يومان", "يومين"], "%d أيام", "%d يومًا", "%d يوم"], M: ["أقل من شهر", "شهر واحد", ["شهران", "شهرين"], "%d أشهر", "%d شهرا", "%d شهر"], y: ["أقل من عام", "عام واحد", ["عامان", "عامين"], "%d أعوام", "%d عامًا", "%d عام"] }, Nt = function(e) {
        return function(n, d, m, h) {
          var k = Kl(n), S = Ii[e][Kl(n)];
          return k === 2 && (S = S[d ? 0 : 1]), S.replace(/%d/i, n);
        };
      }, $r = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
      l.defineLocale("ar", { months: $r, monthsShort: $r, weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"), weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"), weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "D/‏M/‏YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, meridiemParse: /ص|م/, isPM: function(e) {
        return e === "م";
      }, meridiem: function(e, n, d) {
        return e < 12 ? "ص" : "م";
      }, calendar: { sameDay: "[اليوم عند الساعة] LT", nextDay: "[غدًا عند الساعة] LT", nextWeek: "dddd [عند الساعة] LT", lastDay: "[أمس عند الساعة] LT", lastWeek: "dddd [عند الساعة] LT", sameElse: "L" }, relativeTime: { future: "بعد %s", past: "منذ %s", s: Nt("s"), ss: Nt("s"), m: Nt("m"), mm: Nt("m"), h: Nt("h"), hh: Nt("h"), d: Nt("d"), dd: Nt("d"), M: Nt("M"), MM: Nt("M"), y: Nt("y"), yy: Nt("y") }, preparse: function(e) {
        return e.replace(/[١٢٣٤٥٦٧٨٩٠]/g, function(n) {
          return Jl[n];
        }).replace(/،/g, ",");
      }, postformat: function(e) {
        return e.replace(/\d/g, function(n) {
          return rc[n];
        }).replace(/,/g, "،");
      }, week: { dow: 6, doy: 12 } });
      var Ri = { 1: "-inci", 5: "-inci", 8: "-inci", 70: "-inci", 80: "-inci", 2: "-nci", 7: "-nci", 20: "-nci", 50: "-nci", 3: "-üncü", 4: "-üncü", 100: "-üncü", 6: "-ncı", 9: "-uncu", 10: "-uncu", 30: "-uncu", 60: "-ıncı", 90: "-ıncı" };
      l.defineLocale("az", { months: "yanvar_fevral_mart_aprel_may_iyun_iyul_avqust_sentyabr_oktyabr_noyabr_dekabr".split("_"), monthsShort: "yan_fev_mar_apr_may_iyn_iyl_avq_sen_okt_noy_dek".split("_"), weekdays: "Bazar_Bazar ertəsi_Çərşənbə axşamı_Çərşənbə_Cümə axşamı_Cümə_Şənbə".split("_"), weekdaysShort: "Baz_BzE_ÇAx_Çər_CAx_Cüm_Şən".split("_"), weekdaysMin: "Bz_BE_ÇA_Çə_CA_Cü_Şə".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[bugün saat] LT", nextDay: "[sabah saat] LT", nextWeek: "[gələn həftə] dddd [saat] LT", lastDay: "[dünən] LT", lastWeek: "[keçən həftə] dddd [saat] LT", sameElse: "L" }, relativeTime: { future: "%s sonra", past: "%s əvvəl", s: "bir neçə saniyə", ss: "%d saniyə", m: "bir dəqiqə", mm: "%d dəqiqə", h: "bir saat", hh: "%d saat", d: "bir gün", dd: "%d gün", M: "bir ay", MM: "%d ay", y: "bir il", yy: "%d il" }, meridiemParse: /gecə|səhər|gündüz|axşam/, isPM: function(e) {
        return /^(gündüz|axşam)$/.test(e);
      }, meridiem: function(e, n, d) {
        return e < 4 ? "gecə" : e < 12 ? "səhər" : e < 17 ? "gündüz" : "axşam";
      }, dayOfMonthOrdinalParse: /\d{1,2}-(ıncı|inci|nci|üncü|ncı|uncu)/, ordinal: function(e) {
        if (e === 0) return e + "-ıncı";
        var n = e % 10, d = e % 100 - n, m = e >= 100 ? 100 : null;
        return e + (Ri[n] || Ri[d] || Ri[m]);
      }, week: { dow: 1, doy: 7 } });
      function Oi(e, n) {
        var d = e.split("_");
        return n % 10 === 1 && n % 100 !== 11 ? d[0] : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? d[1] : d[2];
      }
      function le(e, n, d) {
        var m = { ss: n ? "секунда_секунды_секунд" : "секунду_секунды_секунд", mm: n ? "хвіліна_хвіліны_хвілін" : "хвіліну_хвіліны_хвілін", hh: n ? "гадзіна_гадзіны_гадзін" : "гадзіну_гадзіны_гадзін", dd: "дзень_дні_дзён", MM: "месяц_месяцы_месяцаў", yy: "год_гады_гадоў" };
        return d === "m" ? n ? "хвіліна" : "хвіліну" : d === "h" ? n ? "гадзіна" : "гадзіну" : e + " " + Oi(m[d], +e);
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
      var ic = { 1: "১", 2: "২", 3: "৩", 4: "৪", 5: "৫", 6: "৬", 7: "৭", 8: "৮", 9: "৯", 0: "০" }, oc = { "১": "1", "২": "2", "৩": "3", "৪": "4", "৫": "5", "৬": "6", "৭": "7", "৮": "8", "৯": "9", "০": "0" };
      l.defineLocale("bn-bd", { months: "জানুয়ারি_ফেব্রুয়ারি_মার্চ_এপ্রিল_মে_জুন_জুলাই_আগস্ট_সেপ্টেম্বর_অক্টোবর_নভেম্বর_ডিসেম্বর".split("_"), monthsShort: "জানু_ফেব্রু_মার্চ_এপ্রিল_মে_জুন_জুলাই_আগস্ট_সেপ্ট_অক্টো_নভে_ডিসে".split("_"), weekdays: "রবিবার_সোমবার_মঙ্গলবার_বুধবার_বৃহস্পতিবার_শুক্রবার_শনিবার".split("_"), weekdaysShort: "রবি_সোম_মঙ্গল_বুধ_বৃহস্পতি_শুক্র_শনি".split("_"), weekdaysMin: "রবি_সোম_মঙ্গল_বুধ_বৃহ_শুক্র_শনি".split("_"), longDateFormat: { LT: "A h:mm সময়", LTS: "A h:mm:ss সময়", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, A h:mm সময়", LLLL: "dddd, D MMMM YYYY, A h:mm সময়" }, calendar: { sameDay: "[আজ] LT", nextDay: "[আগামীকাল] LT", nextWeek: "dddd, LT", lastDay: "[গতকাল] LT", lastWeek: "[গত] dddd, LT", sameElse: "L" }, relativeTime: { future: "%s পরে", past: "%s আগে", s: "কয়েক সেকেন্ড", ss: "%d সেকেন্ড", m: "এক মিনিট", mm: "%d মিনিট", h: "এক ঘন্টা", hh: "%d ঘন্টা", d: "এক দিন", dd: "%d দিন", M: "এক মাস", MM: "%d মাস", y: "এক বছর", yy: "%d বছর" }, preparse: function(e) {
        return e.replace(/[১২৩৪৫৬৭৮৯০]/g, function(n) {
          return oc[n];
        });
      }, postformat: function(e) {
        return e.replace(/\d/g, function(n) {
          return ic[n];
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
      var Ka = { 1: "১", 2: "২", 3: "৩", 4: "৪", 5: "৫", 6: "৬", 7: "৭", 8: "৮", 9: "৯", 0: "০" }, Zl = { "১": "1", "২": "2", "৩": "3", "৪": "4", "৫": "5", "৬": "6", "৭": "7", "৮": "8", "৯": "9", "০": "0" };
      l.defineLocale("bn", { months: "জানুয়ারি_ফেব্রুয়ারি_মার্চ_এপ্রিল_মে_জুন_জুলাই_আগস্ট_সেপ্টেম্বর_অক্টোবর_নভেম্বর_ডিসেম্বর".split("_"), monthsShort: "জানু_ফেব্রু_মার্চ_এপ্রিল_মে_জুন_জুলাই_আগস্ট_সেপ্ট_অক্টো_নভে_ডিসে".split("_"), weekdays: "রবিবার_সোমবার_মঙ্গলবার_বুধবার_বৃহস্পতিবার_শুক্রবার_শনিবার".split("_"), weekdaysShort: "রবি_সোম_মঙ্গল_বুধ_বৃহস্পতি_শুক্র_শনি".split("_"), weekdaysMin: "রবি_সোম_মঙ্গল_বুধ_বৃহ_শুক্র_শনি".split("_"), longDateFormat: { LT: "A h:mm সময়", LTS: "A h:mm:ss সময়", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, A h:mm সময়", LLLL: "dddd, D MMMM YYYY, A h:mm সময়" }, calendar: { sameDay: "[আজ] LT", nextDay: "[আগামীকাল] LT", nextWeek: "dddd, LT", lastDay: "[গতকাল] LT", lastWeek: "[গত] dddd, LT", sameElse: "L" }, relativeTime: { future: "%s পরে", past: "%s আগে", s: "কয়েক সেকেন্ড", ss: "%d সেকেন্ড", m: "এক মিনিট", mm: "%d মিনিট", h: "এক ঘন্টা", hh: "%d ঘন্টা", d: "এক দিন", dd: "%d দিন", M: "এক মাস", MM: "%d মাস", y: "এক বছর", yy: "%d বছর" }, preparse: function(e) {
        return e.replace(/[১২৩৪৫৬৭৮৯০]/g, function(n) {
          return Zl[n];
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
      var lc = { 1: "༡", 2: "༢", 3: "༣", 4: "༤", 5: "༥", 6: "༦", 7: "༧", 8: "༨", 9: "༩", 0: "༠" }, dc = { "༡": "1", "༢": "2", "༣": "3", "༤": "4", "༥": "5", "༦": "6", "༧": "7", "༨": "8", "༩": "9", "༠": "0" };
      l.defineLocale("bo", { months: "ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ".split("_"), monthsShort: "ཟླ་1_ཟླ་2_ཟླ་3_ཟླ་4_ཟླ་5_ཟླ་6_ཟླ་7_ཟླ་8_ཟླ་9_ཟླ་10_ཟླ་11_ཟླ་12".split("_"), monthsShortRegex: /^(ཟླ་\d{1,2})/, monthsParseExact: true, weekdays: "གཟའ་ཉི་མ་_གཟའ་ཟླ་བ་_གཟའ་མིག་དམར་_གཟའ་ལྷག་པ་_གཟའ་ཕུར་བུ_གཟའ་པ་སངས་_གཟའ་སྤེན་པ་".split("_"), weekdaysShort: "ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་".split("_"), weekdaysMin: "ཉི_ཟླ_མིག_ལྷག_ཕུར_སངས_སྤེན".split("_"), longDateFormat: { LT: "A h:mm", LTS: "A h:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, A h:mm", LLLL: "dddd, D MMMM YYYY, A h:mm" }, calendar: { sameDay: "[དི་རིང] LT", nextDay: "[སང་ཉིན] LT", nextWeek: "[བདུན་ཕྲག་རྗེས་མ], LT", lastDay: "[ཁ་སང] LT", lastWeek: "[བདུན་ཕྲག་མཐའ་མ] dddd, LT", sameElse: "L" }, relativeTime: { future: "%s ལ་", past: "%s སྔན་ལ", s: "ལམ་སང", ss: "%d སྐར་ཆ།", m: "སྐར་མ་གཅིག", mm: "%d སྐར་མ", h: "ཆུ་ཚོད་གཅིག", hh: "%d ཆུ་ཚོད", d: "ཉིན་གཅིག", dd: "%d ཉིན་", M: "ཟླ་བ་གཅིག", MM: "%d ཟླ་བ", y: "ལོ་གཅིག", yy: "%d ལོ" }, preparse: function(e) {
        return e.replace(/[༡༢༣༤༥༦༧༨༩༠]/g, function(n) {
          return dc[n];
        });
      }, postformat: function(e) {
        return e.replace(/\d/g, function(n) {
          return lc[n];
        });
      }, meridiemParse: /མཚན་མོ|ཞོགས་ཀས|ཉིན་གུང|དགོང་དག|མཚན་མོ/, meridiemHour: function(e, n) {
        return e === 12 && (e = 0), n === "མཚན་མོ" && e >= 4 || n === "ཉིན་གུང" && e < 5 || n === "དགོང་དག" ? e + 12 : e;
      }, meridiem: function(e, n, d) {
        return e < 4 ? "མཚན་མོ" : e < 10 ? "ཞོགས་ཀས" : e < 17 ? "ཉིན་གུང" : e < 20 ? "དགོང་དག" : "མཚན་མོ";
      }, week: { dow: 0, doy: 6 } });
      function pt(e, n, d) {
        var m = { mm: "munutenn", MM: "miz", dd: "devezh" };
        return e + " " + Ui(m[d], e);
      }
      function mc(e) {
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
      function Ui(e, n) {
        return n === 2 ? Ql(e) : e;
      }
      function Ql(e) {
        var n = { m: "v", b: "v", d: "z" };
        return n[e.charAt(0)] === void 0 ? e : n[e.charAt(0)] + e.substring(1);
      }
      var Gr = [/^gen/i, /^c[ʼ\']hwe/i, /^meu/i, /^ebr/i, /^mae/i, /^(mez|eve)/i, /^gou/i, /^eos/i, /^gwe/i, /^her/i, /^du/i, /^ker/i], yt = /^(genver|c[ʼ\']hwevrer|meurzh|ebrel|mae|mezheven|gouere|eost|gwengolo|here|du|kerzu|gen|c[ʼ\']hwe|meu|ebr|mae|eve|gou|eos|gwe|her|du|ker)/i, un = /^(genver|c[ʼ\']hwevrer|meurzh|ebrel|mae|mezheven|gouere|eost|gwengolo|here|du|kerzu)/i, zi = /^(gen|c[ʼ\']hwe|meu|ebr|mae|eve|gou|eos|gwe|her|du|ker)/i, Xl = [/^sul/i, /^lun/i, /^meurzh/i, /^merc[ʼ\']her/i, /^yaou/i, /^gwener/i, /^sadorn/i], Vr = [/^Sul/i, /^Lun/i, /^Meu/i, /^Mer/i, /^Yao/i, /^Gwe/i, /^Sad/i], Bi = [/^Su/i, /^Lu/i, /^Me([^r]|$)/i, /^Mer/i, /^Ya/i, /^Gw/i, /^Sa/i];
      l.defineLocale("br", { months: "Genver_Cʼhwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu".split("_"), monthsShort: "Gen_Cʼhwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker".split("_"), weekdays: "Sul_Lun_Meurzh_Mercʼher_Yaou_Gwener_Sadorn".split("_"), weekdaysShort: "Sul_Lun_Meu_Mer_Yao_Gwe_Sad".split("_"), weekdaysMin: "Su_Lu_Me_Mer_Ya_Gw_Sa".split("_"), weekdaysParse: Bi, fullWeekdaysParse: Xl, shortWeekdaysParse: Vr, minWeekdaysParse: Bi, monthsRegex: yt, monthsShortRegex: yt, monthsStrictRegex: un, monthsShortStrictRegex: zi, monthsParse: Gr, longMonthsParse: Gr, shortMonthsParse: Gr, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D [a viz] MMMM YYYY", LLL: "D [a viz] MMMM YYYY HH:mm", LLLL: "dddd, D [a viz] MMMM YYYY HH:mm" }, calendar: { sameDay: "[Hiziv da] LT", nextDay: "[Warcʼhoazh da] LT", nextWeek: "dddd [da] LT", lastDay: "[Decʼh da] LT", lastWeek: "dddd [paset da] LT", sameElse: "L" }, relativeTime: { future: "a-benn %s", past: "%s ʼzo", s: "un nebeud segondennoù", ss: "%d eilenn", m: "ur vunutenn", mm: pt, h: "un eur", hh: "%d eur", d: "un devezh", dd: pt, M: "ur miz", MM: pt, y: "ur bloaz", yy: mc }, dayOfMonthOrdinalParse: /\d{1,2}(añ|vet)/, ordinal: function(e) {
        var n = e === 1 ? "añ" : "vet";
        return e + n;
      }, week: { dow: 1, doy: 4 }, meridiemParse: /a.m.|g.m./, isPM: function(e) {
        return e === "g.m.";
      }, meridiem: function(e, n, d) {
        return e < 12 ? "a.m." : "g.m.";
      } });
      function Wi(e, n, d, m) {
        switch (d) {
          case "m":
            return n ? "jedna minuta" : m ? "jednu minutu" : "jedne minute";
        }
      }
      function cn(e, n, d) {
        var m = e + " ";
        switch (d) {
          case "ss":
            return e === 1 ? m += "sekunda" : e === 2 || e === 3 || e === 4 ? m += "sekunde" : m += "sekundi", m;
          case "mm":
            return e === 1 ? m += "minuta" : e === 2 || e === 3 || e === 4 ? m += "minute" : m += "minuta", m;
          case "h":
            return "jedan sat";
          case "hh":
            return e === 1 ? m += "sat" : e === 2 || e === 3 || e === 4 ? m += "sata" : m += "sati", m;
          case "dd":
            return e === 1 ? m += "dan" : m += "dana", m;
          case "MM":
            return e === 1 ? m += "mjesec" : e === 2 || e === 3 || e === 4 ? m += "mjeseca" : m += "mjeseci", m;
          case "yy":
            return e === 1 ? m += "godina" : e === 2 || e === 3 || e === 4 ? m += "godine" : m += "godina", m;
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
      }, sameElse: "L" }, relativeTime: { future: "za %s", past: "prije %s", s: "par sekundi", ss: cn, m: Wi, mm: cn, h: cn, hh: cn, d: "dan", dd: cn, M: "mjesec", MM: cn, y: "godinu", yy: cn }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 7 } });
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
      var $i = { standalone: "leden_únor_březen_duben_květen_červen_červenec_srpen_září_říjen_listopad_prosinec".split("_"), format: "ledna_února_března_dubna_května_června_července_srpna_září_října_listopadu_prosince".split("_"), isFormat: /DD?[o.]?(\[[^\[\]]*\]|\s)+MMMM/ }, Gi = "led_úno_bře_dub_kvě_čvn_čvc_srp_zář_říj_lis_pro".split("_"), ws = [/^led/i, /^úno/i, /^bře/i, /^dub/i, /^kvě/i, /^(čvn|červen$|června)/i, /^(čvc|červenec|července)/i, /^srp/i, /^zář/i, /^říj/i, /^lis/i, /^pro/i], ed = /^(leden|únor|březen|duben|květen|červenec|července|červen|června|srpen|září|říjen|listopad|prosinec|led|úno|bře|dub|kvě|čvn|čvc|srp|zář|říj|lis|pro)/i;
      function At(e) {
        return e > 1 && e < 5 && ~~(e / 10) !== 1;
      }
      function Et(e, n, d, m) {
        var h = e + " ";
        switch (d) {
          case "s":
            return n || m ? "pár sekund" : "pár sekundami";
          case "ss":
            return n || m ? h + (At(e) ? "sekundy" : "sekund") : h + "sekundami";
          case "m":
            return n ? "minuta" : m ? "minutu" : "minutou";
          case "mm":
            return n || m ? h + (At(e) ? "minuty" : "minut") : h + "minutami";
          case "h":
            return n ? "hodina" : m ? "hodinu" : "hodinou";
          case "hh":
            return n || m ? h + (At(e) ? "hodiny" : "hodin") : h + "hodinami";
          case "d":
            return n || m ? "den" : "dnem";
          case "dd":
            return n || m ? h + (At(e) ? "dny" : "dní") : h + "dny";
          case "M":
            return n || m ? "měsíc" : "měsícem";
          case "MM":
            return n || m ? h + (At(e) ? "měsíce" : "měsíců") : h + "měsíci";
          case "y":
            return n || m ? "rok" : "rokem";
          case "yy":
            return n || m ? h + (At(e) ? "roky" : "let") : h + "lety";
        }
      }
      l.defineLocale("cs", { months: $i, monthsShort: Gi, monthsRegex: ed, monthsShortRegex: ed, monthsStrictRegex: /^(leden|ledna|února|únor|březen|března|duben|dubna|květen|května|červenec|července|červen|června|srpen|srpna|září|říjen|října|listopadu|listopad|prosinec|prosince)/i, monthsShortStrictRegex: /^(led|úno|bře|dub|kvě|čvn|čvc|srp|zář|říj|lis|pro)/i, monthsParse: ws, longMonthsParse: ws, shortMonthsParse: ws, weekdays: "neděle_pondělí_úterý_středa_čtvrtek_pátek_sobota".split("_"), weekdaysShort: "ne_po_út_st_čt_pá_so".split("_"), weekdaysMin: "ne_po_út_st_čt_pá_so".split("_"), longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY H:mm", LLLL: "dddd D. MMMM YYYY H:mm", l: "D. M. YYYY" }, calendar: { sameDay: "[dnes v] LT", nextDay: "[zítra v] LT", nextWeek: function() {
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
        var n = e, d = "", m = ["", "af", "il", "ydd", "ydd", "ed", "ed", "ed", "fed", "fed", "fed", "eg", "fed", "eg", "eg", "fed", "eg", "eg", "fed", "eg", "fed"];
        return n > 20 ? n === 40 || n === 50 || n === 60 || n === 80 || n === 100 ? d = "fed" : d = "ain" : n > 0 && (d = m[n]), e + d;
      }, week: { dow: 1, doy: 4 } });
      l.defineLocale("da", { months: "januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december".split("_"), monthsShort: "jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"), weekdays: "søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"), weekdaysShort: "søn_man_tir_ons_tor_fre_lør".split("_"), weekdaysMin: "sø_ma_ti_on_to_fr_lø".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY HH:mm", LLLL: "dddd [d.] D. MMMM YYYY [kl.] HH:mm" }, calendar: { sameDay: "[i dag kl.] LT", nextDay: "[i morgen kl.] LT", nextWeek: "på dddd [kl.] LT", lastDay: "[i går kl.] LT", lastWeek: "[i] dddd[s kl.] LT", sameElse: "L" }, relativeTime: { future: "om %s", past: "%s siden", s: "få sekunder", ss: "%d sekunder", m: "et minut", mm: "%d minutter", h: "en time", hh: "%d timer", d: "en dag", dd: "%d dage", M: "en måned", MM: "%d måneder", y: "et år", yy: "%d år" }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } });
      function Ms(e, n, d, m) {
        var h = { m: ["eine Minute", "einer Minute"], h: ["eine Stunde", "einer Stunde"], d: ["ein Tag", "einem Tag"], dd: [e + " Tage", e + " Tagen"], w: ["eine Woche", "einer Woche"], M: ["ein Monat", "einem Monat"], MM: [e + " Monate", e + " Monaten"], y: ["ein Jahr", "einem Jahr"], yy: [e + " Jahre", e + " Jahren"] };
        return n ? h[d][0] : h[d][1];
      }
      l.defineLocale("de-at", { months: "Jänner_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"), monthsShort: "Jän._Feb._März_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.".split("_"), monthsParseExact: true, weekdays: "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"), weekdaysShort: "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"), weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY HH:mm", LLLL: "dddd, D. MMMM YYYY HH:mm" }, calendar: { sameDay: "[heute um] LT [Uhr]", sameElse: "L", nextDay: "[morgen um] LT [Uhr]", nextWeek: "dddd [um] LT [Uhr]", lastDay: "[gestern um] LT [Uhr]", lastWeek: "[letzten] dddd [um] LT [Uhr]" }, relativeTime: { future: "in %s", past: "vor %s", s: "ein paar Sekunden", ss: "%d Sekunden", m: Ms, mm: "%d Minuten", h: Ms, hh: "%d Stunden", d: Ms, dd: Ms, w: Ms, ww: "%d Wochen", M: Ms, MM: Ms, y: Ms, yy: Ms }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } });
      function rs(e, n, d, m) {
        var h = { m: ["eine Minute", "einer Minute"], h: ["eine Stunde", "einer Stunde"], d: ["ein Tag", "einem Tag"], dd: [e + " Tage", e + " Tagen"], w: ["eine Woche", "einer Woche"], M: ["ein Monat", "einem Monat"], MM: [e + " Monate", e + " Monaten"], y: ["ein Jahr", "einem Jahr"], yy: [e + " Jahre", e + " Jahren"] };
        return n ? h[d][0] : h[d][1];
      }
      l.defineLocale("de-ch", { months: "Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"), monthsShort: "Jan._Feb._März_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.".split("_"), monthsParseExact: true, weekdays: "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"), weekdaysShort: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"), weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY HH:mm", LLLL: "dddd, D. MMMM YYYY HH:mm" }, calendar: { sameDay: "[heute um] LT [Uhr]", sameElse: "L", nextDay: "[morgen um] LT [Uhr]", nextWeek: "dddd [um] LT [Uhr]", lastDay: "[gestern um] LT [Uhr]", lastWeek: "[letzten] dddd [um] LT [Uhr]" }, relativeTime: { future: "in %s", past: "vor %s", s: "ein paar Sekunden", ss: "%d Sekunden", m: rs, mm: "%d Minuten", h: rs, hh: "%d Stunden", d: rs, dd: rs, w: rs, ww: "%d Wochen", M: rs, MM: rs, y: rs, yy: rs }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } });
      function Us(e, n, d, m) {
        var h = { m: ["eine Minute", "einer Minute"], h: ["eine Stunde", "einer Stunde"], d: ["ein Tag", "einem Tag"], dd: [e + " Tage", e + " Tagen"], w: ["eine Woche", "einer Woche"], M: ["ein Monat", "einem Monat"], MM: [e + " Monate", e + " Monaten"], y: ["ein Jahr", "einem Jahr"], yy: [e + " Jahre", e + " Jahren"] };
        return n ? h[d][0] : h[d][1];
      }
      l.defineLocale("de", { months: "Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"), monthsShort: "Jan._Feb._März_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.".split("_"), monthsParseExact: true, weekdays: "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"), weekdaysShort: "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"), weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY HH:mm", LLLL: "dddd, D. MMMM YYYY HH:mm" }, calendar: { sameDay: "[heute um] LT [Uhr]", sameElse: "L", nextDay: "[morgen um] LT [Uhr]", nextWeek: "dddd [um] LT [Uhr]", lastDay: "[gestern um] LT [Uhr]", lastWeek: "[letzten] dddd [um] LT [Uhr]" }, relativeTime: { future: "in %s", past: "vor %s", s: "ein paar Sekunden", ss: "%d Sekunden", m: Us, mm: "%d Minuten", h: Us, hh: "%d Stunden", d: Us, dd: Us, w: Us, ww: "%d Wochen", M: Us, MM: Us, y: Us, yy: Us }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } });
      var td = ["ޖެނުއަރީ", "ފެބްރުއަރީ", "މާރިޗު", "އޭޕްރީލު", "މޭ", "ޖޫން", "ޖުލައި", "އޯގަސްޓު", "ސެޕްޓެމްބަރު", "އޮކްޓޯބަރު", "ނޮވެމްބަރު", "ޑިސެމްބަރު"], sd = ["އާދިއްތަ", "ހޯމަ", "އަންގާރަ", "ބުދަ", "ބުރާސްފަތި", "ހުކުރު", "ހޮނިހިރު"];
      l.defineLocale("dv", { months: td, monthsShort: td, weekdays: sd, weekdaysShort: sd, weekdaysMin: "އާދި_ހޯމަ_އަން_ބުދަ_ބުރާ_ހުކު_ހޮނި".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "D/M/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, meridiemParse: /މކ|މފ/, isPM: function(e) {
        return e === "މފ";
      }, meridiem: function(e, n, d) {
        return e < 12 ? "މކ" : "މފ";
      }, calendar: { sameDay: "[މިއަދު] LT", nextDay: "[މާދަމާ] LT", nextWeek: "dddd LT", lastDay: "[އިއްޔެ] LT", lastWeek: "[ފާއިތުވި] dddd LT", sameElse: "L" }, relativeTime: { future: "ތެރޭގައި %s", past: "ކުރިން %s", s: "ސިކުންތުކޮޅެއް", ss: "d% ސިކުންތު", m: "މިނިޓެއް", mm: "މިނިޓު %d", h: "ގަޑިއިރެއް", hh: "ގަޑިއިރު %d", d: "ދުވަހެއް", dd: "ދުވަސް %d", M: "މަހެއް", MM: "މަސް %d", y: "އަހަރެއް", yy: "އަހަރު %d" }, preparse: function(e) {
        return e.replace(/،/g, ",");
      }, postformat: function(e) {
        return e.replace(/,/g, "،");
      }, week: { dow: 7, doy: 12 } });
      function nd(e) {
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
        var d = this._calendarEl[e], m = n && n.hours();
        return nd(d) && (d = d.apply(n)), d.replace("{}", m % 12 === 1 ? "στη" : "στις");
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
      var Vi = "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"), uc = "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"), Jr = [/^ene/i, /^feb/i, /^mar/i, /^abr/i, /^may/i, /^jun/i, /^jul/i, /^ago/i, /^sep/i, /^oct/i, /^nov/i, /^dic/i], Ji = /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i;
      l.defineLocale("es-do", { months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"), monthsShort: function(e, n) {
        return e ? /-MMM-/.test(n) ? uc[e.month()] : Vi[e.month()] : Vi;
      }, monthsRegex: Ji, monthsShortRegex: Ji, monthsStrictRegex: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i, monthsShortStrictRegex: /^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i, monthsParse: Jr, longMonthsParse: Jr, shortMonthsParse: Jr, weekdays: "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"), weekdaysShort: "dom._lun._mar._mié._jue._vie._sáb.".split("_"), weekdaysMin: "do_lu_ma_mi_ju_vi_sá".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "h:mm A", LTS: "h:mm:ss A", L: "DD/MM/YYYY", LL: "D [de] MMMM [de] YYYY", LLL: "D [de] MMMM [de] YYYY h:mm A", LLLL: "dddd, D [de] MMMM [de] YYYY h:mm A" }, calendar: { sameDay: function() {
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
      var ct = "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"), Ls = "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"), Ki = [/^ene/i, /^feb/i, /^mar/i, /^abr/i, /^may/i, /^jun/i, /^jul/i, /^ago/i, /^sep/i, /^oct/i, /^nov/i, /^dic/i], ad = /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i;
      l.defineLocale("es-mx", { months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"), monthsShort: function(e, n) {
        return e ? /-MMM-/.test(n) ? Ls[e.month()] : ct[e.month()] : ct;
      }, monthsRegex: ad, monthsShortRegex: ad, monthsStrictRegex: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i, monthsShortStrictRegex: /^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i, monthsParse: Ki, longMonthsParse: Ki, shortMonthsParse: Ki, weekdays: "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"), weekdaysShort: "dom._lun._mar._mié._jue._vie._sáb.".split("_"), weekdaysMin: "do_lu_ma_mi_ju_vi_sá".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "DD/MM/YYYY", LL: "D [de] MMMM [de] YYYY", LLL: "D [de] MMMM [de] YYYY H:mm", LLLL: "dddd, D [de] MMMM [de] YYYY H:mm" }, calendar: { sameDay: function() {
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
      var Qa = "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"), fa = "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"), Kr = [/^ene/i, /^feb/i, /^mar/i, /^abr/i, /^may/i, /^jun/i, /^jul/i, /^ago/i, /^sep/i, /^oct/i, /^nov/i, /^dic/i], Zi = /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i;
      l.defineLocale("es-us", { months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"), monthsShort: function(e, n) {
        return e ? /-MMM-/.test(n) ? fa[e.month()] : Qa[e.month()] : Qa;
      }, monthsRegex: Zi, monthsShortRegex: Zi, monthsStrictRegex: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i, monthsShortStrictRegex: /^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i, monthsParse: Kr, longMonthsParse: Kr, shortMonthsParse: Kr, weekdays: "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"), weekdaysShort: "dom._lun._mar._mié._jue._vie._sáb.".split("_"), weekdaysMin: "do_lu_ma_mi_ju_vi_sá".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "h:mm A", LTS: "h:mm:ss A", L: "MM/DD/YYYY", LL: "D [de] MMMM [de] YYYY", LLL: "D [de] MMMM [de] YYYY h:mm A", LLLL: "dddd, D [de] MMMM [de] YYYY h:mm A" }, calendar: { sameDay: function() {
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
      var rd = "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"), id = "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"), gn = [/^ene/i, /^feb/i, /^mar/i, /^abr/i, /^may/i, /^jun/i, /^jul/i, /^ago/i, /^sep/i, /^oct/i, /^nov/i, /^dic/i], _a = /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i;
      l.defineLocale("es", { months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"), monthsShort: function(e, n) {
        return e ? /-MMM-/.test(n) ? id[e.month()] : rd[e.month()] : rd;
      }, monthsRegex: _a, monthsShortRegex: _a, monthsStrictRegex: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i, monthsShortStrictRegex: /^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i, monthsParse: gn, longMonthsParse: gn, shortMonthsParse: gn, weekdays: "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"), weekdaysShort: "dom._lun._mar._mié._jue._vie._sáb.".split("_"), weekdaysMin: "do_lu_ma_mi_ju_vi_sá".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "DD/MM/YYYY", LL: "D [de] MMMM [de] YYYY", LLL: "D [de] MMMM [de] YYYY H:mm", LLLL: "dddd, D [de] MMMM [de] YYYY H:mm" }, calendar: { sameDay: function() {
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
      function is(e, n, d, m) {
        var h = { s: ["mõne sekundi", "mõni sekund", "paar sekundit"], ss: [e + "sekundi", e + "sekundit"], m: ["ühe minuti", "üks minut"], mm: [e + " minuti", e + " minutit"], h: ["ühe tunni", "tund aega", "üks tund"], hh: [e + " tunni", e + " tundi"], d: ["ühe päeva", "üks päev"], M: ["kuu aja", "kuu aega", "üks kuu"], MM: [e + " kuu", e + " kuud"], y: ["ühe aasta", "aasta", "üks aasta"], yy: [e + " aasta", e + " aastat"] };
        return n ? h[d][2] ? h[d][2] : h[d][1] : m ? h[d][0] : h[d][1];
      }
      l.defineLocale("et", { months: "jaanuar_veebruar_märts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember".split("_"), monthsShort: "jaan_veebr_märts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets".split("_"), weekdays: "pühapäev_esmaspäev_teisipäev_kolmapäev_neljapäev_reede_laupäev".split("_"), weekdaysShort: "P_E_T_K_N_R_L".split("_"), weekdaysMin: "P_E_T_K_N_R_L".split("_"), longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY H:mm", LLLL: "dddd, D. MMMM YYYY H:mm" }, calendar: { sameDay: "[Täna,] LT", nextDay: "[Homme,] LT", nextWeek: "[Järgmine] dddd LT", lastDay: "[Eile,] LT", lastWeek: "[Eelmine] dddd LT", sameElse: "L" }, relativeTime: { future: "%s pärast", past: "%s tagasi", s: is, ss: is, m: is, mm: is, h: is, hh: is, d: is, dd: "%d päeva", M: is, MM: is, y: is, yy: is }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } });
      l.defineLocale("eu", { months: "urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua".split("_"), monthsShort: "urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.".split("_"), monthsParseExact: true, weekdays: "igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata".split("_"), weekdaysShort: "ig._al._ar._az._og._ol._lr.".split("_"), weekdaysMin: "ig_al_ar_az_og_ol_lr".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY-MM-DD", LL: "YYYY[ko] MMMM[ren] D[a]", LLL: "YYYY[ko] MMMM[ren] D[a] HH:mm", LLLL: "dddd, YYYY[ko] MMMM[ren] D[a] HH:mm", l: "YYYY-M-D", ll: "YYYY[ko] MMM D[a]", lll: "YYYY[ko] MMM D[a] HH:mm", llll: "ddd, YYYY[ko] MMM D[a] HH:mm" }, calendar: { sameDay: "[gaur] LT[etan]", nextDay: "[bihar] LT[etan]", nextWeek: "dddd LT[etan]", lastDay: "[atzo] LT[etan]", lastWeek: "[aurreko] dddd LT[etan]", sameElse: "L" }, relativeTime: { future: "%s barru", past: "duela %s", s: "segundo batzuk", ss: "%d segundo", m: "minutu bat", mm: "%d minutu", h: "ordu bat", hh: "%d ordu", d: "egun bat", dd: "%d egun", M: "hilabete bat", MM: "%d hilabete", y: "urte bat", yy: "%d urte" }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 7 } });
      var od = { 1: "۱", 2: "۲", 3: "۳", 4: "۴", 5: "۵", 6: "۶", 7: "۷", 8: "۸", 9: "۹", 0: "۰" }, ld = { "۱": "1", "۲": "2", "۳": "3", "۴": "4", "۵": "5", "۶": "6", "۷": "7", "۸": "8", "۹": "9", "۰": "0" };
      l.defineLocale("fa", { months: "ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر".split("_"), monthsShort: "ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر".split("_"), weekdays: "یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه".split("_"), weekdaysShort: "یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه".split("_"), weekdaysMin: "ی_د_س_چ_پ_ج_ش".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, meridiemParse: /قبل از ظهر|بعد از ظهر/, isPM: function(e) {
        return /بعد از ظهر/.test(e);
      }, meridiem: function(e, n, d) {
        return e < 12 ? "قبل از ظهر" : "بعد از ظهر";
      }, calendar: { sameDay: "[امروز ساعت] LT", nextDay: "[فردا ساعت] LT", nextWeek: "dddd [ساعت] LT", lastDay: "[دیروز ساعت] LT", lastWeek: "dddd [پیش] [ساعت] LT", sameElse: "L" }, relativeTime: { future: "در %s", past: "%s پیش", s: "چند ثانیه", ss: "%d ثانیه", m: "یک دقیقه", mm: "%d دقیقه", h: "یک ساعت", hh: "%d ساعت", d: "یک روز", dd: "%d روز", M: "یک ماه", MM: "%d ماه", y: "یک سال", yy: "%d سال" }, preparse: function(e) {
        return e.replace(/[۰-۹]/g, function(n) {
          return ld[n];
        }).replace(/،/g, ",");
      }, postformat: function(e) {
        return e.replace(/\d/g, function(n) {
          return od[n];
        }).replace(/,/g, "،");
      }, dayOfMonthOrdinalParse: /\d{1,2}م/, ordinal: "%dم", week: { dow: 6, doy: 12 } });
      var xn = "nolla yksi kaksi kolme neljä viisi kuusi seitsemän kahdeksan yhdeksän".split(" "), dd = ["nolla", "yhden", "kahden", "kolmen", "neljän", "viiden", "kuuden", xn[7], xn[8], xn[9]];
      function gt(e, n, d, m) {
        var h = "";
        switch (d) {
          case "s":
            return m ? "muutaman sekunnin" : "muutama sekunti";
          case "ss":
            h = m ? "sekunnin" : "sekuntia";
            break;
          case "m":
            return m ? "minuutin" : "minuutti";
          case "mm":
            h = m ? "minuutin" : "minuuttia";
            break;
          case "h":
            return m ? "tunnin" : "tunti";
          case "hh":
            h = m ? "tunnin" : "tuntia";
            break;
          case "d":
            return m ? "päivän" : "päivä";
          case "dd":
            h = m ? "päivän" : "päivää";
            break;
          case "M":
            return m ? "kuukauden" : "kuukausi";
          case "MM":
            h = m ? "kuukauden" : "kuukautta";
            break;
          case "y":
            return m ? "vuoden" : "vuosi";
          case "yy":
            h = m ? "vuoden" : "vuotta";
            break;
        }
        return h = Qi(e, m) + " " + h, h;
      }
      function Qi(e, n) {
        return e < 10 ? n ? dd[e] : xn[e] : e;
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
      var Zr = /^(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)/i, cc = /(janv\.?|févr\.?|mars|avr\.?|mai|juin|juil\.?|août|sept\.?|oct\.?|nov\.?|déc\.?)/i, Xi = /(janv\.?|févr\.?|mars|avr\.?|mai|juin|juil\.?|août|sept\.?|oct\.?|nov\.?|déc\.?|janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)/i, pa = [/^janv/i, /^févr/i, /^mars/i, /^avr/i, /^mai/i, /^juin/i, /^juil/i, /^août/i, /^sept/i, /^oct/i, /^nov/i, /^déc/i];
      l.defineLocale("fr", { months: "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"), monthsShort: "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"), monthsRegex: Xi, monthsShortRegex: Xi, monthsStrictRegex: Zr, monthsShortStrictRegex: cc, monthsParse: pa, longMonthsParse: pa, shortMonthsParse: pa, weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"), weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"), weekdaysMin: "di_lu_ma_me_je_ve_sa".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, calendar: { sameDay: "[Aujourd’hui à] LT", nextDay: "[Demain à] LT", nextWeek: "dddd [à] LT", lastDay: "[Hier à] LT", lastWeek: "dddd [dernier à] LT", sameElse: "L" }, relativeTime: { future: "dans %s", past: "il y a %s", s: "quelques secondes", ss: "%d secondes", m: "une minute", mm: "%d minutes", h: "une heure", hh: "%d heures", d: "un jour", dd: "%d jours", w: "une semaine", ww: "%d semaines", M: "un mois", MM: "%d mois", y: "un an", yy: "%d ans" }, dayOfMonthOrdinalParse: /\d{1,2}(er|)/, ordinal: function(e, n) {
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
      var eo = "jan._feb._mrt._apr._mai_jun._jul._aug._sep._okt._nov._des.".split("_"), to = "jan_feb_mrt_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_");
      l.defineLocale("fy", { months: "jannewaris_febrewaris_maart_april_maaie_juny_july_augustus_septimber_oktober_novimber_desimber".split("_"), monthsShort: function(e, n) {
        return e ? /-MMM-/.test(n) ? to[e.month()] : eo[e.month()] : eo;
      }, monthsParseExact: true, weekdays: "snein_moandei_tiisdei_woansdei_tongersdei_freed_sneon".split("_"), weekdaysShort: "si._mo._ti._wo._to._fr._so.".split("_"), weekdaysMin: "Si_Mo_Ti_Wo_To_Fr_So".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD-MM-YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, calendar: { sameDay: "[hjoed om] LT", nextDay: "[moarn om] LT", nextWeek: "dddd [om] LT", lastDay: "[juster om] LT", lastWeek: "[ôfrûne] dddd [om] LT", sameElse: "L" }, relativeTime: { future: "oer %s", past: "%s lyn", s: "in pear sekonden", ss: "%d sekonden", m: "ien minút", mm: "%d minuten", h: "ien oere", hh: "%d oeren", d: "ien dei", dd: "%d dagen", M: "ien moanne", MM: "%d moannen", y: "ien jier", yy: "%d jierren" }, dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/, ordinal: function(e) {
        return e + (e === 1 || e === 8 || e >= 20 ? "ste" : "de");
      }, week: { dow: 1, doy: 4 } });
      var gc = ["Eanáir", "Feabhra", "Márta", "Aibreán", "Bealtaine", "Meitheamh", "Iúil", "Lúnasa", "Meán Fómhair", "Deireadh Fómhair", "Samhain", "Nollaig"], md = ["Ean", "Feabh", "Márt", "Aib", "Beal", "Meith", "Iúil", "Lún", "M.F.", "D.F.", "Samh", "Noll"], zs = ["Dé Domhnaigh", "Dé Luain", "Dé Máirt", "Dé Céadaoin", "Déardaoin", "Dé hAoine", "Dé Sathairn"], ud = ["Domh", "Luan", "Máirt", "Céad", "Déar", "Aoine", "Sath"], cd = ["Do", "Lu", "Má", "Cé", "Dé", "A", "Sa"];
      l.defineLocale("ga", { months: gc, monthsShort: md, monthsParseExact: true, weekdays: zs, weekdaysShort: ud, weekdaysMin: cd, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[Inniu ag] LT", nextDay: "[Amárach ag] LT", nextWeek: "dddd [ag] LT", lastDay: "[Inné ag] LT", lastWeek: "dddd [seo caite] [ag] LT", sameElse: "L" }, relativeTime: { future: "i %s", past: "%s ó shin", s: "cúpla soicind", ss: "%d soicind", m: "nóiméad", mm: "%d nóiméad", h: "uair an chloig", hh: "%d uair an chloig", d: "lá", dd: "%d lá", M: "mí", MM: "%d míonna", y: "bliain", yy: "%d bliain" }, dayOfMonthOrdinalParse: /\d{1,2}(d|na|mh)/, ordinal: function(e) {
        var n = e === 1 ? "d" : e % 10 === 2 ? "na" : "mh";
        return e + n;
      }, week: { dow: 1, doy: 4 } });
      var hc = ["Am Faoilleach", "An Gearran", "Am Màrt", "An Giblean", "An Cèitean", "An t-Ògmhios", "An t-Iuchar", "An Lùnastal", "An t-Sultain", "An Dàmhair", "An t-Samhain", "An Dùbhlachd"], gd = ["Faoi", "Gear", "Màrt", "Gibl", "Cèit", "Ògmh", "Iuch", "Lùn", "Sult", "Dàmh", "Samh", "Dùbh"], fc = ["Didòmhnaich", "Diluain", "Dimàirt", "Diciadain", "Diardaoin", "Dihaoine", "Disathairne"], _c = ["Did", "Dil", "Dim", "Dic", "Dia", "Dih", "Dis"], Bs = ["Dò", "Lu", "Mà", "Ci", "Ar", "Ha", "Sa"];
      l.defineLocale("gd", { months: hc, monthsShort: gd, monthsParseExact: true, weekdays: fc, weekdaysShort: _c, weekdaysMin: Bs, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[An-diugh aig] LT", nextDay: "[A-màireach aig] LT", nextWeek: "dddd [aig] LT", lastDay: "[An-dè aig] LT", lastWeek: "dddd [seo chaidh] [aig] LT", sameElse: "L" }, relativeTime: { future: "ann an %s", past: "bho chionn %s", s: "beagan diogan", ss: "%d diogan", m: "mionaid", mm: "%d mionaidean", h: "uair", hh: "%d uairean", d: "latha", dd: "%d latha", M: "mìos", MM: "%d mìosan", y: "bliadhna", yy: "%d bliadhna" }, dayOfMonthOrdinalParse: /\d{1,2}(d|na|mh)/, ordinal: function(e) {
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
      function vt(e, n, d, m) {
        var h = { s: ["थोडया सॅकंडांनी", "थोडे सॅकंड"], ss: [e + " सॅकंडांनी", e + " सॅकंड"], m: ["एका मिणटान", "एक मिनूट"], mm: [e + " मिणटांनी", e + " मिणटां"], h: ["एका वरान", "एक वर"], hh: [e + " वरांनी", e + " वरां"], d: ["एका दिसान", "एक दीस"], dd: [e + " दिसांनी", e + " दीस"], M: ["एका म्हयन्यान", "एक म्हयनो"], MM: [e + " म्हयन्यानी", e + " म्हयने"], y: ["एका वर्सान", "एक वर्स"], yy: [e + " वर्सांनी", e + " वर्सां"] };
        return m ? h[d][0] : h[d][1];
      }
      l.defineLocale("gom-deva", { months: { standalone: "जानेवारी_फेब्रुवारी_मार्च_एप्रील_मे_जून_जुलय_ऑगस्ट_सप्टेंबर_ऑक्टोबर_नोव्हेंबर_डिसेंबर".split("_"), format: "जानेवारीच्या_फेब्रुवारीच्या_मार्चाच्या_एप्रीलाच्या_मेयाच्या_जूनाच्या_जुलयाच्या_ऑगस्टाच्या_सप्टेंबराच्या_ऑक्टोबराच्या_नोव्हेंबराच्या_डिसेंबराच्या".split("_"), isFormat: /MMMM(\s)+D[oD]?/ }, monthsShort: "जाने._फेब्रु._मार्च_एप्री._मे_जून_जुल._ऑग._सप्टें._ऑक्टो._नोव्हें._डिसें.".split("_"), monthsParseExact: true, weekdays: "आयतार_सोमार_मंगळार_बुधवार_बिरेस्तार_सुक्रार_शेनवार".split("_"), weekdaysShort: "आयत._सोम._मंगळ._बुध._ब्रेस्त._सुक्र._शेन.".split("_"), weekdaysMin: "आ_सो_मं_बु_ब्रे_सु_शे".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "A h:mm [वाजतां]", LTS: "A h:mm:ss [वाजतां]", L: "DD-MM-YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY A h:mm [वाजतां]", LLLL: "dddd, MMMM Do, YYYY, A h:mm [वाजतां]", llll: "ddd, D MMM YYYY, A h:mm [वाजतां]" }, calendar: { sameDay: "[आयज] LT", nextDay: "[फाल्यां] LT", nextWeek: "[फुडलो] dddd[,] LT", lastDay: "[काल] LT", lastWeek: "[फाटलो] dddd[,] LT", sameElse: "L" }, relativeTime: { future: "%s", past: "%s आदीं", s: vt, ss: vt, m: vt, mm: vt, h: vt, hh: vt, d: vt, dd: vt, M: vt, MM: vt, y: vt, yy: vt }, dayOfMonthOrdinalParse: /\d{1,2}(वेर)/, ordinal: function(e, n) {
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
      function wt(e, n, d, m) {
        var h = { s: ["thoddea sekondamni", "thodde sekond"], ss: [e + " sekondamni", e + " sekond"], m: ["eka mintan", "ek minut"], mm: [e + " mintamni", e + " mintam"], h: ["eka voran", "ek vor"], hh: [e + " voramni", e + " voram"], d: ["eka disan", "ek dis"], dd: [e + " disamni", e + " dis"], M: ["eka mhoinean", "ek mhoino"], MM: [e + " mhoineamni", e + " mhoine"], y: ["eka vorsan", "ek voros"], yy: [e + " vorsamni", e + " vorsam"] };
        return m ? h[d][0] : h[d][1];
      }
      l.defineLocale("gom-latn", { months: { standalone: "Janer_Febrer_Mars_Abril_Mai_Jun_Julai_Agost_Setembr_Otubr_Novembr_Dezembr".split("_"), format: "Janerachea_Febrerachea_Marsachea_Abrilachea_Maiachea_Junachea_Julaiachea_Agostachea_Setembrachea_Otubrachea_Novembrachea_Dezembrachea".split("_"), isFormat: /MMMM(\s)+D[oD]?/ }, monthsShort: "Jan._Feb._Mars_Abr._Mai_Jun_Jul._Ago._Set._Otu._Nov._Dez.".split("_"), monthsParseExact: true, weekdays: "Aitar_Somar_Mongllar_Budhvar_Birestar_Sukrar_Son'var".split("_"), weekdaysShort: "Ait._Som._Mon._Bud._Bre._Suk._Son.".split("_"), weekdaysMin: "Ai_Sm_Mo_Bu_Br_Su_Sn".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "A h:mm [vazta]", LTS: "A h:mm:ss [vazta]", L: "DD-MM-YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY A h:mm [vazta]", LLLL: "dddd, MMMM Do, YYYY, A h:mm [vazta]", llll: "ddd, D MMM YYYY, A h:mm [vazta]" }, calendar: { sameDay: "[Aiz] LT", nextDay: "[Faleam] LT", nextWeek: "[Fuddlo] dddd[,] LT", lastDay: "[Kal] LT", lastWeek: "[Fattlo] dddd[,] LT", sameElse: "L" }, relativeTime: { future: "%s", past: "%s adim", s: wt, ss: wt, m: wt, mm: wt, h: wt, hh: wt, d: wt, dd: wt, M: wt, MM: wt, y: wt, yy: wt }, dayOfMonthOrdinalParse: /\d{1,2}(er)/, ordinal: function(e, n) {
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
      var so = { 1: "૧", 2: "૨", 3: "૩", 4: "૪", 5: "૫", 6: "૬", 7: "૭", 8: "૮", 9: "૯", 0: "૦" }, Qr = { "૧": "1", "૨": "2", "૩": "3", "૪": "4", "૫": "5", "૬": "6", "૭": "7", "૮": "8", "૯": "9", "૦": "0" };
      l.defineLocale("gu", { months: "જાન્યુઆરી_ફેબ્રુઆરી_માર્ચ_એપ્રિલ_મે_જૂન_જુલાઈ_ઑગસ્ટ_સપ્ટેમ્બર_ઑક્ટ્બર_નવેમ્બર_ડિસેમ્બર".split("_"), monthsShort: "જાન્યુ._ફેબ્રુ._માર્ચ_એપ્રિ._મે_જૂન_જુલા._ઑગ._સપ્ટે._ઑક્ટ્._નવે._ડિસે.".split("_"), monthsParseExact: true, weekdays: "રવિવાર_સોમવાર_મંગળવાર_બુધ્વાર_ગુરુવાર_શુક્રવાર_શનિવાર".split("_"), weekdaysShort: "રવિ_સોમ_મંગળ_બુધ્_ગુરુ_શુક્ર_શનિ".split("_"), weekdaysMin: "ર_સો_મં_બુ_ગુ_શુ_શ".split("_"), longDateFormat: { LT: "A h:mm વાગ્યે", LTS: "A h:mm:ss વાગ્યે", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, A h:mm વાગ્યે", LLLL: "dddd, D MMMM YYYY, A h:mm વાગ્યે" }, calendar: { sameDay: "[આજ] LT", nextDay: "[કાલે] LT", nextWeek: "dddd, LT", lastDay: "[ગઇકાલે] LT", lastWeek: "[પાછલા] dddd, LT", sameElse: "L" }, relativeTime: { future: "%s મા", past: "%s પહેલા", s: "અમુક પળો", ss: "%d સેકંડ", m: "એક મિનિટ", mm: "%d મિનિટ", h: "એક કલાક", hh: "%d કલાક", d: "એક દિવસ", dd: "%d દિવસ", M: "એક મહિનો", MM: "%d મહિનો", y: "એક વર્ષ", yy: "%d વર્ષ" }, preparse: function(e) {
        return e.replace(/[૧૨૩૪૫૬૭૮૯૦]/g, function(n) {
          return Qr[n];
        });
      }, postformat: function(e) {
        return e.replace(/\d/g, function(n) {
          return so[n];
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
      var ya = { 1: "१", 2: "२", 3: "३", 4: "४", 5: "५", 6: "६", 7: "७", 8: "८", 9: "९", 0: "०" }, ee = { "१": "1", "२": "2", "३": "3", "४": "4", "५": "5", "६": "6", "७": "7", "८": "8", "९": "9", "०": "0" }, Xa = [/^जन/i, /^फ़र|फर/i, /^मार्च/i, /^अप्रै/i, /^मई/i, /^जून/i, /^जुल/i, /^अग/i, /^सितं|सित/i, /^अक्टू/i, /^नव|नवं/i, /^दिसं|दिस/i], no = [/^जन/i, /^फ़र/i, /^मार्च/i, /^अप्रै/i, /^मई/i, /^जून/i, /^जुल/i, /^अग/i, /^सित/i, /^अक्टू/i, /^नव/i, /^दिस/i];
      l.defineLocale("hi", { months: { format: "जनवरी_फ़रवरी_मार्च_अप्रैल_मई_जून_जुलाई_अगस्त_सितम्बर_अक्टूबर_नवम्बर_दिसम्बर".split("_"), standalone: "जनवरी_फरवरी_मार्च_अप्रैल_मई_जून_जुलाई_अगस्त_सितंबर_अक्टूबर_नवंबर_दिसंबर".split("_") }, monthsShort: "जन._फ़र._मार्च_अप्रै._मई_जून_जुल._अग._सित._अक्टू._नव._दिस.".split("_"), weekdays: "रविवार_सोमवार_मंगलवार_बुधवार_गुरूवार_शुक्रवार_शनिवार".split("_"), weekdaysShort: "रवि_सोम_मंगल_बुध_गुरू_शुक्र_शनि".split("_"), weekdaysMin: "र_सो_मं_बु_गु_शु_श".split("_"), longDateFormat: { LT: "A h:mm बजे", LTS: "A h:mm:ss बजे", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, A h:mm बजे", LLLL: "dddd, D MMMM YYYY, A h:mm बजे" }, monthsParse: Xa, longMonthsParse: Xa, shortMonthsParse: no, monthsRegex: /^(जनवरी|जन\.?|फ़रवरी|फरवरी|फ़र\.?|मार्च?|अप्रैल|अप्रै\.?|मई?|जून?|जुलाई|जुल\.?|अगस्त|अग\.?|सितम्बर|सितंबर|सित\.?|अक्टूबर|अक्टू\.?|नवम्बर|नवंबर|नव\.?|दिसम्बर|दिसंबर|दिस\.?)/i, monthsShortRegex: /^(जनवरी|जन\.?|फ़रवरी|फरवरी|फ़र\.?|मार्च?|अप्रैल|अप्रै\.?|मई?|जून?|जुलाई|जुल\.?|अगस्त|अग\.?|सितम्बर|सितंबर|सित\.?|अक्टूबर|अक्टू\.?|नवम्बर|नवंबर|नव\.?|दिसम्बर|दिसंबर|दिस\.?)/i, monthsStrictRegex: /^(जनवरी?|फ़रवरी|फरवरी?|मार्च?|अप्रैल?|मई?|जून?|जुलाई?|अगस्त?|सितम्बर|सितंबर|सित?\.?|अक्टूबर|अक्टू\.?|नवम्बर|नवंबर?|दिसम्बर|दिसंबर?)/i, monthsShortStrictRegex: /^(जन\.?|फ़र\.?|मार्च?|अप्रै\.?|मई?|जून?|जुल\.?|अग\.?|सित\.?|अक्टू\.?|नव\.?|दिस\.?)/i, calendar: { sameDay: "[आज] LT", nextDay: "[कल] LT", nextWeek: "dddd, LT", lastDay: "[कल] LT", lastWeek: "[पिछले] dddd, LT", sameElse: "L" }, relativeTime: { future: "%s में", past: "%s पहले", s: "कुछ ही क्षण", ss: "%d सेकंड", m: "एक मिनट", mm: "%d मिनट", h: "एक घंटा", hh: "%d घंटे", d: "एक दिन", dd: "%d दिन", M: "एक महीने", MM: "%d महीने", y: "एक वर्ष", yy: "%d वर्ष" }, preparse: function(e) {
        return e.replace(/[१२३४५६७८९०]/g, function(n) {
          return ee[n];
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
        var m = e + " ";
        switch (d) {
          case "ss":
            return e === 1 ? m += "sekunda" : e === 2 || e === 3 || e === 4 ? m += "sekunde" : m += "sekundi", m;
          case "m":
            return n ? "jedna minuta" : "jedne minute";
          case "mm":
            return e === 1 ? m += "minuta" : e === 2 || e === 3 || e === 4 ? m += "minute" : m += "minuta", m;
          case "h":
            return n ? "jedan sat" : "jednog sata";
          case "hh":
            return e === 1 ? m += "sat" : e === 2 || e === 3 || e === 4 ? m += "sata" : m += "sati", m;
          case "dd":
            return e === 1 ? m += "dan" : m += "dana", m;
          case "MM":
            return e === 1 ? m += "mjesec" : e === 2 || e === 3 || e === 4 ? m += "mjeseca" : m += "mjeseci", m;
          case "yy":
            return e === 1 ? m += "godina" : e === 2 || e === 3 || e === 4 ? m += "godine" : m += "godina", m;
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
      var pc = "vasárnap hétfőn kedden szerdán csütörtökön pénteken szombaton".split(" ");
      function Lt(e, n, d, m) {
        var h = e;
        switch (d) {
          case "s":
            return m || n ? "néhány másodperc" : "néhány másodperce";
          case "ss":
            return h + (m || n) ? " másodperc" : " másodperce";
          case "m":
            return "egy" + (m || n ? " perc" : " perce");
          case "mm":
            return h + (m || n ? " perc" : " perce");
          case "h":
            return "egy" + (m || n ? " óra" : " órája");
          case "hh":
            return h + (m || n ? " óra" : " órája");
          case "d":
            return "egy" + (m || n ? " nap" : " napja");
          case "dd":
            return h + (m || n ? " nap" : " napja");
          case "M":
            return "egy" + (m || n ? " hónap" : " hónapja");
          case "MM":
            return h + (m || n ? " hónap" : " hónapja");
          case "y":
            return "egy" + (m || n ? " év" : " éve");
          case "yy":
            return h + (m || n ? " év" : " éve");
        }
        return "";
      }
      function ao(e) {
        return (e ? "" : "[múlt] ") + "[" + pc[this.day()] + "] LT[-kor]";
      }
      l.defineLocale("hu", { months: "január_február_március_április_május_június_július_augusztus_szeptember_október_november_december".split("_"), monthsShort: "jan._feb._márc._ápr._máj._jún._júl._aug._szept._okt._nov._dec.".split("_"), monthsParseExact: true, weekdays: "vasárnap_hétfő_kedd_szerda_csütörtök_péntek_szombat".split("_"), weekdaysShort: "vas_hét_kedd_sze_csüt_pén_szo".split("_"), weekdaysMin: "v_h_k_sze_cs_p_szo".split("_"), longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "YYYY.MM.DD.", LL: "YYYY. MMMM D.", LLL: "YYYY. MMMM D. H:mm", LLLL: "YYYY. MMMM D., dddd H:mm" }, meridiemParse: /de|du/i, isPM: function(e) {
        return e.charAt(1).toLowerCase() === "u";
      }, meridiem: function(e, n, d) {
        return e < 12 ? d === true ? "de" : "DE" : d === true ? "du" : "DU";
      }, calendar: { sameDay: "[ma] LT[-kor]", nextDay: "[holnap] LT[-kor]", nextWeek: function() {
        return ao.call(this, true);
      }, lastDay: "[tegnap] LT[-kor]", lastWeek: function() {
        return ao.call(this, false);
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
      function os(e, n, d, m) {
        var h = e + " ";
        switch (d) {
          case "s":
            return n || m ? "nokkrar sekúndur" : "nokkrum sekúndum";
          case "ss":
            return We(e) ? h + (n || m ? "sekúndur" : "sekúndum") : h + "sekúnda";
          case "m":
            return n ? "mínúta" : "mínútu";
          case "mm":
            return We(e) ? h + (n || m ? "mínútur" : "mínútum") : n ? h + "mínúta" : h + "mínútu";
          case "hh":
            return We(e) ? h + (n || m ? "klukkustundir" : "klukkustundum") : h + "klukkustund";
          case "d":
            return n ? "dagur" : m ? "dag" : "degi";
          case "dd":
            return We(e) ? n ? h + "dagar" : h + (m ? "daga" : "dögum") : n ? h + "dagur" : h + (m ? "dag" : "degi");
          case "M":
            return n ? "mánuður" : m ? "mánuð" : "mánuði";
          case "MM":
            return We(e) ? n ? h + "mánuðir" : h + (m ? "mánuði" : "mánuðum") : n ? h + "mánuður" : h + (m ? "mánuð" : "mánuði");
          case "y":
            return n || m ? "ár" : "ári";
          case "yy":
            return We(e) ? h + (n || m ? "ár" : "árum") : h + (n || m ? "ár" : "ári");
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
        return e.replace(/(წამ|წუთ|საათ|წელ|დღ|თვ)(ი|ე)/, function(n, d, m) {
          return m === "ი" ? d + "ში" : d + m + "ში";
        });
      }, past: function(e) {
        return /(წამი|წუთი|საათი|დღე|თვე)/.test(e) ? e.replace(/(ი|ე)$/, "ის წინ") : /წელი/.test(e) ? e.replace(/წელი$/, "წლის წინ") : e;
      }, s: "რამდენიმე წამი", ss: "%d წამი", m: "წუთი", mm: "%d წუთი", h: "საათი", hh: "%d საათი", d: "დღე", dd: "%d დღე", M: "თვე", MM: "%d თვე", y: "წელი", yy: "%d წელი" }, dayOfMonthOrdinalParse: /0|1-ლი|მე-\d{1,2}|\d{1,2}-ე/, ordinal: function(e) {
        return e === 0 ? e : e === 1 ? e + "-ლი" : e < 20 || e <= 100 && e % 20 === 0 || e % 100 === 0 ? "მე-" + e : e + "-ე";
      }, week: { dow: 1, doy: 7 } });
      var ro = { 0: "-ші", 1: "-ші", 2: "-ші", 3: "-ші", 4: "-ші", 5: "-ші", 6: "-шы", 7: "-ші", 8: "-ші", 9: "-шы", 10: "-шы", 20: "-шы", 30: "-шы", 40: "-шы", 50: "-ші", 60: "-шы", 70: "-ші", 80: "-ші", 90: "-шы", 100: "-ші" };
      l.defineLocale("kk", { months: "қаңтар_ақпан_наурыз_сәуір_мамыр_маусым_шілде_тамыз_қыркүйек_қазан_қараша_желтоқсан".split("_"), monthsShort: "қаң_ақп_нау_сәу_мам_мау_шіл_там_қыр_қаз_қар_жел".split("_"), weekdays: "жексенбі_дүйсенбі_сейсенбі_сәрсенбі_бейсенбі_жұма_сенбі".split("_"), weekdaysShort: "жек_дүй_сей_сәр_бей_жұм_сен".split("_"), weekdaysMin: "жк_дй_сй_ср_бй_жм_сн".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[Бүгін сағат] LT", nextDay: "[Ертең сағат] LT", nextWeek: "dddd [сағат] LT", lastDay: "[Кеше сағат] LT", lastWeek: "[Өткен аптаның] dddd [сағат] LT", sameElse: "L" }, relativeTime: { future: "%s ішінде", past: "%s бұрын", s: "бірнеше секунд", ss: "%d секунд", m: "бір минут", mm: "%d минут", h: "бір сағат", hh: "%d сағат", d: "бір күн", dd: "%d күн", M: "бір ай", MM: "%d ай", y: "бір жыл", yy: "%d жыл" }, dayOfMonthOrdinalParse: /\d{1,2}-(ші|шы)/, ordinal: function(e) {
        var n = e % 10, d = e >= 100 ? 100 : null;
        return e + (ro[e] || ro[n] || ro[d]);
      }, week: { dow: 1, doy: 7 } });
      var hd = { 1: "១", 2: "២", 3: "៣", 4: "៤", 5: "៥", 6: "៦", 7: "៧", 8: "៨", 9: "៩", 0: "០" }, yc = { "១": "1", "២": "2", "៣": "3", "៤": "4", "៥": "5", "៦": "6", "៧": "7", "៨": "8", "៩": "9", "០": "0" };
      l.defineLocale("km", { months: "មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ".split("_"), monthsShort: "មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ".split("_"), weekdays: "អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍".split("_"), weekdaysShort: "អា_ច_អ_ព_ព្រ_សុ_ស".split("_"), weekdaysMin: "អា_ច_អ_ព_ព្រ_សុ_ស".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, meridiemParse: /ព្រឹក|ល្ងាច/, isPM: function(e) {
        return e === "ល្ងាច";
      }, meridiem: function(e, n, d) {
        return e < 12 ? "ព្រឹក" : "ល្ងាច";
      }, calendar: { sameDay: "[ថ្ងៃនេះ ម៉ោង] LT", nextDay: "[ស្អែក ម៉ោង] LT", nextWeek: "dddd [ម៉ោង] LT", lastDay: "[ម្សិលមិញ ម៉ោង] LT", lastWeek: "dddd [សប្តាហ៍មុន] [ម៉ោង] LT", sameElse: "L" }, relativeTime: { future: "%sទៀត", past: "%sមុន", s: "ប៉ុន្មានវិនាទី", ss: "%d វិនាទី", m: "មួយនាទី", mm: "%d នាទី", h: "មួយម៉ោង", hh: "%d ម៉ោង", d: "មួយថ្ងៃ", dd: "%d ថ្ងៃ", M: "មួយខែ", MM: "%d ខែ", y: "មួយឆ្នាំ", yy: "%d ឆ្នាំ" }, dayOfMonthOrdinalParse: /ទី\d{1,2}/, ordinal: "ទី%d", preparse: function(e) {
        return e.replace(/[១២៣៤៥៦៧៨៩០]/g, function(n) {
          return yc[n];
        });
      }, postformat: function(e) {
        return e.replace(/\d/g, function(n) {
          return hd[n];
        });
      }, week: { dow: 1, doy: 4 } });
      var fd = { 1: "೧", 2: "೨", 3: "೩", 4: "೪", 5: "೫", 6: "೬", 7: "೭", 8: "೮", 9: "೯", 0: "೦" }, vc = { "೧": "1", "೨": "2", "೩": "3", "೪": "4", "೫": "5", "೬": "6", "೭": "7", "೮": "8", "೯": "9", "೦": "0" };
      l.defineLocale("kn", { months: "ಜನವರಿ_ಫೆಬ್ರವರಿ_ಮಾರ್ಚ್_ಏಪ್ರಿಲ್_ಮೇ_ಜೂನ್_ಜುಲೈ_ಆಗಸ್ಟ್_ಸೆಪ್ಟೆಂಬರ್_ಅಕ್ಟೋಬರ್_ನವೆಂಬರ್_ಡಿಸೆಂಬರ್".split("_"), monthsShort: "ಜನ_ಫೆಬ್ರ_ಮಾರ್ಚ್_ಏಪ್ರಿಲ್_ಮೇ_ಜೂನ್_ಜುಲೈ_ಆಗಸ್ಟ್_ಸೆಪ್ಟೆಂ_ಅಕ್ಟೋ_ನವೆಂ_ಡಿಸೆಂ".split("_"), monthsParseExact: true, weekdays: "ಭಾನುವಾರ_ಸೋಮವಾರ_ಮಂಗಳವಾರ_ಬುಧವಾರ_ಗುರುವಾರ_ಶುಕ್ರವಾರ_ಶನಿವಾರ".split("_"), weekdaysShort: "ಭಾನು_ಸೋಮ_ಮಂಗಳ_ಬುಧ_ಗುರು_ಶುಕ್ರ_ಶನಿ".split("_"), weekdaysMin: "ಭಾ_ಸೋ_ಮಂ_ಬು_ಗು_ಶು_ಶ".split("_"), longDateFormat: { LT: "A h:mm", LTS: "A h:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, A h:mm", LLLL: "dddd, D MMMM YYYY, A h:mm" }, calendar: { sameDay: "[ಇಂದು] LT", nextDay: "[ನಾಳೆ] LT", nextWeek: "dddd, LT", lastDay: "[ನಿನ್ನೆ] LT", lastWeek: "[ಕೊನೆಯ] dddd, LT", sameElse: "L" }, relativeTime: { future: "%s ನಂತರ", past: "%s ಹಿಂದೆ", s: "ಕೆಲವು ಕ್ಷಣಗಳು", ss: "%d ಸೆಕೆಂಡುಗಳು", m: "ಒಂದು ನಿಮಿಷ", mm: "%d ನಿಮಿಷ", h: "ಒಂದು ಗಂಟೆ", hh: "%d ಗಂಟೆ", d: "ಒಂದು ದಿನ", dd: "%d ದಿನ", M: "ಒಂದು ತಿಂಗಳು", MM: "%d ತಿಂಗಳು", y: "ಒಂದು ವರ್ಷ", yy: "%d ವರ್ಷ" }, preparse: function(e) {
        return e.replace(/[೧೨೩೪೫೬೭೮೯೦]/g, function(n) {
          return vc[n];
        });
      }, postformat: function(e) {
        return e.replace(/\d/g, function(n) {
          return fd[n];
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
      function kt(e, n, d, m) {
        var h = { s: ["çend sanîye", "çend sanîyeyan"], ss: [e + " sanîye", e + " sanîyeyan"], m: ["deqîqeyek", "deqîqeyekê"], mm: [e + " deqîqe", e + " deqîqeyan"], h: ["saetek", "saetekê"], hh: [e + " saet", e + " saetan"], d: ["rojek", "rojekê"], dd: [e + " roj", e + " rojan"], w: ["hefteyek", "hefteyekê"], ww: [e + " hefte", e + " hefteyan"], M: ["mehek", "mehekê"], MM: [e + " meh", e + " mehan"], y: ["salek", "salekê"], yy: [e + " sal", e + " salan"] };
        return n ? h[d][0] : h[d][1];
      }
      function wc(e) {
        e = "" + e;
        var n = e.substring(e.length - 1), d = e.length > 1 ? e.substring(e.length - 2) : "";
        return !(d == 12 || d == 13) && (n == "2" || n == "3" || d == "50" || n == "70" || n == "80") ? "yê" : "ê";
      }
      l.defineLocale("ku-kmr", { months: "Rêbendan_Sibat_Adar_Nîsan_Gulan_Hezîran_Tîrmeh_Tebax_Îlon_Cotmeh_Mijdar_Berfanbar".split("_"), monthsShort: "Rêb_Sib_Ada_Nîs_Gul_Hez_Tîr_Teb_Îlo_Cot_Mij_Ber".split("_"), monthsParseExact: true, weekdays: "Yekşem_Duşem_Sêşem_Çarşem_Pêncşem_În_Şemî".split("_"), weekdaysShort: "Yek_Du_Sê_Çar_Pên_În_Şem".split("_"), weekdaysMin: "Ye_Du_Sê_Ça_Pê_În_Şe".split("_"), meridiem: function(e, n, d) {
        return e < 12 ? d ? "bn" : "BN" : d ? "pn" : "PN";
      }, meridiemParse: /bn|BN|pn|PN/, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "Do MMMM[a] YYYY[an]", LLL: "Do MMMM[a] YYYY[an] HH:mm", LLLL: "dddd, Do MMMM[a] YYYY[an] HH:mm", ll: "Do MMM[.] YYYY[an]", lll: "Do MMM[.] YYYY[an] HH:mm", llll: "ddd[.], Do MMM[.] YYYY[an] HH:mm" }, calendar: { sameDay: "[Îro di saet] LT [de]", nextDay: "[Sibê di saet] LT [de]", nextWeek: "dddd [di saet] LT [de]", lastDay: "[Duh di saet] LT [de]", lastWeek: "dddd[a borî di saet] LT [de]", sameElse: "L" }, relativeTime: { future: "di %s de", past: "berî %s", s: kt, ss: kt, m: kt, mm: kt, h: kt, hh: kt, d: kt, dd: kt, w: kt, ww: kt, M: kt, MM: kt, y: kt, yy: kt }, dayOfMonthOrdinalParse: /\d{1,2}(?:yê|ê|\.)/, ordinal: function(e, n) {
        var d = n.toLowerCase();
        return d.includes("w") || d.includes("m") ? e + "." : e + wc(e);
      }, week: { dow: 1, doy: 4 } });
      var Ws = { 1: "١", 2: "٢", 3: "٣", 4: "٤", 5: "٥", 6: "٦", 7: "٧", 8: "٨", 9: "٩", 0: "٠" }, ht = { "١": "1", "٢": "2", "٣": "3", "٤": "4", "٥": "5", "٦": "6", "٧": "7", "٨": "8", "٩": "9", "٠": "0" }, Xr = ["کانونی دووەم", "شوبات", "ئازار", "نیسان", "ئایار", "حوزەیران", "تەمموز", "ئاب", "ئەیلوول", "تشرینی یەكەم", "تشرینی دووەم", "كانونی یەکەم"];
      l.defineLocale("ku", { months: Xr, monthsShort: Xr, weekdays: "یه‌كشه‌ممه‌_دووشه‌ممه‌_سێشه‌ممه‌_چوارشه‌ممه‌_پێنجشه‌ممه‌_هه‌ینی_شه‌ممه‌".split("_"), weekdaysShort: "یه‌كشه‌م_دووشه‌م_سێشه‌م_چوارشه‌م_پێنجشه‌م_هه‌ینی_شه‌ممه‌".split("_"), weekdaysMin: "ی_د_س_چ_پ_ه_ش".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, meridiemParse: /ئێواره‌|به‌یانی/, isPM: function(e) {
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
      var io = { 0: "-чү", 1: "-чи", 2: "-чи", 3: "-чү", 4: "-чү", 5: "-чи", 6: "-чы", 7: "-чи", 8: "-чи", 9: "-чу", 10: "-чу", 20: "-чы", 30: "-чу", 40: "-чы", 50: "-чү", 60: "-чы", 70: "-чи", 80: "-чи", 90: "-чу", 100: "-чү" };
      l.defineLocale("ky", { months: "январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_"), monthsShort: "янв_фев_март_апр_май_июнь_июль_авг_сен_окт_ноя_дек".split("_"), weekdays: "Жекшемби_Дүйшөмбү_Шейшемби_Шаршемби_Бейшемби_Жума_Ишемби".split("_"), weekdaysShort: "Жек_Дүй_Шей_Шар_Бей_Жум_Ише".split("_"), weekdaysMin: "Жк_Дй_Шй_Шр_Бй_Жм_Иш".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[Бүгүн саат] LT", nextDay: "[Эртең саат] LT", nextWeek: "dddd [саат] LT", lastDay: "[Кечээ саат] LT", lastWeek: "[Өткөн аптанын] dddd [күнү] [саат] LT", sameElse: "L" }, relativeTime: { future: "%s ичинде", past: "%s мурун", s: "бирнече секунд", ss: "%d секунд", m: "бир мүнөт", mm: "%d мүнөт", h: "бир саат", hh: "%d саат", d: "бир күн", dd: "%d күн", M: "бир ай", MM: "%d ай", y: "бир жыл", yy: "%d жыл" }, dayOfMonthOrdinalParse: /\d{1,2}-(чи|чы|чү|чу)/, ordinal: function(e) {
        var n = e % 10, d = e >= 100 ? 100 : null;
        return e + (io[e] || io[n] || io[d]);
      }, week: { dow: 1, doy: 7 } });
      function Nn(e, n, d, m) {
        var h = { m: ["eng Minutt", "enger Minutt"], h: ["eng Stonn", "enger Stonn"], d: ["een Dag", "engem Dag"], M: ["ee Mount", "engem Mount"], y: ["ee Joer", "engem Joer"] };
        return n ? h[d][0] : h[d][1];
      }
      function Mc(e) {
        var n = e.substr(0, e.indexOf(" "));
        return ks(n) ? "a " + e : "an " + e;
      }
      function Lc(e) {
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
      } }, relativeTime: { future: Mc, past: Lc, s: "e puer Sekonnen", ss: "%d Sekonnen", m: Nn, mm: "%d Minutten", h: Nn, hh: "%d Stonnen", d: Nn, dd: "%d Deeg", M: Nn, MM: "%d Méint", y: Nn, yy: "%d Joer" }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } });
      l.defineLocale("lo", { months: "ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ".split("_"), monthsShort: "ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ".split("_"), weekdays: "ອາທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ".split("_"), weekdaysShort: "ທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ".split("_"), weekdaysMin: "ທ_ຈ_ອຄ_ພ_ພຫ_ສກ_ສ".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "ວັນdddd D MMMM YYYY HH:mm" }, meridiemParse: /ຕອນເຊົ້າ|ຕອນແລງ/, isPM: function(e) {
        return e === "ຕອນແລງ";
      }, meridiem: function(e, n, d) {
        return e < 12 ? "ຕອນເຊົ້າ" : "ຕອນແລງ";
      }, calendar: { sameDay: "[ມື້ນີ້ເວລາ] LT", nextDay: "[ມື້ອື່ນເວລາ] LT", nextWeek: "[ວັນ]dddd[ໜ້າເວລາ] LT", lastDay: "[ມື້ວານນີ້ເວລາ] LT", lastWeek: "[ວັນ]dddd[ແລ້ວນີ້ເວລາ] LT", sameElse: "L" }, relativeTime: { future: "ອີກ %s", past: "%sຜ່ານມາ", s: "ບໍ່ເທົ່າໃດວິນາທີ", ss: "%d ວິນາທີ", m: "1 ນາທີ", mm: "%d ນາທີ", h: "1 ຊົ່ວໂມງ", hh: "%d ຊົ່ວໂມງ", d: "1 ມື້", dd: "%d ມື້", M: "1 ເດືອນ", MM: "%d ເດືອນ", y: "1 ປີ", yy: "%d ປີ" }, dayOfMonthOrdinalParse: /(ທີ່)\d{1,2}/, ordinal: function(e) {
        return "ທີ່" + e;
      } });
      var _d = { ss: "sekundė_sekundžių_sekundes", m: "minutė_minutės_minutę", mm: "minutės_minučių_minutes", h: "valanda_valandos_valandą", hh: "valandos_valandų_valandas", d: "diena_dienos_dieną", dd: "dienos_dienų_dienas", M: "mėnuo_mėnesio_mėnesį", MM: "mėnesiai_mėnesių_mėnesius", y: "metai_metų_metus", yy: "metai_metų_metus" };
      function pd(e, n, d, m) {
        return n ? "kelios sekundės" : m ? "kelių sekundžių" : "kelias sekundes";
      }
      function va(e, n, d, m) {
        return n ? hn(d)[0] : m ? hn(d)[1] : hn(d)[2];
      }
      function yd(e) {
        return e % 10 === 0 || e > 10 && e < 20;
      }
      function hn(e) {
        return _d[e].split("_");
      }
      function wa(e, n, d, m) {
        var h = e + " ";
        return e === 1 ? h + va(e, n, d[0], m) : n ? h + (yd(e) ? hn(d)[1] : hn(d)[0]) : m ? h + hn(d)[1] : h + (yd(e) ? hn(d)[1] : hn(d)[2]);
      }
      l.defineLocale("lt", { months: { format: "sausio_vasario_kovo_balandžio_gegužės_birželio_liepos_rugpjūčio_rugsėjo_spalio_lapkričio_gruodžio".split("_"), standalone: "sausis_vasaris_kovas_balandis_gegužė_birželis_liepa_rugpjūtis_rugsėjis_spalis_lapkritis_gruodis".split("_"), isFormat: /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?|MMMM?(\[[^\[\]]*\]|\s)+D[oD]?/ }, monthsShort: "sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd".split("_"), weekdays: { format: "sekmadienį_pirmadienį_antradienį_trečiadienį_ketvirtadienį_penktadienį_šeštadienį".split("_"), standalone: "sekmadienis_pirmadienis_antradienis_trečiadienis_ketvirtadienis_penktadienis_šeštadienis".split("_"), isFormat: /dddd HH:mm/ }, weekdaysShort: "Sek_Pir_Ant_Tre_Ket_Pen_Šeš".split("_"), weekdaysMin: "S_P_A_T_K_Pn_Š".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY-MM-DD", LL: "YYYY [m.] MMMM D [d.]", LLL: "YYYY [m.] MMMM D [d.], HH:mm [val.]", LLLL: "YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]", l: "YYYY-MM-DD", ll: "YYYY [m.] MMMM D [d.]", lll: "YYYY [m.] MMMM D [d.], HH:mm [val.]", llll: "YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]" }, calendar: { sameDay: "[Šiandien] LT", nextDay: "[Rytoj] LT", nextWeek: "dddd LT", lastDay: "[Vakar] LT", lastWeek: "[Praėjusį] dddd LT", sameElse: "L" }, relativeTime: { future: "po %s", past: "prieš %s", s: pd, ss: wa, m: va, mm: wa, h: va, hh: wa, d: va, dd: wa, M: va, MM: wa, y: va, yy: wa }, dayOfMonthOrdinalParse: /\d{1,2}-oji/, ordinal: function(e) {
        return e + "-oji";
      }, week: { dow: 1, doy: 4 } });
      var oo = { ss: "sekundes_sekundēm_sekunde_sekundes".split("_"), m: "minūtes_minūtēm_minūte_minūtes".split("_"), mm: "minūtes_minūtēm_minūte_minūtes".split("_"), h: "stundas_stundām_stunda_stundas".split("_"), hh: "stundas_stundām_stunda_stundas".split("_"), d: "dienas_dienām_diena_dienas".split("_"), dd: "dienas_dienām_diena_dienas".split("_"), M: "mēneša_mēnešiem_mēnesis_mēneši".split("_"), MM: "mēneša_mēnešiem_mēnesis_mēneši".split("_"), y: "gada_gadiem_gads_gadi".split("_"), yy: "gada_gadiem_gads_gadi".split("_") };
      function lo(e, n, d) {
        return d ? n % 10 === 1 && n % 100 !== 11 ? e[2] : e[3] : n % 10 === 1 && n % 100 !== 11 ? e[0] : e[1];
      }
      function Ma(e, n, d) {
        return e + " " + lo(oo[d], e, n);
      }
      function An(e, n, d) {
        return lo(oo[d], e, n);
      }
      function vd(e, n) {
        return n ? "dažas sekundes" : "dažām sekundēm";
      }
      l.defineLocale("lv", { months: "janvāris_februāris_marts_aprīlis_maijs_jūnijs_jūlijs_augusts_septembris_oktobris_novembris_decembris".split("_"), monthsShort: "jan_feb_mar_apr_mai_jūn_jūl_aug_sep_okt_nov_dec".split("_"), weekdays: "svētdiena_pirmdiena_otrdiena_trešdiena_ceturtdiena_piektdiena_sestdiena".split("_"), weekdaysShort: "Sv_P_O_T_C_Pk_S".split("_"), weekdaysMin: "Sv_P_O_T_C_Pk_S".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY.", LL: "YYYY. [gada] D. MMMM", LLL: "YYYY. [gada] D. MMMM, HH:mm", LLLL: "YYYY. [gada] D. MMMM, dddd, HH:mm" }, calendar: { sameDay: "[Šodien pulksten] LT", nextDay: "[Rīt pulksten] LT", nextWeek: "dddd [pulksten] LT", lastDay: "[Vakar pulksten] LT", lastWeek: "[Pagājušā] dddd [pulksten] LT", sameElse: "L" }, relativeTime: { future: "pēc %s", past: "pirms %s", s: vd, ss: Ma, m: An, mm: Ma, h: An, hh: Ma, d: An, dd: Ma, M: An, MM: Ma, y: An, yy: Ma }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } });
      var Tt = { words: { ss: ["sekund", "sekunda", "sekundi"], m: ["jedan minut", "jednog minuta"], mm: ["minut", "minuta", "minuta"], h: ["jedan sat", "jednog sata"], hh: ["sat", "sata", "sati"], dd: ["dan", "dana", "dana"], MM: ["mjesec", "mjeseca", "mjeseci"], yy: ["godina", "godine", "godina"] }, correctGrammaticalCase: function(e, n) {
        return e === 1 ? n[0] : e >= 2 && e <= 4 ? n[1] : n[2];
      }, translate: function(e, n, d) {
        var m = Tt.words[d];
        return d.length === 1 ? n ? m[0] : m[1] : e + " " + Tt.correctGrammaticalCase(e, m);
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
      function Dt(e, n, d, m) {
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
      var wd = { 1: "१", 2: "२", 3: "३", 4: "४", 5: "५", 6: "६", 7: "७", 8: "८", 9: "९", 0: "०" }, Md = { "१": "1", "२": "2", "३": "3", "४": "4", "५": "5", "६": "6", "७": "7", "८": "8", "९": "9", "०": "0" };
      function ft(e, n, d, m) {
        var h = "";
        if (n) switch (d) {
          case "s":
            h = "काही सेकंद";
            break;
          case "ss":
            h = "%d सेकंद";
            break;
          case "m":
            h = "एक मिनिट";
            break;
          case "mm":
            h = "%d मिनिटे";
            break;
          case "h":
            h = "एक तास";
            break;
          case "hh":
            h = "%d तास";
            break;
          case "d":
            h = "एक दिवस";
            break;
          case "dd":
            h = "%d दिवस";
            break;
          case "M":
            h = "एक महिना";
            break;
          case "MM":
            h = "%d महिने";
            break;
          case "y":
            h = "एक वर्ष";
            break;
          case "yy":
            h = "%d वर्षे";
            break;
        }
        else switch (d) {
          case "s":
            h = "काही सेकंदां";
            break;
          case "ss":
            h = "%d सेकंदां";
            break;
          case "m":
            h = "एका मिनिटा";
            break;
          case "mm":
            h = "%d मिनिटां";
            break;
          case "h":
            h = "एका तासा";
            break;
          case "hh":
            h = "%d तासां";
            break;
          case "d":
            h = "एका दिवसा";
            break;
          case "dd":
            h = "%d दिवसां";
            break;
          case "M":
            h = "एका महिन्या";
            break;
          case "MM":
            h = "%d महिन्यां";
            break;
          case "y":
            h = "एका वर्षा";
            break;
          case "yy":
            h = "%d वर्षां";
            break;
        }
        return h.replace(/%d/i, e);
      }
      l.defineLocale("mr", { months: "जानेवारी_फेब्रुवारी_मार्च_एप्रिल_मे_जून_जुलै_ऑगस्ट_सप्टेंबर_ऑक्टोबर_नोव्हेंबर_डिसेंबर".split("_"), monthsShort: "जाने._फेब्रु._मार्च._एप्रि._मे._जून._जुलै._ऑग._सप्टें._ऑक्टो._नोव्हें._डिसें.".split("_"), monthsParseExact: true, weekdays: "रविवार_सोमवार_मंगळवार_बुधवार_गुरूवार_शुक्रवार_शनिवार".split("_"), weekdaysShort: "रवि_सोम_मंगळ_बुध_गुरू_शुक्र_शनि".split("_"), weekdaysMin: "र_सो_मं_बु_गु_शु_श".split("_"), longDateFormat: { LT: "A h:mm वाजता", LTS: "A h:mm:ss वाजता", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, A h:mm वाजता", LLLL: "dddd, D MMMM YYYY, A h:mm वाजता" }, calendar: { sameDay: "[आज] LT", nextDay: "[उद्या] LT", nextWeek: "dddd, LT", lastDay: "[काल] LT", lastWeek: "[मागील] dddd, LT", sameElse: "L" }, relativeTime: { future: "%sमध्ये", past: "%sपूर्वी", s: ft, ss: ft, m: ft, mm: ft, h: ft, hh: ft, d: ft, dd: ft, M: ft, MM: ft, y: ft, yy: ft }, preparse: function(e) {
        return e.replace(/[१२३४५६७८९०]/g, function(n) {
          return Md[n];
        });
      }, postformat: function(e) {
        return e.replace(/\d/g, function(n) {
          return wd[n];
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
      var Ld = { 1: "၁", 2: "၂", 3: "၃", 4: "၄", 5: "၅", 6: "၆", 7: "၇", 8: "၈", 9: "၉", 0: "၀" }, Ts = { "၁": "1", "၂": "2", "၃": "3", "၄": "4", "၅": "5", "၆": "6", "၇": "7", "၈": "8", "၉": "9", "၀": "0" };
      l.defineLocale("my", { months: "ဇန်နဝါရီ_ဖေဖော်ဝါရီ_မတ်_ဧပြီ_မေ_ဇွန်_ဇူလိုင်_သြဂုတ်_စက်တင်ဘာ_အောက်တိုဘာ_နိုဝင်ဘာ_ဒီဇင်ဘာ".split("_"), monthsShort: "ဇန်_ဖေ_မတ်_ပြီ_မေ_ဇွန်_လိုင်_သြ_စက်_အောက်_နို_ဒီ".split("_"), weekdays: "တနင်္ဂနွေ_တနင်္လာ_အင်္ဂါ_ဗုဒ္ဓဟူး_ကြာသပတေး_သောကြာ_စနေ".split("_"), weekdaysShort: "နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ".split("_"), weekdaysMin: "နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, calendar: { sameDay: "[ယနေ.] LT [မှာ]", nextDay: "[မနက်ဖြန်] LT [မှာ]", nextWeek: "dddd LT [မှာ]", lastDay: "[မနေ.က] LT [မှာ]", lastWeek: "[ပြီးခဲ့သော] dddd LT [မှာ]", sameElse: "L" }, relativeTime: { future: "လာမည့် %s မှာ", past: "လွန်ခဲ့သော %s က", s: "စက္ကန်.အနည်းငယ်", ss: "%d စက္ကန့်", m: "တစ်မိနစ်", mm: "%d မိနစ်", h: "တစ်နာရီ", hh: "%d နာရီ", d: "တစ်ရက်", dd: "%d ရက်", M: "တစ်လ", MM: "%d လ", y: "တစ်နှစ်", yy: "%d နှစ်" }, preparse: function(e) {
        return e.replace(/[၁၂၃၄၅၆၇၈၉၀]/g, function(n) {
          return Ts[n];
        });
      }, postformat: function(e) {
        return e.replace(/\d/g, function(n) {
          return Ld[n];
        });
      }, week: { dow: 1, doy: 4 } });
      l.defineLocale("nb", { months: "januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"), monthsShort: "jan._feb._mars_apr._mai_juni_juli_aug._sep._okt._nov._des.".split("_"), monthsParseExact: true, weekdays: "søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"), weekdaysShort: "sø._ma._ti._on._to._fr._lø.".split("_"), weekdaysMin: "sø_ma_ti_on_to_fr_lø".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY [kl.] HH:mm", LLLL: "dddd D. MMMM YYYY [kl.] HH:mm" }, calendar: { sameDay: "[i dag kl.] LT", nextDay: "[i morgen kl.] LT", nextWeek: "dddd [kl.] LT", lastDay: "[i går kl.] LT", lastWeek: "[forrige] dddd [kl.] LT", sameElse: "L" }, relativeTime: { future: "om %s", past: "%s siden", s: "noen sekunder", ss: "%d sekunder", m: "ett minutt", mm: "%d minutter", h: "én time", hh: "%d timer", d: "én dag", dd: "%d dager", w: "én uke", ww: "%d uker", M: "én måned", MM: "%d måneder", y: "ett år", yy: "%d år" }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } });
      var En = { 1: "१", 2: "२", 3: "३", 4: "४", 5: "५", 6: "६", 7: "७", 8: "८", 9: "९", 0: "०" }, kc = { "१": "1", "२": "2", "३": "3", "४": "4", "५": "5", "६": "6", "७": "7", "८": "8", "९": "9", "०": "0" };
      l.defineLocale("ne", { months: "जनवरी_फेब्रुवरी_मार्च_अप्रिल_मई_जुन_जुलाई_अगष्ट_सेप्टेम्बर_अक्टोबर_नोभेम्बर_डिसेम्बर".split("_"), monthsShort: "जन._फेब्रु._मार्च_अप्रि._मई_जुन_जुलाई._अग._सेप्ट._अक्टो._नोभे._डिसे.".split("_"), monthsParseExact: true, weekdays: "आइतबार_सोमबार_मङ्गलबार_बुधबार_बिहिबार_शुक्रबार_शनिबार".split("_"), weekdaysShort: "आइत._सोम._मङ्गल._बुध._बिहि._शुक्र._शनि.".split("_"), weekdaysMin: "आ._सो._मं._बु._बि._शु._श.".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "Aको h:mm बजे", LTS: "Aको h:mm:ss बजे", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, Aको h:mm बजे", LLLL: "dddd, D MMMM YYYY, Aको h:mm बजे" }, preparse: function(e) {
        return e.replace(/[१२३४५६७८९०]/g, function(n) {
          return kc[n];
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
      var mo = "jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_"), Tc = "jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_"), uo = [/^jan/i, /^feb/i, /^(maart|mrt\.?)$/i, /^apr/i, /^mei$/i, /^jun[i.]?$/i, /^jul[i.]?$/i, /^aug/i, /^sep/i, /^okt/i, /^nov/i, /^dec/i], kd = /^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;
      l.defineLocale("nl-be", { months: "januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"), monthsShort: function(e, n) {
        return e ? /-MMM-/.test(n) ? Tc[e.month()] : mo[e.month()] : mo;
      }, monthsRegex: kd, monthsShortRegex: kd, monthsStrictRegex: /^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december)/i, monthsShortStrictRegex: /^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i, monthsParse: uo, longMonthsParse: uo, shortMonthsParse: uo, weekdays: "zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"), weekdaysShort: "zo._ma._di._wo._do._vr._za.".split("_"), weekdaysMin: "zo_ma_di_wo_do_vr_za".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, calendar: { sameDay: "[vandaag om] LT", nextDay: "[morgen om] LT", nextWeek: "dddd [om] LT", lastDay: "[gisteren om] LT", lastWeek: "[afgelopen] dddd [om] LT", sameElse: "L" }, relativeTime: { future: "over %s", past: "%s geleden", s: "een paar seconden", ss: "%d seconden", m: "één minuut", mm: "%d minuten", h: "één uur", hh: "%d uur", d: "één dag", dd: "%d dagen", M: "één maand", MM: "%d maanden", y: "één jaar", yy: "%d jaar" }, dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/, ordinal: function(e) {
        return e + (e === 1 || e === 8 || e >= 20 ? "ste" : "de");
      }, week: { dow: 1, doy: 4 } });
      var Td = "jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_"), Dc = "jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_"), co = [/^jan/i, /^feb/i, /^(maart|mrt\.?)$/i, /^apr/i, /^mei$/i, /^jun[i.]?$/i, /^jul[i.]?$/i, /^aug/i, /^sep/i, /^okt/i, /^nov/i, /^dec/i], Dd = /^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;
      l.defineLocale("nl", { months: "januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"), monthsShort: function(e, n) {
        return e ? /-MMM-/.test(n) ? Dc[e.month()] : Td[e.month()] : Td;
      }, monthsRegex: Dd, monthsShortRegex: Dd, monthsStrictRegex: /^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december)/i, monthsShortStrictRegex: /^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i, monthsParse: co, longMonthsParse: co, shortMonthsParse: co, weekdays: "zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"), weekdaysShort: "zo._ma._di._wo._do._vr._za.".split("_"), weekdaysMin: "zo_ma_di_wo_do_vr_za".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD-MM-YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, calendar: { sameDay: "[vandaag om] LT", nextDay: "[morgen om] LT", nextWeek: "dddd [om] LT", lastDay: "[gisteren om] LT", lastWeek: "[afgelopen] dddd [om] LT", sameElse: "L" }, relativeTime: { future: "over %s", past: "%s geleden", s: "een paar seconden", ss: "%d seconden", m: "één minuut", mm: "%d minuten", h: "één uur", hh: "%d uur", d: "één dag", dd: "%d dagen", w: "één week", ww: "%d weken", M: "één maand", MM: "%d maanden", y: "één jaar", yy: "%d jaar" }, dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/, ordinal: function(e) {
        return e + (e === 1 || e === 8 || e >= 20 ? "ste" : "de");
      }, week: { dow: 1, doy: 4 } });
      l.defineLocale("nn", { months: "januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"), monthsShort: "jan._feb._mars_apr._mai_juni_juli_aug._sep._okt._nov._des.".split("_"), monthsParseExact: true, weekdays: "sundag_måndag_tysdag_onsdag_torsdag_fredag_laurdag".split("_"), weekdaysShort: "su._må._ty._on._to._fr._lau.".split("_"), weekdaysMin: "su_må_ty_on_to_fr_la".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY [kl.] H:mm", LLLL: "dddd D. MMMM YYYY [kl.] HH:mm" }, calendar: { sameDay: "[I dag klokka] LT", nextDay: "[I morgon klokka] LT", nextWeek: "dddd [klokka] LT", lastDay: "[I går klokka] LT", lastWeek: "[Føregåande] dddd [klokka] LT", sameElse: "L" }, relativeTime: { future: "om %s", past: "%s sidan", s: "nokre sekund", ss: "%d sekund", m: "eit minutt", mm: "%d minutt", h: "ein time", hh: "%d timar", d: "ein dag", dd: "%d dagar", w: "ei veke", ww: "%d veker", M: "ein månad", MM: "%d månader", y: "eit år", yy: "%d år" }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } });
      l.defineLocale("oc-lnc", { months: { standalone: "genièr_febrièr_març_abril_mai_junh_julhet_agost_setembre_octòbre_novembre_decembre".split("_"), format: "de genièr_de febrièr_de març_d'abril_de mai_de junh_de julhet_d'agost_de setembre_d'octòbre_de novembre_de decembre".split("_"), isFormat: /D[oD]?(\s)+MMMM/ }, monthsShort: "gen._febr._març_abr._mai_junh_julh._ago._set._oct._nov._dec.".split("_"), monthsParseExact: true, weekdays: "dimenge_diluns_dimars_dimècres_dijòus_divendres_dissabte".split("_"), weekdaysShort: "dg._dl._dm._dc._dj._dv._ds.".split("_"), weekdaysMin: "dg_dl_dm_dc_dj_dv_ds".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM [de] YYYY", ll: "D MMM YYYY", LLL: "D MMMM [de] YYYY [a] H:mm", lll: "D MMM YYYY, H:mm", LLLL: "dddd D MMMM [de] YYYY [a] H:mm", llll: "ddd D MMM YYYY, H:mm" }, calendar: { sameDay: "[uèi a] LT", nextDay: "[deman a] LT", nextWeek: "dddd [a] LT", lastDay: "[ièr a] LT", lastWeek: "dddd [passat a] LT", sameElse: "L" }, relativeTime: { future: "d'aquí %s", past: "fa %s", s: "unas segondas", ss: "%d segondas", m: "una minuta", mm: "%d minutas", h: "una ora", hh: "%d oras", d: "un jorn", dd: "%d jorns", M: "un mes", MM: "%d meses", y: "un an", yy: "%d ans" }, dayOfMonthOrdinalParse: /\d{1,2}(r|n|t|è|a)/, ordinal: function(e, n) {
        var d = e === 1 ? "r" : e === 2 ? "n" : e === 3 ? "r" : e === 4 ? "t" : "è";
        return (n === "w" || n === "W") && (d = "a"), e + d;
      }, week: { dow: 1, doy: 4 } });
      var Yc = { 1: "੧", 2: "੨", 3: "੩", 4: "੪", 5: "੫", 6: "੬", 7: "੭", 8: "੮", 9: "੯", 0: "੦" }, Cc = { "੧": "1", "੨": "2", "੩": "3", "੪": "4", "੫": "5", "੬": "6", "੭": "7", "੮": "8", "੯": "9", "੦": "0" };
      l.defineLocale("pa-in", { months: "ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ".split("_"), monthsShort: "ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ".split("_"), weekdays: "ਐਤਵਾਰ_ਸੋਮਵਾਰ_ਮੰਗਲਵਾਰ_ਬੁਧਵਾਰ_ਵੀਰਵਾਰ_ਸ਼ੁੱਕਰਵਾਰ_ਸ਼ਨੀਚਰਵਾਰ".split("_"), weekdaysShort: "ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ".split("_"), weekdaysMin: "ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ".split("_"), longDateFormat: { LT: "A h:mm ਵਜੇ", LTS: "A h:mm:ss ਵਜੇ", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, A h:mm ਵਜੇ", LLLL: "dddd, D MMMM YYYY, A h:mm ਵਜੇ" }, calendar: { sameDay: "[ਅਜ] LT", nextDay: "[ਕਲ] LT", nextWeek: "[ਅਗਲਾ] dddd, LT", lastDay: "[ਕਲ] LT", lastWeek: "[ਪਿਛਲੇ] dddd, LT", sameElse: "L" }, relativeTime: { future: "%s ਵਿੱਚ", past: "%s ਪਿਛਲੇ", s: "ਕੁਝ ਸਕਿੰਟ", ss: "%d ਸਕਿੰਟ", m: "ਇਕ ਮਿੰਟ", mm: "%d ਮਿੰਟ", h: "ਇੱਕ ਘੰਟਾ", hh: "%d ਘੰਟੇ", d: "ਇੱਕ ਦਿਨ", dd: "%d ਦਿਨ", M: "ਇੱਕ ਮਹੀਨਾ", MM: "%d ਮਹੀਨੇ", y: "ਇੱਕ ਸਾਲ", yy: "%d ਸਾਲ" }, preparse: function(e) {
        return e.replace(/[੧੨੩੪੫੬੭੮੯੦]/g, function(n) {
          return Cc[n];
        });
      }, postformat: function(e) {
        return e.replace(/\d/g, function(n) {
          return Yc[n];
        });
      }, meridiemParse: /ਰਾਤ|ਸਵੇਰ|ਦੁਪਹਿਰ|ਸ਼ਾਮ/, meridiemHour: function(e, n) {
        if (e === 12 && (e = 0), n === "ਰਾਤ") return e < 4 ? e : e + 12;
        if (n === "ਸਵੇਰ") return e;
        if (n === "ਦੁਪਹਿਰ") return e >= 10 ? e : e + 12;
        if (n === "ਸ਼ਾਮ") return e + 12;
      }, meridiem: function(e, n, d) {
        return e < 4 ? "ਰਾਤ" : e < 10 ? "ਸਵੇਰ" : e < 17 ? "ਦੁਪਹਿਰ" : e < 20 ? "ਸ਼ਾਮ" : "ਰਾਤ";
      }, week: { dow: 0, doy: 6 } });
      var Yd = "styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień".split("_"), bc = "stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia".split("_"), ei = [/^sty/i, /^lut/i, /^mar/i, /^kwi/i, /^maj/i, /^cze/i, /^lip/i, /^sie/i, /^wrz/i, /^paź/i, /^lis/i, /^gru/i];
      function Hn(e) {
        return e % 10 < 5 && e % 10 > 1 && ~~(e / 10) % 10 !== 1;
      }
      function $s(e, n, d) {
        var m = e + " ";
        switch (d) {
          case "ss":
            return m + (Hn(e) ? "sekundy" : "sekund");
          case "m":
            return n ? "minuta" : "minutę";
          case "mm":
            return m + (Hn(e) ? "minuty" : "minut");
          case "h":
            return n ? "godzina" : "godzinę";
          case "hh":
            return m + (Hn(e) ? "godziny" : "godzin");
          case "ww":
            return m + (Hn(e) ? "tygodnie" : "tygodni");
          case "MM":
            return m + (Hn(e) ? "miesiące" : "miesięcy");
          case "yy":
            return m + (Hn(e) ? "lata" : "lat");
        }
      }
      l.defineLocale("pl", { months: function(e, n) {
        return e ? /D MMMM/.test(n) ? bc[e.month()] : Yd[e.month()] : Yd;
      }, monthsShort: "sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru".split("_"), monthsParse: ei, longMonthsParse: ei, shortMonthsParse: ei, weekdays: "niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota".split("_"), weekdaysShort: "ndz_pon_wt_śr_czw_pt_sob".split("_"), weekdaysMin: "Nd_Pn_Wt_Śr_Cz_Pt_So".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[Dziś o] LT", nextDay: "[Jutro o] LT", nextWeek: function() {
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
        var m = { ss: "secunde", mm: "minute", hh: "ore", dd: "zile", ww: "săptămâni", MM: "luni", yy: "ani" }, h = " ";
        return (e % 100 >= 20 || e >= 100 && e % 100 === 0) && (h = " de "), e + h + m[d];
      }
      l.defineLocale("ro", { months: "ianuarie_februarie_martie_aprilie_mai_iunie_iulie_august_septembrie_octombrie_noiembrie_decembrie".split("_"), monthsShort: "ian._feb._mart._apr._mai_iun._iul._aug._sept._oct._nov._dec.".split("_"), monthsParseExact: true, weekdays: "duminică_luni_marți_miercuri_joi_vineri_sâmbătă".split("_"), weekdaysShort: "Dum_Lun_Mar_Mie_Joi_Vin_Sâm".split("_"), weekdaysMin: "Du_Lu_Ma_Mi_Jo_Vi_Sâ".split("_"), longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY H:mm", LLLL: "dddd, D MMMM YYYY H:mm" }, calendar: { sameDay: "[azi la] LT", nextDay: "[mâine la] LT", nextWeek: "dddd [la] LT", lastDay: "[ieri la] LT", lastWeek: "[fosta] dddd [la] LT", sameElse: "L" }, relativeTime: { future: "peste %s", past: "%s în urmă", s: "câteva secunde", ss: Pn, m: "un minut", mm: Pn, h: "o oră", hh: Pn, d: "o zi", dd: Pn, w: "o săptămână", ww: Pn, M: "o lună", MM: Pn, y: "un an", yy: Pn }, week: { dow: 1, doy: 7 } });
      function Sc(e, n) {
        var d = e.split("_");
        return n % 10 === 1 && n % 100 !== 11 ? d[0] : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? d[1] : d[2];
      }
      function fn(e, n, d) {
        var m = { ss: n ? "секунда_секунды_секунд" : "секунду_секунды_секунд", mm: n ? "минута_минуты_минут" : "минуту_минуты_минут", hh: "час_часа_часов", dd: "день_дня_дней", ww: "неделя_недели_недель", MM: "месяц_месяца_месяцев", yy: "год_года_лет" };
        return d === "m" ? n ? "минута" : "минуту" : e + " " + Sc(m[d], +e);
      }
      var ti = [/^янв/i, /^фев/i, /^мар/i, /^апр/i, /^ма[йя]/i, /^июн/i, /^июл/i, /^авг/i, /^сен/i, /^окт/i, /^ноя/i, /^дек/i];
      l.defineLocale("ru", { months: { format: "января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря".split("_"), standalone: "январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_") }, monthsShort: { format: "янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.".split("_"), standalone: "янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.".split("_") }, weekdays: { standalone: "воскресенье_понедельник_вторник_среда_четверг_пятница_суббота".split("_"), format: "воскресенье_понедельник_вторник_среду_четверг_пятницу_субботу".split("_"), isFormat: /\[ ?[Вв] ?(?:прошлую|следующую|эту)? ?] ?dddd/ }, weekdaysShort: "вс_пн_вт_ср_чт_пт_сб".split("_"), weekdaysMin: "вс_пн_вт_ср_чт_пт_сб".split("_"), monthsParse: ti, longMonthsParse: ti, shortMonthsParse: ti, monthsRegex: /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i, monthsShortRegex: /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i, monthsStrictRegex: /^(январ[яь]|феврал[яь]|марта?|апрел[яь]|ма[яй]|июн[яь]|июл[яь]|августа?|сентябр[яь]|октябр[яь]|ноябр[яь]|декабр[яь])/i, monthsShortStrictRegex: /^(янв\.|февр?\.|мар[т.]|апр\.|ма[яй]|июн[ья.]|июл[ья.]|авг\.|сент?\.|окт\.|нояб?\.|дек\.)/i, longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY г.", LLL: "D MMMM YYYY г., H:mm", LLLL: "dddd, D MMMM YYYY г., H:mm" }, calendar: { sameDay: "[Сегодня, в] LT", nextDay: "[Завтра, в] LT", lastDay: "[Вчера, в] LT", nextWeek: function(e) {
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
      }, sameElse: "L" }, relativeTime: { future: "через %s", past: "%s назад", s: "несколько секунд", ss: fn, m: fn, mm: fn, h: "час", hh: fn, d: "день", dd: fn, w: "неделя", ww: fn, M: "месяц", MM: fn, y: "год", yy: fn }, meridiemParse: /ночи|утра|дня|вечера/i, isPM: function(e) {
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
      var Cd = ["جنوري", "فيبروري", "مارچ", "اپريل", "مئي", "جون", "جولاءِ", "آگسٽ", "سيپٽمبر", "آڪٽوبر", "نومبر", "ڊسمبر"], go = ["آچر", "سومر", "اڱارو", "اربع", "خميس", "جمع", "ڇنڇر"];
      l.defineLocale("sd", { months: Cd, monthsShort: Cd, weekdays: go, weekdaysShort: go, weekdaysMin: go, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd، D MMMM YYYY HH:mm" }, meridiemParse: /صبح|شام/, isPM: function(e) {
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
      var Fc = "január_február_marec_apríl_máj_jún_júl_august_september_október_november_december".split("_"), xc = "jan_feb_mar_apr_máj_jún_júl_aug_sep_okt_nov_dec".split("_");
      function La(e) {
        return e > 1 && e < 5;
      }
      function Gt(e, n, d, m) {
        var h = e + " ";
        switch (d) {
          case "s":
            return n || m ? "pár sekúnd" : "pár sekundami";
          case "ss":
            return n || m ? h + (La(e) ? "sekundy" : "sekúnd") : h + "sekundami";
          case "m":
            return n ? "minúta" : m ? "minútu" : "minútou";
          case "mm":
            return n || m ? h + (La(e) ? "minúty" : "minút") : h + "minútami";
          case "h":
            return n ? "hodina" : m ? "hodinu" : "hodinou";
          case "hh":
            return n || m ? h + (La(e) ? "hodiny" : "hodín") : h + "hodinami";
          case "d":
            return n || m ? "deň" : "dňom";
          case "dd":
            return n || m ? h + (La(e) ? "dni" : "dní") : h + "dňami";
          case "M":
            return n || m ? "mesiac" : "mesiacom";
          case "MM":
            return n || m ? h + (La(e) ? "mesiace" : "mesiacov") : h + "mesiacmi";
          case "y":
            return n || m ? "rok" : "rokom";
          case "yy":
            return n || m ? h + (La(e) ? "roky" : "rokov") : h + "rokmi";
        }
      }
      l.defineLocale("sk", { months: Fc, monthsShort: xc, weekdays: "nedeľa_pondelok_utorok_streda_štvrtok_piatok_sobota".split("_"), weekdaysShort: "ne_po_ut_st_št_pi_so".split("_"), weekdaysMin: "ne_po_ut_st_št_pi_so".split("_"), longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY H:mm", LLLL: "dddd D. MMMM YYYY H:mm" }, calendar: { sameDay: "[dnes o] LT", nextDay: "[zajtra o] LT", nextWeek: function() {
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
      function Ie(e, n, d, m) {
        var h = e + " ";
        switch (d) {
          case "s":
            return n || m ? "nekaj sekund" : "nekaj sekundami";
          case "ss":
            return e === 1 ? h += n ? "sekundo" : "sekundi" : e === 2 ? h += n || m ? "sekundi" : "sekundah" : e < 5 ? h += n || m ? "sekunde" : "sekundah" : h += "sekund", h;
          case "m":
            return n ? "ena minuta" : "eno minuto";
          case "mm":
            return e === 1 ? h += n ? "minuta" : "minuto" : e === 2 ? h += n || m ? "minuti" : "minutama" : e < 5 ? h += n || m ? "minute" : "minutami" : h += n || m ? "minut" : "minutami", h;
          case "h":
            return n ? "ena ura" : "eno uro";
          case "hh":
            return e === 1 ? h += n ? "ura" : "uro" : e === 2 ? h += n || m ? "uri" : "urama" : e < 5 ? h += n || m ? "ure" : "urami" : h += n || m ? "ur" : "urami", h;
          case "d":
            return n || m ? "en dan" : "enim dnem";
          case "dd":
            return e === 1 ? h += n || m ? "dan" : "dnem" : e === 2 ? h += n || m ? "dni" : "dnevoma" : h += n || m ? "dni" : "dnevi", h;
          case "M":
            return n || m ? "en mesec" : "enim mesecem";
          case "MM":
            return e === 1 ? h += n || m ? "mesec" : "mesecem" : e === 2 ? h += n || m ? "meseca" : "mesecema" : e < 5 ? h += n || m ? "mesece" : "meseci" : h += n || m ? "mesecev" : "meseci", h;
          case "y":
            return n || m ? "eno leto" : "enim letom";
          case "yy":
            return e === 1 ? h += n || m ? "leto" : "letom" : e === 2 ? h += n || m ? "leti" : "letoma" : e < 5 ? h += n || m ? "leta" : "leti" : h += n || m ? "let" : "leti", h;
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
      }, translate: function(e, n, d, m) {
        var h = Ht.words[d], k;
        return d.length === 1 ? d === "y" && n ? "једна година" : m || n ? h[0] : h[1] : (k = Ht.correctGrammaticalCase(e, h), d === "yy" && n && k === "годину" ? e + " година" : e + " " + k);
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
      }, translate: function(e, n, d, m) {
        var h = Pt.words[d], k;
        return d.length === 1 ? d === "y" && n ? "jedna godina" : m || n ? h[0] : h[1] : (k = Pt.correctGrammaticalCase(e, h), d === "yy" && n && k === "godinu" ? e + " godina" : e + " " + k);
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
      var Nc = { 1: "௧", 2: "௨", 3: "௩", 4: "௪", 5: "௫", 6: "௬", 7: "௭", 8: "௮", 9: "௯", 0: "௦" }, bd = { "௧": "1", "௨": "2", "௩": "3", "௪": "4", "௫": "5", "௬": "6", "௭": "7", "௮": "8", "௯": "9", "௦": "0" };
      l.defineLocale("ta", { months: "ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்".split("_"), monthsShort: "ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்".split("_"), weekdays: "ஞாயிற்றுக்கிழமை_திங்கட்கிழமை_செவ்வாய்கிழமை_புதன்கிழமை_வியாழக்கிழமை_வெள்ளிக்கிழமை_சனிக்கிழமை".split("_"), weekdaysShort: "ஞாயிறு_திங்கள்_செவ்வாய்_புதன்_வியாழன்_வெள்ளி_சனி".split("_"), weekdaysMin: "ஞா_தி_செ_பு_வி_வெ_ச".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, HH:mm", LLLL: "dddd, D MMMM YYYY, HH:mm" }, calendar: { sameDay: "[இன்று] LT", nextDay: "[நாளை] LT", nextWeek: "dddd, LT", lastDay: "[நேற்று] LT", lastWeek: "[கடந்த வாரம்] dddd, LT", sameElse: "L" }, relativeTime: { future: "%s இல்", past: "%s முன்", s: "ஒரு சில விநாடிகள்", ss: "%d விநாடிகள்", m: "ஒரு நிமிடம்", mm: "%d நிமிடங்கள்", h: "ஒரு மணி நேரம்", hh: "%d மணி நேரம்", d: "ஒரு நாள்", dd: "%d நாட்கள்", M: "ஒரு மாதம்", MM: "%d மாதங்கள்", y: "ஒரு வருடம்", yy: "%d ஆண்டுகள்" }, dayOfMonthOrdinalParse: /\d{1,2}வது/, ordinal: function(e) {
        return e + "வது";
      }, preparse: function(e) {
        return e.replace(/[௧௨௩௪௫௬௭௮௯௦]/g, function(n) {
          return bd[n];
        });
      }, postformat: function(e) {
        return e.replace(/\d/g, function(n) {
          return Nc[n];
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
      var ho = { 0: "-ум", 1: "-ум", 2: "-юм", 3: "-юм", 4: "-ум", 5: "-ум", 6: "-ум", 7: "-ум", 8: "-ум", 9: "-ум", 10: "-ум", 12: "-ум", 13: "-ум", 20: "-ум", 30: "-юм", 40: "-ум", 50: "-ум", 60: "-ум", 70: "-ум", 80: "-ум", 90: "-ум", 100: "-ум" };
      l.defineLocale("tg", { months: { format: "январи_феврали_марти_апрели_майи_июни_июли_августи_сентябри_октябри_ноябри_декабри".split("_"), standalone: "январ_феврал_март_апрел_май_июн_июл_август_сентябр_октябр_ноябр_декабр".split("_") }, monthsShort: "янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек".split("_"), weekdays: "якшанбе_душанбе_сешанбе_чоршанбе_панҷшанбе_ҷумъа_шанбе".split("_"), weekdaysShort: "яшб_дшб_сшб_чшб_пшб_ҷум_шнб".split("_"), weekdaysMin: "яш_дш_сш_чш_пш_ҷм_шб".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[Имрӯз соати] LT", nextDay: "[Фардо соати] LT", lastDay: "[Дирӯз соати] LT", nextWeek: "dddd[и] [ҳафтаи оянда соати] LT", lastWeek: "dddd[и] [ҳафтаи гузашта соати] LT", sameElse: "L" }, relativeTime: { future: "баъди %s", past: "%s пеш", s: "якчанд сония", m: "як дақиқа", mm: "%d дақиқа", h: "як соат", hh: "%d соат", d: "як рӯз", dd: "%d рӯз", M: "як моҳ", MM: "%d моҳ", y: "як сол", yy: "%d сол" }, meridiemParse: /шаб|субҳ|рӯз|бегоҳ/, meridiemHour: function(e, n) {
        if (e === 12 && (e = 0), n === "шаб") return e < 4 ? e : e + 12;
        if (n === "субҳ") return e;
        if (n === "рӯз") return e >= 11 ? e : e + 12;
        if (n === "бегоҳ") return e + 12;
      }, meridiem: function(e, n, d) {
        return e < 4 ? "шаб" : e < 11 ? "субҳ" : e < 16 ? "рӯз" : e < 19 ? "бегоҳ" : "шаб";
      }, dayOfMonthOrdinalParse: /\d{1,2}-(ум|юм)/, ordinal: function(e) {
        var n = e % 10, d = e >= 100 ? 100 : null;
        return e + (ho[e] || ho[n] || ho[d]);
      }, week: { dow: 1, doy: 7 } });
      l.defineLocale("th", { months: "มกราคม_กุมภาพันธ์_มีนาคม_เมษายน_พฤษภาคม_มิถุนายน_กรกฎาคม_สิงหาคม_กันยายน_ตุลาคม_พฤศจิกายน_ธันวาคม".split("_"), monthsShort: "ม.ค._ก.พ._มี.ค._เม.ย._พ.ค._มิ.ย._ก.ค._ส.ค._ก.ย._ต.ค._พ.ย._ธ.ค.".split("_"), monthsParseExact: true, weekdays: "อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัสบดี_ศุกร์_เสาร์".split("_"), weekdaysShort: "อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัส_ศุกร์_เสาร์".split("_"), weekdaysMin: "อา._จ._อ._พ._พฤ._ศ._ส.".split("_"), weekdaysParseExact: true, longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY เวลา H:mm", LLLL: "วันddddที่ D MMMM YYYY เวลา H:mm" }, meridiemParse: /ก่อนเที่ยง|หลังเที่ยง/, isPM: function(e) {
        return e === "หลังเที่ยง";
      }, meridiem: function(e, n, d) {
        return e < 12 ? "ก่อนเที่ยง" : "หลังเที่ยง";
      }, calendar: { sameDay: "[วันนี้ เวลา] LT", nextDay: "[พรุ่งนี้ เวลา] LT", nextWeek: "dddd[หน้า เวลา] LT", lastDay: "[เมื่อวานนี้ เวลา] LT", lastWeek: "[วัน]dddd[ที่แล้ว เวลา] LT", sameElse: "L" }, relativeTime: { future: "อีก %s", past: "%sที่แล้ว", s: "ไม่กี่วินาที", ss: "%d วินาที", m: "1 นาที", mm: "%d นาที", h: "1 ชั่วโมง", hh: "%d ชั่วโมง", d: "1 วัน", dd: "%d วัน", w: "1 สัปดาห์", ww: "%d สัปดาห์", M: "1 เดือน", MM: "%d เดือน", y: "1 ปี", yy: "%d ปี" } });
      var fo = { 1: "'inji", 5: "'inji", 8: "'inji", 70: "'inji", 80: "'inji", 2: "'nji", 7: "'nji", 20: "'nji", 50: "'nji", 3: "'ünji", 4: "'ünji", 100: "'ünji", 6: "'njy", 9: "'unjy", 10: "'unjy", 30: "'unjy", 60: "'ynjy", 90: "'ynjy" };
      l.defineLocale("tk", { months: "Ýanwar_Fewral_Mart_Aprel_Maý_Iýun_Iýul_Awgust_Sentýabr_Oktýabr_Noýabr_Dekabr".split("_"), monthsShort: "Ýan_Few_Mar_Apr_Maý_Iýn_Iýl_Awg_Sen_Okt_Noý_Dek".split("_"), weekdays: "Ýekşenbe_Duşenbe_Sişenbe_Çarşenbe_Penşenbe_Anna_Şenbe".split("_"), weekdaysShort: "Ýek_Duş_Siş_Çar_Pen_Ann_Şen".split("_"), weekdaysMin: "Ýk_Dş_Sş_Çr_Pn_An_Şn".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[bugün sagat] LT", nextDay: "[ertir sagat] LT", nextWeek: "[indiki] dddd [sagat] LT", lastDay: "[düýn] LT", lastWeek: "[geçen] dddd [sagat] LT", sameElse: "L" }, relativeTime: { future: "%s soň", past: "%s öň", s: "birnäçe sekunt", m: "bir minut", mm: "%d minut", h: "bir sagat", hh: "%d sagat", d: "bir gün", dd: "%d gün", M: "bir aý", MM: "%d aý", y: "bir ýyl", yy: "%d ýyl" }, ordinal: function(e, n) {
        switch (n) {
          case "d":
          case "D":
          case "Do":
          case "DD":
            return e;
          default:
            if (e === 0) return e + "'unjy";
            var d = e % 10, m = e % 100 - d, h = e >= 100 ? 100 : null;
            return e + (fo[d] || fo[m] || fo[h]);
        }
      }, week: { dow: 1, doy: 7 } });
      l.defineLocale("tl-ph", { months: "Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre".split("_"), monthsShort: "Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis".split("_"), weekdays: "Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado".split("_"), weekdaysShort: "Lin_Lun_Mar_Miy_Huw_Biy_Sab".split("_"), weekdaysMin: "Li_Lu_Ma_Mi_Hu_Bi_Sab".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "MM/D/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY HH:mm", LLLL: "dddd, MMMM DD, YYYY HH:mm" }, calendar: { sameDay: "LT [ngayong araw]", nextDay: "[Bukas ng] LT", nextWeek: "LT [sa susunod na] dddd", lastDay: "LT [kahapon]", lastWeek: "LT [noong nakaraang] dddd", sameElse: "L" }, relativeTime: { future: "sa loob ng %s", past: "%s ang nakalipas", s: "ilang segundo", ss: "%d segundo", m: "isang minuto", mm: "%d minuto", h: "isang oras", hh: "%d oras", d: "isang araw", dd: "%d araw", M: "isang buwan", MM: "%d buwan", y: "isang taon", yy: "%d taon" }, dayOfMonthOrdinalParse: /\d{1,2}/, ordinal: function(e) {
        return e;
      }, week: { dow: 1, doy: 4 } });
      var _o = "pagh_wa’_cha’_wej_loS_vagh_jav_Soch_chorgh_Hut".split("_");
      function Ac(e) {
        var n = e;
        return n = e.indexOf("jaj") !== -1 ? n.slice(0, -3) + "leS" : e.indexOf("jar") !== -1 ? n.slice(0, -3) + "waQ" : e.indexOf("DIS") !== -1 ? n.slice(0, -3) + "nem" : n + " pIq", n;
      }
      function po(e) {
        var n = e;
        return n = e.indexOf("jaj") !== -1 ? n.slice(0, -3) + "Hu’" : e.indexOf("jar") !== -1 ? n.slice(0, -3) + "wen" : e.indexOf("DIS") !== -1 ? n.slice(0, -3) + "ben" : n + " ret", n;
      }
      function ka(e, n, d, m) {
        var h = Ec(e);
        switch (d) {
          case "ss":
            return h + " lup";
          case "mm":
            return h + " tup";
          case "hh":
            return h + " rep";
          case "dd":
            return h + " jaj";
          case "MM":
            return h + " jar";
          case "yy":
            return h + " DIS";
        }
      }
      function Ec(e) {
        var n = Math.floor(e % 1e3 / 100), d = Math.floor(e % 100 / 10), m = e % 10, h = "";
        return n > 0 && (h += _o[n] + "vatlh"), d > 0 && (h += (h !== "" ? " " : "") + _o[d] + "maH"), m > 0 && (h += (h !== "" ? " " : "") + _o[m]), h === "" ? "pagh" : h;
      }
      l.defineLocale("tlh", { months: "tera’ jar wa’_tera’ jar cha’_tera’ jar wej_tera’ jar loS_tera’ jar vagh_tera’ jar jav_tera’ jar Soch_tera’ jar chorgh_tera’ jar Hut_tera’ jar wa’maH_tera’ jar wa’maH wa’_tera’ jar wa’maH cha’".split("_"), monthsShort: "jar wa’_jar cha’_jar wej_jar loS_jar vagh_jar jav_jar Soch_jar chorgh_jar Hut_jar wa’maH_jar wa’maH wa’_jar wa’maH cha’".split("_"), monthsParseExact: true, weekdays: "lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"), weekdaysShort: "lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"), weekdaysMin: "lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[DaHjaj] LT", nextDay: "[wa’leS] LT", nextWeek: "LLL", lastDay: "[wa’Hu’] LT", lastWeek: "LLL", sameElse: "L" }, relativeTime: { future: Ac, past: po, s: "puS lup", ss: ka, m: "wa’ tup", mm: ka, h: "wa’ rep", hh: ka, d: "wa’ jaj", dd: ka, M: "wa’ jar", MM: ka, y: "wa’ DIS", yy: ka }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } });
      var yo = { 1: "'inci", 5: "'inci", 8: "'inci", 70: "'inci", 80: "'inci", 2: "'nci", 7: "'nci", 20: "'nci", 50: "'nci", 3: "'üncü", 4: "'üncü", 100: "'üncü", 6: "'ncı", 9: "'uncu", 10: "'uncu", 30: "'uncu", 60: "'ıncı", 90: "'ıncı" };
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
            var d = e % 10, m = e % 100 - d, h = e >= 100 ? 100 : null;
            return e + (yo[d] || yo[m] || yo[h]);
        }
      }, week: { dow: 1, doy: 7 } });
      l.defineLocale("tzl", { months: "Januar_Fevraglh_Març_Avrïu_Mai_Gün_Julia_Guscht_Setemvar_Listopäts_Noemvar_Zecemvar".split("_"), monthsShort: "Jan_Fev_Mar_Avr_Mai_Gün_Jul_Gus_Set_Lis_Noe_Zec".split("_"), weekdays: "Súladi_Lúneçi_Maitzi_Márcuri_Xhúadi_Viénerçi_Sáturi".split("_"), weekdaysShort: "Súl_Lún_Mai_Már_Xhú_Vié_Sát".split("_"), weekdaysMin: "Sú_Lú_Ma_Má_Xh_Vi_Sá".split("_"), longDateFormat: { LT: "HH.mm", LTS: "HH.mm.ss", L: "DD.MM.YYYY", LL: "D. MMMM [dallas] YYYY", LLL: "D. MMMM [dallas] YYYY HH.mm", LLLL: "dddd, [li] D. MMMM [dallas] YYYY HH.mm" }, meridiemParse: /d\'o|d\'a/i, isPM: function(e) {
        return e.toLowerCase() === "d'o";
      }, meridiem: function(e, n, d) {
        return e > 11 ? d ? "d'o" : "D'O" : d ? "d'a" : "D'A";
      }, calendar: { sameDay: "[oxhi à] LT", nextDay: "[demà à] LT", nextWeek: "dddd [à] LT", lastDay: "[ieiri à] LT", lastWeek: "[sür el] dddd [lasteu à] LT", sameElse: "L" }, relativeTime: { future: "osprei %s", past: "ja%s", s: Vt, ss: Vt, m: Vt, mm: Vt, h: Vt, hh: Vt, d: Vt, dd: Vt, M: Vt, MM: Vt, y: Vt, yy: Vt }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } });
      function Vt(e, n, d, m) {
        var h = { s: ["viensas secunds", "'iensas secunds"], ss: [e + " secunds", "" + e + " secunds"], m: ["'n míut", "'iens míut"], mm: [e + " míuts", "" + e + " míuts"], h: ["'n þora", "'iensa þora"], hh: [e + " þoras", "" + e + " þoras"], d: ["'n ziua", "'iensa ziua"], dd: [e + " ziuas", "" + e + " ziuas"], M: ["'n mes", "'iens mes"], MM: [e + " mesen", "" + e + " mesen"], y: ["'n ar", "'iens ar"], yy: [e + " ars", "" + e + " ars"] };
        return m || n ? h[d][0] : h[d][1];
      }
      l.defineLocale("tzm-latn", { months: "innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir".split("_"), monthsShort: "innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir".split("_"), weekdays: "asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"), weekdaysShort: "asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"), weekdaysMin: "asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, calendar: { sameDay: "[asdkh g] LT", nextDay: "[aska g] LT", nextWeek: "dddd [g] LT", lastDay: "[assant g] LT", lastWeek: "dddd [g] LT", sameElse: "L" }, relativeTime: { future: "dadkh s yan %s", past: "yan %s", s: "imik", ss: "%d imik", m: "minuḍ", mm: "%d minuḍ", h: "saɛa", hh: "%d tassaɛin", d: "ass", dd: "%d ossan", M: "ayowr", MM: "%d iyyirn", y: "asgas", yy: "%d isgasn" }, week: { dow: 6, doy: 12 } });
      l.defineLocale("tzm", { months: "ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ".split("_"), monthsShort: "ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ".split("_"), weekdays: "ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"), weekdaysShort: "ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"), weekdaysMin: "ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, calendar: { sameDay: "[ⴰⵙⴷⵅ ⴴ] LT", nextDay: "[ⴰⵙⴽⴰ ⴴ] LT", nextWeek: "dddd [ⴴ] LT", lastDay: "[ⴰⵚⴰⵏⵜ ⴴ] LT", lastWeek: "dddd [ⴴ] LT", sameElse: "L" }, relativeTime: { future: "ⴷⴰⴷⵅ ⵙ ⵢⴰⵏ %s", past: "ⵢⴰⵏ %s", s: "ⵉⵎⵉⴽ", ss: "%d ⵉⵎⵉⴽ", m: "ⵎⵉⵏⵓⴺ", mm: "%d ⵎⵉⵏⵓⴺ", h: "ⵙⴰⵄⴰ", hh: "%d ⵜⴰⵙⵙⴰⵄⵉⵏ", d: "ⴰⵙⵙ", dd: "%d oⵙⵙⴰⵏ", M: "ⴰⵢoⵓⵔ", MM: "%d ⵉⵢⵢⵉⵔⵏ", y: "ⴰⵙⴳⴰⵙ", yy: "%d ⵉⵙⴳⴰⵙⵏ" }, week: { dow: 6, doy: 12 } });
      l.defineLocale("ug-cn", { months: "يانۋار_فېۋرال_مارت_ئاپرېل_ماي_ئىيۇن_ئىيۇل_ئاۋغۇست_سېنتەبىر_ئۆكتەبىر_نويابىر_دېكابىر".split("_"), monthsShort: "يانۋار_فېۋرال_مارت_ئاپرېل_ماي_ئىيۇن_ئىيۇل_ئاۋغۇست_سېنتەبىر_ئۆكتەبىر_نويابىر_دېكابىر".split("_"), weekdays: "يەكشەنبە_دۈشەنبە_سەيشەنبە_چارشەنبە_پەيشەنبە_جۈمە_شەنبە".split("_"), weekdaysShort: "يە_دۈ_سە_چا_پە_جۈ_شە".split("_"), weekdaysMin: "يە_دۈ_سە_چا_پە_جۈ_شە".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY-MM-DD", LL: "YYYY-يىلىM-ئاينىڭD-كۈنى", LLL: "YYYY-يىلىM-ئاينىڭD-كۈنى، HH:mm", LLLL: "dddd، YYYY-يىلىM-ئاينىڭD-كۈنى، HH:mm" }, meridiemParse: /يېرىم كېچە|سەھەر|چۈشتىن بۇرۇن|چۈش|چۈشتىن كېيىن|كەچ/, meridiemHour: function(e, n) {
        return e === 12 && (e = 0), n === "يېرىم كېچە" || n === "سەھەر" || n === "چۈشتىن بۇرۇن" ? e : n === "چۈشتىن كېيىن" || n === "كەچ" ? e + 12 : e >= 11 ? e : e + 12;
      }, meridiem: function(e, n, d) {
        var m = e * 100 + n;
        return m < 600 ? "يېرىم كېچە" : m < 900 ? "سەھەر" : m < 1130 ? "چۈشتىن بۇرۇن" : m < 1230 ? "چۈش" : m < 1800 ? "چۈشتىن كېيىن" : "كەچ";
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
      function Hc(e, n) {
        var d = e.split("_");
        return n % 10 === 1 && n % 100 !== 11 ? d[0] : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? d[1] : d[2];
      }
      function jn(e, n, d) {
        var m = { ss: n ? "секунда_секунди_секунд" : "секунду_секунди_секунд", mm: n ? "хвилина_хвилини_хвилин" : "хвилину_хвилини_хвилин", hh: n ? "година_години_годин" : "годину_години_годин", dd: "день_дні_днів", MM: "місяць_місяці_місяців", yy: "рік_роки_років" };
        return d === "m" ? n ? "хвилина" : "хвилину" : d === "h" ? n ? "година" : "годину" : e + " " + Hc(m[d], +e);
      }
      function Pc(e, n) {
        var d = { nominative: "неділя_понеділок_вівторок_середа_четвер_п’ятниця_субота".split("_"), accusative: "неділю_понеділок_вівторок_середу_четвер_п’ятницю_суботу".split("_"), genitive: "неділі_понеділка_вівторка_середи_четверга_п’ятниці_суботи".split("_") }, m;
        return e === true ? d.nominative.slice(1, 7).concat(d.nominative.slice(0, 1)) : e ? (m = /(\[[ВвУу]\]) ?dddd/.test(n) ? "accusative" : /\[?(?:минулої|наступної)? ?\] ?dddd/.test(n) ? "genitive" : "nominative", d[m][e.day()]) : d.nominative;
      }
      function Ta(e) {
        return function() {
          return e + "о" + (this.hours() === 11 ? "б" : "") + "] LT";
        };
      }
      l.defineLocale("uk", { months: { format: "січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня".split("_"), standalone: "січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень".split("_") }, monthsShort: "січ_лют_бер_квіт_трав_черв_лип_серп_вер_жовт_лист_груд".split("_"), weekdays: Pc, weekdaysShort: "нд_пн_вт_ср_чт_пт_сб".split("_"), weekdaysMin: "нд_пн_вт_ср_чт_пт_сб".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY р.", LLL: "D MMMM YYYY р., HH:mm", LLLL: "dddd, D MMMM YYYY р., HH:mm" }, calendar: { sameDay: Ta("[Сьогодні "), nextDay: Ta("[Завтра "), lastDay: Ta("[Вчора "), nextWeek: Ta("[У] dddd ["), lastWeek: function() {
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
      var Sd = ["جنوری", "فروری", "مارچ", "اپریل", "مئی", "جون", "جولائی", "اگست", "ستمبر", "اکتوبر", "نومبر", "دسمبر"], vo = ["اتوار", "پیر", "منگل", "بدھ", "جمعرات", "جمعہ", "ہفتہ"];
      l.defineLocale("ur", { months: Sd, monthsShort: Sd, weekdays: vo, weekdaysShort: vo, weekdaysMin: vo, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd، D MMMM YYYY HH:mm" }, meridiemParse: /صبح|شام/, isPM: function(e) {
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
        var m = e * 100 + n;
        return m < 600 ? "凌晨" : m < 900 ? "早上" : m < 1130 ? "上午" : m < 1230 ? "中午" : m < 1800 ? "下午" : "晚上";
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
        var m = e * 100 + n;
        return m < 600 ? "凌晨" : m < 900 ? "早上" : m < 1200 ? "上午" : m === 1200 ? "中午" : m < 1800 ? "下午" : "晚上";
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
        var m = e * 100 + n;
        return m < 600 ? "凌晨" : m < 900 ? "早上" : m < 1130 ? "上午" : m < 1230 ? "中午" : m < 1800 ? "下午" : "晚上";
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
        var m = e * 100 + n;
        return m < 600 ? "凌晨" : m < 900 ? "早上" : m < 1130 ? "上午" : m < 1230 ? "中午" : m < 1800 ? "下午" : "晚上";
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
  })(em)), em.exports;
}
var rL = aL();
const bs = Kc(rL), ai = $w(), sp = { ar: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["ثوانٍ"] } } } }, ast: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["segundos"] } } } }, az: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["saniyə"] } } } }, be: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["секунды"] } } } }, br: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["eilennoù"] } } } }, ca: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["segons"] } } } }, cs: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["sekund(y)"] } } } }, cs_CZ: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["sekund(y)"] } } } }, da: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["sekunder"] } } } }, de: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["Sekunden"] } } } }, de_DE: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["Sekunden"] } } } }, el: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["δευτερόλεπτα"] } } } }, en_GB: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["seconds"] } } } }, eo: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["sekundoj"] } } } }, es: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["segundos"] } } } }, es_AR: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["segundos"] } } } }, es_CL: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["segundos"] } } } }, es_MX: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["segundos"] } } } }, et_EE: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["sekundid"] } } } }, eu: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["segundo"] } } } }, fa: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["ثانیه"] } } } }, fi: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["sekuntia"] } } } }, fi_FI: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["sekuntia"] } } } }, fr: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["secondes"] } } } }, ga: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["soicindí"] } } } }, gl: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["segundos"] } } } }, he: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["שניות"] } } } }, hr: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["sekunde"] } } } }, hu: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["másodperc"] } } } }, hu_HU: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["másodperc"] } } } }, id: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["detik"] } } } }, is: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["sekúndur"] } } } }, it: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["secondi"] } } } }, ja: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["秒後"] } } } }, ja_JP: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["秒"] } } } }, kab: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["tasinin"] } } } }, ko: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["초"] } } } }, lo: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["ວິນາທີ"] } } } }, lt_LT: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["sek."] } } } }, lv: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["sekundes"] } } } }, mk: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["секунди"] } } } }, mn: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["секунд"] } } } }, ms_MY: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["saat"] } } } }, my: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["စက္ကန့်"] } } } }, nb: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["sekunder"] } } } }, nb_NO: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["sekunder"] } } } }, nl: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["seconden"] } } } }, oc: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["segondas"] } } } }, pl: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["sekundy"] } } } }, pt_BR: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["segundos"] } } } }, pt_PT: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["segundos"] } } } }, ro: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["secunde"] } } } }, ru: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["секунды"] } } } }, si: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["තත්පර"] } } } }, sk: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["sekúnd"] } } } }, sk_SK: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["sekundy"] } } } }, sl: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["sekunde"] } } } }, sq: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["sekonda"] } } } }, sr: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["секунде"] } } } }, sv: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["sekunder"] } } } }, th_TH: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["วินาที"] } } } }, tr: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["saniye"] } } } }, uk: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["секунд"] } } } }, uz: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["ikkinchi"] } } } }, vi: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["giây"] } } } }, zh_CN: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["秒"] } } } }, zh_HK: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["秒"] } } } }, zh_TW: { charset: "utf-8", translations: { "": { seconds: { msgid: "seconds", msgstr: ["秒"] } } } } };
if (bs.locale(ai), ai === "en" && bs.updateLocale(bs.locale(), { relativeTime: { s: "seconds" } }), ai in sp) {
  const s = b_().setLanguage(ai).addTranslation(ai, sp[ai]).build();
  bs.updateLocale(bs.locale(), { relativeTime: { s: s.gettext("seconds") } });
}
var tm = { exports: {} };
var iL = tm.exports, np;
function oL() {
  return np || (np = 1, (function(s) {
    (function(i, r) {
      s.exports ? s.exports = r() : i.Toastify = r();
    })(iL, function(i) {
      var r = function(f) {
        return new r.lib.init(f);
      }, l = "1.12.0";
      r.defaults = { oldestFirst: true, text: "Toastify is awesome!", node: void 0, duration: 3e3, selector: void 0, callback: function() {
      }, destination: void 0, newWindow: false, close: false, gravity: "toastify-top", positionLeft: false, position: "", backgroundColor: "", avatar: "", className: "", stopOnFocus: true, onClick: function() {
      }, offset: { x: 0, y: 0 }, escapeMarkup: true, ariaLive: "polite", style: { background: "" } }, r.lib = r.prototype = { toastify: l, constructor: r, init: function(f) {
        return f || (f = {}), this.options = {}, this.toastElement = null, this.options.text = f.text || r.defaults.text, this.options.node = f.node || r.defaults.node, this.options.duration = f.duration === 0 ? 0 : f.duration || r.defaults.duration, this.options.selector = f.selector || r.defaults.selector, this.options.callback = f.callback || r.defaults.callback, this.options.destination = f.destination || r.defaults.destination, this.options.newWindow = f.newWindow || r.defaults.newWindow, this.options.close = f.close || r.defaults.close, this.options.gravity = f.gravity === "bottom" ? "toastify-bottom" : r.defaults.gravity, this.options.positionLeft = f.positionLeft || r.defaults.positionLeft, this.options.position = f.position || r.defaults.position, this.options.backgroundColor = f.backgroundColor || r.defaults.backgroundColor, this.options.avatar = f.avatar || r.defaults.avatar, this.options.className = f.className || r.defaults.className, this.options.stopOnFocus = f.stopOnFocus === void 0 ? r.defaults.stopOnFocus : f.stopOnFocus, this.options.onClick = f.onClick || r.defaults.onClick, this.options.offset = f.offset || r.defaults.offset, this.options.escapeMarkup = f.escapeMarkup !== void 0 ? f.escapeMarkup : r.defaults.escapeMarkup, this.options.ariaLive = f.ariaLive || r.defaults.ariaLive, this.options.style = f.style || r.defaults.style, f.backgroundColor && (this.options.style.background = f.backgroundColor), this;
      }, buildToast: function() {
        if (!this.options) throw "Toastify is not initialized";
        var f = document.createElement("div");
        f.className = "toastify on " + this.options.className, this.options.position ? f.className += " toastify-" + this.options.position : this.options.positionLeft === true ? (f.className += " toastify-left", console.warn("Property `positionLeft` will be depreciated in further versions. Please use `position` instead.")) : f.className += " toastify-right", f.className += " " + this.options.gravity, this.options.backgroundColor && console.warn('DEPRECATION NOTICE: "backgroundColor" is being deprecated. Please use the "style.background" property.');
        for (var p in this.options.style) f.style[p] = this.options.style[p];
        if (this.options.ariaLive && f.setAttribute("aria-live", this.options.ariaLive), this.options.node && this.options.node.nodeType === Node.ELEMENT_NODE) f.appendChild(this.options.node);
        else if (this.options.escapeMarkup ? f.innerText = this.options.text : f.innerHTML = this.options.text, this.options.avatar !== "") {
          var L = document.createElement("img");
          L.src = this.options.avatar, L.className = "toastify-avatar", this.options.position == "left" || this.options.positionLeft === true ? f.appendChild(L) : f.insertAdjacentElement("afterbegin", L);
        }
        if (this.options.close === true) {
          var w = document.createElement("button");
          w.type = "button", w.setAttribute("aria-label", "Close"), w.className = "toast-close", w.innerHTML = "&#10006;", w.addEventListener("click", function(x) {
            x.stopPropagation(), this.removeElement(this.toastElement), window.clearTimeout(this.toastElement.timeOutValue);
          }.bind(this));
          var D = window.innerWidth > 0 ? window.innerWidth : screen.width;
          (this.options.position == "left" || this.options.positionLeft === true) && D > 360 ? f.insertAdjacentElement("afterbegin", w) : f.appendChild(w);
        }
        if (this.options.stopOnFocus && this.options.duration > 0) {
          var b = this;
          f.addEventListener("mouseover", function(x) {
            window.clearTimeout(f.timeOutValue);
          }), f.addEventListener("mouseleave", function() {
            f.timeOutValue = window.setTimeout(function() {
              b.removeElement(f);
            }, b.options.duration);
          });
        }
        if (typeof this.options.destination < "u" && f.addEventListener("click", function(x) {
          x.stopPropagation(), this.options.newWindow === true ? window.open(this.options.destination, "_blank") : window.location = this.options.destination;
        }.bind(this)), typeof this.options.onClick == "function" && typeof this.options.destination > "u" && f.addEventListener("click", function(x) {
          x.stopPropagation(), this.options.onClick();
        }.bind(this)), typeof this.options.offset == "object") {
          var H = u("x", this.options), N = u("y", this.options), q = this.options.position == "left" ? H : "-" + H, O = this.options.gravity == "toastify-top" ? N : "-" + N;
          f.style.transform = "translate(" + q + "," + O + ")";
        }
        return f;
      }, showToast: function() {
        this.toastElement = this.buildToast();
        var f;
        if (typeof this.options.selector == "string" ? f = document.getElementById(this.options.selector) : this.options.selector instanceof HTMLElement || typeof ShadowRoot < "u" && this.options.selector instanceof ShadowRoot ? f = this.options.selector : f = document.body, !f) throw "Root element is not defined";
        var p = r.defaults.oldestFirst ? f.firstChild : f.lastChild;
        return f.insertBefore(this.toastElement, p), r.reposition(), this.options.duration > 0 && (this.toastElement.timeOutValue = window.setTimeout(function() {
          this.removeElement(this.toastElement);
        }.bind(this), this.options.duration)), this;
      }, hideToast: function() {
        this.toastElement.timeOutValue && clearTimeout(this.toastElement.timeOutValue), this.removeElement(this.toastElement);
      }, removeElement: function(f) {
        f.className = f.className.replace(" on", ""), window.setTimeout(function() {
          this.options.node && this.options.node.parentNode && this.options.node.parentNode.removeChild(this.options.node), f.parentNode && f.parentNode.removeChild(f), this.options.callback.call(f), r.reposition();
        }.bind(this), 400);
      } }, r.reposition = function() {
        for (var f = { top: 15, bottom: 15 }, p = { top: 15, bottom: 15 }, L = { top: 15, bottom: 15 }, w = document.getElementsByClassName("toastify"), D, b = 0; b < w.length; b++) {
          g(w[b], "toastify-top") === true ? D = "toastify-top" : D = "toastify-bottom";
          var H = w[b].offsetHeight;
          D = D.substr(9, D.length - 1);
          var N = 15, q = window.innerWidth > 0 ? window.innerWidth : screen.width;
          q <= 360 ? (w[b].style[D] = L[D] + "px", L[D] += H + N) : g(w[b], "toastify-left") === true ? (w[b].style[D] = f[D] + "px", f[D] += H + N) : (w[b].style[D] = p[D] + "px", p[D] += H + N);
        }
        return this;
      };
      function u(f, p) {
        return p.offset[f] ? isNaN(p.offset[f]) ? p.offset[f] : p.offset[f] + "px" : "0px";
      }
      function g(f, p) {
        return !f || typeof p != "string" ? false : !!(f.className && f.className.trim().split(/\s+/gi).indexOf(p) > -1);
      }
      return r.lib.init.prototype = r.lib, r;
    });
  })(tm)), tm.exports;
}
var lL = oL();
const dL = Kc(lL);
S_();
const mL = Zc({ __name: "NcDialogButton", props: { callback: { type: Function, default: () => {
} }, disabled: { type: Boolean, default: false }, icon: { default: void 0 }, label: {}, type: { default: "button" }, variant: { default: "tertiary" } }, emits: ["click"], setup(s, { emit: i }) {
  const r = s, l = i, u = tr(false);
  async function g(f) {
    if (!u.value) {
      u.value = true;
      try {
        const p = r.type === "reset" ? false : void 0, L = await r.callback?.() ?? p;
        L !== false && l("click", f, L);
      } finally {
        u.value = false;
      }
    }
  }
  return (f, p) => (qe(), Ya(qd(Jw), { "aria-label": f.label, disabled: f.disabled, type: f.type, variant: f.variant, onClick: g }, { icon: sr(() => [Js(f.$slots, "icon", {}, () => [u.value ? (qe(), Ya(qd(Gw), { key: 0, name: qd(F_)("Loading …") }, null, 8, ["name"])) : f.icon !== void 0 ? (qe(), Ya(qd(Vw), { key: 1, svg: f.icon }, null, 8, ["svg"])) : Cs("", true)])]), default: sr(() => [Qc(Ca(f.label) + " ", 1)]), _: 3 }, 8, ["aria-label", "disabled", "type", "variant"]));
} }), ap = b_().detectLanguage();
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
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }].map((s) => ap.addTranslation(s.locale, s.json));
const sm = ap.build();
sm.ngettext.bind(sm), sm.gettext.bind(sm);
C_().setApp("@nextcloud/dialogs").detectLogLevel().build();
const uL = "off", cL = "polite", gL = "assertive";
var hg = ((s) => (s[s.OFF = uL] = "OFF", s[s.POLITE = cL] = "POLITE", s[s.ASSERTIVE = gL] = "ASSERTIVE", s))(hg || {});
const hL = 7e3;
function fg(s, i) {
  if (i = { timeout: hL, isHTML: false, type: void 0, selector: void 0, onRemove: () => {
  }, onClick: void 0, close: true, ...i }, typeof s == "string" && !i.isHTML) {
    const f = document.createElement("div");
    f.innerHTML = s, s = f.innerText;
  }
  let r = i.type ?? "";
  typeof i.onClick == "function" && (r += " toast-with-click ");
  const l = s instanceof Node;
  let u = hg.POLITE;
  i.ariaLive ? u = i.ariaLive : (i.type === "toast-error" || i.type === "toast-undo") && (u = hg.ASSERTIVE);
  const g = dL({ [l ? "node" : "text"]: s, duration: i.timeout, callback: i.onRemove, onClick: i.onClick, close: i.close, gravity: "top", selector: i.selector, position: "right", backgroundColor: "", className: "dialogs " + r, escapeMarkup: !i.isHTML, ariaLive: u });
  return g.showToast(), g;
}
function _g(s, i) {
  return fg(s, { ...i, type: "toast-error" });
}
function fL(s, i) {
  return fg(s, { ...i, type: "toast-info" });
}
function _L(s, i) {
  return fg(s, { ...i, type: "toast-success" });
}
var Do = { exports: {} };
var pL = Do.exports, rp;
function yL() {
  return rp || (rp = 1, (function(s, i) {
    (function() {
      var r, l = "4.17.21", u = 200, g = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", f = "Expected a function", p = "Invalid `variable` option passed into `_.template`", L = "__lodash_hash_undefined__", w = 500, D = "__lodash_placeholder__", b = 1, H = 2, N = 4, q = 1, O = 2, x = 1, Q = 2, X = 4, se = 8, Z = 16, ge = 32, B = 64, V = 128, he = 256, je = 512, ke = 30, pe = "...", Ot = 800, Re = 16, zn = 1, Ks = 2, Fa = 3, Fs = 1 / 0, Zs = 9007199254740991, vm = 17976931348623157e292, Yt = NaN, Ut = 4294967295, or = Ut - 1, mi = Ut >>> 1, Bn = [["ary", V], ["bind", x], ["bindKey", Q], ["curry", se], ["curryRight", Z], ["flip", je], ["partial", ge], ["partialRight", B], ["rearg", he]], J = "[object Arguments]", lr = "[object Array]", wm = "[object AsyncFunction]", Qs = "[object Boolean]", Wn = "[object Date]", Mm = "[object DOMException]", dr = "[object Error]", mr = "[object Function]", Po = "[object GeneratorFunction]", es = "[object Map]", xa = "[object Number]", Lm = "[object Null]", xs = "[object Object]", jo = "[object Promise]", km = "[object Proxy]", $n = "[object RegExp]", Oe = "[object Set]", Mn = "[object String]", ur = "[object Symbol]", Tm = "[object Undefined]", Gn = "[object WeakMap]", Ct = "[object WeakSet]", Vn = "[object ArrayBuffer]", Xs = "[object DataView]", Jn = "[object Float32Array]", Fe = "[object Float64Array]", cr = "[object Int8Array]", gr = "[object Int16Array]", Kn = "[object Int32Array]", Na = "[object Uint8Array]", Zn = "[object Uint8ClampedArray]", en = "[object Uint16Array]", Qn = "[object Uint32Array]", Dm = /\b__p \+= '';/g, hr = /\b(__p \+=) '' \+/g, Ym = /(__e\(.*?\)|\b__t\)) \+\n'';/g, Xn = /&(?:amp|lt|gt|quot|#39);/g, Ln = /[&<>"']/g, ui = RegExp(Xn.source), fr = RegExp(Ln.source), $ = /<%-([\s\S]+?)%>/g, Cm = /<%([\s\S]+?)%>/g, qo = /<%=([\s\S]+?)%>/g, Ns = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, zt = /^\w*$/, _e = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Aa = /[\\^$.*+?()[\]{}|]/g, Ce = RegExp(Aa.source), kn = /^\s+/, bm = /\s/, _r = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, it = /\{\n\/\* \[wrapped with (.+)\] \*/, As = /,? & /, gs = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, Ze = /[()=,{}\[\]\/\s]/, ts = /\\(\\)?/g, Es = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, tn = /\w*$/, Sm = /^[-+]0x[0-9a-f]+$/i, Fm = /^0b[01]+$/i, Ea = /^\[object .+?Constructor\]$/, Io = /^0o[0-7]+$/i, xm = /^(?:0|[1-9]\d*)$/, ea = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, sn = /($^)/, Ro = /['\n\r\u2028\u2029\\]/g, pr = "\\ud800-\\udfff", Nm = "\\u0300-\\u036f", Am = "\\ufe20-\\ufe2f", ze = "\\u20d0-\\u20ff", yr = Nm + Am + ze, Oo = "\\u2700-\\u27bf", ci = "a-z\\xdf-\\xf6\\xf8-\\xff", Uo = "\\xac\\xb1\\xd7\\xf7", Em = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", Hm = "\\u2000-\\u206f", Pm = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", zo = "A-Z\\xc0-\\xd6\\xd8-\\xde", Bo = "\\ufe0e\\ufe0f", Wo = Uo + Em + Hm + Pm, vr = "['’]", $o = "[" + pr + "]", Go = "[" + Wo + "]", wr = "[" + yr + "]", Vo = "\\d+", Jo = "[" + Oo + "]", Ko = "[" + ci + "]", ta = "[^" + pr + Wo + Vo + Oo + ci + zo + "]", sa = "\\ud83c[\\udffb-\\udfff]", Zo = "(?:" + wr + "|" + sa + ")", na = "[^" + pr + "]", ss = "(?:\\ud83c[\\udde6-\\uddff]){2}", gi = "[\\ud800-\\udbff][\\udc00-\\udfff]", aa = "[" + zo + "]", Qo = "\\u200d", Xo = "(?:" + Ko + "|" + ta + ")", jm = "(?:" + aa + "|" + ta + ")", el = "(?:" + vr + "(?:d|ll|m|re|s|t|ve))?", tl = "(?:" + vr + "(?:D|LL|M|RE|S|T|VE))?", sl = Zo + "?", Mr = "[" + Bo + "]?", qm = "(?:" + Qo + "(?:" + [na, ss, gi].join("|") + ")" + Mr + sl + ")*", nl = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", Im = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", al = Mr + sl + qm, Rm = "(?:" + [Jo, ss, gi].join("|") + ")" + al, Om = "(?:" + [na + wr + "?", wr, ss, gi, $o].join("|") + ")", Um = RegExp(vr, "g"), zm = RegExp(wr, "g"), hi = RegExp(sa + "(?=" + sa + ")|" + Om + al, "g"), Bm = RegExp([aa + "?" + Ko + "+" + el + "(?=" + [Go, aa, "$"].join("|") + ")", jm + "+" + tl + "(?=" + [Go, aa + Xo, "$"].join("|") + ")", aa + "?" + Xo + "+" + el, aa + "+" + tl, Im, nl, Vo, Rm].join("|"), "g"), Wm = RegExp("[" + Qo + pr + yr + Bo + "]"), $m = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, Gm = ["Array", "Buffer", "DataView", "Date", "Error", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Map", "Math", "Object", "Promise", "RegExp", "Set", "String", "Symbol", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "WeakMap", "_", "clearTimeout", "isFinite", "parseInt", "setTimeout"], Vm = -1, He = {};
      He[Jn] = He[Fe] = He[cr] = He[gr] = He[Kn] = He[Na] = He[Zn] = He[en] = He[Qn] = true, He[J] = He[lr] = He[Vn] = He[Qs] = He[Xs] = He[Wn] = He[dr] = He[mr] = He[es] = He[xa] = He[xs] = He[$n] = He[Oe] = He[Mn] = He[Gn] = false;
      var Ne = {};
      Ne[J] = Ne[lr] = Ne[Vn] = Ne[Xs] = Ne[Qs] = Ne[Wn] = Ne[Jn] = Ne[Fe] = Ne[cr] = Ne[gr] = Ne[Kn] = Ne[es] = Ne[xa] = Ne[xs] = Ne[$n] = Ne[Oe] = Ne[Mn] = Ne[ur] = Ne[Na] = Ne[Zn] = Ne[en] = Ne[Qn] = true, Ne[dr] = Ne[mr] = Ne[Gn] = false;
      var Jm = { À: "A", Á: "A", Â: "A", Ã: "A", Ä: "A", Å: "A", à: "a", á: "a", â: "a", ã: "a", ä: "a", å: "a", Ç: "C", ç: "c", Ð: "D", ð: "d", È: "E", É: "E", Ê: "E", Ë: "E", è: "e", é: "e", ê: "e", ë: "e", Ì: "I", Í: "I", Î: "I", Ï: "I", ì: "i", í: "i", î: "i", ï: "i", Ñ: "N", ñ: "n", Ò: "O", Ó: "O", Ô: "O", Õ: "O", Ö: "O", Ø: "O", ò: "o", ó: "o", ô: "o", õ: "o", ö: "o", ø: "o", Ù: "U", Ú: "U", Û: "U", Ü: "U", ù: "u", ú: "u", û: "u", ü: "u", Ý: "Y", ý: "y", ÿ: "y", Æ: "Ae", æ: "ae", Þ: "Th", þ: "th", ß: "ss", Ā: "A", Ă: "A", Ą: "A", ā: "a", ă: "a", ą: "a", Ć: "C", Ĉ: "C", Ċ: "C", Č: "C", ć: "c", ĉ: "c", ċ: "c", č: "c", Ď: "D", Đ: "D", ď: "d", đ: "d", Ē: "E", Ĕ: "E", Ė: "E", Ę: "E", Ě: "E", ē: "e", ĕ: "e", ė: "e", ę: "e", ě: "e", Ĝ: "G", Ğ: "G", Ġ: "G", Ģ: "G", ĝ: "g", ğ: "g", ġ: "g", ģ: "g", Ĥ: "H", Ħ: "H", ĥ: "h", ħ: "h", Ĩ: "I", Ī: "I", Ĭ: "I", Į: "I", İ: "I", ĩ: "i", ī: "i", ĭ: "i", į: "i", ı: "i", Ĵ: "J", ĵ: "j", Ķ: "K", ķ: "k", ĸ: "k", Ĺ: "L", Ļ: "L", Ľ: "L", Ŀ: "L", Ł: "L", ĺ: "l", ļ: "l", ľ: "l", ŀ: "l", ł: "l", Ń: "N", Ņ: "N", Ň: "N", Ŋ: "N", ń: "n", ņ: "n", ň: "n", ŋ: "n", Ō: "O", Ŏ: "O", Ő: "O", ō: "o", ŏ: "o", ő: "o", Ŕ: "R", Ŗ: "R", Ř: "R", ŕ: "r", ŗ: "r", ř: "r", Ś: "S", Ŝ: "S", Ş: "S", Š: "S", ś: "s", ŝ: "s", ş: "s", š: "s", Ţ: "T", Ť: "T", Ŧ: "T", ţ: "t", ť: "t", ŧ: "t", Ũ: "U", Ū: "U", Ŭ: "U", Ů: "U", Ű: "U", Ų: "U", ũ: "u", ū: "u", ŭ: "u", ů: "u", ű: "u", ų: "u", Ŵ: "W", ŵ: "w", Ŷ: "Y", ŷ: "y", Ÿ: "Y", Ź: "Z", Ż: "Z", Ž: "Z", ź: "z", ż: "z", ž: "z", Ĳ: "IJ", ĳ: "ij", Œ: "Oe", œ: "oe", ŉ: "'n", ſ: "s" }, fi = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, _i = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'" }, Km = { "\\": "\\", "'": "'", "\n": "n", "\r": "r", "\u2028": "u2028", "\u2029": "u2029" }, rl = parseFloat, il = parseInt, ol = typeof Id == "object" && Id && Id.Object === Object && Id, Zm = typeof self == "object" && self && self.Object === Object && self, tt = ol || Zm || Function("return this")(), pi = i && !i.nodeType && i, nn = pi && true && s && !s.nodeType && s, Pe = nn && nn.exports === pi, Tn = Pe && ol.process, ot = (function() {
        try {
          var Y = nn && nn.require && nn.require("util").types;
          return Y || Tn && Tn.binding && Tn.binding("util");
        } catch {
        }
      })(), ll = ot && ot.isArrayBuffer, yi = ot && ot.isDate, dl = ot && ot.isMap, ml = ot && ot.isRegExp, Ha = ot && ot.isSet, Hs = ot && ot.isTypedArray;
      function mt(Y, A, F) {
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
      function Qm(Y, A, F, G) {
        for (var oe = -1, Te = Y == null ? 0 : Y.length; ++oe < Te; ) {
          var Qe = Y[oe];
          A(G, Qe, F(Qe), Y);
        }
        return G;
      }
      function Ge(Y, A) {
        for (var F = -1, G = Y == null ? 0 : Y.length; ++F < G && A(Y[F], F, Y) !== false; ) ;
        return Y;
      }
      function Xm(Y, A) {
        for (var F = Y == null ? 0 : Y.length; F-- && A(Y[F], F, Y) !== false; ) ;
        return Y;
      }
      function Lr(Y, A) {
        for (var F = -1, G = Y == null ? 0 : Y.length; ++F < G; ) if (!A(Y[F], F, Y)) return false;
        return true;
      }
      function an(Y, A) {
        for (var F = -1, G = Y == null ? 0 : Y.length, oe = 0, Te = []; ++F < G; ) {
          var Qe = Y[F];
          A(Qe, F, Y) && (Te[oe++] = Qe);
        }
        return Te;
      }
      function kr(Y, A) {
        var F = Y == null ? 0 : Y.length;
        return !!F && ra(Y, A, 0) > -1;
      }
      function vi(Y, A, F) {
        for (var G = -1, oe = Y == null ? 0 : Y.length; ++G < oe; ) if (F(A, Y[G])) return true;
        return false;
      }
      function xe(Y, A) {
        for (var F = -1, G = Y == null ? 0 : Y.length, oe = Array(G); ++F < G; ) oe[F] = A(Y[F], F, Y);
        return oe;
      }
      function hs(Y, A) {
        for (var F = -1, G = A.length, oe = Y.length; ++F < G; ) Y[oe + F] = A[F];
        return Y;
      }
      function wi(Y, A, F, G) {
        var oe = -1, Te = Y == null ? 0 : Y.length;
        for (G && Te && (F = Y[++oe]); ++oe < Te; ) F = A(F, Y[oe], oe, Y);
        return F;
      }
      function eu(Y, A, F, G) {
        var oe = Y == null ? 0 : Y.length;
        for (G && oe && (F = Y[--oe]); oe--; ) F = A(F, Y[oe], oe, Y);
        return F;
      }
      function Mi(Y, A) {
        for (var F = -1, G = Y == null ? 0 : Y.length; ++F < G; ) if (A(Y[F], F, Y)) return true;
        return false;
      }
      var ul = Li("length");
      function tu(Y) {
        return Y.split("");
      }
      function su(Y) {
        return Y.match(gs) || [];
      }
      function cl(Y, A, F) {
        var G;
        return F(Y, function(oe, Te, Qe) {
          if (A(oe, Te, Qe)) return G = Te, false;
        }), G;
      }
      function Tr(Y, A, F, G) {
        for (var oe = Y.length, Te = F + (G ? 1 : -1); G ? Te-- : ++Te < oe; ) if (A(Y[Te], Te, Y)) return Te;
        return -1;
      }
      function ra(Y, A, F) {
        return A === A ? vl(Y, A, F) : Tr(Y, hl, F);
      }
      function gl(Y, A, F, G) {
        for (var oe = F - 1, Te = Y.length; ++oe < Te; ) if (G(Y[oe], A)) return oe;
        return -1;
      }
      function hl(Y) {
        return Y !== Y;
      }
      function Dn(Y, A) {
        var F = Y == null ? 0 : Y.length;
        return F ? Ti(Y, A) / F : Yt;
      }
      function Li(Y) {
        return function(A) {
          return A == null ? r : A[Y];
        };
      }
      function Pa(Y) {
        return function(A) {
          return Y == null ? r : Y[A];
        };
      }
      function fl(Y, A, F, G, oe) {
        return oe(Y, function(Te, Qe, fe) {
          F = G ? (G = false, Te) : A(F, Te, Qe, fe);
        }), F;
      }
      function ki(Y, A) {
        var F = Y.length;
        for (Y.sort(A); F--; ) Y[F] = Y[F].value;
        return Y;
      }
      function Ti(Y, A) {
        for (var F, G = -1, oe = Y.length; ++G < oe; ) {
          var Te = A(Y[G]);
          Te !== r && (F = F === r ? Te : F + Te);
        }
        return F;
      }
      function Di(Y, A) {
        for (var F = -1, G = Array(Y); ++F < Y; ) G[F] = A(F);
        return G;
      }
      function nu(Y, A) {
        return xe(A, function(F) {
          return [F, Y[F]];
        });
      }
      function _l(Y) {
        return Y && Y.slice(0, Dr(Y) + 1).replace(kn, "");
      }
      function _t(Y) {
        return function(A) {
          return Y(A);
        };
      }
      function Yi(Y, A) {
        return xe(A, function(F) {
          return Y[F];
        });
      }
      function ia(Y, A) {
        return Y.has(A);
      }
      function Ae(Y, A) {
        for (var F = -1, G = Y.length; ++F < G && ra(A, Y[F], 0) > -1; ) ;
        return F;
      }
      function pl(Y, A) {
        for (var F = Y.length; F-- && ra(A, Y[F], 0) > -1; ) ;
        return F;
      }
      function au(Y, A) {
        for (var F = Y.length, G = 0; F--; ) Y[F] === A && ++G;
        return G;
      }
      var yl = Pa(Jm), ru = Pa(fi);
      function iu(Y) {
        return "\\" + Km[Y];
      }
      function ou(Y, A) {
        return Y == null ? r : Y[A];
      }
      function fs(Y) {
        return Wm.test(Y);
      }
      function lu(Y) {
        return $m.test(Y);
      }
      function du(Y) {
        for (var A, F = []; !(A = Y.next()).done; ) F.push(A.value);
        return F;
      }
      function Ci(Y) {
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
        for (var F = -1, G = Y.length, oe = 0, Te = []; ++F < G; ) {
          var Qe = Y[F];
          (Qe === A || Qe === D) && (Y[F] = D, Te[oe++] = F);
        }
        return Te;
      }
      function oa(Y) {
        var A = -1, F = Array(Y.size);
        return Y.forEach(function(G) {
          F[++A] = G;
        }), F;
      }
      function mu(Y) {
        var A = -1, F = Array(Y.size);
        return Y.forEach(function(G) {
          F[++A] = [G, G];
        }), F;
      }
      function vl(Y, A, F) {
        for (var G = F - 1, oe = Y.length; ++G < oe; ) if (Y[G] === A) return G;
        return -1;
      }
      function uu(Y, A, F) {
        for (var G = F + 1; G--; ) if (Y[G] === A) return G;
        return G;
      }
      function rn(Y) {
        return fs(Y) ? gu(Y) : ul(Y);
      }
      function bt(Y) {
        return fs(Y) ? hu(Y) : tu(Y);
      }
      function Dr(Y) {
        for (var A = Y.length; A-- && bm.test(Y.charAt(A)); ) ;
        return A;
      }
      var cu = Pa(_i);
      function gu(Y) {
        for (var A = hi.lastIndex = 0; hi.test(Y); ) ++A;
        return A;
      }
      function hu(Y) {
        return Y.match(hi) || [];
      }
      function fu(Y) {
        return Y.match(Bm) || [];
      }
      var _u = (function Y(A) {
        A = A == null ? tt : la.defaults(tt.Object(), A, la.pick(tt, Gm));
        var F = A.Array, G = A.Date, oe = A.Error, Te = A.Function, Qe = A.Math, fe = A.Object, Ps = A.RegExp, wl = A.String, Bt = A.TypeError, qa = F.prototype, Ml = Te.prototype, da = fe.prototype, Yr = A["__core-js_shared__"], Ia = Ml.toString, De = da.hasOwnProperty, pu = 0, Ll = (function() {
          var t = /[^.]+$/.exec(Yr && Yr.keys && Yr.keys.IE_PROTO || "");
          return t ? "Symbol(src)_1." + t : "";
        })(), Cr = da.toString, yu = Ia.call(fe), vu = tt._, wu = Ps("^" + Ia.call(De).replace(Aa, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), br = Pe ? A.Buffer : r, on = A.Symbol, Sr = A.Uint8Array, kl = br ? br.allocUnsafe : r, Fr = ja(fe.getPrototypeOf, fe), Tl = fe.create, Dl = da.propertyIsEnumerable, Yn = qa.splice, Yl = on ? on.isConcatSpreadable : r, Ra = on ? on.iterator : r, Cn = on ? on.toStringTag : r, xr = (function() {
          try {
            var t = Mt(fe, "defineProperty");
            return t({}, "", {}), t;
          } catch {
          }
        })(), Mu = A.clearTimeout !== tt.clearTimeout && A.clearTimeout, Lu = G && G.now !== tt.Date.now && G.now, ku = A.setTimeout !== tt.setTimeout && A.setTimeout, Nr = Qe.ceil, Oa = Qe.floor, Ar = fe.getOwnPropertySymbols, Cl = br ? br.isBuffer : r, Ua = A.isFinite, ma = qa.join, Er = ja(fe.keys, fe), Ve = Qe.max, Be = Qe.min, bl = G.now, Sl = A.parseInt, Fl = Qe.random, Tu = qa.reverse, bi = Mt(A, "DataView"), za = Mt(A, "Map"), Si = Mt(A, "Promise"), ua = Mt(A, "Set"), Ba = Mt(A, "WeakMap"), Wa = Mt(fe, "create"), Hr = Ba && new Ba(), ca = {}, Du = En(bi), Yu = En(za), Cu = En(Si), bu = En(ua), Su = En(Ba), Pr = on ? on.prototype : r, $a = Pr ? Pr.valueOf : r, xl = Pr ? Pr.toString : r;
        function y(t) {
          if (Je(t) && !de(t) && !(t instanceof ue)) {
            if (t instanceof Wt) return t;
            if (De.call(t, "__wrapped__")) return mo(t);
          }
          return new Wt(t);
        }
        var ga = /* @__PURE__ */ (function() {
          function t() {
          }
          return function(a) {
            if (!$e(a)) return {};
            if (Tl) return Tl(a);
            t.prototype = a;
            var o = new t();
            return t.prototype = r, o;
          };
        })();
        function jr() {
        }
        function Wt(t, a) {
          this.__wrapped__ = t, this.__actions__ = [], this.__chain__ = !!a, this.__index__ = 0, this.__values__ = r;
        }
        y.templateSettings = { escape: $, evaluate: Cm, interpolate: qo, variable: "", imports: { _: y } }, y.prototype = jr.prototype, y.prototype.constructor = y, Wt.prototype = ga(jr.prototype), Wt.prototype.constructor = Wt;
        function ue(t) {
          this.__wrapped__ = t, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = false, this.__iteratees__ = [], this.__takeCount__ = Ut, this.__views__ = [];
        }
        function Fu() {
          var t = new ue(this.__wrapped__);
          return t.__actions__ = ct(this.__actions__), t.__dir__ = this.__dir__, t.__filtered__ = this.__filtered__, t.__iteratees__ = ct(this.__iteratees__), t.__takeCount__ = this.__takeCount__, t.__views__ = ct(this.__views__), t;
        }
        function xu() {
          if (this.__filtered__) {
            var t = new ue(this);
            t.__dir__ = -1, t.__filtered__ = true;
          } else t = this.clone(), t.__dir__ *= -1;
          return t;
        }
        function Nu() {
          var t = this.__wrapped__.value(), a = this.__dir__, o = de(t), c = a < 0, _ = o ? t.length : 0, v = os(0, _, this.__views__), M = v.start, T = v.end, C = T - M, P = c ? T : M - 1, j = this.__iteratees__, R = j.length, z = 0, K = Be(C, this.__takeCount__);
          if (!o || !c && _ == C && K == C) return Bi(t, this.__actions__);
          var ne = [];
          e: for (; C-- && z < K; ) {
            P += a;
            for (var ce = -1, ae = t[P]; ++ce < R; ) {
              var ve = j[ce], Me = ve.iteratee, ds = ve.type, jt = Me(ae);
              if (ds == Ks) ae = jt;
              else if (!jt) {
                if (ds == zn) continue e;
                break e;
              }
            }
            ne[z++] = ae;
          }
          return ne;
        }
        ue.prototype = ga(jr.prototype), ue.prototype.constructor = ue;
        function js(t) {
          var a = -1, o = t == null ? 0 : t.length;
          for (this.clear(); ++a < o; ) {
            var c = t[a];
            this.set(c[0], c[1]);
          }
        }
        function qr() {
          this.__data__ = Wa ? Wa(null) : {}, this.size = 0;
        }
        function Au(t) {
          var a = this.has(t) && delete this.__data__[t];
          return this.size -= a ? 1 : 0, a;
        }
        function Eu(t) {
          var a = this.__data__;
          if (Wa) {
            var o = a[t];
            return o === L ? r : o;
          }
          return De.call(a, t) ? a[t] : r;
        }
        function Hu(t) {
          var a = this.__data__;
          return Wa ? a[t] !== r : De.call(a, t);
        }
        function Pu(t, a) {
          var o = this.__data__;
          return this.size += this.has(t) ? 0 : 1, o[t] = Wa && a === r ? L : a, this;
        }
        js.prototype.clear = qr, js.prototype.delete = Au, js.prototype.get = Eu, js.prototype.has = Hu, js.prototype.set = Pu;
        function qs(t) {
          var a = -1, o = t == null ? 0 : t.length;
          for (this.clear(); ++a < o; ) {
            var c = t[a];
            this.set(c[0], c[1]);
          }
        }
        function ju() {
          this.__data__ = [], this.size = 0;
        }
        function Nl(t) {
          var a = this.__data__, o = $t(a, t);
          if (o < 0) return false;
          var c = a.length - 1;
          return o == c ? a.pop() : Yn.call(a, o, 1), --this.size, true;
        }
        function qu(t) {
          var a = this.__data__, o = $t(a, t);
          return o < 0 ? r : a[o][1];
        }
        function Iu(t) {
          return $t(this.__data__, t) > -1;
        }
        function Al(t, a) {
          var o = this.__data__, c = $t(o, t);
          return c < 0 ? (++this.size, o.push([t, a])) : o[c][1] = a, this;
        }
        qs.prototype.clear = ju, qs.prototype.delete = Nl, qs.prototype.get = qu, qs.prototype.has = Iu, qs.prototype.set = Al;
        function Is(t) {
          var a = -1, o = t == null ? 0 : t.length;
          for (this.clear(); ++a < o; ) {
            var c = t[a];
            this.set(c[0], c[1]);
          }
        }
        function Ru() {
          this.size = 0, this.__data__ = { hash: new js(), map: new (za || qs)(), string: new js() };
        }
        function Ou(t) {
          var a = Xa(this, t).delete(t);
          return this.size -= a ? 1 : 0, a;
        }
        function ln(t) {
          return Xa(this, t).get(t);
        }
        function El(t) {
          return Xa(this, t).has(t);
        }
        function Uu(t, a) {
          var o = Xa(this, t), c = o.size;
          return o.set(t, a), this.size += o.size == c ? 0 : 1, this;
        }
        Is.prototype.clear = Ru, Is.prototype.delete = Ou, Is.prototype.get = ln, Is.prototype.has = El, Is.prototype.set = Uu;
        function bn(t) {
          var a = -1, o = t == null ? 0 : t.length;
          for (this.__data__ = new Is(); ++a < o; ) this.add(t[a]);
        }
        function zu(t) {
          return this.__data__.set(t, L), this;
        }
        function U(t) {
          return this.__data__.has(t);
        }
        bn.prototype.add = bn.prototype.push = zu, bn.prototype.has = U;
        function as(t) {
          var a = this.__data__ = new qs(t);
          this.size = a.size;
        }
        function Bu() {
          this.__data__ = new qs(), this.size = 0;
        }
        function Hl(t) {
          var a = this.__data__, o = a.delete(t);
          return this.size = a.size, o;
        }
        function Le(t) {
          return this.__data__.get(t);
        }
        function Ir(t) {
          return this.__data__.has(t);
        }
        function Pl(t, a) {
          var o = this.__data__;
          if (o instanceof qs) {
            var c = o.__data__;
            if (!za || c.length < u - 1) return c.push([t, a]), this.size = ++o.size, this;
            o = this.__data__ = new Is(c);
          }
          return o.set(t, a), this.size = o.size, this;
        }
        as.prototype.clear = Bu, as.prototype.delete = Hl, as.prototype.get = Le, as.prototype.has = Ir, as.prototype.set = Pl;
        function Rr(t, a) {
          var o = de(t), c = !o && er(t), _ = !o && !c && Da(t), v = !o && !c && !_ && si(t), M = o || c || _ || v, T = M ? Di(t.length, wl) : [], C = T.length;
          for (var P in t) (a || De.call(t, P)) && !(M && (P == "length" || _ && (P == "offset" || P == "parent") || v && (P == "buffer" || P == "byteLength" || P == "byteOffset") || Ws(P, C))) && T.push(P);
          return T;
        }
        function jl(t) {
          var a = t.length;
          return a ? t[$r(0, a - 1)] : r;
        }
        function Wu(t, a) {
          return ft(ct(t), Sn(a, 0, t.length));
        }
        function $u(t) {
          return ft(ct(t));
        }
        function Fi(t, a, o) {
          (o !== r && !Gs(t[a], o) || o === r && !(a in t)) && Rs(t, a, o);
        }
        function Ga(t, a, o) {
          var c = t[a];
          (!(De.call(t, a) && Gs(c, o)) || o === r && !(a in t)) && Rs(t, a, o);
        }
        function $t(t, a) {
          for (var o = t.length; o--; ) if (Gs(t[o][0], a)) return o;
          return -1;
        }
        function Gu(t, a, o, c) {
          return dn(t, function(_, v, M) {
            a(c, _, o(_), M);
          }), c;
        }
        function xi(t, a) {
          return t && Ls(a, lt(a), t);
        }
        function Vu(t, a) {
          return t && Ls(a, Kt(a), t);
        }
        function Rs(t, a, o) {
          a == "__proto__" && xr ? xr(t, a, { configurable: true, enumerable: true, value: o, writable: true }) : t[a] = o;
        }
        function Or(t, a) {
          for (var o = -1, c = a.length, _ = F(c), v = t == null; ++o < c; ) _[o] = v ? r : Oc(t, a[o]);
          return _;
        }
        function Sn(t, a, o) {
          return t === t && (o !== r && (t = t <= o ? t : o), a !== r && (t = t >= a ? t : a)), t;
        }
        function St(t, a, o, c, _, v) {
          var M, T = a & b, C = a & H, P = a & N;
          if (o && (M = _ ? o(t, c, _, v) : o(t)), M !== r) return M;
          if (!$e(t)) return t;
          var j = de(t);
          if (j) {
            if (M = yc(t), !T) return ct(t, M);
          } else {
            var R = We(t), z = R == mr || R == Po;
            if (Da(t)) return Ms(t, T);
            if (R == xs || R == J || z && !_) {
              if (M = C || z ? {} : fd(t), !T) return C ? ad(t, Vu(M, t)) : Ki(t, xi(M, t));
            } else {
              if (!Ne[R]) return _ ? t : {};
              M = vc(t, R, T);
            }
          }
          v || (v = new as());
          var K = v.get(t);
          if (K) return K;
          v.set(t, M), c_(t) ? t.forEach(function(ae) {
            M.add(St(ae, a, o, ae, t, v));
          }) : m_(t) && t.forEach(function(ae, ve) {
            M.set(ve, St(ae, a, o, ve, t, v));
          });
          var ne = P ? C ? wt : vt : C ? Kt : lt, ce = j ? r : ne(t);
          return Ge(ce || t, function(ae, ve) {
            ce && (ve = ae, ae = t[ve]), Ga(M, ve, St(ae, a, o, ve, t, v));
          }), M;
        }
        function Ni(t) {
          var a = lt(t);
          return function(o) {
            return ql(o, t, a);
          };
        }
        function ql(t, a, o) {
          var c = o.length;
          if (t == null) return !c;
          for (t = fe(t); c--; ) {
            var _ = o[c], v = a[_], M = t[_];
            if (M === r && !(_ in t) || !v(M)) return false;
          }
          return true;
        }
        function _s(t, a, o) {
          if (typeof t != "function") throw new Bt(f);
          return Tt(function() {
            t.apply(r, o);
          }, a);
        }
        function ha(t, a, o, c) {
          var _ = -1, v = kr, M = true, T = t.length, C = [], P = a.length;
          if (!T) return C;
          o && (a = xe(a, _t(o))), c ? (v = vi, M = false) : a.length >= u && (v = ia, M = false, a = new bn(a));
          e: for (; ++_ < T; ) {
            var j = t[_], R = o == null ? j : o(j);
            if (j = c || j !== 0 ? j : 0, M && R === R) {
              for (var z = P; z--; ) if (a[z] === R) continue e;
              C.push(j);
            } else v(a, R, c) || C.push(j);
          }
          return C;
        }
        var dn = Kr(ps), Il = Kr(Ei, true);
        function Ju(t, a) {
          var o = true;
          return dn(t, function(c, _, v) {
            return o = !!a(c, _, v), o;
          }), o;
        }
        function Ur(t, a, o) {
          for (var c = -1, _ = t.length; ++c < _; ) {
            var v = t[c], M = a(v);
            if (M != null && (T === r ? M === M && !ls(M) : o(M, T))) var T = M, C = v;
          }
          return C;
        }
        function Ku(t, a, o, c) {
          var _ = t.length;
          for (o = me(o), o < 0 && (o = -o > _ ? 0 : _ + o), c = c === r || c > _ ? _ : me(c), c < 0 && (c += _), c = o > c ? 0 : h_(c); o < c; ) t[o++] = a;
          return t;
        }
        function Rl(t, a) {
          var o = [];
          return dn(t, function(c, _, v) {
            a(c, _, v) && o.push(c);
          }), o;
        }
        function st(t, a, o, c, _) {
          var v = -1, M = t.length;
          for (o || (o = wc), _ || (_ = []); ++v < M; ) {
            var T = t[v];
            a > 0 && o(T) ? a > 1 ? st(T, a - 1, o, c, _) : hs(_, T) : c || (_[_.length] = T);
          }
          return _;
        }
        var Ai = Zi(), Ol = Zi(true);
        function ps(t, a) {
          return t && Ai(t, a, lt);
        }
        function Ei(t, a) {
          return t && Ol(t, a, lt);
        }
        function ys(t, a) {
          return an(a, function(o) {
            return qn(t[o]);
          });
        }
        function Fn(t, a) {
          a = ws(a, t);
          for (var o = 0, c = a.length; t != null && o < c; ) t = t[Ts(a[o++])];
          return o && o == c ? t : r;
        }
        function Ul(t, a, o) {
          var c = a(t);
          return de(t) ? c : hs(c, o(t));
        }
        function ut(t) {
          return t == null ? t === r ? Tm : Lm : Cn && Cn in fe(t) ? pc(t) : wa(t);
        }
        function Hi(t, a) {
          return t > a;
        }
        function Zu(t, a) {
          return t != null && De.call(t, a);
        }
        function Qu(t, a) {
          return t != null && a in fe(t);
        }
        function Xu(t, a, o) {
          return t >= Be(a, o) && t < Ve(a, o);
        }
        function Pi(t, a, o) {
          for (var c = o ? vi : kr, _ = t[0].length, v = t.length, M = v, T = F(v), C = 1 / 0, P = []; M--; ) {
            var j = t[M];
            M && a && (j = xe(j, _t(a))), C = Be(j.length, C), T[M] = !o && (a || _ >= 120 && j.length >= 120) ? new bn(M && j) : r;
          }
          j = t[0];
          var R = -1, z = T[0];
          e: for (; ++R < _ && P.length < C; ) {
            var K = j[R], ne = a ? a(K) : K;
            if (K = o || K !== 0 ? K : 0, !(z ? ia(z, ne) : c(P, ne, o))) {
              for (M = v; --M; ) {
                var ce = T[M];
                if (!(ce ? ia(ce, ne) : c(t[M], ne, o))) continue e;
              }
              z && z.push(ne), P.push(K);
            }
          }
          return P;
        }
        function Os(t, a, o, c) {
          return ps(t, function(_, v, M) {
            a(c, o(_), v, M);
          }), c;
        }
        function vs(t, a, o) {
          a = ws(a, t), t = lo(t, a);
          var c = t == null ? t : t[Ts(Ie(a))];
          return c == null ? r : mt(c, t, o);
        }
        function zl(t) {
          return Je(t) && ut(t) == J;
        }
        function ec(t) {
          return Je(t) && ut(t) == Vn;
        }
        function tc(t) {
          return Je(t) && ut(t) == Wn;
        }
        function Va(t, a, o, c, _) {
          return t === a ? true : t == null || a == null || !Je(t) && !Je(a) ? t !== t && a !== a : sc(t, a, o, c, Va, _);
        }
        function sc(t, a, o, c, _, v) {
          var M = de(t), T = de(a), C = M ? lr : We(t), P = T ? lr : We(a);
          C = C == J ? xs : C, P = P == J ? xs : P;
          var j = C == xs, R = P == xs, z = C == P;
          if (z && Da(t)) {
            if (!Da(a)) return false;
            M = true, j = false;
          }
          if (z && !j) return v || (v = new as()), M || si(t) ? gd(t, a, o, c, _, v) : fc(t, a, C, o, c, _, v);
          if (!(o & q)) {
            var K = j && De.call(t, "__wrapped__"), ne = R && De.call(a, "__wrapped__");
            if (K || ne) {
              var ce = K ? t.value() : t, ae = ne ? a.value() : a;
              return v || (v = new as()), _(ce, ae, o, c, v);
            }
          }
          return z ? (v || (v = new as()), _c(t, a, o, c, _, v)) : false;
        }
        function ji(t) {
          return Je(t) && We(t) == es;
        }
        function mn(t, a, o, c) {
          var _ = o.length, v = _, M = !c;
          if (t == null) return !v;
          for (t = fe(t); _--; ) {
            var T = o[_];
            if (M && T[2] ? T[1] !== t[T[0]] : !(T[0] in t)) return false;
          }
          for (; ++_ < v; ) {
            T = o[_];
            var C = T[0], P = t[C], j = T[1];
            if (M && T[2]) {
              if (P === r && !(C in t)) return false;
            } else {
              var R = new as();
              if (c) var z = c(P, j, C, t, a, R);
              if (!(z === r ? Va(j, P, q | O, c, R) : z)) return false;
            }
          }
          return true;
        }
        function Ja(t) {
          if (!$e(t) || Mc(t)) return false;
          var a = qn(t) ? wu : Ea;
          return a.test(En(t));
        }
        function we(t) {
          return Je(t) && ut(t) == $n;
        }
        function Bl(t) {
          return Je(t) && We(t) == Oe;
        }
        function nc(t) {
          return Je(t) && Hd(t.length) && !!He[ut(t)];
        }
        function Ft(t) {
          return typeof t == "function" ? t : t == null ? Zt : typeof t == "object" ? de(t) ? qi(t[0], t[1]) : xt(t) : D_(t);
        }
        function zr(t) {
          if (!ks(t)) return Er(t);
          var a = [];
          for (var o in fe(t)) De.call(t, o) && o != "constructor" && a.push(o);
          return a;
        }
        function ac(t) {
          if (!$e(t)) return hn(t);
          var a = ks(t), o = [];
          for (var c in t) c == "constructor" && (a || !De.call(t, c)) || o.push(c);
          return o;
        }
        function Br(t, a) {
          return t < a;
        }
        function Wl(t, a) {
          var o = -1, c = Jt(t) ? F(t.length) : [];
          return dn(t, function(_, v, M) {
            c[++o] = a(_, v, M);
          }), c;
        }
        function xt(t) {
          var a = no(t);
          return a.length == 1 && a[0][2] ? pd(a[0][0], a[0][1]) : function(o) {
            return o === t || mn(o, t, a);
          };
        }
        function qi(t, a) {
          return Xr(t) && _d(a) ? pd(Ts(t), a) : function(o) {
            var c = Oc(o, t);
            return c === r && c === a ? Uc(o, t) : Va(a, c, q | O);
          };
        }
        function Wr(t, a, o, c, _) {
          t !== a && Ai(a, function(v, M) {
            if (_ || (_ = new as()), $e(v)) $l(t, a, M, o, Wr, c, _);
            else {
              var T = c ? c(An(t, M), v, M + "", t, a, _) : r;
              T === r && (T = v), Fi(t, M, T);
            }
          }, Kt);
        }
        function $l(t, a, o, c, _, v, M) {
          var T = An(t, o), C = An(a, o), P = M.get(C);
          if (P) {
            Fi(t, o, P);
            return;
          }
          var j = v ? v(T, C, o + "", t, a, M) : r, R = j === r;
          if (R) {
            var z = de(C), K = !z && Da(C), ne = !z && !K && si(C);
            j = C, z || K || ne ? de(T) ? j = T : Xe(T) ? j = ct(T) : K ? (R = false, j = Ms(C, true)) : ne ? (R = false, j = nd(C, true)) : j = [] : wo(C) || er(C) ? (j = T, er(T) ? j = f_(T) : (!$e(T) || qn(T)) && (j = fd(C))) : R = false;
          }
          R && (M.set(C, j), _(j, C, c, v, M), M.delete(C)), Fi(t, o, j);
        }
        function Gl(t, a) {
          var o = t.length;
          if (o) return a += a < 0 ? o : 0, Ws(a, o) ? t[a] : r;
        }
        function Vl(t, a, o) {
          a.length ? a = xe(a, function(v) {
            return de(v) ? function(M) {
              return Fn(M, v.length === 1 ? v[0] : v);
            } : v;
          }) : a = [Zt];
          var c = -1;
          a = xe(a, _t(ee()));
          var _ = Wl(t, function(v, M, T) {
            var C = xe(a, function(P) {
              return P(v);
            });
            return { criteria: C, index: ++c, value: v };
          });
          return ki(_, function(v, M) {
            return uc(v, M, o);
          });
        }
        function rc(t, a) {
          return Jl(t, a, function(o, c) {
            return Uc(t, c);
          });
        }
        function Jl(t, a, o) {
          for (var c = -1, _ = a.length, v = {}; ++c < _; ) {
            var M = a[c], T = Fn(t, M);
            o(T, M) && Ka(v, ws(M, t), T);
          }
          return v;
        }
        function Kl(t) {
          return function(a) {
            return Fn(a, t);
          };
        }
        function Ii(t, a, o, c) {
          var _ = c ? gl : ra, v = -1, M = a.length, T = t;
          for (t === a && (a = ct(a)), o && (T = xe(t, _t(o))); ++v < M; ) for (var C = 0, P = a[v], j = o ? o(P) : P; (C = _(T, j, C, c)) > -1; ) T !== t && Yn.call(T, C, 1), Yn.call(t, C, 1);
          return t;
        }
        function Nt(t, a) {
          for (var o = t ? a.length : 0, c = o - 1; o--; ) {
            var _ = a[o];
            if (o == c || _ !== v) {
              var v = _;
              Ws(_) ? Yn.call(t, _, 1) : zi(t, _);
            }
          }
          return t;
        }
        function $r(t, a) {
          return t + Oa(Fl() * (a - t + 1));
        }
        function Ri(t, a, o, c) {
          for (var _ = -1, v = Ve(Nr((a - t) / (o || 1)), 0), M = F(v); v--; ) M[c ? v : ++_] = t, t += o;
          return M;
        }
        function Oi(t, a) {
          var o = "";
          if (!t || a < 1 || a > Zs) return o;
          do
            a % 2 && (o += t), a = Oa(a / 2), a && (t += t);
          while (a);
          return o;
        }
        function le(t, a) {
          return Dt(oo(t, a, Zt), t + "");
        }
        function ic(t) {
          return jl(ni(t));
        }
        function oc(t, a) {
          var o = ni(t);
          return ft(o, Sn(a, 0, o.length));
        }
        function Ka(t, a, o, c) {
          if (!$e(t)) return t;
          a = ws(a, t);
          for (var _ = -1, v = a.length, M = v - 1, T = t; T != null && ++_ < v; ) {
            var C = Ts(a[_]), P = o;
            if (C === "__proto__" || C === "constructor" || C === "prototype") return t;
            if (_ != M) {
              var j = T[C];
              P = c ? c(j, C, T) : r, P === r && (P = $e(j) ? j : Ws(a[_ + 1]) ? [] : {});
            }
            Ga(T, C, P), T = T[C];
          }
          return t;
        }
        var Zl = Hr ? function(t, a) {
          return Hr.set(t, a), t;
        } : Zt, lc = xr ? function(t, a) {
          return xr(t, "toString", { configurable: true, enumerable: false, value: Bc(a), writable: true });
        } : Zt;
        function dc(t) {
          return ft(ni(t));
        }
        function pt(t, a, o) {
          var c = -1, _ = t.length;
          a < 0 && (a = -a > _ ? 0 : _ + a), o = o > _ ? _ : o, o < 0 && (o += _), _ = a > o ? 0 : o - a >>> 0, a >>>= 0;
          for (var v = F(_); ++c < _; ) v[c] = t[c + a];
          return v;
        }
        function mc(t, a) {
          var o;
          return dn(t, function(c, _, v) {
            return o = a(c, _, v), !o;
          }), !!o;
        }
        function Za(t, a, o) {
          var c = 0, _ = t == null ? c : t.length;
          if (typeof a == "number" && a === a && _ <= mi) {
            for (; c < _; ) {
              var v = c + _ >>> 1, M = t[v];
              M !== null && !ls(M) && (o ? M <= a : M < a) ? c = v + 1 : _ = v;
            }
            return _;
          }
          return Ui(t, a, Zt, o);
        }
        function Ui(t, a, o, c) {
          var _ = 0, v = t == null ? 0 : t.length;
          if (v === 0) return 0;
          a = o(a);
          for (var M = a !== a, T = a === null, C = ls(a), P = a === r; _ < v; ) {
            var j = Oa((_ + v) / 2), R = o(t[j]), z = R !== r, K = R === null, ne = R === R, ce = ls(R);
            if (M) var ae = c || ne;
            else P ? ae = ne && (c || z) : T ? ae = ne && z && (c || !K) : C ? ae = ne && z && !K && (c || !ce) : K || ce ? ae = false : ae = c ? R <= a : R < a;
            ae ? _ = j + 1 : v = j;
          }
          return Be(v, or);
        }
        function Ql(t, a) {
          for (var o = -1, c = t.length, _ = 0, v = []; ++o < c; ) {
            var M = t[o], T = a ? a(M) : M;
            if (!o || !Gs(T, C)) {
              var C = T;
              v[_++] = M === 0 ? 0 : M;
            }
          }
          return v;
        }
        function Gr(t) {
          return typeof t == "number" ? t : ls(t) ? Yt : +t;
        }
        function yt(t) {
          if (typeof t == "string") return t;
          if (de(t)) return xe(t, yt) + "";
          if (ls(t)) return xl ? xl.call(t) : "";
          var a = t + "";
          return a == "0" && 1 / t == -Fs ? "-0" : a;
        }
        function un(t, a, o) {
          var c = -1, _ = kr, v = t.length, M = true, T = [], C = T;
          if (o) M = false, _ = vi;
          else if (v >= u) {
            var P = a ? null : gc(t);
            if (P) return oa(P);
            M = false, _ = ia, C = new bn();
          } else C = a ? [] : T;
          e: for (; ++c < v; ) {
            var j = t[c], R = a ? a(j) : j;
            if (j = o || j !== 0 ? j : 0, M && R === R) {
              for (var z = C.length; z--; ) if (C[z] === R) continue e;
              a && C.push(R), T.push(j);
            } else _(C, R, o) || (C !== T && C.push(R), T.push(j));
          }
          return T;
        }
        function zi(t, a) {
          return a = ws(a, t), t = lo(t, a), t == null || delete t[Ts(Ie(a))];
        }
        function Xl(t, a, o, c) {
          return Ka(t, a, o(Fn(t, a)), c);
        }
        function Vr(t, a, o, c) {
          for (var _ = t.length, v = c ? _ : -1; (c ? v-- : ++v < _) && a(t[v], v, t); ) ;
          return o ? pt(t, c ? 0 : v, c ? v + 1 : _) : pt(t, c ? v + 1 : 0, c ? _ : v);
        }
        function Bi(t, a) {
          var o = t;
          return o instanceof ue && (o = o.value()), wi(a, function(c, _) {
            return _.func.apply(_.thisArg, hs([c], _.args));
          }, o);
        }
        function Wi(t, a, o) {
          var c = t.length;
          if (c < 2) return c ? un(t[0]) : [];
          for (var _ = -1, v = F(c); ++_ < c; ) for (var M = t[_], T = -1; ++T < c; ) T != _ && (v[_] = ha(v[_] || M, t[T], a, o));
          return un(st(v, 1), a, o);
        }
        function cn(t, a, o) {
          for (var c = -1, _ = t.length, v = a.length, M = {}; ++c < _; ) {
            var T = c < v ? a[c] : r;
            o(M, t[c], T);
          }
          return M;
        }
        function $i(t) {
          return Xe(t) ? t : [];
        }
        function Gi(t) {
          return typeof t == "function" ? t : Zt;
        }
        function ws(t, a) {
          return de(t) ? t : Xr(t, a) ? [t] : Ld(be(t));
        }
        var ed = le;
        function At(t, a, o) {
          var c = t.length;
          return o = o === r ? c : o, !a && o >= c ? t : pt(t, a, o);
        }
        var Et = Mu || function(t) {
          return tt.clearTimeout(t);
        };
        function Ms(t, a) {
          if (a) return t.slice();
          var o = t.length, c = kl ? kl(o) : new t.constructor(o);
          return t.copy(c), c;
        }
        function rs(t) {
          var a = new t.constructor(t.byteLength);
          return new Sr(a).set(new Sr(t)), a;
        }
        function Us(t, a) {
          var o = a ? rs(t.buffer) : t.buffer;
          return new t.constructor(o, t.byteOffset, t.byteLength);
        }
        function td(t) {
          var a = new t.constructor(t.source, tn.exec(t));
          return a.lastIndex = t.lastIndex, a;
        }
        function sd(t) {
          return $a ? fe($a.call(t)) : {};
        }
        function nd(t, a) {
          var o = a ? rs(t.buffer) : t.buffer;
          return new t.constructor(o, t.byteOffset, t.length);
        }
        function Vi(t, a) {
          if (t !== a) {
            var o = t !== r, c = t === null, _ = t === t, v = ls(t), M = a !== r, T = a === null, C = a === a, P = ls(a);
            if (!T && !P && !v && t > a || v && M && C && !T && !P || c && M && C || !o && C || !_) return 1;
            if (!c && !v && !P && t < a || P && o && _ && !c && !v || T && o && _ || !M && _ || !C) return -1;
          }
          return 0;
        }
        function uc(t, a, o) {
          for (var c = -1, _ = t.criteria, v = a.criteria, M = _.length, T = o.length; ++c < M; ) {
            var C = Vi(_[c], v[c]);
            if (C) {
              if (c >= T) return C;
              var P = o[c];
              return C * (P == "desc" ? -1 : 1);
            }
          }
          return t.index - a.index;
        }
        function Jr(t, a, o, c) {
          for (var _ = -1, v = t.length, M = o.length, T = -1, C = a.length, P = Ve(v - M, 0), j = F(C + P), R = !c; ++T < C; ) j[T] = a[T];
          for (; ++_ < M; ) (R || _ < v) && (j[o[_]] = t[_]);
          for (; P--; ) j[T++] = t[_++];
          return j;
        }
        function Ji(t, a, o, c) {
          for (var _ = -1, v = t.length, M = -1, T = o.length, C = -1, P = a.length, j = Ve(v - T, 0), R = F(j + P), z = !c; ++_ < j; ) R[_] = t[_];
          for (var K = _; ++C < P; ) R[K + C] = a[C];
          for (; ++M < T; ) (z || _ < v) && (R[K + o[M]] = t[_++]);
          return R;
        }
        function ct(t, a) {
          var o = -1, c = t.length;
          for (a || (a = F(c)); ++o < c; ) a[o] = t[o];
          return a;
        }
        function Ls(t, a, o, c) {
          var _ = !o;
          o || (o = {});
          for (var v = -1, M = a.length; ++v < M; ) {
            var T = a[v], C = c ? c(o[T], t[T], T, o, t) : r;
            C === r && (C = t[T]), _ ? Rs(o, T, C) : Ga(o, T, C);
          }
          return o;
        }
        function Ki(t, a) {
          return Ls(t, Lt(t), a);
        }
        function ad(t, a) {
          return Ls(t, ao(t), a);
        }
        function Qa(t, a) {
          return function(o, c) {
            var _ = de(o) ? Qm : Gu, v = a ? a() : {};
            return _(o, t, ee(c, 2), v);
          };
        }
        function fa(t) {
          return le(function(a, o) {
            var c = -1, _ = o.length, v = _ > 1 ? o[_ - 1] : r, M = _ > 2 ? o[2] : r;
            for (v = t.length > 3 && typeof v == "function" ? (_--, v) : r, M && ht(o[0], o[1], M) && (v = _ < 3 ? r : v, _ = 1), a = fe(a); ++c < _; ) {
              var T = o[c];
              T && t(a, T, c, v);
            }
            return a;
          });
        }
        function Kr(t, a) {
          return function(o, c) {
            if (o == null) return o;
            if (!Jt(o)) return t(o, c);
            for (var _ = o.length, v = a ? _ : -1, M = fe(o); (a ? v-- : ++v < _) && c(M[v], v, M) !== false; ) ;
            return o;
          };
        }
        function Zi(t) {
          return function(a, o, c) {
            for (var _ = -1, v = fe(a), M = c(a), T = M.length; T--; ) {
              var C = M[t ? T : ++_];
              if (o(v[C], C, v) === false) break;
            }
            return a;
          };
        }
        function rd(t, a, o) {
          var c = a & x, _ = _a(t);
          function v() {
            var M = this && this !== tt && this instanceof v ? _ : t;
            return M.apply(c ? o : this, arguments);
          }
          return v;
        }
        function id(t) {
          return function(a) {
            a = be(a);
            var o = fs(a) ? bt(a) : r, c = o ? o[0] : a.charAt(0), _ = o ? At(o, 1).join("") : a.slice(1);
            return c[t]() + _;
          };
        }
        function gn(t) {
          return function(a) {
            return wi(k_(L_(a).replace(Um, "")), t, "");
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
            for (var v = arguments.length, M = F(v), T = v, C = ya(_); T--; ) M[T] = arguments[T];
            var P = v < 3 && M[0] !== C && M[v - 1] !== C ? [] : ns(M, C);
            if (v -= P.length, v < o) return eo(t, a, xn, _.placeholder, r, M, P, r, r, o - v);
            var j = this && this !== tt && this instanceof _ ? c : t;
            return mt(j, this, M);
          }
          return _;
        }
        function od(t) {
          return function(a, o, c) {
            var _ = fe(a);
            if (!Jt(a)) {
              var v = ee(o, 3);
              a = lt(a), o = function(T) {
                return v(_[T], T, _);
              };
            }
            var M = t(a, o, c);
            return M > -1 ? _[v ? a[M] : M] : r;
          };
        }
        function ld(t) {
          return Bs(function(a) {
            var o = a.length, c = o, _ = Wt.prototype.thru;
            for (t && a.reverse(); c--; ) {
              var v = a[c];
              if (typeof v != "function") throw new Bt(f);
              if (_ && !M && Qr(v) == "wrapper") var M = new Wt([], true);
            }
            for (c = M ? c : o; ++c < o; ) {
              v = a[c];
              var T = Qr(v), C = T == "wrapper" ? so(v) : r;
              C && Nn(C[0]) && C[1] == (V | se | ge | he) && !C[4].length && C[9] == 1 ? M = M[Qr(C[0])].apply(M, C[3]) : M = v.length == 1 && Nn(v) ? M[T]() : M.thru(v);
            }
            return function() {
              var P = arguments, j = P[0];
              if (M && P.length == 1 && de(j)) return M.plant(j).value();
              for (var R = 0, z = o ? a[R].apply(this, P) : j; ++R < o; ) z = a[R].call(this, z);
              return z;
            };
          });
        }
        function xn(t, a, o, c, _, v, M, T, C, P) {
          var j = a & V, R = a & x, z = a & Q, K = a & (se | Z), ne = a & je, ce = z ? r : _a(t);
          function ae() {
            for (var ve = arguments.length, Me = F(ve), ds = ve; ds--; ) Me[ds] = arguments[ds];
            if (K) var jt = ya(ae), ms = au(Me, jt);
            if (c && (Me = Jr(Me, c, _, K)), v && (Me = Ji(Me, v, M, K)), ve -= ms, K && ve < P) {
              var et = ns(Me, jt);
              return eo(t, a, xn, ae.placeholder, o, Me, et, T, C, P - ve);
            }
            var Vs = R ? o : this, Rn = z ? Vs[t] : t;
            return ve = Me.length, T ? Me = Ma(Me, T) : ne && ve > 1 && Me.reverse(), j && C < ve && (Me.length = C), this && this !== tt && this instanceof ae && (Rn = ce || _a(Rn)), Rn.apply(Vs, Me);
          }
          return ae;
        }
        function dd(t, a) {
          return function(o, c) {
            return Os(o, t, a(c), {});
          };
        }
        function gt(t, a) {
          return function(o, c) {
            var _;
            if (o === r && c === r) return a;
            if (o !== r && (_ = o), c !== r) {
              if (_ === r) return c;
              typeof o == "string" || typeof c == "string" ? (o = yt(o), c = yt(c)) : (o = Gr(o), c = Gr(c)), _ = t(o, c);
            }
            return _;
          };
        }
        function Qi(t) {
          return Bs(function(a) {
            return a = xe(a, _t(ee())), le(function(o) {
              var c = this;
              return t(a, function(_) {
                return mt(_, c, o);
              });
            });
          });
        }
        function Zr(t, a) {
          a = a === r ? " " : yt(a);
          var o = a.length;
          if (o < 2) return o ? Oi(a, t) : a;
          var c = Oi(a, Nr(t / rn(a)));
          return fs(a) ? At(bt(c), 0, t).join("") : c.slice(0, t);
        }
        function cc(t, a, o, c) {
          var _ = a & x, v = _a(t);
          function M() {
            for (var T = -1, C = arguments.length, P = -1, j = c.length, R = F(j + C), z = this && this !== tt && this instanceof M ? v : t; ++P < j; ) R[P] = c[P];
            for (; C--; ) R[P++] = arguments[++T];
            return mt(z, _ ? o : this, R);
          }
          return M;
        }
        function Xi(t) {
          return function(a, o, c) {
            return c && typeof c != "number" && ht(a, o, c) && (o = c = r), a = In(a), o === r ? (o = a, a = 0) : o = In(o), c = c === r ? a < o ? 1 : -1 : In(c), Ri(a, o, c, t);
          };
        }
        function pa(t) {
          return function(a, o) {
            return typeof a == "string" && typeof o == "string" || (a = Ys(a), o = Ys(o)), t(a, o);
          };
        }
        function eo(t, a, o, c, _, v, M, T, C, P) {
          var j = a & se, R = j ? M : r, z = j ? r : M, K = j ? v : r, ne = j ? r : v;
          a |= j ? ge : B, a &= ~(j ? B : ge), a & X || (a &= -4);
          var ce = [t, a, _, K, R, ne, z, T, C, P], ae = o.apply(r, ce);
          return Nn(t) && vd(ae, ce), ae.placeholder = c, wd(ae, t, a);
        }
        function to(t) {
          var a = Qe[t];
          return function(o, c) {
            if (o = Ys(o), c = c == null ? 0 : Be(me(c), 292), c && Ua(o)) {
              var _ = (be(o) + "e").split("e"), v = a(_[0] + "e" + (+_[1] + c));
              return _ = (be(v) + "e").split("e"), +(_[0] + "e" + (+_[1] - c));
            }
            return a(o);
          };
        }
        var gc = ua && 1 / oa(new ua([, -0]))[1] == Fs ? function(t) {
          return new ua(t);
        } : Gc;
        function md(t) {
          return function(a) {
            var o = We(a);
            return o == es ? Ci(a) : o == Oe ? mu(a) : nu(a, t(a));
          };
        }
        function zs(t, a, o, c, _, v, M, T) {
          var C = a & Q;
          if (!C && typeof t != "function") throw new Bt(f);
          var P = c ? c.length : 0;
          if (P || (a &= -97, c = _ = r), M = M === r ? M : Ve(me(M), 0), T = T === r ? T : me(T), P -= _ ? _.length : 0, a & B) {
            var j = c, R = _;
            c = _ = r;
          }
          var z = C ? r : so(t), K = [t, a, o, c, _, j, R, v, M, T];
          if (z && yd(K, z), t = K[0], a = K[1], o = K[2], c = K[3], _ = K[4], T = K[9] = K[9] === r ? C ? 0 : t.length : Ve(K[9] - P, 0), !T && a & (se | Z) && (a &= -25), !a || a == x) var ne = rd(t, a, o);
          else a == se || a == Z ? ne = is(t, a, T) : (a == ge || a == (x | ge)) && !_.length ? ne = cc(t, a, o, c) : ne = xn.apply(r, K);
          var ce = z ? Zl : vd;
          return wd(ce(ne, K), t, a);
        }
        function ud(t, a, o, c) {
          return t === r || Gs(t, da[o]) && !De.call(c, o) ? a : t;
        }
        function cd(t, a, o, c, _, v) {
          return $e(t) && $e(a) && (v.set(a, t), Wr(t, a, r, cd, v), v.delete(a)), t;
        }
        function hc(t) {
          return wo(t) ? r : t;
        }
        function gd(t, a, o, c, _, v) {
          var M = o & q, T = t.length, C = a.length;
          if (T != C && !(M && C > T)) return false;
          var P = v.get(t), j = v.get(a);
          if (P && j) return P == a && j == t;
          var R = -1, z = true, K = o & O ? new bn() : r;
          for (v.set(t, a), v.set(a, t); ++R < T; ) {
            var ne = t[R], ce = a[R];
            if (c) var ae = M ? c(ce, ne, R, a, t, v) : c(ne, ce, R, t, a, v);
            if (ae !== r) {
              if (ae) continue;
              z = false;
              break;
            }
            if (K) {
              if (!Mi(a, function(ve, Me) {
                if (!ia(K, Me) && (ne === ve || _(ne, ve, o, c, v))) return K.push(Me);
              })) {
                z = false;
                break;
              }
            } else if (!(ne === ce || _(ne, ce, o, c, v))) {
              z = false;
              break;
            }
          }
          return v.delete(t), v.delete(a), z;
        }
        function fc(t, a, o, c, _, v, M) {
          switch (o) {
            case Xs:
              if (t.byteLength != a.byteLength || t.byteOffset != a.byteOffset) return false;
              t = t.buffer, a = a.buffer;
            case Vn:
              return !(t.byteLength != a.byteLength || !v(new Sr(t), new Sr(a)));
            case Qs:
            case Wn:
            case xa:
              return Gs(+t, +a);
            case dr:
              return t.name == a.name && t.message == a.message;
            case $n:
            case Mn:
              return t == a + "";
            case es:
              var T = Ci;
            case Oe:
              var C = c & q;
              if (T || (T = oa), t.size != a.size && !C) return false;
              var P = M.get(t);
              if (P) return P == a;
              c |= O, M.set(t, a);
              var j = gd(T(t), T(a), c, _, v, M);
              return M.delete(t), j;
            case ur:
              if ($a) return $a.call(t) == $a.call(a);
          }
          return false;
        }
        function _c(t, a, o, c, _, v) {
          var M = o & q, T = vt(t), C = T.length, P = vt(a), j = P.length;
          if (C != j && !M) return false;
          for (var R = C; R--; ) {
            var z = T[R];
            if (!(M ? z in a : De.call(a, z))) return false;
          }
          var K = v.get(t), ne = v.get(a);
          if (K && ne) return K == a && ne == t;
          var ce = true;
          v.set(t, a), v.set(a, t);
          for (var ae = M; ++R < C; ) {
            z = T[R];
            var ve = t[z], Me = a[z];
            if (c) var ds = M ? c(Me, ve, z, a, t, v) : c(ve, Me, z, t, a, v);
            if (!(ds === r ? ve === Me || _(ve, Me, o, c, v) : ds)) {
              ce = false;
              break;
            }
            ae || (ae = z == "constructor");
          }
          if (ce && !ae) {
            var jt = t.constructor, ms = a.constructor;
            jt != ms && "constructor" in t && "constructor" in a && !(typeof jt == "function" && jt instanceof jt && typeof ms == "function" && ms instanceof ms) && (ce = false);
          }
          return v.delete(t), v.delete(a), ce;
        }
        function Bs(t) {
          return Dt(oo(t, r, $s), t + "");
        }
        function vt(t) {
          return Ul(t, lt, Lt);
        }
        function wt(t) {
          return Ul(t, Kt, ao);
        }
        var so = Hr ? function(t) {
          return Hr.get(t);
        } : Gc;
        function Qr(t) {
          for (var a = t.name + "", o = ca[a], c = De.call(ca, a) ? o.length : 0; c--; ) {
            var _ = o[c], v = _.func;
            if (v == null || v == t) return _.name;
          }
          return a;
        }
        function ya(t) {
          var a = De.call(y, "placeholder") ? y : t;
          return a.placeholder;
        }
        function ee() {
          var t = y.iteratee || Wc;
          return t = t === Wc ? Ft : t, arguments.length ? t(arguments[0], arguments[1]) : t;
        }
        function Xa(t, a) {
          var o = t.__data__;
          return io(a) ? o[typeof a == "string" ? "string" : "hash"] : o.map;
        }
        function no(t) {
          for (var a = lt(t), o = a.length; o--; ) {
            var c = a[o], _ = t[c];
            a[o] = [c, _, _d(_)];
          }
          return a;
        }
        function Mt(t, a) {
          var o = ou(t, a);
          return Ja(o) ? o : r;
        }
        function pc(t) {
          var a = De.call(t, Cn), o = t[Cn];
          try {
            t[Cn] = r;
            var c = true;
          } catch {
          }
          var _ = Cr.call(t);
          return c && (a ? t[Cn] = o : delete t[Cn]), _;
        }
        var Lt = Ar ? function(t) {
          return t == null ? [] : (t = fe(t), an(Ar(t), function(a) {
            return Dl.call(t, a);
          }));
        } : Vc, ao = Ar ? function(t) {
          for (var a = []; t; ) hs(a, Lt(t)), t = Fr(t);
          return a;
        } : Vc, We = ut;
        (bi && We(new bi(new ArrayBuffer(1))) != Xs || za && We(new za()) != es || Si && We(Si.resolve()) != jo || ua && We(new ua()) != Oe || Ba && We(new Ba()) != Gn) && (We = function(t) {
          var a = ut(t), o = a == xs ? t.constructor : r, c = o ? En(o) : "";
          if (c) switch (c) {
            case Du:
              return Xs;
            case Yu:
              return es;
            case Cu:
              return jo;
            case bu:
              return Oe;
            case Su:
              return Gn;
          }
          return a;
        });
        function os(t, a, o) {
          for (var c = -1, _ = o.length; ++c < _; ) {
            var v = o[c], M = v.size;
            switch (v.type) {
              case "drop":
                t += M;
                break;
              case "dropRight":
                a -= M;
                break;
              case "take":
                a = Be(a, t + M);
                break;
              case "takeRight":
                t = Ve(t, a - M);
                break;
            }
          }
          return { start: t, end: a };
        }
        function ro(t) {
          var a = t.match(it);
          return a ? a[1].split(As) : [];
        }
        function hd(t, a, o) {
          a = ws(a, t);
          for (var c = -1, _ = a.length, v = false; ++c < _; ) {
            var M = Ts(a[c]);
            if (!(v = t != null && o(t, M))) break;
            t = t[M];
          }
          return v || ++c != _ ? v : (_ = t == null ? 0 : t.length, !!_ && Hd(_) && Ws(M, _) && (de(t) || er(t)));
        }
        function yc(t) {
          var a = t.length, o = new t.constructor(a);
          return a && typeof t[0] == "string" && De.call(t, "index") && (o.index = t.index, o.input = t.input), o;
        }
        function fd(t) {
          return typeof t.constructor == "function" && !ks(t) ? ga(Fr(t)) : {};
        }
        function vc(t, a, o) {
          var c = t.constructor;
          switch (a) {
            case Vn:
              return rs(t);
            case Qs:
            case Wn:
              return new c(+t);
            case Xs:
              return Us(t, o);
            case Jn:
            case Fe:
            case cr:
            case gr:
            case Kn:
            case Na:
            case Zn:
            case en:
            case Qn:
              return nd(t, o);
            case es:
              return new c();
            case xa:
            case Mn:
              return new c(t);
            case $n:
              return td(t);
            case Oe:
              return new c();
            case ur:
              return sd(t);
          }
        }
        function kt(t, a) {
          var o = a.length;
          if (!o) return t;
          var c = o - 1;
          return a[c] = (o > 1 ? "& " : "") + a[c], a = a.join(o > 2 ? ", " : " "), t.replace(_r, `{
/* [wrapped with ` + a + `] */
`);
        }
        function wc(t) {
          return de(t) || er(t) || !!(Yl && t && t[Yl]);
        }
        function Ws(t, a) {
          var o = typeof t;
          return a = a ?? Zs, !!a && (o == "number" || o != "symbol" && xm.test(t)) && t > -1 && t % 1 == 0 && t < a;
        }
        function ht(t, a, o) {
          if (!$e(o)) return false;
          var c = typeof a;
          return (c == "number" ? Jt(o) && Ws(a, o.length) : c == "string" && a in o) ? Gs(o[a], t) : false;
        }
        function Xr(t, a) {
          if (de(t)) return false;
          var o = typeof t;
          return o == "number" || o == "symbol" || o == "boolean" || t == null || ls(t) ? true : zt.test(t) || !Ns.test(t) || a != null && t in fe(a);
        }
        function io(t) {
          var a = typeof t;
          return a == "string" || a == "number" || a == "symbol" || a == "boolean" ? t !== "__proto__" : t === null;
        }
        function Nn(t) {
          var a = Qr(t), o = y[a];
          if (typeof o != "function" || !(a in ue.prototype)) return false;
          if (t === o) return true;
          var c = so(o);
          return !!c && t === c[0];
        }
        function Mc(t) {
          return !!Ll && Ll in t;
        }
        var Lc = Yr ? qn : Jc;
        function ks(t) {
          var a = t && t.constructor, o = typeof a == "function" && a.prototype || da;
          return t === o;
        }
        function _d(t) {
          return t === t && !$e(t);
        }
        function pd(t, a) {
          return function(o) {
            return o == null ? false : o[t] === a && (a !== r || t in fe(o));
          };
        }
        function va(t) {
          var a = Ad(t, function(c) {
            return o.size === w && o.clear(), c;
          }), o = a.cache;
          return a;
        }
        function yd(t, a) {
          var o = t[1], c = a[1], _ = o | c, v = _ < (x | Q | V), M = c == V && o == se || c == V && o == he && t[7].length <= a[8] || c == (V | he) && a[7].length <= a[8] && o == se;
          if (!(v || M)) return t;
          c & x && (t[2] = a[2], _ |= o & x ? 0 : X);
          var T = a[3];
          if (T) {
            var C = t[3];
            t[3] = C ? Jr(C, T, a[4]) : T, t[4] = C ? ns(t[3], D) : a[4];
          }
          return T = a[5], T && (C = t[5], t[5] = C ? Ji(C, T, a[6]) : T, t[6] = C ? ns(t[5], D) : a[6]), T = a[7], T && (t[7] = T), c & V && (t[8] = t[8] == null ? a[8] : Be(t[8], a[8])), t[9] == null && (t[9] = a[9]), t[0] = a[0], t[1] = _, t;
        }
        function hn(t) {
          var a = [];
          if (t != null) for (var o in fe(t)) a.push(o);
          return a;
        }
        function wa(t) {
          return Cr.call(t);
        }
        function oo(t, a, o) {
          return a = Ve(a === r ? t.length - 1 : a, 0), function() {
            for (var c = arguments, _ = -1, v = Ve(c.length - a, 0), M = F(v); ++_ < v; ) M[_] = c[a + _];
            _ = -1;
            for (var T = F(a + 1); ++_ < a; ) T[_] = c[_];
            return T[a] = o(M), mt(t, this, T);
          };
        }
        function lo(t, a) {
          return a.length < 2 ? t : Fn(t, pt(a, 0, -1));
        }
        function Ma(t, a) {
          for (var o = t.length, c = Be(a.length, o), _ = ct(t); c--; ) {
            var v = a[c];
            t[c] = Ws(v, o) ? _[v] : r;
          }
          return t;
        }
        function An(t, a) {
          if (!(a === "constructor" && typeof t[a] == "function") && a != "__proto__") return t[a];
        }
        var vd = Md(Zl), Tt = ku || function(t, a) {
          return tt.setTimeout(t, a);
        }, Dt = Md(lc);
        function wd(t, a, o) {
          var c = a + "";
          return Dt(t, kt(c, kc(ro(c), o)));
        }
        function Md(t) {
          var a = 0, o = 0;
          return function() {
            var c = bl(), _ = Re - (c - o);
            if (o = c, _ > 0) {
              if (++a >= Ot) return arguments[0];
            } else a = 0;
            return t.apply(r, arguments);
          };
        }
        function ft(t, a) {
          var o = -1, c = t.length, _ = c - 1;
          for (a = a === r ? c : a; ++o < a; ) {
            var v = $r(o, _), M = t[v];
            t[v] = t[o], t[o] = M;
          }
          return t.length = a, t;
        }
        var Ld = va(function(t) {
          var a = [];
          return t.charCodeAt(0) === 46 && a.push(""), t.replace(_e, function(o, c, _, v) {
            a.push(_ ? v.replace(ts, "$1") : c || o);
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
        function kc(t, a) {
          return Ge(Bn, function(o) {
            var c = "_." + o[0];
            a & o[1] && !kr(t, c) && t.push(c);
          }), t.sort();
        }
        function mo(t) {
          if (t instanceof ue) return t.clone();
          var a = new Wt(t.__wrapped__, t.__chain__);
          return a.__actions__ = ct(t.__actions__), a.__index__ = t.__index__, a.__values__ = t.__values__, a;
        }
        function Tc(t, a, o) {
          (o ? ht(t, a, o) : a === r) ? a = 1 : a = Ve(me(a), 0);
          var c = t == null ? 0 : t.length;
          if (!c || a < 1) return [];
          for (var _ = 0, v = 0, M = F(Nr(c / a)); _ < c; ) M[v++] = pt(t, _, _ += a);
          return M;
        }
        function uo(t) {
          for (var a = -1, o = t == null ? 0 : t.length, c = 0, _ = []; ++a < o; ) {
            var v = t[a];
            v && (_[c++] = v);
          }
          return _;
        }
        function kd() {
          var t = arguments.length;
          if (!t) return [];
          for (var a = F(t - 1), o = arguments[0], c = t; c--; ) a[c - 1] = arguments[c];
          return hs(de(o) ? ct(o) : [o], st(a, 1));
        }
        var Td = le(function(t, a) {
          return Xe(t) ? ha(t, st(a, 1, Xe, true)) : [];
        }), Dc = le(function(t, a) {
          var o = Ie(a);
          return Xe(o) && (o = r), Xe(t) ? ha(t, st(a, 1, Xe, true), ee(o, 2)) : [];
        }), co = le(function(t, a) {
          var o = Ie(a);
          return Xe(o) && (o = r), Xe(t) ? ha(t, st(a, 1, Xe, true), r, o) : [];
        });
        function Dd(t, a, o) {
          var c = t == null ? 0 : t.length;
          return c ? (a = o || a === r ? 1 : me(a), pt(t, a < 0 ? 0 : a, c)) : [];
        }
        function Yc(t, a, o) {
          var c = t == null ? 0 : t.length;
          return c ? (a = o || a === r ? 1 : me(a), a = c - a, pt(t, 0, a < 0 ? 0 : a)) : [];
        }
        function Cc(t, a) {
          return t && t.length ? Vr(t, ee(a, 3), true, true) : [];
        }
        function Yd(t, a) {
          return t && t.length ? Vr(t, ee(a, 3), true) : [];
        }
        function bc(t, a, o, c) {
          var _ = t == null ? 0 : t.length;
          return _ ? (o && typeof o != "number" && ht(t, a, o) && (o = 0, c = _), Ku(t, a, o, c)) : [];
        }
        function ei(t, a, o) {
          var c = t == null ? 0 : t.length;
          if (!c) return -1;
          var _ = o == null ? 0 : me(o);
          return _ < 0 && (_ = Ve(c + _, 0)), Tr(t, ee(a, 3), _);
        }
        function Hn(t, a, o) {
          var c = t == null ? 0 : t.length;
          if (!c) return -1;
          var _ = c - 1;
          return o !== r && (_ = me(o), _ = o < 0 ? Ve(c + _, 0) : Be(_, c - 1)), Tr(t, ee(a, 3), _, true);
        }
        function $s(t) {
          var a = t == null ? 0 : t.length;
          return a ? st(t, 1) : [];
        }
        function Pn(t) {
          var a = t == null ? 0 : t.length;
          return a ? st(t, Fs) : [];
        }
        function Sc(t, a) {
          var o = t == null ? 0 : t.length;
          return o ? (a = a === r ? 1 : me(a), st(t, a)) : [];
        }
        function fn(t) {
          for (var a = -1, o = t == null ? 0 : t.length, c = {}; ++a < o; ) {
            var _ = t[a];
            c[_[0]] = _[1];
          }
          return c;
        }
        function ti(t) {
          return t && t.length ? t[0] : r;
        }
        function Cd(t, a, o) {
          var c = t == null ? 0 : t.length;
          if (!c) return -1;
          var _ = o == null ? 0 : me(o);
          return _ < 0 && (_ = Ve(c + _, 0)), ra(t, a, _);
        }
        function go(t) {
          var a = t == null ? 0 : t.length;
          return a ? pt(t, 0, -1) : [];
        }
        var Fc = le(function(t) {
          var a = xe(t, $i);
          return a.length && a[0] === t[0] ? Pi(a) : [];
        }), xc = le(function(t) {
          var a = Ie(t), o = xe(t, $i);
          return a === Ie(o) ? a = r : o.pop(), o.length && o[0] === t[0] ? Pi(o, ee(a, 2)) : [];
        }), La = le(function(t) {
          var a = Ie(t), o = xe(t, $i);
          return a = typeof a == "function" ? a : r, a && o.pop(), o.length && o[0] === t[0] ? Pi(o, r, a) : [];
        });
        function Gt(t, a) {
          return t == null ? "" : ma.call(t, a);
        }
        function Ie(t) {
          var a = t == null ? 0 : t.length;
          return a ? t[a - 1] : r;
        }
        function Ht(t, a, o) {
          var c = t == null ? 0 : t.length;
          if (!c) return -1;
          var _ = c;
          return o !== r && (_ = me(o), _ = _ < 0 ? Ve(c + _, 0) : Be(_, c - 1)), a === a ? uu(t, a, _) : Tr(t, hl, _, true);
        }
        function Pt(t, a) {
          return t && t.length ? Gl(t, me(a)) : r;
        }
        var Nc = le(bd);
        function bd(t, a) {
          return t && t.length && a && a.length ? Ii(t, a) : t;
        }
        function ho(t, a, o) {
          return t && t.length && a && a.length ? Ii(t, a, ee(o, 2)) : t;
        }
        function fo(t, a, o) {
          return t && t.length && a && a.length ? Ii(t, a, r, o) : t;
        }
        var _o = Bs(function(t, a) {
          var o = t == null ? 0 : t.length, c = Or(t, a);
          return Nt(t, xe(a, function(_) {
            return Ws(_, o) ? +_ : _;
          }).sort(Vi)), c;
        });
        function Ac(t, a) {
          var o = [];
          if (!(t && t.length)) return o;
          var c = -1, _ = [], v = t.length;
          for (a = ee(a, 3); ++c < v; ) {
            var M = t[c];
            a(M, c, t) && (o.push(M), _.push(c));
          }
          return Nt(t, _), o;
        }
        function po(t) {
          return t == null ? t : Tu.call(t);
        }
        function ka(t, a, o) {
          var c = t == null ? 0 : t.length;
          return c ? (o && typeof o != "number" && ht(t, a, o) ? (a = 0, o = c) : (a = a == null ? 0 : me(a), o = o === r ? c : me(o)), pt(t, a, o)) : [];
        }
        function Ec(t, a) {
          return Za(t, a);
        }
        function yo(t, a, o) {
          return Ui(t, a, ee(o, 2));
        }
        function Vt(t, a) {
          var o = t == null ? 0 : t.length;
          if (o) {
            var c = Za(t, a);
            if (c < o && Gs(t[c], a)) return c;
          }
          return -1;
        }
        function Hc(t, a) {
          return Za(t, a, true);
        }
        function jn(t, a, o) {
          return Ui(t, a, ee(o, 2), true);
        }
        function Pc(t, a) {
          var o = t == null ? 0 : t.length;
          if (o) {
            var c = Za(t, a, true) - 1;
            if (Gs(t[c], a)) return c;
          }
          return -1;
        }
        function Ta(t) {
          return t && t.length ? Ql(t) : [];
        }
        function Sd(t, a) {
          return t && t.length ? Ql(t, ee(a, 2)) : [];
        }
        function vo(t) {
          var a = t == null ? 0 : t.length;
          return a ? pt(t, 1, a) : [];
        }
        function e(t, a, o) {
          return t && t.length ? (a = o || a === r ? 1 : me(a), pt(t, 0, a < 0 ? 0 : a)) : [];
        }
        function n(t, a, o) {
          var c = t == null ? 0 : t.length;
          return c ? (a = o || a === r ? 1 : me(a), a = c - a, pt(t, a < 0 ? 0 : a, c)) : [];
        }
        function d(t, a) {
          return t && t.length ? Vr(t, ee(a, 3), false, true) : [];
        }
        function m(t, a) {
          return t && t.length ? Vr(t, ee(a, 3)) : [];
        }
        var h = le(function(t) {
          return un(st(t, 1, Xe, true));
        }), k = le(function(t) {
          var a = Ie(t);
          return Xe(a) && (a = r), un(st(t, 1, Xe, true), ee(a, 2));
        }), S = le(function(t) {
          var a = Ie(t);
          return a = typeof a == "function" ? a : r, un(st(t, 1, Xe, true), r, a);
        });
        function W(t) {
          return t && t.length ? un(t) : [];
        }
        function ie(t, a) {
          return t && t.length ? un(t, ee(a, 2)) : [];
        }
        function ye(t, a) {
          return a = typeof a == "function" ? a : r, t && t.length ? un(t, r, a) : [];
        }
        function nt(t) {
          if (!(t && t.length)) return [];
          var a = 0;
          return t = an(t, function(o) {
            if (Xe(o)) return a = Ve(o.length, a), true;
          }), Di(a, function(o) {
            return xe(t, Li(o));
          });
        }
        function Ds(t, a) {
          if (!(t && t.length)) return [];
          var o = nt(t);
          return a == null ? o : xe(o, function(c) {
            return mt(a, r, c);
          });
        }
        var _n = le(function(t, a) {
          return Xe(t) ? ha(t, a) : [];
        }), b1 = le(function(t) {
          return Wi(an(t, Xe));
        }), S1 = le(function(t) {
          var a = Ie(t);
          return Xe(a) && (a = r), Wi(an(t, Xe), ee(a, 2));
        }), F1 = le(function(t) {
          var a = Ie(t);
          return a = typeof a == "function" ? a : r, Wi(an(t, Xe), r, a);
        }), x1 = le(nt);
        function N1(t, a) {
          return cn(t || [], a || [], Ga);
        }
        function A1(t, a) {
          return cn(t || [], a || [], Ka);
        }
        var E1 = le(function(t) {
          var a = t.length, o = a > 1 ? t[a - 1] : r;
          return o = typeof o == "function" ? (t.pop(), o) : r, Ds(t, o);
        });
        function Xf(t) {
          var a = y(t);
          return a.__chain__ = true, a;
        }
        function H1(t, a) {
          return a(t), t;
        }
        function Fd(t, a) {
          return a(t);
        }
        var P1 = Bs(function(t) {
          var a = t.length, o = a ? t[0] : 0, c = this.__wrapped__, _ = function(v) {
            return Or(v, t);
          };
          return a > 1 || this.__actions__.length || !(c instanceof ue) || !Ws(o) ? this.thru(_) : (c = c.slice(o, +o + (a ? 1 : 0)), c.__actions__.push({ func: Fd, args: [_], thisArg: r }), new Wt(c, this.__chain__).thru(function(v) {
            return a && !v.length && v.push(r), v;
          }));
        });
        function j1() {
          return Xf(this);
        }
        function q1() {
          return new Wt(this.value(), this.__chain__);
        }
        function I1() {
          this.__values__ === r && (this.__values__ = g_(this.value()));
          var t = this.__index__ >= this.__values__.length, a = t ? r : this.__values__[this.__index__++];
          return { done: t, value: a };
        }
        function R1() {
          return this;
        }
        function O1(t) {
          for (var a, o = this; o instanceof jr; ) {
            var c = mo(o);
            c.__index__ = 0, c.__values__ = r, a ? _.__wrapped__ = c : a = c;
            var _ = c;
            o = o.__wrapped__;
          }
          return _.__wrapped__ = t, a;
        }
        function U1() {
          var t = this.__wrapped__;
          if (t instanceof ue) {
            var a = t;
            return this.__actions__.length && (a = new ue(this)), a = a.reverse(), a.__actions__.push({ func: Fd, args: [po], thisArg: r }), new Wt(a, this.__chain__);
          }
          return this.thru(po);
        }
        function z1() {
          return Bi(this.__wrapped__, this.__actions__);
        }
        var B1 = Qa(function(t, a, o) {
          De.call(t, o) ? ++t[o] : Rs(t, o, 1);
        });
        function W1(t, a, o) {
          var c = de(t) ? Lr : Ju;
          return o && ht(t, a, o) && (a = r), c(t, ee(a, 3));
        }
        function $1(t, a) {
          var o = de(t) ? an : Rl;
          return o(t, ee(a, 3));
        }
        var G1 = od(ei), V1 = od(Hn);
        function J1(t, a) {
          return st(xd(t, a), 1);
        }
        function K1(t, a) {
          return st(xd(t, a), Fs);
        }
        function Z1(t, a, o) {
          return o = o === r ? 1 : me(o), st(xd(t, a), o);
        }
        function e_(t, a) {
          var o = de(t) ? Ge : dn;
          return o(t, ee(a, 3));
        }
        function t_(t, a) {
          var o = de(t) ? Xm : Il;
          return o(t, ee(a, 3));
        }
        var Q1 = Qa(function(t, a, o) {
          De.call(t, o) ? t[o].push(a) : Rs(t, o, [a]);
        });
        function X1(t, a, o, c) {
          t = Jt(t) ? t : ni(t), o = o && !c ? me(o) : 0;
          var _ = t.length;
          return o < 0 && (o = Ve(_ + o, 0)), Pd(t) ? o <= _ && t.indexOf(a, o) > -1 : !!_ && ra(t, a, o) > -1;
        }
        var ev = le(function(t, a, o) {
          var c = -1, _ = typeof a == "function", v = Jt(t) ? F(t.length) : [];
          return dn(t, function(M) {
            v[++c] = _ ? mt(a, M, o) : vs(M, a, o);
          }), v;
        }), tv = Qa(function(t, a, o) {
          Rs(t, o, a);
        });
        function xd(t, a) {
          var o = de(t) ? xe : Wl;
          return o(t, ee(a, 3));
        }
        function sv(t, a, o, c) {
          return t == null ? [] : (de(a) || (a = a == null ? [] : [a]), o = c ? r : o, de(o) || (o = o == null ? [] : [o]), Vl(t, a, o));
        }
        var nv = Qa(function(t, a, o) {
          t[o ? 0 : 1].push(a);
        }, function() {
          return [[], []];
        });
        function av(t, a, o) {
          var c = de(t) ? wi : fl, _ = arguments.length < 3;
          return c(t, ee(a, 4), o, _, dn);
        }
        function rv(t, a, o) {
          var c = de(t) ? eu : fl, _ = arguments.length < 3;
          return c(t, ee(a, 4), o, _, Il);
        }
        function iv(t, a) {
          var o = de(t) ? an : Rl;
          return o(t, Ed(ee(a, 3)));
        }
        function ov(t) {
          var a = de(t) ? jl : ic;
          return a(t);
        }
        function lv(t, a, o) {
          (o ? ht(t, a, o) : a === r) ? a = 1 : a = me(a);
          var c = de(t) ? Wu : oc;
          return c(t, a);
        }
        function dv(t) {
          var a = de(t) ? $u : dc;
          return a(t);
        }
        function mv(t) {
          if (t == null) return 0;
          if (Jt(t)) return Pd(t) ? rn(t) : t.length;
          var a = We(t);
          return a == es || a == Oe ? t.size : zr(t).length;
        }
        function uv(t, a, o) {
          var c = de(t) ? Mi : mc;
          return o && ht(t, a, o) && (a = r), c(t, ee(a, 3));
        }
        var cv = le(function(t, a) {
          if (t == null) return [];
          var o = a.length;
          return o > 1 && ht(t, a[0], a[1]) ? a = [] : o > 2 && ht(a[0], a[1], a[2]) && (a = [a[0]]), Vl(t, st(a, 1), []);
        }), Nd = Lu || function() {
          return tt.Date.now();
        };
        function gv(t, a) {
          if (typeof a != "function") throw new Bt(f);
          return t = me(t), function() {
            if (--t < 1) return a.apply(this, arguments);
          };
        }
        function s_(t, a, o) {
          return a = o ? r : a, a = t && a == null ? t.length : a, zs(t, V, r, r, r, r, a);
        }
        function n_(t, a) {
          var o;
          if (typeof a != "function") throw new Bt(f);
          return t = me(t), function() {
            return --t > 0 && (o = a.apply(this, arguments)), t <= 1 && (a = r), o;
          };
        }
        var jc = le(function(t, a, o) {
          var c = x;
          if (o.length) {
            var _ = ns(o, ya(jc));
            c |= ge;
          }
          return zs(t, c, a, o, _);
        }), a_ = le(function(t, a, o) {
          var c = x | Q;
          if (o.length) {
            var _ = ns(o, ya(a_));
            c |= ge;
          }
          return zs(a, c, t, o, _);
        });
        function r_(t, a, o) {
          a = o ? r : a;
          var c = zs(t, se, r, r, r, r, r, a);
          return c.placeholder = r_.placeholder, c;
        }
        function i_(t, a, o) {
          a = o ? r : a;
          var c = zs(t, Z, r, r, r, r, r, a);
          return c.placeholder = i_.placeholder, c;
        }
        function o_(t, a, o) {
          var c, _, v, M, T, C, P = 0, j = false, R = false, z = true;
          if (typeof t != "function") throw new Bt(f);
          a = Ys(a) || 0, $e(o) && (j = !!o.leading, R = "maxWait" in o, v = R ? Ve(Ys(o.maxWait) || 0, a) : v, z = "trailing" in o ? !!o.trailing : z);
          function K(et) {
            var Vs = c, Rn = _;
            return c = _ = r, P = et, M = t.apply(Rn, Vs), M;
          }
          function ne(et) {
            return P = et, T = Tt(ve, a), j ? K(et) : M;
          }
          function ce(et) {
            var Vs = et - C, Rn = et - P, Y_ = a - Vs;
            return R ? Be(Y_, v - Rn) : Y_;
          }
          function ae(et) {
            var Vs = et - C, Rn = et - P;
            return C === r || Vs >= a || Vs < 0 || R && Rn >= v;
          }
          function ve() {
            var et = Nd();
            if (ae(et)) return Me(et);
            T = Tt(ve, ce(et));
          }
          function Me(et) {
            return T = r, z && c ? K(et) : (c = _ = r, M);
          }
          function ds() {
            T !== r && Et(T), P = 0, c = C = _ = T = r;
          }
          function jt() {
            return T === r ? M : Me(Nd());
          }
          function ms() {
            var et = Nd(), Vs = ae(et);
            if (c = arguments, _ = this, C = et, Vs) {
              if (T === r) return ne(C);
              if (R) return Et(T), T = Tt(ve, a), K(C);
            }
            return T === r && (T = Tt(ve, a)), M;
          }
          return ms.cancel = ds, ms.flush = jt, ms;
        }
        var hv = le(function(t, a) {
          return _s(t, 1, a);
        }), fv = le(function(t, a, o) {
          return _s(t, Ys(a) || 0, o);
        });
        function _v(t) {
          return zs(t, je);
        }
        function Ad(t, a) {
          if (typeof t != "function" || a != null && typeof a != "function") throw new Bt(f);
          var o = function() {
            var c = arguments, _ = a ? a.apply(this, c) : c[0], v = o.cache;
            if (v.has(_)) return v.get(_);
            var M = t.apply(this, c);
            return o.cache = v.set(_, M) || v, M;
          };
          return o.cache = new (Ad.Cache || Is)(), o;
        }
        Ad.Cache = Is;
        function Ed(t) {
          if (typeof t != "function") throw new Bt(f);
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
        function pv(t) {
          return n_(2, t);
        }
        var yv = ed(function(t, a) {
          a = a.length == 1 && de(a[0]) ? xe(a[0], _t(ee())) : xe(st(a, 1), _t(ee()));
          var o = a.length;
          return le(function(c) {
            for (var _ = -1, v = Be(c.length, o); ++_ < v; ) c[_] = a[_].call(this, c[_]);
            return mt(t, this, c);
          });
        }), qc = le(function(t, a) {
          var o = ns(a, ya(qc));
          return zs(t, ge, r, a, o);
        }), l_ = le(function(t, a) {
          var o = ns(a, ya(l_));
          return zs(t, B, r, a, o);
        }), vv = Bs(function(t, a) {
          return zs(t, he, r, r, r, a);
        });
        function wv(t, a) {
          if (typeof t != "function") throw new Bt(f);
          return a = a === r ? a : me(a), le(t, a);
        }
        function Mv(t, a) {
          if (typeof t != "function") throw new Bt(f);
          return a = a == null ? 0 : Ve(me(a), 0), le(function(o) {
            var c = o[a], _ = At(o, 0, a);
            return c && hs(_, c), mt(t, this, _);
          });
        }
        function Lv(t, a, o) {
          var c = true, _ = true;
          if (typeof t != "function") throw new Bt(f);
          return $e(o) && (c = "leading" in o ? !!o.leading : c, _ = "trailing" in o ? !!o.trailing : _), o_(t, a, { leading: c, maxWait: a, trailing: _ });
        }
        function kv(t) {
          return s_(t, 1);
        }
        function Tv(t, a) {
          return qc(Gi(a), t);
        }
        function Dv() {
          if (!arguments.length) return [];
          var t = arguments[0];
          return de(t) ? t : [t];
        }
        function Yv(t) {
          return St(t, N);
        }
        function Cv(t, a) {
          return a = typeof a == "function" ? a : r, St(t, N, a);
        }
        function bv(t) {
          return St(t, b | N);
        }
        function Sv(t, a) {
          return a = typeof a == "function" ? a : r, St(t, b | N, a);
        }
        function Fv(t, a) {
          return a == null || ql(t, a, lt(a));
        }
        function Gs(t, a) {
          return t === a || t !== t && a !== a;
        }
        var xv = pa(Hi), Nv = pa(function(t, a) {
          return t >= a;
        }), er = zl(/* @__PURE__ */ (function() {
          return arguments;
        })()) ? zl : function(t) {
          return Je(t) && De.call(t, "callee") && !Dl.call(t, "callee");
        }, de = F.isArray, Av = ll ? _t(ll) : ec;
        function Jt(t) {
          return t != null && Hd(t.length) && !qn(t);
        }
        function Xe(t) {
          return Je(t) && Jt(t);
        }
        function Ev(t) {
          return t === true || t === false || Je(t) && ut(t) == Qs;
        }
        var Da = Cl || Jc, Hv = yi ? _t(yi) : tc;
        function Pv(t) {
          return Je(t) && t.nodeType === 1 && !wo(t);
        }
        function jv(t) {
          if (t == null) return true;
          if (Jt(t) && (de(t) || typeof t == "string" || typeof t.splice == "function" || Da(t) || si(t) || er(t))) return !t.length;
          var a = We(t);
          if (a == es || a == Oe) return !t.size;
          if (ks(t)) return !zr(t).length;
          for (var o in t) if (De.call(t, o)) return false;
          return true;
        }
        function qv(t, a) {
          return Va(t, a);
        }
        function Iv(t, a, o) {
          o = typeof o == "function" ? o : r;
          var c = o ? o(t, a) : r;
          return c === r ? Va(t, a, r, o) : !!c;
        }
        function Ic(t) {
          if (!Je(t)) return false;
          var a = ut(t);
          return a == dr || a == Mm || typeof t.message == "string" && typeof t.name == "string" && !wo(t);
        }
        function Rv(t) {
          return typeof t == "number" && Ua(t);
        }
        function qn(t) {
          if (!$e(t)) return false;
          var a = ut(t);
          return a == mr || a == Po || a == wm || a == km;
        }
        function d_(t) {
          return typeof t == "number" && t == me(t);
        }
        function Hd(t) {
          return typeof t == "number" && t > -1 && t % 1 == 0 && t <= Zs;
        }
        function $e(t) {
          var a = typeof t;
          return t != null && (a == "object" || a == "function");
        }
        function Je(t) {
          return t != null && typeof t == "object";
        }
        var m_ = dl ? _t(dl) : ji;
        function Ov(t, a) {
          return t === a || mn(t, a, no(a));
        }
        function Uv(t, a, o) {
          return o = typeof o == "function" ? o : r, mn(t, a, no(a), o);
        }
        function zv(t) {
          return u_(t) && t != +t;
        }
        function Bv(t) {
          if (Lc(t)) throw new oe(g);
          return Ja(t);
        }
        function Wv(t) {
          return t === null;
        }
        function $v(t) {
          return t == null;
        }
        function u_(t) {
          return typeof t == "number" || Je(t) && ut(t) == xa;
        }
        function wo(t) {
          if (!Je(t) || ut(t) != xs) return false;
          var a = Fr(t);
          if (a === null) return true;
          var o = De.call(a, "constructor") && a.constructor;
          return typeof o == "function" && o instanceof o && Ia.call(o) == yu;
        }
        var Rc = ml ? _t(ml) : we;
        function Gv(t) {
          return d_(t) && t >= -Zs && t <= Zs;
        }
        var c_ = Ha ? _t(Ha) : Bl;
        function Pd(t) {
          return typeof t == "string" || !de(t) && Je(t) && ut(t) == Mn;
        }
        function ls(t) {
          return typeof t == "symbol" || Je(t) && ut(t) == ur;
        }
        var si = Hs ? _t(Hs) : nc;
        function Vv(t) {
          return t === r;
        }
        function Jv(t) {
          return Je(t) && We(t) == Gn;
        }
        function Kv(t) {
          return Je(t) && ut(t) == Ct;
        }
        var Zv = pa(Br), Qv = pa(function(t, a) {
          return t <= a;
        });
        function g_(t) {
          if (!t) return [];
          if (Jt(t)) return Pd(t) ? bt(t) : ct(t);
          if (Ra && t[Ra]) return du(t[Ra]());
          var a = We(t), o = a == es ? Ci : a == Oe ? oa : ni;
          return o(t);
        }
        function In(t) {
          if (!t) return t === 0 ? t : 0;
          if (t = Ys(t), t === Fs || t === -Fs) {
            var a = t < 0 ? -1 : 1;
            return a * vm;
          }
          return t === t ? t : 0;
        }
        function me(t) {
          var a = In(t), o = a % 1;
          return a === a ? o ? a - o : a : 0;
        }
        function h_(t) {
          return t ? Sn(me(t), 0, Ut) : 0;
        }
        function Ys(t) {
          if (typeof t == "number") return t;
          if (ls(t)) return Yt;
          if ($e(t)) {
            var a = typeof t.valueOf == "function" ? t.valueOf() : t;
            t = $e(a) ? a + "" : a;
          }
          if (typeof t != "string") return t === 0 ? t : +t;
          t = _l(t);
          var o = Fm.test(t);
          return o || Io.test(t) ? il(t.slice(2), o ? 2 : 8) : Sm.test(t) ? Yt : +t;
        }
        function f_(t) {
          return Ls(t, Kt(t));
        }
        function Xv(t) {
          return t ? Sn(me(t), -Zs, Zs) : t === 0 ? t : 0;
        }
        function be(t) {
          return t == null ? "" : yt(t);
        }
        var e2 = fa(function(t, a) {
          if (ks(a) || Jt(a)) {
            Ls(a, lt(a), t);
            return;
          }
          for (var o in a) De.call(a, o) && Ga(t, o, a[o]);
        }), __ = fa(function(t, a) {
          Ls(a, Kt(a), t);
        }), jd = fa(function(t, a, o, c) {
          Ls(a, Kt(a), t, c);
        }), t2 = fa(function(t, a, o, c) {
          Ls(a, lt(a), t, c);
        }), s2 = Bs(Or);
        function n2(t, a) {
          var o = ga(t);
          return a == null ? o : xi(o, a);
        }
        var a2 = le(function(t, a) {
          t = fe(t);
          var o = -1, c = a.length, _ = c > 2 ? a[2] : r;
          for (_ && ht(a[0], a[1], _) && (c = 1); ++o < c; ) for (var v = a[o], M = Kt(v), T = -1, C = M.length; ++T < C; ) {
            var P = M[T], j = t[P];
            (j === r || Gs(j, da[P]) && !De.call(t, P)) && (t[P] = v[P]);
          }
          return t;
        }), r2 = le(function(t) {
          return t.push(r, cd), mt(p_, r, t);
        });
        function i2(t, a) {
          return cl(t, ee(a, 3), ps);
        }
        function o2(t, a) {
          return cl(t, ee(a, 3), Ei);
        }
        function l2(t, a) {
          return t == null ? t : Ai(t, ee(a, 3), Kt);
        }
        function d2(t, a) {
          return t == null ? t : Ol(t, ee(a, 3), Kt);
        }
        function m2(t, a) {
          return t && ps(t, ee(a, 3));
        }
        function u2(t, a) {
          return t && Ei(t, ee(a, 3));
        }
        function c2(t) {
          return t == null ? [] : ys(t, lt(t));
        }
        function g2(t) {
          return t == null ? [] : ys(t, Kt(t));
        }
        function Oc(t, a, o) {
          var c = t == null ? r : Fn(t, a);
          return c === r ? o : c;
        }
        function h2(t, a) {
          return t != null && hd(t, a, Zu);
        }
        function Uc(t, a) {
          return t != null && hd(t, a, Qu);
        }
        var f2 = dd(function(t, a, o) {
          a != null && typeof a.toString != "function" && (a = Cr.call(a)), t[a] = o;
        }, Bc(Zt)), _2 = dd(function(t, a, o) {
          a != null && typeof a.toString != "function" && (a = Cr.call(a)), De.call(t, a) ? t[a].push(o) : t[a] = [o];
        }, ee), p2 = le(vs);
        function lt(t) {
          return Jt(t) ? Rr(t) : zr(t);
        }
        function Kt(t) {
          return Jt(t) ? Rr(t, true) : ac(t);
        }
        function y2(t, a) {
          var o = {};
          return a = ee(a, 3), ps(t, function(c, _, v) {
            Rs(o, a(c, _, v), c);
          }), o;
        }
        function v2(t, a) {
          var o = {};
          return a = ee(a, 3), ps(t, function(c, _, v) {
            Rs(o, _, a(c, _, v));
          }), o;
        }
        var w2 = fa(function(t, a, o) {
          Wr(t, a, o);
        }), p_ = fa(function(t, a, o, c) {
          Wr(t, a, o, c);
        }), M2 = Bs(function(t, a) {
          var o = {};
          if (t == null) return o;
          var c = false;
          a = xe(a, function(v) {
            return v = ws(v, t), c || (c = v.length > 1), v;
          }), Ls(t, wt(t), o), c && (o = St(o, b | H | N, hc));
          for (var _ = a.length; _--; ) zi(o, a[_]);
          return o;
        });
        function L2(t, a) {
          return y_(t, Ed(ee(a)));
        }
        var k2 = Bs(function(t, a) {
          return t == null ? {} : rc(t, a);
        });
        function y_(t, a) {
          if (t == null) return {};
          var o = xe(wt(t), function(c) {
            return [c];
          });
          return a = ee(a), Jl(t, o, function(c, _) {
            return a(c, _[0]);
          });
        }
        function T2(t, a, o) {
          a = ws(a, t);
          var c = -1, _ = a.length;
          for (_ || (_ = 1, t = r); ++c < _; ) {
            var v = t == null ? r : t[Ts(a[c])];
            v === r && (c = _, v = o), t = qn(v) ? v.call(t) : v;
          }
          return t;
        }
        function D2(t, a, o) {
          return t == null ? t : Ka(t, a, o);
        }
        function Y2(t, a, o, c) {
          return c = typeof c == "function" ? c : r, t == null ? t : Ka(t, a, o, c);
        }
        var v_ = md(lt), w_ = md(Kt);
        function C2(t, a, o) {
          var c = de(t), _ = c || Da(t) || si(t);
          if (a = ee(a, 4), o == null) {
            var v = t && t.constructor;
            _ ? o = c ? new v() : [] : $e(t) ? o = qn(v) ? ga(Fr(t)) : {} : o = {};
          }
          return (_ ? Ge : ps)(t, function(M, T, C) {
            return a(o, M, T, C);
          }), o;
        }
        function b2(t, a) {
          return t == null ? true : zi(t, a);
        }
        function S2(t, a, o) {
          return t == null ? t : Xl(t, a, Gi(o));
        }
        function F2(t, a, o, c) {
          return c = typeof c == "function" ? c : r, t == null ? t : Xl(t, a, Gi(o), c);
        }
        function ni(t) {
          return t == null ? [] : Yi(t, lt(t));
        }
        function x2(t) {
          return t == null ? [] : Yi(t, Kt(t));
        }
        function N2(t, a, o) {
          return o === r && (o = a, a = r), o !== r && (o = Ys(o), o = o === o ? o : 0), a !== r && (a = Ys(a), a = a === a ? a : 0), Sn(Ys(t), a, o);
        }
        function A2(t, a, o) {
          return a = In(a), o === r ? (o = a, a = 0) : o = In(o), t = Ys(t), Xu(t, a, o);
        }
        function E2(t, a, o) {
          if (o && typeof o != "boolean" && ht(t, a, o) && (a = o = r), o === r && (typeof a == "boolean" ? (o = a, a = r) : typeof t == "boolean" && (o = t, t = r)), t === r && a === r ? (t = 0, a = 1) : (t = In(t), a === r ? (a = t, t = 0) : a = In(a)), t > a) {
            var c = t;
            t = a, a = c;
          }
          if (o || t % 1 || a % 1) {
            var _ = Fl();
            return Be(t + _ * (a - t + rl("1e-" + ((_ + "").length - 1))), a);
          }
          return $r(t, a);
        }
        var H2 = gn(function(t, a, o) {
          return a = a.toLowerCase(), t + (o ? M_(a) : a);
        });
        function M_(t) {
          return zc(be(t).toLowerCase());
        }
        function L_(t) {
          return t = be(t), t && t.replace(ea, yl).replace(zm, "");
        }
        function P2(t, a, o) {
          t = be(t), a = yt(a);
          var c = t.length;
          o = o === r ? c : Sn(me(o), 0, c);
          var _ = o;
          return o -= a.length, o >= 0 && t.slice(o, _) == a;
        }
        function j2(t) {
          return t = be(t), t && fr.test(t) ? t.replace(Ln, ru) : t;
        }
        function q2(t) {
          return t = be(t), t && Ce.test(t) ? t.replace(Aa, "\\$&") : t;
        }
        var I2 = gn(function(t, a, o) {
          return t + (o ? "-" : "") + a.toLowerCase();
        }), R2 = gn(function(t, a, o) {
          return t + (o ? " " : "") + a.toLowerCase();
        }), O2 = id("toLowerCase");
        function U2(t, a, o) {
          t = be(t), a = me(a);
          var c = a ? rn(t) : 0;
          if (!a || c >= a) return t;
          var _ = (a - c) / 2;
          return Zr(Oa(_), o) + t + Zr(Nr(_), o);
        }
        function z2(t, a, o) {
          t = be(t), a = me(a);
          var c = a ? rn(t) : 0;
          return a && c < a ? t + Zr(a - c, o) : t;
        }
        function B2(t, a, o) {
          t = be(t), a = me(a);
          var c = a ? rn(t) : 0;
          return a && c < a ? Zr(a - c, o) + t : t;
        }
        function W2(t, a, o) {
          return o || a == null ? a = 0 : a && (a = +a), Sl(be(t).replace(kn, ""), a || 0);
        }
        function $2(t, a, o) {
          return (o ? ht(t, a, o) : a === r) ? a = 1 : a = me(a), Oi(be(t), a);
        }
        function G2() {
          var t = arguments, a = be(t[0]);
          return t.length < 3 ? a : a.replace(t[1], t[2]);
        }
        var V2 = gn(function(t, a, o) {
          return t + (o ? "_" : "") + a.toLowerCase();
        });
        function J2(t, a, o) {
          return o && typeof o != "number" && ht(t, a, o) && (a = o = r), o = o === r ? Ut : o >>> 0, o ? (t = be(t), t && (typeof a == "string" || a != null && !Rc(a)) && (a = yt(a), !a && fs(t)) ? At(bt(t), 0, o) : t.split(a, o)) : [];
        }
        var K2 = gn(function(t, a, o) {
          return t + (o ? " " : "") + zc(a);
        });
        function Z2(t, a, o) {
          return t = be(t), o = o == null ? 0 : Sn(me(o), 0, t.length), a = yt(a), t.slice(o, o + a.length) == a;
        }
        function Q2(t, a, o) {
          var c = y.templateSettings;
          o && ht(t, a, o) && (a = r), t = be(t), a = jd({}, a, c, ud);
          var _ = jd({}, a.imports, c.imports, ud), v = lt(_), M = Yi(_, v), T, C, P = 0, j = a.interpolate || sn, R = "__p += '", z = Ps((a.escape || sn).source + "|" + j.source + "|" + (j === qo ? Es : sn).source + "|" + (a.evaluate || sn).source + "|$", "g"), K = "//# sourceURL=" + (De.call(a, "sourceURL") ? (a.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++Vm + "]") + `
`;
          t.replace(z, function(ae, ve, Me, ds, jt, ms) {
            return Me || (Me = ds), R += t.slice(P, ms).replace(Ro, iu), ve && (T = true, R += `' +
__e(` + ve + `) +
'`), jt && (C = true, R += `';
` + jt + `;
__p += '`), Me && (R += `' +
((__t = (` + Me + `)) == null ? '' : __t) +
'`), P = ms + ae.length, ae;
          }), R += `';
`;
          var ne = De.call(a, "variable") && a.variable;
          if (!ne) R = `with (obj) {
` + R + `
}
`;
          else if (Ze.test(ne)) throw new oe(p);
          R = (C ? R.replace(Dm, "") : R).replace(hr, "$1").replace(Ym, "$1;"), R = "function(" + (ne || "obj") + `) {
` + (ne ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (T ? ", __e = _.escape" : "") + (C ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + R + `return __p
}`;
          var ce = T_(function() {
            return Te(v, K + "return " + R).apply(r, M);
          });
          if (ce.source = R, Ic(ce)) throw ce;
          return ce;
        }
        function X2(t) {
          return be(t).toLowerCase();
        }
        function ew(t) {
          return be(t).toUpperCase();
        }
        function tw(t, a, o) {
          if (t = be(t), t && (o || a === r)) return _l(t);
          if (!t || !(a = yt(a))) return t;
          var c = bt(t), _ = bt(a), v = Ae(c, _), M = pl(c, _) + 1;
          return At(c, v, M).join("");
        }
        function sw(t, a, o) {
          if (t = be(t), t && (o || a === r)) return t.slice(0, Dr(t) + 1);
          if (!t || !(a = yt(a))) return t;
          var c = bt(t), _ = pl(c, bt(a)) + 1;
          return At(c, 0, _).join("");
        }
        function nw(t, a, o) {
          if (t = be(t), t && (o || a === r)) return t.replace(kn, "");
          if (!t || !(a = yt(a))) return t;
          var c = bt(t), _ = Ae(c, bt(a));
          return At(c, _).join("");
        }
        function aw(t, a) {
          var o = ke, c = pe;
          if ($e(a)) {
            var _ = "separator" in a ? a.separator : _;
            o = "length" in a ? me(a.length) : o, c = "omission" in a ? yt(a.omission) : c;
          }
          t = be(t);
          var v = t.length;
          if (fs(t)) {
            var M = bt(t);
            v = M.length;
          }
          if (o >= v) return t;
          var T = o - rn(c);
          if (T < 1) return c;
          var C = M ? At(M, 0, T).join("") : t.slice(0, T);
          if (_ === r) return C + c;
          if (M && (T += C.length - T), Rc(_)) {
            if (t.slice(T).search(_)) {
              var P, j = C;
              for (_.global || (_ = Ps(_.source, be(tn.exec(_)) + "g")), _.lastIndex = 0; P = _.exec(j); ) var R = P.index;
              C = C.slice(0, R === r ? T : R);
            }
          } else if (t.indexOf(yt(_), T) != T) {
            var z = C.lastIndexOf(_);
            z > -1 && (C = C.slice(0, z));
          }
          return C + c;
        }
        function rw(t) {
          return t = be(t), t && ui.test(t) ? t.replace(Xn, cu) : t;
        }
        var iw = gn(function(t, a, o) {
          return t + (o ? " " : "") + a.toUpperCase();
        }), zc = id("toUpperCase");
        function k_(t, a, o) {
          return t = be(t), a = o ? r : a, a === r ? lu(t) ? fu(t) : su(t) : t.match(a) || [];
        }
        var T_ = le(function(t, a) {
          try {
            return mt(t, r, a);
          } catch (o) {
            return Ic(o) ? o : new oe(o);
          }
        }), ow = Bs(function(t, a) {
          return Ge(a, function(o) {
            o = Ts(o), Rs(t, o, jc(t[o], t));
          }), t;
        });
        function lw(t) {
          var a = t == null ? 0 : t.length, o = ee();
          return t = a ? xe(t, function(c) {
            if (typeof c[1] != "function") throw new Bt(f);
            return [o(c[0]), c[1]];
          }) : [], le(function(c) {
            for (var _ = -1; ++_ < a; ) {
              var v = t[_];
              if (mt(v[0], this, c)) return mt(v[1], this, c);
            }
          });
        }
        function dw(t) {
          return Ni(St(t, b));
        }
        function Bc(t) {
          return function() {
            return t;
          };
        }
        function mw(t, a) {
          return t == null || t !== t ? a : t;
        }
        var uw = ld(), cw = ld(true);
        function Zt(t) {
          return t;
        }
        function Wc(t) {
          return Ft(typeof t == "function" ? t : St(t, b));
        }
        function gw(t) {
          return xt(St(t, b));
        }
        function hw(t, a) {
          return qi(t, St(a, b));
        }
        var fw = le(function(t, a) {
          return function(o) {
            return vs(o, t, a);
          };
        }), _w = le(function(t, a) {
          return function(o) {
            return vs(t, o, a);
          };
        });
        function $c(t, a, o) {
          var c = lt(a), _ = ys(a, c);
          o == null && !($e(a) && (_.length || !c.length)) && (o = a, a = t, t = this, _ = ys(a, lt(a)));
          var v = !($e(o) && "chain" in o) || !!o.chain, M = qn(t);
          return Ge(_, function(T) {
            var C = a[T];
            t[T] = C, M && (t.prototype[T] = function() {
              var P = this.__chain__;
              if (v || P) {
                var j = t(this.__wrapped__), R = j.__actions__ = ct(this.__actions__);
                return R.push({ func: C, args: arguments, thisArg: t }), j.__chain__ = P, j;
              }
              return C.apply(t, hs([this.value()], arguments));
            });
          }), t;
        }
        function pw() {
          return tt._ === this && (tt._ = vu), this;
        }
        function Gc() {
        }
        function yw(t) {
          return t = me(t), le(function(a) {
            return Gl(a, t);
          });
        }
        var vw = Qi(xe), ww = Qi(Lr), Mw = Qi(Mi);
        function D_(t) {
          return Xr(t) ? Li(Ts(t)) : Kl(t);
        }
        function Lw(t) {
          return function(a) {
            return t == null ? r : Fn(t, a);
          };
        }
        var kw = Xi(), Tw = Xi(true);
        function Vc() {
          return [];
        }
        function Jc() {
          return false;
        }
        function Dw() {
          return {};
        }
        function Yw() {
          return "";
        }
        function Cw() {
          return true;
        }
        function bw(t, a) {
          if (t = me(t), t < 1 || t > Zs) return [];
          var o = Ut, c = Be(t, Ut);
          a = ee(a), t -= Ut;
          for (var _ = Di(c, a); ++o < t; ) a(o);
          return _;
        }
        function Sw(t) {
          return de(t) ? xe(t, Ts) : ls(t) ? [t] : ct(Ld(be(t)));
        }
        function Fw(t) {
          var a = ++pu;
          return be(t) + a;
        }
        var xw = gt(function(t, a) {
          return t + a;
        }, 0), Nw = to("ceil"), Aw = gt(function(t, a) {
          return t / a;
        }, 1), Ew = to("floor");
        function Hw(t) {
          return t && t.length ? Ur(t, Zt, Hi) : r;
        }
        function Pw(t, a) {
          return t && t.length ? Ur(t, ee(a, 2), Hi) : r;
        }
        function jw(t) {
          return Dn(t, Zt);
        }
        function qw(t, a) {
          return Dn(t, ee(a, 2));
        }
        function Iw(t) {
          return t && t.length ? Ur(t, Zt, Br) : r;
        }
        function Rw(t, a) {
          return t && t.length ? Ur(t, ee(a, 2), Br) : r;
        }
        var Ow = gt(function(t, a) {
          return t * a;
        }, 1), Uw = to("round"), zw = gt(function(t, a) {
          return t - a;
        }, 0);
        function Bw(t) {
          return t && t.length ? Ti(t, Zt) : 0;
        }
        function Ww(t, a) {
          return t && t.length ? Ti(t, ee(a, 2)) : 0;
        }
        return y.after = gv, y.ary = s_, y.assign = e2, y.assignIn = __, y.assignInWith = jd, y.assignWith = t2, y.at = s2, y.before = n_, y.bind = jc, y.bindAll = ow, y.bindKey = a_, y.castArray = Dv, y.chain = Xf, y.chunk = Tc, y.compact = uo, y.concat = kd, y.cond = lw, y.conforms = dw, y.constant = Bc, y.countBy = B1, y.create = n2, y.curry = r_, y.curryRight = i_, y.debounce = o_, y.defaults = a2, y.defaultsDeep = r2, y.defer = hv, y.delay = fv, y.difference = Td, y.differenceBy = Dc, y.differenceWith = co, y.drop = Dd, y.dropRight = Yc, y.dropRightWhile = Cc, y.dropWhile = Yd, y.fill = bc, y.filter = $1, y.flatMap = J1, y.flatMapDeep = K1, y.flatMapDepth = Z1, y.flatten = $s, y.flattenDeep = Pn, y.flattenDepth = Sc, y.flip = _v, y.flow = uw, y.flowRight = cw, y.fromPairs = fn, y.functions = c2, y.functionsIn = g2, y.groupBy = Q1, y.initial = go, y.intersection = Fc, y.intersectionBy = xc, y.intersectionWith = La, y.invert = f2, y.invertBy = _2, y.invokeMap = ev, y.iteratee = Wc, y.keyBy = tv, y.keys = lt, y.keysIn = Kt, y.map = xd, y.mapKeys = y2, y.mapValues = v2, y.matches = gw, y.matchesProperty = hw, y.memoize = Ad, y.merge = w2, y.mergeWith = p_, y.method = fw, y.methodOf = _w, y.mixin = $c, y.negate = Ed, y.nthArg = yw, y.omit = M2, y.omitBy = L2, y.once = pv, y.orderBy = sv, y.over = vw, y.overArgs = yv, y.overEvery = ww, y.overSome = Mw, y.partial = qc, y.partialRight = l_, y.partition = nv, y.pick = k2, y.pickBy = y_, y.property = D_, y.propertyOf = Lw, y.pull = Nc, y.pullAll = bd, y.pullAllBy = ho, y.pullAllWith = fo, y.pullAt = _o, y.range = kw, y.rangeRight = Tw, y.rearg = vv, y.reject = iv, y.remove = Ac, y.rest = wv, y.reverse = po, y.sampleSize = lv, y.set = D2, y.setWith = Y2, y.shuffle = dv, y.slice = ka, y.sortBy = cv, y.sortedUniq = Ta, y.sortedUniqBy = Sd, y.split = J2, y.spread = Mv, y.tail = vo, y.take = e, y.takeRight = n, y.takeRightWhile = d, y.takeWhile = m, y.tap = H1, y.throttle = Lv, y.thru = Fd, y.toArray = g_, y.toPairs = v_, y.toPairsIn = w_, y.toPath = Sw, y.toPlainObject = f_, y.transform = C2, y.unary = kv, y.union = h, y.unionBy = k, y.unionWith = S, y.uniq = W, y.uniqBy = ie, y.uniqWith = ye, y.unset = b2, y.unzip = nt, y.unzipWith = Ds, y.update = S2, y.updateWith = F2, y.values = ni, y.valuesIn = x2, y.without = _n, y.words = k_, y.wrap = Tv, y.xor = b1, y.xorBy = S1, y.xorWith = F1, y.zip = x1, y.zipObject = N1, y.zipObjectDeep = A1, y.zipWith = E1, y.entries = v_, y.entriesIn = w_, y.extend = __, y.extendWith = jd, $c(y, y), y.add = xw, y.attempt = T_, y.camelCase = H2, y.capitalize = M_, y.ceil = Nw, y.clamp = N2, y.clone = Yv, y.cloneDeep = bv, y.cloneDeepWith = Sv, y.cloneWith = Cv, y.conformsTo = Fv, y.deburr = L_, y.defaultTo = mw, y.divide = Aw, y.endsWith = P2, y.eq = Gs, y.escape = j2, y.escapeRegExp = q2, y.every = W1, y.find = G1, y.findIndex = ei, y.findKey = i2, y.findLast = V1, y.findLastIndex = Hn, y.findLastKey = o2, y.floor = Ew, y.forEach = e_, y.forEachRight = t_, y.forIn = l2, y.forInRight = d2, y.forOwn = m2, y.forOwnRight = u2, y.get = Oc, y.gt = xv, y.gte = Nv, y.has = h2, y.hasIn = Uc, y.head = ti, y.identity = Zt, y.includes = X1, y.indexOf = Cd, y.inRange = A2, y.invoke = p2, y.isArguments = er, y.isArray = de, y.isArrayBuffer = Av, y.isArrayLike = Jt, y.isArrayLikeObject = Xe, y.isBoolean = Ev, y.isBuffer = Da, y.isDate = Hv, y.isElement = Pv, y.isEmpty = jv, y.isEqual = qv, y.isEqualWith = Iv, y.isError = Ic, y.isFinite = Rv, y.isFunction = qn, y.isInteger = d_, y.isLength = Hd, y.isMap = m_, y.isMatch = Ov, y.isMatchWith = Uv, y.isNaN = zv, y.isNative = Bv, y.isNil = $v, y.isNull = Wv, y.isNumber = u_, y.isObject = $e, y.isObjectLike = Je, y.isPlainObject = wo, y.isRegExp = Rc, y.isSafeInteger = Gv, y.isSet = c_, y.isString = Pd, y.isSymbol = ls, y.isTypedArray = si, y.isUndefined = Vv, y.isWeakMap = Jv, y.isWeakSet = Kv, y.join = Gt, y.kebabCase = I2, y.last = Ie, y.lastIndexOf = Ht, y.lowerCase = R2, y.lowerFirst = O2, y.lt = Zv, y.lte = Qv, y.max = Hw, y.maxBy = Pw, y.mean = jw, y.meanBy = qw, y.min = Iw, y.minBy = Rw, y.stubArray = Vc, y.stubFalse = Jc, y.stubObject = Dw, y.stubString = Yw, y.stubTrue = Cw, y.multiply = Ow, y.nth = Pt, y.noConflict = pw, y.noop = Gc, y.now = Nd, y.pad = U2, y.padEnd = z2, y.padStart = B2, y.parseInt = W2, y.random = E2, y.reduce = av, y.reduceRight = rv, y.repeat = $2, y.replace = G2, y.result = T2, y.round = Uw, y.runInContext = Y, y.sample = ov, y.size = mv, y.snakeCase = V2, y.some = uv, y.sortedIndex = Ec, y.sortedIndexBy = yo, y.sortedIndexOf = Vt, y.sortedLastIndex = Hc, y.sortedLastIndexBy = jn, y.sortedLastIndexOf = Pc, y.startCase = K2, y.startsWith = Z2, y.subtract = zw, y.sum = Bw, y.sumBy = Ww, y.template = Q2, y.times = bw, y.toFinite = In, y.toInteger = me, y.toLength = h_, y.toLower = X2, y.toNumber = Ys, y.toSafeInteger = Xv, y.toString = be, y.toUpper = ew, y.trim = tw, y.trimEnd = sw, y.trimStart = nw, y.truncate = aw, y.unescape = rw, y.uniqueId = Fw, y.upperCase = iw, y.upperFirst = zc, y.each = e_, y.eachRight = t_, y.first = ti, $c(y, (function() {
          var t = {};
          return ps(y, function(a, o) {
            De.call(y.prototype, o) || (t[o] = a);
          }), t;
        })(), { chain: false }), y.VERSION = l, Ge(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(t) {
          y[t].placeholder = y;
        }), Ge(["drop", "take"], function(t, a) {
          ue.prototype[t] = function(o) {
            o = o === r ? 1 : Ve(me(o), 0);
            var c = this.__filtered__ && !a ? new ue(this) : this.clone();
            return c.__filtered__ ? c.__takeCount__ = Be(o, c.__takeCount__) : c.__views__.push({ size: Be(o, Ut), type: t + (c.__dir__ < 0 ? "Right" : "") }), c;
          }, ue.prototype[t + "Right"] = function(o) {
            return this.reverse()[t](o).reverse();
          };
        }), Ge(["filter", "map", "takeWhile"], function(t, a) {
          var o = a + 1, c = o == zn || o == Fa;
          ue.prototype[t] = function(_) {
            var v = this.clone();
            return v.__iteratees__.push({ iteratee: ee(_, 3), type: o }), v.__filtered__ = v.__filtered__ || c, v;
          };
        }), Ge(["head", "last"], function(t, a) {
          var o = "take" + (a ? "Right" : "");
          ue.prototype[t] = function() {
            return this[o](1).value()[0];
          };
        }), Ge(["initial", "tail"], function(t, a) {
          var o = "drop" + (a ? "" : "Right");
          ue.prototype[t] = function() {
            return this.__filtered__ ? new ue(this) : this[o](1);
          };
        }), ue.prototype.compact = function() {
          return this.filter(Zt);
        }, ue.prototype.find = function(t) {
          return this.filter(t).head();
        }, ue.prototype.findLast = function(t) {
          return this.reverse().find(t);
        }, ue.prototype.invokeMap = le(function(t, a) {
          return typeof t == "function" ? new ue(this) : this.map(function(o) {
            return vs(o, t, a);
          });
        }), ue.prototype.reject = function(t) {
          return this.filter(Ed(ee(t)));
        }, ue.prototype.slice = function(t, a) {
          t = me(t);
          var o = this;
          return o.__filtered__ && (t > 0 || a < 0) ? new ue(o) : (t < 0 ? o = o.takeRight(-t) : t && (o = o.drop(t)), a !== r && (a = me(a), o = a < 0 ? o.dropRight(-a) : o.take(a - t)), o);
        }, ue.prototype.takeRightWhile = function(t) {
          return this.reverse().takeWhile(t).reverse();
        }, ue.prototype.toArray = function() {
          return this.take(Ut);
        }, ps(ue.prototype, function(t, a) {
          var o = /^(?:filter|find|map|reject)|While$/.test(a), c = /^(?:head|last)$/.test(a), _ = y[c ? "take" + (a == "last" ? "Right" : "") : a], v = c || /^find/.test(a);
          _ && (y.prototype[a] = function() {
            var M = this.__wrapped__, T = c ? [1] : arguments, C = M instanceof ue, P = T[0], j = C || de(M), R = function(ve) {
              var Me = _.apply(y, hs([ve], T));
              return c && z ? Me[0] : Me;
            };
            j && o && typeof P == "function" && P.length != 1 && (C = j = false);
            var z = this.__chain__, K = !!this.__actions__.length, ne = v && !z, ce = C && !K;
            if (!v && j) {
              M = ce ? M : new ue(this);
              var ae = t.apply(M, T);
              return ae.__actions__.push({ func: Fd, args: [R], thisArg: r }), new Wt(ae, z);
            }
            return ne && ce ? t.apply(this, T) : (ae = this.thru(R), ne ? c ? ae.value()[0] : ae.value() : ae);
          });
        }), Ge(["pop", "push", "shift", "sort", "splice", "unshift"], function(t) {
          var a = qa[t], o = /^(?:push|sort|unshift)$/.test(t) ? "tap" : "thru", c = /^(?:pop|shift)$/.test(t);
          y.prototype[t] = function() {
            var _ = arguments;
            if (c && !this.__chain__) {
              var v = this.value();
              return a.apply(de(v) ? v : [], _);
            }
            return this[o](function(M) {
              return a.apply(de(M) ? M : [], _);
            });
          };
        }), ps(ue.prototype, function(t, a) {
          var o = y[a];
          if (o) {
            var c = o.name + "";
            De.call(ca, c) || (ca[c] = []), ca[c].push({ name: a, func: o });
          }
        }), ca[xn(r, Q).name] = [{ name: "wrapper", func: r }], ue.prototype.clone = Fu, ue.prototype.reverse = xu, ue.prototype.value = Nu, y.prototype.at = P1, y.prototype.chain = j1, y.prototype.commit = q1, y.prototype.next = I1, y.prototype.plant = O1, y.prototype.reverse = U1, y.prototype.toJSON = y.prototype.valueOf = y.prototype.value = z1, y.prototype.first = y.prototype.head, Ra && (y.prototype[Ra] = R1), y;
      }), la = _u();
      nn ? ((nn.exports = la)._ = la, pi._ = la) : tt._ = la;
    }).call(pL);
  })(Do, Do.exports)), Do.exports;
}
var ip = yL();
const op = pn("preferences", { state: () => ({ user: { calendarPeek: false, checkCalendars: [], checkCalendarsHoursBefore: 0, checkCalendarsHoursAfter: 0, defaultViewInquiry: "table-view", inquiryCombo: [], relevantOffset: 30, useNewInquiryDialogInNavigation: false, useNewInquiryInInquiryist: false, useCommentsAlternativeStyling: false, useAlternativeStyling: false, verboseInquiriesList: false }, session: { manualViewInquiry: "" }, availableCalendars: [] }), getters: { viewInquiry(s) {
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
  const i = this.user.checkCalendars.indexOf(s.key);
  i !== -1 && this.user.checkCalendars.splice(i, 1), this.write();
}, setViewInquiry(s) {
  this.session.manualViewInquiry = s;
}, async load() {
  try {
    const s = await Pf.getUserSettings();
    this.$patch({ user: s.data.preferences });
  } catch (s) {
    if (s?.code === "ERR_CANCELED") return;
    throw this.$reset(), s;
  }
}, async write() {
  try {
    const s = await Pf.writeUserSettings(this.user);
    this.$patch({ user: s.data.preferences });
  } catch (s) {
    if (s?.code === "ERR_CANCELED") return;
    throw te.error("Error writing preferences", { error: s, preferences: this.user }), s;
  }
}, async getCalendars() {
  try {
    const s = await j0.getCalendars();
    return this.setCalendars({ calendars: s.data.calendars }), s;
  } catch (s) {
    if (s?.code === "ERR_CANCELED") return;
    throw s;
  }
} } });
var pg, lp;
function dp() {
  if (lp) return pg;
  lp = 1;
  function s(i, r) {
    for (var l = -1, u = i == null ? 0 : i.length, g = Array(u); ++l < u; ) g[l] = r(i[l], l, i);
    return g;
  }
  return pg = s, pg;
}
var yg, mp;
function vn() {
  if (mp) return yg;
  mp = 1;
  var s = Array.isArray;
  return yg = s, yg;
}
var vg, up;
function wg() {
  if (up) return vg;
  up = 1;
  var s = vn(), i = Rd(), r = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, l = /^\w*$/;
  function u(g, f) {
    if (s(g)) return false;
    var p = typeof g;
    return p == "number" || p == "symbol" || p == "boolean" || g == null || i(g) ? true : l.test(g) || !r.test(g) || f != null && g in Object(f);
  }
  return vg = u, vg;
}
var Mg, cp;
function gp() {
  if (cp) return Mg;
  cp = 1;
  var s = Od(), i = Xc(), r = "[object AsyncFunction]", l = "[object Function]", u = "[object GeneratorFunction]", g = "[object Proxy]";
  function f(p) {
    if (!i(p)) return false;
    var L = s(p);
    return L == l || L == u || L == r || L == g;
  }
  return Mg = f, Mg;
}
var Lg, hp;
function vL() {
  if (hp) return Lg;
  hp = 1;
  var s = ba(), i = s["__core-js_shared__"];
  return Lg = i, Lg;
}
var kg, fp;
function wL() {
  if (fp) return kg;
  fp = 1;
  var s = vL(), i = (function() {
    var l = /[^.]+$/.exec(s && s.keys && s.keys.IE_PROTO || "");
    return l ? "Symbol(src)_1." + l : "";
  })();
  function r(l) {
    return !!i && i in l;
  }
  return kg = r, kg;
}
var Tg, _p;
function pp() {
  if (_p) return Tg;
  _p = 1;
  var s = Function.prototype, i = s.toString;
  function r(l) {
    if (l != null) {
      try {
        return i.call(l);
      } catch {
      }
      try {
        return l + "";
      } catch {
      }
    }
    return "";
  }
  return Tg = r, Tg;
}
var Dg, yp;
function ML() {
  if (yp) return Dg;
  yp = 1;
  var s = gp(), i = wL(), r = Xc(), l = pp(), u = /[\\^$.*+?()[\]{}|]/g, g = /^\[object .+?Constructor\]$/, f = Function.prototype, p = Object.prototype, L = f.toString, w = p.hasOwnProperty, D = RegExp("^" + L.call(w).replace(u, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
  function b(H) {
    if (!r(H) || i(H)) return false;
    var N = s(H) ? D : g;
    return N.test(l(H));
  }
  return Dg = b, Dg;
}
var Yg, vp;
function LL() {
  if (vp) return Yg;
  vp = 1;
  function s(i, r) {
    return i?.[r];
  }
  return Yg = s, Yg;
}
var Cg, wp;
function ri() {
  if (wp) return Cg;
  wp = 1;
  var s = ML(), i = LL();
  function r(l, u) {
    var g = i(l, u);
    return s(g) ? g : void 0;
  }
  return Cg = r, Cg;
}
var bg, Mp;
function nm() {
  if (Mp) return bg;
  Mp = 1;
  var s = ri(), i = s(Object, "create");
  return bg = i, bg;
}
var Sg, Lp;
function kL() {
  if (Lp) return Sg;
  Lp = 1;
  var s = nm();
  function i() {
    this.__data__ = s ? s(null) : {}, this.size = 0;
  }
  return Sg = i, Sg;
}
var Fg, kp;
function TL() {
  if (kp) return Fg;
  kp = 1;
  function s(i) {
    var r = this.has(i) && delete this.__data__[i];
    return this.size -= r ? 1 : 0, r;
  }
  return Fg = s, Fg;
}
var xg, Tp;
function DL() {
  if (Tp) return xg;
  Tp = 1;
  var s = nm(), i = "__lodash_hash_undefined__", r = Object.prototype, l = r.hasOwnProperty;
  function u(g) {
    var f = this.__data__;
    if (s) {
      var p = f[g];
      return p === i ? void 0 : p;
    }
    return l.call(f, g) ? f[g] : void 0;
  }
  return xg = u, xg;
}
var Ng, Dp;
function YL() {
  if (Dp) return Ng;
  Dp = 1;
  var s = nm(), i = Object.prototype, r = i.hasOwnProperty;
  function l(u) {
    var g = this.__data__;
    return s ? g[u] !== void 0 : r.call(g, u);
  }
  return Ng = l, Ng;
}
var Ag, Yp;
function CL() {
  if (Yp) return Ag;
  Yp = 1;
  var s = nm(), i = "__lodash_hash_undefined__";
  function r(l, u) {
    var g = this.__data__;
    return this.size += this.has(l) ? 0 : 1, g[l] = s && u === void 0 ? i : u, this;
  }
  return Ag = r, Ag;
}
var Eg, Cp;
function bL() {
  if (Cp) return Eg;
  Cp = 1;
  var s = kL(), i = TL(), r = DL(), l = YL(), u = CL();
  function g(f) {
    var p = -1, L = f == null ? 0 : f.length;
    for (this.clear(); ++p < L; ) {
      var w = f[p];
      this.set(w[0], w[1]);
    }
  }
  return g.prototype.clear = s, g.prototype.delete = i, g.prototype.get = r, g.prototype.has = l, g.prototype.set = u, Eg = g, Eg;
}
var Hg, bp;
function SL() {
  if (bp) return Hg;
  bp = 1;
  function s() {
    this.__data__ = [], this.size = 0;
  }
  return Hg = s, Hg;
}
var Pg, Sp;
function Fp() {
  if (Sp) return Pg;
  Sp = 1;
  function s(i, r) {
    return i === r || i !== i && r !== r;
  }
  return Pg = s, Pg;
}
var jg, xp;
function am() {
  if (xp) return jg;
  xp = 1;
  var s = Fp();
  function i(r, l) {
    for (var u = r.length; u--; ) if (s(r[u][0], l)) return u;
    return -1;
  }
  return jg = i, jg;
}
var qg, Np;
function FL() {
  if (Np) return qg;
  Np = 1;
  var s = am(), i = Array.prototype, r = i.splice;
  function l(u) {
    var g = this.__data__, f = s(g, u);
    if (f < 0) return false;
    var p = g.length - 1;
    return f == p ? g.pop() : r.call(g, f, 1), --this.size, true;
  }
  return qg = l, qg;
}
var Ig, Ap;
function xL() {
  if (Ap) return Ig;
  Ap = 1;
  var s = am();
  function i(r) {
    var l = this.__data__, u = s(l, r);
    return u < 0 ? void 0 : l[u][1];
  }
  return Ig = i, Ig;
}
var Rg, Ep;
function NL() {
  if (Ep) return Rg;
  Ep = 1;
  var s = am();
  function i(r) {
    return s(this.__data__, r) > -1;
  }
  return Rg = i, Rg;
}
var Og, Hp;
function AL() {
  if (Hp) return Og;
  Hp = 1;
  var s = am();
  function i(r, l) {
    var u = this.__data__, g = s(u, r);
    return g < 0 ? (++this.size, u.push([r, l])) : u[g][1] = l, this;
  }
  return Og = i, Og;
}
var Ug, Pp;
function rm() {
  if (Pp) return Ug;
  Pp = 1;
  var s = SL(), i = FL(), r = xL(), l = NL(), u = AL();
  function g(f) {
    var p = -1, L = f == null ? 0 : f.length;
    for (this.clear(); ++p < L; ) {
      var w = f[p];
      this.set(w[0], w[1]);
    }
  }
  return g.prototype.clear = s, g.prototype.delete = i, g.prototype.get = r, g.prototype.has = l, g.prototype.set = u, Ug = g, Ug;
}
var zg, jp;
function Bg() {
  if (jp) return zg;
  jp = 1;
  var s = ri(), i = ba(), r = s(i, "Map");
  return zg = r, zg;
}
var Wg, qp;
function EL() {
  if (qp) return Wg;
  qp = 1;
  var s = bL(), i = rm(), r = Bg();
  function l() {
    this.size = 0, this.__data__ = { hash: new s(), map: new (r || i)(), string: new s() };
  }
  return Wg = l, Wg;
}
var $g, Ip;
function HL() {
  if (Ip) return $g;
  Ip = 1;
  function s(i) {
    var r = typeof i;
    return r == "string" || r == "number" || r == "symbol" || r == "boolean" ? i !== "__proto__" : i === null;
  }
  return $g = s, $g;
}
var Gg, Rp;
function im() {
  if (Rp) return Gg;
  Rp = 1;
  var s = HL();
  function i(r, l) {
    var u = r.__data__;
    return s(l) ? u[typeof l == "string" ? "string" : "hash"] : u.map;
  }
  return Gg = i, Gg;
}
var Vg, Op;
function PL() {
  if (Op) return Vg;
  Op = 1;
  var s = im();
  function i(r) {
    var l = s(this, r).delete(r);
    return this.size -= l ? 1 : 0, l;
  }
  return Vg = i, Vg;
}
var Jg, Up;
function jL() {
  if (Up) return Jg;
  Up = 1;
  var s = im();
  function i(r) {
    return s(this, r).get(r);
  }
  return Jg = i, Jg;
}
var Kg, zp;
function qL() {
  if (zp) return Kg;
  zp = 1;
  var s = im();
  function i(r) {
    return s(this, r).has(r);
  }
  return Kg = i, Kg;
}
var Zg, Bp;
function IL() {
  if (Bp) return Zg;
  Bp = 1;
  var s = im();
  function i(r, l) {
    var u = s(this, r), g = u.size;
    return u.set(r, l), this.size += u.size == g ? 0 : 1, this;
  }
  return Zg = i, Zg;
}
var Qg, Wp;
function Xg() {
  if (Wp) return Qg;
  Wp = 1;
  var s = EL(), i = PL(), r = jL(), l = qL(), u = IL();
  function g(f) {
    var p = -1, L = f == null ? 0 : f.length;
    for (this.clear(); ++p < L; ) {
      var w = f[p];
      this.set(w[0], w[1]);
    }
  }
  return g.prototype.clear = s, g.prototype.delete = i, g.prototype.get = r, g.prototype.has = l, g.prototype.set = u, Qg = g, Qg;
}
var eh, $p;
function RL() {
  if ($p) return eh;
  $p = 1;
  var s = Xg(), i = "Expected a function";
  function r(l, u) {
    if (typeof l != "function" || u != null && typeof u != "function") throw new TypeError(i);
    var g = function() {
      var f = arguments, p = u ? u.apply(this, f) : f[0], L = g.cache;
      if (L.has(p)) return L.get(p);
      var w = l.apply(this, f);
      return g.cache = L.set(p, w) || L, w;
    };
    return g.cache = new (r.Cache || s)(), g;
  }
  return r.Cache = s, eh = r, eh;
}
var th, Gp;
function OL() {
  if (Gp) return th;
  Gp = 1;
  var s = RL(), i = 500;
  function r(l) {
    var u = s(l, function(f) {
      return g.size === i && g.clear(), f;
    }), g = u.cache;
    return u;
  }
  return th = r, th;
}
var sh, Vp;
function UL() {
  if (Vp) return sh;
  Vp = 1;
  var s = OL(), i = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, r = /\\(\\)?/g, l = s(function(u) {
    var g = [];
    return u.charCodeAt(0) === 46 && g.push(""), u.replace(i, function(f, p, L, w) {
      g.push(L ? w.replace(r, "$1") : p || f);
    }), g;
  });
  return sh = l, sh;
}
var nh, Jp;
function zL() {
  if (Jp) return nh;
  Jp = 1;
  var s = x_(), i = dp(), r = vn(), l = Rd(), u = s ? s.prototype : void 0, g = u ? u.toString : void 0;
  function f(p) {
    if (typeof p == "string") return p;
    if (r(p)) return i(p, f) + "";
    if (l(p)) return g ? g.call(p) : "";
    var L = p + "";
    return L == "0" && 1 / p == -1 / 0 ? "-0" : L;
  }
  return nh = f, nh;
}
var ah, Kp;
function BL() {
  if (Kp) return ah;
  Kp = 1;
  var s = zL();
  function i(r) {
    return r == null ? "" : s(r);
  }
  return ah = i, ah;
}
var rh, Zp;
function Qp() {
  if (Zp) return rh;
  Zp = 1;
  var s = vn(), i = wg(), r = UL(), l = BL();
  function u(g, f) {
    return s(g) ? g : i(g, f) ? [g] : r(l(g));
  }
  return rh = u, rh;
}
var ih, Xp;
function om() {
  if (Xp) return ih;
  Xp = 1;
  var s = Rd();
  function i(r) {
    if (typeof r == "string" || s(r)) return r;
    var l = r + "";
    return l == "0" && 1 / r == -1 / 0 ? "-0" : l;
  }
  return ih = i, ih;
}
var oh, ey;
function lh() {
  if (ey) return oh;
  ey = 1;
  var s = Qp(), i = om();
  function r(l, u) {
    u = s(u, l);
    for (var g = 0, f = u.length; l != null && g < f; ) l = l[i(u[g++])];
    return g && g == f ? l : void 0;
  }
  return oh = r, oh;
}
var dh, ty;
function WL() {
  if (ty) return dh;
  ty = 1;
  var s = rm();
  function i() {
    this.__data__ = new s(), this.size = 0;
  }
  return dh = i, dh;
}
var mh, sy;
function $L() {
  if (sy) return mh;
  sy = 1;
  function s(i) {
    var r = this.__data__, l = r.delete(i);
    return this.size = r.size, l;
  }
  return mh = s, mh;
}
var uh, ny;
function GL() {
  if (ny) return uh;
  ny = 1;
  function s(i) {
    return this.__data__.get(i);
  }
  return uh = s, uh;
}
var ch, ay;
function VL() {
  if (ay) return ch;
  ay = 1;
  function s(i) {
    return this.__data__.has(i);
  }
  return ch = s, ch;
}
var gh, ry;
function JL() {
  if (ry) return gh;
  ry = 1;
  var s = rm(), i = Bg(), r = Xg(), l = 200;
  function u(g, f) {
    var p = this.__data__;
    if (p instanceof s) {
      var L = p.__data__;
      if (!i || L.length < l - 1) return L.push([g, f]), this.size = ++p.size, this;
      p = this.__data__ = new r(L);
    }
    return p.set(g, f), this.size = p.size, this;
  }
  return gh = u, gh;
}
var hh, iy;
function oy() {
  if (iy) return hh;
  iy = 1;
  var s = rm(), i = WL(), r = $L(), l = GL(), u = VL(), g = JL();
  function f(p) {
    var L = this.__data__ = new s(p);
    this.size = L.size;
  }
  return f.prototype.clear = i, f.prototype.delete = r, f.prototype.get = l, f.prototype.has = u, f.prototype.set = g, hh = f, hh;
}
var fh, ly;
function KL() {
  if (ly) return fh;
  ly = 1;
  var s = "__lodash_hash_undefined__";
  function i(r) {
    return this.__data__.set(r, s), this;
  }
  return fh = i, fh;
}
var _h, dy;
function ZL() {
  if (dy) return _h;
  dy = 1;
  function s(i) {
    return this.__data__.has(i);
  }
  return _h = s, _h;
}
var ph, my;
function QL() {
  if (my) return ph;
  my = 1;
  var s = Xg(), i = KL(), r = ZL();
  function l(u) {
    var g = -1, f = u == null ? 0 : u.length;
    for (this.__data__ = new s(); ++g < f; ) this.add(u[g]);
  }
  return l.prototype.add = l.prototype.push = i, l.prototype.has = r, ph = l, ph;
}
var yh, uy;
function XL() {
  if (uy) return yh;
  uy = 1;
  function s(i, r) {
    for (var l = -1, u = i == null ? 0 : i.length; ++l < u; ) if (r(i[l], l, i)) return true;
    return false;
  }
  return yh = s, yh;
}
var vh, cy;
function ek() {
  if (cy) return vh;
  cy = 1;
  function s(i, r) {
    return i.has(r);
  }
  return vh = s, vh;
}
var wh, gy;
function hy() {
  if (gy) return wh;
  gy = 1;
  var s = QL(), i = XL(), r = ek(), l = 1, u = 2;
  function g(f, p, L, w, D, b) {
    var H = L & l, N = f.length, q = p.length;
    if (N != q && !(H && q > N)) return false;
    var O = b.get(f), x = b.get(p);
    if (O && x) return O == p && x == f;
    var Q = -1, X = true, se = L & u ? new s() : void 0;
    for (b.set(f, p), b.set(p, f); ++Q < N; ) {
      var Z = f[Q], ge = p[Q];
      if (w) var B = H ? w(ge, Z, Q, p, f, b) : w(Z, ge, Q, f, p, b);
      if (B !== void 0) {
        if (B) continue;
        X = false;
        break;
      }
      if (se) {
        if (!i(p, function(V, he) {
          if (!r(se, he) && (Z === V || D(Z, V, L, w, b))) return se.push(he);
        })) {
          X = false;
          break;
        }
      } else if (!(Z === ge || D(Z, ge, L, w, b))) {
        X = false;
        break;
      }
    }
    return b.delete(f), b.delete(p), X;
  }
  return wh = g, wh;
}
var Mh, fy;
function tk() {
  if (fy) return Mh;
  fy = 1;
  var s = ba(), i = s.Uint8Array;
  return Mh = i, Mh;
}
var Lh, _y;
function sk() {
  if (_y) return Lh;
  _y = 1;
  function s(i) {
    var r = -1, l = Array(i.size);
    return i.forEach(function(u, g) {
      l[++r] = [g, u];
    }), l;
  }
  return Lh = s, Lh;
}
var kh, py;
function nk() {
  if (py) return kh;
  py = 1;
  function s(i) {
    var r = -1, l = Array(i.size);
    return i.forEach(function(u) {
      l[++r] = u;
    }), l;
  }
  return kh = s, kh;
}
var Th, yy;
function ak() {
  if (yy) return Th;
  yy = 1;
  var s = x_(), i = tk(), r = Fp(), l = hy(), u = sk(), g = nk(), f = 1, p = 2, L = "[object Boolean]", w = "[object Date]", D = "[object Error]", b = "[object Map]", H = "[object Number]", N = "[object RegExp]", q = "[object Set]", O = "[object String]", x = "[object Symbol]", Q = "[object ArrayBuffer]", X = "[object DataView]", se = s ? s.prototype : void 0, Z = se ? se.valueOf : void 0;
  function ge(B, V, he, je, ke, pe, Ot) {
    switch (he) {
      case X:
        if (B.byteLength != V.byteLength || B.byteOffset != V.byteOffset) return false;
        B = B.buffer, V = V.buffer;
      case Q:
        return !(B.byteLength != V.byteLength || !pe(new i(B), new i(V)));
      case L:
      case w:
      case H:
        return r(+B, +V);
      case D:
        return B.name == V.name && B.message == V.message;
      case N:
      case O:
        return B == V + "";
      case b:
        var Re = u;
      case q:
        var zn = je & f;
        if (Re || (Re = g), B.size != V.size && !zn) return false;
        var Ks = Ot.get(B);
        if (Ks) return Ks == V;
        je |= p, Ot.set(B, V);
        var Fa = l(Re(B), Re(V), je, ke, pe, Ot);
        return Ot.delete(B), Fa;
      case x:
        if (Z) return Z.call(B) == Z.call(V);
    }
    return false;
  }
  return Th = ge, Th;
}
var Dh, vy;
function rk() {
  if (vy) return Dh;
  vy = 1;
  function s(i, r) {
    for (var l = -1, u = r.length, g = i.length; ++l < u; ) i[g + l] = r[l];
    return i;
  }
  return Dh = s, Dh;
}
var Yh, wy;
function ik() {
  if (wy) return Yh;
  wy = 1;
  var s = rk(), i = vn();
  function r(l, u, g) {
    var f = u(l);
    return i(l) ? f : s(f, g(l));
  }
  return Yh = r, Yh;
}
var Ch, My;
function ok() {
  if (My) return Ch;
  My = 1;
  function s(i, r) {
    for (var l = -1, u = i == null ? 0 : i.length, g = 0, f = []; ++l < u; ) {
      var p = i[l];
      r(p, l, i) && (f[g++] = p);
    }
    return f;
  }
  return Ch = s, Ch;
}
var bh, Ly;
function lk() {
  if (Ly) return bh;
  Ly = 1;
  function s() {
    return [];
  }
  return bh = s, bh;
}
var Sh, ky;
function dk() {
  if (ky) return Sh;
  ky = 1;
  var s = ok(), i = lk(), r = Object.prototype, l = r.propertyIsEnumerable, u = Object.getOwnPropertySymbols, g = u ? function(f) {
    return f == null ? [] : (f = Object(f), s(u(f), function(p) {
      return l.call(f, p);
    }));
  } : i;
  return Sh = g, Sh;
}
var Fh, Ty;
function mk() {
  if (Ty) return Fh;
  Ty = 1;
  function s(i, r) {
    for (var l = -1, u = Array(i); ++l < i; ) u[l] = r(l);
    return u;
  }
  return Fh = s, Fh;
}
var xh, Dy;
function uk() {
  if (Dy) return xh;
  Dy = 1;
  var s = Od(), i = Ud(), r = "[object Arguments]";
  function l(u) {
    return i(u) && s(u) == r;
  }
  return xh = l, xh;
}
var Nh, Yy;
function Cy() {
  if (Yy) return Nh;
  Yy = 1;
  var s = uk(), i = Ud(), r = Object.prototype, l = r.hasOwnProperty, u = r.propertyIsEnumerable, g = s(/* @__PURE__ */ (function() {
    return arguments;
  })()) ? s : function(f) {
    return i(f) && l.call(f, "callee") && !u.call(f, "callee");
  };
  return Nh = g, Nh;
}
var Yo = { exports: {} }, Ah, by;
function ck() {
  if (by) return Ah;
  by = 1;
  function s() {
    return false;
  }
  return Ah = s, Ah;
}
Yo.exports;
var Sy;
function Fy() {
  return Sy || (Sy = 1, (function(s, i) {
    var r = ba(), l = ck(), u = i && !i.nodeType && i, g = u && true && s && !s.nodeType && s, f = g && g.exports === u, p = f ? r.Buffer : void 0, L = p ? p.isBuffer : void 0, w = L || l;
    s.exports = w;
  })(Yo, Yo.exports)), Yo.exports;
}
var Eh, xy;
function Ny() {
  if (xy) return Eh;
  xy = 1;
  var s = 9007199254740991, i = /^(?:0|[1-9]\d*)$/;
  function r(l, u) {
    var g = typeof l;
    return u = u ?? s, !!u && (g == "number" || g != "symbol" && i.test(l)) && l > -1 && l % 1 == 0 && l < u;
  }
  return Eh = r, Eh;
}
var Hh, Ay;
function Ph() {
  if (Ay) return Hh;
  Ay = 1;
  var s = 9007199254740991;
  function i(r) {
    return typeof r == "number" && r > -1 && r % 1 == 0 && r <= s;
  }
  return Hh = i, Hh;
}
var jh, Ey;
function gk() {
  if (Ey) return jh;
  Ey = 1;
  var s = Od(), i = Ph(), r = Ud(), l = "[object Arguments]", u = "[object Array]", g = "[object Boolean]", f = "[object Date]", p = "[object Error]", L = "[object Function]", w = "[object Map]", D = "[object Number]", b = "[object Object]", H = "[object RegExp]", N = "[object Set]", q = "[object String]", O = "[object WeakMap]", x = "[object ArrayBuffer]", Q = "[object DataView]", X = "[object Float32Array]", se = "[object Float64Array]", Z = "[object Int8Array]", ge = "[object Int16Array]", B = "[object Int32Array]", V = "[object Uint8Array]", he = "[object Uint8ClampedArray]", je = "[object Uint16Array]", ke = "[object Uint32Array]", pe = {};
  pe[X] = pe[se] = pe[Z] = pe[ge] = pe[B] = pe[V] = pe[he] = pe[je] = pe[ke] = true, pe[l] = pe[u] = pe[x] = pe[g] = pe[Q] = pe[f] = pe[p] = pe[L] = pe[w] = pe[D] = pe[b] = pe[H] = pe[N] = pe[q] = pe[O] = false;
  function Ot(Re) {
    return r(Re) && i(Re.length) && !!pe[s(Re)];
  }
  return jh = Ot, jh;
}
var qh, Hy;
function Py() {
  if (Hy) return qh;
  Hy = 1;
  function s(i) {
    return function(r) {
      return i(r);
    };
  }
  return qh = s, qh;
}
var Co = { exports: {} };
Co.exports;
var jy;
function hk() {
  return jy || (jy = 1, (function(s, i) {
    var r = Kw(), l = i && !i.nodeType && i, u = l && true && s && !s.nodeType && s, g = u && u.exports === l, f = g && r.process, p = (function() {
      try {
        var L = u && u.require && u.require("util").types;
        return L || f && f.binding && f.binding("util");
      } catch {
      }
    })();
    s.exports = p;
  })(Co, Co.exports)), Co.exports;
}
var Ih, qy;
function Iy() {
  if (qy) return Ih;
  qy = 1;
  var s = gk(), i = Py(), r = hk(), l = r && r.isTypedArray, u = l ? i(l) : s;
  return Ih = u, Ih;
}
var Rh, Ry;
function fk() {
  if (Ry) return Rh;
  Ry = 1;
  var s = mk(), i = Cy(), r = vn(), l = Fy(), u = Ny(), g = Iy(), f = Object.prototype, p = f.hasOwnProperty;
  function L(w, D) {
    var b = r(w), H = !b && i(w), N = !b && !H && l(w), q = !b && !H && !N && g(w), O = b || H || N || q, x = O ? s(w.length, String) : [], Q = x.length;
    for (var X in w) (D || p.call(w, X)) && !(O && (X == "length" || N && (X == "offset" || X == "parent") || q && (X == "buffer" || X == "byteLength" || X == "byteOffset") || u(X, Q))) && x.push(X);
    return x;
  }
  return Rh = L, Rh;
}
var Oh, Oy;
function _k() {
  if (Oy) return Oh;
  Oy = 1;
  var s = Object.prototype;
  function i(r) {
    var l = r && r.constructor, u = typeof l == "function" && l.prototype || s;
    return r === u;
  }
  return Oh = i, Oh;
}
var Uh, Uy;
function pk() {
  if (Uy) return Uh;
  Uy = 1;
  function s(i, r) {
    return function(l) {
      return i(r(l));
    };
  }
  return Uh = s, Uh;
}
var zh, zy;
function yk() {
  if (zy) return zh;
  zy = 1;
  var s = pk(), i = s(Object.keys, Object);
  return zh = i, zh;
}
var Bh, By;
function vk() {
  if (By) return Bh;
  By = 1;
  var s = _k(), i = yk(), r = Object.prototype, l = r.hasOwnProperty;
  function u(g) {
    if (!s(g)) return i(g);
    var f = [];
    for (var p in Object(g)) l.call(g, p) && p != "constructor" && f.push(p);
    return f;
  }
  return Bh = u, Bh;
}
var Wh, Wy;
function $h() {
  if (Wy) return Wh;
  Wy = 1;
  var s = gp(), i = Ph();
  function r(l) {
    return l != null && i(l.length) && !s(l);
  }
  return Wh = r, Wh;
}
var Gh, $y;
function Vh() {
  if ($y) return Gh;
  $y = 1;
  var s = fk(), i = vk(), r = $h();
  function l(u) {
    return r(u) ? s(u) : i(u);
  }
  return Gh = l, Gh;
}
var Jh, Gy;
function wk() {
  if (Gy) return Jh;
  Gy = 1;
  var s = ik(), i = dk(), r = Vh();
  function l(u) {
    return s(u, r, i);
  }
  return Jh = l, Jh;
}
var Kh, Vy;
function Mk() {
  if (Vy) return Kh;
  Vy = 1;
  var s = wk(), i = 1, r = Object.prototype, l = r.hasOwnProperty;
  function u(g, f, p, L, w, D) {
    var b = p & i, H = s(g), N = H.length, q = s(f), O = q.length;
    if (N != O && !b) return false;
    for (var x = N; x--; ) {
      var Q = H[x];
      if (!(b ? Q in f : l.call(f, Q))) return false;
    }
    var X = D.get(g), se = D.get(f);
    if (X && se) return X == f && se == g;
    var Z = true;
    D.set(g, f), D.set(f, g);
    for (var ge = b; ++x < N; ) {
      Q = H[x];
      var B = g[Q], V = f[Q];
      if (L) var he = b ? L(V, B, Q, f, g, D) : L(B, V, Q, g, f, D);
      if (!(he === void 0 ? B === V || w(B, V, p, L, D) : he)) {
        Z = false;
        break;
      }
      ge || (ge = Q == "constructor");
    }
    if (Z && !ge) {
      var je = g.constructor, ke = f.constructor;
      je != ke && "constructor" in g && "constructor" in f && !(typeof je == "function" && je instanceof je && typeof ke == "function" && ke instanceof ke) && (Z = false);
    }
    return D.delete(g), D.delete(f), Z;
  }
  return Kh = u, Kh;
}
var Zh, Jy;
function Lk() {
  if (Jy) return Zh;
  Jy = 1;
  var s = ri(), i = ba(), r = s(i, "DataView");
  return Zh = r, Zh;
}
var Qh, Ky;
function kk() {
  if (Ky) return Qh;
  Ky = 1;
  var s = ri(), i = ba(), r = s(i, "Promise");
  return Qh = r, Qh;
}
var Xh, Zy;
function Tk() {
  if (Zy) return Xh;
  Zy = 1;
  var s = ri(), i = ba(), r = s(i, "Set");
  return Xh = r, Xh;
}
var ef, Qy;
function Dk() {
  if (Qy) return ef;
  Qy = 1;
  var s = ri(), i = ba(), r = s(i, "WeakMap");
  return ef = r, ef;
}
var tf, Xy;
function Yk() {
  if (Xy) return tf;
  Xy = 1;
  var s = Lk(), i = Bg(), r = kk(), l = Tk(), u = Dk(), g = Od(), f = pp(), p = "[object Map]", L = "[object Object]", w = "[object Promise]", D = "[object Set]", b = "[object WeakMap]", H = "[object DataView]", N = f(s), q = f(i), O = f(r), x = f(l), Q = f(u), X = g;
  return (s && X(new s(new ArrayBuffer(1))) != H || i && X(new i()) != p || r && X(r.resolve()) != w || l && X(new l()) != D || u && X(new u()) != b) && (X = function(se) {
    var Z = g(se), ge = Z == L ? se.constructor : void 0, B = ge ? f(ge) : "";
    if (B) switch (B) {
      case N:
        return H;
      case q:
        return p;
      case O:
        return w;
      case x:
        return D;
      case Q:
        return b;
    }
    return Z;
  }), tf = X, tf;
}
var sf, e0;
function Ck() {
  if (e0) return sf;
  e0 = 1;
  var s = oy(), i = hy(), r = ak(), l = Mk(), u = Yk(), g = vn(), f = Fy(), p = Iy(), L = 1, w = "[object Arguments]", D = "[object Array]", b = "[object Object]", H = Object.prototype, N = H.hasOwnProperty;
  function q(O, x, Q, X, se, Z) {
    var ge = g(O), B = g(x), V = ge ? D : u(O), he = B ? D : u(x);
    V = V == w ? b : V, he = he == w ? b : he;
    var je = V == b, ke = he == b, pe = V == he;
    if (pe && f(O)) {
      if (!f(x)) return false;
      ge = true, je = false;
    }
    if (pe && !je) return Z || (Z = new s()), ge || p(O) ? i(O, x, Q, X, se, Z) : r(O, x, V, Q, X, se, Z);
    if (!(Q & L)) {
      var Ot = je && N.call(O, "__wrapped__"), Re = ke && N.call(x, "__wrapped__");
      if (Ot || Re) {
        var zn = Ot ? O.value() : O, Ks = Re ? x.value() : x;
        return Z || (Z = new s()), se(zn, Ks, Q, X, Z);
      }
    }
    return pe ? (Z || (Z = new s()), l(O, x, Q, X, se, Z)) : false;
  }
  return sf = q, sf;
}
var nf, t0;
function s0() {
  if (t0) return nf;
  t0 = 1;
  var s = Ck(), i = Ud();
  function r(l, u, g, f, p) {
    return l === u ? true : l == null || u == null || !i(l) && !i(u) ? l !== l && u !== u : s(l, u, g, f, r, p);
  }
  return nf = r, nf;
}
var af, n0;
function bk() {
  if (n0) return af;
  n0 = 1;
  var s = oy(), i = s0(), r = 1, l = 2;
  function u(g, f, p, L) {
    var w = p.length, D = w, b = !L;
    if (g == null) return !D;
    for (g = Object(g); w--; ) {
      var H = p[w];
      if (b && H[2] ? H[1] !== g[H[0]] : !(H[0] in g)) return false;
    }
    for (; ++w < D; ) {
      H = p[w];
      var N = H[0], q = g[N], O = H[1];
      if (b && H[2]) {
        if (q === void 0 && !(N in g)) return false;
      } else {
        var x = new s();
        if (L) var Q = L(q, O, N, g, f, x);
        if (!(Q === void 0 ? i(O, q, r | l, L, x) : Q)) return false;
      }
    }
    return true;
  }
  return af = u, af;
}
var rf, a0;
function r0() {
  if (a0) return rf;
  a0 = 1;
  var s = Xc();
  function i(r) {
    return r === r && !s(r);
  }
  return rf = i, rf;
}
var of, i0;
function Sk() {
  if (i0) return of;
  i0 = 1;
  var s = r0(), i = Vh();
  function r(l) {
    for (var u = i(l), g = u.length; g--; ) {
      var f = u[g], p = l[f];
      u[g] = [f, p, s(p)];
    }
    return u;
  }
  return of = r, of;
}
var lf, o0;
function l0() {
  if (o0) return lf;
  o0 = 1;
  function s(i, r) {
    return function(l) {
      return l == null ? false : l[i] === r && (r !== void 0 || i in Object(l));
    };
  }
  return lf = s, lf;
}
var df, d0;
function Fk() {
  if (d0) return df;
  d0 = 1;
  var s = bk(), i = Sk(), r = l0();
  function l(u) {
    var g = i(u);
    return g.length == 1 && g[0][2] ? r(g[0][0], g[0][1]) : function(f) {
      return f === u || s(f, u, g);
    };
  }
  return df = l, df;
}
var mf, m0;
function xk() {
  if (m0) return mf;
  m0 = 1;
  var s = lh();
  function i(r, l, u) {
    var g = r == null ? void 0 : s(r, l);
    return g === void 0 ? u : g;
  }
  return mf = i, mf;
}
var uf, u0;
function Nk() {
  if (u0) return uf;
  u0 = 1;
  function s(i, r) {
    return i != null && r in Object(i);
  }
  return uf = s, uf;
}
var cf, c0;
function Ak() {
  if (c0) return cf;
  c0 = 1;
  var s = Qp(), i = Cy(), r = vn(), l = Ny(), u = Ph(), g = om();
  function f(p, L, w) {
    L = s(L, p);
    for (var D = -1, b = L.length, H = false; ++D < b; ) {
      var N = g(L[D]);
      if (!(H = p != null && w(p, N))) break;
      p = p[N];
    }
    return H || ++D != b ? H : (b = p == null ? 0 : p.length, !!b && u(b) && l(N, b) && (r(p) || i(p)));
  }
  return cf = f, cf;
}
var gf, g0;
function Ek() {
  if (g0) return gf;
  g0 = 1;
  var s = Nk(), i = Ak();
  function r(l, u) {
    return l != null && i(l, u, s);
  }
  return gf = r, gf;
}
var hf, h0;
function Hk() {
  if (h0) return hf;
  h0 = 1;
  var s = s0(), i = xk(), r = Ek(), l = wg(), u = r0(), g = l0(), f = om(), p = 1, L = 2;
  function w(D, b) {
    return l(D) && u(b) ? g(f(D), b) : function(H) {
      var N = i(H, D);
      return N === void 0 && N === b ? r(H, D) : s(b, N, p | L);
    };
  }
  return hf = w, hf;
}
var ff, f0;
function _0() {
  if (f0) return ff;
  f0 = 1;
  function s(i) {
    return i;
  }
  return ff = s, ff;
}
var _f, p0;
function Pk() {
  if (p0) return _f;
  p0 = 1;
  function s(i) {
    return function(r) {
      return r?.[i];
    };
  }
  return _f = s, _f;
}
var pf, y0;
function jk() {
  if (y0) return pf;
  y0 = 1;
  var s = lh();
  function i(r) {
    return function(l) {
      return s(l, r);
    };
  }
  return pf = i, pf;
}
var yf, v0;
function qk() {
  if (v0) return yf;
  v0 = 1;
  var s = Pk(), i = jk(), r = wg(), l = om();
  function u(g) {
    return r(g) ? s(l(g)) : i(g);
  }
  return yf = u, yf;
}
var vf, w0;
function Ik() {
  if (w0) return vf;
  w0 = 1;
  var s = Fk(), i = Hk(), r = _0(), l = vn(), u = qk();
  function g(f) {
    return typeof f == "function" ? f : f == null ? r : typeof f == "object" ? l(f) ? i(f[0], f[1]) : s(f) : u(f);
  }
  return vf = g, vf;
}
var wf, M0;
function Rk() {
  if (M0) return wf;
  M0 = 1;
  function s(i) {
    return function(r, l, u) {
      for (var g = -1, f = Object(r), p = u(r), L = p.length; L--; ) {
        var w = p[i ? L : ++g];
        if (l(f[w], w, f) === false) break;
      }
      return r;
    };
  }
  return wf = s, wf;
}
var Mf, L0;
function Ok() {
  if (L0) return Mf;
  L0 = 1;
  var s = Rk(), i = s();
  return Mf = i, Mf;
}
var Lf, k0;
function Uk() {
  if (k0) return Lf;
  k0 = 1;
  var s = Ok(), i = Vh();
  function r(l, u) {
    return l && s(l, u, i);
  }
  return Lf = r, Lf;
}
var kf, T0;
function zk() {
  if (T0) return kf;
  T0 = 1;
  var s = $h();
  function i(r, l) {
    return function(u, g) {
      if (u == null) return u;
      if (!s(u)) return r(u, g);
      for (var f = u.length, p = l ? f : -1, L = Object(u); (l ? p-- : ++p < f) && g(L[p], p, L) !== false; ) ;
      return u;
    };
  }
  return kf = i, kf;
}
var Tf, D0;
function Bk() {
  if (D0) return Tf;
  D0 = 1;
  var s = Uk(), i = zk(), r = i(s);
  return Tf = r, Tf;
}
var Df, Y0;
function Wk() {
  if (Y0) return Df;
  Y0 = 1;
  var s = Bk(), i = $h();
  function r(l, u) {
    var g = -1, f = i(l) ? Array(l.length) : [];
    return s(l, function(p, L, w) {
      f[++g] = u(p, L, w);
    }), f;
  }
  return Df = r, Df;
}
var Yf, C0;
function $k() {
  if (C0) return Yf;
  C0 = 1;
  function s(i, r) {
    var l = i.length;
    for (i.sort(r); l--; ) i[l] = i[l].value;
    return i;
  }
  return Yf = s, Yf;
}
var Cf, b0;
function Gk() {
  if (b0) return Cf;
  b0 = 1;
  var s = Rd();
  function i(r, l) {
    if (r !== l) {
      var u = r !== void 0, g = r === null, f = r === r, p = s(r), L = l !== void 0, w = l === null, D = l === l, b = s(l);
      if (!w && !b && !p && r > l || p && L && D && !w && !b || g && L && D || !u && D || !f) return 1;
      if (!g && !p && !b && r < l || b && u && f && !g && !p || w && u && f || !L && f || !D) return -1;
    }
    return 0;
  }
  return Cf = i, Cf;
}
var bf, S0;
function Vk() {
  if (S0) return bf;
  S0 = 1;
  var s = Gk();
  function i(r, l, u) {
    for (var g = -1, f = r.criteria, p = l.criteria, L = f.length, w = u.length; ++g < L; ) {
      var D = s(f[g], p[g]);
      if (D) {
        if (g >= w) return D;
        var b = u[g];
        return D * (b == "desc" ? -1 : 1);
      }
    }
    return r.index - l.index;
  }
  return bf = i, bf;
}
var Sf, F0;
function Jk() {
  if (F0) return Sf;
  F0 = 1;
  var s = dp(), i = lh(), r = Ik(), l = Wk(), u = $k(), g = Py(), f = Vk(), p = _0(), L = vn();
  function w(D, b, H) {
    b.length ? b = s(b, function(O) {
      return L(O) ? function(x) {
        return i(x, O.length === 1 ? O[0] : O);
      } : O;
    }) : b = [p];
    var N = -1;
    b = s(b, g(r));
    var q = l(D, function(O, x, Q) {
      var X = s(b, function(se) {
        return se(O);
      });
      return { criteria: X, index: ++N, value: O };
    });
    return u(q, function(O, x) {
      return f(O, x, H);
    });
  }
  return Sf = w, Sf;
}
var Ff, x0;
function Kk() {
  if (x0) return Ff;
  x0 = 1;
  var s = Jk(), i = vn();
  function r(l, u, g, f) {
    return l == null ? [] : (i(u) || (u = u == null ? [] : [u]), g = f ? void 0 : g, i(g) || (g = g == null ? [] : [g]), s(l, u, g));
  }
  return Ff = r, Ff;
}
var Zk = Kk();
const ir = Kc(Zk), ii = pn("inquiryGroups", () => {
  const s = tr([]), i = tr(false), r = zd(() => {
    const N = Ee();
    if (N.route.name === "group") return s.value.find((q) => q.slug === N.route.params.slug);
  }), l = zd(() => ip.orderBy(s.value.filter((N) => g.value[N.id] > 0), ["title"], ["asc"])), u = zd(() => {
    const N = It();
    return r.value ? N.inquiries.filter((q) => r.value?.inquiryIds.includes(q.id)) : [];
  }), g = zd(() => {
    const N = {}, q = It();
    return s.value.forEach((O) => {
      N[O.id] = q.inquiries.filter((x) => O.inquiryIds.includes(x.id)).length;
    }), N;
  });
  function f(N) {
    return s.value.filter((q) => !q.inquiryIds.includes(N));
  }
  function p(N) {
    if (!r.value) throw new Error("No current inquiry group set");
    s.value = s.value.map((q) => q.id === r.value?.id ? { ...q, name: N.name ?? q.name, titleExt: N.titleExt ?? q.titleExt, description: N.description ?? q.description } : q);
  }
  async function L() {
    if (!r.value) throw new Error("No current inquiry group set");
    try {
      const N = await dm.updateInquiryGroup({ ...r.value });
      return w({ inquiryGroup: N.data.inquiryGroup }), N.data.inquiryGroup;
    } catch (N) {
      if (N?.code === "ERR_CANCELED") return;
      throw te.error("Error updating inquiry group", { error: N, inquiryGroup: r.value }), N;
    }
  }
  function w(N) {
    s.value = s.value.filter((q) => q.id !== N.inquiryGroup.id).concat(N.inquiryGroup);
  }
  async function D(N) {
    const q = It();
    try {
      const O = await dm.addInquiryToGroup(N.inquiryId, N.inquiryGroupId, N.groupTitle);
      w({ inquiryGroup: O.data.inquiryGroup }), q.addOrUpdateInquiryGroupInList({ inquiry: O.data.inquiry });
    } catch (O) {
      if (O?.code === "ERR_CANCELED") return;
      throw te.error("Error adding inquiry to group", { error: O, payload: N }), q.load(), O;
    }
  }
  async function b(N) {
    const q = It();
    try {
      const O = await dm.removeInquiryFromGroup(N.inquiryGroupId, N.inquiryId);
      if (q.addOrUpdateInquiryGroupInList({ inquiry: O.data.inquiry }), O.data.inquiryGroup === null) {
        s.value = s.value.filter((x) => x.id !== N.inquiryGroupId);
        return;
      }
      w({ inquiryGroup: O.data.inquiryGroup });
    } catch (O) {
      if (O?.code !== "ERR_CANCELED") throw te.error("Error removing inquiry from group", { error: O, payload: N }), O;
    } finally {
    }
  }
  function H(N) {
    const q = s.value.find((O) => O.id === N);
    return q ? q.name : re("inquiries", "Invalid Group ID");
  }
  return { inquiryGroups: s, updating: i, inquiryGroupsSorted: l, countInquiriesInInquiryGroups: g, currentInquiryGroup: r, inquiriesInCurrendInquiryGroup: u, addableInquiryGroups: f, setCurrentInquiryGroup: p, setInquiryGroupElement: w, writeCurrentInquiryGroup: L, addInquiryToInquiryGroup: D, removeInquiryFromGroup: b, getInquiryGroupName: H };
}), Qk = { created: "status.created", title: "title", type: "type", access: "configuration.access", owner: "owner.displayName", expire: "configuration.expire", interaction: "status.lastInteraction", countComments: "status.countComments", countSupports: "status.countSupports" }, Xk = { created: re("agora", "Created"), title: re("agora", "Title"), type: re("agora", "Type"), access: re("agora", "Access"), owner: re("agora", "Owner"), expire: re("agora", "Expire"), interaction: re("agora", "Last interaction"), countComments: re("agora", "Comments count"), countSupports: re("agora", "Supports count") }, eT = { relevant: { id: "relevant", title: re("agora", "Relevant"), titleExt: re("agora", "Relevant inquiries"), description: re("agora", "Relevant inquiries which are relevant to you, because you are a participant, the owner or you are invited. Only inquiries not older than 100 days compared to creation, last interaction, expiration or latest option (for date inquiries) are shown."), pinned: false, showInNavigation: () => true, filterCondition: (s) => !s.status.isArchived && Zw.fromSeconds(s.status.relevantThreshold).diffNow("days").days > -100 && (s.currentUserStatus.isInvolved || s.permissions.view && s.configuration.access !== "open") }, my: { id: "my", title: re("agora", "My inquiries"), titleExt: re("agora", "My inquiries"), description: re("agora", "These are all inquiries where you are the owner."), pinned: false, showInNavigation: () => Ee().appPermissions.inquiryCreation, filterCondition: (s) => !s.status.isArchived && s.currentUserStatus.isOwner }, private: { id: "private", title: re("agora", "Private inquiries"), titleExt: re("agora", "Private inquiries"), description: re("agora", "All private inquiries, to which you have access."), pinned: false, showInNavigation: () => Ee().appPermissions.inquiryCreation, filterCondition: (s) => !s.status.isArchived && s.permissions.view && s.configuration.access === "private" }, participated: { id: "participated", title: re("agora", "Participated"), titleExt: re("agora", "Participated"), description: re("agora", "All inquiries who get participation."), pinned: false, showInNavigation: () => true, filterCondition: (s) => !s.status.isArchived && s.status.countParticipants > 0 }, open: { id: "open", title: re("agora", "Openly accessible inquiries"), titleExt: re("agora", "Openly accessible inquiries"), description: re("agora", "A complete list with all openly accessible inquiries on this site."), pinned: false, showInNavigation: () => Ee().appPermissions.inquiryCreation, filterCondition: (s) => !s.status.isArchived && s.configuration.access === "open" }, all: { id: "all", title: re("agora", "All inquiries"), titleExt: re("agora", "All inquiries"), description: re("agora", "All inquiries, where you have access to."), pinned: false, showInNavigation: () => true, filterCondition: (s) => !s.status.isArchived && s.permissions.view }, closed: { id: "closed", title: re("agora", "Closed inquiries"), titleExt: re("agora", "Closed inquiries"), description: re("agora", "All closed inquiries, where voting is disabled."), pinned: false, showInNavigation: () => true, filterCondition: (s) => !s.status.isArchived && s.status.isExpired && s.permissions.view }, archived: { id: "archived", title: re("agora", "Archive"), titleExt: re("agora", "My archived inquiries"), description: re("agora", "Your archived inquiries are only accessible to you."), pinned: true, showInNavigation: () => Ee().appPermissions.inquiryCreation, filterCondition: (s) => s.status.isArchived && s.permissions.view }, admin: { id: "admin", title: re("agora", "Administration"), titleExt: re("agora", "Administrative access"), description: re("agora", "You can delete, archive and take over inquiries in this list, but access is still not possible."), pinned: true, showInNavigation: () => !!Ee().currentUser?.isAdmin, filterCondition: (s) => s.permissions.view } }, It = pn("inquiries", { state: () => ({ inquiries: [], meta: { chunks: { size: 20, loaded: 1 }, maxInquiriesInNavigation: 6, status: "" }, sort: { by: "created", reverse: true }, status: { loadingGroups: false }, categories: eT, currentFilter: "relevant", advancedFilters: {} }), getters: { navigationCategories(s) {
  return Object.values(s.categories).filter((i) => i.showInNavigation());
}, navigationListWithFilters: (s) => (i) => {
  let r = s.inquiries.filter((l) => s.categories[i].filterCondition(l));
  return s.advancedFilters.type && (r = r.filter((l) => l.type === s.advancedFilters.type)), ir(r, ["created"], ["desc"]).slice(0, s.meta.maxInquiriesInNavigation);
}, navigationList: (s) => (i) => ir(s.inquiries.filter((r) => s.categories[i].filterCondition(r)) ?? [], ["created"], ["desc"]).slice(0, s.meta.maxInquiriesInNavigation), currentCategory(s) {
  const i = Ee();
  return i.route.name === "list" && i.route.params.type ? s.categories[i.route.params.type] : s.categories.relevant;
}, inquiriesFilteredSorted(s) {
  const i = Ee(), r = ii();
  if (i.route.name === "group") return r.inquiriesInCurrendInquiryGroup;
  let l = s.inquiries.filter((u) => this.currentCategory?.filterCondition(u)) ?? [];
  if (s.advancedFilters.type && (l = l.filter((u) => u.type === s.advancedFilters.type)), s.advancedFilters.categoryId && (l = l.filter((u) => u.categoryId === s.advancedFilters.categoryId)), s.advancedFilters.locationId && (l = l.filter((u) => u.locationId === s.advancedFilters.locationId)), s.advancedFilters.hasComments !== void 0 && (l = l.filter((u) => s.advancedFilters.hasComments ? u.status.countComments > 0 : u.status.countComments === 0)), s.advancedFilters.hasSupports !== void 0 && (l = l.filter((u) => s.advancedFilters.hasSupports ? u.status.countSupports > 0 : u.status.countSupports === 0)), s.advancedFilters.search) {
    const u = s.advancedFilters.search.toLowerCase();
    l = l.filter((g) => g.title.toLowerCase().includes(u) || g.description.toLowerCase().includes(u));
  }
  return ir(l, [Qk[s.sort.by]], [s.sort.reverse ? "desc" : "asc"]);
}, chunkedList() {
  return this.inquiriesFilteredSorted.slice(0, this.loaded);
}, inquiriesCount(s) {
  const i = {};
  for (const [r, l] of Object.entries(s.categories)) i[r] = s.inquiries.filter((u) => l.filterCondition(u)).length;
  return i;
}, dashboardList(s) {
  return ir(s.inquiries.filter((i) => s.categories.relevant.filterCondition(i)), ["created"], ["desc"]).slice(0, 7);
}, loaded(s) {
  return s.meta.chunks.loaded * s.meta.chunks.size;
}, proposalInquiries(s) {
  return s.inquiries.filter((i) => i.type === "proposal" && !i.status.isArchived);
}, inquiriesLoading(s) {
  return s.meta.status === "loading";
}, countByCategory: (s) => (i) => s.inquiries.filter((r) => s.categories[i].filterCondition(r)).length }, actions: { setFilters(s) {
  this.advancedFilters = { ...s }, this.resetChunks();
}, resetFilters() {
  this.advancedFilters = {}, this.resetChunks();
}, setCurrentFilter(s) {
  this.currentFilter = s, this.resetChunks(), this.resetFilters();
}, updateFilter(s, i) {
  this.advancedFilters[s] = i, this.resetChunks();
}, async load(s = true) {
  const i = ii();
  if (this.meta.status === "loading" || !s && this.meta.status === "loaded") {
    te.debug("Inquiries already loaded or loading, skipping load", { status: this.meta.status, forced: s });
    return;
  }
  this.meta.status = "loading";
  try {
    const r = await at.getInquiries();
    this.inquiries = r.data.inquiries, i.inquiryGroups = r.data.inquiryGroups, this.meta.status = "loaded";
  } catch (r) {
    if (r?.code === "ERR_CANCELED") return;
    throw this.meta.status = "error", te.error("Error loading inquiries", { error: r }), r;
  }
}, groupList(s) {
  return ir(this.inquiries.filter((i) => s.includes(i.id)) ?? [], ["created"], ["desc"]).slice(0, this.meta.maxInquiriesInNavigation);
}, addOrUpdateInquiryGroupInList(s) {
  this.inquiries = this.inquiries.filter((i) => i.id !== s.inquiry?.id).concat(s.inquiry);
}, reset() {
  this.$reset();
}, async changeOwner(s) {
  try {
    await at.changeOwner(s.inquiryId, s.userId);
  } catch (i) {
    if (i?.code === "ERR_CANCELED") return;
    throw te.error("Error changing inquiry owner", { error: i, payload: s }), i;
  } finally {
    this.load();
  }
}, addChunk() {
  this.meta.chunks.loaded = this.meta.chunks.loaded + 1;
}, resetChunks() {
  this.meta.chunks.loaded = 1;
}, async clone(s) {
  try {
    await at.cloneInquiry(s.inquiryId);
  } catch (i) {
    if (i?.code === "ERR_CANCELED") return;
    throw te.error("Error cloning inquiry", { error: i, payload: s }), i;
  } finally {
    this.load();
  }
}, async delete(s) {
  try {
    await at.deleteInquiry(s.inquiryId);
  } catch (i) {
    if (i?.code === "ERR_CANCELED") return;
    throw te.error("Error deleting inquiry", { error: i, payload: s }), i;
  } finally {
    this.load();
  }
}, async toggleArchive(s) {
  try {
    await at.toggleArchive(s.inquiryId);
  } catch (i) {
    if (i?.code === "ERR_CANCELED") return;
    throw te.error("Error archiving/restoring inquiry", { error: i, payload: s }), i;
  } finally {
    this.load();
  }
}, async takeOver(s) {
  try {
    await at.takeOver(s.inquiryId);
  } catch (i) {
    if (i?.code === "ERR_CANCELED") return;
    throw te.error("Error archiving/restoring inquiry", { error: i, payload: s }), i;
  } finally {
    this.load();
  }
} } }), xf = pn("comments", { state: () => ({ comments: [] }), getters: { count: (s) => s.comments.length, groupedComments: (s) => hM(s.comments) }, actions: { async load() {
  const s = Ee();
  try {
    const i = await (s.route.name === "publicInquiry" ? rt.getComments(s.route.params.token) : s.route.name === "inquiry" ? So.getComments(s.currentInquiryId) : null);
    if (!i) {
      this.$reset();
      return;
    }
    this.comments = i.data.comments;
  } catch (i) {
    if (i?.code === "ERR_CANCELED") return;
    this.$reset();
  }
}, async add(s) {
  const i = Ee();
  try {
    if (!await (i.route.name === "publicInquiry" ? rt.addComment(i.publicToken, s.message, s.confidential) : i.route.name === "inquiry" ? So.addComment(i.currentInquiryId, s.message, s.confidential) : null)) {
      this.$reset();
      return;
    }
    this.load();
  } catch (r) {
    if (r?.code === "ERR_CANCELED") return;
    throw te.error("Error writing comment", { error: r, payload: s }), r;
  }
}, setItem(s) {
  const i = this.comments.findIndex((r) => r.id === s.comment.id);
  i < 0 ? this.comments.push(s.comment) : this.comments[i] = Object.assign(this.comments[i], s.comment);
}, async delete(s) {
  const i = Ee();
  try {
    const r = await (i.route.name === "publicInquiry" ? rt.deleteComment(i.publicToken, s.comment.id) : So.deleteComment(s.comment.id));
    this.setItem({ comment: r.data.comment });
  } catch (r) {
    if (r?.code === "ERR_CANCELED") return;
    throw te.error("Error deleting comment", { error: r, payload: s }), r;
  }
}, async restore(s) {
  const i = Ee();
  try {
    const r = await (i.route.name === "publicInquiry" ? rt.restoreComment(i.publicToken, s.comment.id) : So.restoreComment(s.comment.id));
    this.setItem({ comment: r.data.comment });
  } catch (r) {
    if (r?.code === "ERR_CANCELED") return;
    throw te.error("Error restoring comment", { error: r, payload: s }), r;
  }
} } }), Nf = pn("options", { state: () => ({ options: [], ranked: "no" }), getters: { countAvailable(s) {
  return s.options.filter((i) => !i.locked && !i.deleted).length;
}, countInquirydByCurrentUser(s) {
  return s.options.filter((i) => i.inquiries.currentUser === "yes").length;
}, countOptionsLeft() {
  return this.countAvailable - this.countInquirydByCurrentUser;
}, rankedOptions(s) {
  return ir(s.options, ["inquiries.yes", "inquiries.maybe"], ["desc", "desc"]);
}, sortedOptions(s) {
  return oi().type === "proposal" ? ir(s.options, ["timestamp", "duration"], ["asc", "asc"]) : s.options;
}, orderedOptions(s) {
  return s.ranked === "yes" ? this.rankedOptions : this.sortedOptions;
}, confirmed(s) {
  return s.options.filter((i) => i.confirmed > 0);
}, countSuggestions(s) {
  return s.options.filter((i) => i.owner !== null).length;
} }, actions: { find(s, i) {
  return this.options.find((r) => r.timestamp === s && r.duration === i);
}, async load() {
  const s = Ee();
  try {
    const i = await (s.route.name === "publicInquiry" ? rt.getOptions(s.route.params.token) : s.currentInquiryId ? Ss.getOptions(s.currentInquiryId) : null);
    if (!i) {
      this.$reset();
      return;
    }
    this.options = i.data.options;
  } catch (i) {
    if (i?.code === "ERR_CANCELED") return;
    throw te.error("Error loding options", { error: i, inquiryId: s.currentInquiryId }), i;
  }
}, updateOption(s) {
  const i = this.options.findIndex((r) => r.id === s.option.id);
  i < 0 ? this.options.push(s.option) : this.options.splice(i, 1, s.option), this.options.sort((r, l) => r.order < l.order ? -1 : r.order > l.order ? 1 : 0);
}, async add(s, i = null, r = false) {
  const l = Ee();
  try {
    const u = await (l.route.name === "publicInquiry" ? rt.addOption(l.route.params.token, s, i, r) : Ss.addOption(l.currentInquiryId, s, i, r));
    if (this.options = u.data.options, u.data.inquiries) {
      const g = It();
      g.inquiries = u.data.inquiries;
    }
  } catch (u) {
    if (u?.code !== "ERR_CANCELED") throw te.error("Error adding option", { error: u, simpleOption: s }), this.load(), u;
  }
}, async update(s) {
  try {
    const i = await Ss.updateOption(s.option);
    this.updateOption({ option: i.data.option });
  } catch (i) {
    throw te.error("Error updating option", { error: i, payload: s }), this.load(), i;
  }
}, async delete(s) {
  const i = Ee();
  try {
    const r = await (i.route.name === "publicInquiry" ? rt.deleteOption(i.route.params.token, s.option.id) : Ss.deleteOption(s.option.id));
    this.updateOption({ option: r.data.option });
  } catch (r) {
    if (r?.code === "ERR_CANCELED") return;
    throw te.error("Error deleting option", { error: r, payload: s }), r;
  }
}, async restore(s) {
  const i = Ee();
  try {
    const r = await (i.route.name === "publicInquiry" ? rt.restoreOption(i.route.params.token, s.option.id) : Ss.restoreOption(s.option.id));
    this.updateOption({ option: r.data.option });
  } catch (r) {
    if (r?.code === "ERR_CANCELED") return;
    throw te.error("Error restoring option", { error: r, payload: s }), r;
  }
}, async addBulk(s) {
  const i = Ee();
  try {
    const r = await Ss.addOptions(i.currentInquiryId, s.text);
    this.options = r.data.options;
  } catch (r) {
    if (r?.code === "ERR_CANCELED") return;
    throw te.error("Error adding option", { error: r, payload: s }), this.load(), r;
  }
}, async confirm(s) {
  const i = this.options.findIndex((r) => r.id === s.option.id);
  this.options[i].confirmed = Math.abs(this.options[i].confirmed - 1);
  try {
    const r = await Ss.confirmOption(s.option.id);
    this.updateOption({ option: r.data.option });
  } catch (r) {
    if (r?.code === "ERR_CANCELED") return;
    throw te.error("Error confirming option", { error: r, payload: s }), this.load(), r;
  }
}, async changeOrder(s, i) {
  const r = Ee();
  this.options.splice(i, 0, this.options.splice(s, 1)[0]);
  try {
    const l = await Ss.reorderOptions(r.currentInquiryId, this.options.map(({ id: u, text: g }) => ({ id: u, text: g })));
    this.options = l.data.options;
  } catch (l) {
    throw te.error("Error reordering option", { error: l, options: this.options, oldIndex: s, newIndex: i }), this.load(), l;
  }
}, async sequence(s) {
  try {
    const i = await Ss.addOptionsSequence(s.option.id, s.sequence);
    this.options = i.data.options;
  } catch (i) {
    if (i?.code === "ERR_CANCELED") return;
    throw te.error("Error creating sequence", { error: i, payload: s }), this.load(), i;
  }
}, async shift(s) {
  const i = Ee();
  try {
    const r = await Ss.shiftOptions(i.currentInquiryId, s.shift.value, s.shift.unit.id);
    this.options = r.data.options;
  } catch (r) {
    if (r?.code === "ERR_CANCELED") return;
    throw te.error("Error shifting dates", { error: r, payload: s }), this.load(), r;
  }
} } }), Af = pn("shares", { state: () => ({ shares: [] }), getters: { active: (s) => {
  const i = ["email", "external", "contact"], r = ["user", "group", "admin", "public"];
  return s.shares.filter((l) => !l.locked && (r.includes(l.type) || i.includes(l.type) && (l.type === "external" || l.invitationSent || l.supportedd)));
}, locked: (s) => s.shares.filter((i) => !!i.locked), unsentInvitations: (s) => s.shares.filter((i) => (i.user.emailAddress || i.type === "group" || i.type === "contactGroup" || i.type === "circle") && !i.invitationSent && !i.locked && !i.supported), public: (s) => s.shares.filter((i) => i.type === "public"), hasShares: (s) => s.shares.length > 0, hasLocked() {
  return this.locked.length > 0;
} }, actions: { async load(s = "inquiry") {
  let i = 0;
  if (s === "inquiryGroup") {
    const r = ii();
    if (te.info("Loading group shares"), !r.currentInquiryGroup) throw new Error("Current group is not set");
    i = r.currentInquiryGroup.id;
  } else te.info("Loading inquiry shares"), i = Ee().currentInquiryId;
  try {
    const r = await Qt.getShares(i, s);
    this.shares = r.data.shares;
  } catch (r) {
    this.handleError(r, "Error loading shares", { inquiryId: i });
  }
}, async add(s, i = "inquiry") {
  let r = 0;
  if (i === "inquiryGroup") {
    const l = ii();
    if (!l.currentInquiryGroup) throw new Error("Current group is not set");
    r = l.currentInquiryGroup.id;
  } else r = Ee().currentInquiryId;
  try {
    const l = await Qt.addUserShare(r, s, i);
    this.shares.push(l.data.share);
  } catch (l) {
    this.handleError(l, "Error adding user share", { purpose: i, id: r, payload: s });
  }
}, async addPublicShare() {
  const s = Ee();
  try {
    const i = await Qt.addPublicShare(s.currentInquiryId);
    this.shares.push(i.data.share);
  } catch (i) {
    this.handleError(i, "Error adding public share", { inquiryId: s.currentInquiryId });
  }
}, update(s) {
  const i = this.shares.findIndex((r) => r.id === s.share.id);
  Object.assign(this.shares[i], s.share);
}, async switchAdmin(s) {
  const i = s.share.type === "user" ? "admin" : "user";
  try {
    const r = await Qt.switchAdmin(s.share.token, i);
    this.update(r.data);
  } catch (r) {
    this.handleError(r, `Error switching type to ${i}`, s);
  }
}, async setPublicInquiryEmail(s) {
  try {
    const i = await Qt.setEmailAddressConstraint(s.share.token, s.value);
    this.update(i.data);
  } catch (i) {
    this.handleError(i, "Error changing email register setting", s);
  }
}, async writeLabel(s) {
  try {
    const i = await Qt.writeLabel(s.token, s.label);
    this.update(i.data);
  } catch (i) {
    this.handleError(i, "Error writing label", s);
  }
}, async inviteAll(s) {
  try {
    const i = await Qt.inviteAll(s.inquiryId);
    return this.load(), i;
  } catch (i) {
    this.handleError(i, "Error inviting all users", s);
  }
}, async sendInvitation(s) {
  try {
    const i = await Qt.sendInvitation(s.share.token);
    return this.load(), i.data;
  } catch (i) {
    this.handleError(i, "Error sending share invitation", s);
  }
}, async resolveGroup(s) {
  try {
    await Qt.resolveShare(s.share.token), this.load();
  } catch (i) {
    this.handleError(i, "Error resolving group share", s);
  }
}, async lock(s) {
  try {
    const i = await Qt.lockShare(s.share.token);
    this.update(i.data);
  } catch (i) {
    this.handleError(i, "Error locking share", s);
  }
}, async unlock(s) {
  try {
    const i = await Qt.unlockShare(s.share.token);
    this.update(i.data);
  } catch (i) {
    this.handleError(i, "Error unlocking share", s);
  }
}, async delete(s) {
  try {
    const i = await Qt.deleteShare(s.share.token);
    this.update(i.data);
  } catch (i) {
    this.handleError(i, "Error deleting share", s);
  }
}, async restore(s) {
  try {
    const i = await Qt.restoreShare(s.share.token);
    this.update(i.data);
  } catch (i) {
    this.handleError(i, "Error restoring share", s);
  }
}, handleError(s, i, r) {
  if (s?.code !== "ERR_CANCELED") throw te.error(i, { error: s, payload: r }), this.load(), s;
} } });
re("inquiries", "Minute"), re("inquiries", "Hour"), re("inquiries", "Day"), re("inquiries", "Week"), re("inquiries", "Month"), re("inquiries", "Year");
var Ef = ((s) => (s.TransitionsOff = "agora:transitions:off", s.TransitionsOn = "agora:transitions:on", s.UpdateInquiry = "agora:inquiry:update", s.LoadInquiry = "agora:inquiry:load", s.SidebarChangeTab = "agora:sidebar:changeTab", s.SidebarToggle = "agora:sidebar:toggle", s.ChangeShares = "agora:change:shares", s.UpdateOptions = "agora:options:update", s.AddDate = "agora:options:add-date", s.UpdateComments = "agora:comments:update", s.UpdateSupports = "agora:supports:update", s.UpdateActivity = "agora:activity:update", s.ShowSettings = "agora:settings:show", s))(Ef || {});
function bo() {
  return {};
}
const N0 = pn("subscription", () => {
  const s = tr(false), i = () => {
    s.value = false;
  };
  async function r() {
    const u = Ee();
    try {
      const g = await (u.route.name === "publicInquiry" ? rt.getSubscription(u.route.params.token) : u.route.name === "inquiry" ? at.getSubscription(u.currentInquiryId) : null);
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
    const u = Ee();
    try {
      const g = await (u.route.name === "publicInquiry" ? rt.setSubscription(u.route.params.token, !s.value) : u.route.name === "inquiry" ? at.setSubscription(u.currentInquiryId, !s.value) : null);
      if (g) {
        s.value = g.data.subscribed;
        return;
      }
      s.value = false;
    } catch (g) {
      if (g?.code === "ERR_CANCELED") return;
      throw te.error("Error on changing subscription", { error: g }), g;
    }
  }
  return { subscribed: s, load: r, reset: i, write: l };
});
let A0 = null;
const Ee = pn("session", { state: () => ({ appPermissions: { addShares: false, addSharesExternal: false, allAccess: false, changeForeignInquiries: false, comboView: false, deanonymizeInquiry: false, inquiryCreation: false, inquiryDownload: false, publicShares: false, seeMailAddresses: false, unrestrictedOwner: false }, appSettings: bo(), route: { currentRoute: "", name: "", path: "", params: { id: 0, token: "", type: "relevant", slug: "" } }, userStatus: { isLoggedin: !!Bd(), isAdmin: !!Bd()?.isAdmin, isOfficial: !!Bd()?.isOfficial, isModerator: !!Bd()?.isModerator }, watcher: { id: "", mode: "noInquirying", status: "stopped", lastUpdate: Math.floor(Date.now() / 1e3) }, token: null, currentUser: bo(), share: bo(), isLoaded: false }), getters: { publicToken(s) {
  return s.route.params.token ? s.route.params.token : "";
}, currentInquiryId(s) {
  return s.route.name === "inquiry" ? Number(s.route.params.id) : 0;
}, windowTitle(s) {
  const i = oi(), r = { prefix: `${re("agora", "Agora")}`, name: "Nextcloud" };
  if (s.route.name === "list") {
    const l = It();
    r.name = l.categories[this.route.params.type].titleExt;
  } else if (s.route.name === "group") {
    const l = ii();
    r.name = l.currentInquiryGroup?.titleExt || l.currentInquiryGroup?.name || "";
  } else s.route.name === "publicInquiry" ? r.name = i.title : s.route.name === "inquiry" && (r.name = i.title ?? re("agora", "Enter title"));
  return `${r.prefix} – ${r.name}`;
} }, actions: { generateWatcherId() {
  this.watcher.id = Math.random().toString(36).substring(2);
}, async load(s, i = false, r = false) {
  if (te.debug("Loading session"), !r && this.isLoaded && this.currentUser.id === A0) {
    te.debug("Session already loaded for same user, skipping, route set to:", s), s !== null && await this.setRouter(s);
    return;
  }
  if (this.generateWatcherId(), s !== null && (te.debug("Set requested route", { to: s }), await this.setRouter(s), te.debug("Route set", { route: this.route })), i) {
    te.debug("Same route, skipping session load");
    return;
  }
  try {
    const l = await (this.route.name === "publicInquiry" ? rt.getSession(this.publicToken) : z0.getSession());
    this.$patch(l.data), this.isLoaded = true, A0 = this.currentUser.id;
  } catch (l) {
    if (l?.code === "ERR_CANCELED") return;
    if (this.$reset(), this.route.name === null) this.$reset();
    else throw l;
  }
  te.debug("Session loaded");
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
    this.share = bo();
    return;
  }
  try {
    const s = await rt.getShare(this.publicToken);
    this.share = s.data.share;
  } catch (s) {
    if (s?.code === "ERR_CANCELED") return;
    throw te.error("Error retrieving share", { error: s }), s;
  }
}, async updateEmailAddress(s) {
  const i = oi();
  if (this.route.name === "publicInquiry") try {
    const r = await rt.setEmailAddress(this.publicToken, s.emailAddress);
    this.share = r.data.share, i.load();
  } catch (r) {
    if (r?.code === "ERR_CANCELED") return;
    throw te.error("Error writing email address", { error: r, payload: s }), r;
  }
}, async updateDisplayName(s) {
  const i = oi();
  if (this.route.name === "publicInquiry") try {
    const r = await rt.setDisplayName(this.publicToken, s.displayName);
    this.share = r.data.share, i.load();
  } catch (r) {
    if (r?.code === "ERR_CANCELED") return;
    throw te.error("Error changing name", { error: r, payload: s }), r;
  }
}, async deleteEmailAddress() {
  const s = oi(), i = N0();
  if (this.route.name === "publicInquiry") try {
    const r = await rt.deleteEmailAddress(this.publicToken);
    this.share = r.data.share, i.$state.subscribed = false, i.write(), s.load();
  } catch (r) {
    if (r?.code === "ERR_CANCELED") return;
    throw te.error("Error deleting email address", { error: r }), r;
  }
}, async resendInvitation() {
  if (this.route.name !== "publicInquiry") throw new Error("Not on public inquiry page");
  try {
    return await rt.resendInvitation(this.publicToken);
  } catch (s) {
    if (s?.code === "ERR_CANCELED") return;
    throw te.error("Error sending invitation", { error: s, token: this.route.params.token }), s;
  }
} } }), tT = { baseURL: Qw("apps/agora/"), headers: { Accept: "application/json", "Nc-Agora-Client-Time-Zone": Intl.DateTimeFormat().resolvedOptions().timeZone } }, sT = { baseURL: Xw("apps/"), headers: { Accept: "application/json" } }, nT = eg.CancelToken, I = eg.create(tT), aT = eg.create(sT);
I.interceptors.request.use((s) => {
  try {
    const i = Ee();
    s.headers = { ...s.headers, "Nc-Agora-Client-Id": i.watcher.id };
  } catch {
  }
  return s;
});
const Rt = (s) => {
  const i = {};
  return Object.getOwnPropertyNames(s).forEach((r) => {
    const l = { cancelToken: void 0 };
    i[r] = { handleRequestCancellation: () => (l.cancelToken && l.cancelToken.cancel(`${r} canceled`), l.cancelToken = nT.source(), l.cancelToken) };
  }), i;
}, E0 = { getActivities(s) {
  return aT.request({ method: "GET", url: "activity/api/v2/activity/inquiries", params: { format: "json", since: 0, limit: 50, object_type: "inquiry", object_id: s }, cancelToken: rT[this.getActivities.name].handleRequestCancellation().token });
} }, rT = Rt(E0), H0 = { runAutoReminder() {
  return I.request({ method: "GET", url: "administration/autoreminder/run", cancelToken: Hf[this.runAutoReminder.name].handleRequestCancellation().token });
}, runJanitor() {
  return I.request({ method: "GET", url: "administration/janitor/run", cancelToken: Hf[this.runJanitor.name].handleRequestCancellation().token });
}, runNotification() {
  return I.request({ method: "GET", url: "administration/notification/run", cancelToken: Hf[this.runNotification.name].handleRequestCancellation().token });
} }, Hf = Rt(H0), P0 = { getAppSettings() {
  return I.request({ method: "GET", url: "settings/app", params: { time: +/* @__PURE__ */ new Date() }, cancelToken: us[this.getAppSettings.name].handleRequestCancellation().token });
}, writeAppSettings(s) {
  return I.request({ method: "POST", url: "settings/app", data: { appSettings: s }, cancelToken: us[this.writeAppSettings.name].handleRequestCancellation().token });
}, getGroups(s) {
  return I.request({ method: "GET", url: `groups${s.trim() ? `/${s.trim()}` : ""}`, cancelToken: us[this.getGroups.name].handleRequestCancellation().token });
}, getUsers(s, i) {
  return I.request({ method: "GET", url: `search/users${s.trim() ? `/${s.trim()}` : ""}`, params: { types: i.toString() }, cancelToken: us[this.getUsers.name].handleRequestCancellation().token });
}, addCategory(s) {
  return I.request({ method: "POST", url: "settings/categories", data: { category: s }, cancelToken: us[this.addCategory.name].handleRequestCancellation().token });
}, deleteCategory(s) {
  return I.request({ method: "DELETE", url: `settings/categories/${s}`, cancelToken: us[this.deleteCategory.name].handleRequestCancellation().token });
}, updateCategory(s, i, r) {
  return I.request({ method: "PUT", url: `settings/categories/${s}`, data: { name: i, parentId: r }, cancelToken: us[this.updateCategory.name].handleRequestCancellation().token });
}, addLocation(s) {
  return I.request({ method: "POST", url: "settings/locations", data: { location: s }, cancelToken: us[this.addLocation.name].handleRequestCancellation().token });
}, deleteLocation(s) {
  return I.request({ method: "DELETE", url: `settings/locations/${s}`, cancelToken: us[this.deleteLocation.name].handleRequestCancellation().token });
}, updateLocation(s, i, r) {
  return I.request({ method: "PUT", url: `settings/locations/${s}`, data: { name: i, parentId: r }, cancelToken: us[this.updateLocation.name].handleRequestCancellation().token });
}, addModerationStatus(s) {
  return I.request({ method: "POST", url: "settings/moderation-statuses", data: { moderationStatus: s }, cancelToken: us[this.addModerationStatus.name].handleRequestCancellation().token });
}, deleteModerationStatus(s) {
  return I.request({ method: "DELETE", url: `settings/moderation-statuses/${s}`, cancelToken: us[this.deleteModerationStatus.name].handleRequestCancellation().token });
}, updateModerationStatus(s, i) {
  return I.request({ method: "PUT", url: `settings/moderation-statuses/${s}`, data: { moderationStatus: i }, cancelToken: us[this.updateModerationStatus.name].handleRequestCancellation().token });
} }, us = Rt(P0), j0 = { getCalendars() {
  return I.request({ method: "GET", url: "calendars", params: { time: +/* @__PURE__ */ new Date() }, cancelToken: q0[this.getCalendars.name].handleRequestCancellation().token });
}, getEvents(s) {
  return I.request({ method: "GET", url: `option/${s}/events`, params: { tz: Intl.DateTimeFormat().resolvedOptions().timeZone, time: +/* @__PURE__ */ new Date() }, cancelToken: q0[this.getEvents.name].handleRequestCancellation().token });
} }, q0 = Rt(j0), So = { getComments(s) {
  return I.request({ method: "GET", url: `inquiry/${s}/comments`, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: lm[this.getComments.name].handleRequestCancellation().token });
}, addComment(s, i, r = false) {
  return I.request({ method: "POST", url: `inquiry/${s}/comment`, data: { message: i, confidential: r }, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: lm[this.addComment.name].handleRequestCancellation().token });
}, deleteComment(s) {
  return I.request({ method: "DELETE", url: `comment/${s}`, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: lm[this.deleteComment.name].handleRequestCancellation().token });
}, restoreComment(s) {
  return I.request({ method: "PUT", url: `comment/${s}/restore`, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: lm[this.restoreComment.name].handleRequestCancellation().token });
} }, lm = Rt(So), Ss = { getOptions(s) {
  return I.request({ method: "GET", url: `inquiry/${s}/options`, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: wn[this.getOptions.name].handleRequestCancellation().token });
}, addOption(s, i, r) {
  return I.request({ method: "POST", url: `inquiry/${s}/option`, data: { option: i, sequence: r }, cancelToken: wn[this.addOption.name].handleRequestCancellation().token });
}, updateOption(s) {
  return I.request({ method: "PUT", url: `option/${s.id}`, data: { ...s }, cancelToken: wn[this.updateOption.name].handleRequestCancellation().token });
}, deleteOption(s) {
  return I.request({ method: "DELETE", url: `option/${s}`, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: wn[this.deleteOption.name].handleRequestCancellation().token });
}, restoreOption(s) {
  return I.request({ method: "PUT", url: `option/${s}/restore`, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: wn[this.restoreOption.name].handleRequestCancellation().token });
}, addOptions(s, i) {
  return I.request({ method: "POST", url: "option/bulk", data: { inquiryId: s, text: i }, cancelToken: wn[this.addOptions.name].handleRequestCancellation().token });
}, confirmOption(s) {
  return I.request({ method: "PUT", url: `option/${s}/confirm`, cancelToken: wn[this.confirmOption.name].handleRequestCancellation().token });
}, reorderOptions(s, i) {
  return I.request({ method: "POST", url: `inquiry/${s}/options/reorder`, data: { options: i }, cancelToken: wn[this.reorderOptions.name].handleRequestCancellation().token });
}, addOptionsSequence(s, i) {
  return I.request({ method: "POST", url: `option/${s}/sequence`, data: { sequence: i }, cancelToken: wn[this.addOptionsSequence.name].handleRequestCancellation().token });
}, shiftOptions(s, i, r) {
  return I.request({ method: "POST", url: `inquiry/${s}/shift`, data: { step: i, unit: r }, cancelToken: wn[this.shiftOptions.name].handleRequestCancellation().token });
} }, wn = Rt(Ss), at = { getInquiries() {
  return I.request({ method: "GET", url: "inquiries", params: { time: +/* @__PURE__ */ new Date() }, cancelToken: Ue[this.getInquiries.name].handleRequestCancellation().token });
}, getChildInquiryIds(s) {
  return I.request({ method: "GET", url: `inquiry/${s}/childs`, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: Ue[this.getInquiry.name].handleRequestCancellation().token });
}, getInquiry(s) {
  return I.request({ method: "GET", url: `inquiry/${s}/inquiry`, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: Ue[this.getInquiry.name].handleRequestCancellation().token });
}, getFullInquiry(s) {
  return I.request({ method: "GET", url: `inquiry/${s}`, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: Ue[this.getInquiry.name].handleRequestCancellation().token });
}, takeOver(s) {
  return I.request({ method: "PUT", url: `administration/inquiry/${s}/takeover`, cancelToken: Ue[this.takeOver.name].handleRequestCancellation().token });
}, changeOwner(s, i) {
  return I.request({ method: "PUT", url: `inquiry/${s}/changeowner/${i}`, cancelToken: Ue[this.changeOwner.name].handleRequestCancellation().token });
}, updateModerationStatus(s, i) {
  return I.request({ method: "PUT", url: `inquiry/updatemoderation/${s}/${i}`, cancelToken: Ue[this.updateModerationStatus.name].handleRequestCancellation().token });
}, updateInquiryConfig(s, i) {
  return I.request({ method: "PUT", url: `inquiry/updateconfig/${s}`, data: { inquiry: i }, cancelToken: Ue[this.updateInquiryConfig.name].handleRequestCancellation().token });
}, addInquiry(s) {
  return I.request({ method: "POST", url: "inquiry/add", data: s, cancelToken: Ue[this.addInquiry.name].handleRequestCancellation().token });
}, updateInquiry(s, i) {
  return I.request({ method: "PUT", url: `inquiry/${s}`, data: i, cancelToken: Ue[this.updateInquiry.name].handleRequestCancellation().token });
}, lockAnonymous(s) {
  return I.request({ method: "PUT", url: `inquiry/${s}/lockAnonymous`, cancelToken: Ue[this.lockAnonymous.name].handleRequestCancellation().token });
}, deleteInquiry(s) {
  return I.request({ method: "DELETE", url: `inquiry/${s}`, cancelToken: Ue[this.deleteInquiry.name].handleRequestCancellation().token });
}, closeInquiry(s) {
  return I.request({ method: "PUT", url: `inquiry/${s}/close`, cancelToken: Ue[this.closeInquiry.name].handleRequestCancellation().token });
}, reopenInquiry(s) {
  return I.request({ method: "PUT", url: `inquiry/${s}/reopen`, cancelToken: Ue[this.reopenInquiry.name].handleRequestCancellation().token });
}, toggleArchive(s) {
  return I.request({ method: "PUT", url: `inquiry/${s}/toggleArchive`, cancelToken: Ue[this.toggleArchive.name].handleRequestCancellation().token });
}, cloneInquiry(s) {
  return I.request({ method: "POST", url: `inquiry/${s}/clone`, cancelToken: Ue[this.cloneInquiry.name].handleRequestCancellation().token });
}, sendConfirmation(s) {
  return I.request({ method: "POST", url: `inquiry/${s}/confirmation`, cancelToken: Ue[this.sendConfirmation.name].handleRequestCancellation().token });
}, getParticipantsEmailAddresses(s) {
  return I.request({ method: "GET", url: `inquiry/${s}/addresses`, cancelToken: Ue[this.getParticipantsEmailAddresses.name].handleRequestCancellation().token });
}, getSubscription(s) {
  return I.request({ method: "GET", url: `inquiry/${s}/subscription`, cancelToken: Ue[this.getSubscription.name].handleRequestCancellation().token });
}, setSubscription(s, i) {
  return I.request({ method: "PUT", url: `inquiry/${s}${i ? "/subscribe" : "/unsubscribe"}`, cancelToken: Ue[this.setSubscription.name].handleRequestCancellation().token });
}, getCommentsCount(s) {
  return I.request({ method: "GET", url: `inquiry/${s}/comment-count`, cancelToken: Ue[this.getCommentsCount.name].handleRequestCancellation().token });
}, getSupportsCount(s) {
  return I.request({ method: "GET", url: `inquiry/${s}/support-count`, cancelToken: Ue[this.getSupportsCount.name].handleRequestCancellation().token });
}, getCategories() {
  return I.request({ method: "GET", url: `inquiry/${inquiryId}/categories`, cancelToken: Ue[this.getCategories.name].handleRequestCancellation().token });
}, getLocations() {
  return I.request({ method: "GET", url: `inquiry/${inquiryId}/locations`, cancelToken: Ue[this.getLocations.name].handleRequestCancellation().token });
} }, Ue = Rt(at), dm = { getInquiryGroups() {
  return I.request({ method: "GET", url: "inquirygroups", params: { time: +/* @__PURE__ */ new Date() }, cancelToken: mm[this.getInquiryGroups.name].handleRequestCancellation().token });
}, addInquiryToGroup(s, i, r) {
  let l = "", u = "PUT", g = {};
  if (i) l = `inquirygroup/${i}/inquiry/${s}`;
  else if (r) u = "POST", l = `inquirygroup/new/inquiry/${s}`, g = { inquiryGroupName: r };
  else throw new Error("You must provide either a inquiryGroupId or a inquiryGroupName");
  return I.request({ method: u, url: l, data: g, cancelToken: mm[this.addInquiryToGroup.name].handleRequestCancellation().token });
}, removeInquiryFromGroup(s, i) {
  return I.request({ method: "DELETE", url: `inquirygroup/${s}/inquiry/${i}`, cancelToken: mm[this.removeInquiryFromGroup.name].handleRequestCancellation().token });
}, updateInquiryGroup(s) {
  return I.request({ method: "PUT", url: `inquirygroup/${s.id}/update`, data: { name: s.name, titleExt: s.titleExt, description: s.description }, cancelToken: mm[this.updateInquiryGroup.name].handleRequestCancellation().token });
} }, mm = Rt(dm), rt = { getInquiry(s) {
  return I.request({ method: "GET", url: `/s/${s}/inquiry`, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: Ke[this.getInquiry.name].handleRequestCancellation().token });
}, getSession(s) {
  return I.request({ method: "GET", url: `/s/${s}/session`, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: Ke[this.getSession.name].handleRequestCancellation().token });
}, getOptions(s) {
  return I.request({ method: "GET", url: `/s/${s}/options`, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: Ke[this.getOptions.name].handleRequestCancellation().token });
}, addOption(s, i, r, l = false) {
  return I.request({ method: "POST", url: `/s/${s}/option`, data: { option: i, sequence: r, inquiryYes: l }, cancelToken: Ke[this.addOption.name].handleRequestCancellation().token });
}, deleteOption(s, i) {
  return I.request({ method: "DELETE", url: `s/${s}/option/${i}`, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: Ke[this.deleteOption.name].handleRequestCancellation().token });
}, restoreOption(s, i) {
  return I.request({ method: "PUT", url: `s/${s}/option/${i}/restore`, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: Ke[this.restoreOption.name].handleRequestCancellation().token });
}, getInquiries(s) {
  return I.request({ method: "GET", url: `/s/${s}/inquiries`, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: Ke[this.getInquiries.name].handleRequestCancellation().token });
}, setInquiry(s, i, r) {
  return I.request({ method: "PUT", url: `s/${s}/inquiry`, data: { optionId: i, setTo: r }, cancelToken: Ke[this.setInquiry.name].handleRequestCancellation().token });
}, resetInquiries(s) {
  return I.request({ method: "DELETE", url: `s/${s}/user`, cancelToken: Ke[this.resetInquiries.name].handleRequestCancellation().token });
}, removeOrphanedInquiries(s) {
  return I.request({ method: "DELETE", url: `s/${s}/inquiries/orphaned`, cancelToken: Ke[this.removeOrphanedInquiries.name].handleRequestCancellation().token });
}, getComments(s) {
  return I.request({ method: "GET", url: `/s/${s}/comments`, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: Ke[this.getComments.name].handleRequestCancellation().token });
}, addComment(s, i, r = false) {
  return I.request({ method: "POST", url: `s/${s}/comment`, data: { message: i, confidential: r }, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: Ke[this.addComment.name].handleRequestCancellation().token });
}, deleteComment(s, i) {
  return I.request({ method: "DELETE", url: `s/${s}/comment/${i}`, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: Ke[this.deleteComment.name].handleRequestCancellation().token });
}, restoreComment(s, i) {
  return I.request({ method: "PUT", url: `s/${s}/comment/${i}/restore`, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: Ke[this.restoreComment.name].handleRequestCancellation().token });
}, getShare(s) {
  return I.request({ method: "GET", url: `s/${s}/share`, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: Ke[this.getShare.name].handleRequestCancellation().token });
}, setEmailAddress(s, i) {
  return I.request({ method: "PUT", url: `s/${s}/email/${i}`, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: Ke[this.setEmailAddress.name].handleRequestCancellation().token });
}, deleteEmailAddress(s) {
  return I.request({ method: "DELETE", url: `s/${s}/email`, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: Ke[this.deleteEmailAddress.name].handleRequestCancellation().token });
}, setDisplayName(s, i) {
  return I.request({ method: "PUT", url: `s/${s}/name/${i}`, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: Ke[this.setDisplayName.name].handleRequestCancellation().token });
}, resendInvitation(s) {
  return I.request({ method: "POST", url: `s/${s}/resend`, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: Ke[this.resendInvitation.name].handleRequestCancellation().token });
}, getSubscription(s) {
  return I.request({ method: "GET", url: `s/${s}/subscription`, cancelToken: Ke[this.getSubscription.name].handleRequestCancellation().token });
}, setSubscription(s, i) {
  return I.request({ method: "PUT", url: `s/${s}${i ? "/subscribe" : "/unsubscribe"}`, cancelToken: Ke[this.setSubscription.name].handleRequestCancellation().token });
}, register(s, i, r, l = void 0) {
  return I.request({ method: "POST", url: `s/${s}/register`, data: { displayName: i, emailAddress: r, timeZone: l }, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: Ke[this.register.name].handleRequestCancellation().token });
} }, Ke = Rt(rt), Qt = { getShares(s, i = "inquiry") {
  return I.request({ method: "GET", url: `${i.toLowerCase()}/${s}/shares`, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: cs[this.getShares.name].handleRequestCancellation().token });
}, addUserShare(s, i, r = "inquiry") {
  return I.request({ method: "POST", url: `${r.toLowerCase()}/${s}/share`, data: i, cancelToken: cs[this.addUserShare.name].handleRequestCancellation().token });
}, addPublicShare(s) {
  return I.request({ method: "POST", url: `inquiry/${s}/publicshare`, cancelToken: cs[this.addPublicShare.name].handleRequestCancellation().token });
}, writeLabel(s, i) {
  return I.request({ method: "PUT", url: `share/${s}/setlabel`, data: { label: i }, cancelToken: cs[this.writeLabel.name].handleRequestCancellation().token });
}, switchAdmin(s, i) {
  return I.request({ method: "PUT", url: `share/${s}/${i}`, cancelToken: cs[this.switchAdmin.name].handleRequestCancellation().token });
}, setEmailAddressConstraint(s, i) {
  return I.request({ method: "PUT", url: `share/${s}/publicinquiryemail/${i}`, cancelToken: cs[this.setEmailAddressConstraint.name].handleRequestCancellation().token });
}, sendInvitation(s) {
  return I.request({ method: "POST", url: `share/${s}/invite`, cancelToken: cs[this.sendInvitation.name].handleRequestCancellation().token });
}, resolveShare(s) {
  return I.request({ method: "GET", url: `share/${s}/resolve`, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: cs[this.resolveShare.name].handleRequestCancellation().token });
}, deleteShare(s) {
  return I.request({ method: "DELETE", url: `share/${s}`, cancelToken: cs[this.deleteShare.name].handleRequestCancellation().token });
}, restoreShare(s) {
  return I.request({ method: "PUT", url: `share/${s}/restore`, cancelToken: cs[this.restoreShare.name].handleRequestCancellation().token });
}, lockShare(s) {
  return I.request({ method: "PUT", url: `share/${s}/lock`, cancelToken: cs[this.lockShare.name].handleRequestCancellation().token });
}, unlockShare(s) {
  return I.request({ method: "PUT", url: `share/${s}/unlock`, cancelToken: cs[this.unlockShare.name].handleRequestCancellation().token });
}, inviteAll(s) {
  return I.request({ method: "PUT", url: `inquiry/${s}/inviteAll`, cancelToken: cs[this.inviteAll.name].handleRequestCancellation().token });
} }, cs = Rt(Qt), Pf = { getUserSettings() {
  return I.request({ method: "GET", url: "preferences", params: { time: +/* @__PURE__ */ new Date() }, cancelToken: I0[this.getUserSettings.name].handleRequestCancellation().token });
}, writeUserSettings(s) {
  return I.request({ method: "POST", url: "preferences", data: { preferences: s }, cancelToken: I0[this.writeUserSettings.name].handleRequestCancellation().token });
} }, I0 = Rt(Pf), R0 = { validateEmailAddress(s) {
  return I.request({ method: "GET", url: `check/emailaddress/${s}`, cancelToken: O0[this.validateEmailAddress.name].handleRequestCancellation().token });
}, validateName(s, i) {
  return I.request({ method: "POST", url: "check/username", cancelToken: O0[this.validateName.name].handleRequestCancellation().token, data: { displayName: i, token: s }, headers: { "Nc-Agora-Share-Token": s } });
} }, O0 = Rt(R0), U0 = { addSupport(s, i) {
  return I.request({ method: "POST", url: `inquiry/support/${s}/${i}`, cancelToken: Fo[this.addSupport.name].handleRequestCancellation().token });
}, removeSupport(s, i) {
  return I.request({ method: "DELETE", url: `inquiry/support/${s}/${i}`, cancelToken: Fo[this.removeSupport.name].handleRequestCancellation().token });
}, getByInquiryId(s) {
  return I.request({ method: "GET", url: `inquiry/support/inquiry/${s}`, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: Fo[this.getByInquiryId.name].handleRequestCancellation().token });
}, getByUserId(s) {
  return I.request({ method: "GET", url: `inquiry/support/user/${s}`, params: { time: +/* @__PURE__ */ new Date() }, cancelToken: Fo[this.getByUserId.name].handleRequestCancellation().token });
}, getSupportStats() {
  return I.request({ method: "GET", url: "inquiry/support/stats/grouped", cancelToken: Fo[this.getSupportStats.name].handleRequestCancellation().token });
} }, Fo = Rt(U0), z0 = { getSession() {
  return I.request({ method: "GET", url: "/session", params: { time: +/* @__PURE__ */ new Date() }, cancelToken: iT[this.getSession.name].handleRequestCancellation().token });
} }, iT = Rt(z0), um = { uploadAttachment(s, i) {
  const r = new FormData();
  return r.append("file", i), I.request({ method: "POST", url: `inquiry/${s}/attachment`, data: r, headers: { "X-Requested-With": "XMLHttpRequest", requesttoken: OC.requestToken || "" }, cancelToken: jf[this.uploadAttachment.name].handleRequestCancellation().token });
}, deleteAttachment(s) {
  return I.request({ method: "DELETE", url: `attachment/${s}`, cancelToken: jf[this.deleteAttachment.name].handleRequestCancellation().token });
}, getAttachments(s) {
  return I.request({ method: "GET", url: `inquiry/${s}/attachments`, cancelToken: jf[this.getAttachments.name].handleRequestCancellation().token });
} }, jf = Rt(um), B0 = pn("attachments", { state: () => ({ attachments: [] }), getters: { getByCommentId: (s) => (i) => s.attachments.filter((r) => r.inquiryId === i) }, actions: { async upload(s, i) {
  try {
    return (await um.uploadAttachment(s, i)).data.attachment;
  } catch (r) {
    if (r?.code === "ERR_CANCELED") return;
    throw te.error("Error uploading attachment", { error: r }), r;
  }
}, async delete(s) {
  try {
    await um.deleteAttachment(s);
  } catch (i) {
    if (i?.code === "ERR_CANCELED") return;
    throw te.error("Error deleting attachment", { error: i }), i;
  }
}, async load(s) {
  try {
    const i = await um.getAttachments(s);
    this.attachments = this.attachments.filter((r) => r.inquiryId !== s), this.attachments.push(...i.data.attachments);
  } catch (i) {
    if (i?.code === "ERR_CANCELED") return;
    throw te.error("Error loading attachments", { error: i }), i;
  }
} } }), oT = { prefix: "desc-" }, oi = pn("inquiry", { state: () => ({ id: 0, title: "", type: "proposal", description: "", descriptionSafe: "", moderationStatus: "draft", parentId: 0, locationId: 0, categoryId: 0, childs: [], configuration: { description: "", access: "private", anonymous: false, autoReminder: false, collapseDescription: true, expire: 0, forceConfidentialComments: false, hideBookedUp: false, suggestionsExpire: 0, showResults: "always", maxInquiriesPerOption: 0, maxInquiriesPerUser: 0 }, owner: bo(), inquiryGroups: [], status: { forceEditMode: false, anonymizeLevel: "ANON_NONE", lastInteraction: 0, created: 0, isAnonymous: false, isArchived: false, isExpired: false, isRealAnonymous: false, relevantThreshold: 0, deletionDate: 0, archivedDate: 0, countParticipants: 0, countComments: 0, countSupports: 0 }, currentUserStatus: { groupInvitations: [], isInvolved: false, hasSupported: false, isLocked: false, isLoggedIn: false, isOwner: false, orphanedInquiries: 0, shareToken: "", userId: "", userRole: "", countInquiries: 0 }, permissions: { addOptions: false, addShares: false, addSharesExternal: false, archive: false, changeForeignInquiries: false, changeOwner: false, clone: false, comment: false, support: false, confirmOptions: false, deanonymize: false, delete: false, edit: false, reorderOptions: false, seeResults: false, seeUsernames: false, subscribe: false, takeOver: false, view: false, suppport: false }, revealParticipants: false, sortParticipants: "alphabetical", meta: { chunking: { size: 0, loaded: 0 }, status: "loaded" } }), getters: { viewMode(s) {
  const i = op();
  return s.type === "proposal" ? i.viewProposalInquiry : s.type === "petition" ? i.viewPetitionInquiry : s.type === "debate" ? i.viewDebateInquiry : s.type === "grievance" ? i.viewGrievanceInquiry : s.type === "project" ? i.viewProjectInquiry : "table-view";
}, safeParticipants() {
  const s = Ee(), i = It();
  return this.viewMode === "list-view" ? [s.currentUser] : i.getChunkedParticipants;
}, displayResults(s) {
  return s.configuration.showResults === "always" || s.configuration.showResults === "closed" && !this.status.isExpired;
}, isConfirmationAllowed(s) {
  return s.permissions.confirmOptions || !this.isClosed;
}, isOptionCloneAllowed(s) {
  return !this.isClosed && s.permissions.edit;
}, isSuggestionExpired(s) {
  return this.isSuggestionAllowed && s.configuration.suggestionsExpire > 0 && bs.unix(s.configuration.suggestionsExpire).diff() < 0;
}, isSuggestionExpirySet(s) {
  return this.isSuggestionAllowed && s.configuration.suggestionsExpire > 0;
}, suggestionsExpireRelative(s) {
  return bs.unix(s.configuration.suggestionsExpire).fromNow();
}, suggestionsExpire_d(s) {
  return bs.unix(s.configuration.suggestionsExpire)._d;
}, isClosed(s) {
  return s.status.isExpired || s.configuration.expire > 0 && bs.unix(s.configuration.expire).diff() < 1e3;
}, descriptionMarkDown() {
  return Ye.use(X_(oT)), tM.sanitize(Ye.parse(this.description).toString());
} }, actions: { reset() {
  this.$reset();
}, setSuggestionExpiration(s) {
  this.configuration.suggestionsExpire = bs(s.expire).unix(), this.write();
}, setExpiration(s) {
  this.configuration.suggestionsExpire = bs(s.expire).unix(), this.write();
}, async resetInquiry() {
  const s = It(), i = Nf(), r = Af(), l = xf(), u = useSupportsStore();
  this.$reset(), s.$reset(), i.$reset(), r.$reset(), l.$reset(), u.$reset();
}, async load(s = null) {
  const i = Ee(), r = Nf(), l = Af(), u = xf(), g = B0(), f = N0();
  this.meta.status = "loading";
  try {
    const p = await (() => {
      if (i.route.name === "publicInquiry") return rt.getInquiry(i.route.params.token);
      if (i.route.name === "inquiry") return at.getFullInquiry(s ?? i.currentInquiryId);
    })();
    if (!p) {
      this.$reset();
      return;
    }
    return this.$patch(p.data.inquiry), r.options = p.data.options, l.shares = p.data.shares, u.comments = p.data.comments, f.subscribed = p.data.subscribed, g.attachments = p.data.attachments, this.childs = p.data.childs, p.data.inquiry.owner.id === i.currentUser.id ? i.currentUser.isOwner = true : i.currentUser.isOwner = false, this.meta.status = "loaded", p;
  } catch (p) {
    if (p?.code === "ERR_CANCELED") return;
    throw this.meta.status = "error", te.error("Error loading inquiry", { error: p }), p;
  }
}, async add(s) {
  const i = It();
  try {
    return (await at.addInquiry({ title: s.title, type: s.type, configuration: s.configuration, description: s.description, parentId: s.parentId, locationId: s.locationId, categoryId: s.categoryId, owner: s.owner, currentUserStatus: s.currentUserStatus, permissions: s.permissions })).data.inquiry;
  } catch (r) {
    if (r?.code === "ERR_CANCELED") return;
    throw te.error("Error adding inquiry:", { error: r, payload: s, state: this.$state }), r;
  } finally {
    i.load();
  }
}, async update(s) {
  const i = It();
  this.$debounce(async () => {
    try {
      return (await at.updateInquiry(s.id, { title: s.title, type: s.type, description: s.description, parentId: s.parentId, locationId: s.locationId, categoryId: s.categoryId })).data.inquiry;
    } catch (l) {
      if (l?.code === "ERR_CANCELED") return;
      throw te.error("Error updating inquiry", { error: l, state: this.$state }), l;
    } finally {
      this.load(), i.load();
    }
  }, 500)();
}, async setModerationStatus(s) {
  try {
    await at.updateModerationStatus(this.id, s);
  } catch (i) {
    if (i?.code === "ERR_CANCELED") return;
    throw te.error("Error setting moderation status:", { error: i, state: this.$state }), i;
  }
}, async LockAnonymous() {
  try {
    await at.lockAnonymous(this.id);
  } catch (s) {
    if (s?.code === "ERR_CANCELED") return;
    throw te.error("Error locking inquiry to anonymous:", { error: s, state: this.$state }), s;
  } finally {
    this.load();
  }
}, write() {
  const s = It();
  this.$debounce(async () => {
    if (this.title === "") {
      _g(re("agora", "Title must not be empty!"));
      return;
    }
    try {
      const r = await at.updateInquiryConfig(this.id, this.configuration);
      this.$patch(r.data.inquiry), eM(Ef.UpdateInquiry, { store: "inquiry", message: re("inquiries", "Inquiry updated") });
    } catch (r) {
      if (r?.code === "ERR_CANCELED") return;
      throw te.error("Error updating inquiry:", { error: r, inquiry: this.$state }), _g(re("agora", "Error writing inquiry")), r;
    } finally {
      this.load(), s.load();
    }
  }, 500)();
}, async close() {
  const s = It();
  try {
    const i = await at.closeInquiry(this.id);
    this.$patch(i.data.inquiry);
  } catch (i) {
    if (i?.code === "ERR_CANCELED") return;
    throw te.error("Error closing inquiry", { error: i, inquiryId: this.id }), this.load(), i;
  } finally {
    s.load();
  }
}, async reopen() {
  const s = It();
  try {
    const i = await at.reopenInquiry(this.id);
    this.$patch(i.data.inquiry);
  } catch (i) {
    if (i?.code === "ERR_CANCELED") return;
    throw te.error("Error reopening inquiry", { error: i, inquiryId: this.id }), this.load(), i;
  } finally {
    s.load();
  }
}, async toggleArchive(s) {
  const i = It();
  try {
    const r = await at.toggleArchive(s.inquiryId);
    this.id === s.inquiryId && this.$patch(r.data.inquiry);
  } catch (r) {
    if (r?.code === "ERR_CANCELED") return;
    throw te.error("Error archiving/restoring", { error: r, payload: s }), r;
  } finally {
    i.load();
  }
} } }), W0 = /^[a-z0-9]+(-[a-z0-9]+)*$/, cm = (s, i, r, l = "") => {
  const u = s.split(":");
  if (s.slice(0, 1) === "@") {
    if (u.length < 2 || u.length > 3) return null;
    l = u.shift().slice(1);
  }
  if (u.length > 3 || !u.length) return null;
  if (u.length > 1) {
    const p = u.pop(), L = u.pop(), w = { provider: u.length > 0 ? u[0] : l, prefix: L, name: p };
    return i && !gm(w) ? null : w;
  }
  const g = u[0], f = g.split("-");
  if (f.length > 1) {
    const p = { provider: l, prefix: f.shift(), name: f.join("-") };
    return i && !gm(p) ? null : p;
  }
  if (r && l === "") {
    const p = { provider: l, prefix: "", name: g };
    return i && !gm(p, r) ? null : p;
  }
  return null;
}, gm = (s, i) => s ? !!((i && s.prefix === "" || s.prefix) && s.name) : false, $0 = Object.freeze({ left: 0, top: 0, width: 16, height: 16 }), hm = Object.freeze({ rotate: 0, vFlip: false, hFlip: false }), fm = Object.freeze({ ...$0, ...hm }), qf = Object.freeze({ ...fm, body: "", hidden: false });
function lT(s, i) {
  const r = {};
  !s.hFlip != !i.hFlip && (r.hFlip = true), !s.vFlip != !i.vFlip && (r.vFlip = true);
  const l = ((s.rotate || 0) + (i.rotate || 0)) % 4;
  return l && (r.rotate = l), r;
}
function G0(s, i) {
  const r = lT(s, i);
  for (const l in qf) l in hm ? l in s && !(l in r) && (r[l] = hm[l]) : l in i ? r[l] = i[l] : l in s && (r[l] = s[l]);
  return r;
}
function dT(s, i) {
  const r = s.icons, l = s.aliases || /* @__PURE__ */ Object.create(null), u = /* @__PURE__ */ Object.create(null);
  function g(f) {
    if (r[f]) return u[f] = [];
    if (!(f in u)) {
      u[f] = null;
      const p = l[f] && l[f].parent, L = p && g(p);
      L && (u[f] = [p].concat(L));
    }
    return u[f];
  }
  return Object.keys(r).concat(Object.keys(l)).forEach(g), u;
}
function mT(s, i, r) {
  const l = s.icons, u = s.aliases || /* @__PURE__ */ Object.create(null);
  let g = {};
  function f(p) {
    g = G0(l[p] || u[p], g);
  }
  return f(i), r.forEach(f), G0(s, g);
}
function V0(s, i) {
  const r = [];
  if (typeof s != "object" || typeof s.icons != "object") return r;
  s.not_found instanceof Array && s.not_found.forEach((u) => {
    i(u, null), r.push(u);
  });
  const l = dT(s);
  for (const u in l) {
    const g = l[u];
    g && (i(u, mT(s, u, g)), r.push(u));
  }
  return r;
}
const uT = { provider: "", aliases: {}, not_found: {}, ...$0 };
function If(s, i) {
  for (const r in i) if (r in s && typeof s[r] != typeof i[r]) return false;
  return true;
}
function J0(s) {
  if (typeof s != "object" || s === null) return null;
  const i = s;
  if (typeof i.prefix != "string" || !s.icons || typeof s.icons != "object" || !If(s, uT)) return null;
  const r = i.icons;
  for (const u in r) {
    const g = r[u];
    if (!u || typeof g.body != "string" || !If(g, qf)) return null;
  }
  const l = i.aliases || /* @__PURE__ */ Object.create(null);
  for (const u in l) {
    const g = l[u], f = g.parent;
    if (!u || typeof f != "string" || !r[f] && !l[f] || !If(g, qf)) return null;
  }
  return i;
}
const K0 = /* @__PURE__ */ Object.create(null);
function cT(s, i) {
  return { provider: s, prefix: i, icons: /* @__PURE__ */ Object.create(null), missing: /* @__PURE__ */ new Set() };
}
function li(s, i) {
  const r = K0[s] || (K0[s] = /* @__PURE__ */ Object.create(null));
  return r[i] || (r[i] = cT(s, i));
}
function Z0(s, i) {
  return J0(i) ? V0(i, (r, l) => {
    l ? s.icons[r] = l : s.missing.add(r);
  }) : [];
}
function gT(s, i, r) {
  try {
    if (typeof r.body == "string") return s.icons[i] = { ...r }, true;
  } catch {
  }
  return false;
}
let xo = false;
function Q0(s) {
  return typeof s == "boolean" && (xo = s), xo;
}
function hT(s) {
  const i = typeof s == "string" ? cm(s, true, xo) : s;
  if (i) {
    const r = li(i.provider, i.prefix), l = i.name;
    return r.icons[l] || (r.missing.has(l) ? null : void 0);
  }
}
function fT(s, i) {
  const r = cm(s, true, xo);
  if (!r) return false;
  const l = li(r.provider, r.prefix);
  return i ? gT(l, r.name, i) : (l.missing.add(r.name), true);
}
function _T(s, i) {
  if (typeof s != "object") return false;
  if (typeof i != "string" && (i = s.provider || ""), xo && !i && !s.prefix) {
    let u = false;
    return J0(s) && (s.prefix = "", V0(s, (g, f) => {
      fT(g, f) && (u = true);
    })), u;
  }
  const r = s.prefix;
  if (!gm({ prefix: r, name: "a" })) return false;
  const l = li(i, r);
  return !!Z0(l, s);
}
const X0 = Object.freeze({ width: null, height: null }), e1 = Object.freeze({ ...X0, ...hm }), pT = /(-?[0-9.]*[0-9]+[0-9.]*)/g, yT = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function t1(s, i, r) {
  if (i === 1) return s;
  if (r = r || 100, typeof s == "number") return Math.ceil(s * i * r) / r;
  if (typeof s != "string") return s;
  const l = s.split(pT);
  if (l === null || !l.length) return s;
  const u = [];
  let g = l.shift(), f = yT.test(g);
  for (; ; ) {
    if (f) {
      const p = parseFloat(g);
      isNaN(p) ? u.push(g) : u.push(Math.ceil(p * i * r) / r);
    } else u.push(g);
    if (g = l.shift(), g === void 0) return u.join("");
    f = !f;
  }
}
function vT(s, i = "defs") {
  let r = "";
  const l = s.indexOf("<" + i);
  for (; l >= 0; ) {
    const u = s.indexOf(">", l), g = s.indexOf("</" + i);
    if (u === -1 || g === -1) break;
    const f = s.indexOf(">", g);
    if (f === -1) break;
    r += s.slice(u + 1, g).trim(), s = s.slice(0, l).trim() + s.slice(f + 1);
  }
  return { defs: r, content: s };
}
function wT(s, i) {
  return s ? "<defs>" + s + "</defs>" + i : i;
}
function MT(s, i, r) {
  const l = vT(s);
  return wT(l.defs, i + l.content + r);
}
const LT = (s) => s === "unset" || s === "undefined" || s === "none";
function kT(s, i) {
  const r = { ...fm, ...s }, l = { ...e1, ...i }, u = { left: r.left, top: r.top, width: r.width, height: r.height };
  let g = r.body;
  [r, l].forEach((O) => {
    const x = [], Q = O.hFlip, X = O.vFlip;
    let se = O.rotate;
    Q ? X ? se += 2 : (x.push("translate(" + (u.width + u.left).toString() + " " + (0 - u.top).toString() + ")"), x.push("scale(-1 1)"), u.top = u.left = 0) : X && (x.push("translate(" + (0 - u.left).toString() + " " + (u.height + u.top).toString() + ")"), x.push("scale(1 -1)"), u.top = u.left = 0);
    let Z;
    switch (se < 0 && (se -= Math.floor(se / 4) * 4), se = se % 4, se) {
      case 1:
        Z = u.height / 2 + u.top, x.unshift("rotate(90 " + Z.toString() + " " + Z.toString() + ")");
        break;
      case 2:
        x.unshift("rotate(180 " + (u.width / 2 + u.left).toString() + " " + (u.height / 2 + u.top).toString() + ")");
        break;
      case 3:
        Z = u.width / 2 + u.left, x.unshift("rotate(-90 " + Z.toString() + " " + Z.toString() + ")");
        break;
    }
    se % 2 === 1 && (u.left !== u.top && (Z = u.left, u.left = u.top, u.top = Z), u.width !== u.height && (Z = u.width, u.width = u.height, u.height = Z)), x.length && (g = MT(g, '<g transform="' + x.join(" ") + '">', "</g>"));
  });
  const f = l.width, p = l.height, L = u.width, w = u.height;
  let D, b;
  f === null ? (b = p === null ? "1em" : p === "auto" ? w : p, D = t1(b, L / w)) : (D = f === "auto" ? L : f, b = p === null ? t1(D, w / L) : p === "auto" ? w : p);
  const H = {}, N = (O, x) => {
    LT(x) || (H[O] = x.toString());
  };
  N("width", D), N("height", b);
  const q = [u.left, u.top, L, w];
  return H.viewBox = q.join(" "), { attributes: H, viewBox: q, body: g };
}
const TT = /\sid="(\S+)"/g, DT = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
let YT = 0;
function CT(s, i = DT) {
  const r = [];
  let l;
  for (; l = TT.exec(s); ) r.push(l[1]);
  if (!r.length) return s;
  const u = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
  return r.forEach((g) => {
    const f = typeof i == "function" ? i(g) : i + (YT++).toString(), p = g.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    s = s.replace(new RegExp('([#;"])(' + p + ')([")]|\\.[a-z])', "g"), "$1" + f + u + "$3");
  }), s = s.replace(new RegExp(u, "g"), ""), s;
}
const Rf = /* @__PURE__ */ Object.create(null);
function bT(s, i) {
  Rf[s] = i;
}
function Of(s) {
  return Rf[s] || Rf[""];
}
function Uf(s) {
  let i;
  if (typeof s.resources == "string") i = [s.resources];
  else if (i = s.resources, !(i instanceof Array) || !i.length) return null;
  return { resources: i, path: s.path || "/", maxURL: s.maxURL || 500, rotate: s.rotate || 750, timeout: s.timeout || 5e3, random: s.random === true, index: s.index || 0, dataAfterTimeout: s.dataAfterTimeout !== false };
}
const zf = /* @__PURE__ */ Object.create(null), No = ["https://api.simplesvg.com", "https://api.unisvg.com"], _m = [];
for (; No.length > 0; ) No.length === 1 || Math.random() > 0.5 ? _m.push(No.shift()) : _m.push(No.pop());
zf[""] = Uf({ resources: ["https://api.iconify.design"].concat(_m) });
function ST(s, i) {
  const r = Uf(i);
  return r === null ? false : (zf[s] = r, true);
}
function Bf(s) {
  return zf[s];
}
const FT = () => {
  let s;
  try {
    if (s = fetch, typeof s == "function") return s;
  } catch {
  }
};
let s1 = FT();
function xT(s, i) {
  const r = Bf(s);
  if (!r) return 0;
  let l;
  if (!r.maxURL) l = 0;
  else {
    let u = 0;
    r.resources.forEach((f) => {
      u = Math.max(u, f.length);
    });
    const g = i + ".json?icons=";
    l = r.maxURL - u - r.path.length - g.length;
  }
  return l;
}
function NT(s) {
  return s === 404;
}
const AT = (s, i, r) => {
  const l = [], u = xT(s, i), g = "icons";
  let f = { type: g, provider: s, prefix: i, icons: [] }, p = 0;
  return r.forEach((L, w) => {
    p += L.length + 1, p >= u && w > 0 && (l.push(f), f = { type: g, provider: s, prefix: i, icons: [] }, p = L.length), f.icons.push(L);
  }), l.push(f), l;
};
function ET(s) {
  if (typeof s == "string") {
    const i = Bf(s);
    if (i) return i.path;
  }
  return "/";
}
const HT = (s, i, r) => {
  if (!s1) {
    r("abort", 424);
    return;
  }
  let l = ET(i.provider);
  switch (i.type) {
    case "icons": {
      const g = i.prefix, p = i.icons.join(","), L = new URLSearchParams({ icons: p });
      l += g + ".json?" + L.toString();
      break;
    }
    case "custom": {
      const g = i.uri;
      l += g.slice(0, 1) === "/" ? g.slice(1) : g;
      break;
    }
    default:
      r("abort", 400);
      return;
  }
  let u = 503;
  s1(s + l).then((g) => {
    const f = g.status;
    if (f !== 200) {
      setTimeout(() => {
        r(NT(f) ? "abort" : "next", f);
      });
      return;
    }
    return u = 501, g.json();
  }).then((g) => {
    if (typeof g != "object" || g === null) {
      setTimeout(() => {
        g === 404 ? r("abort", g) : r("next", u);
      });
      return;
    }
    setTimeout(() => {
      r("success", g);
    });
  }).catch(() => {
    r("next", u);
  });
}, PT = { prepare: AT, send: HT };
function jT(s) {
  const i = { loaded: [], missing: [], pending: [] }, r = /* @__PURE__ */ Object.create(null);
  s.sort((u, g) => u.provider !== g.provider ? u.provider.localeCompare(g.provider) : u.prefix !== g.prefix ? u.prefix.localeCompare(g.prefix) : u.name.localeCompare(g.name));
  let l = { provider: "", prefix: "", name: "" };
  return s.forEach((u) => {
    if (l.name === u.name && l.prefix === u.prefix && l.provider === u.provider) return;
    l = u;
    const g = u.provider, f = u.prefix, p = u.name, L = r[g] || (r[g] = /* @__PURE__ */ Object.create(null)), w = L[f] || (L[f] = li(g, f));
    let D;
    p in w.icons ? D = i.loaded : f === "" || w.missing.has(p) ? D = i.missing : D = i.pending;
    const b = { provider: g, prefix: f, name: p };
    D.push(b);
  }), i;
}
function n1(s, i) {
  s.forEach((r) => {
    const l = r.loaderCallbacks;
    l && (r.loaderCallbacks = l.filter((u) => u.id !== i));
  });
}
function qT(s) {
  s.pendingCallbacksFlag || (s.pendingCallbacksFlag = true, setTimeout(() => {
    s.pendingCallbacksFlag = false;
    const i = s.loaderCallbacks ? s.loaderCallbacks.slice(0) : [];
    if (!i.length) return;
    let r = false;
    const l = s.provider, u = s.prefix;
    i.forEach((g) => {
      const f = g.icons, p = f.pending.length;
      f.pending = f.pending.filter((L) => {
        if (L.prefix !== u) return true;
        const w = L.name;
        if (s.icons[w]) f.loaded.push({ provider: l, prefix: u, name: w });
        else if (s.missing.has(w)) f.missing.push({ provider: l, prefix: u, name: w });
        else return r = true, true;
        return false;
      }), f.pending.length !== p && (r || n1([s], g.id), g.callback(f.loaded.slice(0), f.missing.slice(0), f.pending.slice(0), g.abort));
    });
  }));
}
let IT = 0;
function RT(s, i, r) {
  const l = IT++, u = n1.bind(null, r, l);
  if (!i.pending.length) return u;
  const g = { id: l, icons: i, callback: s, abort: u };
  return r.forEach((f) => {
    (f.loaderCallbacks || (f.loaderCallbacks = [])).push(g);
  }), u;
}
function OT(s, i = true, r = false) {
  const l = [];
  return s.forEach((u) => {
    const g = typeof u == "string" ? cm(u, i, r) : u;
    g && l.push(g);
  }), l;
}
var UT = { resources: [], index: 0, timeout: 2e3, rotate: 750, random: false, dataAfterTimeout: false };
function zT(s, i, r, l) {
  const u = s.resources.length, g = s.random ? Math.floor(Math.random() * u) : s.index;
  let f;
  if (s.random) {
    let B = s.resources.slice(0);
    for (f = []; B.length > 1; ) {
      const V = Math.floor(Math.random() * B.length);
      f.push(B[V]), B = B.slice(0, V).concat(B.slice(V + 1));
    }
    f = f.concat(B);
  } else f = s.resources.slice(g).concat(s.resources.slice(0, g));
  const p = Date.now();
  let L = "pending", w = 0, D, b = null, H = [], N = [];
  typeof l == "function" && N.push(l);
  function q() {
    b && (clearTimeout(b), b = null);
  }
  function O() {
    L === "pending" && (L = "aborted"), q(), H.forEach((B) => {
      B.status === "pending" && (B.status = "aborted");
    }), H = [];
  }
  function x(B, V) {
    V && (N = []), typeof B == "function" && N.push(B);
  }
  function Q() {
    return { startTime: p, payload: i, status: L, queriesSent: w, queriesPending: H.length, subscribe: x, abort: O };
  }
  function X() {
    L = "failed", N.forEach((B) => {
      B(void 0, D);
    });
  }
  function se() {
    H.forEach((B) => {
      B.status === "pending" && (B.status = "aborted");
    }), H = [];
  }
  function Z(B, V, he) {
    const je = V !== "success";
    switch (H = H.filter((ke) => ke !== B), L) {
      case "pending":
        break;
      case "failed":
        if (je || !s.dataAfterTimeout) return;
        break;
      default:
        return;
    }
    if (V === "abort") {
      D = he, X();
      return;
    }
    if (je) {
      D = he, H.length || (f.length ? ge() : X());
      return;
    }
    if (q(), se(), !s.random) {
      const ke = s.resources.indexOf(B.resource);
      ke !== -1 && ke !== s.index && (s.index = ke);
    }
    L = "completed", N.forEach((ke) => {
      ke(he);
    });
  }
  function ge() {
    if (L !== "pending") return;
    q();
    const B = f.shift();
    if (B === void 0) {
      if (H.length) {
        b = setTimeout(() => {
          q(), L === "pending" && (se(), X());
        }, s.timeout);
        return;
      }
      X();
      return;
    }
    const V = { status: "pending", resource: B, callback: (he, je) => {
      Z(V, he, je);
    } };
    H.push(V), w++, b = setTimeout(ge, s.rotate), r(B, i, V.callback);
  }
  return setTimeout(ge), Q;
}
function a1(s) {
  const i = { ...UT, ...s };
  let r = [];
  function l() {
    r = r.filter((p) => p().status === "pending");
  }
  function u(p, L, w) {
    const D = zT(i, p, L, (b, H) => {
      l(), w && w(b, H);
    });
    return r.push(D), D;
  }
  function g(p) {
    return r.find((L) => p(L)) || null;
  }
  return { query: u, find: g, setIndex: (p) => {
    i.index = p;
  }, getIndex: () => i.index, cleanup: l };
}
function r1() {
}
const Wf = /* @__PURE__ */ Object.create(null);
function BT(s) {
  if (!Wf[s]) {
    const i = Bf(s);
    if (!i) return;
    const r = a1(i), l = { config: i, redundancy: r };
    Wf[s] = l;
  }
  return Wf[s];
}
function WT(s, i, r) {
  let l, u;
  if (typeof s == "string") {
    const g = Of(s);
    if (!g) return r(void 0, 424), r1;
    u = g.send;
    const f = BT(s);
    f && (l = f.redundancy);
  } else {
    const g = Uf(s);
    if (g) {
      l = a1(g);
      const f = s.resources ? s.resources[0] : "", p = Of(f);
      p && (u = p.send);
    }
  }
  return !l || !u ? (r(void 0, 424), r1) : l.query(i, u, r)().abort;
}
function i1() {
}
function $T(s) {
  s.iconsLoaderFlag || (s.iconsLoaderFlag = true, setTimeout(() => {
    s.iconsLoaderFlag = false, qT(s);
  }));
}
function GT(s) {
  const i = [], r = [];
  return s.forEach((l) => {
    (l.match(W0) ? i : r).push(l);
  }), { valid: i, invalid: r };
}
function Ao(s, i, r) {
  function l() {
    const u = s.pendingIcons;
    i.forEach((g) => {
      u && u.delete(g), s.icons[g] || s.missing.add(g);
    });
  }
  if (r && typeof r == "object") try {
    if (!Z0(s, r).length) {
      l();
      return;
    }
  } catch (u) {
    console.error(u);
  }
  l(), $T(s);
}
function o1(s, i) {
  s instanceof Promise ? s.then((r) => {
    i(r);
  }).catch(() => {
    i(null);
  }) : i(s);
}
function VT(s, i) {
  s.iconsToLoad ? s.iconsToLoad = s.iconsToLoad.concat(i).sort() : s.iconsToLoad = i, s.iconsQueueFlag || (s.iconsQueueFlag = true, setTimeout(() => {
    s.iconsQueueFlag = false;
    const { provider: r, prefix: l } = s, u = s.iconsToLoad;
    if (delete s.iconsToLoad, !u || !u.length) return;
    const g = s.loadIcon;
    if (s.loadIcons && (u.length > 1 || !g)) {
      o1(s.loadIcons(u, l, r), (D) => {
        Ao(s, u, D);
      });
      return;
    }
    if (g) {
      u.forEach((D) => {
        const b = g(D, l, r);
        o1(b, (H) => {
          const N = H ? { prefix: l, icons: { [D]: H } } : null;
          Ao(s, [D], N);
        });
      });
      return;
    }
    const { valid: f, invalid: p } = GT(u);
    if (p.length && Ao(s, p, null), !f.length) return;
    const L = l.match(W0) ? Of(r) : null;
    if (!L) {
      Ao(s, f, null);
      return;
    }
    L.prepare(r, l, f).forEach((D) => {
      WT(r, D, (b) => {
        Ao(s, D.icons, b);
      });
    });
  }));
}
const JT = (s, i) => {
  const r = OT(s, true, Q0()), l = jT(r);
  if (!l.pending.length) {
    let L = true;
    return i && setTimeout(() => {
      L && i(l.loaded, l.missing, l.pending, i1);
    }), () => {
      L = false;
    };
  }
  const u = /* @__PURE__ */ Object.create(null), g = [];
  let f, p;
  return l.pending.forEach((L) => {
    const { provider: w, prefix: D } = L;
    if (D === p && w === f) return;
    f = w, p = D, g.push(li(w, D));
    const b = u[w] || (u[w] = /* @__PURE__ */ Object.create(null));
    b[D] || (b[D] = []);
  }), l.pending.forEach((L) => {
    const { provider: w, prefix: D, name: b } = L, H = li(w, D), N = H.pendingIcons || (H.pendingIcons = /* @__PURE__ */ new Set());
    N.has(b) || (N.add(b), u[w][D].push(b));
  }), g.forEach((L) => {
    const w = u[L.provider][L.prefix];
    w.length && VT(L, w);
  }), i ? RT(i, l, g) : i1;
};
function KT(s, i) {
  const r = { ...s };
  for (const l in i) {
    const u = i[l], g = typeof u;
    l in X0 ? (u === null || u && (g === "string" || g === "number")) && (r[l] = u) : g === typeof r[l] && (r[l] = l === "rotate" ? u % 4 : u);
  }
  return r;
}
const ZT = /[\s,]+/;
function QT(s, i) {
  i.split(ZT).forEach((r) => {
    switch (r.trim()) {
      case "horizontal":
        s.hFlip = true;
        break;
      case "vertical":
        s.vFlip = true;
        break;
    }
  });
}
function XT(s, i = 0) {
  const r = s.replace(/^-?[0-9.]*/, "");
  function l(u) {
    for (; u < 0; ) u += 4;
    return u % 4;
  }
  if (r === "") {
    const u = parseInt(s);
    return isNaN(u) ? 0 : l(u);
  } else if (r !== s) {
    let u = 0;
    switch (r) {
      case "%":
        u = 25;
        break;
      case "deg":
        u = 90;
    }
    if (u) {
      let g = parseFloat(s.slice(0, s.length - r.length));
      return isNaN(g) ? 0 : (g = g / u, g % 1 === 0 ? l(g) : 0);
    }
  }
  return i;
}
function eD(s, i) {
  let r = s.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const l in i) r += " " + l + '="' + i[l] + '"';
  return '<svg xmlns="http://www.w3.org/2000/svg"' + r + ">" + s + "</svg>";
}
function tD(s) {
  return s.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function sD(s) {
  return "data:image/svg+xml," + tD(s);
}
function nD(s) {
  return 'url("' + sD(s) + '")';
}
const l1 = { ...e1, inline: false }, aD = { xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", "aria-hidden": true, role: "img" }, rD = { display: "inline-block" }, $f = { backgroundColor: "currentColor" }, d1 = { backgroundColor: "transparent" }, m1 = { Image: "var(--svg)", Repeat: "no-repeat", Size: "100% 100%" }, u1 = { webkitMask: $f, mask: $f, background: d1 };
for (const s in u1) {
  const i = u1[s];
  for (const r in m1) i[s + r] = m1[r];
}
const pm = {};
["horizontal", "vertical"].forEach((s) => {
  const i = s.slice(0, 1) + "Flip";
  pm[s + "-flip"] = i, pm[s.slice(0, 1) + "-flip"] = i, pm[s + "Flip"] = i;
});
function c1(s) {
  return s + (s.match(/^[-0-9.]+$/) ? "px" : "");
}
const g1 = (s, i) => {
  const r = KT(l1, i), l = { ...aD }, u = i.mode || "svg", g = {}, f = i.style, p = typeof f == "object" && !(f instanceof Array) ? f : {};
  for (let O in i) {
    const x = i[O];
    if (x !== void 0) switch (O) {
      case "icon":
      case "style":
      case "onLoad":
      case "mode":
      case "ssr":
        break;
      case "inline":
      case "hFlip":
      case "vFlip":
        r[O] = x === true || x === "true" || x === 1;
        break;
      case "flip":
        typeof x == "string" && QT(r, x);
        break;
      case "color":
        g.color = x;
        break;
      case "rotate":
        typeof x == "string" ? r[O] = XT(x) : typeof x == "number" && (r[O] = x);
        break;
      case "ariaHidden":
      case "aria-hidden":
        x !== true && x !== "true" && delete l["aria-hidden"];
        break;
      default: {
        const Q = pm[O];
        Q ? (x === true || x === "true" || x === 1) && (r[Q] = true) : l1[O] === void 0 && (l[O] = x);
      }
    }
  }
  const L = kT(s, r), w = L.attributes;
  if (r.inline && (g.verticalAlign = "-0.125em"), u === "svg") {
    l.style = { ...g, ...p }, Object.assign(l, w);
    let O = 0, x = i.id;
    return typeof x == "string" && (x = x.replace(/-/g, "_")), l.innerHTML = CT(L.body, x ? () => x + "ID" + O++ : "iconifyVue"), tg("svg", l);
  }
  const { body: D, width: b, height: H } = s, N = u === "mask" || (u === "bg" ? false : D.indexOf("currentColor") !== -1), q = eD(D, { ...w, width: b + "", height: H + "" });
  return l.style = { ...g, "--svg": nD(q), width: c1(w.width), height: c1(w.height), ...rD, ...N ? $f : d1, ...p }, tg("span", l);
};
if (Q0(true), bT("", PT), typeof document < "u" && typeof window < "u") {
  const s = window;
  if (s.IconifyPreload !== void 0) {
    const i = s.IconifyPreload, r = "Invalid IconifyPreload syntax.";
    typeof i == "object" && i !== null && (i instanceof Array ? i : [i]).forEach((l) => {
      try {
        (typeof l != "object" || l === null || l instanceof Array || typeof l.icons != "object" || typeof l.prefix != "string" || !_T(l)) && console.error(r);
      } catch {
        console.error(r);
      }
    });
  }
  if (s.IconifyProviders !== void 0) {
    const i = s.IconifyProviders;
    if (typeof i == "object" && i !== null) for (let r in i) {
      const l = "IconifyProviders[" + r + "] is invalid.";
      try {
        const u = i[r];
        if (typeof u != "object" || !u || u.resources === void 0) continue;
        ST(r, u) || console.error(l);
      } catch {
        console.error(l);
      }
    }
  }
}
const iD = { ...fm, body: "" }, oD = Zc((s, { emit: i }) => {
  const r = tr(null);
  function l() {
    r.value && (r.value.abort?.(), r.value = null);
  }
  const u = tr(!!s.ssr), g = tr(""), f = sM(null);
  function p() {
    const w = s.icon;
    if (typeof w == "object" && w !== null && typeof w.body == "string") return g.value = "", { data: w };
    let D;
    if (typeof w != "string" || (D = cm(w, false, true)) === null) return null;
    let b = hT(D);
    if (!b) {
      const q = r.value;
      return (!q || q.name !== w) && (b === null ? r.value = { name: w } : r.value = { name: w, abort: JT([D], L) }), null;
    }
    l(), g.value !== w && (g.value = w, iM(() => {
      i("load", w);
    }));
    const H = s.customise;
    if (H) {
      b = Object.assign({}, b);
      const q = H(b.body, D.name, D.prefix, D.provider);
      typeof q == "string" && (b.body = q);
    }
    const N = ["iconify"];
    return D.prefix !== "" && N.push("iconify--" + D.prefix), D.provider !== "" && N.push("iconify--" + D.provider), { data: b, classes: N };
  }
  function L() {
    const w = p();
    w ? w.data !== f.value?.data && (f.value = w) : f.value = null;
  }
  return u.value ? L() : nM(() => {
    u.value = true, L();
  }), aM(() => s.icon, L), rM(l), () => {
    const w = f.value;
    if (!w) return g1(iD, s);
    let D = s;
    return w.classes && (D = { ...s, class: w.classes.join(" ") }), g1({ ...fm, ...w.data }, D);
  };
}, { props: ["icon", "mode", "ssr", "width", "height", "style", "color", "inline", "rotate", "hFlip", "horizontalFlip", "vFlip", "verticalFlip", "flip", "id", "ariaHidden", "customise", "title"], emits: ["load"] }), lD = { width: 24, height: 24, body: '<path fill="currentColor" d="M12 6a6 6 0 0 1 6 6c0 2.22-1.21 4.16-3 5.2V19a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-1.8c-1.79-1.04-3-2.98-3-5.2a6 6 0 0 1 6-6m2 15v1a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-1h4m6-10h3v2h-3v-2M1 11h3v2H1v-2M13 1v3h-2V1h2M4.92 3.5l2.13 2.14l-1.42 1.41L3.5 4.93L4.92 3.5m12.03 2.13l2.12-2.13l1.43 1.43l-2.13 2.12l-1.42-1.42Z"/>' }, dD = { width: 24, height: 24, body: '<path fill="currentColor" d="M17 12V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v14l4-4h10a1 1 0 0 0 1-1m4-6h-2v9H6v2a1 1 0 0 0 1 1h11l4 4V7a1 1 0 0 0-1-1Z"/>' }, mD = { width: 24, height: 24, body: '<path fill="currentColor" d="M20 17q.86 0 1.45.6t.58 1.4L14 22l-7-2v-9h1.95l7.27 2.69q.78.31.78 1.12q0 .47-.34.82t-.86.37H13l-1.75-.67l-.33.94L13 17h7M16 3.23Q17.06 2 18.7 2q1.36 0 2.3 1t1 2.3q0 1.03-1 2.46t-1.97 2.39T16 13q-2.08-1.89-3.06-2.85t-1.97-2.39T10 5.3q0-1.36.97-2.3t2.34-1q1.6 0 2.69 1.23M.984 11H5v11H.984V11Z"/>' }, uD = { width: 24, height: 24, body: '<path fill="currentColor" d="M3 3h6v4H3V3m12 7h6v4h-6v-4m0 7h6v4h-6v-4m-2-4H7v5h6v2H5V9h2v2h6v2Z"/>' }, cD = { width: 24, height: 24, body: '<path fill="currentColor" d="M13 13h-2V7h2m0 10h-2v-2h2M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2Z"/>' }, gD = { width: 24, height: 24, body: '<path fill="currentColor" d="M11.5 1L2 6v2h19V6m-5 4v7h3v-7M2 22h19v-3H2m8-9v7h3v-7m-9 0v7h3v-7H4Z"/>' }, hD = { width: 24, height: 24, body: '<path fill="currentColor" d="M21 10.12h-6.78l2.74-2.82c-2.73-2.7-7.15-2.8-9.88-.1a6.887 6.887 0 0 0 0 9.8c2.73 2.7 7.15 2.7 9.88 0c1.36-1.35 2.04-2.92 2.04-4.9h2c0 1.98-.88 4.55-2.64 6.29c-3.51 3.48-9.21 3.48-12.72 0c-3.5-3.47-3.53-9.11-.02-12.58a8.987 8.987 0 0 1 12.65 0L21 3v7.12M12.5 8v4.25l3.5 2.08l-.72 1.21L11 13V8h1.5Z"/>' }, h1 = { width: 24, height: 24, body: '<path fill="currentColor" d="M19 19H5V8h14m-3-7v2H8V1H6v2H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-1V1m-1 11h-5v5h5v-5Z"/>' }, f1 = { width: 24, height: 24, body: '<path fill="currentColor" d="M20.8 22.7L15 16.9V20H9v-6H5l3.6-3.6L1.1 3l1.3-1.3l19.7 19.7l-1.3 1.3M19 6V4H7.2l2 2H19m-1.8 8H19l-7-7l-.9.9l6.1 6.1Z"/>' }, Eo = { width: 24, height: 24, body: '<path fill="currentColor" d="M3 3h18v4H3V3m1 5h16v13H4V8m5.5 3a.5.5 0 0 0-.5.5V13h6v-1.5a.5.5 0 0 0-.5-.5h-5Z"/>' }, di = { width: 24, height: 24, body: '<path fill="currentColor" d="M12 17a2 2 0 0 0 2-2a2 2 0 0 0-2-2a2 2 0 0 0-2 2a2 2 0 0 0 2 2m6-9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h1V6a5 5 0 0 1 5-5a5 5 0 0 1 5 5v2h1m-6-5a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3Z"/>' }, Gf = { width: 24, height: 24, body: '<path fill="currentColor" d="M12 20a8 8 0 0 0 8-8a8 8 0 0 0-8-8a8 8 0 0 0-8 8a8 8 0 0 0 8 8m0-18a10 10 0 0 1 10 10a10 10 0 0 1-10 10C6.47 22 2 17.5 2 12A10 10 0 0 1 12 2m.5 5v5.25l4.5 2.67l-.75 1.23L11 13V7h1.5Z"/>' }, ym = { width: 24, height: 24, body: '<path fill="currentColor" d="M22 14v8h-2v-4l-4 4v-3h-5v-2h5v-3l4 4v-4h2M5 19h4v2H5c-1.1 0-2-.9-2-2V5a2 2 0 0 1 2-2h1V.998h2V3h8V.998h2V3h1c1.11 0 2 .89 2 2v7h-2V8H5v11Z"/>' }, fD = { width: 24, height: 24, body: '<path fill="currentColor" d="M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12S6.5 2 12 2m0 2c-1.9 0-3.6.6-4.9 1.7l11.2 11.2c1-1.4 1.7-3.1 1.7-4.9c0-4.4-3.6-8-8-8m4.9 14.3L5.7 7.1C4.6 8.4 4 10.1 4 12c0 4.4 3.6 8 8 8c1.9 0 3.6-.6 4.9-1.7Z"/>' }, _D = { width: 24, height: 24, body: '<path fill="currentColor" d="M21 7L9 19l-5.5-5.5l1.41-1.41L9 16.17L19.59 5.59L21 7Z"/>' }, pD = { width: 24, height: 24, body: '<path fill="currentColor" d="M12 9a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-4.5c5 0 9.27 3.11 11 7.5c-1.73 4.39-6 7.5-11 7.5S2.73 16.39 1 12c1.73-4.39 6-7.5 11-7.5M3.18 12a9.821 9.821 0 0 0 17.64 0a9.821 9.821 0 0 0-17.64 0Z"/>' }, yD = { width: 24, height: 24, body: '<path fill="currentColor" d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5l-1.5 1.5l-5-5v-.79l-.27-.27A6.516 6.516 0 0 1 9.5 16A6.5 6.5 0 0 1 3 9.5A6.5 6.5 0 0 1 9.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14S14 12 14 9.5S12 5 9.5 5Z"/>' }, vD = { width: 24, height: 24, body: '<path fill="currentColor" d="M11 15h2v2h-2v-2m0-8h2v6h-2V7m1-5C6.47 2 2 6.5 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m0 18a8 8 0 0 1-8-8a8 8 0 0 1 8-8a8 8 0 0 1 8 8a8 8 0 0 1-8 8Z"/>' }, wD = { width: 24, height: 24, body: '<path fill="currentColor" d="M15 4v7H5.17L4 12.17V4h11m1-2H3a1 1 0 0 0-1 1v14l4-4h10a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1m5 4h-2v9H6v2a1 1 0 0 0 1 1h11l4 4V7a1 1 0 0 0-1-1Z"/>' }, _1 = { width: 24, height: 24, body: '<path fill="currentColor" d="M21 13c.6 0 1.1.2 1.4.6c.4.4.6.9.6 1.4l-8 3l-7-2V7h1.9l7.3 2.7c.5.2.8.6.8 1.1c0 .3-.1.6-.3.8c-.2.2-.5.4-.9.4H14l-1.7-.7l-.3.9l2 .8h7M2 7h4v11H2V7Z"/>' }, MD = { width: 24, height: 24, body: '<path fill="currentColor" d="M12 8a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 2a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2m-2 12c-.25 0-.46-.18-.5-.42l-.37-2.65c-.63-.25-1.17-.59-1.69-.99l-2.49 1.01c-.22.08-.49 0-.61-.22l-2-3.46a.493.493 0 0 1 .12-.64l2.11-1.66L4.5 12l.07-1l-2.11-1.63a.493.493 0 0 1-.12-.64l2-3.46c.12-.22.39-.31.61-.22l2.49 1c.52-.39 1.06-.73 1.69-.98l.37-2.65c.04-.24.25-.42.5-.42h4c.25 0 .46.18.5.42l.37 2.65c.63.25 1.17.59 1.69.98l2.49-1c.22-.09.49 0 .61.22l2 3.46c.13.22.07.49-.12.64L19.43 11l.07 1l-.07 1l2.11 1.63c.19.15.25.42.12.64l-2 3.46c-.12.22-.39.31-.61.22l-2.49-1c-.52.39-1.06.73-1.69.98l-.37 2.65c-.04.24-.25.42-.5.42h-4m1.25-18l-.37 2.61c-1.2.25-2.26.89-3.03 1.78L5.44 7.35l-.75 1.3L6.8 10.2a5.55 5.55 0 0 0 0 3.6l-2.12 1.56l.75 1.3l2.43-1.04c.77.88 1.82 1.52 3.01 1.76l.37 2.62h1.52l.37-2.61c1.19-.25 2.24-.89 3.01-1.77l2.43 1.04l.75-1.3l-2.12-1.55c.4-1.17.4-2.44 0-3.61l2.11-1.55l-.75-1.3l-2.41 1.04a5.42 5.42 0 0 0-3.03-1.77L12.75 4h-1.5Z"/>' }, LD = { width: 24, height: 24, body: '<path fill="currentColor" d="M8.5 8.64L13.77 12L8.5 15.36V8.64M6.5 5v14l11-7"/>' }, Vf = { width: 24, height: 24, body: '<path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2Z"/>' }, p1 = { width: 24, height: 24, body: '<path fill="currentColor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2L9.19 8.62L2 9.24l5.45 4.73L5.82 21L12 17.27Z"/>' }, y1 = { width: 24, height: 24, body: '<path fill="currentColor" d="M18 8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h9V6a3 3 0 0 0-3-3a3 3 0 0 0-3 3H7a5 5 0 0 1 5-5a5 5 0 0 1 5 5v2h1m-6 9a2 2 0 0 0 2-2a2 2 0 0 0-2-2a2 2 0 0 0-2 2a2 2 0 0 0 2 2Z"/>' }, kD = { width: 24, height: 24, body: '<path fill="currentColor" d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75L3 17.25Z"/>' }, TD = { width: 24, height: 24, body: '<path fill="currentColor" d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35Z"/>' }, v1 = { width: 24, height: 24, body: '<path fill="currentColor" d="M23 10a2 2 0 0 0-2-2h-6.32l.96-4.57c.02-.1.03-.21.03-.32c0-.41-.17-.79-.44-1.06L14.17 1L7.59 7.58C7.22 7.95 7 8.45 7 9v10a2 2 0 0 0 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2M1 21h4V9H1v12Z"/>' }, DD = { width: 24, height: 24, body: '<path fill="currentColor" d="M19 15h4V3h-4m-4 0H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2a2 2 0 0 0 2 2h6.31l-.95 4.57c-.02.1-.03.2-.03.31c0 .42.17.79.44 1.06L9.83 23l6.58-6.59c.37-.36.59-.86.59-1.41V5a2 2 0 0 0-2-2Z"/>' }, YD = { width: 24, height: 24, body: '<path fill="currentColor" d="M16 17v2H2v-2s0-4 7-4s7 4 7 4m-3.5-9.5A3.5 3.5 0 1 0 9 11a3.5 3.5 0 0 0 3.5-3.5m3.44 5.5A5.32 5.32 0 0 1 18 17v2h4v-2s0-3.63-6.06-4M15 4a3.39 3.39 0 0 0-1.93.59a5 5 0 0 1 0 5.82A3.39 3.39 0 0 0 15 11a3.5 3.5 0 0 0 0-7Z"/>' }, CD = { width: 24, height: 24, body: '<path fill="currentColor" d="M10.59 13.41c.41.39.41 1.03 0 1.42c-.39.39-1.03.39-1.42 0a5.003 5.003 0 0 1 0-7.07l3.54-3.54a5.003 5.003 0 0 1 7.07 0a5.003 5.003 0 0 1 0 7.07l-1.49 1.49c.01-.82-.12-1.64-.4-2.42l.47-.48a2.982 2.982 0 0 0 0-4.24a2.982 2.982 0 0 0-4.24 0l-3.53 3.53a2.982 2.982 0 0 0 0 4.24m2.82-4.24c.39-.39 1.03-.39 1.42 0a5.003 5.003 0 0 1 0 7.07l-3.54 3.54a5.003 5.003 0 0 1-7.07 0a5.003 5.003 0 0 1 0-7.07l1.49-1.49c-.01.82.12 1.64.4 2.43l-.47.47a2.982 2.982 0 0 0 0 4.24a2.982 2.982 0 0 0 4.24 0l3.53-3.53a2.982 2.982 0 0 0 0-4.24a.973.973 0 0 1 0-1.42Z"/>' }, bD = { width: 24, height: 24, body: '<path fill="currentColor" d="M2 3h20c1.05 0 2 .95 2 2v14c0 1.05-.95 2-2 2H2c-1.05 0-2-.95-2-2V5c0-1.05.95-2 2-2m12 3v1h8V6h-8m0 2v1h8V8h-8m0 2v1h7v-1h-7m-6 3.91C6 13.91 2 15 2 17v1h12v-1c0-2-4-3.09-6-3.09M8 6a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3Z"/>' }, SD = { width: 24, height: 24, body: '<path fill="currentColor" d="m20 8l-8 5l-8-5V6l8 5l8-5m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z"/>' }, w1 = { width: 24, height: 24, body: '<path fill="currentColor" d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7c0-.24-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81a3 3 0 0 0 3-3a3 3 0 0 0-3-3a3 3 0 0 0-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.15c-.05.21-.08.43-.08.66c0 1.61 1.31 2.91 2.92 2.91c1.61 0 2.92-1.3 2.92-2.91A2.92 2.92 0 0 0 18 16.08Z"/>' }, FD = { width: 24, height: 24, body: '<path fill="currentColor" d="M12 5a3.5 3.5 0 0 0-3.5 3.5A3.5 3.5 0 0 0 12 12a3.5 3.5 0 0 0 3.5-3.5A3.5 3.5 0 0 0 12 5m0 2a1.5 1.5 0 0 1 1.5 1.5A1.5 1.5 0 0 1 12 10a1.5 1.5 0 0 1-1.5-1.5A1.5 1.5 0 0 1 12 7M5.5 8A2.5 2.5 0 0 0 3 10.5c0 .94.53 1.75 1.29 2.18c.36.2.77.32 1.21.32c.44 0 .85-.12 1.21-.32c.37-.21.68-.51.91-.87A5.42 5.42 0 0 1 6.5 8.5v-.28c-.3-.14-.64-.22-1-.22m13 0c-.36 0-.7.08-1 .22v.28c0 1.2-.39 2.36-1.12 3.31c.12.19.25.34.4.49a2.482 2.482 0 0 0 1.72.7c.44 0 .85-.12 1.21-.32c.76-.43 1.29-1.24 1.29-2.18A2.5 2.5 0 0 0 18.5 8M12 14c-2.34 0-7 1.17-7 3.5V19h14v-1.5c0-2.33-4.66-3.5-7-3.5m-7.29.55C2.78 14.78 0 15.76 0 17.5V19h3v-1.93c0-1.01.69-1.85 1.71-2.52m14.58 0c1.02.67 1.71 1.51 1.71 2.52V19h3v-1.5c0-1.74-2.78-2.72-4.71-2.95M12 16c1.53 0 3.24.5 4.23 1H7.77c.99-.5 2.7-1 4.23-1Z"/>' }, xD = { width: 24, height: 24, body: '<path fill="currentColor" d="M18 19a2 2 0 0 1-2-2c0-1.11.89-2 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2m0-6a4 4 0 0 0-4 4a4 4 0 0 0 4 4a4 4 0 0 0 4-4a4 4 0 0 0-4-4m-6-1.9a1.9 1.9 0 0 0-1.9 1.9a1.9 1.9 0 0 0 1.9 1.9a1.9 1.9 0 0 0 1.9-1.9a1.9 1.9 0 0 0-1.9-1.9M6 19a2 2 0 0 1-2-2c0-1.11.89-2 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2m0-6a4 4 0 0 0-4 4a4 4 0 0 0 4 4a4 4 0 0 0 4-4a4 4 0 0 0-4-4m6-9a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2m0 6a4 4 0 0 0 4-4a4 4 0 0 0-4-4a4 4 0 0 0-4 4a4 4 0 0 0 4 4Z"/>' }, ND = { width: 24, height: 24, body: '<path fill="currentColor" d="M12 4a4 4 0 0 1 4 4c0 1.95-1.4 3.58-3.25 3.93L8.07 7.25A4.004 4.004 0 0 1 12 4m.28 10l6 6L20 21.72L18.73 23l-3-3H4v-2c0-1.84 2.5-3.39 5.87-3.86L2.78 7.05l1.27-1.27L12.28 14M20 18v1.18l-4.86-4.86C18 14.93 20 16.35 20 18Z"/>' }, AD = { width: 24, height: 24, body: '<path fill="currentColor" d="M17.06 13c-1.86 0-3.42 1.33-3.82 3.1c-.95-.41-1.82-.3-2.48-.01C10.35 14.31 8.79 13 6.94 13C4.77 13 3 14.79 3 17s1.77 4 3.94 4c2.06 0 3.74-1.62 3.9-3.68c.34-.24 1.23-.69 2.32.02c.18 2.05 1.84 3.66 3.9 3.66c2.17 0 3.94-1.79 3.94-4s-1.77-4-3.94-4M6.94 19.86c-1.56 0-2.81-1.28-2.81-2.86s1.26-2.86 2.81-2.86c1.56 0 2.81 1.28 2.81 2.86s-1.25 2.86-2.81 2.86m10.12 0c-1.56 0-2.81-1.28-2.81-2.86s1.25-2.86 2.81-2.86s2.82 1.28 2.82 2.86s-1.27 2.86-2.82 2.86M22 10.5H2V12h20v-1.5m-6.47-7.87c-.22-.49-.78-.75-1.31-.58L12 2.79l-2.23-.74l-.05-.01c-.53-.15-1.09.13-1.29.64L6 9h12l-2.44-6.32l-.03-.05Z"/>' }, ED = { width: 24, height: 24, body: '<path fill="currentColor" d="M8 3a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2H3v2h1a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h2v-2H8v-5a2 2 0 0 0-2-2a2 2 0 0 0 2-2V5h2V3m6 0a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1v2h-1a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2h-2v-2h2v-5a2 2 0 0 1 2-2a2 2 0 0 1-2-2V5h-2V3h2Z"/>' }, M1 = { width: 24, height: 24, body: '<path fill="currentColor" d="M9 22a1 1 0 0 1-1-1v-3H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6.1l-3.7 3.71c-.2.19-.45.29-.7.29H9Z"/>' }, HD = { width: 24, height: 24, body: '<path fill="currentColor" d="M19 17v2H7v-2s0-4 6-4s6 4 6 4m-3-9a3 3 0 1 0-3 3a3 3 0 0 0 3-3m3.2 5.06A5.6 5.6 0 0 1 21 17v2h3v-2s0-3.45-4.8-3.94M18 5a2.91 2.91 0 0 0-.89.14a5 5 0 0 1 0 5.72A2.91 2.91 0 0 0 18 11a3 3 0 0 0 0-6M7.34 8.92l1.16 1.41l-4.75 4.75l-2.75-3l1.16-1.16l1.59 1.58l3.59-3.58"/>' }, L1 = { width: 24, height: 24, body: '<path fill="currentColor" d="m21.1 12.5l1.4 1.41l-6.53 6.59L12.5 17l1.4-1.41l2.07 2.08l5.13-5.17M10 17l3 3H3v-2c0-2.21 3.58-4 8-4l1.89.11L10 17m1-13a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4Z"/>' }, Ho = { width: 24, height: 24, body: '<path fill="currentColor" d="m12 1l9 4v6c0 5.55-3.84 10.74-9 12c-5.16-1.26-9-6.45-9-12V5l9-4m4 13H8v1.5c0 .27.19.46.47.5h6.96c.31 0 .52-.16.57-.41V14m1-6l-2.67 2.67L12 8.34l-2.33 2.33L7 8l1 5h8l1-5Z"/>' }, PD = { width: 24, height: 24, body: '<path fill="currentColor" d="M7 14c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2m5.6-4c-.8-2.3-3-4-5.6-4c-3.3 0-6 2.7-6 6s2.7 6 6 6c2.6 0 4.8-1.7 5.6-4H16v4h4v-4h3v-4H12.6Z"/>' }, k1 = { width: 24, height: 24, body: '<path fill="currentColor" d="M17.9 17.39c-.26-.8-1.01-1.39-1.9-1.39h-1v-3a1 1 0 0 0-1-1H8v-2h2a1 1 0 0 0 1-1V7h2a2 2 0 0 0 2-2v-.41a7.984 7.984 0 0 1 2.9 12.8M11 19.93c-3.95-.49-7-3.85-7-7.93c0-.62.08-1.22.21-1.79L9 15v1a2 2 0 0 0 2 2m1-16A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2Z"/>' }, jD = { width: 24, height: 24, body: '<path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8h5Z"/>' }, T1 = { width: 24, height: 24, body: '<path fill="currentColor" d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/>' }, qD = { width: 24, height: 24, body: '<path fill="currentColor" d="M15 14c-2.67 0-8 1.33-8 4v2h16v-2c0-2.67-5.33-4-8-4m0-2a4 4 0 0 0 4-4a4 4 0 0 0-4-4a4 4 0 0 0-4 4a4 4 0 0 0 4 4M5 13.28l2.45 1.49l-.65-2.81L9 10.08l-2.89-.25L5 7.19L3.87 9.83L1 10.08l2.18 1.88l-.68 2.81L5 13.28Z"/>' }, ID = { width: 24, height: 24, body: '<path fill="currentColor" d="M7 5h14v2H7V5m0 8v-2h14v2H7M4 4.5A1.5 1.5 0 0 1 5.5 6A1.5 1.5 0 0 1 4 7.5A1.5 1.5 0 0 1 2.5 6A1.5 1.5 0 0 1 4 4.5m0 6A1.5 1.5 0 0 1 5.5 12A1.5 1.5 0 0 1 4 13.5A1.5 1.5 0 0 1 2.5 12A1.5 1.5 0 0 1 4 10.5M7 19v-2h14v2H7m-3-2.5A1.5 1.5 0 0 1 5.5 18A1.5 1.5 0 0 1 4 19.5A1.5 1.5 0 0 1 2.5 18A1.5 1.5 0 0 1 4 16.5Z"/>' }, RD = { width: 24, height: 24, body: '<path fill="currentColor" d="M19 13c.34 0 .67.04 1 .09V10a2 2 0 0 0-2-2h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6a2 2 0 0 0-2 2v10c0 1.11.89 2 2 2h7.81c-.51-.88-.81-1.9-.81-3c0-3.31 2.69-6 6-6M9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6m3 11a2 2 0 1 1 2-2c0 1.11-.89 2-2 2m10.5.25L17.75 22L15 19l1.16-1.16l1.59 1.59l3.59-3.59l1.16 1.41Z"/>' }, OD = { width: 24, height: 24, body: '<path fill="currentColor" d="M4 11v2h12l-5.5 5.5l1.42 1.42L19.84 12l-7.92-7.92L10.5 5.5L16 11H4Z"/>' }, D1 = { width: 24, height: 24, body: '<path fill="currentColor" d="M12 5.5A3.5 3.5 0 0 1 15.5 9a3.5 3.5 0 0 1-3.5 3.5A3.5 3.5 0 0 1 8.5 9A3.5 3.5 0 0 1 12 5.5M5 8c.56 0 1.08.15 1.53.42c-.15 1.43.27 2.85 1.13 3.96C7.16 13.34 6.16 14 5 14a3 3 0 0 1-3-3a3 3 0 0 1 3-3m14 0a3 3 0 0 1 3 3a3 3 0 0 1-3 3c-1.16 0-2.16-.66-2.66-1.62a5.536 5.536 0 0 0 1.13-3.96c.45-.27.97-.42 1.53-.42M5.5 18.25c0-2.07 2.91-3.75 6.5-3.75s6.5 1.68 6.5 3.75V20h-13v-1.75M0 20v-1.5c0-1.39 1.89-2.56 4.45-2.9c-.59.68-.95 1.62-.95 2.65V20H0m24 0h-3.5v-1.75c0-1.03-.36-1.97-.95-2.65c2.56.34 4.45 1.51 4.45 2.9V20Z"/>' }, UD = { width: 24, height: 24, body: '<path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v3c0 .6.4 1 1 1h.5c.2 0 .5-.1.7-.3l3.7-3.7H20c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m-9 11H7V8.8L8.3 6h2L8.9 9H11v4m6 0h-4V8.8L14.3 6h2l-1.4 3H17v4Z"/>' }, Jf = { width: 24, height: 24, body: '<path fill="currentColor" d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12Z"/>' }, zD = { width: 24, height: 24, body: '<path fill="currentColor" d="M20 11v2H8l5.5 5.5l-1.42 1.42L4.16 12l7.92-7.92L13.5 5.5L8 11h12Z"/>' }, BD = { width: 24, height: 24, body: '<path fill="currentColor" d="M19 13H5v-2h14v2Z"/>' }, WD = { width: 24, height: 24, body: '<path fill="currentColor" d="M16 9c6 0 6 4 6 4v2h-6v-2s0-1.69-1.15-3.2c-.17-.23-.38-.45-.6-.66C14.77 9.06 15.34 9 16 9m-8 2c3.5 0 3.94 1.56 4 2H4c.06-.44.5-2 4-2m0-2c-6 0-6 4-6 4v2h12v-2s0-4-6-4m1 8v2h6v-2l3 3l-3 3v-2H9v2l-3-3l3-3M8 3c.55 0 1 .45 1 1s-.45 1-1 1s-1-.45-1-1s.45-1 1-1m0-2C6.34 1 5 2.34 5 4s1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3m8 0c-1.66 0-3 1.34-3 3s1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3Z"/>' }, Y1 = { width: 24, height: 24, body: '<path fill="currentColor" d="M6 2c-1.11 0-2 .89-2 2v16a2 2 0 0 0 2 2h4v-1.91L12.09 18H6v-2h8.09l2-2H6v-2h12.09L20 10.09V8l-6-6H6m7 1.5L18.5 9H13V3.5m7.15 9.5a.55.55 0 0 0-.4.16l-1.02 1.02l2.09 2.08l1.02-1.01c.21-.22.21-.58 0-.79l-1.3-1.3a.544.544 0 0 0-.39-.16m-2.01 1.77L12 20.92V23h2.08l6.15-6.15l-2.09-2.08Z"/>' }, Kf = { width: 24, height: 24, body: '<path fill="currentColor" d="m21.82 15.42l-2.5 4.33c-.49.86-1.4 1.31-2.32 1.25h-2v2l-2.5-4.5L15 14v2h2.82l-2.22-3.85l4.33-2.5l1.8 3.12c.52.77.59 1.8.09 2.65M9.21 3.06h5c.98 0 1.83.57 2.24 1.39l1 1.74l1.73-1l-2.64 4.41l-5.15.09l1.73-1l-1.41-2.45l-2.21 3.85l-4.34-2.5l1.8-3.12c.41-.83 1.26-1.41 2.25-1.41m-4.16 16.7l-2.5-4.33c-.49-.85-.42-1.87.09-2.64l1-1.73l-1.73-1l5.14.08l2.65 4.42l-1.73-1L6.56 16H11v5H7.4a2.51 2.51 0 0 1-2.35-1.24Z"/>' }, $D = { width: 24, height: 24, body: '<path fill="currentColor" d="M19 3H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m0 2v14H5V5h14Z"/>' }, GD = { width: 24, height: 24, body: '<path fill="currentColor" d="M19 19H5V5h10V3H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8h-2m-11.09-.92L6.5 11.5L11 16L21 6l-1.41-1.42L11 13.17l-3.09-3.09Z"/>' }, VD = { width: 24, height: 24, body: '<path fill="currentColor" d="M12 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2Z"/>' }, JD = { width: 24, height: 24, body: '<path fill="currentColor" d="m21.7 13.35l-1 1l-2.05-2.05l1-1a.55.55 0 0 1 .77 0l1.28 1.28c.21.21.21.56 0 .77M12 18.94l6.06-6.06l2.05 2.05L14.06 21H12v-2.06M12 14c-4.42 0-8 1.79-8 4v2h6v-1.89l4-4c-.66-.08-1.33-.11-2-.11m0-10a4 4 0 0 0-4 4a4 4 0 0 0 4 4a4 4 0 0 0 4-4a4 4 0 0 0-4-4Z"/>' }, KD = { width: 24, height: 24, body: '<path fill="currentColor" d="m17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5M4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5Z"/>' }, ZD = { width: 24, height: 24, body: '<path fill="currentColor" d="M12.5 8c-2.65 0-5.05 1-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88c3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8Z"/>' }, QD = { width: 24, height: 24, body: '<path fill="currentColor" d="M19.07 13.88L13 19.94V22h2.06l6.06-6.07m1.58-2.35l-1.28-1.28a.517.517 0 0 0-.38-.17c-.15.01-.29.06-.39.17l-1 1l2.05 2l1-1c.19-.2.19-.52 0-.72M11 18H4V8l8 5l8-5v2h2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v-2m9-12l-8 5l-8-5h16Z"/>' }, XD = { width: 24, height: 24, body: '<path fill="currentColor" d="M3 5v14h17V5H3m4 2v2H5V7h2m-2 6v-2h2v2H5m0 2h2v2H5v-2m13 2H9v-2h9v2m0-4H9v-2h9v2m0-4H9V7h9v2Z"/>' }, eY = { width: 24, height: 24, body: '<path fill="currentColor" d="M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2m0 4v4h6V8H5m8 0v4h6V8h-6m-8 6v4h6v-4H5m8 0v4h6v-4h-6Z"/>' }, tY = { width: 24, height: 24, body: '<path fill="currentColor" d="M3 4h4v4H3V4m6 1v2h12V5H9m-6 5h4v4H3v-4m6 1v2h12v-2H9m-6 5h4v4H3v-4m6 1v2h12v-2H9"/>' }, sY = { width: 24, height: 24, body: '<path fill="currentColor" d="M7 13v-2h14v2H7m0 6v-2h14v2H7M7 7V5h14v2H7M3 8V5H2V4h2v4H3m-1 9v-1h3v4H2v-1h2v-.5H3v-1h1V17H2m2.25-7a.75.75 0 0 1 .75.75c0 .2-.08.39-.21.52L3.12 13H5v1H2v-.92L4 11H2v-1h2.25Z"/>' }, nY = { width: 24, height: 24, body: '<path fill="currentColor" d="M20 17h3l-4 4l-4-4h3V3h2v14M8 5c-3.86 0-7 3.13-7 7s3.13 7 7 7c3.86 0 7-3.13 7-7s-3.13-7-7-7m0 2.15c2.67 0 4.85 2.17 4.85 4.85c0 2.68-2.17 4.85-4.85 4.85c-2.68 0-4.85-2.17-4.85-4.85c0-2.68 2.17-4.85 4.85-4.85M7 9v3.69l3.19 1.84l.75-1.3l-2.44-1.41V9"/>' }, aY = { width: 24, height: 24, body: '<path fill="currentColor" d="M13.5 4A1.5 1.5 0 0 0 12 5.5A1.5 1.5 0 0 0 13.5 7A1.5 1.5 0 0 0 15 5.5A1.5 1.5 0 0 0 13.5 4m-.36 4.77c-1.19.1-4.44 2.69-4.44 2.69c-.2.15-.14.14.02.42c.16.27.14.29.33.16c.2-.13.53-.34 1.08-.68c2.12-1.36.34 1.78-.57 7.07c-.36 2.62 2 1.27 2.61.87c.6-.39 2.21-1.5 2.37-1.61c.22-.15.06-.27-.11-.52c-.12-.17-.24-.05-.24-.05c-.65.43-1.84 1.33-2 .76c-.19-.57 1.03-4.48 1.7-7.17c.11-.64.41-2.04-.75-1.94Z"/>' }, rY = { width: 24, height: 24, body: '<path fill="currentColor" d="M11 15H6l7-14v8h5l-7 14v-8Z"/>' }, iY = { width: 24, height: 24, body: '<path fill="currentColor" d="M13 9h5.5L13 3.5V9M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.11.89-2 2-2m9 16v-2H6v2h9m3-4v-2H6v2h12Z"/>' }, oY = { width: 24, height: 24, body: '<path fill="currentColor" d="M20 3h-3.2c-.4-1.2-1.5-2-2.8-2c-1.3 0-2.4.8-2.8 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-6 0c.6 0 1 .5 1 1s-.5 1-1 1s-1-.5-1-1s.4-1 1-1m2 11H9v-2h7m3-2H9V8h10M4 21h14v2H4c-1.1 0-2-.9-2-2V7h2"/>' }, lY = { width: 24, height: 24, body: '<path fill="currentColor" d="M21 17V8H7v9h14m0-14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h1V1h2v2h8V1h2v2h1M3 21h14v2H3a2 2 0 0 1-2-2V9h2v12m16-6h-4v-4h4v4Z"/>' }, dY = { width: 24, height: 24, body: '<path fill="currentColor" d="M19 19H5V8h14m-3-7v2H8V1H6v2H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-1V1"/>' }, mY = { width: 24, height: 24, body: '<path fill="currentColor" d="M14.47 15.08L11 13V7h1.5v5.25l3.08 1.83c-.41.28-.79.62-1.11 1m-1.39 4.84c-.36.05-.71.08-1.08.08c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8c0 .37-.03.72-.08 1.08c.69.1 1.33.32 1.92.64c.1-.56.16-1.13.16-1.72c0-5.5-4.5-10-10-10S2 6.5 2 12s4.47 10 10 10c.59 0 1.16-.06 1.72-.16c-.32-.59-.54-1.23-.64-1.92M18 15v3h-3v2h3v3h2v-3h3v-2h-3v-3h-2Z"/>' }, uY = { width: 24, height: 24, body: '<path fill="currentColor" d="M3 11h2v2H3v-2m8-6h2v4h-2V5m-2 6h4v4h-2v-2H9v-2m6 0h2v2h2v-2h2v2h-2v2h2v4h-2v2h-2v-2h-4v2h-2v-4h4v-2h2v-2h-2v-2m4 8v-4h-2v4h2M15 3h6v6h-6V3m2 2v2h2V5h-2M3 3h6v6H3V3m2 2v2h2V5H5M3 15h6v6H3v-6m2 2v2h2v-2H5Z"/>' }, cY = { width: 24, height: 24, body: '<path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4.18C9.6 1.84 10.7 1 12 1c1.3 0 2.4.84 2.82 2H19m-7 0a1 1 0 0 0-1 1a1 1 0 0 0 1 1a1 1 0 0 0 1-1a1 1 0 0 0-1-1M7 7V5H5v14h14V5h-2v2H7m0 6l5 5v-3h4v-4h-4V8l-5 5Z"/>' }, gY = { width: 24, height: 24, body: '<path fill="currentColor" d="M13 19c0-3.31 2.69-6 6-6c1.1 0 2.12.3 3 .81V6a2 2 0 0 0-2-2H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h9.09c-.05-.33-.09-.66-.09-1M4 8V6l8 5l8-5v2l-8 5l-8-5m16 14v-2h-4v-2h4v-2l3 3l-3 3Z"/>' }, hY = { width: 24, height: 24, body: '<path fill="currentColor" d="m18 8l-8 5l-8-5V6l8 5l8-5m0-2H2C.9 4 0 4.9 0 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m6 3h-2v6h2V7m0 8h-2v2h2v-2Z"/>' }, fY = { width: 24, height: 24, body: '<path fill="currentColor" d="M2 6v14h18v2H2c-1.105 0-2-.89-2-2V6h2m22-2c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4m-2 0l-8 5l-8-5h16m0 12H6V6l8 5l8-5v10Z"/>' }, _Y = { width: 24, height: 24, body: '<path fill="currentColor" d="M12 3C6.5 3 2 6.58 2 11a7.218 7.218 0 0 0 2.75 5.5c0 .6-.42 2.17-2.75 4.5c2.37-.11 4.64-1 6.47-2.5c1.14.33 2.34.5 3.53.5c5.5 0 10-3.58 10-8s-4.5-8-10-8m0 14c-4.42 0-8-2.69-8-6s3.58-6 8-6s8 2.69 8 6s-3.58 6-8 6Z"/>' }, pY = { width: 24, height: 24, body: '<path fill="currentColor" d="M17 7h5v10h-5v2a1 1 0 0 0 1 1h2v2h-2.5c-.55 0-1.5-.45-1.5-1c0 .55-.95 1-1.5 1H12v-2h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-2V2h2.5c.55 0 1.5.45 1.5 1c0-.55.95-1 1.5-1H20v2h-2a1 1 0 0 0-1 1v2M2 7h11v2H4v6h9v2H2V7m18 8V9h-3v6h3Z"/>' }, yY = { width: 24, height: 24, body: '<path fill="currentColor" d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z"/>' }, E = (s, i = "#000", r = 24) => ({ name: `Icon-${s.name || "custom"}`, render() {
  return tg(oD, { icon: s, color: i, width: r, height: r });
} }), vY = { archive: E(Eo, "#607D8B"), delete: E(Jf, "#F44336"), back: E(zD, "#2196F3"), minus: E(BD, "#9E9E9E"), plus: E(Vf, "#4CAF50"), restore: E(Kf, "#009688"), transfer: E(WD, "#3F51B5"), home: E(jD, "#3F51B5"), comment: E(M1, "#2196F3"), talk: E(_Y, "#00BCD4"), collectives: E(D1, "#795548"), form: E(pY, "#9C27B0"), menu: E(yY, "#607D8B"), unpublished: E(f1, "#9E9E9E"), archived: E(Eo, "#9E9E9E"), closed: E(di, "#F44336"), creation: E(Gf, "#FFC107"), suggestions: E(_1, "#4CAF50"), expiration: E(ym, "#E91E63") }, wY = { share: E(w1, "#03A9F4"), qrCode: E(uY, "#673AB7"), copyLink: E(cY, "#607D8B"), sendByEmail: E(gY, "#2196F3"), emailAlert: E(hY, "#F44336"), bulkMail: E(fY, "#FF9800"), lock: E(di, "#795548"), unlock: E(y1, "#4CAF50"), delete: E(Jf, "#F44336"), restore: E(Kf, "#009688"), adminGrant: E(Ho, "#FF9800"), adminRevoke: E(Ho, "#9E9E9E") };
E(aY, "#2196F3"), E(rY, "#FF9800"), E(iY, "#607D8B"), E(oY, "#795548"), E(h1, "#3F51B5"), E(lY, "#4CAF50"), E(dY, "#2196F3"), E(mY, "#FFC107"), E(ym, "#E91E63"), E(T1, "#607D8B"), E(JD, "#2196F3"), E(QD, "#3F51B5"), E(KD, "#F44336"), E(ZD, "#FFC107"), E(XD, "#2196F3"), E(eY, "#795548"), E(tY, "#009688"), E(sY, "#4CAF50"), E(nY, "#673AB7"), E(Jf, "#F44336"), E(Kf, "#009688"), E($D, "#2196F3"), E(GD, "#4CAF50"), E(VD, "#9E9E9E");
const MY = { administration: E(Ho, "#FF9800"), settings: E(T1, "#607D8B"), relevant: E(p1, "#FFC107"), myInquiries: E(qD, "#3F51B5"), private: E(di, "#F44336"), participated: E(L1, "#009688"), open: E(k1, "#4CAF50"), all: E(ID, "#2196F3"), closed: E(RD, "#795548"), archived: E(Eo, "#9E9E9E"), goTo: E(OD, "#673AB7"), group: E(D1, "#00BCD4"), add: E(Vf, "#4CAF50") }, LY = { comments: E(M1, "#2196F3"), supports: E(v1, "#4CAF50"), participants: E(HD, "#673AB7"), participated: E(L1, "#009688"), admin: E(Ho, "#FF9800"), private: E(PD, "#F44336"), open: E(k1, "#4CAF50"), archived: E(Eo, "#607D8B"), expiration: E(ym, "#F44336"), closed: E(di, "#795548") }, Xt = { proposal: E(lD, "#FFC107"), debate: E(dD, "#2196F3"), petition: E(mD, "#E91E63"), project: E(uD, "#4CAF50"), grievance: E(cD, "#F44336"), suggestion: E(UD, "#9C27B0"), official: E(gD, "#3F51B5") }, kY = { proposal: { label: "Proposal", icon: Xt.proposal }, debate: { label: "Debate", icon: Xt.debate }, petition: { label: "Petition", icon: Xt.petition }, project: { label: "Project", icon: Xt.project }, grievance: { label: "Grievance", icon: Xt.grievance }, suggestion: { label: "Suggestion", icon: Xt.suggestion }, official: { label: "Official", icon: Xt.official } };
E(f1, "#9E9E9E"), E(Eo, "#607D8B"), E(di, "#795548"), E(Gf, "#FF9800"), E(ym, "#F44336");
const TY = { Updated: E(hD, "#FF9800"), Calendar: E(h1, "#3F51B5"), ClockOutline: E(Gf, "#2196F3"), Cancel: E(fD, "#F44336"), Offer: E(_1, "#009688"), Check: E(_D, "#4CAF50"), EyeOutline: E(pD, "#9C27B0"), Magnify: E(yD, "#3F51B5"), AlertCircleOutline: E(vD, "#FF5722"), ForumOutline: E(wD, "#673AB7"), CogOutline: E(MD, "#607D8B"), PlayOutline: E(LD, "#8BC34A"), Plus: E(Vf, "#00BCD4"), Star: E(p1, "#FFD700"), Lock: E(di, "#795548"), LockOpen: E(y1, "#4CAF50"), Pencil: E(kD, "#FF9800"), Heart: E(TD, "#E91E63"), ThumbUp: E(v1, "#4CAF50"), ThumbDown: E(DD, "#F44336"), AccountMultiple: E(YD, "#4CAF50"), AdminIcon: E(Ho, "#FBC02D"), LinkIcon: E(CD, "#2196F3"), ContactIcon: E(bD, "#4CAF50"), EmailIcon: E(SD, "#FF9800"), ShareIcon: E(w1, "#03A9F4"), ContactGroupIcon: E(FD, "#9C27B0"), CircleIcon: E(xD, "#00BCD4"), DeletedUserIcon: E(ND, "#F44336"), AnoymousIcon: E(AD, "#9E9E9E"), InquiryGroupIcon: E(ED, "#673AB7"), Draft: E(Y1, "#6E3ABE"), default: E(Y1, "#9E9E9E") };
async function DY(s) {
  return Promise.resolve(window.confirm(s));
}
const YY = { proposal: { label: re("agora", "Proposal"), icon: Xt.proposal }, debate: { label: "Debate", icon: Xt.debate }, petition: { label: "Petition", icon: Xt.petition }, project: { label: "Project", icon: Xt.project }, grievance: { label: "Grievance", icon: Xt.grievance }, suggestion: { label: "Suggestion", icon: Xt.suggestion }, official: { label: "Official Response", icon: Xt.official } }, CY = { PROPOSAL: "proposal", PROJECT: "project", GRIEVANCE: "grievance", DEBATE: "debate", PETITION: "petition", SUGGESTION: "suggestion", OFFICIAL: "official" }, bY = { class: "empty-content", role: "note" }, SY = { key: 0, class: "empty-content__icon", "aria-hidden": "true" }, FY = { key: 0, class: "empty-content__name" }, xY = { key: 1, class: "empty-content__description" }, NY = { key: 2, class: "empty-content__action" }, AY = Zc({ __name: "NcEmptyContent", props: { description: { default: "" }, name: { default: "" } }, setup(s) {
  return (i, r) => (qe(), dt("div", bY, [i.$slots.icon ? (qe(), dt("div", SY, [Js(i.$slots, "icon", {}, void 0, true)])) : Cs("", true), Js(i.$slots, "name", {}, () => [i.name !== "" ? (qe(), dt("span", FY, Ca(i.name), 1)) : Cs("", true)], true), i.description !== "" || i.$slots.description ? (qe(), dt("p", xY, [Js(i.$slots, "description", {}, () => [Qc(Ca(i.description), 1)], true)])) : Cs("", true), i.$slots.action ? (qe(), dt("div", NY, [Js(i.$slots, "action", {}, void 0, true)])) : Cs("", true)]));
} }), C1 = Wd(AY, [["__scopeId", "data-v-697cfd8f"]]), EY = { name: "NcDashboardWidgetItem", components: { NcAvatar: N_, NcActions: lM, NcActionButton: oM }, props: { id: { type: [String, Number], default: void 0 }, targetUrl: { type: String, default: void 0 }, avatarUrl: { type: String, default: void 0 }, avatarUsername: { type: String, default: void 0 }, avatarIsNoUser: { type: Boolean, default: false }, overlayIconUrl: { type: String, default: void 0 }, mainText: { type: String, required: true }, subText: { type: String, default: "" }, itemMenu: { type: Object, default: () => ({}) }, forceMenu: { type: Boolean, default: true } }, data() {
  return { hovered: false };
}, computed: { item() {
  return { id: this.id, targetUrl: this.targetUrl, avatarUrl: this.avatarUrl, avatarUsername: this.avatarUsername, overlayIconUrl: this.overlayIconUrl, mainText: this.mainText, subText: this.subText };
}, gotMenu() {
  return Object.keys(this.itemMenu).length !== 0 || !!this.$slots.actions;
}, gotOverlayIcon() {
  return this.overlayIconUrl && this.overlayIconUrl !== "";
} }, methods: { onLinkClick(s) {
  s.target.closest(".action-item") && s.preventDefault();
} } }, HY = ["src"], PY = { class: "item__details" }, jY = ["title"], qY = ["title"];
function IY(s, i, r, l, u, g) {
  const f = nr("NcAvatar"), p = nr("NcActionButton"), L = nr("NcActions");
  return qe(), dt("div", { onMouseover: i[0] || (i[0] = (w) => u.hovered = true), onMouseleave: i[1] || (i[1] = (w) => u.hovered = false) }, [(qe(), Ya(uM(r.targetUrl ? "a" : "div"), { href: r.targetUrl || void 0, target: r.targetUrl ? "_blank" : void 0, class: mM({ "item-list__entry": true, "item-list__entry--has-actions-menu": g.gotMenu }), onClick: g.onLinkClick }, { default: sr(() => [Js(s.$slots, "avatar", { avatarUrl: r.avatarUrl, avatarUsername: r.avatarUsername }, () => [$d(f, { class: "item-avatar", size: 44, url: r.avatarUrl, user: r.avatarUsername, "is-no-user": r.avatarIsNoUser, "hide-status": g.gotOverlayIcon }, null, 8, ["url", "user", "is-no-user", "hide-status"])], true), r.overlayIconUrl ? (qe(), dt("img", { key: 0, class: "item-icon", alt: "", src: r.overlayIconUrl }, null, 8, HY)) : Cs("", true), Sa("div", PY, [Sa("h3", { title: r.mainText }, Ca(r.mainText), 9, jY), r.subText !== "" ? (qe(), dt("span", { key: 0, class: "message", title: r.subText }, Ca(r.subText), 9, qY)) : Cs("", true)]), g.gotMenu ? (qe(), Ya(L, { key: 1, "force-menu": r.forceMenu }, { default: sr(() => [Js(s.$slots, "actions", {}, () => [(qe(true), dt(sg, null, ng(r.itemMenu, (w, D) => (qe(), Ya(p, { key: D, icon: w.icon, "close-after-click": true, onClick: dM((b) => s.$emit(D, g.item), ["prevent", "stop"]) }, { default: sr(() => [Qc(Ca(w.text), 1)]), _: 2 }, 1032, ["icon", "onClick"]))), 128))], true)]), _: 3 }, 8, ["force-menu"])) : Cs("", true)]), _: 3 }, 8, ["href", "target", "class", "onClick"]))], 32);
}
const RY = Wd(EY, [["render", IY], ["__scopeId", "data-v-68bcbc90"]]), OY = { name: "CheckIcon", emits: ["click"], props: { title: { type: String }, fillColor: { type: String, default: "currentColor" }, size: { type: Number, default: 24 } } }, UY = ["aria-hidden", "aria-label"], zY = ["fill", "width", "height"], BY = { d: "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" }, WY = { key: 0 };
function $Y(s, i, r, l, u, g) {
  return qe(), dt("span", A_(s.$attrs, { "aria-hidden": r.title ? null : "true", "aria-label": r.title, class: "material-design-icon check-icon", role: "img", onClick: i[0] || (i[0] = (f) => s.$emit("click", f)) }), [(qe(), dt("svg", { fill: r.fillColor, class: "material-design-icon__svg", width: r.size, height: r.size, viewBox: "0 0 24 24" }, [Sa("path", BY, [r.title ? (qe(), dt("title", WY, Ca(r.title), 1)) : Cs("", true)])], 8, zY))], 16, UY);
}
const GY = Wd(OY, [["render", $Y]]);
S_(cM);
const VY = { name: "NcDashboardWidget", components: { NcAvatar: N_, NcDashboardWidgetItem: RY, NcEmptyContent: C1, Check: GY }, props: { items: { type: Array, default: () => [] }, showMoreUrl: { type: String, default: "" }, showMoreLabel: { type: String, default: F_("More items …") }, loading: { type: Boolean, default: false }, itemMenu: { type: Object, default: () => ({}) }, showItemsAndEmptyContent: { type: Boolean, default: false }, emptyContentMessage: { type: String, default: "" }, halfEmptyContentMessage: { type: String, default: "" } }, computed: { handlers() {
  const s = {};
  for (const i in this.itemMenu) s[i] = (r) => {
    this.$emit(i, r);
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
} } }, JY = { class: "dashboard-widget" }, KY = { key: 1 }, ZY = ["href"];
function QY(s, i, r, l, u, g) {
  const f = nr("Check"), p = nr("NcEmptyContent"), L = nr("NcDashboardWidgetItem"), w = nr("NcAvatar");
  return qe(), dt("div", JY, [g.showHalfEmptyContentArea ? (qe(), Ya(p, { key: 0, description: g.halfEmptyContentString, class: "half-screen" }, { icon: sr(() => [Js(s.$slots, "halfEmptyContentIcon", {}, () => [$d(f)], true)]), _: 3 }, 8, ["description"])) : Cs("", true), Sa("ul", null, [(qe(true), dt(sg, null, ng(g.displayedItems, (D) => (qe(), dt("li", { key: D.id }, [Js(s.$slots, "default", { item: D }, () => [$d(L, A_({ ref_for: true }, D, { "item-menu": r.itemMenu }, gM(g.handlers)), null, 16, ["item-menu"])], true)]))), 128))]), r.loading ? (qe(), dt("div", KY, [(qe(), dt(sg, null, ng(7, (D) => Sa("div", { key: D, class: "item-list__entry" }, [$d(w, { class: "item-avatar", size: 44 }), i[0] || (i[0] = Sa("div", { class: "item__details" }, [Sa("h3", null, " "), Sa("p", { class: "message" }, "   ")], -1))])), 64))])) : r.items.length === 0 ? Js(s.$slots, "empty-content", { key: 2 }, () => [r.emptyContentMessage ? (qe(), Ya(p, { key: 0, description: r.emptyContentMessage }, { icon: sr(() => [Js(s.$slots, "emptyContentIcon", {}, void 0, true)]), _: 3 }, 8, ["description"])) : Cs("", true)], true) : g.showMore ? (qe(), dt("a", { key: 3, href: r.showMoreUrl, target: "_blank", class: "more", tabindex: "0" }, Ca(r.showMoreLabel), 9, ZY)) : Cs("", true)]);
}
const XY = Wd(VY, [["render", QY], ["__scopeId", "data-v-2d259f64"]]);
export {
  bs as A,
  LY as B,
  ep as C,
  xf as D,
  Ef as E,
  DY as F,
  Nf as G,
  B0 as H,
  YY as I,
  wY as J,
  te as L,
  XY as N,
  TY as S,
  mL as _,
  It as a,
  Ee as b,
  P0 as c,
  H0 as d,
  CY as e,
  E0 as f,
  X_ as g,
  U0 as h,
  at as i,
  vY as j,
  oi as k,
  ip as l,
  Ye as m,
  _L as n,
  Ss as o,
  rt as p,
  ii as q,
  MY as r,
  _g as s,
  C1 as t,
  op as u,
  R0 as v,
  kY as w,
  Xk as x,
  fL as y,
  Af as z
};
//# sourceMappingURL=NcDashboardWidget-Wkx_9xKh-9hyJLnES.chunk.mjs.map
