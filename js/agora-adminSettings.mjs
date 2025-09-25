(function() {
  "use strict";
  try {
    if (typeof document != "undefined") {
      var elementStyle = document.createElement("style");
      elementStyle.appendChild(document.createTextNode(".disclaimer_group {\n  display: flex;\n  align-items: center;\n  background-color: var(--color-background-dark);\n  border-radius: 8px;\n}\n.disclaimer_group .grow_title {\n  display: flex;\n  flex-grow: 1;\n  margin-inline-end: 12px;\n}\n.disclaimer_group .grow_title .material-design-icon {\n  margin-inline-start: 4px;\n}.user_settings {\n  background-color: var(--color-background-dark);\n  border-radius: 8px;\n}\n.user_settings .job_buttons_section {\n  display: flex;\n  flex-wrap: wrap;\n  margin-top: 20px;\n  gap: 12px;\n}\n.user_settings .job_hints p {\n  margin-bottom: 0.5em;\n}\n.tree-item[data-v-37a5142a] {\n  margin-bottom: 8px;\n}\n.tree-node[data-v-37a5142a] {\n  display: flex;\n  align-items: center;\n  padding: 8px;\n  background-color: var(--color-background-dark);\n  border-radius: 8px;\n}\n.tree-label[data-v-37a5142a] {\n  flex-grow: 1;\n  font-weight: bold;\n}\n.tree-actions[data-v-37a5142a] {\n  display: flex;\n  gap: 8px;\n}\n.tree-children[data-v-37a5142a] {\n  margin-left: 20px;\n  margin-top: 8px;\n}\n\n/* Vos styles existants */\n.category-location-manager[data-v-da2e3bfe] {\n  padding: 20px;\n}\n.tabs[data-v-da2e3bfe] {\n  display: flex;\n  margin-bottom: 20px;\n  border-bottom: 1px solid var(--color-border);\n}\n.tabs button[data-v-da2e3bfe] {\n  padding: 10px 20px;\n  border: none;\n  background: none;\n  cursor: pointer;\n  border-bottom: 2px solid transparent;\n}\n.tabs button.active[data-v-da2e3bfe] {\n  border-bottom-color: var(--color-primary);\n  color: var(--color-primary);\n}\n.tab-content[data-v-da2e3bfe] {\n  margin-top: 20px;\n}\n.add-form[data-v-da2e3bfe] {\n  margin-bottom: 30px;\n  padding: 20px;\n  background: var(--color-background-dark);\n  border-radius: 8px;\n}\n.form-fields[data-v-da2e3bfe] {\n  display: flex;\n  gap: 15px;\n  align-items: end;\n}\n.tree-view[data-v-da2e3bfe] {\n  margin-top: 30px;\n}\n.tree-container[data-v-da2e3bfe] {\n  margin-top: 15px;\n}\n.loading[data-v-da2e3bfe],\n.error[data-v-da2e3bfe] {\n  text-align: center;\n  padding: 40px;\n  color: var(--color-text-lighter);\n}\n.error[data-v-da2e3bfe] {\n  color: var(--color-error);\n}\n.modal[data-v-da2e3bfe] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n}\n.modal-content[data-v-da2e3bfe] {\n  background: var(--color-main-background);\n  padding: 30px;\n  border-radius: 12px;\n  min-width: 400px;\n}\n.modal-actions[data-v-da2e3bfe] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n  margin-top: 20px;\n}\n\n.inquiry-rights-management[data-v-d42bc411] {\n  padding: 20px;\n  max-width: 700px;\n}\n.description[data-v-d42bc411] {\n  color: var(--color-text-lighter);\n  margin-bottom: 25px;\n}\n.loading[data-v-d42bc411],\n.error[data-v-d42bc411] {\n  padding: 20px;\n  text-align: center;\n  color: var(--color-text-lighter);\n}\n.type-selection[data-v-d42bc411] {\n  margin-bottom: 30px;\n}\n.type-selection label[data-v-d42bc411] {\n  display: block;\n  margin-bottom: 8px;\n  font-weight: bold;\n}\n.type-select[data-v-d42bc411] {\n  max-width: 300px;\n}\n.settings-container[data-v-d42bc411] {\n  padding: 20px;\n  background-color: var(--color-background-dark);\n  border-radius: 8px;\n}\n.settings-container h3[data-v-d42bc411] {\n  margin-top: 0;\n  margin-bottom: 20px;\n  padding-bottom: 10px;\n  border-bottom: 1px solid var(--color-border);\n}\n.settings-list[data-v-d42bc411] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.setting-item[data-v-d42bc411] {\n  padding: 15px;\n  background-color: var(--color-background-darker);\n  border-radius: 8px;\n}\n.setting-item label[data-v-d42bc411] {\n  display: block;\n  margin-bottom: 8px;\n  font-weight: bold;\n}\n.editor-select[data-v-d42bc411] {\n  max-width: 250px;\n  margin-top: 8px;\n}\n.setting-description[data-v-d42bc411] {\n  margin: 8px 0 0 0;\n  font-size: 0.9em;\n  color: var(--color-text-lighter);\n  padding-left: 36px;\n}\n\n.rights-management[data-v-fb7cbc5e] {\n  padding: 20px;\n  max-width: 700px;\n}\n.description[data-v-fb7cbc5e] {\n  color: var(--color-text-lighter);\n  margin-bottom: 25px;\n}\n.rights-list[data-v-fb7cbc5e] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.right-item[data-v-fb7cbc5e] {\n  padding: 15px;\n  background-color: var(--color-background-dark);\n  border-radius: 8px;\n}\n.right-description[data-v-fb7cbc5e] {\n  margin: 8px 0 0 0;\n  font-size: 0.9em;\n  color: var(--color-text-lighter);\n  padding-left: 36px;\n}\n\n.rights-management[data-v-14c25bb2] {\n  padding: 20px;\n  max-width: 700px;\n}\n.description[data-v-14c25bb2] {\n  color: var(--color-text-lighter);\n  margin-bottom: 25px;\n}\n.rights-list[data-v-14c25bb2] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.right-item[data-v-14c25bb2] {\n  padding: 15px;\n  background-color: var(--color-background-dark);\n  border-radius: 8px;\n}\n.right-description[data-v-14c25bb2] {\n  margin: 8px 0 0 0;\n  font-size: 0.9em;\n  color: var(--color-text-lighter);\n  padding-left: 36px;\n}\n\n.moderation-status-settings[data-v-ab48ae64] {\n  padding: 20px;\n  max-width: 1000px;\n}\n.settings-description[data-v-ab48ae64] {\n  margin-bottom: 25px;\n  color: var(--color-text-lighter);\n}\n.inquiry-type-selector[data-v-ab48ae64] {\n  margin-bottom: 30px;\n  padding: 20px;\n  background-color: var(--color-background-dark);\n  border-radius: 8px;\n}\n.status-list[data-v-ab48ae64] {\n  margin-bottom: 30px;\n  padding: 20px;\n  background-color: var(--color-background-dark);\n  border-radius: 8px;\n}\n.empty-state[data-v-ab48ae64] {\n  text-align: center;\n  padding: 40px;\n  color: var(--color-text-lighter);\n}\n.status-items[data-v-ab48ae64] {\n  display: flex;\n  flex-direction: column;\n  gap: 15px;\n}\n.status-item[data-v-ab48ae64] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 15px;\n  background-color: var(--color-background-darker);\n  border-radius: 8px;\n  border-left: 4px solid var(--color-primary);\n}\n.status-content[data-v-ab48ae64] {\n  display: flex;\n  align-items: flex-start;\n  gap: 15px;\n  flex: 1;\n}\n.status-icon[data-v-ab48ae64] {\n  width: 40px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: var(--color-primary);\n  color: white;\n  border-radius: 8px;\n  flex-shrink: 0;\n}\n.status-icon[data-v-ab48ae64] svg {\n  fill: white;\n}\n.status-info h4[data-v-ab48ae64] {\n  margin: 0 0 5px 0;\n  font-weight: 600;\n}\n.status-key[data-v-ab48ae64] {\n  margin: 0 0 8px 0;\n  font-size: 0.9em;\n  color: var(--color-text-lighter);\n  font-family: monospace;\n}\n.status-description[data-v-ab48ae64] {\n  margin: 0 0 10px 0;\n  color: var(--color-text-lighter);\n  font-size: 0.95em;\n}\n.status-properties[data-v-ab48ae64] {\n  display: flex;\n  gap: 10px;\n}\n.status-badge[data-v-ab48ae64] {\n  padding: 4px 8px;\n  border-radius: 12px;\n  font-size: 0.8em;\n  font-weight: 600;\n}\n.status-badge.final[data-v-ab48ae64] {\n  background-color: var(--color-success);\n  color: white;\n}\n.status-badge.non-final[data-v-ab48ae64] {\n  background-color: var(--color-warning);\n  color: white;\n}\n.status-actions[data-v-ab48ae64] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.add-status-form[data-v-ab48ae64] {\n  padding: 20px;\n  background-color: var(--color-background-dark);\n  border-radius: 8px;\n}\n.form-grid[data-v-ab48ae64] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 20px;\n  align-items: start;\n}\n.checkbox-field[data-v-ab48ae64] {\n  grid-column: span 2;\n}\n.field-description[data-v-ab48ae64] {\n  margin: 5px 0 0 0;\n  font-size: 0.9em;\n  color: var(--color-text-lighter);\n}\n.modal-overlay[data-v-ab48ae64] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 1000;\n}\n.modal-content[data-v-ab48ae64] {\n  background-color: var(--color-main-background);\n  padding: 30px;\n  border-radius: 12px;\n  width: 600px;\n  max-width: 90%;\n  max-height: 90vh;\n  overflow-y: auto;\n}\n.modal-actions[data-v-ab48ae64] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n  margin-top: 25px;\n  padding-top: 20px;\n  border-top: 1px solid var(--color-border);\n}\n@media (max-width: 768px) {\n.form-grid[data-v-ab48ae64] {\n    grid-template-columns: 1fr;\n}\n.status-item[data-v-ab48ae64] {\n    flex-direction: column;\n    align-items: stretch;\n    gap: 15px;\n}\n.status-actions[data-v-ab48ae64] {\n    justify-content: center;\n}\n}"));
      document.head.appendChild(elementStyle);
    }
  } catch (e) {
    console.error("vite-plugin-css-injected-by-js", e);
  }
})();
const appName = "agora";
const appVersion = "1.0.0-rc5";
import { _ as _export_sfc, c as createElementBlock, o as openBlock, j as createVNode, g as withCtx, C as createTextVNode, t as toDisplayString, s as translate, f as createBlock, l as createCommentVNode, k as createBaseVNode, i as mergeProps, P as ref, b as computed, D as purify, Q as withDirectives, S as vShow, T as vModelText, U as NcButton, M as Fragment, d as defineComponent, V as resolveComponent, p as normalizeStyle, O as renderList, v as onMounted, G as normalizeClass, e as watch, h as resolveDynamicComponent, x as normalizeProps, y as guardReactiveProps, z as createApp, A as pinia } from "./NcEmptyContent-q-geAf0w-DpSvTJqc.chunk.mjs";
import { I as InputDiv, N as NcSettingsSection } from "./index-CZ70RVFy.chunk.mjs";
import { m as marked, g as gfmHeadingId, e as adminJobs, L as Logger, I as InquiryTypesUI, f as InquiryTypeValues, S as StatusIcons } from "./NcDashboardWidget-Wkx_9xKh-Bw6f1oJM.chunk.mjs";
import { F as FlexSettings } from "./FlexSettings-BTiWc4QN.chunk.mjs";
import { u as useAppSettingsStore, R as RadioGroupDiv, C as CardDiv } from "./markdown-BM-o38IH.chunk.mjs";
import { N as NcCheckboxRadioSwitch, a as NcSelect, b as NcInputField } from "./NcRichText-G8kzsdwx-IKlnWRaR.chunk.mjs";
const _sfc_main$l = {
  __name: "AdminActivities",
  setup(__props, { expose: __expose }) {
    __expose();
    const appSettingsStore = useAppSettingsStore();
    const __returned__ = { appSettingsStore, get t() {
      return translate;
    }, get NcCheckboxRadioSwitch() {
      return NcCheckboxRadioSwitch;
    }, get useAppSettingsStore() {
      return useAppSettingsStore;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1$l = { class: "user_settings" };
function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$l, [
    createVNode($setup["NcCheckboxRadioSwitch"], {
      modelValue: $setup.appSettingsStore.useActivity,
      "onUpdate:modelValue": [
        _cache[0] || (_cache[0] = ($event) => $setup.appSettingsStore.useActivity = $event),
        _cache[1] || (_cache[1] = ($event) => $setup.appSettingsStore.write())
      ],
      type: "switch"
    }, {
      default: withCtx(() => [
        createTextVNode(
          toDisplayString($setup.t("inquiries", "Enable the tracking of activities with the Activities app")),
          1
          /* TEXT */
        )
      ]),
      _: 1
      /* STABLE */
    }, 8, ["modelValue"])
  ]);
}
const AdminActivities = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$l], ["__file", "/var/www/nextcloud/apps/agora/src/components/Settings/AdminSettings/AdminActivities.vue"]]);
const _sfc_main$k = {
  __name: "AdminArchiveInquiries",
  setup(__props, { expose: __expose }) {
    __expose();
    const appSettingsStore = useAppSettingsStore();
    const __returned__ = { appSettingsStore, get InputDiv() {
      return InputDiv;
    }, get t() {
      return translate;
    }, get NcCheckboxRadioSwitch() {
      return NcCheckboxRadioSwitch;
    }, get useAppSettingsStore() {
      return useAppSettingsStore;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1$k = { class: "user_settings" };
function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$k, [
    createVNode($setup["NcCheckboxRadioSwitch"], {
      modelValue: $setup.appSettingsStore.autoArchive,
      "onUpdate:modelValue": [
        _cache[0] || (_cache[0] = ($event) => $setup.appSettingsStore.autoArchive = $event),
        _cache[1] || (_cache[1] = ($event) => $setup.appSettingsStore.write())
      ],
      type: "switch"
    }, {
      default: withCtx(() => [
        createTextVNode(
          toDisplayString($setup.t("agora", "Enable the automatic inquiry archiving")),
          1
          /* TEXT */
        )
      ]),
      _: 1
      /* STABLE */
    }, 8, ["modelValue"]),
    $setup.appSettingsStore.autoArchive ? (openBlock(), createBlock($setup["InputDiv"], {
      key: 0,
      modelValue: $setup.appSettingsStore.autoArchiveOffset,
      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.appSettingsStore.autoArchiveOffset = $event),
      class: "settings_details",
      type: "number",
      inputmode: "numeric",
      "use-num-modifiers": "",
      label: $setup.t("agora", "Days after which inquiries should be archived after closing"),
      onChange: _cache[3] || (_cache[3] = ($event) => $setup.appSettingsStore.write())
    }, null, 8, ["modelValue", "label"])) : createCommentVNode("v-if", true)
  ]);
}
const AdminArchiveInquiries = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$k], ["__file", "/var/www/nextcloud/apps/agora/src/components/Settings/AdminSettings/AdminArchiveInquiries.vue"]]);
const _sfc_main$j = {
  __name: "AdminDeleteInquiries",
  setup(__props, { expose: __expose }) {
    __expose();
    const appSettingsStore = useAppSettingsStore();
    const __returned__ = { appSettingsStore, get InputDiv() {
      return InputDiv;
    }, get t() {
      return translate;
    }, get NcCheckboxRadioSwitch() {
      return NcCheckboxRadioSwitch;
    }, get useAppSettingsStore() {
      return useAppSettingsStore;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1$j = { class: "user_settings" };
function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$j, [
    createVNode($setup["NcCheckboxRadioSwitch"], {
      modelValue: $setup.appSettingsStore.autoDelete,
      "onUpdate:modelValue": [
        _cache[0] || (_cache[0] = ($event) => $setup.appSettingsStore.autoDelete = $event),
        _cache[1] || (_cache[1] = ($event) => $setup.appSettingsStore.write())
      ],
      type: "switch"
    }, {
      default: withCtx(() => [
        createTextVNode(
          toDisplayString($setup.t("agora", "Enable the automatic deletion of archived inquiries")),
          1
          /* TEXT */
        )
      ]),
      _: 1
      /* STABLE */
    }, 8, ["modelValue"]),
    $setup.appSettingsStore.autoDelete ? (openBlock(), createBlock($setup["InputDiv"], {
      key: 0,
      modelValue: $setup.appSettingsStore.autoDeleteOffset,
      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.appSettingsStore.autoDeleteOffset = $event),
      class: "settings_details",
      type: "number",
      inputmode: "numeric",
      "use-num-modifiers": "",
      label: $setup.t("inquiries", "Days after which archived inquiries should be finally deleted"),
      onChange: _cache[3] || (_cache[3] = ($event) => $setup.appSettingsStore.write())
    }, null, 8, ["modelValue", "label"])) : createCommentVNode("v-if", true)
  ]);
}
const AdminDeleteInquiries = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$j], ["__file", "/var/www/nextcloud/apps/agora/src/components/Settings/AdminSettings/AdminDeleteInquiries.vue"]]);
const _sfc_main$i = {
  name: "LanguageMarkdownIcon",
  emits: ["click"],
  props: {
    title: {
      type: String
    },
    fillColor: {
      type: String,
      default: "currentColor"
    },
    size: {
      type: Number,
      default: 24
    }
  }
};
const _hoisted_1$i = ["aria-hidden", "aria-label"];
const _hoisted_2$e = ["fill", "width", "height"];
const _hoisted_3$9 = { d: "M20.56 18H3.44C2.65 18 2 17.37 2 16.59V7.41C2 6.63 2.65 6 3.44 6H20.56C21.35 6 22 6.63 22 7.41V16.59C22 17.37 21.35 18 20.56 18M6.81 15.19V11.53L8.73 13.88L10.65 11.53V15.19H12.58V8.81H10.65L8.73 11.16L6.81 8.81H4.89V15.19H6.81M19.69 12H17.77V8.81H15.85V12H13.92L16.81 15.28L19.69 12Z" };
const _hoisted_4$7 = { key: 0 };
function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("span", mergeProps(_ctx.$attrs, {
    "aria-hidden": $props.title ? null : "true",
    "aria-label": $props.title,
    class: "material-design-icon language-markdown-icon",
    role: "img",
    onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("click", $event))
  }), [
    (openBlock(), createElementBlock("svg", {
      fill: $props.fillColor,
      class: "material-design-icon__svg",
      width: $props.size,
      height: $props.size,
      viewBox: "0 0 24 24"
    }, [
      createBaseVNode("path", _hoisted_3$9, [
        $props.title ? (openBlock(), createElementBlock(
          "title",
          _hoisted_4$7,
          toDisplayString($props.title),
          1
          /* TEXT */
        )) : createCommentVNode("v-if", true)
      ])
    ], 8, _hoisted_2$e))
  ], 16, _hoisted_1$i);
}
const LanguageMarkdownIcon = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$i], ["__file", "/var/www/nextcloud/apps/agora/node_modules/vue-material-design-icons/LanguageMarkdown.vue"]]);
const _sfc_main$h = {
  __name: "AdminEmail",
  setup(__props, { expose: __expose }) {
    __expose();
    const appSettingsStore = useAppSettingsStore();
    const markedPrefix = {
      prefix: "disclaimer-"
    };
    const preview = ref(false);
    const markedDisclaimer = computed(() => {
      marked.use(gfmHeadingId(markedPrefix));
      return purify.sanitize(marked.parse(appSettingsStore.disclaimer));
    });
    const __returned__ = { appSettingsStore, markedPrefix, preview, markedDisclaimer, computed, ref, get marked() {
      return marked;
    }, get gfmHeadingId() {
      return gfmHeadingId;
    }, get DOMPurify() {
      return purify;
    }, LanguageMarkdownIcon, get t() {
      return translate;
    }, get useAppSettingsStore() {
      return useAppSettingsStore;
    }, get NcCheckboxRadioSwitch() {
      return NcCheckboxRadioSwitch;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1$h = { class: "user_settings" };
const _hoisted_2$d = { class: "disclaimer_group" };
const _hoisted_3$8 = { class: "grow_title" };
const _hoisted_4$6 = ["innerHTML"];
function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$h, [
    createVNode($setup["NcCheckboxRadioSwitch"], {
      modelValue: $setup.appSettingsStore.legalTermsInEmail,
      "onUpdate:modelValue": [
        _cache[0] || (_cache[0] = ($event) => $setup.appSettingsStore.legalTermsInEmail = $event),
        _cache[1] || (_cache[1] = ($event) => $setup.appSettingsStore.write())
      ],
      type: "switch"
    }, {
      default: withCtx(() => [
        createTextVNode(
          toDisplayString($setup.t("agora", "Add terms links also to the email footer")),
          1
          /* TEXT */
        )
      ]),
      _: 1
      /* STABLE */
    }, 8, ["modelValue"]),
    createBaseVNode("div", _hoisted_2$d, [
      createBaseVNode("div", _hoisted_3$8, [
        createBaseVNode(
          "span",
          null,
          toDisplayString($setup.t("agora", "Additional email disclaimer")),
          1
          /* TEXT */
        ),
        createVNode($setup["LanguageMarkdownIcon"])
      ]),
      createVNode($setup["NcCheckboxRadioSwitch"], {
        modelValue: $setup.preview,
        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.preview = $event),
        type: "switch",
        onChange: _cache[3] || (_cache[3] = ($event) => $setup.appSettingsStore.write())
      }, {
        default: withCtx(() => [
          createTextVNode(
            toDisplayString($setup.t("agora", "Preview")),
            1
            /* TEXT */
          )
        ]),
        _: 1
        /* STABLE */
      }, 8, ["modelValue"])
    ]),
    withDirectives(createBaseVNode(
      "textarea",
      {
        "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.appSettingsStore.disclaimer = $event),
        onChange: _cache[5] || (_cache[5] = ($event) => $setup.appSettingsStore.write())
      },
      null,
      544
      /* NEED_HYDRATION, NEED_PATCH */
    ), [
      [vShow, !$setup.preview],
      [vModelText, $setup.appSettingsStore.disclaimer]
    ]),
    createCommentVNode(" eslint-disable-next-line vue/no-v-html "),
    withDirectives(createBaseVNode("div", {
      class: "inquiries-markdown",
      innerHTML: $setup.markedDisclaimer
    }, null, 8, _hoisted_4$6), [
      [vShow, $setup.preview]
    ])
  ]);
}
const AdminEmail = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$h], ["__file", "/var/www/nextcloud/apps/agora/src/components/Settings/AdminSettings/AdminEmail.vue"]]);
const _sfc_main$g = {
  __name: "AdminJobs",
  setup(__props, { expose: __expose }) {
    __expose();
    const autoreminder = {
      text: translate("agora", "Run autoreminder"),
      disabled: false
    };
    const janitor = {
      text: translate("agora", "Run janitor"),
      disabled: false
    };
    const notification = {
      text: translate("agora", "Run notification"),
      disabled: false
    };
    async function runAutoReminderJob() {
      try {
        adminJobs.runAutoReminder();
        autoreminder.disabled = true;
        autoreminder.text = translate("agora", "Autoreminder started");
      } catch (error) {
        autoreminder.text = translate("agora", "Autoreminder failed");
        Logger.error("Error on executing autoreminder job", { error });
      } finally {
        autoreminder.disabled = true;
      }
    }
    async function runJanitorJob() {
      try {
        adminJobs.runJanitor();
        janitor.text = translate("agora", "Janitor started");
      } catch (error) {
        janitor.text = translate("agora", "Janitor failed");
        Logger.error("Error on executing janitor job", { error });
      } finally {
        janitor.disabled = true;
      }
    }
    async function runNotificationJob() {
      try {
        adminJobs.runNotification();
        notification.text = translate("agora", "Notification started");
      } catch (error) {
        notification.text = translate("agora", "Notification failed");
        Logger.error("Error on executing notification job", { error });
      } finally {
        notification.disabled = true;
      }
    }
    const __returned__ = { autoreminder, janitor, notification, runAutoReminderJob, runJanitorJob, runNotificationJob, get Logger() {
      return Logger;
    }, get t() {
      return translate;
    }, get NcButton() {
      return NcButton;
    }, get AdminAPI() {
      return adminJobs;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1$g = { class: "user_settings" };
const _hoisted_2$c = { class: "job_hints" };
const _hoisted_3$7 = { class: "job_buttons_section" };
function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$g, [
    createBaseVNode("div", _hoisted_2$c, [
      createBaseVNode(
        "p",
        null,
        toDisplayString($setup.t(
          "agora",
          "Please understand, that the jobs were defined as asynchronous jobs by intention."
        )) + " " + toDisplayString($setup.t(
          "agora",
          "Only use them, if it is absolutely neccessary (i.error. your cron does not work properly) or for testing."
        )) + " " + toDisplayString($setup.t(
          "agora",
          "Starting the jobs does not mean, that the rules for these actions are overridden."
        )),
        1
        /* TEXT */
      ),
      createBaseVNode(
        "p",
        null,
        toDisplayString($setup.t(
          "agora",
          "Each job can only be run once. If you want to rerun them, you have to refresh the page."
        )) + " " + toDisplayString($setup.t("agora", "If you want to see the result, please check the logs.")),
        1
        /* TEXT */
      )
    ]),
    createBaseVNode("div", _hoisted_3$7, [
      createVNode($setup["NcButton"], {
        variant: "primary",
        "aria-label": $setup.autoreminder.text,
        disabled: $setup.autoreminder.disabled,
        onClick: _cache[0] || (_cache[0] = ($event) => $setup.runAutoReminderJob())
      }, {
        default: withCtx(() => [
          createTextVNode(
            toDisplayString($setup.autoreminder.text),
            1
            /* TEXT */
          )
        ]),
        _: 1
        /* STABLE */
      }, 8, ["aria-label", "disabled"]),
      createVNode($setup["NcButton"], {
        variant: "primary",
        "aria-label": $setup.janitor.text,
        disabled: $setup.janitor.disabled,
        onClick: _cache[1] || (_cache[1] = ($event) => $setup.runJanitorJob())
      }, {
        default: withCtx(() => [
          createTextVNode(
            toDisplayString($setup.janitor.text),
            1
            /* TEXT */
          )
        ]),
        _: 1
        /* STABLE */
      }, 8, ["aria-label", "disabled"]),
      createVNode($setup["NcButton"], {
        variant: "primary",
        "aria-label": $setup.notification.text,
        disabled: $setup.notification.disabled,
        onClick: _cache[2] || (_cache[2] = ($event) => $setup.runNotificationJob())
      }, {
        default: withCtx(() => [
          createTextVNode(
            toDisplayString($setup.notification.text),
            1
            /* TEXT */
          )
        ]),
        _: 1
        /* STABLE */
      }, 8, ["aria-label", "disabled"])
    ])
  ]);
}
const AdminJobs = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$g], ["__file", "/var/www/nextcloud/apps/agora/src/components/Settings/AdminSettings/AdminJobs.vue"]]);
const _sfc_main$f = {
  __name: "AdminLegal",
  setup(__props, { expose: __expose }) {
    __expose();
    const appSettingsStore = useAppSettingsStore();
    const placeholder = computed(() => {
      let privacy = translate("agora", "Enter the URL of your privacy policy");
      let imprint = translate("agora", "Enter the URL of your legal notice");
      if (appSettingsStore.defaultPrivacyUrl) {
        privacy = appSettingsStore.defaultPrivacyUrl;
      }
      if (appSettingsStore.defaultImprintUrl) {
        imprint = appSettingsStore.defaultImprintUrl;
      }
      return {
        privacy,
        imprint
      };
    });
    const __returned__ = { appSettingsStore, placeholder, get InputDiv() {
      return InputDiv;
    }, get t() {
      return translate;
    }, get useAppSettingsStore() {
      return useAppSettingsStore;
    }, computed, get NcCheckboxRadioSwitch() {
      return NcCheckboxRadioSwitch;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1$f = { class: "user_settings" };
const _hoisted_2$b = {
  key: 0,
  class: "user_settings"
};
const _hoisted_3$6 = { class: "settings-description" };
function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(
    Fragment,
    null,
    [
      createBaseVNode("div", _hoisted_1$f, [
        createVNode($setup["NcCheckboxRadioSwitch"], {
          modelValue: $setup.appSettingsStore.useSiteLegalTerms,
          "onUpdate:modelValue": [
            _cache[0] || (_cache[0] = ($event) => $setup.appSettingsStore.useSiteLegalTerms = $event),
            _cache[1] || (_cache[1] = ($event) => $setup.appSettingsStore.write())
          ],
          type: "switch"
        }, {
          default: withCtx(() => [
            createTextVNode(
              toDisplayString($setup.t("inquiries", "Use the default terms for public inquiries and enable the default footer")),
              1
              /* TEXT */
            )
          ]),
          _: 1
          /* STABLE */
        }, 8, ["modelValue"])
      ]),
      !$setup.appSettingsStore.useSiteLegalTerms ? (openBlock(), createElementBlock("div", _hoisted_2$b, [
        createBaseVNode(
          "p",
          _hoisted_3$6,
          toDisplayString($setup.t("inquiries", "If you want to use different terms for public inquiries, enter them below.")),
          1
          /* TEXT */
        ),
        createVNode($setup["InputDiv"], {
          modelValue: $setup.appSettingsStore.privacyUrl,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.appSettingsStore.privacyUrl = $event),
          type: "url",
          placeholder: $setup.placeholder.privacy,
          label: $setup.t("agora", "Privacy policy link:"),
          onChange: _cache[3] || (_cache[3] = ($event) => $setup.appSettingsStore.write())
        }, null, 8, ["modelValue", "placeholder", "label"]),
        createVNode($setup["InputDiv"], {
          modelValue: $setup.appSettingsStore.imprintUrl,
          "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.appSettingsStore.imprintUrl = $event),
          type: "url",
          inputmode: "url",
          label: $setup.t("agora", "Legal terms link:"),
          placeholder: $setup.placeholder.imprint,
          onChange: _cache[5] || (_cache[5] = ($event) => $setup.appSettingsStore.write())
        }, null, 8, ["modelValue", "label", "placeholder"])
      ])) : createCommentVNode("v-if", true)
    ],
    64
    /* STABLE_FRAGMENT */
  );
}
const AdminLegal = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$f], ["__file", "/var/www/nextcloud/apps/agora/src/components/Settings/AdminSettings/AdminLegal.vue"]]);
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "AdminPerformance",
  setup(__props, { expose: __expose }) {
    __expose();
    const appSettingsStore = useAppSettingsStore();
    const updateTypeOptions = [
      {
        value: "longInquirying",
        label: translate("agora", 'Enable "long inquirying" for instant updates')
      },
      {
        value: "periodicInquirying",
        label: translate("agora", "Enable periodic requests of inquiry updates from the client")
      },
      {
        value: "noInquirying",
        label: translate("agora", "Disable automatic updates (inquiry must be reloaded to get updates)")
      }
    ];
    const __returned__ = { appSettingsStore, updateTypeOptions, get RadioGroupDiv() {
      return RadioGroupDiv;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$e = { class: "user_settings" };
function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$e, [
    createVNode($setup["RadioGroupDiv"], {
      modelValue: $setup.appSettingsStore.updateType,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.appSettingsStore.updateType = $event),
      options: $setup.updateTypeOptions,
      onUpdate: _cache[1] || (_cache[1] = ($event) => $setup.appSettingsStore.write())
    }, null, 8, ["modelValue"])
  ]);
}
const AdminPerformance = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$e], ["__file", "/var/www/nextcloud/apps/agora/src/components/Settings/AdminSettings/AdminPerformance.vue"]]);
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "TreeItem",
  props: {
    item: {
      type: Object,
      default: () => ({ id: 0, name: "" })
    },
    items: {
      type: Array,
      default: () => []
    },
    level: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: "default"
    }
  },
  emits: ["edit", "delete"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const emit = __emit;
    const children = computed(() => props.items.filter((i) => i.parentId === props.item.id));
    const editItem = () => {
      emit("edit", props.item, props.type);
    };
    const deleteItem = () => {
      emit("delete", props.item.id, props.type);
    };
    const __returned__ = { props, emit, children, editItem, deleteItem, get t() {
      return translate;
    }, get NcButton() {
      return NcButton;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$d = { class: "tree-item" };
const _hoisted_2$a = { class: "tree-label" };
const _hoisted_3$5 = { class: "tree-actions" };
const _hoisted_4$5 = {
  key: 0,
  class: "tree-children"
};
function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_TreeItem = resolveComponent("TreeItem", true);
  return openBlock(), createElementBlock("div", _hoisted_1$d, [
    createBaseVNode(
      "div",
      {
        class: "tree-node",
        style: normalizeStyle("margin-left: " + $props.level * 20 + "px")
      },
      [
        createBaseVNode(
          "span",
          _hoisted_2$a,
          toDisplayString($props.item.name),
          1
          /* TEXT */
        ),
        createBaseVNode("div", _hoisted_3$5, [
          createVNode($setup["NcButton"], { onClick: $setup.editItem }, {
            default: withCtx(() => [
              createTextVNode(
                toDisplayString($setup.t("agora", "Edit")),
                1
                /* TEXT */
              )
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode($setup["NcButton"], { onClick: $setup.deleteItem }, {
            default: withCtx(() => [
              createTextVNode(
                toDisplayString($setup.t("agora", "Delete")),
                1
                /* TEXT */
              )
            ]),
            _: 1
            /* STABLE */
          })
        ])
      ],
      4
      /* STYLE */
    ),
    $setup.children.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_4$5, [
      (openBlock(true), createElementBlock(
        Fragment,
        null,
        renderList($setup.children, (child) => {
          return openBlock(), createBlock(_component_TreeItem, {
            key: child.id,
            item: child,
            items: $props.items,
            level: $props.level + 1,
            type: $props.type,
            onEdit: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("edit", $event, $props.type)),
            onDelete: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("delete", $event, $props.type))
          }, null, 8, ["item", "items", "level", "type"]);
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ])) : createCommentVNode("v-if", true)
  ]);
}
const TreeItem = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$d], ["__scopeId", "data-v-37a5142a"], ["__file", "/var/www/nextcloud/apps/agora/src/components/Settings/AdminSettings/TreeItem.vue"]]);
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "AdminCategoryLocation",
  setup(__props, { expose: __expose }) {
    __expose();
    const appSettingsStore = useAppSettingsStore();
    const selectedCategory = ref({ value: 0, label: translate("agora", "No parent") });
    const selectedLocation = ref({ value: 0, label: translate("agora", "No parent") });
    const categories = computed(() => appSettingsStore.categoryTab || []);
    const locations = computed(() => appSettingsStore.locationTab || []);
    const newCategory = ref({ name: "", parentId: 0 });
    const newLocation = ref({ name: "", parentId: 0 });
    const editingItem = ref(null);
    const activeTab = ref("categories");
    const isLoaded = ref(false);
    onMounted(() => {
      isLoaded.value = true;
    });
    const hierarchicalCategory = computed(() => {
      if (!Array.isArray(appSettingsStore.categoryTab)) return [];
      const categoriesList = buildHierarchy(appSettingsStore.categoryTab).map((item) => ({
        value: item.id,
        label: `${"— ".repeat(item.depth ?? 0)}${item.name ?? "[no name]"}`,
        original: item
      }));
      return [{ value: 0, label: translate("agora", "No parent") }, ...categoriesList];
    });
    const hierarchicalLocation = computed(() => {
      if (!Array.isArray(appSettingsStore.locationTab)) return [];
      const locationsList = buildHierarchy(appSettingsStore.locationTab).map((item) => ({
        value: item.id,
        label: `${"— ".repeat(item.depth ?? 0)}${item.name ?? "[no name]"}`,
        original: item
      }));
      return [{ value: 0, label: translate("agora", "No parent") }, ...locationsList];
    });
    function buildHierarchy(list, parentId = 0, depth = 0) {
      if (!Array.isArray(list)) return [];
      return list.filter((item) => item?.parentId === parentId).map((item) => {
        const children = buildHierarchy(list, item.id, depth + 1);
        return {
          ...item,
          depth,
          children
        };
      }).flatMap((item) => [item, ...item.children]);
    }
    const editingOptions = computed(() => {
      if (!editingItem.value) return [];
      if (editingItem.value.type === "category") {
        return hierarchicalCategory.value.filter((opt) => opt.value !== editingItem.value.id);
      }
      return hierarchicalLocation.value.filter((opt) => opt.value !== editingItem.value.id);
    });
    const addCategory = () => {
      if (newCategory.value.name.trim()) {
        const parentId = selectedCategory.value?.value || 0;
        appSettingsStore.addCategory(newCategory.value.name, parentId);
        newCategory.value.name = "";
        selectedCategory.value = { value: 0, label: translate("agora", "No parent") };
      }
    };
    const addLocation = () => {
      if (newLocation.value.name.trim()) {
        const parentId = selectedLocation.value?.value || 0;
        appSettingsStore.addLocation(newLocation.value.name, parentId);
        newLocation.value.name = "";
        selectedLocation.value = { value: 0, label: translate("agora", "No parent") };
      }
    };
    const editingParent = computed({
      get: () => {
        if (!editingItem.value) return { value: 0, label: translate("agora", "No parent") };
        const parentId = editingItem.value.parentId || 0;
        if (editingItem.value.type === "category") {
          return hierarchicalCategory.value.find((opt) => opt.value === parentId) || {
            value: 0,
            label: translate("agora", "No parent")
          };
        }
        return hierarchicalLocation.value.find((opt) => opt.value === parentId) || {
          value: 0,
          label: translate("agora", "No parent")
        };
      },
      set: (selectedOption) => {
        if (editingItem.value && selectedOption) {
          editingItem.value.parentId = Number(selectedOption.value) || 0;
        }
      }
    });
    const editItem = (item, type) => {
      editingItem.value = {
        ...item,
        type,
        parentId: item.parentId || 0
      };
    };
    const saveEdit = () => {
      if (editingItem.value) {
        if (editingItem.value.type === "category") {
          appSettingsStore.updateCategory(
            editingItem.value.id,
            editingItem.value.name,
            editingItem.value.parentId
          );
        } else {
          appSettingsStore.updateLocation(
            editingItem.value.id,
            editingItem.value.name,
            editingItem.value.parentId
          );
        }
        editingItem.value = null;
      }
    };
    const deleteItem = (id, type) => {
      if (confirm(translate("agora", "Are you sure you want to delete this item?"))) {
        try {
          if (type === "category") {
            appSettingsStore.deleteCategory(id);
          } else {
            appSettingsStore.deleteLocation(id);
          }
        } catch (error) {
          console.error("Error deleting item:", error);
          alert(translate("agora", "Error deleting item"));
        }
      }
    };
    const rootCategories = computed(() => categories.value.filter((item) => item.parentId === 0));
    const rootLocations = computed(() => locations.value.filter((item) => item.parentId === 0));
    const __returned__ = { appSettingsStore, selectedCategory, selectedLocation, categories, locations, newCategory, newLocation, editingItem, activeTab, isLoaded, hierarchicalCategory, hierarchicalLocation, buildHierarchy, editingOptions, addCategory, addLocation, editingParent, editItem, saveEdit, deleteItem, rootCategories, rootLocations, get t() {
      return translate;
    }, get NcButton() {
      return NcButton;
    }, get NcInputField() {
      return NcInputField;
    }, get NcSelect() {
      return NcSelect;
    }, TreeItem };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$c = { class: "category-location-manager" };
const _hoisted_2$9 = {
  key: 0,
  class: "loading"
};
const _hoisted_3$4 = { key: 1 };
const _hoisted_4$4 = { class: "tabs" };
const _hoisted_5$4 = {
  key: 0,
  class: "tab-content"
};
const _hoisted_6$4 = { class: "add-form" };
const _hoisted_7$4 = { class: "form-fields" };
const _hoisted_8$4 = { class: "tree-view" };
const _hoisted_9$4 = { class: "tree-container" };
const _hoisted_10$3 = {
  key: 1,
  class: "tab-content"
};
const _hoisted_11$3 = { class: "add-form" };
const _hoisted_12$2 = { class: "form-fields" };
const _hoisted_13$2 = { class: "tree-view" };
const _hoisted_14$2 = { class: "tree-container" };
const _hoisted_15$2 = {
  key: 2,
  class: "modal"
};
const _hoisted_16$2 = { class: "modal-content" };
const _hoisted_17$2 = { class: "modal-actions" };
function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$c, [
    !$setup.isLoaded ? (openBlock(), createElementBlock(
      "div",
      _hoisted_2$9,
      toDisplayString($setup.t("agora", "Loading categories and locations...")),
      1
      /* TEXT */
    )) : (openBlock(), createElementBlock("div", _hoisted_3$4, [
      createBaseVNode("div", _hoisted_4$4, [
        createBaseVNode(
          "button",
          {
            class: normalizeClass({ active: $setup.activeTab === "categories" }),
            onClick: _cache[0] || (_cache[0] = ($event) => $setup.activeTab = "categories")
          },
          toDisplayString($setup.t("agora", "Categories")),
          3
          /* TEXT, CLASS */
        ),
        createBaseVNode(
          "button",
          {
            class: normalizeClass({ active: $setup.activeTab === "locations" }),
            onClick: _cache[1] || (_cache[1] = ($event) => $setup.activeTab = "locations")
          },
          toDisplayString($setup.t("agora", "Locations")),
          3
          /* TEXT, CLASS */
        )
      ]),
      $setup.activeTab === "categories" ? (openBlock(), createElementBlock("div", _hoisted_5$4, [
        createBaseVNode("div", _hoisted_6$4, [
          createBaseVNode(
            "h3",
            null,
            toDisplayString($setup.t("agora", "Add New Category")),
            1
            /* TEXT */
          ),
          createBaseVNode("div", _hoisted_7$4, [
            createVNode($setup["NcInputField"], {
              modelValue: $setup.newCategory.name,
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.newCategory.name = $event),
              label: $setup.t("agora", "Category Name"),
              placeholder: $setup.t("agora", "Enter category name")
            }, null, 8, ["modelValue", "label", "placeholder"]),
            createVNode($setup["NcSelect"], {
              modelValue: $setup.selectedCategory,
              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.selectedCategory = $event),
              options: $setup.hierarchicalCategory,
              clearable: false,
              placeholder: $setup.t("agora", "Select parent category")
            }, null, 8, ["modelValue", "options", "placeholder"]),
            createVNode($setup["NcButton"], {
              type: "primary",
              disabled: !$setup.newCategory.name.trim(),
              onClick: $setup.addCategory
            }, {
              default: withCtx(() => [
                createTextVNode(
                  toDisplayString($setup.t("agora", "Add Category")),
                  1
                  /* TEXT */
                )
              ]),
              _: 1
              /* STABLE */
            }, 8, ["disabled"])
          ])
        ]),
        createBaseVNode("div", _hoisted_8$4, [
          createBaseVNode(
            "h3",
            null,
            toDisplayString($setup.t("agora", "Categories Tree")),
            1
            /* TEXT */
          ),
          createBaseVNode("div", _hoisted_9$4, [
            (openBlock(true), createElementBlock(
              Fragment,
              null,
              renderList($setup.rootCategories, (item) => {
                return openBlock(), createBlock($setup["TreeItem"], {
                  key: "cat-" + item.id,
                  item,
                  items: $setup.categories,
                  level: 0,
                  type: "category",
                  onEdit: $setup.editItem,
                  onDelete: $setup.deleteItem
                }, null, 8, ["item", "items"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ])
      ])) : createCommentVNode("v-if", true),
      $setup.activeTab === "locations" ? (openBlock(), createElementBlock("div", _hoisted_10$3, [
        createBaseVNode("div", _hoisted_11$3, [
          createBaseVNode(
            "h3",
            null,
            toDisplayString($setup.t("agora", "Add New Location")),
            1
            /* TEXT */
          ),
          createBaseVNode("div", _hoisted_12$2, [
            createVNode($setup["NcInputField"], {
              modelValue: $setup.newLocation.name,
              "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.newLocation.name = $event),
              label: $setup.t("agora", "Location Name"),
              placeholder: $setup.t("agora", "Enter location name")
            }, null, 8, ["modelValue", "label", "placeholder"]),
            createVNode($setup["NcSelect"], {
              modelValue: $setup.selectedLocation,
              "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $setup.selectedLocation = $event),
              options: $setup.hierarchicalLocation,
              clearable: false,
              placeholder: $setup.t("agora", "Select parent location")
            }, null, 8, ["modelValue", "options", "placeholder"]),
            createVNode($setup["NcButton"], {
              type: "primary",
              disabled: !$setup.newLocation.name.trim(),
              onClick: $setup.addLocation
            }, {
              default: withCtx(() => [
                createTextVNode(
                  toDisplayString($setup.t("agora", "Add Location")),
                  1
                  /* TEXT */
                )
              ]),
              _: 1
              /* STABLE */
            }, 8, ["disabled"])
          ])
        ]),
        createBaseVNode("div", _hoisted_13$2, [
          createBaseVNode(
            "h3",
            null,
            toDisplayString($setup.t("agora", "Locations Tree")),
            1
            /* TEXT */
          ),
          createBaseVNode("div", _hoisted_14$2, [
            (openBlock(true), createElementBlock(
              Fragment,
              null,
              renderList($setup.rootLocations, (item) => {
                return openBlock(), createBlock($setup["TreeItem"], {
                  key: "loc-" + item.id,
                  item,
                  items: $setup.locations,
                  level: 0,
                  type: "location",
                  onEdit: $setup.editItem,
                  onDelete: $setup.deleteItem
                }, null, 8, ["item", "items"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ])
      ])) : createCommentVNode("v-if", true),
      createCommentVNode(" Modal d'édition "),
      $setup.editingItem ? (openBlock(), createElementBlock("div", _hoisted_15$2, [
        createBaseVNode("div", _hoisted_16$2, [
          createBaseVNode(
            "h3",
            null,
            toDisplayString($setup.t("agora", "Edit")) + " " + toDisplayString($setup.editingItem.type === "category" ? $setup.t("agora", "Category") : $setup.t("agora", "Location")),
            1
            /* TEXT */
          ),
          createVNode($setup["NcInputField"], {
            modelValue: $setup.editingItem.name,
            "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $setup.editingItem.name = $event),
            label: $setup.editingItem.type === "category" ? $setup.t("agora", "Category Name") : $setup.t("agora", "Location Name")
          }, null, 8, ["modelValue", "label"]),
          createVNode($setup["NcSelect"], {
            modelValue: $setup.editingParent,
            "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $setup.editingParent = $event),
            options: $setup.editingOptions,
            clearable: false,
            placeholder: $setup.t("agora", "Select parent")
          }, null, 8, ["modelValue", "options", "placeholder"]),
          createBaseVNode("div", _hoisted_17$2, [
            createVNode($setup["NcButton"], {
              onClick: _cache[8] || (_cache[8] = ($event) => $setup.editingItem = null)
            }, {
              default: withCtx(() => [
                createTextVNode(
                  toDisplayString($setup.t("agora", "Cancel")),
                  1
                  /* TEXT */
                )
              ]),
              _: 1
              /* STABLE */
            }),
            createVNode($setup["NcButton"], {
              type: "primary",
              onClick: $setup.saveEdit
            }, {
              default: withCtx(() => [
                createTextVNode(
                  toDisplayString($setup.t("agora", "Save")),
                  1
                  /* TEXT */
                )
              ]),
              _: 1
              /* STABLE */
            })
          ])
        ])
      ])) : createCommentVNode("v-if", true)
    ]))
  ]);
}
const AdminCategoryLocation = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$c], ["__scopeId", "data-v-da2e3bfe"], ["__file", "/var/www/nextcloud/apps/agora/src/components/Settings/AdminSettings/AdminCategoryLocation.vue"]]);
const _sfc_main$b = {
  __name: "AdminInquiryRights",
  setup(__props, { expose: __expose }) {
    __expose();
    const appSettingsStore = useAppSettingsStore();
    const selectedInquiryType = ref("");
    const isLoading = ref(true);
    const editorOptions = [
      { value: "wysiwyg", label: translate("agora", "Rich Text Editor") },
      { value: "textarea", label: translate("agora", "Simple Text Area") },
      { value: "texteditor", label: translate("agora", "Nextcloud text editor") }
    ];
    onMounted(async () => {
      try {
        const typeKeys = Object.keys(InquiryTypesUI);
        if (typeKeys.length > 0) {
          selectedInquiryType.value = typeKeys[0];
        }
      } catch (error) {
        console.error("Failed to load inquiry types:", error);
      } finally {
        isLoading.value = false;
      }
    });
    const inquiryTypeOptions = computed(
      () => Object.keys(InquiryTypesUI).map((key) => ({
        value: key,
        label: InquiryTypesUI[key]?.label || key
      }))
    );
    const isValidInquiryType = computed(
      () => selectedInquiryType.value && InquiryTypesUI[selectedInquiryType.value]
    );
    watch(selectedInquiryType, (newType) => {
      if (newType.value) {
        selectedInquiryType.value = newType.value;
      }
    });
    const __returned__ = { appSettingsStore, selectedInquiryType, isLoading, editorOptions, inquiryTypeOptions, isValidInquiryType, get t() {
      return translate;
    }, ref, computed, onMounted, watch, get NcCheckboxRadioSwitch() {
      return NcCheckboxRadioSwitch;
    }, get NcSelect() {
      return NcSelect;
    }, get useAppSettingsStore() {
      return useAppSettingsStore;
    }, get InquiryTypesUI() {
      return InquiryTypesUI;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1$b = { class: "inquiry-rights-management" };
const _hoisted_2$8 = { class: "description" };
const _hoisted_3$3 = {
  key: 0,
  class: "loading"
};
const _hoisted_4$3 = {
  key: 1,
  class: "error"
};
const _hoisted_5$3 = { key: 2 };
const _hoisted_6$3 = { class: "type-selection" };
const _hoisted_7$3 = { for: "inquiry-type-select" };
const _hoisted_8$3 = { class: "settings-container" };
const _hoisted_9$3 = { class: "settings-list" };
const _hoisted_10$2 = { class: "setting-item" };
const _hoisted_11$2 = { class: "setting-description" };
const _hoisted_12$1 = { class: "setting-item" };
const _hoisted_13$1 = { class: "setting-description" };
const _hoisted_14$1 = { class: "setting-item" };
const _hoisted_15$1 = { class: "setting-description" };
const _hoisted_16$1 = { class: "setting-item" };
const _hoisted_17$1 = { for: "editor-type-select" };
const _hoisted_18$1 = { class: "setting-description" };
function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$b, [
    createBaseVNode(
      "h2",
      null,
      toDisplayString($setup.t("agora", "Inquiry Type Settings")),
      1
      /* TEXT */
    ),
    createBaseVNode(
      "p",
      _hoisted_2$8,
      toDisplayString($setup.t("agora", "Configure default settings for each inquiry type")),
      1
      /* TEXT */
    ),
    $setup.isLoading ? (openBlock(), createElementBlock(
      "div",
      _hoisted_3$3,
      toDisplayString($setup.t("agora", "Loading inquiry types...")),
      1
      /* TEXT */
    )) : !$setup.isValidInquiryType ? (openBlock(), createElementBlock(
      "div",
      _hoisted_4$3,
      toDisplayString($setup.t("agora", "No inquiry types available")),
      1
      /* TEXT */
    )) : (openBlock(), createElementBlock("div", _hoisted_5$3, [
      createBaseVNode("div", _hoisted_6$3, [
        createBaseVNode(
          "label",
          _hoisted_7$3,
          toDisplayString($setup.t("agora", "Select inquiry type:")),
          1
          /* TEXT */
        ),
        createVNode($setup["NcSelect"], {
          id: "inquiry-type-select",
          modelValue: $setup.selectedInquiryType,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.selectedInquiryType = $event),
          options: $setup.inquiryTypeOptions,
          "value-field": "value",
          "label-field": "label",
          "track-bye": "value",
          clearable: false,
          class: "type-select"
        }, null, 8, ["modelValue", "options"])
      ]),
      createBaseVNode("div", _hoisted_8$3, [
        createBaseVNode(
          "h3",
          null,
          toDisplayString($setup.InquiryTypesUI[$setup.selectedInquiryType]?.label || $setup.selectedInquiryType) + " " + toDisplayString($setup.t("agora", "Settings")),
          1
          /* TEXT */
        ),
        createBaseVNode("div", _hoisted_9$3, [
          createBaseVNode("div", _hoisted_10$2, [
            createVNode($setup["NcCheckboxRadioSwitch"], {
              modelValue: $setup.appSettingsStore.inquiryTypeRights[$setup.selectedInquiryType].supportInquiry,
              "onUpdate:modelValue": [
                _cache[1] || (_cache[1] = ($event) => $setup.appSettingsStore.inquiryTypeRights[$setup.selectedInquiryType].supportInquiry = $event),
                _cache[2] || (_cache[2] = ($event) => $setup.appSettingsStore.write())
              ],
              type: "switch"
            }, {
              default: withCtx(() => [
                createTextVNode(
                  toDisplayString($setup.t("agora", "Allow support")),
                  1
                  /* TEXT */
                )
              ]),
              _: 1
              /* STABLE */
            }, 8, ["modelValue"]),
            createBaseVNode(
              "p",
              _hoisted_11$2,
              toDisplayString($setup.t("agora", "Allow users to support this inquiry type")),
              1
              /* TEXT */
            )
          ]),
          createBaseVNode("div", _hoisted_12$1, [
            createVNode($setup["NcCheckboxRadioSwitch"], {
              modelValue: $setup.appSettingsStore.inquiryTypeRights[$setup.selectedInquiryType].commentInquiry,
              "onUpdate:modelValue": [
                _cache[3] || (_cache[3] = ($event) => $setup.appSettingsStore.inquiryTypeRights[$setup.selectedInquiryType].commentInquiry = $event),
                _cache[4] || (_cache[4] = ($event) => $setup.appSettingsStore.write())
              ],
              type: "switch"
            }, {
              default: withCtx(() => [
                createTextVNode(
                  toDisplayString($setup.t("agora", "Allow comments")),
                  1
                  /* TEXT */
                )
              ]),
              _: 1
              /* STABLE */
            }, 8, ["modelValue"]),
            createBaseVNode(
              "p",
              _hoisted_13$1,
              toDisplayString($setup.t("agora", "Allow users to comment on this inquiry type")),
              1
              /* TEXT */
            )
          ]),
          createBaseVNode("div", _hoisted_14$1, [
            createVNode($setup["NcCheckboxRadioSwitch"], {
              modelValue: $setup.appSettingsStore.inquiryTypeRights[$setup.selectedInquiryType].attachFileInquiry,
              "onUpdate:modelValue": [
                _cache[5] || (_cache[5] = ($event) => $setup.appSettingsStore.inquiryTypeRights[$setup.selectedInquiryType].attachFileInquiry = $event),
                _cache[6] || (_cache[6] = ($event) => $setup.appSettingsStore.write())
              ],
              type: "switch"
            }, {
              default: withCtx(() => [
                createTextVNode(
                  toDisplayString($setup.t("agora", "Allow file attachments")),
                  1
                  /* TEXT */
                )
              ]),
              _: 1
              /* STABLE */
            }, 8, ["modelValue"]),
            createBaseVNode(
              "p",
              _hoisted_15$1,
              toDisplayString($setup.t("agora", "Allow users to attach files to this inquiry type")),
              1
              /* TEXT */
            )
          ]),
          createBaseVNode("div", _hoisted_16$1, [
            createBaseVNode(
              "label",
              _hoisted_17$1,
              toDisplayString($setup.t("agora", "Editor type:")),
              1
              /* TEXT */
            ),
            createVNode($setup["NcSelect"], {
              id: "editor-type-select",
              modelValue: $setup.appSettingsStore.inquiryTypeRights[$setup.selectedInquiryType].editorType,
              "onUpdate:modelValue": [
                _cache[7] || (_cache[7] = ($event) => $setup.appSettingsStore.inquiryTypeRights[$setup.selectedInquiryType].editorType = $event),
                _cache[8] || (_cache[8] = ($event) => $setup.appSettingsStore.write())
              ],
              options: $setup.editorOptions,
              "option-value": "value",
              "option-label": "label",
              class: "editor-select"
            }, null, 8, ["modelValue"]),
            createBaseVNode(
              "p",
              _hoisted_18$1,
              toDisplayString($setup.t("agora", "Select the editor type for this inquiry")),
              1
              /* TEXT */
            )
          ])
        ])
      ])
    ]))
  ]);
}
const AdminInquiryRights = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$b], ["__scopeId", "data-v-d42bc411"], ["__file", "/var/www/nextcloud/apps/agora/src/components/Settings/AdminSettings/AdminInquiryRights.vue"]]);
const _sfc_main$a = {
  __name: "AdminModeratorRights",
  setup(__props, { expose: __expose }) {
    __expose();
    const appSettingsStore = useAppSettingsStore();
    const __returned__ = { appSettingsStore, get t() {
      return translate;
    }, get NcCheckboxRadioSwitch() {
      return NcCheckboxRadioSwitch;
    }, get useAppSettingsStore() {
      return useAppSettingsStore;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1$a = { class: "rights-management" };
const _hoisted_2$7 = { class: "description" };
const _hoisted_3$2 = { class: "rights-list" };
const _hoisted_4$2 = { class: "right-item" };
const _hoisted_5$2 = { class: "right-description" };
const _hoisted_6$2 = { class: "right-item" };
const _hoisted_7$2 = { class: "right-description" };
const _hoisted_8$2 = { class: "right-item" };
const _hoisted_9$2 = { class: "right-description" };
function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$a, [
    createBaseVNode(
      "h2",
      null,
      toDisplayString($setup.t("agora", "Moderator Rights")),
      1
      /* TEXT */
    ),
    createBaseVNode(
      "p",
      _hoisted_2$7,
      toDisplayString($setup.t("agora", "Define permissions for users with moderator role")),
      1
      /* TEXT */
    ),
    createBaseVNode("div", _hoisted_3$2, [
      createBaseVNode("div", _hoisted_4$2, [
        createVNode($setup["NcCheckboxRadioSwitch"], {
          modelValue: $setup.appSettingsStore.moderatorRights.modifyInquiry,
          "onUpdate:modelValue": [
            _cache[0] || (_cache[0] = ($event) => $setup.appSettingsStore.moderatorRights.modifyInquiry = $event),
            _cache[1] || (_cache[1] = ($event) => $setup.appSettingsStore.write())
          ],
          type: "switch"
        }, {
          default: withCtx(() => [
            createTextVNode(
              toDisplayString($setup.t("agora", "Modify inquiries")),
              1
              /* TEXT */
            )
          ]),
          _: 1
          /* STABLE */
        }, 8, ["modelValue"]),
        createBaseVNode(
          "p",
          _hoisted_5$2,
          toDisplayString($setup.t("agora", "Allow moderators to modify existing inquiries")),
          1
          /* TEXT */
        )
      ]),
      createBaseVNode("div", _hoisted_6$2, [
        createVNode($setup["NcCheckboxRadioSwitch"], {
          modelValue: $setup.appSettingsStore.moderatorRights.deleteInquiry,
          "onUpdate:modelValue": [
            _cache[2] || (_cache[2] = ($event) => $setup.appSettingsStore.moderatorRights.deleteInquiry = $event),
            _cache[3] || (_cache[3] = ($event) => $setup.appSettingsStore.write())
          ],
          type: "switch"
        }, {
          default: withCtx(() => [
            createTextVNode(
              toDisplayString($setup.t("agora", "Delete inquiries")),
              1
              /* TEXT */
            )
          ]),
          _: 1
          /* STABLE */
        }, 8, ["modelValue"]),
        createBaseVNode(
          "p",
          _hoisted_7$2,
          toDisplayString($setup.t("agora", "Allow moderators to delete inquiries")),
          1
          /* TEXT */
        )
      ]),
      createBaseVNode("div", _hoisted_8$2, [
        createVNode($setup["NcCheckboxRadioSwitch"], {
          modelValue: $setup.appSettingsStore.moderatorRights.archiveInquiry,
          "onUpdate:modelValue": [
            _cache[4] || (_cache[4] = ($event) => $setup.appSettingsStore.moderatorRights.archiveInquiry = $event),
            _cache[5] || (_cache[5] = ($event) => $setup.appSettingsStore.write())
          ],
          type: "switch"
        }, {
          default: withCtx(() => [
            createTextVNode(
              toDisplayString($setup.t("agora", "Archive inquiries")),
              1
              /* TEXT */
            )
          ]),
          _: 1
          /* STABLE */
        }, 8, ["modelValue"]),
        createBaseVNode(
          "p",
          _hoisted_9$2,
          toDisplayString($setup.t("agora", "Allow moderators to archive inquiries")),
          1
          /* TEXT */
        )
      ])
    ])
  ]);
}
const AdminModeratorRights = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$a], ["__scopeId", "data-v-fb7cbc5e"], ["__file", "/var/www/nextcloud/apps/agora/src/components/Settings/AdminSettings/AdminModeratorRights.vue"]]);
const _sfc_main$9 = {
  __name: "AdminOfficialRights",
  setup(__props, { expose: __expose }) {
    __expose();
    const appSettingsStore = useAppSettingsStore();
    const __returned__ = { appSettingsStore, get t() {
      return translate;
    }, get NcCheckboxRadioSwitch() {
      return NcCheckboxRadioSwitch;
    }, get useAppSettingsStore() {
      return useAppSettingsStore;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1$9 = { class: "rights-management" };
const _hoisted_2$6 = { class: "description" };
const _hoisted_3$1 = { class: "rights-list" };
const _hoisted_4$1 = { class: "right-item" };
const _hoisted_5$1 = { class: "right-description" };
const _hoisted_6$1 = { class: "right-item" };
const _hoisted_7$1 = { class: "right-description" };
const _hoisted_8$1 = { class: "right-item" };
const _hoisted_9$1 = { class: "right-description" };
const _hoisted_10$1 = { class: "right-item" };
const _hoisted_11$1 = { class: "right-description" };
function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$9, [
    createBaseVNode(
      "h2",
      null,
      toDisplayString($setup.t("agora", "Official Rights")),
      1
      /* TEXT */
    ),
    createBaseVNode(
      "p",
      _hoisted_2$6,
      toDisplayString($setup.t("agora", "Define permissions for users with official role")),
      1
      /* TEXT */
    ),
    createBaseVNode("div", _hoisted_3$1, [
      createBaseVNode("div", _hoisted_4$1, [
        createVNode($setup["NcCheckboxRadioSwitch"], {
          modelValue: $setup.appSettingsStore.officialRights.modifyInquiry,
          "onUpdate:modelValue": [
            _cache[0] || (_cache[0] = ($event) => $setup.appSettingsStore.officialRights.modifyInquiry = $event),
            _cache[1] || (_cache[1] = ($event) => $setup.appSettingsStore.write())
          ],
          type: "switch"
        }, {
          default: withCtx(() => [
            createTextVNode(
              toDisplayString($setup.t("agora", "Modify inquiries")),
              1
              /* TEXT */
            )
          ]),
          _: 1
          /* STABLE */
        }, 8, ["modelValue"]),
        createBaseVNode(
          "p",
          _hoisted_5$1,
          toDisplayString($setup.t("agora", "Allow officials to modify existing inquiries")),
          1
          /* TEXT */
        )
      ]),
      createBaseVNode("div", _hoisted_6$1, [
        createVNode($setup["NcCheckboxRadioSwitch"], {
          modelValue: $setup.appSettingsStore.officialRights.deleteInquiry,
          "onUpdate:modelValue": [
            _cache[2] || (_cache[2] = ($event) => $setup.appSettingsStore.officialRights.deleteInquiry = $event),
            _cache[3] || (_cache[3] = ($event) => $setup.appSettingsStore.write())
          ],
          type: "switch"
        }, {
          default: withCtx(() => [
            createTextVNode(
              toDisplayString($setup.t("agora", "Delete inquiries")),
              1
              /* TEXT */
            )
          ]),
          _: 1
          /* STABLE */
        }, 8, ["modelValue"]),
        createBaseVNode(
          "p",
          _hoisted_7$1,
          toDisplayString($setup.t("agora", "Allow officials to delete inquiries")),
          1
          /* TEXT */
        )
      ]),
      createBaseVNode("div", _hoisted_8$1, [
        createVNode($setup["NcCheckboxRadioSwitch"], {
          modelValue: $setup.appSettingsStore.officialRights.archiveInquiry,
          "onUpdate:modelValue": [
            _cache[4] || (_cache[4] = ($event) => $setup.appSettingsStore.officialRights.archiveInquiry = $event),
            _cache[5] || (_cache[5] = ($event) => $setup.appSettingsStore.write())
          ],
          type: "switch"
        }, {
          default: withCtx(() => [
            createTextVNode(
              toDisplayString($setup.t("agora", "Archive inquiries")),
              1
              /* TEXT */
            )
          ]),
          _: 1
          /* STABLE */
        }, 8, ["modelValue"]),
        createBaseVNode(
          "p",
          _hoisted_9$1,
          toDisplayString($setup.t("agora", "Allow officials to archive inquiries")),
          1
          /* TEXT */
        )
      ]),
      createBaseVNode("div", _hoisted_10$1, [
        createVNode($setup["NcCheckboxRadioSwitch"], {
          modelValue: $setup.appSettingsStore.officialRights.manageModerationStatus,
          "onUpdate:modelValue": [
            _cache[6] || (_cache[6] = ($event) => $setup.appSettingsStore.officialRights.manageModerationStatus = $event),
            _cache[7] || (_cache[7] = ($event) => $setup.appSettingsStore.write())
          ],
          type: "switch"
        }, {
          default: withCtx(() => [
            createTextVNode(
              toDisplayString($setup.t("agora", "Moderation status")),
              1
              /* TEXT */
            )
          ]),
          _: 1
          /* STABLE */
        }, 8, ["modelValue"]),
        createBaseVNode(
          "p",
          _hoisted_11$1,
          toDisplayString($setup.t("agora", "Allow officials to manage Moderation status for all inquiry")),
          1
          /* TEXT */
        )
      ])
    ])
  ]);
}
const AdminOfficialRights = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$9], ["__scopeId", "data-v-14c25bb2"], ["__file", "/var/www/nextcloud/apps/agora/src/components/Settings/AdminSettings/AdminOfficialRights.vue"]]);
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "AdminModerationStatus",
  setup(__props, { expose: __expose }) {
    __expose();
    const appSettingsStore = useAppSettingsStore();
    const activeInquiryType = ref(null);
    const editingStatus = ref(null);
    const newStatus = ref({
      statusKey: "",
      label: "",
      description: "",
      isFinal: false,
      icon: "ClockOutline"
    });
    const activeInquiryTypeId = computed(
      () => activeInquiryType.value?.id || InquiryTypeValues.PETITION
    );
    const currentInquiryTypeLabel = computed(
      () => activeInquiryType.value?.label || InquiryTypeValues.PETITION.replace(/_/g, " ")
    );
    onMounted(() => {
      if (!activeInquiryType.value) {
        activeInquiryType.value = inquiryTypes.value.find((t2) => t2.id === InquiryTypeValues.PETITION) || inquiryTypes.value[0];
      }
    });
    const availableIcons = computed(
      () => Object.keys(StatusIcons).filter((key) => key !== "default").map((iconId) => ({
        id: iconId,
        label: translate("agora", iconId.replace(/([A-Z])/g, " $1").trim())
      }))
    );
    const getIconComponent = (iconName) => StatusIcons[iconName] || StatusIcons.ClockOutline;
    const inquiryTypes = computed(
      () => Object.values(InquiryTypeValues).map((type) => ({
        id: type,
        label: translate(
          "agora",
          type.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
        )
      }))
    );
    const statuses = computed(
      () => appSettingsStore.getStatusesForInquiryType(activeInquiryTypeId.value)
    );
    watch(activeInquiryTypeId, () => {
      editingStatus.value = null;
    });
    const addStatus = () => {
      if (!newStatus.value.statusKey || !newStatus.value.label) {
        return;
      }
      appSettingsStore.addStatusForInquiryType(activeInquiryTypeId.value, {
        ...newStatus.value,
        icon: String(newStatus.value.icon)
      });
      newStatus.value = {
        statusKey: "",
        label: "",
        description: "",
        isFinal: false,
        icon: "ClockOutline"
      };
    };
    const editStatus = (status) => {
      editingStatus.value = {
        id: status.id,
        statusKey: status.statusKey,
        label: status.label,
        description: status.description || "",
        isFinal: status.isFinal,
        icon: status.icon || "ClockOutline"
      };
    };
    const saveUpdateStatus = () => {
      if (editingStatus.value) {
        appSettingsStore.updateStatusForInquiryType(activeInquiryTypeId.value, editingStatus.value.id, {
          ...editingStatus.value,
          icon: editingStatus.value.icon?.id || String(editingStatus.value.icon)
        });
        editingStatus.value = null;
      }
    };
    const deleteStatus = (statusId) => {
      if (confirm(translate("agora", "Are you sure you want to delete this status?"))) {
        appSettingsStore.deleteStatusForInquiryType(activeInquiryTypeId.value, statusId);
      }
    };
    const moveStatusUp = (statusId) => {
      appSettingsStore.moveStatusUp(activeInquiryTypeId.value, statusId);
    };
    const moveStatusDown = (statusId) => {
      appSettingsStore.moveStatusDown(activeInquiryTypeId.value, statusId);
    };
    const cancelEdit = () => {
      editingStatus.value = null;
    };
    const __returned__ = { appSettingsStore, activeInquiryType, editingStatus, newStatus, activeInquiryTypeId, currentInquiryTypeLabel, availableIcons, getIconComponent, inquiryTypes, statuses, addStatus, editStatus, saveUpdateStatus, deleteStatus, moveStatusUp, moveStatusDown, cancelEdit, get t() {
      return translate;
    }, get NcButton() {
      return NcButton;
    }, get NcInputField() {
      return NcInputField;
    }, get NcCheckboxRadioSwitch() {
      return NcCheckboxRadioSwitch;
    }, get NcSelect() {
      return NcSelect;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$8 = { class: "moderation-status-settings" };
const _hoisted_2$5 = { class: "inquiry-type-selector" };
const _hoisted_3 = { class: "status-list" };
const _hoisted_4 = {
  key: 0,
  class: "empty-state"
};
const _hoisted_5 = {
  key: 1,
  class: "status-items"
};
const _hoisted_6 = { class: "status-content" };
const _hoisted_7 = ["title"];
const _hoisted_8 = { class: "status-info" };
const _hoisted_9 = { class: "status-key" };
const _hoisted_10 = {
  key: 0,
  class: "status-description"
};
const _hoisted_11 = { class: "status-properties" };
const _hoisted_12 = { class: "status-actions" };
const _hoisted_13 = { class: "add-status-form" };
const _hoisted_14 = { class: "form-grid" };
const _hoisted_15 = { class: "checkbox-field" };
const _hoisted_16 = { class: "field-description" };
const _hoisted_17 = {
  key: 0,
  class: "modal-overlay"
};
const _hoisted_18 = { class: "modal-content" };
const _hoisted_19 = { class: "form-grid" };
const _hoisted_20 = { class: "checkbox-field" };
const _hoisted_21 = { class: "field-description" };
const _hoisted_22 = { class: "modal-actions" };
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$8, [
    createCommentVNode(" Inquiry type selector "),
    createBaseVNode("div", _hoisted_2$5, [
      createBaseVNode(
        "h3",
        null,
        toDisplayString($setup.t("agora", "Select Inquiry Type")),
        1
        /* TEXT */
      ),
      createVNode($setup["NcSelect"], {
        modelValue: $setup.activeInquiryType,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.activeInquiryType = $event),
        options: $setup.inquiryTypes,
        label: "label",
        "input-label": $setup.t("agora", "Inquiry Type")
      }, null, 8, ["modelValue", "options", "input-label"])
    ]),
    createCommentVNode(" Status list for current inquiry type "),
    createBaseVNode("div", _hoisted_3, [
      createBaseVNode(
        "h3",
        null,
        toDisplayString($setup.t("agora", "Statuses for {type}", {
          type: $setup.currentInquiryTypeLabel
        })),
        1
        /* TEXT */
      ),
      $setup.statuses.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_4, [
        createBaseVNode(
          "p",
          null,
          toDisplayString($setup.t("agora", "No statuses configured for this inquiry type.")),
          1
          /* TEXT */
        )
      ])) : (openBlock(), createElementBlock("div", _hoisted_5, [
        (openBlock(true), createElementBlock(
          Fragment,
          null,
          renderList($setup.statuses, (status, index) => {
            return openBlock(), createElementBlock("div", {
              key: status.statusKey,
              class: "status-item"
            }, [
              createBaseVNode("div", _hoisted_6, [
                createBaseVNode("div", {
                  class: "status-icon",
                  title: status.icon
                }, [
                  (openBlock(), createBlock(resolveDynamicComponent($setup.getIconComponent(status.icon)), { size: 20 }))
                ], 8, _hoisted_7),
                createBaseVNode("div", _hoisted_8, [
                  createBaseVNode(
                    "h4",
                    null,
                    toDisplayString(status.label),
                    1
                    /* TEXT */
                  ),
                  createBaseVNode(
                    "p",
                    _hoisted_9,
                    toDisplayString(status.statusKey),
                    1
                    /* TEXT */
                  ),
                  status.description ? (openBlock(), createElementBlock(
                    "p",
                    _hoisted_10,
                    toDisplayString(status.description),
                    1
                    /* TEXT */
                  )) : createCommentVNode("v-if", true),
                  createBaseVNode("div", _hoisted_11, [
                    createBaseVNode(
                      "span",
                      {
                        class: normalizeClass(["status-badge", status.isFinal ? "final" : "non-final"])
                      },
                      toDisplayString(status.isFinal ? $setup.t("agora", "Final") : $setup.t("agora", "Non-Final")),
                      3
                      /* TEXT, CLASS */
                    )
                  ])
                ])
              ]),
              createBaseVNode("div", _hoisted_12, [
                createVNode($setup["NcButton"], {
                  disabled: index === 0,
                  onClick: ($event) => $setup.moveStatusUp(status.statusKey)
                }, {
                  default: withCtx(() => [
                    createTextVNode(
                      toDisplayString($setup.t("agora", "Up")),
                      1
                      /* TEXT */
                    )
                  ]),
                  _: 2
                  /* DYNAMIC */
                }, 1032, ["disabled", "onClick"]),
                createVNode($setup["NcButton"], {
                  disabled: index === $setup.statuses.length - 1,
                  onClick: ($event) => $setup.moveStatusDown(status.statusKey)
                }, {
                  default: withCtx(() => [
                    createTextVNode(
                      toDisplayString($setup.t("agora", "Down")),
                      1
                      /* TEXT */
                    )
                  ]),
                  _: 2
                  /* DYNAMIC */
                }, 1032, ["disabled", "onClick"]),
                createVNode($setup["NcButton"], {
                  onClick: ($event) => $setup.editStatus(status)
                }, {
                  default: withCtx(() => [
                    createTextVNode(
                      toDisplayString($setup.t("agora", "Edit")),
                      1
                      /* TEXT */
                    )
                  ]),
                  _: 2
                  /* DYNAMIC */
                }, 1032, ["onClick"]),
                createVNode($setup["NcButton"], {
                  onClick: ($event) => $setup.deleteStatus(status.id)
                }, {
                  default: withCtx(() => [
                    createTextVNode(
                      toDisplayString($setup.t("agora", "Delete")),
                      1
                      /* TEXT */
                    )
                  ]),
                  _: 2
                  /* DYNAMIC */
                }, 1032, ["onClick"])
              ])
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]))
    ]),
    createCommentVNode(" Add new status form "),
    createBaseVNode("div", _hoisted_13, [
      createBaseVNode(
        "h3",
        null,
        toDisplayString($setup.t("agora", "Add New Status")),
        1
        /* TEXT */
      ),
      createBaseVNode("div", _hoisted_14, [
        createVNode($setup["NcInputField"], {
          modelValue: $setup.newStatus.statusKey,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.newStatus.statusKey = $event),
          label: $setup.t("agora", "Status Key"),
          placeholder: $setup.t("agora", "Enter unique status key"),
          required: ""
        }, null, 8, ["modelValue", "label", "placeholder"]),
        createVNode($setup["NcInputField"], {
          modelValue: $setup.newStatus.label,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.newStatus.label = $event),
          label: $setup.t("agora", "Label"),
          placeholder: $setup.t("agora", "Enter display label"),
          required: ""
        }, null, 8, ["modelValue", "label", "placeholder"]),
        createVNode($setup["NcInputField"], {
          modelValue: $setup.newStatus.description,
          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.newStatus.description = $event),
          label: $setup.t("agora", "Description"),
          placeholder: $setup.t("agora", "Enter description (optional)"),
          type: "textarea"
        }, null, 8, ["modelValue", "label", "placeholder"]),
        createVNode($setup["NcSelect"], {
          modelValue: $setup.newStatus.icon,
          "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.newStatus.icon = $event),
          options: $setup.availableIcons,
          label: "label",
          "input-label": $setup.t("agora", "Select Icon")
        }, null, 8, ["modelValue", "options", "input-label"]),
        createBaseVNode("div", _hoisted_15, [
          createVNode($setup["NcCheckboxRadioSwitch"], {
            modelValue: $setup.newStatus.isFinal,
            "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $setup.newStatus.isFinal = $event),
            type: "switch"
          }, {
            default: withCtx(() => [
              createTextVNode(
                toDisplayString($setup.t("agora", "Final Status")),
                1
                /* TEXT */
              )
            ]),
            _: 1
            /* STABLE */
          }, 8, ["modelValue"]),
          createBaseVNode(
            "p",
            _hoisted_16,
            toDisplayString($setup.t("agora", "Final statuses cannot be changed once set")),
            1
            /* TEXT */
          )
        ]),
        createVNode($setup["NcButton"], {
          type: "primary",
          disabled: !$setup.newStatus.statusKey || !$setup.newStatus.label,
          onClick: $setup.addStatus
        }, {
          default: withCtx(() => [
            createTextVNode(
              toDisplayString($setup.t("agora", "Add Status")),
              1
              /* TEXT */
            )
          ]),
          _: 1
          /* STABLE */
        }, 8, ["disabled"])
      ])
    ]),
    createCommentVNode(" Edit status modal "),
    $setup.editingStatus ? (openBlock(), createElementBlock("div", _hoisted_17, [
      createBaseVNode("div", _hoisted_18, [
        createBaseVNode(
          "h3",
          null,
          toDisplayString($setup.t("agora", "Edit Status")),
          1
          /* TEXT */
        ),
        createBaseVNode("div", _hoisted_19, [
          createVNode($setup["NcInputField"], {
            modelValue: $setup.editingStatus.statusKey,
            "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $setup.editingStatus.statusKey = $event),
            label: $setup.t("agora", "Status Key"),
            placeholder: $setup.t("agora", "Enter unique status key"),
            required: ""
          }, null, 8, ["modelValue", "label", "placeholder"]),
          createVNode($setup["NcInputField"], {
            modelValue: $setup.editingStatus.label,
            "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $setup.editingStatus.label = $event),
            label: $setup.t("agora", "Label"),
            placeholder: $setup.t("agora", "Enter display label"),
            required: ""
          }, null, 8, ["modelValue", "label", "placeholder"]),
          createVNode($setup["NcInputField"], {
            modelValue: $setup.editingStatus.description,
            "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $setup.editingStatus.description = $event),
            label: $setup.t("agora", "Description"),
            placeholder: $setup.t("agora", "Enter description (optional)"),
            type: "textarea"
          }, null, 8, ["modelValue", "label", "placeholder"]),
          createVNode($setup["NcSelect"], {
            modelValue: $setup.editingStatus.icon,
            "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => $setup.editingStatus.icon = $event),
            options: $setup.availableIcons,
            label: "label",
            "input-label": $setup.t("agora", "Select Icon")
          }, null, 8, ["modelValue", "options", "input-label"]),
          createBaseVNode("div", _hoisted_20, [
            createVNode($setup["NcCheckboxRadioSwitch"], {
              modelValue: $setup.editingStatus.isFinal,
              "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => $setup.editingStatus.isFinal = $event),
              type: "switch"
            }, {
              default: withCtx(() => [
                createTextVNode(
                  toDisplayString($setup.t("agora", "Final Status")),
                  1
                  /* TEXT */
                )
              ]),
              _: 1
              /* STABLE */
            }, 8, ["modelValue"]),
            createBaseVNode(
              "p",
              _hoisted_21,
              toDisplayString($setup.t("agora", "Final statuses cannot be changed once set")),
              1
              /* TEXT */
            )
          ])
        ]),
        createBaseVNode("div", _hoisted_22, [
          createVNode($setup["NcButton"], { onClick: $setup.cancelEdit }, {
            default: withCtx(() => [
              createTextVNode(
                toDisplayString($setup.t("agora", "Cancel")),
                1
                /* TEXT */
              )
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode($setup["NcButton"], {
            type: "primary",
            disabled: !$setup.editingStatus.statusKey || !$setup.editingStatus.label,
            onClick: $setup.saveUpdateStatus
          }, {
            default: withCtx(() => [
              createTextVNode(
                toDisplayString($setup.t("agora", "Save Changes")),
                1
                /* TEXT */
              )
            ]),
            _: 1
            /* STABLE */
          }, 8, ["disabled"])
        ])
      ])
    ])) : createCommentVNode("v-if", true)
  ]);
}
const AdminModerationStatus = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8], ["__scopeId", "data-v-ab48ae64"], ["__file", "/var/www/nextcloud/apps/agora/src/components/Settings/AdminSettings/AdminModerationStatus.vue"]]);
const _sfc_main$7 = {
  __name: "AdminInquiryCreation",
  setup(__props, { expose: __expose }) {
    __expose();
    const appSettingsStore = useAppSettingsStore();
    const __returned__ = { appSettingsStore, get t() {
      return translate;
    }, get NcCheckboxRadioSwitch() {
      return NcCheckboxRadioSwitch;
    }, get NcSelect() {
      return NcSelect;
    }, get useAppSettingsStore() {
      return useAppSettingsStore;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1$7 = { class: "user_settings" };
const _hoisted_2$4 = {
  key: 0,
  class: "settings_details"
};
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$7, [
    createVNode($setup["NcCheckboxRadioSwitch"], {
      modelValue: $setup.appSettingsStore.allowInquiryCreation,
      "onUpdate:modelValue": [
        _cache[0] || (_cache[0] = ($event) => $setup.appSettingsStore.allowInquiryCreation = $event),
        _cache[1] || (_cache[1] = ($event) => $setup.appSettingsStore.write())
      ],
      type: "switch"
    }, {
      default: withCtx(() => [
        createTextVNode(
          toDisplayString($setup.t("agora", "Enable the inquiry creation globally")),
          1
          /* TEXT */
        )
      ]),
      _: 1
      /* STABLE */
    }, 8, ["modelValue"]),
    !$setup.appSettingsStore.allowInquiryCreation ? (openBlock(), createElementBlock("div", _hoisted_2$4, [
      createVNode($setup["NcSelect"], {
        modelValue: $setup.appSettingsStore.inquiryCreationGroups,
        "onUpdate:modelValue": [
          _cache[2] || (_cache[2] = ($event) => $setup.appSettingsStore.inquiryCreationGroups = $event),
          _cache[3] || (_cache[3] = ($event) => $setup.appSettingsStore.write())
        ],
        "input-label": $setup.t("agora", "Enable only for the following groups"),
        label: "displayName",
        options: $setup.appSettingsStore.groups,
        "user-select": true,
        multiple: true,
        loading: _ctx.isLoading,
        placeholder: $setup.t("agora", "Leave empty to disable globally"),
        onSearch: $setup.appSettingsStore.loadGroups
      }, null, 8, ["modelValue", "input-label", "options", "loading", "placeholder", "onSearch"])
    ])) : createCommentVNode("v-if", true)
  ]);
}
const AdminInquiryCreation = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7], ["__file", "/var/www/nextcloud/apps/agora/src/components/Settings/AdminSettings/AdminInquiryCreation.vue"]]);
const _sfc_main$6 = {
  __name: "AdminInquiriesInNavigation",
  setup(__props, { expose: __expose }) {
    __expose();
    const appSettingsStore = useAppSettingsStore();
    const __returned__ = { appSettingsStore, get t() {
      return translate;
    }, get NcCheckboxRadioSwitch() {
      return NcCheckboxRadioSwitch;
    }, get useAppSettingsStore() {
      return useAppSettingsStore;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1$6 = { class: "user_settings" };
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$6, [
    createVNode($setup["NcCheckboxRadioSwitch"], {
      modelValue: $setup.appSettingsStore.navigationInquiriesInList,
      "onUpdate:modelValue": [
        _cache[0] || (_cache[0] = ($event) => $setup.appSettingsStore.navigationInquiriesInList = $event),
        _cache[1] || (_cache[1] = ($event) => $setup.appSettingsStore.write())
      ],
      type: "switch"
    }, {
      default: withCtx(() => [
        createTextVNode(
          toDisplayString($setup.t("agora", "Load inquiries into the navigation.")),
          1
          /* TEXT */
        )
      ]),
      _: 1
      /* STABLE */
    }, 8, ["modelValue"])
  ]);
}
const AdminInquiriesInNavigation = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6], ["__file", "/var/www/nextcloud/apps/agora/src/components/Settings/AdminSettings/AdminInquiriesInNavigation.vue"]]);
const _sfc_main$5 = {
  __name: "AdminShareOpenInquiry",
  setup(__props, { expose: __expose }) {
    __expose();
    const appSettingsStore = useAppSettingsStore();
    const __returned__ = { appSettingsStore, get t() {
      return translate;
    }, get NcCheckboxRadioSwitch() {
      return NcCheckboxRadioSwitch;
    }, get NcSelect() {
      return NcSelect;
    }, get useAppSettingsStore() {
      return useAppSettingsStore;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1$5 = { class: "user_settings" };
const _hoisted_2$3 = {
  key: 0,
  class: "settings_details"
};
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$5, [
    createVNode($setup["NcCheckboxRadioSwitch"], {
      modelValue: $setup.appSettingsStore.allowAllAccess,
      "onUpdate:modelValue": [
        _cache[0] || (_cache[0] = ($event) => $setup.appSettingsStore.allowAllAccess = $event),
        _cache[1] || (_cache[1] = ($event) => $setup.appSettingsStore.write())
      ],
      type: "switch"
    }, {
      default: withCtx(() => [
        createTextVNode(
          toDisplayString($setup.t("agora", "Enable the creation of openly accessible inquiries globally")),
          1
          /* TEXT */
        )
      ]),
      _: 1
      /* STABLE */
    }, 8, ["modelValue"]),
    !$setup.appSettingsStore.allowAllAccess ? (openBlock(), createElementBlock("div", _hoisted_2$3, [
      createVNode($setup["NcSelect"], {
        modelValue: $setup.appSettingsStore.allAccessGroups,
        "onUpdate:modelValue": [
          _cache[2] || (_cache[2] = ($event) => $setup.appSettingsStore.allAccessGroups = $event),
          _cache[3] || (_cache[3] = ($event) => $setup.appSettingsStore.write())
        ],
        "input-label": $setup.t("agora", "Enable only for the following groups"),
        label: "displayName",
        options: $setup.appSettingsStore.groups,
        "user-select": true,
        multiple: true,
        loading: _ctx.isLoading,
        placeholder: $setup.t("agora", "Leave empty to disable globally"),
        onSearch: $setup.appSettingsStore.loadGroups
      }, null, 8, ["modelValue", "input-label", "options", "loading", "placeholder", "onSearch"])
    ])) : createCommentVNode("v-if", true)
  ]);
}
const AdminShareOpenInquiry = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5], ["__file", "/var/www/nextcloud/apps/agora/src/components/Settings/AdminSettings/AdminShareOpenInquiry.vue"]]);
const _sfc_main$4 = {
  __name: "AdminSharePublicCreate",
  setup(__props, { expose: __expose }) {
    __expose();
    const appSettingsStore = useAppSettingsStore();
    const __returned__ = { appSettingsStore, get t() {
      return translate;
    }, get NcCheckboxRadioSwitch() {
      return NcCheckboxRadioSwitch;
    }, get NcSelect() {
      return NcSelect;
    }, get useAppSettingsStore() {
      return useAppSettingsStore;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1$4 = { class: "user_settings" };
const _hoisted_2$2 = {
  key: 0,
  class: "settings_details"
};
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$4, [
    createVNode($setup["NcCheckboxRadioSwitch"], {
      modelValue: $setup.appSettingsStore.allowPublicShares,
      "onUpdate:modelValue": [
        _cache[0] || (_cache[0] = ($event) => $setup.appSettingsStore.allowPublicShares = $event),
        _cache[1] || (_cache[1] = ($event) => $setup.appSettingsStore.write())
      ],
      type: "switch"
    }, {
      default: withCtx(() => [
        createTextVNode(
          toDisplayString($setup.t("agora", "Enable public shares of inquiries globally")),
          1
          /* TEXT */
        )
      ]),
      _: 1
      /* STABLE */
    }, 8, ["modelValue"]),
    !$setup.appSettingsStore.allowPublicShares ? (openBlock(), createElementBlock("div", _hoisted_2$2, [
      createVNode($setup["NcSelect"], {
        modelValue: $setup.appSettingsStore.publicSharesGroups,
        "onUpdate:modelValue": [
          _cache[2] || (_cache[2] = ($event) => $setup.appSettingsStore.publicSharesGroups = $event),
          _cache[3] || (_cache[3] = ($event) => $setup.appSettingsStore.write())
        ],
        "input-label": $setup.t("agora", "Enable only for the following groups"),
        label: "displayName",
        options: $setup.appSettingsStore.groups,
        "user-select": true,
        multiple: true,
        loading: _ctx.isLoading,
        placeholder: $setup.t("agora", "Leave empty to disable globally"),
        onSearch: $setup.appSettingsStore.loadGroups
      }, null, 8, ["modelValue", "input-label", "options", "loading", "placeholder", "onSearch"])
    ])) : createCommentVNode("v-if", true)
  ]);
}
const AdminSharePublicCreate = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4], ["__file", "/var/www/nextcloud/apps/agora/src/components/Settings/AdminSettings/AdminSharePublicCreate.vue"]]);
const _sfc_main$3 = {
  __name: "AdminSharePublicShowLogin",
  setup(__props, { expose: __expose }) {
    __expose();
    const appSettingsStore = useAppSettingsStore();
    const __returned__ = { appSettingsStore, get t() {
      return translate;
    }, get NcCheckboxRadioSwitch() {
      return NcCheckboxRadioSwitch;
    }, get useAppSettingsStore() {
      return useAppSettingsStore;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1$3 = { class: "user_settings" };
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$3, [
    createVNode($setup["NcCheckboxRadioSwitch"], {
      modelValue: $setup.appSettingsStore.showLogin,
      "onUpdate:modelValue": [
        _cache[0] || (_cache[0] = ($event) => $setup.appSettingsStore.showLogin = $event),
        _cache[1] || (_cache[1] = ($event) => $setup.appSettingsStore.write())
      ],
      type: "switch"
    }, {
      default: withCtx(() => [
        createTextVNode(
          toDisplayString($setup.t("inquiries", "Enable the login option in the registration dialog of public inquiries")),
          1
          /* TEXT */
        )
      ]),
      _: 1
      /* STABLE */
    }, 8, ["modelValue"])
  ]);
}
const AdminSharePublicShowLogin = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__file", "/var/www/nextcloud/apps/agora/src/components/Settings/AdminSettings/AdminSharePublicShowLogin.vue"]]);
const _sfc_main$2 = {
  __name: "AdminShowMailAddresses",
  setup(__props, { expose: __expose }) {
    __expose();
    const appSettingsStore = useAppSettingsStore();
    const __returned__ = { appSettingsStore, get t() {
      return translate;
    }, get NcCheckboxRadioSwitch() {
      return NcCheckboxRadioSwitch;
    }, get NcSelect() {
      return NcSelect;
    }, get useAppSettingsStore() {
      return useAppSettingsStore;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1$2 = { class: "user_settings" };
const _hoisted_2$1 = {
  key: 0,
  class: "settings_details"
};
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$2, [
    createVNode($setup["NcCheckboxRadioSwitch"], {
      modelValue: $setup.appSettingsStore.showMailAddresses,
      "onUpdate:modelValue": [
        _cache[0] || (_cache[0] = ($event) => $setup.appSettingsStore.showMailAddresses = $event),
        _cache[1] || (_cache[1] = ($event) => $setup.appSettingsStore.write())
      ],
      type: "switch"
    }, {
      default: withCtx(() => [
        createTextVNode(
          toDisplayString($setup.t("agora", "Show email addresses of internal accounts")),
          1
          /* TEXT */
        )
      ]),
      _: 1
      /* STABLE */
    }, 8, ["modelValue"]),
    !$setup.appSettingsStore.showMailAddresses ? (openBlock(), createElementBlock("div", _hoisted_2$1, [
      createVNode($setup["NcSelect"], {
        modelValue: $setup.appSettingsStore.showMailAddressesGroups,
        "onUpdate:modelValue": [
          _cache[2] || (_cache[2] = ($event) => $setup.appSettingsStore.showMailAddressesGroups = $event),
          _cache[3] || (_cache[3] = ($event) => $setup.appSettingsStore.write())
        ],
        "input-label": $setup.t("agora", "Show only to members of the following groups"),
        label: "displayName",
        options: $setup.appSettingsStore.groups,
        "user-select": true,
        multiple: true,
        loading: _ctx.isLoading,
        placeholder: $setup.t("agora", "Leave empty to disable globally."),
        onSearch: $setup.appSettingsStore.loadGroups
      }, null, 8, ["modelValue", "input-label", "options", "loading", "placeholder", "onSearch"])
    ])) : createCommentVNode("v-if", true)
  ]);
}
const AdminShowMailAddresses = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__file", "/var/www/nextcloud/apps/agora/src/components/Settings/AdminSettings/AdminShowMailAddresses.vue"]]);
const _sfc_main$1 = {
  __name: "AdminUnrescrictedOwners",
  setup(__props, { expose: __expose }) {
    __expose();
    const appSettingsStore = useAppSettingsStore();
    const __returned__ = { appSettingsStore, get t() {
      return translate;
    }, get NcCheckboxRadioSwitch() {
      return NcCheckboxRadioSwitch;
    }, get NcSelect() {
      return NcSelect;
    }, get useAppSettingsStore() {
      return useAppSettingsStore;
    }, CardDiv };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1$1 = { class: "user_settings" };
const _hoisted_2 = {
  key: 0,
  class: "settings_details"
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$1, [
    createVNode($setup["NcCheckboxRadioSwitch"], {
      modelValue: $setup.appSettingsStore.unrestrictedOwner,
      "onUpdate:modelValue": [
        _cache[0] || (_cache[0] = ($event) => $setup.appSettingsStore.unrestrictedOwner = $event),
        _cache[1] || (_cache[1] = ($event) => $setup.appSettingsStore.write())
      ],
      type: "switch"
    }, {
      default: withCtx(() => [
        createTextVNode(
          toDisplayString($setup.t("agora", "Enable unrestricted owners globally")),
          1
          /* TEXT */
        )
      ]),
      _: 1
      /* STABLE */
    }, 8, ["modelValue"]),
    !$setup.appSettingsStore.unrestrictedOwner ? (openBlock(), createElementBlock("div", _hoisted_2, [
      createVNode($setup["NcSelect"], {
        modelValue: $setup.appSettingsStore.unrestrictedOwnerGroups,
        "onUpdate:modelValue": [
          _cache[2] || (_cache[2] = ($event) => $setup.appSettingsStore.unrestrictedOwnerGroups = $event),
          _cache[3] || (_cache[3] = ($event) => $setup.appSettingsStore.write())
        ],
        "input-label": $setup.t("agora", "Enable only for the following groups"),
        label: "displayName",
        options: $setup.appSettingsStore.groups,
        "user-select": true,
        multiple: true,
        loading: $setup.appSettingsStore.status.loadingGroups,
        placeholder: $setup.t("agora", "Leave empty to disable globally"),
        onSearch: $setup.appSettingsStore.loadGroups
      }, null, 8, ["modelValue", "input-label", "options", "loading", "placeholder", "onSearch"])
    ])) : createCommentVNode("v-if", true),
    createVNode($setup["CardDiv"], { type: "info" }, {
      default: withCtx(() => [
        createBaseVNode(
          "p",
          null,
          toDisplayString($setup.t("agora", "Effects on restricted owners:")),
          1
          /* TEXT */
        ),
        createBaseVNode("ul", null, [
          createBaseVNode(
            "li",
            null,
            toDisplayString($setup.t(
              "agora",
              "Anonymizing a inquiry of a restricted owner means that this inquiry is anonymous for everyone, including the owner."
            )),
            1
            /* TEXT */
          ),
          createBaseVNode(
            "li",
            null,
            toDisplayString($setup.t("agora", "Deleting and changing inquiries of participants is not possible")),
            1
            /* TEXT */
          )
        ])
      ]),
      _: 1
      /* STABLE */
    })
  ]);
}
const AdminUnrescrictedOwners = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__file", "/var/www/nextcloud/apps/agora/src/components/Settings/AdminSettings/AdminUnrescrictedOwners.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AdminSettingsPage",
  setup(__props, { expose: __expose }) {
    __expose();
    const appSettingsStore = useAppSettingsStore();
    const isLoaded = ref(false);
    const sections = {
      inquiryCategoryLocation: {
        name: translate("agora", "Categories and Locations Management"),
        description: translate("agora", "Change globally location and category (for all accounts)")
      },
      inquiryModerationStatus: {
        name: translate("agora", "Moderation status settings"),
        description: translate(
          "agora",
          "Configure moderation statuses for each type of inquiry. Moderators will be able to set these statuses on inquiries."
        )
      },
      inquirySettings: {
        name: translate("agora", "Inquiry settings"),
        description: translate("agora", "Change inquiry settings globally (for all accounts)")
      },
      inquiryRights: {
        name: translate("agora", "Inquiry rights"),
        description: translate("agora", "Change inquiry rights globally (for all accounts)")
      },
      shareSettings: {
        name: translate("agora", "Share settings"),
        description: translate("agora", "Change share settings globally (for all accounts)")
      },
      otherSettings: {
        name: translate("agora", "Other settings"),
        description: translate("agora", "Enable or disable individual features.")
      },
      performanceSettings: {
        name: translate("agora", "Performance settings"),
        description: translate(
          "agora",
          "If you are experiencing connection problems, change how auto updates are retrieved."
        )
      },
      publicSettings: {
        name: translate("agora", "Public inquiry registration dialog options"),
        description: translate(
          "agora",
          "These options regard the appearence of the registration dialog of public inquiries."
        )
      },
      emailSettings: {
        name: translate("agora", "Email options"),
        description: translate(
          "agora",
          "Add links to legal terms, if they exist and add an optional disclaimer to emails."
        )
      },
      jobSettings: {
        name: translate("agora", "Job control"),
        description: translate("agora", "Manually start backgropund jobs, independent from the cron schedule.")
      }
    };
    onMounted(async () => {
      try {
        await appSettingsStore.load();
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        isLoaded.value = true;
      }
    });
    const __returned__ = { appSettingsStore, isLoaded, sections, get NcSettingsSection() {
      return NcSettingsSection;
    }, get FlexSettings() {
      return FlexSettings;
    }, get AdminActivities() {
      return AdminActivities;
    }, get AdminArchiveInquiries() {
      return AdminArchiveInquiries;
    }, get AdminDeleteInquiries() {
      return AdminDeleteInquiries;
    }, get AdminEmail() {
      return AdminEmail;
    }, get AdminModerationStatus() {
      return AdminModerationStatus;
    }, get AdminJobs() {
      return AdminJobs;
    }, get AdminLegal() {
      return AdminLegal;
    }, get AdminInquiryRights() {
      return AdminInquiryRights;
    }, get AdminModeratorRights() {
      return AdminModeratorRights;
    }, get AdminOfficialRights() {
      return AdminOfficialRights;
    }, get AdminCategoryLocation() {
      return AdminCategoryLocation;
    }, get AdminPerformance() {
      return AdminPerformance;
    }, get AdminInquiryCreation() {
      return AdminInquiryCreation;
    }, get AdminInquiriesInNavigation() {
      return AdminInquiriesInNavigation;
    }, get AdminShareOpenInquiry() {
      return AdminShareOpenInquiry;
    }, get AdminSharePublicCreate() {
      return AdminSharePublicCreate;
    }, get AdminSharePublicShowLogin() {
      return AdminSharePublicShowLogin;
    }, get AdminShowMailAddresses() {
      return AdminShowMailAddresses;
    }, get AdminUnrescrictedOwners() {
      return AdminUnrescrictedOwners;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1 = { key: 0 };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return $setup.isLoaded ? (openBlock(), createElementBlock("div", _hoisted_1, [
    createVNode($setup["FlexSettings"], null, {
      default: withCtx(() => [
        createVNode($setup["NcSettingsSection"], null, {
          default: withCtx(() => [
            createVNode(
              $setup["NcSettingsSection"],
              normalizeProps(guardReactiveProps($setup.sections.inquirySettings)),
              {
                default: withCtx(() => [
                  createVNode($setup["AdminInquiryCreation"]),
                  createVNode($setup["AdminUnrescrictedOwners"]),
                  createVNode($setup["AdminArchiveInquiries"]),
                  createVNode($setup["AdminDeleteInquiries"])
                ]),
                _: 1
                /* STABLE */
              },
              16
              /* FULL_PROPS */
            ),
            createVNode(
              $setup["NcSettingsSection"],
              normalizeProps(guardReactiveProps($setup.sections.inquiryRights)),
              {
                default: withCtx(() => [
                  createVNode($setup["AdminInquiryRights"]),
                  createVNode($setup["AdminModeratorRights"]),
                  createVNode($setup["AdminOfficialRights"])
                ]),
                _: 1
                /* STABLE */
              },
              16
              /* FULL_PROPS */
            ),
            createVNode(
              $setup["NcSettingsSection"],
              normalizeProps(guardReactiveProps($setup.sections.shareSettings)),
              {
                default: withCtx(() => [
                  createVNode($setup["AdminShareOpenInquiry"]),
                  createVNode($setup["AdminSharePublicCreate"]),
                  createVNode($setup["AdminSharePublicShowLogin"]),
                  createVNode($setup["AdminLegal"])
                ]),
                _: 1
                /* STABLE */
              },
              16
              /* FULL_PROPS */
            ),
            createVNode(
              $setup["NcSettingsSection"],
              normalizeProps(guardReactiveProps($setup.sections.otherSettings)),
              {
                default: withCtx(() => [
                  createVNode($setup["AdminActivities"]),
                  createVNode($setup["AdminShowMailAddresses"])
                ]),
                _: 1
                /* STABLE */
              },
              16
              /* FULL_PROPS */
            ),
            createVNode(
              $setup["NcSettingsSection"],
              normalizeProps(guardReactiveProps($setup.sections.performanceSettings)),
              {
                default: withCtx(() => [
                  createVNode($setup["AdminPerformance"]),
                  createVNode($setup["AdminInquiriesInNavigation"])
                ]),
                _: 1
                /* STABLE */
              },
              16
              /* FULL_PROPS */
            ),
            createVNode(
              $setup["NcSettingsSection"],
              normalizeProps(guardReactiveProps($setup.sections.emailSettings)),
              {
                default: withCtx(() => [
                  createVNode($setup["AdminEmail"])
                ]),
                _: 1
                /* STABLE */
              },
              16
              /* FULL_PROPS */
            )
          ]),
          _: 1
          /* STABLE */
        }),
        createVNode($setup["NcSettingsSection"], null, {
          default: withCtx(() => [
            createVNode(
              $setup["NcSettingsSection"],
              normalizeProps(guardReactiveProps($setup.sections.inquiryCategoryLocation)),
              {
                default: withCtx(() => [
                  createVNode($setup["AdminCategoryLocation"])
                ]),
                _: 1
                /* STABLE */
              },
              16
              /* FULL_PROPS */
            ),
            createVNode(
              $setup["NcSettingsSection"],
              normalizeProps(guardReactiveProps($setup.sections.inquiryModerationStatus)),
              {
                default: withCtx(() => [
                  createVNode($setup["AdminModerationStatus"])
                ]),
                _: 1
                /* STABLE */
              },
              16
              /* FULL_PROPS */
            )
          ]),
          _: 1
          /* STABLE */
        }),
        createVNode($setup["NcSettingsSection"], null, {
          default: withCtx(() => [
            createVNode(
              $setup["NcSettingsSection"],
              normalizeProps(guardReactiveProps($setup.sections.jobSettings)),
              {
                default: withCtx(() => [
                  createVNode($setup["AdminJobs"])
                ]),
                _: 1
                /* STABLE */
              },
              16
              /* FULL_PROPS */
            )
          ]),
          _: 1
          /* STABLE */
        })
      ]),
      _: 1
      /* STABLE */
    })
  ])) : createCommentVNode("v-if", true);
}
const AdminSettingsPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/var/www/nextcloud/apps/agora/src/views/AdminSettingsPage.vue"]]);
const Agora = createApp(AdminSettingsPage).use(pinia);
Agora.mount("#content_agora");
//# sourceMappingURL=agora-adminSettings.mjs.map
