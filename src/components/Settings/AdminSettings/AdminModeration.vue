<!--
  - SPDX-FileCopyrightText: 2021 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup>
import { t } from '@nextcloud/l10n'

import NcCheckboxRadioSwitch from '@nextcloud/vue/components/NcCheckboxRadioSwitch'

import { useAppSettingsStore } from '../../../stores/appSettings.ts'

const appSettingsStore = useAppSettingsStore()
</script>

<template>
  <div class="user_settings">
    <NcCheckboxRadioSwitch
      v-model="appSettingsStore.useModeration"
      type="switch"
      @update:model-value="appSettingsStore.write()"
    >
      {{ t('agora', 'Enable the moderation feature') }}
    </NcCheckboxRadioSwitch>

    <div
      v-if="!appSettingsStore.allowModeration"
      class="settings_details"
    >
      <NcCheckboxRadioSwitch
        v-model="appSettingsStore.officialBypassModeration"
        type="switch"
        @update:model-value="appSettingsStore.write()"
      >
        {{ t('agora', 'Official user(s) bypass moderation') }}
      </NcCheckboxRadioSwitch>
    </div>
  </div>
</template>
