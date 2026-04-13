<!--
  - SPDX-FileCopyrightText: 2024 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
  <NcModal
    :show="show"
    :name="modalTitle"
    size="large"
    class="import-document-modal"
    @close="handleClose"
  >
    <div class="modal-content">
      <div class="import-header">
        <component :is="ImportIcons.FileUpload" :size="48" class="header-icon" />
        <h2>{{ t('agora', 'Import Document') }}</h2>
        <p>{{ t('agora', 'Import documents, law proposals, or structured content from files') }}</p>
      </div>

      <!-- Drag & Drop Zone -->
      <div 
        class="file-drop-zone" 
        :class="{ 'drag-over': isDragOver }"
        @dragover.prevent="handleDragOver"
        @dragleave.prevent="handleDragLeave"
        @drop.prevent="handleFileDrop"
      >
        <div v-if="!selectedFile" class="drop-zone-content">
          <component :is="ImportIcons.FileUpload" :size="48" class="drop-icon" />
          <p class="drop-text">
          {{ t('agora', 'Drag and drop your file here') }}
          </p>
          <p class="drop-subtext">
          {{ t('agora', 'or') }}
          </p>

          <NcFilePicker 
             ref="picker"
             :accept="acceptedFormats"
             :multiple="false"
             @pick="handleFilePick" 
             />
          <div class="supported-formats">
              <span v-for="format in supportedFormats" :key="format" class="format-badge">
                  {{ format.toUpperCase() }}
              </span>
          </div>
          <div class="warning-note">
              <component :is="ImportIcons.Alert" :size="16" />
              <span>{{ t('agora', 'Image files are not supported') }}</span>
          </div>
        </div>

        <div v-else class="selected-file-info">
            <div class="file-icon">
                <component :is="getFileIcon(selectedFile.name)" :size="32" />
            </div>
            <div class="file-details">
                <div class="file-name">{{ selectedFile.name }}</div>
                <div class="file-meta">
                    <span>{{ formatFileSize(selectedFile.size) }}</span>
                    <span class="separator">•</span>
                    <span>{{ selectedFile.type || 'Unknown type' }}</span>
                </div>
            </div>
            <NcButton type="tertiary" @click="clearSelectedFile">
            <template #icon>
                <component :is="ImportIcons.Close" :size="20" />
            </template>
            </NcButton>
        </div>
      </div>

      <!-- Conversion Options -->
      <div class="form-group">
          <label>{{ t('agora', 'Conversion Options') }}</label>
          <div class="checkbox-group">
              <NcCheckboxRadioSwitch v-model="convertToMarkdown" type="switch">
              {{ t('agora', 'Convert to Markdown') }}
              </NcCheckboxRadioSwitch>
              <NcCheckboxRadioSwitch v-model="extractStructure" type="switch">
              {{ t('agora', 'Extract document structure (chapters/sections)') }}
              </NcCheckboxRadioSwitch>
          </div>
      </div>

      <!-- Import Options -->
      <div class="import-options">
          <h3>{{ t('agora', 'Import Options') }}</h3>

          <div class="form-group">
              <label for="document-title">{{ t('agora', 'Document Title') }}</label>
              <NcInputField
                      id="document-title"
                      v-model="title"
                      :label="t('agora', 'Document Title')"
                      :label-outside="true"
                      :placeholder="t('agora', 'Enter document title')"
                      />
          </div>

          <div class="form-group">
              <label>{{ t('agora', 'Import as') }}</label>
              <NcSelect
                      v-model="importType"
                      :options="importTypes"
                      :placeholder="t('agora', 'Select option type')"
                      :input-label="t('agora', 'Import as')"
                      />
          </div>

          <div class="form-group">
              <label>{{ t('agora', 'Target Section') }}</label>
              <NcSelect
                      v-model="parentOption"
                      :options="parentOptions"
                      :placeholder="t('agora', 'Select parent section (optional)')"
                      :input-label="t('agora', 'Target Section')"
                      />
          </div>
      </div>

      <!-- Preview Section -->
      <div v-if="previewContent" class="preview-section">
          <div class="preview-header">
              <h3>{{ t('agora', 'Preview') }}</h3>
              <NcButton type="tertiary" @click="showFullPreview = !showFullPreview">
              <template #icon>
                  <component :is="showFullPreview ? ImportIcons.EyeOff : ImportIcons.Eye" :size="20" />
              </template>
              {{ showFullPreview ? t('agora', 'Hide preview') : t('agora', 'Show preview') }}
              </NcButton>
          </div>
          <div v-if="showFullPreview" class="preview-content">
              <!-- eslint-enable vue/no-v-html -->
              <div class="markdown-preview" v-html="sanitizedPreviewContent"></div> <!-- eslint-disable-line vue/no-v-html -->
              <div v-if="documentMetadata" class="metadata-preview">
                  <h4>{{ t('agora', 'Document Metadata') }}</h4>
                  <ul>
                      <li v-if="documentMetadata.wordCount">
                          <strong>{{ t('agora', 'Word Count') }}:</strong> {{ documentMetadata.wordCount }}
                      </li>
                      <li v-if="documentMetadata.chapterCount">
                          <strong>{{ t('agora', 'Chapters/Sections') }}:</strong> {{ documentMetadata.chapterCount }}
                      </li>
                      <li v-if="documentMetadata.detectedStructure">
                          <strong>{{ t('agora', 'Detected Structure') }}:</strong>
                          <ul class="structure-list">
                              <li v-if="documentMetadata.detectedStructure.hasIntroduction">
                                  ✓ {{ t('agora', 'Introduction') }}
                              </li>
                              <li v-if="documentMetadata.detectedStructure.hasChapters">
                                  ✓ {{ t('agora', 'Chapters') }}
                              </li>
                              <li v-if="documentMetadata.detectedStructure.hasArticles">
                                  ✓ {{ t('agora', 'Articles') }}
                              </li>
                              <li v-if="documentMetadata.detectedStructure.hasConclusion">
                                  ✓ {{ t('agora', 'Conclusion') }}
                              </li>
                          </ul>
                      </li>
                  </ul>
                  <div v-if="documentMetadata.sections && documentMetadata.sections.length > 0" class="sections-list">
                      <h4>{{ t('agora', 'Detected Sections') }}</h4>
                      <ul>
                          <li v-for="(section, idx) in documentMetadata.sections.slice(0, 10)" :key="idx">
                              <strong>{{ section.type }}:</strong> {{ section.title }}
                          </li>
                      </ul>
                  </div>
              </div>
          </div>
      </div>

      <!-- Actions -->
      <div class="modal-actions">
          <NcButton type="tertiary" @click="handleClose">
          {{ t('agora', 'Cancel') }}
          </NcButton>
          <NcButton
                  type="primary"
                  :disabled="!canImport"
                  :loading="importing"
                  @click="handleImport"
                  >
                  <template #icon>
                      <component :is="ImportIcons.Import" :size="20" />
                  </template>
          {{ t('agora', 'Import Document') }}
          </NcButton>
      </div>
    </div>
  </NcModal>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { t } from '@nextcloud/l10n'
import { showError, showSuccess } from '@nextcloud/dialogs'
import NcModal from '@nextcloud/vue/components/NcModal'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcInputField from '@nextcloud/vue/components/NcInputField'
import NcSelect from '@nextcloud/vue/components/NcSelect'
import NcCheckboxRadioSwitch from '@nextcloud/vue/components/NcCheckboxRadioSwitch'
import NcFilePicker from '@nextcloud/vue/components/NcFilePicker'
import domPurify from 'dompurify'

import { ImportService, type ImportResult } from '../../../helpers/modules/ImportService'
import { ImportIcons } from '../../../utils/icons'
import { useOptionsStore } from '../../../stores/options'

interface Props {
  show: boolean
  familyKey: string
  // inquiryId: number
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
  imported: [result: ImportResult]
}>()

const importService = new ImportService()
const optionsStore = useOptionsStore()

// State
const selectedFile = ref<File | null>(null)
const isDragOver = ref(false)
const convertToMarkdown = ref(true)
const extractStructure = ref(true)
const title = ref('')
const importType = ref<string | null>(null)
const parentOption = ref<number | null>(null)
const importing = ref(false)
const previewContent = ref('')
const showFullPreview = ref(false)
const documentMetadata = ref<ImportResult['metadata'] | null>(null)

// Sanitized preview content to prevent XSS
const sanitizedPreviewContent = computed(() => domPurify.sanitize(previewContent.value))

const supportedFormats = ['doc', 'docx', 'odt', 'html', 'md', 'pdf','txt']
const acceptedFormats = supportedFormats // Array, not joined string

const modalTitle = computed(() => t('agora', 'Import Document'))
const canImport = computed(() => selectedFile.value !== null)

const importTypes = computed(() => {
  const family = optionsStore.families.find(f => f.key === props.familyKey)
  if (!family) return []
  return family.types.map(type => ({
    value: type.option_type,
    label: type.label || type.option_type
  }))
})

const parentOptions = computed(() =>
  optionsStore.options
    .filter(opt => opt.typeInfo?.features?.includes('hierarchical'))
    .map(opt => ({
      value: opt.id,
      label: opt.title || `Option #${opt.id}`
    }))
)

// Handle file pick from NcFilePicker
const handleFilePick = (files: File[]) => {
  if (files && files.length > 0) {
    const file = files[0]
    validateAndSetFile(file)
  }
}

// Validate and set file
const validateAndSetFile = (file: File) => {
  const fileExt = file.name.split('.').pop()?.toLowerCase() || ''
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg', 'ico', 'heic', 'heif']

  if (file.type.startsWith('image/') || imageExtensions.includes(fileExt)) {
    showError(t('agora', 'Image files are not supported. Please upload document files (DOC, DOCX, PDF, ODT, HTML, TXT, MD)'))
    return false
  }

  const supportedExtensions = ['doc', 'docx', 'odt', 'html', 'htm', 'pdf', 'md', 'markdown', 'txt']
  if (!supportedExtensions.includes(fileExt)) {
    showError(t('agora', 'Unsupported file type. Please upload: {formats}', {
      formats: supportedExtensions.join(', ')
    }))
    return false
  }

  selectedFile.value = file
  if (!title.value) {
    title.value = selectedFile.value.name.replace(/\.[^/.]+$/, '')
  }
  return true
}


// Clear selected file
const clearSelectedFile = () => {
  selectedFile.value = null
  isDragOver.value = false
  previewContent.value = ''
  documentMetadata.value = null
}

// Drag & drop handlers
const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
  isDragOver.value = true
}

const handleDragLeave = (event: DragEvent) => {
  event.preventDefault()
  isDragOver.value = false
}

const handleFileDrop = (event: DragEvent) => {
  event.preventDefault()
  isDragOver.value = false

  const files = event.dataTransfer?.files
  if (files && files[0]) {
    validateAndSetFile(files[0])
  }
}

// File icon based on extension
const getFileIcon = (filename: string) => {
  const ext = filename.split('.').pop()?.toLowerCase()
  switch (ext) {
    case 'doc':
    case 'docx':
      return ImportIcons.FileWord
    case 'odt':
      return ImportIcons.FileText
    case 'html':
    case 'htm':
      return ImportIcons.FileCode
    case 'md':
      return ImportIcons.Markdown
    default:
      return ImportIcons.File
  }
}

// Format file size
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}


const generatePreview = async () => {
  if (selectedFile.value) {
    try {
      const result = await importService.importDocument({
        sourceType: 'file',
        file: selectedFile.value
      })

      if (result.success) {
        previewContent.value = SafeMarkdownParser.parse(result.content)
        documentMetadata.value = result.metadata

        if (!title.value && result.title) {
          title.value = result.title
        }
      }
    } catch (error) {
      console.error('Preview error:', error)
    }
  }
}


// Handle import
const handleImport = async () => {
  importing.value = true

  try {
    if (!selectedFile.value) throw new Error('No file selected')

    const importResult = await importService.importDocument({
      sourceType: 'file',
      file: selectedFile.value,
      options: {
        convertToMarkdown: convertToMarkdown.value,
        detectChapters: extractStructure.value
      }
    })

    if (!importResult.success) {
      throw new Error(importResult.error)
    }

    await optionsStore.add({
      title: title.value || importResult.title || 'Imported Document',
      text: importResult.content,
      type: importType.value || 'document',
      parentId: parentOption.value || undefined,
      miscFields: {
        metadata: {
          key: 'metadata',
          value: JSON.stringify(importResult.metadata || {})
        },
        source_filename: { key: 'source_filename', value: selectedFile.value.name }
      }
    })

    showSuccess(t('agora', 'Document imported successfully'))
    emit('imported', importResult)
    handleClose()
  } catch (error) {
    console.error('Import error:', error)
    showError(t('agora', 'Failed to import document: {error}', {
      error: error instanceof Error ? error.message : 'Unknown error'
    }))
  } finally {
    importing.value = false
  }
}

// Close modal
const handleClose = () => {
  emit('close')
}

// Watch for changes to generate preview
watch([selectedFile, convertToMarkdown, extractStructure], () => {
  if (selectedFile.value) {
    generatePreview()
  }
}, { immediate: false })
</script>


<style scoped lang="scss">
.import-document-modal {
    :deep(.modal-content) {
        padding: 24px;
        max-height: 80vh;
        overflow-y: auto;
    }
}

          .import-header {
              text-align: center;
              margin-bottom: 32px;

              .header-icon {
                  color: var(--color-primary-element);
                  margin-bottom: 16px;
              }

              h2 {
                  margin: 0 0 8px 0;
                  font-size: 24px;
                  font-weight: 600;
              }

              p {
                  margin: 0;
                  color: var(--color-text-lighter);
              }
          }

          .file-drop-zone {
              border: 2px dashed var(--color-border);
              border-radius: 12px;
              padding: 32px;
              text-align: center;
              transition: all 0.3s ease;
              background: var(--color-background-dark);
              margin-bottom: 24px;

              &.drag-over {
                  border-color: var(--color-primary-element);
                  background: var(--color-background-darker);
              }

              &:hover {
                  border-color: var(--color-primary-element);
                  background: var(--color-background-darker);
              }

              .drop-zone-content {
                  .drop-icon {
                      color: var(--color-text-lighter);
                      margin-bottom: 16px;
                  }

                  .drop-text {
                      font-size: 16px;
                      font-weight: 500;
                      margin: 0 0 8px 0;
                  }

                  .drop-subtext {
                      margin: 0 0 16px 0;
                      color: var(--color-text-lighter);
                  }

                  .warning-note {
                      margin-top: 16px;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      gap: 6px;
                      font-size: 12px;
                      color: var(--color-warning);

                      svg {
                          opacity: 0.7;
                      }
                  }
              }

              .selected-file-info {
                  display: flex;
                  align-items: center;
                  gap: 16px;

                  .file-icon {
                      width: 48px;
                      height: 48px;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      background: var(--color-background-darker);
                      border-radius: 8px;
                  }

                  .file-details {
                      flex: 1;
                      text-align: left;

                      .file-name {
                          font-weight: 500;
                          margin-bottom: 4px;
                          word-break: break-word;
                      }

                      .file-meta {
                          font-size: 12px;
                          color: var(--color-text-lighter);

                          .separator {
                              margin: 0 8px;
                          }
                      }
                  }
              }
          }

          .supported-formats {
              margin-top: 16px;
              display: flex;
              gap: 8px;
              justify-content: center;
              flex-wrap: wrap;

              .format-badge {
                  padding: 4px 8px;
                  background: var(--color-background-darker);
                  border-radius: 4px;
                  font-size: 11px;
                  font-family: monospace;
                  color: var(--color-text-lighter);
              }
          }

          .checkbox-group {
              display: flex;
              flex-direction: column;
              gap: 12px;
              margin-bottom: 24px;

              :deep(.checkbox-radio-switch) {
                  display: flex;
                  align-items: center;
                  gap: 12px;
              }
          }

          .form-group {
              margin-bottom: 20px;

              label {
                  display: block;
                  margin-bottom: 8px;
                  font-weight: 500;
                  color: var(--color-main-text);
              }
          }

          .import-options {
              background: var(--color-background-dark);
              border-radius: 12px;
              padding: 20px;
              margin-bottom: 24px;

              h3 {
                  margin: 0 0 16px 0;
                  font-size: 16px;
                  font-weight: 600;
              }
          }

          .preview-section {
              margin-bottom: 24px;

              .preview-header {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  margin-bottom: 12px;

                  h3 {
                      margin: 0;
                      font-size: 16px;
                      font-weight: 600;
                  }
              }

              .preview-content {
                  max-height: 400px;
                  overflow-y: auto;
                  background: var(--color-background-dark);
                  border-radius: 8px;
                  padding: 16px;

                  .markdown-preview {
                      margin-bottom: 20px;
                      padding-bottom: 20px;
                      border-bottom: 1px solid var(--color-border);

                      :deep(h1) {
                          font-size: 24px;
                          margin-top: 0;
                      }

                      :deep(h2) {
                          font-size: 20px;
                      }

                      :deep(h3) {
                          font-size: 18px;
                      }

                      :deep(p) {
                          line-height: 1.6;
                      }
                  }

                  .metadata-preview {
                      ul {
                          margin: 8px 0 0 0;
                          padding-left: 20px;

                          li {
                              margin: 4px 0;
                          }
                      }

                      .sections-list {
                          margin-top: 16px;

                          ul {
                              li {
                                  font-size: 13px;
                              }
                          }
                      }
                  }
              }
          }

          .modal-actions {
              display: flex;
              gap: 12px;
              justify-content: flex-end;
              margin-top: 24px;
              padding-top: 20px;
              border-top: 1px solid var(--color-border);
          }

          @media (max-width: 768px) {
              .file-drop-zone {
                  padding: 20px;
              }
          }
</style>
