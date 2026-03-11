<template>
  <div class="kanban-layout">
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
        <!-- Quick add button for this column -->
        <NcButton
          v-if="canAddToColumn(status)"
          type="tertiary"
          size="small"
          :aria-label="t('agora', 'Add to {column}', { column: status.label })"
          @click="openAddOption(status.value)"
        >
          <template #icon>
            <component :is="InquiryOptionIcons.Plus" :size="16" />
          </template>
        </NcButton>
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
          <!-- Items -->
          <div 
            v-for="option in getOptionsByStatus(status.value)" 
            :key="option.id"
            class="kanban-item"
            :class="{ 'dragging': draggingOptionId === option.id }"
            draggable="true"
            @dragstart="handleDragStart($event, option)"
            @dragend="handleDragEnd"
            @dragover.prevent
          >
            <OptionCard
              :option="option"
              :inquiry-id="inquiryId"
              :compact="true"
              :show-action="false"
              @click="$emit('openDetail', option)"
            />
            
            <!-- Drag handle icon -->
            <div class="drag-handle" title="Drag to move">
              <component :is="InquiryOptionIcons.Drag" :size="16" />
            </div>
            
            <!-- Status indicator dot -->
            <div 
              class="status-dot" 
              :style="{ backgroundColor: getStatusColor(option.status.optionStatus) }"
              :title="getStatusLabel(option.status.optionStatus)"
            />
            
            <!-- Status change menu -->
            <NcActions v-if="canChangeStatus" class="status-change-menu">
              <NcActionButton
                v-for="targetStatus in statusColumns.filter(s => s.value !== option.status.optionStatus)"
                :key="targetStatus.value"
                @click="changeStatus(option.id, targetStatus.value)"
              >
                <template #icon>
                  <div class="status-dot-small" :style="{ backgroundColor: targetStatus.color }" />
                </template>
                {{ t('agora', 'Move to {column}', { column: targetStatus.label }) }}
              </NcActionButton>
            </NcActions>
          </div>
          
          <!-- Empty column placeholder with drop zone -->
          <div 
            v-if="getOptionsByStatus(status.value).length === 0" 
            class="empty-column"
            :class="{ 'drag-over': dragOverColumn === status.value }"
            @dragover.prevent
            @dragenter="dragOverColumn = status.value"
            @dragleave="dragOverColumn = null"
            @drop="handleDrop($event, status.value)"
          >
            <p>{{ t('agora', 'No items') }}</p>
            <NcButton
              v-if="canAddToColumn(status)"
              type="tertiary"
              size="small"
              @click="openAddOption(status.value)"
            >
              <template #icon>
                <component :is="InquiryOptionIcons.Plus" :size="16" />
              </template>
              {{ t('agora', 'Add') }}
            </NcButton>
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
import type { Option, InquiryOptionType } from '../../../Types/index.ts'
import { useOptionsStore } from '../../../stores/options'
import { showSuccess, showError } from '@nextcloud/dialogs'

const props = defineProps<{
  options: Option[]
  inquiryId: number
  optionTypes: InquiryOptionType[]
}>()

const optionsStore = useOptionsStore()
const draggingOptionId = ref<number | null>(null)
const dragOverColumn = ref<string | null>(null)

const emit = defineEmits<{
  'addOption': [optionType: string, status: string]
  'openDetail': [option: Option]
  'update:options': []
}>()

// Status columns definition based on option_status values from DB
const statusColumns = [
  { value: 'draft', label: t('agora', 'Draft'), color: '#949494' },
  { value: 'active', label: t('agora', 'Active'), color: '#3498db' },
  { value: 'completed', label: t('agora', 'Completed'), color: '#27ae60' },
  { value: 'cancelled', label: t('agora', 'Cancelled'), color: '#e74c3c' }
]

// Filter options by status
const getOptionsByStatus = (status: string) => props.options.filter(opt => opt.status.optionStatus === status)

// Check if user can change status
const canChangeStatus = computed(() => true)

// Check if user can add to column
const canAddToColumn = (status: { value: string }) => 
  ['draft', 'active'].includes(status.value) && props.optionTypes.length > 0

// Open add option modal with pre-selected status
const openAddOption = (status: string) => {
  emit('addOption', props.optionTypes[0]?.option_type || 'workflow_item', status)
}

// Get status color
const getStatusColor = (status: string) => {
  const found = statusColumns.find(s => s.value === status)
  return found?.color || '#949494'
}

// Get status label
const getStatusLabel = (status: string) => {
  const found = statusColumns.find(s => s.value === status)
  return found?.label || status
}

// Drag and drop handlers
const handleDragStart = (event: DragEvent, option: Option) => {
  if (!canChangeStatus.value) {
    event.preventDefault()
    return
  }
  
  draggingOptionId.value = option.id
  event.dataTransfer?.setData('text/plain', option.id.toString())
  event.dataTransfer?.setData('application/json', JSON.stringify({
    id: option.id,
    currentStatus: option.status.optionStatus
  }))
  event.dataTransfer!.effectAllowed = 'move'
  
  // Add a class to the dragged element
  if (event.target instanceof HTMLElement) {
    const item = event.target.closest('.kanban-item')
    if (item) {
      item.classList.add('dragging')
    }
  }
}

const handleDragEnd = () => {
  draggingOptionId.value = null
  dragOverColumn.value = null
}

const handleDrop = async (event: DragEvent, targetStatus: string) => {
  event.preventDefault()
  dragOverColumn.value = null
  
  const optionId = event.dataTransfer?.getData('text/plain')
  if (!optionId) return
  
  try {
    const option = props.options.find(o => o.id === parseInt(optionId))
    if (!option) return
    
    // Don't do anything if dropped in the same column
    if (option.status.optionStatus === targetStatus) return
    
    // Update status via store
    await optionsStore.setOptionStatus(parseInt(optionId), targetStatus)
    showSuccess(t('agora', 'Option moved to {column}', { 
      column: getStatusLabel(targetStatus) 
    }))
    
    // Emit update event to refresh options
    emit('update:options')
    
  } catch (error) {
    console.error('Failed to move option:', error)
    showError(t('agora', 'Could not move option'))
  }
}

// Change status
const changeStatus = async (optionId: number, newStatus: string) => {
  try { 
    await optionsStore.setOptionStatus(optionId, newStatus)
    showSuccess(t('agora', 'Option status updated'))
    emit('update:options')
  } catch (error) { 
    console.warn("Unable to change option status", error) 
    showError(t('agora', 'Option status could not be updated'))
    return false 
  }
}
</script>

<style scoped lang="scss">
.kanban-layout {
  display: flex;
  flex-direction: column;
  gap: 16px;

  .kanban-header {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    padding: 0 4px;

    .kanban-column-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      background: var(--color-background-dark);
      border-radius: 12px 12px 0 0;
      border-bottom: 3px solid;

      &.status-draft { border-bottom-color: #949494; }
      &.status-active { border-bottom-color: #3498db; }
      &.status-completed { border-bottom-color: #27ae60; }
      &.status-cancelled { border-bottom-color: #e74c3c; }

      .header-content {
        display: flex;
        align-items: center;
        gap: 8px;

        .status-badge {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .status-label {
          font-weight: 600;
          font-size: 14px;
        }

        .item-count {
          background: var(--color-background-darker);
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
        }
      }
    }
  }

  .kanban-board {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    min-height: 500px;

    .kanban-column {
      background: var(--color-background-dark);
      border-radius: 12px;
      padding: 16px;
      transition: background-color 0.2s ease;

      &:has(.drag-over) {
        background: var(--color-background-hover);
      }

      .column-items {
        min-height: 200px;
        display: flex;
        flex-direction: column;
        gap: 12px;

        .kanban-item {
          position: relative;
          cursor: grab;
          transition: transform 0.2s ease, opacity 0.2s ease;
          
          &:active {
            cursor: grabbing;
          }
          
          &.dragging {
            opacity: 0.5;
            transform: scale(0.98);
          }
          
          .drag-handle {
            position: absolute;
            top: 8px;
            left: 8px;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--color-text-lighter);
            opacity: 0;
            transition: opacity 0.2s ease;
            cursor: grab;
            background: var(--color-main-background);
            border-radius: 4px;
            border: 1px solid var(--color-border);
            
            &:hover {
              color: var(--color-text-light);
              background: var(--color-background-hover);
            }
          }

          &:hover {
            .drag-handle {
              opacity: 1;
            }
          }
          
          .status-dot {
            position: absolute;
            top: 8px;
            right: 8px;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            border: 2px solid var(--color-main-background);
          }

          .status-change-menu {
            position: absolute;
            top: 8px;
            right: 24px;
            opacity: 0;
            transition: opacity 0.2s ease;
          }

          &:hover {
            .status-change-menu {
              opacity: 1;
            }
          }
        }

        .empty-column {
          text-align: center;
          padding: 40px 20px;
          color: var(--color-text-lighter);
          font-style: italic;
          border: 2px dashed var(--color-border);
          border-radius: 8px;
          transition: background-color 0.2s ease, border-color 0.2s ease;

          &.drag-over {
            background: var(--color-background-hover);
            border-color: var(--color-primary-element);
          }

          .button-vue {
            margin-top: 12px;
          }
        }
      }
    }
  }
}

.status-dot-small {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
</style>
