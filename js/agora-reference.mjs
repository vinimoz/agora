(function() {
  "use strict";
  try {
    if (typeof document != "undefined") {
      var elementStyle = document.createElement("style");
      elementStyle.appendChild(document.createTextNode("#body-user .badge-small[data-v-2a0baafa] {\n  display: flex;\n  flex: 0 0 fit-content;\n  align-items: center;\n  gap: 5px;\n  border: 2px solid;\n  border-radius: var(--border-radius-pill) !important;\n  text-align: center;\n  font-size: 0.9em;\n  overflow: hidden;\n  padding: 0px 8px !important;\n  margin: 0 !important;\n  min-height: 1.4rem;\n}\n#body-user .badge-small span[data-v-2a0baafa] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\nh2 #body-user .badge-small[data-v-2a0baafa] {\n  font-size: 0.6em;\n}\n#body-user .badge-small.error[data-v-2a0baafa] {\n  background-color: rgba(var(--color-error-rgb), 0.2);\n  border-color: var(--color-error);\n}\n#body-user .badge-small.success[data-v-2a0baafa] {\n  background-color: rgba(var(--color-success-rgb), 0.2);\n  border-color: var(--color-success);\n}\n#body-user .badge-small.warning[data-v-2a0baafa] {\n  background-color: rgba(var(--color-warning-rgb), 0.2) !important;\n  border-color: var(--color-warning);\n}.agora_widget[data-v-52bd1702] {\n  padding: 0.6rem;\n}\n.widget_header[data-v-52bd1702],\n.widget_footer[data-v-52bd1702] {\n  display: flex;\n  column-gap: 0.3rem;\n}\n.badge-small[data-v-52bd1702] {\n  flex: 0;\n}\n.agora_app_icon[data-v-52bd1702] {\n  flex: 0 0 1.4rem;\n}\n.title[data-v-52bd1702] {\n  flex: 1;\n  font-weight: bold;\n  padding-inline-start: 0.6rem;\n  text-wrap: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.description[data-v-52bd1702] {\n  margin-inline-start: 1.4rem;\n  padding: 0.6rem;\n}\n.owner[data-v-52bd1702] {\n  margin-inline-start: 1.4rem;\n  padding-inline-start: 0.6rem;\n}\n.clamped[data-v-52bd1702] {\n  display: -webkit-box !important;\n  -webkit-line-clamp: 4;\n  line-clamp: 4;\n  -webkit-box-orient: vertical;\n  text-wrap: wrap;\n  overflow: clip !important;\n  text-overflow: ellipsis !important;\n  padding: 0 !important;\n}"));
      document.head.appendChild(elementStyle);
    }
  } catch (e) {
    console.error("vite-plugin-css-injected-by-js", e);
  }
})();
const G = "agora", J = "1.8.0";
import { _ as u, o as a, c, h as n, t as s, i as o, m as v, d as y, b as d, f as j, e as l, r as _, a3 as b, g as m, v as r, S as h, q as f, R as k, z as w, A as C } from "./NcEmptyContent-CfFbGoRR.chunk.mjs";
import { r as O } from "./NcRichText-BeH8ReOb.chunk.mjs";
import "./referencePickerModal-DrIYqUVO.chunk.mjs";
import { N as q } from "./NcUserBubble-Djv7Q5hC.chunk.mjs";
import { _ as H } from "./agora-icon-DLoygdJQ.chunk.mjs";
const N = { name: "CalendarEndIcon", emits: ["click"], props: { title: { type: String }, fillColor: { type: String, default: "currentColor" }, size: { type: Number, default: 24 } } }, $ = ["aria-hidden", "aria-label"], x = ["fill", "width", "height"], B = { d: "M22 14V22H20V18L16 22V19H11V17H16V14L20 18V14H22M5 19L9 19V21L5 21C3.9 21 3 20.1 3 19V5C3 3.89 3.9 3 5 3H6V.998H8V3H16V.998H18V3H19C20.11 3 21 3.89 21 5L21 12H19V8H5V19Z" }, z = { key: 0 };
function S(e, t, i, p, Z, F) {
  return a(), c("span", v(e.$attrs, { "aria-hidden": i.title ? null : "true", "aria-label": i.title, class: "material-design-icon calendar-end-icon", role: "img", onClick: t[0] || (t[0] = (V) => e.$emit("click", V)) }), [(a(), c("svg", { fill: i.fillColor, class: "material-design-icon__svg", width: i.size, height: i.size, viewBox: "0 0 24 24" }, [n("path", B, [i.title ? (a(), c("title", z, s(i.title), 1)) : o("", true)])], 8, x))], 16, $);
}
const D = u(N, [["render", S]]), I = { key: 0 }, L = y({ __name: "BadgeSmallDiv", props: { tag: { default: "span" } }, setup(e) {
  return (t, i) => (a(), d(j(e.tag), { class: "badge-small" }, { default: l(() => [_(t.$slots, "icon", {}, void 0, true), t.$slots.default ? (a(), c("span", I, [_(t.$slots, "default", {}, void 0, true)])) : o("", true)]), _: 3 }));
} }), g = u(L, [["__scopeId", "data-v-2a0baafa"]]), R = { key: 0, class: "agora_widget" }, A = { class: "widget_header" }, M = ["href"], E = { class: "description" }, T = { class: "clamped" }, P = { key: 0, class: "widget_footer" }, U = y({ __name: "AgoraReference", props: { richObject: {} }, setup(e) {
  const t = e.richObject?.inquiry?.expiry ? b.fromMillis(e.richObject.inquiry.expiry * 1e3).diffNow("hours").hours < 36 ? "warning" : "success" : "";
  return (i, p) => e.richObject ? (a(), c("div", R, [n("div", A, [m(r(H), { size: 20, class: "title-icon" }), n("a", { class: "title", href: e.richObject.inquiry.url, target: "_blank" }, s(e.richObject.inquiry.title), 9, M), e.richObject.inquiry.participated ? (a(), d(g, { key: 0, class: "success" }, { default: l(() => [h(s(r(f)("agora", "participated")), 1)]), _: 1 })) : e.richObject.inquiry.expired ? (a(), d(g, { key: 1, class: "error" }, { default: l(() => [h(s(r(f)("agora", "closed")), 1)]), _: 1 })) : e.richObject.inquiry.expiry > 0 ? (a(), d(g, { key: 2, class: k(r(t)) }, { icon: l(() => [m(D, { size: 16 })]), default: l(() => [h(" " + s(r(b).fromMillis(e.richObject.inquiry.expiry * 1e3).toRelative()), 1)]), _: 1 }, 8, ["class"])) : o("", true)]), n("div", E, [n("span", T, s(e.richObject.inquiry.description), 1)]), e.richObject.inquiry.ownerId ? (a(), c("div", P, [n("span", null, s(r(f)("agora", "By")), 1), m(r(q), { user: e.richObject.inquiry.ownerId, "display-name": e.richObject.inquiry.ownerDisplayName }, null, 8, ["user", "display-name"])])) : o("", true)])) : o("", true);
} }), W = u(U, [["__scopeId", "data-v-52bd1702"]]);
O("agora_reference_widget", async (e, { richObject: t }) => w(W, { richObject: t }).use(C).mount(e), (e) => e.classList.add("nc-agora-reference-widget"), {});
//# sourceMappingURL=agora-reference.mjs.map
