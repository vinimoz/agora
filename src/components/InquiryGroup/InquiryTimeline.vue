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
        <span class="timeline-count">{{ inquiries.length }}</span>
      </div>
      <div class="header-right">
        <button
          class="view-btn"
          :class="{ active: viewMode === 'compact' }"
          @click="viewMode = 'compact'"
          :title="t('agora', 'Compact view')"
        >
          <component :is="Icons.ViewCompact" :size="18" />
        </button>
        <button
          class="view-btn"
          :class="{ active: viewMode === 'detailed' }"
          @click="viewMode = 'detailed'"
          :title="t('agora', 'Detailed view')"
        >
          <component :is="Icons.ViewList" :size="18" />
        </button>
        <button
          class="view-btn"
          :class="{ active: viewMode === 'calendar' }"
          @click="viewMode = 'calendar'"
          :title="t('agora', 'Calendar view')"
        >
          <component :is="Icons.Calendar" :size="18" />
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
      <div v-if="filteredInquiries.length === 0" class="empty-state">
        <component :is="Icons.Clock" :size="48" class="empty-icon" />
        <h3>{{ t('agora', 'No inquiries on timeline') }}</h3>
        <p>{{ t('agora', 'There are no inquiries matching your filters') }}</p>
      </div>

      <!-- Timeline Groups by Date -->
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
}

const props = defineProps<Props>()

const emit = defineEmits<{
  click: [inquiry: Inquiry]
}>()

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

const filteredInquiries = computed(() => {
  let items = [...props.inquiries]

  // Filter by status
  if (activeFilter.value !== 'all') {
    items = items.filter(i => {
      const status = i.status?.inquiryStatus || 'draft'
      return status === activeFilter.value
    })
  }

  // Filter archived
  if (!showArchived.value) {
    items = items.filter(i => !i.status?.isArchived)
  }

  // Sort by date (newest first)
  return items.sort((a, b) => (b.status?.created || 0) - (a.status?.created || 0))
})

const groupedInquiries = computed(() => {
  const groups: Record<string, Inquiry[]> = {}

  filteredInquiries.value.forEach(inquiry => {
    const date = inquiry.status?.created
    if (!date) return

    const dateObj = new Date(date * 1000)
    const key = dateObj.toISOString().split('T')[0] // YYYY-MM-DD

    if (!groups[key]) {
      groups[key] = []
    }
    groups[key].push(inquiry)
  })

  return groups
})

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
    day: 'numeric',
  })
}

function handleClick(inquiry: Inquiry) {
  activeId.value = inquiry.id
  emit('click', inquiry)
}
</script>

<style lang="scss" scoped>
.inquiry-timeline {
  background: var(--color-main-background);
  border-radius: 12px;
  border: 1px solid var(--color-border);
  overflow: hidden;
}

.timeline-header {
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

    .timeline-icon {
      color: var(--color-primary-element);
    }

    h2 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: var(--color-main-text);
    }

    .timeline-count {
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

    .view-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 6px;
      border: 1px solid transparent;
      border-radius: 6px;
      background: transparent;
      color: var(--color-text-lighter);
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

.timeline-filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  border-bottom: 1px solid var(--color-border);
  flex-wrap: wrap;
  gap: 8px;

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
      padding: 4px 12px;
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

.timeline-container {
  padding: 12px 0;
  max-height: 600px;
  overflow-y: auto;
}

.timeline-group {
  .group-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 20px;
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
    color: var(--color-main-text);
  }

  p {
    margin: 0;
    font-size: 14px;
  }
}
</style>
