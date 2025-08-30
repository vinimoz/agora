(function() {
  "use strict";
  try {
    if (typeof document != "undefined") {
      var elementStyle = document.createElement("style");
      elementStyle.appendChild(document.createTextNode('@charset "UTF-8";\n/*!\n * SPDX-FileCopyrightText: 2022 René Gieling <github@dartcafe.de>\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n.inquiries-markdown * {\n  margin: revert;\n  padding: revert;\n  font-size: revert;\n  text-decoration: revert;\n  list-style: revert;\n  opacity: revert;\n  min-height: revert;\n}\n.inquiries-markdown table {\n  border-spacing: 2px;\n}\n.inquiries-markdown thead {\n  background-color: var(--color-background-darker);\n  color: var(--color-main-text);\n}\n.inquiries-markdown td,\n.inquiries-markdown th {\n  padding: 1px 4px;\n}'));
      document.head.appendChild(elementStyle);
    }
  } catch (e) {
    console.error("vite-plugin-css-injected-by-js", e);
  }
})();
const O = "agora", Q = "1.0.0rc2";
import "./NcDashboardWidget-Wkx_9xKh-CDYPbWzH.chunk.mjs";
import { k, d as u, q as p, C as w, D as y, E as b, F as B, c as d, o as t, r as l, a as r, h as I, G as g, u as m, H as S, b as A, e as _, g as f, n as D, i as M, w as $, m as N, l as R, I as z, J as P, B as q } from "./NcEmptyContent-q-geAf0w-DExP7TOI.chunk.mjs";
import { N as E } from "./NcRichText-G8kzsdwx-D7Euftyg.chunk.mjs";
const F = ["role"], G = { key: 0, class: "notecard__heading" }, x = { class: "notecard__text" }, H = u({ __name: "NcNoteCard", props: { heading: { default: void 0 }, showAlert: { type: Boolean }, text: { default: void 0 }, type: { default: "warning" } }, setup(s) {
  const e = s, o = p(() => e.showAlert || e.type === "error"), i = p(() => {
    switch (e.type) {
      case "error":
        return B;
      case "success":
        return b;
      case "info":
        return y;
      case "warning":
      default:
        return w;
    }
  });
  return (a, h) => (t(), d("div", { class: g(["notecard", `notecard--${a.type}`]), role: o.value ? "alert" : "note" }, [l(a.$slots, "icon", {}, () => [I(m(S), { path: i.value, class: g(["notecard__icon", { "notecard__icon--heading": a.heading }]), inline: "" }, null, 8, ["path", "class"])], true), r("div", null, [a.heading ? (t(), d("p", G, _(a.heading), 1)) : A("", true), l(a.$slots, "default", {}, () => [r("p", x, _(a.text), 1)], true)])], 10, F));
} }), J = k(H, [["__scopeId", "data-v-1893b364"]]), L = { class: "card-content" }, T = { class: "left-card-side" }, U = { class: "right-card-side" }, W = u({ __name: "CardDiv", setup(s) {
  return (e, o) => (t(), f(m(J), D(M(e.$attrs)), { default: $(() => [r("div", L, [r("div", T, [l(e.$slots, "default")]), r("div", U, [l(e.$slots, "button")])])]), _: 3 }, 16));
} }), j = { class: "radio-group-div" }, K = u({ __name: "RadioGroupDiv", props: N({ id: {}, options: {} }, { modelValue: { required: true }, modelModifiers: {} }), emits: N(["update"], ["update:modelValue"]), setup(s, { emit: e }) {
  const o = R(s, "modelValue"), i = () => Math.random().toString(36).replace(/[^a-z]+/g, "").slice(2, 12), a = e, h = p(() => s.id ?? `rg-${i()}`);
  return (C, n) => (t(), d("div", j, [(t(true), d(z, null, P(C.options, (c, V) => (t(), f(m(E), { key: c.value, modelValue: o.value, "onUpdate:modelValue": [n[0] || (n[0] = (v) => o.value = v), n[1] || (n[1] = (v) => a("update"))], value: c.value, name: h.value + V, type: "radio" }, { default: $(() => [q(_(c.label), 1)]), _: 2 }, 1032, ["modelValue", "value", "name"]))), 128))]));
} });
export {
  K as _,
  W as a
};
//# sourceMappingURL=markdown-2oeXocZy.chunk.mjs.map
