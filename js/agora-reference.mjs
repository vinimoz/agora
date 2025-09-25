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
const M = "agora", T = "1.0.0-rc5";
import { d as _, e as n, o as r, s as b, w as c, r as h, c as d, x as l, _ as y, O as g, a as o, f as p, u as i, z as t, C as u, t as f, J as O, h as j, p as q } from "./NcEmptyContent-q-geAf0w-B0ZeCpG6.chunk.mjs";
import { r as v } from "./NcRichText-G8kzsdwx-BFAbDomF.chunk.mjs";
import { E as w, N as k } from "./CalendarEnd-DdZeJ8MC.chunk.mjs";
import { _ as N } from "./AgoraAppIcon.vue_vue_type_script_setup_true_lang-DDRQ4ds9.chunk.mjs";

const B = { key: 0 }, C = _({ __name: "BadgeSmallDiv", props: { tag: { default: "span" } }, setup(a) {
  return (s, e) => (r(), n(b(s.tag), { class: "badge-small" }, { default: c(() => [h(s.$slots, "icon", {}, void 0, true), s.$slots.default ? (r(), d("span", B, [h(s.$slots, "default", {}, void 0, true)])) : l("", true)]), _: 3 }));
} }), m = y(C, [["__scopeId", "data-v-a75cba4f"]]), D = { key: 0, class: "agora_widget" }, $ = { class: "widget_header" }, I = ["href"], R = { class: "description" }, V = { class: "clamped" }, z = { key: 0, class: "widget_footer" }, S = _({ __name: "Reference", props: { richObject: {} }, setup(a) {
  const s = a.richObject?.inquiry?.expiry ? g.fromMillis(a.richObject.inquiry.expiry * 1e3).diffNow("hours").hours < 36 ? "warning" : "success" : "";
  return (e, E) => e.richObject ? (r(), d("div", D, [o("div", $, [p(i(N), { size: 20, class: "title-icon" }), o("a", { class: "title", href: e.richObject.inquiry.url, target: "_blank" }, t(e.richObject.inquiry.title), 9, I), e.richObject.inquiry.participated ? (r(), n(m, { key: 0, class: "success" }, { default: c(() => [u(t(i(f)("agora", "participated")), 1)]), _: 1 })) : e.richObject.inquiry.expired ? (r(), n(m, { key: 1, class: "error" }, { default: c(() => [u(t(i(f)("agora", "closed")), 1)]), _: 1 })) : e.richObject.inquiry.expiry > 0 ? (r(), n(m, { key: 2, class: O(i(s)) }, { icon: c(() => [p(w, { size: 16 })]), default: c(() => [u(" " + t(i(g).fromMillis(e.richObject.inquiry.expiry * 1e3).toRelative()), 1)]), _: 1 }, 8, ["class"])) : l("", true)]), o("div", R, [o("span", V, t(e.richObject.inquiry.description), 1)]), e.richObject.inquiry.ownerId ? (r(), d("div", z, [o("span", null, t(i(f)("agora", "By:")), 1), p(i(k), { user: e.richObject.inquiry.ownerId, "display-name": e.richObject.inquiry.ownerDisplayName }, null, 8, ["user", "display-name"])])) : l("", true)])) : l("", true);
} }), A = y(S, [["__scopeId", "data-v-1ff32f68"]]);
v("agora_reference_widget", async (a, { richObject: s }) => j(A, { richObject: s }).use(q).mount(a), (a) => a.classList.add("nc-agora-reference-widget"), {});
//# sourceMappingURL=agora-reference.mjs.map
