<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup>
import { t } from '@nextcloud/l10n'

import NcCheckboxRadioSwitch from '@nextcloud/vue/components/NcCheckboxRadioSwitch'
import NcSelect from '@nextcloud/vue/components/NcSelect'

import { useAppSettingsStore, InquiriesType } from '../../../stores/appSettings.ts'

const appSettingsStore = useAppSettingsStore()

// Map editor types to their labels
const editorTypeLabels = {
  textarea: t('agora', 'Textarea'),
  titap: t('agora', 'Tiptap'),
  wysiwyg: t('agora', 'WYSIWYG'),
  collectives: t('agora', 'Collectives'),
}

// Default settings for each inquiry type
const defaultInquirySettings = Object.values(InquiriesType).reduce((acc, type) => {
  acc[type] = {
    enabled: true,
    editorType: 'textarea',
  }
  return acc
}, {})
</script>

<template>
  <div class="admin-inquiry-settings">
    <h2>{{ t('agora', 'Inquiry Download Settings') }}</h2>

    <div class="global-setting">
      <NcCheckboxRadioSwitch
        v-model="appSettingsStore.allowInquiryDownload"
        type="switch"
        @update:model-value="appSettingsStore.write()"
      >
        {{ t('agora', 'Enable the spreadsheet download of inquiries globally') }}
      </NcCheckboxRadioSwitch>

      <div v-if="!appSettingsStore.allowInquiryDownload" class="settings-details">
        <NcSelect
          v-model="appSettingsStore.inquiryDownloadGroups"
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

    <div class="inquiry-type-settings">
      <h3>{{ t('agora', 'Inquiry Type Settings') }}</h3>
      <p class="settings-description">
        {{ t('agora', 'Configure settings for each type of inquiry') }}
      </p>

      <table class="inquiry-types-table">
        <thead>
          <tr>
            <th>{{ t('agora', 'Inquiry Type') }}</th>
            <th>{{ t('agora', 'Enabled') }}</th>
            <th>{{ t('agora', 'Editor Type') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="type in Object.values(InquiriesType)" :key="type.type">
            <td class="inquiry-type-label">
              {{ InquiriesType[type.type] }}
            </td>
            <td>
              <NcCheckbox
                :checked="
                  appSettingsStore.inquiryTypeSettings[type]?.enabled ??
                  defaultInquirySettings[type].enabled
                "
                @update:checked="
                  (value) => {
                    if (!appSettingsStore.inquiryTypeSettings[type]) {
                      appSettingsStore.inquiryTypeSettings[type] = {
                        ...defaultInquirySettings[type],
                      }
                    }
                    appSettingsStore.inquiryTypeSettings[type].enabled = value
                    appSettingsStore.write()
                  }
                "
              />
            </td>
            <td>
              <NcSelect
                :model-value="
                  appSettingsStore.inquiryTypeSettings[type]?.editorType ??
                  defaultInquirySettings[type].editorType
                "
                :options="
                  Object.keys(editorTypeLabels).map((key) => ({
                    id: key,
                    label: editorTypeLabels[key],
                  }))
                "
                label="label"
                :input-label="t('agora', 'Select editor type')"
                @update:model-value="
                  (value) => {
                    if (!appSettingsStore.inquiryTypeSettings[type]) {
                      appSettingsStore.inquiryTypeSettings[type] = {
                        ...defaultInquirySettings[type],
                      }
                    }
                    appSettingsStore.inquiryTypeSettings[type].editorType = value
                    appSettingsStore.write()
                  }
                "
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.admin-inquiry-settings {
  padding: 20px;
  max-width: 800px;
}

.global-setting {
  margin-bottom: 30px;
  padding: 20px;
  background-color: var(--color-background-dark);
  border-radius: var(--border-radius);
}

.inquiry-type-settings {
  padding: 20px;
  background-color: var(--color-background-dark);
  border-radius: var(--border-radius);
}

.settings-details {
  margin-top: 15px;
  padding-left: 10px;
}

.settings-description {
  color: var(--color-text-lighter);
  margin-bottom: 20px;
}

.inquiry-types-table {
  width: 100%;
  border-collapse: collapse;
}

.inquiry-types-table th,
.inquiry-types-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid var(--color-border);
}

.inquiry-types-table th {
  font-weight: bold;
  color: var(--color-text-light);
}

.inquiry-type-label {
  font-weight: 500;
}

:deep(.nc-select) {
  min-width: 150px;
}
</style>
