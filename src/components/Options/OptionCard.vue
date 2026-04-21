<!--
  SPDX-FileCopyrightText: 2024 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
  <div 
    v-if="option" 
    :class="[
      'option-card',
      `type-${option.type}`,
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
        <div class="type-icon" :style="{ color: optionTypeColor }">
          <component :is="optionIcon" :size="compact ? 16 : 20" />
        </div>
        
        <div class="header-meta">
          <span class="option-type-label">{{ optionTypeLabel }}</span>
          <span class="timestamp">{{ formatDate(option.status.created) }}</span>
        </div>
      </div>
      
      <!-- Right side: Actions menu - only in normal mode -->
      <div v-if="!inline && canEditOrDelete && showAction" class="header-right" @click.stop>
        <NcActions
          v-if="canEditOrDelete"
          :force-menu="true"
          :aria-label="t('agora', 'Option actions')"
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
      <!-- Title (if useTitle is enabled for this option type) -->
      <div v-if="showTitle" class="content-section title-section">
        <h3 class="card-title">{{ option.label || option.title }}</h3>
      </div>
      
      <!-- Description - show if there's text AND (not compact OR not using title) -->
      <div v-if="option.text && (!compact || !useTitle)" class="content-section description-section">
        <div class="card-text">
          {{ truncateText(option.text, textMaxLength) }}
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

    <!-- Third Box: Support and Comments in single line (normal mode) -->
    <!-- Conditionally hide responses when progressBar is true -->
    <div v-if="!inline && (hasSupportFeature || allowComment) && !progressBar" class="card-features">
      <!-- Support feature -->
      <div v-if="hasSupportFeature" class="feature-item support-feature">
        <SupportFeature
          :item="option"
          item-type="option"
          :context="optionContext"
          :show-quorum="true"
          :show-details-on-hover="true"
          :icon-size="compact ? 12 : 14"
          @click.stop
        />
      </div>
      
      <!-- Comments feature -->
      <div v-if="allowComment" class="feature-item comments-feature" @click.stop="$emit('comment', option)">
        <div class="feature-content">
          <component :is="InquiryOptionIcons.Comment" :size="compact ? 14 : 16" class="feature-icon" />
          <span class="feature-count">{{ option.status.countComments || 0 }}</span>
        </div>
      </div>
    </div>

    <!-- Fourth Box: Responses - normal mode -->
    <!-- Conditionally hide responses when progressBar is true -->
    <div v-if="!inline && hasAllowedResponses && !compact && !progressBar" class="card-responses">
      <div class="responses-header">
        <component :is="InquiryOptionIcons.MessageReplyText" :size="14" />
        <span class="responses-title">{{ t('agora', 'Responses') }}</span>
      </div>

      <div class="responses-list">
        <div v-if="childCountsTotal === 0" class="no-responses">
          <span class="no-responses-text">{{ t('agora', 'None') }}</span>
        </div>

        <div v-else class="responses-summary">
          <div 
            v-for="responseType in allowedResponses" 
            :key="responseType"
            class="response-type-summary"
            @mouseenter="showChildTooltip(responseType)"
            @mouseleave="hideChildTooltip"
            @click.stop="$emit('viewResponses', option, responseType)"
          >
            <div class="response-type-info">
              <component :is="getOptionTypeIcon(responseType)" :size="inline ? 10 : 12" />
              <span class="response-count">{{ childCounts[responseType] || 0 }}</span>
            </div>
            
            <!-- Tooltip showing child options of this type -->
            <div v-if="activeTooltip === responseType && childCounts[responseType] > 0" class="child-tooltip">
              <div class="tooltip-header">
                <strong>{{ getOptionTypeLabelLocal(responseType) }}</strong>
                <span class="tooltip-count">{{ childCounts[responseType] }} {{ t('agora', 'items') }}</span>
              </div>
              <div class="tooltip-children">
                <div 
                  v-for="child in getChildrenByType(responseType)" 
                  :key="child.id"
                  class="tooltip-child-item"
                  @click.stop="$emit('click', child)"
                >
                  <component :is="getOptionTypeIcon(child.type)" :size="10" />
                  <span class="child-title">{{ child.title || child.text?.substring(0, 30) }}</span>
                </div>
                <div v-if="childCounts[responseType] > 3" class="tooltip-more">
                  {{ t('agora', 'and {count} more …', { count: childCounts[responseType] - 3 }) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="inline" class="inline-features-row">
      <!-- Child responses - hide when progressBar is true -->
      <div v-if="hasAllowedResponses && !compact && !progressBar" class="inline-feature-item child-responses">
        <div class="responses-list">
          <div v-if="childCountsTotal === 0" class="no-responses">
            <span class="no-responses-text">{{ t('agora', 'None') }}</span>
          </div>

          <div v-else class="responses-summary">
            <div 
              v-for="responseType in allowedResponses" 
              :key="responseType"
              class="response-type-summary"
              @mouseenter="showChildTooltip(responseType)"
              @mouseleave="hideChildTooltip"
              @click.stop="$emit('viewResponses', option, responseType)"
            >
              <div class="response-type-info">
                <component :is="getOptionTypeIcon(responseType)" :size="10" />
                <span class="response-count">{{ childCounts[responseType] || 0 }}</span>
              </div>
              
              <!-- Tooltip showing child options of this type -->
              <div v-if="activeTooltip === responseType && childCounts[responseType] > 0" class="child-tooltip">
                <div class="tooltip-header">
                  <strong>{{ getOptionTypeLabelLocal(responseType) }}</strong>
                  <span class="tooltip-count">{{ childCounts[responseType] }} {{ t('agora', 'items') }}</span>
                </div>
                <div class="tooltip-children">
                  <div 
                    v-for="child in getChildrenByType(responseType)" 
                    :key="child.id"
                    class="tooltip-child-item"
                    @click.stop="$emit('click', child)"
                  >
                    <component :is="getOptionTypeIcon(child.type)" :size="10" />
                    <span class="child-title">{{ child.title || child.text?.substring(0, 30) }}</span>
                  </div>
                  <div v-if="childCounts[responseType] > 3" class="tooltip-more">
                    {{ t('agora', 'and {count} more …', { count: childCounts[responseType] - 3 }) }}
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
          :item="option"
          item-type="option"
          :context="optionContext"
          :show-quorum="true"
          :show-details-on-hover="true"
          :icon-size="12"
          @click.stop
        />
      </div>
      
      <!-- Comments feature - hide when progressBar is true -->
      <div v-if="allowComment && !progressBar" class="inline-feature-item comments-feature" @click.stop="$emit('comment', option)">
        <div class="feature-content">
          <component :is="InquiryOptionIcons.Comment" :size="14" class="feature-icon" />
          <span class="feature-count">{{ option.status.countComments || 0 }}</span>
        </div>
      </div>

      <!-- Spacer to push actions to the right -->
      <div class="inline-spacer"></div>

      <!-- Actions menu for inline mode -->
      <div v-if="canEditOrDelete && showAction" class="inline-actions" @click.stop>
        <NcActions
          :force-menu="true"
          :aria-label="t('agora', 'Option actions')"
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

    <!-- Footer: Owner info - hide in inline mode -->
    <div v-if="!inline" class="card-footer">
      <div class="owner-info">
        <NcAvatar
          v-if="option.owner?.id"
          :user="option.owner.id"
          :display-name="option.owner.displayName"
          :size="18"
        />
        <span class="owner-name">{{ option.owner?.displayName || t('agora', 'Unknown owner') }}</span>
      </div>
    </div>
  </div>
  <DeleteConfirmationDialog
  v-model:visible="showDeleteDialog"
  :option-title="option?.title || option?.label || ''"
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
import SupportFeature from '../../helpers/modules/SupportFeature.vue'

import { useOptionsStore } from '../../stores/options'
import { useSessionStore } from '../../stores/session'
import { showError } from '@nextcloud/dialogs'
import { InquiryOptionIcons } from '../../utils/icons.ts'
import { 
  createOptionContext,
  canEditOption,
  canDeleteOption,
} from '../../utils/permissions.ts'

// Types
import type { Option } from '../../Types/index.ts'
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

// Props
const props = defineProps<{
  option: Option & {
    currentUserStatus?: {
      hasSupported: boolean
      supportValue: number | null
    }
  }
  // eslint-disable-next-line vue/no-unused-properties
  inquiryId: number
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
  click: [option: Option]
  edit: [option: Option]
  delete: [optionId: number]
  supportChanged: [optionId: number, support: string]
  comment: [option: Option]
  viewResponses: [option: Option, responseType: string]
  removeFromView: [optionId: number, updatedForceLayouts: string[]]
}>()


// Defaults
const textMaxLength = props.textMaxLength || 200

// Stores
const optionsStore = useOptionsStore()
const sessionStore = useSessionStore()

const showDeleteDialog = ref(false)

const confirmDelete = () => {
  showDeleteDialog.value = true
}

// Add handler functions
const handleConfirmDelete = () => {
  deleteOption()
}

const handleRemoveFromView = () => {
  removeFromCurrentView()
}

// Create context once as computed
const optionContext = computed(() => {
  if (!props.option) return null
  return createOptionContext(props.option)
})

// Permission checks as computed properties
const canEdit = computed(() => {
  if (!props.option || optionContext.value === null) return false
  return canEditOption(optionContext.value)
})

const canDelete = computed(() => {
  if (!props.option || optionContext.value === null) return false
  return canDeleteOption(optionContext.value)
})

const canEditOrDelete = computed(() => canEdit.value || canDelete.value)

// Get option types from session store
const allOptionTypes = computed(() => sessionStore.appSettings?.inquiryOptionTypeTab || [])

// Add null checks
const optionTypeLabel = computed(() => {
  if (!props.option?.type || !allOptionTypes.value) {
    return t('agora', 'Option')
  }
  return getOptionTypeLabel(props.option.type, allOptionTypes.value, t('agora', 'Option'))
})

const optionIcon = computed(() => {
  if (!props.option?.type || !allOptionTypes.value) {
    return InquiryOptionIcons.Default // Make sure this exists
  }
  return getOptionTypeIconComponent(props.option.type, allOptionTypes.value)
})

const optionTypeColor = computed(() => {
  if (!props.option?.type || !allOptionTypes.value) {
    return 'var(--color-text-light)'
  }
  return getOptionTypeColor(props.option.type, allOptionTypes.value)
})

const showTitle = computed(() => 
  usesTitle(props.option.type, allOptionTypes.value)
)

const allowComment = computed(() => 
  allowsComments(props.option.type, allOptionTypes.value)
)

const hasSupportFeature = computed(() => 
  hasSupportFeatureHelper(props.option.type, allOptionTypes.value)
)

// Get allowed responses from option type data
const allowedResponses = computed(() => 
  getAllowedResponses(props.option.type, allOptionTypes.value)
)

const getOptionTypeIcon = (type: string) => getOptionTypeIconComponent(type, allOptionTypes.value)

// Renamed to avoid conflict with imported getOptionTypeLabel
const getOptionTypeLabelLocal = (type: string) => getOptionTypeLabel(type, allOptionTypes.value, type)

const useTitle = computed(() => 
  usesTitle(props.option.type, allOptionTypes.value)
)

const progressPercentage = computed(() => {
  if (!props.progressBar) return 0

  if (props.option.status?.supportCount !== undefined) {
    // Assuming there's a total target or max value
    const maxSupport = props.option.maxSupport || 100 // Define your max value
    return Math.min(100, (props.option.status.supportCount / maxSupport) * 100)
  }

  // Default fallback
  return 50
})


const hasAllowedResponses = computed(() => allowedResponses.value.length > 0)

// Get child options
const childOptions = computed(() => {
  if (!props.option?.id) return []
  return optionsStore.options.filter(opt => opt.parentId === props.option.id)
})

const childCounts = computed(() => {
  const counts: Record<string, number> = {}

  if (!props.option.id) return counts

  const children = childOptions.value

  // Initialize counts for allowed responses
  allowedResponses.value.forEach((type: string) => {
    counts[type] = 0
  })

  // Count children by type
  children.forEach(child => {
    if (counts[child.type] !== undefined) {
      counts[child.type]=counts[child.type] + 1
    }
  })

  return counts
})

const childCountsTotal = computed(() => 
  Object.values(childCounts.value).reduce((sum, count) => sum + count, 0)
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
   childOptions.value
    .filter(child => child.type === type)
    .slice(0, 3) // Show only first 3


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

const isImportedFromView = computed(() => props.option.family !== props.familyType)

const truncateText = (text: string, maxLength: number) => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return `${text.substring(0, maxLength)}...`
}

const handleCardClick = () => {
  if (!props.preventClick) {
    emit('click', props.option)
  }
}

const deleteOption = async () => {
  try {
    await optionsStore.deleteOption(props.option.id)
    
    // Then update local store
    const index = optionsStore.options.findIndex(opt => opt.id === props.option.id)
    if (index >= 0) {
      optionsStore.options.splice(index, 1)
    }
    
    emit('delete', props.option.id)
    showSuccess(t('agora', 'Option deleted successfully'))
  } catch (err) {
    console.error('Error deleting option:', err)
    showError(t('agora', 'Failed to delete option'))
  }
}

const removeFromCurrentView = async () => {
  try {
    let currentLayouts = props.option.miscFields?.force_layouts || []

    if (typeof currentLayouts === 'string') {
      try {
        currentLayouts = JSON.parse(currentLayouts)
      } catch {
        currentLayouts = []
      }
    }

    if (!Array.isArray(currentLayouts)) {
      currentLayouts = []
    }

    const updatedLayouts = currentLayouts.filter((layout: string) => layout !== props.familyType)

    await optionsStore.updateOption({
      ...props.option,
      miscFields: {
        ...props.option.miscFields,
        force_layouts: updatedLayouts
      }
    })

    emit('removeFromView', props.option.id, updatedLayouts)
    showSuccess(t('agora', 'Option removed from view'))
  } catch (err) {
    console.error('Error removing option from view:', err)
    showError(t('agora', 'Failed to remove option from view'))
  }
}



</script>
<style scoped lang="scss">
.option-card {
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

  // Compact mode - minimal info
  &.compact {
    padding: 12px;

    .card-features,
    .card-responses,
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

  // Card Header
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

        .option-type-label {
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

  // Card Content
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

  // Separator
  .section-separator {
    height: 1px;
    background: var(--color-border);
    margin: 0 0 12px 0;
  }

  // Features section (NORMAL MODE)
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

  // Responses section (NORMAL MODE)
  .card-responses {
    margin-bottom: 12px;

    .responses-header {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 8px;

      .responses-title {
        font-size: 12px;
        font-weight: 600;
        color: var(--color-text-light);
      }
    }

    .responses-list {
      .no-responses {
        padding: 6px 10px;
        background: var(--color-background-dark);
        border: 1px solid var(--color-border);
        border-radius: 8px;
        font-size: 11px;
        color: var(--color-text-lighter);
        font-style: italic;
        text-align: center;
      }

      .responses-summary {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;

        .response-type-summary {
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

          .response-type-info {
            display: flex;
            align-items: center;
            gap: 4px;

            svg {
              width: 14px;
              height: 14px;
            }

            .response-count {
              font-weight: 600;
              color: var(--color-primary-element);
              font-size: 11px;
            }
          }

          // Tooltip for child options
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

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.option-card.has-progress-bar {
  .card-features,
  .card-responses {
    display: none;
  }
  
  &.inline {
    .inline-features-row {
      .inline-feature-item {
        &.child-responses,
        &.support-feature,
        &.comments-feature {
          display: none;
        }
      }
    }
  }
}
  // Footer
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
    
    // Hide all normal mode sections
    .card-features,
    .card-responses,
    .card-footer {
      display: none;
    }
    
    // Header adjustments
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
          
          .option-type-label {
            font-size: 12px;
          }
          
          .timestamp {
            font-size: 11px;
          }
        }
      }
      
      .header-right {
        display: none; // Hide normal mode actions
      }
    }
    
    // Content adjustments
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
    
    // Inline features row
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
        
        // Child responses
        &.child-responses {
          .responses-list {
            .responses-summary {
              display: flex;
              gap: 4px;
              
              .response-type-summary {
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
                
                .response-type-info {
                  display: flex;
                  align-items: center;
                  gap: 3px;
                  
                  svg {
                    width: 14px;
                    height: 14px;
                  }
                  
                  .response-count {
                    font-size: 10px;
                    font-weight: 600;
                  }
                }
              }
            }
            
            .no-responses {
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
        
        // Support feature
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
        
        // Comments feature
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
      
      // Actions menu
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
    
    // Tooltip positioning for inline mode
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

// Responsive design
@media (max-width: 768px) {
  .option-card {
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
