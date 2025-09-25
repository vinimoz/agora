const appName = "agora";
const appVersion = "1.0.0-rc5";
import { d as defineComponent, s as translate, v as onMounted, _ as _export_sfc, f as createBlock, o as openBlock, g as withCtx, j as createVNode, x as normalizeProps, y as guardReactiveProps, z as createApp, A as pinia } from "./NcEmptyContent-q-geAf0w-DpSvTJqc.chunk.mjs";
import { N as NcSettingsSection } from "./index-CZ70RVFy.chunk.mjs";
import "./NcDashboardWidget-Wkx_9xKh-Bw6f1oJM.chunk.mjs";
import { F as FlexSettings } from "./FlexSettings-BTiWc4QN.chunk.mjs";
import { u as usePreferencesStore, S as StyleSettings, F as FeatureSettings } from "./StyleSettings-Bl2d-fZa.chunk.mjs";
import "./NcRichText-G8kzsdwx-IKlnWRaR.chunk.mjs";
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
        description: translate("agora", "Some visual styling options.")
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
const UserSettingsPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/var/www/nextcloud/apps/agora/src/views/UserSettingsPage.vue"]]);
const Agora = createApp(UserSettingsPage).use(pinia);
Agora.mount("#content_agora");
//# sourceMappingURL=agora-userSettings.mjs.map
