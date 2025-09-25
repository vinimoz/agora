const appName = "agora";
const appVersion = "1.0.0-rc5";
import { a as _export_sfc, d as defineComponent, m as mergeModels, u as useModel, b as computed, w as warn, R as RouterLink, e as watch, f as createBlock, o as openBlock, g as withCtx, r as renderSlot, h as resolveDynamicComponent, i as mergeProps, j as createVNode, k as createBaseVNode, c as createElementBlock, l as createCommentVNode, n as unref, N as NcAvatar, p as normalizeStyle, t as toDisplayString, q as NcPopover, _ as _export_sfc$1 } from "./NcEmptyContent-q-geAf0w-DpSvTJqc.chunk.mjs";
const _sfc_main$1 = {};
function _sfc_render$1(_ctx, _cache) {
  return openBlock(), createElementBlock("div", null, [
    renderSlot(_ctx.$slots, "trigger")
  ]);
}
const NcUserBubbleDiv = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
const _hoisted_1$1 = { class: "user-bubble__name" };
const _hoisted_2$1 = {
  key: 0,
  class: "user-bubble__secondary"
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "NcUserBubble",
  props: /* @__PURE__ */ mergeModels({
    avatarImage: { default: void 0 },
    user: { default: void 0 },
    displayName: { default: void 0 },
    showUserStatus: { type: Boolean },
    url: { default: void 0 },
    to: { default: void 0 },
    primary: { type: Boolean },
    size: { default: 20 },
    margin: { default: 2 }
  }, {
    "open": { type: Boolean },
    "openModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["click"], ["update:open"]),
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const isOpen = useModel(__props, "open");
    const isAvatarUrl = computed(() => {
      if (!props.avatarImage) {
        return false;
      }
      try {
        const url = new URL(props.avatarImage);
        return !!url;
      } catch (error) {
        return false;
      }
    });
    const isCustomAvatar = computed(() => !!props.avatarImage);
    const avatarStyle = computed(() => ({
      marginInlineStart: `${props.margin}px`
    }));
    const hasUrl = computed(() => {
      if (!props.url || props.url.trim() === "") {
        return false;
      }
      try {
        const url = new URL(props.url, props.url?.startsWith?.("/") ? window.location.href : void 0);
        return !!url;
      } catch (error) {
        warn("[NcUserBubble] Invalid URL passed", { url: props.url });
        return false;
      }
    });
    const href = computed(() => hasUrl.value ? props.url : void 0);
    const contentComponent = computed(() => {
      if (hasUrl.value) {
        return "a";
      } else if (props.to) {
        return RouterLink;
      } else {
        return "div";
      }
    });
    const contentStyle = computed(() => ({
      height: `${props.size}px`,
      lineHeight: `${props.size}px`,
      borderRadius: `${props.size / 2}px`
    }));
    watch([() => props.displayName, () => props.user], () => {
      if (!props.displayName && !props.user) {
        warn("[NcUserBubble] At least `displayName` or `user` property should be set.");
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(!!_ctx.$slots.default ? unref(NcPopover) : NcUserBubbleDiv), {
        shown: isOpen.value,
        "onUpdate:shown": _cache[1] || (_cache[1] = ($event) => isOpen.value = $event),
        class: "user-bubble__wrapper",
        trigger: "hover focus"
      }, {
        trigger: withCtx(({ attrs }) => [
          (openBlock(), createBlock(resolveDynamicComponent(contentComponent.value), mergeProps({
            class: ["user-bubble__content", { "user-bubble__content--primary": _ctx.primary }],
            style: contentStyle.value,
            to: _ctx.to,
            href: href.value
          }, attrs, {
            onClick: _cache[0] || (_cache[0] = ($event) => emit("click", $event))
          }), {
            default: withCtx(() => [
              createVNode(unref(NcAvatar), {
                url: isCustomAvatar.value && isAvatarUrl.value ? _ctx.avatarImage : void 0,
                "icon-class": isCustomAvatar.value && !isAvatarUrl.value ? _ctx.avatarImage : void 0,
                user: _ctx.user,
                "display-name": _ctx.displayName,
                size: _ctx.size - _ctx.margin * 2,
                style: normalizeStyle(avatarStyle.value),
                "disable-tooltip": true,
                "disable-menu": true,
                "hide-status": !_ctx.showUserStatus,
                class: "user-bubble__avatar"
              }, null, 8, ["url", "icon-class", "user", "display-name", "size", "style", "hide-status"]),
              createBaseVNode("span", _hoisted_1$1, toDisplayString(_ctx.displayName || _ctx.user), 1),
              !!_ctx.$slots.name ? (openBlock(), createElementBlock("span", _hoisted_2$1, [
                renderSlot(_ctx.$slots, "name", {}, void 0, true)
              ])) : createCommentVNode("", true)
            ]),
            _: 2
          }, 1040, ["class", "style", "to", "href"]))
        ]),
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ]),
        _: 3
      }, 40, ["shown"]);
    };
  }
});
const NcUserBubble = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-a7e3a34c"]]);
const _sfc_main = {
  name: "CalendarEndIcon",
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
const _hoisted_1 = ["aria-hidden", "aria-label"];
const _hoisted_2 = ["fill", "width", "height"];
const _hoisted_3 = { d: "M22 14V22H20V18L16 22V19H11V17H16V14L20 18V14H22M5 19L9 19V21L5 21C3.9 21 3 20.1 3 19V5C3 3.89 3.9 3 5 3H6V.998H8V3H16V.998H18V3H19C20.11 3 21 3.89 21 5L21 12H19V8H5V19Z" };
const _hoisted_4 = { key: 0 };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("span", mergeProps(_ctx.$attrs, {
    "aria-hidden": $props.title ? null : "true",
    "aria-label": $props.title,
    class: "material-design-icon calendar-end-icon",
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
      createBaseVNode("path", _hoisted_3, [
        $props.title ? (openBlock(), createElementBlock(
          "title",
          _hoisted_4,
          toDisplayString($props.title),
          1
          /* TEXT */
        )) : createCommentVNode("v-if", true)
      ])
    ], 8, _hoisted_2))
  ], 16, _hoisted_1);
}
const ExpirationIcon = /* @__PURE__ */ _export_sfc$1(_sfc_main, [["render", _sfc_render], ["__file", "/var/www/nextcloud/apps/agora/node_modules/vue-material-design-icons/CalendarEnd.vue"]]);
export {
  ExpirationIcon as E,
  NcUserBubble as N
};
//# sourceMappingURL=CalendarEnd-DiGIO2ac.chunk.mjs.map
