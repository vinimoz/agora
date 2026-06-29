<!--
  SPDX-FileCopyrightText: 2024 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="kanban-layout">
    <!-- Add inquiry button (optional) -->
    <div class="kanban-actions">
      <NcButton
        type="primary"
        class="add-kanban-btn"
        @click="showAddModal = true"
      >
        <template #icon>
          <component :is="InquiryGeneralIcons.Plus" :size="18" />
        </template>
        {{ t('agora', 'Add inquiry') }}
      </NcButton>
    </div>

    <!-- Column headers -->
    <div class="kanban-header">
      <div
        v-for="column in columns"
        :key="column.status"
        class="kanban-column-header"
        :class="`status-${column.status}`"
        @dragover.prevent
        @drop="handleDrop($event, column.status)"
      >
        <div class="header-content">
          <span class="status-badge" :style="{ backgroundColor: column.color }" />
          <span class="status-label">{{ column.label }}</span>
          <span class="item-count">{{ getInquiriesByStatus(column.status).length }}</span>
        </div>
      </div>
    </div>

    <!-- Kanban board -->
    <div class="kanban-board">
      <div
        v-for="column in columns"
        :key="column.status"
        class="kanban-column"
        :class="`column-${column.status}`"
        @dragover.prevent
        @drop="handleDrop($event, column.status)"
      >
        <div class="column-items">
          <div
            v-for="inquiry in getInquiriesByStatus(column.status)"
            :key="inquiry.id"
            class="kanban-item"
            :class="{ 'dragging': draggingInquiryId === inquiry.id }"
            draggable="true"
            @dragstart="handleDragStart($event, inquiry)"
            @dragend="handleDragEnd"
            @click="emit('openDetail', inquiry.id)"
          >
            <div class="item-content">
              <div class="item-title">{{ inquiry.title }}</div>
              <div class="item-meta">
                <span class="item-id">#{{ inquiry.id }}</span>
                <span class="item-owner">{{ inquiry.owner.displayName }}</span>
              </div>
            </div>

            <!-- Footer with move actions -->
            <div class="item-footer">
              <NcActions>
                <NcActionButton
                  v-for="target in columns.filter(c => c.status !== inquiry.status.inquiryStatus)"
                  :key="target.status"
                  @click="changeStatus(inquiry.id, target.status)"
                >
                  <template #icon>
                    <div class="status-dot-small" :style="{ backgroundColor: target.color }" />
                  </template>
                  {{ t('agora', 'Move to {column}', { column: target.label }) }}
                </NcActionButton>
              </NcActions>
            </div>
          </div>

          <!-- Empty column placeholder -->
          <div
            v-if="getInquiriesByStatus(column.status).length === 0"
            class="empty-column"
            @dragover.prevent
            @drop="handleDrop($event, column.status)"
          >
            <div class="empty-icon">
              <component :is="InquiryGeneralIcons.Board" :size="32" />
            </div>
            <p>{{ t('agora', 'No inquiries in this column') }}</p>
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
import { showSuccess, showError } from '@nextcloud/dialogs'
import { InquiryGeneralIcons } from '../../utils/icons.ts'
import type { Inquiry } from '../../stores/inquiry.ts'
import { useInquiriesStore } from '../../stores/inquiries.ts'

// Props
const props = defineProps<{
  inquiries: Inquiry[]
}>()

// Emits
const emit = defineEmits<{
  openDetail: [inquiryId: number]
  statusChanged: []
}>()

// Store
const inquiriesStore = useInquiriesStore()

// State
const draggingInquiryId = ref<number | null>(null)
const showAddModal = ref(false)

// Helper: generate a color based on status string (deterministic)
const getColorForStatus = (status: string): string => {
  const colors: Record<string, string> = {
    draft: '#949494',
    waiting_approval: '#f39c12',
    pending: '#f39c12',
    under_process: '#f39c12',
    need_revised: '#f39c12',
    collecting_support: '#3498db',
    quorum_reached: '#27ae60',
    active: '#3498db',
    closed: '#27ae60',
    rejected: '#e74c3c',
    resolved: '#27ae60',
    dismissed: '#e74c3c',
    integrated: '#27ae60',
    discarded: '#e74c3c',
    funded: '#27ae60',
    not_funded: '#e74c3c',
    in_progress: '#3498db',
    completed: '#27ae60',
    planned: '#3498db',
    in_session: '#3498db',
    concluded: '#27ae60',
    open: '#3498db',
    under_review: '#f39c12',
    accepted: '#27ae60',
    drafting: '#3498db',
    reviewing: '#f39c12',
    validated: '#27ae60',
    resolved_by_proposal: '#27ae60',
    resolved_directly: '#27ae60',
    unresolved: '#e74c3c',
    published: '#27ae60',
    archived: '#949494',
    // add more as needed
  }
  return colors[status] || `hsl(${Math.abs(hashString(status)) % 360}, 70%, 60%)`
}

// Simple hash for generating fallback colors
const hashString = (str: string): number => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0 // Convert to 32-bit integer
  }
  return Math.abs(hash)
}

// Compute columns dynamically from the actual statuses present in the inquiries
const columns = computed(() => {
  // Get unique statuses
  const statusSet = new Set<string>()
  props.inquiries.forEach(inquiry => {
    if (inquiry.status.inquiryStatus) {
      statusSet.add(inquiry.status.inquiryStatus)
    }
  })

  // Build column definitions
  return Array.from(statusSet).map(status => ({
    status,
    label: status.charAt(0).toUpperCase() + status.replace(/_/g, ' ').slice(1),
    color: getColorForStatus(status)
  }))
})

// Helper: filter inquiries by status
const getInquiriesByStatus = (status: string) => props.inquiries.filter(inquiry => inquiry.status.inquiryStatus === status)

// Drag handlers
const handleDragStart = (event: DragEvent, inquiry: Inquiry) => {
  draggingInquiryId.value = inquiry.id
  event.dataTransfer?.setData('text/plain', inquiry.id.toString())
  event.dataTransfer!.effectAllowed = 'move'
}

const handleDragEnd = () => {
  draggingInquiryId.value = null
}

const handleDrop = async (event: DragEvent, newStatus: string) => {
  event.preventDefault()
  const idStr = event.dataTransfer?.getData('text/plain')
  if (!idStr) return
  const inquiryId = parseInt(idStr)
  await changeStatus(inquiryId, newStatus)
}

// Change status: direct API call + local update
const changeStatus = async (inquiryId: number, newStatus: string) => {
  const inquiry = props.inquiries.find(i => i.id === inquiryId)
  if (!inquiry) return
  if (inquiry.status.inquiryStatus === newStatus) return

  if (!inquiry.permissions.edit) {
    showError(t('agora', 'You do not have permission to change the status'))
    return
  }

  try {
    // Call the API directly
    await inquiriesStore.setInquiryStatus(inquiryId, newStatus)

    // Update local state in the store
    const storeInquiry = inquiriesStore.inquiries.find(i => i.id === inquiryId)
    if (storeInquiry) {
      storeInquiry.status.inquiryStatus = newStatus
    }

    showSuccess(t('agora', 'Inquiry moved to {column}', {
      column: columns.value.find(c => c.status === newStatus)?.label || newStatus
    }))

    // Notify parent to refresh (optional)
    emit('statusChanged')
  } catch (error) {
    console.error('Failed to update inquiry status', error)
    showError(t('agora', 'Failed to update status'))
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
    grid-template-columns: repeat(5, 1fr);
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
      &.status-waiting_approval { border-bottom-color: #f39c12; }
      &.status-active { border-bottom-color: #3498db; }
      &.status-closed { border-bottom-color: #27ae60; }
      &.status-rejected { border-bottom-color: #e74c3c; }

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
    grid-template-columns: repeat(5, 1fr);
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
          padding: 12px;

          &:active {
            cursor: grabbing;
          }

          &.dragging {
            opacity: 0.5;
            transform: scale(0.98);
          }

          .item-content {
            .item-title {
              font-weight: 600;
              font-size: 14px;
              margin-bottom: 8px;
              word-break: break-word;
            }

            .item-meta {
              display: flex;
              gap: 12px;
              font-size: 12px;
              color: var(--color-text-lighter);

              .item-id {
                font-family: monospace;
                background: var(--color-background-dark);
                padding: 2px 6px;
                border-radius: 4px;
              }
            }
          }

          .item-footer {
            display: flex;
            justify-content: flex-end;
            margin-top: 8px;
            padding-top: 8px;
            border-top: 1px solid var(--color-border);
            opacity: 0;
            transition: opacity 0.2s ease;
          }

          &:hover .item-footer {
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

.status-dot-small {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

/* Responsive */
@media (max-width: 1400px) {
  .kanban-header,
  .kanban-board {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media (max-width: 1024px) {
  .kanban-header,
  .kanban-board {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .kanban-header,
  .kanban-board {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 480px) {
  .kanban-header,
  .kanban-board {
    grid-template-columns: 1fr;
  }
}
</style>
