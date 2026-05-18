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
            class="badge-bubble status--inquiry"
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
            class="badge-bubble status--inquiry"
            :title="inquiryStatusLabel"
          >
            <component :is="inquiryStatusIcon" :size="12" class="icon" />
            <span>{{ inquiryStatusLabel }}</span>
          </div>
        </div>

        <div
          v-if="canComment(context)"
          class="badge-bubble"
          :title="
            t('agora', '{count} comments', {
              count: inquiry.status.countComments || 0,
            })
          "
        >
          <component :is="StatusIcons.ForumOutline" :size="12" class="icon" />
            <span>{{ inquiry.status.countComments || 0 }}</span>
        </div>

        <div
          v-if="canSupport(context)"
          class="badge-bubble"
          >
                            <SupportFeature
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
                class="badge-bubble"
                :title="
                        t('agora', '{count} participants', {
                        count: inquiry.status.countParticipants,
                        })
                        "
                >
                <component :is="BadgeIcons.Participated" :size="16" class="icon" />
                <span>{{ inquiry.status.countParticipants }}</span>
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


        <!-- Updated and Expire only when no vote period -->
        <div v-if="!hasVotePeriod && inquiry.configuration.expire" class="metadata-item">
            <component :is="InquiryGeneralIcons.Expiration" :size="12" />
            <span class="metadata-value">{{ timeExpirationRelative }}</span>
        </div>
      </div>

      <div class="actions">
          <slot name="actions" />
      </div>
    </template>

    <!-- Grid Mode -->
    <template v-else>
        <div class="grid-card">
            <!-- Cover Image with User Avatar -->
            <div class="grid-cover-container">
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
            </div>

            <!-- Content -->
            <div class="grid-content" :class="{ 'no-cover': !currentCoverUrl }">
                <!-- First Line: Type + Title + Toggle -->
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
                            <div v-if="inquiry.parentId !== null" class="metadata-item parent-link">
                                <RouterLink
                                        :to="`/inquiry/${inquiry.parentId}`"
                                        >
                                        <component :is="StatusIcons.LinkIcon" :size="16" :title="`id:${inquiry.parentId}`"/>
                                </RouterLink>
                            </div> 

                            <div
                                    v-if="inquiry.type !== 'official' && inquiry.status.countParticipants > 0"
                                    class="metadata-item participated"
                                    :title="
                                            t('agora', '{count} participants', {
                                            count: inquiry.status.countParticipants,
                                            })
                                            "
                                    >
                                    <component :is="BadgeIcons.Participated" :size="14" />
                                    <span>{{ inquiry.status.countParticipants }}</span>
                            </div>

                            <!-- Only show expire when no vote period -->
                            <div v-if="!hasVotePeriod && inquiry.configuration.expire" class="metadata-item">
                                <component :is="InquiryGeneralIcons.Expiration" :size="12" />
                                <span class="metadata-value">{{ timeExpirationRelative }}</span>
                            </div>
                        </div>

                        <div class="right-items">
                            <div
                                    v-if="canComment(context)"
                                    class="metadata-item comments"
                                    :title="
                                            t('agora', '{count} comments', {
                                            count: inquiry.status.countComments || 0,
                                            })
                                            "
                                    >
                                    <component :is="StatusIcons.ForumOutline" :size="14" />
                                    <span>{{ inquiry.status.countComments || 0 }}</span>
                            </div>

                            <SupportFeature
                                    v-if="canSupport(context)"
                                    :item="inquiry"
                                    item-type="inquiry"
                                    :context="context"
                                    :show-quorum="true"
                                    :show-details-on-hover="true"
                                    :icon-size="14"
                                    class="metadata-item supports"
                                    />
                        </div>
                    </div>

                    <!-- Third Line: Dates or Vote Period -->
                    <div class="third-line">
                        <!-- Vote Period Boxes -->
                        <div v-if="hasVotePeriod" class="vote-period-container">
                            <div class="vote-date-box start-date">
                                <component :is="StatusIcons.Calendar" :size="12" />
                                <span class="vote-date-label">{{ t('agora', 'Start support:') }}</span>
                                <span class="vote-date-value">{{ formatVoteDate(inquiry.miscFields.support_start) }}</span>
                            </div>
                            <div class="vote-date-box end-date">
                                <component :is="StatusIcons.Expiration" :size="12" />
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
                                        <component :is="StatusIcons.Updated" :size="12" />
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
                                        <component :is="StatusIcons.Calendar" :size="12" />
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
.inquiry-item {
    &.list-view {
        display: flex;
        column-gap: 0.5rem;
        align-items: center;
        padding: 0.5rem;
        border-radius: 8px;
        border-bottom: 1px solid var(--color-border);
        margin-bottom: 0.25rem;
        transition: all 0.2s ease;

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
                }
            }

            .description_line {
                opacity: 0.7;
                font-size: 0.9rem;
                margin-top: 0.25rem;

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

            .badge-bubble {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                border-radius: 16px;
                padding: 4px 8px;
                font-size: 0.8rem;
                line-height: 1;
                min-height: 32px;
                min-width: 32px;
                transition: all 0.2s ease;

                &.error {
                    background-color: var(--color-error);
                    color: white;
                    border-color: var(--color-error);
                }

                &.warning {
                    background-color: var(--color-warning);
                    color: white;
                    border-color: var(--color-warning);
                }

                &.success {
                    background-color: var(--color-success);
                    color: white;
                    border-color: var(--color-success);
                }

                &.participated {
                    background-color: var(--color-success);
                    color: white;
                    border-color: var(--color-success);
                }

                &.status--inquiry {
                }

                .icon {
                    margin-right: 4px;
                    display: flex;
                    align-items: center;
                }

                // Quorum compact style inside badge
                .quorum-compact {
                    display: inline-flex;
                    align-items: center;
                    gap: 2px;
                    font-size: 0.7rem;
                    color: var(--color-text-maxcontrast);
                    margin-left: 4px;

                    .quorum-target {
                        font-weight: 600;
                        color: var(--color-primary-element);
                    }

                    .quorum-label {
                        opacity: 0.8;
                        margin-left: 2px;
                    }
                }
            }

            .user-bubble__wrapper {
                line-height: normal;
                min-height: 1.6rem;

                &.user-avatar {
                    margin-left: -6px;
                    margin-right: 2px;
                }
            }
        }

        .actions {
            display: flex;
            flex: 0 0 auto;
            justify-content: center;
            align-items: center;
        }
    }

    &.grid-view {
        .grid-card {
            display: flex;
            flex-direction: column;
            height: 100%;
            border: 1px solid var(--color-border);
            border-radius: 12px;
            background-color: var(--color-main-background);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            transition: all 0.3s ease;
            overflow: hidden;
            position: relative;

            &:hover {
                transform: translateY(-4px);
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
                border-color: var(--color-primary-element);
            }
        }

        .grid-cover-container {
            position: relative;
            width: 100%;

            .grid-cover {
                height: 160px;
                overflow: hidden;

                .cover-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: center;
                }
            }

            .user-avatar-top {
                position: absolute;
                top: 12px;
                left: 12px;
                z-index: 2;

                .user-avatar-main {
                    border: 3px solid var(--color-main-background);
                    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
                    background-color: var(--color-main-background);
                }
            }
        }

        .grid-content {
            flex: 1;
            padding: 16px;
            display: flex;
            flex-direction: column;
            gap: 12px;

            &.no-cover {
                padding-top: 60px;

                .user-avatar-top {
                    top: 12px;
                    left: 12px;
                }
            }

            .first-line {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                gap: 12px;

                .type-title {
                    flex: 1;
                    min-width: 0;

                    .inquiry-type {
                        display: flex;
                        align-items: center;
                        gap: 6px;
                        font-size: 12px;
                        font-weight: 600;
                        color: var(--color-text-lighter);
                        margin-bottom: 4px;
                        padding-top: 10px;

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

                    .title-link {
                        text-decoration: none;
                        color: inherit;
                    }

                    .grid-title {
                        font-size: 16px;
                        font-weight: 700;
                        line-height: 1.3;
                        margin: 0;
                        color: var(--color-main-text);
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                    }
                }

                .toggle-view {
                    flex-shrink: 0;
                    margin-left: 8px;
                }
            }

            .description-line {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                gap: 12px;

                .grid-description {
                    font-size: 13px;
                    line-height: 1.4;
                    color: var(--color-text-lighter);
                    margin: 0;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    flex: 1;
                }
            }

            .bottom-section {
                margin-top: auto;
                display: flex;
                flex-direction: column;
                gap: 8px;

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

                    .metadata-item {
                        display: flex;
                        align-items: center;
                        gap: 4px;
                        padding: 4px 8px;
                        border-radius: 6px;
                        font-size: 12px;
                        color: var(--color-text-maxcontrast);
                        background-color: var(--color-background-dark);
                        white-space: nowrap;

                        &.parent-link {
                            background-color: transparent;
                            padding: 2px 4px;
                        }

                        &.participated {
                            background-color: var(--color-success-light);
                            color: var(--color-success);
                        }

                        &.comments,
                        &.supports {
                            cursor: pointer;
                            transition: background-color 0.2s ease;

                            &:hover {
                                background-color: var(--color-background-darker);
                            }
                        }

                        // Quorum compact style inside badge for grid mode
                        .quorum-compact {
                            display: inline-flex;
                            align-items: center;
                            gap: 2px;
                            font-size: 0.7rem;
                            color: var(--color-text-maxcontrast);
                            margin-left: 4px;

                            .quorum-target {
                                font-weight: 600;
                                color: var(--color-primary-element);
                            }

                            .quorum-label {
                                opacity: 0.8;
                                margin-left: 2px;
                            }
                        }
                    }
                }

                .third-line {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 12px;
                    font-size: 11px;
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
                        gap: 4px;
                        padding: 6px 10px;
                        background-color: var(--color-background-dark);
                        border-radius: 6px;
                        font-size: 11px;
                        color: var(--color-text-maxcontrast);
                        flex: 1;

                        &.start-date {
                            justify-content: flex-start;
                        }

                        &.end-date {
                            justify-content: flex-end;
                        }

                        .vote-date-label {
                            opacity: 0.8;
                        }

                        .vote-date-value {
                            font-weight: 500;
                            color: var(--color-main-text);
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
                            gap: 4px;
                            white-space: nowrap;

                            &.last-interaction,
                            &.created {
                                opacity: 0.8;
                            }
                        }
                    }
                }
            }
        }
    }
}

// Responsive styles
@media (max-width: 768px) {
    .inquiry-item.grid-view {
        .grid-card {
            border-radius: 10px;
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
        }

        .grid-content {
            padding: 12px;
            gap: 10px;

            &.no-cover {
                padding-top: 50px;
            }

            .first-line {
                .type-title {
                    .inquiry-type {
                        font-size: 11px;
                    }

                    .grid-title {
                        font-size: 15px;
                    }
                }
            }

            .description-line {
                .grid-description {
                    font-size: 12px;
                }
            }

            .bottom-section {
                .second-line {
                    .metadata-item {
                        font-size: 11px;
                        padding: 3px 6px;
                    }
                }

                .third-line {
                    font-size: 10px;

                    .vote-date-box {
                        font-size: 10px;
                        padding: 3px 6px;
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
