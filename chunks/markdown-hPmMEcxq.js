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
const appVersion = "1.7.5";
import { _ as _export_sfc, d as defineComponent, c as computed, o as openBlock, i as createElementBlock, r as renderSlot, g as createVNode, K as normalizeClass, M as unref, O as NcIconSvgWrapper, h as createBaseVNode, t as toDisplayString, j as createCommentVNode, P as isLegacy, Q as mdiAlert, R as mdiInformation, S as mdiCheckboxMarkedCircle, T as mdiAlertDecagram, p as _export_sfc$1, b as createBlock, e as withCtx, y as normalizeProps, z as guardReactiveProps, u as useModel, U as useAttrs, V as useTemplateRef, w as watch, W as logger, m as mergeProps, X as mdiCheck, Y as mdiAlertCircleOutline, E as createTextVNode, l as mergeModels, Z as createElementId, F as Fragment, L as renderList } from "./NcEmptyContent-CGAPqk4S-DlUuxFD2.js";
import "./NcDashboardWidget-DKZ8Mgt0-C_FKuvfq.js";
import "./index-Bfp6FUTl.js";
import { N as NcCheckboxRadioSwitch } from "./NcRichText-Dkk6iX8F-B1jLjmLZ.js";
const _hoisted_1$3 = ["role"];
const _hoisted_2$2 = {
  key: 0,
  class: "notecard__heading"
};
const _hoisted_3$2 = { class: "notecard__text" };
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
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
        class: normalizeClass(["notecard", {
          [`notecard--${__props.type}`]: __props.type,
          "notecard--legacy": unref(isLegacy)
        }]),
        role: shouldShowAlert.value ? "alert" : "note"
      }, [
        renderSlot(_ctx.$slots, "icon", {}, () => [
          createVNode(unref(NcIconSvgWrapper), {
            path: iconPath.value,
            class: normalizeClass(["notecard__icon", { "notecard__icon--heading": __props.heading }]),
            inline: ""
          }, null, 8, ["path", "class"])
        ], true),
        createBaseVNode("div", null, [
          __props.heading ? (openBlock(), createElementBlock("p", _hoisted_2$2, toDisplayString(__props.heading), 1)) : createCommentVNode("", true),
          renderSlot(_ctx.$slots, "default", {}, () => [
            createBaseVNode("p", _hoisted_3$2, toDisplayString(__props.text), 1)
          ], true)
        ])
      ], 10, _hoisted_1$3);
    };
  }
});
const NcNoteCard = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-6be9fa31"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
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
const _hoisted_1$2 = { class: "card-content" };
const _hoisted_2$1 = { class: "left-card-side" };
const _hoisted_3$1 = { class: "right-card-side" };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(
    $setup["NcNoteCard"],
    normalizeProps(guardReactiveProps(_ctx.$attrs)),
    {
      default: withCtx(() => [
        createBaseVNode("div", _hoisted_1$2, [
          createBaseVNode("div", _hoisted_2$1, [
            renderSlot(_ctx.$slots, "default")
          ]),
          createBaseVNode("div", _hoisted_3$1, [
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
const CardDiv = /* @__PURE__ */ _export_sfc$1(_sfc_main$2, [["render", _sfc_render$1], ["__file", "/var/www/nextcloud/apps/agora/src/components/Base/modules/CardDiv.vue"]]);
const _hoisted_1$1 = { class: "textarea__main-wrapper" };
const _hoisted_2 = ["id", "aria-describedby", "disabled", "placeholder", "value"];
const _hoisted_3 = ["for"];
const _hoisted_4 = ["id"];
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...{ inheritAttrs: false },
  __name: "NcTextArea",
  props: /* @__PURE__ */ mergeModels({
    disabled: { type: Boolean },
    error: { type: Boolean },
    helperText: { default: void 0 },
    id: { default: () => createElementId() },
    inputClass: { default: "" },
    label: { default: void 0 },
    labelOutside: { type: Boolean },
    placeholder: { default: void 0 },
    resize: { default: "both" },
    success: { type: Boolean }
  }, {
    "modelValue": { required: true },
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose }) {
    const modelValue = useModel(__props, "modelValue");
    const props = __props;
    __expose({
      focus,
      select
    });
    const attrs = useAttrs();
    const textAreaElement = useTemplateRef("input");
    const internalPlaceholder = computed(() => props.placeholder || (isLegacy ? props.label : void 0));
    watch(() => props.labelOutside, () => {
      if (!props.labelOutside && !props.label) {
        logger.warn("[NcTextArea] You need to add a label to the NcInputField component. Either use the prop label or use an external one, as per the example in the documentation.");
      }
    });
    const ariaDescribedby = computed(() => {
      const ariaDescribedby2 = [];
      if (props.helperText) {
        ariaDescribedby2.push(`${props.id}-helper-text`);
      }
      if (typeof attrs["aria-describedby"] === "string") {
        ariaDescribedby2.push(attrs["aria-describedby"]);
      }
      return ariaDescribedby2.join(" ") || void 0;
    });
    function handleInput(event) {
      const { value } = event.target;
      modelValue.value = value;
    }
    function focus(options) {
      textAreaElement.value.focus(options);
    }
    function select() {
      textAreaElement.value.select();
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["textarea", [
          _ctx.$attrs.class,
          {
            "textarea--disabled": __props.disabled,
            "textarea--legacy": unref(isLegacy)
          }
        ]])
      }, [
        createBaseVNode("div", _hoisted_1$1, [
          createBaseVNode("textarea", mergeProps({ ..._ctx.$attrs, class: void 0 }, {
            id: __props.id,
            ref: "input",
            "aria-describedby": ariaDescribedby.value,
            "aria-live": "polite",
            class: ["textarea__input", [
              __props.inputClass,
              {
                "textarea__input--label-outside": __props.labelOutside,
                "textarea__input--legacy": unref(isLegacy),
                "textarea__input--success": __props.success,
                "textarea__input--error": __props.error
              }
            ]],
            disabled: __props.disabled,
            placeholder: internalPlaceholder.value,
            style: { resize: __props.resize },
            value: modelValue.value,
            onInput: handleInput
          }), null, 16, _hoisted_2),
          !__props.labelOutside ? (openBlock(), createElementBlock("label", {
            key: 0,
            class: "textarea__label",
            for: __props.id
          }, toDisplayString(__props.label), 9, _hoisted_3)) : createCommentVNode("", true)
        ]),
        __props.helperText ? (openBlock(), createElementBlock("p", {
          key: 0,
          id: `${__props.id}-helper-text`,
          class: normalizeClass(["textarea__helper-text-message", {
            "textarea__helper-text-message--error": __props.error,
            "textarea__helper-text-message--success": __props.success
          }])
        }, [
          __props.success ? (openBlock(), createBlock(NcIconSvgWrapper, {
            key: 0,
            class: "textarea__helper-text-message__icon",
            path: unref(mdiCheck),
            inline: ""
          }, null, 8, ["path"])) : __props.error ? (openBlock(), createBlock(NcIconSvgWrapper, {
            key: 1,
            class: "textarea__helper-text-message__icon",
            path: unref(mdiAlertCircleOutline),
            inline: ""
          }, null, 8, ["path"])) : createCommentVNode("", true),
          createTextVNode(" " + toDisplayString(__props.helperText), 1)
        ], 10, _hoisted_4)) : createCommentVNode("", true)
      ], 2);
    };
  }
});
const NcTextArea = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-d327fb49"]]);
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
  NcNoteCard as N,
  RadioGroupDiv as R,
  NcTextArea as a
};
//# sourceMappingURL=markdown-hPmMEcxq.js.map
