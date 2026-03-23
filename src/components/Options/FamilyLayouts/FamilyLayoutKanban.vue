<!--
  SPDX-FileCopyrightText: 2024 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="kanban-layout">
    <!-- Add option button -->
    <div class="kanban-actions">
      <NcButton
        type="primary"
        class="add-kanban-btn"
        @click="showAddModal = true"
      >
        <template #icon>
          <component :is="InquiryOptionIcons.Plus" :size="18" />
        </template>
        {{ t('agora', 'Add to board') }}
      </NcButton>
    </div>

    <!-- Add option modal -->
    <NcModal 
      v-if="showAddModal" 
      size="normal"
      :name="t('agora', 'Add option to kanban board')"
      @close="showAddModal = false"
    >
      <div class="add-option-modal">
        <div class="search-section">
          <h4>{{ t('agora', 'Add existing option') }}</h4>
          <p class="section-desc">{{ t('agora', 'Search and add an option already created') }}</p>
          
          <div class="search-controls">
            <SearchSelect
              v-model="selectedOption"
              type="options"
              :inquiry-id="inquiryId"
              :placeholder="t('agora', 'Search for an option by title or #id…')"
              class="search-select"
            />

            <div v-if="selectedOption" class="column-selector">
              <label>{{ t('agora', 'Move to column') }}</label>
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
                    <component :is="InquiryOptionIcons.Check" :size="14" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-actions">
          <NcButton @click="showAddModal = false">
            {{ t('agora', 'Cancel') }}
          </NcButton>
          <NcButton
            type="primary"
            :disabled="!canAddExisting"
            @click="addExistingToKanban"
          >
            <template #icon>
              <component :is="InquiryOptionIcons.Plus" :size="18" />
            </template>
            {{ t('agora', 'Add to board') }}
          </NcButton>
        </div>
      </div>
    </NcModal>

    <!-- Column headers -->
    <div class="kanban-header">
      <div 
        v-for="status in statusColumns" 
        :key="status.value"
        class="kanban-column-header"
        :class="`status-${status.value}`"
        @dragover.prevent
        @drop="handleDrop($event, status.value)"
      >
        <div class="header-content">
          <span class="status-badge" :style="{ backgroundColor: status.color }" />
          <span class="status-label">{{ status.label }}</span>
          <span class="item-count">{{ getOptionsByStatus(status.value).length }}</span>
        </div>
      </div>
    </div>

    <!-- Kanban columns -->
    <div class="kanban-board">
      <div 
        v-for="status in statusColumns" 
        :key="status.value"
        class="kanban-column"
        :class="`column-${status.value}`"
        @dragover.prevent
        @drop="handleDrop($event, status.value)"
      >
        <div class="column-items">
          <div 
            v-for="option in getOptionsByStatus(status.value)" 
            :key="option.id"
            class="kanban-item"
            :class="{ 'dragging': draggingOptionId === option.id }"
            draggable="true"
            @dragstart="handleDragStart($event, option)"
            @dragend="handleDragEnd"
          >
            <OptionCard
              :option="option"
              :inquiry-id="inquiryId"
              :compact="true"
              :show-action="false"
              @click="$emit('openDetail', option)"
            />
            
            <div class="item-footer">
              <span class="item-id">#{{ option.id }}</span>
              <div class="item-actions">
                <NcActions>
                  <NcActionButton
                    v-for="target in statusColumns.filter(s => s.value !== option.status.optionStatus)"
                    :key="target.value"
                    @click="changeStatus(option.id, target.value)"
                  >
                    <template #icon>
                      <div class="status-dot-small" :style="{ backgroundColor: target.color }" />
                    </template>
                    {{ t('agora', 'Move to {column}', { column: target.label }) }}
                  </NcActionButton>
                </NcActions>
              </div>
            </div>
          </div>
          
          <div 
            v-if="getOptionsByStatus(status.value).length === 0" 
            class="empty-column"
            @dragover.prevent
            @drop="handleDrop($event, status.value)"
          >
            <div class="empty-icon">
              <component :is="InquiryOptionIcons.Board" :size="32" />
            </div>
            <p>{{ t('agora', 'No items in this column') }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcModal from '@nextcloud/vue/components/NcModal'
import NcActions from '@nextcloud/vue/components/NcActions'
import NcActionButton from '@nextcloud/vue/components/NcActionButton'
import { InquiryOptionIcons } from '../../../utils/icons.ts'
import OptionCard from '../OptionCard.vue'
import type { Option, InquiryOptionType, OptionFamily } from '../../../Types/index.ts'
import { useOptionsStore } from '../../../stores/options'
import { showSuccess, showError } from '@nextcloud/dialogs'
import SearchSelect from '../../Base/modules/SearchSelect.vue'
import { filterOptionsByLayout, addLayoutToOption, getAvailableForeignOptionsForLayout } from '../../../helpers/modules/InquiryOptionHelper'

// Props
const props = defineProps<{
  options: InquiryOptionType[]
  inquiryId: number
  optionTypes: InquiryOptionType[]
  family?: OptionFamily
  optionsByInquiry: Option[]
}>()

// Stores
const optionsStore = useOptionsStore()
// State
const showAddModal = ref(false)
const selectedOption = ref<Option | null>(null)
const targetStatus = ref<string | null>(null)
const draggingOptionId = ref<number | null>(null)

// Emits
const emit = defineEmits<{
  'addOption': [optionType: string, status: string]
  'openDetail': [option: Option]
  'update:options': []
}>()

// Status columns
const statusColumns = [
  { value: 'draft', label: t('agora', 'Draft'), color: '#949494' },
  { value: 'active', label: t('agora', 'Active'), color: '#3498db' },
  { value: 'completed', label: t('agora', 'Completed'), color: '#27ae60' },
  { value: 'cancelled', label: t('agora', 'Cancelled'), color: '#e74c3c' }
]

// Filter options for kanban
const kanbanOptions = computed(() => filterOptionsByLayout(
    props.optionsByInquiry,
    'kanban',
    props.optionTypes,
    props.family.key
  ))

// Available foreign options
const availableForeignOptions = computed(() => getAvailableForeignOptionsForLayout(
    props.options,
    'kanban',
    props.family.key,
    props.optionTypes
  ))

// Computed
const canAddExisting = computed(() => selectedOption.value && targetStatus.value)

// Helper functions
const getOptionsByStatus = (status: string) => {
  return kanbanOptions.value.filter(opt => {
    const optStatus = opt.status?.optionStatus || 'draft'
    return optStatus === status
  })
}

// Drag and drop handlers
const handleDragStart = (event: DragEvent, option: Option) => {
  draggingOptionId.value = option.id
  event.dataTransfer?.setData('text/plain', option.id.toString())
  event.dataTransfer!.effectAllowed = 'move'
}

const handleDragEnd = () => {
  draggingOptionId.value = null
}

const handleDrop = async (event: DragEvent, newStatus: string) => {
  event.preventDefault()
  
  const optionId = event.dataTransfer?.getData('text/plain')
  if (!optionId) return
  
  await changeStatus(parseInt(optionId), newStatus)
}

const getStatusLabel = (status: string) => {
  const found = statusColumns.find(s => s.value === status)
  return found?.label || status
}

const changeStatus = async (optionId: number, newStatus: string) => {
  try { 
    await optionsStore.setOptionStatus(optionId, newStatus)
    showSuccess(t('agora', 'Option moved to {column}', { 
      column: getStatusLabel(newStatus) 
    }))
    emit('update:options')
  } catch (error) { 
    console.error("Unable to change option status", error) 
    showError(t('agora', 'Option status could not be updated'))
  }
}

const addExistingToKanban = async () => {
  if (!selectedOption.value || !targetStatus.value) return

  try {
    // Get current miscFields
    const currentMiscFields = selectedOption.value.miscFields || {}

    // Update the option status
    await optionsStore.setOptionStatus(selectedOption.value.id, targetStatus.value)

    // Add kanban to force_layouts in miscFields
    const forceLayouts = currentMiscFields.force_layouts || []
    const updatedLayouts = [...forceLayouts, 'kanban']

    const miscFieldsUpdate: Record<string, string> = {
      ...currentMiscFields,
      force_layouts: JSON.stringify(updatedLayouts)
    }

    // Update the option
    await optionsStore.updateOptionFromModal(
      selectedOption.value.id,
      targetStatus.value,
      miscFieldsUpdate
    )

    showAddModal.value = false
    selectedOption.value = null
    targetStatus.value = null
    showSuccess(t('agora', 'Option added to board'))
    emit('update:options')
  } catch (error) {
    console.error('Failed to add option:', error)
    showError(t('agora', 'Could not add option'))
  }
}

</script>

<style scoped lang="scss">
.kanban-layout {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 4px;

  .kanban-actions {
    display: flex;
    justify-content: flex-end;
    
    .add-kanban-btn {
      background: linear-gradient(135deg, var(--color-primary-element-light) 0%, var(--color-primary-element) 100%);
      border: none;
      color: white;
      font-weight: 600;
      padding: 8px 16px;
      border-radius: 20px;
      transition: all 0.2s ease;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(var(--color-primary-element-rgb), 0.3);
      }
    }
  }

  .kanban-header {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;

    .kanban-column-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      background: var(--color-main-background);
      border-radius: 16px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
      border-bottom: 4px solid;

      &.status-draft { border-bottom-color: #949494; }
      &.status-active { border-bottom-color: #3498db; }
      &.status-completed { border-bottom-color: #27ae60; }
      &.status-cancelled { border-bottom-color: #e74c3c; }

      .header-content {
        display: flex;
        align-items: center;
        gap: 10px;

        .status-badge {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          box-shadow: 0 0 0 2px var(--color-main-background);
        }

        .status-label {
          font-weight: 700;
          font-size: 15px;
        }

        .item-count {
          background: var(--color-background-dark);
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          color: var(--color-text-light);
        }
      }
    }
  }

  .kanban-board {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    min-height: 600px;

    .kanban-column {
      background: var(--color-background-dark);
      border-radius: 16px;
      padding: 20px 16px;

      .column-items {
        min-height: 400px;
        display: flex;
        flex-direction: column;
        gap: 12px;

        .kanban-item {
          position: relative;
          cursor: grab;
          transition: all 0.2s ease;
          border-radius: 12px;
          background: var(--color-main-background);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          
          &:active {
            cursor: grabbing;
          }
          
          &.dragging {
            opacity: 0.5;
            transform: scale(0.98);
          }

          .item-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 8px 12px;
            border-top: 1px solid var(--color-border);
            font-size: 11px;
            color: var(--color-text-lighter);

            .item-id {
              font-family: monospace;
              background: var(--color-background-dark);
              padding: 2px 6px;
              border-radius: 4px;
            }

            .item-actions {
              opacity: 0;
              transition: opacity 0.2s ease;
            }
          }

          &:hover .item-footer .item-actions {
            opacity: 1;
          }
        }

        .empty-column {
          text-align: center;
          padding: 40px 20px;
          background: var(--color-background);
          border: 2px dashed var(--color-border);
          border-radius: 16px;

          .empty-icon {
            color: var(--color-text-lighter);
            margin-bottom: 12px;
            opacity: 0.5;
          }

          p {
            margin: 0;
            color: var(--color-text-lighter);
            font-style: italic;
            font-size: 13px;
          }
        }
      }
    }
  }
}

// Modal styles
.add-option-modal {
  padding: 24px;
  max-width: 600px;

  h4 {
    margin: 0 0 4px 0;
    font-size: 16px;
    font-weight: 600;
    color: var(--color-main-text);
  }

  .section-desc {
    margin: 0 0 16px 0;
    font-size: 13px;
    color: var(--color-text-lighter);
  }

  .search-section {
    margin-bottom: 24px;

    .search-select {
      margin-bottom: 20px;
    }

    .column-selector {
      label {
        display: block;
        margin-bottom: 12px;
        font-weight: 600;
        font-size: 14px;
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
            background: var(--color-primary-light);
          }
        }
      }
    }
  }

  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 32px;
    padding-top: 20px;
    border-top: 1px solid var(--color-border);
  }
}

.status-dot-small {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
</style>
