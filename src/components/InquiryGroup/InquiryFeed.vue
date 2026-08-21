<!--
  SPDX-FileCopyrightText: 2026 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="inquiry-feed">
    <!-- Feed Header -->
    <div class="feed-header">
      <div class="feed-header-left">
        <component :is="Icons.Activity" :size="24" class="feed-icon" />
        <h2>{{ t('agora', 'Activity Feed') }}</h2>
        <span class="feed-count">{{ inquiries.length }}</span>
      </div>
      <div class="feed-header-right">
        <button 
          class="filter-btn" 
          :class="{ active: showAll }"
          @click="showAll = !showAll"
        >
          {{ showAll ? t('agora', 'Show all') : t('agora', 'Show unread') }}
        </button>
      </div>
    </div>

    <!-- Feed Items -->
    <div class="feed-items">
      <div
        v-for="inquiry in filteredInquiries"
        :key="inquiry.id"
        class="feed-item"
        :class="{ 
          'is-new': !isRead(inquiry),
          'is-active': activeId === inquiry.id
        }"
        @click="handleClick(inquiry)"
      >
        <!-- Timeline Line -->
        <div class="feed-timeline">
          <div class="timeline-dot" :class="getStatusClass(inquiry)">
            <component :is="getStatusIcon(inquiry)" :size="14" />
          </div>
          <div v-if="!isLast(inquiry)" class="timeline-line"></div>
        </div>

        <!-- Feed Content -->
        <div class="feed-content">
          <div class="feed-header-row">
            <div class="feed-author">
              <NcAvatar
                v-if="inquiry.ownedGroup"
                :display-name="inquiry.ownedGroup"
                :show-user-status="false"
                :size="32"
                class="author-avatar"
              />
              <NcAvatar
                v-else
                :user="inquiry.owner?.id"
                :display-name="inquiry.owner?.displayName"
                :size="32"
                class="author-avatar"
              />
              <div class="author-info">
                <span class="author-name">
                  {{ inquiry.ownedGroup || inquiry.owner?.displayName }}
                </span>
                <span class="feed-time">{{ formatTime(inquiry.status?.created) }}</span>
              </div>
            </div>
            <div class="feed-badges">
              <span class="type-badge" :class="getTypeClass(inquiry.type)">
                <component :is="getTypeIcon(inquiry.type)" :size="12" />
                {{ getTypeLabel(inquiry.type) }}
              </span>
              <span v-if="isNew(inquiry)" class="new-badge">
                {{ t('agora', 'New') }}
              </span>
            </div>
          </div>

          <h3 class="feed-title">{{ inquiry.title }}</h3>
          
          <p v-if="inquiry.description" class="feed-description">
            {{ truncateText(stripHtml(inquiry.description), 150) }}
          </p>

          <div class="feed-meta">
            <div class="meta-item">
              <component :is="Icons.MessageSquare" :size="14" />
              <span>{{ inquiry.status?.countComments || 0 }}</span>
            </div>
            <div class="meta-item">
              <component :is="Icons.Users" :size="14" />
              <span>{{ inquiry.status?.countParticipants || 0 }}</span>
            </div>
            <div class="meta-item support">
              <SupportFeature
                :item="inquiry"
                item-type="inquiry"
                :context="context"
                :show-quorum="true"
                :show-details-on-hover="true"
                :icon-size="16"
                @click.stop
              />
            </div>
            <div v-if="inquiry.configuration?.expire" class="meta-item expiry" :class="getExpiryClass(inquiry)">
              <component :is="Icons.Clock" :size="14" />
              <span>{{ getExpiryText(inquiry) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredInquiries.length === 0" class="empty-state">
        <component :is="Icons.Activity" :size="48" class="empty-icon" />
        <h3>{{ t('agora', 'No activity') }}</h3>
        <p>{{ t('agora', 'There are no recent inquiries to display') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { t } from '@nextcloud/l10n'
import NcAvatar from '@nextcloud/vue/components/NcAvatar'
import { DateTime } from 'luxon'
import { InquiryGeneralIcons as Icons } from '../../utils/icons'
import { getInquiryTypeData } from '../../helpers/modules/InquiryHelper'
import { createInquiryContext } from '../../utils/permissions'
import { SupportFeature } from '../Base'
import type { Inquiry } from '../../Types'

const props = defineProps<{
  inquiries: Inquiry[]
  groupId?: number
}>()

const emit = defineEmits<{
  click: [inquiry: Inquiry]
}>()

const showAll = ref(true)
const activeId = ref<number | null>(null)
const sessionStore = useSessionStore()

const context = computed(() => 
  props.inquiries.length > 0 
    ? createInquiryContext(props.inquiries[0], sessionStore.appSettings)
    : null
)

const filteredInquiries = computed(() => {
  let items = [...props.inquiries]
  if (!showAll.value) {
    items = items.filter(i => !isRead(i))
  }
  return items.sort((a, b) => (b.status?.created || 0) - (a.status?.created || 0))
})

function isRead(inquiry: Inquiry): boolean {
  return inquiry.currentUserStatus?.hasRead || false
}

function isNew(inquiry: Inquiry): boolean {
  return !isRead(inquiry) && (inquiry.status?.created || 0) > Date.now() / 1000 - 86400
}

function isLast(inquiry: Inquiry): boolean {
  const idx = filteredInquiries.value.findIndex(i => i.id === inquiry.id)
  return idx === filteredInquiries.value.length - 1
}

function getStatusClass(inquiry: Inquiry): string {
  const status = inquiry.status?.inquiryStatus || 'draft'
  const classes: Record<string, string> = {
    active: 'status-active',
    closed: 'status-closed',
    draft: 'status-draft',
    waiting_approval: 'status-pending'
  }
  return classes[status] || 'status-default'
}

function getStatusIcon(inquiry: Inquiry) {
  const status = inquiry.status?.inquiryStatus || 'draft'
  const icons: Record<string, any> = {
    active: Icons.CheckCircle,
    closed: Icons.Close,
    draft: Icons.Edit,
    waiting_approval: Icons.Clock
  }
  return icons[status] || Icons.Circle
}

function getTypeClass(type: string): string {
  return `type-${type?.toLowerCase() || 'default'}`
}

function getTypeIcon(type: string) {
  const types = sessionStore.appSettings?.inquiryTypeTab || []
  const data = getInquiryTypeData(type, types)
  return data?.icon || Icons.FolderMultiple
}

function getTypeLabel(type: string): string {
  const types = sessionStore.appSettings?.inquiryTypeTab || []
  const data = getInquiryTypeData(type, types)
  return data?.label || type || 'Unknown'
}

function getExpiryClass(inquiry: Inquiry): string {
  if (!inquiry.configuration?.expire) return ''
  const now = Date.now() / 1000
  const diff = inquiry.configuration.expire - now
  if (diff < 0) return 'expiry-expired'
  if (diff < 86400) return 'expiry-soon'
  if (diff < 259200) return 'expiry-warning'
  return 'expiry-normal'
}

function getExpiryText(inquiry: Inquiry): string {
  if (!inquiry.configuration?.expire) return ''
  const now = Date.now() / 1000
  const diff = inquiry.configuration.expire - now
  if (diff < 0) return t('agora', 'Expired')
  const days = Math.floor(diff / 86400)
  if (days === 0) return t('agora', 'Today')
  if (days === 1) return t('agora', '1 day left')
  return t('agora', '{days} days left', { days })
}

function formatTime(timestamp?: number): string {
  if (!timestamp) return ''
  try {
    return DateTime.fromMillis(timestamp * 1000).toRelative() || ''
  } catch {
    return ''
  }
}

function truncateText(text: string, max: number): string {
  if (!text) return ''
  if (text.length <= max) return text
  return `${text.substring(0, max)  }…`
}

function stripHtml(html: string): string {
  if (!html) return ''
  const div = document.createElement('div')
  div.innerHTML = html
  return div.textContent || div.innerText || ''
}

function handleClick(inquiry: Inquiry) {
  activeId.value = inquiry.id
  emit('click', inquiry)
}
</script>

<style lang="scss" scoped>
.inquiry-feed {
  background: var(--color-main-background);
  border-radius: 12px;
  border: 1px solid var(--color-border);
  overflow: hidden;
}

.feed-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-background-dark);

  .feed-header-left {
    display: flex;
    align-items: center;
    gap: 12px;

    .feed-icon {
      color: var(--color-primary-element);
    }

    h2 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: var(--color-main-text);
    }

    .feed-count {
      font-size: 12px;
      background: var(--color-background-darker);
      padding: 2px 10px;
      border-radius: 12px;
      color: var(--color-text-lighter);
    }
  }

  .filter-btn {
    padding: 6px 14px;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    background: transparent;
    color: var(--color-text-lighter);
    cursor: pointer;
    font-size: 13px;
    transition: all 0.2s;

    &:hover {
      background: var(--color-background-hover);
    }

    &.active {
      background: var(--color-primary-light);
      border-color: var(--color-primary-element);
      color: var(--color-primary-element);
    }
  }
}

.feed-items {
  padding: 12px 0;
  max-height: 600px;
  overflow-y: auto;
}

.feed-item {
  display: flex;
  gap: 16px;
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    background: var(--color-background-hover);
  }

  &.is-new {
    background: rgba(var(--color-primary-rgb), 0.03);

    .feed-title {
      font-weight: 600;
    }
  }

  &.is-active {
    background: var(--color-primary-light);
    border-left: 3px solid var(--color-primary-element);
  }

  .feed-timeline {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 4px;
    flex-shrink: 0;
    width: 28px;

    .timeline-dot {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid var(--color-border);
      background: var(--color-main-background);
      z-index: 1;
      flex-shrink: 0;

      &.status-active {
        border-color: var(--color-success);
        background: var(--color-success-light);
        color: var(--color-success);
      }

      &.status-closed {
        border-color: var(--color-error);
        background: var(--color-error-light);
        color: var(--color-error);
      }

      &.status-draft {
        border-color: var(--color-text-lighter);
        background: var(--color-background-dark);
        color: var(--color-text-lighter);
      }

      &.status-pending {
        border-color: var(--color-warning);
        background: var(--color-warning-light);
        color: var(--color-warning);
      }
    }

    .timeline-line {
      flex: 1;
      width: 2px;
      background: var(--color-border);
      min-height: 20px;
    }
  }

  .feed-content {
    flex: 1;
    min-width: 0;

    .feed-header-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      margin-bottom: 8px;

      .feed-author {
        display: flex;
        align-items: center;
        gap: 10px;

        .author-avatar {
          border: 2px solid var(--color-main-background);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
        }

        .author-info {
          display: flex;
          flex-direction: column;

          .author-name {
            font-size: 14px;
            font-weight: 600;
            color: var(--color-main-text);
          }

          .feed-time {
            font-size: 12px;
            color: var(--color-text-lighter);
          }
        }
      }

      .feed-badges {
        display: flex;
        gap: 8px;
        align-items: center;

        .type-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
          
          &.type-proposal { background: rgba(16, 185, 129, 0.1); color: #10b981; }
          &.type-survey { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
          &.type-poll { background: rgba(139, 92, 246, 0.1); color: #8b5cf6; }
          &.type-discussion { background: rgba(6, 182, 212, 0.1); color: #06b6d4; }
          &.type-question { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
          &.type-default { background: var(--color-background-dark); color: var(--color-text-lighter); }
        }

        .new-badge {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          color: white;
          background: var(--color-primary-element);
          padding: 2px 8px;
          border-radius: 10px;
          letter-spacing: 0.5px;
        }
      }
    }

    .feed-title {
      margin: 0 0 6px 0;
      font-size: 16px;
      font-weight: 500;
      color: var(--color-main-text);
      line-height: 1.3;
    }

    .feed-description {
      margin: 0 0 10px 0;
      font-size: 14px;
      line-height: 1.5;
      color: var(--color-text-lighter);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .feed-meta {
      display: flex;
      gap: 16px;
      align-items: center;
      flex-wrap: wrap;

      .meta-item {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 13px;
        color: var(--color-text-lighter);

        svg {
          color: var(--color-text-maxcontrast);
        }

        &.support {
          :deep(.support-feature) {
            display: flex;
            align-items: center;
            gap: 4px;
          }
        }

        &.expiry {
          &.expiry-expired { color: var(--color-error); }
          &.expiry-soon { color: var(--color-warning); }
          &.expiry-warning { color: #f59e0b; }
          &.expiry-normal { color: var(--color-success); }
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
    color: var(--color-main-text);
  }

  p {
    margin: 0;
    font-size: 14px;
  }
}

@media (max-width: 768px) {
  .feed-item {
    padding: 12px 16px;
    gap: 12px;

    .feed-timeline {
      width: 20px;

      .timeline-dot {
        width: 20px;
        height: 20px;

        svg {
          width: 10px;
          height: 10px;
        }
      }
    }

    .feed-content {
      .feed-header-row {
        flex-wrap: wrap;
      }

      .feed-title {
        font-size: 15px;
      }
    }
  }
}
</style>
