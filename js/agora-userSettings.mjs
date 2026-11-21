const appName = "agora";
const appVersion = "1.8.0";
import { d as defineComponent, V as translate, B as onMounted, _ as _export_sfc, o as openBlock, f as createBlock, g as withCtx, i as createVNode, W as normalizeProps, X as guardReactiveProps, Y as createApp, Z as pinia } from "./NcEmptyContent-1duUFQhY.chunk.mjs";
import { N as NcSettingsSection } from "./be-tarask-3Xk940aQ.chunk.mjs";
import "./NcDashboardWidget-CbjbEfSD.chunk.mjs";
import { F as FlexSettings } from "./FlexSettings-BkKw6jH0.chunk.mjs";
import "./NcRichText-C6H3fuO_.chunk.mjs";
import "./referencePickerModal-CbCg3pQA.chunk.mjs";
import "./NcProfileHoverCard-D1W-FElA.chunk.mjs";
import { u as usePreferencesStore, S as StyleSettings, F as FeatureSettings } from "./StyleSettings-DSuG5Cwp.chunk.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "UserSettingsPage",
  setup(__props, { expose: __expose }) {
    __expose();
    const preferencesStore = usePreferencesStore();
    const sections = {
      personalSettings: {
        name: translate("agora", "Personal preferences"),
        description: translate("agora", "Set your personal preferences for the agora app")
      },
      styleSettings: {
        name: translate("agora", "Experimental styles"),
        description: translate("agora", "Some visual styling options")
      }
    };
    onMounted(() => {
      preferencesStore.load();
    });
    const __returned__ = { preferencesStore, sections, get NcSettingsSection() {
      return NcSettingsSection;
    }, get FlexSettings() {
      return FlexSettings;
    }, get FeatureSettings() {
      return FeatureSettings;
    }, get StyleSettings() {
      return StyleSettings;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock($setup["FlexSettings"], null, {
    default: withCtx(() => [
      createVNode(
        $setup["NcSettingsSection"],
        normalizeProps(guardReactiveProps($setup.sections.personalSettings)),
        {
          default: withCtx(() => [
            createVNode($setup["FeatureSettings"])
          ]),
          _: 1
          /* STABLE */
        },
        16
        /* FULL_PROPS */
      ),
      createVNode(
        $setup["NcSettingsSection"],
        normalizeProps(guardReactiveProps($setup.sections.styleSettings)),
        {
          default: withCtx(() => [
            createVNode($setup["StyleSettings"])
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
  });
}
const UserSettingsPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/home/vini/Nextcloud/agora1.8.0/src/views/UserSettingsPage.vue"]]);
const Agora = createApp(UserSettingsPage).use(pinia);
Agora.mount("#content_agora");
//# sourceMappingURL=agora-userSettings.mjs.map
