<!--
  SPDX-FileCopyrightText: 2026 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="activity-feed">
    <div class="feed-header">
      <div class="header-left">
        <component :is="Icons.Bell" :size="20" />
        <h3>{{ t('agora', 'Activity') }}</h3>
      </div>
      <button class="mark-all-btn" @click="markAllRead">
        {{ t('agora', 'Mark all read') }}
      </button>
    </div>

    <div class="feed-list">
      <div
        v-for="activity in activities"
        :key="activity.id"
        class="activity-item"
        :class="{ 'is-unread': !activity.read }"
      >
        <div class="activity-icon" :class="activity.type">
          <component :is="getActivityIcon(activity)" :size="18" />
        </div>
        <div class="activity-content">
          <div class="activity-text">
            <strong>{{ activity.user }}</strong>
            {{ activity.action }}
            <span class="activity-target">{{ activity.target }}</span>
          </div>
          <div class="activity-time">{{ formatTime(activity.timestamp) }}</div>
        </div>
      </div>

      <div v-if="activities.length === 0" class="empty-state">
        <component :is="Icons.BellOff" :size="32" />
        <p>{{ t('agora', 'No recent activity') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { t } from '@nextcloud/l10n'
import { InquiryGeneralIcons as Icons } from '../../utils/icons'
import type { Inquiry } from '../../Types'

interface Activity {
  id: string
  type: 'comment' | 'support' | 'create' | 'update' | 'close'
  user: string
  action: string
  target: string
  inquiryId: number
  timestamp: number
  read: boolean
}

const props = defineProps<{
  inquiries: Inquiry[]
  limit?: number
}>()

const activities = ref<Activity[]>([
  // Example activities - in real implementation, these would come from an API
])

function getActivityIcon(activity: Activity) {
  const icons: Record<string, any> = {
    comment: Icons.MessageSquare,
    support: Icons.ThumbUp,
    create: Icons.Plus,
    update: Icons.Edit,
    close: Icons.CheckCircle
  }
  return icons[activity.type] || Icons.Bell
}

function formatTime(timestamp: number): string {
  try {
    const now = Date.now() / 1000
    const diff = now - timestamp
    if (diff < 60) return t('agora', 'Just now')
    if (diff < 3600) return t('agora', '{m}m ago', { m: Math.floor(diff / 60) })
    if (diff < 86400) return t('agora', '{h}h ago', { h: Math.floor(diff / 3600) })
    return t('agora', '{d}d ago', { d: Math.floor(diff / 86400) })
  } catch {
    return ''
  }
}

function markAllRead() {
  activities.value = activities.value.map(a => ({ ...a, read: true }))
}
</script>

<style lang="scss" scoped>
.activity-feed {
  background: var(--color-main-background);
  border-radius: 12px;
  border: 1px solid var(--color-border);
  overflow: hidden;
}

.feed-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-background-dark);

  .header-left {
    display: flex;
    align-items: center;
    gap: 8px;

    h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
    }
  }

  .mark-all-btn {
    padding: 4px 12px;
    border: none;
    border-radius: 6px;
    background: transparent;
    color: var(--color-text-lighter);
    font-size: 12px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: var(--color-background-hover);
      color: var(--color-primary-element);
    }
  }
}

.feed-list {
  padding: 8px 0;
  max-height: 400px;
  overflow-y: auto;
}

.activity-item {
  display: flex;
  gap: 12px;
  padding: 10px 16px;
  transition: all 0.2s ease;

  &.is-unread {
    background: rgba(var(--color-primary-rgb), 0.03);
    border-left: 3px solid var(--color-primary-element);
  }

  &:hover {
    background: var(--color-background-hover);
  }

  .activity-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    &.comment { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
    &.support { background: rgba(16, 185, 129, 0.1); color: #10b981; }
    &.create { background: rgba(139, 92, 246, 0.1); color: #8b5cf6; }
    &.update { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
    &.close { background: rgba(239, 68, 68, 0.1); color: #ef4444; }
  }

  .activity-content {
    flex: 1;
    min-width: 0;

    .activity-text {
      font-size: 14px;
      color: var(--color-text);

      strong {
        font-weight: 600;
        color: var(--color-main-text);
      }

      .activity-target {
        font-weight: 500;
        color: var(--color-primary-element);
      }
    }

    .activity-time {
      font-size: 12px;
      color: var(--color-text-lighter);
      margin-top: 2px;
    }
  }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  color: var(--color-text-lighter);
  gap: 8px;

  svg {
    opacity: 0.3;
  }

  p {
    margin: 0;
    font-size: 14px;
  }
}
</style>
