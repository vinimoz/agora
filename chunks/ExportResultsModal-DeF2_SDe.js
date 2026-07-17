(function() {
  "use strict";
  try {
    if (typeof document != "undefined") {
      var elementStyle = document.createElement("style");
      elementStyle.appendChild(document.createTextNode(".modal-content[data-v-db784841] {\n  padding: 24px;\n  min-width: 450px;\n}\n.export-header[data-v-db784841] {\n  text-align: center;\n  margin-bottom: 32px;\n}\n.export-header .header-icon[data-v-db784841] {\n  color: var(--color-primary-element);\n  margin-bottom: 16px;\n}\n.export-header h2[data-v-db784841] {\n  margin: 0 0 8px 0;\n  font-size: 24px;\n  font-weight: 600;\n}\n.export-header p[data-v-db784841] {\n  margin: 0;\n  color: var(--color-text-lighter);\n}\n.form-group[data-v-db784841] {\n  margin-bottom: 20px;\n}\n.form-group label[data-v-db784841] {\n  display: block;\n  margin-bottom: 8px;\n  font-weight: 500;\n  color: var(--color-main-text);\n}\n.checkbox-group[data-v-db784841] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.modal-actions[data-v-db784841] {\n  display: flex;\n  gap: 12px;\n  justify-content: flex-end;\n  margin-top: 24px;\n  padding-top: 20px;\n  border-top: 1px solid var(--color-border);\n}"));
      document.head.appendChild(elementStyle);
    }
  } catch (e) {
    console.error("vite-plugin-css-injected-by-js", e);
  }
})();
const appName = "agora";
const appVersion = "1.7.5";
import { d as defineComponent, s as ref, x as translate, C as NcButton, D as NcModal, p as _export_sfc, o as openBlock, b as createBlock, e as withCtx, h as createBaseVNode, f as resolveDynamicComponent, t as toDisplayString, g as createVNode, E as createTextVNode } from "./NcEmptyContent-CGAPqk4S-DlUuxFD2.js";
import { a as showSuccess, s as showError, I as InquiryGeneralIcons } from "./NcDashboardWidget-DKZ8Mgt0-C_FKuvfq.js";
import { N as NcCheckboxRadioSwitch, a as NcSelect } from "./NcRichText-Dkk6iX8F-B1jLjmLZ.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ExportResultsModal",
  props: {
    show: { type: Boolean, required: true }
  },
  emits: ["close", "exported"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const emit = __emit;
    const exporting = ref(false);
    const exportFormat = ref("csv");
    const includeMetadata = ref(true);
    const includeTimestamps = ref(true);
    const exportFormats = [
      { value: "csv", label: "CSV" },
      { value: "json", label: "JSON" },
      { value: "pdf", label: "PDF" }
    ];
    const exportResults = async () => {
      exporting.value = true;
      try {
        showSuccess(translate("agora", "To be implemented, results exported successfully as {format}", {
          format: exportFormat.value.toUpperCase()
        }));
        emit("exported");
        handleClose();
      } catch (error) {
        console.error("Export failed:", error);
        showError(translate("agora", "Failed to export results"));
      } finally {
        exporting.value = false;
      }
    };
    const handleClose = () => {
      emit("close");
    };
    const __returned__ = { props, emit, exporting, exportFormat, includeMetadata, includeTimestamps, exportFormats, exportResults, handleClose, get t() {
      return translate;
    }, get NcModal() {
      return NcModal;
    }, get NcButton() {
      return NcButton;
    }, get NcSelect() {
      return NcSelect;
    }, get NcCheckboxRadioSwitch() {
      return NcCheckboxRadioSwitch;
    }, get InquiryGeneralIcons() {
      return InquiryGeneralIcons;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1 = { class: "modal-content" };
const _hoisted_2 = { class: "export-header" };
const _hoisted_3 = { class: "form-group" };
const _hoisted_4 = { class: "form-group" };
const _hoisted_5 = { class: "checkbox-group" };
const _hoisted_6 = { class: "modal-actions" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock($setup["NcModal"], {
    show: $props.show,
    size: "normal",
    onClose: $setup.handleClose
  }, {
    default: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          (openBlock(), createBlock(resolveDynamicComponent($setup.InquiryGeneralIcons.Export), {
            size: 48,
            class: "header-icon"
          })),
          createBaseVNode(
            "h2",
            null,
            toDisplayString($setup.t("agora", "Export Results")),
            1
            /* TEXT */
          ),
          createBaseVNode(
            "p",
            null,
            toDisplayString($setup.t("agora", "Export voting results in your preferred format")),
            1
            /* TEXT */
          )
        ]),
        createBaseVNode("div", _hoisted_3, [
          createBaseVNode(
            "label",
            null,
            toDisplayString($setup.t("agora", "Export Format")),
            1
            /* TEXT */
          ),
          createVNode($setup["NcSelect"], {
            modelValue: $setup.exportFormat,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.exportFormat = $event),
            options: $setup.exportFormats,
            "input-label": $setup.t("agora", "Select format")
          }, null, 8, ["modelValue", "input-label"])
        ]),
        createBaseVNode("div", _hoisted_4, [
          createBaseVNode(
            "label",
            null,
            toDisplayString($setup.t("agora", "Options")),
            1
            /* TEXT */
          ),
          createBaseVNode("div", _hoisted_5, [
            createVNode($setup["NcCheckboxRadioSwitch"], {
              modelValue: $setup.includeMetadata,
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.includeMetadata = $event),
              type: "switch"
            }, {
              default: withCtx(() => [
                createTextVNode(
                  toDisplayString($setup.t("agora", "Include metadata")),
                  1
                  /* TEXT */
                )
              ]),
              _: 1
              /* STABLE */
            }, 8, ["modelValue"]),
            createVNode($setup["NcCheckboxRadioSwitch"], {
              modelValue: $setup.includeTimestamps,
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.includeTimestamps = $event),
              type: "switch"
            }, {
              default: withCtx(() => [
                createTextVNode(
                  toDisplayString($setup.t("agora", "Include timestamps")),
                  1
                  /* TEXT */
                )
              ]),
              _: 1
              /* STABLE */
            }, 8, ["modelValue"])
          ])
        ]),
        createBaseVNode("div", _hoisted_6, [
          createVNode($setup["NcButton"], {
            type: "tertiary",
            onClick: $setup.handleClose
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
            loading: $setup.exporting,
            onClick: $setup.exportResults
          }, {
            icon: withCtx(() => [
              (openBlock(), createBlock(resolveDynamicComponent($setup.InquiryGeneralIcons.Download), { size: 20 }))
            ]),
            default: withCtx(() => [
              createTextVNode(
                " " + toDisplayString($setup.t("agora", "Export")),
                1
                /* TEXT */
              )
            ]),
            _: 1
            /* STABLE */
          }, 8, ["loading"])
        ])
      ])
    ]),
    _: 1
    /* STABLE */
  }, 8, ["show"]);
}
const ExportResultsModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-db784841"], ["__file", "/var/www/nextcloud/apps/agora/src/components/Options/Actions/ExportResultsModal.vue"]]);
export {
  ExportResultsModal as default
};
//# sourceMappingURL=ExportResultsModal-DeF2_SDe.js.map
