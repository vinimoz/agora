<!--
  - SPDX-FileCopyrightText: 2025 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { ref, computed, onMounted, watch, onUnmounted } from 'vue'
import { t } from '@nextcloud/l10n'
import { showSuccess, showError } from '@nextcloud/dialogs'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcTextArea from '@nextcloud/vue/components/NcTextArea'
import NcSelect from '@nextcloud/vue/components/NcSelect'
import { useInquiryGroupStore } from '../../stores/inquiryGroup.ts'
import { useSessionStore } from '../../stores/session'
import { useAttachmentsStore } from '../../stores/attachments' // Import attachments store

// Import icons from InquiryGeneralIcons
import { InquiryGeneralIcons, StatusIcons } from '../../utils/icons.ts'

// Emits
const emit = defineEmits<{
  saved: []
}>()

// Stores
const inquiryGroupStore = useInquiryGroupStore()
const sessionStore = useSessionStore()
const attachmentsStore = useAttachmentsStore()

// State
const loading = ref(false)
const autoSaving = ref(false)
const imageFileInput = ref<HTMLInputElement | null>(null)
const currentCoverUrl = ref('')

// Auto-save debouncing
let saveTimeout: NodeJS.Timeout | null = null
let lastSaveData = ''

// Form validation
const formErrors = ref({
  title: '',
  titleExt: '',
  description: '',
})

// Computed
const availableGroupStatuses = computed(() => [
    { id: 'draft', label: t('agora', 'Draft'), icon: StatusIcons.Draft },
    { id: 'active', label: t('agora', 'Active'), icon: StatusIcons.Active },
    { id: 'archived', label: t('agora', 'Archived'), icon: StatusIcons.Archived },
  ])

const statusOptions = computed(() => 
  availableGroupStatuses.value.map(status => ({
    id: status.id,
    label: status.label,
  }))
)

const canEditGroup = computed(() => inquiryGroupStore.currentUserStatus?.isOwner || 
         sessionStore.currentUser.type === 'admin' ||
         inquiryGroupStore.allowEdit)

// Methods
const loadGroup = async () => {
  if (!inquiryGroupStore.id) return
  
  loading.value = true
  try {
    await inquiryGroupStore.load(inquiryGroupStore.id)
    
    // Load cover image
    if (inquiryGroupStore.coverId) {
      currentCoverUrl.value = getNextcloudPreviewUrl(inquiryGroupStore.coverId)
    }
    
    // Initialize last save data
    lastSaveData = JSON.stringify(getSaveableData())
  } catch (error) {
    console.error('Failed to load group:', error)
    showError(t('agora', 'Failed to load group data'))
  } finally {
    loading.value = false
  }
}

const getNextcloudPreviewUrl = (fileId: number, x: number = 400, y: number = 200) => {
  const baseUrl = window.location.origin
  return `${baseUrl}/index.php/core/preview?fileId=${fileId}&x=${x}&y=${y}&a=1`
}

const triggerImageUpload = () => {
  if (!canEditGroup.value) return
  imageFileInput.value?.click()
}

/**
 * Upload a single file and add to attachments list
 * @param event
 */
const handleImageUpload = async (event: Event) => {
  if (!canEditGroup.value) return
  
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  if (!file.type.startsWith('image/')) {
    showError(t('agora', 'Please select an image file'))
    return
  }

  // Check image size 5Mb max
  const maxSize = 5 * 1024 * 1024
  if (file.size > maxSize) {
    showError(t('agora', 'Image size should be less than 5MB'))
    return
  }

  try {
    autoSaving.value = true
    
    const response = await attachmentsStore.uploadGroup(inquiryGroupStore.id, file, true)

    const attachment = {
      id: response.id ?? `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: response.name ?? file.name,
      size: response.size ?? file.size,
      fileId: response.fileId ?? undefined,
      mimeType: response.mimeType ?? undefined,
    }

    // Use immutable update for better reactivity
    attachmentsStore.attachments = [...attachmentsStore.attachments, attachment]
    currentCoverUrl.value = getNextcloudPreviewUrl(attachment.fileId as number)
    inquiryGroupStore.coverId = attachment.fileId as number
    
    // Auto-save after image upload
    await autoSaveGroup()
    showSuccess(t('agora', '{file} uploaded', { file: response.name ?? file.name }))
  } catch (error) {
    console.error('Failed to upload image:', error)
    showError(t('agora', 'Failed to upload cover image'))
    throw error
  } finally {
    autoSaving.value = false
    if (imageFileInput.value) {
      imageFileInput.value.value = ''
    }
  }
}

const getSaveableData = () => ({
    title: inquiryGroupStore.title.trim(),
    titleExt: inquiryGroupStore.titleExt.trim(),
    description: inquiryGroupStore.description.trim(),
    groupStatus: inquiryGroupStore.groupStatus,
    expire: inquiryGroupStore.expire,
    coverId: inquiryGroupStore.coverId,
  })

const validateForm = () => {
  let isValid = true
  formErrors.value = { title: '', titleExt: '', description: '' }

  if (!inquiryGroupStore.title.trim()) {
    formErrors.value.title = t('agora', 'Group title is required')
    isValid = false
  } else if (inquiryGroupStore.title.length > 200) {
    formErrors.value.title = t('agora', 'Title must be less than 200 characters')
    isValid = false
  }

  if (inquiryGroupStore.titleExt.length > 200) {
    formErrors.value.titleExt = t('agora', 'Extended title must be less than 200 characters')
    isValid = false
  }

  if (inquiryGroupStore.description.length > 1000) {
    formErrors.value.description = t('agora', 'Description must be less than 1000 characters')
    isValid = false
  }

  return isValid
}

const autoSaveGroup = async () => {
  if (!canEditGroup.value) return
  
  if (!validateForm()) {
    return
  }

  // Check if there are actual changes
  const currentData = JSON.stringify(getSaveableData())
  if (currentData === lastSaveData) {
    return // No changes to save
  }

  // Clear any existing timeout
  if (saveTimeout) {
    clearTimeout(saveTimeout)
    saveTimeout = null
  }

  autoSaving.value = true
  try {
    await inquiryGroupStore.update(getSaveableData())
    
    // Update last saved data
    lastSaveData = currentData
    
    // Show success feedback (optional, you might want to show this less frequently)
    // showSuccess(t('agora', 'Settings saved'))
    emit('saved')
  } catch (error) {
    console.error('Failed to save group:', error)
    showError(t('agora', 'Failed to save settings'))
  } finally {
    autoSaving.value = false
  }
}

const debouncedSave = () => {
  if (!canEditGroup.value) return
  
  // Clear any existing timeout
  if (saveTimeout) {
    clearTimeout(saveTimeout)
  }
  
  // Set new timeout for auto-save (1 second delay)
  saveTimeout = setTimeout(() => {
    autoSaveGroup()
  }, 1000)
}

const removeCoverImage = async () => {
  if (!canEditGroup.value) return
  
  try {
    autoSaving.value = true
    currentCoverUrl.value = ''
    inquiryGroupStore.coverId = null
    
    // Auto-save after removing cover image
    await autoSaveGroup()
    showSuccess(t('agora', 'Cover image removed'))
  } catch (error) {
    console.error('Failed to remove cover image:', error)
    showError(t('agora', 'Failed to remove cover image'))
  } finally {
    autoSaving.value = false
  }
}

const formatDate = (timestamp: number | null) => {
  if (!timestamp) return t('agora', 'Never')
  return new Date(timestamp * 1000).toLocaleDateString()
}

const getFormFieldState = (field: keyof typeof formErrors) => ({
    error: !!formErrors.value[field],
    success: !formErrors.value[field] && inquiryGroupStore[field as keyof typeof inquiryGroupStore] ? true : undefined,
    helperText: formErrors.value[field],
  })

// Watchers for auto-save
watch(() => inquiryGroupStore.title, debouncedSave, { deep: true })
watch(() => inquiryGroupStore.titleExt, debouncedSave, { deep: true })
watch(() => inquiryGroupStore.description, debouncedSave, { deep: true })
watch(() => inquiryGroupStore.groupStatus, debouncedSave, { deep: true })
watch(() => inquiryGroupStore.expire, debouncedSave, { deep: true })
watch(() => inquiryGroupStore.coverId, debouncedSave, { deep: true })

// Cleanup on unmount
onUnmounted(() => {
  if (saveTimeout) {
    clearTimeout(saveTimeout)
  }
})

// Lifecycle
onMounted(() => {
  loadGroup()
})
</script>

<template>
  <div class="inquiry-group-sidebar-settings">
    <!-- Header -->
    <div class="sidebar-header">
      <h2>{{ t('agora', 'Group Configuration') }}</h2>
      <p class="subtitle">{{ inquiryGroupStore.title || t('agora', 'Untitled group') }}</p>
      
      <div v-if="!canEditGroup" class="readonly-notice">
        <component :is="InquiryGeneralIcons.AlertCircle" />
        <span>{{ t('agora', 'Read-only mode') }}</span>
      </div>
    </div>

    <!-- Cover Image -->
    <div class="settings-section">
      <h3 class="section-title">
        <component :is="InquiryGeneralIcons.Image" />
        {{ t('agora', 'Cover Image') }}
      </h3>
      
      <div class="cover-section">
        <input
          ref="imageFileInput"
          type="file"
          class="hidden"
          accept="image/*"
          :aria-label="t('agora', 'Select cover image')"
          :disabled="!canEditGroup"
          @change="handleImageUpload"
        />

        <div 
          v-if="currentCoverUrl" 
          class="cover-preview"
          :class="{ 'readonly': !canEditGroup }"
          @click="triggerImageUpload"
        >
          <img 
            :src="currentCoverUrl" 
            :alt="t('agora', 'Cover image')"
            class="cover-image"
          />
          <div v-if="canEditGroup" class="cover-overlay">
            <NcButton type="primary" class="change-cover-btn">
              <component :is="InquiryGeneralIcons.Edit" />
              {{ t('agora', 'Change') }}
            </NcButton>
            <NcButton 
              type="error" 
              class="remove-cover-btn"
              @click.stop="removeCoverImage"
            >
              {{ t('agora', 'Remove') }}
            </NcButton>
          </div>
        </div>

        <div 
          v-else
          class="cover-placeholder"
          :class="{ 'readonly': !canEditGroup }"
          @click="triggerImageUpload"
        >
          <div class="placeholder-content">
            <component :is="InquiryGeneralIcons.Image" class="placeholder-icon" />
            <NcButton 
              type="primary" 
              class="add-cover-btn"
              :disabled="!canEditGroup || autoSaving"
            >
              {{ t('agora', 'Add cover image') }}
            </NcButton>
            <p class="placeholder-text">{{ t('agora', 'Click to add a cover image') }}</p>
          </div>
        </div>
        
        <p class="cover-help">{{ t('agora', 'Recommended size: 1200×400 pixels') }}</p>
      </div>
    </div>

    <!-- Basic Information -->
    <div class="settings-section">
      <h3 class="section-title">
        <component :is="InquiryGeneralIcons.Title" />
        {{ t('agora', 'Basic Information') }}
      </h3>
      
      <div class="form-fields">
        <!-- Title Field - Full width -->
        <NcTextArea
          v-model="inquiryGroupStore.title"
          :label="t('agora', 'Title') + ' *'"
          :placeholder="t('agora', 'Enter group title')"
          :maxlength="200"
          :disabled="!canEditGroup || autoSaving"
          :error="getFormFieldState('title').error"
          :success="getFormFieldState('title').success"
          :helper-text="getFormFieldState('title').helperText"
          class="form-input full-width"
        >
          <template #icon>
            <component :is="InquiryGeneralIcons.Text" />
          </template>
        </NcTextArea>
        
        <!-- Extended Title Field - Full width -->
        <NcTextArea
          v-model="inquiryGroupStore.titleExt"
          :label="t('agora', 'Extended Title')"
          :placeholder="t('agora', 'Optional extended title')"
          :maxlength="200"
          :disabled="!canEditGroup || autoSaving"
          :error="getFormFieldState('titleExt').error"
          :success="getFormFieldState('titleExt').success"
          :helper-text="getFormFieldState('titleExt').helperText"
          class="form-input full-width"
        >
          <template #icon>
            <component :is="InquiryGeneralIcons.Text" />
          </template>
        </NcTextArea>
      </div>
    </div>

    <!-- Description -->
    <div class="settings-section">
      <h3 class="section-title">
        <component :is="InquiryGeneralIcons.Description" />
        {{ t('agora', 'Description') }}
      </h3>
      
      <div class="form-group">
        <NcTextArea
          v-model="inquiryGroupStore.description"
          :placeholder="t('agora', 'Enter group description …')"
          :rows="10"
          :disabled="!canEditGroup || autoSaving"
          class="form-textarea large"
        />
        <div class="character-count">
          {{ inquiryGroupStore.description.length }}/2000
          <span v-if="formErrors.description" class="error-text">
            {{ formErrors.description }}
          </span>
        </div>
      </div>
    </div>

    <!-- Status & Settings -->
    <div class="settings-section">
      <h3 class="section-title">
        <component :is="InquiryGeneralIcons.Status" />
        {{ t('agora', 'Status & Settings') }}
      </h3>
      
      <div class="form-fields">
        <!-- Status Field -->
        <div class="form-group full-width">
          <label class="form-label">
            {{ t('agora', 'Status') }}
          </label>
          <NcSelect
            v-model="inquiryGroupStore.groupStatus"
            :options="statusOptions"
            :clearable="false"
            :disabled="!canEditGroup || autoSaving"
            class="form-select"
          />
          <p class="form-help">{{ t('agora', 'Current status of the group') }}</p>
        </div>
        
        <!-- Expiration Field -->
        <div v-if="inquiryGroupStore.expire" class="form-group full-width">
          <label class="form-label">
            {{ t('agora', 'Expiration') }}
          </label>
          <div class="expiration-info">
            <p>{{ formatDate(inquiryGroupStore.expire) }}</p>
            <NcButton 
              type="secondary" 
              size="small"
              :disabled="!canEditGroup || autoSaving"
              @click="inquiryGroupStore.expire = null"
            >
              {{ t('agora', 'Remove expiration') }}
            </NcButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Auto-save Status -->
    <div v-if="canEditGroup" class="auto-save-status">
      <div v-if="autoSaving" class="saving-indicator">
        <div class="saving-spinner"></div>
        <span>{{ t('agora', 'Saving changes …') }}</span>
      </div>
      <div v-else class="saved-indicator">
        <component :is="InquiryGeneralIcons.CheckCircle" />
        <span>{{ t('agora', 'Changes saved') }}</span>
      </div>
    </div>
    
    <!-- Loading State -->
    <div v-if="loading" class="loading-overlay">
      <div class="loading-content">
        <div class="loading-spinner"></div>
        <p>{{ t('agora', 'Loading group settings …') }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.inquiry-group-sidebar-settings {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.sidebar-header {
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid var(--color-border);
  
  h2 {
    font-size: 20px;
    font-weight: 600;
    color: var(--color-main-text);
    margin-bottom: 4px;
  }
  
  .subtitle {
    font-size: 14px;
    color: var(--color-text-lighter);
    margin: 0 0 8px 0;
  }
  
  .readonly-notice {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: var(--color-warning-light);
    border: 1px solid var(--color-warning);
    border-radius: 8px;
    font-size: 13px;
    color: var(--color-warning-text);
    
    svg {
      color: var(--color-warning);
    }
  }
}

.settings-section {
  margin-bottom: 28px;
  
  .section-title {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 16px;
    font-weight: 600;
    color: var(--color-main-text);
    margin-bottom: 16px;
    
    svg {
      color: var(--color-primary-element);
    }
  }
}

.cover-section {
  .cover-preview {
    position: relative;
    width: 100%;
    height: 150px;
    border-radius: 12px;
    overflow: hidden;
    border: 2px solid var(--color-border);
    
    &:not(.readonly) {
      cursor: pointer;
      
      &:hover {
        .cover-overlay {
          opacity: 1;
        }
      }
    }
    
    .cover-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .cover-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      opacity: 0;
      transition: opacity 0.3s ease;
      
      .change-cover-btn,
      .remove-cover-btn {
        padding: 8px 16px;
        font-size: 12px;
      }
    }
  }
  
  .cover-placeholder {
    width: 100%;
    height: 100px;
    border: 2px dashed var(--color-border);
    border-radius: 12px;
    background: var(--color-background-dark);
    transition: all 0.2s ease;
    
    &:not(.readonly) {
      cursor: pointer;
      
      &:hover {
        border-color: var(--color-primary);
        background: var(--color-background-hover);
        
        .placeholder-icon {
          color: var(--color-primary);
        }
      }
    }
    
    .placeholder-content {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      
      .placeholder-icon {
        color: var(--color-text-lighter);
        margin-bottom: 12px;
        transition: color 0.2s ease;
      }
      
      .add-cover-btn {
        margin-bottom: 8px;
      }
      
      .placeholder-text {
        font-size: 12px;
        color: var(--color-text-lighter);
        margin: 0;
      }
    }
  }
  
  .cover-help {
    font-size: 12px;
    color: var(--color-text-lighter);
    margin-top: 8px;
    margin-bottom: 0;
    font-style: italic;
  }
}

.form-fields {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

:deep(.form-input) {
  width: 100%;
  
  &.full-width {
    margin-bottom: 8px;
  }
  
  .input-field__input-wrapper {
    .input-field__icon {
      color: var(--color-primary-element);
    }
    
    .input-field__input {
      &:disabled {
        background: var(--color-background-dark);
        cursor: not-allowed;
      }
    }
    
    &.input-field__input-wrapper--error {
      .input-field__icon {
        color: var(--color-error);
      }
    }
    
    &.input-field__input-wrapper--success {
      .input-field__icon {
        color: var(--color-success);
      }
    }
  }
}

.form-group {
  &.full-width {
    width: 100%;
  }
  
  .form-label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: var(--color-main-text);
    margin-bottom: 8px;
  }
  
  .form-textarea {
    width: 100%;
    
    &.large {
      min-height: 260px;
    }
    
    &:disabled {
      background: var(--color-background-dark);
      cursor: not-allowed;
    }
  }
  
  .form-help {
    font-size: 12px;
    color: var(--color-text-lighter);
    margin-top: 6px;
    margin-bottom: 0;
  }
  
  .character-count {
    font-size: 12px;
    color: var(--color-text-lighter);
    margin-top: 6px;
    text-align: right;
    
    .error-text {
      color: var(--color-error);
      margin-left: 8px;
    }
  }
}

.expiration-info {
  padding: 12px;
  background: var(--color-warning-light);
  border: 1px solid var(--color-warning);
  border-radius: 8px;
  
  p {
    margin: 0 0 8px 0;
    font-size: 14px;
    color: var(--color-main-text);
  }
}

.form-select {
  width: 100%;
  
  :deep(.multiselect) {
    &[disabled] {
      opacity: 0.5;
      cursor: not-allowed;
      
      .multiselect__tags {
        background: var(--color-background-dark);
      }
    }
  }
}

.auto-save-status {
  margin-top: 32px;
  padding-top: 20px;
  border-top: 2px solid var(--color-border);
  
  .saving-indicator,
  .saved-indicator {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
  }
  
  .saving-indicator {
    color: var(--color-text-lighter);
    
    .saving-spinner {
      width: 16px;
      height: 16px;
      border: 2px solid var(--color-border);
      border-top-color: var(--color-primary);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
  }
  
  .saved-indicator {
    color: var(--color-success);
    
    svg {
      color: var(--color-success);
    }
  }
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  
  .loading-content {
    text-align: center;
    
    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 3px solid var(--color-border);
      border-top-color: var(--color-primary);
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 16px;
    }
    
    p {
      font-size: 14px;
      color: var(--color-main-text);
      margin: 0;
    }
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.hidden {
  display: none;
}
</style>
