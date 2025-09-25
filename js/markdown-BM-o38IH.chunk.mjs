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
const appName = "agora";
const appVersion = "1.0.0-rc5";
import { a as _export_sfc, d as defineComponent, b as computed, H as mdiAlert, I as mdiInformation, J as mdiCheckboxMarkedCircle, K as mdiAlertDecagram, c as createElementBlock, o as openBlock, r as renderSlot, k as createBaseVNode, j as createVNode, G as normalizeClass, n as unref, L as NcIconSvgWrapper, l as createCommentVNode, t as toDisplayString, B as defineStore, _ as _export_sfc$1, f as createBlock, g as withCtx, x as normalizeProps, y as guardReactiveProps, m as mergeModels, u as useModel, M as Fragment, O as renderList, C as createTextVNode } from "./NcEmptyContent-q-geAf0w-DpSvTJqc.chunk.mjs";
import { b as useSessionStore, d as appSettings, L as Logger } from "./NcDashboardWidget-Wkx_9xKh-Bw6f1oJM.chunk.mjs";
import "./index-CZ70RVFy.chunk.mjs";
import { N as NcCheckboxRadioSwitch } from "./NcRichText-G8kzsdwx-IKlnWRaR.chunk.mjs";
const _hoisted_1$2 = ["role"];
const _hoisted_2$1 = {
  key: 0,
  class: "notecard__heading"
};
const _hoisted_3$1 = { class: "notecard__text" };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "NcNoteCard",
  props: {
    heading: { default: void 0 },
    showAlert: { type: Boolean },
    text: { default: void 0 },
    type: { default: "warning" }
  },
  setup(__props) {
    const props = __props;
    const shouldShowAlert = computed(() => props.showAlert || props.type === "error");
    const iconPath = computed(() => {
      switch (props.type) {
        case "error":
          return mdiAlertDecagram;
        case "success":
          return mdiCheckboxMarkedCircle;
        case "info":
          return mdiInformation;
        case "warning":
        default:
          return mdiAlert;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["notecard", `notecard--${_ctx.type}`]),
        role: shouldShowAlert.value ? "alert" : "note"
      }, [
        renderSlot(_ctx.$slots, "icon", {}, () => [
          createVNode(unref(NcIconSvgWrapper), {
            path: iconPath.value,
            class: normalizeClass(["notecard__icon", { "notecard__icon--heading": _ctx.heading }]),
            inline: ""
          }, null, 8, ["path", "class"])
        ], true),
        createBaseVNode("div", null, [
          _ctx.heading ? (openBlock(), createElementBlock("p", _hoisted_2$1, toDisplayString(_ctx.heading), 1)) : createCommentVNode("", true),
          renderSlot(_ctx.$slots, "default", {}, () => [
            createBaseVNode("p", _hoisted_3$1, toDisplayString(_ctx.text), 1)
          ], true)
        ])
      ], 10, _hoisted_1$2);
    };
  }
});
const NcNoteCard = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-1893b364"]]);
const DefaultModeratorRights = {
  changeInquiryStatus: true,
  deleteInquiry: true,
  archiveInquiry: true,
  transferInquiry: true,
  modifyInquiry: true,
  addShares: true,
  addSharesExternal: false,
  deanonymize: false
};
const DefaultOfficialRights = {
  changeInquiryStatus: false,
  deleteInquiry: false,
  archiveInquiry: false,
  transferInquiry: false,
  modifyInquiry: false
};
var ContentType = /* @__PURE__ */ ((ContentType2) => {
  ContentType2["Inquiry"] = "inquiry";
  ContentType2["Comment"] = "comment";
  ContentType2["Support"] = "support";
  ContentType2["Attachment"] = "attachment";
  ContentType2["Share"] = "share";
  return ContentType2;
})(ContentType || {});
function getCurrentUserType() {
  const sessionStore = useSessionStore();
  const currentUser = sessionStore.currentUser;
  if (!currentUser) return "guest";
  if (currentUser.isAdmin) return "admin";
  if (currentUser.isModerator) return "moderator";
  if (currentUser.isOfficial) return "user";
  return "user";
}
function getCurrentUserGroups() {
  const sessionStore = useSessionStore();
  const currentUser = sessionStore.currentUser;
  return currentUser?.groups || [];
}
function getCurrentModeratorRights() {
  const sessionStore = useSessionStore();
  const appSettings2 = useAppSettingsStore();
  const currentUser = sessionStore.currentUser;
  return currentUser?.isModerator ? appSettings2.moderatorRights : null;
}
function getCurrentOfficialRights() {
  const sessionStore = useSessionStore();
  const appSettings2 = useAppSettingsStore();
  const currentUser = sessionStore.currentUser;
  return currentUser?.isOfficial ? appSettings2.officialRights : null;
}
function isContentOwner(contentOwnerId) {
  const sessionStore = useSessionStore();
  const currentUser = sessionStore.currentUser;
  return currentUser?.id === contentOwnerId;
}
function canInquiryTypePerformAction(inquiryType, action) {
  const sessionStore = useSessionStore();
  const typeRights = sessionStore.appSettings.inquiryTypeRights[inquiryType];
  return typeRights?.[action] ?? false;
}
function hasGroupAccess(context) {
  if (!context.hasGroupRestrictions || context.userType === "guest") {
    return true;
  }
  if (context.userType === "admin" || context.userType === "moderator") {
    return true;
  }
  return context.userGroups.some((group) => context.allowedGroups.includes(group));
}
function isContentBlocked(context) {
  return context.isArchived || context.isDeleted || context.isLocked || context.isExpired;
}
function canViewToggle(context) {
  return [
    "admin",
    "owner",
    "moderator",
    "user"
    /* User */
  ].includes(
    context.userType
  );
}
function canDelete(context) {
  if (context.isDeleted) return false;
  if (context.userType === "admin" || context.isOwner) {
    return true;
  }
  if (context.userType === "moderator") {
    const moderatorRights = getCurrentModeratorRights();
    return moderatorRights?.deleteInquiry ?? false;
  }
  if (context.userType === "user") {
    const officialRights = getCurrentOfficialRights();
    return officialRights?.deleteInquiry ?? false;
  }
  return false;
}
function canRestore(context) {
  if (!(context.isArchived || context.isDeleted)) return false;
  if (context.userType === "admin" || context.isOwner) {
    return true;
  }
  if (context.userType === "moderator") {
    const moderatorRights = getCurrentModeratorRights();
    return moderatorRights?.archiveInquiry ?? false;
  }
  if (context.userType === "user") {
    const officialRights = getCurrentOfficialRights();
    return officialRights?.archiveInquiry ?? false;
  }
  return false;
}
function canArchive(context) {
  if (context.isArchived || context.isDeleted) return false;
  if (context.userType === "admin" || context.isOwner) {
    return true;
  }
  if (context.userType === "moderator") {
    const moderatorRights = getCurrentModeratorRights();
    return moderatorRights?.archiveInquiry ?? false;
  }
  if (context.userType === "user") {
    const officialRights = getCurrentOfficialRights();
    return officialRights?.archiveInquiry ?? false;
  }
  return false;
}
function canTransfer(context) {
  if (context.userType === "admin" || context.isOwner) {
    return true;
  }
  if (context.userType === "moderator") {
    const moderatorRights = getCurrentModeratorRights();
    return moderatorRights?.transferInquiry ?? false;
  }
  if (context.userType === "user") {
    const officialRights = getCurrentOfficialRights();
    return officialRights?.transferInquiry ?? false;
  }
  return false;
}
function canEdit(context) {
  if (context.isLocked || context.isArchived || context.isDeleted) {
    return false;
  }
  if (context.userType === "admin" || context.isOwner) {
    return true;
  }
  if (context.userType === "moderator") {
    const moderatorRights = getCurrentModeratorRights();
    return moderatorRights?.modifyInquiry ?? false;
  }
  if (context.userType === "user") {
    const officialRights = getCurrentOfficialRights();
    return officialRights?.modifyInquiry ?? false;
  }
  return false;
}
function canComment(context) {
  const appSettings2 = useAppSettingsStore();
  if (isContentBlocked(context)) {
    return false;
  }
  if (context.inquiryType && !canInquiryTypePerformAction(context.inquiryType, "commentInquiry")) {
    return false;
  }
  if (!hasGroupAccess(context)) {
    return false;
  }
  if (context.userType === "guest") {
    return context.isPublic && appSettings2.allowGuestComments;
  }
  return true;
}
function canSupport(context) {
  const appSettings2 = useSessionStore().appSettings;
  if (isContentBlocked(context)) {
    return false;
  }
  if (context.inquiryType && !canInquiryTypePerformAction(context.inquiryType, "supportInquiry")) {
    return false;
  }
  if (!hasGroupAccess(context)) {
    return false;
  }
  if (context.userType === "guest") {
    return context.isPublic && appSettings2.allowGuestSupport;
  }
  return true;
}
function createPermissionContextForContent(contentType, contentOwnerId, isPublic = true, isLocked = false, isExpired = false, isDeleted = false, isArchived = false, hasGroupRestrictions = false, allowedGroups = [], inquiryType) {
  const userType = getCurrentUserType();
  const userGroups = getCurrentUserGroups();
  const isOwner = isContentOwner(contentOwnerId);
  return {
    userType,
    contentType,
    isOwner,
    isPublic,
    isLocked,
    isExpired,
    isDeleted,
    isArchived,
    hasGroupRestrictions,
    userGroups,
    allowedGroups,
    inquiryType
  };
}
const useAppSettingsStore = defineStore("appSettings", {
  state: () => ({
    allAccessGroups: [],
    allowCombo: true,
    allowPublicShares: true,
    allowAllAccess: true,
    allowInquiryCreation: true,
    allowInquiryDownload: true,
    autoArchive: false,
    autoDelete: false,
    autoArchiveOffset: 30,
    autoDeleteOffset: 30,
    defaultPrivacyUrl: "",
    defaultImprintUrl: "",
    disclaimer: "",
    imprintUrl: "",
    legalTermsInEmail: false,
    privacyUrl: "",
    showMailAddresses: false,
    showLogin: true,
    unrestrictedOwner: false,
    updateType: "noInquirying",
    useActivity: false,
    useCollaboration: true,
    useSiteLegalTerms: true,
    navigationInquiriesInList: true,
    finalPrivacyUrl: "",
    finalImprintUrl: "",
    comboGroups: [],
    publicSharesGroups: [],
    inquiryCreationGroups: [],
    inquiryDownloadGroups: [],
    showMailAddressesGroups: [],
    unrestrictedOwnerGroups: [],
    categoryTab: [],
    locationTab: [],
    moderationStatusTab: [],
    groups: [],
    inquiryTypeRights: {},
    moderatorRights: { ...DefaultModeratorRights },
    officialRights: { ...DefaultOfficialRights },
    status: {
      loadingGroups: false
    }
  }),
  actions: {
    async load() {
      try {
        const response = await appSettings.getAppSettings();
        const settings = response.data.appSettings;
        this.$patch(settings);
        return settings;
      } catch (error) {
        Logger.error("Error getting appSettings", { error });
      }
    },
    async write() {
      try {
        const response = await appSettings.writeAppSettings(this.$state);
        this.$patch(response.data.appSettings);
      } catch (error) {
        if (error?.code === "ERR_CANCELED") {
          return;
        }
        Logger.error("Error writing appSettings", {
          error,
          appSettings: this.$state
        });
        throw error;
      }
    },
    loadGroups(query) {
      const debouncedLoad = this.$debounce(async () => {
        this.status.loadingGroups = true;
        try {
          const response = await appSettings.getGroups(query);
          this.groups = response.data.groups;
          this.status.loadingGroups = false;
        } catch (error) {
          if (error?.code === "ERR_CANCELED") {
            return;
          }
          Logger.error("Error getting groups", { error });
          this.status.loadingGroups = false;
        }
      }, 500);
      debouncedLoad();
    },
    // STORE FOR MODERATION STATUS
    // Get statuses for a specific inquiry type
    getStatusesForInquiryType(inquiryType) {
      return this.moderationStatusTab.filter((status) => status.inquiryType === inquiryType).sort((a, b) => (a.order || 0) - (b.order || 0));
    },
    // Add a new status for an inquiry type
    async addStatusForInquiryType(inquiryType, status) {
      const existingStatuses = this.getStatusesForInquiryType(inquiryType);
      const newOrder = existingStatuses.length;
      const newStatus = {
        inquiryType,
        ...status,
        order: newOrder
      };
      try {
        const response = await appSettings.addModerationStatus(newStatus);
        if (response.data.moderationStatus) {
          this.moderationStatusTab.push(response.data.moderationStatus);
        } else {
          this.moderationStatusTab.push(newStatus);
        }
      } catch (error) {
        Logger.error("Error adding moderation status", { error });
        this.moderationStatusTab.push(newStatus);
      }
    },
    // Update a status for an inquiry type
    async updateStatusForInquiryType(inquiryType, statusId, updates) {
      const index = this.moderationStatusTab.findIndex(
        (s) => s.inquiryType === inquiryType && s.id === statusId
      );
      if (index === -1) {
        return;
      }
      const originalStatus = { ...this.moderationStatusTab[index] };
      this.moderationStatusTab[index] = {
        ...this.moderationStatusTab[index],
        ...updates
      };
      try {
        await appSettings.updateModerationStatus(statusId, {
          ...originalStatus,
          ...updates
        });
      } catch (error) {
        Logger.error("Error updating moderation status", { error });
        this.moderationStatusTab[index] = originalStatus;
      }
    },
    // Delete a status for an inquiry type
    async deleteStatusForInquiryType(inquiryType, statusId) {
      this.moderationStatusTab = this.moderationStatusTab.filter(
        (s) => !(s.inquiryType === inquiryType && s.id === statusId)
      );
      this.reorderStatuses(inquiryType);
      try {
        await appSettings.deleteModerationStatus(statusId);
      } catch (error) {
        Logger.error("Error deleting moderation status", { error });
        this.moderationStatusTab.splice(backupIndex, 0, backupStatus);
        this.reorderStatuses(inquiryType);
      }
    },
    // Reorder statuses for an inquiry type
    reorderStatuses(inquiryType) {
      const statuses = this.getStatusesForInquiryType(inquiryType);
      statuses.forEach((status, index) => {
        const globalIndex = this.moderationStatusTab.findIndex(
          (s) => s.inquiryType === inquiryType && s.id === status.statusId
        );
        if (globalIndex !== -1) {
          this.moderationStatusTab[globalIndex].order = index;
        }
      });
    },
    // Move status up in order
    moveStatusUp(inquiryType, statusId) {
      const statuses = this.getStatusesForInquiryType(inquiryType);
      const currentIndex = statuses.findIndex((s) => s.id === statusId);
      if (currentIndex > 0) {
        const previousStatus = statuses[currentIndex - 1];
        const currentStatus = statuses[currentIndex];
        const previousGlobalIndex = this.moderationStatusTab.findIndex(
          (s) => s.inquiryType === inquiryType && s.statusId === previousStatus.statusId
        );
        const currentGlobalIndex = this.moderationStatusTab.findIndex(
          (s) => s.inquiryType === inquiryType && s.statusId === currentStatus.statusId
        );
        if (previousGlobalIndex !== -1 && currentGlobalIndex !== -1) {
          const tempOrder = this.moderationStatusTab[currentGlobalIndex].order;
          this.moderationStatusTab[currentGlobalIndex].order = this.moderationStatusTab[previousGlobalIndex].order;
          this.moderationStatusTab[previousGlobalIndex].order = tempOrder;
        }
        this.reorderStatuses(inquiryType);
      }
    },
    // Move status down in order
    moveStatusDown(inquiryType, statusId) {
      const statuses = this.getStatusesForInquiryType(inquiryType);
      const currentIndex = statuses.findIndex((s) => s.id === statusId);
      if (currentIndex < statuses.length - 1) {
        const nextStatus = statuses[currentIndex + 1];
        const currentStatus = statuses[currentIndex];
        const nextGlobalIndex = this.moderationStatusTab.findIndex(
          (s) => s.inquiryType === inquiryType && s.statusId === nextStatus.statusId
        );
        const currentGlobalIndex = this.moderationStatusTab.findIndex(
          (s) => s.inquiryType === inquiryType && s.statusId === currentStatus.statusId
        );
        if (nextGlobalIndex !== -1 && currentGlobalIndex !== -1) {
          const tempOrder = this.moderationStatusTab[currentGlobalIndex].order;
          this.moderationStatusTab[currentGlobalIndex].order = this.moderationStatusTab[nextGlobalIndex].order;
          this.moderationStatusTab[nextGlobalIndex].order = tempOrder;
        }
        this.reorderStatuses(inquiryType);
      }
    },
    // STORE FOR CATEGORY AND LOCATION MANAGEMENT
    async addCategory(name, parentId = 0) {
      const maxId = this.categoryTab.length > 0 ? Math.max(...this.categoryTab.map((c) => c.id)) : 0;
      const newId = maxId + 1;
      try {
        await appSettings.addCategory({
          name,
          parentId
        });
        this.categoryTab.push({
          id: newId,
          name,
          parentId
        });
      } catch (error) {
        Logger.error("Error getting appSettings", { error });
      }
    },
    async updateCategory(id, name, parentId) {
      const category = this.categoryTab.find((c) => c.id === id);
      try {
        await appSettings.updateCategory(id, name, parentId);
        if (category) {
          category.name = name;
          category.parentId = parentId;
        }
      } catch (error) {
        Logger.error("Error getting appSettings", { error });
      }
    },
    async deleteCategory(id) {
      const deleteRecursive = (categoryId) => {
        const children = this.categoryTab.filter((c) => c.parentId === categoryId);
        children.forEach((child) => {
          deleteRecursive(child.id);
        });
        this.categoryTab = this.categoryTab.filter((c) => c.id !== categoryId);
      };
      try {
        await appSettings.deleteCategory(id);
        deleteRecursive(id);
      } catch (error) {
        Logger.error("Error deleting category", { error });
      }
    },
    async addLocation(name, parentId = 0) {
      const maxId = this.locationTab.length > 0 ? Math.max(...this.locationTab.map((l) => l.id)) : 0;
      const newId = maxId + 1;
      try {
        await appSettings.addLocation({
          name,
          parentId
        });
        this.locationTab.push({
          id: newId,
          name,
          parentId
        });
      } catch (error) {
        Logger.error("Error getting appSettings", { error });
      }
    },
    async updateLocation(id, name, parentId) {
      const location = this.locationTab.find((l) => l.id === id);
      try {
        await appSettings.updateLocation(id, name, parentId);
        if (location) {
          location.name = name;
          location.parentId = parentId;
        }
      } catch (error) {
        Logger.error("Error getting appSettings", { error });
      }
    },
    async deleteLocation(id) {
      const deleteRecursive = (locationId) => {
        const children = this.locationTab.filter((l) => l.parentId === locationId);
        children.forEach((child) => {
          deleteRecursive(child.id);
        });
        this.locationTab = this.locationTab.filter((l) => l.id !== locationId);
      };
      try {
        await appSettings.deleteLocation(id);
        deleteRecursive(id);
      } catch (error) {
        Logger.error("Error deleting location", { error });
      }
    },
    // Helper to build tree structure from flat list
    buildTree(items, parentId = 0) {
      return items.filter((item) => item.parentId === parentId).map((item) => ({
        ...item,
        children: this.buildTree(items, item.id)
      }));
    },
    // Get parent options for select dropdowns
    getParentOptions(type, excludeId = null) {
      const items = type === "category" ? this.categoryTab : this.locationTab;
      const tree = this.buildTree(items);
      const options = [{ id: 0, name: "No parent" }];
      const flattenTree = (nodes, level = 0) => {
        let results = [];
        nodes.forEach((node) => {
          if (node.id !== excludeId) {
            results.push({
              id: node.id,
              name: `${"--".repeat(level)} ${node.name}`
            });
          }
          if (node.children && node.children.length > 0) {
            results = results.concat(flattenTree(node.children, level + 1));
          }
        });
        return results;
      };
      return options.concat(flattenTree(tree));
    }
  }
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "CardDiv",
  setup(__props, { expose: __expose }) {
    __expose();
    const __returned__ = { get NcNoteCard() {
      return NcNoteCard;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$1 = { class: "card-content" };
const _hoisted_2 = { class: "left-card-side" };
const _hoisted_3 = { class: "right-card-side" };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(
    $setup["NcNoteCard"],
    normalizeProps(guardReactiveProps(_ctx.$attrs)),
    {
      default: withCtx(() => [
        createBaseVNode("div", _hoisted_1$1, [
          createBaseVNode("div", _hoisted_2, [
            renderSlot(_ctx.$slots, "default")
          ]),
          createBaseVNode("div", _hoisted_3, [
            renderSlot(_ctx.$slots, "button")
          ])
        ])
      ]),
      _: 3
      /* FORWARDED */
    },
    16
    /* FULL_PROPS */
  );
}
const CardDiv = /* @__PURE__ */ _export_sfc$1(_sfc_main$1, [["render", _sfc_render$1], ["__file", "/var/www/nextcloud/apps/agora/src/components/Base/modules/CardDiv.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "RadioGroupDiv",
  props: /* @__PURE__ */ mergeModels({
    id: { type: String, required: false },
    options: { type: Array, required: true }
  }, {
    "modelValue": { type: String, ...{ required: true } },
    "modelModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["update"], ["update:modelValue"]),
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const model = useModel(__props, "modelValue");
    const RandId = () => Math.random().toString(36).replace(/[^a-z]+/g, "").slice(2, 12);
    const emit = __emit;
    const elementId = computed(() => __props.id ?? `rg-${RandId()}`);
    const __returned__ = { model, RandId, emit, elementId, get NcCheckboxRadioSwitch() {
      return NcCheckboxRadioSwitch;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1 = { class: "radio-group-div" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, [
    (openBlock(true), createElementBlock(
      Fragment,
      null,
      renderList($props.options, (option, index) => {
        return openBlock(), createBlock($setup["NcCheckboxRadioSwitch"], {
          key: option.value,
          modelValue: $setup.model,
          "onUpdate:modelValue": [
            _cache[0] || (_cache[0] = ($event) => $setup.model = $event),
            _cache[1] || (_cache[1] = ($event) => $setup.emit("update"))
          ],
          value: option.value,
          name: $setup.elementId + index,
          type: "radio"
        }, {
          default: withCtx(() => [
            createTextVNode(
              toDisplayString(option.label),
              1
              /* TEXT */
            )
          ]),
          _: 2
          /* DYNAMIC */
        }, 1032, ["modelValue", "value", "name"]);
      }),
      128
      /* KEYED_FRAGMENT */
    ))
  ]);
}
const RadioGroupDiv = /* @__PURE__ */ _export_sfc$1(_sfc_main, [["render", _sfc_render], ["__file", "/var/www/nextcloud/apps/agora/src/components/Base/modules/RadioGroupDiv.vue"]]);
export {
  CardDiv as C,
  RadioGroupDiv as R,
  ContentType as a,
  canSupport as b,
  createPermissionContextForContent as c,
  canComment as d,
  canTransfer as e,
  canEdit as f,
  canDelete as g,
  canRestore as h,
  canArchive as i,
  canViewToggle as j,
  useAppSettingsStore as u
};
//# sourceMappingURL=markdown-BM-o38IH.chunk.mjs.map
