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
const appName = "agora";
const appVersion = "1.0.0-rc5";
import { B as defineStore, _ as _export_sfc, c as createElementBlock, o as openBlock, k as createBaseVNode, j as createVNode, g as withCtx, C as createTextVNode, t as toDisplayString, b as computed, s as translate } from "./NcEmptyContent-q-geAf0w-DpSvTJqc.chunk.mjs";
import { I as InputDiv } from "./index-CZ70RVFy.chunk.mjs";
import { c as calendar, u as userSettings, L as Logger } from "./NcDashboardWidget-Wkx_9xKh-Bw6f1oJM.chunk.mjs";
import { N as NcCheckboxRadioSwitch } from "./NcRichText-G8kzsdwx-IKlnWRaR.chunk.mjs";
const usePreferencesStore = defineStore("preferences", {
  state: () => ({
    user: {
      calendarPeek: false,
      checkCalendars: [],
      checkCalendarsHoursBefore: 0,
      checkCalendarsHoursAfter: 0,
      defaultViewInquiry: "table-view",
      inquiryCombo: [],
      relevantOffset: 30,
      useNewInquiryDialogInNavigation: false,
      useNewInquiryInInquiryist: false,
      useCommentsAlternativeStyling: false,
      useAlternativeStyling: false,
      verboseInquiriesList: false
    },
    session: {
      manualViewInquiry: ""
    },
    availableCalendars: []
  }),
  getters: {
    viewInquiry(state) {
      if (state.session.manualViewInquiry) {
        return state.session.manualViewInquiry;
      }
      if (window.innerWidth > 480) {
        return state.user.defaultViewInquiry;
      }
      return "list-view";
    },
    useNcAppNavigationNew(state) {
      return !state.user.useNewInquiryDialogInNavigation && !state.user.useNewInquiryInInquiryist;
    },
    useActionAddInquiryInNavigation(state) {
      return state.user.useNewInquiryDialogInNavigation && !state.user.useNewInquiryInInquiryist;
    }
  },
  actions: {
    setCalendars(payload) {
      this.availableCalendars = payload.calendars;
    },
    addCheckCalendar(calendar2) {
      this.user.checkCalendars.push(calendar2.key);
      this.write();
    },
    removeCheckCalendar(calendar2) {
      const index = this.user.checkCalendars.indexOf(calendar2.key);
      if (index !== -1) {
        this.user.checkCalendars.splice(index, 1);
      }
      this.write();
    },
    setViewInquiry(viewMode) {
      this.session.manualViewInquiry = viewMode;
    },
    async load() {
      try {
        const response = await userSettings.getUserSettings();
        this.$patch({ user: response.data.preferences });
      } catch (error) {
        if (error?.code === "ERR_CANCELED") {
          return;
        }
        this.$reset();
        throw error;
      }
    },
    async write() {
      try {
        const response = await userSettings.writeUserSettings(this.user);
        this.$patch({ user: response.data.preferences });
      } catch (error) {
        if (error?.code === "ERR_CANCELED") {
          return;
        }
        Logger.error("Error writing preferences", {
          error,
          preferences: this.user
        });
        throw error;
      }
    },
    async getCalendars() {
      try {
        const response = await calendar.getCalendars();
        this.setCalendars({ calendars: response.data.calendars });
        return response;
      } catch (error) {
        if (error?.code === "ERR_CANCELED") {
          return;
        }
        throw error;
      }
    }
  }
});
const _sfc_main$1 = {
  __name: "FeatureSettings",
  setup(__props, { expose: __expose }) {
    __expose();
    const preferencesStore = usePreferencesStore();
    const defaultViewInquiry = computed({
      get() {
        return preferencesStore.user.defaultViewInquiry === "list-view";
      },
      set(value) {
        preferencesStore.user.defaultViewInquiry = value ? "list-view" : "table-view";
      }
    });
    const __returned__ = { preferencesStore, defaultViewInquiry, computed, get InputDiv() {
      return InputDiv;
    }, get t() {
      return translate;
    }, get NcCheckboxRadioSwitch() {
      return NcCheckboxRadioSwitch;
    }, get usePreferencesStore() {
      return usePreferencesStore;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1$1 = { class: "user_settings" };
const _hoisted_2$1 = { class: "settings_details" };
const _hoisted_3$1 = { class: "user_settings" };
const _hoisted_4$1 = { class: "settings_details" };
const _hoisted_5 = { class: "user_settings" };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$1, [
      createVNode($setup["NcCheckboxRadioSwitch"], {
        modelValue: $setup.defaultViewInquiry,
        "onUpdate:modelValue": [
          _cache[0] || (_cache[0] = ($event) => $setup.defaultViewInquiry = $event),
          _cache[1] || (_cache[1] = ($event) => $setup.preferencesStore.write())
        ],
        type: "switch"
      }, {
        default: withCtx(() => [
          createTextVNode(
            toDisplayString($setup.t("agora", "Proposal agora inquiry default view to list view")),
            1
            /* TEXT */
          )
        ]),
        _: 1
        /* STABLE */
      }, 8, ["modelValue"]),
      createBaseVNode(
        "div",
        _hoisted_2$1,
        toDisplayString($setup.t(
          "agora",
          "Check this, if you prefer to display text inquiry in grid view. The initial default is list view."
        )),
        1
        /* TEXT */
      )
    ]),
    createBaseVNode("div", _hoisted_3$1, [
      createVNode($setup["NcCheckboxRadioSwitch"], {
        modelValue: $setup.preferencesStore.user.verboseInquiriesList,
        "onUpdate:modelValue": [
          _cache[2] || (_cache[2] = ($event) => $setup.preferencesStore.user.verboseInquiriesList = $event),
          _cache[3] || (_cache[3] = ($event) => $setup.preferencesStore.write())
        ],
        type: "switch"
      }, {
        default: withCtx(() => [
          createTextVNode(
            toDisplayString($setup.t("agora", "Verbose inquiry list")),
            1
            /* TEXT */
          )
        ]),
        _: 1
        /* STABLE */
      }, 8, ["modelValue"]),
      createBaseVNode(
        "div",
        _hoisted_4$1,
        toDisplayString($setup.t("agora", "Check this for more inquiry information in the overview.")),
        1
        /* TEXT */
      )
    ]),
    createBaseVNode("div", _hoisted_5, [
      createVNode($setup["InputDiv"], {
        modelValue: $setup.preferencesStore.user.relevantOffset,
        "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.preferencesStore.user.relevantOffset = $event),
        type: "number",
        inputmode: "numeric",
        "use-num-modifiers": "",
        label: $setup.t(
          "agora",
          "Enter the amount of days, inquiries without activity stay in the relevant list:"
        ),
        onChange: _cache[5] || (_cache[5] = ($event) => $setup.preferencesStore.write())
      }, null, 8, ["modelValue", "label"])
    ])
  ]);
}
const FeatureSettings = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__file", "/var/www/nextcloud/apps/agora/src/components/Settings/UserSettings/FeatureSettings.vue"]]);
const _sfc_main = {
  __name: "StyleSettings",
  setup(__props, { expose: __expose }) {
    __expose();
    const preferencesStore = usePreferencesStore();
    const __returned__ = { preferencesStore, get t() {
      return translate;
    }, get NcCheckboxRadioSwitch() {
      return NcCheckboxRadioSwitch;
    }, get usePreferencesStore() {
      return usePreferencesStore;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1 = { class: "user_settings" };
const _hoisted_2 = { class: "user_settings" };
const _hoisted_3 = { class: "user_settings" };
const _hoisted_4 = { class: "user_settings" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [
    createBaseVNode(
      "b",
      null,
      toDisplayString($setup.t("agora", "The style settings are still experimental!")),
      1
      /* TEXT */
    ),
    createBaseVNode("div", _hoisted_1, [
      createVNode($setup["NcCheckboxRadioSwitch"], {
        modelValue: $setup.preferencesStore.user.useNewInquiryDialogInNavigation,
        "onUpdate:modelValue": [
          _cache[0] || (_cache[0] = ($event) => $setup.preferencesStore.user.useNewInquiryDialogInNavigation = $event),
          _cache[1] || (_cache[1] = ($event) => $setup.preferencesStore.write())
        ],
        type: "switch"
      }, {
        default: withCtx(() => [
          createTextVNode(
            toDisplayString($setup.t("agora", "Use modal 'Add inquiry ' dialog instead of embedded dialog in Navigation bar")),
            1
            /* TEXT */
          )
        ]),
        _: 1
        /* STABLE */
      }, 8, ["modelValue"])
    ]),
    createBaseVNode("div", _hoisted_2, [
      createVNode($setup["NcCheckboxRadioSwitch"], {
        modelValue: $setup.preferencesStore.user.useNewInquiryInInquiryist,
        "onUpdate:modelValue": [
          _cache[2] || (_cache[2] = ($event) => $setup.preferencesStore.user.useNewInquiryInInquiryist = $event),
          _cache[3] || (_cache[3] = ($event) => $setup.preferencesStore.write())
        ],
        type: "switch"
      }, {
        default: withCtx(() => [
          createTextVNode(
            toDisplayString($setup.t(
              "agora",
              "Use 'Add inquiry ' as button in inquiry list instead of inside the navigation"
            )),
            1
            /* TEXT */
          )
        ]),
        _: 1
        /* STABLE */
      }, 8, ["modelValue"])
    ]),
    createBaseVNode("div", _hoisted_3, [
      createVNode($setup["NcCheckboxRadioSwitch"], {
        modelValue: $setup.preferencesStore.user.useCommentsAlternativeStyling,
        "onUpdate:modelValue": [
          _cache[4] || (_cache[4] = ($event) => $setup.preferencesStore.user.useCommentsAlternativeStyling = $event),
          _cache[5] || (_cache[5] = ($event) => $setup.preferencesStore.write())
        ],
        type: "switch"
      }, {
        default: withCtx(() => [
          createTextVNode(
            toDisplayString($setup.t("agora", "Use alternative styling for the comments sidebar")),
            1
            /* TEXT */
          )
        ]),
        _: 1
        /* STABLE */
      }, 8, ["modelValue"])
    ]),
    createBaseVNode("div", _hoisted_4, [
      createVNode($setup["NcCheckboxRadioSwitch"], {
        modelValue: $setup.preferencesStore.user.useAlternativeStyling,
        "onUpdate:modelValue": [
          _cache[6] || (_cache[6] = ($event) => $setup.preferencesStore.user.useAlternativeStyling = $event),
          _cache[7] || (_cache[7] = ($event) => $setup.preferencesStore.write())
        ],
        type: "switch"
      }, {
        default: withCtx(() => [
          createTextVNode(
            toDisplayString($setup.t("agora", "Use alternative inquiry page styling")),
            1
            /* TEXT */
          )
        ]),
        _: 1
        /* STABLE */
      }, 8, ["modelValue"])
    ])
  ]);
}
const StyleSettings = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/var/www/nextcloud/apps/agora/src/components/Settings/UserSettings/StyleSettings.vue"]]);
export {
  FeatureSettings as F,
  StyleSettings as S,
  usePreferencesStore as u
};
//# sourceMappingURL=StyleSettings-Bl2d-fZa.chunk.mjs.map
