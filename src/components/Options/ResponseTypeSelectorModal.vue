<!--
  SPDX-FileCopyrightText: 2024 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
  <NcModal
    v-if="show"
    :name="modalTitle"
    size="medium"
    @close="closeModal"
  >
    <div class="response-type-selector-modal">
      <!-- Header -->
      <div class="modal-header">
        <h2>{{ modalTitle }}</h2>
        <p class="modal-subtitle">{{ modalDescription }}</p>
      </div>

      <!-- Content -->
      <div class="modal-content">
        <!-- Parent option info -->
        <div v-if="parentOption" class="parent-info">
          <div class="parent-label">
            <component :is="InquiryOptionIcons.ArrowUp" :size="16" />
            {{ t('agora', 'Responding to:') }}
          </div>
          <div class="parent-details">
            <component :is="getOptionTypeIcon(parentOption.type)" :size="20" />
            <div class="parent-text">
              <h4>{{ parentOption.label }}</h4>
              <p v-if="parentOption.text" class="parent-text">
                {{ truncateText(parentOption.text, 100) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Available response types -->
        <div class="response-types-section">
          <h3>{{ t('agora', 'Choose response type') }}</h3>
          <p class="section-text">
            {{ t('agora', 'Select the type of response you want to create') }}
          </p>

          <div class="response-types-grid">
            <button
              v-for="responseType in availableResponseTypes"
              :key="responseType.option_type"
              class="response-type-card"
              @click="selectResponseType(responseType.option_type)"
              :class="{ 'selected': selectedType === responseType.option_type }"
            >
              <div class="card-header">
                <div class="type-icon" :style="{ color: getResponseTypeColor(responseType) }">
                  <component :is="getResponseTypeIcon(responseType)" :size="24" />
                </div>
                <h4>{{ responseType.label }}</h4>
              </div>
              
              <p class="type-text">{{ responseType.text }}</p>
              
              <div class="type-features">
                <span v-if="responseType.support_feature && responseType.support_feature !== 'none'" class="feature-tag">
                  <TernarySupportIcon
                    v-if="responseType.support_feature === 'ternary'"
                    :support-value="null"
                    :size="12"
                  />
                  <ThumbIcon
                    v-else-if="responseType.support_feature === 'binary'"
                    :supported="false"
                    :size="12"
                  />
                  {{ getSupportFeatureLabel(responseType.support_feature) }}
                </span>
                
                <span v-if="responseType.allow_comment" class="feature-tag">
                  <component :is="InquiryOptionIcons.Comment" :size="12" />
                  {{ t('agora', 'Comments') }}
                </span>
                
                <span v-if="responseType.statuses && responseType.statuses.length > 0" class="feature-tag">
                  <component :is="InquiryOptionIcons.Circle" :size="12" />
                  {{ t('agora', 'Statuses') }}
                </span>
              </div>
              
              <div class="type-stats">
                <div class="stat-item">
                  <component :is="InquiryOptionIcons.File" :size="12" />
                  <span>{{ getExistingCount(responseType.option_type) }} {{ t('agora', 'existing') }}</span>
                </div>
              </div>
            </button>
          </div>
        </div>

        <!-- Selected type preview -->
        <div v-if="selectedType" class="selected-type-preview">
          <h4>{{ t('agora', 'Selected: {type}', { type: selectedTypeLabel }) }}</h4>
          <div class="preview-card">
            <OptionCard
              :option="previewOption"
              :inquiry-id="inquiryId"
              :compact="true"
              prevent-click
            />
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="modal-footer">
        <div class="footer-actions">
          <NcButton type="tertiary" @click="closeModal">
            {{ t('agora', 'Cancel') }}
          </NcButton>
          <NcButton 
            type="primary" 
            :disabled="!selectedType"
            @click="confirmSelection"
          >
            <template #icon>
              <component :is="getResponseTypeIcon(selectedTypeConfig)" :size="16" />
            </template>
            {{ t('agora', 'Create {type}', { type: selectedTypeLabel }) }}
          </NcButton>
        </div>
      </div>
    </div>
  </NcModal>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { t } from '@nextcloud/l10n'
import NcModal from '@nextcloud/vue/components/NcModal'
import NcButton from '@nextcloud/vue/components/NcButton'

import { useOptionsStore } from '../../stores/options'
import { useSessionStore } from '../../stores/session'
import { InquiryOptionIcons } from '../../utils/icons.ts'
import { TernarySupportIcon, ThumbIcon } from '../../utils/AppIcons.ts'
import { getFamilyColor } from '../../helpers/modules/InquiryOptionHelper'

import OptionCard from './OptionCard.vue'

// Types
import type { Option, OptionType } from '../../Types/index.ts'

// Props
const props = defineProps<{
  parentOptionId: number
  inquiryId: number
}>()

// Emits
const emit = defineEmits<{
  close: []
  selected: [responseType: string]
}>()

// Stores
const optionsStore = useOptionsStore()
const sessionStore = useSessionStore()

// State
const show = ref(true)
const selectedType = ref<string | null>(null)

// Computed
const parentOption = computed(() => {
  return optionsStore.options.find(opt => opt.id === props.parentOptionId)
})

const parentOptionConfig = computed(() => {
  if (!parentOption.value?.type) return null
  const optionTypes = sessionStore.appSettings?.inquiryOptionTypeTab || []
  return optionTypes.find(opt => 
    opt.option_type === parentOption.value?.type || opt.optionType === parentOption.value?.type
  )
})

const allowedResponses = computed(() => {
  if (!parentOptionConfig.value?.allowed_response) return []
  
  // Parse if string, otherwise use array
  let responses: string[] = []
  if (typeof parentOptionConfig.value.allowed_response === 'string') {
    try {
      responses = JSON.parse(parentOptionConfig.value.allowed_response)
    } catch {
      responses = []
    }
  } else if (Array.isArray(parentOptionConfig.value.allowed_response)) {
    responses = parentOptionConfig.value.allowed_response
  }
  
  return responses
})

const availableResponseTypes = computed(() => {
  const allOptionTypes = sessionStore.appSettings?.inquiryOptionTypeTab || []
  
  return allowedResponses.value
    .map(responseType => {
      const optionType = allOptionTypes.find(opt => 
        opt.option_type === responseType || opt.optionType === responseType
      )
      return optionType
    })
    .filter((type): type is OptionType => type !== undefined)
    .sort((a, b) => a.label.localeCompare(b.label))
})

const selectedTypeConfig = computed(() => {
  if (!selectedType.value) return null
  return availableResponseTypes.value.find(type => type.option_type === selectedType.value)
})

const selectedTypeLabel = computed(() => {
  if (!selectedTypeConfig.value) return ''
  return selectedTypeConfig.value.label || selectedType.value || ''
})

const modalTitle = computed(() => {
  return t('agora', 'Add Response')
})

const modalDescription = computed(() => {
  if (!parentOption.value) return t('agora', 'Create a new response')
  
  const parentType = parentOptionConfig.value?.label || parentOption.value.type
  return t('agora', 'Add a response to this {type}', { type: parentType.toLowerCase() })
})

const existingChildren = computed(() => {
  if (!props.parentOptionId) return []
  return optionsStore.options.filter(opt => opt.parentId === props.parentOptionId)
})

const previewOption = computed(() => {
  const typeLabel = selectedTypeConfig.value?.label || selectedType.value || t('agora', 'Response')
  const typeDescription = selectedTypeConfig.value?.text || ''
  
  return {
    id: 0,
    type: selectedType.value || '',
    label: t('agora', 'New {type}', { type: typeLabel }),
    text: typeDescription,
    parentId: props.parentOptionId,
    created: new Date().toISOString(),
    owner: {
      id: sessionStore.currentUser?.id || '',
      displayName: sessionStore.currentUser?.displayName || t('agora', 'Current User')
    },
    support_for: 0,
    support_against: 0,
    comment_count: 0,
    status: 'draft'
  }
})

// Methods
const truncateText = (text: string, maxLength: number) => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

const getOptionTypeIcon = (type: string) => {
  const optionTypes = sessionStore.appSettings?.inquiryOptionTypeTab || []
  const optionType = optionTypes.find(opt => 
    opt.option_type === type || opt.optionType === type
  )
  
  if (optionType?.icon) {
    return InquiryOptionIcons[optionType.icon] || InquiryOptionIcons.File
  }
  return InquiryOptionIcons.File
}

const getResponseTypeIcon = (responseType: OptionType | null) => {
  if (!responseType?.icon) return InquiryOptionIcons.File
  return InquiryOptionIcons[responseType.icon] || InquiryOptionIcons.File
}

const getResponseTypeColor = (responseType: OptionType) => {
  if (!responseType?.family) return '#999999'
  return getFamilyColor(responseType.family)
}

const getSupportFeatureLabel = (supportFeature: string) => {
  switch (supportFeature) {
    case 'ternary':
      return t('agora', 'Ternary support')
    case 'binary':
      return t('agora', 'Binary support')
    default:
      return t('agora', 'Support')
  }
}

const getExistingCount = (type: string) => {
  return existingChildren.value.filter(child => child.type === type).length
}

const selectResponseType = (type: string) => {
  selectedType.value = type
}

const confirmSelection = () => {
  if (selectedType.value) {
    emit('selected', selectedType.value)
    closeModal()
  }
}

const closeModal = () => {
  show.value = false
  setTimeout(() => {
    emit('close')
  }, 300)
}

// Auto-select if only one response type is available
onMounted(() => {
  if (availableResponseTypes.value.length === 1) {
    selectedType.value = availableResponseTypes.value[0].option_type
  }
})
</script>

<style scoped lang="scss">
.response-type-selector-modal {
  display: flex;
  flex-direction: column;
  max-height: 80vh;

  .modal-header {
    padding: 24px 24px 16px 24px;
    border-bottom: 1px solid var(--color-border);

    h2 {
      margin: 0 0 8px 0;
      font-size: 20px;
      font-weight: 700;
      color: var(--color-main-text);
    }

    .modal-subtitle {
      margin: 0;
      color: var(--color-text-lighter);
      font-size: 14px;
      line-height: 1.4;
    }
  }

  .modal-content {
    flex: 1;
    overflow-y: auto;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 24px;

    .parent-info {
      padding: 16px;
      background: var(--color-background-dark);
      border-radius: 12px;
      border: 1px solid var(--color-border);

      .parent-label {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 14px;
        color: var(--color-text-lighter);
        margin-bottom: 12px;
      }

      .parent-details {
        display: flex;
        align-items: flex-start;
        gap: 12px;

        .parent-text {
          flex: 1;
          min-width: 0;

          h4 {
            margin: 0 0 4px 0;
            font-size: 16px;
            font-weight: 600;
            color: var(--color-main-text);
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }

          .parent-text {
            margin: 0;
            font-size: 14px;
            color: var(--color-text-light);
            line-height: 1.4;
          }
        }
      }
    }

    .response-types-section {
      h3 {
        margin: 0 0 8px 0;
        font-size: 18px;
        font-weight: 600;
        color: var(--color-main-text);
      }

      .section-text {
        margin: 0 0 20px 0;
        color: var(--color-text-lighter);
        font-size: 14px;
      }

      .response-types-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 16px;

        .response-type-card {
          padding: 20px;
          background: var(--color-background-dark);
          border: 2px solid var(--color-border);
          border-radius: 12px;
          text-align: left;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          gap: 12px;

          &:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
            border-color: var(--color-primary-element);
          }

          &.selected {
            border-color: var(--color-primary-element);
            background: var(--color-primary-light);
            
            .type-icon {
              background: var(--color-primary-element);
              color: white !important;
            }
          }

          .card-header {
            display: flex;
            align-items: center;
            gap: 12px;

            .type-icon {
              flex-shrink: 0;
              width: 48px;
              height: 48px;
              display: flex;
              align-items: center;
              justify-content: center;
              background: var(--color-background-darker);
              border-radius: 10px;
            }

            h4 {
              margin: 0;
              font-size: 16px;
              font-weight: 600;
              color: var(--color-main-text);
              flex: 1;
            }
          }

          .type-text {
            margin: 0;
            font-size: 13px;
            color: var(--color-text-light);
            line-height: 1.4;
            flex: 1;
          }

          .type-features {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;

            .feature-tag {
              display: flex;
              align-items: center;
              gap: 4px;
              font-size: 11px;
              padding: 2px 8px;
              background: var(--color-background-darker);
              border-radius: 10px;
              color: var(--color-text-lighter);
              font-weight: 600;
            }
          }

          .type-stats {
            .stat-item {
              display: flex;
              align-items: center;
              gap: 4px;
              font-size: 12px;
              color: var(--color-text-lighter);
            }
          }
        }
      }
    }

    .selected-type-preview {
      padding-top: 24px;
      border-top: 2px solid var(--color-border);

      h4 {
        margin: 0 0 16px 0;
        font-size: 16px;
        font-weight: 600;
        color: var(--color-main-text);
      }

      .preview-card {
        border: 2px dashed var(--color-border);
        border-radius: 12px;
        overflow: hidden;
      }
    }
  }

  .modal-footer {
    padding: 16px 24px;
    border-top: 1px solid var(--color-border);
    background: var(--color-background-dark);

    .footer-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }
  }
}

@media (max-width: 768px) {
  .response-type-selector-modal {
    .modal-content {
      .response-types-grid {
        grid-template-columns: 1fr;
      }
    }
  }
}
</style>
