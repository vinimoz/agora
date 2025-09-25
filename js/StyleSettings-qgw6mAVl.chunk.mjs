(function() {
  "use strict";
  try {
    if (typeof document != "undefined") {
      var elementStyle = document.createElement("style");
      elementStyle.appendChild(document.createTextNode(".bully {\n  display: inline-block;\n  width: 11px;\n  height: 11px;\n  border-radius: 50%;\n  margin: 0 4px 0 0;\n}"));
      document.head.appendChild(elementStyle);
    }
  } catch (e) {
    console.error("vite-plugin-css-injected-by-js", e);
  }
})();
const D = "agora", L = "1.0.0-rc5";
import { I as c } from "./index-Ch7fpXjv.chunk.mjs";
import { c as I, u as v, L as q } from "./NcDashboardWidget-Wkx_9xKh-BuiM1L_L.chunk.mjs";
import { B as h, k as V, c as f, o as p, a as n, f as l, w as d, C as y, z as u, u as s, t as a } from "./NcEmptyContent-q-geAf0w-B0ZeCpG6.chunk.mjs";
import { N as g } from "./NcRichText-G8kzsdwx-BFAbDomF.chunk.mjs";
const m = h("preferences", { state: () => ({ user: { calendarPeek: false, checkCalendars: [], checkCalendarsHoursBefore: 0, checkCalendarsHoursAfter: 0, defaultViewInquiry: "table-view", inquiryCombo: [], relevantOffset: 30, useNewInquiryDialogInNavigation: false, useNewInquiryInInquiryist: false, useCommentsAlternativeStyling: false, useAlternativeStyling: false, verboseInquiriesList: false }, session: { manualViewInquiry: "" }, availableCalendars: [] }), getters: { viewInquiry(e) {
  return e.session.manualViewInquiry ? e.session.manualViewInquiry : window.innerWidth > 480 ? e.user.defaultViewInquiry : "list-view";
}, useNcAppNavigationNew(e) {
  return !e.user.useNewInquiryDialogInNavigation && !e.user.useNewInquiryInInquiryist;
}, useActionAddInquiryInNavigation(e) {
  return e.user.useNewInquiryDialogInNavigation && !e.user.useNewInquiryInInquiryist;
} }, actions: { setCalendars(e) {
  this.availableCalendars = e.calendars;
}, addCheckCalendar(e) {
  this.user.checkCalendars.push(e.key), this.write();
}, removeCheckCalendar(e) {
  const t = this.user.checkCalendars.indexOf(e.key);
  t !== -1 && this.user.checkCalendars.splice(t, 1), this.write();
}, setViewInquiry(e) {
  this.session.manualViewInquiry = e;
}, async load() {
  try {
    const e = await v.getUserSettings();
    this.$patch({ user: e.data.preferences });
  } catch (e) {
    if (e?.code === "ERR_CANCELED") return;
    throw this.$reset(), e;
  }
}, async write() {
  try {
    const e = await v.writeUserSettings(this.user);
    this.$patch({ user: e.data.preferences });
  } catch (e) {
    if (e?.code === "ERR_CANCELED") return;
    throw q.error("Error writing preferences", { error: e, preferences: this.user }), e;
  }
}, async getCalendars() {
  try {
    const e = await I.getCalendars();
    return this.setCalendars({ calendars: e.data.calendars }), e;
  } catch (e) {
    if (e?.code === "ERR_CANCELED") return;
    throw e;
  }
} } }), C = { class: "user_settings" }, N = { class: "settings_details" }, _ = { class: "user_settings" }, b = { class: "settings_details" }, S = { class: "user_settings" }, k = { __name: "FeatureSettings", setup(e) {
  const t = m(), w = V({ get() {
    return t.user.defaultViewInquiry === "list-view";
  }, set(r) {
    t.user.defaultViewInquiry = r ? "list-view" : "table-view";
  } });
  return (r, i) => (p(), f("div", null, [n("div", C, [l(s(g), { modelValue: w.value, "onUpdate:modelValue": [i[0] || (i[0] = (o) => w.value = o), i[1] || (i[1] = (o) => s(t).write())], type: "switch" }, { default: d(() => [y(u(s(a)("agora", "Proposal agora inquiry default view to list view")), 1)]), _: 1 }, 8, ["modelValue"]), n("div", N, u(s(a)("agora", "Check this, if you prefer to display text inquiry in grid view. The initial default is list view.")), 1)]), n("div", _, [l(s(g), { modelValue: s(t).user.verboseInquiriesList, "onUpdate:modelValue": [i[2] || (i[2] = (o) => s(t).user.verboseInquiriesList = o), i[3] || (i[3] = (o) => s(t).write())], type: "switch" }, { default: d(() => [y(u(s(a)("agora", "Verbose inquiry list")), 1)]), _: 1 }, 8, ["modelValue"]), n("div", b, u(s(a)("agora", "Check this for more inquiry information in the overview.")), 1)]), n("div", S, [l(s(c), { modelValue: s(t).user.relevantOffset, "onUpdate:modelValue": i[4] || (i[4] = (o) => s(t).user.relevantOffset = o), type: "number", inputmode: "numeric", "use-num-modifiers": "", label: s(a)("agora", "Enter the amount of days, inquiries without activity stay in the relevant list:"), onChange: i[5] || (i[5] = (o) => s(t).write()) }, null, 8, ["modelValue", "label"])])]));
} }, A = { class: "user_settings" }, $ = { class: "user_settings" }, U = { class: "user_settings" }, E = { class: "user_settings" }, x = { __name: "StyleSettings", setup(e) {
  const t = m();
  return (w, r) => (p(), f("div", null, [n("b", null, u(s(a)("agora", "The style settings are still experimental!")), 1), n("div", A, [l(s(g), { modelValue: s(t).user.useNewInquiryDialogInNavigation, "onUpdate:modelValue": [r[0] || (r[0] = (i) => s(t).user.useNewInquiryDialogInNavigation = i), r[1] || (r[1] = (i) => s(t).write())], type: "switch" }, { default: d(() => [y(u(s(a)("agora", "Use modal 'Add inquiry ' dialog instead of embedded dialog in Navigation bar")), 1)]), _: 1 }, 8, ["modelValue"])]), n("div", $, [l(s(g), { modelValue: s(t).user.useNewInquiryInInquiryist, "onUpdate:modelValue": [r[2] || (r[2] = (i) => s(t).user.useNewInquiryInInquiryist = i), r[3] || (r[3] = (i) => s(t).write())], type: "switch" }, { default: d(() => [y(u(s(a)("agora", "Use 'Add inquiry ' as button in inquiry list instead of inside the navigation")), 1)]), _: 1 }, 8, ["modelValue"])]), n("div", U, [l(s(g), { modelValue: s(t).user.useCommentsAlternativeStyling, "onUpdate:modelValue": [r[4] || (r[4] = (i) => s(t).user.useCommentsAlternativeStyling = i), r[5] || (r[5] = (i) => s(t).write())], type: "switch" }, { default: d(() => [y(u(s(a)("agora", "Use alternative styling for the comments sidebar")), 1)]), _: 1 }, 8, ["modelValue"])]), n("div", E, [l(s(g), { modelValue: s(t).user.useAlternativeStyling, "onUpdate:modelValue": [r[6] || (r[6] = (i) => s(t).user.useAlternativeStyling = i), r[7] || (r[7] = (i) => s(t).write())], type: "switch" }, { default: d(() => [y(u(s(a)("agora", "Use alternative inquiry page styling")), 1)]), _: 1 }, 8, ["modelValue"])])]));
} };
export {
  k as _,
  x as a,
  m as u
};
//# sourceMappingURL=StyleSettings-qgw6mAVl.chunk.mjs.map
