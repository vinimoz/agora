(function() {
  "use strict";
  try {
    if (typeof document != "undefined") {
      var elementStyle = document.createElement("style");
      elementStyle.appendChild(document.createTextNode(".disclaimer_group {\n  display: flex;\n  align-items: center;\n  background-color: var(--color-background-dark);\n  border-radius: 8px;\n}\n.disclaimer_group .grow_title {\n  display: flex;\n  flex-grow: 1;\n  margin-inline-end: 12px;\n}\n.disclaimer_group .grow_title .material-design-icon {\n  margin-inline-start: 4px;\n}.user_settings {\n  background-color: var(--color-background-dark);\n  border-radius: 8px;\n}\n.user_settings .job_buttons_section {\n  display: flex;\n  flex-wrap: wrap;\n  margin-top: 20px;\n  gap: 12px;\n}\n.user_settings .job_hints p {\n  margin-bottom: 0.5em;\n}\n.tree-item[data-v-a358f3ad] {\n  margin-bottom: 8px;\n}\n.tree-node[data-v-a358f3ad] {\n  display: flex;\n  align-items: center;\n  padding: 8px;\n  background-color: var(--color-background-dark);\n  border-radius: 8px;\n}\n.tree-label[data-v-a358f3ad] {\n  flex-grow: 1;\n  font-weight: bold;\n}\n.tree-actions[data-v-a358f3ad] {\n  display: flex;\n  gap: 8px;\n}\n.tree-children[data-v-a358f3ad] {\n  margin-left: 20px;\n  margin-top: 8px;\n}\n\n/* Vos styles existants */\n.category-location-manager[data-v-df8a9cce] {\n  padding: 20px;\n}\n.tabs[data-v-df8a9cce] {\n  display: flex;\n  margin-bottom: 20px;\n  border-bottom: 1px solid var(--color-border);\n}\n.tabs button[data-v-df8a9cce] {\n  padding: 10px 20px;\n  border: none;\n  background: none;\n  cursor: pointer;\n  border-bottom: 2px solid transparent;\n}\n.tabs button.active[data-v-df8a9cce] {\n  border-bottom-color: var(--color-primary);\n  color: var(--color-primary);\n}\n.tab-content[data-v-df8a9cce] {\n  margin-top: 20px;\n}\n.add-form[data-v-df8a9cce] {\n  margin-bottom: 30px;\n  padding: 20px;\n  background: var(--color-background-dark);\n  border-radius: 8px;\n}\n.form-fields[data-v-df8a9cce] {\n  display: flex;\n  gap: 15px;\n  align-items: end;\n}\n.tree-view[data-v-df8a9cce] {\n  margin-top: 30px;\n}\n.tree-container[data-v-df8a9cce] {\n  margin-top: 15px;\n}\n.loading[data-v-df8a9cce],\n.error[data-v-df8a9cce] {\n  text-align: center;\n  padding: 40px;\n  color: var(--color-text-lighter);\n}\n.error[data-v-df8a9cce] {\n  color: var(--color-error);\n}\n.modal[data-v-df8a9cce] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n}\n.modal-content[data-v-df8a9cce] {\n  background: var(--color-main-background);\n  padding: 30px;\n  border-radius: 12px;\n  min-width: 400px;\n}\n.modal-actions[data-v-df8a9cce] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n  margin-top: 20px;\n}\n\n.inquiry-rights-management[data-v-54fc3f18] {\n  padding: 20px;\n  max-width: 700px;\n}\n.description[data-v-54fc3f18] {\n  color: var(--color-text-lighter);\n  margin-bottom: 25px;\n}\n.loading[data-v-54fc3f18],\n.error[data-v-54fc3f18] {\n  padding: 20px;\n  text-align: center;\n  color: var(--color-text-lighter);\n}\n.type-selection[data-v-54fc3f18] {\n  margin-bottom: 30px;\n}\n.type-selection label[data-v-54fc3f18] {\n  display: block;\n  margin-bottom: 8px;\n  font-weight: bold;\n}\n.type-select[data-v-54fc3f18] {\n  max-width: 300px;\n}\n.settings-container[data-v-54fc3f18] {\n  padding: 20px;\n  background-color: var(--color-background-dark);\n  border-radius: 8px;\n}\n.settings-container h3[data-v-54fc3f18] {\n  margin-top: 0;\n  margin-bottom: 20px;\n  padding-bottom: 10px;\n  border-bottom: 1px solid var(--color-border);\n}\n.settings-list[data-v-54fc3f18] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.setting-item[data-v-54fc3f18] {\n  padding: 15px;\n  background-color: var(--color-background-darker);\n  border-radius: 8px;\n}\n.setting-item label[data-v-54fc3f18] {\n  display: block;\n  margin-bottom: 8px;\n  font-weight: bold;\n}\n.editor-select[data-v-54fc3f18] {\n  max-width: 250px;\n  margin-top: 8px;\n}\n.setting-description[data-v-54fc3f18] {\n  margin: 8px 0 0 0;\n  font-size: 0.9em;\n  color: var(--color-text-lighter);\n  padding-left: 36px;\n}\n\n.rights-management[data-v-bd584daa] {\n  padding: 20px;\n  max-width: 700px;\n}\n.description[data-v-bd584daa] {\n  color: var(--color-text-lighter);\n  margin-bottom: 25px;\n}\n.rights-list[data-v-bd584daa] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.right-item[data-v-bd584daa] {\n  padding: 15px;\n  background-color: var(--color-background-dark);\n  border-radius: 8px;\n}\n.right-description[data-v-bd584daa] {\n  margin: 8px 0 0 0;\n  font-size: 0.9em;\n  color: var(--color-text-lighter);\n  padding-left: 36px;\n}\n\n.rights-management[data-v-cee931a9] {\n  padding: 20px;\n  max-width: 700px;\n}\n.description[data-v-cee931a9] {\n  color: var(--color-text-lighter);\n  margin-bottom: 25px;\n}\n.rights-list[data-v-cee931a9] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.right-item[data-v-cee931a9] {\n  padding: 15px;\n  background-color: var(--color-background-dark);\n  border-radius: 8px;\n}\n.right-description[data-v-cee931a9] {\n  margin: 8px 0 0 0;\n  font-size: 0.9em;\n  color: var(--color-text-lighter);\n  padding-left: 36px;\n}\n\n.moderation-status-settings[data-v-546051be] {\n  padding: 20px;\n  max-width: 1000px;\n}\n.settings-description[data-v-546051be] {\n  margin-bottom: 25px;\n  color: var(--color-text-lighter);\n}\n.inquiry-type-selector[data-v-546051be] {\n  margin-bottom: 30px;\n  padding: 20px;\n  background-color: var(--color-background-dark);\n  border-radius: 8px;\n}\n.status-list[data-v-546051be] {\n  margin-bottom: 30px;\n  padding: 20px;\n  background-color: var(--color-background-dark);\n  border-radius: 8px;\n}\n.empty-state[data-v-546051be] {\n  text-align: center;\n  padding: 40px;\n  color: var(--color-text-lighter);\n}\n.status-items[data-v-546051be] {\n  display: flex;\n  flex-direction: column;\n  gap: 15px;\n}\n.status-item[data-v-546051be] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 15px;\n  background-color: var(--color-background-darker);\n  border-radius: 8px;\n  border-left: 4px solid var(--color-primary);\n}\n.status-content[data-v-546051be] {\n  display: flex;\n  align-items: flex-start;\n  gap: 15px;\n  flex: 1;\n}\n.status-icon[data-v-546051be] {\n  width: 40px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: var(--color-primary);\n  color: white;\n  border-radius: 8px;\n  flex-shrink: 0;\n}\n.status-icon[data-v-546051be] svg {\n  fill: white;\n}\n.status-info h4[data-v-546051be] {\n  margin: 0 0 5px 0;\n  font-weight: 600;\n}\n.status-key[data-v-546051be] {\n  margin: 0 0 8px 0;\n  font-size: 0.9em;\n  color: var(--color-text-lighter);\n  font-family: monospace;\n}\n.status-description[data-v-546051be] {\n  margin: 0 0 10px 0;\n  color: var(--color-text-lighter);\n  font-size: 0.95em;\n}\n.status-properties[data-v-546051be] {\n  display: flex;\n  gap: 10px;\n}\n.status-badge[data-v-546051be] {\n  padding: 4px 8px;\n  border-radius: 12px;\n  font-size: 0.8em;\n  font-weight: 600;\n}\n.status-badge.final[data-v-546051be] {\n  background-color: var(--color-success);\n  color: white;\n}\n.status-badge.non-final[data-v-546051be] {\n  background-color: var(--color-warning);\n  color: white;\n}\n.status-actions[data-v-546051be] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.add-status-form[data-v-546051be] {\n  padding: 20px;\n  background-color: var(--color-background-dark);\n  border-radius: 8px;\n}\n.form-grid[data-v-546051be] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 20px;\n  align-items: start;\n}\n.checkbox-field[data-v-546051be] {\n  grid-column: span 2;\n}\n.field-description[data-v-546051be] {\n  margin: 5px 0 0 0;\n  font-size: 0.9em;\n  color: var(--color-text-lighter);\n}\n.modal-overlay[data-v-546051be] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 1000;\n}\n.modal-content[data-v-546051be] {\n  background-color: var(--color-main-background);\n  padding: 30px;\n  border-radius: 12px;\n  width: 600px;\n  max-width: 90%;\n  max-height: 90vh;\n  overflow-y: auto;\n}\n.modal-actions[data-v-546051be] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n  margin-top: 25px;\n  padding-top: 20px;\n  border-top: 1px solid var(--color-border);\n}\n@media (max-width: 768px) {\n.form-grid[data-v-546051be] {\n    grid-template-columns: 1fr;\n}\n.status-item[data-v-546051be] {\n    flex-direction: column;\n    align-items: stretch;\n    gap: 15px;\n}\n.status-actions[data-v-546051be] {\n    justify-content: center;\n}\n}"));
      document.head.appendChild(elementStyle);
    }
  } catch (e) {
    console.error("vite-plugin-css-injected-by-js", e);
  }
})();
const uo = "agora", co = "1.0.0rc1";
import { M as ge, c as y, o as c, h as s, w as p, B as v, e as n, u as e, t as o, g as P, b as A, _ as F, a as r, y as me, O as x, q as T, P as ye, Q as ne, S as re, T as ve, U as C, I as J, d as z, V as fe, z as he, J as W, f as X, G as ie, v as de, x as be, n as O, i as M, j as _e, p as Se } from "./NcEmptyContent-q-geAf0w-C5KNLRzH.chunk.mjs";
import { I as Y, N as L } from "./index-DIidhKUT.chunk.mjs";
import { b as U, L as k, m as ue, g as we, c as le, I as B, d as ee, S as se } from "./NcDashboardWidget-Wkx_9xKh-lkMdwGn7.chunk.mjs";
import { F as Ve } from "./FlexSettings-_g8tK2Ug.chunk.mjs";
import { N as $, a as E, b as D } from "./NcRichText-G8kzsdwx-8HncRjZ1.chunk.mjs";
import { _ as $e, a as Ie } from "./markdown-BJ66o-f9.chunk.mjs";
const q = ge("appSettings", { state: () => ({ allAccessGroups: [], allowCombo: true, allowPublicShares: true, allowAllAccess: true, allowInquiryCreation: true, allowInquiryDownload: true, autoArchive: false, autoDelete: false, autoArchiveOffset: 30, autoDeleteOffset: 30, defaultPrivacyUrl: "", defaultImprintUrl: "", disclaimer: "", imprintUrl: "", legalTermsInEmail: false, privacyUrl: "", showMailAddresses: false, showLogin: true, unrestrictedOwner: false, updateType: "noInquirying", useActivity: false, useCollaboration: true, useSiteLegalTerms: true, navigationInquiriesInList: true, finalPrivacyUrl: "", finalImprintUrl: "", comboGroups: [], publicSharesGroups: [], inquiryCreationGroups: [], inquiryDownloadGroups: [], showMailAddressesGroups: [], unrestrictedOwnerGroups: [], categoryTab: [], locationTab: [], moderationStatusTab: [], groups: [], inquiryTypeRights: {}, moderatorRights: { modifyInquiry: true, deleteInquiry: true, archiveInquiry: true }, officialRights: { modifyInquiry: false, deleteInquiry: false, archiveInquiry: true, approveInquiries: false, changeInquiryStatus: false }, status: { loadingGroups: false } }), actions: { async load() {
  try {
    console.log(" INTO THE LOAD ");
    const t = (await U.getAppSettings()).data.appSettings;
    return console.log(" APRE THE API THE LOAD ", t), this.$patch(t), t;
  } catch (d) {
    k.error("Error getting appSettings", { error: d });
  }
}, async write() {
  try {
    const d = await U.writeAppSettings(this.$state);
    this.$patch(d.data.appSettings);
  } catch (d) {
    if (d?.code === "ERR_CANCELED") return;
    throw k.error("Error writing appSettings", { error: d, appSettings: this.$state }), d;
  }
}, loadGroups(d) {
  this.$debounce(async () => {
    this.status.loadingGroups = true;
    try {
      const l = await U.getGroups(d);
      this.groups = l.data.groups, this.status.loadingGroups = false;
    } catch (l) {
      if (l?.code === "ERR_CANCELED") return;
      k.error("Error getting groups", { error: l }), this.status.loadingGroups = false;
    }
  }, 500)();
}, getStatusesForInquiryType(d) {
  return this.moderationStatusTab.filter((t) => t.inquiryType === d).sort((t, l) => (t.order || 0) - (l.order || 0));
}, async addStatusForInquiryType(d, t) {
  const a = this.getStatusesForInquiryType(d).length, i = { inquiryType: d, ...t, order: a };
  try {
    const m = await U.addModerationStatus(i);
    m.data.moderationStatus ? this.moderationStatusTab.push(m.data.moderationStatus) : this.moderationStatusTab.push(i);
  } catch (m) {
    k.error("Error adding moderation status", { error: m }), this.moderationStatusTab.push(i);
  }
}, async updateStatusForInquiryType(d, t, l) {
  const a = this.moderationStatusTab.findIndex((m) => m.inquiryType === d && m.id === t);
  if (a === -1) return;
  const i = { ...this.moderationStatusTab[a] };
  this.moderationStatusTab[a] = { ...this.moderationStatusTab[a], ...l };
  try {
    await U.updateModerationStatus(t, { ...i, ...l });
  } catch (m) {
    k.error("Error updating moderation status", { error: m }), this.moderationStatusTab[a] = i;
  }
}, async deleteStatusForInquiryType(d, t) {
  this.moderationStatusTab = this.moderationStatusTab.filter((l) => !(l.inquiryType === d && l.id === t)), this.reorderStatuses(d);
  try {
    await U.deleteModerationStatus(t);
  } catch (l) {
    k.error("Error deleting moderation status", { error: l }), this.moderationStatusTab.splice(backupIndex, 0, backupStatus), this.reorderStatuses(d);
  }
}, reorderStatuses(d) {
  this.getStatusesForInquiryType(d).forEach((l, a) => {
    const i = this.moderationStatusTab.findIndex((m) => m.inquiryType === d && m.id === l.statusId);
    i !== -1 && (this.moderationStatusTab[i].order = a);
  });
}, moveStatusUp(d, t) {
  const l = this.getStatusesForInquiryType(d), a = l.findIndex((i) => i.id === t);
  if (a > 0) {
    const i = l[a - 1], m = l[a], f = this.moderationStatusTab.findIndex((u) => u.inquiryType === d && u.statusId === i.statusId), g = this.moderationStatusTab.findIndex((u) => u.inquiryType === d && u.statusId === m.statusId);
    if (f !== -1 && g !== -1) {
      const u = this.moderationStatusTab[g].order;
      this.moderationStatusTab[g].order = this.moderationStatusTab[f].order, this.moderationStatusTab[f].order = u;
    }
    this.reorderStatuses(d);
  }
}, moveStatusDown(d, t) {
  const l = this.getStatusesForInquiryType(d), a = l.findIndex((i) => i.id === t);
  if (a < l.length - 1) {
    const i = l[a + 1], m = l[a], f = this.moderationStatusTab.findIndex((u) => u.inquiryType === d && u.statusId === i.statusId), g = this.moderationStatusTab.findIndex((u) => u.inquiryType === d && u.statusId === m.statusId);
    if (f !== -1 && g !== -1) {
      const u = this.moderationStatusTab[g].order;
      this.moderationStatusTab[g].order = this.moderationStatusTab[f].order, this.moderationStatusTab[f].order = u;
    }
    this.reorderStatuses(d);
  }
}, async addCategory(d, t = 0) {
  const a = (this.categoryTab.length > 0 ? Math.max(...this.categoryTab.map((i) => i.id)) : 0) + 1;
  try {
    await U.addCategory({ name: d, parentId: t }), this.categoryTab.push({ id: a, name: d, parentId: t });
  } catch (i) {
    k.error("Error getting appSettings", { error: i });
  }
}, async updateCategory(d, t, l) {
  const a = this.categoryTab.find((i) => i.id === d);
  try {
    await U.updateCategory(d, t, l), a && (a.name = t, a.parentId = l);
  } catch (i) {
    k.error("Error getting appSettings", { error: i });
  }
}, async deleteCategory(d) {
  const t = (l) => {
    this.categoryTab.filter((i) => i.parentId === l).forEach((i) => {
      t(i.id);
    }), this.categoryTab = this.categoryTab.filter((i) => i.id !== l);
  };
  try {
    await U.deleteCategory(d), t(d);
  } catch (l) {
    k.error("Error deleting category", { error: l });
  }
}, async addLocation(d, t = 0) {
  const a = (this.locationTab.length > 0 ? Math.max(...this.locationTab.map((i) => i.id)) : 0) + 1;
  try {
    await U.addLocation({ name: d, parentId: t }), this.locationTab.push({ id: a, name: d, parentId: t });
  } catch (i) {
    k.error("Error getting appSettings", { error: i });
  }
}, async updateLocation(d, t, l) {
  const a = this.locationTab.find((i) => i.id === d);
  try {
    await U.updateLocation(d, t, l), a && (a.name = t, a.parentId = l);
  } catch (i) {
    k.error("Error getting appSettings", { error: i });
  }
}, async deleteLocation(d) {
  const t = (l) => {
    this.locationTab.filter((i) => i.parentId === l).forEach((i) => {
      t(i.id);
    }), this.locationTab = this.locationTab.filter((i) => i.id !== l);
  };
  try {
    await U.deleteLocation(d), t(d);
  } catch (l) {
    k.error("Error deleting location", { error: l });
  }
}, buildTree(d, t = 0) {
  return d.filter((l) => l.parentId === t).map((l) => ({ ...l, children: this.buildTree(d, l.id) }));
}, getParentOptions(d, t = null) {
  const l = d === "category" ? this.categoryTab : this.locationTab, a = this.buildTree(l), i = [{ id: 0, name: "No parent" }], m = (f, g = 0) => {
    let u = [];
    return f.forEach((_) => {
      _.id !== t && u.push({ id: _.id, name: `${"--".repeat(g)} ${_.name}` }), _.children && _.children.length > 0 && (u = u.concat(m(_.children, g + 1)));
    }), u;
  };
  return i.concat(m(a));
} } }), qe = { class: "user_settings" }, Te = { __name: "AdminActivities", setup(d) {
  const t = q();
  return (l, a) => (c(), y("div", qe, [s(e($), { modelValue: e(t).useActivity, "onUpdate:modelValue": [a[0] || (a[0] = (i) => e(t).useActivity = i), a[1] || (a[1] = (i) => e(t).write())], type: "switch" }, { default: p(() => [v(n(e(o)("inquiries", "Enable the tracking of activities with the Activities app")), 1)]), _: 1 }, 8, ["modelValue"])]));
} }, Ae = { class: "user_settings" }, Ce = { __name: "AdminArchiveInquiries", setup(d) {
  const t = q();
  return (l, a) => (c(), y("div", Ae, [s(e($), { modelValue: e(t).autoArchive, "onUpdate:modelValue": [a[0] || (a[0] = (i) => e(t).autoArchive = i), a[1] || (a[1] = (i) => e(t).write())], type: "switch" }, { default: p(() => [v(n(e(o)("agora", "Enable the automatic inquiry archiving")), 1)]), _: 1 }, 8, ["modelValue"]), e(t).autoArchive ? (c(), P(e(Y), { key: 0, modelValue: e(t).autoArchiveOffset, "onUpdate:modelValue": a[2] || (a[2] = (i) => e(t).autoArchiveOffset = i), class: "settings_details", type: "number", inputmode: "numeric", "use-num-modifiers": "", label: e(o)("agora", "Days after which inquiries should be archived after closing"), onChange: a[3] || (a[3] = (i) => e(t).write()) }, null, 8, ["modelValue", "label"])) : A("", true)]));
} }, ke = { class: "user_settings" }, xe = { key: 0, class: "settings_details" }, Ee = { __name: "AdminCombo", setup(d) {
  const t = q();
  return (l, a) => (c(), y("div", ke, [s(e($), { modelValue: e(t).allowCombo, "onUpdate:modelValue": [a[0] || (a[0] = (i) => e(t).allowCombo = i), a[1] || (a[1] = (i) => e(t).write())], type: "switch" }, { default: p(() => [v(n(e(o)("agora", "Enable the usage of the combo view globally")), 1)]), _: 1 }, 8, ["modelValue"]), e(t).allowCombo ? A("", true) : (c(), y("div", xe, [s(e(E), { modelValue: e(t).comboGroups, "onUpdate:modelValue": [a[2] || (a[2] = (i) => e(t).comboGroups = i), a[3] || (a[3] = (i) => e(t).write())], "input-label": e(o)("agora", "Enable only for the following groups"), label: "displayName", options: e(t).groups, "user-select": true, multiple: true, loading: e(t).status.loadingGroups, placeholder: e(o)("agora", "Leave empty to disable globally"), onSearch: e(t).loadGroups }, null, 8, ["modelValue", "input-label", "options", "loading", "placeholder", "onSearch"])]))]));
} }, Le = { class: "user_settings" }, Ue = { __name: "AdminDeleteInquiries", setup(d) {
  const t = q();
  return (l, a) => (c(), y("div", Le, [s(e($), { modelValue: e(t).autoDelete, "onUpdate:modelValue": [a[0] || (a[0] = (i) => e(t).autoDelete = i), a[1] || (a[1] = (i) => e(t).write())], type: "switch" }, { default: p(() => [v(n(e(o)("agora", "Enable the automatic deletion of archived inquiries")), 1)]), _: 1 }, 8, ["modelValue"]), e(t).autoDelete ? (c(), P(e(Y), { key: 0, modelValue: e(t).autoDeleteOffset, "onUpdate:modelValue": a[2] || (a[2] = (i) => e(t).autoDeleteOffset = i), class: "settings_details", type: "number", inputmode: "numeric", "use-num-modifiers": "", label: e(o)("inquiries", "Days after which archived inquiries should be finally deleted"), onChange: a[3] || (a[3] = (i) => e(t).write()) }, null, 8, ["modelValue", "label"])) : A("", true)]));
} }, Ne = { name: "LanguageMarkdownIcon", emits: ["click"], props: { title: { type: String }, fillColor: { type: String, default: "currentColor" }, size: { type: Number, default: 24 } } }, Re = ["aria-hidden", "aria-label"], Oe = ["fill", "width", "height"], Me = { d: "M20.56 18H3.44C2.65 18 2 17.37 2 16.59V7.41C2 6.63 2.65 6 3.44 6H20.56C21.35 6 22 6.63 22 7.41V16.59C22 17.37 21.35 18 20.56 18M6.81 15.19V11.53L8.73 13.88L10.65 11.53V15.19H12.58V8.81H10.65L8.73 11.16L6.81 8.81H4.89V15.19H6.81M19.69 12H17.77V8.81H15.85V12H13.92L16.81 15.28L19.69 12Z" }, De = { key: 0 };
function Ge(d, t, l, a, i, m) {
  return c(), y("span", me(d.$attrs, { "aria-hidden": l.title ? null : "true", "aria-label": l.title, class: "material-design-icon language-markdown-icon", role: "img", onClick: t[0] || (t[0] = (f) => d.$emit("click", f)) }), [(c(), y("svg", { fill: l.fillColor, class: "material-design-icon__svg", width: l.size, height: l.size, viewBox: "0 0 24 24" }, [r("path", Me, [l.title ? (c(), y("title", De, n(l.title), 1)) : A("", true)])], 8, Oe))], 16, Re);
}
const Fe = F(Ne, [["render", Ge]]), Pe = { class: "user_settings" }, je = { class: "disclaimer_group" }, Ke = { class: "grow_title" }, He = ["innerHTML"], Je = { __name: "AdminEmail", setup(d) {
  const t = q(), l = { prefix: "disclaimer-" }, a = x(false), i = T(() => (ue.use(we(l)), ye.sanitize(ue.parse(t.disclaimer))));
  return (m, f) => (c(), y("div", Pe, [s(e($), { modelValue: e(t).legalTermsInEmail, "onUpdate:modelValue": [f[0] || (f[0] = (g) => e(t).legalTermsInEmail = g), f[1] || (f[1] = (g) => e(t).write())], type: "switch" }, { default: p(() => [v(n(e(o)("agora", "Add terms links also to the email footer")), 1)]), _: 1 }, 8, ["modelValue"]), r("div", je, [r("div", Ke, [r("span", null, n(e(o)("agora", "Additional email disclaimer")), 1), s(Fe)]), s(e($), { modelValue: a.value, "onUpdate:modelValue": f[2] || (f[2] = (g) => a.value = g), type: "switch", onChange: f[3] || (f[3] = (g) => e(t).write()) }, { default: p(() => [v(n(e(o)("agora", "Preview")), 1)]), _: 1 }, 8, ["modelValue"])]), ne(r("textarea", { "onUpdate:modelValue": f[4] || (f[4] = (g) => e(t).disclaimer = g), onChange: f[5] || (f[5] = (g) => e(t).write()) }, null, 544), [[re, !a.value], [ve, e(t).disclaimer]]), ne(r("div", { class: "inquiries-markdown", innerHTML: i.value }, null, 8, He), [[re, a.value]])]));
} }, ze = { class: "user_settings" }, Be = { class: "job_hints" }, Ze = { class: "job_buttons_section" }, Qe = { __name: "AdminJobs", setup(d) {
  const t = { text: o("agora", "Run autoreminder"), disabled: false }, l = { text: o("agora", "Run janitor"), disabled: false }, a = { text: o("agora", "Run notification"), disabled: false };
  async function i() {
    try {
      le.runAutoReminder(), t.disabled = true, t.text = o("agora", "Autoreminder started");
    } catch (g) {
      t.text = o("agora", "Autoreminder failed"), k.error("Error on executing autoreminder job", { error: g });
    } finally {
      t.disabled = true;
    }
  }
  async function m() {
    try {
      le.runJanitor(), l.text = o("agora", "Janitor started");
    } catch (g) {
      l.text = o("agora", "Janitor failed"), k.error("Error on executing janitor job", { error: g });
    } finally {
      l.disabled = true;
    }
  }
  async function f() {
    try {
      le.runNotification(), a.text = o("agora", "Notification started");
    } catch (g) {
      a.text = o("agora", "Notification failed"), k.error("Error on executing notification job", { error: g });
    } finally {
      a.disabled = true;
    }
  }
  return (g, u) => (c(), y("div", ze, [r("div", Be, [r("p", null, n(e(o)("agora", "Please understand, that the jobs were defined as asynchronous jobs by intention.")) + " " + n(e(o)("agora", "Only use them, if it is absolutely neccessary (i.error. your cron does not work properly) or for testing.")) + " " + n(e(o)("agora", "Starting the jobs does not mean, that the rules for these actions are overridden.")), 1), r("p", null, n(e(o)("agora", "Each job can only be run once. If you want to rerun them, you have to refresh the page.")) + " " + n(e(o)("agora", "If you want to see the result, please check the logs.")), 1)]), r("div", Ze, [s(e(C), { variant: "primary", "aria-label": t.text, disabled: t.disabled, onClick: u[0] || (u[0] = (_) => i()) }, { default: p(() => [v(n(t.text), 1)]), _: 1 }, 8, ["aria-label", "disabled"]), s(e(C), { variant: "primary", "aria-label": l.text, disabled: l.disabled, onClick: u[1] || (u[1] = (_) => m()) }, { default: p(() => [v(n(l.text), 1)]), _: 1 }, 8, ["aria-label", "disabled"]), s(e(C), { variant: "primary", "aria-label": a.text, disabled: a.disabled, onClick: u[2] || (u[2] = (_) => f()) }, { default: p(() => [v(n(a.text), 1)]), _: 1 }, 8, ["aria-label", "disabled"])])]));
} }, We = { class: "user_settings" }, Xe = { key: 0, class: "user_settings" }, Ye = { class: "settings-description" }, et = { __name: "AdminLegal", setup(d) {
  const t = q(), l = T(() => {
    let a = o("agora", "Enter the URL of your privacy policy"), i = o("agora", "Enter the URL of your legal notice");
    return t.defaultPrivacyUrl && (a = t.defaultPrivacyUrl), t.defaultImprintUrl && (i = t.defaultImprintUrl), { privacy: a, imprint: i };
  });
  return (a, i) => (c(), y(J, null, [r("div", We, [s(e($), { modelValue: e(t).useSiteLegalTerms, "onUpdate:modelValue": [i[0] || (i[0] = (m) => e(t).useSiteLegalTerms = m), i[1] || (i[1] = (m) => e(t).write())], type: "switch" }, { default: p(() => [v(n(e(o)("inquiries", "Use the default terms for public inquiries and enable the default footer")), 1)]), _: 1 }, 8, ["modelValue"])]), e(t).useSiteLegalTerms ? A("", true) : (c(), y("div", Xe, [r("p", Ye, n(e(o)("inquiries", "If you want to use different terms for public inquiries, enter them below.")), 1), s(e(Y), { modelValue: e(t).privacyUrl, "onUpdate:modelValue": i[2] || (i[2] = (m) => e(t).privacyUrl = m), type: "url", placeholder: l.value.privacy, label: e(o)("agora", "Privacy policy link:"), onChange: i[3] || (i[3] = (m) => e(t).write()) }, null, 8, ["modelValue", "placeholder", "label"]), s(e(Y), { modelValue: e(t).imprintUrl, "onUpdate:modelValue": i[4] || (i[4] = (m) => e(t).imprintUrl = m), type: "url", inputmode: "url", label: e(o)("agora", "Legal terms link:"), placeholder: l.value.imprint, onChange: i[5] || (i[5] = (m) => e(t).write()) }, null, 8, ["modelValue", "label", "placeholder"])]))], 64));
} }, tt = { class: "user_settings" }, at = z({ __name: "AdminPerformance", setup(d) {
  const t = q(), l = [{ value: "longInquirying", label: o("agora", 'Enable "long inquirying" for instant updates') }, { value: "periodicInquirying", label: o("agora", "Enable periodic requests of inquiry updates from the client") }, { value: "noInquirying", label: o("agora", "Disable automatic updates (inquiry must be reloaded to get updates)") }];
  return (a, i) => (c(), y("div", tt, [s(e($e), { modelValue: e(t).updateType, "onUpdate:modelValue": i[0] || (i[0] = (m) => e(t).updateType = m), options: l, onUpdate: i[1] || (i[1] = (m) => e(t).write()) }, null, 8, ["modelValue"])]));
} }), ot = { class: "tree-item" }, it = { class: "tree-label" }, lt = { class: "tree-actions" }, st = { key: 0, class: "tree-children" }, nt = z({ __name: "TreeItem", props: { item: { type: Object, default: () => ({ id: 0, name: "" }) }, items: { type: Array, default: () => [] }, level: { type: Number, default: 0 }, type: { type: String, default: "default" } }, emits: ["edit", "delete"], setup(d, { emit: t }) {
  const l = d, a = t, i = T(() => l.items.filter((g) => g.parentId === l.item.id)), m = () => {
    a("edit", l.item, l.type);
  }, f = () => {
    a("delete", l.item.id, l.type);
  };
  return (g, u) => {
    const _ = fe("TreeItem", true);
    return c(), y("div", ot, [r("div", { class: "tree-node", style: he("margin-left: " + d.level * 20 + "px") }, [r("span", it, n(d.item.name), 1), r("div", lt, [s(e(C), { onClick: m }, { default: p(() => [v(n(e(o)("agora", "Edit")), 1)]), _: 1 }), s(e(C), { onClick: f }, { default: p(() => [v(n(e(o)("agora", "Delete")), 1)]), _: 1 })])], 4), i.value.length > 0 ? (c(), y("div", st, [(c(true), y(J, null, W(i.value, (N) => (c(), P(_, { key: N.id, item: N, items: d.items, level: d.level + 1, type: d.type, onEdit: u[0] || (u[0] = (R) => g.$emit("edit", R, d.type)), onDelete: u[1] || (u[1] = (R) => g.$emit("delete", R, d.type)) }, null, 8, ["item", "items", "level", "type"]))), 128))])) : A("", true)]);
  };
} }), ce = F(nt, [["__scopeId", "data-v-a358f3ad"]]), rt = { class: "category-location-manager" }, dt = { key: 0, class: "loading" }, ut = { key: 1 }, ct = { class: "tabs" }, pt = { key: 0, class: "tab-content" }, gt = { class: "add-form" }, mt = { class: "form-fields" }, yt = { class: "tree-view" }, vt = { class: "tree-container" }, ft = { key: 1, class: "tab-content" }, ht = { class: "add-form" }, bt = { class: "form-fields" }, _t = { class: "tree-view" }, St = { class: "tree-container" }, wt = { key: 2, class: "modal" }, Vt = { class: "modal-content" }, $t = { class: "modal-actions" }, It = z({ __name: "AdminCategoryLocation", setup(d) {
  const t = q(), l = x({ value: 0, label: o("agora", "No parent") }), a = x({ value: 0, label: o("agora", "No parent") }), i = T(() => t.categoryTab || []), m = T(() => t.locationTab || []), f = x({ name: "", parentId: 0 }), g = x({ name: "", parentId: 0 }), u = x(null), _ = x("categories"), N = x(false);
  X(() => {
    N.value = true;
  });
  const R = T(() => {
    if (!Array.isArray(t.categoryTab)) return [];
    const S = K(t.categoryTab).map((b) => ({ value: b.id, label: `${"— ".repeat(b.depth ?? 0)}${b.name ?? "[no name]"}`, original: b }));
    return [{ value: 0, label: o("agora", "No parent") }, ...S];
  }), j = T(() => {
    if (!Array.isArray(t.locationTab)) return [];
    const S = K(t.locationTab).map((b) => ({ value: b.id, label: `${"— ".repeat(b.depth ?? 0)}${b.name ?? "[no name]"}`, original: b }));
    return [{ value: 0, label: o("agora", "No parent") }, ...S];
  });
  function K(S, b = 0, I = 0) {
    return Array.isArray(S) ? S.filter((G) => G?.parentId === b).map((G) => {
      const pe = K(S, G.id, I + 1);
      return { ...G, depth: I, children: pe };
    }).flatMap((G) => [G, ...G.children]) : [];
  }
  const te = T(() => u.value ? u.value.type === "category" ? R.value.filter((S) => S.value !== u.value.id) : j.value.filter((S) => S.value !== u.value.id) : []), ae = () => {
    if (f.value.name.trim()) {
      const S = l.value?.value || 0;
      console.log("Adding category:", f.value.name, "parent:", S), t.addCategory(f.value.name, S), f.value.name = "", l.value = { value: 0, label: o("agora", "No parent") };
    }
  }, oe = () => {
    if (g.value.name.trim()) {
      const S = a.value?.value || 0;
      console.log("Adding location:", g.value.name, "parent:", S), t.addLocation(g.value.name, S), g.value.name = "", a.value = { value: 0, label: o("agora", "No parent") };
    }
  }, Z = T({ get: () => {
    if (!u.value) return { value: 0, label: o("agora", "No parent") };
    const S = u.value.parentId || 0;
    return u.value.type === "category" ? R.value.find((b) => b.value === S) || { value: 0, label: o("agora", "No parent") } : j.value.find((b) => b.value === S) || { value: 0, label: o("agora", "No parent") };
  }, set: (S) => {
    u.value && S && (u.value.parentId = Number(S.value) || 0);
  } }), w = (S, b) => {
    u.value = { ...S, type: b, parentId: S.parentId || 0 };
  }, V = () => {
    u.value && (u.value.type === "category" ? t.updateCategory(u.value.id, u.value.name, u.value.parentId) : t.updateLocation(u.value.id, u.value.name, u.value.parentId), u.value = null);
  }, h = (S, b) => {
    if (confirm(o("agora", "Are you sure you want to delete this item?"))) try {
      b === "category" ? t.deleteCategory(S) : t.deleteLocation(S);
    } catch (I) {
      console.error("Error deleting item:", I), alert(o("agora", "Error deleting item"));
    }
  }, Q = T(() => i.value.filter((S) => S.parentId === 0)), H = T(() => m.value.filter((S) => S.parentId === 0));
  return (S, b) => (c(), y("div", rt, [N.value ? (c(), y("div", ut, [r("div", ct, [r("button", { class: ie({ active: _.value === "categories" }), onClick: b[0] || (b[0] = (I) => _.value = "categories") }, n(e(o)("agora", "Categories")), 3), r("button", { class: ie({ active: _.value === "locations" }), onClick: b[1] || (b[1] = (I) => _.value = "locations") }, n(e(o)("agora", "Locations")), 3)]), _.value === "categories" ? (c(), y("div", pt, [r("div", gt, [r("h3", null, n(e(o)("agora", "Add New Category")), 1), r("div", mt, [s(e(D), { modelValue: f.value.name, "onUpdate:modelValue": b[2] || (b[2] = (I) => f.value.name = I), label: e(o)("agora", "Category Name"), placeholder: e(o)("agora", "Enter category name") }, null, 8, ["modelValue", "label", "placeholder"]), s(e(E), { modelValue: l.value, "onUpdate:modelValue": b[3] || (b[3] = (I) => l.value = I), options: R.value, clearable: false, placeholder: e(o)("agora", "Select parent category") }, null, 8, ["modelValue", "options", "placeholder"]), s(e(C), { type: "primary", disabled: !f.value.name.trim(), onClick: ae }, { default: p(() => [v(n(e(o)("agora", "Add Category")), 1)]), _: 1 }, 8, ["disabled"])])]), r("div", yt, [r("h3", null, n(e(o)("agora", "Categories Tree")), 1), r("div", vt, [(c(true), y(J, null, W(Q.value, (I) => (c(), P(ce, { key: "cat-" + I.id, item: I, items: i.value, level: 0, type: "category", onEdit: w, onDelete: h }, null, 8, ["item", "items"]))), 128))])])])) : A("", true), _.value === "locations" ? (c(), y("div", ft, [r("div", ht, [r("h3", null, n(e(o)("agora", "Add New Location")), 1), r("div", bt, [s(e(D), { modelValue: g.value.name, "onUpdate:modelValue": b[4] || (b[4] = (I) => g.value.name = I), label: e(o)("agora", "Location Name"), placeholder: e(o)("agora", "Enter location name") }, null, 8, ["modelValue", "label", "placeholder"]), s(e(E), { modelValue: a.value, "onUpdate:modelValue": b[5] || (b[5] = (I) => a.value = I), options: j.value, clearable: false, placeholder: e(o)("agora", "Select parent location") }, null, 8, ["modelValue", "options", "placeholder"]), s(e(C), { type: "primary", disabled: !g.value.name.trim(), onClick: oe }, { default: p(() => [v(n(e(o)("agora", "Add Location")), 1)]), _: 1 }, 8, ["disabled"])])]), r("div", _t, [r("h3", null, n(e(o)("agora", "Locations Tree")), 1), r("div", St, [(c(true), y(J, null, W(H.value, (I) => (c(), P(ce, { key: "loc-" + I.id, item: I, items: m.value, level: 0, type: "location", onEdit: w, onDelete: h }, null, 8, ["item", "items"]))), 128))])])])) : A("", true), u.value ? (c(), y("div", wt, [r("div", Vt, [r("h3", null, n(e(o)("agora", "Edit")) + " " + n(u.value.type === "category" ? e(o)("agora", "Category") : e(o)("agora", "Location")), 1), s(e(D), { modelValue: u.value.name, "onUpdate:modelValue": b[6] || (b[6] = (I) => u.value.name = I), label: u.value.type === "category" ? e(o)("agora", "Category Name") : e(o)("agora", "Location Name") }, null, 8, ["modelValue", "label"]), s(e(E), { modelValue: Z.value, "onUpdate:modelValue": b[7] || (b[7] = (I) => Z.value = I), options: te.value, clearable: false, placeholder: e(o)("agora", "Select parent") }, null, 8, ["modelValue", "options", "placeholder"]), r("div", $t, [s(e(C), { onClick: b[8] || (b[8] = (I) => u.value = null) }, { default: p(() => [v(n(e(o)("agora", "Cancel")), 1)]), _: 1 }), s(e(C), { type: "primary", onClick: V }, { default: p(() => [v(n(e(o)("agora", "Save")), 1)]), _: 1 })])])])) : A("", true)])) : (c(), y("div", dt, n(e(o)("agora", "Loading categories and locations...")), 1))]));
} }), qt = F(It, [["__scopeId", "data-v-df8a9cce"]]), Tt = { class: "inquiry-rights-management" }, At = { class: "description" }, Ct = { key: 0, class: "loading" }, kt = { key: 1, class: "error" }, xt = { key: 2 }, Et = { class: "type-selection" }, Lt = { for: "inquiry-type-select" }, Ut = { class: "settings-container" }, Nt = { class: "settings-list" }, Rt = { class: "setting-item" }, Ot = { class: "setting-description" }, Mt = { class: "setting-item" }, Dt = { class: "setting-description" }, Gt = { class: "setting-item" }, Ft = { class: "setting-description" }, Pt = { class: "setting-item" }, jt = { for: "editor-type-select" }, Kt = { class: "setting-description" }, Ht = { __name: "AdminInquiryRights", setup(d) {
  const t = q(), l = x(""), a = x(true), i = [{ value: "wysiwyg", label: o("agora", "Rich Text Editor") }, { value: "textarea", label: o("agora", "Simple Text Area") }, { value: "texteditor", label: o("agora", "Nextcloud text editor") }];
  X(async () => {
    try {
      const g = Object.keys(B);
      g.length > 0 && (l.value = g[0]);
    } catch (g) {
      console.error("Failed to load inquiry types:", g);
    } finally {
      a.value = false;
    }
  });
  const m = T(() => Object.keys(B).map((g) => ({ value: g, label: B[g]?.label || g }))), f = T(() => l.value && B[l.value]);
  return de(l, (g) => {
    g.value && (l.value = g.value);
  }), (g, u) => (c(), y("div", Tt, [r("h2", null, n(e(o)("agora", "Inquiry Type Settings")), 1), r("p", At, n(e(o)("agora", "Configure default settings for each inquiry type")), 1), a.value ? (c(), y("div", Ct, n(e(o)("agora", "Loading inquiry types...")), 1)) : f.value ? (c(), y("div", xt, [r("div", Et, [r("label", Lt, n(e(o)("agora", "Select inquiry type:")), 1), s(e(E), { id: "inquiry-type-select", modelValue: l.value, "onUpdate:modelValue": u[0] || (u[0] = (_) => l.value = _), options: m.value, "value-field": "value", "label-field": "label", "track-bye": "value", clearable: false, class: "type-select" }, null, 8, ["modelValue", "options"])]), r("div", Ut, [r("h3", null, n(e(B)[l.value]?.label || l.value) + " " + n(e(o)("agora", "Settings")), 1), r("div", Nt, [r("div", Rt, [s(e($), { modelValue: e(t).inquiryTypeRights[l.value].supportInquiry, "onUpdate:modelValue": [u[1] || (u[1] = (_) => e(t).inquiryTypeRights[l.value].supportInquiry = _), u[2] || (u[2] = (_) => e(t).write())], type: "switch" }, { default: p(() => [v(n(e(o)("agora", "Allow support")), 1)]), _: 1 }, 8, ["modelValue"]), r("p", Ot, n(e(o)("agora", "Allow users to support this inquiry type")), 1)]), r("div", Mt, [s(e($), { modelValue: e(t).inquiryTypeRights[l.value].commentInquiry, "onUpdate:modelValue": [u[3] || (u[3] = (_) => e(t).inquiryTypeRights[l.value].commentInquiry = _), u[4] || (u[4] = (_) => e(t).write())], type: "switch" }, { default: p(() => [v(n(e(o)("agora", "Allow comments")), 1)]), _: 1 }, 8, ["modelValue"]), r("p", Dt, n(e(o)("agora", "Allow users to comment on this inquiry type")), 1)]), r("div", Gt, [s(e($), { modelValue: e(t).inquiryTypeRights[l.value].attachFileInquiry, "onUpdate:modelValue": [u[5] || (u[5] = (_) => e(t).inquiryTypeRights[l.value].attachFileInquiry = _), u[6] || (u[6] = (_) => e(t).write())], type: "switch" }, { default: p(() => [v(n(e(o)("agora", "Allow file attachments")), 1)]), _: 1 }, 8, ["modelValue"]), r("p", Ft, n(e(o)("agora", "Allow users to attach files to this inquiry type")), 1)]), r("div", Pt, [r("label", jt, n(e(o)("agora", "Editor type:")), 1), s(e(E), { id: "editor-type-select", modelValue: e(t).inquiryTypeRights[l.value].editorType, "onUpdate:modelValue": [u[7] || (u[7] = (_) => e(t).inquiryTypeRights[l.value].editorType = _), u[8] || (u[8] = (_) => e(t).write())], options: i, "option-value": "value", "option-label": "label", class: "editor-select" }, null, 8, ["modelValue"]), r("p", Kt, n(e(o)("agora", "Select the editor type for this inquiry")), 1)])])])])) : (c(), y("div", kt, n(e(o)("agora", "No inquiry types available")), 1))]));
} }, Jt = F(Ht, [["__scopeId", "data-v-54fc3f18"]]), zt = { class: "rights-management" }, Bt = { class: "description" }, Zt = { class: "rights-list" }, Qt = { class: "right-item" }, Wt = { class: "right-description" }, Xt = { class: "right-item" }, Yt = { class: "right-description" }, ea = { class: "right-item" }, ta = { class: "right-description" }, aa = { __name: "AdminModeratorRights", setup(d) {
  const t = q();
  return (l, a) => (c(), y("div", zt, [r("h2", null, n(e(o)("agora", "Moderator Rights")), 1), r("p", Bt, n(e(o)("agora", "Define permissions for users with moderator role")), 1), r("div", Zt, [r("div", Qt, [s(e($), { modelValue: e(t).moderatorRights.modifyInquiry, "onUpdate:modelValue": [a[0] || (a[0] = (i) => e(t).moderatorRights.modifyInquiry = i), a[1] || (a[1] = (i) => e(t).write())], type: "switch" }, { default: p(() => [v(n(e(o)("agora", "Modify inquiries")), 1)]), _: 1 }, 8, ["modelValue"]), r("p", Wt, n(e(o)("agora", "Allow moderators to modify existing inquiries")), 1)]), r("div", Xt, [s(e($), { modelValue: e(t).moderatorRights.deleteInquiry, "onUpdate:modelValue": [a[2] || (a[2] = (i) => e(t).moderatorRights.deleteInquiry = i), a[3] || (a[3] = (i) => e(t).write())], type: "switch" }, { default: p(() => [v(n(e(o)("agora", "Delete inquiries")), 1)]), _: 1 }, 8, ["modelValue"]), r("p", Yt, n(e(o)("agora", "Allow moderators to delete inquiries")), 1)]), r("div", ea, [s(e($), { modelValue: e(t).moderatorRights.archiveInquiry, "onUpdate:modelValue": [a[4] || (a[4] = (i) => e(t).moderatorRights.archiveInquiry = i), a[5] || (a[5] = (i) => e(t).write())], type: "switch" }, { default: p(() => [v(n(e(o)("agora", "Archive inquiries")), 1)]), _: 1 }, 8, ["modelValue"]), r("p", ta, n(e(o)("agora", "Allow moderators to archive inquiries")), 1)])])]));
} }, oa = F(aa, [["__scopeId", "data-v-bd584daa"]]), ia = { class: "rights-management" }, la = { class: "description" }, sa = { class: "rights-list" }, na = { class: "right-item" }, ra = { class: "right-description" }, da = { class: "right-item" }, ua = { class: "right-description" }, ca = { class: "right-item" }, pa = { class: "right-description" }, ga = { class: "right-item" }, ma = { class: "right-description" }, ya = { __name: "AdminOfficialRights", setup(d) {
  const t = q();
  return (l, a) => (c(), y("div", ia, [r("h2", null, n(e(o)("agora", "Official Rights")), 1), r("p", la, n(e(o)("agora", "Define permissions for users with official role")), 1), r("div", sa, [r("div", na, [s(e($), { modelValue: e(t).officialRights.modifyInquiry, "onUpdate:modelValue": [a[0] || (a[0] = (i) => e(t).officialRights.modifyInquiry = i), a[1] || (a[1] = (i) => e(t).write())], type: "switch" }, { default: p(() => [v(n(e(o)("agora", "Modify inquiries")), 1)]), _: 1 }, 8, ["modelValue"]), r("p", ra, n(e(o)("agora", "Allow officials to modify existing inquiries")), 1)]), r("div", da, [s(e($), { modelValue: e(t).officialRights.deleteInquiry, "onUpdate:modelValue": [a[2] || (a[2] = (i) => e(t).officialRights.deleteInquiry = i), a[3] || (a[3] = (i) => e(t).write())], type: "switch" }, { default: p(() => [v(n(e(o)("agora", "Delete inquiries")), 1)]), _: 1 }, 8, ["modelValue"]), r("p", ua, n(e(o)("agora", "Allow officials to delete inquiries")), 1)]), r("div", ca, [s(e($), { modelValue: e(t).officialRights.archiveInquiry, "onUpdate:modelValue": [a[4] || (a[4] = (i) => e(t).officialRights.archiveInquiry = i), a[5] || (a[5] = (i) => e(t).write())], type: "switch" }, { default: p(() => [v(n(e(o)("agora", "Archive inquiries")), 1)]), _: 1 }, 8, ["modelValue"]), r("p", pa, n(e(o)("agora", "Allow officials to archive inquiries")), 1)]), r("div", ga, [s(e($), { modelValue: e(t).officialRights.manageModerationStatus, "onUpdate:modelValue": [a[6] || (a[6] = (i) => e(t).officialRights.manageModerationStatus = i), a[7] || (a[7] = (i) => e(t).write())], type: "switch" }, { default: p(() => [v(n(e(o)("agora", "Moderation status")), 1)]), _: 1 }, 8, ["modelValue"]), r("p", ma, n(e(o)("agora", "Allow officials to manage Moderation status for all inquiry")), 1)])])]));
} }, va = F(ya, [["__scopeId", "data-v-cee931a9"]]), fa = { class: "moderation-status-settings" }, ha = { class: "inquiry-type-selector" }, ba = { class: "status-list" }, _a = { key: 0, class: "empty-state" }, Sa = { key: 1, class: "status-items" }, wa = { class: "status-content" }, Va = ["title"], $a = { class: "status-info" }, Ia = { class: "status-key" }, qa = { key: 0, class: "status-description" }, Ta = { class: "status-properties" }, Aa = { class: "status-actions" }, Ca = { class: "add-status-form" }, ka = { class: "form-grid" }, xa = { class: "checkbox-field" }, Ea = { class: "field-description" }, La = { key: 0, class: "modal-overlay" }, Ua = { class: "modal-content" }, Na = { class: "form-grid" }, Ra = { class: "checkbox-field" }, Oa = { class: "field-description" }, Ma = { class: "modal-actions" }, Da = z({ __name: "AdminModerationStatus", setup(d) {
  const t = q(), l = x(null), a = x(null), i = x({ statusKey: "", label: "", description: "", isFinal: false, icon: "ClockOutline" }), m = T(() => l.value?.id || ee.PETITION), f = T(() => l.value?.label || ee.PETITION.replace(/_/g, " "));
  X(() => {
    l.value || (l.value = _.value.find((w) => w.id === ee.PETITION) || _.value[0]);
  });
  const g = T(() => Object.keys(se).filter((w) => w !== "default").map((w) => ({ id: w, label: o("agora", w.replace(/([A-Z])/g, " $1").trim()) }))), u = (w) => se[w] || se.ClockOutline, _ = T(() => Object.values(ee).map((w) => ({ id: w, label: o("agora", w.replace(/_/g, " ").replace(/\b\w/g, (V) => V.toUpperCase())) }))), N = T(() => t.getStatusesForInquiryType(m.value));
  de(m, () => {
    a.value = null;
  });
  const R = () => {
    !i.value.statusKey || !i.value.label || (t.addStatusForInquiryType(m.value, { ...i.value, icon: String(i.value.icon) }), i.value = { statusKey: "", label: "", description: "", isFinal: false, icon: "ClockOutline" });
  }, j = (w) => {
    a.value = { id: w.id, statusKey: w.statusKey, label: w.label, description: w.description || "", isFinal: w.isFinal, icon: w.icon || "ClockOutline" }, t.updateStatusForInquiryType(m.value, w.id, { ...a.value, icon: String(a.value.icon) });
  }, K = () => {
    a.value && (t.addStatusForInquiryType(m.value, { ...a.value, icon: String(a.value.icon) }), a.value = null);
  }, te = (w) => {
    confirm(o("agora", "Are you sure you want to delete this status?")) && t.deleteStatusForInquiryType(m.value, w);
  }, ae = (w) => {
    t.moveStatusUp(m.value, w);
  }, oe = (w) => {
    t.moveStatusDown(m.value, w);
  }, Z = () => {
    a.value = null;
  };
  return (w, V) => (c(), y("div", fa, [r("div", ha, [r("h3", null, n(e(o)("agora", "Select Inquiry Type")), 1), s(e(E), { modelValue: l.value, "onUpdate:modelValue": V[0] || (V[0] = (h) => l.value = h), options: _.value, label: "label", "input-label": e(o)("agora", "Inquiry Type") }, null, 8, ["modelValue", "options", "input-label"])]), r("div", ba, [r("h3", null, n(e(o)("agora", "Statuses for {type}", { type: f.value })), 1), N.value.length === 0 ? (c(), y("div", _a, [r("p", null, n(e(o)("agora", "No statuses configured for this inquiry type.")), 1)])) : (c(), y("div", Sa, [(c(true), y(J, null, W(N.value, (h, Q) => (c(), y("div", { key: h.statusKey, class: "status-item" }, [r("div", wa, [r("div", { class: "status-icon", title: h.icon }, [(c(), P(be(u(h.icon)), { size: 20 }))], 8, Va), r("div", $a, [r("h4", null, n(h.label), 1), r("p", Ia, n(h.statusKey), 1), h.description ? (c(), y("p", qa, n(h.description), 1)) : A("", true), r("div", Ta, [r("span", { class: ie(["status-badge", h.isFinal ? "final" : "non-final"]) }, n(h.isFinal ? e(o)("agora", "Final") : e(o)("agora", "Non-Final")), 3)])])]), r("div", Aa, [s(e(C), { disabled: Q === 0, onClick: (H) => ae(h.statusKey) }, { default: p(() => [v(n(e(o)("agora", "Up")), 1)]), _: 2 }, 1032, ["disabled", "onClick"]), s(e(C), { disabled: Q === N.value.length - 1, onClick: (H) => oe(h.statusKey) }, { default: p(() => [v(n(e(o)("agora", "Down")), 1)]), _: 2 }, 1032, ["disabled", "onClick"]), s(e(C), { onClick: (H) => j(h) }, { default: p(() => [v(n(e(o)("agora", "Edit")), 1)]), _: 2 }, 1032, ["onClick"]), s(e(C), { onClick: (H) => te(h.id) }, { default: p(() => [v(n(e(o)("agora", "Delete")), 1)]), _: 2 }, 1032, ["onClick"])])]))), 128))]))]), r("div", Ca, [r("h3", null, n(e(o)("agora", "Add New Status")), 1), r("div", ka, [s(e(D), { modelValue: i.value.statusKey, "onUpdate:modelValue": V[1] || (V[1] = (h) => i.value.statusKey = h), label: e(o)("agora", "Status Key"), placeholder: e(o)("agora", "Enter unique status key"), required: "" }, null, 8, ["modelValue", "label", "placeholder"]), s(e(D), { modelValue: i.value.label, "onUpdate:modelValue": V[2] || (V[2] = (h) => i.value.label = h), label: e(o)("agora", "Label"), placeholder: e(o)("agora", "Enter display label"), required: "" }, null, 8, ["modelValue", "label", "placeholder"]), s(e(D), { modelValue: i.value.description, "onUpdate:modelValue": V[3] || (V[3] = (h) => i.value.description = h), label: e(o)("agora", "Description"), placeholder: e(o)("agora", "Enter description (optional)"), type: "textarea" }, null, 8, ["modelValue", "label", "placeholder"]), s(e(E), { modelValue: i.value.icon, "onUpdate:modelValue": V[4] || (V[4] = (h) => i.value.icon = h), options: g.value, label: "label", "input-label": e(o)("agora", "Select Icon") }, null, 8, ["modelValue", "options", "input-label"]), r("div", xa, [s(e($), { modelValue: i.value.isFinal, "onUpdate:modelValue": V[5] || (V[5] = (h) => i.value.isFinal = h), type: "switch" }, { default: p(() => [v(n(e(o)("agora", "Final Status")), 1)]), _: 1 }, 8, ["modelValue"]), r("p", Ea, n(e(o)("agora", "Final statuses cannot be changed once set")), 1)]), s(e(C), { type: "primary", disabled: !i.value.statusKey || !i.value.label, onClick: R }, { default: p(() => [v(n(e(o)("agora", "Add Status")), 1)]), _: 1 }, 8, ["disabled"])])]), a.value ? (c(), y("div", La, [r("div", Ua, [r("h3", null, n(e(o)("agora", "Edit Status")), 1), r("div", Na, [s(e(D), { modelValue: a.value.statusKey, "onUpdate:modelValue": V[6] || (V[6] = (h) => a.value.statusKey = h), label: e(o)("agora", "Status Key"), placeholder: e(o)("agora", "Enter unique status key"), required: "" }, null, 8, ["modelValue", "label", "placeholder"]), s(e(D), { modelValue: a.value.label, "onUpdate:modelValue": V[7] || (V[7] = (h) => a.value.label = h), label: e(o)("agora", "Label"), placeholder: e(o)("agora", "Enter display label"), required: "" }, null, 8, ["modelValue", "label", "placeholder"]), s(e(D), { modelValue: a.value.description, "onUpdate:modelValue": V[8] || (V[8] = (h) => a.value.description = h), label: e(o)("agora", "Description"), placeholder: e(o)("agora", "Enter description (optional)"), type: "textarea" }, null, 8, ["modelValue", "label", "placeholder"]), s(e(E), { modelValue: a.value.icon, "onUpdate:modelValue": V[9] || (V[9] = (h) => a.value.icon = h), options: g.value, label: "label", "input-label": e(o)("agora", "Select Icon") }, null, 8, ["modelValue", "options", "input-label"]), r("div", Ra, [s(e($), { modelValue: a.value.isFinal, "onUpdate:modelValue": V[10] || (V[10] = (h) => a.value.isFinal = h), type: "switch" }, { default: p(() => [v(n(e(o)("agora", "Final Status")), 1)]), _: 1 }, 8, ["modelValue"]), r("p", Oa, n(e(o)("agora", "Final statuses cannot be changed once set")), 1)])]), r("div", Ma, [s(e(C), { onClick: Z }, { default: p(() => [v(n(e(o)("agora", "Cancel")), 1)]), _: 1 }), s(e(C), { type: "primary", disabled: !a.value.statusKey || !a.value.label, onClick: K }, { default: p(() => [v(n(e(o)("agora", "Save Changes")), 1)]), _: 1 }, 8, ["disabled"])])])])) : A("", true)]));
} }), Ga = F(Da, [["__scopeId", "data-v-546051be"]]), Fa = { class: "user_settings" }, Pa = { key: 0, class: "settings_details" }, ja = { __name: "AdminInquiryCreation", setup(d) {
  const t = q();
  return (l, a) => (c(), y("div", Fa, [s(e($), { modelValue: e(t).allowInquiryCreation, "onUpdate:modelValue": [a[0] || (a[0] = (i) => e(t).allowInquiryCreation = i), a[1] || (a[1] = (i) => e(t).write())], type: "switch" }, { default: p(() => [v(n(e(o)("agora", "Enable the inquiry creation globally")), 1)]), _: 1 }, 8, ["modelValue"]), e(t).allowInquiryCreation ? A("", true) : (c(), y("div", Pa, [s(e(E), { modelValue: e(t).inquiryCreationGroups, "onUpdate:modelValue": [a[2] || (a[2] = (i) => e(t).inquiryCreationGroups = i), a[3] || (a[3] = (i) => e(t).write())], "input-label": e(o)("agora", "Enable only for the following groups"), label: "displayName", options: e(t).groups, "user-select": true, multiple: true, loading: l.isLoading, placeholder: e(o)("agora", "Leave empty to disable globally"), onSearch: e(t).loadGroups }, null, 8, ["modelValue", "input-label", "options", "loading", "placeholder", "onSearch"])]))]));
} }, Ka = { class: "user_settings" }, Ha = { __name: "AdminInquiriesInNavigation", setup(d) {
  const t = q();
  return (l, a) => (c(), y("div", Ka, [s(e($), { modelValue: e(t).navigationInquiriesInList, "onUpdate:modelValue": [a[0] || (a[0] = (i) => e(t).navigationInquiriesInList = i), a[1] || (a[1] = (i) => e(t).write())], type: "switch" }, { default: p(() => [v(n(e(o)("agora", "Load inquiries into the navigation.")), 1)]), _: 1 }, 8, ["modelValue"])]));
} }, Ja = { class: "user_settings" }, za = { key: 0, class: "settings_details" }, Ba = { __name: "AdminShareOpenInquiry", setup(d) {
  const t = q();
  return (l, a) => (c(), y("div", Ja, [s(e($), { modelValue: e(t).allowAllAccess, "onUpdate:modelValue": [a[0] || (a[0] = (i) => e(t).allowAllAccess = i), a[1] || (a[1] = (i) => e(t).write())], type: "switch" }, { default: p(() => [v(n(e(o)("agora", "Enable the creation of openly accessible inquiries globally")), 1)]), _: 1 }, 8, ["modelValue"]), e(t).allowAllAccess ? A("", true) : (c(), y("div", za, [s(e(E), { modelValue: e(t).allAccessGroups, "onUpdate:modelValue": [a[2] || (a[2] = (i) => e(t).allAccessGroups = i), a[3] || (a[3] = (i) => e(t).write())], "input-label": e(o)("agora", "Enable only for the following groups"), label: "displayName", options: e(t).groups, "user-select": true, multiple: true, loading: l.isLoading, placeholder: e(o)("agora", "Leave empty to disable globally"), onSearch: e(t).loadGroups }, null, 8, ["modelValue", "input-label", "options", "loading", "placeholder", "onSearch"])]))]));
} }, Za = { class: "user_settings" }, Qa = { key: 0, class: "settings_details" }, Wa = { __name: "AdminSharePublicCreate", setup(d) {
  const t = q();
  return (l, a) => (c(), y("div", Za, [s(e($), { modelValue: e(t).allowPublicShares, "onUpdate:modelValue": [a[0] || (a[0] = (i) => e(t).allowPublicShares = i), a[1] || (a[1] = (i) => e(t).write())], type: "switch" }, { default: p(() => [v(n(e(o)("agora", "Enable public shares of inquiries globally")), 1)]), _: 1 }, 8, ["modelValue"]), e(t).allowPublicShares ? A("", true) : (c(), y("div", Qa, [s(e(E), { modelValue: e(t).publicSharesGroups, "onUpdate:modelValue": [a[2] || (a[2] = (i) => e(t).publicSharesGroups = i), a[3] || (a[3] = (i) => e(t).write())], "input-label": e(o)("agora", "Enable only for the following groups"), label: "displayName", options: e(t).groups, "user-select": true, multiple: true, loading: l.isLoading, placeholder: e(o)("agora", "Leave empty to disable globally"), onSearch: e(t).loadGroups }, null, 8, ["modelValue", "input-label", "options", "loading", "placeholder", "onSearch"])]))]));
} }, Xa = { class: "user_settings" }, Ya = { __name: "AdminSharePublicShowLogin", setup(d) {
  const t = q();
  return (l, a) => (c(), y("div", Xa, [s(e($), { modelValue: e(t).showLogin, "onUpdate:modelValue": [a[0] || (a[0] = (i) => e(t).showLogin = i), a[1] || (a[1] = (i) => e(t).write())], type: "switch" }, { default: p(() => [v(n(e(o)("inquiries", "Enable the login option in the registration dialog of public inquiries")), 1)]), _: 1 }, 8, ["modelValue"])]));
} }, eo = { class: "user_settings" }, to = { key: 0, class: "settings_details" }, ao = { __name: "AdminShowMailAddresses", setup(d) {
  const t = q();
  return (l, a) => (c(), y("div", eo, [s(e($), { modelValue: e(t).showMailAddresses, "onUpdate:modelValue": [a[0] || (a[0] = (i) => e(t).showMailAddresses = i), a[1] || (a[1] = (i) => e(t).write())], type: "switch" }, { default: p(() => [v(n(e(o)("agora", "Show email addresses of internal accounts")), 1)]), _: 1 }, 8, ["modelValue"]), e(t).showMailAddresses ? A("", true) : (c(), y("div", to, [s(e(E), { modelValue: e(t).showMailAddressesGroups, "onUpdate:modelValue": [a[2] || (a[2] = (i) => e(t).showMailAddressesGroups = i), a[3] || (a[3] = (i) => e(t).write())], "input-label": e(o)("agora", "Show only to members of the following groups"), label: "displayName", options: e(t).groups, "user-select": true, multiple: true, loading: l.isLoading, placeholder: e(o)("agora", "Leave empty to disable globally."), onSearch: e(t).loadGroups }, null, 8, ["modelValue", "input-label", "options", "loading", "placeholder", "onSearch"])]))]));
} }, oo = { class: "user_settings" }, io = { key: 0, class: "settings_details" }, lo = { __name: "AdminUnrescrictedOwners", setup(d) {
  const t = q();
  return (l, a) => (c(), y("div", oo, [s(e($), { modelValue: e(t).unrestrictedOwner, "onUpdate:modelValue": [a[0] || (a[0] = (i) => e(t).unrestrictedOwner = i), a[1] || (a[1] = (i) => e(t).write())], type: "switch" }, { default: p(() => [v(n(e(o)("agora", "Enable unrestricted owners globally")), 1)]), _: 1 }, 8, ["modelValue"]), e(t).unrestrictedOwner ? A("", true) : (c(), y("div", io, [s(e(E), { modelValue: e(t).unrestrictedOwnerGroups, "onUpdate:modelValue": [a[2] || (a[2] = (i) => e(t).unrestrictedOwnerGroups = i), a[3] || (a[3] = (i) => e(t).write())], "input-label": e(o)("agora", "Enable only for the following groups"), label: "displayName", options: e(t).groups, "user-select": true, multiple: true, loading: e(t).status.loadingGroups, placeholder: e(o)("agora", "Leave empty to disable globally"), onSearch: e(t).loadGroups }, null, 8, ["modelValue", "input-label", "options", "loading", "placeholder", "onSearch"])])), s(Ie, { type: "info" }, { default: p(() => [r("p", null, n(e(o)("agora", "Effects on restricted owners:")), 1), r("ul", null, [r("li", null, n(e(o)("agora", "Anonymizing a inquiry of a restricted owner means that this inquiry is anonymous for everyone, including the owner.")), 1), r("li", null, n(e(o)("agora", "Deleting and changing inquiries of participants is not possible")), 1)])]), _: 1 })]));
} }, so = { key: 0 }, no = z({ __name: "AdminSettingsPage", setup(d) {
  const t = q(), l = x(false), a = { inquiryCategoryLocation: { name: o("agora", "Categories and Locations Management"), description: o("agora", "Change globally location and category (for all accounts)") }, inquiryModerationStatus: { name: o("agora", "Moderation status settings"), description: o("agora", "Configure moderation statuses for each type of inquiry. Moderators will be able to set these statuses on inquiries.") }, inquirySettings: { name: o("agora", "Inquiry settings"), description: o("agora", "Change inquiry settings globally (for all accounts)") }, inquiryRights: { name: o("agora", "Inquiry rights"), description: o("agora", "Change inquiry rights globally (for all accounts)") }, shareSettings: { name: o("agora", "Share settings"), description: o("agora", "Change share settings globally (for all accounts)") }, otherSettings: { name: o("agora", "Other settings"), description: o("agora", "Enable or disable individual features.") }, performanceSettings: { name: o("agora", "Performance settings"), description: o("agora", "If you are experiencing connection problems, change how auto updates are retrieved.") }, publicSettings: { name: o("agora", "Public inquiry registration dialog options"), description: o("agora", "These options regard the appearence of the registration dialog of public inquiries.") }, emailSettings: { name: o("agora", "Email options"), description: o("agora", "Add links to legal terms, if they exist and add an optional disclaimer to emails.") }, jobSettings: { name: o("agora", "Job control"), description: o("agora", "Manually start backgropund jobs, independent from the cron schedule.") } };
  return X(async () => {
    try {
      await t.load();
    } catch (i) {
      console.error("Failed to load data:", i);
    } finally {
      l.value = true;
    }
  }), (i, m) => l.value ? (c(), y("div", so, [s(e(Ve), null, { default: p(() => [s(e(L), null, { default: p(() => [s(e(L), O(M(a.inquirySettings)), { default: p(() => [s(e(ja)), s(e(lo)), s(e(Ce)), s(e(Ue))]), _: 1 }, 16), s(e(L), O(M(a.inquiryRights)), { default: p(() => [s(e(Jt)), s(e(oa)), s(e(va))]), _: 1 }, 16), s(e(L), O(M(a.shareSettings)), { default: p(() => [s(e(Ba)), s(e(Wa)), s(e(Ya)), s(e(et))]), _: 1 }, 16), s(e(L), O(M(a.otherSettings)), { default: p(() => [s(e(Te)), s(e(Ee)), s(e(ao))]), _: 1 }, 16), s(e(L), O(M(a.performanceSettings)), { default: p(() => [s(e(at)), s(e(Ha))]), _: 1 }, 16), s(e(L), O(M(a.emailSettings)), { default: p(() => [s(e(Je))]), _: 1 }, 16)]), _: 1 }), s(e(L), null, { default: p(() => [s(e(L), O(M(a.inquiryCategoryLocation)), { default: p(() => [s(e(qt))]), _: 1 }, 16), s(e(L), O(M(a.inquiryModerationStatus)), { default: p(() => [s(e(Ga))]), _: 1 }, 16)]), _: 1 }), s(e(L), null, { default: p(() => [s(e(L), O(M(a.jobSettings)), { default: p(() => [s(e(Qe))]), _: 1 }, 16)]), _: 1 })]), _: 1 })])) : A("", true);
} }), ro = _e(no).use(Se);
ro.mount("#content_agora");
//# sourceMappingURL=agora-adminSettings.mjs.map
