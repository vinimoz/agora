<!--
  SPDX-FileCopyrightText: 2026 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div
    class="timeline-item"
    :class="[
      `mode-${mode}`,
      { 'is-active': isActive },
      `status-${inquiry.status?.inquiryStatus || 'draft'}`
    ]"
    @click="handleClick"
  >
    <!-- Status Dot -->
    <div class="item-status-dot" :class="statusDotClass">
      <component :is="statusIcon" :size="12" />
    </div>

    <!-- Content -->
    <div class="item-content">
      <div class="item-header">
        <div class="item-title-wrapper">
          <component :is="typeIcon" :size="mode === 'compact' ? 16 : 20" class="item-type-icon" />
          <h4 class="item-title">{{ inquiry.title }}</h4>
        </div>
        <span class="item-time">{{ formatTime(inquiry.status?.created) }}</span>
      </div>

      <!-- Description (detailed mode) -->
      <p v-if="mode === 'detailed' && shortDescription" class="item-description">
        {{ shortDescription }}
      </p>

      <!-- Meta (detailed mode) -->
      <div v-if="mode === 'detailed'" class="item-meta">
        <div v-if="inquiry.ownedGroup || inquiry.owner?.displayName" class="meta-author">
          <NcAvatar
            v-if="inquiry.ownedGroup"
            :display-name="inquiry.ownedGroup"
            :show-user-status="false"
            :size="20"
          />
          <NcAvatar
            v-else
            :user="inquiry.owner?.id"
            :display-name="inquiry.owner?.displayName"
            :size="20"
          />
          <span>{{ inquiry.ownedGroup || inquiry.owner?.displayName }}</span>
        </div>

        <div v-if="inquiry.status?.countComments" class="meta-item">
          <component :is="Icons.Comment" :size="12" />
          <span>{{ inquiry.status.countComments }}</span>
        </div>

        <div v-if="inquiry.status?.countSupports" class="meta-item">
          <component :is="Icons.ThumbUp" :size="12" />
          <span>{{ inquiry.status.countSupports }}</span>
        </div>

        <div v-if="inquiry.status?.countParticipants" class="meta-item">
          <component :is="Icons.Users" :size="12" />
          <span>{{ inquiry.status.countParticipants }}</span>
        </div>

        <div v-if="inquiry.configuration?.expire" class="meta-item expiry" :class="expiryClass">
          <component :is="Icons.Clock" :size="12" />
          <span>{{ getExpiryText(inquiry) }}</span>
        </div>
      </div>

      <!-- Status badge (compact mode) -->
      <div v-if="mode === 'compact'" class="item-badges">
        <span class="status-badge" :class="statusBadgeClass">
          {{ statusText }}
        </span>
        <span v-if="inquiry.status?.isArchived" class="archived-badge">
          {{ t('agora', 'Archived') }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { t } from '@nextcloud/l10n'
import NcAvatar from '@nextcloud/vue/components/NcAvatar'
import { InquiryGeneralIcons as Icons, StatusIcons } from '../../utils/icons'
import { getInquiryTypeData } from '../../helpers/modules/InquiryHelper'
import { useSessionStore } from '../../stores/session'
import type { Inquiry } from '../../Types'

interface Props {
  inquiry: Inquiry
  mode: 'compact' | 'detailed' | 'calendar'
  isActive?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isActive: false
})

const emit = defineEmits<{
  click: [inquiry: Inquiry]
}>()

const sessionStore = useSessionStore()

const inquiryTypes = computed(() => sessionStore.appSettings?.inquiryTypeTab || [])

const typeData = computed(() => getInquiryTypeData(props.inquiry.type, inquiryTypes.value))

const typeIcon = computed(() => {
  if (typeData.value?.icon) {
    return typeData.value.icon
  }
  const iconMap: Record<string, any> = {
    'survey': Icons.ClipboardList,
    'poll': Icons.CheckCircle,
    'question': Icons.Question,
    'discussion': Icons.MessageSquare,
    'news': Icons.Newspaper,
    'announcement': Icons.Megaphone,
    'meeting': Icons.Users,
    'document': Icons.Document,
    'proposal': Icons.Scale,
    'general': Icons.FolderMultiple,
  }
  return iconMap[props.inquiry.type?.toLowerCase()] || Icons.FolderMultiple
})

const statusIcon = computed(() => {
  const status = props.inquiry.status?.inquiryStatus || 'draft'
  const map: Record<string, any> = {
    'active': Icons.CheckCircle,
    'closed': Icons.Close,
    'draft': Icons.Edit,
    'waiting_approval': Icons.Clock,
    'rejected': Icons.Close
  }
  return map[status] || Icons.Circle
})

const statusDotClass = computed(() => {
  const status = props.inquiry.status?.inquiryStatus || 'draft'
  return `dot-${status}`
})

const statusBadgeClass = computed(() => {
  const status = props.inquiry.status?.inquiryStatus || 'draft'
  return `badge-${status}`
})

const statusText = computed(() => {
  const status = props.inquiry.status?.inquiryStatus || 'draft'
  const map: Record<string, string> = {
    'active': t('agora', 'Active'),
    'closed': t('agora', 'Closed'),
    'draft': t('agora', 'Draft'),
    'waiting_approval': t('agora', 'Pending'),
    'rejected': t('agora', 'Rejected')
  }
  return map[status] || status
})

const shortDescription = computed(() => {
  if (!props.inquiry.description) return ''
  const plain = props.inquiry.description.replace(/<[^>]*>/g, '')
  return plain.length > 100 ? `${plain.substring(0, 100)}…` : plain
})

const expiryClass = computed(() => {
  if (!props.inquiry.configuration?.expire) return ''
  const now = Date.now() / 1000
  const diff = props.inquiry.configuration.expire - now
  if (diff < 0) return 'expiry-expired'
  if (diff < 86400) return 'expiry-soon'
  if (diff < 259200) return 'expiry-warning'
  return 'expiry-normal'
})

function getExpiryText(inquiry: Inquiry): string {
  if (!inquiry.configuration?.expire) return ''
  const now = Date.now() / 1000
  const diff = inquiry.configuration.expire - now
  if (diff < 0) return t('agora', 'Expired')
  const days = Math.floor(diff / 86400)
  if (days === 0) return t('agora', 'Today')
  if (days === 1) return t('agora', '1 day')
  return t('agora', '{days}d', { days })
}

function formatTime(timestamp?: number): string {
  if (!timestamp) return ''
  const date = new Date(timestamp * 1000)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor(diff / (1000 * 60))

  if (hours < 1) {
    return minutes === 0 ? t('agora', 'Now') : t('agora', '{m}m ago', { m: minutes })
  }
  if (hours < 24) {
    return t('agora', '{h}h ago', { h: hours })
  }
  return date.toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit' })
}

function handleClick() {
  emit('click', props.inquiry)
}
</script>

<style lang="scss" scoped>
.timeline-item {
  display: flex;
  gap: 16px;
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
  position: relative;

  &:hover {
    background: var(--color-background-hover);
  }

  &.is-active {
    background: var(--color-primary-light);
    border-left-color: var(--color-primary-element);
  }

  // Status-specific border colors
  &.status-active { border-left-color: var(--color-success); }
  &.status-closed { border-left-color: var(--color-error); }
  &.status-draft { border-left-color: var(--color-text-lighter); }
  &.status-waiting_approval { border-left-color: var(--color-warning); }

  .item-status-dot {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    flex-shrink: 0;
    margin-top: 2px;

    &.dot-active {
      background: var(--color-success-light);
      color: var(--color-success);
    }
    &.dot-closed {
      background: var(--color-error-light);
      color: var(--color-error);
    }
    &.dot-draft {
      background: var(--color-background-dark);
      color: var(--color-text-lighter);
    }
    &.dot-waiting_approval {
      background: var(--color-warning-light);
      color: var(--color-warning);
    }
  }

  .item-content {
    flex: 1;
    min-width: 0;
  }

  .item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;

    .item-title-wrapper {
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 0;

      .item-type-icon {
        flex-shrink: 0;
        color: var(--color-text-lighter);
      }

      .item-title {
        margin: 0;
        font-size: 15px;
        font-weight: 500;
        color: var(--color-main-text);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .item-time {
      font-size: 12px;
      color: var(--color-text-lighter);
      flex-shrink: 0;
    }
  }

  .item-description {
    margin: 6px 0 0 32px;
    font-size: 13px;
    color: var(--color-text-lighter);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .item-meta {
    display: flex;
    gap: 16px;
    margin: 8px 0 0 32px;
    align-items: center;
    flex-wrap: wrap;

    .meta-author {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      color: var(--color-text-lighter);

      :deep(.avatar) {
        width: 20px !important;
        height: 20px !important;
        min-width: 20px !important;
        min-height: 20px !important;
      }
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 12px;
      color: var(--color-text-lighter);

      svg {
        color: var(--color-text-maxcontrast);
      }

      &.expiry {
        &.expiry-expired { color: var(--color-error); }
        &.expiry-soon { color: var(--color-warning); }
        &.expiry-warning { color: #f59e0b; }
        &.expiry-normal { color: var(--color-success); }
      }
    }
  }

  .item-badges {
    display: flex;
    gap: 8px;
    margin-left: 32px;
    margin-top: 4px;

    .status-badge {
      font-size: 11px;
      font-weight: 600;
      padding: 2px 10px;
      border-radius: 12px;
      text-transform: uppercase;
      letter-spacing: 0.3px;

      &.badge-active {
        background: var(--color-success-light);
        color: var(--color-success);
      }
      &.badge-closed {
        background: var(--color-error-light);
        color: var(--color-error);
      }
      &.badge-draft {
        background: var(--color-background-dark);
        color: var(--color-text-lighter);
      }
      &.badge-waiting_approval {
        background: var(--color-warning-light);
        color: var(--color-warning);
      }
    }

    .archived-badge {
      font-size: 11px;
      font-weight: 600;
      padding: 2px 10px;
      border-radius: 12px;
      background: var(--color-background-darker);
      color: var(--color-text-lighter);
    }
  }

  // Compact mode
  &.mode-compact {
    padding: 8px 16px;

    .item-status-dot {
      width: 20px;
      height: 20px;

      svg {
        width: 10px;
        height: 10px;
      }
    }

    .item-header .item-title-wrapper .item-title {
      font-size: 13px;
    }

    .item-badges {
      margin-left: 0;
    }
  }
}
</style>
