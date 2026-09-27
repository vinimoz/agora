  SPDX-FileCopyrightText: 2026 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="statistics-widget">
    <!-- Header -->
    <div class="stat-header">
      <component :is="Icons.BarChart" :size="20" class="stat-icon" />
      <h3>{{ t('agora', 'Statistics') }}</h3>
      <span v-if="lastUpdated" class="stat-updated">
        {{ t('agora', 'Updated') }} {{ formatTime(lastUpdated) }}
      </span>
    </div>

    <!-- Stats Grid -->
    <div class="stats-grid">
      <!-- Total Inquiries -->
      <div class="stat-card">
        <div class="stat-value">{{ totalInquiries }}</div>
        <div class="stat-label">
          <component :is="Icons.ClipboardList" :size="14" />
          {{ t('agora', 'Total Inquiries') }}
        </div>
        <div v-if="trends.total" class="stat-trend" :class="trends.total.direction">
          {{ trends.total.value }}%
        </div>
      </div>

      <!-- Active -->
      <div class="stat-card highlight">
        <div class="stat-value active-value">{{ activeCount }}</div>
        <div class="stat-label">
          <component :is="Icons.CheckCircle" :size="14" />
          {{ t('agora', 'Active') }}
        </div>
        <div class="stat-progress">
          <div class="progress-bar" :style="{ width: `${(activeCount / totalInquiries) * 100}%` }"></div>
        </div>
      </div>

      <!-- Comments -->
      <div class="stat-card">
        <div class="stat-value">{{ totalComments }}</div>
        <div class="stat-label">
          <component :is="Icons.MessageSquare" :size="14" />
          {{ t('agora', 'Comments') }}
        </div>
      </div>

      <!-- Participants -->
      <div class="stat-card">
        <div class="stat-value">{{ totalParticipants }}</div>
        <div class="stat-label">
          <component :is="Icons.Users" :size="14" />
          {{ t('agora', 'Participants') }}
        </div>
      </div>

      <!-- Supports -->
      <div class="stat-card">
        <div class="stat-value">{{ totalSupports }}</div>
        <div class="stat-label">
          <component :is="Icons.ThumbUp" :size="14" />
          {{ t('agora', 'Supports') }}
        </div>
      </div>

      <!-- Engagement Rate -->
      <div class="stat-card">
        <div class="stat-value">{{ engagementRate }}%</div>
        <div class="stat-label">
          <component :is="Icons.TrendingUp" :size="14" />
          {{ t('agora', 'Engagement') }}
        </div>
        <div class="stat-progress">
          <div class="progress-bar engagement" :style="{ width: `${engagementRate}%` }"></div>
        </div>
      </div>
    </div>

    <!-- Distribution Chart -->
    <div v-if="typeDistribution.length > 0" class="distribution-section">
      <h4>{{ t('agora', 'By Type') }}</h4>
      <div class="distribution-bars">
        <div
          v-for="item in typeDistribution"
          :key="item.type"
          class="distribution-item"
        >
          <span class="dist-label">
            <component :is="getTypeIcon(item.type)" :size="12" />
            {{ item.label }}
          </span>
          <div class="dist-bar-container">
            <div 
              class="dist-bar" 
              :style="{ width: `${item.percentage}%` }"
              :class="`dist-${item.type?.toLowerCase() || 'default'}`"
            ></div>
          </div>
          <span class="dist-value">{{ item.count }}</span>
        </div>
      </div>
    </div>

    <!-- Status Distribution -->
    <div v-if="statusDistribution.length > 0" class="distribution-section">
      <h4>{{ t('agora', 'By Status') }}</h4>
      <div class="status-pills">
        <span
          v-for="item in statusDistribution"
          :key="item.status"
          class="status-pill"
          :class="`pill-${item.status}`"
        >
          {{ item.label }}
          <span class="pill-count">{{ item.count }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { t } from '@nextcloud/l10n'
import { InquiryGeneralIcons as Icons } from '../../utils/icons'
import { getInquiryTypeData } from '../../helpers/modules/InquiryHelper'
import { useSessionStore } from '../../stores/session'
import type { Inquiry } from '../../Types'

const props = defineProps<{
  inquiries: Inquiry[]
  groupId?: number
}>()

const sessionStore = useSessionStore()

// Computed stats
const totalInquiries = computed(() => props.inquiries.length)


const trends = computed(() => ({}))

const activeCount = computed(() => 
  props.inquiries.filter(i => 
    i.status?.inquiryStatus === 'active' && !i.status?.isArchived
  ).length
)

const totalComments = computed(() =>
  props.inquiries.reduce((sum, i) => sum + (i.status?.countComments || 0), 0)
)

const totalParticipants = computed(() =>
  props.inquiries.reduce((sum, i) => sum + (i.status?.countParticipants || 0), 0)
)

const totalSupports = computed(() =>
  props.inquiries.reduce((sum, i) => sum + (i.status?.countSupports || 0), 0)
)

const engagementRate = computed(() => {
  if (totalInquiries.value === 0) return 0
  const engaged = props.inquiries.filter(i => 
    (i.status?.countComments || 0) > 0 || (i.status?.countSupports || 0) > 0
  ).length
  return Math.round((engaged / totalInquiries.value) * 100)
})


const typeDistribution = computed(() => {
  const types = sessionStore.appSettings?.inquiryTypeTab || []
  const counts: Record<string, number> = {}
  
  props.inquiries.forEach(inquiry => {
    const type = inquiry.type || 'default'
    counts[type] = (counts[type] || 0) + 1
  })
  
  return Object.entries(counts)
    .map(([type, count]) => {
      const data = getInquiryTypeData(type, types)
      return {
        type,
        label: data?.label || type,
        count,
        percentage: Math.round((count / totalInquiries.value) * 100)
      }
    })
    .sort((a, b) => b.count - a.count)
})

const statusDistribution = computed(() => {
  const counts: Record<string, number> = {}
  const labels: Record<string, string> = {
    active: t('agora', 'Active'),
    closed: t('agora', 'Closed'),
    draft: t('agora', 'Draft'),
    waiting_approval: t('agora', 'Pending')
  }
  
  props.inquiries.forEach(inquiry => {
    const status = inquiry.status?.inquiryStatus || 'draft'
    counts[status] = (counts[status] || 0) + 1
  })
  
  return Object.entries(counts)
    .map(([status, count]) => ({
      status,
      label: labels[status] || status,
      count
    }))
    .sort((a, b) => b.count - a.count)
})

const lastUpdated = computed(() => {
  const timestamps = props.inquiries.map(i => i.status?.lastInteraction || i.status?.created || 0)
  return timestamps.length > 0 ? Math.max(...timestamps) : null
})

function getTypeIcon(type: string) {
  const types = sessionStore.appSettings?.inquiryTypeTab || []
  const data = getInquiryTypeData(type, types)
  return data?.icon || Icons.FolderMultiple
}

function formatTime(timestamp: number): string {
  try {
    return new Date(timestamp * 1000).toLocaleString()
  } catch {
    return ''
  }
}
</script>

<style lang="scss" scoped>
.statistics-widget {
  background: var(--color-main-background);
  border-radius: 12px;
  border: 1px solid var(--color-border);
  padding: 20px;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--color-primary-element);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  }
}

.stat-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--color-border-light);

  .stat-icon {
    color: var(--color-primary-element);
  }

  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    flex: 1;
    color: var(--color-main-text);
  }

  .stat-updated {
    font-size: 12px;
    color: var(--color-text-lighter);
    opacity: 0.7;
  }
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
  margin-bottom: 24px;
}

.stat-card {
  background: var(--color-background-dark);
  border-radius: 10px;
  padding: 16px;
  text-align: center;
  transition: all 0.2s ease;
  border: 1px solid transparent;

  &:hover {
    border-color: var(--color-border);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  }

  &.highlight {
    background: var(--color-primary-light);
    border-color: var(--color-primary-element);

    .stat-value {
      color: var(--color-primary-element);
    }
  }

  .stat-value {
    font-size: 28px;
    font-weight: 700;
    color: var(--color-main-text);
    line-height: 1.2;

    &.active-value {
      color: var(--color-success);
    }
  }

  .stat-label {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    font-size: 13px;
    color: var(--color-text-lighter);
    margin-top: 4px;
  }

  .stat-trend {
    font-size: 12px;
    font-weight: 600;
    margin-top: 4px;

    &.up {
      color: var(--color-success);
    }
    &.down {
      color: var(--color-error);
    }
  }

  .stat-progress {
    margin-top: 8px;
    height: 4px;
    background: var(--color-background-darker);
    border-radius: 2px;
    overflow: hidden;

    .progress-bar {
      height: 100%;
      border-radius: 2px;
      background: var(--color-primary-element);
      transition: width 0.6s ease;

      &.engagement {
        background: linear-gradient(90deg, var(--color-primary-element), var(--color-success));
      }
    }
  }
}

.distribution-section {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid var(--color-border-light);

  h4 {
    margin: 0 0 12px 0;
    font-size: 14px;
    font-weight: 600;
    color: var(--color-text-lighter);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .distribution-bars {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .distribution-item {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;

    .dist-label {
      display: flex;
      align-items: center;
      gap: 4px;
      min-width: 100px;
      color: var(--color-text-lighter);

      svg {
        flex-shrink: 0;
      }
    }

    .dist-bar-container {
      flex: 1;
      height: 6px;
      background: var(--color-background-darker);
      border-radius: 3px;
      overflow: hidden;

      .dist-bar {
        height: 100%;
        border-radius: 3px;
        transition: width 0.6s ease;

        &.dist-proposal { background: #10b981; }
        &.dist-survey { background: #3b82f6; }
        &.dist-poll { background: #8b5cf6; }
        &.dist-discussion { background: #06b6d4; }
        &.dist-question { background: #f59e0b; }
        &.dist-default { background: var(--color-text-lighter); }
      }
    }

    .dist-value {
      min-width: 30px;
      text-align: right;
      font-weight: 600;
      color: var(--color-main-text);
      font-size: 14px;
    }
  }

  .status-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    .status-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 500;

      &.pill-active {
        background: rgba(34, 197, 94, 0.1);
        color: #16a34a;
        border: 1px solid rgba(34, 197, 94, 0.2);
      }

      &.pill-closed {
        background: rgba(239, 68, 68, 0.1);
        color: #dc2626;
        border: 1px solid rgba(239, 68, 68, 0.2);
      }

      &.pill-draft {
        background: rgba(148, 163, 184, 0.1);
        color: #64748b;
        border: 1px solid rgba(148, 163, 184, 0.2);
      }

      &.pill-waiting_approval {
        background: rgba(245, 158, 11, 0.1);
        color: #f59e0b;
        border: 1px solid rgba(245, 158, 11, 0.2);
      }

      .pill-count {
        background: rgba(0, 0, 0, 0.08);
        padding: 0 6px;
        border-radius: 8px;
        font-size: 11px;
        font-weight: 600;
      }
    }
  }
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .distribution-item {
    flex-wrap: wrap;
    
    .dist-label {
      min-width: 70px;
    }
  }
}
</style>
