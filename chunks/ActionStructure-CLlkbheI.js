const appName = "agora";
const appVersion = "1.7.5";
import { d as defineComponent, p as _export_sfc, o as openBlock, b as createBlock } from "./NcEmptyContent-CGAPqk4S-DlUuxFD2.js";
import ImportDocumentModal from "./ImportDocumentModal-B9UB3Cvi.js";
import "./NcDashboardWidget-DKZ8Mgt0-C_FKuvfq.js";
import "./NcRichText-Dkk6iX8F-B1jLjmLZ.js";
import "./index-Bfp6FUTl.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ActionStructure",
  emits: ["close", "actionCompleted"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const emit = __emit;
    const handleClose = () => {
      emit("close");
    };
    const handleImported = (result) => {
      emit("actionCompleted", {
        ...result,
        refreshOptions: true,
        message: "Document imported successfully"
      });
    };
    const __returned__ = { emit, handleClose, handleImported, ImportDocumentModal };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock($setup["ImportDocumentModal"], {
    show: _ctx.show,
    "family-key": _ctx.familyKey,
    "inquiry-id": _ctx.inquiryId,
    onClose: $setup.handleClose,
    onImported: $setup.handleImported
  }, null, 8, ["show", "family-key", "inquiry-id"]);
}
const ActionStructure = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/var/www/nextcloud/apps/agora/src/components/Options/Actions/ActionStructure.vue"]]);
export {
  ActionStructure as default
};
//# sourceMappingURL=ActionStructure-CLlkbheI.js.map
