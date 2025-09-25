<!--
  - SPDX-FileCopyrightText: 2024 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup>
import { t } from '@nextcloud/l10n'
import { ref, computed, onMounted, watch } from 'vue'
import NcCheckboxRadioSwitch from '@nextcloud/vue/components/NcCheckboxRadioSwitch'
import NcSelect from '@nextcloud/vue/components/NcSelect'
import { useAppSettingsStore } from '../../../stores/appSettings.js'
import { InquiryTypesUI } from '../../../helpers/modules/InquiryHelper.ts'

const appSettingsStore = useAppSettingsStore()
const selectedInquiryType = ref('')
const isLoading = ref(true)
const editorOptions = [
  { value: 'wysiwyg', label: t('agora', 'Rich Text Editor') },
  { value: 'textarea', label: t('agora', 'Simple Text Area') },
  { value: 'texteditor', label: t('agora', 'Nextcloud text editor') },
]

onMounted(async () => {
  try {
    const typeKeys = Object.keys(InquiryTypesUI)
    if (typeKeys.length > 0) {
      selectedInquiryType.value = typeKeys[0]
    }
  } catch (error) {
    console.error('Failed to load inquiry types:', error)
  } finally {
    isLoading.value = false
  }
})

const inquiryTypeOptions = computed(() =>
  Object.keys(InquiryTypesUI).map((key) => ({
    value: key,
    label: InquiryTypesUI[key]?.label || key,
  }))
)

const isValidInquiryType = computed(
  () => selectedInquiryType.value && InquiryTypesUI[selectedInquiryType.value]
)

watch(selectedInquiryType, (newType) => {
  if (newType.value) {
    selectedInquiryType.value = newType.value
  }
})
</script>

<template>
  <div class="inquiry-rights-management">
    <h2>{{ t('agora', 'Inquiry Type Settings') }}</h2>
    <p class="description">
      {{ t('agora', 'Configure default settings for each inquiry type') }}
    </p>

    <div v-if="isLoading" class="loading">
      {{ t('agora', 'Loading inquiry types') }}
    </div>

    <div v-else-if="!isValidInquiryType" class="error">
      {{ t('agora', 'No inquiry types available') }}
    </div>

    <div v-else>
      <div class="type-selection">
        <label for="inquiry-type-select">{{ t('agora', 'Select inquiry type:') }}</label>
        <NcSelect
          id="inquiry-type-select"
          v-model="selectedInquiryType"
          :options="inquiryTypeOptions"
          value-field="value"
          label-field="label"
          track-bye="value"
          :clearable="false"
          class="type-select"
        />
      </div>

      <div class="settings-container">
        <h3>
          {{ InquiryTypesUI[selectedInquiryType]?.label || selectedInquiryType }}
          {{ t('agora', 'Settings') }}
        </h3>

        <div class="settings-list">
          <div class="setting-item">
            <NcCheckboxRadioSwitch
              v-model="appSettingsStore.inquiryTypeRights[selectedInquiryType].supportInquiry"
              type="switch"
              @update:model-value="appSettingsStore.write()"
            >
              {{ t('agora', 'Allow support') }}
            </NcCheckboxRadioSwitch>
            <p class="setting-description">
              {{ t('agora', 'Allow users to support this inquiry type') }}
            </p>
          </div>

          <div class="setting-item">
            <NcCheckboxRadioSwitch
              v-model="appSettingsStore.inquiryTypeRights[selectedInquiryType].commentInquiry"
              type="switch"
              @update:model-value="appSettingsStore.write()"
            >
              {{ t('agora', 'Allow comments') }}
            </NcCheckboxRadioSwitch>
            <p class="setting-description">
              {{ t('agora', 'Allow users to comment on this inquiry type') }}
            </p>
          </div>

          <div class="setting-item">
            <NcCheckboxRadioSwitch
              v-model="appSettingsStore.inquiryTypeRights[selectedInquiryType].attachFileInquiry"
              type="switch"
              @update:model-value="appSettingsStore.write()"
            >
              {{ t('agora', 'Allow file attachments') }}
            </NcCheckboxRadioSwitch>
            <p class="setting-description">
              {{ t('agora', 'Allow users to attach files to this inquiry type') }}
            </p>
          </div>

          <div class="setting-item">
            <label for="editor-type-select">{{ t('agora', 'Editor type:') }}</label>
            <NcSelect
              id="editor-type-select"
              v-model="appSettingsStore.inquiryTypeRights[selectedInquiryType].editorType"
              :options="editorOptions"
              option-value="value"
              option-label="label"
              class="editor-select"
              @update:model-value="appSettingsStore.write()"
            />
            <p class="setting-description">
              {{ t('agora', 'Select the editor type for this inquiry') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.inquiry-rights-management {
  padding: 20px;
  max-width: 700px;
}

.description {
  color: var(--color-text-lighter);
  margin-bottom: 25px;
}

.loading,
.error {
  padding: 20px;
  text-align: center;
  color: var(--color-text-lighter);
}

.type-selection {
  margin-bottom: 30px;
}

.type-selection label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.type-select {
  max-width: 300px;
}

.settings-container {
  padding: 20px;
  background-color: var(--color-background-dark);
  border-radius: 8px;
}

.settings-container h3 {
  margin-top: 0;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--color-border);
}

.settings-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.setting-item {
  padding: 15px;
  background-color: var(--color-background-darker);
  border-radius: 8px;
}

.setting-item label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.editor-select {
  max-width: 250px;
  margin-top: 8px;
}

.setting-description {
  margin: 8px 0 0 0;
  font-size: 0.9em;
  color: var(--color-text-lighter);
  padding-left: 36px;
}
</style>
