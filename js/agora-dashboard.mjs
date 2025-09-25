(function() {
  "use strict";
  try {
    if (typeof document != "undefined") {
      var elementStyle = document.createElement("style");
      elementStyle.appendChild(document.createTextNode(".inquiry-item__item[data-v-7f773d42] {\n  display: flex;\n  padding: 4px 0;\n}\n.inquiry-item__item.active[data-v-7f773d42] {\n  background-color: var(--color-primary-element-light);\n}\n.inquiry-item__item[data-v-7f773d42]:hover {\n  background-color: var(--color-background-hover);\n}\n.item__title[data-v-7f773d42] {\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.item__title[data-v-7f773d42] * {\n  display: block;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.item__title .item__title__description[data-v-7f773d42] {\n  opacity: 0.5;\n}\n.item__icon-spacer[data-v-7f773d42] {\n  width: 44px;\n  min-width: 44px;\n}/*!\n * SPDX-FileCopyrightText: 2025 Trappe Vincent \n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n.icon-agora {\n  background-image: url(../img/agora.svg);\n  filter: var(--background-invert-if-dark);\n}\n\n.icon-agora-dark {\n  background-image: url(../img/agora-dark.svg);\n  filter: var(--background-invert-if-dark);\n}"));
      document.head.appendChild(elementStyle);
    }
  } catch (e) {
    console.error("vite-plugin-css-injected-by-js", e);
  }
})();
const appName = "agora";
const appVersion = "1.0.0-rc5";
import { d as defineComponent, s as translate, v as onMounted, D as purify, E as _, _ as _export_sfc, c as createElementBlock, o as openBlock, j as createVNode, g as withCtx, k as createBaseVNode, f as createBlock, h as resolveDynamicComponent, t as toDisplayString, z as createApp, A as pinia } from "./NcEmptyContent-q-geAf0w-DpSvTJqc.chunk.mjs";
import { a as useInquiriesStore, L as Logger, s as showError, I as InquiryTypesUI, N as NcDashboardWidget } from "./NcDashboardWidget-Wkx_9xKh-Bw6f1oJM.chunk.mjs";
import { A as AgoraAppIcon } from "./AgoraAppIcon-CsAywkmy.chunk.mjs";

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Dashboard",
  setup(__props, { expose: __expose }) {
    __expose();
    const dashboardWidgetProperties = {
      emptyContentMessage: translate("agora", "No inquiries found for this category"),
      showMoreText: translate("agora", "Relevant inquiries")
    };
    const inquiriesStore = useInquiriesStore();
    function loadInquiries() {
      Logger.debug("Loading inquiries in dashboard widget");
      try {
        inquiriesStore.load();
      } catch {
        showError(translate("agora", "Error setting dashboard list"));
      }
    }
    onMounted(() => {
      loadInquiries();
    });
    const __returned__ = { dashboardWidgetProperties, inquiriesStore, loadInquiries, get generateUrl() {
      return _;
    }, get t() {
      return translate;
    }, get DOMPurify() {
      return purify;
    }, get NcDashboardWidget() {
      return NcDashboardWidget;
    }, get InquiryTypesUI() {
      return InquiryTypesUI;
    }, get AgoraAppIcon() {
      return AgoraAppIcon;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1 = ["href"];
const _hoisted_2 = { class: "inquiry-item__item" };
const _hoisted_3 = { class: "type-icon" };
const _hoisted_4 = { class: "item__title" };
const _hoisted_5 = { class: "item__title__title" };
const _hoisted_6 = { class: "item__title__description" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [
    createVNode($setup["NcDashboardWidget"], {
      items: $setup.inquiriesStore.dashboardList,
      "empty-content-message": $setup.dashboardWidgetProperties.emptyContentMessage,
      "show-more-text": $setup.dashboardWidgetProperties.showMoreText,
      loading: $setup.inquiriesStore.inquiriesLoading
    }, {
      emptyContentIcon: withCtx(() => [
        createVNode($setup["AgoraAppIcon"])
      ]),
      default: withCtx(({ item }) => [
        createBaseVNode("a", {
          href: $setup.generateUrl(`/apps/agora/inquiry/${item.id}`)
        }, [
          createBaseVNode("div", _hoisted_2, [
            createBaseVNode("div", _hoisted_3, [
              (openBlock(), createBlock(resolveDynamicComponent($setup.InquiryTypesUI[item.type].icon)))
            ]),
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode(
                "div",
                _hoisted_5,
                toDisplayString(item.title),
                1
                /* TEXT */
              ),
              createBaseVNode(
                "div",
                _hoisted_6,
                toDisplayString($setup.DOMPurify.sanitize(
                  item.description ? item.description : $setup.t("agora", "No description provided")
                )),
                1
                /* TEXT */
              )
            ])
          ])
        ], 8, _hoisted_1)
      ]),
      _: 1
      /* STABLE */
    }, 8, ["items", "empty-content-message", "show-more-text", "loading"])
  ]);
}
const Dashboard = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7f773d42"], ["__file", "/var/www/nextcloud/apps/agora/src/views/Dashboard.vue"]]);
document.addEventListener("DOMContentLoaded", () => {
  OCA.Dashboard.register("agora", (el) => {
    const AgoraDashboard = createApp(Dashboard).use(pinia).mount(el);
    return AgoraDashboard;
  });
});
//# sourceMappingURL=agora-dashboard.mjs.map
