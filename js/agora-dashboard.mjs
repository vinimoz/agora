(function() {
  "use strict";
  try {
    if (typeof document != "undefined") {
      var elementStyle = document.createElement("style");
      elementStyle.appendChild(document.createTextNode(".inquiry-item__item[data-v-b3352e26] {\n  display: flex;\n  padding: 4px 0;\n}\n.inquiry-item__item.active[data-v-b3352e26] {\n  background-color: var(--color-primary-element-light);\n}\n.inquiry-item__item[data-v-b3352e26]:hover {\n  background-color: var(--color-background-hover);\n}\n.item__title[data-v-b3352e26] {\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.item__title[data-v-b3352e26] * {\n  display: block;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.item__title .item__title__description[data-v-b3352e26] {\n  opacity: 0.5;\n}\n.item__icon-spacer[data-v-b3352e26] {\n  width: 44px;\n  min-width: 44px;\n}/*!\n * SPDX-FileCopyrightText: 2025 Trappe Vincent \n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n.icon-agora {\n  background-image: url(../img/agora.svg);\n  filter: var(--background-invert-if-dark);\n}\n\n.icon-agora-dark {\n  background-image: url(../img/agora-dark.svg);\n  filter: var(--background-invert-if-dark);\n}"));
      document.head.appendChild(elementStyle);
    }
  } catch (e) {
    console.error("vite-plugin-css-injected-by-js", e);
  }
})();
const O = "agora", W = "1.1.0-rc1";
import { d as g, s as o, v as h, c as l, o as n, j as d, g as c, k as s, n as e, D as u, f, h as y, t as _, E as b, _ as v, z as q, A as D } from "./NcEmptyContent-q-geAf0w-DQ9Y4Vwi.chunk.mjs";
import { a as C, I as w, N as x, L as I, s as L } from "./NcDashboardWidget-BEUtfCxs-KrdgBHVB.chunk.mjs";
import { _ as N } from "./AgoraAppIcon.vue_vue_type_script_setup_true_lang-BttQG-eg.chunk.mjs";

const M = ["href"], A = { class: "inquiry-item__item" }, E = { class: "type-icon" }, k = { class: "item__title" }, B = { class: "item__title__title" }, S = { class: "item__title__description" }, T = g({ __name: "Dashboard", setup(r) {
  const a = { emptyContentMessage: o("agora", "No inquiries found for this category"), showMoreText: o("agora", "Relevant inquiries") }, i = C();
  function p() {
    I.debug("Loading inquiries in dashboard widget");
    try {
      i.load();
    } catch (e2) {
      L(o("agora", "Error setting dashboard list"));
    }
  }
  return h(() => {
    p();
  }), (m, z) => (n(), l("div", null, [d(e(x), { items: e(i).dashboardList, "empty-content-message": a.emptyContentMessage, "show-more-text": a.showMoreText, loading: e(i).inquiriesLoading }, { emptyContentIcon: c(() => [d(e(N))]), default: c(({ item: t }) => [s("a", { href: e(u)("/apps/agora/inquiry/".concat(t.id)) }, [s("div", A, [s("div", E, [(n(), f(y(e(w)[t.type].icon)))]), s("div", k, [s("div", B, _(t.title), 1), s("div", S, _(e(b).sanitize(t.description ? t.description : e(o)("agora", "No description provided"))), 1)])])], 8, M)]), _: 1 }, 8, ["items", "empty-content-message", "show-more-text", "loading"])]));
} }), V = v(T, [["__scopeId", "data-v-b3352e26"]]);
document.addEventListener("DOMContentLoaded", () => {
  OCA.Dashboard.register("agora", (r) => q(V).use(D).mount(r));
});
//# sourceMappingURL=agora-dashboard.mjs.map
