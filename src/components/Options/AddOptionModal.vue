<!--
  SPDX-FileCopyrightText: 2024 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
  <NcModal
    v-if="visible"
    :name="modalTitle"
    size="large"
    @close="$emit('close')"
  >
    <div class="add-option-modal">
      <!-- Header -->
      <div class="modal-header">
        <h2>{{ modalTitle }}</h2>
        <p class="modal-subtitle">{{ modalSubtitle }}</p>
      </div>

      <!-- Form -->
      <div class="modal-content">
        <div class="form-grid">
          <!-- Left column: Form fields -->
          <div class="form-column">
            <!-- Option type indicator -->
            <div class="option-type-indicator">
              <div class="type-icon" :style="{ color: optionTypeColor }">
                   <component :is="optionTypeIcon" :size="24" /> 
              </div>
              <div class="type-info">
                <h3>{{ optionTypeLabel }}</h3>
                <p>{{ optionTypeDescription }}</p>
              </div>
            </div>

            <!-- Parent info (if applicable) -->
            <div v-if="parentOption" class="parent-info">
              <div class="parent-label">
                <component :is="InquiryOptionIcons.ArrowUp" :size="14" />
                {{ t('agora', 'Parent') }}:
              </div>
              <div class="parent-details">
                 <component :is="getParentIcon(parentOption)" :size="16" /> 
                <span>{{ parentOption.label || parentOption.title }}</span>
              </div>
            </div>

            <!-- Allowed responses info -->
            <div v-if="allowedResponses.length > 0" class="responses-info">
              <div class="responses-label">
                <component :is="InquiryOptionIcons.ArrowDown" :size="14" />
                {{ t('agora', 'Can have responses') }}:
              </div>
              <div class="responses-list">
                <span 
                  v-for="response in allowedResponses" 
                  :key="response"
                  class="response-type"
                >
                 <component :is="getOptionTypeIcon(response)" :size="12" /> 
                  {{ getOptionTypeLabel(response) }}
                </span>
              </div>
            </div>

            <!-- Support & Comment info -->
            <div class="features-info">
              <div class="features-grid">
                <!-- Support feature -->
                <div v-if="hasSupportFeature" class="feature-item">
                  <component :is="InquiryOptionIcons.ThumbUp" :size="16" />
                  <span class="feature-label">{{ supportFeatureLabel }}</span>
                </div>
                
                <!-- Comments feature -->
                <div v-if="allowComment" class="feature-item">
                  <component :is="InquiryOptionIcons.Comment" :size="16" />
                  <span class="feature-label">{{ t('agora', 'Comments allowed') }}</span>
                </div>
                
                <!-- Statuses -->
                <div v-if="hasStatuses" class="feature-item">
                  <component :is="InquiryOptionIcons.Circle" :size="16" />
                  <span class="feature-label">{{ t('agora', 'Has statuses') }}</span>
                </div>
              </div>
            </div>

            <!-- Form fields -->
            <div class="form-fields">
              <!-- Label -->
              <div v-if="useTitle" class="form-field">
                <label for="option-title">{{ t('agora', 'Title') }} *</label>
                <NcRichContenteditable
                  id="option-title"
                  v-model="formData.title"
                  :autolink="true"
                  :use-markdown="true"
                  :emoji-autocomplete="true"
                  :link-autocomplete="true"
                  :placeholder="t('agora', 'Enter a title for this option')"
                  full-width
                  @keyup.enter="formData.text && createOption()"
                />
              </div>

              <!-- Description -->
              <div class="form-field">
                <label for="option-text">{{ t('agora', 'Description') }}</label>
                <NcRichContenteditable
                  id="option-text"
                  v-model="formData.text"
                  :placeholder="t('agora', 'Add a text (optional)')"
                  :emoji-autocomplete="true"
                  :link-autocomplete="true"
                  :autolink="true"
                  :use-markdown="true"
                  :multiline="true"
                  :rows="4"
                  full-width
                  @keydown.ctrl.enter="createOption"
                />
              </div>

              <!-- Additional fields based on option type -->
              <template v-if="hasAdditionalFields">
                <div 
                  v-for="field in additionalFields" 
                  :key="field.key"
                  class="form-field"
                >
                  <label :for="`field-${field.key}`">
                    {{ getFieldLabel(field) }}
                    <span v-if="field.required" class="required">*</span>
                  </label>
                  
                  <!-- Text field -->
                  <template v-if="field.type === 'text'">
                    <NcRichContenteditable
                      :id="`field-${field.key}`"
                      v-model="additionalFormData[field.key]"
                      :autolink="true"
                      :use-markdown="true"
                      :emoji-autocomplete="true"
                      :link-autocomplete="true"
                      :placeholder="field.placeholder || ''"
                      :required="field.required"
                      full-width
                    />
                  </template>
                  
                  <!-- Textarea -->
                  <template v-else-if="field.type === 'textarea'">
                    <NcTextArea
                      :id="`field-${field.key}`"
                      v-model="additionalFormData[field.key]"
                      :placeholder="field.placeholder || ''"
                      type="textarea"
                      :rows="3"
                      :required="field.required"
                      full-width
                    />
                  </template>
                  
                  <!-- Boolean (switch) -->
                  <template v-else-if="field.type === 'boolean'">
                    <div class="checkbox-field">
                      <NcCheckboxRadioSwitch
                        :id="`field-${field.key}`"
                        type="switch"
                        :checked="additionalFormData[field.key] || false"
                        @update:checked="additionalFormData[field.key] = $event"
                      />
                      <label :for="`field-${field.key}`">{{ field.label || field.key }}</label>
                    </div>
                  </template>
                  
                  <!-- Number -->
                  <template v-else-if="field.type === 'number'">
                    <NcTextField
                      :id="`field-${field.key}`"
                      v-model.number="additionalFormData[field.key]"
                      type="number"
                      :placeholder="field.placeholder || ''"
                      :required="field.required"
                      full-width
                    />
                  </template>
                  
                  <!-- JSON (textarea for now) -->
                  <template v-else-if="field.type === 'json'">
                    <NcTextArea
                      :id="`field-${field.key}`"
                      v-model="additionalFormData[field.key]"
                      :placeholder="field.placeholder || t('agora', 'Enter JSON data')"
                      :rows="3"
                      :required="field.required"
                      full-width
                    />
                    <div class="field-hint">
                      {{ t('agora', 'Enter valid JSON data (e.g., ["item1", "item2"])') }}
                    </div>
                  </template>
                  
                  <!-- Select/dropdown -->
                  <template v-else-if="field.type === 'select'">
                    <NcSelect
                      :id="`field-${field.key}`"
                      v-model="additionalFormData[field.key]"
                      :options="getSelectOptions(field)"
                      :placeholder="field.placeholder || ''"
                      :required="field.required"
                      full-width
                    />
                  </template>
                </div>
              </template>
            </div>
          </div>

          <!-- Right column: Preview -->
          <div class="preview-column">
            <h4>{{ t('agora', 'Preview') }}</h4>
            <div class="preview-card">
               <OptionCard
                :option="previewOption"
                :inquiry-id="inquiryId"
                :compact="false"
                prevent-click
                /> 
            </div>
            
            <!-- Help text -->
            <div v-if="optionTypeHelp" class="help-text">
              <component :is="InquiryOptionIcons.Information" :size="16" />
              <p>{{ optionTypeHelp }}</p>
            </div>
            
            <!-- Statuses preview (if available) -->
            <div v-if="hasStatuses" class="statuses-preview">
              <h5>{{ t('agora', 'Available Statuses') }}</h5>
              <div class="statuses-list">
                <span 
                  v-for="status in statusesList" 
                  :key="status.value"
                  class="status-badge"
                  :class="`status-${status.value}`"
                >
                 <component :is="getStatusIcon(status.value)" :size="12" /> 
                  {{ status.label }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="modal-footer">
        <div v-if="formErrors.length > 0" class="form-errors">
          <span 
            v-for="error in formErrors" 
            :key="error"
            class="error-item"
          >
            <component :is="InquiryOptionIcons.AlertCircle" :size="14" />
            {{ error }}
          </span>
        </div>
        
        <div class="footer-actions">
          <NcButton type="tertiary" @click="$emit('close')">
            {{ t('agora', 'Cancel') }}
          </NcButton>
          <NcButton 
            type="primary" 
            :disabled="!formValid"
            @click="createOption"
          >
            <template #icon>
                <component :is="optionTypeIcon" :size="16" /> 
            </template>
            {{ t('agora', 'Create') }}
          </NcButton>
        </div>
      </div> 
    </div>
  </NcModal>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { t } from '@nextcloud/l10n'
import NcModal from '@nextcloud/vue/components/NcModal'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcRichContenteditable from '@nextcloud/vue/components/NcRichContenteditable'
import NcTextField from '@nextcloud/vue/components/NcTextField'
import NcCheckboxRadioSwitch from '@nextcloud/vue/components/NcCheckboxRadioSwitch'
import NcSelect from '@nextcloud/vue/components/NcSelect'
import NcTextArea from '@nextcloud/vue/components/NcTextArea'

import { useOptionsStore } from '../../stores/options'
import { useOptionStore } from '../../stores/option'
import { useSessionStore } from '../../stores/session'
import { InquiryOptionIcons } from '../../utils/icons.ts'
import {
  findOptionType,
  getOptionTypeLabel,
  getOptionTypeIconComponent,
  getOptionTypeColor,
  getOptionTypeDescription,
  getAllowedResponses,
  getOptionTypeFields,
  hasSupportFeature  as hasSupportFeatureHelper,
  getSupportFeatureLabel,
  allowsComments,
  usesTitle
} from '../../helpers/modules/InquiryOptionHelper'

import OptionCard from './OptionCard.vue'

// Types
import type { 
  Option
} from '../../Types/index.ts'

// Props
const props = defineProps<{
  inquiryId: number
  optionType: string | null
  parentId?: number | null
}>()

// Emits
const emit = defineEmits<{
  close: []
  created: [option: Option]
}>()

// Stores
const optionsStore = useOptionsStore()
const optionStore = useOptionStore()
const sessionStore = useSessionStore()

// State
const visible = ref(true)
const formData = ref({
  title: '',
  text: ''
})
const additionalFormData = ref<Record<string, any>>({})
const formErrors = ref<string[]>([])

// Computed - using helpers
const allOptionTypes = computed(() => sessionStore.appSettings?.inquiryOptionTypeTab || [])

const modalTitle = computed(() => {
  if (!props.optionType) return t('agora', 'Add Option')
  return t('agora', 'Add {type}', { type: optionTypeLabel.value })
})

const modalSubtitle = computed(() => optionTypeDescription.value || '')
const optionTypeLabel = computed(() => 
  getOptionTypeLabel(props.optionType, allOptionTypes.value, t('agora', 'Option'))
)

const optionTypeDescription = computed(() => 
  getOptionTypeDescription(props.optionType, allOptionTypes.value)
)

const optionTypeIcon = computed(() => 
  getOptionTypeIconComponent(props.optionType, allOptionTypes.value)
)

const optionTypeColor = computed(() => 
  getOptionTypeColor(props.optionType, allOptionTypes.value)
)

const parentOption = computed(() => {
  if (!props.parentId) return null
  return optionsStore.options.find(opt => opt.id === props.parentId)
})

const allowedResponses = computed(() => 
  getAllowedResponses(props.optionType, allOptionTypes.value)
)

const hasSupportFeature = computed(() => 
  hasSupportFeatureHelper(props.optionType, allOptionTypes.value)
)

const supportFeatureLabel = computed(() => 
  getSupportFeatureLabel(props.optionType, allOptionTypes.value)
)

const allowComment = computed(() => 
  allowsComments(props.optionType, allOptionTypes.value)
)

const hasStatuses = computed(() => {
  const optionType = findOptionType(props.optionType, allOptionTypes.value)
  const statuses = optionType?.statuses || []
  return statuses.length > 0
})

const statusesList = computed(() => {
  const optionType = findOptionType(props.optionType, allOptionTypes.value)
  if (!optionType?.statuses) return []
  
  const statuses = optionType.statuses
  if (Array.isArray(statuses)) {
    return statuses.map((status: string) => {
      const [value, label] = status.split(':')
      return { value, label: label || value }
    })
  }
  
  return []
})

const hasAdditionalFields = computed(() => additionalFields.value.length > 0)

const additionalFields = computed(() => 
  getOptionTypeFields(props.optionType, allOptionTypes.value)
)

const useTitle = computed(() => 
  usesTitle(props.optionType, allOptionTypes.value)
)

const optionTypeHelp = computed(() => {
  if (!props.optionType) return ''
  
  const helpTexts: Record<string, string> = {
    'chapter': t('agora', 'Chapters organize the main sections of your proposal. Add articles and sections within chapters.'),
    'article': t('agora', 'Articles contain the normative text of your proposal. Amendments can be proposed to modify articles.'),
    'position_for': t('agora', 'A position in favor of the proposal. Others can add arguments supporting or opposing this position.'),
    'position_against': t('agora', 'A position against the proposal. This can include conditional opposition.'),
    'argument_for': t('agora', 'An argument supporting a position. Keep arguments concise and evidence-based.'),
    'argument_against': t('agora', 'An argument opposing a position. Be constructive in your criticism.'),
    'alternative': t('agora', 'An alternative proposal that addresses objections while maintaining the original intent.'),
    'objection': t('agora', 'A formal objection that blocks consensus. Must be resolved before proceeding.'),
    'exception': t('agora', 'Negative feedback that does not block consensus but should be noted.'),
    'consultation_question': t('agora', 'A question posed to the collective for consultation and consensus building.'),
    'poll_option': t('agora', 'A selectable option in a poll for gathering opinions and preferences.'),
    'official_summary': t('agora', 'Final synthesis or accepted outcome of a discussion or debate.'),
    'official_result': t('agora', 'Official decision or result, typically locked and authoritative.')
  }
  
  return helpTexts[props.optionType] || t('agora', 'Create a new option to contribute to the discussion.')
})

const formValid = computed(() => {
  formErrors.value = []
  
  if (!formData.value.text.trim()) {
    formErrors.value.push(t('agora', 'At least a text is required'))
    return false
  }
  
  return true
})

const previewOption = computed((): Option => {
  const currentUser = sessionStore.currentUser
  const optionType = findOptionType(props.optionType, allOptionTypes.value) || {}
  
  return {
    id: 0,
    targetId: props.inquiryId,
    parentId: props.parentId || 0,
    type: props.optionType || '',
    title: formData.value.title || t('agora', 'Preview Title'),
    text: formData.value.text || t('agora', 'Preview text...'),
    textSafe: '',
    sortOrder: 0,
    configuration: {
      access: 'private',
      showResults: 'always',
      allowComment: allowComment.value ? 1 : 0,
      supportFeature: optionType.support_feature || 'none',
      family: optionType.family || ''
    },
    miscFields: additionalFormData.value,
    ownedGroup: '',
    owner: {
      id: currentUser?.id || 'preview-user',
      displayName: currentUser?.displayName || t('agora', 'Current User'),
      userRole: currentUser?.userRole || ''
    },
    currentUserStatus: {
      isInvolved: false,
      hasSupported: false,
      supportValue: null,
      isLoggedIn: !!currentUser?.id,
      isOwner: true,
      shareToken: '',
      userId: currentUser?.id || '',
      userRole: currentUser?.userRole || ''
    },
    status: {
      created: Math.floor(Date.now() / 1000),
      updated: Math.floor(Date.now() / 1000),
      isArchived: false,
      isDeleted: false,
      countParticipants: 0,
      countComments: 0,
      countSupports: 0,
      optionStatus: 'draft',
      countPositiveSupports: 0,
      countNegativeSupports: 0,
      countNeutralSupports: 0
    },
    permissions: {
      view: true,
      edit: true,
      delete: true,
      archive: true,
      support: true,
      comment: true,
      addShares: false,
      addSharesExternal: false,
      changeForeignSupports: false,
      changeOwner: false,
      reorderOptions: false,
      seeResults: true,
      seeUsernames: true,
      subscribe: true,
      takeOver: false,
      addOption: true,
      confirmOption: false
    },
    childs: [],
    meta: {
      chunking: {
        size: 0,
        loaded: 0
      },
      status: 'loaded'
    },
    inquiryInfo: {
      targetId: props.inquiryId,
      inquiryTitle: '',
      inquiryType: '',
      inquiryAccess: ''
    }
  }
})

// Methods
const getParentIcon = (parent: Option) => {
  return getOptionTypeIconComponent(parent.type, allOptionTypes.value)
}

// Use helper for getOptionTypeIcon
const getOptionTypeIcon = (type: string) => {
  return getOptionTypeIconComponent(type, allOptionTypes.value)
}

const getFieldLabel = (field: any) => {
  if (field.label) return field.label
  return field.key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase())
}

const getSelectOptions = (field: any) => {
  if (field.options && Array.isArray(field.options)) {
    return field.options.map((opt: any) => ({
      value: typeof opt === 'string' ? opt : opt.value,
      label: typeof opt === 'string' ? opt : opt.label || opt.value
    }))
  }
  return []
}

const getStatusIcon = (status: string) => {
  const statusIconMap: Record<string, any> = {
    'draft': InquiryOptionIcons.Pencil,
    'published': InquiryOptionIcons.Check,
    'accepted': InquiryOptionIcons.CheckCircle,
    'rejected': InquiryOptionIcons.CloseCircle,
    'proposed': InquiryOptionIcons.Lightbulb,
    'under_review': InquiryOptionIcons.ClockOutline,
    'active': InquiryOptionIcons.Check,
    'resolved': InquiryOptionIcons.ThumbUp
  }
  return statusIconMap[status] || InquiryOptionIcons.Circle
}

const initializeAdditionalFields = () => {
  additionalFormData.value = {}
  
  for (const field of additionalFields.value) {
    if (field.type === 'boolean') {
      additionalFormData.value[field.key] = field.default !== undefined ? field.default : false
    } else if (field.type === 'number') {
      additionalFormData.value[field.key] = field.default !== undefined ? Number(field.default) : 0
    } else {
      additionalFormData.value[field.key] = field.default !== undefined ? field.default : ''
    }
  }
}

const createOption = async () => {
  if (!formValid.value || !props.optionType) return
  
  try {
    const optionType = findOptionType(props.optionType, allOptionTypes.value) || {}
    
    const defaultAccess = 'private'
    const defaultStatus = 'draft'
    const defaultSupportFeature = optionType.support_feature || 'none'
    const defaultAllowComment = allowComment.value ? 1 : 0
    const defaultFamily = optionType.family || ''

    const miscFields: Record<string, any> = {}
    for (const field of additionalFields.value) {
      const value = additionalFormData.value[field.key]
      if (value !== undefined && value !== '') {
        if (field.type === 'json' && value) {
          try {
            miscFields[field.key] = typeof value === 'string' ? JSON.parse(value) : value
          } catch {
            miscFields[field.key] = value
          }
        } else {
          miscFields[field.key] = value
        }
      } else if (field.default !== undefined) {
        miscFields[field.key] = field.default
      }
    }

    const optionData = {
      title: formData.value.title.trim() || '',
      text: formData.value.text.trim() || '',
      type: props.optionType,
      targetId: props.inquiryId,
      parentId: props.parentId || 0,
      ownedGroup: '',
      access: defaultAccess,
      supportFeature: defaultSupportFeature,
      allowComment: defaultAllowComment,
      family: defaultFamily,
      status: defaultStatus,
      miscFields
    }

    const newOption = await optionStore.create(optionData)
    
    if (newOption) {
      emit('created', newOption)
      formData.value = { title: '', text: '' }
      additionalFormData.value = {}
      initializeAdditionalFields()
    }
    
  } catch (error: any) {
    console.error('Error creating option:', error)
    formErrors.value.push(t('agora', 'Error creating option: {error}', { 
      error: error.message || t('agora', 'Unknown error') 
    }))
  }
}

// Watch for option type changes
watch(() => props.optionType, (newType) => {
  if (newType) {
    initializeAdditionalFields()
  }
}, { immediate: true })

// Lifecycle
onMounted(() => {
  setTimeout(() => {
    const input = document.getElementById('option-text')
    if (input) input.focus()
  }, 100)
})
</script>

<style scoped lang="scss">
.add-option-modal {
  display: flex;
  flex-direction: column;
  height: 80vh;
  max-height: 800px;

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

    .form-grid {
      display: grid;
      grid-template-columns: 1fr 300px;
      gap: 32px;
      height: 100%;

      @media (max-width: 1024px) {
        grid-template-columns: 1fr;
        gap: 24px;
      }

      .form-column {
        .option-type-indicator {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
          padding: 16px;
          background: var(--color-background-dark);
          border-radius: 12px;
          border: 1px solid var(--color-border);

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

          .type-info {
            flex: 1;
            min-width: 0;

            h3 {
              margin: 0 0 4px 0;
              font-size: 16px;
              font-weight: 600;
              color: var(--color-main-text);
            }

            p {
              margin: 0;
              font-size: 14px;
              color: var(--color-text-light);
              line-height: 1.4;
            }
          }
        }

        .parent-info,
        .responses-info {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 16px;
          padding: 12px;
          background: var(--color-background-dark);
          border-radius: 8px;
          border: 1px solid var(--color-border);

          .parent-label,
          .responses-label {
            font-size: 13px;
            font-weight: 600;
            color: var(--color-text-light);
            display: flex;
            align-items: center;
            gap: 4px;
            flex-shrink: 0;
          }

          .parent-details {
            display: flex;
            align-items: center;
            gap: 8px;
            flex: 1;

            span {
              font-size: 14px;
              color: var(--color-main-text);
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }

          .responses-list {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            flex: 1;

            .response-type {
              display: flex;
              align-items: center;
              gap: 4px;
              font-size: 12px;
              padding: 2px 6px;
              background: var(--color-background-darker);
              border-radius: 6px;
              color: var(--color-text-lighter);
            }
          }
        }

        .features-info {
          margin-bottom: 24px;
          padding: 12px;
          background: var(--color-background-dark);
          border-radius: 8px;
          border: 1px solid var(--color-border);

          .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 12px;

            .feature-item {
              display: flex;
              align-items: center;
              gap: 8px;
              font-size: 13px;
              color: var(--color-text-light);

              .feature-label {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }
        }

        .form-fields {
          display: flex;
          flex-direction: column;
          gap: 20px;

          .form-field {
            label {
              display: block;
              margin-bottom: 8px;
              font-size: 14px;
              font-weight: 600;
              color: var(--color-main-text);

              .required {
                color: var(--color-error);
                margin-left: 2px;
              }
            }

            .checkbox-field {
              display: flex;
              align-items: center;
              gap: 12px;

              label {
                margin: 0;
                font-weight: normal;
                cursor: pointer;
              }
            }

            .field-hint {
              font-size: 12px;
              color: var(--color-text-lighter);
              margin-top: 4px;
              font-style: italic;
            }
          }
        }
      }

      .preview-column {
        h4 {
          margin: 0 0 16px 0;
          font-size: 16px;
          font-weight: 600;
          color: var(--color-main-text);
        }

        .preview-card {
          margin-bottom: 20px;
          border: 2px dashed var(--color-border);
          border-radius: 12px;
          overflow: hidden;
        }

        .help-text {
          padding: 16px;
          background: var(--color-background-dark);
          border-radius: 12px;
          border: 1px solid var(--color-border);
          margin-bottom: 20px;

          display: flex;
          gap: 12px;

          svg {
            flex-shrink: 0;
            color: var(--color-text-lighter);
            margin-top: 2px;
          }

          p {
            margin: 0;
            font-size: 13px;
            color: var(--color-text-light);
            line-height: 1.5;
          }
        }

        .statuses-preview {
          h5 {
            margin: 0 0 12px 0;
            font-size: 14px;
            font-weight: 600;
            color: var(--color-text-light);
          }

          .statuses-list {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;

            .status-badge {
              display: inline-flex;
              align-items: center;
              gap: 4px;
              font-size: 11px;
              padding: 2px 8px;
              border-radius: 10px;
              font-weight: 600;

              &.status-draft {
                background: var(--color-background-darker);
                color: var(--color-text-lighter);
              }

              &.status-published,
              &.status-accepted,
              &.status-resolved {
                background: var(--color-success-light);
                color: var(--color-success);
              }

              &.status-rejected {
                background: var(--color-error-light);
                color: var(--color-error);
              }

              &.status-proposed,
              &.status-active {
                background: var(--color-warning-light);
                color: var(--color-warning);
              }

              &.status-review {
                background: var(--color-info-light);
                color: var(--color-info);
              }
            }
          }
        }
      }
    }
  }

  .modal-footer {
    padding: 16px 24px;
    border-top: 1px solid var(--color-border);
    background: var(--color-background-dark);

    .form-errors {
      margin-bottom: 12px;

      .error-item {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 13px;
        color: var(--color-error);
        margin-bottom: 4px;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    .footer-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }
  }
}

@media (max-width: 768px) {
  .add-option-modal {
    height: 90vh;

    .modal-content {
      padding: 16px;

      .form-grid {
        .form-column {
          .option-type-indicator {
            flex-direction: column;
            text-align: center;
            gap: 12px;

            .type-info {
              text-align: center;
            }
          }

          .features-info {
            .features-grid {
              grid-template-columns: 1fr;
            }
          }
        }
      }
    }
  }
}
</style>
