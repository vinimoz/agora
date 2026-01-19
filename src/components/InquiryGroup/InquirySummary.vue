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
            <div
v-if="inquiry.status?.countSupports"
                 class="stat-item supports"
                 :class="{ 'is-supported': isSupported }">
              <component :is="supportIconComponent" class="support-icon" :size="10" />
              <span>{{ inquiry.status.countSupports }}</span>
            </div>

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
          <div
v-if="inquiry.status?.countSupports"
               class="stat-item supports"
               :class="{ 'is-supported': isSupported }">
            <component :is="supportIconComponent" class="support-icon" :size="16" />
            <span>{{ inquiry.status.countSupports }}</span>
          </div>

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
import { ThumbIcon, TernarySupportIcon } from '../AppIcons'

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

// Support icon
const isSupported = computed(() => props.inquiry.currentUserStatus?.hasSupported || false)

const supportIconComponent = computed(() => {
  if (props.inquiry.configuration?.supportFeature === 'ternary') {
    return TernarySupportIcon
  }
  else if (props.inquiry.configuration?.supportFeature === 'binary') {
  return ThumbIcon
  }

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
  background: transparent;
  
  &.is-interactive {
    cursor: pointer;
    
    &:hover {
      .summary-regular {
        transform: translateY(-4px);
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
        border-color: var(--color-primary-element);
      }
      
      .summary-compact {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
        border-color: var(--color-primary-element);
      }
    }
  }
  
  &.has-expiry {
    .summary-regular,
    .summary-compact {
      border-left: 4px solid var(--color-warning);
    }
  }
  
  &.has-cover {
    .summary-regular {
      padding-top: 0;
    }
  }
}

// Compact Mode
.summary-compact {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border: 2px solid var(--color-border);
  border-radius: 12px;
    
  background: transparent;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 72px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  
  .compact-type-badge {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #3b82f6, #60a5fa);
    box-shadow: 0 2px 6px rgba(59, 130, 246, 0.3);
    
    .compact-type-icon {
      width: 16px;
      height: 16px;
      color: white;
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
    margin-bottom: 8px;
  }
  
  .compact-title {
    flex: 1;
    font-size: 14px;
    font-weight: 600;
    color: var(--color-main-text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.3;
  }
  
  .compact-expiry-badge {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    border-radius: 10px;
    font-size: 11px;
    font-weight: 600;
    background: var(--color-background-darker);
    border: 1px solid var(--color-border);
    
    &.expiry-soon {
      background: linear-gradient(135deg, rgba(239, 68, 68, 0.12), rgba(239, 68, 68, 0.06));
      color: #ef4444;
      border: 1px solid rgba(239, 68, 68, 0.2);
    }
    
    &.expiry-warning {
      background: linear-gradient(135deg, rgba(245, 158, 11, 0.12), rgba(245, 158, 11, 0.06));
      color: #f59e0b;
      border: 1px solid rgba(245, 158, 11, 0.2);
    }
    
    &.expiry-normal {
      background: linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(16, 185, 129, 0.06));
      color: #10b981;
      border: 1px solid rgba(16, 185, 129, 0.2);
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
      border: 2px solid white;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
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
    gap: 16px;
    
    .stat-item {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 12px;
      font-weight: 600;
      color: var(--color-text-maxcontrast);
      transition: all 0.2s ease;
      padding: 4px 8px;
      border-radius: 8px;
      background: var(--color-background-dark);
      border: 1px solid var(--color-border);
      
      .support-icon,
      .comments-icon {
        color: inherit;
      }
      
      &.supports {
        cursor: pointer;
        
        &:hover {
          color: var(--color-primary-element);
          background: rgba(var(--color-primary-rgb), 0.1);
          border-color: rgba(var(--color-primary-rgb), 0.2);
        }
        
        &.is-supported {
          color: var(--color-primary-element);
          background: rgba(var(--color-primary-rgb), 0.15);
          border-color: rgba(var(--color-primary-rgb), 0.3);
        }
      }
      
      &.comments:hover {
        color: #3b82f6;
        background: rgba(59, 130, 246, 0.1);
        border-color: rgba(59, 130, 246, 0.2);
      }
    }
  }
}

// Regular Mode
.summary-regular {
  border: 2px solid var(--color-border);
  border-radius: 14px;
  padding: 24px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.summary-cover {
  position: relative;
  height: 180px;
  margin: -24px -24px 20px -24px;
  overflow: hidden;
  border-radius: 14px 14px 0 0;
  
  .cover-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  .cover-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.3));
  }
  
  &:hover .cover-image {
    transform: scale(1.05);
  }
}

.summary-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.header-type-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(59, 130, 246, 0.06));
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  color: #3b82f6;
  border: 1px solid rgba(59, 130, 246, 0.2);
  
  .type-icon {
    color: #3b82f6;
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
  gap: 6px;
  padding: 5px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  background: var(--color-background-darker);
  border: 1px solid var(--color-border);
  
  &.expiry-soon {
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.12), rgba(239, 68, 68, 0.06));
    color: #ef4444;
    border: 1px solid rgba(239, 68, 68, 0.2);
  }
  
  &.expiry-warning {
    background: linear-gradient(135deg, rgba(245, 158, 11, 0.12), rgba(245, 158, 11, 0.06));
    color: #f59e0b;
    border: 1px solid rgba(245, 158, 11, 0.2);
  }
  
  &.expiry-normal {
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(16, 185, 129, 0.06));
    color: #10b981;
    border: 1px solid rgba(16, 185, 129, 0.2);
  }
  
  .expiry-icon {
    color: inherit;
  }
}

.summary-content {
  margin-bottom: 24px;
  flex: 1;
}

.summary-title {
  font-size: 20px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--color-main-text);
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.summary-description {
  font-size: 15px;
  line-height: 1.6;
  color: var(--color-text-lighter);
  margin: 20px 0;
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
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  :deep(ul),
  :deep(ol) {
    padding-left: 20px;
    margin: 12px 0;
  }
  
  :deep(li) {
    margin-bottom: 6px;
  }
  
  :deep(p) {
    margin: 12px 0;
  }
}

.summary-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 16px;
  
  .meta-item {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: var(--color-text-lighter);
    padding: 4px 8px;
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
      max-width: 120px;
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
  gap: 20px;
  padding-top: 20px;
  border-top: 1px solid var(--color-border);
  margin-top: auto;
}

.footer-author {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
  
  .author-avatar {
    flex-shrink: 0;
    border: 2px solid white;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }
  
  .author-info {
    min-width: 0;
  }
  
  .author-name {
    font-size: 14px;
    font-weight: 600;
    color: var(--color-main-text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 4px;
  }
  
  .post-time {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
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
  gap: 20px;
  
  .stat-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: var(--color-background-dark);
    border-radius: 12px;
    font-size: 14px;
    font-weight: 600;
    color: var(--color-text-lighter);
    transition: all 0.2s ease;
    cursor: pointer;
    border: 1px solid var(--color-border);
    
    .support-icon,
    .comments-icon {
      color: inherit;
    }
    
    &.supports {
      &:hover {
        background: rgba(var(--color-primary-rgb), 0.1);
        color: var(--color-primary-element);
        border-color: rgba(var(--color-primary-rgb), 0.2);
      }
      
      &.is-supported {
        background: rgba(var(--color-primary-rgb), 0.15);
        color: var(--color-primary-element);
        border-color: rgba(var(--color-primary-rgb), 0.3);
      }
    }
    
    &.comments:hover {
      background: rgba(59, 130, 246, 0.1);
      color: #3b82f6;
      border-color: rgba(59, 130, 246, 0.2);
    }
  }
}

// Responsive Design
@media (max-width: 768px) {
  .summary-regular {
    padding: 20px;
    border-radius: 12px;
  }
  
  .summary-cover {
    height: 140px;
    margin: -20px -20px 16px -20px;
    border-radius: 12px 12px 0 0;
  }
  
  .summary-title {
    font-size: 18px;
  }
  
  .summary-description {
    font-size: 14px;
  }
  
  .footer-stats {
    gap: 12px;
    
    .stat-item {
      padding: 6px 12px;
      font-size: 13px;
    }
  }
  
  .summary-footer {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }
  
  .footer-stats {
    justify-content: center;
  }
  
  .compact-stats {
    gap: 12px;
    
    .stat-item {
      padding: 3px 8px;
      font-size: 11px;
    }
  }
}

@media (max-width: 480px) {
  .summary-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .header-right {
    width: 100%;
    justify-content: space-between;
  }
  
  .compact-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .compact-stats {
    width: 100%;
    justify-content: flex-start;
  }
}
</style>
