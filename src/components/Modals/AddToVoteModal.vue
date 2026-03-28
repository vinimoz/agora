<!-- SPDX-FileCopyrightText: 2024 Nextcloud contributors -->
<!-- SPDX-License-Identifier: AGPL-3.0-or-later -->
<template>
  <NcModal
    size="normal"
    :name="t('agora', 'Add option to vote')"
    @close="$emit('close')"
  >
    <div class="add-to-vote-modal">
      <div class="modal-header">
        <div class="header-icon">
          <Plus :size="32" />
        </div>
        <h3>{{ t('agora', 'Add to vote') }}</h3>
        <p class="modal-description">
          {{ t('agora', 'Add an existing option from any family to become a voting candidate. The original option will be archived and a copy will be created for voting.') }}
        </p>
      </div>

      <div class="modal-content">
        <div class="search-section">
          <label>{{ t('agora', 'Select an option') }}</label>
          <SearchSelect
            v-model="selectedOption"
            type="options"
            :inquiry-id="inquiryId"
            :placeholder="t('agora', 'Search by title or #id...')"
            class="search-select"
          />
        </div>

        <div v-if="selectedOption" class="vote-config-section">
          <div class="config-header">
            <Settings :size="18" />
            <h4>{{ t('agora', 'Voting configuration') }}</h4>
          </div>

          <div class="engine-selection">
            <label>{{ t('agora', 'Voting method') }}</label>
            <div class="engine-options-grid">
              <button
                v-for="engine in engines"
                :key="engine.id"
                class="engine-card-small"
                :class="{ 
                  selected: selectedEngine === engine.id,
                  [engine.behavior]: true 
                }"
                @click="selectEngine(engine.id)"
              >
                <component :is="getEngineIcon(engine.id)" :size="20" />
                <span class="engine-name">{{ engine.label }}</span>
                <span class="engine-badge-mini" :class="engine.behavior">
                  {{ getBehaviorLabel(engine.behavior) }}
                </span>
              </button>
            </div>
          </div>

          <div v-if="selectedEngine && currentConfigSchema" class="engine-config-details">
            <div class="config-fields">
              <div v-for="(schema, key) in currentConfigSchema" :key="key" class="config-field">
                <label>{{ schema.label || key }}</label>
                
                <input
                  v-if="schema.type === 'number'"
                  v-model="engineConfig[key]"
                  type="number"
                  :min="schema.min"
                  :max="schema.max"
                  class="config-input"
                />
                
                <input
                  v-else-if="schema.type === 'string'"
                  v-model="engineConfig[key]"
                  type="text"
                  class="config-input"
                />
                
                <label v-else-if="schema.type === 'boolean'" class="checkbox-label">
                  <input v-model="engineConfig[key]" type="checkbox" />
                  <span>{{ t('agora', 'Enable') }}</span>
                </label>
                
                <select
                  v-else-if="schema.type === 'array' && schema.options"
                  v-model="engineConfig[key]"
                  class="config-select"
                >
                  <option v-for="opt in schema.options" :key="opt" :value="opt">
                    {{ opt }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn-secondary" @click="$emit('close')">
          {{ t('agora', 'Cancel') }}
        </button>
        <button 
          class="btn-primary" 
          :disabled="!canAdd"
          :class="{ loading: loading }"
          @click="add"
        >
          <Plus :size="16" />
          {{ loading ? t('agora', 'Adding...') : t('agora', 'Add to vote') }}
        </button>
      </div>
    </div>
  </NcModal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { t } from '@nextcloud/l10n'
import NcModal from '@nextcloud/vue/components/NcModal'
import { showSuccess, showError } from '@nextcloud/dialogs'
import SearchSelect from '../Base/modules/SearchSelect.vue'
import { useInquiryStore } from '../../stores/inquiry'
import { useOptionsStore } from '../../stores/options'
import { OptionsAPI, InquiriesAPI } from '../../Api/index'
import type { Option } from '../../Types/index'
import {
  Plus,
  Vote,
  Settings,
  ThumbsUp,
  Scale,
  Heart,
  Star,
  CheckCircle,
  TrendingUp,
  Award,
  Brain,
  Gauge,
  Users
} from 'lucide-vue-next'

const props = defineProps<{
  engines: Array<{
    id: string
    label: string
    behavior: string
    description: string
  }>
  engineDefinitions: Record<string, any>
  currentEngineId?: string
}>()

const emit = defineEmits<{
  close: []
  success: []
}>()

const inquiryStore = useInquiryStore()
const optionsStore = useOptionsStore()
const inquiryId = computed(() => inquiryStore.id)

const selectedOption = ref<Option | null>(null)
const selectedEngine = ref<string>(props.currentEngineId || '')
const engineConfig = ref<Record<string, any>>({})
const loading = ref(false)

const currentConfigSchema = computed(() => {
  if (!selectedEngine.value) return null
  const engine = props.engineDefinitions[selectedEngine.value]
  return engine?.config_schema || null
})

const canAdd = computed(() => selectedOption.value !== null && selectedEngine.value !== '')

const getEngineIcon = (engineId: string) => {
  const icons: Record<string, any> = {
    binary: ThumbsUp,
    ternary: Scale,
    reaction: Heart,
    score: Star,
    approval: CheckCircle,
    ranked: TrendingUp,
    borda: Award,
    condorcet: Brain,
    majority_judgment: Gauge,
    token_weighted: Users,
    quadratic: TrendingUp
  }
  return icons[engineId] || Vote
}

const getBehaviorLabel = (behavior: string) => {
  const labels = {
    single: t('agora', 'Single choice'),
    multi: t('agora', 'Multiple choices'),
    flex: t('agora', 'Flexible')
  }
  return labels[behavior as keyof typeof labels] || behavior
}

const selectEngine = (engineId: string) => {
  selectedEngine.value = engineId
  const schema = props.engineDefinitions[engineId]?.config_schema
  if (schema) {
    const newConfig: Record<string, any> = {}
    for (const [key, value] of Object.entries(schema)) {
      newConfig[key] = value.default
    }
    engineConfig.value = newConfig
  }
}

async function archiveOption(option: Option) {
  const miscFields = option.miscFields || {}
  const updatedMiscFields = {
    ...miscFields,
    archived: true,
    archive_root_id: option.id
  }

  const miscFieldsArray = Object.entries(updatedMiscFields).map(([key, value]) => ({
    key,
    value: typeof value === 'object' ? JSON.stringify(value) : String(value)
  }))

  await OptionsAPI.updateOption(option.id, {
    status: 'archived',
    miscFields: miscFieldsArray
  })
}

async function cloneOptionForVote(original: Option): Promise<Option> {
  const miscFields = original.miscFields || {}
  const cloneMiscFields = {
    ...miscFields,
    archive_parent_id: original.id,
    archive_root_id: original.id
  }

  const miscFieldsArray = Object.entries(cloneMiscFields).map(([key, value]) => ({
    key,
    value: typeof value === 'object' ? JSON.stringify(value) : String(value)
  }))

  const cloneData = {
    title: original.title,
    text: original.text,
    type: 'candidate',
    targetId: original.targetId,
    parentId: original.parentId,
    ownedGroup: original.ownedGroup || '',
    access: original.configuration?.access || 'open',
    status: 'published',
    supportFeature: original.configuration?.supportFeature || selectedEngine.value,
    allowComment: original.configuration?.allowComment || 0,
    family: original.family,
    miscFields: miscFieldsArray
  }

  const response = await OptionsAPI.createOption(cloneData)
  return response.data.option
}

async function add() {
  if (!selectedOption.value || !selectedEngine.value) return

  loading.value = true
  try {
    await archiveOption(selectedOption.value)
    const clonedOption = await cloneOptionForVote(selectedOption.value)

    const currentMiscFields = clonedOption.miscFields || {}
    const forceLayouts = currentMiscFields.force_layouts || []
    const updatedLayouts = [...forceLayouts, 'vote']
    
    const miscFieldsArray = Object.entries({
      ...currentMiscFields,
      force_layouts: JSON.stringify(updatedLayouts)
    }).map(([key, value]) => ({
      key,
      value: typeof value === 'object' ? JSON.stringify(value) : String(value)
    }))

    await OptionsAPI.updateOption(clonedOption.id, {
      miscFields: miscFieldsArray
    })

    const decision = {
      engine: selectedEngine.value,
      config: engineConfig.value,
      status: 'open',
      phase: 'voting'
    }

    const inquiryMiscFields = inquiryStore.miscFields || {}
    const inquiryMiscFieldsArray = Object.entries({
      ...inquiryMiscFields,
      decision: JSON.stringify(decision)
    }).map(([key, value]) => ({
      key,
      value: typeof value === 'object' ? JSON.stringify(value) : String(value)
    }))

    await InquiriesAPI.updateInquiry(inquiryStore.id, { miscFields: inquiryMiscFieldsArray })

    await inquiryStore.load()
    await optionsStore.load()

    showSuccess(t('agora', 'Option added to vote successfully!'))
    emit('success')
    emit('close')
  } catch (error) {
    console.error('Error adding option to vote:', error)
    showError(t('agora', 'Failed to add option to vote'))
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.add-to-vote-modal {
  padding: 0;
  max-width: 600px;
  background: var(--color-main-background);
  border-radius: 24px;
  overflow: hidden;

  .modal-header {
    text-align: center;
    padding: 32px 32px 24px;
    background: linear-gradient(135deg, rgba(var(--color-primary-element-rgb), 0.05) 0%, rgba(var(--color-primary-element-rgb), 0.02) 100%);
    border-bottom: 1px solid var(--color-border);

    .header-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 64px;
      height: 64px;
      background: linear-gradient(135deg, var(--color-primary-element) 0%, var(--color-primary-element-light) 100%);
      border-radius: 32px;
      margin-bottom: 16px;
      color: white;
    }

    h3 {
      margin: 0 0 8px 0;
      font-size: 24px;
      font-weight: 700;
    }

    .modal-description {
      margin: 0;
      font-size: 14px;
      color: var(--color-text-lighter);
    }
  }

  .modal-content {
    padding: 24px;

    .search-section {
      margin-bottom: 24px;

      label {
        display: block;
        margin-bottom: 8px;
        font-weight: 600;
        font-size: 14px;
      }

      .search-select {
        width: 100%;
      }
    }

    .vote-config-section {
      .config-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 20px;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--color-border);

        svg {
          color: var(--color-primary-element);
        }

        h4 {
          margin: 0;
          font-size: 15px;
          font-weight: 600;
        }
      }

      .engine-selection {
        margin-bottom: 24px;

        label {
          display: block;
          margin-bottom: 12px;
          font-weight: 600;
          font-size: 13px;
        }

        .engine-options-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          gap: 8px;

          .engine-card-small {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 10px 12px;
            background: var(--color-background-dark);
            border: 2px solid transparent;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.2s;

            svg {
              color: var(--color-text-lighter);
            }

            .engine-name {
              flex: 1;
              font-size: 13px;
              font-weight: 500;
            }

            .engine-badge-mini {
              font-size: 9px;
              padding: 2px 6px;
              border-radius: 10px;

              &.single { background: #3498db20; color: #3498db; }
              &.multi { background: #9b59b620; color: #9b59b6; }
              &.flex { background: #e67e2220; color: #e67e22; }
            }

            &:hover {
              background: var(--color-background-hover);
              transform: translateY(-1px);
            }

            &.selected {
              border-color: var(--color-primary-element);
              background: rgba(var(--color-primary-element-rgb), 0.05);

              svg {
                color: var(--color-primary-element);
              }
            }
          }
        }
      }

      .engine-config-details {
        padding: 16px;
        background: var(--color-background-dark);
        border-radius: 12px;

        .config-fields {
          display: flex;
          flex-direction: column;
          gap: 16px;

          .config-field {
            label {
              display: block;
              margin-bottom: 6px;
              font-size: 12px;
              font-weight: 500;
            }

            .config-input, .config-select {
              width: 100%;
              padding: 8px 12px;
              border: 1px solid var(--color-border);
              border-radius: 8px;
              background: var(--color-main-background);
              font-size: 13px;
              transition: all 0.2s;

              &:focus {
                outline: none;
                border-color: var(--color-primary-element);
                box-shadow: 0 0 0 2px rgba(var(--color-primary-element-rgb), 0.1);
              }
            }

            .checkbox-label {
              display: flex;
              align-items: center;
              gap: 8px;
              cursor: pointer;

              input {
                width: 16px;
                height: 16px;
                cursor: pointer;
              }

              span {
                font-size: 13px;
                font-weight: normal;
              }
            }
          }
        }
      }
    }
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    padding: 20px 24px;
    background: var(--color-background-dark);
    border-top: 1px solid var(--color-border);

    .btn-secondary, .btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 20px;
      border: none;
      border-radius: 12px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    .btn-secondary {
      background: var(--color-background-hover);
      color: var(--color-main-text);

      &:hover:not(:disabled) {
        background: var(--color-background-dark);
        transform: translateY(-1px);
      }
    }

    .btn-primary {
      background: linear-gradient(135deg, var(--color-primary-element) 0%, var(--color-primary-element-light) 100%);
      color: white;

      &.loading {
        opacity: 0.7;
        cursor: wait;
      }

      &:hover:not(:disabled):not(.loading) {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(var(--color-primary-element-rgb), 0.3);
      }
    }
  }
}
</style>
