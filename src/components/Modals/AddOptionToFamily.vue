<!-- SPDX-FileCopyrightText: 2024 Nextcloud contributors -->
<!-- SPDX-License-Identifier: AGPL-3.0-or-later -->
<template>
  <NcModal
    size="normal"
    :name="modalTitle"
    @close="$emit('close')"
  >
    <div class="add-option-to-family-modal">
      <div class="modal-header">
        <div class="header-icon" :class="{ 'vote-icon': familyType === 'vote' }">
          <component :is="headerIcon" :size="32" />
        </div>
        <h3>{{ modalTitle }}</h3>
        <p class="modal-description">
          {{ modalDescription }}
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

        <!-- Date range selection for timeline -->
        <div v-if="familyType === 'timeline' && selectedOption" class="timeline-config-section">
          <div class="config-header">
            <Clock :size="18" />
            <h4>{{ t('agora', 'Date range') }}</h4>
          </div>
          
          <div class="date-selector">
            <div class="date-field">
              <label>{{ t('agora', 'Start date') }} *</label>
              <NcDateTimePickerNative
                v-model="startDate"
                type="date"
                :placeholder="t('agora', 'Select start date')"
                :clearable="false"
                required
              />
            </div>
            
            <div class="date-field">
              <label>{{ t('agora', 'End date (optional)') }}</label>
              <NcDateTimePickerNative
                v-model="endDate"
                type="date"
                :placeholder="t('agora', 'Select end date')"
                :clearable="true"
              />
            </div>
          </div>
        </div>

        <!-- Column selection for kanban -->
        <div v-if="familyType === 'kanban' && selectedOption" class="kanban-config-section">
          <div class="config-header">
            <LayoutGrid :size="18" />
            <h4>{{ t('agora', 'Select column') }}</h4>
          </div>
          
          <div class="column-selector">
            <div class="column-options">
              <button
                v-for="column in statusColumns"
                :key="column.value"
                class="column-option"
                :class="{ selected: targetStatus === column.value }"
                @click="targetStatus = column.value"
              >
                <span class="column-color" :style="{ backgroundColor: column.color }" />
                <span class="column-label">{{ column.label }}</span>
                <span v-if="targetStatus === column.value" class="check-icon">
                  <Check :size="14" />
                </span>
              </button>
            </div>
          </div>
        </div>

        <!-- Configuration section for vote family -->
        <div v-if="familyType === 'vote' && selectedOption" class="vote-config-section">
          <div class="config-header">
            <Settings :size="18" />
            <h4>{{ t('agora', 'Voting configuration') }}</h4>
          </div>

          <div class="engine-info-message">
            <div class="engine-badge-display">
              <component :is="getEngineIcon(currentEngineId)" :size="16" />
              <span>{{ getEngineLabel(currentEngineId) }}</span>
              <span class="engine-badge-mini" :class="currentEngineBehavior">
                {{ getBehaviorLabel(currentEngineBehavior) }}
              </span>
            </div>
            <p class="engine-description">
              {{ currentEngineDescription }}
            </p>
          </div>

          <div v-if="hasConfigFields" class="engine-config-details">
            <div class="config-fields">
              <div v-for="(schema, key) in currentConfigSchema" :key="key" class="config-field">
                <label>{{ schema.label || key }}</label>
                
                <input
                  v-if="schema.type === 'number'"
                  v-model.number="engineConfig[key]"
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

                <p v-if="schema.description" class="config-description">
                  {{ schema.description }}
                </p>
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
          <component :is="actionIcon" :size="16" />
          {{ loading ? t('agora', 'Adding...') : actionButtonText }}
        </button>
      </div>
    </div>
  </NcModal>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { t } from '@nextcloud/l10n'
import NcModal from '@nextcloud/vue/components/NcModal'
import NcDateTimePickerNative from '@nextcloud/vue/components/NcDateTimePickerNative'
import { showSuccess, showError } from '@nextcloud/dialogs'
import SearchSelect from '../Base/modules/SearchSelect.vue'
import { useInquiryStore } from '../../stores/inquiry'
import { useOptionsStore } from '../../stores/options'
import type { Option, EngineDefinition, MiscField } from '../../Types/index'

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
  Users,
  LayoutGrid,
  Clock,
  Check
} from 'lucide-vue-next'

// Types
type FamilyType = 'vote' | 'timeline' | 'kanban'

// Props
const props = defineProps<{
  familyType: FamilyType
  currentEngineId?: string
  currentEngineDefinition?: EngineDefinition
  // currentEngineConfig?: Record<string, unknown>
}>()

const emit = defineEmits<{
  close: []
  success: []
}>()

const inquiryStore = useInquiryStore()
const optionsStore = useOptionsStore()
const inquiryId = computed(() => {
  // Ensure we have a valid inquiry ID
  const id = inquiryStore.id
  if (!id || id === 0) {
    console.warn('Invalid inquiry ID in AddOptionToFamily:', id)
    return null
  }
  return id
})

const selectedOption = ref<Option | null>(null)
const startDate = ref<Date | null>(null)
const endDate = ref<Date | null>(null)
const targetStatus = ref<string | null>(null)
const engineConfig = ref<Record<string, unknown>>({})
const loading = ref(false)

// Status columns for kanban
const statusColumns = [
  { value: 'draft', label: t('agora', 'Draft'), color: '#949494' },
  { value: 'active', label: t('agora', 'Active'), color: '#3498db' },
  { value: 'completed', label: t('agora', 'Completed'), color: '#27ae60' },
  { value: 'cancelled', label: t('agora', 'Cancelled'), color: '#e74c3c' }
]

// Modal content based on family type
const modalTitle = computed(() => {
  switch (props.familyType) {
    case 'vote':
      return t('agora', 'Add option to vote')
    case 'timeline':
      return t('agora', 'Add option to timeline')
    case 'kanban':
      return t('agora', 'Add option to board')
    default:
      return t('agora', 'Add option')
  }
})

const modalDescription = computed(() => {
  switch (props.familyType) {
    case 'vote':
      return t('agora', 'Add an existing option to become a voting candidate.')
    case 'timeline':
      return t('agora', 'Add an existing option to the timeline view. Set the date range for when this option should appear.')
    case 'kanban':
      return t('agora', 'Add an existing option to the kanban board. Choose which column to place it in.')
    default:
      return t('agora', 'Add an existing option to this view.')
  }
})

const headerIcon = computed(() => {
  switch (props.familyType) {
    case 'vote': return Vote
    case 'timeline': return Clock
    case 'kanban': return LayoutGrid
    default: return Plus
  }
})

const actionIcon = computed(() => {
  switch (props.familyType) {
    case 'vote': return Vote
    case 'timeline': return Clock
    case 'kanban': return LayoutGrid
    default: return Plus
  }
})

const actionButtonText = computed(() => {
  switch (props.familyType) {
    case 'vote':
      return t('agora', 'Add to vote')
    case 'timeline':
      return t('agora', 'Add to timeline')
    case 'kanban':
      return t('agora', 'Add to board')
    default:
      return t('agora', 'Add')
  }
})

// Validation
const canAdd = computed(() => {
  if (!selectedOption.value) return false
  
  switch (props.familyType) {
    case 'timeline':
      return startDate.value !== null
    case 'kanban':
      return targetStatus.value !== null
    case 'vote':
      return true
    default:
      return true
  }
})

// Engine helpers
const currentEngineBehavior = computed(() => {
  if (props.familyType !== 'vote') return null
  return props.currentEngineDefinition?.behavior || 'single'
})

const currentEngineDescription = computed(() => {
  if (props.familyType !== 'vote') return ''
  return props.currentEngineDefinition?.description || ''
})

const currentConfigSchema = computed(() => {
  if (props.familyType !== 'vote') return null
  return props.currentEngineDefinition?.config_schema || null
})

const hasConfigFields = computed(() => currentConfigSchema.value && Object.keys(currentConfigSchema.value).length > 0)

// Helper to get force_layouts from miscFields
function getForceLayouts(option: Option): string[] {
  const miscFields = option.miscFields || {}
  const forceLayouts = miscFields.force_layouts
  if (Array.isArray(forceLayouts)) return forceLayouts
  if (typeof forceLayouts === 'string') {
    try {
      return JSON.parse(forceLayouts)
    } catch {
      return []
    }
  }
  return []
}

function getEngineIcon(engineId: string): unknown {
  const icons: Record<string, unknown> = {
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

function getEngineLabel(engineId: string): string {
  const labels: Record<string, string> = {
    binary: t('agora', 'Yes / No'),
    ternary: t('agora', 'For / Abstain / Against'),
    reaction: t('agora', 'Reactions'),
    score: t('agora', 'Score Voting'),
    approval: t('agora', 'Approval Voting'),
    ranked: t('agora', 'Ranked Choice'),
    borda: t('agora', 'Borda Count'),
    condorcet: t('agora', 'Condorcet'),
    majority_judgment: t('agora', 'Majority Judgment'),
    token_weighted: t('agora', 'Token / Weighted'),
    quadratic: t('agora', 'Quadratic Voting')
  }
  return labels[engineId] || engineId
}

function getBehaviorLabel(behavior: string): string {
  const labels: Record<string, string> = {
    single: t('agora', 'Single choice'),
    multi: t('agora', 'Multiple choices'),
    flex: t('agora', 'Flexible')
  }
  return labels[behavior] || behavior
}


async function addToKanban(): Promise<void> {
  if (!selectedOption.value || !targetStatus.value) return

  try {
    // Check if option already has kanban in force_layouts
    const forceLayouts = getForceLayouts(selectedOption.value)
    if (forceLayouts.includes('kanban')) {
      showError(t('agora', 'Option already added to kanban board'))
      return
    }

    // Add kanban to force_layouts
    const updatedLayouts = [...forceLayouts, 'kanban']

    // Prepare miscFields update
    const currentMiscFields = selectedOption.value.miscFields || {}
    const miscFieldsUpdate: Record<string, MiscField> = {
      ...currentMiscFields,
      force_layouts: JSON.stringify(updatedLayouts)
    }

    // Update the option - first update the status, then the misc fields
    // If updateOptionFromModal expects (id, status, miscFields)
    await optionsStore.updateOptionFromModal(
      selectedOption.value.id,
      targetStatus.value,  // Update the status to the selected column
      miscFieldsUpdate
    )
  } catch (error) {
    console.error('Error in addToKanban:', error)
    throw error
  }
}

async function addToTimeline(): Promise<void> {
  if (!selectedOption.value || !startDate.value) return

  try {
    // Check if option already has timeline in force_layouts
    const forceLayouts = getForceLayouts(selectedOption.value)
    if (forceLayouts.includes('timeline')) {
      showError(t('agora', 'Option already added to timeline'))
      return
    }

    // Add timeline to force_layouts
    const updatedLayouts = [...forceLayouts, 'timeline']
    
    // Prepare miscFields with timeline dates
    const currentMiscFields = selectedOption.value.miscFields || {}
    const miscFieldsUpdate: Record<string, MiscField> = {
      ...currentMiscFields,
      force_layouts: JSON.stringify(updatedLayouts),
      start_date: startDate.value.toISOString()
    }
    
    if (endDate.value) {
      miscFieldsUpdate.end_date = endDate.value.toISOString()
    }

    // Update the option
    await optionsStore.updateOptionFromModal(
      selectedOption.value.id,
      selectedOption.value.status?.optionStatus || 'draft',
      miscFieldsUpdate
    )
  } catch (error) {
    console.error('Error in addToTimeline:', error)
    throw error
  }
}

async function addToVote(): Promise<void> {
  if (!selectedOption.value) return

  try {
    // Check if option already has vote in force_layouts
    const forceLayouts = getForceLayouts(selectedOption.value)
    if (forceLayouts.includes('vote')) {
      showError(t('agora', 'Option already added to vote'))
      return
    }

    // Add vote to force_layouts
    const updatedLayouts = [...forceLayouts, 'vote']

    // Prepare miscFields with vote
    const currentMiscFields = selectedOption.value.miscFields || {}
    const miscFieldsUpdate: Record<string, MiscFields> = {
      ...currentMiscFields,
      force_layouts: JSON.stringify(updatedLayouts),
      start_date: currentMiscFields.start_date || new Date().toISOString() 
    }
    
    await optionsStore.updateOptionFromModal(
      selectedOption.value.id,
      selectedOption.value.status?.optionStatus || 'draft',
      miscFieldsUpdate
    )
  } catch (error) {
    console.error('Error in addToVote:', error)
    throw error
  }
}


async function add(): Promise<void> {
  if (!selectedOption.value) return

  // Check if we have a valid inquiry ID before proceeding
  if (!inquiryId.value) {
    showError(t('agora', 'Invalid inquiry context. Please refresh the page and try again.'))
    return
  }

  loading.value = true
  try {
    switch (props.familyType) {
      case 'kanban':
        await addToKanban()
        break
      case 'timeline':
        await addToTimeline()
        break
      case 'vote':
        await addToVote()
       break 
    }
    
    // Refresh data - but only if we have a valid inquiry ID
    if (inquiryId.value && inquiryId.value !== 0) {
      try {
        await inquiryStore.load()
        await optionsStore.load()
      } catch (refreshError) {
        console.warn('Could not refresh data after adding option:', refreshError)
        // Don't throw here - the operation succeeded, just refresh failed
      }
    }
    
    showSuccess(t('agora', 'Option added to {family} successfully!', {
      family: props.familyType === 'timeline' ? t('agora', 'timeline') : t('agora', 'board')
    }))
    
    emit('success')
    emit('close')
  } catch (error) {
    console.error(`Error adding option to ${props.familyType}:`, error)
    showError(t('agora', 'Failed to add option to {family}', {
      family: props.familyType === 'timeline' ? t('agora', 'timeline') : t('agora', 'board')
    }))
  } finally {
    loading.value = false
  }
}

// Watch for changes in selected option to validate
watch(selectedOption, (newOption) => {
  if (newOption && !inquiryId.value) {
    console.warn('Selected option but inquiry ID is invalid')
  }
})

// Log on mount for debugging
onMounted(() => {
  if (!inquiryId.value || inquiryId.value === 0) {
    console.warn('AddOptionToFamily mounted with invalid inquiry ID:', inquiryId.value)
  }
})
</script>

<style scoped lang="scss">
.add-option-to-family-modal {
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

      &.vote-icon {
        background: linear-gradient(135deg, #3498db 0%, #9b59b6 100%);
      }
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

    .timeline-config-section,
    .kanban-config-section,
    .vote-config-section {
      margin-top: 24px;

      .config-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 16px;
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
    }

    .date-selector {
      display: flex;
      flex-direction: column;
      gap: 16px;

      .date-field {
        label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          font-size: 13px;
        }
      }
    }

    .column-options {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;

      .column-option {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 12px;
        background: var(--color-background-dark);
        border: 2px solid transparent;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.2s;

        .column-color {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .column-label {
          flex: 1;
          font-size: 13px;
          font-weight: 500;
        }

        .check-icon {
          color: var(--color-success);
        }

        &:hover {
          background: var(--color-background-hover);
        }

        &.selected {
          border-color: var(--color-primary-element);
          background: rgba(var(--color-primary-element-rgb), 0.05);
        }
      }
    }

    .vote-config-section {
      .engine-info-message {
        margin-bottom: 20px;
        padding: 16px;
        background: var(--color-background-dark);
        border-radius: 12px;

        .engine-badge-display {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          background: var(--color-main-background);
          border-radius: 20px;
          margin-bottom: 12px;
          font-weight: 500;
          font-size: 13px;

          .engine-badge-mini {
            font-size: 9px;
            padding: 2px 8px;
            border-radius: 12px;

            &.single { background: #3498db20; color: #3498db; }
            &.multi { background: #9b59b620; color: #9b59b6; }
            &.flex { background: #e67e2220; color: #e67e22; }
          }
        }

        .engine-description {
          margin: 0;
          font-size: 13px;
          color: var(--color-text-lighter);
          line-height: 1.5;
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
              font-weight: 600;
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

            .config-description {
              margin: 4px 0 0 0;
              font-size: 11px;
              color: var(--color-text-lighter);
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
