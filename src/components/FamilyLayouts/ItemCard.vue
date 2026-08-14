<!--
  SPDX-FileCopyrightText: 2024 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
  <div 
    v-if="item" 
    :class="[
      'item-card',
      `type-${itemType}`,
      { 
        'compact': compact,
        'inline': inline,
        'official': official,
        'highlight': highlight,
        'show-poll': showPoll,
        'has-support': hasSupportFeature,
        'has-comments': allowComment,
        'has-progress-bar': progressBar 
      }
    ]"
    @click="handleCardClick"
  >
    <!-- First Box: Header with icon, date, and actions -->
    <div class="card-header">
      <!-- Left side: Type icon and date -->
      <div class="header-left">
        <div class="type-icon" :style="{ color: itemTypeColor }">
          <component :is="itemIcon" :size="compact ? 16 : 20" />
        </div>
        
        <div class="header-meta">
          <span class="item-type-label">{{ itemTypeLabel }}</span>
          <span class="timestamp">{{ formatDate(itemCreatedAt) }}</span>
        </div>
      </div>
      
      <!-- Right side: Actions menu - only in normal mode -->
      <div v-if="!inline && canEditOrDelete && showAction" class="header-right" @click.stop>
        <NcActions
          v-if="canEditOrDelete"
          :force-menu="true"
          :aria-label="t('agora', 'Item actions')"
          class="card-actions"
        >
          <!-- Delete action -->
          <NcActionButton
            v-if="canDelete"
            :close-after-click="true"
            @click="confirmDelete"
          >
            <template #icon>
              <component :is="InquiryOptionIcons.Delete" :size="20" />
            </template>
            {{ t('agora', 'Delete') }}
          </NcActionButton>
        </NcActions>
      </div>
    </div>

    <!-- Second Box: Title and Description -->
    <div class="card-content">
      <!-- Title -->
      <div v-if="showTitle" class="content-section title-section">
        <h3 class="card-title">{{ itemTitle }}</h3>
      </div>
      
      <!-- Description/Text -->
      <div v-if="itemText && (!compact || !showTitle)" class="content-section description-section">
        <div class="card-text">
          {{ truncateText(itemText, textMaxLength) }}
        </div>
      </div>
    </div>

    <!-- Progress Bar Section - Only shown when progressBar is true -->
    <div v-if="progressBar" class="progress-bar-section">
      <div class="progress-bar-container">
        <div 
          class="progress-bar-fill" 
          :style="{ width: `${progressPercentage}%` }"
        ></div>
      </div>
      <div class="progress-stats">
        <span class="progress-label">{{ t('agora', 'Progress') }}</span>
        <span class="progress-percentage">{{ Math.round(progressPercentage) }}%</span>
      </div>
    </div>

    <!-- Separator - hide in inline mode -->
    <div v-if="!inline" class="section-separator"></div>

    <!-- Support and Comments in single line (normal mode) -->
    <div v-if="!inline && (hasSupportFeature || allowComment) && !progressBar" class="card-features">
      <!-- Support feature -->
      <div v-if="hasSupportFeature" class="feature-item support-feature">
        <SupportFeature
          :item="item"
          :item-type="targetType"
          :context="itemContext"
          :show-quorum="true"
          :show-details-on-hover="true"
          :icon-size="compact ? 12 : 14"
          @click.stop
        />
      </div>
      
      <!-- Comments feature -->
      <div v-if="allowComment" class="feature-item comments-feature" @click.stop="$emit('comment', item)">
        <div class="feature-content">
          <component :is="InquiryOptionIcons.Comment" :size="compact ? 14 : 16" class="feature-icon" />
          <span class="feature-count">{{ commentCount }}</span>
        </div>
      </div>
    </div>

    <!-- Child items (responses) -->
    <div v-if="!inline && hasChildItems && !compact && !progressBar" class="card-children">
      <div class="children-header">
        <component :is="InquiryOptionIcons.MessageReplyText" :size="14" />
        <span class="children-title">{{ t('agora', 'Responses') }}</span>
      </div>

      <div class="children-list">
        <div v-if="childItemsTotal === 0" class="no-children">
          <span class="no-children-text">{{ t('agora', 'None') }}</span>
        </div>

        <div v-else class="children-summary">
          <div 
            v-for="childType in childItemTypes" 
            :key="childType"
            class="child-type-summary"
            @mouseenter="showChildTooltip(childType)"
            @mouseleave="hideChildTooltip"
            @click.stop="$emit('viewChildren', item, childType)"
          >
            <div class="child-type-info">
              <component :is="getChildItemTypeIcon(childType)" :size="inline ? 10 : 12" />
              <span class="child-count">{{ childItemsByType[childType] || 0 }}</span>
            </div>
            
            <!-- Tooltip showing child items of this type -->
            <div v-if="activeTooltip === childType && childItemsByType[childType] > 0" class="child-tooltip">
              <div class="tooltip-header">
                <strong>{{ getChildItemTypeLabel(childType) }}</strong>
                <span class="tooltip-count">{{ childItemsByType[childType] }} {{ t('agora', 'items') }}</span>
              </div>
              <div class="tooltip-children">
                <div 
                  v-for="child in getChildrenByType(childType)" 
                  :key="child.id"
                  class="tooltip-child-item"
                  @click.stop="$emit('click', child)"
                >
                  <component :is="getChildItemTypeIcon(child.type)" :size="10" />
                  <span class="child-title">{{ getItemTitle(child) }}</span>
                </div>
                <div v-if="childItemsByType[childType] > 3" class="tooltip-more">
                  {{ t('agora', 'and {count} more …', { count: childItemsByType[childType] - 3 }) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Inline mode features row -->
    <div v-if="inline" class="inline-features-row">
      <!-- Child responses -->
      <div v-if="hasChildItems && !compact && !progressBar" class="inline-feature-item child-items">
        <div class="children-list">
          <div v-if="childItemsTotal === 0" class="no-children">
            <span class="no-children-text">{{ t('agora', 'None') }}</span>
          </div>

          <div v-else class="children-summary">
            <div 
              v-for="childType in childItemTypes" 
              :key="childType"
              class="child-type-summary"
              @mouseenter="showChildTooltip(childType)"
              @mouseleave="hideChildTooltip"
              @click.stop="$emit('viewChildren', item, childType)"
            >
              <div class="child-type-info">
                <component :is="getChildItemTypeIcon(childType)" :size="10" />
                <span class="child-count">{{ childItemsByType[childType] || 0 }}</span>
              </div>
              
              <!-- Tooltip showing child items of this type -->
              <div v-if="activeTooltip === childType && childItemsByType[childType] > 0" class="child-tooltip">
                <div class="tooltip-header">
                  <strong>{{ getChildItemTypeLabel(childType) }}</strong>
                  <span class="tooltip-count">{{ childItemsByType[childType] }} {{ t('agora', 'items') }}</span>
                </div>
                <div class="tooltip-children">
                  <div 
                    v-for="child in getChildrenByType(childType)" 
                    :key="child.id"
                    class="tooltip-child-item"
                    @click.stop="$emit('click', child)"
                  >
                    <component :is="getChildItemTypeIcon(child.type)" :size="10" />
                    <span class="child-title">{{ getItemTitle(child) }}</span>
                  </div>
                  <div v-if="childItemsByType[childType] > 3" class="tooltip-more">
                    {{ t('agora', 'and {count} more …', { count: childItemsByType[childType] - 3 }) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Support feature -->
      <div v-if="hasSupportFeature" class="inline-feature-item support-feature">
        <SupportFeature
          :item="item"
          :item-type="targetType"
          :context="itemContext"
          :show-quorum="true"
          :show-details-on-hover="true"
          :icon-size="12"
          @click.stop
        />
      </div>
      
      <!-- Comments feature -->
      <div v-if="allowComment && !progressBar" class="inline-feature-item comments-feature" @click.stop="$emit('comment', item)">
        <div class="feature-content">
          <component :is="InquiryOptionIcons.Comment" :size="14" class="feature-icon" />
          <span class="feature-count">{{ commentCount }}</span>
        </div>
      </div>

      <!-- Spacer to push actions to the right -->
      <div class="inline-spacer"></div>

      <!-- Actions menu for inline mode -->
      <div v-if="canEditOrDelete && showAction" class="inline-actions" @click.stop>
        <NcActions
          :force-menu="true"
          :aria-label="t('agora', 'Item actions')"
          class="card-actions"
        >
          <!-- Delete action -->
          <NcActionButton
            v-if="canDelete"
            :close-after-click="true"
            @click="confirmDelete"
          >
            <template #icon>
              <component :is="InquiryOptionIcons.Delete" :size="20" />
            </template>
            {{ t('agora', 'Delete') }}
          </NcActionButton>
        </NcActions>
      </div>
    </div>

    <!-- Footer: Owner info -->
    <div v-if="!inline" class="card-footer">
      <div class="owner-info">
        <NcAvatar
          v-if="ownerId"
          :user="ownerId"
          :display-name="ownerName"
          :size="18"
        />
        <span class="owner-name">{{ ownerName || t('agora', 'Unknown owner') }}</span>
      </div>
    </div>
  </div>
  <DeleteConfirmationDialog
    v-model:visible="showDeleteDialog"
    :item-title="itemTitle"
    :is-imported="isImportedFromView"
    :view-type="familyType || 'view'"
    @confirm="handleConfirmDelete"
    @remove-from-view="handleRemoveFromView"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { t } from '@nextcloud/l10n'
import NcAvatar from '@nextcloud/vue/components/NcAvatar'
import NcActions from '@nextcloud/vue/components/NcActions'
import NcActionButton from '@nextcloud/vue/components/NcActionButton'
import { SupportFeature } from '../Base/index.ts'

import { useOptionsStore } from '../../stores/options'
import { useInquiriesStore } from '../../stores/inquiries'
import { useSessionStore } from '../../stores/session'
import { showSuccess, showError } from '@nextcloud/dialogs'
import { InquiryOptionIcons } from '../../utils/icons.ts'
import { 
  createOptionContext,
  canEditOption,
  canDeleteOption,
} from '../../utils/permissions.ts'

// Types
import type { Option, Inquiry } from '../../Types/index.ts'
import {
  getItemTitle,
  getItemStatus,
  getItemType,
  getItemFamily,
  getForceLayouts,
  removeLayoutFromItem
} from '../../helpers/modules/GenericItemHelper'

import {
  getOptionTypeLabel,
  getOptionTypeIconComponent,
  getOptionTypeColor,
  getAllowedResponses,
  hasSupportFeature as hasSupportFeatureHelper,
  allowsComments,
  usesTitle
} from '../../helpers/modules/InquiryOptionHelper'

import DeleteConfirmationDialog from '../Modals/DeleteConfirmationDialog.vue'

export type TargetType = 'option' | 'inquiry'

// Props
const props = defineProps<{
  item: (Option | Inquiry) & {
    currentUserStatus?: {
      hasSupported: boolean
      supportValue: number | null
    }
  }
  parentId: number
  targetType: TargetType
  compact?: boolean
  inline?: boolean
  official?: boolean
  highlight?: boolean
  showPoll?: boolean
  showAction?: boolean
  preventClick?: boolean
  textMaxLength?: number
  progressBar?: boolean
  familyType?: string
}>()

// Emits
const emit = defineEmits<{
  click: [item: Option | Inquiry]
  edit: [item: Option | Inquiry]
  delete: [itemId: number]
  supportChanged: [itemId: number, support: string]
  comment: [item: Option | Inquiry]
  viewChildren: [item: Option | Inquiry, childType: string]
  removeFromView: [itemId: number, updatedForceLayouts: string[]]
}>()

// Defaults
const textMaxLength = props.textMaxLength || 200

// Stores
const optionsStore = useOptionsStore()
const inquiriesStore = useInquiriesStore()
const sessionStore = useSessionStore()

const showDeleteDialog = ref(false)

const confirmDelete = () => {
  showDeleteDialog.value = true
}

const handleConfirmDelete = () => {
  deleteItem()
}

const handleRemoveFromView = () => {
  removeFromCurrentView()
}

// Item properties using generic helpers
const itemTitle = computed(() => getItemTitle(props.item))
const itemStatus = computed(() => getItemStatus(props.item))
const itemType = computed(() => getItemType(props.item))
const itemFamily = computed(() => getItemFamily(props.item))
const itemText = computed(() => {
  if ('text' in props.item && props.item.text) return props.item.text
  if ('description' in props.item && props.item.description) return props.item.description
  return ''
})
const itemCreatedAt = computed(() => {
  if ('created' in props.item && props.item.created) return props.item.created
  if ('status' in props.item && props.item.status && typeof props.item.status === 'object' && 'created' in props.item.status) {
    return (props.item.status as { created: number }).created
  }
  return Date.now()
})

// Owner info
const ownerId = computed(() => {
  if ('owner' in props.item && props.item.owner && typeof props.item.owner === 'object' && 'id' in props.item.owner) {
    return (props.item.owner as { id: string }).id
  }
  return null
})

const ownerName = computed(() => {
  if ('owner' in props.item && props.item.owner && typeof props.item.owner === 'object' && 'displayName' in props.item.owner) {
    return (props.item.owner as { displayName: string }).displayName
  }
  return null
})

// Comment count
const commentCount = computed(() => {
  if ('status' in props.item && props.item.status && typeof props.item.status === 'object' && 'countComments' in props.item.status) {
    return (props.item.status as { countComments: number }).countComments || 0
  }
  return 0
})

// Create context once as computed
const itemContext = computed(() => {
  if (!props.item) return null
  return createOptionContext(props.item)
})

// Permission checks as computed properties
const canEdit = computed(() => {
  if (!props.item || itemContext.value === null) return false
  return canEditOption(itemContext.value)
})

const canDelete = computed(() => {
  if (!props.item || itemContext.value === null) return false
  return canDeleteOption(itemContext.value)
})

const canEditOrDelete = computed(() => canEdit.value || canDelete.value)

// Get item types from session store
const allItemTypes = computed(() => sessionStore.appSettings?.inquiryOptionTypeTab || [])

const itemTypeLabel = computed(() => {
  if (!props.item || !allItemTypes.value) {
    return props.targetType === 'option' ? t('agora', 'Option') : t('agora', 'Inquiry')
  }
  return getOptionTypeLabel(itemType.value, allItemTypes.value, props.targetType === 'option' ? t('agora', 'Option') : t('agora', 'Inquiry'))
})

const itemIcon = computed(() => {
  if (!props.item || !allItemTypes.value) {
    return InquiryOptionIcons.Default
  }
  return getOptionTypeIconComponent(itemType.value, allItemTypes.value)
})

const itemTypeColor = computed(() => {
  if (!props.item || !allItemTypes.value) {
    return 'var(--color-text-light)'
  }
  return getOptionTypeColor(itemType.value, allItemTypes.value)
})

const showTitle = computed(() => {
  if (props.targetType === 'inquiry') return true
  return usesTitle(itemType.value, allItemTypes.value)
})

const allowComment = computed(() => {
  if (props.targetType === 'inquiry') return true
  return allowsComments(itemType.value, allItemTypes.value)
})

const hasSupportFeature = computed(() => {
  if (props.targetType === 'inquiry') return false
  return hasSupportFeatureHelper(itemType.value, allItemTypes.value)
})

// Get allowed child item types
const allowedChildTypes = computed(() => {
  if (props.targetType === 'inquiry') return []
  return getAllowedResponses(itemType.value, allItemTypes.value)
})

const getChildItemTypeIcon = (type: string) => getOptionTypeIconComponent(type, allItemTypes.value)

const getChildItemTypeLabel = (type: string) => getOptionTypeLabel(type, allItemTypes.value, type)

const useTitle = computed(() => {
  if (props.targetType === 'inquiry') return true
  return usesTitle(itemType.value, allItemTypes.value)
})

const progressPercentage = computed(() => {
  if (!props.progressBar) return 0

  if ('status' in props.item && props.item.status && typeof props.item.status === 'object' && 'supportCount' in props.item.status) {
    const maxSupport = (props.item as Option).maxSupport || 100
    return Math.min(100, (((props.item.status as { supportCount: number }).supportCount || 0) / maxSupport) * 100)
  }

  return 50
})

const hasChildItems = computed(() => {
  if (props.targetType === 'inquiry') return false
  return allowedChildTypes.value.length > 0
})

// Get child items (for options only)
const childItems = computed(() => {
  if (props.targetType === 'inquiry' || !props.item?.id) return []
  return optionsStore.options.filter(opt => opt.parentId === props.item.id)
})

const childItemsByType = computed(() => {
  const counts: Record<string, number> = {}

  if (props.targetType === 'inquiry' || !props.item.id) return counts

  // Initialize counts for allowed child types
  allowedChildTypes.value.forEach((type: string) => {
    counts[type] = 0
  })

  // Count children by type
  childItems.value.forEach(child => {
    if (counts[child.type] !== undefined) {
      counts[child.type] = (counts[child.type] || 0) + 1
    }
  })

  return counts
})

const childItemsTotal = computed(() => 
  Object.values(childItemsByType.value).reduce((sum, count) => sum + count, 0)
)

const childItemTypes = computed(() => 
  Object.keys(childItemsByType.value).filter(type => childItemsByType.value[type] > 0)
)

// Tooltip state
const activeTooltip = ref<string | null>(null)

const showChildTooltip = (type: string) => {
  activeTooltip.value = type
}

const hideChildTooltip = () => {
  activeTooltip.value = null
}

const getChildrenByType = (type: string) => 
  childItems.value
    .filter(child => child.type === type)
    .slice(0, 3)

// Helper methods
const formatDate = (timestamp: number) => {
  let date = new Date()
  if (timestamp) date = new Date(timestamp * 1000)
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

const isImportedFromView = computed(() => itemFamily.value !== props.familyType)

const truncateText = (text: string, maxLength: number) => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return `${text.substring(0, maxLength)}...`
}

const handleCardClick = () => {
  if (!props.preventClick) {
    emit('click', props.item)
  }
}

const deleteItem = async () => {
  try {
    if (props.targetType === 'option') {
      await optionsStore.deleteOption(props.item.id)
    } else {
      await inquiriesStore.deleteInquiry(props.item.id)
    }
    
    emit('delete', props.item.id)
    showSuccess(t('agora', 'Item deleted successfully'))
  } catch (err) {
    console.error('Error deleting item:', err)
    showError(t('agora', 'Failed to delete item'))
  }
}

const removeFromCurrentView = async () => {
  try {
    const updatedItem = removeLayoutFromItem(props.item, props.familyType || '')

    if (props.targetType === 'option') {
      await optionsStore.updateOption({
        ...props.item,
        miscFields: updatedItem.miscFields
      })
    } else {
      await inquiriesStore.updateInquiry({
        id: props.item.id,
        miscFields: updatedItem.miscFields
      })
    }

    const forceLayouts = getForceLayouts(updatedItem)
    emit('removeFromView', props.item.id, forceLayouts)
    showSuccess(t('agora', 'Item removed from view'))
  } catch (err) {
    console.error('Error removing item from view:', err)
    showError(t('agora', 'Failed to remove item from view'))
  }
}
</script>

<style scoped lang="scss">
.item-card {
  background: var(--color-main-background);
  border: 2px solid var(--color-border);
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  margin-bottom: 8px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-color: var(--color-primary-element);
  }

  &.compact {
    padding: 12px;

    .card-features,
    .card-children,
    .card-footer {
      display: none;
    }

    .card-content {
      .description-section {
        display: block;
        -webkit-line-clamp: 1;
      }
    }
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    min-height: 32px;

    .header-left {
      display: flex;
      align-items: center;
      gap: 10px;
      flex: 1;
      min-width: 0;

      .type-icon {
        flex-shrink: 0;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--color-background-darker);
        border-radius: 8px;
      }

      .header-meta {
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 0;

        .item-type-label {
          font-size: 13px;
          font-weight: 600;
          color: var(--color-text-light);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .timestamp {
          font-size: 11px;
          color: var(--color-text-lighter);
        }
      }
    }

    .header-right {
      flex-shrink: 0;
      margin-left: 8px;

      .card-actions {
        :deep(button) {
          background: transparent;
          border: none;
          padding: 4px;
          color: var(--color-text-lighter);
          cursor: pointer;

          &:hover {
            color: var(--color-primary-element);
          }
        }
      }
    }
  }

  .card-content {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 12px;

    .content-section {
      &.title-section {
        .card-title {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
          color: var(--color-main-text);
          line-height: 1.4;
          word-break: break-word;
        }
      }

      &.description-section {
        .card-text {
          margin: 0;
          font-size: 13px;
          line-height: 1.5;
          color: var(--color-text-light);
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
  }

  .section-separator {
    height: 1px;
    background: var(--color-border);
    margin: 0 0 12px 0;
  }

  .card-features {
    display: flex;
    align-items: center;
    gap: 24px;
    margin-bottom: 12px;
    min-height: 32px;

    .feature-item {
      display: flex;
      align-items: center;
      height: 52px;

      &.support-feature {
        :deep(.support-feature-container) {
          display: flex;
          align-items: center;
          height: 100%;
          gap: 6px;

          .support-button {
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;

            svg {
              width: 16px;
              height: 16px;
            }
          }

          .support-stats {
            display: flex;
            align-items: center;
            gap: 4px;
            font-size: 12px;

            .stat-value {
              font-weight: 600;
            }
          }
        }
      }

      &.comments-feature {
        .feature-content {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: 6px;
          transition: background-color 0.2s ease;
          cursor: pointer;
          height: 28px;

          &:hover {
            background: var(--color-background-hover);
          }

          .feature-icon {
            color: var(--color-text-lighter);
            width: 26px;
            height: 26px;
            flex-shrink: 0;
          }

          .feature-count {
            font-size: 12px;
            font-weight: 600;
            color: var(--color-text-light);
          }
        }
      }
    }
  }

  .card-children {
    margin-bottom: 12px;

    .children-header {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 8px;

      .children-title {
        font-size: 12px;
        font-weight: 600;
        color: var(--color-text-light);
      }
    }

    .children-list {
      .no-children {
        padding: 6px 10px;
        background: var(--color-background-dark);
        border: 1px solid var(--color-border);
        border-radius: 8px;
        font-size: 11px;
        color: var(--color-text-lighter);
        font-style: italic;
        text-align: center;
      }

      .children-summary {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;

        .child-type-summary {
          position: relative;
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 4px 8px;
          background: var(--color-background-dark);
          border: 1px solid var(--color-border);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 11px;

          &:hover {
            background: var(--color-background-darker);
            border-color: var(--color-primary-element);
          }

          .child-type-info {
            display: flex;
            align-items: center;
            gap: 4px;

            svg {
              width: 14px;
              height: 14px;
            }

            .child-count {
              font-weight: 600;
              color: var(--color-primary-element);
              font-size: 11px;
            }
          }

          .child-tooltip {
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            margin-bottom: 8px;
            background: var(--color-main-background);
            border: 1px solid var(--color-border);
            border-radius: 8px;
            padding: 8px;
            min-width: 200px;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            animation: fadeIn 0.2s ease-out;

            &::after {
              content: '';
              position: absolute;
              top: 100%;
              left: 50%;
              transform: translateX(-50%);
              border-width: 6px;
              border-style: solid;
              border-color: var(--color-main-background) transparent transparent transparent;
            }

            .tooltip-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding-bottom: 6px;
              margin-bottom: 6px;
              border-bottom: 1px solid var(--color-border);

              strong {
                font-size: 12px;
                color: var(--color-main-text);
              }

              .tooltip-count {
                font-size: 11px;
                color: var(--color-text-lighter);
              }
            }

            .tooltip-children {
              .tooltip-child-item {
                display: flex;
                align-items: center;
                gap: 6px;
                padding: 4px 6px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 11px;

                &:hover {
                  background: var(--color-background-hover);
                }

                .child-title {
                  color: var(--color-text-light);
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  max-width: 180px;
                }
              }

              .tooltip-more {
                padding: 4px 6px;
                font-size: 10px;
                color: var(--color-text-lighter);
                font-style: italic;
              }
            }
          }
        }
      }
    }
  }

  .progress-bar-section {
    margin: 8px 0 12px 0;
    
    .progress-bar-container {
      background: var(--color-background-dark);
      border-radius: 10px;
      height: 8px;
      overflow: hidden;
      margin-bottom: 6px;
      
      .progress-bar-fill {
        background: linear-gradient(90deg, var(--color-primary-element-light), var(--color-primary-element));
        height: 100%;
        border-radius: 10px;
        transition: width 0.3s ease;
        position: relative;
        
        &::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, 
            rgba(255, 255, 255, 0.2) 0%, 
            rgba(255, 255, 255, 0) 50%,
            rgba(255, 255, 255, 0.2) 100%);
          animation: shimmer 2s infinite;
        }
      }
    }
    
    .progress-stats {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11px;
      
      .progress-label {
        color: var(--color-text-lighter);
      }
      
      .progress-percentage {
        font-weight: 600;
        color: var(--color-primary-element);
      }
    }
  }

  .card-footer {
    padding-top: 12px;
    border-top: 1px solid var(--color-border);

    .owner-info {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;

      .owner-name {
        color: var(--color-text-lighter);
        font-size: 11px;
      }
    }
  }

  // INLINE MODE STYLES
  &.inline {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    margin-bottom: 4px;
    
    .card-features,
    .card-children,
    .card-footer {
      display: none;
    }
    
    .card-header {
      margin-bottom: 0;
      min-height: unset;
      flex: 0 0 auto;
      width: auto;
      
      .header-left {
        gap: 8px;
        
        .type-icon {
          width: 24px;
          height: 24px;
          
          svg {
            width: 16px;
            height: 16px;
          }
        }
        
        .header-meta {
          flex-direction: row;
          align-items: center;
          gap: 6px;
          
          .item-type-label {
            font-size: 12px;
          }
          
          .timestamp {
            font-size: 11px;
          }
        }
      }
      
      .header-right {
        display: none;
      }
    }
    
    .card-content {
      margin-bottom: 0;
      flex: 1;
      min-width: 0;
      padding: 0 10px;
      
      .content-section {
        &.title-section {
          .card-title {
            font-size: 14px;
            margin: 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        
        &.description-section {
          display: none;
        }
      }
    }
    
    .section-separator {
      display: none;
    }
    
    .inline-features-row {
      display: flex;
      align-items: center;
      gap: 12px;
      flex: 0 0 auto;
      
      .inline-spacer {
        flex: 1;
        min-width: 6px;
      }
      
      .inline-feature-item {
        display: flex;
        align-items: center;
        height: 24px;
        
        &.child-items {
          .children-list {
            .children-summary {
              display: flex;
              gap: 4px;
              
              .child-type-summary {
                position: relative;
                display: flex;
                align-items: center;
                padding: 4px 8px;
                background: var(--color-background-dark);
                border: 1px solid var(--color-border);
                border-radius: 6px;
                cursor: pointer;
                font-size: 11px;
                line-height: 1;
                
                .child-type-info {
                  display: flex;
                  align-items: center;
                  gap: 3px;
                  
                  svg {
                    width: 14px;
                    height: 14px;
                  }
                  
                  .child-count {
                    font-size: 10px;
                    font-weight: 600;
                  }
                }
              }
            }
            
            .no-children {
              padding: 3px 8px;
              background: var(--color-background-dark);
              border: 1px solid var(--color-border);
              border-radius: 6px;
              font-size: 10px;
              color: var(--color-text-lighter);
              font-style: italic;
              line-height: 1;
            }
          }
        }
        
        &.support-feature {
          :deep(.support-feature-container) {
            display: flex;
            align-items: center;
            gap: 4px;
            
            .support-button {
              height: 22px;
              display: flex;
              align-items: center;
              justify-content: center;
              
              svg {
                width: 14px;
                height: 14px;
              }
            }
            
            .support-stats {
              display: flex;
              align-items: center;
              gap: 3px;
              font-size: 11px;
              line-height: 1;
              
              .stat-value {
                font-weight: 600;
              }
            }
          }
        }
        
        &.comments-feature {
          .feature-content {
            display: flex;
            align-items: center;
            gap: 3px;
            padding: 3px 6px;
            border-radius: 6px;
            cursor: pointer;
            height: 22px;
            line-height: 1;
            
            &:hover {
              background: var(--color-background-hover);
            }
            
            .feature-icon {
              width: 14px;
              height: 14px;
            }
            
            .feature-count {
              font-size: 11px;
              font-weight: 600;
            }
          }
        }
      }
      
      .inline-actions {
        flex-shrink: 0;
        
        .card-actions {
          :deep(button) {
            min-height: 24px;
            padding: 4px;
            background: transparent;
            border: none;
            color: var(--color-text-lighter);
            cursor: pointer;
            opacity: 0.7;

            &:hover {
              opacity: 1;
              color: var(--color-primary-element);
            }
            
            svg {
              width: 16px;
              height: 16px;
            }
          }
        }
      }
    }
    
    .child-tooltip {
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      margin-bottom: 6px;
      background: var(--color-main-background);
      border: 1px solid var(--color-border);
      border-radius: 8px;
      padding: 8px;
      min-width: 170px;
      max-width: 250px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 1000;
      animation: fadeIn 0.2s ease-out;
      font-size: 11px;

      &::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-width: 5px;
        border-style: solid;
        border-color: var(--color-main-background) transparent transparent transparent;
      }

      .tooltip-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 5px;
        margin-bottom: 5px;
        border-bottom: 1px solid var(--color-border);

        strong {
          font-size: 11px;
          color: var(--color-main-text);
        }

        .tooltip-count {
          font-size: 10px;
          color: var(--color-text-lighter);
        }
      }

      .tooltip-children {
        .tooltip-child-item {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 4px 5px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 10px;
          line-height: 1;

          &:hover {
            background: var(--color-background-hover);
          }

          svg {
            width: 10px;
            height: 10px;
            flex-shrink: 0;
          }

          .child-title {
            color: var(--color-text-light);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 140px;
          }
        }

        .tooltip-more {
          padding: 4px 5px;
          font-size: 9px;
          color: var(--color-text-lighter);
          font-style: italic;
        }
      }
    }
    
    &:hover {
      transform: translateY(-1px);
      background: var(--color-background-hover);
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.item-card.has-progress-bar {
  .card-features,
  .card-children {
    display: none;
  }
  
  &.inline {
    .inline-features-row {
      .inline-feature-item {
        &.child-items,
        &.support-feature,
        &.comments-feature {
          display: none;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .item-card {
    padding: 12px;

    &.inline {
      flex-wrap: wrap;
      
      .card-header {
        width: 100%;
      }
      
      .card-content {
        width: 100%;
        padding: 4px 0;
      }
      
      .inline-features-row {
        width: 100%;
        flex-wrap: wrap;
        
        .inline-spacer {
          display: none;
        }
        
        .inline-actions {
          margin-left: auto;
        }
      }
    }
  }
}
</style>
