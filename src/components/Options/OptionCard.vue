<!--
  SPDX-FileCopyrightText: 2024 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
  <div 
    :class="[
      'option-card',
      `type-${option.type}`,
      { 
        'compact': compact,
        'official': official,
        'highlight': highlight,
        'show-poll': showPoll,
        'has-support': hasSupportFeature,
        'has-comments': hasComments
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
      
      <!-- Right side: Actions menu -->
      <div class="header-right" @click.stop>
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
      <!-- Title (if use_title is enabled for this option type) -->
      <div v-if="showTitle" class="content-section title-section">
        <h3 class="card-title">{{ option.label || option.title }}</h3>
      </div>
      
      <!-- Description -->
      <div v-if="option.text && (!compact || !optionTypeData.use_title)" class="content-section description-section">
        <div class="card-text">
          {{ truncateText(option.text, textMaxLength) }}
        </div>
      </div>
    </div>

    <!-- Separator -->
    <div class="section-separator"></div>

<!-- Third Box: Support and Comments in single line -->
<div v-if="hasSupportFeature || allowComment" class="card-features">
  <!-- Support feature -->
  <div v-if="hasSupportFeature" class="feature-item support-feature">
    <SupportFeature
      :item="option"
      item-type="option"
      :context="optionContext"
      :show-quorum="true"
      :show-details-on-hover="true"
      :icon-size="14"
      @click.stop
    />
  </div>
  
  <!-- Comments feature -->
  <div v-if="allowComment" class="feature-item comments-feature" @click.stop="emit('comment', option)">
    <div class="feature-content">
      <component :is="InquiryOptionIcons.Comment" :size="16" class="feature-icon" />
      <span class="feature-count">{{ option.status.countComments || 0 }}</span>
    </div>
  </div>
</div>

  <!-- Fourth Box: Responses -->
  <div v-if="hasAllowedResponses && !compact" class="card-responses">
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
                      @click.stop="emit('viewResponses', option, responseType)"
                      >
                      <div class="response-type-info">
                          <component :is="getOptionTypeIcon(responseType)" :size="12" />
                          <span class="response-count">{{ childCounts[responseType] || 0 }}</span>
                      </div>
              </div>
          </div>
      </div>
  </div>

  <!-- Owner info footer -->
  <div class="card-footer">
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
</template>

<script setup lang="ts">
    import { ref, computed, onMounted, watch } from 'vue'
import { t } from '@nextcloud/l10n'
import NcAvatar from '@nextcloud/vue/components/NcAvatar'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcActions from '@nextcloud/vue/components/NcActions'
import NcActionButton from '@nextcloud/vue/components/NcActionButton'
import SupportFeature from '../../helpers/modules/SupportFeature.vue'

import { useOptionsStore } from '../../stores/options'
import { useSessionStore } from '../../stores/session'
import { useSupportsStore } from '../../stores/supports'
import { showSuccess, showError } from '@nextcloud/dialogs'
import { InquiryOptionIcons } from '../../utils/icons.ts'
import { 
  getOptionTypeData,
  getFamilyColor
} from '../../helpers/modules/InquiryOptionHelper'

import { 
  createOptionContext,
  canEditOption,
  canDeleteOption,
  canCommentOption,
  canSupportOption
} from '../../utils/permissions.ts'

// Types
import type { Option } from '../../Types/index.ts'

// Props
const props = defineProps<{
  option: Option & {
    currentUserStatus?: {
      hasSupported: boolean
      supportValue: number | null
    }
  }
  inquiryId: number
  compact?: boolean
  official?: boolean
  highlight?: boolean
  showPoll?: boolean
  preventClick?: boolean
  textMaxLength?: number
}>()

const handleCommentClick = () => {
  emit('comment', props.option)
}

// Emits
const emit = defineEmits<{
  click: [option: Option]
  edit: [option: Option]
  delete: [optionId: number]
  supportChanged: [optionId: number, support: string]
  comment: [option: Option]
  viewResponses: [option: Option, responseType: string]
}>()

// Defaults
const textMaxLength = props.textMaxLength || 200

// Stores
const optionsStore = useOptionsStore()
const sessionStore = useSessionStore()
const supportsStore = useSupportsStore()

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

const canComment = computed(() => {
  if (!props.option || optionContext.value === null) return false
  return canCommentOption(optionContext.value)
})

const canSupport = computed(() => {
  if (!props.option || optionContext.value === null) return false
  return canSupportOption(optionContext.value)
})

const canEditOrDelete = computed(() => canEdit.value || canDelete.value)

// Get option types from session store
const allOptionTypes = computed(() => sessionStore.appSettings?.inquiryOptionTypeTab || [])


const optionTypeData = computed(() => {
  const data = getOptionTypeData(props.option.type, allOptionTypes.value, props.option.type)

  // Fallback/default option type data if not found
  if (!data) {
    return {
      label: props.option.type || t('agora', 'Option'),
      icon: InquiryOptionIcons.File,
      family: 'default',
      use_title: true,
      support_feature: 'none',
      allow_comment: false,
      allowed_response: [],
      fields: []
    }
  }
  return data
})


// Computed properties - USING optionTypeData ONLY
const optionTypeLabel = computed(() => optionTypeData.value.label || props.option.type || '')

const optionIcon = computed(() => {
    const iconName = optionTypeData.value?.icon

    if (iconName in InquiryOptionIcons) {
    const icon = InquiryOptionIcons[iconName as keyof typeof InquiryOptionIcons]
    return icon
  }

  console.log('DEBUG - Icon not found, using File')
  return InquiryOptionIcons.File
})

const optionTypeColor = computed(() => {
  if (!optionTypeData.value?.family) return '#999999'
  return getFamilyColor(optionTypeData.value.family)
})

const showTitle = computed(() => optionTypeData.value?.use_title !== false)

const supportFeature = computed(() => optionTypeData.value?.support_feature || 'none')

const allowComment = computed(() => optionTypeData.value?.allow_comment || false)

const hasSupportFeature = computed(() => optionTypeData.value?.support_feature !== 'none' || false)

const hasComments = computed(() => allowComment.value && (props.option.status?.countComments || 0) > 0)

// Get allowed responses from option type data
const allowedResponses = computed(() => {
  if (!optionTypeData.value?.allowed_response) return []

  let responses: string[] = []

  if (typeof optionTypeData.value.allowed_response === 'string') {
    try {
      responses = JSON.parse(optionTypeData.value.allowed_response)
    } catch {
      responses = []
    }
  } else if (Array.isArray(optionTypeData.value.allowed_response)) {
    responses = optionTypeData.value.allowed_response
  }

  // Filter out any invalid response types
  return responses.filter(responseType => 
    allOptionTypes.value.some(opt => 
      opt.option_type === responseType || opt.optionType === responseType
    )
  )
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
      counts[child.type]++
    }
  })

  return counts
})

const childCountsTotal = computed(() => Object.values(childCounts.value).reduce((sum, count) => sum + count, 0))

// Support value computation - FIXED: Return numeric values
const numericSupportValue = computed(() => {
  // For ternary support: 1 = for, -1 = against, 0 = neutral, null = no support
  if (supportFeature.value === 'ternary' || supportFeature.value === 'binary') {
    return props.option.currentUserStatus?.supportValue ?? null
  }
  return null
})

// Helper methods
const formatDate = (timestamp: number) => {
  let date=new Date()
  if (timestamp)  date = new Date(timestamp * 1000)
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

const truncateText = (text: string, maxLength: number) => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return `${text.substring(0, maxLength)  }...`
}

const getOptionTypeIcon = (type: string) => {
  const optionType = allOptionTypes.value.find(opt => 
    opt.option_type === type || opt.optionType === type
  )

  if (optionType?.icon) {
    return InquiryOptionIcons[optionType.icon] || InquiryOptionIcons.File
  }
  return InquiryOptionIcons.File
}

// Methods
const handleCardClick = () => {
  if (!props.preventClick) {
    emit('click', props.option)
  }
}


const confirmDelete = () => {
  if (confirm(t('agora', 'Are you sure you want to delete this option?'))) {
    deleteOption()
  }
}

const deleteOption = async () => {
  try {
    // Remove from store
    const index = optionsStore.options.findIndex(opt => opt.id === props.option.id)
    if (index >= 0) {
      optionsStore.options.splice(index, 1)
    }

    emit('delete', props.option.id)
  } catch (err) {
    console.error('Error deleting option:', err)
    showError(t('agora', 'Failed to delete option'))
  }
}

// Watch for option updates
watch(() => props.option, (newOption) => {
  // React to option changes if needed
}, { deep: true })
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

    &.compact {
        padding: 12px;

        .card-features,
        .card-responses,
        .card-footer {
            display: none;
        }
    }

    // First Box: Header
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

    // Second Box: Content
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

    // Third Box: Support and Comments in single line - FIXED ALIGNMENT
    .card-features {
        display: flex;
        align-items: center;
        gap: 24px;
        margin-bottom: 12px;
        min-height: 32px;

        .feature-item {
            display: flex;
            align-items: center;
            height: 32px;

            &.support-feature {
                display: flex;
                align-items: center;

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
                        height: 100%;

                        .stat-value {
                            font-weight: 600;
                            line-height: 1;
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
                        width: 16px;
                        height: 16px;
                        flex-shrink: 0;
                    }

                    .feature-count {
                        font-size: 12px;
                        font-weight: 600;
                        color: var(--color-text-light);
                        line-height: 1;
                    }
                }
            }
        }
    }

    // Fourth Box: Responses (smaller)
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
                            width: 12px;
                            height: 12px;
                        }

                        .response-count {
                            font-weight: 600;
                            color: var(--color-primary-element);
                            font-size: 11px;
                        }
                    }
                }
            }
        }
    }

    // Footer: Owner info
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
}

// Responsive design
@media (max-width: 768px) {
    .option-card {
        padding: 12px;

        .card-features {
            gap: 16px;
            flex-wrap: wrap;

            .feature-item {
                &.support-feature {
                    :deep(.support-feature-container) {
                        flex-wrap: wrap;
                        gap: 4px;
                    }
                }

                &.comments-feature {
                    .feature-content {
                        padding: 4px 8px;
                    }
                }
            }
        }
    }
}
</style>
