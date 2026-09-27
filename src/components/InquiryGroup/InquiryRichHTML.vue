<!--
- SPDX-FileCopyrightText: 2025 Nextcloud contributors
- SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div v-if="inquiry" class="inquiry-rich-html" :class="{ 'is-book': displayMode === 'book' }">
    <!-- Cover Image with Title -->
    <div v-if="showCover && coverUrl" class="rich-cover">
      <img :src="coverUrl" :alt="inquiry.title" class="cover-image" loading="lazy" />
      <div class="cover-overlay">
        <div class="cover-content">
          <div v-if="showType" class="cover-type-badge">
            <component :is="typeIconComponent" class="type-icon" :size="20" />
            <span class="type-label">{{ typeLabel }}</span>
          </div>
          <h1 class="cover-title">{{ inquiry.title }}</h1>
          <div v-if="showMeta" class="cover-meta">
            <span v-if="locationPath" class="cover-meta-item">
              <component :is="InquiryGeneralIcons.Location" :size="14" />
              {{ truncatedLocation }}
            </span>
            <span v-if="categoryPath" class="cover-meta-item">
              <component :is="InquiryGeneralIcons.Category" :size="14" />
              {{ truncatedCategory }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="rich-content-wrapper" :class="{ 'has-cover': showCover && coverUrl }">
      <!-- Header without cover -->
      <div v-if="!coverUrl" class="rich-header">
        <div class="header-top">
          <div v-if="showType" class="type-badge">
            <component :is="typeIconComponent" class="type-icon" :size="20" />
            <span class="type-label">{{ typeLabel }}</span>
          </div>
          <div v-if="showStatus && currentInquiryStatus" class="status-badge" :class="statusBadgeClass">
            <component :is="statusIconComponent" class="status-icon" :size="12" />
            {{ statusText }}
          </div>
        </div>
        
        <h1 class="rich-title">{{ inquiry.title }}</h1>
      </div>

      <!-- Meta Information -->
      <div v-if="showAuthor || showMeta" class="rich-meta">
        <div class="meta-author">
          <NcAvatar
            v-if="showAuthor && inquiry.ownedGroup"
            :display-name="inquiry.ownedGroup"
            :show-user-status="false"
            :size="44"
            class="author-avatar"
          />
          <NcAvatar
            v-else-if="showAuthor"
            :user="inquiry.owner?.id"
            :display-name="inquiry.owner?.displayName"
            :size="44"
            class="author-avatar"
          />
          <div class="author-info">
            <div v-if="showAuthor" class="author-name">
              {{ inquiry.ownedGroup || inquiry.owner?.displayName }}
            </div>
            <div v-if="showMeta" class="meta-details">
              <div v-if="inquiry.status?.created" class="meta-date">
                <component :is="InquiryGeneralIcons.Calendar" class="date-icon" :size="14" />
                <span>{{ formattedDate }}</span>
              </div>
              
              <div v-if="locationPath" class="meta-location">
                <component :is="InquiryGeneralIcons.Location" class="location-icon" :size="14" />
                <span>{{ truncatedLocation }}</span>
              </div>
              
              <div v-if="categoryPath" class="meta-category">
                <component :is="InquiryGeneralIcons.Category" class="category-icon" :size="14" />
                <span>{{ truncatedCategory }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Stats -->
        <div v-if="showStats" class="rich-stats">
          <div v-if="showComments && inquiry.status?.countComments" class="stat-item">
            <component :is="InquiryGeneralIcons.Comment" :size="14" />
            <span>{{ inquiry.status.countComments }}</span>
            <span class="stat-label">{{ t('agora', 'comments') }}</span>
          </div>
          <div v-if="showSupport && inquiry.status?.countSupports" class="stat-item">
            <component :is="InquiryGeneralIcons.ThumbUp" :size="14" />
            <span>{{ inquiry.status.countSupports }}</span>
            <span class="stat-label">{{ t('agora', 'supports') }}</span>
          </div>
          <div v-if="showParticipants && inquiry.status?.countParticipants" class="stat-item">
            <component :is="InquiryGeneralIcons.Users" :size="14" />
            <span>{{ inquiry.status.countParticipants }}</span>
            <span class="stat-label">{{ t('agora', 'participants') }}</span>
          </div>
        </div>
      </div>

      <!-- Main HTML Content -->
      <div v-if="showDescription" class="rich-content">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="sanitizedContent"></div>
      </div>

      <!-- Expiry Warning -->
      <div v-if="showExpiry && isExpired" class="expiry-warning">
        <component :is="InquiryGeneralIcons.AlertCircle" class="warning-icon" :size="18" />
        <span>{{ t('agora', 'This inquiry has expired') }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { t } from '@nextcloud/l10n'
import NcAvatar from '@nextcloud/vue/components/NcAvatar'
import DOMPurify from 'dompurify'

import { getInquiryTypeData } from '../../helpers/modules/InquiryHelper.ts'
import type { Inquiry } from '../../Types/index.ts'
import { useSessionStore } from '../../stores/session.ts'
import { InquiryGeneralIcons, StatusIcons } from '../../utils/icons.ts'

interface Props {
  inquiry: Inquiry
  inquiries?: Inquiry[]
  
  // Display feature toggles
  showIcon?: boolean
  showCover?: boolean
  showMeta?: boolean
  showStats?: boolean
  showAuthor?: boolean
  showDescription?: boolean
  showExpiry?: boolean
  showType?: boolean
  showStatus?: boolean
  showComments?: boolean
  showSupport?: boolean
  showParticipants?: boolean
  
  // Display mode
  displayMode?: 'full' | 'book' | 'summary'
}

const props = withDefaults(defineProps<Props>(), {
  showIcon: true,
  showCover: true,
  showMeta: true,
  showStats: true,
  showAuthor: true,
  showDescription: true,
  showExpiry: true,
  showType: true,
  showStatus: true,
  showComments: true,
  showSupport: true,
  showParticipants: true,
  displayMode: 'full'
})

const emit = defineEmits<{
  click: [inquiry: Inquiry]
}>()

const sessionStore = useSessionStore()

// Import icon components
const InquiryGeneralIconsComponents = InquiryGeneralIcons

// Get type data
const inquiryTypes = computed(() => sessionStore.appSettings?.inquiryTypeTab || [])

const typeData = computed(() => getInquiryTypeData(props.inquiry.type, inquiryTypes.value))

const typeLabel = computed(() => typeData.value?.label || props.inquiry.type)

// Get type icon
const typeIconComponent = computed(() => {
  if (typeData.value?.icon) {
    const iconName = typeData.value.icon
    if (typeof iconName === 'string' && InquiryGeneralIconsComponents[iconName]) {
      return InquiryGeneralIconsComponents[iconName]
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
  
  const mappedIconName = iconMap[props.inquiry.type?.toLowerCase()] || 'FolderMultiple'
  return InquiryGeneralIconsComponents[mappedIconName]
})

// Status
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

const statusBadgeClass = computed(() => {
  const status = props.inquiry.status?.inquiryStatus
  const map: Record<string, string> = {
    'active': 'status-open',
    'open': 'status-open',
    'closed': 'status-closed',
    'draft': 'status-draft',
    'waiting_approval': 'status-waiting'
  }
  return map[status || ''] || 'status-unknown'
})

// Cover image
const coverUrl = computed(() => {
  if (!props.showCover) return ''
  if (!props.inquiry.coverId || props.inquiry.coverId === 0) return ''
  return getNextcloudPreviewUrl(props.inquiry.coverId)
})

function getNextcloudPreviewUrl(fileId: number, x = 1200, y = 400, autoScale = true) {
  const baseUrl = window.location.origin
  return `${baseUrl}/index.php/core/preview?fileId=${fileId}&x=${x}&y=${y}&a=${autoScale}`
}

// Expiry check
const isExpired = computed(() => {
  if (!props.inquiry.configuration?.expire) return false
  const now = Date.now() / 1000
  return props.inquiry.configuration.expire < now
})

// Location and Category paths
function getHierarchyPath(items, targetId) {
  if (!items || !Array.isArray(items)) return ''
  
  const itemMap = {}

  items.forEach((item) => {
    itemMap[item.id] = item
  })

  if (!itemMap[targetId]) {
    return itemMap[1]?.name || ''
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
  return locationPath.value.length > 30 
    ? `${locationPath.value.substring(0, 30)}…` 
    : locationPath.value
})

const truncatedCategory = computed(() => {
  if (!categoryPath.value) return ''
  return categoryPath.value.length > 30 
    ? `${categoryPath.value.substring(0, 30)}…` 
    : categoryPath.value
})

// Date formatting
const formattedDate = computed(() => {
  if (!props.inquiry.status?.created) return ''
  
  try {
    const date = new Date(props.inquiry.status.created * 1000)
    return date.toLocaleDateString('default', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch {
    return ''
  }
})

// Content
const sanitizedContent = computed(() => {
  if (!props.inquiry.description) {
    return `<div class="no-content">
              <p>${t('agora', 'No content available')}</p>
            </div>`
  }
  
  const content = props.inquiry.descriptionSafe || props.inquiry.description
  return DOMPurify.sanitize(content, {
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'br', 'strong', 'em', 'u', 's',
      'ul', 'ol', 'li',
      'blockquote', 'pre', 'code',
      'img', 'figure', 'figcaption',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'a', 'span', 'div',
      'hr'
    ],
    ALLOWED_ATTR: [
      'href', 'target', 'rel', 'title',
      'src', 'alt', 'width', 'height', 'loading',
      'class', 'id', 'style'
    ]
  })
})
</script>

<style lang="scss" scoped>
.inquiry-rich-html {
  border-radius: 12px;
  background: var(--color-main-background);
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
  border: 1px solid var(--color-border);
  
  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  }
  
  &.is-book {
    max-width: 800px;
    margin: 0 auto;
    
    .rich-content {
      font-size: 16px;
      line-height: 1.8;
      padding: 40px 48px;
    }
    
    .rich-meta {
      padding: 20px 32px;
    }
  }
}

// Cover Image Hero
.rich-cover {
  position: relative;
  height: 320px;
  width: 100%;
  overflow: hidden;
  
  @media (max-width: 768px) {
    height: 240px;
  }
  
  @media (max-width: 480px) {
    height: 200px;
  }
  
  .cover-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover .cover-image {
    transform: scale(1.02);
  }
  
  .cover-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.2) 0%,
      rgba(0, 0, 0, 0.6) 100%
    );
    display: flex;
    align-items: flex-end;
    padding: 32px;
    
    @media (max-width: 768px) {
      padding: 24px;
    }
    
    @media (max-width: 480px) {
      padding: 20px;
    }
  }
  
  .cover-content {
    width: 100%;
    color: white;
    
    .cover-type-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 20px;
      margin-bottom: 16px;
      backdrop-filter: blur(10px);
      transition: all 0.2s ease;
      
      &:hover {
        background: rgba(255, 255, 255, 0.95);
        transform: translateY(-1px);
      }
      
      .type-icon {
        color: var(--color-primary-element);
      }
      
      .type-label {
        font-size: 13px;
        font-weight: 600;
        color: var(--color-main-text);
      }
    }
    
    .cover-title {
      font-size: 36px;
      font-weight: 700;
      line-height: 1.2;
      margin: 0 0 12px 0;
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
      
      @media (max-width: 768px) {
        font-size: 28px;
      }
      
      @media (max-width: 480px) {
        font-size: 24px;
      }
    }
    
    .cover-meta {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
      font-size: 14px;
      opacity: 0.9;
      
      .cover-meta-item {
        display: flex;
        align-items: center;
        gap: 6px;
        
        svg {
          opacity: 0.8;
        }
      }
    }
  }
}

// Content Wrapper
.rich-content-wrapper {
  padding: 32px;
  background: var(--color-main-background);
  
  @media (max-width: 768px) {
    padding: 24px;
  }
  
  @media (max-width: 480px) {
    padding: 20px;
  }
  
  &.has-cover {
    padding-top: 32px;
    
    @media (max-width: 768px) {
      padding-top: 24px;
    }
  }
}

// Header (without cover)
.rich-header {
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 2px solid var(--color-border);
  
  @media (max-width: 768px) {
    margin-bottom: 24px;
    padding-bottom: 20px;
  }
  
  .header-top {
    display: flex;
    gap: 12px;
    align-items: center;
    margin-bottom: 16px;
    flex-wrap: wrap;
  }
  
  .type-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 14px;
    background: var(--color-main-background);
    border-radius: 20px;
    font-size: 13px;
    font-weight: 600;
    color: var(--color-primary-element);
    border: 1px solid var(--color-border);
    transition: all 0.2s ease;
    
    &:hover {
      background: var(--color-background-hover);
      border-color: var(--color-primary-element);
      transform: translateY(-1px);
    }
    
    .type-icon {
      color: var(--color-primary-element);
    }
  }
  
  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 12px;
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
  
  .rich-title {
    font-size: 36px;
    font-weight: 700;
    line-height: 1.3;
    color: var(--color-main-text);
    margin: 0;
    
    @media (max-width: 768px) {
      font-size: 28px;
    }
    
    @media (max-width: 480px) {
      font-size: 24px;
    }
  }
}

// Meta Information
.rich-meta {
  margin-bottom: 32px;
  padding: 20px 24px;
  background: var(--color-background-dark);
  border-radius: 10px;
  border: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  
  @media (max-width: 768px) {
    margin-bottom: 24px;
    padding: 16px 20px;
    flex-direction: column;
    align-items: stretch;
  }
  
  .meta-author {
    display: flex;
    align-items: center;
    gap: 16px;
    
    @media (max-width: 480px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }
    
    .author-avatar {
      flex-shrink: 0;
      border: 2px solid var(--color-main-background);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      transition: all 0.2s ease;
      
      &:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
      }
    }
    
    .author-info {
      flex: 1;
      
      .author-name {
        font-size: 16px;
        font-weight: 600;
        color: var(--color-main-text);
        margin-bottom: 6px;
      }
      
      .meta-details {
        display: flex;
        align-items: center;
        gap: 20px;
        flex-wrap: wrap;
        
        @media (max-width: 768px) {
          gap: 12px;
        }
        
        @media (max-width: 480px) {
          flex-direction: column;
          align-items: flex-start;
          gap: 6px;
        }
        
        .meta-date,
        .meta-location,
        .meta-category {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: var(--color-text-lighter);
          transition: color 0.2s ease;
          
          &:hover {
            color: var(--color-primary-element);
          }
          
          .date-icon,
          .location-icon,
          .category-icon {
            color: var(--color-text-maxcontrast);
            transition: color 0.2s ease;
          }
          
          &:hover .date-icon,
          &:hover .location-icon,
          &:hover .category-icon {
            color: var(--color-primary-element);
          }
        }
      }
    }
  }
  
  .rich-stats {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    
    .stat-item {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 13px;
      color: var(--color-text-lighter);
      
      svg {
        color: var(--color-text-maxcontrast);
      }
      
      .stat-label {
        font-size: 12px;
        color: var(--color-text-maxcontrast);
        margin-left: 2px;
      }
    }
  }
}

// Main HTML Content
.rich-content {
  font-size: 15px;
  line-height: 1.7;
  color: var(--color-text-lighter);
  padding: 0;
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
  
  :deep(*) {
    margin: 0 0 16px 0;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  :deep(h1) {
    font-size: 24px;
    font-weight: 700;
    color: var(--color-main-text);
    margin: 32px 0 20px 0;
    padding-bottom: 12px;
    border-bottom: 2px solid var(--color-border);
    
    &:first-child {
      margin-top: 0;
    }
    
    @media (max-width: 768px) {
      font-size: 22px;
      margin: 28px 0 16px;
    }
  }
  
  :deep(h2) {
    font-size: 20px;
    font-weight: 600;
    color: var(--color-main-text);
    margin: 28px 0 16px 0;
    
    @media (max-width: 768px) {
      font-size: 18px;
      margin: 24px 0 14px;
    }
  }
  
  :deep(h3) {
    font-size: 18px;
    font-weight: 600;
    color: var(--color-main-text);
    margin: 24px 0 14px 0;
    
    @media (max-width: 768px) {
      font-size: 16px;
      margin: 20px 0 12px;
    }
  }
  
  :deep(h4) {
    font-size: 16px;
    font-weight: 600;
    color: var(--color-main-text);
    margin: 20px 0 12px 0;
  }
  
  :deep(p) {
    margin-bottom: 16px;
    line-height: 1.7;
  }
  
  :deep(ul), :deep(ol) {
    padding-left: 24px;
    margin: 16px 0;
    
    @media (max-width: 768px) {
      padding-left: 20px;
    }
    
    li {
      margin-bottom: 8px;
      line-height: 1.6;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  
  :deep(blockquote) {
    border-left: 3px solid var(--color-primary-element);
    padding: 16px 20px;
    margin: 20px 0;
    background: var(--color-background-dark);
    border-radius: 0 6px 6px 0;
    font-style: italic;
    color: var(--color-text-lighter);
    position: relative;
    
    &::before {
      content: '"';
      position: absolute;
      top: -8px;
      left: -12px;
      font-size: 48px;
      color: var(--color-primary-element);
      opacity: 0.2;
      font-family: serif;
    }
    
    p {
      margin-bottom: 0;
      position: relative;
      z-index: 1;
    }
    
    cite {
      display: block;
      margin-top: 8px;
      font-size: 13px;
      color: var(--color-text-maxcontrast);
      font-style: normal;
      text-align: right;
      
      &::before {
        content: '— ';
      }
    }
  }
  
  :deep(code) {
    background: var(--color-background-dark);
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'SF Mono', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 13px;
    color: var(--color-main-text);
    border: 1px solid var(--color-border);
  }
  
  :deep(pre) {
    background: var(--color-background-dark);
    padding: 16px;
    border-radius: 6px;
    overflow-x: auto;
    margin: 20px 0;
    border: 1px solid var(--color-border);
    
    @media (max-width: 768px) {
      padding: 12px;
    }
    
    code {
      background: var(--color-main-background);
      padding: 0;
      font-size: 13px;
      line-height: 1.5;
      border: none;
      color: var(--color-main-text);
    }
  }
  
  :deep(img) {
    max-width: 100%;
    height: auto;
    border-radius: 6px;
    margin: 20px 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    
    &:hover {
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    }
  }
  
  :deep(figure) {
    margin: 20px 0;
    text-align: center;
    
    img {
      margin: 0 auto;
    }
    
    figcaption {
      text-align: center;
      font-size: 13px;
      color: var(--color-text-lighter);
      margin-top: 8px;
      font-style: italic;
      padding: 0 20px;
    }
  }
  
  :deep(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    border: 1px solid var(--color-border);
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    
    th, td {
      padding: 12px 16px;
      border: 1px solid var(--color-border);
      text-align: left;
      
      @media (max-width: 768px) {
        padding: 8px 12px;
      }
    }
    
    th {
      background: var(--color-background-dark);
      font-weight: 600;
      color: var(--color-main-text);
    }
    
    tr:nth-child(even) {
      background: var(--color-background-hover);
    }
    
    tr:hover {
      background: rgba(var(--color-primary-rgb), 0.05);
    }
  }
  
  :deep(a) {
    color: var(--color-primary-element);
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: all 0.2s ease;
    font-weight: 500;
    
    &:hover {
      border-bottom-color: var(--color-primary-element);
      color: var(--color-primary-element-dark);
    }
  }
  
  :deep(hr) {
    border: none;
    height: 1px;
    background: linear-gradient(
      to right,
      transparent,
      var(--color-border),
      transparent
    );
    margin: 32px 0;
  }
  
  :deep(.no-content) {
    text-align: center;
    padding: 48px 20px;
    color: var(--color-text-maxcontrast);
    font-style: italic;
    font-size: 15px;
    background: var(--color-background-dark);
    border-radius: 6px;
    border: 1px dashed var(--color-border);
    
    p {
      margin: 0;
      opacity: 0.7;
    }
  }
}

// Expiry Warning
.expiry-warning {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.08), rgba(239, 68, 68, 0.04));
  border-radius: 8px;
  border: 1px solid rgba(239, 68, 68, 0.2);
  margin-top: 32px;
  color: #ef4444;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.2s ease;
  
  &:hover {
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.12), rgba(239, 68, 68, 0.06));
    box-shadow: 0 2px 8px rgba(239, 68, 68, 0.1);
  }
  
  .warning-icon {
    color: #ef4444;
    flex-shrink: 0;
  }
  
  span {
    flex: 1;
  }
}

// Responsive
@media (max-width: 768px) {
  .inquiry-rich-html.is-book .rich-content {
    padding: 24px 20px;
  }
  
  .inquiry-rich-html.is-book .rich-meta {
    padding: 16px 20px;
  }
}

@media print {
  .inquiry-rich-html {
    box-shadow: none;
    border: 1px solid #ddd;
  }
  
  .rich-cover {
    height: 200px;
  }
  
  .cover-overlay {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.4) 100%);
  }
  
  .rich-content-wrapper {
    padding: 20px;
  }
}
</style>
