<!--
  - SPDX-FileCopyrightText: 2024 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { t } from '@nextcloud/l10n'
import { computed, watch } from 'vue'
import NcCheckboxRadioSwitch from '@nextcloud/vue/components/NcCheckboxRadioSwitch'
import NcSelect from '@nextcloud/vue/components/NcSelect'
import { useAppSettingsStore } from '../../../stores/appSettings.js'
import type { InquiryTypeRights } from '../../utils/permissions'

interface Props {
  selectedType?: {
    inquiry_type: string
  }
}

const props = defineProps<Props>()
const emit = defineEmits<{
  updateRights: [type: string, rights: InquiryTypeRights]
}>()

const appSettingsStore = useAppSettingsStore()

const editorOptions = [
  { value: 'wysiwyg', label: t('agora', 'Rich Text Editor') },
  { value: 'textarea', label: t('agora', 'Simple Text Area') },
  { value: 'texteditor', label: t('agora', 'Nextcloud text editor') },
]

const typeRights = computed({
  get: () => {
    if (!props.selectedType) return {}
    return appSettingsStore.inquiryTypeRights[props.selectedType.inquiry_type] || getDefaultRights()
  },
  set: (newRights) => {
    if (props.selectedType) {
      emit('updateRights', props.selectedType.inquiry_type, newRights)
    }
  }
})

const getDefaultRights = () => ({
  supportInquiry: true,
  supportFeature: 'binary',
  commentInquiry: true,
  useResourceInquiry: true,
  editorType: 'wysiwyg'
})

watch(() => props.selectedType, (newType) => {
  if (newType && !appSettingsStore.inquiryTypeRights[newType.inquiry_type]) {
    const defaultRights = getDefaultRights()
    emit('updateRights', newType.inquiry_type, defaultRights)
  }
}, { immediate: true })

const updateRights = () => {
  if (props.selectedType) {
    emit('updateRights', props.selectedType.inquiry_type, typeRights.value)
  }
}

watch(() => typeRights.value.supportInquiry, (enabled) => {
  if (!enabled) {
    typeRights.value.supportFeature = 'binary'
  }
  updateRights()
})

</script>

<template>
  <div class="type-rights">
    <div class="header">
      <h2>
        {{ t('agora', 'Rights for {type}', { type: selectedType?.label }) }}
      </h2>
      <p v-if="selectedType" class="type-id">
      {{ selectedType.inquiry_type }}
      </p>
    </div>

    <div v-if="selectedType" class="settings-container">
        <p class="description">
        {{ t('agora', 'Configure default rights and settings for this inquiry type') }}
        </p>

        <div class="settings-list">
            <div class="setting-item">
                <NcCheckboxRadioSwitch
                        v-model="typeRights.supportInquiry"
                        type="switch"
                        @update:model-value="updateRights"
                        >
                        {{ t('agora', 'Allow support') }}
                </NcCheckboxRadioSwitch>
                <p class="setting-description">
                {{ t('agora', 'Allow users to support this inquiry type') }}
                </p>
            </div>

            <!-- Ternary mode setting - only show when support is enabled -->
            <div v-if="typeRights.supportInquiry" class="setting-item ternary-mode-setting">
                <div class="setting-label">
                    {{ t('agora', 'Support mode') }}
                </div>
                <div class="mode-options">
                    <NcCheckboxRadioSwitch
                            v-model="typeRights.supportFeature"
                            type="radio"
                            value="binary"
                            name="supportFeature"
                            @update:model-value="updateRights"
                            >
                            {{ t('agora', 'Simple mode') }}
                    </NcCheckboxRadioSwitch>
                    <p class="mode-description">
                    {{ t('agora', 'People can support or not support') }}
                    </p>
                </div>

                <div class="mode-options">
                    <NcCheckboxRadioSwitch
                            v-model="typeRights.supportFeature"
                            type="radio"
                            value="ternary"
                            name="supportFeature"
                            @update:model-value="updateRights"
                            >
                            {{ t('agora', 'Ternary mode') }}
                    </NcCheckboxRadioSwitch>
                    <p class="mode-description">
                    {{ t('agora', 'People can support, be neutral, or oppose') }}
                    </p>
                </div>
            </div>
        </div>
        <div class="setting-item">
            <NcCheckboxRadioSwitch
                    v-model="typeRights.commentInquiry"
                    type="switch"
                    @update:model-value="updateRights"
                    >
                    {{ t('agora', 'Allow comments') }}
            </NcCheckboxRadioSwitch>
            <p class="setting-description">
            {{ t('agora', 'Allow users to comment on this inquiry type') }}
            </p>
        </div>

        <div class="setting-item">
            <NcCheckboxRadioSwitch
                    v-model="typeRights.useResourceInquiry"
                    type="switch"
                    @update:model-value="updateRights"
                    >
                    {{ t('agora', 'Allow using resources') }}
            </NcCheckboxRadioSwitch>
            <p class="setting-description">
            {{ t('agora', 'Allow users to use resources for this inquiry type') }}
            </p>
        </div>

        <div class="setting-item">
            <label for="editor-type-select">{{ t('agora', 'Editor type') }}</label>
            <NcSelect
                    id="editor-type-select"
                    v-model="typeRights.editorType"
                    :options="editorOptions"
                    option-value="value"
                    option-label="label"
                    class="editor-select"
                    @update:model-value="updateRights"
                    />
            <p class="setting-description">
            {{ t('agora', 'Select the editor type for this inquiry') }}
            </p>
        </div>
    </div>
  </div>
</template>

<style scoped>
.type-rights {
    padding: 20px;
}

.header {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 25px;
}

.header h2 {
    margin: 0;
    color: var(--color-text-light);
}

.description {
    color: var(--color-text-lighter);
    margin-bottom: 25px;
}

.settings-container {
    padding: 20px;
    background-color: var(--color-background-dark);
    border-radius: 8px;
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

.no-selection {
    text-align: center;
    padding: 40px;
    color: var(--color-text-lighter);
}

.ternary-mode-setting {
    margin-left: 24px;
    border-left: 2px solid var(--color-border);
    padding-left: 16px;
}

.setting-label {
    font-weight: 600;
    margin-bottom: 12px;
    color: var(--color-text-lighter);
}

.mode-options {
    margin-bottom: 16px;
    padding: 8px 0;
}

.mode-description {
    margin: 4px 0 0 24px;
    font-size: 0.9em;
    color: var(--color-text-maxcontrast);
    line-height: 1.4;
}
</style>
