<!--
  SPDX-FileCopyrightText: 2026 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="inquiry-kanban">
    <!-- Kanban Header -->
    <div class="kanban-header">
      <div class="header-left">
        <component :is="Icons.ViewKanban" :size="24" class="kanban-icon" />
        <h2>{{ t('agora', 'Kanban Board') }}</h2>
        <span class="kanban-count">{{ inquiries.length }}</span>
        <span v-if="useProcessColumns" class="process-badge">
          <component :is="Icons.GitBranch" :size="12" />
          {{ t('agora', 'Process') }}
        </span>
      </div>
      <div class="header-right">
        <button
          v-for="option in groupingOptions"
          :key="option.key"
          class="group-btn"
          :class="{ active: groupBy === option.key }"
          @click="groupBy = option.key"
        >
          <component :is="option.icon" :size="14" />
          {{ option.label }}
        </button>
      </div>
    </div>

    <!-- Kanban Board -->
    <div class="kanban-board">
      <div
        v-for="(column, columnKey) in groupedColumns"
        :key="columnKey"
        class="kanban-column"
        :class="getColumnClass(columnKey)"
        @dragover.prevent
        @drop="handleDrop(columnKey, $event)"
      >
        <div class="column-header">
          <div class="column-title-wrapper">
            <component :is="getColumnIcon(columnKey)" :size="16" class="column-icon" />
            <span class="column-title">{{ getColumnLabel(columnKey) }}</span>
            <span class="column-count">{{ column.length }}</span>
          </div>
          <div v-if="canAddToColumn(columnKey)" class="column-actions">
            <button class="add-btn" @click="handleAdd(columnKey)" :title="t('agora', 'Add to column')">
              <component :is="Icons.Plus" :size="16" />
            </button>
          </div>
        </div>

        <div class="column-items">
          <KanbanItem
            v-for="inquiry in column"
            :key="inquiry.id"
            :inquiry="inquiry"
            :draggable="true"
            @click="handleClick"
            @dragstart="handleDragStart($event, inquiry)"
          />
        </div>

        <!-- Empty state for column -->
        <div v-if="column.length === 0" class="column-empty">
          <component :is="Icons.Inbox" :size="32" />
          <span>{{ t('agora', 'No items') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { t } from '@nextcloud/l10n'
import { InquiryGeneralIcons as Icons } from '../../utils/icons'
import KanbanItem from './KanbanItem.vue'
import type { Inquiry } from '../../Types'
import { useSessionStore } from '../../stores/session'
import { getInquiryTypeData } from '../../helpers/modules/InquiryHelper'

interface Props {
  inquiries: Inquiry[]
  groupId?: number
  processPhases?: Array<{ key: string; label: string; icon?: string }>
}

const props = withDefaults(defineProps<Props>(), {
  processPhases: () => []
})

const emit = defineEmits<{
  click: [inquiry: Inquiry]
  add: [columnKey: string]
  move: [inquiry: Inquiry, fromColumn: string, toColumn: string]
}>()

const sessionStore = useSessionStore()

// Determine if we use process columns
const useProcessColumns = computed(() => props.processPhases.length > 0)

// Grouping mode
const groupBy = ref<'process' | 'status' | 'type' | 'family'>(
  useProcessColumns.value ? 'process' : 'status'
)

// Grouping options with French labels
const groupingOptions = computed(() => {
  const options = [
    { key: 'status', label: t('agora', 'Status'), icon: Icons.CheckCircle },
    { key: 'type', label: t('agora', 'Type'), icon: Icons.Folder },
    { key: 'family', label: t('agora', 'Family'), icon: Icons.Layers }
  ]
  if (useProcessColumns.value) {
    options.unshift({ key: 'process', label: t('agora', 'Process'), icon: Icons.GitBranch })
  }
  return options
})

const inquiryTypes = computed(() => sessionStore.appSettings?.inquiryTypeTab || [])
const draggedInquiryId = ref<number | null>(null)

// Group inquiries by selected grouping
const groupedColumns = computed(() => {
  const groups: Record<string, Inquiry[]> = {}
  const groupKey = groupBy.value

  props.inquiries.forEach(inquiry => {
    let key: string

    switch (groupKey) {
      case 'process':
        key = inquiry.miscFields?.processPhase || props.processPhases[0]?.key || 'default'
        break
      case 'status':
        key = inquiry.status?.inquiryStatus || 'draft'
        break
      case 'type':
        key = inquiry.type || 'general'
        break
      case 'family':
        key = inquiry.family || 'default'
        break
      default:
        key = 'default'
    }

    if (!groups[key]) {
      groups[key] = []
    }
    groups[key].push(inquiry)
  })

  // Sort columns by predefined order
  const sortedKeys = sortColumnKeys(Object.keys(groups))
  const sortedGroups: Record<string, Inquiry[]> = {}
  sortedKeys.forEach(key => {
    sortedGroups[key] = groups[key]
  })

  return sortedGroups
})

function sortColumnKeys(keys: string[]): string[] {
  if (groupBy.value === 'process') {
    const order = props.processPhases.map(p => p.key)
    return keys.sort((a, b) => {
      const idxA = order.indexOf(a)
      const idxB = order.indexOf(b)
      if (idxA === -1 && idxB === -1) return a.localeCompare(b)
      if (idxA === -1) return 1
      if (idxB === -1) return -1
      return idxA - idxB
    })
  }

  if (groupBy.value === 'status') {
    const order = ['active', 'open', 'waiting_approval', 'draft', 'closed', 'rejected']
    return keys.sort((a, b) => {
      const idxA = order.indexOf(a)
      const idxB = order.indexOf(b)
      if (idxA === -1 && idxB === -1) return a.localeCompare(b)
      if (idxA === -1) return 1
      if (idxB === -1) return -1
      return idxA - idxB
    })
  }

  if (groupBy.value === 'type') {
    const types = sessionStore.appSettings?.inquiryTypeTab || []
    const order = types.map(t => t.typeKey || t.label)
    return keys.sort((a, b) => {
      const idxA = order.indexOf(a)
      const idxB = order.indexOf(b)
      if (idxA === -1 && idxB === -1) return a.localeCompare(b)
      if (idxA === -1) return 1
      if (idxB === -1) return -1
      return idxA - idxB
    })
  }

  return keys.sort()
}

function getColumnLabel(key: string): string {
  if (groupBy.value === 'process') {
    const phase = props.processPhases.find(p => p.key === key)
    return phase?.label || key
  }

  if (groupBy.value === 'status') {
    const map: Record<string, string> = {
      'active': t('agora', 'Active'),
      'open': t('agora', 'Open'),
      'closed': t('agora', 'Closed'),
      'draft': t('agora', 'Draft'),
      'waiting_approval': t('agora', 'Pending'),
      'rejected': t('agora', 'Rejected')
    }
    return map[key] || key
  }

  if (groupBy.value === 'type') {
    const types = sessionStore.appSettings?.inquiryTypeTab || []
    const data = getInquiryTypeData(key, types)
    return data?.label || key
  }

  if (groupBy.value === 'family') {
    const map: Record<string, string> = {
      'default': t('agora', 'Default'),
      'proposal': t('agora', 'Proposals'),
      'poll': t('agora', 'Polls'),
      'survey': t('agora', 'Surveys'),
      'discussion': t('agora', 'Discussions')
    }
    return map[key] || key
  }

  return key
}

function getColumnIcon(key: string): any {
  if (groupBy.value === 'process') {
    const phase = props.processPhases.find(p => p.key === key)
    if (phase?.icon) {
      return Icons[phase.icon] || Icons.Circle
    }
    return Icons.GitBranch
  }

  if (groupBy.value === 'status') {
    const map: Record<string, any> = {
      'active': Icons.CheckCircle,
      'open': Icons.CheckCircle,
      'closed': Icons.Close,
      'draft': Icons.Edit,
      'waiting_approval': Icons.Clock,
      'rejected': Icons.Close
    }
    return map[key] || Icons.Circle
  }

  if (groupBy.value === 'type') {
    const types = sessionStore.appSettings?.inquiryTypeTab || []
    const data = getInquiryTypeData(key, types)
    return data?.icon || Icons.Folder
  }

  return Icons.Layers
}

function getColumnClass(key: string): string {
  if (groupBy.value === 'status') {
    return `column-status-${key}`
  }
  if (groupBy.value === 'process') {
    return `column-process`
  }
  return ''
}

function canAddToColumn(key: string): boolean {
  if (groupBy.value === 'status') {
    return !['closed', 'rejected'].includes(key)
  }
  return true
}

function handleDragStart(event: DragEvent, inquiry: Inquiry) {
  if (!event.dataTransfer) return
  draggedInquiryId.value = inquiry.id
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('text/plain', String(inquiry.id))
}

function handleDrop(columnKey: string, event: DragEvent) {
  if (!event.dataTransfer) return
  const inquiryId = parseInt(event.dataTransfer.getData('text/plain'))
  const inquiry = props.inquiries.find(i => i.id === inquiryId)
  if (!inquiry) return

  // Find which column the inquiry is currently in
  let fromColumn = ''
  for (const [key, items] of Object.entries(groupedColumns.value)) {
    if (items.some(i => i.id === inquiryId)) {
      fromColumn = key
      break
    }
  }

  if (fromColumn && fromColumn !== columnKey) {
    // If process grouping, update the inquiry's processPhase
    if (groupBy.value === 'process') {
      // Store the phase change for the move event
      emit('move', inquiry, fromColumn, columnKey)
    } else {
      emit('move', inquiry, fromColumn, columnKey)
    }
  }

  draggedInquiryId.value = null
}

function handleClick(inquiry: Inquiry) {
  emit('click', inquiry)
}

function handleAdd(columnKey: string) {
  emit('add', columnKey)
}

// Watch for process phases changes
watch(
  () => props.processPhases,
  (newPhases) => {
    if (newPhases.length > 0 && groupBy.value === 'status') {
      groupBy.value = 'process'
    }
  },
  { deep: true }
)
</script>

<style lang="scss" scoped>
.inquiry-kanban {
  background: var(--color-main-background);
  border-radius: 16px;
  border: 1px solid var(--color-border);
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.kanban-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-background-dark);

  .header-left {
    display: flex;
    align-items: center;
    gap: 12px;

    .kanban-icon {
      color: var(--color-primary-element);
    }

    h2 {
      margin: 0;
      font-size: 20px;
      font-weight: 700;
      color: var(--color-main-text);
      letter-spacing: -0.01em;
    }

    .kanban-count {
      font-size: 12px;
      font-weight: 600;
      background: var(--color-background-darker);
      padding: 3px 12px;
      border-radius: 20px;
      color: var(--color-text-lighter);
    }

    .process-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 12px;
      background: var(--color-primary-light);
      color: var(--color-primary-element);
      border-radius: 20px;
      font-size: 11px;
      font-weight: 600;
      border: 1px solid rgba(var(--color-primary-rgb), 0.2);
    }
  }

  .header-right {
    display: flex;
    gap: 6px;

    .group-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 7px 16px;
      border: 1px solid transparent;
      border-radius: 8px;
      background: transparent;
      color: var(--color-text-lighter);
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: var(--color-background-hover);
        color: var(--color-main-text);
        transform: translateY(-1px);
      }

      &.active {
        background: var(--color-primary-light);
        border-color: var(--color-primary-element);
        color: var(--color-primary-element);
        box-shadow: 0 1px 3px rgba(var(--color-primary-rgb), 0.1);
      }
    }
  }
}

.kanban-board {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
  overflow-x: auto;
  min-height: 500px;
  background: var(--color-background-dark);
}

.kanban-column {
  background: var(--color-main-background);
  border-radius: 12px;
  border: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  min-height: 250px;
  max-height: 650px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
    border-color: var(--color-border-dark);
  }

  &.column-status-active {
    border-top: 4px solid var(--color-success);
  }
  &.column-status-open {
    border-top: 4px solid var(--color-success);
  }
  &.column-status-closed {
    border-top: 4px solid var(--color-error);
  }
  &.column-status-draft {
    border-top: 4px solid var(--color-text-lighter);
  }
  &.column-status-waiting_approval {
    border-top: 4px solid var(--color-warning);
  }
  &.column-status-rejected {
    border-top: 4px solid var(--color-error);
  }
  &.column-process {
    border-top: 4px solid var(--color-primary-element);
  }

  .column-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 18px;
    border-bottom: 1px solid var(--color-border);
    flex-shrink: 0;
    background: var(--color-background-dark);
    border-radius: 12px 12px 0 0;

    .column-title-wrapper {
      display: flex;
      align-items: center;
      gap: 10px;

      .column-icon {
        color: var(--color-text-lighter);
      }

      .column-title {
        font-size: 14px;
        font-weight: 600;
        color: var(--color-main-text);
        letter-spacing: -0.01em;
      }

      .column-count {
        font-size: 12px;
        font-weight: 600;
        background: var(--color-background-darker);
        padding: 2px 10px;
        border-radius: 12px;
        color: var(--color-text-lighter);
      }
    }

    .column-actions {
      .add-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        border: 1px solid var(--color-border);
        border-radius: 8px;
        background: var(--color-main-background);
        color: var(--color-text-lighter);
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
          border-color: var(--color-primary-element);
          color: var(--color-primary-element);
          background: var(--color-primary-light);
          transform: scale(1.05);
        }
      }
    }
  }

  .column-items {
    flex: 1;
    overflow-y: auto;
    padding: 12px 12px 4px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--color-border);
      border-radius: 4px;
    }
  }

  .column-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 16px;
    color: var(--color-text-lighter);
    font-size: 13px;
    gap: 8px;
    opacity: 0.6;

    svg {
      opacity: 0.5;
    }
  }
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .kanban-board {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 16px;
    padding: 16px;
  }
}

@media (max-width: 768px) {
  .kanban-header {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
    padding: 16px 20px;

    .header-right {
      flex-wrap: wrap;
      justify-content: center;
    }
  }

  .kanban-board {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 12px;
  }

  .kanban-column {
    max-height: 450px;
    min-height: 200px;
  }
}

@media (max-width: 480px) {
  .kanban-header .header-left h2 {
    font-size: 17px;
  }

  .kanban-header .header-right .group-btn {
    padding: 5px 12px;
    font-size: 12px;
  }
}
</style>
