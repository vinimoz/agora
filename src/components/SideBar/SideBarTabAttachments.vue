<script setup lang="ts">
import { ref, computed } from 'vue'
import { t } from '@nextcloud/l10n'
import { NcButton } from '@nextcloud/vue'
import { useAttachmentsStore } from '../../stores/attachments'
import { useInquiryStore } from '../../stores/inquiry'
import { showError, showSuccess } from '@nextcloud/dialogs'
import { InquiryGeneralIcons } from '../../utils/icons.ts'

// Stores
const attachmentsStore = useAttachmentsStore()
const inquiryStore = useInquiryStore()

// Template refs
const fileInput = ref<HTMLInputElement | null>(null)


interface Attachment {
  id: number | string
  name: string
  size: number
  url?: string
}

/**
 * Handle file upload from input change event
 * @param event
 */
const handleFileUpload = async (event: Event) => {
  try {
    const target = event.target as HTMLInputElement
    const files = target.files
    
    
    if (!files || files.length === 0) {
      return
    }

    // Convert FileList to array and reset input
    const filesArray = Array.from(files)
    
    // Reset input value after processing files (compatible with all browsers)
    setTimeout(() => {
      if (target) {
        target.value = ''
      }
    }, 100)

    // Process each file sequentially
    for (const file of filesArray) {
      await uploadSingleFile(file)
    }
  } catch (error) {
    console.error('Upload process failed:', error)
    showError(t('agora', 'Upload process failed'))
  }
}

/**
 * Upload a single file and add to attachments list
 * @param file
 */
const uploadSingleFile = async (file: File) => {
  try {
    
    const response = await attachmentsStore.upload(inquiryStore.id, file)
    
    const attachment = {
      id: response.id ?? `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: response.name ?? file.name,
      size: response.size ?? file.size,
      url: response.url ?? undefined,
    }

    // Use immutable update for better reactivity
    attachmentsStore.attachments = [...attachmentsStore.attachments, attachment]

    showSuccess(t('agora', '{file} uploaded', { file: response.name ?? file.name }))
  } catch (error) {
    console.error('Upload failed for file:', file.name, error)
    showError(t('agora', 'Failed to upload {file}', { file: file.name }))
    throw error // Re-throw to handle in parent function
  }
}

/**
 * Remove attachment from list and delete from server
 * @param index
 */
const removeAttachment = async (index: number) => {
  const attachment = attachmentsStore.attachments[index]
  if (!attachment) {
    console.warn('No attachment found at index:', index)
    return
  }

  try {
    // Only delete from server if it's a positive numeric ID
    if (attachment.id && attachment.id > 0) {
      await attachmentsStore.delete(attachment.id)
    }

    // Use filter for immutable update
    attachmentsStore.attachments = attachmentsStore.attachments.filter((_, i) => i !== index)

    showSuccess(t('agora', 'File has been removed!'))
  } catch (error) {
    console.error('Delete failed for attachment:', attachment.name, error)
    showError(t('agora', 'Failed to remove file'))
  }
}

/**
 * Open attachment in new tab
 * @param attachment
 */
const openAttachment = (attachment: Attachment) => {
  if (attachment.url) {
    window.open(attachment.url, '_blank', 'noopener,noreferrer')
  } else {
    console.warn('No URL available for attachment:', attachment.name)
    showError(t('agora', 'Cannot open file - no URL available'))
  }
}

/**
 * Trigger file input click event
 */
const triggerFileInput = () => {
  
  if (fileInput.value) {
    fileInput.value.click()
  } else {
    console.error('File input reference is null')
    showError(t('agora', 'File input not available'))
  }
}

/**
 * Computed property for attachments with getter/setter
 */
const attachments = computed({
  get: () => attachmentsStore.attachments,
  set: (value) => {
    attachmentsStore.attachments = value
  },
})

/**
 * Format file size in human readable format
 * @param bytes
 */
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const unitIndex = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, unitIndex)).toFixed(2))} ${sizes[unitIndex]}`
}
</script>

<template>
  <div class="sidebar-attachments">
    <!-- Header section -->
    <div class="sidebar-header">
      <h2>{{ t('agora', 'Attachments Manager') }}</h2>
    </div>

    <!-- File upload section -->
    <div class="attachment-upload">
      <input
        id="attachment-upload-input"
        ref="fileInput"
        :label="t('agora', 'Select files to upload')"
        type="file"
        multiple
        class="hidden"
        accept="*/*"
        :aria-label="t('agora', 'Select files to upload')"
        @change="handleFileUpload"
      />
      <NcButton
        v-if="inquiryStore.currentUserStatus?.isOwner"
        type="primary"
        :aria-label="t('agora', 'Add files')"
        @click="triggerFileInput"
      >
        <template #icon>
          <component :is="InquiryGeneralIcons.attachment" :size="20" />
        </template>
        {{ t('agora', 'Add files') }}
      </NcButton>
    </div>

    <!-- Attachments list -->
    <div class="attachments-list">
      <!-- Empty state -->
      <div v-if="attachments.length === 0" class="empty-state">
        {{ t('agora', 'No attachments') }}
      </div>

      <!-- Attachment items -->
      <div
        v-for="(attachment, index) in attachments"
        :key="attachment.id || `attachment-${index}`"
        class="attachment-item"
      >
        <div class="attachment-info">
          <!-- File icon -->
          <component :is="InquiryGeneralIcons.document" :size="20" class="file-icon"/>
          
          <!-- File name with link or plain text -->
          <a
            v-if="attachment.url"
            class="attachment-link"
            :href="attachment.url"
            target="_blank"
            rel="noopener noreferrer"
            :title="attachment.name"
            @click.prevent="openAttachment(attachment)"
          >
            {{ attachment.name }}
          </a>
          <span v-else class="attachment-name" :title="attachment.name">
            {{ attachment.name }}
          </span>
          
          <!-- File size -->
          <span class="attachment-size">{{ formatFileSize(attachment.size) }}</span>
        </div>
        
        <!-- Delete button -->
        <NcButton
          v-if="inquiryStore.currentUserStatus?.isOwner"
          type="error"
          :aria-label="t('agora', 'Delete attachment')"
          @click="removeAttachment(index)"
        >
          <template #icon>
            <component :is="InquiryGeneralIcons.delete" :size="20" />
          </template>
        </NcButton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sidebar-attachments {
  padding: var(--default-grid-baseline);
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--default-grid-baseline);

  .sidebar-header {
    margin-bottom: var(--default-grid-baseline);
    border-bottom: 1px solid var(--color-border);
    padding-bottom: var(--default-grid-baseline);

    h2 {
      margin: 0;
      font-size: 1.2em;
      font-weight: 600;
      color: var(--color-text);
    }
  }

  .attachment-upload {
    margin-bottom: var(--default-grid-baseline);

    .hidden {
      display: none;
    }
  }

  .attachments-list {
    flex-grow: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: calc(var(--default-grid-baseline) / 2);

    .empty-state {
      text-align: center;
      color: var(--color-text-lighter);
      padding: calc(var(--default-grid-baseline) * 2);
      font-style: italic;
    }

    .attachment-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: var(--default-grid-baseline);
      padding: calc(var(--default-grid-baseline) / 2);
      border-radius: var(--border-radius);
      transition: background-color 0.2s ease;

      &:hover {
        background-color: var(--color-background-hover);
      }

      .attachment-info {
        display: flex;
        align-items: center;
        flex-grow: 1;
        min-width: 0;
        overflow: hidden;
        gap: calc(var(--default-grid-baseline) / 2);

        .file-icon {
          flex-shrink: 0;
          color: var(--color-text-lighter);
        }

        .attachment-link,
        .attachment-name {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 70%;
          color: var(--color-text);
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }

        .attachment-link {
          color: var(--color-primary);
        }

        .attachment-size {
          margin-left: auto;
          color: var(--color-text-lighter);
          font-size: 0.8em;
          flex-shrink: 0;
        }
      }
    }
  }
}
</style>
