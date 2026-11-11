<!--
  - SPDX-FileCopyrightText: 2021 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup>
import { InputDiv } from "../../Base/index.ts";
import { t } from "@nextcloud/l10n";

import NcCheckboxRadioSwitch from "@nextcloud/vue/components/NcCheckboxRadioSwitch";

import { useAppSettingsStore } from "../../../stores/appSettings.ts";

const appSettingsStore = useAppSettingsStore();
</script>

<template>
  <div class="user_settings">
    <NcCheckboxRadioSwitch
      v-model="appSettingsStore.autoExpire"
      type="switch"
      @update:model-value="appSettingsStore.write()"
    >
      {{ t("agora", "Enable the automatic inquiry expiration") }}
    </NcCheckboxRadioSwitch>
    <InputDiv
      v-if="appSettingsStore.autoExpire"
      v-model="appSettingsStore.autoExpireOffset"
      class="settings_details"
      type="number"
      inputmode="numeric"
      use-num-modifiers
      :label="
        t(
          'agora',
          'Days after which inquiries should expire after being opened',
        )
      "
      @change="appSettingsStore.write()"
    />
  </div>
</template>
