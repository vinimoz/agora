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
      </div>
      <div class="header-right">
        <button
          class="group-btn"
          :class="{ active: groupBy === 'status' }"
          @click="groupBy = 'status'"
        >
          <component :is="Icons.CheckCircle" :size="14" />
          {{ t('agora', 'Status') }}
        </button>
        <button
          class="group-btn"
          :class="{ active: groupBy === 'type' }"
          @click="groupBy = 'type'"
        >
          <component :is="Icons.Folder" :size="14" />
          {{ t('agora', 'Type') }}
        </button>
        <button
          class="group-btn"
          :class="{ active: groupBy === 'family' }"
          @click="groupBy = 'family'"
        >
          <component :is="Icons.Layers" :size="14" />
          {{ t('agora', 'Family') }}
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
          <span>{{ t('agora', 'No items') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { t } from '@nextcloud/l10n'
import { InquiryGeneralIcons as Icons } from '../../utils/icons'
import KanbanItem from './KanbanItem.vue'
import type { Inquiry } from '../../Types'
import { useSessionStore } from '../../stores/session'
import { getInquiryTypeData } from '../../helpers/modules/InquiryHelper'

interface Props {
  inquiries: Inquiry[]
  groupId?: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  click: [inquiry: Inquiry]
  add: [columnKey: string]
  move: [inquiry: Inquiry, fromColumn: string, toColumn: string]
}>()

const sessionStore = useSessionStore()

const groupBy = ref<'status' | 'type' | 'family'>('status')
const draggedInquiryId = ref<number | null>(null)

const inquiryTypes = computed(() => sessionStore.appSettings?.inquiryTypeTab || [])

const groupedColumns = computed(() => {
  const groups: Record<string, Inquiry[]> = {}

  props.inquiries.forEach(inquiry => {
    let key: string

    switch (groupBy.value) {
      case 'status':
        key = inquiry.status?.inquiryStatus || 'draft'
        break
      case 'type':
        key = inquiry.type || 'general'
        break
      case 'family':
        key = inquiry.family || 'default'
        break
    }

    if (!groups[key]) {
      groups[key] = []
    }
    groups[key].push(inquiry)
  })

  // Sort columns by a predefined order
  const sortedKeys = sortColumnKeys(Object.keys(groups))
  const sortedGroups: Record<string, Inquiry[]> = {}
  sortedKeys.forEach(key => {
    sortedGroups[key] = groups[key]
  })

  return sortedGroups
})

function sortColumnKeys(keys: string[]): string[] {
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
  return ''
}

function canAddToColumn(key: string): boolean {
  // Allow adding to any column except closed/rejected
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
    emit('move', inquiry, fromColumn, columnKey)
  }

  draggedInquiryId.value = null
}

function handleClick(inquiry: Inquiry) {
  emit('click', inquiry)
}

function handleAdd(columnKey: string) {
  emit('add', columnKey)
}
</script>

<style lang="scss" scoped>
.inquiry-kanban {
  background: var(--color-main-background);
  border-radius: 12px;
  border: 1px solid var(--color-border);
  overflow: hidden;
}

.kanban-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
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
      font-size: 18px;
      font-weight: 600;
      color: var(--color-main-text);
    }

    .kanban-count {
      font-size: 12px;
      background: var(--color-background-darker);
      padding: 2px 10px;
      border-radius: 12px;
      color: var(--color-text-lighter);
    }
  }

  .header-right {
    display: flex;
    gap: 4px;

    .group-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      border: 1px solid transparent;
      border-radius: 6px;
      background: transparent;
      color: var(--color-text-lighter);
      font-size: 13px;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background: var(--color-background-hover);
        color: var(--color-main-text);
      }

      &.active {
        background: var(--color-primary-light);
        border-color: var(--color-primary-element);
        color: var(--color-primary-element);
      }
    }
  }
}

.kanban-board {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  padding: 16px;
  overflow-x: auto;
  min-height: 400px;
}

.kanban-column {
  background: var(--color-background-dark);
  border-radius: 10px;
  border: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  min-height: 200px;
  max-height: 600px;

  &.column-status-active {
    border-top: 3px solid var(--color-success);
  }
  &.column-status-open {
    border-top: 3px solid var(--color-success);
  }
  &.column-status-closed {
    border-top: 3px solid var(--color-error);
  }
  &.column-status-draft {
    border-top: 3px solid var(--color-text-lighter);
  }
  &.column-status-waiting_approval {
    border-top: 3px solid var(--color-warning);
  }
  &.column-status-rejected {
    border-top: 3px solid var(--color-error);
  }

  .column-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 1px solid var(--color-border);
    flex-shrink: 0;

    .column-title-wrapper {
      display: flex;
      align-items: center;
      gap: 8px;

      .column-icon {
        color: var(--color-text-lighter);
      }

      .column-title {
        font-size: 14px;
        font-weight: 600;
        color: var(--color-main-text);
      }

      .column-count {
        font-size: 12px;
        background: var(--color-background-darker);
        padding: 1px 8px;
        border-radius: 10px;
        color: var(--color-text-lighter);
      }
    }

    .column-actions {
      .add-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        border: 1px solid var(--color-border);
        border-radius: 6px;
        background: var(--color-main-background);
        color: var(--color-text-lighter);
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
          border-color: var(--color-primary-element);
          color: var(--color-primary-element);
          background: var(--color-primary-light);
        }
      }
    }
  }

  .column-items {
    flex: 1;
    overflow-y: auto;
    padding: 8px 8px 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .column-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px 16px;
    color: var(--color-text-lighter);
    font-size: 13px;
    font-style: italic;
  }
}
</style>
