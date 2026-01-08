<!--
  SPDX-FileCopyrightText: 2024 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
  <NcModal
    v-if="show"
    :title="modalTitle"
    :close-button-contained="true"
    size="large"
    @close="closeModal"
  >
    <div class="add-option-modal">
      <!-- Option Type Info -->
      <div v-if="optionType" class="option-type-header">
        <div class="type-icon" :style="{ backgroundColor: optionType.color + '20' }">
          <component :is="getIcon(optionType.icon)" :size="24" :style="{ color: optionType.color }" />
        </div>
        <div class="type-info">
          <h3 class="type-name">{{ t('agora', optionType.name) }}</h3>
          <p class="type-description">{{ t('agora', optionType.description) }}</p>
        </div>
      </div>

      <!-- Form -->
      <div class="option-form">
        <!-- Text Input -->
        <div class="form-section">
          <label class="form-label">
            {{ t('agora', 'Option Text') }}
            <span class="required">*</span>
          </label>
          <div class="editor-container">
            <NcRichText
              v-if="supportsMarkdown"
              v-model="form.text"
              :autolink="true"
              :use-markdown="true"
              :disabled="submitting"
              :placeholder="t('agora', 'Enter your option text here...')"
              class="rich-text-editor"
              :rows="6"
            />
            <NcTextArea
              v-else
              v-model="form.text"
              :disabled="submitting"
              :placeholder="t('agora', 'Enter your option text here...')"
              class="text-area-editor"
              :rows="6"
            />
          </div>
          <div v-if="errors.text" class="error-message">
            {{ errors.text }}
          </div>
        </div>

        <!-- Misc Fields -->
        <div v-if="hasMiscFields" class="form-section">
          <h4 class="section-title">{{ t('agora', 'Additional Information') }}</h4>
          <div class="misc-fields">
            <div
              v-for="field in miscFields"
              :key="field.key"
              class="misc-field"
            >
              <label class="field-label">
                {{ t('agora', field.label) }}
                <span v-if="field.required" class="required">*</span>
              </label>
              
              <!-- Text Input -->
              <NcTextField
                v-if="field.type === 'text' || field.type === 'string'"
                v-model="form.miscFields[field.key]"
                :type="field.type === 'number' ? 'number' : 'text'"
                :disabled="submitting"
                :placeholder="field.description"
                class="field-input"
              />
              
              <!-- Textarea -->
              <NcTextArea
                v-else-if="field.type === 'textarea'"
                v-model="form.miscFields[field.key]"
                :disabled="submitting"
                :placeholder="field.description"
                class="field-textarea"
                :rows="4"
              />
              
              <!-- Select -->
              <NcSelect
                v-else-if="field.type === 'select'"
                v-model="form.miscFields[field.key]"
                :options="getSelectOptions(field)"
                :disabled="submitting"
                :placeholder="field.description"
                class="field-select"
              />
              
              <!-- Checkbox -->
              <NcCheckboxRadioSwitch
                v-else-if="field.type === 'checkbox' || field.type === 'boolean'"
                v-model="form.miscFields[field.key]"
                type="switch"
                :disabled="submitting"
                class="field-checkbox"
              >
                {{ field.description }}
              </NcCheckboxRadioSwitch>
              
              <!-- Date -->
              <NcDateTimePicker
                v-else-if="field.type === 'date' || field.type === 'datetime'"
                v-model="form.miscFields[field.key]"
                :type="field.type === 'date' ? 'date' : 'datetime'"
                :disabled="submitting"
                :placeholder="field.description"
                class="field-date"
              />
              
              <div v-if="errors.miscFields?.[field.key]" class="error-message">
                {{ errors.miscFields[field.key] }}
              </div>
            </div>
          </div>
        </div>

        <!-- Access Settings -->
        <div v-if="canSetAccess" class="form-section">
          <h4 class="section-title">{{ t('agora', 'Visibility') }}</h4>
          <div class="access-settings">
            <NcSelect
              v-model="form.access"
              :options="accessOptions"
              :disabled="submitting"
              class="access-select"
            />
            <p class="access-description">
              {{ getAccessDescription(form.access) }}
            </p>
          </div>
        </div>

        <!-- Allow Comments -->
        <div v-if="optionType?.features?.includes('comments')" class="form-section">
          <NcCheckboxRadioSwitch
            v-model="form.allowComment"
            type="switch"
            :disabled="submitting"
            class="comment-toggle"
          >
            {{ t('agora', 'Allow comments on this option') }}
          </NcCheckboxRadioSwitch>
        </div>

        <!-- Error Message -->
        <div v-if="submitError" class="submit-error">
          <NcNoteCard type="error">
            {{ submitError }}
          </NcNoteCard>
        </div>
      </div>

      <!-- Actions -->
      <div class="modal-actions">
        <NcButton
          type="secondary"
          :disabled="submitting"
          @click="closeModal"
        >
          {{ t('agora', 'Cancel') }}
        </NcButton>
        <NcButton
          type="primary"
          :disabled="submitting || !isFormValid"
          @click="submitForm"
        >
          <template #icon>
            <component :is="InquiryGeneralIcons.Add" v-if="!submitting" :size="18" />
            <NcLoadingIcon v-else :size="18" />
          </template>
          {{ t('agora', 'Add Option') }}
        </NcButton>
      </div>
    </div>
  </NcModal>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { t } from '@nextcloud/l10n'
import NcModal from '@nextcloud/vue/components/NcModal'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcTextField from '@nextcloud/vue/components/NcTextField'
import NcTextArea from '@nextcloud/vue/components/NcTextArea'
import NcRichText from '@nextcloud/vue/components/NcRichText'
import NcSelect from '@nextcloud/vue/components/NcSelect'
import NcCheckboxRadioSwitch from '@nextcloud/vue/components/NcCheckboxRadioSwitch'
import NcDateTimePicker from '@nextcloud/vue/components/NcDateTimePicker'
import NcNoteCard from '@nextcloud/vue/components/NcNoteCard'
import NcLoadingIcon from '@nextcloud/vue/components/NcLoadingIcon'

import { useInquiryStore } from '../../stores/inquiry'
import { useOptionsStore , OptionTypeDefinition } from '../../stores/options'
import { useSessionStore } from '../../stores/session'
import { InquiryGeneralIcons } from '../../utils/icons.ts'

// Props
const props = defineProps<{
  inquiryId: number
  optionType: OptionTypeDefinition | null
  parentId?: number | null
}>()

const emit = defineEmits<{
  close: []
  created: [option: any]
}>()

// Stores
const inquiryStore = useInquiryStore()
const optionsStore = useOptionsStore()
const sessionStore = useSessionStore()

// State
const show = ref(true)
const submitting = ref(false)
const submitError = ref<string | null>(null)

// Form
const form = ref({
  text: '',
  miscFields: {} as Record<string, any>,
  access: 'public' as string,
  allowComment: true
})

const errors = ref({
  text: '',
  miscFields: {} as Record<string, string>
})

// Computed
const modalTitle = computed(() => {
  if (props.parentId) {
    return t('agora', 'Add Child Option')
  }
  return t('agora', 'Add New Option')
})

const supportsMarkdown = computed(() => props.optionType?.features?.includes('markdown') || false)

const miscFields = computed(() => props.optionType?.miscFields || [])

const hasMiscFields = computed(() => miscFields.value.length > 0)

const canSetAccess = computed(() => inquiryStore.permissions.setAccess)

const accessOptions = computed(() => [
    { value: 'public', label: t('agora', 'Public - Visible to everyone') },
    { value: 'participants', label: t('agora', 'Participants only') },
    { value: 'moderators', label: t('agora', 'Moderators only') }
  ])

const isFormValid = computed(() => {
  // Check required fields
  if (!form.value.text.trim()) return false
  
  // Check misc fields
  for (const field of miscFields.value) {
    if (field.required && !form.value.miscFields[field.key]) {
      return false
    }
  }
  
  return true
})

// Methods
const getIcon = (iconName: string) => {
  const iconMap: Record<string, any> = {
    'icon-discussion': InquiryGeneralIcons.Discussion,
    'icon-question': InquiryGeneralIcons.Question,
    'icon-lightbulb': InquiryGeneralIcons.Lightbulb,
    'icon-settings': InquiryGeneralIcons.Settings,
    'icon-code': InquiryGeneralIcons.Code,
    'icon-category-other': InquiryGeneralIcons.CategoryOther,
    'icon-like': InquiryGeneralIcons.ThumbUp,
    'icon-dislike': InquiryGeneralIcons.ThumbDown,
    'icon-checkmark': InquiryGeneralIcons.Checkmark,
  }
  return iconMap[iconName] || InquiryGeneralIcons.File
}

const getSelectOptions = (field: any) => field.options?.map((option: any) => ({
    value: option.value,
    label: t('agora', option.label)
  })) || []

const getAccessDescription = (access: string) => {
  switch (access) {
    case 'public':
      return t('agora', 'Everyone can see and interact with this option')
    case 'participants':
      return t('agora', 'Only participants of this inquiry can see this option')
    case 'moderators':
      return t('agora', 'Only moderators can see this option')
    default:
      return ''
  }
}

const validateForm = () => {
  let isValid = true
  errors.value = { text: '', miscFields: {} }
  
  // Validate text
  if (!form.value.text.trim()) {
    errors.value.text = t('agora', 'Option text is required')
    isValid = false
  } else if (form.value.text.length > 10000) {
    errors.value.text = t('agora', 'Option text is too long (max 10000 characters)')
    isValid = false
  }
  
  // Validate misc fields
  for (const field of miscFields.value) {
    const value = form.value.miscFields[field.key]
    
    if (field.required && (!value || (typeof value === 'string' && !value.trim()))) {
      errors.value.miscFields[field.key] = t('agora', 'This field is required')
      isValid = false
    }
    
    // Type-specific validation
    if (value && field.type === 'number') {
      const num = Number(value)
      if (isNaN(num)) {
        errors.value.miscFields[field.key] = t('agora', 'Must be a valid number')
        isValid = false
      }
      if (field.min !== undefined && num < field.min) {
        errors.value.miscFields[field.key] = t('agora', 'Value must be at least {min}', { min: field.min })
        isValid = false
      }
      if (field.max !== undefined && num > field.max) {
        errors.value.miscFields[field.key] = t('agora', 'Value must be at most {max}', { max: field.max })
        isValid = false
      }
    }
    
    if (value && field.type === 'string' && field.maxLength && value.length > field.maxLength) {
      errors.value.miscFields[field.key] = t('agora', 'Value is too long (max {max} characters)', { max: field.maxLength })
      isValid = false
    }
  }
  
  return isValid
}

const submitForm = async () => {
  if (!validateForm()) return
  
  submitting.value = true
  submitError.value = null
  
  try {
    const optionData = {
      inquiryId: props.inquiryId,
      type: props.optionType?.key,
      parentId: props.parentId,
      text: form.value.text,
      miscFields: form.value.miscFields,
      access: form.value.access,
      allowComment: form.value.allowComment
    }
    
    // This would call your API to create the option
    // const newOption = await api.createOption(optionData)
    const newOption = {
      id: Date.now(), // Temporary ID
      ...optionData,
      owner: sessionStore.currentUser,
      created: Math.floor(Date.now() / 1000),
      currentUserStatus: {
        hasSupported: false,
        countSupports: 0,
        countComments: 0
      }
    }
    
    emit('created', newOption)
    closeModal()
  } catch (error) {
    console.error('Error creating option:', error)
    submitError.value = t('agora', 'Failed to create option. Please try again.')
  } finally {
    submitting.value = false
  }
}

const closeModal = () => {
  show.value = false
  emit('close')
}

// Watch for option type changes to reset form
watch(() => props.optionType, (newType) => {
  if (newType) {
    form.value = {
      text: '',
      miscFields: {},
      access: 'public',
      allowComment: true
    }
    errors.value = { text: '', miscFields: {} }
    submitError.value = null
  }
}, { immediate: true })
</script>

<style scoped lang="scss">
.add-option-modal {
  padding: 20px;
}

.option-type-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 2px solid var(--color-border);

  .type-icon {
    width: 56px;
    height: 56px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .type-info {
    flex: 1;

    .type-name {
      margin: 0 0 8px 0;
      font-size: 20px;
      font-weight: 700;
      color: var(--color-main-text);
    }

    .type-description {
      margin: 0;
      font-size: 14px;
      color: var(--color-text-lighter);
      line-height: 1.5;
    }
  }
}

.option-form {
  .form-section {
    margin-bottom: 24px;

    .form-label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      color: var(--color-main-text);

      .required {
        color: var(--color-error);
        margin-left: 4px;
      }
    }

    .section-title {
      margin: 0 0 16px 0;
      font-size: 16px;
      font-weight: 600;
      color: var(--color-main-text);
    }

    .editor-container {
      .rich-text-editor,
      .text-area-editor {
        width: 100%;
        border: 2px solid var(--color-border);
        border-radius: 12px;
        padding: 12px;
        transition: border-color 0.3s ease;

        &:focus {
          border-color: var(--color-primary-element);
          outline: none;
        }

        &:disabled {
          background: var(--color-background-dark);
          cursor: not-allowed;
        }
      }
    }

    .error-message {
      color: var(--color-error);
      font-size: 12px;
      margin-top: 4px;
    }
  }

  .misc-fields {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 16px;

    .misc-field {
      .field-label {
        display: block;
        margin-bottom: 8px;
        font-weight: 600;
        color: var(--color-main-text);

        .required {
          color: var(--color-error);
          margin-left: 4px;
        }
      }

      .field-input,
      .field-textarea,
      .field-select,
      .field-date {
        width: 100%;
        border: 2px solid var(--color-border);
        border-radius: 12px;
        padding: 12px;
        transition: border-color 0.3s ease;

        &:focus {
          border-color: var(--color-primary-element);
          outline: none;
        }

        &:disabled {
          background: var(--color-background-dark);
          cursor: not-allowed;
        }
      }

      .field-textarea {
        resize: vertical;
      }

      .field-checkbox {
        margin-top: 8px;
      }
    }
  }

  .access-settings {
    .access-select {
      width: 100%;
      margin-bottom: 8px;
    }

    .access-description {
      margin: 8px 0 0 0;
      font-size: 12px;
      color: var(--color-text-lighter);
      font-style: italic;
    }
  }

  .comment-toggle {
    margin-top: 8px;
  }

  .submit-error {
    margin-top: 16px;
  }
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 2px solid var(--color-border);
}

@media (max-width: 768px) {
  .add-option-modal {
    padding: 16px;
  }

  .option-type-header {
    flex-direction: column;
    text-align: center;

    .type-icon {
      align-self: center;
    }
  }

  .misc-fields {
    grid-template-columns: 1fr !important;
  }

  .modal-actions {
    flex-direction: column;
    
    button {
      width: 100%;
    }
  }
}
</style>
