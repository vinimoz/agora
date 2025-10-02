(function() {
  "use strict";
  try {
    if (typeof document != "undefined") {
      var elementStyle = document.createElement("style");
      elementStyle.appendChild(document.createTextNode("#body-user .badge-small[data-v-a75cba4f] {\n  display: flex;\n  flex: 0 0 fit-content;\n  align-items: center;\n  gap: 5px;\n  border: 2px solid;\n  border-radius: var(--border-radius-pill) !important;\n  text-align: center;\n  font-size: 0.9em;\n  overflow: hidden;\n  padding: 0px 8px !important;\n  margin: 0 !important;\n  min-height: 1.4rem;\n}\n#body-user .badge-small span[data-v-a75cba4f] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\nh2 #body-user .badge-small[data-v-a75cba4f] {\n  font-size: 0.6em;\n}\n#body-user .badge-small.error[data-v-a75cba4f] {\n  background-color: rgba(var(--color-error-rgb), 0.2);\n  border-color: var(--color-error);\n}\n#body-user .badge-small.success[data-v-a75cba4f] {\n  background-color: rgba(var(--color-success-rgb), 0.2);\n  border-color: var(--color-success);\n}\n#body-user .badge-small.warning[data-v-a75cba4f] {\n  background-color: rgba(var(--color-warning-rgb), 0.2) !important;\n  border-color: var(--color-warning);\n}.agora_widget[data-v-1ff32f68] {\n  padding: 0.6rem;\n}\n.widget_header[data-v-1ff32f68],\n.widget_footer[data-v-1ff32f68] {\n  display: flex;\n  column-gap: 0.3rem;\n}\n.badge-small[data-v-1ff32f68] {\n  flex: 0;\n}\n.agora_app_icon[data-v-1ff32f68] {\n  flex: 0 0 1.4rem;\n}\n.title[data-v-1ff32f68] {\n  flex: 1;\n  font-weight: bold;\n  padding-inline-start: 0.6rem;\n  text-wrap: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.description[data-v-1ff32f68] {\n  margin-inline-start: 1.4rem;\n  padding: 0.6rem;\n}\n.owner[data-v-1ff32f68] {\n  margin-inline-start: 1.4rem;\n  padding-inline-start: 0.6rem;\n}\n.clamped[data-v-1ff32f68] {\n  display: -webkit-box !important;\n  -webkit-line-clamp: 4;\n  line-clamp: 4;\n  -webkit-box-orient: vertical;\n  text-wrap: wrap;\n  overflow: clip !important;\n  text-overflow: ellipsis !important;\n  padding: 0 !important;\n}/*!\n * SPDX-FileCopyrightText: 2025 Trappe Vincent \n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n.icon-agora {\n  background-image: url(../img/agora.svg);\n  filter: var(--background-invert-if-dark);\n}\n\n.icon-agora-dark {\n  background-image: url(../img/agora-dark.svg);\n  filter: var(--background-invert-if-dark);\n}"));
      document.head.appendChild(elementStyle);
    }
  } catch (e) {
    console.error("vite-plugin-css-injected-by-js", e);
  }
})();
const F = "agora", G = "1.0.0";
import { _ as u, c, o as a, k as n, l as o, t as s, i as k, d as _, f as d, h as C, g as l, r as b, P as p, j as f, n as r, C as h, s as m, J as w, z as O, A as q } from "./NcEmptyContent-q-geAf0w-BE9auIn9.chunk.mjs";
import { r as H } from "./NcRichText-Dht_wH3t-BOSakNmB.chunk.mjs";
import { N } from "./NcUserBubble-ndaFuDRG-DfZ4d100.chunk.mjs";
import { _ as $ } from "./AgoraAppIcon.vue_vue_type_script_setup_true_lang-BiKNn9_8.chunk.mjs";

const x = { name: "CalendarEndIcon", emits: ["click"], props: { title: { type: String }, fillColor: { type: String, default: "currentColor" }, size: { type: Number, default: 24 } } }, B = ["aria-hidden", "aria-label"], z = ["fill", "width", "height"], D = { d: "M22 14V22H20V18L16 22V19H11V17H16V14L20 18V14H22M5 19L9 19V21L5 21C3.9 21 3 20.1 3 19V5C3 3.89 3.9 3 5 3H6V.998H8V3H16V.998H18V3H19C20.11 3 21 3.89 21 5L21 12H19V8H5V19Z" }, I = { key: 0 };
function L(e, i, t, y, V, v) {
  return a(), c("span", k(e.$attrs, { "aria-hidden": t.title ? null : "true", "aria-label": t.title, class: "material-design-icon calendar-end-icon", role: "img", onClick: i[0] || (i[0] = (j) => e.$emit("click", j)) }), [(a(), c("svg", { fill: t.fillColor, class: "material-design-icon__svg", width: t.size, height: t.size, viewBox: "0 0 24 24" }, [n("path", D, [t.title ? (a(), c("title", I, s(t.title), 1)) : o("", true)])], 8, z))], 16, B);
}
const S = u(x, [["render", L]]), R = { key: 0 }, A = _({ __name: "BadgeSmallDiv", props: { tag: { default: "span" } }, setup(e) {
  return (i, t) => (a(), d(C(e.tag), { class: "badge-small" }, { default: l(() => [b(i.$slots, "icon", {}, void 0, true), i.$slots.default ? (a(), c("span", R, [b(i.$slots, "default", {}, void 0, true)])) : o("", true)]), _: 3 }));
} }), g = u(A, [["__scopeId", "data-v-a75cba4f"]]), M = { key: 0, class: "agora_widget" }, E = { class: "widget_header" }, P = ["href"], T = { class: "description" }, J = { class: "clamped" }, U = { key: 0, class: "widget_footer" }, W = _({ __name: "Reference", props: { richObject: {} }, setup(e) {
  var i, t;
  const y = (t = (i = e.richObject) == null ? void 0 : i.inquiry) != null && t.expiry ? p.fromMillis(e.richObject.inquiry.expiry * 1e3).diffNow("hours").hours < 36 ? "warning" : "success" : "";
  return (V, v) => e.richObject ? (a(), c("div", M, [n("div", E, [f(r($), { size: 20, class: "title-icon" }), n("a", { class: "title", href: e.richObject.inquiry.url, target: "_blank" }, s(e.richObject.inquiry.title), 9, P), e.richObject.inquiry.participated ? (a(), d(g, { key: 0, class: "success" }, { default: l(() => [h(s(r(m)("agora", "participated")), 1)]), _: 1 })) : e.richObject.inquiry.expired ? (a(), d(g, { key: 1, class: "error" }, { default: l(() => [h(s(r(m)("agora", "closed")), 1)]), _: 1 })) : e.richObject.inquiry.expiry > 0 ? (a(), d(g, { key: 2, class: w(r(y)) }, { icon: l(() => [f(S, { size: 16 })]), default: l(() => [h(" " + s(r(p).fromMillis(e.richObject.inquiry.expiry * 1e3).toRelative()), 1)]), _: 1 }, 8, ["class"])) : o("", true)]), n("div", T, [n("span", J, s(e.richObject.inquiry.description), 1)]), e.richObject.inquiry.ownerId ? (a(), c("div", U, [n("span", null, s(r(m)("agora", "By:")), 1), f(r(N), { user: e.richObject.inquiry.ownerId, "display-name": e.richObject.inquiry.ownerDisplayName }, null, 8, ["user", "display-name"])])) : o("", true)])) : o("", true);
} }), Z = u(W, [["__scopeId", "data-v-1ff32f68"]]);
H("agora_reference_widget", async (e, { richObject: i }) => O(Z, { richObject: i }).use(q).mount(e), (e) => e.classList.add("nc-agora-reference-widget"), {});
//# sourceMappingURL=agora-reference.mjs.map
