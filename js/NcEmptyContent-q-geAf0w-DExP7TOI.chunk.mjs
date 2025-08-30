(function() {
  "use strict";
  try {
    if (typeof document != "undefined") {
      var elementStyle = document.createElement("style");
      elementStyle.appendChild(document.createTextNode('/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/*\n* Ensure proper alignment of the vue material icons\n*/\n.material-design-icon[data-v-12a5aabf] {\n  display: flex;\n  align-self: center;\n  justify-self: center;\n  align-items: center;\n  justify-content: center;\n}\n.modal-mask[data-v-12a5aabf] {\n  position: fixed;\n  z-index: 9998;\n  top: 0;\n  inset-inline-start: 0;\n  display: block;\n  width: 100%;\n  height: 100%;\n  --backdrop-color: 0, 0, 0;\n  background-color: rgba(var(--backdrop-color), 0.5);\n}\n.modal-mask[data-v-12a5aabf], .modal-mask[data-v-12a5aabf] * {\n  box-sizing: border-box;\n}\n.modal-mask--opaque[data-v-12a5aabf] {\n  background-color: rgba(var(--backdrop-color), 0.92);\n}\n.modal-mask--light[data-v-12a5aabf] {\n  --backdrop-color: 255, 255, 255;\n}\n.modal-header[data-v-12a5aabf] {\n  position: absolute;\n  z-index: 10001;\n  top: 0;\n  inset-inline: 0 0;\n  display: flex !important;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: var(--header-height);\n  overflow: hidden;\n  transition: opacity 250ms, visibility 250ms;\n}\n.modal-header__name[data-v-12a5aabf] {\n  overflow-x: hidden;\n  width: 100%;\n  padding: 0 calc(var(--default-clickable-area) * 3) 0 12px;\n  transition: padding ease 100ms;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  font-size: 16px;\n  margin-block: 0;\n}\n@media only screen and (min-width: 1024px) {\n.modal-header__name[data-v-12a5aabf] {\n    padding-inline-start: calc(var(--default-clickable-area) * 3);\n    text-align: center;\n}\n}\n.modal-header .icons-menu[data-v-12a5aabf] {\n  position: absolute;\n  inset-inline-end: 0;\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n}\n.modal-header .icons-menu .header-close[data-v-12a5aabf] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: calc((var(--header-height) - var(--default-clickable-area)) / 2);\n  padding: 0;\n}\n.modal-header .icons-menu .play-pause-icons[data-v-12a5aabf] {\n  position: relative;\n  width: var(--header-height);\n  height: var(--header-height);\n  margin: 0;\n  padding: 0;\n  cursor: pointer;\n  border: none;\n  background-color: transparent;\n}\n.modal-header .icons-menu .play-pause-icons:hover .play-pause-icons__play[data-v-12a5aabf],\n.modal-header .icons-menu .play-pause-icons:hover .play-pause-icons__pause[data-v-12a5aabf], .modal-header .icons-menu .play-pause-icons:focus .play-pause-icons__play[data-v-12a5aabf],\n.modal-header .icons-menu .play-pause-icons:focus .play-pause-icons__pause[data-v-12a5aabf] {\n  opacity: 1;\n  border-radius: calc(var(--default-clickable-area) / 2);\n  background-color: rgba(127, 127, 127, 0.25);\n}\n.modal-header .icons-menu .play-pause-icons__play[data-v-12a5aabf], .modal-header .icons-menu .play-pause-icons__pause[data-v-12a5aabf] {\n  width: var(--default-clickable-area);\n  height: var(--default-clickable-area);\n  margin: calc((var(--header-height) - var(--default-clickable-area)) / 2);\n  cursor: pointer;\n  opacity: 0.7;\n}\n.modal-header .icons-menu[data-v-12a5aabf]  .action-item {\n  margin: calc((var(--header-height) - var(--default-clickable-area)) / 2);\n}\n.modal-header .icons-menu[data-v-12a5aabf]  .action-item--single {\n  width: var(--default-clickable-area);\n  height: var(--default-clickable-area);\n  cursor: pointer;\n  background-position: center;\n  background-size: 22px;\n}\n.modal-header .icons-menu .header-actions[data-v-12a5aabf] button:focus-visible {\n  box-shadow: none !important;\n  outline: 2px solid #fff !important;\n}\n.modal-header .icons-menu[data-v-12a5aabf] .action-item__menutoggle {\n  padding: 0;\n}\n.modal-header .icons-menu[data-v-12a5aabf] .action-item__menutoggle span, .modal-header .icons-menu[data-v-12a5aabf] .action-item__menutoggle svg {\n  width: var(--icon-size);\n  height: var(--icon-size);\n}\n.modal-wrapper[data-v-12a5aabf] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  /* Navigation buttons */\n  /* Content */\n}\n.modal-wrapper .prev[data-v-12a5aabf],\n.modal-wrapper .next[data-v-12a5aabf] {\n  z-index: 10000;\n  height: 35vh;\n  min-height: 300px;\n  position: absolute;\n  transition: opacity 250ms;\n  color: white;\n}\n.modal-wrapper .prev[data-v-12a5aabf]:focus-visible,\n.modal-wrapper .next[data-v-12a5aabf]:focus-visible {\n  box-shadow: 0 0 0 2px var(--color-primary-element-text);\n  background-color: var(--color-box-shadow);\n}\n.modal-wrapper .prev[data-v-12a5aabf] {\n  inset-inline-start: 2px;\n}\n.modal-wrapper .next[data-v-12a5aabf] {\n  inset-inline-end: 2px;\n}\n.modal-wrapper .modal-container[data-v-12a5aabf] {\n  position: relative;\n  display: flex;\n  padding: 0;\n  transition: transform 300ms ease;\n  border-radius: var(--border-radius-container);\n  background-color: var(--color-main-background);\n  color: var(--color-main-text);\n  box-shadow: 0 0 40px rgba(0, 0, 0, 0.2);\n}\n.modal-wrapper .modal-container__close[data-v-12a5aabf] {\n  z-index: 1;\n  position: absolute;\n  top: 4px;\n  inset-inline-end: var(--default-grid-baseline);\n}\n.modal-wrapper .modal-container__content[data-v-12a5aabf] {\n  width: 100%;\n  min-height: 52px;\n  overflow: auto;\n}\n.modal-wrapper--small > .modal-container[data-v-12a5aabf] {\n  width: 400px;\n  max-width: 90%;\n  max-height: min(90%, 100% - 2 * var(--header-height));\n}\n.modal-wrapper--normal > .modal-container[data-v-12a5aabf] {\n  max-width: 90%;\n  width: 600px;\n  max-height: min(90%, 100% - 2 * var(--header-height));\n}\n.modal-wrapper--large > .modal-container[data-v-12a5aabf] {\n  max-width: 90%;\n  width: 900px;\n  max-height: min(90%, 100% - 2 * var(--header-height));\n}\n.modal-wrapper--full > .modal-container[data-v-12a5aabf] {\n  width: 100%;\n  height: calc(100% - var(--header-height));\n  position: absolute;\n  top: var(--header-height);\n  border-radius: 0;\n}\n@media only screen and ((max-width: 512px) or (max-height: 400px)) {\n.modal-wrapper .modal-container[data-v-12a5aabf] {\n    max-width: initial;\n    width: 100%;\n    max-height: initial;\n    height: calc(100% - var(--header-height));\n    position: absolute;\n    top: var(--header-height);\n    border-radius: 0;\n}\n}\n\n/* TRANSITIONS */\n.fade-enter-active[data-v-12a5aabf],\n.fade-leave-active[data-v-12a5aabf] {\n  transition: opacity 250ms;\n}\n.fade-enter-from[data-v-12a5aabf],\n.fade-leave-to[data-v-12a5aabf] {\n  opacity: 0;\n}\n.fade-visibility-enter-from[data-v-12a5aabf],\n.fade-visibility-leave-to[data-v-12a5aabf] {\n  visibility: hidden;\n  opacity: 0;\n}\n.modal-in-enter-active[data-v-12a5aabf],\n.modal-in-leave-active[data-v-12a5aabf],\n.modal-out-enter-active[data-v-12a5aabf],\n.modal-out-leave-active[data-v-12a5aabf] {\n  transition: opacity 250ms;\n}\n.modal-in-enter-from[data-v-12a5aabf],\n.modal-in-leave-to[data-v-12a5aabf],\n.modal-out-enter-from[data-v-12a5aabf],\n.modal-out-leave-to[data-v-12a5aabf] {\n  opacity: 0;\n}\n.modal-in-enter .modal-container[data-v-12a5aabf],\n.modal-in-leave-to .modal-container[data-v-12a5aabf] {\n  transform: scale(0.9);\n}\n.modal-out-enter .modal-container[data-v-12a5aabf],\n.modal-out-leave-to .modal-container[data-v-12a5aabf] {\n  transform: scale(1.1);\n}\n.modal-mask .play-pause-icons .progress-ring[data-v-12a5aabf] {\n  position: absolute;\n  top: 0;\n  inset-inline-start: 0;\n  transform: rotate(-90deg);\n}\n.modal-mask .play-pause-icons .progress-ring .progress-ring__circle[data-v-12a5aabf] {\n  transition: 100ms stroke-dashoffset;\n  transform-origin: 50% 50%;\n  animation: progressring-12a5aabf linear var(--slideshow-duration) infinite;\n  stroke-linecap: round;\n  stroke-dashoffset: 94.2477796077;\n  stroke-dasharray: 94.2477796077;\n}\n.modal-mask .play-pause-icons--paused .icon-pause[data-v-12a5aabf] {\n  animation: breath-12a5aabf 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;\n}\n.modal-mask .play-pause-icons--paused .progress-ring__circle[data-v-12a5aabf] {\n  animation-play-state: paused !important;\n}\n@keyframes progressring-12a5aabf {\nfrom {\n    stroke-dashoffset: 94.2477796077;\n}\nto {\n    stroke-dashoffset: 0;\n}\n}\n@keyframes breath-12a5aabf {\n0% {\n    opacity: 1;\n}\n50% {\n    opacity: 0;\n}\n100% {\n    opacity: 1;\n}\n}/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/*\n* Ensure proper alignment of the vue material icons\n*/\n.material-design-icon[data-v-da9c53d9] {\n  display: flex;\n  align-self: center;\n  justify-self: center;\n  align-items: center;\n  justify-content: center;\n}\n.action-items[data-v-da9c53d9] {\n  display: flex;\n  align-items: center;\n  gap: calc((var(--default-clickable-area) - 16px) / 2 / 2);\n}\n.action-item[data-v-da9c53d9] {\n  --open-background-color: var(--color-background-hover, $action-background-hover);\n  position: relative;\n  display: inline-block;\n}\n.action-item.action-item--primary[data-v-da9c53d9] {\n  --open-background-color: var(--color-primary-element-hover);\n}\n.action-item.action-item--secondary[data-v-da9c53d9] {\n  --open-background-color: var(--color-primary-element-light-hover);\n}\n.action-item.action-item--error[data-v-da9c53d9] {\n  --open-background-color: var(--color-error-hover);\n}\n.action-item.action-item--warning[data-v-da9c53d9] {\n  --open-background-color: var(--color-warning-hover);\n}\n.action-item.action-item--success[data-v-da9c53d9] {\n  --open-background-color: var(--color-success-hover);\n}\n.action-item.action-item--tertiary-no-background[data-v-da9c53d9] {\n  --open-background-color: transparent;\n}\n.action-item.action-item--open .action-item__menutoggle[data-v-da9c53d9] {\n  background-color: var(--open-background-color);\n}\n.action-item__menutoggle__icon[data-v-da9c53d9] {\n  width: 20px;\n  height: 20px;\n  object-fit: contain;\n}/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/*\n* Ensure proper alignment of the vue material icons\n*/\n.material-design-icon {\n  display: flex;\n  align-self: center;\n  justify-self: center;\n  align-items: center;\n  justify-content: center;\n}\n.v-popper--theme-dropdown.v-popper__popper.action-item__popper .v-popper__wrapper {\n  border-radius: var(--border-radius-element);\n}\n.v-popper--theme-dropdown.v-popper__popper.action-item__popper .v-popper__wrapper .v-popper__inner {\n  border-radius: var(--border-radius-element);\n  padding: 4px;\n  max-height: calc(100vh - var(--header-height));\n  overflow: auto;\n}/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/*\n* Ensure proper alignment of the vue material icons\n*/\n.material-design-icon[data-v-e2fd60a6] {\n  display: flex;\n  align-self: center;\n  justify-self: center;\n  align-items: center;\n  justify-content: center;\n}\n.button-vue[data-v-e2fd60a6] {\n  --button-size: var(--default-clickable-area);\n  --button-inner-size: calc(var(--button-size) - 4px);\n  --button-radius: var(--border-radius-element);\n  --button-padding-default: calc(var(--default-grid-baseline) + var(--button-radius));\n  --button-padding: var(--default-grid-baseline) var(--button-padding-default);\n  color: var(--color-primary-element-light-text);\n  background-color: var(--color-primary-element-light);\n  border: 1px solid var(--color-primary-element-light-hover);\n  border-bottom-width: 2px;\n  border-radius: var(--button-radius);\n  box-sizing: border-box;\n  position: relative;\n  width: fit-content;\n  overflow: hidden;\n  padding-block: 1px 0;\n  padding-inline: var(--button-padding);\n  min-height: var(--button-size);\n  min-width: var(--button-size);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition-property: color, border-color, background-color;\n  transition-duration: 0.1s;\n  transition-timing-function: linear;\n  cursor: pointer;\n  font-size: var(--default-font-size);\n  font-weight: bold;\n}\n.button-vue--size-small[data-v-e2fd60a6] {\n  --button-size: var(--clickable-area-small);\n  --button-radius: var(--border-radius-small);\n}\n.button-vue--size-large[data-v-e2fd60a6] {\n  --button-size: var(--clickable-area-large);\n}\n.button-vue[data-v-e2fd60a6] * {\n  cursor: pointer;\n}\n.button-vue[data-v-e2fd60a6]:focus {\n  outline: none;\n}\n.button-vue[data-v-e2fd60a6]:disabled {\n  filter: saturate(0.7);\n  opacity: 0.5;\n  cursor: default;\n}\n.button-vue[data-v-e2fd60a6]:disabled * {\n  cursor: default;\n}\n.button-vue[data-v-e2fd60a6]:hover:not(:disabled) {\n  background-color: var(--color-primary-element-light-hover);\n}\n.button-vue[data-v-e2fd60a6]:active {\n  background-color: var(--color-primary-element-light);\n}\n.button-vue__wrapper[data-v-e2fd60a6] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n}\n.button-vue--end .button-vue__wrapper[data-v-e2fd60a6] {\n  justify-content: end;\n}\n.button-vue--start .button-vue__wrapper[data-v-e2fd60a6] {\n  justify-content: start;\n}\n.button-vue--reverse .button-vue__wrapper[data-v-e2fd60a6] {\n  flex-direction: row-reverse;\n}\n.button-vue--reverse[data-v-e2fd60a6] {\n  --button-padding: var(--button-padding-default) var(--default-grid-baseline);\n}\n.button-vue__icon[data-v-e2fd60a6] {\n  --default-clickable-area: var(--button-inner-size);\n  height: var(--button-inner-size);\n  width: var(--button-inner-size);\n  min-height: var(--button-inner-size);\n  min-width: var(--button-inner-size);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.button-vue__icon[data-v-e2fd60a6]:empty {\n  display: none;\n}\n.button-vue--size-small .button-vue__icon[data-v-e2fd60a6] > * {\n  max-height: 16px;\n  max-width: 16px;\n}\n.button-vue--size-small .button-vue__icon[data-v-e2fd60a6] svg {\n  height: 16px;\n  width: 16px;\n}\n.button-vue__text[data-v-e2fd60a6] {\n  font-weight: bold;\n  margin-bottom: 1px;\n  padding: 2px 0;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n.button-vue__text[data-v-e2fd60a6]:empty {\n  display: none;\n}\n.button-vue[data-v-e2fd60a6]:has(.button-vue__text:empty) {\n  --button-padding: var(--button-radius);\n  line-height: 1;\n  width: var(--button-size) !important;\n}\n.button-vue[data-v-e2fd60a6]:has(.button-vue__icon:empty) {\n  --button-padding: var(--button-padding-default);\n}\n.button-vue:has(.button-vue__icon:empty) .button-vue__text[data-v-e2fd60a6] {\n  padding-inline: var(--default-grid-baseline);\n}\n.button-vue--wide[data-v-e2fd60a6] {\n  width: 100%;\n}\n.button-vue[data-v-e2fd60a6]:focus-visible {\n  outline: 2px solid var(--color-main-text) !important;\n  box-shadow: 0 0 0 4px var(--color-main-background) !important;\n}\n.button-vue:focus-visible.button-vue--vue-tertiary-on-primary[data-v-e2fd60a6] {\n  outline: 2px solid var(--color-primary-element-text);\n  border-radius: var(--border-radius-element);\n  background-color: transparent;\n}\n.button-vue--primary[data-v-e2fd60a6] {\n  background-color: var(--color-primary-element);\n  border-color: var(--color-primary-element-hover);\n  color: var(--color-primary-element-text);\n}\n.button-vue--primary[data-v-e2fd60a6]:hover:not(:disabled) {\n  background-color: var(--color-primary-element-hover);\n}\n.button-vue--primary[data-v-e2fd60a6]:active {\n  background-color: var(--color-primary-element);\n}\n.button-vue--secondary[data-v-e2fd60a6] {\n  background-color: var(--color-primary-element-light);\n  border-color: var(--color-primary-element-light-hover);\n  color: var(--color-primary-element-light-text);\n}\n.button-vue--secondary[data-v-e2fd60a6]:hover:not(:disabled) {\n  color: var(--color-primary-element-light-text);\n  background-color: var(--color-primary-element-light-hover);\n}\n.button-vue--tertiary[data-v-e2fd60a6] {\n  background-color: transparent;\n  border-color: transparent;\n  color: var(--color-main-text);\n}\n.button-vue--tertiary[data-v-e2fd60a6]:hover:not(:disabled) {\n  background-color: var(--color-background-hover);\n}\n.button-vue--tertiary-no-background[data-v-e2fd60a6]:hover:not(:disabled) {\n  background-color: transparent;\n}\n.button-vue--tertiary-on-primary[data-v-e2fd60a6] {\n  color: var(--color-primary-element-text);\n}\n.button-vue--tertiary-on-primary[data-v-e2fd60a6]:hover:not(:disabled) {\n  background-color: transparent;\n}\n.button-vue--success[data-v-e2fd60a6] {\n  border-color: var(--color-success-hover);\n  background-color: var(--color-success);\n  color: var(--color-success-text);\n}\n.button-vue--success[data-v-e2fd60a6]:hover:not(:disabled) {\n  background-color: var(--color-success-hover);\n}\n.button-vue--success[data-v-e2fd60a6]:active {\n  background-color: var(--color-success);\n}\n.button-vue--warning[data-v-e2fd60a6] {\n  border-color: var(--color-warning-hover);\n  background-color: var(--color-warning);\n  color: var(--color-warning-text);\n}\n.button-vue--warning[data-v-e2fd60a6]:hover:not(:disabled) {\n  background-color: var(--color-warning-hover);\n}\n.button-vue--warning[data-v-e2fd60a6]:active {\n  background-color: var(--color-warning);\n}\n.button-vue--error[data-v-e2fd60a6] {\n  border-color: var(--color-error-hover);\n  background-color: var(--color-error);\n  color: var(--color-error-text);\n}\n.button-vue--error[data-v-e2fd60a6]:hover:not(:disabled) {\n  background-color: var(--color-error-hover);\n}\n.button-vue--error[data-v-e2fd60a6]:active {\n  background-color: var(--color-error);\n}/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/*\n* Ensure proper alignment of the vue material icons\n*/\n.material-design-icon {\n  display: flex;\n  align-self: center;\n  justify-self: center;\n  align-items: center;\n  justify-content: center;\n}\n.resize-observer {\n  position: absolute;\n  top: 0;\n  /* stylelint-disable-next-line csstools/use-logical */ /* upstream logic */\n  left: 0;\n  z-index: -1;\n  width: 100%;\n  height: 100%;\n  border: none;\n  background-color: transparent;\n  pointer-events: none;\n  display: block;\n  overflow: hidden;\n  opacity: 0;\n}\n.resize-observer object {\n  display: block;\n  position: absolute;\n  top: 0;\n  /* stylelint-disable-next-line csstools/use-logical */ /* upstream logic */\n  left: 0;\n  height: 100%;\n  width: 100%;\n  overflow: hidden;\n  pointer-events: none;\n  z-index: -1;\n}\n.v-popper--theme-dropdown, .v-popper--theme-dropdown * {\n  box-sizing: border-box;\n}\n.v-popper--theme-dropdown.v-popper__popper {\n  z-index: 100000;\n  top: 0;\n  /* stylelint-disable-next-line csstools/use-logical */ /* upstream logic */\n  left: 0;\n  display: block !important;\n}\n.v-popper--theme-dropdown.v-popper__popper .v-popper__wrapper {\n  /*\n   * In theory, "filter: drop-shadow" would look better here with arrow shadow.\n   * In fact, in results in a blurry popover in Chromium on scaling.\n   * The hypothesis is that "filter" creates a new composition layer,\n   * and with GPU acceleration requires the previous layers content to be rasterized.\n   * In combination with translate3d from floating-vue, it makes Chromium to first render and rasterize the popover\n   * and then apply scaling, which results in a blurry popover.\n   */\n  box-shadow: 0 1px 10px var(--color-box-shadow);\n  border-radius: var(--border-radius-element);\n}\n.v-popper--theme-dropdown.v-popper__popper .v-popper__inner {\n  padding: 0;\n  color: var(--color-main-text);\n  border-radius: var(--border-radius-element);\n  overflow: hidden;\n  background: var(--color-main-background);\n}\n.v-popper--theme-dropdown.v-popper__popper .v-popper__arrow-container {\n  position: absolute;\n  z-index: 1;\n  width: 0;\n  height: 0;\n  border-style: solid;\n  border-color: transparent;\n  border-width: 10px;\n}\n.v-popper--theme-dropdown.v-popper__popper[data-popper-placement^=top] .v-popper__arrow-container {\n  bottom: -9px;\n  /* stylelint-disable-next-line csstools/use-logical */ /* upstream logic */\n  border-bottom-width: 0;\n  /* stylelint-disable-next-line csstools/use-logical */ /* upstream logic */\n  border-top-color: var(--color-main-background);\n}\n.v-popper--theme-dropdown.v-popper__popper[data-popper-placement^=bottom] .v-popper__arrow-container {\n  top: -9px;\n  /* stylelint-disable-next-line csstools/use-logical */ /* upstream logic */\n  border-top-width: 0;\n  /* stylelint-disable-next-line csstools/use-logical */ /* upstream logic */\n  border-bottom-color: var(--color-main-background);\n}\n.v-popper--theme-dropdown.v-popper__popper[data-popper-placement^=right] .v-popper__arrow-container {\n  /* stylelint-disable-next-line csstools/use-logical */ /* upstream logic */\n  left: -9px;\n  /* stylelint-disable-next-line csstools/use-logical */ /* upstream logic */\n  border-left-width: 0;\n  /* stylelint-disable-next-line csstools/use-logical */ /* upstream logic */\n  border-right-color: var(--color-main-background);\n}\n.v-popper--theme-dropdown.v-popper__popper[data-popper-placement^=left] .v-popper__arrow-container {\n  /* stylelint-disable-next-line csstools/use-logical */ /* upstream logic */\n  right: -9px;\n  /* stylelint-disable-next-line csstools/use-logical */ /* upstream logic */\n  border-right-width: 0;\n  /* stylelint-disable-next-line csstools/use-logical */ /* upstream logic */\n  border-left-color: var(--color-main-background);\n}\n.v-popper--theme-dropdown.v-popper__popper[aria-hidden=true] {\n  visibility: hidden;\n  transition: opacity var(--animation-quick), visibility var(--animation-quick);\n  opacity: 0;\n}\n.v-popper--theme-dropdown.v-popper__popper[aria-hidden=false] {\n  visibility: visible;\n  transition: opacity var(--animation-quick);\n  opacity: 1;\n}/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/*\n* Ensure proper alignment of the vue material icons\n*/\n.material-design-icon[data-v-bd3d356d] {\n  display: flex;\n  align-self: center;\n  justify-self: center;\n  align-items: center;\n  justify-content: center;\n}\n.icon-vue[data-v-bd3d356d] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-width: var(--default-clickable-area);\n  min-height: var(--default-clickable-area);\n  opacity: 1;\n}\n.icon-vue.icon-vue--inline[data-v-bd3d356d] {\n  display: inline-flex !important;\n  min-width: fit-content;\n  min-height: fit-content;\n  vertical-align: text-bottom;\n}\n.icon-vue span[data-v-bd3d356d] {\n  line-height: 0;\n}\n.icon-vue[data-v-bd3d356d] svg {\n  fill: currentColor;\n  width: var(--a360429a);\n  height: var(--a360429a);\n  max-width: var(--a360429a);\n  max-height: var(--a360429a);\n}\n.icon-vue--directional[data-v-bd3d356d] svg:dir(rtl) {\n  transform: scaleX(-1);\n}/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/*\n* Ensure proper alignment of the vue material icons\n*/\n.material-design-icon[data-v-415d9f31] {\n  display: flex;\n  align-self: center;\n  justify-self: center;\n  align-items: center;\n  justify-content: center;\n}\n.loading-icon[data-v-415d9f31] {\n  overflow: hidden;\n}\n.loading-icon svg[data-v-415d9f31] {\n  animation: rotate var(--animation-duration, 0.8s) linear infinite;\n}/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/*\n* Ensure proper alignment of the vue material icons\n*/\n.material-design-icon[data-v-a7e3a34c] {\n  display: flex;\n  align-self: center;\n  justify-self: center;\n  align-items: center;\n  justify-content: center;\n}\n.user-bubble__wrapper[data-v-a7e3a34c] {\n  display: inline-block;\n  vertical-align: middle;\n  min-width: 0;\n  max-width: 100%;\n}\n.user-bubble__content[data-v-a7e3a34c] {\n  display: inline-flex;\n  max-width: 100%;\n  background-color: var(--color-background-dark);\n}\n.user-bubble__content--primary[data-v-a7e3a34c] {\n  color: var(--color-primary-element-text);\n  background-color: var(--color-primary-element);\n}\n.user-bubble__content[data-v-a7e3a34c] > :last-child {\n  padding-inline-end: 8px;\n}\n.user-bubble__avatar[data-v-a7e3a34c] {\n  align-self: center;\n}\n.user-bubble__name[data-v-a7e3a34c] {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.user-bubble__name[data-v-a7e3a34c], .user-bubble__secondary[data-v-a7e3a34c] {\n  padding-block: 0;\n  padding-inline: 4px 0;\n}/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/*\n* Ensure proper alignment of the vue material icons\n*/\n.material-design-icon[data-v-f30ef4a9] {\n  display: flex;\n  align-self: center;\n  justify-self: center;\n  align-items: center;\n  justify-content: center;\n}\n.avatardiv[data-v-f30ef4a9] {\n  position: relative;\n  display: inline-block;\n  width: var(--avatar-size);\n  height: var(--avatar-size);\n}\n.avatardiv--unknown[data-v-f30ef4a9] {\n  position: relative;\n  background-color: var(--color-main-background);\n  white-space: normal;\n}\n.avatardiv[data-v-f30ef4a9]:not(.avatardiv--unknown) {\n  background-color: var(--color-main-background) !important;\n  box-shadow: 0 0 5px rgba(0, 0, 0, 0.05) inset;\n}\n.avatardiv--with-menu[data-v-f30ef4a9] {\n  cursor: pointer;\n}\n.avatardiv--with-menu .action-item[data-v-f30ef4a9] {\n  position: absolute;\n  top: 0;\n  inset-inline-start: 0;\n}\n.avatardiv--with-menu[data-v-f30ef4a9] .action-item__menutoggle {\n  cursor: pointer;\n  opacity: 0;\n}\n.avatardiv--with-menu[data-v-f30ef4a9]:focus-within .action-item__menutoggle, .avatardiv--with-menu[data-v-f30ef4a9]:hover .action-item__menutoggle, .avatardiv--with-menu.avatardiv--with-menu-loading[data-v-f30ef4a9] .action-item__menutoggle {\n  opacity: 1;\n}\n.avatardiv--with-menu:focus-within img[data-v-f30ef4a9], .avatardiv--with-menu:hover img[data-v-f30ef4a9], .avatardiv--with-menu.avatardiv--with-menu-loading img[data-v-f30ef4a9] {\n  opacity: 0.3;\n}\n.avatardiv--with-menu[data-v-f30ef4a9] .action-item__menutoggle,\n.avatardiv--with-menu img[data-v-f30ef4a9] {\n  transition: opacity var(--animation-quick);\n}\n.avatardiv--with-menu[data-v-f30ef4a9]  .button-vue,\n.avatardiv--with-menu[data-v-f30ef4a9]  .button-vue__icon {\n  height: var(--avatar-size);\n  min-height: var(--avatar-size);\n  width: var(--avatar-size) !important;\n  min-width: var(--avatar-size);\n}\n.avatardiv--with-menu[data-v-f30ef4a9] >  .button-vue, .avatardiv--with-menu[data-v-f30ef4a9] >  .action-item .button-vue {\n  --button-radius: calc(var(--avatar-size) / 2);\n}\n.avatardiv .avatardiv__initials-wrapper[data-v-f30ef4a9] {\n  display: block;\n  height: var(--avatar-size);\n  width: var(--avatar-size);\n  background-color: var(--color-main-background);\n  border-radius: calc(var(--avatar-size) / 2);\n}\n.avatardiv .avatardiv__initials-wrapper .avatardiv__initials[data-v-f30ef4a9] {\n  position: absolute;\n  top: 0;\n  inset-inline-start: 0;\n  display: block;\n  width: 100%;\n  text-align: center;\n  font-weight: normal;\n}\n.avatardiv img[data-v-f30ef4a9] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.avatardiv .material-design-icon[data-v-f30ef4a9] {\n  width: var(--avatar-size);\n  height: var(--avatar-size);\n}\n.avatardiv .avatardiv__user-status[data-v-f30ef4a9] {\n  --avatar-status-size-orbital: calc(var(--avatar-size) * (1 - 1 / sqrt(2)));\n  --avatar-status-size-min: calc(var(--default-clickable-area) * (1 - 1 / sqrt(2)));\n  --avatar-status-size: max(var(--avatar-status-size-orbital), var(--avatar-status-size-min));\n  --avatar-status-icon-position: min(0px, (var(--avatar-status-size-orbital) - var(--avatar-status-size)) / 2);\n  box-sizing: border-box;\n  position: absolute;\n  inset-inline-end: var(--avatar-status-icon-position);\n  inset-block-end: var(--avatar-status-icon-position);\n  height: var(--avatar-status-size);\n  width: var(--avatar-status-size);\n  line-height: 1;\n  font-size: calc(var(--avatar-status-size) / 1.2);\n  background-color: var(--color-main-background);\n  background-repeat: no-repeat;\n  background-size: var(--avatar-status-size);\n  background-position: center;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.acli:hover .avatardiv .avatardiv__user-status[data-v-f30ef4a9] {\n  border-color: var(--color-background-hover);\n  background-color: var(--color-background-hover);\n}\n.acli.active .avatardiv .avatardiv__user-status[data-v-f30ef4a9] {\n  border-color: var(--color-primary-element-light);\n  background-color: var(--color-primary-element-light);\n}\n.avatardiv .avatardiv__user-status--icon[data-v-f30ef4a9] {\n  border: none;\n  background-color: transparent;\n}\n.avatardiv .popovermenu-wrapper[data-v-f30ef4a9] {\n  position: relative;\n  display: inline-block;\n}\n.avatar-class-icon[data-v-f30ef4a9] {\n  display: block;\n  border-radius: calc(var(--avatar-size) / 2);\n  background-color: var(--color-background-darker);\n  height: 100%;\n}/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/*\n* Ensure proper alignment of the vue material icons\n*/\n.material-design-icon[data-v-76892c52] {\n  display: flex;\n  align-self: center;\n  justify-self: center;\n  align-items: center;\n  justify-content: center;\n}\n\n/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\nli.action[data-v-76892c52]:hover, li.action.active[data-v-76892c52] {\n  border-radius: 6px;\n  padding: 0;\n}\nli.action[data-v-76892c52]:hover {\n  background-color: var(--color-background-hover);\n}\n.action--disabled[data-v-76892c52] {\n  pointer-events: none;\n  opacity: 0.5;\n}\n.action--disabled[data-v-76892c52]:hover, .action--disabled[data-v-76892c52]:focus {\n  cursor: default;\n  opacity: 0.5;\n}\n.action--disabled[data-v-76892c52] * {\n  opacity: 1 !important;\n}\n.action-button[data-v-76892c52] {\n  display: flex;\n  align-items: flex-start;\n  width: 100%;\n  height: auto;\n  margin: 0;\n  padding: 0;\n  padding-inline-end: calc((var(--default-clickable-area) - 16px) / 2);\n  box-sizing: border-box;\n  cursor: pointer;\n  white-space: nowrap;\n  color: var(--color-main-text);\n  border: 0;\n  border-radius: 0;\n  background-color: transparent;\n  box-shadow: none;\n  font-weight: normal;\n  font-size: var(--default-font-size);\n  line-height: var(--default-clickable-area);\n}\n.action-button > span[data-v-76892c52] {\n  cursor: pointer;\n  white-space: nowrap;\n}\n.action-button__icon[data-v-76892c52] {\n  width: var(--default-clickable-area);\n  height: var(--default-clickable-area);\n  opacity: 1;\n  background-position: calc((var(--default-clickable-area) - 16px) / 2) center;\n  background-size: 16px;\n  background-repeat: no-repeat;\n}\n.action-button[data-v-76892c52] .material-design-icon {\n  width: var(--default-clickable-area);\n  height: var(--default-clickable-area);\n  opacity: 1;\n}\n.action-button[data-v-76892c52] .material-design-icon .material-design-icon__svg {\n  vertical-align: middle;\n}\n.action-button__longtext-wrapper[data-v-76892c52], .action-button__longtext[data-v-76892c52] {\n  max-width: 220px;\n  line-height: 1.6em;\n  padding: calc((var(--default-clickable-area) - 1.6em) / 2) 0;\n  cursor: pointer;\n  text-align: start;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.action-button__longtext[data-v-76892c52] {\n  cursor: pointer;\n  white-space: pre-wrap !important;\n}\n.action-button__name[data-v-76892c52] {\n  font-weight: bold;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n  max-width: 100%;\n  display: block;\n}\n.action-button__description[data-v-76892c52] {\n  display: block;\n  white-space: pre-wrap;\n  font-size: var(--font-size-small);\n  line-height: var(--default-line-height);\n  color: var(--color-text-maxcontrast);\n  cursor: pointer;\n}\n.action-button__menu-icon[data-v-76892c52] {\n  margin-inline: auto calc((var(--default-clickable-area) - 16px) / 2 * -1);\n}\n.action-button__pressed-icon[data-v-76892c52] {\n  margin-inline: auto calc((var(--default-clickable-area) - 16px) / 2 * -1);\n}\n.action-button[data-v-76892c52] * {\n  cursor: pointer;\n}/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/*\n* Ensure proper alignment of the vue material icons\n*/\n.material-design-icon[data-v-786624ec] {\n  display: flex;\n  align-self: center;\n  justify-self: center;\n  align-items: center;\n  justify-content: center;\n}\n\n/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\nli.action[data-v-786624ec]:hover, li.action.active[data-v-786624ec] {\n  border-radius: 6px;\n  padding: 0;\n}\nli.action[data-v-786624ec]:hover {\n  background-color: var(--color-background-hover);\n}\n.action-link[data-v-786624ec] {\n  display: flex;\n  align-items: flex-start;\n  width: 100%;\n  height: auto;\n  margin: 0;\n  padding: 0;\n  padding-inline-end: calc((var(--default-clickable-area) - 16px) / 2);\n  box-sizing: border-box;\n  cursor: pointer;\n  white-space: nowrap;\n  color: var(--color-main-text);\n  border: 0;\n  border-radius: 0;\n  background-color: transparent;\n  box-shadow: none;\n  font-weight: normal;\n  font-size: var(--default-font-size);\n  line-height: var(--default-clickable-area);\n}\n.action-link > span[data-v-786624ec] {\n  cursor: pointer;\n  white-space: nowrap;\n}\n.action-link__icon[data-v-786624ec] {\n  width: var(--default-clickable-area);\n  height: var(--default-clickable-area);\n  opacity: 1;\n  background-position: calc((var(--default-clickable-area) - 16px) / 2) center;\n  background-size: 16px;\n  background-repeat: no-repeat;\n}\n.action-link[data-v-786624ec] .material-design-icon {\n  width: var(--default-clickable-area);\n  height: var(--default-clickable-area);\n  opacity: 1;\n}\n.action-link[data-v-786624ec] .material-design-icon .material-design-icon__svg {\n  vertical-align: middle;\n}\n.action-link__longtext-wrapper[data-v-786624ec], .action-link__longtext[data-v-786624ec] {\n  max-width: 220px;\n  line-height: 1.6em;\n  padding: calc((var(--default-clickable-area) - 1.6em) / 2) 0;\n  cursor: pointer;\n  text-align: start;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.action-link__longtext[data-v-786624ec] {\n  cursor: pointer;\n  white-space: pre-wrap !important;\n}\n.action-link__name[data-v-786624ec] {\n  font-weight: bold;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n  max-width: 100%;\n  display: block;\n}\n.action-link__description[data-v-786624ec] {\n  display: block;\n  white-space: pre-wrap;\n  font-size: var(--font-size-small);\n  line-height: var(--default-line-height);\n  color: var(--color-text-maxcontrast);\n  cursor: pointer;\n}\n.action-link__menu-icon[data-v-786624ec] {\n  margin-inline: auto calc((var(--default-clickable-area) - 16px) / 2 * -1);\n}/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/*\n* Ensure proper alignment of the vue material icons\n*/\n.material-design-icon[data-v-d4dc7cdf] {\n  display: flex;\n  align-self: center;\n  justify-self: center;\n  align-items: center;\n  justify-content: center;\n}\n\n/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\nli.action[data-v-d4dc7cdf]:hover, li.action.active[data-v-d4dc7cdf] {\n  border-radius: 6px;\n  padding: 0;\n}\nli.action[data-v-d4dc7cdf]:hover {\n  background-color: var(--color-background-hover);\n}\n.action-router[data-v-d4dc7cdf] {\n  display: flex;\n  align-items: flex-start;\n  width: 100%;\n  height: auto;\n  margin: 0;\n  padding: 0;\n  padding-inline-end: calc((var(--default-clickable-area) - 16px) / 2);\n  box-sizing: border-box;\n  cursor: pointer;\n  white-space: nowrap;\n  color: var(--color-main-text);\n  border: 0;\n  border-radius: 0;\n  background-color: transparent;\n  box-shadow: none;\n  font-weight: normal;\n  font-size: var(--default-font-size);\n  line-height: var(--default-clickable-area);\n}\n.action-router > span[data-v-d4dc7cdf] {\n  cursor: pointer;\n  white-space: nowrap;\n}\n.action-router__icon[data-v-d4dc7cdf] {\n  width: var(--default-clickable-area);\n  height: var(--default-clickable-area);\n  opacity: 1;\n  background-position: calc((var(--default-clickable-area) - 16px) / 2) center;\n  background-size: 16px;\n  background-repeat: no-repeat;\n}\n.action-router[data-v-d4dc7cdf] .material-design-icon {\n  width: var(--default-clickable-area);\n  height: var(--default-clickable-area);\n  opacity: 1;\n}\n.action-router[data-v-d4dc7cdf] .material-design-icon .material-design-icon__svg {\n  vertical-align: middle;\n}\n.action-router__longtext-wrapper[data-v-d4dc7cdf], .action-router__longtext[data-v-d4dc7cdf] {\n  max-width: 220px;\n  line-height: 1.6em;\n  padding: calc((var(--default-clickable-area) - 1.6em) / 2) 0;\n  cursor: pointer;\n  text-align: start;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.action-router__longtext[data-v-d4dc7cdf] {\n  cursor: pointer;\n  white-space: pre-wrap !important;\n}\n.action-router__name[data-v-d4dc7cdf] {\n  font-weight: bold;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n  max-width: 100%;\n  display: block;\n}\n.action-router__description[data-v-d4dc7cdf] {\n  display: block;\n  white-space: pre-wrap;\n  font-size: var(--font-size-small);\n  line-height: var(--default-line-height);\n  color: var(--color-text-maxcontrast);\n  cursor: pointer;\n}\n.action-router__menu-icon[data-v-d4dc7cdf] {\n  margin-inline: auto calc((var(--default-clickable-area) - 16px) / 2 * -1);\n}\n.action--disabled[data-v-d4dc7cdf] {\n  pointer-events: none;\n  opacity: 0.5;\n}\n.action--disabled[data-v-d4dc7cdf]:hover, .action--disabled[data-v-d4dc7cdf]:focus {\n  cursor: default;\n  opacity: 0.5;\n}\n.action--disabled[data-v-d4dc7cdf] * {\n  opacity: 1 !important;\n}/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/*\n* Ensure proper alignment of the vue material icons\n*/\n.material-design-icon[data-v-de86fa0f] {\n  display: flex;\n  align-self: center;\n  justify-self: center;\n  align-items: center;\n  justify-content: center;\n}\n\n/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\nli.action[data-v-de86fa0f]:hover, li.action.active[data-v-de86fa0f] {\n  border-radius: 6px;\n  padding: 0;\n}\nli.action[data-v-de86fa0f]:hover {\n  background-color: var(--color-background-hover);\n}\n.action-text[data-v-de86fa0f] {\n  display: flex;\n  align-items: flex-start;\n  width: 100%;\n  height: auto;\n  margin: 0;\n  padding: 0;\n  padding-inline-end: calc((var(--default-clickable-area) - 16px) / 2);\n  box-sizing: border-box;\n  cursor: pointer;\n  white-space: nowrap;\n  color: var(--color-main-text);\n  border: 0;\n  border-radius: 0;\n  background-color: transparent;\n  box-shadow: none;\n  font-weight: normal;\n  font-size: var(--default-font-size);\n  line-height: var(--default-clickable-area);\n}\n.action-text > span[data-v-de86fa0f] {\n  cursor: pointer;\n  white-space: nowrap;\n}\n.action-text__icon[data-v-de86fa0f] {\n  width: var(--default-clickable-area);\n  height: var(--default-clickable-area);\n  opacity: 1;\n  background-position: calc((var(--default-clickable-area) - 16px) / 2) center;\n  background-size: 16px;\n  background-repeat: no-repeat;\n}\n.action-text[data-v-de86fa0f] .material-design-icon {\n  width: var(--default-clickable-area);\n  height: var(--default-clickable-area);\n  opacity: 1;\n}\n.action-text[data-v-de86fa0f] .material-design-icon .material-design-icon__svg {\n  vertical-align: middle;\n}\n.action-text__longtext-wrapper[data-v-de86fa0f], .action-text__longtext[data-v-de86fa0f] {\n  max-width: 220px;\n  line-height: 1.6em;\n  padding: calc((var(--default-clickable-area) - 1.6em) / 2) 0;\n  cursor: pointer;\n  text-align: start;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.action-text__longtext[data-v-de86fa0f] {\n  cursor: pointer;\n  white-space: pre-wrap !important;\n}\n.action-text__name[data-v-de86fa0f] {\n  font-weight: bold;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n  max-width: 100%;\n  display: block;\n}\n.action-text__description[data-v-de86fa0f] {\n  display: block;\n  white-space: pre-wrap;\n  font-size: var(--font-size-small);\n  line-height: var(--default-line-height);\n  color: var(--color-text-maxcontrast);\n  cursor: pointer;\n}\n.action-text__menu-icon[data-v-de86fa0f] {\n  margin-inline: auto calc((var(--default-clickable-area) - 16px) / 2 * -1);\n}\n.action--disabled[data-v-de86fa0f] {\n  pointer-events: none;\n  opacity: 0.5;\n}\n.action--disabled[data-v-de86fa0f]:hover, .action--disabled[data-v-de86fa0f]:focus {\n  cursor: default;\n  opacity: 0.5;\n}\n.action--disabled[data-v-de86fa0f] * {\n  opacity: 1 !important;\n}\n.action-text[data-v-de86fa0f],\n.action-text span[data-v-de86fa0f] {\n  cursor: default;\n}/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/*\n* Ensure proper alignment of the vue material icons\n*/\n.material-design-icon[data-v-a911a043] {\n  display: flex;\n  align-self: center;\n  justify-self: center;\n  align-items: center;\n  justify-content: center;\n}\n.user-status-icon[data-v-a911a043] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.user-status-icon--invisible[data-v-a911a043] {\n  filter: var(--background-invert-if-dark);\n}\n.user-status-icon[data-v-a911a043] svg {\n  width: 100%;\n  height: 100%;\n}/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/*\n* Ensure proper alignment of the vue material icons\n*/\n.material-design-icon[data-v-25f4d6e1] {\n  display: flex;\n  align-self: center;\n  justify-self: center;\n  align-items: center;\n  justify-content: center;\n}\n.mention-bubble--primary .mention-bubble__content[data-v-25f4d6e1] {\n  color: var(--color-primary-element-text);\n  background-color: var(--color-primary-element);\n}\n.mention-bubble__wrapper[data-v-25f4d6e1] {\n  position: relative;\n  max-width: 150px;\n  height: 18px;\n  vertical-align: text-bottom;\n  display: inline-flex;\n  align-items: center;\n}\n.mention-bubble__content[data-v-25f4d6e1] {\n  display: inline-flex;\n  overflow: hidden;\n  align-items: center;\n  max-width: 100%;\n  height: 20px;\n  -webkit-user-select: none;\n  user-select: none;\n  padding-inline: 2px 6px;\n  border-radius: 10px;\n  background-color: var(--color-background-dark);\n}\n.mention-bubble__icon[data-v-25f4d6e1] {\n  position: relative;\n  width: 16px;\n  height: 16px;\n  border-radius: 8px;\n  background-color: var(--color-background-darker);\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: 12px;\n}\n.mention-bubble__icon--with-avatar[data-v-25f4d6e1] {\n  color: inherit;\n  background-size: cover;\n}\n.mention-bubble__title[data-v-25f4d6e1] {\n  overflow: hidden;\n  margin-inline-start: 2px;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.mention-bubble__title[data-v-25f4d6e1]::before {\n  content: attr(title);\n}\n.mention-bubble__select[data-v-25f4d6e1] {\n  position: absolute;\n  z-index: -1;\n  inset-inline-start: -100vw;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n}svg[data-v-ea840893] {\n  animation: 2s linear infinite svg-animation-ea840893;\n  max-width: 100px;\n}\n@keyframes svg-animation-ea840893 {\n0% {\n    transform: rotateZ(0deg);\n}\n100% {\n    transform: rotateZ(360deg);\n}\n}\ncircle[data-v-ea840893] {\n  animation: 1.4s ease-in-out infinite both circle-animation-ea840893;\n  display: block;\n  fill: transparent;\n  /* stroke: #2f3d4c; */\n  stroke-linecap: round;\n  stroke-dasharray: 283;\n  stroke-dashoffset: 280;\n  stroke-width: 10px;\n  transform-origin: 50% 50%;\n}\n@keyframes circle-animation-ea840893 {\n0%, 25% {\n    stroke-dashoffset: 280;\n    transform: rotate(0);\n}\n50%, 75% {\n    stroke-dashoffset: 75;\n    transform: rotate(45deg);\n}\n100% {\n    stroke-dashoffset: 280;\n    transform: rotate(360deg);\n}\n}\n.agora-thumb-icon[data-v-886027e5] {\n  display: inline-block;\n  vertical-align: middle;\n  transition: fill 0.3s ease;\n}\n.material-design-icon__svg[data-v-886027e5] {\n  pointer-events: none;\n}\n/**\n * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/**\n * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors\n * SPDX-License-Identifier: AGPL-3.0-or-later\n */\n/*\n* Ensure proper alignment of the vue material icons\n*/\n.material-design-icon[data-v-697cfd8f] {\n  display: flex;\n  align-self: center;\n  justify-self: center;\n  align-items: center;\n  justify-content: center;\n}\n.empty-content[data-v-697cfd8f] {\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  justify-content: center;\n  /* In case of using in a flex container - flex in advance */\n  flex-grow: 1;\n  padding: var(--default-grid-baseline);\n}\n.modal-wrapper .empty-content[data-v-697cfd8f] {\n  margin-top: 5vh;\n  margin-bottom: 5vh;\n}\n.empty-content__icon[data-v-697cfd8f] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 64px;\n  height: 64px;\n  margin: 0 auto 15px;\n  opacity: 0.4;\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: 64px;\n}\n.empty-content__icon[data-v-697cfd8f] svg {\n  width: 64px !important;\n  height: 64px !important;\n  max-width: 64px !important;\n  max-height: 64px !important;\n}\n.empty-content__name[data-v-697cfd8f] {\n  margin-bottom: 10px;\n  text-align: center;\n  font-weight: bold;\n  font-size: 20px;\n  line-height: 30px;\n}\n.empty-content__description[data-v-697cfd8f] {\n  color: var(--color-text-maxcontrast);\n  text-align: center;\n  text-wrap-style: balance;\n}\n.empty-content__action[data-v-697cfd8f] {\n  margin-top: 8px;\n}\n.modal-wrapper .empty-content__action[data-v-697cfd8f] {\n  margin-top: 20px;\n  display: flex;\n}'));
      document.head.appendChild(elementStyle);
    }
  } catch (e) {
    console.error("vite-plugin-css-injected-by-js", e);
  }
})();
const KR = "agora", YR = "1.0.0rc2", po = globalThis || void 0 || self;
function yl(e4) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e4.split(",")) t[n] = 1;
  return (n) => n in t;
}
const Fe = {}, ri = [], en = () => {
}, nf = () => false, mo = (e4) => e4.charCodeAt(0) === 111 && e4.charCodeAt(1) === 110 && (e4.charCodeAt(2) > 122 || e4.charCodeAt(2) < 97), bl = (e4) => e4.startsWith("onUpdate:"), ut = Object.assign, kl = (e4, t) => {
  const n = e4.indexOf(t);
  n > -1 && e4.splice(n, 1);
}, Mk = Object.prototype.hasOwnProperty, ze = (e4, t) => Mk.call(e4, t), de = Array.isArray, ii = (e4) => Ki(e4) === "[object Map]", si = (e4) => Ki(e4) === "[object Set]", rf = (e4) => Ki(e4) === "[object Date]", ge = (e4) => typeof e4 == "function", Je = (e4) => typeof e4 == "string", hn = (e4) => typeof e4 == "symbol", We = (e4) => e4 !== null && typeof e4 == "object", sf = (e4) => (We(e4) || ge(e4)) && ge(e4.then) && ge(e4.catch), of = Object.prototype.toString, Ki = (e4) => of.call(e4), jk = (e4) => Ki(e4).slice(8, -1), af = (e4) => Ki(e4) === "[object Object]", wl = (e4) => Je(e4) && e4 !== "NaN" && e4[0] !== "-" && "" + parseInt(e4, 10) === e4, Yi = yl(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), go = (e4) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((n) => t[n] || (t[n] = e4(n)));
}, Ik = /-(\w)/g, Xt = go((e4) => e4.replace(Ik, (t, n) => n ? n.toUpperCase() : "")), Lk = /\B([A-Z])/g, Wn = go((e4) => e4.replace(Lk, "-$1").toLowerCase()), yo = go((e4) => e4.charAt(0).toUpperCase() + e4.slice(1)), bo = go((e4) => e4 ? `on${yo(e4)}` : ""), Wt = (e4, t) => !Object.is(e4, t), ko = (e4, ...t) => {
  for (let n = 0; n < e4.length; n++) e4[n](...t);
}, lf = (e4, t, n, r = false) => {
  Object.defineProperty(e4, t, { configurable: true, enumerable: false, writable: r, value: n });
}, wo = (e4) => {
  const t = parseFloat(e4);
  return isNaN(t) ? e4 : t;
}, Fk = (e4) => {
  const t = Je(e4) ? Number(e4) : NaN;
  return isNaN(t) ? e4 : t;
};
let cf;
const So = () => cf || (cf = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof po < "u" ? po : {});
function Pt(e4) {
  if (de(e4)) {
    const t = {};
    for (let n = 0; n < e4.length; n++) {
      const r = e4[n], i = Je(r) ? $k(r) : Pt(r);
      if (i) for (const s in i) t[s] = i[s];
    }
    return t;
  } else if (Je(e4) || We(e4)) return e4;
}
const Dk = /;(?![^(]*\))/g, Bk = /:([^]+)/, zk = /\/\*[^]*?\*\//g;
function $k(e4) {
  const t = {};
  return e4.replace(zk, "").split(Dk).forEach((n) => {
    if (n) {
      const r = n.split(Bk);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }), t;
}
function yt(e4) {
  let t = "";
  if (Je(e4)) t = e4;
  else if (de(e4)) for (let n = 0; n < e4.length; n++) {
    const r = yt(e4[n]);
    r && (t += r + " ");
  }
  else if (We(e4)) for (const n in e4) e4[n] && (t += n + " ");
  return t.trim();
}
function Eo(e4) {
  if (!e4) return null;
  let { class: t, style: n } = e4;
  return t && !Je(t) && (e4.class = yt(t)), n && (e4.style = Pt(n)), e4;
}
const Uk = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Vk = yl(Uk);
function uf(e4) {
  return !!e4 || e4 === "";
}
function Hk(e4, t) {
  if (e4.length !== t.length) return false;
  let n = true;
  for (let r = 0; n && r < e4.length; r++) n = Mr(e4[r], t[r]);
  return n;
}
function Mr(e4, t) {
  if (e4 === t) return true;
  let n = rf(e4), r = rf(t);
  if (n || r) return n && r ? e4.getTime() === t.getTime() : false;
  if (n = hn(e4), r = hn(t), n || r) return e4 === t;
  if (n = de(e4), r = de(t), n || r) return n && r ? Hk(e4, t) : false;
  if (n = We(e4), r = We(t), n || r) {
    if (!n || !r) return false;
    const i = Object.keys(e4).length, s = Object.keys(t).length;
    if (i !== s) return false;
    for (const o in e4) {
      const a = e4.hasOwnProperty(o), l = t.hasOwnProperty(o);
      if (a && !l || !a && l || !Mr(e4[o], t[o])) return false;
    }
  }
  return String(e4) === String(t);
}
function Sl(e4, t) {
  return e4.findIndex((n) => Mr(n, t));
}
const df = (e4) => !!(e4 && e4.__v_isRef === true), qe = (e4) => Je(e4) ? e4 : e4 == null ? "" : de(e4) || We(e4) && (e4.toString === of || !ge(e4.toString)) ? df(e4) ? qe(e4.value) : JSON.stringify(e4, ff, 2) : String(e4), ff = (e4, t) => df(t) ? ff(e4, t.value) : ii(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((n, [r, i], s) => (n[El(r, s) + " =>"] = i, n), {}) } : si(t) ? { [`Set(${t.size})`]: [...t.values()].map((n) => El(n)) } : hn(t) ? El(t) : We(t) && !de(t) && !af(t) ? String(t) : t, El = (e4, t = "") => {
  var n;
  return hn(e4) ? `Symbol(${(n = e4.description) != null ? n : t})` : e4;
};
function qk(e4) {
  return e4 == null ? "initial" : typeof e4 == "string" ? e4 === "" ? " " : e4 : String(e4);
}
let xt;
class hf {
  constructor(t = false) {
    this.detached = t, this._active = true, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = false, this.parent = xt, !t && xt && (this.index = (xt.scopes || (xt.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = true;
      let t, n;
      if (this.scopes) for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].pause();
      for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].pause();
    }
  }
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = false;
      let t, n;
      if (this.scopes) for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].resume();
      for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const n = xt;
      try {
        return xt = this, t();
      } finally {
        xt = n;
      }
    }
  }
  on() {
    ++this._on === 1 && (this.prevScope = xt, xt = this);
  }
  off() {
    this._on > 0 && --this._on === 0 && (xt = this.prevScope, this.prevScope = void 0);
  }
  stop(t) {
    if (this._active) {
      this._active = false;
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
      for (this.effects.length = 0, n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]();
      if (this.cleanups.length = 0, this.scopes) {
        for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(true);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const i = this.parent.scopes.pop();
        i && i !== this && (this.parent.scopes[this.index] = i, i.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function Al(e4) {
  return new hf(e4);
}
function Ao() {
  return xt;
}
function Tl(e4, t = false) {
  xt && xt.cleanups.push(e4);
}
let Ye;
const Nl = /* @__PURE__ */ new WeakSet();
class vf {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, xt && xt.active && xt.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Nl.has(this) && (Nl.delete(this), this.trigger()));
  }
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || mf(this);
  }
  run() {
    if (!(this.flags & 1)) return this.fn();
    this.flags |= 2, wf(this), gf(this);
    const t = Ye, n = vn;
    Ye = this, vn = true;
    try {
      return this.fn();
    } finally {
      yf(this), Ye = t, vn = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep) Pl(t);
      this.deps = this.depsTail = void 0, wf(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Nl.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  runIfDirty() {
    Ol(this) && this.run();
  }
  get dirty() {
    return Ol(this);
  }
}
let pf = 0, Xi, Ji;
function mf(e4, t = false) {
  if (e4.flags |= 8, t) {
    e4.next = Ji, Ji = e4;
    return;
  }
  e4.next = Xi, Xi = e4;
}
function Cl() {
  pf++;
}
function _l() {
  if (--pf > 0) return;
  if (Ji) {
    let t = Ji;
    for (Ji = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e4;
  for (; Xi; ) {
    let t = Xi;
    for (Xi = void 0; t; ) {
      const n = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1) try {
        t.trigger();
      } catch (r) {
        e4 || (e4 = r);
      }
      t = n;
    }
  }
  if (e4) throw e4;
}
function gf(e4) {
  for (let t = e4.deps; t; t = t.nextDep) t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function yf(e4) {
  let t, n = e4.depsTail, r = n;
  for (; r; ) {
    const i = r.prevDep;
    r.version === -1 ? (r === n && (n = i), Pl(r), Wk(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = i;
  }
  e4.deps = t, e4.depsTail = n;
}
function Ol(e4) {
  for (let t = e4.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (bf(t.dep.computed) || t.dep.version !== t.version)) return true;
  return !!e4._dirty;
}
function bf(e4) {
  if (e4.flags & 4 && !(e4.flags & 16) || (e4.flags &= -17, e4.globalVersion === Qi) || (e4.globalVersion = Qi, !e4.isSSR && e4.flags & 128 && (!e4.deps && !e4._dirty || !Ol(e4)))) return;
  e4.flags |= 2;
  const t = e4.dep, n = Ye, r = vn;
  Ye = e4, vn = true;
  try {
    gf(e4);
    const i = e4.fn(e4._value);
    (t.version === 0 || Wt(i, e4._value)) && (e4.flags |= 128, e4._value = i, t.version++);
  } catch (i) {
    throw t.version++, i;
  } finally {
    Ye = n, vn = r, yf(e4), e4.flags &= -3;
  }
}
function Pl(e4, t = false) {
  const { dep: n, prevSub: r, nextSub: i } = e4;
  if (r && (r.nextSub = i, e4.prevSub = void 0), i && (i.prevSub = r, e4.nextSub = void 0), n.subs === e4 && (n.subs = r, !r && n.computed)) {
    n.computed.flags &= -5;
    for (let s = n.computed.deps; s; s = s.nextDep) Pl(s, true);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Wk(e4) {
  const { prevDep: t, nextDep: n } = e4;
  t && (t.nextDep = n, e4.prevDep = void 0), n && (n.prevDep = t, e4.nextDep = void 0);
}
let vn = true;
const kf = [];
function On() {
  kf.push(vn), vn = false;
}
function Pn() {
  const e4 = kf.pop();
  vn = e4 === void 0 ? true : e4;
}
function wf(e4) {
  const { cleanup: t } = e4;
  if (e4.cleanup = void 0, t) {
    const n = Ye;
    Ye = void 0;
    try {
      t();
    } finally {
      Ye = n;
    }
  }
}
let Qi = 0;
class Gk {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class To {
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = true;
  }
  track(t) {
    if (!Ye || !vn || Ye === this.computed) return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== Ye) n = this.activeLink = new Gk(Ye, this), Ye.deps ? (n.prevDep = Ye.depsTail, Ye.depsTail.nextDep = n, Ye.depsTail = n) : Ye.deps = Ye.depsTail = n, Sf(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const r = n.nextDep;
      r.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = r), n.prevDep = Ye.depsTail, n.nextDep = void 0, Ye.depsTail.nextDep = n, Ye.depsTail = n, Ye.deps === n && (Ye.deps = r);
    }
    return n;
  }
  trigger(t) {
    this.version++, Qi++, this.notify(t);
  }
  notify(t) {
    Cl();
    try {
      for (let n = this.subs; n; n = n.prevSub) n.sub.notify() && n.sub.dep.notify();
    } finally {
      _l();
    }
  }
}
function Sf(e4) {
  if (e4.dep.sc++, e4.sub.flags & 4) {
    const t = e4.dep.computed;
    if (t && !e4.dep.subs) {
      t.flags |= 20;
      for (let r = t.deps; r; r = r.nextDep) Sf(r);
    }
    const n = e4.dep.subs;
    n !== e4 && (e4.prevSub = n, n && (n.nextSub = e4)), e4.dep.subs = e4;
  }
}
const No = /* @__PURE__ */ new WeakMap(), jr = Symbol(""), xl = Symbol(""), es = Symbol("");
function Rt(e4, t, n) {
  if (vn && Ye) {
    let r = No.get(e4);
    r || No.set(e4, r = /* @__PURE__ */ new Map());
    let i = r.get(n);
    i || (r.set(n, i = new To()), i.map = r, i.key = n), i.track();
  }
}
function Gn(e4, t, n, r, i, s) {
  const o = No.get(e4);
  if (!o) {
    Qi++;
    return;
  }
  const a = (l) => {
    l && l.trigger();
  };
  if (Cl(), t === "clear") o.forEach(a);
  else {
    const l = de(e4), u = l && wl(n);
    if (l && n === "length") {
      const c = Number(r);
      o.forEach((f, p) => {
        (p === "length" || p === es || !hn(p) && p >= c) && a(f);
      });
    } else switch ((n !== void 0 || o.has(void 0)) && a(o.get(n)), u && a(o.get(es)), t) {
      case "add":
        l ? u && a(o.get("length")) : (a(o.get(jr)), ii(e4) && a(o.get(xl)));
        break;
      case "delete":
        l || (a(o.get(jr)), ii(e4) && a(o.get(xl)));
        break;
      case "set":
        ii(e4) && a(o.get(jr));
        break;
    }
  }
  _l();
}
function Zk(e4, t) {
  const n = No.get(e4);
  return n && n.get(t);
}
function oi(e4) {
  const t = Oe(e4);
  return t === e4 ? t : (Rt(t, "iterate", es), tn(e4) ? t : t.map(wt));
}
function Co(e4) {
  return Rt(e4 = Oe(e4), "iterate", es), e4;
}
const Kk = { __proto__: null, [Symbol.iterator]() {
  return Rl(this, Symbol.iterator, wt);
}, concat(...e4) {
  return oi(this).concat(...e4.map((t) => de(t) ? oi(t) : t));
}, entries() {
  return Rl(this, "entries", (e4) => (e4[1] = wt(e4[1]), e4));
}, every(e4, t) {
  return Zn(this, "every", e4, t, void 0, arguments);
}, filter(e4, t) {
  return Zn(this, "filter", e4, t, (n) => n.map(wt), arguments);
}, find(e4, t) {
  return Zn(this, "find", e4, t, wt, arguments);
}, findIndex(e4, t) {
  return Zn(this, "findIndex", e4, t, void 0, arguments);
}, findLast(e4, t) {
  return Zn(this, "findLast", e4, t, wt, arguments);
}, findLastIndex(e4, t) {
  return Zn(this, "findLastIndex", e4, t, void 0, arguments);
}, forEach(e4, t) {
  return Zn(this, "forEach", e4, t, void 0, arguments);
}, includes(...e4) {
  return Ml(this, "includes", e4);
}, indexOf(...e4) {
  return Ml(this, "indexOf", e4);
}, join(e4) {
  return oi(this).join(e4);
}, lastIndexOf(...e4) {
  return Ml(this, "lastIndexOf", e4);
}, map(e4, t) {
  return Zn(this, "map", e4, t, void 0, arguments);
}, pop() {
  return ts(this, "pop");
}, push(...e4) {
  return ts(this, "push", e4);
}, reduce(e4, ...t) {
  return Ef(this, "reduce", e4, t);
}, reduceRight(e4, ...t) {
  return Ef(this, "reduceRight", e4, t);
}, shift() {
  return ts(this, "shift");
}, some(e4, t) {
  return Zn(this, "some", e4, t, void 0, arguments);
}, splice(...e4) {
  return ts(this, "splice", e4);
}, toReversed() {
  return oi(this).toReversed();
}, toSorted(e4) {
  return oi(this).toSorted(e4);
}, toSpliced(...e4) {
  return oi(this).toSpliced(...e4);
}, unshift(...e4) {
  return ts(this, "unshift", e4);
}, values() {
  return Rl(this, "values", wt);
} };
function Rl(e4, t, n) {
  const r = Co(e4), i = r[t]();
  return r !== e4 && !tn(e4) && (i._next = i.next, i.next = () => {
    const s = i._next();
    return s.value && (s.value = n(s.value)), s;
  }), i;
}
const Yk = Array.prototype;
function Zn(e4, t, n, r, i, s) {
  const o = Co(e4), a = o !== e4 && !tn(e4), l = o[t];
  if (l !== Yk[t]) {
    const f = l.apply(e4, s);
    return a ? wt(f) : f;
  }
  let u = n;
  o !== e4 && (a ? u = function(f, p) {
    return n.call(this, wt(f), p, e4);
  } : n.length > 2 && (u = function(f, p) {
    return n.call(this, f, p, e4);
  }));
  const c = l.call(o, u, r);
  return a && i ? i(c) : c;
}
function Ef(e4, t, n, r) {
  const i = Co(e4);
  let s = n;
  return i !== e4 && (tn(e4) ? n.length > 3 && (s = function(o, a, l) {
    return n.call(this, o, a, l, e4);
  }) : s = function(o, a, l) {
    return n.call(this, o, wt(a), l, e4);
  }), i[t](s, ...r);
}
function Ml(e4, t, n) {
  const r = Oe(e4);
  Rt(r, "iterate", es);
  const i = r[t](...n);
  return (i === -1 || i === false) && Il(n[0]) ? (n[0] = Oe(n[0]), r[t](...n)) : i;
}
function ts(e4, t, n = []) {
  On(), Cl();
  const r = Oe(e4)[t].apply(e4, n);
  return _l(), Pn(), r;
}
const Xk = yl("__proto__,__v_isRef,__isVue"), Af = new Set(Object.getOwnPropertyNames(Symbol).filter((e4) => e4 !== "arguments" && e4 !== "caller").map((e4) => Symbol[e4]).filter(hn));
function Jk(e4) {
  hn(e4) || (e4 = String(e4));
  const t = Oe(this);
  return Rt(t, "has", e4), t.hasOwnProperty(e4);
}
class Tf {
  constructor(t = false, n = false) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, r) {
    if (n === "__v_skip") return t.__v_skip;
    const i = this._isReadonly, s = this._isShallow;
    if (n === "__v_isReactive") return !i;
    if (n === "__v_isReadonly") return i;
    if (n === "__v_isShallow") return s;
    if (n === "__v_raw") return r === (i ? s ? xf : Pf : s ? Of : _f).get(t) || Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
    const o = de(t);
    if (!i) {
      let l;
      if (o && (l = Kk[n])) return l;
      if (n === "hasOwnProperty") return Jk;
    }
    const a = Reflect.get(t, n, rt(t) ? t : r);
    return (hn(n) ? Af.has(n) : Xk(n)) || (i || Rt(t, "get", n), s) ? a : rt(a) ? o && wl(n) ? a : a.value : We(a) ? i ? ai(a) : cr(a) : a;
  }
}
class Nf extends Tf {
  constructor(t = false) {
    super(false, t);
  }
  set(t, n, r, i) {
    let s = t[n];
    if (!this._isShallow) {
      const l = dr(s);
      if (!tn(r) && !dr(r) && (s = Oe(s), r = Oe(r)), !de(t) && rt(s) && !rt(r)) return l || (s.value = r), true;
    }
    const o = de(t) && wl(n) ? Number(n) < t.length : ze(t, n), a = Reflect.set(t, n, r, rt(t) ? t : i);
    return t === Oe(i) && (o ? Wt(r, s) && Gn(t, "set", n, r) : Gn(t, "add", n, r)), a;
  }
  deleteProperty(t, n) {
    const r = ze(t, n);
    t[n];
    const i = Reflect.deleteProperty(t, n);
    return i && r && Gn(t, "delete", n, void 0), i;
  }
  has(t, n) {
    const r = Reflect.has(t, n);
    return (!hn(n) || !Af.has(n)) && Rt(t, "has", n), r;
  }
  ownKeys(t) {
    return Rt(t, "iterate", de(t) ? "length" : jr), Reflect.ownKeys(t);
  }
}
class Cf extends Tf {
  constructor(t = false) {
    super(true, t);
  }
  set(t, n) {
    return true;
  }
  deleteProperty(t, n) {
    return true;
  }
}
const Qk = new Nf(), ew = new Cf(), tw = new Nf(true), nw = new Cf(true), jl = (e4) => e4, _o = (e4) => Reflect.getPrototypeOf(e4);
function rw(e4, t, n) {
  return function(...r) {
    const i = this.__v_raw, s = Oe(i), o = ii(s), a = e4 === "entries" || e4 === Symbol.iterator && o, l = e4 === "keys" && o, u = i[e4](...r), c = n ? jl : t ? Mo : wt;
    return !t && Rt(s, "iterate", l ? xl : jr), { next() {
      const { value: f, done: p } = u.next();
      return p ? { value: f, done: p } : { value: a ? [c(f[0]), c(f[1])] : c(f), done: p };
    }, [Symbol.iterator]() {
      return this;
    } };
  };
}
function Oo(e4) {
  return function(...t) {
    return e4 === "delete" ? false : e4 === "clear" ? void 0 : this;
  };
}
function iw(e4, t) {
  const n = { get(i) {
    const s = this.__v_raw, o = Oe(s), a = Oe(i);
    e4 || (Wt(i, a) && Rt(o, "get", i), Rt(o, "get", a));
    const { has: l } = _o(o), u = t ? jl : e4 ? Mo : wt;
    if (l.call(o, i)) return u(s.get(i));
    if (l.call(o, a)) return u(s.get(a));
    s !== o && s.get(i);
  }, get size() {
    const i = this.__v_raw;
    return !e4 && Rt(Oe(i), "iterate", jr), i.size;
  }, has(i) {
    const s = this.__v_raw, o = Oe(s), a = Oe(i);
    return e4 || (Wt(i, a) && Rt(o, "has", i), Rt(o, "has", a)), i === a ? s.has(i) : s.has(i) || s.has(a);
  }, forEach(i, s) {
    const o = this, a = o.__v_raw, l = Oe(a), u = t ? jl : e4 ? Mo : wt;
    return !e4 && Rt(l, "iterate", jr), a.forEach((c, f) => i.call(s, u(c), u(f), o));
  } };
  return ut(n, e4 ? { add: Oo("add"), set: Oo("set"), delete: Oo("delete"), clear: Oo("clear") } : { add(i) {
    !t && !tn(i) && !dr(i) && (i = Oe(i));
    const s = Oe(this);
    return _o(s).has.call(s, i) || (s.add(i), Gn(s, "add", i, i)), this;
  }, set(i, s) {
    !t && !tn(s) && !dr(s) && (s = Oe(s));
    const o = Oe(this), { has: a, get: l } = _o(o);
    let u = a.call(o, i);
    u || (i = Oe(i), u = a.call(o, i));
    const c = l.call(o, i);
    return o.set(i, s), u ? Wt(s, c) && Gn(o, "set", i, s) : Gn(o, "add", i, s), this;
  }, delete(i) {
    const s = Oe(this), { has: o, get: a } = _o(s);
    let l = o.call(s, i);
    l || (i = Oe(i), l = o.call(s, i)), a && a.call(s, i);
    const u = s.delete(i);
    return l && Gn(s, "delete", i, void 0), u;
  }, clear() {
    const i = Oe(this), s = i.size !== 0, o = i.clear();
    return s && Gn(i, "clear", void 0, void 0), o;
  } }), ["keys", "values", "entries", Symbol.iterator].forEach((i) => {
    n[i] = rw(i, e4, t);
  }), n;
}
function Po(e4, t) {
  const n = iw(e4, t);
  return (r, i, s) => i === "__v_isReactive" ? !e4 : i === "__v_isReadonly" ? e4 : i === "__v_raw" ? r : Reflect.get(ze(n, i) && i in r ? n : r, i, s);
}
const sw = { get: Po(false, false) }, ow = { get: Po(false, true) }, aw = { get: Po(true, false) }, lw = { get: Po(true, true) }, _f = /* @__PURE__ */ new WeakMap(), Of = /* @__PURE__ */ new WeakMap(), Pf = /* @__PURE__ */ new WeakMap(), xf = /* @__PURE__ */ new WeakMap();
function cw(e4) {
  switch (e4) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function uw(e4) {
  return e4.__v_skip || !Object.isExtensible(e4) ? 0 : cw(jk(e4));
}
function cr(e4) {
  return dr(e4) ? e4 : xo(e4, false, Qk, sw, _f);
}
function Rf(e4) {
  return xo(e4, false, tw, ow, Of);
}
function ai(e4) {
  return xo(e4, true, ew, aw, Pf);
}
function XR(e4) {
  return xo(e4, true, nw, lw, xf);
}
function xo(e4, t, n, r, i) {
  if (!We(e4) || e4.__v_raw && !(t && e4.__v_isReactive)) return e4;
  const s = uw(e4);
  if (s === 0) return e4;
  const o = i.get(e4);
  if (o) return o;
  const a = new Proxy(e4, s === 2 ? r : n);
  return i.set(e4, a), a;
}
function ur(e4) {
  return dr(e4) ? ur(e4.__v_raw) : !!(e4 && e4.__v_isReactive);
}
function dr(e4) {
  return !!(e4 && e4.__v_isReadonly);
}
function tn(e4) {
  return !!(e4 && e4.__v_isShallow);
}
function Il(e4) {
  return e4 ? !!e4.__v_raw : false;
}
function Oe(e4) {
  const t = e4 && e4.__v_raw;
  return t ? Oe(t) : e4;
}
function Ro(e4) {
  return !ze(e4, "__v_skip") && Object.isExtensible(e4) && lf(e4, "__v_skip", true), e4;
}
const wt = (e4) => We(e4) ? cr(e4) : e4, Mo = (e4) => We(e4) ? ai(e4) : e4;
function rt(e4) {
  return e4 ? e4.__v_isRef === true : false;
}
function Gt(e4) {
  return Mf(e4, false);
}
function Qe(e4) {
  return Mf(e4, true);
}
function Mf(e4, t) {
  return rt(e4) ? e4 : new dw(e4, t);
}
class dw {
  constructor(t, n) {
    this.dep = new To(), this.__v_isRef = true, this.__v_isShallow = false, this._rawValue = n ? t : Oe(t), this._value = n ? t : wt(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, r = this.__v_isShallow || tn(t) || dr(t);
    t = r ? t : Oe(t), Wt(t, n) && (this._rawValue = t, this._value = r ? t : wt(t), this.dep.trigger());
  }
}
function xn(e4) {
  return rt(e4) ? e4.value : e4;
}
function ot(e4) {
  return ge(e4) ? e4() : xn(e4);
}
const fw = { get: (e4, t, n) => t === "__v_raw" ? e4 : xn(Reflect.get(e4, t, n)), set: (e4, t, n, r) => {
  const i = e4[t];
  return rt(i) && !rt(n) ? (i.value = n, true) : Reflect.set(e4, t, n, r);
} };
function jf(e4) {
  return ur(e4) ? e4 : new Proxy(e4, fw);
}
class hw {
  constructor(t) {
    this.__v_isRef = true, this._value = void 0;
    const n = this.dep = new To(), { get: r, set: i } = t(n.track.bind(n), n.trigger.bind(n));
    this._get = r, this._set = i;
  }
  get value() {
    return this._value = this._get();
  }
  set value(t) {
    this._set(t);
  }
}
function Ll(e4) {
  return new hw(e4);
}
function vw(e4) {
  const t = de(e4) ? new Array(e4.length) : {};
  for (const n in e4) t[n] = If(e4, n);
  return t;
}
class pw {
  constructor(t, n, r) {
    this._object = t, this._key = n, this._defaultValue = r, this.__v_isRef = true, this._value = void 0;
  }
  get value() {
    const t = this._object[this._key];
    return this._value = t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
  get dep() {
    return Zk(Oe(this._object), this._key);
  }
}
class mw {
  constructor(t) {
    this._getter = t, this.__v_isRef = true, this.__v_isReadonly = true, this._value = void 0;
  }
  get value() {
    return this._value = this._getter();
  }
}
function Fl(e4, t, n) {
  return rt(e4) ? e4 : ge(e4) ? new mw(e4) : We(e4) && arguments.length > 1 ? If(e4, t, n) : Gt(e4);
}
function If(e4, t, n) {
  const r = e4[t];
  return rt(r) ? r : new pw(e4, t, n);
}
class gw {
  constructor(t, n, r) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new To(this), this.__v_isRef = true, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Qi - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = r;
  }
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && Ye !== this) return mf(this, true), true;
  }
  get value() {
    const t = this.dep.track();
    return bf(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
function yw(e4, t, n = false) {
  let r, i;
  return ge(e4) ? r = e4 : (r = e4.get, i = e4.set), new gw(r, i, n);
}
const jo = {}, Io = /* @__PURE__ */ new WeakMap();
let Ir;
function bw(e4, t = false, n = Ir) {
  if (n) {
    let r = Io.get(n);
    r || Io.set(n, r = []), r.push(e4);
  }
}
function kw(e4, t, n = Fe) {
  const { immediate: r, deep: i, once: s, scheduler: o, augmentJob: a, call: l } = n, u = (x) => i ? x : tn(x) || i === false || i === 0 ? Kn(x, 1) : Kn(x);
  let c, f, p, v, m = false, y = false;
  if (rt(e4) ? (f = () => e4.value, m = tn(e4)) : ur(e4) ? (f = () => u(e4), m = true) : de(e4) ? (y = true, m = e4.some((x) => ur(x) || tn(x)), f = () => e4.map((x) => {
    if (rt(x)) return x.value;
    if (ur(x)) return u(x);
    if (ge(x)) return l ? l(x, 2) : x();
  })) : ge(e4) ? t ? f = l ? () => l(e4, 2) : e4 : f = () => {
    if (p) {
      On();
      try {
        p();
      } finally {
        Pn();
      }
    }
    const x = Ir;
    Ir = c;
    try {
      return l ? l(e4, 3, [v]) : e4(v);
    } finally {
      Ir = x;
    }
  } : f = en, t && i) {
    const x = f, F = i === true ? 1 / 0 : i;
    f = () => Kn(x(), F);
  }
  const k = Ao(), E = () => {
    c.stop(), k && k.active && kl(k.effects, c);
  };
  if (s && t) {
    const x = t;
    t = (...F) => {
      x(...F), E();
    };
  }
  let A = y ? new Array(e4.length).fill(jo) : jo;
  const C = (x) => {
    if (!(!(c.flags & 1) || !c.dirty && !x)) if (t) {
      const F = c.run();
      if (i || m || (y ? F.some((Y, U) => Wt(Y, A[U])) : Wt(F, A))) {
        p && p();
        const Y = Ir;
        Ir = c;
        try {
          const U = [F, A === jo ? void 0 : y && A[0] === jo ? [] : A, v];
          A = F, l ? l(t, 3, U) : t(...U);
        } finally {
          Ir = Y;
        }
      }
    } else c.run();
  };
  return a && a(C), c = new vf(f), c.scheduler = o ? () => o(C, false) : C, v = (x) => bw(x, false, c), p = c.onStop = () => {
    const x = Io.get(c);
    if (x) {
      if (l) l(x, 4);
      else for (const F of x) F();
      Io.delete(c);
    }
  }, t ? r ? C(true) : A = c.run() : o ? o(C.bind(null, true), true) : c.run(), E.pause = c.pause.bind(c), E.resume = c.resume.bind(c), E.stop = E, E;
}
function Kn(e4, t = 1 / 0, n) {
  if (t <= 0 || !We(e4) || e4.__v_skip || (n = n || /* @__PURE__ */ new Set(), n.has(e4))) return e4;
  if (n.add(e4), t--, rt(e4)) Kn(e4.value, t, n);
  else if (de(e4)) for (let r = 0; r < e4.length; r++) Kn(e4[r], t, n);
  else if (si(e4) || ii(e4)) e4.forEach((r) => {
    Kn(r, t, n);
  });
  else if (af(e4)) {
    for (const r in e4) Kn(e4[r], t, n);
    for (const r of Object.getOwnPropertySymbols(e4)) Object.prototype.propertyIsEnumerable.call(e4, r) && Kn(e4[r], t, n);
  }
  return e4;
}
const ns = [];
let Dl = false;
function JR(e4, ...t) {
  if (Dl) return;
  Dl = true, On();
  const n = ns.length ? ns[ns.length - 1].component : null, r = n && n.appContext.config.warnHandler, i = ww();
  if (r) li(r, n, 11, [e4 + t.map((s) => {
    var o, a;
    return (a = (o = s.toString) == null ? void 0 : o.call(s)) != null ? a : JSON.stringify(s);
  }).join(""), n && n.proxy, i.map(({ vnode: s }) => `at <${Zh(n, s.type)}>`).join(`
`), i]);
  else {
    const s = [`[Vue warn]: ${e4}`, ...t];
    i.length && s.push(`
`, ...Sw(i)), console.warn(...s);
  }
  Pn(), Dl = false;
}
function ww() {
  let e4 = ns[ns.length - 1];
  if (!e4) return [];
  const t = [];
  for (; e4; ) {
    const n = t[0];
    n && n.vnode === e4 ? n.recurseCount++ : t.push({ vnode: e4, recurseCount: 0 });
    const r = e4.component && e4.component.parent;
    e4 = r && r.vnode;
  }
  return t;
}
function Sw(e4) {
  const t = [];
  return e4.forEach((n, r) => {
    t.push(...r === 0 ? [] : [`
`], ...Ew(n));
  }), t;
}
function Ew({ vnode: e4, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", r = e4.component ? e4.component.parent == null : false, i = ` at <${Zh(e4.component, e4.type, r)}`, s = ">" + n;
  return e4.props ? [i, ...Aw(e4.props), s] : [i + s];
}
function Aw(e4) {
  const t = [], n = Object.keys(e4);
  return n.slice(0, 3).forEach((r) => {
    t.push(...Lf(r, e4[r]));
  }), n.length > 3 && t.push(" ..."), t;
}
function Lf(e4, t, n) {
  return Je(t) ? (t = JSON.stringify(t), n ? t : [`${e4}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e4}=${t}`] : rt(t) ? (t = Lf(e4, Oe(t.value), true), n ? t : [`${e4}=Ref<`, t, ">"]) : ge(t) ? [`${e4}=fn${t.name ? `<${t.name}>` : ""}`] : (t = Oe(t), n ? t : [`${e4}=`, t]);
}
function li(e4, t, n, r) {
  try {
    return r ? e4(...r) : e4();
  } catch (i) {
    rs(i, t, n);
  }
}
function pn(e4, t, n, r) {
  if (ge(e4)) {
    const i = li(e4, t, n, r);
    return i && sf(i) && i.catch((s) => {
      rs(s, t, n);
    }), i;
  }
  if (de(e4)) {
    const i = [];
    for (let s = 0; s < e4.length; s++) i.push(pn(e4[s], t, n, r));
    return i;
  }
}
function rs(e4, t, n, r = true) {
  const i = t ? t.vnode : null, { errorHandler: s, throwUnhandledErrorInProduction: o } = t && t.appContext.config || Fe;
  if (t) {
    let a = t.parent;
    const l = t.proxy, u = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; a; ) {
      const c = a.ec;
      if (c) {
        for (let f = 0; f < c.length; f++) if (c[f](e4, l, u) === false) return;
      }
      a = a.parent;
    }
    if (s) {
      On(), li(s, null, 10, [e4, l, u]), Pn();
      return;
    }
  }
  Tw(e4, n, i, r, o);
}
function Tw(e4, t, n, r = true, i = false) {
  if (i) throw e4;
  console.error(e4);
}
const Ft = [];
let Rn = -1;
const ci = [];
let fr = null, ui = 0;
const Ff = Promise.resolve();
let Lo = null;
function Lr(e4) {
  const t = Lo || Ff;
  return e4 ? t.then(this ? e4.bind(this) : e4) : t;
}
function Nw(e4) {
  let t = Rn + 1, n = Ft.length;
  for (; t < n; ) {
    const r = t + n >>> 1, i = Ft[r], s = is(i);
    s < e4 || s === e4 && i.flags & 2 ? t = r + 1 : n = r;
  }
  return t;
}
function Bl(e4) {
  if (!(e4.flags & 1)) {
    const t = is(e4), n = Ft[Ft.length - 1];
    !n || !(e4.flags & 2) && t >= is(n) ? Ft.push(e4) : Ft.splice(Nw(t), 0, e4), e4.flags |= 1, Df();
  }
}
function Df() {
  Lo || (Lo = Ff.then(Uf));
}
function Bf(e4) {
  de(e4) ? ci.push(...e4) : fr && e4.id === -1 ? fr.splice(ui + 1, 0, e4) : e4.flags & 1 || (ci.push(e4), e4.flags |= 1), Df();
}
function zf(e4, t, n = Rn + 1) {
  for (; n < Ft.length; n++) {
    const r = Ft[n];
    if (r && r.flags & 2) {
      if (e4 && r.id !== e4.uid) continue;
      Ft.splice(n, 1), n--, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2);
    }
  }
}
function $f(e4) {
  if (ci.length) {
    const t = [...new Set(ci)].sort((n, r) => is(n) - is(r));
    if (ci.length = 0, fr) {
      fr.push(...t);
      return;
    }
    for (fr = t, ui = 0; ui < fr.length; ui++) {
      const n = fr[ui];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    fr = null, ui = 0;
  }
}
const is = (e4) => e4.id == null ? e4.flags & 2 ? -1 : 1 / 0 : e4.id;
function Uf(e4) {
  try {
    for (Rn = 0; Rn < Ft.length; Rn++) {
      const t = Ft[Rn];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), li(t, t.i, t.i ? 15 : 14), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Rn < Ft.length; Rn++) {
      const t = Ft[Rn];
      t && (t.flags &= -2);
    }
    Rn = -1, Ft.length = 0, $f(), Lo = null, (Ft.length || ci.length) && Uf();
  }
}
let St = null, Fo = null;
function Do(e4) {
  const t = St;
  return St = e4, Fo = e4 && e4.type.__scopeId || null, t;
}
function Cw(e4) {
  Fo = e4;
}
function _w() {
  Fo = null;
}
const Ow = (e4) => et;
function et(e4, t = St, n) {
  if (!t || e4._n) return e4;
  const r = (...i) => {
    r._d && Bh(-1);
    const s = Do(t);
    let o;
    try {
      o = e4(...i);
    } finally {
      Do(s), r._d && Bh(1);
    }
    return o;
  };
  return r._n = true, r._c = true, r._d = true, r;
}
function di(e4, t) {
  if (St === null) return e4;
  const n = Xo(St), r = e4.dirs || (e4.dirs = []);
  for (let i = 0; i < t.length; i++) {
    let [s, o, a, l = Fe] = t[i];
    s && (ge(s) && (s = { mounted: s, updated: s }), s.deep && Kn(o), r.push({ dir: s, instance: n, value: o, oldValue: void 0, arg: a, modifiers: l }));
  }
  return e4;
}
function Fr(e4, t, n, r) {
  const i = e4.dirs, s = t && t.dirs;
  for (let o = 0; o < i.length; o++) {
    const a = i[o];
    s && (a.oldValue = s[o].value);
    let l = a.dir[r];
    l && (On(), pn(l, n, 8, [e4.el, a, e4, t]), Pn());
  }
}
const Vf = Symbol("_vte"), Hf = (e4) => e4.__isTeleport, ss = (e4) => e4 && (e4.disabled || e4.disabled === ""), qf = (e4) => e4 && (e4.defer || e4.defer === ""), Wf = (e4) => typeof SVGElement < "u" && e4 instanceof SVGElement, Gf = (e4) => typeof MathMLElement == "function" && e4 instanceof MathMLElement, zl = (e4, t) => {
  const n = e4 && e4.to;
  return Je(n) ? t ? t(n) : null : n;
}, Zf = { name: "Teleport", __isTeleport: true, process(e4, t, n, r, i, s, o, a, l, u) {
  const { mc: c, pc: f, pbc: p, o: { insert: v, querySelector: m, createText: y, createComment: k } } = u, E = ss(t.props);
  let { shapeFlag: A, children: C, dynamicChildren: x } = t;
  if (e4 == null) {
    const F = t.el = y(""), Y = t.anchor = y("");
    v(F, n, r), v(Y, n, r);
    const U = (M, q) => {
      A & 16 && (i && i.isCE && (i.ce._teleportTarget = M), c(C, M, q, i, s, o, a, l));
    }, V = () => {
      const M = t.target = zl(t.props, m), q = Kf(M, t, y, v);
      M && (o !== "svg" && Wf(M) ? o = "svg" : o !== "mathml" && Gf(M) && (o = "mathml"), E || (U(M, q), zo(t, false)));
    };
    E && (U(n, Y), zo(t, true)), qf(t.props) ? (t.el.__isMounted = false, Bt(() => {
      V(), delete t.el.__isMounted;
    }, s)) : V();
  } else {
    if (qf(t.props) && e4.el.__isMounted === false) {
      Bt(() => {
        Zf.process(e4, t, n, r, i, s, o, a, l, u);
      }, s);
      return;
    }
    t.el = e4.el, t.targetStart = e4.targetStart;
    const F = t.anchor = e4.anchor, Y = t.target = e4.target, U = t.targetAnchor = e4.targetAnchor, V = ss(e4.props), M = V ? n : Y, q = V ? F : U;
    if (o === "svg" || Wf(Y) ? o = "svg" : (o === "mathml" || Gf(Y)) && (o = "mathml"), x ? (p(e4.dynamicChildren, x, M, i, s, o, a), oc(e4, t, true)) : l || f(e4, t, M, q, i, s, o, a, false), E) V ? t.props && e4.props && t.props.to !== e4.props.to && (t.props.to = e4.props.to) : Bo(t, n, F, u, 1);
    else if ((t.props && t.props.to) !== (e4.props && e4.props.to)) {
      const Q = t.target = zl(t.props, m);
      Q && Bo(t, Q, null, u, 0);
    } else V && Bo(t, Y, U, u, 1);
    zo(t, E);
  }
}, remove(e4, t, n, { um: r, o: { remove: i } }, s) {
  const { shapeFlag: o, children: a, anchor: l, targetStart: u, targetAnchor: c, target: f, props: p } = e4;
  if (f && (i(u), i(c)), s && i(l), o & 16) {
    const v = s || !ss(p);
    for (let m = 0; m < a.length; m++) {
      const y = a[m];
      r(y, t, n, v, !!y.dynamicChildren);
    }
  }
}, move: Bo, hydrate: Pw };
function Bo(e4, t, n, { o: { insert: r }, m: i }, s = 2) {
  s === 0 && r(e4.targetAnchor, t, n);
  const { el: o, anchor: a, shapeFlag: l, children: u, props: c } = e4, f = s === 2;
  if (f && r(o, t, n), (!f || ss(c)) && l & 16) for (let p = 0; p < u.length; p++) i(u[p], t, n, 2);
  f && r(a, t, n);
}
function Pw(e4, t, n, r, i, s, { o: { nextSibling: o, parentNode: a, querySelector: l, insert: u, createText: c } }, f) {
  const p = t.target = zl(t.props, l);
  if (p) {
    const v = ss(t.props), m = p._lpa || p.firstChild;
    if (t.shapeFlag & 16) if (v) t.anchor = f(o(e4), t, a(e4), n, r, i, s), t.targetStart = m, t.targetAnchor = m && o(m);
    else {
      t.anchor = o(e4);
      let y = m;
      for (; y; ) {
        if (y && y.nodeType === 8) {
          if (y.data === "teleport start anchor") t.targetStart = y;
          else if (y.data === "teleport anchor") {
            t.targetAnchor = y, p._lpa = t.targetAnchor && o(t.targetAnchor);
            break;
          }
        }
        y = o(y);
      }
      t.targetAnchor || Kf(p, t, c, u), f(m && o(m), t, p, n, r, i, s);
    }
    zo(t, v);
  }
  return t.anchor && o(t.anchor);
}
const xw = Zf;
function zo(e4, t) {
  const n = e4.ctx;
  if (n && n.ut) {
    let r, i;
    for (t ? (r = e4.el, i = e4.anchor) : (r = e4.targetStart, i = e4.targetAnchor); r && r !== i; ) r.nodeType === 1 && r.setAttribute("data-v-owner", n.uid), r = r.nextSibling;
    n.ut();
  }
}
function Kf(e4, t, n, r) {
  const i = t.targetStart = n(""), s = t.targetAnchor = n("");
  return i[Vf] = s, e4 && (r(i, e4), r(s, e4)), s;
}
const Yn = Symbol("_leaveCb"), $o = Symbol("_enterCb");
function Yf() {
  const e4 = { isMounted: false, isLeaving: false, isUnmounting: false, leavingVNodes: /* @__PURE__ */ new Map() };
  return hi(() => {
    e4.isMounted = true;
  }), Wl(() => {
    e4.isUnmounting = true;
  }), e4;
}
const nn = [Function, Array], Xf = { mode: String, appear: Boolean, persisted: Boolean, onBeforeEnter: nn, onEnter: nn, onAfterEnter: nn, onEnterCancelled: nn, onBeforeLeave: nn, onLeave: nn, onAfterLeave: nn, onLeaveCancelled: nn, onBeforeAppear: nn, onAppear: nn, onAfterAppear: nn, onAppearCancelled: nn }, Jf = (e4) => {
  const t = e4.subTree;
  return t.component ? Jf(t.component) : t;
}, Rw = { name: "BaseTransition", props: Xf, setup(e4, { slots: t }) {
  const n = rn(), r = Yf();
  return () => {
    const i = t.default && Ul(t.default(), true);
    if (!i || !i.length) return;
    const s = Qf(i), o = Oe(e4), { mode: a } = o;
    if (r.isLeaving) return $l(s);
    const l = th(s);
    if (!l) return $l(s);
    let u = os(l, o, r, n, (f) => u = f);
    l.type !== Et && Dr(l, u);
    let c = n.subTree && th(n.subTree);
    if (c && c.type !== Et && !$r(l, c) && Jf(n).type !== Et) {
      let f = os(c, o, r, n);
      if (Dr(c, f), a === "out-in" && l.type !== Et) return r.isLeaving = true, f.afterLeave = () => {
        r.isLeaving = false, n.job.flags & 8 || n.update(), delete f.afterLeave, c = void 0;
      }, $l(s);
      a === "in-out" && l.type !== Et ? f.delayLeave = (p, v, m) => {
        const y = eh(r, c);
        y[String(c.key)] = c, p[Yn] = () => {
          v(), p[Yn] = void 0, delete u.delayedLeave, c = void 0;
        }, u.delayedLeave = () => {
          m(), delete u.delayedLeave, c = void 0;
        };
      } : c = void 0;
    } else c && (c = void 0);
    return s;
  };
} };
function Qf(e4) {
  let t = e4[0];
  if (e4.length > 1) {
    for (const n of e4) if (n.type !== Et) {
      t = n;
      break;
    }
  }
  return t;
}
const Mw = Rw;
function eh(e4, t) {
  const { leavingVNodes: n } = e4;
  let r = n.get(t.type);
  return r || (r = /* @__PURE__ */ Object.create(null), n.set(t.type, r)), r;
}
function os(e4, t, n, r, i) {
  const { appear: s, mode: o, persisted: a = false, onBeforeEnter: l, onEnter: u, onAfterEnter: c, onEnterCancelled: f, onBeforeLeave: p, onLeave: v, onAfterLeave: m, onLeaveCancelled: y, onBeforeAppear: k, onAppear: E, onAfterAppear: A, onAppearCancelled: C } = t, x = String(e4.key), F = eh(n, e4), Y = (M, q) => {
    M && pn(M, r, 9, q);
  }, U = (M, q) => {
    const Q = q[1];
    Y(M, q), de(M) ? M.every((z) => z.length <= 1) && Q() : M.length <= 1 && Q();
  }, V = { mode: o, persisted: a, beforeEnter(M) {
    let q = l;
    if (!n.isMounted) if (s) q = k || l;
    else return;
    M[Yn] && M[Yn](true);
    const Q = F[x];
    Q && $r(e4, Q) && Q.el[Yn] && Q.el[Yn](), Y(q, [M]);
  }, enter(M) {
    let q = u, Q = c, z = f;
    if (!n.isMounted) if (s) q = E || u, Q = A || c, z = C || f;
    else return;
    let O = false;
    const j = M[$o] = (X) => {
      O || (O = true, X ? Y(z, [M]) : Y(Q, [M]), V.delayedLeave && V.delayedLeave(), M[$o] = void 0);
    };
    q ? U(q, [M, j]) : j();
  }, leave(M, q) {
    const Q = String(e4.key);
    if (M[$o] && M[$o](true), n.isUnmounting) return q();
    Y(p, [M]);
    let z = false;
    const O = M[Yn] = (j) => {
      z || (z = true, q(), j ? Y(y, [M]) : Y(m, [M]), M[Yn] = void 0, F[Q] === e4 && delete F[Q]);
    };
    F[Q] = e4, v ? U(v, [M, O]) : O();
  }, clone(M) {
    const q = os(M, t, n, r, i);
    return i && i(q), q;
  } };
  return V;
}
function $l(e4) {
  if (ls(e4)) return e4 = hr(e4), e4.children = null, e4;
}
function th(e4) {
  if (!ls(e4)) return Hf(e4.type) && e4.children ? Qf(e4.children) : e4;
  if (e4.component) return e4.component.subTree;
  const { shapeFlag: t, children: n } = e4;
  if (n) {
    if (t & 16) return n[0];
    if (t & 32 && ge(n.default)) return n.default();
  }
}
function Dr(e4, t) {
  e4.shapeFlag & 6 && e4.component ? (e4.transition = t, Dr(e4.component.subTree, t)) : e4.shapeFlag & 128 ? (e4.ssContent.transition = t.clone(e4.ssContent), e4.ssFallback.transition = t.clone(e4.ssFallback)) : e4.transition = t;
}
function Ul(e4, t = false, n) {
  let r = [], i = 0;
  for (let s = 0; s < e4.length; s++) {
    let o = e4[s];
    const a = n == null ? o.key : String(n) + String(o.key != null ? o.key : s);
    o.type === ht ? (o.patchFlag & 128 && i++, r = r.concat(Ul(o.children, t, a))) : (t || o.type !== Et) && r.push(a != null ? hr(o, { key: a }) : o);
  }
  if (i > 1) for (let s = 0; s < r.length; s++) r[s].patchFlag = -2;
  return r;
}
function Zt(e4, t) {
  return ge(e4) ? ut({ name: e4.name }, t, { setup: e4 }) : e4;
}
function Vl(e4) {
  e4.ids = [e4.ids[0] + e4.ids[2]++ + "-", 0, 0];
}
function jw(e4) {
  const t = rn(), n = Qe(null);
  if (t) {
    const i = t.refs === Fe ? t.refs = {} : t.refs;
    Object.defineProperty(i, e4, { enumerable: true, get: () => n.value, set: (s) => n.value = s });
  }
  return n;
}
function as(e4, t, n, r, i = false) {
  if (de(e4)) {
    e4.forEach((m, y) => as(m, t && (de(t) ? t[y] : t), n, r, i));
    return;
  }
  if (fi(r) && !i) {
    r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && as(e4, t, n, r.component.subTree);
    return;
  }
  const s = r.shapeFlag & 4 ? Xo(r.component) : r.el, o = i ? null : s, { i: a, r: l } = e4, u = t && t.r, c = a.refs === Fe ? a.refs = {} : a.refs, f = a.setupState, p = Oe(f), v = f === Fe ? nf : (m) => ze(p, m);
  if (u != null && u !== l) {
    if (Je(u)) c[u] = null, v(u) && (f[u] = null);
    else if (rt(u)) {
      u.value = null;
      const m = t;
      m.k && (c[m.k] = null);
    }
  }
  if (ge(l)) li(l, a, 12, [o, c]);
  else {
    const m = Je(l), y = rt(l);
    if (m || y) {
      const k = () => {
        if (e4.f) {
          const E = m ? v(l) ? f[l] : c[l] : l.value;
          if (i) de(E) && kl(E, s);
          else if (de(E)) E.includes(s) || E.push(s);
          else if (m) c[l] = [s], v(l) && (f[l] = c[l]);
          else {
            const A = [s];
            l.value = A, e4.k && (c[e4.k] = A);
          }
        } else m ? (c[l] = o, v(l) && (f[l] = o)) : y && (l.value = o, e4.k && (c[e4.k] = o));
      };
      o ? (k.id = -1, Bt(k, n)) : k();
    }
  }
}
const nh = (e4) => e4.nodeType === 8;
So().requestIdleCallback, So().cancelIdleCallback;
function Iw(e4, t) {
  if (nh(e4) && e4.data === "[") {
    let n = 1, r = e4.nextSibling;
    for (; r; ) {
      if (r.nodeType === 1) {
        if (t(r) === false) break;
      } else if (nh(r)) if (r.data === "]") {
        if (--n === 0) break;
      } else r.data === "[" && n++;
      r = r.nextSibling;
    }
  } else t(e4);
}
const fi = (e4) => !!e4.type.__asyncLoader;
function Lw(e4) {
  ge(e4) && (e4 = { loader: e4 });
  const { loader: t, loadingComponent: n, errorComponent: r, delay: i = 200, hydrate: s, timeout: o, suspensible: a = true, onError: l } = e4;
  let u = null, c, f = 0;
  const p = () => (f++, u = null, v()), v = () => {
    let m;
    return u || (m = u = t().catch((y) => {
      if (y = y instanceof Error ? y : new Error(String(y)), l) return new Promise((k, E) => {
        l(y, () => k(p()), () => E(y), f + 1);
      });
      throw y;
    }).then((y) => m !== u && u ? u : (y && (y.__esModule || y[Symbol.toStringTag] === "Module") && (y = y.default), c = y, y)));
  };
  return Zt({ name: "AsyncComponentWrapper", __asyncLoader: v, __asyncHydrate(m, y, k) {
    let E = false;
    (y.bu || (y.bu = [])).push(() => E = true);
    const A = () => {
      E || k();
    }, C = s ? () => {
      const x = s(A, (F) => Iw(m, F));
      x && (y.bum || (y.bum = [])).push(x);
    } : A;
    c ? C() : v().then(() => !y.isUnmounted && C());
  }, get __asyncResolved() {
    return c;
  }, setup() {
    const m = At;
    if (Vl(m), c) return () => Hl(c, m);
    const y = (C) => {
      u = null, rs(C, m, 13, !r);
    };
    if (a && m.suspense || pi) return v().then((C) => () => Hl(C, m)).catch((C) => (y(C), () => r ? xe(r, { error: C }) : null));
    const k = Gt(false), E = Gt(), A = Gt(!!i);
    return i && setTimeout(() => {
      A.value = false;
    }, i), o != null && setTimeout(() => {
      if (!k.value && !E.value) {
        const C = new Error(`Async component timed out after ${o}ms.`);
        y(C), E.value = C;
      }
    }, o), v().then(() => {
      k.value = true, m.parent && ls(m.parent.vnode) && m.parent.update();
    }).catch((C) => {
      y(C), E.value = C;
    }), () => {
      if (k.value && c) return Hl(c, m);
      if (E.value && r) return xe(r, { error: E.value });
      if (n && !A.value) return xe(n);
    };
  } });
}
function Hl(e4, t) {
  const { ref: n, props: r, children: i, ce: s } = t.vnode, o = xe(e4, r, i);
  return o.ref = n, o.ce = s, delete t.vnode.ce, o;
}
const ls = (e4) => e4.type.__isKeepAlive;
function rh(e4, t) {
  sh(e4, "a", t);
}
function ih(e4, t) {
  sh(e4, "da", t);
}
function sh(e4, t, n = At) {
  const r = e4.__wdc || (e4.__wdc = () => {
    let i = n;
    for (; i; ) {
      if (i.isDeactivated) return;
      i = i.parent;
    }
    return e4();
  });
  if (Uo(t, r, n), n) {
    let i = n.parent;
    for (; i && i.parent; ) ls(i.parent.vnode) && Fw(r, t, n, i), i = i.parent;
  }
}
function Fw(e4, t, n, r) {
  const i = Uo(t, e4, r, true);
  vi(() => {
    kl(r[t], i);
  }, n);
}
function Uo(e4, t, n = At, r = false) {
  if (n) {
    const i = n[e4] || (n[e4] = []), s = t.__weh || (t.__weh = (...o) => {
      On();
      const a = gs(n), l = pn(t, n, e4, o);
      return a(), Pn(), l;
    });
    return r ? i.unshift(s) : i.push(s), s;
  }
}
const Xn = (e4) => (t, n = At) => {
  (!pi || e4 === "sp") && Uo(e4, (...r) => t(...r), n);
}, oh = Xn("bm"), hi = Xn("m"), ql = Xn("bu"), ah = Xn("u"), Wl = Xn("bum"), vi = Xn("um"), Dw = Xn("sp"), Bw = Xn("rtg"), zw = Xn("rtc");
function $w(e4, t = At) {
  Uo("ec", e4, t);
}
const Gl = "components", Uw = "directives";
function dt(e4, t) {
  return Kl(Gl, e4, true, t) || e4;
}
const lh = Symbol.for("v-ndc");
function Zl(e4) {
  return Je(e4) ? Kl(Gl, e4, false) || e4 : e4 || lh;
}
function ch(e4) {
  return Kl(Uw, e4);
}
function Kl(e4, t, n = true, r = false) {
  const i = St || At;
  if (i) {
    const s = i.type;
    if (e4 === Gl) {
      const a = Gh(s, false);
      if (a && (a === t || a === Xt(t) || a === yo(Xt(t)))) return s;
    }
    const o = uh(i[e4] || s[e4], t) || uh(i.appContext[e4], t);
    return !o && r ? s : o;
  }
}
function uh(e4, t) {
  return e4 && (e4[t] || e4[Xt(t)] || e4[yo(Xt(t))]);
}
function dh(e4, t, n, r) {
  let i;
  const s = n, o = de(e4);
  if (o || Je(e4)) {
    const a = o && ur(e4);
    let l = false, u = false;
    a && (l = !tn(e4), u = dr(e4), e4 = Co(e4)), i = new Array(e4.length);
    for (let c = 0, f = e4.length; c < f; c++) i[c] = t(l ? u ? Mo(wt(e4[c])) : wt(e4[c]) : e4[c], c, void 0, s);
  } else if (typeof e4 == "number") {
    i = new Array(e4);
    for (let a = 0; a < e4; a++) i[a] = t(a + 1, a, void 0, s);
  } else if (We(e4)) if (e4[Symbol.iterator]) i = Array.from(e4, (a, l) => t(a, l, void 0, s));
  else {
    const a = Object.keys(e4);
    i = new Array(a.length);
    for (let l = 0, u = a.length; l < u; l++) {
      const c = a[l];
      i[l] = t(e4[c], c, l, s);
    }
  }
  else i = [];
  return i;
}
function Yl(e4, t) {
  for (let n = 0; n < t.length; n++) {
    const r = t[n];
    if (de(r)) for (let i = 0; i < r.length; i++) e4[r[i].name] = r[i].fn;
    else r && (e4[r.name] = r.key ? (...i) => {
      const s = r.fn(...i);
      return s && (s.key = r.key), s;
    } : r.fn);
  }
  return e4;
}
function Mt(e4, t, n = {}, r, i) {
  if (St.ce || St.parent && fi(St.parent) && St.parent.ce) return t !== "default" && (n.name = t), oe(), at(ht, null, [xe("slot", n, r && r())], 64);
  let s = e4[t];
  s && s._c && (s._d = false), oe();
  const o = s && fh(s(n)), a = n.key || o && o.key, l = at(ht, { key: (a && !hn(a) ? a : `_${t}`) + (!o && r ? "_fb" : "") }, o || (r ? r() : []), o && e4._ === 1 ? 64 : -2);
  return !i && l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]), s && s._c && (s._d = true), l;
}
function fh(e4) {
  return e4.some((t) => ps(t) ? !(t.type === Et || t.type === ht && !fh(t.children)) : true) ? e4 : null;
}
function Vw(e4, t) {
  const n = {};
  for (const r in e4) n[t && /[A-Z]/.test(r) ? `on:${r}` : bo(r)] = e4[r];
  return n;
}
const Xl = (e4) => e4 ? Vh(e4) ? Xo(e4) : Xl(e4.parent) : null, cs = ut(/* @__PURE__ */ Object.create(null), { $: (e4) => e4, $el: (e4) => e4.vnode.el, $data: (e4) => e4.data, $props: (e4) => e4.props, $attrs: (e4) => e4.attrs, $slots: (e4) => e4.slots, $refs: (e4) => e4.refs, $parent: (e4) => Xl(e4.parent), $root: (e4) => Xl(e4.root), $host: (e4) => e4.ce, $emit: (e4) => e4.emit, $options: (e4) => gh(e4), $forceUpdate: (e4) => e4.f || (e4.f = () => {
  Bl(e4.update);
}), $nextTick: (e4) => e4.n || (e4.n = Lr.bind(e4.proxy)), $watch: (e4) => hS.bind(e4) }), Jl = (e4, t) => e4 !== Fe && !e4.__isScriptSetup && ze(e4, t), Hw = { get({ _: e4 }, t) {
  if (t === "__v_skip") return true;
  const { ctx: n, setupState: r, data: i, props: s, accessCache: o, type: a, appContext: l } = e4;
  let u;
  if (t[0] !== "$") {
    const v = o[t];
    if (v !== void 0) switch (v) {
      case 1:
        return r[t];
      case 2:
        return i[t];
      case 4:
        return n[t];
      case 3:
        return s[t];
    }
    else {
      if (Jl(r, t)) return o[t] = 1, r[t];
      if (i !== Fe && ze(i, t)) return o[t] = 2, i[t];
      if ((u = e4.propsOptions[0]) && ze(u, t)) return o[t] = 3, s[t];
      if (n !== Fe && ze(n, t)) return o[t] = 4, n[t];
      Ql && (o[t] = 0);
    }
  }
  const c = cs[t];
  let f, p;
  if (c) return t === "$attrs" && Rt(e4.attrs, "get", ""), c(e4);
  if ((f = a.__cssModules) && (f = f[t])) return f;
  if (n !== Fe && ze(n, t)) return o[t] = 4, n[t];
  if (p = l.config.globalProperties, ze(p, t)) return p[t];
}, set({ _: e4 }, t, n) {
  const { data: r, setupState: i, ctx: s } = e4;
  return Jl(i, t) ? (i[t] = n, true) : r !== Fe && ze(r, t) ? (r[t] = n, true) : ze(e4.props, t) || t[0] === "$" && t.slice(1) in e4 ? false : (s[t] = n, true);
}, has({ _: { data: e4, setupState: t, accessCache: n, ctx: r, appContext: i, propsOptions: s, type: o } }, a) {
  let l, u;
  return !!(n[a] || e4 !== Fe && a[0] !== "$" && ze(e4, a) || Jl(t, a) || (l = s[0]) && ze(l, a) || ze(r, a) || ze(cs, a) || ze(i.config.globalProperties, a) || (u = o.__cssModules) && u[a]);
}, defineProperty(e4, t, n) {
  return n.get != null ? e4._.accessCache[t] = 0 : ze(n, "value") && this.set(e4, t, n.value, null), Reflect.defineProperty(e4, t, n);
} };
function qw() {
  return hh().slots;
}
function Ww() {
  return hh().attrs;
}
function hh(e4) {
  const t = rn();
  return t.setupContext || (t.setupContext = Wh(t));
}
function Vo(e4) {
  return de(e4) ? e4.reduce((t, n) => (t[n] = null, t), {}) : e4;
}
function vh(e4, t) {
  return !e4 || !t ? e4 || t : de(e4) && de(t) ? e4.concat(t) : ut({}, Vo(e4), Vo(t));
}
let Ql = true;
function Gw(e4) {
  const t = gh(e4), n = e4.proxy, r = e4.ctx;
  Ql = false, t.beforeCreate && ph(t.beforeCreate, e4, "bc");
  const { data: i, computed: s, methods: o, watch: a, provide: l, inject: u, created: c, beforeMount: f, mounted: p, beforeUpdate: v, updated: m, activated: y, deactivated: k, beforeDestroy: E, beforeUnmount: A, destroyed: C, unmounted: x, render: F, renderTracked: Y, renderTriggered: U, errorCaptured: V, serverPrefetch: M, expose: q, inheritAttrs: Q, components: z, directives: O, filters: j } = t;
  if (u && Zw(u, r, null), o) for (const G in o) {
    const se = o[G];
    ge(se) && (r[G] = se.bind(n));
  }
  if (i) {
    const G = i.call(n, n);
    We(G) && (e4.data = cr(G));
  }
  if (Ql = true, s) for (const G in s) {
    const se = s[G], fe = ge(se) ? se.bind(n, n) : ge(se.get) ? se.get.bind(n, n) : en, Me = !ge(se) && ge(se.set) ? se.set.bind(n) : en, me = ke({ get: fe, set: Me });
    Object.defineProperty(r, G, { enumerable: true, configurable: true, get: () => me.value, set: (Ge) => me.value = Ge });
  }
  if (a) for (const G in a) mh(a[G], r, n, G);
  if (l) {
    const G = ge(l) ? l.call(n) : l;
    Reflect.ownKeys(G).forEach((se) => {
      ds(se, G[se]);
    });
  }
  c && ph(c, e4, "c");
  function re(G, se) {
    de(se) ? se.forEach((fe) => G(fe.bind(n))) : se && G(se.bind(n));
  }
  if (re(oh, f), re(hi, p), re(ql, v), re(ah, m), re(rh, y), re(ih, k), re($w, V), re(zw, Y), re(Bw, U), re(Wl, A), re(vi, x), re(Dw, M), de(q)) if (q.length) {
    const G = e4.exposed || (e4.exposed = {});
    q.forEach((se) => {
      Object.defineProperty(G, se, { get: () => n[se], set: (fe) => n[se] = fe, enumerable: true });
    });
  } else e4.exposed || (e4.exposed = {});
  F && e4.render === en && (e4.render = F), Q != null && (e4.inheritAttrs = Q), z && (e4.components = z), O && (e4.directives = O), M && Vl(e4);
}
function Zw(e4, t, n = en) {
  de(e4) && (e4 = ec(e4));
  for (const r in e4) {
    const i = e4[r];
    let s;
    We(i) ? "default" in i ? s = kt(i.from || r, i.default, true) : s = kt(i.from || r) : s = kt(i), rt(s) ? Object.defineProperty(t, r, { enumerable: true, configurable: true, get: () => s.value, set: (o) => s.value = o }) : t[r] = s;
  }
}
function ph(e4, t, n) {
  pn(de(e4) ? e4.map((r) => r.bind(t.proxy)) : e4.bind(t.proxy), t, n);
}
function mh(e4, t, n, r) {
  let i = r.includes(".") ? Rh(n, r) : () => n[r];
  if (Je(e4)) {
    const s = t[e4];
    ge(s) && ft(i, s);
  } else if (ge(e4)) ft(i, e4.bind(n));
  else if (We(e4)) if (de(e4)) e4.forEach((s) => mh(s, t, n, r));
  else {
    const s = ge(e4.handler) ? e4.handler.bind(n) : t[e4.handler];
    ge(s) && ft(i, s, e4);
  }
}
function gh(e4) {
  const t = e4.type, { mixins: n, extends: r } = t, { mixins: i, optionsCache: s, config: { optionMergeStrategies: o } } = e4.appContext, a = s.get(t);
  let l;
  return a ? l = a : !i.length && !n && !r ? l = t : (l = {}, i.length && i.forEach((u) => Ho(l, u, o, true)), Ho(l, t, o)), We(t) && s.set(t, l), l;
}
function Ho(e4, t, n, r = false) {
  const { mixins: i, extends: s } = t;
  s && Ho(e4, s, n, true), i && i.forEach((o) => Ho(e4, o, n, true));
  for (const o in t) if (!(r && o === "expose")) {
    const a = Kw[o] || n && n[o];
    e4[o] = a ? a(e4[o], t[o]) : t[o];
  }
  return e4;
}
const Kw = { data: yh, props: bh, emits: bh, methods: us, computed: us, beforeCreate: Dt, created: Dt, beforeMount: Dt, mounted: Dt, beforeUpdate: Dt, updated: Dt, beforeDestroy: Dt, beforeUnmount: Dt, destroyed: Dt, unmounted: Dt, activated: Dt, deactivated: Dt, errorCaptured: Dt, serverPrefetch: Dt, components: us, directives: us, watch: Xw, provide: yh, inject: Yw };
function yh(e4, t) {
  return t ? e4 ? function() {
    return ut(ge(e4) ? e4.call(this, this) : e4, ge(t) ? t.call(this, this) : t);
  } : t : e4;
}
function Yw(e4, t) {
  return us(ec(e4), ec(t));
}
function ec(e4) {
  if (de(e4)) {
    const t = {};
    for (let n = 0; n < e4.length; n++) t[e4[n]] = e4[n];
    return t;
  }
  return e4;
}
function Dt(e4, t) {
  return e4 ? [...new Set([].concat(e4, t))] : t;
}
function us(e4, t) {
  return e4 ? ut(/* @__PURE__ */ Object.create(null), e4, t) : t;
}
function bh(e4, t) {
  return e4 ? de(e4) && de(t) ? [.../* @__PURE__ */ new Set([...e4, ...t])] : ut(/* @__PURE__ */ Object.create(null), Vo(e4), Vo(t ?? {})) : t;
}
function Xw(e4, t) {
  if (!e4) return t;
  if (!t) return e4;
  const n = ut(/* @__PURE__ */ Object.create(null), e4);
  for (const r in t) n[r] = Dt(e4[r], t[r]);
  return n;
}
function kh() {
  return { app: null, config: { isNativeTag: nf, performance: false, globalProperties: {}, optionMergeStrategies: {}, errorHandler: void 0, warnHandler: void 0, compilerOptions: {} }, mixins: [], components: {}, directives: {}, provides: /* @__PURE__ */ Object.create(null), optionsCache: /* @__PURE__ */ new WeakMap(), propsCache: /* @__PURE__ */ new WeakMap(), emitsCache: /* @__PURE__ */ new WeakMap() };
}
let Jw = 0;
function Qw(e4, t) {
  return function(r, i = null) {
    ge(r) || (r = ut({}, r)), i != null && !We(i) && (i = null);
    const s = kh(), o = /* @__PURE__ */ new WeakSet(), a = [];
    let l = false;
    const u = s.app = { _uid: Jw++, _component: r, _props: i, _container: null, _context: s, _instance: null, version: xS, get config() {
      return s.config;
    }, set config(c) {
    }, use(c, ...f) {
      return o.has(c) || (c && ge(c.install) ? (o.add(c), c.install(u, ...f)) : ge(c) && (o.add(c), c(u, ...f))), u;
    }, mixin(c) {
      return s.mixins.includes(c) || s.mixins.push(c), u;
    }, component(c, f) {
      return f ? (s.components[c] = f, u) : s.components[c];
    }, directive(c, f) {
      return f ? (s.directives[c] = f, u) : s.directives[c];
    }, mount(c, f, p) {
      if (!l) {
        const v = u._ceVNode || xe(r, i);
        return v.appContext = s, p === true ? p = "svg" : p === false && (p = void 0), e4(v, c, p), l = true, u._container = c, c.__vue_app__ = u, Xo(v.component);
      }
    }, onUnmount(c) {
      a.push(c);
    }, unmount() {
      l && (pn(a, u._instance, 16), e4(null, u._container), delete u._container.__vue_app__);
    }, provide(c, f) {
      return s.provides[c] = f, u;
    }, runWithContext(c) {
      const f = Br;
      Br = u;
      try {
        return c();
      } finally {
        Br = f;
      }
    } };
    return u;
  };
}
let Br = null;
function ds(e4, t) {
  if (At) {
    let n = At.provides;
    const r = At.parent && At.parent.provides;
    r === n && (n = At.provides = Object.create(r)), n[e4] = t;
  }
}
function kt(e4, t, n = false) {
  const r = rn();
  if (r || Br) {
    let i = Br ? Br._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
    if (i && e4 in i) return i[e4];
    if (arguments.length > 1) return n && ge(t) ? t.call(r && r.proxy) : t;
  }
}
function tc() {
  return !!(rn() || Br);
}
const wh = {}, Sh = () => Object.create(wh), Eh = (e4) => Object.getPrototypeOf(e4) === wh;
function eS(e4, t, n, r = false) {
  const i = {}, s = Sh();
  e4.propsDefaults = /* @__PURE__ */ Object.create(null), Ah(e4, t, i, s);
  for (const o in e4.propsOptions[0]) o in i || (i[o] = void 0);
  n ? e4.props = r ? i : Rf(i) : e4.type.props ? e4.props = i : e4.props = s, e4.attrs = s;
}
function tS(e4, t, n, r) {
  const { props: i, attrs: s, vnode: { patchFlag: o } } = e4, a = Oe(i), [l] = e4.propsOptions;
  let u = false;
  if ((r || o > 0) && !(o & 16)) {
    if (o & 8) {
      const c = e4.vnode.dynamicProps;
      for (let f = 0; f < c.length; f++) {
        let p = c[f];
        if (Wo(e4.emitsOptions, p)) continue;
        const v = t[p];
        if (l) if (ze(s, p)) v !== s[p] && (s[p] = v, u = true);
        else {
          const m = Xt(p);
          i[m] = nc(l, a, m, v, e4, false);
        }
        else v !== s[p] && (s[p] = v, u = true);
      }
    }
  } else {
    Ah(e4, t, i, s) && (u = true);
    let c;
    for (const f in a) (!t || !ze(t, f) && ((c = Wn(f)) === f || !ze(t, c))) && (l ? n && (n[f] !== void 0 || n[c] !== void 0) && (i[f] = nc(l, a, f, void 0, e4, true)) : delete i[f]);
    if (s !== a) for (const f in s) (!t || !ze(t, f)) && (delete s[f], u = true);
  }
  u && Gn(e4.attrs, "set", "");
}
function Ah(e4, t, n, r) {
  const [i, s] = e4.propsOptions;
  let o = false, a;
  if (t) for (let l in t) {
    if (Yi(l)) continue;
    const u = t[l];
    let c;
    i && ze(i, c = Xt(l)) ? !s || !s.includes(c) ? n[c] = u : (a || (a = {}))[c] = u : Wo(e4.emitsOptions, l) || (!(l in r) || u !== r[l]) && (r[l] = u, o = true);
  }
  if (s) {
    const l = Oe(n), u = a || Fe;
    for (let c = 0; c < s.length; c++) {
      const f = s[c];
      n[f] = nc(i, l, f, u[f], e4, !ze(u, f));
    }
  }
  return o;
}
function nc(e4, t, n, r, i, s) {
  const o = e4[n];
  if (o != null) {
    const a = ze(o, "default");
    if (a && r === void 0) {
      const l = o.default;
      if (o.type !== Function && !o.skipFactory && ge(l)) {
        const { propsDefaults: u } = i;
        if (n in u) r = u[n];
        else {
          const c = gs(i);
          r = u[n] = l.call(null, t), c();
        }
      } else r = l;
      i.ce && i.ce._setProp(n, r);
    }
    o[0] && (s && !a ? r = false : o[1] && (r === "" || r === Wn(n)) && (r = true));
  }
  return r;
}
const nS = /* @__PURE__ */ new WeakMap();
function Th(e4, t, n = false) {
  const r = n ? nS : t.propsCache, i = r.get(e4);
  if (i) return i;
  const s = e4.props, o = {}, a = [];
  let l = false;
  if (!ge(e4)) {
    const c = (f) => {
      l = true;
      const [p, v] = Th(f, t, true);
      ut(o, p), v && a.push(...v);
    };
    !n && t.mixins.length && t.mixins.forEach(c), e4.extends && c(e4.extends), e4.mixins && e4.mixins.forEach(c);
  }
  if (!s && !l) return We(e4) && r.set(e4, ri), ri;
  if (de(s)) for (let c = 0; c < s.length; c++) {
    const f = Xt(s[c]);
    Nh(f) && (o[f] = Fe);
  }
  else if (s) for (const c in s) {
    const f = Xt(c);
    if (Nh(f)) {
      const p = s[c], v = o[f] = de(p) || ge(p) ? { type: p } : ut({}, p), m = v.type;
      let y = false, k = true;
      if (de(m)) for (let E = 0; E < m.length; ++E) {
        const A = m[E], C = ge(A) && A.name;
        if (C === "Boolean") {
          y = true;
          break;
        } else C === "String" && (k = false);
      }
      else y = ge(m) && m.name === "Boolean";
      v[0] = y, v[1] = k, (y || ze(v, "default")) && a.push(f);
    }
  }
  const u = [o, a];
  return We(e4) && r.set(e4, u), u;
}
function Nh(e4) {
  return e4[0] !== "$" && !Yi(e4);
}
const rc = (e4) => e4 === "_" || e4 === "_ctx" || e4 === "$stable", ic = (e4) => de(e4) ? e4.map(Mn) : [Mn(e4)], rS = (e4, t, n) => {
  if (t._n) return t;
  const r = et((...i) => ic(t(...i)), n);
  return r._c = false, r;
}, Ch = (e4, t, n) => {
  const r = e4._ctx;
  for (const i in e4) {
    if (rc(i)) continue;
    const s = e4[i];
    if (ge(s)) t[i] = rS(i, s, r);
    else if (s != null) {
      const o = ic(s);
      t[i] = () => o;
    }
  }
}, _h = (e4, t) => {
  const n = ic(t);
  e4.slots.default = () => n;
}, Oh = (e4, t, n) => {
  for (const r in t) (n || !rc(r)) && (e4[r] = t[r]);
}, iS = (e4, t, n) => {
  const r = e4.slots = Sh();
  if (e4.vnode.shapeFlag & 32) {
    const i = t._;
    i ? (Oh(r, t, n), n && lf(r, "_", i, true)) : Ch(t, r);
  } else t && _h(e4, t);
}, sS = (e4, t, n) => {
  const { vnode: r, slots: i } = e4;
  let s = true, o = Fe;
  if (r.shapeFlag & 32) {
    const a = t._;
    a ? n && a === 1 ? s = false : Oh(i, t, n) : (s = !t.$stable, Ch(t, i)), o = t;
  } else t && (_h(e4, t), o = { default: 1 });
  if (s) for (const a in i) !rc(a) && o[a] == null && delete i[a];
}, Bt = bS;
function oS(e4) {
  return aS(e4);
}
function aS(e4, t) {
  const n = So();
  n.__VUE__ = true;
  const { insert: r, remove: i, patchProp: s, createElement: o, createText: a, createComment: l, setText: u, setElementText: c, parentNode: f, nextSibling: p, setScopeId: v = en, insertStaticContent: m } = e4, y = (w, S, _, B = null, $ = null, L = null, J = void 0, K = null, Z = !!S.dynamicChildren) => {
    if (w === S) return;
    w && !$r(w, S) && (B = D(w), Ge(w, $, L, true), w = null), S.patchFlag === -2 && (Z = false, S.dynamicChildren = null);
    const { type: H, ref: ve, shapeFlag: ne } = S;
    switch (H) {
      case fs:
        k(w, S, _, B);
        break;
      case Et:
        E(w, S, _, B);
        break;
      case Go:
        w == null && A(S, _, B, J);
        break;
      case ht:
        z(w, S, _, B, $, L, J, K, Z);
        break;
      default:
        ne & 1 ? F(w, S, _, B, $, L, J, K, Z) : ne & 6 ? O(w, S, _, B, $, L, J, K, Z) : (ne & 64 || ne & 128) && H.process(w, S, _, B, $, L, J, K, Z, ae);
    }
    ve != null && $ ? as(ve, w && w.ref, L, S || w, !S) : ve == null && w && w.ref != null && as(w.ref, null, L, w, true);
  }, k = (w, S, _, B) => {
    if (w == null) r(S.el = a(S.children), _, B);
    else {
      const $ = S.el = w.el;
      S.children !== w.children && u($, S.children);
    }
  }, E = (w, S, _, B) => {
    w == null ? r(S.el = l(S.children || ""), _, B) : S.el = w.el;
  }, A = (w, S, _, B) => {
    [w.el, w.anchor] = m(w.children, S, _, B, w.el, w.anchor);
  }, C = ({ el: w, anchor: S }, _, B) => {
    let $;
    for (; w && w !== S; ) $ = p(w), r(w, _, B), w = $;
    r(S, _, B);
  }, x = ({ el: w, anchor: S }) => {
    let _;
    for (; w && w !== S; ) _ = p(w), i(w), w = _;
    i(S);
  }, F = (w, S, _, B, $, L, J, K, Z) => {
    S.type === "svg" ? J = "svg" : S.type === "math" && (J = "mathml"), w == null ? Y(S, _, B, $, L, J, K, Z) : M(w, S, $, L, J, K, Z);
  }, Y = (w, S, _, B, $, L, J, K) => {
    let Z, H;
    const { props: ve, shapeFlag: ne, transition: le, dirs: ce } = w;
    if (Z = w.el = o(w.type, L, ve && ve.is, ve), ne & 8 ? c(Z, w.children) : ne & 16 && V(w.children, Z, null, B, $, sc(w, L), J, K), ce && Fr(w, null, B, "created"), U(Z, w, w.scopeId, J, B), ve) {
      for (const De in ve) De !== "value" && !Yi(De) && s(Z, De, null, ve[De], L, B);
      "value" in ve && s(Z, "value", null, ve.value, L), (H = ve.onVnodeBeforeMount) && jn(H, B, w);
    }
    ce && Fr(w, null, B, "beforeMount");
    const Se = lS($, le);
    Se && le.beforeEnter(Z), r(Z, S, _), ((H = ve && ve.onVnodeMounted) || Se || ce) && Bt(() => {
      H && jn(H, B, w), Se && le.enter(Z), ce && Fr(w, null, B, "mounted");
    }, $);
  }, U = (w, S, _, B, $) => {
    if (_ && v(w, _), B) for (let L = 0; L < B.length; L++) v(w, B[L]);
    if ($) {
      let L = $.subTree;
      if (S === L || Dh(L.type) && (L.ssContent === S || L.ssFallback === S)) {
        const J = $.vnode;
        U(w, J, J.scopeId, J.slotScopeIds, $.parent);
      }
    }
  }, V = (w, S, _, B, $, L, J, K, Z = 0) => {
    for (let H = Z; H < w.length; H++) {
      const ve = w[H] = K ? vr(w[H]) : Mn(w[H]);
      y(null, ve, S, _, B, $, L, J, K);
    }
  }, M = (w, S, _, B, $, L, J) => {
    const K = S.el = w.el;
    let { patchFlag: Z, dynamicChildren: H, dirs: ve } = S;
    Z |= w.patchFlag & 16;
    const ne = w.props || Fe, le = S.props || Fe;
    let ce;
    if (_ && zr(_, false), (ce = le.onVnodeBeforeUpdate) && jn(ce, _, S, w), ve && Fr(S, w, _, "beforeUpdate"), _ && zr(_, true), (ne.innerHTML && le.innerHTML == null || ne.textContent && le.textContent == null) && c(K, ""), H ? q(w.dynamicChildren, H, K, _, B, sc(S, $), L) : J || se(w, S, K, null, _, B, sc(S, $), L, false), Z > 0) {
      if (Z & 16) Q(K, ne, le, _, $);
      else if (Z & 2 && ne.class !== le.class && s(K, "class", null, le.class, $), Z & 4 && s(K, "style", ne.style, le.style, $), Z & 8) {
        const Se = S.dynamicProps;
        for (let De = 0; De < Se.length; De++) {
          const Ne = Se[De], mt = ne[Ne], g = le[Ne];
          (g !== mt || Ne === "value") && s(K, Ne, mt, g, $, _);
        }
      }
      Z & 1 && w.children !== S.children && c(K, S.children);
    } else !J && H == null && Q(K, ne, le, _, $);
    ((ce = le.onVnodeUpdated) || ve) && Bt(() => {
      ce && jn(ce, _, S, w), ve && Fr(S, w, _, "updated");
    }, B);
  }, q = (w, S, _, B, $, L, J) => {
    for (let K = 0; K < S.length; K++) {
      const Z = w[K], H = S[K], ve = Z.el && (Z.type === ht || !$r(Z, H) || Z.shapeFlag & 198) ? f(Z.el) : _;
      y(Z, H, ve, null, B, $, L, J, true);
    }
  }, Q = (w, S, _, B, $) => {
    if (S !== _) {
      if (S !== Fe) for (const L in S) !Yi(L) && !(L in _) && s(w, L, S[L], null, $, B);
      for (const L in _) {
        if (Yi(L)) continue;
        const J = _[L], K = S[L];
        J !== K && L !== "value" && s(w, L, K, J, $, B);
      }
      "value" in _ && s(w, "value", S.value, _.value, $);
    }
  }, z = (w, S, _, B, $, L, J, K, Z) => {
    const H = S.el = w ? w.el : a(""), ve = S.anchor = w ? w.anchor : a("");
    let { patchFlag: ne, dynamicChildren: le, slotScopeIds: ce } = S;
    ce && (K = K ? K.concat(ce) : ce), w == null ? (r(H, _, B), r(ve, _, B), V(S.children || [], _, ve, $, L, J, K, Z)) : ne > 0 && ne & 64 && le && w.dynamicChildren ? (q(w.dynamicChildren, le, _, $, L, J, K), (S.key != null || $ && S === $.subTree) && oc(w, S, true)) : se(w, S, _, ve, $, L, J, K, Z);
  }, O = (w, S, _, B, $, L, J, K, Z) => {
    S.slotScopeIds = K, w == null ? S.shapeFlag & 512 ? $.ctx.activate(S, _, B, J, Z) : j(S, _, B, $, L, J, Z) : X(w, S, Z);
  }, j = (w, S, _, B, $, L, J) => {
    const K = w.component = AS(w, B, $);
    if (ls(w) && (K.ctx.renderer = ae), TS(K, false, J), K.asyncDep) {
      if ($ && $.registerDep(K, re, J), !w.el) {
        const Z = K.subTree = xe(Et);
        E(null, Z, S, _), w.placeholder = Z.el;
      }
    } else re(K, w, S, _, $, L, J);
  }, X = (w, S, _) => {
    const B = S.component = w.component;
    if (gS(w, S, _)) if (B.asyncDep && !B.asyncResolved) {
      G(B, S, _);
      return;
    } else B.next = S, B.update();
    else S.el = w.el, B.vnode = S;
  }, re = (w, S, _, B, $, L, J) => {
    const K = () => {
      if (w.isMounted) {
        let { next: ne, bu: le, u: ce, parent: Se, vnode: De } = w;
        {
          const h = Ph(w);
          if (h) {
            ne && (ne.el = De.el, G(w, ne, J)), h.asyncDep.then(() => {
              w.isUnmounted || K();
            });
            return;
          }
        }
        let Ne = ne, mt;
        zr(w, false), ne ? (ne.el = De.el, G(w, ne, J)) : ne = De, le && ko(le), (mt = ne.props && ne.props.onVnodeBeforeUpdate) && jn(mt, Se, ne, De), zr(w, true);
        const g = Lh(w), d = w.subTree;
        w.subTree = g, y(d, g, f(d.el), D(d), w, $, L), ne.el = g.el, Ne === null && yS(w, g.el), ce && Bt(ce, $), (mt = ne.props && ne.props.onVnodeUpdated) && Bt(() => jn(mt, Se, ne, De), $);
      } else {
        let ne;
        const { el: le, props: ce } = S, { bm: Se, m: De, parent: Ne, root: mt, type: g } = w, d = fi(S);
        zr(w, false), Se && ko(Se), !d && (ne = ce && ce.onVnodeBeforeMount) && jn(ne, Ne, S), zr(w, true);
        {
          mt.ce && mt.ce._def.shadowRoot !== false && mt.ce._injectChildStyle(g);
          const h = w.subTree = Lh(w);
          y(null, h, _, B, w, $, L), S.el = h.el;
        }
        if (De && Bt(De, $), !d && (ne = ce && ce.onVnodeMounted)) {
          const h = S;
          Bt(() => jn(ne, Ne, h), $);
        }
        (S.shapeFlag & 256 || Ne && fi(Ne.vnode) && Ne.vnode.shapeFlag & 256) && w.a && Bt(w.a, $), w.isMounted = true, S = _ = B = null;
      }
    };
    w.scope.on();
    const Z = w.effect = new vf(K);
    w.scope.off();
    const H = w.update = Z.run.bind(Z), ve = w.job = Z.runIfDirty.bind(Z);
    ve.i = w, ve.id = w.uid, Z.scheduler = () => Bl(ve), zr(w, true), H();
  }, G = (w, S, _) => {
    S.component = w;
    const B = w.vnode.props;
    w.vnode = S, w.next = null, tS(w, S.props, B, _), sS(w, S.children, _), On(), zf(w), Pn();
  }, se = (w, S, _, B, $, L, J, K, Z = false) => {
    const H = w && w.children, ve = w ? w.shapeFlag : 0, ne = S.children, { patchFlag: le, shapeFlag: ce } = S;
    if (le > 0) {
      if (le & 128) {
        Me(H, ne, _, B, $, L, J, K, Z);
        return;
      } else if (le & 256) {
        fe(H, ne, _, B, $, L, J, K, Z);
        return;
      }
    }
    ce & 8 ? (ve & 16 && tt(H, $, L), ne !== H && c(_, ne)) : ve & 16 ? ce & 16 ? Me(H, ne, _, B, $, L, J, K, Z) : tt(H, $, L, true) : (ve & 8 && c(_, ""), ce & 16 && V(ne, _, B, $, L, J, K, Z));
  }, fe = (w, S, _, B, $, L, J, K, Z) => {
    w = w || ri, S = S || ri;
    const H = w.length, ve = S.length, ne = Math.min(H, ve);
    let le;
    for (le = 0; le < ne; le++) {
      const ce = S[le] = Z ? vr(S[le]) : Mn(S[le]);
      y(w[le], ce, _, null, $, L, J, K, Z);
    }
    H > ve ? tt(w, $, L, true, false, ne) : V(S, _, B, $, L, J, K, Z, ne);
  }, Me = (w, S, _, B, $, L, J, K, Z) => {
    let H = 0;
    const ve = S.length;
    let ne = w.length - 1, le = ve - 1;
    for (; H <= ne && H <= le; ) {
      const ce = w[H], Se = S[H] = Z ? vr(S[H]) : Mn(S[H]);
      if ($r(ce, Se)) y(ce, Se, _, null, $, L, J, K, Z);
      else break;
      H++;
    }
    for (; H <= ne && H <= le; ) {
      const ce = w[ne], Se = S[le] = Z ? vr(S[le]) : Mn(S[le]);
      if ($r(ce, Se)) y(ce, Se, _, null, $, L, J, K, Z);
      else break;
      ne--, le--;
    }
    if (H > ne) {
      if (H <= le) {
        const ce = le + 1, Se = ce < ve ? S[ce].el : B;
        for (; H <= le; ) y(null, S[H] = Z ? vr(S[H]) : Mn(S[H]), _, Se, $, L, J, K, Z), H++;
      }
    } else if (H > le) for (; H <= ne; ) Ge(w[H], $, L, true), H++;
    else {
      const ce = H, Se = H, De = /* @__PURE__ */ new Map();
      for (H = Se; H <= le; H++) {
        const P = S[H] = Z ? vr(S[H]) : Mn(S[H]);
        P.key != null && De.set(P.key, H);
      }
      let Ne, mt = 0;
      const g = le - Se + 1;
      let d = false, h = 0;
      const b = new Array(g);
      for (H = 0; H < g; H++) b[H] = 0;
      for (H = ce; H <= ne; H++) {
        const P = w[H];
        if (mt >= g) {
          Ge(P, $, L, true);
          continue;
        }
        let I;
        if (P.key != null) I = De.get(P.key);
        else for (Ne = Se; Ne <= le; Ne++) if (b[Ne - Se] === 0 && $r(P, S[Ne])) {
          I = Ne;
          break;
        }
        I === void 0 ? Ge(P, $, L, true) : (b[I - Se] = H + 1, I >= h ? h = I : d = true, y(P, S[I], _, null, $, L, J, K, Z), mt++);
      }
      const T = d ? cS(b) : ri;
      for (Ne = T.length - 1, H = g - 1; H >= 0; H--) {
        const P = Se + H, I = S[P], Ee = S[P + 1], Ze = P + 1 < ve ? Ee.el || Ee.placeholder : B;
        b[H] === 0 ? y(null, I, _, Ze, $, L, J, K, Z) : d && (Ne < 0 || H !== T[Ne] ? me(I, _, Ze, 2) : Ne--);
      }
    }
  }, me = (w, S, _, B, $ = null) => {
    const { el: L, type: J, transition: K, children: Z, shapeFlag: H } = w;
    if (H & 6) {
      me(w.component.subTree, S, _, B);
      return;
    }
    if (H & 128) {
      w.suspense.move(S, _, B);
      return;
    }
    if (H & 64) {
      J.move(w, S, _, ae);
      return;
    }
    if (J === ht) {
      r(L, S, _);
      for (let ne = 0; ne < Z.length; ne++) me(Z[ne], S, _, B);
      r(w.anchor, S, _);
      return;
    }
    if (J === Go) {
      C(w, S, _);
      return;
    }
    if (B !== 2 && H & 1 && K) if (B === 0) K.beforeEnter(L), r(L, S, _), Bt(() => K.enter(L), $);
    else {
      const { leave: ne, delayLeave: le, afterLeave: ce } = K, Se = () => {
        w.ctx.isUnmounted ? i(L) : r(L, S, _);
      }, De = () => {
        L._isLeaving && L[Yn](true), ne(L, () => {
          Se(), ce && ce();
        });
      };
      le ? le(L, Se, De) : De();
    }
    else r(L, S, _);
  }, Ge = (w, S, _, B = false, $ = false) => {
    const { type: L, props: J, ref: K, children: Z, dynamicChildren: H, shapeFlag: ve, patchFlag: ne, dirs: le, cacheIndex: ce } = w;
    if (ne === -2 && ($ = false), K != null && (On(), as(K, null, _, w, true), Pn()), ce != null && (S.renderCache[ce] = void 0), ve & 256) {
      S.ctx.deactivate(w);
      return;
    }
    const Se = ve & 1 && le, De = !fi(w);
    let Ne;
    if (De && (Ne = J && J.onVnodeBeforeUnmount) && jn(Ne, S, w), ve & 6) ye(w.component, _, B);
    else {
      if (ve & 128) {
        w.suspense.unmount(_, B);
        return;
      }
      Se && Fr(w, null, S, "beforeUnmount"), ve & 64 ? w.type.remove(w, S, _, ae, B) : H && !H.hasOnce && (L !== ht || ne > 0 && ne & 64) ? tt(H, S, _, false, true) : (L === ht && ne & 384 || !$ && ve & 16) && tt(Z, S, _), B && Le(w);
    }
    (De && (Ne = J && J.onVnodeUnmounted) || Se) && Bt(() => {
      Ne && jn(Ne, S, w), Se && Fr(w, null, S, "unmounted");
    }, _);
  }, Le = (w) => {
    const { type: S, el: _, anchor: B, transition: $ } = w;
    if (S === ht) {
      Ce(_, B);
      return;
    }
    if (S === Go) {
      x(w);
      return;
    }
    const L = () => {
      i(_), $ && !$.persisted && $.afterLeave && $.afterLeave();
    };
    if (w.shapeFlag & 1 && $ && !$.persisted) {
      const { leave: J, delayLeave: K } = $, Z = () => J(_, L);
      K ? K(w.el, L, Z) : Z();
    } else L();
  }, Ce = (w, S) => {
    let _;
    for (; w !== S; ) _ = p(w), i(w), w = _;
    i(S);
  }, ye = (w, S, _) => {
    const { bum: B, scope: $, job: L, subTree: J, um: K, m: Z, a: H } = w;
    xh(Z), xh(H), B && ko(B), $.stop(), L && (L.flags |= 8, Ge(J, w, S, _)), K && Bt(K, S), Bt(() => {
      w.isUnmounted = true;
    }, S);
  }, tt = (w, S, _, B = false, $ = false, L = 0) => {
    for (let J = L; J < w.length; J++) Ge(w[J], S, _, B, $);
  }, D = (w) => {
    if (w.shapeFlag & 6) return D(w.component.subTree);
    if (w.shapeFlag & 128) return w.suspense.next();
    const S = p(w.anchor || w.el), _ = S && S[Vf];
    return _ ? p(_) : S;
  };
  let te = false;
  const ee = (w, S, _) => {
    w == null ? S._vnode && Ge(S._vnode, null, null, true) : y(S._vnode || null, w, S, null, null, null, _), S._vnode = w, te || (te = true, zf(), $f(), te = false);
  }, ae = { p: y, um: Ge, m: me, r: Le, mt: j, mc: V, pc: se, pbc: q, n: D, o: e4 };
  return { render: ee, hydrate: void 0, createApp: Qw(ee) };
}
function sc({ type: e4, props: t }, n) {
  return n === "svg" && e4 === "foreignObject" || n === "mathml" && e4 === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function zr({ effect: e4, job: t }, n) {
  n ? (e4.flags |= 32, t.flags |= 4) : (e4.flags &= -33, t.flags &= -5);
}
function lS(e4, t) {
  return (!e4 || e4 && !e4.pendingBranch) && t && !t.persisted;
}
function oc(e4, t, n = false) {
  const r = e4.children, i = t.children;
  if (de(r) && de(i)) for (let s = 0; s < r.length; s++) {
    const o = r[s];
    let a = i[s];
    a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = i[s] = vr(i[s]), a.el = o.el), !n && a.patchFlag !== -2 && oc(o, a)), a.type === fs && a.patchFlag !== -1 && (a.el = o.el), a.type === Et && !a.el && (a.el = o.el);
  }
}
function cS(e4) {
  const t = e4.slice(), n = [0];
  let r, i, s, o, a;
  const l = e4.length;
  for (r = 0; r < l; r++) {
    const u = e4[r];
    if (u !== 0) {
      if (i = n[n.length - 1], e4[i] < u) {
        t[r] = i, n.push(r);
        continue;
      }
      for (s = 0, o = n.length - 1; s < o; ) a = s + o >> 1, e4[n[a]] < u ? s = a + 1 : o = a;
      u < e4[n[s]] && (s > 0 && (t[r] = n[s - 1]), n[s] = r);
    }
  }
  for (s = n.length, o = n[s - 1]; s-- > 0; ) n[s] = o, o = t[o];
  return n;
}
function Ph(e4) {
  const t = e4.subTree.component;
  if (t) return t.asyncDep && !t.asyncResolved ? t : Ph(t);
}
function xh(e4) {
  if (e4) for (let t = 0; t < e4.length; t++) e4[t].flags |= 8;
}
const uS = Symbol.for("v-scx"), dS = () => kt(uS);
function ac(e4, t) {
  return qo(e4, null, t);
}
function fS(e4, t) {
  return qo(e4, null, { flush: "sync" });
}
function ft(e4, t, n) {
  return qo(e4, t, n);
}
function qo(e4, t, n = Fe) {
  const { immediate: r, deep: i, flush: s, once: o } = n, a = ut({}, n), l = t && r || !t && s !== "post";
  let u;
  if (pi) {
    if (s === "sync") {
      const v = dS();
      u = v.__watcherHandles || (v.__watcherHandles = []);
    } else if (!l) {
      const v = () => {
      };
      return v.stop = en, v.resume = en, v.pause = en, v;
    }
  }
  const c = At;
  a.call = (v, m, y) => pn(v, c, m, y);
  let f = false;
  s === "post" ? a.scheduler = (v) => {
    Bt(v, c && c.suspense);
  } : s !== "sync" && (f = true, a.scheduler = (v, m) => {
    m ? v() : Bl(v);
  }), a.augmentJob = (v) => {
    t && (v.flags |= 4), f && (v.flags |= 2, c && (v.id = c.uid, v.i = c));
  };
  const p = kw(e4, t, a);
  return pi && (u ? u.push(p) : l && p()), p;
}
function hS(e4, t, n) {
  const r = this.proxy, i = Je(e4) ? e4.includes(".") ? Rh(r, e4) : () => r[e4] : e4.bind(r, r);
  let s;
  ge(t) ? s = t : (s = t.handler, n = t);
  const o = gs(this), a = qo(i, s.bind(r), n);
  return o(), a;
}
function Rh(e4, t) {
  const n = t.split(".");
  return () => {
    let r = e4;
    for (let i = 0; i < n.length && r; i++) r = r[n[i]];
    return r;
  };
}
function Mh(e4, t, n = Fe) {
  const r = rn(), i = Xt(t), s = Wn(t), o = jh(e4, i), a = Ll((l, u) => {
    let c, f = Fe, p;
    return fS(() => {
      const v = e4[i];
      Wt(c, v) && (c = v, u());
    }), { get() {
      return l(), n.get ? n.get(c) : c;
    }, set(v) {
      const m = n.set ? n.set(v) : v;
      if (!Wt(m, c) && !(f !== Fe && Wt(v, f))) return;
      const y = r.vnode.props;
      y && (t in y || i in y || s in y) && (`onUpdate:${t}` in y || `onUpdate:${i}` in y || `onUpdate:${s}` in y) || (c = v, u()), r.emit(`update:${t}`, m), Wt(v, m) && Wt(v, f) && !Wt(m, p) && u(), f = v, p = m;
    } };
  });
  return a[Symbol.iterator] = () => {
    let l = 0;
    return { next() {
      return l < 2 ? { value: l++ ? o || Fe : a, done: false } : { done: true };
    } };
  }, a;
}
const jh = (e4, t) => t === "modelValue" || t === "model-value" ? e4.modelModifiers : e4[`${t}Modifiers`] || e4[`${Xt(t)}Modifiers`] || e4[`${Wn(t)}Modifiers`];
function vS(e4, t, ...n) {
  if (e4.isUnmounted) return;
  const r = e4.vnode.props || Fe;
  let i = n;
  const s = t.startsWith("update:"), o = s && jh(r, t.slice(7));
  o && (o.trim && (i = n.map((c) => Je(c) ? c.trim() : c)), o.number && (i = n.map(wo)));
  let a, l = r[a = bo(t)] || r[a = bo(Xt(t))];
  !l && s && (l = r[a = bo(Wn(t))]), l && pn(l, e4, 6, i);
  const u = r[a + "Once"];
  if (u) {
    if (!e4.emitted) e4.emitted = {};
    else if (e4.emitted[a]) return;
    e4.emitted[a] = true, pn(u, e4, 6, i);
  }
}
function Ih(e4, t, n = false) {
  const r = t.emitsCache, i = r.get(e4);
  if (i !== void 0) return i;
  const s = e4.emits;
  let o = {}, a = false;
  if (!ge(e4)) {
    const l = (u) => {
      const c = Ih(u, t, true);
      c && (a = true, ut(o, c));
    };
    !n && t.mixins.length && t.mixins.forEach(l), e4.extends && l(e4.extends), e4.mixins && e4.mixins.forEach(l);
  }
  return !s && !a ? (We(e4) && r.set(e4, null), null) : (de(s) ? s.forEach((l) => o[l] = null) : ut(o, s), We(e4) && r.set(e4, o), o);
}
function Wo(e4, t) {
  return !e4 || !mo(t) ? false : (t = t.slice(2).replace(/Once$/, ""), ze(e4, t[0].toLowerCase() + t.slice(1)) || ze(e4, Wn(t)) || ze(e4, t));
}
function QR() {
}
function Lh(e4) {
  const { type: t, vnode: n, proxy: r, withProxy: i, propsOptions: [s], slots: o, attrs: a, emit: l, render: u, renderCache: c, props: f, data: p, setupState: v, ctx: m, inheritAttrs: y } = e4, k = Do(e4);
  let E, A;
  try {
    if (n.shapeFlag & 4) {
      const x = i || r, F = x;
      E = Mn(u.call(F, x, c, f, v, p, m)), A = a;
    } else {
      const x = t;
      E = Mn(x.length > 1 ? x(f, { attrs: a, slots: o, emit: l }) : x(f, null)), A = t.props ? a : pS(a);
    }
  } catch (x) {
    hs.length = 0, rs(x, e4, 1), E = xe(Et);
  }
  let C = E;
  if (A && y !== false) {
    const x = Object.keys(A), { shapeFlag: F } = C;
    x.length && F & 7 && (s && x.some(bl) && (A = mS(A, s)), C = hr(C, A, false, true));
  }
  return n.dirs && (C = hr(C, null, false, true), C.dirs = C.dirs ? C.dirs.concat(n.dirs) : n.dirs), n.transition && Dr(C, n.transition), E = C, Do(k), E;
}
const pS = (e4) => {
  let t;
  for (const n in e4) (n === "class" || n === "style" || mo(n)) && ((t || (t = {}))[n] = e4[n]);
  return t;
}, mS = (e4, t) => {
  const n = {};
  for (const r in e4) (!bl(r) || !(r.slice(9) in t)) && (n[r] = e4[r]);
  return n;
};
function gS(e4, t, n) {
  const { props: r, children: i, component: s } = e4, { props: o, children: a, patchFlag: l } = t, u = s.emitsOptions;
  if (t.dirs || t.transition) return true;
  if (n && l >= 0) {
    if (l & 1024) return true;
    if (l & 16) return r ? Fh(r, o, u) : !!o;
    if (l & 8) {
      const c = t.dynamicProps;
      for (let f = 0; f < c.length; f++) {
        const p = c[f];
        if (o[p] !== r[p] && !Wo(u, p)) return true;
      }
    }
  } else return (i || a) && (!a || !a.$stable) ? true : r === o ? false : r ? o ? Fh(r, o, u) : true : !!o;
  return false;
}
function Fh(e4, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e4).length) return true;
  for (let i = 0; i < r.length; i++) {
    const s = r[i];
    if (t[s] !== e4[s] && !Wo(n, s)) return true;
  }
  return false;
}
function yS({ vnode: e4, parent: t }, n) {
  for (; t; ) {
    const r = t.subTree;
    if (r.suspense && r.suspense.activeBranch === e4 && (r.el = e4.el), r === e4) (e4 = t.vnode).el = n, t = t.parent;
    else break;
  }
}
const Dh = (e4) => e4.__isSuspense;
function bS(e4, t) {
  t && t.pendingBranch ? de(e4) ? t.effects.push(...e4) : t.effects.push(e4) : Bf(e4);
}
const ht = Symbol.for("v-fgt"), fs = Symbol.for("v-txt"), Et = Symbol.for("v-cmt"), Go = Symbol.for("v-stc"), hs = [];
let Jt = null;
function oe(e4 = false) {
  hs.push(Jt = e4 ? null : []);
}
function kS() {
  hs.pop(), Jt = hs[hs.length - 1] || null;
}
let vs = 1;
function Bh(e4, t = false) {
  vs += e4, e4 < 0 && Jt && t && (Jt.hasOnce = true);
}
function zh(e4) {
  return e4.dynamicChildren = vs > 0 ? Jt || ri : null, kS(), vs > 0 && Jt && Jt.push(e4), e4;
}
function pe(e4, t, n, r, i, s) {
  return zh(Ae(e4, t, n, r, i, s, true));
}
function at(e4, t, n, r, i) {
  return zh(xe(e4, t, n, r, i, true));
}
function ps(e4) {
  return e4 ? e4.__v_isVNode === true : false;
}
function $r(e4, t) {
  return e4.type === t.type && e4.key === t.key;
}
const $h = ({ key: e4 }) => e4 ?? null, Zo = ({ ref: e4, ref_key: t, ref_for: n }) => (typeof e4 == "number" && (e4 = "" + e4), e4 != null ? Je(e4) || rt(e4) || ge(e4) ? { i: St, r: e4, k: t, f: !!n } : e4 : null);
function Ae(e4, t = null, n = null, r = 0, i = null, s = e4 === ht ? 0 : 1, o = false, a = false) {
  const l = { __v_isVNode: true, __v_skip: true, type: e4, props: t, key: t && $h(t), ref: t && Zo(t), scopeId: Fo, slotScopeIds: null, children: n, component: null, suspense: null, ssContent: null, ssFallback: null, dirs: null, transition: null, el: null, anchor: null, target: null, targetStart: null, targetAnchor: null, staticCount: 0, shapeFlag: s, patchFlag: r, dynamicProps: i, dynamicChildren: null, appContext: null, ctx: St };
  return a ? (lc(l, n), s & 128 && e4.normalize(l)) : n && (l.shapeFlag |= Je(n) ? 8 : 16), vs > 0 && !o && Jt && (l.patchFlag > 0 || s & 6) && l.patchFlag !== 32 && Jt.push(l), l;
}
const xe = wS;
function wS(e4, t = null, n = null, r = 0, i = null, s = false) {
  if ((!e4 || e4 === lh) && (e4 = Et), ps(e4)) {
    const a = hr(e4, t, true);
    return n && lc(a, n), vs > 0 && !s && Jt && (a.shapeFlag & 6 ? Jt[Jt.indexOf(e4)] = a : Jt.push(a)), a.patchFlag = -2, a;
  }
  if (PS(e4) && (e4 = e4.__vccOpts), t) {
    t = ms(t);
    let { class: a, style: l } = t;
    a && !Je(a) && (t.class = yt(a)), We(l) && (Il(l) && !de(l) && (l = ut({}, l)), t.style = Pt(l));
  }
  const o = Je(e4) ? 1 : Dh(e4) ? 128 : Hf(e4) ? 64 : We(e4) ? 4 : ge(e4) ? 2 : 0;
  return Ae(e4, t, n, r, i, o, s, true);
}
function ms(e4) {
  return e4 ? Il(e4) || Eh(e4) ? ut({}, e4) : e4 : null;
}
function hr(e4, t, n = false, r = false) {
  const { props: i, ref: s, patchFlag: o, children: a, transition: l } = e4, u = t ? mn(i || {}, t) : i, c = { __v_isVNode: true, __v_skip: true, type: e4.type, props: u, key: u && $h(u), ref: t && t.ref ? n && s ? de(s) ? s.concat(Zo(t)) : [s, Zo(t)] : Zo(t) : s, scopeId: e4.scopeId, slotScopeIds: e4.slotScopeIds, children: a, target: e4.target, targetStart: e4.targetStart, targetAnchor: e4.targetAnchor, staticCount: e4.staticCount, shapeFlag: e4.shapeFlag, patchFlag: t && e4.type !== ht ? o === -1 ? 16 : o | 16 : o, dynamicProps: e4.dynamicProps, dynamicChildren: e4.dynamicChildren, appContext: e4.appContext, dirs: e4.dirs, transition: l, component: e4.component, suspense: e4.suspense, ssContent: e4.ssContent && hr(e4.ssContent), ssFallback: e4.ssFallback && hr(e4.ssFallback), placeholder: e4.placeholder, el: e4.el, anchor: e4.anchor, ctx: e4.ctx, ce: e4.ce };
  return l && r && Dr(c, l.clone(c)), c;
}
function Ko(e4 = " ", t = 0) {
  return xe(fs, null, e4, t);
}
function Xe(e4 = "", t = false) {
  return t ? (oe(), at(Et, null, e4)) : xe(Et, null, e4);
}
function Mn(e4) {
  return e4 == null || typeof e4 == "boolean" ? xe(Et) : de(e4) ? xe(ht, null, e4.slice()) : ps(e4) ? vr(e4) : xe(fs, null, String(e4));
}
function vr(e4) {
  return e4.el === null && e4.patchFlag !== -1 || e4.memo ? e4 : hr(e4);
}
function lc(e4, t) {
  let n = 0;
  const { shapeFlag: r } = e4;
  if (t == null) t = null;
  else if (de(t)) n = 16;
  else if (typeof t == "object") if (r & 65) {
    const i = t.default;
    i && (i._c && (i._d = false), lc(e4, i()), i._c && (i._d = true));
    return;
  } else {
    n = 32;
    const i = t._;
    !i && !Eh(t) ? t._ctx = St : i === 3 && St && (St.slots._ === 1 ? t._ = 1 : (t._ = 2, e4.patchFlag |= 1024));
  }
  else ge(t) ? (t = { default: t, _ctx: St }, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [Ko(t)]) : n = 8);
  e4.children = t, e4.shapeFlag |= n;
}
function mn(...e4) {
  const t = {};
  for (let n = 0; n < e4.length; n++) {
    const r = e4[n];
    for (const i in r) if (i === "class") t.class !== r.class && (t.class = yt([t.class, r.class]));
    else if (i === "style") t.style = Pt([t.style, r.style]);
    else if (mo(i)) {
      const s = t[i], o = r[i];
      o && s !== o && !(de(s) && s.includes(o)) && (t[i] = s ? [].concat(s, o) : o);
    } else i !== "" && (t[i] = r[i]);
  }
  return t;
}
function jn(e4, t, n, r = null) {
  pn(e4, t, 7, [n, r]);
}
const SS = kh();
let ES = 0;
function AS(e4, t, n) {
  const r = e4.type, i = (t ? t.appContext : e4.appContext) || SS, s = { uid: ES++, vnode: e4, type: r, parent: t, appContext: i, root: null, next: null, subTree: null, effect: null, update: null, job: null, scope: new hf(true), render: null, proxy: null, exposed: null, exposeProxy: null, withProxy: null, provides: t ? t.provides : Object.create(i.provides), ids: t ? t.ids : ["", 0, 0], accessCache: null, renderCache: [], components: null, directives: null, propsOptions: Th(r, i), emitsOptions: Ih(r, i), emit: null, emitted: null, propsDefaults: Fe, inheritAttrs: r.inheritAttrs, ctx: Fe, data: Fe, props: Fe, attrs: Fe, slots: Fe, refs: Fe, setupState: Fe, setupContext: null, suspense: n, suspenseId: n ? n.pendingId : 0, asyncDep: null, asyncResolved: false, isMounted: false, isUnmounted: false, isDeactivated: false, bc: null, c: null, bm: null, m: null, bu: null, u: null, um: null, bum: null, da: null, a: null, rtg: null, rtc: null, ec: null, sp: null };
  return s.ctx = { _: s }, s.root = t ? t.root : s, s.emit = vS.bind(null, s), e4.ce && e4.ce(s), s;
}
let At = null;
const rn = () => At || St;
let Yo, cc;
{
  const e4 = So(), t = (n, r) => {
    let i;
    return (i = e4[n]) || (i = e4[n] = []), i.push(r), (s) => {
      i.length > 1 ? i.forEach((o) => o(s)) : i[0](s);
    };
  };
  Yo = t("__VUE_INSTANCE_SETTERS__", (n) => At = n), cc = t("__VUE_SSR_SETTERS__", (n) => pi = n);
}
const gs = (e4) => {
  const t = At;
  return Yo(e4), e4.scope.on(), () => {
    e4.scope.off(), Yo(t);
  };
}, Uh = () => {
  At && At.scope.off(), Yo(null);
};
function Vh(e4) {
  return e4.vnode.shapeFlag & 4;
}
let pi = false;
function TS(e4, t = false, n = false) {
  t && cc(t);
  const { props: r, children: i } = e4.vnode, s = Vh(e4);
  eS(e4, r, s, t), iS(e4, i, n || t);
  const o = s ? NS(e4, t) : void 0;
  return t && cc(false), o;
}
function NS(e4, t) {
  const n = e4.type;
  e4.accessCache = /* @__PURE__ */ Object.create(null), e4.proxy = new Proxy(e4.ctx, Hw);
  const { setup: r } = n;
  if (r) {
    On();
    const i = e4.setupContext = r.length > 1 ? Wh(e4) : null, s = gs(e4), o = li(r, e4, 0, [e4.props, i]), a = sf(o);
    if (Pn(), s(), (a || e4.sp) && !fi(e4) && Vl(e4), a) {
      if (o.then(Uh, Uh), t) return o.then((l) => {
        Hh(e4, l);
      }).catch((l) => {
        rs(l, e4, 0);
      });
      e4.asyncDep = o;
    } else Hh(e4, o);
  } else qh(e4);
}
function Hh(e4, t, n) {
  ge(t) ? e4.type.__ssrInlineRender ? e4.ssrRender = t : e4.render = t : We(t) && (e4.setupState = jf(t)), qh(e4);
}
function qh(e4, t, n) {
  const r = e4.type;
  e4.render || (e4.render = r.render || en);
  {
    const i = gs(e4);
    On();
    try {
      Gw(e4);
    } finally {
      Pn(), i();
    }
  }
}
const CS = { get(e4, t) {
  return Rt(e4, "get", ""), e4[t];
} };
function Wh(e4) {
  const t = (n) => {
    e4.exposed = n || {};
  };
  return { attrs: new Proxy(e4.attrs, CS), slots: e4.slots, emit: e4.emit, expose: t };
}
function Xo(e4) {
  return e4.exposed ? e4.exposeProxy || (e4.exposeProxy = new Proxy(jf(Ro(e4.exposed)), { get(t, n) {
    if (n in t) return t[n];
    if (n in cs) return cs[n](e4);
  }, has(t, n) {
    return n in t || n in cs;
  } })) : e4.proxy;
}
const _S = /(?:^|[-_])(\w)/g, OS = (e4) => e4.replace(_S, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function Gh(e4, t = true) {
  return ge(e4) ? e4.displayName || e4.name : e4.name || t && e4.__name;
}
function Zh(e4, t, n = false) {
  let r = Gh(t);
  if (!r && t.__file) {
    const i = t.__file.match(/([^/\\]+)\.\w+$/);
    i && (r = i[1]);
  }
  if (!r && e4 && e4.parent) {
    const i = (s) => {
      for (const o in s) if (s[o] === t) return o;
    };
    r = i(e4.components || e4.parent.type.components) || i(e4.appContext.components);
  }
  return r ? OS(r) : n ? "App" : "Anonymous";
}
function PS(e4) {
  return ge(e4) && "__vccOpts" in e4;
}
const ke = (e4, t) => yw(e4, t, pi);
function Tt(e4, t, n) {
  const r = arguments.length;
  return r === 2 ? We(t) && !de(t) ? ps(t) ? xe(e4, null, [t]) : xe(e4, t) : xe(e4, null, t) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && ps(n) && (n = [n]), xe(e4, t, n));
}
const xS = "3.5.20", RS = en;
let uc;
const Kh = typeof window < "u" && window.trustedTypes;
if (Kh) try {
  uc = Kh.createPolicy("vue", { createHTML: (e4) => e4 });
} catch {
}
const Yh = uc ? (e4) => uc.createHTML(e4) : (e4) => e4, MS = "http://www.w3.org/2000/svg", jS = "http://www.w3.org/1998/Math/MathML", Jn = typeof document < "u" ? document : null, Xh = Jn && Jn.createElement("template"), IS = { insert: (e4, t, n) => {
  t.insertBefore(e4, n || null);
}, remove: (e4) => {
  const t = e4.parentNode;
  t && t.removeChild(e4);
}, createElement: (e4, t, n, r) => {
  const i = t === "svg" ? Jn.createElementNS(MS, e4) : t === "mathml" ? Jn.createElementNS(jS, e4) : n ? Jn.createElement(e4, { is: n }) : Jn.createElement(e4);
  return e4 === "select" && r && r.multiple != null && i.setAttribute("multiple", r.multiple), i;
}, createText: (e4) => Jn.createTextNode(e4), createComment: (e4) => Jn.createComment(e4), setText: (e4, t) => {
  e4.nodeValue = t;
}, setElementText: (e4, t) => {
  e4.textContent = t;
}, parentNode: (e4) => e4.parentNode, nextSibling: (e4) => e4.nextSibling, querySelector: (e4) => Jn.querySelector(e4), setScopeId(e4, t) {
  e4.setAttribute(t, "");
}, insertStaticContent(e4, t, n, r, i, s) {
  const o = n ? n.previousSibling : t.lastChild;
  if (i && (i === s || i.nextSibling)) for (; t.insertBefore(i.cloneNode(true), n), !(i === s || !(i = i.nextSibling)); ) ;
  else {
    Xh.innerHTML = Yh(r === "svg" ? `<svg>${e4}</svg>` : r === "mathml" ? `<math>${e4}</math>` : e4);
    const a = Xh.content;
    if (r === "svg" || r === "mathml") {
      const l = a.firstChild;
      for (; l.firstChild; ) a.appendChild(l.firstChild);
      a.removeChild(l);
    }
    t.insertBefore(a, n);
  }
  return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
} }, pr = "transition", ys = "animation", mi = Symbol("_vtc"), Jh = { name: String, type: String, css: { type: Boolean, default: true }, duration: [String, Number, Object], enterFromClass: String, enterActiveClass: String, enterToClass: String, appearFromClass: String, appearActiveClass: String, appearToClass: String, leaveFromClass: String, leaveActiveClass: String, leaveToClass: String }, Qh = ut({}, Xf, Jh), LS = (e4) => (e4.displayName = "Transition", e4.props = Qh, e4), gi = LS((e4, { slots: t }) => Tt(Mw, tv(e4), t)), Ur = (e4, t = []) => {
  de(e4) ? e4.forEach((n) => n(...t)) : e4 && e4(...t);
}, ev = (e4) => e4 ? de(e4) ? e4.some((t) => t.length > 1) : e4.length > 1 : false;
function tv(e4) {
  const t = {};
  for (const z in e4) z in Jh || (t[z] = e4[z]);
  if (e4.css === false) return t;
  const { name: n = "v", type: r, duration: i, enterFromClass: s = `${n}-enter-from`, enterActiveClass: o = `${n}-enter-active`, enterToClass: a = `${n}-enter-to`, appearFromClass: l = s, appearActiveClass: u = o, appearToClass: c = a, leaveFromClass: f = `${n}-leave-from`, leaveActiveClass: p = `${n}-leave-active`, leaveToClass: v = `${n}-leave-to` } = e4, m = FS(i), y = m && m[0], k = m && m[1], { onBeforeEnter: E, onEnter: A, onEnterCancelled: C, onLeave: x, onLeaveCancelled: F, onBeforeAppear: Y = E, onAppear: U = A, onAppearCancelled: V = C } = t, M = (z, O, j, X) => {
    z._enterCancelled = X, mr(z, O ? c : a), mr(z, O ? u : o), j && j();
  }, q = (z, O) => {
    z._isLeaving = false, mr(z, f), mr(z, v), mr(z, p), O && O();
  }, Q = (z) => (O, j) => {
    const X = z ? U : A, re = () => M(O, z, j);
    Ur(X, [O, re]), nv(() => {
      mr(O, z ? l : s), In(O, z ? c : a), ev(X) || rv(O, r, y, re);
    });
  };
  return ut(t, { onBeforeEnter(z) {
    Ur(E, [z]), In(z, s), In(z, o);
  }, onBeforeAppear(z) {
    Ur(Y, [z]), In(z, l), In(z, u);
  }, onEnter: Q(false), onAppear: Q(true), onLeave(z, O) {
    z._isLeaving = true;
    const j = () => q(z, O);
    In(z, f), z._enterCancelled ? (In(z, p), fc()) : (fc(), In(z, p)), nv(() => {
      z._isLeaving && (mr(z, f), In(z, v), ev(x) || rv(z, r, k, j));
    }), Ur(x, [z, j]);
  }, onEnterCancelled(z) {
    M(z, false, void 0, true), Ur(C, [z]);
  }, onAppearCancelled(z) {
    M(z, true, void 0, true), Ur(V, [z]);
  }, onLeaveCancelled(z) {
    q(z), Ur(F, [z]);
  } });
}
function FS(e4) {
  if (e4 == null) return null;
  if (We(e4)) return [dc(e4.enter), dc(e4.leave)];
  {
    const t = dc(e4);
    return [t, t];
  }
}
function dc(e4) {
  return Fk(e4);
}
function In(e4, t) {
  t.split(/\s+/).forEach((n) => n && e4.classList.add(n)), (e4[mi] || (e4[mi] = /* @__PURE__ */ new Set())).add(t);
}
function mr(e4, t) {
  t.split(/\s+/).forEach((r) => r && e4.classList.remove(r));
  const n = e4[mi];
  n && (n.delete(t), n.size || (e4[mi] = void 0));
}
function nv(e4) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e4);
  });
}
let DS = 0;
function rv(e4, t, n, r) {
  const i = e4._endId = ++DS, s = () => {
    i === e4._endId && r();
  };
  if (n != null) return setTimeout(s, n);
  const { type: o, timeout: a, propCount: l } = iv(e4, t);
  if (!o) return r();
  const u = o + "end";
  let c = 0;
  const f = () => {
    e4.removeEventListener(u, p), s();
  }, p = (v) => {
    v.target === e4 && ++c >= l && f();
  };
  setTimeout(() => {
    c < l && f();
  }, a + 1), e4.addEventListener(u, p);
}
function iv(e4, t) {
  const n = window.getComputedStyle(e4), r = (m) => (n[m] || "").split(", "), i = r(`${pr}Delay`), s = r(`${pr}Duration`), o = sv(i, s), a = r(`${ys}Delay`), l = r(`${ys}Duration`), u = sv(a, l);
  let c = null, f = 0, p = 0;
  t === pr ? o > 0 && (c = pr, f = o, p = s.length) : t === ys ? u > 0 && (c = ys, f = u, p = l.length) : (f = Math.max(o, u), c = f > 0 ? o > u ? pr : ys : null, p = c ? c === pr ? s.length : l.length : 0);
  const v = c === pr && /\b(transform|all)(,|$)/.test(r(`${pr}Property`).toString());
  return { type: c, timeout: f, propCount: p, hasTransform: v };
}
function sv(e4, t) {
  for (; e4.length < t.length; ) e4 = e4.concat(e4);
  return Math.max(...t.map((n, r) => ov(n) + ov(e4[r])));
}
function ov(e4) {
  return e4 === "auto" ? 0 : Number(e4.slice(0, -1).replace(",", ".")) * 1e3;
}
function fc() {
  return document.body.offsetHeight;
}
function BS(e4, t, n) {
  const r = e4[mi];
  r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e4.removeAttribute("class") : n ? e4.setAttribute("class", t) : e4.className = t;
}
const Jo = Symbol("_vod"), av = Symbol("_vsh"), bs = { name: "show", beforeMount(e4, { value: t }, { transition: n }) {
  e4[Jo] = e4.style.display === "none" ? "" : e4.style.display, n && t ? n.beforeEnter(e4) : ks(e4, t);
}, mounted(e4, { value: t }, { transition: n }) {
  n && t && n.enter(e4);
}, updated(e4, { value: t, oldValue: n }, { transition: r }) {
  !t != !n && (r ? t ? (r.beforeEnter(e4), ks(e4, true), r.enter(e4)) : r.leave(e4, () => {
    ks(e4, false);
  }) : ks(e4, t));
}, beforeUnmount(e4, { value: t }) {
  ks(e4, t);
} };
function ks(e4, t) {
  e4.style.display = t ? e4[Jo] : "none", e4[av] = !t;
}
const lv = Symbol("");
function cv(e4) {
  const t = rn();
  if (!t) return;
  const n = t.ut = (i = e4(t.proxy)) => {
    Array.from(document.querySelectorAll(`[data-v-owner="${t.uid}"]`)).forEach((s) => Qo(s, i));
  }, r = () => {
    const i = e4(t.proxy);
    t.ce ? Qo(t.ce, i) : hc(t.subTree, i), n(i);
  };
  ql(() => {
    Bf(r);
  }), hi(() => {
    ft(r, en, { flush: "post" });
    const i = new MutationObserver(r);
    i.observe(t.subTree.el.parentNode, { childList: true }), vi(() => i.disconnect());
  });
}
function hc(e4, t) {
  if (e4.shapeFlag & 128) {
    const n = e4.suspense;
    e4 = n.activeBranch, n.pendingBranch && !n.isHydrating && n.effects.push(() => {
      hc(n.activeBranch, t);
    });
  }
  for (; e4.component; ) e4 = e4.component.subTree;
  if (e4.shapeFlag & 1 && e4.el) Qo(e4.el, t);
  else if (e4.type === ht) e4.children.forEach((n) => hc(n, t));
  else if (e4.type === Go) {
    let { el: n, anchor: r } = e4;
    for (; n && (Qo(n, t), n !== r); ) n = n.nextSibling;
  }
}
function Qo(e4, t) {
  if (e4.nodeType === 1) {
    const n = e4.style;
    let r = "";
    for (const i in t) {
      const s = qk(t[i]);
      n.setProperty(`--${i}`, s), r += `--${i}: ${s};`;
    }
    n[lv] = r;
  }
}
const zS = /(^|;)\s*display\s*:/;
function $S(e4, t, n) {
  const r = e4.style, i = Je(n);
  let s = false;
  if (n && !i) {
    if (t) if (Je(t)) for (const o of t.split(";")) {
      const a = o.slice(0, o.indexOf(":")).trim();
      n[a] == null && ea(r, a, "");
    }
    else for (const o in t) n[o] == null && ea(r, o, "");
    for (const o in n) o === "display" && (s = true), ea(r, o, n[o]);
  } else if (i) {
    if (t !== n) {
      const o = r[lv];
      o && (n += ";" + o), r.cssText = n, s = zS.test(n);
    }
  } else t && e4.removeAttribute("style");
  Jo in e4 && (e4[Jo] = s ? r.display : "", e4[av] && (r.display = "none"));
}
const uv = /\s*!important$/;
function ea(e4, t, n) {
  if (de(n)) n.forEach((r) => ea(e4, t, r));
  else if (n == null && (n = ""), t.startsWith("--")) e4.setProperty(t, n);
  else {
    const r = US(e4, t);
    uv.test(n) ? e4.setProperty(Wn(r), n.replace(uv, ""), "important") : e4[r] = n;
  }
}
const dv = ["Webkit", "Moz", "ms"], vc = {};
function US(e4, t) {
  const n = vc[t];
  if (n) return n;
  let r = Xt(t);
  if (r !== "filter" && r in e4) return vc[t] = r;
  r = yo(r);
  for (let i = 0; i < dv.length; i++) {
    const s = dv[i] + r;
    if (s in e4) return vc[t] = s;
  }
  return t;
}
const fv = "http://www.w3.org/1999/xlink";
function hv(e4, t, n, r, i, s = Vk(t)) {
  r && t.startsWith("xlink:") ? n == null ? e4.removeAttributeNS(fv, t.slice(6, t.length)) : e4.setAttributeNS(fv, t, n) : n == null || s && !uf(n) ? e4.removeAttribute(t) : e4.setAttribute(t, s ? "" : hn(n) ? String(n) : n);
}
function vv(e4, t, n, r, i) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e4[t] = t === "innerHTML" ? Yh(n) : n);
    return;
  }
  const s = e4.tagName;
  if (t === "value" && s !== "PROGRESS" && !s.includes("-")) {
    const a = s === "OPTION" ? e4.getAttribute("value") || "" : e4.value, l = n == null ? e4.type === "checkbox" ? "on" : "" : String(n);
    (a !== l || !("_value" in e4)) && (e4.value = l), n == null && e4.removeAttribute(t), e4._value = n;
    return;
  }
  let o = false;
  if (n === "" || n == null) {
    const a = typeof e4[t];
    a === "boolean" ? n = uf(n) : n == null && a === "string" ? (n = "", o = true) : a === "number" && (n = 0, o = true);
  }
  try {
    e4[t] = n;
  } catch {
  }
  o && e4.removeAttribute(i || t);
}
function Qn(e4, t, n, r) {
  e4.addEventListener(t, n, r);
}
function VS(e4, t, n, r) {
  e4.removeEventListener(t, n, r);
}
const pv = Symbol("_vei");
function HS(e4, t, n, r, i = null) {
  const s = e4[pv] || (e4[pv] = {}), o = s[t];
  if (r && o) o.value = r;
  else {
    const [a, l] = qS(t);
    if (r) {
      const u = s[t] = ZS(r, i);
      Qn(e4, a, u, l);
    } else o && (VS(e4, a, o, l), s[t] = void 0);
  }
}
const mv = /(?:Once|Passive|Capture)$/;
function qS(e4) {
  let t;
  if (mv.test(e4)) {
    t = {};
    let r;
    for (; r = e4.match(mv); ) e4 = e4.slice(0, e4.length - r[0].length), t[r[0].toLowerCase()] = true;
  }
  return [e4[2] === ":" ? e4.slice(3) : Wn(e4.slice(2)), t];
}
let pc = 0;
const WS = Promise.resolve(), GS = () => pc || (WS.then(() => pc = 0), pc = Date.now());
function ZS(e4, t) {
  const n = (r) => {
    if (!r._vts) r._vts = Date.now();
    else if (r._vts <= n.attached) return;
    pn(KS(r, n.value), t, 5, [r]);
  };
  return n.value = e4, n.attached = GS(), n;
}
function KS(e4, t) {
  if (de(t)) {
    const n = e4.stopImmediatePropagation;
    return e4.stopImmediatePropagation = () => {
      n.call(e4), e4._stopped = true;
    }, t.map((r) => (i) => !i._stopped && r && r(i));
  } else return t;
}
const gv = (e4) => e4.charCodeAt(0) === 111 && e4.charCodeAt(1) === 110 && e4.charCodeAt(2) > 96 && e4.charCodeAt(2) < 123, YS = (e4, t, n, r, i, s) => {
  const o = i === "svg";
  t === "class" ? BS(e4, r, o) : t === "style" ? $S(e4, n, r) : mo(t) ? bl(t) || HS(e4, t, n, r, s) : (t[0] === "." ? (t = t.slice(1), true) : t[0] === "^" ? (t = t.slice(1), false) : XS(e4, t, r, o)) ? (vv(e4, t, r), !e4.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && hv(e4, t, r, o, s, t !== "value")) : e4._isVueCE && (/[A-Z]/.test(t) || !Je(r)) ? vv(e4, Xt(t), r, s, t) : (t === "true-value" ? e4._trueValue = r : t === "false-value" && (e4._falseValue = r), hv(e4, t, r, o));
};
function XS(e4, t, n, r) {
  if (r) return !!(t === "innerHTML" || t === "textContent" || t in e4 && gv(t) && ge(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "form" || t === "list" && e4.tagName === "INPUT" || t === "type" && e4.tagName === "TEXTAREA") return false;
  if (t === "width" || t === "height") {
    const i = e4.tagName;
    if (i === "IMG" || i === "VIDEO" || i === "CANVAS" || i === "SOURCE") return false;
  }
  return gv(t) && Je(n) ? false : t in e4;
}
const yv = /* @__PURE__ */ new WeakMap(), bv = /* @__PURE__ */ new WeakMap(), ta = Symbol("_moveCb"), kv = Symbol("_enterCb"), JS = (e4) => (delete e4.props.mode, e4), QS = JS({ name: "TransitionGroup", props: ut({}, Qh, { tag: String, moveClass: String }), setup(e4, { slots: t }) {
  const n = rn(), r = Yf();
  let i, s;
  return ah(() => {
    if (!i.length) return;
    const o = e4.moveClass || `${e4.name || "v"}-move`;
    if (!i0(i[0].el, n.vnode.el, o)) {
      i = [];
      return;
    }
    i.forEach(t0), i.forEach(n0);
    const a = i.filter(r0);
    fc(), a.forEach((l) => {
      const u = l.el, c = u.style;
      In(u, o), c.transform = c.webkitTransform = c.transitionDuration = "";
      const f = u[ta] = (p) => {
        p && p.target !== u || (!p || /transform$/.test(p.propertyName)) && (u.removeEventListener("transitionend", f), u[ta] = null, mr(u, o));
      };
      u.addEventListener("transitionend", f);
    }), i = [];
  }), () => {
    const o = Oe(e4), a = tv(o);
    let l = o.tag || ht;
    if (i = [], s) for (let u = 0; u < s.length; u++) {
      const c = s[u];
      c.el && c.el instanceof Element && (i.push(c), Dr(c, os(c, a, r, n)), yv.set(c, c.el.getBoundingClientRect()));
    }
    s = t.default ? Ul(t.default()) : [];
    for (let u = 0; u < s.length; u++) {
      const c = s[u];
      c.key != null && Dr(c, os(c, a, r, n));
    }
    return xe(l, null, s);
  };
} }), e0 = QS;
function t0(e4) {
  const t = e4.el;
  t[ta] && t[ta](), t[kv] && t[kv]();
}
function n0(e4) {
  bv.set(e4, e4.el.getBoundingClientRect());
}
function r0(e4) {
  const t = yv.get(e4), n = bv.get(e4), r = t.left - n.left, i = t.top - n.top;
  if (r || i) {
    const s = e4.el.style;
    return s.transform = s.webkitTransform = `translate(${r}px,${i}px)`, s.transitionDuration = "0s", e4;
  }
}
function i0(e4, t, n) {
  const r = e4.cloneNode(), i = e4[mi];
  i && i.forEach((a) => {
    a.split(/\s+/).forEach((l) => l && r.classList.remove(l));
  }), n.split(/\s+/).forEach((a) => a && r.classList.add(a)), r.style.display = "none";
  const s = t.nodeType === 1 ? t : t.parentNode;
  s.appendChild(r);
  const { hasTransform: o } = iv(r);
  return s.removeChild(r), o;
}
const gr = (e4) => {
  const t = e4.props["onUpdate:modelValue"] || false;
  return de(t) ? (n) => ko(t, n) : t;
};
function s0(e4) {
  e4.target.composing = true;
}
function wv(e4) {
  const t = e4.target;
  t.composing && (t.composing = false, t.dispatchEvent(new Event("input")));
}
const sn = Symbol("_assign"), mc = { created(e4, { modifiers: { lazy: t, trim: n, number: r } }, i) {
  e4[sn] = gr(i);
  const s = r || i.props && i.props.type === "number";
  Qn(e4, t ? "change" : "input", (o) => {
    if (o.target.composing) return;
    let a = e4.value;
    n && (a = a.trim()), s && (a = wo(a)), e4[sn](a);
  }), n && Qn(e4, "change", () => {
    e4.value = e4.value.trim();
  }), t || (Qn(e4, "compositionstart", s0), Qn(e4, "compositionend", wv), Qn(e4, "change", wv));
}, mounted(e4, { value: t }) {
  e4.value = t ?? "";
}, beforeUpdate(e4, { value: t, oldValue: n, modifiers: { lazy: r, trim: i, number: s } }, o) {
  if (e4[sn] = gr(o), e4.composing) return;
  const a = (s || e4.type === "number") && !/^0\d/.test(e4.value) ? wo(e4.value) : e4.value, l = t ?? "";
  a !== l && (document.activeElement === e4 && e4.type !== "range" && (r && t === n || i && e4.value.trim() === l) || (e4.value = l));
} }, o0 = { deep: true, created(e4, t, n) {
  e4[sn] = gr(n), Qn(e4, "change", () => {
    const r = e4._modelValue, i = yi(e4), s = e4.checked, o = e4[sn];
    if (de(r)) {
      const a = Sl(r, i), l = a !== -1;
      if (s && !l) o(r.concat(i));
      else if (!s && l) {
        const u = [...r];
        u.splice(a, 1), o(u);
      }
    } else if (si(r)) {
      const a = new Set(r);
      s ? a.add(i) : a.delete(i), o(a);
    } else o(Nv(e4, s));
  });
}, mounted: Sv, beforeUpdate(e4, t, n) {
  e4[sn] = gr(n), Sv(e4, t, n);
} };
function Sv(e4, { value: t, oldValue: n }, r) {
  e4._modelValue = t;
  let i;
  if (de(t)) i = Sl(t, r.props.value) > -1;
  else if (si(t)) i = t.has(r.props.value);
  else {
    if (t === n) return;
    i = Mr(t, Nv(e4, true));
  }
  e4.checked !== i && (e4.checked = i);
}
const Ev = { created(e4, { value: t }, n) {
  e4.checked = Mr(t, n.props.value), e4[sn] = gr(n), Qn(e4, "change", () => {
    e4[sn](yi(e4));
  });
}, beforeUpdate(e4, { value: t, oldValue: n }, r) {
  e4[sn] = gr(r), t !== n && (e4.checked = Mr(t, r.props.value));
} }, Av = { deep: true, created(e4, { value: t, modifiers: { number: n } }, r) {
  const i = si(t);
  Qn(e4, "change", () => {
    const s = Array.prototype.filter.call(e4.options, (o) => o.selected).map((o) => n ? wo(yi(o)) : yi(o));
    e4[sn](e4.multiple ? i ? new Set(s) : s : s[0]), e4._assigning = true, Lr(() => {
      e4._assigning = false;
    });
  }), e4[sn] = gr(r);
}, mounted(e4, { value: t }) {
  Tv(e4, t);
}, beforeUpdate(e4, t, n) {
  e4[sn] = gr(n);
}, updated(e4, { value: t }) {
  e4._assigning || Tv(e4, t);
} };
function Tv(e4, t) {
  const n = e4.multiple, r = de(t);
  if (!(n && !r && !si(t))) {
    for (let i = 0, s = e4.options.length; i < s; i++) {
      const o = e4.options[i], a = yi(o);
      if (n) if (r) {
        const l = typeof a;
        l === "string" || l === "number" ? o.selected = t.some((u) => String(u) === String(a)) : o.selected = Sl(t, a) > -1;
      } else o.selected = t.has(a);
      else if (Mr(yi(o), t)) {
        e4.selectedIndex !== i && (e4.selectedIndex = i);
        return;
      }
    }
    !n && e4.selectedIndex !== -1 && (e4.selectedIndex = -1);
  }
}
function yi(e4) {
  return "_value" in e4 ? e4._value : e4.value;
}
function Nv(e4, t) {
  const n = t ? "_trueValue" : "_falseValue";
  return n in e4 ? e4[n] : t;
}
const a0 = { created(e4, t, n) {
  na(e4, t, n, null, "created");
}, mounted(e4, t, n) {
  na(e4, t, n, null, "mounted");
}, beforeUpdate(e4, t, n, r) {
  na(e4, t, n, r, "beforeUpdate");
}, updated(e4, t, n, r) {
  na(e4, t, n, r, "updated");
} };
function l0(e4, t) {
  switch (e4) {
    case "SELECT":
      return Av;
    case "TEXTAREA":
      return mc;
    default:
      switch (t) {
        case "checkbox":
          return o0;
        case "radio":
          return Ev;
        default:
          return mc;
      }
  }
}
function na(e4, t, n, r, i) {
  const o = l0(e4.tagName, n.props && n.props.type)[i];
  o && o(e4, t, n, r);
}
const c0 = ["ctrl", "shift", "alt", "meta"], u0 = { stop: (e4) => e4.stopPropagation(), prevent: (e4) => e4.preventDefault(), self: (e4) => e4.target !== e4.currentTarget, ctrl: (e4) => !e4.ctrlKey, shift: (e4) => !e4.shiftKey, alt: (e4) => !e4.altKey, meta: (e4) => !e4.metaKey, left: (e4) => "button" in e4 && e4.button !== 0, middle: (e4) => "button" in e4 && e4.button !== 1, right: (e4) => "button" in e4 && e4.button !== 2, exact: (e4, t) => c0.some((n) => e4[`${n}Key`] && !t.includes(n)) }, Cv = (e4, t) => {
  const n = e4._withMods || (e4._withMods = {}), r = t.join(".");
  return n[r] || (n[r] = ((i, ...s) => {
    for (let o = 0; o < t.length; o++) {
      const a = u0[t[o]];
      if (a && a(i, t)) return;
    }
    return e4(i, ...s);
  }));
}, d0 = { esc: "escape", space: " ", up: "arrow-up", left: "arrow-left", right: "arrow-right", down: "arrow-down", delete: "backspace" }, _v = (e4, t) => {
  const n = e4._withKeys || (e4._withKeys = {}), r = t.join(".");
  return n[r] || (n[r] = ((i) => {
    if (!("key" in i)) return;
    const s = Wn(i.key);
    if (t.some((o) => o === s || d0[o] === s)) return e4(i);
  }));
}, f0 = ut({ patchProp: YS }, IS);
let Ov;
function Pv() {
  return Ov || (Ov = oS(f0));
}
const h0 = ((...e4) => {
  Pv().render(...e4);
}), v0 = ((...e4) => {
  const t = Pv().createApp(...e4), { mount: n } = t;
  return t.mount = (r) => {
    const i = m0(r);
    if (!i) return;
    const s = t._component;
    !ge(s) && !s.render && !s.template && (s.template = i.innerHTML), i.nodeType === 1 && (i.textContent = "");
    const o = n(i, false, p0(i));
    return i instanceof Element && (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")), o;
  }, t;
});
function p0(e4) {
  if (e4 instanceof SVGElement) return "svg";
  if (typeof MathMLElement == "function" && e4 instanceof MathMLElement) return "mathml";
}
function m0(e4) {
  return Je(e4) ? document.querySelector(e4) : e4;
}
var xv = {}, ra = {};
ra.byteLength = b0, ra.toByteArray = w0, ra.fromByteArray = A0;
for (var Ln = [], on = [], g0 = typeof Uint8Array < "u" ? Uint8Array : Array, gc = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", bi = 0, y0 = gc.length; bi < y0; ++bi) Ln[bi] = gc[bi], on[gc.charCodeAt(bi)] = bi;
on[45] = 62, on[95] = 63;
function Rv(e4) {
  var t = e4.length;
  if (t % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
  var n = e4.indexOf("=");
  n === -1 && (n = t);
  var r = n === t ? 0 : 4 - n % 4;
  return [n, r];
}
function b0(e4) {
  var t = Rv(e4), n = t[0], r = t[1];
  return (n + r) * 3 / 4 - r;
}
function k0(e4, t, n) {
  return (t + n) * 3 / 4 - n;
}
function w0(e4) {
  var t, n = Rv(e4), r = n[0], i = n[1], s = new g0(k0(e4, r, i)), o = 0, a = i > 0 ? r - 4 : r, l;
  for (l = 0; l < a; l += 4) t = on[e4.charCodeAt(l)] << 18 | on[e4.charCodeAt(l + 1)] << 12 | on[e4.charCodeAt(l + 2)] << 6 | on[e4.charCodeAt(l + 3)], s[o++] = t >> 16 & 255, s[o++] = t >> 8 & 255, s[o++] = t & 255;
  return i === 2 && (t = on[e4.charCodeAt(l)] << 2 | on[e4.charCodeAt(l + 1)] >> 4, s[o++] = t & 255), i === 1 && (t = on[e4.charCodeAt(l)] << 10 | on[e4.charCodeAt(l + 1)] << 4 | on[e4.charCodeAt(l + 2)] >> 2, s[o++] = t >> 8 & 255, s[o++] = t & 255), s;
}
function S0(e4) {
  return Ln[e4 >> 18 & 63] + Ln[e4 >> 12 & 63] + Ln[e4 >> 6 & 63] + Ln[e4 & 63];
}
function E0(e4, t, n) {
  for (var r, i = [], s = t; s < n; s += 3) r = (e4[s] << 16 & 16711680) + (e4[s + 1] << 8 & 65280) + (e4[s + 2] & 255), i.push(S0(r));
  return i.join("");
}
function A0(e4) {
  for (var t, n = e4.length, r = n % 3, i = [], s = 16383, o = 0, a = n - r; o < a; o += s) i.push(E0(e4, o, o + s > a ? a : o + s));
  return r === 1 ? (t = e4[n - 1], i.push(Ln[t >> 2] + Ln[t << 4 & 63] + "==")) : r === 2 && (t = (e4[n - 2] << 8) + e4[n - 1], i.push(Ln[t >> 10] + Ln[t >> 4 & 63] + Ln[t << 2 & 63] + "=")), i.join("");
}
var yc = {};
yc.read = function(e4, t, n, r, i) {
  var s, o, a = i * 8 - r - 1, l = (1 << a) - 1, u = l >> 1, c = -7, f = n ? i - 1 : 0, p = n ? -1 : 1, v = e4[t + f];
  for (f += p, s = v & (1 << -c) - 1, v >>= -c, c += a; c > 0; s = s * 256 + e4[t + f], f += p, c -= 8) ;
  for (o = s & (1 << -c) - 1, s >>= -c, c += r; c > 0; o = o * 256 + e4[t + f], f += p, c -= 8) ;
  if (s === 0) s = 1 - u;
  else {
    if (s === l) return o ? NaN : (v ? -1 : 1) * (1 / 0);
    o = o + Math.pow(2, r), s = s - u;
  }
  return (v ? -1 : 1) * o * Math.pow(2, s - r);
}, yc.write = function(e4, t, n, r, i, s) {
  var o, a, l, u = s * 8 - i - 1, c = (1 << u) - 1, f = c >> 1, p = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, v = r ? 0 : s - 1, m = r ? 1 : -1, y = t < 0 || t === 0 && 1 / t < 0 ? 1 : 0;
  for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (a = isNaN(t) ? 1 : 0, o = c) : (o = Math.floor(Math.log(t) / Math.LN2), t * (l = Math.pow(2, -o)) < 1 && (o--, l *= 2), o + f >= 1 ? t += p / l : t += p * Math.pow(2, 1 - f), t * l >= 2 && (o++, l /= 2), o + f >= c ? (a = 0, o = c) : o + f >= 1 ? (a = (t * l - 1) * Math.pow(2, i), o = o + f) : (a = t * Math.pow(2, f - 1) * Math.pow(2, i), o = 0)); i >= 8; e4[n + v] = a & 255, v += m, a /= 256, i -= 8) ;
  for (o = o << i | a, u += i; u > 0; e4[n + v] = o & 255, v += m, o /= 256, u -= 8) ;
  e4[n + v - m] |= y * 128;
};
(function(e4) {
  const t = ra, n = yc, r = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  e4.Buffer = c, e4.SlowBuffer = F, e4.INSPECT_MAX_BYTES = 50;
  const i = 2147483647;
  e4.kMaxLength = i;
  const { Uint8Array: s, ArrayBuffer: o, SharedArrayBuffer: a } = globalThis;
  c.TYPED_ARRAY_SUPPORT = l(), !c.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
  function l() {
    try {
      const g = new s(1), d = { foo: function() {
        return 42;
      } };
      return Object.setPrototypeOf(d, s.prototype), Object.setPrototypeOf(g, d), g.foo() === 42;
    } catch {
      return false;
    }
  }
  Object.defineProperty(c.prototype, "parent", { enumerable: true, get: function() {
    if (c.isBuffer(this)) return this.buffer;
  } }), Object.defineProperty(c.prototype, "offset", { enumerable: true, get: function() {
    if (c.isBuffer(this)) return this.byteOffset;
  } });
  function u(g) {
    if (g > i) throw new RangeError('The value "' + g + '" is invalid for option "size"');
    const d = new s(g);
    return Object.setPrototypeOf(d, c.prototype), d;
  }
  function c(g, d, h) {
    if (typeof g == "number") {
      if (typeof d == "string") throw new TypeError('The "string" argument must be of type string. Received type number');
      return m(g);
    }
    return f(g, d, h);
  }
  c.poolSize = 8192;
  function f(g, d, h) {
    if (typeof g == "string") return y(g, d);
    if (o.isView(g)) return E(g);
    if (g == null) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof g);
    if (ce(g, o) || g && ce(g.buffer, o) || typeof a < "u" && (ce(g, a) || g && ce(g.buffer, a))) return A(g, d, h);
    if (typeof g == "number") throw new TypeError('The "value" argument must not be of type number. Received type number');
    const b = g.valueOf && g.valueOf();
    if (b != null && b !== g) return c.from(b, d, h);
    const T = C(g);
    if (T) return T;
    if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof g[Symbol.toPrimitive] == "function") return c.from(g[Symbol.toPrimitive]("string"), d, h);
    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof g);
  }
  c.from = function(g, d, h) {
    return f(g, d, h);
  }, Object.setPrototypeOf(c.prototype, s.prototype), Object.setPrototypeOf(c, s);
  function p(g) {
    if (typeof g != "number") throw new TypeError('"size" argument must be of type number');
    if (g < 0) throw new RangeError('The value "' + g + '" is invalid for option "size"');
  }
  function v(g, d, h) {
    return p(g), g <= 0 ? u(g) : d !== void 0 ? typeof h == "string" ? u(g).fill(d, h) : u(g).fill(d) : u(g);
  }
  c.alloc = function(g, d, h) {
    return v(g, d, h);
  };
  function m(g) {
    return p(g), u(g < 0 ? 0 : x(g) | 0);
  }
  c.allocUnsafe = function(g) {
    return m(g);
  }, c.allocUnsafeSlow = function(g) {
    return m(g);
  };
  function y(g, d) {
    if ((typeof d != "string" || d === "") && (d = "utf8"), !c.isEncoding(d)) throw new TypeError("Unknown encoding: " + d);
    const h = Y(g, d) | 0;
    let b = u(h);
    const T = b.write(g, d);
    return T !== h && (b = b.slice(0, T)), b;
  }
  function k(g) {
    const d = g.length < 0 ? 0 : x(g.length) | 0, h = u(d);
    for (let b = 0; b < d; b += 1) h[b] = g[b] & 255;
    return h;
  }
  function E(g) {
    if (ce(g, s)) {
      const d = new s(g);
      return A(d.buffer, d.byteOffset, d.byteLength);
    }
    return k(g);
  }
  function A(g, d, h) {
    if (d < 0 || g.byteLength < d) throw new RangeError('"offset" is outside of buffer bounds');
    if (g.byteLength < d + (h || 0)) throw new RangeError('"length" is outside of buffer bounds');
    let b;
    return d === void 0 && h === void 0 ? b = new s(g) : h === void 0 ? b = new s(g, d) : b = new s(g, d, h), Object.setPrototypeOf(b, c.prototype), b;
  }
  function C(g) {
    if (c.isBuffer(g)) {
      const d = x(g.length) | 0, h = u(d);
      return h.length === 0 || g.copy(h, 0, 0, d), h;
    }
    if (g.length !== void 0) return typeof g.length != "number" || Se(g.length) ? u(0) : k(g);
    if (g.type === "Buffer" && Array.isArray(g.data)) return k(g.data);
  }
  function x(g) {
    if (g >= i) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + i.toString(16) + " bytes");
    return g | 0;
  }
  function F(g) {
    return +g != g && (g = 0), c.alloc(+g);
  }
  c.isBuffer = function(d) {
    return d != null && d._isBuffer === true && d !== c.prototype;
  }, c.compare = function(d, h) {
    if (ce(d, s) && (d = c.from(d, d.offset, d.byteLength)), ce(h, s) && (h = c.from(h, h.offset, h.byteLength)), !c.isBuffer(d) || !c.isBuffer(h)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
    if (d === h) return 0;
    let b = d.length, T = h.length;
    for (let P = 0, I = Math.min(b, T); P < I; ++P) if (d[P] !== h[P]) {
      b = d[P], T = h[P];
      break;
    }
    return b < T ? -1 : T < b ? 1 : 0;
  }, c.isEncoding = function(d) {
    switch (String(d).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return true;
      default:
        return false;
    }
  }, c.concat = function(d, h) {
    if (!Array.isArray(d)) throw new TypeError('"list" argument must be an Array of Buffers');
    if (d.length === 0) return c.alloc(0);
    let b;
    if (h === void 0) for (h = 0, b = 0; b < d.length; ++b) h += d[b].length;
    const T = c.allocUnsafe(h);
    let P = 0;
    for (b = 0; b < d.length; ++b) {
      let I = d[b];
      if (ce(I, s)) P + I.length > T.length ? (c.isBuffer(I) || (I = c.from(I)), I.copy(T, P)) : s.prototype.set.call(T, I, P);
      else if (c.isBuffer(I)) I.copy(T, P);
      else throw new TypeError('"list" argument must be an Array of Buffers');
      P += I.length;
    }
    return T;
  };
  function Y(g, d) {
    if (c.isBuffer(g)) return g.length;
    if (o.isView(g) || ce(g, o)) return g.byteLength;
    if (typeof g != "string") throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof g);
    const h = g.length, b = arguments.length > 2 && arguments[2] === true;
    if (!b && h === 0) return 0;
    let T = false;
    for (; ; ) switch (d) {
      case "ascii":
      case "latin1":
      case "binary":
        return h;
      case "utf8":
      case "utf-8":
        return Z(g).length;
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return h * 2;
      case "hex":
        return h >>> 1;
      case "base64":
        return ne(g).length;
      default:
        if (T) return b ? -1 : Z(g).length;
        d = ("" + d).toLowerCase(), T = true;
    }
  }
  c.byteLength = Y;
  function U(g, d, h) {
    let b = false;
    if ((d === void 0 || d < 0) && (d = 0), d > this.length || ((h === void 0 || h > this.length) && (h = this.length), h <= 0) || (h >>>= 0, d >>>= 0, h <= d)) return "";
    for (g || (g = "utf8"); ; ) switch (g) {
      case "hex":
        return Ge(this, d, h);
      case "utf8":
      case "utf-8":
        return G(this, d, h);
      case "ascii":
        return Me(this, d, h);
      case "latin1":
      case "binary":
        return me(this, d, h);
      case "base64":
        return re(this, d, h);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return Le(this, d, h);
      default:
        if (b) throw new TypeError("Unknown encoding: " + g);
        g = (g + "").toLowerCase(), b = true;
    }
  }
  c.prototype._isBuffer = true;
  function V(g, d, h) {
    const b = g[d];
    g[d] = g[h], g[h] = b;
  }
  c.prototype.swap16 = function() {
    const d = this.length;
    if (d % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (let h = 0; h < d; h += 2) V(this, h, h + 1);
    return this;
  }, c.prototype.swap32 = function() {
    const d = this.length;
    if (d % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (let h = 0; h < d; h += 4) V(this, h, h + 3), V(this, h + 1, h + 2);
    return this;
  }, c.prototype.swap64 = function() {
    const d = this.length;
    if (d % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (let h = 0; h < d; h += 8) V(this, h, h + 7), V(this, h + 1, h + 6), V(this, h + 2, h + 5), V(this, h + 3, h + 4);
    return this;
  }, c.prototype.toString = function() {
    const d = this.length;
    return d === 0 ? "" : arguments.length === 0 ? G(this, 0, d) : U.apply(this, arguments);
  }, c.prototype.toLocaleString = c.prototype.toString, c.prototype.equals = function(d) {
    if (!c.isBuffer(d)) throw new TypeError("Argument must be a Buffer");
    return this === d ? true : c.compare(this, d) === 0;
  }, c.prototype.inspect = function() {
    let d = "";
    const h = e4.INSPECT_MAX_BYTES;
    return d = this.toString("hex", 0, h).replace(/(.{2})/g, "$1 ").trim(), this.length > h && (d += " ... "), "<Buffer " + d + ">";
  }, r && (c.prototype[r] = c.prototype.inspect), c.prototype.compare = function(d, h, b, T, P) {
    if (ce(d, s) && (d = c.from(d, d.offset, d.byteLength)), !c.isBuffer(d)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof d);
    if (h === void 0 && (h = 0), b === void 0 && (b = d ? d.length : 0), T === void 0 && (T = 0), P === void 0 && (P = this.length), h < 0 || b > d.length || T < 0 || P > this.length) throw new RangeError("out of range index");
    if (T >= P && h >= b) return 0;
    if (T >= P) return -1;
    if (h >= b) return 1;
    if (h >>>= 0, b >>>= 0, T >>>= 0, P >>>= 0, this === d) return 0;
    let I = P - T, Ee = b - h;
    const Ze = Math.min(I, Ee), Ve = this.slice(T, P), Ke = d.slice(h, b);
    for (let He = 0; He < Ze; ++He) if (Ve[He] !== Ke[He]) {
      I = Ve[He], Ee = Ke[He];
      break;
    }
    return I < Ee ? -1 : Ee < I ? 1 : 0;
  };
  function M(g, d, h, b, T) {
    if (g.length === 0) return -1;
    if (typeof h == "string" ? (b = h, h = 0) : h > 2147483647 ? h = 2147483647 : h < -2147483648 && (h = -2147483648), h = +h, Se(h) && (h = T ? 0 : g.length - 1), h < 0 && (h = g.length + h), h >= g.length) {
      if (T) return -1;
      h = g.length - 1;
    } else if (h < 0) if (T) h = 0;
    else return -1;
    if (typeof d == "string" && (d = c.from(d, b)), c.isBuffer(d)) return d.length === 0 ? -1 : q(g, d, h, b, T);
    if (typeof d == "number") return d = d & 255, typeof s.prototype.indexOf == "function" ? T ? s.prototype.indexOf.call(g, d, h) : s.prototype.lastIndexOf.call(g, d, h) : q(g, [d], h, b, T);
    throw new TypeError("val must be string, number or Buffer");
  }
  function q(g, d, h, b, T) {
    let P = 1, I = g.length, Ee = d.length;
    if (b !== void 0 && (b = String(b).toLowerCase(), b === "ucs2" || b === "ucs-2" || b === "utf16le" || b === "utf-16le")) {
      if (g.length < 2 || d.length < 2) return -1;
      P = 2, I /= 2, Ee /= 2, h /= 2;
    }
    function Ze(Ke, He) {
      return P === 1 ? Ke[He] : Ke.readUInt16BE(He * P);
    }
    let Ve;
    if (T) {
      let Ke = -1;
      for (Ve = h; Ve < I; Ve++) if (Ze(g, Ve) === Ze(d, Ke === -1 ? 0 : Ve - Ke)) {
        if (Ke === -1 && (Ke = Ve), Ve - Ke + 1 === Ee) return Ke * P;
      } else Ke !== -1 && (Ve -= Ve - Ke), Ke = -1;
    } else for (h + Ee > I && (h = I - Ee), Ve = h; Ve >= 0; Ve--) {
      let Ke = true;
      for (let He = 0; He < Ee; He++) if (Ze(g, Ve + He) !== Ze(d, He)) {
        Ke = false;
        break;
      }
      if (Ke) return Ve;
    }
    return -1;
  }
  c.prototype.includes = function(d, h, b) {
    return this.indexOf(d, h, b) !== -1;
  }, c.prototype.indexOf = function(d, h, b) {
    return M(this, d, h, b, true);
  }, c.prototype.lastIndexOf = function(d, h, b) {
    return M(this, d, h, b, false);
  };
  function Q(g, d, h, b) {
    h = Number(h) || 0;
    const T = g.length - h;
    b ? (b = Number(b), b > T && (b = T)) : b = T;
    const P = d.length;
    b > P / 2 && (b = P / 2);
    let I;
    for (I = 0; I < b; ++I) {
      const Ee = parseInt(d.substr(I * 2, 2), 16);
      if (Se(Ee)) return I;
      g[h + I] = Ee;
    }
    return I;
  }
  function z(g, d, h, b) {
    return le(Z(d, g.length - h), g, h, b);
  }
  function O(g, d, h, b) {
    return le(H(d), g, h, b);
  }
  function j(g, d, h, b) {
    return le(ne(d), g, h, b);
  }
  function X(g, d, h, b) {
    return le(ve(d, g.length - h), g, h, b);
  }
  c.prototype.write = function(d, h, b, T) {
    if (h === void 0) T = "utf8", b = this.length, h = 0;
    else if (b === void 0 && typeof h == "string") T = h, b = this.length, h = 0;
    else if (isFinite(h)) h = h >>> 0, isFinite(b) ? (b = b >>> 0, T === void 0 && (T = "utf8")) : (T = b, b = void 0);
    else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
    const P = this.length - h;
    if ((b === void 0 || b > P) && (b = P), d.length > 0 && (b < 0 || h < 0) || h > this.length) throw new RangeError("Attempt to write outside buffer bounds");
    T || (T = "utf8");
    let I = false;
    for (; ; ) switch (T) {
      case "hex":
        return Q(this, d, h, b);
      case "utf8":
      case "utf-8":
        return z(this, d, h, b);
      case "ascii":
      case "latin1":
      case "binary":
        return O(this, d, h, b);
      case "base64":
        return j(this, d, h, b);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return X(this, d, h, b);
      default:
        if (I) throw new TypeError("Unknown encoding: " + T);
        T = ("" + T).toLowerCase(), I = true;
    }
  }, c.prototype.toJSON = function() {
    return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
  };
  function re(g, d, h) {
    return d === 0 && h === g.length ? t.fromByteArray(g) : t.fromByteArray(g.slice(d, h));
  }
  function G(g, d, h) {
    h = Math.min(g.length, h);
    const b = [];
    let T = d;
    for (; T < h; ) {
      const P = g[T];
      let I = null, Ee = P > 239 ? 4 : P > 223 ? 3 : P > 191 ? 2 : 1;
      if (T + Ee <= h) {
        let Ze, Ve, Ke, He;
        switch (Ee) {
          case 1:
            P < 128 && (I = P);
            break;
          case 2:
            Ze = g[T + 1], (Ze & 192) === 128 && (He = (P & 31) << 6 | Ze & 63, He > 127 && (I = He));
            break;
          case 3:
            Ze = g[T + 1], Ve = g[T + 2], (Ze & 192) === 128 && (Ve & 192) === 128 && (He = (P & 15) << 12 | (Ze & 63) << 6 | Ve & 63, He > 2047 && (He < 55296 || He > 57343) && (I = He));
            break;
          case 4:
            Ze = g[T + 1], Ve = g[T + 2], Ke = g[T + 3], (Ze & 192) === 128 && (Ve & 192) === 128 && (Ke & 192) === 128 && (He = (P & 15) << 18 | (Ze & 63) << 12 | (Ve & 63) << 6 | Ke & 63, He > 65535 && He < 1114112 && (I = He));
        }
      }
      I === null ? (I = 65533, Ee = 1) : I > 65535 && (I -= 65536, b.push(I >>> 10 & 1023 | 55296), I = 56320 | I & 1023), b.push(I), T += Ee;
    }
    return fe(b);
  }
  const se = 4096;
  function fe(g) {
    const d = g.length;
    if (d <= se) return String.fromCharCode.apply(String, g);
    let h = "", b = 0;
    for (; b < d; ) h += String.fromCharCode.apply(String, g.slice(b, b += se));
    return h;
  }
  function Me(g, d, h) {
    let b = "";
    h = Math.min(g.length, h);
    for (let T = d; T < h; ++T) b += String.fromCharCode(g[T] & 127);
    return b;
  }
  function me(g, d, h) {
    let b = "";
    h = Math.min(g.length, h);
    for (let T = d; T < h; ++T) b += String.fromCharCode(g[T]);
    return b;
  }
  function Ge(g, d, h) {
    const b = g.length;
    (!d || d < 0) && (d = 0), (!h || h < 0 || h > b) && (h = b);
    let T = "";
    for (let P = d; P < h; ++P) T += De[g[P]];
    return T;
  }
  function Le(g, d, h) {
    const b = g.slice(d, h);
    let T = "";
    for (let P = 0; P < b.length - 1; P += 2) T += String.fromCharCode(b[P] + b[P + 1] * 256);
    return T;
  }
  c.prototype.slice = function(d, h) {
    const b = this.length;
    d = ~~d, h = h === void 0 ? b : ~~h, d < 0 ? (d += b, d < 0 && (d = 0)) : d > b && (d = b), h < 0 ? (h += b, h < 0 && (h = 0)) : h > b && (h = b), h < d && (h = d);
    const T = this.subarray(d, h);
    return Object.setPrototypeOf(T, c.prototype), T;
  };
  function Ce(g, d, h) {
    if (g % 1 !== 0 || g < 0) throw new RangeError("offset is not uint");
    if (g + d > h) throw new RangeError("Trying to access beyond buffer length");
  }
  c.prototype.readUintLE = c.prototype.readUIntLE = function(d, h, b) {
    d = d >>> 0, h = h >>> 0, b || Ce(d, h, this.length);
    let T = this[d], P = 1, I = 0;
    for (; ++I < h && (P *= 256); ) T += this[d + I] * P;
    return T;
  }, c.prototype.readUintBE = c.prototype.readUIntBE = function(d, h, b) {
    d = d >>> 0, h = h >>> 0, b || Ce(d, h, this.length);
    let T = this[d + --h], P = 1;
    for (; h > 0 && (P *= 256); ) T += this[d + --h] * P;
    return T;
  }, c.prototype.readUint8 = c.prototype.readUInt8 = function(d, h) {
    return d = d >>> 0, h || Ce(d, 1, this.length), this[d];
  }, c.prototype.readUint16LE = c.prototype.readUInt16LE = function(d, h) {
    return d = d >>> 0, h || Ce(d, 2, this.length), this[d] | this[d + 1] << 8;
  }, c.prototype.readUint16BE = c.prototype.readUInt16BE = function(d, h) {
    return d = d >>> 0, h || Ce(d, 2, this.length), this[d] << 8 | this[d + 1];
  }, c.prototype.readUint32LE = c.prototype.readUInt32LE = function(d, h) {
    return d = d >>> 0, h || Ce(d, 4, this.length), (this[d] | this[d + 1] << 8 | this[d + 2] << 16) + this[d + 3] * 16777216;
  }, c.prototype.readUint32BE = c.prototype.readUInt32BE = function(d, h) {
    return d = d >>> 0, h || Ce(d, 4, this.length), this[d] * 16777216 + (this[d + 1] << 16 | this[d + 2] << 8 | this[d + 3]);
  }, c.prototype.readBigUInt64LE = Ne(function(d) {
    d = d >>> 0, $(d, "offset");
    const h = this[d], b = this[d + 7];
    (h === void 0 || b === void 0) && L(d, this.length - 8);
    const T = h + this[++d] * 2 ** 8 + this[++d] * 2 ** 16 + this[++d] * 2 ** 24, P = this[++d] + this[++d] * 2 ** 8 + this[++d] * 2 ** 16 + b * 2 ** 24;
    return BigInt(T) + (BigInt(P) << BigInt(32));
  }), c.prototype.readBigUInt64BE = Ne(function(d) {
    d = d >>> 0, $(d, "offset");
    const h = this[d], b = this[d + 7];
    (h === void 0 || b === void 0) && L(d, this.length - 8);
    const T = h * 2 ** 24 + this[++d] * 2 ** 16 + this[++d] * 2 ** 8 + this[++d], P = this[++d] * 2 ** 24 + this[++d] * 2 ** 16 + this[++d] * 2 ** 8 + b;
    return (BigInt(T) << BigInt(32)) + BigInt(P);
  }), c.prototype.readIntLE = function(d, h, b) {
    d = d >>> 0, h = h >>> 0, b || Ce(d, h, this.length);
    let T = this[d], P = 1, I = 0;
    for (; ++I < h && (P *= 256); ) T += this[d + I] * P;
    return P *= 128, T >= P && (T -= Math.pow(2, 8 * h)), T;
  }, c.prototype.readIntBE = function(d, h, b) {
    d = d >>> 0, h = h >>> 0, b || Ce(d, h, this.length);
    let T = h, P = 1, I = this[d + --T];
    for (; T > 0 && (P *= 256); ) I += this[d + --T] * P;
    return P *= 128, I >= P && (I -= Math.pow(2, 8 * h)), I;
  }, c.prototype.readInt8 = function(d, h) {
    return d = d >>> 0, h || Ce(d, 1, this.length), this[d] & 128 ? (255 - this[d] + 1) * -1 : this[d];
  }, c.prototype.readInt16LE = function(d, h) {
    d = d >>> 0, h || Ce(d, 2, this.length);
    const b = this[d] | this[d + 1] << 8;
    return b & 32768 ? b | 4294901760 : b;
  }, c.prototype.readInt16BE = function(d, h) {
    d = d >>> 0, h || Ce(d, 2, this.length);
    const b = this[d + 1] | this[d] << 8;
    return b & 32768 ? b | 4294901760 : b;
  }, c.prototype.readInt32LE = function(d, h) {
    return d = d >>> 0, h || Ce(d, 4, this.length), this[d] | this[d + 1] << 8 | this[d + 2] << 16 | this[d + 3] << 24;
  }, c.prototype.readInt32BE = function(d, h) {
    return d = d >>> 0, h || Ce(d, 4, this.length), this[d] << 24 | this[d + 1] << 16 | this[d + 2] << 8 | this[d + 3];
  }, c.prototype.readBigInt64LE = Ne(function(d) {
    d = d >>> 0, $(d, "offset");
    const h = this[d], b = this[d + 7];
    (h === void 0 || b === void 0) && L(d, this.length - 8);
    const T = this[d + 4] + this[d + 5] * 2 ** 8 + this[d + 6] * 2 ** 16 + (b << 24);
    return (BigInt(T) << BigInt(32)) + BigInt(h + this[++d] * 2 ** 8 + this[++d] * 2 ** 16 + this[++d] * 2 ** 24);
  }), c.prototype.readBigInt64BE = Ne(function(d) {
    d = d >>> 0, $(d, "offset");
    const h = this[d], b = this[d + 7];
    (h === void 0 || b === void 0) && L(d, this.length - 8);
    const T = (h << 24) + this[++d] * 2 ** 16 + this[++d] * 2 ** 8 + this[++d];
    return (BigInt(T) << BigInt(32)) + BigInt(this[++d] * 2 ** 24 + this[++d] * 2 ** 16 + this[++d] * 2 ** 8 + b);
  }), c.prototype.readFloatLE = function(d, h) {
    return d = d >>> 0, h || Ce(d, 4, this.length), n.read(this, d, true, 23, 4);
  }, c.prototype.readFloatBE = function(d, h) {
    return d = d >>> 0, h || Ce(d, 4, this.length), n.read(this, d, false, 23, 4);
  }, c.prototype.readDoubleLE = function(d, h) {
    return d = d >>> 0, h || Ce(d, 8, this.length), n.read(this, d, true, 52, 8);
  }, c.prototype.readDoubleBE = function(d, h) {
    return d = d >>> 0, h || Ce(d, 8, this.length), n.read(this, d, false, 52, 8);
  };
  function ye(g, d, h, b, T, P) {
    if (!c.isBuffer(g)) throw new TypeError('"buffer" argument must be a Buffer instance');
    if (d > T || d < P) throw new RangeError('"value" argument is out of bounds');
    if (h + b > g.length) throw new RangeError("Index out of range");
  }
  c.prototype.writeUintLE = c.prototype.writeUIntLE = function(d, h, b, T) {
    if (d = +d, h = h >>> 0, b = b >>> 0, !T) {
      const Ee = Math.pow(2, 8 * b) - 1;
      ye(this, d, h, b, Ee, 0);
    }
    let P = 1, I = 0;
    for (this[h] = d & 255; ++I < b && (P *= 256); ) this[h + I] = d / P & 255;
    return h + b;
  }, c.prototype.writeUintBE = c.prototype.writeUIntBE = function(d, h, b, T) {
    if (d = +d, h = h >>> 0, b = b >>> 0, !T) {
      const Ee = Math.pow(2, 8 * b) - 1;
      ye(this, d, h, b, Ee, 0);
    }
    let P = b - 1, I = 1;
    for (this[h + P] = d & 255; --P >= 0 && (I *= 256); ) this[h + P] = d / I & 255;
    return h + b;
  }, c.prototype.writeUint8 = c.prototype.writeUInt8 = function(d, h, b) {
    return d = +d, h = h >>> 0, b || ye(this, d, h, 1, 255, 0), this[h] = d & 255, h + 1;
  }, c.prototype.writeUint16LE = c.prototype.writeUInt16LE = function(d, h, b) {
    return d = +d, h = h >>> 0, b || ye(this, d, h, 2, 65535, 0), this[h] = d & 255, this[h + 1] = d >>> 8, h + 2;
  }, c.prototype.writeUint16BE = c.prototype.writeUInt16BE = function(d, h, b) {
    return d = +d, h = h >>> 0, b || ye(this, d, h, 2, 65535, 0), this[h] = d >>> 8, this[h + 1] = d & 255, h + 2;
  }, c.prototype.writeUint32LE = c.prototype.writeUInt32LE = function(d, h, b) {
    return d = +d, h = h >>> 0, b || ye(this, d, h, 4, 4294967295, 0), this[h + 3] = d >>> 24, this[h + 2] = d >>> 16, this[h + 1] = d >>> 8, this[h] = d & 255, h + 4;
  }, c.prototype.writeUint32BE = c.prototype.writeUInt32BE = function(d, h, b) {
    return d = +d, h = h >>> 0, b || ye(this, d, h, 4, 4294967295, 0), this[h] = d >>> 24, this[h + 1] = d >>> 16, this[h + 2] = d >>> 8, this[h + 3] = d & 255, h + 4;
  };
  function tt(g, d, h, b, T) {
    B(d, b, T, g, h, 7);
    let P = Number(d & BigInt(4294967295));
    g[h++] = P, P = P >> 8, g[h++] = P, P = P >> 8, g[h++] = P, P = P >> 8, g[h++] = P;
    let I = Number(d >> BigInt(32) & BigInt(4294967295));
    return g[h++] = I, I = I >> 8, g[h++] = I, I = I >> 8, g[h++] = I, I = I >> 8, g[h++] = I, h;
  }
  function D(g, d, h, b, T) {
    B(d, b, T, g, h, 7);
    let P = Number(d & BigInt(4294967295));
    g[h + 7] = P, P = P >> 8, g[h + 6] = P, P = P >> 8, g[h + 5] = P, P = P >> 8, g[h + 4] = P;
    let I = Number(d >> BigInt(32) & BigInt(4294967295));
    return g[h + 3] = I, I = I >> 8, g[h + 2] = I, I = I >> 8, g[h + 1] = I, I = I >> 8, g[h] = I, h + 8;
  }
  c.prototype.writeBigUInt64LE = Ne(function(d, h = 0) {
    return tt(this, d, h, BigInt(0), BigInt("0xffffffffffffffff"));
  }), c.prototype.writeBigUInt64BE = Ne(function(d, h = 0) {
    return D(this, d, h, BigInt(0), BigInt("0xffffffffffffffff"));
  }), c.prototype.writeIntLE = function(d, h, b, T) {
    if (d = +d, h = h >>> 0, !T) {
      const Ze = Math.pow(2, 8 * b - 1);
      ye(this, d, h, b, Ze - 1, -Ze);
    }
    let P = 0, I = 1, Ee = 0;
    for (this[h] = d & 255; ++P < b && (I *= 256); ) d < 0 && Ee === 0 && this[h + P - 1] !== 0 && (Ee = 1), this[h + P] = (d / I >> 0) - Ee & 255;
    return h + b;
  }, c.prototype.writeIntBE = function(d, h, b, T) {
    if (d = +d, h = h >>> 0, !T) {
      const Ze = Math.pow(2, 8 * b - 1);
      ye(this, d, h, b, Ze - 1, -Ze);
    }
    let P = b - 1, I = 1, Ee = 0;
    for (this[h + P] = d & 255; --P >= 0 && (I *= 256); ) d < 0 && Ee === 0 && this[h + P + 1] !== 0 && (Ee = 1), this[h + P] = (d / I >> 0) - Ee & 255;
    return h + b;
  }, c.prototype.writeInt8 = function(d, h, b) {
    return d = +d, h = h >>> 0, b || ye(this, d, h, 1, 127, -128), d < 0 && (d = 255 + d + 1), this[h] = d & 255, h + 1;
  }, c.prototype.writeInt16LE = function(d, h, b) {
    return d = +d, h = h >>> 0, b || ye(this, d, h, 2, 32767, -32768), this[h] = d & 255, this[h + 1] = d >>> 8, h + 2;
  }, c.prototype.writeInt16BE = function(d, h, b) {
    return d = +d, h = h >>> 0, b || ye(this, d, h, 2, 32767, -32768), this[h] = d >>> 8, this[h + 1] = d & 255, h + 2;
  }, c.prototype.writeInt32LE = function(d, h, b) {
    return d = +d, h = h >>> 0, b || ye(this, d, h, 4, 2147483647, -2147483648), this[h] = d & 255, this[h + 1] = d >>> 8, this[h + 2] = d >>> 16, this[h + 3] = d >>> 24, h + 4;
  }, c.prototype.writeInt32BE = function(d, h, b) {
    return d = +d, h = h >>> 0, b || ye(this, d, h, 4, 2147483647, -2147483648), d < 0 && (d = 4294967295 + d + 1), this[h] = d >>> 24, this[h + 1] = d >>> 16, this[h + 2] = d >>> 8, this[h + 3] = d & 255, h + 4;
  }, c.prototype.writeBigInt64LE = Ne(function(d, h = 0) {
    return tt(this, d, h, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  }), c.prototype.writeBigInt64BE = Ne(function(d, h = 0) {
    return D(this, d, h, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  });
  function te(g, d, h, b, T, P) {
    if (h + b > g.length) throw new RangeError("Index out of range");
    if (h < 0) throw new RangeError("Index out of range");
  }
  function ee(g, d, h, b, T) {
    return d = +d, h = h >>> 0, T || te(g, d, h, 4), n.write(g, d, h, b, 23, 4), h + 4;
  }
  c.prototype.writeFloatLE = function(d, h, b) {
    return ee(this, d, h, true, b);
  }, c.prototype.writeFloatBE = function(d, h, b) {
    return ee(this, d, h, false, b);
  };
  function ae(g, d, h, b, T) {
    return d = +d, h = h >>> 0, T || te(g, d, h, 8), n.write(g, d, h, b, 52, 8), h + 8;
  }
  c.prototype.writeDoubleLE = function(d, h, b) {
    return ae(this, d, h, true, b);
  }, c.prototype.writeDoubleBE = function(d, h, b) {
    return ae(this, d, h, false, b);
  }, c.prototype.copy = function(d, h, b, T) {
    if (!c.isBuffer(d)) throw new TypeError("argument should be a Buffer");
    if (b || (b = 0), !T && T !== 0 && (T = this.length), h >= d.length && (h = d.length), h || (h = 0), T > 0 && T < b && (T = b), T === b || d.length === 0 || this.length === 0) return 0;
    if (h < 0) throw new RangeError("targetStart out of bounds");
    if (b < 0 || b >= this.length) throw new RangeError("Index out of range");
    if (T < 0) throw new RangeError("sourceEnd out of bounds");
    T > this.length && (T = this.length), d.length - h < T - b && (T = d.length - h + b);
    const P = T - b;
    return this === d && typeof s.prototype.copyWithin == "function" ? this.copyWithin(h, b, T) : s.prototype.set.call(d, this.subarray(b, T), h), P;
  }, c.prototype.fill = function(d, h, b, T) {
    if (typeof d == "string") {
      if (typeof h == "string" ? (T = h, h = 0, b = this.length) : typeof b == "string" && (T = b, b = this.length), T !== void 0 && typeof T != "string") throw new TypeError("encoding must be a string");
      if (typeof T == "string" && !c.isEncoding(T)) throw new TypeError("Unknown encoding: " + T);
      if (d.length === 1) {
        const I = d.charCodeAt(0);
        (T === "utf8" && I < 128 || T === "latin1") && (d = I);
      }
    } else typeof d == "number" ? d = d & 255 : typeof d == "boolean" && (d = Number(d));
    if (h < 0 || this.length < h || this.length < b) throw new RangeError("Out of range index");
    if (b <= h) return this;
    h = h >>> 0, b = b === void 0 ? this.length : b >>> 0, d || (d = 0);
    let P;
    if (typeof d == "number") for (P = h; P < b; ++P) this[P] = d;
    else {
      const I = c.isBuffer(d) ? d : c.from(d, T), Ee = I.length;
      if (Ee === 0) throw new TypeError('The value "' + d + '" is invalid for argument "value"');
      for (P = 0; P < b - h; ++P) this[P + h] = I[P % Ee];
    }
    return this;
  };
  const _e = {};
  function w(g, d, h) {
    _e[g] = class extends h {
      constructor() {
        super(), Object.defineProperty(this, "message", { value: d.apply(this, arguments), writable: true, configurable: true }), this.name = `${this.name} [${g}]`, this.stack, delete this.name;
      }
      get code() {
        return g;
      }
      set code(T) {
        Object.defineProperty(this, "code", { configurable: true, enumerable: true, value: T, writable: true });
      }
      toString() {
        return `${this.name} [${g}]: ${this.message}`;
      }
    };
  }
  w("ERR_BUFFER_OUT_OF_BOUNDS", function(g) {
    return g ? `${g} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
  }, RangeError), w("ERR_INVALID_ARG_TYPE", function(g, d) {
    return `The "${g}" argument must be of type number. Received type ${typeof d}`;
  }, TypeError), w("ERR_OUT_OF_RANGE", function(g, d, h) {
    let b = `The value of "${g}" is out of range.`, T = h;
    return Number.isInteger(h) && Math.abs(h) > 2 ** 32 ? T = S(String(h)) : typeof h == "bigint" && (T = String(h), (h > BigInt(2) ** BigInt(32) || h < -(BigInt(2) ** BigInt(32))) && (T = S(T)), T += "n"), b += ` It must be ${d}. Received ${T}`, b;
  }, RangeError);
  function S(g) {
    let d = "", h = g.length;
    const b = g[0] === "-" ? 1 : 0;
    for (; h >= b + 4; h -= 3) d = `_${g.slice(h - 3, h)}${d}`;
    return `${g.slice(0, h)}${d}`;
  }
  function _(g, d, h) {
    $(d, "offset"), (g[d] === void 0 || g[d + h] === void 0) && L(d, g.length - (h + 1));
  }
  function B(g, d, h, b, T, P) {
    if (g > h || g < d) {
      const I = typeof d == "bigint" ? "n" : "";
      let Ee;
      throw d === 0 || d === BigInt(0) ? Ee = `>= 0${I} and < 2${I} ** ${(P + 1) * 8}${I}` : Ee = `>= -(2${I} ** ${(P + 1) * 8 - 1}${I}) and < 2 ** ${(P + 1) * 8 - 1}${I}`, new _e.ERR_OUT_OF_RANGE("value", Ee, g);
    }
    _(b, T, P);
  }
  function $(g, d) {
    if (typeof g != "number") throw new _e.ERR_INVALID_ARG_TYPE(d, "number", g);
  }
  function L(g, d, h) {
    throw Math.floor(g) !== g ? ($(g, h), new _e.ERR_OUT_OF_RANGE("offset", "an integer", g)) : d < 0 ? new _e.ERR_BUFFER_OUT_OF_BOUNDS() : new _e.ERR_OUT_OF_RANGE("offset", `>= 0 and <= ${d}`, g);
  }
  const J = /[^+/0-9A-Za-z-_]/g;
  function K(g) {
    if (g = g.split("=")[0], g = g.trim().replace(J, ""), g.length < 2) return "";
    for (; g.length % 4 !== 0; ) g = g + "=";
    return g;
  }
  function Z(g, d) {
    d = d || 1 / 0;
    let h;
    const b = g.length;
    let T = null;
    const P = [];
    for (let I = 0; I < b; ++I) {
      if (h = g.charCodeAt(I), h > 55295 && h < 57344) {
        if (!T) {
          if (h > 56319) {
            (d -= 3) > -1 && P.push(239, 191, 189);
            continue;
          } else if (I + 1 === b) {
            (d -= 3) > -1 && P.push(239, 191, 189);
            continue;
          }
          T = h;
          continue;
        }
        if (h < 56320) {
          (d -= 3) > -1 && P.push(239, 191, 189), T = h;
          continue;
        }
        h = (T - 55296 << 10 | h - 56320) + 65536;
      } else T && (d -= 3) > -1 && P.push(239, 191, 189);
      if (T = null, h < 128) {
        if ((d -= 1) < 0) break;
        P.push(h);
      } else if (h < 2048) {
        if ((d -= 2) < 0) break;
        P.push(h >> 6 | 192, h & 63 | 128);
      } else if (h < 65536) {
        if ((d -= 3) < 0) break;
        P.push(h >> 12 | 224, h >> 6 & 63 | 128, h & 63 | 128);
      } else if (h < 1114112) {
        if ((d -= 4) < 0) break;
        P.push(h >> 18 | 240, h >> 12 & 63 | 128, h >> 6 & 63 | 128, h & 63 | 128);
      } else throw new Error("Invalid code point");
    }
    return P;
  }
  function H(g) {
    const d = [];
    for (let h = 0; h < g.length; ++h) d.push(g.charCodeAt(h) & 255);
    return d;
  }
  function ve(g, d) {
    let h, b, T;
    const P = [];
    for (let I = 0; I < g.length && !((d -= 2) < 0); ++I) h = g.charCodeAt(I), b = h >> 8, T = h % 256, P.push(T), P.push(b);
    return P;
  }
  function ne(g) {
    return t.toByteArray(K(g));
  }
  function le(g, d, h, b) {
    let T;
    for (T = 0; T < b && !(T + h >= d.length || T >= g.length); ++T) d[T + h] = g[T];
    return T;
  }
  function ce(g, d) {
    return g instanceof d || g != null && g.constructor != null && g.constructor.name != null && g.constructor.name === d.name;
  }
  function Se(g) {
    return g !== g;
  }
  const De = (function() {
    const g = "0123456789abcdef", d = new Array(256);
    for (let h = 0; h < 16; ++h) {
      const b = h * 16;
      for (let T = 0; T < 16; ++T) d[b + T] = g[h] + g[T];
    }
    return d;
  })();
  function Ne(g) {
    return typeof BigInt > "u" ? mt : g;
  }
  function mt() {
    throw new Error("BigInt not supported");
  }
})(xv);
const Mv = xv.Buffer;
let jv;
const ia = (e4) => jv = e4, Iv = Symbol();
function bc(e4) {
  return e4 && typeof e4 == "object" && Object.prototype.toString.call(e4) === "[object Object]" && typeof e4.toJSON != "function";
}
var ws;
(function(e4) {
  e4.direct = "direct", e4.patchObject = "patch object", e4.patchFunction = "patch function";
})(ws || (ws = {}));
function T0() {
  const e4 = Al(true), t = e4.run(() => Gt({}));
  let n = [], r = [];
  const i = Ro({ install(s) {
    ia(i), i._a = s, s.provide(Iv, i), s.config.globalProperties.$pinia = i, r.forEach((o) => n.push(o)), r = [];
  }, use(s) {
    return this._a ? n.push(s) : r.push(s), this;
  }, _p: n, _a: null, _e: e4, _s: /* @__PURE__ */ new Map(), state: t });
  return i;
}
const Lv = () => {
};
function Fv(e4, t, n, r = Lv) {
  e4.push(t);
  const i = () => {
    const s = e4.indexOf(t);
    s > -1 && (e4.splice(s, 1), r());
  };
  return !n && Ao() && Tl(i), i;
}
function ki(e4, ...t) {
  e4.slice().forEach((n) => {
    n(...t);
  });
}
const N0 = (e4) => e4(), Dv = Symbol(), kc = Symbol();
function wc(e4, t) {
  e4 instanceof Map && t instanceof Map ? t.forEach((n, r) => e4.set(r, n)) : e4 instanceof Set && t instanceof Set && t.forEach(e4.add, e4);
  for (const n in t) {
    if (!t.hasOwnProperty(n)) continue;
    const r = t[n], i = e4[n];
    bc(i) && bc(r) && e4.hasOwnProperty(n) && !rt(r) && !ur(r) ? e4[n] = wc(i, r) : e4[n] = r;
  }
  return e4;
}
const C0 = Symbol();
function _0(e4) {
  return !bc(e4) || !Object.prototype.hasOwnProperty.call(e4, C0);
}
const { assign: yr } = Object;
function O0(e4) {
  return !!(rt(e4) && e4.effect);
}
function P0(e4, t, n, r) {
  const { state: i, actions: s, getters: o } = t, a = n.state.value[e4];
  let l;
  function u() {
    a || (n.state.value[e4] = i ? i() : {});
    const c = vw(n.state.value[e4]);
    return yr(c, s, Object.keys(o || {}).reduce((f, p) => (f[p] = Ro(ke(() => {
      ia(n);
      const v = n._s.get(e4);
      return o[p].call(v, v);
    })), f), {}));
  }
  return l = Bv(e4, u, t, n, r, true), l;
}
function Bv(e4, t, n = {}, r, i, s) {
  let o;
  const a = yr({ actions: {} }, n), l = { deep: true };
  let u, c, f = [], p = [], v;
  const m = r.state.value[e4];
  !s && !m && (r.state.value[e4] = {}), Gt({});
  let y;
  function k(V) {
    let M;
    u = c = false, typeof V == "function" ? (V(r.state.value[e4]), M = { type: ws.patchFunction, storeId: e4, events: v }) : (wc(r.state.value[e4], V), M = { type: ws.patchObject, payload: V, storeId: e4, events: v });
    const q = y = Symbol();
    Lr().then(() => {
      y === q && (u = true);
    }), c = true, ki(f, M, r.state.value[e4]);
  }
  const E = s ? function() {
    const { state: M } = n, q = M ? M() : {};
    this.$patch((Q) => {
      yr(Q, q);
    });
  } : Lv;
  function A() {
    o.stop(), f = [], p = [], r._s.delete(e4);
  }
  const C = (V, M = "") => {
    if (Dv in V) return V[kc] = M, V;
    const q = function() {
      ia(r);
      const Q = Array.from(arguments), z = [], O = [];
      function j(G) {
        z.push(G);
      }
      function X(G) {
        O.push(G);
      }
      ki(p, { args: Q, name: q[kc], store: F, after: j, onError: X });
      let re;
      try {
        re = V.apply(this && this.$id === e4 ? this : F, Q);
      } catch (G) {
        throw ki(O, G), G;
      }
      return re instanceof Promise ? re.then((G) => (ki(z, G), G)).catch((G) => (ki(O, G), Promise.reject(G))) : (ki(z, re), re);
    };
    return q[Dv] = true, q[kc] = M, q;
  }, x = { _p: r, $id: e4, $onAction: Fv.bind(null, p), $patch: k, $reset: E, $subscribe(V, M = {}) {
    const q = Fv(f, V, M.detached, () => Q()), Q = o.run(() => ft(() => r.state.value[e4], (z) => {
      (M.flush === "sync" ? c : u) && V({ storeId: e4, type: ws.direct, events: v }, z);
    }, yr({}, l, M)));
    return q;
  }, $dispose: A }, F = cr(x);
  r._s.set(e4, F);
  const U = (r._a && r._a.runWithContext || N0)(() => r._e.run(() => (o = Al()).run(() => t({ action: C }))));
  for (const V in U) {
    const M = U[V];
    if (rt(M) && !O0(M) || ur(M)) s || (m && _0(M) && (rt(M) ? M.value = m[V] : wc(M, m[V])), r.state.value[e4][V] = M);
    else if (typeof M == "function") {
      const q = C(M, V);
      U[V] = q, a.actions[V] = M;
    }
  }
  return yr(F, U), yr(Oe(F), U), Object.defineProperty(F, "$state", { get: () => r.state.value[e4], set: (V) => {
    k((M) => {
      yr(M, V);
    });
  } }), r._p.forEach((V) => {
    yr(F, o.run(() => V({ store: F, app: r._a, pinia: r, options: a })));
  }), m && s && n.hydrate && n.hydrate(F.$state, m), u = true, c = true, F;
}
function x0(e4, t, n) {
  let r;
  const i = typeof t == "function";
  r = i ? n : t;
  function s(o, a) {
    const l = tc();
    return o = o || (l ? kt(Iv, null) : null), o && ia(o), o = jv, o._s.has(e4) || (i ? Bv(e4, t, r, o) : P0(e4, r, o)), o._s.get(e4);
  }
  return s.$id = e4, s;
}
var Ss = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Es(e4) {
  return e4 && e4.__esModule && Object.prototype.hasOwnProperty.call(e4, "default") ? e4.default : e4;
}
function R0(e4) {
  if (Object.prototype.hasOwnProperty.call(e4, "__esModule")) return e4;
  var t = e4.default;
  if (typeof t == "function") {
    var n = function r() {
      return this instanceof r ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    n.prototype = t.prototype;
  } else n = {};
  return Object.defineProperty(n, "__esModule", { value: true }), Object.keys(e4).forEach(function(r) {
    var i = Object.getOwnPropertyDescriptor(e4, r);
    Object.defineProperty(n, r, i.get ? i : { enumerable: true, get: function() {
      return e4[r];
    } });
  }), n;
}
var Sc, zv;
function Ec() {
  if (zv) return Sc;
  zv = 1;
  function e4(t) {
    var n = typeof t;
    return t != null && (n == "object" || n == "function");
  }
  return Sc = e4, Sc;
}
var Ac, $v;
function Uv() {
  if ($v) return Ac;
  $v = 1;
  var e4 = typeof Ss == "object" && Ss && Ss.Object === Object && Ss;
  return Ac = e4, Ac;
}
var Tc, Vv;
function Nc() {
  if (Vv) return Tc;
  Vv = 1;
  var e4 = Uv(), t = typeof self == "object" && self && self.Object === Object && self, n = e4 || t || Function("return this")();
  return Tc = n, Tc;
}
var Cc, Hv;
function M0() {
  if (Hv) return Cc;
  Hv = 1;
  var e4 = Nc(), t = function() {
    return e4.Date.now();
  };
  return Cc = t, Cc;
}
var _c, qv;
function j0() {
  if (qv) return _c;
  qv = 1;
  var e4 = /\s/;
  function t(n) {
    for (var r = n.length; r-- && e4.test(n.charAt(r)); ) ;
    return r;
  }
  return _c = t, _c;
}
var Oc, Wv;
function I0() {
  if (Wv) return Oc;
  Wv = 1;
  var e4 = j0(), t = /^\s+/;
  function n(r) {
    return r && r.slice(0, e4(r) + 1).replace(t, "");
  }
  return Oc = n, Oc;
}
var Pc, Gv;
function xc() {
  if (Gv) return Pc;
  Gv = 1;
  var e4 = Nc(), t = e4.Symbol;
  return Pc = t, Pc;
}
var Rc, Zv;
function L0() {
  if (Zv) return Rc;
  Zv = 1;
  var e4 = xc(), t = Object.prototype, n = t.hasOwnProperty, r = t.toString, i = e4 ? e4.toStringTag : void 0;
  function s(o) {
    var a = n.call(o, i), l = o[i];
    try {
      o[i] = void 0;
      var u = true;
    } catch {
    }
    var c = r.call(o);
    return u && (a ? o[i] = l : delete o[i]), c;
  }
  return Rc = s, Rc;
}
var Mc, Kv;
function F0() {
  if (Kv) return Mc;
  Kv = 1;
  var e4 = Object.prototype, t = e4.toString;
  function n(r) {
    return t.call(r);
  }
  return Mc = n, Mc;
}
var jc, Yv;
function Xv() {
  if (Yv) return jc;
  Yv = 1;
  var e4 = xc(), t = L0(), n = F0(), r = "[object Null]", i = "[object Undefined]", s = e4 ? e4.toStringTag : void 0;
  function o(a) {
    return a == null ? a === void 0 ? i : r : s && s in Object(a) ? t(a) : n(a);
  }
  return jc = o, jc;
}
var Ic, Jv;
function Qv() {
  if (Jv) return Ic;
  Jv = 1;
  function e4(t) {
    return t != null && typeof t == "object";
  }
  return Ic = e4, Ic;
}
var Lc, ep;
function tp() {
  if (ep) return Lc;
  ep = 1;
  var e4 = Xv(), t = Qv(), n = "[object Symbol]";
  function r(i) {
    return typeof i == "symbol" || t(i) && e4(i) == n;
  }
  return Lc = r, Lc;
}
var Fc, np;
function D0() {
  if (np) return Fc;
  np = 1;
  var e4 = I0(), t = Ec(), n = tp(), r = NaN, i = /^[-+]0x[0-9a-f]+$/i, s = /^0b[01]+$/i, o = /^0o[0-7]+$/i, a = parseInt;
  function l(u) {
    if (typeof u == "number") return u;
    if (n(u)) return r;
    if (t(u)) {
      var c = typeof u.valueOf == "function" ? u.valueOf() : u;
      u = t(c) ? c + "" : c;
    }
    if (typeof u != "string") return u === 0 ? u : +u;
    u = e4(u);
    var f = s.test(u);
    return f || o.test(u) ? a(u.slice(2), f ? 2 : 8) : i.test(u) ? r : +u;
  }
  return Fc = l, Fc;
}
var Dc, rp;
function B0() {
  if (rp) return Dc;
  rp = 1;
  var e4 = Ec(), t = M0(), n = D0(), r = "Expected a function", i = Math.max, s = Math.min;
  function o(a, l, u) {
    var c, f, p, v, m, y, k = 0, E = false, A = false, C = true;
    if (typeof a != "function") throw new TypeError(r);
    l = n(l) || 0, e4(u) && (E = !!u.leading, A = "maxWait" in u, p = A ? i(n(u.maxWait) || 0, l) : p, C = "trailing" in u ? !!u.trailing : C);
    function x(O) {
      var j = c, X = f;
      return c = f = void 0, k = O, v = a.apply(X, j), v;
    }
    function F(O) {
      return k = O, m = setTimeout(V, l), E ? x(O) : v;
    }
    function Y(O) {
      var j = O - y, X = O - k, re = l - j;
      return A ? s(re, p - X) : re;
    }
    function U(O) {
      var j = O - y, X = O - k;
      return y === void 0 || j >= l || j < 0 || A && X >= p;
    }
    function V() {
      var O = t();
      if (U(O)) return M(O);
      m = setTimeout(V, Y(O));
    }
    function M(O) {
      return m = void 0, C && c ? x(O) : (c = f = void 0, v);
    }
    function q() {
      m !== void 0 && clearTimeout(m), k = 0, c = y = f = m = void 0;
    }
    function Q() {
      return m === void 0 ? v : M(t());
    }
    function z() {
      var O = t(), j = U(O);
      if (c = arguments, f = this, y = O, j) {
        if (m === void 0) return F(y);
        if (A) return clearTimeout(m), m = setTimeout(V, l), x(y);
      }
      return m === void 0 && (m = setTimeout(V, l)), v;
    }
    return z.cancel = q, z.flush = Q, z;
  }
  return Dc = o, Dc;
}
var z0 = B0();
const $0 = Es(z0), U0 = ({ store: e4 }) => {
  e4.$debounce = (t, n) => $0(t.bind(e4), n);
}, ip = T0();
ip.use(U0);
const wi = typeof document < "u";
function sp(e4) {
  return typeof e4 == "object" || "displayName" in e4 || "props" in e4 || "__vccOpts" in e4;
}
function V0(e4) {
  return e4.__esModule || e4[Symbol.toStringTag] === "Module" || e4.default && sp(e4.default);
}
const $e = Object.assign;
function Bc(e4, t) {
  const n = {};
  for (const r in t) {
    const i = t[r];
    n[r] = gn(i) ? i.map(e4) : e4(i);
  }
  return n;
}
const As = () => {
}, gn = Array.isArray, op = /#/g, H0 = /&/g, q0 = /\//g, W0 = /=/g, G0 = /\?/g, ap = /\+/g, Z0 = /%5B/g, K0 = /%5D/g, lp = /%5E/g, Y0 = /%60/g, cp = /%7B/g, X0 = /%7C/g, up = /%7D/g, J0 = /%20/g;
function zc(e4) {
  return encodeURI("" + e4).replace(X0, "|").replace(Z0, "[").replace(K0, "]");
}
function Q0(e4) {
  return zc(e4).replace(cp, "{").replace(up, "}").replace(lp, "^");
}
function $c(e4) {
  return zc(e4).replace(ap, "%2B").replace(J0, "+").replace(op, "%23").replace(H0, "%26").replace(Y0, "`").replace(cp, "{").replace(up, "}").replace(lp, "^");
}
function eE(e4) {
  return $c(e4).replace(W0, "%3D");
}
function tE(e4) {
  return zc(e4).replace(op, "%23").replace(G0, "%3F");
}
function nE(e4) {
  return e4 == null ? "" : tE(e4).replace(q0, "%2F");
}
function Ts(e4) {
  try {
    return decodeURIComponent("" + e4);
  } catch {
  }
  return "" + e4;
}
const rE = /\/$/, iE = (e4) => e4.replace(rE, "");
function Uc(e4, t, n = "/") {
  let r, i = {}, s = "", o = "";
  const a = t.indexOf("#");
  let l = t.indexOf("?");
  return a < l && a >= 0 && (l = -1), l > -1 && (r = t.slice(0, l), s = t.slice(l + 1, a > -1 ? a : t.length), i = e4(s)), a > -1 && (r = r || t.slice(0, a), o = t.slice(a, t.length)), r = lE(r ?? t, n), { fullPath: r + (s && "?") + s + o, path: r, query: i, hash: Ts(o) };
}
function sE(e4, t) {
  const n = t.query ? e4(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function dp(e4, t) {
  return !t || !e4.toLowerCase().startsWith(t.toLowerCase()) ? e4 : e4.slice(t.length) || "/";
}
function oE(e4, t, n) {
  const r = t.matched.length - 1, i = n.matched.length - 1;
  return r > -1 && r === i && Si(t.matched[r], n.matched[i]) && fp(t.params, n.params) && e4(t.query) === e4(n.query) && t.hash === n.hash;
}
function Si(e4, t) {
  return (e4.aliasOf || e4) === (t.aliasOf || t);
}
function fp(e4, t) {
  if (Object.keys(e4).length !== Object.keys(t).length) return false;
  for (const n in e4) if (!aE(e4[n], t[n])) return false;
  return true;
}
function aE(e4, t) {
  return gn(e4) ? hp(e4, t) : gn(t) ? hp(t, e4) : e4 === t;
}
function hp(e4, t) {
  return gn(t) ? e4.length === t.length && e4.every((n, r) => n === t[r]) : e4.length === 1 && e4[0] === t;
}
function lE(e4, t) {
  if (e4.startsWith("/")) return e4;
  if (!e4) return t;
  const n = t.split("/"), r = e4.split("/"), i = r[r.length - 1];
  (i === ".." || i === ".") && r.push("");
  let s = n.length - 1, o, a;
  for (o = 0; o < r.length; o++) if (a = r[o], a !== ".") if (a === "..") s > 1 && s--;
  else break;
  return n.slice(0, s).join("/") + "/" + r.slice(o).join("/");
}
const br = { path: "/", name: void 0, params: {}, query: {}, hash: "", fullPath: "/", matched: [], meta: {}, redirectedFrom: void 0 };
var Ns;
(function(e4) {
  e4.pop = "pop", e4.push = "push";
})(Ns || (Ns = {}));
var Cs;
(function(e4) {
  e4.back = "back", e4.forward = "forward", e4.unknown = "";
})(Cs || (Cs = {}));
function cE(e4) {
  if (!e4) if (wi) {
    const t = document.querySelector("base");
    e4 = t && t.getAttribute("href") || "/", e4 = e4.replace(/^\w+:\/\/[^\/]+/, "");
  } else e4 = "/";
  return e4[0] !== "/" && e4[0] !== "#" && (e4 = "/" + e4), iE(e4);
}
const uE = /^[^#]+#/;
function dE(e4, t) {
  return e4.replace(uE, "#") + t;
}
function fE(e4, t) {
  const n = document.documentElement.getBoundingClientRect(), r = e4.getBoundingClientRect();
  return { behavior: t.behavior, left: r.left - n.left - (t.left || 0), top: r.top - n.top - (t.top || 0) };
}
const sa = () => ({ left: window.scrollX, top: window.scrollY });
function hE(e4) {
  let t;
  if ("el" in e4) {
    const n = e4.el, r = typeof n == "string" && n.startsWith("#"), i = typeof n == "string" ? r ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
    if (!i) return;
    t = fE(i, e4);
  } else t = e4;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.scrollX, t.top != null ? t.top : window.scrollY);
}
function vp(e4, t) {
  return (history.state ? history.state.position - t : -1) + e4;
}
const Vc = /* @__PURE__ */ new Map();
function vE(e4, t) {
  Vc.set(e4, t);
}
function pE(e4) {
  const t = Vc.get(e4);
  return Vc.delete(e4), t;
}
let mE = () => location.protocol + "//" + location.host;
function pp(e4, t) {
  const { pathname: n, search: r, hash: i } = t, s = e4.indexOf("#");
  if (s > -1) {
    let a = i.includes(e4.slice(s)) ? e4.slice(s).length : 1, l = i.slice(a);
    return l[0] !== "/" && (l = "/" + l), dp(l, "");
  }
  return dp(n, e4) + r + i;
}
function gE(e4, t, n, r) {
  let i = [], s = [], o = null;
  const a = ({ state: p }) => {
    const v = pp(e4, location), m = n.value, y = t.value;
    let k = 0;
    if (p) {
      if (n.value = v, t.value = p, o && o === m) {
        o = null;
        return;
      }
      k = y ? p.position - y.position : 0;
    } else r(v);
    i.forEach((E) => {
      E(n.value, m, { delta: k, type: Ns.pop, direction: k ? k > 0 ? Cs.forward : Cs.back : Cs.unknown });
    });
  };
  function l() {
    o = n.value;
  }
  function u(p) {
    i.push(p);
    const v = () => {
      const m = i.indexOf(p);
      m > -1 && i.splice(m, 1);
    };
    return s.push(v), v;
  }
  function c() {
    const { history: p } = window;
    p.state && p.replaceState($e({}, p.state, { scroll: sa() }), "");
  }
  function f() {
    for (const p of s) p();
    s = [], window.removeEventListener("popstate", a), window.removeEventListener("beforeunload", c);
  }
  return window.addEventListener("popstate", a), window.addEventListener("beforeunload", c, { passive: true }), { pauseListeners: l, listen: u, destroy: f };
}
function mp(e4, t, n, r = false, i = false) {
  return { back: e4, current: t, forward: n, replaced: r, position: window.history.length, scroll: i ? sa() : null };
}
function yE(e4) {
  const { history: t, location: n } = window, r = { value: pp(e4, n) }, i = { value: t.state };
  i.value || s(r.value, { back: null, current: r.value, forward: null, position: t.length - 1, replaced: true, scroll: null }, true);
  function s(l, u, c) {
    const f = e4.indexOf("#"), p = f > -1 ? (n.host && document.querySelector("base") ? e4 : e4.slice(f)) + l : mE() + e4 + l;
    try {
      t[c ? "replaceState" : "pushState"](u, "", p), i.value = u;
    } catch (v) {
      console.error(v), n[c ? "replace" : "assign"](p);
    }
  }
  function o(l, u) {
    const c = $e({}, t.state, mp(i.value.back, l, i.value.forward, true), u, { position: i.value.position });
    s(l, c, true), r.value = l;
  }
  function a(l, u) {
    const c = $e({}, i.value, t.state, { forward: l, scroll: sa() });
    s(c.current, c, true);
    const f = $e({}, mp(r.value, l, null), { position: c.position + 1 }, u);
    s(l, f, false), r.value = l;
  }
  return { location: r, state: i, push: a, replace: o };
}
function bE(e4) {
  e4 = cE(e4);
  const t = yE(e4), n = gE(e4, t.state, t.location, t.replace);
  function r(s, o = true) {
    o || n.pauseListeners(), history.go(s);
  }
  const i = $e({ location: "", base: e4, go: r, createHref: dE.bind(null, e4) }, t, n);
  return Object.defineProperty(i, "location", { enumerable: true, get: () => t.location.value }), Object.defineProperty(i, "state", { enumerable: true, get: () => t.state.value }), i;
}
function kE(e4) {
  return typeof e4 == "string" || e4 && typeof e4 == "object";
}
function gp(e4) {
  return typeof e4 == "string" || typeof e4 == "symbol";
}
const yp = Symbol("");
var bp;
(function(e4) {
  e4[e4.aborted = 4] = "aborted", e4[e4.cancelled = 8] = "cancelled", e4[e4.duplicated = 16] = "duplicated";
})(bp || (bp = {}));
function Ei(e4, t) {
  return $e(new Error(), { type: e4, [yp]: true }, t);
}
function er(e4, t) {
  return e4 instanceof Error && yp in e4 && (t == null || !!(e4.type & t));
}
const kp = "[^/]+?", wE = { sensitive: false, strict: false, start: true, end: true }, SE = /[.+*?^${}()[\]/\\]/g;
function EE(e4, t) {
  const n = $e({}, wE, t), r = [];
  let i = n.start ? "^" : "";
  const s = [];
  for (const u of e4) {
    const c = u.length ? [] : [90];
    n.strict && !u.length && (i += "/");
    for (let f = 0; f < u.length; f++) {
      const p = u[f];
      let v = 40 + (n.sensitive ? 0.25 : 0);
      if (p.type === 0) f || (i += "/"), i += p.value.replace(SE, "\\$&"), v += 40;
      else if (p.type === 1) {
        const { value: m, repeatable: y, optional: k, regexp: E } = p;
        s.push({ name: m, repeatable: y, optional: k });
        const A = E || kp;
        if (A !== kp) {
          v += 10;
          try {
            new RegExp(`(${A})`);
          } catch (x) {
            throw new Error(`Invalid custom RegExp for param "${m}" (${A}): ` + x.message);
          }
        }
        let C = y ? `((?:${A})(?:/(?:${A}))*)` : `(${A})`;
        f || (C = k && u.length < 2 ? `(?:/${C})` : "/" + C), k && (C += "?"), i += C, v += 20, k && (v += -8), y && (v += -20), A === ".*" && (v += -50);
      }
      c.push(v);
    }
    r.push(c);
  }
  if (n.strict && n.end) {
    const u = r.length - 1;
    r[u][r[u].length - 1] += 0.7000000000000001;
  }
  n.strict || (i += "/?"), n.end ? i += "$" : n.strict && !i.endsWith("/") && (i += "(?:/|$)");
  const o = new RegExp(i, n.sensitive ? "" : "i");
  function a(u) {
    const c = u.match(o), f = {};
    if (!c) return null;
    for (let p = 1; p < c.length; p++) {
      const v = c[p] || "", m = s[p - 1];
      f[m.name] = v && m.repeatable ? v.split("/") : v;
    }
    return f;
  }
  function l(u) {
    let c = "", f = false;
    for (const p of e4) {
      (!f || !c.endsWith("/")) && (c += "/"), f = false;
      for (const v of p) if (v.type === 0) c += v.value;
      else if (v.type === 1) {
        const { value: m, repeatable: y, optional: k } = v, E = m in u ? u[m] : "";
        if (gn(E) && !y) throw new Error(`Provided param "${m}" is an array but it is not repeatable (* or + modifiers)`);
        const A = gn(E) ? E.join("/") : E;
        if (!A) if (k) p.length < 2 && (c.endsWith("/") ? c = c.slice(0, -1) : f = true);
        else throw new Error(`Missing required param "${m}"`);
        c += A;
      }
    }
    return c || "/";
  }
  return { re: o, score: r, keys: s, parse: a, stringify: l };
}
function AE(e4, t) {
  let n = 0;
  for (; n < e4.length && n < t.length; ) {
    const r = t[n] - e4[n];
    if (r) return r;
    n++;
  }
  return e4.length < t.length ? e4.length === 1 && e4[0] === 80 ? -1 : 1 : e4.length > t.length ? t.length === 1 && t[0] === 80 ? 1 : -1 : 0;
}
function wp(e4, t) {
  let n = 0;
  const r = e4.score, i = t.score;
  for (; n < r.length && n < i.length; ) {
    const s = AE(r[n], i[n]);
    if (s) return s;
    n++;
  }
  if (Math.abs(i.length - r.length) === 1) {
    if (Sp(r)) return 1;
    if (Sp(i)) return -1;
  }
  return i.length - r.length;
}
function Sp(e4) {
  const t = e4[e4.length - 1];
  return e4.length > 0 && t[t.length - 1] < 0;
}
const TE = { type: 0, value: "" }, NE = /[a-zA-Z0-9_]/;
function CE(e4) {
  if (!e4) return [[]];
  if (e4 === "/") return [[TE]];
  if (!e4.startsWith("/")) throw new Error(`Invalid path "${e4}"`);
  function t(v) {
    throw new Error(`ERR (${n})/"${u}": ${v}`);
  }
  let n = 0, r = n;
  const i = [];
  let s;
  function o() {
    s && i.push(s), s = [];
  }
  let a = 0, l, u = "", c = "";
  function f() {
    u && (n === 0 ? s.push({ type: 0, value: u }) : n === 1 || n === 2 || n === 3 ? (s.length > 1 && (l === "*" || l === "+") && t(`A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`), s.push({ type: 1, value: u, regexp: c, repeatable: l === "*" || l === "+", optional: l === "*" || l === "?" })) : t("Invalid state to consume buffer"), u = "");
  }
  function p() {
    u += l;
  }
  for (; a < e4.length; ) {
    if (l = e4[a++], l === "\\" && n !== 2) {
      r = n, n = 4;
      continue;
    }
    switch (n) {
      case 0:
        l === "/" ? (u && f(), o()) : l === ":" ? (f(), n = 1) : p();
        break;
      case 4:
        p(), n = r;
        break;
      case 1:
        l === "(" ? n = 2 : NE.test(l) ? p() : (f(), n = 0, l !== "*" && l !== "?" && l !== "+" && a--);
        break;
      case 2:
        l === ")" ? c[c.length - 1] == "\\" ? c = c.slice(0, -1) + l : n = 3 : c += l;
        break;
      case 3:
        f(), n = 0, l !== "*" && l !== "?" && l !== "+" && a--, c = "";
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${u}"`), f(), o(), i;
}
function _E(e4, t, n) {
  const r = EE(CE(e4.path), n), i = $e(r, { record: e4, parent: t, children: [], alias: [] });
  return t && !i.record.aliasOf == !t.record.aliasOf && t.children.push(i), i;
}
function OE(e4, t) {
  const n = [], r = /* @__PURE__ */ new Map();
  t = Np({ strict: false, end: true, sensitive: false }, t);
  function i(f) {
    return r.get(f);
  }
  function s(f, p, v) {
    const m = !v, y = Ap(f);
    y.aliasOf = v && v.record;
    const k = Np(t, f), E = [y];
    if ("alias" in f) {
      const x = typeof f.alias == "string" ? [f.alias] : f.alias;
      for (const F of x) E.push(Ap($e({}, y, { components: v ? v.record.components : y.components, path: F, aliasOf: v ? v.record : y })));
    }
    let A, C;
    for (const x of E) {
      const { path: F } = x;
      if (p && F[0] !== "/") {
        const Y = p.record.path, U = Y[Y.length - 1] === "/" ? "" : "/";
        x.path = p.record.path + (F && U + F);
      }
      if (A = _E(x, p, k), v ? v.alias.push(A) : (C = C || A, C !== A && C.alias.push(A), m && f.name && !Tp(A) && o(f.name)), Cp(A) && l(A), y.children) {
        const Y = y.children;
        for (let U = 0; U < Y.length; U++) s(Y[U], A, v && v.children[U]);
      }
      v = v || A;
    }
    return C ? () => {
      o(C);
    } : As;
  }
  function o(f) {
    if (gp(f)) {
      const p = r.get(f);
      p && (r.delete(f), n.splice(n.indexOf(p), 1), p.children.forEach(o), p.alias.forEach(o));
    } else {
      const p = n.indexOf(f);
      p > -1 && (n.splice(p, 1), f.record.name && r.delete(f.record.name), f.children.forEach(o), f.alias.forEach(o));
    }
  }
  function a() {
    return n;
  }
  function l(f) {
    const p = RE(f, n);
    n.splice(p, 0, f), f.record.name && !Tp(f) && r.set(f.record.name, f);
  }
  function u(f, p) {
    let v, m = {}, y, k;
    if ("name" in f && f.name) {
      if (v = r.get(f.name), !v) throw Ei(1, { location: f });
      k = v.record.name, m = $e(Ep(p.params, v.keys.filter((C) => !C.optional).concat(v.parent ? v.parent.keys.filter((C) => C.optional) : []).map((C) => C.name)), f.params && Ep(f.params, v.keys.map((C) => C.name))), y = v.stringify(m);
    } else if (f.path != null) y = f.path, v = n.find((C) => C.re.test(y)), v && (m = v.parse(y), k = v.record.name);
    else {
      if (v = p.name ? r.get(p.name) : n.find((C) => C.re.test(p.path)), !v) throw Ei(1, { location: f, currentLocation: p });
      k = v.record.name, m = $e({}, p.params, f.params), y = v.stringify(m);
    }
    const E = [];
    let A = v;
    for (; A; ) E.unshift(A.record), A = A.parent;
    return { name: k, path: y, params: m, matched: E, meta: xE(E) };
  }
  e4.forEach((f) => s(f));
  function c() {
    n.length = 0, r.clear();
  }
  return { addRoute: s, resolve: u, removeRoute: o, clearRoutes: c, getRoutes: a, getRecordMatcher: i };
}
function Ep(e4, t) {
  const n = {};
  for (const r of t) r in e4 && (n[r] = e4[r]);
  return n;
}
function Ap(e4) {
  const t = { path: e4.path, redirect: e4.redirect, name: e4.name, meta: e4.meta || {}, aliasOf: e4.aliasOf, beforeEnter: e4.beforeEnter, props: PE(e4), children: e4.children || [], instances: {}, leaveGuards: /* @__PURE__ */ new Set(), updateGuards: /* @__PURE__ */ new Set(), enterCallbacks: {}, components: "components" in e4 ? e4.components || null : e4.component && { default: e4.component } };
  return Object.defineProperty(t, "mods", { value: {} }), t;
}
function PE(e4) {
  const t = {}, n = e4.props || false;
  if ("component" in e4) t.default = n;
  else for (const r in e4.components) t[r] = typeof n == "object" ? n[r] : n;
  return t;
}
function Tp(e4) {
  for (; e4; ) {
    if (e4.record.aliasOf) return true;
    e4 = e4.parent;
  }
  return false;
}
function xE(e4) {
  return e4.reduce((t, n) => $e(t, n.meta), {});
}
function Np(e4, t) {
  const n = {};
  for (const r in e4) n[r] = r in t ? t[r] : e4[r];
  return n;
}
function RE(e4, t) {
  let n = 0, r = t.length;
  for (; n !== r; ) {
    const s = n + r >> 1;
    wp(e4, t[s]) < 0 ? r = s : n = s + 1;
  }
  const i = ME(e4);
  return i && (r = t.lastIndexOf(i, r - 1)), r;
}
function ME(e4) {
  let t = e4;
  for (; t = t.parent; ) if (Cp(t) && wp(e4, t) === 0) return t;
}
function Cp({ record: e4 }) {
  return !!(e4.name || e4.components && Object.keys(e4.components).length || e4.redirect);
}
function jE(e4) {
  const t = {};
  if (e4 === "" || e4 === "?") return t;
  const r = (e4[0] === "?" ? e4.slice(1) : e4).split("&");
  for (let i = 0; i < r.length; ++i) {
    const s = r[i].replace(ap, " "), o = s.indexOf("="), a = Ts(o < 0 ? s : s.slice(0, o)), l = o < 0 ? null : Ts(s.slice(o + 1));
    if (a in t) {
      let u = t[a];
      gn(u) || (u = t[a] = [u]), u.push(l);
    } else t[a] = l;
  }
  return t;
}
function _p(e4) {
  let t = "";
  for (let n in e4) {
    const r = e4[n];
    if (n = eE(n), r == null) {
      r !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (gn(r) ? r.map((s) => s && $c(s)) : [r && $c(r)]).forEach((s) => {
      s !== void 0 && (t += (t.length ? "&" : "") + n, s != null && (t += "=" + s));
    });
  }
  return t;
}
function IE(e4) {
  const t = {};
  for (const n in e4) {
    const r = e4[n];
    r !== void 0 && (t[n] = gn(r) ? r.map((i) => i == null ? null : "" + i) : r == null ? r : "" + r);
  }
  return t;
}
const Op = Symbol(""), Pp = Symbol(""), _s = Symbol(""), Hc = Symbol(""), qc = Symbol("");
function Os() {
  let e4 = [];
  function t(r) {
    return e4.push(r), () => {
      const i = e4.indexOf(r);
      i > -1 && e4.splice(i, 1);
    };
  }
  function n() {
    e4 = [];
  }
  return { add: t, list: () => e4.slice(), reset: n };
}
function LE(e4, t, n) {
  const r = () => {
    e4[t].delete(n);
  };
  vi(r), ih(r), rh(() => {
    e4[t].add(n);
  }), e4[t].add(n);
}
function FE(e4) {
  const t = kt(Op, {}).value;
  t && LE(t, "updateGuards", e4);
}
function kr(e4, t, n, r, i, s = (o) => o()) {
  const o = r && (r.enterCallbacks[i] = r.enterCallbacks[i] || []);
  return () => new Promise((a, l) => {
    const u = (p) => {
      p === false ? l(Ei(4, { from: n, to: t })) : p instanceof Error ? l(p) : kE(p) ? l(Ei(2, { from: t, to: p })) : (o && r.enterCallbacks[i] === o && typeof p == "function" && o.push(p), a());
    }, c = s(() => e4.call(r && r.instances[i], t, n, u));
    let f = Promise.resolve(c);
    e4.length < 3 && (f = f.then(u)), f.catch((p) => l(p));
  });
}
function Wc(e4, t, n, r, i = (s) => s()) {
  const s = [];
  for (const o of e4) for (const a in o.components) {
    let l = o.components[a];
    if (!(t !== "beforeRouteEnter" && !o.instances[a])) if (sp(l)) {
      const c = (l.__vccOpts || l)[t];
      c && s.push(kr(c, n, r, o, a, i));
    } else {
      let u = l();
      s.push(() => u.then((c) => {
        if (!c) throw new Error(`Couldn't resolve component "${a}" at "${o.path}"`);
        const f = V0(c) ? c.default : c;
        o.mods[a] = c, o.components[a] = f;
        const v = (f.__vccOpts || f)[t];
        return v && kr(v, n, r, o, a, i)();
      }));
    }
  }
  return s;
}
function xp(e4) {
  const t = kt(_s), n = kt(Hc), r = ke(() => {
    const l = xn(e4.to);
    return t.resolve(l);
  }), i = ke(() => {
    const { matched: l } = r.value, { length: u } = l, c = l[u - 1], f = n.matched;
    if (!c || !f.length) return -1;
    const p = f.findIndex(Si.bind(null, c));
    if (p > -1) return p;
    const v = Mp(l[u - 2]);
    return u > 1 && Mp(c) === v && f[f.length - 1].path !== v ? f.findIndex(Si.bind(null, l[u - 2])) : p;
  }), s = ke(() => i.value > -1 && $E(n.params, r.value.params)), o = ke(() => i.value > -1 && i.value === n.matched.length - 1 && fp(n.params, r.value.params));
  function a(l = {}) {
    if (zE(l)) {
      const u = t[xn(e4.replace) ? "replace" : "push"](xn(e4.to)).catch(As);
      return e4.viewTransition && typeof document < "u" && "startViewTransition" in document && document.startViewTransition(() => u), u;
    }
    return Promise.resolve();
  }
  return { route: r, href: ke(() => r.value.href), isActive: s, isExactActive: o, navigate: a };
}
function DE(e4) {
  return e4.length === 1 ? e4[0] : e4;
}
const BE = Zt({ name: "RouterLink", compatConfig: { MODE: 3 }, props: { to: { type: [String, Object], required: true }, replace: Boolean, activeClass: String, exactActiveClass: String, custom: Boolean, ariaCurrentValue: { type: String, default: "page" }, viewTransition: Boolean }, useLink: xp, setup(e4, { slots: t }) {
  const n = cr(xp(e4)), { options: r } = kt(_s), i = ke(() => ({ [jp(e4.activeClass, r.linkActiveClass, "router-link-active")]: n.isActive, [jp(e4.exactActiveClass, r.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive }));
  return () => {
    const s = t.default && DE(t.default(n));
    return e4.custom ? s : Tt("a", { "aria-current": n.isExactActive ? e4.ariaCurrentValue : null, href: n.href, onClick: n.navigate, class: i.value }, s);
  };
} }), Rp = BE;
function zE(e4) {
  if (!(e4.metaKey || e4.altKey || e4.ctrlKey || e4.shiftKey) && !e4.defaultPrevented && !(e4.button !== void 0 && e4.button !== 0)) {
    if (e4.currentTarget && e4.currentTarget.getAttribute) {
      const t = e4.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t)) return;
    }
    return e4.preventDefault && e4.preventDefault(), true;
  }
}
function $E(e4, t) {
  for (const n in t) {
    const r = t[n], i = e4[n];
    if (typeof r == "string") {
      if (r !== i) return false;
    } else if (!gn(i) || i.length !== r.length || r.some((s, o) => s !== i[o])) return false;
  }
  return true;
}
function Mp(e4) {
  return e4 ? e4.aliasOf ? e4.aliasOf.path : e4.path : "";
}
const jp = (e4, t, n) => e4 ?? t ?? n, UE = Zt({ name: "RouterView", inheritAttrs: false, props: { name: { type: String, default: "default" }, route: Object }, compatConfig: { MODE: 3 }, setup(e4, { attrs: t, slots: n }) {
  const r = kt(qc), i = ke(() => e4.route || r.value), s = kt(Pp, 0), o = ke(() => {
    let u = xn(s);
    const { matched: c } = i.value;
    let f;
    for (; (f = c[u]) && !f.components; ) u++;
    return u;
  }), a = ke(() => i.value.matched[o.value]);
  ds(Pp, ke(() => o.value + 1)), ds(Op, a), ds(qc, i);
  const l = Gt();
  return ft(() => [l.value, a.value, e4.name], ([u, c, f], [p, v, m]) => {
    c && (c.instances[f] = u, v && v !== c && u && u === p && (c.leaveGuards.size || (c.leaveGuards = v.leaveGuards), c.updateGuards.size || (c.updateGuards = v.updateGuards))), u && c && (!v || !Si(c, v) || !p) && (c.enterCallbacks[f] || []).forEach((y) => y(u));
  }, { flush: "post" }), () => {
    const u = i.value, c = e4.name, f = a.value, p = f && f.components[c];
    if (!p) return Ip(n.default, { Component: p, route: u });
    const v = f.props[c], m = v ? v === true ? u.params : typeof v == "function" ? v(u) : v : null, k = Tt(p, $e({}, m, t, { onVnodeUnmounted: (E) => {
      E.component.isUnmounted && (f.instances[c] = null);
    }, ref: l }));
    return Ip(n.default, { Component: k, route: u }) || k;
  };
} });
function Ip(e4, t) {
  if (!e4) return null;
  const n = e4(t);
  return n.length === 1 ? n[0] : n;
}
const VE = UE;
function HE(e4) {
  const t = OE(e4.routes, e4), n = e4.parseQuery || jE, r = e4.stringifyQuery || _p, i = e4.history, s = Os(), o = Os(), a = Os(), l = Qe(br);
  let u = br;
  wi && e4.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const c = Bc.bind(null, (D) => "" + D), f = Bc.bind(null, nE), p = Bc.bind(null, Ts);
  function v(D, te) {
    let ee, ae;
    return gp(D) ? (ee = t.getRecordMatcher(D), ae = te) : ae = D, t.addRoute(ae, ee);
  }
  function m(D) {
    const te = t.getRecordMatcher(D);
    te && t.removeRoute(te);
  }
  function y() {
    return t.getRoutes().map((D) => D.record);
  }
  function k(D) {
    return !!t.getRecordMatcher(D);
  }
  function E(D, te) {
    if (te = $e({}, te || l.value), typeof D == "string") {
      const _ = Uc(n, D, te.path), B = t.resolve({ path: _.path }, te), $ = i.createHref(_.fullPath);
      return $e(_, B, { params: p(B.params), hash: Ts(_.hash), redirectedFrom: void 0, href: $ });
    }
    let ee;
    if (D.path != null) ee = $e({}, D, { path: Uc(n, D.path, te.path).path });
    else {
      const _ = $e({}, D.params);
      for (const B in _) _[B] == null && delete _[B];
      ee = $e({}, D, { params: f(_) }), te.params = f(te.params);
    }
    const ae = t.resolve(ee, te), _e = D.hash || "";
    ae.params = c(p(ae.params));
    const w = sE(r, $e({}, D, { hash: Q0(_e), path: ae.path })), S = i.createHref(w);
    return $e({ fullPath: w, hash: _e, query: r === _p ? IE(D.query) : D.query || {} }, ae, { redirectedFrom: void 0, href: S });
  }
  function A(D) {
    return typeof D == "string" ? Uc(n, D, l.value.path) : $e({}, D);
  }
  function C(D, te) {
    if (u !== D) return Ei(8, { from: te, to: D });
  }
  function x(D) {
    return U(D);
  }
  function F(D) {
    return x($e(A(D), { replace: true }));
  }
  function Y(D) {
    const te = D.matched[D.matched.length - 1];
    if (te && te.redirect) {
      const { redirect: ee } = te;
      let ae = typeof ee == "function" ? ee(D) : ee;
      return typeof ae == "string" && (ae = ae.includes("?") || ae.includes("#") ? ae = A(ae) : { path: ae }, ae.params = {}), $e({ query: D.query, hash: D.hash, params: ae.path != null ? {} : D.params }, ae);
    }
  }
  function U(D, te) {
    const ee = u = E(D), ae = l.value, _e = D.state, w = D.force, S = D.replace === true, _ = Y(ee);
    if (_) return U($e(A(_), { state: typeof _ == "object" ? $e({}, _e, _.state) : _e, force: w, replace: S }), te || ee);
    const B = ee;
    B.redirectedFrom = te;
    let $;
    return !w && oE(r, ae, ee) && ($ = Ei(16, { to: B, from: ae }), me(ae, ae, true, false)), ($ ? Promise.resolve($) : q(B, ae)).catch((L) => er(L) ? er(L, 2) ? L : Me(L) : se(L, B, ae)).then((L) => {
      if (L) {
        if (er(L, 2)) return U($e({ replace: S }, A(L.to), { state: typeof L.to == "object" ? $e({}, _e, L.to.state) : _e, force: w }), te || B);
      } else L = z(B, ae, true, S, _e);
      return Q(B, ae, L), L;
    });
  }
  function V(D, te) {
    const ee = C(D, te);
    return ee ? Promise.reject(ee) : Promise.resolve();
  }
  function M(D) {
    const te = Ce.values().next().value;
    return te && typeof te.runWithContext == "function" ? te.runWithContext(D) : D();
  }
  function q(D, te) {
    let ee;
    const [ae, _e, w] = qE(D, te);
    ee = Wc(ae.reverse(), "beforeRouteLeave", D, te);
    for (const _ of ae) _.leaveGuards.forEach((B) => {
      ee.push(kr(B, D, te));
    });
    const S = V.bind(null, D, te);
    return ee.push(S), tt(ee).then(() => {
      ee = [];
      for (const _ of s.list()) ee.push(kr(_, D, te));
      return ee.push(S), tt(ee);
    }).then(() => {
      ee = Wc(_e, "beforeRouteUpdate", D, te);
      for (const _ of _e) _.updateGuards.forEach((B) => {
        ee.push(kr(B, D, te));
      });
      return ee.push(S), tt(ee);
    }).then(() => {
      ee = [];
      for (const _ of w) if (_.beforeEnter) if (gn(_.beforeEnter)) for (const B of _.beforeEnter) ee.push(kr(B, D, te));
      else ee.push(kr(_.beforeEnter, D, te));
      return ee.push(S), tt(ee);
    }).then(() => (D.matched.forEach((_) => _.enterCallbacks = {}), ee = Wc(w, "beforeRouteEnter", D, te, M), ee.push(S), tt(ee))).then(() => {
      ee = [];
      for (const _ of o.list()) ee.push(kr(_, D, te));
      return ee.push(S), tt(ee);
    }).catch((_) => er(_, 8) ? _ : Promise.reject(_));
  }
  function Q(D, te, ee) {
    a.list().forEach((ae) => M(() => ae(D, te, ee)));
  }
  function z(D, te, ee, ae, _e) {
    const w = C(D, te);
    if (w) return w;
    const S = te === br, _ = wi ? history.state : {};
    ee && (ae || S ? i.replace(D.fullPath, $e({ scroll: S && _ && _.scroll }, _e)) : i.push(D.fullPath, _e)), l.value = D, me(D, te, ee, S), Me();
  }
  let O;
  function j() {
    O || (O = i.listen((D, te, ee) => {
      if (!ye.listening) return;
      const ae = E(D), _e = Y(ae);
      if (_e) {
        U($e(_e, { replace: true, force: true }), ae).catch(As);
        return;
      }
      u = ae;
      const w = l.value;
      wi && vE(vp(w.fullPath, ee.delta), sa()), q(ae, w).catch((S) => er(S, 12) ? S : er(S, 2) ? (U($e(A(S.to), { force: true }), ae).then((_) => {
        er(_, 20) && !ee.delta && ee.type === Ns.pop && i.go(-1, false);
      }).catch(As), Promise.reject()) : (ee.delta && i.go(-ee.delta, false), se(S, ae, w))).then((S) => {
        S = S || z(ae, w, false), S && (ee.delta && !er(S, 8) ? i.go(-ee.delta, false) : ee.type === Ns.pop && er(S, 20) && i.go(-1, false)), Q(ae, w, S);
      }).catch(As);
    }));
  }
  let X = Os(), re = Os(), G;
  function se(D, te, ee) {
    Me(D);
    const ae = re.list();
    return ae.length ? ae.forEach((_e) => _e(D, te, ee)) : console.error(D), Promise.reject(D);
  }
  function fe() {
    return G && l.value !== br ? Promise.resolve() : new Promise((D, te) => {
      X.add([D, te]);
    });
  }
  function Me(D) {
    return G || (G = !D, j(), X.list().forEach(([te, ee]) => D ? ee(D) : te()), X.reset()), D;
  }
  function me(D, te, ee, ae) {
    const { scrollBehavior: _e } = e4;
    if (!wi || !_e) return Promise.resolve();
    const w = !ee && pE(vp(D.fullPath, 0)) || (ae || !ee) && history.state && history.state.scroll || null;
    return Lr().then(() => _e(D, te, w)).then((S) => S && hE(S)).catch((S) => se(S, D, te));
  }
  const Ge = (D) => i.go(D);
  let Le;
  const Ce = /* @__PURE__ */ new Set(), ye = { currentRoute: l, listening: true, addRoute: v, removeRoute: m, clearRoutes: t.clearRoutes, hasRoute: k, getRoutes: y, resolve: E, options: e4, push: x, replace: F, go: Ge, back: () => Ge(-1), forward: () => Ge(1), beforeEach: s.add, beforeResolve: o.add, afterEach: a.add, onError: re.add, isReady: fe, install(D) {
    const te = this;
    D.component("RouterLink", Rp), D.component("RouterView", VE), D.config.globalProperties.$router = te, Object.defineProperty(D.config.globalProperties, "$route", { enumerable: true, get: () => xn(l) }), wi && !Le && l.value === br && (Le = true, x(i.location).catch((_e) => {
    }));
    const ee = {};
    for (const _e in br) Object.defineProperty(ee, _e, { get: () => l.value[_e], enumerable: true });
    D.provide(_s, te), D.provide(Hc, Rf(ee)), D.provide(qc, l);
    const ae = D.unmount;
    Ce.add(D), D.unmount = function() {
      Ce.delete(D), Ce.size < 1 && (u = br, O && O(), O = null, l.value = br, Le = false, G = false), ae();
    };
  } };
  function tt(D) {
    return D.reduce((te, ee) => te.then(() => M(ee)), Promise.resolve());
  }
  return ye;
}
function qE(e4, t) {
  const n = [], r = [], i = [], s = Math.max(t.matched.length, e4.matched.length);
  for (let o = 0; o < s; o++) {
    const a = t.matched[o];
    a && (e4.matched.find((u) => Si(u, a)) ? r.push(a) : n.push(a));
    const l = e4.matched[o];
    l && (t.matched.find((u) => Si(u, l)) || i.push(l));
  }
  return [n, r, i];
}
function WE() {
  return kt(_s);
}
function GE(e4) {
  return kt(Hc);
}
function ZE(e4) {
  return e4 && e4.__esModule && Object.prototype.hasOwnProperty.call(e4, "default") ? e4.default : e4;
}
var Lp = { exports: {} }, ct = Lp.exports = {}, Fn, Dn;
function Gc() {
  throw new Error("setTimeout has not been defined");
}
function Zc() {
  throw new Error("clearTimeout has not been defined");
}
(function() {
  try {
    typeof setTimeout == "function" ? Fn = setTimeout : Fn = Gc;
  } catch {
    Fn = Gc;
  }
  try {
    typeof clearTimeout == "function" ? Dn = clearTimeout : Dn = Zc;
  } catch {
    Dn = Zc;
  }
})();
function Fp(e4) {
  if (Fn === setTimeout) return setTimeout(e4, 0);
  if ((Fn === Gc || !Fn) && setTimeout) return Fn = setTimeout, setTimeout(e4, 0);
  try {
    return Fn(e4, 0);
  } catch {
    try {
      return Fn.call(null, e4, 0);
    } catch {
      return Fn.call(this, e4, 0);
    }
  }
}
function KE(e4) {
  if (Dn === clearTimeout) return clearTimeout(e4);
  if ((Dn === Zc || !Dn) && clearTimeout) return Dn = clearTimeout, clearTimeout(e4);
  try {
    return Dn(e4);
  } catch {
    try {
      return Dn.call(null, e4);
    } catch {
      return Dn.call(this, e4);
    }
  }
}
var tr = [], Ai = false, Vr, oa = -1;
function YE() {
  !Ai || !Vr || (Ai = false, Vr.length ? tr = Vr.concat(tr) : oa = -1, tr.length && Dp());
}
function Dp() {
  if (!Ai) {
    var e4 = Fp(YE);
    Ai = true;
    for (var t = tr.length; t; ) {
      for (Vr = tr, tr = []; ++oa < t; ) Vr && Vr[oa].run();
      oa = -1, t = tr.length;
    }
    Vr = null, Ai = false, KE(e4);
  }
}
ct.nextTick = function(e4) {
  var t = new Array(arguments.length - 1);
  if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
  tr.push(new Bp(e4, t)), tr.length === 1 && !Ai && Fp(Dp);
};
function Bp(e4, t) {
  this.fun = e4, this.array = t;
}
Bp.prototype.run = function() {
  this.fun.apply(null, this.array);
}, ct.title = "browser", ct.browser = true, ct.env = {}, ct.argv = [], ct.version = "", ct.versions = {};
function nr() {
}
ct.on = nr, ct.addListener = nr, ct.once = nr, ct.off = nr, ct.removeListener = nr, ct.removeAllListeners = nr, ct.emit = nr, ct.prependListener = nr, ct.prependOnceListener = nr, ct.listeners = function(e4) {
  return [];
}, ct.binding = function(e4) {
  throw new Error("process.binding is not supported");
}, ct.cwd = function() {
  return "/";
}, ct.chdir = function(e4) {
  throw new Error("process.chdir is not supported");
}, ct.umask = function() {
  return 0;
};
var XE = Lp.exports;
const aa = ZE(XE);
var Kc, zp;
function $p() {
  if (zp) return Kc;
  zp = 1;
  var e4 = {};
  return Kc = typeof aa == "object" && e4 && e4.NODE_DEBUG && /\bsemver\b/i.test(e4.NODE_DEBUG) ? (...n) => console.error("SEMVER", ...n) : () => {
  }, Kc;
}
var Yc, Up;
function Vp() {
  if (Up) return Yc;
  Up = 1;
  const e4 = "2.0.0", t = 256, n = Number.MAX_SAFE_INTEGER || 9007199254740991, r = 16, i = t - 6;
  return Yc = { MAX_LENGTH: t, MAX_SAFE_COMPONENT_LENGTH: r, MAX_SAFE_BUILD_LENGTH: i, MAX_SAFE_INTEGER: n, RELEASE_TYPES: ["major", "premajor", "minor", "preminor", "patch", "prepatch", "prerelease"], SEMVER_SPEC_VERSION: e4, FLAG_INCLUDE_PRERELEASE: 1, FLAG_LOOSE: 2 }, Yc;
}
var la = { exports: {} }, Hp;
function JE() {
  return Hp || (Hp = 1, (function(e4, t) {
    const { MAX_SAFE_COMPONENT_LENGTH: n, MAX_SAFE_BUILD_LENGTH: r, MAX_LENGTH: i } = Vp(), s = $p();
    t = e4.exports = {};
    const o = t.re = [], a = t.safeRe = [], l = t.src = [], u = t.safeSrc = [], c = t.t = {};
    let f = 0;
    const p = "[a-zA-Z0-9-]", v = [["\\s", 1], ["\\d", i], [p, r]], m = (k) => {
      for (const [E, A] of v) k = k.split(`${E}*`).join(`${E}{0,${A}}`).split(`${E}+`).join(`${E}{1,${A}}`);
      return k;
    }, y = (k, E, A) => {
      const C = m(E), x = f++;
      s(k, x, E), c[k] = x, l[x] = E, u[x] = C, o[x] = new RegExp(E, A ? "g" : void 0), a[x] = new RegExp(C, A ? "g" : void 0);
    };
    y("NUMERICIDENTIFIER", "0|[1-9]\\d*"), y("NUMERICIDENTIFIERLOOSE", "\\d+"), y("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${p}*`), y("MAINVERSION", `(${l[c.NUMERICIDENTIFIER]})\\.(${l[c.NUMERICIDENTIFIER]})\\.(${l[c.NUMERICIDENTIFIER]})`), y("MAINVERSIONLOOSE", `(${l[c.NUMERICIDENTIFIERLOOSE]})\\.(${l[c.NUMERICIDENTIFIERLOOSE]})\\.(${l[c.NUMERICIDENTIFIERLOOSE]})`), y("PRERELEASEIDENTIFIER", `(?:${l[c.NONNUMERICIDENTIFIER]}|${l[c.NUMERICIDENTIFIER]})`), y("PRERELEASEIDENTIFIERLOOSE", `(?:${l[c.NONNUMERICIDENTIFIER]}|${l[c.NUMERICIDENTIFIERLOOSE]})`), y("PRERELEASE", `(?:-(${l[c.PRERELEASEIDENTIFIER]}(?:\\.${l[c.PRERELEASEIDENTIFIER]})*))`), y("PRERELEASELOOSE", `(?:-?(${l[c.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${l[c.PRERELEASEIDENTIFIERLOOSE]})*))`), y("BUILDIDENTIFIER", `${p}+`), y("BUILD", `(?:\\+(${l[c.BUILDIDENTIFIER]}(?:\\.${l[c.BUILDIDENTIFIER]})*))`), y("FULLPLAIN", `v?${l[c.MAINVERSION]}${l[c.PRERELEASE]}?${l[c.BUILD]}?`), y("FULL", `^${l[c.FULLPLAIN]}$`), y("LOOSEPLAIN", `[v=\\s]*${l[c.MAINVERSIONLOOSE]}${l[c.PRERELEASELOOSE]}?${l[c.BUILD]}?`), y("LOOSE", `^${l[c.LOOSEPLAIN]}$`), y("GTLT", "((?:<|>)?=?)"), y("XRANGEIDENTIFIERLOOSE", `${l[c.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), y("XRANGEIDENTIFIER", `${l[c.NUMERICIDENTIFIER]}|x|X|\\*`), y("XRANGEPLAIN", `[v=\\s]*(${l[c.XRANGEIDENTIFIER]})(?:\\.(${l[c.XRANGEIDENTIFIER]})(?:\\.(${l[c.XRANGEIDENTIFIER]})(?:${l[c.PRERELEASE]})?${l[c.BUILD]}?)?)?`), y("XRANGEPLAINLOOSE", `[v=\\s]*(${l[c.XRANGEIDENTIFIERLOOSE]})(?:\\.(${l[c.XRANGEIDENTIFIERLOOSE]})(?:\\.(${l[c.XRANGEIDENTIFIERLOOSE]})(?:${l[c.PRERELEASELOOSE]})?${l[c.BUILD]}?)?)?`), y("XRANGE", `^${l[c.GTLT]}\\s*${l[c.XRANGEPLAIN]}$`), y("XRANGELOOSE", `^${l[c.GTLT]}\\s*${l[c.XRANGEPLAINLOOSE]}$`), y("COERCEPLAIN", `(^|[^\\d])(\\d{1,${n}})(?:\\.(\\d{1,${n}}))?(?:\\.(\\d{1,${n}}))?`), y("COERCE", `${l[c.COERCEPLAIN]}(?:$|[^\\d])`), y("COERCEFULL", l[c.COERCEPLAIN] + `(?:${l[c.PRERELEASE]})?(?:${l[c.BUILD]})?(?:$|[^\\d])`), y("COERCERTL", l[c.COERCE], true), y("COERCERTLFULL", l[c.COERCEFULL], true), y("LONETILDE", "(?:~>?)"), y("TILDETRIM", `(\\s*)${l[c.LONETILDE]}\\s+`, true), t.tildeTrimReplace = "$1~", y("TILDE", `^${l[c.LONETILDE]}${l[c.XRANGEPLAIN]}$`), y("TILDELOOSE", `^${l[c.LONETILDE]}${l[c.XRANGEPLAINLOOSE]}$`), y("LONECARET", "(?:\\^)"), y("CARETTRIM", `(\\s*)${l[c.LONECARET]}\\s+`, true), t.caretTrimReplace = "$1^", y("CARET", `^${l[c.LONECARET]}${l[c.XRANGEPLAIN]}$`), y("CARETLOOSE", `^${l[c.LONECARET]}${l[c.XRANGEPLAINLOOSE]}$`), y("COMPARATORLOOSE", `^${l[c.GTLT]}\\s*(${l[c.LOOSEPLAIN]})$|^$`), y("COMPARATOR", `^${l[c.GTLT]}\\s*(${l[c.FULLPLAIN]})$|^$`), y("COMPARATORTRIM", `(\\s*)${l[c.GTLT]}\\s*(${l[c.LOOSEPLAIN]}|${l[c.XRANGEPLAIN]})`, true), t.comparatorTrimReplace = "$1$2$3", y("HYPHENRANGE", `^\\s*(${l[c.XRANGEPLAIN]})\\s+-\\s+(${l[c.XRANGEPLAIN]})\\s*$`), y("HYPHENRANGELOOSE", `^\\s*(${l[c.XRANGEPLAINLOOSE]})\\s+-\\s+(${l[c.XRANGEPLAINLOOSE]})\\s*$`), y("STAR", "(<|>)?=?\\s*\\*"), y("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), y("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  })(la, la.exports)), la.exports;
}
var Xc, qp;
function QE() {
  if (qp) return Xc;
  qp = 1;
  const e4 = Object.freeze({ loose: true }), t = Object.freeze({});
  return Xc = (r) => r ? typeof r != "object" ? e4 : r : t, Xc;
}
var Jc, Wp;
function eA() {
  if (Wp) return Jc;
  Wp = 1;
  const e4 = /^[0-9]+$/, t = (r, i) => {
    const s = e4.test(r), o = e4.test(i);
    return s && o && (r = +r, i = +i), r === i ? 0 : s && !o ? -1 : o && !s ? 1 : r < i ? -1 : 1;
  };
  return Jc = { compareIdentifiers: t, rcompareIdentifiers: (r, i) => t(i, r) }, Jc;
}
var Qc, Gp;
function Zp() {
  if (Gp) return Qc;
  Gp = 1;
  const e4 = $p(), { MAX_LENGTH: t, MAX_SAFE_INTEGER: n } = Vp(), { safeRe: r, t: i } = JE(), s = QE(), { compareIdentifiers: o } = eA();
  class a {
    constructor(u, c) {
      if (c = s(c), u instanceof a) {
        if (u.loose === !!c.loose && u.includePrerelease === !!c.includePrerelease) return u;
        u = u.version;
      } else if (typeof u != "string") throw new TypeError(`Invalid version. Must be a string. Got type "${typeof u}".`);
      if (u.length > t) throw new TypeError(`version is longer than ${t} characters`);
      e4("SemVer", u, c), this.options = c, this.loose = !!c.loose, this.includePrerelease = !!c.includePrerelease;
      const f = u.trim().match(c.loose ? r[i.LOOSE] : r[i.FULL]);
      if (!f) throw new TypeError(`Invalid Version: ${u}`);
      if (this.raw = u, this.major = +f[1], this.minor = +f[2], this.patch = +f[3], this.major > n || this.major < 0) throw new TypeError("Invalid major version");
      if (this.minor > n || this.minor < 0) throw new TypeError("Invalid minor version");
      if (this.patch > n || this.patch < 0) throw new TypeError("Invalid patch version");
      f[4] ? this.prerelease = f[4].split(".").map((p) => {
        if (/^[0-9]+$/.test(p)) {
          const v = +p;
          if (v >= 0 && v < n) return v;
        }
        return p;
      }) : this.prerelease = [], this.build = f[5] ? f[5].split(".") : [], this.format();
    }
    format() {
      return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
    }
    toString() {
      return this.version;
    }
    compare(u) {
      if (e4("SemVer.compare", this.version, this.options, u), !(u instanceof a)) {
        if (typeof u == "string" && u === this.version) return 0;
        u = new a(u, this.options);
      }
      return u.version === this.version ? 0 : this.compareMain(u) || this.comparePre(u);
    }
    compareMain(u) {
      return u instanceof a || (u = new a(u, this.options)), o(this.major, u.major) || o(this.minor, u.minor) || o(this.patch, u.patch);
    }
    comparePre(u) {
      if (u instanceof a || (u = new a(u, this.options)), this.prerelease.length && !u.prerelease.length) return -1;
      if (!this.prerelease.length && u.prerelease.length) return 1;
      if (!this.prerelease.length && !u.prerelease.length) return 0;
      let c = 0;
      do {
        const f = this.prerelease[c], p = u.prerelease[c];
        if (e4("prerelease compare", c, f, p), f === void 0 && p === void 0) return 0;
        if (p === void 0) return 1;
        if (f === void 0) return -1;
        if (f === p) continue;
        return o(f, p);
      } while (++c);
    }
    compareBuild(u) {
      u instanceof a || (u = new a(u, this.options));
      let c = 0;
      do {
        const f = this.build[c], p = u.build[c];
        if (e4("build compare", c, f, p), f === void 0 && p === void 0) return 0;
        if (p === void 0) return 1;
        if (f === void 0) return -1;
        if (f === p) continue;
        return o(f, p);
      } while (++c);
    }
    inc(u, c, f) {
      if (u.startsWith("pre")) {
        if (!c && f === false) throw new Error("invalid increment argument: identifier is empty");
        if (c) {
          const p = `-${c}`.match(this.options.loose ? r[i.PRERELEASELOOSE] : r[i.PRERELEASE]);
          if (!p || p[1] !== c) throw new Error(`invalid identifier: ${c}`);
        }
      }
      switch (u) {
        case "premajor":
          this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", c, f);
          break;
        case "preminor":
          this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", c, f);
          break;
        case "prepatch":
          this.prerelease.length = 0, this.inc("patch", c, f), this.inc("pre", c, f);
          break;
        case "prerelease":
          this.prerelease.length === 0 && this.inc("patch", c, f), this.inc("pre", c, f);
          break;
        case "release":
          if (this.prerelease.length === 0) throw new Error(`version ${this.raw} is not a prerelease`);
          this.prerelease.length = 0;
          break;
        case "major":
          (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
          break;
        case "minor":
          (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
          break;
        case "patch":
          this.prerelease.length === 0 && this.patch++, this.prerelease = [];
          break;
        case "pre": {
          const p = Number(f) ? 1 : 0;
          if (this.prerelease.length === 0) this.prerelease = [p];
          else {
            let v = this.prerelease.length;
            for (; --v >= 0; ) typeof this.prerelease[v] == "number" && (this.prerelease[v]++, v = -2);
            if (v === -1) {
              if (c === this.prerelease.join(".") && f === false) throw new Error("invalid increment argument: identifier already exists");
              this.prerelease.push(p);
            }
          }
          if (c) {
            let v = [c, p];
            f === false && (v = [c]), o(this.prerelease[0], c) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = v) : this.prerelease = v;
          }
          break;
        }
        default:
          throw new Error(`invalid increment argument: ${u}`);
      }
      return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
    }
  }
  return Qc = a, Qc;
}
var eu, Kp;
function tA() {
  if (Kp) return eu;
  Kp = 1;
  const e4 = Zp();
  return eu = (n, r, i = false) => {
    if (n instanceof e4) return n;
    try {
      return new e4(n, r);
    } catch (s) {
      if (!i) return null;
      throw s;
    }
  }, eu;
}
var tu, Yp;
function nA() {
  if (Yp) return tu;
  Yp = 1;
  const e4 = tA();
  return tu = (n, r) => {
    const i = e4(n, r);
    return i ? i.version : null;
  }, tu;
}
var rA = nA();
const iA = Es(rA);
var nu, Xp;
function sA() {
  if (Xp) return nu;
  Xp = 1;
  const e4 = Zp();
  return nu = (n, r) => new e4(n, r).major, nu;
}
var oA = sA();
const Jp = Es(oA);
class aA {
  bus;
  constructor(t) {
    typeof t.getVersion != "function" || !iA(t.getVersion()) ? console.warn("Proxying an event bus with an unknown or invalid version") : Jp(t.getVersion()) !== Jp(this.getVersion()) && console.warn("Proxying an event bus of version " + t.getVersion() + " with " + this.getVersion()), this.bus = t;
  }
  getVersion() {
    return "3.3.2";
  }
  subscribe(t, n) {
    this.bus.subscribe(t, n);
  }
  unsubscribe(t, n) {
    this.bus.unsubscribe(t, n);
  }
  emit(t, ...n) {
    this.bus.emit(t, ...n);
  }
}
class lA {
  handlers = /* @__PURE__ */ new Map();
  getVersion() {
    return "3.3.2";
  }
  subscribe(t, n) {
    this.handlers.set(t, (this.handlers.get(t) || []).concat(n));
  }
  unsubscribe(t, n) {
    this.handlers.set(t, (this.handlers.get(t) || []).filter((r) => r !== n));
  }
  emit(t, ...n) {
    (this.handlers.get(t) || []).forEach((i) => {
      try {
        i(n[0]);
      } catch (s) {
        console.error("could not invoke event listener", s);
      }
    });
  }
}
let Ps = null;
function ru() {
  return Ps !== null ? Ps : typeof window > "u" ? new Proxy({}, { get: () => () => console.error("Window not available, EventBus can not be established!") }) : (window.OC?._eventBus && typeof window._nc_event_bus > "u" && (console.warn("found old event bus instance at OC._eventBus. Update your version!"), window._nc_event_bus = window.OC._eventBus), typeof window?._nc_event_bus < "u" ? Ps = new aA(window._nc_event_bus) : Ps = window._nc_event_bus = new lA(), Ps);
}
function xs(e4, t) {
  ru().subscribe(e4, t);
}
function ca(e4, t) {
  ru().unsubscribe(e4, t);
}
function cA(e4, ...t) {
  ru().emit(e4, ...t);
}
var Ti = {}, Rs = {}, Ms = {}, Qp;
function em() {
  if (Qp) return Ms;
  Qp = 1, Object.defineProperty(Ms, "__esModule", { value: true }), Ms.default = void 0;
  function e4(i, s, o) {
    return s = t(s), s in i ? Object.defineProperty(i, s, { value: o, enumerable: true, configurable: true, writable: true }) : i[s] = o, i;
  }
  function t(i) {
    var s = n(i, "string");
    return typeof s == "symbol" ? s : s + "";
  }
  function n(i, s) {
    if (typeof i != "object" || !i) return i;
    var o = i[Symbol.toPrimitive];
    if (o !== void 0) {
      var a = o.call(i, s);
      if (typeof a != "object") return a;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (s === "string" ? String : Number)(i);
  }
  class r {
    constructor(s, o, a) {
      e4(this, "scope", void 0), e4(this, "wrapped", void 0), this.scope = "".concat(a ? r.GLOBAL_SCOPE_PERSISTENT : r.GLOBAL_SCOPE_VOLATILE, "_").concat(btoa(s), "_"), this.wrapped = o;
    }
    scopeKey(s) {
      return "".concat(this.scope).concat(s);
    }
    setItem(s, o) {
      this.wrapped.setItem(this.scopeKey(s), o);
    }
    getItem(s) {
      return this.wrapped.getItem(this.scopeKey(s));
    }
    removeItem(s) {
      this.wrapped.removeItem(this.scopeKey(s));
    }
    clear() {
      Object.keys(this.wrapped).filter((s) => s.startsWith(this.scope)).map(this.wrapped.removeItem.bind(this.wrapped));
    }
  }
  return Ms.default = r, e4(r, "GLOBAL_SCOPE_VOLATILE", "nextcloud_vol"), e4(r, "GLOBAL_SCOPE_PERSISTENT", "nextcloud_per"), Ms;
}
var tm;
function uA() {
  if (tm) return Rs;
  tm = 1, Object.defineProperty(Rs, "__esModule", { value: true }), Rs.default = void 0;
  var e4 = t(em());
  function t(o) {
    return o && o.__esModule ? o : { default: o };
  }
  function n(o, a, l) {
    return a = r(a), a in o ? Object.defineProperty(o, a, { value: l, enumerable: true, configurable: true, writable: true }) : o[a] = l, o;
  }
  function r(o) {
    var a = i(o, "string");
    return typeof a == "symbol" ? a : a + "";
  }
  function i(o, a) {
    if (typeof o != "object" || !o) return o;
    var l = o[Symbol.toPrimitive];
    if (l !== void 0) {
      var u = l.call(o, a);
      if (typeof u != "object") return u;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (a === "string" ? String : Number)(o);
  }
  class s {
    constructor(a) {
      n(this, "appId", void 0), n(this, "persisted", false), n(this, "clearedOnLogout", false), this.appId = a;
    }
    persist() {
      let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
      return this.persisted = a, this;
    }
    clearOnLogout() {
      let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
      return this.clearedOnLogout = a, this;
    }
    build() {
      return new e4.default(this.appId, this.persisted ? window.localStorage : window.sessionStorage, !this.clearedOnLogout);
    }
  }
  return Rs.default = s, Rs;
}
var nm;
function dA() {
  if (nm) return Ti;
  nm = 1, Object.defineProperty(Ti, "__esModule", { value: true }), Ti.clearAll = s, Ti.clearNonPersistent = o, Ti.getBuilder = r;
  var e4 = n(uA()), t = n(em());
  function n(a) {
    return a && a.__esModule ? a : { default: a };
  }
  function r(a) {
    return new e4.default(a);
  }
  function i(a, l) {
    Object.keys(a).filter((u) => l ? l(u) : true).map(a.removeItem.bind(a));
  }
  function s() {
    [window.sessionStorage, window.localStorage].map((l) => i(l));
  }
  function o() {
    [window.sessionStorage, window.localStorage].map((l) => i(l, (u) => !u.startsWith(t.default.GLOBAL_SCOPE_PERSISTENT)));
  }
  return Ti;
}
var iu = dA();
let js;
const rm = [];
function fA() {
  return js === void 0 && (js = document.head.dataset.requesttoken ?? null), js;
}
function hA(e4) {
  rm.push(e4);
}
xs("csrf-token-update", (e4) => {
  js = e4.token, rm.forEach((t) => {
    try {
      t(js);
    } catch (n) {
      console.error("Error updating CSRF token observer", n);
    }
  });
});
iu.getBuilder("public").persist().build();
let Ni;
function im(e4, t) {
  return e4 ? e4.getAttribute(t) : null;
}
function Is() {
  if (Ni !== void 0) return Ni;
  const e4 = document?.getElementsByTagName("head")[0];
  if (!e4) return null;
  const t = im(e4, "data-user");
  return t === null ? (Ni = null, Ni) : (Ni = { uid: t, displayName: im(e4, "data-user-displayname"), isAdmin: !!window._oc_isadmin }, Ni);
}
const su = (e4, t, n) => {
  var r;
  const i = Object.assign({ ocsVersion: 2 }, {}).ocsVersion === 1 ? 1 : 2;
  return ((r = void 0) != null ? r : au()) + "/ocs/v" + i + ".php" + ou(e4, t, n);
}, ou = (e4, t, n) => {
  const r = Object.assign({ escape: true }, n || {}), i = function(s, o) {
    return o = o || {}, s.replace(/{([^{}]*)}/g, function(a, l) {
      const u = o[l];
      return r.escape ? encodeURIComponent(typeof u == "string" || typeof u == "number" ? u.toString() : a) : typeof u == "string" || typeof u == "number" ? u.toString() : a;
    });
  };
  return e4.charAt(0) !== "/" && (e4 = "/" + e4), i(e4, t || {});
}, ua = (e4, t, n) => {
  var r, i, s;
  const o = Object.assign({ noRewrite: false }, n || {}), a = (r = n?.baseURL) != null ? r : da();
  return ((s = (i = window?.OC) == null ? void 0 : i.config) == null ? void 0 : s.modRewriteWorking) === true && !o.noRewrite ? a + ou(e4, t, n) : a + "/index.php" + ou(e4, t, n);
}, vA = (e4, t) => t.includes(".") ? sm(e4, "img", t) : sm(e4, "img", "".concat(t, ".svg")), sm = (e4, t, n) => {
  var r, i, s;
  const o = (s = (i = (r = window?.OC) == null ? void 0 : r.coreApps) == null ? void 0 : i.includes(e4)) != null ? s : false, a = n.slice(-3) === "php";
  let l = da();
  return a && !o ? (l += "/index.php/apps/".concat(e4), l += "/".concat(encodeURI(t)), n !== "index.php" && (l += "/".concat(n))) : !a && !o ? (l = pA(e4), l += "/".concat(t, "/"), l.at(-1) !== "/" && (l += "/"), l += n) : (l += "/".concat(e4), l += "/".concat(t), l += "/".concat(n)), l;
}, au = () => window.location.protocol + "//" + window.location.host + da();
function da() {
  let e4 = window._oc_webroot;
  if (typeof e4 > "u") {
    e4 = location.pathname;
    const t = e4.indexOf("/index.php/");
    if (t !== -1) e4 = e4.slice(0, t);
    else {
      const n = e4.indexOf("/", 1);
      e4 = e4.slice(0, n > 0 ? n : void 0);
    }
  }
  return e4;
}
function pA(e4) {
  var t, n;
  return (n = ((t = window._oc_appswebroots) != null ? t : {})[e4]) != null ? n : "";
}
var vt = ((e4) => (e4[e4.Debug = 0] = "Debug", e4[e4.Info = 1] = "Info", e4[e4.Warn = 2] = "Warn", e4[e4.Error = 3] = "Error", e4[e4.Fatal = 4] = "Fatal", e4))(vt || {}), mA = Object.defineProperty, gA = (e4, t, n) => t in e4 ? mA(e4, t, { enumerable: true, configurable: true, writable: true, value: n }) : e4[t] = n, yA = (e4, t, n) => (gA(e4, t + "", n), n);
class bA {
  constructor(t) {
    yA(this, "context"), this.context = t || {};
  }
  formatMessage(t, n, r) {
    let i = "[" + vt[n].toUpperCase() + "] ";
    return r && r.app && (i += r.app + ": "), typeof t == "string" ? i + t : (i += "Unexpected ".concat(t.name), t.message && (i += ' "'.concat(t.message, '"')), n === vt.Debug && t.stack && (i += `

Stack trace:
`.concat(t.stack)), i);
  }
  log(t, n, r) {
    var i, s;
    if (!(typeof ((i = this.context) == null ? void 0 : i.level) == "number" && t < ((s = this.context) == null ? void 0 : s.level))) switch (typeof n == "object" && r?.error === void 0 && (r.error = n), t) {
      case vt.Debug:
        console.debug(this.formatMessage(n, vt.Debug, r), r);
        break;
      case vt.Info:
        console.info(this.formatMessage(n, vt.Info, r), r);
        break;
      case vt.Warn:
        console.warn(this.formatMessage(n, vt.Warn, r), r);
        break;
      case vt.Error:
        console.error(this.formatMessage(n, vt.Error, r), r);
        break;
      case vt.Fatal:
      default:
        console.error(this.formatMessage(n, vt.Fatal, r), r);
        break;
    }
  }
  debug(t, n) {
    this.log(vt.Debug, t, Object.assign({}, this.context, n));
  }
  info(t, n) {
    this.log(vt.Info, t, Object.assign({}, this.context, n));
  }
  warn(t, n) {
    this.log(vt.Warn, t, Object.assign({}, this.context, n));
  }
  error(t, n) {
    this.log(vt.Error, t, Object.assign({}, this.context, n));
  }
  fatal(t, n) {
    this.log(vt.Fatal, t, Object.assign({}, this.context, n));
  }
}
function kA(e4) {
  return new bA(e4);
}
var wA = Object.defineProperty, SA = (e4, t, n) => t in e4 ? wA(e4, t, { enumerable: true, configurable: true, writable: true, value: n }) : e4[t] = n, om = (e4, t, n) => (SA(e4, typeof t != "symbol" ? t + "" : t, n), n);
class EA {
  constructor(t) {
    om(this, "context"), om(this, "factory"), this.context = {}, this.factory = t;
  }
  setApp(t) {
    return this.context.app = t, this;
  }
  setLogLevel(t) {
    return this.context.level = t, this;
  }
  setUid(t) {
    return this.context.uid = t, this;
  }
  detectUser() {
    const t = Is();
    return t !== null && (this.context.uid = t.uid), this;
  }
  detectLogLevel() {
    const t = this, n = () => {
      var r, i;
      document.readyState === "complete" || document.readyState === "interactive" ? (t.context.level = (i = (r = window._oc_config) == null ? void 0 : r.loglevel) != null ? i : vt.Warn, window._oc_debug && (t.context.level = vt.Debug), document.removeEventListener("readystatechange", n)) : document.addEventListener("readystatechange", n);
    };
    return n(), this;
  }
  build() {
    return this.context.level === void 0 && this.detectLogLevel(), this.factory(this.context);
  }
}
function am() {
  return new EA(kA);
}
const { entries: lm, setPrototypeOf: cm, isFrozen: AA, getPrototypeOf: TA, getOwnPropertyDescriptor: NA } = Object;
let { freeze: zt, seal: an, create: um } = Object, { apply: lu, construct: cu } = typeof Reflect < "u" && Reflect;
zt || (zt = function(t) {
  return t;
}), an || (an = function(t) {
  return t;
}), lu || (lu = function(t, n, r) {
  return t.apply(n, r);
}), cu || (cu = function(t, n) {
  return new t(...n);
});
const fa = Ut(Array.prototype.forEach), CA = Ut(Array.prototype.lastIndexOf), dm = Ut(Array.prototype.pop), Ls = Ut(Array.prototype.push), _A = Ut(Array.prototype.splice), ha = Ut(String.prototype.toLowerCase), uu = Ut(String.prototype.toString), fm = Ut(String.prototype.match), Fs = Ut(String.prototype.replace), OA = Ut(String.prototype.indexOf), PA = Ut(String.prototype.trim), yn = Ut(Object.prototype.hasOwnProperty), $t = Ut(RegExp.prototype.test), Ds = xA(TypeError);
function Ut(e4) {
  return function(t) {
    t instanceof RegExp && (t.lastIndex = 0);
    for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++) r[i - 1] = arguments[i];
    return lu(e4, t, r);
  };
}
function xA(e4) {
  return function() {
    for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
    return cu(e4, n);
  };
}
function Pe(e4, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ha;
  cm && cm(e4, null);
  let r = t.length;
  for (; r--; ) {
    let i = t[r];
    if (typeof i == "string") {
      const s = n(i);
      s !== i && (AA(t) || (t[r] = s), i = s);
    }
    e4[i] = true;
  }
  return e4;
}
function RA(e4) {
  for (let t = 0; t < e4.length; t++) yn(e4, t) || (e4[t] = null);
  return e4;
}
function rr(e4) {
  const t = um(null);
  for (const [n, r] of lm(e4)) yn(e4, n) && (Array.isArray(r) ? t[n] = RA(r) : r && typeof r == "object" && r.constructor === Object ? t[n] = rr(r) : t[n] = r);
  return t;
}
function Bs(e4, t) {
  for (; e4 !== null; ) {
    const r = NA(e4, t);
    if (r) {
      if (r.get) return Ut(r.get);
      if (typeof r.value == "function") return Ut(r.value);
    }
    e4 = TA(e4);
  }
  function n() {
    return null;
  }
  return n;
}
const hm = zt(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "section", "select", "shadow", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), du = zt(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), fu = zt(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), MA = zt(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), hu = zt(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), jA = zt(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), vm = zt(["#text"]), pm = zt(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), vu = zt(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), mm = zt(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), va = zt(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), IA = an(/\{\{[\w\W]*|[\w\W]*\}\}/gm), LA = an(/<%[\w\W]*|[\w\W]*%>/gm), FA = an(/\$\{[\w\W]*/gm), DA = an(/^data-[\-\w.\u00B7-\uFFFF]+$/), BA = an(/^aria-[\-\w]+$/), gm = an(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i), zA = an(/^(?:\w+script|data):/i), $A = an(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g), ym = an(/^html$/i), UA = an(/^[a-z][.\w]*(-[.\w]+)+$/i);
var bm = Object.freeze({ __proto__: null, ARIA_ATTR: BA, ATTR_WHITESPACE: $A, CUSTOM_ELEMENT: UA, DATA_ATTR: DA, DOCTYPE_NAME: ym, ERB_EXPR: LA, IS_ALLOWED_URI: gm, IS_SCRIPT_OR_DATA: zA, MUSTACHE_EXPR: IA, TMPLIT_EXPR: FA });
const zs = { element: 1, text: 3, progressingInstruction: 7, comment: 8, document: 9 }, VA = function() {
  return typeof window > "u" ? null : window;
}, HA = function(t, n) {
  if (typeof t != "object" || typeof t.createPolicy != "function") return null;
  let r = null;
  const i = "data-tt-policy-suffix";
  n && n.hasAttribute(i) && (r = n.getAttribute(i));
  const s = "dompurify" + (r ? "#" + r : "");
  try {
    return t.createPolicy(s, { createHTML(o) {
      return o;
    }, createScriptURL(o) {
      return o;
    } });
  } catch {
    return console.warn("TrustedTypes policy " + s + " could not be created."), null;
  }
}, km = function() {
  return { afterSanitizeAttributes: [], afterSanitizeElements: [], afterSanitizeShadowDOM: [], beforeSanitizeAttributes: [], beforeSanitizeElements: [], beforeSanitizeShadowDOM: [], uponSanitizeAttribute: [], uponSanitizeElement: [], uponSanitizeShadowNode: [] };
};
function wm() {
  let e4 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : VA();
  const t = (he) => wm(he);
  if (t.version = "3.2.6", t.removed = [], !e4 || !e4.document || e4.document.nodeType !== zs.document || !e4.Element) return t.isSupported = false, t;
  let { document: n } = e4;
  const r = n, i = r.currentScript, { DocumentFragment: s, HTMLTemplateElement: o, Node: a, Element: l, NodeFilter: u, NamedNodeMap: c = e4.NamedNodeMap || e4.MozNamedAttrMap, HTMLFormElement: f, DOMParser: p, trustedTypes: v } = e4, m = l.prototype, y = Bs(m, "cloneNode"), k = Bs(m, "remove"), E = Bs(m, "nextSibling"), A = Bs(m, "childNodes"), C = Bs(m, "parentNode");
  if (typeof o == "function") {
    const he = n.createElement("template");
    he.content && he.content.ownerDocument && (n = he.content.ownerDocument);
  }
  let x, F = "";
  const { implementation: Y, createNodeIterator: U, createDocumentFragment: V, getElementsByTagName: M } = n, { importNode: q } = r;
  let Q = km();
  t.isSupported = typeof lm == "function" && typeof C == "function" && Y && Y.createHTMLDocument !== void 0;
  const { MUSTACHE_EXPR: z, ERB_EXPR: O, TMPLIT_EXPR: j, DATA_ATTR: X, ARIA_ATTR: re, IS_SCRIPT_OR_DATA: G, ATTR_WHITESPACE: se, CUSTOM_ELEMENT: fe } = bm;
  let { IS_ALLOWED_URI: Me } = bm, me = null;
  const Ge = Pe({}, [...hm, ...du, ...fu, ...hu, ...vm]);
  let Le = null;
  const Ce = Pe({}, [...pm, ...vu, ...mm, ...va]);
  let ye = Object.seal(um(null, { tagNameCheck: { writable: true, configurable: false, enumerable: true, value: null }, attributeNameCheck: { writable: true, configurable: false, enumerable: true, value: null }, allowCustomizedBuiltInElements: { writable: true, configurable: false, enumerable: true, value: false } })), tt = null, D = null, te = true, ee = true, ae = false, _e = true, w = false, S = true, _ = false, B = false, $ = false, L = false, J = false, K = false, Z = true, H = false;
  const ve = "user-content-";
  let ne = true, le = false, ce = {}, Se = null;
  const De = Pe({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let Ne = null;
  const mt = Pe({}, ["audio", "video", "img", "source", "image", "track"]);
  let g = null;
  const d = Pe({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), h = "http://www.w3.org/1998/Math/MathML", b = "http://www.w3.org/2000/svg", T = "http://www.w3.org/1999/xhtml";
  let P = T, I = false, Ee = null;
  const Ze = Pe({}, [h, b, T], uu);
  let Ve = Pe({}, ["mi", "mo", "mn", "ms", "mtext"]), Ke = Pe({}, ["annotation-xml"]);
  const He = Pe({}, ["title", "style", "font", "a", "script"]);
  let Gi = null;
  const _k = ["application/xhtml+xml", "text/html"], Ok = "text/html";
  let bt = null, ti = null;
  const Pk = n.createElement("form"), Hd = function(N) {
    return N instanceof RegExp || N instanceof Function;
  }, pl = function() {
    let N = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(ti && ti === N)) {
      if ((!N || typeof N != "object") && (N = {}), N = rr(N), Gi = _k.indexOf(N.PARSER_MEDIA_TYPE) === -1 ? Ok : N.PARSER_MEDIA_TYPE, bt = Gi === "application/xhtml+xml" ? uu : ha, me = yn(N, "ALLOWED_TAGS") ? Pe({}, N.ALLOWED_TAGS, bt) : Ge, Le = yn(N, "ALLOWED_ATTR") ? Pe({}, N.ALLOWED_ATTR, bt) : Ce, Ee = yn(N, "ALLOWED_NAMESPACES") ? Pe({}, N.ALLOWED_NAMESPACES, uu) : Ze, g = yn(N, "ADD_URI_SAFE_ATTR") ? Pe(rr(d), N.ADD_URI_SAFE_ATTR, bt) : d, Ne = yn(N, "ADD_DATA_URI_TAGS") ? Pe(rr(mt), N.ADD_DATA_URI_TAGS, bt) : mt, Se = yn(N, "FORBID_CONTENTS") ? Pe({}, N.FORBID_CONTENTS, bt) : De, tt = yn(N, "FORBID_TAGS") ? Pe({}, N.FORBID_TAGS, bt) : rr({}), D = yn(N, "FORBID_ATTR") ? Pe({}, N.FORBID_ATTR, bt) : rr({}), ce = yn(N, "USE_PROFILES") ? N.USE_PROFILES : false, te = N.ALLOW_ARIA_ATTR !== false, ee = N.ALLOW_DATA_ATTR !== false, ae = N.ALLOW_UNKNOWN_PROTOCOLS || false, _e = N.ALLOW_SELF_CLOSE_IN_ATTR !== false, w = N.SAFE_FOR_TEMPLATES || false, S = N.SAFE_FOR_XML !== false, _ = N.WHOLE_DOCUMENT || false, L = N.RETURN_DOM || false, J = N.RETURN_DOM_FRAGMENT || false, K = N.RETURN_TRUSTED_TYPE || false, $ = N.FORCE_BODY || false, Z = N.SANITIZE_DOM !== false, H = N.SANITIZE_NAMED_PROPS || false, ne = N.KEEP_CONTENT !== false, le = N.IN_PLACE || false, Me = N.ALLOWED_URI_REGEXP || gm, P = N.NAMESPACE || T, Ve = N.MATHML_TEXT_INTEGRATION_POINTS || Ve, Ke = N.HTML_INTEGRATION_POINTS || Ke, ye = N.CUSTOM_ELEMENT_HANDLING || {}, N.CUSTOM_ELEMENT_HANDLING && Hd(N.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (ye.tagNameCheck = N.CUSTOM_ELEMENT_HANDLING.tagNameCheck), N.CUSTOM_ELEMENT_HANDLING && Hd(N.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (ye.attributeNameCheck = N.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), N.CUSTOM_ELEMENT_HANDLING && typeof N.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (ye.allowCustomizedBuiltInElements = N.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), w && (ee = false), J && (L = true), ce && (me = Pe({}, vm), Le = [], ce.html === true && (Pe(me, hm), Pe(Le, pm)), ce.svg === true && (Pe(me, du), Pe(Le, vu), Pe(Le, va)), ce.svgFilters === true && (Pe(me, fu), Pe(Le, vu), Pe(Le, va)), ce.mathMl === true && (Pe(me, hu), Pe(Le, mm), Pe(Le, va))), N.ADD_TAGS && (me === Ge && (me = rr(me)), Pe(me, N.ADD_TAGS, bt)), N.ADD_ATTR && (Le === Ce && (Le = rr(Le)), Pe(Le, N.ADD_ATTR, bt)), N.ADD_URI_SAFE_ATTR && Pe(g, N.ADD_URI_SAFE_ATTR, bt), N.FORBID_CONTENTS && (Se === De && (Se = rr(Se)), Pe(Se, N.FORBID_CONTENTS, bt)), ne && (me["#text"] = true), _ && Pe(me, ["html", "head", "body"]), me.table && (Pe(me, ["tbody"]), delete tt.tbody), N.TRUSTED_TYPES_POLICY) {
        if (typeof N.TRUSTED_TYPES_POLICY.createHTML != "function") throw Ds('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof N.TRUSTED_TYPES_POLICY.createScriptURL != "function") throw Ds('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        x = N.TRUSTED_TYPES_POLICY, F = x.createHTML("");
      } else x === void 0 && (x = HA(v, i)), x !== null && typeof F == "string" && (F = x.createHTML(""));
      zt && zt(N), ti = N;
    }
  }, qd = Pe({}, [...du, ...fu, ...MA]), Wd = Pe({}, [...hu, ...jA]), xk = function(N) {
    let W = C(N);
    (!W || !W.tagName) && (W = { namespaceURI: P, tagName: "template" });
    const ue = ha(N.tagName), nt = ha(W.tagName);
    return Ee[N.namespaceURI] ? N.namespaceURI === b ? W.namespaceURI === T ? ue === "svg" : W.namespaceURI === h ? ue === "svg" && (nt === "annotation-xml" || Ve[nt]) : !!qd[ue] : N.namespaceURI === h ? W.namespaceURI === T ? ue === "math" : W.namespaceURI === b ? ue === "math" && Ke[nt] : !!Wd[ue] : N.namespaceURI === T ? W.namespaceURI === b && !Ke[nt] || W.namespaceURI === h && !Ve[nt] ? false : !Wd[ue] && (He[ue] || !qd[ue]) : !!(Gi === "application/xhtml+xml" && Ee[N.namespaceURI]) : false;
  }, _n = function(N) {
    Ls(t.removed, { element: N });
    try {
      C(N).removeChild(N);
    } catch {
      k(N);
    }
  }, ni = function(N, W) {
    try {
      Ls(t.removed, { attribute: W.getAttributeNode(N), from: W });
    } catch {
      Ls(t.removed, { attribute: null, from: W });
    }
    if (W.removeAttribute(N), N === "is") if (L || J) try {
      _n(W);
    } catch {
    }
    else try {
      W.setAttribute(N, "");
    } catch {
    }
  }, Gd = function(N) {
    let W = null, ue = null;
    if ($) N = "<remove></remove>" + N;
    else {
      const gt = fm(N, /^[\r\n\t ]+/);
      ue = gt && gt[0];
    }
    Gi === "application/xhtml+xml" && P === T && (N = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + N + "</body></html>");
    const nt = x ? x.createHTML(N) : N;
    if (P === T) try {
      W = new p().parseFromString(nt, Gi);
    } catch {
    }
    if (!W || !W.documentElement) {
      W = Y.createDocument(P, "template", null);
      try {
        W.documentElement.innerHTML = I ? F : nt;
      } catch {
      }
    }
    const _t = W.body || W.documentElement;
    return N && ue && _t.insertBefore(n.createTextNode(ue), _t.childNodes[0] || null), P === T ? M.call(W, _ ? "html" : "body")[0] : _ ? W.documentElement : _t;
  }, Zd = function(N) {
    return U.call(N.ownerDocument || N, N, u.SHOW_ELEMENT | u.SHOW_COMMENT | u.SHOW_TEXT | u.SHOW_PROCESSING_INSTRUCTION | u.SHOW_CDATA_SECTION, null);
  }, ml = function(N) {
    return N instanceof f && (typeof N.nodeName != "string" || typeof N.textContent != "string" || typeof N.removeChild != "function" || !(N.attributes instanceof c) || typeof N.removeAttribute != "function" || typeof N.setAttribute != "function" || typeof N.namespaceURI != "string" || typeof N.insertBefore != "function" || typeof N.hasChildNodes != "function");
  }, Kd = function(N) {
    return typeof a == "function" && N instanceof a;
  };
  function Hn(he, N, W) {
    fa(he, (ue) => {
      ue.call(t, N, W, ti);
    });
  }
  const Yd = function(N) {
    let W = null;
    if (Hn(Q.beforeSanitizeElements, N, null), ml(N)) return _n(N), true;
    const ue = bt(N.nodeName);
    if (Hn(Q.uponSanitizeElement, N, { tagName: ue, allowedTags: me }), S && N.hasChildNodes() && !Kd(N.firstElementChild) && $t(/<[/\w!]/g, N.innerHTML) && $t(/<[/\w!]/g, N.textContent) || N.nodeType === zs.progressingInstruction || S && N.nodeType === zs.comment && $t(/<[/\w]/g, N.data)) return _n(N), true;
    if (!me[ue] || tt[ue]) {
      if (!tt[ue] && Jd(ue) && (ye.tagNameCheck instanceof RegExp && $t(ye.tagNameCheck, ue) || ye.tagNameCheck instanceof Function && ye.tagNameCheck(ue))) return false;
      if (ne && !Se[ue]) {
        const nt = C(N) || N.parentNode, _t = A(N) || N.childNodes;
        if (_t && nt) {
          const gt = _t.length;
          for (let qt = gt - 1; qt >= 0; --qt) {
            const qn = y(_t[qt], true);
            qn.__removalCount = (N.__removalCount || 0) + 1, nt.insertBefore(qn, E(N));
          }
        }
      }
      return _n(N), true;
    }
    return N instanceof l && !xk(N) || (ue === "noscript" || ue === "noembed" || ue === "noframes") && $t(/<\/no(script|embed|frames)/i, N.innerHTML) ? (_n(N), true) : (w && N.nodeType === zs.text && (W = N.textContent, fa([z, O, j], (nt) => {
      W = Fs(W, nt, " ");
    }), N.textContent !== W && (Ls(t.removed, { element: N.cloneNode() }), N.textContent = W)), Hn(Q.afterSanitizeElements, N, null), false);
  }, Xd = function(N, W, ue) {
    if (Z && (W === "id" || W === "name") && (ue in n || ue in Pk)) return false;
    if (!(ee && !D[W] && $t(X, W))) {
      if (!(te && $t(re, W))) {
        if (!Le[W] || D[W]) {
          if (!(Jd(N) && (ye.tagNameCheck instanceof RegExp && $t(ye.tagNameCheck, N) || ye.tagNameCheck instanceof Function && ye.tagNameCheck(N)) && (ye.attributeNameCheck instanceof RegExp && $t(ye.attributeNameCheck, W) || ye.attributeNameCheck instanceof Function && ye.attributeNameCheck(W)) || W === "is" && ye.allowCustomizedBuiltInElements && (ye.tagNameCheck instanceof RegExp && $t(ye.tagNameCheck, ue) || ye.tagNameCheck instanceof Function && ye.tagNameCheck(ue)))) return false;
        } else if (!g[W]) {
          if (!$t(Me, Fs(ue, se, ""))) {
            if (!((W === "src" || W === "xlink:href" || W === "href") && N !== "script" && OA(ue, "data:") === 0 && Ne[N])) {
              if (!(ae && !$t(G, Fs(ue, se, "")))) {
                if (ue) return false;
              }
            }
          }
        }
      }
    }
    return true;
  }, Jd = function(N) {
    return N !== "annotation-xml" && fm(N, fe);
  }, Qd = function(N) {
    Hn(Q.beforeSanitizeAttributes, N, null);
    const { attributes: W } = N;
    if (!W || ml(N)) return;
    const ue = { attrName: "", attrValue: "", keepAttr: true, allowedAttributes: Le, forceKeepAttr: void 0 };
    let nt = W.length;
    for (; nt--; ) {
      const _t = W[nt], { name: gt, namespaceURI: qt, value: qn } = _t, Zi = bt(gt), gl = qn;
      let Ot = gt === "value" ? gl : PA(gl);
      if (ue.attrName = Zi, ue.attrValue = Ot, ue.keepAttr = true, ue.forceKeepAttr = void 0, Hn(Q.uponSanitizeAttribute, N, ue), Ot = ue.attrValue, H && (Zi === "id" || Zi === "name") && (ni(gt, N), Ot = ve + Ot), S && $t(/((--!?|])>)|<\/(style|title)/i, Ot)) {
        ni(gt, N);
        continue;
      }
      if (ue.forceKeepAttr) continue;
      if (!ue.keepAttr) {
        ni(gt, N);
        continue;
      }
      if (!_e && $t(/\/>/i, Ot)) {
        ni(gt, N);
        continue;
      }
      w && fa([z, O, j], (tf) => {
        Ot = Fs(Ot, tf, " ");
      });
      const ef = bt(N.nodeName);
      if (!Xd(ef, Zi, Ot)) {
        ni(gt, N);
        continue;
      }
      if (x && typeof v == "object" && typeof v.getAttributeType == "function" && !qt) switch (v.getAttributeType(ef, Zi)) {
        case "TrustedHTML": {
          Ot = x.createHTML(Ot);
          break;
        }
        case "TrustedScriptURL": {
          Ot = x.createScriptURL(Ot);
          break;
        }
      }
      if (Ot !== gl) try {
        qt ? N.setAttributeNS(qt, gt, Ot) : N.setAttribute(gt, Ot), ml(N) ? _n(N) : dm(t.removed);
      } catch {
        ni(gt, N);
      }
    }
    Hn(Q.afterSanitizeAttributes, N, null);
  }, Rk = function he(N) {
    let W = null;
    const ue = Zd(N);
    for (Hn(Q.beforeSanitizeShadowDOM, N, null); W = ue.nextNode(); ) Hn(Q.uponSanitizeShadowNode, W, null), Yd(W), Qd(W), W.content instanceof s && he(W.content);
    Hn(Q.afterSanitizeShadowDOM, N, null);
  };
  return t.sanitize = function(he) {
    let N = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, W = null, ue = null, nt = null, _t = null;
    if (I = !he, I && (he = "<!-->"), typeof he != "string" && !Kd(he)) if (typeof he.toString == "function") {
      if (he = he.toString(), typeof he != "string") throw Ds("dirty is not a string, aborting");
    } else throw Ds("toString is not a function");
    if (!t.isSupported) return he;
    if (B || pl(N), t.removed = [], typeof he == "string" && (le = false), le) {
      if (he.nodeName) {
        const qn = bt(he.nodeName);
        if (!me[qn] || tt[qn]) throw Ds("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (he instanceof a) W = Gd("<!---->"), ue = W.ownerDocument.importNode(he, true), ue.nodeType === zs.element && ue.nodeName === "BODY" || ue.nodeName === "HTML" ? W = ue : W.appendChild(ue);
    else {
      if (!L && !w && !_ && he.indexOf("<") === -1) return x && K ? x.createHTML(he) : he;
      if (W = Gd(he), !W) return L ? null : K ? F : "";
    }
    W && $ && _n(W.firstChild);
    const gt = Zd(le ? he : W);
    for (; nt = gt.nextNode(); ) Yd(nt), Qd(nt), nt.content instanceof s && Rk(nt.content);
    if (le) return he;
    if (L) {
      if (J) for (_t = V.call(W.ownerDocument); W.firstChild; ) _t.appendChild(W.firstChild);
      else _t = W;
      return (Le.shadowroot || Le.shadowrootmode) && (_t = q.call(r, _t, true)), _t;
    }
    let qt = _ ? W.outerHTML : W.innerHTML;
    return _ && me["!doctype"] && W.ownerDocument && W.ownerDocument.doctype && W.ownerDocument.doctype.name && $t(ym, W.ownerDocument.doctype.name) && (qt = "<!DOCTYPE " + W.ownerDocument.doctype.name + `>
` + qt), w && fa([z, O, j], (qn) => {
      qt = Fs(qt, qn, " ");
    }), x && K ? x.createHTML(qt) : qt;
  }, t.setConfig = function() {
    let he = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    pl(he), B = true;
  }, t.clearConfig = function() {
    ti = null, B = false;
  }, t.isValidAttribute = function(he, N, W) {
    ti || pl({});
    const ue = bt(he), nt = bt(N);
    return Xd(ue, nt, W);
  }, t.addHook = function(he, N) {
    typeof N == "function" && Ls(Q[he], N);
  }, t.removeHook = function(he, N) {
    if (N !== void 0) {
      const W = CA(Q[he], N);
      return W === -1 ? void 0 : _A(Q[he], W, 1)[0];
    }
    return dm(Q[he]);
  }, t.removeHooks = function(he) {
    Q[he] = [];
  }, t.removeAllHooks = function() {
    Q = km();
  }, t;
}
var pu = wm();
var mu, Sm;
function qA() {
  if (Sm) return mu;
  Sm = 1;
  var e4 = /["'&<>]/;
  mu = t;
  function t(n) {
    var r = "" + n, i = e4.exec(r);
    if (!i) return r;
    var s, o = "", a = 0, l = 0;
    for (a = i.index; a < r.length; a++) {
      switch (r.charCodeAt(a)) {
        case 34:
          s = "&quot;";
          break;
        case 38:
          s = "&amp;";
          break;
        case 39:
          s = "&#39;";
          break;
        case 60:
          s = "&lt;";
          break;
        case 62:
          s = "&gt;";
          break;
        default:
          continue;
      }
      l !== a && (o += r.substring(l, a)), l = a + 1, o += s;
    }
    return l !== a ? o + r.substring(l, a) : o;
  }
  return mu;
}
var WA = qA();
const gu = Es(WA);
function Em() {
  return globalThis._nc_l10n_locale;
}
function GA() {
  return Em().replaceAll(/_/g, "-");
}
function pa() {
  return globalThis._nc_l10n_language;
}
function ZA(e4) {
  const t = pa();
  return ["ae", "ar", "arc", "arz", "bcc", "bqi", "ckb", "dv", "fa", "glk", "ha", "he", "khw", "ks", "ku", "mzn", "nqo", "pnb", "ps", "sd", "ug", "ur", "ur-PK", "uz-AF", "yi"].includes(t);
}
globalThis._nc_l10n_locale ??= typeof document < "u" && document.documentElement.dataset.locale || Intl.DateTimeFormat().resolvedOptions().locale.replaceAll(/-/g, "_"), globalThis._nc_l10n_language ??= typeof document < "u" && document.documentElement.lang || (globalThis.navigator?.language ?? "en");
function Am(e4) {
  return { translations: globalThis._oc_l10n_registry_translations[e4] ?? {}, pluralFunction: globalThis._oc_l10n_registry_plural_functions[e4] ?? ((t) => t) };
}
globalThis._oc_l10n_registry_translations ??= {}, globalThis._oc_l10n_registry_plural_functions ??= {};
function $s(e4, t, n, r, i) {
  const s = typeof n == "object" ? n : void 0, o = typeof r == "number" ? r : typeof n == "number" ? n : void 0, a = { escape: true, sanitize: true, ...typeof i == "object" ? i : typeof r == "object" ? r : {} }, l = (y) => y, u = (a.sanitize ? pu.sanitize : l) || l, c = a.escape ? gu : l, f = (y) => typeof y == "string" || typeof y == "number", p = (y, k, E) => y.replace(/%n/g, "" + E).replace(/{([^{}]*)}/g, (A, C) => {
    if (k === void 0 || !(C in k)) return c(A);
    const x = k[C];
    return f(x) ? c(`${x}`) : typeof x == "object" && f(x.value) ? (x.escape !== false ? gu : l)(`${x.value}`) : c(A);
  });
  let m = (i?.bundle ?? Am(e4)).translations[t] || t;
  return m = Array.isArray(m) ? m[0] : m, u(typeof s == "object" || o !== void 0 ? p(m, s, o) : m);
}
function Tm(e4, t, n, r, i, s) {
  const o = "_" + t + "_::_" + n + "_", a = s?.bundle ?? Am(e4), l = a.translations[o];
  if (typeof l < "u") {
    const u = l;
    if (Array.isArray(u)) {
      const c = a.pluralFunction(r);
      return $s(e4, u[c], i, r, s);
    }
  }
  return r === 1 ? $s(e4, t, i, r, s) : $s(e4, n, i, r, s);
}
function KA(e4, t = pa()) {
  switch (t === "pt-BR" && (t = "xbr"), t.length > 3 && (t = t.substring(0, t.lastIndexOf("-"))), t) {
    case "az":
    case "bo":
    case "dz":
    case "id":
    case "ja":
    case "jv":
    case "ka":
    case "km":
    case "kn":
    case "ko":
    case "ms":
    case "th":
    case "tr":
    case "vi":
    case "zh":
      return 0;
    case "af":
    case "bn":
    case "bg":
    case "ca":
    case "da":
    case "de":
    case "el":
    case "en":
    case "eo":
    case "es":
    case "et":
    case "eu":
    case "fa":
    case "fi":
    case "fo":
    case "fur":
    case "fy":
    case "gl":
    case "gu":
    case "ha":
    case "he":
    case "hu":
    case "is":
    case "it":
    case "ku":
    case "lb":
    case "ml":
    case "mn":
    case "mr":
    case "nah":
    case "nb":
    case "ne":
    case "nl":
    case "nn":
    case "no":
    case "oc":
    case "om":
    case "or":
    case "pa":
    case "pap":
    case "ps":
    case "pt":
    case "so":
    case "sq":
    case "sv":
    case "sw":
    case "ta":
    case "te":
    case "tk":
    case "ur":
    case "zu":
      return e4 === 1 ? 0 : 1;
    case "am":
    case "bh":
    case "fil":
    case "fr":
    case "gun":
    case "hi":
    case "hy":
    case "ln":
    case "mg":
    case "nso":
    case "xbr":
    case "ti":
    case "wa":
      return e4 === 0 || e4 === 1 ? 0 : 1;
    case "be":
    case "bs":
    case "hr":
    case "ru":
    case "sh":
    case "sr":
    case "uk":
      return e4 % 10 === 1 && e4 % 100 !== 11 ? 0 : e4 % 10 >= 2 && e4 % 10 <= 4 && (e4 % 100 < 10 || e4 % 100 >= 20) ? 1 : 2;
    case "cs":
    case "sk":
      return e4 === 1 ? 0 : e4 >= 2 && e4 <= 4 ? 1 : 2;
    case "ga":
      return e4 === 1 ? 0 : e4 === 2 ? 1 : 2;
    case "lt":
      return e4 % 10 === 1 && e4 % 100 !== 11 ? 0 : e4 % 10 >= 2 && (e4 % 100 < 10 || e4 % 100 >= 20) ? 1 : 2;
    case "sl":
      return e4 % 100 === 1 ? 0 : e4 % 100 === 2 ? 1 : e4 % 100 === 3 || e4 % 100 === 4 ? 2 : 3;
    case "mk":
      return e4 % 10 === 1 ? 0 : 1;
    case "mt":
      return e4 === 1 ? 0 : e4 === 0 || e4 % 100 > 1 && e4 % 100 < 11 ? 1 : e4 % 100 > 10 && e4 % 100 < 20 ? 2 : 3;
    case "lv":
      return e4 === 0 ? 0 : e4 % 10 === 1 && e4 % 100 !== 11 ? 1 : 2;
    case "pl":
      return e4 === 1 ? 0 : e4 % 10 >= 2 && e4 % 10 <= 4 && (e4 % 100 < 12 || e4 % 100 > 14) ? 1 : 2;
    case "cy":
      return e4 === 1 ? 0 : e4 === 2 ? 1 : e4 === 8 || e4 === 11 ? 2 : 3;
    case "ro":
      return e4 === 1 ? 0 : e4 === 0 || e4 % 100 > 0 && e4 % 100 < 20 ? 1 : 2;
    case "ar":
      return e4 === 0 ? 0 : e4 === 1 ? 1 : e4 === 2 ? 2 : e4 % 100 >= 3 && e4 % 100 <= 10 ? 3 : e4 % 100 >= 11 && e4 % 100 <= 99 ? 4 : 5;
    default:
      return 0;
  }
}
class YA {
  bundle;
  constructor(t) {
    this.bundle = { pluralFunction: t, translations: {} };
  }
  addTranslations(t) {
    const n = Object.values(t.translations[""] ?? {}).map(({ msgid: r, msgid_plural: i, msgstr: s }) => i !== void 0 ? [`_${r}_::_${i}_`, s] : [r, s[0]]);
    this.bundle.translations = { ...this.bundle.translations, ...Object.fromEntries(n) };
  }
  gettext(t, n = {}) {
    return $s("", t, n, void 0, { bundle: this.bundle });
  }
  ngettext(t, n, r, i = {}) {
    return Tm("", t, n, r, i, { bundle: this.bundle });
  }
}
class XA {
  debug = false;
  language = "en";
  translations = {};
  setLanguage(t) {
    return this.language = t, this;
  }
  detectLocale() {
    return this.detectLanguage();
  }
  detectLanguage() {
    return this.setLanguage(pa().replace("-", "_"));
  }
  addTranslation(t, n) {
    return this.translations[t] = n, this;
  }
  enableDebugMode() {
    return this.debug = true, this;
  }
  build() {
    this.debug && console.debug(`Creating gettext instance for language ${this.language}`);
    const t = new YA((n) => KA(n, this.language));
    return this.language in this.translations && t.addTranslations(this.translations[this.language]), t;
  }
}
function Nm() {
  return new XA();
}
function wr(e4) {
  return Ao() ? (Tl(e4), true) : false;
}
const yu = /* @__PURE__ */ new WeakMap(), JA = (...e4) => {
  var t;
  const n = e4[0], r = (t = rn()) == null ? void 0 : t.proxy;
  if (r == null && !tc()) throw new Error("injectLocal must be called in setup");
  return r && yu.has(r) && n in yu.get(r) ? yu.get(r)[n] : kt(...e4);
};
function QA(e4) {
  let t = 0, n, r;
  const i = () => {
    t -= 1, r && t <= 0 && (r.stop(), n = void 0, r = void 0);
  };
  return (...s) => (t += 1, r || (r = Al(true), n = r.run(() => e4(...s))), wr(i), n);
}
const bu = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const Cm = (e4) => e4 != null, eT = Object.prototype.toString, _m = (e4) => eT.call(e4) === "[object Object]", bn = () => {
}, ku = tT();
function tT() {
  var e4, t;
  return bu && ((e4 = window?.navigator) == null ? void 0 : e4.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((t = window?.navigator) == null ? void 0 : t.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window?.navigator.userAgent));
}
function nT(...e4) {
  if (e4.length !== 1) return Fl(...e4);
  const t = e4[0];
  return typeof t == "function" ? ai(Ll(() => ({ get: t, set: bn }))) : Gt(t);
}
function Om(e4) {
  return e4.endsWith("rem") ? Number.parseFloat(e4) * 16 : Number.parseFloat(e4);
}
function ir(e4) {
  return Array.isArray(e4) ? e4 : [e4];
}
function rT(e4) {
  return rn();
}
const Pm = ot;
function wu(e4, t = true, n) {
  rT() ? hi(e4, n) : t ? e4() : Lr(e4);
}
function xm(e4, t, n) {
  return ft(e4, t, { ...n, immediate: true });
}
const Bn = bu ? window : void 0;
function Vt(e4) {
  var t;
  const n = ot(e4);
  return (t = n?.$el) != null ? t : n;
}
function ln(...e4) {
  const t = [], n = () => {
    t.forEach((a) => a()), t.length = 0;
  }, r = (a, l, u, c) => (a.addEventListener(l, u, c), () => a.removeEventListener(l, u, c)), i = ke(() => {
    const a = ir(ot(e4[0])).filter((l) => l != null);
    return a.every((l) => typeof l != "string") ? a : void 0;
  }), s = xm(() => {
    var a, l;
    return [(l = (a = i.value) == null ? void 0 : a.map((u) => Vt(u))) != null ? l : [Bn].filter((u) => u != null), ir(ot(i.value ? e4[1] : e4[0])), ir(xn(i.value ? e4[2] : e4[1])), ot(i.value ? e4[3] : e4[2])];
  }, ([a, l, u, c]) => {
    if (n(), !a?.length || !l?.length || !u?.length) return;
    const f = _m(c) ? { ...c } : c;
    t.push(...a.flatMap((p) => l.flatMap((v) => u.map((m) => r(p, v, m, f)))));
  }, { flush: "post" }), o = () => {
    s(), n();
  };
  return wr(n), o;
}
function iT() {
  const e4 = Qe(false), t = rn();
  return t && hi(() => {
    e4.value = true;
  }, t), e4;
}
function ma(e4) {
  const t = iT();
  return ke(() => (t.value, !!e4()));
}
function Su(e4, t, n = {}) {
  const { window: r = Bn, ...i } = n;
  let s;
  const o = ma(() => r && "MutationObserver" in r), a = () => {
    s && (s.disconnect(), s = void 0);
  }, l = ke(() => {
    const p = ot(e4), v = ir(p).map(Vt).filter(Cm);
    return new Set(v);
  }), u = ft(l, (p) => {
    a(), o.value && p.size && (s = new MutationObserver(t), p.forEach((v) => s.observe(v, i)));
  }, { immediate: true, flush: "post" }), c = () => s?.takeRecords(), f = () => {
    u(), a();
  };
  return wr(f), { isSupported: o, stop: f, takeRecords: c };
}
function sT(e4, t, n = {}) {
  const { window: r = Bn, document: i = r?.document, flush: s = "sync" } = n;
  if (!r || !i) return bn;
  let o;
  const a = (c) => {
    o?.(), o = c;
  }, l = ac(() => {
    const c = Vt(e4);
    if (c) {
      const { stop: f } = Su(i, (p) => {
        p.map((m) => [...m.removedNodes]).flat().some((m) => m === c || m.contains(c)) && t(p);
      }, { window: r, childList: true, subtree: true });
      a(f);
    }
  }, { flush: s }), u = () => {
    l(), a();
  };
  return wr(u), u;
}
function oT(e4 = {}) {
  var t;
  const { window: n = Bn, deep: r = true, triggerOnRemoval: i = false } = e4, s = (t = e4.document) != null ? t : n?.document, o = () => {
    var u;
    let c = s?.activeElement;
    if (r) for (; c?.shadowRoot; ) c = (u = c?.shadowRoot) == null ? void 0 : u.activeElement;
    return c;
  }, a = Qe(), l = () => {
    a.value = o();
  };
  if (n) {
    const u = { capture: true, passive: true };
    ln(n, "blur", (c) => {
      c.relatedTarget === null && l();
    }, u), ln(n, "focus", l, u);
  }
  return i && sT(a, l, { document: s }), l(), a;
}
const aT = Symbol("vueuse-ssr-width");
function lT() {
  const e4 = tc() ? JA(aT, null) : null;
  return typeof e4 == "number" ? e4 : void 0;
}
function Rm(e4, t = {}) {
  const { window: n = Bn, ssrWidth: r = lT() } = t, i = ma(() => n && "matchMedia" in n && typeof n.matchMedia == "function"), s = Qe(typeof r == "number"), o = Qe(), a = Qe(false), l = (u) => {
    a.value = u.matches;
  };
  return ac(() => {
    if (s.value) {
      s.value = !i.value;
      const u = ot(e4).split(",");
      a.value = u.some((c) => {
        const f = c.includes("not all"), p = c.match(/\(\s*min-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/), v = c.match(/\(\s*max-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/);
        let m = !!(p || v);
        return p && m && (m = r >= Om(p[1])), v && m && (m = r <= Om(v[1])), f ? !m : m;
      });
      return;
    }
    i.value && (o.value = n.matchMedia(ot(e4)), a.value = o.value.matches);
  }), ln(o, "change", l, { passive: true }), ke(() => a.value);
}
function cT(e4) {
  return Rm("(prefers-color-scheme: dark)", e4);
}
function Mm(e4, t, n = {}) {
  const { window: r = Bn, ...i } = n;
  let s;
  const o = ma(() => r && "ResizeObserver" in r), a = () => {
    s && (s.disconnect(), s = void 0);
  }, l = ke(() => {
    const f = ot(e4);
    return Array.isArray(f) ? f.map((p) => Vt(p)) : [Vt(f)];
  }), u = ft(l, (f) => {
    if (a(), o.value && r) {
      s = new ResizeObserver(t);
      for (const p of f) p && s.observe(p, i);
    }
  }, { immediate: true, flush: "post" }), c = () => {
    a(), u();
  };
  return wr(c), { isSupported: o, stop: c };
}
function jm(e4, t = {}) {
  const { reset: n = true, windowResize: r = true, windowScroll: i = true, immediate: s = true, updateTiming: o = "sync" } = t, a = Qe(0), l = Qe(0), u = Qe(0), c = Qe(0), f = Qe(0), p = Qe(0), v = Qe(0), m = Qe(0);
  function y() {
    const E = Vt(e4);
    if (!E) {
      n && (a.value = 0, l.value = 0, u.value = 0, c.value = 0, f.value = 0, p.value = 0, v.value = 0, m.value = 0);
      return;
    }
    const A = E.getBoundingClientRect();
    a.value = A.height, l.value = A.bottom, u.value = A.left, c.value = A.right, f.value = A.top, p.value = A.width, v.value = A.x, m.value = A.y;
  }
  function k() {
    o === "sync" ? y() : o === "next-frame" && requestAnimationFrame(() => y());
  }
  return Mm(e4, k), ft(() => Vt(e4), (E) => !E && k()), Su(e4, k, { attributeFilter: ["style", "class"] }), i && ln("scroll", k, { capture: true, passive: true }), r && ln("resize", k, { passive: true }), wu(() => {
    s && k();
  }), { height: a, bottom: l, left: u, right: c, top: f, width: p, x: v, y: m, update: k };
}
function uT(e4, t = { width: 0, height: 0 }, n = {}) {
  const { window: r = Bn, box: i = "content-box" } = n, s = ke(() => {
    var f, p;
    return (p = (f = Vt(e4)) == null ? void 0 : f.namespaceURI) == null ? void 0 : p.includes("svg");
  }), o = Qe(t.width), a = Qe(t.height), { stop: l } = Mm(e4, ([f]) => {
    const p = i === "border-box" ? f.borderBoxSize : i === "content-box" ? f.contentBoxSize : f.devicePixelContentBoxSize;
    if (r && s.value) {
      const v = Vt(e4);
      if (v) {
        const m = v.getBoundingClientRect();
        o.value = m.width, a.value = m.height;
      }
    } else if (p) {
      const v = ir(p);
      o.value = v.reduce((m, { inlineSize: y }) => m + y, 0), a.value = v.reduce((m, { blockSize: y }) => m + y, 0);
    } else o.value = f.contentRect.width, a.value = f.contentRect.height;
  }, n);
  wu(() => {
    const f = Vt(e4);
    f && (o.value = "offsetWidth" in f ? f.offsetWidth : t.width, a.value = "offsetHeight" in f ? f.offsetHeight : t.height);
  });
  const u = ft(() => Vt(e4), (f) => {
    o.value = f ? t.width : 0, a.value = f ? t.height : 0;
  });
  function c() {
    l(), u();
  }
  return { width: o, height: a, stop: c };
}
function dT(e4, t, n = {}) {
  const { root: r, rootMargin: i = "0px", threshold: s = 0, window: o = Bn, immediate: a = true } = n, l = ma(() => o && "IntersectionObserver" in o), u = ke(() => {
    const m = ot(e4);
    return ir(m).map(Vt).filter(Cm);
  });
  let c = bn;
  const f = Qe(a), p = l.value ? ft(() => [u.value, Vt(r), f.value], ([m, y]) => {
    if (c(), !f.value || !m.length) return;
    const k = new IntersectionObserver(t, { root: Vt(y), rootMargin: i, threshold: s });
    m.forEach((E) => E && k.observe(E)), c = () => {
      k.disconnect(), c = bn;
    };
  }, { immediate: a, flush: "post" }) : bn, v = () => {
    c(), p(), f.value = false;
  };
  return wr(v), { isSupported: l, isActive: f, pause() {
    c(), f.value = false;
  }, resume() {
    f.value = true;
  }, stop: v };
}
const fT = "focusin", hT = "focusout", vT = ":focus-within";
function pT(e4, t = {}) {
  const { window: n = Bn } = t, r = ke(() => Vt(e4)), i = Qe(false), s = ke(() => i.value);
  if (!n || !oT(t).value) return { focused: s };
  const a = { passive: true };
  return ln(r, fT, () => i.value = true, a), ln(r, hT, () => {
    var l, u, c;
    return i.value = (c = (u = (l = r.value) == null ? void 0 : l.matches) == null ? void 0 : u.call(l, vT)) != null ? c : false;
  }, a), { focused: s };
}
function Im(e4, t = {}) {
  const { threshold: n = 50, onSwipe: r, onSwipeEnd: i, onSwipeStart: s, passive: o = true } = t, a = cr({ x: 0, y: 0 }), l = cr({ x: 0, y: 0 }), u = ke(() => a.x - l.x), c = ke(() => a.y - l.y), { max: f, abs: p } = Math, v = ke(() => f(p(u.value), p(c.value)) >= n), m = Qe(false), y = ke(() => v.value ? p(u.value) > p(c.value) ? u.value > 0 ? "left" : "right" : c.value > 0 ? "up" : "down" : "none"), k = (U) => [U.touches[0].clientX, U.touches[0].clientY], E = (U, V) => {
    a.x = U, a.y = V;
  }, A = (U, V) => {
    l.x = U, l.y = V;
  }, C = { passive: o, capture: !o }, x = (U) => {
    m.value && i?.(U, y.value), m.value = false;
  }, F = [ln(e4, "touchstart", (U) => {
    if (U.touches.length !== 1) return;
    const [V, M] = k(U);
    E(V, M), A(V, M), s?.(U);
  }, C), ln(e4, "touchmove", (U) => {
    if (U.touches.length !== 1) return;
    const [V, M] = k(U);
    A(V, M), C.capture && !C.passive && Math.abs(u.value) > Math.abs(c.value) && U.preventDefault(), !m.value && v.value && (m.value = true), m.value && r?.(U);
  }, C), ln(e4, ["touchend", "touchcancel"], x, C)];
  return { isSwiping: m, direction: y, coordsStart: a, coordsEnd: l, lengthX: u, lengthY: c, stop: () => F.forEach((U) => U()), isPassiveEventSupported: true };
}
function mT(e4 = {}) {
  const { window: t = Bn, initialWidth: n = Number.POSITIVE_INFINITY, initialHeight: r = Number.POSITIVE_INFINITY, listenOrientation: i = true, includeScrollbar: s = true, type: o = "inner" } = e4, a = Qe(n), l = Qe(r), u = () => {
    if (t) if (o === "outer") a.value = t.outerWidth, l.value = t.outerHeight;
    else if (o === "visual" && t.visualViewport) {
      const { width: f, height: p, scale: v } = t.visualViewport;
      a.value = Math.round(f * v), l.value = Math.round(p * v);
    } else s ? (a.value = t.innerWidth, l.value = t.innerHeight) : (a.value = t.document.documentElement.clientWidth, l.value = t.document.documentElement.clientHeight);
  };
  u(), wu(u);
  const c = { passive: true };
  if (ln("resize", u, c), t && o === "visual" && t.visualViewport && ln(t.visualViewport, "resize", u, c), i) {
    const f = Rm("(orientation: portrait)");
    ft(f, () => u());
  }
  return { width: a, height: l };
}
var gT = "M13 14H11V9H13M13 18H11V16H13M1 21H23L12 2L1 21Z", yT = "M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z", bT = "M23,12L20.56,9.22L20.9,5.54L17.29,4.72L15.4,1.54L12,3L8.6,1.54L6.71,4.72L3.1,5.53L3.44,9.21L1,12L3.44,14.78L3.1,18.47L6.71,19.29L8.6,22.47L12,21L15.4,22.46L17.29,19.28L20.9,18.46L20.56,14.78L23,12M13,17H11V15H13V17M13,13H11V7H13V13Z", kT = "M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z", wT = "M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z", ST = "M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1", Lm = "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z", ET = "M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z", AT = "M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z", Fm = "M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z", Eu = "M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z", TT = "M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z", NT = "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z", CT = "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z", _T = "M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z", OT = "M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z", PT = "M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z", xT = "M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z", RT = "M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z", MT = "M21,15.61L19.59,17L14.58,12L19.59,7L21,8.39L17.44,12L21,15.61M3,6H16V8H3V6M3,13V11H13V13H3M3,18V16H16V18H3Z", jT = "M12.5,8C9.85,8 7.45,9 5.6,10.6L2,7V16H11L7.38,12.38C8.77,11.22 10.54,10.5 12.5,10.5C16.04,10.5 19.05,12.81 20.1,16L22.47,15.22C21.08,11.03 17.15,8 12.5,8Z";
var Dm = ["input:not([inert])", "select:not([inert])", "textarea:not([inert])", "a[href]:not([inert])", "button:not([inert])", "[tabindex]:not(slot):not([inert])", "audio[controls]:not([inert])", "video[controls]:not([inert])", '[contenteditable]:not([contenteditable="false"]):not([inert])', "details>summary:first-of-type:not([inert])", "details:not([inert])"], ga = Dm.join(","), Bm = typeof Element > "u", Hr = Bm ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector, ya = !Bm && Element.prototype.getRootNode ? function(e4) {
  var t;
  return e4 == null || (t = e4.getRootNode) === null || t === void 0 ? void 0 : t.call(e4);
} : function(e4) {
  return e4?.ownerDocument;
}, ba = function e(t, n) {
  var r;
  n === void 0 && (n = true);
  var i = t == null || (r = t.getAttribute) === null || r === void 0 ? void 0 : r.call(t, "inert"), s = i === "" || i === "true", o = s || n && t && e(t.parentNode);
  return o;
}, IT = function(t) {
  var n, r = t == null || (n = t.getAttribute) === null || n === void 0 ? void 0 : n.call(t, "contenteditable");
  return r === "" || r === "true";
}, zm = function(t, n, r) {
  if (ba(t)) return [];
  var i = Array.prototype.slice.apply(t.querySelectorAll(ga));
  return n && Hr.call(t, ga) && i.unshift(t), i = i.filter(r), i;
}, $m = function e2(t, n, r) {
  for (var i = [], s = Array.from(t); s.length; ) {
    var o = s.shift();
    if (!ba(o, false)) if (o.tagName === "SLOT") {
      var a = o.assignedElements(), l = a.length ? a : o.children, u = e2(l, true, r);
      r.flatten ? i.push.apply(i, u) : i.push({ scopeParent: o, candidates: u });
    } else {
      var c = Hr.call(o, ga);
      c && r.filter(o) && (n || !t.includes(o)) && i.push(o);
      var f = o.shadowRoot || typeof r.getShadowRoot == "function" && r.getShadowRoot(o), p = !ba(f, false) && (!r.shadowRootFilter || r.shadowRootFilter(o));
      if (f && p) {
        var v = e2(f === true ? o.children : f.children, true, r);
        r.flatten ? i.push.apply(i, v) : i.push({ scopeParent: o, candidates: v });
      } else s.unshift.apply(s, o.children);
    }
  }
  return i;
}, Um = function(t) {
  return !isNaN(parseInt(t.getAttribute("tabindex"), 10));
}, qr = function(t) {
  if (!t) throw new Error("No node provided");
  return t.tabIndex < 0 && (/^(AUDIO|VIDEO|DETAILS)$/.test(t.tagName) || IT(t)) && !Um(t) ? 0 : t.tabIndex;
}, LT = function(t, n) {
  var r = qr(t);
  return r < 0 && n && !Um(t) ? 0 : r;
}, FT = function(t, n) {
  return t.tabIndex === n.tabIndex ? t.documentOrder - n.documentOrder : t.tabIndex - n.tabIndex;
}, Vm = function(t) {
  return t.tagName === "INPUT";
}, DT = function(t) {
  return Vm(t) && t.type === "hidden";
}, BT = function(t) {
  var n = t.tagName === "DETAILS" && Array.prototype.slice.apply(t.children).some(function(r) {
    return r.tagName === "SUMMARY";
  });
  return n;
}, zT = function(t, n) {
  for (var r = 0; r < t.length; r++) if (t[r].checked && t[r].form === n) return t[r];
}, $T = function(t) {
  if (!t.name) return true;
  var n = t.form || ya(t), r = function(a) {
    return n.querySelectorAll('input[type="radio"][name="' + a + '"]');
  }, i;
  if (typeof window < "u" && typeof window.CSS < "u" && typeof window.CSS.escape == "function") i = r(window.CSS.escape(t.name));
  else try {
    i = r(t.name);
  } catch (o) {
    return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", o.message), false;
  }
  var s = zT(i, t.form);
  return !s || s === t;
}, UT = function(t) {
  return Vm(t) && t.type === "radio";
}, VT = function(t) {
  return UT(t) && !$T(t);
}, HT = function(t) {
  var n, r = t && ya(t), i = (n = r) === null || n === void 0 ? void 0 : n.host, s = false;
  if (r && r !== t) {
    var o, a, l;
    for (s = !!((o = i) !== null && o !== void 0 && (a = o.ownerDocument) !== null && a !== void 0 && a.contains(i) || t != null && (l = t.ownerDocument) !== null && l !== void 0 && l.contains(t)); !s && i; ) {
      var u, c, f;
      r = ya(i), i = (u = r) === null || u === void 0 ? void 0 : u.host, s = !!((c = i) !== null && c !== void 0 && (f = c.ownerDocument) !== null && f !== void 0 && f.contains(i));
    }
  }
  return s;
}, Hm = function(t) {
  var n = t.getBoundingClientRect(), r = n.width, i = n.height;
  return r === 0 && i === 0;
}, qT = function(t, n) {
  var r = n.displayCheck, i = n.getShadowRoot;
  if (getComputedStyle(t).visibility === "hidden") return true;
  var s = Hr.call(t, "details>summary:first-of-type"), o = s ? t.parentElement : t;
  if (Hr.call(o, "details:not([open]) *")) return true;
  if (!r || r === "full" || r === "legacy-full") {
    if (typeof i == "function") {
      for (var a = t; t; ) {
        var l = t.parentElement, u = ya(t);
        if (l && !l.shadowRoot && i(l) === true) return Hm(t);
        t.assignedSlot ? t = t.assignedSlot : !l && u !== t.ownerDocument ? t = u.host : t = l;
      }
      t = a;
    }
    if (HT(t)) return !t.getClientRects().length;
    if (r !== "legacy-full") return true;
  } else if (r === "non-zero-area") return Hm(t);
  return false;
}, WT = function(t) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(t.tagName)) for (var n = t.parentElement; n; ) {
    if (n.tagName === "FIELDSET" && n.disabled) {
      for (var r = 0; r < n.children.length; r++) {
        var i = n.children.item(r);
        if (i.tagName === "LEGEND") return Hr.call(n, "fieldset[disabled] *") ? true : !i.contains(t);
      }
      return true;
    }
    n = n.parentElement;
  }
  return false;
}, ka = function(t, n) {
  return !(n.disabled || ba(n) || DT(n) || qT(n, t) || BT(n) || WT(n));
}, Au = function(t, n) {
  return !(VT(n) || qr(n) < 0 || !ka(t, n));
}, GT = function(t) {
  var n = parseInt(t.getAttribute("tabindex"), 10);
  return !!(isNaN(n) || n >= 0);
}, ZT = function e3(t) {
  var n = [], r = [];
  return t.forEach(function(i, s) {
    var o = !!i.scopeParent, a = o ? i.scopeParent : i, l = LT(a, o), u = o ? e3(i.candidates) : a;
    l === 0 ? o ? n.push.apply(n, u) : n.push(a) : r.push({ documentOrder: s, tabIndex: l, item: i, isScope: o, content: u });
  }), r.sort(FT).reduce(function(i, s) {
    return s.isScope ? i.push.apply(i, s.content) : i.push(s.content), i;
  }, []).concat(n);
}, KT = function(t, n) {
  n = n || {};
  var r;
  return n.getShadowRoot ? r = $m([t], n.includeContainer, { filter: Au.bind(null, n), flatten: false, getShadowRoot: n.getShadowRoot, shadowRootFilter: GT }) : r = zm(t, n.includeContainer, Au.bind(null, n)), ZT(r);
}, YT = function(t, n) {
  n = n || {};
  var r;
  return n.getShadowRoot ? r = $m([t], n.includeContainer, { filter: ka.bind(null, n), flatten: true, getShadowRoot: n.getShadowRoot }) : r = zm(t, n.includeContainer, ka.bind(null, n)), r;
}, Ci = function(t, n) {
  if (n = n || {}, !t) throw new Error("No node provided");
  return Hr.call(t, ga) === false ? false : Au(n, t);
}, XT = Dm.concat("iframe").join(","), Tu = function(t, n) {
  if (n = n || {}, !t) throw new Error("No node provided");
  return Hr.call(t, XT) === false ? false : ka(n, t);
};
function Nu(e4, t) {
  (t == null || t > e4.length) && (t = e4.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e4[n];
  return r;
}
function JT(e4) {
  if (Array.isArray(e4)) return Nu(e4);
}
function QT(e4, t, n) {
  return (t = i1(t)) in e4 ? Object.defineProperty(e4, t, { value: n, enumerable: true, configurable: true, writable: true }) : e4[t] = n, e4;
}
function e1(e4) {
  if (typeof Symbol < "u" && e4[Symbol.iterator] != null || e4["@@iterator"] != null) return Array.from(e4);
}
function t1() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function qm(e4, t) {
  var n = Object.keys(e4);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e4);
    t && (r = r.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e4, i).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Wm(e4) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? qm(Object(n), true).forEach(function(r) {
      QT(e4, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e4, Object.getOwnPropertyDescriptors(n)) : qm(Object(n)).forEach(function(r) {
      Object.defineProperty(e4, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e4;
}
function n1(e4) {
  return JT(e4) || e1(e4) || s1(e4) || t1();
}
function r1(e4, t) {
  if (typeof e4 != "object" || !e4) return e4;
  var n = e4[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e4, t);
    if (typeof r != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e4);
}
function i1(e4) {
  var t = r1(e4, "string");
  return typeof t == "symbol" ? t : t + "";
}
function s1(e4, t) {
  if (e4) {
    if (typeof e4 == "string") return Nu(e4, t);
    var n = {}.toString.call(e4).slice(8, -1);
    return n === "Object" && e4.constructor && (n = e4.constructor.name), n === "Map" || n === "Set" ? Array.from(e4) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Nu(e4, t) : void 0;
  }
}
var Gm = { activateTrap: function(t, n) {
  if (t.length > 0) {
    var r = t[t.length - 1];
    r !== n && r._setPausedState(true);
  }
  var i = t.indexOf(n);
  i === -1 || t.splice(i, 1), t.push(n);
}, deactivateTrap: function(t, n) {
  var r = t.indexOf(n);
  r !== -1 && t.splice(r, 1), t.length > 0 && !t[t.length - 1]._isManuallyPaused() && t[t.length - 1]._setPausedState(false);
} }, o1 = function(t) {
  return t.tagName && t.tagName.toLowerCase() === "input" && typeof t.select == "function";
}, a1 = function(t) {
  return t?.key === "Escape" || t?.key === "Esc" || t?.keyCode === 27;
}, Us = function(t) {
  return t?.key === "Tab" || t?.keyCode === 9;
}, l1 = function(t) {
  return Us(t) && !t.shiftKey;
}, c1 = function(t) {
  return Us(t) && t.shiftKey;
}, Zm = function(t) {
  return setTimeout(t, 0);
}, Vs = function(t) {
  for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++) r[i - 1] = arguments[i];
  return typeof t == "function" ? t.apply(void 0, r) : t;
}, wa = function(t) {
  return t.target.shadowRoot && typeof t.composedPath == "function" ? t.composedPath()[0] : t.target;
}, u1 = [], Cu = function(t, n) {
  var r = n?.document || document, i = n?.trapStack || u1, s = Wm({ returnFocusOnDeactivate: true, escapeDeactivates: true, delayInitialFocus: true, isKeyForward: l1, isKeyBackward: c1 }, n), o = { containers: [], containerGroups: [], tabbableGroups: [], nodeFocusedBeforeActivation: null, mostRecentlyFocusedNode: null, active: false, paused: false, manuallyPaused: false, delayInitialFocusTimer: void 0, recentNavEvent: void 0 }, a, l = function(O, j, X) {
    return O && O[j] !== void 0 ? O[j] : s[X || j];
  }, u = function(O, j) {
    var X = typeof j?.composedPath == "function" ? j.composedPath() : void 0;
    return o.containerGroups.findIndex(function(re) {
      var G = re.container, se = re.tabbableNodes;
      return G.contains(O) || X?.includes(G) || se.find(function(fe) {
        return fe === O;
      });
    });
  }, c = function(O) {
    var j = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, X = j.hasFallback, re = X === void 0 ? false : X, G = j.params, se = G === void 0 ? [] : G, fe = s[O];
    if (typeof fe == "function" && (fe = fe.apply(void 0, n1(se))), fe === true && (fe = void 0), !fe) {
      if (fe === void 0 || fe === false) return fe;
      throw new Error("`".concat(O, "` was specified but was not a node, or did not return a node"));
    }
    var Me = fe;
    if (typeof fe == "string") {
      try {
        Me = r.querySelector(fe);
      } catch (me) {
        throw new Error("`".concat(O, '` appears to be an invalid selector; error="').concat(me.message, '"'));
      }
      if (!Me && !re) throw new Error("`".concat(O, "` as selector refers to no known node"));
    }
    return Me;
  }, f = function() {
    var O = c("initialFocus", { hasFallback: true });
    if (O === false) return false;
    if (O === void 0 || O && !Tu(O, s.tabbableOptions)) if (u(r.activeElement) >= 0) O = r.activeElement;
    else {
      var j = o.tabbableGroups[0], X = j && j.firstTabbableNode;
      O = X || c("fallbackFocus");
    }
    else O === null && (O = c("fallbackFocus"));
    if (!O) throw new Error("Your focus-trap needs to have at least one focusable element");
    return O;
  }, p = function() {
    if (o.containerGroups = o.containers.map(function(O) {
      var j = KT(O, s.tabbableOptions), X = YT(O, s.tabbableOptions), re = j.length > 0 ? j[0] : void 0, G = j.length > 0 ? j[j.length - 1] : void 0, se = X.find(function(me) {
        return Ci(me);
      }), fe = X.slice().reverse().find(function(me) {
        return Ci(me);
      }), Me = !!j.find(function(me) {
        return qr(me) > 0;
      });
      return { container: O, tabbableNodes: j, focusableNodes: X, posTabIndexesFound: Me, firstTabbableNode: re, lastTabbableNode: G, firstDomTabbableNode: se, lastDomTabbableNode: fe, nextTabbableNode: function(Ge) {
        var Le = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true, Ce = j.indexOf(Ge);
        return Ce < 0 ? Le ? X.slice(X.indexOf(Ge) + 1).find(function(ye) {
          return Ci(ye);
        }) : X.slice(0, X.indexOf(Ge)).reverse().find(function(ye) {
          return Ci(ye);
        }) : j[Ce + (Le ? 1 : -1)];
      } };
    }), o.tabbableGroups = o.containerGroups.filter(function(O) {
      return O.tabbableNodes.length > 0;
    }), o.tabbableGroups.length <= 0 && !c("fallbackFocus")) throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
    if (o.containerGroups.find(function(O) {
      return O.posTabIndexesFound;
    }) && o.containerGroups.length > 1) throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.");
  }, v = function(O) {
    var j = O.activeElement;
    if (j) return j.shadowRoot && j.shadowRoot.activeElement !== null ? v(j.shadowRoot) : j;
  }, m = function(O) {
    if (O !== false && O !== v(document)) {
      if (!O || !O.focus) {
        m(f());
        return;
      }
      O.focus({ preventScroll: !!s.preventScroll }), o.mostRecentlyFocusedNode = O, o1(O) && O.select();
    }
  }, y = function(O) {
    var j = c("setReturnFocus", { params: [O] });
    return j || (j === false ? false : O);
  }, k = function(O) {
    var j = O.target, X = O.event, re = O.isBackward, G = re === void 0 ? false : re;
    j = j || wa(X), p();
    var se = null;
    if (o.tabbableGroups.length > 0) {
      var fe = u(j, X), Me = fe >= 0 ? o.containerGroups[fe] : void 0;
      if (fe < 0) G ? se = o.tabbableGroups[o.tabbableGroups.length - 1].lastTabbableNode : se = o.tabbableGroups[0].firstTabbableNode;
      else if (G) {
        var me = o.tabbableGroups.findIndex(function(D) {
          var te = D.firstTabbableNode;
          return j === te;
        });
        if (me < 0 && (Me.container === j || Tu(j, s.tabbableOptions) && !Ci(j, s.tabbableOptions) && !Me.nextTabbableNode(j, false)) && (me = fe), me >= 0) {
          var Ge = me === 0 ? o.tabbableGroups.length - 1 : me - 1, Le = o.tabbableGroups[Ge];
          se = qr(j) >= 0 ? Le.lastTabbableNode : Le.lastDomTabbableNode;
        } else Us(X) || (se = Me.nextTabbableNode(j, false));
      } else {
        var Ce = o.tabbableGroups.findIndex(function(D) {
          var te = D.lastTabbableNode;
          return j === te;
        });
        if (Ce < 0 && (Me.container === j || Tu(j, s.tabbableOptions) && !Ci(j, s.tabbableOptions) && !Me.nextTabbableNode(j)) && (Ce = fe), Ce >= 0) {
          var ye = Ce === o.tabbableGroups.length - 1 ? 0 : Ce + 1, tt = o.tabbableGroups[ye];
          se = qr(j) >= 0 ? tt.firstTabbableNode : tt.firstDomTabbableNode;
        } else Us(X) || (se = Me.nextTabbableNode(j));
      }
    } else se = c("fallbackFocus");
    return se;
  }, E = function(O) {
    var j = wa(O);
    if (!(u(j, O) >= 0)) {
      if (Vs(s.clickOutsideDeactivates, O)) {
        a.deactivate({ returnFocus: s.returnFocusOnDeactivate });
        return;
      }
      Vs(s.allowOutsideClick, O) || O.preventDefault();
    }
  }, A = function(O) {
    var j = wa(O), X = u(j, O) >= 0;
    if (X || j instanceof Document) X && (o.mostRecentlyFocusedNode = j);
    else {
      O.stopImmediatePropagation();
      var re, G = true;
      if (o.mostRecentlyFocusedNode) if (qr(o.mostRecentlyFocusedNode) > 0) {
        var se = u(o.mostRecentlyFocusedNode), fe = o.containerGroups[se].tabbableNodes;
        if (fe.length > 0) {
          var Me = fe.findIndex(function(me) {
            return me === o.mostRecentlyFocusedNode;
          });
          Me >= 0 && (s.isKeyForward(o.recentNavEvent) ? Me + 1 < fe.length && (re = fe[Me + 1], G = false) : Me - 1 >= 0 && (re = fe[Me - 1], G = false));
        }
      } else o.containerGroups.some(function(me) {
        return me.tabbableNodes.some(function(Ge) {
          return qr(Ge) > 0;
        });
      }) || (G = false);
      else G = false;
      G && (re = k({ target: o.mostRecentlyFocusedNode, isBackward: s.isKeyBackward(o.recentNavEvent) })), m(re || o.mostRecentlyFocusedNode || f());
    }
    o.recentNavEvent = void 0;
  }, C = function(O) {
    var j = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    o.recentNavEvent = O;
    var X = k({ event: O, isBackward: j });
    X && (Us(O) && O.preventDefault(), m(X));
  }, x = function(O) {
    (s.isKeyForward(O) || s.isKeyBackward(O)) && C(O, s.isKeyBackward(O));
  }, F = function(O) {
    a1(O) && Vs(s.escapeDeactivates, O) !== false && (O.preventDefault(), a.deactivate());
  }, Y = function(O) {
    var j = wa(O);
    u(j, O) >= 0 || Vs(s.clickOutsideDeactivates, O) || Vs(s.allowOutsideClick, O) || (O.preventDefault(), O.stopImmediatePropagation());
  }, U = function() {
    if (o.active) return Gm.activateTrap(i, a), o.delayInitialFocusTimer = s.delayInitialFocus ? Zm(function() {
      m(f());
    }) : m(f()), r.addEventListener("focusin", A, true), r.addEventListener("mousedown", E, { capture: true, passive: false }), r.addEventListener("touchstart", E, { capture: true, passive: false }), r.addEventListener("click", Y, { capture: true, passive: false }), r.addEventListener("keydown", x, { capture: true, passive: false }), r.addEventListener("keydown", F), a;
  }, V = function() {
    if (o.active) return r.removeEventListener("focusin", A, true), r.removeEventListener("mousedown", E, true), r.removeEventListener("touchstart", E, true), r.removeEventListener("click", Y, true), r.removeEventListener("keydown", x, true), r.removeEventListener("keydown", F), a;
  }, M = function(O) {
    var j = O.some(function(X) {
      var re = Array.from(X.removedNodes);
      return re.some(function(G) {
        return G === o.mostRecentlyFocusedNode;
      });
    });
    j && m(f());
  }, q = typeof window < "u" && "MutationObserver" in window ? new MutationObserver(M) : void 0, Q = function() {
    q && (q.disconnect(), o.active && !o.paused && o.containers.map(function(O) {
      q.observe(O, { subtree: true, childList: true });
    }));
  };
  return a = { get active() {
    return o.active;
  }, get paused() {
    return o.paused;
  }, activate: function(O) {
    if (o.active) return this;
    var j = l(O, "onActivate"), X = l(O, "onPostActivate"), re = l(O, "checkCanFocusTrap");
    re || p(), o.active = true, o.paused = false, o.nodeFocusedBeforeActivation = v(r), j?.();
    var G = function() {
      re && p(), U(), Q(), X?.();
    };
    return re ? (re(o.containers.concat()).then(G, G), this) : (G(), this);
  }, deactivate: function(O) {
    if (!o.active) return this;
    var j = Wm({ onDeactivate: s.onDeactivate, onPostDeactivate: s.onPostDeactivate, checkCanReturnFocus: s.checkCanReturnFocus }, O);
    clearTimeout(o.delayInitialFocusTimer), o.delayInitialFocusTimer = void 0, V(), o.active = false, o.paused = false, Q(), Gm.deactivateTrap(i, a);
    var X = l(j, "onDeactivate"), re = l(j, "onPostDeactivate"), G = l(j, "checkCanReturnFocus"), se = l(j, "returnFocus", "returnFocusOnDeactivate");
    X?.();
    var fe = function() {
      Zm(function() {
        se && m(y(o.nodeFocusedBeforeActivation)), re?.();
      });
    };
    return se && G ? (G(y(o.nodeFocusedBeforeActivation)).then(fe, fe), this) : (fe(), this);
  }, pause: function(O) {
    return o.active ? (o.manuallyPaused = true, this._setPausedState(true, O)) : this;
  }, unpause: function(O) {
    return o.active ? (o.manuallyPaused = false, i[i.length - 1] !== this ? this : this._setPausedState(false, O)) : this;
  }, updateContainerElements: function(O) {
    var j = [].concat(O).filter(Boolean);
    return o.containers = j.map(function(X) {
      return typeof X == "string" ? r.querySelector(X) : X;
    }), o.active && p(), Q(), this;
  } }, Object.defineProperties(a, { _isManuallyPaused: { value: function() {
    return o.manuallyPaused;
  } }, _setPausedState: { value: function(O, j) {
    if (o.paused === O) return this;
    if (o.paused = O, O) {
      var X = l(j, "onPause"), re = l(j, "onPostPause");
      X?.(), V(), Q(), re?.();
    } else {
      var G = l(j, "onUnpause"), se = l(j, "onPostUnpause");
      G?.(), p(), U(), Q(), se?.();
    }
    return this;
  } } }), a.updateContainerElements(t), a;
};
window._nc_vue_element_id = window._nc_vue_element_id ?? 0;
function _u() {
  return `nc-vue-${window._nc_vue_element_id++}`;
}
function _i() {
  return window._nc_focus_trap ??= [], window._nc_focus_trap;
}
function d1() {
  let e4 = [];
  return { pause() {
    e4 = [..._i()];
    for (const t of e4) t.pause();
  }, unpause() {
    if (e4.length === _i().length) for (const t of e4) t.unpause();
    e4 = [];
  } };
}
const Ou = Nm().detectLanguage().build(), f1 = (...e4) => Ou.ngettext(...e4), Re = (...e4) => Ou.gettext(...e4);
function Sr(...e4) {
  for (const t of e4) if (!t.registered) {
    for (const { l: n, t: r } of t) {
      if (n !== pa() || !r) continue;
      const i = Object.fromEntries(Object.entries(r).map(([s, o]) => [s, { msgid: s, msgid_plural: o.p, msgstr: o.v }]));
      Ou.addTranslations({ translations: { "": i } });
    }
    t.registered = true;
  }
}
const h1 = [{ l: "ar", t: { "{tag} (restricted)": { v: ["{tag} (مقيد)"] }, "Select a tag": { v: ["اختر وسم"] } } }, { l: "ast", t: { "{tag} (restricted)": { v: ["{tag} (restrinxóse)"] }, "Select a tag": { v: ["Seleicionar una etiqueta"] } } }, { l: "br", t: { "{tag} (restricted)": { v: ["{tag} (bevennet)"] }, "Select a tag": { v: ["Choaz ur c'hlav"] } } }, { l: "ca", t: { "{tag} (restricted)": { v: ["{tag} (restringit)"] }, "Select a tag": { v: ["Seleccioneu una etiqueta"] } } }, { l: "cs", t: { "{tag} (restricted)": { v: ["{tag} (omezené)"] }, "Select a tag": { v: ["Vybrat štítek"] } } }, { l: "cs-CZ", t: { "{tag} (restricted)": { v: ["{tag} (omezené)"] }, "Select a tag": { v: ["Vybrat štítek"] } } }, { l: "da", t: { "{tag} (restricted)": { v: ["{tag} (begrænset)"] }, "Select a tag": { v: ["Vælg et mærke"] } } }, { l: "de", t: { "{tag} (restricted)": { v: ["{tag} (eingeschränkt)"] }, "Select a tag": { v: ["Schlagwort auswählen"] } } }, { l: "de-DE", t: { "{tag} (restricted)": { v: ["{tag} (eingeschränkt)"] }, "Select a tag": { v: ["Schlagwort auswählen"] } } }, { l: "el", t: { "{tag} (restricted)": { v: ["{tag} (περιορισμένο)"] }, "Select a tag": { v: ["Επιλογή ετικέτας"] } } }, { l: "en-GB", t: { "{tag} (restricted)": { v: ["{tag} (restricted)"] }, "Select a tag": { v: ["Select a tag"] } } }, { l: "eo", t: { "{tag} (restricted)": { v: ["{tag} (limigita)"] }, "Select a tag": { v: ["Elektu etikedon"] } } }, { l: "es", t: { "{tag} (restricted)": { v: ["{tag} (restringido)"] }, "Select a tag": { v: ["Seleccione una etiqueta"] } } }, { l: "es-AR", t: { "{tag} (restricted)": { v: ["{tag} (restringido)"] }, "Select a tag": { v: ["Elija una etiqueta"] } } }, { l: "es-EC", t: { "{tag} (restricted)": { v: ["{tag} (restricted)"] }, "Select a tag": { v: ["Seleccionar una etiqueta"] } } }, { l: "es-MX", t: { "{tag} (restricted)": { v: ["{tag} (restringido)"] }, "Select a tag": { v: ["Seleccionar una etiqueta"] } } }, { l: "et-EE", t: { "{tag} (restricted)": { v: ["{tag} (piiratud)"] }, "Select a tag": { v: ["Vali silt"] } } }, { l: "eu", t: { "{tag} (restricted)": { v: ["{tag} (mugatua)"] }, "Select a tag": { v: ["Hautatu etiketa bat"] } } }, { l: "fa", t: { "{tag} (restricted)": { v: ["{tag} محدود شده"] }, "Select a tag": { v: ["انتخاب یک برچسب"] } } }, { l: "fi", t: { "{tag} (restricted)": { v: ["{tag} (rajoitettu)"] }, "Select a tag": { v: ["Valitse tunniste"] } } }, { l: "fr", t: { "{tag} (restricted)": { v: ["{tag} (restreint)"] }, "Select a tag": { v: ["Sélectionnez une balise"] } } }, { l: "ga", t: { "{tag} (restricted)": { v: ["{tag} (srianta)"] }, "Select a tag": { v: ["Roghnaigh clib"] } } }, { l: "gl", t: { "{tag} (restricted)": { v: ["{tag} (restrinxido)"] }, "Select a tag": { v: ["Seleccione unha etiqueta"] } } }, { l: "he", t: { "{tag} (restricted)": { v: ["{tag} (מוגבל)"] }, "Select a tag": { v: ["בחירת תגית"] } } }, { l: "hu", t: { "{tag} (restricted)": { v: ["{tag} (korlátozott)"] }, "Select a tag": { v: ["Válasszon címkét"] } } }, { l: "id", t: { "{tag} (restricted)": { v: ["{tag} (dibatasi)"] }, "Select a tag": { v: ["Pilih tag"] } } }, { l: "is", t: { "{tag} (restricted)": { v: ["{tag} (takmarkað)"] }, "Select a tag": { v: ["Veldu merki"] } } }, { l: "it", t: { "{tag} (restricted)": { v: ["{tag} (limitato)"] }, "Select a tag": { v: ["Seleziona un'etichetta"] } } }, { l: "ja", t: { "{tag} (restricted)": { v: ["{tag} (制限付)"] }, "Select a tag": { v: ["タグを選択"] } } }, { l: "ja-JP", t: { "{tag} (restricted)": { v: ["{tag} (制限付)"] }, "Select a tag": { v: ["タグを選択"] } } }, { l: "ko", t: { "{tag} (restricted)": { v: ["{tag}(제한)"] }, "Select a tag": { v: ["태그 선택"] } } }, { l: "lt-LT", t: { "{tag} (restricted)": { v: ["{tag} (apribota)"] }, "Select a tag": { v: ["Pasirinkti žymę"] } } }, { l: "lv", t: { "{tag} (restricted)": { v: ["{tag} (ierobežots)"] }, "Select a tag": { v: ["Izvēlēties birku"] } } }, { l: "mk", t: { "{tag} (restricted)": { v: ["{tag} (ограничено)"] }, "Select a tag": { v: ["Избери ознака"] } } }, { l: "my", t: { "{tag} (restricted)": { v: ["{tag} (ကန့်သတ်)"] }, "Select a tag": { v: ["tag ရွေးချယ်ရန်"] } } }, { l: "nb", t: { "{tag} (restricted)": { v: ["{tag} (beskyttet)"] }, "Select a tag": { v: ["Velg en merkelapp"] } } }, { l: "nl", t: { "{tag} (restricted)": { v: ["{tag} (beperkt)"] }, "Select a tag": { v: ["Selecteer een label"] } } }, { l: "oc", t: { "{tag} (restricted)": { v: ["{tag} (limit)"] }, "Select a tag": { v: ["Seleccionar una etiqueta"] } } }, { l: "pl", t: { "{tag} (restricted)": { v: ["{tag} (ograniczona)"] }, "Select a tag": { v: ["Wybierz etykietę"] } } }, { l: "pt-BR", t: { "{tag} (restricted)": { v: ["{tag} (restrito)"] }, "Select a tag": { v: ["Selecione uma etiqueta"] } } }, { l: "pt-PT", t: { "{tag} (restricted)": { v: ["{tag} (restrito)"] }, "Select a tag": { v: ["Selecionar uma etiqueta"] } } }, { l: "ro", t: { "{tag} (restricted)": { v: ["{tag} (restricționat)"] }, "Select a tag": { v: ["Selectați o etichetă"] } } }, { l: "ru", t: { "{tag} (restricted)": { v: ["{tag} (ограниченное)"] }, "Select a tag": { v: ["Выберите метку"] } } }, { l: "sk", t: { "{tag} (restricted)": { v: ["{tag} (obmedzený)"] }, "Select a tag": { v: ["Vybrať štítok"] } } }, { l: "sl", t: { "{tag} (restricted)": { v: ["{tag} (omejeno)"] }, "Select a tag": { v: ["Izbor oznake"] } } }, { l: "sr", t: { "{tag} (restricted)": { v: ["{tag} (ограничено)"] }, "Select a tag": { v: ["Изаберите ознаку"] } } }, { l: "sv", t: { "{tag} (restricted)": { v: ["{tag} (begränsad)"] }, "Select a tag": { v: ["Välj en tag"] } } }, { l: "tr", t: { "{tag} (restricted)": { v: ["{tag} (kısıtlanmış)"] }, "Select a tag": { v: ["Bir etiket seçin"] } } }, { l: "uk", t: { "{tag} (restricted)": { v: ["{tag} (обмежений)"] }, "Select a tag": { v: ["Виберіть позначку"] } } }, { l: "uz", t: { "{tag} (restricted)": { v: ["{tag} (cheklangan)"] }, "Select a tag": { v: ["Teg tanlang"] } } }, { l: "zh-CN", t: { "{tag} (restricted)": { v: ["{tag} （受限）"] }, "Select a tag": { v: ["选择一个标签"] } } }, { l: "zh-HK", t: { "{tag} (restricted)": { v: ["{tag} (受限)"] }, "Select a tag": { v: ["選擇標籤"] } } }, { l: "zh-TW", t: { "{tag} (restricted)": { v: ["{tag}（受限）"] }, "Select a tag": { v: ["選擇標籤"] } } }], v1 = [{ l: "ar", t: { "a few seconds ago": { v: ["منذ عدة ثوانٍ"] }, "sec. ago": { v: ["ثانية مضت"] }, "seconds ago": { v: ["ثوانٍ مضت"] } } }, { l: "ast", t: { "a few seconds ago": { v: ["hai unos segundos"] }, "sec. ago": { v: ["hai segs"] }, "seconds ago": { v: ["hai segundos"] } } }, { l: "br", t: {} }, { l: "ca", t: {} }, { l: "cs", t: { "a few seconds ago": { v: ["před několika sekundami"] }, "sec. ago": { v: ["sek. před"] }, "seconds ago": { v: ["sekund předtím"] } } }, { l: "cs-CZ", t: { "a few seconds ago": { v: ["před několika sekundami"] }, "sec. ago": { v: ["sek. před"] }, "seconds ago": { v: ["sekund předtím"] } } }, { l: "da", t: { "a few seconds ago": { v: ["et par sekunder siden"] }, "sec. ago": { v: ["sek. siden"] }, "seconds ago": { v: ["sekunder siden"] } } }, { l: "de", t: { "a few seconds ago": { v: ["vor ein paar Sekunden"] }, "sec. ago": { v: ["Sek. zuvor"] }, "seconds ago": { v: ["Sekunden zuvor"] } } }, { l: "de-DE", t: { "a few seconds ago": { v: ["vor ein paar Sekunden"] }, "sec. ago": { v: ["Sek. zuvor"] }, "seconds ago": { v: ["Sekunden zuvor"] } } }, { l: "el", t: { "a few seconds ago": { v: ["πριν λίγα δευτερόλεπτα"] }, "sec. ago": { v: ["δευτ. πριν"] }, "seconds ago": { v: ["δευτερόλεπτα πριν"] } } }, { l: "en-GB", t: { "a few seconds ago": { v: ["a few seconds ago"] }, "sec. ago": { v: ["sec. ago"] }, "seconds ago": { v: ["seconds ago"] } } }, { l: "eo", t: {} }, { l: "es", t: { "a few seconds ago": { v: ["hace unos pocos segundos"] }, "sec. ago": { v: ["hace segundos"] }, "seconds ago": { v: ["segundos atrás"] } } }, { l: "es-AR", t: { "a few seconds ago": { v: ["hace unos segundos"] }, "sec. ago": { v: ["seg. atrás"] }, "seconds ago": { v: ["segundos atrás"] } } }, { l: "es-EC", t: { "a few seconds ago": { v: ["hace unos segundos"] }, "sec. ago": { v: ["hace segundos"] }, "seconds ago": { v: ["Segundos atrás"] } } }, { l: "es-MX", t: { "a few seconds ago": { v: ["hace unos segundos"] }, "sec. ago": { v: ["seg. atrás"] }, "seconds ago": { v: ["segundos atrás"] } } }, { l: "et-EE", t: { "a few seconds ago": { v: ["mõni sekund tagasi"] }, "sec. ago": { v: ["sek. tagasi"] }, "seconds ago": { v: ["sekundit tagasi"] } } }, { l: "eu", t: { "a few seconds ago": { v: ["duela segundo batzuk"] }, "sec. ago": { v: ["duela seg."] }, "seconds ago": { v: ["duela segundo"] } } }, { l: "fa", t: { "a few seconds ago": { v: ["چند ثانیه پیش"] }, "sec. ago": { v: ["چند ثانیه پیش"] }, "seconds ago": { v: ["چند ثانیه پیش"] } } }, { l: "fi", t: { "a few seconds ago": { v: ["muutamia sekunteja sitten"] }, "sec. ago": { v: ["sek. sitten"] }, "seconds ago": { v: ["sekunteja sitten"] } } }, { l: "fr", t: { "a few seconds ago": { v: ["il y a quelques instants"] }, "sec. ago": { v: ["il y a qq. sec."] }, "seconds ago": { v: ["il y a quelques secondes"] } } }, { l: "ga", t: { "a few seconds ago": { v: ["cúpla soicind ó shin"] }, "sec. ago": { v: ["soic. ó shin"] }, "seconds ago": { v: ["soicind ó shin"] } } }, { l: "gl", t: { "a few seconds ago": { v: ["hai uns segundos"] }, "sec. ago": { v: ["segs. atrás"] }, "seconds ago": { v: ["segundos atrás"] } } }, { l: "he", t: { "a few seconds ago": { v: ["לפני מספר שניות"] }, "sec. ago": { v: ["לפני מספר שניות"] }, "seconds ago": { v: ["לפני מס׳ שניות"] } } }, { l: "hu", t: {} }, { l: "id", t: { "a few seconds ago": { v: ["beberapa detik yang lalu"] }, "sec. ago": { v: ["dtk. yang lalu"] }, "seconds ago": { v: ["beberapa detik lalu"] } } }, { l: "is", t: { "a few seconds ago": { v: ["fyrir örfáum sekúndum síðan"] }, "sec. ago": { v: ["sek. síðan"] }, "seconds ago": { v: ["sekúndum síðan"] } } }, { l: "it", t: { "a few seconds ago": { v: ["pochi secondi fa"] }, "sec. ago": { v: ["sec. fa"] }, "seconds ago": { v: ["secondi fa"] } } }, { l: "ja", t: { "a few seconds ago": { v: ["数秒前"] }, "sec. ago": { v: ["秒前"] }, "seconds ago": { v: ["数秒前"] } } }, { l: "ja-JP", t: { "a few seconds ago": { v: ["数秒前"] }, "sec. ago": { v: ["秒前"] }, "seconds ago": { v: ["数秒前"] } } }, { l: "ko", t: { "a few seconds ago": { v: ["방금 전"] }, "sec. ago": { v: ["몇 초 전"] }, "seconds ago": { v: ["초 전"] } } }, { l: "lt-LT", t: {} }, { l: "lv", t: {} }, { l: "mk", t: {} }, { l: "my", t: {} }, { l: "nb", t: { "a few seconds ago": { v: ["noen få sekunder siden"] }, "sec. ago": { v: ["sek. siden"] }, "seconds ago": { v: ["sekunder siden"] } } }, { l: "nl", t: { "a few seconds ago": { v: ["enkele seconden geleden"] }, "sec. ago": { v: ["sec. geleden"] }, "seconds ago": { v: ["seconden geleden"] } } }, { l: "oc", t: {} }, { l: "pl", t: { "a few seconds ago": { v: ["kilka sekund temu"] }, "sec. ago": { v: ["sek. temu"] }, "seconds ago": { v: ["sekund temu"] } } }, { l: "pt-BR", t: { "a few seconds ago": { v: ["há alguns segundos"] }, "sec. ago": { v: ["seg. atrás"] }, "seconds ago": { v: ["segundos atrás"] } } }, { l: "pt-PT", t: { "a few seconds ago": { v: ["há alguns segundos"] }, "sec. ago": { v: ["seg. atrás"] }, "seconds ago": { v: ["segundos atrás"] } } }, { l: "ro", t: { "a few seconds ago": { v: ["acum câteva secunde"] }, "sec. ago": { v: ["sec. în urmă"] }, "seconds ago": { v: ["secunde în urmă"] } } }, { l: "ru", t: { "a few seconds ago": { v: ["несколько секунд назад"] }, "sec. ago": { v: ["сек. назад"] }, "seconds ago": { v: ["секунд назад"] } } }, { l: "sk", t: { "a few seconds ago": { v: ["pred chvíľou"] }, "sec. ago": { v: ["pred pár sekundami"] }, "seconds ago": { v: ["pred sekundami"] } } }, { l: "sl", t: {} }, { l: "sr", t: { "a few seconds ago": { v: ["пре неколико секунди"] }, "sec. ago": { v: ["сек. раније"] }, "seconds ago": { v: ["секунди раније"] } } }, { l: "sv", t: { "a few seconds ago": { v: ["några sekunder sedan"] }, "sec. ago": { v: ["sek. sedan"] }, "seconds ago": { v: ["sekunder sedan"] } } }, { l: "tr", t: { "a few seconds ago": { v: ["birkaç saniye önce"] }, "sec. ago": { v: ["sn. önce"] }, "seconds ago": { v: ["saniye önce"] } } }, { l: "uk", t: { "a few seconds ago": { v: ["декілька секунд тому"] }, "sec. ago": { v: ["с тому"] }, "seconds ago": { v: ["с тому"] } } }, { l: "uz", t: { "a few seconds ago": { v: ["bir necha soniya oldin"] }, "sec. ago": { v: ["sek. oldin"] }, "seconds ago": { v: ["soniyalar oldin"] } } }, { l: "zh-CN", t: { "a few seconds ago": { v: ["几秒前"] }, "sec. ago": { v: ["几秒前"] }, "seconds ago": { v: ["几秒前"] } } }, { l: "zh-HK", t: { "a few seconds ago": { v: ["幾秒前"] }, "sec. ago": { v: ["秒前"] }, "seconds ago": { v: ["秒前"] } } }, { l: "zh-TW", t: { "a few seconds ago": { v: ["幾秒前"] }, "sec. ago": { v: ["秒前"] }, "seconds ago": { v: ["秒前"] } } }], p1 = [{ l: "ar", t: { Acapulco: { v: ["بازلائي مطفي"] }, "Blue Violet": { v: ["بنفسجي مشعشع"] }, "Boston Blue": { v: ["سماوي مطفي"] }, Deluge: { v: ["بنفسجي مطفي"] }, Feldspar: { v: ["وردي صخري"] }, Gold: { v: ["ذهبي"] }, Mariner: { v: ["أزرق بحري"] }, "Nextcloud blue": { v: ["أزرق نكست كلاود"] }, Olivine: { v: ["زيتي"] }, Purple: { v: ["بنفسجي"] }, "Rosy brown": { v: ["بُنِّي زهري"] }, Whiskey: { v: ["نبيذي"] } } }, { l: "ast", t: { Acapulco: { v: ["Acapulcu"] }, "Blue Violet": { v: ["Viola azulao"] }, "Boston Blue": { v: ["Azul Boston"] }, Deluge: { v: ["Deluge"] }, Feldspar: { v: ["Feldspar"] }, Gold: { v: ["Oru"] }, Mariner: { v: ["Marineru"] }, "Nextcloud blue": { v: ["Nextcloud azul"] }, Olivine: { v: ["Olivina"] }, Purple: { v: ["Moráu"] }, "Rosy brown": { v: ["Marrón arrosao"] }, Whiskey: { v: ["Whiskey"] } } }, { l: "br", t: {} }, { l: "ca", t: {} }, { l: "cs", t: { Acapulco: { v: ["Akapulko"] }, "Blue Violet": { v: ["Modrofialová"] }, "Boston Blue": { v: ["Bostonská modrá"] }, Deluge: { v: ["Deluge"] }, Feldspar: { v: ["Živicová"] }, Gold: { v: ["Zlatá"] }, Mariner: { v: ["Námořnická"] }, "Nextcloud blue": { v: ["Nextcloud modrá"] }, Olivine: { v: ["Olivínová"] }, Purple: { v: ["Fialová"] }, "Rosy brown": { v: ["Růžovohnědá"] }, Whiskey: { v: ["Whisky"] } } }, { l: "cs-CZ", t: { Acapulco: { v: ["Akapulko"] }, "Blue Violet": { v: ["Modrofialová"] }, "Boston Blue": { v: ["Bostonská modrá"] }, Deluge: { v: ["Deluge"] }, Feldspar: { v: ["Živicová"] }, Gold: { v: ["Zlatá"] }, Mariner: { v: ["Námořnická"] }, "Nextcloud blue": { v: ["Nextcloud modrá"] }, Olivine: { v: ["Olivínová"] }, Purple: { v: ["Fialová"] }, "Rosy brown": { v: ["Růžovohnědá"] }, Whiskey: { v: ["Whisky"] } } }, { l: "da", t: { Acapulco: { v: ["Acapulco"] }, "Blue Violet": { v: ["Blue Violet"] }, "Boston Blue": { v: ["Boston Blue"] }, Deluge: { v: ["Deluge"] }, Feldspar: { v: ["Feldspar"] }, Gold: { v: ["Guld"] }, Mariner: { v: ["Mariner"] }, "Nextcloud blue": { v: ["Nextcloud blue"] }, Olivine: { v: ["Olivine"] }, Purple: { v: ["Lilla"] }, "Rosy brown": { v: ["Rosy brown"] }, Whiskey: { v: ["Whiskey"] } } }, { l: "de", t: { Acapulco: { v: ["Acapulco"] }, "Blue Violet": { v: ["Blau Violett"] }, "Boston Blue": { v: ["Boston-Blau"] }, Deluge: { v: ["Sintflut"] }, Feldspar: { v: ["Feldspat"] }, Gold: { v: ["Gold"] }, Mariner: { v: ["Seemann"] }, "Nextcloud blue": { v: ["Nextcloud Blau"] }, Olivine: { v: ["Olivin"] }, Purple: { v: ["Lila"] }, "Rosy brown": { v: ["Rosiges Braun"] }, Whiskey: { v: ["Whiskey"] } } }, { l: "de-DE", t: { Acapulco: { v: ["Acapulco"] }, "Blue Violet": { v: ["Blau Violett"] }, "Boston Blue": { v: ["Boston-Blau"] }, Deluge: { v: ["Sintflut"] }, Feldspar: { v: ["Feldspat"] }, Gold: { v: ["Gold"] }, Mariner: { v: ["Seemann"] }, "Nextcloud blue": { v: ["Nextcloud Blau"] }, Olivine: { v: ["Olivin"] }, Purple: { v: ["Lila"] }, "Rosy brown": { v: ["Rosiges Braun"] }, Whiskey: { v: ["Whiskey"] } } }, { l: "el", t: { Acapulco: { v: ["Ακαπούλκο"] }, "Blue Violet": { v: ["Μπλε Βιολέτ"] }, "Boston Blue": { v: ["Μπλε Βοστώνης"] }, Deluge: { v: ["Deluge"] }, Feldspar: { v: ["Feldspar"] }, Gold: { v: ["Χρυσό"] }, Mariner: { v: ["Mariner"] }, "Nextcloud blue": { v: ["Μπλε Nextcloud"] }, Olivine: { v: ["Olivine"] }, Purple: { v: ["Μωβ"] }, "Rosy brown": { v: ["Ροζ καφέ"] }, Whiskey: { v: ["Ουίσκι"] } } }, { l: "en-GB", t: { Acapulco: { v: ["Acapulco"] }, "Blue Violet": { v: ["Blue Violet"] }, "Boston Blue": { v: ["Boston Blue"] }, Deluge: { v: ["Deluge"] }, Feldspar: { v: ["Feldspar"] }, Gold: { v: ["Gold"] }, Mariner: { v: ["Mariner"] }, "Nextcloud blue": { v: ["Nextcloud blue"] }, Olivine: { v: ["Olivine"] }, Purple: { v: ["Purple"] }, "Rosy brown": { v: ["Rosy brown"] }, Whiskey: { v: ["Whiskey"] } } }, { l: "eo", t: {} }, { l: "es", t: { Acapulco: { v: ["Acapulco"] }, "Blue Violet": { v: ["Violeta Azul"] }, "Boston Blue": { v: ["Azul Boston"] }, Deluge: { v: ["Diluvio"] }, Feldspar: { v: ["Feldespato"] }, Gold: { v: ["Oro"] }, Mariner: { v: ["Marinero"] }, "Nextcloud blue": { v: ["Azul Nextcloud"] }, Olivine: { v: ["Olivino"] }, Purple: { v: ["Púrpura"] }, "Rosy brown": { v: ["Marrón rosáceo"] }, Whiskey: { v: ["Whiskey"] } } }, { l: "es-AR", t: { Acapulco: { v: ["Acapulco"] }, "Blue Violet": { v: ["Violeta Azul"] }, "Boston Blue": { v: ["Azul Boston"] }, Deluge: { v: ["Diluvio"] }, Feldspar: { v: ["Feldespato"] }, Gold: { v: ["Oro"] }, Mariner: { v: ["Marinero"] }, "Nextcloud blue": { v: ["Azul Nextcloud"] }, Olivine: { v: ["Olivino"] }, Purple: { v: ["Púrpura"] }, "Rosy brown": { v: ["Marrón rosáceo"] }, Whiskey: { v: ["Whiskey"] } } }, { l: "es-EC", t: {} }, { l: "es-MX", t: { Acapulco: { v: ["Acapulco"] }, "Blue Violet": { v: ["Violeta Azul"] }, "Boston Blue": { v: ["Azul Boston"] }, Deluge: { v: ["Diluvio"] }, Feldspar: { v: ["Feldespato"] }, Gold: { v: ["Oro"] }, Mariner: { v: ["Marinero"] }, "Nextcloud blue": { v: ["Azul Nextcloud"] }, Olivine: { v: ["Olivino"] }, Purple: { v: ["Púrpura"] }, "Rosy brown": { v: ["Marrón rosáceo"] }, Whiskey: { v: ["Whiskey"] } } }, { l: "et-EE", t: { Acapulco: { v: ["Acapulco meresinine"] }, "Blue Violet": { v: ["Sinakasvioletne"] }, "Boston Blue": { v: ["Bostoni rohekassinine"] }, Deluge: { v: ["Tulvavee lilla"] }, Feldspar: { v: ["Põlevkivipruun"] }, Gold: { v: ["Kuldne"] }, Mariner: { v: ["Meresinine"] }, "Nextcloud blue": { v: ["Nextcloudi sinine"] }, Olivine: { v: ["Oliiviroheline"] }, Purple: { v: ["Purpurpunane"] }, "Rosy brown": { v: ["Roosikarva pruun"] }, Whiskey: { v: ["Viskikarva kollakaspruun"] } } }, { l: "eu", t: {} }, { l: "fa", t: { Acapulco: { v: ["آکاپولکو"] }, "Blue Violet": { v: ["بنفش آبی"] }, "Boston Blue": { v: ["آبی بوستونی"] }, Deluge: { v: ["سیل"] }, Feldspar: { v: ["فلدسپات"] }, Gold: { v: ["طلا"] }, Mariner: { v: ["مارینر"] }, "Nextcloud blue": { v: ["نکس کلود آبی"] }, Olivine: { v: ["الیوین"] }, Purple: { v: ["بنفش"] }, "Rosy brown": { v: ["قهوه‌ای رز"] }, Whiskey: { v: ["ویسکی"] } } }, { l: "fi", t: { Acapulco: { v: ["Acapulco"] }, "Blue Violet": { v: ["Sinivioletti"] }, "Boston Blue": { v: ["Bostoninsininen"] }, Deluge: { v: ["Tulva"] }, Feldspar: { v: ["Feldspar"] }, Gold: { v: ["Kulta"] }, Mariner: { v: ["Merenkulkija"] }, "Nextcloud blue": { v: ["Nextcloudin sininen"] }, Olivine: { v: ["Oliviini"] }, Purple: { v: ["Purppura"] }, "Rosy brown": { v: ["Ruusunruskea"] }, Whiskey: { v: ["Viski"] } } }, { l: "fr", t: { Acapulco: { v: ["Acapulco"] }, "Blue Violet": { v: ["Bleu violet"] }, "Boston Blue": { v: ["Bleu de Boston"] }, Deluge: { v: ["Deluge"] }, Feldspar: { v: ["Feldspar"] }, Gold: { v: ["Doré"] }, Mariner: { v: ["Bleu marine"] }, "Nextcloud blue": { v: ["Bleu Nextcloud"] }, Olivine: { v: ["Olivine"] }, Purple: { v: ["Violet"] }, "Rosy brown": { v: ["Brun rosé"] }, Whiskey: { v: ["Whiskey"] } } }, { l: "ga", t: { Acapulco: { v: ["Acapulco"] }, "Blue Violet": { v: ["Gorm Violet"] }, "Boston Blue": { v: ["Bostún Gorm"] }, Deluge: { v: ["Díle"] }, Feldspar: { v: ["Feldspar"] }, Gold: { v: ["Óir"] }, Mariner: { v: ["Mairnéalach"] }, "Nextcloud blue": { v: ["Nextcloud gorm"] }, Olivine: { v: ["Olaivín"] }, Purple: { v: ["Corcra"] }, "Rosy brown": { v: ["Rosach donn"] }, Whiskey: { v: ["Fuisce"] } } }, { l: "gl", t: { Acapulco: { v: ["Acapulco"] }, "Blue Violet": { v: ["Azul violeta"] }, "Boston Blue": { v: ["Azul Boston"] }, Deluge: { v: ["Diluvio"] }, Feldspar: { v: ["Feldespato"] }, Gold: { v: ["Ouro"] }, Mariner: { v: ["Marino"] }, "Nextcloud blue": { v: ["Nextcloud azul"] }, Olivine: { v: ["Olivina"] }, Purple: { v: ["Púrpura"] }, "Rosy brown": { v: ["Pardo rosado"] }, Whiskey: { v: ["Whisky"] } } }, { l: "he", t: {} }, { l: "hu", t: {} }, { l: "id", t: { Gold: { v: ["Emas"] }, "Nextcloud blue": { v: ["Biru Nextcloud"] }, Purple: { v: ["Ungu"] } } }, { l: "is", t: { Acapulco: { v: ["Acapulco"] }, "Blue Violet": { v: ["Bláklukka"] }, "Boston Blue": { v: ["Bostonblátt"] }, Deluge: { v: ["Fjólublátt"] }, Feldspar: { v: ["Feldspat"] }, Gold: { v: ["Gull"] }, Mariner: { v: ["Sjóarablátt"] }, "Nextcloud blue": { v: ["Nextcloud blátt"] }, Olivine: { v: ["Ólivín"] }, Purple: { v: ["Purpurablátt"] }, "Rosy brown": { v: ["Rósabrúnt"] }, Whiskey: { v: ["Viský"] } } }, { l: "it", t: { Gold: { v: ["Oro"] }, "Nextcloud blue": { v: ["Nextcloud blue"] }, Purple: { v: ["Viola"] } } }, { l: "ja", t: { Acapulco: { v: ["アカプルコ"] }, "Blue Violet": { v: ["ブルーバイオレット"] }, "Boston Blue": { v: ["ボストンブルー"] }, Deluge: { v: ["豪雨"] }, Feldspar: { v: ["長石"] }, Gold: { v: ["黄金"] }, Mariner: { v: ["船乗り"] }, "Nextcloud blue": { v: ["ネクストクラウド・ブルー"] }, Olivine: { v: ["カンラン石"] }, Purple: { v: ["紫色"] }, "Rosy brown": { v: ["バラ色"] }, Whiskey: { v: ["ウイスキー"] } } }, { l: "ja-JP", t: { Acapulco: { v: ["アカプルコ"] }, "Blue Violet": { v: ["ブルーバイオレット"] }, "Boston Blue": { v: ["ボストンブルー"] }, Deluge: { v: ["豪雨"] }, Feldspar: { v: ["長石"] }, Gold: { v: ["黄金"] }, Mariner: { v: ["船乗り"] }, "Nextcloud blue": { v: ["ネクストクラウド・ブルー"] }, Olivine: { v: ["カンラン石"] }, Purple: { v: ["紫色"] }, "Rosy brown": { v: ["バラ色"] }, Whiskey: { v: ["ウイスキー"] } } }, { l: "ko", t: { Acapulco: { v: ["아카풀코"] }, "Blue Violet": { v: ["푸른 보라"] }, "Boston Blue": { v: ["보스턴 블루"] }, Deluge: { v: ["폭우"] }, Feldspar: { v: ["장석"] }, Gold: { v: ["금"] }, Mariner: { v: ["뱃사람"] }, "Nextcloud blue": { v: ["Nextcloud 파랑"] }, Olivine: { v: ["감람석"] }, Purple: { v: ["보라"] }, "Rosy brown": { v: ["로지 브라운"] }, Whiskey: { v: ["위스키"] } } }, { l: "lt-LT", t: {} }, { l: "lv", t: {} }, { l: "mk", t: {} }, { l: "my", t: {} }, { l: "nb", t: { Acapulco: { v: ["Acapulco"] }, "Blue Violet": { v: ["Blå fiolett"] }, "Boston Blue": { v: ["Boston blå"] }, Deluge: { v: ["Syndflod"] }, Feldspar: { v: ["Feltspat"] }, Gold: { v: ["Gull"] }, Mariner: { v: ["Mariner"] }, "Nextcloud blue": { v: ["Nextcloud-blå"] }, Olivine: { v: ["Olivin"] }, Purple: { v: ["Lilla"] }, "Rosy brown": { v: ["Rosenrød brun"] }, Whiskey: { v: ["Whiskey"] } } }, { l: "nl", t: { Acapulco: { v: ["Acapulco"] }, "Blue Violet": { v: ["Blauw Paars"] }, "Boston Blue": { v: ["Boston Blauw"] }, Deluge: { v: ["Overlopen"] }, Feldspar: { v: ["Veldspaat"] }, Gold: { v: ["Goud"] }, Mariner: { v: ["Marineblauw"] }, "Nextcloud blue": { v: ["Nextcloud blauw"] }, Olivine: { v: ["Olivijn"] }, Purple: { v: ["Paars"] }, "Rosy brown": { v: ["Rozig bruin"] }, Whiskey: { v: ["Whiskey"] } } }, { l: "oc", t: {} }, { l: "pl", t: { Acapulco: { v: ["Acapulco"] }, "Blue Violet": { v: ["Niebieski fiolet"] }, "Boston Blue": { v: ["Błękit Bostonu"] }, Deluge: { v: ["Potop"] }, Feldspar: { v: ["Skaleń"] }, Gold: { v: ["Złote"] }, Mariner: { v: ["Marynarz"] }, "Nextcloud blue": { v: ["Niebieskie Nextcloud"] }, Olivine: { v: ["Oliwin"] }, Purple: { v: ["Fioletowy"] }, "Rosy brown": { v: ["Różowy brąz"] }, Whiskey: { v: ["Whisky"] } } }, { l: "pt-BR", t: { Acapulco: { v: ["Acapulco"] }, "Blue Violet": { v: ["Violeta Azul"] }, "Boston Blue": { v: ["Azul Boston"] }, Deluge: { v: ["Deluge"] }, Feldspar: { v: ["Feldspato"] }, Gold: { v: ["Ouro"] }, Mariner: { v: ["Marinheiro"] }, "Nextcloud blue": { v: ["Azul Nextcloud"] }, Olivine: { v: ["Olivina"] }, Purple: { v: ["Roxo"] }, "Rosy brown": { v: ["Castanho rosado"] }, Whiskey: { v: ["Uísque"] } } }, { l: "pt-PT", t: { Acapulco: { v: ["Acapulco"] }, "Blue Violet": { v: ["Azul violeta"] }, "Boston Blue": { v: ["Azul Boston"] }, Deluge: { v: ["Deluge"] }, Feldspar: { v: ["Feldspar"] }, Gold: { v: ["Ouro"] }, Mariner: { v: ["Mariner"] }, "Nextcloud blue": { v: ["Nextcloud azul"] }, Olivine: { v: ["Olivine"] }, Purple: { v: ["Púrpura"] }, "Rosy brown": { v: ["Castanho rosado"] }, Whiskey: { v: ["Whiskey"] } } }, { l: "ro", t: { Gold: { v: ["Aur"] }, "Nextcloud blue": { v: ["Nextcloud albastru"] }, Purple: { v: ["Purpuriu"] } } }, { l: "ru", t: { Acapulco: { v: ["Акапулько"] }, "Blue Violet": { v: ["Синий фиолет"] }, "Boston Blue": { v: ["Синий Бостон"] }, Deluge: { v: ["Перламутрово-фиолетовый"] }, Feldspar: { v: ["Античная латунь"] }, Gold: { v: ["Золотой"] }, Mariner: { v: ["Морской"] }, "Nextcloud blue": { v: ["Nextcloud голубой"] }, Olivine: { v: [" Оливковый"] }, Purple: { v: ["Фиолетовый"] }, "Rosy brown": { v: ["Розово-коричневый"] }, Whiskey: { v: ["Виски"] } } }, { l: "sk", t: { Acapulco: { v: ["Acapulco"] }, "Blue Violet": { v: ["Modro fialová"] }, "Boston Blue": { v: ["Bostonská modrá"] }, Deluge: { v: ["Deluge"] }, Feldspar: { v: ["Živec"] }, Gold: { v: ["Zlatá"] }, Mariner: { v: ["Námorník"] }, "Nextcloud blue": { v: ["Nextcloud modrá"] }, Olivine: { v: ["Olivová"] }, Purple: { v: ["Fialová"] }, "Rosy brown": { v: ["Ružovo hnedá"] }, Whiskey: { v: ["Whisky"] } } }, { l: "sl", t: {} }, { l: "sr", t: { Acapulco: { v: ["Акапулко"] }, "Blue Violet": { v: ["Плаво љубичаста"] }, "Boston Blue": { v: ["Бостон плава"] }, Deluge: { v: ["Поплава"] }, Feldspar: { v: ["Фелдспар"] }, Gold: { v: ["Злато"] }, Mariner: { v: ["Морнар"] }, "Nextcloud blue": { v: ["Nextcloud плава"] }, Olivine: { v: ["Маслинаста"] }, Purple: { v: ["Пурпурна"] }, "Rosy brown": { v: ["Роси браон"] }, Whiskey: { v: ["Виски"] } } }, { l: "sv", t: { Acapulco: { v: ["Acapulco"] }, "Blue Violet": { v: ["Blåviolett"] }, "Boston Blue": { v: ["Bostonblå"] }, Deluge: { v: ["Skyfallsblå"] }, Feldspar: { v: ["Feldspat"] }, Gold: { v: ["Guld"] }, Mariner: { v: ["Marinblå"] }, "Nextcloud blue": { v: ["Nextcloud-blå"] }, Olivine: { v: ["Olivin"] }, Purple: { v: ["Lila"] }, "Rosy brown": { v: ["Rosabrun"] }, Whiskey: { v: ["Whisky"] } } }, { l: "tr", t: { Acapulco: { v: ["Akapulko"] }, "Blue Violet": { v: ["Mavi mor"] }, "Boston Blue": { v: ["Boston mavisi"] }, Deluge: { v: ["Sel"] }, Feldspar: { v: ["Feldispat"] }, Gold: { v: ["Altın"] }, Mariner: { v: ["Denizci"] }, "Nextcloud blue": { v: ["Nextcloud mavi"] }, Olivine: { v: ["Zeytinlik"] }, Purple: { v: ["Mor"] }, "Rosy brown": { v: ["Kırmızımsı kahverengi"] }, Whiskey: { v: ["Viski"] } } }, { l: "uk", t: { Acapulco: { v: ["Акапулько"] }, "Blue Violet": { v: ["Блакитна фіалка"] }, "Boston Blue": { v: ["Бостонський синій"] }, Deluge: { v: ["Злива"] }, Feldspar: { v: ["Польові шпати"] }, Gold: { v: ["Золотий"] }, Mariner: { v: ["Морський"] }, "Nextcloud blue": { v: ["Блакитний Nextcloud"] }, Olivine: { v: ["Олива"] }, Purple: { v: ["Фіолетовий"] }, "Rosy brown": { v: ["Темно-рожевий"] }, Whiskey: { v: ["Кола"] } } }, { l: "uz", t: { Acapulco: { v: ["Akapulko"] }, "Blue Violet": { v: ["Moviy binafsha"] }, "Boston Blue": { v: ["Boston ko'k"] }, Deluge: { v: ["To'fon"] }, Feldspar: { v: ["Feldspar"] }, Gold: { v: ["Oltin"] }, Mariner: { v: ["Dengizchi"] }, "Nextcloud blue": { v: ["Ko'k Nextcloud "] }, Olivine: { v: ["Olivine"] }, Purple: { v: ["Binafsha"] }, "Rosy brown": { v: ["Qizil jigarrang"] }, Whiskey: { v: ["Whiskey"] } } }, { l: "zh-CN", t: { Acapulco: { v: ["Acapulco"] }, "Blue Violet": { v: ["瓦罗兰特蓝"] }, "Boston Blue": { v: ["波士顿蓝"] }, Deluge: { v: ["洪水色"] }, Feldspar: { v: ["长石"] }, Gold: { v: ["金色"] }, Mariner: { v: ["水手"] }, "Nextcloud blue": { v: ["Nextcloud 蓝"] }, Olivine: { v: ["橄榄石色"] }, Purple: { v: ["紫色"] }, "Rosy brown": { v: ["玫瑰棕色"] }, Whiskey: { v: ["威士忌"] } } }, { l: "zh-HK", t: { Acapulco: { v: ["阿卡普爾科"] }, "Blue Violet": { v: ["藍紫色"] }, "Boston Blue": { v: ["波士頓藍"] }, Deluge: { v: ["大洪水"] }, Feldspar: { v: ["長石"] }, Gold: { v: ["Gold"] }, Mariner: { v: ["海軍藍"] }, "Nextcloud blue": { v: ["Nextcloud 藍色"] }, Olivine: { v: ["橄欖石色"] }, Purple: { v: ["紫色"] }, "Rosy brown": { v: ["玫瑰棕色"] }, Whiskey: { v: ["威士忌"] } } }, { l: "zh-TW", t: { Acapulco: { v: ["Acapulco"] }, "Blue Violet": { v: ["藍紫色"] }, "Boston Blue": { v: ["波士頓藍"] }, Deluge: { v: ["Deluge"] }, Feldspar: { v: ["長石"] }, Gold: { v: ["金色"] }, Mariner: { v: ["海軍藍"] }, "Nextcloud blue": { v: ["Nextcloud 藍色"] }, Olivine: { v: ["橄欖石色"] }, Purple: { v: ["紫色"] }, "Rosy brown": { v: ["玫瑰棕色"] }, Whiskey: { v: ["威士忌"] } } }], m1 = [{ l: "ar", t: { Actions: { v: ["إجراءات"] } } }, { l: "ast", t: { Actions: { v: ["Aiciones"] } } }, { l: "br", t: { Actions: { v: ["Oberioù"] } } }, { l: "ca", t: { Actions: { v: ["Accions"] } } }, { l: "cs", t: { Actions: { v: ["Akce"] } } }, { l: "cs-CZ", t: { Actions: { v: ["Akce"] } } }, { l: "da", t: { Actions: { v: ["Handlinger"] } } }, { l: "de", t: { Actions: { v: ["Aktionen"] } } }, { l: "de-DE", t: { Actions: { v: ["Aktionen"] } } }, { l: "el", t: { Actions: { v: ["Ενέργειες"] } } }, { l: "en-GB", t: { Actions: { v: ["Actions"] } } }, { l: "eo", t: { Actions: { v: ["Agoj"] } } }, { l: "es", t: { Actions: { v: ["Acciones"] } } }, { l: "es-AR", t: { Actions: { v: ["Acciones"] } } }, { l: "es-EC", t: { Actions: { v: ["Acciones"] } } }, { l: "es-MX", t: { Actions: { v: ["Acciones"] } } }, { l: "et-EE", t: { Actions: { v: ["Tegevus"] } } }, { l: "eu", t: { Actions: { v: ["Ekintzak"] } } }, { l: "fa", t: { Actions: { v: ["کنش‌ها"] } } }, { l: "fi", t: { Actions: { v: ["Toiminnot"] } } }, { l: "fr", t: { Actions: { v: ["Actions"] } } }, { l: "ga", t: { Actions: { v: ["Gníomhartha"] } } }, { l: "gl", t: { Actions: { v: ["Accións"] } } }, { l: "he", t: { Actions: { v: ["פעולות"] } } }, { l: "hu", t: { Actions: { v: ["Műveletek"] } } }, { l: "id", t: { Actions: { v: ["Tindakan"] } } }, { l: "is", t: { Actions: { v: ["Aðgerðir"] } } }, { l: "it", t: { Actions: { v: ["Azioni"] } } }, { l: "ja", t: { Actions: { v: ["操作"] } } }, { l: "ja-JP", t: { Actions: { v: ["操作"] } } }, { l: "ko", t: { Actions: { v: ["동작"] } } }, { l: "lt-LT", t: { Actions: { v: ["Veiksmai"] } } }, { l: "lv", t: {} }, { l: "mk", t: { Actions: { v: ["Акции"] } } }, { l: "my", t: { Actions: { v: ["လုပ်ဆောင်ချက်များ"] } } }, { l: "nb", t: { Actions: { v: ["Handlinger"] } } }, { l: "nl", t: { Actions: { v: ["Acties"] } } }, { l: "oc", t: { Actions: { v: ["Accions"] } } }, { l: "pl", t: { Actions: { v: ["Działania"] } } }, { l: "pt-BR", t: { Actions: { v: ["Ações"] } } }, { l: "pt-PT", t: { Actions: { v: ["Ações"] } } }, { l: "ro", t: { Actions: { v: ["Acțiuni"] } } }, { l: "ru", t: { Actions: { v: ["Действия "] } } }, { l: "sk", t: { Actions: { v: ["Akcie"] } } }, { l: "sl", t: { Actions: { v: ["Dejanja"] } } }, { l: "sr", t: { Actions: { v: ["Радње"] } } }, { l: "sv", t: { Actions: { v: ["Åtgärder"] } } }, { l: "tr", t: { Actions: { v: ["İşlemler"] } } }, { l: "uk", t: { Actions: { v: ["Дії"] } } }, { l: "uz", t: { Actions: { v: ["Harakatlar"] } } }, { l: "zh-CN", t: { Actions: { v: ["行为"] } } }, { l: "zh-HK", t: { Actions: { v: ["動作"] } } }, { l: "zh-TW", t: { Actions: { v: ["動作"] } } }], g1 = [{ l: "ar", t: { Activities: { v: ["سجل الأنشطة"] }, "Animals & Nature": { v: ["الحيوانات والطبيعة"] }, Custom: { v: ["مُخصَّص"] }, "Dark skin tone": { v: ["أسمر البُشرة"] }, "Emoji picker": { v: ["لاقط الإيموجي"] }, Flags: { v: ["الأعلام"] }, "Food & Drink": { v: ["الطعام والشراب"] }, "Frequently used": { v: ["شائعة الاستعمال"] }, "Light skin tone": { v: ["فاتح البُشرة"] }, "Medium dark skin tone": { v: ["بشرة متوسطة الاسمرار"] }, "Medium light skin tone": { v: ["بشرة متوسطة البياض"] }, "Medium skin tone": { v: ["بشرة وسطية اللون"] }, "Neutral skin color": { v: ["لون بُشرة طبيعي"] }, Objects: { v: ["أشياء"] }, "People & Body": { v: ["أشخاص و أجسام"] }, "Pick an emoji": { v: ["إختَر رمز إيموجي emoji"] }, "Search emoji": { v: ["البحث عن إيموجي emoji"] }, "Search results": { v: ["نتائج البحث"] }, Selected: { v: ["محدّدة"] }, "Skin tone": { v: ["لون البُشرة"] }, "Smileys & Emotion": { v: ["وجوهٌ ضاحكة و مشاعر"] }, Symbols: { v: ["رموز"] }, "Travel & Places": { v: ["سفر و أماكن"] } } }, { l: "ast", t: { Activities: { v: ["Actividaes"] }, "Animals & Nature": { v: ["Animales y natura"] }, Custom: { v: ["Personalizar"] }, "Dark skin tone": { v: ["Tonu d'aspeutu escuru"] }, "Emoji picker": { v: ["Selector de fustaxes"] }, Flags: { v: ["Banderes"] }, "Food & Drink": { v: ["Cómida y bébora"] }, "Frequently used": { v: ["D'usu frecuente"] }, "Light skin tone": { v: ["Tonu d'aspeutu claru"] }, "Medium dark skin tone": { v: ["Tonu d'aspeutu medio escuru"] }, "Medium light skin tone": { v: ["Tonu d'aspeutu medio claru"] }, "Medium skin tone": { v: ["Tonu d'aspeutu mediu"] }, "Neutral skin color": { v: ["Color d'aspeutu neutral"] }, Objects: { v: ["Oxetos"] }, "People & Body": { v: ["Persones y cuerpu"] }, "Pick an emoji": { v: ["Escueyi un fustaxe"] }, "Search emoji": { v: ["Buscar nos fustaxes"] }, "Search results": { v: ["Resultaos de la busca"] }, Selected: { v: ["Na seleición"] }, "Skin tone": { v: ["Tonu d'aspeutu"] }, "Smileys & Emotion": { v: ["Sorrises y emociones"] }, Symbols: { v: ["Símbolos"] }, "Travel & Places": { v: ["Viaxes y llugares"] } } }, { l: "br", t: { Activities: { v: ["Oberiantizoù"] }, "Animals & Nature": { v: ["Loened & Natur"] }, Custom: { v: ["Personelañ"] }, Flags: { v: ["Bannieloù"] }, "Food & Drink": { v: ["Boued & Evajoù"] }, "Frequently used": { v: ["Implijet alies"] }, Objects: { v: ["Traoù"] }, "People & Body": { v: ["Tud & Korf"] }, "Pick an emoji": { v: ["Choaz un emoji"] }, "Search results": { v: ["Disoc'hoù an enklask"] }, "Smileys & Emotion": { v: ["Smileyioù & Fromoù"] }, Symbols: { v: ["Arouezioù"] }, "Travel & Places": { v: ["Beaj & Lec'hioù"] } } }, { l: "ca", t: { Activities: { v: ["Activitats"] }, "Animals & Nature": { v: ["Animals i natura"] }, Custom: { v: ["Personalitzat"] }, Flags: { v: ["Marques"] }, "Food & Drink": { v: ["Menjar i begudes"] }, "Frequently used": { v: ["Utilitzats recentment"] }, Objects: { v: ["Objectes"] }, "People & Body": { v: ["Persones i cos"] }, "Pick an emoji": { v: ["Trieu un emoji"] }, "Search results": { v: ["Resultats de cerca"] }, "Smileys & Emotion": { v: ["Cares i emocions"] }, Symbols: { v: ["Símbols"] }, "Travel & Places": { v: ["Viatges i llocs"] } } }, { l: "cs", t: { Activities: { v: ["Aktivity"] }, "Animals & Nature": { v: ["Zvířata a příroda"] }, Custom: { v: ["Uživatelsky určené"] }, "Dark skin tone": { v: ["Tmavý tělový tón"] }, "Emoji picker": { v: ["Výběr emotikon"] }, Flags: { v: ["Příznaky"] }, "Food & Drink": { v: ["Jídlo a pití"] }, "Frequently used": { v: ["Často používané"] }, "Light skin tone": { v: ["Světlý tělový tón"] }, "Medium dark skin tone": { v: ["Středně tmavý tělový tón"] }, "Medium light skin tone": { v: ["Středně světlý tělový tón"] }, "Medium skin tone": { v: ["Střední tělový tón"] }, "Neutral skin color": { v: ["Neutřální tělová barva"] }, Objects: { v: ["Objekty"] }, "People & Body": { v: ["Lidé a tělo"] }, "Pick an emoji": { v: ["Vybrat emoji"] }, "Search emoji": { v: ["Hledat emoji"] }, "Search results": { v: ["Výsledky hledání"] }, Selected: { v: ["Vybráno"] }, "Skin tone": { v: ["Tělový tón"] }, "Smileys & Emotion": { v: ["Úsměvy a emoce"] }, Symbols: { v: ["Symboly"] }, "Travel & Places": { v: ["Cestování a místa"] } } }, { l: "cs-CZ", t: { Activities: { v: ["Aktivity"] }, "Animals & Nature": { v: ["Zvířata a příroda"] }, Custom: { v: ["Uživatelsky určené"] }, "Dark skin tone": { v: ["Tmavý tělový tón"] }, "Emoji picker": { v: ["Výběr emotikon"] }, Flags: { v: ["Příznaky"] }, "Food & Drink": { v: ["Jídlo a pití"] }, "Frequently used": { v: ["Často používané"] }, "Light skin tone": { v: ["Světlý tělový tón"] }, "Medium dark skin tone": { v: ["Středně tmavý tělový tón"] }, "Medium light skin tone": { v: ["Středně světlý tělový tón"] }, "Medium skin tone": { v: ["Střední tělový tón"] }, "Neutral skin color": { v: ["Neutřální tělová barva"] }, Objects: { v: ["Objekty"] }, "People & Body": { v: ["Lidé a tělo"] }, "Pick an emoji": { v: ["Vybrat emoji"] }, "Search emoji": { v: ["Hledat emoji"] }, "Search results": { v: ["Výsledky hledání"] }, Selected: { v: ["Vybráno"] }, "Skin tone": { v: ["Tělový tón"] }, "Smileys & Emotion": { v: ["Úsměvy a emoce"] }, Symbols: { v: ["Symboly"] }, "Travel & Places": { v: ["Cestování a místa"] } } }, { l: "da", t: { Activities: { v: ["Aktiviteter"] }, "Animals & Nature": { v: ["Dyr & Natur"] }, Custom: { v: ["Brugerdefineret"] }, "Dark skin tone": { v: ["Mørk skin tone"] }, "Emoji picker": { v: ["Emoji vælger"] }, Flags: { v: ["Flag"] }, "Food & Drink": { v: ["Mad & Drikke"] }, "Frequently used": { v: ["Ofte brugt"] }, "Light skin tone": { v: ["Lys skin tone"] }, "Medium dark skin tone": { v: ["Medium mørk skin tone"] }, "Medium light skin tone": { v: ["Medium lys skin tone"] }, "Medium skin tone": { v: ["Medium skin tone"] }, "Neutral skin color": { v: ["Neutral skin color"] }, Objects: { v: ["Objekter"] }, "People & Body": { v: ["Mennesker & Menneskekroppen"] }, "Pick an emoji": { v: ["Vælg en emoji"] }, "Search emoji": { v: ["Søg emoji"] }, "Search results": { v: ["Søgeresultater"] }, Selected: { v: ["Valgt"] }, "Skin tone": { v: ["Skin tone"] }, "Smileys & Emotion": { v: ["Smileys & Emotion"] }, Symbols: { v: ["Symboler"] }, "Travel & Places": { v: ["Rejser & Rejsemål"] } } }, { l: "de", t: { Activities: { v: ["Aktivitäten"] }, "Animals & Nature": { v: ["Tiere & Natur"] }, Custom: { v: ["Benutzerdefiniert"] }, "Dark skin tone": { v: ["Dunkler Hautfarbton"] }, "Emoji picker": { v: ["Emoji-Auswahl"] }, Flags: { v: ["Flaggen"] }, "Food & Drink": { v: ["Essen & Trinken"] }, "Frequently used": { v: ["Häufig verwendet"] }, "Light skin tone": { v: ["Heller Hautfarbton"] }, "Medium dark skin tone": { v: ["Mitteldunkler Hautfarbton"] }, "Medium light skin tone": { v: ["Mittelheller Hautfarbton"] }, "Medium skin tone": { v: ["Mittlerer Hautfarbton"] }, "Neutral skin color": { v: ["Neutraler Hautfarbton"] }, Objects: { v: ["Objekte"] }, "People & Body": { v: ["Menschen & Körper"] }, "Pick an emoji": { v: ["Ein Emoji auswählen"] }, "Search emoji": { v: ["Emoji suchen"] }, "Search results": { v: ["Suchergebnisse"] }, Selected: { v: ["Ausgewählt"] }, "Skin tone": { v: ["Hautfarbton"] }, "Smileys & Emotion": { v: ["Smileys & Emotionen"] }, Symbols: { v: ["Symbole"] }, "Travel & Places": { v: ["Reisen & Orte"] } } }, { l: "de-DE", t: { Activities: { v: ["Aktivitäten"] }, "Animals & Nature": { v: ["Tiere & Natur"] }, Custom: { v: ["Benutzerdefiniert"] }, "Dark skin tone": { v: ["Dunkler Hautfarbton"] }, "Emoji picker": { v: ["Emoji-Auswahl"] }, Flags: { v: ["Flaggen"] }, "Food & Drink": { v: ["Essen & Trinken"] }, "Frequently used": { v: ["Häufig verwendet"] }, "Light skin tone": { v: ["Heller Hautfarbton"] }, "Medium dark skin tone": { v: ["Mitteldunkler Hautfarbton"] }, "Medium light skin tone": { v: ["Mittelheller Hautfarbton"] }, "Medium skin tone": { v: ["Mittlerer Hautfarbton"] }, "Neutral skin color": { v: ["Neutraler Hautfarbton"] }, Objects: { v: ["Objekte"] }, "People & Body": { v: ["Menschen & Körper"] }, "Pick an emoji": { v: ["Ein Emoji auswählen"] }, "Search emoji": { v: ["Emoji suchen"] }, "Search results": { v: ["Suchergebnisse"] }, Selected: { v: ["Ausgewählt"] }, "Skin tone": { v: ["Hautfarbton"] }, "Smileys & Emotion": { v: ["Smileys & Emotionen"] }, Symbols: { v: ["Symbole"] }, "Travel & Places": { v: ["Reisen & Orte"] } } }, { l: "el", t: { Activities: { v: ["Δραστηριότητες"] }, "Animals & Nature": { v: ["Ζώα & Φύση"] }, Custom: { v: ["Προσαρμογή"] }, "Dark skin tone": { v: ["Σκούρο θέμα"] }, "Emoji picker": { v: ["Επιλογέας emoji"] }, Flags: { v: ["Σημαίες"] }, "Food & Drink": { v: ["Φαγητό & Ποτό"] }, "Frequently used": { v: ["Συχνά χρησιμοποιούμενο"] }, "Light skin tone": { v: ["Ανοιχτό θέμα"] }, "Medium dark skin tone": { v: ["Μέτριο σκούρο θέμα"] }, "Medium light skin tone": { v: ["Μέτριο ανοιχτό θέμα"] }, "Medium skin tone": { v: ["Μέτριος τόνος θέματος"] }, "Neutral skin color": { v: ["Ουδέτερο χρώμα θέματος"] }, Objects: { v: ["Αντικείμενα"] }, "People & Body": { v: ["Άνθρωποι & Σώμα"] }, "Pick an emoji": { v: ["Επιλέξτε ένα emoji"] }, "Search emoji": { v: ["Αναζήτηση emoji"] }, "Search results": { v: ["Αποτελέσματα αναζήτησης"] }, Selected: { v: ["Επιλεγμένο"] }, "Skin tone": { v: ["Τόνος δέρματος"] }, "Smileys & Emotion": { v: ["Φατσούλες & Συναίσθημα"] }, Symbols: { v: ["Σύμβολα"] }, "Travel & Places": { v: ["Ταξίδια & Τοποθεσίες"] } } }, { l: "en-GB", t: { Activities: { v: ["Activities"] }, "Animals & Nature": { v: ["Animals & Nature"] }, Custom: { v: ["Custom"] }, "Dark skin tone": { v: ["Dark skin tone"] }, "Emoji picker": { v: ["Emoji picker"] }, Flags: { v: ["Flags"] }, "Food & Drink": { v: ["Food & Drink"] }, "Frequently used": { v: ["Frequently used"] }, "Light skin tone": { v: ["Light skin tone"] }, "Medium dark skin tone": { v: ["Medium dark skin tone"] }, "Medium light skin tone": { v: ["Medium light skin tone"] }, "Medium skin tone": { v: ["Medium skin tone"] }, "Neutral skin color": { v: ["Neutral skin colour"] }, Objects: { v: ["Objects"] }, "People & Body": { v: ["People & Body"] }, "Pick an emoji": { v: ["Pick an emoji"] }, "Search emoji": { v: ["Search emoji"] }, "Search results": { v: ["Search results"] }, Selected: { v: ["Selected"] }, "Skin tone": { v: ["Skin tone"] }, "Smileys & Emotion": { v: ["Smileys & Emotion"] }, Symbols: { v: ["Symbols"] }, "Travel & Places": { v: ["Travel & Places"] } } }, { l: "eo", t: { Activities: { v: ["Aktiveco"] }, "Animals & Nature": { v: ["Bestoj & Naturo"] }, Custom: { v: ["Propra"] }, Flags: { v: ["Flagoj"] }, "Food & Drink": { v: ["Manĝaĵo & Trinkaĵo"] }, "Frequently used": { v: ["Ofte uzataj"] }, Objects: { v: ["Objektoj"] }, "People & Body": { v: ["Homoj & Korpo"] }, "Pick an emoji": { v: ["Elekti emoĝion "] }, "Search results": { v: ["Serĉrezultoj"] }, "Smileys & Emotion": { v: ["Ridoj kaj Emocioj"] }, Symbols: { v: ["Signoj"] }, "Travel & Places": { v: ["Vojaĵoj & Lokoj"] } } }, { l: "es", t: { Activities: { v: ["Actividades"] }, "Animals & Nature": { v: ["Animales y naturaleza"] }, Custom: { v: ["Personalizado"] }, "Dark skin tone": { v: ["Tono de piel obscuro"] }, "Emoji picker": { v: ["Selector de emojis"] }, Flags: { v: ["Banderas"] }, "Food & Drink": { v: ["Comida y bebida"] }, "Frequently used": { v: ["Usado con frecuencia"] }, "Light skin tone": { v: ["Tono de piel claro"] }, "Medium dark skin tone": { v: ["Tono de piel medio oscuro"] }, "Medium light skin tone": { v: ["Tono de piel medio claro"] }, "Medium skin tone": { v: ["Tono de piel medio"] }, "Neutral skin color": { v: ["Color de piel neutral"] }, Objects: { v: ["Objetos"] }, "People & Body": { v: ["Personas y Cuerpo"] }, "Pick an emoji": { v: ["Elegir un emoji"] }, "Search emoji": { v: ["Buscar emoji"] }, "Search results": { v: ["Resultados de la búsqueda"] }, Selected: { v: ["Seleccionado"] }, "Skin tone": { v: ["Tono de piel"] }, "Smileys & Emotion": { v: ["Smileys y emoticonos"] }, Symbols: { v: ["Símbolos"] }, "Travel & Places": { v: ["Viajes y lugares"] } } }, { l: "es-AR", t: { Activities: { v: ["Actividades"] }, "Animals & Nature": { v: ["Animales y Naturaleza"] }, Custom: { v: ["Personalizado"] }, "Dark skin tone": { v: ["Tono de piel oscuro"] }, "Emoji picker": { v: ["Selector de emojis"] }, Flags: { v: ["Marcas"] }, "Food & Drink": { v: ["Comida y Bebida"] }, "Frequently used": { v: ["Usados frecuentemente"] }, "Light skin tone": { v: ["Tono de piel claro"] }, "Medium dark skin tone": { v: ["Tono de piel medio oscuro"] }, "Medium light skin tone": { v: ["Tono de piel medio claro"] }, "Medium skin tone": { v: ["Tono de piel medio"] }, "Neutral skin color": { v: ["Color de piel neutral"] }, Objects: { v: ["Objetos"] }, "People & Body": { v: ["Personas y Cuerpo"] }, "Pick an emoji": { v: ["Elija un emoji"] }, "Search emoji": { v: ["Buscar emoji"] }, "Search results": { v: ["Resultados de la búsqueda"] }, Selected: { v: ["Seleccionado"] }, "Skin tone": { v: ["Tono de piel"] }, "Smileys & Emotion": { v: ["Caritas y Emociones"] }, Symbols: { v: ["Símbolos"] }, "Travel & Places": { v: ["Viajes y Lugares"] } } }, { l: "es-EC", t: { Activities: { v: ["Actividades"] }, "Animals & Nature": { v: ["Animales y Naturaleza"] }, Custom: { v: ["Personalizado"] }, Flags: { v: ["Marcas"] }, "Food & Drink": { v: ["Comida y Bebida"] }, "Frequently used": { v: ["Frecuentemente utilizado"] }, Objects: { v: ["Objetos"] }, "People & Body": { v: ["Personas y Cuerpo"] }, "Pick an emoji": { v: ["Seleccionar un emoji"] }, "Search emoji": { v: ["Buscar emoji"] }, "Search results": { v: ["Resultados de búsqueda"] }, "Smileys & Emotion": { v: ["Caritas y Emociones"] }, Symbols: { v: ["Símbolos"] }, "Travel & Places": { v: ["Viajes y Lugares"] } } }, { l: "es-MX", t: { Activities: { v: ["Actividades"] }, "Animals & Nature": { v: ["Animales y naturaleza"] }, Custom: { v: ["Personalizado"] }, "Dark skin tone": { v: ["Tono de piel oscuro"] }, "Emoji picker": { v: ["Selector de emojis"] }, Flags: { v: ["Banderas"] }, "Food & Drink": { v: ["Comida y Bebida"] }, "Frequently used": { v: ["Usado frecuentemente"] }, "Light skin tone": { v: ["Tono de piel claro"] }, "Medium dark skin tone": { v: ["Tono de piel medio oscuro"] }, "Medium light skin tone": { v: ["Tono de piel medio claro"] }, "Medium skin tone": { v: ["Tono de piel medio"] }, "Neutral skin color": { v: ["Color de piel neutral"] }, Objects: { v: ["Objetos"] }, "People & Body": { v: ["Personas y cuerpos"] }, "Pick an emoji": { v: ["Seleccionar un emoji"] }, "Search emoji": { v: ["Buscar emoji"] }, "Search results": { v: ["Resultados de la búsqueda"] }, Selected: { v: ["Seleccionado"] }, "Skin tone": { v: ["Tono de piel"] }, "Smileys & Emotion": { v: ["Caritas y Emociones"] }, Symbols: { v: ["Símbolos"] }, "Travel & Places": { v: ["Viajes y lugares"] } } }, { l: "et-EE", t: { Activities: { v: ["Tegevused"] }, "Animals & Nature": { v: ["Loomad ja loodus"] }, Custom: { v: ["Kohanda"] }, "Dark skin tone": { v: ["Kesta tume toon"] }, "Emoji picker": { v: ["Emojide valija"] }, Flags: { v: ["Lipud"] }, "Food & Drink": { v: ["Söök ja jook"] }, "Frequently used": { v: ["Sageli kasutatud"] }, "Light skin tone": { v: ["Kesta hele toon"] }, "Medium dark skin tone": { v: ["Kesta keskmiselt tume toon"] }, "Medium light skin tone": { v: ["Kesta keskmiselt hele toon"] }, "Medium skin tone": { v: ["Kesta keskmine toon"] }, "Neutral skin color": { v: ["Kesta neutraalne toon"] }, Objects: { v: ["Objektid"] }, "People & Body": { v: ["Inimesed ja keha"] }, "Pick an emoji": { v: ["Vali emoji"] }, "Search emoji": { v: ["Otsi emojit"] }, "Search results": { v: ["Otsi tulemustest"] }, Selected: { v: ["Valitud"] }, "Skin tone": { v: ["Kesta toon"] }, "Smileys & Emotion": { v: ["Smailid ja emotsioonid"] }, Symbols: { v: ["Sümbolid"] }, "Travel & Places": { v: ["Reisimine ja kohad"] } } }, { l: "eu", t: { Activities: { v: ["Jarduerak"] }, "Animals & Nature": { v: ["Animaliak eta Natura"] }, Custom: { v: ["Pertsonalizatua"] }, Flags: { v: ["Banderak"] }, "Food & Drink": { v: ["Janaria eta edariak"] }, "Frequently used": { v: ["Askotan erabilia"] }, Objects: { v: ["Objektuak"] }, "People & Body": { v: ["Jendea eta gorputza"] }, "Pick an emoji": { v: ["Hautatu emoji bat"] }, "Search emoji": { v: ["Bilatu emojiak"] }, "Search results": { v: ["Bilaketa emaitzak"] }, Selected: { v: ["Hautatuta"] }, "Smileys & Emotion": { v: ["Smileyak eta emozioa"] }, Symbols: { v: ["Sinboloak"] }, "Travel & Places": { v: ["Bidaiak eta lekuak"] } } }, { l: "fa", t: { Activities: { v: ["فعالیت‌ها"] }, "Animals & Nature": { v: ["حیوانات و طبیعت"] }, Custom: { v: ["سفارشی"] }, "Dark skin tone": { v: ["رنگ پوسته تیره"] }, "Emoji picker": { v: ["انتخاب‌گر شکلک"] }, Flags: { v: ["پرچم‌ها"] }, "Food & Drink": { v: ["غذا و نوشیدنی"] }, "Frequently used": { v: ["پرکاربرد"] }, "Light skin tone": { v: ["رنگ پوسته روشن"] }, "Medium dark skin tone": { v: ["رنگ پوسته تیره متوسط"] }, "Medium light skin tone": { v: ["رنگ پوسته روشن متوسط"] }, "Medium skin tone": { v: ["رنگ پوسته متوسط"] }, "Neutral skin color": { v: ["رنگ پوسته خنثی"] }, Objects: { v: ["اشیاء"] }, "People & Body": { v: ["مردم و بدن"] }, "Pick an emoji": { v: ["انتخاب شکلک"] }, "Search emoji": { v: ["جستجوی شکلک"] }, "Search results": { v: ["نتایج جستجو"] }, Selected: { v: ["انتخاب شده"] }, "Skin tone": { v: ["رنگ پوسته"] }, "Smileys & Emotion": { v: ["شکلک‌ها و احساسات"] }, Symbols: { v: ["نمادها"] }, "Travel & Places": { v: ["سفر و مکان‌ها"] } } }, { l: "fi", t: { Activities: { v: ["Aktiviteetit"] }, "Animals & Nature": { v: ["Eläimet & luonto"] }, Custom: { v: ["Mukautettu"] }, "Dark skin tone": { v: ["Tumma ihonväri"] }, "Emoji picker": { v: ["Emojivalitsin"] }, Flags: { v: ["Liput"] }, "Food & Drink": { v: ["Ruoka & juoma"] }, "Frequently used": { v: ["Usein käytetyt"] }, "Light skin tone": { v: ["Vaalea ihonväri"] }, "Medium dark skin tone": { v: ["Keskitumma ihonväri"] }, "Medium light skin tone": { v: ["Keskivaalea ihonväri"] }, "Medium skin tone": { v: ["Keskimääräinen ihonväri"] }, "Neutral skin color": { v: ["Neutraali ihonväri"] }, Objects: { v: ["Esineet & asiat"] }, "People & Body": { v: ["Ihmiset & keho"] }, "Pick an emoji": { v: ["Valitse emoji"] }, "Search emoji": { v: ["Etsi emojia"] }, "Search results": { v: ["Hakutulokset"] }, Selected: { v: ["Valittu"] }, "Skin tone": { v: ["Ihonväri"] }, "Smileys & Emotion": { v: ["Hymiöt & tunteet"] }, Symbols: { v: ["Symbolit"] }, "Travel & Places": { v: ["Matkustus & kohteet"] } } }, { l: "fr", t: { Activities: { v: ["Activités"] }, "Animals & Nature": { v: ["Animaux & Nature"] }, Custom: { v: ["Personnalisé"] }, "Dark skin tone": { v: ["Teint de peau foncé"] }, "Emoji picker": { v: ["Sélecteur d'émojis"] }, Flags: { v: ["Drapeaux"] }, "Food & Drink": { v: ["Nourriture & Boissons"] }, "Frequently used": { v: ["Utilisés fréquemment"] }, "Light skin tone": { v: ["Teint de peau clair"] }, "Medium dark skin tone": { v: ["Teint de peau moyennement foncé"] }, "Medium light skin tone": { v: ["Teint de peau moyennement clair"] }, "Medium skin tone": { v: ["Teint de peau moyen"] }, "Neutral skin color": { v: ["Teint de peau neutre"] }, Objects: { v: ["Objets"] }, "People & Body": { v: ["Personnes & Corps"] }, "Pick an emoji": { v: ["Choisissez un émoji"] }, "Search emoji": { v: ["Rechercher un emoji"] }, "Search results": { v: ["Résultats de recherche"] }, Selected: { v: ["sélectionné"] }, "Skin tone": { v: ["Teint de peau"] }, "Smileys & Emotion": { v: ["Smileys & Émotions"] }, Symbols: { v: ["Symboles"] }, "Travel & Places": { v: ["Voyage & Lieux"] } } }, { l: "ga", t: { Activities: { v: ["Gníomhaíochtaí"] }, "Animals & Nature": { v: ["Ainmhithe & Dúlra"] }, Custom: { v: ["Saincheaptha"] }, "Dark skin tone": { v: ["Ton craiceann dorcha"] }, "Emoji picker": { v: ["Roghnóir Emoji"] }, Flags: { v: ["Bratacha"] }, "Food & Drink": { v: ["Bia & Deoch"] }, "Frequently used": { v: ["Úsáidtear go minic"] }, "Light skin tone": { v: ["Ton craiceann éadrom"] }, "Medium dark skin tone": { v: ["Ton craiceann meánach dorcha"] }, "Medium light skin tone": { v: ["Ton craiceann meánach éadrom"] }, "Medium skin tone": { v: ["Ton craiceann meánach"] }, "Neutral skin color": { v: ["Dath craiceann neodrach"] }, Objects: { v: ["Réada"] }, "People & Body": { v: ["Daoine & Corp"] }, "Pick an emoji": { v: ["Roghnaigh emoji"] }, "Search emoji": { v: ["Cuardaigh emoji"] }, "Search results": { v: ["Torthaí cuardaigh"] }, Selected: { v: ["Roghnaithe"] }, "Skin tone": { v: ["Ton craicinn"] }, "Smileys & Emotion": { v: ["Smileys & Mothúchán"] }, Symbols: { v: ["Siombailí"] }, "Travel & Places": { v: ["Taisteal & Áiteanna"] } } }, { l: "gl", t: { Activities: { v: ["Actividades"] }, "Animals & Nature": { v: ["Animais e natureza"] }, Custom: { v: ["Personalizado"] }, "Dark skin tone": { v: ["Ton de pel escuro"] }, "Emoji picker": { v: ["Selector de «emojis»"] }, Flags: { v: ["Bandeiras"] }, "Food & Drink": { v: ["Comida e bebida"] }, "Frequently used": { v: ["Usado con frecuencia"] }, "Light skin tone": { v: ["Ton de pel claro"] }, "Medium dark skin tone": { v: ["Ton de pel medio escuro"] }, "Medium light skin tone": { v: ["Ton de pel medio claro"] }, "Medium skin tone": { v: ["Ton de pel medio"] }, "Neutral skin color": { v: ["Cor de pel neutra"] }, Objects: { v: ["Obxectos"] }, "People & Body": { v: ["Persoas e corpo"] }, "Pick an emoji": { v: ["Escolla un «emoji»"] }, "Search emoji": { v: ["Buscar «emoji»"] }, "Search results": { v: ["Resultados da busca"] }, Selected: { v: ["Seleccionado"] }, "Skin tone": { v: ["Ton de pel"] }, "Smileys & Emotion": { v: ["Sorrisos e emocións"] }, Symbols: { v: ["Símbolos"] }, "Travel & Places": { v: ["Viaxes e lugares"] } } }, { l: "he", t: { Activities: { v: ["פעילויות"] }, "Animals & Nature": { v: ["חיות וטבע"] }, Custom: { v: ["בהתאמה אישית"] }, Flags: { v: ["דגלים"] }, "Food & Drink": { v: ["מזון ומשקאות"] }, "Frequently used": { v: ["בשימוש תדיר"] }, Objects: { v: ["חפצים"] }, "People & Body": { v: ["אנשים וגוף"] }, "Pick an emoji": { v: ["נא לבחור אמוג׳י"] }, "Search emoji": { v: ["חיפוש אמוג׳י"] }, "Search results": { v: ["תוצאות חיפוש"] }, "Smileys & Emotion": { v: ["חייכנים ורגשונים"] }, Symbols: { v: ["סמלים"] }, "Travel & Places": { v: ["טיולים ומקומות"] } } }, { l: "hu", t: { Activities: { v: ["Tevékenységek"] }, "Animals & Nature": { v: ["Állatok és természet"] }, Custom: { v: ["Egyéni"] }, Flags: { v: ["Zászlók"] }, "Food & Drink": { v: ["Étel és ital"] }, "Frequently used": { v: ["Gyakran használt"] }, Objects: { v: ["Tárgyak"] }, "People & Body": { v: ["Emberek és test"] }, "Pick an emoji": { v: ["Válasszon egy emodzsit"] }, "Search results": { v: ["Találatok"] }, "Smileys & Emotion": { v: ["Mosolyok és érzelmek"] }, Symbols: { v: ["Szimbólumok"] }, "Travel & Places": { v: ["Utazás és helyek"] } } }, { l: "id", t: { Activities: { v: ["Aktivitas"] }, "Animals & Nature": { v: ["Satwa dan Alam"] }, Custom: { v: ["Khusus"] }, Flags: { v: ["Tanda"] }, "Food & Drink": { v: ["Makanan dan Minuman"] }, "Frequently used": { v: ["Sering digunakan"] }, Objects: { v: ["Objek"] }, "People & Body": { v: ["Orang & Badan"] }, "Pick an emoji": { v: ["Pilih emoji"] }, "Search emoji": { v: ["Cari emoji"] }, "Search results": { v: ["Hasil pencarian"] }, Selected: { v: ["Dipilih"] }, "Smileys & Emotion": { v: ["Senyuman & Perasaan"] }, Symbols: { v: ["Simbol"] }, "Travel & Places": { v: ["Perjalanan & Tempat"] } } }, { l: "is", t: { Activities: { v: ["Aðgerðir"] }, "Animals & Nature": { v: ["Dýr og náttúra"] }, Custom: { v: ["Sérsniðið"] }, "Dark skin tone": { v: ["Dökkur húðlitur"] }, "Emoji picker": { v: ["Emoji-táknmyndaval"] }, Flags: { v: ["Flögg"] }, "Food & Drink": { v: ["Matur og drykkur"] }, "Frequently used": { v: ["Oftast notað"] }, "Light skin tone": { v: ["Ljós húðlitur"] }, "Medium dark skin tone": { v: ["Meðaldökkur húðlitur"] }, "Medium light skin tone": { v: ["Meðalljós húðlitur"] }, "Medium skin tone": { v: ["Meðaltónn húðar"] }, "Neutral skin color": { v: ["Hlutlaus húðlitur"] }, Objects: { v: ["Hlutir"] }, "People & Body": { v: ["Fólk og líkami"] }, "Pick an emoji": { v: ["Veldu tjáningartákn"] }, "Search emoji": { v: ["Leita að tjáningartákni"] }, "Search results": { v: ["Leitarniðurstöður"] }, Selected: { v: ["Valið"] }, "Skin tone": { v: ["Húðlitur"] }, "Smileys & Emotion": { v: ["Broskallar og tilfinningar"] }, Symbols: { v: ["Tákn"] }, "Travel & Places": { v: ["Staðir og ferðalög"] } } }, { l: "it", t: { Activities: { v: ["Attività"] }, "Animals & Nature": { v: ["Animali e natura"] }, Custom: { v: ["Personalizzato"] }, Flags: { v: ["Bandiere"] }, "Food & Drink": { v: ["Cibo e bevande"] }, "Frequently used": { v: ["Usati di frequente"] }, Objects: { v: ["Oggetti"] }, "People & Body": { v: ["Persone e corpo"] }, "Pick an emoji": { v: ["Scegli un emoji"] }, "Search emoji": { v: ["Ricerca emoji"] }, "Search results": { v: ["Risultati di ricerca"] }, Selected: { v: ["Selezionato"] }, "Smileys & Emotion": { v: ["Faccine ed emozioni"] }, Symbols: { v: ["Simboli"] }, "Travel & Places": { v: ["Viaggi e luoghi"] } } }, { l: "ja", t: { Activities: { v: ["アクティビティ"] }, "Animals & Nature": { v: ["動物と自然"] }, Custom: { v: ["カスタム"] }, "Dark skin tone": { v: ["暗い肌のトーン"] }, "Emoji picker": { v: ["絵文字ピッカー"] }, Flags: { v: ["国旗"] }, "Food & Drink": { v: ["食べ物と飲み物"] }, "Frequently used": { v: ["よく使うもの"] }, "Light skin tone": { v: ["明るい肌のトーン"] }, "Medium dark skin tone": { v: ["やや暗い肌のトーン"] }, "Medium light skin tone": { v: ["やや明るい肌のトーン"] }, "Medium skin tone": { v: ["中間の肌のトーン"] }, "Neutral skin color": { v: ["ニュートラルな肌の色"] }, Objects: { v: ["物"] }, "People & Body": { v: ["様々な人と体の部位"] }, "Pick an emoji": { v: ["絵文字を選択"] }, "Search emoji": { v: ["絵文字を検索"] }, "Search results": { v: ["検索結果"] }, Selected: { v: ["選択済み"] }, "Skin tone": { v: ["肌のトーン"] }, "Smileys & Emotion": { v: ["感情表現"] }, Symbols: { v: ["記号"] }, "Travel & Places": { v: ["旅行と場所"] } } }, { l: "ja-JP", t: { Activities: { v: ["アクティビティ"] }, "Animals & Nature": { v: ["動物と自然"] }, Custom: { v: ["カスタム"] }, "Dark skin tone": { v: ["暗い肌のトーン"] }, "Emoji picker": { v: ["絵文字ピッカー"] }, Flags: { v: ["国旗"] }, "Food & Drink": { v: ["食べ物と飲み物"] }, "Frequently used": { v: ["よく使うもの"] }, "Light skin tone": { v: ["明るい肌のトーン"] }, "Medium dark skin tone": { v: ["やや暗い肌のトーン"] }, "Medium light skin tone": { v: ["やや明るい肌のトーン"] }, "Medium skin tone": { v: ["中間の肌のトーン"] }, "Neutral skin color": { v: ["ニュートラルな肌の色"] }, Objects: { v: ["物"] }, "People & Body": { v: ["様々な人と体の部位"] }, "Pick an emoji": { v: ["絵文字を選択"] }, "Search emoji": { v: ["絵文字を検索"] }, "Search results": { v: ["検索結果"] }, Selected: { v: ["選択済み"] }, "Skin tone": { v: ["肌のトーン"] }, "Smileys & Emotion": { v: ["感情表現"] }, Symbols: { v: ["記号"] }, "Travel & Places": { v: ["旅行と場所"] } } }, { l: "ko", t: { Activities: { v: ["활동"] }, "Animals & Nature": { v: ["동물 & 자연"] }, Custom: { v: ["맞춤 설정"] }, "Dark skin tone": { v: ["어두운 피부 톤"] }, "Emoji picker": { v: ["이모지 선택기"] }, Flags: { v: ["깃발"] }, "Food & Drink": { v: ["음식 & 음료"] }, "Frequently used": { v: ["자주 쓰임"] }, "Light skin tone": { v: ["밝은 피부 톤"] }, "Medium dark skin tone": { v: ["약간 어두운 피부 톤"] }, "Medium light skin tone": { v: ["약간 밝은 피부 톤"] }, "Medium skin tone": { v: ["중간 피부 톤"] }, "Neutral skin color": { v: ["중성적 피부 톤"] }, Objects: { v: ["물체"] }, "People & Body": { v: ["사람 & 신체"] }, "Pick an emoji": { v: ["이모지 선택"] }, "Search emoji": { v: ["이모지 검색"] }, "Search results": { v: ["검색 결과"] }, Selected: { v: ["선택됨"] }, "Skin tone": { v: ["피부 톤"] }, "Smileys & Emotion": { v: ["스마일리 & 이모티콘"] }, Symbols: { v: ["기호"] }, "Travel & Places": { v: ["여행 & 장소"] } } }, { l: "lt-LT", t: { Activities: { v: ["Veiklos"] }, "Animals & Nature": { v: ["Gyvūnai ir gamta"] }, Custom: { v: ["Tinkinti"] }, Flags: { v: ["Vėliavos"] }, "Food & Drink": { v: ["Maistas ir gėrimai"] }, "Frequently used": { v: ["Dažniausiai naudoti"] }, Objects: { v: ["Objektai"] }, "People & Body": { v: ["Žmonės ir kūnas"] }, "Pick an emoji": { v: ["Pasirinkti jaustuką"] }, "Search results": { v: ["Paieškos rezultatai"] }, "Smileys & Emotion": { v: ["Šypsenos ir emocijos"] }, Symbols: { v: ["Simboliai"] }, "Travel & Places": { v: ["Kelionės ir vietos"] } } }, { l: "lv", t: {} }, { l: "mk", t: { Activities: { v: ["Активности"] }, "Animals & Nature": { v: ["Животни & Природа"] }, Custom: { v: ["Прилагодени"] }, Flags: { v: ["Знамиња"] }, "Food & Drink": { v: ["Храна & Пијалоци"] }, "Frequently used": { v: ["Најчесто користени"] }, Objects: { v: ["Објекти"] }, "People & Body": { v: ["Луѓе & Тело"] }, "Pick an emoji": { v: ["Избери емотикон"] }, "Search results": { v: ["Резултати од барувањето"] }, "Smileys & Emotion": { v: ["Смешковци & Емотикони"] }, Symbols: { v: ["Симболи"] }, "Travel & Places": { v: ["Патувања & Места"] } } }, { l: "my", t: { Activities: { v: ["ပြုလုပ်ဆောင်တာများ"] }, "Animals & Nature": { v: ["တိရစ္ဆာန်များနှင့် သဘာဝ"] }, Custom: { v: ["အလိုကျချိန်ညှိမှု"] }, Flags: { v: ["အလံများ"] }, "Food & Drink": { v: ["အစားအသောက်"] }, "Frequently used": { v: ["မကြာခဏအသုံးပြုသော"] }, Objects: { v: ["အရာဝတ္ထုများ"] }, "People & Body": { v: ["လူပုဂ္ဂိုလ်များနှင့် ခန္ဓာကိုယ်"] }, "Pick an emoji": { v: ["အီမိုဂျီရွေးရန်"] }, "Search results": { v: ["ရှာဖွေမှု ရလဒ်များ"] }, "Smileys & Emotion": { v: ["စမိုင်လီများနှင့် အီမိုရှင်း"] }, Symbols: { v: ["သင်္ကေတများ"] }, "Travel & Places": { v: ["ခရီးသွားလာခြင်းနှင့် နေရာများ"] } } }, { l: "nb", t: { Activities: { v: ["Aktiviteter"] }, "Animals & Nature": { v: ["Dyr og natur"] }, Custom: { v: ["Tilpasset"] }, "Dark skin tone": { v: ["Mørk hudtone"] }, "Emoji picker": { v: ["Emoji-velger"] }, Flags: { v: ["Flagg"] }, "Food & Drink": { v: ["Mat og drikke"] }, "Frequently used": { v: ["Ofte brukt"] }, "Light skin tone": { v: ["Lys hudtone"] }, "Medium dark skin tone": { v: ["Middels mørk hudtone"] }, "Medium light skin tone": { v: ["Middels lys hudtone"] }, "Medium skin tone": { v: ["Middels hudtone"] }, "Neutral skin color": { v: ["Nøytral hudfarge"] }, Objects: { v: ["Objekter"] }, "People & Body": { v: ["Mennesker og kropp"] }, "Pick an emoji": { v: ["Velg en emoji"] }, "Search emoji": { v: ["Søk emoji"] }, "Search results": { v: ["Søkeresultater"] }, Selected: { v: ["Valgt"] }, "Skin tone": { v: ["Hudtone"] }, "Smileys & Emotion": { v: ["Smilefjes og følelser"] }, Symbols: { v: ["Symboler"] }, "Travel & Places": { v: ["Reise og steder"] } } }, { l: "nl", t: { Activities: { v: ["Activiteiten"] }, "Animals & Nature": { v: ["Dieren & Natuur"] }, Custom: { v: ["Aangepast"] }, "Dark skin tone": { v: ["Donkere huidskleur"] }, "Emoji picker": { v: ["Emoji-kiezer"] }, Flags: { v: ["Vlaggen"] }, "Food & Drink": { v: ["Eten & Drinken"] }, "Frequently used": { v: ["Vaak gebruikt"] }, "Light skin tone": { v: ["Lichte huidskleur"] }, "Medium dark skin tone": { v: ["Gemiddeld donkere huidskleur"] }, "Medium light skin tone": { v: ["Gemiddeld lichte huidskleur"] }, "Medium skin tone": { v: ["Gemiddelde huidskleur"] }, "Neutral skin color": { v: ["Neutrale huidskleur"] }, Objects: { v: ["Objecten"] }, "People & Body": { v: ["Mensen & Lichaam"] }, "Pick an emoji": { v: ["Kies een emoji"] }, "Search emoji": { v: ["Emoji zoeken"] }, "Search results": { v: ["Zoekresultaten"] }, Selected: { v: ["Geselecteerd"] }, "Skin tone": { v: ["Huidskleur"] }, "Smileys & Emotion": { v: ["Smileys & Emotie"] }, Symbols: { v: ["Symbolen"] }, "Travel & Places": { v: ["Reizen & Plaatsen"] } } }, { l: "oc", t: {} }, { l: "pl", t: { Activities: { v: ["Aktywność"] }, "Animals & Nature": { v: ["Zwierzęta i natura"] }, Custom: { v: ["Zwyczajne"] }, "Dark skin tone": { v: ["Ciemna tonacja"] }, "Emoji picker": { v: ["Wybierz Emoji"] }, Flags: { v: ["Flagi"] }, "Food & Drink": { v: ["Jedzenie i picie"] }, "Frequently used": { v: ["Często używane"] }, "Light skin tone": { v: ["Jasny odcień skóry"] }, "Medium dark skin tone": { v: ["Średnio ciemny odcień skóry"] }, "Medium light skin tone": { v: ["Średnio jasny odcień skóry"] }, "Medium skin tone": { v: ["Średni odcień skóry"] }, "Neutral skin color": { v: ["Neutralny kolor skróry"] }, Objects: { v: ["Obiekty"] }, "People & Body": { v: ["Ludzie i ciało"] }, "Pick an emoji": { v: ["Wybierz emoji"] }, "Search emoji": { v: ["Szukaj emoji"] }, "Search results": { v: ["Wyniki wyszukiwania"] }, Selected: { v: ["Wybrane"] }, "Skin tone": { v: ["Kolor skóry"] }, "Smileys & Emotion": { v: ["Buźki i emotikony"] }, Symbols: { v: ["Symbole"] }, "Travel & Places": { v: ["Podróże i miejsca"] } } }, { l: "pt-BR", t: { Activities: { v: ["Atividades"] }, "Animals & Nature": { v: ["Animais & Natureza"] }, Custom: { v: ["Personalizados"] }, "Dark skin tone": { v: ["Tom de pele escuro"] }, "Emoji picker": { v: ["Seletor de emoji"] }, Flags: { v: ["Bandeiras"] }, "Food & Drink": { v: ["Comida & Bebida"] }, "Frequently used": { v: ["Mais usados"] }, "Light skin tone": { v: ["Tom de pele claro"] }, "Medium dark skin tone": { v: ["Tom de pele meio escuro"] }, "Medium light skin tone": { v: ["Tom de pele meio claro"] }, "Medium skin tone": { v: ["Tom de pele médio"] }, "Neutral skin color": { v: ["Tom de pele neutro"] }, Objects: { v: ["Objetos"] }, "People & Body": { v: ["Pessoas & Corpo"] }, "Pick an emoji": { v: ["Escolha um emoji"] }, "Search emoji": { v: ["Pesquisar emoji"] }, "Search results": { v: ["Resultados da pesquisa"] }, Selected: { v: ["Selecionado"] }, "Skin tone": { v: ["Tom de pele"] }, "Smileys & Emotion": { v: ["Smileys & Emoções"] }, Symbols: { v: ["Símbolos"] }, "Travel & Places": { v: ["Viagem & Lugares"] } } }, { l: "pt-PT", t: { Activities: { v: ["Atividades"] }, "Animals & Nature": { v: ["Animais e Natureza"] }, Custom: { v: ["Personalizado"] }, "Dark skin tone": { v: ["Tom de pele escuro"] }, "Emoji picker": { v: ["seletor de emoji"] }, Flags: { v: ["Bandeiras"] }, "Food & Drink": { v: ["Comida e Bebida"] }, "Frequently used": { v: ["Mais utilizados"] }, "Light skin tone": { v: ["Tom de pele claro"] }, "Medium dark skin tone": { v: ["Tom de pele escuro médio"] }, "Medium light skin tone": { v: ["Tom de pele claro médio"] }, "Medium skin tone": { v: ["Tom de pele médio"] }, "Neutral skin color": { v: ["Cor de pele neutra"] }, Objects: { v: ["Objetos"] }, "People & Body": { v: ["Pessoas e Corpo"] }, "Pick an emoji": { v: ["Escolha um emoji"] }, "Search emoji": { v: ["Pesquisar emoji"] }, "Search results": { v: ["Resultados da pesquisa"] }, Selected: { v: ["Selecionado"] }, "Skin tone": { v: ["Tom de pele"] }, "Smileys & Emotion": { v: ["Sorrisos e Emoções"] }, Symbols: { v: ["Símbolos"] }, "Travel & Places": { v: ["Viagens e Lugares"] } } }, { l: "ro", t: { Activities: { v: ["Activități"] }, "Animals & Nature": { v: ["Animale și natură"] }, Custom: { v: ["Personalizat"] }, Flags: { v: ["Marcaje"] }, "Food & Drink": { v: ["Alimente și băuturi"] }, "Frequently used": { v: ["Utilizate frecvent"] }, Objects: { v: ["Obiecte"] }, "People & Body": { v: ["Oameni și corp"] }, "Pick an emoji": { v: ["Alege un emoji"] }, "Search emoji": { v: ["Căutare emoji"] }, "Search results": { v: ["Rezultatele căutării"] }, Selected: { v: ["Selectat"] }, "Smileys & Emotion": { v: ["Zâmbete și emoții"] }, Symbols: { v: ["Simboluri"] }, "Travel & Places": { v: ["Călătorii și locuri"] } } }, { l: "ru", t: { Activities: { v: ["События"] }, "Animals & Nature": { v: ["Животные и природа "] }, Custom: { v: ["Пользовательское"] }, "Dark skin tone": { v: ["Темный оттенок"] }, "Emoji picker": { v: ["Подборщик эмодзи"] }, Flags: { v: ["Флаги"] }, "Food & Drink": { v: ["Еда, напиток"] }, "Frequently used": { v: ["Часто используемый"] }, "Light skin tone": { v: ["Светлый оттенок"] }, "Medium dark skin tone": { v: ["Средний темный оттенок"] }, "Medium light skin tone": { v: ["Средний светлый оттенок"] }, "Medium skin tone": { v: ["Средний оттенок"] }, "Neutral skin color": { v: ["Нейтральный оттенок"] }, Objects: { v: ["Объекты"] }, "People & Body": { v: ["Люди и тело"] }, "Pick an emoji": { v: ["Выберите эмодзи"] }, "Search emoji": { v: ["Поиск эмодзи"] }, "Search results": { v: ["Результаты поиска"] }, Selected: { v: ["Выбрано"] }, "Skin tone": { v: ["Оттенок скина"] }, "Smileys & Emotion": { v: ["Смайлики и эмоции"] }, Symbols: { v: ["Символы"] }, "Travel & Places": { v: ["Путешествия и места"] } } }, { l: "sk", t: { Activities: { v: ["Aktivity"] }, "Animals & Nature": { v: ["Zvieratá a príroda"] }, Custom: { v: ["Vlastné"] }, "Dark skin tone": { v: ["Tmavý vzhľad"] }, "Emoji picker": { v: ["Výber emodži"] }, Flags: { v: ["Vlajky"] }, "Food & Drink": { v: ["Jedlo a nápoje"] }, "Frequently used": { v: ["Často používané"] }, "Light skin tone": { v: ["Svetlý vzhľad"] }, "Medium dark skin tone": { v: ["Stredne tmavý vzhľad"] }, "Medium light skin tone": { v: ["Stredne svetlý vzhľad"] }, "Medium skin tone": { v: ["Stredný vzhľad"] }, "Neutral skin color": { v: ["Neutrálny vzhľad"] }, Objects: { v: ["Objekty"] }, "People & Body": { v: ["Ľudia a telo"] }, "Pick an emoji": { v: ["Vybrať emodži"] }, "Search emoji": { v: ["Vyhľadať emoji"] }, "Search results": { v: ["Výsledky vyhľadávania"] }, Selected: { v: ["Vybraný"] }, "Skin tone": { v: ["Vzhľad"] }, "Smileys & Emotion": { v: ["Smajlíky a emócie"] }, Symbols: { v: ["Symboly"] }, "Travel & Places": { v: ["Cestovanie a miesta"] } } }, { l: "sl", t: { Activities: { v: ["Dejavnosti"] }, "Animals & Nature": { v: ["Živali in Narava"] }, Custom: { v: ["Po meri"] }, Flags: { v: ["Zastavice"] }, "Food & Drink": { v: ["Hrana in Pijača"] }, "Frequently used": { v: ["Pogostost uporabe"] }, Objects: { v: ["Predmeti"] }, "People & Body": { v: ["Ljudje in Telo"] }, "Pick an emoji": { v: ["Izbor izrazne ikone"] }, "Search results": { v: ["Zadetki iskanja"] }, "Smileys & Emotion": { v: ["Izrazne ikone"] }, Symbols: { v: ["Simboli"] }, "Travel & Places": { v: ["Potovanja in Kraji"] } } }, { l: "sr", t: { Activities: { v: ["Активности"] }, "Animals & Nature": { v: ["Животиње и природа"] }, Custom: { v: ["Произвољно"] }, "Dark skin tone": { v: ["Тамни тен коже"] }, "Emoji picker": { v: ["Бирач емођија"] }, Flags: { v: ["Заставе"] }, "Food & Drink": { v: ["Храна и пиће"] }, "Frequently used": { v: ["Често коришћено"] }, "Light skin tone": { v: ["Светли тен коже"] }, "Medium dark skin tone": { v: ["Средње тамни тен коже"] }, "Medium light skin tone": { v: ["Средње светли тен коже"] }, "Medium skin tone": { v: ["Средњи тен коже"] }, "Neutral skin color": { v: ["Неутрална боја коже"] }, Objects: { v: ["Предмети"] }, "People & Body": { v: ["Људи и тело"] }, "Pick an emoji": { v: ["Изаберите емођи"] }, "Search emoji": { v: ["Претражи емођи"] }, "Search results": { v: ["Резултати претраге"] }, Selected: { v: ["Изабрано"] }, "Skin tone": { v: ["Тен коже"] }, "Smileys & Emotion": { v: ["Смајлији и емоције"] }, Symbols: { v: ["Симболи"] }, "Travel & Places": { v: ["Путовање и места"] } } }, { l: "sv", t: { Activities: { v: ["Aktiviteter"] }, "Animals & Nature": { v: ["Djur & Natur"] }, Custom: { v: ["Anpassad"] }, "Dark skin tone": { v: ["Mörk hudton"] }, "Emoji picker": { v: ["Emoji-väljare"] }, Flags: { v: ["Flaggor"] }, "Food & Drink": { v: ["Mat & Dryck"] }, "Frequently used": { v: ["Används ofta"] }, "Light skin tone": { v: ["Ljus hudton"] }, "Medium dark skin tone": { v: ["Medium mörk hudton"] }, "Medium light skin tone": { v: ["Medium ljus hudton"] }, "Medium skin tone": { v: ["Medium hudton"] }, "Neutral skin color": { v: ["Neutral hudfärg"] }, Objects: { v: ["Objekt"] }, "People & Body": { v: ["Kropp & Själ"] }, "Pick an emoji": { v: ["Välj en emoji"] }, "Search emoji": { v: ["Sök emoji"] }, "Search results": { v: ["Sökresultat"] }, Selected: { v: ["Vald"] }, "Skin tone": { v: ["Hudton"] }, "Smileys & Emotion": { v: ["Selfies & Känslor"] }, Symbols: { v: ["Symboler"] }, "Travel & Places": { v: ["Resor & Sevärdigheter"] } } }, { l: "tr", t: { Activities: { v: ["Etkinlikler"] }, "Animals & Nature": { v: ["Hayvanlar ve doğa"] }, Custom: { v: ["Özel"] }, "Dark skin tone": { v: ["Koyu deri rengi"] }, "Emoji picker": { v: ["Emoji seçici"] }, Flags: { v: ["Bayraklar"] }, "Food & Drink": { v: ["Yeme ve içme"] }, "Frequently used": { v: ["Sık kullanılanlar"] }, "Light skin tone": { v: ["Açık deri rengi"] }, "Medium dark skin tone": { v: ["Orta koyu deri rengi"] }, "Medium light skin tone": { v: ["Orta açık deri rengi"] }, "Medium skin tone": { v: ["Orta deri rengi"] }, "Neutral skin color": { v: ["Nötr deri rengi"] }, Objects: { v: ["Nesneler"] }, "People & Body": { v: ["İnsanlar ve beden"] }, "Pick an emoji": { v: ["Bir emoji seçin"] }, "Search emoji": { v: ["Emoji ara"] }, "Search results": { v: ["Arama sonuçları"] }, Selected: { v: ["Seçilmiş"] }, "Skin tone": { v: ["Deri rengi"] }, "Smileys & Emotion": { v: ["İfadeler ve duygular"] }, Symbols: { v: ["Simgeler"] }, "Travel & Places": { v: ["Gezi ve yerler"] } } }, { l: "uk", t: { Activities: { v: ["Діяльність"] }, "Animals & Nature": { v: ["Тварини та природа"] }, Custom: { v: ["Власне"] }, "Dark skin tone": { v: ["Смаглявий"] }, "Emoji picker": { v: ["Вибір емоційки"] }, Flags: { v: ["Прапори"] }, "Food & Drink": { v: ["Їжа та напої"] }, "Frequently used": { v: ["Найчастіші"] }, "Light skin tone": { v: ["Світла шкіра"] }, "Medium dark skin tone": { v: ["Какао"] }, "Medium light skin tone": { v: ["Лате"] }, "Medium skin tone": { v: ["Середній колір шкіри"] }, "Neutral skin color": { v: ["Нейтральний колір шкіри"] }, Objects: { v: ["Об'єкти"] }, "People & Body": { v: ["Люди та жести"] }, "Pick an emoji": { v: ["Виберіть емоційку"] }, "Search emoji": { v: ["Шукати емоційки"] }, "Search results": { v: ["Результати пошуку"] }, Selected: { v: ["Вибрано"] }, "Skin tone": { v: ["Колір шкіри"] }, "Smileys & Emotion": { v: ["Смайли та емоції"] }, Symbols: { v: ["Символи"] }, "Travel & Places": { v: ["Поїздки та місця"] } } }, { l: "uz", t: { Activities: { v: ["Faolliklar"] }, "Animals & Nature": { v: ["Hayvonlar va Tabiat"] }, Custom: { v: ["Moslashtirilgan"] }, "Dark skin tone": { v: ["Qora rangdagi qoplama"] }, "Emoji picker": { v: ["Emoji tanlagich"] }, Flags: { v: ["Bayroqlar"] }, "Food & Drink": { v: ["Oziq-ovqat va ichimliklar"] }, "Frequently used": { v: ["Tez-tez ishlatiladi"] }, "Light skin tone": { v: ["Yorug` rangdagi qoplama"] }, "Medium dark skin tone": { v: ["O`rtacha qorong`u rangdagi qoplama"] }, "Medium light skin tone": { v: ["O`rtacha yorug`lik rangdagi qoplama"] }, "Medium skin tone": { v: ["O`rtacha rangdagi qoplama"] }, "Neutral skin color": { v: ["Neytral rang"] }, Objects: { v: ["Obyekt"] }, "People & Body": { v: ["Odamlar va Tana"] }, "Pick an emoji": { v: ["Emojini tanlang"] }, "Search emoji": { v: ["Emoji qidirish"] }, "Search results": { v: ["Qidiruv natijalari"] }, Selected: { v: ["Tanlangan"] }, "Skin tone": { v: ["Odatiy rangdagi qoplama"] }, "Smileys & Emotion": { v: ["Smayllar va Hissiyotlar"] }, Symbols: { v: ["Belgilar"] }, "Travel & Places": { v: ["Sayohat va Joylar"] } } }, { l: "zh-CN", t: { Activities: { v: ["活动"] }, "Animals & Nature": { v: ["动物 & 自然"] }, Custom: { v: ["自定义"] }, "Dark skin tone": { v: ["深色皮肤"] }, "Emoji picker": { v: ["表情拾取器"] }, Flags: { v: ["旗帜"] }, "Food & Drink": { v: ["食物 & 饮品"] }, "Frequently used": { v: ["经常使用"] }, "Light skin tone": { v: ["浅色皮肤"] }, "Medium dark skin tone": { v: ["中等深色皮肤"] }, "Medium light skin tone": { v: ["中等浅色皮肤"] }, "Medium skin tone": { v: ["中等皮肤"] }, "Neutral skin color": { v: ["中性皮肤颜色"] }, Objects: { v: ["物体"] }, "People & Body": { v: ["人 & 身体"] }, "Pick an emoji": { v: ["选择一个表情"] }, "Search emoji": { v: ["搜索表情"] }, "Search results": { v: ["搜索结果"] }, Selected: { v: ["选择"] }, "Skin tone": { v: ["皮肤"] }, "Smileys & Emotion": { v: ["笑脸 & 情感"] }, Symbols: { v: ["符号"] }, "Travel & Places": { v: ["旅游 & 地点"] } } }, { l: "zh-HK", t: { Activities: { v: ["活動"] }, "Animals & Nature": { v: ["動物與自然"] }, Custom: { v: ["自定義"] }, "Dark skin tone": { v: ["深膚色"] }, "Emoji picker": { v: ["表情符號選擇器"] }, Flags: { v: ["旗幟"] }, "Food & Drink": { v: ["食物與飲料"] }, "Frequently used": { v: ["經常使用"] }, "Light skin tone": { v: ["淺膚色"] }, "Medium dark skin tone": { v: ["中等深膚色"] }, "Medium light skin tone": { v: ["中等淺膚色"] }, "Medium skin tone": { v: ["中等膚色"] }, "Neutral skin color": { v: ["中性色膚色"] }, Objects: { v: ["物件"] }, "People & Body": { v: ["人物"] }, "Pick an emoji": { v: ["選擇表情符號"] }, "Search emoji": { v: ["搜尋表情符號"] }, "Search results": { v: ["搜尋結果"] }, Selected: { v: ["已選"] }, "Skin tone": { v: ["膚色"] }, "Smileys & Emotion": { v: ["表情"] }, Symbols: { v: ["標誌"] }, "Travel & Places": { v: ["旅遊與景點"] } } }, { l: "zh-TW", t: { Activities: { v: ["活動"] }, "Animals & Nature": { v: ["動物與自然"] }, Custom: { v: ["自定義"] }, "Dark skin tone": { v: ["深膚色"] }, "Emoji picker": { v: ["表情符號挑選器"] }, Flags: { v: ["旗幟"] }, "Food & Drink": { v: ["食物與飲料"] }, "Frequently used": { v: ["最近使用"] }, "Light skin tone": { v: ["淺膚色"] }, "Medium dark skin tone": { v: ["中等深膚色"] }, "Medium light skin tone": { v: ["中等淺膚色"] }, "Medium skin tone": { v: ["中等膚色"] }, "Neutral skin color": { v: ["中性膚色"] }, Objects: { v: ["物件"] }, "People & Body": { v: ["人物"] }, "Pick an emoji": { v: ["選擇表情符號"] }, "Search emoji": { v: ["搜尋表情符號"] }, "Search results": { v: ["搜尋結果"] }, Selected: { v: ["已選取"] }, "Skin tone": { v: ["膚色"] }, "Smileys & Emotion": { v: ["表情"] }, Symbols: { v: ["標誌"] }, "Travel & Places": { v: ["旅遊與景點"] } } }], y1 = [{ l: "ar", t: { "Add to a project": { v: ["أضف إلى مشروع"] }, "Connect items to a project to make them easier to find": { v: ["ربط عناصر بمشروع لتسهيل العثور عليها"] }, "Failed to add the item to the project": { v: ["تعذر ربط عنصر بمشروع"] }, "Failed to create a project": { v: ["تعذر إنشاء مشروع"] }, "Failed to rename the project": { v: ["تعذّر تغيير اسم المشروع"] }, "Type to search for existing projects": { v: ["أكتُب للبحث في المشاريع الموجودة"] } } }, { l: "ast", t: {} }, { l: "br", t: {} }, { l: "ca", t: {} }, { l: "cs", t: { "Add to a project": { v: ["Přidat do projektu"] }, "Connect items to a project to make them easier to find": { v: ["Připojte položky k projektu, čímž budou snáze dohledatelné"] }, "Failed to add the item to the project": { v: ["Položku se nepodařilo přidat do projektu"] }, "Failed to create a project": { v: ["Projekt se nepodařilo vytvořit"] }, "Failed to rename the project": { v: ["Projekt se nepodařilo přejmenovat"] }, "Type to search for existing projects": { v: ["Psaním vyhledávejte existující projekty"] } } }, { l: "cs-CZ", t: {} }, { l: "da", t: { "Add to a project": { v: ["Tilføj til et projekt"] }, "Connect items to a project to make them easier to find": { v: ["Forbind elementer til et projekt for at gøre dem nemmere at finde"] }, "Failed to add the item to the project": { v: ["Kunne ikke føje elementet til projektet"] }, "Failed to create a project": { v: ["Kunne ikke oprette et projekt"] }, "Failed to rename the project": { v: ["Projektet kunne ikke omdøbes"] }, "Type to search for existing projects": { v: ["Skriv for at søge efter eksisterende projekter"] } } }, { l: "de", t: { "Add to a project": { v: ["Einem Projekt hinzufügen"] }, "Connect items to a project to make them easier to find": { v: ["Verbinde Elemente mit einem Projekt, um sie leichter zu finden"] }, "Failed to add the item to the project": { v: ["Das Element konnte nicht zum Projekt hinzugefügt werden"] }, "Failed to create a project": { v: ["Projekt konnte nicht erstellt werden"] }, "Failed to rename the project": { v: ["Das Projekt konnte nicht umbenannt werden"] }, "Type to search for existing projects": { v: ["Tippen, um nach vorhandenen Projekten zu suchen"] } } }, { l: "de-DE", t: { "Add to a project": { v: ["Einem Projekt hinzufügen"] }, "Connect items to a project to make them easier to find": { v: ["Verbinden Sie Elemente mit einem Projekt, um sie leichter zu finden"] }, "Failed to add the item to the project": { v: ["Das Element konnte nicht zum Projekt hinzugefügt werden"] }, "Failed to create a project": { v: ["Projekt konnte nicht erstellt werden"] }, "Failed to rename the project": { v: ["Das Projekt konnte nicht umbenannt werden"] }, "Type to search for existing projects": { v: ["Tippen, um nach vorhandenen Projekten zu suchen"] } } }, { l: "el", t: { "Add to a project": { v: ["Προσθήκη σε ένα έργο"] }, "Connect items to a project to make them easier to find": { v: ["Συνδέστε αντικείμενα σε ένα έργο για να τα βρίσκετε πιο εύκολα"] }, "Failed to add the item to the project": { v: ["Αποτυχία προσθήκης του αντικειμένου στο έργο"] }, "Failed to create a project": { v: ["Αποτυχία δημιουργίας έργου"] }, "Failed to rename the project": { v: ["Αποτυχία μετονομασίας του έργου"] }, "Type to search for existing projects": { v: ["Πληκτρολογήστε για αναζήτηση υπαρχόντων έργων"] } } }, { l: "en-GB", t: { "Add to a project": { v: ["Add to a project"] }, "Connect items to a project to make them easier to find": { v: ["Connect items to a project to make them easier to find"] }, "Failed to add the item to the project": { v: ["Failed to add the item to the project"] }, "Failed to create a project": { v: ["Failed to create a project"] }, "Failed to rename the project": { v: ["Failed to rename the project"] }, "Type to search for existing projects": { v: ["Type to search for existing projects"] } } }, { l: "eo", t: {} }, { l: "es", t: {} }, { l: "es-AR", t: { "Add to a project": { v: ["Agregar a un proyecto"] }, "Connect items to a project to make them easier to find": { v: ["Conecte items a un proyecto para hacerlos más fáciles de encontrar"] }, "Failed to add the item to the project": { v: ["No se pudo agregar el elemento al proyecto"] }, "Failed to create a project": { v: ["No se pudo crear un proyecto"] }, "Failed to rename the project": { v: ["No se pudo renombrar el proyecto"] }, "Type to search for existing projects": { v: ["Escriba para buscar proyectos existentes"] } } }, { l: "es-EC", t: {} }, { l: "es-MX", t: { "Add to a project": { v: ["Agregar a un proyecto"] }, "Connect items to a project to make them easier to find": { v: ["Conecte elementos a un proyecto para hacerlos más fáciles de encontrar"] }, "Failed to add the item to the project": { v: ["No se pudo agregar el elemento al proyecto"] }, "Failed to create a project": { v: ["No se pudo crear el proyecto"] }, "Failed to rename the project": { v: ["No se pudo renombrar el proyecto"] }, "Type to search for existing projects": { v: ["Escriba para buscar proyectos existentes"] } } }, { l: "et-EE", t: { "Add to a project": { v: ["Lisa projekti"] }, "Connect items to a project to make them easier to find": { v: ["Selleks, et objekte oleks lihtsam leida, seo nad projektiga"] }, "Failed to add the item to the project": { v: ["Objekti lisamine projekti ei õnnestunud"] }, "Failed to create a project": { v: ["Projekti loomine ei õnnestunud"] }, "Failed to rename the project": { v: ["Projekti nime muutmine ei õnnestunud"] }, "Type to search for existing projects": { v: ["Olemasolevate projektide otsimiseks kirjuta"] } } }, { l: "eu", t: {} }, { l: "fa", t: { "Add to a project": { v: ["افزودن به پروژه"] }, "Connect items to a project to make them easier to find": { v: ["برای پیدا کردن راحت‌تر، مواردی را به پروژه متصل کنید"] }, "Failed to add the item to the project": { v: ["موارد به پروژه اضافه نشد"] }, "Failed to create a project": { v: ["ایجاد پروژه نامؤفق بود"] }, "Failed to rename the project": { v: ["تغییر نام پروژه انجام نشد"] }, "Type to search for existing projects": { v: ["برای جستجوی پروژه‌های موجود تایپ کنید"] } } }, { l: "fi", t: { "Add to a project": { v: ["Lisää projektiin"] }, "Connect items to a project to make them easier to find": { v: ["Yhdistä kohteet projektiin, jotta ne olisivat helpompia löytää"] }, "Failed to add the item to the project": { v: ["Kohteiden lisääminen projektiin epäonnistui"] }, "Failed to create a project": { v: ["Projektin luominen epäonnistui"] }, "Failed to rename the project": { v: ["Projektin nimeäminen epäonnistui"] }, "Type to search for existing projects": { v: ["Kirjoita etsiäksesi olemassaolevia projekteja"] } } }, { l: "fr", t: { "Add to a project": { v: ["Ajouter à un projet"] }, "Connect items to a project to make them easier to find": { v: ["Connectez des éléments à un projet pour les retrouver plus facilement"] }, "Failed to add the item to the project": { v: ["Impossible d'ajouter l'élément au projet"] }, "Failed to create a project": { v: ["Impossible de créer un projet"] }, "Failed to rename the project": { v: ["Impossible de renommer le projet"] }, "Type to search for existing projects": { v: ["Tapez pour rechercher des projets existants"] } } }, { l: "ga", t: { "Add to a project": { v: ["Cuir le tionscadal"] }, "Connect items to a project to make them easier to find": { v: ["Ceangail míreanna le tionscadal chun iad a dhéanamh níos éasca iad a aimsiú"] }, "Failed to add the item to the project": { v: ["Theip ar an mír a chur leis an tionscadal"] }, "Failed to create a project": { v: ["Theip ar thionscadal a chruthú"] }, "Failed to rename the project": { v: ["Theip ar an tionscadal a athainmniú"] }, "Type to search for existing projects": { v: ["Clóscríobh chun tionscadail atá ann cheana a chuardach"] } } }, { l: "gl", t: { "Add to a project": { v: ["Engadir a un proxecto"] }, "Connect items to a project to make them easier to find": { v: ["Conectar elementos a un proxecto para facelos máis doados de atopar"] }, "Failed to add the item to the project": { v: ["Produciuse un fallo ao engadir o elemento ao proxecto"] }, "Failed to create a project": { v: ["Produciuse un fallo ao crear un proxecto"] }, "Failed to rename the project": { v: ["Produciuse un fallo ao cambiarlle o nome ao proxecto"] }, "Type to search for existing projects": { v: ["Escriba para buscar proxectos existentes"] } } }, { l: "he", t: {} }, { l: "hu", t: {} }, { l: "id", t: {} }, { l: "is", t: { "Add to a project": { v: ["Bæta við verkefni"] }, "Connect items to a project to make them easier to find": { v: ["Tengdu atriði við verkefni til að gera einfaldara að finna þau"] }, "Failed to add the item to the project": { v: ["Mistókst að bæta atriðinu í verkefnið"] }, "Failed to create a project": { v: ["Mistókst að útbúa verkefni"] }, "Failed to rename the project": { v: ["Mistókst að endurnefna verkefnið"] }, "Type to search for existing projects": { v: ["Skrifaðu hér til að leita að fyrirliggjandi verkefnum"] } } }, { l: "it", t: {} }, { l: "ja", t: { "Add to a project": { v: ["プロジェクトに追加する"] }, "Connect items to a project to make them easier to find": { v: ["項目をプロジェクトに接続して検索しやすくする"] }, "Failed to add the item to the project": { v: ["プロジェクトへのアイテムの追加に失敗しました"] }, "Failed to create a project": { v: ["プロジェクトの作成に失敗しました"] }, "Failed to rename the project": { v: ["プロジェクトの名前変更に失敗しました"] }, "Type to search for existing projects": { v: ["既存のプロジェクトを検索するために入力します"] } } }, { l: "ja-JP", t: {} }, { l: "ko", t: { "Add to a project": { v: ["프로젝트에 추가"] }, "Connect items to a project to make them easier to find": { v: ["항목을 더 쉽게 찾을 수 있도록 프로젝트에 연결하세요."] }, "Failed to add the item to the project": { v: ["항목을 프로젝트에 추가하는 데 실패함"] }, "Failed to create a project": { v: ["프로젝트를 만드는 데 실패함"] }, "Failed to rename the project": { v: ["프로젝트의 이름을 바꾸는 데 실패함"] }, "Type to search for existing projects": { v: ["입력하여 프로젝트를 검색"] } } }, { l: "lt-LT", t: {} }, { l: "lv", t: {} }, { l: "mk", t: {} }, { l: "my", t: {} }, { l: "nb", t: { "Add to a project": { v: ["Legge til i et prosjekt"] }, "Connect items to a project to make them easier to find": { v: ["Koble elementer til et prosjekt for å gjøre det enklere å finne dem"] }, "Failed to add the item to the project": { v: ["Kan ikke legge til elementet i prosjektet"] }, "Failed to create a project": { v: ["Kan ikke opprette et prosjekt"] }, "Failed to rename the project": { v: ["Kunne ikke gi prosjektet nytt navn"] }, "Type to search for existing projects": { v: ["Skriv for å søke for eksisterende prosjekter"] } } }, { l: "nl", t: { "Add to a project": { v: ["Toevoegen aan een project"] }, "Connect items to a project to make them easier to find": { v: ["Items aan een project koppelen om ze eenvoudiger te vinden"] }, "Failed to add the item to the project": { v: ["Toevoegen van item aan project mislukt"] }, "Failed to create a project": { v: ["Project aanmaken mislukt"] }, "Failed to rename the project": { v: ["Project hernoemen mislukt"] }, "Type to search for existing projects": { v: ["Typ om te zoeken naar bestaande projecten"] } } }, { l: "oc", t: {} }, { l: "pl", t: { "Add to a project": { v: ["Dodaj do projektu"] }, "Connect items to a project to make them easier to find": { v: ["Połącz elementy z projektem, aby ułatwić ich znalezienie"] }, "Failed to add the item to the project": { v: ["Nie udało się dodać elementu do projektu"] }, "Failed to create a project": { v: ["Nie udało się utworzyć projektu"] }, "Failed to rename the project": { v: ["Nie udało się zmienić nazwy projektu"] }, "Type to search for existing projects": { v: ["Wpisz, aby wyszukać istniejące projekty"] } } }, { l: "pt-BR", t: { "Add to a project": { v: ["Adicionar a um projeto"] }, "Connect items to a project to make them easier to find": { v: ["Conectar itens a um projeto para encontrá-los mais facilmente"] }, "Failed to add the item to the project": { v: ["Falha ao adicionar itens ao projeto"] }, "Failed to create a project": { v: ["Falha ao criar um projeto"] }, "Failed to rename the project": { v: ["Falha ao renomear o projeto"] }, "Type to search for existing projects": { v: ["Digite para pesquisar projetos existentes"] } } }, { l: "pt-PT", t: { "Add to a project": { v: ["Adicionar a um projeto"] }, "Connect items to a project to make them easier to find": { v: ["Ligar itens a um projeto para serem mais facilmente encontrados"] }, "Failed to add the item to the project": { v: ["Não foi possível adicionar item ao projeto"] }, "Failed to create a project": { v: ["Não foi possível criar um projeto"] }, "Failed to rename the project": { v: ["Não foi possível alterar o nome do projeto"] }, "Type to search for existing projects": { v: ["Digite para procurar projetos existentes"] } } }, { l: "ro", t: {} }, { l: "ru", t: { "Add to a project": { v: ["Добавить в проект"] }, "Connect items to a project to make them easier to find": { v: ["Подключайте элементы к проекту, чтобы их было легче найти"] }, "Failed to add the item to the project": { v: ["Не удалось добавить элемент в проект"] }, "Failed to create a project": { v: ["Не удалось создать проект"] }, "Failed to rename the project": { v: ["Не удалось переименовать проект"] }, "Type to search for existing projects": { v: ["Введите для поиска существующих проектов"] } } }, { l: "sk", t: { "Add to a project": { v: ["Pridať do projektu"] }, "Connect items to a project to make them easier to find": { v: ["Pridať položky do projektu pre jednoduchšie vyhľadávanie"] }, "Failed to add the item to the project": { v: ["Nepodarilo sa pridať položku do projektu"] }, "Failed to create a project": { v: ["Nepodarilo sa vytvoriť projekt"] }, "Failed to rename the project": { v: ["Nepodarilo sa premenovať projekt"] }, "Type to search for existing projects": { v: ["Začnite písať pre vyhľadávanie v existujúcich projektoch"] } } }, { l: "sl", t: {} }, { l: "sr", t: { "Add to a project": { v: ["Додај у пројекат"] }, "Connect items to a project to make them easier to find": { v: ["Повезује ставке у пројекат како би се лакше пронашле"] }, "Failed to add the item to the project": { v: ["Није успело додавање ставке у пројекат"] }, "Failed to create a project": { v: ["Није успело креирање пројекта"] }, "Failed to rename the project": { v: ["Није успела промена имена пројекта"] }, "Type to search for existing projects": { v: ["Куцајте да претражите постојеће пројекте"] } } }, { l: "sv", t: { "Add to a project": { v: ["Lägg till i ett projekt"] }, "Connect items to a project to make them easier to find": { v: ["Anslut objekt till ett projekt för att göra dem lättare att hitta"] }, "Failed to add the item to the project": { v: ["Det gick inte att lägga till objektet i projektet"] }, "Failed to create a project": { v: ["Det gick inte att skapa ett projekt"] }, "Failed to rename the project": { v: ["Kunde inte byta namn på projektet"] }, "Type to search for existing projects": { v: ["Skriv för att söka efter befintliga projekt"] } } }, { l: "tr", t: { "Add to a project": { v: ["Bir projeye ekle"] }, "Connect items to a project to make them easier to find": { v: ["Ögeleri daha kolay bulmak için bir proje ile ilişkilendirin"] }, "Failed to add the item to the project": { v: ["Öge projeye eklenemedi"] }, "Failed to create a project": { v: ["Bir proje oluşturulamadı"] }, "Failed to rename the project": { v: ["Proje yeniden adlandırılamadı"] }, "Type to search for existing projects": { v: ["Var olan projeleri aramak için yazmaya başlayın"] } } }, { l: "uk", t: { "Add to a project": { v: ["Додати др проєкту"] }, "Connect items to a project to make them easier to find": { v: ["Приєднайте ресурси до проєкту для швидшого  пошуку"] }, "Failed to add the item to the project": { v: ["Не вдалося приєднати ресурс до проєкту"] }, "Failed to create a project": { v: ["Не вдалося створити проєкт"] }, "Failed to rename the project": { v: ["Не вдалося перейменувати проєкт"] }, "Type to search for existing projects": { v: ["Почніть вводити, щоб знайти проєкт"] } } }, { l: "uz", t: { "Add to a project": { v: ["Loyihaga qo'shish"] }, "Connect items to a project to make them easier to find": { v: ["Elementlarni topishni osonlashtirish uchun ularni loyihaga ulang"] }, "Failed to add the item to the project": { v: ["Ob'ektni loyihaga qo'shib bo'lmadi"] }, "Failed to create a project": { v: ["Loyiha yaratib bo‘lmadi"] }, "Failed to rename the project": { v: ["Loyiha nomini o‘zgartirib bo‘lmadi"] }, "Type to search for existing projects": { v: ["Mavjud loyihalarni qidirish uchun kiriting"] } } }, { l: "zh-CN", t: { "Add to a project": { v: ["添加至一个项目"] }, "Connect items to a project to make them easier to find": { v: ["将条目连接至一个项目以易于查找"] }, "Failed to add the item to the project": { v: ["添加条目至项目失败"] }, "Failed to create a project": { v: ["创建项目失败"] }, "Failed to rename the project": { v: ["重命名项目失败"] }, "Type to search for existing projects": { v: ["输入以搜索现存项目"] } } }, { l: "zh-HK", t: { "Add to a project": { v: ["添加到方案中"] }, "Connect items to a project to make them easier to find": { v: ["將項目連接到方案中，以便更容易找到。"] }, "Failed to add the item to the project": { v: ["無法將項目添加到方案中"] }, "Failed to create a project": { v: ["無法創建方案"] }, "Failed to rename the project": { v: ["無法重命名方案"] }, "Type to search for existing projects": { v: ["輸入以搜索現有方案"] } } }, { l: "zh-TW", t: { "Add to a project": { v: ["新增至專案中"] }, "Connect items to a project to make them easier to find": { v: ["將項目連結至專案中以方便尋找"] }, "Failed to add the item to the project": { v: ["新增項目至專案失敗"] }, "Failed to create a project": { v: ["建立專案失敗"] }, "Failed to rename the project": { v: ["重新命名專案失敗"] }, "Type to search for existing projects": { v: ["輸入以搜尋既有專案"] } } }], b1 = [{ l: "ar", t: { "Any link": { v: ["أيَّ رابط"] } } }, { l: "ast", t: { "Any link": { v: ["Cualesquier enllaz"] } } }, { l: "br", t: {} }, { l: "ca", t: {} }, { l: "cs", t: { "Any link": { v: ["Jakýkoli odkaz"] } } }, { l: "cs-CZ", t: { "Any link": { v: ["Jakýkoli odkaz"] } } }, { l: "da", t: { "Any link": { v: ["Ethvert link"] } } }, { l: "de", t: { "Any link": { v: ["Irgendein Link"] } } }, { l: "de-DE", t: { "Any link": { v: ["Irgendein Link"] } } }, { l: "el", t: { "Any link": { v: ["Οποιοσδήποτε σύνδεσμος"] } } }, { l: "en-GB", t: { "Any link": { v: ["Any link"] } } }, { l: "eo", t: {} }, { l: "es", t: { "Any link": { v: ["Cualquier enlace"] } } }, { l: "es-AR", t: { "Any link": { v: ["Cualquier enlace"] } } }, { l: "es-EC", t: { "Any link": { v: ["Cualquier enlace"] } } }, { l: "es-MX", t: { "Any link": { v: ["Cualquier enlace"] } } }, { l: "et-EE", t: { "Any link": { v: ["Mistahes link"] } } }, { l: "eu", t: { "Any link": { v: ["Edozein esteka"] } } }, { l: "fa", t: { "Any link": { v: ["هر پیوندی"] } } }, { l: "fi", t: { "Any link": { v: ["Mikä tahansa linkki"] } } }, { l: "fr", t: { "Any link": { v: ["N'importe quel lien"] } } }, { l: "ga", t: { "Any link": { v: ["Aon nasc"] } } }, { l: "gl", t: { "Any link": { v: ["Calquera ligazón"] } } }, { l: "he", t: { "Any link": { v: ["קישור כלשהו"] } } }, { l: "hu", t: {} }, { l: "id", t: { "Any link": { v: ["Semua tautan"] } } }, { l: "is", t: { "Any link": { v: ["Einhver tengill"] } } }, { l: "it", t: { "Any link": { v: ["Qualsiasi link"] } } }, { l: "ja", t: { "Any link": { v: ["任意のリンク"] } } }, { l: "ja-JP", t: { "Any link": { v: ["任意のリンク"] } } }, { l: "ko", t: { "Any link": { v: ["아무 링크"] } } }, { l: "lt-LT", t: {} }, { l: "lv", t: {} }, { l: "mk", t: {} }, { l: "my", t: {} }, { l: "nb", t: { "Any link": { v: ["Enhver lenke"] } } }, { l: "nl", t: { "Any link": { v: ["Elke link"] } } }, { l: "oc", t: {} }, { l: "pl", t: { "Any link": { v: ["Dowolny link"] } } }, { l: "pt-BR", t: { "Any link": { v: ["Qualquer link"] } } }, { l: "pt-PT", t: { "Any link": { v: ["Qualquer hiperligação"] } } }, { l: "ro", t: { "Any link": { v: ["Orice link"] } } }, { l: "ru", t: { "Any link": { v: ["Любая ссылка"] } } }, { l: "sk", t: { "Any link": { v: ["Akýkoľvek odkaz"] } } }, { l: "sl", t: {} }, { l: "sr", t: { "Any link": { v: ["Било који линк"] } } }, { l: "sv", t: { "Any link": { v: ["Vilken länk som helst"] } } }, { l: "tr", t: { "Any link": { v: ["Herhangi bir bağlantı"] } } }, { l: "uk", t: { "Any link": { v: ["Будь-яке посилання"] } } }, { l: "uz", t: { "Any link": { v: ["Har qanday havola"] } } }, { l: "zh-CN", t: { "Any link": { v: ["任何链接"] } } }, { l: "zh-HK", t: { "Any link": { v: ["任何連結"] } } }, { l: "zh-TW", t: { "Any link": { v: ["任何連結"] } } }], k1 = [{ l: "ar", t: { "Anything shared with the same group of people will show up here": { v: ["أيّ مادة تمت مشاركتها مع نفس المجموعة من الأشخاص سيتم عرضها هنا"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { v: ["خطأ في الحصول على الموارد ذات الصلة. يرجى الاتصال بمشرف النظام عندك إذا كان لديك أيّ أسئلة."] }, "Related resources": { v: ["مصادر ذات صلة"] } } }, { l: "ast", t: { "Anything shared with the same group of people will show up here": { v: ["Equí va apaecer tolo que compartas col mesmu grupu de persones"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { v: ["Hebo un error al consiguir los recursos rellacionaos. Ponte en contautu col alministrador del sistema si tienes dalguna entruga."] }, "Related resources": { v: ["Recursos rellacionao"] } } }, { l: "br", t: {} }, { l: "ca", t: { "Anything shared with the same group of people will show up here": { v: ["Qualsevol cosa compartida amb el mateix grup de persones es mostrarà aquí"] }, "Related resources": { v: ["Recursos relacionats"] } } }, { l: "cs", t: { "Anything shared with the same group of people will show up here": { v: ["Cokoli nasdíleného stejné skupině lidí se zobrazí zde"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { v: ["Chyba při získávání souvisejících prostředků. Pokud máte jakékoli dotazy, obraťte se na správce vámi využívaného systému."] }, "Related resources": { v: ["Související prostředky"] } } }, { l: "cs-CZ", t: { "Anything shared with the same group of people will show up here": { v: ["Cokoli nasdíleného stejné skupině lidí se zobrazí zde"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { v: ["Chyba při získávání souvisejících prostředků. Pokud máte jakékoli dotazy, obraťte se na správce vámi využívaného systému."] }, "Related resources": { v: ["Související prostředky"] } } }, { l: "da", t: { "Anything shared with the same group of people will show up here": { v: ["Alt der deles med samme gruppe af personer vil vises her"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { v: ["Fejl ved hentning af relaterede ressourcer. Kontakt venligst din systemadministrator, hvis du har spørgsmål."] }, "Related resources": { v: ["Relaterede emner"] } } }, { l: "de", t: { "Anything shared with the same group of people will show up here": { v: ["Alles, das mit derselben Gruppe von Personen geteilt wird, wird hier angezeigt"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { v: ["Fehler beim Abrufen verwandter Ressourcen. Bei Fragen wende dich bitte an deinen Systemadministrator."] }, "Related resources": { v: ["Verwandte Ressourcen"] } } }, { l: "de-DE", t: { "Anything shared with the same group of people will show up here": { v: ["Alles, das mit derselben Gruppe von Personen geteilt wird, wird hier angezeigt"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { v: ["Fehler beim Abrufen verwandter Ressourcen. Bei Fragen wenden Sie sich bitte an Ihre Systemadministration."] }, "Related resources": { v: ["Verwandte Ressourcen"] } } }, { l: "el", t: { "Anything shared with the same group of people will show up here": { v: ["Οτιδήποτε μοιράζεται με την ίδια ομάδα ατόμων θα εμφανίζεται εδώ"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { v: ["Σφάλμα λήψης σχετικών πόρων. Παρακαλούμε επικοινωνήστε με τον διαχειριστή του συστήματός σας εάν έχετε οποιεσδήποτε ερωτήσεις."] }, "Related resources": { v: ["Σχετικοί πόροι"] } } }, { l: "en-GB", t: { "Anything shared with the same group of people will show up here": { v: ["Anything shared with the same group of people will show up here"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { v: ["Error getting related resources. Please contact your system administrator if you have any questions."] }, "Related resources": { v: ["Related resources"] } } }, { l: "eo", t: {} }, { l: "es", t: { "Anything shared with the same group of people will show up here": { v: ["Cualquier cosa que esté compartida con el mismo grupo de personas se mostrará aquí"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { v: ["Error al obtener recursos relacionados. Por favor, contacte a su administrador del sistema si tiene alguna pregunta."] }, "Related resources": { v: ["Recursos relacionados"] } } }, { l: "es-AR", t: { "Anything shared with the same group of people will show up here": { v: ["Cualquier cosa compartida con el mismo grupo de personas aparecerá aquí."] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { v: ["Error al obtener recursos relacionados. Por favor, contacte a su administrador del sistema si tiene alguna pregunta."] }, "Related resources": { v: ["Recursos relacionados"] } } }, { l: "es-EC", t: { "Anything shared with the same group of people will show up here": { v: ["Cualquier cosa compartida con el mismo grupo de personas aparecerá aquí."] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { v: ["Error al obtener recursos relacionados. Por favor, contacta a tu administrador del sistema si tienes alguna pregunta."] }, "Related resources": { v: ["Recursos relacionados"] } } }, { l: "es-MX", t: { "Anything shared with the same group of people will show up here": { v: ["Todo lo que se comparta con el mismo grupo de personas se mostrará aquí"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { v: ["Error al obtener recursos relacionados. Por favor contacte al administrador si tiene alguna pregunta."] }, "Related resources": { v: ["Recursos relacionados"] } } }, { l: "et-EE", t: { "Anything shared with the same group of people will show up here": { v: ["Siin kuvatakse kõik, mida jagatakse sama kasutajagrupiga"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { v: ["Viga seotud ressursside saamisel. Küsimuste korral võtke ühendust oma süsteemiadministraatoriga."] }, "Related resources": { v: ["Seotud ressursid"] } } }, { l: "eu", t: { "Anything shared with the same group of people will show up here": { v: ["Pertsona-talde berarekin partekatutako edozer agertuko da hemen"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { v: ["Errore bat gertatu da erlazionatutako baliabideak eskuratzean. Jarri harremanetan zure sistemaren administratzailearekin galderarik baduzu."] }, "Related resources": { v: ["Erlazionatutako baliabideak"] } } }, { l: "fa", t: { "Anything shared with the same group of people will show up here": { v: ["هر چیزی که با گروه مشابهی هم‌رسانی شود در این قسمت نمایش می‌یابد"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { v: ["خطا در دریافت منابع مرتبط. لطفاً در صورت داشتن هر گونه سؤال با مدیر سیستم خود تماس بگیرید."] }, "Related resources": { v: ["منابع مرتبط"] } } }, { l: "fi", t: { "Anything shared with the same group of people will show up here": { v: ["Kaikki saman ryhmän kesken jaettu näkyy tässä"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { v: ["Virhe resurssien haussa. Ota yhteyttä järjestelmän ylläpitäjään, mikäli sinulla on kysyttävää."] }, "Related resources": { v: ["Liittyvät resurssit"] } } }, { l: "fr", t: { "Anything shared with the same group of people will show up here": { v: ["Tout ce qui est partagé avec le même groupe de personnes apparaîtra ici"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { v: ["Erreur lors de la récupération des ressources liées. Contactez votre administrateur système pour répondre à vos éventuelles questions."] }, "Related resources": { v: ["Ressources liées"] } } }, { l: "ga", t: { "Anything shared with the same group of people will show up here": { v: ["Taispeánfar aon rud a roinntear leis an ngrúpa céanna daoine anseo"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { v: ["Earráid agus acmhainní gaolmhara á bhfáil. Déan teagmháil le riarthóir do chórais má tá aon cheist agat."] }, "Related resources": { v: ["Acmhainní gaolmhara"] } } }, { l: "gl", t: { "Anything shared with the same group of people will show up here": { v: ["Todo o que se comparta co mesmo grupo de persoas aparecerá aquí"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { v: ["Produciuse un erro ao obter os recursos relacionados. Póñase en contacto coa administración do seu sistema se ten algunha dúbida."] }, "Related resources": { v: ["Recursos relacionados"] } } }, { l: "he", t: { "Anything shared with the same group of people will show up here": { v: ["כל מה שמשותף עם אותה קבוצת האנשים יופיע כאן"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { v: ["שגיאה בקבלת המשאבים הקשורים. נא ליצור קשר עם הנהלת המערכת אם יש לך שאלות."] }, "Related resources": { v: ["משאבים קשורים"] } } }, { l: "hu", t: { "Anything shared with the same group of people will show up here": { v: ["Minden, amit ugyanazzal a csoporttal oszt meg, itt fog megjelenni"] }, "Related resources": { v: ["Kapcsolódó erőforrások"] } } }, { l: "id", t: { "Anything shared with the same group of people will show up here": { v: ["Apa pun yang dibagikan dengan grup orang yang sama akan muncul di sini"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { v: ["Kesalahan saat mengambil sumber daya terkait. Hubungi administrator sistem Anda jika ada pertanyaan."] }, "Related resources": { v: ["Sumber daya terkait"] } } }, { l: "is", t: { "Anything shared with the same group of people will show up here": { v: ["Allt sem deilt er með sama hópi fólks mun birtast hér"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { v: ["Villa við að sækja tengd tilföng. Hafðu samband við kerfisstjórann þinn ef þú ert með einhverjar spurningar."] }, "Related resources": { v: ["Tengd tilföng"] } } }, { l: "it", t: { "Anything shared with the same group of people will show up here": { v: ["Tutto ciò che è stato condiviso con lo stesso gruppo di persone viene visualizzato qui"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { v: ["Errore nell'ottenere le risorse correlate. Per qualsiasi domanda, contattare l'amministratore di sistema."] }, "Related resources": { v: ["Risorse correlate"] } } }, { l: "ja", t: { "Anything shared with the same group of people will show up here": { v: ["同じグループで共有しているものは、全てここに表示されます"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { v: ["関連リソースの取得エラー。ご不明な点がございましたら、システム管理者にお問い合わせください。"] }, "Related resources": { v: ["関連リソース"] } } }, { l: "ja-JP", t: { "Anything shared with the same group of people will show up here": { v: ["同じグループで共有しているものは、全てここに表示されます"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { v: ["関連リソースの取得エラー。ご不明な点がございましたら、システム管理者にお問い合わせください。"] }, "Related resources": { v: ["関連リソース"] } } }, { l: "ko", t: { "Anything shared with the same group of people will show up here": { v: ["같은 그룹의 사용자와 공유된 모든 것들이 이곳에 나타납니다."] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { v: ["관련 리소스를 가져오는 중 오류가 발생했습니다. 궁금한 것이 있는 경우 시스템 관리자에게 연락해 주세요."] }, "Related resources": { v: ["관련 리소스"] } } }, { l: "lt-LT", t: {} }, { l: "lv", t: {} }, { l: "mk", t: {} }, { l: "my", t: {} }, { l: "nb", t: { "Anything shared with the same group of people will show up here": { v: ["Alt som er delt med den samme gruppen vil vises her"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { v: ["Feil ved henting av relaterte ressurser. Kontakt systemansvarlig hvis du har spørsmål."] }, "Related resources": { v: ["Relaterte ressurser"] } } }, { l: "nl", t: { "Anything shared with the same group of people will show up here": { v: ["Alles dat gedeeld is met dezelfde groep mensen zal hier getoond worden"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { v: ["Fout bij het ophalen van gerelateerde bronnen. Neem contact op met uw systeembeheerder als u vragen heeft."] }, "Related resources": { v: ["Gerelateerde bronnen"] } } }, { l: "oc", t: {} }, { l: "pl", t: { "Anything shared with the same group of people will show up here": { v: ["Tutaj pojawi się wszystko, co zostało udostępnione tej samej grupie osób"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { v: ["Błąd podczas pobierania powiązanych zasobów. Jeśli masz jakiekolwiek pytania, skontaktuj się z administratorem systemu."] }, "Related resources": { v: ["Powiązane zasoby"] } } }, { l: "pt-BR", t: { "Anything shared with the same group of people will show up here": { v: ["Qualquer coisa compartilhada com o mesmo grupo de pessoas aparecerá aqui"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { v: ["Erro ao obter recursos relacionados. Por favor, entre em contato com o administrador do sistema se tiver alguma dúvida."] }, "Related resources": { v: ["Recursos relacionados"] } } }, { l: "pt-PT", t: { "Anything shared with the same group of people will show up here": { v: ["Qualquer coisa partilhada com o mesmo grupo de pessoas irá aparecer aqui"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { v: ["Erro ao obter os recursos relacionados. Por favor, contacte o administrador do sistema se tiver quaisquer  perguntas."] }, "Related resources": { v: ["Recursos relacionados"] } } }, { l: "ro", t: { "Anything shared with the same group of people will show up here": { v: ["Tot ceea ce este partajat cu același grup de persoane va fi afișat aici"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { v: ["Eroare la preluarea resurselor adiționale. Vă rugăm să contactați administratorul pentru întrebări."] }, "Related resources": { v: ["Resurse legate"] } } }, { l: "ru", t: { "Anything shared with the same group of people will show up here": { v: ["Всё, чем поделились с той же группой людей, будет отображаться здесь"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { v: ["Ошибка при получении связанных ресурсов. Если у вас есть какие-либо вопросы, обратитесь к системному администратору."] }, "Related resources": { v: ["Связанные ресурсы"] } } }, { l: "sk", t: { "Anything shared with the same group of people will show up here": { v: ["Tu sa zobrazí čokoľvek zdieľané s rovnakou skupinou ľudí"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { v: ["Chyba pri získavaní súvisiacich zdrojov. V prípade otázok kontaktujte prosím svojho systemového administrátora."] }, "Related resources": { v: ["Súvisiace zdroje"] } } }, { l: "sl", t: { "Related resources": { v: ["Povezani viri"] } } }, { l: "sr", t: { "Anything shared with the same group of people will show up here": { v: ["Све што се дели са истом групом људи ће се појавити овде"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { v: ["Грешка код прибављања везаних ресурса. Молимо вас да се обратите администратору ако имате питања."] }, "Related resources": { v: ["Повезани ресурси"] } } }, { l: "sv", t: { "Anything shared with the same group of people will show up here": { v: ["Något som delats med samma grupp av personer kommer att visas här"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { v: ["Det gick inte att hämta relaterade resurser. Kontakta din systemadministratör om du har några frågor."] }, "Related resources": { v: ["Relaterade resurser"] } } }, { l: "tr", t: { "Anything shared with the same group of people will show up here": { v: ["Aynı kişi grubu ile paylaşılan herşey burada görüntülenir"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { v: ["İlgili kaynaklara ulaşılırken sorun çıktı. Herhangi bir sorunuz varsa lütfen sistem yöneticiniz ile görüşün "] }, "Related resources": { v: ["İlgili kaynaklar"] } } }, { l: "uk", t: { "Anything shared with the same group of people will show up here": { v: ["Будь-що доступне для цієї же групи людей буде показано тут"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { v: ["Помилка під час отримання пов'язаних ресурсів. Будь ласка, сконтактуйте з системним адміністратором, якщо у вас виникли запитання."] }, "Related resources": { v: ["Пов'язані ресурси"] } } }, { l: "uz", t: { "Anything shared with the same group of people will show up here": { v: ["Xuddi shu guruhdagi odamlarga ulashilgan hamma narsa shu yerda chiqadi"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { v: ["Tegishli manbalarni olishda xatolik yuz berdi. Savollaringiz bo'lsa, tizim administratoriga murojaat qiling."] }, "Related resources": { v: ["Tegishli manbalar"] } } }, { l: "zh-CN", t: { "Anything shared with the same group of people will show up here": { v: ["与同组用户分享的所有内容都会显示于此"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { v: ["获取相关资源出现错误。如果你有任何问题，请联系系统管理员。"] }, "Related resources": { v: ["相关资源"] } } }, { l: "zh-HK", t: { "Anything shared with the same group of people will show up here": { v: ["與同一組人共享的任何內容都會顯示在此處"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { v: ["取得相關資源時發生錯誤。如果有任何問題，請聯絡系統管理員。"] }, "Related resources": { v: ["相關資源"] } } }, { l: "zh-TW", t: { "Anything shared with the same group of people will show up here": { v: ["與相同群組分享的所有內容都會顯示於此"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { v: ["取得相關資源時發生錯誤。如果有任何問題，請聯絡系統管理員。"] }, "Related resources": { v: ["相關資源"] } } }], w1 = [{ l: "ar", t: { "Avatar of {displayName}": { v: ["صورة الملف الشخصي الرمزية لــ {displayName}  "] }, "Avatar of {displayName}, {status}": { v: ["صورة الملف الشخصي الرمزية لــ {displayName}، {status}"] } } }, { l: "ast", t: { "Avatar of {displayName}": { v: ["Avatar de: {displayName}"] }, "Avatar of {displayName}, {status}": { v: ["Avatar de: {displayName}, {status}"] } } }, { l: "br", t: {} }, { l: "ca", t: { "Avatar of {displayName}": { v: ["Avatar de {displayName}"] }, "Avatar of {displayName}, {status}": { v: ["Avatar de {displayName}, {status}"] } } }, { l: "cs", t: { "Avatar of {displayName}": { v: ["Zástupný obrázek uživatele {displayName}"] }, "Avatar of {displayName}, {status}": { v: ["Zástupný obrázek uživatele {displayName}, {status}"] } } }, { l: "cs-CZ", t: { "Avatar of {displayName}": { v: ["Zástupný obrázek uživatele {displayName}"] }, "Avatar of {displayName}, {status}": { v: ["Zástupný obrázek uživatele {displayName}, {status}"] } } }, { l: "da", t: { "Avatar of {displayName}": { v: ["Avatar af {displayName}"] }, "Avatar of {displayName}, {status}": { v: ["Avatar af {displayName}, {status}"] } } }, { l: "de", t: { "Avatar of {displayName}": { v: ["Avatar von {displayName}"] }, "Avatar of {displayName}, {status}": { v: ["Avatar von {displayName}, {status}"] } } }, { l: "de-DE", t: { "Avatar of {displayName}": { v: ["Avatar von {displayName}"] }, "Avatar of {displayName}, {status}": { v: ["Avatar von {displayName}, {status}"] } } }, { l: "el", t: { "Avatar of {displayName}": { v: ["Άβαταρ του {displayName}"] }, "Avatar of {displayName}, {status}": { v: ["Άβαταρ του {displayName}, {status}"] } } }, { l: "en-GB", t: { "Avatar of {displayName}": { v: ["Avatar of {displayName}"] }, "Avatar of {displayName}, {status}": { v: ["Avatar of {displayName}, {status}"] } } }, { l: "eo", t: {} }, { l: "es", t: { "Avatar of {displayName}": { v: ["Avatar de {displayName}"] }, "Avatar of {displayName}, {status}": { v: ["Avatar de {displayName}, {status}"] } } }, { l: "es-AR", t: { "Avatar of {displayName}": { v: ["Avatar de {displayName}"] }, "Avatar of {displayName}, {status}": { v: ["Avatar de {displayName}, {status}"] } } }, { l: "es-EC", t: { "Avatar of {displayName}": { v: ["Avatar de {displayName}"] }, "Avatar of {displayName}, {status}": { v: ["Avatar de {displayName}, {status}"] } } }, { l: "es-MX", t: { "Avatar of {displayName}": { v: ["Avatar de {displayName}"] }, "Avatar of {displayName}, {status}": { v: ["Avatar de {displayName}, {status}"] } } }, { l: "et-EE", t: { "Avatar of {displayName}": { v: ["Avatar {displayName}"] }, "Avatar of {displayName}, {status}": { v: ["Avatar {displayName}, {status}"] } } }, { l: "eu", t: { "Avatar of {displayName}": { v: ["{displayName}-(e)n irudia"] }, "Avatar of {displayName}, {status}": { v: ["{displayName} -(e)n irudia, {status}"] } } }, { l: "fa", t: { "Avatar of {displayName}": { v: ["آواتار {displayName}"] }, "Avatar of {displayName}, {status}": { v: ["آواتار {displayName} ، {status}"] } } }, { l: "fi", t: { "Avatar of {displayName}": { v: ["{displayName}n avatar"] }, "Avatar of {displayName}, {status}": { v: ["{displayName}n avatar, {status}"] } } }, { l: "fr", t: { "Avatar of {displayName}": { v: ["Avatar de {displayName}"] }, "Avatar of {displayName}, {status}": { v: ["Avatar de {displayName}, {status}"] } } }, { l: "ga", t: { "Avatar of {displayName}": { v: ["Avatar de {displayName}"] }, "Avatar of {displayName}, {status}": { v: ["Avatar de {displayName}, {status}"] } } }, { l: "gl", t: { "Avatar of {displayName}": { v: ["Avatar de {displayName}"] }, "Avatar of {displayName}, {status}": { v: ["Avatar de {displayName}, {status}"] } } }, { l: "he", t: { "Avatar of {displayName}": { v: ["תמונה ייצוגית של {displayName}"] }, "Avatar of {displayName}, {status}": { v: ["תמונה ייצוגית של {displayName}, {status}"] } } }, { l: "hu", t: { "Avatar of {displayName}": { v: ["{displayName} profilképe"] }, "Avatar of {displayName}, {status}": { v: ["{displayName} profilképe, {status}"] } } }, { l: "id", t: { "Avatar of {displayName}": { v: ["Avatar {displayName}"] }, "Avatar of {displayName}, {status}": { v: ["Avatar {displayName}, {status}"] } } }, { l: "is", t: { "Avatar of {displayName}": { v: ["Auðkennismynd fyrir {displayName}"] }, "Avatar of {displayName}, {status}": { v: ["Auðkennismynd fyrir {displayName}, {status}"] } } }, { l: "it", t: { "Avatar of {displayName}": { v: ["Avatar di {displayName}"] }, "Avatar of {displayName}, {status}": { v: ["Avatar di {displayName}, {status}"] } } }, { l: "ja", t: { "Avatar of {displayName}": { v: ["{displayName} のアバター"] }, "Avatar of {displayName}, {status}": { v: ["{displayName}, {status} のアバター"] } } }, { l: "ja-JP", t: { "Avatar of {displayName}": { v: ["{displayName} のアバター"] }, "Avatar of {displayName}, {status}": { v: ["{displayName}, {status} のアバター"] } } }, { l: "ko", t: { "Avatar of {displayName}": { v: ["{displayName}님의 아바타"] }, "Avatar of {displayName}, {status}": { v: ["{displayName}, {status}님의 아바타"] } } }, { l: "lt-LT", t: {} }, { l: "lv", t: {} }, { l: "mk", t: { "Avatar of {displayName}": { v: ["Аватар на {displayName}"] }, "Avatar of {displayName}, {status}": { v: ["Аватар на {displayName}, {status}"] } } }, { l: "my", t: { "Avatar of {displayName}": { v: ["{displayName} ၏ ကိုယ်ပွား"] } } }, { l: "nb", t: { "Avatar of {displayName}": { v: ["Avataren til {displayName}"] }, "Avatar of {displayName}, {status}": { v: ["{displayName}'s avatar, {status}"] } } }, { l: "nl", t: { "Avatar of {displayName}": { v: ["Avatar van {displayName}"] }, "Avatar of {displayName}, {status}": { v: ["Avatar van {displayName}, {status}"] } } }, { l: "oc", t: {} }, { l: "pl", t: { "Avatar of {displayName}": { v: ["Awatar {displayName}"] }, "Avatar of {displayName}, {status}": { v: ["Awatar {displayName}, {status}"] } } }, { l: "pt-BR", t: { "Avatar of {displayName}": { v: ["Avatar de {displayName}"] }, "Avatar of {displayName}, {status}": { v: ["Avatar de {displayName}, {status}"] } } }, { l: "pt-PT", t: { "Avatar of {displayName}": { v: ["Avatar de {displayName}"] }, "Avatar of {displayName}, {status}": { v: ["Avatar de {displayName}, {status}"] } } }, { l: "ro", t: { "Avatar of {displayName}": { v: ["Avatarul lui {displayName}"] }, "Avatar of {displayName}, {status}": { v: ["Avatarul lui {displayName}, {status}"] } } }, { l: "ru", t: { "Avatar of {displayName}": { v: ["Аватар {displayName}"] }, "Avatar of {displayName}, {status}": { v: ["Фотография {displayName}, {status}"] } } }, { l: "sk", t: { "Avatar of {displayName}": { v: ["Avatar {displayName}"] }, "Avatar of {displayName}, {status}": { v: ["Avatar {displayName}, {status}"] } } }, { l: "sl", t: { "Avatar of {displayName}": { v: ["Podoba {displayName}"] }, "Avatar of {displayName}, {status}": { v: ["Prikazna slika {displayName}, {status}"] } } }, { l: "sr", t: { "Avatar of {displayName}": { v: ["Аватар за {displayName}"] }, "Avatar of {displayName}, {status}": { v: ["Avatar za {displayName}, {status}"] } } }, { l: "sv", t: { "Avatar of {displayName}": { v: ["{displayName}s avatar"] }, "Avatar of {displayName}, {status}": { v: ["{displayName}s avatar, {status}"] } } }, { l: "tr", t: { "Avatar of {displayName}": { v: ["{displayName} avatarı"] }, "Avatar of {displayName}, {status}": { v: ["{displayName}, {status} avatarı"] } } }, { l: "uk", t: { "Avatar of {displayName}": { v: ["Аватар {displayName}"] }, "Avatar of {displayName}, {status}": { v: ["Аватар {displayName}, {status}"] } } }, { l: "uz", t: { "Avatar of {displayName}": { v: [" {displayName}Avatari"] }, "Avatar of {displayName}, {status}": { v: ["{displayName}, {status} Avatari"] } } }, { l: "zh-CN", t: { "Avatar of {displayName}": { v: ["{displayName}的头像"] }, "Avatar of {displayName}, {status}": { v: ["{displayName}的头像，{status}"] } } }, { l: "zh-HK", t: { "Avatar of {displayName}": { v: ["{displayName} 的頭像"] }, "Avatar of {displayName}, {status}": { v: ["{displayName} 的頭像，{status}"] } } }, { l: "zh-TW", t: { "Avatar of {displayName}": { v: ["{displayName} 的大頭照"] }, "Avatar of {displayName}, {status}": { v: ["{displayName}, {status} 的大頭照"] } } }], S1 = [{ l: "ar", t: { away: { v: ["غير موجود"] }, busy: { v: ["مشغول"] }, "do not disturb": { v: ["يُرجى عدم الإزعاج"] }, invisible: { v: ["غير مرئي"] }, offline: { v: ["غير متصل"] }, online: { v: ["متصل"] } } }, { l: "ast", t: { away: { v: ["ausente"] }, busy: { v: ["ocupáu"] }, "do not disturb": { v: ["nun molestar"] }, invisible: { v: ["invisible"] }, offline: { v: ["desconectáu"] }, online: { v: ["en llinia"] } } }, { l: "br", t: {} }, { l: "ca", t: {} }, { l: "cs", t: { away: { v: ["pryč"] }, busy: { v: ["zaneprádněn(a)"] }, "do not disturb": { v: ["nerušit"] }, invisible: { v: ["neviditelné"] }, offline: { v: ["offline"] }, online: { v: ["online"] } } }, { l: "cs-CZ", t: { away: { v: ["pryč"] }, busy: { v: ["zaneprádněn(a)"] }, "do not disturb": { v: ["nerušit"] }, invisible: { v: ["neviditelné"] }, offline: { v: ["offline"] }, online: { v: ["online"] } } }, { l: "da", t: { away: { v: ["væk"] }, busy: { v: ["optaget"] }, "do not disturb": { v: ["forstyr ikke"] }, invisible: { v: ["usynlig"] }, offline: { v: ["offline"] }, online: { v: ["online"] } } }, { l: "de", t: { away: { v: ["Abwesend"] }, busy: { v: ["Beschäftigt"] }, "do not disturb": { v: ["Bitte nicht stören"] }, invisible: { v: ["Unsichtbar"] }, offline: { v: ["Offline"] }, online: { v: ["Online"] } } }, { l: "de-DE", t: { away: { v: ["Abwesend"] }, busy: { v: ["Beschäftigt"] }, "do not disturb": { v: ["Bitte nicht stören"] }, invisible: { v: ["Unsichtbar"] }, offline: { v: ["Offline"] }, online: { v: ["Online"] } } }, { l: "el", t: { away: { v: ["μακριά"] }, busy: { v: ["απασχολημένος"] }, "do not disturb": { v: ["μην ενοχλείτε"] }, invisible: { v: ["αόρατο"] }, offline: { v: ["εκτός σύνδεσης"] }, online: { v: ["συνδεδεμένος"] } } }, { l: "en-GB", t: { away: { v: ["away"] }, busy: { v: ["busy"] }, "do not disturb": { v: ["do not disturb"] }, invisible: { v: ["invisible"] }, offline: { v: ["offline"] }, online: { v: ["online"] } } }, { l: "eo", t: {} }, { l: "es", t: { away: { v: ["ausente"] }, busy: { v: ["ocupado"] }, "do not disturb": { v: ["no molestar"] }, invisible: { v: ["invisible"] }, offline: { v: ["fuera de línea"] }, online: { v: ["en línea"] } } }, { l: "es-AR", t: { away: { v: ["ausente"] }, busy: { v: ["ocupado"] }, "do not disturb": { v: ["no molestar"] }, invisible: { v: ["invisible"] }, offline: { v: ["desconectado"] }, online: { v: ["en línea"] } } }, { l: "es-EC", t: {} }, { l: "es-MX", t: { away: { v: ["ausente"] }, busy: { v: ["ocupado"] }, "do not disturb": { v: ["no molestar"] }, invisible: { v: ["invisible"] }, offline: { v: ["fuera de línea"] }, online: { v: ["en línea"] } } }, { l: "et-EE", t: { away: { v: ["eemal"] }, busy: { v: ["hõivatud"] }, "do not disturb": { v: ["ära sega"] }, invisible: { v: ["nähtamatu"] }, offline: { v: ["pole võrgus"] }, online: { v: ["võrgus"] } } }, { l: "eu", t: {} }, { l: "fa", t: { away: { v: ["دور از دستگاه"] }, busy: { v: ["مشغول"] }, "do not disturb": { v: ["مزاحم نشوید"] }, invisible: { v: ["مخفی"] }, offline: { v: ["برون‌خط"] }, online: { v: ["برخط"] } } }, { l: "fi", t: { away: { v: ["poissa"] }, busy: { v: ["varattu"] }, "do not disturb": { v: ["älä häiritse"] }, invisible: { v: ["näkymätön"] }, offline: { v: ["ei linjalla"] }, online: { v: ["linjalla"] } } }, { l: "fr", t: { away: { v: ["absent"] }, busy: { v: ["occupé"] }, "do not disturb": { v: ["ne pas déranger"] }, invisible: { v: ["invisible"] }, offline: { v: ["hors ligne"] }, online: { v: ["en ligne"] } } }, { l: "ga", t: { away: { v: ["ar shiúl"] }, busy: { v: ["gnóthach"] }, "do not disturb": { v: ["ná cur as"] }, invisible: { v: ["dofheicthe"] }, offline: { v: ["as líne"] }, online: { v: ["ar líne"] } } }, { l: "gl", t: { away: { v: ["ausente"] }, busy: { v: ["ocupado"] }, "do not disturb": { v: ["non molestar"] }, invisible: { v: ["invisíbel"] }, offline: { v: ["desconectado"] }, online: { v: ["conectado"] } } }, { l: "he", t: {} }, { l: "hu", t: {} }, { l: "id", t: { away: { v: ["tidak tersedia"] }, "do not disturb": { v: ["jangan ganggu"] }, offline: { v: ["luring"] }, online: { v: ["daring"] } } }, { l: "is", t: { away: { v: ["í burtu"] }, busy: { v: ["upptekin/n"] }, "do not disturb": { v: ["ekki ónáða"] }, invisible: { v: ["ósýnilegt"] }, offline: { v: ["ónettengt"] }, online: { v: ["nettengt"] } } }, { l: "it", t: { away: { v: ["via"] }, "do not disturb": { v: ["non disturbare"] }, offline: { v: ["offline"] }, online: { v: ["online"] } } }, { l: "ja", t: { away: { v: ["離れる"] }, busy: { v: ["ビジー"] }, "do not disturb": { v: ["邪魔をしないでください"] }, invisible: { v: ["不可視"] }, offline: { v: ["オフライン"] }, online: { v: ["オンライン"] } } }, { l: "ja-JP", t: { away: { v: ["離れる"] }, busy: { v: ["ビジー"] }, "do not disturb": { v: ["邪魔をしないでください"] }, invisible: { v: ["不可視"] }, offline: { v: ["オフライン"] }, online: { v: ["オンライン"] } } }, { l: "ko", t: { away: { v: ["자리 비움"] }, busy: { v: ["바쁨"] }, "do not disturb": { v: ["방해 금지"] }, invisible: { v: ["보이지 않음"] }, offline: { v: ["오프라인"] }, online: { v: ["온라인"] } } }, { l: "lt-LT", t: {} }, { l: "lv", t: {} }, { l: "mk", t: {} }, { l: "my", t: {} }, { l: "nb", t: { away: { v: ["borte"] }, busy: { v: ["opptatt"] }, "do not disturb": { v: ["ikke forstyrr"] }, invisible: { v: ["usynlig"] }, offline: { v: ["frakoblet"] }, online: { v: ["tilkoblet"] } } }, { l: "nl", t: { away: { v: ["weg"] }, busy: { v: ["bezig"] }, "do not disturb": { v: ["niet storen"] }, invisible: { v: ["Onzichtbaar"] }, offline: { v: ["offline"] }, online: { v: ["online"] } } }, { l: "oc", t: {} }, { l: "pl", t: { away: { v: ["stąd"] }, busy: { v: ["zajęty"] }, "do not disturb": { v: ["nie przeszkadzać"] }, invisible: { v: ["niewidzialny"] }, offline: { v: ["offline"] }, online: { v: ["online"] } } }, { l: "pt-BR", t: { away: { v: ["ausente"] }, busy: { v: ["ocupado"] }, "do not disturb": { v: ["não perturbe"] }, invisible: { v: ["invisível"] }, offline: { v: ["off-line"] }, online: { v: ["on-line"] } } }, { l: "pt-PT", t: { away: { v: ["longe"] }, busy: { v: ["ocupado"] }, "do not disturb": { v: ["não incomodar"] }, invisible: { v: ["invisível"] }, offline: { v: ["offline"] }, online: { v: ["online"] } } }, { l: "ro", t: { away: { v: ["plecat"] }, "do not disturb": { v: ["nu deranjați"] }, offline: { v: ["deconectat"] }, online: { v: ["online"] } } }, { l: "ru", t: { away: { v: ["отсутствие"] }, busy: { v: ["занятый"] }, "do not disturb": { v: ["не беспокоить"] }, invisible: { v: ["невидимый"] }, offline: { v: ["офлайн"] }, online: { v: ["онлайн"] } } }, { l: "sk", t: { away: { v: ["neprítomný"] }, busy: { v: ["zaneprázdnený"] }, "do not disturb": { v: ["nerušiť"] }, invisible: { v: ["neviditeľný"] }, offline: { v: ["Odpojený - offline"] }, online: { v: ["Pripojený - online"] } } }, { l: "sl", t: {} }, { l: "sr", t: { away: { v: ["одсутан"] }, busy: { v: ["заузет"] }, "do not disturb": { v: ["не узнемиравај"] }, invisible: { v: ["невидљиво"] }, offline: { v: ["ван мреже"] }, online: { v: ["на мрежи"] } } }, { l: "sv", t: { away: { v: ["borta"] }, busy: { v: ["upptagen"] }, "do not disturb": { v: ["stör ej"] }, invisible: { v: ["osynlig"] }, offline: { v: ["offline"] }, online: { v: ["online"] } } }, { l: "tr", t: { away: { v: ["Uzakta"] }, busy: { v: ["Meşgul"] }, "do not disturb": { v: ["Rahatsız etmeyin"] }, invisible: { v: ["görünmez"] }, offline: { v: ["Çevrim dışı"] }, online: { v: ["Çevrim içi"] } } }, { l: "uk", t: { away: { v: ["відсутній"] }, busy: { v: ["зайнято"] }, "do not disturb": { v: ["не турбувати"] }, invisible: { v: ["Невидимий"] }, offline: { v: ["не в мережі"] }, online: { v: ["в мережі"] } } }, { l: "uz", t: { away: { v: ["uzoqda"] }, busy: { v: ["band"] }, "do not disturb": { v: ["bezovta qilmang"] }, invisible: { v: ["ko'rinmas"] }, offline: { v: ["offline"] }, online: { v: ["online"] } } }, { l: "zh-CN", t: { away: { v: ["离开"] }, busy: { v: ["繁忙"] }, "do not disturb": { v: ["请勿打扰"] }, invisible: { v: ["隐藏的"] }, offline: { v: ["离线"] }, online: { v: ["在线"] } } }, { l: "zh-HK", t: { away: { v: ["離開"] }, busy: { v: ["忙碌"] }, "do not disturb": { v: ["請勿打擾"] }, invisible: { v: ["隐藏的"] }, offline: { v: ["離線"] }, online: { v: ["在線"] } } }, { l: "zh-TW", t: { away: { v: ["離開"] }, busy: { v: ["忙碌"] }, "do not disturb": { v: ["請勿打擾"] }, invisible: { v: ["不可見"] }, offline: { v: ["離線"] }, online: { v: ["線上"] } } }], E1 = [{ l: "ar", t: { "Back to provider selection": { v: ["عودة إلى اختيار المزوّد"] }, "Close Smart Picker": { v: ["إغلاق المحدد الذكي"] }, "Smart Picker": { v: ["اللاقط الذكي smart picker"] } } }, { l: "ast", t: { "Back to provider selection": { v: ["Volver a la seleición de fornidores"] }, "Close Smart Picker": { v: ["Zarrar la seleición intelixente"] }, "Smart Picker": { v: ["Selector intelixente"] } } }, { l: "br", t: {} }, { l: "ca", t: {} }, { l: "cs", t: { "Back to provider selection": { v: ["Zpět na výběr poskytovatele"] }, "Close Smart Picker": { v: ["Zavřít inteligentní výběr"] }, "Smart Picker": { v: ["Inteligentní výběr"] } } }, { l: "cs-CZ", t: { "Back to provider selection": { v: ["Zpět na výběr poskytovatele"] }, "Close Smart Picker": { v: ["Zavřít inteligentní výběr"] }, "Smart Picker": { v: ["Inteligentní výběr"] } } }, { l: "da", t: { "Back to provider selection": { v: ["Tilbage til udbydervalg"] }, "Close Smart Picker": { v: ["Luk Smart Vælger"] }, "Smart Picker": { v: ["Smart Vælger"] } } }, { l: "de", t: { "Back to provider selection": { v: ["Zurück zur Anbieterauswahl"] }, "Close Smart Picker": { v: ["Smart Picker schließen"] }, "Smart Picker": { v: ["Smart Picker"] } } }, { l: "de-DE", t: { "Back to provider selection": { v: ["Zurück zur Anbieterauswahl"] }, "Close Smart Picker": { v: ["Smart Picker schließen"] }, "Smart Picker": { v: ["Smart Picker"] } } }, { l: "el", t: { "Back to provider selection": { v: ["Επιστροφή στην επιλογή παρόχου"] }, "Close Smart Picker": { v: ["Κλείσιμο Έξυπνης Επιλογής"] }, "Smart Picker": { v: ["Έξυπνη Επιλογή"] } } }, { l: "en-GB", t: { "Back to provider selection": { v: ["Back to provider selection"] }, "Close Smart Picker": { v: ["Close Smart Picker"] }, "Smart Picker": { v: ["Smart Picker"] } } }, { l: "eo", t: {} }, { l: "es", t: { "Back to provider selection": { v: ["Volver a la selección de proveedor"] }, "Close Smart Picker": { v: ["Cerrar selector inteligente"] }, "Smart Picker": { v: ["Selector inteligente"] } } }, { l: "es-AR", t: { "Back to provider selection": { v: ["Volver a la selección de proveedor"] }, "Close Smart Picker": { v: ["Cerrar selector inteligente"] }, "Smart Picker": { v: ["Selector inteligente"] } } }, { l: "es-EC", t: { "Back to provider selection": { v: ["Volver a la selección de proveedor"] }, "Close Smart Picker": { v: ["Cerrar selector inteligente"] }, "Smart Picker": { v: ["Selector inteligente"] } } }, { l: "es-MX", t: { "Back to provider selection": { v: ["Volver a la selección de proveedor"] }, "Close Smart Picker": { v: ["Cerrar selector inteligente"] }, "Smart Picker": { v: ["Selector inteligente"] } } }, { l: "et-EE", t: { "Back to provider selection": { v: ["Tagasi teenusepakkuja valiku juurde"] }, "Close Smart Picker": { v: ["Sulge nutikas valija"] }, "Smart Picker": { v: ["Nutikas valija"] } } }, { l: "eu", t: { "Back to provider selection": { v: ["Itzuli hornitzaileen hautapenera"] }, "Close Smart Picker": { v: ["Itxi hautatzaile adimenduna"] }, "Smart Picker": { v: ["Hautatzaile adimenduna"] } } }, { l: "fa", t: { "Back to provider selection": { v: ["بازگشت به انتخاب ارائه دهنده"] }, "Close Smart Picker": { v: ["بستن انتخاب‌گر هوشمند"] }, "Smart Picker": { v: ["انتخابگر هوشمند"] } } }, { l: "fi", t: { "Back to provider selection": { v: ["Takaisin toimittajavalintaan"] }, "Close Smart Picker": { v: ["Sulje älykas valitsin"] }, "Smart Picker": { v: ["Älykäs valitsin"] } } }, { l: "fr", t: { "Back to provider selection": { v: ["Revenir à la sélection du fournisseur"] }, "Close Smart Picker": { v: ["Fermer le sélecteur intelligent"] }, "Smart Picker": { v: ["Sélecteur intelligent"] } } }, { l: "ga", t: { "Back to provider selection": { v: ["Ar ais go roghnú soláthróra"] }, "Close Smart Picker": { v: ["Dún Piocálaí Cliste"] }, "Smart Picker": { v: ["Roghnóir Cliste"] } } }, { l: "gl", t: { "Back to provider selection": { v: ["Volver á selección do provedor"] }, "Close Smart Picker": { v: ["Pechar o Selector intelixente"] }, "Smart Picker": { v: ["Selector intelixente"] } } }, { l: "he", t: { "Back to provider selection": { v: ["חזרה לבחירת ספק"] }, "Close Smart Picker": { v: ["סגירת הבורר החכם"] }, "Smart Picker": { v: ["בורר חכם"] } } }, { l: "hu", t: {} }, { l: "id", t: { "Back to provider selection": { v: ["Kembali ke pemilihan penyedia"] }, "Close Smart Picker": { v: ["Tutup Pemilih Cerdas"] }, "Smart Picker": { v: ["Pemilih Cerdas"] } } }, { l: "is", t: { "Back to provider selection": { v: ["Til baka í val á þjónustuveitu"] }, "Close Smart Picker": { v: ["Loka snjall-veljara"] }, "Smart Picker": { v: ["Snjall-veljari"] } } }, { l: "it", t: { "Back to provider selection": { v: ["Torna alla selezione del provider"] }, "Close Smart Picker": { v: ["Chiudere lo Smart Picker"] }, "Smart Picker": { v: ["Picker intelligente"] } } }, { l: "ja", t: { "Back to provider selection": { v: ["プロバイダーの選択に戻る"] }, "Close Smart Picker": { v: ["スマートピッカーを閉じる"] }, "Smart Picker": { v: ["スマートピッカー"] } } }, { l: "ja-JP", t: { "Back to provider selection": { v: ["プロバイダーの選択に戻る"] }, "Close Smart Picker": { v: ["スマートピッカーを閉じる"] }, "Smart Picker": { v: ["スマートピッカー"] } } }, { l: "ko", t: { "Back to provider selection": { v: ["제공자 선택으로 돌아가기"] }, "Close Smart Picker": { v: ["스마트 선택기 닫기"] }, "Smart Picker": { v: ["스마트 선택기"] } } }, { l: "lt-LT", t: {} }, { l: "lv", t: {} }, { l: "mk", t: {} }, { l: "my", t: {} }, { l: "nb", t: { "Back to provider selection": { v: ["Tilbake til leverandørvalg"] }, "Close Smart Picker": { v: ["Lukk Smart Velger"] }, "Smart Picker": { v: ["Smart Velger"] } } }, { l: "nl", t: { "Back to provider selection": { v: ["Terug naar provider selectie"] }, "Close Smart Picker": { v: ["Slimme Kiezer sluiten"] }, "Smart Picker": { v: ["Slimme Kiezer"] } } }, { l: "oc", t: {} }, { l: "pl", t: { "Back to provider selection": { v: ["Powrót do wyboru dostawcy"] }, "Close Smart Picker": { v: ["Zamknij inteligentny selektor"] }, "Smart Picker": { v: ["Inteligentne wybieranie"] } } }, { l: "pt-BR", t: { "Back to provider selection": { v: ["Voltar para seleção de provedor"] }, "Close Smart Picker": { v: ["Fechar Seletor Inteligente"] }, "Smart Picker": { v: ["Seletor Inteligente"] } } }, { l: "pt-PT", t: { "Back to provider selection": { v: ["Voltar à seleção de fornecedor"] }, "Close Smart Picker": { v: ['Fechar "Smart Picker"'] }, "Smart Picker": { v: ["Smart Picker"] } } }, { l: "ro", t: { "Back to provider selection": { v: ["Înapoi la selecția providerului"] }, "Close Smart Picker": { v: ["Închide Smart Picker"] }, "Smart Picker": { v: ["Smart Picker"] } } }, { l: "ru", t: { "Back to provider selection": { v: ["Вернуться к выбору провайдера"] }, "Close Smart Picker": { v: ["Закрыть интеллектуальный выбор"] }, "Smart Picker": { v: ["Умный выбор"] } } }, { l: "sk", t: { "Back to provider selection": { v: ["Späť na výber poskytovateľa"] }, "Close Smart Picker": { v: ["Zavrieť inteligentný výber"] }, "Smart Picker": { v: ["Inteligentný výber"] } } }, { l: "sl", t: {} }, { l: "sr", t: { "Back to provider selection": { v: ["Назад на избор пружаоца"] }, "Close Smart Picker": { v: ["Затвори паметни бирач"] }, "Smart Picker": { v: ["Паметни бирач"] } } }, { l: "sv", t: { "Back to provider selection": { v: ["Tillbaka till leverantörsval"] }, "Close Smart Picker": { v: ["Stäng Smart Picker"] }, "Smart Picker": { v: ["Smart Picker"] } } }, { l: "tr", t: { "Back to provider selection": { v: ["Hizmet sağlayıcı seçimine dön"] }, "Close Smart Picker": { v: ["Akıllı seçimi kapat"] }, "Smart Picker": { v: ["Akıllı seçim"] } } }, { l: "uk", t: { "Back to provider selection": { v: ["Назад до вибору постачальника"] }, "Close Smart Picker": { v: ["Закрити асистент вибору"] }, "Smart Picker": { v: ["Асистент вибору"] } } }, { l: "uz", t: { "Back to provider selection": { v: ["Provayder tanloviga qaytish"] }, "Close Smart Picker": { v: ["Smart Picker-ni yoping"] }, "Smart Picker": { v: ["Aqlli tanlovchi"] } } }, { l: "zh-CN", t: { "Back to provider selection": { v: ["返回至提供者选择列表"] }, "Close Smart Picker": { v: ["关闭智能拾取器"] }, "Smart Picker": { v: ["智能拾取器"] } } }, { l: "zh-HK", t: { "Back to provider selection": { v: ["回到提供者選擇"] }, "Close Smart Picker": { v: ["關閉 Smart Picker"] }, "Smart Picker": { v: ["Smart Picker"] } } }, { l: "zh-TW", t: { "Back to provider selection": { v: ["回到提供者選擇"] }, "Close Smart Picker": { v: ["關閉智慧型挑選器"] }, "Smart Picker": { v: ["智慧型挑選器"] } } }], A1 = [{ l: "ar", t: { "Cancel changes": { v: ["إلغاء التغييرات"] }, "Confirm changes": { v: ["تأكيد التغييرات"] } } }, { l: "ast", t: { "Cancel changes": { v: ["Encaboxar los cambeos"] }, "Confirm changes": { v: ["Confirmar los cambeos"] } } }, { l: "br", t: {} }, { l: "ca", t: { "Cancel changes": { v: ["Cancel·la els canvis"] }, "Confirm changes": { v: ["Confirmeu els canvis"] } } }, { l: "cs", t: { "Cancel changes": { v: ["Zrušit změny"] }, "Confirm changes": { v: ["Potvrdit změny"] } } }, { l: "cs-CZ", t: { "Cancel changes": { v: ["Zrušit změny"] }, "Confirm changes": { v: ["Potvrdit změny"] } } }, { l: "da", t: { "Cancel changes": { v: ["Annuller ændringer"] }, "Confirm changes": { v: ["Bekræft ændringer"] } } }, { l: "de", t: { "Cancel changes": { v: ["Änderungen verwerfen"] }, "Confirm changes": { v: ["Änderungen bestätigen"] } } }, { l: "de-DE", t: { "Cancel changes": { v: ["Änderungen verwerfen"] }, "Confirm changes": { v: ["Änderungen bestätigen"] } } }, { l: "el", t: { "Cancel changes": { v: ["Ακύρωση αλλαγών"] }, "Confirm changes": { v: ["Επιβεβαίωση αλλαγών"] } } }, { l: "en-GB", t: { "Cancel changes": { v: ["Cancel changes"] }, "Confirm changes": { v: ["Confirm changes"] } } }, { l: "eo", t: {} }, { l: "es", t: { "Cancel changes": { v: ["Cancelar cambios"] }, "Confirm changes": { v: ["Confirmar cambios"] } } }, { l: "es-AR", t: { "Cancel changes": { v: ["Cancelar cambios"] }, "Confirm changes": { v: ["Confirmar cambios"] } } }, { l: "es-EC", t: { "Cancel changes": { v: ["Cancelar cambios"] }, "Confirm changes": { v: ["Confirmar cambios"] } } }, { l: "es-MX", t: { "Cancel changes": { v: ["Cancelar cambios"] }, "Confirm changes": { v: ["Confirmar cambios"] } } }, { l: "et-EE", t: { "Cancel changes": { v: ["Tühista muudatused"] }, "Confirm changes": { v: ["Kinnitage muudatused"] } } }, { l: "eu", t: { "Cancel changes": { v: ["Ezeztatu aldaketak"] }, "Confirm changes": { v: ["Baieztatu aldaketak"] } } }, { l: "fa", t: { "Cancel changes": { v: ["لغو تغییرات"] }, "Confirm changes": { v: ["تایید تغییرات"] } } }, { l: "fi", t: { "Cancel changes": { v: ["Peruuta muutokset"] }, "Confirm changes": { v: ["Vahvista muutokset"] } } }, { l: "fr", t: { "Cancel changes": { v: ["Annuler les modifications"] }, "Confirm changes": { v: ["Confirmer les modifications"] } } }, { l: "ga", t: { "Cancel changes": { v: ["Cealaigh athruithe"] }, "Confirm changes": { v: ["Deimhnigh na hathruithe"] } } }, { l: "gl", t: { "Cancel changes": { v: ["Cancelar os cambios"] }, "Confirm changes": { v: ["Confirma os cambios"] } } }, { l: "he", t: { "Cancel changes": { v: ["ביטול שינויים"] }, "Confirm changes": { v: ["אישור השינויים"] } } }, { l: "hu", t: { "Cancel changes": { v: ["Változtatások elvetése"] }, "Confirm changes": { v: ["Változtatások megerősítése"] } } }, { l: "id", t: { "Cancel changes": { v: ["Batalkan perubahan"] }, "Confirm changes": { v: ["Konfirmasikan perubahan"] } } }, { l: "is", t: { "Cancel changes": { v: ["Hætta við breytingar"] }, "Confirm changes": { v: ["Staðfesta breytingar"] } } }, { l: "it", t: { "Cancel changes": { v: ["Annulla modifiche"] }, "Confirm changes": { v: ["Conferma modifiche"] } } }, { l: "ja", t: { "Cancel changes": { v: ["変更をキャンセル"] }, "Confirm changes": { v: ["変更を承認"] } } }, { l: "ja-JP", t: { "Cancel changes": { v: ["変更をキャンセル"] }, "Confirm changes": { v: ["変更を承認"] } } }, { l: "ko", t: { "Cancel changes": { v: ["변경 취소"] }, "Confirm changes": { v: ["변경 사항 확인"] } } }, { l: "lt-LT", t: {} }, { l: "lv", t: {} }, { l: "mk", t: { "Cancel changes": { v: ["Откажи ги промените"] }, "Confirm changes": { v: ["Потврди ги промените"] } } }, { l: "my", t: { "Cancel changes": { v: ["ပြောင်းလဲမှုများ ပယ်ဖျက်ရန်"] }, "Confirm changes": { v: ["ပြောင်းလဲမှုများ အတည်ပြုရန်"] } } }, { l: "nb", t: { "Cancel changes": { v: ["Avbryt endringer"] }, "Confirm changes": { v: ["Bekreft endringer"] } } }, { l: "nl", t: { "Cancel changes": { v: ["Wijzigingen annuleren"] }, "Confirm changes": { v: ["Wijzigingen bevestigen"] } } }, { l: "oc", t: {} }, { l: "pl", t: { "Cancel changes": { v: ["Anuluj zmiany"] }, "Confirm changes": { v: ["Potwierdź zmiany"] } } }, { l: "pt-BR", t: { "Cancel changes": { v: ["Cancelar alterações"] }, "Confirm changes": { v: ["Confirmar alterações"] } } }, { l: "pt-PT", t: { "Cancel changes": { v: ["Cancelar alterações"] }, "Confirm changes": { v: ["Confirmar alterações"] } } }, { l: "ro", t: { "Cancel changes": { v: ["Anulează modificările"] }, "Confirm changes": { v: ["Confirmați modificările"] } } }, { l: "ru", t: { "Cancel changes": { v: ["Отменить изменения"] }, "Confirm changes": { v: ["Подтвердить изменения"] } } }, { l: "sk", t: { "Cancel changes": { v: ["Zrušiť zmeny"] }, "Confirm changes": { v: ["Potvrdiť zmeny"] } } }, { l: "sl", t: { "Cancel changes": { v: ["Prekliči spremembe"] }, "Confirm changes": { v: ["Potrdi spremembe"] } } }, { l: "sr", t: { "Cancel changes": { v: ["Откажи измене"] }, "Confirm changes": { v: ["Потврдите измене"] } } }, { l: "sv", t: { "Cancel changes": { v: ["Avbryt ändringar"] }, "Confirm changes": { v: ["Bekräfta ändringar"] } } }, { l: "tr", t: { "Cancel changes": { v: ["Değişiklikleri iptal et"] }, "Confirm changes": { v: ["Değişiklikleri onayla"] } } }, { l: "uk", t: { "Cancel changes": { v: ["Скасувати зміни"] }, "Confirm changes": { v: ["Підтвердити зміни"] } } }, { l: "uz", t: { "Cancel changes": { v: ["O'zgarishlarni bekor qilish"] }, "Confirm changes": { v: ["O'zgarishlarni tasdiqlang"] } } }, { l: "zh-CN", t: { "Cancel changes": { v: ["取消更改"] }, "Confirm changes": { v: ["确认更改"] } } }, { l: "zh-HK", t: { "Cancel changes": { v: ["取消更改"] }, "Confirm changes": { v: ["確認更改"] } } }, { l: "zh-TW", t: { "Cancel changes": { v: ["取消變更"] }, "Confirm changes": { v: ["確認變更"] } } }], T1 = [{ l: "ar", t: { "Change name": { v: ["تغيير الاسم"] }, "Close sidebar": { v: ["قفل الشريط الجانبي"] }, Favorite: { v: ["المفضلة"] }, "Open sidebar": { v: ["إفتَح الشريط الجانبي"] } } }, { l: "ast", t: { "Change name": { v: ["Camudar el nome"] }, "Close sidebar": { v: ["Zarrar la barra llateral"] }, Favorite: { v: ["Favoritu"] }, "Open sidebar": { v: ["Abrir la barra llateral"] } } }, { l: "br", t: {} }, { l: "ca", t: { "Close sidebar": { v: ["Tancar la barra lateral"] }, Favorite: { v: ["Preferit"] } } }, { l: "cs", t: { "Change name": { v: ["Změnit název"] }, "Close sidebar": { v: ["Zavřít postranní panel"] }, Favorite: { v: ["Oblíbené"] }, "Open sidebar": { v: ["Otevřít postranní panel"] } } }, { l: "cs-CZ", t: { "Change name": { v: ["Změnit název"] }, "Close sidebar": { v: ["Zavřít postranní panel"] }, Favorite: { v: ["Oblíbené"] } } }, { l: "da", t: { "Change name": { v: ["Ændre navn"] }, "Close sidebar": { v: ["Luk sidepanel"] }, Favorite: { v: ["Favorit"] }, "Open sidebar": { v: ["Åbn sidepanel"] } } }, { l: "de", t: { "Change name": { v: ["Namen ändern"] }, "Close sidebar": { v: ["Seitenleiste schließen"] }, Favorite: { v: ["Favorit"] }, "Open sidebar": { v: ["Seitenleiste öffnen"] } } }, { l: "de-DE", t: { "Change name": { v: ["Namen ändern"] }, "Close sidebar": { v: ["Seitenleiste schließen"] }, Favorite: { v: ["Favorit"] }, "Open sidebar": { v: ["Seitenleiste öffnen"] } } }, { l: "el", t: { "Change name": { v: ["Αλλαγή ονόματος"] }, "Close sidebar": { v: ["Κλείσιμο πλευρικής μπάρας"] }, Favorite: { v: ["Αγαπημένα"] }, "Open sidebar": { v: ["Άνοιγμα πλευρικής μπάρας"] } } }, { l: "en-GB", t: { "Change name": { v: ["Change name"] }, "Close sidebar": { v: ["Close sidebar"] }, Favorite: { v: ["Favourite"] }, "Open sidebar": { v: ["Open sidebar"] } } }, { l: "eo", t: {} }, { l: "es", t: { "Change name": { v: ["Cambiar nombre"] }, "Close sidebar": { v: ["Cerrar barra lateral"] }, Favorite: { v: ["Favorito"] }, "Open sidebar": { v: ["Abrir barra lateral"] } } }, { l: "es-AR", t: { "Change name": { v: ["Cambiar nombre"] }, "Close sidebar": { v: ["Cerrar barra lateral"] }, Favorite: { v: ["Favorito"] }, "Open sidebar": { v: ["Abrir barra lateral"] } } }, { l: "es-EC", t: { "Change name": { v: ["Cambiar nombre"] }, "Close sidebar": { v: ["Cerrar barra lateral"] }, Favorite: { v: ["Favorito"] } } }, { l: "es-MX", t: { "Change name": { v: ["Cambiar nombre"] }, "Close sidebar": { v: ["Cerrar barra lateral"] }, Favorite: { v: ["Favorito"] }, "Open sidebar": { v: ["Abrir barra lateral"] } } }, { l: "et-EE", t: { "Change name": { v: ["Muuda nime"] }, "Close sidebar": { v: ["Sulge külgriba"] }, Favorite: { v: ["Lemmik"] }, "Open sidebar": { v: ["Ava külgriba"] } } }, { l: "eu", t: { "Change name": { v: ["Aldatu izena"] }, "Close sidebar": { v: ["Itxi albo-barra"] }, Favorite: { v: ["Gogokoa"] } } }, { l: "fa", t: { "Change name": { v: ["تغییر نام"] }, "Close sidebar": { v: ["بستن نوار کناری"] }, Favorite: { v: ["مورد علاقه"] }, "Open sidebar": { v: ["باز کردن نوار کنار"] } } }, { l: "fi", t: { "Change name": { v: ["Vaihda nimi"] }, "Close sidebar": { v: ["Sulje sivupalkki"] }, Favorite: { v: ["Suosikki"] }, "Open sidebar": { v: ["Avaa sivupalkki"] } } }, { l: "fr", t: { "Change name": { v: ["Modifier le nom"] }, "Close sidebar": { v: ["Fermer la barre latérale"] }, Favorite: { v: ["Favori"] }, "Open sidebar": { v: ["Ouvrir la barre latérale"] } } }, { l: "ga", t: { "Change name": { v: ["Athrú ainm"] }, "Close sidebar": { v: ["Dún barra taoibh"] }, Favorite: { v: ["is fearr leat"] }, "Open sidebar": { v: ["Oscail barra taoibh"] } } }, { l: "gl", t: { "Change name": { v: ["Cambiar o nome"] }, "Close sidebar": { v: ["Pechar a barra lateral"] }, Favorite: { v: ["Favorito"] }, "Open sidebar": { v: ["Abrir a barra lateral"] } } }, { l: "he", t: { "Change name": { v: ["החלפת שם"] }, "Close sidebar": { v: ["סגירת סרגל הצד"] }, Favorite: { v: ["למועדפים"] } } }, { l: "hu", t: { "Close sidebar": { v: ["Oldalsáv bezárása"] }, Favorite: { v: ["Kedvenc"] } } }, { l: "id", t: { "Change name": { v: ["Ubah nama"] }, "Close sidebar": { v: ["Tutup bilah sisi"] }, Favorite: { v: ["Favorit"] } } }, { l: "is", t: { "Change name": { v: ["Breyta nafni"] }, "Close sidebar": { v: ["Loka hliðarstiku"] }, Favorite: { v: ["Eftirlæti"] }, "Open sidebar": { v: ["Opna hliðarspjald"] } } }, { l: "it", t: { "Change name": { v: ["Cambia nome"] }, "Close sidebar": { v: ["Chiudi la barra laterale"] }, Favorite: { v: ["Preferito"] } } }, { l: "ja", t: { "Change name": { v: ["名前の変更"] }, "Close sidebar": { v: ["サイドバーを閉じる"] }, Favorite: { v: ["お気に入り"] }, "Open sidebar": { v: ["サイドバーを開く"] } } }, { l: "ja-JP", t: { "Change name": { v: ["名前の変更"] }, "Close sidebar": { v: ["サイドバーを閉じる"] }, Favorite: { v: ["お気に入り"] }, "Open sidebar": { v: ["サイドバーを開く"] } } }, { l: "ko", t: { "Change name": { v: ["이름 변경"] }, "Close sidebar": { v: ["사이드바 닫기"] }, Favorite: { v: ["즐겨찾기"] }, "Open sidebar": { v: ["사이드바 열기"] } } }, { l: "lt-LT", t: {} }, { l: "lv", t: {} }, { l: "mk", t: { Favorite: { v: ["Фаворити"] } } }, { l: "my", t: {} }, { l: "nb", t: { "Change name": { v: ["Endre navn"] }, "Close sidebar": { v: ["Lukk sidepanel"] }, Favorite: { v: ["Favoritt"] }, "Open sidebar": { v: ["Åpne sidefelt"] } } }, { l: "nl", t: { "Change name": { v: ["Naam wijzigen"] }, "Close sidebar": { v: ["Zijbalk sluiten"] }, Favorite: { v: ["Favoriet"] }, "Open sidebar": { v: ["Zijbalk openen"] } } }, { l: "oc", t: {} }, { l: "pl", t: { "Change name": { v: ["Zmień nazwę"] }, "Close sidebar": { v: ["Zamknij pasek boczny"] }, Favorite: { v: ["Ulubiony"] }, "Open sidebar": { v: ["Otwórz pasek boczny"] } } }, { l: "pt-BR", t: { "Change name": { v: ["Mudar nome"] }, "Close sidebar": { v: ["Fechar barra lateral"] }, Favorite: { v: ["Favorito"] }, "Open sidebar": { v: ["Abrir barra lateral"] } } }, { l: "pt-PT", t: { "Change name": { v: ["Alterar nome"] }, "Close sidebar": { v: ["Fechar barra lateral"] }, Favorite: { v: ["Favorito"] }, "Open sidebar": { v: ["Abrir barra lateral"] } } }, { l: "ro", t: { "Change name": { v: ["Modifică numele"] }, "Close sidebar": { v: ["Închide bara laterală"] }, Favorite: { v: ["Favorit"] } } }, { l: "ru", t: { "Change name": { v: ["Изменить имя"] }, "Close sidebar": { v: ["Закрыть сайдбар"] }, Favorite: { v: ["Избранное"] }, "Open sidebar": { v: ["Открыть боковую панель"] } } }, { l: "sk", t: { "Change name": { v: ["Zmeniť názov"] }, "Close sidebar": { v: ["Zavrieť bočný panel"] }, Favorite: { v: ["Obľúbené"] }, "Open sidebar": { v: ["Otvoriť bočný panel"] } } }, { l: "sl", t: { "Close sidebar": { v: ["Zapri stransko vrstico"] }, Favorite: { v: ["Priljubljeno"] } } }, { l: "sr", t: { "Change name": { v: ["Измени назив"] }, "Close sidebar": { v: ["Затвори бочну траку"] }, Favorite: { v: ["Омиљени"] }, "Open sidebar": { v: ["Отвори бочну траку"] } } }, { l: "sv", t: { "Change name": { v: ["Ändra namn"] }, "Close sidebar": { v: ["Stäng sidofältet"] }, Favorite: { v: ["Favorit"] }, "Open sidebar": { v: ["Öppna sidofältet"] } } }, { l: "tr", t: { "Change name": { v: ["Adı değiştir"] }, "Close sidebar": { v: ["Yan çubuğu kapat"] }, Favorite: { v: ["Sık kullanılanlara ekle"] }, "Open sidebar": { v: ["Yan çubuğu aç"] } } }, { l: "uk", t: { "Change name": { v: ["Змінити назву"] }, "Close sidebar": { v: ["Закрити бічну панель"] }, Favorite: { v: ["Із зірочкою"] }, "Open sidebar": { v: ["Бокове меню"] } } }, { l: "uz", t: { "Change name": { v: ["Ismni o'zgartirish"] }, "Close sidebar": { v: ["Yon panelni yoping"] }, Favorite: { v: ["Tanlangan"] }, "Open sidebar": { v: ["Yon panelni oching"] } } }, { l: "zh-CN", t: { "Change name": { v: ["修改名称"] }, "Close sidebar": { v: ["关闭侧边栏"] }, Favorite: { v: ["喜爱"] }, "Open sidebar": { v: ["打开侧边栏"] } } }, { l: "zh-HK", t: { "Change name": { v: ["更改名稱"] }, "Close sidebar": { v: ["關閉側邊欄"] }, Favorite: { v: ["喜愛"] }, "Open sidebar": { v: ["打開側邊欄"] } } }, { l: "zh-TW", t: { "Change name": { v: ["變更名稱"] }, "Close sidebar": { v: ["關閉側邊欄"] }, Favorite: { v: ["最愛"] }, "Open sidebar": { v: ["開啟側邊欄"] } } }], N1 = [{ l: "ar", t: { "Clear search": { v: ["محو البحث"] } } }, { l: "ast", t: { "Clear search": { v: ["Borrar la busca"] } } }, { l: "br", t: {} }, { l: "ca", t: {} }, { l: "cs", t: { "Clear search": { v: ["Vyčistit vyhledávání"] } } }, { l: "cs-CZ", t: { "Clear search": { v: ["Vyčistit vyhledávání"] } } }, { l: "da", t: { "Clear search": { v: ["Ryd søgning"] } } }, { l: "de", t: { "Clear search": { v: ["Suche leeren"] } } }, { l: "de-DE", t: { "Clear search": { v: ["Suche leeren"] } } }, { l: "el", t: { "Clear search": { v: ["Εκκαθάριση αναζήτησης"] } } }, { l: "en-GB", t: { "Clear search": { v: ["Clear search"] } } }, { l: "eo", t: {} }, { l: "es", t: { "Clear search": { v: ["Limpiar búsqueda"] } } }, { l: "es-AR", t: { "Clear search": { v: ["Limpiar búsqueda"] } } }, { l: "es-EC", t: { "Clear search": { v: ["Limpiar búsqueda"] } } }, { l: "es-MX", t: { "Clear search": { v: ["Limpiar búsqueda"] } } }, { l: "et-EE", t: { "Clear search": { v: ["Tühjenda otsing"] } } }, { l: "eu", t: { "Clear search": { v: ["Garbitu bilaketa"] } } }, { l: "fa", t: { "Clear search": { v: ["پاک کردن جستجو"] } } }, { l: "fi", t: { "Clear search": { v: ["Tyhjennä haku"] } } }, { l: "fr", t: { "Clear search": { v: ["Effacer la recherche"] } } }, { l: "ga", t: { "Clear search": { v: ["Glan cuardach"] } } }, { l: "gl", t: { "Clear search": { v: ["Limpar a busca"] } } }, { l: "he", t: { "Clear search": { v: ["פינוי חיפוש"] } } }, { l: "hu", t: {} }, { l: "id", t: { "Clear search": { v: ["Bersihkan pencarian"] } } }, { l: "is", t: { "Clear search": { v: ["Hreinsa leit"] } } }, { l: "it", t: { "Clear search": { v: ["online"] } } }, { l: "ja", t: { "Clear search": { v: ["検索をクリア"] } } }, { l: "ja-JP", t: { "Clear search": { v: ["検索をクリア"] } } }, { l: "ko", t: { "Clear search": { v: ["검색 지우기"] } } }, { l: "lt-LT", t: {} }, { l: "lv", t: {} }, { l: "mk", t: {} }, { l: "my", t: {} }, { l: "nb", t: { "Clear search": { v: ["Tøm søk"] } } }, { l: "nl", t: { "Clear search": { v: ["Zoekopdracht wissen"] } } }, { l: "oc", t: {} }, { l: "pl", t: { "Clear search": { v: ["Wyczyść wyszukiwanie"] } } }, { l: "pt-BR", t: { "Clear search": { v: ["Limpar pesquisa"] } } }, { l: "pt-PT", t: { "Clear search": { v: ["Limpar pesquisa"] } } }, { l: "ro", t: { "Clear search": { v: ["Șterge căutarea"] } } }, { l: "ru", t: { "Clear search": { v: ["Очистить поиск"] } } }, { l: "sk", t: { "Clear search": { v: ["Vymazať vyhľadávanie"] } } }, { l: "sl", t: {} }, { l: "sr", t: { "Clear search": { v: ["Обриши претрагу"] } } }, { l: "sv", t: { "Clear search": { v: ["Rensa sökning"] } } }, { l: "tr", t: { "Clear search": { v: ["Aramayı temizle"] } } }, { l: "uk", t: { "Clear search": { v: ["Очистити пошук"] } } }, { l: "uz", t: { "Clear search": { v: ["Qidiruvni tozalash"] } } }, { l: "zh-CN", t: { "Clear search": { v: ["清除搜索"] } } }, { l: "zh-HK", t: { "Clear search": { v: ["清除搜索"] } } }, { l: "zh-TW", t: { "Clear search": { v: ["清除搜尋"] } } }], C1 = [{ l: "ar", t: { "Clear selected": { v: ["محو المحدّد"] }, "Deselect {option}": { v: ["إلغاء تحديد {option}"] }, "No results": { v: ["ليس هناك أية نتيجة"] }, Options: { v: ["خيارات"] } } }, { l: "ast", t: { "Clear selected": { v: ["Borrar lo seleicionao"] }, "Deselect {option}": { v: ["Deseleicionar «{option}»"] }, "No results": { v: ["Nun hai nengún resultáu"] }, Options: { v: ["Opciones"] } } }, { l: "br", t: { "No results": { v: ["Disoc'h ebet"] } } }, { l: "ca", t: { "No results": { v: ["Sense resultats"] } } }, { l: "cs", t: { "Clear selected": { v: ["Vyčistit vybrané"] }, "Deselect {option}": { v: ["Zrušit výběr {option}"] }, "No results": { v: ["Nic nenalezeno"] }, Options: { v: ["Možnosti"] } } }, { l: "cs-CZ", t: { "Clear selected": { v: ["Vyčistit vybrané"] }, "Deselect {option}": { v: ["Zrušit výběr {option}"] }, "No results": { v: ["Nic nenalezeno"] }, Options: { v: ["Možnosti"] } } }, { l: "da", t: { "Clear selected": { v: ["Ryd valgt"] }, "Deselect {option}": { v: ["Fravælg {option}"] }, "No results": { v: ["Ingen resultater"] }, Options: { v: ["Indstillinger"] } } }, { l: "de", t: { "Clear selected": { v: ["Auswahl leeren"] }, "Deselect {option}": { v: ["{option} abwählen"] }, "No results": { v: ["Keine Ergebnisse"] }, Options: { v: ["Optionen"] } } }, { l: "de-DE", t: { "Clear selected": { v: ["Auswahl leeren"] }, "Deselect {option}": { v: ["{option} abwählen"] }, "No results": { v: ["Keine Ergebnisse"] }, Options: { v: ["Optionen"] } } }, { l: "el", t: { "Clear selected": { v: ["Εκκαθάριση επιλογής"] }, "Deselect {option}": { v: ["Αποεπιλογή {option}"] }, "No results": { v: ["Κανένα αποτέλεσμα"] }, Options: { v: ["Επιλογές"] } } }, { l: "en-GB", t: { "Clear selected": { v: ["Clear selected"] }, "Deselect {option}": { v: ["Deselect {option}"] }, "No results": { v: ["No results"] }, Options: { v: ["Options"] } } }, { l: "eo", t: { "No results": { v: ["La rezulto forestas"] } } }, { l: "es", t: { "Clear selected": { v: ["Limpiar selección"] }, "Deselect {option}": { v: ["Deseleccionar {option}"] }, "No results": { v: [" Ningún resultado"] }, Options: { v: ["Opciones"] } } }, { l: "es-AR", t: { "Clear selected": { v: ["Limpiar selección"] }, "Deselect {option}": { v: ["Deseleccionar {option}"] }, "No results": { v: ["Sin resultados"] }, Options: { v: ["Opciones"] } } }, { l: "es-EC", t: { "No results": { v: ["Sin resultados"] } } }, { l: "es-MX", t: { "Clear selected": { v: ["Limpiar selección"] }, "Deselect {option}": { v: ["Deseleccionar {option}"] }, "No results": { v: ["Sin resultados"] }, Options: { v: ["Opciones"] } } }, { l: "et-EE", t: { "Clear selected": { v: ["Tühjenad valik"] }, "Deselect {option}": { v: ["Eemalda {option} valik"] }, "No results": { v: ["Tulemusi pole"] }, Options: { v: ["Valikud"] } } }, { l: "eu", t: { "No results": { v: ["Emaitzarik ez"] } } }, { l: "fa", t: { "Clear selected": { v: ["پاک کردن مورد انتخاب شده"] }, "Deselect {option}": { v: ["لغو انتخاب {option}"] }, "No results": { v: ["بدون هیچ نتیجه‌ای"] }, Options: { v: ["گزینه‌ها"] } } }, { l: "fi", t: { "Clear selected": { v: ["Tyhjennä valitut"] }, "Deselect {option}": { v: ["Poista valinta {option}"] }, "No results": { v: ["Ei tuloksia"] }, Options: { v: ["Valinnat"] } } }, { l: "fr", t: { "Clear selected": { v: ["Vider la sélection"] }, "Deselect {option}": { v: ["Désélectionner {option}"] }, "No results": { v: ["Aucun résultat"] }, Options: { v: ["Options"] } } }, { l: "ga", t: { "Clear selected": { v: ["Glan roghnaithe"] }, "Deselect {option}": { v: ["Díroghnaigh {option}"] }, "No results": { v: ["Gan torthaí"] }, Options: { v: ["Roghanna"] } } }, { l: "gl", t: { "Clear selected": { v: ["Limpar o seleccionado"] }, "Deselect {option}": { v: ["Desmarcar {opción}"] }, "No results": { v: ["Sen resultados"] }, Options: { v: ["Opcións"] } } }, { l: "he", t: { "No results": { v: ["אין תוצאות"] } } }, { l: "hu", t: { "No results": { v: ["Nincs találat"] } } }, { l: "id", t: { "Clear selected": { v: ["Hapus terpilih"] }, "Deselect {option}": { v: ["Batalkan pemilihan {option}"] }, "No results": { v: ["Tidak ada hasil"] } } }, { l: "is", t: { "Clear selected": { v: ["Hreinsa valið"] }, "Deselect {option}": { v: ["Afvelja {option}"] }, "No results": { v: ["Engar niðurstöður"] }, Options: { v: ["Valkostir"] } } }, { l: "it", t: { "Clear selected": { v: ["Cancella selezionati"] }, "Deselect {option}": { v: ["Deselezionare {option}"] }, "No results": { v: ["Nessun risultato"] } } }, { l: "ja", t: { "Clear selected": { v: ["選択を解除"] }, "Deselect {option}": { v: ["{option} の選択を解除"] }, "No results": { v: ["結果無し"] }, Options: { v: ["オプション"] } } }, { l: "ja-JP", t: { "Clear selected": { v: ["選択を解除"] }, "Deselect {option}": { v: ["{option} の選択を解除"] }, "No results": { v: ["結果無し"] }, Options: { v: ["オプション"] } } }, { l: "ko", t: { "Clear selected": { v: ["선택 항목 지우기"] }, "Deselect {option}": { v: ["{option} 선택 해제"] }, "No results": { v: ["결과 없음"] }, Options: { v: ["옵션"] } } }, { l: "lt-LT", t: { "No results": { v: ["Nėra rezultatų"] } } }, { l: "lv", t: { "No results": { v: ["Nav rezultātu"] } } }, { l: "mk", t: { "No results": { v: ["Нема резултати"] } } }, { l: "my", t: { "No results": { v: ["ရလဒ်မရှိပါ"] } } }, { l: "nb", t: { "Clear selected": { v: ["Tøm merket"] }, "Deselect {option}": { v: ["Opphev valg {option}"] }, "No results": { v: ["Ingen resultater"] }, Options: { v: ["Alternativer"] } } }, { l: "nl", t: { "Clear selected": { v: ["Selectie wissen"] }, "Deselect {option}": { v: ["Selectie {option} opheffen"] }, "No results": { v: ["Geen resultaten"] }, Options: { v: ["Opties"] } } }, { l: "oc", t: { "No results": { v: ["Cap de resultat"] } } }, { l: "pl", t: { "Clear selected": { v: ["Wyczyść wybrane"] }, "Deselect {option}": { v: ["Odznacz {option}"] }, "No results": { v: ["Brak wyników"] }, Options: { v: ["Opcje"] } } }, { l: "pt-BR", t: { "Clear selected": { v: ["Limpar selecionado"] }, "Deselect {option}": { v: ["Desselecionar {option}"] }, "No results": { v: ["Sem resultados"] }, Options: { v: ["Opções"] } } }, { l: "pt-PT", t: { "Clear selected": { v: ["Limpeza selecionada"] }, "Deselect {option}": { v: ["Desmarcar {option}"] }, "No results": { v: ["Sem resultados"] }, Options: { v: ["Opções"] } } }, { l: "ro", t: { "Clear selected": { v: ["Șterge selecția"] }, "Deselect {option}": { v: ["Deselctează {option}"] }, "No results": { v: ["Nu există rezultate"] } } }, { l: "ru", t: { "Clear selected": { v: ["Очистить выбранный"] }, "Deselect {option}": { v: ["Отменить выбор {option}"] }, "No results": { v: ["Результаты отсуствуют"] }, Options: { v: ["Варианты"] } } }, { l: "sk", t: { "Clear selected": { v: ["Vymazať vybraté"] }, "Deselect {option}": { v: ["Zrušiť výber {option}"] }, "No results": { v: ["Žiadne výsledky"] }, Options: { v: ["možnosti"] } } }, { l: "sl", t: { "No results": { v: ["Ni zadetkov"] } } }, { l: "sr", t: { "Clear selected": { v: ["Обриши изабрано"] }, "Deselect {option}": { v: ["Уклони избор {option}"] }, "No results": { v: ["Нема резултата"] }, Options: { v: ["Опције"] } } }, { l: "sv", t: { "Clear selected": { v: ["Rensa val"] }, "Deselect {option}": { v: ["Avmarkera {option}"] }, "No results": { v: ["Inga resultat"] }, Options: { v: ["Alternativ"] } } }, { l: "tr", t: { "Clear selected": { v: ["Seçilmişleri temizle"] }, "Deselect {option}": { v: ["{option} bırak"] }, "No results": { v: ["Herhangi bir sonuç bulunamadı"] }, Options: { v: ["Seçenekler"] } } }, { l: "uk", t: { "Clear selected": { v: ["Очистити вибране"] }, "Deselect {option}": { v: ["Зняти вибір {option}"] }, "No results": { v: ["Відсутні результати"] }, Options: { v: ["Параметри"] } } }, { l: "uz", t: { "Clear selected": { v: ["Tanlanganni tozalash"] }, "Deselect {option}": { v: ["{option}tanlovni bekor qiling"] }, "No results": { v: ["Natija yoʻq"] }, Options: { v: ["Variantlar"] } } }, { l: "zh-CN", t: { "Clear selected": { v: ["清除所选"] }, "Deselect {option}": { v: ["取消选择 {option}"] }, "No results": { v: ["无结果"] }, Options: { v: ["选项"] } } }, { l: "zh-HK", t: { "Clear selected": { v: ["清除所選項目"] }, "Deselect {option}": { v: ["取消選擇 {option}"] }, "No results": { v: ["無結果"] }, Options: { v: ["選項"] } } }, { l: "zh-TW", t: { "Clear selected": { v: ["清除選定項目"] }, "Deselect {option}": { v: ["取消選取 {option}"] }, "No results": { v: ["無結果"] }, Options: { v: ["選項"] } } }], Km = [{ l: "ar", t: { Close: { v: ["إغلاق"] } } }, { l: "ast", t: { Close: { v: ["Zarrar"] } } }, { l: "br", t: { Close: { v: ["Serriñ"] } } }, { l: "ca", t: { Close: { v: ["Tanca"] } } }, { l: "cs", t: { Close: { v: ["Zavřít"] } } }, { l: "cs-CZ", t: { Close: { v: ["Zavřít"] } } }, { l: "da", t: { Close: { v: ["Luk"] } } }, { l: "de", t: { Close: { v: ["Schließen"] } } }, { l: "de-DE", t: { Close: { v: ["Schließen"] } } }, { l: "el", t: { Close: { v: ["Κλείσιμο"] } } }, { l: "en-GB", t: { Close: { v: ["Close"] } } }, { l: "eo", t: { Close: { v: ["Fermu"] } } }, { l: "es", t: { Close: { v: ["Cerrar"] } } }, { l: "es-AR", t: { Close: { v: ["Cerrar"] } } }, { l: "es-EC", t: { Close: { v: ["Cerrar"] } } }, { l: "es-MX", t: { Close: { v: ["Cerrar"] } } }, { l: "et-EE", t: { Close: { v: ["Sulge"] } } }, { l: "eu", t: { Close: { v: ["Itxi"] } } }, { l: "fa", t: { Close: { v: ["بستن"] } } }, { l: "fi", t: { Close: { v: ["Sulje"] } } }, { l: "fr", t: { Close: { v: ["Fermer"] } } }, { l: "ga", t: { Close: { v: ["Dún"] } } }, { l: "gl", t: { Close: { v: ["Pechar"] } } }, { l: "he", t: { Close: { v: ["סגירה"] } } }, { l: "hu", t: { Close: { v: ["Bezárás"] } } }, { l: "id", t: { Close: { v: ["Tutup"] } } }, { l: "is", t: { Close: { v: ["Loka"] } } }, { l: "it", t: { Close: { v: ["Chiudi"] } } }, { l: "ja", t: { Close: { v: ["閉じる"] } } }, { l: "ja-JP", t: { Close: { v: ["閉じる"] } } }, { l: "ko", t: { Close: { v: ["닫기"] } } }, { l: "lt-LT", t: { Close: { v: ["Užverti"] } } }, { l: "lv", t: { Close: { v: ["Aizvērt"] } } }, { l: "mk", t: { Close: { v: ["Затвори"] } } }, { l: "my", t: { Close: { v: ["ပိတ်ရန်"] } } }, { l: "nb", t: { Close: { v: ["Lukk"] } } }, { l: "nl", t: { Close: { v: ["Sluiten"] } } }, { l: "oc", t: { Close: { v: ["Tampar"] } } }, { l: "pl", t: { Close: { v: ["Zamknij"] } } }, { l: "pt-BR", t: { Close: { v: ["Fechar"] } } }, { l: "pt-PT", t: { Close: { v: ["Fechar"] } } }, { l: "ro", t: { Close: { v: ["Închideți"] } } }, { l: "ru", t: { Close: { v: ["Закрыть"] } } }, { l: "sk", t: { Close: { v: ["Zavrieť"] } } }, { l: "sl", t: { Close: { v: ["Zapri"] } } }, { l: "sr", t: { Close: { v: ["Затвори"] } } }, { l: "sv", t: { Close: { v: ["Stäng"] } } }, { l: "tr", t: { Close: { v: ["Kapat"] } } }, { l: "uk", t: { Close: { v: ["Закрити"] } } }, { l: "uz", t: { Close: { v: ["Yopish"] } } }, { l: "zh-CN", t: { Close: { v: ["关闭"] } } }, { l: "zh-HK", t: { Close: { v: ["關閉"] } } }, { l: "zh-TW", t: { Close: { v: ["關閉"] } } }], _1 = [{ l: "ar", t: { "Collapse menu": { v: ["طي القائمة"] }, "Open menu": { v: ["إفتَح القائمة"] } } }, { l: "ast", t: { "Collapse menu": { v: ["Recoyer el menú"] }, "Open menu": { v: ["Abrir le menú"] } } }, { l: "br", t: {} }, { l: "ca", t: {} }, { l: "cs", t: { "Collapse menu": { v: ["Sbalit nabídku"] }, "Open menu": { v: ["Otevřít nabídku"] } } }, { l: "cs-CZ", t: { "Collapse menu": { v: ["Sbalit nabídku"] }, "Open menu": { v: ["Otevřít nabídku"] } } }, { l: "da", t: { "Collapse menu": { v: ["Skjul menuen"] }, "Open menu": { v: ["Åben menu"] } } }, { l: "de", t: { "Collapse menu": { v: ["Menü einklappen"] }, "Open menu": { v: ["Menü öffnen"] } } }, { l: "de-DE", t: { "Collapse menu": { v: ["Menü einklappen"] }, "Open menu": { v: ["Menü öffnen"] } } }, { l: "el", t: { "Collapse menu": { v: ["Σύμπτυξη μενού"] }, "Open menu": { v: ["Άνοιγμα μενού"] } } }, { l: "en-GB", t: { "Collapse menu": { v: ["Collapse menu"] }, "Open menu": { v: ["Open menu"] } } }, { l: "eo", t: {} }, { l: "es", t: { "Collapse menu": { v: ["Ocultar menú"] }, "Open menu": { v: ["Abrir menú"] } } }, { l: "es-AR", t: { "Collapse menu": { v: ["Ocultar menú"] }, "Open menu": { v: ["Abrir menú"] } } }, { l: "es-EC", t: { "Collapse menu": { v: ["Ocultar menú"] }, "Open menu": { v: ["Abrir menú"] } } }, { l: "es-MX", t: { "Collapse menu": { v: ["Ocultar menú"] }, "Open menu": { v: ["Abrir menú"] } } }, { l: "et-EE", t: { "Collapse menu": { v: ["Menüü kokkuklappimine"] }, "Open menu": { v: ["Ava menüü"] } } }, { l: "eu", t: { "Collapse menu": { v: ["Tolestu menua"] }, "Open menu": { v: ["Ireki menua"] } } }, { l: "fa", t: { "Collapse menu": { v: ["بستن فهرست"] }, "Open menu": { v: ["باز کردن فهرست"] } } }, { l: "fi", t: { "Collapse menu": { v: ["Supista valikko"] }, "Open menu": { v: ["Avaa valikko"] } } }, { l: "fr", t: { "Collapse menu": { v: ["Réduire le menu"] }, "Open menu": { v: ["Ouvrir le menu"] } } }, { l: "ga", t: { "Collapse menu": { v: ["Roghchlár Laghdaigh"] }, "Open menu": { v: ["Roghchlár a oscailt"] } } }, { l: "gl", t: { "Collapse menu": { v: ["Contraer o menú"] }, "Open menu": { v: ["Abrir o menú"] } } }, { l: "he", t: { "Collapse menu": { v: ["צמצום התפריט"] }, "Open menu": { v: ["פתיחת תפריט"] } } }, { l: "hu", t: {} }, { l: "id", t: { "Collapse menu": { v: ["Ciutkan menu"] }, "Open menu": { v: ["Buka menu"] } } }, { l: "is", t: { "Collapse menu": { v: ["Fella valmynd saman"] }, "Open menu": { v: ["Opna valmynd"] } } }, { l: "it", t: { "Collapse menu": { v: ["Chiudi Menu"] }, "Open menu": { v: ["Apri il menu"] } } }, { l: "ja", t: { "Collapse menu": { v: ["メニューの折りたたみ"] }, "Open menu": { v: ["メニューを開く"] } } }, { l: "ja-JP", t: { "Collapse menu": { v: ["メニューの折りたたみ"] }, "Open menu": { v: ["メニューを開く"] } } }, { l: "ko", t: { "Collapse menu": { v: ["메뉴 접기"] }, "Open menu": { v: ["메뉴 열기"] } } }, { l: "lt-LT", t: {} }, { l: "lv", t: {} }, { l: "mk", t: {} }, { l: "my", t: {} }, { l: "nb", t: { "Collapse menu": { v: ["Skjul meny"] }, "Open menu": { v: ["Åpne meny"] } } }, { l: "nl", t: { "Collapse menu": { v: ["Menu inklappen"] }, "Open menu": { v: ["Menu openen"] } } }, { l: "oc", t: {} }, { l: "pl", t: { "Collapse menu": { v: ["Zwiń menu"] }, "Open menu": { v: ["Otwórz menu"] } } }, { l: "pt-BR", t: { "Collapse menu": { v: ["Recolher menu"] }, "Open menu": { v: ["Abrir menu"] } } }, { l: "pt-PT", t: { "Collapse menu": { v: ["Ocultar menu"] }, "Open menu": { v: ["Abrir menu"] } } }, { l: "ro", t: { "Collapse menu": { v: ["Restrânge meniul"] }, "Open menu": { v: ["Deschide meniul"] } } }, { l: "ru", t: { "Collapse menu": { v: ["Свернуть меню"] }, "Open menu": { v: ["Открыть меню"] } } }, { l: "sk", t: { "Collapse menu": { v: ["Zbaliť menu"] }, "Open menu": { v: ["Otvoriť menu"] } } }, { l: "sl", t: {} }, { l: "sr", t: { "Collapse menu": { v: ["Сажми мени"] }, "Open menu": { v: ["Отвори мени"] } } }, { l: "sv", t: { "Collapse menu": { v: ["Dölj menyn"] }, "Open menu": { v: ["Öppna menyn"] } } }, { l: "tr", t: { "Collapse menu": { v: ["Menüyü daralt"] }, "Open menu": { v: ["Menüyü aç"] } } }, { l: "uk", t: { "Collapse menu": { v: ["Згорнути меню"] }, "Open menu": { v: ["Відкрити меню"] } } }, { l: "uz", t: { "Collapse menu": { v: ["Menyuni yig‘ish"] }, "Open menu": { v: ["Menyuni oching"] } } }, { l: "zh-CN", t: { "Collapse menu": { v: ["收起菜单"] }, "Open menu": { v: ["打开菜单"] } } }, { l: "zh-HK", t: { "Collapse menu": { v: ["折疊選單"] }, "Open menu": { v: ["開啟選單"] } } }, { l: "zh-TW", t: { "Collapse menu": { v: ["折疊選單"] }, "Open menu": { v: ["開啟選單"] } } }], O1 = [{ l: "ar", t: { "Edit item": { v: ["تعديل عنصر"] } } }, { l: "ast", t: { "Edit item": { v: ["Editar l'elementu"] } } }, { l: "br", t: {} }, { l: "ca", t: { "Edit item": { v: ["Edita l'element"] } } }, { l: "cs", t: { "Edit item": { v: ["Upravit položku"] } } }, { l: "cs-CZ", t: { "Edit item": { v: ["Upravit položku"] } } }, { l: "da", t: { "Edit item": { v: ["Rediger emne"] } } }, { l: "de", t: { "Edit item": { v: ["Element bearbeiten"] } } }, { l: "de-DE", t: { "Edit item": { v: ["Element bearbeiten"] } } }, { l: "el", t: { "Edit item": { v: ["Επεξεργασία αντικειμένου"] } } }, { l: "en-GB", t: { "Edit item": { v: ["Edit item"] } } }, { l: "eo", t: {} }, { l: "es", t: { "Edit item": { v: ["Editar elemento"] } } }, { l: "es-AR", t: { "Edit item": { v: ["Editar elemento"] } } }, { l: "es-EC", t: { "Edit item": { v: ["Editar elemento"] } } }, { l: "es-MX", t: { "Edit item": { v: ["Editar elemento"] } } }, { l: "et-EE", t: { "Edit item": { v: ["Muuda objekti"] } } }, { l: "eu", t: { "Edit item": { v: ["Editatu elementua"] } } }, { l: "fa", t: { "Edit item": { v: ["ویرایش مورد"] } } }, { l: "fi", t: { "Edit item": { v: ["Muokkaa kohdetta"] } } }, { l: "fr", t: { "Edit item": { v: ["Éditer l'élément"] } } }, { l: "ga", t: { "Edit item": { v: ["Cuir mír in eagar"] } } }, { l: "gl", t: { "Edit item": { v: ["Editar o elemento"] } } }, { l: "he", t: { "Edit item": { v: ["עריכת פריט"] } } }, { l: "hu", t: { "Edit item": { v: ["Elem szerkesztése"] } } }, { l: "id", t: { "Edit item": { v: ["Edit item"] } } }, { l: "is", t: { "Edit item": { v: ["Breyta atriði"] } } }, { l: "it", t: { "Edit item": { v: ["Modifica l'elemento"] } } }, { l: "ja", t: { "Edit item": { v: ["編集"] } } }, { l: "ja-JP", t: { "Edit item": { v: ["編集"] } } }, { l: "ko", t: { "Edit item": { v: ["항목 수정"] } } }, { l: "lt-LT", t: {} }, { l: "lv", t: {} }, { l: "mk", t: { "Edit item": { v: ["Уреди"] } } }, { l: "my", t: {} }, { l: "nb", t: { "Edit item": { v: ["Rediger"] } } }, { l: "nl", t: { "Edit item": { v: ["Item bewerken"] } } }, { l: "oc", t: {} }, { l: "pl", t: { "Edit item": { v: ["Edytuj element"] } } }, { l: "pt-BR", t: { "Edit item": { v: ["Editar item"] } } }, { l: "pt-PT", t: { "Edit item": { v: ["Editar item"] } } }, { l: "ro", t: { "Edit item": { v: ["Editați elementul"] } } }, { l: "ru", t: { "Edit item": { v: ["Изменить элемент"] } } }, { l: "sk", t: { "Edit item": { v: ["Upraviť položku"] } } }, { l: "sl", t: { "Edit item": { v: ["Uredi predmet"] } } }, { l: "sr", t: { "Edit item": { v: ["Уреди ставку"] } } }, { l: "sv", t: { "Edit item": { v: ["Redigera objekt"] } } }, { l: "tr", t: { "Edit item": { v: ["Ögeyi düzenle"] } } }, { l: "uk", t: { "Edit item": { v: ["Редагувати елемент"] } } }, { l: "uz", t: { "Edit item": { v: ["Elementni tahrirlash"] } } }, { l: "zh-CN", t: { "Edit item": { v: ["编辑项目"] } } }, { l: "zh-HK", t: { "Edit item": { v: ["編輯項目"] } } }, { l: "zh-TW", t: { "Edit item": { v: ["編輯項目"] } } }], P1 = [{ l: "ar", t: { "Enable interactive view": { v: ["تمكين المنظور التفاعلي"] } } }, { l: "ast", t: { "Enable interactive view": { v: ["Activar la vista interactiva"] } } }, { l: "br", t: {} }, { l: "ca", t: {} }, { l: "cs", t: { "Enable interactive view": { v: ["Zapnout interaktivní zobrazení"] } } }, { l: "cs-CZ", t: {} }, { l: "da", t: { "Enable interactive view": { v: ["Aktiver interaktiv visning"] } } }, { l: "de", t: { "Enable interactive view": { v: ["Die interaktive Ansicht aktivieren"] } } }, { l: "de-DE", t: { "Enable interactive view": { v: ["Die interaktive Ansicht aktivieren"] } } }, { l: "el", t: { "Enable interactive view": { v: ["Ενεργοποίηση διαδραστικής προβολής"] } } }, { l: "en-GB", t: { "Enable interactive view": { v: ["Enable interactive view"] } } }, { l: "eo", t: {} }, { l: "es", t: { "Enable interactive view": { v: ["Habilitar vista interactiva"] } } }, { l: "es-AR", t: { "Enable interactive view": { v: ["Habilitar vista interactiva"] } } }, { l: "es-EC", t: {} }, { l: "es-MX", t: { "Enable interactive view": { v: ["Habilitar vista interactiva"] } } }, { l: "et-EE", t: { "Enable interactive view": { v: ["Lülita interaktiivne vaade sisse"] } } }, { l: "eu", t: {} }, { l: "fa", t: { "Enable interactive view": { v: ["فعال‌سازی نمای تعاملی"] } } }, { l: "fi", t: { "Enable interactive view": { v: ["Näytä vuorovaikutteinen näkymä"] } } }, { l: "fr", t: { "Enable interactive view": { v: ["Activer la vue interactive"] } } }, { l: "ga", t: { "Enable interactive view": { v: ["Cumasaigh amharc idirghníomhach"] } } }, { l: "gl", t: { "Enable interactive view": { v: ["Activar a vista interactiva"] } } }, { l: "he", t: {} }, { l: "hu", t: {} }, { l: "id", t: {} }, { l: "is", t: { "Enable interactive view": { v: ["Virkja gagnvirka sýn"] } } }, { l: "it", t: {} }, { l: "ja", t: { "Enable interactive view": { v: ["インタラクティブ・ビューを有効にする"] } } }, { l: "ja-JP", t: { "Enable interactive view": { v: ["インタラクティブ・ビューを有効にする"] } } }, { l: "ko", t: { "Enable interactive view": { v: ["대화형 보기 활성화"] } } }, { l: "lt-LT", t: {} }, { l: "lv", t: {} }, { l: "mk", t: {} }, { l: "my", t: {} }, { l: "nb", t: { "Enable interactive view": { v: ["Aktiver interaktiv visning"] } } }, { l: "nl", t: { "Enable interactive view": { v: ["Interactieve weergave inschakelen"] } } }, { l: "oc", t: {} }, { l: "pl", t: { "Enable interactive view": { v: ["Włącz widok interaktywny"] } } }, { l: "pt-BR", t: { "Enable interactive view": { v: ["Ativar visualização interativa"] } } }, { l: "pt-PT", t: { "Enable interactive view": { v: ["Ativar vista interativa"] } } }, { l: "ro", t: {} }, { l: "ru", t: { "Enable interactive view": { v: ["Включить интерактивный просмотр"] } } }, { l: "sk", t: { "Enable interactive view": { v: ["Povoliť interaktívny pohľad"] } } }, { l: "sl", t: {} }, { l: "sr", t: { "Enable interactive view": { v: ["Укључи интерактивни приказ"] } } }, { l: "sv", t: { "Enable interactive view": { v: ["Aktivera interaktiv vy"] } } }, { l: "tr", t: { "Enable interactive view": { v: ["Etkileşimli görünümü aç"] } } }, { l: "uk", t: { "Enable interactive view": { v: ["Увімкнути інтерактивний перегляд"] } } }, { l: "uz", t: { "Enable interactive view": { v: ["Interaktiv ko'rinishni yoqing"] } } }, { l: "zh-CN", t: { "Enable interactive view": { v: ["启用交互视窗"] } } }, { l: "zh-HK", t: { "Enable interactive view": { v: ["啟用互動視圖"] } } }, { l: "zh-TW", t: { "Enable interactive view": { v: ["啟用互動檢視"] } } }], x1 = [{ l: "ar", t: { "Enter link": { v: ["أدخِل الرابط"] } } }, { l: "ast", t: { "Enter link": { v: ["Introducir l'enllaz"] } } }, { l: "br", t: {} }, { l: "ca", t: {} }, { l: "cs", t: { "Enter link": { v: ["Zadat odkaz"] } } }, { l: "cs-CZ", t: { "Enter link": { v: ["Zadat odkaz"] } } }, { l: "da", t: { "Enter link": { v: ["Indtast link"] } } }, { l: "de", t: { "Enter link": { v: ["Link eingeben"] } } }, { l: "de-DE", t: { "Enter link": { v: ["Link eingeben"] } } }, { l: "el", t: { "Enter link": { v: ["Εισάγετε σύνδεσμο"] } } }, { l: "en-GB", t: { "Enter link": { v: ["Enter link"] } } }, { l: "eo", t: {} }, { l: "es", t: { "Enter link": { v: ["Ingrese enlace"] } } }, { l: "es-AR", t: { "Enter link": { v: ["Ingresar enlace"] } } }, { l: "es-EC", t: { "Enter link": { v: ["Ingresar enlace"] } } }, { l: "es-MX", t: { "Enter link": { v: ["Ingresar enlace"] } } }, { l: "et-EE", t: { "Enter link": { v: ["Sisesta link"] } } }, { l: "eu", t: { "Enter link": { v: ["Sartu esteka"] } } }, { l: "fa", t: { "Enter link": { v: ["لینک را وارد کنید"] } } }, { l: "fi", t: { "Enter link": { v: ["Kirjoita linkki"] } } }, { l: "fr", t: { "Enter link": { v: ["Saisissez le lien"] } } }, { l: "ga", t: { "Enter link": { v: ["Cuir isteach nasc"] } } }, { l: "gl", t: { "Enter link": { v: ["Introducir a ligazón"] } } }, { l: "he", t: { "Enter link": { v: ["מילוי קישור"] } } }, { l: "hu", t: {} }, { l: "id", t: { "Enter link": { v: ["Masukkan tautan"] } } }, { l: "is", t: { "Enter link": { v: ["Settu inn tengil"] } } }, { l: "it", t: { "Enter link": { v: ["Inserire il link"] } } }, { l: "ja", t: { "Enter link": { v: ["リンクを入力する"] } } }, { l: "ja-JP", t: { "Enter link": { v: ["リンクを入力する"] } } }, { l: "ko", t: { "Enter link": { v: ["링크 입력"] } } }, { l: "lt-LT", t: {} }, { l: "lv", t: {} }, { l: "mk", t: {} }, { l: "my", t: {} }, { l: "nb", t: { "Enter link": { v: ["Skriv inn lenken"] } } }, { l: "nl", t: { "Enter link": { v: ["Link invoeren"] } } }, { l: "oc", t: {} }, { l: "pl", t: { "Enter link": { v: ["Wprowadź link"] } } }, { l: "pt-BR", t: { "Enter link": { v: ["Insira o link"] } } }, { l: "pt-PT", t: { "Enter link": { v: ["Inserir hiperligação"] } } }, { l: "ro", t: { "Enter link": { v: ["Introduceți link-ul"] } } }, { l: "ru", t: { "Enter link": { v: ["Введите ссылку"] } } }, { l: "sk", t: { "Enter link": { v: ["Vložiť link"] } } }, { l: "sl", t: {} }, { l: "sr", t: { "Enter link": { v: ["Унесите линк"] } } }, { l: "sv", t: { "Enter link": { v: ["Ange länk"] } } }, { l: "tr", t: { "Enter link": { v: ["Bağlantıyı yazın"] } } }, { l: "uk", t: { "Enter link": { v: ["Зазначте посилання"] } } }, { l: "uz", t: { "Enter link": { v: ["Havolani kiriting"] } } }, { l: "zh-CN", t: { "Enter link": { v: ["输入链接"] } } }, { l: "zh-HK", t: { "Enter link": { v: ["輸入連結"] } } }, { l: "zh-TW", t: { "Enter link": { v: ["輸入連結"] } } }], R1 = [{ l: "ar", t: { "Hide details": { v: ["أخفِ التفاصيل"] }, "Rename project": { v: ["تغيير اسم المشروع"] }, "Show details": { v: ["أظهِر التفاصيل"] } } }, { l: "ast", t: {} }, { l: "br", t: {} }, { l: "ca", t: {} }, { l: "cs", t: { "Hide details": { v: ["Skrýt podrobnosti"] }, "Rename project": { v: ["Přejmenovat projekt"] }, "Show details": { v: ["Zobrazit podrobnosti"] } } }, { l: "cs-CZ", t: {} }, { l: "da", t: { "Hide details": { v: ["Skjul detaljer"] }, "Rename project": { v: ["Omdøb projekt"] }, "Show details": { v: ["Vis detaljer"] } } }, { l: "de", t: { "Hide details": { v: ["Details ausblenden"] }, "Rename project": { v: ["Projekt umbenennen"] }, "Show details": { v: ["Details anzeigen"] } } }, { l: "de-DE", t: { "Hide details": { v: ["Details ausblenden"] }, "Rename project": { v: ["Projekt umbenennen"] }, "Show details": { v: ["Details anzeigen"] } } }, { l: "el", t: { "Hide details": { v: ["Απόκρυψη λεπτομερειών"] }, "Rename project": { v: ["Μετονομασία έργου"] }, "Show details": { v: ["Εμφάνιση λεπτομερειών"] } } }, { l: "en-GB", t: { "Hide details": { v: ["Hide details"] }, "Rename project": { v: ["Rename project"] }, "Show details": { v: ["Show details"] } } }, { l: "eo", t: {} }, { l: "es", t: {} }, { l: "es-AR", t: { "Hide details": { v: ["Ocultar detalles"] }, "Rename project": { v: ["Renombrar proyecto"] }, "Show details": { v: ["Mostrar detalles"] } } }, { l: "es-EC", t: {} }, { l: "es-MX", t: { "Hide details": { v: ["Ocultar detalles"] }, "Rename project": { v: ["Renombrar proyecto"] }, "Show details": { v: ["Mostrar detalles"] } } }, { l: "et-EE", t: { "Hide details": { v: ["Peida üksikasjad"] }, "Rename project": { v: ["Muuda projekti nime"] }, "Show details": { v: ["Näita üksikasju"] } } }, { l: "eu", t: {} }, { l: "fa", t: { "Hide details": { v: ["پنهان کردن جزئیات"] }, "Rename project": { v: ["تغییر نام پروژه"] }, "Show details": { v: ["نمایش جزئیات"] } } }, { l: "fi", t: { "Hide details": { v: ["Piilota yksityiskohdat"] }, "Rename project": { v: ["Nimeä projekti"] }, "Show details": { v: ["Näytä yksityiskohdat"] } } }, { l: "fr", t: { "Hide details": { v: ["Masquer les détails"] }, "Rename project": { v: ["Renommer le projet"] }, "Show details": { v: ["Afficher les détails"] } } }, { l: "ga", t: { "Hide details": { v: ["Folaigh sonraí"] }, "Rename project": { v: ["Athainmnigh an tionscadal"] }, "Show details": { v: ["Taispeáin sonraí"] } } }, { l: "gl", t: { "Hide details": { v: ["Agochar os detalles"] }, "Rename project": { v: ["Cambiar o nome do proxecto"] }, "Show details": { v: ["Amosar os detalles"] } } }, { l: "he", t: {} }, { l: "hu", t: {} }, { l: "id", t: {} }, { l: "is", t: { "Hide details": { v: ["Fela nánari upplýsingar"] }, "Rename project": { v: ["Endurnefna verkefni"] }, "Show details": { v: ["Birta nánari upplýsingar"] } } }, { l: "it", t: {} }, { l: "ja", t: { "Hide details": { v: ["詳細を非表示"] }, "Rename project": { v: ["プロジェクト名を変更"] }, "Show details": { v: ["詳細の表示"] } } }, { l: "ja-JP", t: {} }, { l: "ko", t: { "Hide details": { v: ["세부 사항 숨기기"] }, "Rename project": { v: ["프로젝트 이름 변경"] }, "Show details": { v: ["세부 사항 보기"] } } }, { l: "lt-LT", t: {} }, { l: "lv", t: {} }, { l: "mk", t: {} }, { l: "my", t: {} }, { l: "nb", t: { "Hide details": { v: ["Skjul detaljer"] }, "Rename project": { v: ["Gi prosjekt nytt navn"] }, "Show details": { v: ["Vis detaljer"] } } }, { l: "nl", t: { "Hide details": { v: ["Details verbergen"] }, "Rename project": { v: ["Project hernoemen"] }, "Show details": { v: ["Details weergeven"] } } }, { l: "oc", t: {} }, { l: "pl", t: { "Hide details": { v: ["Ukryj szczegóły"] }, "Rename project": { v: ["Zmień nazwę projektu"] }, "Show details": { v: ["Pokaż szczegóły"] } } }, { l: "pt-BR", t: { "Hide details": { v: ["Ocultar detalhes"] }, "Rename project": { v: ["Renomear projeto"] }, "Show details": { v: ["Mostrar detalhes"] } } }, { l: "pt-PT", t: { "Hide details": { v: ["Ocultar detalhes"] }, "Rename project": { v: ["Alterar nome do projeto"] }, "Show details": { v: ["Ver detalhes"] } } }, { l: "ro", t: {} }, { l: "ru", t: { "Hide details": { v: ["Скрыть подробности"] }, "Rename project": { v: ["Переименовать проект"] }, "Show details": { v: ["Показать детали"] } } }, { l: "sk", t: { "Hide details": { v: ["Skryť detaily"] }, "Rename project": { v: ["Premenovať projekt"] }, "Show details": { v: ["Zobraziť detaily"] } } }, { l: "sl", t: {} }, { l: "sr", t: { "Hide details": { v: ["Сакриј детаље"] }, "Rename project": { v: ["Промени име пројекта"] }, "Show details": { v: ["Прикажи детаље"] } } }, { l: "sv", t: { "Hide details": { v: ["Göm detaljer"] }, "Rename project": { v: ["Byt namn på projektet"] }, "Show details": { v: ["Visa detaljer"] } } }, { l: "tr", t: { "Hide details": { v: ["Ayrıntıları gizle"] }, "Rename project": { v: ["Projeyi yeniden adlandır"] }, "Show details": { v: ["Ayrıntıları görüntüle"] } } }, { l: "uk", t: { "Hide details": { v: ["Сховати деталі"] }, "Rename project": { v: ["Перейменувати проєкт"] }, "Show details": { v: ["Показати деталі"] } } }, { l: "uz", t: { "Hide details": { v: ["Tafsilotlarni yashirish"] }, "Rename project": { v: ["Loyiha nomini o'zgartirish"] }, "Show details": { v: ["Tafsilotlarni ko'rsatish"] } } }, { l: "zh-CN", t: { "Hide details": { v: ["隐藏细节"] }, "Rename project": { v: ["重命名项目"] }, "Show details": { v: ["显示细节"] } } }, { l: "zh-HK", t: { "Hide details": { v: ["隱藏詳情"] }, "Rename project": { v: ["重命名方案"] }, "Show details": { v: ["顯示詳情"] } } }, { l: "zh-TW", t: { "Hide details": { v: ["隱藏詳細資料"] }, "Rename project": { v: ["重新命名專案"] }, "Show details": { v: ["顯示詳細資訊"] } } }], M1 = [{ l: "ar", t: { 'Load more "{options}"': { v: ['تحميل المزيد من "{options}" '] }, "Raw link {options}": { v: [" الرابط الخام raw link ـ {options}"] }, "Start typing to search": { v: ["إبدإ كتابة مفردات البحث"] } } }, { l: "ast", t: { 'Load more "{options}"': { v: ["Cargar más «{options}»"] }, "Raw link {options}": { v: ["Enllaz en bruto {optiones}"] }, "Start typing to search": { v: ["Comienza a escribir pa buscar"] } } }, { l: "br", t: {} }, { l: "ca", t: {} }, { l: "cs", t: { 'Load more "{options}"': { v: ["Načíst další „{options}“"] }, "Raw link {options}": { v: ["Holý odkaz {options}"] }, "Start typing to search": { v: ["Vyhledávejte psaním"] } } }, { l: "cs-CZ", t: { 'Load more "{options}"': { v: ["Načíst další „{options}“"] }, "Raw link {options}": { v: ["Holý odkaz {options}"] }, "Start typing to search": { v: ["Vyhledávejte psaním"] } } }, { l: "da", t: { 'Load more "{options}"': { v: ['Indlæs flere "{options}"'] }, "Raw link {options}": { v: ["Rå link {options}"] }, "Start typing to search": { v: ["Begynd at skrive for at søge"] } } }, { l: "de", t: { 'Load more "{options}"': { v: ['Weitere "{options}" laden'] }, "Raw link {options}": { v: ["Unverarbeiteter Link {options}"] }, "Start typing to search": { v: ["Mit der Eingabe beginnen, um zu suchen"] } } }, { l: "de-DE", t: { 'Load more "{options}"': { v: ['Weitere "{options}" laden'] }, "Raw link {options}": { v: ["Unverarbeiteter Link {options}"] }, "Start typing to search": { v: ["Mit der Eingabe beginnen, um zu suchen"] } } }, { l: "el", t: { 'Load more "{options}"': { v: ['Φόρτωση περισσότερων "{options}"'] }, "Raw link {options}": { v: ["Ακατέργαστος σύνδεσμος {options}"] }, "Start typing to search": { v: ["Ξεκινήστε να πληκτρολογείτε για αναζήτηση"] } } }, { l: "en-GB", t: { 'Load more "{options}"': { v: ['Load more "{options}"'] }, "Raw link {options}": { v: ["Raw link {options}"] }, "Start typing to search": { v: ["Start typing to search"] } } }, { l: "eo", t: {} }, { l: "es", t: { 'Load more "{options}"': { v: ['Cargar más "{options}"'] }, "Raw link {options}": { v: ["Enlace directo {options}"] }, "Start typing to search": { v: ["Comience a escribir para buscar"] } } }, { l: "es-AR", t: { 'Load more "{options}"': { v: ['Cargar más "{options}"'] }, "Raw link {options}": { v: ["Enlace directo {options}"] }, "Start typing to search": { v: ["Comience a escribir para buscar"] } } }, { l: "es-EC", t: { "Raw link {options}": { v: ["Enlace directo {options}"] }, "Start typing to search": { v: ["Comienza a escribir para buscar"] } } }, { l: "es-MX", t: { 'Load more "{options}"': { v: ['Cargar más "{options}"'] }, "Raw link {options}": { v: ["Enlace directo {options}"] }, "Start typing to search": { v: ["Comience a escribir para buscar"] } } }, { l: "et-EE", t: { 'Load more "{options}"': { v: ["Laadi veel „{options}“"] }, "Raw link {options}": { v: ["Töötlemata link: {options}"] }, "Start typing to search": { v: ["Alusta otsinguks sisestamist"] } } }, { l: "eu", t: { 'Load more "{options}"': { v: ['Kargatu "{options}" gehiago'] }, "Raw link {options}": { v: ["Formaturik gabeko esteka {aukerak}"] }, "Start typing to search": { v: ["Hasi idazten bilatzeko"] } } }, { l: "fa", t: { 'Load more "{options}"': { v: ['بارگذاری بیشتر "{options}"'] }, "Raw link {options}": { v: ["پیوند خام {options}"] }, "Start typing to search": { v: ["برای جستجو تایپ کنید"] } } }, { l: "fi", t: { 'Load more "{options}"': { v: ['Lataa lisää "{options}"'] }, "Raw link {options}": { v: ["Raaka linkki {options}"] }, "Start typing to search": { v: ["Aloita kirjoittaminen hakeaksesi"] } } }, { l: "fr", t: { 'Load more "{options}"': { v: [`Charger d'avantage "{options}"`] }, "Raw link {options}": { v: ["Lien brut {options}"] }, "Start typing to search": { v: ["Commencez à écrire pour rechercher"] } } }, { l: "ga", t: { 'Load more "{options}"': { v: ['Luchtaigh tuilleadh "{options}"'] }, "Raw link {options}": { v: ["Nasc amh {roghanna}"] }, "Start typing to search": { v: ["Tosaigh ag clóscríobh chun cuardach a dhéanamh"] } } }, { l: "gl", t: { 'Load more "{options}"': { v: ["Cargar máis «{options}»"] }, "Raw link {options}": { v: ["Ligazón sen procesar {options}"] }, "Start typing to search": { v: ["Comece a escribir para buscar"] } } }, { l: "he", t: { "Raw link {options}": { v: ["קישור גולמי {options}"] }, "Start typing to search": { v: ["התחלת הקלדה מחפשת"] } } }, { l: "hu", t: {} }, { l: "id", t: { 'Load more "{options}"': { v: ['Muat "{options}" lainnya'] }, "Raw link {options}": { v: ["Tautan mentah {options}"] }, "Start typing to search": { v: ["Ketik untuk mulai mencari"] } } }, { l: "is", t: { 'Load more "{options}"': { v: ['Hlaða inn fleiri "{options}"'] }, "Raw link {options}": { v: ["Hrár tengill {options}"] }, "Start typing to search": { v: ["Byrjaðu að skrifa til að leita"] } } }, { l: "it", t: { 'Load more "{options}"': { v: ['Carica più "{options}"'] }, "Raw link {options}": { v: ["Raw link {options}"] }, "Start typing to search": { v: ["Iniziare a digitare per effettuare la ricerca"] } } }, { l: "ja", t: { 'Load more "{options}"': { v: ['"{options}" をもっと読み込む'] }, "Raw link {options}": { v: ["未加工のリンク {options}"] }, "Start typing to search": { v: ["入力を開始して検索します"] } } }, { l: "ja-JP", t: { 'Load more "{options}"': { v: ['"{options}" をもっと読み込む'] }, "Raw link {options}": { v: ["未加工のリンク {options}"] }, "Start typing to search": { v: ["入力を開始して検索します"] } } }, { l: "ko", t: { 'Load more "{options}"': { v: ['"{options}" 더 불러오기'] }, "Raw link {options}": { v: ["{options} 원본 링크"] }, "Start typing to search": { v: ["입력하여 검색"] } } }, { l: "lt-LT", t: {} }, { l: "lv", t: {} }, { l: "mk", t: {} }, { l: "my", t: {} }, { l: "nb", t: { 'Load more "{options}"': { v: ['Last inn flere "{options}"'] }, "Raw link {options}": { v: ["Rå lenke {options}"] }, "Start typing to search": { v: ["Start å skrive for å søke"] } } }, { l: "nl", t: { 'Load more "{options}"': { v: ['Meer "{options}" laden'] }, "Raw link {options}": { v: ["Ruwe link {options}"] }, "Start typing to search": { v: ["Start met typen om te zoeken"] } } }, { l: "oc", t: {} }, { l: "pl", t: { 'Load more "{options}"': { v: ['Załaduj więcej "{options}"'] }, "Raw link {options}": { v: ["Surowy odnośnik {options}"] }, "Start typing to search": { v: ["Zacznij pisać, aby wyszukać"] } } }, { l: "pt-BR", t: { 'Load more "{options}"': { v: ['Carregar mais "{options}"'] }, "Raw link {options}": { v: ["Link bruto {options}"] }, "Start typing to search": { v: ["Comece a digitar para pesquisar"] } } }, { l: "pt-PT", t: { 'Load more "{options}"': { v: ['Carregar mais "{options}"'] }, "Raw link {options}": { v: ["Link inicial {options}"] }, "Start typing to search": { v: ["Comece a digitar para pesquisar"] } } }, { l: "ro", t: { 'Load more "{options}"': { v: ['Încarcă mai multe "{options}"'] }, "Raw link {options}": { v: ["Link brut {options}"] }, "Start typing to search": { v: ["Tastați pentru căutare"] } } }, { l: "ru", t: { 'Load more "{options}"': { v: ['Загрузить больше "{options}""'] }, "Raw link {options}": { v: ["Необработанная ссылка {options}"] }, "Start typing to search": { v: ["Начните вводить текст для поиска"] } } }, { l: "sk", t: { 'Load more "{options}"': { v: ['Načítať viac "{options}"'] }, "Raw link {options}": { v: ["Raw odkaz {options}"] }, "Start typing to search": { v: ["Začnite písať pre vyhľadávanie"] } } }, { l: "sl", t: {} }, { l: "sr", t: { 'Load more "{options}"': { v: ["Учитај још „{options}”"] }, "Raw link {options}": { v: ["Сирови линк {options}"] }, "Start typing to search": { v: ["Покрените претрагу куцањем"] } } }, { l: "sv", t: { 'Load more "{options}"': { v: ['Ladda fler "{options}"'] }, "Raw link {options}": { v: ["Oformaterad länk {options}"] }, "Start typing to search": { v: ["Börja skriva för att söka"] } } }, { l: "tr", t: { 'Load more "{options}"': { v: ['Diğer "{options}"'] }, "Raw link {options}": { v: ["Ham bağlantı {options}"] }, "Start typing to search": { v: ["Aramak için yazmaya başlayın"] } } }, { l: "uk", t: { 'Load more "{options}"': { v: ['Завантажити більше "{options}"'] }, "Raw link {options}": { v: ["Пряме посилання {options}"] }, "Start typing to search": { v: ["Почніть вводити для пошуку"] } } }, { l: "uz", t: { 'Load more "{options}"': { v: [`Ko'proq yuklash "{options}"`] }, "Raw link {options}": { v: [" {options}satr havolasi"] }, "Start typing to search": { v: ["Qidirish uchun yozishni boshlang"] } } }, { l: "zh-CN", t: { 'Load more "{options}"': { v: ["加载更多 “{options}”"] }, "Raw link {options}": { v: ["原始链接 {options}"] }, "Start typing to search": { v: ["开始输入以进行搜索"] } } }, { l: "zh-HK", t: { 'Load more "{options}"': { v: ['載入更多 "{options}"'] }, "Raw link {options}": { v: ["原始連結 {options}"] }, "Start typing to search": { v: ["開始輸入以進行搜尋"] } } }, { l: "zh-TW", t: { 'Load more "{options}"': { v: ["載入更多「{options}」"] }, "Raw link {options}": { v: ["原始連結 {options}"] }, "Start typing to search": { v: ["開始輸入以進行搜尋"] } } }], j1 = [{ l: "ar", t: { "No link provider found": { v: ["لا يوجد أيّ مزود روابط link provider"] }, "Write a message …": { v: ["أكتب رسالة ..."] } } }, { l: "ast", t: { "No link provider found": { v: ["Nun s'atopó nengún fornidor d'enllaces"] }, "Write a message …": { v: ["Escribi un mensaxe…"] } } }, { l: "br", t: {} }, { l: "ca", t: {} }, { l: "cs", t: { "Message limit of %n character reached": { p: "Message limit of %n characters reached", v: ["Dosaženo limitu počtu %n znaku zprávy", "Dosaženo limitu počtu %n znaků zprávy", "Dosaženo limitu počtu %n znaků zprávy", "Dosaženo limitu počtu %n znaků zprávy"] }, "No link provider found": { v: ["Nenalezen žádný poskytovatel odkazů"] }, "Write a message …": { v: ["Napsat zprávu…"] } } }, { l: "cs-CZ", t: { "No link provider found": { v: ["Nenalezen žádný poskytovatel odkazů"] }, "Write a message …": { v: ["Napsat zprávu…"] } } }, { l: "da", t: { "No link provider found": { v: ["Ingen linkudbyder fundet"] }, "Write a message …": { v: ["Skriv en besked ..."] } } }, { l: "de", t: { "Message limit of %n character reached": { p: "Message limit of %n characters reached", v: ["Nachrichtenlimit von %n Zeichen erreicht", "Nachrichtenlimit von %n Zeichen erreicht"] }, "No link provider found": { v: ["Kein Linkanbieter gefunden"] }, "Write a message …": { v: ["Nachricht schreiben …"] } } }, { l: "de-DE", t: { "Message limit of %n character reached": { p: "Message limit of %n characters reached", v: ["Nachrichtenlimit von %n Zeichen erreicht", "Nachrichtenlimit von %n Zeichen erreicht"] }, "No link provider found": { v: ["Kein Linkanbieter gefunden"] }, "Write a message …": { v: ["Nachricht schreiben …"] } } }, { l: "el", t: { "No link provider found": { v: ["Δεν βρέθηκε πάροχος συνδέσμου"] }, "Write a message …": { v: ["Γράψτε ένα μήνυμα …"] } } }, { l: "en-GB", t: { "Message limit of %n character reached": { p: "Message limit of %n characters reached", v: ["Message limit of %n character reached", "Message limit of %n characters reached"] }, "No link provider found": { v: ["No link provider found"] }, "Write a message …": { v: ["Write a message …"] } } }, { l: "eo", t: {} }, { l: "es", t: { "No link provider found": { v: ["No se encontró ningún proveedor de enlaces"] }, "Write a message …": { v: ["Escriba un mensaje ..."] } } }, { l: "es-AR", t: { "No link provider found": { v: ["No se encontró ningún proveedor de enlaces"] }, "Write a message …": { v: ["Escriba un mensaje ..."] } } }, { l: "es-EC", t: { "No link provider found": { v: ["No se encontró ningún proveedor de enlaces"] } } }, { l: "es-MX", t: { "No link provider found": { v: ["No se encontró ningún proveedor de enlaces"] }, "Write a message …": { v: ["Escriba un mensaje ..."] } } }, { l: "et-EE", t: { "Message limit of %n character reached": { p: "Message limit of %n characters reached", v: ["Sõnumi piirarv %n tähemärk on käes", "Sõnumi piirarv %n tähemärki on käes"] }, "No link provider found": { v: ["Lingi pakkujat ei leitud"] }, "Write a message …": { v: ["Kirjuta sõnum…"] } } }, { l: "eu", t: { "No link provider found": { v: ["Ez da aurkitu esteka-hornitzailerik"] }, "Write a message …": { v: ["Idatzi mezu bat…"] } } }, { l: "fa", t: { "No link provider found": { v: ["هیچ ارائه‌دهنده پیوندی یافت نشد"] }, "Write a message …": { v: ["یک پیام بنویسید ..."] } } }, { l: "fi", t: { "No link provider found": { v: ["Linkin tarjoajia ei löydetty"] }, "Write a message …": { v: ["Kirjoita viesti…"] } } }, { l: "fr", t: { "Message limit of %n character reached": { p: "Message limit of %n characters reached", v: ["Limite de messages de %n caractère atteinte", "Limite de messages de %n caractères atteinte", "Limite de messages de %n caractères atteinte"] }, "No link provider found": { v: ["Aucun fournisseur de lien trouvé"] }, "Write a message …": { v: ["Écrire un message..."] } } }, { l: "ga", t: { "Message limit of %n character reached": { p: "Message limit of %n characters reached", v: ["Sroicheadh ​​teorainn teachtaireachta de %n carachtar", "Sroicheadh ​​teorainn teachtaireachta de %n carachtar", "Sroicheadh ​​teorainn teachtaireachta de %n carachtar", "Sroicheadh ​​teorainn teachtaireachta de %n carachtar", "Sroicheadh ​​teorainn teachtaireachta de %n carachtar"] }, "No link provider found": { v: ["Níor aimsíodh aon soláthraí naisc"] }, "Write a message …": { v: ["Scríobh teachtaireacht…"] } } }, { l: "gl", t: { "No link provider found": { v: ["Non se atopou ningún provedor de ligazóns"] }, "Write a message …": { v: ["Escribir unha mensaxe…"] } } }, { l: "he", t: { "No link provider found": { v: ["לא נמצא ספק קישורים"] } } }, { l: "hu", t: {} }, { l: "id", t: { "No link provider found": { v: ["Tidak ada penyedia tautan yang ditemukan"] }, "Write a message …": { v: ["Tulis pesan ..."] } } }, { l: "is", t: { "No link provider found": { v: ["Engin tenglaveita fannst"] }, "Write a message …": { v: ["Skrifaðu skilaboð …"] } } }, { l: "it", t: { "No link provider found": { v: ["Nessun fornitore di link trovato"] }, "Write a message …": { v: ["Scrivi un messaggio ..."] } } }, { l: "ja", t: { "Message limit of %n character reached": { p: "Message limit of %n characters reached", v: ["メッセージの%n文字の制限に達しました"] }, "No link provider found": { v: ["リンクプロバイダーが見つかりません"] }, "Write a message …": { v: ["メッセージを書く ..."] } } }, { l: "ja-JP", t: { "No link provider found": { v: ["リンクプロバイダーが見つかりません"] }, "Write a message …": { v: ["メッセージを書く ..."] } } }, { l: "ko", t: { "Message limit of %n character reached": { p: "Message limit of %n characters reached", v: ["메시지 제한 %n자에 도달"] }, "No link provider found": { v: ["링크 제공자 없음"] }, "Write a message …": { v: ["메시지 작성..."] } } }, { l: "lt-LT", t: {} }, { l: "lv", t: {} }, { l: "mk", t: {} }, { l: "my", t: {} }, { l: "nb", t: { "No link provider found": { v: ["Finner ingen lenkeleverandør"] }, "Write a message …": { v: ["Skriv en melding..."] } } }, { l: "nl", t: { "Message limit of %n character reached": { p: "Message limit of %n characters reached", v: ["Berichtlimiet van %n teken bereikt", "Berichtlimiet van %n tekens bereikt"] }, "No link provider found": { v: ["Geen link provider gevonden"] }, "Write a message …": { v: ["Schrijf een bericht…"] } } }, { l: "oc", t: {} }, { l: "pl", t: { "No link provider found": { v: ["Nie znaleziono dostawcy linków"] }, "Write a message …": { v: ["Napisz wiadomość…"] } } }, { l: "pt-BR", t: { "Message limit of %n character reached": { p: "Message limit of %n characters reached", v: ["Limite de mensagem de %n caractere atingido", "Limite de mensagem de %n de caracteres atingido", "Limite de mensagem de %n caracteres atingido"] }, "No link provider found": { v: ["Nenhum provedor de link encontrado"] }, "Write a message …": { v: ["Escreva uma mensagem …"] } } }, { l: "pt-PT", t: { "Message limit of %n character reached": { p: "Message limit of %n characters reached", v: ["Limite de mensagem de %n carácter atingido", "Limite de mensagem de %n caracteres atingido", "Limite de mensagem de %n caracteres atingido"] }, "No link provider found": { v: ["Nenhum fornecedor de link encontrado"] }, "Write a message …": { v: ["Escreva uma mensagem..."] } } }, { l: "ro", t: { "No link provider found": { v: ["Nu s-a găsit un provider pentru linkuri"] }, "Write a message …": { v: ["Scrieți un mesaj ..."] } } }, { l: "ru", t: { "Message limit of %n character reached": { p: "Message limit of %n characters reached", v: ["Достигнут лимит в %n символ", "Достигнут лимит в %n символа", "Достигнут лимит в %n символов", "Достигнут лимит в %n символов"] }, "No link provider found": { v: ["Поставщик ссылок не найден"] }, "Write a message …": { v: ["Напиши сообщение …"] } } }, { l: "sk", t: { "No link provider found": { v: ["Žiaden odkaz poskytovateľa nebol nájdený"] }, "Write a message …": { v: ["Napíšte správu…"] } } }, { l: "sl", t: {} }, { l: "sr", t: { "No link provider found": { v: ["Није пронађен ниједан пружалац линка"] }, "Write a message …": { v: ["Напишите поруку…"] } } }, { l: "sv", t: { "No link provider found": { v: ["Ingen länkleverantör hittades"] }, "Write a message …": { v: ["Skriv ett meddelande …"] } } }, { l: "tr", t: { "Message limit of %n character reached": { p: "Message limit of %n characters reached", v: ["İleti için %n karakter sayısı sınırına ulaşıldı", "İleti için %n karakter sayısı sınırına ulaşıldı"] }, "No link provider found": { v: ["Bağlantı hizmeti sağlayıcısı bulunamadı"] }, "Write a message …": { v: ["Bir ileti yazın…"] } } }, { l: "uk", t: { "Message limit of %n character reached": { p: "Message limit of %n characters reached", v: ["Досягнуто обмеження на довжину повідомлення у %n символ.", "Досягнуто обмеження на довжину повідомлення у %n символи.", "Досягнуто обмеження на довжину повідомлення у%n символів.", "Досягнуто обмеження на довжину повідомлення у %n символів."] }, "No link provider found": { v: ["Не наведено посилання"] }, "Write a message …": { v: ["Написати повідомлення ..."] } } }, { l: "uz", t: { "Message limit of %n character reached": { p: "Message limit of %n characters reached", v: [" %n  ta belgidan iborat xabar chegarasiga yetdi"] }, "No link provider found": { v: ["Hech qanday havola provayderi topilmadi"] }, "Write a message …": { v: ["Xabar yozish…"] } } }, { l: "zh-CN", t: { "No link provider found": { v: ["未找到任何链接提供者"] }, "Write a message …": { v: ["编写信息 ..."] } } }, { l: "zh-HK", t: { "Message limit of %n character reached": { p: "Message limit of %n characters reached", v: ["已達到訊息最多 %n 字元限制"] }, "No link provider found": { v: ["找不到連結提供者"] }, "Write a message …": { v: ["編寫訊息 …"] } } }, { l: "zh-TW", t: { "No link provider found": { v: ["找不到連結提供者"] }, "Write a message …": { v: ["編寫訊息……"] } } }], I1 = [{ l: "ar", t: { "More items …": { v: ["عناصر أخرى ..."] } } }, { l: "ast", t: { "More items …": { v: ["Más elementos…"] } } }, { l: "br", t: {} }, { l: "ca", t: { "More items …": { v: ["Més artícles..."] } } }, { l: "cs", t: { "More items …": { v: ["Další položky…"] } } }, { l: "cs-CZ", t: { "More items …": { v: ["Další položky…"] } } }, { l: "da", t: { "More items …": { v: ["Mere ..."] } } }, { l: "de", t: { "More items …": { v: ["Weitere Elemente …"] } } }, { l: "de-DE", t: { "More items …": { v: ["Weitere Elemente …"] } } }, { l: "el", t: { "More items …": { v: ["Περισσότερα στοιχεία …"] } } }, { l: "en-GB", t: { "More items …": { v: ["More items …"] } } }, { l: "eo", t: {} }, { l: "es", t: { "More items …": { v: ["Más ítems ..."] } } }, { l: "es-AR", t: { "More items …": { v: ["Más elementos..."] } } }, { l: "es-EC", t: { "More items …": { v: ["Más elementos..."] } } }, { l: "es-MX", t: { "More items …": { v: ["Más Elementos ..."] } } }, { l: "et-EE", t: { "More items …": { v: ["Rohkem objekte ..."] } } }, { l: "eu", t: { "More items …": { v: ["Elementu gehiago …"] } } }, { l: "fa", t: { "More items …": { v: ["موارد بیشتر ..."] } } }, { l: "fi", t: { "More items …": { v: ["Lisää kohteita…"] } } }, { l: "fr", t: { "More items …": { v: ["Plus d'éléments..."] } } }, { l: "ga", t: { "More items …": { v: ["Tuilleadh earraí…"] } } }, { l: "gl", t: { "More items …": { v: ["Máis elementos…"] } } }, { l: "he", t: { "More items …": { v: ["פריטים נוספים…"] } } }, { l: "hu", t: { "More items …": { v: ["További elemek..."] } } }, { l: "id", t: { "More items …": { v: ["Item lainnya…"] } } }, { l: "is", t: { "More items …": { v: ["Fleiri atriði …"] } } }, { l: "it", t: { "More items …": { v: ["Più elementi ..."] } } }, { l: "ja", t: { "More items …": { v: ["他のアイテム"] } } }, { l: "ja-JP", t: { "More items …": { v: ["他のアイテム"] } } }, { l: "ko", t: { "More items …": { v: ["항목 더 보기..."] } } }, { l: "lt-LT", t: {} }, { l: "lv", t: {} }, { l: "mk", t: {} }, { l: "my", t: {} }, { l: "nb", t: { "More items …": { v: ["Flere gjenstander..."] } } }, { l: "nl", t: { "More items …": { v: ["Meer items…"] } } }, { l: "oc", t: {} }, { l: "pl", t: { "More items …": { v: ["Więcej pozycji…"] } } }, { l: "pt-BR", t: { "More items …": { v: ["Mais itens …"] } } }, { l: "pt-PT", t: { "More items …": { v: ["Mais itens…"] } } }, { l: "ro", t: { "More items …": { v: ["Mai multe articole ..."] } } }, { l: "ru", t: { "More items …": { v: ["Больше элементов..."] } } }, { l: "sk", t: { "More items …": { v: ["Viac položiek..."] } } }, { l: "sl", t: { "More items …": { v: ["Več predmetov ..."] } } }, { l: "sr", t: { "More items …": { v: ["Још ставки..."] } } }, { l: "sv", t: { "More items …": { v: ["Fler objekt …"] } } }, { l: "tr", t: { "More items …": { v: ["Diğer ögeler…"] } } }, { l: "uk", t: { "More items …": { v: ["Більше об'єктів..."] } } }, { l: "uz", t: { "More items …": { v: ["Ko`proq tafsilotlar..."] } } }, { l: "zh-CN", t: { "More items …": { v: ["更多项目…"] } } }, { l: "zh-HK", t: { "More items …": { v: ["更多項目 …"] } } }, { l: "zh-TW", t: { "More items …": { v: ["更多項目……"] } } }], L1 = [{ l: "ar", t: { Next: { v: ["التالي"] }, "Pause slideshow": { v: ["تجميد عرض الشرائح"] }, Previous: { v: ["السابق"] }, "Start slideshow": { v: ["إبدإ العرض"] } } }, { l: "ast", t: { Next: { v: ["Siguiente"] }, "Pause slideshow": { v: ["Posar la presentación de diapositives"] }, Previous: { v: ["Anterior"] }, "Start slideshow": { v: ["Aniciar la presentación de diapositives"] } } }, { l: "br", t: { Next: { v: ["Da heul"] }, "Pause slideshow": { v: ["Arsav an diaporama"] }, Previous: { v: ["A-raok"] }, "Start slideshow": { v: ["Kregiñ an diaporama"] } } }, { l: "ca", t: { Next: { v: ["Següent"] }, "Pause slideshow": { v: ["Atura la presentació"] }, Previous: { v: ["Anterior"] }, "Start slideshow": { v: ["Inicia la presentació"] } } }, { l: "cs", t: { Next: { v: ["Následující"] }, "Pause slideshow": { v: ["Pozastavit prezentaci"] }, Previous: { v: ["Předchozí"] }, "Start slideshow": { v: ["Spustit prezentaci"] } } }, { l: "cs-CZ", t: { Next: { v: ["Následující"] }, "Pause slideshow": { v: ["Pozastavit prezentaci"] }, Previous: { v: ["Předchozí"] }, "Start slideshow": { v: ["Spustit prezentaci"] } } }, { l: "da", t: { Next: { v: ["Videre"] }, "Pause slideshow": { v: ["Suspender fremvisning"] }, Previous: { v: ["Forrige"] }, "Start slideshow": { v: ["Start fremvisning"] } } }, { l: "de", t: { Next: { v: ["Weiter"] }, "Pause slideshow": { v: ["Diashow pausieren"] }, Previous: { v: ["Vorherige"] }, "Start slideshow": { v: ["Diashow starten"] } } }, { l: "de-DE", t: { Next: { v: ["Weiter"] }, "Pause slideshow": { v: ["Diashow pausieren"] }, Previous: { v: ["Vorherige"] }, "Start slideshow": { v: ["Diashow starten"] } } }, { l: "el", t: { Next: { v: ["Επόμενο"] }, "Pause slideshow": { v: ["Παύση προβολής διαφανειών"] }, Previous: { v: ["Προηγούμενο"] }, "Start slideshow": { v: ["Έναρξη προβολής διαφανειών"] } } }, { l: "en-GB", t: { Next: { v: ["Next"] }, "Pause slideshow": { v: ["Pause slideshow"] }, Previous: { v: ["Previous"] }, "Start slideshow": { v: ["Start slideshow"] } } }, { l: "eo", t: { Next: { v: ["Sekva"] }, "Pause slideshow": { v: ["Payzi bildprezenton"] }, Previous: { v: ["Antaŭa"] }, "Start slideshow": { v: ["Komenci bildprezenton"] } } }, { l: "es", t: { Next: { v: ["Siguiente"] }, "Pause slideshow": { v: ["Pausar la presentación "] }, Previous: { v: ["Anterior"] }, "Start slideshow": { v: ["Iniciar la presentación"] } } }, { l: "es-AR", t: { Next: { v: ["Siguiente"] }, "Pause slideshow": { v: ["Pausar la presentación "] }, Previous: { v: ["Anterior"] }, "Start slideshow": { v: ["Iniciar la presentación"] } } }, { l: "es-EC", t: { Next: { v: ["Siguiente"] }, "Pause slideshow": { v: ["Pausar presentación de diapositivas"] }, Previous: { v: ["Anterior"] }, "Start slideshow": { v: ["Iniciar presentación de diapositivas"] } } }, { l: "es-MX", t: { Next: { v: ["Siguiente"] }, "Pause slideshow": { v: ["Pausar presentación de diapositivas"] }, Previous: { v: ["Anterior"] }, "Start slideshow": { v: ["Iniciar presentación de diapositivas"] } } }, { l: "et-EE", t: { Next: { v: ["Edasi"] }, "Pause slideshow": { v: ["Slaidiesitluse paus"] }, Previous: { v: ["Eelmine"] }, "Start slideshow": { v: ["Alusta slaidiesitust"] } } }, { l: "eu", t: { Next: { v: ["Hurrengoa"] }, "Pause slideshow": { v: ["Pausatu diaporama"] }, Previous: { v: ["Aurrekoa"] }, "Start slideshow": { v: ["Hasi diaporama"] } } }, { l: "fa", t: { Next: { v: ["بعدی"] }, "Pause slideshow": { v: ["توقف نمایش اسلاید"] }, Previous: { v: ["قبلی"] }, "Start slideshow": { v: ["شروع نمایش اسلاید"] } } }, { l: "fi", t: { Next: { v: ["Seuraava"] }, "Pause slideshow": { v: ["Keskeytä diaesitys"] }, Previous: { v: ["Edellinen"] }, "Start slideshow": { v: ["Aloita diaesitys"] } } }, { l: "fr", t: { Next: { v: ["Suivant"] }, "Pause slideshow": { v: ["Mettre le diaporama en pause"] }, Previous: { v: ["Précédent"] }, "Start slideshow": { v: ["Démarrer le diaporama"] } } }, { l: "ga", t: { Next: { v: ["Ar aghaidh"] }, "Pause slideshow": { v: ["Cuir taispeántas sleamhnán ar sos"] }, Previous: { v: ["Roimhe Seo"] }, "Start slideshow": { v: ["Tosaigh taispeántas sleamhnán"] } } }, { l: "gl", t: { Next: { v: ["Seguinte"] }, "Pause slideshow": { v: ["Pausar o diaporama"] }, Previous: { v: ["Anterir"] }, "Start slideshow": { v: ["Iniciar o diaporama"] } } }, { l: "he", t: { Next: { v: ["הבא"] }, "Pause slideshow": { v: ["השהיית מצגת"] }, Previous: { v: ["הקודם"] }, "Start slideshow": { v: ["התחלת המצגת"] } } }, { l: "hu", t: { Next: { v: ["Következő"] }, "Pause slideshow": { v: ["Diavetítés szüneteltetése"] }, Previous: { v: ["Előző"] }, "Start slideshow": { v: ["Diavetítés indítása"] } } }, { l: "id", t: { Next: { v: ["Selanjutnya"] }, "Pause slideshow": { v: ["Jeda tayangan slide"] }, Previous: { v: ["Sebelumnya"] }, "Start slideshow": { v: ["Mulai salindia"] } } }, { l: "is", t: { Next: { v: ["Næsta"] }, "Pause slideshow": { v: ["Gera hlé á skyggnusýningu"] }, Previous: { v: ["Fyrri"] }, "Start slideshow": { v: ["Byrja skyggnusýningu"] } } }, { l: "it", t: { Next: { v: ["Successivo"] }, "Pause slideshow": { v: ["Presentazione in pausa"] }, Previous: { v: ["Precedente"] }, "Start slideshow": { v: ["Avvia presentazione"] } } }, { l: "ja", t: { Next: { v: ["次"] }, "Pause slideshow": { v: ["スライドショーを一時停止"] }, Previous: { v: ["前"] }, "Start slideshow": { v: ["スライドショーを開始"] } } }, { l: "ja-JP", t: { Next: { v: ["次"] }, "Pause slideshow": { v: ["スライドショーを一時停止"] }, Previous: { v: ["前"] }, "Start slideshow": { v: ["スライドショーを開始"] } } }, { l: "ko", t: { Next: { v: ["다음"] }, "Pause slideshow": { v: ["슬라이드쇼 일시정지"] }, Previous: { v: ["이전"] }, "Start slideshow": { v: ["슬라이드쇼 시작"] } } }, { l: "lt-LT", t: { Next: { v: ["Kitas"] }, "Pause slideshow": { v: ["Pristabdyti skaidrių rodymą"] }, Previous: { v: ["Ankstesnis"] }, "Start slideshow": { v: ["Pradėti skaidrių rodymą"] } } }, { l: "lv", t: { Next: { v: ["Nākamais"] }, "Pause slideshow": { v: ["Pauzēt slaidrādi"] }, Previous: { v: ["Iepriekšējais"] }, "Start slideshow": { v: ["Sākt slaidrādi"] } } }, { l: "mk", t: { Next: { v: ["Следно"] }, "Pause slideshow": { v: ["Пузирај слајдшоу"] }, Previous: { v: ["Предходно"] }, "Start slideshow": { v: ["Стартувај слајдшоу"] } } }, { l: "my", t: { Next: { v: ["နောက်သို့ဆက်ရန်"] }, "Pause slideshow": { v: ["စလိုက်ရှိုး ခေတ္တရပ်ရန်"] }, Previous: { v: ["ယခင်"] }, "Start slideshow": { v: ["စလိုက်ရှိုးအား စတင်ရန်"] } } }, { l: "nb", t: { Next: { v: ["Neste"] }, "Pause slideshow": { v: ["Pause lysbildefremvisning"] }, Previous: { v: ["Forrige"] }, "Start slideshow": { v: ["Start lysbildefremvisning"] } } }, { l: "nl", t: { Next: { v: ["Volgende"] }, "Pause slideshow": { v: ["Diavoorstelling pauzeren"] }, Previous: { v: ["Vorige"] }, "Start slideshow": { v: ["Diavoorstelling starten"] } } }, { l: "oc", t: { Next: { v: ["Seguent"] }, "Pause slideshow": { v: ["Metre en pausa lo diaporama"] }, Previous: { v: ["Precedent"] }, "Start slideshow": { v: ["Lançar lo diaporama"] } } }, { l: "pl", t: { Next: { v: ["Następny"] }, "Pause slideshow": { v: ["Wstrzymaj pokaz slajdów"] }, Previous: { v: ["Poprzedni"] }, "Start slideshow": { v: ["Rozpocznij pokaz slajdów"] } } }, { l: "pt-BR", t: { Next: { v: ["Próximo"] }, "Pause slideshow": { v: ["Pausar apresentação de slides"] }, Previous: { v: ["Anterior"] }, "Start slideshow": { v: ["Iniciar apresentação de slides"] } } }, { l: "pt-PT", t: { Next: { v: ["Seguinte"] }, "Pause slideshow": { v: ["Pausar diaporama"] }, Previous: { v: ["Anterior"] }, "Start slideshow": { v: ["Iniciar diaporama"] } } }, { l: "ro", t: { Next: { v: ["Următorul"] }, "Pause slideshow": { v: ["Pauză prezentare de diapozitive"] }, Previous: { v: ["Anterior"] }, "Start slideshow": { v: ["Începeți prezentarea de diapozitive"] } } }, { l: "ru", t: { Next: { v: ["Следующее"] }, "Pause slideshow": { v: ["Приостановить показ слйдов"] }, Previous: { v: ["Предыдущее"] }, "Start slideshow": { v: ["Начать показ слайдов"] } } }, { l: "sk", t: { Next: { v: ["Ďalej"] }, "Pause slideshow": { v: ["Pozastaviť prezentáciu"] }, Previous: { v: ["Predchádzajúce"] }, "Start slideshow": { v: ["Začať prezentáciu"] } } }, { l: "sl", t: { Next: { v: ["Naslednji"] }, "Pause slideshow": { v: ["Ustavi predstavitev"] }, Previous: { v: ["Predhodni"] }, "Start slideshow": { v: ["Začni predstavitev"] } } }, { l: "sr", t: { Next: { v: ["Следеће"] }, "Pause slideshow": { v: ["Паузирај слајд шоу"] }, Previous: { v: ["Претходно"] }, "Start slideshow": { v: ["Покрени слајд шоу"] } } }, { l: "sv", t: { Next: { v: ["Nästa"] }, "Pause slideshow": { v: ["Pausa bildspelet"] }, Previous: { v: ["Föregående"] }, "Start slideshow": { v: ["Starta bildspelet"] } } }, { l: "tr", t: { Next: { v: ["Sonraki"] }, "Pause slideshow": { v: ["Slayt sunumunu duraklat"] }, Previous: { v: ["Önceki"] }, "Start slideshow": { v: ["Slayt sunumunu başlat"] } } }, { l: "uk", t: { Next: { v: ["Вперед"] }, "Pause slideshow": { v: ["Пауза у показі слайдів"] }, Previous: { v: ["Назад"] }, "Start slideshow": { v: ["Почати показ слайдів"] } } }, { l: "uz", t: { Next: { v: ["Keyingi"] }, "Pause slideshow": { v: ["Slayd-shouni to'xtatib turish"] }, Previous: { v: ["Oldingi"] }, "Start slideshow": { v: ["Slayd-shouni boshlash"] } } }, { l: "zh-CN", t: { Next: { v: ["下一个"] }, "Pause slideshow": { v: ["暂停幻灯片"] }, Previous: { v: ["上一个"] }, "Start slideshow": { v: ["开始幻灯片"] } } }, { l: "zh-HK", t: { Next: { v: ["下一個"] }, "Pause slideshow": { v: ["暫停幻燈片"] }, Previous: { v: ["上一個"] }, "Start slideshow": { v: ["開始幻燈片"] } } }, { l: "zh-TW", t: { Next: { v: ["下一個"] }, "Pause slideshow": { v: ["暫停幻燈片"] }, Previous: { v: ["上一個"] }, "Start slideshow": { v: ["開始幻燈片"] } } }], F1 = [{ l: "ar", t: { "No emoji found": { v: ["لم يتم العثور على أي إيموجي emoji"] } } }, { l: "ast", t: { "No emoji found": { v: ["Nun s'atopó nengún fustaxe"] } } }, { l: "br", t: { "No emoji found": { v: ["Emoji ebet kavet"] } } }, { l: "ca", t: { "No emoji found": { v: ["No s'ha trobat cap emoji"] } } }, { l: "cs", t: { "No emoji found": { v: ["Nenalezeno žádné emoji"] } } }, { l: "cs-CZ", t: { "No emoji found": { v: ["Nenalezeno žádné emoji"] } } }, { l: "da", t: { "No emoji found": { v: ["Ingen emoji fundet"] } } }, { l: "de", t: { "No emoji found": { v: ["Kein Emoji gefunden"] } } }, { l: "de-DE", t: { "No emoji found": { v: ["Kein Emoji gefunden"] } } }, { l: "el", t: { "No emoji found": { v: ["Δεν βρέθηκε emoji"] } } }, { l: "en-GB", t: { "No emoji found": { v: ["No emoji found"] } } }, { l: "eo", t: { "No emoji found": { v: ["La emoĝio forestas"] } } }, { l: "es", t: { "No emoji found": { v: ["No se encontró ningún emoji"] } } }, { l: "es-AR", t: { "No emoji found": { v: ["No se encontró ningún emoji"] } } }, { l: "es-EC", t: { "No emoji found": { v: ["No se encontró ningún emoji"] } } }, { l: "es-MX", t: { "No emoji found": { v: ["No se encontró ningún emoji"] } } }, { l: "et-EE", t: { "No emoji found": { v: ["Emojit ei leitud"] } } }, { l: "eu", t: { "No emoji found": { v: ["Ez da emojirik aurkitu"] } } }, { l: "fa", t: { "No emoji found": { v: ["هیچ شکلکی یافت نشد"] } } }, { l: "fi", t: { "No emoji found": { v: ["Emojia ei löytynyt"] } } }, { l: "fr", t: { "No emoji found": { v: ["Pas d’émoji trouvé"] } } }, { l: "ga", t: { "No emoji found": { v: ["Níor aimsíodh emoji"] } } }, { l: "gl", t: { "No emoji found": { v: ["Non se atopou ningún «emoji»"] } } }, { l: "he", t: { "No emoji found": { v: ["לא נמצא אמוג׳י"] } } }, { l: "hu", t: { "No emoji found": { v: ["Nem található emodzsi"] } } }, { l: "id", t: { "No emoji found": { v: ["Tidak ada emoji yang ditemukan"] } } }, { l: "is", t: { "No emoji found": { v: ["Ekkert tjáningartákn fannst"] } } }, { l: "it", t: { "No emoji found": { v: ["Nessun emoji trovato"] } } }, { l: "ja", t: { "No emoji found": { v: ["絵文字が見つかりません"] } } }, { l: "ja-JP", t: { "No emoji found": { v: ["絵文字が見つかりません"] } } }, { l: "ko", t: { "No emoji found": { v: ["이모지 없음"] } } }, { l: "lt-LT", t: { "No emoji found": { v: ["Nerasta jaustukų"] } } }, { l: "lv", t: {} }, { l: "mk", t: { "No emoji found": { v: ["Не се пронајдени емотикони"] } } }, { l: "my", t: { "No emoji found": { v: ["အီမိုဂျီ ရှာဖွေမတွေ့နိုင်ပါ"] } } }, { l: "nb", t: { "No emoji found": { v: ["Fant ingen emoji"] } } }, { l: "nl", t: { "No emoji found": { v: ["Geen emoji gevonden"] } } }, { l: "oc", t: {} }, { l: "pl", t: { "No emoji found": { v: ["Nie znaleziono emoji"] } } }, { l: "pt-BR", t: { "No emoji found": { v: ["Nenhum emoji encontrado"] } } }, { l: "pt-PT", t: { "No emoji found": { v: ["Nenhum emoji encontrado"] } } }, { l: "ro", t: { "No emoji found": { v: ["Nu s-a găsit niciun emoji"] } } }, { l: "ru", t: { "No emoji found": { v: ["Эмодзи не найдено"] } } }, { l: "sk", t: { "No emoji found": { v: ["Nenašli sa žiadne emodži"] } } }, { l: "sl", t: { "No emoji found": { v: ["Ni najdenih izraznih ikon"] } } }, { l: "sr", t: { "No emoji found": { v: ["Није пронађен ниједан емођи"] } } }, { l: "sv", t: { "No emoji found": { v: ["Hittade inga emojis"] } } }, { l: "tr", t: { "No emoji found": { v: ["Herhangi bir emoji bulunamadı"] } } }, { l: "uk", t: { "No emoji found": { v: ["Емоційки відсутні"] } } }, { l: "uz", t: { "No emoji found": { v: ["Hech qanday emoji topilmadi"] } } }, { l: "zh-CN", t: { "No emoji found": { v: ["表情未找到"] } } }, { l: "zh-HK", t: { "No emoji found": { v: ["未找到表情符號"] } } }, { l: "zh-TW", t: { "No emoji found": { v: ["未找到表情符號"] } } }], D1 = [{ l: "ar", t: { 'Open link to "{resourceName}"': { v: ['إفتَح الرابط إلى "{resourceName}"'] } } }, { l: "ast", t: { 'Open link to "{resourceName}"': { v: ["Abrir l'enllaz a «{resourceName}»"] } } }, { l: "br", t: {} }, { l: "ca", t: {} }, { l: "cs", t: { 'Open link to "{resourceName}"': { v: ["Otevřít odkaz na „{resourceName}“"] } } }, { l: "cs-CZ", t: { 'Open link to "{resourceName}"': { v: ["Otevřít odkaz na „{resourceName}“"] } } }, { l: "da", t: { 'Open link to "{resourceName}"': { v: ['Åbn link til "{resourceName}"'] } } }, { l: "de", t: { 'Open link to "{resourceName}"': { v: ['Link zu "{resourceName}" öffnen'] } } }, { l: "de-DE", t: { 'Open link to "{resourceName}"': { v: ['Link zu "{resourceName}" öffnen'] } } }, { l: "el", t: { 'Open link to "{resourceName}"': { v: ['Άνοιγμα συνδέσμου για "{resourceName}"'] } } }, { l: "en-GB", t: { 'Open link to "{resourceName}"': { v: ['Open link to "{resourceName}"'] } } }, { l: "eo", t: {} }, { l: "es", t: { 'Open link to "{resourceName}"': { v: ['Abrir enlace a "{resourceName}"'] } } }, { l: "es-AR", t: { 'Open link to "{resourceName}"': { v: ['Abrir enlace a "{resourceName}"'] } } }, { l: "es-EC", t: { 'Open link to "{resourceName}"': { v: ['Abrir enlace a "{resourceName}"'] } } }, { l: "es-MX", t: { 'Open link to "{resourceName}"': { v: ['Abrir enlace a "{resourceName}"'] } } }, { l: "et-EE", t: { 'Open link to "{resourceName}"': { v: ["Ava link „{resourceName}“"] } } }, { l: "eu", t: { 'Open link to "{resourceName}"': { v: ['Ireki "{resourceName}" esteka'] } } }, { l: "fa", t: { 'Open link to "{resourceName}"': { v: ["باز کردن پیوند به «{resourceName}»"] } } }, { l: "fi", t: { 'Open link to "{resourceName}"': { v: ['Avaa linkki "{resourceName}"'] } } }, { l: "fr", t: { 'Open link to "{resourceName}"': { v: ['Ouvrir le lien vers "{resourceName}"'] } } }, { l: "ga", t: { 'Open link to "{resourceName}"': { v: ['Oscail nasc chuig "{resourceName}"'] } } }, { l: "gl", t: { 'Open link to "{resourceName}"': { v: ["Abrir a ligazón a «{resourceName}»"] } } }, { l: "he", t: { 'Open link to "{resourceName}"': { v: ["פתיחת קישור אל „{resourceName}”"] } } }, { l: "hu", t: {} }, { l: "id", t: { 'Open link to "{resourceName}"': { v: ['Buka tautan ke "{resourceName}"'] } } }, { l: "is", t: { 'Open link to "{resourceName}"': { v: ['Opna tengil í "{resourceName}"'] } } }, { l: "it", t: { 'Open link to "{resourceName}"': { v: ['Apri il link a "{resourceName}"'] } } }, { l: "ja", t: { 'Open link to "{resourceName}"': { v: ['"{resourceName}" へのリンクを開く'] } } }, { l: "ja-JP", t: { 'Open link to "{resourceName}"': { v: ['"{resourceName}" へのリンクを開く'] } } }, { l: "ko", t: { 'Open link to "{resourceName}"': { v: ['"{resourceName}"의 링크 열기'] } } }, { l: "lt-LT", t: {} }, { l: "lv", t: {} }, { l: "mk", t: {} }, { l: "my", t: {} }, { l: "nb", t: { 'Open link to "{resourceName}"': { v: ['Åpne lenken til "{resourceName}"'] } } }, { l: "nl", t: { 'Open link to "{resourceName}"': { v: ['Link naar "{resourceName}" openen'] } } }, { l: "oc", t: {} }, { l: "pl", t: { 'Open link to "{resourceName}"': { v: ['Otwórz link do "{resourceName}"'] } } }, { l: "pt-BR", t: { 'Open link to "{resourceName}"': { v: ['Abrir o link para "{resourceName}"'] } } }, { l: "pt-PT", t: { 'Open link to "{resourceName}"': { v: ['Abrir link para "{resourceName}"'] } } }, { l: "ro", t: { 'Open link to "{resourceName}"': { v: ['Deschide linkul la  "{resourceName}"'] } } }, { l: "ru", t: { 'Open link to "{resourceName}"': { v: ['Открыть ссылку на "{resourceName}"'] } } }, { l: "sk", t: { 'Open link to "{resourceName}"': { v: ['Otvoriť link v "{resourceName}"'] } } }, { l: "sl", t: {} }, { l: "sr", t: { 'Open link to "{resourceName}"': { v: ["Отвори линк на „{resourceName}”"] } } }, { l: "sv", t: { 'Open link to "{resourceName}"': { v: ['Öppna länken till "{resourceName}"'] } } }, { l: "tr", t: { 'Open link to "{resourceName}"': { v: ['Bağlantıyı "{resourceName}" üzerine aç'] } } }, { l: "uk", t: { 'Open link to "{resourceName}"': { v: ['Відкрити посилання на "{resourceName}"'] } } }, { l: "uz", t: { 'Open link to "{resourceName}"': { v: [' "{resourceName}" ga havolani ochish'] } } }, { l: "zh-CN", t: { 'Open link to "{resourceName}"': { v: ["打开 “{resourceName}” 的链接"] } } }, { l: "zh-HK", t: { 'Open link to "{resourceName}"': { v: ["開啟到「{resourceName}」的連結"] } } }, { l: "zh-TW", t: { 'Open link to "{resourceName}"': { v: ["開啟到「{resourceName}」的連結"] } } }], B1 = [{ l: "ar", t: { "Provider icon": { v: ["أيقونة المزوّد"] } } }, { l: "ast", t: { "Provider icon": { v: ["Iconu del fornidor"] } } }, { l: "br", t: {} }, { l: "ca", t: {} }, { l: "cs", t: { "Provider icon": { v: ["Ikona poskytovatele"] } } }, { l: "cs-CZ", t: { "Provider icon": { v: ["Ikona poskytovatele"] } } }, { l: "da", t: { "Provider icon": { v: ["Udbyder ikon"] } } }, { l: "de", t: { "Provider icon": { v: ["Anbietersymbol"] } } }, { l: "de-DE", t: { "Provider icon": { v: ["Anbietersymbol"] } } }, { l: "el", t: { "Provider icon": { v: ["Εικονίδιο παρόχου"] } } }, { l: "en-GB", t: { "Provider icon": { v: ["Provider icon"] } } }, { l: "eo", t: {} }, { l: "es", t: { "Provider icon": { v: ["Ícono del proveedor"] } } }, { l: "es-AR", t: { "Provider icon": { v: ["Ícono del proveedor"] } } }, { l: "es-EC", t: { "Provider icon": { v: ["Ícono del proveedor"] } } }, { l: "es-MX", t: { "Provider icon": { v: ["Ícono del proveedor"] } } }, { l: "et-EE", t: { "Provider icon": { v: ["Teenusepakkuja ikoon"] } } }, { l: "eu", t: { "Provider icon": { v: ["Hornitzailearen ikonoa"] } } }, { l: "fa", t: { "Provider icon": { v: ["آیکون ارائه دهنده"] } } }, { l: "fi", t: { "Provider icon": { v: ["Palveluntarjoajan kuvake"] } } }, { l: "fr", t: { "Provider icon": { v: ["Icône du fournisseur"] } } }, { l: "ga", t: { "Provider icon": { v: ["Deilbhín soláthraí"] } } }, { l: "gl", t: { "Provider icon": { v: ["Icona do provedor"] } } }, { l: "he", t: { "Provider icon": { v: ["סמל ספק"] } } }, { l: "hu", t: {} }, { l: "id", t: { "Provider icon": { v: ["Ikon penyedia"] } } }, { l: "is", t: { "Provider icon": { v: ["Táknmynd þjónustuveitu"] } } }, { l: "it", t: { "Provider icon": { v: ["Icona del provider"] } } }, { l: "ja", t: { "Provider icon": { v: ["プロバイダーのアイコン"] } } }, { l: "ja-JP", t: { "Provider icon": { v: ["プロバイダーのアイコン"] } } }, { l: "ko", t: { "Provider icon": { v: ["제공자 아이콘"] } } }, { l: "lt-LT", t: {} }, { l: "lv", t: {} }, { l: "mk", t: {} }, { l: "my", t: {} }, { l: "nb", t: { "Provider icon": { v: ["Leverandørikon"] } } }, { l: "nl", t: { "Provider icon": { v: ["Provider-pictogram"] } } }, { l: "oc", t: {} }, { l: "pl", t: { "Provider icon": { v: ["Dostawca ikony"] } } }, { l: "pt-BR", t: { "Provider icon": { v: ["Ícone do provedor"] } } }, { l: "pt-PT", t: { "Provider icon": { v: ["Ícone do fornecedor"] } } }, { l: "ro", t: { "Provider icon": { v: ["Provider pentru icon"] } } }, { l: "ru", t: { "Provider icon": { v: ["Значок поставщика"] } } }, { l: "sk", t: { "Provider icon": { v: ["Ikonka poskytovateľa"] } } }, { l: "sl", t: {} }, { l: "sr", t: { "Provider icon": { v: ["Икона пружаоца"] } } }, { l: "sv", t: { "Provider icon": { v: ["Leverantörsikon"] } } }, { l: "tr", t: { "Provider icon": { v: ["Hizmet sağlayıcı simgesi"] } } }, { l: "uk", t: { "Provider icon": { v: ["Піктограма постачальника"] } } }, { l: "uz", t: { "Provider icon": { v: ["Provayder belgisi"] } } }, { l: "zh-CN", t: { "Provider icon": { v: ["提供者图标"] } } }, { l: "zh-HK", t: { "Provider icon": { v: ["提供者圖示"] } } }, { l: "zh-TW", t: { "Provider icon": { v: ["提供者圖示"] } } }], z1 = [{ l: "ar", t: { "Related team resources": { v: ["موارد للفريق ذات صلة"] }, "View team": { v: ["عرض الفريق"] } } }, { l: "ast", t: { "Related team resources": { v: ["Recursos rellacionaos colos equipos"] }, "View team": { v: ["Ver l'equipu"] } } }, { l: "br", t: {} }, { l: "ca", t: {} }, { l: "cs", t: { "Related team resources": { v: ["Související prostředky kolektivu"] }, "View team": { v: ["Zobrazit kolektiv"] } } }, { l: "cs-CZ", t: {} }, { l: "da", t: { "Related team resources": { v: ["Relaterede teamressourcer"] }, "View team": { v: ["Se teamet"] } } }, { l: "de", t: { "Related team resources": { v: ["Verwandte Team-Ressourcen"] }, "View team": { v: ["Team anzeigen"] } } }, { l: "de-DE", t: { "Related team resources": { v: ["Verwandte Team-Ressourcen"] }, "View team": { v: ["Team anzeigen"] } } }, { l: "el", t: { "Related team resources": { v: ["Σχετικοί πόροι ομάδας"] }, "View team": { v: ["Προβολή ομάδας"] } } }, { l: "en-GB", t: { "Related team resources": { v: ["Related team resources"] }, "View team": { v: ["View team"] } } }, { l: "eo", t: {} }, { l: "es", t: { "Related team resources": { v: ["Recursos de equipo relacionados"] }, "View team": { v: ["Ver equipo"] } } }, { l: "es-AR", t: { "Related team resources": { v: ["Recursos de equipo relacionados"] }, "View team": { v: ["Ver equipo"] } } }, { l: "es-EC", t: {} }, { l: "es-MX", t: { "Related team resources": { v: ["Recursos de equipo relacionados"] }, "View team": { v: ["Ver equipo"] } } }, { l: "et-EE", t: { "Related team resources": { v: ["Tiimi seotud ressursid"] }, "View team": { v: ["Vaata tiimi"] } } }, { l: "eu", t: {} }, { l: "fa", t: { "Related team resources": { v: ["منابع تیمی مرتبط"] }, "View team": { v: ["مشاهده گروه"] } } }, { l: "fi", t: { "Related team resources": { v: ["Liittyvät tiimiresurssit"] }, "View team": { v: ["Näytä tiimi"] } } }, { l: "fr", t: { "Related team resources": { v: ["Ressources d'équipe associées"] }, "View team": { v: ["Voir l'équipe"] } } }, { l: "ga", t: { "Related team resources": { v: ["Acmhainní foirne gaolmhara"] }, "View team": { v: ["Féach ar an bhfoireann"] } } }, { l: "gl", t: { "Related team resources": { v: ["Recursos de equipo relacionados"] }, "View team": { v: ["Ver o equipo"] } } }, { l: "he", t: {} }, { l: "hu", t: {} }, { l: "id", t: {} }, { l: "is", t: { "Related team resources": { v: ["Tengd tilföng teymis"] }, "View team": { v: ["Skoða teymi"] } } }, { l: "it", t: {} }, { l: "ja", t: { "Related team resources": { v: ["チームの関連リソース"] }, "View team": { v: ["チームを表示"] } } }, { l: "ja-JP", t: { "Related team resources": { v: ["チームの関連リソース"] }, "View team": { v: ["チームを表示"] } } }, { l: "ko", t: { "Related team resources": { v: ["관련 팀 리소스"] }, "View team": { v: ["팀 보기"] } } }, { l: "lt-LT", t: {} }, { l: "lv", t: {} }, { l: "mk", t: {} }, { l: "my", t: {} }, { l: "nb", t: { "Related team resources": { v: ["Relaterte lagressurser"] }, "View team": { v: ["Se lag"] } } }, { l: "nl", t: { "Related team resources": { v: ["Verwante teambronnen"] }, "View team": { v: ["Team bekijken"] } } }, { l: "oc", t: {} }, { l: "pl", t: { "Related team resources": { v: ["Powiązane zasoby grupowe"] }, "View team": { v: ["Zobacz grupę"] } } }, { l: "pt-BR", t: { "Related team resources": { v: ["Recursos de equipe relacionados"] }, "View team": { v: ["Ver equipe"] } } }, { l: "pt-PT", t: { "Related team resources": { v: ["Recursos relacionados com a equipa"] }, "View team": { v: ["Ver equipa"] } } }, { l: "ro", t: {} }, { l: "ru", t: { "Related team resources": { v: ["Связанные командные ресурсы"] }, "View team": { v: ["Просмотр команды"] } } }, { l: "sk", t: { "Related team resources": { v: ["Súvisiace tímové zdroje"] }, "View team": { v: ["Zobraziť tím"] } } }, { l: "sl", t: {} }, { l: "sr", t: { "Related team resources": { v: ["Повезани тимски ресурси"] }, "View team": { v: ["Прикажи тим"] } } }, { l: "sv", t: { "Related team resources": { v: ["Relaterade teamresurser"] }, "View team": { v: ["Visa team"] } } }, { l: "tr", t: { "Related team resources": { v: ["İlgili takım kaynakları"] }, "View team": { v: ["Takımı görüntüle"] } } }, { l: "uk", t: { "Related team resources": { v: ["Пов'язані ресурси команди"] }, "View team": { v: ["Переглянути команду"] } } }, { l: "uz", t: { "Related team resources": { v: ["Tegishli jamoa resurslari"] }, "View team": { v: ["Jamoani ko'rish"] } } }, { l: "zh-CN", t: { "Related team resources": { v: ["相关团队资源"] }, "View team": { v: ["查看团队"] } } }, { l: "zh-HK", t: { "Related team resources": { v: ["相關團隊資源"] }, "View team": { v: ["查看團隊"] } } }, { l: "zh-TW", t: { "Related team resources": { v: ["相關團隊資源"] }, "View team": { v: ["檢視團隊"] } } }], $1 = [{ l: "ar", t: { Search: { v: ["بحث"] } } }, { l: "ast", t: { Search: { v: ["Buscar"] } } }, { l: "br", t: { Search: { v: ["Klask"] } } }, { l: "ca", t: { Search: { v: ["Cerca"] } } }, { l: "cs", t: { Search: { v: ["Hledat"] } } }, { l: "cs-CZ", t: { Search: { v: ["Hledat"] } } }, { l: "da", t: { Search: { v: ["Søg"] } } }, { l: "de", t: { Search: { v: ["Suche"] } } }, { l: "de-DE", t: { Search: { v: ["Suche"] } } }, { l: "el", t: { Search: { v: ["Αναζήτηση"] } } }, { l: "en-GB", t: { Search: { v: ["Search"] } } }, { l: "eo", t: { Search: { v: ["Serĉi"] } } }, { l: "es", t: { Search: { v: ["Buscar"] } } }, { l: "es-AR", t: { Search: { v: ["Buscar"] } } }, { l: "es-EC", t: { Search: { v: ["Buscar"] } } }, { l: "es-MX", t: { Search: { v: ["Buscar"] } } }, { l: "et-EE", t: { Search: { v: ["Otsing"] } } }, { l: "eu", t: { Search: { v: ["Bilatu"] } } }, { l: "fa", t: { Search: { v: ["جستجو"] } } }, { l: "fi", t: { Search: { v: ["Etsi"] } } }, { l: "fr", t: { Search: { v: ["Rechercher"] } } }, { l: "ga", t: { Search: { v: ["Cuardach"] } } }, { l: "gl", t: { Search: { v: ["Buscar"] } } }, { l: "he", t: { Search: { v: ["חיפוש"] } } }, { l: "hu", t: { Search: { v: ["Keresés"] } } }, { l: "id", t: { Search: { v: ["Cari"] } } }, { l: "is", t: { Search: { v: ["Leita"] } } }, { l: "it", t: { Search: { v: ["Cerca"] } } }, { l: "ja", t: { Search: { v: ["検索"] } } }, { l: "ja-JP", t: { Search: { v: ["検索"] } } }, { l: "ko", t: { Search: { v: ["검색"] } } }, { l: "lt-LT", t: { Search: { v: ["Ieškoti"] } } }, { l: "lv", t: {} }, { l: "mk", t: { Search: { v: ["Барај"] } } }, { l: "my", t: { Search: { v: ["ရှာဖွေရန်"] } } }, { l: "nb", t: { Search: { v: ["Søk"] } } }, { l: "nl", t: { Search: { v: ["Zoeken"] } } }, { l: "oc", t: {} }, { l: "pl", t: { Search: { v: ["Szukaj"] } } }, { l: "pt-BR", t: { Search: { v: ["Pesquisar"] } } }, { l: "pt-PT", t: { Search: { v: ["Pesquisar"] } } }, { l: "ro", t: { Search: { v: ["Căutare"] } } }, { l: "ru", t: { Search: { v: ["Поиск"] } } }, { l: "sk", t: { Search: { v: ["Hľadať"] } } }, { l: "sl", t: { Search: { v: ["Iskanje"] } } }, { l: "sr", t: { Search: { v: ["Претражи"] } } }, { l: "sv", t: { Search: { v: ["Sök"] } } }, { l: "tr", t: { Search: { v: ["Ara"] } } }, { l: "uk", t: { Search: { v: ["Пошук"] } } }, { l: "uz", t: { Search: { v: ["Qidiruv"] } } }, { l: "zh-CN", t: { Search: { v: ["搜索"] } } }, { l: "zh-HK", t: { Search: { v: ["搜尋"] } } }, { l: "zh-TW", t: { Search: { v: ["搜尋"] } } }], U1 = [{ l: "ar", t: { "Select provider": { v: ["اختر مزود"] } } }, { l: "ast", t: { "Select provider": { v: ["Seleicionar el fornidor"] } } }, { l: "br", t: {} }, { l: "ca", t: {} }, { l: "cs", t: { "Select provider": { v: ["Vybrat poskytovatele"] } } }, { l: "cs-CZ", t: { "Select provider": { v: ["Vybrat poskytovatele"] } } }, { l: "da", t: { "Select provider": { v: ["Vælg udbyder"] } } }, { l: "de", t: { "Select provider": { v: ["Anbieter auswählen"] } } }, { l: "de-DE", t: { "Select provider": { v: ["Anbieter auswählen"] } } }, { l: "el", t: { "Select provider": { v: ["Επιλογή παρόχου"] } } }, { l: "en-GB", t: { "Select provider": { v: ["Select provider"] } } }, { l: "eo", t: {} }, { l: "es", t: { "Select provider": { v: ["Seleccione proveedor"] } } }, { l: "es-AR", t: { "Select provider": { v: ["Elija proveedor"] } } }, { l: "es-EC", t: { "Select provider": { v: ["Seleccionar proveedor"] } } }, { l: "es-MX", t: { "Select provider": { v: ["Seleccionar proveedor"] } } }, { l: "et-EE", t: { "Select provider": { v: ["Vali teenuspakkuja"] } } }, { l: "eu", t: { "Select provider": { v: ["Hautatu hornitzailea"] } } }, { l: "fa", t: { "Select provider": { v: ["ارائه دهنده را انتخاب کنید"] } } }, { l: "fi", t: { "Select provider": { v: ["Valitse tarjoaja"] } } }, { l: "fr", t: { "Select provider": { v: ["Sélectionner un fournisseur"] } } }, { l: "ga", t: { "Select provider": { v: ["Roghnaigh soláthraí"] } } }, { l: "gl", t: { "Select provider": { v: ["Seleccionar provedor"] } } }, { l: "he", t: { "Select provider": { v: ["בחירת ספק"] } } }, { l: "hu", t: {} }, { l: "id", t: { "Select provider": { v: ["Pilih penyedia"] } } }, { l: "is", t: { "Select provider": { v: ["Veldu þjónustuveitu"] } } }, { l: "it", t: { "Select provider": { v: ["Selezionare il provider"] } } }, { l: "ja", t: { "Select provider": { v: ["プロバイダーを選択"] } } }, { l: "ja-JP", t: { "Select provider": { v: ["プロバイダーを選択"] } } }, { l: "ko", t: { "Select provider": { v: ["제공자 선택"] } } }, { l: "lt-LT", t: {} }, { l: "lv", t: {} }, { l: "mk", t: {} }, { l: "my", t: {} }, { l: "nb", t: { "Select provider": { v: ["Velg leverandør"] } } }, { l: "nl", t: { "Select provider": { v: ["Selecteer provider"] } } }, { l: "oc", t: {} }, { l: "pl", t: { "Select provider": { v: ["Wybierz dostawcę"] } } }, { l: "pt-BR", t: { "Select provider": { v: ["Selecione provedor"] } } }, { l: "pt-PT", t: { "Select provider": { v: ["Selecionar fornecedor"] } } }, { l: "ro", t: { "Select provider": { v: ["Selectați providerul"] } } }, { l: "ru", t: { "Select provider": { v: ["Выбрать поставщика"] } } }, { l: "sk", t: { "Select provider": { v: ["Vybrať poskytovateľa"] } } }, { l: "sl", t: {} }, { l: "sr", t: { "Select provider": { v: ["Изаберите пружаоца"] } } }, { l: "sv", t: { "Select provider": { v: ["Välj leverantör"] } } }, { l: "tr", t: { "Select provider": { v: ["Hizmet sağlayıcı seçin"] } } }, { l: "uk", t: { "Select provider": { v: ["Виберіть постачальника"] } } }, { l: "uz", t: { "Select provider": { v: ["Provayderni tanlang"] } } }, { l: "zh-CN", t: { "Select provider": { v: ["选择提供者"] } } }, { l: "zh-HK", t: { "Select provider": { v: ["選擇提供者"] } } }, { l: "zh-TW", t: { "Select provider": { v: ["選取提供者"] } } }], V1 = [{ l: "ar", t: { "Settings navigation": { v: ["إعدادات التّصفُّح"] } } }, { l: "ast", t: { "Settings navigation": { v: ["Navegación pela configuración"] } } }, { l: "br", t: {} }, { l: "ca", t: { "Settings navigation": { v: ["Navegació d'opcions"] } } }, { l: "cs", t: { "Settings navigation": { v: ["Pohyb po nastavení"] } } }, { l: "cs-CZ", t: { "Settings navigation": { v: ["Pohyb po nastavení"] } } }, { l: "da", t: { "Settings navigation": { v: ["Naviger i indstillinger"] } } }, { l: "de", t: { "Settings navigation": { v: ["Einstellungen für die Navigation"] } } }, { l: "de-DE", t: { "Settings navigation": { v: ["Einstellungen für die Navigation"] } } }, { l: "el", t: { "Settings navigation": { v: ["Πλοήγηση ρυθμίσεων"] } } }, { l: "en-GB", t: { "Settings navigation": { v: ["Settings navigation"] } } }, { l: "eo", t: { "Settings navigation": { v: ["Agorda navigado"] } } }, { l: "es", t: { "Settings navigation": { v: ["Navegación de ajustes"] } } }, { l: "es-AR", t: { "Settings navigation": { v: ["Navegación de configuraciones"] } } }, { l: "es-EC", t: { "Settings navigation": { v: ["Navegación de configuraciones"] } } }, { l: "es-MX", t: { "Settings navigation": { v: ["Navegación por ajustes"] } } }, { l: "et-EE", t: { "Settings navigation": { v: ["Seadistuste navigatsioon"] } } }, { l: "eu", t: { "Settings navigation": { v: ["Nabigazio ezarpenak"] } } }, { l: "fa", t: { "Settings navigation": { v: ["ناوبری تنظیمات"] } } }, { l: "fi", t: { "Settings navigation": { v: ["Asetusten navigointi"] } } }, { l: "fr", t: { "Settings navigation": { v: ["Navigation dans les paramètres"] } } }, { l: "ga", t: { "Settings navigation": { v: ["Nascleanúint socruithe"] } } }, { l: "gl", t: { "Settings navigation": { v: ["Navegación polos axustes"] } } }, { l: "he", t: { "Settings navigation": { v: ["ניווט בהגדרות"] } } }, { l: "hu", t: { "Settings navigation": { v: ["Navigáció a beállításokban"] } } }, { l: "id", t: { "Settings navigation": { v: ["Navigasi pengaturan"] } } }, { l: "is", t: { "Settings navigation": { v: ["Flakk um stillingar"] } } }, { l: "it", t: { "Settings navigation": { v: ["Navigazione delle impostazioni"] } } }, { l: "ja", t: { "Settings navigation": { v: ["ナビゲーション設定"] } } }, { l: "ja-JP", t: { "Settings navigation": { v: ["ナビゲーション設定"] } } }, { l: "ko", t: { "Settings navigation": { v: ["세팅 탐색"] } } }, { l: "lt-LT", t: { "Settings navigation": { v: ["Naršymas nustatymuose"] } } }, { l: "lv", t: {} }, { l: "mk", t: { "Settings navigation": { v: ["Параметри за навигација"] } } }, { l: "my", t: { "Settings navigation": { v: ["ချိန်ညှိချက်အညွှန်း"] } } }, { l: "nb", t: { "Settings navigation": { v: ["Navigasjonsinstillinger"] } } }, { l: "nl", t: { "Settings navigation": { v: ["Instellingen navigatie"] } } }, { l: "oc", t: {} }, { l: "pl", t: { "Settings navigation": { v: ["Ustawienia nawigacji"] } } }, { l: "pt-BR", t: { "Settings navigation": { v: ["Navegação de configurações"] } } }, { l: "pt-PT", t: { "Settings navigation": { v: ["Navegação de configurações"] } } }, { l: "ro", t: { "Settings navigation": { v: ["Navigare setări"] } } }, { l: "ru", t: { "Settings navigation": { v: ["Навигация по настройкам"] } } }, { l: "sk", t: { "Settings navigation": { v: ["Navigácia v nastaveniach"] } } }, { l: "sl", t: { "Settings navigation": { v: ["Krmarjenje nastavitev"] } } }, { l: "sr", t: { "Settings navigation": { v: ["Кретање по подешавањима"] } } }, { l: "sv", t: { "Settings navigation": { v: ["Inställningsmeny"] } } }, { l: "tr", t: { "Settings navigation": { v: ["Gezinme ayarları"] } } }, { l: "uk", t: { "Settings navigation": { v: ["Навігація у налаштуваннях"] } } }, { l: "uz", t: { "Settings navigation": { v: ["Sozlamalar navigatsiyasi"] } } }, { l: "zh-CN", t: { "Settings navigation": { v: ["设置向导"] } } }, { l: "zh-HK", t: { "Settings navigation": { v: ["設定值導覽"] } } }, { l: "zh-TW", t: { "Settings navigation": { v: ["設定值導覽"] } } }], H1 = [{ l: "ar", t: { Submit: { v: ["إرسال"] } } }, { l: "ast", t: { Submit: { v: ["Unviar"] } } }, { l: "br", t: {} }, { l: "ca", t: { Submit: { v: ["Envia"] } } }, { l: "cs", t: { Submit: { v: ["Odeslat"] } } }, { l: "cs-CZ", t: { Submit: { v: ["Odeslat"] } } }, { l: "da", t: { Submit: { v: ["Send"] } } }, { l: "de", t: { Submit: { v: ["Einreichen"] } } }, { l: "de-DE", t: { Submit: { v: ["Einreichen"] } } }, { l: "el", t: { Submit: { v: ["Υποβολή"] } } }, { l: "en-GB", t: { Submit: { v: ["Submit"] } } }, { l: "eo", t: {} }, { l: "es", t: { Submit: { v: ["Enviar"] } } }, { l: "es-AR", t: { Submit: { v: ["Enviar"] } } }, { l: "es-EC", t: { Submit: { v: ["Enviar"] } } }, { l: "es-MX", t: { Submit: { v: ["Enviar"] } } }, { l: "et-EE", t: { Submit: { v: ["Saada"] } } }, { l: "eu", t: { Submit: { v: ["Bidali"] } } }, { l: "fa", t: { Submit: { v: ["ارسال"] } } }, { l: "fi", t: { Submit: { v: ["Lähetä"] } } }, { l: "fr", t: { Submit: { v: ["Valider"] } } }, { l: "ga", t: { Submit: { v: ["Cuir isteach"] } } }, { l: "gl", t: { Submit: { v: ["Enviar"] } } }, { l: "he", t: { Submit: { v: ["הגשה"] } } }, { l: "hu", t: { Submit: { v: ["Beküldés"] } } }, { l: "id", t: { Submit: { v: ["Kirimkan"] } } }, { l: "is", t: { Submit: { v: ["Senda inn"] } } }, { l: "it", t: { Submit: { v: ["Invia"] } } }, { l: "ja", t: { Submit: { v: ["提出"] } } }, { l: "ja-JP", t: { Submit: { v: ["提出"] } } }, { l: "ko", t: { Submit: { v: ["제출"] } } }, { l: "lt-LT", t: { Submit: { v: ["Pateikti"] } } }, { l: "lv", t: {} }, { l: "mk", t: { Submit: { v: ["Испрати"] } } }, { l: "my", t: { Submit: { v: ["တင်သွင်းရန်"] } } }, { l: "nb", t: { Submit: { v: ["Send"] } } }, { l: "nl", t: { Submit: { v: ["Indienen"] } } }, { l: "oc", t: {} }, { l: "pl", t: { Submit: { v: ["Wyślij"] } } }, { l: "pt-BR", t: { Submit: { v: ["Enviar"] } } }, { l: "pt-PT", t: { Submit: { v: ["Submeter"] } } }, { l: "ro", t: { Submit: { v: ["Trimiteți"] } } }, { l: "ru", t: { Submit: { v: ["Утвердить"] } } }, { l: "sk", t: { Submit: { v: ["Odoslať"] } } }, { l: "sl", t: { Submit: { v: ["Pošlji"] } } }, { l: "sr", t: { Submit: { v: ["Поднеси"] } } }, { l: "sv", t: { Submit: { v: ["Skicka"] } } }, { l: "tr", t: { Submit: { v: ["Gönder"] } } }, { l: "uk", t: { Submit: { v: ["Надіслати"] } } }, { l: "uz", t: { Submit: { v: ["Yuborish"] } } }, { l: "zh-CN", t: { Submit: { v: ["提交"] } } }, { l: "zh-HK", t: { Submit: { v: ["提交"] } } }, { l: "zh-TW", t: { Submit: { v: ["遞交"] } } }], q1 = [{ l: "ar", t: { "Unable to search the group": { v: ["تعذّر البحث في المجموعة"] } } }, { l: "ast", t: { "Unable to search the group": { v: ["Nun ye posible buscar el grupu"] } } }, { l: "br", t: { "Unable to search the group": { v: ["Dibosupl eo klask ar strollad"] } } }, { l: "ca", t: { "Unable to search the group": { v: ["No es pot cercar el grup"] } } }, { l: "cs", t: { "Unable to search the group": { v: ["Nedaří se hledat skupinu"] } } }, { l: "cs-CZ", t: { "Unable to search the group": { v: ["Nedaří se hledat skupinu"] } } }, { l: "da", t: { "Unable to search the group": { v: ["Kan ikke søge på denne gruppe"] } } }, { l: "de", t: { "Unable to search the group": { v: ["Die Gruppe kann nicht durchsucht werden"] } } }, { l: "de-DE", t: { "Unable to search the group": { v: ["Die Gruppe kann nicht durchsucht werden"] } } }, { l: "el", t: { "Unable to search the group": { v: ["Δεν είναι δυνατή η αναζήτηση της ομάδας"] } } }, { l: "en-GB", t: { "Unable to search the group": { v: ["Unable to search the group"] } } }, { l: "eo", t: { "Unable to search the group": { v: ["Ne eblas serĉi en la grupo"] } } }, { l: "es", t: { "Unable to search the group": { v: ["No es posible buscar en el grupo"] } } }, { l: "es-AR", t: { "Unable to search the group": { v: ["No se puede buscar el grupo"] } } }, { l: "es-EC", t: { "Unable to search the group": { v: ["No se puede buscar en el grupo"] } } }, { l: "es-MX", t: { "Unable to search the group": { v: ["No fue posible buscar en el grupo"] } } }, { l: "et-EE", t: { "Unable to search the group": { v: ["Gruppi ei ole võimalik otsida"] } } }, { l: "eu", t: { "Unable to search the group": { v: ["Ezin izan da taldea bilatu"] } } }, { l: "fa", t: { "Unable to search the group": { v: ["امکان جستجوی گروه وجود ندارد"] } } }, { l: "fi", t: { "Unable to search the group": { v: ["Ryhmää ei voi hakea"] } } }, { l: "fr", t: { "Unable to search the group": { v: ["Impossible de chercher le groupe"] } } }, { l: "ga", t: { "Unable to search the group": { v: ["Ní féidir an grúpa a chuardach"] } } }, { l: "gl", t: { "Unable to search the group": { v: ["Non foi posíbel buscar o grupo"] } } }, { l: "he", t: { "Unable to search the group": { v: ["לא ניתן לחפש בקבוצה"] } } }, { l: "hu", t: { "Unable to search the group": { v: ["A csoport nem kereshető"] } } }, { l: "id", t: { "Unable to search the group": { v: ["Tidak dapat mencari dalam grup"] } } }, { l: "is", t: { "Unable to search the group": { v: ["Get ekki leitað í hópnum"] } } }, { l: "it", t: { "Unable to search the group": { v: ["Impossibile cercare il gruppo"] } } }, { l: "ja", t: { "Unable to search the group": { v: ["グループを検索できません"] } } }, { l: "ja-JP", t: { "Unable to search the group": { v: ["グループを検索できません"] } } }, { l: "ko", t: { "Unable to search the group": { v: ["그룹을 검색할 수 없음"] } } }, { l: "lt-LT", t: { "Unable to search the group": { v: ["Nepavyko atlikti paiešką grupėje"] } } }, { l: "lv", t: {} }, { l: "mk", t: { "Unable to search the group": { v: ["Неможе да се принајде групата"] } } }, { l: "my", t: { "Unable to search the group": { v: ["အဖွဲ့အား ရှာဖွေ၍ မရနိုင်ပါ"] } } }, { l: "nb", t: { "Unable to search the group": { v: ["Kunne ikke søke i gruppen"] } } }, { l: "nl", t: { "Unable to search the group": { v: ["Kan niet zoeken in de groep"] } } }, { l: "oc", t: {} }, { l: "pl", t: { "Unable to search the group": { v: ["Nie można przeszukać grupy"] } } }, { l: "pt-BR", t: { "Unable to search the group": { v: ["Não foi possível pesquisar o grupo"] } } }, { l: "pt-PT", t: { "Unable to search the group": { v: ["Não é possível pesquisar o grupo"] } } }, { l: "ro", t: { "Unable to search the group": { v: ["Imposibilitatea de a căuta în grup"] } } }, { l: "ru", t: { "Unable to search the group": { v: ["Невозможно найти группу"] } } }, { l: "sk", t: { "Unable to search the group": { v: ["Skupinu sa nepodarilo nájsť"] } } }, { l: "sl", t: { "Unable to search the group": { v: ["Ni mogoče iskati po skupini"] } } }, { l: "sr", t: { "Unable to search the group": { v: ["Група не може да се претражи"] } } }, { l: "sv", t: { "Unable to search the group": { v: ["Kunde inte söka i gruppen"] } } }, { l: "tr", t: { "Unable to search the group": { v: ["Grupta arama yapılamadı"] } } }, { l: "uk", t: { "Unable to search the group": { v: ["Неможливо шукати в групі"] } } }, { l: "uz", t: { "Unable to search the group": { v: ["Guruhni qidirish imkonsiz"] } } }, { l: "zh-CN", t: { "Unable to search the group": { v: ["无法搜索分组"] } } }, { l: "zh-HK", t: { "Unable to search the group": { v: ["無法搜尋群組"] } } }, { l: "zh-TW", t: { "Unable to search the group": { v: ["無法搜尋群組"] } } }], W1 = [{ l: "ar", t: { "Undo changes": { v: ["تراجَع عن التغييرات"] } } }, { l: "ast", t: { "Undo changes": { v: ["Desfacer los cambeos"] } } }, { l: "br", t: {} }, { l: "ca", t: { "Undo changes": { v: ["Desfés els canvis"] } } }, { l: "cs", t: { "Undo changes": { v: ["Vzít změny zpět"] } } }, { l: "cs-CZ", t: { "Undo changes": { v: ["Vzít změny zpět"] } } }, { l: "da", t: { "Undo changes": { v: ["Fortryd ændringer"] } } }, { l: "de", t: { "Undo changes": { v: ["Änderungen rückgängig machen"] } } }, { l: "de-DE", t: { "Undo changes": { v: ["Änderungen rückgängig machen"] } } }, { l: "el", t: { "Undo changes": { v: ["Αναίρεση Αλλαγών"] } } }, { l: "en-GB", t: { "Undo changes": { v: ["Undo changes"] } } }, { l: "eo", t: {} }, { l: "es", t: { "Undo changes": { v: ["Deshacer cambios"] } } }, { l: "es-AR", t: { "Undo changes": { v: ["Deshacer cambios"] } } }, { l: "es-EC", t: { "Undo changes": { v: ["Deshacer cambios"] } } }, { l: "es-MX", t: { "Undo changes": { v: ["Deshacer cambios"] } } }, { l: "et-EE", t: { "Undo changes": { v: ["Pööra muudatused tagasi"] } } }, { l: "eu", t: { "Undo changes": { v: ["Aldaketak desegin"] } } }, { l: "fa", t: { "Undo changes": { v: ["لغو تغییرات"] } } }, { l: "fi", t: { "Undo changes": { v: ["Kumoa muutokset"] } } }, { l: "fr", t: { "Undo changes": { v: ["Annuler les changements"] } } }, { l: "ga", t: { "Undo changes": { v: ["Cealaigh athruithe"] } } }, { l: "gl", t: { "Undo changes": { v: ["Desfacer os cambios"] } } }, { l: "he", t: { "Undo changes": { v: ["ביטול שינויים"] } } }, { l: "hu", t: { "Undo changes": { v: ["Változtatások visszavonása"] } } }, { l: "id", t: { "Undo changes": { v: ["Urungkan perubahan"] } } }, { l: "is", t: { "Undo changes": { v: ["Afturkalla breytingar"] } } }, { l: "it", t: { "Undo changes": { v: ["Cancella i cambiamenti"] } } }, { l: "ja", t: { "Undo changes": { v: ["変更を取り消し"] } } }, { l: "ja-JP", t: { "Undo changes": { v: ["変更を取り消し"] } } }, { l: "ko", t: { "Undo changes": { v: ["변경 되돌리기"] } } }, { l: "lt-LT", t: {} }, { l: "lv", t: {} }, { l: "mk", t: { "Undo changes": { v: ["Врати ги промените"] } } }, { l: "my", t: {} }, { l: "nb", t: { "Undo changes": { v: ["Tilbakestill endringer"] } } }, { l: "nl", t: { "Undo changes": { v: ["Wijzigingen ongedaan maken"] } } }, { l: "oc", t: {} }, { l: "pl", t: { "Undo changes": { v: ["Cofnij zmiany"] } } }, { l: "pt-BR", t: { "Undo changes": { v: ["Desfazer modificações"] } } }, { l: "pt-PT", t: { "Undo changes": { v: ["Anular alterações"] } } }, { l: "ro", t: { "Undo changes": { v: ["Anularea modificărilor"] } } }, { l: "ru", t: { "Undo changes": { v: ["Отменить изменения"] } } }, { l: "sk", t: { "Undo changes": { v: ["Vrátiť zmeny"] } } }, { l: "sl", t: { "Undo changes": { v: ["Razveljavi spremembe"] } } }, { l: "sr", t: { "Undo changes": { v: ["Поништи измене"] } } }, { l: "sv", t: { "Undo changes": { v: ["Ångra ändringar"] } } }, { l: "tr", t: { "Undo changes": { v: ["Değişiklikleri geri al"] } } }, { l: "uk", t: { "Undo changes": { v: ["Скасувати зміни"] } } }, { l: "uz", t: { "Undo changes": { v: ["O'zgarishlarni bekor qilish"] } } }, { l: "zh-CN", t: { "Undo changes": { v: ["撤销更改"] } } }, { l: "zh-HK", t: { "Undo changes": { v: ["取消更改"] } } }, { l: "zh-TW", t: { "Undo changes": { v: ["還原變更"] } } }];
function G1(e4, t = {}) {
  const n = d1();
  ft(e4, () => {
    Pm(t.disabled) || (Pm(e4) ? n.pause() : n.unpause());
  }), vi(() => {
    n.unpause();
  });
}
const Nt = (e4, t) => {
  const n = e4.__vccOpts || e4;
  for (const [r, i] of t) n[r] = i;
  return n;
}, Z1 = { class: "button-vue__wrapper" }, K1 = { class: "button-vue__icon" }, Y1 = { class: "button-vue__text" }, X1 = Zt({ __name: "NcButton", props: { alignment: { default: "center" }, ariaLabel: { default: void 0 }, disabled: { type: Boolean }, download: { type: [String, Boolean], default: void 0 }, href: { default: void 0 }, pressed: { type: Boolean, default: void 0 }, size: { default: "normal" }, target: { default: "_self" }, text: { default: void 0 }, to: { default: void 0 }, type: { default: "button" }, variant: { default: "secondary" }, wide: { type: Boolean } }, emits: ["click", "update:pressed"], setup(e4, { emit: t }) {
  const n = e4, r = t, i = kt(_s, null) !== null, s = ke(() => i && n.to ? "RouterLink" : n.href ? "a" : "button"), o = ke(() => s.value === "button" && typeof n.pressed == "boolean"), a = ke(() => n.pressed ? "primary" : n.pressed === false && n.variant === "primary" ? "secondary" : n.variant), l = ke(() => a.value.startsWith("tertiary")), u = ke(() => n.alignment.split("-")[0]), c = ke(() => n.alignment.includes("-")), f = kt("NcPopover:trigger:attrs", () => ({}), false), p = ke(() => f()), v = ke(() => {
    if (s.value === "RouterLink") return { to: n.to, activeClass: "active" };
    if (s.value === "a") return { href: n.href || "#", target: n.target, rel: "nofollow noreferrer noopener", download: n.download || void 0 };
    if (s.value === "button") return { ...p.value, "aria-pressed": n.pressed, type: n.type, disabled: n.disabled };
  });
  function m(y) {
    o.value && r("update:pressed", !n.pressed), r("click", y);
  }
  return (y, k) => (oe(), at(Zl(s.value), mn({ class: ["button-vue", [`button-vue--size-${y.size}`, { [`button-vue--${a.value}`]: a.value, "button-vue--tertiary": l.value, "button-vue--wide": y.wide, [`button-vue--${u.value}`]: u.value !== "center", "button-vue--reverse": c.value }]], "aria-label": y.ariaLabel }, v.value, { onClick: m }), { default: et(() => [Ae("span", Z1, [Ae("span", K1, [Mt(y.$slots, "icon", {}, void 0, true)]), Ae("span", Y1, [Mt(y.$slots, "default", {}, () => [Ko(qe(y.text), 1)], true)])])]), _: 3 }, 16, ["class", "aria-label"]));
} }), Oi = Nt(X1, [["__scopeId", "data-v-e2fd60a6"]]), J1 = ["top", "right", "bottom", "left"], Ym = ["start", "end"], Xm = J1.reduce((e4, t) => e4.concat(t, t + "-" + Ym[0], t + "-" + Ym[1]), []), Pi = Math.min, Er = Math.max, Q1 = Math.round, eN = Math.floor, tN = (e4) => ({ x: e4, y: e4 }), nN = { left: "right", right: "left", bottom: "top", top: "bottom" }, rN = { start: "end", end: "start" };
function Pu(e4, t, n) {
  return Er(e4, Pi(t, n));
}
function sr(e4, t) {
  return typeof e4 == "function" ? e4(t) : e4;
}
function kn(e4) {
  return e4.split("-")[0];
}
function wn(e4) {
  return e4.split("-")[1];
}
function xu(e4) {
  return e4 === "x" ? "y" : "x";
}
function Ru(e4) {
  return e4 === "y" ? "height" : "width";
}
const iN = /* @__PURE__ */ new Set(["top", "bottom"]);
function zn(e4) {
  return iN.has(kn(e4)) ? "y" : "x";
}
function Mu(e4) {
  return xu(zn(e4));
}
function Jm(e4, t, n) {
  n === void 0 && (n = false);
  const r = wn(e4), i = Mu(e4), s = Ru(i);
  let o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (o = Ea(o)), [o, Ea(o)];
}
function sN(e4) {
  const t = Ea(e4);
  return [Sa(e4), t, Sa(t)];
}
function Sa(e4) {
  return e4.replace(/start|end/g, (t) => rN[t]);
}
const Qm = ["left", "right"], eg = ["right", "left"], oN = ["top", "bottom"], aN = ["bottom", "top"];
function lN(e4, t, n) {
  switch (e4) {
    case "top":
    case "bottom":
      return n ? t ? eg : Qm : t ? Qm : eg;
    case "left":
    case "right":
      return t ? oN : aN;
    default:
      return [];
  }
}
function cN(e4, t, n, r) {
  const i = wn(e4);
  let s = lN(kn(e4), n === "start", r);
  return i && (s = s.map((o) => o + "-" + i), t && (s = s.concat(s.map(Sa)))), s;
}
function Ea(e4) {
  return e4.replace(/left|right|bottom|top/g, (t) => nN[t]);
}
function uN(e4) {
  return { top: 0, right: 0, bottom: 0, left: 0, ...e4 };
}
function tg(e4) {
  return typeof e4 != "number" ? uN(e4) : { top: e4, right: e4, bottom: e4, left: e4 };
}
function xi(e4) {
  const { x: t, y: n, width: r, height: i } = e4;
  return { width: r, height: i, top: n, left: t, right: t + r, bottom: n + i, x: t, y: n };
}
function ng(e4, t, n) {
  let { reference: r, floating: i } = e4;
  const s = zn(t), o = Mu(t), a = Ru(o), l = kn(t), u = s === "y", c = r.x + r.width / 2 - i.width / 2, f = r.y + r.height / 2 - i.height / 2, p = r[a] / 2 - i[a] / 2;
  let v;
  switch (l) {
    case "top":
      v = { x: c, y: r.y - i.height };
      break;
    case "bottom":
      v = { x: c, y: r.y + r.height };
      break;
    case "right":
      v = { x: r.x + r.width, y: f };
      break;
    case "left":
      v = { x: r.x - i.width, y: f };
      break;
    default:
      v = { x: r.x, y: r.y };
  }
  switch (wn(t)) {
    case "start":
      v[o] -= p * (n && u ? -1 : 1);
      break;
    case "end":
      v[o] += p * (n && u ? -1 : 1);
      break;
  }
  return v;
}
const rg = async (e4, t, n) => {
  const { placement: r = "bottom", strategy: i = "absolute", middleware: s = [], platform: o } = n, a = s.filter(Boolean), l = await (o.isRTL == null ? void 0 : o.isRTL(t));
  let u = await o.getElementRects({ reference: e4, floating: t, strategy: i }), { x: c, y: f } = ng(u, r, l), p = r, v = {}, m = 0;
  for (let y = 0; y < a.length; y++) {
    const { name: k, fn: E } = a[y], { x: A, y: C, data: x, reset: F } = await E({ x: c, y: f, initialPlacement: r, placement: p, strategy: i, middlewareData: v, rects: u, platform: o, elements: { reference: e4, floating: t } });
    c = A ?? c, f = C ?? f, v = { ...v, [k]: { ...v[k], ...x } }, F && m <= 50 && (m++, typeof F == "object" && (F.placement && (p = F.placement), F.rects && (u = F.rects === true ? await o.getElementRects({ reference: e4, floating: t, strategy: i }) : F.rects), { x: c, y: f } = ng(u, p, l)), y = -1);
  }
  return { x: c, y: f, placement: p, strategy: i, middlewareData: v };
};
async function Aa(e4, t) {
  var n;
  t === void 0 && (t = {});
  const { x: r, y: i, platform: s, rects: o, elements: a, strategy: l } = e4, { boundary: u = "clippingAncestors", rootBoundary: c = "viewport", elementContext: f = "floating", altBoundary: p = false, padding: v = 0 } = sr(t, e4), m = tg(v), k = a[p ? f === "floating" ? "reference" : "floating" : f], E = xi(await s.getClippingRect({ element: (n = await (s.isElement == null ? void 0 : s.isElement(k))) == null || n ? k : k.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(a.floating)), boundary: u, rootBoundary: c, strategy: l })), A = f === "floating" ? { x: r, y: i, width: o.floating.width, height: o.floating.height } : o.reference, C = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(a.floating)), x = await (s.isElement == null ? void 0 : s.isElement(C)) ? await (s.getScale == null ? void 0 : s.getScale(C)) || { x: 1, y: 1 } : { x: 1, y: 1 }, F = xi(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({ elements: a, rect: A, offsetParent: C, strategy: l }) : A);
  return { top: (E.top - F.top + m.top) / x.y, bottom: (F.bottom - E.bottom + m.bottom) / x.y, left: (E.left - F.left + m.left) / x.x, right: (F.right - E.right + m.right) / x.x };
}
const dN = (e4) => ({ name: "arrow", options: e4, async fn(t) {
  const { x: n, y: r, placement: i, rects: s, platform: o, elements: a, middlewareData: l } = t, { element: u, padding: c = 0 } = sr(e4, t) || {};
  if (u == null) return {};
  const f = tg(c), p = { x: n, y: r }, v = Mu(i), m = Ru(v), y = await o.getDimensions(u), k = v === "y", E = k ? "top" : "left", A = k ? "bottom" : "right", C = k ? "clientHeight" : "clientWidth", x = s.reference[m] + s.reference[v] - p[v] - s.floating[m], F = p[v] - s.reference[v], Y = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(u));
  let U = Y ? Y[C] : 0;
  (!U || !await (o.isElement == null ? void 0 : o.isElement(Y))) && (U = a.floating[C] || s.floating[m]);
  const V = x / 2 - F / 2, M = U / 2 - y[m] / 2 - 1, q = Pi(f[E], M), Q = Pi(f[A], M), z = q, O = U - y[m] - Q, j = U / 2 - y[m] / 2 + V, X = Pu(z, j, O), re = !l.arrow && wn(i) != null && j !== X && s.reference[m] / 2 - (j < z ? q : Q) - y[m] / 2 < 0, G = re ? j < z ? j - z : j - O : 0;
  return { [v]: p[v] + G, data: { [v]: X, centerOffset: j - X - G, ...re && { alignmentOffset: G } }, reset: re };
} });
function fN(e4, t, n) {
  return (e4 ? [...n.filter((i) => wn(i) === e4), ...n.filter((i) => wn(i) !== e4)] : n.filter((i) => kn(i) === i)).filter((i) => e4 ? wn(i) === e4 || (t ? Sa(i) !== i : false) : true);
}
const hN = function(e4) {
  return e4 === void 0 && (e4 = {}), { name: "autoPlacement", options: e4, async fn(t) {
    var n, r, i;
    const { rects: s, middlewareData: o, placement: a, platform: l, elements: u } = t, { crossAxis: c = false, alignment: f, allowedPlacements: p = Xm, autoAlignment: v = true, ...m } = sr(e4, t), y = f !== void 0 || p === Xm ? fN(f || null, v, p) : p, k = await Aa(t, m), E = ((n = o.autoPlacement) == null ? void 0 : n.index) || 0, A = y[E];
    if (A == null) return {};
    const C = Jm(A, s, await (l.isRTL == null ? void 0 : l.isRTL(u.floating)));
    if (a !== A) return { reset: { placement: y[0] } };
    const x = [k[kn(A)], k[C[0]], k[C[1]]], F = [...((r = o.autoPlacement) == null ? void 0 : r.overflows) || [], { placement: A, overflows: x }], Y = y[E + 1];
    if (Y) return { data: { index: E + 1, overflows: F }, reset: { placement: Y } };
    const U = F.map((q) => {
      const Q = wn(q.placement);
      return [q.placement, Q && c ? q.overflows.slice(0, 2).reduce((z, O) => z + O, 0) : q.overflows[0], q.overflows];
    }).sort((q, Q) => q[1] - Q[1]), M = ((i = U.filter((q) => q[2].slice(0, wn(q[0]) ? 2 : 3).every((Q) => Q <= 0))[0]) == null ? void 0 : i[0]) || U[0][0];
    return M !== a ? { data: { index: E + 1, overflows: F }, reset: { placement: M } } : {};
  } };
}, ig = function(e4) {
  return e4 === void 0 && (e4 = {}), { name: "flip", options: e4, async fn(t) {
    var n, r;
    const { placement: i, middlewareData: s, rects: o, initialPlacement: a, platform: l, elements: u } = t, { mainAxis: c = true, crossAxis: f = true, fallbackPlacements: p, fallbackStrategy: v = "bestFit", fallbackAxisSideDirection: m = "none", flipAlignment: y = true, ...k } = sr(e4, t);
    if ((n = s.arrow) != null && n.alignmentOffset) return {};
    const E = kn(i), A = zn(a), C = kn(a) === a, x = await (l.isRTL == null ? void 0 : l.isRTL(u.floating)), F = p || (C || !y ? [Ea(a)] : sN(a)), Y = m !== "none";
    !p && Y && F.push(...cN(a, y, m, x));
    const U = [a, ...F], V = await Aa(t, k), M = [];
    let q = ((r = s.flip) == null ? void 0 : r.overflows) || [];
    if (c && M.push(V[E]), f) {
      const j = Jm(i, o, x);
      M.push(V[j[0]], V[j[1]]);
    }
    if (q = [...q, { placement: i, overflows: M }], !M.every((j) => j <= 0)) {
      var Q, z;
      const j = (((Q = s.flip) == null ? void 0 : Q.index) || 0) + 1, X = U[j];
      if (X && (!(f === "alignment" ? A !== zn(X) : false) || q.every((se) => zn(se.placement) === A ? se.overflows[0] > 0 : true))) return { data: { index: j, overflows: q }, reset: { placement: X } };
      let re = (z = q.filter((G) => G.overflows[0] <= 0).sort((G, se) => G.overflows[1] - se.overflows[1])[0]) == null ? void 0 : z.placement;
      if (!re) switch (v) {
        case "bestFit": {
          var O;
          const G = (O = q.filter((se) => {
            if (Y) {
              const fe = zn(se.placement);
              return fe === A || fe === "y";
            }
            return true;
          }).map((se) => [se.placement, se.overflows.filter((fe) => fe > 0).reduce((fe, Me) => fe + Me, 0)]).sort((se, fe) => se[1] - fe[1])[0]) == null ? void 0 : O[0];
          G && (re = G);
          break;
        }
        case "initialPlacement":
          re = a;
          break;
      }
      if (i !== re) return { reset: { placement: re } };
    }
    return {};
  } };
}, sg = /* @__PURE__ */ new Set(["left", "top"]);
async function vN(e4, t) {
  const { placement: n, platform: r, elements: i } = e4, s = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = kn(n), a = wn(n), l = zn(n) === "y", u = sg.has(o) ? -1 : 1, c = s && l ? -1 : 1, f = sr(t, e4);
  let { mainAxis: p, crossAxis: v, alignmentAxis: m } = typeof f == "number" ? { mainAxis: f, crossAxis: 0, alignmentAxis: null } : { mainAxis: f.mainAxis || 0, crossAxis: f.crossAxis || 0, alignmentAxis: f.alignmentAxis };
  return a && typeof m == "number" && (v = a === "end" ? m * -1 : m), l ? { x: v * c, y: p * u } : { x: p * u, y: v * c };
}
const og = function(e4) {
  return e4 === void 0 && (e4 = 0), { name: "offset", options: e4, async fn(t) {
    var n, r;
    const { x: i, y: s, placement: o, middlewareData: a } = t, l = await vN(t, e4);
    return o === ((n = a.offset) == null ? void 0 : n.placement) && (r = a.arrow) != null && r.alignmentOffset ? {} : { x: i + l.x, y: s + l.y, data: { ...l, placement: o } };
  } };
}, ag = function(e4) {
  return e4 === void 0 && (e4 = {}), { name: "shift", options: e4, async fn(t) {
    const { x: n, y: r, placement: i } = t, { mainAxis: s = true, crossAxis: o = false, limiter: a = { fn: (k) => {
      let { x: E, y: A } = k;
      return { x: E, y: A };
    } }, ...l } = sr(e4, t), u = { x: n, y: r }, c = await Aa(t, l), f = zn(kn(i)), p = xu(f);
    let v = u[p], m = u[f];
    if (s) {
      const k = p === "y" ? "top" : "left", E = p === "y" ? "bottom" : "right", A = v + c[k], C = v - c[E];
      v = Pu(A, v, C);
    }
    if (o) {
      const k = f === "y" ? "top" : "left", E = f === "y" ? "bottom" : "right", A = m + c[k], C = m - c[E];
      m = Pu(A, m, C);
    }
    const y = a.fn({ ...t, [p]: v, [f]: m });
    return { ...y, data: { x: y.x - n, y: y.y - r, enabled: { [p]: s, [f]: o } } };
  } };
}, pN = function(e4) {
  return e4 === void 0 && (e4 = {}), { options: e4, fn(t) {
    const { x: n, y: r, placement: i, rects: s, middlewareData: o } = t, { offset: a = 0, mainAxis: l = true, crossAxis: u = true } = sr(e4, t), c = { x: n, y: r }, f = zn(i), p = xu(f);
    let v = c[p], m = c[f];
    const y = sr(a, t), k = typeof y == "number" ? { mainAxis: y, crossAxis: 0 } : { mainAxis: 0, crossAxis: 0, ...y };
    if (l) {
      const C = p === "y" ? "height" : "width", x = s.reference[p] - s.floating[C] + k.mainAxis, F = s.reference[p] + s.reference[C] - k.mainAxis;
      v < x ? v = x : v > F && (v = F);
    }
    if (u) {
      var E, A;
      const C = p === "y" ? "width" : "height", x = sg.has(kn(i)), F = s.reference[f] - s.floating[C] + (x && ((E = o.offset) == null ? void 0 : E[f]) || 0) + (x ? 0 : k.crossAxis), Y = s.reference[f] + s.reference[C] + (x ? 0 : ((A = o.offset) == null ? void 0 : A[f]) || 0) - (x ? k.crossAxis : 0);
      m < F ? m = F : m > Y && (m = Y);
    }
    return { [p]: v, [f]: m };
  } };
}, mN = function(e4) {
  return e4 === void 0 && (e4 = {}), { name: "size", options: e4, async fn(t) {
    var n, r;
    const { placement: i, rects: s, platform: o, elements: a } = t, { apply: l = () => {
    }, ...u } = sr(e4, t), c = await Aa(t, u), f = kn(i), p = wn(i), v = zn(i) === "y", { width: m, height: y } = s.floating;
    let k, E;
    f === "top" || f === "bottom" ? (k = f, E = p === (await (o.isRTL == null ? void 0 : o.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (E = f, k = p === "end" ? "top" : "bottom");
    const A = y - c.top - c.bottom, C = m - c.left - c.right, x = Pi(y - c[k], A), F = Pi(m - c[E], C), Y = !t.middlewareData.shift;
    let U = x, V = F;
    if ((n = t.middlewareData.shift) != null && n.enabled.x && (V = C), (r = t.middlewareData.shift) != null && r.enabled.y && (U = A), Y && !p) {
      const q = Er(c.left, 0), Q = Er(c.right, 0), z = Er(c.top, 0), O = Er(c.bottom, 0);
      v ? V = m - 2 * (q !== 0 || Q !== 0 ? q + Q : Er(c.left, c.right)) : U = y - 2 * (z !== 0 || O !== 0 ? z + O : Er(c.top, c.bottom));
    }
    await l({ ...t, availableWidth: V, availableHeight: U });
    const M = await o.getDimensions(a.floating);
    return m !== M.width || y !== M.height ? { reset: { rects: true } } : {};
  } };
};
function cn(e4) {
  var t;
  return ((t = e4.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function $n(e4) {
  return cn(e4).getComputedStyle(e4);
}
const lg = Math.min, Hs = Math.max, Ta = Math.round;
function cg(e4) {
  const t = $n(e4);
  let n = parseFloat(t.width), r = parseFloat(t.height);
  const i = e4.offsetWidth, s = e4.offsetHeight, o = Ta(n) !== i || Ta(r) !== s;
  return o && (n = i, r = s), { width: n, height: r, fallback: o };
}
function Ar(e4) {
  return dg(e4) ? (e4.nodeName || "").toLowerCase() : "";
}
let Na;
function ug() {
  if (Na) return Na;
  const e4 = navigator.userAgentData;
  return e4 && Array.isArray(e4.brands) ? (Na = e4.brands.map(((t) => t.brand + "/" + t.version)).join(" "), Na) : navigator.userAgent;
}
function Un(e4) {
  return e4 instanceof cn(e4).HTMLElement;
}
function Tr(e4) {
  return e4 instanceof cn(e4).Element;
}
function dg(e4) {
  return e4 instanceof cn(e4).Node;
}
function fg(e4) {
  return typeof ShadowRoot > "u" ? false : e4 instanceof cn(e4).ShadowRoot || e4 instanceof ShadowRoot;
}
function Ca(e4) {
  const { overflow: t, overflowX: n, overflowY: r, display: i } = $n(e4);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !["inline", "contents"].includes(i);
}
function gN(e4) {
  return ["table", "td", "th"].includes(Ar(e4));
}
function ju(e4) {
  const t = /firefox/i.test(ug()), n = $n(e4), r = n.backdropFilter || n.WebkitBackdropFilter;
  return n.transform !== "none" || n.perspective !== "none" || !!r && r !== "none" || t && n.willChange === "filter" || t && !!n.filter && n.filter !== "none" || ["transform", "perspective"].some(((i) => n.willChange.includes(i))) || ["paint", "layout", "strict", "content"].some(((i) => {
    const s = n.contain;
    return s != null && s.includes(i);
  }));
}
function hg() {
  return !/^((?!chrome|android).)*safari/i.test(ug());
}
function Iu(e4) {
  return ["html", "body", "#document"].includes(Ar(e4));
}
function vg(e4) {
  return Tr(e4) ? e4 : e4.contextElement;
}
const pg = { x: 1, y: 1 };
function Ri(e4) {
  const t = vg(e4);
  if (!Un(t)) return pg;
  const n = t.getBoundingClientRect(), { width: r, height: i, fallback: s } = cg(t);
  let o = (s ? Ta(n.width) : n.width) / r, a = (s ? Ta(n.height) : n.height) / i;
  return o && Number.isFinite(o) || (o = 1), a && Number.isFinite(a) || (a = 1), { x: o, y: a };
}
function qs(e4, t, n, r) {
  var i, s;
  t === void 0 && (t = false), n === void 0 && (n = false);
  const o = e4.getBoundingClientRect(), a = vg(e4);
  let l = pg;
  t && (r ? Tr(r) && (l = Ri(r)) : l = Ri(e4));
  const u = a ? cn(a) : window, c = !hg() && n;
  let f = (o.left + (c && ((i = u.visualViewport) == null ? void 0 : i.offsetLeft) || 0)) / l.x, p = (o.top + (c && ((s = u.visualViewport) == null ? void 0 : s.offsetTop) || 0)) / l.y, v = o.width / l.x, m = o.height / l.y;
  if (a) {
    const y = cn(a), k = r && Tr(r) ? cn(r) : r;
    let E = y.frameElement;
    for (; E && r && k !== y; ) {
      const A = Ri(E), C = E.getBoundingClientRect(), x = getComputedStyle(E);
      C.x += (E.clientLeft + parseFloat(x.paddingLeft)) * A.x, C.y += (E.clientTop + parseFloat(x.paddingTop)) * A.y, f *= A.x, p *= A.y, v *= A.x, m *= A.y, f += C.x, p += C.y, E = cn(E).frameElement;
    }
  }
  return { width: v, height: m, top: p, right: f + v, bottom: p + m, left: f, x: f, y: p };
}
function Nr(e4) {
  return ((dg(e4) ? e4.ownerDocument : e4.document) || window.document).documentElement;
}
function _a(e4) {
  return Tr(e4) ? { scrollLeft: e4.scrollLeft, scrollTop: e4.scrollTop } : { scrollLeft: e4.pageXOffset, scrollTop: e4.pageYOffset };
}
function mg(e4) {
  return qs(Nr(e4)).left + _a(e4).scrollLeft;
}
function Ws(e4) {
  if (Ar(e4) === "html") return e4;
  const t = e4.assignedSlot || e4.parentNode || fg(e4) && e4.host || Nr(e4);
  return fg(t) ? t.host : t;
}
function gg(e4) {
  const t = Ws(e4);
  return Iu(t) ? t.ownerDocument.body : Un(t) && Ca(t) ? t : gg(t);
}
function Oa(e4, t) {
  var n;
  t === void 0 && (t = []);
  const r = gg(e4), i = r === ((n = e4.ownerDocument) == null ? void 0 : n.body), s = cn(r);
  return i ? t.concat(s, s.visualViewport || [], Ca(r) ? r : []) : t.concat(r, Oa(r));
}
function yg(e4, t, n) {
  return t === "viewport" ? xi((function(r, i) {
    const s = cn(r), o = Nr(r), a = s.visualViewport;
    let l = o.clientWidth, u = o.clientHeight, c = 0, f = 0;
    if (a) {
      l = a.width, u = a.height;
      const p = hg();
      (p || !p && i === "fixed") && (c = a.offsetLeft, f = a.offsetTop);
    }
    return { width: l, height: u, x: c, y: f };
  })(e4, n)) : Tr(t) ? xi((function(r, i) {
    const s = qs(r, true, i === "fixed"), o = s.top + r.clientTop, a = s.left + r.clientLeft, l = Un(r) ? Ri(r) : { x: 1, y: 1 };
    return { width: r.clientWidth * l.x, height: r.clientHeight * l.y, x: a * l.x, y: o * l.y };
  })(t, n)) : xi((function(r) {
    const i = Nr(r), s = _a(r), o = r.ownerDocument.body, a = Hs(i.scrollWidth, i.clientWidth, o.scrollWidth, o.clientWidth), l = Hs(i.scrollHeight, i.clientHeight, o.scrollHeight, o.clientHeight);
    let u = -s.scrollLeft + mg(r);
    const c = -s.scrollTop;
    return $n(o).direction === "rtl" && (u += Hs(i.clientWidth, o.clientWidth) - a), { width: a, height: l, x: u, y: c };
  })(Nr(e4)));
}
function bg(e4) {
  return Un(e4) && $n(e4).position !== "fixed" ? e4.offsetParent : null;
}
function kg(e4) {
  const t = cn(e4);
  let n = bg(e4);
  for (; n && gN(n) && $n(n).position === "static"; ) n = bg(n);
  return n && (Ar(n) === "html" || Ar(n) === "body" && $n(n).position === "static" && !ju(n)) ? t : n || (function(r) {
    let i = Ws(r);
    for (; Un(i) && !Iu(i); ) {
      if (ju(i)) return i;
      i = Ws(i);
    }
    return null;
  })(e4) || t;
}
function yN(e4, t, n) {
  const r = Un(t), i = Nr(t), s = qs(e4, true, n === "fixed", t);
  let o = { scrollLeft: 0, scrollTop: 0 };
  const a = { x: 0, y: 0 };
  if (r || !r && n !== "fixed") if ((Ar(t) !== "body" || Ca(i)) && (o = _a(t)), Un(t)) {
    const l = qs(t, true);
    a.x = l.x + t.clientLeft, a.y = l.y + t.clientTop;
  } else i && (a.x = mg(i));
  return { x: s.left + o.scrollLeft - a.x, y: s.top + o.scrollTop - a.y, width: s.width, height: s.height };
}
const bN = { getClippingRect: function(e4) {
  let { element: t, boundary: n, rootBoundary: r, strategy: i } = e4;
  const s = n === "clippingAncestors" ? (function(u, c) {
    const f = c.get(u);
    if (f) return f;
    let p = Oa(u).filter(((k) => Tr(k) && Ar(k) !== "body")), v = null;
    const m = $n(u).position === "fixed";
    let y = m ? Ws(u) : u;
    for (; Tr(y) && !Iu(y); ) {
      const k = $n(y), E = ju(y);
      (m ? E || v : E || k.position !== "static" || !v || !["absolute", "fixed"].includes(v.position)) ? v = k : p = p.filter(((A) => A !== y)), y = Ws(y);
    }
    return c.set(u, p), p;
  })(t, this._c) : [].concat(n), o = [...s, r], a = o[0], l = o.reduce(((u, c) => {
    const f = yg(t, c, i);
    return u.top = Hs(f.top, u.top), u.right = lg(f.right, u.right), u.bottom = lg(f.bottom, u.bottom), u.left = Hs(f.left, u.left), u;
  }), yg(t, a, i));
  return { width: l.right - l.left, height: l.bottom - l.top, x: l.left, y: l.top };
}, convertOffsetParentRelativeRectToViewportRelativeRect: function(e4) {
  let { rect: t, offsetParent: n, strategy: r } = e4;
  const i = Un(n), s = Nr(n);
  if (n === s) return t;
  let o = { scrollLeft: 0, scrollTop: 0 }, a = { x: 1, y: 1 };
  const l = { x: 0, y: 0 };
  if ((i || !i && r !== "fixed") && ((Ar(n) !== "body" || Ca(s)) && (o = _a(n)), Un(n))) {
    const u = qs(n);
    a = Ri(n), l.x = u.x + n.clientLeft, l.y = u.y + n.clientTop;
  }
  return { width: t.width * a.x, height: t.height * a.y, x: t.x * a.x - o.scrollLeft * a.x + l.x, y: t.y * a.y - o.scrollTop * a.y + l.y };
}, isElement: Tr, getDimensions: function(e4) {
  return Un(e4) ? cg(e4) : e4.getBoundingClientRect();
}, getOffsetParent: kg, getDocumentElement: Nr, getScale: Ri, async getElementRects(e4) {
  let { reference: t, floating: n, strategy: r } = e4;
  const i = this.getOffsetParent || kg, s = this.getDimensions;
  return { reference: yN(t, await i(n), r), floating: { x: 0, y: 0, ...await s(n) } };
}, getClientRects: (e4) => Array.from(e4.getClientRects()), isRTL: (e4) => $n(e4).direction === "rtl" }, kN = (e4, t, n) => {
  const r = /* @__PURE__ */ new Map(), i = { platform: bN, ...n }, s = { ...i.platform, _c: r };
  return rg(e4, t, { ...i, platform: s });
}, Wr = { disabled: false, distance: 5, skidding: 0, container: "body", boundary: void 0, instantMove: false, disposeTimeout: 150, popperTriggers: [], strategy: "absolute", preventOverflow: true, flip: true, shift: true, overflowPadding: 0, arrowPadding: 0, arrowOverflow: true, autoHideOnMousedown: false, themes: { tooltip: { placement: "top", triggers: ["hover", "focus", "touch"], hideTriggers: (e4) => [...e4, "click"], delay: { show: 200, hide: 0 }, handleResize: false, html: false, loadingContent: "..." }, dropdown: { placement: "bottom", triggers: ["click"], delay: 0, handleResize: true, autoHide: true }, menu: { $extend: "dropdown", triggers: ["hover", "focus"], popperTriggers: ["hover"], delay: { show: 0, hide: 400 } } } };
function Lu(e4, t) {
  let n = Wr.themes[e4] || {}, r;
  do
    r = n[t], typeof r > "u" ? n.$extend ? n = Wr.themes[n.$extend] || {} : (n = null, r = Wr[t]) : n = null;
  while (n);
  return r;
}
function wN(e4) {
  const t = [e4];
  let n = Wr.themes[e4] || {};
  do
    n.$extend && !n.$resetCss ? (t.push(n.$extend), n = Wr.themes[n.$extend] || {}) : n = null;
  while (n);
  return t.map((r) => `v-popper--theme-${r}`);
}
function wg(e4) {
  const t = [e4];
  let n = Wr.themes[e4] || {};
  do
    n.$extend ? (t.push(n.$extend), n = Wr.themes[n.$extend] || {}) : n = null;
  while (n);
  return t;
}
let Gs = false;
if (typeof window < "u") {
  Gs = false;
  try {
    const e4 = Object.defineProperty({}, "passive", { get() {
      Gs = true;
    } });
    window.addEventListener("test", null, e4);
  } catch {
  }
}
let Sg = false;
typeof window < "u" && typeof navigator < "u" && (Sg = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream);
const SN = ["auto", "top", "bottom", "left", "right"].reduce((e4, t) => e4.concat([t, `${t}-start`, `${t}-end`]), []), Eg = { hover: "mouseenter", focus: "focus", click: "click", touch: "touchstart", pointer: "pointerdown" }, Ag = { hover: "mouseleave", focus: "blur", click: "click", touch: "touchend", pointer: "pointerup" };
function Tg(e4, t) {
  const n = e4.indexOf(t);
  n !== -1 && e4.splice(n, 1);
}
function Fu() {
  return new Promise((e4) => requestAnimationFrame(() => {
    requestAnimationFrame(e4);
  }));
}
const Sn = [];
let Gr = null;
const Ng = {};
function Cg(e4) {
  let t = Ng[e4];
  return t || (t = Ng[e4] = []), t;
}
let Du = function() {
};
typeof window < "u" && (Du = window.Element);
function je(e4) {
  return function(t) {
    return Lu(t.theme, e4);
  };
}
const Bu = "__floating-vue__popper", _g = () => Zt({ name: "VPopper", provide() {
  return { [Bu]: { parentPopper: this } };
}, inject: { [Bu]: { default: null } }, props: { theme: { type: String, required: true }, targetNodes: { type: Function, required: true }, referenceNode: { type: Function, default: null }, popperNode: { type: Function, required: true }, shown: { type: Boolean, default: false }, showGroup: { type: String, default: null }, ariaId: { default: null }, disabled: { type: Boolean, default: je("disabled") }, positioningDisabled: { type: Boolean, default: je("positioningDisabled") }, placement: { type: String, default: je("placement"), validator: (e4) => SN.includes(e4) }, delay: { type: [String, Number, Object], default: je("delay") }, distance: { type: [Number, String], default: je("distance") }, skidding: { type: [Number, String], default: je("skidding") }, triggers: { type: Array, default: je("triggers") }, showTriggers: { type: [Array, Function], default: je("showTriggers") }, hideTriggers: { type: [Array, Function], default: je("hideTriggers") }, popperTriggers: { type: Array, default: je("popperTriggers") }, popperShowTriggers: { type: [Array, Function], default: je("popperShowTriggers") }, popperHideTriggers: { type: [Array, Function], default: je("popperHideTriggers") }, container: { type: [String, Object, Du, Boolean], default: je("container") }, boundary: { type: [String, Du], default: je("boundary") }, strategy: { type: String, validator: (e4) => ["absolute", "fixed"].includes(e4), default: je("strategy") }, autoHide: { type: [Boolean, Function], default: je("autoHide") }, handleResize: { type: Boolean, default: je("handleResize") }, instantMove: { type: Boolean, default: je("instantMove") }, eagerMount: { type: Boolean, default: je("eagerMount") }, popperClass: { type: [String, Array, Object], default: je("popperClass") }, computeTransformOrigin: { type: Boolean, default: je("computeTransformOrigin") }, autoMinSize: { type: Boolean, default: je("autoMinSize") }, autoSize: { type: [Boolean, String], default: je("autoSize") }, autoMaxSize: { type: Boolean, default: je("autoMaxSize") }, autoBoundaryMaxSize: { type: Boolean, default: je("autoBoundaryMaxSize") }, preventOverflow: { type: Boolean, default: je("preventOverflow") }, overflowPadding: { type: [Number, String], default: je("overflowPadding") }, arrowPadding: { type: [Number, String], default: je("arrowPadding") }, arrowOverflow: { type: Boolean, default: je("arrowOverflow") }, flip: { type: Boolean, default: je("flip") }, shift: { type: Boolean, default: je("shift") }, shiftCrossAxis: { type: Boolean, default: je("shiftCrossAxis") }, noAutoFocus: { type: Boolean, default: je("noAutoFocus") }, disposeTimeout: { type: Number, default: je("disposeTimeout") } }, emits: { show: () => true, hide: () => true, "update:shown": (e4) => true, "apply-show": () => true, "apply-hide": () => true, "close-group": () => true, "close-directive": () => true, "auto-hide": () => true, resize: () => true }, data() {
  return { isShown: false, isMounted: false, skipTransition: false, classes: { showFrom: false, showTo: false, hideFrom: false, hideTo: true }, result: { x: 0, y: 0, placement: "", strategy: this.strategy, arrow: { x: 0, y: 0, centerOffset: 0 }, transformOrigin: null }, randomId: `popper_${[Math.random(), Date.now()].map((e4) => e4.toString(36).substring(2, 10)).join("_")}`, shownChildren: /* @__PURE__ */ new Set(), lastAutoHide: true, pendingHide: false, containsGlobalTarget: false, isDisposed: true, mouseDownContains: false };
}, computed: { popperId() {
  return this.ariaId != null ? this.ariaId : this.randomId;
}, shouldMountContent() {
  return this.eagerMount || this.isMounted;
}, slotData() {
  return { popperId: this.popperId, isShown: this.isShown, shouldMountContent: this.shouldMountContent, skipTransition: this.skipTransition, autoHide: typeof this.autoHide == "function" ? this.lastAutoHide : this.autoHide, show: this.show, hide: this.hide, handleResize: this.handleResize, onResize: this.onResize, classes: { ...this.classes, popperClass: this.popperClass }, result: this.positioningDisabled ? null : this.result, attrs: this.$attrs };
}, parentPopper() {
  var e4;
  return (e4 = this[Bu]) == null ? void 0 : e4.parentPopper;
}, hasPopperShowTriggerHover() {
  var e4, t;
  return ((e4 = this.popperTriggers) == null ? void 0 : e4.includes("hover")) || ((t = this.popperShowTriggers) == null ? void 0 : t.includes("hover"));
} }, watch: { shown: "$_autoShowHide", disabled(e4) {
  e4 ? this.dispose() : this.init();
}, async container() {
  this.isShown && (this.$_ensureTeleport(), await this.$_computePosition());
}, triggers: { handler: "$_refreshListeners", deep: true }, positioningDisabled: "$_refreshListeners", ...["placement", "distance", "skidding", "boundary", "strategy", "overflowPadding", "arrowPadding", "preventOverflow", "shift", "shiftCrossAxis", "flip"].reduce((e4, t) => (e4[t] = "$_computePosition", e4), {}) }, created() {
  this.autoMinSize && console.warn('[floating-vue] `autoMinSize` option is deprecated. Use `autoSize="min"` instead.'), this.autoMaxSize && console.warn("[floating-vue] `autoMaxSize` option is deprecated. Use `autoBoundaryMaxSize` instead.");
}, mounted() {
  this.init(), this.$_detachPopperNode();
}, activated() {
  this.$_autoShowHide();
}, deactivated() {
  this.hide();
}, beforeUnmount() {
  this.dispose();
}, methods: { show({ event: e4 = null, skipDelay: t = false, force: n = false } = {}) {
  var r, i;
  (r = this.parentPopper) != null && r.lockedChild && this.parentPopper.lockedChild !== this || (this.pendingHide = false, (n || !this.disabled) && (((i = this.parentPopper) == null ? void 0 : i.lockedChild) === this && (this.parentPopper.lockedChild = null), this.$_scheduleShow(e4, t), this.$emit("show"), this.$_showFrameLocked = true, requestAnimationFrame(() => {
    this.$_showFrameLocked = false;
  })), this.$emit("update:shown", true));
}, hide({ event: e4 = null, skipDelay: t = false } = {}) {
  var n;
  if (!this.$_hideInProgress) {
    if (this.shownChildren.size > 0) {
      this.pendingHide = true;
      return;
    }
    if (this.hasPopperShowTriggerHover && this.$_isAimingPopper()) {
      this.parentPopper && (this.parentPopper.lockedChild = this, clearTimeout(this.parentPopper.lockedChildTimer), this.parentPopper.lockedChildTimer = setTimeout(() => {
        this.parentPopper.lockedChild === this && (this.parentPopper.lockedChild.hide({ skipDelay: t }), this.parentPopper.lockedChild = null);
      }, 1e3));
      return;
    }
    ((n = this.parentPopper) == null ? void 0 : n.lockedChild) === this && (this.parentPopper.lockedChild = null), this.pendingHide = false, this.$_scheduleHide(e4, t), this.$emit("hide"), this.$emit("update:shown", false);
  }
}, init() {
  var e4;
  this.isDisposed && (this.isDisposed = false, this.isMounted = false, this.$_events = [], this.$_preventShow = false, this.$_referenceNode = ((e4 = this.referenceNode) == null ? void 0 : e4.call(this)) ?? this.$el, this.$_targetNodes = this.targetNodes().filter((t) => t.nodeType === t.ELEMENT_NODE), this.$_popperNode = this.popperNode(), this.$_innerNode = this.$_popperNode.querySelector(".v-popper__inner"), this.$_arrowNode = this.$_popperNode.querySelector(".v-popper__arrow-container"), this.$_swapTargetAttrs("title", "data-original-title"), this.$_detachPopperNode(), this.triggers.length && this.$_addEventListeners(), this.shown && this.show());
}, dispose() {
  this.isDisposed || (this.isDisposed = true, this.$_removeEventListeners(), this.hide({ skipDelay: true }), this.$_detachPopperNode(), this.isMounted = false, this.isShown = false, this.$_updateParentShownChildren(false), this.$_swapTargetAttrs("data-original-title", "title"));
}, async onResize() {
  this.isShown && (await this.$_computePosition(), this.$emit("resize"));
}, async $_computePosition() {
  if (this.isDisposed || this.positioningDisabled) return;
  const e4 = { strategy: this.strategy, middleware: [] };
  (this.distance || this.skidding) && e4.middleware.push(og({ mainAxis: this.distance, crossAxis: this.skidding }));
  const t = this.placement.startsWith("auto");
  if (t ? e4.middleware.push(hN({ alignment: this.placement.split("-")[1] ?? "" })) : e4.placement = this.placement, this.preventOverflow && (this.shift && e4.middleware.push(ag({ padding: this.overflowPadding, boundary: this.boundary, crossAxis: this.shiftCrossAxis })), !t && this.flip && e4.middleware.push(ig({ padding: this.overflowPadding, boundary: this.boundary }))), e4.middleware.push(dN({ element: this.$_arrowNode, padding: this.arrowPadding })), this.arrowOverflow && e4.middleware.push({ name: "arrowOverflow", fn: ({ placement: r, rects: i, middlewareData: s }) => {
    let o;
    const { centerOffset: a } = s.arrow;
    return r.startsWith("top") || r.startsWith("bottom") ? o = Math.abs(a) > i.reference.width / 2 : o = Math.abs(a) > i.reference.height / 2, { data: { overflow: o } };
  } }), this.autoMinSize || this.autoSize) {
    const r = this.autoSize ? this.autoSize : this.autoMinSize ? "min" : null;
    e4.middleware.push({ name: "autoSize", fn: ({ rects: i, placement: s, middlewareData: o }) => {
      var a;
      if ((a = o.autoSize) != null && a.skip) return {};
      let l, u;
      return s.startsWith("top") || s.startsWith("bottom") ? l = i.reference.width : u = i.reference.height, this.$_innerNode.style[r === "min" ? "minWidth" : r === "max" ? "maxWidth" : "width"] = l != null ? `${l}px` : null, this.$_innerNode.style[r === "min" ? "minHeight" : r === "max" ? "maxHeight" : "height"] = u != null ? `${u}px` : null, { data: { skip: true }, reset: { rects: true } };
    } });
  }
  (this.autoMaxSize || this.autoBoundaryMaxSize) && (this.$_innerNode.style.maxWidth = null, this.$_innerNode.style.maxHeight = null, e4.middleware.push(mN({ boundary: this.boundary, padding: this.overflowPadding, apply: ({ availableWidth: r, availableHeight: i }) => {
    this.$_innerNode.style.maxWidth = r != null ? `${r}px` : null, this.$_innerNode.style.maxHeight = i != null ? `${i}px` : null;
  } })));
  const n = await kN(this.$_referenceNode, this.$_popperNode, e4);
  Object.assign(this.result, { x: n.x, y: n.y, placement: n.placement, strategy: n.strategy, arrow: { ...n.middlewareData.arrow, ...n.middlewareData.arrowOverflow } });
}, $_scheduleShow(e4, t = false) {
  if (this.$_updateParentShownChildren(true), this.$_hideInProgress = false, clearTimeout(this.$_scheduleTimer), Gr && this.instantMove && Gr.instantMove && Gr !== this.parentPopper) {
    Gr.$_applyHide(true), this.$_applyShow(true);
    return;
  }
  t ? this.$_applyShow() : this.$_scheduleTimer = setTimeout(this.$_applyShow.bind(this), this.$_computeDelay("show"));
}, $_scheduleHide(e4, t = false) {
  if (this.shownChildren.size > 0) {
    this.pendingHide = true;
    return;
  }
  this.$_updateParentShownChildren(false), this.$_hideInProgress = true, clearTimeout(this.$_scheduleTimer), this.isShown && (Gr = this), t ? this.$_applyHide() : this.$_scheduleTimer = setTimeout(this.$_applyHide.bind(this), this.$_computeDelay("hide"));
}, $_computeDelay(e4) {
  const t = this.delay;
  return parseInt(t && t[e4] || t || 0);
}, async $_applyShow(e4 = false) {
  clearTimeout(this.$_disposeTimer), clearTimeout(this.$_scheduleTimer), this.skipTransition = e4, !this.isShown && (this.$_ensureTeleport(), await Fu(), await this.$_computePosition(), await this.$_applyShowEffect(), this.positioningDisabled || this.$_registerEventListeners([...Oa(this.$_referenceNode), ...Oa(this.$_popperNode)], "scroll", () => {
    this.$_computePosition();
  }));
}, async $_applyShowEffect() {
  if (this.$_hideInProgress) return;
  if (this.computeTransformOrigin) {
    const t = this.$_referenceNode.getBoundingClientRect(), n = this.$_popperNode.querySelector(".v-popper__wrapper"), r = n.parentNode.getBoundingClientRect(), i = t.x + t.width / 2 - (r.left + n.offsetLeft), s = t.y + t.height / 2 - (r.top + n.offsetTop);
    this.result.transformOrigin = `${i}px ${s}px`;
  }
  this.isShown = true, this.$_applyAttrsToTarget({ "aria-describedby": this.popperId, "data-popper-shown": "" });
  const e4 = this.showGroup;
  if (e4) {
    let t;
    for (let n = 0; n < Sn.length; n++) t = Sn[n], t.showGroup !== e4 && (t.hide(), t.$emit("close-group"));
  }
  Sn.push(this), document.body.classList.add("v-popper--some-open");
  for (const t of wg(this.theme)) Cg(t).push(this), document.body.classList.add(`v-popper--some-open--${t}`);
  this.$emit("apply-show"), this.classes.showFrom = true, this.classes.showTo = false, this.classes.hideFrom = false, this.classes.hideTo = false, await Fu(), this.classes.showFrom = false, this.classes.showTo = true, this.noAutoFocus || this.$_popperNode.focus();
}, async $_applyHide(e4 = false) {
  if (this.shownChildren.size > 0) {
    this.pendingHide = true, this.$_hideInProgress = false;
    return;
  }
  if (clearTimeout(this.$_scheduleTimer), !this.isShown) return;
  this.skipTransition = e4, Tg(Sn, this), Sn.length === 0 && document.body.classList.remove("v-popper--some-open");
  for (const n of wg(this.theme)) {
    const r = Cg(n);
    Tg(r, this), r.length === 0 && document.body.classList.remove(`v-popper--some-open--${n}`);
  }
  Gr === this && (Gr = null), this.isShown = false, this.$_applyAttrsToTarget({ "aria-describedby": void 0, "data-popper-shown": void 0 }), clearTimeout(this.$_disposeTimer);
  const t = this.disposeTimeout;
  t !== null && (this.$_disposeTimer = setTimeout(() => {
    this.$_popperNode && (this.$_detachPopperNode(), this.isMounted = false);
  }, t)), this.$_removeEventListeners("scroll"), this.$emit("apply-hide"), this.classes.showFrom = false, this.classes.showTo = false, this.classes.hideFrom = true, this.classes.hideTo = false, await Fu(), this.classes.hideFrom = false, this.classes.hideTo = true;
}, $_autoShowHide() {
  this.shown ? this.show() : this.hide();
}, $_ensureTeleport() {
  if (this.isDisposed) return;
  let e4 = this.container;
  if (typeof e4 == "string" ? e4 = window.document.querySelector(e4) : e4 === false && (e4 = this.$_targetNodes[0].parentNode), !e4) throw new Error("No container for popover: " + this.container);
  e4.appendChild(this.$_popperNode), this.isMounted = true;
}, $_addEventListeners() {
  const e4 = (n) => {
    this.isShown && !this.$_hideInProgress || (n.usedByTooltip = true, !this.$_preventShow && this.show({ event: n }));
  };
  this.$_registerTriggerListeners(this.$_targetNodes, Eg, this.triggers, this.showTriggers, e4), this.$_registerTriggerListeners([this.$_popperNode], Eg, this.popperTriggers, this.popperShowTriggers, e4);
  const t = (n) => {
    n.usedByTooltip || this.hide({ event: n });
  };
  this.$_registerTriggerListeners(this.$_targetNodes, Ag, this.triggers, this.hideTriggers, t), this.$_registerTriggerListeners([this.$_popperNode], Ag, this.popperTriggers, this.popperHideTriggers, t);
}, $_registerEventListeners(e4, t, n) {
  this.$_events.push({ targetNodes: e4, eventType: t, handler: n }), e4.forEach((r) => r.addEventListener(t, n, Gs ? { passive: true } : void 0));
}, $_registerTriggerListeners(e4, t, n, r, i) {
  let s = n;
  r != null && (s = typeof r == "function" ? r(s) : r), s.forEach((o) => {
    const a = t[o];
    a && this.$_registerEventListeners(e4, a, i);
  });
}, $_removeEventListeners(e4) {
  const t = [];
  this.$_events.forEach((n) => {
    const { targetNodes: r, eventType: i, handler: s } = n;
    !e4 || e4 === i ? r.forEach((o) => o.removeEventListener(i, s)) : t.push(n);
  }), this.$_events = t;
}, $_refreshListeners() {
  this.isDisposed || (this.$_removeEventListeners(), this.$_addEventListeners());
}, $_handleGlobalClose(e4, t = false) {
  this.$_showFrameLocked || (this.hide({ event: e4 }), e4.closePopover ? this.$emit("close-directive") : this.$emit("auto-hide"), t && (this.$_preventShow = true, setTimeout(() => {
    this.$_preventShow = false;
  }, 300)));
}, $_detachPopperNode() {
  this.$_popperNode.parentNode && this.$_popperNode.parentNode.removeChild(this.$_popperNode);
}, $_swapTargetAttrs(e4, t) {
  for (const n of this.$_targetNodes) {
    const r = n.getAttribute(e4);
    r && (n.removeAttribute(e4), n.setAttribute(t, r));
  }
}, $_applyAttrsToTarget(e4) {
  for (const t of this.$_targetNodes) for (const n in e4) {
    const r = e4[n];
    r == null ? t.removeAttribute(n) : t.setAttribute(n, r);
  }
}, $_updateParentShownChildren(e4) {
  let t = this.parentPopper;
  for (; t; ) e4 ? t.shownChildren.add(this.randomId) : (t.shownChildren.delete(this.randomId), t.pendingHide && t.hide()), t = t.parentPopper;
}, $_isAimingPopper() {
  const e4 = this.$_referenceNode.getBoundingClientRect();
  if (Zs >= e4.left && Zs <= e4.right && Ks >= e4.top && Ks <= e4.bottom) {
    const t = this.$_popperNode.getBoundingClientRect(), n = Zs - Cr, r = Ks - _r, i = t.left + t.width / 2 - Cr + (t.top + t.height / 2) - _r + t.width + t.height, s = Cr + n * i, o = _r + r * i;
    return Pa(Cr, _r, s, o, t.left, t.top, t.left, t.bottom) || Pa(Cr, _r, s, o, t.left, t.top, t.right, t.top) || Pa(Cr, _r, s, o, t.right, t.top, t.right, t.bottom) || Pa(Cr, _r, s, o, t.left, t.bottom, t.right, t.bottom);
  }
  return false;
} }, render() {
  return this.$slots.default(this.slotData);
} });
if (typeof document < "u" && typeof window < "u") {
  if (Sg) {
    const e4 = Gs ? { passive: true, capture: true } : true;
    document.addEventListener("touchstart", (t) => Og(t), e4), document.addEventListener("touchend", (t) => Pg(t, true), e4);
  } else window.addEventListener("mousedown", (e4) => Og(e4), true), window.addEventListener("click", (e4) => Pg(e4, false), true);
  window.addEventListener("resize", TN);
}
function Og(e4, t) {
  for (let n = 0; n < Sn.length; n++) {
    const r = Sn[n];
    try {
      r.mouseDownContains = r.popperNode().contains(e4.target);
    } catch {
    }
  }
}
function Pg(e4, t) {
  EN(e4, t);
}
function EN(e4, t) {
  const n = {};
  for (let r = Sn.length - 1; r >= 0; r--) {
    const i = Sn[r];
    try {
      const s = i.containsGlobalTarget = i.mouseDownContains || i.popperNode().contains(e4.target);
      i.pendingHide = false, requestAnimationFrame(() => {
        if (i.pendingHide = false, !n[i.randomId] && xg(i, s, e4)) {
          if (i.$_handleGlobalClose(e4, t), !e4.closeAllPopover && e4.closePopover && s) {
            let a = i.parentPopper;
            for (; a; ) n[a.randomId] = true, a = a.parentPopper;
            return;
          }
          let o = i.parentPopper;
          for (; o && xg(o, o.containsGlobalTarget, e4); ) o.$_handleGlobalClose(e4, t), o = o.parentPopper;
        }
      });
    } catch {
    }
  }
}
function xg(e4, t, n) {
  return n.closeAllPopover || n.closePopover && t || AN(e4, n) && !t;
}
function AN(e4, t) {
  if (typeof e4.autoHide == "function") {
    const n = e4.autoHide(t);
    return e4.lastAutoHide = n, n;
  }
  return e4.autoHide;
}
function TN() {
  for (let e4 = 0; e4 < Sn.length; e4++) Sn[e4].$_computePosition();
}
let Cr = 0, _r = 0, Zs = 0, Ks = 0;
typeof window < "u" && window.addEventListener("mousemove", (e4) => {
  Cr = Zs, _r = Ks, Zs = e4.clientX, Ks = e4.clientY;
}, Gs ? { passive: true } : void 0);
function Pa(e4, t, n, r, i, s, o, a) {
  const l = ((o - i) * (t - s) - (a - s) * (e4 - i)) / ((a - s) * (n - e4) - (o - i) * (r - t)), u = ((n - e4) * (t - s) - (r - t) * (e4 - i)) / ((a - s) * (n - e4) - (o - i) * (r - t));
  return l >= 0 && l <= 1 && u >= 0 && u <= 1;
}
const NN = { extends: _g() }, zu = (e4, t) => {
  const n = e4.__vccOpts || e4;
  for (const [r, i] of t) n[r] = i;
  return n;
};
function CN(e4, t, n, r, i, s) {
  return oe(), pe("div", { ref: "reference", class: yt(["v-popper", { "v-popper--shown": e4.slotData.isShown }]) }, [Mt(e4.$slots, "default", Eo(ms(e4.slotData)))], 2);
}
const _N = zu(NN, [["render", CN]]);
function ON() {
  var e4 = window.navigator.userAgent, t = e4.indexOf("MSIE ");
  if (t > 0) return parseInt(e4.substring(t + 5, e4.indexOf(".", t)), 10);
  var n = e4.indexOf("Trident/");
  if (n > 0) {
    var r = e4.indexOf("rv:");
    return parseInt(e4.substring(r + 3, e4.indexOf(".", r)), 10);
  }
  var i = e4.indexOf("Edge/");
  return i > 0 ? parseInt(e4.substring(i + 5, e4.indexOf(".", i)), 10) : -1;
}
let xa;
function $u() {
  $u.init || ($u.init = true, xa = ON() !== -1);
}
var Ra = { name: "ResizeObserver", props: { emitOnMount: { type: Boolean, default: false }, ignoreWidth: { type: Boolean, default: false }, ignoreHeight: { type: Boolean, default: false } }, emits: ["notify"], mounted() {
  $u(), Lr(() => {
    this._w = this.$el.offsetWidth, this._h = this.$el.offsetHeight, this.emitOnMount && this.emitSize();
  });
  const e4 = document.createElement("object");
  this._resizeObject = e4, e4.setAttribute("aria-hidden", "true"), e4.setAttribute("tabindex", -1), e4.onload = this.addResizeHandlers, e4.type = "text/html", xa && this.$el.appendChild(e4), e4.data = "about:blank", xa || this.$el.appendChild(e4);
}, beforeUnmount() {
  this.removeResizeHandlers();
}, methods: { compareAndNotify() {
  (!this.ignoreWidth && this._w !== this.$el.offsetWidth || !this.ignoreHeight && this._h !== this.$el.offsetHeight) && (this._w = this.$el.offsetWidth, this._h = this.$el.offsetHeight, this.emitSize());
}, emitSize() {
  this.$emit("notify", { width: this._w, height: this._h });
}, addResizeHandlers() {
  this._resizeObject.contentDocument.defaultView.addEventListener("resize", this.compareAndNotify), this.compareAndNotify();
}, removeResizeHandlers() {
  this._resizeObject && this._resizeObject.onload && (!xa && this._resizeObject.contentDocument && this._resizeObject.contentDocument.defaultView.removeEventListener("resize", this.compareAndNotify), this.$el.removeChild(this._resizeObject), this._resizeObject.onload = null, this._resizeObject = null);
} } };
const PN = Ow();
Cw("data-v-b329ee4c");
const xN = { class: "resize-observer", tabindex: "-1" };
_w();
const RN = PN((e4, t, n, r, i, s) => (oe(), at("div", xN)));
Ra.render = RN, Ra.__scopeId = "data-v-b329ee4c", Ra.__file = "src/components/ResizeObserver.vue";
const Rg = (e4 = "theme") => ({ computed: { themeClass() {
  return wN(this[e4]);
} } }), MN = Zt({ name: "VPopperContent", components: { ResizeObserver: Ra }, mixins: [Rg()], props: { popperId: String, theme: String, shown: Boolean, mounted: Boolean, skipTransition: Boolean, autoHide: Boolean, handleResize: Boolean, classes: Object, result: Object }, emits: ["hide", "resize"], methods: { toPx(e4) {
  return e4 != null && !isNaN(e4) ? `${e4}px` : null;
} } }), jN = ["id", "aria-hidden", "tabindex", "data-popper-placement"], IN = { ref: "inner", class: "v-popper__inner" }, LN = Ae("div", { class: "v-popper__arrow-outer" }, null, -1), FN = Ae("div", { class: "v-popper__arrow-inner" }, null, -1), DN = [LN, FN];
function BN(e4, t, n, r, i, s) {
  const o = dt("ResizeObserver");
  return oe(), pe("div", { id: e4.popperId, ref: "popover", class: yt(["v-popper__popper", [e4.themeClass, e4.classes.popperClass, { "v-popper__popper--shown": e4.shown, "v-popper__popper--hidden": !e4.shown, "v-popper__popper--show-from": e4.classes.showFrom, "v-popper__popper--show-to": e4.classes.showTo, "v-popper__popper--hide-from": e4.classes.hideFrom, "v-popper__popper--hide-to": e4.classes.hideTo, "v-popper__popper--skip-transition": e4.skipTransition, "v-popper__popper--arrow-overflow": e4.result && e4.result.arrow.overflow, "v-popper__popper--no-positioning": !e4.result }]]), style: Pt(e4.result ? { position: e4.result.strategy, transform: `translate3d(${Math.round(e4.result.x)}px,${Math.round(e4.result.y)}px,0)` } : void 0), "aria-hidden": e4.shown ? "false" : "true", tabindex: e4.autoHide ? 0 : void 0, "data-popper-placement": e4.result ? e4.result.placement : void 0, onKeyup: t[2] || (t[2] = _v((a) => e4.autoHide && e4.$emit("hide"), ["esc"])) }, [Ae("div", { class: "v-popper__backdrop", onClick: t[0] || (t[0] = (a) => e4.autoHide && e4.$emit("hide")) }), Ae("div", { class: "v-popper__wrapper", style: Pt(e4.result ? { transformOrigin: e4.result.transformOrigin } : void 0) }, [Ae("div", IN, [e4.mounted ? (oe(), pe(ht, { key: 0 }, [Ae("div", null, [Mt(e4.$slots, "default")]), e4.handleResize ? (oe(), at(o, { key: 0, onNotify: t[1] || (t[1] = (a) => e4.$emit("resize", a)) })) : Xe("", true)], 64)) : Xe("", true)], 512), Ae("div", { ref: "arrow", class: "v-popper__arrow-container", style: Pt(e4.result ? { left: e4.toPx(e4.result.arrow.x), top: e4.toPx(e4.result.arrow.y) } : void 0) }, DN, 4)], 4)], 46, jN);
}
const Mg = zu(MN, [["render", BN]]), jg = { methods: { show(...e4) {
  return this.$refs.popper.show(...e4);
}, hide(...e4) {
  return this.$refs.popper.hide(...e4);
}, dispose(...e4) {
  return this.$refs.popper.dispose(...e4);
}, onResize(...e4) {
  return this.$refs.popper.onResize(...e4);
} } };
let Uu = function() {
};
typeof window < "u" && (Uu = window.Element);
const zN = Zt({ name: "VPopperWrapper", components: { Popper: _N, PopperContent: Mg }, mixins: [jg, Rg("finalTheme")], props: { theme: { type: String, default: null }, referenceNode: { type: Function, default: null }, shown: { type: Boolean, default: false }, showGroup: { type: String, default: null }, ariaId: { default: null }, disabled: { type: Boolean, default: void 0 }, positioningDisabled: { type: Boolean, default: void 0 }, placement: { type: String, default: void 0 }, delay: { type: [String, Number, Object], default: void 0 }, distance: { type: [Number, String], default: void 0 }, skidding: { type: [Number, String], default: void 0 }, triggers: { type: Array, default: void 0 }, showTriggers: { type: [Array, Function], default: void 0 }, hideTriggers: { type: [Array, Function], default: void 0 }, popperTriggers: { type: Array, default: void 0 }, popperShowTriggers: { type: [Array, Function], default: void 0 }, popperHideTriggers: { type: [Array, Function], default: void 0 }, container: { type: [String, Object, Uu, Boolean], default: void 0 }, boundary: { type: [String, Uu], default: void 0 }, strategy: { type: String, default: void 0 }, autoHide: { type: [Boolean, Function], default: void 0 }, handleResize: { type: Boolean, default: void 0 }, instantMove: { type: Boolean, default: void 0 }, eagerMount: { type: Boolean, default: void 0 }, popperClass: { type: [String, Array, Object], default: void 0 }, computeTransformOrigin: { type: Boolean, default: void 0 }, autoMinSize: { type: Boolean, default: void 0 }, autoSize: { type: [Boolean, String], default: void 0 }, autoMaxSize: { type: Boolean, default: void 0 }, autoBoundaryMaxSize: { type: Boolean, default: void 0 }, preventOverflow: { type: Boolean, default: void 0 }, overflowPadding: { type: [Number, String], default: void 0 }, arrowPadding: { type: [Number, String], default: void 0 }, arrowOverflow: { type: Boolean, default: void 0 }, flip: { type: Boolean, default: void 0 }, shift: { type: Boolean, default: void 0 }, shiftCrossAxis: { type: Boolean, default: void 0 }, noAutoFocus: { type: Boolean, default: void 0 }, disposeTimeout: { type: Number, default: void 0 } }, emits: { show: () => true, hide: () => true, "update:shown": (e4) => true, "apply-show": () => true, "apply-hide": () => true, "close-group": () => true, "close-directive": () => true, "auto-hide": () => true, resize: () => true }, computed: { finalTheme() {
  return this.theme ?? this.$options.vPopperTheme;
} }, methods: { getTargetNodes() {
  return Array.from(this.$el.children).filter((e4) => e4 !== this.$refs.popperContent.$el);
} } });
function $N(e4, t, n, r, i, s) {
  const o = dt("PopperContent"), a = dt("Popper");
  return oe(), at(a, mn({ ref: "popper" }, e4.$props, { theme: e4.finalTheme, "target-nodes": e4.getTargetNodes, "popper-node": () => e4.$refs.popperContent.$el, class: [e4.themeClass], onShow: t[0] || (t[0] = () => e4.$emit("show")), onHide: t[1] || (t[1] = () => e4.$emit("hide")), "onUpdate:shown": t[2] || (t[2] = (l) => e4.$emit("update:shown", l)), onApplyShow: t[3] || (t[3] = () => e4.$emit("apply-show")), onApplyHide: t[4] || (t[4] = () => e4.$emit("apply-hide")), onCloseGroup: t[5] || (t[5] = () => e4.$emit("close-group")), onCloseDirective: t[6] || (t[6] = () => e4.$emit("close-directive")), onAutoHide: t[7] || (t[7] = () => e4.$emit("auto-hide")), onResize: t[8] || (t[8] = () => e4.$emit("resize")) }), { default: et(({ popperId: l, isShown: u, shouldMountContent: c, skipTransition: f, autoHide: p, show: v, hide: m, handleResize: y, onResize: k, classes: E, result: A }) => [Mt(e4.$slots, "default", { shown: u, show: v, hide: m }), xe(o, { ref: "popperContent", "popper-id": l, theme: e4.finalTheme, shown: u, mounted: c, "skip-transition": f, "auto-hide": p, "handle-resize": y, classes: E, result: A, onHide: m, onResize: k }, { default: et(() => [Mt(e4.$slots, "popper", { shown: u, hide: m })]), _: 2 }, 1032, ["popper-id", "theme", "shown", "mounted", "skip-transition", "auto-hide", "handle-resize", "classes", "result", "onHide", "onResize"])]), _: 3 }, 16, ["theme", "target-nodes", "popper-node", "class"]);
}
const Vu = zu(zN, [["render", $N]]), UN = { ...Vu, name: "VDropdown", vPopperTheme: "dropdown" };
({ ...Vu }, { ...Vu }), _g();
const VN = UN, Hu = ZA(), HN = Zt({ name: "NcPopoverTriggerProvider", provide() {
  return { "NcPopover:trigger:shown": () => this.shown, "NcPopover:trigger:attrs": () => this.triggerAttrs };
}, props: { shown: { type: Boolean, required: true }, popupRole: { type: String, default: void 0 } }, computed: { triggerAttrs() {
  return { "aria-haspopup": this.popupRole, "aria-expanded": this.shown.toString() };
} }, render() {
  return this.$slots.default?.({ attrs: this.triggerAttrs });
} }), qN = { name: "NcPopover", components: { Dropdown: VN, NcPopoverTriggerProvider: HN }, props: { boundary: { type: [String, Object], default: "" }, closeOnClickOutside: { type: Boolean, default: false }, container: { type: [String, Boolean], default: "body" }, delay: { type: [Number, Object], default: 0 }, noFocusTrap: { type: Boolean, default: false }, placement: { type: String, default: "bottom" }, popoverBaseClass: { type: String, default: "" }, popoverTriggers: { type: [Array, Object], default: null }, popupRole: { type: String, default: void 0, validator: (e4) => ["menu", "listbox", "tree", "grid", "dialog", "true"].includes(e4) }, setReturnFocus: { default: void 0, type: [HTMLElement, SVGElement, String, Boolean, Function] }, shown: { type: Boolean, default: false }, triggers: { type: [Array, Object], default: () => ["click"] } }, emits: ["afterShow", "afterHide", "update:shown"], data() {
  return { internalShown: this.shown };
}, computed: { popperTriggers() {
  if (this.popoverTriggers && Array.isArray(this.popoverTriggers)) return this.popoverTriggers;
}, popperHideTriggers() {
  if (this.popoverTriggers && typeof this.popoverTriggers == "object") return this.popoverTriggers.hide;
}, popperShowTriggers() {
  if (this.popoverTriggers && typeof this.popoverTriggers == "object") return this.popoverTriggers.show;
}, internalTriggers() {
  if (this.triggers && Array.isArray(this.triggers)) return this.triggers;
}, hideTriggers() {
  if (this.triggers && typeof this.triggers == "object") return this.triggers.hide;
}, showTriggers() {
  if (this.triggers && typeof this.triggers == "object") return this.triggers.show;
}, internalPlacement() {
  return this.placement === "start" ? Hu ? "right" : "left" : this.placement === "end" ? Hu ? "left" : "right" : this.placement;
} }, watch: { shown(e4) {
  this.internalShown = e4;
}, internalShown(e4) {
  this.$emit("update:shown", e4);
} }, mounted() {
  this.checkTriggerA11y();
}, beforeUnmount() {
  this.clearFocusTrap(), this.clearEscapeStopPropagation();
}, methods: { checkTriggerA11y() {
  window.OC?.debug && this.getPopoverTriggerContainerElement().querySelector("[aria-expanded]");
}, removeFloatingVueAriaDescribedBy() {
  const t = this.getPopoverTriggerContainerElement().querySelectorAll("[data-popper-shown]");
  for (const n of t) n.removeAttribute("aria-describedby");
}, getPopoverContentElement() {
  return this.$refs.popover?.$refs.popperContent?.$el;
}, getPopoverTriggerContainerElement() {
  return this.$refs.popover?.$refs.popper?.$refs.reference;
}, async useFocusTrap() {
  if (await this.$nextTick(), this.noFocusTrap) return;
  const e4 = this.getPopoverContentElement();
  e4.tabIndex = -1, e4 && (this.$focusTrap = Cu(e4, { escapeDeactivates: false, allowOutsideClick: true, setReturnFocus: this.setReturnFocus, trapStack: _i(), fallBackFocus: e4 }), this.$focusTrap.activate());
}, clearFocusTrap(e4 = {}) {
  try {
    this.$focusTrap?.deactivate(e4), this.$focusTrap = null;
  } catch (t) {
    console.warn(t);
  }
}, addEscapeStopPropagation() {
  this.getPopoverContentElement()?.addEventListener("keydown", this.stopKeydownEscapeHandler);
}, clearEscapeStopPropagation() {
  this.getPopoverContentElement()?.removeEventListener("keydown", this.stopKeydownEscapeHandler);
}, stopKeydownEscapeHandler(e4) {
  e4.type === "keydown" && e4.key === "Escape" && e4.stopPropagation();
}, async afterShow() {
  this.getPopoverContentElement().addEventListener("transitionend", () => {
    this.$emit("afterShow");
  }, { once: true, passive: true }), this.removeFloatingVueAriaDescribedBy(), await this.$nextTick(), await this.useFocusTrap(), this.addEscapeStopPropagation();
}, afterHide() {
  this.getPopoverContentElement()?.addEventListener("transitionend", () => {
    this.$emit("afterHide");
  }, { once: true, passive: true }), this.clearFocusTrap(), this.clearEscapeStopPropagation();
} } };
function WN(e4, t, n, r, i, s) {
  const o = dt("NcPopoverTriggerProvider"), a = dt("Dropdown");
  return oe(), at(a, { ref: "popover", shown: i.internalShown, "onUpdate:shown": [t[0] || (t[0] = (l) => i.internalShown = l), t[1] || (t[1] = (l) => i.internalShown = l)], "arrow-padding": 10, "auto-hide": n.closeOnClickOutside, boundary: n.boundary || void 0, container: n.container, delay: n.delay, distance: 10, "handle-resize": "", "no-auto-focus": true, placement: s.internalPlacement, "popper-class": n.popoverBaseClass, "popper-triggers": s.popperTriggers, "popper-hide-triggers": s.popperHideTriggers, "popper-show-triggers": s.popperShowTriggers, triggers: s.internalTriggers, "hide-triggers": s.hideTriggers, "show-triggers": s.showTriggers, onApplyShow: s.afterShow, onApplyHide: s.afterHide }, { popper: et((l) => [Mt(e4.$slots, "default", Eo(ms(l)))]), default: et(() => [xe(o, { shown: i.internalShown, "popup-role": n.popupRole }, { default: et((l) => [Mt(e4.$slots, "trigger", Eo(ms(l)))]), _: 3 }, 8, ["shown", "popup-role"])]), _: 3 }, 8, ["shown", "auto-hide", "boundary", "container", "delay", "placement", "popper-class", "popper-triggers", "popper-hide-triggers", "popper-show-triggers", "triggers", "hide-triggers", "show-triggers", "onApplyShow", "onApplyHide"]);
}
const qu = Nt(qN, [["render", WN]]), Mi = Symbol.for("NcActions:isSemanticMenu"), Ig = Symbol.for("NcActions:closeMenu"), GN = { name: "DotsHorizontalIcon", emits: ["click"], props: { title: { type: String }, fillColor: { type: String, default: "currentColor" }, size: { type: Number, default: 24 } } }, ZN = ["aria-hidden", "aria-label"], KN = ["fill", "width", "height"], YN = { d: "M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z" }, XN = { key: 0 };
function JN(e4, t, n, r, i, s) {
  return oe(), pe("span", mn(e4.$attrs, { "aria-hidden": n.title ? null : "true", "aria-label": n.title, class: "material-design-icon dots-horizontal-icon", role: "img", onClick: t[0] || (t[0] = (o) => e4.$emit("click", o)) }), [(oe(), pe("svg", { fill: n.fillColor, class: "material-design-icon__svg", width: n.size, height: n.size, viewBox: "0 0 24 24" }, [Ae("path", YN, [n.title ? (oe(), pe("title", XN, qe(n.title), 1)) : Xe("", true)])], 8, KN))], 16, ZN);
}
const Lg = Nt(GN, [["render", JN]]);
function Wu(e4) {
  return Array.isArray(e4) && e4.some((t) => {
    if (t === null) return false;
    if (typeof t == "object") {
      const n = t;
      if (n.type === Et || n.type === ht && !Wu(n.children) || n.type === fs && !n.children.trim()) return false;
    }
    return true;
  });
}
Sr(m1);
const QN = ".focusable", eC = { name: "NcActions", components: { NcButton: Oi, NcPopover: qu }, provide() {
  return { [Mi]: ke(() => this.actionsMenuSemanticType === "menu"), [Ig]: this.closeMenu };
}, props: { open: { type: Boolean, default: false }, manualOpen: { type: Boolean, default: false }, forceMenu: { type: Boolean, default: false }, forceName: { type: Boolean, default: false }, menuName: { type: String, default: null }, primary: { type: Boolean, default: false }, defaultIcon: { type: String, default: "" }, ariaLabel: { type: String, default: Re("Actions") }, placement: { type: String, default: "bottom" }, boundariesElement: { type: Element, default: () => document.getElementById("content-vue") ?? document.querySelector("body") }, container: { type: [String, Object, Element, Boolean], default: "body" }, disabled: { type: Boolean, default: false }, inline: { type: Number, default: 0 }, variant: { type: String, validator(e4) {
  return ["primary", "secondary", "tertiary", "tertiary-no-background", "tertiary-on-primary", "error", "warning", "success"].includes(e4);
}, default: null } }, emits: ["click", "blur", "focus", "close", "closed", "open", "opened", "update:open"], setup(e4) {
  const t = _u(), n = `trigger-${t}`, r = Gt(), { top: i, bottom: s } = jm(r), { top: o, bottom: a } = jm(Fl(() => e4.boundariesElement)), { height: l } = mT(), u = ke(() => Math.max(Math.min(i.value - 84, i.value - o.value), Math.min(l.value - s.value - 34, a.value - s.value)));
  return { triggerButton: r, maxMenuHeight: u, randomId: t, triggerRandomId: n };
}, data() {
  return { opened: this.open, focusIndex: 0, actionsMenuSemanticType: "unknown" };
}, computed: { triggerButtonVariant() {
  return this.variant || (this.primary ? "primary" : this.menuName ? "secondary" : "tertiary");
}, config() {
  return { menu: { popupRole: "menu", withArrowNavigation: true, withTabNavigation: false, withFocusTrap: false }, navigation: { popupRole: void 0, withArrowNavigation: false, withTabNavigation: true, withFocusTrap: false }, dialog: { popupRole: "dialog", withArrowNavigation: false, withTabNavigation: true, withFocusTrap: true }, tooltip: { popupRole: void 0, withArrowNavigation: false, withTabNavigation: false, withFocusTrap: false }, unknown: { popupRole: void 0, role: void 0, withArrowNavigation: true, withTabNavigation: false, withFocusTrap: true } }[this.actionsMenuSemanticType];
}, withFocusTrap() {
  return this.config.withFocusTrap;
} }, watch: { open(e4) {
  e4 !== this.opened && (this.opened = e4);
}, opened() {
  this.opened ? document.body.addEventListener("keydown", this.handleEscapePressed) : document.body.removeEventListener("keydown", this.handleEscapePressed);
} }, created() {
  G1(() => this.opened, { disabled: () => this.config.withFocusTrap }), "ariaHidden" in this.$attrs;
}, methods: { getActionName(e4) {
  return e4?.type?.name;
}, isValidSingleAction(e4) {
  return ["NcActionButton", "NcActionLink", "NcActionRouter"].includes(this.getActionName(e4));
}, isAction(e4) {
  return this.getActionName(e4)?.startsWith?.("NcAction");
}, isIconUrl(e4) {
  try {
    return !!new URL(e4, e4.startsWith("/") ? window.location.origin : void 0);
  } catch {
    return false;
  }
}, toggleMenu(e4) {
  e4 ? this.openMenu() : this.closeMenu();
}, openMenu() {
  this.opened || (this.opened = true, this.$emit("update:open", true), this.$emit("open"));
}, async closeMenu(e4 = true) {
  this.opened && (await this.$nextTick(), this.opened = false, this.$refs.popover?.clearFocusTrap({ returnFocus: e4 }), this.$emit("update:open", false), this.$emit("close"), this.focusIndex = 0, e4 && this.$refs.triggerButton?.$el.focus());
}, onOpened() {
  this.$nextTick(() => {
    this.focusFirstAction(null), this.resizePopover(), this.$emit("opened");
  });
}, onClosed() {
  this.$emit("closed");
}, resizePopover() {
  const e4 = this.$refs.menu.closest(".v-popper__inner");
  if (this.$refs.menu.clientHeight > this.maxMenuHeight) {
    let n = 0, r = 0;
    for (const i of this.$refs.menuList.children) {
      if (n + i.clientHeight / 2 > this.maxMenuHeight) {
        e4.style.height = `${n - r / 2}px`;
        break;
      }
      r = i.clientHeight, n += r;
    }
  } else e4.style.height = "fit-content";
}, getCurrentActiveMenuItemElement() {
  return this.$refs.menu.querySelector("li.active");
}, getFocusableMenuItemElements() {
  return this.$refs.menu.querySelectorAll(QN);
}, onKeydown(e4) {
  if (e4.key === "Tab") {
    if (this.config.withFocusTrap) return;
    if (!this.config.withTabNavigation) {
      this.closeMenu(true);
      return;
    }
    e4.preventDefault();
    const t = this.getFocusableMenuItemElements(), n = [...t].indexOf(document.activeElement);
    if (n === -1) return;
    const r = e4.shiftKey ? n - 1 : n + 1;
    (r < 0 || r === t.length) && this.closeMenu(true), this.focusIndex = r, this.focusAction();
    return;
  }
  this.config.withArrowNavigation && (e4.key === "ArrowUp" && this.focusPreviousAction(e4), e4.key === "ArrowDown" && this.focusNextAction(e4), e4.key === "PageUp" && this.focusFirstAction(e4), e4.key === "PageDown" && this.focusLastAction(e4)), this.handleEscapePressed(e4);
}, onTriggerKeydown(e4) {
  e4.key === "Escape" && this.actionsMenuSemanticType === "tooltip" && this.closeMenu();
}, handleEscapePressed(e4) {
  e4.key === "Escape" && (this.closeMenu(), e4.preventDefault());
}, removeCurrentActive() {
  const e4 = this.$refs.menu.querySelector("li.active");
  e4 && e4.classList.remove("active");
}, focusAction() {
  const e4 = this.getFocusableMenuItemElements()[this.focusIndex];
  if (e4) {
    this.removeCurrentActive();
    const t = e4.closest("li.action");
    e4.focus(), t && t.classList.add("active");
  }
}, focusPreviousAction(e4) {
  this.opened && (this.focusIndex === 0 ? this.focusLastAction(e4) : (this.preventIfEvent(e4), this.focusIndex = this.focusIndex - 1), this.focusAction());
}, focusNextAction(e4) {
  if (this.opened) {
    const t = this.getFocusableMenuItemElements().length - 1;
    this.focusIndex === t ? this.focusFirstAction(e4) : (this.preventIfEvent(e4), this.focusIndex = this.focusIndex + 1), this.focusAction();
  }
}, focusFirstAction(e4) {
  if (this.opened) {
    this.preventIfEvent(e4);
    const t = [...this.getFocusableMenuItemElements()].findIndex((n) => n.getAttribute("aria-checked") === "true" && n.getAttribute("role") === "menuitemradio");
    this.focusIndex = t > -1 ? t : 0, this.focusAction();
  }
}, focusLastAction(e4) {
  this.opened && (this.preventIfEvent(e4), this.focusIndex = this.getFocusableMenuItemElements().length - 1, this.focusAction());
}, preventIfEvent(e4) {
  e4 && (e4.preventDefault(), e4.stopPropagation());
}, onFocus(e4) {
  this.$emit("focus", e4);
}, onBlur(e4) {
  this.$emit("blur", e4), this.actionsMenuSemanticType === "tooltip" && this.$refs.menu && this.getFocusableMenuItemElements().length === 0 && this.closeMenu(false);
}, onClick(e4) {
  this.$emit("click", e4);
} }, render() {
  const e4 = [], t = (v, m) => {
    v.forEach((y) => {
      if (this.isAction(y)) {
        m.push(y);
        return;
      }
      y.type === ht && t(y.children, m);
    });
  };
  if (t(this.$slots.default?.(), e4), e4.length === 0) return;
  let n = e4.filter(this.isValidSingleAction);
  this.forceMenu && n.length > 0 && this.inline > 0 && (n = []);
  const r = n.slice(0, this.inline), i = e4.filter((v) => !r.includes(v)), s = ["NcActionButton", "NcActionButtonGroup", "NcActionCheckbox", "NcActionRadio"], o = ["NcActionInput", "NcActionTextEditable"], a = ["NcActionLink", "NcActionRouter"], l = i.some((v) => o.includes(this.getActionName(v))), u = i.some((v) => s.includes(this.getActionName(v))), c = i.some((v) => a.includes(this.getActionName(v)));
  l ? this.actionsMenuSemanticType = "dialog" : u ? this.actionsMenuSemanticType = "menu" : c ? this.actionsMenuSemanticType = "navigation" : e4.filter((m) => this.getActionName(m).startsWith("NcAction")).length === e4.length ? this.actionsMenuSemanticType = "tooltip" : this.actionsMenuSemanticType = "unknown";
  const f = (v) => {
    const m = v?.props?.icon, y = v?.children?.icon?.()?.[0] ?? (this.isIconUrl(m) ? Tt("img", { class: "action-item__menutoggle__icon", src: m, alt: "" }) : Tt("span", { class: ["icon", m] })), k = v?.children?.default?.()?.[0]?.children?.trim(), E = this.forceName ? k : "";
    let A = v?.props?.title;
    this.forceName || A || (A = k);
    const C = { ...v?.props ?? {} }, x = ["submit", "reset"].includes(C.type) ? C.modelValue : "button";
    return delete C.modelValue, delete C.type, Tt(Oi, mn(C, { class: "action-item action-item--single", "aria-label": v?.props?.["aria-label"] || k, title: A, disabled: this.disabled || v?.props?.disabled, pressed: v?.props?.modelValue, type: x, variant: this.variant || (E ? "secondary" : "tertiary"), onFocus: this.onFocus, onBlur: this.onBlur, "onUpdate:pressed": v?.props?.["onUpdate:modelValue"] ?? (() => {
    }) }), { default: () => E, icon: () => y });
  }, p = (v) => {
    const m = Wu(this.$slots.icon?.()) ? this.$slots.icon?.() : this.defaultIcon ? Tt("span", { class: ["icon", this.defaultIcon] }) : Tt(Lg, { size: 20 }), y = `${this.randomId}-trigger`;
    return Tt(qu, { ref: "popover", delay: 0, shown: this.opened, placement: this.placement, boundary: this.boundariesElement, container: this.container, ...this.manualOpen && { triggers: [] }, closeOnClickOutside: !this.manualOpen, popoverBaseClass: "action-item__popper", popupRole: this.config.popupRole, setReturnFocus: this.config.withFocusTrap ? this.$refs.triggerButton?.$el : void 0, noFocusTrap: !this.config.withFocusTrap, "onUpdate:shown": this.toggleMenu, onAfterShow: this.onOpened, onAfterClose: this.onClosed }, { trigger: () => Tt(Oi, { id: y, class: "action-item__menutoggle", disabled: this.disabled, variant: this.triggerButtonVariant, ref: "triggerButton", "aria-label": this.menuName ? null : this.ariaLabel, "aria-controls": this.opened && this.config.popupRole ? this.randomId : null, onFocus: this.onFocus, onBlur: this.onBlur, onClick: this.onClick, onKeydown: this.onTriggerKeydown }, { icon: () => m, default: () => this.menuName }), default: () => Tt("div", { class: { open: this.opened }, tabindex: "-1", onKeydown: this.onKeydown, ref: "menu" }, [Tt("ul", { id: this.randomId, tabindex: "-1", ref: "menuList", role: this.config.popupRole, "aria-labelledby": y, "aria-modal": this.actionsMenuSemanticType === "dialog" ? "true" : void 0 }, [v])]) });
  };
  return e4.length === 1 && n.length === 1 && !this.forceMenu ? f(e4[0]) : (this.$nextTick(() => {
    this.opened && this.$refs.menu && (this.resizePopover(), (this.$refs.menu.querySelector("li.active") || []).length === 0 && this.focusFirstAction());
  }), r.length > 0 && this.inline > 0 ? Tt("div", { class: ["action-items", `action-item--${this.triggerButtonVariant}`] }, [...r.map(f), i.length > 0 ? Tt("div", { class: ["action-item", { "action-item--open": this.opened }] }, [p(i)]) : null]) : Tt("div", { class: ["action-item action-item--default-popover", `action-item--${this.triggerButtonVariant}`, { "action-item--open": this.opened }] }, [p(e4)]));
} }, Gu = Nt(eC, [["__scopeId", "data-v-da9c53d9"]]), tC = ["aria-hidden", "aria-label"], nC = { key: 0, viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, rC = ["d"], iC = ["innerHTML"], sC = Zt({ __name: "NcIconSvgWrapper", props: { directional: { type: Boolean }, inline: { type: Boolean }, svg: { default: "" }, name: { default: void 0 }, path: { default: "" }, size: { default: 20 } }, setup(e4) {
  cv((i) => ({ a360429a: n.value }));
  const t = e4, n = ke(() => typeof t.size == "number" ? `${t.size}px` : t.size), r = ke(() => {
    if (!t.svg || t.path) return;
    const i = pu.sanitize(t.svg), s = new DOMParser().parseFromString(i, "image/svg+xml");
    return s.querySelector("parsererror") ? "" : (s.documentElement.id && s.documentElement.removeAttribute("id"), s.documentElement.outerHTML);
  });
  return (i, s) => (oe(), pe("span", { "aria-hidden": i.name ? void 0 : "true", "aria-label": i.name || void 0, class: yt(["icon-vue", { "icon-vue--directional": i.directional, "icon-vue--inline": i.inline }]), role: "img" }, [r.value ? (oe(), pe("span", { key: 1, innerHTML: r.value }, null, 8, iC)) : (oe(), pe("svg", nC, [Ae("path", { d: i.path }, null, 8, rC)]))], 10, tC));
} }), Ma = Nt(sC, [["__scopeId", "data-v-bd3d356d"]]), oC = { name: "CloseIcon", emits: ["click"], props: { title: { type: String }, fillColor: { type: String, default: "currentColor" }, size: { type: Number, default: 24 } } }, aC = ["aria-hidden", "aria-label"], lC = ["fill", "width", "height"], cC = { d: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" }, uC = { key: 0 };
function dC(e4, t, n, r, i, s) {
  return oe(), pe("span", mn(e4.$attrs, { "aria-hidden": n.title ? null : "true", "aria-label": n.title, class: "material-design-icon close-icon", role: "img", onClick: t[0] || (t[0] = (o) => e4.$emit("click", o)) }), [(oe(), pe("svg", { fill: n.fillColor, class: "material-design-icon__svg", width: n.size, height: n.size, viewBox: "0 0 24 24" }, [Ae("path", cC, [n.title ? (oe(), pe("title", uC, qe(n.title), 1)) : Xe("", true)])], 8, lC))], 16, aC);
}
const Fg = Nt(oC, [["render", dC]]);
Sr(Km, L1);
function fC(e4, t) {
  let n, r, i = t, s;
  this.start = function() {
    s = true, r = /* @__PURE__ */ new Date(), n = setTimeout(e4, i);
  }, this.pause = function() {
    s = false, clearTimeout(n), i -= /* @__PURE__ */ new Date() - r;
  }, this.clear = function() {
    s = false, clearTimeout(n), i = 0;
  }, this.getTimeLeft = function() {
    return s && (this.pause(), this.start()), i;
  }, this.getStateRunning = function() {
    return s;
  }, this.start();
}
const hC = { name: "PauseIcon", emits: ["click"], props: { title: { type: String }, fillColor: { type: String, default: "currentColor" }, size: { type: Number, default: 24 } } }, vC = ["aria-hidden", "aria-label"], pC = ["fill", "width", "height"], mC = { d: "M14,19H18V5H14M6,19H10V5H6V19Z" }, gC = { key: 0 };
function yC(e4, t, n, r, i, s) {
  return oe(), pe("span", mn(e4.$attrs, { "aria-hidden": n.title ? null : "true", "aria-label": n.title, class: "material-design-icon pause-icon", role: "img", onClick: t[0] || (t[0] = (o) => e4.$emit("click", o)) }), [(oe(), pe("svg", { fill: n.fillColor, class: "material-design-icon__svg", width: n.size, height: n.size, viewBox: "0 0 24 24" }, [Ae("path", mC, [n.title ? (oe(), pe("title", gC, qe(n.title), 1)) : Xe("", true)])], 8, pC))], 16, vC);
}
const bC = Nt(hC, [["render", yC]]), kC = { name: "PlayIcon", emits: ["click"], props: { title: { type: String }, fillColor: { type: String, default: "currentColor" }, size: { type: Number, default: 24 } } }, wC = ["aria-hidden", "aria-label"], SC = ["fill", "width", "height"], EC = { d: "M8,5.14V19.14L19,12.14L8,5.14Z" }, AC = { key: 0 };
function TC(e4, t, n, r, i, s) {
  return oe(), pe("span", mn(e4.$attrs, { "aria-hidden": n.title ? null : "true", "aria-label": n.title, class: "material-design-icon play-icon", role: "img", onClick: t[0] || (t[0] = (o) => e4.$emit("click", o)) }), [(oe(), pe("svg", { fill: n.fillColor, class: "material-design-icon__svg", width: n.size, height: n.size, viewBox: "0 0 24 24" }, [Ae("path", EC, [n.title ? (oe(), pe("title", AC, qe(n.title), 1)) : Xe("", true)])], 8, SC))], 16, wC);
}
const NC = Nt(kC, [["render", TC]]), CC = { name: "NcModal", components: { Close: Fg, Pause: bC, Play: NC, NcActions: Gu, NcButton: Oi, NcIconSvgWrapper: Ma }, props: { name: { type: String, default: "" }, hasPrevious: { type: Boolean, default: false }, hasNext: { type: Boolean, default: false }, outTransition: { type: Boolean, default: false }, enableSlideshow: { type: Boolean, default: false }, slideshowDelay: { type: Number, default: 5e3 }, slideshowPaused: { type: Boolean, default: false }, disableSwipe: { type: Boolean, default: false }, spreadNavigation: { type: Boolean, default: false }, size: { type: String, default: "normal", validator: (e4) => ["small", "normal", "large", "full"].includes(e4) }, noClose: { type: Boolean, default: false }, closeOnClickOutside: { type: Boolean, default: false }, dark: { type: Boolean, default: false }, lightBackdrop: { type: Boolean, default: false }, container: { type: [String, null], default: "body" }, closeButtonOutside: { type: Boolean, default: false }, additionalTrapElements: { type: Array, default: () => [] }, inlineActions: { type: Number, default: 0 }, show: { type: Boolean, default: void 0 }, labelId: { type: String, default: "" }, setReturnFocus: { default: void 0, type: [HTMLElement, SVGElement, String, Boolean] } }, emits: ["previous", "next", "close", "update:show"], setup() {
  return { mdiChevronLeft: Fm, mdiChevronRight: Eu };
}, data() {
  return { mc: null, playing: false, slideshowTimeout: null, iconSize: 24, focusTrap: null, randId: _u(), internalShow: true };
}, computed: { modalLabelId() {
  return this.labelId || `modal-name-${this.randId}`;
}, showModal() {
  return this.show === void 0 ? this.internalShow : this.show;
}, modalTransitionName() {
  return `modal-${this.outTransition ? "out" : "in"}`;
}, playPauseName() {
  return this.playing ? Re("Pause slideshow") : Re("Start slideshow");
}, cssVariables() {
  return { "--slideshow-duration": this.slideshowDelay + "ms", "--icon-size": this.iconSize + "px" };
}, closeButtonAriaLabel() {
  return Re("Close");
}, prevButtonAriaLabel() {
  return Re("Previous");
}, nextButtonAriaLabel() {
  return Re("Next");
} }, watch: { slideshowPaused(e4) {
  this.slideshowTimeout && (e4 ? this.slideshowTimeout.pause() : this.slideshowTimeout.start());
}, additionalTrapElements(e4) {
  if (this.focusTrap) {
    const t = this.$refs.mask;
    this.focusTrap.updateContainerElements([t, ...e4]);
  }
} }, beforeMount() {
  window.addEventListener("keydown", this.handleKeydown);
}, beforeUnmount() {
  window.removeEventListener("keydown", this.handleKeydown), this.mc.stop();
}, mounted() {
  !this.name && this.labelId, this.useFocusTrap(), this.mc = Im(this.$refs.mask, { onSwipeEnd: this.handleSwipe }), this.container && (this.container === "body" ? document.body.insertBefore(this.$el, document.body.lastChild) : document.querySelector(this.container).appendChild(this.$el));
}, unmounted() {
  this.clearFocusTrap(), this.$el.remove();
}, methods: { t: Re, previous(e4) {
  this.hasPrevious && (e4 && this.resetSlideshow(), this.$emit("previous", e4));
}, next(e4) {
  this.hasNext && (e4 && this.resetSlideshow(), this.$emit("next", e4));
}, close(e4) {
  this.noClose || (this.internalShow = false, this.$emit("update:show", false), setTimeout(() => {
    this.$emit("close", e4);
  }, 300));
}, handleClickModalWrapper(e4) {
  this.closeOnClickOutside && this.close(e4);
}, handleKeydown(e4) {
  if (e4.key === "Escape") {
    const n = _i();
    return n.length > 0 && n[n.length - 1] !== this.focusTrap ? void 0 : this.close(e4);
  }
  const t = { ArrowLeft: this.previous, ArrowRight: this.next };
  if (t[e4.key]) return document.activeElement && !this.$el.contains(document.activeElement) ? void 0 : t[e4.key](e4);
}, handleSwipe(e4, t) {
  this.disableSwipe || (t === "left" ? this.next(e4) : t === "right" && this.previous(e4));
}, togglePlayPause() {
  this.playing = !this.playing, this.playing ? this.handleSlideshow() : this.clearSlideshowTimeout();
}, resetSlideshow() {
  this.playing = !this.playing, this.clearSlideshowTimeout(), this.$nextTick(function() {
    this.togglePlayPause();
  });
}, handleSlideshow() {
  this.playing = true, this.hasNext ? this.slideshowTimeout = new fC(() => {
    this.next(), this.handleSlideshow();
  }, this.slideshowDelay) : (this.playing = false, this.clearSlideshowTimeout());
}, clearSlideshowTimeout() {
  this.slideshowTimeout && this.slideshowTimeout.clear();
}, async useFocusTrap() {
  if (!this.showModal || this.focusTrap) return;
  const e4 = this.$refs.mask;
  await this.$nextTick();
  const t = { allowOutsideClick: true, fallbackFocus: e4, trapStack: _i(), escapeDeactivates: false, setReturnFocus: this.setReturnFocus };
  this.focusTrap = Cu([e4, ...this.additionalTrapElements], t), this.focusTrap.activate();
}, clearFocusTrap() {
  this.focusTrap && (this.focusTrap?.deactivate(), this.focusTrap = null);
} } }, _C = ["aria-labelledby", "aria-describedby"], OC = ["data-theme-light", "data-theme-dark"], PC = ["id"], xC = { class: "icons-menu" }, RC = ["title"], MC = { class: "hidden-visually" }, jC = { key: 2, class: "progress-ring", height: "50", width: "50" }, IC = ["id"], LC = { class: "modal-container__content" };
function FC(e4, t, n, r, i, s) {
  const o = dt("Play"), a = dt("Pause"), l = dt("NcActions"), u = dt("Close"), c = dt("NcButton"), f = dt("NcIconSvgWrapper");
  return oe(), at(gi, { name: "fade", appear: "", onAfterEnter: s.useFocusTrap, onBeforeLeave: s.clearFocusTrap }, { default: et(() => [di(Ae("div", { ref: "mask", class: yt(["modal-mask", { "modal-mask--opaque": n.dark || n.closeButtonOutside || n.hasPrevious || n.hasNext, "modal-mask--light": n.lightBackdrop }]), style: Pt(s.cssVariables), role: "dialog", "aria-modal": "true", "aria-labelledby": s.modalLabelId, "aria-describedby": "modal-description-" + i.randId, tabindex: "-1" }, [xe(gi, { name: "fade-visibility", appear: "" }, { default: et(() => [Ae("div", { class: "modal-header", "data-theme-light": n.lightBackdrop, "data-theme-dark": !n.lightBackdrop }, [n.name.trim() !== "" ? (oe(), pe("h2", { key: 0, id: "modal-name-" + i.randId, class: "modal-header__name" }, qe(n.name), 9, PC)) : Xe("", true), Ae("div", xC, [n.hasNext && n.enableSlideshow ? (oe(), pe("button", { key: 0, class: yt([{ "play-pause-icons--paused": n.slideshowPaused }, "play-pause-icons"]), title: s.playPauseName, type: "button", onClick: t[0] || (t[0] = (...p) => s.togglePlayPause && s.togglePlayPause(...p)) }, [i.playing ? (oe(), at(a, { key: 1, size: i.iconSize, class: "play-pause-icons__pause" }, null, 8, ["size"])) : (oe(), at(o, { key: 0, size: i.iconSize, class: "play-pause-icons__play" }, null, 8, ["size"])), Ae("span", MC, qe(s.playPauseName), 1), i.playing ? (oe(), pe("svg", jC, t[2] || (t[2] = [Ae("circle", { class: "progress-ring__circle", stroke: "white", "stroke-width": "2", fill: "transparent", r: "15", cx: "25", cy: "25" }, null, -1)]))) : Xe("", true)], 10, RC)) : Xe("", true), xe(l, { class: "header-actions", inline: n.inlineActions }, { default: et(() => [Mt(e4.$slots, "actions", {}, void 0, true)]), _: 3 }, 8, ["inline"]), !n.noClose && n.closeButtonOutside ? (oe(), at(c, { key: 1, "aria-label": s.closeButtonAriaLabel, class: "header-close", variant: "tertiary", onClick: s.close }, { icon: et(() => [xe(u, { size: i.iconSize }, null, 8, ["size"])]), _: 1 }, 8, ["aria-label", "onClick"])) : Xe("", true)])], 8, OC)]), _: 3 }), xe(gi, { name: s.modalTransitionName, appear: "" }, { default: et(() => [di(Ae("div", { class: yt([[`modal-wrapper--${n.size}`, { "modal-wrapper--spread-navigation": n.spreadNavigation }], "modal-wrapper"]), onMousedown: t[1] || (t[1] = Cv((...p) => s.handleClickModalWrapper && s.handleClickModalWrapper(...p), ["self"])) }, [xe(gi, { name: "fade-visibility", appear: "" }, { default: et(() => [di(xe(c, { "aria-label": s.prevButtonAriaLabel, class: "prev", variant: "tertiary-no-background", onClick: s.previous }, { icon: et(() => [xe(f, { directional: "", path: r.mdiChevronLeft, size: 40 }, null, 8, ["path"])]), _: 1 }, 8, ["aria-label", "onClick"]), [[bs, n.hasPrevious]])]), _: 1 }), Ae("div", { id: "modal-description-" + i.randId, class: "modal-container" }, [Ae("div", LC, [Mt(e4.$slots, "default", {}, void 0, true)]), !n.noClose && !n.closeButtonOutside ? (oe(), at(c, { key: 0, "aria-label": s.closeButtonAriaLabel, class: "modal-container__close", variant: "tertiary", onClick: s.close }, { icon: et(() => [xe(u, { size: 20 })]), _: 1 }, 8, ["aria-label", "onClick"])) : Xe("", true)], 8, IC), xe(gi, { name: "fade-visibility", appear: "" }, { default: et(() => [di(xe(c, { "aria-label": s.nextButtonAriaLabel, class: "next", variant: "tertiary-no-background", onClick: s.next }, { icon: et(() => [xe(f, { directional: "", path: r.mdiChevronRight, size: 40 }, null, 8, ["path"])]), _: 1 }, 8, ["aria-label", "onClick"]), [[bs, n.hasNext]])]), _: 1 })], 34), [[bs, s.showModal]])]), _: 3 }, 8, ["name"])], 14, _C), [[bs, s.showModal]])]), _: 3 }, 8, ["onAfterEnter", "onBeforeLeave"]);
}
const DC = Nt(CC, [["render", FC], ["__scopeId", "data-v-12a5aabf"]]), BC = ["aria-label"], zC = ["width", "height"], $C = ["fill"], UC = ["fill"], VC = { key: 0 }, HC = Zt({ __name: "NcLoadingIcon", props: { appearance: { default: "auto" }, name: { default: "" }, size: { default: 20 } }, setup(e4) {
  const t = e4, n = ke(() => {
    const r = ["#777", "#CCC"];
    return t.appearance === "light" ? r : t.appearance === "dark" ? r.reverse() : ["var(--color-loading-light)", "var(--color-loading-dark)"];
  });
  return (r, i) => (oe(), pe("span", { "aria-label": r.name, role: "img", class: "material-design-icon loading-icon" }, [(oe(), pe("svg", { width: r.size, height: r.size, viewBox: "0 0 24 24" }, [Ae("path", { fill: n.value[0], d: "M12,4V2A10,10 0 1,0 22,12H20A8,8 0 1,1 12,4Z" }, null, 8, $C), Ae("path", { fill: n.value[1], d: "M12,4V2A10,10 0 0,1 22,12H20A8,8 0 0,0 12,4Z" }, [r.name ? (oe(), pe("title", VC, qe(r.name), 1)) : Xe("", true)], 8, UC)], 8, zC))], 8, BC));
} }), Dg = Nt(HC, [["__scopeId", "data-v-415d9f31"]]);
function Bg(e4, t) {
  return function() {
    return e4.apply(t, arguments);
  };
}
const { toString: qC } = Object.prototype, { getPrototypeOf: Zu } = Object, { iterator: ja, toStringTag: zg } = Symbol, Ia = /* @__PURE__ */ ((e4) => (t) => {
  const n = qC.call(t);
  return e4[n] || (e4[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), En = (e4) => (e4 = e4.toLowerCase(), (t) => Ia(t) === e4), La = (e4) => (t) => typeof t === e4, { isArray: ji } = Array, Ys = La("undefined");
function Xs(e4) {
  return e4 !== null && !Ys(e4) && e4.constructor !== null && !Ys(e4.constructor) && Kt(e4.constructor.isBuffer) && e4.constructor.isBuffer(e4);
}
const $g = En("ArrayBuffer");
function WC(e4) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e4) : t = e4 && e4.buffer && $g(e4.buffer), t;
}
const GC = La("string"), Kt = La("function"), Ug = La("number"), Js = (e4) => e4 !== null && typeof e4 == "object", ZC = (e4) => e4 === true || e4 === false, Fa = (e4) => {
  if (Ia(e4) !== "object") return false;
  const t = Zu(e4);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(zg in e4) && !(ja in e4);
}, KC = (e4) => {
  if (!Js(e4) || Xs(e4)) return false;
  try {
    return Object.keys(e4).length === 0 && Object.getPrototypeOf(e4) === Object.prototype;
  } catch {
    return false;
  }
}, YC = En("Date"), XC = En("File"), JC = En("Blob"), QC = En("FileList"), e_ = (e4) => Js(e4) && Kt(e4.pipe), t_ = (e4) => {
  let t;
  return e4 && (typeof FormData == "function" && e4 instanceof FormData || Kt(e4.append) && ((t = Ia(e4)) === "formdata" || t === "object" && Kt(e4.toString) && e4.toString() === "[object FormData]"));
}, n_ = En("URLSearchParams"), [r_, i_, s_, o_] = ["ReadableStream", "Request", "Response", "Headers"].map(En), a_ = (e4) => e4.trim ? e4.trim() : e4.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Qs(e4, t, { allOwnKeys: n = false } = {}) {
  if (e4 === null || typeof e4 > "u") return;
  let r, i;
  if (typeof e4 != "object" && (e4 = [e4]), ji(e4)) for (r = 0, i = e4.length; r < i; r++) t.call(null, e4[r], r, e4);
  else {
    if (Xs(e4)) return;
    const s = n ? Object.getOwnPropertyNames(e4) : Object.keys(e4), o = s.length;
    let a;
    for (r = 0; r < o; r++) a = s[r], t.call(null, e4[a], a, e4);
  }
}
function Vg(e4, t) {
  if (Xs(e4)) return null;
  t = t.toLowerCase();
  const n = Object.keys(e4);
  let r = n.length, i;
  for (; r-- > 0; ) if (i = n[r], t === i.toLowerCase()) return i;
  return null;
}
const Zr = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : po, Hg = (e4) => !Ys(e4) && e4 !== Zr;
function Ku() {
  const { caseless: e4 } = Hg(this) && this || {}, t = {}, n = (r, i) => {
    const s = e4 && Vg(t, i) || i;
    Fa(t[s]) && Fa(r) ? t[s] = Ku(t[s], r) : Fa(r) ? t[s] = Ku({}, r) : ji(r) ? t[s] = r.slice() : t[s] = r;
  };
  for (let r = 0, i = arguments.length; r < i; r++) arguments[r] && Qs(arguments[r], n);
  return t;
}
const l_ = (e4, t, n, { allOwnKeys: r } = {}) => (Qs(t, (i, s) => {
  n && Kt(i) ? e4[s] = Bg(i, n) : e4[s] = i;
}, { allOwnKeys: r }), e4), c_ = (e4) => (e4.charCodeAt(0) === 65279 && (e4 = e4.slice(1)), e4), u_ = (e4, t, n, r) => {
  e4.prototype = Object.create(t.prototype, r), e4.prototype.constructor = e4, Object.defineProperty(e4, "super", { value: t.prototype }), n && Object.assign(e4.prototype, n);
}, d_ = (e4, t, n, r) => {
  let i, s, o;
  const a = {};
  if (t = t || {}, e4 == null) return t;
  do {
    for (i = Object.getOwnPropertyNames(e4), s = i.length; s-- > 0; ) o = i[s], (!r || r(o, e4, t)) && !a[o] && (t[o] = e4[o], a[o] = true);
    e4 = n !== false && Zu(e4);
  } while (e4 && (!n || n(e4, t)) && e4 !== Object.prototype);
  return t;
}, f_ = (e4, t, n) => {
  e4 = String(e4), (n === void 0 || n > e4.length) && (n = e4.length), n -= t.length;
  const r = e4.indexOf(t, n);
  return r !== -1 && r === n;
}, h_ = (e4) => {
  if (!e4) return null;
  if (ji(e4)) return e4;
  let t = e4.length;
  if (!Ug(t)) return null;
  const n = new Array(t);
  for (; t-- > 0; ) n[t] = e4[t];
  return n;
}, v_ = /* @__PURE__ */ ((e4) => (t) => e4 && t instanceof e4)(typeof Uint8Array < "u" && Zu(Uint8Array)), p_ = (e4, t) => {
  const r = (e4 && e4[ja]).call(e4);
  let i;
  for (; (i = r.next()) && !i.done; ) {
    const s = i.value;
    t.call(e4, s[0], s[1]);
  }
}, m_ = (e4, t) => {
  let n;
  const r = [];
  for (; (n = e4.exec(t)) !== null; ) r.push(n);
  return r;
}, g_ = En("HTMLFormElement"), y_ = (e4) => e4.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function(n, r, i) {
  return r.toUpperCase() + i;
}), qg = (({ hasOwnProperty: e4 }) => (t, n) => e4.call(t, n))(Object.prototype), b_ = En("RegExp"), Wg = (e4, t) => {
  const n = Object.getOwnPropertyDescriptors(e4), r = {};
  Qs(n, (i, s) => {
    let o;
    (o = t(i, s, e4)) !== false && (r[s] = o || i);
  }), Object.defineProperties(e4, r);
}, k_ = (e4) => {
  Wg(e4, (t, n) => {
    if (Kt(e4) && ["arguments", "caller", "callee"].indexOf(n) !== -1) return false;
    const r = e4[n];
    if (Kt(r)) {
      if (t.enumerable = false, "writable" in t) {
        t.writable = false;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, w_ = (e4, t) => {
  const n = {}, r = (i) => {
    i.forEach((s) => {
      n[s] = true;
    });
  };
  return ji(e4) ? r(e4) : r(String(e4).split(t)), n;
}, S_ = () => {
}, E_ = (e4, t) => e4 != null && Number.isFinite(e4 = +e4) ? e4 : t;
function A_(e4) {
  return !!(e4 && Kt(e4.append) && e4[zg] === "FormData" && e4[ja]);
}
const T_ = (e4) => {
  const t = new Array(10), n = (r, i) => {
    if (Js(r)) {
      if (t.indexOf(r) >= 0) return;
      if (Xs(r)) return r;
      if (!("toJSON" in r)) {
        t[i] = r;
        const s = ji(r) ? [] : {};
        return Qs(r, (o, a) => {
          const l = n(o, i + 1);
          !Ys(l) && (s[a] = l);
        }), t[i] = void 0, s;
      }
    }
    return r;
  };
  return n(e4, 0);
}, N_ = En("AsyncFunction"), C_ = (e4) => e4 && (Js(e4) || Kt(e4)) && Kt(e4.then) && Kt(e4.catch), Gg = ((e4, t) => e4 ? setImmediate : t ? ((n, r) => (Zr.addEventListener("message", ({ source: i, data: s }) => {
  i === Zr && s === n && r.length && r.shift()();
}, false), (i) => {
  r.push(i), Zr.postMessage(n, "*");
}))(`axios@${Math.random()}`, []) : (n) => setTimeout(n))(typeof setImmediate == "function", Kt(Zr.postMessage)), __ = typeof queueMicrotask < "u" ? queueMicrotask.bind(Zr) : typeof aa < "u" && aa.nextTick || Gg, O_ = (e4) => e4 != null && Kt(e4[ja]), R = { isArray: ji, isArrayBuffer: $g, isBuffer: Xs, isFormData: t_, isArrayBufferView: WC, isString: GC, isNumber: Ug, isBoolean: ZC, isObject: Js, isPlainObject: Fa, isEmptyObject: KC, isReadableStream: r_, isRequest: i_, isResponse: s_, isHeaders: o_, isUndefined: Ys, isDate: YC, isFile: XC, isBlob: JC, isRegExp: b_, isFunction: Kt, isStream: e_, isURLSearchParams: n_, isTypedArray: v_, isFileList: QC, forEach: Qs, merge: Ku, extend: l_, trim: a_, stripBOM: c_, inherits: u_, toFlatObject: d_, kindOf: Ia, kindOfTest: En, endsWith: f_, toArray: h_, forEachEntry: p_, matchAll: m_, isHTMLForm: g_, hasOwnProperty: qg, hasOwnProp: qg, reduceDescriptors: Wg, freezeMethods: k_, toObjectSet: w_, toCamelCase: y_, noop: S_, toFiniteNumber: E_, findKey: Vg, global: Zr, isContextDefined: Hg, isSpecCompliantForm: A_, toJSONObject: T_, isAsyncFn: N_, isThenable: C_, setImmediate: Gg, asap: __, isIterable: O_ };
function Te(e4, t, n, r, i) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e4, this.name = "AxiosError", t && (this.code = t), n && (this.config = n), r && (this.request = r), i && (this.response = i, this.status = i.status ? i.status : null);
}
R.inherits(Te, Error, { toJSON: function() {
  return { message: this.message, name: this.name, description: this.description, number: this.number, fileName: this.fileName, lineNumber: this.lineNumber, columnNumber: this.columnNumber, stack: this.stack, config: R.toJSONObject(this.config), code: this.code, status: this.status };
} });
const Zg = Te.prototype, Kg = {};
["ERR_BAD_OPTION_VALUE", "ERR_BAD_OPTION", "ECONNABORTED", "ETIMEDOUT", "ERR_NETWORK", "ERR_FR_TOO_MANY_REDIRECTS", "ERR_DEPRECATED", "ERR_BAD_RESPONSE", "ERR_BAD_REQUEST", "ERR_CANCELED", "ERR_NOT_SUPPORT", "ERR_INVALID_URL"].forEach((e4) => {
  Kg[e4] = { value: e4 };
}), Object.defineProperties(Te, Kg), Object.defineProperty(Zg, "isAxiosError", { value: true }), Te.from = (e4, t, n, r, i, s) => {
  const o = Object.create(Zg);
  return R.toFlatObject(e4, o, function(l) {
    return l !== Error.prototype;
  }, (a) => a !== "isAxiosError"), Te.call(o, e4.message, t, n, r, i), o.cause = e4, o.name = e4.name, s && Object.assign(o, s), o;
};
const P_ = null;
function Yu(e4) {
  return R.isPlainObject(e4) || R.isArray(e4);
}
function Yg(e4) {
  return R.endsWith(e4, "[]") ? e4.slice(0, -2) : e4;
}
function Xg(e4, t, n) {
  return e4 ? e4.concat(t).map(function(i, s) {
    return i = Yg(i), !n && s ? "[" + i + "]" : i;
  }).join(n ? "." : "") : t;
}
function x_(e4) {
  return R.isArray(e4) && !e4.some(Yu);
}
const R_ = R.toFlatObject(R, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function Da(e4, t, n) {
  if (!R.isObject(e4)) throw new TypeError("target must be an object");
  t = t || new FormData(), n = R.toFlatObject(n, { metaTokens: true, dots: false, indexes: false }, false, function(y, k) {
    return !R.isUndefined(k[y]);
  });
  const r = n.metaTokens, i = n.visitor || c, s = n.dots, o = n.indexes, l = (n.Blob || typeof Blob < "u" && Blob) && R.isSpecCompliantForm(t);
  if (!R.isFunction(i)) throw new TypeError("visitor must be a function");
  function u(m) {
    if (m === null) return "";
    if (R.isDate(m)) return m.toISOString();
    if (R.isBoolean(m)) return m.toString();
    if (!l && R.isBlob(m)) throw new Te("Blob is not supported. Use a Buffer instead.");
    return R.isArrayBuffer(m) || R.isTypedArray(m) ? l && typeof Blob == "function" ? new Blob([m]) : Mv.from(m) : m;
  }
  function c(m, y, k) {
    let E = m;
    if (m && !k && typeof m == "object") {
      if (R.endsWith(y, "{}")) y = r ? y : y.slice(0, -2), m = JSON.stringify(m);
      else if (R.isArray(m) && x_(m) || (R.isFileList(m) || R.endsWith(y, "[]")) && (E = R.toArray(m))) return y = Yg(y), E.forEach(function(C, x) {
        !(R.isUndefined(C) || C === null) && t.append(o === true ? Xg([y], x, s) : o === null ? y : y + "[]", u(C));
      }), false;
    }
    return Yu(m) ? true : (t.append(Xg(k, y, s), u(m)), false);
  }
  const f = [], p = Object.assign(R_, { defaultVisitor: c, convertValue: u, isVisitable: Yu });
  function v(m, y) {
    if (!R.isUndefined(m)) {
      if (f.indexOf(m) !== -1) throw Error("Circular reference detected in " + y.join("."));
      f.push(m), R.forEach(m, function(E, A) {
        (!(R.isUndefined(E) || E === null) && i.call(t, E, R.isString(A) ? A.trim() : A, y, p)) === true && v(E, y ? y.concat(A) : [A]);
      }), f.pop();
    }
  }
  if (!R.isObject(e4)) throw new TypeError("data must be an object");
  return v(e4), t;
}
function Jg(e4) {
  const t = { "!": "%21", "'": "%27", "(": "%28", ")": "%29", "~": "%7E", "%20": "+", "%00": "\0" };
  return encodeURIComponent(e4).replace(/[!'()~]|%20|%00/g, function(r) {
    return t[r];
  });
}
function Xu(e4, t) {
  this._pairs = [], e4 && Da(e4, this, t);
}
const Qg = Xu.prototype;
Qg.append = function(t, n) {
  this._pairs.push([t, n]);
}, Qg.toString = function(t) {
  const n = t ? function(r) {
    return t.call(this, r, Jg);
  } : Jg;
  return this._pairs.map(function(i) {
    return n(i[0]) + "=" + n(i[1]);
  }, "").join("&");
};
function M_(e4) {
  return encodeURIComponent(e4).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function ey(e4, t, n) {
  if (!t) return e4;
  const r = n && n.encode || M_;
  R.isFunction(n) && (n = { serialize: n });
  const i = n && n.serialize;
  let s;
  if (i ? s = i(t, n) : s = R.isURLSearchParams(t) ? t.toString() : new Xu(t, n).toString(r), s) {
    const o = e4.indexOf("#");
    o !== -1 && (e4 = e4.slice(0, o)), e4 += (e4.indexOf("?") === -1 ? "?" : "&") + s;
  }
  return e4;
}
class ty {
  constructor() {
    this.handlers = [];
  }
  use(t, n, r) {
    return this.handlers.push({ fulfilled: t, rejected: n, synchronous: r ? r.synchronous : false, runWhen: r ? r.runWhen : null }), this.handlers.length - 1;
  }
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(t) {
    R.forEach(this.handlers, function(r) {
      r !== null && t(r);
    });
  }
}
const ny = { silentJSONParsing: true, forcedJSONParsing: true, clarifyTimeoutError: false }, j_ = typeof URLSearchParams < "u" ? URLSearchParams : Xu, I_ = typeof FormData < "u" ? FormData : null, L_ = typeof Blob < "u" ? Blob : null, F_ = { isBrowser: true, classes: { URLSearchParams: j_, FormData: I_, Blob: L_ }, protocols: ["http", "https", "file", "blob", "url", "data"] }, Ju = typeof window < "u" && typeof document < "u", Qu = typeof navigator == "object" && navigator || void 0, D_ = Ju && (!Qu || ["ReactNative", "NativeScript", "NS"].indexOf(Qu.product) < 0), B_ = typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && typeof self.importScripts == "function", z_ = Ju && window.location.href || "http://localhost", $_ = Object.freeze(Object.defineProperty({ __proto__: null, hasBrowserEnv: Ju, hasStandardBrowserEnv: D_, hasStandardBrowserWebWorkerEnv: B_, navigator: Qu, origin: z_ }, Symbol.toStringTag, { value: "Module" })), jt = { ...$_, ...F_ };
function U_(e4, t) {
  return Da(e4, new jt.classes.URLSearchParams(), { visitor: function(n, r, i, s) {
    return jt.isNode && R.isBuffer(n) ? (this.append(r, n.toString("base64")), false) : s.defaultVisitor.apply(this, arguments);
  }, ...t });
}
function V_(e4) {
  return R.matchAll(/\w+|\[(\w*)]/g, e4).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function H_(e4) {
  const t = {}, n = Object.keys(e4);
  let r;
  const i = n.length;
  let s;
  for (r = 0; r < i; r++) s = n[r], t[s] = e4[s];
  return t;
}
function ry(e4) {
  function t(n, r, i, s) {
    let o = n[s++];
    if (o === "__proto__") return true;
    const a = Number.isFinite(+o), l = s >= n.length;
    return o = !o && R.isArray(i) ? i.length : o, l ? (R.hasOwnProp(i, o) ? i[o] = [i[o], r] : i[o] = r, !a) : ((!i[o] || !R.isObject(i[o])) && (i[o] = []), t(n, r, i[o], s) && R.isArray(i[o]) && (i[o] = H_(i[o])), !a);
  }
  if (R.isFormData(e4) && R.isFunction(e4.entries)) {
    const n = {};
    return R.forEachEntry(e4, (r, i) => {
      t(V_(r), i, n, 0);
    }), n;
  }
  return null;
}
function q_(e4, t, n) {
  if (R.isString(e4)) try {
    return (t || JSON.parse)(e4), R.trim(e4);
  } catch (r) {
    if (r.name !== "SyntaxError") throw r;
  }
  return (n || JSON.stringify)(e4);
}
const eo = { transitional: ny, adapter: ["xhr", "http", "fetch"], transformRequest: [function(t, n) {
  const r = n.getContentType() || "", i = r.indexOf("application/json") > -1, s = R.isObject(t);
  if (s && R.isHTMLForm(t) && (t = new FormData(t)), R.isFormData(t)) return i ? JSON.stringify(ry(t)) : t;
  if (R.isArrayBuffer(t) || R.isBuffer(t) || R.isStream(t) || R.isFile(t) || R.isBlob(t) || R.isReadableStream(t)) return t;
  if (R.isArrayBufferView(t)) return t.buffer;
  if (R.isURLSearchParams(t)) return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", false), t.toString();
  let a;
  if (s) {
    if (r.indexOf("application/x-www-form-urlencoded") > -1) return U_(t, this.formSerializer).toString();
    if ((a = R.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
      const l = this.env && this.env.FormData;
      return Da(a ? { "files[]": t } : t, l && new l(), this.formSerializer);
    }
  }
  return s || i ? (n.setContentType("application/json", false), q_(t)) : t;
}], transformResponse: [function(t) {
  const n = this.transitional || eo.transitional, r = n && n.forcedJSONParsing, i = this.responseType === "json";
  if (R.isResponse(t) || R.isReadableStream(t)) return t;
  if (t && R.isString(t) && (r && !this.responseType || i)) {
    const o = !(n && n.silentJSONParsing) && i;
    try {
      return JSON.parse(t);
    } catch (a) {
      if (o) throw a.name === "SyntaxError" ? Te.from(a, Te.ERR_BAD_RESPONSE, this, null, this.response) : a;
    }
  }
  return t;
}], timeout: 0, xsrfCookieName: "XSRF-TOKEN", xsrfHeaderName: "X-XSRF-TOKEN", maxContentLength: -1, maxBodyLength: -1, env: { FormData: jt.classes.FormData, Blob: jt.classes.Blob }, validateStatus: function(t) {
  return t >= 200 && t < 300;
}, headers: { common: { Accept: "application/json, text/plain, */*", "Content-Type": void 0 } } };
R.forEach(["delete", "get", "head", "post", "put", "patch"], (e4) => {
  eo.headers[e4] = {};
});
const W_ = R.toObjectSet(["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"]), G_ = (e4) => {
  const t = {};
  let n, r, i;
  return e4 && e4.split(`
`).forEach(function(o) {
    i = o.indexOf(":"), n = o.substring(0, i).trim().toLowerCase(), r = o.substring(i + 1).trim(), !(!n || t[n] && W_[n]) && (n === "set-cookie" ? t[n] ? t[n].push(r) : t[n] = [r] : t[n] = t[n] ? t[n] + ", " + r : r);
  }), t;
}, iy = Symbol("internals");
function to(e4) {
  return e4 && String(e4).trim().toLowerCase();
}
function Ba(e4) {
  return e4 === false || e4 == null ? e4 : R.isArray(e4) ? e4.map(Ba) : String(e4);
}
function Z_(e4) {
  const t = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; r = n.exec(e4); ) t[r[1]] = r[2];
  return t;
}
const K_ = (e4) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e4.trim());
function ed(e4, t, n, r, i) {
  if (R.isFunction(r)) return r.call(this, t, n);
  if (i && (t = n), !!R.isString(t)) {
    if (R.isString(r)) return t.indexOf(r) !== -1;
    if (R.isRegExp(r)) return r.test(t);
  }
}
function Y_(e4) {
  return e4.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
}
function X_(e4, t) {
  const n = R.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((r) => {
    Object.defineProperty(e4, r + n, { value: function(i, s, o) {
      return this[r].call(this, t, i, s, o);
    }, configurable: true });
  });
}
let Yt = class {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, r) {
    const i = this;
    function s(a, l, u) {
      const c = to(l);
      if (!c) throw new Error("header name must be a non-empty string");
      const f = R.findKey(i, c);
      (!f || i[f] === void 0 || u === true || u === void 0 && i[f] !== false) && (i[f || l] = Ba(a));
    }
    const o = (a, l) => R.forEach(a, (u, c) => s(u, c, l));
    if (R.isPlainObject(t) || t instanceof this.constructor) o(t, n);
    else if (R.isString(t) && (t = t.trim()) && !K_(t)) o(G_(t), n);
    else if (R.isObject(t) && R.isIterable(t)) {
      let a = {}, l, u;
      for (const c of t) {
        if (!R.isArray(c)) throw TypeError("Object iterator must return a key-value pair");
        a[u = c[0]] = (l = a[u]) ? R.isArray(l) ? [...l, c[1]] : [l, c[1]] : c[1];
      }
      o(a, n);
    } else t != null && s(n, t, r);
    return this;
  }
  get(t, n) {
    if (t = to(t), t) {
      const r = R.findKey(this, t);
      if (r) {
        const i = this[r];
        if (!n) return i;
        if (n === true) return Z_(i);
        if (R.isFunction(n)) return n.call(this, i, r);
        if (R.isRegExp(n)) return n.exec(i);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (t = to(t), t) {
      const r = R.findKey(this, t);
      return !!(r && this[r] !== void 0 && (!n || ed(this, this[r], r, n)));
    }
    return false;
  }
  delete(t, n) {
    const r = this;
    let i = false;
    function s(o) {
      if (o = to(o), o) {
        const a = R.findKey(r, o);
        a && (!n || ed(r, r[a], a, n)) && (delete r[a], i = true);
      }
    }
    return R.isArray(t) ? t.forEach(s) : s(t), i;
  }
  clear(t) {
    const n = Object.keys(this);
    let r = n.length, i = false;
    for (; r--; ) {
      const s = n[r];
      (!t || ed(this, this[s], s, t, true)) && (delete this[s], i = true);
    }
    return i;
  }
  normalize(t) {
    const n = this, r = {};
    return R.forEach(this, (i, s) => {
      const o = R.findKey(r, s);
      if (o) {
        n[o] = Ba(i), delete n[s];
        return;
      }
      const a = t ? Y_(s) : String(s).trim();
      a !== s && delete n[s], n[a] = Ba(i), r[a] = true;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = /* @__PURE__ */ Object.create(null);
    return R.forEach(this, (r, i) => {
      r != null && r !== false && (n[i] = t && R.isArray(r) ? r.join(", ") : r);
    }), n;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`);
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...n) {
    const r = new this(t);
    return n.forEach((i) => r.set(i)), r;
  }
  static accessor(t) {
    const r = (this[iy] = this[iy] = { accessors: {} }).accessors, i = this.prototype;
    function s(o) {
      const a = to(o);
      r[a] || (X_(i, o), r[a] = true);
    }
    return R.isArray(t) ? t.forEach(s) : s(t), this;
  }
};
Yt.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]), R.reduceDescriptors(Yt.prototype, ({ value: e4 }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return { get: () => e4, set(r) {
    this[n] = r;
  } };
}), R.freezeMethods(Yt);
function td(e4, t) {
  const n = this || eo, r = t || n, i = Yt.from(r.headers);
  let s = r.data;
  return R.forEach(e4, function(a) {
    s = a.call(n, s, i.normalize(), t ? t.status : void 0);
  }), i.normalize(), s;
}
function sy(e4) {
  return !!(e4 && e4.__CANCEL__);
}
function Ii(e4, t, n) {
  Te.call(this, e4 ?? "canceled", Te.ERR_CANCELED, t, n), this.name = "CanceledError";
}
R.inherits(Ii, Te, { __CANCEL__: true });
function oy(e4, t, n) {
  const r = n.config.validateStatus;
  !n.status || !r || r(n.status) ? e4(n) : t(new Te("Request failed with status code " + n.status, [Te.ERR_BAD_REQUEST, Te.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4], n.config, n.request, n));
}
function J_(e4) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e4);
  return t && t[1] || "";
}
function Q_(e4, t) {
  e4 = e4 || 10;
  const n = new Array(e4), r = new Array(e4);
  let i = 0, s = 0, o;
  return t = t !== void 0 ? t : 1e3, function(l) {
    const u = Date.now(), c = r[s];
    o || (o = u), n[i] = l, r[i] = u;
    let f = s, p = 0;
    for (; f !== i; ) p += n[f++], f = f % e4;
    if (i = (i + 1) % e4, i === s && (s = (s + 1) % e4), u - o < t) return;
    const v = c && u - c;
    return v ? Math.round(p * 1e3 / v) : void 0;
  };
}
function eO(e4, t) {
  let n = 0, r = 1e3 / t, i, s;
  const o = (u, c = Date.now()) => {
    n = c, i = null, s && (clearTimeout(s), s = null), e4(...u);
  };
  return [(...u) => {
    const c = Date.now(), f = c - n;
    f >= r ? o(u, c) : (i = u, s || (s = setTimeout(() => {
      s = null, o(i);
    }, r - f)));
  }, () => i && o(i)];
}
const za = (e4, t, n = 3) => {
  let r = 0;
  const i = Q_(50, 250);
  return eO((s) => {
    const o = s.loaded, a = s.lengthComputable ? s.total : void 0, l = o - r, u = i(l), c = o <= a;
    r = o;
    const f = { loaded: o, total: a, progress: a ? o / a : void 0, bytes: l, rate: u || void 0, estimated: u && a && c ? (a - o) / u : void 0, event: s, lengthComputable: a != null, [t ? "download" : "upload"]: true };
    e4(f);
  }, n);
}, ay = (e4, t) => {
  const n = e4 != null;
  return [(r) => t[0]({ lengthComputable: n, total: e4, loaded: r }), t[1]];
}, ly = (e4) => (...t) => R.asap(() => e4(...t)), tO = jt.hasStandardBrowserEnv ? /* @__PURE__ */ ((e4, t) => (n) => (n = new URL(n, jt.origin), e4.protocol === n.protocol && e4.host === n.host && (t || e4.port === n.port)))(new URL(jt.origin), jt.navigator && /(msie|trident)/i.test(jt.navigator.userAgent)) : () => true, nO = jt.hasStandardBrowserEnv ? { write(e4, t, n, r, i, s) {
  const o = [e4 + "=" + encodeURIComponent(t)];
  R.isNumber(n) && o.push("expires=" + new Date(n).toGMTString()), R.isString(r) && o.push("path=" + r), R.isString(i) && o.push("domain=" + i), s === true && o.push("secure"), document.cookie = o.join("; ");
}, read(e4) {
  const t = document.cookie.match(new RegExp("(^|;\\s*)(" + e4 + ")=([^;]*)"));
  return t ? decodeURIComponent(t[3]) : null;
}, remove(e4) {
  this.write(e4, "", Date.now() - 864e5);
} } : { write() {
}, read() {
  return null;
}, remove() {
} };
function rO(e4) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e4);
}
function iO(e4, t) {
  return t ? e4.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e4;
}
function cy(e4, t, n) {
  let r = !rO(t);
  return e4 && (r || n == false) ? iO(e4, t) : t;
}
const uy = (e4) => e4 instanceof Yt ? { ...e4 } : e4;
function Kr(e4, t) {
  t = t || {};
  const n = {};
  function r(u, c, f, p) {
    return R.isPlainObject(u) && R.isPlainObject(c) ? R.merge.call({ caseless: p }, u, c) : R.isPlainObject(c) ? R.merge({}, c) : R.isArray(c) ? c.slice() : c;
  }
  function i(u, c, f, p) {
    if (R.isUndefined(c)) {
      if (!R.isUndefined(u)) return r(void 0, u, f, p);
    } else return r(u, c, f, p);
  }
  function s(u, c) {
    if (!R.isUndefined(c)) return r(void 0, c);
  }
  function o(u, c) {
    if (R.isUndefined(c)) {
      if (!R.isUndefined(u)) return r(void 0, u);
    } else return r(void 0, c);
  }
  function a(u, c, f) {
    if (f in t) return r(u, c);
    if (f in e4) return r(void 0, u);
  }
  const l = { url: s, method: s, data: s, baseURL: o, transformRequest: o, transformResponse: o, paramsSerializer: o, timeout: o, timeoutMessage: o, withCredentials: o, withXSRFToken: o, adapter: o, responseType: o, xsrfCookieName: o, xsrfHeaderName: o, onUploadProgress: o, onDownloadProgress: o, decompress: o, maxContentLength: o, maxBodyLength: o, beforeRedirect: o, transport: o, httpAgent: o, httpsAgent: o, cancelToken: o, socketPath: o, responseEncoding: o, validateStatus: a, headers: (u, c, f) => i(uy(u), uy(c), f, true) };
  return R.forEach(Object.keys({ ...e4, ...t }), function(c) {
    const f = l[c] || i, p = f(e4[c], t[c], c);
    R.isUndefined(p) && f !== a || (n[c] = p);
  }), n;
}
const dy = (e4) => {
  const t = Kr({}, e4);
  let { data: n, withXSRFToken: r, xsrfHeaderName: i, xsrfCookieName: s, headers: o, auth: a } = t;
  t.headers = o = Yt.from(o), t.url = ey(cy(t.baseURL, t.url, t.allowAbsoluteUrls), e4.params, e4.paramsSerializer), a && o.set("Authorization", "Basic " + btoa((a.username || "") + ":" + (a.password ? unescape(encodeURIComponent(a.password)) : "")));
  let l;
  if (R.isFormData(n)) {
    if (jt.hasStandardBrowserEnv || jt.hasStandardBrowserWebWorkerEnv) o.setContentType(void 0);
    else if ((l = o.getContentType()) !== false) {
      const [u, ...c] = l ? l.split(";").map((f) => f.trim()).filter(Boolean) : [];
      o.setContentType([u || "multipart/form-data", ...c].join("; "));
    }
  }
  if (jt.hasStandardBrowserEnv && (r && R.isFunction(r) && (r = r(t)), r || r !== false && tO(t.url))) {
    const u = i && s && nO.read(s);
    u && o.set(i, u);
  }
  return t;
}, sO = typeof XMLHttpRequest < "u", oO = sO && function(e4) {
  return new Promise(function(n, r) {
    const i = dy(e4);
    let s = i.data;
    const o = Yt.from(i.headers).normalize();
    let { responseType: a, onUploadProgress: l, onDownloadProgress: u } = i, c, f, p, v, m;
    function y() {
      v && v(), m && m(), i.cancelToken && i.cancelToken.unsubscribe(c), i.signal && i.signal.removeEventListener("abort", c);
    }
    let k = new XMLHttpRequest();
    k.open(i.method.toUpperCase(), i.url, true), k.timeout = i.timeout;
    function E() {
      if (!k) return;
      const C = Yt.from("getAllResponseHeaders" in k && k.getAllResponseHeaders()), F = { data: !a || a === "text" || a === "json" ? k.responseText : k.response, status: k.status, statusText: k.statusText, headers: C, config: e4, request: k };
      oy(function(U) {
        n(U), y();
      }, function(U) {
        r(U), y();
      }, F), k = null;
    }
    "onloadend" in k ? k.onloadend = E : k.onreadystatechange = function() {
      !k || k.readyState !== 4 || k.status === 0 && !(k.responseURL && k.responseURL.indexOf("file:") === 0) || setTimeout(E);
    }, k.onabort = function() {
      k && (r(new Te("Request aborted", Te.ECONNABORTED, e4, k)), k = null);
    }, k.onerror = function() {
      r(new Te("Network Error", Te.ERR_NETWORK, e4, k)), k = null;
    }, k.ontimeout = function() {
      let x = i.timeout ? "timeout of " + i.timeout + "ms exceeded" : "timeout exceeded";
      const F = i.transitional || ny;
      i.timeoutErrorMessage && (x = i.timeoutErrorMessage), r(new Te(x, F.clarifyTimeoutError ? Te.ETIMEDOUT : Te.ECONNABORTED, e4, k)), k = null;
    }, s === void 0 && o.setContentType(null), "setRequestHeader" in k && R.forEach(o.toJSON(), function(x, F) {
      k.setRequestHeader(F, x);
    }), R.isUndefined(i.withCredentials) || (k.withCredentials = !!i.withCredentials), a && a !== "json" && (k.responseType = i.responseType), u && ([p, m] = za(u, true), k.addEventListener("progress", p)), l && k.upload && ([f, v] = za(l), k.upload.addEventListener("progress", f), k.upload.addEventListener("loadend", v)), (i.cancelToken || i.signal) && (c = (C) => {
      k && (r(!C || C.type ? new Ii(null, e4, k) : C), k.abort(), k = null);
    }, i.cancelToken && i.cancelToken.subscribe(c), i.signal && (i.signal.aborted ? c() : i.signal.addEventListener("abort", c)));
    const A = J_(i.url);
    if (A && jt.protocols.indexOf(A) === -1) {
      r(new Te("Unsupported protocol " + A + ":", Te.ERR_BAD_REQUEST, e4));
      return;
    }
    k.send(s || null);
  });
}, aO = (e4, t) => {
  const { length: n } = e4 = e4 ? e4.filter(Boolean) : [];
  if (t || n) {
    let r = new AbortController(), i;
    const s = function(u) {
      if (!i) {
        i = true, a();
        const c = u instanceof Error ? u : this.reason;
        r.abort(c instanceof Te ? c : new Ii(c instanceof Error ? c.message : c));
      }
    };
    let o = t && setTimeout(() => {
      o = null, s(new Te(`timeout ${t} of ms exceeded`, Te.ETIMEDOUT));
    }, t);
    const a = () => {
      e4 && (o && clearTimeout(o), o = null, e4.forEach((u) => {
        u.unsubscribe ? u.unsubscribe(s) : u.removeEventListener("abort", s);
      }), e4 = null);
    };
    e4.forEach((u) => u.addEventListener("abort", s));
    const { signal: l } = r;
    return l.unsubscribe = () => R.asap(a), l;
  }
}, lO = function* (e4, t) {
  let n = e4.byteLength;
  if (n < t) {
    yield e4;
    return;
  }
  let r = 0, i;
  for (; r < n; ) i = r + t, yield e4.slice(r, i), r = i;
}, cO = async function* (e4, t) {
  for await (const n of uO(e4)) yield* lO(n, t);
}, uO = async function* (e4) {
  if (e4[Symbol.asyncIterator]) {
    yield* e4;
    return;
  }
  const t = e4.getReader();
  try {
    for (; ; ) {
      const { done: n, value: r } = await t.read();
      if (n) break;
      yield r;
    }
  } finally {
    await t.cancel();
  }
}, fy = (e4, t, n, r) => {
  const i = cO(e4, t);
  let s = 0, o, a = (l) => {
    o || (o = true, r && r(l));
  };
  return new ReadableStream({ async pull(l) {
    try {
      const { done: u, value: c } = await i.next();
      if (u) {
        a(), l.close();
        return;
      }
      let f = c.byteLength;
      if (n) {
        let p = s += f;
        n(p);
      }
      l.enqueue(new Uint8Array(c));
    } catch (u) {
      throw a(u), u;
    }
  }, cancel(l) {
    return a(l), i.return();
  } }, { highWaterMark: 2 });
}, $a = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", hy = $a && typeof ReadableStream == "function", dO = $a && (typeof TextEncoder == "function" ? /* @__PURE__ */ ((e4) => (t) => e4.encode(t))(new TextEncoder()) : async (e4) => new Uint8Array(await new Response(e4).arrayBuffer())), vy = (e4, ...t) => {
  try {
    return !!e4(...t);
  } catch {
    return false;
  }
}, fO = hy && vy(() => {
  let e4 = false;
  const t = new Request(jt.origin, { body: new ReadableStream(), method: "POST", get duplex() {
    return e4 = true, "half";
  } }).headers.has("Content-Type");
  return e4 && !t;
}), py = 64 * 1024, nd = hy && vy(() => R.isReadableStream(new Response("").body)), Ua = { stream: nd && ((e4) => e4.body) };
$a && ((e4) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((t) => {
    !Ua[t] && (Ua[t] = R.isFunction(e4[t]) ? (n) => n[t]() : (n, r) => {
      throw new Te(`Response type '${t}' is not supported`, Te.ERR_NOT_SUPPORT, r);
    });
  });
})(new Response());
const hO = async (e4) => {
  if (e4 == null) return 0;
  if (R.isBlob(e4)) return e4.size;
  if (R.isSpecCompliantForm(e4)) return (await new Request(jt.origin, { method: "POST", body: e4 }).arrayBuffer()).byteLength;
  if (R.isArrayBufferView(e4) || R.isArrayBuffer(e4)) return e4.byteLength;
  if (R.isURLSearchParams(e4) && (e4 = e4 + ""), R.isString(e4)) return (await dO(e4)).byteLength;
}, vO = async (e4, t) => {
  const n = R.toFiniteNumber(e4.getContentLength());
  return n ?? hO(t);
}, pO = $a && (async (e4) => {
  let { url: t, method: n, data: r, signal: i, cancelToken: s, timeout: o, onDownloadProgress: a, onUploadProgress: l, responseType: u, headers: c, withCredentials: f = "same-origin", fetchOptions: p } = dy(e4);
  u = u ? (u + "").toLowerCase() : "text";
  let v = aO([i, s && s.toAbortSignal()], o), m;
  const y = v && v.unsubscribe && (() => {
    v.unsubscribe();
  });
  let k;
  try {
    if (l && fO && n !== "get" && n !== "head" && (k = await vO(c, r)) !== 0) {
      let F = new Request(t, { method: "POST", body: r, duplex: "half" }), Y;
      if (R.isFormData(r) && (Y = F.headers.get("content-type")) && c.setContentType(Y), F.body) {
        const [U, V] = ay(k, za(ly(l)));
        r = fy(F.body, py, U, V);
      }
    }
    R.isString(f) || (f = f ? "include" : "omit");
    const E = "credentials" in Request.prototype;
    m = new Request(t, { ...p, signal: v, method: n.toUpperCase(), headers: c.normalize().toJSON(), body: r, duplex: "half", credentials: E ? f : void 0 });
    let A = await fetch(m, p);
    const C = nd && (u === "stream" || u === "response");
    if (nd && (a || C && y)) {
      const F = {};
      ["status", "statusText", "headers"].forEach((M) => {
        F[M] = A[M];
      });
      const Y = R.toFiniteNumber(A.headers.get("content-length")), [U, V] = a && ay(Y, za(ly(a), true)) || [];
      A = new Response(fy(A.body, py, U, () => {
        V && V(), y && y();
      }), F);
    }
    u = u || "text";
    let x = await Ua[R.findKey(Ua, u) || "text"](A, e4);
    return !C && y && y(), await new Promise((F, Y) => {
      oy(F, Y, { data: x, headers: Yt.from(A.headers), status: A.status, statusText: A.statusText, config: e4, request: m });
    });
  } catch (E) {
    throw y && y(), E && E.name === "TypeError" && /Load failed|fetch/i.test(E.message) ? Object.assign(new Te("Network Error", Te.ERR_NETWORK, e4, m), { cause: E.cause || E }) : Te.from(E, E && E.code, e4, m);
  }
}), rd = { http: P_, xhr: oO, fetch: pO };
R.forEach(rd, (e4, t) => {
  if (e4) {
    try {
      Object.defineProperty(e4, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e4, "adapterName", { value: t });
  }
});
const my = (e4) => `- ${e4}`, mO = (e4) => R.isFunction(e4) || e4 === null || e4 === false, gy = { getAdapter: (e4) => {
  e4 = R.isArray(e4) ? e4 : [e4];
  const { length: t } = e4;
  let n, r;
  const i = {};
  for (let s = 0; s < t; s++) {
    n = e4[s];
    let o;
    if (r = n, !mO(n) && (r = rd[(o = String(n)).toLowerCase()], r === void 0)) throw new Te(`Unknown adapter '${o}'`);
    if (r) break;
    i[o || "#" + s] = r;
  }
  if (!r) {
    const s = Object.entries(i).map(([a, l]) => `adapter ${a} ` + (l === false ? "is not supported by the environment" : "is not available in the build"));
    let o = t ? s.length > 1 ? `since :
` + s.map(my).join(`
`) : " " + my(s[0]) : "as no adapter specified";
    throw new Te("There is no suitable adapter to dispatch the request " + o, "ERR_NOT_SUPPORT");
  }
  return r;
}, adapters: rd };
function id(e4) {
  if (e4.cancelToken && e4.cancelToken.throwIfRequested(), e4.signal && e4.signal.aborted) throw new Ii(null, e4);
}
function yy(e4) {
  return id(e4), e4.headers = Yt.from(e4.headers), e4.data = td.call(e4, e4.transformRequest), ["post", "put", "patch"].indexOf(e4.method) !== -1 && e4.headers.setContentType("application/x-www-form-urlencoded", false), gy.getAdapter(e4.adapter || eo.adapter)(e4).then(function(r) {
    return id(e4), r.data = td.call(e4, e4.transformResponse, r), r.headers = Yt.from(r.headers), r;
  }, function(r) {
    return sy(r) || (id(e4), r && r.response && (r.response.data = td.call(e4, e4.transformResponse, r.response), r.response.headers = Yt.from(r.response.headers))), Promise.reject(r);
  });
}
const by = "1.11.0", Va = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e4, t) => {
  Va[e4] = function(r) {
    return typeof r === e4 || "a" + (t < 1 ? "n " : " ") + e4;
  };
});
const ky = {};
Va.transitional = function(t, n, r) {
  function i(s, o) {
    return "[Axios v" + by + "] Transitional option '" + s + "'" + o + (r ? ". " + r : "");
  }
  return (s, o, a) => {
    if (t === false) throw new Te(i(o, " has been removed" + (n ? " in " + n : "")), Te.ERR_DEPRECATED);
    return n && !ky[o] && (ky[o] = true, console.warn(i(o, " has been deprecated since v" + n + " and will be removed in the near future"))), t ? t(s, o, a) : true;
  };
}, Va.spelling = function(t) {
  return (n, r) => (console.warn(`${r} is likely a misspelling of ${t}`), true);
};
function gO(e4, t, n) {
  if (typeof e4 != "object") throw new Te("options must be an object", Te.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(e4);
  let i = r.length;
  for (; i-- > 0; ) {
    const s = r[i], o = t[s];
    if (o) {
      const a = e4[s], l = a === void 0 || o(a, s, e4);
      if (l !== true) throw new Te("option " + s + " must be " + l, Te.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== true) throw new Te("Unknown option " + s, Te.ERR_BAD_OPTION);
  }
}
const Ha = { assertOptions: gO, validators: Va }, Vn = Ha.validators;
let Yr = class {
  constructor(t) {
    this.defaults = t || {}, this.interceptors = { request: new ty(), response: new ty() };
  }
  async request(t, n) {
    try {
      return await this._request(t, n);
    } catch (r) {
      if (r instanceof Error) {
        let i = {};
        Error.captureStackTrace ? Error.captureStackTrace(i) : i = new Error();
        const s = i.stack ? i.stack.replace(/^.+\n/, "") : "";
        try {
          r.stack ? s && !String(r.stack).endsWith(s.replace(/^.+\n.+\n/, "")) && (r.stack += `
` + s) : r.stack = s;
        } catch {
        }
      }
      throw r;
    }
  }
  _request(t, n) {
    typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = Kr(this.defaults, n);
    const { transitional: r, paramsSerializer: i, headers: s } = n;
    r !== void 0 && Ha.assertOptions(r, { silentJSONParsing: Vn.transitional(Vn.boolean), forcedJSONParsing: Vn.transitional(Vn.boolean), clarifyTimeoutError: Vn.transitional(Vn.boolean) }, false), i != null && (R.isFunction(i) ? n.paramsSerializer = { serialize: i } : Ha.assertOptions(i, { encode: Vn.function, serialize: Vn.function }, true)), n.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? n.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : n.allowAbsoluteUrls = true), Ha.assertOptions(n, { baseUrl: Vn.spelling("baseURL"), withXsrfToken: Vn.spelling("withXSRFToken") }, true), n.method = (n.method || this.defaults.method || "get").toLowerCase();
    let o = s && R.merge(s.common, s[n.method]);
    s && R.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (m) => {
      delete s[m];
    }), n.headers = Yt.concat(o, s);
    const a = [];
    let l = true;
    this.interceptors.request.forEach(function(y) {
      typeof y.runWhen == "function" && y.runWhen(n) === false || (l = l && y.synchronous, a.unshift(y.fulfilled, y.rejected));
    });
    const u = [];
    this.interceptors.response.forEach(function(y) {
      u.push(y.fulfilled, y.rejected);
    });
    let c, f = 0, p;
    if (!l) {
      const m = [yy.bind(this), void 0];
      for (m.unshift(...a), m.push(...u), p = m.length, c = Promise.resolve(n); f < p; ) c = c.then(m[f++], m[f++]);
      return c;
    }
    p = a.length;
    let v = n;
    for (f = 0; f < p; ) {
      const m = a[f++], y = a[f++];
      try {
        v = m(v);
      } catch (k) {
        y.call(this, k);
        break;
      }
    }
    try {
      c = yy.call(this, v);
    } catch (m) {
      return Promise.reject(m);
    }
    for (f = 0, p = u.length; f < p; ) c = c.then(u[f++], u[f++]);
    return c;
  }
  getUri(t) {
    t = Kr(this.defaults, t);
    const n = cy(t.baseURL, t.url, t.allowAbsoluteUrls);
    return ey(n, t.params, t.paramsSerializer);
  }
};
R.forEach(["delete", "get", "head", "options"], function(t) {
  Yr.prototype[t] = function(n, r) {
    return this.request(Kr(r || {}, { method: t, url: n, data: (r || {}).data }));
  };
}), R.forEach(["post", "put", "patch"], function(t) {
  function n(r) {
    return function(s, o, a) {
      return this.request(Kr(a || {}, { method: t, headers: r ? { "Content-Type": "multipart/form-data" } : {}, url: s, data: o }));
    };
  }
  Yr.prototype[t] = n(), Yr.prototype[t + "Form"] = n(true);
});
let yO = class Ck {
  constructor(t) {
    if (typeof t != "function") throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function(s) {
      n = s;
    });
    const r = this;
    this.promise.then((i) => {
      if (!r._listeners) return;
      let s = r._listeners.length;
      for (; s-- > 0; ) r._listeners[s](i);
      r._listeners = null;
    }), this.promise.then = (i) => {
      let s;
      const o = new Promise((a) => {
        r.subscribe(a), s = a;
      }).then(i);
      return o.cancel = function() {
        r.unsubscribe(s);
      }, o;
    }, t(function(s, o, a) {
      r.reason || (r.reason = new Ii(s, o, a), n(r.reason));
    });
  }
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : this._listeners = [t];
  }
  unsubscribe(t) {
    if (!this._listeners) return;
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
  toAbortSignal() {
    const t = new AbortController(), n = (r) => {
      t.abort(r);
    };
    return this.subscribe(n), t.signal.unsubscribe = () => this.unsubscribe(n), t.signal;
  }
  static source() {
    let t;
    return { token: new Ck(function(i) {
      t = i;
    }), cancel: t };
  }
};
function bO(e4) {
  return function(n) {
    return e4.apply(null, n);
  };
}
function kO(e4) {
  return R.isObject(e4) && e4.isAxiosError === true;
}
const sd = { Continue: 100, SwitchingProtocols: 101, Processing: 102, EarlyHints: 103, Ok: 200, Created: 201, Accepted: 202, NonAuthoritativeInformation: 203, NoContent: 204, ResetContent: 205, PartialContent: 206, MultiStatus: 207, AlreadyReported: 208, ImUsed: 226, MultipleChoices: 300, MovedPermanently: 301, Found: 302, SeeOther: 303, NotModified: 304, UseProxy: 305, Unused: 306, TemporaryRedirect: 307, PermanentRedirect: 308, BadRequest: 400, Unauthorized: 401, PaymentRequired: 402, Forbidden: 403, NotFound: 404, MethodNotAllowed: 405, NotAcceptable: 406, ProxyAuthenticationRequired: 407, RequestTimeout: 408, Conflict: 409, Gone: 410, LengthRequired: 411, PreconditionFailed: 412, PayloadTooLarge: 413, UriTooLong: 414, UnsupportedMediaType: 415, RangeNotSatisfiable: 416, ExpectationFailed: 417, ImATeapot: 418, MisdirectedRequest: 421, UnprocessableEntity: 422, Locked: 423, FailedDependency: 424, TooEarly: 425, UpgradeRequired: 426, PreconditionRequired: 428, TooManyRequests: 429, RequestHeaderFieldsTooLarge: 431, UnavailableForLegalReasons: 451, InternalServerError: 500, NotImplemented: 501, BadGateway: 502, ServiceUnavailable: 503, GatewayTimeout: 504, HttpVersionNotSupported: 505, VariantAlsoNegotiates: 506, InsufficientStorage: 507, LoopDetected: 508, NotExtended: 510, NetworkAuthenticationRequired: 511 };
Object.entries(sd).forEach(([e4, t]) => {
  sd[t] = e4;
});
function wy(e4) {
  const t = new Yr(e4), n = Bg(Yr.prototype.request, t);
  return R.extend(n, Yr.prototype, t, { allOwnKeys: true }), R.extend(n, t, null, { allOwnKeys: true }), n.create = function(i) {
    return wy(Kr(e4, i));
  }, n;
}
const it = wy(eo);
it.Axios = Yr, it.CanceledError = Ii, it.CancelToken = yO, it.isCancel = sy, it.VERSION = by, it.toFormData = Da, it.AxiosError = Te, it.Cancel = it.CanceledError, it.all = function(t) {
  return Promise.all(t);
}, it.spread = bO, it.isAxiosError = kO, it.mergeConfig = Kr, it.AxiosHeaders = Yt, it.formToJSON = (e4) => ry(R.isHTMLForm(e4) ? new FormData(e4) : e4), it.getAdapter = gy.getAdapter, it.HttpStatusCode = sd, it.default = it;
const { Axios: rM, AxiosError: iM, CanceledError: sM, isCancel: oM, CancelToken: aM, VERSION: lM, all: cM, Cancel: uM, isAxiosError: dM, spread: fM, toFormData: hM, AxiosHeaders: vM, HttpStatusCode: pM, formToJSON: mM, getAdapter: gM, mergeConfig: yM } = it, Sy = Symbol("csrf-retry"), wO = (e4) => async (t) => {
  var n;
  const { config: r, response: i, request: s } = t, o = s?.responseURL;
  if (i?.status === 412 && ((n = i?.data) == null ? void 0 : n.message) === "CSRF check failed" && r[Sy] === void 0) {
    console.warn("Request to ".concat(o, " failed because of a CSRF mismatch. Fetching a new token"));
    const { data: { token: l } } = await e4.get(ua("/csrftoken"));
    return console.debug("New request token ".concat(l, " fetched")), e4.defaults.headers.requesttoken = l, e4({ ...r, headers: { ...r.headers, requesttoken: l }, [Sy]: true });
  }
  return Promise.reject(t);
}, qa = Symbol("retryDelay"), SO = (e4) => async (t) => {
  var n;
  const { config: r, response: i, request: s } = t, o = s?.responseURL, a = i?.status, l = i?.headers;
  if (a === 503 && l["x-nextcloud-maintenance-mode"] === "1" && r.retryIfMaintenanceMode && (!r[qa] || r[qa] <= 32)) {
    const u = ((n = r[qa]) != null ? n : 1) * 2;
    return console.warn("Request to ".concat(o, " failed because of maintenance mode. Retrying in ").concat(u, "s")), await new Promise((c) => {
      setTimeout(c, u * 1e3);
    }), e4({ ...r, [qa]: u });
  }
  return Promise.reject(t);
}, EO = async (e4) => {
  var t;
  const { config: n, response: r, request: i } = e4, s = i?.responseURL;
  return r?.status === 401 && ((t = r?.data) == null ? void 0 : t.message) === "Current user is not logged in" && n.reloadExpiredSession && window?.location && (console.error("Request to ".concat(s, " failed because the user session expired. Reloading the page …")), window.location.reload()), Promise.reject(e4);
};
var Ey;
const Ay = it.create({ headers: { requesttoken: (Ey = fA()) != null ? Ey : "", "X-Requested-With": "XMLHttpRequest" } }), or = Object.assign(Ay, { CancelToken: it.CancelToken, isCancel: it.isCancel });
or.interceptors.response.use((e4) => e4, wO(or)), or.interceptors.response.use((e4) => e4, SO(or)), or.interceptors.response.use((e4) => e4, EO), hA((e4) => {
  Ay.defaults.headers.requesttoken = e4;
});
class Xr extends Error {
}
class AO extends Xr {
  constructor(t) {
    super(`Invalid DateTime: ${t.toMessage()}`);
  }
}
class TO extends Xr {
  constructor(t) {
    super(`Invalid Interval: ${t.toMessage()}`);
  }
}
class NO extends Xr {
  constructor(t) {
    super(`Invalid Duration: ${t.toMessage()}`);
  }
}
class Li extends Xr {
}
class Ty extends Xr {
  constructor(t) {
    super(`Invalid unit ${t}`);
  }
}
class It extends Xr {
}
class Or extends Xr {
  constructor() {
    super("Zone is an abstract class");
  }
}
const ie = "numeric", An = "short", Qt = "long", Wa = { year: ie, month: ie, day: ie }, Ny = { year: ie, month: An, day: ie }, CO = { year: ie, month: An, day: ie, weekday: An }, Cy = { year: ie, month: Qt, day: ie }, _y = { year: ie, month: Qt, day: ie, weekday: Qt }, Oy = { hour: ie, minute: ie }, Py = { hour: ie, minute: ie, second: ie }, xy = { hour: ie, minute: ie, second: ie, timeZoneName: An }, Ry = { hour: ie, minute: ie, second: ie, timeZoneName: Qt }, My = { hour: ie, minute: ie, hourCycle: "h23" }, jy = { hour: ie, minute: ie, second: ie, hourCycle: "h23" }, Iy = { hour: ie, minute: ie, second: ie, hourCycle: "h23", timeZoneName: An }, Ly = { hour: ie, minute: ie, second: ie, hourCycle: "h23", timeZoneName: Qt }, Fy = { year: ie, month: ie, day: ie, hour: ie, minute: ie }, Dy = { year: ie, month: ie, day: ie, hour: ie, minute: ie, second: ie }, By = { year: ie, month: An, day: ie, hour: ie, minute: ie }, zy = { year: ie, month: An, day: ie, hour: ie, minute: ie, second: ie }, _O = { year: ie, month: An, day: ie, weekday: An, hour: ie, minute: ie }, $y = { year: ie, month: Qt, day: ie, hour: ie, minute: ie, timeZoneName: An }, Uy = { year: ie, month: Qt, day: ie, hour: ie, minute: ie, second: ie, timeZoneName: An }, Vy = { year: ie, month: Qt, day: ie, weekday: Qt, hour: ie, minute: ie, timeZoneName: Qt }, Hy = { year: ie, month: Qt, day: ie, weekday: Qt, hour: ie, minute: ie, second: ie, timeZoneName: Qt };
class no {
  get type() {
    throw new Or();
  }
  get name() {
    throw new Or();
  }
  get ianaName() {
    return this.name;
  }
  get isUniversal() {
    throw new Or();
  }
  offsetName(t, n) {
    throw new Or();
  }
  formatOffset(t, n) {
    throw new Or();
  }
  offset(t) {
    throw new Or();
  }
  equals(t) {
    throw new Or();
  }
  get isValid() {
    throw new Or();
  }
}
let od = null;
class vl extends no {
  static get instance() {
    return od === null && (od = new vl()), od;
  }
  get type() {
    return "system";
  }
  get name() {
    return new Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
  get isUniversal() {
    return false;
  }
  offsetName(t, { format: n, locale: r }) {
    return mb(t, n, r);
  }
  formatOffset(t, n) {
    return oo(this.offset(t), n);
  }
  offset(t) {
    return -new Date(t).getTimezoneOffset();
  }
  equals(t) {
    return t.type === "system";
  }
  get isValid() {
    return true;
  }
}
const ad = /* @__PURE__ */ new Map();
function OO(e4) {
  let t = ad.get(e4);
  return t === void 0 && (t = new Intl.DateTimeFormat("en-US", { hour12: false, timeZone: e4, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", era: "short" }), ad.set(e4, t)), t;
}
const PO = { year: 0, month: 1, day: 2, era: 3, hour: 4, minute: 5, second: 6 };
function xO(e4, t) {
  const n = e4.format(t).replace(/\u200E/g, ""), r = /(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(n), [, i, s, o, a, l, u, c] = r;
  return [o, i, s, a, l, u, c];
}
function RO(e4, t) {
  const n = e4.formatToParts(t), r = [];
  for (let i = 0; i < n.length; i++) {
    const { type: s, value: o } = n[i], a = PO[s];
    s === "era" ? r[a] = o : be(a) || (r[a] = parseInt(o, 10));
  }
  return r;
}
const ld = /* @__PURE__ */ new Map();
class lr extends no {
  static create(t) {
    let n = ld.get(t);
    return n === void 0 && ld.set(t, n = new lr(t)), n;
  }
  static resetCache() {
    ld.clear(), ad.clear();
  }
  static isValidSpecifier(t) {
    return this.isValidZone(t);
  }
  static isValidZone(t) {
    if (!t) return false;
    try {
      return new Intl.DateTimeFormat("en-US", { timeZone: t }).format(), true;
    } catch {
      return false;
    }
  }
  constructor(t) {
    super(), this.zoneName = t, this.valid = lr.isValidZone(t);
  }
  get type() {
    return "iana";
  }
  get name() {
    return this.zoneName;
  }
  get isUniversal() {
    return false;
  }
  offsetName(t, { format: n, locale: r }) {
    return mb(t, n, r, this.name);
  }
  formatOffset(t, n) {
    return oo(this.offset(t), n);
  }
  offset(t) {
    if (!this.valid) return NaN;
    const n = new Date(t);
    if (isNaN(n)) return NaN;
    const r = OO(this.name);
    let [i, s, o, a, l, u, c] = r.formatToParts ? RO(r, n) : xO(r, n);
    a === "BC" && (i = -Math.abs(i) + 1);
    const p = Xa({ year: i, month: s, day: o, hour: l === 24 ? 0 : l, minute: u, second: c, millisecond: 0 });
    let v = +n;
    const m = v % 1e3;
    return v -= m >= 0 ? m : 1e3 + m, (p - v) / (60 * 1e3);
  }
  equals(t) {
    return t.type === "iana" && t.name === this.name;
  }
  get isValid() {
    return this.valid;
  }
}
let qy = {};
function MO(e4, t = {}) {
  const n = JSON.stringify([e4, t]);
  let r = qy[n];
  return r || (r = new Intl.ListFormat(e4, t), qy[n] = r), r;
}
const cd = /* @__PURE__ */ new Map();
function ud(e4, t = {}) {
  const n = JSON.stringify([e4, t]);
  let r = cd.get(n);
  return r === void 0 && (r = new Intl.DateTimeFormat(e4, t), cd.set(n, r)), r;
}
const dd = /* @__PURE__ */ new Map();
function jO(e4, t = {}) {
  const n = JSON.stringify([e4, t]);
  let r = dd.get(n);
  return r === void 0 && (r = new Intl.NumberFormat(e4, t), dd.set(n, r)), r;
}
const fd = /* @__PURE__ */ new Map();
function IO(e4, t = {}) {
  const { base: n, ...r } = t, i = JSON.stringify([e4, r]);
  let s = fd.get(i);
  return s === void 0 && (s = new Intl.RelativeTimeFormat(e4, t), fd.set(i, s)), s;
}
let ro = null;
function LO() {
  return ro || (ro = new Intl.DateTimeFormat().resolvedOptions().locale, ro);
}
const hd = /* @__PURE__ */ new Map();
function Wy(e4) {
  let t = hd.get(e4);
  return t === void 0 && (t = new Intl.DateTimeFormat(e4).resolvedOptions(), hd.set(e4, t)), t;
}
const vd = /* @__PURE__ */ new Map();
function FO(e4) {
  let t = vd.get(e4);
  if (!t) {
    const n = new Intl.Locale(e4);
    t = "getWeekInfo" in n ? n.getWeekInfo() : n.weekInfo, "minimalDays" in t || (t = { ...Gy, ...t }), vd.set(e4, t);
  }
  return t;
}
function DO(e4) {
  const t = e4.indexOf("-x-");
  t !== -1 && (e4 = e4.substring(0, t));
  const n = e4.indexOf("-u-");
  if (n === -1) return [e4];
  {
    let r, i;
    try {
      r = ud(e4).resolvedOptions(), i = e4;
    } catch {
      const l = e4.substring(0, n);
      r = ud(l).resolvedOptions(), i = l;
    }
    const { numberingSystem: s, calendar: o } = r;
    return [i, s, o];
  }
}
function BO(e4, t, n) {
  return (n || t) && (e4.includes("-u-") || (e4 += "-u"), n && (e4 += `-ca-${n}`), t && (e4 += `-nu-${t}`)), e4;
}
function zO(e4) {
  const t = [];
  for (let n = 1; n <= 12; n++) {
    const r = we.utc(2009, n, 1);
    t.push(e4(r));
  }
  return t;
}
function $O(e4) {
  const t = [];
  for (let n = 1; n <= 7; n++) {
    const r = we.utc(2016, 11, 13 + n);
    t.push(e4(r));
  }
  return t;
}
function Ga(e4, t, n, r) {
  const i = e4.listingMode();
  return i === "error" ? null : i === "en" ? n(t) : r(t);
}
function UO(e4) {
  return e4.numberingSystem && e4.numberingSystem !== "latn" ? false : e4.numberingSystem === "latn" || !e4.locale || e4.locale.startsWith("en") || Wy(e4.locale).numberingSystem === "latn";
}
class VO {
  constructor(t, n, r) {
    this.padTo = r.padTo || 0, this.floor = r.floor || false;
    const { padTo: i, floor: s, ...o } = r;
    if (!n || Object.keys(o).length > 0) {
      const a = { useGrouping: false, ...r };
      r.padTo > 0 && (a.minimumIntegerDigits = r.padTo), this.inf = jO(t, a);
    }
  }
  format(t) {
    if (this.inf) {
      const n = this.floor ? Math.floor(t) : t;
      return this.inf.format(n);
    } else {
      const n = this.floor ? Math.floor(t) : Ed(t, 3);
      return pt(n, this.padTo);
    }
  }
}
class HO {
  constructor(t, n, r) {
    this.opts = r, this.originalZone = void 0;
    let i;
    if (this.opts.timeZone) this.dt = t;
    else if (t.zone.type === "fixed") {
      const o = -1 * (t.offset / 60), a = o >= 0 ? `Etc/GMT+${o}` : `Etc/GMT${o}`;
      t.offset !== 0 && lr.create(a).valid ? (i = a, this.dt = t) : (i = "UTC", this.dt = t.offset === 0 ? t : t.setZone("UTC").plus({ minutes: t.offset }), this.originalZone = t.zone);
    } else t.zone.type === "system" ? this.dt = t : t.zone.type === "iana" ? (this.dt = t, i = t.zone.name) : (i = "UTC", this.dt = t.setZone("UTC").plus({ minutes: t.offset }), this.originalZone = t.zone);
    const s = { ...this.opts };
    s.timeZone = s.timeZone || i, this.dtf = ud(n, s);
  }
  format() {
    return this.originalZone ? this.formatToParts().map(({ value: t }) => t).join("") : this.dtf.format(this.dt.toJSDate());
  }
  formatToParts() {
    const t = this.dtf.formatToParts(this.dt.toJSDate());
    return this.originalZone ? t.map((n) => {
      if (n.type === "timeZoneName") {
        const r = this.originalZone.offsetName(this.dt.ts, { locale: this.dt.locale, format: this.opts.timeZoneName });
        return { ...n, value: r };
      } else return n;
    }) : t;
  }
  resolvedOptions() {
    return this.dtf.resolvedOptions();
  }
}
class qO {
  constructor(t, n, r) {
    this.opts = { style: "long", ...r }, !n && fb() && (this.rtf = IO(t, r));
  }
  format(t, n) {
    return this.rtf ? this.rtf.format(t, n) : hP(n, t, this.opts.numeric, this.opts.style !== "long");
  }
  formatToParts(t, n) {
    return this.rtf ? this.rtf.formatToParts(t, n) : [];
  }
}
const Gy = { firstDay: 1, minimalDays: 4, weekend: [6, 7] };
class Ue {
  static fromOpts(t) {
    return Ue.create(t.locale, t.numberingSystem, t.outputCalendar, t.weekSettings, t.defaultToEN);
  }
  static create(t, n, r, i, s = false) {
    const o = t || st.defaultLocale, a = o || (s ? "en-US" : LO()), l = n || st.defaultNumberingSystem, u = r || st.defaultOutputCalendar, c = wd(i) || st.defaultWeekSettings;
    return new Ue(a, l, u, c, o);
  }
  static resetCache() {
    ro = null, cd.clear(), dd.clear(), fd.clear(), hd.clear(), vd.clear();
  }
  static fromObject({ locale: t, numberingSystem: n, outputCalendar: r, weekSettings: i } = {}) {
    return Ue.create(t, n, r, i);
  }
  constructor(t, n, r, i, s) {
    const [o, a, l] = DO(t);
    this.locale = o, this.numberingSystem = n || a || null, this.outputCalendar = r || l || null, this.weekSettings = i, this.intl = BO(this.locale, this.numberingSystem, this.outputCalendar), this.weekdaysCache = { format: {}, standalone: {} }, this.monthsCache = { format: {}, standalone: {} }, this.meridiemCache = null, this.eraCache = {}, this.specifiedLocale = s, this.fastNumbersCached = null;
  }
  get fastNumbers() {
    return this.fastNumbersCached == null && (this.fastNumbersCached = UO(this)), this.fastNumbersCached;
  }
  listingMode() {
    const t = this.isEnglish(), n = (this.numberingSystem === null || this.numberingSystem === "latn") && (this.outputCalendar === null || this.outputCalendar === "gregory");
    return t && n ? "en" : "intl";
  }
  clone(t) {
    return !t || Object.getOwnPropertyNames(t).length === 0 ? this : Ue.create(t.locale || this.specifiedLocale, t.numberingSystem || this.numberingSystem, t.outputCalendar || this.outputCalendar, wd(t.weekSettings) || this.weekSettings, t.defaultToEN || false);
  }
  redefaultToEN(t = {}) {
    return this.clone({ ...t, defaultToEN: true });
  }
  redefaultToSystem(t = {}) {
    return this.clone({ ...t, defaultToEN: false });
  }
  months(t, n = false) {
    return Ga(this, t, bb, () => {
      const r = this.intl === "ja" || this.intl.startsWith("ja-");
      n &= !r;
      const i = n ? { month: t, day: "numeric" } : { month: t }, s = n ? "format" : "standalone";
      if (!this.monthsCache[s][t]) {
        const o = r ? (a) => this.dtFormatter(a, i).format() : (a) => this.extract(a, i, "month");
        this.monthsCache[s][t] = zO(o);
      }
      return this.monthsCache[s][t];
    });
  }
  weekdays(t, n = false) {
    return Ga(this, t, Sb, () => {
      const r = n ? { weekday: t, year: "numeric", month: "long", day: "numeric" } : { weekday: t }, i = n ? "format" : "standalone";
      return this.weekdaysCache[i][t] || (this.weekdaysCache[i][t] = $O((s) => this.extract(s, r, "weekday"))), this.weekdaysCache[i][t];
    });
  }
  meridiems() {
    return Ga(this, void 0, () => Eb, () => {
      if (!this.meridiemCache) {
        const t = { hour: "numeric", hourCycle: "h12" };
        this.meridiemCache = [we.utc(2016, 11, 13, 9), we.utc(2016, 11, 13, 19)].map((n) => this.extract(n, t, "dayperiod"));
      }
      return this.meridiemCache;
    });
  }
  eras(t) {
    return Ga(this, t, Ab, () => {
      const n = { era: t };
      return this.eraCache[t] || (this.eraCache[t] = [we.utc(-40, 1, 1), we.utc(2017, 1, 1)].map((r) => this.extract(r, n, "era"))), this.eraCache[t];
    });
  }
  extract(t, n, r) {
    const i = this.dtFormatter(t, n), s = i.formatToParts(), o = s.find((a) => a.type.toLowerCase() === r);
    return o ? o.value : null;
  }
  numberFormatter(t = {}) {
    return new VO(this.intl, t.forceSimple || this.fastNumbers, t);
  }
  dtFormatter(t, n = {}) {
    return new HO(t, this.intl, n);
  }
  relFormatter(t = {}) {
    return new qO(this.intl, this.isEnglish(), t);
  }
  listFormatter(t = {}) {
    return MO(this.intl, t);
  }
  isEnglish() {
    return this.locale === "en" || this.locale.toLowerCase() === "en-us" || Wy(this.intl).locale.startsWith("en-us");
  }
  getWeekSettings() {
    return this.weekSettings ? this.weekSettings : hb() ? FO(this.locale) : Gy;
  }
  getStartOfWeek() {
    return this.getWeekSettings().firstDay;
  }
  getMinDaysInFirstWeek() {
    return this.getWeekSettings().minimalDays;
  }
  getWeekendDays() {
    return this.getWeekSettings().weekend;
  }
  equals(t) {
    return this.locale === t.locale && this.numberingSystem === t.numberingSystem && this.outputCalendar === t.outputCalendar;
  }
  toString() {
    return `Locale(${this.locale}, ${this.numberingSystem}, ${this.outputCalendar})`;
  }
}
let pd = null;
class Ht extends no {
  static get utcInstance() {
    return pd === null && (pd = new Ht(0)), pd;
  }
  static instance(t) {
    return t === 0 ? Ht.utcInstance : new Ht(t);
  }
  static parseSpecifier(t) {
    if (t) {
      const n = t.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);
      if (n) return new Ht(Ja(n[1], n[2]));
    }
    return null;
  }
  constructor(t) {
    super(), this.fixed = t;
  }
  get type() {
    return "fixed";
  }
  get name() {
    return this.fixed === 0 ? "UTC" : `UTC${oo(this.fixed, "narrow")}`;
  }
  get ianaName() {
    return this.fixed === 0 ? "Etc/UTC" : `Etc/GMT${oo(-this.fixed, "narrow")}`;
  }
  offsetName() {
    return this.name;
  }
  formatOffset(t, n) {
    return oo(this.fixed, n);
  }
  get isUniversal() {
    return true;
  }
  offset() {
    return this.fixed;
  }
  equals(t) {
    return t.type === "fixed" && t.fixed === this.fixed;
  }
  get isValid() {
    return true;
  }
}
class WO extends no {
  constructor(t) {
    super(), this.zoneName = t;
  }
  get type() {
    return "invalid";
  }
  get name() {
    return this.zoneName;
  }
  get isUniversal() {
    return false;
  }
  offsetName() {
    return null;
  }
  formatOffset() {
    return "";
  }
  offset() {
    return NaN;
  }
  equals() {
    return false;
  }
  get isValid() {
    return false;
  }
}
function Pr(e4, t) {
  if (be(e4) || e4 === null) return t;
  if (e4 instanceof no) return e4;
  if (JO(e4)) {
    const n = e4.toLowerCase();
    return n === "default" ? t : n === "local" || n === "system" ? vl.instance : n === "utc" || n === "gmt" ? Ht.utcInstance : Ht.parseSpecifier(n) || lr.create(e4);
  } else return xr(e4) ? Ht.instance(e4) : typeof e4 == "object" && "offset" in e4 && typeof e4.offset == "function" ? e4 : new WO(e4);
}
const md = { arab: "[٠-٩]", arabext: "[۰-۹]", bali: "[᭐-᭙]", beng: "[০-৯]", deva: "[०-९]", fullwide: "[０-９]", gujr: "[૦-૯]", hanidec: "[〇|一|二|三|四|五|六|七|八|九]", khmr: "[០-៩]", knda: "[೦-೯]", laoo: "[໐-໙]", limb: "[᥆-᥏]", mlym: "[൦-൯]", mong: "[᠐-᠙]", mymr: "[၀-၉]", orya: "[୦-୯]", tamldec: "[௦-௯]", telu: "[౦-౯]", thai: "[๐-๙]", tibt: "[༠-༩]", latn: "\\d" }, Zy = { arab: [1632, 1641], arabext: [1776, 1785], bali: [6992, 7001], beng: [2534, 2543], deva: [2406, 2415], fullwide: [65296, 65303], gujr: [2790, 2799], khmr: [6112, 6121], knda: [3302, 3311], laoo: [3792, 3801], limb: [6470, 6479], mlym: [3430, 3439], mong: [6160, 6169], mymr: [4160, 4169], orya: [2918, 2927], tamldec: [3046, 3055], telu: [3174, 3183], thai: [3664, 3673], tibt: [3872, 3881] }, GO = md.hanidec.replace(/[\[|\]]/g, "").split("");
function ZO(e4) {
  let t = parseInt(e4, 10);
  if (isNaN(t)) {
    t = "";
    for (let n = 0; n < e4.length; n++) {
      const r = e4.charCodeAt(n);
      if (e4[n].search(md.hanidec) !== -1) t += GO.indexOf(e4[n]);
      else for (const i in Zy) {
        const [s, o] = Zy[i];
        r >= s && r <= o && (t += r - s);
      }
    }
    return parseInt(t, 10);
  } else return t;
}
const gd = /* @__PURE__ */ new Map();
function KO() {
  gd.clear();
}
function Tn({ numberingSystem: e4 }, t = "") {
  const n = e4 || "latn";
  let r = gd.get(n);
  r === void 0 && (r = /* @__PURE__ */ new Map(), gd.set(n, r));
  let i = r.get(t);
  return i === void 0 && (i = new RegExp(`${md[n]}${t}`), r.set(t, i)), i;
}
let Ky = () => Date.now(), Yy = "system", Xy = null, Jy = null, Qy = null, eb = 60, tb, nb = null;
class st {
  static get now() {
    return Ky;
  }
  static set now(t) {
    Ky = t;
  }
  static set defaultZone(t) {
    Yy = t;
  }
  static get defaultZone() {
    return Pr(Yy, vl.instance);
  }
  static get defaultLocale() {
    return Xy;
  }
  static set defaultLocale(t) {
    Xy = t;
  }
  static get defaultNumberingSystem() {
    return Jy;
  }
  static set defaultNumberingSystem(t) {
    Jy = t;
  }
  static get defaultOutputCalendar() {
    return Qy;
  }
  static set defaultOutputCalendar(t) {
    Qy = t;
  }
  static get defaultWeekSettings() {
    return nb;
  }
  static set defaultWeekSettings(t) {
    nb = wd(t);
  }
  static get twoDigitCutoffYear() {
    return eb;
  }
  static set twoDigitCutoffYear(t) {
    eb = t % 100;
  }
  static get throwOnInvalid() {
    return tb;
  }
  static set throwOnInvalid(t) {
    tb = t;
  }
  static resetCaches() {
    Ue.resetCache(), lr.resetCache(), we.resetCache(), KO();
  }
}
class Nn {
  constructor(t, n) {
    this.reason = t, this.explanation = n;
  }
  toMessage() {
    return this.explanation ? `${this.reason}: ${this.explanation}` : this.reason;
  }
}
const rb = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], ib = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
function un(e4, t) {
  return new Nn("unit out of range", `you specified ${t} (of type ${typeof t}) as a ${e4}, which is invalid`);
}
function yd(e4, t, n) {
  const r = new Date(Date.UTC(e4, t - 1, n));
  e4 < 100 && e4 >= 0 && r.setUTCFullYear(r.getUTCFullYear() - 1900);
  const i = r.getUTCDay();
  return i === 0 ? 7 : i;
}
function sb(e4, t, n) {
  return n + (io(e4) ? ib : rb)[t - 1];
}
function ob(e4, t) {
  const n = io(e4) ? ib : rb, r = n.findIndex((s) => s < t), i = t - n[r];
  return { month: r + 1, day: i };
}
function bd(e4, t) {
  return (e4 - t + 7) % 7 + 1;
}
function Za(e4, t = 4, n = 1) {
  const { year: r, month: i, day: s } = e4, o = sb(r, i, s), a = bd(yd(r, i, s), n);
  let l = Math.floor((o - a + 14 - t) / 7), u;
  return l < 1 ? (u = r - 1, l = so(u, t, n)) : l > so(r, t, n) ? (u = r + 1, l = 1) : u = r, { weekYear: u, weekNumber: l, weekday: a, ...el(e4) };
}
function ab(e4, t = 4, n = 1) {
  const { weekYear: r, weekNumber: i, weekday: s } = e4, o = bd(yd(r, 1, t), n), a = Di(r);
  let l = i * 7 + s - o - 7 + t, u;
  l < 1 ? (u = r - 1, l += Di(u)) : l > a ? (u = r + 1, l -= Di(r)) : u = r;
  const { month: c, day: f } = ob(u, l);
  return { year: u, month: c, day: f, ...el(e4) };
}
function kd(e4) {
  const { year: t, month: n, day: r } = e4, i = sb(t, n, r);
  return { year: t, ordinal: i, ...el(e4) };
}
function lb(e4) {
  const { year: t, ordinal: n } = e4, { month: r, day: i } = ob(t, n);
  return { year: t, month: r, day: i, ...el(e4) };
}
function cb(e4, t) {
  if (!be(e4.localWeekday) || !be(e4.localWeekNumber) || !be(e4.localWeekYear)) {
    if (!be(e4.weekday) || !be(e4.weekNumber) || !be(e4.weekYear)) throw new Li("Cannot mix locale-based week fields with ISO-based week fields");
    return be(e4.localWeekday) || (e4.weekday = e4.localWeekday), be(e4.localWeekNumber) || (e4.weekNumber = e4.localWeekNumber), be(e4.localWeekYear) || (e4.weekYear = e4.localWeekYear), delete e4.localWeekday, delete e4.localWeekNumber, delete e4.localWeekYear, { minDaysInFirstWeek: t.getMinDaysInFirstWeek(), startOfWeek: t.getStartOfWeek() };
  } else return { minDaysInFirstWeek: 4, startOfWeek: 1 };
}
function YO(e4, t = 4, n = 1) {
  const r = Ka(e4.weekYear), i = dn(e4.weekNumber, 1, so(e4.weekYear, t, n)), s = dn(e4.weekday, 1, 7);
  return r ? i ? s ? false : un("weekday", e4.weekday) : un("week", e4.weekNumber) : un("weekYear", e4.weekYear);
}
function XO(e4) {
  const t = Ka(e4.year), n = dn(e4.ordinal, 1, Di(e4.year));
  return t ? n ? false : un("ordinal", e4.ordinal) : un("year", e4.year);
}
function ub(e4) {
  const t = Ka(e4.year), n = dn(e4.month, 1, 12), r = dn(e4.day, 1, Ya(e4.year, e4.month));
  return t ? n ? r ? false : un("day", e4.day) : un("month", e4.month) : un("year", e4.year);
}
function db(e4) {
  const { hour: t, minute: n, second: r, millisecond: i } = e4, s = dn(t, 0, 23) || t === 24 && n === 0 && r === 0 && i === 0, o = dn(n, 0, 59), a = dn(r, 0, 59), l = dn(i, 0, 999);
  return s ? o ? a ? l ? false : un("millisecond", i) : un("second", r) : un("minute", n) : un("hour", t);
}
function be(e4) {
  return typeof e4 > "u";
}
function xr(e4) {
  return typeof e4 == "number";
}
function Ka(e4) {
  return typeof e4 == "number" && e4 % 1 === 0;
}
function JO(e4) {
  return typeof e4 == "string";
}
function QO(e4) {
  return Object.prototype.toString.call(e4) === "[object Date]";
}
function fb() {
  try {
    return typeof Intl < "u" && !!Intl.RelativeTimeFormat;
  } catch {
    return false;
  }
}
function hb() {
  try {
    return typeof Intl < "u" && !!Intl.Locale && ("weekInfo" in Intl.Locale.prototype || "getWeekInfo" in Intl.Locale.prototype);
  } catch {
    return false;
  }
}
function eP(e4) {
  return Array.isArray(e4) ? e4 : [e4];
}
function vb(e4, t, n) {
  if (e4.length !== 0) return e4.reduce((r, i) => {
    const s = [t(i), i];
    return r && n(r[0], s[0]) === r[0] ? r : s;
  }, null)[1];
}
function tP(e4, t) {
  return t.reduce((n, r) => (n[r] = e4[r], n), {});
}
function Fi(e4, t) {
  return Object.prototype.hasOwnProperty.call(e4, t);
}
function wd(e4) {
  if (e4 == null) return null;
  if (typeof e4 != "object") throw new It("Week settings must be an object");
  if (!dn(e4.firstDay, 1, 7) || !dn(e4.minimalDays, 1, 7) || !Array.isArray(e4.weekend) || e4.weekend.some((t) => !dn(t, 1, 7))) throw new It("Invalid week settings");
  return { firstDay: e4.firstDay, minimalDays: e4.minimalDays, weekend: Array.from(e4.weekend) };
}
function dn(e4, t, n) {
  return Ka(e4) && e4 >= t && e4 <= n;
}
function nP(e4, t) {
  return e4 - t * Math.floor(e4 / t);
}
function pt(e4, t = 2) {
  const n = e4 < 0;
  let r;
  return n ? r = "-" + ("" + -e4).padStart(t, "0") : r = ("" + e4).padStart(t, "0"), r;
}
function Rr(e4) {
  if (!(be(e4) || e4 === null || e4 === "")) return parseInt(e4, 10);
}
function Jr(e4) {
  if (!(be(e4) || e4 === null || e4 === "")) return parseFloat(e4);
}
function Sd(e4) {
  if (!(be(e4) || e4 === null || e4 === "")) {
    const t = parseFloat("0." + e4) * 1e3;
    return Math.floor(t);
  }
}
function Ed(e4, t, n = "round") {
  const r = 10 ** t;
  switch (n) {
    case "expand":
      return e4 > 0 ? Math.ceil(e4 * r) / r : Math.floor(e4 * r) / r;
    case "trunc":
      return Math.trunc(e4 * r) / r;
    case "round":
      return Math.round(e4 * r) / r;
    case "floor":
      return Math.floor(e4 * r) / r;
    case "ceil":
      return Math.ceil(e4 * r) / r;
    default:
      throw new RangeError(`Value rounding ${n} is out of range`);
  }
}
function io(e4) {
  return e4 % 4 === 0 && (e4 % 100 !== 0 || e4 % 400 === 0);
}
function Di(e4) {
  return io(e4) ? 366 : 365;
}
function Ya(e4, t) {
  const n = nP(t - 1, 12) + 1, r = e4 + (t - n) / 12;
  return n === 2 ? io(r) ? 29 : 28 : [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][n - 1];
}
function Xa(e4) {
  let t = Date.UTC(e4.year, e4.month - 1, e4.day, e4.hour, e4.minute, e4.second, e4.millisecond);
  return e4.year < 100 && e4.year >= 0 && (t = new Date(t), t.setUTCFullYear(e4.year, e4.month - 1, e4.day)), +t;
}
function pb(e4, t, n) {
  return -bd(yd(e4, 1, t), n) + t - 1;
}
function so(e4, t = 4, n = 1) {
  const r = pb(e4, t, n), i = pb(e4 + 1, t, n);
  return (Di(e4) - r + i) / 7;
}
function Ad(e4) {
  return e4 > 99 ? e4 : e4 > st.twoDigitCutoffYear ? 1900 + e4 : 2e3 + e4;
}
function mb(e4, t, n, r = null) {
  const i = new Date(e4), s = { hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" };
  r && (s.timeZone = r);
  const o = { timeZoneName: t, ...s }, a = new Intl.DateTimeFormat(n, o).formatToParts(i).find((l) => l.type.toLowerCase() === "timezonename");
  return a ? a.value : null;
}
function Ja(e4, t) {
  let n = parseInt(e4, 10);
  Number.isNaN(n) && (n = 0);
  const r = parseInt(t, 10) || 0, i = n < 0 || Object.is(n, -0) ? -r : r;
  return n * 60 + i;
}
function gb(e4) {
  const t = Number(e4);
  if (typeof e4 == "boolean" || e4 === "" || !Number.isFinite(t)) throw new It(`Invalid unit value ${e4}`);
  return t;
}
function Qa(e4, t) {
  const n = {};
  for (const r in e4) if (Fi(e4, r)) {
    const i = e4[r];
    if (i == null) continue;
    n[t(r)] = gb(i);
  }
  return n;
}
function oo(e4, t) {
  const n = Math.trunc(Math.abs(e4 / 60)), r = Math.trunc(Math.abs(e4 % 60)), i = e4 >= 0 ? "+" : "-";
  switch (t) {
    case "short":
      return `${i}${pt(n, 2)}:${pt(r, 2)}`;
    case "narrow":
      return `${i}${n}${r > 0 ? `:${r}` : ""}`;
    case "techie":
      return `${i}${pt(n, 2)}${pt(r, 2)}`;
    default:
      throw new RangeError(`Value format ${t} is out of range for property format`);
  }
}
function el(e4) {
  return tP(e4, ["hour", "minute", "second", "millisecond"]);
}
const rP = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], yb = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], iP = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
function bb(e4) {
  switch (e4) {
    case "narrow":
      return [...iP];
    case "short":
      return [...yb];
    case "long":
      return [...rP];
    case "numeric":
      return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    case "2-digit":
      return ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    default:
      return null;
  }
}
const kb = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], wb = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], sP = ["M", "T", "W", "T", "F", "S", "S"];
function Sb(e4) {
  switch (e4) {
    case "narrow":
      return [...sP];
    case "short":
      return [...wb];
    case "long":
      return [...kb];
    case "numeric":
      return ["1", "2", "3", "4", "5", "6", "7"];
    default:
      return null;
  }
}
const Eb = ["AM", "PM"], oP = ["Before Christ", "Anno Domini"], aP = ["BC", "AD"], lP = ["B", "A"];
function Ab(e4) {
  switch (e4) {
    case "narrow":
      return [...lP];
    case "short":
      return [...aP];
    case "long":
      return [...oP];
    default:
      return null;
  }
}
function cP(e4) {
  return Eb[e4.hour < 12 ? 0 : 1];
}
function uP(e4, t) {
  return Sb(t)[e4.weekday - 1];
}
function dP(e4, t) {
  return bb(t)[e4.month - 1];
}
function fP(e4, t) {
  return Ab(t)[e4.year < 0 ? 0 : 1];
}
function hP(e4, t, n = "always", r = false) {
  const i = { years: ["year", "yr."], quarters: ["quarter", "qtr."], months: ["month", "mo."], weeks: ["week", "wk."], days: ["day", "day", "days"], hours: ["hour", "hr."], minutes: ["minute", "min."], seconds: ["second", "sec."] }, s = ["hours", "minutes", "seconds"].indexOf(e4) === -1;
  if (n === "auto" && s) {
    const f = e4 === "days";
    switch (t) {
      case 1:
        return f ? "tomorrow" : `next ${i[e4][0]}`;
      case -1:
        return f ? "yesterday" : `last ${i[e4][0]}`;
      case 0:
        return f ? "today" : `this ${i[e4][0]}`;
    }
  }
  const o = Object.is(t, -0) || t < 0, a = Math.abs(t), l = a === 1, u = i[e4], c = r ? l ? u[1] : u[2] || u[1] : l ? i[e4][0] : e4;
  return o ? `${a} ${c} ago` : `in ${a} ${c}`;
}
function Tb(e4, t) {
  let n = "";
  for (const r of e4) r.literal ? n += r.val : n += t(r.val);
  return n;
}
const vP = { D: Wa, DD: Ny, DDD: Cy, DDDD: _y, t: Oy, tt: Py, ttt: xy, tttt: Ry, T: My, TT: jy, TTT: Iy, TTTT: Ly, f: Fy, ff: By, fff: $y, ffff: Vy, F: Dy, FF: zy, FFF: Uy, FFFF: Hy };
class Lt {
  static create(t, n = {}) {
    return new Lt(t, n);
  }
  static parseFormat(t) {
    let n = null, r = "", i = false;
    const s = [];
    for (let o = 0; o < t.length; o++) {
      const a = t.charAt(o);
      a === "'" ? ((r.length > 0 || i) && s.push({ literal: i || /^\s+$/.test(r), val: r === "" ? "'" : r }), n = null, r = "", i = !i) : i || a === n ? r += a : (r.length > 0 && s.push({ literal: /^\s+$/.test(r), val: r }), r = a, n = a);
    }
    return r.length > 0 && s.push({ literal: i || /^\s+$/.test(r), val: r }), s;
  }
  static macroTokenToFormatOpts(t) {
    return vP[t];
  }
  constructor(t, n) {
    this.opts = n, this.loc = t, this.systemLoc = null;
  }
  formatWithSystemDefault(t, n) {
    return this.systemLoc === null && (this.systemLoc = this.loc.redefaultToSystem()), this.systemLoc.dtFormatter(t, { ...this.opts, ...n }).format();
  }
  dtFormatter(t, n = {}) {
    return this.loc.dtFormatter(t, { ...this.opts, ...n });
  }
  formatDateTime(t, n) {
    return this.dtFormatter(t, n).format();
  }
  formatDateTimeParts(t, n) {
    return this.dtFormatter(t, n).formatToParts();
  }
  formatInterval(t, n) {
    return this.dtFormatter(t.start, n).dtf.formatRange(t.start.toJSDate(), t.end.toJSDate());
  }
  resolvedOptions(t, n) {
    return this.dtFormatter(t, n).resolvedOptions();
  }
  num(t, n = 0, r = void 0) {
    if (this.opts.forceSimple) return pt(t, n);
    const i = { ...this.opts };
    return n > 0 && (i.padTo = n), r && (i.signDisplay = r), this.loc.numberFormatter(i).format(t);
  }
  formatDateTimeFromString(t, n) {
    const r = this.loc.listingMode() === "en", i = this.loc.outputCalendar && this.loc.outputCalendar !== "gregory", s = (v, m) => this.loc.extract(t, v, m), o = (v) => t.isOffsetFixed && t.offset === 0 && v.allowZ ? "Z" : t.isValid ? t.zone.formatOffset(t.ts, v.format) : "", a = () => r ? cP(t) : s({ hour: "numeric", hourCycle: "h12" }, "dayperiod"), l = (v, m) => r ? dP(t, v) : s(m ? { month: v } : { month: v, day: "numeric" }, "month"), u = (v, m) => r ? uP(t, v) : s(m ? { weekday: v } : { weekday: v, month: "long", day: "numeric" }, "weekday"), c = (v) => {
      const m = Lt.macroTokenToFormatOpts(v);
      return m ? this.formatWithSystemDefault(t, m) : v;
    }, f = (v) => r ? fP(t, v) : s({ era: v }, "era"), p = (v) => {
      switch (v) {
        case "S":
          return this.num(t.millisecond);
        case "u":
        case "SSS":
          return this.num(t.millisecond, 3);
        case "s":
          return this.num(t.second);
        case "ss":
          return this.num(t.second, 2);
        case "uu":
          return this.num(Math.floor(t.millisecond / 10), 2);
        case "uuu":
          return this.num(Math.floor(t.millisecond / 100));
        case "m":
          return this.num(t.minute);
        case "mm":
          return this.num(t.minute, 2);
        case "h":
          return this.num(t.hour % 12 === 0 ? 12 : t.hour % 12);
        case "hh":
          return this.num(t.hour % 12 === 0 ? 12 : t.hour % 12, 2);
        case "H":
          return this.num(t.hour);
        case "HH":
          return this.num(t.hour, 2);
        case "Z":
          return o({ format: "narrow", allowZ: this.opts.allowZ });
        case "ZZ":
          return o({ format: "short", allowZ: this.opts.allowZ });
        case "ZZZ":
          return o({ format: "techie", allowZ: this.opts.allowZ });
        case "ZZZZ":
          return t.zone.offsetName(t.ts, { format: "short", locale: this.loc.locale });
        case "ZZZZZ":
          return t.zone.offsetName(t.ts, { format: "long", locale: this.loc.locale });
        case "z":
          return t.zoneName;
        case "a":
          return a();
        case "d":
          return i ? s({ day: "numeric" }, "day") : this.num(t.day);
        case "dd":
          return i ? s({ day: "2-digit" }, "day") : this.num(t.day, 2);
        case "c":
          return this.num(t.weekday);
        case "ccc":
          return u("short", true);
        case "cccc":
          return u("long", true);
        case "ccccc":
          return u("narrow", true);
        case "E":
          return this.num(t.weekday);
        case "EEE":
          return u("short", false);
        case "EEEE":
          return u("long", false);
        case "EEEEE":
          return u("narrow", false);
        case "L":
          return i ? s({ month: "numeric", day: "numeric" }, "month") : this.num(t.month);
        case "LL":
          return i ? s({ month: "2-digit", day: "numeric" }, "month") : this.num(t.month, 2);
        case "LLL":
          return l("short", true);
        case "LLLL":
          return l("long", true);
        case "LLLLL":
          return l("narrow", true);
        case "M":
          return i ? s({ month: "numeric" }, "month") : this.num(t.month);
        case "MM":
          return i ? s({ month: "2-digit" }, "month") : this.num(t.month, 2);
        case "MMM":
          return l("short", false);
        case "MMMM":
          return l("long", false);
        case "MMMMM":
          return l("narrow", false);
        case "y":
          return i ? s({ year: "numeric" }, "year") : this.num(t.year);
        case "yy":
          return i ? s({ year: "2-digit" }, "year") : this.num(t.year.toString().slice(-2), 2);
        case "yyyy":
          return i ? s({ year: "numeric" }, "year") : this.num(t.year, 4);
        case "yyyyyy":
          return i ? s({ year: "numeric" }, "year") : this.num(t.year, 6);
        case "G":
          return f("short");
        case "GG":
          return f("long");
        case "GGGGG":
          return f("narrow");
        case "kk":
          return this.num(t.weekYear.toString().slice(-2), 2);
        case "kkkk":
          return this.num(t.weekYear, 4);
        case "W":
          return this.num(t.weekNumber);
        case "WW":
          return this.num(t.weekNumber, 2);
        case "n":
          return this.num(t.localWeekNumber);
        case "nn":
          return this.num(t.localWeekNumber, 2);
        case "ii":
          return this.num(t.localWeekYear.toString().slice(-2), 2);
        case "iiii":
          return this.num(t.localWeekYear, 4);
        case "o":
          return this.num(t.ordinal);
        case "ooo":
          return this.num(t.ordinal, 3);
        case "q":
          return this.num(t.quarter);
        case "qq":
          return this.num(t.quarter, 2);
        case "X":
          return this.num(Math.floor(t.ts / 1e3));
        case "x":
          return this.num(t.ts);
        default:
          return c(v);
      }
    };
    return Tb(Lt.parseFormat(n), p);
  }
  formatDurationFromString(t, n) {
    const r = this.opts.signMode === "negativeLargestOnly" ? -1 : 1, i = (c) => {
      switch (c[0]) {
        case "S":
          return "milliseconds";
        case "s":
          return "seconds";
        case "m":
          return "minutes";
        case "h":
          return "hours";
        case "d":
          return "days";
        case "w":
          return "weeks";
        case "M":
          return "months";
        case "y":
          return "years";
        default:
          return null;
      }
    }, s = (c, f) => (p) => {
      const v = i(p);
      if (v) {
        const m = f.isNegativeDuration && v !== f.largestUnit ? r : 1;
        let y;
        return this.opts.signMode === "negativeLargestOnly" && v !== f.largestUnit ? y = "never" : this.opts.signMode === "all" ? y = "always" : y = "auto", this.num(c.get(v) * m, p.length, y);
      } else return p;
    }, o = Lt.parseFormat(n), a = o.reduce((c, { literal: f, val: p }) => f ? c : c.concat(p), []), l = t.shiftTo(...a.map(i).filter((c) => c)), u = { isNegativeDuration: l < 0, largestUnit: Object.keys(l.values)[0] };
    return Tb(o, s(l, u));
  }
}
const Nb = /[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;
function Bi(...e4) {
  const t = e4.reduce((n, r) => n + r.source, "");
  return RegExp(`^${t}$`);
}
function zi(...e4) {
  return (t) => e4.reduce(([n, r, i], s) => {
    const [o, a, l] = s(t, i);
    return [{ ...n, ...o }, a || r, l];
  }, [{}, null, 1]).slice(0, 2);
}
function $i(e4, ...t) {
  if (e4 == null) return [null, null];
  for (const [n, r] of t) {
    const i = n.exec(e4);
    if (i) return r(i);
  }
  return [null, null];
}
function Cb(...e4) {
  return (t, n) => {
    const r = {};
    let i;
    for (i = 0; i < e4.length; i++) r[e4[i]] = Rr(t[n + i]);
    return [r, null, n + i];
  };
}
const _b = /(?:([Zz])|([+-]\d\d)(?::?(\d\d))?)/, pP = `(?:${_b.source}?(?:\\[(${Nb.source})\\])?)?`, Td = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/, Ob = RegExp(`${Td.source}${pP}`), Nd = RegExp(`(?:[Tt]${Ob.source})?`), mP = /([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/, gP = /(\d{4})-?W(\d\d)(?:-?(\d))?/, yP = /(\d{4})-?(\d{3})/, bP = Cb("weekYear", "weekNumber", "weekDay"), kP = Cb("year", "ordinal"), wP = /(\d{4})-(\d\d)-(\d\d)/, Pb = RegExp(`${Td.source} ?(?:${_b.source}|(${Nb.source}))?`), SP = RegExp(`(?: ${Pb.source})?`);
function Ui(e4, t, n) {
  const r = e4[t];
  return be(r) ? n : Rr(r);
}
function EP(e4, t) {
  return [{ year: Ui(e4, t), month: Ui(e4, t + 1, 1), day: Ui(e4, t + 2, 1) }, null, t + 3];
}
function Vi(e4, t) {
  return [{ hours: Ui(e4, t, 0), minutes: Ui(e4, t + 1, 0), seconds: Ui(e4, t + 2, 0), milliseconds: Sd(e4[t + 3]) }, null, t + 4];
}
function ao(e4, t) {
  const n = !e4[t] && !e4[t + 1], r = Ja(e4[t + 1], e4[t + 2]), i = n ? null : Ht.instance(r);
  return [{}, i, t + 3];
}
function lo(e4, t) {
  const n = e4[t] ? lr.create(e4[t]) : null;
  return [{}, n, t + 1];
}
const AP = RegExp(`^T?${Td.source}$`), TP = /^-?P(?:(?:(-?\d{1,20}(?:\.\d{1,20})?)Y)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20}(?:\.\d{1,20})?)W)?(?:(-?\d{1,20}(?:\.\d{1,20})?)D)?(?:T(?:(-?\d{1,20}(?:\.\d{1,20})?)H)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,20}))?S)?)?)$/;
function NP(e4) {
  const [t, n, r, i, s, o, a, l, u] = e4, c = t[0] === "-", f = l && l[0] === "-", p = (v, m = false) => v !== void 0 && (m || v && c) ? -v : v;
  return [{ years: p(Jr(n)), months: p(Jr(r)), weeks: p(Jr(i)), days: p(Jr(s)), hours: p(Jr(o)), minutes: p(Jr(a)), seconds: p(Jr(l), l === "-0"), milliseconds: p(Sd(u), f) }];
}
const CP = { GMT: 0, EDT: -240, EST: -300, CDT: -300, CST: -360, MDT: -360, MST: -420, PDT: -420, PST: -480 };
function Cd(e4, t, n, r, i, s, o) {
  const a = { year: t.length === 2 ? Ad(Rr(t)) : Rr(t), month: yb.indexOf(n) + 1, day: Rr(r), hour: Rr(i), minute: Rr(s) };
  return o && (a.second = Rr(o)), e4 && (a.weekday = e4.length > 3 ? kb.indexOf(e4) + 1 : wb.indexOf(e4) + 1), a;
}
const _P = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;
function OP(e4) {
  const [, t, n, r, i, s, o, a, l, u, c, f] = e4, p = Cd(t, i, r, n, s, o, a);
  let v;
  return l ? v = CP[l] : u ? v = 0 : v = Ja(c, f), [p, new Ht(v)];
}
function PP(e4) {
  return e4.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").trim();
}
const xP = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/, RP = /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/, MP = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;
function xb(e4) {
  const [, t, n, r, i, s, o, a] = e4;
  return [Cd(t, i, r, n, s, o, a), Ht.utcInstance];
}
function jP(e4) {
  const [, t, n, r, i, s, o, a] = e4;
  return [Cd(t, a, n, r, i, s, o), Ht.utcInstance];
}
const IP = Bi(mP, Nd), LP = Bi(gP, Nd), FP = Bi(yP, Nd), DP = Bi(Ob), Rb = zi(EP, Vi, ao, lo), BP = zi(bP, Vi, ao, lo), zP = zi(kP, Vi, ao, lo), $P = zi(Vi, ao, lo);
function UP(e4) {
  return $i(e4, [IP, Rb], [LP, BP], [FP, zP], [DP, $P]);
}
function VP(e4) {
  return $i(PP(e4), [_P, OP]);
}
function HP(e4) {
  return $i(e4, [xP, xb], [RP, xb], [MP, jP]);
}
function qP(e4) {
  return $i(e4, [TP, NP]);
}
const WP = zi(Vi);
function GP(e4) {
  return $i(e4, [AP, WP]);
}
const ZP = Bi(wP, SP), KP = Bi(Pb), YP = zi(Vi, ao, lo);
function XP(e4) {
  return $i(e4, [ZP, Rb], [KP, YP]);
}
const Mb = "Invalid Duration", jb = { weeks: { days: 7, hours: 168, minutes: 10080, seconds: 10080 * 60, milliseconds: 10080 * 60 * 1e3 }, days: { hours: 24, minutes: 1440, seconds: 1440 * 60, milliseconds: 1440 * 60 * 1e3 }, hours: { minutes: 60, seconds: 3600, milliseconds: 3600 * 1e3 }, minutes: { seconds: 60, milliseconds: 60 * 1e3 }, seconds: { milliseconds: 1e3 } }, JP = { years: { quarters: 4, months: 12, weeks: 52, days: 365, hours: 365 * 24, minutes: 365 * 24 * 60, seconds: 365 * 24 * 60 * 60, milliseconds: 365 * 24 * 60 * 60 * 1e3 }, quarters: { months: 3, weeks: 13, days: 91, hours: 2184, minutes: 2184 * 60, seconds: 2184 * 60 * 60, milliseconds: 2184 * 60 * 60 * 1e3 }, months: { weeks: 4, days: 30, hours: 720, minutes: 720 * 60, seconds: 720 * 60 * 60, milliseconds: 720 * 60 * 60 * 1e3 }, ...jb }, fn = 146097 / 400, Hi = 146097 / 4800, QP = { years: { quarters: 4, months: 12, weeks: fn / 7, days: fn, hours: fn * 24, minutes: fn * 24 * 60, seconds: fn * 24 * 60 * 60, milliseconds: fn * 24 * 60 * 60 * 1e3 }, quarters: { months: 3, weeks: fn / 28, days: fn / 4, hours: fn * 24 / 4, minutes: fn * 24 * 60 / 4, seconds: fn * 24 * 60 * 60 / 4, milliseconds: fn * 24 * 60 * 60 * 1e3 / 4 }, months: { weeks: Hi / 7, days: Hi, hours: Hi * 24, minutes: Hi * 24 * 60, seconds: Hi * 24 * 60 * 60, milliseconds: Hi * 24 * 60 * 60 * 1e3 }, ...jb }, Qr = ["years", "quarters", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds"], ex = Qr.slice(0).reverse();
function ar(e4, t, n = false) {
  const r = { values: n ? t.values : { ...e4.values, ...t.values || {} }, loc: e4.loc.clone(t.loc), conversionAccuracy: t.conversionAccuracy || e4.conversionAccuracy, matrix: t.matrix || e4.matrix };
  return new Ie(r);
}
function Ib(e4, t) {
  let n = t.milliseconds ?? 0;
  for (const r of ex.slice(1)) t[r] && (n += t[r] * e4[r].milliseconds);
  return n;
}
function Lb(e4, t) {
  const n = Ib(e4, t) < 0 ? -1 : 1;
  Qr.reduceRight((r, i) => {
    if (be(t[i])) return r;
    if (r) {
      const s = t[r] * n, o = e4[i][r], a = Math.floor(s / o);
      t[i] += a * n, t[r] -= a * o * n;
    }
    return i;
  }, null), Qr.reduce((r, i) => {
    if (be(t[i])) return r;
    if (r) {
      const s = t[r] % 1;
      t[r] -= s, t[i] += s * e4[r][i];
    }
    return i;
  }, null);
}
function Fb(e4) {
  const t = {};
  for (const [n, r] of Object.entries(e4)) r !== 0 && (t[n] = r);
  return t;
}
class Ie {
  constructor(t) {
    const n = t.conversionAccuracy === "longterm" || false;
    let r = n ? QP : JP;
    t.matrix && (r = t.matrix), this.values = t.values, this.loc = t.loc || Ue.create(), this.conversionAccuracy = n ? "longterm" : "casual", this.invalid = t.invalid || null, this.matrix = r, this.isLuxonDuration = true;
  }
  static fromMillis(t, n) {
    return Ie.fromObject({ milliseconds: t }, n);
  }
  static fromObject(t, n = {}) {
    if (t == null || typeof t != "object") throw new It(`Duration.fromObject: argument expected to be an object, got ${t === null ? "null" : typeof t}`);
    return new Ie({ values: Qa(t, Ie.normalizeUnit), loc: Ue.fromObject(n), conversionAccuracy: n.conversionAccuracy, matrix: n.matrix });
  }
  static fromDurationLike(t) {
    if (xr(t)) return Ie.fromMillis(t);
    if (Ie.isDuration(t)) return t;
    if (typeof t == "object") return Ie.fromObject(t);
    throw new It(`Unknown duration argument ${t} of type ${typeof t}`);
  }
  static fromISO(t, n) {
    const [r] = qP(t);
    return r ? Ie.fromObject(r, n) : Ie.invalid("unparsable", `the input "${t}" can't be parsed as ISO 8601`);
  }
  static fromISOTime(t, n) {
    const [r] = GP(t);
    return r ? Ie.fromObject(r, n) : Ie.invalid("unparsable", `the input "${t}" can't be parsed as ISO 8601`);
  }
  static invalid(t, n = null) {
    if (!t) throw new It("need to specify a reason the Duration is invalid");
    const r = t instanceof Nn ? t : new Nn(t, n);
    if (st.throwOnInvalid) throw new NO(r);
    return new Ie({ invalid: r });
  }
  static normalizeUnit(t) {
    const n = { year: "years", years: "years", quarter: "quarters", quarters: "quarters", month: "months", months: "months", week: "weeks", weeks: "weeks", day: "days", days: "days", hour: "hours", hours: "hours", minute: "minutes", minutes: "minutes", second: "seconds", seconds: "seconds", millisecond: "milliseconds", milliseconds: "milliseconds" }[t && t.toLowerCase()];
    if (!n) throw new Ty(t);
    return n;
  }
  static isDuration(t) {
    return t && t.isLuxonDuration || false;
  }
  get locale() {
    return this.isValid ? this.loc.locale : null;
  }
  get numberingSystem() {
    return this.isValid ? this.loc.numberingSystem : null;
  }
  toFormat(t, n = {}) {
    const r = { ...n, floor: n.round !== false && n.floor !== false };
    return this.isValid ? Lt.create(this.loc, r).formatDurationFromString(this, t) : Mb;
  }
  toHuman(t = {}) {
    if (!this.isValid) return Mb;
    const n = t.showZeros !== false, r = Qr.map((i) => {
      const s = this.values[i];
      return be(s) || s === 0 && !n ? null : this.loc.numberFormatter({ style: "unit", unitDisplay: "long", ...t, unit: i.slice(0, -1) }).format(s);
    }).filter((i) => i);
    return this.loc.listFormatter({ type: "conjunction", style: t.listStyle || "narrow", ...t }).format(r);
  }
  toObject() {
    return this.isValid ? { ...this.values } : {};
  }
  toISO() {
    if (!this.isValid) return null;
    let t = "P";
    return this.years !== 0 && (t += this.years + "Y"), (this.months !== 0 || this.quarters !== 0) && (t += this.months + this.quarters * 3 + "M"), this.weeks !== 0 && (t += this.weeks + "W"), this.days !== 0 && (t += this.days + "D"), (this.hours !== 0 || this.minutes !== 0 || this.seconds !== 0 || this.milliseconds !== 0) && (t += "T"), this.hours !== 0 && (t += this.hours + "H"), this.minutes !== 0 && (t += this.minutes + "M"), (this.seconds !== 0 || this.milliseconds !== 0) && (t += Ed(this.seconds + this.milliseconds / 1e3, 3) + "S"), t === "P" && (t += "T0S"), t;
  }
  toISOTime(t = {}) {
    if (!this.isValid) return null;
    const n = this.toMillis();
    return n < 0 || n >= 864e5 ? null : (t = { suppressMilliseconds: false, suppressSeconds: false, includePrefix: false, format: "extended", ...t, includeOffset: false }, we.fromMillis(n, { zone: "UTC" }).toISOTime(t));
  }
  toJSON() {
    return this.toISO();
  }
  toString() {
    return this.toISO();
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.isValid ? `Duration { values: ${JSON.stringify(this.values)} }` : `Duration { Invalid, reason: ${this.invalidReason} }`;
  }
  toMillis() {
    return this.isValid ? Ib(this.matrix, this.values) : NaN;
  }
  valueOf() {
    return this.toMillis();
  }
  plus(t) {
    if (!this.isValid) return this;
    const n = Ie.fromDurationLike(t), r = {};
    for (const i of Qr) (Fi(n.values, i) || Fi(this.values, i)) && (r[i] = n.get(i) + this.get(i));
    return ar(this, { values: r }, true);
  }
  minus(t) {
    if (!this.isValid) return this;
    const n = Ie.fromDurationLike(t);
    return this.plus(n.negate());
  }
  mapUnits(t) {
    if (!this.isValid) return this;
    const n = {};
    for (const r of Object.keys(this.values)) n[r] = gb(t(this.values[r], r));
    return ar(this, { values: n }, true);
  }
  get(t) {
    return this[Ie.normalizeUnit(t)];
  }
  set(t) {
    if (!this.isValid) return this;
    const n = { ...this.values, ...Qa(t, Ie.normalizeUnit) };
    return ar(this, { values: n });
  }
  reconfigure({ locale: t, numberingSystem: n, conversionAccuracy: r, matrix: i } = {}) {
    const o = { loc: this.loc.clone({ locale: t, numberingSystem: n }), matrix: i, conversionAccuracy: r };
    return ar(this, o);
  }
  as(t) {
    return this.isValid ? this.shiftTo(t).get(t) : NaN;
  }
  normalize() {
    if (!this.isValid) return this;
    const t = this.toObject();
    return Lb(this.matrix, t), ar(this, { values: t }, true);
  }
  rescale() {
    if (!this.isValid) return this;
    const t = Fb(this.normalize().shiftToAll().toObject());
    return ar(this, { values: t }, true);
  }
  shiftTo(...t) {
    if (!this.isValid) return this;
    if (t.length === 0) return this;
    t = t.map((o) => Ie.normalizeUnit(o));
    const n = {}, r = {}, i = this.toObject();
    let s;
    for (const o of Qr) if (t.indexOf(o) >= 0) {
      s = o;
      let a = 0;
      for (const u in r) a += this.matrix[u][o] * r[u], r[u] = 0;
      xr(i[o]) && (a += i[o]);
      const l = Math.trunc(a);
      n[o] = l, r[o] = (a * 1e3 - l * 1e3) / 1e3;
    } else xr(i[o]) && (r[o] = i[o]);
    for (const o in r) r[o] !== 0 && (n[s] += o === s ? r[o] : r[o] / this.matrix[s][o]);
    return Lb(this.matrix, n), ar(this, { values: n }, true);
  }
  shiftToAll() {
    return this.isValid ? this.shiftTo("years", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds") : this;
  }
  negate() {
    if (!this.isValid) return this;
    const t = {};
    for (const n of Object.keys(this.values)) t[n] = this.values[n] === 0 ? 0 : -this.values[n];
    return ar(this, { values: t }, true);
  }
  removeZeros() {
    if (!this.isValid) return this;
    const t = Fb(this.values);
    return ar(this, { values: t }, true);
  }
  get years() {
    return this.isValid ? this.values.years || 0 : NaN;
  }
  get quarters() {
    return this.isValid ? this.values.quarters || 0 : NaN;
  }
  get months() {
    return this.isValid ? this.values.months || 0 : NaN;
  }
  get weeks() {
    return this.isValid ? this.values.weeks || 0 : NaN;
  }
  get days() {
    return this.isValid ? this.values.days || 0 : NaN;
  }
  get hours() {
    return this.isValid ? this.values.hours || 0 : NaN;
  }
  get minutes() {
    return this.isValid ? this.values.minutes || 0 : NaN;
  }
  get seconds() {
    return this.isValid ? this.values.seconds || 0 : NaN;
  }
  get milliseconds() {
    return this.isValid ? this.values.milliseconds || 0 : NaN;
  }
  get isValid() {
    return this.invalid === null;
  }
  get invalidReason() {
    return this.invalid ? this.invalid.reason : null;
  }
  get invalidExplanation() {
    return this.invalid ? this.invalid.explanation : null;
  }
  equals(t) {
    if (!this.isValid || !t.isValid || !this.loc.equals(t.loc)) return false;
    function n(r, i) {
      return r === void 0 || r === 0 ? i === void 0 || i === 0 : r === i;
    }
    for (const r of Qr) if (!n(this.values[r], t.values[r])) return false;
    return true;
  }
}
const qi = "Invalid Interval";
function tx(e4, t) {
  return !e4 || !e4.isValid ? lt.invalid("missing or invalid start") : !t || !t.isValid ? lt.invalid("missing or invalid end") : t < e4 ? lt.invalid("end before start", `The end of an interval must be after its start, but you had start=${e4.toISO()} and end=${t.toISO()}`) : null;
}
class lt {
  constructor(t) {
    this.s = t.start, this.e = t.end, this.invalid = t.invalid || null, this.isLuxonInterval = true;
  }
  static invalid(t, n = null) {
    if (!t) throw new It("need to specify a reason the Interval is invalid");
    const r = t instanceof Nn ? t : new Nn(t, n);
    if (st.throwOnInvalid) throw new TO(r);
    return new lt({ invalid: r });
  }
  static fromDateTimes(t, n) {
    const r = fo(t), i = fo(n), s = tx(r, i);
    return s ?? new lt({ start: r, end: i });
  }
  static after(t, n) {
    const r = Ie.fromDurationLike(n), i = fo(t);
    return lt.fromDateTimes(i, i.plus(r));
  }
  static before(t, n) {
    const r = Ie.fromDurationLike(n), i = fo(t);
    return lt.fromDateTimes(i.minus(r), i);
  }
  static fromISO(t, n) {
    const [r, i] = (t || "").split("/", 2);
    if (r && i) {
      let s, o;
      try {
        s = we.fromISO(r, n), o = s.isValid;
      } catch {
        o = false;
      }
      let a, l;
      try {
        a = we.fromISO(i, n), l = a.isValid;
      } catch {
        l = false;
      }
      if (o && l) return lt.fromDateTimes(s, a);
      if (o) {
        const u = Ie.fromISO(i, n);
        if (u.isValid) return lt.after(s, u);
      } else if (l) {
        const u = Ie.fromISO(r, n);
        if (u.isValid) return lt.before(a, u);
      }
    }
    return lt.invalid("unparsable", `the input "${t}" can't be parsed as ISO 8601`);
  }
  static isInterval(t) {
    return t && t.isLuxonInterval || false;
  }
  get start() {
    return this.isValid ? this.s : null;
  }
  get end() {
    return this.isValid ? this.e : null;
  }
  get lastDateTime() {
    return this.isValid && this.e ? this.e.minus(1) : null;
  }
  get isValid() {
    return this.invalidReason === null;
  }
  get invalidReason() {
    return this.invalid ? this.invalid.reason : null;
  }
  get invalidExplanation() {
    return this.invalid ? this.invalid.explanation : null;
  }
  length(t = "milliseconds") {
    return this.isValid ? this.toDuration(t).get(t) : NaN;
  }
  count(t = "milliseconds", n) {
    if (!this.isValid) return NaN;
    const r = this.start.startOf(t, n);
    let i;
    return n?.useLocaleWeeks ? i = this.end.reconfigure({ locale: r.locale }) : i = this.end, i = i.startOf(t, n), Math.floor(i.diff(r, t).get(t)) + (i.valueOf() !== this.end.valueOf());
  }
  hasSame(t) {
    return this.isValid ? this.isEmpty() || this.e.minus(1).hasSame(this.s, t) : false;
  }
  isEmpty() {
    return this.s.valueOf() === this.e.valueOf();
  }
  isAfter(t) {
    return this.isValid ? this.s > t : false;
  }
  isBefore(t) {
    return this.isValid ? this.e <= t : false;
  }
  contains(t) {
    return this.isValid ? this.s <= t && this.e > t : false;
  }
  set({ start: t, end: n } = {}) {
    return this.isValid ? lt.fromDateTimes(t || this.s, n || this.e) : this;
  }
  splitAt(...t) {
    if (!this.isValid) return [];
    const n = t.map(fo).filter((o) => this.contains(o)).sort((o, a) => o.toMillis() - a.toMillis()), r = [];
    let { s: i } = this, s = 0;
    for (; i < this.e; ) {
      const o = n[s] || this.e, a = +o > +this.e ? this.e : o;
      r.push(lt.fromDateTimes(i, a)), i = a, s += 1;
    }
    return r;
  }
  splitBy(t) {
    const n = Ie.fromDurationLike(t);
    if (!this.isValid || !n.isValid || n.as("milliseconds") === 0) return [];
    let { s: r } = this, i = 1, s;
    const o = [];
    for (; r < this.e; ) {
      const a = this.start.plus(n.mapUnits((l) => l * i));
      s = +a > +this.e ? this.e : a, o.push(lt.fromDateTimes(r, s)), r = s, i += 1;
    }
    return o;
  }
  divideEqually(t) {
    return this.isValid ? this.splitBy(this.length() / t).slice(0, t) : [];
  }
  overlaps(t) {
    return this.e > t.s && this.s < t.e;
  }
  abutsStart(t) {
    return this.isValid ? +this.e == +t.s : false;
  }
  abutsEnd(t) {
    return this.isValid ? +t.e == +this.s : false;
  }
  engulfs(t) {
    return this.isValid ? this.s <= t.s && this.e >= t.e : false;
  }
  equals(t) {
    return !this.isValid || !t.isValid ? false : this.s.equals(t.s) && this.e.equals(t.e);
  }
  intersection(t) {
    if (!this.isValid) return this;
    const n = this.s > t.s ? this.s : t.s, r = this.e < t.e ? this.e : t.e;
    return n >= r ? null : lt.fromDateTimes(n, r);
  }
  union(t) {
    if (!this.isValid) return this;
    const n = this.s < t.s ? this.s : t.s, r = this.e > t.e ? this.e : t.e;
    return lt.fromDateTimes(n, r);
  }
  static merge(t) {
    const [n, r] = t.sort((i, s) => i.s - s.s).reduce(([i, s], o) => s ? s.overlaps(o) || s.abutsStart(o) ? [i, s.union(o)] : [i.concat([s]), o] : [i, o], [[], null]);
    return r && n.push(r), n;
  }
  static xor(t) {
    let n = null, r = 0;
    const i = [], s = t.map((l) => [{ time: l.s, type: "s" }, { time: l.e, type: "e" }]), o = Array.prototype.concat(...s), a = o.sort((l, u) => l.time - u.time);
    for (const l of a) r += l.type === "s" ? 1 : -1, r === 1 ? n = l.time : (n && +n != +l.time && i.push(lt.fromDateTimes(n, l.time)), n = null);
    return lt.merge(i);
  }
  difference(...t) {
    return lt.xor([this].concat(t)).map((n) => this.intersection(n)).filter((n) => n && !n.isEmpty());
  }
  toString() {
    return this.isValid ? `[${this.s.toISO()} – ${this.e.toISO()})` : qi;
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.isValid ? `Interval { start: ${this.s.toISO()}, end: ${this.e.toISO()} }` : `Interval { Invalid, reason: ${this.invalidReason} }`;
  }
  toLocaleString(t = Wa, n = {}) {
    return this.isValid ? Lt.create(this.s.loc.clone(n), t).formatInterval(this) : qi;
  }
  toISO(t) {
    return this.isValid ? `${this.s.toISO(t)}/${this.e.toISO(t)}` : qi;
  }
  toISODate() {
    return this.isValid ? `${this.s.toISODate()}/${this.e.toISODate()}` : qi;
  }
  toISOTime(t) {
    return this.isValid ? `${this.s.toISOTime(t)}/${this.e.toISOTime(t)}` : qi;
  }
  toFormat(t, { separator: n = " – " } = {}) {
    return this.isValid ? `${this.s.toFormat(t)}${n}${this.e.toFormat(t)}` : qi;
  }
  toDuration(t, n) {
    return this.isValid ? this.e.diff(this.s, t, n) : Ie.invalid(this.invalidReason);
  }
  mapEndpoints(t) {
    return lt.fromDateTimes(t(this.s), t(this.e));
  }
}
class tl {
  static hasDST(t = st.defaultZone) {
    const n = we.now().setZone(t).set({ month: 12 });
    return !t.isUniversal && n.offset !== n.set({ month: 6 }).offset;
  }
  static isValidIANAZone(t) {
    return lr.isValidZone(t);
  }
  static normalizeZone(t) {
    return Pr(t, st.defaultZone);
  }
  static getStartOfWeek({ locale: t = null, locObj: n = null } = {}) {
    return (n || Ue.create(t)).getStartOfWeek();
  }
  static getMinimumDaysInFirstWeek({ locale: t = null, locObj: n = null } = {}) {
    return (n || Ue.create(t)).getMinDaysInFirstWeek();
  }
  static getWeekendWeekdays({ locale: t = null, locObj: n = null } = {}) {
    return (n || Ue.create(t)).getWeekendDays().slice();
  }
  static months(t = "long", { locale: n = null, numberingSystem: r = null, locObj: i = null, outputCalendar: s = "gregory" } = {}) {
    return (i || Ue.create(n, r, s)).months(t);
  }
  static monthsFormat(t = "long", { locale: n = null, numberingSystem: r = null, locObj: i = null, outputCalendar: s = "gregory" } = {}) {
    return (i || Ue.create(n, r, s)).months(t, true);
  }
  static weekdays(t = "long", { locale: n = null, numberingSystem: r = null, locObj: i = null } = {}) {
    return (i || Ue.create(n, r, null)).weekdays(t);
  }
  static weekdaysFormat(t = "long", { locale: n = null, numberingSystem: r = null, locObj: i = null } = {}) {
    return (i || Ue.create(n, r, null)).weekdays(t, true);
  }
  static meridiems({ locale: t = null } = {}) {
    return Ue.create(t).meridiems();
  }
  static eras(t = "short", { locale: n = null } = {}) {
    return Ue.create(n, null, "gregory").eras(t);
  }
  static features() {
    return { relative: fb(), localeWeek: hb() };
  }
}
function Db(e4, t) {
  const n = (i) => i.toUTC(0, { keepLocalTime: true }).startOf("day").valueOf(), r = n(t) - n(e4);
  return Math.floor(Ie.fromMillis(r).as("days"));
}
function nx(e4, t, n) {
  const r = [["years", (l, u) => u.year - l.year], ["quarters", (l, u) => u.quarter - l.quarter + (u.year - l.year) * 4], ["months", (l, u) => u.month - l.month + (u.year - l.year) * 12], ["weeks", (l, u) => {
    const c = Db(l, u);
    return (c - c % 7) / 7;
  }], ["days", Db]], i = {}, s = e4;
  let o, a;
  for (const [l, u] of r) n.indexOf(l) >= 0 && (o = l, i[l] = u(e4, t), a = s.plus(i), a > t ? (i[l]--, e4 = s.plus(i), e4 > t && (a = e4, i[l]--, e4 = s.plus(i))) : e4 = a);
  return [e4, i, a, o];
}
function rx(e4, t, n, r) {
  let [i, s, o, a] = nx(e4, t, n);
  const l = t - i, u = n.filter((f) => ["hours", "minutes", "seconds", "milliseconds"].indexOf(f) >= 0);
  u.length === 0 && (o < t && (o = i.plus({ [a]: 1 })), o !== i && (s[a] = (s[a] || 0) + l / (o - i)));
  const c = Ie.fromObject(s, r);
  return u.length > 0 ? Ie.fromMillis(l, r).shiftTo(...u).plus(c) : c;
}
const ix = "missing Intl.DateTimeFormat.formatToParts support";
function Be(e4, t = (n) => n) {
  return { regex: e4, deser: ([n]) => t(ZO(n)) };
}
const sx = " ", Bb = `[ ${sx}]`, zb = new RegExp(Bb, "g");
function ox(e4) {
  return e4.replace(/\./g, "\\.?").replace(zb, Bb);
}
function $b(e4) {
  return e4.replace(/\./g, "").replace(zb, " ").toLowerCase();
}
function Cn(e4, t) {
  return e4 === null ? null : { regex: RegExp(e4.map(ox).join("|")), deser: ([n]) => e4.findIndex((r) => $b(n) === $b(r)) + t };
}
function Ub(e4, t) {
  return { regex: e4, deser: ([, n, r]) => Ja(n, r), groups: t };
}
function nl(e4) {
  return { regex: e4, deser: ([t]) => t };
}
function ax(e4) {
  return e4.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
}
function lx(e4, t) {
  const n = Tn(t), r = Tn(t, "{2}"), i = Tn(t, "{3}"), s = Tn(t, "{4}"), o = Tn(t, "{6}"), a = Tn(t, "{1,2}"), l = Tn(t, "{1,3}"), u = Tn(t, "{1,6}"), c = Tn(t, "{1,9}"), f = Tn(t, "{2,4}"), p = Tn(t, "{4,6}"), v = (k) => ({ regex: RegExp(ax(k.val)), deser: ([E]) => E, literal: true }), y = ((k) => {
    if (e4.literal) return v(k);
    switch (k.val) {
      case "G":
        return Cn(t.eras("short"), 0);
      case "GG":
        return Cn(t.eras("long"), 0);
      case "y":
        return Be(u);
      case "yy":
        return Be(f, Ad);
      case "yyyy":
        return Be(s);
      case "yyyyy":
        return Be(p);
      case "yyyyyy":
        return Be(o);
      case "M":
        return Be(a);
      case "MM":
        return Be(r);
      case "MMM":
        return Cn(t.months("short", true), 1);
      case "MMMM":
        return Cn(t.months("long", true), 1);
      case "L":
        return Be(a);
      case "LL":
        return Be(r);
      case "LLL":
        return Cn(t.months("short", false), 1);
      case "LLLL":
        return Cn(t.months("long", false), 1);
      case "d":
        return Be(a);
      case "dd":
        return Be(r);
      case "o":
        return Be(l);
      case "ooo":
        return Be(i);
      case "HH":
        return Be(r);
      case "H":
        return Be(a);
      case "hh":
        return Be(r);
      case "h":
        return Be(a);
      case "mm":
        return Be(r);
      case "m":
        return Be(a);
      case "q":
        return Be(a);
      case "qq":
        return Be(r);
      case "s":
        return Be(a);
      case "ss":
        return Be(r);
      case "S":
        return Be(l);
      case "SSS":
        return Be(i);
      case "u":
        return nl(c);
      case "uu":
        return nl(a);
      case "uuu":
        return Be(n);
      case "a":
        return Cn(t.meridiems(), 0);
      case "kkkk":
        return Be(s);
      case "kk":
        return Be(f, Ad);
      case "W":
        return Be(a);
      case "WW":
        return Be(r);
      case "E":
      case "c":
        return Be(n);
      case "EEE":
        return Cn(t.weekdays("short", false), 1);
      case "EEEE":
        return Cn(t.weekdays("long", false), 1);
      case "ccc":
        return Cn(t.weekdays("short", true), 1);
      case "cccc":
        return Cn(t.weekdays("long", true), 1);
      case "Z":
      case "ZZ":
        return Ub(new RegExp(`([+-]${a.source})(?::(${r.source}))?`), 2);
      case "ZZZ":
        return Ub(new RegExp(`([+-]${a.source})(${r.source})?`), 2);
      case "z":
        return nl(/[a-z_+-/]{1,256}?/i);
      case " ":
        return nl(/[^\S\n\r]/);
      default:
        return v(k);
    }
  })(e4) || { invalidReason: ix };
  return y.token = e4, y;
}
const cx = { year: { "2-digit": "yy", numeric: "yyyyy" }, month: { numeric: "M", "2-digit": "MM", short: "MMM", long: "MMMM" }, day: { numeric: "d", "2-digit": "dd" }, weekday: { short: "EEE", long: "EEEE" }, dayperiod: "a", dayPeriod: "a", hour12: { numeric: "h", "2-digit": "hh" }, hour24: { numeric: "H", "2-digit": "HH" }, minute: { numeric: "m", "2-digit": "mm" }, second: { numeric: "s", "2-digit": "ss" }, timeZoneName: { long: "ZZZZZ", short: "ZZZ" } };
function ux(e4, t, n) {
  const { type: r, value: i } = e4;
  if (r === "literal") {
    const l = /^\s+$/.test(i);
    return { literal: !l, val: l ? " " : i };
  }
  const s = t[r];
  let o = r;
  r === "hour" && (t.hour12 != null ? o = t.hour12 ? "hour12" : "hour24" : t.hourCycle != null ? t.hourCycle === "h11" || t.hourCycle === "h12" ? o = "hour12" : o = "hour24" : o = n.hour12 ? "hour12" : "hour24");
  let a = cx[o];
  if (typeof a == "object" && (a = a[s]), a) return { literal: false, val: a };
}
function dx(e4) {
  return [`^${e4.map((n) => n.regex).reduce((n, r) => `${n}(${r.source})`, "")}$`, e4];
}
function fx(e4, t, n) {
  const r = e4.match(t);
  if (r) {
    const i = {};
    let s = 1;
    for (const o in n) if (Fi(n, o)) {
      const a = n[o], l = a.groups ? a.groups + 1 : 1;
      !a.literal && a.token && (i[a.token.val[0]] = a.deser(r.slice(s, s + l))), s += l;
    }
    return [r, i];
  } else return [r, {}];
}
function hx(e4) {
  const t = (s) => {
    switch (s) {
      case "S":
        return "millisecond";
      case "s":
        return "second";
      case "m":
        return "minute";
      case "h":
      case "H":
        return "hour";
      case "d":
        return "day";
      case "o":
        return "ordinal";
      case "L":
      case "M":
        return "month";
      case "y":
        return "year";
      case "E":
      case "c":
        return "weekday";
      case "W":
        return "weekNumber";
      case "k":
        return "weekYear";
      case "q":
        return "quarter";
      default:
        return null;
    }
  };
  let n = null, r;
  return be(e4.z) || (n = lr.create(e4.z)), be(e4.Z) || (n || (n = new Ht(e4.Z)), r = e4.Z), be(e4.q) || (e4.M = (e4.q - 1) * 3 + 1), be(e4.h) || (e4.h < 12 && e4.a === 1 ? e4.h += 12 : e4.h === 12 && e4.a === 0 && (e4.h = 0)), e4.G === 0 && e4.y && (e4.y = -e4.y), be(e4.u) || (e4.S = Sd(e4.u)), [Object.keys(e4).reduce((s, o) => {
    const a = t(o);
    return a && (s[a] = e4[o]), s;
  }, {}), n, r];
}
let _d = null;
function vx() {
  return _d || (_d = we.fromMillis(1555555555555)), _d;
}
function px(e4, t) {
  if (e4.literal) return e4;
  const n = Lt.macroTokenToFormatOpts(e4.val), r = Wb(n, t);
  return r == null || r.includes(void 0) ? e4 : r;
}
function Vb(e4, t) {
  return Array.prototype.concat(...e4.map((n) => px(n, t)));
}
class Hb {
  constructor(t, n) {
    if (this.locale = t, this.format = n, this.tokens = Vb(Lt.parseFormat(n), t), this.units = this.tokens.map((r) => lx(r, t)), this.disqualifyingUnit = this.units.find((r) => r.invalidReason), !this.disqualifyingUnit) {
      const [r, i] = dx(this.units);
      this.regex = RegExp(r, "i"), this.handlers = i;
    }
  }
  explainFromTokens(t) {
    if (this.isValid) {
      const [n, r] = fx(t, this.regex, this.handlers), [i, s, o] = r ? hx(r) : [null, null, void 0];
      if (Fi(r, "a") && Fi(r, "H")) throw new Li("Can't include meridiem when specifying 24-hour format");
      return { input: t, tokens: this.tokens, regex: this.regex, rawMatches: n, matches: r, result: i, zone: s, specificOffset: o };
    } else return { input: t, tokens: this.tokens, invalidReason: this.invalidReason };
  }
  get isValid() {
    return !this.disqualifyingUnit;
  }
  get invalidReason() {
    return this.disqualifyingUnit ? this.disqualifyingUnit.invalidReason : null;
  }
}
function qb(e4, t, n) {
  return new Hb(e4, n).explainFromTokens(t);
}
function mx(e4, t, n) {
  const { result: r, zone: i, specificOffset: s, invalidReason: o } = qb(e4, t, n);
  return [r, i, s, o];
}
function Wb(e4, t) {
  if (!e4) return null;
  const r = Lt.create(t, e4).dtFormatter(vx()), i = r.formatToParts(), s = r.resolvedOptions();
  return i.map((o) => ux(o, e4, s));
}
const Od = "Invalid DateTime", Gb = 864e13;
function co(e4) {
  return new Nn("unsupported zone", `the zone "${e4.name}" is not supported`);
}
function Pd(e4) {
  return e4.weekData === null && (e4.weekData = Za(e4.c)), e4.weekData;
}
function xd(e4) {
  return e4.localWeekData === null && (e4.localWeekData = Za(e4.c, e4.loc.getMinDaysInFirstWeek(), e4.loc.getStartOfWeek())), e4.localWeekData;
}
function ei(e4, t) {
  const n = { ts: e4.ts, zone: e4.zone, c: e4.c, o: e4.o, loc: e4.loc, invalid: e4.invalid };
  return new we({ ...n, ...t, old: n });
}
function Zb(e4, t, n) {
  let r = e4 - t * 60 * 1e3;
  const i = n.offset(r);
  if (t === i) return [r, t];
  r -= (i - t) * 60 * 1e3;
  const s = n.offset(r);
  return i === s ? [r, i] : [e4 - Math.min(i, s) * 60 * 1e3, Math.max(i, s)];
}
function rl(e4, t) {
  e4 += t * 60 * 1e3;
  const n = new Date(e4);
  return { year: n.getUTCFullYear(), month: n.getUTCMonth() + 1, day: n.getUTCDate(), hour: n.getUTCHours(), minute: n.getUTCMinutes(), second: n.getUTCSeconds(), millisecond: n.getUTCMilliseconds() };
}
function il(e4, t, n) {
  return Zb(Xa(e4), t, n);
}
function Kb(e4, t) {
  const n = e4.o, r = e4.c.year + Math.trunc(t.years), i = e4.c.month + Math.trunc(t.months) + Math.trunc(t.quarters) * 3, s = { ...e4.c, year: r, month: i, day: Math.min(e4.c.day, Ya(r, i)) + Math.trunc(t.days) + Math.trunc(t.weeks) * 7 }, o = Ie.fromObject({ years: t.years - Math.trunc(t.years), quarters: t.quarters - Math.trunc(t.quarters), months: t.months - Math.trunc(t.months), weeks: t.weeks - Math.trunc(t.weeks), days: t.days - Math.trunc(t.days), hours: t.hours, minutes: t.minutes, seconds: t.seconds, milliseconds: t.milliseconds }).as("milliseconds"), a = Xa(s);
  let [l, u] = Zb(a, n, e4.zone);
  return o !== 0 && (l += o, u = e4.zone.offset(l)), { ts: l, o: u };
}
function Wi(e4, t, n, r, i, s) {
  const { setZone: o, zone: a } = n;
  if (e4 && Object.keys(e4).length !== 0 || t) {
    const l = t || a, u = we.fromObject(e4, { ...n, zone: l, specificOffset: s });
    return o ? u : u.setZone(a);
  } else return we.invalid(new Nn("unparsable", `the input "${i}" can't be parsed as ${r}`));
}
function sl(e4, t, n = true) {
  return e4.isValid ? Lt.create(Ue.create("en-US"), { allowZ: n, forceSimple: true }).formatDateTimeFromString(e4, t) : null;
}
function Rd(e4, t, n) {
  const r = e4.c.year > 9999 || e4.c.year < 0;
  let i = "";
  if (r && e4.c.year >= 0 && (i += "+"), i += pt(e4.c.year, r ? 6 : 4), n === "year") return i;
  if (t) {
    if (i += "-", i += pt(e4.c.month), n === "month") return i;
    i += "-";
  } else if (i += pt(e4.c.month), n === "month") return i;
  return i += pt(e4.c.day), i;
}
function Yb(e4, t, n, r, i, s, o) {
  let a = !n || e4.c.millisecond !== 0 || e4.c.second !== 0, l = "";
  switch (o) {
    case "day":
    case "month":
    case "year":
      break;
    default:
      if (l += pt(e4.c.hour), o === "hour") break;
      if (t) {
        if (l += ":", l += pt(e4.c.minute), o === "minute") break;
        a && (l += ":", l += pt(e4.c.second));
      } else {
        if (l += pt(e4.c.minute), o === "minute") break;
        a && (l += pt(e4.c.second));
      }
      if (o === "second") break;
      a && (!r || e4.c.millisecond !== 0) && (l += ".", l += pt(e4.c.millisecond, 3));
  }
  return i && (e4.isOffsetFixed && e4.offset === 0 && !s ? l += "Z" : e4.o < 0 ? (l += "-", l += pt(Math.trunc(-e4.o / 60)), l += ":", l += pt(Math.trunc(-e4.o % 60))) : (l += "+", l += pt(Math.trunc(e4.o / 60)), l += ":", l += pt(Math.trunc(e4.o % 60)))), s && (l += "[" + e4.zone.ianaName + "]"), l;
}
const Xb = { month: 1, day: 1, hour: 0, minute: 0, second: 0, millisecond: 0 }, gx = { weekNumber: 1, weekday: 1, hour: 0, minute: 0, second: 0, millisecond: 0 }, yx = { ordinal: 1, hour: 0, minute: 0, second: 0, millisecond: 0 }, ol = ["year", "month", "day", "hour", "minute", "second", "millisecond"], bx = ["weekYear", "weekNumber", "weekday", "hour", "minute", "second", "millisecond"], kx = ["year", "ordinal", "hour", "minute", "second", "millisecond"];
function al(e4) {
  const t = { year: "year", years: "year", month: "month", months: "month", day: "day", days: "day", hour: "hour", hours: "hour", minute: "minute", minutes: "minute", quarter: "quarter", quarters: "quarter", second: "second", seconds: "second", millisecond: "millisecond", milliseconds: "millisecond", weekday: "weekday", weekdays: "weekday", weeknumber: "weekNumber", weeksnumber: "weekNumber", weeknumbers: "weekNumber", weekyear: "weekYear", weekyears: "weekYear", ordinal: "ordinal" }[e4.toLowerCase()];
  if (!t) throw new Ty(e4);
  return t;
}
function Jb(e4) {
  switch (e4.toLowerCase()) {
    case "localweekday":
    case "localweekdays":
      return "localWeekday";
    case "localweeknumber":
    case "localweeknumbers":
      return "localWeekNumber";
    case "localweekyear":
    case "localweekyears":
      return "localWeekYear";
    default:
      return al(e4);
  }
}
function wx(e4) {
  if (uo === void 0 && (uo = st.now()), e4.type !== "iana") return e4.offset(uo);
  const t = e4.name;
  let n = Md.get(t);
  return n === void 0 && (n = e4.offset(uo), Md.set(t, n)), n;
}
function Qb(e4, t) {
  const n = Pr(t.zone, st.defaultZone);
  if (!n.isValid) return we.invalid(co(n));
  const r = Ue.fromObject(t);
  let i, s;
  if (be(e4.year)) i = st.now();
  else {
    for (const l of ol) be(e4[l]) && (e4[l] = Xb[l]);
    const o = ub(e4) || db(e4);
    if (o) return we.invalid(o);
    const a = wx(n);
    [i, s] = il(e4, a, n);
  }
  return new we({ ts: i, zone: n, loc: r, o: s });
}
function ek(e4, t, n) {
  const r = be(n.round) ? true : n.round, i = be(n.rounding) ? "trunc" : n.rounding, s = (a, l) => (a = Ed(a, r || n.calendary ? 0 : 2, n.calendary ? "round" : i), t.loc.clone(n).relFormatter(n).format(a, l)), o = (a) => n.calendary ? t.hasSame(e4, a) ? 0 : t.startOf(a).diff(e4.startOf(a), a).get(a) : t.diff(e4, a).get(a);
  if (n.unit) return s(o(n.unit), n.unit);
  for (const a of n.units) {
    const l = o(a);
    if (Math.abs(l) >= 1) return s(l, a);
  }
  return s(e4 > t ? -0 : 0, n.units[n.units.length - 1]);
}
function tk(e4) {
  let t = {}, n;
  return e4.length > 0 && typeof e4[e4.length - 1] == "object" ? (t = e4[e4.length - 1], n = Array.from(e4).slice(0, e4.length - 1)) : n = Array.from(e4), [t, n];
}
let uo;
const Md = /* @__PURE__ */ new Map();
class we {
  constructor(t) {
    const n = t.zone || st.defaultZone;
    let r = t.invalid || (Number.isNaN(t.ts) ? new Nn("invalid input") : null) || (n.isValid ? null : co(n));
    this.ts = be(t.ts) ? st.now() : t.ts;
    let i = null, s = null;
    if (!r) if (t.old && t.old.ts === this.ts && t.old.zone.equals(n)) [i, s] = [t.old.c, t.old.o];
    else {
      const a = xr(t.o) && !t.old ? t.o : n.offset(this.ts);
      i = rl(this.ts, a), r = Number.isNaN(i.year) ? new Nn("invalid input") : null, i = r ? null : i, s = r ? null : a;
    }
    this._zone = n, this.loc = t.loc || Ue.create(), this.invalid = r, this.weekData = null, this.localWeekData = null, this.c = i, this.o = s, this.isLuxonDateTime = true;
  }
  static now() {
    return new we({});
  }
  static local() {
    const [t, n] = tk(arguments), [r, i, s, o, a, l, u] = n;
    return Qb({ year: r, month: i, day: s, hour: o, minute: a, second: l, millisecond: u }, t);
  }
  static utc() {
    const [t, n] = tk(arguments), [r, i, s, o, a, l, u] = n;
    return t.zone = Ht.utcInstance, Qb({ year: r, month: i, day: s, hour: o, minute: a, second: l, millisecond: u }, t);
  }
  static fromJSDate(t, n = {}) {
    const r = QO(t) ? t.valueOf() : NaN;
    if (Number.isNaN(r)) return we.invalid("invalid input");
    const i = Pr(n.zone, st.defaultZone);
    return i.isValid ? new we({ ts: r, zone: i, loc: Ue.fromObject(n) }) : we.invalid(co(i));
  }
  static fromMillis(t, n = {}) {
    if (xr(t)) return t < -Gb || t > Gb ? we.invalid("Timestamp out of range") : new we({ ts: t, zone: Pr(n.zone, st.defaultZone), loc: Ue.fromObject(n) });
    throw new It(`fromMillis requires a numerical input, but received a ${typeof t} with value ${t}`);
  }
  static fromSeconds(t, n = {}) {
    if (xr(t)) return new we({ ts: t * 1e3, zone: Pr(n.zone, st.defaultZone), loc: Ue.fromObject(n) });
    throw new It("fromSeconds requires a numerical input");
  }
  static fromObject(t, n = {}) {
    t = t || {};
    const r = Pr(n.zone, st.defaultZone);
    if (!r.isValid) return we.invalid(co(r));
    const i = Ue.fromObject(n), s = Qa(t, Jb), { minDaysInFirstWeek: o, startOfWeek: a } = cb(s, i), l = st.now(), u = be(n.specificOffset) ? r.offset(l) : n.specificOffset, c = !be(s.ordinal), f = !be(s.year), p = !be(s.month) || !be(s.day), v = f || p, m = s.weekYear || s.weekNumber;
    if ((v || c) && m) throw new Li("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
    if (p && c) throw new Li("Can't mix ordinal dates with month/day");
    const y = m || s.weekday && !v;
    let k, E, A = rl(l, u);
    y ? (k = bx, E = gx, A = Za(A, o, a)) : c ? (k = kx, E = yx, A = kd(A)) : (k = ol, E = Xb);
    let C = false;
    for (const q of k) {
      const Q = s[q];
      be(Q) ? C ? s[q] = E[q] : s[q] = A[q] : C = true;
    }
    const x = y ? YO(s, o, a) : c ? XO(s) : ub(s), F = x || db(s);
    if (F) return we.invalid(F);
    const Y = y ? ab(s, o, a) : c ? lb(s) : s, [U, V] = il(Y, u, r), M = new we({ ts: U, zone: r, o: V, loc: i });
    return s.weekday && v && t.weekday !== M.weekday ? we.invalid("mismatched weekday", `you can't specify both a weekday of ${s.weekday} and a date of ${M.toISO()}`) : M.isValid ? M : we.invalid(M.invalid);
  }
  static fromISO(t, n = {}) {
    const [r, i] = UP(t);
    return Wi(r, i, n, "ISO 8601", t);
  }
  static fromRFC2822(t, n = {}) {
    const [r, i] = VP(t);
    return Wi(r, i, n, "RFC 2822", t);
  }
  static fromHTTP(t, n = {}) {
    const [r, i] = HP(t);
    return Wi(r, i, n, "HTTP", n);
  }
  static fromFormat(t, n, r = {}) {
    if (be(t) || be(n)) throw new It("fromFormat requires an input string and a format");
    const { locale: i = null, numberingSystem: s = null } = r, o = Ue.fromOpts({ locale: i, numberingSystem: s, defaultToEN: true }), [a, l, u, c] = mx(o, t, n);
    return c ? we.invalid(c) : Wi(a, l, r, `format ${n}`, t, u);
  }
  static fromString(t, n, r = {}) {
    return we.fromFormat(t, n, r);
  }
  static fromSQL(t, n = {}) {
    const [r, i] = XP(t);
    return Wi(r, i, n, "SQL", t);
  }
  static invalid(t, n = null) {
    if (!t) throw new It("need to specify a reason the DateTime is invalid");
    const r = t instanceof Nn ? t : new Nn(t, n);
    if (st.throwOnInvalid) throw new AO(r);
    return new we({ invalid: r });
  }
  static isDateTime(t) {
    return t && t.isLuxonDateTime || false;
  }
  static parseFormatForOpts(t, n = {}) {
    const r = Wb(t, Ue.fromObject(n));
    return r ? r.map((i) => i ? i.val : null).join("") : null;
  }
  static expandFormat(t, n = {}) {
    return Vb(Lt.parseFormat(t), Ue.fromObject(n)).map((i) => i.val).join("");
  }
  static resetCache() {
    uo = void 0, Md.clear();
  }
  get(t) {
    return this[t];
  }
  get isValid() {
    return this.invalid === null;
  }
  get invalidReason() {
    return this.invalid ? this.invalid.reason : null;
  }
  get invalidExplanation() {
    return this.invalid ? this.invalid.explanation : null;
  }
  get locale() {
    return this.isValid ? this.loc.locale : null;
  }
  get numberingSystem() {
    return this.isValid ? this.loc.numberingSystem : null;
  }
  get outputCalendar() {
    return this.isValid ? this.loc.outputCalendar : null;
  }
  get zone() {
    return this._zone;
  }
  get zoneName() {
    return this.isValid ? this.zone.name : null;
  }
  get year() {
    return this.isValid ? this.c.year : NaN;
  }
  get quarter() {
    return this.isValid ? Math.ceil(this.c.month / 3) : NaN;
  }
  get month() {
    return this.isValid ? this.c.month : NaN;
  }
  get day() {
    return this.isValid ? this.c.day : NaN;
  }
  get hour() {
    return this.isValid ? this.c.hour : NaN;
  }
  get minute() {
    return this.isValid ? this.c.minute : NaN;
  }
  get second() {
    return this.isValid ? this.c.second : NaN;
  }
  get millisecond() {
    return this.isValid ? this.c.millisecond : NaN;
  }
  get weekYear() {
    return this.isValid ? Pd(this).weekYear : NaN;
  }
  get weekNumber() {
    return this.isValid ? Pd(this).weekNumber : NaN;
  }
  get weekday() {
    return this.isValid ? Pd(this).weekday : NaN;
  }
  get isWeekend() {
    return this.isValid && this.loc.getWeekendDays().includes(this.weekday);
  }
  get localWeekday() {
    return this.isValid ? xd(this).weekday : NaN;
  }
  get localWeekNumber() {
    return this.isValid ? xd(this).weekNumber : NaN;
  }
  get localWeekYear() {
    return this.isValid ? xd(this).weekYear : NaN;
  }
  get ordinal() {
    return this.isValid ? kd(this.c).ordinal : NaN;
  }
  get monthShort() {
    return this.isValid ? tl.months("short", { locObj: this.loc })[this.month - 1] : null;
  }
  get monthLong() {
    return this.isValid ? tl.months("long", { locObj: this.loc })[this.month - 1] : null;
  }
  get weekdayShort() {
    return this.isValid ? tl.weekdays("short", { locObj: this.loc })[this.weekday - 1] : null;
  }
  get weekdayLong() {
    return this.isValid ? tl.weekdays("long", { locObj: this.loc })[this.weekday - 1] : null;
  }
  get offset() {
    return this.isValid ? +this.o : NaN;
  }
  get offsetNameShort() {
    return this.isValid ? this.zone.offsetName(this.ts, { format: "short", locale: this.locale }) : null;
  }
  get offsetNameLong() {
    return this.isValid ? this.zone.offsetName(this.ts, { format: "long", locale: this.locale }) : null;
  }
  get isOffsetFixed() {
    return this.isValid ? this.zone.isUniversal : null;
  }
  get isInDST() {
    return this.isOffsetFixed ? false : this.offset > this.set({ month: 1, day: 1 }).offset || this.offset > this.set({ month: 5 }).offset;
  }
  getPossibleOffsets() {
    if (!this.isValid || this.isOffsetFixed) return [this];
    const t = 864e5, n = 6e4, r = Xa(this.c), i = this.zone.offset(r - t), s = this.zone.offset(r + t), o = this.zone.offset(r - i * n), a = this.zone.offset(r - s * n);
    if (o === a) return [this];
    const l = r - o * n, u = r - a * n, c = rl(l, o), f = rl(u, a);
    return c.hour === f.hour && c.minute === f.minute && c.second === f.second && c.millisecond === f.millisecond ? [ei(this, { ts: l }), ei(this, { ts: u })] : [this];
  }
  get isInLeapYear() {
    return io(this.year);
  }
  get daysInMonth() {
    return Ya(this.year, this.month);
  }
  get daysInYear() {
    return this.isValid ? Di(this.year) : NaN;
  }
  get weeksInWeekYear() {
    return this.isValid ? so(this.weekYear) : NaN;
  }
  get weeksInLocalWeekYear() {
    return this.isValid ? so(this.localWeekYear, this.loc.getMinDaysInFirstWeek(), this.loc.getStartOfWeek()) : NaN;
  }
  resolvedLocaleOptions(t = {}) {
    const { locale: n, numberingSystem: r, calendar: i } = Lt.create(this.loc.clone(t), t).resolvedOptions(this);
    return { locale: n, numberingSystem: r, outputCalendar: i };
  }
  toUTC(t = 0, n = {}) {
    return this.setZone(Ht.instance(t), n);
  }
  toLocal() {
    return this.setZone(st.defaultZone);
  }
  setZone(t, { keepLocalTime: n = false, keepCalendarTime: r = false } = {}) {
    if (t = Pr(t, st.defaultZone), t.equals(this.zone)) return this;
    if (t.isValid) {
      let i = this.ts;
      if (n || r) {
        const s = t.offset(this.ts), o = this.toObject();
        [i] = il(o, s, t);
      }
      return ei(this, { ts: i, zone: t });
    } else return we.invalid(co(t));
  }
  reconfigure({ locale: t, numberingSystem: n, outputCalendar: r } = {}) {
    const i = this.loc.clone({ locale: t, numberingSystem: n, outputCalendar: r });
    return ei(this, { loc: i });
  }
  setLocale(t) {
    return this.reconfigure({ locale: t });
  }
  set(t) {
    if (!this.isValid) return this;
    const n = Qa(t, Jb), { minDaysInFirstWeek: r, startOfWeek: i } = cb(n, this.loc), s = !be(n.weekYear) || !be(n.weekNumber) || !be(n.weekday), o = !be(n.ordinal), a = !be(n.year), l = !be(n.month) || !be(n.day), u = a || l, c = n.weekYear || n.weekNumber;
    if ((u || o) && c) throw new Li("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
    if (l && o) throw new Li("Can't mix ordinal dates with month/day");
    let f;
    s ? f = ab({ ...Za(this.c, r, i), ...n }, r, i) : be(n.ordinal) ? (f = { ...this.toObject(), ...n }, be(n.day) && (f.day = Math.min(Ya(f.year, f.month), f.day))) : f = lb({ ...kd(this.c), ...n });
    const [p, v] = il(f, this.o, this.zone);
    return ei(this, { ts: p, o: v });
  }
  plus(t) {
    if (!this.isValid) return this;
    const n = Ie.fromDurationLike(t);
    return ei(this, Kb(this, n));
  }
  minus(t) {
    if (!this.isValid) return this;
    const n = Ie.fromDurationLike(t).negate();
    return ei(this, Kb(this, n));
  }
  startOf(t, { useLocaleWeeks: n = false } = {}) {
    if (!this.isValid) return this;
    const r = {}, i = Ie.normalizeUnit(t);
    switch (i) {
      case "years":
        r.month = 1;
      case "quarters":
      case "months":
        r.day = 1;
      case "weeks":
      case "days":
        r.hour = 0;
      case "hours":
        r.minute = 0;
      case "minutes":
        r.second = 0;
      case "seconds":
        r.millisecond = 0;
        break;
    }
    if (i === "weeks") if (n) {
      const s = this.loc.getStartOfWeek(), { weekday: o } = this;
      o < s && (r.weekNumber = this.weekNumber - 1), r.weekday = s;
    } else r.weekday = 1;
    if (i === "quarters") {
      const s = Math.ceil(this.month / 3);
      r.month = (s - 1) * 3 + 1;
    }
    return this.set(r);
  }
  endOf(t, n) {
    return this.isValid ? this.plus({ [t]: 1 }).startOf(t, n).minus(1) : this;
  }
  toFormat(t, n = {}) {
    return this.isValid ? Lt.create(this.loc.redefaultToEN(n)).formatDateTimeFromString(this, t) : Od;
  }
  toLocaleString(t = Wa, n = {}) {
    return this.isValid ? Lt.create(this.loc.clone(n), t).formatDateTime(this) : Od;
  }
  toLocaleParts(t = {}) {
    return this.isValid ? Lt.create(this.loc.clone(t), t).formatDateTimeParts(this) : [];
  }
  toISO({ format: t = "extended", suppressSeconds: n = false, suppressMilliseconds: r = false, includeOffset: i = true, extendedZone: s = false, precision: o = "milliseconds" } = {}) {
    if (!this.isValid) return null;
    o = al(o);
    const a = t === "extended";
    let l = Rd(this, a, o);
    return ol.indexOf(o) >= 3 && (l += "T"), l += Yb(this, a, n, r, i, s, o), l;
  }
  toISODate({ format: t = "extended", precision: n = "day" } = {}) {
    return this.isValid ? Rd(this, t === "extended", al(n)) : null;
  }
  toISOWeekDate() {
    return sl(this, "kkkk-'W'WW-c");
  }
  toISOTime({ suppressMilliseconds: t = false, suppressSeconds: n = false, includeOffset: r = true, includePrefix: i = false, extendedZone: s = false, format: o = "extended", precision: a = "milliseconds" } = {}) {
    return this.isValid ? (a = al(a), (i && ol.indexOf(a) >= 3 ? "T" : "") + Yb(this, o === "extended", n, t, r, s, a)) : null;
  }
  toRFC2822() {
    return sl(this, "EEE, dd LLL yyyy HH:mm:ss ZZZ", false);
  }
  toHTTP() {
    return sl(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'");
  }
  toSQLDate() {
    return this.isValid ? Rd(this, true) : null;
  }
  toSQLTime({ includeOffset: t = true, includeZone: n = false, includeOffsetSpace: r = true } = {}) {
    let i = "HH:mm:ss.SSS";
    return (n || t) && (r && (i += " "), n ? i += "z" : t && (i += "ZZ")), sl(this, i, true);
  }
  toSQL(t = {}) {
    return this.isValid ? `${this.toSQLDate()} ${this.toSQLTime(t)}` : null;
  }
  toString() {
    return this.isValid ? this.toISO() : Od;
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.isValid ? `DateTime { ts: ${this.toISO()}, zone: ${this.zone.name}, locale: ${this.locale} }` : `DateTime { Invalid, reason: ${this.invalidReason} }`;
  }
  valueOf() {
    return this.toMillis();
  }
  toMillis() {
    return this.isValid ? this.ts : NaN;
  }
  toSeconds() {
    return this.isValid ? this.ts / 1e3 : NaN;
  }
  toUnixInteger() {
    return this.isValid ? Math.floor(this.ts / 1e3) : NaN;
  }
  toJSON() {
    return this.toISO();
  }
  toBSON() {
    return this.toJSDate();
  }
  toObject(t = {}) {
    if (!this.isValid) return {};
    const n = { ...this.c };
    return t.includeConfig && (n.outputCalendar = this.outputCalendar, n.numberingSystem = this.loc.numberingSystem, n.locale = this.loc.locale), n;
  }
  toJSDate() {
    return new Date(this.isValid ? this.ts : NaN);
  }
  diff(t, n = "milliseconds", r = {}) {
    if (!this.isValid || !t.isValid) return Ie.invalid("created by diffing an invalid DateTime");
    const i = { locale: this.locale, numberingSystem: this.numberingSystem, ...r }, s = eP(n).map(Ie.normalizeUnit), o = t.valueOf() > this.valueOf(), a = o ? this : t, l = o ? t : this, u = rx(a, l, s, i);
    return o ? u.negate() : u;
  }
  diffNow(t = "milliseconds", n = {}) {
    return this.diff(we.now(), t, n);
  }
  until(t) {
    return this.isValid ? lt.fromDateTimes(this, t) : this;
  }
  hasSame(t, n, r) {
    if (!this.isValid) return false;
    const i = t.valueOf(), s = this.setZone(t.zone, { keepLocalTime: true });
    return s.startOf(n, r) <= i && i <= s.endOf(n, r);
  }
  equals(t) {
    return this.isValid && t.isValid && this.valueOf() === t.valueOf() && this.zone.equals(t.zone) && this.loc.equals(t.loc);
  }
  toRelative(t = {}) {
    if (!this.isValid) return null;
    const n = t.base || we.fromObject({}, { zone: this.zone }), r = t.padding ? this < n ? -t.padding : t.padding : 0;
    let i = ["years", "months", "days", "hours", "minutes", "seconds"], s = t.unit;
    return Array.isArray(t.unit) && (i = t.unit, s = void 0), ek(n, this.plus(r), { ...t, numeric: "always", units: i, unit: s });
  }
  toRelativeCalendar(t = {}) {
    return this.isValid ? ek(t.base || we.fromObject({}, { zone: this.zone }), this, { ...t, numeric: "auto", units: ["years", "months", "days"], calendary: true }) : null;
  }
  static min(...t) {
    if (!t.every(we.isDateTime)) throw new It("min requires all arguments be DateTimes");
    return vb(t, (n) => n.valueOf(), Math.min);
  }
  static max(...t) {
    if (!t.every(we.isDateTime)) throw new It("max requires all arguments be DateTimes");
    return vb(t, (n) => n.valueOf(), Math.max);
  }
  static fromFormatExplain(t, n, r = {}) {
    const { locale: i = null, numberingSystem: s = null } = r, o = Ue.fromOpts({ locale: i, numberingSystem: s, defaultToEN: true });
    return qb(o, t, n);
  }
  static fromStringExplain(t, n, r = {}) {
    return we.fromFormatExplain(t, n, r);
  }
  static buildFormatParser(t, n = {}) {
    const { locale: r = null, numberingSystem: i = null } = n, s = Ue.fromOpts({ locale: r, numberingSystem: i, defaultToEN: true });
    return new Hb(s, t);
  }
  static fromFormatParser(t, n, r = {}) {
    if (be(t) || be(n)) throw new It("fromFormatParser requires an input string and a format parser");
    const { locale: i = null, numberingSystem: s = null } = r, o = Ue.fromOpts({ locale: i, numberingSystem: s, defaultToEN: true });
    if (!o.equals(n.locale)) throw new It(`fromFormatParser called with a locale of ${o}, but the format parser was created for ${n.locale}`);
    const { result: a, zone: l, specificOffset: u, invalidReason: c } = n.explainFromTokens(t);
    return c ? we.invalid(c) : Wi(a, l, r, `format ${n.format}`, t, u);
  }
  static get DATE_SHORT() {
    return Wa;
  }
  static get DATE_MED() {
    return Ny;
  }
  static get DATE_MED_WITH_WEEKDAY() {
    return CO;
  }
  static get DATE_FULL() {
    return Cy;
  }
  static get DATE_HUGE() {
    return _y;
  }
  static get TIME_SIMPLE() {
    return Oy;
  }
  static get TIME_WITH_SECONDS() {
    return Py;
  }
  static get TIME_WITH_SHORT_OFFSET() {
    return xy;
  }
  static get TIME_WITH_LONG_OFFSET() {
    return Ry;
  }
  static get TIME_24_SIMPLE() {
    return My;
  }
  static get TIME_24_WITH_SECONDS() {
    return jy;
  }
  static get TIME_24_WITH_SHORT_OFFSET() {
    return Iy;
  }
  static get TIME_24_WITH_LONG_OFFSET() {
    return Ly;
  }
  static get DATETIME_SHORT() {
    return Fy;
  }
  static get DATETIME_SHORT_WITH_SECONDS() {
    return Dy;
  }
  static get DATETIME_MED() {
    return By;
  }
  static get DATETIME_MED_WITH_SECONDS() {
    return zy;
  }
  static get DATETIME_MED_WITH_WEEKDAY() {
    return _O;
  }
  static get DATETIME_FULL() {
    return $y;
  }
  static get DATETIME_FULL_WITH_SECONDS() {
    return Uy;
  }
  static get DATETIME_HUGE() {
    return Vy;
  }
  static get DATETIME_HUGE_WITH_SECONDS() {
    return Hy;
  }
}
function fo(e4) {
  if (we.isDateTime(e4)) return e4;
  if (e4 && e4.valueOf && xr(e4.valueOf())) return we.fromJSDate(e4);
  if (e4 && typeof e4 == "object") return we.fromObject(e4);
  throw new It(`Unknown datetime argument: ${e4}, of type ${typeof e4}`);
}
const nk = bu ? window : void 0;
function ho(e4) {
  var t;
  const n = ot(e4);
  return (t = n?.$el) != null ? t : n;
}
function ll(...e4) {
  const t = [], n = () => {
    t.forEach((a) => a()), t.length = 0;
  }, r = (a, l, u, c) => (a.addEventListener(l, u, c), () => a.removeEventListener(l, u, c)), i = ke(() => {
    const a = ir(ot(e4[0])).filter((l) => l != null);
    return a.every((l) => typeof l != "string") ? a : void 0;
  }), s = xm(() => {
    var a, l;
    return [(l = (a = i.value) == null ? void 0 : a.map((u) => ho(u))) != null ? l : [nk].filter((u) => u != null), ir(ot(i.value ? e4[1] : e4[0])), ir(xn(i.value ? e4[2] : e4[1])), ot(i.value ? e4[3] : e4[2])];
  }, ([a, l, u, c]) => {
    if (n(), !a?.length || !l?.length || !u?.length) return;
    const f = _m(c) ? { ...c } : c;
    t.push(...a.flatMap((p) => l.flatMap((v) => u.map((m) => r(p, v, m, f)))));
  }, { flush: "post" }), o = () => {
    s(), n();
  };
  return wr(n), o;
}
let rk = false;
function ik(e4, t, n = {}) {
  const { window: r = nk, ignore: i = [], capture: s = true, detectIframe: o = false, controls: a = false } = n;
  if (!r) return a ? { stop: bn, cancel: bn, trigger: bn } : bn;
  if (ku && !rk) {
    rk = true;
    const k = { passive: true };
    Array.from(r.document.body.children).forEach((E) => E.addEventListener("click", bn, k)), r.document.documentElement.addEventListener("click", bn, k);
  }
  let l = true;
  const u = (k) => ot(i).some((E) => {
    if (typeof E == "string") return Array.from(r.document.querySelectorAll(E)).some((A) => A === k.target || k.composedPath().includes(A));
    {
      const A = ho(E);
      return A && (k.target === A || k.composedPath().includes(A));
    }
  });
  function c(k) {
    const E = ot(k);
    return E && E.$.subTree.shapeFlag === 16;
  }
  function f(k, E) {
    const A = ot(k), C = A.$.subTree && A.$.subTree.children;
    return C == null || !Array.isArray(C) ? false : C.some((x) => x.el === E.target || E.composedPath().includes(x.el));
  }
  const p = (k) => {
    const E = ho(e4);
    if (k.target != null && !(!(E instanceof Element) && c(e4) && f(e4, k)) && !(!E || E === k.target || k.composedPath().includes(E))) {
      if ("detail" in k && k.detail === 0 && (l = !u(k)), !l) {
        l = true;
        return;
      }
      t(k);
    }
  };
  let v = false;
  const m = [ll(r, "click", (k) => {
    v || (v = true, setTimeout(() => {
      v = false;
    }, 0), p(k));
  }, { passive: true, capture: s }), ll(r, "pointerdown", (k) => {
    const E = ho(e4);
    l = !u(k) && !!(E && !k.composedPath().includes(E));
  }, { passive: true }), o && ll(r, "blur", (k) => {
    setTimeout(() => {
      var E;
      const A = ho(e4);
      ((E = r.document.activeElement) == null ? void 0 : E.tagName) === "IFRAME" && !A?.contains(r.document.activeElement) && t(k);
    }, 0);
  }, { passive: true })].filter(Boolean), y = () => m.forEach((k) => k());
  return a ? { stop: y, cancel: () => {
    l = false;
  }, trigger: (k) => {
    l = true, p(k), l = false;
  } } : y;
}
const jd = /* @__PURE__ */ new WeakMap(), sk = { mounted(e4, t) {
  const n = !t.modifiers.bubble;
  let r;
  if (typeof t.value == "function") r = ik(e4, t.value, { capture: n });
  else {
    const [i, s] = t.value;
    r = ik(e4, i, Object.assign({ capture: n }, s));
  }
  jd.set(e4, r);
}, unmounted(e4) {
  const t = jd.get(e4);
  t && typeof t == "function" ? t() : t?.stop(), jd.delete(e4);
} };
function Id(e4) {
  return typeof Window < "u" && e4 instanceof Window ? e4.document.documentElement : typeof Document < "u" && e4 instanceof Document ? e4.documentElement : e4;
}
function ok(e4) {
  const t = window.getComputedStyle(e4);
  if (t.overflowX === "scroll" || t.overflowY === "scroll" || t.overflowX === "auto" && e4.clientWidth < e4.scrollWidth || t.overflowY === "auto" && e4.clientHeight < e4.scrollHeight) return true;
  {
    const n = e4.parentNode;
    return !n || n.tagName === "BODY" ? false : ok(n);
  }
}
function Sx(e4) {
  const t = e4 || window.event, n = t.target;
  return ok(n) ? false : t.touches.length > 1 ? true : (t.preventDefault && t.preventDefault(), false);
}
const Ld = /* @__PURE__ */ new WeakMap();
function Ex(e4, t = false) {
  const n = Qe(t);
  let r = null, i = "";
  ft(nT(e4), (a) => {
    const l = Id(ot(a));
    if (l) {
      const u = l;
      if (Ld.get(u) || Ld.set(u, u.style.overflow), u.style.overflow !== "hidden" && (i = u.style.overflow), u.style.overflow === "hidden") return n.value = true;
      if (n.value) return u.style.overflow = "hidden";
    }
  }, { immediate: true });
  const s = () => {
    const a = Id(ot(e4));
    !a || n.value || (ku && (r = ll(a, "touchmove", (l) => {
      Sx(l);
    }, { passive: false })), a.style.overflow = "hidden", n.value = true);
  }, o = () => {
    const a = Id(ot(e4));
    !a || !n.value || (ku && r?.(), a.style.overflow = i, Ld.delete(a), n.value = false);
  };
  return wr(o), ke({ get() {
    return n.value;
  }, set(a) {
    a ? s() : o();
  } });
}
function Ax() {
  let e4 = false;
  const t = Qe(false);
  return (n, r) => {
    if (t.value = r.value, e4) return;
    e4 = true;
    const i = Ex(n, r.value);
    ft(t, (s) => i.value = s);
  };
}
Ax();
const ak = { beforeUpdate() {
  this.text = this.getText();
}, data() {
  return { text: this.getText() };
}, computed: { isLongText() {
  return this.text && this.text.trim().length > 20;
} }, methods: { getText() {
  return this.$slots.default?.()[0].children?.trim?.() || "";
} } }, cl = { mixins: [ak], props: { icon: { type: String, default: "" }, name: { type: String, default: "" }, title: { type: String, default: "" }, closeAfterClick: { type: Boolean, default: false }, ariaLabel: { type: String, default: null } }, inject: { closeMenu: { from: Ig } }, emits: ["click"], created() {
  "ariaHidden" in this.$attrs;
}, computed: { isIconUrl() {
  try {
    return !!new URL(this.icon, this.icon.startsWith("/") ? window.location.origin : void 0);
  } catch {
    return false;
  }
} }, methods: { onClick(e4) {
  this.$emit("click", e4), this.closeAfterClick && this.closeMenu(false);
} } }, Tx = { name: "NcActionButton", components: { NcIconSvgWrapper: Ma }, mixins: [cl], inject: { isInSemanticMenu: { from: Mi, default: false } }, props: { disabled: { type: Boolean, default: false }, isMenu: { type: Boolean, default: false }, type: { type: String, default: "button", validator: (e4) => ["button", "checkbox", "radio", "reset", "submit"].includes(e4) }, modelValue: { type: [Boolean, String], default: null }, value: { type: String, default: null }, description: { type: String, default: "" } }, emits: ["update:modelValue"], setup() {
  return { mdiCheck: Lm, mdiChevronRight: Eu };
}, computed: { isFocusable() {
  return !this.disabled;
}, isChecked() {
  return this.type === "radio" && typeof this.modelValue != "boolean" ? this.modelValue === this.value : this.modelValue;
}, nativeType() {
  return this.type === "submit" || this.type === "reset" ? this.type : "button";
}, buttonAttributes() {
  const e4 = {};
  return this.isInSemanticMenu ? (e4.role = "menuitem", this.type === "radio" ? (e4.role = "menuitemradio", e4["aria-checked"] = this.isChecked ? "true" : "false") : (this.type === "checkbox" || this.nativeType === "button" && this.modelValue !== null) && (e4.role = "menuitemcheckbox", e4["aria-checked"] = this.modelValue === null ? "mixed" : this.modelValue ? "true" : "false")) : this.modelValue !== null && this.nativeType === "button" && (e4["aria-pressed"] = this.modelValue ? "true" : "false"), e4;
} }, methods: { handleClick(e4) {
  this.onClick(e4), (this.modelValue !== null || this.type !== "button") && (this.type === "radio" ? typeof this.modelValue != "boolean" ? this.isChecked || this.$emit("update:modelValue", this.value) : this.$emit("update:modelValue", !this.isChecked) : this.$emit("update:modelValue", !this.isChecked));
} } }, Nx = ["role"], Cx = ["aria-label", "disabled", "title", "type"], _x = { class: "action-button__longtext-wrapper" }, Ox = { key: 0, class: "action-button__name" }, Px = ["textContent"], xx = { key: 2, class: "action-button__text" }, Rx = ["textContent"], Mx = { key: 2, class: "action-button__pressed-icon material-design-icon" };
function jx(e4, t, n, r, i, s) {
  const o = dt("NcIconSvgWrapper");
  return oe(), pe("li", { class: yt(["action", { "action--disabled": n.disabled }]), role: s.isInSemanticMenu && "presentation" }, [Ae("button", mn({ "aria-label": e4.ariaLabel, class: ["action-button button-vue", { "action-button--active": s.isChecked, focusable: s.isFocusable }], disabled: n.disabled, title: e4.title, type: s.nativeType }, s.buttonAttributes, { onClick: t[0] || (t[0] = (...a) => s.handleClick && s.handleClick(...a)) }), [Mt(e4.$slots, "icon", {}, () => [Ae("span", { class: yt([[e4.isIconUrl ? "action-button__icon--url" : e4.icon], "action-button__icon"]), style: Pt({ backgroundImage: e4.isIconUrl ? `url(${e4.icon})` : null }), "aria-hidden": "true" }, null, 6)], true), Ae("span", _x, [e4.name ? (oe(), pe("strong", Ox, qe(e4.name), 1)) : Xe("", true), e4.isLongText ? (oe(), pe("span", { key: 1, class: "action-button__longtext", textContent: qe(e4.text) }, null, 8, Px)) : (oe(), pe("span", xx, qe(e4.text), 1)), n.description ? (oe(), pe("span", { key: 3, class: "action-button__description", textContent: qe(n.description) }, null, 8, Rx)) : Xe("", true)]), n.isMenu ? (oe(), at(o, { key: 0, class: "action-button__menu-icon", directional: "", path: r.mdiChevronRight }, null, 8, ["path"])) : s.isChecked ? (oe(), at(o, { key: 1, path: r.mdiCheck, class: "action-button__pressed-icon" }, null, 8, ["path"])) : s.isChecked === false ? (oe(), pe("span", Mx)) : Xe("", true), Xe("", true)], 16, Cx)], 10, Nx);
}
const lk = Nt(Tx, [["render", jx], ["__scopeId", "data-v-76892c52"]]), Ix = { name: "NcActionLink", mixins: [cl], inject: { isInSemanticMenu: { from: Mi, default: false } }, props: { href: { type: String, default: "#", required: true, validator: (e4) => {
  try {
    return new URL(e4);
  } catch {
    return e4.startsWith("#") || e4.startsWith("/");
  }
} }, download: { type: String, default: null }, target: { type: String, default: "_self", validator: (e4) => e4 && (!e4.startsWith("_") || ["_blank", "_self", "_parent", "_top"].indexOf(e4) > -1) }, title: { type: String, default: null } } }, Lx = ["role"], Fx = ["download", "href", "aria-label", "target", "title", "role"], Dx = { key: 0, class: "action-link__longtext-wrapper" }, Bx = { class: "action-link__name" }, zx = ["textContent"], $x = ["textContent"], Ux = { key: 2, class: "action-link__text" };
function Vx(e4, t, n, r, i, s) {
  return oe(), pe("li", { class: "action", role: s.isInSemanticMenu && "presentation" }, [Ae("a", { download: n.download, href: n.href, "aria-label": e4.ariaLabel, target: n.target, title: n.title, class: "action-link focusable", rel: "nofollow noreferrer noopener", role: s.isInSemanticMenu && "menuitem", onClick: t[0] || (t[0] = (...o) => e4.onClick && e4.onClick(...o)) }, [Mt(e4.$slots, "icon", {}, () => [Ae("span", { class: yt([[e4.isIconUrl ? "action-link__icon--url" : e4.icon], "action-link__icon"]), style: Pt({ backgroundImage: e4.isIconUrl ? `url(${e4.icon})` : null }), "aria-hidden": "true" }, null, 6)], true), e4.name ? (oe(), pe("span", Dx, [Ae("strong", Bx, qe(e4.name), 1), t[1] || (t[1] = Ae("br", null, null, -1)), Ae("span", { class: "action-link__longtext", textContent: qe(e4.text) }, null, 8, zx)])) : e4.isLongText ? (oe(), pe("span", { key: 1, class: "action-link__longtext", textContent: qe(e4.text) }, null, 8, $x)) : (oe(), pe("span", Ux, qe(e4.text), 1)), Xe("", true)], 8, Fx)], 8, Lx);
}
const Hx = Nt(Ix, [["render", Vx], ["__scopeId", "data-v-786624ec"]]), qx = { name: "NcActionRouter", mixins: [cl], inject: { isInSemanticMenu: { from: Mi, default: false } }, props: { to: { type: [String, Object], default: "", required: true } } }, Wx = ["role"], Gx = { key: 0, class: "action-router__longtext-wrapper" }, Zx = { class: "action-router__name" }, Kx = ["textContent"], Yx = ["textContent"], Xx = { key: 2, class: "action-router__text" };
function Jx(e4, t, n, r, i, s) {
  const o = dt("RouterLink");
  return oe(), pe("li", { class: "action", role: s.isInSemanticMenu && "presentation" }, [xe(o, { to: n.to, "aria-label": e4.ariaLabel, title: e4.title, class: "action-router focusable", rel: "nofollow noreferrer noopener", role: s.isInSemanticMenu && "menuitem", onClick: e4.onClick }, { default: et(() => [Mt(e4.$slots, "icon", {}, () => [Ae("span", { class: yt([[e4.isIconUrl ? "action-router__icon--url" : e4.icon], "action-router__icon"]), style: Pt({ backgroundImage: e4.isIconUrl ? `url(${e4.icon})` : null }), "aria-hidden": "true" }, null, 6)], true), e4.name ? (oe(), pe("span", Gx, [Ae("strong", Zx, qe(e4.name), 1), t[0] || (t[0] = Ae("br", null, null, -1)), Ae("span", { class: "action-router__longtext", textContent: qe(e4.text) }, null, 8, Kx)])) : e4.isLongText ? (oe(), pe("span", { key: 1, class: "action-router__longtext", textContent: qe(e4.text) }, null, 8, Yx)) : (oe(), pe("span", Xx, qe(e4.text), 1)), Xe("", true)]), _: 3 }, 8, ["to", "aria-label", "title", "role", "onClick"])], 8, Wx);
}
const Qx = Nt(qx, [["render", Jx], ["__scopeId", "data-v-d4dc7cdf"]]), eR = { name: "NcActionText", mixins: [cl], inject: { isInSemanticMenu: { from: Mi, default: false } } }, tR = ["role"], nR = { key: 0, class: "action-text__longtext-wrapper" }, rR = { class: "action-text__name" }, iR = ["textContent"], sR = ["textContent"], oR = { key: 2, class: "action-text__text" };
function aR(e4, t, n, r, i, s) {
  return oe(), pe("li", { class: "action", role: s.isInSemanticMenu && "presentation" }, [Ae("span", { class: "action-text", onClick: t[0] || (t[0] = (...o) => e4.onClick && e4.onClick(...o)) }, [Mt(e4.$slots, "icon", {}, () => [e4.icon !== "" ? (oe(), pe("span", { key: 0, class: yt([[e4.isIconUrl ? "action-text__icon--url" : e4.icon], "action-text__icon"]), "aria-hidden": "true", style: Pt({ backgroundImage: e4.isIconUrl ? `url(${e4.icon})` : null }) }, null, 6)) : Xe("", true)], true), e4.name ? (oe(), pe("span", nR, [Ae("strong", rR, qe(e4.name), 1), Ae("span", { class: "action-text__longtext", textContent: qe(e4.text) }, null, 8, iR)])) : e4.isLongText ? (oe(), pe("span", { key: 1, class: "action-text__longtext", textContent: qe(e4.text) }, null, 8, sR)) : (oe(), pe("span", oR, qe(e4.text), 1)), Xe("", true)])], 8, tR);
}
const lR = Nt(eR, [["render", aR], ["__scopeId", "data-v-de86fa0f"]]);
function ck(e4, t, n) {
  const r = document.querySelector(`#initial-state-${e4}-${t}`);
  if (r === null) {
    if (n !== void 0) return n;
    throw new Error(`Could not find initial state ${t} of ${e4}`);
  }
  try {
    return JSON.parse(atob(r.value));
  } catch {
    throw new Error(`Could not parse initial state ${t} of ${e4}`);
  }
}
function Fd() {
  try {
    return ck("core", "capabilities");
  } catch {
    return console.debug("Could not find capabilities initial state fall back to _oc_capabilities"), "_oc_capabilities" in window ? window._oc_capabilities : {};
  }
}
const Dd = am().detectUser().setApp("@nextcloud/vue").build();
Sr(S1);
const uk = (e4) => {
  switch (e4) {
    case "away":
      return Re("away");
    case "busy":
      return Re("busy");
    case "dnd":
      return Re("do not disturb");
    case "online":
      return Re("online");
    case "invisible":
      return Re("invisible");
    case "offline":
      return Re("offline");
    default:
      return e4;
  }
};
Sr();
const cR = `<!--
  - SPDX-FileCopyrightText: 2020 Google Inc.
  - SPDX-License-Identifier: Apache-2.0
-->
<svg viewBox="0 -960 960 960" width="24px" height="24px" xmlns="http://www.w3.org/2000/svg">
	<path
		fill="var(--color-border-success, var(--color-success))"
		d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/>
</svg>
`, uR = `<!--
  - SPDX-FileCopyrightText: 2020 Google Inc.
  - SPDX-License-Identifier: Apache-2.0
-->
<svg viewBox="0 -960 960 960" width="24px" height="24px" xmlns="http://www.w3.org/2000/svg">
	<path
		fill="var(--color-favorite)"
		d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/>
</svg>
`, dR = `<!--
  - SPDX-FileCopyrightText: 2020 Google Inc.
  - SPDX-License-Identifier: Apache-2.0
-->
<svg viewBox="0 -960 960 960" width="24px" height="24px" xmlns="http://www.w3.org/2000/svg">
	<path
		fill="var(--color-border-error, var(--color-error))"
		d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/>
</svg>
`, fR = `<!--
  - SPDX-FileCopyrightText: 2020 Google Inc.
  - SPDX-License-Identifier: Apache-2.0
-->
<svg viewBox="0 -960 960 960" width="24px" height="24px" xmlns="http://www.w3.org/2000/svg">
	<path
		fill="var(--color-border-error, var(--color-error))"
		d="M280-440h400v-80H280v80ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/>
</svg>
`, dk = `<!--
  - SPDX-FileCopyrightText: 2020 Google Inc.
  - SPDX-License-Identifier: Apache-2.0
-->
<svg viewBox="0 -960 960 960" width="24px" height="24px" xmlns="http://www.w3.org/2000/svg">
	<path
		fill="var(--color-text-maxcontrast)"
		d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
</svg>
`, hR = ["aria-hidden", "aria-label", "innerHTML"], vR = Zt({ __name: "NcUserStatusIcon", props: vh({ user: { default: void 0 }, ariaHidden: { type: [Boolean, String], default: false } }, { status: {}, statusModifiers: {} }), emits: ["update:status"], setup(e4) {
  const t = e4, n = Mh(e4, "status"), r = ke(() => n.value && ["invisible", "offline"].includes(n.value)), i = ke(() => n.value && (!t.ariaHidden || t.ariaHidden === "false") ? Re("User status: {status}", { status: uk(n.value) }) : void 0);
  ft(() => t.user, async (a) => {
    if (!n.value && a && Fd()?.user_status?.enabled) try {
      const { data: l } = await or.get(su("/apps/user_status/api/v1/statuses/{user}", { user: a }));
      n.value = l.ocs?.data?.status;
    } catch (l) {
      Dd.debug("Error while fetching user status", { error: l });
    }
  }, { immediate: true });
  const s = { online: cR, away: uR, busy: dR, dnd: fR, invisible: dk, offline: dk }, o = ke(() => n.value && s[n.value]);
  return (a, l) => n.value ? (oe(), pe("span", { key: 0, class: yt(["user-status-icon", { "user-status-icon--invisible": r.value }]), "aria-hidden": !i.value || void 0, "aria-label": i.value, role: "img", innerHTML: o.value }, null, 10, hR)) : Xe("", true);
} }), pR = Nt(vR, [["__scopeId", "data-v-a911a043"]]);
function vo(e4, t, n) {
  const r = { type: String(e4) };
  return n == null && (typeof t == "string" || Array.isArray(t)) ? n = t : Object.assign(r, t), Array.isArray(n) ? r.children = n : n != null && (r.value = String(n)), r;
}
const Bd = (function(e4) {
  if (e4 == null) return bR;
  if (typeof e4 == "function") return ul(e4);
  if (typeof e4 == "object") return Array.isArray(e4) ? mR(e4) : gR(e4);
  if (typeof e4 == "string") return yR(e4);
  throw new Error("Expected function, string, or object as test");
});
function mR(e4) {
  const t = [];
  let n = -1;
  for (; ++n < e4.length; ) t[n] = Bd(e4[n]);
  return ul(r);
  function r(...i) {
    let s = -1;
    for (; ++s < t.length; ) if (t[s].apply(this, i)) return true;
    return false;
  }
}
function gR(e4) {
  const t = e4;
  return ul(n);
  function n(r) {
    const i = r;
    let s;
    for (s in e4) if (i[s] !== t[s]) return false;
    return true;
  }
}
function yR(e4) {
  return ul(t);
  function t(n) {
    return n && n.type === e4;
  }
}
function ul(e4) {
  return t;
  function t(n, r, i) {
    return !!(kR(n) && e4.call(this, n, typeof r == "number" ? r : void 0, i || void 0));
  }
}
function bR() {
  return true;
}
function kR(e4) {
  return e4 !== null && typeof e4 == "object" && "type" in e4;
}
function bM(e4) {
  return e4;
}
const fk = [], wR = true, zd = false, $d = "skip";
function hk(e4, t, n, r) {
  let i;
  typeof t == "function" && typeof n != "function" ? (r = n, n = t) : i = t;
  const s = Bd(i), o = r ? -1 : 1;
  a(e4, void 0, [])();
  function a(l, u, c) {
    const f = l && typeof l == "object" ? l : {};
    if (typeof f.type == "string") {
      const v = typeof f.tagName == "string" ? f.tagName : typeof f.name == "string" ? f.name : void 0;
      Object.defineProperty(p, "name", { value: "node (" + (l.type + (v ? "<" + v + ">" : "")) + ")" });
    }
    return p;
    function p() {
      let v = fk, m, y, k;
      if ((!t || s(l, u, c[c.length - 1] || void 0)) && (v = SR(n(l, c)), v[0] === zd)) return v;
      if ("children" in l && l.children) {
        const E = l;
        if (E.children && v[0] !== $d) for (y = (r ? E.children.length : -1) + o, k = c.concat(E); y > -1 && y < E.children.length; ) {
          const A = E.children[y];
          if (m = a(A, y, k)(), m[0] === zd) return m;
          y = typeof m[1] == "number" ? m[1] : y + o;
        }
      }
      return v;
    }
  }
}
function SR(e4) {
  return Array.isArray(e4) ? e4 : typeof e4 == "number" ? [wR, e4] : e4 == null ? fk : [e4];
}
function vk(e4, t, n, r) {
  let i, s, o;
  typeof t == "function" && typeof n != "function" ? (s = void 0, o = t, i = n) : (s = t, o = n, i = r), hk(e4, s, a, i);
  function a(l, u) {
    const c = u[u.length - 1], f = c ? c.children.indexOf(l) : void 0;
    return o(l, f, c);
  }
}
const ER = /(\s|^)(https?:\/\/)([-A-Z0-9+_.]+(?::[0-9]+)?(?:\/[-A-Z0-9+&@#%?=~_|!:,.;()]*)*)(\s|$)/ig, pk = /(\s|\(|^)((https?:\/\/)([-A-Z0-9+_.]+[-A-Z0-9]+(?::[0-9]+)?(?:\/[-A-Z0-9+&@#%?=~_|!:,.;()]*)*))(?=\s|\)|$)/ig, AR = Zt({ name: "NcLink", props: { href: { type: String, required: true } }, render() {
  return Tt("a", { href: this.href, rel: "noopener noreferrer", target: "_blank", class: "rich-text--external-link" }, [this.href.trim()]);
} }), TR = function({ autolink: e4, useMarkdown: t, useExtendedMarkdown: n }) {
  return function(r) {
    n || !t || !e4 || vk(r, (i) => i.type === "text", (i, s, o) => {
      let a = mk(i.value);
      return typeof a == "string" ? a = [vo("text", a)] : a = a.map((l) => typeof l == "string" ? vo("text", l) : vo("link", { url: l.props.href }, [vo("text", l.props.href)])).filter((l) => l).flat(), o.children.splice(s, 1, ...a), [$d, (s ?? 0) + a.length];
    });
  };
}, mk = (e4) => {
  let t = pk.exec(e4);
  const n = [];
  let r = 0;
  for (; t !== null; ) {
    let s = t[2], o, a = e4.substring(r, t.index + t[1].length);
    s[0] === " " && (a += s[0], s = s.substring(1).trim());
    const l = s[s.length - 1];
    (l === "." || l === "," || l === ";" || t[0][0] === "(" && l === ")") && (s = s.substring(0, s.length - 1), o = l), n.push(a), n.push({ component: AR, props: { href: s } }), o && n.push(o), r = t.index + t[0].length, t = pk.exec(e4);
  }
  n.push(e4.substring(r));
  const i = n.map((s) => typeof s == "string" ? s : s.props.href).join("");
  return e4 === i ? n : (console.error("Failed to reassemble the chunked text: " + e4), e4);
}, gk = (e4, t) => {
  const n = (c, f) => c.startsWith(f) ? c.slice(f.length) : c, r = (c, ...f) => f.reduce((p, v) => n(p, v), c);
  if (!e4) return null;
  const i = /^https?:\/\//.test(t), s = /^[a-z][a-z0-9+.-]*:.+/.test(t);
  if (!i && s || i && !t.startsWith(au()) || !i && !t.startsWith("/")) return null;
  const o = i ? r(t, au(), "/index.php") : t, a = r(e4.options.history.base, da(), "/index.php"), l = r(o, a) || "/", u = e4.resolve(l);
  return u.matched.length ? u.fullPath : null;
};
Sr(v1), Re("a few seconds ago"), Re("seconds ago"), Re("sec. ago"), window.OCP?.Accessibility?.disableKeyboardShortcuts?.();
function dl(e4 = document.body) {
  const t = window.getComputedStyle(e4).getPropertyValue("--background-invert-if-dark");
  return t !== void 0 ? t === "invert(100%)" : false;
}
dl();
const NR = Symbol.for("nc:theme:enforced");
function CR(e4) {
  const t = ke(() => ot(e4) ?? document.body), n = Gt(dl(t.value)), r = cT();
  function i() {
    n.value = dl(t.value);
  }
  return Su(t, i, { attributes: true }), ft(t, i), ft(r, i, { immediate: true }), ai(n);
}
const _R = QA(() => CR());
function OR() {
  const e4 = _R(), t = kt(NR, void 0);
  return ke(() => t?.value ? t.value === "dark" : e4.value);
}
const PR = Gt(yk());
window.addEventListener("resize", () => {
  PR.value = yk();
});
function yk() {
  return window.outerHeight === window.screen.height;
}
const Ud = 1024, bk = Ud / 2, fl = (e4) => document.documentElement.clientWidth < e4, kk = Gt(fl(Ud)), wk = Gt(fl(bk));
window.addEventListener("resize", () => {
  kk.value = fl(Ud), wk.value = fl(bk);
}, { passive: true });
function xR() {
  return ai(kk);
}
function RR() {
  return ai(wk);
}
function MR(e4) {
  return window._nc_contacts_menu_hooks ? Object.values(window._nc_contacts_menu_hooks).filter((t) => t.enabled(e4)) : [];
}
Sr(p1);
class Ct {
  constructor(t, n, r, i) {
    this.r = t, this.g = n, this.b = r, this.name = i, this.r = Math.min(t, 255), this.g = Math.min(n, 255), this.b = Math.min(r, 255), this.name = i;
  }
  get color() {
    const t = (n) => `00${n.toString(16)}`.slice(-2);
    return `#${t(this.r)}${t(this.g)}${t(this.b)}`;
  }
}
function jR(e4, t, n) {
  return { r: (n.r - t.r) / e4, g: (n.g - t.g) / e4, b: (n.b - t.b) / e4 };
}
function Vd(e4, t, n) {
  const r = [];
  r.push(t);
  const i = jR(e4, t, n);
  for (let s = 1; s < e4; s++) {
    const o = Math.floor(t.r + i.r * s), a = Math.floor(t.g + i.g * s), l = Math.floor(t.b + i.b * s);
    r.push(new Ct(o, a, l));
  }
  return r;
}
const IR = [new Ct(182, 70, 157, Re("Purple")), new Ct(191, 103, 139, Re("Rosy brown")), new Ct(201, 136, 121, Re("Feldspar")), new Ct(211, 169, 103, Re("Whiskey")), new Ct(221, 203, 85, Re("Gold")), new Ct(165, 184, 114, Re("Olivine")), new Ct(110, 166, 143, Re("Acapulco")), new Ct(55, 148, 172, Re("Boston Blue")), new Ct(0, 130, 201, Re("Nextcloud blue")), new Ct(45, 115, 190, Re("Mariner")), new Ct(91, 100, 179, Re("Blue Violet")), new Ct(136, 85, 168, Re("Deluge"))];
function LR(e4) {
  const t = new Ct(182, 70, 157, Re("Purple")), n = new Ct(221, 203, 85, Re("Gold")), r = new Ct(0, 130, 201, Re("Nextcloud blue")), i = Vd(e4, t, n), s = Vd(e4, n, r), o = Vd(e4, r, t);
  return i.concat(s).concat(o);
}
function FR(e4) {
  let t = 0;
  if (e4.length === 0) return t;
  for (let n = 0; n < e4.length; n++) {
    const r = e4.charCodeAt(n);
    t = (t << 5) - t + r;
  }
  return Math.abs(t);
}
function Sk(e4) {
  const n = LR(6), r = FR(e4.toLocaleLowerCase());
  return n[r % n.length];
}
function DR(e4, t) {
  const n = (t?.size || 64) <= 64 ? 64 : 512, r = t?.isGuest ? "/guest" : "", i = t?.isDarkTheme ?? dl(document.body) ? "/dark" : "";
  return ua(`/avatar${r}/{user}/{size}${i}`, { user: e4, size: n });
}
var hl = { exports: {} }, BR = hl.exports, Ek;
function zR() {
  return Ek || (Ek = 1, (function(e4) {
    (function(t) {
      if (typeof n != "function") {
        var n = function(m) {
          return m;
        };
        n.nonNative = true;
      }
      const r = n("plaintext"), i = n("html"), s = n("comment"), o = /<(\w*)>/g, a = /<\/?([^\s\/>]+)/;
      function l(m, y, k) {
        m = m || "", y = y || [], k = k || "";
        let E = c(y, k);
        return f(m, E);
      }
      function u(m, y) {
        m = m || [], y = y || "";
        let k = c(m, y);
        return function(A) {
          return f(A || "", k);
        };
      }
      l.init_streaming_mode = u;
      function c(m, y) {
        return m = p(m), { allowable_tags: m, tag_replacement: y, state: r, tag_buffer: "", depth: 0, in_quote_char: "" };
      }
      function f(m, y) {
        if (typeof m != "string") throw new TypeError("'html' parameter must be a string");
        let k = y.allowable_tags, E = y.tag_replacement, A = y.state, C = y.tag_buffer, x = y.depth, F = y.in_quote_char, Y = "";
        for (let U = 0, V = m.length; U < V; U++) {
          let M = m[U];
          if (A === r) switch (M) {
            case "<":
              A = i, C += M;
              break;
            default:
              Y += M;
              break;
          }
          else if (A === i) switch (M) {
            case "<":
              if (F) break;
              x++;
              break;
            case ">":
              if (F) break;
              if (x) {
                x--;
                break;
              }
              F = "", A = r, C += ">", k.has(v(C)) ? Y += C : Y += E, C = "";
              break;
            case '"':
            case "'":
              M === F ? F = "" : F = F || M, C += M;
              break;
            case "-":
              C === "<!-" && (A = s), C += M;
              break;
            case " ":
            case `
`:
              if (C === "<") {
                A = r, Y += "< ", C = "";
                break;
              }
              C += M;
              break;
            default:
              C += M;
              break;
          }
          else if (A === s) switch (M) {
            case ">":
              C.slice(-2) == "--" && (A = r), C = "";
              break;
            default:
              C += M;
              break;
          }
        }
        return y.state = A, y.tag_buffer = C, y.depth = x, y.in_quote_char = F, Y;
      }
      function p(m) {
        let y = /* @__PURE__ */ new Set();
        if (typeof m == "string") {
          let k;
          for (; k = o.exec(m); ) y.add(k[1]);
        } else !n.nonNative && typeof m[n.iterator] == "function" ? y = new Set(m) : typeof m.forEach == "function" && m.forEach(y.add, y);
        return y;
      }
      function v(m) {
        let y = a.exec(m);
        return y ? y[1].toLowerCase() : null;
      }
      e4.exports ? e4.exports = l : t.striptags = l;
    })(BR);
  })(hl)), hl.exports;
}
zR();
const Ak = { data() {
  return { hasStatus: false, userStatus: { status: null, message: null, icon: null } };
}, methods: { async fetchUserStatus(e4) {
  if (!e4) return;
  const t = Fd();
  if (!(!Object.prototype.hasOwnProperty.call(t, "user_status") || !t.user_status.enabled) && Is()) try {
    const { data: n } = await or.get(su("apps/user_status/api/v1/statuses/{userId}", { userId: e4 })), { status: r, message: i, icon: s } = n.ocs.data;
    this.userStatus.status = r, this.userStatus.message = i || "", this.userStatus.icon = s || "", this.hasStatus = true;
  } catch (n) {
    if (n.response.status === 404 && n.response.data.ocs?.data?.length === 0) return;
    console.error(n);
  }
} } };
Sr(w1);
const Tk = iu.getBuilder("nextcloud").persist().build();
function $R(e4) {
  const t = Tk.getItem("user-has-avatar." + e4);
  return typeof t == "string" ? !!t : null;
}
function Nk(e4, t) {
  e4 && Tk.setItem("user-has-avatar." + e4, t);
}
const UR = { name: "NcAvatar", directives: { ClickOutside: sk }, components: { IconDotsHorizontal: Lg, NcActions: Gu, NcButton: Oi, NcIconSvgWrapper: Ma, NcLoadingIcon: Dg, NcUserStatusIcon: pR }, mixins: [Ak], props: { url: { type: String, default: void 0 }, iconClass: { type: String, default: void 0 }, user: { type: String, default: void 0 }, hideStatus: { type: Boolean, default: false }, verboseStatus: { type: Boolean, default: false }, preloadedUserStatus: { type: Object, default: void 0 }, isGuest: { type: Boolean, default: false }, displayName: { type: String, default: void 0 }, size: { type: Number, default: 32 }, noPlaceholder: { type: Boolean, default: false }, disableTooltip: { type: Boolean, default: false }, disableMenu: { type: Boolean, default: false }, tooltipMessage: { type: String, default: null }, isNoUser: { type: Boolean, default: false }, menuContainer: { type: [String, Object, Element, Boolean], default: "body" } }, setup() {
  return { isDarkTheme: OR() };
}, data() {
  return { avatarUrlLoaded: null, avatarSrcSetLoaded: null, userDoesNotExist: false, isAvatarLoaded: false, isMenuLoaded: false, contactsMenuLoading: false, contactsMenuData: {}, contactsMenuActions: [], contactsMenuOpenState: false };
}, computed: { avatarAriaLabel() {
  if (this.hasMenu) return this.canDisplayUserStatus || this.showUserStatusIconOnAvatar ? Re("Avatar of {displayName}, {status}", { displayName: this.displayName ?? this.user, status: uk(this.userStatus.status) }) : Re("Avatar of {displayName}", { displayName: this.displayName ?? this.user });
}, canDisplayUserStatus() {
  return !this.hideStatus && this.hasStatus && ["online", "away", "busy", "dnd"].includes(this.userStatus.status);
}, showUserStatusIconOnAvatar() {
  return !this.hideStatus && !this.verboseStatus && this.hasStatus && this.userStatus.status !== "dnd" && this.userStatus.icon;
}, userIdentifier() {
  return this.isDisplayNameDefined ? this.displayName : this.isUserDefined ? this.user : "";
}, isUserDefined() {
  return typeof this.user < "u";
}, isDisplayNameDefined() {
  return typeof this.displayName < "u";
}, isUrlDefined() {
  return typeof this.url < "u";
}, hasMenu() {
  return this.disableMenu ? false : this.isMenuLoaded ? this.menu.length > 0 : !(this.user === Is()?.uid || this.userDoesNotExist || this.url);
}, showInitials() {
  return !this.noPlaceholder && this.userDoesNotExist && !(this.iconClass || this.$slots.icon);
}, avatarStyle() {
  return { "--avatar-size": this.size + "px", lineHeight: this.showInitials ? this.size + "px" : 0, fontSize: Math.round(this.size * 0.45) + "px" };
}, initialsWrapperStyle() {
  const { r: e4, g: t, b: n } = Sk(this.userIdentifier);
  return { backgroundColor: `rgba(${e4}, ${t}, ${n}, 0.1)` };
}, initialsStyle() {
  const { r: e4, g: t, b: n } = Sk(this.userIdentifier);
  return { color: `rgb(${e4}, ${t}, ${n})` };
}, tooltip() {
  return this.disableTooltip ? null : this.tooltipMessage ? this.tooltipMessage : this.displayName;
}, initials() {
  let e4 = "?";
  if (this.showInitials) {
    const t = this.userIdentifier.trim();
    if (t === "") return e4;
    const n = t.match(/[\p{L}\p{N}\s]/gu);
    if (n == null) return e4;
    const r = n.join(""), i = r.lastIndexOf(" ");
    e4 = String.fromCodePoint(r.codePointAt(0)), i !== -1 && (e4 = e4.concat(String.fromCodePoint(r.codePointAt(i + 1))));
  }
  return e4.toLocaleUpperCase();
}, menu() {
  const e4 = this.contactsMenuActions.map((n) => {
    const r = gk(this.$router, n.hyperlink);
    return { ncActionComponent: r ? Qx : Hx, ncActionComponentProps: r ? { to: r, icon: n.icon } : { href: n.hyperlink, icon: n.icon }, text: n.title };
  });
  for (const n of MR(this.contactsMenuData)) try {
    e4.push({ ncActionComponent: lk, ncActionComponentProps: { onClick: () => n.callback(this.contactsMenuData) }, text: n.displayName(this.contactsMenuData), iconSvg: n.iconSvg(this.contactsMenuData) });
  } catch (r) {
    Dd.error(`Failed to render ContactsMenu action ${n.id}`, { error: r, action: n });
  }
  function t(n) {
    const r = document.createTextNode(n), i = document.createElement("p");
    return i.appendChild(r), i.innerHTML;
  }
  if (!this.hideStatus && (this.userStatus.icon || this.userStatus.message)) {
    const n = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
					<text x="50%" y="50%" text-anchor="middle" style="dominant-baseline: central; font-size: 85%">${t(this.userStatus.icon)}</text>
				</svg>`;
    return [{ ncActionComponent: lR, ncActionComponentProps: {}, iconSvg: this.userStatus.icon ? n : void 0, text: `${this.userStatus.message}` }].concat(e4);
  }
  return e4;
} }, watch: { url() {
  this.userDoesNotExist = false, this.loadAvatarUrl();
}, user() {
  this.userDoesNotExist = false, this.isMenuLoaded = false, this.loadAvatarUrl();
} }, mounted() {
  this.loadAvatarUrl(), xs("settings:avatar:updated", this.loadAvatarUrl), xs("settings:display-name:updated", this.loadAvatarUrl), !this.hideStatus && this.user && !this.isNoUser && (this.preloadedUserStatus ? (this.userStatus.status = this.preloadedUserStatus.status || "", this.userStatus.message = this.preloadedUserStatus.message || "", this.userStatus.icon = this.preloadedUserStatus.icon || "", this.hasStatus = this.preloadedUserStatus.status !== null) : this.fetchUserStatus(this.user), xs("user_status:status.updated", this.handleUserStatusUpdated));
}, beforeUnmount() {
  ca("settings:avatar:updated", this.loadAvatarUrl), ca("settings:display-name:updated", this.loadAvatarUrl), ca("user_status:status.updated", this.handleUserStatusUpdated);
}, methods: { t: Re, handleUserStatusUpdated(e4) {
  this.user === e4.userId && (this.userStatus = { status: e4.status, icon: e4.icon, message: e4.message }, this.hasStatus = e4.status !== null);
}, async toggleMenu(e4) {
  e4.type === "keydown" && e4.key !== "Enter" || (this.contactsMenuOpenState || await this.fetchContactsMenu(), this.contactsMenuOpenState = !this.contactsMenuOpenState);
}, closeMenu() {
  this.contactsMenuOpenState = false;
}, async fetchContactsMenu() {
  this.contactsMenuLoading = true;
  try {
    const e4 = encodeURIComponent(this.user), { data: t } = await or.post(ua("contactsmenu/findOne"), `shareType=0&shareWith=${e4}`);
    this.contactsMenuData = t, this.contactsMenuActions = t.topAction ? [t.topAction].concat(t.actions) : t.actions;
  } catch {
    this.contactsMenuOpenState = false;
  }
  this.contactsMenuLoading = false, this.isMenuLoaded = true;
}, loadAvatarUrl() {
  if (this.isAvatarLoaded = false, !this.isUrlDefined && (!this.isUserDefined || this.isNoUser || this.iconClass)) {
    this.isAvatarLoaded = true, this.userDoesNotExist = true;
    return;
  }
  if (this.isUrlDefined) {
    this.updateImageIfValid(this.url);
    return;
  }
  if (this.size <= 64) {
    const e4 = this.avatarUrlGenerator(this.user, 64), t = [e4 + " 1x", this.avatarUrlGenerator(this.user, 512) + " 8x"].join(", ");
    this.updateImageIfValid(e4, t);
  } else {
    const e4 = this.avatarUrlGenerator(this.user, 512);
    this.updateImageIfValid(e4);
  }
}, avatarUrlGenerator(e4, t) {
  let n = DR(e4, { size: t, isDarkTheme: this.isDarkTheme, isGuest: this.isGuest });
  return e4 === Is()?.uid && typeof oc_userconfig < "u" && (n += "?v=" + oc_userconfig.avatar.version), n;
}, updateImageIfValid(e4, t = null) {
  const n = $R(this.user);
  if (this.isUserDefined && typeof n == "boolean") {
    this.isAvatarLoaded = true, this.avatarUrlLoaded = e4, t && (this.avatarSrcSetLoaded = t), n === false && (this.userDoesNotExist = true);
    return;
  }
  const r = new Image();
  r.onload = () => {
    this.avatarUrlLoaded = e4, t && (this.avatarSrcSetLoaded = t), this.isAvatarLoaded = true, Nk(this.user, true);
  }, r.onerror = () => {
    console.debug("Invalid avatar url", e4), this.avatarUrlLoaded = null, this.avatarSrcSetLoaded = null, this.userDoesNotExist = true, this.isAvatarLoaded = false, Nk(this.user, false);
  }, t && (r.srcset = t), r.src = e4;
} } }, VR = ["title"], HR = ["src", "srcset"], qR = { key: 2, class: "avatardiv__user-status avatardiv__user-status--icon" };
function WR(e4, t, n, r, i, s) {
  const o = dt("NcLoadingIcon"), a = dt("IconDotsHorizontal"), l = dt("NcButton"), u = dt("NcIconSvgWrapper"), c = dt("NcActions"), f = dt("NcUserStatusIcon"), p = ch("click-outside");
  return di((oe(), pe("span", { title: s.tooltip, class: yt([{ "avatardiv--unknown": i.userDoesNotExist, "avatardiv--with-menu": s.hasMenu, "avatardiv--with-menu-loading": i.contactsMenuLoading }, "avatardiv popovermenu-wrapper"]), style: Pt(s.avatarStyle) }, [Mt(e4.$slots, "icon", {}, () => [n.iconClass ? (oe(), pe("span", { key: 0, class: yt([n.iconClass, "avatar-class-icon"]) }, null, 2)) : i.isAvatarLoaded && !i.userDoesNotExist ? (oe(), pe("img", { key: 1, src: i.avatarUrlLoaded, srcset: i.avatarSrcSetLoaded, alt: "" }, null, 8, HR)) : Xe("", true)], true), s.hasMenu && s.menu.length === 0 ? (oe(), at(l, { key: 0, "aria-label": s.avatarAriaLabel, class: "action-item action-item__menutoggle", variant: "tertiary-no-background", onClick: s.toggleMenu }, { icon: et(() => [i.contactsMenuLoading ? (oe(), at(o, { key: 0 })) : (oe(), at(a, { key: 1, size: 20 }))]), _: 1 }, 8, ["aria-label", "onClick"])) : s.hasMenu ? (oe(), at(c, { key: 1, open: i.contactsMenuOpenState, "onUpdate:open": t[0] || (t[0] = (v) => i.contactsMenuOpenState = v), "aria-label": s.avatarAriaLabel, container: n.menuContainer, "force-menu": "", "manual-open": "", variant: "tertiary-no-background", onClick: s.toggleMenu }, Yl({ default: et(() => [(oe(true), pe(ht, null, dh(s.menu, (v, m) => (oe(), at(Zl(v.ncActionComponent), mn({ key: m }, { ref_for: true }, v.ncActionComponentProps), Yl({ default: et(() => [Ko(" " + qe(v.text), 1)]), _: 2 }, [v.iconSvg ? { name: "icon", fn: et(() => [xe(u, { svg: v.iconSvg }, null, 8, ["svg"])]), key: "0" } : void 0]), 1040))), 128))]), _: 2 }, [i.contactsMenuLoading ? { name: "icon", fn: et(() => [xe(o)]), key: "0" } : void 0]), 1032, ["open", "aria-label", "container", "onClick"])) : Xe("", true), s.showUserStatusIconOnAvatar ? (oe(), pe("span", qR, qe(e4.userStatus.icon), 1)) : s.canDisplayUserStatus ? (oe(), at(f, { key: 3, class: "avatardiv__user-status", status: e4.userStatus.status, "aria-hidden": String(s.hasMenu) }, null, 8, ["status", "aria-hidden"])) : Xe("", true), s.showInitials ? (oe(), pe("span", { key: 4, style: Pt(s.initialsWrapperStyle), class: "avatardiv__initials-wrapper" }, [Ae("span", { style: Pt(s.initialsStyle), class: "avatardiv__initials" }, qe(s.initials), 5)], 4)) : Xe("", true)], 14, VR)), [[p, s.closeMenu]]);
}
const GR = Nt(UR, [["render", WR], ["__scopeId", "data-v-f30ef4a9"]]), ZR = (e4, t) => {
  const n = e4.__vccOpts || e4;
  for (const [r, i] of t) n[r] = i;
  return n;
};
export {
  jw as $,
  qu as A,
  Ko as B,
  gT as C,
  xT as D,
  ET as E,
  bT as F,
  yt as G,
  Ma as H,
  ht as I,
  dh as J,
  ua as K,
  we as L,
  x0 as M,
  GR as N,
  Gt as O,
  pu as P,
  di as Q,
  Rp as R,
  bs as S,
  mc as T,
  Oi as U,
  dt as V,
  Bd as W,
  Es as X,
  vk as Y,
  Ww as Z,
  ZR as _,
  Ae as a,
  Nc as a$,
  Lm as a0,
  yT as a1,
  _u as a2,
  Sr as a3,
  Re as a4,
  Yl as a5,
  wT as a6,
  jT as a7,
  CT as a8,
  f1 as a9,
  P1 as aA,
  x1 as aB,
  $1 as aC,
  M1 as aD,
  Km as aE,
  E1 as aF,
  gk as aG,
  uT as aH,
  dT as aI,
  Lr as aJ,
  ck as aK,
  mk as aL,
  TR as aM,
  ER as aN,
  Is as aO,
  or as aP,
  su as aQ,
  zd as aR,
  $d as aS,
  vo as aT,
  am as aU,
  Em as aV,
  Nm as aW,
  Ss as aX,
  tp as aY,
  Xv as aZ,
  Ec as a_,
  Vw as aa,
  Dg as ab,
  cv as ac,
  ch as ad,
  Cv as ae,
  gi as af,
  tN as ag,
  xi as ah,
  eN as ai,
  Er as aj,
  Q1 as ak,
  rg as al,
  Pi as am,
  og as an,
  ig as ao,
  ag as ap,
  pN as aq,
  Tt as ar,
  C1 as as,
  Fg as at,
  hk as au,
  Dd as av,
  b1 as aw,
  vA as ax,
  U1 as ay,
  B1 as az,
  Xe as b,
  sk as b$,
  xc as b0,
  Qv as b1,
  Uv as b2,
  cA as b3,
  Qe as b4,
  vi as b5,
  lk as b6,
  Gu as b7,
  I1 as b8,
  st as b9,
  HE as bA,
  bE as bB,
  qw as bC,
  kt as bD,
  xR as bE,
  Cu as bF,
  _i as bG,
  MT as bH,
  RT as bI,
  A1 as bJ,
  W1 as bK,
  O1 as bL,
  _1 as bM,
  Fd as bN,
  PT as bO,
  OT as bP,
  H1 as bQ,
  Lw as bR,
  ds as bS,
  iu as bT,
  Im as bU,
  Hu as bV,
  pT as bW,
  V1 as bX,
  gu as bY,
  T1 as bZ,
  Wu as b_,
  GA as ba,
  Mi as bb,
  ak as bc,
  Ev as bd,
  _v as be,
  Ak as bf,
  Wl as bg,
  xw as bh,
  WE as bi,
  GE as bj,
  e0 as bk,
  Tm as bl,
  DC as bm,
  Av as bn,
  ac as bo,
  rn as bp,
  Ro as bq,
  Ll as br,
  po as bs,
  R0 as bt,
  aa as bu,
  Mv as bv,
  xs as bw,
  ca as bx,
  Oe as by,
  FE as bz,
  pe as c,
  RR as c0,
  y1 as c1,
  R1 as c2,
  IR as c3,
  kT as c4,
  _T as c5,
  oh as c6,
  cr as c7,
  Fl as c8,
  rt as c9,
  h0 as ca,
  ot as cb,
  Ao as cc,
  Tl as cd,
  ql as ce,
  TT as cf,
  AT as cg,
  Eu as ch,
  Fm as ci,
  NT as cj,
  ST as ck,
  F1 as cl,
  N1 as cm,
  g1 as cn,
  Ct as co,
  z1 as cp,
  D1 as cq,
  k1 as cr,
  j1 as cs,
  h1 as ct,
  q1 as cu,
  a0 as cv,
  Zt as d,
  qe as e,
  hi as f,
  at as g,
  xe as h,
  ms as i,
  v0 as j,
  Nt as k,
  Mh as l,
  vh as m,
  Eo as n,
  oe as o,
  ip as p,
  ke as q,
  Mt as r,
  RS as s,
  $s as t,
  xn as u,
  ft as v,
  et as w,
  Zl as x,
  mn as y,
  Pt as z
};
//# sourceMappingURL=NcEmptyContent-q-geAf0w-DExP7TOI.chunk.mjs.map
