const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      window.OC.filePath('agora', '', 'js/index-qlWzETOt.chunk.mjs'),
      window.OC.filePath('agora', '', 'js/NcEmptyContent-q-geAf0w-DsDiM4c8.chunk.mjs'),
    ])
) => i.map((i) => d[i])
;(function () {
  'use strict'
  try {
    if (typeof document != 'undefined') {
      var elementStyle = document.createElement('style')
      elementStyle.appendChild(
        document.createTextNode(
          '@charset "UTF-8";/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/*\n* Ensure proper alignment of the vue material icons\n*/\n.material-design-icon[data-v-ae9805f8] {\n  display: flex;\n  align-self: center;\n  justify-self: center;\n  align-items: center;\n  justify-content: center;\n}\n.input-field[data-v-ae9805f8] {\n  --input-border-radius: var(--border-radius-element);\n  --input-padding-start: var(--border-radius-element);\n  --input-padding-end: var(--border-radius-element);\n  position: relative;\n  width: 100%;\n  margin-block-start: 6px;\n}\n.input-field--disabled[data-v-ae9805f8] {\n  opacity: 0.4;\n  filter: saturate(0.4);\n}\n.input-field--label-outside[data-v-ae9805f8] {\n  margin-block-start: 0;\n}\n.input-field--leading-icon[data-v-ae9805f8] {\n  --input-padding-start: calc(var(--default-clickable-area) - var(--default-grid-baseline));\n}\n.input-field--trailing-icon[data-v-ae9805f8] {\n  --input-padding-end: calc(var(--default-clickable-area) - var(--default-grid-baseline));\n}\n.input-field--pill[data-v-ae9805f8] {\n  --input-border-radius: var(--border-radius-pill);\n}\n.input-field__main-wrapper[data-v-ae9805f8] {\n  height: var(--default-clickable-area);\n  position: relative;\n}\n.input-field__input[data-v-ae9805f8] {\n  --input-border-width-offset: calc(var(--border-width-input-focused, 2px) - var(--border-width-input, 2px));\n  background-color: var(--color-main-background);\n  color: var(--color-main-text);\n  border: var(--border-width-input, 2px) solid var(--color-border-maxcontrast);\n  border-radius: var(--input-border-radius);\n  cursor: pointer;\n  -webkit-appearance: textfield !important;\n  -moz-appearance: textfield !important;\n  appearance: textfield !important;\n  font-size: var(--default-font-size);\n  text-overflow: ellipsis;\n  height: calc(var(--default-clickable-area) - 2 * var(--input-border-width-offset)) !important;\n  width: 100%;\n  padding-inline: calc(var(--input-padding-start) + var(--input-border-width-offset)) calc(var(--input-padding-end) + var(--input-border-width-offset));\n  padding-block: var(--input-border-width-offset);\n}\n.input-field__input[data-v-ae9805f8]::placeholder {\n  color: var(--color-text-maxcontrast);\n}\n.input-field__input[data-v-ae9805f8]::-webkit-search-cancel-button {\n  display: none;\n}\n.input-field__input[data-v-ae9805f8]::-webkit-search-decoration, .input-field__input[data-v-ae9805f8]::-webkit-search-results-button, .input-field__input[data-v-ae9805f8]::-webkit-search-results-decoration, .input-field__input[data-v-ae9805f8]::-ms-clear {\n  display: none;\n}\n.input-field__input[data-v-ae9805f8]:active:not([disabled]), .input-field__input[data-v-ae9805f8]:hover:not([disabled]), .input-field__input[data-v-ae9805f8]:focus:not([disabled]) {\n  border-color: var(--color-main-text);\n  border-width: var(--border-width-input-focused, 2px);\n  box-shadow: 0 0 0 2px var(--color-main-background) !important;\n  --input-border-width-offset: 0px;\n}\n.input-field__input:focus + .input-field__label[data-v-ae9805f8], .input-field__input:hover:not(:placeholder-shown) + .input-field__label[data-v-ae9805f8] {\n  color: var(--color-main-text);\n}\n.input-field__input[data-v-ae9805f8]:focus {\n  cursor: text;\n}\n.input-field__input[data-v-ae9805f8]:disabled {\n  cursor: default;\n}\n.input-field__input[data-v-ae9805f8]:focus-visible {\n  box-shadow: unset !important;\n}\n.input-field:not(.input-field--label-outside) .input-field__input[data-v-ae9805f8]:not(:focus)::placeholder {\n  opacity: 0;\n}\n.input-field__label[data-v-ae9805f8] {\n  --input-label-font-size: var(--default-font-size);\n  font-size: var(--input-label-font-size);\n  position: absolute;\n  margin-inline: var(--input-padding-start) var(--input-padding-end);\n  max-width: fit-content;\n  inset-block-start: calc((var(--default-clickable-area) - 1lh) / 2);\n  inset-inline: var(--border-width-input-focused, 2px);\n  color: var(--color-text-maxcontrast);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  pointer-events: none;\n  transition: height var(--animation-quick), inset-block-start var(--animation-quick), font-size var(--animation-quick), color var(--animation-quick), background-color var(--animation-quick) var(--animation-slow);\n}\n.input-field__input:focus + .input-field__label[data-v-ae9805f8], .input-field__input:not(:placeholder-shown) + .input-field__label[data-v-ae9805f8] {\n  --input-label-font-size: 13px;\n  line-height: 1.5;\n  inset-block-start: calc(-1.5 * var(--input-label-font-size) / 2);\n  font-weight: 500;\n  border-radius: var(--default-grid-baseline) var(--default-grid-baseline) 0 0;\n  background-color: var(--color-main-background);\n  padding-inline: var(--default-grid-baseline);\n  margin-inline: calc(var(--input-padding-start) - var(--default-grid-baseline)) calc(var(--input-padding-end) - var(--default-grid-baseline));\n  transition: height var(--animation-quick), inset-block-start var(--animation-quick), font-size var(--animation-quick), color var(--animation-quick);\n}\n.input-field__icon[data-v-ae9805f8] {\n  position: absolute;\n  height: var(--default-clickable-area);\n  width: var(--default-clickable-area);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  opacity: 0.7;\n  inset-block-end: 0;\n}\n.input-field__icon--leading[data-v-ae9805f8] {\n  inset-inline-start: 0px;\n}\n.input-field__icon--trailing[data-v-ae9805f8] {\n  inset-inline-end: 0px;\n}\n.input-field__trailing-button[data-v-ae9805f8] {\n  --button-size: calc(var(--default-clickable-area) - 2 * var(--border-width-input-focused, 2px)) !important;\n  --button-radius: calc(var(--input-border-radius) - var(--border-width-input-focused, 2px));\n}\n.input-field__trailing-button.button-vue[data-v-ae9805f8] {\n  position: absolute;\n  top: var(--border-width-input-focused, 2px);\n  inset-inline-end: var(--border-width-input-focused, 2px);\n}\n.input-field__trailing-button.button-vue[data-v-ae9805f8]:focus-visible {\n  box-shadow: none !important;\n}\n.input-field__helper-text-message[data-v-ae9805f8] {\n  padding-block: 4px;\n  padding-inline: var(--border-radius-element);\n  display: flex;\n  align-items: center;\n  color: var(--color-text-maxcontrast);\n}\n.input-field__helper-text-message__icon[data-v-ae9805f8] {\n  margin-inline-end: 8px;\n}\n.input-field--error .input-field__helper-text-message[data-v-ae9805f8],\n.input-field--error .input-field__icon--trailing[data-v-ae9805f8] {\n  color: var(--color-text-error, var(--color-error));\n}\n.input-field--error .input-field__input[data-v-ae9805f8], .input-field__input[data-v-ae9805f8]:user-invalid {\n  border-color: var(--color-border-error, var(--color-error)) !important;\n}\n.input-field--error .input-field__input[data-v-ae9805f8]:focus-visible, .input-field__input[data-v-ae9805f8]:user-invalid:focus-visible {\n  box-shadow: rgb(248, 250, 252) 0px 0px 0px 2px, var(--color-primary-element) 0px 0px 0px 4px, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;\n}\n.input-field--success .input-field__input[data-v-ae9805f8] {\n  border-color: var(--color-border-success, var(--color-success)) !important;\n}\n.input-field--success .input-field__input[data-v-ae9805f8]:focus-visible {\n  box-shadow: rgb(248, 250, 252) 0px 0px 0px 2px, var(--color-primary-element) 0px 0px 0px 4px, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;\n}\n.input-field--success .input-field__helper-text-message__icon[data-v-ae9805f8] {\n  color: var(--color-border-success, var(--color-success));\n}/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/*\n* Ensure proper alignment of the vue material icons\n*/\n.material-design-icon[data-v-e7ac5ac5] {\n  display: flex;\n  align-self: center;\n  justify-self: center;\n  align-items: center;\n  justify-content: center;\n}\n.checkbox-content[data-v-e7ac5ac5] {\n  display: flex;\n  align-items: center;\n  flex-direction: row;\n  gap: var(--default-grid-baseline);\n  user-select: none;\n  min-height: var(--default-clickable-area);\n  border-radius: var(--checkbox-radio-switch--border-radius);\n  padding: var(--default-grid-baseline) calc((var(--default-clickable-area) - var(--icon-height)) / 2);\n  width: 100%;\n  max-width: fit-content;\n}\n.checkbox-content__text[data-v-e7ac5ac5] {\n  flex: 1 0;\n}\n.checkbox-content__text[data-v-e7ac5ac5]:empty {\n  display: none;\n}\n.checkbox-content-checkbox:not(.checkbox-content--button-variant) .checkbox-content__icon[data-v-e7ac5ac5], .checkbox-content-radio:not(.checkbox-content--button-variant) .checkbox-content__icon[data-v-e7ac5ac5], .checkbox-content-switch:not(.checkbox-content--button-variant) .checkbox-content__icon[data-v-e7ac5ac5] {\n  margin-block: calc((var(--default-clickable-area) - 2 * var(--default-grid-baseline) - var(--icon-height)) / 2) auto;\n}\n.checkbox-content__icon[data-v-e7ac5ac5] > * {\n  width: var(--icon-size);\n  height: var(--icon-height);\n  color: var(--color-primary-element);\n}\n.checkbox-content--button-variant .checkbox-content__icon[data-v-e7ac5ac5]:not(.checkbox-content__icon--checked) > * {\n  color: var(--color-primary-element);\n}\n.checkbox-content--button-variant .checkbox-content__icon--checked[data-v-e7ac5ac5] > * {\n  color: var(--color-primary-element-text);\n}\n.checkbox-content--has-text[data-v-e7ac5ac5] {\n  padding-inline-end: calc((var(--default-clickable-area) - 16px) / 2);\n}\n.checkbox-content[data-v-e7ac5ac5], .checkbox-content[data-v-e7ac5ac5] * {\n  cursor: pointer;\n  flex-shrink: 0;\n}/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/*\n* Ensure proper alignment of the vue material icons\n*/\n.material-design-icon[data-v-10606260] {\n  display: flex;\n  align-self: center;\n  justify-self: center;\n  align-items: center;\n  justify-content: center;\n}\n.checkbox-radio-switch[data-v-10606260] {\n  --icon-size: var(--0b7fadd0);\n  --icon-height: var(--57d4f07e);\n  --checkbox-radio-switch--border-radius: var(--border-radius-element);\n  --checkbox-radio-switch--border-radius-outer: calc(var(--checkbox-radio-switch--border-radius) + 2px);\n  display: flex;\n  align-items: center;\n  color: var(--color-main-text);\n  background-color: transparent;\n  font-size: var(--default-font-size);\n  line-height: var(--default-line-height);\n  padding: 0;\n  position: relative;\n  /* Special rules for vertical button groups */\n  /* Special rules for horizontal button groups */\n}\n.checkbox-radio-switch__input[data-v-10606260] {\n  position: absolute;\n  z-index: -1;\n  opacity: 0 !important;\n  width: var(--icon-size);\n  height: var(--icon-size);\n}\n.checkbox-radio-switch__input:focus-visible + .checkbox-radio-switch__content[data-v-10606260], .checkbox-radio-switch__input[data-v-10606260]:focus-visible {\n  outline: 2px solid var(--color-main-text);\n  border-color: var(--color-main-background);\n  outline-offset: -2px;\n}\n.checkbox-radio-switch--disabled .checkbox-radio-switch__content[data-v-10606260] {\n  opacity: 0.5;\n}\n.checkbox-radio-switch--disabled .checkbox-radio-switch__content[data-v-10606260] .checkbox-radio-switch__icon > * {\n  color: var(--color-main-text);\n}\n.checkbox-radio-switch--disabled .checkbox-radio-switch__content.checkbox-content[data-v-10606260], .checkbox-radio-switch--disabled .checkbox-radio-switch__content.checkbox-content[data-v-10606260] *:not(a) {\n  cursor: default !important;\n}\n.checkbox-radio-switch:not(.checkbox-radio-switch--disabled, .checkbox-radio-switch--checked):focus-within .checkbox-radio-switch__content[data-v-10606260], .checkbox-radio-switch:not(.checkbox-radio-switch--disabled, .checkbox-radio-switch--checked) .checkbox-radio-switch__content[data-v-10606260]:hover {\n  background-color: var(--color-background-hover);\n}\n.checkbox-radio-switch--checked:not(.checkbox-radio-switch--disabled):focus-within .checkbox-radio-switch__content[data-v-10606260], .checkbox-radio-switch--checked:not(.checkbox-radio-switch--disabled) .checkbox-radio-switch__content[data-v-10606260]:hover {\n  background-color: var(--color-primary-element-hover);\n}\n.checkbox-radio-switch--checked:not(.checkbox-radio-switch--button-variant):not(.checkbox-radio-switch--disabled):focus-within .checkbox-radio-switch__content[data-v-10606260], .checkbox-radio-switch--checked:not(.checkbox-radio-switch--button-variant):not(.checkbox-radio-switch--disabled) .checkbox-radio-switch__content[data-v-10606260]:hover {\n  background-color: var(--color-primary-element-light-hover);\n}\n.checkbox-radio-switch-switch[data-v-10606260]:not(.checkbox-radio-switch--checked) .checkbox-radio-switch__icon > * {\n  color: var(--color-text-maxcontrast);\n}\n.checkbox-radio-switch-switch.checkbox-radio-switch--disabled.checkbox-radio-switch--checked[data-v-10606260] .checkbox-radio-switch__icon > * {\n  color: var(--color-primary-element-light);\n}\n.checkbox-radio-switch--button-variant.checkbox-radio-switch[data-v-10606260] {\n  background-color: var(--color-main-background);\n  border: 2px solid var(--color-border-maxcontrast);\n  overflow: hidden;\n}\n.checkbox-radio-switch--button-variant.checkbox-radio-switch--checked[data-v-10606260] {\n  font-weight: bold;\n}\n.checkbox-radio-switch--button-variant.checkbox-radio-switch--checked .checkbox-radio-switch__content[data-v-10606260] {\n  background-color: var(--color-primary-element);\n  color: var(--color-primary-element-text);\n}\n.checkbox-radio-switch--button-variant[data-v-10606260] .checkbox-radio-switch__text {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  width: 100%;\n}\n.checkbox-radio-switch--button-variant[data-v-10606260]:not(.checkbox-radio-switch--checked) .checkbox-radio-switch__icon > * {\n  color: var(--color-main-text);\n}\n.checkbox-radio-switch--button-variant[data-v-10606260] .checkbox-radio-switch__icon:empty {\n  display: none;\n}\n.checkbox-radio-switch--button-variant[data-v-10606260]:not(.checkbox-radio-switch--button-variant-v-grouped):not(.checkbox-radio-switch--button-variant-h-grouped), .checkbox-radio-switch--button-variant .checkbox-radio-switch__content[data-v-10606260] {\n  border-radius: var(--checkbox-radio-switch--border-radius);\n}\n.checkbox-radio-switch--button-variant-v-grouped .checkbox-radio-switch__content[data-v-10606260] {\n  flex-basis: 100%;\n  max-width: unset;\n}\n.checkbox-radio-switch--button-variant-v-grouped[data-v-10606260]:first-of-type {\n  border-start-start-radius: var(--checkbox-radio-switch--border-radius-outer);\n  border-start-end-radius: var(--checkbox-radio-switch--border-radius-outer);\n}\n.checkbox-radio-switch--button-variant-v-grouped[data-v-10606260]:last-of-type {\n  border-end-start-radius: var(--checkbox-radio-switch--border-radius-outer);\n  border-end-end-radius: var(--checkbox-radio-switch--border-radius-outer);\n}\n.checkbox-radio-switch--button-variant-v-grouped[data-v-10606260]:not(:last-of-type) {\n  border-bottom: 0 !important;\n}\n.checkbox-radio-switch--button-variant-v-grouped:not(:last-of-type) .checkbox-radio-switch__content[data-v-10606260] {\n  margin-bottom: 2px;\n}\n.checkbox-radio-switch--button-variant-v-grouped[data-v-10606260]:not(:first-of-type) {\n  border-top: 0 !important;\n}\n.checkbox-radio-switch--button-variant-h-grouped[data-v-10606260]:first-of-type {\n  border-start-start-radius: var(--checkbox-radio-switch--border-radius-outer);\n  border-end-start-radius: var(--checkbox-radio-switch--border-radius-outer);\n}\n.checkbox-radio-switch--button-variant-h-grouped[data-v-10606260]:last-of-type {\n  border-start-end-radius: var(--checkbox-radio-switch--border-radius-outer);\n  border-end-end-radius: var(--checkbox-radio-switch--border-radius-outer);\n}\n.checkbox-radio-switch--button-variant-h-grouped[data-v-10606260]:not(:last-of-type) {\n  border-inline-end: 0 !important;\n}\n.checkbox-radio-switch--button-variant-h-grouped:not(:last-of-type) .checkbox-radio-switch__content[data-v-10606260] {\n  margin-inline-end: 2px;\n}\n.checkbox-radio-switch--button-variant-h-grouped[data-v-10606260]:not(:first-of-type) {\n  border-inline-start: 0 !important;\n}\n.checkbox-radio-switch--button-variant-h-grouped[data-v-10606260] .checkbox-radio-switch__text {\n  text-align: center;\n  display: flex;\n  align-items: center;\n}\n.checkbox-radio-switch--button-variant-h-grouped .checkbox-radio-switch__content[data-v-10606260] {\n  flex-direction: column;\n  justify-content: center;\n  width: 100%;\n  margin: 0;\n  gap: 0;\n}/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/*\n* Ensure proper alignment of the vue material icons\n*/\n.material-design-icon {\n  display: flex;\n  align-self: center;\n  justify-self: center;\n  align-items: center;\n  justify-content: center;\n}\nbody {\n  /**\n   * Set custom vue-select CSS variables.\n   * Needs to be on the body (not :root) for theming to apply (see nextcloud/server#36462)\n   */\n  /* Search Input */\n  --vs-search-input-color: var(--color-main-text);\n  --vs-search-input-bg: var(--color-main-background);\n  --vs-search-input-placeholder-color: var(--color-text-maxcontrast);\n  /* Font */\n  --vs-font-size: var(--default-font-size);\n  --vs-line-height: var(--default-line-height);\n  /* Disabled State */\n  --vs-state-disabled-bg: var(--color-background-hover);\n  --vs-state-disabled-color: var(--color-text-maxcontrast);\n  --vs-state-disabled-controls-color: var(--color-text-maxcontrast);\n  --vs-state-disabled-cursor: not-allowed;\n  --vs-disabled-bg: var(--color-background-hover);\n  --vs-disabled-color: var(--color-text-maxcontrast);\n  --vs-disabled-cursor: not-allowed;\n  /* Borders */\n  --vs-border-color: var(--color-border-maxcontrast);\n  --vs-border-width: var(--border-width-input, 2px) !important;\n  --vs-border-style: solid;\n  --vs-border-radius: var(--border-radius-element);\n  /* Component Controls: Clear, Open Indicator */\n  --vs-controls-color: var(--color-main-text);\n  /* Selected */\n  --vs-selected-bg: var(--color-background-hover);\n  --vs-selected-color: var(--color-main-text);\n  --vs-selected-border-color: var(--vs-border-color);\n  --vs-selected-border-style: var(--vs-border-style);\n  --vs-selected-border-width: var(--vs-border-width);\n  /* Dropdown */\n  --vs-dropdown-bg: var(--color-main-background);\n  --vs-dropdown-color: var(--color-main-text);\n  --vs-dropdown-z-index: 9999;\n  --vs-dropdown-box-shadow: 0px 2px 2px 0px var(--color-box-shadow);\n  /* Options */\n  --vs-dropdown-option-padding: 8px 20px;\n  /* Active State */\n  --vs-dropdown-option--active-bg: var(--color-background-hover);\n  --vs-dropdown-option--active-color: var(--color-main-text);\n  /* Keyboard Focus State */\n  --vs-dropdown-option--kb-focus-box-shadow: inset 0px 0px 0px 2px var(--vs-border-color);\n  /* Deselect State */\n  --vs-dropdown-option--deselect-bg: var(--color-error);\n  --vs-dropdown-option--deselect-color: #fff;\n  /* Transitions */\n  --vs-transition-duration: 0ms;\n  /* Actions */\n  --vs-actions-padding: 0 8px 0 4px;\n}\n.v-select.select {\n  /* Override default vue-select styles */\n  min-height: var(--default-clickable-area);\n  min-width: 260px;\n  margin: 0 0 var(--default-grid-baseline);\n}\n.v-select.select.vs--open {\n  --vs-border-width: var(--border-width-input-focused, 2px);\n}\n.v-select.select .select__label {\n  display: block;\n  margin-bottom: 2px;\n}\n.v-select.select .vs__selected {\n  height: calc(var(--default-clickable-area) - 2 * var(--vs-border-width) - var(--default-grid-baseline));\n  margin: calc(var(--default-grid-baseline) / 2);\n  padding-block: 0;\n  padding-inline: 12px 8px;\n  border-radius: 16px !important;\n  background: var(--color-primary-element-light);\n  border: none;\n}\n.v-select.select.vs--open .vs__selected:first-of-type {\n  margin-inline-start: calc(var(--default-grid-baseline) / 2 - (var(--border-width-input-focused, 2px) - var(--border-width-input, 2px))) !important;\n}\n.v-select.select .vs__search {\n  text-overflow: ellipsis;\n  color: var(--color-main-text);\n  min-height: unset !important;\n  height: calc(var(--default-clickable-area) - 2 * var(--vs-border-width)) !important;\n}\n.v-select.select .vs__search::placeholder {\n  color: var(--color-text-maxcontrast);\n}\n.v-select.select .vs__search, .v-select.select .vs__search:focus {\n  margin: 0;\n}\n.v-select.select .vs__dropdown-toggle {\n  position: relative;\n  max-height: 100px;\n  padding: 0;\n  overflow-y: auto;\n}\n.v-select.select .vs__actions {\n  position: sticky;\n  top: 0;\n}\n.v-select.select .vs__clear {\n  margin-inline-end: 2px;\n}\n.v-select.select.vs--open .vs__dropdown-toggle {\n  border-width: var(--border-width-input-focused);\n  outline: 2px solid var(--color-main-background);\n  border-color: var(--color-main-text);\n  border-bottom-color: transparent;\n}\n.v-select.select:not(.vs--disabled, .vs--open) .vs__dropdown-toggle:hover {\n  outline: 2px solid var(--color-main-background);\n  border-color: var(--color-main-text);\n}\n.v-select.select.vs--disabled .vs__search,\n.v-select.select.vs--disabled .vs__selected {\n  color: var(--color-text-maxcontrast);\n}\n.v-select.select.vs--disabled .vs__clear,\n.v-select.select.vs--disabled .vs__deselect {\n  display: none;\n}\n.v-select.select--no-wrap .vs__selected-options {\n  flex-wrap: nowrap;\n  overflow: auto;\n  min-width: unset;\n}\n.v-select.select--no-wrap .vs__selected-options .vs__selected {\n  min-width: unset;\n}\n.v-select.select--drop-up.vs--open .vs__dropdown-toggle {\n  border-radius: 0 0 var(--vs-border-radius) var(--vs-border-radius);\n  border-top-color: transparent;\n  border-bottom-color: var(--color-main-text);\n}\n.v-select.select .vs__selected-options {\n  min-height: calc(var(--default-clickable-area) - 2 * var(--vs-border-width));\n  padding: 0 5px;\n}\n.v-select.select .vs__selected-options .vs__selected ~ .vs__search[readonly] {\n  position: absolute;\n}\n.v-select.select.vs--single.vs--loading .vs__selected, .v-select.select.vs--single.vs--open .vs__selected {\n  max-width: 100%;\n  opacity: 1;\n  color: var(--color-text-maxcontrast);\n}\n.v-select.select.vs--single .vs__selected-options {\n  flex-wrap: nowrap;\n}\n.v-select.select.vs--single .vs__selected {\n  background: unset !important;\n}\n.vs__dropdown-menu {\n  border-width: var(--border-width-input-focused) !important;\n  border-color: var(--color-main-text) !important;\n  outline: none !important;\n  box-shadow: -2px 0 0 var(--color-main-background), 0 2px 0 var(--color-main-background), 2px 0 0 var(--color-main-background), !important;\n  padding: 4px !important;\n}\n.vs__dropdown-menu--floating {\n  /* Fallback styles overidden by programmatically set inline styles */\n  width: max-content;\n  position: absolute;\n  top: 0;\n  inset-inline-start: 0;\n}\n.vs__dropdown-menu--floating-placement-top {\n  border-radius: var(--vs-border-radius) var(--vs-border-radius) 0 0 !important;\n  border-top-style: var(--vs-border-style) !important;\n  border-bottom-style: none !important;\n  box-shadow: 0 -2px 0 var(--color-main-background), -2px 0 0 var(--color-main-background), 2px 0 0 var(--color-main-background), !important;\n}\n.vs__dropdown-menu .vs__dropdown-option {\n  border-radius: 6px !important;\n}\n.vs__dropdown-menu .vs__no-options {\n  color: var(--color-text-maxcontrast) !important;\n}:root{--vs-colors--lightest: rgba(60, 60, 60, .26);--vs-colors--light: rgba(60, 60, 60, .5);--vs-colors--dark: #333;--vs-colors--darkest: rgba(0, 0, 0, .15);--vs-search-input-color: inherit;--vs-search-input-placeholder-color: inherit;--vs-font-size: 1rem;--vs-line-height: 1.4;--vs-state-disabled-bg: rgb(248, 248, 248);--vs-state-disabled-color: var(--vs-colors--light);--vs-state-disabled-controls-color: var(--vs-colors--light);--vs-state-disabled-cursor: not-allowed;--vs-border-color: var(--vs-colors--lightest);--vs-border-width: 1px;--vs-border-style: solid;--vs-border-radius: 4px;--vs-actions-padding: 4px 6px 0 3px;--vs-controls-color: var(--vs-colors--light);--vs-controls-size: 1;--vs-controls--deselect-text-shadow: 0 1px 0 #fff;--vs-selected-bg: #f0f0f0;--vs-selected-color: var(--vs-colors--dark);--vs-selected-border-color: var(--vs-border-color);--vs-selected-border-style: var(--vs-border-style);--vs-selected-border-width: var(--vs-border-width);--vs-dropdown-bg: #fff;--vs-dropdown-color: inherit;--vs-dropdown-z-index: 1000;--vs-dropdown-min-width: 160px;--vs-dropdown-max-height: 350px;--vs-dropdown-box-shadow: 0px 3px 6px 0px var(--vs-colors--darkest);--vs-dropdown-option-bg: #000;--vs-dropdown-option-color: var(--vs-dropdown-color);--vs-dropdown-option-padding: 3px 20px;--vs-dropdown-option--active-bg: #5897fb;--vs-dropdown-option--active-color: #fff;--vs-dropdown-option--deselect-bg: #fb5858;--vs-dropdown-option--deselect-color: #fff;--vs-transition-timing-function: cubic-bezier(1, -.115, .975, .855);--vs-transition-duration: .15s}.v-select{position:relative;font-family:inherit}.v-select,.v-select *{box-sizing:border-box}:root{--vs-transition-timing-function: cubic-bezier(1, .5, .8, 1);--vs-transition-duration: .15s}@-webkit-keyframes vSelectSpinner{0%{transform:rotate(0)}to{transform:rotate(360deg)}}@keyframes vSelectSpinner{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.vs__fade-enter-active,.vs__fade-leave-active{pointer-events:none;transition:opacity var(--vs-transition-duration) var(--vs-transition-timing-function)}.vs__fade-enter,.vs__fade-leave-to{opacity:0}:root{--vs-disabled-bg: var(--vs-state-disabled-bg);--vs-disabled-color: var(--vs-state-disabled-color);--vs-disabled-cursor: var(--vs-state-disabled-cursor)}.vs--disabled .vs__dropdown-toggle,.vs--disabled .vs__clear,.vs--disabled .vs__search,.vs--disabled .vs__selected,.vs--disabled .vs__open-indicator{cursor:var(--vs-disabled-cursor);background-color:var(--vs-disabled-bg)}.v-select[dir=rtl] .vs__actions{padding:0 3px 0 6px}.v-select[dir=rtl] .vs__clear{margin-left:6px;margin-right:0}.v-select[dir=rtl] .vs__deselect{margin-left:0;margin-right:2px}.v-select[dir=rtl] .vs__dropdown-menu{text-align:right}.vs__dropdown-toggle{-webkit-appearance:none;-moz-appearance:none;appearance:none;display:flex;padding:0 0 4px;background:none;border:var(--vs-border-width) var(--vs-border-style) var(--vs-border-color);border-radius:var(--vs-border-radius);white-space:normal}.vs__selected-options{display:flex;flex-basis:100%;flex-grow:1;flex-wrap:wrap;padding:0 2px;position:relative}.vs__actions{display:flex;align-items:center;padding:var(--vs-actions-padding)}.vs--searchable .vs__dropdown-toggle{cursor:text}.vs--unsearchable .vs__dropdown-toggle{cursor:pointer}.vs--open .vs__dropdown-toggle{border-bottom-color:transparent;border-bottom-left-radius:0;border-bottom-right-radius:0}.vs__open-indicator{fill:var(--vs-controls-color);transform:scale(var(--vs-controls-size));transition:transform var(--vs-transition-duration) var(--vs-transition-timing-function);transition-timing-function:var(--vs-transition-timing-function)}.vs--open .vs__open-indicator{transform:rotate(180deg) scale(var(--vs-controls-size))}.vs--loading .vs__open-indicator{opacity:0}.vs__clear{fill:var(--vs-controls-color);padding:0;border:0;background-color:transparent;cursor:pointer;margin-right:8px}.vs__dropdown-menu{display:block;box-sizing:border-box;position:absolute;top:calc(100% - var(--vs-border-width));left:0;z-index:var(--vs-dropdown-z-index);padding:5px 0;margin:0;width:100%;max-height:var(--vs-dropdown-max-height);min-width:var(--vs-dropdown-min-width);overflow-y:auto;box-shadow:var(--vs-dropdown-box-shadow);border:var(--vs-border-width) var(--vs-border-style) var(--vs-border-color);border-top-style:none;border-radius:0 0 var(--vs-border-radius) var(--vs-border-radius);text-align:left;list-style:none;background:var(--vs-dropdown-bg);color:var(--vs-dropdown-color)}.vs__no-options{text-align:center}.vs__dropdown-option{line-height:1.42857143;display:block;padding:var(--vs-dropdown-option-padding);clear:both;color:var(--vs-dropdown-option-color);white-space:nowrap;cursor:pointer}.vs__dropdown-option--highlight{background:var(--vs-dropdown-option--active-bg);color:var(--vs-dropdown-option--active-color)}.vs__dropdown-option--deselect{background:var(--vs-dropdown-option--deselect-bg);color:var(--vs-dropdown-option--deselect-color)}.vs__dropdown-option--disabled{background:var(--vs-state-disabled-bg);color:var(--vs-state-disabled-color);cursor:var(--vs-state-disabled-cursor)}.vs__selected{display:flex;align-items:center;background-color:var(--vs-selected-bg);border:var(--vs-selected-border-width) var(--vs-selected-border-style) var(--vs-selected-border-color);border-radius:var(--vs-border-radius);color:var(--vs-selected-color);line-height:var(--vs-line-height);margin:4px 2px 0;padding:0 .25em;z-index:0}.vs__deselect{display:inline-flex;-webkit-appearance:none;-moz-appearance:none;appearance:none;margin-left:4px;padding:0;border:0;cursor:pointer;background:none;fill:var(--vs-controls-color);text-shadow:var(--vs-controls--deselect-text-shadow)}.vs--single .vs__selected{background-color:transparent;border-color:transparent}.vs--single.vs--open .vs__selected,.vs--single.vs--loading .vs__selected{position:absolute;opacity:.4}.vs--single.vs--searching .vs__selected{display:none}.vs__search::-webkit-search-cancel-button{display:none}.vs__search::-webkit-search-decoration,.vs__search::-webkit-search-results-button,.vs__search::-webkit-search-results-decoration,.vs__search::-ms-clear{display:none}.vs__search,.vs__search:focus{color:var(--vs-search-input-color);-webkit-appearance:none;-moz-appearance:none;appearance:none;line-height:var(--vs-line-height);font-size:var(--vs-font-size);border:1px solid transparent;border-left:none;outline:none;margin:4px 0 0;padding:0 7px;background:none;box-shadow:none;width:0;max-width:100%;flex-grow:1;z-index:1}.vs__search::-moz-placeholder{color:var(--vs-search-input-placeholder-color)}.vs__search::placeholder{color:var(--vs-search-input-placeholder-color)}.vs--unsearchable .vs__search{opacity:1}.vs--unsearchable:not(.vs--disabled) .vs__search{cursor:pointer}.vs--single.vs--searching:not(.vs--open):not(.vs--loading) .vs__search{opacity:.2}.vs__spinner{align-self:center;opacity:0;font-size:5px;text-indent:-9999em;overflow:hidden;border-top:.9em solid rgba(100,100,100,.1);border-right:.9em solid rgba(100,100,100,.1);border-bottom:.9em solid rgba(100,100,100,.1);border-left:.9em solid rgba(60,60,60,.45);transform:translateZ(0) scale(var(--vs-controls--spinner-size, var(--vs-controls-size)));-webkit-animation:vSelectSpinner 1.1s infinite linear;animation:vSelectSpinner 1.1s infinite linear;transition:opacity .1s}.vs__spinner,.vs__spinner:after{border-radius:50%;width:5em;height:5em;transform:scale(var(--vs-controls--spinner-size, var(--vs-controls-size)))}.vs--loading .vs__spinner{opacity:1}\n/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/*\n* Ensure proper alignment of the vue material icons\n*/\n.material-design-icon[data-v-eeeedf6b] {\n  display: flex;\n  align-self: center;\n  justify-self: center;\n  align-items: center;\n  justify-content: center;\n}\n.name-parts[data-v-eeeedf6b] {\n  display: flex;\n  max-width: 100%;\n  cursor: inherit;\n}\n.name-parts__first[data-v-eeeedf6b] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.name-parts__first[data-v-eeeedf6b], .name-parts__last[data-v-eeeedf6b] {\n  white-space: pre;\n  cursor: inherit;\n}\n.name-parts__first strong[data-v-eeeedf6b], .name-parts__last strong[data-v-eeeedf6b] {\n  font-weight: bold;\n}/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/*\n* Ensure proper alignment of the vue material icons\n*/\n.material-design-icon[data-v-8e70b916] {\n  display: flex;\n  align-self: center;\n  justify-self: center;\n  align-items: center;\n  justify-content: center;\n}\n.widgets--list[data-v-8e70b916] {\n  width: 100%;\n  min-height: var(--default-clickable-area);\n}\n/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/*\n* Ensure proper alignment of the vue material icons\n*/\n.material-design-icon[data-v-19dbe6da] {\n  display: flex;\n  align-self: center;\n  justify-self: center;\n  align-items: center;\n  justify-content: center;\n}\n\n/**\n * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n* Colors and class selectors are extracted from source code of:\n* - library: highlight.js (v11.10.0)\n* - light theme: highlight.js/styles/github.css\n* - dark theme: highlight.js/styles/github-dark.css\n* and reworked to use with Nextcloud dark and light theme\n*/\n.rich-text--wrapper[data-v-19dbe6da] {\n  overflow-wrap: break-word;\n  line-height: 1.5;\n}\n.rich-text--wrapper .rich-text--fallback[data-v-19dbe6da], .rich-text--wrapper .rich-text-component[data-v-19dbe6da] {\n  display: inline;\n}\n.rich-text--wrapper .rich-text--external-link[data-v-19dbe6da] {\n  text-decoration: underline;\n}\n.rich-text--wrapper .rich-text--external-link[data-v-19dbe6da]:after {\n  content: " ↗";\n}\n\n/* Markdown styles */\n.rich-text--wrapper-markdown[data-v-19dbe6da] {\n  tab-size: 4;\n  /* Flavored Markdown styles */\n}\n.rich-text--wrapper-markdown[data-v-19dbe6da] > :first-child,\n.rich-text--wrapper-markdown div[data-v-19dbe6da] > :first-child,\n.rich-text--wrapper-markdown blockquote[data-v-19dbe6da] > :first-child {\n  margin-top: 0 !important;\n}\n.rich-text--wrapper-markdown[data-v-19dbe6da] > :last-child, .rich-text--wrapper-markdown[data-v-19dbe6da] > *:has(+ .rich-text--reference-widget),\n.rich-text--wrapper-markdown div[data-v-19dbe6da] > :last-child,\n.rich-text--wrapper-markdown blockquote[data-v-19dbe6da] > :last-child {\n  margin-block-end: 0 !important;\n}\n.rich-text--wrapper-markdown blockquote[data-v-19dbe6da] {\n  padding-inline-start: 13px;\n  border-inline-start: 2px solid var(--color-border-dark);\n  color: var(--color-text-maxcontrast);\n}\n.rich-text--wrapper-markdown h1[data-v-19dbe6da], .rich-text--wrapper-markdown h2[data-v-19dbe6da], .rich-text--wrapper-markdown h3[data-v-19dbe6da], .rich-text--wrapper-markdown h4[data-v-19dbe6da], .rich-text--wrapper-markdown h5[data-v-19dbe6da], .rich-text--wrapper-markdown h6[data-v-19dbe6da], .rich-text--wrapper-markdown p[data-v-19dbe6da], .rich-text--wrapper-markdown ul[data-v-19dbe6da], .rich-text--wrapper-markdown ol[data-v-19dbe6da], .rich-text--wrapper-markdown blockquote[data-v-19dbe6da], .rich-text--wrapper-markdown pre[data-v-19dbe6da] {\n  margin-top: 0;\n  margin-block-end: 1em;\n}\n.rich-text--wrapper-markdown h1[data-v-19dbe6da], .rich-text--wrapper-markdown h2[data-v-19dbe6da], .rich-text--wrapper-markdown h3[data-v-19dbe6da], .rich-text--wrapper-markdown h4[data-v-19dbe6da], .rich-text--wrapper-markdown h5[data-v-19dbe6da], .rich-text--wrapper-markdown h6[data-v-19dbe6da] {\n  font-weight: bold;\n}\n.rich-text--wrapper-markdown h1[data-v-19dbe6da] {\n  font-size: 30px;\n}\n.rich-text--wrapper-markdown ul[data-v-19dbe6da], .rich-text--wrapper-markdown ol[data-v-19dbe6da] {\n  padding-inline-start: 4ch;\n}\n.rich-text--wrapper-markdown ul[data-v-19dbe6da] {\n  list-style-type: disc;\n}\n.rich-text--wrapper-markdown ul.contains-task-list[data-v-19dbe6da] {\n  list-style-type: none;\n  padding: 0;\n}\n.rich-text--wrapper-markdown li.task-list-item > ul[data-v-19dbe6da],\n.rich-text--wrapper-markdown li.task-list-item > ol[data-v-19dbe6da],\n.rich-text--wrapper-markdown li.task-list-item > li[data-v-19dbe6da],\n.rich-text--wrapper-markdown li.task-list-item > blockquote[data-v-19dbe6da],\n.rich-text--wrapper-markdown li.task-list-item > pre[data-v-19dbe6da] {\n  margin-inline-start: 15px;\n  margin-block-end: 0;\n}\n.rich-text--wrapper-markdown pre[data-v-19dbe6da] {\n  direction: ltr;\n}\n.rich-text--wrapper-markdown table[data-v-19dbe6da] {\n  border-collapse: collapse;\n  border: 2px solid var(--color-border-maxcontrast);\n}\n.rich-text--wrapper-markdown table th[data-v-19dbe6da],\n.rich-text--wrapper-markdown table td[data-v-19dbe6da] {\n  padding: var(--default-grid-baseline);\n  border: 1px solid var(--color-border-maxcontrast);\n}\n.rich-text--wrapper-markdown table th[data-v-19dbe6da]:first-child,\n.rich-text--wrapper-markdown table td[data-v-19dbe6da]:first-child {\n  border-inline-start: 0;\n}\n.rich-text--wrapper-markdown table th[data-v-19dbe6da]:last-child,\n.rich-text--wrapper-markdown table td[data-v-19dbe6da]:last-child {\n  border-inline-end: 0;\n}\n.rich-text--wrapper-markdown table tr:first-child th[data-v-19dbe6da] {\n  border-top: 0;\n}\n.rich-text--wrapper-markdown table tr:last-child td[data-v-19dbe6da] {\n  border-block-end: 0;\n}\n\n/* Highlight code syntax in code blocks */\n/* stylelint-disable-next-line no-duplicate-selectors */\n.rich-text--wrapper-markdown pre[data-v-19dbe6da]:has(.hljs) {\n  color: var(--hljs-color);\n  background: var(--hljs-background-color);\n}\n.rich-text--wrapper-markdown .hljs-doctag[data-v-19dbe6da],\n.rich-text--wrapper-markdown .hljs-keyword[data-v-19dbe6da],\n.rich-text--wrapper-markdown .hljs-meta .hljs-keyword[data-v-19dbe6da],\n.rich-text--wrapper-markdown .hljs-template-tag[data-v-19dbe6da],\n.rich-text--wrapper-markdown .hljs-template-variable[data-v-19dbe6da],\n.rich-text--wrapper-markdown .hljs-type[data-v-19dbe6da],\n.rich-text--wrapper-markdown .hljs-variable.language_[data-v-19dbe6da] {\n  /* prettylights-syntax-keyword */\n  color: var(--hljs-syntax-keyword-color);\n}\n.rich-text--wrapper-markdown .hljs-title[data-v-19dbe6da],\n.rich-text--wrapper-markdown .hljs-title.class_[data-v-19dbe6da],\n.rich-text--wrapper-markdown .hljs-title.class_.inherited__[data-v-19dbe6da],\n.rich-text--wrapper-markdown .hljs-title.function_[data-v-19dbe6da] {\n  /* prettylights-syntax-entity */\n  color: var(--hljs-syntax-entity-color);\n}\n.rich-text--wrapper-markdown .hljs-attr[data-v-19dbe6da],\n.rich-text--wrapper-markdown .hljs-attribute[data-v-19dbe6da],\n.rich-text--wrapper-markdown .hljs-literal[data-v-19dbe6da],\n.rich-text--wrapper-markdown .hljs-meta[data-v-19dbe6da],\n.rich-text--wrapper-markdown .hljs-number[data-v-19dbe6da],\n.rich-text--wrapper-markdown .hljs-operator[data-v-19dbe6da],\n.rich-text--wrapper-markdown .hljs-variable[data-v-19dbe6da],\n.rich-text--wrapper-markdown .hljs-selector-attr[data-v-19dbe6da],\n.rich-text--wrapper-markdown .hljs-selector-class[data-v-19dbe6da],\n.rich-text--wrapper-markdown .hljs-selector-id[data-v-19dbe6da] {\n  /* prettylights-syntax-constant */\n  color: var(--hljs-syntax-constant-color);\n}\n.rich-text--wrapper-markdown .hljs-regexp[data-v-19dbe6da],\n.rich-text--wrapper-markdown .hljs-string[data-v-19dbe6da],\n.rich-text--wrapper-markdown .hljs-meta .hljs-string[data-v-19dbe6da] {\n  /* prettylights-syntax-string */\n  color: var(--hljs-syntax-string-color);\n}\n.rich-text--wrapper-markdown .hljs-built_in[data-v-19dbe6da],\n.rich-text--wrapper-markdown .hljs-symbol[data-v-19dbe6da] {\n  /* prettylights-syntax-variable */\n  color: var(--hljs-syntax-variable-color);\n}\n.rich-text--wrapper-markdown .hljs-comment[data-v-19dbe6da],\n.rich-text--wrapper-markdown .hljs-code[data-v-19dbe6da],\n.rich-text--wrapper-markdown .hljs-formula[data-v-19dbe6da] {\n  /* prettylights-syntax-comment */\n  color: var(--hljs-syntax-comment-color);\n}\n.rich-text--wrapper-markdown .hljs-name[data-v-19dbe6da],\n.rich-text--wrapper-markdown .hljs-quote[data-v-19dbe6da],\n.rich-text--wrapper-markdown .hljs-selector-tag[data-v-19dbe6da],\n.rich-text--wrapper-markdown .hljs-selector-pseudo[data-v-19dbe6da] {\n  /* prettylights-syntax-entity-tag */\n  color: var(--hljs-syntax-entity-tag-color);\n}\n.rich-text--wrapper-markdown .hljs-subst[data-v-19dbe6da] {\n  /* prettylights-syntax-storage-modifier-import */\n  color: var(--hljs-syntax-storage-modifier-import-color);\n}\n.rich-text--wrapper-markdown .hljs-section[data-v-19dbe6da] {\n  /* prettylights-syntax-markup-heading */\n  color: var(--hljs-syntax-markup-heading-color);\n  font-weight: bold;\n}\n.rich-text--wrapper-markdown .hljs-bullet[data-v-19dbe6da] {\n  /* prettylights-syntax-markup-list */\n  color: var(--hljs-syntax-markup-list-color);\n}\n.rich-text--wrapper-markdown .hljs-emphasis[data-v-19dbe6da] {\n  /* prettylights-syntax-markup-italic */\n  color: var(--hljs-syntax-markup-italic-color);\n  font-style: italic;\n}\n.rich-text--wrapper-markdown .hljs-strong[data-v-19dbe6da] {\n  /* prettylights-syntax-markup-bold */\n  color: var(--hljs-syntax-markup-bold-color);\n  font-weight: bold;\n}\n.rich-text--wrapper-markdown .hljs-addition[data-v-19dbe6da] {\n  /* prettylights-syntax-markup-inserted */\n  color: var(--hljs-syntax-markup-inserted-color);\n  background-color: var(--hljs-syntax-markup-inserted-background-color);\n}\n.rich-text--wrapper-markdown .hljs-deletion[data-v-19dbe6da] {\n  /* prettylights-syntax-markup-deleted */\n  color: var(--hljs-syntax-markup-deleted-color);\n  background-color: var(--hljs-syntax-markup-deleted-background-color);\n}\n.rich-text--wrapper-markdown .hljs-char.escape_[data-v-19dbe6da],\n.rich-text--wrapper-markdown .hljs-link[data-v-19dbe6da],\n.rich-text--wrapper-markdown .hljs-params[data-v-19dbe6da],\n.rich-text--wrapper-markdown .hljs-property[data-v-19dbe6da],\n.rich-text--wrapper-markdown .hljs-punctuation[data-v-19dbe6da],\n.rich-text--wrapper-markdown .hljs-tag[data-v-19dbe6da] {\n  /* purposely ignored */\n}\na[data-v-19dbe6da]:not(.rich-text--component) {\n  text-decoration: underline;\n}\n@media (prefers-color-scheme: light) {\n.rich-text--wrapper-markdown[data-v-19dbe6da] {\n    --hljs-color: var(--color-main-text, #24292e);\n    --hljs-background-color: var(--color-background-dark, #ffffff);\n    --hljs-syntax-keyword-color: #d73a49;\n    --hljs-syntax-entity-color: #6f42c1;\n    --hljs-syntax-constant-color: #005cc5;\n    --hljs-syntax-string-color: #032f62;\n    --hljs-syntax-variable-color: #e36209;\n    --hljs-syntax-comment-color: #6a737d;\n    --hljs-syntax-entity-tag-color: #22863a;\n    --hljs-syntax-storage-modifier-import-color: #24292e;\n    --hljs-syntax-markup-heading-color: #005cc5;\n    --hljs-syntax-markup-list-color: #735c0f;\n    --hljs-syntax-markup-italic-color: #24292e;\n    --hljs-syntax-markup-bold-color: #24292e;\n    --hljs-syntax-markup-inserted-color: #22863a;\n    --hljs-syntax-markup-inserted-background-color: #f0fff4;\n    --hljs-syntax-markup-deleted-color: #b31d28;\n    --hljs-syntax-markup-deleted-background-color: #ffeef0;\n}\n[data-theme-dark] .rich-text--wrapper-markdown[data-v-19dbe6da] {\n    --hljs-color: var(--color-main-text, #c9d1d9);\n    --hljs-background-color: var(--color-background-dark, #0d1117);\n    --hljs-syntax-keyword-color: #ff7b72;\n    --hljs-syntax-entity-color: #d2a8ff;\n    --hljs-syntax-constant-color: #79c0ff;\n    --hljs-syntax-string-color: #a5d6ff;\n    --hljs-syntax-variable-color: #ffa657;\n    --hljs-syntax-comment-color: #8b949e;\n    --hljs-syntax-entity-tag-color: #7ee787;\n    --hljs-syntax-storage-modifier-import-color: #c9d1d9;\n    --hljs-syntax-markup-heading-color: #1f6feb;\n    --hljs-syntax-markup-list-color: #f2cc60;\n    --hljs-syntax-markup-italic-color: #c9d1d9;\n    --hljs-syntax-markup-bold-color: #c9d1d9;\n    --hljs-syntax-markup-inserted-color: #aff5b4;\n    --hljs-syntax-markup-inserted-background-color: #033a16;\n    --hljs-syntax-markup-deleted-color: #ffdcd7;\n    --hljs-syntax-markup-deleted-background-color: #67060c;\n}\n}\n@media (prefers-color-scheme: dark) {\n.rich-text--wrapper-markdown[data-v-19dbe6da] {\n    --hljs-color: var(--color-main-text, #c9d1d9);\n    --hljs-background-color: var(--color-background-dark, #0d1117);\n    --hljs-syntax-keyword-color: #ff7b72;\n    --hljs-syntax-entity-color: #d2a8ff;\n    --hljs-syntax-constant-color: #79c0ff;\n    --hljs-syntax-string-color: #a5d6ff;\n    --hljs-syntax-variable-color: #ffa657;\n    --hljs-syntax-comment-color: #8b949e;\n    --hljs-syntax-entity-tag-color: #7ee787;\n    --hljs-syntax-storage-modifier-import-color: #c9d1d9;\n    --hljs-syntax-markup-heading-color: #1f6feb;\n    --hljs-syntax-markup-list-color: #f2cc60;\n    --hljs-syntax-markup-italic-color: #c9d1d9;\n    --hljs-syntax-markup-bold-color: #c9d1d9;\n    --hljs-syntax-markup-inserted-color: #aff5b4;\n    --hljs-syntax-markup-inserted-background-color: #033a16;\n    --hljs-syntax-markup-deleted-color: #ffdcd7;\n    --hljs-syntax-markup-deleted-background-color: #67060c;\n}\n[data-theme-light] .rich-text--wrapper-markdown[data-v-19dbe6da] {\n    --hljs-color: var(--color-main-text, #24292e);\n    --hljs-background-color: var(--color-background-dark, #ffffff);\n    --hljs-syntax-keyword-color: #d73a49;\n    --hljs-syntax-entity-color: #6f42c1;\n    --hljs-syntax-constant-color: #005cc5;\n    --hljs-syntax-string-color: #032f62;\n    --hljs-syntax-variable-color: #e36209;\n    --hljs-syntax-comment-color: #6a737d;\n    --hljs-syntax-entity-tag-color: #22863a;\n    --hljs-syntax-storage-modifier-import-color: #24292e;\n    --hljs-syntax-markup-heading-color: #005cc5;\n    --hljs-syntax-markup-list-color: #735c0f;\n    --hljs-syntax-markup-italic-color: #24292e;\n    --hljs-syntax-markup-bold-color: #24292e;\n    --hljs-syntax-markup-inserted-color: #22863a;\n    --hljs-syntax-markup-inserted-background-color: #f0fff4;\n    --hljs-syntax-markup-deleted-color: #b31d28;\n    --hljs-syntax-markup-deleted-background-color: #ffeef0;\n}\n}/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/*\n* Ensure proper alignment of the vue material icons\n*/\n.material-design-icon[data-v-6b2012de] {\n  display: flex;\n  align-self: center;\n  justify-self: center;\n  align-items: center;\n  justify-content: center;\n}/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/*\n* Ensure proper alignment of the vue material icons\n*/\n.material-design-icon[data-v-867e58fc] {\n  display: flex;\n  align-self: center;\n  justify-self: center;\n  align-items: center;\n  justify-content: center;\n}\n.provider-list[data-v-867e58fc] {\n  width: 100%;\n  min-height: 400px;\n  padding: 0 16px 16px 16px;\n  display: flex;\n  flex-direction: column;\n}\n.provider-list--select[data-v-867e58fc] {\n  width: 100%;\n}\n.provider-list--select .provider[data-v-867e58fc] {\n  display: flex;\n  align-items: center;\n  height: 28px;\n  overflow: hidden;\n}\n.provider-list--select .provider .link-icon[data-v-867e58fc] {\n  margin-inline-end: 8px;\n}\n.provider-list--select .provider .provider-icon[data-v-867e58fc] {\n  width: 20px;\n  height: 20px;\n  object-fit: contain;\n  margin-inline-end: 8px;\n  filter: var(--background-invert-if-dark);\n}\n.provider-list--select .provider .option-text[data-v-867e58fc] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/*\n* Ensure proper alignment of the vue material icons\n*/\n.material-design-icon[data-v-8285b115] {\n  display: flex;\n  align-self: center;\n  justify-self: center;\n  align-items: center;\n  justify-content: center;\n}\n.widget-custom[data-v-8285b115] {\n  width: 100%;\n  margin: auto;\n  margin-bottom: calc(var(--default-grid-baseline, 4px) * 3);\n  margin-top: calc(var(--default-grid-baseline, 4px) * 3);\n  overflow: hidden;\n  border: 2px solid var(--color-border);\n  border-radius: var(--border-radius-container);\n  background-color: transparent;\n  display: flex;\n}\n.widget-custom.full-width[data-v-8285b115] {\n  width: var(--widget-full-width, 100%) !important;\n  inset-inline-start: calc((var(--widget-full-width, 100%) - 100%) / 2 * -1);\n  position: relative;\n}\n.widget-access[data-v-8285b115] {\n  width: 100%;\n  margin: auto;\n  margin-bottom: calc(var(--default-grid-baseline, 4px) * 3);\n  margin-top: calc(var(--default-grid-baseline, 4px) * 3);\n  overflow: hidden;\n  border: 2px solid var(--color-border);\n  border-radius: var(--border-radius-container);\n  background-color: transparent;\n  display: flex;\n  padding: calc(var(--default-grid-baseline, 4px) * 3);\n}\n.widget-default[data-v-8285b115] {\n  width: 100%;\n  margin: auto;\n  margin-bottom: calc(var(--default-grid-baseline, 4px) * 3);\n  margin-top: calc(var(--default-grid-baseline, 4px) * 3);\n  overflow: hidden;\n  border: 2px solid var(--color-border);\n  border-radius: var(--border-radius-container);\n  background-color: transparent;\n  display: flex;\n}\n.widget-default--compact[data-v-8285b115] {\n  flex-direction: column;\n}\n.widget-default--compact .widget-default--image[data-v-8285b115] {\n  width: 100%;\n  height: 150px;\n}\n.widget-default--compact .widget-default--details[data-v-8285b115] {\n  width: 100%;\n  padding-top: calc(var(--default-grid-baseline, 4px) * 2);\n  padding-bottom: calc(var(--default-grid-baseline, 4px) * 2);\n}\n.widget-default--compact .widget-default--description[data-v-8285b115] {\n  display: none;\n}\n.widget-default--image[data-v-8285b115] {\n  width: 40%;\n  background-position: center;\n  background-size: cover;\n  background-repeat: no-repeat;\n}\n.widget-default--name[data-v-8285b115] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  font-weight: bold;\n}\n.widget-default--details[data-v-8285b115] {\n  padding: calc(var(--default-grid-baseline, 4px) * 3);\n  width: 60%;\n}\n.widget-default--details p[data-v-8285b115] {\n  margin: 0;\n  padding: 0;\n}\n.widget-default--description[data-v-8285b115] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  line-clamp: 3; /* stylelint-disable-line property-no-unknown */\n  -webkit-box-orient: vertical;\n}\n.widget-default--link[data-v-8285b115] {\n  color: var(--color-text-maxcontrast);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.toggle-interactive[data-v-8285b115] {\n  position: relative;\n}\n.toggle-interactive .toggle-interactive--button[data-v-8285b115] {\n  position: absolute;\n  bottom: var(--default-grid-baseline);\n  inset-inline-end: var(--default-grid-baseline);\n  z-index: 10000;\n}/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/*\n* Ensure proper alignment of the vue material icons\n*/\n.material-design-icon[data-v-4c1766c7] {\n  display: flex;\n  align-self: center;\n  justify-self: center;\n  align-items: center;\n  justify-content: center;\n}\n.raw-link[data-v-4c1766c7] {\n  width: 100%;\n  min-height: 350px;\n  display: flex;\n  flex-direction: column;\n  overflow-y: auto;\n  padding: 0 16px 16px 16px;\n}\n.raw-link .input-wrapper[data-v-4c1766c7] {\n  width: 100%;\n}\n.raw-link .reference-widget[data-v-4c1766c7] {\n  display: flex;\n}\n.raw-link--empty-content .provider-icon[data-v-4c1766c7] {\n  width: 150px;\n  height: 150px;\n  object-fit: contain;\n  filter: var(--background-invert-if-dark);\n}\n.raw-link--input[data-v-4c1766c7] {\n  width: 99%;\n}/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/*\n* Ensure proper alignment of the vue material icons\n*/\n.material-design-icon[data-v-f7b56afd] {\n  display: flex;\n  align-self: center;\n  justify-self: center;\n  align-items: center;\n  justify-content: center;\n}\n.result[data-v-f7b56afd] {\n  display: flex;\n  align-items: center;\n  height: var(--default-clickable-area);\n  overflow: hidden;\n}\n.result--icon-class[data-v-f7b56afd], .result--image[data-v-f7b56afd] {\n  width: 40px;\n  min-width: 40px;\n  height: 40px;\n  object-fit: contain;\n}\n.result--icon-class.rounded[data-v-f7b56afd], .result--image.rounded[data-v-f7b56afd] {\n  border-radius: 50%;\n}\n.result--content[data-v-f7b56afd] {\n  display: flex;\n  flex-direction: column;\n  padding-inline-start: 10px;\n  overflow: hidden;\n}\n.result--content--name[data-v-f7b56afd], .result--content--subline[data-v-f7b56afd] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/*\n* Ensure proper alignment of the vue material icons\n*/\n.material-design-icon[data-v-17458277] {\n  display: flex;\n  align-self: center;\n  justify-self: center;\n  align-items: center;\n  justify-content: center;\n}\n.smart-picker-search[data-v-17458277] {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  padding: 0 16px 16px 16px;\n}\n.smart-picker-search.with-empty-content[data-v-17458277] {\n  min-height: 400px;\n}\n.smart-picker-search .provider-icon[data-v-17458277] {\n  width: 150px;\n  height: 150px;\n  object-fit: contain;\n  filter: var(--background-invert-if-dark);\n}\n.smart-picker-search--select[data-v-17458277] {\n  width: 100%;\n}\n.smart-picker-search--select .search-result[data-v-17458277] {\n  width: 100%;\n}\n.smart-picker-search--select .group-name-icon[data-v-17458277],\n.smart-picker-search--select .option-simple-icon[data-v-17458277] {\n  width: 20px;\n  height: 20px;\n  margin: 0 20px 0 10px;\n}\n.smart-picker-search--select .custom-option[data-v-17458277] {\n  height: var(--default-clickable-area);\n  display: flex;\n  align-items: center;\n  overflow: hidden;\n}\n.smart-picker-search--select .option-text[data-v-17458277] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/*\n* Ensure proper alignment of the vue material icons\n*/\n.material-design-icon[data-v-b8f307ac] {\n  display: flex;\n  align-self: center;\n  justify-self: center;\n  align-items: center;\n  justify-content: center;\n}\n.reference-picker[data-v-b8f307ac] {\n  display: flex;\n  overflow-y: auto;\n  width: 100%;\n}\n.reference-picker .custom-element-wrapper[data-v-b8f307ac] {\n  display: flex;\n  overflow-y: auto;\n  width: 100%;\n}\n.reference-picker .custom-element-wrapper .custom-element[data-v-b8f307ac] {\n  display: flex;\n  overflow-y: auto;\n  width: 100%;\n}/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/*\n* Ensure proper alignment of the vue material icons\n*/\n.material-design-icon {\n  display: flex;\n  align-self: center;\n  justify-self: center;\n  align-items: center;\n  justify-content: center;\n}\n.reference-picker-modal .modal-container {\n  display: flex !important;\n}/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/*\n* Ensure proper alignment of the vue material icons\n*/\n.material-design-icon[data-v-2a52b076] {\n  display: flex;\n  align-self: center;\n  justify-self: center;\n  align-items: center;\n  justify-content: center;\n}\n.reference-picker-modal--content[data-v-2a52b076] {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  overflow-y: auto;\n}\n.reference-picker-modal--content .close-button[data-v-2a52b076],\n.reference-picker-modal--content .back-button[data-v-2a52b076] {\n  position: absolute;\n  top: 4px;\n}\n.reference-picker-modal--content .back-button[data-v-2a52b076] {\n  inset-inline-start: 4px;\n}\n.reference-picker-modal--content .close-button[data-v-2a52b076] {\n  inset-inline-end: 4px;\n}\n.reference-picker-modal--content > h2[data-v-2a52b076] {\n  display: flex;\n  margin: 12px 0 20px 0;\n}\n.reference-picker-modal--content > h2 .icon[data-v-2a52b076] {\n  margin-inline-end: 8px;\n}'
        )
      )
      document.head.appendChild(elementStyle)
    }
  } catch (e) {
    console.error('vite-plugin-css-injected-by-js', e)
  }
})()
const Sy = 'agora',
  Cy = '1.0.0rc4'
import {
  i as le,
  c as z,
  o as I,
  a as W,
  x as Y,
  z as ee,
  v as te,
  d as Sn,
  m as Cn,
  j as Br,
  Z as To,
  $ as Mr,
  k as Xt,
  Q as Yt,
  e as Q,
  S as vn,
  r as G,
  w as ie,
  u as ae,
  U as Nr,
  a0 as $r,
  J as ot,
  a1 as Vr,
  B as at,
  I as Me,
  a2 as st,
  a3 as Ne,
  a4 as Ee,
  a5 as _n,
  a6 as Oo,
  a7 as Lo,
  a8 as Po,
  a9 as zo,
  V as Ce,
  f as ut,
  aa as Gt,
  s as ct,
  ab as jr,
  ac as Do,
  ad as Fo,
  n as pe,
  g as ye,
  L as Kt,
  M as Qt,
  ae as Hr,
  af as Ro,
  ag as Ie,
  ah as Ur,
  ai as Jt,
  aj as ht,
  ak as Zt,
  al as Bo,
  am as En,
  an as Mo,
  ao as No,
  ap as $o,
  aq as Vo,
  ar as K,
  as as jo,
  at as Ho,
  X as Wr,
  W as Uo,
  au as Wo,
  Y as Ue,
  av as qr,
  aw as qo,
  ax as Xo,
  ay as Yo,
  az as Xr,
  aA as Go,
  aB as Ko,
  aC as Qo,
  aD as Jo,
  aE as Zo,
  aF as ea,
  y as ta,
  R as Yr,
  aG as Gr,
  P as In,
  aH as na,
  aI as ra,
  aJ as ia,
  aK as la,
  aL as oa,
  aM as aa,
  aN as Kr,
  aO as sa,
  aP as en,
  aQ as tn,
  aR as ua,
  aS as ca,
  aT as Qr,
} from './NcEmptyContent-q-geAf0w-DsDiM4c8.chunk.mjs'
const ha = 'modulepreload',
  fa = function (e, n) {
    return new URL(e, n).href
  },
  Jr = {},
  Zr = function (n, t, r) {
    let i = Promise.resolve()
    if (t && t.length > 0) {
      let o = function (h) {
        return Promise.all(
          h.map((c) =>
            Promise.resolve(c).then(
              (p) => ({ status: 'fulfilled', value: p }),
              (p) => ({ status: 'rejected', reason: p })
            )
          )
        )
      }
      const a = document.getElementsByTagName('link'),
        s = document.querySelector('meta[property=csp-nonce]'),
        u = s?.nonce || s?.getAttribute('nonce')
      i = o(
        t.map((h) => {
          if (((h = fa(h, r)), h in Jr)) return
          Jr[h] = true
          const c = h.endsWith('.css'),
            p = c ? '[rel="stylesheet"]' : ''
          if (!!r)
            for (let b = a.length - 1; b >= 0; b--) {
              const S = a[b]
              if (S.href === h && (!c || S.rel === 'stylesheet')) return
            }
          else if (document.querySelector(`link[href="${h}"]${p}`)) return
          const d = document.createElement('link')
          if (
            ((d.rel = c ? 'stylesheet' : ha),
            c || (d.as = 'script'),
            (d.crossOrigin = ''),
            (d.href = h),
            u && d.setAttribute('nonce', u),
            document.head.appendChild(d),
            c)
          )
            return new Promise((b, S) => {
              ;(d.addEventListener('load', b),
                d.addEventListener('error', () => S(new Error(`Unable to preload CSS for ${h}`))))
            })
        })
      )
    }
    function l(o) {
      const a = new Event('vite:preloadError', { cancelable: true })
      if (((a.payload = o), window.dispatchEvent(a), !a.defaultPrevented)) throw o
    }
    return i.then((o) => {
      for (const a of o || []) a.status === 'rejected' && l(a.reason)
      return n().catch(l)
    })
  },
  pa = {
    name: 'ChevronDownIcon',
    emits: ['click'],
    props: {
      title: { type: String },
      fillColor: { type: String, default: 'currentColor' },
      size: { type: Number, default: 24 },
    },
  },
  da = ['aria-hidden', 'aria-label'],
  ma = ['fill', 'width', 'height'],
  ga = { d: 'M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z' },
  ya = { key: 0 }
function ba(e, n, t, r, i, l) {
  return (
    I(),
    z(
      'span',
      te(e.$attrs, {
        'aria-hidden': t.title ? null : 'true',
        'aria-label': t.title,
        class: 'material-design-icon chevron-down-icon',
        role: 'img',
        onClick: n[0] || (n[0] = (o) => e.$emit('click', o)),
      }),
      [
        (I(),
        z(
          'svg',
          {
            fill: t.fillColor,
            class: 'material-design-icon__svg',
            width: t.size,
            height: t.size,
            viewBox: '0 0 24 24',
          },
          [W('path', ga, [t.title ? (I(), z('title', ya, ee(t.title), 1)) : Y('', true)])],
          8,
          ma
        )),
      ],
      16,
      da
    )
  )
}
const ei = le(pa, [['render', ba]]),
  ka = { class: 'input-field__main-wrapper' },
  xa = ['id', 'aria-describedby', 'disabled', 'placeholder', 'type', 'value'],
  wa = ['for'],
  Sa = { class: 'input-field__icon input-field__icon--leading' },
  Ca = { key: 2, class: 'input-field__icon input-field__icon--trailing' },
  va = ['id'],
  _a = Sn({
    inheritAttrs: false,
    __name: 'NcInputField',
    props: Cn(
      {
        class: { default: '' },
        inputClass: { default: '' },
        id: { default: () => st() },
        label: { default: void 0 },
        labelOutside: { type: Boolean },
        type: { default: 'text' },
        placeholder: { default: void 0 },
        showTrailingButton: { type: Boolean },
        trailingButtonLabel: { default: void 0 },
        success: { type: Boolean },
        error: { type: Boolean },
        helperText: { default: '' },
        disabled: { type: Boolean },
        pill: { type: Boolean },
      },
      { modelValue: { required: true }, modelModifiers: {} }
    ),
    emits: Cn(['trailingButtonClick'], ['update:modelValue']),
    setup(e, { expose: n, emit: t }) {
      const r = e,
        i = Br(e, 'modelValue'),
        l = t
      n({ focus: c, select: p })
      const o = To(),
        a = Mr('input-key'),
        s = Xt(() => r.showTrailingButton || r.success),
        u = Xt(() => r.label || r.labelOutside),
        h = Xt(() => {
          const d = []
          return (
            r.helperText && d.push(`${r.id}-helper-text`),
            o['aria-describedby'] && d.push(String(o['aria-describedby'])),
            d.join(' ') || void 0
          )
        })
      function c(d) {
        a.value.focus(d)
      }
      function p() {
        a.value.select()
      }
      function f(d) {
        const b = d.target
        i.value = r.type === 'number' && typeof i.value == 'number' ? parseFloat(b.value) : b.value
      }
      return (d, b) => (
        I(),
        z(
          'div',
          {
            class: Me([
              'input-field',
              [
                {
                  'input-field--disabled': d.disabled,
                  'input-field--error': d.error,
                  'input-field--label-outside': d.labelOutside || !u.value,
                  'input-field--leading-icon': !!d.$slots.icon,
                  'input-field--trailing-icon': s.value,
                  'input-field--pill': d.pill,
                  'input-field--success': d.success,
                },
                d.$props.class,
              ],
            ]),
          },
          [
            W('div', ka, [
              W(
                'input',
                te(d.$attrs, {
                  id: d.id,
                  ref: 'input-key',
                  'aria-describedby': h.value,
                  'aria-live': 'polite',
                  class: ['input-field__input', d.inputClass],
                  disabled: d.disabled,
                  placeholder: d.placeholder,
                  type: d.type,
                  value: i.value.toString(),
                  onInput: f,
                }),
                null,
                16,
                xa
              ),
              !d.labelOutside && u.value
                ? (I(),
                  z(
                    'label',
                    { key: 0, class: 'input-field__label', for: d.id },
                    ee(d.label),
                    9,
                    wa
                  ))
                : Y('', true),
              Yt(W('div', Sa, [G(d.$slots, 'icon', {}, void 0, true)], 512), [
                [vn, !!d.$slots.icon],
              ]),
              d.showTrailingButton
                ? (I(),
                  Q(
                    ae(Nr),
                    {
                      key: 1,
                      class: 'input-field__trailing-button',
                      'aria-label': d.trailingButtonLabel,
                      disabled: d.disabled,
                      variant: 'tertiary-no-background',
                      onClick: b[0] || (b[0] = (S) => l('trailingButtonClick', S)),
                    },
                    {
                      icon: ie(() => [G(d.$slots, 'trailing-button-icon', {}, void 0, true)]),
                      _: 3,
                    },
                    8,
                    ['aria-label', 'disabled']
                  ))
                : d.success || d.error
                  ? (I(),
                    z('div', Ca, [
                      d.success
                        ? (I(), Q(ae(ot), { key: 0, path: ae($r) }, null, 8, ['path']))
                        : (I(), Q(ae(ot), { key: 1, path: ae(Vr) }, null, 8, ['path'])),
                    ]))
                  : Y('', true),
            ]),
            d.helperText
              ? (I(),
                z(
                  'p',
                  { key: 0, id: `${d.id}-helper-text`, class: 'input-field__helper-text-message' },
                  [
                    d.success
                      ? (I(),
                        Q(
                          ae(ot),
                          { key: 0, class: 'input-field__helper-text-message__icon', path: ae($r) },
                          null,
                          8,
                          ['path']
                        ))
                      : d.error
                        ? (I(),
                          Q(
                            ae(ot),
                            {
                              key: 1,
                              class: 'input-field__helper-text-message__icon',
                              path: ae(Vr),
                            },
                            null,
                            8,
                            ['path']
                          ))
                        : Y('', true),
                    at(' ' + ee(d.helperText), 1),
                  ],
                  8,
                  va
                ))
              : Y('', true),
          ],
          2
        )
      )
    },
  }),
  An = le(_a, [['__scopeId', 'data-v-ae9805f8']])
Ne()
const Ea = Sn({
  __name: 'NcTextField',
  props: Cn(
    {
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
      trailingButtonIcon: { default: 'close' },
    },
    { modelValue: { default: '' }, modelModifiers: {} }
  ),
  emits: ['update:modelValue'],
  setup(e, { expose: n }) {
    const t = e,
      r = Br(e, 'modelValue')
    n({ focus: s, select: u })
    const i = Mr('input-field-key'),
      l = { arrowEnd: Ee('Save changes'), close: Ee('Clear text'), undo: Ee('Undo changes') },
      o = new Set(Object.keys(An.props)),
      a = Xt(() => {
        const h = Object.fromEntries(Object.entries(t).filter(([c]) => o.has(c)))
        return ((h.trailingButtonLabel ??= l[t.trailingButtonIcon]), h)
      })
    function s(h) {
      i.value.focus(h)
    }
    function u() {
      i.value.select()
    }
    return (h, c) => (
      I(),
      Q(
        ae(An),
        te(a.value, {
          ref: 'input-field-key',
          modelValue: r.value,
          'onUpdate:modelValue': c[0] || (c[0] = (p) => (r.value = p)),
        }),
        _n({ _: 2 }, [
          h.$slots.icon ? { name: 'icon', fn: ie(() => [G(h.$slots, 'icon')]), key: '0' } : void 0,
          h.type !== 'search'
            ? {
                name: 'trailing-button-icon',
                fn: ie(() => [
                  h.trailingButtonIcon === 'arrowEnd'
                    ? (I(), Q(ae(ot), { key: 0, directional: '', path: ae(Oo) }, null, 8, ['path']))
                    : (I(),
                      Q(
                        ae(ot),
                        { key: 1, path: h.trailingButtonIcon === 'undo' ? ae(Lo) : ae(Po) },
                        null,
                        8,
                        ['path']
                      )),
                ]),
                key: '1',
              }
            : void 0,
        ]),
        1040,
        ['modelValue']
      )
    )
  },
})
function Tn(e, n, t) {
  const r = `#initial-state-${e}-${n}`
  if (window._nc_initial_state?.has(r)) return window._nc_initial_state.get(r)
  window._nc_initial_state || (window._nc_initial_state = /* @__PURE__ */ new Map())
  const i = document.querySelector(r)
  if (i === null) {
    if (t !== void 0) return t
    throw new Error(`Could not find initial state ${n} of ${e}`)
  }
  try {
    const l = JSON.parse(atob(i.value))
    return (window._nc_initial_state.set(r, l), l)
  } catch (l) {
    if (
      (console.error('[@nextcloud/initial-state] Could not parse initial state', {
        key: n,
        app: e,
        error: l,
      }),
      t !== void 0)
    )
      return t
    throw new Error(`Could not parse initial state ${n} of ${e}`, { cause: l })
  }
}
const Ia = {
    name: 'CheckboxBlankOutlineIcon',
    emits: ['click'],
    props: {
      title: { type: String },
      fillColor: { type: String, default: 'currentColor' },
      size: { type: Number, default: 24 },
    },
  },
  Aa = ['aria-hidden', 'aria-label'],
  Ta = ['fill', 'width', 'height'],
  Oa = {
    d: 'M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z',
  },
  La = { key: 0 }
function Pa(e, n, t, r, i, l) {
  return (
    I(),
    z(
      'span',
      te(e.$attrs, {
        'aria-hidden': t.title ? null : 'true',
        'aria-label': t.title,
        class: 'material-design-icon checkbox-blank-outline-icon',
        role: 'img',
        onClick: n[0] || (n[0] = (o) => e.$emit('click', o)),
      }),
      [
        (I(),
        z(
          'svg',
          {
            fill: t.fillColor,
            class: 'material-design-icon__svg',
            width: t.size,
            height: t.size,
            viewBox: '0 0 24 24',
          },
          [W('path', Oa, [t.title ? (I(), z('title', La, ee(t.title), 1)) : Y('', true)])],
          8,
          Ta
        )),
      ],
      16,
      Aa
    )
  )
}
const za = le(Ia, [['render', Pa]]),
  Da = {
    name: 'MinusBoxIcon',
    emits: ['click'],
    props: {
      title: { type: String },
      fillColor: { type: String, default: 'currentColor' },
      size: { type: Number, default: 24 },
    },
  },
  Fa = ['aria-hidden', 'aria-label'],
  Ra = ['fill', 'width', 'height'],
  Ba = {
    d: 'M17,13H7V11H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z',
  },
  Ma = { key: 0 }
function Na(e, n, t, r, i, l) {
  return (
    I(),
    z(
      'span',
      te(e.$attrs, {
        'aria-hidden': t.title ? null : 'true',
        'aria-label': t.title,
        class: 'material-design-icon minus-box-icon',
        role: 'img',
        onClick: n[0] || (n[0] = (o) => e.$emit('click', o)),
      }),
      [
        (I(),
        z(
          'svg',
          {
            fill: t.fillColor,
            class: 'material-design-icon__svg',
            width: t.size,
            height: t.size,
            viewBox: '0 0 24 24',
          },
          [W('path', Ba, [t.title ? (I(), z('title', Ma, ee(t.title), 1)) : Y('', true)])],
          8,
          Ra
        )),
      ],
      16,
      Fa
    )
  )
}
const $a = le(Da, [['render', Na]]),
  Va = {
    name: 'CheckboxMarkedIcon',
    emits: ['click'],
    props: {
      title: { type: String },
      fillColor: { type: String, default: 'currentColor' },
      size: { type: Number, default: 24 },
    },
  },
  ja = ['aria-hidden', 'aria-label'],
  Ha = ['fill', 'width', 'height'],
  Ua = {
    d: 'M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z',
  },
  Wa = { key: 0 }
function qa(e, n, t, r, i, l) {
  return (
    I(),
    z(
      'span',
      te(e.$attrs, {
        'aria-hidden': t.title ? null : 'true',
        'aria-label': t.title,
        class: 'material-design-icon checkbox-marked-icon',
        role: 'img',
        onClick: n[0] || (n[0] = (o) => e.$emit('click', o)),
      }),
      [
        (I(),
        z(
          'svg',
          {
            fill: t.fillColor,
            class: 'material-design-icon__svg',
            width: t.size,
            height: t.size,
            viewBox: '0 0 24 24',
          },
          [W('path', Ua, [t.title ? (I(), z('title', Wa, ee(t.title), 1)) : Y('', true)])],
          8,
          Ha
        )),
      ],
      16,
      ja
    )
  )
}
const Xa = le(Va, [['render', qa]]),
  Ya = {
    name: 'RadioboxMarkedIcon',
    emits: ['click'],
    props: {
      title: { type: String },
      fillColor: { type: String, default: 'currentColor' },
      size: { type: Number, default: 24 },
    },
  },
  Ga = ['aria-hidden', 'aria-label'],
  Ka = ['fill', 'width', 'height'],
  Qa = {
    d: 'M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7Z',
  },
  Ja = { key: 0 }
function Za(e, n, t, r, i, l) {
  return (
    I(),
    z(
      'span',
      te(e.$attrs, {
        'aria-hidden': t.title ? null : 'true',
        'aria-label': t.title,
        class: 'material-design-icon radiobox-marked-icon',
        role: 'img',
        onClick: n[0] || (n[0] = (o) => e.$emit('click', o)),
      }),
      [
        (I(),
        z(
          'svg',
          {
            fill: t.fillColor,
            class: 'material-design-icon__svg',
            width: t.size,
            height: t.size,
            viewBox: '0 0 24 24',
          },
          [W('path', Qa, [t.title ? (I(), z('title', Ja, ee(t.title), 1)) : Y('', true)])],
          8,
          Ka
        )),
      ],
      16,
      Ga
    )
  )
}
const es = le(Ya, [['render', Za]]),
  ts = {
    name: 'RadioboxBlankIcon',
    emits: ['click'],
    props: {
      title: { type: String },
      fillColor: { type: String, default: 'currentColor' },
      size: { type: Number, default: 24 },
    },
  },
  ns = ['aria-hidden', 'aria-label'],
  rs = ['fill', 'width', 'height'],
  is = {
    d: 'M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z',
  },
  ls = { key: 0 }
function os(e, n, t, r, i, l) {
  return (
    I(),
    z(
      'span',
      te(e.$attrs, {
        'aria-hidden': t.title ? null : 'true',
        'aria-label': t.title,
        class: 'material-design-icon radiobox-blank-icon',
        role: 'img',
        onClick: n[0] || (n[0] = (o) => e.$emit('click', o)),
      }),
      [
        (I(),
        z(
          'svg',
          {
            fill: t.fillColor,
            class: 'material-design-icon__svg',
            width: t.size,
            height: t.size,
            viewBox: '0 0 24 24',
          },
          [W('path', is, [t.title ? (I(), z('title', ls, ee(t.title), 1)) : Y('', true)])],
          8,
          rs
        )),
      ],
      16,
      ns
    )
  )
}
const as = le(ts, [['render', os]]),
  ss = {
    name: 'ToggleSwitchOffIcon',
    emits: ['click'],
    props: {
      title: { type: String },
      fillColor: { type: String, default: 'currentColor' },
      size: { type: Number, default: 24 },
    },
  },
  us = ['aria-hidden', 'aria-label'],
  cs = ['fill', 'width', 'height'],
  hs = {
    d: 'M17,7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7M7,15A3,3 0 0,1 4,12A3,3 0 0,1 7,9A3,3 0 0,1 10,12A3,3 0 0,1 7,15Z',
  },
  fs = { key: 0 }
function ps(e, n, t, r, i, l) {
  return (
    I(),
    z(
      'span',
      te(e.$attrs, {
        'aria-hidden': t.title ? null : 'true',
        'aria-label': t.title,
        class: 'material-design-icon toggle-switch-off-icon',
        role: 'img',
        onClick: n[0] || (n[0] = (o) => e.$emit('click', o)),
      }),
      [
        (I(),
        z(
          'svg',
          {
            fill: t.fillColor,
            class: 'material-design-icon__svg',
            width: t.size,
            height: t.size,
            viewBox: '0 0 24 24',
          },
          [W('path', hs, [t.title ? (I(), z('title', fs, ee(t.title), 1)) : Y('', true)])],
          8,
          cs
        )),
      ],
      16,
      us
    )
  )
}
const ds = le(ss, [['render', ps]]),
  ms = {
    name: 'ToggleSwitchIcon',
    emits: ['click'],
    props: {
      title: { type: String },
      fillColor: { type: String, default: 'currentColor' },
      size: { type: Number, default: 24 },
    },
  },
  gs = ['aria-hidden', 'aria-label'],
  ys = ['fill', 'width', 'height'],
  bs = {
    d: 'M17,7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7M17,15A3,3 0 0,1 14,12A3,3 0 0,1 17,9A3,3 0 0,1 20,12A3,3 0 0,1 17,15Z',
  },
  ks = { key: 0 }
function xs(e, n, t, r, i, l) {
  return (
    I(),
    z(
      'span',
      te(e.$attrs, {
        'aria-hidden': t.title ? null : 'true',
        'aria-label': t.title,
        class: 'material-design-icon toggle-switch-icon',
        role: 'img',
        onClick: n[0] || (n[0] = (o) => e.$emit('click', o)),
      }),
      [
        (I(),
        z(
          'svg',
          {
            fill: t.fillColor,
            class: 'material-design-icon__svg',
            width: t.size,
            height: t.size,
            viewBox: '0 0 24 24',
          },
          [W('path', bs, [t.title ? (I(), z('title', ks, ee(t.title), 1)) : Y('', true)])],
          8,
          ys
        )),
      ],
      16,
      gs
    )
  )
}
const ws = le(ms, [['render', xs]]),
  ft = 'checkbox',
  pt = 'radio',
  We = 'switch',
  Tt = 'button',
  Ss = {
    name: 'NcCheckboxContent',
    components: { NcLoadingIcon: jr },
    props: {
      iconClass: { type: [String, Object], default: null },
      textClass: { type: [String, Object], default: null },
      type: { type: String, default: 'checkbox', validator: (e) => [ft, pt, We, Tt].includes(e) },
      buttonVariant: { type: Boolean, default: false },
      isChecked: { type: Boolean, default: false },
      indeterminate: { type: Boolean, default: false },
      loading: { type: Boolean, default: false },
      iconSize: { type: Number, default: 24 },
    },
    computed: {
      isButtonType() {
        return this.type === Tt
      },
      checkboxRadioIconElement() {
        return this.type === pt
          ? this.isChecked
            ? es
            : as
          : this.type === We
            ? this.isChecked
              ? ws
              : ds
            : this.indeterminate
              ? $a
              : this.isChecked
                ? Xa
                : za
      },
    },
  }
function Cs(e, n, t, r, i, l) {
  const o = Ce('NcLoadingIcon')
  return (
    I(),
    z(
      'span',
      {
        class: Me([
          'checkbox-content',
          {
            ['checkbox-content-' + t.type]: true,
            'checkbox-content--button-variant': t.buttonVariant,
            'checkbox-content--has-text': !!e.$slots.default,
          },
        ]),
      },
      [
        W(
          'span',
          {
            class: Me({
              'checkbox-content__icon': true,
              'checkbox-content__icon--checked': t.isChecked,
              [t.iconClass]: true,
            }),
            'aria-hidden': true,
            inert: '',
          },
          [
            G(
              e.$slots,
              'icon',
              { checked: t.isChecked, loading: t.loading },
              () => [
                t.loading
                  ? (I(), Q(o, { key: 0 }))
                  : t.buttonVariant
                    ? Y('', true)
                    : (I(),
                      Q(ct(l.checkboxRadioIconElement), { key: 1, size: t.iconSize }, null, 8, [
                        'size',
                      ])),
              ],
              true
            ),
          ],
          2
        ),
        e.$slots.default
          ? (I(),
            z(
              'span',
              { key: 0, class: Me(['checkbox-content__text', t.textClass]) },
              [G(e.$slots, 'default', {}, void 0, true)],
              2
            ))
          : Y('', true),
      ],
      2
    )
  )
}
const vs = le(Ss, [
  ['render', Cs],
  ['__scopeId', 'data-v-e7ac5ac5'],
])
Ne()
const On = {
    name: 'NcCheckboxRadioSwitch',
    components: { NcCheckboxContent: vs },
    inheritAttrs: false,
    props: {
      id: {
        type: String,
        default: () => 'checkbox-radio-switch-' + st(),
        validator: (e) => e.trim() !== '',
      },
      wrapperId: { type: String, default: null },
      name: { type: String, default: null },
      ariaLabel: { type: String, default: '' },
      type: { type: String, default: 'checkbox', validator: (e) => [ft, pt, We, Tt].includes(e) },
      buttonVariant: { type: Boolean, default: false },
      buttonVariantGrouped: {
        type: String,
        default: 'no',
        validator: (e) => ['no', 'vertical', 'horizontal'].includes(e),
      },
      modelValue: { type: [Boolean, Array, String], default: false },
      value: { type: String, default: null },
      disabled: { type: Boolean, default: false },
      indeterminate: { type: Boolean, default: false },
      required: { type: Boolean, default: false },
      loading: { type: Boolean, default: false },
      wrapperElement: { type: String, default: null },
      class: { type: [String, Array, Object], default: '' },
      style: { type: [String, Array, Object], default: '' },
    },
    emits: ['update:modelValue'],
    computed: {
      isButtonType() {
        return this.type === Tt
      },
      computedWrapperElement() {
        return this.isButtonType
          ? 'button'
          : this.wrapperElement !== null
            ? this.wrapperElement
            : 'span'
      },
      listeners() {
        return this.isButtonType ? { click: this.onToggle } : { change: this.onToggle }
      },
      iconSize() {
        return this.type === We ? 36 : 20
      },
      cssIconSize() {
        return this.iconSize + 'px'
      },
      cssIconHeight() {
        return this.type === We ? '16px' : this.cssIconSize
      },
      inputType() {
        return [ft, pt, Tt].includes(this.type) ? this.type : ft
      },
      isChecked() {
        return this.value !== null
          ? Array.isArray(this.modelValue)
            ? [...this.modelValue].indexOf(this.value) > -1
            : this.modelValue === this.value
          : this.modelValue === true
      },
      hasIndeterminate() {
        return [ft, pt].includes(this.inputType)
      },
    },
    mounted() {
      if (this.name && this.type === ft && !Array.isArray(this.modelValue))
        throw new Error('When using groups of checkboxes, the updated value will be an array.')
      if (this.name && this.type === We)
        throw new Error(
          'Switches are not made to be used for data sets. Please use checkboxes instead.'
        )
      if (typeof this.modelValue != 'boolean' && this.type === We)
        throw new Error('Switches can only be used with boolean as modelValue prop.')
    },
    methods: {
      t: Ee,
      n: zo,
      onToggle(e) {
        if (this.disabled || e.target.tagName.toLowerCase() === 'a') return
        if (this.type === pt) {
          this.$emit('update:modelValue', this.value)
          return
        }
        if (this.type === We) {
          this.$emit('update:modelValue', !this.isChecked)
          return
        }
        if (typeof this.modelValue == 'boolean') {
          this.$emit('update:modelValue', !this.modelValue)
          return
        }
        const n = this.getInputsSet()
          .filter((t) => t.checked)
          .map((t) => t.value)
        n.includes(this.value)
          ? this.$emit(
              'update:modelValue',
              n.filter((t) => t !== this.value)
            )
          : this.$emit('update:modelValue', [...n, this.value])
      },
      getInputsSet() {
        return [...document.getElementsByName(this.name)]
      },
    },
  },
  ti = () => {
    Do((e) => ({ '0b7fadd0': e.cssIconSize, '57d4f07e': e.cssIconHeight }))
  },
  ni = On.setup
On.setup = ni ? (e, n) => (ti(), ni(e, n)) : ti
const _s = [
  'id',
  'aria-labelledby',
  'aria-label',
  'disabled',
  'type',
  'value',
  'checked',
  '.indeterminate',
  'required',
  'name',
]
function Es(e, n, t, r, i, l) {
  const o = Ce('NcCheckboxContent')
  return (
    I(),
    Q(
      ct(l.computedWrapperElement),
      te(
        {
          id: t.wrapperId ?? (l.isButtonType ? t.id : null),
          'aria-label': l.isButtonType && t.ariaLabel ? t.ariaLabel : void 0,
          class: [
            'checkbox-radio-switch',
            [
              e.$props.class,
              {
                ['checkbox-radio-switch-' + t.type]: t.type,
                'checkbox-radio-switch--checked': l.isChecked,
                'checkbox-radio-switch--disabled': t.disabled,
                'checkbox-radio-switch--indeterminate': l.hasIndeterminate
                  ? t.indeterminate
                  : false,
                'checkbox-radio-switch--button-variant': t.buttonVariant,
                'checkbox-radio-switch--button-variant-v-grouped':
                  t.buttonVariant && t.buttonVariantGrouped === 'vertical',
                'checkbox-radio-switch--button-variant-h-grouped':
                  t.buttonVariant && t.buttonVariantGrouped === 'horizontal',
                'button-vue': l.isButtonType,
              },
            ],
          ],
          style: t.style,
          type: l.isButtonType ? 'button' : null,
        },
        l.isButtonType ? e.$attrs : {},
        Gt(l.isButtonType ? l.listeners : {})
      ),
      {
        default: ie(() => [
          l.isButtonType
            ? Y('', true)
            : (I(),
              z(
                'input',
                te(
                  {
                    key: 0,
                    id: t.id,
                    'aria-labelledby': !l.isButtonType && !t.ariaLabel ? `${t.id}-label` : null,
                    'aria-label': t.ariaLabel || void 0,
                    class: 'checkbox-radio-switch__input',
                    disabled: t.disabled,
                    type: l.inputType,
                    value: t.value,
                    checked: l.isChecked,
                    '.indeterminate': l.hasIndeterminate ? t.indeterminate : null,
                    required: t.required,
                    name: t.name,
                  },
                  e.$attrs,
                  Gt(l.listeners, true)
                ),
                null,
                48,
                _s
              )),
          ut(
            o,
            {
              id: l.isButtonType ? void 0 : `${t.id}-label`,
              class: 'checkbox-radio-switch__content',
              'icon-class': 'checkbox-radio-switch__icon',
              'text-class': 'checkbox-radio-switch__text',
              type: t.type,
              indeterminate: l.hasIndeterminate ? t.indeterminate : false,
              'button-variant': t.buttonVariant,
              'is-checked': l.isChecked,
              loading: t.loading,
              'icon-size': l.iconSize,
              onClick: l.onToggle,
            },
            _n({ icon: ie(() => [G(e.$slots, 'icon', {}, void 0, true)]), _: 2 }, [
              e.$slots.default
                ? {
                    name: 'default',
                    fn: ie(() => [G(e.$slots, 'default', {}, void 0, true)]),
                    key: '0',
                  }
                : void 0,
            ]),
            1032,
            [
              'id',
              'type',
              'indeterminate',
              'button-variant',
              'is-checked',
              'loading',
              'icon-size',
              'onClick',
            ]
          ),
        ]),
        _: 3,
      },
      16,
      ['id', 'aria-label', 'class', 'style', 'type']
    )
  )
}
const ri = le(On, [
  ['render', Es],
  ['__scopeId', 'data-v-10606260'],
])
var Is = Object.defineProperty,
  As = Object.defineProperties,
  Ts = Object.getOwnPropertyDescriptors,
  ii = Object.getOwnPropertySymbols,
  Os = Object.prototype.hasOwnProperty,
  Ls = Object.prototype.propertyIsEnumerable,
  li = (e, n, t) =>
    n in e
      ? Is(e, n, { enumerable: true, configurable: true, writable: true, value: t })
      : (e[n] = t),
  dt = (e, n) => {
    for (var t in n || (n = {})) Os.call(n, t) && li(e, t, n[t])
    if (ii) for (var t of ii(n)) Ls.call(n, t) && li(e, t, n[t])
    return e
  },
  oi = (e, n) => As(e, Ts(n))
const Ps = {
    props: { autoscroll: { type: Boolean, default: true } },
    watch: {
      typeAheadPointer() {
        this.autoscroll && this.maybeAdjustScroll()
      },
      open(e) {
        this.autoscroll && e && this.$nextTick(() => this.maybeAdjustScroll())
      },
    },
    methods: {
      maybeAdjustScroll() {
        var e
        const n =
          ((e = this.$refs.dropdownMenu) == null ? void 0 : e.children[this.typeAheadPointer]) ||
          false
        if (n) {
          const t = this.getDropdownViewport(),
            { top: r, bottom: i, height: l } = n.getBoundingClientRect()
          if (r < t.top) return (this.$refs.dropdownMenu.scrollTop = n.offsetTop)
          if (i > t.bottom)
            return (this.$refs.dropdownMenu.scrollTop = n.offsetTop - (t.height - l))
        }
      },
      getDropdownViewport() {
        return this.$refs.dropdownMenu
          ? this.$refs.dropdownMenu.getBoundingClientRect()
          : { height: 0, top: 0, bottom: 0 }
      },
    },
  },
  zs = {
    data() {
      return { typeAheadPointer: -1 }
    },
    watch: {
      filteredOptions() {
        for (let e = 0; e < this.filteredOptions.length; e++)
          if (this.selectable(this.filteredOptions[e])) {
            this.typeAheadPointer = e
            break
          }
      },
      open(e) {
        e && this.typeAheadToLastSelected()
      },
      selectedValue() {
        this.open && this.typeAheadToLastSelected()
      },
    },
    methods: {
      typeAheadUp() {
        for (let e = this.typeAheadPointer - 1; e >= 0; e--)
          if (this.selectable(this.filteredOptions[e])) {
            this.typeAheadPointer = e
            break
          }
      },
      typeAheadDown() {
        for (let e = this.typeAheadPointer + 1; e < this.filteredOptions.length; e++)
          if (this.selectable(this.filteredOptions[e])) {
            this.typeAheadPointer = e
            break
          }
      },
      typeAheadSelect() {
        const e = this.filteredOptions[this.typeAheadPointer]
        e && this.selectable(e) && this.select(e)
      },
      typeAheadToLastSelected() {
        this.typeAheadPointer =
          this.selectedValue.length !== 0
            ? this.filteredOptions.indexOf(this.selectedValue[this.selectedValue.length - 1])
            : -1
      },
    },
  },
  Ds = {
    props: { loading: { type: Boolean, default: false } },
    data() {
      return { mutableLoading: false }
    },
    watch: {
      search() {
        this.$emit('search', this.search, this.toggleLoading)
      },
      loading(e) {
        this.mutableLoading = e
      },
    },
    methods: {
      toggleLoading(e = null) {
        return e == null ? (this.mutableLoading = !this.mutableLoading) : (this.mutableLoading = e)
      },
    },
  },
  Ln = (e, n) => {
    const t = e.__vccOpts || e
    for (const [r, i] of n) t[r] = i
    return t
  },
  Fs = {},
  Rs = { xmlns: 'http://www.w3.org/2000/svg', width: '10', height: '10' },
  Bs = W(
    'path',
    {
      d: 'M6.895455 5l2.842897-2.842898c.348864-.348863.348864-.914488 0-1.263636L9.106534.261648c-.348864-.348864-.914489-.348864-1.263636 0L5 3.104545 2.157102.261648c-.348863-.348864-.914488-.348864-1.263636 0L.261648.893466c-.348864.348864-.348864.914489 0 1.263636L3.104545 5 .261648 7.842898c-.348864.348863-.348864.914488 0 1.263636l.631818.631818c.348864.348864.914773.348864 1.263636 0L5 6.895455l2.842898 2.842897c.348863.348864.914772.348864 1.263636 0l.631818-.631818c.348864-.348864.348864-.914489 0-1.263636L6.895455 5z',
    },
    null,
    -1
  ),
  Ms = [Bs]
function Ns(e, n) {
  return (I(), z('svg', Rs, Ms))
}
const $s = Ln(Fs, [['render', Ns]]),
  Vs = {},
  js = { xmlns: 'http://www.w3.org/2000/svg', width: '14', height: '10' },
  Hs = W(
    'path',
    {
      d: 'M9.211364 7.59931l4.48338-4.867229c.407008-.441854.407008-1.158247 0-1.60046l-.73712-.80023c-.407008-.441854-1.066904-.441854-1.474243 0L7 5.198617 2.51662.33139c-.407008-.441853-1.066904-.441853-1.474243 0l-.737121.80023c-.407008.441854-.407008 1.158248 0 1.600461l4.48338 4.867228L7 10l2.211364-2.40069z',
    },
    null,
    -1
  ),
  Us = [Hs]
function Ws(e, n) {
  return (I(), z('svg', js, Us))
}
const qs = Ln(Vs, [['render', Ws]]),
  ai = { Deselect: $s, OpenIndicator: qs },
  Xs = {
    mounted(e, { instance: n }) {
      if (n.appendToBody) {
        const { height: t, top: r, left: i, width: l } = n.$refs.toggle.getBoundingClientRect()
        let o = window.scrollX || window.pageXOffset,
          a = window.scrollY || window.pageYOffset
        ;((e.unbindPosition = n.calculatePosition(e, n, {
          width: l + 'px',
          left: o + i + 'px',
          top: a + r + t + 'px',
        })),
          document.body.appendChild(e))
      }
    },
    unmounted(e, { instance: n }) {
      n.appendToBody &&
        (e.unbindPosition && typeof e.unbindPosition == 'function' && e.unbindPosition(),
        e.parentNode && e.parentNode.removeChild(e))
    },
  }
function Ys(e) {
  const n = {}
  return (
    Object.keys(e)
      .sort()
      .forEach((t) => {
        n[t] = e[t]
      }),
    JSON.stringify(n)
  )
}
let Gs = 0
function Ks() {
  return ++Gs
}
const Qs = {
    components: dt({}, ai),
    directives: { appendToBody: Xs },
    mixins: [Ps, zs, Ds],
    compatConfig: { MODE: 3 },
    emits: [
      'open',
      'close',
      'update:modelValue',
      'search',
      'search:compositionstart',
      'search:compositionend',
      'search:keydown',
      'search:blur',
      'search:focus',
      'search:input',
      'option:created',
      'option:selecting',
      'option:selected',
      'option:deselecting',
      'option:deselected',
    ],
    props: {
      modelValue: {},
      components: { type: Object, default: () => ({}) },
      options: {
        type: Array,
        default() {
          return []
        },
      },
      disabled: { type: Boolean, default: false },
      clearable: { type: Boolean, default: true },
      deselectFromDropdown: { type: Boolean, default: false },
      searchable: { type: Boolean, default: true },
      multiple: { type: Boolean, default: false },
      placeholder: { type: String, default: '' },
      transition: { type: String, default: 'vs__fade' },
      clearSearchOnSelect: { type: Boolean, default: true },
      closeOnSelect: { type: Boolean, default: true },
      label: { type: String, default: 'label' },
      autocomplete: { type: String, default: 'off' },
      reduce: { type: Function, default: (e) => e },
      selectable: { type: Function, default: (e) => true },
      getOptionLabel: {
        type: Function,
        default(e) {
          return typeof e == 'object'
            ? e.hasOwnProperty(this.label)
              ? e[this.label]
              : console.warn(`[vue-select warn]: Label key "option.${this.label}" does not exist in options object ${JSON.stringify(e)}.
https://vue-select.org/api/props.html#getoptionlabel`)
            : e
        },
      },
      getOptionKey: {
        type: Function,
        default(e) {
          if (typeof e != 'object') return e
          try {
            return e.hasOwnProperty('id') ? e.id : Ys(e)
          } catch (n) {
            return console.warn(
              `[vue-select warn]: Could not stringify this option to generate unique key. Please provide'getOptionKey' prop to return a unique key for each option.
https://vue-select.org/api/props.html#getoptionkey`,
              e,
              n
            )
          }
        },
      },
      onTab: {
        type: Function,
        default: function () {
          this.selectOnTab && !this.isComposing && this.typeAheadSelect()
        },
      },
      taggable: { type: Boolean, default: false },
      tabindex: { type: Number, default: null },
      pushTags: { type: Boolean, default: false },
      filterable: { type: Boolean, default: true },
      filterBy: {
        type: Function,
        default(e, n, t) {
          return (n || '').toLocaleLowerCase().indexOf(t.toLocaleLowerCase()) > -1
        },
      },
      filter: {
        type: Function,
        default(e, n) {
          return e.filter((t) => {
            let r = this.getOptionLabel(t)
            return (typeof r == 'number' && (r = r.toString()), this.filterBy(t, r, n))
          })
        },
      },
      createOption: {
        type: Function,
        default(e) {
          return typeof this.optionList[0] == 'object' ? { [this.label]: e } : e
        },
      },
      resetOnOptionsChange: {
        default: false,
        validator: (e) => ['function', 'boolean'].includes(typeof e),
      },
      clearSearchOnBlur: {
        type: Function,
        default: function ({ clearSearchOnSelect: e, multiple: n }) {
          return e && !n
        },
      },
      noDrop: { type: Boolean, default: false },
      inputId: { type: String },
      dir: { type: String, default: 'auto' },
      selectOnTab: { type: Boolean, default: false },
      selectOnKeyCodes: { type: Array, default: () => [13] },
      searchInputQuerySelector: { type: String, default: '[type=search]' },
      mapKeydown: { type: Function, default: (e, n) => e },
      appendToBody: { type: Boolean, default: false },
      calculatePosition: {
        type: Function,
        default(e, n, { width: t, top: r, left: i }) {
          ;((e.style.top = r), (e.style.left = i), (e.style.width = t))
        },
      },
      dropdownShouldOpen: {
        type: Function,
        default({ noDrop: e, open: n, mutableLoading: t }) {
          return e ? false : n && !t
        },
      },
      uid: { type: [String, Number], default: () => Ks() },
    },
    data() {
      return {
        search: '',
        open: false,
        isComposing: false,
        pushedTags: [],
        _value: [],
        deselectButtons: [],
      }
    },
    computed: {
      isReducingValues() {
        return this.$props.reduce !== this.$options.props.reduce.default
      },
      isTrackingValues() {
        return typeof this.modelValue > 'u' || this.isReducingValues
      },
      selectedValue() {
        let e = this.modelValue
        return (
          this.isTrackingValues && (e = this.$data._value),
          e != null && e !== '' ? [].concat(e) : []
        )
      },
      optionList() {
        return this.options.concat(this.pushTags ? this.pushedTags : [])
      },
      searchEl() {
        return this.$slots.search
          ? this.$refs.selectedOptions.querySelector(this.searchInputQuerySelector)
          : this.$refs.search
      },
      scope() {
        const e = {
          search: this.search,
          loading: this.loading,
          searching: this.searching,
          filteredOptions: this.filteredOptions,
        }
        return {
          search: {
            attributes: dt(
              {
                disabled: this.disabled,
                placeholder: this.searchPlaceholder,
                tabindex: this.tabindex,
                readonly: !this.searchable,
                id: this.inputId,
                'aria-autocomplete': 'list',
                'aria-labelledby': `vs${this.uid}__combobox`,
                'aria-controls': `vs${this.uid}__listbox`,
                ref: 'search',
                type: 'search',
                autocomplete: this.autocomplete,
                value: this.search,
              },
              this.dropdownOpen && this.filteredOptions[this.typeAheadPointer]
                ? { 'aria-activedescendant': `vs${this.uid}__option-${this.typeAheadPointer}` }
                : {}
            ),
            events: {
              compositionstart: () => (this.isComposing = true),
              compositionend: () => (this.isComposing = false),
              keydown: this.onSearchKeyDown,
              blur: this.onSearchBlur,
              focus: this.onSearchFocus,
              input: (n) => (this.search = n.target.value),
            },
          },
          spinner: { loading: this.mutableLoading },
          noOptions: {
            search: this.search,
            loading: this.mutableLoading,
            searching: this.searching,
          },
          openIndicator: {
            attributes: { ref: 'openIndicator', role: 'presentation', class: 'vs__open-indicator' },
          },
          listHeader: e,
          listFooter: e,
          header: oi(dt({}, e), { deselect: this.deselect }),
          footer: oi(dt({}, e), { deselect: this.deselect }),
        }
      },
      childComponents() {
        return dt(dt({}, ai), this.components)
      },
      stateClasses() {
        return {
          'vs--open': this.dropdownOpen,
          'vs--single': !this.multiple,
          'vs--multiple': this.multiple,
          'vs--searching': this.searching && !this.noDrop,
          'vs--searchable': this.searchable && !this.noDrop,
          'vs--unsearchable': !this.searchable,
          'vs--loading': this.mutableLoading,
          'vs--disabled': this.disabled,
        }
      },
      searching() {
        return !!this.search
      },
      dropdownOpen() {
        return this.dropdownShouldOpen(this)
      },
      searchPlaceholder() {
        return this.isValueEmpty && this.placeholder ? this.placeholder : void 0
      },
      filteredOptions() {
        const e = [].concat(this.optionList)
        if (!this.filterable && !this.taggable) return e
        const n = this.search.length ? this.filter(e, this.search, this) : e
        if (this.taggable && this.search.length) {
          const t = this.createOption(this.search)
          this.optionExists(t) || n.unshift(t)
        }
        return n
      },
      isValueEmpty() {
        return this.selectedValue.length === 0
      },
      showClearButton() {
        return !this.multiple && this.clearable && !this.open && !this.isValueEmpty
      },
    },
    watch: {
      options(e, n) {
        const t = () =>
          typeof this.resetOnOptionsChange == 'function'
            ? this.resetOnOptionsChange(e, n, this.selectedValue)
            : this.resetOnOptionsChange
        ;(!this.taggable && t() && this.clearSelection(),
          this.modelValue &&
            this.isTrackingValues &&
            this.setInternalValueFromOptions(this.modelValue))
      },
      modelValue: {
        immediate: true,
        handler(e) {
          this.isTrackingValues && this.setInternalValueFromOptions(e)
        },
      },
      multiple() {
        this.clearSelection()
      },
      open(e) {
        this.$emit(e ? 'open' : 'close')
      },
    },
    created() {
      this.mutableLoading = this.loading
    },
    methods: {
      setInternalValueFromOptions(e) {
        Array.isArray(e)
          ? (this.$data._value = e.map((n) => this.findOptionFromReducedValue(n)))
          : (this.$data._value = this.findOptionFromReducedValue(e))
      },
      select(e) {
        ;(this.$emit('option:selecting', e),
          this.isOptionSelected(e)
            ? this.deselectFromDropdown &&
              (this.clearable || (this.multiple && this.selectedValue.length > 1)) &&
              this.deselect(e)
            : (this.taggable &&
                !this.optionExists(e) &&
                (this.$emit('option:created', e), this.pushTag(e)),
              this.multiple && (e = this.selectedValue.concat(e)),
              this.updateValue(e),
              this.$emit('option:selected', e)),
          this.onAfterSelect(e))
      },
      deselect(e) {
        ;(this.$emit('option:deselecting', e),
          this.updateValue(this.selectedValue.filter((n) => !this.optionComparator(n, e))),
          this.$emit('option:deselected', e))
      },
      clearSelection() {
        this.updateValue(this.multiple ? [] : null)
      },
      onAfterSelect(e) {
        ;(this.closeOnSelect && ((this.open = !this.open), this.searchEl.blur()),
          this.clearSearchOnSelect && (this.search = ''))
      },
      updateValue(e) {
        ;(typeof this.modelValue > 'u' && (this.$data._value = e),
          e !== null &&
            (Array.isArray(e) ? (e = e.map((n) => this.reduce(n))) : (e = this.reduce(e))),
          this.$emit('update:modelValue', e))
      },
      toggleDropdown(e) {
        const n = e.target !== this.searchEl
        n && e.preventDefault()
        const t = [...(this.deselectButtons || []), this.$refs.clearButton]
        if (
          this.searchEl === void 0 ||
          t.filter(Boolean).some((r) => r.contains(e.target) || r === e.target)
        ) {
          e.preventDefault()
          return
        }
        this.open && n
          ? this.searchEl.blur()
          : this.disabled || ((this.open = true), this.searchEl.focus())
      },
      isOptionSelected(e) {
        return this.selectedValue.some((n) => this.optionComparator(n, e))
      },
      isOptionDeselectable(e) {
        return this.isOptionSelected(e) && this.deselectFromDropdown
      },
      optionComparator(e, n) {
        return this.getOptionKey(e) === this.getOptionKey(n)
      },
      findOptionFromReducedValue(e) {
        const n = (r) => JSON.stringify(this.reduce(r)) === JSON.stringify(e),
          t = [...this.options, ...this.pushedTags].filter(n)
        return t.length === 1
          ? t[0]
          : t.find((r) => this.optionComparator(r, this.$data._value)) || e
      },
      closeSearchOptions() {
        ;((this.open = false), this.$emit('search:blur'))
      },
      maybeDeleteValue() {
        if (
          !this.searchEl.value.length &&
          this.selectedValue &&
          this.selectedValue.length &&
          this.clearable
        ) {
          let e = null
          ;(this.multiple && (e = [...this.selectedValue.slice(0, this.selectedValue.length - 1)]),
            this.updateValue(e))
        }
      },
      optionExists(e) {
        return this.optionList.some((n) => this.optionComparator(n, e))
      },
      normalizeOptionForSlot(e) {
        return typeof e == 'object' ? e : { [this.label]: e }
      },
      pushTag(e) {
        this.pushedTags.push(e)
      },
      onEscape() {
        this.search.length ? (this.search = '') : this.searchEl.blur()
      },
      onSearchBlur() {
        if (this.mousedown && !this.searching) this.mousedown = false
        else {
          const { clearSearchOnSelect: e, multiple: n } = this
          ;(this.clearSearchOnBlur({ clearSearchOnSelect: e, multiple: n }) && (this.search = ''),
            this.closeSearchOptions())
          return
        }
        if (this.search.length === 0 && this.options.length === 0) {
          this.closeSearchOptions()
          return
        }
      },
      onSearchFocus() {
        ;((this.open = true), this.$emit('search:focus'))
      },
      onMousedown() {
        this.mousedown = true
      },
      onMouseUp() {
        this.mousedown = false
      },
      onSearchKeyDown(e) {
        const n = (i) => (i.preventDefault(), !this.isComposing && this.typeAheadSelect()),
          t = {
            8: (i) => this.maybeDeleteValue(),
            9: (i) => this.onTab(),
            27: (i) => this.onEscape(),
            38: (i) => (i.preventDefault(), this.typeAheadUp()),
            40: (i) => (i.preventDefault(), this.typeAheadDown()),
          }
        this.selectOnKeyCodes.forEach((i) => (t[i] = n))
        const r = this.mapKeydown(t, this)
        if (typeof r[e.keyCode] == 'function') return r[e.keyCode](e)
      },
    },
  },
  Js = ['dir'],
  Zs = ['id', 'aria-expanded', 'aria-owns'],
  eu = { ref: 'selectedOptions', class: 'vs__selected-options' },
  tu = ['disabled', 'title', 'aria-label', 'onClick'],
  nu = { ref: 'actions', class: 'vs__actions' },
  ru = ['disabled'],
  iu = { class: 'vs__spinner' },
  lu = ['id'],
  ou = ['id', 'aria-selected', 'onMouseover', 'onClick'],
  au = { key: 0, class: 'vs__no-options' },
  su = at(' Sorry, no matching options. '),
  uu = ['id']
function cu(e, n, t, r, i, l) {
  const o = Fo('append-to-body')
  return (
    I(),
    z(
      'div',
      { dir: t.dir, class: Me(['v-select', l.stateClasses]) },
      [
        G(e.$slots, 'header', pe(ye(l.scope.header))),
        W(
          'div',
          {
            id: `vs${t.uid}__combobox`,
            ref: 'toggle',
            class: 'vs__dropdown-toggle',
            role: 'combobox',
            'aria-expanded': l.dropdownOpen.toString(),
            'aria-owns': `vs${t.uid}__listbox`,
            'aria-label': 'Search for option',
            onMousedown: n[1] || (n[1] = (a) => l.toggleDropdown(a)),
          },
          [
            W(
              'div',
              eu,
              [
                (I(true),
                z(
                  Kt,
                  null,
                  Qt(l.selectedValue, (a, s) =>
                    G(
                      e.$slots,
                      'selected-option-container',
                      {
                        option: l.normalizeOptionForSlot(a),
                        deselect: l.deselect,
                        multiple: t.multiple,
                        disabled: t.disabled,
                      },
                      () => [
                        (I(),
                        z('span', { key: t.getOptionKey(a), class: 'vs__selected' }, [
                          G(
                            e.$slots,
                            'selected-option',
                            pe(ye(l.normalizeOptionForSlot(a))),
                            () => [at(ee(t.getOptionLabel(a)), 1)]
                          ),
                          t.multiple
                            ? (I(),
                              z(
                                'button',
                                {
                                  key: 0,
                                  ref_for: true,
                                  ref: (u) => (i.deselectButtons[s] = u),
                                  disabled: t.disabled,
                                  type: 'button',
                                  class: 'vs__deselect',
                                  title: `Deselect ${t.getOptionLabel(a)}`,
                                  'aria-label': `Deselect ${t.getOptionLabel(a)}`,
                                  onClick: (u) => l.deselect(a),
                                },
                                [(I(), Q(ct(l.childComponents.Deselect)))],
                                8,
                                tu
                              ))
                            : Y('', true),
                        ])),
                      ]
                    )
                  ),
                  256
                )),
                G(e.$slots, 'search', pe(ye(l.scope.search)), () => [
                  W(
                    'input',
                    te(
                      { class: 'vs__search' },
                      l.scope.search.attributes,
                      Gt(l.scope.search.events)
                    ),
                    null,
                    16
                  ),
                ]),
              ],
              512
            ),
            W(
              'div',
              nu,
              [
                Yt(
                  W(
                    'button',
                    {
                      ref: 'clearButton',
                      disabled: t.disabled,
                      type: 'button',
                      class: 'vs__clear',
                      title: 'Clear Selected',
                      'aria-label': 'Clear Selected',
                      onClick:
                        n[0] || (n[0] = (...a) => l.clearSelection && l.clearSelection(...a)),
                    },
                    [(I(), Q(ct(l.childComponents.Deselect)))],
                    8,
                    ru
                  ),
                  [[vn, l.showClearButton]]
                ),
                G(e.$slots, 'open-indicator', pe(ye(l.scope.openIndicator)), () => [
                  t.noDrop
                    ? Y('', true)
                    : (I(),
                      Q(
                        ct(l.childComponents.OpenIndicator),
                        pe(te({ key: 0 }, l.scope.openIndicator.attributes)),
                        null,
                        16
                      )),
                ]),
                G(e.$slots, 'spinner', pe(ye(l.scope.spinner)), () => [
                  Yt(W('div', iu, 'Loading...', 512), [[vn, e.mutableLoading]]),
                ]),
              ],
              512
            ),
          ],
          40,
          Zs
        ),
        ut(
          Ro,
          { name: t.transition },
          {
            default: ie(() => [
              l.dropdownOpen
                ? Yt(
                    (I(),
                    z(
                      'ul',
                      {
                        id: `vs${t.uid}__listbox`,
                        ref: 'dropdownMenu',
                        key: `vs${t.uid}__listbox`,
                        class: 'vs__dropdown-menu',
                        role: 'listbox',
                        tabindex: '-1',
                        onMousedown:
                          n[2] ||
                          (n[2] = Hr((...a) => l.onMousedown && l.onMousedown(...a), ['prevent'])),
                        onMouseup: n[3] || (n[3] = (...a) => l.onMouseUp && l.onMouseUp(...a)),
                      },
                      [
                        G(e.$slots, 'list-header', pe(ye(l.scope.listHeader))),
                        (I(true),
                        z(
                          Kt,
                          null,
                          Qt(
                            l.filteredOptions,
                            (a, s) => (
                              I(),
                              z(
                                'li',
                                {
                                  id: `vs${t.uid}__option-${s}`,
                                  key: t.getOptionKey(a),
                                  role: 'option',
                                  class: Me([
                                    'vs__dropdown-option',
                                    {
                                      'vs__dropdown-option--deselect':
                                        l.isOptionDeselectable(a) && s === e.typeAheadPointer,
                                      'vs__dropdown-option--selected': l.isOptionSelected(a),
                                      'vs__dropdown-option--highlight': s === e.typeAheadPointer,
                                      'vs__dropdown-option--disabled': !t.selectable(a),
                                    },
                                  ]),
                                  'aria-selected': s === e.typeAheadPointer ? true : null,
                                  onMouseover: (u) =>
                                    t.selectable(a) ? (e.typeAheadPointer = s) : null,
                                  onClick: Hr(
                                    (u) => (t.selectable(a) ? l.select(a) : null),
                                    ['prevent', 'stop']
                                  ),
                                },
                                [
                                  G(e.$slots, 'option', pe(ye(l.normalizeOptionForSlot(a))), () => [
                                    at(ee(t.getOptionLabel(a)), 1),
                                  ]),
                                ],
                                42,
                                ou
                              )
                            )
                          ),
                          128
                        )),
                        l.filteredOptions.length === 0
                          ? (I(),
                            z('li', au, [
                              G(e.$slots, 'no-options', pe(ye(l.scope.noOptions)), () => [su]),
                            ]))
                          : Y('', true),
                        G(e.$slots, 'list-footer', pe(ye(l.scope.listFooter))),
                      ],
                      40,
                      lu
                    )),
                    [[o]]
                  )
                : (I(),
                  z(
                    'ul',
                    {
                      key: 1,
                      id: `vs${t.uid}__listbox`,
                      role: 'listbox',
                      style: { display: 'none', visibility: 'hidden' },
                    },
                    null,
                    8,
                    uu
                  )),
            ]),
            _: 3,
          },
          8,
          ['name']
        ),
        G(e.$slots, 'footer', pe(ye(l.scope.footer))),
      ],
      10,
      Js
    )
  )
}
const Qe = Ln(Qs, [['render', cu]])
function nn() {
  return typeof window < 'u'
}
function mt(e) {
  return si(e) ? (e.nodeName || '').toLowerCase() : '#document'
}
function de(e) {
  var n
  return (e == null || (n = e.ownerDocument) == null ? void 0 : n.defaultView) || window
}
function Ae(e) {
  var n
  return (n = (si(e) ? e.ownerDocument : e.document) || window.document) == null
    ? void 0
    : n.documentElement
}
function si(e) {
  return nn() ? e instanceof Node || e instanceof de(e).Node : false
}
function ve(e) {
  return nn() ? e instanceof Element || e instanceof de(e).Element : false
}
function Te(e) {
  return nn() ? e instanceof HTMLElement || e instanceof de(e).HTMLElement : false
}
function ui(e) {
  return !nn() || typeof ShadowRoot > 'u'
    ? false
    : e instanceof ShadowRoot || e instanceof de(e).ShadowRoot
}
const hu = /* @__PURE__ */ new Set(['inline', 'contents'])
function Ot(e) {
  const { overflow: n, overflowX: t, overflowY: r, display: i } = _e(e)
  return /auto|scroll|overlay|hidden|clip/.test(n + r + t) && !hu.has(i)
}
const fu = /* @__PURE__ */ new Set(['table', 'td', 'th'])
function pu(e) {
  return fu.has(mt(e))
}
const du = [':popover-open', ':modal']
function rn(e) {
  return du.some((n) => {
    try {
      return e.matches(n)
    } catch {
      return false
    }
  })
}
const mu = ['transform', 'translate', 'scale', 'rotate', 'perspective'],
  gu = ['transform', 'translate', 'scale', 'rotate', 'perspective', 'filter'],
  yu = ['paint', 'layout', 'strict', 'content']
function Pn(e) {
  const n = zn(),
    t = ve(e) ? _e(e) : e
  return (
    mu.some((r) => (t[r] ? t[r] !== 'none' : false)) ||
    (t.containerType ? t.containerType !== 'normal' : false) ||
    (!n && (t.backdropFilter ? t.backdropFilter !== 'none' : false)) ||
    (!n && (t.filter ? t.filter !== 'none' : false)) ||
    gu.some((r) => (t.willChange || '').includes(r)) ||
    yu.some((r) => (t.contain || '').includes(r))
  )
}
function bu(e) {
  let n = qe(e)
  for (; Te(n) && !gt(n); ) {
    if (Pn(n)) return n
    if (rn(n)) return null
    n = qe(n)
  }
  return null
}
function zn() {
  return typeof CSS > 'u' || !CSS.supports ? false : CSS.supports('-webkit-backdrop-filter', 'none')
}
const ku = /* @__PURE__ */ new Set(['html', 'body', '#document'])
function gt(e) {
  return ku.has(mt(e))
}
function _e(e) {
  return de(e).getComputedStyle(e)
}
function ln(e) {
  return ve(e)
    ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop }
    : { scrollLeft: e.scrollX, scrollTop: e.scrollY }
}
function qe(e) {
  if (mt(e) === 'html') return e
  const n = e.assignedSlot || e.parentNode || (ui(e) && e.host) || Ae(e)
  return ui(n) ? n.host : n
}
function ci(e) {
  const n = qe(e)
  return gt(n) ? (e.ownerDocument ? e.ownerDocument.body : e.body) : Te(n) && Ot(n) ? n : ci(n)
}
function Lt(e, n, t) {
  var r
  ;(n === void 0 && (n = []), t === void 0 && (t = true))
  const i = ci(e),
    l = i === ((r = e.ownerDocument) == null ? void 0 : r.body),
    o = de(i)
  if (l) {
    const a = Dn(o)
    return n.concat(o, o.visualViewport || [], Ot(i) ? i : [], a && t ? Lt(a) : [])
  }
  return n.concat(i, Lt(i, [], t))
}
function Dn(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null
}
function hi(e) {
  const n = _e(e)
  let t = parseFloat(n.width) || 0,
    r = parseFloat(n.height) || 0
  const i = Te(e),
    l = i ? e.offsetWidth : t,
    o = i ? e.offsetHeight : r,
    a = Zt(t) !== l || Zt(r) !== o
  return (a && ((t = l), (r = o)), { width: t, height: r, $: a })
}
function Fn(e) {
  return ve(e) ? e : e.contextElement
}
function yt(e) {
  const n = Fn(e)
  if (!Te(n)) return Ie(1)
  const t = n.getBoundingClientRect(),
    { width: r, height: i, $: l } = hi(n)
  let o = (l ? Zt(t.width) : t.width) / r,
    a = (l ? Zt(t.height) : t.height) / i
  return (
    (!o || !Number.isFinite(o)) && (o = 1),
    (!a || !Number.isFinite(a)) && (a = 1),
    { x: o, y: a }
  )
}
const xu = Ie(0)
function fi(e) {
  const n = de(e)
  return !zn() || !n.visualViewport
    ? xu
    : { x: n.visualViewport.offsetLeft, y: n.visualViewport.offsetTop }
}
function wu(e, n, t) {
  return (n === void 0 && (n = false), !t || (n && t !== de(e)) ? false : n)
}
function Je(e, n, t, r) {
  ;(n === void 0 && (n = false), t === void 0 && (t = false))
  const i = e.getBoundingClientRect(),
    l = Fn(e)
  let o = Ie(1)
  n && (r ? ve(r) && (o = yt(r)) : (o = yt(e)))
  const a = wu(l, t, r) ? fi(l) : Ie(0)
  let s = (i.left + a.x) / o.x,
    u = (i.top + a.y) / o.y,
    h = i.width / o.x,
    c = i.height / o.y
  if (l) {
    const p = de(l),
      f = r && ve(r) ? de(r) : r
    let d = p,
      b = Dn(d)
    for (; b && r && f !== d; ) {
      const S = yt(b),
        y = b.getBoundingClientRect(),
        v = _e(b),
        C = y.left + (b.clientLeft + parseFloat(v.paddingLeft)) * S.x,
        P = y.top + (b.clientTop + parseFloat(v.paddingTop)) * S.y
      ;((s *= S.x),
        (u *= S.y),
        (h *= S.x),
        (c *= S.y),
        (s += C),
        (u += P),
        (d = de(b)),
        (b = Dn(d)))
    }
  }
  return Ur({ width: h, height: c, x: s, y: u })
}
function on(e, n) {
  const t = ln(e).scrollLeft
  return n ? n.left + t : Je(Ae(e)).left + t
}
function pi(e, n) {
  const t = e.getBoundingClientRect(),
    r = t.left + n.scrollLeft - on(e, t),
    i = t.top + n.scrollTop
  return { x: r, y: i }
}
function Su(e) {
  let { elements: n, rect: t, offsetParent: r, strategy: i } = e
  const l = i === 'fixed',
    o = Ae(r),
    a = n ? rn(n.floating) : false
  if (r === o || (a && l)) return t
  let s = { scrollLeft: 0, scrollTop: 0 },
    u = Ie(1)
  const h = Ie(0),
    c = Te(r)
  if ((c || (!c && !l)) && ((mt(r) !== 'body' || Ot(o)) && (s = ln(r)), Te(r))) {
    const f = Je(r)
    ;((u = yt(r)), (h.x = f.x + r.clientLeft), (h.y = f.y + r.clientTop))
  }
  const p = o && !c && !l ? pi(o, s) : Ie(0)
  return {
    width: t.width * u.x,
    height: t.height * u.y,
    x: t.x * u.x - s.scrollLeft * u.x + h.x + p.x,
    y: t.y * u.y - s.scrollTop * u.y + h.y + p.y,
  }
}
function Cu(e) {
  return Array.from(e.getClientRects())
}
function vu(e) {
  const n = Ae(e),
    t = ln(e),
    r = e.ownerDocument.body,
    i = ht(n.scrollWidth, n.clientWidth, r.scrollWidth, r.clientWidth),
    l = ht(n.scrollHeight, n.clientHeight, r.scrollHeight, r.clientHeight)
  let o = -t.scrollLeft + on(e)
  const a = -t.scrollTop
  return (
    _e(r).direction === 'rtl' && (o += ht(n.clientWidth, r.clientWidth) - i),
    { width: i, height: l, x: o, y: a }
  )
}
const di = 25
function _u(e, n) {
  const t = de(e),
    r = Ae(e),
    i = t.visualViewport
  let l = r.clientWidth,
    o = r.clientHeight,
    a = 0,
    s = 0
  if (i) {
    ;((l = i.width), (o = i.height))
    const h = zn()
    ;(!h || (h && n === 'fixed')) && ((a = i.offsetLeft), (s = i.offsetTop))
  }
  const u = on(r)
  if (u <= 0) {
    const h = r.ownerDocument,
      c = h.body,
      p = getComputedStyle(c),
      f =
        (h.compatMode === 'CSS1Compat' && parseFloat(p.marginLeft) + parseFloat(p.marginRight)) ||
        0,
      d = Math.abs(r.clientWidth - c.clientWidth - f)
    d <= di && (l -= d)
  } else u <= di && (l += u)
  return { width: l, height: o, x: a, y: s }
}
const Eu = /* @__PURE__ */ new Set(['absolute', 'fixed'])
function Iu(e, n) {
  const t = Je(e, true, n === 'fixed'),
    r = t.top + e.clientTop,
    i = t.left + e.clientLeft,
    l = Te(e) ? yt(e) : Ie(1),
    o = e.clientWidth * l.x,
    a = e.clientHeight * l.y,
    s = i * l.x,
    u = r * l.y
  return { width: o, height: a, x: s, y: u }
}
function mi(e, n, t) {
  let r
  if (n === 'viewport') r = _u(e, t)
  else if (n === 'document') r = vu(Ae(e))
  else if (ve(n)) r = Iu(n, t)
  else {
    const i = fi(e)
    r = { x: n.x - i.x, y: n.y - i.y, width: n.width, height: n.height }
  }
  return Ur(r)
}
function gi(e, n) {
  const t = qe(e)
  return t === n || !ve(t) || gt(t) ? false : _e(t).position === 'fixed' || gi(t, n)
}
function Au(e, n) {
  const t = n.get(e)
  if (t) return t
  let r = Lt(e, [], false).filter((a) => ve(a) && mt(a) !== 'body'),
    i = null
  const l = _e(e).position === 'fixed'
  let o = l ? qe(e) : e
  for (; ve(o) && !gt(o); ) {
    const a = _e(o),
      s = Pn(o)
    ;(!s && a.position === 'fixed' && (i = null),
      (
        l
          ? !s && !i
          : (!s && a.position === 'static' && !!i && Eu.has(i.position)) ||
            (Ot(o) && !s && gi(e, o))
      )
        ? (r = r.filter((h) => h !== o))
        : (i = a),
      (o = qe(o)))
  }
  return (n.set(e, r), r)
}
function Tu(e) {
  let { element: n, boundary: t, rootBoundary: r, strategy: i } = e
  const o = [...(t === 'clippingAncestors' ? (rn(n) ? [] : Au(n, this._c)) : [].concat(t)), r],
    a = o[0],
    s = o.reduce(
      (u, h) => {
        const c = mi(n, h, i)
        return (
          (u.top = ht(c.top, u.top)),
          (u.right = En(c.right, u.right)),
          (u.bottom = En(c.bottom, u.bottom)),
          (u.left = ht(c.left, u.left)),
          u
        )
      },
      mi(n, a, i)
    )
  return { width: s.right - s.left, height: s.bottom - s.top, x: s.left, y: s.top }
}
function Ou(e) {
  const { width: n, height: t } = hi(e)
  return { width: n, height: t }
}
function Lu(e, n, t) {
  const r = Te(n),
    i = Ae(n),
    l = t === 'fixed',
    o = Je(e, true, l, n)
  let a = { scrollLeft: 0, scrollTop: 0 }
  const s = Ie(0)
  function u() {
    s.x = on(i)
  }
  if (r || (!r && !l))
    if (((mt(n) !== 'body' || Ot(i)) && (a = ln(n)), r)) {
      const f = Je(n, true, l, n)
      ;((s.x = f.x + n.clientLeft), (s.y = f.y + n.clientTop))
    } else i && u()
  l && !r && i && u()
  const h = i && !r && !l ? pi(i, a) : Ie(0),
    c = o.left + a.scrollLeft - s.x - h.x,
    p = o.top + a.scrollTop - s.y - h.y
  return { x: c, y: p, width: o.width, height: o.height }
}
function Rn(e) {
  return _e(e).position === 'static'
}
function yi(e, n) {
  if (!Te(e) || _e(e).position === 'fixed') return null
  if (n) return n(e)
  let t = e.offsetParent
  return (Ae(e) === t && (t = t.ownerDocument.body), t)
}
function bi(e, n) {
  const t = de(e)
  if (rn(e)) return t
  if (!Te(e)) {
    let i = qe(e)
    for (; i && !gt(i); ) {
      if (ve(i) && !Rn(i)) return i
      i = qe(i)
    }
    return t
  }
  let r = yi(e, n)
  for (; r && pu(r) && Rn(r); ) r = yi(r, n)
  return r && gt(r) && Rn(r) && !Pn(r) ? t : r || bu(e) || t
}
const Pu = async function (e) {
  const n = this.getOffsetParent || bi,
    t = this.getDimensions,
    r = await t(e.floating)
  return {
    reference: Lu(e.reference, await n(e.floating), e.strategy),
    floating: { x: 0, y: 0, width: r.width, height: r.height },
  }
}
function zu(e) {
  return _e(e).direction === 'rtl'
}
const Du = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Su,
  getDocumentElement: Ae,
  getClippingRect: Tu,
  getOffsetParent: bi,
  getElementRects: Pu,
  getClientRects: Cu,
  getDimensions: Ou,
  getScale: yt,
  isElement: ve,
  isRTL: zu,
}
function ki(e, n) {
  return e.x === n.x && e.y === n.y && e.width === n.width && e.height === n.height
}
function Fu(e, n) {
  let t = null,
    r
  const i = Ae(e)
  function l() {
    var a
    ;(clearTimeout(r), (a = t) == null || a.disconnect(), (t = null))
  }
  function o(a, s) {
    ;(a === void 0 && (a = false), s === void 0 && (s = 1), l())
    const u = e.getBoundingClientRect(),
      { left: h, top: c, width: p, height: f } = u
    if ((a || n(), !p || !f)) return
    const d = Jt(c),
      b = Jt(i.clientWidth - (h + p)),
      S = Jt(i.clientHeight - (c + f)),
      y = Jt(h),
      C = {
        rootMargin: -d + 'px ' + -b + 'px ' + -S + 'px ' + -y + 'px',
        threshold: ht(0, En(1, s)) || 1,
      }
    let P = true
    function F(x) {
      const B = x[0].intersectionRatio
      if (B !== s) {
        if (!P) return o()
        B
          ? o(false, B)
          : (r = setTimeout(() => {
              o(false, 1e-7)
            }, 1e3))
      }
      ;(B === 1 && !ki(u, e.getBoundingClientRect()) && o(), (P = false))
    }
    try {
      t = new IntersectionObserver(F, { ...C, root: i.ownerDocument })
    } catch {
      t = new IntersectionObserver(F, C)
    }
    t.observe(e)
  }
  return (o(true), l)
}
function Ru(e, n, t, r) {
  r === void 0 && (r = {})
  const {
      ancestorScroll: i = true,
      ancestorResize: l = true,
      elementResize: o = typeof ResizeObserver == 'function',
      layoutShift: a = typeof IntersectionObserver == 'function',
      animationFrame: s = false,
    } = r,
    u = Fn(e),
    h = i || l ? [...(u ? Lt(u) : []), ...Lt(n)] : []
  h.forEach((y) => {
    ;(i && y.addEventListener('scroll', t, { passive: true }), l && y.addEventListener('resize', t))
  })
  const c = u && a ? Fu(u, t) : null
  let p = -1,
    f = null
  o &&
    ((f = new ResizeObserver((y) => {
      let [v] = y
      ;(v &&
        v.target === u &&
        f &&
        (f.unobserve(n),
        cancelAnimationFrame(p),
        (p = requestAnimationFrame(() => {
          var C
          ;(C = f) == null || C.observe(n)
        }))),
        t())
    })),
    u && !s && f.observe(u),
    f.observe(n))
  let d,
    b = s ? Je(e) : null
  s && S()
  function S() {
    const y = Je(e)
    ;(b && !ki(b, y) && t(), (b = y), (d = requestAnimationFrame(S)))
  }
  return (
    t(),
    () => {
      var y
      ;(h.forEach((v) => {
        ;(i && v.removeEventListener('scroll', t), l && v.removeEventListener('resize', t))
      }),
        c?.(),
        (y = f) == null || y.disconnect(),
        (f = null),
        s && cancelAnimationFrame(d))
    }
  )
}
const Bu = Mo,
  Mu = $o,
  Nu = No,
  $u = Vo,
  Vu = (e, n, t) => {
    const r = /* @__PURE__ */ new Map(),
      i = { platform: Du, ...t },
      l = { ...i.platform, _c: r }
    return Bo(e, n, { ...i, platform: l })
  }
function xi(e, n) {
  const t = []
  let r = 0,
    i = e.toLowerCase().indexOf(n.toLowerCase(), r),
    l = 0
  for (; i > -1 && l++ < e.length; )
    ((r = i + n.length),
      t.push({ start: i, end: r }),
      (i = e.toLowerCase().indexOf(n.toLowerCase(), r)))
  return t
}
const wi = Sn({
    name: 'NcHighlight',
    props: {
      text: { type: String, default: '' },
      search: { type: String, default: '' },
      highlight: { type: Array, default: () => [] },
    },
    computed: {
      ranges() {
        let e = []
        return (
          (!this.search && this.highlight.length === 0) ||
            (this.highlight.length > 0 ? (e = this.highlight) : (e = xi(this.text, this.search)),
            e.forEach((n, t) => {
              n.end < n.start && (e[t] = { start: n.end, end: n.start })
            }),
            (e = e.reduce(
              (n, t) => (
                t.start < this.text.length &&
                  t.end > 0 &&
                  n.push({
                    start: t.start < 0 ? 0 : t.start,
                    end: t.end > this.text.length ? this.text.length : t.end,
                  }),
                n
              ),
              []
            )),
            e.sort((n, t) => n.start - t.start),
            (e = e.reduce((n, t) => {
              if (!n.length) n.push(t)
              else {
                const r = n.length - 1
                n[r].end >= t.start
                  ? (n[r] = { start: n[r].start, end: Math.max(n[r].end, t.end) })
                  : n.push(t)
              }
              return n
            }, []))),
          e
        )
      },
      chunks() {
        if (this.ranges.length === 0)
          return [{ start: 0, end: this.text.length, highlight: false, text: this.text }]
        const e = []
        let n = 0,
          t = 0
        for (; n < this.text.length; ) {
          const r = this.ranges[t]
          if (r.start === n) {
            ;(e.push({ ...r, highlight: true, text: this.text.slice(r.start, r.end) }),
              t++,
              (n = r.end),
              t >= this.ranges.length &&
                n < this.text.length &&
                (e.push({
                  start: n,
                  end: this.text.length,
                  highlight: false,
                  text: this.text.slice(n),
                }),
                (n = this.text.length)))
            continue
          }
          ;(e.push({ start: n, end: r.start, highlight: false, text: this.text.slice(n, r.start) }),
            (n = r.start))
        }
        return e
      },
    },
    render() {
      return this.ranges.length
        ? K(
            'span',
            {},
            this.chunks.map((e) => (e.highlight ? K('strong', {}, e.text) : e.text))
          )
        : K('span', {}, this.text)
    },
  }),
  ju = {
    name: 'NcEllipsisedOption',
    components: { NcHighlight: wi },
    props: { name: { type: String, default: '' }, search: { type: String, default: '' } },
    computed: {
      needsTruncate() {
        return this.name && this.name.length >= 10
      },
      split() {
        return this.name.length - Math.min(Math.floor(this.name.length / 2), 10)
      },
      part1() {
        return this.needsTruncate ? this.name.slice(0, this.split) : this.name
      },
      part2() {
        return this.needsTruncate ? this.name.slice(this.split) : ''
      },
      highlight1() {
        return this.search ? xi(this.name, this.search) : []
      },
      highlight2() {
        return this.highlight1.map((e) => ({
          start: e.start - this.split,
          end: e.end - this.split,
        }))
      },
    },
  },
  Hu = ['title']
function Uu(e, n, t, r, i, l) {
  const o = Ce('NcHighlight')
  return (
    I(),
    z(
      'span',
      { dir: 'auto', class: 'name-parts', title: t.name },
      [
        ut(
          o,
          { class: 'name-parts__first', text: l.part1, search: t.search, highlight: l.highlight1 },
          null,
          8,
          ['text', 'search', 'highlight']
        ),
        l.part2
          ? (I(),
            Q(
              o,
              {
                key: 0,
                class: 'name-parts__last',
                text: l.part2,
                search: t.search,
                highlight: l.highlight2,
              },
              null,
              8,
              ['text', 'search', 'highlight']
            ))
          : Y('', true),
      ],
      8,
      Hu
    )
  )
}
const Wu = le(ju, [
  ['render', Uu],
  ['__scopeId', 'data-v-eeeedf6b'],
])
Ne(jo)
const qu = {
    name: 'NcSelect',
    components: { ChevronDown: ei, NcEllipsisedOption: Wu, NcLoadingIcon: jr, VueSelect: Qe },
    props: {
      ...Qe.props,
      ...Qe.mixins.reduce((e, n) => ({ ...e, ...n.props }), {}),
      ariaLabelClearSelected: { type: String, default: Ee('Clear selected') },
      ariaLabelCombobox: { type: String, default: null },
      ariaLabelListbox: { type: String, default: Ee('Options') },
      ariaLabelDeselectOption: {
        type: Function,
        default: (e) => Ee('Deselect {option}', { option: e }),
      },
      appendToBody: { type: Boolean, default: true },
      calculatePosition: { type: Function, default: null },
      keepOpen: { type: Boolean, default: false },
      components: {
        type: Object,
        default: () => ({
          Deselect: {
            render: () =>
              K(Ho, {
                size: 20,
                fillColor: 'var(--vs-controls-color)',
                style: [{ cursor: 'pointer' }],
              }),
          },
        }),
      },
      limit: { type: Number, default: null },
      disabled: { type: Boolean, default: false },
      dropdownShouldOpen: { type: Function, default: ({ noDrop: e, open: n }) => (e ? false : n) },
      filterBy: { type: Function, default: null },
      inputClass: { type: [String, Object], default: null },
      inputId: { type: String, default: () => st() },
      inputLabel: { type: String, default: null },
      labelOutside: { type: Boolean, default: false },
      keyboardFocusBorder: { type: Boolean, default: true },
      label: { type: String, default: null },
      loading: { type: Boolean, default: false },
      multiple: { type: Boolean, default: false },
      noWrap: { type: Boolean, default: false },
      options: { type: Array, default: () => [] },
      placeholder: { type: String, default: '' },
      mapKeydown: {
        type: Function,
        default(e, n) {
          return {
            ...e,
            27: (t) => {
              ;(n.open && t.stopPropagation(), e[27](t))
            },
          }
        },
      },
      uid: { type: String, default: () => st() },
      placement: { type: String, default: 'bottom' },
      resetFocusOnOptionsChange: { type: Boolean, default: true },
      modelValue: { type: [String, Number, Object, Array], default: null },
      required: { type: Boolean, default: false },
      ' ': {},
    },
    emits: [' ', 'update:modelValue'],
    setup() {
      const e = Number.parseInt(
          window.getComputedStyle(document.body).getPropertyValue('--default-clickable-area')
        ),
        n = Number.parseInt(
          window.getComputedStyle(document.body).getPropertyValue('--default-grid-baseline')
        )
      return { avatarSize: e - 2 * n }
    },
    data() {
      return { search: '' }
    },
    computed: {
      inputRequired() {
        return this.required
          ? this.modelValue === null ||
              (Array.isArray(this.modelValue) && this.modelValue.length === 0)
          : null
      },
      localCalculatePosition() {
        return this.calculatePosition !== null
          ? this.calculatePosition
          : (e, n, { width: t }) => {
              e.style.width = t
              const r = {
                  name: 'addClass',
                  fn() {
                    return (e.classList.add('vs__dropdown-menu--floating'), {})
                  },
                },
                i = {
                  name: 'togglePlacementClass',
                  fn({ placement: a }) {
                    return (
                      n.$el.classList.toggle('select--drop-up', a === 'top'),
                      e.classList.toggle('vs__dropdown-menu--floating-placement-top', a === 'top'),
                      {}
                    )
                  },
                },
                l = () => {
                  Vu(n.$refs.toggle, e, {
                    placement: this.placement,
                    middleware: [Bu(-1), r, i, Nu(), Mu({ limiter: $u() })],
                  }).then(({ x: a, y: s }) => {
                    Object.assign(e.style, {
                      left: `${a}px`,
                      top: `${s}px`,
                      width: `${n.$refs.toggle.getBoundingClientRect().width}px`,
                    })
                  })
                }
              return Ru(n.$refs.toggle, e, l)
            }
      },
      localFilterBy() {
        return this.filterBy ?? Qe.props.filterBy.default
      },
      localLabel() {
        return this.label ?? Qe.props.label.default
      },
      propsToForward() {
        const e = [
          ...Object.keys(Qe.props),
          ...Qe.mixins.flatMap((r) => Object.keys(r.props ?? {})),
        ]
        return {
          ...Object.fromEntries(Object.entries(this.$props).filter(([r, i]) => e.includes(r))),
          calculatePosition: this.localCalculatePosition,
          closeOnSelect: !this.keepOpen,
          filterBy: this.localFilterBy,
          label: this.localLabel,
        }
      },
    },
    mounted() {
      ;(!this.labelOutside && !this.inputLabel && this.ariaLabelCombobox,
        this.inputLabel && this.ariaLabelCombobox)
    },
    methods: { t: Ee },
  },
  Xu = ['for'],
  Yu = ['required']
function Gu(e, n, t, r, i, l) {
  const o = Ce('ChevronDown'),
    a = Ce('NcEllipsisedOption'),
    s = Ce('NcLoadingIcon'),
    u = Ce('VueSelect')
  return (
    I(),
    Q(
      u,
      te({ class: ['select', { 'select--no-wrap': t.noWrap }] }, l.propsToForward, {
        onSearch: n[0] || (n[0] = (h) => (i.search = h)),
        'onUpdate:modelValue': n[1] || (n[1] = (h) => e.$emit('update:modelValue', h)),
      }),
      _n(
        {
          search: ie(({ attributes: h, events: c }) => [
            W(
              'input',
              te(
                { class: ['vs__search', t.inputClass] },
                h,
                { required: l.inputRequired, dir: 'auto' },
                Gt(c, true)
              ),
              null,
              16,
              Yu
            ),
          ]),
          'open-indicator': ie(({ attributes: h }) => [
            ut(
              o,
              te(h, {
                'fill-color': 'var(--vs-controls-color)',
                style: { cursor: t.disabled ? null : 'pointer' },
                size: 26,
              }),
              null,
              16,
              ['style']
            ),
          ]),
          option: ie((h) => [
            G(e.$slots, 'option', pe(ye(h)), () => [
              ut(a, { name: String(h[l.localLabel]), search: i.search }, null, 8, [
                'name',
                'search',
              ]),
            ]),
          ]),
          'selected-option': ie((h) => [
            G(e.$slots, 'selected-option', { vBind: h }, () => [
              ut(a, { name: String(h[l.localLabel]), search: i.search }, null, 8, [
                'name',
                'search',
              ]),
            ]),
          ]),
          spinner: ie((h) => [h.loading ? (I(), Q(s, { key: 0 })) : Y('', true)]),
          'no-options': ie(() => [at(ee(l.t('No results')), 1)]),
          _: 2,
        },
        [
          !t.labelOutside && t.inputLabel
            ? {
                name: 'header',
                fn: ie(() => [
                  W('label', { for: t.inputId, class: 'select__label' }, ee(t.inputLabel), 9, Xu),
                ]),
                key: '0',
              }
            : void 0,
          Qt(e.$slots, (h, c) => ({ name: c, fn: ie((p) => [G(e.$slots, c, pe(ye(p)))]) })),
        ]
      ),
      1040,
      ['class']
    )
  )
}
const Ku = le(qu, [['render', Gu]])
function Si(e) {
  if (e) throw e
}
var Bn, Ci
function Qu() {
  if (Ci) return Bn
  Ci = 1
  var e = Object.prototype.hasOwnProperty,
    n = Object.prototype.toString,
    t = Object.defineProperty,
    r = Object.getOwnPropertyDescriptor,
    i = function (u) {
      return typeof Array.isArray == 'function' ? Array.isArray(u) : n.call(u) === '[object Array]'
    },
    l = function (u) {
      if (!u || n.call(u) !== '[object Object]') return false
      var h = e.call(u, 'constructor'),
        c =
          u.constructor &&
          u.constructor.prototype &&
          e.call(u.constructor.prototype, 'isPrototypeOf')
      if (u.constructor && !h && !c) return false
      var p
      for (p in u);
      return typeof p > 'u' || e.call(u, p)
    },
    o = function (u, h) {
      t && h.name === '__proto__'
        ? t(u, h.name, { enumerable: true, configurable: true, value: h.newValue, writable: true })
        : (u[h.name] = h.newValue)
    },
    a = function (u, h) {
      if (h === '__proto__')
        if (e.call(u, h)) {
          if (r) return r(u, h).value
        } else return
      return u[h]
    }
  return (
    (Bn = function s() {
      var u,
        h,
        c,
        p,
        f,
        d,
        b = arguments[0],
        S = 1,
        y = arguments.length,
        v = false
      for (
        typeof b == 'boolean' && ((v = b), (b = arguments[1] || {}), (S = 2)),
          (b == null || (typeof b != 'object' && typeof b != 'function')) && (b = {});
        S < y;
        ++S
      )
        if (((u = arguments[S]), u != null))
          for (h in u)
            ((c = a(b, h)),
              (p = a(u, h)),
              b !== p &&
                (v && p && (l(p) || (f = i(p)))
                  ? (f ? ((f = false), (d = c && i(c) ? c : [])) : (d = c && l(c) ? c : {}),
                    o(b, { name: h, newValue: s(v, d, p) }))
                  : typeof p < 'u' && o(b, { name: h, newValue: p })))
      return b
    }),
    Bn
  )
}
var Ju = Qu()
const Mn = Wr(Ju)
function _y() {}
function Nn(e) {
  if (typeof e != 'object' || e === null) return false
  const n = Object.getPrototypeOf(e)
  return (
    (n === null || n === Object.prototype || Object.getPrototypeOf(n) === null) &&
    !(Symbol.toStringTag in e) &&
    !(Symbol.iterator in e)
  )
}
function Zu() {
  const e = [],
    n = { run: t, use: r }
  return n
  function t(...i) {
    let l = -1
    const o = i.pop()
    if (typeof o != 'function') throw new TypeError('Expected function as last argument, not ' + o)
    a(null, ...i)
    function a(s, ...u) {
      const h = e[++l]
      let c = -1
      if (s) {
        o(s)
        return
      }
      for (; ++c < i.length; ) (u[c] === null || u[c] === void 0) && (u[c] = i[c])
      ;((i = u), h ? ec(h, a)(...u) : o(null, ...u))
    }
  }
  function r(i) {
    if (typeof i != 'function')
      throw new TypeError('Expected `middelware` to be a function, not ' + i)
    return (e.push(i), n)
  }
}
function ec(e, n) {
  let t
  return r
  function r(...o) {
    const a = e.length > o.length
    let s
    a && o.push(i)
    try {
      s = e.apply(this, o)
    } catch (u) {
      const h = u
      if (a && t) throw h
      return i(h)
    }
    a ||
      (s && s.then && typeof s.then == 'function' ? s.then(l, i) : s instanceof Error ? i(s) : l(s))
  }
  function i(o, ...a) {
    t || ((t = true), n(o, ...a))
  }
  function l(o) {
    i(null, o)
  }
}
function Pt(e) {
  return !e || typeof e != 'object'
    ? ''
    : 'position' in e || 'type' in e
      ? vi(e.position)
      : 'start' in e || 'end' in e
        ? vi(e)
        : 'line' in e || 'column' in e
          ? $n(e)
          : ''
}
function $n(e) {
  return _i(e && e.line) + ':' + _i(e && e.column)
}
function vi(e) {
  return $n(e && e.start) + '-' + $n(e && e.end)
}
function _i(e) {
  return e && typeof e == 'number' ? e : 1
}
class oe extends Error {
  constructor(n, t, r) {
    ;(super(), typeof t == 'string' && ((r = t), (t = void 0)))
    let i = '',
      l = {},
      o = false
    if (
      (t &&
        ('line' in t && 'column' in t
          ? (l = { place: t })
          : 'start' in t && 'end' in t
            ? (l = { place: t })
            : 'type' in t
              ? (l = { ancestors: [t], place: t.position })
              : (l = { ...t })),
      typeof n == 'string'
        ? (i = n)
        : !l.cause && n && ((o = true), (i = n.message), (l.cause = n)),
      !l.ruleId && !l.source && typeof r == 'string')
    ) {
      const s = r.indexOf(':')
      s === -1 ? (l.ruleId = r) : ((l.source = r.slice(0, s)), (l.ruleId = r.slice(s + 1)))
    }
    if (!l.place && l.ancestors && l.ancestors) {
      const s = l.ancestors[l.ancestors.length - 1]
      s && (l.place = s.position)
    }
    const a = l.place && 'start' in l.place ? l.place.start : l.place
    ;((this.ancestors = l.ancestors || void 0),
      (this.cause = l.cause || void 0),
      (this.column = a ? a.column : void 0),
      (this.fatal = void 0),
      (this.file = ''),
      (this.message = i),
      (this.line = a ? a.line : void 0),
      (this.name = Pt(l.place) || '1:1'),
      (this.place = l.place || void 0),
      (this.reason = this.message),
      (this.ruleId = l.ruleId || void 0),
      (this.source = l.source || void 0),
      (this.stack = o && l.cause && typeof l.cause.stack == 'string' ? l.cause.stack : ''),
      (this.actual = void 0),
      (this.expected = void 0),
      (this.note = void 0),
      (this.url = void 0))
  }
}
;((oe.prototype.file = ''),
  (oe.prototype.name = ''),
  (oe.prototype.reason = ''),
  (oe.prototype.message = ''),
  (oe.prototype.stack = ''),
  (oe.prototype.column = void 0),
  (oe.prototype.line = void 0),
  (oe.prototype.ancestors = void 0),
  (oe.prototype.cause = void 0),
  (oe.prototype.fatal = void 0),
  (oe.prototype.place = void 0),
  (oe.prototype.ruleId = void 0),
  (oe.prototype.source = void 0))
const Oe = { basename: tc, dirname: nc, extname: rc, join: ic, sep: '/' }
function tc(e, n) {
  if (n !== void 0 && typeof n != 'string') throw new TypeError('"ext" argument must be a string')
  zt(e)
  let t = 0,
    r = -1,
    i = e.length,
    l
  if (n === void 0 || n.length === 0 || n.length > e.length) {
    for (; i--; )
      if (e.codePointAt(i) === 47) {
        if (l) {
          t = i + 1
          break
        }
      } else r < 0 && ((l = true), (r = i + 1))
    return r < 0 ? '' : e.slice(t, r)
  }
  if (n === e) return ''
  let o = -1,
    a = n.length - 1
  for (; i--; )
    if (e.codePointAt(i) === 47) {
      if (l) {
        t = i + 1
        break
      }
    } else
      (o < 0 && ((l = true), (o = i + 1)),
        a > -1 &&
          (e.codePointAt(i) === n.codePointAt(a--) ? a < 0 && (r = i) : ((a = -1), (r = o))))
  return (t === r ? (r = o) : r < 0 && (r = e.length), e.slice(t, r))
}
function nc(e) {
  if ((zt(e), e.length === 0)) return '.'
  let n = -1,
    t = e.length,
    r
  for (; --t; )
    if (e.codePointAt(t) === 47) {
      if (r) {
        n = t
        break
      }
    } else r || (r = true)
  return n < 0
    ? e.codePointAt(0) === 47
      ? '/'
      : '.'
    : n === 1 && e.codePointAt(0) === 47
      ? '//'
      : e.slice(0, n)
}
function rc(e) {
  zt(e)
  let n = e.length,
    t = -1,
    r = 0,
    i = -1,
    l = 0,
    o
  for (; n--; ) {
    const a = e.codePointAt(n)
    if (a === 47) {
      if (o) {
        r = n + 1
        break
      }
      continue
    }
    ;(t < 0 && ((o = true), (t = n + 1)),
      a === 46 ? (i < 0 ? (i = n) : l !== 1 && (l = 1)) : i > -1 && (l = -1))
  }
  return i < 0 || t < 0 || l === 0 || (l === 1 && i === t - 1 && i === r + 1) ? '' : e.slice(i, t)
}
function ic(...e) {
  let n = -1,
    t
  for (; ++n < e.length; ) (zt(e[n]), e[n] && (t = t === void 0 ? e[n] : t + '/' + e[n]))
  return t === void 0 ? '.' : lc(t)
}
function lc(e) {
  zt(e)
  const n = e.codePointAt(0) === 47
  let t = oc(e, !n)
  return (
    t.length === 0 && !n && (t = '.'),
    t.length > 0 && e.codePointAt(e.length - 1) === 47 && (t += '/'),
    n ? '/' + t : t
  )
}
function oc(e, n) {
  let t = '',
    r = 0,
    i = -1,
    l = 0,
    o = -1,
    a,
    s
  for (; ++o <= e.length; ) {
    if (o < e.length) a = e.codePointAt(o)
    else {
      if (a === 47) break
      a = 47
    }
    if (a === 47) {
      if (!(i === o - 1 || l === 1))
        if (i !== o - 1 && l === 2) {
          if (
            t.length < 2 ||
            r !== 2 ||
            t.codePointAt(t.length - 1) !== 46 ||
            t.codePointAt(t.length - 2) !== 46
          ) {
            if (t.length > 2) {
              if (((s = t.lastIndexOf('/')), s !== t.length - 1)) {
                ;(s < 0
                  ? ((t = ''), (r = 0))
                  : ((t = t.slice(0, s)), (r = t.length - 1 - t.lastIndexOf('/'))),
                  (i = o),
                  (l = 0))
                continue
              }
            } else if (t.length > 0) {
              ;((t = ''), (r = 0), (i = o), (l = 0))
              continue
            }
          }
          n && ((t = t.length > 0 ? t + '/..' : '..'), (r = 2))
        } else
          (t.length > 0 ? (t += '/' + e.slice(i + 1, o)) : (t = e.slice(i + 1, o)), (r = o - i - 1))
      ;((i = o), (l = 0))
    } else a === 46 && l > -1 ? l++ : (l = -1)
  }
  return t
}
function zt(e) {
  if (typeof e != 'string')
    throw new TypeError('Path must be a string. Received ' + JSON.stringify(e))
}
const ac = { cwd: sc }
function sc() {
  return '/'
}
function Vn(e) {
  return !!(
    e !== null &&
    typeof e == 'object' &&
    'href' in e &&
    e.href &&
    'protocol' in e &&
    e.protocol &&
    e.auth === void 0
  )
}
function uc(e) {
  if (typeof e == 'string') e = new URL(e)
  else if (!Vn(e)) {
    const n = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + e + '`'
    )
    throw ((n.code = 'ERR_INVALID_ARG_TYPE'), n)
  }
  if (e.protocol !== 'file:') {
    const n = new TypeError('The URL must be of scheme file')
    throw ((n.code = 'ERR_INVALID_URL_SCHEME'), n)
  }
  return cc(e)
}
function cc(e) {
  if (e.hostname !== '') {
    const r = new TypeError('File URL host must be "localhost" or empty on darwin')
    throw ((r.code = 'ERR_INVALID_FILE_URL_HOST'), r)
  }
  const n = e.pathname
  let t = -1
  for (; ++t < n.length; )
    if (n.codePointAt(t) === 37 && n.codePointAt(t + 1) === 50) {
      const r = n.codePointAt(t + 2)
      if (r === 70 || r === 102) {
        const i = new TypeError('File URL path must not include encoded / characters')
        throw ((i.code = 'ERR_INVALID_FILE_URL_PATH'), i)
      }
    }
  return decodeURIComponent(n)
}
const jn = ['history', 'path', 'basename', 'stem', 'extname', 'dirname']
class hc {
  constructor(n) {
    let t
    ;(n
      ? Vn(n)
        ? (t = { path: n })
        : typeof n == 'string' || fc(n)
          ? (t = { value: n })
          : (t = n)
      : (t = {}),
      (this.cwd = 'cwd' in t ? '' : ac.cwd()),
      (this.data = {}),
      (this.history = []),
      (this.messages = []),
      this.value,
      this.map,
      this.result,
      this.stored)
    let r = -1
    for (; ++r < jn.length; ) {
      const l = jn[r]
      l in t && t[l] !== void 0 && t[l] !== null && (this[l] = l === 'history' ? [...t[l]] : t[l])
    }
    let i
    for (i in t) jn.includes(i) || (this[i] = t[i])
  }
  get basename() {
    return typeof this.path == 'string' ? Oe.basename(this.path) : void 0
  }
  set basename(n) {
    ;(Un(n, 'basename'), Hn(n, 'basename'), (this.path = Oe.join(this.dirname || '', n)))
  }
  get dirname() {
    return typeof this.path == 'string' ? Oe.dirname(this.path) : void 0
  }
  set dirname(n) {
    ;(Ei(this.basename, 'dirname'), (this.path = Oe.join(n || '', this.basename)))
  }
  get extname() {
    return typeof this.path == 'string' ? Oe.extname(this.path) : void 0
  }
  set extname(n) {
    if ((Hn(n, 'extname'), Ei(this.dirname, 'extname'), n)) {
      if (n.codePointAt(0) !== 46) throw new Error('`extname` must start with `.`')
      if (n.includes('.', 1)) throw new Error('`extname` cannot contain multiple dots')
    }
    this.path = Oe.join(this.dirname, this.stem + (n || ''))
  }
  get path() {
    return this.history[this.history.length - 1]
  }
  set path(n) {
    ;(Vn(n) && (n = uc(n)), Un(n, 'path'), this.path !== n && this.history.push(n))
  }
  get stem() {
    return typeof this.path == 'string' ? Oe.basename(this.path, this.extname) : void 0
  }
  set stem(n) {
    ;(Un(n, 'stem'),
      Hn(n, 'stem'),
      (this.path = Oe.join(this.dirname || '', n + (this.extname || ''))))
  }
  fail(n, t, r) {
    const i = this.message(n, t, r)
    throw ((i.fatal = true), i)
  }
  info(n, t, r) {
    const i = this.message(n, t, r)
    return ((i.fatal = void 0), i)
  }
  message(n, t, r) {
    const i = new oe(n, t, r)
    return (
      this.path && ((i.name = this.path + ':' + i.name), (i.file = this.path)),
      (i.fatal = false),
      this.messages.push(i),
      i
    )
  }
  toString(n) {
    return this.value === void 0
      ? ''
      : typeof this.value == 'string'
        ? this.value
        : new TextDecoder(n || void 0).decode(this.value)
  }
}
function Hn(e, n) {
  if (e && e.includes(Oe.sep))
    throw new Error('`' + n + '` cannot be a path: did not expect `' + Oe.sep + '`')
}
function Un(e, n) {
  if (!e) throw new Error('`' + n + '` cannot be empty')
}
function Ei(e, n) {
  if (!e) throw new Error('Setting `' + n + '` requires `path` to be set too')
}
function fc(e) {
  return !!(e && typeof e == 'object' && 'byteLength' in e && 'byteOffset' in e)
}
const pc = function (e) {
    const r = this.constructor.prototype,
      i = r[e],
      l = function () {
        return i.apply(l, arguments)
      }
    return (Object.setPrototypeOf(l, r), l)
  },
  dc = {}.hasOwnProperty
class Lr extends pc {
  constructor() {
    ;(super('copy'),
      (this.Compiler = void 0),
      (this.Parser = void 0),
      (this.attachers = []),
      (this.compiler = void 0),
      (this.freezeIndex = -1),
      (this.frozen = void 0),
      (this.namespace = {}),
      (this.parser = void 0),
      (this.transformers = Zu()))
  }
  copy() {
    const n = new Lr()
    let t = -1
    for (; ++t < this.attachers.length; ) {
      const r = this.attachers[t]
      n.use(...r)
    }
    return (n.data(Mn(true, {}, this.namespace)), n)
  }
  data(n, t) {
    return typeof n == 'string'
      ? arguments.length === 2
        ? (Xn('data', this.frozen), (this.namespace[n] = t), this)
        : (dc.call(this.namespace, n) && this.namespace[n]) || void 0
      : n
        ? (Xn('data', this.frozen), (this.namespace = n), this)
        : this.namespace
  }
  freeze() {
    if (this.frozen) return this
    const n = this
    for (; ++this.freezeIndex < this.attachers.length; ) {
      const [t, ...r] = this.attachers[this.freezeIndex]
      if (r[0] === false) continue
      r[0] === true && (r[0] = void 0)
      const i = t.call(n, ...r)
      typeof i == 'function' && this.transformers.use(i)
    }
    return ((this.frozen = true), (this.freezeIndex = Number.POSITIVE_INFINITY), this)
  }
  parse(n) {
    this.freeze()
    const t = an(n),
      r = this.parser || this.Parser
    return (Wn('parse', r), r(String(t), t))
  }
  process(n, t) {
    const r = this
    return (
      this.freeze(),
      Wn('process', this.parser || this.Parser),
      qn('process', this.compiler || this.Compiler),
      t ? i(void 0, t) : new Promise(i)
    )
    function i(l, o) {
      const a = an(n),
        s = r.parse(a)
      r.run(s, a, function (h, c, p) {
        if (h || !c || !p) return u(h)
        const f = c,
          d = r.stringify(f, p)
        ;(yc(d) ? (p.value = d) : (p.result = d), u(h, p))
      })
      function u(h, c) {
        h || !c ? o(h) : l ? l(c) : t(void 0, c)
      }
    }
  }
  processSync(n) {
    let t = false,
      r
    return (
      this.freeze(),
      Wn('processSync', this.parser || this.Parser),
      qn('processSync', this.compiler || this.Compiler),
      this.process(n, i),
      Ai('processSync', 'process', t),
      r
    )
    function i(l, o) {
      ;((t = true), Si(l), (r = o))
    }
  }
  run(n, t, r) {
    ;(Ii(n), this.freeze())
    const i = this.transformers
    return (
      !r && typeof t == 'function' && ((r = t), (t = void 0)),
      r ? l(void 0, r) : new Promise(l)
    )
    function l(o, a) {
      const s = an(t)
      i.run(n, s, u)
      function u(h, c, p) {
        const f = c || n
        h ? a(h) : o ? o(f) : r(void 0, f, p)
      }
    }
  }
  runSync(n, t) {
    let r = false,
      i
    return (this.run(n, t, l), Ai('runSync', 'run', r), i)
    function l(o, a) {
      ;(Si(o), (i = a), (r = true))
    }
  }
  stringify(n, t) {
    this.freeze()
    const r = an(t),
      i = this.compiler || this.Compiler
    return (qn('stringify', i), Ii(n), i(n, r))
  }
  use(n, ...t) {
    const r = this.attachers,
      i = this.namespace
    if ((Xn('use', this.frozen), n != null))
      if (typeof n == 'function') s(n, t)
      else if (typeof n == 'object') Array.isArray(n) ? a(n) : o(n)
      else throw new TypeError('Expected usable value, not `' + n + '`')
    return this
    function l(u) {
      if (typeof u == 'function') s(u, [])
      else if (typeof u == 'object')
        if (Array.isArray(u)) {
          const [h, ...c] = u
          s(h, c)
        } else o(u)
      else throw new TypeError('Expected usable value, not `' + u + '`')
    }
    function o(u) {
      if (!('plugins' in u) && !('settings' in u))
        throw new Error(
          'Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither'
        )
      ;(a(u.plugins), u.settings && (i.settings = Mn(true, i.settings, u.settings)))
    }
    function a(u) {
      let h = -1
      if (u != null)
        if (Array.isArray(u))
          for (; ++h < u.length; ) {
            const c = u[h]
            l(c)
          }
        else throw new TypeError('Expected a list of plugins, not `' + u + '`')
    }
    function s(u, h) {
      let c = -1,
        p = -1
      for (; ++c < r.length; )
        if (r[c][0] === u) {
          p = c
          break
        }
      if (p === -1) r.push([u, ...h])
      else if (h.length > 0) {
        let [f, ...d] = h
        const b = r[p][1]
        ;(Nn(b) && Nn(f) && (f = Mn(true, b, f)), (r[p] = [u, f, ...d]))
      }
    }
  }
}
const mc = new Lr().freeze()
function Wn(e, n) {
  if (typeof n != 'function') throw new TypeError('Cannot `' + e + '` without `parser`')
}
function qn(e, n) {
  if (typeof n != 'function') throw new TypeError('Cannot `' + e + '` without `compiler`')
}
function Xn(e, n) {
  if (n)
    throw new Error(
      'Cannot call `' +
        e +
        '` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.'
    )
}
function Ii(e) {
  if (!Nn(e) || typeof e.type != 'string') throw new TypeError('Expected node, got `' + e + '`')
}
function Ai(e, n, t) {
  if (!t) throw new Error('`' + e + '` finished async. Use `' + n + '` instead')
}
function an(e) {
  return gc(e) ? e : new hc(e)
}
function gc(e) {
  return !!(e && typeof e == 'object' && 'message' in e && 'messages' in e)
}
function yc(e) {
  return typeof e == 'string' || bc(e)
}
function bc(e) {
  return !!(e && typeof e == 'object' && 'byteLength' in e && 'byteOffset' in e)
}
const kc = {}
function xc(e, n) {
  const t = kc,
    r = typeof t.includeImageAlt == 'boolean' ? t.includeImageAlt : true,
    i = typeof t.includeHtml == 'boolean' ? t.includeHtml : true
  return Ti(e, r, i)
}
function Ti(e, n, t) {
  if (wc(e)) {
    if ('value' in e) return e.type === 'html' && !t ? '' : e.value
    if (n && 'alt' in e && e.alt) return e.alt
    if ('children' in e) return Oi(e.children, n, t)
  }
  return Array.isArray(e) ? Oi(e, n, t) : ''
}
function Oi(e, n, t) {
  const r = []
  let i = -1
  for (; ++i < e.length; ) r[i] = Ti(e[i], n, t)
  return r.join('')
}
function wc(e) {
  return !!(e && typeof e == 'object')
}
const Li = document.createElement('i')
function Yn(e) {
  const n = '&' + e + ';'
  Li.innerHTML = n
  const t = Li.textContent
  return (t.charCodeAt(t.length - 1) === 59 && e !== 'semi') || t === n ? false : t
}
function Le(e, n, t, r) {
  const i = e.length
  let l = 0,
    o
  if ((n < 0 ? (n = -n > i ? 0 : i + n) : (n = n > i ? i : n), (t = t > 0 ? t : 0), r.length < 1e4))
    ((o = Array.from(r)), o.unshift(n, t), e.splice(...o))
  else
    for (t && e.splice(n, t); l < r.length; )
      ((o = r.slice(l, l + 1e4)), o.unshift(n, 0), e.splice(...o), (l += 1e4), (n += 1e4))
}
function be(e, n) {
  return e.length > 0 ? (Le(e, e.length, 0, n), e) : n
}
const Pi = {}.hasOwnProperty
function Sc(e) {
  const n = {}
  let t = -1
  for (; ++t < e.length; ) Cc(n, e[t])
  return n
}
function Cc(e, n) {
  let t
  for (t in n) {
    const i = (Pi.call(e, t) ? e[t] : void 0) || (e[t] = {}),
      l = n[t]
    let o
    if (l)
      for (o in l) {
        Pi.call(i, o) || (i[o] = [])
        const a = l[o]
        vc(i[o], Array.isArray(a) ? a : a ? [a] : [])
      }
  }
}
function vc(e, n) {
  let t = -1
  const r = []
  for (; ++t < n.length; ) (n[t].add === 'after' ? e : r).push(n[t])
  Le(e, 0, 0, r)
}
function zi(e, n) {
  const t = Number.parseInt(e, n)
  return t < 9 ||
    t === 11 ||
    (t > 13 && t < 32) ||
    (t > 126 && t < 160) ||
    (t > 55295 && t < 57344) ||
    (t > 64975 && t < 65008) ||
    (t & 65535) === 65535 ||
    (t & 65535) === 65534 ||
    t > 1114111
    ? '�'
    : String.fromCodePoint(t)
}
function bt(e) {
  return e
    .replace(/[\t\n\r ]+/g, ' ')
    .replace(/^ | $/g, '')
    .toLowerCase()
    .toUpperCase()
}
const Pe = Xe(/[A-Za-z]/),
  me = Xe(/[\dA-Za-z]/),
  _c = Xe(/[#-'*+\--9=?A-Z^-~]/)
function Gn(e) {
  return e !== null && (e < 32 || e === 127)
}
const Kn = Xe(/\d/),
  Ec = Xe(/[\dA-Fa-f]/),
  Ic = Xe(/[!-/:-@[-`{-~]/)
function D(e) {
  return e !== null && e < -2
}
function se(e) {
  return e !== null && (e < 0 || e === 32)
}
function j(e) {
  return e === -2 || e === -1 || e === 32
}
const Ac = Xe(new RegExp('\\p{P}|\\p{S}', 'u')),
  Tc = Xe(/\s/)
function Xe(e) {
  return n
  function n(t) {
    return t !== null && t > -1 && e.test(String.fromCharCode(t))
  }
}
function kt(e) {
  const n = []
  let t = -1,
    r = 0,
    i = 0
  for (; ++t < e.length; ) {
    const l = e.charCodeAt(t)
    let o = ''
    if (l === 37 && me(e.charCodeAt(t + 1)) && me(e.charCodeAt(t + 2))) i = 2
    else if (l < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(l)) || (o = String.fromCharCode(l))
    else if (l > 55295 && l < 57344) {
      const a = e.charCodeAt(t + 1)
      l < 56320 && a > 56319 && a < 57344 ? ((o = String.fromCharCode(l, a)), (i = 1)) : (o = '�')
    } else o = String.fromCharCode(l)
    ;(o && (n.push(e.slice(r, t), encodeURIComponent(o)), (r = t + i + 1), (o = '')),
      i && ((t += i), (i = 0)))
  }
  return n.join('') + e.slice(r)
}
function q(e, n, t, r) {
  const i = r ? r - 1 : Number.POSITIVE_INFINITY
  let l = 0
  return o
  function o(s) {
    return j(s) ? (e.enter(t), a(s)) : n(s)
  }
  function a(s) {
    return j(s) && l++ < i ? (e.consume(s), a) : (e.exit(t), n(s))
  }
}
const Oc = { tokenize: Lc }
function Lc(e) {
  const n = e.attempt(this.parser.constructs.contentInitial, r, i)
  let t
  return n
  function r(a) {
    if (a === null) {
      e.consume(a)
      return
    }
    return (e.enter('lineEnding'), e.consume(a), e.exit('lineEnding'), q(e, n, 'linePrefix'))
  }
  function i(a) {
    return (e.enter('paragraph'), l(a))
  }
  function l(a) {
    const s = e.enter('chunkText', { contentType: 'text', previous: t })
    return (t && (t.next = s), (t = s), o(a))
  }
  function o(a) {
    if (a === null) {
      ;(e.exit('chunkText'), e.exit('paragraph'), e.consume(a))
      return
    }
    return D(a) ? (e.consume(a), e.exit('chunkText'), l) : (e.consume(a), o)
  }
}
const Pc = { tokenize: zc },
  Di = { tokenize: Dc }
function zc(e) {
  const n = this,
    t = []
  let r = 0,
    i,
    l,
    o
  return a
  function a(C) {
    if (r < t.length) {
      const P = t[r]
      return ((n.containerState = P[1]), e.attempt(P[0].continuation, s, u)(C))
    }
    return u(C)
  }
  function s(C) {
    if ((r++, n.containerState._closeFlow)) {
      ;((n.containerState._closeFlow = void 0), i && v())
      const P = n.events.length
      let F = P,
        x
      for (; F--; )
        if (n.events[F][0] === 'exit' && n.events[F][1].type === 'chunkFlow') {
          x = n.events[F][1].end
          break
        }
      y(r)
      let B = P
      for (; B < n.events.length; ) ((n.events[B][1].end = { ...x }), B++)
      return (Le(n.events, F + 1, 0, n.events.slice(P)), (n.events.length = B), u(C))
    }
    return a(C)
  }
  function u(C) {
    if (r === t.length) {
      if (!i) return p(C)
      if (i.currentConstruct && i.currentConstruct.concrete) return d(C)
      n.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack)
    }
    return ((n.containerState = {}), e.check(Di, h, c)(C))
  }
  function h(C) {
    return (i && v(), y(r), p(C))
  }
  function c(C) {
    return ((n.parser.lazy[n.now().line] = r !== t.length), (o = n.now().offset), d(C))
  }
  function p(C) {
    return ((n.containerState = {}), e.attempt(Di, f, d)(C))
  }
  function f(C) {
    return (r++, t.push([n.currentConstruct, n.containerState]), p(C))
  }
  function d(C) {
    if (C === null) {
      ;(i && v(), y(0), e.consume(C))
      return
    }
    return (
      (i = i || n.parser.flow(n.now())),
      e.enter('chunkFlow', { _tokenizer: i, contentType: 'flow', previous: l }),
      b(C)
    )
  }
  function b(C) {
    if (C === null) {
      ;(S(e.exit('chunkFlow'), true), y(0), e.consume(C))
      return
    }
    return D(C)
      ? (e.consume(C), S(e.exit('chunkFlow')), (r = 0), (n.interrupt = void 0), a)
      : (e.consume(C), b)
  }
  function S(C, P) {
    const F = n.sliceStream(C)
    if (
      (P && F.push(null),
      (C.previous = l),
      l && (l.next = C),
      (l = C),
      i.defineSkip(C.start),
      i.write(F),
      n.parser.lazy[C.start.line])
    ) {
      let x = i.events.length
      for (; x--; )
        if (
          i.events[x][1].start.offset < o &&
          (!i.events[x][1].end || i.events[x][1].end.offset > o)
        )
          return
      const B = n.events.length
      let H = B,
        V,
        k
      for (; H--; )
        if (n.events[H][0] === 'exit' && n.events[H][1].type === 'chunkFlow') {
          if (V) {
            k = n.events[H][1].end
            break
          }
          V = true
        }
      for (y(r), x = B; x < n.events.length; ) ((n.events[x][1].end = { ...k }), x++)
      ;(Le(n.events, H + 1, 0, n.events.slice(B)), (n.events.length = x))
    }
  }
  function y(C) {
    let P = t.length
    for (; P-- > C; ) {
      const F = t[P]
      ;((n.containerState = F[1]), F[0].exit.call(n, e))
    }
    t.length = C
  }
  function v() {
    ;(i.write([null]), (l = void 0), (i = void 0), (n.containerState._closeFlow = void 0))
  }
}
function Dc(e, n, t) {
  return q(
    e,
    e.attempt(this.parser.constructs.document, n, t),
    'linePrefix',
    this.parser.constructs.disable.null.includes('codeIndented') ? void 0 : 4
  )
}
function Fi(e) {
  if (e === null || se(e) || Tc(e)) return 1
  if (Ac(e)) return 2
}
function Qn(e, n, t) {
  const r = []
  let i = -1
  for (; ++i < e.length; ) {
    const l = e[i].resolveAll
    l && !r.includes(l) && ((n = l(n, t)), r.push(l))
  }
  return n
}
const Jn = { name: 'attention', resolveAll: Fc, tokenize: Rc }
function Fc(e, n) {
  let t = -1,
    r,
    i,
    l,
    o,
    a,
    s,
    u,
    h
  for (; ++t < e.length; )
    if (e[t][0] === 'enter' && e[t][1].type === 'attentionSequence' && e[t][1]._close) {
      for (r = t; r--; )
        if (
          e[r][0] === 'exit' &&
          e[r][1].type === 'attentionSequence' &&
          e[r][1]._open &&
          n.sliceSerialize(e[r][1]).charCodeAt(0) === n.sliceSerialize(e[t][1]).charCodeAt(0)
        ) {
          if (
            (e[r][1]._close || e[t][1]._open) &&
            (e[t][1].end.offset - e[t][1].start.offset) % 3 &&
            !(
              (e[r][1].end.offset -
                e[r][1].start.offset +
                e[t][1].end.offset -
                e[t][1].start.offset) %
              3
            )
          )
            continue
          s =
            e[r][1].end.offset - e[r][1].start.offset > 1 &&
            e[t][1].end.offset - e[t][1].start.offset > 1
              ? 2
              : 1
          const c = { ...e[r][1].end },
            p = { ...e[t][1].start }
          ;(Ri(c, -s),
            Ri(p, s),
            (o = {
              type: s > 1 ? 'strongSequence' : 'emphasisSequence',
              start: c,
              end: { ...e[r][1].end },
            }),
            (a = {
              type: s > 1 ? 'strongSequence' : 'emphasisSequence',
              start: { ...e[t][1].start },
              end: p,
            }),
            (l = {
              type: s > 1 ? 'strongText' : 'emphasisText',
              start: { ...e[r][1].end },
              end: { ...e[t][1].start },
            }),
            (i = { type: s > 1 ? 'strong' : 'emphasis', start: { ...o.start }, end: { ...a.end } }),
            (e[r][1].end = { ...o.start }),
            (e[t][1].start = { ...a.end }),
            (u = []),
            e[r][1].end.offset - e[r][1].start.offset &&
              (u = be(u, [
                ['enter', e[r][1], n],
                ['exit', e[r][1], n],
              ])),
            (u = be(u, [
              ['enter', i, n],
              ['enter', o, n],
              ['exit', o, n],
              ['enter', l, n],
            ])),
            (u = be(u, Qn(n.parser.constructs.insideSpan.null, e.slice(r + 1, t), n))),
            (u = be(u, [
              ['exit', l, n],
              ['enter', a, n],
              ['exit', a, n],
              ['exit', i, n],
            ])),
            e[t][1].end.offset - e[t][1].start.offset
              ? ((h = 2),
                (u = be(u, [
                  ['enter', e[t][1], n],
                  ['exit', e[t][1], n],
                ])))
              : (h = 0),
            Le(e, r - 1, t - r + 3, u),
            (t = r + u.length - h - 2))
          break
        }
    }
  for (t = -1; ++t < e.length; ) e[t][1].type === 'attentionSequence' && (e[t][1].type = 'data')
  return e
}
function Rc(e, n) {
  const t = this.parser.constructs.attentionMarkers.null,
    r = this.previous,
    i = Fi(r)
  let l
  return o
  function o(s) {
    return ((l = s), e.enter('attentionSequence'), a(s))
  }
  function a(s) {
    if (s === l) return (e.consume(s), a)
    const u = e.exit('attentionSequence'),
      h = Fi(s),
      c = !h || (h === 2 && i) || t.includes(s),
      p = !i || (i === 2 && h) || t.includes(r)
    return (
      (u._open = !!(l === 42 ? c : c && (i || !p))),
      (u._close = !!(l === 42 ? p : p && (h || !c))),
      n(s)
    )
  }
}
function Ri(e, n) {
  ;((e.column += n), (e.offset += n), (e._bufferIndex += n))
}
const Bc = { name: 'autolink', tokenize: Mc }
function Mc(e, n, t) {
  let r = 0
  return i
  function i(f) {
    return (
      e.enter('autolink'),
      e.enter('autolinkMarker'),
      e.consume(f),
      e.exit('autolinkMarker'),
      e.enter('autolinkProtocol'),
      l
    )
  }
  function l(f) {
    return Pe(f) ? (e.consume(f), o) : f === 64 ? t(f) : u(f)
  }
  function o(f) {
    return f === 43 || f === 45 || f === 46 || me(f) ? ((r = 1), a(f)) : u(f)
  }
  function a(f) {
    return f === 58
      ? (e.consume(f), (r = 0), s)
      : (f === 43 || f === 45 || f === 46 || me(f)) && r++ < 32
        ? (e.consume(f), a)
        : ((r = 0), u(f))
  }
  function s(f) {
    return f === 62
      ? (e.exit('autolinkProtocol'),
        e.enter('autolinkMarker'),
        e.consume(f),
        e.exit('autolinkMarker'),
        e.exit('autolink'),
        n)
      : f === null || f === 32 || f === 60 || Gn(f)
        ? t(f)
        : (e.consume(f), s)
  }
  function u(f) {
    return f === 64 ? (e.consume(f), h) : _c(f) ? (e.consume(f), u) : t(f)
  }
  function h(f) {
    return me(f) ? c(f) : t(f)
  }
  function c(f) {
    return f === 46
      ? (e.consume(f), (r = 0), h)
      : f === 62
        ? ((e.exit('autolinkProtocol').type = 'autolinkEmail'),
          e.enter('autolinkMarker'),
          e.consume(f),
          e.exit('autolinkMarker'),
          e.exit('autolink'),
          n)
        : p(f)
  }
  function p(f) {
    if ((f === 45 || me(f)) && r++ < 63) {
      const d = f === 45 ? p : c
      return (e.consume(f), d)
    }
    return t(f)
  }
}
const sn = { partial: true, tokenize: Nc }
function Nc(e, n, t) {
  return r
  function r(l) {
    return j(l) ? q(e, i, 'linePrefix')(l) : i(l)
  }
  function i(l) {
    return l === null || D(l) ? n(l) : t(l)
  }
}
const Bi = { continuation: { tokenize: Vc }, exit: jc, name: 'blockQuote', tokenize: $c }
function $c(e, n, t) {
  const r = this
  return i
  function i(o) {
    if (o === 62) {
      const a = r.containerState
      return (
        a.open || (e.enter('blockQuote', { _container: true }), (a.open = true)),
        e.enter('blockQuotePrefix'),
        e.enter('blockQuoteMarker'),
        e.consume(o),
        e.exit('blockQuoteMarker'),
        l
      )
    }
    return t(o)
  }
  function l(o) {
    return j(o)
      ? (e.enter('blockQuotePrefixWhitespace'),
        e.consume(o),
        e.exit('blockQuotePrefixWhitespace'),
        e.exit('blockQuotePrefix'),
        n)
      : (e.exit('blockQuotePrefix'), n(o))
  }
}
function Vc(e, n, t) {
  const r = this
  return i
  function i(o) {
    return j(o)
      ? q(
          e,
          l,
          'linePrefix',
          r.parser.constructs.disable.null.includes('codeIndented') ? void 0 : 4
        )(o)
      : l(o)
  }
  function l(o) {
    return e.attempt(Bi, n, t)(o)
  }
}
function jc(e) {
  e.exit('blockQuote')
}
const Mi = { name: 'characterEscape', tokenize: Hc }
function Hc(e, n, t) {
  return r
  function r(l) {
    return (
      e.enter('characterEscape'),
      e.enter('escapeMarker'),
      e.consume(l),
      e.exit('escapeMarker'),
      i
    )
  }
  function i(l) {
    return Ic(l)
      ? (e.enter('characterEscapeValue'),
        e.consume(l),
        e.exit('characterEscapeValue'),
        e.exit('characterEscape'),
        n)
      : t(l)
  }
}
const Ni = { name: 'characterReference', tokenize: Uc }
function Uc(e, n, t) {
  const r = this
  let i = 0,
    l,
    o
  return a
  function a(c) {
    return (
      e.enter('characterReference'),
      e.enter('characterReferenceMarker'),
      e.consume(c),
      e.exit('characterReferenceMarker'),
      s
    )
  }
  function s(c) {
    return c === 35
      ? (e.enter('characterReferenceMarkerNumeric'),
        e.consume(c),
        e.exit('characterReferenceMarkerNumeric'),
        u)
      : (e.enter('characterReferenceValue'), (l = 31), (o = me), h(c))
  }
  function u(c) {
    return c === 88 || c === 120
      ? (e.enter('characterReferenceMarkerHexadecimal'),
        e.consume(c),
        e.exit('characterReferenceMarkerHexadecimal'),
        e.enter('characterReferenceValue'),
        (l = 6),
        (o = Ec),
        h)
      : (e.enter('characterReferenceValue'), (l = 7), (o = Kn), h(c))
  }
  function h(c) {
    if (c === 59 && i) {
      const p = e.exit('characterReferenceValue')
      return o === me && !Yn(r.sliceSerialize(p))
        ? t(c)
        : (e.enter('characterReferenceMarker'),
          e.consume(c),
          e.exit('characterReferenceMarker'),
          e.exit('characterReference'),
          n)
    }
    return o(c) && i++ < l ? (e.consume(c), h) : t(c)
  }
}
const $i = { partial: true, tokenize: qc },
  Vi = { concrete: true, name: 'codeFenced', tokenize: Wc }
function Wc(e, n, t) {
  const r = this,
    i = { partial: true, tokenize: F }
  let l = 0,
    o = 0,
    a
  return s
  function s(x) {
    return u(x)
  }
  function u(x) {
    const B = r.events[r.events.length - 1]
    return (
      (l = B && B[1].type === 'linePrefix' ? B[2].sliceSerialize(B[1], true).length : 0),
      (a = x),
      e.enter('codeFenced'),
      e.enter('codeFencedFence'),
      e.enter('codeFencedFenceSequence'),
      h(x)
    )
  }
  function h(x) {
    return x === a
      ? (o++, e.consume(x), h)
      : o < 3
        ? t(x)
        : (e.exit('codeFencedFenceSequence'), j(x) ? q(e, c, 'whitespace')(x) : c(x))
  }
  function c(x) {
    return x === null || D(x)
      ? (e.exit('codeFencedFence'), r.interrupt ? n(x) : e.check($i, b, P)(x))
      : (e.enter('codeFencedFenceInfo'), e.enter('chunkString', { contentType: 'string' }), p(x))
  }
  function p(x) {
    return x === null || D(x)
      ? (e.exit('chunkString'), e.exit('codeFencedFenceInfo'), c(x))
      : j(x)
        ? (e.exit('chunkString'), e.exit('codeFencedFenceInfo'), q(e, f, 'whitespace')(x))
        : x === 96 && x === a
          ? t(x)
          : (e.consume(x), p)
  }
  function f(x) {
    return x === null || D(x)
      ? c(x)
      : (e.enter('codeFencedFenceMeta'), e.enter('chunkString', { contentType: 'string' }), d(x))
  }
  function d(x) {
    return x === null || D(x)
      ? (e.exit('chunkString'), e.exit('codeFencedFenceMeta'), c(x))
      : x === 96 && x === a
        ? t(x)
        : (e.consume(x), d)
  }
  function b(x) {
    return e.attempt(i, P, S)(x)
  }
  function S(x) {
    return (e.enter('lineEnding'), e.consume(x), e.exit('lineEnding'), y)
  }
  function y(x) {
    return l > 0 && j(x) ? q(e, v, 'linePrefix', l + 1)(x) : v(x)
  }
  function v(x) {
    return x === null || D(x) ? e.check($i, b, P)(x) : (e.enter('codeFlowValue'), C(x))
  }
  function C(x) {
    return x === null || D(x) ? (e.exit('codeFlowValue'), v(x)) : (e.consume(x), C)
  }
  function P(x) {
    return (e.exit('codeFenced'), n(x))
  }
  function F(x, B, H) {
    let V = 0
    return k
    function k(R) {
      return (x.enter('lineEnding'), x.consume(R), x.exit('lineEnding'), T)
    }
    function T(R) {
      return (
        x.enter('codeFencedFence'),
        j(R)
          ? q(
              x,
              O,
              'linePrefix',
              r.parser.constructs.disable.null.includes('codeIndented') ? void 0 : 4
            )(R)
          : O(R)
      )
    }
    function O(R) {
      return R === a ? (x.enter('codeFencedFenceSequence'), L(R)) : H(R)
    }
    function L(R) {
      return R === a
        ? (V++, x.consume(R), L)
        : V >= o
          ? (x.exit('codeFencedFenceSequence'), j(R) ? q(x, A, 'whitespace')(R) : A(R))
          : H(R)
    }
    function A(R) {
      return R === null || D(R) ? (x.exit('codeFencedFence'), B(R)) : H(R)
    }
  }
}
function qc(e, n, t) {
  const r = this
  return i
  function i(o) {
    return o === null ? t(o) : (e.enter('lineEnding'), e.consume(o), e.exit('lineEnding'), l)
  }
  function l(o) {
    return r.parser.lazy[r.now().line] ? t(o) : n(o)
  }
}
const Zn = { name: 'codeIndented', tokenize: Yc },
  Xc = { partial: true, tokenize: Gc }
function Yc(e, n, t) {
  const r = this
  return i
  function i(u) {
    return (e.enter('codeIndented'), q(e, l, 'linePrefix', 5)(u))
  }
  function l(u) {
    const h = r.events[r.events.length - 1]
    return h && h[1].type === 'linePrefix' && h[2].sliceSerialize(h[1], true).length >= 4
      ? o(u)
      : t(u)
  }
  function o(u) {
    return u === null ? s(u) : D(u) ? e.attempt(Xc, o, s)(u) : (e.enter('codeFlowValue'), a(u))
  }
  function a(u) {
    return u === null || D(u) ? (e.exit('codeFlowValue'), o(u)) : (e.consume(u), a)
  }
  function s(u) {
    return (e.exit('codeIndented'), n(u))
  }
}
function Gc(e, n, t) {
  const r = this
  return i
  function i(o) {
    return r.parser.lazy[r.now().line]
      ? t(o)
      : D(o)
        ? (e.enter('lineEnding'), e.consume(o), e.exit('lineEnding'), i)
        : q(e, l, 'linePrefix', 5)(o)
  }
  function l(o) {
    const a = r.events[r.events.length - 1]
    return a && a[1].type === 'linePrefix' && a[2].sliceSerialize(a[1], true).length >= 4
      ? n(o)
      : D(o)
        ? i(o)
        : t(o)
  }
}
const Kc = { name: 'codeText', previous: Jc, resolve: Qc, tokenize: Zc }
function Qc(e) {
  let n = e.length - 4,
    t = 3,
    r,
    i
  if (
    (e[t][1].type === 'lineEnding' || e[t][1].type === 'space') &&
    (e[n][1].type === 'lineEnding' || e[n][1].type === 'space')
  ) {
    for (r = t; ++r < n; )
      if (e[r][1].type === 'codeTextData') {
        ;((e[t][1].type = 'codeTextPadding'),
          (e[n][1].type = 'codeTextPadding'),
          (t += 2),
          (n -= 2))
        break
      }
  }
  for (r = t - 1, n++; ++r <= n; )
    i === void 0
      ? r !== n && e[r][1].type !== 'lineEnding' && (i = r)
      : (r === n || e[r][1].type === 'lineEnding') &&
        ((e[i][1].type = 'codeTextData'),
        r !== i + 2 &&
          ((e[i][1].end = e[r - 1][1].end),
          e.splice(i + 2, r - i - 2),
          (n -= r - i - 2),
          (r = i + 2)),
        (i = void 0))
  return e
}
function Jc(e) {
  return e !== 96 || this.events[this.events.length - 1][1].type === 'characterEscape'
}
function Zc(e, n, t) {
  let r = 0,
    i,
    l
  return o
  function o(c) {
    return (e.enter('codeText'), e.enter('codeTextSequence'), a(c))
  }
  function a(c) {
    return c === 96 ? (e.consume(c), r++, a) : (e.exit('codeTextSequence'), s(c))
  }
  function s(c) {
    return c === null
      ? t(c)
      : c === 32
        ? (e.enter('space'), e.consume(c), e.exit('space'), s)
        : c === 96
          ? ((l = e.enter('codeTextSequence')), (i = 0), h(c))
          : D(c)
            ? (e.enter('lineEnding'), e.consume(c), e.exit('lineEnding'), s)
            : (e.enter('codeTextData'), u(c))
  }
  function u(c) {
    return c === null || c === 32 || c === 96 || D(c)
      ? (e.exit('codeTextData'), s(c))
      : (e.consume(c), u)
  }
  function h(c) {
    return c === 96
      ? (e.consume(c), i++, h)
      : i === r
        ? (e.exit('codeTextSequence'), e.exit('codeText'), n(c))
        : ((l.type = 'codeTextData'), u(c))
  }
}
class eh {
  constructor(n) {
    ;((this.left = n ? [...n] : []), (this.right = []))
  }
  get(n) {
    if (n < 0 || n >= this.left.length + this.right.length)
      throw new RangeError(
        'Cannot access index `' +
          n +
          '` in a splice buffer of size `' +
          (this.left.length + this.right.length) +
          '`'
      )
    return n < this.left.length
      ? this.left[n]
      : this.right[this.right.length - n + this.left.length - 1]
  }
  get length() {
    return this.left.length + this.right.length
  }
  shift() {
    return (this.setCursor(0), this.right.pop())
  }
  slice(n, t) {
    const r = t ?? Number.POSITIVE_INFINITY
    return r < this.left.length
      ? this.left.slice(n, r)
      : n > this.left.length
        ? this.right
            .slice(
              this.right.length - r + this.left.length,
              this.right.length - n + this.left.length
            )
            .reverse()
        : this.left
            .slice(n)
            .concat(this.right.slice(this.right.length - r + this.left.length).reverse())
  }
  splice(n, t, r) {
    const i = t || 0
    this.setCursor(Math.trunc(n))
    const l = this.right.splice(this.right.length - i, Number.POSITIVE_INFINITY)
    return (r && Dt(this.left, r), l.reverse())
  }
  pop() {
    return (this.setCursor(Number.POSITIVE_INFINITY), this.left.pop())
  }
  push(n) {
    ;(this.setCursor(Number.POSITIVE_INFINITY), this.left.push(n))
  }
  pushMany(n) {
    ;(this.setCursor(Number.POSITIVE_INFINITY), Dt(this.left, n))
  }
  unshift(n) {
    ;(this.setCursor(0), this.right.push(n))
  }
  unshiftMany(n) {
    ;(this.setCursor(0), Dt(this.right, n.reverse()))
  }
  setCursor(n) {
    if (
      !(
        n === this.left.length ||
        (n > this.left.length && this.right.length === 0) ||
        (n < 0 && this.left.length === 0)
      )
    )
      if (n < this.left.length) {
        const t = this.left.splice(n, Number.POSITIVE_INFINITY)
        Dt(this.right, t.reverse())
      } else {
        const t = this.right.splice(
          this.left.length + this.right.length - n,
          Number.POSITIVE_INFINITY
        )
        Dt(this.left, t.reverse())
      }
  }
}
function Dt(e, n) {
  let t = 0
  if (n.length < 1e4) e.push(...n)
  else for (; t < n.length; ) (e.push(...n.slice(t, t + 1e4)), (t += 1e4))
}
function ji(e) {
  const n = {}
  let t = -1,
    r,
    i,
    l,
    o,
    a,
    s,
    u
  const h = new eh(e)
  for (; ++t < h.length; ) {
    for (; t in n; ) t = n[t]
    if (
      ((r = h.get(t)),
      t &&
        r[1].type === 'chunkFlow' &&
        h.get(t - 1)[1].type === 'listItemPrefix' &&
        ((s = r[1]._tokenizer.events),
        (l = 0),
        l < s.length && s[l][1].type === 'lineEndingBlank' && (l += 2),
        l < s.length && s[l][1].type === 'content'))
    )
      for (; ++l < s.length && s[l][1].type !== 'content'; )
        s[l][1].type === 'chunkText' && ((s[l][1]._isInFirstContentOfListItem = true), l++)
    if (r[0] === 'enter') r[1].contentType && (Object.assign(n, th(h, t)), (t = n[t]), (u = true))
    else if (r[1]._container) {
      for (l = t, i = void 0; l--; )
        if (((o = h.get(l)), o[1].type === 'lineEnding' || o[1].type === 'lineEndingBlank'))
          o[0] === 'enter' &&
            (i && (h.get(i)[1].type = 'lineEndingBlank'), (o[1].type = 'lineEnding'), (i = l))
        else if (!(o[1].type === 'linePrefix' || o[1].type === 'listItemIndent')) break
      i &&
        ((r[1].end = { ...h.get(i)[1].start }),
        (a = h.slice(i, t)),
        a.unshift(r),
        h.splice(i, t - i + 1, a))
    }
  }
  return (Le(e, 0, Number.POSITIVE_INFINITY, h.slice(0)), !u)
}
function th(e, n) {
  const t = e.get(n)[1],
    r = e.get(n)[2]
  let i = n - 1
  const l = []
  let o = t._tokenizer
  o ||
    ((o = r.parser[t.contentType](t.start)),
    t._contentTypeTextTrailing && (o._contentTypeTextTrailing = true))
  const a = o.events,
    s = [],
    u = {}
  let h,
    c,
    p = -1,
    f = t,
    d = 0,
    b = 0
  const S = [b]
  for (; f; ) {
    for (; e.get(++i)[1] !== f; );
    ;(l.push(i),
      f._tokenizer ||
        ((h = r.sliceStream(f)),
        f.next || h.push(null),
        c && o.defineSkip(f.start),
        f._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = true),
        o.write(h),
        f._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = void 0)),
      (c = f),
      (f = f.next))
  }
  for (f = t; ++p < a.length; )
    a[p][0] === 'exit' &&
      a[p - 1][0] === 'enter' &&
      a[p][1].type === a[p - 1][1].type &&
      a[p][1].start.line !== a[p][1].end.line &&
      ((b = p + 1), S.push(b), (f._tokenizer = void 0), (f.previous = void 0), (f = f.next))
  for (
    o.events = [], f ? ((f._tokenizer = void 0), (f.previous = void 0)) : S.pop(), p = S.length;
    p--;

  ) {
    const y = a.slice(S[p], S[p + 1]),
      v = l.pop()
    ;(s.push([v, v + y.length - 1]), e.splice(v, 2, y))
  }
  for (s.reverse(), p = -1; ++p < s.length; )
    ((u[d + s[p][0]] = d + s[p][1]), (d += s[p][1] - s[p][0] - 1))
  return u
}
const nh = { resolve: ih, tokenize: lh },
  rh = { partial: true, tokenize: oh }
function ih(e) {
  return (ji(e), e)
}
function lh(e, n) {
  let t
  return r
  function r(a) {
    return (e.enter('content'), (t = e.enter('chunkContent', { contentType: 'content' })), i(a))
  }
  function i(a) {
    return a === null ? l(a) : D(a) ? e.check(rh, o, l)(a) : (e.consume(a), i)
  }
  function l(a) {
    return (e.exit('chunkContent'), e.exit('content'), n(a))
  }
  function o(a) {
    return (
      e.consume(a),
      e.exit('chunkContent'),
      (t.next = e.enter('chunkContent', { contentType: 'content', previous: t })),
      (t = t.next),
      i
    )
  }
}
function oh(e, n, t) {
  const r = this
  return i
  function i(o) {
    return (
      e.exit('chunkContent'),
      e.enter('lineEnding'),
      e.consume(o),
      e.exit('lineEnding'),
      q(e, l, 'linePrefix')
    )
  }
  function l(o) {
    if (o === null || D(o)) return t(o)
    const a = r.events[r.events.length - 1]
    return !r.parser.constructs.disable.null.includes('codeIndented') &&
      a &&
      a[1].type === 'linePrefix' &&
      a[2].sliceSerialize(a[1], true).length >= 4
      ? n(o)
      : e.interrupt(r.parser.constructs.flow, t, n)(o)
  }
}
function Hi(e, n, t, r, i, l, o, a, s) {
  const u = s || Number.POSITIVE_INFINITY
  let h = 0
  return c
  function c(y) {
    return y === 60
      ? (e.enter(r), e.enter(i), e.enter(l), e.consume(y), e.exit(l), p)
      : y === null || y === 32 || y === 41 || Gn(y)
        ? t(y)
        : (e.enter(r),
          e.enter(o),
          e.enter(a),
          e.enter('chunkString', { contentType: 'string' }),
          b(y))
  }
  function p(y) {
    return y === 62
      ? (e.enter(l), e.consume(y), e.exit(l), e.exit(i), e.exit(r), n)
      : (e.enter(a), e.enter('chunkString', { contentType: 'string' }), f(y))
  }
  function f(y) {
    return y === 62
      ? (e.exit('chunkString'), e.exit(a), p(y))
      : y === null || y === 60 || D(y)
        ? t(y)
        : (e.consume(y), y === 92 ? d : f)
  }
  function d(y) {
    return y === 60 || y === 62 || y === 92 ? (e.consume(y), f) : f(y)
  }
  function b(y) {
    return !h && (y === null || y === 41 || se(y))
      ? (e.exit('chunkString'), e.exit(a), e.exit(o), e.exit(r), n(y))
      : h < u && y === 40
        ? (e.consume(y), h++, b)
        : y === 41
          ? (e.consume(y), h--, b)
          : y === null || y === 32 || y === 40 || Gn(y)
            ? t(y)
            : (e.consume(y), y === 92 ? S : b)
  }
  function S(y) {
    return y === 40 || y === 41 || y === 92 ? (e.consume(y), b) : b(y)
  }
}
function Ui(e, n, t, r, i, l) {
  const o = this
  let a = 0,
    s
  return u
  function u(f) {
    return (e.enter(r), e.enter(i), e.consume(f), e.exit(i), e.enter(l), h)
  }
  function h(f) {
    return a > 999 ||
      f === null ||
      f === 91 ||
      (f === 93 && !s) ||
      (f === 94 && !a && '_hiddenFootnoteSupport' in o.parser.constructs)
      ? t(f)
      : f === 93
        ? (e.exit(l), e.enter(i), e.consume(f), e.exit(i), e.exit(r), n)
        : D(f)
          ? (e.enter('lineEnding'), e.consume(f), e.exit('lineEnding'), h)
          : (e.enter('chunkString', { contentType: 'string' }), c(f))
  }
  function c(f) {
    return f === null || f === 91 || f === 93 || D(f) || a++ > 999
      ? (e.exit('chunkString'), h(f))
      : (e.consume(f), s || (s = !j(f)), f === 92 ? p : c)
  }
  function p(f) {
    return f === 91 || f === 92 || f === 93 ? (e.consume(f), a++, c) : c(f)
  }
}
function Wi(e, n, t, r, i, l) {
  let o
  return a
  function a(p) {
    return p === 34 || p === 39 || p === 40
      ? (e.enter(r), e.enter(i), e.consume(p), e.exit(i), (o = p === 40 ? 41 : p), s)
      : t(p)
  }
  function s(p) {
    return p === o ? (e.enter(i), e.consume(p), e.exit(i), e.exit(r), n) : (e.enter(l), u(p))
  }
  function u(p) {
    return p === o
      ? (e.exit(l), s(o))
      : p === null
        ? t(p)
        : D(p)
          ? (e.enter('lineEnding'), e.consume(p), e.exit('lineEnding'), q(e, u, 'linePrefix'))
          : (e.enter('chunkString', { contentType: 'string' }), h(p))
  }
  function h(p) {
    return p === o || p === null || D(p)
      ? (e.exit('chunkString'), u(p))
      : (e.consume(p), p === 92 ? c : h)
  }
  function c(p) {
    return p === o || p === 92 ? (e.consume(p), h) : h(p)
  }
}
function Ft(e, n) {
  let t
  return r
  function r(i) {
    return D(i)
      ? (e.enter('lineEnding'), e.consume(i), e.exit('lineEnding'), (t = true), r)
      : j(i)
        ? q(e, r, t ? 'linePrefix' : 'lineSuffix')(i)
        : n(i)
  }
}
const ah = { name: 'definition', tokenize: uh },
  sh = { partial: true, tokenize: ch }
function uh(e, n, t) {
  const r = this
  let i
  return l
  function l(f) {
    return (e.enter('definition'), o(f))
  }
  function o(f) {
    return Ui.call(
      r,
      e,
      a,
      t,
      'definitionLabel',
      'definitionLabelMarker',
      'definitionLabelString'
    )(f)
  }
  function a(f) {
    return (
      (i = bt(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))),
      f === 58 ? (e.enter('definitionMarker'), e.consume(f), e.exit('definitionMarker'), s) : t(f)
    )
  }
  function s(f) {
    return se(f) ? Ft(e, u)(f) : u(f)
  }
  function u(f) {
    return Hi(
      e,
      h,
      t,
      'definitionDestination',
      'definitionDestinationLiteral',
      'definitionDestinationLiteralMarker',
      'definitionDestinationRaw',
      'definitionDestinationString'
    )(f)
  }
  function h(f) {
    return e.attempt(sh, c, c)(f)
  }
  function c(f) {
    return j(f) ? q(e, p, 'whitespace')(f) : p(f)
  }
  function p(f) {
    return f === null || D(f) ? (e.exit('definition'), r.parser.defined.push(i), n(f)) : t(f)
  }
}
function ch(e, n, t) {
  return r
  function r(a) {
    return se(a) ? Ft(e, i)(a) : t(a)
  }
  function i(a) {
    return Wi(e, l, t, 'definitionTitle', 'definitionTitleMarker', 'definitionTitleString')(a)
  }
  function l(a) {
    return j(a) ? q(e, o, 'whitespace')(a) : o(a)
  }
  function o(a) {
    return a === null || D(a) ? n(a) : t(a)
  }
}
const hh = { name: 'hardBreakEscape', tokenize: fh }
function fh(e, n, t) {
  return r
  function r(l) {
    return (e.enter('hardBreakEscape'), e.consume(l), i)
  }
  function i(l) {
    return D(l) ? (e.exit('hardBreakEscape'), n(l)) : t(l)
  }
}
const ph = { name: 'headingAtx', resolve: dh, tokenize: mh }
function dh(e, n) {
  let t = e.length - 2,
    r = 3,
    i,
    l
  return (
    e[r][1].type === 'whitespace' && (r += 2),
    t - 2 > r && e[t][1].type === 'whitespace' && (t -= 2),
    e[t][1].type === 'atxHeadingSequence' &&
      (r === t - 1 || (t - 4 > r && e[t - 2][1].type === 'whitespace')) &&
      (t -= r + 1 === t ? 2 : 4),
    t > r &&
      ((i = { type: 'atxHeadingText', start: e[r][1].start, end: e[t][1].end }),
      (l = { type: 'chunkText', start: e[r][1].start, end: e[t][1].end, contentType: 'text' }),
      Le(e, r, t - r + 1, [
        ['enter', i, n],
        ['enter', l, n],
        ['exit', l, n],
        ['exit', i, n],
      ])),
    e
  )
}
function mh(e, n, t) {
  let r = 0
  return i
  function i(h) {
    return (e.enter('atxHeading'), l(h))
  }
  function l(h) {
    return (e.enter('atxHeadingSequence'), o(h))
  }
  function o(h) {
    return h === 35 && r++ < 6
      ? (e.consume(h), o)
      : h === null || se(h)
        ? (e.exit('atxHeadingSequence'), a(h))
        : t(h)
  }
  function a(h) {
    return h === 35
      ? (e.enter('atxHeadingSequence'), s(h))
      : h === null || D(h)
        ? (e.exit('atxHeading'), n(h))
        : j(h)
          ? q(e, a, 'whitespace')(h)
          : (e.enter('atxHeadingText'), u(h))
  }
  function s(h) {
    return h === 35 ? (e.consume(h), s) : (e.exit('atxHeadingSequence'), a(h))
  }
  function u(h) {
    return h === null || h === 35 || se(h) ? (e.exit('atxHeadingText'), a(h)) : (e.consume(h), u)
  }
}
const gh = [
    'address',
    'article',
    'aside',
    'base',
    'basefont',
    'blockquote',
    'body',
    'caption',
    'center',
    'col',
    'colgroup',
    'dd',
    'details',
    'dialog',
    'dir',
    'div',
    'dl',
    'dt',
    'fieldset',
    'figcaption',
    'figure',
    'footer',
    'form',
    'frame',
    'frameset',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'head',
    'header',
    'hr',
    'html',
    'iframe',
    'legend',
    'li',
    'link',
    'main',
    'menu',
    'menuitem',
    'nav',
    'noframes',
    'ol',
    'optgroup',
    'option',
    'p',
    'param',
    'search',
    'section',
    'summary',
    'table',
    'tbody',
    'td',
    'tfoot',
    'th',
    'thead',
    'title',
    'tr',
    'track',
    'ul',
  ],
  qi = ['pre', 'script', 'style', 'textarea'],
  yh = { concrete: true, name: 'htmlFlow', resolveTo: xh, tokenize: wh },
  bh = { partial: true, tokenize: Ch },
  kh = { partial: true, tokenize: Sh }
function xh(e) {
  let n = e.length
  for (; n-- && !(e[n][0] === 'enter' && e[n][1].type === 'htmlFlow'); );
  return (
    n > 1 &&
      e[n - 2][1].type === 'linePrefix' &&
      ((e[n][1].start = e[n - 2][1].start),
      (e[n + 1][1].start = e[n - 2][1].start),
      e.splice(n - 2, 2)),
    e
  )
}
function wh(e, n, t) {
  const r = this
  let i, l, o, a, s
  return u
  function u(g) {
    return h(g)
  }
  function h(g) {
    return (e.enter('htmlFlow'), e.enter('htmlFlowData'), e.consume(g), c)
  }
  function c(g) {
    return g === 33
      ? (e.consume(g), p)
      : g === 47
        ? (e.consume(g), (l = true), b)
        : g === 63
          ? (e.consume(g), (i = 3), r.interrupt ? n : m)
          : Pe(g)
            ? (e.consume(g), (o = String.fromCharCode(g)), S)
            : t(g)
  }
  function p(g) {
    return g === 45
      ? (e.consume(g), (i = 2), f)
      : g === 91
        ? (e.consume(g), (i = 5), (a = 0), d)
        : Pe(g)
          ? (e.consume(g), (i = 4), r.interrupt ? n : m)
          : t(g)
  }
  function f(g) {
    return g === 45 ? (e.consume(g), r.interrupt ? n : m) : t(g)
  }
  function d(g) {
    const we = 'CDATA['
    return g === we.charCodeAt(a++)
      ? (e.consume(g), a === we.length ? (r.interrupt ? n : O) : d)
      : t(g)
  }
  function b(g) {
    return Pe(g) ? (e.consume(g), (o = String.fromCharCode(g)), S) : t(g)
  }
  function S(g) {
    if (g === null || g === 47 || g === 62 || se(g)) {
      const we = g === 47,
        Ge = o.toLowerCase()
      return !we && !l && qi.includes(Ge)
        ? ((i = 1), r.interrupt ? n(g) : O(g))
        : gh.includes(o.toLowerCase())
          ? ((i = 6), we ? (e.consume(g), y) : r.interrupt ? n(g) : O(g))
          : ((i = 7), r.interrupt && !r.parser.lazy[r.now().line] ? t(g) : l ? v(g) : C(g))
    }
    return g === 45 || me(g) ? (e.consume(g), (o += String.fromCharCode(g)), S) : t(g)
  }
  function y(g) {
    return g === 62 ? (e.consume(g), r.interrupt ? n : O) : t(g)
  }
  function v(g) {
    return j(g) ? (e.consume(g), v) : k(g)
  }
  function C(g) {
    return g === 47
      ? (e.consume(g), k)
      : g === 58 || g === 95 || Pe(g)
        ? (e.consume(g), P)
        : j(g)
          ? (e.consume(g), C)
          : k(g)
  }
  function P(g) {
    return g === 45 || g === 46 || g === 58 || g === 95 || me(g) ? (e.consume(g), P) : F(g)
  }
  function F(g) {
    return g === 61 ? (e.consume(g), x) : j(g) ? (e.consume(g), F) : C(g)
  }
  function x(g) {
    return g === null || g === 60 || g === 61 || g === 62 || g === 96
      ? t(g)
      : g === 34 || g === 39
        ? (e.consume(g), (s = g), B)
        : j(g)
          ? (e.consume(g), x)
          : H(g)
  }
  function B(g) {
    return g === s ? (e.consume(g), (s = null), V) : g === null || D(g) ? t(g) : (e.consume(g), B)
  }
  function H(g) {
    return g === null ||
      g === 34 ||
      g === 39 ||
      g === 47 ||
      g === 60 ||
      g === 61 ||
      g === 62 ||
      g === 96 ||
      se(g)
      ? F(g)
      : (e.consume(g), H)
  }
  function V(g) {
    return g === 47 || g === 62 || j(g) ? C(g) : t(g)
  }
  function k(g) {
    return g === 62 ? (e.consume(g), T) : t(g)
  }
  function T(g) {
    return g === null || D(g) ? O(g) : j(g) ? (e.consume(g), T) : t(g)
  }
  function O(g) {
    return g === 45 && i === 2
      ? (e.consume(g), Z)
      : g === 60 && i === 1
        ? (e.consume(g), ne)
        : g === 62 && i === 4
          ? (e.consume(g), xe)
          : g === 63 && i === 3
            ? (e.consume(g), m)
            : g === 93 && i === 5
              ? (e.consume(g), De)
              : D(g) && (i === 6 || i === 7)
                ? (e.exit('htmlFlowData'), e.check(bh, Fe, L)(g))
                : g === null || D(g)
                  ? (e.exit('htmlFlowData'), L(g))
                  : (e.consume(g), O)
  }
  function L(g) {
    return e.check(kh, A, Fe)(g)
  }
  function A(g) {
    return (e.enter('lineEnding'), e.consume(g), e.exit('lineEnding'), R)
  }
  function R(g) {
    return g === null || D(g) ? L(g) : (e.enter('htmlFlowData'), O(g))
  }
  function Z(g) {
    return g === 45 ? (e.consume(g), m) : O(g)
  }
  function ne(g) {
    return g === 47 ? (e.consume(g), (o = ''), ke) : O(g)
  }
  function ke(g) {
    if (g === 62) {
      const we = o.toLowerCase()
      return qi.includes(we) ? (e.consume(g), xe) : O(g)
    }
    return Pe(g) && o.length < 8 ? (e.consume(g), (o += String.fromCharCode(g)), ke) : O(g)
  }
  function De(g) {
    return g === 93 ? (e.consume(g), m) : O(g)
  }
  function m(g) {
    return g === 62 ? (e.consume(g), xe) : g === 45 && i === 2 ? (e.consume(g), m) : O(g)
  }
  function xe(g) {
    return g === null || D(g) ? (e.exit('htmlFlowData'), Fe(g)) : (e.consume(g), xe)
  }
  function Fe(g) {
    return (e.exit('htmlFlow'), n(g))
  }
}
function Sh(e, n, t) {
  const r = this
  return i
  function i(o) {
    return D(o) ? (e.enter('lineEnding'), e.consume(o), e.exit('lineEnding'), l) : t(o)
  }
  function l(o) {
    return r.parser.lazy[r.now().line] ? t(o) : n(o)
  }
}
function Ch(e, n, t) {
  return r
  function r(i) {
    return (e.enter('lineEnding'), e.consume(i), e.exit('lineEnding'), e.attempt(sn, n, t))
  }
}
const vh = { name: 'htmlText', tokenize: _h }
function _h(e, n, t) {
  const r = this
  let i, l, o
  return a
  function a(m) {
    return (e.enter('htmlText'), e.enter('htmlTextData'), e.consume(m), s)
  }
  function s(m) {
    return m === 33
      ? (e.consume(m), u)
      : m === 47
        ? (e.consume(m), F)
        : m === 63
          ? (e.consume(m), C)
          : Pe(m)
            ? (e.consume(m), H)
            : t(m)
  }
  function u(m) {
    return m === 45
      ? (e.consume(m), h)
      : m === 91
        ? (e.consume(m), (l = 0), d)
        : Pe(m)
          ? (e.consume(m), v)
          : t(m)
  }
  function h(m) {
    return m === 45 ? (e.consume(m), f) : t(m)
  }
  function c(m) {
    return m === null
      ? t(m)
      : m === 45
        ? (e.consume(m), p)
        : D(m)
          ? ((o = c), ne(m))
          : (e.consume(m), c)
  }
  function p(m) {
    return m === 45 ? (e.consume(m), f) : c(m)
  }
  function f(m) {
    return m === 62 ? Z(m) : m === 45 ? p(m) : c(m)
  }
  function d(m) {
    const xe = 'CDATA['
    return m === xe.charCodeAt(l++) ? (e.consume(m), l === xe.length ? b : d) : t(m)
  }
  function b(m) {
    return m === null
      ? t(m)
      : m === 93
        ? (e.consume(m), S)
        : D(m)
          ? ((o = b), ne(m))
          : (e.consume(m), b)
  }
  function S(m) {
    return m === 93 ? (e.consume(m), y) : b(m)
  }
  function y(m) {
    return m === 62 ? Z(m) : m === 93 ? (e.consume(m), y) : b(m)
  }
  function v(m) {
    return m === null || m === 62 ? Z(m) : D(m) ? ((o = v), ne(m)) : (e.consume(m), v)
  }
  function C(m) {
    return m === null
      ? t(m)
      : m === 63
        ? (e.consume(m), P)
        : D(m)
          ? ((o = C), ne(m))
          : (e.consume(m), C)
  }
  function P(m) {
    return m === 62 ? Z(m) : C(m)
  }
  function F(m) {
    return Pe(m) ? (e.consume(m), x) : t(m)
  }
  function x(m) {
    return m === 45 || me(m) ? (e.consume(m), x) : B(m)
  }
  function B(m) {
    return D(m) ? ((o = B), ne(m)) : j(m) ? (e.consume(m), B) : Z(m)
  }
  function H(m) {
    return m === 45 || me(m) ? (e.consume(m), H) : m === 47 || m === 62 || se(m) ? V(m) : t(m)
  }
  function V(m) {
    return m === 47
      ? (e.consume(m), Z)
      : m === 58 || m === 95 || Pe(m)
        ? (e.consume(m), k)
        : D(m)
          ? ((o = V), ne(m))
          : j(m)
            ? (e.consume(m), V)
            : Z(m)
  }
  function k(m) {
    return m === 45 || m === 46 || m === 58 || m === 95 || me(m) ? (e.consume(m), k) : T(m)
  }
  function T(m) {
    return m === 61 ? (e.consume(m), O) : D(m) ? ((o = T), ne(m)) : j(m) ? (e.consume(m), T) : V(m)
  }
  function O(m) {
    return m === null || m === 60 || m === 61 || m === 62 || m === 96
      ? t(m)
      : m === 34 || m === 39
        ? (e.consume(m), (i = m), L)
        : D(m)
          ? ((o = O), ne(m))
          : j(m)
            ? (e.consume(m), O)
            : (e.consume(m), A)
  }
  function L(m) {
    return m === i
      ? (e.consume(m), (i = void 0), R)
      : m === null
        ? t(m)
        : D(m)
          ? ((o = L), ne(m))
          : (e.consume(m), L)
  }
  function A(m) {
    return m === null || m === 34 || m === 39 || m === 60 || m === 61 || m === 96
      ? t(m)
      : m === 47 || m === 62 || se(m)
        ? V(m)
        : (e.consume(m), A)
  }
  function R(m) {
    return m === 47 || m === 62 || se(m) ? V(m) : t(m)
  }
  function Z(m) {
    return m === 62 ? (e.consume(m), e.exit('htmlTextData'), e.exit('htmlText'), n) : t(m)
  }
  function ne(m) {
    return (e.exit('htmlTextData'), e.enter('lineEnding'), e.consume(m), e.exit('lineEnding'), ke)
  }
  function ke(m) {
    return j(m)
      ? q(
          e,
          De,
          'linePrefix',
          r.parser.constructs.disable.null.includes('codeIndented') ? void 0 : 4
        )(m)
      : De(m)
  }
  function De(m) {
    return (e.enter('htmlTextData'), o(m))
  }
}
const er = { name: 'labelEnd', resolveAll: Th, resolveTo: Oh, tokenize: Lh },
  Eh = { tokenize: Ph },
  Ih = { tokenize: zh },
  Ah = { tokenize: Dh }
function Th(e) {
  let n = -1
  const t = []
  for (; ++n < e.length; ) {
    const r = e[n][1]
    if (
      (t.push(e[n]), r.type === 'labelImage' || r.type === 'labelLink' || r.type === 'labelEnd')
    ) {
      const i = r.type === 'labelImage' ? 4 : 2
      ;((r.type = 'data'), (n += i))
    }
  }
  return (e.length !== t.length && Le(e, 0, e.length, t), e)
}
function Oh(e, n) {
  let t = e.length,
    r = 0,
    i,
    l,
    o,
    a
  for (; t--; )
    if (((i = e[t][1]), l)) {
      if (i.type === 'link' || (i.type === 'labelLink' && i._inactive)) break
      e[t][0] === 'enter' && i.type === 'labelLink' && (i._inactive = true)
    } else if (o) {
      if (
        e[t][0] === 'enter' &&
        (i.type === 'labelImage' || i.type === 'labelLink') &&
        !i._balanced &&
        ((l = t), i.type !== 'labelLink')
      ) {
        r = 2
        break
      }
    } else i.type === 'labelEnd' && (o = t)
  const s = {
      type: e[l][1].type === 'labelLink' ? 'link' : 'image',
      start: { ...e[l][1].start },
      end: { ...e[e.length - 1][1].end },
    },
    u = { type: 'label', start: { ...e[l][1].start }, end: { ...e[o][1].end } },
    h = { type: 'labelText', start: { ...e[l + r + 2][1].end }, end: { ...e[o - 2][1].start } }
  return (
    (a = [
      ['enter', s, n],
      ['enter', u, n],
    ]),
    (a = be(a, e.slice(l + 1, l + r + 3))),
    (a = be(a, [['enter', h, n]])),
    (a = be(a, Qn(n.parser.constructs.insideSpan.null, e.slice(l + r + 4, o - 3), n))),
    (a = be(a, [['exit', h, n], e[o - 2], e[o - 1], ['exit', u, n]])),
    (a = be(a, e.slice(o + 1))),
    (a = be(a, [['exit', s, n]])),
    Le(e, l, e.length, a),
    e
  )
}
function Lh(e, n, t) {
  const r = this
  let i = r.events.length,
    l,
    o
  for (; i--; )
    if (
      (r.events[i][1].type === 'labelImage' || r.events[i][1].type === 'labelLink') &&
      !r.events[i][1]._balanced
    ) {
      l = r.events[i][1]
      break
    }
  return a
  function a(p) {
    return l
      ? l._inactive
        ? c(p)
        : ((o = r.parser.defined.includes(bt(r.sliceSerialize({ start: l.end, end: r.now() })))),
          e.enter('labelEnd'),
          e.enter('labelMarker'),
          e.consume(p),
          e.exit('labelMarker'),
          e.exit('labelEnd'),
          s)
      : t(p)
  }
  function s(p) {
    return p === 40
      ? e.attempt(Eh, h, o ? h : c)(p)
      : p === 91
        ? e.attempt(Ih, h, o ? u : c)(p)
        : o
          ? h(p)
          : c(p)
  }
  function u(p) {
    return e.attempt(Ah, h, c)(p)
  }
  function h(p) {
    return n(p)
  }
  function c(p) {
    return ((l._balanced = true), t(p))
  }
}
function Ph(e, n, t) {
  return r
  function r(c) {
    return (
      e.enter('resource'),
      e.enter('resourceMarker'),
      e.consume(c),
      e.exit('resourceMarker'),
      i
    )
  }
  function i(c) {
    return se(c) ? Ft(e, l)(c) : l(c)
  }
  function l(c) {
    return c === 41
      ? h(c)
      : Hi(
          e,
          o,
          a,
          'resourceDestination',
          'resourceDestinationLiteral',
          'resourceDestinationLiteralMarker',
          'resourceDestinationRaw',
          'resourceDestinationString',
          32
        )(c)
  }
  function o(c) {
    return se(c) ? Ft(e, s)(c) : h(c)
  }
  function a(c) {
    return t(c)
  }
  function s(c) {
    return c === 34 || c === 39 || c === 40
      ? Wi(e, u, t, 'resourceTitle', 'resourceTitleMarker', 'resourceTitleString')(c)
      : h(c)
  }
  function u(c) {
    return se(c) ? Ft(e, h)(c) : h(c)
  }
  function h(c) {
    return c === 41
      ? (e.enter('resourceMarker'), e.consume(c), e.exit('resourceMarker'), e.exit('resource'), n)
      : t(c)
  }
}
function zh(e, n, t) {
  const r = this
  return i
  function i(a) {
    return Ui.call(r, e, l, o, 'reference', 'referenceMarker', 'referenceString')(a)
  }
  function l(a) {
    return r.parser.defined.includes(
      bt(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))
    )
      ? n(a)
      : t(a)
  }
  function o(a) {
    return t(a)
  }
}
function Dh(e, n, t) {
  return r
  function r(l) {
    return (
      e.enter('reference'),
      e.enter('referenceMarker'),
      e.consume(l),
      e.exit('referenceMarker'),
      i
    )
  }
  function i(l) {
    return l === 93
      ? (e.enter('referenceMarker'),
        e.consume(l),
        e.exit('referenceMarker'),
        e.exit('reference'),
        n)
      : t(l)
  }
}
const Fh = { name: 'labelStartImage', resolveAll: er.resolveAll, tokenize: Rh }
function Rh(e, n, t) {
  const r = this
  return i
  function i(a) {
    return (
      e.enter('labelImage'),
      e.enter('labelImageMarker'),
      e.consume(a),
      e.exit('labelImageMarker'),
      l
    )
  }
  function l(a) {
    return a === 91
      ? (e.enter('labelMarker'), e.consume(a), e.exit('labelMarker'), e.exit('labelImage'), o)
      : t(a)
  }
  function o(a) {
    return a === 94 && '_hiddenFootnoteSupport' in r.parser.constructs ? t(a) : n(a)
  }
}
const Bh = { name: 'labelStartLink', resolveAll: er.resolveAll, tokenize: Mh }
function Mh(e, n, t) {
  const r = this
  return i
  function i(o) {
    return (
      e.enter('labelLink'),
      e.enter('labelMarker'),
      e.consume(o),
      e.exit('labelMarker'),
      e.exit('labelLink'),
      l
    )
  }
  function l(o) {
    return o === 94 && '_hiddenFootnoteSupport' in r.parser.constructs ? t(o) : n(o)
  }
}
const tr = { name: 'lineEnding', tokenize: Nh }
function Nh(e, n) {
  return t
  function t(r) {
    return (e.enter('lineEnding'), e.consume(r), e.exit('lineEnding'), q(e, n, 'linePrefix'))
  }
}
const un = { name: 'thematicBreak', tokenize: $h }
function $h(e, n, t) {
  let r = 0,
    i
  return l
  function l(u) {
    return (e.enter('thematicBreak'), o(u))
  }
  function o(u) {
    return ((i = u), a(u))
  }
  function a(u) {
    return u === i
      ? (e.enter('thematicBreakSequence'), s(u))
      : r >= 3 && (u === null || D(u))
        ? (e.exit('thematicBreak'), n(u))
        : t(u)
  }
  function s(u) {
    return u === i
      ? (e.consume(u), r++, s)
      : (e.exit('thematicBreakSequence'), j(u) ? q(e, a, 'whitespace')(u) : a(u))
  }
}
const ue = { continuation: { tokenize: Uh }, exit: qh, name: 'list', tokenize: Hh },
  Vh = { partial: true, tokenize: Xh },
  jh = { partial: true, tokenize: Wh }
function Hh(e, n, t) {
  const r = this,
    i = r.events[r.events.length - 1]
  let l = i && i[1].type === 'linePrefix' ? i[2].sliceSerialize(i[1], true).length : 0,
    o = 0
  return a
  function a(f) {
    const d =
      r.containerState.type || (f === 42 || f === 43 || f === 45 ? 'listUnordered' : 'listOrdered')
    if (d === 'listUnordered' ? !r.containerState.marker || f === r.containerState.marker : Kn(f)) {
      if (
        (r.containerState.type || ((r.containerState.type = d), e.enter(d, { _container: true })),
        d === 'listUnordered')
      )
        return (e.enter('listItemPrefix'), f === 42 || f === 45 ? e.check(un, t, u)(f) : u(f))
      if (!r.interrupt || f === 49)
        return (e.enter('listItemPrefix'), e.enter('listItemValue'), s(f))
    }
    return t(f)
  }
  function s(f) {
    return Kn(f) && ++o < 10
      ? (e.consume(f), s)
      : (!r.interrupt || o < 2) &&
          (r.containerState.marker ? f === r.containerState.marker : f === 41 || f === 46)
        ? (e.exit('listItemValue'), u(f))
        : t(f)
  }
  function u(f) {
    return (
      e.enter('listItemMarker'),
      e.consume(f),
      e.exit('listItemMarker'),
      (r.containerState.marker = r.containerState.marker || f),
      e.check(sn, r.interrupt ? t : h, e.attempt(Vh, p, c))
    )
  }
  function h(f) {
    return ((r.containerState.initialBlankLine = true), l++, p(f))
  }
  function c(f) {
    return j(f)
      ? (e.enter('listItemPrefixWhitespace'), e.consume(f), e.exit('listItemPrefixWhitespace'), p)
      : t(f)
  }
  function p(f) {
    return (
      (r.containerState.size = l + r.sliceSerialize(e.exit('listItemPrefix'), true).length),
      n(f)
    )
  }
}
function Uh(e, n, t) {
  const r = this
  return ((r.containerState._closeFlow = void 0), e.check(sn, i, l))
  function i(a) {
    return (
      (r.containerState.furtherBlankLines =
        r.containerState.furtherBlankLines || r.containerState.initialBlankLine),
      q(e, n, 'listItemIndent', r.containerState.size + 1)(a)
    )
  }
  function l(a) {
    return r.containerState.furtherBlankLines || !j(a)
      ? ((r.containerState.furtherBlankLines = void 0),
        (r.containerState.initialBlankLine = void 0),
        o(a))
      : ((r.containerState.furtherBlankLines = void 0),
        (r.containerState.initialBlankLine = void 0),
        e.attempt(jh, n, o)(a))
  }
  function o(a) {
    return (
      (r.containerState._closeFlow = true),
      (r.interrupt = void 0),
      q(
        e,
        e.attempt(ue, n, t),
        'linePrefix',
        r.parser.constructs.disable.null.includes('codeIndented') ? void 0 : 4
      )(a)
    )
  }
}
function Wh(e, n, t) {
  const r = this
  return q(e, i, 'listItemIndent', r.containerState.size + 1)
  function i(l) {
    const o = r.events[r.events.length - 1]
    return o &&
      o[1].type === 'listItemIndent' &&
      o[2].sliceSerialize(o[1], true).length === r.containerState.size
      ? n(l)
      : t(l)
  }
}
function qh(e) {
  e.exit(this.containerState.type)
}
function Xh(e, n, t) {
  const r = this
  return q(
    e,
    i,
    'listItemPrefixWhitespace',
    r.parser.constructs.disable.null.includes('codeIndented') ? void 0 : 5
  )
  function i(l) {
    const o = r.events[r.events.length - 1]
    return !j(l) && o && o[1].type === 'listItemPrefixWhitespace' ? n(l) : t(l)
  }
}
const Xi = { name: 'setextUnderline', resolveTo: Yh, tokenize: Gh }
function Yh(e, n) {
  let t = e.length,
    r,
    i,
    l
  for (; t--; )
    if (e[t][0] === 'enter') {
      if (e[t][1].type === 'content') {
        r = t
        break
      }
      e[t][1].type === 'paragraph' && (i = t)
    } else
      (e[t][1].type === 'content' && e.splice(t, 1), !l && e[t][1].type === 'definition' && (l = t))
  const o = {
    type: 'setextHeading',
    start: { ...e[r][1].start },
    end: { ...e[e.length - 1][1].end },
  }
  return (
    (e[i][1].type = 'setextHeadingText'),
    l
      ? (e.splice(i, 0, ['enter', o, n]),
        e.splice(l + 1, 0, ['exit', e[r][1], n]),
        (e[r][1].end = { ...e[l][1].end }))
      : (e[r][1] = o),
    e.push(['exit', o, n]),
    e
  )
}
function Gh(e, n, t) {
  const r = this
  let i
  return l
  function l(u) {
    let h = r.events.length,
      c
    for (; h--; )
      if (
        r.events[h][1].type !== 'lineEnding' &&
        r.events[h][1].type !== 'linePrefix' &&
        r.events[h][1].type !== 'content'
      ) {
        c = r.events[h][1].type === 'paragraph'
        break
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || c)
      ? (e.enter('setextHeadingLine'), (i = u), o(u))
      : t(u)
  }
  function o(u) {
    return (e.enter('setextHeadingLineSequence'), a(u))
  }
  function a(u) {
    return u === i
      ? (e.consume(u), a)
      : (e.exit('setextHeadingLineSequence'), j(u) ? q(e, s, 'lineSuffix')(u) : s(u))
  }
  function s(u) {
    return u === null || D(u) ? (e.exit('setextHeadingLine'), n(u)) : t(u)
  }
}
const Kh = { tokenize: Qh }
function Qh(e) {
  const n = this,
    t = e.attempt(
      sn,
      r,
      e.attempt(
        this.parser.constructs.flowInitial,
        i,
        q(e, e.attempt(this.parser.constructs.flow, i, e.attempt(nh, i)), 'linePrefix')
      )
    )
  return t
  function r(l) {
    if (l === null) {
      e.consume(l)
      return
    }
    return (
      e.enter('lineEndingBlank'),
      e.consume(l),
      e.exit('lineEndingBlank'),
      (n.currentConstruct = void 0),
      t
    )
  }
  function i(l) {
    if (l === null) {
      e.consume(l)
      return
    }
    return (
      e.enter('lineEnding'),
      e.consume(l),
      e.exit('lineEnding'),
      (n.currentConstruct = void 0),
      t
    )
  }
}
const Jh = { resolveAll: Gi() },
  Zh = Yi('string'),
  ef = Yi('text')
function Yi(e) {
  return { resolveAll: Gi(e === 'text' ? tf : void 0), tokenize: n }
  function n(t) {
    const r = this,
      i = this.parser.constructs[e],
      l = t.attempt(i, o, a)
    return o
    function o(h) {
      return u(h) ? l(h) : a(h)
    }
    function a(h) {
      if (h === null) {
        t.consume(h)
        return
      }
      return (t.enter('data'), t.consume(h), s)
    }
    function s(h) {
      return u(h) ? (t.exit('data'), l(h)) : (t.consume(h), s)
    }
    function u(h) {
      if (h === null) return true
      const c = i[h]
      let p = -1
      if (c)
        for (; ++p < c.length; ) {
          const f = c[p]
          if (!f.previous || f.previous.call(r, r.previous)) return true
        }
      return false
    }
  }
}
function Gi(e) {
  return n
  function n(t, r) {
    let i = -1,
      l
    for (; ++i <= t.length; )
      l === void 0
        ? t[i] && t[i][1].type === 'data' && ((l = i), i++)
        : (!t[i] || t[i][1].type !== 'data') &&
          (i !== l + 2 &&
            ((t[l][1].end = t[i - 1][1].end), t.splice(l + 2, i - l - 2), (i = l + 2)),
          (l = void 0))
    return e ? e(t, r) : t
  }
}
function tf(e, n) {
  let t = 0
  for (; ++t <= e.length; )
    if ((t === e.length || e[t][1].type === 'lineEnding') && e[t - 1][1].type === 'data') {
      const r = e[t - 1][1],
        i = n.sliceStream(r)
      let l = i.length,
        o = -1,
        a = 0,
        s
      for (; l--; ) {
        const u = i[l]
        if (typeof u == 'string') {
          for (o = u.length; u.charCodeAt(o - 1) === 32; ) (a++, o--)
          if (o) break
          o = -1
        } else if (u === -2) ((s = true), a++)
        else if (u !== -1) {
          l++
          break
        }
      }
      if ((n._contentTypeTextTrailing && t === e.length && (a = 0), a)) {
        const u = {
          type: t === e.length || s || a < 2 ? 'lineSuffix' : 'hardBreakTrailing',
          start: {
            _bufferIndex: l ? o : r.start._bufferIndex + o,
            _index: r.start._index + l,
            line: r.end.line,
            column: r.end.column - a,
            offset: r.end.offset - a,
          },
          end: { ...r.end },
        }
        ;((r.end = { ...u.start }),
          r.start.offset === r.end.offset
            ? Object.assign(r, u)
            : (e.splice(t, 0, ['enter', u, n], ['exit', u, n]), (t += 2)))
      }
      t++
    }
  return e
}
const nf = {
    42: ue,
    43: ue,
    45: ue,
    48: ue,
    49: ue,
    50: ue,
    51: ue,
    52: ue,
    53: ue,
    54: ue,
    55: ue,
    56: ue,
    57: ue,
    62: Bi,
  },
  rf = { 91: ah },
  lf = { [-2]: Zn, [-1]: Zn, 32: Zn },
  of = { 35: ph, 42: un, 45: [Xi, un], 60: yh, 61: Xi, 95: un, 96: Vi, 126: Vi },
  af = { 38: Ni, 92: Mi },
  sf = {
    [-5]: tr,
    [-4]: tr,
    [-3]: tr,
    33: Fh,
    38: Ni,
    42: Jn,
    60: [Bc, vh],
    91: Bh,
    92: [hh, Mi],
    93: er,
    95: Jn,
    96: Kc,
  },
  uf = { null: [Jn, Jh] },
  cf = { null: [42, 95] },
  hf = { null: [] },
  ff = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        attentionMarkers: cf,
        contentInitial: rf,
        disable: hf,
        document: nf,
        flow: of,
        flowInitial: lf,
        insideSpan: uf,
        string: af,
        text: sf,
      },
      Symbol.toStringTag,
      { value: 'Module' }
    )
  )
function pf(e, n, t) {
  let r = {
    _bufferIndex: -1,
    _index: 0,
    line: (t && t.line) || 1,
    column: (t && t.column) || 1,
    offset: (t && t.offset) || 0,
  }
  const i = {},
    l = []
  let o = [],
    a = []
  const s = {
      attempt: B(F),
      check: B(x),
      consume: v,
      enter: C,
      exit: P,
      interrupt: B(x, { interrupt: true }),
    },
    u = {
      code: null,
      containerState: {},
      defineSkip: b,
      events: [],
      now: d,
      parser: e,
      previous: null,
      sliceSerialize: p,
      sliceStream: f,
      write: c,
    }
  let h = n.tokenize.call(u, s)
  return (n.resolveAll && l.push(n), u)
  function c(T) {
    return (
      (o = be(o, T)),
      S(),
      o[o.length - 1] !== null ? [] : (H(n, 0), (u.events = Qn(l, u.events, u)), u.events)
    )
  }
  function p(T, O) {
    return mf(f(T), O)
  }
  function f(T) {
    return df(o, T)
  }
  function d() {
    const { _bufferIndex: T, _index: O, line: L, column: A, offset: R } = r
    return { _bufferIndex: T, _index: O, line: L, column: A, offset: R }
  }
  function b(T) {
    ;((i[T.line] = T.column), k())
  }
  function S() {
    let T
    for (; r._index < o.length; ) {
      const O = o[r._index]
      if (typeof O == 'string')
        for (
          T = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0);
          r._index === T && r._bufferIndex < O.length;

        )
          y(O.charCodeAt(r._bufferIndex))
      else y(O)
    }
  }
  function y(T) {
    h = h(T)
  }
  function v(T) {
    ;(D(T)
      ? (r.line++, (r.column = 1), (r.offset += T === -3 ? 2 : 1), k())
      : T !== -1 && (r.column++, r.offset++),
      r._bufferIndex < 0
        ? r._index++
        : (r._bufferIndex++,
          r._bufferIndex === o[r._index].length && ((r._bufferIndex = -1), r._index++)),
      (u.previous = T))
  }
  function C(T, O) {
    const L = O || {}
    return ((L.type = T), (L.start = d()), u.events.push(['enter', L, u]), a.push(L), L)
  }
  function P(T) {
    const O = a.pop()
    return ((O.end = d()), u.events.push(['exit', O, u]), O)
  }
  function F(T, O) {
    H(T, O.from)
  }
  function x(T, O) {
    O.restore()
  }
  function B(T, O) {
    return L
    function L(A, R, Z) {
      let ne, ke, De, m
      return Array.isArray(A) ? Fe(A) : 'tokenize' in A ? Fe([A]) : xe(A)
      function xe(re) {
        return Et
        function Et(He) {
          const rt = He !== null && re[He],
            it = He !== null && re.null,
            qt = [
              ...(Array.isArray(rt) ? rt : rt ? [rt] : []),
              ...(Array.isArray(it) ? it : it ? [it] : []),
            ]
          return Fe(qt)(He)
        }
      }
      function Fe(re) {
        return ((ne = re), (ke = 0), re.length === 0 ? Z : g(re[ke]))
      }
      function g(re) {
        return Et
        function Et(He) {
          return (
            (m = V()),
            (De = re),
            re.partial || (u.currentConstruct = re),
            re.name && u.parser.constructs.disable.null.includes(re.name)
              ? Ge()
              : re.tokenize.call(O ? Object.assign(Object.create(u), O) : u, s, we, Ge)(He)
          )
        }
      }
      function we(re) {
        return (T(De, m), R)
      }
      function Ge(re) {
        return (m.restore(), ++ke < ne.length ? g(ne[ke]) : Z)
      }
    }
  }
  function H(T, O) {
    ;(T.resolveAll && !l.includes(T) && l.push(T),
      T.resolve && Le(u.events, O, u.events.length - O, T.resolve(u.events.slice(O), u)),
      T.resolveTo && (u.events = T.resolveTo(u.events, u)))
  }
  function V() {
    const T = d(),
      O = u.previous,
      L = u.currentConstruct,
      A = u.events.length,
      R = Array.from(a)
    return { from: A, restore: Z }
    function Z() {
      ;((r = T), (u.previous = O), (u.currentConstruct = L), (u.events.length = A), (a = R), k())
    }
  }
  function k() {
    r.line in i && r.column < 2 && ((r.column = i[r.line]), (r.offset += i[r.line] - 1))
  }
}
function df(e, n) {
  const t = n.start._index,
    r = n.start._bufferIndex,
    i = n.end._index,
    l = n.end._bufferIndex
  let o
  if (t === i) o = [e[t].slice(r, l)]
  else {
    if (((o = e.slice(t, i)), r > -1)) {
      const a = o[0]
      typeof a == 'string' ? (o[0] = a.slice(r)) : o.shift()
    }
    l > 0 && o.push(e[i].slice(0, l))
  }
  return o
}
function mf(e, n) {
  let t = -1
  const r = []
  let i
  for (; ++t < e.length; ) {
    const l = e[t]
    let o
    if (typeof l == 'string') o = l
    else
      switch (l) {
        case -5: {
          o = '\r'
          break
        }
        case -4: {
          o = `
`
          break
        }
        case -3: {
          o = `\r
`
          break
        }
        case -2: {
          o = n ? ' ' : '	'
          break
        }
        case -1: {
          if (!n && i) continue
          o = ' '
          break
        }
        default:
          o = String.fromCharCode(l)
      }
    ;((i = l === -2), r.push(o))
  }
  return r.join('')
}
function gf(e) {
  const r = {
    constructs: Sc([ff, ...((e || {}).extensions || [])]),
    content: i(Oc),
    defined: [],
    document: i(Pc),
    flow: i(Kh),
    lazy: {},
    string: i(Zh),
    text: i(ef),
  }
  return r
  function i(l) {
    return o
    function o(a) {
      return pf(r, l, a)
    }
  }
}
function yf(e) {
  for (; !ji(e); );
  return e
}
const Ki = /[\0\t\n\r]/g
function bf() {
  let e = 1,
    n = '',
    t = true,
    r
  return i
  function i(l, o, a) {
    const s = []
    let u, h, c, p, f
    for (
      l = n + (typeof l == 'string' ? l.toString() : new TextDecoder(o || void 0).decode(l)),
        c = 0,
        n = '',
        t && (l.charCodeAt(0) === 65279 && c++, (t = void 0));
      c < l.length;

    ) {
      if (
        ((Ki.lastIndex = c),
        (u = Ki.exec(l)),
        (p = u && u.index !== void 0 ? u.index : l.length),
        (f = l.charCodeAt(p)),
        !u)
      ) {
        n = l.slice(c)
        break
      }
      if (f === 10 && c === p && r) (s.push(-3), (r = void 0))
      else
        switch (
          (r && (s.push(-5), (r = void 0)), c < p && (s.push(l.slice(c, p)), (e += p - c)), f)
        ) {
          case 0: {
            ;(s.push(65533), e++)
            break
          }
          case 9: {
            for (h = Math.ceil(e / 4) * 4, s.push(-2); e++ < h; ) s.push(-1)
            break
          }
          case 10: {
            ;(s.push(-4), (e = 1))
            break
          }
          default:
            ;((r = true), (e = 1))
        }
      c = p + 1
    }
    return (a && (r && s.push(-5), n && s.push(n), s.push(null)), s)
  }
}
const kf = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi
function xf(e) {
  return e.replace(kf, wf)
}
function wf(e, n, t) {
  if (n) return n
  if (t.charCodeAt(0) === 35) {
    const i = t.charCodeAt(1),
      l = i === 120 || i === 88
    return zi(t.slice(l ? 2 : 1), l ? 16 : 10)
  }
  return Yn(t) || e
}
const Qi = {}.hasOwnProperty
function Sf(e, n, t) {
  return (
    typeof n != 'string' && ((t = n), (n = void 0)),
    Cf(t)(
      yf(
        gf(t)
          .document()
          .write(bf()(e, n, true))
      )
    )
  )
}
function Cf(e) {
  const n = {
    transforms: [],
    canContainEols: ['emphasis', 'fragment', 'heading', 'paragraph', 'strong'],
    enter: {
      autolink: l(Fr),
      autolinkProtocol: V,
      autolinkEmail: V,
      atxHeading: l(Pr),
      blockQuote: l(it),
      characterEscape: V,
      characterReference: V,
      codeFenced: l(qt),
      codeFencedFenceInfo: o,
      codeFencedFenceMeta: o,
      codeIndented: l(qt, o),
      codeText: l(xo, o),
      codeTextData: V,
      data: V,
      codeFlowValue: V,
      definition: l(wo),
      definitionDestinationString: o,
      definitionLabelString: o,
      definitionTitleString: o,
      emphasis: l(So),
      hardBreakEscape: l(zr),
      hardBreakTrailing: l(zr),
      htmlFlow: l(Dr, o),
      htmlFlowData: V,
      htmlText: l(Dr, o),
      htmlTextData: V,
      image: l(Co),
      label: o,
      link: l(Fr),
      listItem: l(vo),
      listItemValue: p,
      listOrdered: l(Rr, c),
      listUnordered: l(Rr),
      paragraph: l(_o),
      reference: g,
      referenceString: o,
      resourceDestinationString: o,
      resourceTitleString: o,
      setextHeading: l(Pr),
      strong: l(Eo),
      thematicBreak: l(Ao),
    },
    exit: {
      atxHeading: s(),
      atxHeadingSequence: F,
      autolink: s(),
      autolinkEmail: rt,
      autolinkProtocol: He,
      blockQuote: s(),
      characterEscapeValue: k,
      characterReferenceMarkerHexadecimal: Ge,
      characterReferenceMarkerNumeric: Ge,
      characterReferenceValue: re,
      characterReference: Et,
      codeFenced: s(S),
      codeFencedFence: b,
      codeFencedFenceInfo: f,
      codeFencedFenceMeta: d,
      codeFlowValue: k,
      codeIndented: s(y),
      codeText: s(R),
      codeTextData: k,
      data: k,
      definition: s(),
      definitionDestinationString: P,
      definitionLabelString: v,
      definitionTitleString: C,
      emphasis: s(),
      hardBreakEscape: s(O),
      hardBreakTrailing: s(O),
      htmlFlow: s(L),
      htmlFlowData: k,
      htmlText: s(A),
      htmlTextData: k,
      image: s(ne),
      label: De,
      labelText: ke,
      lineEnding: T,
      link: s(Z),
      listItem: s(),
      listOrdered: s(),
      listUnordered: s(),
      paragraph: s(),
      referenceString: we,
      resourceDestinationString: m,
      resourceTitleString: xe,
      resource: Fe,
      setextHeading: s(H),
      setextHeadingLineSequence: B,
      setextHeadingText: x,
      strong: s(),
      thematicBreak: s(),
    },
  }
  Ji(n, (e || {}).mdastExtensions || [])
  const t = {}
  return r
  function r(w) {
    let E = { type: 'root', children: [] }
    const M = {
        stack: [E],
        tokenStack: [],
        config: n,
        enter: a,
        exit: u,
        buffer: o,
        resume: h,
        data: t,
      },
      $ = []
    let U = -1
    for (; ++U < w.length; )
      if (w[U][1].type === 'listOrdered' || w[U][1].type === 'listUnordered')
        if (w[U][0] === 'enter') $.push(U)
        else {
          const Se = $.pop()
          U = i(w, Se, U)
        }
    for (U = -1; ++U < w.length; ) {
      const Se = n[w[U][0]]
      Qi.call(Se, w[U][1].type) &&
        Se[w[U][1].type].call(Object.assign({ sliceSerialize: w[U][2].sliceSerialize }, M), w[U][1])
    }
    if (M.tokenStack.length > 0) {
      const Se = M.tokenStack[M.tokenStack.length - 1]
      ;(Se[1] || Zi).call(M, void 0, Se[0])
    }
    for (
      E.position = {
        start: Ye(w.length > 0 ? w[0][1].start : { line: 1, column: 1, offset: 0 }),
        end: Ye(w.length > 0 ? w[w.length - 2][1].end : { line: 1, column: 1, offset: 0 }),
      },
        U = -1;
      ++U < n.transforms.length;

    )
      E = n.transforms[U](E) || E
    return E
  }
  function i(w, E, M) {
    let $ = E - 1,
      U = -1,
      Se = false,
      Ke,
      Re,
      It,
      At
    for (; ++$ <= M; ) {
      const fe = w[$]
      switch (fe[1].type) {
        case 'listUnordered':
        case 'listOrdered':
        case 'blockQuote': {
          ;(fe[0] === 'enter' ? U++ : U--, (At = void 0))
          break
        }
        case 'lineEndingBlank': {
          fe[0] === 'enter' && (Ke && !At && !U && !It && (It = $), (At = void 0))
          break
        }
        case 'linePrefix':
        case 'listItemValue':
        case 'listItemMarker':
        case 'listItemPrefix':
        case 'listItemPrefixWhitespace':
          break
        default:
          At = void 0
      }
      if (
        (!U && fe[0] === 'enter' && fe[1].type === 'listItemPrefix') ||
        (U === -1 &&
          fe[0] === 'exit' &&
          (fe[1].type === 'listUnordered' || fe[1].type === 'listOrdered'))
      ) {
        if (Ke) {
          let lt = $
          for (Re = void 0; lt--; ) {
            const Be = w[lt]
            if (Be[1].type === 'lineEnding' || Be[1].type === 'lineEndingBlank') {
              if (Be[0] === 'exit') continue
              ;(Re && ((w[Re][1].type = 'lineEndingBlank'), (Se = true)),
                (Be[1].type = 'lineEnding'),
                (Re = lt))
            } else if (
              !(
                Be[1].type === 'linePrefix' ||
                Be[1].type === 'blockQuotePrefix' ||
                Be[1].type === 'blockQuotePrefixWhitespace' ||
                Be[1].type === 'blockQuoteMarker' ||
                Be[1].type === 'listItemIndent'
              )
            )
              break
          }
          ;(It && (!Re || It < Re) && (Ke._spread = true),
            (Ke.end = Object.assign({}, Re ? w[Re][1].start : fe[1].end)),
            w.splice(Re || $, 0, ['exit', Ke, fe[2]]),
            $++,
            M++)
        }
        if (fe[1].type === 'listItemPrefix') {
          const lt = {
            type: 'listItem',
            _spread: false,
            start: Object.assign({}, fe[1].start),
            end: void 0,
          }
          ;((Ke = lt), w.splice($, 0, ['enter', lt, fe[2]]), $++, M++, (It = void 0), (At = true))
        }
      }
    }
    return ((w[E][1]._spread = Se), M)
  }
  function l(w, E) {
    return M
    function M($) {
      ;(a.call(this, w($), $), E && E.call(this, $))
    }
  }
  function o() {
    this.stack.push({ type: 'fragment', children: [] })
  }
  function a(w, E, M) {
    ;(this.stack[this.stack.length - 1].children.push(w),
      this.stack.push(w),
      this.tokenStack.push([E, M || void 0]),
      (w.position = { start: Ye(E.start), end: void 0 }))
  }
  function s(w) {
    return E
    function E(M) {
      ;(w && w.call(this, M), u.call(this, M))
    }
  }
  function u(w, E) {
    const M = this.stack.pop(),
      $ = this.tokenStack.pop()
    if ($) $[0].type !== w.type && (E ? E.call(this, w, $[0]) : ($[1] || Zi).call(this, w, $[0]))
    else
      throw new Error(
        'Cannot close `' + w.type + '` (' + Pt({ start: w.start, end: w.end }) + '): it’s not open'
      )
    M.position.end = Ye(w.end)
  }
  function h() {
    return xc(this.stack.pop())
  }
  function c() {
    this.data.expectingFirstListItemValue = true
  }
  function p(w) {
    if (this.data.expectingFirstListItemValue) {
      const E = this.stack[this.stack.length - 2]
      ;((E.start = Number.parseInt(this.sliceSerialize(w), 10)),
        (this.data.expectingFirstListItemValue = void 0))
    }
  }
  function f() {
    const w = this.resume(),
      E = this.stack[this.stack.length - 1]
    E.lang = w
  }
  function d() {
    const w = this.resume(),
      E = this.stack[this.stack.length - 1]
    E.meta = w
  }
  function b() {
    this.data.flowCodeInside || (this.buffer(), (this.data.flowCodeInside = true))
  }
  function S() {
    const w = this.resume(),
      E = this.stack[this.stack.length - 1]
    ;((E.value = w.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, '')), (this.data.flowCodeInside = void 0))
  }
  function y() {
    const w = this.resume(),
      E = this.stack[this.stack.length - 1]
    E.value = w.replace(/(\r?\n|\r)$/g, '')
  }
  function v(w) {
    const E = this.resume(),
      M = this.stack[this.stack.length - 1]
    ;((M.label = E), (M.identifier = bt(this.sliceSerialize(w)).toLowerCase()))
  }
  function C() {
    const w = this.resume(),
      E = this.stack[this.stack.length - 1]
    E.title = w
  }
  function P() {
    const w = this.resume(),
      E = this.stack[this.stack.length - 1]
    E.url = w
  }
  function F(w) {
    const E = this.stack[this.stack.length - 1]
    if (!E.depth) {
      const M = this.sliceSerialize(w).length
      E.depth = M
    }
  }
  function x() {
    this.data.setextHeadingSlurpLineEnding = true
  }
  function B(w) {
    const E = this.stack[this.stack.length - 1]
    E.depth = this.sliceSerialize(w).codePointAt(0) === 61 ? 1 : 2
  }
  function H() {
    this.data.setextHeadingSlurpLineEnding = void 0
  }
  function V(w) {
    const M = this.stack[this.stack.length - 1].children
    let $ = M[M.length - 1]
    ;((!$ || $.type !== 'text') &&
      (($ = Io()), ($.position = { start: Ye(w.start), end: void 0 }), M.push($)),
      this.stack.push($))
  }
  function k(w) {
    const E = this.stack.pop()
    ;((E.value += this.sliceSerialize(w)), (E.position.end = Ye(w.end)))
  }
  function T(w) {
    const E = this.stack[this.stack.length - 1]
    if (this.data.atHardBreak) {
      const M = E.children[E.children.length - 1]
      ;((M.position.end = Ye(w.end)), (this.data.atHardBreak = void 0))
      return
    }
    !this.data.setextHeadingSlurpLineEnding &&
      n.canContainEols.includes(E.type) &&
      (V.call(this, w), k.call(this, w))
  }
  function O() {
    this.data.atHardBreak = true
  }
  function L() {
    const w = this.resume(),
      E = this.stack[this.stack.length - 1]
    E.value = w
  }
  function A() {
    const w = this.resume(),
      E = this.stack[this.stack.length - 1]
    E.value = w
  }
  function R() {
    const w = this.resume(),
      E = this.stack[this.stack.length - 1]
    E.value = w
  }
  function Z() {
    const w = this.stack[this.stack.length - 1]
    if (this.data.inReference) {
      const E = this.data.referenceType || 'shortcut'
      ;((w.type += 'Reference'), (w.referenceType = E), delete w.url, delete w.title)
    } else (delete w.identifier, delete w.label)
    this.data.referenceType = void 0
  }
  function ne() {
    const w = this.stack[this.stack.length - 1]
    if (this.data.inReference) {
      const E = this.data.referenceType || 'shortcut'
      ;((w.type += 'Reference'), (w.referenceType = E), delete w.url, delete w.title)
    } else (delete w.identifier, delete w.label)
    this.data.referenceType = void 0
  }
  function ke(w) {
    const E = this.sliceSerialize(w),
      M = this.stack[this.stack.length - 2]
    ;((M.label = xf(E)), (M.identifier = bt(E).toLowerCase()))
  }
  function De() {
    const w = this.stack[this.stack.length - 1],
      E = this.resume(),
      M = this.stack[this.stack.length - 1]
    if (((this.data.inReference = true), M.type === 'link')) {
      const $ = w.children
      M.children = $
    } else M.alt = E
  }
  function m() {
    const w = this.resume(),
      E = this.stack[this.stack.length - 1]
    E.url = w
  }
  function xe() {
    const w = this.resume(),
      E = this.stack[this.stack.length - 1]
    E.title = w
  }
  function Fe() {
    this.data.inReference = void 0
  }
  function g() {
    this.data.referenceType = 'collapsed'
  }
  function we(w) {
    const E = this.resume(),
      M = this.stack[this.stack.length - 1]
    ;((M.label = E),
      (M.identifier = bt(this.sliceSerialize(w)).toLowerCase()),
      (this.data.referenceType = 'full'))
  }
  function Ge(w) {
    this.data.characterReferenceType = w.type
  }
  function re(w) {
    const E = this.sliceSerialize(w),
      M = this.data.characterReferenceType
    let $
    M
      ? (($ = zi(E, M === 'characterReferenceMarkerNumeric' ? 10 : 16)),
        (this.data.characterReferenceType = void 0))
      : ($ = Yn(E))
    const U = this.stack[this.stack.length - 1]
    U.value += $
  }
  function Et(w) {
    const E = this.stack.pop()
    E.position.end = Ye(w.end)
  }
  function He(w) {
    k.call(this, w)
    const E = this.stack[this.stack.length - 1]
    E.url = this.sliceSerialize(w)
  }
  function rt(w) {
    k.call(this, w)
    const E = this.stack[this.stack.length - 1]
    E.url = 'mailto:' + this.sliceSerialize(w)
  }
  function it() {
    return { type: 'blockquote', children: [] }
  }
  function qt() {
    return { type: 'code', lang: null, meta: null, value: '' }
  }
  function xo() {
    return { type: 'inlineCode', value: '' }
  }
  function wo() {
    return { type: 'definition', identifier: '', label: null, title: null, url: '' }
  }
  function So() {
    return { type: 'emphasis', children: [] }
  }
  function Pr() {
    return { type: 'heading', depth: 0, children: [] }
  }
  function zr() {
    return { type: 'break' }
  }
  function Dr() {
    return { type: 'html', value: '' }
  }
  function Co() {
    return { type: 'image', title: null, url: '', alt: null }
  }
  function Fr() {
    return { type: 'link', title: null, url: '', children: [] }
  }
  function Rr(w) {
    return {
      type: 'list',
      ordered: w.type === 'listOrdered',
      start: null,
      spread: w._spread,
      children: [],
    }
  }
  function vo(w) {
    return { type: 'listItem', spread: w._spread, checked: null, children: [] }
  }
  function _o() {
    return { type: 'paragraph', children: [] }
  }
  function Eo() {
    return { type: 'strong', children: [] }
  }
  function Io() {
    return { type: 'text', value: '' }
  }
  function Ao() {
    return { type: 'thematicBreak' }
  }
}
function Ye(e) {
  return { line: e.line, column: e.column, offset: e.offset }
}
function Ji(e, n) {
  let t = -1
  for (; ++t < n.length; ) {
    const r = n[t]
    Array.isArray(r) ? Ji(e, r) : vf(e, r)
  }
}
function vf(e, n) {
  let t
  for (t in n)
    if (Qi.call(n, t))
      switch (t) {
        case 'canContainEols': {
          const r = n[t]
          r && e[t].push(...r)
          break
        }
        case 'transforms': {
          const r = n[t]
          r && e[t].push(...r)
          break
        }
        case 'enter':
        case 'exit': {
          const r = n[t]
          r && Object.assign(e[t], r)
          break
        }
      }
}
function Zi(e, n) {
  throw e
    ? new Error(
        'Cannot close `' +
          e.type +
          '` (' +
          Pt({ start: e.start, end: e.end }) +
          '): a different token (`' +
          n.type +
          '`, ' +
          Pt({ start: n.start, end: n.end }) +
          ') is open'
      )
    : new Error(
        'Cannot close document, a token (`' +
          n.type +
          '`, ' +
          Pt({ start: n.start, end: n.end }) +
          ') is still open'
      )
}
function _f(e) {
  const n = this
  n.parser = t
  function t(r) {
    return Sf(r, {
      ...n.data('settings'),
      ...e,
      extensions: n.data('micromarkExtensions') || [],
      mdastExtensions: n.data('fromMarkdownExtensions') || [],
    })
  }
}
function Ef(e) {
  if (typeof e != 'string') throw new TypeError('Expected a string')
  return e.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d')
}
function If(e, n, t) {
  const i = Uo({}.ignore || []),
    l = Af(n)
  let o = -1
  for (; ++o < l.length; ) Wo(e, 'text', a)
  function a(u, h) {
    let c = -1,
      p
    for (; ++c < h.length; ) {
      const f = h[c],
        d = p ? p.children : void 0
      if (i(f, d ? d.indexOf(f) : void 0, p)) return
      p = f
    }
    if (p) return s(u, h)
  }
  function s(u, h) {
    const c = h[h.length - 1],
      p = l[o][0],
      f = l[o][1]
    let d = 0
    const S = c.children.indexOf(u)
    let y = false,
      v = []
    p.lastIndex = 0
    let C = p.exec(u.value)
    for (; C; ) {
      const P = C.index,
        F = { index: C.index, input: C.input, stack: [...h, u] }
      let x = f(...C, F)
      if (
        (typeof x == 'string' && (x = x.length > 0 ? { type: 'text', value: x } : void 0),
        x === false
          ? (p.lastIndex = P + 1)
          : (d !== P && v.push({ type: 'text', value: u.value.slice(d, P) }),
            Array.isArray(x) ? v.push(...x) : x && v.push(x),
            (d = P + C[0].length),
            (y = true)),
        !p.global)
      )
        break
      C = p.exec(u.value)
    }
    return (
      y
        ? (d < u.value.length && v.push({ type: 'text', value: u.value.slice(d) }),
          c.children.splice(S, 1, ...v))
        : (v = [u]),
      S + v.length
    )
  }
}
function Af(e) {
  const n = []
  if (!Array.isArray(e)) throw new TypeError('Expected find and replace tuple or list of tuples')
  const t = !e[0] || Array.isArray(e[0]) ? e : [e]
  let r = -1
  for (; ++r < t.length; ) {
    const i = t[r]
    n.push([Tf(i[0]), Of(i[1])])
  }
  return n
}
function Tf(e) {
  return typeof e == 'string' ? new RegExp(Ef(e), 'g') : e
}
function Of(e) {
  return typeof e == 'function'
    ? e
    : function () {
        return e
      }
}
function Lf(e) {
  If(e, [/\r?\n|\r/g, Pf])
}
function Pf() {
  return { type: 'break' }
}
function zf() {
  return function (e) {
    Lf(e)
  }
}
function Df(e) {
  Ue(e, function (n, t, r) {
    if (
      t !== void 0 &&
      r &&
      n.type === 'paragraph' &&
      n.children.every(function (i) {
        return i.type === 'text' && /^\s*$/.test(i.value)
      })
    )
      return (r.children.splice(t, 1), t)
  })
}
function Ff(e = { except: ['http', 'https'] }) {
  return function (n) {
    const t = /* @__PURE__ */ new Map()
    ;(Ue(n, 'definition', function (r, i, l) {
      if ((t.set(r.identifier, r.url), l && typeof i == 'number')) {
        const o = r.url
        if (o && o.includes(':') && !e.except.some((a) => o.startsWith(`${a}:`)))
          return (l.children.splice(i, 1), i)
      }
    }),
      Ue(n, function (r, i, l) {
        if (l && typeof i == 'number' && (r.type === 'link' || r.type === 'linkReference')) {
          const o = r.type === 'link' ? r.url : t.get(r.identifier)
          if (o && o.includes(':') && !e.except.some((a) => o.startsWith(`${a}:`)))
            return (l.children.splice(i, 1, ...r.children), i)
        }
      }),
      Df(n))
  }
}
function Rf(e, n) {
  const t = {
    type: 'element',
    tagName: 'blockquote',
    properties: {},
    children: e.wrap(e.all(n), true),
  }
  return (e.patch(n, t), e.applyData(n, t))
}
function Bf(e, n) {
  const t = { type: 'element', tagName: 'br', properties: {}, children: [] }
  return (
    e.patch(n, t),
    [
      e.applyData(n, t),
      {
        type: 'text',
        value: `
`,
      },
    ]
  )
}
function Mf(e, n) {
  const t = n.value
      ? n.value +
        `
`
      : '',
    r = {}
  n.lang && (r.className = ['language-' + n.lang])
  let i = {
    type: 'element',
    tagName: 'code',
    properties: r,
    children: [{ type: 'text', value: t }],
  }
  return (
    n.meta && (i.data = { meta: n.meta }),
    e.patch(n, i),
    (i = e.applyData(n, i)),
    (i = { type: 'element', tagName: 'pre', properties: {}, children: [i] }),
    e.patch(n, i),
    i
  )
}
function Nf(e, n) {
  const t = { type: 'element', tagName: 'del', properties: {}, children: e.all(n) }
  return (e.patch(n, t), e.applyData(n, t))
}
function $f(e, n) {
  const t = { type: 'element', tagName: 'em', properties: {}, children: e.all(n) }
  return (e.patch(n, t), e.applyData(n, t))
}
function Vf(e, n) {
  const t = typeof e.options.clobberPrefix == 'string' ? e.options.clobberPrefix : 'user-content-',
    r = String(n.identifier).toUpperCase(),
    i = kt(r.toLowerCase()),
    l = e.footnoteOrder.indexOf(r)
  let o,
    a = e.footnoteCounts.get(r)
  ;(a === void 0 ? ((a = 0), e.footnoteOrder.push(r), (o = e.footnoteOrder.length)) : (o = l + 1),
    (a += 1),
    e.footnoteCounts.set(r, a))
  const s = {
    type: 'element',
    tagName: 'a',
    properties: {
      href: '#' + t + 'fn-' + i,
      id: t + 'fnref-' + i + (a > 1 ? '-' + a : ''),
      dataFootnoteRef: true,
      ariaDescribedBy: ['footnote-label'],
    },
    children: [{ type: 'text', value: String(o) }],
  }
  e.patch(n, s)
  const u = { type: 'element', tagName: 'sup', properties: {}, children: [s] }
  return (e.patch(n, u), e.applyData(n, u))
}
function jf(e, n) {
  const t = { type: 'element', tagName: 'h' + n.depth, properties: {}, children: e.all(n) }
  return (e.patch(n, t), e.applyData(n, t))
}
function Hf(e, n) {
  if (e.options.allowDangerousHtml) {
    const t = { type: 'raw', value: n.value }
    return (e.patch(n, t), e.applyData(n, t))
  }
}
function el(e, n) {
  const t = n.referenceType
  let r = ']'
  if (
    (t === 'collapsed' ? (r += '[]') : t === 'full' && (r += '[' + (n.label || n.identifier) + ']'),
    n.type === 'imageReference')
  )
    return [{ type: 'text', value: '![' + n.alt + r }]
  const i = e.all(n),
    l = i[0]
  l && l.type === 'text' ? (l.value = '[' + l.value) : i.unshift({ type: 'text', value: '[' })
  const o = i[i.length - 1]
  return (o && o.type === 'text' ? (o.value += r) : i.push({ type: 'text', value: r }), i)
}
function Uf(e, n) {
  const t = String(n.identifier).toUpperCase(),
    r = e.definitionById.get(t)
  if (!r) return el(e, n)
  const i = { src: kt(r.url || ''), alt: n.alt }
  r.title !== null && r.title !== void 0 && (i.title = r.title)
  const l = { type: 'element', tagName: 'img', properties: i, children: [] }
  return (e.patch(n, l), e.applyData(n, l))
}
function Wf(e, n) {
  const t = { src: kt(n.url) }
  ;(n.alt !== null && n.alt !== void 0 && (t.alt = n.alt),
    n.title !== null && n.title !== void 0 && (t.title = n.title))
  const r = { type: 'element', tagName: 'img', properties: t, children: [] }
  return (e.patch(n, r), e.applyData(n, r))
}
function qf(e, n) {
  const t = { type: 'text', value: n.value.replace(/\r?\n|\r/g, ' ') }
  e.patch(n, t)
  const r = { type: 'element', tagName: 'code', properties: {}, children: [t] }
  return (e.patch(n, r), e.applyData(n, r))
}
function Xf(e, n) {
  const t = String(n.identifier).toUpperCase(),
    r = e.definitionById.get(t)
  if (!r) return el(e, n)
  const i = { href: kt(r.url || '') }
  r.title !== null && r.title !== void 0 && (i.title = r.title)
  const l = { type: 'element', tagName: 'a', properties: i, children: e.all(n) }
  return (e.patch(n, l), e.applyData(n, l))
}
function Yf(e, n) {
  const t = { href: kt(n.url) }
  n.title !== null && n.title !== void 0 && (t.title = n.title)
  const r = { type: 'element', tagName: 'a', properties: t, children: e.all(n) }
  return (e.patch(n, r), e.applyData(n, r))
}
function Gf(e, n, t) {
  const r = e.all(n),
    i = t ? Kf(t) : tl(n),
    l = {},
    o = []
  if (typeof n.checked == 'boolean') {
    const h = r[0]
    let c
    ;(h && h.type === 'element' && h.tagName === 'p'
      ? (c = h)
      : ((c = { type: 'element', tagName: 'p', properties: {}, children: [] }), r.unshift(c)),
      c.children.length > 0 && c.children.unshift({ type: 'text', value: ' ' }),
      c.children.unshift({
        type: 'element',
        tagName: 'input',
        properties: { type: 'checkbox', checked: n.checked, disabled: true },
        children: [],
      }),
      (l.className = ['task-list-item']))
  }
  let a = -1
  for (; ++a < r.length; ) {
    const h = r[a]
    ;((i || a !== 0 || h.type !== 'element' || h.tagName !== 'p') &&
      o.push({
        type: 'text',
        value: `
`,
      }),
      h.type === 'element' && h.tagName === 'p' && !i ? o.push(...h.children) : o.push(h))
  }
  const s = r[r.length - 1]
  s &&
    (i || s.type !== 'element' || s.tagName !== 'p') &&
    o.push({
      type: 'text',
      value: `
`,
    })
  const u = { type: 'element', tagName: 'li', properties: l, children: o }
  return (e.patch(n, u), e.applyData(n, u))
}
function Kf(e) {
  let n = false
  if (e.type === 'list') {
    n = e.spread || false
    const t = e.children
    let r = -1
    for (; !n && ++r < t.length; ) n = tl(t[r])
  }
  return n
}
function tl(e) {
  const n = e.spread
  return n ?? e.children.length > 1
}
function Qf(e, n) {
  const t = {},
    r = e.all(n)
  let i = -1
  for (typeof n.start == 'number' && n.start !== 1 && (t.start = n.start); ++i < r.length; ) {
    const o = r[i]
    if (
      o.type === 'element' &&
      o.tagName === 'li' &&
      o.properties &&
      Array.isArray(o.properties.className) &&
      o.properties.className.includes('task-list-item')
    ) {
      t.className = ['contains-task-list']
      break
    }
  }
  const l = {
    type: 'element',
    tagName: n.ordered ? 'ol' : 'ul',
    properties: t,
    children: e.wrap(r, true),
  }
  return (e.patch(n, l), e.applyData(n, l))
}
function Jf(e, n) {
  const t = { type: 'element', tagName: 'p', properties: {}, children: e.all(n) }
  return (e.patch(n, t), e.applyData(n, t))
}
function Zf(e, n) {
  const t = { type: 'root', children: e.wrap(e.all(n)) }
  return (e.patch(n, t), e.applyData(n, t))
}
function ep(e, n) {
  const t = { type: 'element', tagName: 'strong', properties: {}, children: e.all(n) }
  return (e.patch(n, t), e.applyData(n, t))
}
const nl = rl('end'),
  nr = rl('start')
function rl(e) {
  return n
  function n(t) {
    const r = (t && t.position && t.position[e]) || {}
    if (typeof r.line == 'number' && r.line > 0 && typeof r.column == 'number' && r.column > 0)
      return {
        line: r.line,
        column: r.column,
        offset: typeof r.offset == 'number' && r.offset > -1 ? r.offset : void 0,
      }
  }
}
function tp(e) {
  const n = nr(e),
    t = nl(e)
  if (n && t) return { start: n, end: t }
}
function np(e, n) {
  const t = e.all(n),
    r = t.shift(),
    i = []
  if (r) {
    const o = { type: 'element', tagName: 'thead', properties: {}, children: e.wrap([r], true) }
    ;(e.patch(n.children[0], o), i.push(o))
  }
  if (t.length > 0) {
    const o = { type: 'element', tagName: 'tbody', properties: {}, children: e.wrap(t, true) },
      a = nr(n.children[1]),
      s = nl(n.children[n.children.length - 1])
    ;(a && s && (o.position = { start: a, end: s }), i.push(o))
  }
  const l = { type: 'element', tagName: 'table', properties: {}, children: e.wrap(i, true) }
  return (e.patch(n, l), e.applyData(n, l))
}
function rp(e, n, t) {
  const r = t ? t.children : void 0,
    l = (r ? r.indexOf(n) : 1) === 0 ? 'th' : 'td',
    o = t && t.type === 'table' ? t.align : void 0,
    a = o ? o.length : n.children.length
  let s = -1
  const u = []
  for (; ++s < a; ) {
    const c = n.children[s],
      p = {},
      f = o ? o[s] : void 0
    f && (p.align = f)
    let d = { type: 'element', tagName: l, properties: p, children: [] }
    ;(c && ((d.children = e.all(c)), e.patch(c, d), (d = e.applyData(c, d))), u.push(d))
  }
  const h = { type: 'element', tagName: 'tr', properties: {}, children: e.wrap(u, true) }
  return (e.patch(n, h), e.applyData(n, h))
}
function ip(e, n) {
  const t = { type: 'element', tagName: 'td', properties: {}, children: e.all(n) }
  return (e.patch(n, t), e.applyData(n, t))
}
const il = 9,
  ll = 32
function lp(e) {
  const n = String(e),
    t = /\r?\n|\r/g
  let r = t.exec(n),
    i = 0
  const l = []
  for (; r; )
    (l.push(ol(n.slice(i, r.index), i > 0, true), r[0]),
      (i = r.index + r[0].length),
      (r = t.exec(n)))
  return (l.push(ol(n.slice(i), i > 0, false)), l.join(''))
}
function ol(e, n, t) {
  let r = 0,
    i = e.length
  if (n) {
    let l = e.codePointAt(r)
    for (; l === il || l === ll; ) (r++, (l = e.codePointAt(r)))
  }
  if (t) {
    let l = e.codePointAt(i - 1)
    for (; l === il || l === ll; ) (i--, (l = e.codePointAt(i - 1)))
  }
  return i > r ? e.slice(r, i) : ''
}
function op(e, n) {
  const t = { type: 'text', value: lp(String(n.value)) }
  return (e.patch(n, t), e.applyData(n, t))
}
function ap(e, n) {
  const t = { type: 'element', tagName: 'hr', properties: {}, children: [] }
  return (e.patch(n, t), e.applyData(n, t))
}
const sp = {
  blockquote: Rf,
  break: Bf,
  code: Mf,
  delete: Nf,
  emphasis: $f,
  footnoteReference: Vf,
  heading: jf,
  html: Hf,
  imageReference: Uf,
  image: Wf,
  inlineCode: qf,
  linkReference: Xf,
  link: Yf,
  listItem: Gf,
  list: Qf,
  paragraph: Jf,
  root: Zf,
  strong: ep,
  table: np,
  tableCell: ip,
  tableRow: rp,
  text: op,
  thematicBreak: ap,
  toml: cn,
  yaml: cn,
  definition: cn,
  footnoteDefinition: cn,
}
function cn() {}
const al = -1,
  hn = 0,
  Rt = 1,
  fn = 2,
  rr = 3,
  ir = 4,
  lr = 5,
  or = 6,
  sl = 7,
  ul = 8,
  cl = typeof self == 'object' ? self : globalThis,
  up = (e, n) => {
    const t = (i, l) => (e.set(l, i), i),
      r = (i) => {
        if (e.has(i)) return e.get(i)
        const [l, o] = n[i]
        switch (l) {
          case hn:
          case al:
            return t(o, i)
          case Rt: {
            const a = t([], i)
            for (const s of o) a.push(r(s))
            return a
          }
          case fn: {
            const a = t({}, i)
            for (const [s, u] of o) a[r(s)] = r(u)
            return a
          }
          case rr:
            return t(new Date(o), i)
          case ir: {
            const { source: a, flags: s } = o
            return t(new RegExp(a, s), i)
          }
          case lr: {
            const a = t(/* @__PURE__ */ new Map(), i)
            for (const [s, u] of o) a.set(r(s), r(u))
            return a
          }
          case or: {
            const a = t(/* @__PURE__ */ new Set(), i)
            for (const s of o) a.add(r(s))
            return a
          }
          case sl: {
            const { name: a, message: s } = o
            return t(new cl[a](s), i)
          }
          case ul:
            return t(BigInt(o), i)
          case 'BigInt':
            return t(Object(BigInt(o)), i)
          case 'ArrayBuffer':
            return t(new Uint8Array(o).buffer, o)
          case 'DataView': {
            const { buffer: a } = new Uint8Array(o)
            return t(new DataView(a), o)
          }
        }
        return t(new cl[l](o), i)
      }
    return r
  },
  hl = (e) => up(/* @__PURE__ */ new Map(), e)(0),
  xt = '',
  { toString: cp } = {},
  { keys: hp } = Object,
  Bt = (e) => {
    const n = typeof e
    if (n !== 'object' || !e) return [hn, n]
    const t = cp.call(e).slice(8, -1)
    switch (t) {
      case 'Array':
        return [Rt, xt]
      case 'Object':
        return [fn, xt]
      case 'Date':
        return [rr, xt]
      case 'RegExp':
        return [ir, xt]
      case 'Map':
        return [lr, xt]
      case 'Set':
        return [or, xt]
      case 'DataView':
        return [Rt, t]
    }
    return t.includes('Array') ? [Rt, t] : t.includes('Error') ? [sl, t] : [fn, t]
  },
  pn = ([e, n]) => e === hn && (n === 'function' || n === 'symbol'),
  fp = (e, n, t, r) => {
    const i = (o, a) => {
        const s = r.push(o) - 1
        return (t.set(a, s), s)
      },
      l = (o) => {
        if (t.has(o)) return t.get(o)
        let [a, s] = Bt(o)
        switch (a) {
          case hn: {
            let h = o
            switch (s) {
              case 'bigint':
                ;((a = ul), (h = o.toString()))
                break
              case 'function':
              case 'symbol':
                if (e) throw new TypeError('unable to serialize ' + s)
                h = null
                break
              case 'undefined':
                return i([al], o)
            }
            return i([a, h], o)
          }
          case Rt: {
            if (s) {
              let p = o
              return (
                s === 'DataView'
                  ? (p = new Uint8Array(o.buffer))
                  : s === 'ArrayBuffer' && (p = new Uint8Array(o)),
                i([s, [...p]], o)
              )
            }
            const h = [],
              c = i([a, h], o)
            for (const p of o) h.push(l(p))
            return c
          }
          case fn: {
            if (s)
              switch (s) {
                case 'BigInt':
                  return i([s, o.toString()], o)
                case 'Boolean':
                case 'Number':
                case 'String':
                  return i([s, o.valueOf()], o)
              }
            if (n && 'toJSON' in o) return l(o.toJSON())
            const h = [],
              c = i([a, h], o)
            for (const p of hp(o)) (e || !pn(Bt(o[p]))) && h.push([l(p), l(o[p])])
            return c
          }
          case rr:
            return i([a, o.toISOString()], o)
          case ir: {
            const { source: h, flags: c } = o
            return i([a, { source: h, flags: c }], o)
          }
          case lr: {
            const h = [],
              c = i([a, h], o)
            for (const [p, f] of o) (e || !(pn(Bt(p)) || pn(Bt(f)))) && h.push([l(p), l(f)])
            return c
          }
          case or: {
            const h = [],
              c = i([a, h], o)
            for (const p of o) (e || !pn(Bt(p))) && h.push(l(p))
            return c
          }
        }
        const { message: u } = o
        return i([a, { name: s, message: u }], o)
      }
    return l
  },
  fl = (e, { json: n, lossy: t } = {}) => {
    const r = []
    return (fp(!(n || t), !!n, /* @__PURE__ */ new Map(), r)(e), r)
  },
  Ze =
    typeof structuredClone == 'function'
      ? (e, n) => (n && ('json' in n || 'lossy' in n) ? hl(fl(e, n)) : structuredClone(e))
      : (e, n) => hl(fl(e, n))
function pp(e, n) {
  const t = [{ type: 'text', value: '↩' }]
  return (
    n > 1 &&
      t.push({
        type: 'element',
        tagName: 'sup',
        properties: {},
        children: [{ type: 'text', value: String(n) }],
      }),
    t
  )
}
function dp(e, n) {
  return 'Back to reference ' + (e + 1) + (n > 1 ? '-' + n : '')
}
function mp(e) {
  const n = typeof e.options.clobberPrefix == 'string' ? e.options.clobberPrefix : 'user-content-',
    t = e.options.footnoteBackContent || pp,
    r = e.options.footnoteBackLabel || dp,
    i = e.options.footnoteLabel || 'Footnotes',
    l = e.options.footnoteLabelTagName || 'h2',
    o = e.options.footnoteLabelProperties || { className: ['sr-only'] },
    a = []
  let s = -1
  for (; ++s < e.footnoteOrder.length; ) {
    const u = e.footnoteById.get(e.footnoteOrder[s])
    if (!u) continue
    const h = e.all(u),
      c = String(u.identifier).toUpperCase(),
      p = kt(c.toLowerCase())
    let f = 0
    const d = [],
      b = e.footnoteCounts.get(c)
    for (; b !== void 0 && ++f <= b; ) {
      d.length > 0 && d.push({ type: 'text', value: ' ' })
      let v = typeof t == 'string' ? t : t(s, f)
      ;(typeof v == 'string' && (v = { type: 'text', value: v }),
        d.push({
          type: 'element',
          tagName: 'a',
          properties: {
            href: '#' + n + 'fnref-' + p + (f > 1 ? '-' + f : ''),
            dataFootnoteBackref: '',
            ariaLabel: typeof r == 'string' ? r : r(s, f),
            className: ['data-footnote-backref'],
          },
          children: Array.isArray(v) ? v : [v],
        }))
    }
    const S = h[h.length - 1]
    if (S && S.type === 'element' && S.tagName === 'p') {
      const v = S.children[S.children.length - 1]
      ;(v && v.type === 'text' ? (v.value += ' ') : S.children.push({ type: 'text', value: ' ' }),
        S.children.push(...d))
    } else h.push(...d)
    const y = {
      type: 'element',
      tagName: 'li',
      properties: { id: n + 'fn-' + p },
      children: e.wrap(h, true),
    }
    ;(e.patch(u, y), a.push(y))
  }
  if (a.length !== 0)
    return {
      type: 'element',
      tagName: 'section',
      properties: { dataFootnotes: true, className: ['footnotes'] },
      children: [
        {
          type: 'element',
          tagName: l,
          properties: { ...Ze(o), id: 'footnote-label' },
          children: [{ type: 'text', value: i }],
        },
        {
          type: 'text',
          value: `
`,
        },
        { type: 'element', tagName: 'ol', properties: {}, children: e.wrap(a, true) },
        {
          type: 'text',
          value: `
`,
        },
      ],
    }
}
const ar = {}.hasOwnProperty,
  gp = {}
function yp(e, n) {
  const t = n || gp,
    r = /* @__PURE__ */ new Map(),
    i = /* @__PURE__ */ new Map(),
    l = /* @__PURE__ */ new Map(),
    o = { ...sp, ...t.handlers },
    a = {
      all: u,
      applyData: kp,
      definitionById: r,
      footnoteById: i,
      footnoteCounts: l,
      footnoteOrder: [],
      handlers: o,
      one: s,
      options: t,
      patch: bp,
      wrap: wp,
    }
  return (
    Ue(e, function (h) {
      if (h.type === 'definition' || h.type === 'footnoteDefinition') {
        const c = h.type === 'definition' ? r : i,
          p = String(h.identifier).toUpperCase()
        c.has(p) || c.set(p, h)
      }
    }),
    a
  )
  function s(h, c) {
    const p = h.type,
      f = a.handlers[p]
    if (ar.call(a.handlers, p) && f) return f(a, h, c)
    if (a.options.passThrough && a.options.passThrough.includes(p)) {
      if ('children' in h) {
        const { children: b, ...S } = h,
          y = Ze(S)
        return ((y.children = a.all(h)), y)
      }
      return Ze(h)
    }
    return (a.options.unknownHandler || xp)(a, h, c)
  }
  function u(h) {
    const c = []
    if ('children' in h) {
      const p = h.children
      let f = -1
      for (; ++f < p.length; ) {
        const d = a.one(p[f], h)
        if (d) {
          if (
            f &&
            p[f - 1].type === 'break' &&
            (!Array.isArray(d) && d.type === 'text' && (d.value = pl(d.value)),
            !Array.isArray(d) && d.type === 'element')
          ) {
            const b = d.children[0]
            b && b.type === 'text' && (b.value = pl(b.value))
          }
          Array.isArray(d) ? c.push(...d) : c.push(d)
        }
      }
    }
    return c
  }
}
function bp(e, n) {
  e.position && (n.position = tp(e))
}
function kp(e, n) {
  let t = n
  if (e && e.data) {
    const r = e.data.hName,
      i = e.data.hChildren,
      l = e.data.hProperties
    if (typeof r == 'string')
      if (t.type === 'element') t.tagName = r
      else {
        const o = 'children' in t ? t.children : [t]
        t = { type: 'element', tagName: r, properties: {}, children: o }
      }
    ;(t.type === 'element' && l && Object.assign(t.properties, Ze(l)),
      'children' in t && t.children && i !== null && i !== void 0 && (t.children = i))
  }
  return t
}
function xp(e, n) {
  const t = n.data || {},
    r =
      'value' in n && !(ar.call(t, 'hProperties') || ar.call(t, 'hChildren'))
        ? { type: 'text', value: n.value }
        : { type: 'element', tagName: 'div', properties: {}, children: e.all(n) }
  return (e.patch(n, r), e.applyData(n, r))
}
function wp(e, n) {
  const t = []
  let r = -1
  for (
    n &&
    t.push({
      type: 'text',
      value: `
`,
    });
    ++r < e.length;

  )
    (r &&
      t.push({
        type: 'text',
        value: `
`,
      }),
      t.push(e[r]))
  return (
    n &&
      e.length > 0 &&
      t.push({
        type: 'text',
        value: `
`,
      }),
    t
  )
}
function pl(e) {
  let n = 0,
    t = e.charCodeAt(n)
  for (; t === 9 || t === 32; ) (n++, (t = e.charCodeAt(n)))
  return e.slice(n)
}
function dl(e, n) {
  const t = yp(e, n),
    r = t.one(e, void 0),
    i = mp(t),
    l = Array.isArray(r) ? { type: 'root', children: r } : r || { type: 'root', children: [] }
  return (
    i &&
      l.children.push(
        {
          type: 'text',
          value: `
`,
        },
        i
      ),
    l
  )
}
function Sp(e, n) {
  return e && 'run' in e
    ? async function (t, r) {
        const i = dl(t, { file: r, ...n })
        await e.run(i, r)
      }
    : function (t, r) {
        return dl(t, { file: r, ...(e || n) })
      }
}
function Cp(e, n) {
  const t = {}
  return (e[e.length - 1] === '' ? [...e, ''] : e)
    .join((t.padRight ? ' ' : '') + ',' + (t.padLeft === false ? '' : ' '))
    .trim()
}
const vp = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,
  _p = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,
  Ep = {}
function ml(e, n) {
  return (Ep.jsx ? _p : vp).test(e)
}
const Ip = /[ \t\n\f\r]/g
function Ap(e) {
  return typeof e == 'object' ? (e.type === 'text' ? gl(e.value) : false) : gl(e)
}
function gl(e) {
  return e.replace(Ip, '') === ''
}
class Mt {
  constructor(n, t, r) {
    ;((this.normal = t), (this.property = n), r && (this.space = r))
  }
}
;((Mt.prototype.normal = {}), (Mt.prototype.property = {}), (Mt.prototype.space = void 0))
function yl(e, n) {
  const t = {},
    r = {}
  for (const i of e) (Object.assign(t, i.property), Object.assign(r, i.normal))
  return new Mt(t, r, n)
}
function sr(e) {
  return e.toLowerCase()
}
class ce {
  constructor(n, t) {
    ;((this.attribute = t), (this.property = n))
  }
}
;((ce.prototype.attribute = ''),
  (ce.prototype.booleanish = false),
  (ce.prototype.boolean = false),
  (ce.prototype.commaOrSpaceSeparated = false),
  (ce.prototype.commaSeparated = false),
  (ce.prototype.defined = false),
  (ce.prototype.mustUseProperty = false),
  (ce.prototype.number = false),
  (ce.prototype.overloadedBoolean = false),
  (ce.prototype.property = ''),
  (ce.prototype.spaceSeparated = false),
  (ce.prototype.space = void 0))
let Tp = 0
const N = et(),
  J = et(),
  ur = et(),
  _ = et(),
  X = et(),
  wt = et(),
  ge = et()
function et() {
  return 2 ** ++Tp
}
const cr = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        boolean: N,
        booleanish: J,
        commaOrSpaceSeparated: ge,
        commaSeparated: wt,
        number: _,
        overloadedBoolean: ur,
        spaceSeparated: X,
      },
      Symbol.toStringTag,
      { value: 'Module' }
    )
  ),
  hr = Object.keys(cr)
class fr extends ce {
  constructor(n, t, r, i) {
    let l = -1
    if ((super(n, t), bl(this, 'space', i), typeof r == 'number'))
      for (; ++l < hr.length; ) {
        const o = hr[l]
        bl(this, hr[l], (r & cr[o]) === cr[o])
      }
  }
}
fr.prototype.defined = true
function bl(e, n, t) {
  t && (e[n] = t)
}
function St(e) {
  const n = {},
    t = {}
  for (const [r, i] of Object.entries(e.properties)) {
    const l = new fr(r, e.transform(e.attributes || {}, r), i, e.space)
    ;(e.mustUseProperty && e.mustUseProperty.includes(r) && (l.mustUseProperty = true),
      (n[r] = l),
      (t[sr(r)] = r),
      (t[sr(l.attribute)] = r))
  }
  return new Mt(n, t, e.space)
}
const kl = St({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: J,
    ariaAutoComplete: null,
    ariaBusy: J,
    ariaChecked: J,
    ariaColCount: _,
    ariaColIndex: _,
    ariaColSpan: _,
    ariaControls: X,
    ariaCurrent: null,
    ariaDescribedBy: X,
    ariaDetails: null,
    ariaDisabled: J,
    ariaDropEffect: X,
    ariaErrorMessage: null,
    ariaExpanded: J,
    ariaFlowTo: X,
    ariaGrabbed: J,
    ariaHasPopup: null,
    ariaHidden: J,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: X,
    ariaLevel: _,
    ariaLive: null,
    ariaModal: J,
    ariaMultiLine: J,
    ariaMultiSelectable: J,
    ariaOrientation: null,
    ariaOwns: X,
    ariaPlaceholder: null,
    ariaPosInSet: _,
    ariaPressed: J,
    ariaReadOnly: J,
    ariaRelevant: null,
    ariaRequired: J,
    ariaRoleDescription: X,
    ariaRowCount: _,
    ariaRowIndex: _,
    ariaRowSpan: _,
    ariaSelected: J,
    ariaSetSize: _,
    ariaSort: null,
    ariaValueMax: _,
    ariaValueMin: _,
    ariaValueNow: _,
    ariaValueText: null,
    role: null,
  },
  transform(e, n) {
    return n === 'role' ? n : 'aria-' + n.slice(4).toLowerCase()
  },
})
function xl(e, n) {
  return n in e ? e[n] : n
}
function wl(e, n) {
  return xl(e, n.toLowerCase())
}
const Op = St({
    attributes: {
      acceptcharset: 'accept-charset',
      classname: 'class',
      htmlfor: 'for',
      httpequiv: 'http-equiv',
    },
    mustUseProperty: ['checked', 'multiple', 'muted', 'selected'],
    properties: {
      abbr: null,
      accept: wt,
      acceptCharset: X,
      accessKey: X,
      action: null,
      allow: null,
      allowFullScreen: N,
      allowPaymentRequest: N,
      allowUserMedia: N,
      alt: null,
      as: null,
      async: N,
      autoCapitalize: null,
      autoComplete: X,
      autoFocus: N,
      autoPlay: N,
      blocking: X,
      capture: null,
      charSet: null,
      checked: N,
      cite: null,
      className: X,
      cols: _,
      colSpan: null,
      content: null,
      contentEditable: J,
      controls: N,
      controlsList: X,
      coords: _ | wt,
      crossOrigin: null,
      data: null,
      dateTime: null,
      decoding: null,
      default: N,
      defer: N,
      dir: null,
      dirName: null,
      disabled: N,
      download: ur,
      draggable: J,
      encType: null,
      enterKeyHint: null,
      fetchPriority: null,
      form: null,
      formAction: null,
      formEncType: null,
      formMethod: null,
      formNoValidate: N,
      formTarget: null,
      headers: X,
      height: _,
      hidden: ur,
      high: _,
      href: null,
      hrefLang: null,
      htmlFor: X,
      httpEquiv: X,
      id: null,
      imageSizes: null,
      imageSrcSet: null,
      inert: N,
      inputMode: null,
      integrity: null,
      is: null,
      isMap: N,
      itemId: null,
      itemProp: X,
      itemRef: X,
      itemScope: N,
      itemType: X,
      kind: null,
      label: null,
      lang: null,
      language: null,
      list: null,
      loading: null,
      loop: N,
      low: _,
      manifest: null,
      max: null,
      maxLength: _,
      media: null,
      method: null,
      min: null,
      minLength: _,
      multiple: N,
      muted: N,
      name: null,
      nonce: null,
      noModule: N,
      noValidate: N,
      onAbort: null,
      onAfterPrint: null,
      onAuxClick: null,
      onBeforeMatch: null,
      onBeforePrint: null,
      onBeforeToggle: null,
      onBeforeUnload: null,
      onBlur: null,
      onCancel: null,
      onCanPlay: null,
      onCanPlayThrough: null,
      onChange: null,
      onClick: null,
      onClose: null,
      onContextLost: null,
      onContextMenu: null,
      onContextRestored: null,
      onCopy: null,
      onCueChange: null,
      onCut: null,
      onDblClick: null,
      onDrag: null,
      onDragEnd: null,
      onDragEnter: null,
      onDragExit: null,
      onDragLeave: null,
      onDragOver: null,
      onDragStart: null,
      onDrop: null,
      onDurationChange: null,
      onEmptied: null,
      onEnded: null,
      onError: null,
      onFocus: null,
      onFormData: null,
      onHashChange: null,
      onInput: null,
      onInvalid: null,
      onKeyDown: null,
      onKeyPress: null,
      onKeyUp: null,
      onLanguageChange: null,
      onLoad: null,
      onLoadedData: null,
      onLoadedMetadata: null,
      onLoadEnd: null,
      onLoadStart: null,
      onMessage: null,
      onMessageError: null,
      onMouseDown: null,
      onMouseEnter: null,
      onMouseLeave: null,
      onMouseMove: null,
      onMouseOut: null,
      onMouseOver: null,
      onMouseUp: null,
      onOffline: null,
      onOnline: null,
      onPageHide: null,
      onPageShow: null,
      onPaste: null,
      onPause: null,
      onPlay: null,
      onPlaying: null,
      onPopState: null,
      onProgress: null,
      onRateChange: null,
      onRejectionHandled: null,
      onReset: null,
      onResize: null,
      onScroll: null,
      onScrollEnd: null,
      onSecurityPolicyViolation: null,
      onSeeked: null,
      onSeeking: null,
      onSelect: null,
      onSlotChange: null,
      onStalled: null,
      onStorage: null,
      onSubmit: null,
      onSuspend: null,
      onTimeUpdate: null,
      onToggle: null,
      onUnhandledRejection: null,
      onUnload: null,
      onVolumeChange: null,
      onWaiting: null,
      onWheel: null,
      open: N,
      optimum: _,
      pattern: null,
      ping: X,
      placeholder: null,
      playsInline: N,
      popover: null,
      popoverTarget: null,
      popoverTargetAction: null,
      poster: null,
      preload: null,
      readOnly: N,
      referrerPolicy: null,
      rel: X,
      required: N,
      reversed: N,
      rows: _,
      rowSpan: _,
      sandbox: X,
      scope: null,
      scoped: N,
      seamless: N,
      selected: N,
      shadowRootClonable: N,
      shadowRootDelegatesFocus: N,
      shadowRootMode: null,
      shape: null,
      size: _,
      sizes: null,
      slot: null,
      span: _,
      spellCheck: J,
      src: null,
      srcDoc: null,
      srcLang: null,
      srcSet: null,
      start: _,
      step: null,
      style: null,
      tabIndex: _,
      target: null,
      title: null,
      translate: null,
      type: null,
      typeMustMatch: N,
      useMap: null,
      value: J,
      width: _,
      wrap: null,
      writingSuggestions: null,
      align: null,
      aLink: null,
      archive: X,
      axis: null,
      background: null,
      bgColor: null,
      border: _,
      borderColor: null,
      bottomMargin: _,
      cellPadding: null,
      cellSpacing: null,
      char: null,
      charOff: null,
      classId: null,
      clear: null,
      code: null,
      codeBase: null,
      codeType: null,
      color: null,
      compact: N,
      declare: N,
      event: null,
      face: null,
      frame: null,
      frameBorder: null,
      hSpace: _,
      leftMargin: _,
      link: null,
      longDesc: null,
      lowSrc: null,
      marginHeight: _,
      marginWidth: _,
      noResize: N,
      noHref: N,
      noShade: N,
      noWrap: N,
      object: null,
      profile: null,
      prompt: null,
      rev: null,
      rightMargin: _,
      rules: null,
      scheme: null,
      scrolling: J,
      standby: null,
      summary: null,
      text: null,
      topMargin: _,
      valueType: null,
      version: null,
      vAlign: null,
      vLink: null,
      vSpace: _,
      allowTransparency: null,
      autoCorrect: null,
      autoSave: null,
      disablePictureInPicture: N,
      disableRemotePlayback: N,
      prefix: null,
      property: null,
      results: _,
      security: null,
      unselectable: null,
    },
    space: 'html',
    transform: wl,
  }),
  Lp = St({
    attributes: {
      accentHeight: 'accent-height',
      alignmentBaseline: 'alignment-baseline',
      arabicForm: 'arabic-form',
      baselineShift: 'baseline-shift',
      capHeight: 'cap-height',
      className: 'class',
      clipPath: 'clip-path',
      clipRule: 'clip-rule',
      colorInterpolation: 'color-interpolation',
      colorInterpolationFilters: 'color-interpolation-filters',
      colorProfile: 'color-profile',
      colorRendering: 'color-rendering',
      crossOrigin: 'crossorigin',
      dataType: 'datatype',
      dominantBaseline: 'dominant-baseline',
      enableBackground: 'enable-background',
      fillOpacity: 'fill-opacity',
      fillRule: 'fill-rule',
      floodColor: 'flood-color',
      floodOpacity: 'flood-opacity',
      fontFamily: 'font-family',
      fontSize: 'font-size',
      fontSizeAdjust: 'font-size-adjust',
      fontStretch: 'font-stretch',
      fontStyle: 'font-style',
      fontVariant: 'font-variant',
      fontWeight: 'font-weight',
      glyphName: 'glyph-name',
      glyphOrientationHorizontal: 'glyph-orientation-horizontal',
      glyphOrientationVertical: 'glyph-orientation-vertical',
      hrefLang: 'hreflang',
      horizAdvX: 'horiz-adv-x',
      horizOriginX: 'horiz-origin-x',
      horizOriginY: 'horiz-origin-y',
      imageRendering: 'image-rendering',
      letterSpacing: 'letter-spacing',
      lightingColor: 'lighting-color',
      markerEnd: 'marker-end',
      markerMid: 'marker-mid',
      markerStart: 'marker-start',
      navDown: 'nav-down',
      navDownLeft: 'nav-down-left',
      navDownRight: 'nav-down-right',
      navLeft: 'nav-left',
      navNext: 'nav-next',
      navPrev: 'nav-prev',
      navRight: 'nav-right',
      navUp: 'nav-up',
      navUpLeft: 'nav-up-left',
      navUpRight: 'nav-up-right',
      onAbort: 'onabort',
      onActivate: 'onactivate',
      onAfterPrint: 'onafterprint',
      onBeforePrint: 'onbeforeprint',
      onBegin: 'onbegin',
      onCancel: 'oncancel',
      onCanPlay: 'oncanplay',
      onCanPlayThrough: 'oncanplaythrough',
      onChange: 'onchange',
      onClick: 'onclick',
      onClose: 'onclose',
      onCopy: 'oncopy',
      onCueChange: 'oncuechange',
      onCut: 'oncut',
      onDblClick: 'ondblclick',
      onDrag: 'ondrag',
      onDragEnd: 'ondragend',
      onDragEnter: 'ondragenter',
      onDragExit: 'ondragexit',
      onDragLeave: 'ondragleave',
      onDragOver: 'ondragover',
      onDragStart: 'ondragstart',
      onDrop: 'ondrop',
      onDurationChange: 'ondurationchange',
      onEmptied: 'onemptied',
      onEnd: 'onend',
      onEnded: 'onended',
      onError: 'onerror',
      onFocus: 'onfocus',
      onFocusIn: 'onfocusin',
      onFocusOut: 'onfocusout',
      onHashChange: 'onhashchange',
      onInput: 'oninput',
      onInvalid: 'oninvalid',
      onKeyDown: 'onkeydown',
      onKeyPress: 'onkeypress',
      onKeyUp: 'onkeyup',
      onLoad: 'onload',
      onLoadedData: 'onloadeddata',
      onLoadedMetadata: 'onloadedmetadata',
      onLoadStart: 'onloadstart',
      onMessage: 'onmessage',
      onMouseDown: 'onmousedown',
      onMouseEnter: 'onmouseenter',
      onMouseLeave: 'onmouseleave',
      onMouseMove: 'onmousemove',
      onMouseOut: 'onmouseout',
      onMouseOver: 'onmouseover',
      onMouseUp: 'onmouseup',
      onMouseWheel: 'onmousewheel',
      onOffline: 'onoffline',
      onOnline: 'ononline',
      onPageHide: 'onpagehide',
      onPageShow: 'onpageshow',
      onPaste: 'onpaste',
      onPause: 'onpause',
      onPlay: 'onplay',
      onPlaying: 'onplaying',
      onPopState: 'onpopstate',
      onProgress: 'onprogress',
      onRateChange: 'onratechange',
      onRepeat: 'onrepeat',
      onReset: 'onreset',
      onResize: 'onresize',
      onScroll: 'onscroll',
      onSeeked: 'onseeked',
      onSeeking: 'onseeking',
      onSelect: 'onselect',
      onShow: 'onshow',
      onStalled: 'onstalled',
      onStorage: 'onstorage',
      onSubmit: 'onsubmit',
      onSuspend: 'onsuspend',
      onTimeUpdate: 'ontimeupdate',
      onToggle: 'ontoggle',
      onUnload: 'onunload',
      onVolumeChange: 'onvolumechange',
      onWaiting: 'onwaiting',
      onZoom: 'onzoom',
      overlinePosition: 'overline-position',
      overlineThickness: 'overline-thickness',
      paintOrder: 'paint-order',
      panose1: 'panose-1',
      pointerEvents: 'pointer-events',
      referrerPolicy: 'referrerpolicy',
      renderingIntent: 'rendering-intent',
      shapeRendering: 'shape-rendering',
      stopColor: 'stop-color',
      stopOpacity: 'stop-opacity',
      strikethroughPosition: 'strikethrough-position',
      strikethroughThickness: 'strikethrough-thickness',
      strokeDashArray: 'stroke-dasharray',
      strokeDashOffset: 'stroke-dashoffset',
      strokeLineCap: 'stroke-linecap',
      strokeLineJoin: 'stroke-linejoin',
      strokeMiterLimit: 'stroke-miterlimit',
      strokeOpacity: 'stroke-opacity',
      strokeWidth: 'stroke-width',
      tabIndex: 'tabindex',
      textAnchor: 'text-anchor',
      textDecoration: 'text-decoration',
      textRendering: 'text-rendering',
      transformOrigin: 'transform-origin',
      typeOf: 'typeof',
      underlinePosition: 'underline-position',
      underlineThickness: 'underline-thickness',
      unicodeBidi: 'unicode-bidi',
      unicodeRange: 'unicode-range',
      unitsPerEm: 'units-per-em',
      vAlphabetic: 'v-alphabetic',
      vHanging: 'v-hanging',
      vIdeographic: 'v-ideographic',
      vMathematical: 'v-mathematical',
      vectorEffect: 'vector-effect',
      vertAdvY: 'vert-adv-y',
      vertOriginX: 'vert-origin-x',
      vertOriginY: 'vert-origin-y',
      wordSpacing: 'word-spacing',
      writingMode: 'writing-mode',
      xHeight: 'x-height',
      playbackOrder: 'playbackorder',
      timelineBegin: 'timelinebegin',
    },
    properties: {
      about: ge,
      accentHeight: _,
      accumulate: null,
      additive: null,
      alignmentBaseline: null,
      alphabetic: _,
      amplitude: _,
      arabicForm: null,
      ascent: _,
      attributeName: null,
      attributeType: null,
      azimuth: _,
      bandwidth: null,
      baselineShift: null,
      baseFrequency: null,
      baseProfile: null,
      bbox: null,
      begin: null,
      bias: _,
      by: null,
      calcMode: null,
      capHeight: _,
      className: X,
      clip: null,
      clipPath: null,
      clipPathUnits: null,
      clipRule: null,
      color: null,
      colorInterpolation: null,
      colorInterpolationFilters: null,
      colorProfile: null,
      colorRendering: null,
      content: null,
      contentScriptType: null,
      contentStyleType: null,
      crossOrigin: null,
      cursor: null,
      cx: null,
      cy: null,
      d: null,
      dataType: null,
      defaultAction: null,
      descent: _,
      diffuseConstant: _,
      direction: null,
      display: null,
      dur: null,
      divisor: _,
      dominantBaseline: null,
      download: N,
      dx: null,
      dy: null,
      edgeMode: null,
      editable: null,
      elevation: _,
      enableBackground: null,
      end: null,
      event: null,
      exponent: _,
      externalResourcesRequired: null,
      fill: null,
      fillOpacity: _,
      fillRule: null,
      filter: null,
      filterRes: null,
      filterUnits: null,
      floodColor: null,
      floodOpacity: null,
      focusable: null,
      focusHighlight: null,
      fontFamily: null,
      fontSize: null,
      fontSizeAdjust: null,
      fontStretch: null,
      fontStyle: null,
      fontVariant: null,
      fontWeight: null,
      format: null,
      fr: null,
      from: null,
      fx: null,
      fy: null,
      g1: wt,
      g2: wt,
      glyphName: wt,
      glyphOrientationHorizontal: null,
      glyphOrientationVertical: null,
      glyphRef: null,
      gradientTransform: null,
      gradientUnits: null,
      handler: null,
      hanging: _,
      hatchContentUnits: null,
      hatchUnits: null,
      height: null,
      href: null,
      hrefLang: null,
      horizAdvX: _,
      horizOriginX: _,
      horizOriginY: _,
      id: null,
      ideographic: _,
      imageRendering: null,
      initialVisibility: null,
      in: null,
      in2: null,
      intercept: _,
      k: _,
      k1: _,
      k2: _,
      k3: _,
      k4: _,
      kernelMatrix: ge,
      kernelUnitLength: null,
      keyPoints: null,
      keySplines: null,
      keyTimes: null,
      kerning: null,
      lang: null,
      lengthAdjust: null,
      letterSpacing: null,
      lightingColor: null,
      limitingConeAngle: _,
      local: null,
      markerEnd: null,
      markerMid: null,
      markerStart: null,
      markerHeight: null,
      markerUnits: null,
      markerWidth: null,
      mask: null,
      maskContentUnits: null,
      maskUnits: null,
      mathematical: null,
      max: null,
      media: null,
      mediaCharacterEncoding: null,
      mediaContentEncodings: null,
      mediaSize: _,
      mediaTime: null,
      method: null,
      min: null,
      mode: null,
      name: null,
      navDown: null,
      navDownLeft: null,
      navDownRight: null,
      navLeft: null,
      navNext: null,
      navPrev: null,
      navRight: null,
      navUp: null,
      navUpLeft: null,
      navUpRight: null,
      numOctaves: null,
      observer: null,
      offset: null,
      onAbort: null,
      onActivate: null,
      onAfterPrint: null,
      onBeforePrint: null,
      onBegin: null,
      onCancel: null,
      onCanPlay: null,
      onCanPlayThrough: null,
      onChange: null,
      onClick: null,
      onClose: null,
      onCopy: null,
      onCueChange: null,
      onCut: null,
      onDblClick: null,
      onDrag: null,
      onDragEnd: null,
      onDragEnter: null,
      onDragExit: null,
      onDragLeave: null,
      onDragOver: null,
      onDragStart: null,
      onDrop: null,
      onDurationChange: null,
      onEmptied: null,
      onEnd: null,
      onEnded: null,
      onError: null,
      onFocus: null,
      onFocusIn: null,
      onFocusOut: null,
      onHashChange: null,
      onInput: null,
      onInvalid: null,
      onKeyDown: null,
      onKeyPress: null,
      onKeyUp: null,
      onLoad: null,
      onLoadedData: null,
      onLoadedMetadata: null,
      onLoadStart: null,
      onMessage: null,
      onMouseDown: null,
      onMouseEnter: null,
      onMouseLeave: null,
      onMouseMove: null,
      onMouseOut: null,
      onMouseOver: null,
      onMouseUp: null,
      onMouseWheel: null,
      onOffline: null,
      onOnline: null,
      onPageHide: null,
      onPageShow: null,
      onPaste: null,
      onPause: null,
      onPlay: null,
      onPlaying: null,
      onPopState: null,
      onProgress: null,
      onRateChange: null,
      onRepeat: null,
      onReset: null,
      onResize: null,
      onScroll: null,
      onSeeked: null,
      onSeeking: null,
      onSelect: null,
      onShow: null,
      onStalled: null,
      onStorage: null,
      onSubmit: null,
      onSuspend: null,
      onTimeUpdate: null,
      onToggle: null,
      onUnload: null,
      onVolumeChange: null,
      onWaiting: null,
      onZoom: null,
      opacity: null,
      operator: null,
      order: null,
      orient: null,
      orientation: null,
      origin: null,
      overflow: null,
      overlay: null,
      overlinePosition: _,
      overlineThickness: _,
      paintOrder: null,
      panose1: null,
      path: null,
      pathLength: _,
      patternContentUnits: null,
      patternTransform: null,
      patternUnits: null,
      phase: null,
      ping: X,
      pitch: null,
      playbackOrder: null,
      pointerEvents: null,
      points: null,
      pointsAtX: _,
      pointsAtY: _,
      pointsAtZ: _,
      preserveAlpha: null,
      preserveAspectRatio: null,
      primitiveUnits: null,
      propagate: null,
      property: ge,
      r: null,
      radius: null,
      referrerPolicy: null,
      refX: null,
      refY: null,
      rel: ge,
      rev: ge,
      renderingIntent: null,
      repeatCount: null,
      repeatDur: null,
      requiredExtensions: ge,
      requiredFeatures: ge,
      requiredFonts: ge,
      requiredFormats: ge,
      resource: null,
      restart: null,
      result: null,
      rotate: null,
      rx: null,
      ry: null,
      scale: null,
      seed: null,
      shapeRendering: null,
      side: null,
      slope: null,
      snapshotTime: null,
      specularConstant: _,
      specularExponent: _,
      spreadMethod: null,
      spacing: null,
      startOffset: null,
      stdDeviation: null,
      stemh: null,
      stemv: null,
      stitchTiles: null,
      stopColor: null,
      stopOpacity: null,
      strikethroughPosition: _,
      strikethroughThickness: _,
      string: null,
      stroke: null,
      strokeDashArray: ge,
      strokeDashOffset: null,
      strokeLineCap: null,
      strokeLineJoin: null,
      strokeMiterLimit: _,
      strokeOpacity: _,
      strokeWidth: null,
      style: null,
      surfaceScale: _,
      syncBehavior: null,
      syncBehaviorDefault: null,
      syncMaster: null,
      syncTolerance: null,
      syncToleranceDefault: null,
      systemLanguage: ge,
      tabIndex: _,
      tableValues: null,
      target: null,
      targetX: _,
      targetY: _,
      textAnchor: null,
      textDecoration: null,
      textRendering: null,
      textLength: null,
      timelineBegin: null,
      title: null,
      transformBehavior: null,
      type: null,
      typeOf: ge,
      to: null,
      transform: null,
      transformOrigin: null,
      u1: null,
      u2: null,
      underlinePosition: _,
      underlineThickness: _,
      unicode: null,
      unicodeBidi: null,
      unicodeRange: null,
      unitsPerEm: _,
      values: null,
      vAlphabetic: _,
      vMathematical: _,
      vectorEffect: null,
      vHanging: _,
      vIdeographic: _,
      version: null,
      vertAdvY: _,
      vertOriginX: _,
      vertOriginY: _,
      viewBox: null,
      viewTarget: null,
      visibility: null,
      width: null,
      widths: null,
      wordSpacing: null,
      writingMode: null,
      x: null,
      x1: null,
      x2: null,
      xChannelSelector: null,
      xHeight: _,
      y: null,
      y1: null,
      y2: null,
      yChannelSelector: null,
      z: null,
      zoomAndPan: null,
    },
    space: 'svg',
    transform: xl,
  }),
  Sl = St({
    properties: {
      xLinkActuate: null,
      xLinkArcRole: null,
      xLinkHref: null,
      xLinkRole: null,
      xLinkShow: null,
      xLinkTitle: null,
      xLinkType: null,
    },
    space: 'xlink',
    transform(e, n) {
      return 'xlink:' + n.slice(5).toLowerCase()
    },
  }),
  Cl = St({
    attributes: { xmlnsxlink: 'xmlns:xlink' },
    properties: { xmlnsXLink: null, xmlns: null },
    space: 'xmlns',
    transform: wl,
  }),
  vl = St({
    properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
    space: 'xml',
    transform(e, n) {
      return 'xml:' + n.slice(3).toLowerCase()
    },
  }),
  Pp = {
    classId: 'classID',
    dataType: 'datatype',
    itemId: 'itemID',
    strokeDashArray: 'strokeDasharray',
    strokeDashOffset: 'strokeDashoffset',
    strokeLineCap: 'strokeLinecap',
    strokeLineJoin: 'strokeLinejoin',
    strokeMiterLimit: 'strokeMiterlimit',
    typeOf: 'typeof',
    xLinkActuate: 'xlinkActuate',
    xLinkArcRole: 'xlinkArcrole',
    xLinkHref: 'xlinkHref',
    xLinkRole: 'xlinkRole',
    xLinkShow: 'xlinkShow',
    xLinkTitle: 'xlinkTitle',
    xLinkType: 'xlinkType',
    xmlnsXLink: 'xmlnsXlink',
  },
  zp = /[A-Z]/g,
  _l = /-[a-z]/g,
  Dp = /^data[-\w.:]+$/i
function Fp(e, n) {
  const t = sr(n)
  let r = n,
    i = ce
  if (t in e.normal) return e.property[e.normal[t]]
  if (t.length > 4 && t.slice(0, 4) === 'data' && Dp.test(n)) {
    if (n.charAt(4) === '-') {
      const l = n.slice(5).replace(_l, Bp)
      r = 'data' + l.charAt(0).toUpperCase() + l.slice(1)
    } else {
      const l = n.slice(4)
      if (!_l.test(l)) {
        let o = l.replace(zp, Rp)
        ;(o.charAt(0) !== '-' && (o = '-' + o), (n = 'data' + o))
      }
    }
    i = fr
  }
  return new i(r, n)
}
function Rp(e) {
  return '-' + e.toLowerCase()
}
function Bp(e) {
  return e.charAt(1).toUpperCase()
}
const Mp = yl([kl, Op, Sl, Cl, vl], 'html'),
  pr = yl([kl, Lp, Sl, Cl, vl], 'svg')
function Np(e) {
  const n = String(e || '').trim()
  return n ? n.split(/[ \t\n\r\f]+/g) : []
}
function $p(e) {
  return e.join(' ').trim()
}
var Ct = {},
  dr,
  El
function Vp() {
  if (El) return dr
  El = 1
  var e = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,
    n = /\n/g,
    t = /^\s*/,
    r = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,
    i = /^:\s*/,
    l = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,
    o = /^[;\s]*/,
    a = /^\s+|\s+$/g,
    s = `
`,
    u = '/',
    h = '*',
    c = '',
    p = 'comment',
    f = 'declaration'
  dr = function (b, S) {
    if (typeof b != 'string') throw new TypeError('First argument must be a string')
    if (!b) return []
    S = S || {}
    var y = 1,
      v = 1
    function C(L) {
      var A = L.match(n)
      A && (y += A.length)
      var R = L.lastIndexOf(s)
      v = ~R ? L.length - R : v + L.length
    }
    function P() {
      var L = { line: y, column: v }
      return function (A) {
        return ((A.position = new F(L)), H(), A)
      }
    }
    function F(L) {
      ;((this.start = L), (this.end = { line: y, column: v }), (this.source = S.source))
    }
    F.prototype.content = b
    function x(L) {
      var A = new Error(S.source + ':' + y + ':' + v + ': ' + L)
      if (
        ((A.reason = L),
        (A.filename = S.source),
        (A.line = y),
        (A.column = v),
        (A.source = b),
        !S.silent)
      )
        throw A
    }
    function B(L) {
      var A = L.exec(b)
      if (A) {
        var R = A[0]
        return (C(R), (b = b.slice(R.length)), A)
      }
    }
    function H() {
      B(t)
    }
    function V(L) {
      var A
      for (L = L || []; (A = k()); ) A !== false && L.push(A)
      return L
    }
    function k() {
      var L = P()
      if (!(u != b.charAt(0) || h != b.charAt(1))) {
        for (var A = 2; c != b.charAt(A) && (h != b.charAt(A) || u != b.charAt(A + 1)); ) ++A
        if (((A += 2), c === b.charAt(A - 1))) return x('End of comment missing')
        var R = b.slice(2, A - 2)
        return ((v += 2), C(R), (b = b.slice(A)), (v += 2), L({ type: p, comment: R }))
      }
    }
    function T() {
      var L = P(),
        A = B(r)
      if (A) {
        if ((k(), !B(i))) return x("property missing ':'")
        var R = B(l),
          Z = L({ type: f, property: d(A[0].replace(e, c)), value: R ? d(R[0].replace(e, c)) : c })
        return (B(o), Z)
      }
    }
    function O() {
      var L = []
      V(L)
      for (var A; (A = T()); ) A !== false && (L.push(A), V(L))
      return L
    }
    return (H(), O())
  }
  function d(b) {
    return b ? b.replace(a, c) : c
  }
  return dr
}
var Il
function jp() {
  if (Il) return Ct
  Il = 1
  var e =
    (Ct && Ct.__importDefault) ||
    function (r) {
      return r && r.__esModule ? r : { default: r }
    }
  ;(Object.defineProperty(Ct, '__esModule', { value: true }), (Ct.default = t))
  var n = e(Vp())
  function t(r, i) {
    var l = null
    if (!r || typeof r != 'string') return l
    var o = (0, n.default)(r),
      a = typeof i == 'function'
    return (
      o.forEach(function (s) {
        if (s.type === 'declaration') {
          var u = s.property,
            h = s.value
          a ? i(u, h, s) : h && ((l = l || {}), (l[u] = h))
        }
      }),
      l
    )
  }
  return Ct
}
var Nt = {},
  Al
function Hp() {
  if (Al) return Nt
  ;((Al = 1), Object.defineProperty(Nt, '__esModule', { value: true }), (Nt.camelCase = void 0))
  var e = /^--[a-zA-Z0-9_-]+$/,
    n = /-([a-z])/g,
    t = /^[^-]+$/,
    r = /^-(webkit|moz|ms|o|khtml)-/,
    i = /^-(ms)-/,
    l = function (u) {
      return !u || t.test(u) || e.test(u)
    },
    o = function (u, h) {
      return h.toUpperCase()
    },
    a = function (u, h) {
      return ''.concat(h, '-')
    },
    s = function (u, h) {
      return (
        h === void 0 && (h = {}),
        l(u)
          ? u
          : ((u = u.toLowerCase()),
            h.reactCompat ? (u = u.replace(i, a)) : (u = u.replace(r, a)),
            u.replace(n, o))
      )
    }
  return ((Nt.camelCase = s), Nt)
}
var $t, Tl
function Up() {
  if (Tl) return $t
  Tl = 1
  var e =
      ($t && $t.__importDefault) ||
      function (i) {
        return i && i.__esModule ? i : { default: i }
      },
    n = e(jp()),
    t = Hp()
  function r(i, l) {
    var o = {}
    return (
      !i ||
        typeof i != 'string' ||
        (0, n.default)(i, function (a, s) {
          a && s && (o[(0, t.camelCase)(a, l)] = s)
        }),
      o
    )
  }
  return ((r.default = r), ($t = r), $t)
}
var Wp = Up()
const qp = Wr(Wp),
  mr = {}.hasOwnProperty,
  Xp = /* @__PURE__ */ new Map(),
  Yp = /[A-Z]/g,
  Gp = /* @__PURE__ */ new Set(['table', 'tbody', 'thead', 'tfoot', 'tr']),
  Kp = /* @__PURE__ */ new Set(['td', 'th']),
  Ol = 'https://github.com/syntax-tree/hast-util-to-jsx-runtime'
function Qp(e, n) {
  if (!n || n.Fragment === void 0) throw new TypeError('Expected `Fragment` in options')
  const t = n.filePath || void 0
  let r
  if (n.development) {
    if (typeof n.jsxDEV != 'function')
      throw new TypeError('Expected `jsxDEV` in options when `development: true`')
    r = ld(t, n.jsxDEV)
  } else {
    if (typeof n.jsx != 'function') throw new TypeError('Expected `jsx` in production options')
    if (typeof n.jsxs != 'function') throw new TypeError('Expected `jsxs` in production options')
    r = id(t, n.jsx, n.jsxs)
  }
  const i = {
      Fragment: n.Fragment,
      ancestors: [],
      components: n.components || {},
      create: r,
      elementAttributeNameCase: n.elementAttributeNameCase || 'react',
      evaluater: n.createEvaluater ? n.createEvaluater() : void 0,
      filePath: t,
      ignoreInvalidStyle: n.ignoreInvalidStyle || false,
      passKeys: n.passKeys !== false,
      passNode: n.passNode || false,
      schema: n.space === 'svg' ? pr : Mp,
      stylePropertyNameCase: n.stylePropertyNameCase || 'dom',
      tableCellAlignToStyle: n.tableCellAlignToStyle !== false,
    },
    l = Ll(i, e, void 0)
  return l && typeof l != 'string' ? l : i.create(e, i.Fragment, { children: l || void 0 }, void 0)
}
function Ll(e, n, t) {
  if (n.type === 'element') return Jp(e, n, t)
  if (n.type === 'mdxFlowExpression' || n.type === 'mdxTextExpression') return Zp(e, n)
  if (n.type === 'mdxJsxFlowElement' || n.type === 'mdxJsxTextElement') return td(e, n, t)
  if (n.type === 'mdxjsEsm') return ed(e, n)
  if (n.type === 'root') return nd(e, n, t)
  if (n.type === 'text') return rd(e, n)
}
function Jp(e, n, t) {
  const r = e.schema
  let i = r
  ;(n.tagName.toLowerCase() === 'svg' && r.space === 'html' && ((i = pr), (e.schema = i)),
    e.ancestors.push(n))
  const l = zl(e, n.tagName, false),
    o = od(e, n)
  let a = yr(e, n)
  return (
    Gp.has(n.tagName) &&
      (a = a.filter(function (s) {
        return typeof s == 'string' ? !Ap(s) : true
      })),
    Pl(e, o, l, n),
    gr(o, a),
    e.ancestors.pop(),
    (e.schema = r),
    e.create(n, l, o, t)
  )
}
function Zp(e, n) {
  if (n.data && n.data.estree && e.evaluater) {
    const r = n.data.estree.body[0]
    return (r.type, e.evaluater.evaluateExpression(r.expression))
  }
  Vt(e, n.position)
}
function ed(e, n) {
  if (n.data && n.data.estree && e.evaluater) return e.evaluater.evaluateProgram(n.data.estree)
  Vt(e, n.position)
}
function td(e, n, t) {
  const r = e.schema
  let i = r
  ;(n.name === 'svg' && r.space === 'html' && ((i = pr), (e.schema = i)), e.ancestors.push(n))
  const l = n.name === null ? e.Fragment : zl(e, n.name, true),
    o = ad(e, n),
    a = yr(e, n)
  return (Pl(e, o, l, n), gr(o, a), e.ancestors.pop(), (e.schema = r), e.create(n, l, o, t))
}
function nd(e, n, t) {
  const r = {}
  return (gr(r, yr(e, n)), e.create(n, e.Fragment, r, t))
}
function rd(e, n) {
  return n.value
}
function Pl(e, n, t, r) {
  typeof t != 'string' && t !== e.Fragment && e.passNode && (n.node = r)
}
function gr(e, n) {
  if (n.length > 0) {
    const t = n.length > 1 ? n : n[0]
    t && (e.children = t)
  }
}
function id(e, n, t) {
  return r
  function r(i, l, o, a) {
    const u = Array.isArray(o.children) ? t : n
    return a ? u(l, o, a) : u(l, o)
  }
}
function ld(e, n) {
  return t
  function t(r, i, l, o) {
    const a = Array.isArray(l.children),
      s = nr(r)
    return n(
      i,
      l,
      o,
      a,
      { columnNumber: s ? s.column - 1 : void 0, fileName: e, lineNumber: s ? s.line : void 0 },
      void 0
    )
  }
}
function od(e, n) {
  const t = {}
  let r, i
  for (i in n.properties)
    if (i !== 'children' && mr.call(n.properties, i)) {
      const l = sd(e, i, n.properties[i])
      if (l) {
        const [o, a] = l
        e.tableCellAlignToStyle && o === 'align' && typeof a == 'string' && Kp.has(n.tagName)
          ? (r = a)
          : (t[o] = a)
      }
    }
  if (r) {
    const l = t.style || (t.style = {})
    l[e.stylePropertyNameCase === 'css' ? 'text-align' : 'textAlign'] = r
  }
  return t
}
function ad(e, n) {
  const t = {}
  for (const r of n.attributes)
    if (r.type === 'mdxJsxExpressionAttribute')
      if (r.data && r.data.estree && e.evaluater) {
        const l = r.data.estree.body[0]
        l.type
        const o = l.expression
        o.type
        const a = o.properties[0]
        ;(a.type, Object.assign(t, e.evaluater.evaluateExpression(a.argument)))
      } else Vt(e, n.position)
    else {
      const i = r.name
      let l
      if (r.value && typeof r.value == 'object')
        if (r.value.data && r.value.data.estree && e.evaluater) {
          const a = r.value.data.estree.body[0]
          ;(a.type, (l = e.evaluater.evaluateExpression(a.expression)))
        } else Vt(e, n.position)
      else l = r.value === null ? true : r.value
      t[i] = l
    }
  return t
}
function yr(e, n) {
  const t = []
  let r = -1
  const i = e.passKeys ? /* @__PURE__ */ new Map() : Xp
  for (; ++r < n.children.length; ) {
    const l = n.children[r]
    let o
    if (e.passKeys) {
      const s =
        l.type === 'element'
          ? l.tagName
          : l.type === 'mdxJsxFlowElement' || l.type === 'mdxJsxTextElement'
            ? l.name
            : void 0
      if (s) {
        const u = i.get(s) || 0
        ;((o = s + '-' + u), i.set(s, u + 1))
      }
    }
    const a = Ll(e, l, o)
    a !== void 0 && t.push(a)
  }
  return t
}
function sd(e, n, t) {
  const r = Fp(e.schema, n)
  if (!(t == null || (typeof t == 'number' && Number.isNaN(t)))) {
    if ((Array.isArray(t) && (t = r.commaSeparated ? Cp(t) : $p(t)), r.property === 'style')) {
      let i = typeof t == 'object' ? t : ud(e, String(t))
      return (e.stylePropertyNameCase === 'css' && (i = cd(i)), ['style', i])
    }
    return [
      e.elementAttributeNameCase === 'react' && r.space
        ? Pp[r.property] || r.property
        : r.attribute,
      t,
    ]
  }
}
function ud(e, n) {
  try {
    return qp(n, { reactCompat: true })
  } catch (t) {
    if (e.ignoreInvalidStyle) return {}
    const r = t,
      i = new oe('Cannot parse `style` attribute', {
        ancestors: e.ancestors,
        cause: r,
        ruleId: 'style',
        source: 'hast-util-to-jsx-runtime',
      })
    throw ((i.file = e.filePath || void 0), (i.url = Ol + '#cannot-parse-style-attribute'), i)
  }
}
function zl(e, n, t) {
  let r
  if (!t) r = { type: 'Literal', value: n }
  else if (n.includes('.')) {
    const i = n.split('.')
    let l = -1,
      o
    for (; ++l < i.length; ) {
      const a = ml(i[l]) ? { type: 'Identifier', name: i[l] } : { type: 'Literal', value: i[l] }
      o = o
        ? {
            type: 'MemberExpression',
            object: o,
            property: a,
            computed: !!(l && a.type === 'Literal'),
            optional: false,
          }
        : a
    }
    r = o
  } else
    r = ml(n) && !/^[a-z]/.test(n) ? { type: 'Identifier', name: n } : { type: 'Literal', value: n }
  if (r.type === 'Literal') {
    const i = r.value
    return mr.call(e.components, i) ? e.components[i] : i
  }
  if (e.evaluater) return e.evaluater.evaluateExpression(r)
  Vt(e)
}
function Vt(e, n) {
  const t = new oe('Cannot handle MDX estrees without `createEvaluater`', {
    ancestors: e.ancestors,
    place: n,
    ruleId: 'mdx-estree',
    source: 'hast-util-to-jsx-runtime',
  })
  throw (
    (t.file = e.filePath || void 0),
    (t.url = Ol + '#cannot-handle-mdx-estrees-without-createevaluater'),
    t
  )
}
function cd(e) {
  const n = {}
  let t
  for (t in e) mr.call(e, t) && (n[hd(t)] = e[t])
  return n
}
function hd(e) {
  let n = e.replace(Yp, fd)
  return (n.slice(0, 3) === 'ms-' && (n = '-' + n), n)
}
function fd(e) {
  return '-' + e.toLowerCase()
}
function pd(e) {
  const n = this
  n.compiler = t
  function t(r, i) {
    return Qp(r, { filePath: i.path, ...e })
  }
}
const br = function (e) {
  if (e == null) return gd
  if (typeof e == 'string') return md(e)
  if (typeof e == 'object') return dd(e)
  if (typeof e == 'function') return kr(e)
  throw new Error('Expected function, string, or array as `test`')
}
function dd(e) {
  const n = []
  let t = -1
  for (; ++t < e.length; ) n[t] = br(e[t])
  return kr(r)
  function r(...i) {
    let l = -1
    for (; ++l < n.length; ) if (n[l].apply(this, i)) return true
    return false
  }
}
function md(e) {
  return kr(n)
  function n(t) {
    return t.tagName === e
  }
}
function kr(e) {
  return n
  function n(t, r, i) {
    return !!(yd(t) && e.call(this, t, typeof r == 'number' ? r : void 0, i || void 0))
  }
}
function gd(e) {
  return !!(
    e &&
    typeof e == 'object' &&
    'type' in e &&
    e.type === 'element' &&
    'tagName' in e &&
    typeof e.tagName == 'string'
  )
}
function yd(e) {
  return e !== null && typeof e == 'object' && 'type' in e && 'tagName' in e
}
const bd = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/,
  kd = /^[a-zA-Z]:\\/
function xd(e) {
  if (typeof e != 'string') throw new TypeError(`Expected a \`string\`, got \`${typeof e}\``)
  return kd.test(e) ? false : bd.test(e)
}
const wd = ['http', 'https'],
  Sd = ['nofollow'],
  Cd = {}
function vd(e) {
  const n = e || Cd,
    t = n.protocols || wd,
    r = br(n.test)
  return function (i) {
    Ue(i, 'element', function (l, o, a) {
      if (l.tagName === 'a' && typeof l.properties.href == 'string' && r(l, o, a)) {
        const s = l.properties.href
        if (xd(s) ? t.includes(s.slice(0, s.indexOf(':'))) : s.startsWith('//')) {
          const u = jt(n.content, l),
            h = u && !Array.isArray(u) ? [u] : u,
            c = jt(n.rel, l) || Sd,
            p = typeof c == 'string' ? Np(c) : c,
            f = jt(n.target, l),
            d = jt(n.properties, l)
          if (
            (d && Object.assign(l.properties, Ze(d)),
            p.length > 0 && (l.properties.rel = [...p]),
            f && (l.properties.target = f),
            h)
          ) {
            const b = jt(n.contentProperties, l) || {}
            l.children.push({
              type: 'element',
              tagName: 'span',
              properties: Ze(b),
              children: Ze(h),
            })
          }
        }
      }
    })
  }
}
function jt(e, n) {
  return typeof e == 'function' ? e(n) : e
}
;((window._vue_richtext_widgets ??= {}),
  (window._registerWidget ??= (e, n, t, r) => {
    Dl(e, n, t, r)
  }))
function Dl(e, n, t = () => {}, r) {
  const i = { hasInteractiveView: true, fullWidth: false, ...r }
  if (window._vue_richtext_widgets[e]) {
    qr.error(`[ReferencePicker]: Widget for id ${e} already registered`)
    return
  }
  window._vue_richtext_widgets[e] = { id: e, callback: n, onDestroy: t, ...i }
}
function _d(e, n) {
  const { richObjectType: t, richObject: r, accessible: i, interactive: l } = n
  if (t !== 'open-graph') {
    if (!window._vue_richtext_widgets[t]) {
      console.error('Widget for rich object type ' + t + ' not registered')
      return
    }
    window._vue_richtext_widgets[t].callback(e, {
      richObjectType: t,
      richObject: r,
      accessible: i,
      interactive: l,
    })
  }
}
function Ed(e, n) {
  e !== 'open-graph' &&
    window._vue_richtext_widgets[e] &&
    window._vue_richtext_widgets[e].onDestroy(n)
}
function Fl(e) {
  return !!window._vue_richtext_widgets[e]
}
function Id(e) {
  return !!window._vue_richtext_widgets[e]?.hasInteractiveView
}
function Ad(e) {
  return !!window._vue_richtext_widgets[e]?.fullWidth
}
;((window._vue_richtext_custom_picker_elements ??= {}),
  (window._registerCustomPickerElement ??= Td))
function Td(e, n, t = () => {}, r = 'large') {
  if (window._vue_richtext_custom_picker_elements[e]) {
    qr.error(`Custom reference picker element for id ${e} already registered`)
    return
  }
  window._vue_richtext_custom_picker_elements[e] = { id: e, callback: n, onDestroy: t, size: r }
}
;(Ne(qo),
  Ee('Any link'),
  Xo('core', 'filetypes/link.svg'),
  (window._vue_richtext_reference_providers ??= Tn('core', 'reference-provider-list', [])),
  (window._vue_richtext_reference_provider_timestamps ??= Tn(
    'core',
    'reference-provider-timestamps',
    {}
  )),
  Ne(Xr, Yo),
  Ne(Go))
const Od = 180 * 1e3,
  Ld = {
    name: 'NcReferenceWidget',
    components: { NcButton: Nr },
    props: {
      reference: { type: Object, required: true },
      interactive: { type: Boolean, default: true },
      interactiveOptIn: { type: Boolean, default: false },
    },
    setup() {
      const e = In(false),
        n = In(),
        { width: t } = na(n)
      return (
        ra(n, ([r]) => {
          ia(() => {
            e.value = r.isIntersecting
          })
        }),
        { width: t, isVisible: e, widgetRoot: n }
      )
    },
    data() {
      return { showInteractive: false, rendered: false, idleTimeout: null }
    },
    computed: {
      isInteractive() {
        return (!this.interactiveOptIn && this.interactive) || this.showInteractive
      },
      hasFullWidth() {
        return Ad(this.reference.richObjectType)
      },
      hasCustomWidget() {
        return Fl(this.reference.richObjectType)
      },
      hasInteractiveView() {
        return Fl(this.reference.richObjectType) && Id(this.reference.richObjectType)
      },
      noAccess() {
        return this.reference && !this.reference.accessible
      },
      descriptionStyle() {
        if (this.numberOfLines === 0) return { display: 'none' }
        const e = this.numberOfLines
        return { lineClamp: e, webkitLineClamp: e }
      },
      numberOfLines() {
        return [450, 550, 650, 1 / 0].findIndex((n) => this.width < n)
      },
      compactLink() {
        const e = this.reference.openGraphObject.link
        return e
          ? e.startsWith('https://')
            ? e.substring(8)
            : e.startsWith('http://')
              ? e.substring(7)
              : e
          : ''
      },
      route() {
        return Gr(this.$router, this.reference.openGraphObject.link)
      },
      referenceWidgetLinkComponent() {
        return this.route ? Yr : 'a'
      },
      referenceWidgetLinkProps() {
        return this.route
          ? { to: this.route }
          : { href: this.reference.openGraphObject.link, target: '_blank' }
      },
    },
    watch: {
      isVisible: {
        handler(e) {
          if (!e) {
            this.idleTimeout = setTimeout(() => {
              this.isVisible || this.destroyWidget()
            }, Od)
            return
          }
          ;(this.idleTimeout && (clearTimeout(this.idleTimeout), (this.idleTimeout = null)),
            this.rendered || this.renderWidget())
        },
        immediate: true,
      },
    },
    beforeUnmount() {
      this.destroyWidget()
    },
    methods: {
      t: Ee,
      enableInteractive() {
        ;((this.showInteractive = true), this.renderWidget())
      },
      renderWidget() {
        if (!this.$refs.customWidget || this?.reference?.richObjectType === 'open-graph') return
        this.$refs.customWidget.innerHTML = ''
        const e = document.createElement('div')
        ;((e.style = 'width: 100%;'),
          this.$refs.customWidget.appendChild(e),
          this.$nextTick(() => {
            ;(_d(e, { ...this.reference, interactive: this.isInteractive }), (this.rendered = true))
          }))
      },
      destroyWidget() {
        this.rendered && (Ed(this.reference.richObjectType, this.$el), (this.rendered = false))
      },
    },
  },
  Pd = ['src'],
  zd = { class: 'widget-default--details' },
  Dd = { class: 'widget-default--name' },
  Fd = { class: 'widget-default--link' }
function Rd(e, n, t, r, i, l) {
  const o = Ce('NcButton')
  return (
    I(),
    z(
      'div',
      {
        ref: 'widgetRoot',
        class: Me({ 'toggle-interactive': l.hasInteractiveView && !l.isInteractive }),
      },
      [
        t.reference && l.hasCustomWidget
          ? (I(),
            z(
              'div',
              {
                key: 0,
                ref: 'customWidget',
                class: Me(['widget-custom', { 'full-width': l.hasFullWidth }]),
              },
              null,
              2
            ))
          : !l.noAccess && t.reference && t.reference.openGraphObject && !l.hasCustomWidget
            ? (I(),
              Q(
                ct(l.referenceWidgetLinkComponent),
                te({ key: 1 }, l.referenceWidgetLinkProps, {
                  rel: 'noopener noreferrer',
                  class: 'widget-default',
                }),
                {
                  default: ie(() => [
                    t.reference.openGraphObject.thumb
                      ? (I(),
                        z(
                          'img',
                          {
                            key: 0,
                            class: 'widget-default--image',
                            src: t.reference.openGraphObject.thumb,
                          },
                          null,
                          8,
                          Pd
                        ))
                      : Y('', true),
                    W('div', zd, [
                      W('p', Dd, ee(t.reference.openGraphObject.name), 1),
                      W(
                        'p',
                        { class: 'widget-default--description', style: ta(l.descriptionStyle) },
                        ee(t.reference.openGraphObject.description),
                        5
                      ),
                      W('p', Fd, ee(l.compactLink), 1),
                    ]),
                  ]),
                  _: 1,
                },
                16
              ))
            : Y('', true),
        t.interactiveOptIn && l.hasInteractiveView && !l.isInteractive
          ? (I(),
            Q(
              o,
              { key: 2, class: 'toggle-interactive--button', onClick: l.enableInteractive },
              { default: ie(() => [at(ee(l.t('Enable interactive view')), 1)]), _: 1 },
              8,
              ['onClick']
            ))
          : Y('', true),
      ],
      2
    )
  )
}
const Bd = le(Ld, [
  ['render', Rd],
  ['__scopeId', 'data-v-8285b115'],
])
;(Ne(Ko), Ne(Jo, Xr, Qo), Ne(ea, Zo))
function Rl() {
  return (
    la('files_sharing', 'sharingToken', null) ??
    document.querySelector('input#sharingToken[type="hidden"]')?.value ??
    null
  )
}
function Bl(e, n) {
  const t = String(e)
  if (typeof n != 'string') throw new TypeError('Expected character')
  let r = 0,
    i = t.indexOf(n)
  for (; i !== -1; ) (r++, (i = t.indexOf(n, i + n.length)))
  return r
}
function Ey() {}
const Ht = mn(/[A-Za-z]/),
  xr = mn(/[\dA-Za-z]/)
function Md(e) {
  return e !== null && (e < 32 || e === 127)
}
function vt(e) {
  return e !== null && e < -2
}
function he(e) {
  return e !== null && (e < 0 || e === 32)
}
function $e(e) {
  return e === -2 || e === -1 || e === 32
}
const dn = mn(new RegExp('\\p{P}|\\p{S}', 'u')),
  tt = mn(/\s/)
function mn(e) {
  return n
  function n(t) {
    return t !== null && t > -1 && e.test(String.fromCharCode(t))
  }
}
function Nd(e) {
  if (typeof e != 'string') throw new TypeError('Expected a string')
  return e.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d')
}
const gn = function (e) {
  if (e == null) return Hd
  if (typeof e == 'function') return yn(e)
  if (typeof e == 'object') return Array.isArray(e) ? $d(e) : Vd(e)
  if (typeof e == 'string') return jd(e)
  throw new Error('Expected function, string, or object as test')
}
function $d(e) {
  const n = []
  let t = -1
  for (; ++t < e.length; ) n[t] = gn(e[t])
  return yn(r)
  function r(...i) {
    let l = -1
    for (; ++l < n.length; ) if (n[l].apply(this, i)) return true
    return false
  }
}
function Vd(e) {
  const n = e
  return yn(t)
  function t(r) {
    const i = r
    let l
    for (l in e) if (i[l] !== n[l]) return false
    return true
  }
}
function jd(e) {
  return yn(n)
  function n(t) {
    return t && t.type === e
  }
}
function yn(e) {
  return n
  function n(t, r, i) {
    return !!(Ud(t) && e.call(this, t, typeof r == 'number' ? r : void 0, i || void 0))
  }
}
function Hd() {
  return true
}
function Ud(e) {
  return e !== null && typeof e == 'object' && 'type' in e
}
function Iy(e) {
  return e
}
const Ml = [],
  Wd = true,
  Nl = false,
  qd = 'skip'
function Xd(e, n, t, r) {
  let i
  i = n
  const l = gn(i),
    o = 1
  a(e, void 0, [])()
  function a(s, u, h) {
    const c = s && typeof s == 'object' ? s : {}
    if (typeof c.type == 'string') {
      const f =
        typeof c.tagName == 'string' ? c.tagName : typeof c.name == 'string' ? c.name : void 0
      Object.defineProperty(p, 'name', {
        value: 'node (' + (s.type + (f ? '<' + f + '>' : '')) + ')',
      })
    }
    return p
    function p() {
      let f = Ml,
        d,
        b,
        S
      if (l(s, u, h[h.length - 1] || void 0) && ((f = Yd(t(s, h))), f[0] === Nl)) return f
      if ('children' in s && s.children) {
        const y = s
        if (y.children && f[0] !== qd)
          for (b = -1 + o, S = h.concat(y); b > -1 && b < y.children.length; ) {
            const v = y.children[b]
            if (((d = a(v, b, S)()), d[0] === Nl)) return d
            b = typeof d[1] == 'number' ? d[1] : b + o
          }
      }
      return f
    }
  }
}
function Yd(e) {
  return Array.isArray(e) ? e : typeof e == 'number' ? [Wd, e] : e == null ? Ml : [e]
}
function Gd(e, n, t) {
  const i = gn((t || {}).ignore || []),
    l = Kd(n)
  let o = -1
  for (; ++o < l.length; ) Xd(e, 'text', a)
  function a(u, h) {
    let c = -1,
      p
    for (; ++c < h.length; ) {
      const f = h[c],
        d = p ? p.children : void 0
      if (i(f, d ? d.indexOf(f) : void 0, p)) return
      p = f
    }
    if (p) return s(u, h)
  }
  function s(u, h) {
    const c = h[h.length - 1],
      p = l[o][0],
      f = l[o][1]
    let d = 0
    const S = c.children.indexOf(u)
    let y = false,
      v = []
    p.lastIndex = 0
    let C = p.exec(u.value)
    for (; C; ) {
      const P = C.index,
        F = { index: C.index, input: C.input, stack: [...h, u] }
      let x = f(...C, F)
      if (
        (typeof x == 'string' && (x = x.length > 0 ? { type: 'text', value: x } : void 0),
        x === false
          ? (p.lastIndex = P + 1)
          : (d !== P && v.push({ type: 'text', value: u.value.slice(d, P) }),
            Array.isArray(x) ? v.push(...x) : x && v.push(x),
            (d = P + C[0].length),
            (y = true)),
        !p.global)
      )
        break
      C = p.exec(u.value)
    }
    return (
      y
        ? (d < u.value.length && v.push({ type: 'text', value: u.value.slice(d) }),
          c.children.splice(S, 1, ...v))
        : (v = [u]),
      S + v.length
    )
  }
}
function Kd(e) {
  const n = []
  if (!Array.isArray(e)) throw new TypeError('Expected find and replace tuple or list of tuples')
  const t = !e[0] || Array.isArray(e[0]) ? e : [e]
  let r = -1
  for (; ++r < t.length; ) {
    const i = t[r]
    n.push([Qd(i[0]), Jd(i[1])])
  }
  return n
}
function Qd(e) {
  return typeof e == 'string' ? new RegExp(Nd(e), 'g') : e
}
function Jd(e) {
  return typeof e == 'function'
    ? e
    : function () {
        return e
      }
}
const wr = 'phrasing',
  Sr = ['autolink', 'link', 'image', 'label']
function Zd() {
  return {
    transforms: [om],
    enter: {
      literalAutolink: tm,
      literalAutolinkEmail: Cr,
      literalAutolinkHttp: Cr,
      literalAutolinkWww: Cr,
    },
    exit: {
      literalAutolink: lm,
      literalAutolinkEmail: im,
      literalAutolinkHttp: nm,
      literalAutolinkWww: rm,
    },
  }
}
function em() {
  return {
    unsafe: [
      {
        character: '@',
        before: '[+\\-.\\w]',
        after: '[\\-.\\w]',
        inConstruct: wr,
        notInConstruct: Sr,
      },
      { character: '.', before: '[Ww]', after: '[\\-.\\w]', inConstruct: wr, notInConstruct: Sr },
      { character: ':', before: '[ps]', after: '\\/', inConstruct: wr, notInConstruct: Sr },
    ],
  }
}
function tm(e) {
  this.enter({ type: 'link', title: null, url: '', children: [] }, e)
}
function Cr(e) {
  this.config.enter.autolinkProtocol.call(this, e)
}
function nm(e) {
  this.config.exit.autolinkProtocol.call(this, e)
}
function rm(e) {
  this.config.exit.data.call(this, e)
  const n = this.stack[this.stack.length - 1]
  ;(n.type, (n.url = 'http://' + this.sliceSerialize(e)))
}
function im(e) {
  this.config.exit.autolinkEmail.call(this, e)
}
function lm(e) {
  this.exit(e)
}
function om(e) {
  Gd(
    e,
    [
      [/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi, am],
      [/([-.\w+]+)@([-\w]+(?:\.[-\w]+)+)/g, sm],
    ],
    { ignore: ['link', 'linkReference'] }
  )
}
function am(e, n, t, r, i) {
  let l = ''
  if (!$l(i) || (/^w/i.test(n) && ((t = n + t), (n = ''), (l = 'http://')), !um(t))) return false
  const o = cm(t + r)
  if (!o[0]) return false
  const a = {
    type: 'link',
    title: null,
    url: l + n + o[0],
    children: [{ type: 'text', value: n + o[0] }],
  }
  return o[1] ? [a, { type: 'text', value: o[1] }] : a
}
function sm(e, n, t, r) {
  return !$l(r, true) || /[-\d_]$/.test(t)
    ? false
    : {
        type: 'link',
        title: null,
        url: 'mailto:' + n + '@' + t,
        children: [{ type: 'text', value: n + '@' + t }],
      }
}
function um(e) {
  const n = e.split('.')
  return !(
    n.length < 2 ||
    (n[n.length - 1] && (/_/.test(n[n.length - 1]) || !/[a-zA-Z\d]/.test(n[n.length - 1]))) ||
    (n[n.length - 2] && (/_/.test(n[n.length - 2]) || !/[a-zA-Z\d]/.test(n[n.length - 2])))
  )
}
function cm(e) {
  const n = /[!"&'),.:;<>?\]}]+$/.exec(e)
  if (!n) return [e, void 0]
  e = e.slice(0, n.index)
  let t = n[0],
    r = t.indexOf(')')
  const i = Bl(e, '(')
  let l = Bl(e, ')')
  for (; r !== -1 && i > l; )
    ((e += t.slice(0, r + 1)), (t = t.slice(r + 1)), (r = t.indexOf(')')), l++)
  return [e, t]
}
function $l(e, n) {
  const t = e.input.charCodeAt(e.index - 1)
  return (e.index === 0 || tt(t) || dn(t)) && (!n || t !== 47)
}
function Ut(e) {
  return e
    .replace(/[\t\n\r ]+/g, ' ')
    .replace(/^ | $/g, '')
    .toLowerCase()
    .toUpperCase()
}
Vl.peek = km
function hm() {
  this.buffer()
}
function fm(e) {
  this.enter({ type: 'footnoteReference', identifier: '', label: '' }, e)
}
function pm() {
  this.buffer()
}
function dm(e) {
  this.enter({ type: 'footnoteDefinition', identifier: '', label: '', children: [] }, e)
}
function mm(e) {
  const n = this.resume(),
    t = this.stack[this.stack.length - 1]
  ;(t.type, (t.identifier = Ut(this.sliceSerialize(e)).toLowerCase()), (t.label = n))
}
function gm(e) {
  this.exit(e)
}
function ym(e) {
  const n = this.resume(),
    t = this.stack[this.stack.length - 1]
  ;(t.type, (t.identifier = Ut(this.sliceSerialize(e)).toLowerCase()), (t.label = n))
}
function bm(e) {
  this.exit(e)
}
function km() {
  return '['
}
function Vl(e, n, t, r) {
  const i = t.createTracker(r)
  let l = i.move('[^')
  const o = t.enter('footnoteReference'),
    a = t.enter('reference')
  return (
    (l += i.move(t.safe(t.associationId(e), { after: ']', before: l }))),
    a(),
    o(),
    (l += i.move(']')),
    l
  )
}
function xm() {
  return {
    enter: {
      gfmFootnoteCallString: hm,
      gfmFootnoteCall: fm,
      gfmFootnoteDefinitionLabelString: pm,
      gfmFootnoteDefinition: dm,
    },
    exit: {
      gfmFootnoteCallString: mm,
      gfmFootnoteCall: gm,
      gfmFootnoteDefinitionLabelString: ym,
      gfmFootnoteDefinition: bm,
    },
  }
}
function wm(e) {
  let n = false
  return (
    e && e.firstLineBlank && (n = true),
    {
      handlers: { footnoteDefinition: t, footnoteReference: Vl },
      unsafe: [{ character: '[', inConstruct: ['label', 'phrasing', 'reference'] }],
    }
  )
  function t(r, i, l, o) {
    const a = l.createTracker(o)
    let s = a.move('[^')
    const u = l.enter('footnoteDefinition'),
      h = l.enter('label')
    return (
      (s += a.move(l.safe(l.associationId(r), { before: s, after: ']' }))),
      h(),
      (s += a.move(']:')),
      r.children &&
        r.children.length > 0 &&
        (a.shift(4),
        (s += a.move(
          (n
            ? `
`
            : ' ') + l.indentLines(l.containerFlow(r, a.current()), n ? jl : Sm)
        ))),
      u(),
      s
    )
  }
}
function Sm(e, n, t) {
  return n === 0 ? e : jl(e, n, t)
}
function jl(e, n, t) {
  return (t ? '' : '    ') + e
}
const Cm = [
  'autolink',
  'destinationLiteral',
  'destinationRaw',
  'reference',
  'titleQuote',
  'titleApostrophe',
]
Hl.peek = Am
function vm() {
  return { canContainEols: ['delete'], enter: { strikethrough: Em }, exit: { strikethrough: Im } }
}
function _m() {
  return {
    unsafe: [{ character: '~', inConstruct: 'phrasing', notInConstruct: Cm }],
    handlers: { delete: Hl },
  }
}
function Em(e) {
  this.enter({ type: 'delete', children: [] }, e)
}
function Im(e) {
  this.exit(e)
}
function Hl(e, n, t, r) {
  const i = t.createTracker(r),
    l = t.enter('strikethrough')
  let o = i.move('~~')
  return (
    (o += t.containerPhrasing(e, { ...i.current(), before: o, after: '~' })),
    (o += i.move('~~')),
    l(),
    o
  )
}
function Am() {
  return '~'
}
function Tm(e) {
  return e.length
}
function Om(e, n) {
  const t = n || {},
    r = (t.align || []).concat(),
    i = t.stringLength || Tm,
    l = [],
    o = [],
    a = [],
    s = []
  let u = 0,
    h = -1
  for (; ++h < e.length; ) {
    const b = [],
      S = []
    let y = -1
    for (e[h].length > u && (u = e[h].length); ++y < e[h].length; ) {
      const v = Lm(e[h][y])
      if (t.alignDelimiters !== false) {
        const C = i(v)
        ;((S[y] = C), (s[y] === void 0 || C > s[y]) && (s[y] = C))
      }
      b.push(v)
    }
    ;((o[h] = b), (a[h] = S))
  }
  let c = -1
  if (typeof r == 'object' && 'length' in r) for (; ++c < u; ) l[c] = Ul(r[c])
  else {
    const b = Ul(r)
    for (; ++c < u; ) l[c] = b
  }
  c = -1
  const p = [],
    f = []
  for (; ++c < u; ) {
    const b = l[c]
    let S = '',
      y = ''
    b === 99 ? ((S = ':'), (y = ':')) : b === 108 ? (S = ':') : b === 114 && (y = ':')
    let v = t.alignDelimiters === false ? 1 : Math.max(1, s[c] - S.length - y.length)
    const C = S + '-'.repeat(v) + y
    ;(t.alignDelimiters !== false &&
      ((v = S.length + v + y.length), v > s[c] && (s[c] = v), (f[c] = v)),
      (p[c] = C))
  }
  ;(o.splice(1, 0, p), a.splice(1, 0, f), (h = -1))
  const d = []
  for (; ++h < o.length; ) {
    const b = o[h],
      S = a[h]
    c = -1
    const y = []
    for (; ++c < u; ) {
      const v = b[c] || ''
      let C = '',
        P = ''
      if (t.alignDelimiters !== false) {
        const F = s[c] - (S[c] || 0),
          x = l[c]
        x === 114
          ? (C = ' '.repeat(F))
          : x === 99
            ? F % 2
              ? ((C = ' '.repeat(F / 2 + 0.5)), (P = ' '.repeat(F / 2 - 0.5)))
              : ((C = ' '.repeat(F / 2)), (P = C))
            : (P = ' '.repeat(F))
      }
      ;(t.delimiterStart !== false && !c && y.push('|'),
        t.padding !== false &&
          !(t.alignDelimiters === false && v === '') &&
          (t.delimiterStart !== false || c) &&
          y.push(' '),
        t.alignDelimiters !== false && y.push(C),
        y.push(v),
        t.alignDelimiters !== false && y.push(P),
        t.padding !== false && y.push(' '),
        (t.delimiterEnd !== false || c !== u - 1) && y.push('|'))
    }
    d.push(t.delimiterEnd === false ? y.join('').replace(/ +$/, '') : y.join(''))
  }
  return d.join(`
`)
}
function Lm(e) {
  return e == null ? '' : String(e)
}
function Ul(e) {
  const n = typeof e == 'string' ? e.codePointAt(0) : 0
  return n === 67 || n === 99 ? 99 : n === 76 || n === 108 ? 108 : n === 82 || n === 114 ? 114 : 0
}
function Pm(e, n, t, r) {
  const i = t.enter('blockquote'),
    l = t.createTracker(r)
  ;(l.move('> '), l.shift(2))
  const o = t.indentLines(t.containerFlow(e, l.current()), zm)
  return (i(), o)
}
function zm(e, n, t) {
  return '>' + (t ? '' : ' ') + e
}
function Dm(e, n) {
  return Wl(e, n.inConstruct, true) && !Wl(e, n.notInConstruct, false)
}
function Wl(e, n, t) {
  if ((typeof n == 'string' && (n = [n]), !n || n.length === 0)) return t
  let r = -1
  for (; ++r < n.length; ) if (e.includes(n[r])) return true
  return false
}
function ql(e, n, t, r) {
  let i = -1
  for (; ++i < t.unsafe.length; )
    if (
      t.unsafe[i].character ===
        `
` &&
      Dm(t.stack, t.unsafe[i])
    )
      return /[ \t]/.test(r.before) ? '' : ' '
  return `\\
`
}
function Fm(e, n) {
  const t = String(e)
  let r = t.indexOf(n),
    i = r,
    l = 0,
    o = 0
  if (typeof n != 'string') throw new TypeError('Expected substring')
  for (; r !== -1; )
    (r === i ? ++l > o && (o = l) : (l = 1), (i = r + n.length), (r = t.indexOf(n, i)))
  return o
}
function Rm(e, n) {
  return !!(
    n.options.fences === false &&
    e.value &&
    !e.lang &&
    /[^ \r\n]/.test(e.value) &&
    !/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(e.value)
  )
}
function Bm(e) {
  const n = e.options.fence || '`'
  if (n !== '`' && n !== '~')
    throw new Error(
      'Cannot serialize code with `' + n + '` for `options.fence`, expected `` ` `` or `~`'
    )
  return n
}
function Mm(e, n, t, r) {
  const i = Bm(t),
    l = e.value || '',
    o = i === '`' ? 'GraveAccent' : 'Tilde'
  if (Rm(e, t)) {
    const c = t.enter('codeIndented'),
      p = t.indentLines(l, Nm)
    return (c(), p)
  }
  const a = t.createTracker(r),
    s = i.repeat(Math.max(Fm(l, i) + 1, 3)),
    u = t.enter('codeFenced')
  let h = a.move(s)
  if (e.lang) {
    const c = t.enter(`codeFencedLang${o}`)
    ;((h += a.move(t.safe(e.lang, { before: h, after: ' ', encode: ['`'], ...a.current() }))), c())
  }
  if (e.lang && e.meta) {
    const c = t.enter(`codeFencedMeta${o}`)
    ;((h += a.move(' ')),
      (h += a.move(
        t.safe(e.meta, {
          before: h,
          after: `
`,
          encode: ['`'],
          ...a.current(),
        })
      )),
      c())
  }
  return (
    (h += a.move(`
`)),
    l &&
      (h += a.move(
        l +
          `
`
      )),
    (h += a.move(s)),
    u(),
    h
  )
}
function Nm(e, n, t) {
  return (t ? '' : '    ') + e
}
function vr(e) {
  const n = e.options.quote || '"'
  if (n !== '"' && n !== "'")
    throw new Error(
      'Cannot serialize title with `' + n + '` for `options.quote`, expected `"`, or `\'`'
    )
  return n
}
function $m(e, n, t, r) {
  const i = vr(t),
    l = i === '"' ? 'Quote' : 'Apostrophe',
    o = t.enter('definition')
  let a = t.enter('label')
  const s = t.createTracker(r)
  let u = s.move('[')
  return (
    (u += s.move(t.safe(t.associationId(e), { before: u, after: ']', ...s.current() }))),
    (u += s.move(']: ')),
    a(),
    !e.url || /[\0- \u007F]/.test(e.url)
      ? ((a = t.enter('destinationLiteral')),
        (u += s.move('<')),
        (u += s.move(t.safe(e.url, { before: u, after: '>', ...s.current() }))),
        (u += s.move('>')))
      : ((a = t.enter('destinationRaw')),
        (u += s.move(
          t.safe(e.url, {
            before: u,
            after: e.title
              ? ' '
              : `
`,
            ...s.current(),
          })
        ))),
    a(),
    e.title &&
      ((a = t.enter(`title${l}`)),
      (u += s.move(' ' + i)),
      (u += s.move(t.safe(e.title, { before: u, after: i, ...s.current() }))),
      (u += s.move(i)),
      a()),
    o(),
    u
  )
}
function Vm(e) {
  const n = e.options.emphasis || '*'
  if (n !== '*' && n !== '_')
    throw new Error(
      'Cannot serialize emphasis with `' + n + '` for `options.emphasis`, expected `*`, or `_`'
    )
  return n
}
function Wt(e) {
  return '&#x' + e.toString(16).toUpperCase() + ';'
}
function bn(e) {
  if (e === null || he(e) || tt(e)) return 1
  if (dn(e)) return 2
}
function kn(e, n, t) {
  const r = bn(e),
    i = bn(n)
  return r === void 0
    ? i === void 0
      ? t === '_'
        ? { inside: true, outside: true }
        : { inside: false, outside: false }
      : i === 1
        ? { inside: true, outside: true }
        : { inside: false, outside: true }
    : r === 1
      ? i === void 0
        ? { inside: false, outside: false }
        : i === 1
          ? { inside: true, outside: true }
          : { inside: false, outside: false }
      : i === void 0
        ? { inside: false, outside: false }
        : i === 1
          ? { inside: true, outside: false }
          : { inside: false, outside: false }
}
Xl.peek = jm
function Xl(e, n, t, r) {
  const i = Vm(t),
    l = t.enter('emphasis'),
    o = t.createTracker(r),
    a = o.move(i)
  let s = o.move(t.containerPhrasing(e, { after: i, before: a, ...o.current() }))
  const u = s.charCodeAt(0),
    h = kn(r.before.charCodeAt(r.before.length - 1), u, i)
  h.inside && (s = Wt(u) + s.slice(1))
  const c = s.charCodeAt(s.length - 1),
    p = kn(r.after.charCodeAt(0), c, i)
  p.inside && (s = s.slice(0, -1) + Wt(c))
  const f = o.move(i)
  return (
    l(),
    (t.attentionEncodeSurroundingInfo = { after: p.outside, before: h.outside }),
    a + s + f
  )
}
function jm(e, n, t) {
  return t.options.emphasis || '*'
}
const Hm = {}
function Yl(e, n) {
  const t = Hm,
    r = typeof t.includeImageAlt == 'boolean' ? t.includeImageAlt : true,
    i = typeof t.includeHtml == 'boolean' ? t.includeHtml : true
  return Gl(e, r, i)
}
function Gl(e, n, t) {
  if (Um(e)) {
    if ('value' in e) return e.type === 'html' && !t ? '' : e.value
    if (n && 'alt' in e && e.alt) return e.alt
    if ('children' in e) return Kl(e.children, n, t)
  }
  return Array.isArray(e) ? Kl(e, n, t) : ''
}
function Kl(e, n, t) {
  const r = []
  let i = -1
  for (; ++i < e.length; ) r[i] = Gl(e[i], n, t)
  return r.join('')
}
function Um(e) {
  return !!(e && typeof e == 'object')
}
function Wm(e, n) {
  let t = false
  return (
    Ue(e, function (r) {
      if (('value' in r && /\r?\n|\r/.test(r.value)) || r.type === 'break') return ((t = true), ua)
    }),
    !!((!e.depth || e.depth < 3) && Yl(e) && (n.options.setext || t))
  )
}
function qm(e, n, t, r) {
  const i = Math.max(Math.min(6, e.depth || 1), 1),
    l = t.createTracker(r)
  if (Wm(e, t)) {
    const h = t.enter('headingSetext'),
      c = t.enter('phrasing'),
      p = t.containerPhrasing(e, {
        ...l.current(),
        before: `
`,
        after: `
`,
      })
    return (
      c(),
      h(),
      p +
        `
` +
        (i === 1 ? '=' : '-').repeat(
          p.length -
            (Math.max(
              p.lastIndexOf('\r'),
              p.lastIndexOf(`
`)
            ) +
              1)
        )
    )
  }
  const o = '#'.repeat(i),
    a = t.enter('headingAtx'),
    s = t.enter('phrasing')
  l.move(o + ' ')
  let u = t.containerPhrasing(e, {
    before: '# ',
    after: `
`,
    ...l.current(),
  })
  return (
    /^[\t ]/.test(u) && (u = Wt(u.charCodeAt(0)) + u.slice(1)),
    (u = u ? o + ' ' + u : o),
    t.options.closeAtx && (u += ' ' + o),
    s(),
    a(),
    u
  )
}
Ql.peek = Xm
function Ql(e) {
  return e.value || ''
}
function Xm() {
  return '<'
}
Jl.peek = Ym
function Jl(e, n, t, r) {
  const i = vr(t),
    l = i === '"' ? 'Quote' : 'Apostrophe',
    o = t.enter('image')
  let a = t.enter('label')
  const s = t.createTracker(r)
  let u = s.move('![')
  return (
    (u += s.move(t.safe(e.alt, { before: u, after: ']', ...s.current() }))),
    (u += s.move('](')),
    a(),
    (!e.url && e.title) || /[\0- \u007F]/.test(e.url)
      ? ((a = t.enter('destinationLiteral')),
        (u += s.move('<')),
        (u += s.move(t.safe(e.url, { before: u, after: '>', ...s.current() }))),
        (u += s.move('>')))
      : ((a = t.enter('destinationRaw')),
        (u += s.move(t.safe(e.url, { before: u, after: e.title ? ' ' : ')', ...s.current() })))),
    a(),
    e.title &&
      ((a = t.enter(`title${l}`)),
      (u += s.move(' ' + i)),
      (u += s.move(t.safe(e.title, { before: u, after: i, ...s.current() }))),
      (u += s.move(i)),
      a()),
    (u += s.move(')')),
    o(),
    u
  )
}
function Ym() {
  return '!'
}
Zl.peek = Gm
function Zl(e, n, t, r) {
  const i = e.referenceType,
    l = t.enter('imageReference')
  let o = t.enter('label')
  const a = t.createTracker(r)
  let s = a.move('![')
  const u = t.safe(e.alt, { before: s, after: ']', ...a.current() })
  ;((s += a.move(u + '][')), o())
  const h = t.stack
  ;((t.stack = []), (o = t.enter('reference')))
  const c = t.safe(t.associationId(e), { before: s, after: ']', ...a.current() })
  return (
    o(),
    (t.stack = h),
    l(),
    i === 'full' || !u || u !== c
      ? (s += a.move(c + ']'))
      : i === 'shortcut'
        ? (s = s.slice(0, -1))
        : (s += a.move(']')),
    s
  )
}
function Gm() {
  return '!'
}
eo.peek = Km
function eo(e, n, t) {
  let r = e.value || '',
    i = '`',
    l = -1
  for (; new RegExp('(^|[^`])' + i + '([^`]|$)').test(r); ) i += '`'
  for (
    /[^ \r\n]/.test(r) &&
    ((/^[ \r\n]/.test(r) && /[ \r\n]$/.test(r)) || /^`|`$/.test(r)) &&
    (r = ' ' + r + ' ');
    ++l < t.unsafe.length;

  ) {
    const o = t.unsafe[l],
      a = t.compilePattern(o)
    let s
    if (o.atBreak)
      for (; (s = a.exec(r)); ) {
        let u = s.index
        ;(r.charCodeAt(u) === 10 && r.charCodeAt(u - 1) === 13 && u--,
          (r = r.slice(0, u) + ' ' + r.slice(s.index + 1)))
      }
  }
  return i + r + i
}
function Km() {
  return '`'
}
function to(e, n) {
  const t = Yl(e)
  return !!(
    !n.options.resourceLink &&
    e.url &&
    !e.title &&
    e.children &&
    e.children.length === 1 &&
    e.children[0].type === 'text' &&
    (t === e.url || 'mailto:' + t === e.url) &&
    /^[a-z][a-z+.-]+:/i.test(e.url) &&
    !/[\0- <>\u007F]/.test(e.url)
  )
}
no.peek = Qm
function no(e, n, t, r) {
  const i = vr(t),
    l = i === '"' ? 'Quote' : 'Apostrophe',
    o = t.createTracker(r)
  let a, s
  if (to(e, t)) {
    const h = t.stack
    ;((t.stack = []), (a = t.enter('autolink')))
    let c = o.move('<')
    return (
      (c += o.move(t.containerPhrasing(e, { before: c, after: '>', ...o.current() }))),
      (c += o.move('>')),
      a(),
      (t.stack = h),
      c
    )
  }
  ;((a = t.enter('link')), (s = t.enter('label')))
  let u = o.move('[')
  return (
    (u += o.move(t.containerPhrasing(e, { before: u, after: '](', ...o.current() }))),
    (u += o.move('](')),
    s(),
    (!e.url && e.title) || /[\0- \u007F]/.test(e.url)
      ? ((s = t.enter('destinationLiteral')),
        (u += o.move('<')),
        (u += o.move(t.safe(e.url, { before: u, after: '>', ...o.current() }))),
        (u += o.move('>')))
      : ((s = t.enter('destinationRaw')),
        (u += o.move(t.safe(e.url, { before: u, after: e.title ? ' ' : ')', ...o.current() })))),
    s(),
    e.title &&
      ((s = t.enter(`title${l}`)),
      (u += o.move(' ' + i)),
      (u += o.move(t.safe(e.title, { before: u, after: i, ...o.current() }))),
      (u += o.move(i)),
      s()),
    (u += o.move(')')),
    a(),
    u
  )
}
function Qm(e, n, t) {
  return to(e, t) ? '<' : '['
}
ro.peek = Jm
function ro(e, n, t, r) {
  const i = e.referenceType,
    l = t.enter('linkReference')
  let o = t.enter('label')
  const a = t.createTracker(r)
  let s = a.move('[')
  const u = t.containerPhrasing(e, { before: s, after: ']', ...a.current() })
  ;((s += a.move(u + '][')), o())
  const h = t.stack
  ;((t.stack = []), (o = t.enter('reference')))
  const c = t.safe(t.associationId(e), { before: s, after: ']', ...a.current() })
  return (
    o(),
    (t.stack = h),
    l(),
    i === 'full' || !u || u !== c
      ? (s += a.move(c + ']'))
      : i === 'shortcut'
        ? (s = s.slice(0, -1))
        : (s += a.move(']')),
    s
  )
}
function Jm() {
  return '['
}
function _r(e) {
  const n = e.options.bullet || '*'
  if (n !== '*' && n !== '+' && n !== '-')
    throw new Error(
      'Cannot serialize items with `' + n + '` for `options.bullet`, expected `*`, `+`, or `-`'
    )
  return n
}
function Zm(e) {
  const n = _r(e),
    t = e.options.bulletOther
  if (!t) return n === '*' ? '-' : '*'
  if (t !== '*' && t !== '+' && t !== '-')
    throw new Error(
      'Cannot serialize items with `' + t + '` for `options.bulletOther`, expected `*`, `+`, or `-`'
    )
  if (t === n)
    throw new Error(
      'Expected `bullet` (`' + n + '`) and `bulletOther` (`' + t + '`) to be different'
    )
  return t
}
function eg(e) {
  const n = e.options.bulletOrdered || '.'
  if (n !== '.' && n !== ')')
    throw new Error(
      'Cannot serialize items with `' + n + '` for `options.bulletOrdered`, expected `.` or `)`'
    )
  return n
}
function io(e) {
  const n = e.options.rule || '*'
  if (n !== '*' && n !== '-' && n !== '_')
    throw new Error(
      'Cannot serialize rules with `' + n + '` for `options.rule`, expected `*`, `-`, or `_`'
    )
  return n
}
function tg(e, n, t, r) {
  const i = t.enter('list'),
    l = t.bulletCurrent
  let o = e.ordered ? eg(t) : _r(t)
  const a = e.ordered ? (o === '.' ? ')' : '.') : Zm(t)
  let s = n && t.bulletLastUsed ? o === t.bulletLastUsed : false
  if (!e.ordered) {
    const h = e.children ? e.children[0] : void 0
    if (
      ((o === '*' || o === '-') &&
        h &&
        (!h.children || !h.children[0]) &&
        t.stack[t.stack.length - 1] === 'list' &&
        t.stack[t.stack.length - 2] === 'listItem' &&
        t.stack[t.stack.length - 3] === 'list' &&
        t.stack[t.stack.length - 4] === 'listItem' &&
        t.indexStack[t.indexStack.length - 1] === 0 &&
        t.indexStack[t.indexStack.length - 2] === 0 &&
        t.indexStack[t.indexStack.length - 3] === 0 &&
        (s = true),
      io(t) === o && h)
    ) {
      let c = -1
      for (; ++c < e.children.length; ) {
        const p = e.children[c]
        if (
          p &&
          p.type === 'listItem' &&
          p.children &&
          p.children[0] &&
          p.children[0].type === 'thematicBreak'
        ) {
          s = true
          break
        }
      }
    }
  }
  ;(s && (o = a), (t.bulletCurrent = o))
  const u = t.containerFlow(e, r)
  return ((t.bulletLastUsed = o), (t.bulletCurrent = l), i(), u)
}
function ng(e) {
  const n = e.options.listItemIndent || 'one'
  if (n !== 'tab' && n !== 'one' && n !== 'mixed')
    throw new Error(
      'Cannot serialize items with `' +
        n +
        '` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`'
    )
  return n
}
function rg(e, n, t, r) {
  const i = ng(t)
  let l = t.bulletCurrent || _r(t)
  n &&
    n.type === 'list' &&
    n.ordered &&
    (l =
      (typeof n.start == 'number' && n.start > -1 ? n.start : 1) +
      (t.options.incrementListMarker === false ? 0 : n.children.indexOf(e)) +
      l)
  let o = l.length + 1
  ;(i === 'tab' || (i === 'mixed' && ((n && n.type === 'list' && n.spread) || e.spread))) &&
    (o = Math.ceil(o / 4) * 4)
  const a = t.createTracker(r)
  ;(a.move(l + ' '.repeat(o - l.length)), a.shift(o))
  const s = t.enter('listItem'),
    u = t.indentLines(t.containerFlow(e, a.current()), h)
  return (s(), u)
  function h(c, p, f) {
    return p ? (f ? '' : ' '.repeat(o)) + c : (f ? l : l + ' '.repeat(o - l.length)) + c
  }
}
function ig(e, n, t, r) {
  const i = t.enter('paragraph'),
    l = t.enter('phrasing'),
    o = t.containerPhrasing(e, r)
  return (l(), i(), o)
}
const lg = gn([
  'break',
  'delete',
  'emphasis',
  'footnote',
  'footnoteReference',
  'image',
  'imageReference',
  'inlineCode',
  'inlineMath',
  'link',
  'linkReference',
  'mdxJsxTextElement',
  'mdxTextExpression',
  'strong',
  'text',
  'textDirective',
])
function og(e, n, t, r) {
  return (
    e.children.some(function (o) {
      return lg(o)
    })
      ? t.containerPhrasing
      : t.containerFlow
  ).call(t, e, r)
}
function ag(e) {
  const n = e.options.strong || '*'
  if (n !== '*' && n !== '_')
    throw new Error(
      'Cannot serialize strong with `' + n + '` for `options.strong`, expected `*`, or `_`'
    )
  return n
}
lo.peek = sg
function lo(e, n, t, r) {
  const i = ag(t),
    l = t.enter('strong'),
    o = t.createTracker(r),
    a = o.move(i + i)
  let s = o.move(t.containerPhrasing(e, { after: i, before: a, ...o.current() }))
  const u = s.charCodeAt(0),
    h = kn(r.before.charCodeAt(r.before.length - 1), u, i)
  h.inside && (s = Wt(u) + s.slice(1))
  const c = s.charCodeAt(s.length - 1),
    p = kn(r.after.charCodeAt(0), c, i)
  p.inside && (s = s.slice(0, -1) + Wt(c))
  const f = o.move(i + i)
  return (
    l(),
    (t.attentionEncodeSurroundingInfo = { after: p.outside, before: h.outside }),
    a + s + f
  )
}
function sg(e, n, t) {
  return t.options.strong || '*'
}
function ug(e, n, t, r) {
  return t.safe(e.value, r)
}
function cg(e) {
  const n = e.options.ruleRepetition || 3
  if (n < 3)
    throw new Error(
      'Cannot serialize rules with repetition `' +
        n +
        '` for `options.ruleRepetition`, expected `3` or more'
    )
  return n
}
function hg(e, n, t) {
  const r = (io(t) + (t.options.ruleSpaces ? ' ' : '')).repeat(cg(t))
  return t.options.ruleSpaces ? r.slice(0, -1) : r
}
const oo = {
  blockquote: Pm,
  break: ql,
  code: Mm,
  definition: $m,
  emphasis: Xl,
  hardBreak: ql,
  heading: qm,
  html: Ql,
  image: Jl,
  imageReference: Zl,
  inlineCode: eo,
  link: no,
  linkReference: ro,
  list: tg,
  listItem: rg,
  paragraph: ig,
  root: og,
  strong: lo,
  text: ug,
  thematicBreak: hg,
}
function fg() {
  return {
    enter: { table: pg, tableData: ao, tableHeader: ao, tableRow: mg },
    exit: { codeText: gg, table: dg, tableData: Er, tableHeader: Er, tableRow: Er },
  }
}
function pg(e) {
  const n = e._align
  ;(this.enter(
    {
      type: 'table',
      align: n.map(function (t) {
        return t === 'none' ? null : t
      }),
      children: [],
    },
    e
  ),
    (this.data.inTable = true))
}
function dg(e) {
  ;(this.exit(e), (this.data.inTable = void 0))
}
function mg(e) {
  this.enter({ type: 'tableRow', children: [] }, e)
}
function Er(e) {
  this.exit(e)
}
function ao(e) {
  this.enter({ type: 'tableCell', children: [] }, e)
}
function gg(e) {
  let n = this.resume()
  this.data.inTable && (n = n.replace(/\\([\\|])/g, yg))
  const t = this.stack[this.stack.length - 1]
  ;(t.type, (t.value = n), this.exit(e))
}
function yg(e, n) {
  return n === '|' ? n : e
}
function bg(e) {
  const n = e || {},
    t = n.tableCellPadding,
    r = n.tablePipeAlign,
    i = n.stringLength,
    l = t ? ' ' : '|'
  return {
    unsafe: [
      { character: '\r', inConstruct: 'tableCell' },
      {
        character: `
`,
        inConstruct: 'tableCell',
      },
      { atBreak: true, character: '|', after: '[	 :-]' },
      { character: '|', inConstruct: 'tableCell' },
      { atBreak: true, character: ':', after: '-' },
      { atBreak: true, character: '-', after: '[:|-]' },
    ],
    handlers: { inlineCode: p, table: o, tableCell: s, tableRow: a },
  }
  function o(f, d, b, S) {
    return u(h(f, b, S), f.align)
  }
  function a(f, d, b, S) {
    const y = c(f, b, S),
      v = u([y])
    return v.slice(
      0,
      v.indexOf(`
`)
    )
  }
  function s(f, d, b, S) {
    const y = b.enter('tableCell'),
      v = b.enter('phrasing'),
      C = b.containerPhrasing(f, { ...S, before: l, after: l })
    return (v(), y(), C)
  }
  function u(f, d) {
    return Om(f, { align: d, alignDelimiters: r, padding: t, stringLength: i })
  }
  function h(f, d, b) {
    const S = f.children
    let y = -1
    const v = [],
      C = d.enter('table')
    for (; ++y < S.length; ) v[y] = c(S[y], d, b)
    return (C(), v)
  }
  function c(f, d, b) {
    const S = f.children
    let y = -1
    const v = [],
      C = d.enter('tableRow')
    for (; ++y < S.length; ) v[y] = s(S[y], f, d, b)
    return (C(), v)
  }
  function p(f, d, b) {
    let S = oo.inlineCode(f, d, b)
    return (b.stack.includes('tableCell') && (S = S.replace(/\|/g, '\\$&')), S)
  }
}
function kg() {
  return { exit: { taskListCheckValueChecked: so, taskListCheckValueUnchecked: so, paragraph: wg } }
}
function xg() {
  return { unsafe: [{ atBreak: true, character: '-', after: '[:|-]' }], handlers: { listItem: Sg } }
}
function so(e) {
  const n = this.stack[this.stack.length - 2]
  ;(n.type, (n.checked = e.type === 'taskListCheckValueChecked'))
}
function wg(e) {
  const n = this.stack[this.stack.length - 2]
  if (n && n.type === 'listItem' && typeof n.checked == 'boolean') {
    const t = this.stack[this.stack.length - 1]
    t.type
    const r = t.children[0]
    if (r && r.type === 'text') {
      const i = n.children
      let l = -1,
        o
      for (; ++l < i.length; ) {
        const a = i[l]
        if (a.type === 'paragraph') {
          o = a
          break
        }
      }
      o === t &&
        ((r.value = r.value.slice(1)),
        r.value.length === 0
          ? t.children.shift()
          : t.position &&
            r.position &&
            typeof r.position.start.offset == 'number' &&
            (r.position.start.column++,
            r.position.start.offset++,
            (t.position.start = Object.assign({}, r.position.start))))
    }
  }
  this.exit(e)
}
function Sg(e, n, t, r) {
  const i = e.children[0],
    l = typeof e.checked == 'boolean' && i && i.type === 'paragraph',
    o = '[' + (e.checked ? 'x' : ' ') + '] ',
    a = t.createTracker(r)
  l && a.move(o)
  let s = oo.listItem(e, n, t, { ...r, ...a.current() })
  return (l && (s = s.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, u)), s)
  function u(h) {
    return h + o
  }
}
function Cg() {
  return [Zd(), xm(), vm(), fg(), kg()]
}
function vg(e) {
  return { extensions: [em(), wm(e), _m(), bg(e), xg()] }
}
function xn(e, n, t, r) {
  const i = e.length
  let l = 0,
    o
  if ((n < 0 ? (n = -n > i ? 0 : i + n) : (n = n > i ? i : n), (t = t > 0 ? t : 0), r.length < 1e4))
    ((o = Array.from(r)), o.unshift(n, t), e.splice(...o))
  else
    for (t && e.splice(n, t); l < r.length; )
      ((o = r.slice(l, l + 1e4)), o.unshift(n, 0), e.splice(...o), (l += 1e4), (n += 1e4))
}
const uo = {}.hasOwnProperty
function _g(e) {
  const n = {}
  let t = -1
  for (; ++t < e.length; ) Eg(n, e[t])
  return n
}
function Eg(e, n) {
  let t
  for (t in n) {
    const i = (uo.call(e, t) ? e[t] : void 0) || (e[t] = {}),
      l = n[t]
    let o
    if (l)
      for (o in l) {
        uo.call(i, o) || (i[o] = [])
        const a = l[o]
        Ig(i[o], Array.isArray(a) ? a : a ? [a] : [])
      }
  }
}
function Ig(e, n) {
  let t = -1
  const r = []
  for (; ++t < n.length; ) (n[t].add === 'after' ? e : r).push(n[t])
  xn(e, 0, 0, r)
}
const Ag = { tokenize: Dg, partial: true },
  co = { tokenize: Fg, partial: true },
  ho = { tokenize: Rg, partial: true },
  fo = { tokenize: Bg, partial: true },
  Tg = { tokenize: Mg, partial: true },
  po = { name: 'wwwAutolink', tokenize: Pg, previous: go },
  mo = { name: 'protocolAutolink', tokenize: zg, previous: yo },
  Ve = { name: 'emailAutolink', tokenize: Lg, previous: bo },
  ze = {}
function Og() {
  return { text: ze }
}
let nt = 48
for (; nt < 123; ) ((ze[nt] = Ve), nt++, nt === 58 ? (nt = 65) : nt === 91 && (nt = 97))
;((ze[43] = Ve),
  (ze[45] = Ve),
  (ze[46] = Ve),
  (ze[95] = Ve),
  (ze[72] = [Ve, mo]),
  (ze[104] = [Ve, mo]),
  (ze[87] = [Ve, po]),
  (ze[119] = [Ve, po]))
function Lg(e, n, t) {
  const r = this
  let i, l
  return o
  function o(c) {
    return !Ir(c) || !bo.call(r, r.previous) || Ar(r.events)
      ? t(c)
      : (e.enter('literalAutolink'), e.enter('literalAutolinkEmail'), a(c))
  }
  function a(c) {
    return Ir(c) ? (e.consume(c), a) : c === 64 ? (e.consume(c), s) : t(c)
  }
  function s(c) {
    return c === 46
      ? e.check(Tg, h, u)(c)
      : c === 45 || c === 95 || xr(c)
        ? ((l = true), e.consume(c), s)
        : h(c)
  }
  function u(c) {
    return (e.consume(c), (i = true), s)
  }
  function h(c) {
    return l && i && Ht(r.previous)
      ? (e.exit('literalAutolinkEmail'), e.exit('literalAutolink'), n(c))
      : t(c)
  }
}
function Pg(e, n, t) {
  const r = this
  return i
  function i(o) {
    return (o !== 87 && o !== 119) || !go.call(r, r.previous) || Ar(r.events)
      ? t(o)
      : (e.enter('literalAutolink'),
        e.enter('literalAutolinkWww'),
        e.check(Ag, e.attempt(co, e.attempt(ho, l), t), t)(o))
  }
  function l(o) {
    return (e.exit('literalAutolinkWww'), e.exit('literalAutolink'), n(o))
  }
}
function zg(e, n, t) {
  const r = this
  let i = '',
    l = false
  return o
  function o(c) {
    return (c === 72 || c === 104) && yo.call(r, r.previous) && !Ar(r.events)
      ? (e.enter('literalAutolink'),
        e.enter('literalAutolinkHttp'),
        (i += String.fromCodePoint(c)),
        e.consume(c),
        a)
      : t(c)
  }
  function a(c) {
    if (Ht(c) && i.length < 5) return ((i += String.fromCodePoint(c)), e.consume(c), a)
    if (c === 58) {
      const p = i.toLowerCase()
      if (p === 'http' || p === 'https') return (e.consume(c), s)
    }
    return t(c)
  }
  function s(c) {
    return c === 47 ? (e.consume(c), l ? u : ((l = true), s)) : t(c)
  }
  function u(c) {
    return c === null || Md(c) || he(c) || tt(c) || dn(c)
      ? t(c)
      : e.attempt(co, e.attempt(ho, h), t)(c)
  }
  function h(c) {
    return (e.exit('literalAutolinkHttp'), e.exit('literalAutolink'), n(c))
  }
}
function Dg(e, n, t) {
  let r = 0
  return i
  function i(o) {
    return (o === 87 || o === 119) && r < 3
      ? (r++, e.consume(o), i)
      : o === 46 && r === 3
        ? (e.consume(o), l)
        : t(o)
  }
  function l(o) {
    return o === null ? t(o) : n(o)
  }
}
function Fg(e, n, t) {
  let r, i, l
  return o
  function o(u) {
    return u === 46 || u === 95
      ? e.check(fo, s, a)(u)
      : u === null || he(u) || tt(u) || (u !== 45 && dn(u))
        ? s(u)
        : ((l = true), e.consume(u), o)
  }
  function a(u) {
    return (u === 95 ? (r = true) : ((i = r), (r = void 0)), e.consume(u), o)
  }
  function s(u) {
    return i || r || !l ? t(u) : n(u)
  }
}
function Rg(e, n) {
  let t = 0,
    r = 0
  return i
  function i(o) {
    return o === 40
      ? (t++, e.consume(o), i)
      : o === 41 && r < t
        ? l(o)
        : o === 33 ||
            o === 34 ||
            o === 38 ||
            o === 39 ||
            o === 41 ||
            o === 42 ||
            o === 44 ||
            o === 46 ||
            o === 58 ||
            o === 59 ||
            o === 60 ||
            o === 63 ||
            o === 93 ||
            o === 95 ||
            o === 126
          ? e.check(fo, n, l)(o)
          : o === null || he(o) || tt(o)
            ? n(o)
            : (e.consume(o), i)
  }
  function l(o) {
    return (o === 41 && r++, e.consume(o), i)
  }
}
function Bg(e, n, t) {
  return r
  function r(a) {
    return a === 33 ||
      a === 34 ||
      a === 39 ||
      a === 41 ||
      a === 42 ||
      a === 44 ||
      a === 46 ||
      a === 58 ||
      a === 59 ||
      a === 63 ||
      a === 95 ||
      a === 126
      ? (e.consume(a), r)
      : a === 38
        ? (e.consume(a), l)
        : a === 93
          ? (e.consume(a), i)
          : a === 60 || a === null || he(a) || tt(a)
            ? n(a)
            : t(a)
  }
  function i(a) {
    return a === null || a === 40 || a === 91 || he(a) || tt(a) ? n(a) : r(a)
  }
  function l(a) {
    return Ht(a) ? o(a) : t(a)
  }
  function o(a) {
    return a === 59 ? (e.consume(a), r) : Ht(a) ? (e.consume(a), o) : t(a)
  }
}
function Mg(e, n, t) {
  return r
  function r(l) {
    return (e.consume(l), i)
  }
  function i(l) {
    return xr(l) ? t(l) : n(l)
  }
}
function go(e) {
  return (
    e === null || e === 40 || e === 42 || e === 95 || e === 91 || e === 93 || e === 126 || he(e)
  )
}
function yo(e) {
  return !Ht(e)
}
function bo(e) {
  return !(e === 47 || Ir(e))
}
function Ir(e) {
  return e === 43 || e === 45 || e === 46 || e === 95 || xr(e)
}
function Ar(e) {
  let n = e.length,
    t = false
  for (; n--; ) {
    const r = e[n][1]
    if ((r.type === 'labelLink' || r.type === 'labelImage') && !r._balanced) {
      t = true
      break
    }
    if (r._gfmAutolinkLiteralWalkedInto) {
      t = false
      break
    }
  }
  return (e.length > 0 && !t && (e[e.length - 1][1]._gfmAutolinkLiteralWalkedInto = true), t)
}
function Ng(e, n, t) {
  const r = []
  let i = -1
  for (; ++i < e.length; ) {
    const l = e[i].resolveAll
    l && !r.includes(l) && ((n = l(n, t)), r.push(l))
  }
  return n
}
function je(e, n, t, r) {
  const i = r ? r - 1 : Number.POSITIVE_INFINITY
  let l = 0
  return o
  function o(s) {
    return $e(s) ? (e.enter(t), a(s)) : n(s)
  }
  function a(s) {
    return $e(s) && l++ < i ? (e.consume(s), a) : (e.exit(t), n(s))
  }
}
const $g = { partial: true, tokenize: Vg }
function Vg(e, n, t) {
  return r
  function r(l) {
    return $e(l) ? je(e, i, 'linePrefix')(l) : i(l)
  }
  function i(l) {
    return l === null || vt(l) ? n(l) : t(l)
  }
}
const jg = { tokenize: Kg, partial: true }
function Hg() {
  return {
    document: {
      91: { name: 'gfmFootnoteDefinition', tokenize: Xg, continuation: { tokenize: Yg }, exit: Gg },
    },
    text: {
      91: { name: 'gfmFootnoteCall', tokenize: qg },
      93: { name: 'gfmPotentialFootnoteCall', add: 'after', tokenize: Ug, resolveTo: Wg },
    },
  }
}
function Ug(e, n, t) {
  const r = this
  let i = r.events.length
  const l = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = [])
  let o
  for (; i--; ) {
    const s = r.events[i][1]
    if (s.type === 'labelImage') {
      o = s
      break
    }
    if (
      s.type === 'gfmFootnoteCall' ||
      s.type === 'labelLink' ||
      s.type === 'label' ||
      s.type === 'image' ||
      s.type === 'link'
    )
      break
  }
  return a
  function a(s) {
    if (!o || !o._balanced) return t(s)
    const u = Ut(r.sliceSerialize({ start: o.end, end: r.now() }))
    return u.codePointAt(0) !== 94 || !l.includes(u.slice(1))
      ? t(s)
      : (e.enter('gfmFootnoteCallLabelMarker'),
        e.consume(s),
        e.exit('gfmFootnoteCallLabelMarker'),
        n(s))
  }
}
function Wg(e, n) {
  let t = e.length
  for (; t--; )
    if (e[t][1].type === 'labelImage' && e[t][0] === 'enter') {
      e[t][1]
      break
    }
  ;((e[t + 1][1].type = 'data'), (e[t + 3][1].type = 'gfmFootnoteCallLabelMarker'))
  const r = {
      type: 'gfmFootnoteCall',
      start: Object.assign({}, e[t + 3][1].start),
      end: Object.assign({}, e[e.length - 1][1].end),
    },
    i = {
      type: 'gfmFootnoteCallMarker',
      start: Object.assign({}, e[t + 3][1].end),
      end: Object.assign({}, e[t + 3][1].end),
    }
  ;(i.end.column++, i.end.offset++, i.end._bufferIndex++)
  const l = {
      type: 'gfmFootnoteCallString',
      start: Object.assign({}, i.end),
      end: Object.assign({}, e[e.length - 1][1].start),
    },
    o = {
      type: 'chunkString',
      contentType: 'string',
      start: Object.assign({}, l.start),
      end: Object.assign({}, l.end),
    },
    a = [
      e[t + 1],
      e[t + 2],
      ['enter', r, n],
      e[t + 3],
      e[t + 4],
      ['enter', i, n],
      ['exit', i, n],
      ['enter', l, n],
      ['enter', o, n],
      ['exit', o, n],
      ['exit', l, n],
      e[e.length - 2],
      e[e.length - 1],
      ['exit', r, n],
    ]
  return (e.splice(t, e.length - t + 1, ...a), e)
}
function qg(e, n, t) {
  const r = this,
    i = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = [])
  let l = 0,
    o
  return a
  function a(c) {
    return (
      e.enter('gfmFootnoteCall'),
      e.enter('gfmFootnoteCallLabelMarker'),
      e.consume(c),
      e.exit('gfmFootnoteCallLabelMarker'),
      s
    )
  }
  function s(c) {
    return c !== 94
      ? t(c)
      : (e.enter('gfmFootnoteCallMarker'),
        e.consume(c),
        e.exit('gfmFootnoteCallMarker'),
        e.enter('gfmFootnoteCallString'),
        (e.enter('chunkString').contentType = 'string'),
        u)
  }
  function u(c) {
    if (l > 999 || (c === 93 && !o) || c === null || c === 91 || he(c)) return t(c)
    if (c === 93) {
      e.exit('chunkString')
      const p = e.exit('gfmFootnoteCallString')
      return i.includes(Ut(r.sliceSerialize(p)))
        ? (e.enter('gfmFootnoteCallLabelMarker'),
          e.consume(c),
          e.exit('gfmFootnoteCallLabelMarker'),
          e.exit('gfmFootnoteCall'),
          n)
        : t(c)
    }
    return (he(c) || (o = true), l++, e.consume(c), c === 92 ? h : u)
  }
  function h(c) {
    return c === 91 || c === 92 || c === 93 ? (e.consume(c), l++, u) : u(c)
  }
}
function Xg(e, n, t) {
  const r = this,
    i = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = [])
  let l,
    o = 0,
    a
  return s
  function s(d) {
    return (
      (e.enter('gfmFootnoteDefinition')._container = true),
      e.enter('gfmFootnoteDefinitionLabel'),
      e.enter('gfmFootnoteDefinitionLabelMarker'),
      e.consume(d),
      e.exit('gfmFootnoteDefinitionLabelMarker'),
      u
    )
  }
  function u(d) {
    return d === 94
      ? (e.enter('gfmFootnoteDefinitionMarker'),
        e.consume(d),
        e.exit('gfmFootnoteDefinitionMarker'),
        e.enter('gfmFootnoteDefinitionLabelString'),
        (e.enter('chunkString').contentType = 'string'),
        h)
      : t(d)
  }
  function h(d) {
    if (o > 999 || (d === 93 && !a) || d === null || d === 91 || he(d)) return t(d)
    if (d === 93) {
      e.exit('chunkString')
      const b = e.exit('gfmFootnoteDefinitionLabelString')
      return (
        (l = Ut(r.sliceSerialize(b))),
        e.enter('gfmFootnoteDefinitionLabelMarker'),
        e.consume(d),
        e.exit('gfmFootnoteDefinitionLabelMarker'),
        e.exit('gfmFootnoteDefinitionLabel'),
        p
      )
    }
    return (he(d) || (a = true), o++, e.consume(d), d === 92 ? c : h)
  }
  function c(d) {
    return d === 91 || d === 92 || d === 93 ? (e.consume(d), o++, h) : h(d)
  }
  function p(d) {
    return d === 58
      ? (e.enter('definitionMarker'),
        e.consume(d),
        e.exit('definitionMarker'),
        i.includes(l) || i.push(l),
        je(e, f, 'gfmFootnoteDefinitionWhitespace'))
      : t(d)
  }
  function f(d) {
    return n(d)
  }
}
function Yg(e, n, t) {
  return e.check($g, n, e.attempt(jg, n, t))
}
function Gg(e) {
  e.exit('gfmFootnoteDefinition')
}
function Kg(e, n, t) {
  const r = this
  return je(e, i, 'gfmFootnoteDefinitionIndent', 5)
  function i(l) {
    const o = r.events[r.events.length - 1]
    return o &&
      o[1].type === 'gfmFootnoteDefinitionIndent' &&
      o[2].sliceSerialize(o[1], true).length === 4
      ? n(l)
      : t(l)
  }
}
function Qg(e) {
  let t = (e || {}).singleTilde
  const r = { name: 'strikethrough', tokenize: l, resolveAll: i }
  return (
    t == null && (t = true),
    { text: { 126: r }, insideSpan: { null: [r] }, attentionMarkers: { null: [126] } }
  )
  function i(o, a) {
    let s = -1
    for (; ++s < o.length; )
      if (
        o[s][0] === 'enter' &&
        o[s][1].type === 'strikethroughSequenceTemporary' &&
        o[s][1]._close
      ) {
        let u = s
        for (; u--; )
          if (
            o[u][0] === 'exit' &&
            o[u][1].type === 'strikethroughSequenceTemporary' &&
            o[u][1]._open &&
            o[s][1].end.offset - o[s][1].start.offset === o[u][1].end.offset - o[u][1].start.offset
          ) {
            ;((o[s][1].type = 'strikethroughSequence'), (o[u][1].type = 'strikethroughSequence'))
            const h = {
                type: 'strikethrough',
                start: Object.assign({}, o[u][1].start),
                end: Object.assign({}, o[s][1].end),
              },
              c = {
                type: 'strikethroughText',
                start: Object.assign({}, o[u][1].end),
                end: Object.assign({}, o[s][1].start),
              },
              p = [
                ['enter', h, a],
                ['enter', o[u][1], a],
                ['exit', o[u][1], a],
                ['enter', c, a],
              ],
              f = a.parser.constructs.insideSpan.null
            ;(f && xn(p, p.length, 0, Ng(f, o.slice(u + 1, s), a)),
              xn(p, p.length, 0, [
                ['exit', c, a],
                ['enter', o[s][1], a],
                ['exit', o[s][1], a],
                ['exit', h, a],
              ]),
              xn(o, u - 1, s - u + 3, p),
              (s = u + p.length - 2))
            break
          }
      }
    for (s = -1; ++s < o.length; )
      o[s][1].type === 'strikethroughSequenceTemporary' && (o[s][1].type = 'data')
    return o
  }
  function l(o, a, s) {
    const u = this.previous,
      h = this.events
    let c = 0
    return p
    function p(d) {
      return u === 126 && h[h.length - 1][1].type !== 'characterEscape'
        ? s(d)
        : (o.enter('strikethroughSequenceTemporary'), f(d))
    }
    function f(d) {
      const b = bn(u)
      if (d === 126) return c > 1 ? s(d) : (o.consume(d), c++, f)
      if (c < 2 && !t) return s(d)
      const S = o.exit('strikethroughSequenceTemporary'),
        y = bn(d)
      return ((S._open = !y || (y === 2 && !!b)), (S._close = !b || (b === 2 && !!y)), a(d))
    }
  }
}
class Jg {
  constructor() {
    this.map = []
  }
  add(n, t, r) {
    Zg(this, n, t, r)
  }
  consume(n) {
    if (
      (this.map.sort(function (l, o) {
        return l[0] - o[0]
      }),
      this.map.length === 0)
    )
      return
    let t = this.map.length
    const r = []
    for (; t > 0; )
      ((t -= 1),
        r.push(n.slice(this.map[t][0] + this.map[t][1]), this.map[t][2]),
        (n.length = this.map[t][0]))
    ;(r.push(n.slice()), (n.length = 0))
    let i = r.pop()
    for (; i; ) {
      for (const l of i) n.push(l)
      i = r.pop()
    }
    this.map.length = 0
  }
}
function Zg(e, n, t, r) {
  let i = 0
  if (!(t === 0 && r.length === 0)) {
    for (; i < e.map.length; ) {
      if (e.map[i][0] === n) {
        ;((e.map[i][1] += t), e.map[i][2].push(...r))
        return
      }
      i += 1
    }
    e.map.push([n, t, r])
  }
}
function ey(e, n) {
  let t = false
  const r = []
  for (; n < e.length; ) {
    const i = e[n]
    if (t) {
      if (i[0] === 'enter')
        i[1].type === 'tableContent' &&
          r.push(e[n + 1][1].type === 'tableDelimiterMarker' ? 'left' : 'none')
      else if (i[1].type === 'tableContent') {
        if (e[n - 1][1].type === 'tableDelimiterMarker') {
          const l = r.length - 1
          r[l] = r[l] === 'left' ? 'center' : 'right'
        }
      } else if (i[1].type === 'tableDelimiterRow') break
    } else i[0] === 'enter' && i[1].type === 'tableDelimiterRow' && (t = true)
    n += 1
  }
  return r
}
function ty() {
  return { flow: { null: { name: 'table', tokenize: ny, resolveAll: ry } } }
}
function ny(e, n, t) {
  const r = this
  let i = 0,
    l = 0,
    o
  return a
  function a(k) {
    let T = r.events.length - 1
    for (; T > -1; ) {
      const A = r.events[T][1].type
      if (A === 'lineEnding' || A === 'linePrefix') T--
      else break
    }
    const O = T > -1 ? r.events[T][1].type : null,
      L = O === 'tableHead' || O === 'tableRow' ? x : s
    return L === x && r.parser.lazy[r.now().line] ? t(k) : L(k)
  }
  function s(k) {
    return (e.enter('tableHead'), e.enter('tableRow'), u(k))
  }
  function u(k) {
    return (k === 124 || ((o = true), (l += 1)), h(k))
  }
  function h(k) {
    return k === null
      ? t(k)
      : vt(k)
        ? l > 1
          ? ((l = 0),
            (r.interrupt = true),
            e.exit('tableRow'),
            e.enter('lineEnding'),
            e.consume(k),
            e.exit('lineEnding'),
            f)
          : t(k)
        : $e(k)
          ? je(e, h, 'whitespace')(k)
          : ((l += 1),
            o && ((o = false), (i += 1)),
            k === 124
              ? (e.enter('tableCellDivider'),
                e.consume(k),
                e.exit('tableCellDivider'),
                (o = true),
                h)
              : (e.enter('data'), c(k)))
  }
  function c(k) {
    return k === null || k === 124 || he(k)
      ? (e.exit('data'), h(k))
      : (e.consume(k), k === 92 ? p : c)
  }
  function p(k) {
    return k === 92 || k === 124 ? (e.consume(k), c) : c(k)
  }
  function f(k) {
    return (
      (r.interrupt = false),
      r.parser.lazy[r.now().line]
        ? t(k)
        : (e.enter('tableDelimiterRow'),
          (o = false),
          $e(k)
            ? je(
                e,
                d,
                'linePrefix',
                r.parser.constructs.disable.null.includes('codeIndented') ? void 0 : 4
              )(k)
            : d(k))
    )
  }
  function d(k) {
    return k === 45 || k === 58
      ? S(k)
      : k === 124
        ? ((o = true), e.enter('tableCellDivider'), e.consume(k), e.exit('tableCellDivider'), b)
        : F(k)
  }
  function b(k) {
    return $e(k) ? je(e, S, 'whitespace')(k) : S(k)
  }
  function S(k) {
    return k === 58
      ? ((l += 1),
        (o = true),
        e.enter('tableDelimiterMarker'),
        e.consume(k),
        e.exit('tableDelimiterMarker'),
        y)
      : k === 45
        ? ((l += 1), y(k))
        : k === null || vt(k)
          ? P(k)
          : F(k)
  }
  function y(k) {
    return k === 45 ? (e.enter('tableDelimiterFiller'), v(k)) : F(k)
  }
  function v(k) {
    return k === 45
      ? (e.consume(k), v)
      : k === 58
        ? ((o = true),
          e.exit('tableDelimiterFiller'),
          e.enter('tableDelimiterMarker'),
          e.consume(k),
          e.exit('tableDelimiterMarker'),
          C)
        : (e.exit('tableDelimiterFiller'), C(k))
  }
  function C(k) {
    return $e(k) ? je(e, P, 'whitespace')(k) : P(k)
  }
  function P(k) {
    return k === 124
      ? d(k)
      : k === null || vt(k)
        ? !o || i !== l
          ? F(k)
          : (e.exit('tableDelimiterRow'), e.exit('tableHead'), n(k))
        : F(k)
  }
  function F(k) {
    return t(k)
  }
  function x(k) {
    return (e.enter('tableRow'), B(k))
  }
  function B(k) {
    return k === 124
      ? (e.enter('tableCellDivider'), e.consume(k), e.exit('tableCellDivider'), B)
      : k === null || vt(k)
        ? (e.exit('tableRow'), n(k))
        : $e(k)
          ? je(e, B, 'whitespace')(k)
          : (e.enter('data'), H(k))
  }
  function H(k) {
    return k === null || k === 124 || he(k)
      ? (e.exit('data'), B(k))
      : (e.consume(k), k === 92 ? V : H)
  }
  function V(k) {
    return k === 92 || k === 124 ? (e.consume(k), H) : H(k)
  }
}
function ry(e, n) {
  let t = -1,
    r = true,
    i = 0,
    l = [0, 0, 0, 0],
    o = [0, 0, 0, 0],
    a = false,
    s = 0,
    u,
    h,
    c
  const p = new Jg()
  for (; ++t < e.length; ) {
    const f = e[t],
      d = f[1]
    f[0] === 'enter'
      ? d.type === 'tableHead'
        ? ((a = false),
          s !== 0 && (ko(p, n, s, u, h), (h = void 0), (s = 0)),
          (u = { type: 'table', start: Object.assign({}, d.start), end: Object.assign({}, d.end) }),
          p.add(t, 0, [['enter', u, n]]))
        : d.type === 'tableRow' || d.type === 'tableDelimiterRow'
          ? ((r = true),
            (c = void 0),
            (l = [0, 0, 0, 0]),
            (o = [0, t + 1, 0, 0]),
            a &&
              ((a = false),
              (h = {
                type: 'tableBody',
                start: Object.assign({}, d.start),
                end: Object.assign({}, d.end),
              }),
              p.add(t, 0, [['enter', h, n]])),
            (i = d.type === 'tableDelimiterRow' ? 2 : h ? 3 : 1))
          : i &&
              (d.type === 'data' ||
                d.type === 'tableDelimiterMarker' ||
                d.type === 'tableDelimiterFiller')
            ? ((r = false),
              o[2] === 0 &&
                (l[1] !== 0 && ((o[0] = o[1]), (c = wn(p, n, l, i, void 0, c)), (l = [0, 0, 0, 0])),
                (o[2] = t)))
            : d.type === 'tableCellDivider' &&
              (r
                ? (r = false)
                : (l[1] !== 0 && ((o[0] = o[1]), (c = wn(p, n, l, i, void 0, c))),
                  (l = o),
                  (o = [l[1], t, 0, 0])))
      : d.type === 'tableHead'
        ? ((a = true), (s = t))
        : d.type === 'tableRow' || d.type === 'tableDelimiterRow'
          ? ((s = t),
            l[1] !== 0
              ? ((o[0] = o[1]), (c = wn(p, n, l, i, t, c)))
              : o[1] !== 0 && (c = wn(p, n, o, i, t, c)),
            (i = 0))
          : i &&
            (d.type === 'data' ||
              d.type === 'tableDelimiterMarker' ||
              d.type === 'tableDelimiterFiller') &&
            (o[3] = t)
  }
  for (s !== 0 && ko(p, n, s, u, h), p.consume(n.events), t = -1; ++t < n.events.length; ) {
    const f = n.events[t]
    f[0] === 'enter' && f[1].type === 'table' && (f[1]._align = ey(n.events, t))
  }
  return e
}
function wn(e, n, t, r, i, l) {
  const o = r === 1 ? 'tableHeader' : r === 2 ? 'tableDelimiter' : 'tableData',
    a = 'tableContent'
  t[0] !== 0 && ((l.end = Object.assign({}, _t(n.events, t[0]))), e.add(t[0], 0, [['exit', l, n]]))
  const s = _t(n.events, t[1])
  if (
    ((l = { type: o, start: Object.assign({}, s), end: Object.assign({}, s) }),
    e.add(t[1], 0, [['enter', l, n]]),
    t[2] !== 0)
  ) {
    const u = _t(n.events, t[2]),
      h = _t(n.events, t[3]),
      c = { type: a, start: Object.assign({}, u), end: Object.assign({}, h) }
    if ((e.add(t[2], 0, [['enter', c, n]]), r !== 2)) {
      const p = n.events[t[2]],
        f = n.events[t[3]]
      if (
        ((p[1].end = Object.assign({}, f[1].end)),
        (p[1].type = 'chunkText'),
        (p[1].contentType = 'text'),
        t[3] > t[2] + 1)
      ) {
        const d = t[2] + 1,
          b = t[3] - t[2] - 1
        e.add(d, b, [])
      }
    }
    e.add(t[3] + 1, 0, [['exit', c, n]])
  }
  return (
    i !== void 0 &&
      ((l.end = Object.assign({}, _t(n.events, i))), e.add(i, 0, [['exit', l, n]]), (l = void 0)),
    l
  )
}
function ko(e, n, t, r, i) {
  const l = [],
    o = _t(n.events, t)
  ;(i && ((i.end = Object.assign({}, o)), l.push(['exit', i, n])),
    (r.end = Object.assign({}, o)),
    l.push(['exit', r, n]),
    e.add(t + 1, 0, l))
}
function _t(e, n) {
  const t = e[n],
    r = t[0] === 'enter' ? 'start' : 'end'
  return t[1][r]
}
const iy = { name: 'tasklistCheck', tokenize: oy }
function ly() {
  return { text: { 91: iy } }
}
function oy(e, n, t) {
  const r = this
  return i
  function i(s) {
    return r.previous !== null || !r._gfmTasklistFirstContentOfListItem
      ? t(s)
      : (e.enter('taskListCheck'),
        e.enter('taskListCheckMarker'),
        e.consume(s),
        e.exit('taskListCheckMarker'),
        l)
  }
  function l(s) {
    return he(s)
      ? (e.enter('taskListCheckValueUnchecked'),
        e.consume(s),
        e.exit('taskListCheckValueUnchecked'),
        o)
      : s === 88 || s === 120
        ? (e.enter('taskListCheckValueChecked'),
          e.consume(s),
          e.exit('taskListCheckValueChecked'),
          o)
        : t(s)
  }
  function o(s) {
    return s === 93
      ? (e.enter('taskListCheckMarker'),
        e.consume(s),
        e.exit('taskListCheckMarker'),
        e.exit('taskListCheck'),
        a)
      : t(s)
  }
  function a(s) {
    return vt(s) ? n(s) : $e(s) ? e.check({ tokenize: ay }, n, t)(s) : t(s)
  }
}
function ay(e, n, t) {
  return je(e, r, 'whitespace')
  function r(i) {
    return i === null ? t(i) : n(i)
  }
}
function sy(e) {
  return _g([Og(), Hg(), Qg(e), ty(), ly()])
}
const uy = {}
function cy(e) {
  const n = this,
    t = e || uy,
    r = n.data(),
    i = r.micromarkExtensions || (r.micromarkExtensions = []),
    l = r.fromMarkdownExtensions || (r.fromMarkdownExtensions = []),
    o = r.toMarkdownExtensions || (r.toMarkdownExtensions = [])
  ;(i.push(sy(t)), l.push(Cg()), o.push(vg(t)))
}
const hy = {
  name: 'NcReferenceList',
  components: { NcReferenceWidget: Bd },
  props: {
    text: { type: String, default: '' },
    referenceData: { type: Array, default: null },
    limit: { type: Number, default: 1 },
    displayFallback: { type: Boolean, default: false },
    interactive: { type: Boolean, default: true },
    interactiveOptIn: { type: Boolean, default: false },
  },
  emits: ['loaded'],
  data() {
    return { references: null, loading: true }
  },
  computed: {
    isVisible() {
      return this.loading || this.displayedReferences.length !== 0
    },
    values() {
      return this.referenceData
        ? this.referenceData
        : this.displayFallback && !this.loading && !this.references
          ? [this.fallbackReference]
          : this.references
            ? Object.values(this.references)
            : []
    },
    firstReference() {
      return this.values[0] ?? null
    },
    displayedReferences() {
      return this.values.slice(0, this.limit)
    },
    fallbackReference() {
      return {
        accessible: true,
        openGraphObject: { id: this.text, link: this.text, name: this.text },
        richObjectType: 'open-graph',
      }
    },
  },
  watch: { text: 'fetch' },
  mounted() {
    this.fetch()
  },
  methods: {
    fetch() {
      if (((this.loading = true), this.referenceData)) {
        ;((this.references = null), (this.loading = false))
        return
      }
      if (!new RegExp(Kr).exec(this.text)) {
        ;((this.references = null), (this.loading = false))
        return
      }
      this.resolve()
        .then((e) => {
          ;((this.references = e.data.ocs.data.references),
            (this.loading = false),
            this.$emit('loaded'))
        })
        .catch((e) => {
          ;(console.error('Failed to extract references', e),
            (this.loading = false),
            this.$emit('loaded'))
        })
    },
    resolve() {
      const e = new RegExp(Kr).exec(this.text.trim()),
        n = sa() === null
      return this.limit === 1 && e
        ? n
          ? en.get(
              tn('references/resolvePublic') +
                `?reference=${encodeURIComponent(e[0])}&sharingToken=${Rl()}`
            )
          : en.get(tn('references/resolve') + `?reference=${encodeURIComponent(e[0])}`)
        : n
          ? en.post(tn('references/extractPublic'), {
              text: this.text,
              resolve: true,
              limit: this.limit,
              sharingToken: Rl(),
            })
          : en.post(tn('references/extract'), { text: this.text, resolve: true, limit: this.limit })
    },
  },
}
function fy(e, n, t, r, i, l) {
  const o = Ce('NcReferenceWidget')
  return l.isVisible
    ? (I(),
      z(
        'div',
        { key: 0, class: Me(['widgets--list', { 'icon-loading': i.loading }]) },
        [
          (I(true),
          z(
            Kt,
            null,
            Qt(
              l.displayedReferences,
              (a) => (
                I(),
                Q(
                  o,
                  {
                    key: a?.openGraphObject?.id,
                    reference: a,
                    interactive: t.interactive,
                    'interactive-opt-in': t.interactiveOptIn,
                  },
                  null,
                  8,
                  ['reference', 'interactive', 'interactive-opt-in']
                )
              )
            ),
            128
          )),
        ],
        2
      ))
    : Y('', true)
}
const Tr = le(hy, [
  ['render', fy],
  ['__scopeId', 'data-v-8e70b916'],
])
function py(e) {
  return ['text', 'code', 'inlineCode'].includes(e.type)
}
const dy = function () {
  return function (e) {
    Ue(
      e,
      py,
      (n, t, r) => (
        r.children.splice(t, 1, {
          ...n,
          value: n.value.replace(/&lt;/gim, '<').replace(/&gt;/gim, '>'),
        }),
        [ca, t + 1]
      )
    )
  }
}
function my(e) {
  return e.type === 'text'
}
const gy = function (e) {
    Ue(e, my, n)
    function n(t, r, i) {
      const l = t.value.split(/(\{[a-z\-_.0-9]+\})/gi).map((o) => {
        const a = o.match(/^\{([a-z\-_.0-9]+)\}$/i)
        if (!a) return Qr('text', o)
        const [, s] = a
        return Qr('element', { tagName: `#${s}`, children: [] })
      })
      i.children.splice(r, 1, ...l)
    }
  },
  yy = () => gy,
  by = ['http', 'https', 'mailto', 'tel'],
  Or = In(null)
async function ky() {
  const e = await Zr(
    () => import('./index-qlWzETOt.chunk.mjs'),
    true ? __vite__mapDeps([0, 1]) : void 0,
    import.meta.url
  )
  Or.value = e.default
}
const xy = {
    name: 'NcRichText',
    components: { NcReferenceList: Tr },
    props: {
      text: { type: String, default: '' },
      arguments: { type: Object, default: () => ({}) },
      referenceLimit: { type: Number, default: 0 },
      referenceInteractive: { type: Boolean, default: true },
      referenceInteractiveOptIn: { type: Boolean, default: false },
      references: { type: Array, default: null },
      useMarkdown: { type: Boolean, default: false },
      useExtendedMarkdown: { type: Boolean, default: false },
      interactive: { type: Boolean, default: false },
      autolink: { type: Boolean, default: true },
    },
    emits: ['interactTodo'],
    data() {
      return { parentId: st() }
    },
    methods: {
      renderPlaintext() {
        const e = this.text.split(/(\{[a-z\-_.0-9]+\})/gi).map((n) => {
          const t = n.match(/^\{([a-z\-_.0-9]+)\}$/i)
          if (!t) return this.prepareTextNode(n)
          const r = t[1],
            i = this.arguments[r]
          if (typeof i == 'object') {
            const { component: l, props: o } = i
            return K(typeof l == 'string' ? Ce(l) : l, { ...o, class: 'rich-text--component' })
          }
          return i ? K('span', { class: 'rich-text--fallback' }, i) : n
        })
        return K('div', { class: 'rich-text--wrapper' }, [
          K('div', {}, e.flat()),
          this.referenceLimit > 0
            ? K('div', { class: 'rich-text--reference-widget' }, [
                K(Tr, {
                  text: this.text,
                  referenceData: this.references,
                  interactive: this.referenceInteractive,
                  interactiveOptIn: this.referenceInteractiveOptIn,
                }),
              ])
            : null,
        ])
      },
      renderMarkdown() {
        const e = mc()
          .use(_f)
          .use(aa, {
            autolink: this.autolink,
            useMarkdown: this.useMarkdown,
            useExtendedMarkdown: this.useExtendedMarkdown,
          })
          .use(dy)
          .use(this.useExtendedMarkdown ? cy : void 0)
          .use(zf)
          .use(Ff, { except: by })
          .use(Sp, {
            handlers: {
              component(n, t) {
                return n(t, t.component, { value: t.value })
              },
            },
          })
          .use(this.useExtendedMarkdown ? Or.value : void 0)
          .use(yy)
          .use(vd, { target: '_blank', rel: ['noopener noreferrer'] })
          .use(pd, {
            Fragment: Kt,
            jsx: this.createElement,
            jsxs: this.createElement,
            elementAttributeNameCase: 'html',
            prefix: false,
          })
          .processSync(
            this.text.replace(/<[^>]+>/g, (n) => n.replace(/</g, '&lt;')).replace(/&gt;/gim, '>')
          ).result
        return K('div', { class: 'rich-text--wrapper rich-text--wrapper-markdown' }, [
          e,
          this.referenceLimit > 0
            ? K('div', { class: 'rich-text--reference-widget' }, [
                K(Tr, {
                  text: this.text,
                  referenceData: this.references,
                  interactive: this.referenceInteractive,
                  interactiveOptIn: this.referenceInteractiveOptIn,
                }),
              ])
            : null,
        ])
      },
      prepareTextNode(e) {
        return (
          this.autolink && (e = oa(e)),
          Array.isArray(e)
            ? e.map((n) => {
                if (typeof n == 'string') return n
                const { component: t, props: r } = n,
                  i = t.name === 'NcLink' ? void 0 : 'rich-text--component'
                return K(t, { ...r, class: i })
              })
            : e
        )
      },
      createElement(e, n, t) {
        t && (n.key = t)
        const r = n.children ?? []
        if ((delete n.children, !String(e).startsWith('#'))) {
          let l = null
          if (
            this.useExtendedMarkdown &&
            (String(e) === 'code' && !Or.value && n?.class?.includes('language') && ky(),
            String(e) === 'li' &&
              Array.isArray(r) &&
              r[0].type === 'input' &&
              r[0].props.type === 'checkbox')
          ) {
            const [o, , ...a] = r,
              s = a.findIndex((p) => ['ul', 'ol', 'li', 'blockquote', 'pre'].includes(p.type))
            s !== -1 && ((l = a[s]), a.splice(s))
            const u = this.parentId + '-markdown-input-' + st(),
              h = { ...o.props }
            delete h.checked
            const c = K(
              ri,
              {
                ...h,
                modelValue: o.props.checked,
                id: u,
                disabled: !this.interactive,
                'onUpdate:modelValue': () => {
                  this.$emit('interactTodo', u)
                },
              },
              { default: () => a }
            )
            return K(e, n, [c, l])
          }
          if (String(e) === 'a') {
            const o = Gr(this.$router, n.href)
            if (o)
              return (delete n.href, delete n.target, K(Yr, { ...n, to: o }, { default: () => r }))
          }
          return K(e, n, r)
        }
        const i = this.arguments[e.slice(1)]
        return i
          ? i.component
            ? K(
                typeof i.component == 'string' ? Ce(i.component) : i.component,
                { ...n, ...i.props, class: 'rich-text--component' },
                { default: () => r }
              )
            : K('span', { ...n }, [i])
          : K('span', { ...n, class: 'rich-text--fallback' }, [`{${e.slice(1)}}`])
      },
    },
    render() {
      return this.useMarkdown || this.useExtendedMarkdown
        ? this.renderMarkdown()
        : this.renderPlaintext()
    },
  },
  wy = le(xy, [['__scopeId', 'data-v-19dbe6da']])
export {
  ei as C,
  ri as N,
  wi as _,
  An as a,
  Ku as b,
  br as c,
  wy as d,
  Ea as e,
  Zr as f,
  Tn as l,
  Dl as r,
}
//# sourceMappingURL=NcRichText-G8kzsdwx-DWCeYxXp.chunk.mjs.map
