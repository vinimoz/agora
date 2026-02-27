<!--
- SPDX-FileCopyrightText: 2025 Nextcloud contributors
- SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="inquiry-card" :class="cardClasses" @click="handleClick">
    <!-- Cover Image - Position changes based on layout -->
    <div v-if="coverUrl" class="card-cover" :class="{ 'horizontal-cover': horizontal }">
      <img :src="coverUrl" :alt="inquiry.title" class="cover-image" />
      <div class="cover-overlay"></div>
      
      <!-- Support & Comments on cover for horizontal layout -->
      <div v-if="horizontal" class="cover-actions">
        <div class="cover-support">
          <SupportFeature
            :item="inquiry"
            item-type="inquiry"
            :context="context"
            :show-quorum="true"
            :show-details-on-hover="true"
            :icon-size="22"
            @click.stop
          />
        </div>
        <div v-if="inquiry.status?.countComments" class="cover-comments" @click.stop="handleCommentsClick">
          <component :is="InquiryGeneralIcons.Comment" class="counter-icon" :size="16" />
          <span class="counter-value">{{ inquiry.status.countComments }}</span>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="card-content" :class="{ 
      'has-cover': coverUrl,
      'horizontal-content': horizontal 
    }">
      <!-- Header -->
      <div class="card-header">
        <div class="type-badge">
          <component :is="typeIconComponent" class="type-icon" :size="14" />
          <span class="type-label">{{ typeLabel }}</span>
        </div>
        
        <div v-if="currentInquiryStatus" class="status-badge">
          <component :is="statusIconComponent" class="status-icon" :size="12" />
          {{ statusText }}
        </div>
      </div>

      <!-- Title -->
      <h3 class="card-title" :title="inquiry.title">
        {{ inquiry.title }}
      </h3>

      <!-- Short Description -->
      <div v-if="shortDescription" class="card-description">
        {{ shortDescription }}
      </div>

      <!-- Metadata - Location & Category -->
      <div class="card-meta-info">
        <div class="meta-item location">
          <component :is="InquiryGeneralIcons.Location" class="meta-icon" :size="12" />
          <span class="location-text">{{ truncatedLocation }}</span>
        </div>
        
        <div class="meta-item category">
          <component :is="InquiryGeneralIcons.Category" class="meta-icon" :size="12" />
          <span class="meta-text">{{ truncatedCategory }}</span>
        </div>
      </div>

      <!-- Stats -->
      <div class="card-stats">
        <!-- Author -->
        <div class="stat-author">
          <NcAvatar
            v-if="inquiry.ownedGroup"
            :display-name="inquiry.ownedGroup"
            :show-user-status="false"
            :size="24"
            class="author-avatar"
          />
          <NcAvatar
            v-else
            :user="inquiry.owner?.id"
            :display-name="inquiry.owner?.displayName"
            :size="24"
            class="author-avatar"
          />
          <div class="author-info">
            <div class="author-name">{{ truncatedAuthorName }}</div>
            <div class="post-time">
              <component :is="InquiryGeneralIcons.Calendar" class="calendar-icon" :size="10" />
              <span>{{ formattedTime }}</span>
            </div>
          </div>
        </div>

        <!-- Counters - Only show in vertical layout -->
        <div v-if="!horizontal" class="stat-counters">
          <SupportFeature
            :item="inquiry"
            item-type="inquiry"
            :context="context"
            :show-quorum="true"
            :show-details-on-hover="true"
            :icon-size="22"
            @click.stop
          />
          <div v-if="inquiry.status?.countComments" class="counter-item comments" @click.stop="handleCommentsClick">
            <component :is="InquiryGeneralIcons.Comment" class="counter-icon" :size="14" />
            <span class="counter-value">{{ inquiry.status.countComments }}</span>
          </div>
        </div>
      </div>

      <!-- Dates -->
      <div v-if="showExpiryBadge" class="card-dates">
        <div class="date-item expiry" :class="expiryBadgeClass">
          <component :is="InquiryGeneralIcons.ClockOutline" class="date-icon" :size="12" />
          <span>{{ expiryText }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { t } from '@nextcloud/l10n'
import NcAvatar from '@nextcloud/vue/components/NcAvatar'

import { getInquiryTypeData } from '../../helpers/modules/InquiryHelper.ts'
import type { Inquiry } from '../../Types/index.ts'
import { useSessionStore } from '../../stores/session.ts'
import { InquiryGeneralIcons, StatusIcons } from '../../utils/icons.ts'
import SupportFeature from '../../helpers/modules/SupportFeature.vue'
import { createInquiryContext, canSupport, canComment } from '../../utils/permissions.ts'

interface Props {
  inquiry: Inquiry
  isActive?: boolean
  dense?: boolean
  interactive?: boolean
  horizontal?: boolean 
}

const props = withDefaults(defineProps<Props>(), {
  isActive: false,
  dense: false,
  interactive: true,
  horizontal: true
})

const emit = defineEmits<{
  click: [inquiry: Inquiry]
  support: [inquiryId: number]
  comments: [inquiryId: number]
}>()

const sessionStore = useSessionStore()

// Card classes
const cardClasses = computed(() => ({
  'is-active': props.isActive,
  'is-dense': props.dense,
  'is-interactive': props.interactive,
  'has-cover': !!coverUrl.value,
  'is-horizontal': props.horizontal // Add horizontal class
}))

// Get inquiry types
const inquiryTypes = computed(() => sessionStore.appSettings?.inquiryTypeTab || [])

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
  return InquiryGeneralIcons[iconName] || InquiryGeneralIcons.FolderMultiple
})

// Get current status
const currentInquiryStatus = computed(() => {
  if (!props.inquiry.status?.inquiryStatus) return null
  
  const specialStatuses = {
    'draft': {
      statusKey: 'draft',
      label: 'Draft',
      icon: 'draft',
      inquiryType: props.inquiry.type,
      order: 0,
    },
    'waiting_approval': {
      statusKey: 'waiting_approval',
      label: 'Waiting Approval',
      icon: 'waitingapproval',
      inquiryType: props.inquiry.type,
      order: 1,
    }
  }

  const currentStatus = props.inquiry.status.inquiryStatus
  if (specialStatuses[currentStatus]) {
    return specialStatuses[currentStatus]
  }

  const statusesFromSettings = sessionStore.appSettings?.inquiryStatusTab
    ?.filter((status) => status.inquiryType === props.inquiry.type) || []
    
  return statusesFromSettings.find(
    (status) => status.statusKey === currentStatus
  ) || specialStatuses.draft
})

const statusText = computed(() => currentInquiryStatus.value?.label ? t('agora', currentInquiryStatus.value.label) : '')

const statusIconComponent = computed(() => {
  if (!currentInquiryStatus.value?.icon) return StatusIcons.Default
  const iconName = currentInquiryStatus.value.icon
  return StatusIcons[iconName] || StatusIcons.Default
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

// Short Description
const shortDescription = computed(() => {
  if (!props.inquiry.description) return ''
  
  const plainText = props.inquiry.description.replace(/<[^>]*>/g, '')
  
  if (plainText.length > 100) {
    return `${plainText.substring(0, 100)}…`
  }
  
  return plainText
})

// Get hierarchy path for location and category display
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

// Location and Category paths
const locationPath = computed(() => getHierarchyPath(sessionStore.appSettings?.locationTab, props.inquiry.locationId))
const categoryPath = computed(() => getHierarchyPath(sessionStore.appSettings?.categoryTab, props.inquiry.categoryId))

const truncatedLocation = computed(() => {
  if (!locationPath.value) return ''
  return locationPath.value.length > 15 
    ? `${locationPath.value.substring(0, 15)}…` 
    : locationPath.value
})

const truncatedCategory = computed(() => {
  if (!categoryPath.value) return ''
  return categoryPath.value.length > 15 
    ? `${categoryPath.value.substring(0, 15)}…` 
    : categoryPath.value
})

// Truncated text
const truncatedAuthorName = computed(() => {
  const name = props.inquiry.ownedGroup || props.inquiry.owner?.displayName || ''
  return name.length > 20 
    ? `${name.substring(0, 20)}…` 
    : name
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
    return t('agora', '{days}d ago', { days })
  } if (hours > 0) {
    return t('agora', '{hours}h ago', { hours })
  } if (minutes > 0) {
    return t('agora', '{minutes}m ago', { minutes })
  } 
    return t('agora', 'Just now')
})

// Expiry
const showExpiryBadge = computed(() => !!props.inquiry.configuration?.expire && props.inquiry.configuration.expire > 0)

const expiryText = computed(() => {
  if (!props.inquiry.configuration?.expire) return ''
  
  const expiryDate = new Date(props.inquiry.configuration.expire * 1000)
  const now = new Date()
  const diff = expiryDate.getTime() - now.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  
  if (days > 0) {
    return t('agora', '{days} days left', { days })
  } if (hours > 0) {
    return t('agora', '{hours} hours left', { hours })
  } 
    return t('agora', 'Expiring soon')
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

// Handlers
function handleClick() {
  if (props.interactive) {
    emit('click', props.inquiry)
  }
}

function handleSupportClick() {
  emit('support', props.inquiry.id)
}

function handleCommentsClick() {
  emit('comments', props.inquiry.id)
}
</script>

<style lang="scss" scoped>
.inquiry-card {
  position: relative;
  border-radius: 16px;
  background: var(--color-main-background);
  border: 2px solid var(--color-border);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  
  // Horizontal layout - Tall and elongated
&.is-horizontal {
  flex-direction: row;
  min-height: 320px; // Taller minimum height
  max-height: 380px; // Control maximum height
  
  .card-cover {
    width: 200px; // Slightly narrower cover
    height: 100%;
    min-height: 100%;
    position: relative;
    
    &.horizontal-cover {
      position: relative;
      
      .cover-actions {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 12px;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
        backdrop-filter: blur(4px);
        
        .cover-support,
        .cover-comments {
          display: flex;
          align-items: center;
          gap: 6px;
          color: white;
          padding: 6px 12px;
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.15);
          cursor: pointer;
          transition: all 0.2s ease;
          font-weight: 500;
          
          &:hover {
            background: rgba(255, 255, 255, 0.25);
            transform: scale(1.05);
          }
        }
        
        .cover-comments {
          .counter-icon {
            color: white;
          }
          .counter-value {
            font-weight: 600;
            font-size: 14px;
          }
        }
      }
    }
  }
  
  .card-content.horizontal-content {
    flex: 1;
    width: calc(100% - 200px);
    padding: 20px 24px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  // Adjust title for elongated look
  .card-title {
    font-size: 20px; // Larger title
    line-height: 1.3;
    margin-bottom: 4px;
    -webkit-line-clamp: 2;
  }
  
  // Make description take more space
  .card-description {
    font-size: 14px;
    line-height: 1.6;
    -webkit-line-clamp: 3; // Show more lines
    margin-bottom: 8px;
    flex: 1; // Take available space
  }
  
  // Compact meta info
  .card-meta-info {
    margin-top: 4px;
    gap: 8px;
    
    .meta-item {
      padding: 4px 10px;
      font-size: 12px;
      
      .meta-text {
        max-width: 140px; // Longer text allowed
      }
    }
  }
  
  // Adjust stats positioning
  .card-stats {
    padding-top: 12px;
    margin-top: 4px;
    border-top: 1px solid var(--color-border);
  }
  
  // Compact author section
  .stat-author {
    .author-info {
      .author-name {
        font-size: 13px;
        max-width: 140px;
      }
      
      .post-time {
        font-size: 11px;
      }
    }
  }
}

// Dense horizontal - Even more elongated
&.is-horizontal.is-dense {
  min-height: 280px;
  max-height: 320px;
  
  .card-cover {
    width: 160px;
  }
  
  .card-content.horizontal-content {
    width: calc(100% - 160px);
    padding: 16px 20px;
  }
  
  .card-title {
    font-size: 18px;
    -webkit-line-clamp: 2;
  }
  
  .card-description {
    -webkit-line-clamp: 2;
    font-size: 13px;
  }
  
  .card-meta-info .meta-item .meta-text {
    max-width: 120px;
  }
  
  .stat-author .author-info .author-name {
    max-width: 120px;
  }
}

  &.is-interactive {
    cursor: pointer;
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
      border-color: var(--color-primary-element);
      background: var(--color-background-dark);
      
      .card-cover .cover-overlay {
        opacity: 0.2;
      }
    }
  }
  
  // Specific hover for horizontal to prevent double transform
  &.is-horizontal.is-interactive:hover {
    transform: translateX(-4px) translateY(-4px);
  }
  
  &.is-active {
    border-color: var(--color-primary-element);
    box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb), 0.1);
  }
  
  &.is-dense {
    border-radius: 12px;
    
    .card-content {
      padding: 16px;
    }
    
    .card-title {
      font-size: 15px;
    }
    
    .card-description {
      -webkit-line-clamp: 1;
    }
    
    // Dense horizontal adjustments
    &.is-horizontal {
      .card-cover {
        width: 200px;
      }
      
      .card-content.horizontal-content {
        width: calc(100% - 200px);
      }
    }
  }
  
  &.has-cover {
    .card-header {
      margin-top: 8px;
    }
  }
}

.card-cover {
  position: relative;
  height: 160px;
  overflow: hidden;
  
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
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .inquiry-card:hover & {
    .cover-image {
      transform: scale(1.05);
    }
  }
}

.card-content {
  padding: 20px;
  background: var(--color-main-background);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
  flex-wrap: wrap;
}

.type-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  background: linear-gradient(135deg, var(--color-primary-element-light), rgba(var(--color-primary-rgb), 0.1));
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-primary-element);
  border: 1px solid rgba(var(--color-primary-rgb), 0.2);
  
  .type-icon {
    color: var(--color-primary-element);
  }
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  
  &.status-open {
    background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.05));
    color: #16a34a;
    border: 1px solid rgba(34, 197, 94, 0.2);
  }
  
  &.status-closed {
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.05));
    color: #dc2626;
    border: 1px solid rgba(239, 68, 68, 0.2);
  }
  
  &.status-draft {
    background: linear-gradient(135deg, rgba(148, 163, 184, 0.1), rgba(148, 163, 184, 0.05));
    color: #64748b;
    border: 1px solid rgba(148, 163, 184, 0.2);
  }
  
  &.status-waiting {
    background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.05));
    color: #f59e0b;
    border: 1px solid rgba(245, 158, 11, 0.2);
  }
  
  &.status-unknown {
    background: var(--color-background-hover);
    color: var(--color-text-lighter);
    border: 1px solid var(--color-border);
  }
}

.card-title {
  font-size: 18px;
  font-weight: 700;
  line-height: 1.4;
  color: var(--color-main-text);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-description {
  font-size: 14px;
  line-height: 1.5;
  color: var(--color-text-lighter);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.card-meta-info {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 4px;
  
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

.card-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid var(--color-border);
  margin-top: 8px;
}

.stat-author {
  display: flex;
  align-items: center;
  gap: 8px;
  
  .author-avatar {
    border: 2px solid var(--color-main-background);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .author-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
    
    .author-name {
      font-size: 13px;
      font-weight: 500;
      color: var(--color-main-text);
      max-width: 100px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .post-time {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 11px;
      color: var(--color-text-maxcontrast);
      
      .calendar-icon {
        opacity: 0.7;
      }
    }
  }
}

.stat-counters {
  display: flex;
  align-items: center;
  gap: 16px;
  
  .counter-item {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    color: var(--color-text-lighter);
    transition: all 0.2s ease;
    cursor: pointer;
    
    &.supports {
      &:hover {
        color: var(--color-primary-element);
        
        .counter-icon {
          opacity: 0.9;
        }
      }
      
      .counter-icon {
        transition: transform 0.2s ease;
      }
      
      &:hover .counter-icon {
        transform: scale(1.1);
      }
    }
    
    &.comments {
      &:hover {
        color: #3b82f6;
        
        .counter-icon {
          opacity: 0.9;
        }
      }
      
      .counter-icon {
        color: var(--color-text-maxcontrast);
      }
    }
    
    .counter-value {
      font-weight: 600;
    }
  }
}

.card-dates {
  .date-item {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
    
    &.expiry {
      &.expiry-soon {
        background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.05));
        color: #ef4444;
        border: 1px solid rgba(239, 68, 68, 0.2);
      }
      
      &.expiry-warning {
        background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.05));
        color: #f59e0b;
        border: 1px solid rgba(245, 158, 11, 0.2);
      }
      
      &.expiry-normal {
        background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05));
        color: #10b981;
        border: 1px solid rgba(16, 185, 129, 0.2);
      }
      
      .date-icon {
        opacity: 0.9;
      }
    }
  }
}

// Responsive
@media (max-width: 768px) {
  .inquiry-card {
    border-radius: 12px;
    
    // Stack horizontal on mobile
    &.is-horizontal {
      flex-direction: column;
      
      .card-cover {
        width: 100%;
        height: 160px;
        
        &.horizontal-cover .cover-actions {
          padding: 8px;
        }
      }
      
      .card-content.horizontal-content {
        width: 100%;
      }
      
      &.is-dense {
        .card-cover {
          height: 140px;
        }
      }
    }
  }
  
  .card-cover {
    height: 140px;
  }
  
  .card-content {
    border-radius: 8px;
    padding: 16px;
    gap: 10px;
  }
  
  .card-title {
    font-size: 16px;
  }
  
  .card-description {
    font-size: 13px;
  }
  
  .card-meta-info {
    gap: 8px;
    
    .meta-item {
      .meta-text {
        max-width: 80px;
      }
    }
  }
  
  .stat-counters {
    gap: 12px;
  }
  
  .stat-author .author-info .author-name {
    max-width: 80px;
  }
}
</style>
