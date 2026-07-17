<!--
  - SPDX-FileCopyrightText: 2018-2025 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="inquiry-summary" :class="summaryClasses" @click="handleClick">
    <!-- Compact Mode -->
    <div v-if="compact" class="summary-compact">
      <div class="compact-type-badge" :class="typeBadgeClass">
        <component :is="typeIconComponent" class="compact-type-icon" />
      </div>

      <div class="compact-content">
        <div class="compact-title-row">
          <div class="compact-title" :title="inquiry.title">
            {{ truncatedTitle }}
          </div>
          <div v-if="showExpiryBadge" class="compact-expiry-badge" :class="expiryBadgeClass">
            <component :is="InquiryGeneralIcons.ClockOutline" class="expiry-icon" :size="12" />
            <span>{{ expiryText }}</span>
          </div>
        </div>

        <div class="compact-meta">
          <div class="compact-author">
            <NcAvatar
              v-if="inquiry.ownedGroup"
              :display-name="inquiry.ownedGroup"
              :show-user-status="false"
              :size="16"
              class="author-avatar"
              :show-name="false"
            />
            <NcAvatar
              v-else
              :user="inquiry.owner?.id"
              :display-name="inquiry.owner?.displayName"
              :size="16"
              class="author-avatar"
              :show-name="false"
            />
            <span class="author-name">{{ truncatedAuthorName }}</span>
          </div>

          <div class="compact-stats">
                            <SupportFeature
                                    :item="inquiry"
                                    item-type="inquiry"
                                    :context="context"
                                    :show-quorum="true"
                                    :show-details-on-hover="true"
                                    :icon-size="22"
                                    @click.stop
                                    />
            <div v-if="inquiry.status?.countComments" class="stat-item comments">
              <component :is="InquiryGeneralIconsComponents.Comment" class="comments-icon" :size="10" />
              <span>{{ inquiry.status.countComments }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Regular Mode -->
    <div v-else class="summary-regular">
      <!-- Cover Image (if exists) -->
      <div v-if="coverUrl" class="summary-cover">
        <img :src="coverUrl" :alt="inquiry.title" class="cover-image" @load="handleImageLoad" />
        <div class="cover-overlay"></div>
      </div>

      <!-- Header with Type -->
      <div class="summary-header">
        <div class="header-type-badge" :class="typeBadgeClass">
          <component :is="typeIconComponent" class="type-icon" :size="14" />
          <span class="type-label">{{ typeLabel }}</span>
        </div>

        <div class="header-right">
          <div v-if="showExpiryBadge" class="expiry-badge" :class="expiryBadgeClass">
            <component :is="InquiryGeneralIcons.ClockOutline" class="expiry-icon" :size="12" />
            <span>{{ expiryText }}</span>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="summary-content">
        <!-- Title -->
        <div class="summary-title" :title="inquiry.title">
          {{ inquiry.title }}
        </div>

        <!-- Safe Description -->
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-if="safeDescription" class="summary-description" v-html="safeDescription">
        </div>

        <!-- Location & Category -->
        <div class="summary-meta">
          <div v-if="locationPath" class="meta-item location">
            <component :is="InquiryGeneralIconsComponents.Location" class="meta-icon" :size="12" />
            <span class="meta-text">{{ truncatedLocation }}</span>
          </div>
          
          <div v-if="categoryPath" class="meta-item category">
            <component :is="InquiryGeneralIconsComponents.Category" class="meta-icon" :size="12" />
            <span class="meta-text">{{ truncatedCategory }}</span>
          </div>
        </div>
      </div>

      <!-- Footer with Author and Stats -->
      <div class="summary-footer">
        <!-- Author Info -->
        <div class="footer-author">
          <NcAvatar
            v-if="inquiry.ownedGroup"
            :display-name="inquiry.ownedGroup"
            :show-user-status="false"
            :size="24"
            class="author-avatar"
            :show-name="false"
          />
          <NcAvatar
            v-else
            :user="inquiry.owner?.id"
            :size="24"
            class="author-avatar"
            :show-name="false"
          />
          <div class="author-info">
            <div class="author-name">{{ ownerDisplayName }}</div>
            <div class="post-time">
              <component :is="InquiryGeneralIconsComponents.Calendar" class="calendar-icon" :size="12" />
              <span>{{ formattedTime }}</span>
            </div>
          </div>
        </div>

        <!-- Stats Icons -->
        <div class="footer-stats">
          <div v-if="inquiry.status?.countComments" class="stat-item comments">
            <component :is="InquiryGeneralIconsComponents.Comment" class="comments-icon" :size="16" />
            <span>{{ inquiry.status.countComments }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { t } from '@nextcloud/l10n'
import NcAvatar from '@nextcloud/vue/components/NcAvatar'
import { getInquiryTypeData } from '../../helpers/modules/InquiryHelper.ts'
import type { Inquiry } from '../../Types/index.ts'
import { useSessionStore } from '../../stores/session.ts'
import { InquiryGeneralIcons } from '../../utils/icons.ts'
import { createInquiryContext } from '../../utils/permissions.ts'

import { SupportFeature } from '../Base/index.ts'
interface Props {
  inquiry: Inquiry
  compact?: boolean
  interactive?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  compact: false,
  interactive: true
})

const emit = defineEmits<{
  view: [id: number]
}>()

const sessionStore = useSessionStore()

// Import icon components from utils/icons.ts
const InquiryGeneralIconsComponents = InquiryGeneralIcons

// Computed properties
const inquiryTypes = computed(() => sessionStore.appSettings?.inquiryTypeTab || [])

const summaryClasses = computed(() => ({
  'is-compact': props.compact,
  'is-interactive': props.interactive,
  'has-expiry': showExpiryBadge.value,
  'has-cover': !!coverUrl.value
}))

// Context for permissions
const context = computed(() => createInquiryContext(props.inquiry, sessionStore.appSettings))

// Get type data
const typeData = computed(() => getInquiryTypeData(props.inquiry.type, inquiryTypes.value))

const typeLabel = computed(() => typeData.value?.label || props.inquiry.type)

// Type icon
const typeIconComponent = computed(() => {
  if (typeData.value?.icon) {
    const iconName = typeData.value.icon
    if (typeof iconName === 'string' && InquiryGeneralIcons[iconName]) {
      return InquiryGeneralIcons[iconName]
    }
    if (typeof iconName === 'function' || typeof iconName === 'object') {
      return iconName
    }
  }

  const iconMap = {
    'survey': 'ClipboardList',
    'poll': 'CheckCircle',
    'question': 'Question',
    'discussion': 'MessageSquare',
    'news': 'Newspaper',
    'announcement': 'Megaphone',
    'meeting': 'Users',
    'document': 'Document',
    'proposal': 'Scale',
    'general': 'FolderMultiple',
    'draft': 'Empty',
  }

  const iconName = iconMap[props.inquiry.type?.toLowerCase()] || 'FolderMultiple'
  return InquiryGeneralIconsComponents[iconName] || InquiryGeneralIconsComponents.FolderMultiple
})

const typeBadgeClass = computed(() => {
  const type = props.inquiry.type?.toLowerCase().replace(/\s+/g, '-')
  return `type-${type}`
})


// Owner display
const ownerDisplayName = computed(() => 
  props.inquiry.ownedGroup || props.inquiry.owner?.displayName || ''
)

// Truncated text
const truncatedTitle = computed(() => {
  if (!props.inquiry.title) return ''
  return props.inquiry.title.length > 40
    ? `${props.inquiry.title.substring(0, 40)}…`
    : props.inquiry.title
})

const truncatedAuthorName = computed(() => {
  const name = ownerDisplayName.value
  return name.length > 15
    ? `${name.substring(0, 15)}…`
    : name
})

// Safe description handling
const safeDescription = computed(() => {
  if (!props.inquiry.descriptionSafe) return ''

  const description = props.inquiry.descriptionSafe
  const maxLength = 150

  if (description.length > maxLength) {
    return `${description.substring(0, maxLength)}…`
  }

  return description
})

// Cover image
const coverUrl = computed(() => {
  if (!props.inquiry.coverId || props.inquiry.coverId === 0) return ''
  return getNextcloudPreviewUrl(props.inquiry.coverId)
})

function getNextcloudPreviewUrl(fileId: number, x = 400, y = 200, autoScale = true) {
  const baseUrl = window.location.origin
  return `${baseUrl}/index.php/core/preview?fileId=${fileId}&x=${x}&y=${y}&a=${autoScale}`
}

const imageLoaded = ref(false)
function handleImageLoad() {
  imageLoaded.value = true
}

// Expiry handling
const showExpiryBadge = computed(() => !!props.inquiry.configuration?.expire && props.inquiry.configuration.expire > 0)

const expiryText = computed(() => {
  if (!props.inquiry.configuration?.expire) return ''

  const expiryDate = new Date(props.inquiry.configuration.expire * 1000)
  const now = new Date()
  const diff = expiryDate.getTime() - now.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

  if (days > 0) {
    return t('agora', '{days}d', { days })
  } if (hours > 0) {
    return t('agora', '{hours}h', { hours })
  } 
    return t('agora', 'Soon')
})

const expiryBadgeClass = computed(() => {
  if (!props.inquiry.configuration?.expire) return ''

  const expiryDate = new Date(props.inquiry.configuration.expire * 1000)
  const now = new Date()
  const diff = expiryDate.getTime() - now.getTime()
  const hours = diff / (1000 * 60 * 60)

  if (hours < 24) return 'expiry-soon'
  if (hours < 72) return 'expiry-warning'
  return 'expiry-normal'
})

// Time formatting
const formattedTime = computed(() => {
  if (!props.inquiry.status?.created) return ''

  const created = new Date(props.inquiry.status.created * 1000)
  const now = new Date()
  const diff = now.getTime() - created.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor(diff / (1000 * 60))

  if (days > 30) {
    return created.toLocaleDateString()
  } if (days > 0) {
    return t('agora', '{days} days ago', { days })
  } if (hours > 0) {
    return t('agora', '{hours} hours ago', { hours })
  } if (minutes > 0) {
    return t('agora', '{minutes} minutes ago', { minutes })
  } 
    return t('agora', 'Just now')
})

// Location and Category paths
function getHierarchyPath(items, targetId) {
  if (!items || !Array.isArray(items)) return ''
  
  const itemMap = {}

  items.forEach((item) => {
    itemMap[item.id] = item
  })

  if (!itemMap[targetId]) {
    return itemMap[1]?.name || t('agora', 'Not defined')
  }

  function buildPath(item) {
    if (item.parentId === 0) {
      return item.name
    }
    const parent = itemMap[item.parentId]
    if (parent) {
      return `${buildPath(parent)} → ${item.name}`
    }
    return item.name
  }

  return buildPath(itemMap[targetId])
}

const locationPath = computed(() => getHierarchyPath(sessionStore.appSettings?.locationTab, props.inquiry.locationId))
const categoryPath = computed(() => getHierarchyPath(sessionStore.appSettings?.categoryTab, props.inquiry.categoryId))

const truncatedLocation = computed(() => {
  if (!locationPath.value) return ''
  return locationPath.value.length > 20 
    ? `${locationPath.value.substring(0, 20)}…` 
    : locationPath.value
})

const truncatedCategory = computed(() => {
  if (!categoryPath.value) return ''
  return categoryPath.value.length > 20 
    ? `${categoryPath.value.substring(0, 20)}…` 
    : categoryPath.value
})

function handleClick() {
  emit('view', props.inquiry.id)
}
</script>
<style lang="scss" scoped>
.inquiry-summary {
  font-family: var(--font-family);
  background: var(--color-main-background);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  
  &.is-interactive {
    cursor: pointer;
    
    &:hover {
      .summary-regular {
        transform: translateY(-2px);
        box-shadow: 
          0 4px 12px rgba(0, 0, 0, 0.1),
          0 2px 6px rgba(0, 0, 0, 0.05);
      }
      
      .summary-compact {
        transform: translateY(-1px);
        box-shadow: 
          0 2px 8px rgba(0, 0, 0, 0.08),
          0 1px 4px rgba(0, 0, 0, 0.04);
      }
    }
  }
  
  &:focus-visible {
    outline: 2px solid var(--color-primary-element);
    outline-offset: 2px;
    border-radius: 8px;
  }
}

/* === COMPACT MODE === */
.summary-compact {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: var(--color-main-background);
  border-radius: 8px;
  border: 1px solid var(--color-border);
  transition: all 0.2s ease;
  min-height: 64px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
  
  .compact-type-badge {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-background-dark);
    border: 1px solid var(--color-border);
    
    .compact-type-icon {
      width: 16px;
      height: 16px;
      color: var(--color-primary-element);
    }
  }
  
  .compact-content {
    flex: 1;
    min-width: 0;
  }
  
  .compact-title-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 8px;
    margin-bottom: 6px;
  }
  
  .compact-title {
    flex: 1;
    font-size: 14px;
    font-weight: 600;
    color: var(--color-main-text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.4;
  }
  
  .compact-expiry-badge {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 3px 8px;
    border-radius: 10px;
    font-size: 11px;
    font-weight: 600;
    background: var(--color-background-dark);
    border: 1px solid var(--color-border);
    
    &.expiry-soon {
      background: rgba(239, 68, 68, 0.08);
      color: #ef4444;
      border-color: rgba(239, 68, 68, 0.2);
    }
    
    &.expiry-warning {
      background: rgba(245, 158, 11, 0.08);
      color: #f59e0b;
      border-color: rgba(245, 158, 11, 0.2);
    }
    
    &.expiry-normal {
      background: rgba(16, 185, 129, 0.08);
      color: #10b981;
      border-color: rgba(16, 185, 129, 0.2);
    }
    
    .expiry-icon {
      color: inherit;
    }
  }
  
  .compact-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
  }
  
  .compact-author {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1;
    
    .author-avatar {
      flex-shrink: 0;
      border: 1px solid var(--color-main-background);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }
    
    .author-name {
      font-size: 12px;
      color: var(--color-text-lighter);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: 500;
    }
  }
  
  .compact-stats {
    display: flex;
    align-items: center;
    gap: 12px;
    
    .stat-item {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 11px;
      font-weight: 600;
      color: var(--color-text-lighter);
      padding: 3px 8px;
      border-radius: 6px;
      background: var(--color-background-dark);
      border: 1px solid var(--color-border);
      
      .support-icon,
      .comments-icon {
        color: inherit;
        opacity: 0.8;
      }
      
      &.supports {
        transition: all 0.2s ease;
        
        &.is-supported {
          background: rgba(var(--color-primary-rgb), 0.1);
          color: var(--color-primary-element);
          border-color: rgba(var(--color-primary-rgb), 0.2);
          
          .support-icon {
            opacity: 1;
          }
        }
      }
    }
  }
}

/* === REGULAR MODE === */
.summary-regular {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 20px;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--color-main-background);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--color-primary-element);
    opacity: 0;
    transition: opacity 0.2s ease;
  }
  
  &:hover::before {
    opacity: 0.8;
  }
}

.summary-cover {
  position: relative;
  height: 160px;
  margin: -20px -20px 16px -20px;
  overflow: hidden;
  border-radius: 8px 8px 0 0;
  
  .cover-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  .cover-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom, 
      rgba(0, 0, 0, 0.1) 0%, 
      rgba(0, 0, 0, 0.3) 100%
    );
  }
  
  &:hover .cover-image {
    transform: scale(1.02);
  }
}

.summary-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.header-type-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  background: var(--color-background-dark);
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-lighter);
  border: 1px solid var(--color-border);
  transition: all 0.2s ease;
  
  &:hover {
    border-color: var(--color-primary-element);
    color: var(--color-primary-element);
  }
  
  .type-icon {
    color: var(--color-primary-element);
  }
}

.header-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.expiry-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: var(--color-background-dark);
  border: 1px solid var(--color-border);
  
  &.expiry-soon {
    background: rgba(239, 68, 68, 0.08);
    color: #ef4444;
    border-color: rgba(239, 68, 68, 0.2);
  }
  
  &.expiry-warning {
    background: rgba(245, 158, 11, 0.08);
    color: #f59e0b;
    border-color: rgba(245, 158, 11, 0.2);
  }
  
  &.expiry-normal {
    background: rgba(16, 185, 129, 0.08);
    color: #10b981;
    border-color: rgba(16, 185, 129, 0.2);
  }
  
  .expiry-icon {
    color: inherit;
  }
}

.summary-content {
  margin-bottom: 20px;
  flex: 1;
}

.summary-title {
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--color-main-text);
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.summary-description {
  font-size: 14px;
  line-height: 1.6;
  color: var(--color-text-lighter);
  margin: 16px 0;
  flex: 1;
  
  :deep(*) {
    margin: 0;
    padding: 0;
    font-size: inherit;
    line-height: inherit;
    color: inherit;
  }
  
  :deep(a) {
    color: var(--color-primary-element);
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s ease;
    
    &:hover {
      border-bottom-color: var(--color-primary-element);
    }
  }
  
  :deep(ul),
  :deep(ol) {
    padding-left: 18px;
    margin: 10px 0;
  }
  
  :deep(li) {
    margin-bottom: 4px;
  }
  
  :deep(p) {
    margin: 10px 0;
  }
}

.summary-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
  
  .meta-item {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: var(--color-text-lighter);
    padding: 4px 10px;
    background: var(--color-background-dark);
    border-radius: 12px;
    border: 1px solid var(--color-border);
    
    .meta-icon {
      opacity: 0.7;
    }
    
    &.location .meta-icon {
      color: #3b82f6;
    }
    
    &.category .meta-icon {
      color: #8b5cf6;
    }
    
    .meta-text {
      max-width: 100px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

.summary-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--color-border);
  margin-top: auto;
}

.footer-author {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
  
  .author-avatar {
    flex-shrink: 0;
    border: 1px solid var(--color-main-background);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }
  
  .author-info {
    min-width: 0;
  }
  
  .author-name {
    font-size: 13px;
    font-weight: 600;
    color: var(--color-main-text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 2px;
  }
  
  .post-time {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    font-weight: 500;
    color: var(--color-text-maxcontrast);
    
    .calendar-icon {
      color: var(--color-text-maxcontrast);
      opacity: 0.7;
    }
  }
}

.footer-stats {
  display: flex;
  align-items: center;
  gap: 12px;
  
  .stat-item {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    background: var(--color-background-dark);
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    color: var(--color-text-lighter);
    border: 1px solid var(--color-border);
    transition: all 0.2s ease;
    
    .support-icon,
    .comments-icon {
      color: inherit;
      opacity: 0.8;
    }
    
    &.supports {
      &.is-supported {
        background: rgba(var(--color-primary-rgb), 0.1);
        color: var(--color-primary-element);
        border-color: rgba(var(--color-primary-rgb), 0.2);
        
        .support-icon {
          opacity: 1;
        }
      }
    }
  }
}

/* === TYPE BADGE COLORS === */
.type-badge {
  &.type-proposal {
    background: rgba(16, 185, 129, 0.08) !important;
    border-color: rgba(16, 185, 129, 0.2) !important;
    .type-icon { color: #10b981 !important; }
  }
  
  &.type-survey {
    background: rgba(59, 130, 246, 0.08) !important;
    border-color: rgba(59, 130, 246, 0.2) !important;
    .type-icon { color: #3b82f6 !important; }
  }
  
  &.type-poll {
    background: rgba(139, 92, 246, 0.08) !important;
    border-color: rgba(139, 92, 246, 0.2) !important;
    .type-icon { color: #8b5cf6 !important; }
  }
  
  &.type-question {
    background: rgba(245, 158, 11, 0.08) !important;
    border-color: rgba(245, 158, 11, 0.2) !important;
    .type-icon { color: #f59e0b !important; }
  }
  
  &.type-discussion {
    background: rgba(6, 182, 212, 0.08) !important;
    border-color: rgba(6, 182, 212, 0.2) !important;
    .type-icon { color: #06b6d4 !important; }
  }
  
  &.type-news {
    background: rgba(236, 72, 153, 0.08) !important;
    border-color: rgba(236, 72, 153, 0.2) !important;
    .type-icon { color: #ec4899 !important; }
  }
  
  &.type-announcement {
    background: rgba(168, 85, 247, 0.08) !important;
    border-color: rgba(168, 85, 247, 0.2) !important;
    .type-icon { color: #a855f7 !important; }
  }
  
  &.type-meeting {
    background: rgba(14, 165, 233, 0.08) !important;
    border-color: rgba(14, 165, 233, 0.2) !important;
    .type-icon { color: #0ea5e9 !important; }
  }
  
  &.type-document {
    background: rgba(99, 102, 241, 0.08) !important;
    border-color: rgba(99, 102, 241, 0.2) !important;
    .type-icon { color: #6366f1 !important; }
  }
  
  &.type-default {
    background: rgba(107, 114, 128, 0.08) !important;
    border-color: rgba(107, 114, 128, 0.2) !important;
    .type-icon { color: #6b7280 !important; }
  }
}

/* === RESPONSIVE DESIGN === */
@media (max-width: 1024px) {
  .summary-regular {
    padding: 16px;
  }
  
  .summary-cover {
    height: 140px;
    margin: -16px -16px 12px -16px;
  }
  
  .summary-title {
    font-size: 16px;
  }
  
  .summary-description {
    font-size: 13px;
  }
}

@media (max-width: 768px) {
  .summary-regular {
    border-radius: 6px;
  }
  
  .summary-cover {
    height: 120px;
    border-radius: 6px 6px 0 0;
  }
  
  .summary-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .header-right {
    width: 100%;
    justify-content: space-between;
  }
  
  .footer-stats {
    gap: 8px;
    
    .stat-item {
      padding: 4px 10px;
      font-size: 12px;
    }
  }
  
  .summary-footer {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
  
  .footer-stats {
    justify-content: flex-start;
  }
  
  .compact-stats {
    gap: 8px;
    
    .stat-item {
      padding: 2px 6px;
      font-size: 10px;
    }
  }
  
  .compact-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }
}

@media (max-width: 480px) {
  .summary-compact {
    padding: 10px 12px;
    gap: 10px;
    min-height: 56px;
    
    .compact-type-badge {
      width: 28px;
      height: 28px;
      
      .compact-type-icon {
        width: 14px;
        height: 14px;
      }
    }
  }
  
  .summary-regular {
    padding: 12px;
  }
  
  .summary-cover {
    height: 100px;
    margin: -12px -12px 10px -12px;
  }
  
  .summary-title {
    font-size: 15px;
    margin-bottom: 8px;
  }
  
  .summary-description {
    margin: 12px 0;
  }
  
  .footer-author {
    gap: 8px;
    
    .author-avatar {
      width: 20px;
      height: 20px;
    }
  }
}

/* === ANIMATIONS === */
.summary-regular,
.summary-compact,
.summary-cover,
.summary-header,
.header-type-badge,
.expiry-badge,
.footer-stats .stat-item,
.compact-stats .stat-item {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* === FOCUS STATES === */
.summary-regular:focus-within,
.summary-compact:focus-within {
  border-color: var(--color-primary-element);
  box-shadow: 0 0 0 2px rgba(var(--color-primary-rgb), 0.1);
}
</style>
