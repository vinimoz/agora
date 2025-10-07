<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup>
import { t } from '@nextcloud/l10n'

import NcCheckboxRadioSwitch from '@nextcloud/vue/components/NcCheckboxRadioSwitch'
import NcSelect from '@nextcloud/vue/components/NcSelect'

import { useAppSettingsStore } from '../../../stores/appSettings.ts'

const appSettingsStore = useAppSettingsStore()

</script>

<template>
  <div class="user_settings">
    <NcCheckboxRadioSwitch
      v-model="appSettingsStore.allowAllAccess"
      type="switch"
      @update:model-value="appSettingsStore.write()"
    >
      {{ t('agora', 'Enable the shares of inquiries globally, by default admin and moderator have rights') }}
    </NcCheckboxRadioSwitch>

    <div v-if="!appSettingsStore.allowAllAccess" class="settings_details">
      <NcSelect
        v-model="appSettingsStore.allAccessGroups"
        :input-label="t('agora', 'Enable only for the following groups')"
        label="displayName"
        :options="appSettingsStore.groups"
        :user-select="true"
        :multiple="true"
        :loading="isLoading"
        :placeholder="t('agora', 'Leave empty to disable globally')"
        @update:model-value="appSettingsStore.write()"
        @search="appSettingsStore.loadGroups"
      />
    </div>
  </div>
</template>
