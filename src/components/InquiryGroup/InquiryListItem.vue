<!--
- SPDX-FileCopyrightText: 2025 Nextcloud contributors
- SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <!-- When inquiry exists, render the list item -->
  <NcListItem
    v-if="inquiry"
    :name="inquiry.title"
    :details="listItemDetails"
    :active="isActiveListItem"
    :bold="isBold"
    :aria-label="listItemAriaLabel"
    @click="handleClick"
  >
    <!-- Icon slot -->
    <template #icon>
      <component :is="typeIconComponent" :size="20" />
    </template>

    <!-- Subtitle with metadata -->
    <template #subname>
      <div class="inquiry-subtitle">
        <!-- Short Description (2 lines max) -->
        <span v-if="shortDescription" class="subtitle-description">
          {{ shortDescription }}
        </span>
      </div>
    </template>
    
    <!-- Details slot - Status and dates -->
    <template #details>
      <div class="inquiry-details">
        <!-- Owner -->
        <span class="detail-item owner">
          {{ ownerDisplayName }}
        </span>
        
        <!-- Creation date -->
        <span v-if="formattedCreationDate" class="detail-item date">
          {{ formattedCreationDate }}
        </span>
        
        <!-- Expiry -->
        <span v-if="showExpiryBadge" class="subtitle-expiry" :class="expiryBadgeClass">
          <component :is="InquiryGeneralIcons.ClockOutline" class="expiry-icon" :size="12" />
          {{ expiryText }}
        </span>
      </div>
    </template>
  </NcListItem>

  <!-- Fallback when inquiry is null/undefined -->
  <div v-else class="inquiry-placeholder">
    <span class="placeholder-icon">📄</span>
    <span class="placeholder-text">{{ t('agora', 'Inquiry not available') }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { t } from '@nextcloud/l10n'
import NcListItem from '@nextcloud/vue/components/NcListItem'

import { getInquiryTypeData } from '../../helpers/modules/InquiryHelper.ts'
import type { Inquiry } from '../../Types/index.ts'
import { useSessionStore } from '../../stores/session.ts'
import { InquiryGeneralIcons } from '../../utils/icons.ts'
import { DateTime } from 'luxon'

interface Props {
  inquiry: Inquiry
  isActive?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isActive: false
})

const emit = defineEmits<{
  click: [inquiry: Inquiry]
}>()

const sessionStore = useSessionStore()

// Import icon components from utils/icons.ts
const InquiryGeneralIconsComponents = InquiryGeneralIcons

// ============================================================
// LIST ITEM PROPERTIES - with null guards
// ============================================================

const listItemDetails = computed(() => {
  // Guard: if no inquiry, return empty string
  if (!props.inquiry) return ''
  
  const details = []
  if (props.inquiry.owner?.displayName || props.inquiry.ownedGroup) {
    details.push(ownerDisplayName.value)
  }
  if (props.inquiry.status?.created) {
    details.push(formattedCreationDate.value)
  }
  return details.join(' • ')
})

const isActiveListItem = computed(() => {
  // Guard: if no inquiry, return false
  if (!props.inquiry) return false
  return props.isActive || props.inquiry.currentUserStatus?.hasSupported || false
})

const isBold = computed(() => {
  // Guard: if no inquiry, return false
  if (!props.inquiry) return false
  return props.inquiry.status?.inquiryStatus === 'open' && !props.inquiry.currentUserStatus?.hasRead
})

const listItemAriaLabel = computed(() => {
  if (!props.inquiry) {
    return t('agora', 'Inquiry not available')
  }
  return t('agora', 'Inquiry: {title}. Created by {owner}', {
    title: props.inquiry.title,
    owner: ownerDisplayName.value
  })
})

// ============================================================
// OWNER DISPLAY - with null guard
// ============================================================

const ownerDisplayName = computed(() => {
  if (!props.inquiry) return ''
  return props.inquiry.ownedGroup || props.inquiry.owner?.displayName || ''
})

// ============================================================
// TYPE ICON - with null guard
// ============================================================

const inquiryTypes = computed(() => sessionStore.appSettings?.inquiryTypeTab || [])

const typeData = computed(() => {
  if (!props.inquiry) return null
  return getInquiryTypeData(props.inquiry.type, inquiryTypes.value)
})

const typeIconComponent = computed(() => {
  // Guard: if no inquiry, return default icon
  if (!props.inquiry) return InquiryGeneralIconsComponents.FolderMultiple
  
  if (typeData.value?.icon) {
    const iconName = typeData.value.icon
    if (typeof iconName === 'string' && InquiryGeneralIconsComponents[iconName]) {
      return InquiryGeneralIconsComponents[iconName]
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

// ============================================================
// SHORT DESCRIPTION - with null guard
// ============================================================

const shortDescription = computed(() => {
  if (!props.inquiry?.description) return ''
  
  const plainText = props.inquiry.description.replace(/<[^>]*>/g, '')
  
  if (plainText.length > 100) {
    return `${plainText.substring(0, 100)}…`
  }
  
  return plainText
})

// ============================================================
// DATE FORMATTING - with null guard
// ============================================================

const formattedCreationDate = computed(() => {
  if (!props.inquiry?.status?.created) return ''
  try {
    return DateTime.fromMillis(props.inquiry.status.created * 1000).toLocaleString(DateTime.DATE_MED)
  } catch {
    return ''
  }
})

// ============================================================
// EXPIRY - with null guards
// ============================================================

const showExpiryBadge = computed(() => {
  if (!props.inquiry?.configuration?.expire) return false
  return props.inquiry.configuration.expire > 0
})

const expiryText = computed(() => {
  if (!props.inquiry?.configuration?.expire) return ''
  
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
  if (!props.inquiry?.configuration?.expire) return ''
  
  const expiryDate = new Date(props.inquiry.configuration.expire * 1000)
  const now = new Date()
  const diff = expiryDate.getTime() - now.getTime()
  const hours = diff / (1000 * 60 * 60)
  
  if (hours < 24) return 'expiry-soon'
  if (hours < 72) return 'expiry-warning'
  return 'expiry-normal'
})

// ============================================================
// HANDLERS - with null guard
// ============================================================

function handleClick() {
  // Only emit if we have a valid inquiry
  if (props.inquiry) {
    emit('click', props.inquiry)
  }
}
</script>

<style lang="scss" scoped>
// Custom subtitle styling
.inquiry-subtitle {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
  color: var(--color-text-lighter);
  line-height: 1.4;
  margin-top: 4px;

  .subtitle-description {
    white-space: normal;
    line-height: 1.4;
    color: var(--color-text-lighter);
    font-size: 13px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 2px;
    max-height: 2.8em;
    line-height: 1.4em;
  }
}

// Details styling
.inquiry-details {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 4px;
  flex-wrap: wrap;

  .detail-item {
    font-size: 12px;
    color: var(--color-text-lighter);
    
    &.owner {
      font-weight: 500;
      color: var(--color-text-lighter);
    }
    
    &.date {
      color: var(--color-text-maxcontrast);
    }
  }

  .subtitle-expiry {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 11px;

    .expiry-icon {
      color: inherit;
    }

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
  }
}

// List Item Container
:deep(.list-item) {
  padding: 14px 16px;
  min-height: 80px;
  border: 2px solid var(--color-border);
  border-radius: 12px;
  margin-bottom: 8px;
  background: var(--color-main-background);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
    border-color: var(--color-primary-element);
    background: var(--color-background-hover);
  }

  &.active {
    background: linear-gradient(135deg, var(--color-primary-element-light), rgba(var(--color-primary-rgb), 0.05));
    border-left: 4px solid var(--color-primary-element);
    border-color: var(--color-primary-element);
    box-shadow: 0 4px 16px rgba(var(--color-primary-rgb), 0.15);
  }
}

// Enhanced content styling
:deep(.list-item__content) {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

:deep(.list-item__title) {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-main-text);
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 4px;
}

:deep(.list-item__subtitle) {
  margin-top: 0;
}

// Icon styling
:deep(.list-item__icon) {
  width: 32px;
  height: 32px;
  min-width: 32px;
  border-radius: 8px;
  background: linear-gradient(135deg, #3b82f6, #60a5fa);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  box-shadow: 0 2px 6px rgba(59, 130, 246, 0.3);

  svg {
    color: white;
  }
}

// ============================================================
// FALLBACK PLACEHOLDER STYLES
// ============================================================

.inquiry-placeholder {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  min-height: 80px;
  border: 2px dashed var(--color-border);
  border-radius: 12px;
  margin-bottom: 8px;
  background: var(--color-background-dark);
  color: var(--color-text-lighter);
  opacity: 0.7;

  .placeholder-icon {
    font-size: 20px;
    opacity: 0.5;
  }

  .placeholder-text {
    font-size: 14px;
    font-style: italic;
  }
}

// ============================================================
// RESPONSIVE
// ============================================================

@media (max-width: 768px) {
  .inquiry-subtitle {
    font-size: 12px;

    .subtitle-description {
      font-size: 12px;
      -webkit-line-clamp: 1;
      max-height: 1.4em;
    }
  }

  .inquiry-details {
    gap: 8px;

    .detail-item {
      font-size: 11px;
    }
  }

  :deep(.list-item) {
    padding: 12px 14px;
    min-height: 76px;
    border-width: 1px;
    border-radius: 10px;
  }

  :deep(.list-item__title) {
    font-size: 15px;
  }

  :deep(.list-item__icon) {
    width: 28px;
    height: 28px;
    min-width: 28px;
    margin-right: 10px;
  }

  .inquiry-placeholder {
    padding: 12px 14px;
    min-height: 76px;
    
    .placeholder-icon {
      font-size: 18px;
    }
    
    .placeholder-text {
      font-size: 13px;
    }
  }
}

@media (max-width: 480px) {
  .inquiry-subtitle {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;

    .subtitle-description {
      -webkit-line-clamp: 1;
      margin-bottom: 0;
    }
  }

  .inquiry-details {
    gap: 8px;
    flex-wrap: wrap;
    justify-content: space-between;

    .subtitle-expiry {
      margin-top: 4px;
    }
  }

  :deep(.list-item) {
    padding: 10px 12px;
    min-height: 72px;
  }

  :deep(.list-item__icon) {
    width: 24px;
    height: 24px;
    min-width: 24px;
    margin-right: 8px;
  }

  .inquiry-placeholder {
    padding: 10px 12px;
    min-height: 72px;
    gap: 8px;
    
    .placeholder-icon {
      font-size: 16px;
    }
    
    .placeholder-text {
      font-size: 12px;
    }
  }
}
</style>
