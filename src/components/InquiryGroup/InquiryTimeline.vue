<!--
  SPDX-FileCopyrightText: 2026 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="inquiry-timeline">
    <!-- Timeline Header -->
    <div class="timeline-header">
      <div class="header-left">
        <component :is="Icons.Clock" :size="24" class="timeline-icon" />
        <h2>{{ t('agora', 'Timeline') }}</h2>
        <span class="timeline-count">{{ filteredInquiries.length }}</span>
      </div>
      <div class="header-right">
        <button
          v-for="mode in timelineModes"
          :key="mode.key"
          class="mode-btn"
          :class="{ active: timelineMode === mode.key }"
          @click="timelineMode = mode.key"
          :title="mode.description"
        >
          <component :is="mode.icon" :size="18" />
          {{ mode.label }}
        </button>
      </div>
    </div>

    <!-- Timeline Filters -->
    <div class="timeline-filters">
      <div class="filter-group">
        <button
          v-for="filter in filters"
          :key="filter.key"
          class="filter-btn"
          :class="{ active: activeFilter === filter.key }"
          @click="activeFilter = filter.key"
        >
          <component :is="filter.icon" :size="14" />
          {{ filter.label }}
        </button>
      </div>
      <div class="filter-group right">
        <button
          class="filter-btn"
          :class="{ active: showArchived }"
          @click="showArchived = !showArchived"
        >
          <component :is="Icons.Archive" :size="14" />
          {{ t('agora', 'Archived') }}
        </button>
      </div>
    </div>

    <!-- Timeline Content -->
    <div class="timeline-container">
      <!-- Mode A: Inquiries Timeline -->
      <template v-if="timelineMode === 'inquiries'">
        <div v-if="filteredInquiries.length === 0" class="empty-state">
          <component :is="Icons.Clock" :size="48" class="empty-icon" />
          <h3>{{ t('agora', 'No inquiries on timeline') }}</h3>
          <p>{{ t('agora', 'There are no inquiries matching your filters') }}</p>
        </div>

        <div
          v-for="(group, dateKey) in groupedInquiries"
          :key="dateKey"
          class="timeline-group"
        >
          <div class="group-header">
            <span class="group-date">{{ formatGroupDate(dateKey) }}</span>
            <span class="group-count">{{ group.length }} {{ t('agora', 'items') }}</span>
          </div>

          <div class="group-items">
            <TimelineItem
              v-for="inquiry in group"
              :key="inquiry.id"
              :inquiry="inquiry"
              :mode="viewMode"
              :is-active="activeId === inquiry.id"
              @click="handleClick"
            />
          </div>
        </div>
      </template>

      <!-- Mode B: Process Timeline -->
      <template v-else-if="timelineMode === 'process'">
        <div v-if="selectedInquiry" class="process-timeline">
          <div class="process-header">
            <div class="process-title">
              <component :is="Icons.GitBranch" :size="20" />
              <h3>{{ t('agora', 'Process for') }}: {{ selectedInquiry.title }}</h3>
            </div>
            <span class="process-status" :class="getProcessStatusClass(selectedInquiry)">
              {{ getProcessStatusText(selectedInquiry) }}
            </span>
          </div>

          <div class="process-steps">
            <div
              v-for="(step, index) in processSteps"
              :key="step.key"
              class="step"
              :class="{
                completed: step.completed,
                active: step.active,
                'is-last': index === processSteps.length - 1
              }"
            >
              <div class="step-indicator">
                <div class="step-dot">
                  <component
                    v-if="step.completed"
                    :is="Icons.Check"
                    :size="12"
                    class="step-check"
                  />
                </div>
                <div v-if="index < processSteps.length - 1" class="step-line" />
              </div>
              <div class="step-content">
                <div class="step-title">{{ step.label }}</div>
                <div v-if="step.date" class="step-date">
                  <component :is="Icons.Calendar" :size="12" />
                  {{ formatDate(step.date) }}
                </div>
                <div v-if="step.description" class="step-description">
                  {{ step.description }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="empty-state">
          <component :is="Icons.GitBranch" :size="48" class="empty-icon" />
          <h3>{{ t('agora', 'No inquiry selected') }}</h3>
          <p>{{ t('agora', 'Select an inquiry to view its process timeline') }}</p>
        </div>
      </template>

      <!-- Mode C: Historical Timeline -->
      <template v-else-if="timelineMode === 'historical'">
        <div v-if="historicalEvents.length > 0" class="historical-timeline">
          <div
            v-for="(event, index) in historicalEvents"
            :key="event.id"
            class="historical-event"
            :class="{ 'is-last': index === historicalEvents.length - 1 }"
          >
            <div class="event-date">
              <span class="date-day">{{ formatDateDay(event.date) }}</span>
              <span class="date-month">{{ formatDateMonth(event.date) }}</span>
            </div>
            <div class="event-connector">
              <div class="event-dot" :class="event.type">
                <component :is="event.icon" :size="16" />
              </div>
              <div v-if="index < historicalEvents.length - 1" class="event-line" />
            </div>
            <div class="event-content">
              <div class="event-title">{{ event.title }}</div>
              <div v-if="event.description" class="event-description">
                {{ event.description }}
              </div>
              <div v-if="event.inquiry" class="event-inquiry">
                <component :is="Icons.Folder" :size="12" />
                <span>{{ event.inquiry.title }}</span>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="empty-state">
          <component :is="Icons.History" :size="48" class="empty-icon" />
          <h3>{{ t('agora', 'No historical events') }}</h3>
          <p>{{ t('agora', 'Historical events will appear here as they occur') }}</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { t } from '@nextcloud/l10n'
import { InquiryGeneralIcons as Icons } from '../../utils/icons'
import TimelineItem from './TimelineItem.vue'
import type { Inquiry } from '../../Types'

interface Props {
  inquiries: Inquiry[]
  groupId?: number
  selectedInquiryId?: number
  processPhases?: Array<{ key: string; label: string; description?: string }>
}

const props = withDefaults(defineProps<Props>(), {
  processPhases: () => []
})

const emit = defineEmits<{
  click: [inquiry: Inquiry]
}>()

// Timeline modes with French labels
const timelineModes = [
  {
    key: 'inquiries',
    label: t('agora', 'Inquiries'),
    icon: Icons.ViewList,
    description: t('agora', 'View all inquiries over time')
  },
  {
    key: 'process',
    label: t('agora', 'Process'),
    icon: Icons.GitBranch,
    description: t('agora', 'View the process steps of a selected inquiry')
  },
  {
    key: 'historical',
    label: t('agora', 'History'),
    icon: Icons.History,
    description: t('agora', 'View historical events and milestones')
  }
]

const timelineMode = ref<'inquiries' | 'process' | 'historical'>('inquiries')
const viewMode = ref<'compact' | 'detailed' | 'calendar'>('detailed')
const activeFilter = ref<'all' | 'active' | 'closed' | 'draft' | 'pending'>('all')
const showArchived = ref(false)
const activeId = ref<number | null>(null)

const filters = [
  { key: 'all', label: t('agora', 'All'), icon: Icons.ViewAll },
  { key: 'active', label: t('agora', 'Active'), icon: Icons.CheckCircle },
  { key: 'closed', label: t('agora', 'Closed'), icon: Icons.Close },
  { key: 'draft', label: t('agora', 'Drafts'), icon: Icons.Edit },
  { key: 'pending', label: t('agora', 'Pending'), icon: Icons.Clock },
]

const selectedInquiry = computed(() =>
  props.inquiries.find(i => i.id === props.selectedInquiryId)
)

// Filtered inquiries for Mode A
const filteredInquiries = computed(() => {
  let items = [...props.inquiries]

  if (activeFilter.value !== 'all') {
    items = items.filter(i => {
      const status = i.status?.inquiryStatus || 'draft'
      return status === activeFilter.value
    })
  }

  if (!showArchived.value) {
    items = items.filter(i => !i.status?.isArchived)
  }

  return items.sort((a, b) => (b.status?.created || 0) - (a.status?.created || 0))
})

const groupedInquiries = computed(() => {
  const groups: Record<string, Inquiry[]> = {}

  filteredInquiries.value.forEach(inquiry => {
    const date = inquiry.status?.created
    if (!date) return

    const dateObj = new Date(date * 1000)
    const key = dateObj.toISOString().split('T')[0]

    if (!groups[key]) {
      groups[key] = []
    }
    groups[key].push(inquiry)
  })

  return groups
})

// Process steps for Mode B
const processSteps = computed(() => {
  if (!selectedInquiry.value) return []

  // If we have process phases from props, use them
  if (props.processPhases.length > 0) {
    const currentPhase = selectedInquiry.value.miscFields?.processPhase || props.processPhases[0]?.key
    const phaseIndex = props.processPhases.findIndex(p => p.key === currentPhase)

    return props.processPhases.map((phase, index) => ({
      key: phase.key,
      label: phase.label,
      description: phase.description,
      completed: index < phaseIndex,
      active: index === phaseIndex,
      date: selectedInquiry.value.miscFields?.processHistory?.[phase.key] || null
    }))
  }

  // Fallback: use status transitions
  const statuses = ['draft', 'waiting_approval', 'active', 'closed']
  const currentStatus = selectedInquiry.value.status?.inquiryStatus || 'draft'
  const statusIndex = statuses.indexOf(currentStatus)

  return statuses.map((status, index) => ({
    key: status,
    label: t('agora', status.charAt(0).toUpperCase() + status.slice(1)),
    completed: index < statusIndex,
    active: index === statusIndex,
    date: selectedInquiry.value.status?.created
  }))
})

// Historical events for Mode C
const historicalEvents = computed(() => {
  const events: any[] = []

  props.inquiries.forEach(inquiry => {
    // Creation event
    if (inquiry.status?.created) {
      events.push({
        id: `created-${inquiry.id}`,
        date: inquiry.status.created,
        icon: Icons.PlusCircle,
        type: 'creation',
        title: t('agora', 'Created "{title}"', { title: inquiry.title }),
        description: t('agora', 'Inquiry was created'),
        inquiry
      })
    }

    // Status change events
    if (inquiry.status?.inquiryStatus) {
      const statusMap: Record<string, { icon: any; type: string; label: string }> = {
        'active': { icon: Icons.CheckCircle, type: 'active', label: t('agora', 'Activated') },
        'closed': { icon: Icons.Close, type: 'closed', label: t('agora', 'Closed') },
        'waiting_approval': { icon: Icons.Clock, type: 'pending', label: t('agora', 'Submitted for approval') }
      }

      const statusInfo = statusMap[inquiry.status.inquiryStatus]
      if (statusInfo && inquiry.status.lastInteraction) {
        events.push({
          id: `status-${inquiry.id}-${inquiry.status.inquiryStatus}`,
          date: inquiry.status.lastInteraction,
          icon: statusInfo.icon,
          type: statusInfo.type,
          title: `${statusInfo.label}: "${inquiry.title}"`,
          inquiry
        })
      }
    }

    // Expiry events
    if (inquiry.configuration?.expire) {
      events.push({
        id: `expiry-${inquiry.id}`,
        date: inquiry.configuration.expire,
        icon: Icons.Clock,
        type: 'expiry',
        title: t('agora', 'Expiry of "{title}"', { title: inquiry.title }),
        description: t('agora', 'This inquiry will expire'),
        inquiry
      })
    }
  })

  return events.sort((a, b) => a.date - b.date)
})

function getProcessStatusClass(inquiry: Inquiry): string {
  const status = inquiry.status?.inquiryStatus || 'draft'
  return `status-${status}`
}

function getProcessStatusText(inquiry: Inquiry): string {
  const status = inquiry.status?.inquiryStatus || 'draft'
  const map: Record<string, string> = {
    'active': t('agora', 'In Progress'),
    'closed': t('agora', 'Completed'),
    'draft': t('agora', 'Draft'),
    'waiting_approval': t('agora', 'Pending Approval'),
    'rejected': t('agora', 'Rejected')
  }
  return map[status] || status
}

function formatGroupDate(dateKey: string): string {
  const date = new Date(dateKey + 'T00:00:00')
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  if (date.toDateString() === today.toDateString()) {
    return t('agora', 'Today')
  }
  if (date.toDateString() === yesterday.toDateString()) {
    return t('agora', 'Yesterday')
  }
  return date.toLocaleDateString('default', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function formatDate(timestamp: number): string {
  const date = new Date(timestamp * 1000)
  return date.toLocaleDateString('default', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function formatDateDay(timestamp: number): string {
  const date = new Date(timestamp * 1000)
  return date.getDate().toString()
}

function formatDateMonth(timestamp: number): string {
  const date = new Date(timestamp * 1000)
  return date.toLocaleDateString('default', { month: 'short' })
}

function handleClick(inquiry: Inquiry) {
  activeId.value = inquiry.id
  emit('click', inquiry)
}
</script>

<style lang="scss" scoped>
.inquiry-timeline {
  background: var(--color-main-background);
  border-radius: 16px;
  border: 1px solid var(--color-border);
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.timeline-header {
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

    .timeline-icon {
      color: var(--color-primary-element);
    }

    h2 {
      margin: 0;
      font-size: 20px;
      font-weight: 700;
      color: var(--color-main-text);
      letter-spacing: -0.01em;
    }

    .timeline-count {
      font-size: 12px;
      font-weight: 600;
      background: var(--color-background-darker);
      padding: 3px 12px;
      border-radius: 20px;
      color: var(--color-text-lighter);
    }
  }

  .header-right {
    display: flex;
    gap: 4px;

    .mode-btn {
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

.timeline-filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  border-bottom: 1px solid var(--color-border);
  flex-wrap: wrap;
  gap: 8px;
  background: var(--color-background-dark);

  .filter-group {
    display: flex;
    gap: 4px;
    flex-wrap: wrap;

    &.right {
      margin-left: auto;
    }

    .filter-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 5px 14px;
      border: 1px solid transparent;
      border-radius: 6px;
      background: transparent;
      color: var(--color-text-lighter);
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;

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

.timeline-container {
  padding: 8px 0;
  max-height: 650px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--color-border);
    border-radius: 4px;
  }
}

.timeline-group {
  .group-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 24px;
    background: var(--color-background-dark);
    border-top: 1px solid var(--color-border);
    border-bottom: 1px solid var(--color-border);

    .group-date {
      font-size: 13px;
      font-weight: 600;
      color: var(--color-main-text);
    }

    .group-count {
      font-size: 12px;
      color: var(--color-text-lighter);
    }
  }

  .group-items {
    padding: 4px 0;
  }
}

// Process Timeline Styles
.process-timeline {
  padding: 24px;

  .process-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid var(--color-border);

    .process-title {
      display: flex;
      align-items: center;
      gap: 10px;

      h3 {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
        color: var(--color-main-text);
      }
    }

    .process-status {
      padding: 5px 14px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 600;

      &.status-active {
        background: var(--color-success-light);
        color: var(--color-success);
      }
      &.status-closed {
        background: var(--color-error-light);
        color: var(--color-error);
      }
      &.status-draft {
        background: var(--color-background-dark);
        color: var(--color-text-lighter);
      }
      &.status-waiting_approval {
        background: var(--color-warning-light);
        color: var(--color-warning);
      }
    }
  }

  .process-steps {
    padding: 24px 0 8px;

    .step {
      display: flex;
      gap: 16px;
      padding-bottom: 24px;

      &.is-last {
        padding-bottom: 0;
      }

      .step-indicator {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 24px;
        flex-shrink: 0;

        .step-dot {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--color-background-dark);
          border: 2px solid var(--color-border);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 1;

          .step-check {
            color: white;
          }
        }

        .step-line {
          width: 2px;
          flex: 1;
          background: var(--color-border);
          margin: 4px 0;
        }
      }

      &.completed {
        .step-dot {
          background: var(--color-success);
          border-color: var(--color-success);
        }
      }

      &.active {
        .step-dot {
          background: var(--color-primary-element);
          border-color: var(--color-primary-element);
          box-shadow: 0 0 0 4px rgba(var(--color-primary-rgb), 0.2);
          animation: pulse-dot 2s ease-in-out infinite;
        }
      }

      .step-content {
        flex: 1;
        padding-top: 2px;

        .step-title {
          font-size: 15px;
          font-weight: 600;
          color: var(--color-main-text);
        }

        .step-date {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          color: var(--color-text-lighter);
          margin-top: 4px;
        }

        .step-description {
          font-size: 13px;
          color: var(--color-text-lighter);
          margin-top: 4px;
        }
      }
    }
  }
}

// Historical Timeline Styles
.historical-timeline {
  padding: 20px 24px;

  .historical-event {
    display: flex;
    gap: 16px;
    padding-bottom: 24px;

    &.is-last {
      padding-bottom: 0;
    }

    .event-date {
      display: flex;
      flex-direction: column;
      align-items: center;
      min-width: 60px;
      flex-shrink: 0;

      .date-day {
        font-size: 24px;
        font-weight: 700;
        color: var(--color-main-text);
        line-height: 1.2;
      }

      .date-month {
        font-size: 12px;
        font-weight: 600;
        color: var(--color-text-lighter);
        text-transform: uppercase;
      }
    }

    .event-connector {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 32px;
      flex-shrink: 0;

      .event-dot {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid var(--color-border);
        background: var(--color-main-background);
        z-index: 1;

        &.creation {
          border-color: var(--color-success);
          color: var(--color-success);
        }
        &.active {
          border-color: var(--color-primary-element);
          color: var(--color-primary-element);
        }
        &.closed {
          border-color: var(--color-error);
          color: var(--color-error);
        }
        &.pending {
          border-color: var(--color-warning);
          color: var(--color-warning);
        }
        &.expiry {
          border-color: var(--color-warning);
          color: var(--color-warning);
        }
      }

      .event-line {
        width: 2px;
        flex: 1;
        background: var(--color-border);
        margin: 4px 0;
      }
    }

    .event-content {
      flex: 1;
      padding-top: 4px;

      .event-title {
        font-size: 15px;
        font-weight: 600;
        color: var(--color-main-text);
      }

      .event-description {
        font-size: 13px;
        color: var(--color-text-lighter);
        margin-top: 4px;
      }

      .event-inquiry {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-top: 6px;
        font-size: 12px;
        color: var(--color-text-lighter);
        padding: 4px 12px;
        background: var(--color-background-dark);
        border-radius: 4px;

        svg {
          color: var(--color-text-maxcontrast);
        }
      }
    }
  }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
  color: var(--color-text-lighter);

  .empty-icon {
    opacity: 0.3;
    margin-bottom: 16px;
  }

  h3 {
    margin: 0 0 8px 0;
    font-size: 18px;
    font-weight: 600;
    color: var(--color-main-text);
  }

  p {
    margin: 0;
    font-size: 14px;
  }
}

@keyframes pulse-dot {
  0%, 100% {
    box-shadow: 0 0 0 4px rgba(var(--color-primary-rgb), 0.2);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(var(--color-primary-rgb), 0.1);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .timeline-header {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
    padding: 16px 20px;

    .header-right {
      flex-wrap: wrap;
      justify-content: center;
    }
  }

  .timeline-filters {
    flex-direction: column;
    align-items: stretch;
    padding: 12px 16px;

    .filter-group.right {
      margin-left: 0;
    }
  }

  .process-timeline {
    padding: 16px;

    .process-header {
      flex-direction: column;
      gap: 12px;
      align-items: flex-start;
    }
  }

  .historical-timeline {
    padding: 16px;

    .historical-event {
      flex-direction: column;
      gap: 8px;

      .event-date {
        flex-direction: row;
        gap: 8px;
        min-width: auto;
      }

      .event-connector {
        display: none;
      }
    }
  }
}

@media (max-width: 480px) {
  .timeline-header .header-left h2 {
    font-size: 17px;
  }

  .timeline-header .header-right .mode-btn {
    padding: 5px 12px;
    font-size: 12px;
  }

  .process-steps .step .step-content .step-title {
    font-size: 14px;
  }
}
</style>
