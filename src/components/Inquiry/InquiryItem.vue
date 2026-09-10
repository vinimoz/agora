<!--
	- SPDX-FileCopyrightText: 2018 Nextcloud contributors
	- SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { computed } from 'vue'
import { DateTime } from 'luxon'
import { t } from '@nextcloud/l10n'
import NcAvatar from '@nextcloud/vue/components/NcAvatar'
import NcCounterBubble from '@nextcloud/vue/components/NcCounterBubble'
import { SupportFeature } from '../Base/index.ts'
import {
  canComment,
  canSupport,
  createInquiryContext,
} from '../../utils/permissions.ts'

import { InquiryGeneralIcons, BadgeIcons, StatusIcons } from '../../utils/icons.ts'

import {  type Inquiry } from '../../stores/inquiry'
import { useSessionStore } from '../../stores/session.ts'
import { getInquiryTypeData } from '../../helpers/modules/InquiryHelper.ts'

const sessionStore = useSessionStore()

interface Props {
  inquiry: Inquiry
  noLink?: boolean
  gridView?: boolean
}

const { inquiry, noLink = false, gridView = false } = defineProps<Props>()


// Context for permissions
const context = computed(() => createInquiryContext(inquiry, sessionStore.appSettings))


function htmlToFirstLine(html: string): string {
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = html

  let text = tempDiv.textContent || tempDiv.innerText || ''

  text = text.replace(/\s+/g, ' ').trim()

  const firstLine = text.split(/\r?\n/)[0]

  return firstLine
}

const timeExpirationRelative = computed(() => {
  if (inquiry.configuration.expire) {
    return DateTime.fromMillis(inquiry.configuration.expire * 1000).toRelative()
  }
  return t('agora', 'never')
})

const timeCreatedRelative = computed(
  () => DateTime.fromMillis(inquiry.status.created * 1000).toRelative() as string
)

const safeDescription = computed(() => {
  if (inquiry.status.isArchived) {
    return t('agora', 'Archived {relativeTime}', {
      relativeTime: DateTime.fromMillis(inquiry.status.archivedDate * 1000).toRelative() as string,
    })
  }

  return t('agora', 'Started {relativeTime} from {ownerName}', {
    ownerName: inquiry.owner.displayName,
    relativeTime: timeCreatedRelative.value,
  })
})

const formatDate = (timestamp: number) =>
  DateTime.fromMillis(timestamp * 1000).toLocaleString(DateTime.DATE_SHORT)


const formatVoteDate = (dateString: string, locale: string = navigator.language) => {
  if (!dateString) return ''

  const cleaned = dateString.replace(/^"+|"+$/g, '')

  const date = new Date(cleaned)

  return date.toLocaleDateString(locale)
}

const inquiryStatus = computed(
  () => inquiry.status.inquiryStatus || inquiry.getInquiryStatus?.(inquiry.id)
)

const inquiryStatusIcon = computed(() => {
  const statusItem = sessionStore.appSettings.inquiryStatusTab.find(
    (item) => item.inquiryType === inquiry.type && item.statusKey === inquiry.status.inquiryStatus
  )

  if (!statusItem) {
    return StatusIcons.Draft
  }

  return StatusIcons[statusItem.icon as keyof typeof StatusIcons] || StatusIcons.Draft
})

const inquiryStatusLabel = computed(() => {
  const statusItem = sessionStore.appSettings.inquiryStatusTab.find(
    (item) => item.inquiryType === inquiry.type && item.statusKey === inquiry.status.inquiryStatus
  )

  if (!statusItem) {
    return 'Draft'
  }

  return statusItem.label || 'Draft'
})

const inquiryStatusInfo = computed(() => {
  if (!inquiryStatus.value || !sessionStore.appSettings?.inquiryStatusTab) {
    return null
  }

  return sessionStore.appSettings.inquiryStatusTab.find(
    (status) => status.status_key === inquiryStatus.value
  )
})

// Moderation status computed properties
const moderationStatus = computed(() => inquiry.status.moderationStatus || null)

const isModerationRejected = computed(() => moderationStatus.value === 'rejected')
const isModerationPending = computed(() => moderationStatus.value === 'pending')

// Get moderation status icon
const moderationStatusIcon = computed(() => {
  if (isModerationRejected.value) return StatusIcons.Error
  if (isModerationPending.value) return StatusIcons.Warning
  return null
})

// Get moderation status label
const moderationStatusLabel = computed(() => {
  if (isModerationRejected.value) return t('agora', 'Rejected')
  if (isModerationPending.value) return t('agora', 'Pending Review')
  return null
})

// Get moderation status description
const moderationStatusDescription = computed(() => {
  if (isModerationRejected.value) {
    return inquiry.status.moderationReason 
      ? t('agora', 'Rejected: {reason}', { reason: inquiry.status.moderationReason })
      : t('agora', 'This inquiry has been rejected')
  }
  if (isModerationPending.value) {
    return t('agora', 'This inquiry is pending moderation review')
  }
  return null
})

// Check if we should show moderation banner
const showModerationBanner = computed(() => isModerationRejected.value || isModerationPending.value)

// Get inquiry type data using helper
const inquiryTypeData = computed(() => getInquiryTypeData(inquiry.type, sessionStore.appSettings.inquiryTypeTab || [], inquiry.type))

// Image URL function
function getNextcloudPreviewUrl(fileId: number, x = 1920, y = 1080, autoScale = true) {
  const baseUrl = window.location.origin
  return `${baseUrl}/index.php/core/preview?fileId=${fileId}&x=${x}&y=${y}&a=${autoScale ? 1 : 0}`
}

const currentCoverUrl = computed(() => {
  if (inquiry.coverId) {
    return getNextcloudPreviewUrl(inquiry.coverId)
  }
  return null
})

// Description for grid mode
const gridDescription = computed(() => {
  if (inquiry.description) {
    return htmlToFirstLine(inquiry.description)
  }
  return t('agora', 'No description provided')
})

// Citizen inquiry features
const hasVotePeriod = computed(() => inquiry.miscFields?.support_start && inquiry.miscFields?.support_end)
</script>

<template>
  <div class="inquiry-item" :class="{ 'grid-view': gridView, 'list-view': !gridView }">
    <!-- List Mode -->
    <template v-if="!gridView">
      <div class="item__type" :title="inquiryTypeData.label">
        <component
          :is="inquiryTypeData.icon"
          :title="inquiryTypeData.label"
        />
        {{ inquiryTypeData.label }}
      </div>

      <div v-if="noLink" class="item__title" :class="{ closed: inquiry.status.isExpired }">
        <div class="title" :title="inquiry.title">
          {{ inquiry.title }}
        </div>

        <div class="description_line">
          <component :is="StatusIcons.Lock" :size="16" />
          <div class="description">
            {{
            t('agora', 'No access to this inquiry of {ownerName}', {
                ownerName: inquiry.owner.displayName,
              })
            }}
          </div>
        </div>
      </div>

      <RouterLink
        v-else-if="!inquiry.status.isArchived"
        class="item__title"
        :title="inquiry.description"
        :to="{
          name: 'inquiry',
          params: { id: inquiry.id },
        }"
        :class="{
          closed: inquiry.status.isExpired,
      active: inquiry.id,
        }"
      >
        <div class="title_line">
          <span class="title">
            {{ inquiry.title }}
          </span>
        </div>

        <div class="description_line">
          <span class="description">{{ safeDescription }}</span>
        </div>
      </RouterLink>

      <div v-else class="item__title" :class="{ closed: inquiry.status.isExpired }">
        <div class="title_line">
          <span class="title">
            {{ inquiry.title }}
          </span>
        </div>
        <div class="description_line">
          <span class="description">{{ safeDescription }}</span>
        </div>
      </div>

      <div class="badges">
        <div v-if="inquiry.parentId !== null" class="item__type">
          <RouterLink
            class="underline"
            :to="`/inquiry/${inquiry.parentId}`"
          >
            <component :is="StatusIcons.LinkIcon" :size="20" :title="`id:${inquiry.parentId}`"/>
          </RouterLink>
        </div> 
        
        <div v-if="inquiry.type !== 'official'">
          <div
            v-if="inquiryStatusInfo"
            class="chip chip--status"
            :title="inquiryStatusInfo.description || inquiryStatusInfo.label"
          >
            <component
              :is="inquiryStatusIcon"
              v-if="inquiryStatusInfo.icon"
              :size="12"
              class="icon"
            />
            <span>{{ inquiryStatusInfo.label }}</span>
          </div>
          <div
            v-else-if="inquiry.status.inquiryStatus"
            class="chip chip--status"
            :title="inquiryStatusLabel"
          >
            <component :is="inquiryStatusIcon" :size="12" class="icon" />
            <span>{{ inquiryStatusLabel }}</span>
          </div>
        </div>

        <!-- Moderation Status Badge -->
        <div
          v-if="showModerationBanner"
          class="chip chip--moderation"
          :class="{
            'chip--moderation-pending': isModerationPending,
            'chip--moderation-rejected': isModerationRejected
          }"
          :title="moderationStatusDescription"
        >
          <component
            :is="moderationStatusIcon"
            :size="12"
            class="icon"
          />
          <span>{{ moderationStatusLabel }}</span>
        </div>

        <div
          v-if="canComment(context)"
          class="chip chip--comments"
          :title="
            t('agora', '{count} comments', {
              count: inquiry.status.countComments || 0,
            })
          "
        >
          <component :is="StatusIcons.ForumOutline" :size="12" class="icon" />
          <NcCounterBubble :count="inquiry.status.countComments || 0" :raw="true" />
        </div>

        <div
          v-if="canSupport(context)"
          class="chip chip--supports"
        >
          <SupportFeature
            :key="inquiry.id + '-' + (inquiry.status?.countSupports ?? 0)"
            :item="inquiry"
            item-type="inquiry"
            :context="context"
            :show-quorum="true"
            :show-details-on-hover="true"
            :icon-size="14"
          />
        </div>

        <div
          v-if="inquiry.type !== 'official'"
          class="chip chip--participants"
          :title="
            t('agora', '{count} participants', {
              count: inquiry.status.countParticipants,
            })
          "
        >
          <component :is="BadgeIcons.Participated" :size="16" class="icon" />
          <NcCounterBubble :count="inquiry.status.countParticipants || 0" :raw="true" />
        </div>

        <!-- User info section -->
        <div class="user-info-section">
          <div class="user-avatar">
            <component
              :is="NcAvatar"
              v-if="inquiry.ownedGroup !== ''"
              class="user-avatar"
              :style="{ marginLeft: '-8px', marginRight: '4px' }"
              :display-name="inquiry.ownedGroup"
              :show-user-status="false"
              :size="32"
            />
            <component
              :is="NcAvatar"
              v-else
              :user="inquiry.owner.id"
              :display-name="inquiry.owner.displayName"
              :style="{ marginLeft: '-8px', marginRight: '4px' }"
              class="user-avatar"
              :size="32"
            />
          </div>
        </div>

        <!-- Expire chip -->
        <div v-if="!hasVotePeriod && inquiry.configuration.expire" class="chip chip--expire">
          <component :is="InquiryGeneralIcons.Expiration" :size="12" class="icon" />
          <span class="chip-value">{{ timeExpirationRelative }}</span>
        </div>
      </div>

      <div class="actions">
        <slot name="actions" />
      </div>
    </template>

    <!-- Grid Mode -->
    <template v-else>
      <div class="grid-card">
        <!-- Moderation Banner for Grid View -->
        <div
          v-if="showModerationBanner"
          class="grid-moderation-banner"
          :class="{
            'moderation-pending': isModerationPending,
            'moderation-rejected': isModerationRejected
          }"
          :title="moderationStatusDescription"
        >
          <component
            :is="moderationStatusIcon"
            :size="16"
            class="icon"
          />
          <span>{{ moderationStatusLabel }}</span>
          <span v-if="isModerationRejected && inquiry.status.moderationReason" class="reason">
            {{ inquiry.status.moderationReason }}
          </span>
        </div>

        <!-- Cover Image with User Avatar + Expiration -->
        <div class="grid-cover-container" :class="{ 'no-cover': !currentCoverUrl }">
          <div v-if="currentCoverUrl" class="grid-cover">
            <img
              :src="currentCoverUrl"
              :alt="inquiry.title"
              class="cover-image"
            />
          </div>

          <!-- User Avatar top left -->
          <div class="user-avatar-top">
            <div class="user-avatar">
              <component
                :is="NcAvatar"
                v-if="inquiry.ownedGroup !== ''"
                :display-name="inquiry.ownedGroup"
                class="user-avatar-main"
                :show-user-status="false"
                :size="44"
              />
              <component
                :is="NcAvatar"
                v-else
                :user="inquiry.owner.id"
                :display-name="inquiry.owner.displayName"
                :size="44"
              />
            </div>
          </div>

          <!-- Expiration top-right corner -->
          <div
            v-if="!hasVotePeriod && inquiry.configuration.expire"
            class="expiration-corner"
            :title="t('agora', 'Expires {relativeTime}', { relativeTime: timeExpirationRelative })"
          >
            <component :is="InquiryGeneralIcons.Expiration" :size="14" class="icon" />
            <span>{{ timeExpirationRelative }}</span>
          </div>
        </div>

        <!-- Content -->
        <div class="grid-content" :class="{ 'no-cover': !currentCoverUrl }">
          <!-- Type + Title -->
          <div class="first-line">
            <div class="type-title">
              <div class="inquiry-type">
                <component
                  :is="inquiryTypeData.icon"
                  :title="inquiryTypeData.label"
                  :size="18"
                  class="type-icon"
                />
                <span class="type-label">{{ inquiryTypeData.label }}</span>
              </div>
              <RouterLink
                v-if="!noLink && !inquiry.status.isArchived"
                class="title-link"
                :title="inquiry.description"
                :to="{
                  name: 'inquiry',
                  params: { id: inquiry.id },
                }"
              >
                <h3 class="grid-title">
                  {{ inquiry.title }}
                </h3>
              </RouterLink>
              <h3 v-else class="grid-title">
                {{ inquiry.title }}
              </h3>
            </div>
            <div class="toggle-view">
              <slot name="actions" />
            </div>
          </div>

          <!-- Description -->
          <div class="description-line">
            <p class="grid-description">
              {{ gridDescription }}
            </p>
          </div>

          <!-- Bottom Section: Metadata and Dates -->
          <div class="bottom-section">
            <!-- Second Line: Parent Link + Participated + Comments + Supports -->
            <div class="second-line">
              <div class="left-items">
                <div v-if="inquiry.parentId !== null" class="meta-chip meta-chip--transparent parent-link">
                  <RouterLink :to="`/inquiry/${inquiry.parentId}`">
                    <component :is="StatusIcons.LinkIcon" :size="16" :title="`id:${inquiry.parentId}`"/>
                  </RouterLink>
                </div>

                <div
                  v-if="inquiry.type !== 'official' && inquiry.status.countParticipants > 0"
                  class="meta-chip meta-chip--participants"
                  :title="
                    t('agora', '{count} participants', {
                      count: inquiry.status.countParticipants,
                    })
                  "
                >
                  <component :is="BadgeIcons.Participated" :size="14" class="icon" />
                  <NcCounterBubble :count="inquiry.status.countParticipants || 0" :raw="true" />
                </div>
              </div>

              <div class="right-items">
                <div
                  v-if="canComment(context)"
                  class="meta-chip meta-chip--comments"
                  :title="
                    t('agora', '{count} comments', {
                      count: inquiry.status.countComments || 0,
                    })
                  "
                >
                  <component :is="StatusIcons.ForumOutline" :size="14" class="icon" />
                  <NcCounterBubble :count="inquiry.status.countComments || 0" :raw="true" />
                </div>

                <SupportFeature
                  v-if="canSupport(context)"
                  :item="inquiry"
                  item-type="inquiry"
                  :context="context"
                  :show-quorum="true"
                  :show-details-on-hover="true"
                  :icon-size="14"
                  class="meta-chip meta-chip--supports"
                />
              </div>
            </div>

            <!-- Third Line: Dates or Vote Period -->
            <div class="third-line">
              <!-- Vote Period Boxes -->
              <div v-if="hasVotePeriod" class="vote-period-container">
                <div class="vote-date-box start-date">
                  <component :is="StatusIcons.Calendar" :size="12" class="icon" />
                  <span class="vote-date-label">{{ t('agora', 'Start support:') }}</span>
                  <span class="vote-date-value">{{ formatVoteDate(inquiry.miscFields.support_start) }}</span>
                </div>
                <div class="vote-date-box end-date">
                  <component :is="StatusIcons.Expiration" :size="12" class="icon" />
                  <span class="vote-date-label">{{ t('agora', 'End support:') }}</span>
                  <span class="vote-date-value">{{ formatVoteDate(inquiry.miscFields.support_end) }}</span>
                </div>
              </div>

              <!-- Regular Dates when no vote period -->
              <template v-else>
                <div class="started-info">
                  {{ safeDescription }}
                </div>
                <div class="dates">
                  <div
                    v-if="inquiry.status.lastInteraction"
                    class="date-item last-interaction"
                    :title="
                      t('agora', 'Last interaction on {date}', {
                        date: formatDate(inquiry.status.lastInteraction),
                      })
                    "
                  >
                    <component :is="StatusIcons.Updated" :size="12" class="icon" />
                    <span>{{ formatDate(inquiry.status.lastInteraction) }}</span>
                  </div>

                  <div
                    class="date-item created"
                    :title="
                      t('agora', 'Created on {date}', {
                        date: formatDate(inquiry.status.created),
                      })
                    "
                  >
                    <component :is="StatusIcons.Calendar" :size="12" class="icon" />
                    <span>{{ formatDate(inquiry.status.created) }}</span>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
// Import color module for modern color functions
@use 'sass:color';

/* =========================================================
   Design tokens
   ========================================================= */
$chip-bg: #ffffff;
$chip-border: var(--color-border);
$chip-radius: 999px;
$chip-padding: 5px 10px;
$chip-gap: 6px;
$chip-font-size: 0.78rem;
$chip-min-height: 30px;

$chip-shadow: 0 1px 2px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04);
$chip-shadow-hover: 0 2px 6px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.06);

$transition-fast: 0.18s ease;
$transition-base: 0.25s ease;

.inquiry-item {
    /* =========================================================
       Shared chip primitive
       ========================================================= */
    .chip,
    .meta-chip {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: $chip-gap;
        padding: $chip-padding;
        border-radius: $chip-radius;
        font-size: $chip-font-size;
        line-height: 1;
        min-height: $chip-min-height;
        white-space: nowrap;
        color: var(--color-main-text);
        background-color: $chip-bg;
        border: 1px solid $chip-border;
        box-shadow: $chip-shadow;
        transition: box-shadow $transition-fast, transform $transition-fast,
                    background-color $transition-fast, border-color $transition-fast;

        .icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            color: var(--color-text-maxcontrast);
            flex-shrink: 0;
        }

        .chip-value {
            font-weight: 500;
        }

        :deep(.counter-bubble__counter),
        :deep(.counter-bubble) {
            background: transparent !important;
            color: var(--color-main-text) !important;
            font-weight: 600;
            font-size: $chip-font-size;
            min-width: auto;
            height: auto;
            padding: 0;
            margin: 0;
        }

        :deep(.support-feature-wrapper),
        :deep(.support-feature) {
            display: inline-flex;
            align-items: center;
            gap: $chip-gap;
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
            margin: 0 !important;
            min-height: auto;
        }

        :deep(.quorum-compact) {
            display: inline-flex;
            align-items: center;
            gap: 2px;
            font-size: 0.68rem;
            color: var(--color-text-maxcontrast);
            margin-left: 4px;

            .quorum-target {
                font-weight: 700;
                color: var(--color-primary-element);
            }

            .quorum-label {
                opacity: 0.75;
                margin-left: 2px;
            }
        }

        &--comments,
        &--supports,
        &--expire,
        &--participants {
            cursor: default;
        }

        &--comments:hover,
        &--supports:hover {
            box-shadow: $chip-shadow-hover;
            transform: translateY(-1px);
        }

        &--participants {
            .icon {
                color: var(--color-primary-element);
            }
        }

        &--expire {
            .icon {
                color: var(--color-warning);
            }
        }

        &--status {
            background-color: var(--color-primary-element-light, #e8f0fe);
            border-color: transparent;

            .icon {
                color: var(--color-primary-element);
            }
        }

        &--transparent {
            background-color: transparent;
            border-color: transparent;
            box-shadow: none;
            padding: 0;
            min-height: auto;
        }

        &--moderation-pending {
            background-color: #fff7e6;
            border-color: #ffd591;

            .icon,
            .chip-value {
                color: #d46b08;
            }
        }

        &--moderation-rejected {
            background-color: #fff1f0;
            border-color: #ffa39e;

            .icon,
            .chip-value {
                color: #cf1322;
            }
        }
    }

    /* =========================================================
       LIST VIEW
       ========================================================= */
    &.list-view {
        display: flex;
        column-gap: 0.75rem;
        align-items: center;
        padding: 0.65rem 0.75rem;
        border-radius: 10px;
        border-bottom: 1px solid var(--color-border);
        margin-bottom: 0.25rem;
        transition: background-color $transition-fast, box-shadow $transition-fast;

        &:hover {
            background-color: var(--color-background-hover);
        }

        &.active {
            background-color: var(--color-primary-element-light);
        }

        .item__type {
            flex: 0 0 2.5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 4px;
            color: var(--color-text-maxcontrast);
        }

        .item__title {
            flex: 1;
            min-width: 0;
            overflow: hidden;

            .title_line,
            .description_line {
                display: flex;
                gap: 0.5rem;
                align-items: center;

                .title,
                .description {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .title {
                    font-weight: 600;
                    color: var(--color-main-text);
                    font-size: 0.95rem;
                }
            }

            .description_line {
                opacity: 0.7;
                font-size: 0.85rem;
                margin-top: 0.2rem;

                .description {
                    flex: 1;
                }
            }
        }

        .badges {
            display: flex;
            flex-wrap: wrap;
            gap: 0.4rem;
            align-items: center;
            justify-content: flex-end;

            .user-info-section {
                display: inline-flex;
                align-items: center;
            }
        }

        .actions {
            display: flex;
            flex: 0 0 auto;
            justify-content: center;
            align-items: center;
        }
    }

    /* =========================================================
       GRID VIEW
       ========================================================= */
    &.grid-view {
        .grid-card {
            display: flex;
            flex-direction: column;
            height: 100%;
            border: 1px solid var(--color-border);
            border-radius: 14px;
            background-color: var(--color-main-background);
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 16px rgba(0, 0, 0, 0.05);
            transition: transform $transition-base, box-shadow $transition-base,
                        border-color $transition-base;
            overflow: hidden;
            position: relative;

            &:hover {
                transform: translateY(-3px);
                box-shadow: 0 6px 20px rgba(0, 0, 0, 0.09), 0 10px 30px rgba(0, 0, 0, 0.06);
                border-color: var(--color-primary-element-light, #c7d8f7);
            }
        }

        /* --------- Moderation banner --------- */
        .grid-moderation-banner {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px 16px;
            font-size: 13px;
            font-weight: 500;
            z-index: 3;
            position: relative;

            &.moderation-pending {
                background: linear-gradient(135deg, #fff7e6, #ffe7ba);
                color: #ad4e00;
                border-bottom: 1px solid #ffd591;
            }

            &.moderation-rejected {
                background: linear-gradient(135deg, #fff1f0, #ffccc7);
                color: #a8071a;
                border-bottom: 1px solid #ffa39e;
            }

            .icon {
                flex-shrink: 0;
            }

            .reason {
                font-weight: 500;
                opacity: 0.9;
                margin-left: 4px;
                font-size: 12px;
                background: rgba(255, 255, 255, 0.6);
                padding: 2px 8px;
                border-radius: 10px;
            }
        }

        /* --------- Cover + overlays --------- */
        .grid-cover-container {
            position: relative;
            width: 100%;

            .grid-cover {
                height: 170px;
                overflow: hidden;
                background-color: var(--color-background-dark);

                .cover-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: center;
                    transition: transform 0.5s ease;
                }
            }

            .user-avatar-top {
                position: absolute;
                top: 12px;
                left: 12px;
                z-index: 2;

                .user-avatar-main {
                    border: 3px solid var(--color-main-background);
                    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.25);
                    background-color: var(--color-main-background);
                }
            }

            /* Expiration pill top-right (frosted white) */
            .expiration-corner {
                position: absolute;
                top: 12px;
                right: 12px;
                z-index: 3;

                display: inline-flex;
                align-items: center;
                gap: 6px;

                padding: 5px 10px;
                border-radius: $chip-radius;

                font-size: 0.75rem;
                font-weight: 600;
                line-height: 1;
                white-space: nowrap;

                color: var(--color-main-text);
                background: rgba(255, 255, 255, 0.92);
                border: 1px solid rgba(255, 255, 255, 0.6);
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
                backdrop-filter: blur(8px);
                -webkit-backdrop-filter: blur(8px);

                .icon {
                    color: var(--color-warning);
                }
            }

            /* When there is no cover image, add a subtle inset area so the
               avatar / expire pill still look intentional at the top */
            &.no-cover {
                min-height: 88px;
                background: linear-gradient(
                    135deg,
                    var(--color-background-hover) 0%,
                    var(--color-background-dark) 100%
                );

                .user-avatar-top {
                    top: 14px;
                    left: 14px;
                }

                .expiration-corner {
                    top: 14px;
                    right: 14px;
                    background: $chip-bg;
                    border-color: $chip-border;
                    box-shadow: $chip-shadow;
                    backdrop-filter: none;
                    -webkit-backdrop-filter: none;
                }
            }
        }

        /* --------- Content (stacks under cover) --------- */
        .grid-content {
            flex: 1;
            padding: 18px 18px 16px;
            display: flex;
            flex-direction: column;
            gap: 12px;

            .first-line {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                gap: 12px;

                .type-title {
                    flex: 1;
                    min-width: 0;

                    /* Icon + label on the top row */
                    .inquiry-type {
                        display: flex;
                        align-items: center;
                        gap: 6px;
                        font-size: 11px;
                        font-weight: 700;
                        letter-spacing: 0.04em;
                        text-transform: uppercase;
                        color: var(--color-text-maxcontrast);
                        margin-bottom: 6px;

                        .type-icon {
                            flex-shrink: 0;
                            color: var(--color-primary-element);
                        }

                        .type-label {
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }
                    }

                    /* Title underneath the type row */
                    .title-link {
                        text-decoration: none;
                        color: inherit;

                        &:hover .grid-title {
                            color: var(--color-primary-element);
                        }
                    }

                    .grid-title {
                        font-size: 1.05rem;
                        font-weight: 700;
                        line-height: 1.35;
                        margin: 0;
                        color: var(--color-main-text);
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                        transition: color $transition-fast;
                    }
                }

                .toggle-view {
                    flex-shrink: 0;
                    margin-left: 8px;
                }
            }

            /* Description under the title */
            .description-line {
                .grid-description {
                    font-size: 0.85rem;
                    line-height: 1.5;
                    color: var(--color-text-maxcontrast);
                    margin: 0;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            }

            .bottom-section {
                margin-top: auto;
                display: flex;
                flex-direction: column;
                gap: 10px;
                padding-top: 10px;
                border-top: 1px solid var(--color-border);

                .second-line {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 12px;

                    .left-items,
                    .right-items {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    }

                    .meta-chip {
                        font-size: 0.72rem;
                        min-height: 28px;
                        padding: 4px 9px;
                    }
                }

                .third-line {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 12px;
                    font-size: 0.72rem;
                    color: var(--color-text-maxcontrast);
                    width: 100%;

                    .vote-period-container {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        width: 100%;
                        gap: 8px;
                    }

                    .vote-date-box {
                        display: flex;
                        align-items: center;
                        gap: 6px;
                        padding: 5px 9px;
                        background-color: $chip-bg;
                        border: 1px solid $chip-border;
                        border-radius: $chip-radius;
                        font-size: 0.72rem;
                        color: var(--color-main-text);
                        box-shadow: $chip-shadow;
                        flex: 1;
                        min-width: 0;

                        .icon {
                            color: var(--color-text-maxcontrast);
                            flex-shrink: 0;
                        }

                        &.start-date {
                            justify-content: flex-start;

                            .icon {
                                color: var(--color-primary-element);
                            }
                        }

                        &.end-date {
                            justify-content: flex-end;

                            .icon {
                                color: var(--color-warning);
                            }
                        }

                        .vote-date-label {
                            opacity: 0.75;
                            white-space: nowrap;
                        }

                        .vote-date-value {
                            font-weight: 600;
                            color: var(--color-main-text);
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }
                    }

                    .started-info {
                        flex: 1;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }

                    .dates {
                        display: flex;
                        align-items: center;
                        gap: 12px;
                        flex-shrink: 0;

                        .date-item {
                            display: flex;
                            align-items: center;
                            gap: 5px;
                            white-space: nowrap;

                            .icon {
                                color: var(--color-text-maxcontrast);
                            }

                            &.last-interaction,
                            &.created {
                                opacity: 0.85;
                            }
                        }
                    }
                }
            }
        }
    }
}

/* =========================================================
   Responsive
   ========================================================= */
@media (max-width: 768px) {
    .inquiry-item.grid-view {
        .grid-card {
            border-radius: 12px;
        }

        .grid-moderation-banner {
            padding: 8px 12px;
            font-size: 12px;
            flex-wrap: wrap;

            .reason {
                width: 100%;
                margin-left: 0;
                margin-top: 4px;
            }
        }

        .grid-cover-container {
            .grid-cover {
                height: 140px;
            }

            .user-avatar-top {
                top: 10px;
                left: 10px;

                .user-avatar-main {
                    width: 40px;
                    height: 40px;
                }
            }

            .expiration-corner {
                top: 10px;
                right: 10px;
                font-size: 0.7rem;
                padding: 4px 8px;
            }

            &.no-cover {
                min-height: 76px;
            }
        }

        .grid-content {
            padding: 14px;
            gap: 10px;

            .first-line {
                .type-title {
                    .inquiry-type {
                        font-size: 10px;
                    }

                    .grid-title {
                        font-size: 1rem;
                    }
                }
            }

            .description-line {
                .grid-description {
                    font-size: 0.8rem;
                }
            }

            .bottom-section {
                .second-line {
                    .meta-chip {
                        font-size: 0.68rem;
                        padding: 3px 7px;
                        min-height: 26px;
                    }
                }

                .third-line {
                    font-size: 0.68rem;

                    .vote-date-box {
                        font-size: 0.68rem;
                        padding: 4px 7px;
                    }

                    .dates {
                        gap: 8px;
                    }
                }
            }
        }
    }
}
</style>
