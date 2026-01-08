(function() {
  "use strict";
  try {
    if (typeof document != "undefined") {
      var elementStyle = document.createElement("style");
      elementStyle.appendChild(document.createTextNode(".inquiry-item__item[data-v-150baf40] {\n  display: flex;\n  padding: 4px 0;\n}\n.inquiry-item__item.active[data-v-150baf40] {\n  background-color: var(--color-primary-element-light);\n}\n.inquiry-item__item[data-v-150baf40]:hover {\n  background-color: var(--color-background-hover);\n}\n.item__title[data-v-150baf40] {\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.item__title[data-v-150baf40] * {\n  display: block;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.item__title .item__title__description[data-v-150baf40] {\n  opacity: 0.5;\n}\n.item__icon-spacer[data-v-150baf40] {\n  width: 44px;\n  min-width: 44px;\n}/*!\n * SPDX-FileCopyrightText: 2025 Trappe Vincent \n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n.icon-agora {\n  background-image: url(../img/agora.svg);\n  filter: var(--background-invert-if-dark);\n}\n\n.icon-agora-dark {\n  background-image: url(../img/agora-dark.svg);\n  filter: var(--background-invert-if-dark);\n}"));
      document.head.appendChild(elementStyle);
    }
  } catch (e) {
    console.error("vite-plugin-css-injected-by-js", e);
  }
})();
const P = "agora", R = "1.6.0";
import { d as f, s as o, b, v as q, c as v, o as d, j as p, g as _, k as s, n as e, M as D, f as I, h as C, t as u, O as w, _ as L, z as M, A as N } from "./TernarySupportIcon.vue_vue_type_style_index_0_scoped_f6cfe8f3_lang-DYSogmh5.chunk.mjs";
import { a as S, b as x, N as T, L as A, s as k, I as l } from "./NcDashboardWidget-Bu7bWoUK-BBZ3nml0.chunk.mjs";
import { _ as B } from "./AgoraAppIcon.vue_vue_type_script_setup_true_lang-VuI8RxYU.chunk.mjs";
import { g as E } from "./InquiryHelper-CEZo6864.chunk.mjs";

const O = ["href"], V = { class: "inquiry-item__item" }, z = { class: "type-icon" }, F = { class: "item__title" }, W = { class: "item__title__title" }, $ = { class: "item__title__description" }, j = f({ __name: "Dashboard", setup(n) {
  const r = S(), c = { emptyContentMessage: o("agora", "No inquiries found for this category"), showMoreText: o("agora", "Relevant inquiries") }, m = b(() => r.appSettings.inquiryTypeTab || []), i = x();
  function g() {
    A.debug("Loading inquiries in dashboard widget");
    try {
      i.load();
    } catch {
      k(o("agora", "Error setting dashboard list"));
    }
  }
  function h(t) {
    return t.type ? E(t.type, m.value)?.icon || l.Flash : l.Flash;
  }
  return q(() => {
    g();
  }), (t, y) => (d(), v("div", null, [p(e(T), { items: e(i).dashboardList, "empty-content-message": c.emptyContentMessage, "show-more-text": c.showMoreText, loading: e(i).inquiriesLoading }, { emptyContentIcon: _(() => [p(e(B))]), default: _(({ item: a }) => [s("a", { href: e(D)(`/apps/agora/inquiry/${a.id}`) }, [s("div", V, [s("div", z, [(d(), I(C(h(t.inquiry)), { class: "nav-icon" }))]), s("div", F, [s("div", W, u(a.title), 1), s("div", $, u(e(w).sanitize(a.description ? a.description : e(o)("agora", "No description provided"))), 1)])])], 8, O)]), _: 1 }, 8, ["items", "empty-content-message", "show-more-text", "loading"])]));
} }), G = L(j, [["__scopeId", "data-v-150baf40"]]);
document.addEventListener("DOMContentLoaded", () => {
  OCA.Dashboard.register("agora", (n) => M(G).use(N).mount(n));
});
//# sourceMappingURL=agora-dashboard.mjs.map
