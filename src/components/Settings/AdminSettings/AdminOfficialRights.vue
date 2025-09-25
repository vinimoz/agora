<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup>
import { t } from '@nextcloud/l10n'
import NcCheckboxRadioSwitch from '@nextcloud/vue/components/NcCheckboxRadioSwitch'

import { useAppSettingsStore } from '../../../stores/appSettings.ts'

const appSettingsStore = useAppSettingsStore()
</script>

<template>
  <div class="rights-management">
    <h2>{{ t('agora', 'Official Rights') }}</h2>
    <p class="description">
      {{ t('agora', 'Define permissions for users with official role') }}
    </p>

    <div class="rights-list">
      <div class="right-item">
        <NcCheckboxRadioSwitch
          v-model="appSettingsStore.officialRights.modifyInquiry"
          type="switch"
          @update:model-value="appSettingsStore.write()"
        >
          {{ t('agora', 'Modify inquiries') }}
        </NcCheckboxRadioSwitch>
        <p class="right-description">
          {{ t('agora', 'Allow officials to modify existing inquiries') }}
        </p>
      </div>

      <div class="right-item">
        <NcCheckboxRadioSwitch
          v-model="appSettingsStore.officialRights.deleteInquiry"
          type="switch"
          @update:model-value="appSettingsStore.write()"
        >
          {{ t('agora', 'Delete inquiries') }}
        </NcCheckboxRadioSwitch>
        <p class="right-description">
          {{ t('agora', 'Allow officials to delete inquiries') }}
        </p>
      </div>

      <div class="right-item">
        <NcCheckboxRadioSwitch
          v-model="appSettingsStore.officialRights.archiveInquiry"
          type="switch"
          @update:model-value="appSettingsStore.write()"
        >
          {{ t('agora', 'Archive inquiries') }}
        </NcCheckboxRadioSwitch>
        <p class="right-description">
          {{ t('agora', 'Allow officials to archive inquiries') }}
        </p>
      </div>

      <div class="right-item">
        <NcCheckboxRadioSwitch
          v-model="appSettingsStore.officialRights.manageModerationStatus"
          type="switch"
          @update:model-value="appSettingsStore.write()"
        >
          {{ t('agora', 'Moderation status') }}
        </NcCheckboxRadioSwitch>
        <p class="right-description">
          {{ t('agora', 'Allow officials to manage Moderation status for all inquiry') }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rights-management {
  padding: 20px;
  max-width: 700px;
}

.description {
  color: var(--color-text-lighter);
  margin-bottom: 25px;
}

.rights-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.right-item {
  padding: 15px;
  background-color: var(--color-background-dark);
  border-radius: 8px;
}

.right-description {
  margin: 8px 0 0 0;
  font-size: 0.9em;
  color: var(--color-text-lighter);
  padding-left: 36px;
}
</style>
