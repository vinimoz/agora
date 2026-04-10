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
    <AddOptionToFamily
            v-if="showAddModal"
            family-type="kanban"
            :inquiry-id="inquiryId"
            @close="showAddModal = false"
            @success="handleAddSuccess"
            />
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
                      :show-action="true"
                      :family-type="family?.key || 'kanban'"
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
import NcActions from '@nextcloud/vue/components/NcActions'
import NcActionButton from '@nextcloud/vue/components/NcActionButton'
import { InquiryOptionIcons } from '../../../utils/icons.ts'
import OptionCard from '../OptionCard.vue'
import type { Option, InquiryOptionType, OptionFamily } from '../../../Types/index.ts'
import { useOptionsStore } from '../../../stores/options'
import { showSuccess, showError } from '@nextcloud/dialogs'
import { filterOptionsByLayout  } from '../../../helpers/modules/InquiryOptionHelper'
import AddOptionToFamily from '../../Modals/AddOptionToFamily.vue'

// Props
const props = defineProps<{
  // options: InquiryOptionType[]
  inquiryId: number
  optionTypes: InquiryOptionType[]
  family?: OptionFamily
  optionsByInquiry: Option[]
}>()

// Stores
const optionsStore = useOptionsStore()
// State
const showAddModal = ref(false)
const draggingOptionId = ref<number | null>(null)

// Emits
const emit = defineEmits<{
  'addOption': [optionType: string, status: string]
  'openDetail': [option: Option]
  'update:options': []
}>()

const statusColumns = computed(() => {
  // Check if we have kanban column settings from the UI configuration
  const kanbanColumns = props.appSettings?.optionFamilyTab?.[props.family?.key]?.ui?.kanban_column

  if (kanbanColumns && Array.isArray(kanbanColumns) && kanbanColumns.length > 0) {
    // Map the settings to the expected format
    return kanbanColumns.map((column: unknown) => ({
      value: column.value,
      label: t('agora', column.label), 
      color: column.color
    }))
  }

  // Fallback to default columns if no settings available
  return [
    { value: 'draft', label: t('agora', 'Draft'), color: '#949494' },
    { value: 'active', label: t('agora', 'Active'), color: '#3498db' },
    { value: 'completed', label: t('agora', 'Completed'), color: '#27ae60' },
    { value: 'cancelled', label: t('agora', 'Cancelled'), color: '#e74c3c' }
  ]
})

// Update the grid template columns to be dynamic
const columnCount = computed(() => statusColumns.value.length)

// Update getOptionsByStatus to handle dynamic status values
const getOptionsByStatus = (status: string) => kanbanOptions.value.filter(opt => {
  const optStatus = opt.status?.optionStatus || 'draft'
  return optStatus === status
})

// Update getStatusLabel to use the computed columns
const getStatusLabel = (status: string) => {
  const found = statusColumns.value.find(s => s.value === status)
  return found?.label || status
}


// Filter options for kanban
const kanbanOptions = computed(() => filterOptionsByLayout(
    props.optionsByInquiry,
    'kanban',
    props.optionTypes,
    props.family.key
  ))


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

const handleAddSuccess = () => {
  emit('update:options')
  // Refresh the kanban view
  // The options will be updated via the watcher
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
        grid-template-columns: repeat(v-bind(columnCount), 1fr);
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
        grid-template-columns: repeat(v-bind(columnCount), 1fr);
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
