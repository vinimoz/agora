<<<<<<< HEAD
const appName = "agora";
const appVersion = "1.8.0";
import { d as defineComponent, v as translate, q as onMounted, p as _export_sfc, o as openBlock, b as createBlock, e as withCtx, g as createVNode, x as normalizeProps, y as guardReactiveProps, z as createApp, A as pinia } from "./NcEmptyContent-CGAPqk4S-CgF6gab2.chunk.mjs";
import { N as NcSettingsSection } from "./index-DbCJbBAh.chunk.mjs";
import "./NcDashboardWidget-DKZ8Mgt0-CW8gWKb9.chunk.mjs";
import { F as FlexSettings } from "./FlexSettings-C3jHWTwO.chunk.mjs";
import "./NcRichText-Dkk6iX8F-KgSfqhZR.chunk.mjs";
import { u as usePreferencesStore, S as StyleSettings, F as FeatureSettings } from "./StyleSettings-Bem1V1Pd.chunk.mjs";
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
const UserSettingsPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/var/www/nextcloud/apps/agora/src/views/UserSettingsPage.vue"]]);
const Agora = createApp(UserSettingsPage).use(pinia);
Agora.mount("#content_agora");
=======
const A = "agora", k = "1.7.7";
import { d as c, q as a, s as m, o as l, b as g, e as t, g as s, v as e, x as r, y as n, z as f, A as _ } from "./TernarySupportIcon.vue_vue_type_style_index_0_scoped_bbec35a7_lang-BtfU7b8T.chunk.mjs";
import { N as i } from "./index-DwoOaxOX.chunk.mjs";
import "./NcDashboardWidget-CvpYMKur-D-8FOrUK.chunk.mjs";
import { F as u } from "./FlexSettings-CpRdlBCZ.chunk.mjs";
import "./NcRichText-D_ssz6sB-x_P0HHms.chunk.mjs";
import { u as S, _ as d, a as y } from "./StyleSettings-DM6K-cpc.chunk.mjs";
const x = c({ __name: "UserSettingsPage", setup(N) {
  const p = S(), o = { personalSettings: { name: a("agora", "Personal preferences"), description: a("agora", "Set your personal preferences for the agora app") }, styleSettings: { name: a("agora", "Experimental styles"), description: a("agora", "Some visual styling options") } };
  return m(() => {
    p.load();
  }), (h, v) => (l(), g(e(u), null, { default: t(() => [s(e(i), r(n(o.personalSettings)), { default: t(() => [s(e(d))]), _: 1 }, 16), s(e(i), r(n(o.styleSettings)), { default: t(() => [s(e(y))]), _: 1 }, 16)]), _: 1 }));
} }), P = f(x).use(_);
P.mount("#content_agora");
>>>>>>> main
//# sourceMappingURL=agora-userSettings.mjs.map
