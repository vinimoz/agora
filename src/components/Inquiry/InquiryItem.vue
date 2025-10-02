<!--
	- SPDX-FileCopyrightText: 2018 Nextcloud contributors
	- SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { computed } from 'vue'
import { showSuccess } from '@nextcloud/dialogs'
import { DateTime } from 'luxon'
import { t } from '@nextcloud/l10n'
import NcAvatar from '@nextcloud/vue/components/NcAvatar'
import { ThumbIcon } from '../AppIcons'
import { useSupportsStore } from '../../stores/supports'
import {
  canComment,
  canSupport,
  createPermissionContextForContent,
  ContentType,
} from '../../utils/permissions.ts'

import { InquiryTypesUI, BadgeIcons, StatusIcons } from '../../utils/icons.ts'

import { useInquiryStore, Inquiry } from '../../stores/inquiry'
import { useInquiriesStore } from '../../stores/inquiries'
import { usePreferencesStore } from '../../stores/preferences.ts'
import { useSessionStore } from '../../stores/session.ts'


const inquiryStore = useInquiryStore()
const inquiriesStore = useInquiriesStore()
const preferencesStore = usePreferencesStore()
const sessionStore = useSessionStore()
const supportsStore = useSupportsStore()

interface Props {
  inquiry: Inquiry
  noLink?: boolean
  gridView?: boolean
}

const { inquiry, noLink = false, gridView = false } = defineProps<Props>()

const context = computed(() =>
  createPermissionContextForContent(
    ContentType.Inquiry,
    inquiry.owner.id,
    inquiry.configuration.access,
    inquiry.status.isLocked,
    inquiry.status.isExpired,
    inquiry.status.deletionDate > 0,
    inquiry.status.isArchived,
    inquiry.inquiryGroups.length > 0,
    inquiry.inquiryGroups,
    inquiry.type
  )
)

const onToggleSupport = async () => {
  supportsStore.toggleSupport(inquiry.id, sessionStore.currentUser.id, inquiryStore, inquiriesStore)
  if (inquiry.currentUserStatus.hasSupported) {
    showSuccess(t('agora', 'Inquiry supported, thanks for her !'), { timeout: 2000 })
  } else {
    showSuccess(t('agora', 'Inquiry support removed !'), { timeout: 2000 })
  }
}

function htmlToFirstLine(html) {
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = html

  let text = tempDiv.textContent || tempDiv.innerText || ''

  text = text.replace(/\s+/g, ' ').trim()

  const firstLine = text.split(/\r?\n/)[0]

  return firstLine
}

const closeToClosing = computed(
  () =>
    !inquiry.status.isExpired &&
    inquiry.configuration.expire &&
    DateTime.fromMillis(inquiry.configuration.expire * 1000).diffNow('hours').hours < 36
)

const timeExpirationRelative = computed(() => {
  if (inquiry.configuration.expire) {
    return DateTime.fromMillis(inquiry.configuration.expire * 1000).toRelative()
  }
  return t('agora', 'never')
})

const expiryClass = computed(() => {
  if (inquiry.status.isExpired) {
    return 'error'
  }

  if (inquiry.configuration.expire && closeToClosing.value) {
    return 'warning'
  }

  if (inquiry.configuration.expire && !inquiry.status.isExpired) {
    return 'success'
  }

  return 'success'
})

const timeCreatedRelative = computed(
  () => DateTime.fromMillis(inquiry.status.created * 1000).toRelative() as string
)

const safeDescription = computed(() => {
  if (preferencesStore.user.verboseInquiriesList) {
    if (inquiry.description) {
      return htmlToFirstLine(inquiry.description)
    }
    return t('agora', 'No description provided')
  }

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

const moderationStatus = computed(
  () => inquiry.moderationStatus || inquiryStore.getInquiryModerationStatus?.(inquiry.id)
)

const moderationStatusIcon = computed(() => {
  const statusItem = sessionStore.appSettings.moderationStatusTab.find(
    (item) => item.inquiryType === inquiry.type && item.statusKey === inquiry.moderationStatus
  )

  if (!statusItem) {
    return StatusIcons.Draft
  }

  return StatusIcons[statusItem.icon] || StatusIcons.Draft
})

const moderationStatusLabel = computed(() => {
  const statusItem = sessionStore.appSettings.moderationStatusTab.find(
    (item) => item.inquiryType === inquiry.type && item.statusKey === inquiry.moderationStatus
  )

  if (!statusItem) {
    return 'Draft'
  }

  return statusItem.label || 'Draft'
})

const moderationStatusInfo = computed(() => {
  if (!moderationStatus.value || !sessionStore.appSettings?.moderationStatusTab) {
    return null
  }

  return sessionStore.appSettings.moderationStatusTab.find(
    (status) => status.status_key === moderationStatus.value
  )
})
</script>

<template>
  <div class="inquiry-item" :class="{ 'grid-view': gridView, 'list-view': !gridView }">
    <!-- Mode liste -->
    <template v-if="!gridView">
      <div class="item__type" :title="inquiry.type">
	      <component
			      :is="InquiryTypesUI[inquiry.type].icon"
			      :title="InquiryTypesUI[inquiry.type].label"
			      />
      </div>

      <div v-if="noLink" class="item__title" :class="{ closed: inquiry.status.isExpired }">
	      <div class="title" :title="inquiry.title">
		      {{ inquiry.title }}
	      </div>

	      <div class="description_line">
		      <component :is="StatusIcons.Lock" :size="16" />
		      <div class="description">
			      {{
			      t('agora', 'No access to this inquiry of {ownerName}.', {
			      ownerName: inquiry.owner.displayName,
			      })
			      }}
		      </div>
	      </div>
      </div>

      <RouterLink
		      v-else
		      class="item__title"
		      :title="inquiry.description"
		      :to="{
			   name: 'inquiry',
			   params: { id: inquiry.id },
			   }"
		      :class="{
			      closed: inquiry.status.isExpired,
			      active: inquiry.id === inquiryStore.id,
			      }"
		      >
		      <div class="title_line">
			      <span class="title">
				      {{ inquiry.title }}
			      </span>
		      </div>

		      <div class="description_line">
			      <component
					      :is="BadgeIcons.archived"
					      v-if="!preferencesStore.user.verboseInquiriesList && inquiry.status.isArchived"
					      :title="t('agora', 'Archived inquiry')"
					      :size="16"
					      />
			      <component
					      :is="StatusIcons.LockOpen"
					      v-else-if="
							 !preferencesStore.user.verboseInquiriesList && inquiry.configuration.access === 'open'
							 "
					      :title="t('agora', 'Openly accessible inquiry')"
					      :size="16"
					      />
			      <component
					      :is="StatusIcons.Lock"
					      v-else-if="
							 !preferencesStore.user.verboseInquiriesList &&
							 inquiry.configuration.access === 'private'
							 "
					      :title="t('agora', 'Private inquiry')"
					      :size="16"
					      />
			      <span class="description">{{ safeDescription }}</span>
		      </div>
      </RouterLink>

      <div class="badges">
      		<div v-if="inquiry.parentId!==0" class="item__type">
	     			 <RouterLink
			     		 class="underline"
			      		:to="`/inquiry/${inquiry.parentId}`"
			     	 >
	      				<component :is="StatusIcons.LinkIcon" :size="20" :title="`id:inquiry.parentId`"/>
	      			</RouterLink>
      </div> 
	      <div v-if="inquiry.type !== 'official'">
		      <div
				      v-if="moderationStatusInfo"
				      class="badge-bubble status--moderation"
				      :title="moderationStatusInfo.description || moderationStatusInfo.label"
				      >
				      <component
						      :is="moderationStatusIcon"
						      v-if="moderationStatusInfo.icon"
						      :size="12"
						      class="icon"
						      />
				      <!-- {{ inquiry.moderationStatus }}</span> -->
		      </div>
		      <div
				      v-else-if="inquiry.moderationStatus"
				      class="badge-bubble status--moderation"
				      :title="moderationStatusLabel"
				      >
				      <component :is="moderationStatusIcon" :size="12" class="icon" />
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
			      :title="
				      t('agora', '{count} supports', {
				      count: inquiry.status.countSupports || 0,
				      })
				      "
			      @click="onToggleSupport"
			      >
			      <ThumbIcon :supported="inquiry.currentUserStatus.hasSupported" :size="22" />
			      <span>{{ inquiry.status.countSupports || 0 }}</span>
	      </div>

	      <div
			      v-if="inquiry.type !== 'official' && preferencesStore.user.verboseInquiriesList"
			      class="badge-bubble"
			      :title="
				      t('agora', '{count} participants', {
				      count: inquiry.status.countParticipants,
				      })
				      "
			      >
			      <component :is="BadgeIcons.participated" :size="16" class="icon" />
			      <span>{{ inquiry.status.countParticipants }}</span>
	      </div>

	      <div
			      v-if="
				    preferencesStore.user.verboseInquiriesList &&
				    !inquiry.status.isArchived &&
				    inquiry.configuration.access === 'private'
				    "
			      class="badge-bubble"
			      :title="t('agora', 'Private inquiry, only invited participants have access')"
			      >
			      <component :is="StatusIcons.Lock" :size="16" class="icon" />
	      </div>

		      <div
				      v-if="
					    preferencesStore.user.verboseInquiriesList &&
					    !inquiry.status.isArchived &&
					    inquiry.configuration.access === 'open'
					    "
				      class="badge-bubble"
				      :title="t('agora', 'Open inquiry, accessible to all users of this instance')"
				      >
				      <component :is="StatusIcons.LockOpen" :size="16" class="icon" />
		      </div>

			      <div
					      v-if="preferencesStore.user.verboseInquiriesList && inquiry.status.isArchived"
					      class="badge-bubble"
					      :title="t('agora', 'Archived inquiry')"
					      >
					      <component :is="BadgeIcons.archived" :size="16" class="icon" />
			      </div>

				      <div
						      v-if="preferencesStore.user.verboseInquiriesList && inquiry.countParticipants"
						      class="badge-bubble participated"
						      :title="t('agora', 'This inquiry get participation')"
						      >
						      <component :is="StatusIcons.AccountCheck" :size="16" class="icon" />
				      </div>

					      <NcAvatar
							      v-if="preferencesStore.user.verboseInquiriesList"
							      :user="inquiry.owner.id"
							      class="user-avatar"
							      :style="{ marginLeft: '-8px', marginRight: '4px' }"
							      :show-name="false"
							      :size="32"
							      />

					      <div
							      v-if="inquiry.configuration.expire"
							      class="badge-bubble"
							      :class="expiryClass"
							      :title="t('agora', 'Expiration')"
							      >
							      <component
									      :is="inquiry.status.isExpired ? BadgeIcons.closed : BadgeIcons.expiration"
									      :size="16"
									      class="icon"
									      />
							      <span>{{ timeExpirationRelative }}</span>
					      </div>
      </div>

      <div class="actions">
	      <slot name="actions" />
      </div>
    </template>

    <template v-else>
	    <div class="grid-card">
		    <div class="grid-header">
			    <div class="header-left">
				    <div class="type-icon">
					    <component
							    :is="InquiryTypesUI[inquiry.type].icon"
							    :title="InquiryTypesUI[inquiry.type].label"
							    :size="18"
							    />
				    </div>
				    <div v-if="inquiry.type !== 'official'">
					    <div
							    v-if="moderationStatusInfo"
							    class="status-badge status--moderation"
							    :title="moderationStatusInfo.description || moderationStatusInfo.label"
							    >
							    <component :is="moderationStatusIcon" v-if="moderationStatusInfo.icon" :size="12" />
							    <!-- {{ inquiry.moderationStatus }}</span> -->
					    </div>
					    <div
							    v-else-if="inquiry.moderationStatus"
							    class="status-badge status--moderation"
							    :title="moderationStatusLabel"
							    >
							    <component :is="moderationStatusIcon" :size="12" />
							    <!-- {{ inquiry.moderationStatus }}</span> -->
					    </div>
				    </div>
				    <div
						    v-if="
							  preferencesStore.user.verboseInquiriesList &&
							  !inquiry.status.isArchived &&
							  inquiry.configuration.access === 'private'
							  "
						    class="badge-bubble"
						    :title="t('agora', 'Private inquiry, only invited participants have access')"
						    >
						    <component :is="StatusIcons.Lock" :size="16" class="icon" />
				    </div>

					    <div
							    v-if="
								  preferencesStore.user.verboseInquiriesList &&
								  !inquiry.status.isArchived &&
								  inquiry.configuration.access === 'open'
								  "
							    class="badge-bubble"
							    :title="t('agora', 'Open inquiry, accessible to all users of this instance')"
							    >
							    <component :is="StatusIcons.LockOpen" :size="16" class="icon" />
					    </div>

						    <div
								    v-if="preferencesStore.user.verboseInquiriesList && inquiry.status.isArchived"
								    class="badge-bubble"
								    :title="t('agora', 'Archived inquiry')"
								    >
								    <component :is="BadgeIcons.archived" :size="16" class="icon" />
						    </div>
			    </div>
			    <div class="header-right">
				    <NcAvatar
						    :user="inquiry.owner.id"
						    :size="32"
						    class="user-icon"
						    :style="{ marginLeft: '-8px' }"
						    />
			    </div>
		    </div>

		    <RouterLink
				    v-if="!noLink"
				    class="grid-content"
				    :title="inquiry.description"
				    :to="{
					 name: 'inquiry',
					 params: { id: inquiry.id },
					 }"
				    >
				    <h3 class="grid-title">
					    {{ inquiry.title }}
				    </h3>
		    <p class="grid-description">
		    {{ safeDescription }}
		    </p>
		    </RouterLink>
		    <div v-else class="grid-content">
			    <h3 class="grid-title">
				    {{ inquiry.title }}
			    </h3>
			    <p class="grid-description">
			    {{
			    t('agora', 'No access to this inquiry of {ownerName}.', {
			    ownerName: inquiry.owner.displayName,
			    })
			    }}
			    </p>
		    </div>

		    <div class="grid-metadata">
			    <div v-if="inquiry.parentId!==0" class="metadata-item">
				    <RouterLink
						    class="underline"
						    :to="`/inquiry/${inquiry.parentId}`"
						    >
						    <component :is="StatusIcons.LinkIcon" :size="20" :title="`id:inquiry.parentId`"/>
				    </RouterLink>
			    </div> 
			    <div
					    v-if="inquiry.type !== 'official' && inquiry.status.countParticipants > 0"
					    class="metadata-item"
					    :title="
						    t('agora', '{count} participants', {
						    count: inquiry.status.countParticipants,
						    })
						    "
					    >
					    <component :is="BadgeIcons.participated" :size="16" />
					    <span>{{ inquiry.status.countParticipants }}</span>
			    </div>

			    <div
					    v-if="canComment(context)"
					    class="metadata-item"
					    :title="
						    t('agora', '{count} comments', {
						    count: inquiry.status.countComments || 0,
						    })
						    "
					    >
					    <component :is="StatusIcons.ForumOutline" :size="16" />
					    <span>{{ inquiry.status.countComments || 0 }}</span>
			    </div>

			    <div
					    v-if="canSupport(context)"
					    class="metadata-item"
					    :title="
						    t('agora', '{count} supports', {
						    count: inquiry.status.countSupports || 0,
						    })
						    "
					    @click="onToggleSupport"
					    >
					    <ThumbIcon :supported="inquiry.currentUserStatus.hasSupported" :size="22" />
					    <span>{{ inquiry.status.countSupports || 0 }}</span>
			    </div>
			    <div class="metadata-item-time">
				    <div
						    class="metadata-item"
						    :title="
							    t('agora', 'Created on {date}', {
							    date: formatDate(inquiry.status.created),
							    })
							    "
						    >
						    <component :is="StatusIcons.Calendar" :size="16" />
						    <span class="date-label">
							    <span class="date-value">{{ formatDate(inquiry.status.created) }}</span>
						    </span>
				    </div>

				    <div
						    v-if="inquiry.status.lastInteraction"
						    class="metadata-item"
						    :title="
							    t('agora', 'Last interaction on {date}', {
							    date: formatDate(inquiry.status.lastInteraction),
							    })
							    "
						    >
						    <component :is="StatusIcons.Updated" :size="16" />
						    <span class="date-label">
							    <span class="date-value">{{ formatDate(inquiry.status.lastInteraction) }}</span>
						    </span>
				    </div>
			    </div>
		    </div>

		    <div class="grid-actions">
			    <slot name="actions" />
		    </div>
	    </div>
    </template>
  </div>
</template>

<style lang="scss">
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

				&.status--moderation {
				}

				.icon {
					margin-right: 0;
					display: flex;
					align-items: center;
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
			padding: 12px;
			border: 1px solid var(--color-border);
			border-radius: 8px;
			background-color: var(--color-main-background);
			box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
			transition: all 0.2s ease;

			&:hover {
				transform: translateY(-2px);
				box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
				border-color: var(--color-primary-element);
			}
		}

		.grid-header {
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			margin-bottom: 12px;
			padding: 0 4px;
			min-height: 28px;

			.header-left {
				display: flex;
				align-items: center;
				gap: 6px;
				flex-wrap: wrap;
				flex: 1;

				.type-icon {
					display: flex;
					align-items: center;
					justify-content: center;
					color: var(--color-text-lighter);
					flex-shrink: 0;
				}

				.status-badge {
					display: flex;
					align-items: center;
					gap: 4px;
					padding: 3px 8px;
					border-radius: 12px;
					font-size: 11px;
					font-weight: 600;
					white-space: nowrap;
					flex-shrink: 0;

					&.status--open {
						background-color: var(--color-success-light);
						color: var(--color-success);
					}

					&.status--closed {
						background-color: var(--color-error-light);
						color: var(--color-error);
					}

					&.status--moderation {
					}
				}
			}

			.header-right {
				flex-shrink: 0;
				margin-left: 8px;
				.user-icon {
					width: 32px;
					height: 32px;
					flex-shrink: 0;
					margin-left: -8px;
				}
			}
		}

		.grid-content {
			flex: 1;
			margin-bottom: 12px;
			text-decoration: none;
			color: inherit;

			.grid-title {
				font-size: 15px;
				font-weight: 600;
				line-height: 1.4;
				margin: 0 0 8px 0;
				color: var(--color-main-text);
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				overflow: hidden;
			}

			.grid-description {
				font-size: 13px;
				line-height: 1.5;
				color: var(--color-text-lighter);
				margin: 0;
				display: -webkit-box;
				-webkit-line-clamp: 3;
				-webkit-box-orient: vertical;
				overflow: hidden;
			}
		}

		.grid-metadata {
			display: flex;
			flex-wrap: wrap;
			gap: 12px;
			margin-bottom: 12px;
			font-size: 12px;
			color: var(--color-text-maxcontrast);

			.metadata-item-time {
				margin-left: auto;
				display: flex;
				gap: 8px;
			}
			.metadata-item {
				display: flex;
				align-items: center;
				gap: 4px;
				white-space: nowrap;
			}
			.date-label {
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				gap: 2px;

				.label-text {
					font-size: 10px;
					text-transform: lowercase;
					opacity: 0.8;
				}

				.date-value {
					font-size: 11px;
					font-weight: 500;
				}
			}
		}

		.grid-actions {
			display: flex;
			justify-content: flex-end;
		}
	}
}

		    // Styles responsives
	    @media (max-width: 768px) {
			    .inquiry-item.grid-view {
				    .grid-card {
					    padding: 10px;
				    }

				    .grid-header {
					    .header-left {
						    gap: 4px;

						    .status-badge {
							    font-size: 10px;
							    padding: 2px 6px;
						    }
					    }

					    .header-right {
						    .user-icon {
							    margin-left: -6px;
						    }
					    }
				    }

				    .grid-metadata {
					    gap: 8px;

					    .metadata-item {
						    font-size: 11px;
					    }
				    }
			    }
		    }
</style>
