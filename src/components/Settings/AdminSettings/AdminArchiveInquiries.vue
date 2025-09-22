<!--
  - SPDX-FileCopyrightText: 2021 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup>
import { InputDiv } from '../../Base/index.ts'
import { t } from '@nextcloud/l10n'

import NcCheckboxRadioSwitch from '@nextcloud/vue/components/NcCheckboxRadioSwitch'

import { useAppSettingsStore } from '../../../stores/appSettings.ts'

const appSettingsStore = useAppSettingsStore()
</script>

<template>
  <div class="user_settings">
    <NcCheckboxRadioSwitch
      v-model="appSettingsStore.autoArchive"
      type="switch"
      @update:model-value="appSettingsStore.write()"
    >
      {{ t('agora', 'Enable the automatic inquiry archiving') }}
    </NcCheckboxRadioSwitch>
    <InputDiv
      v-if="appSettingsStore.autoArchive"
      v-model="appSettingsStore.autoArchiveOffset"
      class="settings_details"
      type="number"
      inputmode="numeric"
      use-num-modifiers
      :label="t('agora', 'Days after which inquiries should be archived after closing')"
      @change="appSettingsStore.write()"
    />
  </div>
</template>
