(function() {
  "use strict";
  try {
    if (typeof document != "undefined") {
      var elementStyle = document.createElement("style");
      elementStyle.appendChild(document.createTextNode(".inquiry-item__item[data-v-7c85dc8e] {\n  display: flex;\n  padding: 4px 0;\n}\n.inquiry-item__item.active[data-v-7c85dc8e] {\n  background-color: var(--color-primary-element-light);\n}\n.inquiry-item__item[data-v-7c85dc8e]:hover {\n  background-color: var(--color-background-hover);\n}\n.item__title[data-v-7c85dc8e] {\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.item__title[data-v-7c85dc8e] * {\n  display: block;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.item__title .item__title__description[data-v-7c85dc8e] {\n  opacity: 0.5;\n}\n.item__icon-spacer[data-v-7c85dc8e] {\n  width: 44px;\n  min-width: 44px;\n}/*!\n * SPDX-FileCopyrightText: 2025 Trappe Vincent \n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n.icon-agora {\n  background-image: url(../img/agora.svg);\n  filter: var(--background-invert-if-dark);\n}\n\n.icon-agora-dark {\n  background-image: url(../img/agora-dark.svg);\n  filter: var(--background-invert-if-dark);\n}"));
      document.head.appendChild(elementStyle);
    }
  } catch (e) {
    console.error("vite-plugin-css-injected-by-js", e);
  }
})();
const O = "agora", W = "1.0.0rc1";
import { d as m, t as o, f as g, c as h, o as n, h as d, w as c, a as s, u as e, K as l, g as u, x as f, e as _, _ as y, j as b, p as v } from "./NcEmptyContent-q-geAf0w-C5KNLRzH.chunk.mjs";
import { a as q, I as D, N as w, L as x, s as C } from "./NcDashboardWidget-Wkx_9xKh-lkMdwGn7.chunk.mjs";
import { _ as I } from "./AgoraAppIcon.vue_vue_type_script_setup_true_lang-BlGw_px0.chunk.mjs";

const L = ["href"], N = { class: "inquiry-item__item" }, M = { class: "type-icon" }, A = { class: "item__title" }, B = { class: "item__title__title" }, E = { class: "item__title__description" }, k = m({ __name: "Dashboard", setup(r) {
  const a = { emptyContentMessage: o("agora", "No inquiries found for this category"), showMoreText: o("agora", "Relevant inquiries") }, i = q();
  function p() {
    x.debug("Loading inquiries in dashboard widget");
    try {
      i.load();
    } catch {
      C(o("agora", "Error setting dashboard list"));
    }
  }
  return g(() => {
    p();
  }), (T, V) => (n(), h("div", null, [d(e(w), { items: e(i).dashboardList, "empty-content-message": a.emptyContentMessage, "show-more-text": a.showMoreText, loading: e(i).inquiriesLoading }, { emptyContentIcon: c(() => [d(e(I))]), default: c(({ item: t }) => [s("a", { href: e(l)(`/apps/agora/inquiry/${t.id}`) }, [s("div", N, [s("div", M, [(n(), u(f(e(D)[t.type].icon)))]), s("div", A, [s("div", B, _(t.title), 1), s("div", E, _(t.description ? t.description : e(o)("agora", "No description provided")), 1)])])], 8, L)]), _: 1 }, 8, ["items", "empty-content-message", "show-more-text", "loading"])]));
} }), S = y(k, [["__scopeId", "data-v-7c85dc8e"]]);
document.addEventListener("DOMContentLoaded", () => {
  OCA.Dashboard.register("agora", (r) => b(S).use(v).mount(r));
});
//# sourceMappingURL=agora-dashboard.mjs.map
