<!--
  SPDX-FileCopyrightText: 2024 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
  <div class="kanban-layout">
    <!-- Column headers -->
    <div class="kanban-header">
      <div 
        v-for="status in statusColumns" 
        :key="status.value"
        class="kanban-column-header"
        :class="`status-${status.value}`"
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
          @click="$emit('add-option', getDefaultTypeForStatus(status.value))"
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
      >
        <div class="column-items">
          <!-- Static items (no drag & drop) -->
          <div 
            v-for="option in getOptionsByStatus(status.value)" 
            :key="option.id"
            class="kanban-item"
          >
            <OptionCard
              :option="option"
              :inquiry-id="inquiryId"
              :compact="true"
              @click="$emit('open-detail', option)"
            />
            <!-- Status indicator dot -->
            <div 
              class="status-dot" 
              :style="{ backgroundColor: getStatusColor(option.status) }"
              :title="getStatusLabel(option.status)"
            />
            
            <!-- Quick status change menu (alternative to drag & drop) -->
            <NcActions v-if="canChangeStatus" class="status-change-menu">
              <NcActionButton
                v-for="targetStatus in statusColumns.filter(s => s.value !== option.status)"
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
          
          <!-- Empty column placeholder -->
          <div v-if="getOptionsByStatus(status.value).length === 0" class="empty-column">
            <p>{{ t('agora', 'No items') }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcActions from '@nextcloud/vue/components/NcActions'
import NcActionButton from '@nextcloud/vue/components/NcActionButton'
import { InquiryOptionIcons } from '../../../utils/icons.ts'
import OptionCard from '../OptionCard.vue'

const props = defineProps<{
  options: any[]
  family: any
  inquiryId: number
  optionTypes: any[]
  statuses?: any[] // Available statuses from inquiry config
}>()

const emit = defineEmits<{
  'add-option': [optionType: string]
  'open-detail': [option: any]
  'option-updated': [option: any]
  'option-deleted': [optionId: number]
  'status-changed': [optionId: number, newStatus: string]
}>()

// Default status columns if none provided
const defaultStatuses = [
  { value: 'idea', label: t('agora', 'Idea'), color: '#949494' },
  { value: 'in_progress', label: t('agora', 'In Progress'), color: '#3498db' },
  { value: 'review', label: t('agora', 'Under Review'), color: '#f39c12' },
  { value: 'approved', label: t('agora', 'Approved'), color: '#27ae60' },
  { value: 'rejected', label: t('agora', 'Rejected'), color: '#e74c3c' },
  { value: 'implemented', label: t('agora', 'Implemented'), color: '#2ecc71' }
]

const statusColumns = computed(() => props.statuses || defaultStatuses)

const getOptionsByStatus = (status: string) => props.options.filter(opt => opt.status === status)

const canChangeStatus = computed(() => true) // Check permissions

const canAddToColumn = (status: any) => 
  // Determine which option types can be added to this column
   props.optionTypes.length > 0


const getDefaultTypeForStatus = (status: string) => 
  // Return the first allowed option type for this status
   props.optionTypes[0]?.option_type


const getStatusColor = (status: string) => {
  const found = statusColumns.value.find(s => s.value === status)
  return found?.color || '#949494'
}

const getStatusLabel = (status: string) => {
  const found = statusColumns.value.find(s => s.value === status)
  return found?.label || status
}

// Change status via action menu instead of drag & drop
const changeStatus = (optionId: number, newStatus: string) => {
  emit('status-changed', optionId, newStatus)
}
</script>

<style scoped lang="scss">
.kanban-layout {
  display: flex;
  flex-direction: column;
  gap: 16px;

  .kanban-header {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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

      &.status-idea { border-bottom-color: #949494; }
      &.status-in_progress { border-bottom-color: #3498db; }
      &.status-review { border-bottom-color: #f39c12; }
      &.status-approved { border-bottom-color: #27ae60; }
      &.status-rejected { border-bottom-color: #e74c3c; }
      &.status-implemented { border-bottom-color: #2ecc71; }

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
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 16px;
    min-height: 500px;

    .kanban-column {
      background: var(--color-background-dark);
      border-radius: 12px;
      padding: 16px;

      .column-items {
        min-height: 200px;
        display: flex;
        flex-direction: column;
        gap: 8px;

        .kanban-item {
          position: relative;
          
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
