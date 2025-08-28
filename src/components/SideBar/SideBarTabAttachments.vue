<script setup lang="ts">
import { ref, computed } from 'vue';
import { t } from '@nextcloud/l10n';
import { NcButton } from '@nextcloud/vue';
import { useAttachmentsStore } from '../../stores/attachments';
import { useInquiryStore } from '../../stores/inquiry';
import Plus from 'vue-material-design-icons/Plus.vue';
import Close from 'vue-material-design-icons/Close.vue';
import FileDocument from 'vue-material-design-icons/FileDocument.vue';
import { showError, showSuccess } from '@nextcloud/dialogs';

// Stores
const attachmentsStore = useAttachmentsStore();
const inquiryStore = useInquiryStore();

const fileInput = ref<HTMLInputElement | null>(null);

const handleFileUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;
  if (!files || files.length === 0) return;

  target.value = '';
  const filesArray = Array.from(files);

  for (const file of filesArray) {
    try {
      const response = await attachmentsStore.upload(inquiryStore.id, file);
      const attachment = {
        id: response.id ?? `temp-${Date.now()}-${file.name}`,
        name: response.name ?? file.name,
        size: response.size ?? file.size,
        url: response.url ?? undefined
      };

      attachmentsStore.attachments = [
        ...attachmentsStore.attachments,
        attachment
      ];

      showSuccess(
        t('agora', '{file} uploaded', { file: response.name ?? file.name })
      );
    } catch (error) {
      console.error('Upload failed:', error);
      showError(t('agora', 'Failed to upload {file}', { file: file.name }));
    }
  }
};

const removeAttachment = async (index: number) => {
  const attachment = attachmentsStore.attachments[index];
  if (!attachment) return;

  try {
    if (attachment.id) {
      await attachmentsStore.delete(attachment.id);
    }
    attachmentsStore.attachments.splice(index, 1);
    showSuccess(t('agora', 'File has been removed !'));
  } catch (e) {
    console.error('Delete failed', e);
  }
};

const attachments = computed({
  get: () => attachmentsStore.attachments,
  set: (value) => {
    attachmentsStore.attachments = value;
  }
});

const triggerFileInput = () => {
  fileInput.value?.click();
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const unitIndex = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, unitIndex)).toFixed(2))} ${sizes[unitIndex]}`;
};
</script>

<template>
  <div class="sidebar-attachments">
    <div class="sidebar-header">
      <h2>Attachments Manager</h2>
    </div>

    <div class="attachment-upload">
      <input
        id="attachment-upload-input"
        ref="fileInput"
        type="file"
        multiple
        class="hidden"
        @change="handleFileUpload"
      />
      <NcButton
        v-if="inquiryStore.currentUserStatus.isOwner"
        type="primary"
        @click="triggerFileInput"
      >
        <template #icon>
          <Plus :size="20" />
        </template>
        Add files
      </NcButton>
    </div>

    <div class="attachments-list">
      <div v-if="attachments.length === 0" class="empty-state">
        No attachments
      </div>

      <div
        v-for="(attachment, index) in attachments"
        :key="attachment.id ?? index"
        class="attachment-item"
      >
        <div class="attachment-info">
          <FileDocument :size="20" class="file-icon" />
          <a
            v-if="attachment.url"
            class="attachment-link"
            :href="attachment.url"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ attachment.name }}
          </a>
          <span v-else class="attachment-name">{{ attachment.name }}</span>
          <span class="attachment-size">{{
            formatFileSize(attachment.size)
          }}</span>
        </div>
        <NcButton
          v-if="inquiryStore.currentUserStatus.isOwner"
          type="error"
          :aria-label="t('agora', 'Delete attachment')"
          @click="removeAttachment(index)"
        >
          <template #icon>
            <Close :size="20" />
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
    }

    .attachment-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: var(--default-grid-baseline);

      .attachment-info {
        display: flex;
        align-items: center;
        flex-grow: 1;
        min-width: 0;
        overflow: hidden;
      }

      .attachment-name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 70%;
      }

      .file-icon {
        flex-shrink: 0;
        color: var(--color-text-lighter);
      }

      .attachment-size {
        margin-left: auto;
        color: var(--color-text-lighter);
        font-size: 0.8em;
      }
    }
  }
}
</style>
