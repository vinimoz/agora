(function() {
  "use strict";
  try {
    if (typeof document != "undefined") {
      var elementStyle = document.createElement("style");
      elementStyle.appendChild(document.createTextNode(".inquiry-item__item[data-v-83ac5e0f] {\n  display: flex;\n  padding: 4px 0;\n}\n.inquiry-item__item.active[data-v-83ac5e0f] {\n  background-color: var(--color-primary-element-light);\n}\n.inquiry-item__item[data-v-83ac5e0f]:hover {\n  background-color: var(--color-background-hover);\n}\n.type-icon[data-v-83ac5e0f] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 44px;\n  min-width: 44px;\n}\n.type-icon .nav-icon[data-v-83ac5e0f] {\n  width: 20px;\n  height: 20px;\n}\n.item__title[data-v-83ac5e0f] {\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.item__title[data-v-83ac5e0f] * {\n  display: block;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.item__title .item__title__description[data-v-83ac5e0f] {\n  opacity: 0.5;\n}"));
      document.head.appendChild(elementStyle);
    }
  } catch (e) {
    console.error("vite-plugin-css-injected-by-js", e);
  }
})();
const U = "agora", j = "1.7.0-rc1";
import { d as b, q as a, s as q, o as p, c as v, g as l, e as _, h as s, v as e, D, b as I, f as C, t as u, E as S, l as w, _ as x, z as L, A as N } from "./TernarySupportIcon.vue_vue_type_style_index_0_scoped_f6cfe8f3_lang-CeXva8eL.chunk.mjs";
import { a as E, b as M, N as T, s as g, L as A, g as B, I as k } from "./NcDashboardWidget-DCBQdRFz-BzelqfpC.chunk.mjs";
import { _ as V } from "./agora-icon-D9vp_50u.chunk.mjs";
const z = ["href"], O = { class: "inquiry-item__item" }, W = { class: "type-icon" }, $ = { class: "item__title" }, F = { class: "item__title__title" }, G = { class: "item__title__description" }, P = b({ __name: "Dashboard", setup(c) {
  const o = E(), d = { emptyContentMessage: a("agora", "No inquiries found for this category"), showMoreText: a("agora", "Relevant inquiries") }, h = w(() => o.appSettings.inquiryTypeTab || []), n = M();
  function m() {
    try {
      o.load(null, false, false);
    } catch {
      g(a("agora", "Error setting dashboard list"));
    }
  }
  function y() {
    A.debug("Loading inquiries in dashboard widget");
    try {
      n.load();
    } catch {
      g(a("agora", "Error setting dashboard list"));
    }
  }
  function f(i) {
    if (i.type) {
      const r = B(i.type, h.value);
      if (r?.icon) return r.icon;
    }
    return k.Flash;
  }
  return q(() => {
    m(), y();
  }), (i, r) => (p(), v("div", null, [l(e(T), { items: e(n).dashboardList, "empty-content-message": d.emptyContentMessage, "show-more-text": d.showMoreText, loading: e(n).inquiriesLoading }, { emptyContentIcon: _(() => [l(e(V))]), default: _(({ item: t }) => [s("a", { href: e(D)(`/apps/agora/page/inquiry/${t.id}`) }, [s("div", O, [s("div", W, [(p(), I(C(f(t)), { class: "nav-icon" }))]), s("div", $, [s("div", F, u(t.title), 1), s("div", G, u(e(S).sanitize(t.description ? t.description : e(a)("agora", "No description provided"))), 1)])])], 8, z)]), _: 1 }, 8, ["items", "empty-content-message", "show-more-text", "loading"])]));
} }), R = x(P, [["__scopeId", "data-v-83ac5e0f"]]);
document.addEventListener("DOMContentLoaded", () => {
  OCA.Dashboard.register("agora", (c) => L(R).use(N).mount(c));
});
//# sourceMappingURL=agora-dashboard.mjs.map
