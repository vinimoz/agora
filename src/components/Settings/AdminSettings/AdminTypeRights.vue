<!--
  - SPDX-FileCopyrightText: 2024 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { t } from '@nextcloud/l10n'
import { computed, ref, watch } from 'vue'
import NcCheckboxRadioSwitch from '@nextcloud/vue/components/NcCheckboxRadioSwitch'
import NcSelect from '@nextcloud/vue/components/NcSelect'
import NcButton from '@nextcloud/vue/components/NcButton'
import { Pencil } from 'lucide-vue-next'

import EngineSelectorModal from '../../Modals/EngineSelectorModal.vue'
import { useAppSettingsStore } from '../../../stores/appSettings.js'
import type { InquiryTypeRights } from '../../../utils/permissions'
import {
  ENGINE_DEFINITIONS,
  type EngineDefinition,
  type SupportFeature,
} from '../../../Types/votingType'

interface Props {
  selectedType?: {
    inquiry_type: string
    label?: string
  }
}

const props = defineProps<Props>()
const emit = defineEmits<{
  updateRights: [type: string, rights: InquiryTypeRights]
}>()

const appSettingsStore = useAppSettingsStore()

const editorOptions = [
  { value: 'wysiwyg', label: t('agora', 'Rich text editor') },
  { value: 'textarea', label: t('agora', 'Simple text area') },
  { value: 'texteditor', label: t('agora', 'Nextcloud text editor') },
]

//
// Anything with `supportFeature: true` in ENGINE_DEFINITIONS is eligible for
// the deliberation phase and therefore for the type-level default.
//
// We deliberately exclude `none` here because "no support" is a per-inquiry
// decision, not a sensible type-wide default. Drop the `id !== 'none'`
// check if you want to allow it.
const supportEngines = computed<Record<string, EngineDefinition>>(() => {
  const result: Record<string, EngineDefinition> = {}
  for (const [id, engine] of Object.entries(ENGINE_DEFINITIONS)) {
    if (engine.supportFeature && id !== 'none') {
      result[id] = engine
    }
  }
  return result
})

const typeRights = computed({
  get: () => {
    if (!props.selectedType) return {} as Partial<InquiryTypeRights>
    return (
      appSettingsStore.inquiryTypeRights[props.selectedType.inquiry_type] ||
      getDefaultRights()
    )
  },
  set: (newRights) => {
    if (props.selectedType) {
      emit('updateRights', props.selectedType.inquiry_type, newRights as InquiryTypeRights)
    }
  },
})

const getDefaultRights = (): InquiryTypeRights => ({
  supportInquiry: true,
  supportFeature: 'binary' as SupportFeature,
  supportConfig: {},
  commentInquiry: true,
  useResourceInquiry: true,
  editorType: 'wysiwyg',
})

watch(
  () => props.selectedType,
  (newType) => {
    if (newType && !appSettingsStore.inquiryTypeRights[newType.inquiry_type]) {
      emit('updateRights', newType.inquiry_type, getDefaultRights())
    }
  },
  { immediate: true },
)

const updateRights = () => {
  if (props.selectedType) {
    emit('updateRights', props.selectedType.inquiry_type, typeRights.value as InquiryTypeRights)
  }
}

watch(
  () => typeRights.value.supportInquiry,
  (enabled) => {
    if (!enabled) {
      // Reset to a safe default when support is turned off
      typeRights.value.supportFeature = 'binary'
      typeRights.value.supportConfig = {}
    }
    updateRights()
  },
)

const showEngineSelector = ref(false)

const currentEngineLabel = computed(() => {
  const id = typeRights.value.supportFeature
  return (id && ENGINE_DEFINITIONS[id]?.label) || t('agora', 'None')
})

const openEngineSelector = () => {
  if (!typeRights.value.supportInquiry) return
  showEngineSelector.value = true
}

const onEngineSelected = (data: {
  engine: string
  config: Record<string, unknown>
}) => {
  typeRights.value.supportFeature = data.engine as SupportFeature
  typeRights.value.supportConfig = data.config ?? {}
  updateRights()
}
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
        {{
          t(
            'agora',
            'Configure default rights and settings for this inquiry type',
          )
        }}
      </p>

      <div class="settings-list">
        <!-- Support enable/disable -->
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

        <!-- Engine selector – replaces the old binary/ternary radio pair -->
        <div v-if="typeRights.supportInquiry" class="setting-item engine-mode-setting">
          <div class="setting-label">
            {{ t('agora', 'Support mode') }}
          </div>

          <div class="engine-picker">
            <div class="engine-picker-info">
              <span class="engine-name">{{ currentEngineLabel }}</span>
              <span class="engine-id">({{ typeRights.supportFeature }})</span>
            </div>

            <NcButton
              type="secondary"
              @click="openEngineSelector"
            >
              <Pencil :size="16" />
              <span>{{ t('agora', 'Change method') }}</span>
            </NcButton>
          </div>

          <p class="setting-description">
            {{
              t(
                'agora',
                'Choose which voting method users can use to support this inquiry.',
              )
            }}
          </p>
        </div>

        <!-- Comments -->
        <div class="setting-item">
          <NcCheckboxRadioSwitch
            v-model="typeRights.commentInquiry"
            type="switch"
            @update:model-value="updateRights"
          >
            {{ t('agora', 'Allow comments') }}
          </NcCheckboxRadioSwitch>
          <p class="setting-description">
            {{
              t(
                'agora',
                'Allow users to comment on this inquiry type',
              )
            }}
          </p>
        </div>

        <!-- Resources -->
        <div class="setting-item">
          <NcCheckboxRadioSwitch
            v-model="typeRights.useResourceInquiry"
            type="switch"
            @update:model-value="updateRights"
          >
            {{ t('agora', 'Allow using resources') }}
          </NcCheckboxRadioSwitch>
          <p class="setting-description">
            {{
              t(
                'agora',
                'Allow users to use resources for this inquiry type',
              )
            }}
          </p>
        </div>

        <!-- Editor type -->
        <div class="setting-item">
          <label for="editor-type-select">
            {{ t('agora', 'Editor type') }}
          </label>
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

    <!-- The engine selector modal, in 'deliberative' mode -->
    <EngineSelectorModal
      v-if="showEngineSelector"
      mode="deliberative"
      :available-engines="supportEngines"
      :existing-engine="{
        engine: typeRights.supportFeature,
        config: typeRights.supportConfig || {},
      }"
      @close="showEngineSelector = false"
      @save="onEngineSelected"
    />
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

.engine-mode-setting {
  margin-left: 24px;
  border-left: 2px solid var(--color-border);
  padding-left: 16px;
}

.setting-label {
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--color-text-lighter);
}

.engine-picker {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 10px 12px;
  background: var(--color-main-background);
  border: 1px solid var(--color-border);
  border-radius: 8px;
}

.engine-picker-info {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.engine-name {
  font-weight: 600;
  color: var(--color-main-text);
}

.engine-id {
  font-size: 0.85em;
  color: var(--color-text-lighter);
}
</style>
