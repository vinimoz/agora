(function() {
  "use strict";
  try {
    if (typeof document != "undefined") {
      var elementStyle = document.createElement("style");
      elementStyle.appendChild(document.createTextNode("/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/*\n* Ensure proper alignment of the vue material icons\n*/\n.material-design-icon[data-v-8e16cbb5] {\n  display: flex;\n  align-self: center;\n  justify-self: center;\n  align-items: center;\n  justify-content: center;\n}\n\n/*!\n * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n * Similar as inputBorder but without active styles.\n */\n/**\n * Create a consistent border for an input element.\n * With Nextcloud 32+ there is no real border anymore but we use a box-shadow.\n */\n.input-field[data-v-8e16cbb5] {\n  --input-border-color: var(--color-border-maxcontrast);\n  --input-border-radius: var(--border-radius-element);\n  --input-padding-start: var(--border-radius-element);\n  --input-padding-end: var(--border-radius-element);\n  position: relative;\n  width: 100%;\n  margin-block-start: 6px;\n}\n.input-field--disabled[data-v-8e16cbb5] {\n  opacity: 0.4;\n  filter: saturate(0.4);\n}\n.input-field--label-outside[data-v-8e16cbb5] {\n  margin-block-start: 0;\n}\n.input-field--leading-icon[data-v-8e16cbb5] {\n  --input-padding-start: calc(var(--default-clickable-area) - var(--default-grid-baseline));\n}\n.input-field--trailing-icon[data-v-8e16cbb5] {\n  --input-padding-end: calc(var(--default-clickable-area) - var(--default-grid-baseline));\n}\n.input-field--pill[data-v-8e16cbb5] {\n  --input-border-radius: var(--border-radius-pill);\n}\n.input-field__main-wrapper[data-v-8e16cbb5] {\n  height: var(--default-clickable-area);\n  padding: var(--border-width-input-focused, 2px);\n  position: relative;\n}\n.input-field__input[data-v-8e16cbb5] {\n  --input-border-box-shadow-light: 0 -1px var(--input-border-color),\n  	0 0 0 1px color-mix(in srgb, var(--input-border-color), 65% transparent);\n  --input-border-box-shadow-dark: 0 1px var(--input-border-color),\n  	0 0 0 1px color-mix(in srgb, var(--input-border-color), 65% transparent);\n  --input-border-box-shadow: var(--input-border-box-shadow-light);\n  border: none;\n  border-radius: var(--border-radius-element);\n  box-shadow: var(--input-border-box-shadow);\n}\n.input-field__input[data-v-8e16cbb5]:hover:not([disabled]) {\n  box-shadow: 0 0 0 1px var(--input-border-color);\n}\n@media (prefers-color-scheme: dark) {\n.input-field__input .input-field__input[data-v-8e16cbb5] {\n    --input-border-box-shadow: var(--input-border-box-shadow-dark);\n}\n}\n[data-theme-dark] .input-field__input[data-v-8e16cbb5] {\n  --input-border-box-shadow: var(--input-border-box-shadow-dark);\n}\n[data-theme-light] .input-field__input[data-v-8e16cbb5] {\n  --input-border-box-shadow: var(--input-border-box-shadow-light);\n}\n.input-field--legacy .input-field__input[data-v-8e16cbb5] {\n  box-shadow: 0 0 0 1px var(--input-border-color);\n}\n.input-field--legacy .input-field__input[data-v-8e16cbb5]:hover:not([disabled]) {\n  box-shadow: 0 0 0 2px var(--input-border-color);\n}\n.input-field__input[data-v-8e16cbb5]:focus-within:not([disabled]), .input-field__input[data-v-8e16cbb5]:active:not([disabled]) {\n  box-shadow: 0 0 0 2px var(--input-border-color), 0 0 0 4px var(--color-main-background) !important;\n}\n.input-field__input[data-v-8e16cbb5] {\n  background-color: var(--color-main-background);\n  color: var(--color-main-text);\n  border-radius: var(--input-border-radius);\n  cursor: pointer;\n  -webkit-appearance: textfield !important;\n  -moz-appearance: textfield !important;\n  appearance: textfield !important;\n  font-size: var(--default-font-size);\n  text-overflow: ellipsis;\n  padding-block: 0;\n  padding-inline: var(--input-padding-start) var(--input-padding-end);\n  height: 100% !important;\n  min-height: unset;\n  width: 100%;\n}\n.input-field__input[data-v-8e16cbb5]::placeholder {\n  color: var(--color-text-maxcontrast);\n}\n.input-field__input[data-v-8e16cbb5]::-webkit-search-cancel-button {\n  display: none;\n}\n.input-field__input[data-v-8e16cbb5]::-webkit-search-decoration, .input-field__input[data-v-8e16cbb5]::-webkit-search-results-button, .input-field__input[data-v-8e16cbb5]::-webkit-search-results-decoration, .input-field__input[data-v-8e16cbb5]::-ms-clear {\n  display: none;\n}\n.input-field__input[data-v-8e16cbb5]:active:not([disabled]), .input-field__input[data-v-8e16cbb5]:focus:not([disabled]) {\n  --input-border-color: var(--color-main-text);\n}\n.input-field__input:focus + .input-field__label[data-v-8e16cbb5], .input-field__input:hover:not(:placeholder-shown) + .input-field__label[data-v-8e16cbb5] {\n  color: var(--color-main-text);\n}\n.input-field__input[data-v-8e16cbb5]:focus {\n  cursor: text;\n}\n.input-field__input[data-v-8e16cbb5]:disabled {\n  cursor: default;\n}\n.input-field__input[data-v-8e16cbb5]:focus-visible {\n  box-shadow: unset !important;\n}\n.input-field:not(.input-field--label-outside) .input-field__input[data-v-8e16cbb5]:not(:focus)::placeholder {\n  opacity: 0;\n}\n.input-field__label[data-v-8e16cbb5] {\n  --input-label-font-size: var(--default-font-size);\n  font-size: var(--input-label-font-size);\n  position: absolute;\n  margin-inline: var(--input-padding-start) var(--input-padding-end);\n  max-width: fit-content;\n  inset-block-start: calc((var(--default-clickable-area) - 1lh) / 2);\n  inset-inline: var(--border-width-input-focused, 2px);\n  color: var(--color-text-maxcontrast);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  pointer-events: none;\n  transition: height var(--animation-quick), inset-block-start var(--animation-quick), font-size var(--animation-quick), color var(--animation-quick), background-color var(--animation-quick) var(--animation-slow);\n}\n.input-field__input:focus + .input-field__label[data-v-8e16cbb5], .input-field__input:not(:placeholder-shown) + .input-field__label[data-v-8e16cbb5] {\n  --input-label-font-size: 13px;\n  line-height: 1.5;\n  inset-block-start: calc(-1.5 * var(--input-label-font-size) / 2);\n  font-weight: var(--font-weight-element, 500);\n  border-radius: var(--default-grid-baseline) var(--default-grid-baseline) 0 0;\n  background-color: var(--color-main-background);\n  padding-inline: var(--default-grid-baseline);\n  margin-inline: calc(var(--input-padding-start) - var(--default-grid-baseline)) calc(var(--input-padding-end) - var(--default-grid-baseline));\n  transition: height var(--animation-quick), inset-block-start var(--animation-quick), font-size var(--animation-quick), color var(--animation-quick);\n}\n.input-field__icon[data-v-8e16cbb5] {\n  position: absolute;\n  height: var(--default-clickable-area);\n  width: var(--default-clickable-area);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  opacity: 0.7;\n  inset-block-end: 0;\n}\n.input-field__icon--leading[data-v-8e16cbb5] {\n  inset-inline-start: 0px;\n}\n.input-field__icon--trailing[data-v-8e16cbb5] {\n  inset-inline-end: 0px;\n}\n.input-field__trailing-button[data-v-8e16cbb5] {\n  --button-size: calc(var(--default-clickable-area) - 2 * var(--border-width-input-focused, 2px)) !important;\n  --button-radius: calc(var(--input-border-radius) - var(--border-width-input-focused, 2px));\n}\n.input-field__trailing-button.button-vue[data-v-8e16cbb5] {\n  position: absolute;\n  top: var(--border-width-input-focused, 2px);\n  inset-inline-end: var(--border-width-input-focused, 2px);\n}\n.input-field__trailing-button.button-vue[data-v-8e16cbb5]:focus-visible {\n  box-shadow: none !important;\n}\n.input-field__helper-text-message[data-v-8e16cbb5] {\n  padding-block: 4px;\n  padding-inline: var(--border-radius-element);\n  display: flex;\n  align-items: center;\n  color: var(--color-text-maxcontrast);\n  overflow-wrap: anywhere;\n}\n.input-field__helper-text-message__icon[data-v-8e16cbb5] {\n  margin-inline-end: 8px;\n}\n.input-field--error .input-field__helper-text-message[data-v-8e16cbb5],\n.input-field--error .input-field__icon--trailing[data-v-8e16cbb5] {\n  color: var(--color-text-error, var(--color-error));\n}\n.input-field--error .input-field__input[data-v-8e16cbb5], .input-field__input[data-v-8e16cbb5]:user-invalid {\n  --input-border-color: var(--color-border-error, var(--color-error)) !important;\n}\n.input-field--error .input-field__input[data-v-8e16cbb5]:focus-visible, .input-field__input[data-v-8e16cbb5]:user-invalid:focus-visible {\n  box-shadow: rgb(248, 250, 252) 0px 0px 0px 2px, var(--color-primary-element) 0px 0px 0px 4px, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;\n}\n.input-field--success .input-field__input[data-v-8e16cbb5] {\n  --input-border-color: var(--color-border-success, var(--color-success)) !important;\n}\n.input-field--success .input-field__input[data-v-8e16cbb5]:focus-visible {\n  box-shadow: rgb(248, 250, 252) 0px 0px 0px 2px, var(--color-primary-element) 0px 0px 0px 4px, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;\n}\n.input-field--success .input-field__helper-text-message__icon[data-v-8e16cbb5] {\n  color: var(--color-border-success, var(--color-success));\n}/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/*\n* Ensure proper alignment of the vue material icons\n*/\n.material-design-icon[data-v-5ca1e30f] {\n  display: flex;\n  align-self: center;\n  justify-self: center;\n  align-items: center;\n  justify-content: center;\n}\n.checkbox-content[data-v-5ca1e30f] {\n  display: flex;\n  align-items: center;\n  flex-direction: row;\n  gap: var(--default-grid-baseline);\n  user-select: none;\n  min-height: var(--default-clickable-area);\n  border-radius: var(--checkbox-radio-switch--border-radius);\n  padding: var(--default-grid-baseline) calc((var(--default-clickable-area) - var(--icon-height)) / 2);\n  width: 100%;\n  max-width: fit-content;\n}\n.checkbox-content__wrapper[data-v-5ca1e30f] {\n  flex: 1 0 0;\n  max-width: 100%;\n}\n.checkbox-content__text[data-v-5ca1e30f]:empty {\n  display: none;\n}\n.checkbox-content-checkbox:not(.checkbox-content--button-variant) .checkbox-content__icon[data-v-5ca1e30f], .checkbox-content-radio:not(.checkbox-content--button-variant) .checkbox-content__icon[data-v-5ca1e30f], .checkbox-content-switch:not(.checkbox-content--button-variant) .checkbox-content__icon[data-v-5ca1e30f] {\n  margin-block: calc((var(--default-clickable-area) - 2 * var(--default-grid-baseline) - var(--icon-height)) / 2) auto;\n  line-height: 0;\n}\n.checkbox-content-checkbox:not(.checkbox-content--button-variant) .checkbox-content__icon--has-description[data-v-5ca1e30f], .checkbox-content-radio:not(.checkbox-content--button-variant) .checkbox-content__icon--has-description[data-v-5ca1e30f], .checkbox-content-switch:not(.checkbox-content--button-variant) .checkbox-content__icon--has-description[data-v-5ca1e30f] {\n  display: flex;\n  align-items: center;\n  margin-block-end: 0;\n  align-self: start;\n}\n.checkbox-content__icon[data-v-5ca1e30f] > * {\n  width: var(--icon-size);\n  height: var(--icon-height);\n  color: var(--color-primary-element);\n}\n.checkbox-content__description[data-v-5ca1e30f] {\n  display: block;\n  color: var(--color-text-maxcontrast);\n  font-weight: var(--font-weight-default, normal);\n}\n.checkbox-content--button-variant .checkbox-content__icon[data-v-5ca1e30f]:not(.checkbox-content__icon--checked) > * {\n  color: var(--color-primary-element);\n}\n.checkbox-content--button-variant .checkbox-content__icon--checked[data-v-5ca1e30f] > * {\n  color: var(--color-primary-element-text);\n}\n.checkbox-content--has-text[data-v-5ca1e30f] {\n  padding-inline-end: calc((var(--default-clickable-area) - 16px) / 2);\n}\n.checkbox-content[data-v-5ca1e30f], .checkbox-content[data-v-5ca1e30f] * {\n  cursor: pointer;\n  flex-shrink: 0;\n}/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/*\n* Ensure proper alignment of the vue material icons\n*/\n.material-design-icon[data-v-c34c63a4] {\n  display: flex;\n  align-self: center;\n  justify-self: center;\n  align-items: center;\n  justify-content: center;\n}\n.checkbox-radio-switch[data-v-c34c63a4] {\n  --icon-size: var(--v5ac25550);\n  --icon-height: var(--d98ce684);\n  --checkbox-radio-switch--border-radius: var(--border-radius-element);\n  --checkbox-radio-switch--border-radius-outer: calc(var(--checkbox-radio-switch--border-radius) + 2px);\n  display: flex;\n  align-items: center;\n  color: var(--color-main-text);\n  background-color: transparent;\n  font-size: var(--default-font-size);\n  font-weight: var(--font-weight-element, normal);\n  line-height: var(--default-line-height);\n  padding: 0;\n  position: relative;\n}\n.checkbox-radio-switch__input[data-v-c34c63a4] {\n  position: absolute;\n  z-index: -1;\n  opacity: 0 !important;\n  width: var(--icon-size);\n  height: var(--icon-size);\n}\n.checkbox-radio-switch__input:focus-visible + .checkbox-radio-switch__content[data-v-c34c63a4], .checkbox-radio-switch__input[data-v-c34c63a4]:focus-visible {\n  outline: 2px solid var(--color-main-text);\n  border-color: var(--color-main-background);\n  outline-offset: -2px;\n}\n.checkbox-radio-switch--disabled .checkbox-radio-switch__content[data-v-c34c63a4] {\n  opacity: 0.5;\n}\n.checkbox-radio-switch--disabled .checkbox-radio-switch__content[data-v-c34c63a4] .checkbox-radio-switch__icon > * {\n  color: var(--color-main-text);\n}\n.checkbox-radio-switch--disabled .checkbox-radio-switch__content.checkbox-content[data-v-c34c63a4], .checkbox-radio-switch--disabled .checkbox-radio-switch__content.checkbox-content[data-v-c34c63a4] *:not(a) {\n  cursor: default !important;\n}\n.checkbox-radio-switch:not(.checkbox-radio-switch--disabled, .checkbox-radio-switch--checked):focus-within .checkbox-radio-switch__content[data-v-c34c63a4], .checkbox-radio-switch:not(.checkbox-radio-switch--disabled, .checkbox-radio-switch--checked) .checkbox-radio-switch__content[data-v-c34c63a4]:hover {\n  background-color: var(--color-background-hover);\n}\n.checkbox-radio-switch--checked:not(.checkbox-radio-switch--disabled):focus-within .checkbox-radio-switch__content[data-v-c34c63a4], .checkbox-radio-switch--checked:not(.checkbox-radio-switch--disabled) .checkbox-radio-switch__content[data-v-c34c63a4]:hover {\n  background-color: var(--color-primary-element-hover);\n}\n.checkbox-radio-switch--checked:not(.checkbox-radio-switch--button-variant):not(.checkbox-radio-switch--disabled):focus-within .checkbox-radio-switch__content[data-v-c34c63a4], .checkbox-radio-switch--checked:not(.checkbox-radio-switch--button-variant):not(.checkbox-radio-switch--disabled) .checkbox-radio-switch__content[data-v-c34c63a4]:hover {\n  background-color: var(--color-primary-element-light-hover);\n}\n.checkbox-radio-switch-switch[data-v-c34c63a4]:not(.checkbox-radio-switch--checked) .checkbox-radio-switch__icon > * {\n  color: var(--color-text-maxcontrast);\n}\n.checkbox-radio-switch-switch.checkbox-radio-switch--disabled.checkbox-radio-switch--checked[data-v-c34c63a4] .checkbox-radio-switch__icon > * {\n  color: var(--color-primary-element-light);\n}\n.checkbox-radio-switch--button-variant.checkbox-radio-switch[data-v-c34c63a4] {\n  background-color: var(--color-main-background);\n  border: 2px solid var(--color-border-maxcontrast);\n  overflow: hidden;\n}\n.checkbox-radio-switch--button-variant.checkbox-radio-switch--checked[data-v-c34c63a4] {\n  font-weight: var(--font-weight-element, bold);\n}\n.checkbox-radio-switch--button-variant.checkbox-radio-switch--checked .checkbox-radio-switch__content[data-v-c34c63a4] {\n  background-color: var(--color-primary-element);\n  color: var(--color-primary-element-text);\n}\n.checkbox-radio-switch--button-variant[data-v-c34c63a4] .checkbox-radio-switch__text {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  width: 100%;\n}\n.checkbox-radio-switch--button-variant[data-v-c34c63a4]:not(.checkbox-radio-switch--checked) .checkbox-radio-switch__icon > * {\n  color: var(--color-main-text);\n}\n.checkbox-radio-switch--button-variant[data-v-c34c63a4] .checkbox-radio-switch__icon:empty {\n  display: none;\n}\n.checkbox-radio-switch--button-variant[data-v-c34c63a4]:not(.checkbox-radio-switch--button-variant-v-grouped):not(.checkbox-radio-switch--button-variant-h-grouped), .checkbox-radio-switch--button-variant .checkbox-radio-switch__content[data-v-c34c63a4] {\n  border-radius: var(--checkbox-radio-switch--border-radius);\n}\n.checkbox-radio-switch[data-v-c34c63a4] {\n  /* Special rules for vertical button groups */\n}\n.checkbox-radio-switch--button-variant-v-grouped .checkbox-radio-switch__content[data-v-c34c63a4] {\n  flex-basis: 100%;\n  max-width: unset;\n}\n.checkbox-radio-switch--button-variant-v-grouped[data-v-c34c63a4]:first-of-type {\n  border-start-start-radius: var(--checkbox-radio-switch--border-radius-outer);\n  border-start-end-radius: var(--checkbox-radio-switch--border-radius-outer);\n}\n.checkbox-radio-switch--button-variant-v-grouped[data-v-c34c63a4]:last-of-type {\n  border-end-start-radius: var(--checkbox-radio-switch--border-radius-outer);\n  border-end-end-radius: var(--checkbox-radio-switch--border-radius-outer);\n}\n.checkbox-radio-switch--button-variant-v-grouped[data-v-c34c63a4]:not(:last-of-type) {\n  border-bottom: 0 !important;\n}\n.checkbox-radio-switch--button-variant-v-grouped:not(:last-of-type) .checkbox-radio-switch__content[data-v-c34c63a4] {\n  margin-bottom: 2px;\n}\n.checkbox-radio-switch--button-variant-v-grouped[data-v-c34c63a4]:not(:first-of-type) {\n  border-top: 0 !important;\n}\n.checkbox-radio-switch[data-v-c34c63a4] {\n  /* Special rules for horizontal button groups */\n}\n.checkbox-radio-switch--button-variant-h-grouped[data-v-c34c63a4]:first-of-type {\n  border-start-start-radius: var(--checkbox-radio-switch--border-radius-outer);\n  border-end-start-radius: var(--checkbox-radio-switch--border-radius-outer);\n}\n.checkbox-radio-switch--button-variant-h-grouped[data-v-c34c63a4]:last-of-type {\n  border-start-end-radius: var(--checkbox-radio-switch--border-radius-outer);\n  border-end-end-radius: var(--checkbox-radio-switch--border-radius-outer);\n}\n.checkbox-radio-switch--button-variant-h-grouped[data-v-c34c63a4]:not(:last-of-type) {\n  border-inline-end: 0 !important;\n}\n.checkbox-radio-switch--button-variant-h-grouped:not(:last-of-type) .checkbox-radio-switch__content[data-v-c34c63a4] {\n  margin-inline-end: 2px;\n}\n.checkbox-radio-switch--button-variant-h-grouped[data-v-c34c63a4]:not(:first-of-type) {\n  border-inline-start: 0 !important;\n}\n.checkbox-radio-switch--button-variant-h-grouped[data-v-c34c63a4] .checkbox-radio-switch__text {\n  text-align: center;\n  display: flex;\n  align-items: center;\n}\n.checkbox-radio-switch--button-variant-h-grouped .checkbox-radio-switch__content[data-v-c34c63a4] {\n  flex-direction: column;\n  justify-content: center;\n  width: 100%;\n  margin: 0;\n  gap: 0;\n}/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/*\n* Ensure proper alignment of the vue material icons\n*/\n._material-design-icon_tLFaA {\n  display: flex;\n  align-self: center;\n  justify-self: center;\n  align-items: center;\n  justify-content: center;\n}\n._iconToggleSwitch_CPPoW {\n  color: var(--v6bd152af);\n  transition: color var(--animation-quick) ease;\n}\n._iconToggleSwitch_CPPoW svg {\n  /* Unlike other icons, this icon is not a square */\n  height: auto !important;\n}\n._iconToggleSwitch_CPPoW circle {\n  cx: var(--v16fd8ca9);\n  transition: cx var(--animation-quick) ease;\n}/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/*\n* Ensure proper alignment of the vue material icons\n*/\n.material-design-icon {\n  display: flex;\n  align-self: center;\n  justify-self: center;\n  align-items: center;\n  justify-content: center;\n}\n\n/*!\n * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n * Similar as inputBorder but without active styles.\n */\n/**\n * Create a consistent border for an input element.\n * With Nextcloud 32+ there is no real border anymore but we use a box-shadow.\n */\nbody {\n  /**\n   * Set custom vue-select CSS variables.\n   * Needs to be on the body (not :root) for theming to apply (see nextcloud/server#36462)\n   */\n  /* Search Input */\n  --vs-search-input-color: var(--color-main-text);\n  --vs-search-input-bg: var(--color-main-background);\n  --vs-search-input-placeholder-color: var(--color-text-maxcontrast);\n  /* Font */\n  --vs-font-size: var(--default-font-size);\n  --vs-line-height: var(--default-line-height);\n  /* Disabled State */\n  --vs-state-disabled-bg: var(--color-background-hover);\n  --vs-state-disabled-color: var(--color-text-maxcontrast);\n  --vs-state-disabled-controls-color: var(--color-text-maxcontrast);\n  --vs-state-disabled-cursor: not-allowed;\n  --vs-disabled-bg: var(--color-background-hover);\n  --vs-disabled-color: var(--color-text-maxcontrast);\n  --vs-disabled-cursor: not-allowed;\n  /* Borders */\n  --vs-border-color: var(--color-border-maxcontrast);\n  --vs-border-width: var(--border-width-input, 2px) !important;\n  --vs-border-style: solid;\n  --vs-border-radius: var(--border-radius-element);\n  /* Component Controls: Clear, Open Indicator */\n  --vs-controls-color: var(--color-main-text);\n  /* Selected */\n  --vs-selected-bg: var(--color-background-hover);\n  --vs-selected-color: var(--color-main-text);\n  --vs-selected-border-color: var(--vs-border-color);\n  --vs-selected-border-style: var(--vs-border-style);\n  --vs-selected-border-width: var(--vs-border-width);\n  /* Dropdown */\n  --vs-dropdown-bg: var(--color-main-background);\n  --vs-dropdown-color: var(--color-main-text);\n  --vs-dropdown-z-index: 9999;\n  --vs-dropdown-box-shadow: 0px 2px 2px 0px var(--color-box-shadow);\n  /* Options */\n  --vs-dropdown-option-padding: 8px 20px;\n  /* Active State */\n  --vs-dropdown-option--active-bg: var(--color-background-hover);\n  --vs-dropdown-option--active-color: var(--color-main-text);\n  /* Keyboard Focus State */\n  --vs-dropdown-option--kb-focus-box-shadow: inset 0px 0px 0px 2px var(--vs-border-color);\n  /* Deselect State */\n  --vs-dropdown-option--deselect-bg: var(--color-error);\n  --vs-dropdown-option--deselect-color: #fff;\n  /* Transitions */\n  --vs-transition-duration: 0ms;\n  /* Actions */\n  --vs-actions-padding: 0 8px 0 4px;\n}\n.v-select.select {\n  /* Override default vue-select styles */\n  min-height: calc(var(--default-clickable-area) - 2 * var(--border-width-input));\n  min-width: 260px;\n  margin: 0 0 var(--default-grid-baseline);\n}\n.v-select.select.vs--open {\n  --vs-border-width: var(--border-width-input-focused, 2px);\n}\n.v-select.select .select__label {\n  display: block;\n  margin-bottom: 2px;\n}\n.v-select.select .vs__selected {\n  height: calc(var(--default-clickable-area) - 2 * var(--vs-border-width) - var(--default-grid-baseline));\n  margin: calc(var(--default-grid-baseline) / 2);\n  padding-block: 0;\n  padding-inline: 12px 8px;\n  border-radius: 16px !important;\n  background: var(--color-primary-element-light);\n  border: none;\n}\n.v-select.select.vs--open .vs__selected:first-of-type {\n  margin-inline-start: calc(var(--default-grid-baseline) / 2 - (var(--border-width-input-focused, 2px) - var(--border-width-input, 2px))) !important;\n}\n.v-select.select .vs__search {\n  text-overflow: ellipsis;\n  color: var(--color-main-text);\n  min-height: unset !important;\n  height: calc(var(--default-clickable-area) - 2 * var(--vs-border-width)) !important;\n}\n.v-select.select .vs__search::placeholder {\n  color: var(--color-text-maxcontrast);\n}\n.v-select.select .vs__search, .v-select.select .vs__search:focus {\n  margin: 0;\n}\n.v-select.select .vs__dropdown-toggle {\n  position: relative;\n  max-height: 100px;\n  padding: var(--border-width-input);\n  overflow-y: auto;\n}\n.v-select.select .vs__actions {\n  position: sticky;\n  top: 0;\n}\n.v-select.select .vs__clear {\n  margin-inline-end: 2px;\n}\n.v-select.select.vs--open .vs__dropdown-toggle {\n  border-color: var(--color-main-text);\n  border-bottom-color: transparent;\n  border-bottom-left-radius: 0;\n  border-bottom-right-radius: 0;\n  border-style: solid;\n  border-width: var(--border-width-input-focused);\n  outline: 2px solid var(--color-main-background);\n  padding: 0;\n}\n.v-select.select:not(.vs--disabled, .vs--open) .vs__dropdown-toggle:active,\n.v-select.select:not(.vs--disabled, .vs--open) .vs__dropdown-toggle:focus-within {\n  outline: 2px solid var(--color-main-background);\n  border-color: var(--color-main-text);\n}\n.v-select.select.vs--disabled .vs__search,\n.v-select.select.vs--disabled .vs__selected {\n  color: var(--color-text-maxcontrast);\n}\n.v-select.select.vs--disabled .vs__clear,\n.v-select.select.vs--disabled .vs__deselect {\n  display: none;\n}\n.v-select.select--no-wrap .vs__selected-options {\n  flex-wrap: nowrap;\n  overflow: auto;\n  min-width: unset;\n}\n.v-select.select--no-wrap .vs__selected-options .vs__selected {\n  min-width: unset;\n}\n.v-select.select--drop-up.vs--open .vs__dropdown-toggle {\n  border-radius: 0 0 var(--vs-border-radius) var(--vs-border-radius);\n  border-top-color: transparent;\n  border-bottom-color: var(--color-main-text);\n}\n.v-select.select .vs__selected-options {\n  min-height: calc(var(--default-clickable-area) - 2 * var(--vs-border-width));\n}\n.v-select.select .vs__selected-options .vs__selected ~ .vs__search[readonly] {\n  position: absolute;\n}\n.v-select.select .vs__selected-options {\n  padding: 0 5px;\n}\n.v-select.select.vs--single.vs--loading .vs__selected, .v-select.select.vs--single.vs--open .vs__selected {\n  max-width: 100%;\n  opacity: 1;\n  color: var(--color-text-maxcontrast);\n}\n.v-select.select.vs--single .vs__selected-options {\n  flex-wrap: nowrap;\n}\n.v-select.select.vs--single .vs__selected {\n  background: unset !important;\n}\n.vs__dropdown-toggle {\n  --input-border-box-shadow-light: 0 -1px var(--vs-border-color),\n  	0 0 0 1px color-mix(in srgb, var(--vs-border-color), 65% transparent);\n  --input-border-box-shadow-dark: 0 1px var(--vs-border-color),\n  	0 0 0 1px color-mix(in srgb, var(--vs-border-color), 65% transparent);\n  --input-border-box-shadow: var(--input-border-box-shadow-light);\n  border: none;\n  border-radius: var(--border-radius-element);\n  box-shadow: var(--input-border-box-shadow);\n}\n.vs__dropdown-toggle:hover:not([disabled]) {\n  box-shadow: 0 0 0 1px var(--vs-border-color);\n}\n@media (prefers-color-scheme: dark) {\n.vs__dropdown-toggle .vs__dropdown-toggle {\n    --input-border-box-shadow: var(--input-border-box-shadow-dark);\n}\n}\n[data-theme-dark] .vs__dropdown-toggle {\n  --input-border-box-shadow: var(--input-border-box-shadow-dark);\n}\n[data-theme-light] .vs__dropdown-toggle {\n  --input-border-box-shadow: var(--input-border-box-shadow-light);\n}\n.select--legacy .vs__dropdown-toggle {\n  box-shadow: 0 0 0 1px var(--vs-border-color);\n}\n.select--legacy .vs__dropdown-toggle:hover:not([disabled]) {\n  box-shadow: 0 0 0 2px var(--vs-border-color);\n}\n.vs__dropdown-menu {\n  border-width: var(--border-width-input-focused) !important;\n  border-color: var(--color-main-text) !important;\n  outline: none !important;\n  box-shadow: -2px 0 0 var(--color-main-background), 0 2px 0 var(--color-main-background), 2px 0 0 var(--color-main-background), !important;\n  padding: 4px !important;\n}\n.vs__dropdown-menu--floating {\n  /* Fallback styles overidden by programmatically set inline styles */\n  width: max-content;\n  position: absolute;\n  top: 0;\n  inset-inline-start: 0;\n}\n.vs__dropdown-menu--floating-placement-top {\n  border-radius: var(--vs-border-radius) var(--vs-border-radius) 0 0 !important;\n  border-top-style: var(--vs-border-style) !important;\n  border-bottom-style: none !important;\n  box-shadow: 0 -2px 0 var(--color-main-background), -2px 0 0 var(--color-main-background), 2px 0 0 var(--color-main-background), !important;\n}\n.vs__dropdown-menu .vs__dropdown-option {\n  border-radius: 6px !important;\n}\n.vs__dropdown-menu .vs__no-options {\n  color: var(--color-text-maxcontrast) !important;\n}:root{--vs-colors--lightest:rgba(60,60,60,.26);--vs-colors--light:rgba(60,60,60,.5);--vs-colors--dark:#333;--vs-colors--darkest:rgba(0,0,0,.15);--vs-search-input-color:inherit;--vs-search-input-bg:#fff;--vs-search-input-placeholder-color:inherit;--vs-font-size:1rem;--vs-line-height:1.4;--vs-state-disabled-bg:#f8f8f8;--vs-state-disabled-color:var(--vs-colors--light);--vs-state-disabled-controls-color:var(--vs-colors--light);--vs-state-disabled-cursor:not-allowed;--vs-border-color:var(--vs-colors--lightest);--vs-border-width:1px;--vs-border-style:solid;--vs-border-radius:4px;--vs-actions-padding:4px 6px 0 3px;--vs-controls-color:var(--vs-colors--light);--vs-controls-size:1;--vs-controls--deselect-text-shadow:0 1px 0 #fff;--vs-selected-bg:#f0f0f0;--vs-selected-color:var(--vs-colors--dark);--vs-selected-border-color:var(--vs-border-color);--vs-selected-border-style:var(--vs-border-style);--vs-selected-border-width:var(--vs-border-width);--vs-dropdown-bg:#fff;--vs-dropdown-color:inherit;--vs-dropdown-z-index:1000;--vs-dropdown-min-width:160px;--vs-dropdown-max-height:350px;--vs-dropdown-box-shadow:0px 3px 6px 0px var(--vs-colors--darkest);--vs-dropdown-option-bg:#000;--vs-dropdown-option-color:var(--vs-dropdown-color);--vs-dropdown-option-padding:3px 20px;--vs-dropdown-option--active-bg:#136cfb;--vs-dropdown-option--active-color:#fff;--vs-dropdown-option--kb-focus-box-shadow:inset 0px 0px 0px 2px #949494;--vs-dropdown-option--deselect-bg:#fb5858;--vs-dropdown-option--deselect-color:#fff;--vs-transition-timing-function:cubic-bezier(1,-0.115,0.975,0.855);--vs-transition-duration:150ms}.v-select{font-family:inherit;position:relative}.v-select,.v-select *{box-sizing:border-box}:root{--vs-transition-timing-function:cubic-bezier(1,0.5,0.8,1);--vs-transition-duration:0.15s}@keyframes vSelectSpinner{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}.vs__fade-enter-active,.vs__fade-leave-active{pointer-events:none;transition:opacity var(--vs-transition-duration) var(--vs-transition-timing-function)}.vs__fade-enter,.vs__fade-leave-to{opacity:0}:root{--vs-disabled-bg:var(--vs-state-disabled-bg);--vs-disabled-color:var(--vs-state-disabled-color);--vs-disabled-cursor:var(--vs-state-disabled-cursor)}.vs--disabled{.vs__clear,.vs__dropdown-toggle,.vs__open-indicator,.vs__open-indicator-button,.vs__search,.vs__selected{background-color:var(--vs-disabled-bg);cursor:var(--vs-disabled-cursor)}}.v-select[dir=rtl]{.vs__actions{padding:0 3px 0 6px}.vs__clear{margin-left:6px;margin-right:0}.vs__deselect{margin-left:0;margin-right:2px}.vs__dropdown-menu{text-align:right}}.vs__dropdown-toggle{-webkit-appearance:none;-moz-appearance:none;appearance:none;background:var(--vs-search-input-bg);border:var(--vs-border-width) var(--vs-border-style) var(--vs-border-color);border-radius:var(--vs-border-radius);display:flex;padding:0 0 4px;white-space:normal}.vs__selected-options{display:flex;flex-basis:100%;flex-grow:1;flex-wrap:wrap;min-width:0;padding:0 2px;position:relative}.vs__actions{align-items:center;display:flex;padding:var(--vs-actions-padding)}.vs--searchable .vs__dropdown-toggle{cursor:text}.vs--unsearchable .vs__dropdown-toggle{cursor:pointer}.vs--open .vs__dropdown-toggle{border-bottom-color:transparent;border-bottom-left-radius:0;border-bottom-right-radius:0}.vs__open-indicator-button{background-color:transparent;border:0;cursor:pointer;padding:0}.vs__open-indicator{fill:var(--vs-controls-color);transform:scale(var(--vs-controls-size));transition:transform var(--vs-transition-duration) var(--vs-transition-timing-function);transition-timing-function:var(--vs-transition-timing-function)}.vs--open .vs__open-indicator{transform:rotate(180deg) scale(var(--vs-controls-size))}.vs--loading .vs__open-indicator{opacity:0}.vs__clear{background-color:transparent;border:0;cursor:pointer;fill:var(--vs-controls-color);margin-right:8px;padding:0}.vs__dropdown-menu{background:var(--vs-dropdown-bg);border:var(--vs-border-width) var(--vs-border-style) var(--vs-border-color);border-radius:0 0 var(--vs-border-radius) var(--vs-border-radius);border-top-style:none;box-shadow:var(--vs-dropdown-box-shadow);box-sizing:border-box;color:var(--vs-dropdown-color);display:block;left:0;list-style:none;margin:0;max-height:var(--vs-dropdown-max-height);min-width:var(--vs-dropdown-min-width);overflow-y:auto;padding:5px 0;position:absolute;text-align:left;top:calc(100% - var(--vs-border-width));width:100%;z-index:var(--vs-dropdown-z-index)}.vs__no-options{text-align:center}.vs__dropdown-option{clear:both;color:var(--vs-dropdown-option-color);cursor:pointer;display:block;line-height:1.42857143;padding:var(--vs-dropdown-option-padding);white-space:nowrap}.vs__dropdown-option--highlight{background:var(--vs-dropdown-option--active-bg);color:var(--vs-dropdown-option--active-color)}.vs__dropdown-option--kb-focus{box-shadow:var(--vs-dropdown-option--kb-focus-box-shadow)}.vs__dropdown-option--deselect{background:var(--vs-dropdown-option--deselect-bg);color:var(--vs-dropdown-option--deselect-color)}.vs__dropdown-option--disabled{background:var(--vs-state-disabled-bg);color:var(--vs-state-disabled-color);cursor:var(--vs-state-disabled-cursor)}.vs__selected{align-items:center;background-color:var(--vs-selected-bg);border:var(--vs-selected-border-width) var(--vs-selected-border-style) var(--vs-selected-border-color);border-radius:var(--vs-border-radius);color:var(--vs-selected-color);display:flex;line-height:var(--vs-line-height);margin:4px 2px 0;min-width:0;padding:0 .25em;z-index:0}.vs__deselect{-webkit-appearance:none;-moz-appearance:none;appearance:none;background:none;border:0;cursor:pointer;display:inline-flex;fill:var(--vs-controls-color);margin-left:4px;padding:0;text-shadow:var(--vs-controls--deselect-text-shadow)}.vs--single{.vs__selected{background-color:transparent;border-color:transparent}&.vs--loading .vs__selected,&.vs--open .vs__selected{max-width:100%;opacity:.4;position:absolute}&.vs--searching .vs__selected{display:none}}.vs__search::-webkit-search-cancel-button{display:none}.vs__search::-ms-clear,.vs__search::-webkit-search-decoration,.vs__search::-webkit-search-results-button,.vs__search::-webkit-search-results-decoration{display:none}.vs__search,.vs__search:focus{-webkit-appearance:none;-moz-appearance:none;appearance:none;background:none;border:1px solid transparent;border-left:none;box-shadow:none;color:var(--vs-search-input-color);flex-grow:1;font-size:var(--vs-font-size);line-height:var(--vs-line-height);margin:4px 0 0;max-width:100%;outline:none;padding:0 7px;width:0;z-index:1}.vs__search::-moz-placeholder{color:var(--vs-search-input-placeholder-color)}.vs__search::placeholder{color:var(--vs-search-input-placeholder-color)}.vs--unsearchable{.vs__search{opacity:1}&:not(.vs--disabled) .vs__search{cursor:pointer}}.vs--single.vs--searching:not(.vs--open):not(.vs--loading){.vs__search{opacity:.2}}.vs__spinner{align-self:center;animation:vSelectSpinner 1.1s linear infinite;border:.9em solid hsla(0,0%,39.2%,.1);border-left-color:rgba(60,60,60,.45);font-size:5px;opacity:0;overflow:hidden;text-indent:-9999em;transform:translateZ(0) scale(var(--vs-controls--spinner-size,var(--vs-controls-size)));transition:opacity .1s}.vs__spinner,.vs__spinner:after{border-radius:50%;height:5em;transform:scale(var(--vs-controls--spinner-size,var(--vs-controls-size)));width:5em}.vs--loading .vs__spinner{opacity:1}/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/*\n* Ensure proper alignment of the vue material icons\n*/\n.material-design-icon[data-v-a612f185] {\n  display: flex;\n  align-self: center;\n  justify-self: center;\n  align-items: center;\n  justify-content: center;\n}\n.name-parts[data-v-a612f185] {\n  display: flex;\n  max-width: 100%;\n  cursor: inherit;\n}\n.name-parts__first[data-v-a612f185] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.name-parts__first[data-v-a612f185], .name-parts__last[data-v-a612f185] {\n  white-space: pre;\n  cursor: inherit;\n}\n.name-parts__first strong[data-v-a612f185], .name-parts__last strong[data-v-a612f185] {\n  font-weight: bold;\n}/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/*\n* Ensure proper alignment of the vue material icons\n*/\n.material-design-icon[data-v-e408867a] {\n  display: flex;\n  align-self: center;\n  justify-self: center;\n  align-items: center;\n  justify-content: center;\n}/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/*\n* Ensure proper alignment of the vue material icons\n*/\n.material-design-icon[data-v-ea81d3af] {\n  display: flex;\n  align-self: center;\n  justify-self: center;\n  align-items: center;\n  justify-content: center;\n}\n.provider-list[data-v-ea81d3af] {\n  width: 100%;\n  min-height: 400px;\n  padding: 0 16px 16px 16px;\n  display: flex;\n  flex-direction: column;\n}\n.provider-list--select[data-v-ea81d3af] {\n  width: 100%;\n}\n.provider-list--select .provider[data-v-ea81d3af] {\n  display: flex;\n  align-items: center;\n  height: 28px;\n  overflow: hidden;\n}\n.provider-list--select .provider .link-icon[data-v-ea81d3af] {\n  margin-inline-end: 8px;\n}\n.provider-list--select .provider .provider-icon[data-v-ea81d3af] {\n  width: 20px;\n  height: 20px;\n  object-fit: contain;\n  margin-inline-end: 8px;\n  filter: var(--background-invert-if-dark);\n}\n.provider-list--select .provider .option-text[data-v-ea81d3af] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/*\n* Ensure proper alignment of the vue material icons\n*/\n.material-design-icon[data-v-b0ec9f0b] {\n  display: flex;\n  align-self: center;\n  justify-self: center;\n  align-items: center;\n  justify-content: center;\n}\n.widget-custom[data-v-b0ec9f0b] {\n  width: 100%;\n  margin: auto;\n  margin-bottom: calc(var(--default-grid-baseline, 4px) * 3);\n  margin-top: calc(var(--default-grid-baseline, 4px) * 3);\n  overflow: hidden;\n  border: 2px solid var(--color-border);\n  border-radius: var(--border-radius-container);\n  background-color: transparent;\n  display: flex;\n}\n.widget-custom.full-width[data-v-b0ec9f0b] {\n  width: var(--widget-full-width, 100%) !important;\n  inset-inline-start: calc((var(--widget-full-width, 100%) - 100%) / 2 * -1);\n  position: relative;\n}\n.widget-access[data-v-b0ec9f0b] {\n  width: 100%;\n  margin: auto;\n  margin-bottom: calc(var(--default-grid-baseline, 4px) * 3);\n  margin-top: calc(var(--default-grid-baseline, 4px) * 3);\n  overflow: hidden;\n  border: 2px solid var(--color-border);\n  border-radius: var(--border-radius-container);\n  background-color: transparent;\n  display: flex;\n  padding: calc(var(--default-grid-baseline, 4px) * 3);\n}\n.widget-default[data-v-b0ec9f0b] {\n  width: 100%;\n  margin: auto;\n  margin-bottom: calc(var(--default-grid-baseline, 4px) * 3);\n  margin-top: calc(var(--default-grid-baseline, 4px) * 3);\n  overflow: hidden;\n  border: 2px solid var(--color-border);\n  border-radius: var(--border-radius-container);\n  background-color: transparent;\n  display: flex;\n}\n.widget-default--compact[data-v-b0ec9f0b] {\n  flex-direction: column;\n}\n.widget-default--compact .widget-default--image[data-v-b0ec9f0b] {\n  width: 100%;\n  height: 150px;\n}\n.widget-default--compact .widget-default--details[data-v-b0ec9f0b] {\n  width: 100%;\n  padding-top: calc(var(--default-grid-baseline, 4px) * 2);\n  padding-bottom: calc(var(--default-grid-baseline, 4px) * 2);\n}\n.widget-default--compact .widget-default--description[data-v-b0ec9f0b] {\n  display: none;\n}\n.widget-default--image[data-v-b0ec9f0b] {\n  width: 40%;\n  background-position: center;\n  background-size: cover;\n  background-repeat: no-repeat;\n}\n.widget-default--name[data-v-b0ec9f0b] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  font-weight: var(--font-weight-heading, bold);\n}\n.widget-default--details[data-v-b0ec9f0b] {\n  padding: calc(var(--default-grid-baseline, 4px) * 3);\n  width: 60%;\n}\n.widget-default--details p[data-v-b0ec9f0b] {\n  margin: 0;\n  padding: 0;\n}\n.widget-default--description[data-v-b0ec9f0b] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  line-clamp: 3; /* stylelint-disable-line property-no-unknown */\n  -webkit-box-orient: vertical;\n}\n.widget-default--link[data-v-b0ec9f0b] {\n  color: var(--color-text-maxcontrast);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.toggle-interactive[data-v-b0ec9f0b] {\n  position: relative;\n}\n.toggle-interactive .toggle-interactive--button[data-v-b0ec9f0b] {\n  position: absolute;\n  bottom: var(--default-grid-baseline);\n  inset-inline-end: var(--default-grid-baseline);\n  z-index: 10000;\n}/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/*\n* Ensure proper alignment of the vue material icons\n*/\n.material-design-icon[data-v-918730b9] {\n  display: flex;\n  align-self: center;\n  justify-self: center;\n  align-items: center;\n  justify-content: center;\n}\n.raw-link[data-v-918730b9] {\n  width: 100%;\n  min-height: 350px;\n  display: flex;\n  flex-direction: column;\n  overflow-y: auto;\n  padding: 0 16px 16px 16px;\n}\n.raw-link .input-wrapper[data-v-918730b9] {\n  width: 100%;\n}\n.raw-link .reference-widget[data-v-918730b9] {\n  display: flex;\n}\n.raw-link--empty-content .provider-icon[data-v-918730b9] {\n  width: 150px;\n  height: 150px;\n  object-fit: contain;\n  filter: var(--background-invert-if-dark);\n}\n.raw-link--input[data-v-918730b9] {\n  width: 99%;\n}/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/*\n* Ensure proper alignment of the vue material icons\n*/\n.material-design-icon[data-v-059edcfb] {\n  display: flex;\n  align-self: center;\n  justify-self: center;\n  align-items: center;\n  justify-content: center;\n}\n.result[data-v-059edcfb] {\n  display: flex;\n  align-items: center;\n  height: var(--default-clickable-area);\n  overflow: hidden;\n}\n.result--icon-class[data-v-059edcfb], .result--image[data-v-059edcfb] {\n  width: 40px;\n  min-width: 40px;\n  height: 40px;\n  object-fit: contain;\n}\n.result--icon-class.rounded[data-v-059edcfb], .result--image.rounded[data-v-059edcfb] {\n  border-radius: 50%;\n}\n.result--content[data-v-059edcfb] {\n  display: flex;\n  flex-direction: column;\n  padding-inline-start: 10px;\n  overflow: hidden;\n}\n.result--content--name[data-v-059edcfb], .result--content--subline[data-v-059edcfb] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/*\n* Ensure proper alignment of the vue material icons\n*/\n.material-design-icon[data-v-af9d145f] {\n  display: flex;\n  align-self: center;\n  justify-self: center;\n  align-items: center;\n  justify-content: center;\n}\n.smart-picker-search[data-v-af9d145f] {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  padding: 0 16px 16px 16px;\n}\n.smart-picker-search.with-empty-content[data-v-af9d145f] {\n  min-height: 400px;\n}\n.smart-picker-search .provider-icon[data-v-af9d145f] {\n  width: 150px;\n  height: 150px;\n  object-fit: contain;\n  filter: var(--background-invert-if-dark);\n}\n.smart-picker-search--select[data-v-af9d145f] {\n  width: 100%;\n}\n.smart-picker-search--select .search-result[data-v-af9d145f] {\n  width: 100%;\n}\n.smart-picker-search--select .group-name-icon[data-v-af9d145f],\n.smart-picker-search--select .option-simple-icon[data-v-af9d145f] {\n  width: 20px;\n  height: 20px;\n  margin: 0 20px 0 10px;\n}\n.smart-picker-search--select .custom-option[data-v-af9d145f] {\n  height: var(--default-clickable-area);\n  display: flex;\n  align-items: center;\n  overflow: hidden;\n}\n.smart-picker-search--select .option-text[data-v-af9d145f] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/*\n* Ensure proper alignment of the vue material icons\n*/\n.material-design-icon[data-v-5e2e9195] {\n  display: flex;\n  align-self: center;\n  justify-self: center;\n  align-items: center;\n  justify-content: center;\n}\n.reference-picker[data-v-5e2e9195] {\n  display: flex;\n  overflow-y: auto;\n  width: 100%;\n}\n.reference-picker .custom-element-wrapper[data-v-5e2e9195] {\n  display: flex;\n  overflow-y: auto;\n  width: 100%;\n}\n.reference-picker .custom-element-wrapper .custom-element[data-v-5e2e9195] {\n  display: flex;\n  overflow-y: auto;\n  width: 100%;\n}/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/*\n* Ensure proper alignment of the vue material icons\n*/\n.material-design-icon[data-v-bf0a25ee] {\n  display: flex;\n  align-self: center;\n  justify-self: center;\n  align-items: center;\n  justify-content: center;\n}\n.reference-picker-modal[data-v-bf0a25ee] .modal-container {\n  display: flex !important;\n}\n.reference-picker-modal--content[data-v-bf0a25ee] {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  overflow-y: auto;\n}\n.reference-picker-modal--content .close-button[data-v-bf0a25ee],\n.reference-picker-modal--content .back-button[data-v-bf0a25ee] {\n  position: absolute;\n  top: 4px;\n}\n.reference-picker-modal--content .back-button[data-v-bf0a25ee] {\n  inset-inline-start: 4px;\n}\n.reference-picker-modal--content .close-button[data-v-bf0a25ee] {\n  inset-inline-end: 4px;\n}\n.reference-picker-modal--content > h2[data-v-bf0a25ee] {\n  display: flex;\n  margin: 12px 0 20px 0;\n}\n.reference-picker-modal--content > h2 .icon[data-v-bf0a25ee] {\n  margin-inline-end: 8px;\n}/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/*\n* Ensure proper alignment of the vue material icons\n*/\n.material-design-icon[data-v-9cde5a6a] {\n  display: flex;\n  align-self: center;\n  justify-self: center;\n  align-items: center;\n  justify-content: center;\n}\n.widgets--list[data-v-9cde5a6a] {\n  width: 100%;\n  min-height: var(--default-clickable-area);\n}/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/*\n* Ensure proper alignment of the vue material icons\n*/\n.material-design-icon[data-v-76a4a548] {\n  display: flex;\n  align-self: center;\n  justify-self: center;\n  align-items: center;\n  justify-content: center;\n}\n\n/**\n * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n* Colors and class selectors are extracted from source code of:\n* - library: highlight.js (v11.10.0)\n* - light theme: highlight.js/styles/github.css\n* - dark theme: highlight.js/styles/github-dark.css\n* and reworked to use with Nextcloud dark and light theme\n*/\n.rich-text--wrapper[data-v-76a4a548] {\n  overflow-wrap: break-word;\n  line-height: 1.5;\n}\n.rich-text--wrapper .rich-text--fallback[data-v-76a4a548], .rich-text--wrapper .rich-text-component[data-v-76a4a548] {\n  display: inline;\n}\n\n/* Markdown styles */\n.rich-text--wrapper-markdown[data-v-76a4a548] {\n  tab-size: 4;\n}\n.rich-text--wrapper-markdown[data-v-76a4a548] > :first-child,\n.rich-text--wrapper-markdown div[data-v-76a4a548] > :first-child,\n.rich-text--wrapper-markdown blockquote[data-v-76a4a548] > :first-child {\n  margin-top: 0 !important;\n}\n.rich-text--wrapper-markdown[data-v-76a4a548] > :last-child, .rich-text--wrapper-markdown[data-v-76a4a548] > *:has(+ .rich-text--reference-widget),\n.rich-text--wrapper-markdown div[data-v-76a4a548] > :last-child,\n.rich-text--wrapper-markdown blockquote[data-v-76a4a548] > :last-child {\n  margin-block-end: 0 !important;\n}\n.rich-text--wrapper-markdown blockquote[data-v-76a4a548] {\n  padding-inline-start: 13px;\n  border-inline-start: 2px solid var(--color-border-dark);\n  color: var(--color-text-maxcontrast);\n}\n.rich-text--wrapper-markdown h1[data-v-76a4a548], .rich-text--wrapper-markdown h2[data-v-76a4a548], .rich-text--wrapper-markdown h3[data-v-76a4a548], .rich-text--wrapper-markdown h4[data-v-76a4a548], .rich-text--wrapper-markdown h5[data-v-76a4a548], .rich-text--wrapper-markdown h6[data-v-76a4a548], .rich-text--wrapper-markdown p[data-v-76a4a548], .rich-text--wrapper-markdown ul[data-v-76a4a548], .rich-text--wrapper-markdown ol[data-v-76a4a548], .rich-text--wrapper-markdown blockquote[data-v-76a4a548], .rich-text--wrapper-markdown pre[data-v-76a4a548] {\n  margin-top: 0;\n  margin-block-end: 1em;\n}\n.rich-text--wrapper-markdown h1[data-v-76a4a548], .rich-text--wrapper-markdown h2[data-v-76a4a548], .rich-text--wrapper-markdown h3[data-v-76a4a548], .rich-text--wrapper-markdown h4[data-v-76a4a548], .rich-text--wrapper-markdown h5[data-v-76a4a548], .rich-text--wrapper-markdown h6[data-v-76a4a548] {\n  font-weight: var(--font-weight-heading, bold);\n}\n.rich-text--wrapper-markdown h4[data-v-76a4a548] {\n  font-size: 20px;\n}\n.rich-text--wrapper-markdown h5[data-v-76a4a548] {\n  font-size: 18px;\n}\n.rich-text--wrapper-markdown h6[data-v-76a4a548] {\n  font-size: 15px;\n}\n.rich-text--wrapper-markdown ul[data-v-76a4a548], .rich-text--wrapper-markdown ol[data-v-76a4a548] {\n  padding-inline-start: 4ch;\n}\n.rich-text--wrapper-markdown ul[data-v-76a4a548] {\n  list-style-type: disc;\n}\n.rich-text--wrapper-markdown[data-v-76a4a548] {\n  /* Flavored Markdown styles */\n}\n.rich-text--wrapper-markdown ul.contains-task-list[data-v-76a4a548] {\n  list-style-type: none;\n  padding: 0;\n}\n.rich-text--wrapper-markdown li.task-list-item > ul[data-v-76a4a548],\n.rich-text--wrapper-markdown li.task-list-item > ol[data-v-76a4a548],\n.rich-text--wrapper-markdown li.task-list-item > li[data-v-76a4a548],\n.rich-text--wrapper-markdown li.task-list-item > blockquote[data-v-76a4a548],\n.rich-text--wrapper-markdown li.task-list-item > pre[data-v-76a4a548] {\n  margin-inline-start: 15px;\n  margin-block-end: 0;\n}\n.rich-text--wrapper-markdown pre[data-v-76a4a548] {\n  direction: ltr;\n}\n.rich-text--wrapper-markdown table[data-v-76a4a548] {\n  border-collapse: collapse;\n  border: 2px solid var(--color-border-maxcontrast);\n}\n.rich-text--wrapper-markdown table th[data-v-76a4a548],\n.rich-text--wrapper-markdown table td[data-v-76a4a548] {\n  padding: var(--default-grid-baseline);\n  border: 1px solid var(--color-border-maxcontrast);\n}\n.rich-text--wrapper-markdown table th[data-v-76a4a548]:first-child,\n.rich-text--wrapper-markdown table td[data-v-76a4a548]:first-child {\n  border-inline-start: 0;\n}\n.rich-text--wrapper-markdown table th[data-v-76a4a548]:last-child,\n.rich-text--wrapper-markdown table td[data-v-76a4a548]:last-child {\n  border-inline-end: 0;\n}\n.rich-text--wrapper-markdown table tr:first-child th[data-v-76a4a548] {\n  border-top: 0;\n}\n.rich-text--wrapper-markdown table tr:last-child td[data-v-76a4a548] {\n  border-block-end: 0;\n}\n\n/* Highlight code syntax in code blocks */\n/* stylelint-disable-next-line no-duplicate-selectors */\n.rich-text--wrapper-markdown .rich-text__code-block[data-v-76a4a548]:has(.hljs) {\n  color: var(--hljs-color);\n  background: var(--hljs-background-color);\n}\n.rich-text--wrapper-markdown .hljs-doctag[data-v-76a4a548],\n.rich-text--wrapper-markdown .hljs-keyword[data-v-76a4a548],\n.rich-text--wrapper-markdown .hljs-meta .hljs-keyword[data-v-76a4a548],\n.rich-text--wrapper-markdown .hljs-template-tag[data-v-76a4a548],\n.rich-text--wrapper-markdown .hljs-template-variable[data-v-76a4a548],\n.rich-text--wrapper-markdown .hljs-type[data-v-76a4a548],\n.rich-text--wrapper-markdown .hljs-variable.language_[data-v-76a4a548] {\n  /* prettylights-syntax-keyword */\n  color: var(--hljs-syntax-keyword-color);\n}\n.rich-text--wrapper-markdown .hljs-title[data-v-76a4a548],\n.rich-text--wrapper-markdown .hljs-title.class_[data-v-76a4a548],\n.rich-text--wrapper-markdown .hljs-title.class_.inherited__[data-v-76a4a548],\n.rich-text--wrapper-markdown .hljs-title.function_[data-v-76a4a548] {\n  /* prettylights-syntax-entity */\n  color: var(--hljs-syntax-entity-color);\n}\n.rich-text--wrapper-markdown .hljs-attr[data-v-76a4a548],\n.rich-text--wrapper-markdown .hljs-attribute[data-v-76a4a548],\n.rich-text--wrapper-markdown .hljs-literal[data-v-76a4a548],\n.rich-text--wrapper-markdown .hljs-meta[data-v-76a4a548],\n.rich-text--wrapper-markdown .hljs-number[data-v-76a4a548],\n.rich-text--wrapper-markdown .hljs-operator[data-v-76a4a548],\n.rich-text--wrapper-markdown .hljs-variable[data-v-76a4a548],\n.rich-text--wrapper-markdown .hljs-selector-attr[data-v-76a4a548],\n.rich-text--wrapper-markdown .hljs-selector-class[data-v-76a4a548],\n.rich-text--wrapper-markdown .hljs-selector-id[data-v-76a4a548] {\n  /* prettylights-syntax-constant */\n  color: var(--hljs-syntax-constant-color);\n}\n.rich-text--wrapper-markdown .hljs-regexp[data-v-76a4a548],\n.rich-text--wrapper-markdown .hljs-string[data-v-76a4a548],\n.rich-text--wrapper-markdown .hljs-meta .hljs-string[data-v-76a4a548] {\n  /* prettylights-syntax-string */\n  color: var(--hljs-syntax-string-color);\n}\n.rich-text--wrapper-markdown .hljs-built_in[data-v-76a4a548],\n.rich-text--wrapper-markdown .hljs-symbol[data-v-76a4a548] {\n  /* prettylights-syntax-variable */\n  color: var(--hljs-syntax-variable-color);\n}\n.rich-text--wrapper-markdown .hljs-comment[data-v-76a4a548],\n.rich-text--wrapper-markdown .hljs-code[data-v-76a4a548],\n.rich-text--wrapper-markdown .hljs-formula[data-v-76a4a548] {\n  /* prettylights-syntax-comment */\n  color: var(--hljs-syntax-comment-color);\n}\n.rich-text--wrapper-markdown .hljs-name[data-v-76a4a548],\n.rich-text--wrapper-markdown .hljs-quote[data-v-76a4a548],\n.rich-text--wrapper-markdown .hljs-selector-tag[data-v-76a4a548],\n.rich-text--wrapper-markdown .hljs-selector-pseudo[data-v-76a4a548] {\n  /* prettylights-syntax-entity-tag */\n  color: var(--hljs-syntax-entity-tag-color);\n}\n.rich-text--wrapper-markdown .hljs-subst[data-v-76a4a548] {\n  /* prettylights-syntax-storage-modifier-import */\n  color: var(--hljs-syntax-storage-modifier-import-color);\n}\n.rich-text--wrapper-markdown .hljs-section[data-v-76a4a548] {\n  /* prettylights-syntax-markup-heading */\n  color: var(--hljs-syntax-markup-heading-color);\n  font-weight: var(--font-weight-heading, bold);\n}\n.rich-text--wrapper-markdown .hljs-bullet[data-v-76a4a548] {\n  /* prettylights-syntax-markup-list */\n  color: var(--hljs-syntax-markup-list-color);\n}\n.rich-text--wrapper-markdown .hljs-emphasis[data-v-76a4a548] {\n  /* prettylights-syntax-markup-italic */\n  color: var(--hljs-syntax-markup-italic-color);\n  font-style: italic;\n}\n.rich-text--wrapper-markdown .hljs-strong[data-v-76a4a548] {\n  /* prettylights-syntax-markup-bold */\n  color: var(--hljs-syntax-markup-bold-color);\n  font-weight: bold;\n}\n.rich-text--wrapper-markdown .hljs-addition[data-v-76a4a548] {\n  /* prettylights-syntax-markup-inserted */\n  color: var(--hljs-syntax-markup-inserted-color);\n  background-color: var(--hljs-syntax-markup-inserted-background-color);\n}\n.rich-text--wrapper-markdown .hljs-deletion[data-v-76a4a548] {\n  /* prettylights-syntax-markup-deleted */\n  color: var(--hljs-syntax-markup-deleted-color);\n  background-color: var(--hljs-syntax-markup-deleted-background-color);\n}\n.rich-text--wrapper-markdown .hljs-char.escape_[data-v-76a4a548],\n.rich-text--wrapper-markdown .hljs-link[data-v-76a4a548],\n.rich-text--wrapper-markdown .hljs-params[data-v-76a4a548],\n.rich-text--wrapper-markdown .hljs-property[data-v-76a4a548],\n.rich-text--wrapper-markdown .hljs-punctuation[data-v-76a4a548],\n.rich-text--wrapper-markdown .hljs-tag[data-v-76a4a548] {\n  /* purposely ignored */\n}\na[data-v-76a4a548]:not(.rich-text--component) {\n  text-decoration: underline;\n}\n@media (prefers-color-scheme: light) {\n.rich-text--wrapper-markdown[data-v-76a4a548] {\n    --hljs-color: var(--color-main-text, #24292e);\n    --hljs-background-color: var(--color-background-dark, #ffffff);\n    --hljs-syntax-keyword-color: #d73a49;\n    --hljs-syntax-entity-color: #6f42c1;\n    --hljs-syntax-constant-color: #005cc5;\n    --hljs-syntax-string-color: #032f62;\n    --hljs-syntax-variable-color: #e36209;\n    --hljs-syntax-comment-color: #6a737d;\n    --hljs-syntax-entity-tag-color: #22863a;\n    --hljs-syntax-storage-modifier-import-color: #24292e;\n    --hljs-syntax-markup-heading-color: #005cc5;\n    --hljs-syntax-markup-list-color: #735c0f;\n    --hljs-syntax-markup-italic-color: #24292e;\n    --hljs-syntax-markup-bold-color: #24292e;\n    --hljs-syntax-markup-inserted-color: #22863a;\n    --hljs-syntax-markup-inserted-background-color: #f0fff4;\n    --hljs-syntax-markup-deleted-color: #b31d28;\n    --hljs-syntax-markup-deleted-background-color: #ffeef0;\n}\n[data-theme-dark] .rich-text--wrapper-markdown[data-v-76a4a548] {\n    --hljs-color: var(--color-main-text, #c9d1d9);\n    --hljs-background-color: var(--color-background-dark, #0d1117);\n    --hljs-syntax-keyword-color: #ff7b72;\n    --hljs-syntax-entity-color: #d2a8ff;\n    --hljs-syntax-constant-color: #79c0ff;\n    --hljs-syntax-string-color: #a5d6ff;\n    --hljs-syntax-variable-color: #ffa657;\n    --hljs-syntax-comment-color: #8b949e;\n    --hljs-syntax-entity-tag-color: #7ee787;\n    --hljs-syntax-storage-modifier-import-color: #c9d1d9;\n    --hljs-syntax-markup-heading-color: #1f6feb;\n    --hljs-syntax-markup-list-color: #f2cc60;\n    --hljs-syntax-markup-italic-color: #c9d1d9;\n    --hljs-syntax-markup-bold-color: #c9d1d9;\n    --hljs-syntax-markup-inserted-color: #aff5b4;\n    --hljs-syntax-markup-inserted-background-color: #033a16;\n    --hljs-syntax-markup-deleted-color: #ffdcd7;\n    --hljs-syntax-markup-deleted-background-color: #67060c;\n}\n}\n@media (prefers-color-scheme: dark) {\n.rich-text--wrapper-markdown[data-v-76a4a548] {\n    --hljs-color: var(--color-main-text, #c9d1d9);\n    --hljs-background-color: var(--color-background-dark, #0d1117);\n    --hljs-syntax-keyword-color: #ff7b72;\n    --hljs-syntax-entity-color: #d2a8ff;\n    --hljs-syntax-constant-color: #79c0ff;\n    --hljs-syntax-string-color: #a5d6ff;\n    --hljs-syntax-variable-color: #ffa657;\n    --hljs-syntax-comment-color: #8b949e;\n    --hljs-syntax-entity-tag-color: #7ee787;\n    --hljs-syntax-storage-modifier-import-color: #c9d1d9;\n    --hljs-syntax-markup-heading-color: #1f6feb;\n    --hljs-syntax-markup-list-color: #f2cc60;\n    --hljs-syntax-markup-italic-color: #c9d1d9;\n    --hljs-syntax-markup-bold-color: #c9d1d9;\n    --hljs-syntax-markup-inserted-color: #aff5b4;\n    --hljs-syntax-markup-inserted-background-color: #033a16;\n    --hljs-syntax-markup-deleted-color: #ffdcd7;\n    --hljs-syntax-markup-deleted-background-color: #67060c;\n}\n[data-theme-light] .rich-text--wrapper-markdown[data-v-76a4a548] {\n    --hljs-color: var(--color-main-text, #24292e);\n    --hljs-background-color: var(--color-background-dark, #ffffff);\n    --hljs-syntax-keyword-color: #d73a49;\n    --hljs-syntax-entity-color: #6f42c1;\n    --hljs-syntax-constant-color: #005cc5;\n    --hljs-syntax-string-color: #032f62;\n    --hljs-syntax-variable-color: #e36209;\n    --hljs-syntax-comment-color: #6a737d;\n    --hljs-syntax-entity-tag-color: #22863a;\n    --hljs-syntax-storage-modifier-import-color: #24292e;\n    --hljs-syntax-markup-heading-color: #005cc5;\n    --hljs-syntax-markup-list-color: #735c0f;\n    --hljs-syntax-markup-italic-color: #24292e;\n    --hljs-syntax-markup-bold-color: #24292e;\n    --hljs-syntax-markup-inserted-color: #22863a;\n    --hljs-syntax-markup-inserted-background-color: #f0fff4;\n    --hljs-syntax-markup-deleted-color: #b31d28;\n    --hljs-syntax-markup-deleted-background-color: #ffeef0;\n}\n}\n.rich-text__code-block[data-v-76a4a548] {\n  position: relative;\n  padding-inline-end: calc(var(--clickable-area-small) + var(--default-grid-baseline));\n}\n.rich-text__code-block pre[data-v-76a4a548] {\n  width: 100%;\n  overflow-x: auto;\n}\n.rich-text__code-block .rich-text__code-block-button[data-v-76a4a548] {\n  position: absolute;\n  top: var(--default-grid-baseline);\n  inset-inline-end: var(--default-grid-baseline);\n  opacity: 0;\n}\n.rich-text__code-block:hover .rich-text__code-block-button[data-v-76a4a548], .rich-text__code-block:focus-within .rich-text__code-block-button[data-v-76a4a548], .rich-text__code-block .rich-text__code-block-button[data-v-76a4a548]:focus {\n  opacity: 1;\n}"));
      document.head.appendChild(elementStyle);
    }
  } catch (e) {
    console.error("vite-plugin-css-injected-by-js", e);
  }
})();
const appName = "agora";
const appVersion = "1.7.5";
import { a0 as isArray, d as defineComponent, a1 as reactive, a2 as inject, a3 as routerKey, c as computed, a4 as h, a5 as routeLocationKey, M as unref, a6 as isBrowser, a7 as watchEffect, a8 as getCurrentInstance, a9 as noop, _ as _export_sfc$1, u as useModel, U as useAttrs, V as useTemplateRef, o as openBlock, i as createElementBlock, h as createBaseVNode, m as mergeProps, t as toDisplayString, j as createCommentVNode, aa as withDirectives, ab as vShow, r as renderSlot, b as createBlock, e as withCtx, C as NcButton, X as mdiCheck, O as NcIconSvgWrapper, Y as mdiAlertCircleOutline, E as createTextVNode, K as normalizeClass, P as isLegacy, l as mergeModels, Z as createElementId, a as warn, ac as register, ad as t51, ae as t18, af as t, ag as createSlots, ah as mdiArrowRight, ai as mdiUndo, aj as mdiClose, ak as useCssVars, al as n, am as resolveComponent, an as toHandlers, g as createVNode, f as resolveDynamicComponent, q as onMounted, v as NcLoadingIcon, ao as createCoords, ap as rectToClientRect, aq as floor, ar as round, as as computePosition$1, at as max, au as min, av as offset$1, aw as flip$1, ax as shift$1, ay as limitShift$1, az as resolveDirective, y as normalizeProps, z as guardReactiveProps, F as Fragment, L as renderList, aA as withKeys, J as withModifiers, aB as Transition, aC as t17, aD as t22, W as logger, aE as t8, aF as imagePath, aG as loadState, aH as t46, aI as t41, aJ as t24, aK as t25, aL as t43, aM as t32, aN as t19, aO as t12, A as createApp, D as NcModal, aP as emit, n as normalizeStyle, aQ as NcEmptyContent, aR as IconDotsHorizontal, aS as generateOcsUrl, aT as cancelableClient, aU as useElementSize, aV as useIntersectionObserver, w as watch, aW as onBeforeUnmount, aX as nextTick, s as ref, aY as getRoute } from "./NcEmptyContent-CGAPqk4S-DlUuxFD2.js";
/*!
* vue-router v5.1.0
* (c) 2026 Eduardo San Martin Morote
* @license MIT
*/
function warn$1(msg) {
  const args = Array.from(arguments).slice(1);
  console.warn.apply(console, ["[Vue Router warn]: " + msg].concat(args));
}
function isSameRouteRecord(a, b) {
  return (a.aliasOf || a) === (b.aliasOf || b);
}
function isSameRouteLocationParams(a, b) {
  if (Object.keys(a).length !== Object.keys(b).length) return false;
  for (var key in a) if (!isSameRouteLocationParamsValue(a[key], b[key])) return false;
  return true;
}
function isSameRouteLocationParamsValue(a, b) {
  return isArray(a) ? isEquivalentArray(a, b) : isArray(b) ? isEquivalentArray(b, a) : (a && a.valueOf()) === (b && b.valueOf());
}
function isEquivalentArray(a, b) {
  return isArray(b) ? a.length === b.length && a.every((value, i) => value === b[i]) : a.length === 1 && a[0] === b;
}
function isRouteLocation(route) {
  return typeof route === "string" || route && typeof route === "object";
}
/*!
* vue-router v5.1.0
* (c) 2026 Eduardo San Martin Morote
* @license MIT
*/
function useLink(props) {
  const router = inject(routerKey);
  const currentRoute = inject(routeLocationKey);
  let hasPrevious = false;
  let previousTo = null;
  const route = computed(() => {
    const to = unref(props.to);
    if (!hasPrevious || to !== previousTo) {
      if (!isRouteLocation(to)) if (hasPrevious) warn$1(`Invalid value for prop "to" in useLink()
- to:`, to, `
- previous to:`, previousTo, `
- props:`, props);
      else warn$1(`Invalid value for prop "to" in useLink()
- to:`, to, `
- props:`, props);
      previousTo = to;
      hasPrevious = true;
    }
    return router.resolve(to);
  });
  const activeRecordIndex = computed(() => {
    const { matched } = route.value;
    const { length } = matched;
    const routeMatched = matched[length - 1];
    const currentMatched = currentRoute.matched;
    if (!routeMatched || !currentMatched.length) return -1;
    const index = currentMatched.findIndex(isSameRouteRecord.bind(null, routeMatched));
    if (index > -1) return index;
    const parentRecordPath = getOriginalPath(matched[length - 2]);
    return length > 1 && getOriginalPath(routeMatched) === parentRecordPath && currentMatched[currentMatched.length - 1].path !== parentRecordPath ? currentMatched.findIndex(isSameRouteRecord.bind(null, matched[length - 2])) : index;
  });
  const isActive = computed(() => activeRecordIndex.value > -1 && includesParams(currentRoute.params, route.value.params));
  const isExactActive = computed(() => activeRecordIndex.value > -1 && activeRecordIndex.value === currentRoute.matched.length - 1 && isSameRouteLocationParams(currentRoute.params, route.value.params));
  function navigate(e = {}) {
    if (guardEvent(e)) {
      const p = router[unref(props.replace) ? "replace" : "push"](unref(props.to)).catch(noop);
      if (props.viewTransition && typeof document !== "undefined" && "startViewTransition" in document) document.startViewTransition(() => p);
      return p;
    }
    return Promise.resolve();
  }
  if (isBrowser) {
    const instance = getCurrentInstance();
    if (instance) {
      const linkContextDevtools = {
        route: route.value,
        isActive: isActive.value,
        isExactActive: isExactActive.value,
        error: null
      };
      instance.__vrl_devtools = instance.__vrl_devtools || [];
      instance.__vrl_devtools.push(linkContextDevtools);
      watchEffect(() => {
        linkContextDevtools.route = route.value;
        linkContextDevtools.isActive = isActive.value;
        linkContextDevtools.isExactActive = isExactActive.value;
        linkContextDevtools.error = isRouteLocation(unref(props.to)) ? null : 'Invalid "to" value';
      }, { flush: "post" });
    }
  }
  return {
    route,
    href: computed(() => route.value.href),
    isActive,
    isExactActive,
    navigate
  };
}
function preferSingleVNode(vnodes) {
  return vnodes.length === 1 ? vnodes[0] : vnodes;
}
const RouterLink = /* @__PURE__ */ defineComponent({
  name: "RouterLink",
  compatConfig: { MODE: 3 },
  props: {
    to: {
      type: [String, Object],
      required: true
    },
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {
      type: String,
      default: "page"
    },
    viewTransition: Boolean
  },
  useLink,
  setup(props, { slots }) {
    const link = reactive(useLink(props));
    const { options } = inject(routerKey);
    const elClass = computed(() => ({
      [getLinkClass(props.activeClass, options.linkActiveClass, "router-link-active")]: link.isActive,
      [getLinkClass(props.exactActiveClass, options.linkExactActiveClass, "router-link-exact-active")]: link.isExactActive
    }));
    return () => {
      const children = slots.default && preferSingleVNode(slots.default(link));
      return props.custom ? children : h("a", {
        "aria-current": link.isExactActive ? props.ariaCurrentValue : null,
        href: link.href,
        onClick: link.navigate,
        class: elClass.value
      }, children);
    };
  }
});
function guardEvent(e) {
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return;
  if (e.defaultPrevented) return;
  if (e.button !== void 0 && e.button !== 0) return;
  if (e.currentTarget && e.currentTarget.getAttribute) {
    const target = e.currentTarget.getAttribute("target");
    if (/\b_blank\b/i.test(target)) return;
  }
  if (e.preventDefault) e.preventDefault();
  return true;
}
function includesParams(outer, inner) {
  for (const key in inner) {
    const innerValue = inner[key];
    const outerValue = outer[key];
    if (typeof innerValue === "string") {
      if (innerValue !== outerValue) return false;
    } else if (!isArray(outerValue) || outerValue.length !== innerValue.length || innerValue.some((value, i) => value.valueOf() !== outerValue[i].valueOf())) return false;
  }
  return true;
}
function getOriginalPath(record) {
  return record ? record.aliasOf ? record.aliasOf.path : record.path : "";
}
const getLinkClass = (propClass, globalClass, defaultClass) => propClass != null ? propClass : globalClass != null ? globalClass : defaultClass;
function debounce(function_, wait = 100, options = {}) {
  if (typeof function_ !== "function") {
    throw new TypeError(`Expected the first parameter to be a function, got \`${typeof function_}\`.`);
  }
  if (wait < 0) {
    throw new RangeError("`wait` must not be negative.");
  }
  if (typeof options === "boolean") {
    throw new TypeError("The `options` parameter must be an object, not a boolean. Use `{immediate: true}` instead.");
  }
  const { immediate } = options;
  let storedContext;
  let storedArguments;
  let timeoutId;
  let timestamp;
  let result;
  function run() {
    const callContext = storedContext;
    const callArguments = storedArguments;
    storedContext = void 0;
    storedArguments = void 0;
    result = function_.apply(callContext, callArguments);
    return result;
  }
  function later() {
    const last = Date.now() - timestamp;
    if (last < wait && last >= 0) {
      timeoutId = setTimeout(later, wait - last);
    } else {
      timeoutId = void 0;
      if (!immediate) {
        result = run();
      }
    }
  }
  const debounced = function(...arguments_) {
    if (storedContext && this !== storedContext && Object.getPrototypeOf(this) === Object.getPrototypeOf(storedContext)) {
      throw new Error("Debounced method called with different contexts of the same prototype.");
    }
    storedContext = this;
    storedArguments = arguments_;
    timestamp = Date.now();
    const callNow = immediate && !timeoutId;
    if (!timeoutId) {
      timeoutId = setTimeout(later, wait);
    }
    if (callNow) {
      result = run();
      return result;
    }
    return void 0;
  };
  Object.defineProperty(debounced, "isPending", {
    get() {
      return timeoutId !== void 0;
    }
  });
  debounced.clear = () => {
    if (!timeoutId) {
      return;
    }
    clearTimeout(timeoutId);
    timeoutId = void 0;
    storedContext = void 0;
    storedArguments = void 0;
  };
  debounced.flush = () => {
    if (!timeoutId) {
      return;
    }
    debounced.trigger();
  };
  debounced.trigger = () => {
    result = run();
    debounced.clear();
  };
  return debounced;
}
const _hoisted_1$g = { class: "input-field__main-wrapper" };
const _hoisted_2$d = ["id", "aria-describedby", "disabled", "placeholder", "type", "value"];
const _hoisted_3$b = ["for"];
const _hoisted_4$a = { class: "input-field__icon input-field__icon--leading" };
const _hoisted_5$3 = {
  key: 2,
  class: "input-field__icon input-field__icon--trailing"
};
const _hoisted_6$2 = ["id"];
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "NcInputField",
  props: /* @__PURE__ */ mergeModels({
    class: { default: "" },
    inputClass: { default: "" },
    id: { default: () => createElementId() },
    label: { default: void 0 },
    labelOutside: { type: Boolean },
    type: { default: "text" },
    placeholder: { default: void 0 },
    showTrailingButton: { type: Boolean },
    trailingButtonLabel: { default: void 0 },
    success: { type: Boolean },
    error: { type: Boolean },
    helperText: { default: "" },
    disabled: { type: Boolean },
    pill: { type: Boolean }
  }, {
    "modelValue": { required: true },
    "modelModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["trailingButtonClick"], ["update:modelValue"]),
  setup(__props, { expose: __expose, emit: __emit }) {
    const modelValue = useModel(__props, "modelValue");
    const props = __props;
    const emit2 = __emit;
    __expose({
      focus,
      select
    });
    const attrs = useAttrs();
    const inputElement = useTemplateRef("input");
    const hasTrailingIcon = computed(() => props.showTrailingButton || props.success);
    const internalPlaceholder = computed(() => {
      if (props.placeholder) {
        return props.placeholder;
      }
      if (props.label) {
        return isLegacy ? props.label : "";
      }
      return void 0;
    });
    const isValidLabel = computed(() => {
      const isValidLabel2 = props.label || props.labelOutside;
      if (!isValidLabel2) {
        warn("You need to add a label to the NcInputField component. Either use the prop label or use an external one, as per the example in the documentation.");
      }
      return isValidLabel2;
    });
    const ariaDescribedby = computed(() => {
      const ariaDescribedby2 = [];
      if (props.helperText) {
        ariaDescribedby2.push(`${props.id}-helper-text`);
      }
      if (attrs["aria-describedby"]) {
        ariaDescribedby2.push(String(attrs["aria-describedby"]));
      }
      return ariaDescribedby2.join(" ") || void 0;
    });
    function focus(options) {
      inputElement.value.focus(options);
    }
    function select() {
      inputElement.value.select();
    }
    function handleInput(event) {
      const target = event.target;
      modelValue.value = props.type === "number" && typeof modelValue.value === "number" ? parseFloat(target.value) : target.value;
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["input-field", [{
          "input-field--disabled": __props.disabled,
          "input-field--error": __props.error,
          "input-field--label-outside": __props.labelOutside || !isValidLabel.value,
          "input-field--leading-icon": !!_ctx.$slots.icon,
          "input-field--trailing-icon": hasTrailingIcon.value,
          "input-field--pill": __props.pill,
          "input-field--success": __props.success,
          "input-field--legacy": unref(isLegacy)
        }, _ctx.$props.class]])
      }, [
        createBaseVNode("div", _hoisted_1$g, [
          createBaseVNode("input", mergeProps(_ctx.$attrs, {
            id: __props.id,
            ref: "input",
            "aria-describedby": ariaDescribedby.value,
            "aria-live": "polite",
            class: ["input-field__input", __props.inputClass],
            disabled: __props.disabled,
            placeholder: internalPlaceholder.value,
            type: __props.type,
            value: modelValue.value.toString(),
            onInput: handleInput
          }), null, 16, _hoisted_2$d),
          !__props.labelOutside && isValidLabel.value ? (openBlock(), createElementBlock("label", {
            key: 0,
            class: "input-field__label",
            for: __props.id
          }, toDisplayString(__props.label), 9, _hoisted_3$b)) : createCommentVNode("", true),
          withDirectives(createBaseVNode("div", _hoisted_4$a, [
            renderSlot(_ctx.$slots, "icon", {}, void 0, true)
          ], 512), [
            [vShow, !!_ctx.$slots.icon]
          ]),
          __props.showTrailingButton ? (openBlock(), createBlock(NcButton, {
            key: 1,
            class: "input-field__trailing-button",
            "aria-label": __props.trailingButtonLabel,
            disabled: __props.disabled,
            variant: "tertiary-no-background",
            onClick: _cache[0] || (_cache[0] = ($event) => emit2("trailingButtonClick", $event))
          }, {
            icon: withCtx(() => [
              renderSlot(_ctx.$slots, "trailing-button-icon", {}, void 0, true)
            ]),
            _: 3
          }, 8, ["aria-label", "disabled"])) : __props.success || __props.error ? (openBlock(), createElementBlock("div", _hoisted_5$3, [
            __props.success ? (openBlock(), createBlock(NcIconSvgWrapper, {
              key: 0,
              path: unref(mdiCheck)
            }, null, 8, ["path"])) : (openBlock(), createBlock(NcIconSvgWrapper, {
              key: 1,
              path: unref(mdiAlertCircleOutline)
            }, null, 8, ["path"]))
          ])) : createCommentVNode("", true)
        ]),
        __props.helperText ? (openBlock(), createElementBlock("p", {
          key: 0,
          id: `${__props.id}-helper-text`,
          class: "input-field__helper-text-message"
        }, [
          __props.success ? (openBlock(), createBlock(NcIconSvgWrapper, {
            key: 0,
            class: "input-field__helper-text-message__icon",
            path: unref(mdiCheck),
            inline: ""
          }, null, 8, ["path"])) : __props.error ? (openBlock(), createBlock(NcIconSvgWrapper, {
            key: 1,
            class: "input-field__helper-text-message__icon",
            path: unref(mdiAlertCircleOutline),
            inline: ""
          }, null, 8, ["path"])) : createCommentVNode("", true),
          createTextVNode(" " + toDisplayString(__props.helperText), 1)
        ], 8, _hoisted_6$2)) : createCommentVNode("", true)
      ], 2);
    };
  }
});
const NcInputField = /* @__PURE__ */ _export_sfc$1(_sfc_main$j, [["__scopeId", "data-v-8e16cbb5"]]);
register(t18, t51);
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  __name: "NcTextField",
  props: /* @__PURE__ */ mergeModels({
    class: {},
    inputClass: {},
    id: {},
    label: {},
    labelOutside: { type: Boolean },
    type: {},
    placeholder: {},
    showTrailingButton: { type: Boolean },
    trailingButtonLabel: { default: void 0 },
    success: { type: Boolean },
    error: { type: Boolean },
    helperText: {},
    disabled: { type: Boolean },
    pill: { type: Boolean },
    trailingButtonIcon: { default: "close" }
  }, {
    "modelValue": { default: "" },
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
    const inputFieldInstance = useTemplateRef("inputField");
    const defaultTrailingButtonLabels = {
      arrowEnd: t("Save changes"),
      close: t("Clear text"),
      undo: t("Undo changes")
    };
    const NcInputFieldPropNames = new Set(Object.keys(NcInputField.props));
    const propsToForward = computed(() => {
      const sharedProps = Object.fromEntries(Object.entries(props).filter(([key]) => NcInputFieldPropNames.has(key)));
      sharedProps.trailingButtonLabel ??= defaultTrailingButtonLabels[props.trailingButtonIcon];
      return sharedProps;
    });
    function focus(options) {
      inputFieldInstance.value.focus(options);
    }
    function select() {
      inputFieldInstance.value.select();
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(NcInputField), mergeProps(propsToForward.value, {
        ref: "inputField",
        modelValue: modelValue.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => modelValue.value = $event)
      }), createSlots({ _: 2 }, [
        !!_ctx.$slots.icon ? {
          name: "icon",
          fn: withCtx(() => [
            renderSlot(_ctx.$slots, "icon")
          ]),
          key: "0"
        } : void 0,
        __props.type !== "search" ? {
          name: "trailing-button-icon",
          fn: withCtx(() => [
            __props.trailingButtonIcon === "arrowEnd" ? (openBlock(), createBlock(unref(NcIconSvgWrapper), {
              key: 0,
              directional: "",
              path: unref(mdiArrowRight)
            }, null, 8, ["path"])) : (openBlock(), createBlock(unref(NcIconSvgWrapper), {
              key: 1,
              path: __props.trailingButtonIcon === "undo" ? unref(mdiUndo) : unref(mdiClose)
            }, null, 8, ["path"]))
          ]),
          key: "1"
        } : void 0
      ]), 1040, ["modelValue"]);
    };
  }
});
const _sfc_main$h = {
  name: "ChevronDownIcon",
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
const _hoisted_1$f = ["aria-hidden", "aria-label"];
const _hoisted_2$c = ["fill", "width", "height"];
const _hoisted_3$a = { d: "M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" };
const _hoisted_4$9 = { key: 0 };
function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("span", mergeProps(_ctx.$attrs, {
    "aria-hidden": $props.title ? null : "true",
    "aria-label": $props.title,
    class: "material-design-icon chevron-down-icon",
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
      createBaseVNode("path", _hoisted_3$a, [
        $props.title ? (openBlock(), createElementBlock("title", _hoisted_4$9, toDisplayString($props.title), 1)) : createCommentVNode("", true)
      ])
    ], 8, _hoisted_2$c))
  ], 16, _hoisted_1$f);
}
const ChevronDown = /* @__PURE__ */ _export_sfc$1(_sfc_main$h, [["render", _sfc_render$e]]);
const _sfc_main$g = {
  name: "CloseIcon",
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
const _hoisted_1$e = ["aria-hidden", "aria-label"];
const _hoisted_2$b = ["fill", "width", "height"];
const _hoisted_3$9 = { d: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" };
const _hoisted_4$8 = { key: 0 };
function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("span", mergeProps(_ctx.$attrs, {
    "aria-hidden": $props.title ? null : "true",
    "aria-label": $props.title,
    class: "material-design-icon close-icon",
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
        $props.title ? (openBlock(), createElementBlock("title", _hoisted_4$8, toDisplayString($props.title), 1)) : createCommentVNode("", true)
      ])
    ], 8, _hoisted_2$b))
  ], 16, _hoisted_1$e);
}
const IconClose = /* @__PURE__ */ _export_sfc$1(_sfc_main$g, [["render", _sfc_render$d]]);
const svg = `<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 24 12">
	<path d="M17,1H7A5,5 0 0,0 2,6 5,5 0 0,0 7,11H17A5,5 0 0,0 22,6 5,5 0 0,0 17,1Z" />
	<circle
		cy="6"
		r="3"
		fill="var(--color-main-background)" />
</svg>`;
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "NcIconToggleSwitch",
  props: {
    checked: { type: Boolean },
    size: { default: 34 },
    inline: { type: Boolean, default: false }
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "v6bd152af": color.value,
      "v16fd8ca9": cx.value
    }));
    const color = computed(() => __props.checked ? "var(--color-primary-element)" : "var(--color-text-maxcontrast)");
    const cx = computed(() => __props.checked ? "calc(17 / 24 * 100%)" : "calc(7 / 24 * 100%)");
    return (_ctx, _cache) => {
      return openBlock(), createBlock(NcIconSvgWrapper, {
        class: normalizeClass(_ctx.$style.iconToggleSwitch),
        svg,
        size: __props.size,
        inline: __props.inline
      }, null, 8, ["class", "size", "inline"]);
    };
  }
});
const iconToggleSwitch = "_iconToggleSwitch_CPPoW";
const style0 = {
  "material-design-icon": "_material-design-icon_tLFaA",
  iconToggleSwitch
};
const cssModules = {
  "$style": style0
};
const NcIconToggleSwitch = /* @__PURE__ */ _export_sfc$1(_sfc_main$f, [["__cssModules", cssModules]]);
/*!
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
const INSIDE_RADIO_GROUP_KEY = /* @__PURE__ */ Symbol.for("insideRadioGroup");
function useInsideRadioGroup() {
  return inject(INSIDE_RADIO_GROUP_KEY, void 0);
}
const _sfc_main$6$1 = {
  name: "CheckboxBlankOutlineIcon",
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
const _hoisted_1$6$1 = ["aria-hidden", "aria-label"];
const _hoisted_2$5$1 = ["fill", "width", "height"];
const _hoisted_3$5$1 = { d: "M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z" };
const _hoisted_4$4$1 = { key: 0 };
function _sfc_render$6$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("span", mergeProps(_ctx.$attrs, {
    "aria-hidden": $props.title ? null : "true",
    "aria-label": $props.title,
    class: "material-design-icon checkbox-blank-outline-icon",
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
      createBaseVNode("path", _hoisted_3$5$1, [
        $props.title ? (openBlock(), createElementBlock("title", _hoisted_4$4$1, toDisplayString($props.title), 1)) : createCommentVNode("", true)
      ])
    ], 8, _hoisted_2$5$1))
  ], 16, _hoisted_1$6$1);
}
const CheckboxBlankOutline = /* @__PURE__ */ _export_sfc$1(_sfc_main$6$1, [["render", _sfc_render$6$1]]);
const _sfc_main$5$1 = {
  name: "CheckboxMarkedIcon",
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
const _hoisted_1$5$1 = ["aria-hidden", "aria-label"];
const _hoisted_2$4$1 = ["fill", "width", "height"];
const _hoisted_3$4$1 = { d: "M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" };
const _hoisted_4$3$1 = { key: 0 };
function _sfc_render$5$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("span", mergeProps(_ctx.$attrs, {
    "aria-hidden": $props.title ? null : "true",
    "aria-label": $props.title,
    class: "material-design-icon checkbox-marked-icon",
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
      createBaseVNode("path", _hoisted_3$4$1, [
        $props.title ? (openBlock(), createElementBlock("title", _hoisted_4$3$1, toDisplayString($props.title), 1)) : createCommentVNode("", true)
      ])
    ], 8, _hoisted_2$4$1))
  ], 16, _hoisted_1$5$1);
}
const CheckboxMarked = /* @__PURE__ */ _export_sfc$1(_sfc_main$5$1, [["render", _sfc_render$5$1]]);
const _sfc_main$4$1 = {
  name: "MinusBoxIcon",
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
const _hoisted_1$4$1 = ["aria-hidden", "aria-label"];
const _hoisted_2$3$1 = ["fill", "width", "height"];
const _hoisted_3$3$1 = { d: "M17,13H7V11H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" };
const _hoisted_4$2$1 = { key: 0 };
function _sfc_render$4$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("span", mergeProps(_ctx.$attrs, {
    "aria-hidden": $props.title ? null : "true",
    "aria-label": $props.title,
    class: "material-design-icon minus-box-icon",
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
      createBaseVNode("path", _hoisted_3$3$1, [
        $props.title ? (openBlock(), createElementBlock("title", _hoisted_4$2$1, toDisplayString($props.title), 1)) : createCommentVNode("", true)
      ])
    ], 8, _hoisted_2$3$1))
  ], 16, _hoisted_1$4$1);
}
const MinusBox = /* @__PURE__ */ _export_sfc$1(_sfc_main$4$1, [["render", _sfc_render$4$1]]);
const _sfc_main$3$1 = {
  name: "RadioboxBlankIcon",
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
const _hoisted_1$3$1 = ["aria-hidden", "aria-label"];
const _hoisted_2$2$1 = ["fill", "width", "height"];
const _hoisted_3$2$1 = { d: "M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" };
const _hoisted_4$1$1 = { key: 0 };
function _sfc_render$3$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("span", mergeProps(_ctx.$attrs, {
    "aria-hidden": $props.title ? null : "true",
    "aria-label": $props.title,
    class: "material-design-icon radiobox-blank-icon",
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
      createBaseVNode("path", _hoisted_3$2$1, [
        $props.title ? (openBlock(), createElementBlock("title", _hoisted_4$1$1, toDisplayString($props.title), 1)) : createCommentVNode("", true)
      ])
    ], 8, _hoisted_2$2$1))
  ], 16, _hoisted_1$3$1);
}
const RadioboxBlank = /* @__PURE__ */ _export_sfc$1(_sfc_main$3$1, [["render", _sfc_render$3$1]]);
const _sfc_main$2$2 = {
  name: "RadioboxMarkedIcon",
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
const _hoisted_1$2$2 = ["aria-hidden", "aria-label"];
const _hoisted_2$1$1 = ["fill", "width", "height"];
const _hoisted_3$1$1 = { d: "M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7Z" };
const _hoisted_4$7 = { key: 0 };
function _sfc_render$2$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("span", mergeProps(_ctx.$attrs, {
    "aria-hidden": $props.title ? null : "true",
    "aria-label": $props.title,
    class: "material-design-icon radiobox-marked-icon",
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
      createBaseVNode("path", _hoisted_3$1$1, [
        $props.title ? (openBlock(), createElementBlock("title", _hoisted_4$7, toDisplayString($props.title), 1)) : createCommentVNode("", true)
      ])
    ], 8, _hoisted_2$1$1))
  ], 16, _hoisted_1$2$2);
}
const RadioboxMarked = /* @__PURE__ */ _export_sfc$1(_sfc_main$2$2, [["render", _sfc_render$2$2]]);
const TYPE_CHECKBOX = "checkbox";
const TYPE_RADIO = "radio";
const TYPE_SWITCH = "switch";
const TYPE_BUTTON = "button";
const _sfc_main$1$2 = {
  name: "NcCheckboxContent",
  components: {
    NcLoadingIcon,
    NcIconToggleSwitch
  },
  props: {
    /**
     * Class for the icon element
     */
    iconClass: {
      type: [String, Object],
      default: null
    },
    /**
     * Class for the text element
     */
    textClass: {
      type: [String, Object],
      default: null
    },
    /**
     * Type of the input. checkbox, radio, switch, or button.
     *
     * Only use button when used in a `tablist` container and the
     * `tab` role is set.
     *
     * @type {'checkbox'|'radio'|'switch'|'button'}
     */
    type: {
      type: String,
      default: "checkbox",
      validator: (type) => [
        TYPE_CHECKBOX,
        TYPE_RADIO,
        TYPE_SWITCH,
        TYPE_BUTTON
      ].includes(type)
    },
    /**
     * Toggle the alternative button style
     */
    buttonVariant: {
      type: Boolean,
      default: false
    },
    /**
     * True if the entry is checked
     */
    isChecked: {
      type: Boolean,
      default: false
    },
    /**
     * Indeterminate state
     */
    indeterminate: {
      type: Boolean,
      default: false
    },
    /**
     * Loading state
     */
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * Icon size
     */
    iconSize: {
      type: Number,
      default: 24
    },
    /**
     * Label id attribute
     */
    labelId: {
      type: String,
      required: true
    },
    /**
     * Description id attribute
     */
    descriptionId: {
      type: String,
      required: true
    }
  },
  computed: {
    isButtonType() {
      return this.type === TYPE_BUTTON;
    },
    isSwitchType() {
      return this.type === TYPE_SWITCH;
    },
    /**
     * Returns the proper Material icon depending on the select case
     *
     * @return {object}
     */
    checkboxRadioIconElement() {
      if (this.type === TYPE_RADIO) {
        if (this.isChecked) {
          return RadioboxMarked;
        }
        return RadioboxBlank;
      }
      if (this.indeterminate) {
        return MinusBox;
      }
      if (this.isChecked) {
        return CheckboxMarked;
      }
      return CheckboxBlankOutline;
    }
  }
};
const _hoisted_1$1$2 = {
  key: 0,
  class: "checkbox-content__wrapper"
};
const _hoisted_2$a = ["id"];
const _hoisted_3$8 = ["id"];
function _sfc_render$1$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_NcLoadingIcon = resolveComponent("NcLoadingIcon");
  const _component_NcIconToggleSwitch = resolveComponent("NcIconToggleSwitch");
  return openBlock(), createElementBlock("span", {
    class: normalizeClass(["checkbox-content", {
      ["checkbox-content-" + $props.type]: true,
      "checkbox-content--button-variant": $props.buttonVariant,
      "checkbox-content--has-text": !!_ctx.$slots.default
    }])
  }, [
    createBaseVNode("span", {
      class: normalizeClass(["checkbox-content__icon", {
        "checkbox-content__icon--checked": $props.isChecked,
        "checkbox-content__icon--has-description": !$options.isButtonType && _ctx.$slots.description,
        [$props.iconClass]: true
      }]),
      "aria-hidden": true,
      inert: ""
    }, [
      renderSlot(_ctx.$slots, "icon", {
        checked: $props.isChecked,
        loading: $props.loading
      }, () => [
        $props.loading ? (openBlock(), createBlock(_component_NcLoadingIcon, { key: 0 })) : $options.isSwitchType ? (openBlock(), createBlock(_component_NcIconToggleSwitch, {
          key: 1,
          checked: $props.isChecked,
          size: $props.iconSize,
          inline: ""
        }, null, 8, ["checked", "size"])) : !$props.buttonVariant ? (openBlock(), createBlock(resolveDynamicComponent($options.checkboxRadioIconElement), {
          key: 2,
          size: $props.iconSize
        }, null, 8, ["size"])) : createCommentVNode("", true)
      ], true)
    ], 2),
    _ctx.$slots.default || _ctx.$slots.description ? (openBlock(), createElementBlock("span", _hoisted_1$1$2, [
      _ctx.$slots.default ? (openBlock(), createElementBlock("span", {
        key: 0,
        id: $props.labelId,
        class: normalizeClass(["checkbox-content__text", $props.textClass])
      }, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 10, _hoisted_2$a)) : createCommentVNode("", true),
      !$options.isButtonType && _ctx.$slots.description ? (openBlock(), createElementBlock("span", {
        key: 1,
        id: $props.descriptionId,
        class: "checkbox-content__description"
      }, [
        renderSlot(_ctx.$slots, "description", {}, void 0, true)
      ], 8, _hoisted_3$8)) : createCommentVNode("", true)
    ])) : createCommentVNode("", true)
  ], 2);
}
const NcCheckboxContent = /* @__PURE__ */ _export_sfc$1(_sfc_main$1$2, [["render", _sfc_render$1$2], ["__scopeId", "data-v-5ca1e30f"]]);
register();
const _sfc_main$e = {
  name: "NcCheckboxRadioSwitch",
  components: {
    NcCheckboxContent
  },
  // We need to pass attributes to the input element
  inheritAttrs: false,
  props: {
    /**
     * Unique id attribute of the input
     */
    id: {
      type: String,
      default: () => "checkbox-radio-switch-" + createElementId(),
      validator: (id) => id.trim() !== ""
    },
    /**
     * Unique id attribute of the wrapper element
     */
    wrapperId: {
      type: String,
      default: null
    },
    /**
     * Input name. Required for radio, optional for checkbox, and ignored
     * for button.
     */
    name: {
      type: String,
      default: null
    },
    /**
     * Required if no text is set.
     * The aria-label is forwarded to the input or button.
     */
    ariaLabel: {
      type: String,
      default: ""
    },
    /**
     * Type of the input. checkbox, radio, switch, or button.
     *
     * Only use button when used in a `tablist` container and the
     * `tab` role is set.
     *
     * @type {'checkbox'|'radio'|'switch'|'button'}
     */
    type: {
      type: String,
      default: "checkbox",
      validator: (type) => [
        TYPE_CHECKBOX,
        TYPE_RADIO,
        TYPE_SWITCH,
        TYPE_BUTTON
      ].includes(type)
    },
    /**
     * Toggle the alternative button style
     *
     * @deprecated - Use `NcRadioGroup` instead
     */
    buttonVariant: {
      type: Boolean,
      default: false
    },
    /**
     * Are the elements are all direct siblings?
     * If so they will be grouped horizontally or vertically
     *
     * @type {'no'|'horizontal'|'vertical'}
     * @deprecated - Use `NcRadioGroup` instead
     */
    buttonVariantGrouped: {
      type: String,
      default: "no",
      validator: (v) => ["no", "vertical", "horizontal"].includes(v)
    },
    /**
     * Checked state. To be used with `v-model:value`
     */
    modelValue: {
      type: [Boolean, Array, String],
      default: false
    },
    /**
     * Value to be synced on check
     */
    value: {
      type: String,
      default: null
    },
    /**
     * Disabled state
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Indeterminate state
     */
    indeterminate: {
      type: Boolean,
      default: false
    },
    /**
     * Required state
     */
    required: {
      type: Boolean,
      default: false
    },
    /**
     * Loading state
     */
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * Wrapping element tag
     *
     * When `type` is set to `button` this will be ignored
     *
     * Defaults to `span`
     */
    wrapperElement: {
      type: String,
      default: null
    },
    /**
     * The class(es) to pass to the wrapper / root element of the component
     */
    class: {
      type: [String, Array, Object],
      default: ""
    },
    /**
     * The style to pass to the wrapper / root element of the component
     */
    style: {
      type: [String, Array, Object],
      default: ""
    },
    /**
     * Description
     *
     * This is unsupported when using button has type.
     */
    description: {
      type: String,
      default: null
    }
  },
  emits: ["update:modelValue"],
  setup(props, { emit: emit2 }) {
    const radioGroup = useInsideRadioGroup();
    onMounted(() => radioGroup?.value.register(false));
    const internalType = computed(() => radioGroup?.value ? TYPE_RADIO : props.type);
    const internalModelValue = computed({
      get() {
        if (radioGroup?.value) {
          return radioGroup.value.modelValue;
        }
        return props.modelValue;
      },
      set(value) {
        if (radioGroup?.value) {
          radioGroup.value.onUpdate(value);
        } else {
          emit2("update:modelValue", value);
        }
      }
    });
    return {
      internalType,
      internalModelValue,
      labelId: createElementId(),
      descriptionId: createElementId()
    };
  },
  computed: {
    isButtonType() {
      return this.internalType === TYPE_BUTTON;
    },
    computedWrapperElement() {
      if (this.isButtonType) {
        return "button";
      }
      if (this.wrapperElement !== null) {
        return this.wrapperElement;
      }
      return "span";
    },
    listeners() {
      if (this.isButtonType) {
        return {
          click: this.onToggle
        };
      }
      return {
        change: this.onToggle
      };
    },
    iconSize() {
      return this.internalType === TYPE_SWITCH ? 36 : 20;
    },
    cssIconSize() {
      return this.iconSize + "px";
    },
    cssIconHeight() {
      return this.internalType === TYPE_SWITCH ? "16px" : this.cssIconSize;
    },
    /**
     * Return the input type.
     * Switch is not an official type
     *
     * @return {string}
     */
    inputType() {
      const nativeTypes = [
        TYPE_CHECKBOX,
        TYPE_RADIO,
        TYPE_BUTTON
      ];
      if (nativeTypes.includes(this.internalType)) {
        return this.internalType;
      }
      return TYPE_CHECKBOX;
    },
    /**
     * Check if that entry is checked
     * If value is defined, we use that as the checked value
     * If not, we expect true/false in this.checked
     *
     * @return {boolean}
     */
    isChecked() {
      if (this.value !== null) {
        if (Array.isArray(this.internalModelValue)) {
          return [...this.internalModelValue].indexOf(this.value) > -1;
        }
        return this.internalModelValue === this.value;
      }
      return this.internalModelValue === true;
    },
    hasIndeterminate() {
      return [
        TYPE_CHECKBOX,
        TYPE_RADIO
      ].includes(this.inputType);
    }
  },
  mounted() {
    if (this.name && this.internalType === TYPE_CHECKBOX) {
      if (!Array.isArray(this.internalModelValue)) {
        throw new Error("When using groups of checkboxes, the updated value will be an array.");
      }
    }
    if (this.name && this.internalType === TYPE_SWITCH) {
      throw new Error("Switches are not made to be used for data sets. Please use checkboxes instead.");
    }
    if (typeof this.internalModelValue !== "boolean" && this.internalType === TYPE_SWITCH) {
      throw new Error("Switches can only be used with boolean as modelValue prop.");
    }
  },
  methods: {
    t,
    n,
    onToggle(event) {
      if (this.disabled || event.target.tagName.toLowerCase() === "a") {
        return;
      }
      if (this.internalType === TYPE_RADIO) {
        this.internalModelValue = this.value;
        return;
      }
      if (this.internalType === TYPE_SWITCH) {
        this.internalModelValue = !this.isChecked;
        return;
      }
      if (typeof this.internalModelValue === "boolean") {
        this.internalModelValue = !this.internalModelValue;
        return;
      }
      if (this.isChecked) {
        this.internalModelValue = this.internalModelValue.filter((v) => v !== this.value);
      } else {
        this.internalModelValue = [...this.internalModelValue, this.value];
      }
    }
  }
};
const __injectCSSVars__ = () => {
  useCssVars((_ctx) => ({
    "v5ac25550": _ctx.cssIconSize,
    "d98ce684": _ctx.cssIconHeight
  }));
};
const __setup__ = _sfc_main$e.setup;
_sfc_main$e.setup = __setup__ ? (props, ctx) => {
  __injectCSSVars__();
  return __setup__(props, ctx);
} : __injectCSSVars__;
const _hoisted_1$d = ["id", "aria-labelledby", "aria-describedby", "aria-label", "disabled", "type", "value", "checked", ".indeterminate", "required", "name"];
function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_NcCheckboxContent = resolveComponent("NcCheckboxContent");
  return openBlock(), createBlock(resolveDynamicComponent($options.computedWrapperElement), mergeProps({
    id: $props.wrapperId ?? ($options.isButtonType ? $props.id : null),
    "aria-label": $options.isButtonType && $props.ariaLabel ? $props.ariaLabel : void 0,
    class: ["checkbox-radio-switch", [
      _ctx.$props.class,
      {
        ["checkbox-radio-switch-" + $setup.internalType]: $setup.internalType,
        "checkbox-radio-switch--checked": $options.isChecked,
        "checkbox-radio-switch--disabled": $props.disabled,
        "checkbox-radio-switch--indeterminate": $options.hasIndeterminate ? $props.indeterminate : false,
        "checkbox-radio-switch--button-variant": $props.buttonVariant,
        "checkbox-radio-switch--button-variant-v-grouped": $props.buttonVariant && $props.buttonVariantGrouped === "vertical",
        "checkbox-radio-switch--button-variant-h-grouped": $props.buttonVariant && $props.buttonVariantGrouped === "horizontal",
        "button-vue": $options.isButtonType
      }
    ]],
    style: $props.style,
    type: $options.isButtonType ? "button" : null
  }, $options.isButtonType ? _ctx.$attrs : {}, toHandlers($options.isButtonType ? $options.listeners : {})), {
    default: withCtx(() => [
      !$options.isButtonType ? (openBlock(), createElementBlock("input", mergeProps({
        key: 0,
        id: $props.id,
        "aria-labelledby": !$options.isButtonType && !$props.ariaLabel ? $setup.labelId : null,
        "aria-describedby": !$options.isButtonType && ($props.description || _ctx.$slots.description) ? $setup.descriptionId : null,
        "aria-label": $props.ariaLabel || void 0,
        class: "checkbox-radio-switch__input",
        disabled: $props.disabled,
        type: $options.inputType,
        value: $props.value,
        checked: $options.isChecked,
        ".indeterminate": $options.hasIndeterminate ? $props.indeterminate : null,
        required: $props.required,
        name: $props.name
      }, _ctx.$attrs, toHandlers($options.listeners, true)), null, 48, _hoisted_1$d)) : createCommentVNode("", true),
      createVNode(_component_NcCheckboxContent, {
        id: !$options.isButtonType ? `${$props.id}-label` : void 0,
        class: "checkbox-radio-switch__content",
        iconClass: "checkbox-radio-switch__icon",
        textClass: "checkbox-radio-switch__text",
        type: $setup.internalType,
        indeterminate: $options.hasIndeterminate ? $props.indeterminate : false,
        buttonVariant: $props.buttonVariant,
        isChecked: $options.isChecked,
        loading: $props.loading,
        labelId: $setup.labelId,
        descriptionId: $setup.descriptionId,
        iconSize: $options.iconSize,
        onClick: $options.onToggle
      }, createSlots({
        icon: withCtx(() => [
          renderSlot(_ctx.$slots, "icon", {}, void 0, true)
        ]),
        _: 2
      }, [
        _ctx.$slots.description || $props.description ? {
          name: "description",
          fn: withCtx(() => [
            renderSlot(_ctx.$slots, "description", {}, () => [
              createTextVNode(toDisplayString($props.description), 1)
            ], true)
          ]),
          key: "0"
        } : void 0,
        !!_ctx.$slots.default ? {
          name: "default",
          fn: withCtx(() => [
            renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ]),
          key: "1"
        } : void 0
      ]), 1032, ["id", "type", "indeterminate", "buttonVariant", "isChecked", "loading", "labelId", "descriptionId", "iconSize", "onClick"])
    ]),
    _: 3
  }, 16, ["id", "aria-label", "class", "style", "type"]);
}
const NcCheckboxRadioSwitch = /* @__PURE__ */ _export_sfc$1(_sfc_main$e, [["render", _sfc_render$c], ["__scopeId", "data-v-c34c63a4"]]);
function hasWindow() {
  return typeof window !== "undefined";
}
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  if (!hasWindow() || typeof ShadowRoot === "undefined") {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle$1(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && display !== "inline" && display !== "contents";
}
function isTableElement(element) {
  return /^(table|td|th)$/.test(getNodeName(element));
}
function isTopLayer(element) {
  try {
    if (element.matches(":popover-open")) {
      return true;
    }
  } catch (_e) {
  }
  try {
    return element.matches(":modal");
  } catch (_e) {
    return false;
  }
}
const willChangeRe = /transform|translate|scale|rotate|perspective|filter/;
const containRe = /paint|layout|strict|content/;
const isNotNone = (value) => !!value && value !== "none";
let isWebKitValue;
function isContainingBlock(elementOrCss) {
  const css = isElement(elementOrCss) ? getComputedStyle$1(elementOrCss) : elementOrCss;
  return isNotNone(css.transform) || isNotNone(css.translate) || isNotNone(css.scale) || isNotNone(css.rotate) || isNotNone(css.perspective) || !isWebKit() && (isNotNone(css.backdropFilter) || isNotNone(css.filter)) || willChangeRe.test(css.willChange || "") || containRe.test(css.contain || "");
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (isWebKitValue == null) {
    isWebKitValue = typeof CSS !== "undefined" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none");
  }
  return isWebKitValue;
}
function isLastTraversableNode(node) {
  return /^(html|body|#document)$/.test(getNodeName(node));
}
function getComputedStyle$1(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot(node) && node.host || // Fallback.
    getDocumentElement(node)
  );
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    const frameElement = getFrameElement(win);
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
  } else {
    return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
  }
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}
function getCssDimensions(element) {
  const css = getComputedStyle$1(element);
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? round(rect.width) : rect.width) / width;
  let y = ($ ? round(rect.height) : rect.height) / height;
  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}
const noOffsets = /* @__PURE__ */ createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = getFrameElement(currentWin);
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle$1(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = getFrameElement(currentWin);
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}
function getWindowScrollBarX(element, rect) {
  const leftScroll = getNodeScroll(element).scrollLeft;
  if (!rect) {
    return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
  }
  return rect.left + leftScroll;
}
function getHTMLOffset(documentElement, scroll) {
  const htmlRect = documentElement.getBoundingClientRect();
  const x = htmlRect.left + scroll.scrollLeft - getWindowScrollBarX(documentElement, htmlRect);
  const y = htmlRect.top + scroll.scrollTop;
  return {
    x,
    y
  };
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === "fixed";
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
  };
}
function getClientRects(element) {
  return Array.from(element.getClientRects());
}
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle$1(body).direction === "rtl") {
    x += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}
const SCROLLBAR_MAX = 25;
function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  const windowScrollbarX = getWindowScrollBarX(html);
  if (windowScrollbarX <= 0) {
    const doc = html.ownerDocument;
    const body = doc.body;
    const bodyStyles = getComputedStyle(body);
    const bodyMarginInline = doc.compatMode === "CSS1Compat" ? parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight) || 0 : 0;
    const clippingStableScrollbarWidth = Math.abs(html.clientWidth - body.clientWidth - bodyMarginInline);
    if (clippingStableScrollbarWidth <= SCROLLBAR_MAX) {
      width -= clippingStableScrollbarWidth;
    }
  } else if (windowScrollbarX <= SCROLLBAR_MAX) {
    width += windowScrollbarX;
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport") {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y,
      width: clippingAncestor.width,
      height: clippingAncestor.height
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle$1(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle$1(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element) : element;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle$1(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === "fixed") {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && (currentContainingBlockComputedStyle.position === "absolute" || currentContainingBlockComputedStyle.position === "fixed") || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstRect = getClientRectFromClippingAncestor(element, clippingAncestors[0], strategy);
  let top = firstRect.top;
  let right = firstRect.right;
  let bottom = firstRect.bottom;
  let left = firstRect.left;
  for (let i = 1; i < clippingAncestors.length; i++) {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestors[i], strategy);
    top = max(rect.top, top);
    right = min(rect.right, right);
    bottom = min(rect.bottom, bottom);
    left = max(rect.left, left);
  }
  return {
    width: right - left,
    height: bottom - top,
    x: left,
    y: top
  };
}
function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  function setLeftRTLScrollbarOffset() {
    offsets.x = getWindowScrollBarX(documentElement);
  }
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      setLeftRTLScrollbarOffset();
    }
  }
  if (isFixed && !isOffsetParentAnElement && documentElement) {
    setLeftRTLScrollbarOffset();
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  const x = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
  const y = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
  return {
    x,
    y,
    width: rect.width,
    height: rect.height
  };
}
function isStaticPositioned(element) {
  return getComputedStyle$1(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle$1(element).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  let rawOffsetParent = element.offsetParent;
  if (getDocumentElement(element) === rawOffsetParent) {
    rawOffsetParent = rawOffsetParent.ownerDocument.body;
  }
  return rawOffsetParent;
}
function getOffsetParent(element, polyfill) {
  const win = getWindow(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}
const getElementRects = async function(data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
};
function isRTL(element) {
  return getComputedStyle$1(element).direction === "rtl";
}
const platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};
function rectsAreEqual(a, b) {
  return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
}
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const elementRectForRootMargin = element.getBoundingClientRect();
    const {
      left,
      top,
      width,
      height
    } = elementRectForRootMargin;
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1e3);
        } else {
          refresh(false, ratio);
        }
      }
      if (ratio === 1 && !rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) {
        refresh();
      }
      isFirstUpdate = false;
    }
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (_e) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === "function",
    layoutShift = typeof IntersectionObserver === "function",
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...floating ? getOverflowAncestors(floating) : []] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener("resize", update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver && floating) {
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    if (floating) {
      resizeObserver.observe(floating);
    }
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update);
      ancestorResize && ancestor.removeEventListener("resize", update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
const offset = offset$1;
const shift = shift$1;
const flip = flip$1;
const limitShift = limitShift$1;
const computePosition = (reference, floating, options) => {
  const cache = /* @__PURE__ */ new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition$1(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};
const appendToBody = {
  mounted(el, { instance }) {
    if (instance.appendToBody) {
      document.body.appendChild(el);
      const { height, top, left, width } = instance.$refs.toggle.getBoundingClientRect();
      const scrollX = window.scrollX || window.pageXOffset;
      const scrollY = window.scrollY || window.pageYOffset;
      el.unbindPosition = instance.calculatePosition(el, instance, {
        width: width + "px",
        left: scrollX + left + "px",
        top: scrollY + top + height + "px"
      });
    }
  },
  unmounted(el, { instance }) {
    if (instance.appendToBody) {
      if (el.unbindPosition && typeof el.unbindPosition === "function") {
        el.unbindPosition();
      }
      if (el.parentNode) {
        el.parentNode.removeChild(el);
      }
    }
  }
};
const ajax = {
  props: {
    /**
     * Toggles the adding of a 'loading' class to the main
     * .v-select wrapper. Useful to control UI state when
     * results are being processed through AJAX.
     */
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      mutableLoading: false
    };
  },
  watch: {
    /**
     * Anytime the search string changes, emit the
     * 'search' event. The event is passed with two
     * parameters: the search string, and a function
     * that accepts a boolean parameter to toggle the
     * loading state.
     *
     * @fires 'search'
     */
    search() {
      this.$emit("search", this.search, this.toggleLoading);
    },
    /**
     * Sync the loading prop with the internal
     * mutable loading value.
     *
     * @param val Incoming loading state.
     */
    loading(val) {
      this.mutableLoading = val;
    }
  },
  methods: {
    /**
     * Toggle this.loading. Optionally pass a boolean
     * value. If no value is provided, this.loading
     * will be set to the opposite of it's current value.
     *
     * @param toggle Boolean
     * @return {*}
     */
    toggleLoading(toggle = null) {
      if (toggle === null || toggle === void 0) {
        return this.mutableLoading = !this.mutableLoading;
      }
      return this.mutableLoading = toggle;
    }
  }
};
const pointerScroll = {
  props: {
    autoscroll: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    typeAheadPointer() {
      if (this.autoscroll) {
        this.maybeAdjustScroll();
      }
    },
    open(open) {
      if (this.autoscroll && open) {
        this.$nextTick(() => this.maybeAdjustScroll());
      }
    }
  },
  methods: {
    /**
     * Adjust the scroll position of the dropdown list
     * if the current pointer is outside of the
     * overflow bounds.
     *
     * @return {*}
     */
    maybeAdjustScroll() {
      const optionEl = this.$refs.dropdownMenu?.children[this.typeAheadPointer] || false;
      if (optionEl) {
        const bounds = this.getDropdownViewport();
        const { top, bottom, height } = optionEl.getBoundingClientRect();
        if (top < bounds.top) {
          return this.$refs.dropdownMenu.scrollTop = optionEl.offsetTop;
        } else if (bottom > bounds.bottom) {
          return this.$refs.dropdownMenu.scrollTop = optionEl.offsetTop - (bounds.height - height);
        }
      }
    },
    /**
     * The currently viewable portion of the dropdownMenu.
     *
     * @return {{top: (string|*|number), bottom: *}}
     */
    getDropdownViewport() {
      return this.$refs.dropdownMenu ? this.$refs.dropdownMenu.getBoundingClientRect() : {
        height: 0,
        top: 0,
        bottom: 0
      };
    }
  }
};
const pointer = {
  data() {
    return {
      typeAheadPointer: -1
    };
  },
  watch: {
    filteredOptions() {
      if (!this.resetFocusOnOptionsChange) {
        return;
      }
      for (let i = 0; i < this.filteredOptions.length; i++) {
        if (this.selectable(this.filteredOptions[i])) {
          this.typeAheadPointer = i;
          break;
        }
      }
    },
    open(open) {
      if (open) {
        this.typeAheadToLastSelected();
      }
    },
    selectedValue() {
      if (this.open) {
        this.typeAheadToLastSelected();
      }
    }
  },
  methods: {
    /**
     * Move the typeAheadPointer visually up the list by
     * setting it to the previous selectable option.
     *
     * @return {void}
     */
    typeAheadUp() {
      for (let i = this.typeAheadPointer - 1; i >= 0; i--) {
        if (this.selectable(this.filteredOptions[i])) {
          this.typeAheadPointer = i;
          break;
        }
      }
    },
    /**
     * Move the typeAheadPointer visually down the list by
     * setting it to the next selectable option.
     *
     * @return {void}
     */
    typeAheadDown() {
      for (let i = this.typeAheadPointer + 1; i < this.filteredOptions.length; i++) {
        if (this.selectable(this.filteredOptions[i])) {
          this.typeAheadPointer = i;
          break;
        }
      }
    },
    /**
     * Select the option at the current typeAheadPointer position.
     * Optionally clear the search input on selection.
     *
     * @return {void}
     */
    typeAheadSelect() {
      const typeAheadOption = this.filteredOptions[this.typeAheadPointer];
      if (typeAheadOption && this.selectable(typeAheadOption)) {
        this.select(typeAheadOption);
      }
    },
    /**
     * Moves the pointer to the last selected option.
     */
    typeAheadToLastSelected() {
      const indexOfLastSelected = this.selectedValue.length !== 0 ? this.filteredOptions.indexOf(this.selectedValue[this.selectedValue.length - 1]) : -1;
      if (indexOfLastSelected !== -1) {
        this.typeAheadPointer = indexOfLastSelected;
      }
    }
  }
};
function sortAndStringify(sortable) {
  const ordered = {};
  Object.keys(sortable).sort().forEach((key) => {
    ordered[key] = sortable[key];
  });
  return JSON.stringify(ordered);
}
let idCount = 0;
function uniqueId() {
  return ++idCount;
}
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$2$1 = {};
const _hoisted_1$2$1 = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "10",
  height: "10"
};
function _sfc_render$2$1(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$2$1, [..._cache[0] || (_cache[0] = [
    createBaseVNode("path", { d: "M6.895455 5l2.842897-2.842898c.348864-.348863.348864-.914488 0-1.263636L9.106534.261648c-.348864-.348864-.914489-.348864-1.263636 0L5 3.104545 2.157102.261648c-.348863-.348864-.914488-.348864-1.263636 0L.261648.893466c-.348864.348864-.348864.914489 0 1.263636L3.104545 5 .261648 7.842898c-.348864.348863-.348864.914488 0 1.263636l.631818.631818c.348864.348864.914773.348864 1.263636 0L5 6.895455l2.842898 2.842897c.348863.348864.914772.348864 1.263636 0l.631818-.631818c.348864-.348864.348864-.914489 0-1.263636L6.895455 5z" }, null, -1)
  ])]);
}
const Deselect = /* @__PURE__ */ _export_sfc(_sfc_main$2$1, [["render", _sfc_render$2$1]]);
const _sfc_main$1$1 = {};
const _hoisted_1$1$1 = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "14",
  height: "10"
};
function _sfc_render$1$1(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$1$1, [..._cache[0] || (_cache[0] = [
    createBaseVNode("path", { d: "M9.211364 7.59931l4.48338-4.867229c.407008-.441854.407008-1.158247 0-1.60046l-.73712-.80023c-.407008-.441854-1.066904-.441854-1.474243 0L7 5.198617 2.51662.33139c-.407008-.441853-1.066904-.441853-1.474243 0l-.737121.80023c-.407008.441854-.407008 1.158248 0 1.600461l4.48338 4.867228L7 10l2.211364-2.40069z" }, null, -1)
  ])]);
}
const OpenIndicator = /* @__PURE__ */ _export_sfc(_sfc_main$1$1, [["render", _sfc_render$1$1]]);
const childComponents = {
  Deselect,
  OpenIndicator
};
const _sfc_main$d = {
  components: { ...childComponents },
  directives: { appendToBody },
  mixins: [pointerScroll, pointer, ajax],
  props: {
    /**
     * Contains the currently selected value. Very similar to a
     * `value` attribute on an <input>. You can listen for changes
     * with the 'input' event.
     *
     * @type {object | string | Array | null}
     */
    modelValue: {},
    /**
     * An object with any custom components that you'd like to overwrite
     * the default implementation of in your app. The keys in this object
     * will be merged with the defaults.
     *
     * @see https://vue-select.org/guide/components.html
     * @type {Function}
     */
    components: {
      type: Object,
      default: () => ({})
    },
    /**
     * An array of strings or objects to be used as dropdown choices.
     * If you are using an array of objects, vue-select will look for
     * a `label` key (ex. [{label: 'This is Foo', value: 'foo'}]). A
     * custom label key can be set with the `label` prop.
     *
     * @type {Array}
     */
    options: {
      type: Array,
      default() {
        return [];
      }
    },
    /**
     * Sets the maximum number of options to display in the dropdown list
     *
     * @type {number}
     */
    limit: {
      type: Number,
      default: null
    },
    /**
     * Disable the entire component.
     *
     * @type {boolean}
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Can the user clear the selected property.
     *
     * @type {boolean}
     */
    clearable: {
      type: Boolean,
      default: true
    },
    /**
     * Can the user deselect an option by clicking it from
     * within the dropdown.
     *
     * @type {boolean}
     */
    deselectFromDropdown: {
      type: Boolean,
      default: false
    },
    /**
     * Enable/disable filtering the options.
     *
     * @type {boolean}
     */
    searchable: {
      type: Boolean,
      default: true
    },
    /**
     * Equivalent to the `multiple` attribute on a `<select>` input.
     *
     * @type {boolean}
     */
    multiple: {
      type: Boolean,
      default: false
    },
    /**
     * Equivalent to the `placeholder` attribute on an `<input>`.
     *
     * @type {string}
     */
    placeholder: {
      type: String,
      default: ""
    },
    /**
     * Sets a Vue transition property on the `.vs__dropdown-menu`.
     *
     * @type {string}
     */
    transition: {
      type: String,
      default: "vs__fade"
    },
    /**
     * Enables/disables clearing the search text when an option is selected.
     *
     * @type {boolean}
     */
    clearSearchOnSelect: {
      type: Boolean,
      default: true
    },
    /**
     * Close a dropdown when an option is chosen. Set to false to keep the dropdown
     * open (useful when combined with multi-select, for example)
     *
     * @type {boolean}
     */
    closeOnSelect: {
      type: Boolean,
      default: true
    },
    /**
     * Tells vue-select what key to use when generating option
     * labels when each `option` is an object.
     *
     * @type {string}
     */
    label: {
      type: String,
      default: "label"
    },
    /**
     * Allows to customize the `aria-label` set on the comobobox for searching options.
     *
     * @type {string}
     * @default 'Search for options'
     */
    ariaLabelCombobox: {
      type: String,
      default: "Search for options"
    },
    /**
     * Allows to customize the `aria-label` set on the listbox element.
     *
     * @type {string}
     * @default 'Options'
     */
    ariaLabelListbox: {
      type: String,
      default: "Options"
    },
    /**
     * Allows to customize the `aria-label` set on the clear-selected button
     *
     * @type {string}
     * @default 'Clear selected'
     */
    ariaLabelClearSelected: {
      type: String,
      default: "Clear selected"
    },
    /**
     * Allows to customize the `aria-label` for the deselect-option button
     * The default is "Deselect " + optionLabel
     *
     * @type {(optionLabel: string) => string}
     */
    ariaLabelDeselectOption: {
      type: Function,
      default: (optionLabel) => `Deselect ${optionLabel}`
    },
    /**
     * Value of the 'autocomplete' field of the input
     * element.
     *
     * @type {string}
     */
    autocomplete: {
      type: String,
      default: "off"
    },
    /**
     * When working with objects, the reduce
     * prop allows you to transform a given
     * object to only the information you
     * want passed to a v-model binding
     * or \@input event.
     */
    reduce: {
      type: Function,
      default: (option) => option
    },
    /**
     * Decides whether an option is selectable or not. Not selectable options
     * are displayed but disabled and cannot be selected.
     *
     * @type {Function}
     * @since 3.3.0
     * @param {object | string} option
     * @return {boolean}
     */
    selectable: {
      type: Function,
      default: () => true
    },
    /**
     * Callback to generate the label text. If {option}
     * is an object, returns option[this.label] by default.
     *
     * Label text is used for filtering comparison and
     * displaying. If you only need to adjust the
     * display, you should use the `option` and
     * `selected-option` slots.
     *
     * @type {Function}
     * @param  {object | string} option
     * @return {string}
     */
    getOptionLabel: {
      type: Function,
      default(option) {
        if (typeof option === "object") {
          if (!Object.hasOwn(option, this.label)) {
            return warn(`[vue-select warn]: Label key "option.${this.label}" does not exist in options object ${JSON.stringify(option)}.
https://vue-select.org/api/props.html#getoptionlabel`);
          }
          return option[this.label];
        }
        return option;
      }
    },
    /**
     * Generate a unique identifier for each option. If `option`
     * is an object and `option.hasOwnProperty('id')` exists,
     * `option.id` is used by default, otherwise the option
     * will be serialized to JSON.
     *
     * If you are supplying a lot of options, you should
     * provide your own keys, as JSON.stringify can be
     * slow with lots of objects.
     *
     * The result of this function *must* be unique.
     *
     * @type {Function}
     * @param  {object | string} option
     * @return {string}
     */
    getOptionKey: {
      type: Function,
      default(option) {
        if (typeof option !== "object") {
          return option;
        }
        try {
          return Object.hasOwn(option, "id") ? option.id : sortAndStringify(option);
        } catch (e) {
          const warning = "[vue-select warn]: Could not stringify this option to generate unique key. Please provide'getOptionKey' prop to return a unique key for each option.\nhttps://vue-select.org/api/props.html#getoptionkey";
          return warn(warning, option, e);
        }
      }
    },
    /**
     * Select the current value if selectOnTab is enabled
     *
     * @deprecated since 3.3
     */
    onTab: {
      type: Function,
      default() {
        if (this.selectOnTab && !this.isComposing) {
          this.typeAheadSelect();
        }
      }
    },
    /**
     * Enable/disable creating options from searchEl.
     *
     * @type {boolean}
     */
    taggable: {
      type: Boolean,
      default: false
    },
    /**
     * Set the tabindex for the input field.
     *
     * @type {number}
     */
    tabindex: {
      type: Number,
      default: null
    },
    /**
     * When true, newly created tags will be added to
     * the options list.
     *
     * @type {boolean}
     */
    pushTags: {
      type: Boolean,
      default: false
    },
    /**
     * When true, existing options will be filtered
     * by the search text. Should not be used in conjunction
     * with taggable.
     *
     * @type {boolean}
     */
    filterable: {
      type: Boolean,
      default: true
    },
    /**
     * Callback to determine if the provided option should
     * match the current search text. Used to determine
     * if the option should be displayed.
     *
     * @type {Function}
     * @param  {object | string} option
     * @param  {string} label
     * @param  {string} search
     * @return {boolean}
     */
    filterBy: {
      type: Function,
      default(option, label, search) {
        return (label || "").toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1;
      }
    },
    /**
     * Callback to filter results when search text
     * is provided. Default implementation loops
     * each option, and returns the result of
     * this.filterBy.
     *
     * @type {Function}
     * @param  {Array} list of options
     * @param  {string} search text
     * @param  {object} vSelect instance
     * @return {boolean}
     */
    filter: {
      type: Function,
      default(options, search) {
        return options.filter((option) => {
          let label = this.getOptionLabel(option);
          if (typeof label === "number") {
            label = label.toString();
          }
          return this.filterBy(option, label, search);
        });
      }
    },
    /**
     * User defined function for adding Options
     *
     * @type {Function}
     */
    createOption: {
      type: Function,
      default(option) {
        return typeof this.optionList[0] === "object" ? { [this.label]: option } : option;
      }
    },
    /**
     * If false, the focused dropdown option will not be reset when filtered
     * options change.
     *
     * @type {boolean}
     */
    resetFocusOnOptionsChange: {
      type: Boolean,
      default: true
    },
    /**
     * When false, updating the options will not reset the selected value. Accepts
     * a `boolean` or `function` that returns a `boolean`. If defined as a function,
     * it will receive the params listed below.
     *
     * @since 3.4 - Type changed to {boolean | Function}
     *
     * @type {boolean | Function}
     * @param {Array} newOptions
     * @param {Array} oldOptions
     * @param {Array} selectedValue
     */
    resetOnOptionsChange: {
      default: false,
      validator: (value) => ["function", "boolean"].includes(typeof value)
    },
    /**
     * If search text should clear on blur
     *
     * @return {boolean} True when single and clearSearchOnSelect
     */
    clearSearchOnBlur: {
      type: Function,
      default({ clearSearchOnSelect, multiple }) {
        return clearSearchOnSelect && !multiple;
      }
    },
    /**
     * Disable the dropdown entirely.
     *
     * @type {boolean}
     */
    noDrop: {
      type: Boolean,
      default: false
    },
    /**
     * Sets the id of the input element.
     *
     * @type {string}
     * @default {null}
     */
    inputId: {
      type: String
    },
    /**
     * Sets RTL support. Accepts 'ltr', 'rtl', 'auto'.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir
     * @type {string}
     * @default 'auto'
     */
    dir: {
      type: String,
      default: "auto"
    },
    /**
     * When true, hitting the 'tab' key will select the current select value
     *
     * @type {boolean}
     * @deprecated since 3.3 - use selectOnKeyCodes instead
     */
    selectOnTab: {
      type: Boolean,
      default: false
    },
    /**
     * Keycodes that will select the current option.
     *
     * @type Array
     */
    selectOnKeyCodes: {
      type: Array,
      default: () => [
        // enter
        13
      ]
    },
    /**
     * Query Selector used to find the search input
     * when the 'search' scoped slot is used.
     *
     * Must be a valid CSS selector string.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
     * @type {string}
     */
    searchInputQuerySelector: {
      type: String,
      default: "[type=search]"
    },
    /**
     * Used to modify the default keydown events map
     * for the search input. Can be used to implement
     * custom behaviour for key presses.
     */
    mapKeydown: {
      type: Function,
      /**
       * @param {object} map Existing keydown handlers map.
       * @param {VueSelect} vm Component instance.
       * @return {object}
       */
      default: (map) => map
    },
    /**
     * Append the dropdown element to the end of the body
     * and size/position it dynamically. Use it if you have
     * overflow or z-index issues.
     *
     * @type {boolean}
     */
    appendToBody: {
      type: Boolean,
      default: false
    },
    /**
     * When `appendToBody` is true, this function is responsible for
     * positioning the drop down list.
     *
     * If a function is returned from `calculatePosition`, it will
     * be called when the drop down list is removed from the DOM.
     * This allows for any garbage collection you may need to do.
     *
     * @since v3.7.0
     * @see http://vue-select.org/guide/positioning.html
     */
    calculatePosition: {
      type: Function,
      /**
       * @param {HTMLUListElement} dropdownList Dropdown list element.
       * @param {Vue} component Component instance.
       * @param {object} width Computed dropdown coordinates.
       * @param {string} width.width Computed width value.
       * @param {string} width.top Computed top position.
       * @param {string} width.left Computed left position.
       * @return {Function | void}
       */
      default(dropdownList, component, { width, top, left }) {
        dropdownList.style.top = top;
        dropdownList.style.left = left;
        dropdownList.style.width = width;
      }
    },
    /**
     * Determines whether the dropdown should be open.
     * Receives the component instance as the only argument.
     *
     * @since v3.12.0
     * @return {boolean}
     */
    dropdownShouldOpen: {
      type: Function,
      default({ noDrop, open, mutableLoading }) {
        return noDrop ? false : open && !mutableLoading;
      }
    },
    /**
     * Display a visible border around dropdown options
     * which have keyboard focus.
     */
    keyboardFocusBorder: {
      type: Boolean,
      default: false
    },
    /**
     * A unique identifier used to generate IDs in HTML.
     * Must be unique for every instance of the component.
     */
    uid: {
      type: [String, Number],
      default: () => uniqueId()
    }
  },
  emits: [
    "open",
    "close",
    "update:modelValue",
    "search",
    "search:compositionstart",
    "search:compositionend",
    "search:keydown",
    "search:blur",
    "search:focus",
    "search:input",
    "option:created",
    "option:selecting",
    "option:selected",
    "option:deselecting",
    "option:deselected"
  ],
  data() {
    return {
      search: "",
      open: false,
      isComposing: false,
      isKeyboardNavigation: false,
      pushedTags: [],
      // eslint-disable-next-line vue/no-reserved-keys
      _value: [],
      // Internal value managed by Vue Select if no `modelValue` prop is passed
      deselectButtons: []
    };
  },
  computed: {
    isReducingValues() {
      return this.$props.reduce !== this.$options.props.reduce.default;
    },
    /**
     * Determine if the component needs to
     * track the state of values internally.
     *
     * @return {boolean}
     */
    isTrackingValues() {
      return typeof this.modelValue === "undefined" || this.isReducingValues;
    },
    /**
     * The options that are currently selected.
     *
     * @return {Array}
     */
    selectedValue() {
      let value = this.modelValue;
      if (this.isTrackingValues) {
        value = this.$data._value;
      }
      if (value !== void 0 && value !== null && value !== "") {
        return [].concat(value);
      }
      return [];
    },
    /**
     * The options available to be chosen
     * from the dropdown, including any
     * tags that have been pushed.
     *
     * @return {Array}
     */
    optionList() {
      return this.options.concat(this.pushTags ? this.pushedTags : []);
    },
    /**
     * Find the search input DOM element.
     *
     * @return {HTMLInputElement}
     */
    searchEl() {
      return this.$slots.search ? this.$refs.selectedOptions.querySelector(this.searchInputQuerySelector) : this.$refs.search;
    },
    /**
     * The object to be bound to the $slots.search slot.
     *
     * @return {object}
     */
    scope() {
      const listSlot = {
        search: this.search,
        loading: this.loading,
        searching: this.searching,
        filteredOptions: this.filteredOptions
      };
      return {
        search: {
          attributes: {
            id: this.inputId,
            disabled: this.disabled,
            placeholder: this.searchPlaceholder,
            tabindex: this.tabindex,
            readonly: !this.searchable,
            role: "combobox",
            "aria-autocomplete": "list",
            "aria-label": this.ariaLabelCombobox,
            "aria-controls": `vs-${this.uid}__listbox`,
            "aria-owns": `vs-${this.uid}__listbox`,
            "aria-expanded": this.dropdownOpen.toString(),
            ref: "search",
            type: "search",
            autocomplete: this.autocomplete,
            value: this.search,
            ...this.dropdownOpen && this.filteredOptions[this.typeAheadPointer] ? {
              "aria-activedescendant": `vs-${this.uid}__option-${this.typeAheadPointer}`
            } : {}
          },
          events: {
            compositionstart: () => this.isComposing = true,
            compositionend: () => this.isComposing = false,
            keydown: this.onSearchKeyDown,
            keypress: this.onSearchKeyPress,
            blur: this.onSearchBlur,
            focus: this.onSearchFocus,
            input: (e) => this.search = e.target.value
          }
        },
        spinner: {
          loading: this.mutableLoading
        },
        noOptions: {
          search: this.search,
          loading: this.mutableLoading,
          searching: this.searching
        },
        openIndicator: {
          attributes: {
            ref: "openIndicator",
            role: "presentation",
            class: "vs__open-indicator"
          }
        },
        listHeader: listSlot,
        listFooter: listSlot,
        header: { ...listSlot, deselect: this.deselect },
        footer: { ...listSlot, deselect: this.deselect }
      };
    },
    /**
     * Returns an object containing the child components
     * that will be used throughout the component. The
     * `component` prop can be used to overwrite the defaults.
     *
     * @return {object}
     */
    childComponents() {
      return {
        ...childComponents,
        ...this.components
      };
    },
    /**
     * Holds the current state of the component.
     *
     * @return {object}
     */
    stateClasses() {
      return {
        "vs--open": this.dropdownOpen,
        "vs--single": !this.multiple,
        "vs--multiple": this.multiple,
        "vs--searching": this.searching && !this.noDrop,
        "vs--searchable": this.searchable && !this.noDrop,
        "vs--unsearchable": !this.searchable,
        "vs--loading": this.mutableLoading,
        "vs--disabled": this.disabled
      };
    },
    /**
     * Return the current state of the
     * search input
     *
     * @return {boolean} True if non empty value
     */
    searching() {
      return !!this.search;
    },
    /**
     * Return the current state of the
     * dropdown menu.
     *
     * @return {boolean} True if open
     */
    dropdownOpen() {
      return this.dropdownShouldOpen(this);
    },
    /**
     * Return the placeholder string if it's set
     * & there is no value selected.
     *
     * @return {string} Placeholder text
     */
    searchPlaceholder() {
      return this.isValueEmpty && this.placeholder ? this.placeholder : void 0;
    },
    /**
     * The currently displayed options, filtered
     * by the search elements value. If tagging
     * true, the search text will be prepended
     * if it doesn't already exist.
     *
     * @return {Array}
     */
    filteredOptions() {
      const limitOptions = (options2) => {
        if (this.limit !== null) {
          return options2.slice(0, this.limit);
        }
        return options2;
      };
      const optionList = [].concat(this.optionList);
      if (!this.filterable && !this.taggable) {
        return limitOptions(optionList);
      }
      const options = this.search.length ? this.filter(optionList, this.search, this) : optionList;
      if (this.taggable && this.search.length) {
        try {
          const createdOption = this.createOption(this.search);
          if (!this.optionExists(createdOption)) {
            options.unshift(createdOption);
          }
        } catch {
        }
      }
      return limitOptions(options);
    },
    /**
     * Check if there aren't any options selected.
     *
     * @return {boolean}
     */
    isValueEmpty() {
      return this.selectedValue.length === 0;
    },
    /**
     * Determines if the clear button should be displayed.
     *
     * @return {boolean}
     */
    showClearButton() {
      return !this.multiple && this.clearable && !this.open && !this.isValueEmpty;
    }
  },
  watch: {
    /**
     * Maybe reset the value
     * when options change.
     * Make sure selected option
     * is correct.
     *
     * @param {Array} newOptions Updated options list.
     * @param {Array} oldOptions Previous options list.
     * @return {boolean} [description]
     */
    options(newOptions, oldOptions) {
      const shouldReset = () => typeof this.resetOnOptionsChange === "function" ? this.resetOnOptionsChange(
        newOptions,
        oldOptions,
        this.selectedValue
      ) : this.resetOnOptionsChange;
      if (!this.taggable && shouldReset()) {
        this.clearSelection();
      }
      if (this.modelValue && this.isTrackingValues) {
        this.setInternalValueFromOptions(this.modelValue);
      }
    },
    /**
     * Make sure to update internal
     * value if prop changes outside
     */
    modelValue: {
      immediate: true,
      handler(val) {
        if (this.isTrackingValues) {
          this.setInternalValueFromOptions(val);
        }
      }
    },
    /**
     * Always reset the value when
     * the multiple prop changes.
     *
     * @return {void}
     */
    multiple() {
      this.clearSelection();
    },
    open(isOpen) {
      this.$emit(isOpen ? "open" : "close");
    },
    search(search) {
      if (search.length) {
        this.open = true;
      }
    }
  },
  created() {
    this.mutableLoading = this.loading;
  },
  methods: {
    /**
     * Make sure tracked value is
     * one option if possible.
     *
     * @param  {object | string} value Reduced value to resolve.
     * @return {void}
     */
    setInternalValueFromOptions(value) {
      if (Array.isArray(value)) {
        this.$data._value = value.map((val) => this.findOptionFromReducedValue(val));
      } else {
        this.$data._value = this.findOptionFromReducedValue(value);
      }
    },
    /**
     * Select or deselect a given option.
     * Allow deselect if clearable or if not the only selected option.
     *
     * @param  {object | string} option Option to select or deselect.
     * @return {void}
     */
    select(option) {
      this.$emit("option:selecting", option);
      if (!this.isOptionSelected(option)) {
        if (this.taggable && !this.optionExists(option)) {
          this.$emit("option:created", option);
          this.pushTag(option);
        }
        if (this.multiple) {
          option = this.selectedValue.concat(option);
        }
        this.updateValue(option);
        this.$emit("option:selected", option);
      } else if (this.deselectFromDropdown && (this.clearable || this.multiple && this.selectedValue.length > 1)) {
        this.deselect(option);
      }
      this.onAfterSelect(option);
    },
    /**
     * De-select a given option.
     *
     * @param  {object | string} option Option to remove.
     * @return {void}
     */
    deselect(option) {
      this.$emit("option:deselecting", option);
      this.updateValue(this.selectedValue.filter((val) => {
        return !this.optionComparator(val, option);
      }));
      this.$emit("option:deselected", option);
    },
    /**
     * De-select a given option on keyboard input.
     *
     * @param  {object | string} option Option to remove.
     * @param  {number} index Index of the deselect button.
     * @return {void}
     */
    keyboardDeselect(option, index2) {
      this.deselect(option);
      const nextDeselect = this.deselectButtons?.[index2 + 1];
      const prevDeselect = this.deselectButtons?.[index2 - 1];
      const deselectToFocus = nextDeselect ?? prevDeselect;
      if (deselectToFocus) {
        deselectToFocus.focus();
      } else {
        this.searchEl.focus();
      }
    },
    /**
     * Clears the currently selected value(s)
     *
     * @return {void}
     */
    clearSelection() {
      this.updateValue(this.multiple ? [] : null);
      this.searchEl.focus();
    },
    /**
     * Called from this.select after each selection.
     *
     * @param  {object | string} option Option that was handled.
     * @return {void}
     */
    onAfterSelect() {
      if (this.closeOnSelect) {
        this.open = !this.open;
      }
      if (this.clearSearchOnSelect) {
        this.search = "";
      }
      if (this.noDrop && this.multiple) {
        this.$nextTick(() => this.$refs.search.focus());
      }
    },
    /**
     * Accepts a selected value, updates local
     * state when required, and triggers the
     * input event.
     *
     * @fires input
     * @param {object | string} value Selected value payload.
     */
    updateValue(value) {
      if (typeof this.modelValue === "undefined") {
        this.$data._value = value;
      }
      if (value !== null) {
        if (Array.isArray(value)) {
          value = value.map((val) => this.reduce(val));
        } else {
          value = this.reduce(value);
        }
      }
      this.$emit("update:modelValue", value);
    },
    /**
     * Toggle the visibility of the dropdown menu.
     *
     * @param  {Event} event Toggle trigger event.
     * @return {void}
     */
    toggleDropdown(event) {
      const targetIsNotSearch = event.target !== this.searchEl;
      if (targetIsNotSearch) {
        event.preventDefault();
      }
      const ignoredButtons = [
        ...this.deselectButtons || [],
        ...this.$refs.clearButton ? [this.$refs.clearButton] : []
      ];
      if (this.searchEl === void 0 || ignoredButtons.filter(Boolean).some((ref2) => ref2.contains(event.target) || ref2 === event.target)) {
        event.preventDefault();
        return;
      }
      if (this.open && targetIsNotSearch) {
        this.open = false;
        this.searchEl.blur();
      } else if (!this.disabled) {
        this.open = true;
        this.searchEl.focus();
      }
    },
    /**
     * Check if the given option is currently selected.
     *
     * @param  {object | string}  option Option to evaluate.
     * @return {boolean} True when selected | False otherwise
     */
    isOptionSelected(option) {
      return this.selectedValue.some((value) => this.optionComparator(value, option));
    },
    /**
     *  Can the current option be removed via the dropdown?
     *
     * @param {object | string} option Option to evaluate.
     * @return {boolean}
     */
    isOptionDeselectable(option) {
      return this.isOptionSelected(option) && this.deselectFromDropdown;
    },
    /**
     * Check if the option at the given index should display a
     * keyboard focus border.
     *
     * @param  {number} index Option index.
     * @return {boolean}
     */
    hasKeyboardFocusBorder(index2) {
      if (this.keyboardFocusBorder && this.isKeyboardNavigation) {
        return index2 === this.typeAheadPointer;
      }
      return false;
    },
    /**
     * Determine if two option objects are matching.
     *
     * @param {object} a First option.
     * @param {object} b Second option.
     * @return {boolean}
     */
    optionComparator(a, b) {
      return this.getOptionKey(a) === this.getOptionKey(b);
    },
    /**
     * Finds an option from the options
     * where a reduced value matches
     * the passed in value.
     *
     * @param {object} value Reduced value to match.
     * @return {*}
     */
    findOptionFromReducedValue(value) {
      const predicate = (option) => JSON.stringify(this.reduce(option)) === JSON.stringify(value);
      const matches = [...this.options, ...this.pushedTags].filter(predicate);
      if (matches.length === 1) {
        return matches[0];
      }
      return matches.find((match) => this.optionComparator(match, this.$data._value)) || value;
    },
    /**
     * 'Private' function to close the search options
     *
     * @fires  {search:blur}
     * @return {void}
     */
    closeSearchOptions() {
      this.open = false;
      this.$emit("search:blur");
    },
    /**
     * Delete the value on Delete keypress when there is no
     * text in the search input, & there's tags to delete
     *
     * @return {this.value}
     */
    maybeDeleteValue() {
      if (!this.searchEl.value.length && this.selectedValue && this.selectedValue.length && this.clearable) {
        let value = null;
        if (this.multiple) {
          value = [
            ...this.selectedValue.slice(0, this.selectedValue.length - 1)
          ];
        }
        this.updateValue(value);
      }
    },
    /**
     * Determine if an option exists
     * within this.optionList array.
     *
     * @param  {Object || String} option Option to find.
     * @return {boolean}
     */
    optionExists(option) {
      return this.optionList.some((_option) => this.optionComparator(_option, option));
    },
    /**
     * Determine the `aria-selected` value
     * of an option
     *
     * @param  {object | string} option Option to evaluate.
     * @return {null|string}
     */
    optionAriaSelected(option) {
      if (!this.selectable(option)) {
        return null;
      }
      return String(this.isOptionSelected(option));
    },
    /**
     * Ensures that options are always
     * passed as objects to scoped slots.
     *
     * @param {object | string} option Option to normalize.
     * @return {object}
     */
    normalizeOptionForSlot(option) {
      return typeof option === "object" ? option : { [this.label]: option };
    },
    /**
     * If push-tags is true, push the
     * given option to `this.pushedTags`.
     *
     * @param  {Object || String} option Option to append.
     * @return {void}
     */
    pushTag(option) {
      this.pushedTags.push(option);
    },
    /**
     * If there is any text in the search input, remove it.
     * Otherwise, blur the search input to close the dropdown.
     *
     * @return {void}
     */
    onEscape() {
      if (!this.search.length) {
        this.open = false;
      } else {
        this.search = "";
      }
    },
    /**
     * Close the dropdown on blur.
     *
     * @fires  {search:blur}
     * @return {void}
     */
    onSearchBlur() {
      if (this.mousedown && !this.searching) {
        this.mousedown = false;
      } else {
        const { clearSearchOnSelect, multiple } = this;
        if (this.clearSearchOnBlur({ clearSearchOnSelect, multiple })) {
          this.search = "";
        }
        this.closeSearchOptions();
        return;
      }
      if (this.search.length === 0 && this.options.length === 0) {
        this.closeSearchOptions();
      }
    },
    /**
     * Do NOT open the dropdown here: auto-opening on focus violates
     * WCAG 3.2.1 (On Focus). Keyboard users open via
     * Space/Enter/ArrowDown/ArrowUp; mouse users click.
     *
     * @fires  {search:focus}
     * @return {void}
     */
    onSearchFocus() {
      this.$emit("search:focus");
    },
    /**
     * Event-Handler to help workaround IE11 (probably fixes 10 as well)
     * firing a `blur` event when clicking
     * the dropdown's scrollbar, causing it
     * to collapse abruptly.
     *
     * @see https://github.com/sagalbot/vue-select/issues/106
     * @return {void}
     */
    onMousedown() {
      this.mousedown = true;
    },
    /**
     * Event-Handler to help workaround IE11 (probably fixes 10 as well)
     *
     * @see https://github.com/sagalbot/vue-select/issues/106
     * @return {void}
     */
    onMouseUp() {
      this.mousedown = false;
    },
    /**
     * Event-Handler for option mousemove
     *
     * @param {object | string} option Hovered option.
     * @param {number} index Hovered option index.
     * @return {void}
     */
    onMouseMove(option, index2) {
      this.isKeyboardNavigation = false;
      if (!this.selectable(option)) {
        return;
      }
      this.typeAheadPointer = index2;
    },
    /**
     * Search <input> KeyBoardEvent handler.
     *
     * @param {KeyboardEvent} e Keyboard event.
     * @return {Function}
     */
    onSearchKeyDown(e) {
      const preventAndSelect = (e2) => {
        e2.preventDefault();
        if (!this.open) {
          this.open = true;
          return;
        }
        return !this.isComposing && this.typeAheadSelect();
      };
      const defaults = {
        //  backspace
        8: () => this.maybeDeleteValue(),
        //  tab
        9: () => this.onTab(),
        //  esc
        27: () => this.onEscape(),
        //  up.prevent
        38: (e2) => {
          e2.preventDefault();
          this.isKeyboardNavigation = true;
          if (!this.open) {
            this.open = true;
            return;
          }
          return this.typeAheadUp();
        },
        //  down.prevent
        40: (e2) => {
          e2.preventDefault();
          this.isKeyboardNavigation = true;
          if (!this.open) {
            this.open = true;
            return;
          }
          return this.typeAheadDown();
        }
      };
      this.selectOnKeyCodes.forEach((keyCode) => defaults[keyCode] = preventAndSelect);
      const handlers = this.mapKeydown(defaults, this);
      if (typeof handlers[e.keyCode] === "function") {
        return handlers[e.keyCode](e);
      }
    },
    /**
     * TODO: Probably want to add a mapKeyPress method just like we have for keydown.
     *
     * @param {KeyboardEvent} e Keyboard event.
     */
    onSearchKeyPress(e) {
      if (!this.open && e.keyCode === 32) {
        e.preventDefault();
        this.open = true;
      }
    }
  }
};
const _hoisted_1$c = ["id", "dir"];
const _hoisted_2$9 = {
  ref: "toggle",
  class: "vs__dropdown-toggle"
};
const _hoisted_3$7 = ["disabled", "title", "aria-label", "onMousedown", "onKeydown"];
const _hoisted_4$6 = {
  ref: "actions",
  class: "vs__actions"
};
const _hoisted_5$2 = ["disabled", "title", "aria-label"];
const _hoisted_6$1 = { class: "vs__spinner" };
const _hoisted_7$1 = ["id", "aria-label", "aria-multiselectable"];
const _hoisted_8$1 = ["id", "aria-selected", "onMousemove", "onClick"];
const _hoisted_9$1 = {
  key: 0,
  class: "vs__no-options"
};
const _hoisted_10 = ["id", "aria-label"];
function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_append_to_body = resolveDirective("append-to-body");
  return openBlock(), createElementBlock("div", {
    id: `v-select-${$props.uid}`,
    dir: $props.dir,
    class: normalizeClass(["v-select", $options.stateClasses])
  }, [
    renderSlot(_ctx.$slots, "header", normalizeProps(guardReactiveProps($options.scope.header))),
    createBaseVNode("div", _hoisted_2$9, [
      createBaseVNode("div", {
        ref: "selectedOptions",
        class: "vs__selected-options",
        onMousedown: _cache[0] || (_cache[0] = (...args) => $options.toggleDropdown && $options.toggleDropdown(...args))
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList($options.selectedValue, (option, index2) => {
          return renderSlot(_ctx.$slots, "selected-option-container", {
            option: $options.normalizeOptionForSlot(option),
            deselect: $options.deselect,
            multiple: $props.multiple,
            disabled: $props.disabled
          }, () => [
            (openBlock(), createElementBlock("span", {
              key: $props.getOptionKey(option),
              class: "vs__selected"
            }, [
              renderSlot(_ctx.$slots, "selected-option", mergeProps({ ref_for: true }, $options.normalizeOptionForSlot(option)), () => [
                createTextVNode(toDisplayString($props.getOptionLabel(option)), 1)
              ]),
              $props.multiple ? (openBlock(), createElementBlock("button", {
                key: 0,
                ref_for: true,
                ref: (el) => $data.deselectButtons[index2] = el,
                disabled: $props.disabled,
                type: "button",
                class: "vs__deselect",
                title: $props.ariaLabelDeselectOption($props.getOptionLabel(option)),
                "aria-label": $props.ariaLabelDeselectOption($props.getOptionLabel(option)),
                onMousedown: withModifiers(($event) => $options.deselect(option), ["stop"]),
                onKeydown: withKeys(($event) => $options.keyboardDeselect(option, index2), ["enter"])
              }, [
                (openBlock(), createBlock(resolveDynamicComponent($options.childComponents.Deselect)))
              ], 40, _hoisted_3$7)) : createCommentVNode("", true)
            ]))
          ]);
        }), 256)),
        renderSlot(_ctx.$slots, "search", normalizeProps(guardReactiveProps($options.scope.search)), () => [
          createBaseVNode("input", mergeProps({ class: "vs__search" }, $options.scope.search.attributes, toHandlers($options.scope.search.events, true)), null, 16)
        ])
      ], 544),
      createBaseVNode("div", _hoisted_4$6, [
        withDirectives(createBaseVNode("button", {
          ref: "clearButton",
          disabled: $props.disabled,
          type: "button",
          class: "vs__clear",
          title: $props.ariaLabelClearSelected,
          "aria-label": $props.ariaLabelClearSelected,
          onClick: _cache[1] || (_cache[1] = (...args) => $options.clearSelection && $options.clearSelection(...args))
        }, [
          (openBlock(), createBlock(resolveDynamicComponent($options.childComponents.Deselect)))
        ], 8, _hoisted_5$2), [
          [vShow, $options.showClearButton]
        ]),
        !$props.noDrop ? (openBlock(), createElementBlock("button", {
          key: 0,
          ref: "openIndicatorButton",
          class: "vs__open-indicator-button",
          type: "button",
          tabindex: "-1",
          "aria-hidden": "true",
          onMousedown: _cache[2] || (_cache[2] = (...args) => $options.toggleDropdown && $options.toggleDropdown(...args))
        }, [
          renderSlot(_ctx.$slots, "open-indicator", normalizeProps(guardReactiveProps($options.scope.openIndicator)), () => [
            (openBlock(), createBlock(resolveDynamicComponent($options.childComponents.OpenIndicator), normalizeProps(guardReactiveProps($options.scope.openIndicator.attributes)), null, 16))
          ])
        ], 544)) : createCommentVNode("", true),
        renderSlot(_ctx.$slots, "spinner", normalizeProps(guardReactiveProps($options.scope.spinner)), () => [
          withDirectives(createBaseVNode("div", _hoisted_6$1, " Loading... ", 512), [
            [vShow, _ctx.mutableLoading]
          ])
        ])
      ], 512)
    ], 512),
    createVNode(Transition, { name: $props.transition }, {
      default: withCtx(() => [
        $options.dropdownOpen ? withDirectives((openBlock(), createElementBlock("ul", {
          id: `vs-${$props.uid}__listbox`,
          ref: "dropdownMenu",
          key: `vs-${$props.uid}__listbox`,
          class: "vs__dropdown-menu",
          role: "listbox",
          "aria-label": $props.ariaLabelListbox,
          "aria-multiselectable": $props.multiple ? "true" : null,
          tabindex: "-1",
          onMousedown: _cache[3] || (_cache[3] = withModifiers((...args) => $options.onMousedown && $options.onMousedown(...args), ["prevent"])),
          onMouseup: _cache[4] || (_cache[4] = (...args) => $options.onMouseUp && $options.onMouseUp(...args))
        }, [
          renderSlot(_ctx.$slots, "list-header", normalizeProps(guardReactiveProps($options.scope.listHeader))),
          (openBlock(true), createElementBlock(Fragment, null, renderList($options.filteredOptions, (option, index2) => {
            return openBlock(), createElementBlock("li", {
              id: `vs-${$props.uid}__option-${index2}`,
              key: $props.getOptionKey(option),
              role: "option",
              class: normalizeClass(["vs__dropdown-option", {
                "vs__dropdown-option--deselect": $options.isOptionDeselectable(option) && index2 === _ctx.typeAheadPointer,
                "vs__dropdown-option--selected": $options.isOptionSelected(option),
                "vs__dropdown-option--highlight": index2 === _ctx.typeAheadPointer,
                "vs__dropdown-option--kb-focus": $options.hasKeyboardFocusBorder(index2),
                "vs__dropdown-option--disabled": !$props.selectable(option)
              }]),
              "aria-selected": $options.optionAriaSelected(option),
              onMousemove: ($event) => $options.onMouseMove(option, index2),
              onClick: withModifiers(($event) => $props.selectable(option) ? $options.select(option) : null, ["prevent", "stop"])
            }, [
              renderSlot(_ctx.$slots, "option", mergeProps({ ref_for: true }, $options.normalizeOptionForSlot(option)), () => [
                createTextVNode(toDisplayString($props.getOptionLabel(option)), 1)
              ])
            ], 42, _hoisted_8$1);
          }), 128)),
          $options.filteredOptions.length === 0 ? (openBlock(), createElementBlock("li", _hoisted_9$1, [
            renderSlot(_ctx.$slots, "no-options", normalizeProps(guardReactiveProps($options.scope.noOptions)), () => [
              _cache[5] || (_cache[5] = createTextVNode(" Sorry, no matching options. ", -1))
            ])
          ])) : createCommentVNode("", true),
          renderSlot(_ctx.$slots, "list-footer", normalizeProps(guardReactiveProps($options.scope.listFooter)))
        ], 40, _hoisted_7$1)), [
          [_directive_append_to_body]
        ]) : (openBlock(), createElementBlock("ul", {
          key: 1,
          id: `vs-${$props.uid}__listbox`,
          role: "listbox",
          "aria-label": $props.ariaLabelListbox,
          style: { "display": "none", "visibility": "hidden" }
        }, null, 8, _hoisted_10))
      ]),
      _: 3
    }, 8, ["name"]),
    renderSlot(_ctx.$slots, "footer", normalizeProps(guardReactiveProps($options.scope.footer)))
  ], 10, _hoisted_1$c);
}
const Select = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$b]]);
/*!
 * SPDX-FileCopyrightText: 2020 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
function findRanges(text2, search) {
  const ranges = [];
  let currentIndex = 0;
  let index = text2.toLowerCase().indexOf(search.toLowerCase(), currentIndex);
  let i = 0;
  while (index > -1 && i++ < text2.length) {
    currentIndex = index + search.length;
    ranges.push({ start: index, end: currentIndex });
    index = text2.toLowerCase().indexOf(search.toLowerCase(), currentIndex);
  }
  return ranges;
}
const _sfc_main$c = defineComponent({
  name: "NcHighlight",
  props: {
    /**
     * The string to display
     */
    text: {
      type: String,
      default: ""
    },
    /**
     * The string to match and highlight
     */
    search: {
      type: String,
      default: ""
    },
    /**
     * The ranges to highlight, takes precedence over the search prop.
     */
    highlight: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    /**
     * The indice ranges which should be highlighted.
     * If an array with ranges is provided, we use it. Otherwise
     * we calculate it based on the provided substring to highlight.
     *
     * @return The array of ranges to highlight
     */
    ranges() {
      let ranges = [];
      if (!this.search && this.highlight.length === 0) {
        return ranges;
      }
      if (this.highlight.length > 0) {
        ranges = this.highlight;
      } else {
        ranges = findRanges(this.text, this.search);
      }
      ranges.forEach((range, i) => {
        if (range.end < range.start) {
          ranges[i] = {
            start: range.end,
            end: range.start
          };
        }
      });
      ranges = ranges.reduce((validRanges, range) => {
        if (range.start < this.text.length && range.end > 0) {
          validRanges.push({
            start: range.start < 0 ? 0 : range.start,
            end: range.end > this.text.length ? this.text.length : range.end
          });
        }
        return validRanges;
      }, []);
      ranges.sort((a, b) => {
        return a.start - b.start;
      });
      ranges = ranges.reduce((mergedRanges, range) => {
        if (!mergedRanges.length) {
          mergedRanges.push(range);
        } else {
          const idx = mergedRanges.length - 1;
          if (mergedRanges[idx].end >= range.start) {
            mergedRanges[idx] = {
              start: mergedRanges[idx].start,
              end: Math.max(mergedRanges[idx].end, range.end)
            };
          } else {
            mergedRanges.push(range);
          }
        }
        return mergedRanges;
      }, []);
      return ranges;
    },
    /**
     * Calculate the different chunks to show based on the ranges to highlight.
     */
    chunks() {
      if (this.ranges.length === 0) {
        return [{
          start: 0,
          end: this.text.length,
          highlight: false,
          text: this.text
        }];
      }
      const chunks = [];
      let currentIndex = 0;
      let currentRange = 0;
      while (currentIndex < this.text.length) {
        const range = this.ranges[currentRange];
        if (range.start === currentIndex) {
          chunks.push({
            ...range,
            highlight: true,
            text: this.text.slice(range.start, range.end)
          });
          currentRange++;
          currentIndex = range.end;
          if (currentRange >= this.ranges.length && currentIndex < this.text.length) {
            chunks.push({
              start: currentIndex,
              end: this.text.length,
              highlight: false,
              text: this.text.slice(currentIndex)
            });
            currentIndex = this.text.length;
          }
          continue;
        }
        chunks.push({
          start: currentIndex,
          end: range.start,
          highlight: false,
          text: this.text.slice(currentIndex, range.start)
        });
        currentIndex = range.start;
      }
      return chunks;
    }
  },
  /**
   * The render function to display the component
   */
  render() {
    if (!this.ranges.length) {
      return h("span", {}, this.text);
    }
    return h("span", {}, this.chunks.map((chunk) => {
      return chunk.highlight ? h("strong", {}, chunk.text) : chunk.text;
    }));
  }
});
const _sfc_main$b = {
  name: "NcEllipsisedOption",
  components: {
    NcHighlight: _sfc_main$c
  },
  props: {
    /**
     * The text to be display in one line. If it is longer than 10 characters, it is be truncated with ellipsis in the end but keeping up to 10 last characters to fit the parent container.
     */
    name: {
      type: String,
      default: ""
    },
    /**
     * The search value to highlight in the text
     */
    search: {
      type: String,
      default: ""
    }
  },
  computed: {
    needsTruncate() {
      return this.name && this.name.length >= 10;
    },
    /**
     * Index at which to split the name if it is longer than 10 characters.
     *
     * @return {number} The position at which to split
     */
    split() {
      return this.name.length - Math.min(Math.floor(this.name.length / 2), 10);
    },
    part1() {
      if (this.needsTruncate) {
        return this.name.slice(0, this.split);
      }
      return this.name;
    },
    part2() {
      if (this.needsTruncate) {
        return this.name.slice(this.split);
      }
      return "";
    },
    /**
     * The ranges to highlight. Since we split the string for ellipsising,
     * the Highlight component cannot figure this out itself and needs the ranges provided.
     *
     * @return {Array} The array with the ranges to highlight
     */
    highlight1() {
      if (!this.search) {
        return [];
      }
      return findRanges(this.name, this.search);
    },
    /**
     * We shift the ranges for the second part by the position of the split.
     * Ranges out of the string length are discarded by the Highlight component,
     * so we don't need to take care of this here.
     *
     * @return {Array} The array with the ranges to highlight
     */
    highlight2() {
      return this.highlight1.map((range) => {
        return {
          start: range.start - this.split,
          end: range.end - this.split
        };
      });
    }
  }
};
const _hoisted_1$b = ["title"];
function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_NcHighlight = resolveComponent("NcHighlight");
  return openBlock(), createElementBlock("span", {
    dir: "auto",
    class: "name-parts",
    title: $props.name
  }, [
    createVNode(_component_NcHighlight, {
      class: "name-parts__first",
      text: $options.part1,
      search: $props.search,
      highlight: $options.highlight1
    }, null, 8, ["text", "search", "highlight"]),
    $options.part2 ? (openBlock(), createBlock(_component_NcHighlight, {
      key: 0,
      class: "name-parts__last",
      text: $options.part2,
      search: $props.search,
      highlight: $options.highlight2
    }, null, 8, ["text", "search", "highlight"])) : createCommentVNode("", true)
  ], 8, _hoisted_1$b);
}
const NcEllipsisedOption = /* @__PURE__ */ _export_sfc$1(_sfc_main$b, [["render", _sfc_render$a], ["__scopeId", "data-v-a612f185"]]);
register(t17);
const _sfc_main$a = {
  name: "NcSelect",
  components: {
    ChevronDown,
    NcEllipsisedOption,
    NcLoadingIcon,
    VueSelect: Select
  },
  props: {
    // Add VueSelect props to $props
    ...Select.props,
    ...Select.mixins.reduce((allProps, mixin) => ({ ...allProps, ...mixin.props }), {}),
    /**
     * `aria-label` for the clear input button
     */
    ariaLabelClearSelected: {
      type: String,
      default: t("Clear selected")
    },
    /**
     * `aria-label` for the search input
     *
     * A descriptive `inputLabel` is preferred as this is not visible.
     */
    ariaLabelCombobox: {
      type: String,
      default: null
    },
    /**
     * `aria-label` for the listbox element
     */
    ariaLabelListbox: {
      type: String,
      default: t("Options")
    },
    /**
     * Allows to customize the `aria-label` for the deselect-option button
     * The default is "Deselect " + optionLabel
     *
     * @type {(optionLabel: string) => string}
     */
    ariaLabelDeselectOption: {
      type: Function,
      default: (optionLabel) => t("Deselect {option}", { option: optionLabel })
    },
    /**
     * Append the dropdown element to the end of the body
     * and size/position it dynamically.
     *
     * @see https://vue-select.org/api/props.html#appendtobody
     */
    appendToBody: {
      type: Boolean,
      default: true
    },
    /**
     * When `appendToBody` is true, this function is responsible for
     * positioning the drop down list.
     *
     * If a function is returned from `calculatePosition`, it will
     * be called when the drop down list is removed from the DOM.
     * This allows for any garbage collection you may need to do.
     *
     * @see https://vue-select.org/api/props.html#calculateposition
     */
    calculatePosition: {
      type: Function,
      default: null
    },
    /**
     * Keep the dropdown open after selecting an option.
     *
     * @default false
     * @since 8.25.0
     */
    keepOpen: {
      type: Boolean,
      default: false
    },
    /**
     * Replace default vue-select components
     *
     * @see https://vue-select.org/api/props.html#components
     */
    components: {
      type: Object,
      default: () => ({
        Deselect: {
          render: () => h(IconClose, {
            size: 20,
            fillColor: "var(--vs-controls-color)",
            style: [
              { cursor: "pointer" }
            ]
          })
        }
      })
    },
    /**
     * Sets the maximum number of options to display in the dropdown list
     */
    limit: {
      type: Number,
      default: null
    },
    /**
     * Disable the component
     *
     * @see https://vue-select.org/api/props.html#disabled
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Determines whether the dropdown should be open.
     * Receives the component instance as the only argument.
     *
     * @see https://vue-select.org/api/props.html#dropdownshouldopen
     */
    dropdownShouldOpen: {
      type: Function,
      default: ({ noDrop, open }) => {
        return noDrop ? false : open;
      }
    },
    /**
     * Callback to determine if the provided option should
     * match the current search text. Used to determine
     * if the option should be displayed.
     *
     * Defaults to the internal vue-select function documented at the link
     * below
     *
     * @see https://vue-select.org/api/props.html#filterby
     */
    filterBy: {
      type: Function,
      default: null
    },
    /**
     * Class for the `input`
     *
     * Necessary for use in NcActionInput
     */
    inputClass: {
      type: [String, Object],
      default: null
    },
    /**
     * Input element id
     */
    inputId: {
      type: String,
      default: () => createElementId()
    },
    /**
     * Visible label for the input element
     */
    inputLabel: {
      type: String,
      default: null
    },
    /**
     * Pass true if you are using an external label
     */
    labelOutside: {
      type: Boolean,
      default: false
    },
    /**
     * Display a visible border around dropdown options
     * which have keyboard focus
     */
    keyboardFocusBorder: {
      type: Boolean,
      default: true
    },
    /**
     * Key of the displayed label for object options
     *
     * Defaults to the internal vue-select string documented at the link
     * below
     *
     * @see https://vue-select.org/api/props.html#label
     */
    label: {
      type: String,
      default: null
    },
    /**
     * Show the loading icon
     *
     * @see https://vue-select.org/api/props.html#loading
     */
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * Allow selection of multiple options
     *
     * @see https://vue-select.org/api/props.html#multiple
     */
    multiple: {
      type: Boolean,
      default: false
    },
    /**
     * Disable automatic wrapping when selected options overflow the width
     */
    noWrap: {
      type: Boolean,
      default: false
    },
    /**
     * Array of options
     *
     * @type {Array<string | number | Record<string | number, any>>}
     *
     * @see https://vue-select.org/api/props.html#options
     */
    options: {
      type: Array,
      default: () => []
    },
    /**
     * Placeholder text
     *
     * @see https://vue-select.org/api/props.html#placeholder
     */
    placeholder: {
      type: String,
      default: ""
    },
    /**
     * Customized component's response to keydown events while the search input has focus
     *
     * @see https://vue-select.org/guide/keydown.html#mapkeydown
     */
    mapKeydown: {
      type: Function,
      /**
       * Patched Vue-Select keydown events handlers map to stop Escape propagation in open select
       *
       * @param {Record<number, Function>} map - Mapped keyCode to handlers { <keyCode>:<callback> }
       * @param {import('@nextcloud/vue-select').VueSelect} vm - VueSelect instance
       * @return {Record<number, Function>} patched keydown event handlers
       */
      default(map, vm) {
        return {
          ...map,
          /**
           * Patched Escape handler to stop propagation from open select
           *
           * @param {KeyboardEvent} event - default keydown event handler
           */
          27: (event) => {
            if (vm.open) {
              event.stopPropagation();
            }
            map[27](event);
          }
        };
      }
    },
    /**
     * A unique identifier used to generate IDs and DOM attributes. Must be unique for every instance of the component.
     *
     * @see https://vue-select.org/api/props.html#uid
     */
    uid: {
      type: String,
      default: () => createElementId()
    },
    /**
     * When `appendToBody` is true, this sets the placement of the dropdown
     *
     * @type {'bottom' | 'top'}
     */
    placement: {
      type: String,
      default: "bottom"
    },
    /**
     * If false, the focused dropdown option will not be reset when filtered
     * options change
     */
    resetFocusOnOptionsChange: {
      type: Boolean,
      default: true
    },
    /**
     * Currently selected value
     *
     * The `v-model` directive may be used for two-way data binding
     *
     * @type {string | number | Record<string | number, any> | Array<any>}
     *
     * @see https://vue-select.org/api/props.html#value
     */
    modelValue: {
      type: [String, Number, Object, Array],
      default: null
    },
    /**
     * Enable if a value is required for native form validation
     */
    required: {
      type: Boolean,
      default: false
    },
    /**
     * Any available prop
     *
     * @see https://vue-select.org/api/props.html
     */
    // Not an actual prop but needed to show in vue-styleguidist docs
    // eslint-disable-next-line
    " ": {}
  },
  emits: [
    /**
     * All events from https://vue-select.org/api/events.html
     */
    // Not an actual event but needed to show in vue-styleguidist docs
    " ",
    "update:modelValue"
  ],
  setup() {
    const clickableArea = Number.parseInt(window.getComputedStyle(document.body).getPropertyValue("--default-clickable-area"));
    const gridBaseLine = Number.parseInt(window.getComputedStyle(document.body).getPropertyValue("--default-grid-baseline"));
    const avatarSize = clickableArea - 2 * gridBaseLine;
    return {
      avatarSize,
      isLegacy
    };
  },
  data() {
    return {
      search: ""
    };
  },
  computed: {
    inputRequired() {
      if (!this.required) {
        return null;
      }
      return this.modelValue === null || Array.isArray(this.modelValue) && this.modelValue.length === 0;
    },
    localCalculatePosition() {
      if (this.calculatePosition !== null) {
        return this.calculatePosition;
      }
      return (dropdownMenu, component, { width }) => {
        dropdownMenu.style.width = width;
        const addClass = {
          name: "addClass",
          fn() {
            dropdownMenu.classList.add("vs__dropdown-menu--floating");
            return {};
          }
        };
        const togglePlacementClass = {
          name: "togglePlacementClass",
          fn({ placement }) {
            component.$el.classList.toggle(
              "select--drop-up",
              placement === "top"
            );
            dropdownMenu.classList.toggle(
              "vs__dropdown-menu--floating-placement-top",
              placement === "top"
            );
            return {};
          }
        };
        const updatePosition = () => {
          computePosition(component.$refs.toggle, dropdownMenu, {
            placement: this.placement,
            middleware: [
              offset(-1),
              addClass,
              togglePlacementClass,
              // Match popperjs default collision prevention behavior by appending the following middleware in order
              flip(),
              shift({ limiter: limitShift() })
            ]
          }).then(({ x, y }) => {
            Object.assign(dropdownMenu.style, {
              left: `${x}px`,
              top: `${y}px`,
              width: `${component.$refs.toggle.getBoundingClientRect().width}px`
            });
          });
        };
        const cleanup = autoUpdate(
          component.$refs.toggle,
          dropdownMenu,
          updatePosition
        );
        return cleanup;
      };
    },
    localFilterBy() {
      return this.filterBy ?? Select.props.filterBy.default;
    },
    localLabel() {
      return this.label ?? Select.props.label.default;
    },
    propsToForward() {
      const vueSelectKeys = [
        ...Object.keys(Select.props),
        ...Select.mixins.flatMap((mixin) => Object.keys(mixin.props ?? {}))
      ];
      const initialPropsToForward = Object.fromEntries(Object.entries(this.$props).filter(([key, _value]) => vueSelectKeys.includes(key)));
      const propsToForward = {
        ...initialPropsToForward,
        // Custom overrides of vue-select props
        calculatePosition: this.localCalculatePosition,
        closeOnSelect: !this.keepOpen,
        filterBy: this.localFilterBy,
        label: this.localLabel
      };
      return propsToForward;
    }
  },
  mounted() {
    if (!this.labelOutside && !this.inputLabel && !this.ariaLabelCombobox) {
      warn("[NcSelect] An `inputLabel` or `ariaLabelCombobox` should be set. If an external label is used, `labelOutside` should be set to `true`.");
    }
    if (this.inputLabel && this.ariaLabelCombobox) {
      warn("[NcSelect] Only one of `inputLabel` or `ariaLabelCombobox` should to be set.");
    }
  },
  methods: {
    t
  }
};
const _hoisted_1$a = ["for"];
const _hoisted_2$8 = ["required"];
function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ChevronDown = resolveComponent("ChevronDown");
  const _component_NcEllipsisedOption = resolveComponent("NcEllipsisedOption");
  const _component_NcLoadingIcon = resolveComponent("NcLoadingIcon");
  const _component_VueSelect = resolveComponent("VueSelect");
  return openBlock(), createBlock(_component_VueSelect, mergeProps({
    class: ["select", {
      "select--legacy": $setup.isLegacy,
      "select--no-wrap": $props.noWrap
    }]
  }, $options.propsToForward, {
    onSearch: _cache[0] || (_cache[0] = ($event) => $data.search = $event),
    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.$emit("update:modelValue", $event))
  }), createSlots({
    search: withCtx(({ attributes, events }) => [
      createBaseVNode("input", mergeProps({
        class: ["vs__search", [$props.inputClass]]
      }, attributes, {
        required: $options.inputRequired,
        dir: "auto"
      }, toHandlers(events, true)), null, 16, _hoisted_2$8)
    ]),
    "open-indicator": withCtx(({ attributes }) => [
      createVNode(_component_ChevronDown, mergeProps(attributes, {
        fillColor: "var(--vs-controls-color)",
        style: {
          cursor: !$props.disabled ? "pointer" : null
        },
        size: 26
      }), null, 16, ["style"])
    ]),
    option: withCtx((option) => [
      renderSlot(_ctx.$slots, "option", normalizeProps(guardReactiveProps(option)), () => [
        createVNode(_component_NcEllipsisedOption, {
          name: String(option[$options.localLabel]),
          search: $data.search
        }, null, 8, ["name", "search"])
      ])
    ]),
    "selected-option": withCtx((selectedOption) => [
      renderSlot(_ctx.$slots, "selected-option", normalizeProps(guardReactiveProps(selectedOption)), () => [
        createVNode(_component_NcEllipsisedOption, {
          name: String(selectedOption[$options.localLabel]),
          search: $data.search
        }, null, 8, ["name", "search"])
      ])
    ]),
    spinner: withCtx((spinner) => [
      spinner.loading ? (openBlock(), createBlock(_component_NcLoadingIcon, { key: 0 })) : createCommentVNode("", true)
    ]),
    "no-options": withCtx(() => [
      createTextVNode(toDisplayString($options.t("No results")), 1)
    ]),
    _: 2
  }, [
    !$props.labelOutside && $props.inputLabel ? {
      name: "header",
      fn: withCtx(() => [
        createBaseVNode("label", {
          for: $props.inputId,
          class: "select__label"
        }, toDisplayString($props.inputLabel), 9, _hoisted_1$a)
      ]),
      key: "0"
    } : void 0,
    renderList(_ctx.$slots, (_, name) => {
      return {
        name,
        fn: withCtx((data) => [
          renderSlot(_ctx.$slots, name, normalizeProps(guardReactiveProps(data)))
        ])
      };
    })
  ]), 1040, ["class"]);
}
const NcSelect = /* @__PURE__ */ _export_sfc$1(_sfc_main$a, [["render", _sfc_render$9]]);
register(t22);
window._vue_richtext_widgets ??= {};
window._registerWidget ??= (id, callback, onDestroy, props) => {
  registerWidget(id, callback, onDestroy, props);
};
function registerWidget(id, callback, onDestroy = () => {
}, props) {
  const propsWithDefaults = {
    hasInteractiveView: true,
    fullWidth: false,
    ...props
  };
  if (window._vue_richtext_widgets[id]) {
    logger.error(`[ReferencePicker]: Widget for id ${id} already registered`);
    return;
  }
  window._vue_richtext_widgets[id] = {
    id,
    callback,
    onDestroy,
    ...propsWithDefaults
  };
}
function renderWidget(el, options) {
  const { richObjectType, richObject, accessible, interactive } = options;
  if (richObjectType === "open-graph") {
    return;
  }
  if (!window._vue_richtext_widgets[richObjectType]) {
    logger.error("Widget for rich object type " + richObjectType + " not registered");
    return;
  }
  window._vue_richtext_widgets[richObjectType].callback(el, { richObjectType, richObject, accessible, interactive });
}
function destroyWidget(richObjectType, el) {
  if (richObjectType === "open-graph") {
    return;
  }
  if (!window._vue_richtext_widgets[richObjectType]) {
    return;
  }
  window._vue_richtext_widgets[richObjectType].onDestroy(el);
}
function isWidgetRegistered(id) {
  return !!window._vue_richtext_widgets[id];
}
function hasInteractiveView(id) {
  return !!window._vue_richtext_widgets[id]?.hasInteractiveView;
}
function hasFullWidth(id) {
  return !!window._vue_richtext_widgets[id]?.fullWidth;
}
window._vue_richtext_custom_picker_elements ??= {};
window._registerCustomPickerElement ??= registerCustomPickerElement;
function isCustomPickerElementRegistered(id) {
  return !!window._vue_richtext_custom_picker_elements[id];
}
function getCustomPickerElementSize(id) {
  const size = window._vue_richtext_custom_picker_elements[id]?.size;
  if (size && ["small", "normal", "large", "full"].includes(size)) {
    return size;
  }
  return null;
}
function registerCustomPickerElement(id, callback, onDestroy = () => {
}, size = "large") {
  if (window._vue_richtext_custom_picker_elements[id]) {
    logger.error(`Custom reference picker element for id ${id} already registered`);
    return;
  }
  window._vue_richtext_custom_picker_elements[id] = {
    id,
    callback,
    onDestroy,
    size
  };
}
function renderCustomPickerElement(el, options) {
  const { providerId, accessible } = options;
  if (!window._vue_richtext_custom_picker_elements[providerId]) {
    logger.error(`Custom reference picker element for reference provider ID ${providerId} not registered`);
    return;
  }
  return window._vue_richtext_custom_picker_elements[providerId].callback(el, { providerId, accessible });
}
function destroyCustomPickerElement(providerId, el, renderResult) {
  if (!window._vue_richtext_custom_picker_elements[providerId]) {
    return;
  }
  window._vue_richtext_custom_picker_elements[providerId].onDestroy(el, renderResult);
}
const _sfc_main$9 = {
  name: "ArrowLeftIcon",
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
const _hoisted_1$9 = ["aria-hidden", "aria-label"];
const _hoisted_2$7 = ["fill", "width", "height"];
const _hoisted_3$6 = { d: "M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" };
const _hoisted_4$5 = { key: 0 };
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("span", mergeProps(_ctx.$attrs, {
    "aria-hidden": $props.title ? null : "true",
    "aria-label": $props.title,
    class: "material-design-icon arrow-left-icon",
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
      createBaseVNode("path", _hoisted_3$6, [
        $props.title ? (openBlock(), createElementBlock("title", _hoisted_4$5, toDisplayString($props.title), 1)) : createCommentVNode("", true)
      ])
    ], 8, _hoisted_2$7))
  ], 16, _hoisted_1$9);
}
const ArrowLeftIcon = /* @__PURE__ */ _export_sfc$1(_sfc_main$9, [["render", _sfc_render$8]]);
const _sfc_main$8 = {
  name: "NcCustomPickerElement",
  props: {
    /**
     * The reference provider
     */
    provider: {
      type: Object,
      required: true
    }
  },
  emits: [
    "cancel",
    "submit"
  ],
  data() {
    return {
      isRegistered: isCustomPickerElementRegistered(this.provider.id),
      renderResult: null
    };
  },
  mounted() {
    if (this.isRegistered) {
      this.renderElement();
    }
  },
  beforeUnmount() {
    if (this.isRegistered) {
      destroyCustomPickerElement(this.provider.id, this.$el, this.renderResult);
    }
  },
  methods: {
    renderElement() {
      if (this.$refs.domElement) {
        this.$refs.domElement.innerHTML = "";
      }
      const renderFunctionResult = renderCustomPickerElement(this.$refs.domElement, { providerId: this.provider.id, accessible: false });
      Promise.resolve(renderFunctionResult).then((result) => {
        this.renderResult = result;
        if (this.renderResult.object?._isVue && this.renderResult.object?.$on) {
          this.renderResult.object.$on("submit", this.onSubmit);
          this.renderResult.object.$on("cancel", this.onCancel);
        }
        this.renderResult.element.addEventListener("submit", (e) => {
          this.onSubmit(e.detail);
        });
        this.renderResult.element.addEventListener("cancel", this.onCancel);
      });
    },
    onSubmit(value) {
      this.$emit("submit", value);
    },
    onCancel() {
      this.$emit("cancel");
    }
  }
};
const _hoisted_1$8 = { ref: "domElement" };
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$8, null, 512);
}
const NcCustomPickerElement = /* @__PURE__ */ _export_sfc$1(_sfc_main$8, [["render", _sfc_render$7], ["__scopeId", "data-v-e408867a"]]);
const _sfc_main$7 = {
  name: "LinkVariantIcon",
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
const _hoisted_1$7 = ["aria-hidden", "aria-label"];
const _hoisted_2$6 = ["fill", "width", "height"];
const _hoisted_3$5 = { d: "M10.59,13.41C11,13.8 11,14.44 10.59,14.83C10.2,15.22 9.56,15.22 9.17,14.83C7.22,12.88 7.22,9.71 9.17,7.76V7.76L12.71,4.22C14.66,2.27 17.83,2.27 19.78,4.22C21.73,6.17 21.73,9.34 19.78,11.29L18.29,12.78C18.3,11.96 18.17,11.14 17.89,10.36L18.36,9.88C19.54,8.71 19.54,6.81 18.36,5.64C17.19,4.46 15.29,4.46 14.12,5.64L10.59,9.17C9.41,10.34 9.41,12.24 10.59,13.41M13.41,9.17C13.8,8.78 14.44,8.78 14.83,9.17C16.78,11.12 16.78,14.29 14.83,16.24V16.24L11.29,19.78C9.34,21.73 6.17,21.73 4.22,19.78C2.27,17.83 2.27,14.66 4.22,12.71L5.71,11.22C5.7,12.04 5.83,12.86 6.11,13.65L5.64,14.12C4.46,15.29 4.46,17.19 5.64,18.36C6.81,19.54 8.71,19.54 9.88,18.36L13.41,14.83C14.59,13.66 14.59,11.76 13.41,10.59C13,10.2 13,9.56 13.41,9.17Z" };
const _hoisted_4$4 = { key: 0 };
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("span", mergeProps(_ctx.$attrs, {
    "aria-hidden": $props.title ? null : "true",
    "aria-label": $props.title,
    class: "material-design-icon link-variant-icon",
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
      createBaseVNode("path", _hoisted_3$5, [
        $props.title ? (openBlock(), createElementBlock("title", _hoisted_4$4, toDisplayString($props.title), 1)) : createCommentVNode("", true)
      ])
    ], 8, _hoisted_2$6))
  ], 16, _hoisted_1$7);
}
const LinkVariantIcon = /* @__PURE__ */ _export_sfc$1(_sfc_main$7, [["render", _sfc_render$6]]);
register(t8);
const anyLinkProviderId = "any-link";
const anyLinkProvider = {
  id: anyLinkProviderId,
  title: t("Any link"),
  order: 0,
  icon_url: imagePath("core", "filetypes/link.svg")
};
window._vue_richtext_reference_providers ??= loadState("core", "reference-provider-list", []);
window._vue_richtext_reference_provider_timestamps ??= loadState("core", "reference-provider-timestamps", {});
function getProvider(providerId) {
  if (providerId === anyLinkProviderId) {
    return anyLinkProvider;
  }
  return getProviders().find((p) => p.id === providerId);
}
function getProviders() {
  return window._vue_richtext_reference_providers.filter((p) => {
    const keep = !!p.search_providers_ids && p.search_providers_ids.length > 0 || isCustomPickerElementRegistered(p.id);
    if (!keep) {
      logger.debug(`[smart picker] ${p.id} reference provider is discoverable but does not have any related search provider or custom picker component registered`);
    }
    return keep;
  });
}
function sortProviders(providerList) {
  const timestamps = window._vue_richtext_reference_provider_timestamps;
  return providerList.sort((a, b) => {
    return a.order === b.order ? 0 : a.order > b.order ? 1 : -1;
  }).sort((a, b) => {
    const ta = timestamps[a.id];
    const tb = timestamps[b.id];
    return ta === tb ? 0 : tb === void 0 ? -1 : ta === void 0 ? 1 : ta > tb ? -1 : 1;
  });
}
function searchProvider(query, limit) {
  const providers = getProviders();
  const escapedQuery = query.replace(/[/\-\\^$*+?.()|[\]{}]/g, "\\$&");
  const regexp = new RegExp(escapedQuery, "i");
  const sortedProviders = sortProviders(providers);
  const filteredSortedProviders = sortedProviders.filter((p) => {
    return p.title.match(regexp);
  });
  const searchResult = limit ? filteredSortedProviders.slice(0, limit) : filteredSortedProviders;
  if (query === "" || searchResult.length === 0) {
    searchResult.push(anyLinkProvider);
  }
  return searchResult;
}
async function touchProvider(providerId) {
  const timestamp = Math.floor(Date.now() / 1e3);
  const url = generateOcsUrl("references/provider/{providerId}", { providerId });
  await cancelableClient.put(url, { timestamp });
  window._vue_richtext_reference_provider_timestamps[providerId] = timestamp;
}
register(t41, t46);
/*!
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
function isUrl(str) {
  try {
    return Boolean(new URL(str));
  } catch {
    return false;
  }
}
const _sfc_main$6 = {
  name: "NcProviderList",
  components: {
    NcSelect,
    NcHighlight: _sfc_main$c,
    NcEmptyContent,
    LinkVariantIcon
  },
  emits: [
    "selectProvider",
    "submit"
  ],
  data() {
    return {
      selectedProvider: null,
      query: "",
      multiselectPlaceholder: t("Select provider"),
      providerIconAlt: t("Provider icon")
    };
  },
  computed: {
    options() {
      const result = [];
      if (this.query !== "" && isUrl(this.query)) {
        result.push({
          id: this.query,
          title: this.query,
          isLink: true
        });
      }
      result.push(...searchProvider(this.query));
      return result;
    }
  },
  methods: {
    focus() {
      setTimeout(() => {
        this.$refs["provider-select"]?.$el?.querySelector("#provider-select-input")?.focus();
      }, 300);
    },
    onProviderSelected(p) {
      if (p !== null) {
        if (p.isLink) {
          this.$emit("submit", p.title);
        } else {
          this.$emit("selectProvider", p);
        }
        this.selectedProvider = null;
      }
    },
    onSearch(query) {
      this.query = query;
    }
  }
};
const _hoisted_1$6 = { class: "provider-list" };
const _hoisted_2$5 = {
  key: 0,
  class: "provider"
};
const _hoisted_3$4 = {
  key: 1,
  class: "provider"
};
const _hoisted_4$3 = ["src", "alt"];
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_LinkVariantIcon = resolveComponent("LinkVariantIcon");
  const _component_NcHighlight = resolveComponent("NcHighlight");
  const _component_NcSelect = resolveComponent("NcSelect");
  const _component_NcEmptyContent = resolveComponent("NcEmptyContent");
  return openBlock(), createElementBlock("div", _hoisted_1$6, [
    createVNode(_component_NcSelect, {
      ref: "provider-select",
      modelValue: $data.selectedProvider,
      "onUpdate:modelValue": [
        _cache[0] || (_cache[0] = ($event) => $data.selectedProvider = $event),
        $options.onProviderSelected
      ],
      class: "provider-list--select",
      inputId: "provider-select-input",
      label: "title",
      placeholder: $data.multiselectPlaceholder,
      options: $options.options,
      appendToBody: false,
      clearSearchOnSelect: true,
      clearSearchOnBlur: () => false,
      filterable: false,
      onSearch: $options.onSearch
    }, {
      option: withCtx((option) => [
        option.isLink ? (openBlock(), createElementBlock("div", _hoisted_2$5, [
          createVNode(_component_LinkVariantIcon, {
            class: "link-icon",
            size: 20
          }),
          createBaseVNode("span", null, toDisplayString(option.title), 1)
        ])) : (openBlock(), createElementBlock("div", _hoisted_3$4, [
          createBaseVNode("img", {
            class: "provider-icon",
            src: option.icon_url,
            alt: $data.providerIconAlt
          }, null, 8, _hoisted_4$3),
          createVNode(_component_NcHighlight, {
            class: "option-text",
            search: $data.query,
            text: option.title
          }, null, 8, ["search", "text"])
        ]))
      ]),
      _: 1
    }, 8, ["modelValue", "placeholder", "options", "onSearch", "onUpdate:modelValue"]),
    createVNode(_component_NcEmptyContent, { class: "provider-list--empty-content" }, {
      icon: withCtx(() => [
        createVNode(_component_LinkVariantIcon)
      ]),
      _: 1
    })
  ]);
}
const NcProviderList = /* @__PURE__ */ _export_sfc$1(_sfc_main$6, [["render", _sfc_render$5], ["__scopeId", "data-v-ea81d3af"]]);
register(t24);
const _hoisted_1$5 = ["src"];
const _hoisted_2$4 = { class: "widget-default--details" };
const _hoisted_3$3 = { class: "widget-default--name" };
const _hoisted_4$2 = { class: "widget-default--link" };
const IDLE_TIMEOUT = 3 * 60 * 1e3;
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "NcReferenceWidget",
  props: {
    reference: {},
    interactive: { type: Boolean, default: true },
    interactiveOptIn: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const router = inject(routerKey, null);
    const isVisible = ref(false);
    const customWidget = useTemplateRef("customWidget");
    const widgetRoot = useTemplateRef("widgetRoot");
    const { width } = useElementSize(widgetRoot);
    useIntersectionObserver(widgetRoot, ([entry]) => {
      nextTick(() => {
        isVisible.value = entry.isIntersecting;
      });
    });
    const showInteractive = ref(false);
    const rendered = ref(false);
    let idleTimeout = null;
    const isInteractive = computed(() => {
      return !props.interactiveOptIn && props.interactive || showInteractive.value;
    });
    const referenceHasFullWidth = computed(() => {
      return hasFullWidth(props.reference.richObjectType);
    });
    const hasCustomWidget = computed(() => {
      return isWidgetRegistered(props.reference.richObjectType);
    });
    const referenceHasInteractiveView = computed(() => {
      return hasCustomWidget.value && hasInteractiveView(props.reference.richObjectType);
    });
    const noAccess = computed(() => {
      return !props.reference.accessible;
    });
    const numberOfLines = computed(() => {
      const lineCountOffsets = [450, 550, 650, Infinity];
      return lineCountOffsets.findIndex((max2) => width.value < max2);
    });
    const descriptionStyle = computed(() => {
      if (numberOfLines.value === 0) {
        return {
          display: "none"
        };
      }
      const lineClamp = numberOfLines.value;
      return {
        lineClamp,
        webkitLineClamp: lineClamp
      };
    });
    const compactLink = computed(() => {
      const link = props.reference.openGraphObject.link;
      if (!link) {
        return "";
      }
      if (link.startsWith("https://")) {
        return link.substring(8);
      }
      if (link.startsWith("http://")) {
        return link.substring(7);
      }
      return link;
    });
    const route = computed(() => {
      return getRoute(router, props.reference.openGraphObject.link);
    });
    const referenceWidgetLinkComponent = computed(() => {
      return route.value ? RouterLink : "a";
    });
    const referenceWidgetLinkProps = computed(() => {
      return route.value ? { to: route.value } : { href: props.reference.openGraphObject.link, target: "_blank" };
    });
    watch(isVisible, (val) => {
      if (!val) {
        idleTimeout = setTimeout(() => {
          if (!isVisible.value) {
            destroyReferenceWidget();
          }
        }, IDLE_TIMEOUT);
        return;
      }
      if (idleTimeout) {
        clearTimeout(idleTimeout);
        idleTimeout = null;
      }
      if (!rendered.value) {
        renderReferenceWidget();
      }
    }, { immediate: true });
    onBeforeUnmount(() => {
      destroyReferenceWidget();
    });
    function enableInteractive() {
      showInteractive.value = true;
      renderReferenceWidget();
    }
    function renderReferenceWidget() {
      if (!customWidget.value) {
        return;
      }
      if (props.reference.richObjectType === "open-graph") {
        return;
      }
      customWidget.value.innerHTML = "";
      const widget = document.createElement("div");
      widget.style.width = "100%";
      customWidget.value.appendChild(widget);
      nextTick(() => {
        renderWidget(widget, {
          ...props.reference,
          interactive: isInteractive.value
        });
        rendered.value = true;
      });
    }
    function destroyReferenceWidget() {
      if (rendered.value && widgetRoot.value) {
        destroyWidget(props.reference.richObjectType, widgetRoot.value);
        rendered.value = false;
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "widgetRoot",
        ref: widgetRoot,
        class: normalizeClass({ "toggle-interactive": referenceHasInteractiveView.value && !isInteractive.value })
      }, [
        __props.reference && hasCustomWidget.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          ref_key: "customWidget",
          ref: customWidget,
          class: normalizeClass(["widget-custom", { "full-width": referenceHasFullWidth.value }])
        }, null, 2)) : !noAccess.value && __props.reference && __props.reference.openGraphObject && !hasCustomWidget.value ? (openBlock(), createBlock(resolveDynamicComponent(referenceWidgetLinkComponent.value), mergeProps({ key: 1 }, referenceWidgetLinkProps.value, {
          rel: "noopener noreferrer",
          class: "widget-default"
        }), {
          default: withCtx(() => [
            __props.reference.openGraphObject.thumb ? (openBlock(), createElementBlock("img", {
              key: 0,
              class: "widget-default--image",
              src: __props.reference.openGraphObject.thumb
            }, null, 8, _hoisted_1$5)) : createCommentVNode("", true),
            createBaseVNode("div", _hoisted_2$4, [
              createBaseVNode("p", _hoisted_3$3, toDisplayString(__props.reference.openGraphObject.name), 1),
              createBaseVNode("p", {
                class: "widget-default--description",
                style: normalizeStyle(descriptionStyle.value)
              }, toDisplayString(__props.reference.openGraphObject.description), 5),
              createBaseVNode("p", _hoisted_4$2, toDisplayString(compactLink.value), 1)
            ])
          ]),
          _: 1
        }, 16)) : createCommentVNode("", true),
        __props.interactiveOptIn && referenceHasInteractiveView.value && !isInteractive.value ? (openBlock(), createBlock(NcButton, {
          key: 2,
          class: "toggle-interactive--button",
          onClick: enableInteractive
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(unref(t)("Enable interactive view")), 1)
          ]),
          _: 1
        })) : createCommentVNode("", true)
      ], 2);
    };
  }
});
const NcReferenceWidget = /* @__PURE__ */ _export_sfc$1(_sfc_main$5, [["__scopeId", "data-v-b0ec9f0b"]]);
register(t25);
const _sfc_main$4 = {
  name: "NcRawLinkInput",
  components: {
    LinkVariantIcon,
    NcEmptyContent,
    NcLoadingIcon,
    NcReferenceWidget,
    NcTextField: _sfc_main$i
  },
  props: {
    /**
     * The reference provider
     */
    provider: {
      type: Object,
      required: true
    }
  },
  emits: [
    "submit"
  ],
  data() {
    return {
      inputValue: "",
      loading: false,
      reference: null,
      abortController: null,
      inputPlaceholder: t("Enter link")
    };
  },
  computed: {
    isLinkValid() {
      return isUrl(this.inputValue);
    },
    debouncedUpdateReference() {
      return debounce(this.updateReference, 500);
    }
  },
  methods: {
    focus() {
      this.$refs["url-input"].$el.getElementsByTagName("input")[0]?.focus();
    },
    onSubmit(e) {
      const value = e.target.value;
      if (this.isLinkValid) {
        this.$emit("submit", value);
      }
    },
    onClear() {
      this.inputValue = "";
      this.reference = null;
    },
    onInput() {
      this.reference = null;
      if (this.abortController) {
        this.abortController.abort();
      }
      if (this.isLinkValid) {
        this.debouncedUpdateReference();
      }
    },
    updateReference() {
      this.loading = true;
      this.abortController = new AbortController();
      cancelableClient.get(generateOcsUrl("references/resolve", 2) + "?reference=" + encodeURIComponent(this.inputValue), {
        signal: this.abortController.signal
      }).then((response) => {
        this.reference = response.data.ocs.data.references[this.inputValue];
      }).catch((error) => {
        logger.error("[NcRawLinkInput] Failed to update reference", { error });
      }).then(() => {
        this.loading = false;
      });
    }
  }
};
const _hoisted_1$4 = { class: "raw-link" };
const _hoisted_2$3 = { class: "input-wrapper" };
const _hoisted_3$2 = ["src"];
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_NcLoadingIcon = resolveComponent("NcLoadingIcon");
  const _component_LinkVariantIcon = resolveComponent("LinkVariantIcon");
  const _component_NcTextField = resolveComponent("NcTextField");
  const _component_NcReferenceWidget = resolveComponent("NcReferenceWidget");
  const _component_NcEmptyContent = resolveComponent("NcEmptyContent");
  return openBlock(), createElementBlock("div", _hoisted_1$4, [
    createBaseVNode("div", _hoisted_2$3, [
      createVNode(_component_NcTextField, {
        ref: "url-input",
        modelValue: $data.inputValue,
        "onUpdate:modelValue": [
          _cache[0] || (_cache[0] = ($event) => $data.inputValue = $event),
          $options.onInput
        ],
        showTrailingButton: $data.inputValue !== "",
        label: $data.inputPlaceholder,
        onTrailingButtonClick: $options.onClear,
        onKeyup: withKeys($options.onSubmit, ["enter"])
      }, {
        default: withCtx(() => [
          $data.loading ? (openBlock(), createBlock(_component_NcLoadingIcon, {
            key: 0,
            size: 16
          })) : (openBlock(), createBlock(_component_LinkVariantIcon, {
            key: 1,
            size: 16
          }))
        ]),
        _: 1
      }, 8, ["modelValue", "showTrailingButton", "label", "onTrailingButtonClick", "onUpdate:modelValue", "onKeyup"])
    ]),
    $data.reference !== null ? (openBlock(), createBlock(_component_NcReferenceWidget, {
      key: 0,
      class: "reference-widget",
      reference: $data.reference
    }, null, 8, ["reference"])) : (openBlock(), createBlock(_component_NcEmptyContent, {
      key: 1,
      class: "raw-link--empty-content"
    }, {
      icon: withCtx(() => [
        $props.provider.icon_url ? (openBlock(), createElementBlock("img", {
          key: 0,
          class: "provider-icon",
          src: $props.provider.icon_url
        }, null, 8, _hoisted_3$2)) : (openBlock(), createBlock(_component_LinkVariantIcon, { key: 1 }))
      ]),
      _: 1
    }))
  ]);
}
const NcRawLinkInput = /* @__PURE__ */ _export_sfc$1(_sfc_main$4, [["render", _sfc_render$4], ["__scopeId", "data-v-918730b9"]]);
const _sfc_main$3 = {
  name: "NcSearchResult",
  components: {
    NcHighlight: _sfc_main$c
  },
  props: {
    /**
     * Unified search result entry
     */
    entry: {
      type: Object,
      required: true
    },
    /**
     * The query that led to getting this result
     * Used to highlight the entry text
     */
    query: {
      type: String,
      required: true
    }
  }
};
const _hoisted_1$3 = { class: "result" };
const _hoisted_2$2 = ["src"];
const _hoisted_3$1 = { class: "result--content" };
const _hoisted_4$1 = { class: "result--content--name" };
const _hoisted_5$1 = { class: "result--content--subline" };
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_NcHighlight = resolveComponent("NcHighlight");
  return openBlock(), createElementBlock("div", _hoisted_1$3, [
    $props.entry.icon ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: normalizeClass([{ [$props.entry.icon]: true, rounded: $props.entry.rounded }, "result--icon-class"])
    }, null, 2)) : (openBlock(), createElementBlock("img", {
      key: 1,
      class: normalizeClass(["result--image", { rounded: $props.entry.rounded }]),
      src: $props.entry.thumbnailUrl
    }, null, 10, _hoisted_2$2)),
    createBaseVNode("div", _hoisted_3$1, [
      createBaseVNode("span", _hoisted_4$1, [
        createVNode(_component_NcHighlight, {
          search: $props.query,
          text: $props.entry.title
        }, null, 8, ["search", "text"])
      ]),
      createBaseVNode("span", _hoisted_5$1, [
        createVNode(_component_NcHighlight, {
          search: $props.query,
          text: $props.entry.subline
        }, null, 8, ["search", "text"])
      ])
    ])
  ]);
}
const NcSearchResult = /* @__PURE__ */ _export_sfc$1(_sfc_main$3, [["render", _sfc_render$3], ["__scopeId", "data-v-059edcfb"]]);
register(t32, t41, t43);
const LIMIT = 5;
const _sfc_main$2 = {
  name: "NcSearch",
  components: {
    LinkVariantIcon,
    DotsHorizontalIcon: IconDotsHorizontal,
    NcEmptyContent,
    NcSelect,
    NcSearchResult
  },
  /* eslint vue/require-prop-comment: warn -- TODO: Add a proper doc block about what this props do */
  props: {
    /**
     * The selected reference provider
     */
    provider: {
      type: Object,
      required: true
    },
    showEmptyContent: {
      type: Boolean,
      default: true
    },
    /**
     * Placeholder of the search
     */
    searchPlaceholder: {
      type: String,
      default: null
    }
  },
  emits: [
    "submit"
  ],
  data() {
    return {
      searchQuery: "",
      selectedResult: null,
      resultsBySearchProvider: {},
      searching: false,
      searchingMoreOf: null,
      abortController: null,
      noOptionsText: t("Start typing to search"),
      providerIconAlt: t("Provider icon")
    };
  },
  computed: {
    mySearchPlaceholder() {
      return this.searchPlaceholder || t("Search");
    },
    searchProviderIds() {
      return this.provider.search_providers_ids;
    },
    options() {
      if (this.searchQuery === "") {
        return [];
      }
      const options = [];
      if (isUrl(this.searchQuery)) {
        options.push(this.rawLinkEntry);
      }
      options.push(...this.formattedSearchResults);
      return options;
    },
    rawLinkEntry() {
      return {
        id: "rawLinkEntry",
        resourceUrl: this.searchQuery,
        isRawLink: true
      };
    },
    formattedSearchResults() {
      const results = [];
      this.searchProviderIds.forEach((pid) => {
        if (this.resultsBySearchProvider[pid].entries.length > 0) {
          if (this.searchProviderIds.length > 1 || this.resultsBySearchProvider[pid].entries.length > 1) {
            results.push({
              id: "groupTitle-" + pid,
              name: this.resultsBySearchProvider[pid].name,
              isCustomGroupTitle: true,
              providerId: pid
            });
          }
          const providerEntriesWithId = this.resultsBySearchProvider[pid].entries.map((entry, index) => {
            return {
              id: "provider-" + pid + "-entry-" + index,
              ...entry
            };
          });
          results.push(...providerEntriesWithId);
          if (this.resultsBySearchProvider[pid].isPaginated) {
            results.push({
              id: "moreOf-" + pid,
              name: this.resultsBySearchProvider[pid].name,
              isMore: true,
              providerId: pid,
              isLoading: this.searchingMoreOf === pid
            });
          }
        }
      });
      return results;
    },
    debouncedUpdateSearch() {
      return debounce(this.updateSearch, 500);
    }
  },
  mounted() {
    this.resetResults();
  },
  beforeUnmount() {
    this.cancelSearchRequests();
  },
  methods: {
    t,
    resetResults() {
      const resultsBySearchProvider = {};
      this.searchProviderIds.forEach((pid) => {
        resultsBySearchProvider[pid] = {
          entries: []
        };
      });
      this.resultsBySearchProvider = resultsBySearchProvider;
    },
    focus() {
      setTimeout(() => {
        this.$refs["search-select"]?.$el?.querySelector("#search-select-input")?.focus();
      }, 300);
    },
    cancelSearchRequests() {
      if (this.abortController) {
        this.abortController.abort();
      }
    },
    onSearchInput(query) {
      this.searchQuery = query;
      this.debouncedUpdateSearch();
    },
    onSelectResultSelected(item) {
      if (item !== null) {
        if (item.resourceUrl) {
          this.cancelSearchRequests();
          this.$emit("submit", item.resourceUrl);
        } else if (item.isMore) {
          this.searchMoreOf(item.providerId).then(() => {
            this.selectedResult = null;
          });
        }
      }
    },
    searchMoreOf(searchProviderId) {
      this.searchingMoreOf = searchProviderId;
      this.cancelSearchRequests();
      return this.searchProviders(searchProviderId);
    },
    updateSearch() {
      this.cancelSearchRequests();
      this.resetResults();
      if (this.searchQuery === "") {
        this.searching = false;
        return;
      }
      return this.searchProviders();
    },
    searchProviders(searchProviderId = null) {
      this.abortController = new AbortController();
      this.searching = true;
      const searchPromises = searchProviderId === null ? [...this.searchProviderIds].map((pid) => {
        return this.searchOneProvider(pid);
      }) : [this.searchOneProvider(searchProviderId, this.resultsBySearchProvider[searchProviderId]?.cursor ?? null)];
      return Promise.allSettled(searchPromises).then((promises) => {
        const isOneCanceled = !!promises.find((p) => {
          return p.status === "rejected" && (p.reason.name === "CanceledError" || p.reason.code === "ERR_CANCELED");
        });
        if (!isOneCanceled) {
          this.searching = false;
          this.searchingMoreOf = null;
        }
      });
    },
    searchOneProvider(providerId, cursor = null) {
      const url = cursor === null ? generateOcsUrl("search/providers/{providerId}/search?term={term}&limit={limit}", { providerId, term: this.searchQuery, limit: LIMIT }) : generateOcsUrl("search/providers/{providerId}/search?term={term}&limit={limit}&cursor={cursor}", { providerId, term: this.searchQuery, limit: LIMIT, cursor });
      return cancelableClient.get(url, {
        signal: this.abortController.signal
      }).then((response) => {
        const data = response.data.ocs.data;
        this.resultsBySearchProvider[providerId].name = data.name;
        this.resultsBySearchProvider[providerId].cursor = data.cursor;
        this.resultsBySearchProvider[providerId].isPaginated = data.isPaginated;
        this.resultsBySearchProvider[providerId].entries.push(...data.entries);
      });
    }
  }
};
const _hoisted_1$2 = {
  key: 0,
  class: "custom-option"
};
const _hoisted_2$1 = { class: "option-text" };
const _hoisted_3 = {
  key: 2,
  class: "custom-option group-name"
};
const _hoisted_4 = ["src"];
const _hoisted_5 = { class: "option-text" };
const _hoisted_6 = {
  key: 3,
  class: "custom-option"
};
const _hoisted_7 = {
  key: 0,
  class: "option-simple-icon icon-loading-small"
};
const _hoisted_8 = { class: "option-text" };
const _hoisted_9 = ["alt", "src"];
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_LinkVariantIcon = resolveComponent("LinkVariantIcon");
  const _component_NcSearchResult = resolveComponent("NcSearchResult");
  const _component_DotsHorizontalIcon = resolveComponent("DotsHorizontalIcon");
  const _component_NcSelect = resolveComponent("NcSelect");
  const _component_NcEmptyContent = resolveComponent("NcEmptyContent");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["smart-picker-search", { "with-empty-content": $props.showEmptyContent }])
  }, [
    createVNode(_component_NcSelect, {
      ref: "search-select",
      modelValue: $data.selectedResult,
      "onUpdate:modelValue": [
        _cache[0] || (_cache[0] = ($event) => $data.selectedResult = $event),
        $options.onSelectResultSelected
      ],
      class: "smart-picker-search--select",
      inputId: "search-select-input",
      label: "name",
      placeholder: $options.mySearchPlaceholder,
      options: $options.options,
      appendToBody: false,
      closeOnSelect: false,
      clearSearchOnSelect: false,
      clearSearchOnBlur: () => false,
      resetFocusOnOptionsChange: false,
      filterable: false,
      autoscroll: true,
      resetOnOptionsChange: false,
      loading: $data.searching,
      onSearch: $options.onSearchInput
    }, {
      option: withCtx((option) => [
        option.isRawLink ? (openBlock(), createElementBlock("div", _hoisted_1$2, [
          createVNode(_component_LinkVariantIcon, {
            class: "option-simple-icon",
            size: 20
          }),
          createBaseVNode("span", _hoisted_2$1, toDisplayString($options.t("Raw link {options}", { options: option.resourceUrl })), 1)
        ])) : option.resourceUrl ? (openBlock(), createBlock(_component_NcSearchResult, {
          key: 1,
          class: "search-result",
          entry: option,
          query: $data.searchQuery
        }, null, 8, ["entry", "query"])) : option.isCustomGroupTitle ? (openBlock(), createElementBlock("span", _hoisted_3, [
          $props.provider.icon_url ? (openBlock(), createElementBlock("img", {
            key: 0,
            class: "provider-icon group-name-icon",
            src: $props.provider.icon_url
          }, null, 8, _hoisted_4)) : createCommentVNode("", true),
          createBaseVNode("span", _hoisted_5, [
            createBaseVNode("strong", null, toDisplayString(option.name), 1)
          ])
        ])) : option.isMore ? (openBlock(), createElementBlock("span", _hoisted_6, [
          option.isLoading ? (openBlock(), createElementBlock("span", _hoisted_7)) : (openBlock(), createBlock(_component_DotsHorizontalIcon, {
            key: 1,
            class: "option-simple-icon",
            size: 20
          })),
          createBaseVNode("span", _hoisted_8, toDisplayString($options.t('Load more "{options}"', { options: option.name })), 1)
        ])) : createCommentVNode("", true)
      ]),
      "no-options": withCtx(() => [
        createTextVNode(toDisplayString($data.noOptionsText), 1)
      ]),
      _: 1
    }, 8, ["modelValue", "placeholder", "options", "loading", "onSearch", "onUpdate:modelValue"]),
    $props.showEmptyContent ? (openBlock(), createBlock(_component_NcEmptyContent, {
      key: 0,
      class: "smart-picker-search--empty-content"
    }, {
      icon: withCtx(() => [
        $props.provider.icon_url ? (openBlock(), createElementBlock("img", {
          key: 0,
          class: "provider-icon",
          alt: $data.providerIconAlt,
          src: $props.provider.icon_url
        }, null, 8, _hoisted_9)) : (openBlock(), createBlock(_component_LinkVariantIcon, { key: 1 }))
      ]),
      _: 1
    })) : createCommentVNode("", true)
  ], 2);
}
const NcSearch = /* @__PURE__ */ _export_sfc$1(_sfc_main$2, [["render", _sfc_render$2], ["__scopeId", "data-v-af9d145f"]]);
const MODES = {
  providerList: 1,
  standardLinkInput: 2,
  searchInput: 3,
  customElement: 4
};
const _sfc_main$1 = {
  name: "NcReferencePicker",
  components: {
    NcCustomPickerElement,
    NcProviderList,
    NcRawLinkInput,
    NcSearch
  },
  props: {
    /**
     * Provider to select on creation
     * Default: null. Show the provider list
     */
    initialProvider: {
      type: Object,
      default: () => null
    },
    /**
     * Optional width in pixels
     * Default: 100%
     */
    width: {
      type: Number,
      default: null
    },
    /**
     * Focus on the provider list select input on creation
     * Default: true
     */
    focusOnCreate: {
      type: Boolean,
      default: true
    }
  },
  emits: [
    "cancel",
    "cancelRawLink",
    "cancelSearch",
    "providerSelected",
    "submit"
  ],
  data() {
    return {
      MODES,
      selectedProvider: this.initialProvider
    };
  },
  computed: {
    mode() {
      return this.selectedProvider === null ? MODES.providerList : isCustomPickerElementRegistered(this.selectedProvider.id) ? MODES.customElement : this.selectedProvider.search_providers_ids ? MODES.searchInput : MODES.standardLinkInput;
    },
    pickerWrapperStyle() {
      return {
        width: this.width ? this.width + "px" : void 0
      };
    }
  },
  mounted() {
    if (this.focusOnCreate) {
      if (this.initialProvider) {
        setTimeout(() => {
          this.$refs["url-input"]?.focus();
        }, 300);
      } else {
        this.$nextTick(() => {
          this.$refs["provider-list"]?.focus();
        });
      }
    }
  },
  methods: {
    onEscapePressed() {
      if (this.selectedProvider !== null) {
        this.deselectProvider();
      } else {
        this.cancelProviderSelection();
      }
    },
    onProviderSelected(provider) {
      this.selectedProvider = provider;
      this.$emit("providerSelected", provider);
      this.$nextTick(() => {
        this.$refs["url-input"]?.focus();
      });
    },
    cancelCustomElement() {
      this.deselectProvider();
    },
    cancelSearch() {
      this.$emit("cancelSearch", this.selectedProvider?.title);
      this.deselectProvider();
    },
    cancelRawLinkInput() {
      this.$emit("cancelRawLink", this.selectedProvider?.title);
      this.deselectProvider();
    },
    cancelProviderSelection() {
      this.$emit("cancel");
    },
    submitLink(link) {
      if (this.selectedProvider !== null) {
        touchProvider(this.selectedProvider.id);
      }
      this.$emit("submit", link);
      this.deselectProvider();
    },
    deselectProvider() {
      this.selectedProvider = null;
      this.$emit("providerSelected", null);
      setTimeout(() => {
        this.$refs["provider-list"]?.focus();
      }, 300);
    }
  }
};
const _hoisted_1$1 = {
  key: 3,
  class: "custom-element-wrapper"
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_NcProviderList = resolveComponent("NcProviderList");
  const _component_NcRawLinkInput = resolveComponent("NcRawLinkInput");
  const _component_NcSearch = resolveComponent("NcSearch");
  const _component_NcCustomPickerElement = resolveComponent("NcCustomPickerElement");
  return openBlock(), createElementBlock("div", {
    class: "reference-picker",
    style: normalizeStyle($options.pickerWrapperStyle),
    tabindex: "-1",
    onKeydown: _cache[0] || (_cache[0] = withKeys(withModifiers((...args) => $options.onEscapePressed && $options.onEscapePressed(...args), ["stop", "prevent"]), ["esc"]))
  }, [
    $options.mode === $data.MODES.providerList ? (openBlock(), createBlock(_component_NcProviderList, {
      key: 0,
      ref: "provider-list",
      onSelectProvider: $options.onProviderSelected,
      onSubmit: $options.submitLink,
      onCancel: $options.cancelProviderSelection
    }, null, 8, ["onSelectProvider", "onSubmit", "onCancel"])) : $options.mode === $data.MODES.standardLinkInput ? (openBlock(), createBlock(_component_NcRawLinkInput, {
      key: 1,
      ref: "url-input",
      provider: $data.selectedProvider,
      onSubmit: $options.submitLink,
      onCancel: $options.cancelRawLinkInput
    }, null, 8, ["provider", "onSubmit", "onCancel"])) : $options.mode === $data.MODES.searchInput ? (openBlock(), createBlock(_component_NcSearch, {
      key: 2,
      ref: "url-input",
      provider: $data.selectedProvider,
      onCancel: $options.cancelSearch,
      onSubmit: $options.submitLink
    }, null, 8, ["provider", "onCancel", "onSubmit"])) : $options.mode === $data.MODES.customElement ? (openBlock(), createElementBlock("div", _hoisted_1$1, [
      createVNode(_component_NcCustomPickerElement, {
        provider: $data.selectedProvider,
        class: "custom-element",
        onSubmit: $options.submitLink,
        onCancel: $options.cancelCustomElement
      }, null, 8, ["provider", "onSubmit", "onCancel"])
    ])) : createCommentVNode("", true)
  ], 36);
}
const NcReferencePicker = /* @__PURE__ */ _export_sfc$1(_sfc_main$1, [["render", _sfc_render$1], ["__scopeId", "data-v-5e2e9195"]]);
register(t12, t19);
const _sfc_main = {
  name: "NcReferencePickerModal",
  components: {
    NcReferencePicker,
    NcModal,
    NcButton,
    ArrowLeftIcon,
    CloseIcon: IconClose
  },
  props: {
    /**
     * Provider to select on creation
     * Show the provider list if no initial one is provided
     */
    initialProvider: {
      type: Object,
      default: () => null
    },
    /**
     * Focus on the input item on create
     */
    focusOnCreate: {
      type: Boolean,
      default: true
    },
    /**
     * If true, add the modal content to the Viewer trap elements via the event-bus
     */
    isInsideViewer: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    "cancel",
    "submit"
  ],
  data() {
    return {
      show: true,
      selectedProvider: this.initialProvider,
      backButtonTitle: t("Back to provider selection"),
      closeButtonTitle: t("Close"),
      closeButtonLabel: t("Close Smart Picker")
    };
  },
  computed: {
    isProviderSelected() {
      return this.selectedProvider !== null;
    },
    showBackButton() {
      return this.initialProvider === null && this.isProviderSelected;
    },
    modalSize() {
      return this.isProviderSelected && isCustomPickerElementRegistered(this.selectedProvider.id) ? getCustomPickerElementSize(this.selectedProvider.id) ?? "large" : "normal";
    },
    showModalName() {
      return !this.isProviderSelected || !isCustomPickerElementRegistered(this.selectedProvider.id);
    },
    modalName() {
      return this.isProviderSelected ? this.selectedProvider.title : t("Smart Picker");
    }
  },
  mounted() {
    if (this.isInsideViewer) {
      const elem = this.$refs.modal_content;
      emit("viewer:trapElements:changed", elem);
    }
  },
  methods: {
    onCancel() {
      this.show = false;
      this.$emit("cancel");
    },
    onSubmit(value) {
      this.show = false;
      this.$emit("submit", value);
    },
    onProviderSelect(provider) {
      this.selectedProvider = provider;
      if (provider === null && this.initialProvider !== null) {
        this.onCancel();
      }
    },
    onBackClicked() {
      this.$refs.referencePicker.deselectProvider();
    }
  }
};
const _hoisted_1 = {
  ref: "modal_content",
  class: "reference-picker-modal--content"
};
const _hoisted_2 = { key: 1 };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ArrowLeftIcon = resolveComponent("ArrowLeftIcon");
  const _component_NcButton = resolveComponent("NcButton");
  const _component_CloseIcon = resolveComponent("CloseIcon");
  const _component_NcReferencePicker = resolveComponent("NcReferencePicker");
  const _component_NcModal = resolveComponent("NcModal");
  return $data.show ? (openBlock(), createBlock(_component_NcModal, {
    key: 0,
    size: $options.modalSize,
    class: "reference-picker-modal",
    onClose: $options.onCancel
  }, {
    default: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        $options.showBackButton ? (openBlock(), createBlock(_component_NcButton, {
          key: 0,
          "aria-label": $data.backButtonTitle,
          title: $data.backButtonTitle,
          class: "back-button",
          onClick: $options.onBackClicked
        }, {
          icon: withCtx(() => [
            createVNode(_component_ArrowLeftIcon)
          ]),
          _: 1
        }, 8, ["aria-label", "title", "onClick"])) : createCommentVNode("", true),
        createVNode(_component_NcButton, {
          class: "close-button",
          "aria-label": $data.closeButtonLabel,
          title: $data.closeButtonTitle,
          variant: "tertiary",
          onClick: $options.onCancel
        }, {
          icon: withCtx(() => [
            createVNode(_component_CloseIcon)
          ]),
          _: 1
        }, 8, ["aria-label", "title", "onClick"]),
        $options.showModalName ? (openBlock(), createElementBlock("h2", _hoisted_2, toDisplayString($options.modalName), 1)) : createCommentVNode("", true),
        createVNode(_component_NcReferencePicker, {
          ref: "referencePicker",
          initialProvider: $props.initialProvider,
          focusOnCreate: $props.focusOnCreate,
          onProviderSelected: $options.onProviderSelect,
          onSubmit: $options.onSubmit,
          onCancel: $options.onCancel
        }, null, 8, ["initialProvider", "focusOnCreate", "onProviderSelected", "onSubmit", "onCancel"])
      ], 512)
    ]),
    _: 1
  }, 8, ["size", "onClose"])) : createCommentVNode("", true);
}
const NcReferencePickerModal = /* @__PURE__ */ _export_sfc$1(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-bf0a25ee"]]);
async function getLinkWithPicker(providerId, isInsideViewer) {
  const modalId = "referencePickerModal";
  const modalElement = document.createElement("div");
  modalElement.id = modalId;
  document.body.append(modalElement);
  const { promise, reject, resolve } = Promise.withResolvers();
  const initialProvider = providerId && getProvider(providerId) || null;
  const view = createApp(NcReferencePickerModal, {
    initialProvider,
    isInsideViewer,
    onCancel() {
      view.unmount();
      reject(new Error("User cancellation"));
    },
    onSubmit(link) {
      view.unmount();
      resolve(link);
    }
  });
  view.mount(modalElement);
  return promise;
}
const asciiAlpha = regexCheck(/[A-Za-z]/);
const asciiAlphanumeric = regexCheck(/[\dA-Za-z]/);
function asciiControl(code2) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    code2 !== null && (code2 < 32 || code2 === 127)
  );
}
function markdownLineEndingOrSpace(code2) {
  return code2 !== null && (code2 < 0 || code2 === 32);
}
const unicodePunctuation = regexCheck(new RegExp("\\p{P}|\\p{S}", "u"));
const unicodeWhitespace = regexCheck(/\s/);
function regexCheck(regex) {
  return check;
  function check(code2) {
    return code2 !== null && code2 > -1 && regex.test(String.fromCharCode(code2));
  }
}
const convert = (
  // Note: overloads in JSDoc can’t yet use different `@template`s.
  /**
   * @type {(
   *   (<Condition extends string>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & {type: Condition}) &
   *   (<Condition extends Props>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Condition) &
   *   (<Condition extends TestFunction>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Predicate<Condition, Node>) &
   *   ((test?: null | undefined) => (node?: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node) &
   *   ((test?: Test) => Check)
   * )}
   */
  /**
   * @param {Test} [test]
   * @returns {Check}
   */
  (function(test) {
    if (test === null || test === void 0) {
      return ok;
    }
    if (typeof test === "function") {
      return castFactory(test);
    }
    if (typeof test === "object") {
      return Array.isArray(test) ? anyFactory(test) : (
        // Cast because `ReadonlyArray` goes into the above but `isArray`
        // narrows to `Array`.
        propertiesFactory(
          /** @type {Props} */
          test
        )
      );
    }
    if (typeof test === "string") {
      return typeFactory(test);
    }
    throw new Error("Expected function, string, or object as test");
  })
);
function anyFactory(tests) {
  const checks = [];
  let index = -1;
  while (++index < tests.length) {
    checks[index] = convert(tests[index]);
  }
  return castFactory(any);
  function any(...parameters) {
    let index2 = -1;
    while (++index2 < checks.length) {
      if (checks[index2].apply(this, parameters)) return true;
    }
    return false;
  }
}
function propertiesFactory(check) {
  const checkAsRecord = (
    /** @type {Record<string, unknown>} */
    check
  );
  return castFactory(all);
  function all(node) {
    const nodeAsRecord = (
      /** @type {Record<string, unknown>} */
      /** @type {unknown} */
      node
    );
    let key;
    for (key in check) {
      if (nodeAsRecord[key] !== checkAsRecord[key]) return false;
    }
    return true;
  }
}
function typeFactory(check) {
  return castFactory(type);
  function type(node) {
    return node && node.type === check;
  }
}
function castFactory(testFunction) {
  return check;
  function check(value, index, parent) {
    return Boolean(
      looksLikeANode(value) && testFunction.call(
        this,
        value,
        typeof index === "number" ? index : void 0,
        parent || void 0
      )
    );
  }
}
function ok() {
  return true;
}
function looksLikeANode(value) {
  return value !== null && typeof value === "object" && "type" in value;
}
/** @type {(node?: unknown) => node is Exclude<PhrasingContent, Html>} */
convert([
  "break",
  "delete",
  "emphasis",
  // To do: next major: removed since footnotes were added to GFM.
  "footnote",
  "footnoteReference",
  "image",
  "imageReference",
  "inlineCode",
  // Enabled by `mdast-util-math`:
  "inlineMath",
  "link",
  "linkReference",
  // Enabled by `mdast-util-mdx`:
  "mdxJsxTextElement",
  // Enabled by `mdast-util-mdx`:
  "mdxTextExpression",
  "strong",
  "text",
  // Enabled by `mdast-util-directive`:
  "textDirective"
]);
const wwwPrefix = {
  tokenize: tokenizeWwwPrefix,
  partial: true
};
const domain = {
  tokenize: tokenizeDomain,
  partial: true
};
const path = {
  tokenize: tokenizePath,
  partial: true
};
const trail = {
  tokenize: tokenizeTrail,
  partial: true
};
const emailDomainDotTrail = {
  tokenize: tokenizeEmailDomainDotTrail,
  partial: true
};
const wwwAutolink = {
  name: "wwwAutolink",
  tokenize: tokenizeWwwAutolink,
  previous: previousWww
};
const protocolAutolink = {
  name: "protocolAutolink",
  tokenize: tokenizeProtocolAutolink,
  previous: previousProtocol
};
const emailAutolink = {
  name: "emailAutolink",
  tokenize: tokenizeEmailAutolink,
  previous: previousEmail
};
const text = {};
let code = 48;
while (code < 123) {
  text[code] = emailAutolink;
  code++;
  if (code === 58) code = 65;
  else if (code === 91) code = 97;
}
text[43] = emailAutolink;
text[45] = emailAutolink;
text[46] = emailAutolink;
text[95] = emailAutolink;
text[72] = [emailAutolink, protocolAutolink];
text[104] = [emailAutolink, protocolAutolink];
text[87] = [emailAutolink, wwwAutolink];
text[119] = [emailAutolink, wwwAutolink];
function tokenizeEmailAutolink(effects, ok2, nok) {
  const self = this;
  let dot;
  let data;
  return start;
  function start(code2) {
    if (!gfmAtext(code2) || !previousEmail.call(self, self.previous) || previousUnbalanced(self.events)) {
      return nok(code2);
    }
    effects.enter("literalAutolink");
    effects.enter("literalAutolinkEmail");
    return atext(code2);
  }
  function atext(code2) {
    if (gfmAtext(code2)) {
      effects.consume(code2);
      return atext;
    }
    if (code2 === 64) {
      effects.consume(code2);
      return emailDomain;
    }
    return nok(code2);
  }
  function emailDomain(code2) {
    if (code2 === 46) {
      return effects.check(emailDomainDotTrail, emailDomainAfter, emailDomainDot)(code2);
    }
    if (code2 === 45 || code2 === 95 || asciiAlphanumeric(code2)) {
      data = true;
      effects.consume(code2);
      return emailDomain;
    }
    return emailDomainAfter(code2);
  }
  function emailDomainDot(code2) {
    effects.consume(code2);
    dot = true;
    return emailDomain;
  }
  function emailDomainAfter(code2) {
    if (data && dot && asciiAlpha(self.previous)) {
      effects.exit("literalAutolinkEmail");
      effects.exit("literalAutolink");
      return ok2(code2);
    }
    return nok(code2);
  }
}
function tokenizeWwwAutolink(effects, ok2, nok) {
  const self = this;
  return wwwStart;
  function wwwStart(code2) {
    if (code2 !== 87 && code2 !== 119 || !previousWww.call(self, self.previous) || previousUnbalanced(self.events)) {
      return nok(code2);
    }
    effects.enter("literalAutolink");
    effects.enter("literalAutolinkWww");
    return effects.check(wwwPrefix, effects.attempt(domain, effects.attempt(path, wwwAfter), nok), nok)(code2);
  }
  function wwwAfter(code2) {
    effects.exit("literalAutolinkWww");
    effects.exit("literalAutolink");
    return ok2(code2);
  }
}
function tokenizeProtocolAutolink(effects, ok2, nok) {
  const self = this;
  let buffer = "";
  let seen = false;
  return protocolStart;
  function protocolStart(code2) {
    if ((code2 === 72 || code2 === 104) && previousProtocol.call(self, self.previous) && !previousUnbalanced(self.events)) {
      effects.enter("literalAutolink");
      effects.enter("literalAutolinkHttp");
      buffer += String.fromCodePoint(code2);
      effects.consume(code2);
      return protocolPrefixInside;
    }
    return nok(code2);
  }
  function protocolPrefixInside(code2) {
    if (asciiAlpha(code2) && buffer.length < 5) {
      buffer += String.fromCodePoint(code2);
      effects.consume(code2);
      return protocolPrefixInside;
    }
    if (code2 === 58) {
      const protocol = buffer.toLowerCase();
      if (protocol === "http" || protocol === "https") {
        effects.consume(code2);
        return protocolSlashesInside;
      }
    }
    return nok(code2);
  }
  function protocolSlashesInside(code2) {
    if (code2 === 47) {
      effects.consume(code2);
      if (seen) {
        return afterProtocol;
      }
      seen = true;
      return protocolSlashesInside;
    }
    return nok(code2);
  }
  function afterProtocol(code2) {
    return code2 === null || asciiControl(code2) || markdownLineEndingOrSpace(code2) || unicodeWhitespace(code2) || unicodePunctuation(code2) ? nok(code2) : effects.attempt(domain, effects.attempt(path, protocolAfter), nok)(code2);
  }
  function protocolAfter(code2) {
    effects.exit("literalAutolinkHttp");
    effects.exit("literalAutolink");
    return ok2(code2);
  }
}
function tokenizeWwwPrefix(effects, ok2, nok) {
  let size = 0;
  return wwwPrefixInside;
  function wwwPrefixInside(code2) {
    if ((code2 === 87 || code2 === 119) && size < 3) {
      size++;
      effects.consume(code2);
      return wwwPrefixInside;
    }
    if (code2 === 46 && size === 3) {
      effects.consume(code2);
      return wwwPrefixAfter;
    }
    return nok(code2);
  }
  function wwwPrefixAfter(code2) {
    return code2 === null ? nok(code2) : ok2(code2);
  }
}
function tokenizeDomain(effects, ok2, nok) {
  let underscoreInLastSegment;
  let underscoreInLastLastSegment;
  let seen;
  return domainInside;
  function domainInside(code2) {
    if (code2 === 46 || code2 === 95) {
      return effects.check(trail, domainAfter, domainAtPunctuation)(code2);
    }
    if (code2 === null || markdownLineEndingOrSpace(code2) || unicodeWhitespace(code2) || code2 !== 45 && unicodePunctuation(code2)) {
      return domainAfter(code2);
    }
    seen = true;
    effects.consume(code2);
    return domainInside;
  }
  function domainAtPunctuation(code2) {
    if (code2 === 95) {
      underscoreInLastSegment = true;
    } else {
      underscoreInLastLastSegment = underscoreInLastSegment;
      underscoreInLastSegment = void 0;
    }
    effects.consume(code2);
    return domainInside;
  }
  function domainAfter(code2) {
    if (underscoreInLastLastSegment || underscoreInLastSegment || !seen) {
      return nok(code2);
    }
    return ok2(code2);
  }
}
function tokenizePath(effects, ok2) {
  let sizeOpen = 0;
  let sizeClose = 0;
  return pathInside;
  function pathInside(code2) {
    if (code2 === 40) {
      sizeOpen++;
      effects.consume(code2);
      return pathInside;
    }
    if (code2 === 41 && sizeClose < sizeOpen) {
      return pathAtPunctuation(code2);
    }
    if (code2 === 33 || code2 === 34 || code2 === 38 || code2 === 39 || code2 === 41 || code2 === 42 || code2 === 44 || code2 === 46 || code2 === 58 || code2 === 59 || code2 === 60 || code2 === 63 || code2 === 93 || code2 === 95 || code2 === 126) {
      return effects.check(trail, ok2, pathAtPunctuation)(code2);
    }
    if (code2 === null || markdownLineEndingOrSpace(code2) || unicodeWhitespace(code2)) {
      return ok2(code2);
    }
    effects.consume(code2);
    return pathInside;
  }
  function pathAtPunctuation(code2) {
    if (code2 === 41) {
      sizeClose++;
    }
    effects.consume(code2);
    return pathInside;
  }
}
function tokenizeTrail(effects, ok2, nok) {
  return trail2;
  function trail2(code2) {
    if (code2 === 33 || code2 === 34 || code2 === 39 || code2 === 41 || code2 === 42 || code2 === 44 || code2 === 46 || code2 === 58 || code2 === 59 || code2 === 63 || code2 === 95 || code2 === 126) {
      effects.consume(code2);
      return trail2;
    }
    if (code2 === 38) {
      effects.consume(code2);
      return trailCharacterReferenceStart;
    }
    if (code2 === 93) {
      effects.consume(code2);
      return trailBracketAfter;
    }
    if (
      // `<` is an end.
      code2 === 60 || // So is whitespace.
      code2 === null || markdownLineEndingOrSpace(code2) || unicodeWhitespace(code2)
    ) {
      return ok2(code2);
    }
    return nok(code2);
  }
  function trailBracketAfter(code2) {
    if (code2 === null || code2 === 40 || code2 === 91 || markdownLineEndingOrSpace(code2) || unicodeWhitespace(code2)) {
      return ok2(code2);
    }
    return trail2(code2);
  }
  function trailCharacterReferenceStart(code2) {
    return asciiAlpha(code2) ? trailCharacterReferenceInside(code2) : nok(code2);
  }
  function trailCharacterReferenceInside(code2) {
    if (code2 === 59) {
      effects.consume(code2);
      return trail2;
    }
    if (asciiAlpha(code2)) {
      effects.consume(code2);
      return trailCharacterReferenceInside;
    }
    return nok(code2);
  }
}
function tokenizeEmailDomainDotTrail(effects, ok2, nok) {
  return start;
  function start(code2) {
    effects.consume(code2);
    return after;
  }
  function after(code2) {
    return asciiAlphanumeric(code2) ? nok(code2) : ok2(code2);
  }
}
function previousWww(code2) {
  return code2 === null || code2 === 40 || code2 === 42 || code2 === 95 || code2 === 91 || code2 === 93 || code2 === 126 || markdownLineEndingOrSpace(code2);
}
function previousProtocol(code2) {
  return !asciiAlpha(code2);
}
function previousEmail(code2) {
  return !(code2 === 47 || gfmAtext(code2));
}
function gfmAtext(code2) {
  return code2 === 43 || code2 === 45 || code2 === 46 || code2 === 95 || asciiAlphanumeric(code2);
}
function previousUnbalanced(events) {
  let index = events.length;
  let result = false;
  while (index--) {
    const token = events[index][1];
    if ((token.type === "labelLink" || token.type === "labelImage") && !token._balanced) {
      result = true;
      break;
    }
    if (token._gfmAutolinkLiteralWalkedInto) {
      result = false;
      break;
    }
  }
  if (events.length > 0 && !result) {
    events[events.length - 1][1]._gfmAutolinkLiteralWalkedInto = true;
  }
  return result;
}
export {
  ChevronDown as C,
  INSIDE_RADIO_GROUP_KEY as I,
  NcCheckboxRadioSwitch as N,
  RouterLink as R,
  _sfc_main$i as _,
  NcSelect as a,
  NcInputField as b,
  _sfc_main$c as c,
  debounce as d,
  IconClose as e,
  getLinkWithPicker as g,
  registerWidget as r,
  searchProvider as s
};
//# sourceMappingURL=NcRichText-Dkk6iX8F-B1jLjmLZ.js.map
