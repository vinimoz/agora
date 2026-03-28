<!--
  - SPDX-FileCopyrightText: 2024 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <NcModal
    :show="show"
    :title="modalTitle"
    size="large"
    class="import-document-modal"
    @close="handleClose"
  >
    <div class="modal-content">
      <div class="import-header">
        <component :is="ImportIcons.FileUpload" :size="48" class="header-icon" />
        <h2>{{ t('agora', 'Import Document') }}</h2>
        <p>{{ t('agora', 'Import documents, law proposals, or structured content from files or URLs') }}</p>
      </div>

      <!-- Import Source Selection -->
      <div class="source-selection">
        <NcButton
          :type="sourceType === 'url' ? 'primary' : 'tertiary'"
          class="source-btn"
          @click="sourceType = 'url'"
        >
          <template #icon>
            <component :is="ImportIcons.Link" :size="20" />
          </template>
          {{ t('agora', 'From URL') }}
        </NcButton>

        <NcButton
          :type="sourceType === 'file' ? 'primary' : 'tertiary'"
          class="source-btn"
          @click="sourceType = 'file'"
        >
          <template #icon>
            <component :is="ImportIcons.Upload" :size="20" />
          </template>
          {{ t('agora', 'Upload File') }}
        </NcButton>
      </div>

      <!-- URL Import Form -->
      <div v-if="sourceType === 'url'" class="import-form">
        <div class="form-group">
          <label>{{ t('agora', 'Document URL') }}</label>
          <NcInputField
            v-model="url"
            :placeholder="t('agora', 'https://example.com/document.html')"
            :error="urlError"
            @update:model-value="validateUrl"
          >
            <template #icon>
              <component :is="ImportIcons.Link" :size="20" />
            </template>
          </NcInputField>
          <small class="form-hint">
            {{ t('agora', 'Supports HTML pages, plain text, and markdown documents') }}
          </small>
        </div>

        <div class="form-group">
          <label>{{ t('agora', 'Format Detection') }}</label>
          <NcCheckboxRadioSwitch
            v-model="urlFormat"
            :options="formatOptions"
            type="radio"
          />
        </div>
      </div>

      <!-- File Upload Form -->
      <div v-if="sourceType === 'file'" class="import-form">
        <div class="file-drop-zone" @dragover.prevent @drop.prevent="handleFileDrop">
          <input
            ref="fileInput"
            type="file"
            :accept="acceptedFormats"
            style="display: none"
            @change="handleFileSelect"
          />
          <div v-if="!selectedFile" class="drop-zone-content">
            <component :is="ImportIcons.FileUpload" :size="48" class="drop-icon" />
            <p class="drop-text">
              {{ t('agora', 'Drag and drop your file here') }}
            </p>
            <p class="drop-subtext">
              {{ t('agora', 'or') }}
            </p>
            <NcButton @click="triggerFileInput">
              {{ t('agora', 'Browse Files') }}
            </NcButton>
            <div class="supported-formats">
              <span v-for="format in supportedFormats" :key="format" class="format-badge">
                {{ format.toUpperCase() }}
              </span>
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

        <div class="form-group">
          <label>{{ t('agora', 'Conversion Options') }}</label>
          <NcCheckboxRadioSwitch
            v-model="convertToMarkdown"
            :label="t('agora', 'Convert to Markdown')"
          />
          <NcCheckboxRadioSwitch
            v-model="extractStructure"
            :label="t('agora', 'Extract document structure (chapters/sections)')"
          />
        </div>
      </div>

      <!-- Common Import Options -->
      <div class="import-options">
        <h3>{{ t('agora', 'Import Options') }}</h3>
        
        <div class="form-group">
          <label>{{ t('agora', 'Document Title') }}</label>
          <NcInputField
            v-model="title"
            :placeholder="t('agora', 'Enter document title')"
          />
        </div>

        <div class="form-group">
          <label>{{ t('agora', 'Import as') }}</label>
          <NcSelect
            v-model="importType"
            :options="importTypes"
            :placeholder="t('agora', 'Select option type')"
          />
        </div>

        <div class="form-group">
          <label>{{ t('agora', 'Target Section') }}</label>
          <NcSelect
            v-model="parentOption"
            :options="parentOptions"
            :placeholder="t('agora', 'Select parent section (optional)')"
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
          <div class="markdown-preview" v-html="previewContent"></div>
          <div v-if="documentMetadata" class="metadata-preview">
            <h4>{{ t('agora', 'Document Metadata') }}</h4>
            <ul>
              <li v-if="documentMetadata.author">
                <strong>{{ t('agora', 'Author') }}:</strong> {{ documentMetadata.author }}
              </li>
              <li v-if="documentMetadata.wordCount">
                <strong>{{ t('agora', 'Word Count') }}:</strong> {{ documentMetadata.wordCount }}
              </li>
              <li v-if="documentMetadata.chapterCount">
                <strong>{{ t('agora', 'Chapters/Sections') }}:</strong> {{ documentMetadata.chapterCount }}
              </li>
              <li v-if="documentMetadata.pageCount">
                <strong>{{ t('agora', 'Pages') }}:</strong> {{ documentMetadata.pageCount }}
              </li>
            </ul>
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
import { showError, showSuccess, showInfo } from '@nextcloud/dialogs'
import NcModal from '@nextcloud/vue/components/NcModal'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcInputField from '@nextcloud/vue/components/NcInputField'
import NcSelect from '@nextcloud/vue/components/NcSelect'
import NcCheckboxRadioSwitch from '@nextcloud/vue/components/NcCheckboxRadioSwitch'
import { marked } from 'marked'

import { ImportService, type ImportOptions, type ImportResult } from '../../../helpers/modules/ImportService'
import { ImportIcons } from '../../../utils/icons'
import { useOptionsStore } from '../../../stores/options'

interface Props {
  show: boolean
  familyKey: string
  inquiryId: number
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
  imported: [result: ImportResult]
}>()

const importService = new ImportService()
const optionsStore = useOptionsStore()

// State
const sourceType = ref<'url' | 'file'>('url')
const url = ref('')
const urlError = ref('')
const urlFormat = ref('auto')
const selectedFile = ref<File | null>(null)
const convertToMarkdown = ref(true)
const extractStructure = ref(true)
const title = ref('')
const importType = ref<string | null>(null)
const parentOption = ref<number | null>(null)
const importing = ref(false)
const previewContent = ref('')
const showFullPreview = ref(false)
const documentMetadata = ref<ImportResult['metadata'] | null>(null)

// Options
const formatOptions = [
  { value: 'auto', label: t('agora', 'Auto-detect') },
  { value: 'html', label: 'HTML' },
  { value: 'markdown', label: 'Markdown' },
  { value: 'text', label: t('agora', 'Plain Text') }
]

const supportedFormats = ['doc', 'docx', 'odt', 'pdf', 'html', 'md', 'txt']
const acceptedFormats = supportedFormats.map(f => `.${f}`).join(',')

const modalTitle = computed(() => t('agora', 'Import Document'))

const canImport = computed(() => {
  if (sourceType.value === 'url') {
    return url.value.trim() !== '' && !urlError.value
  } 
    return selectedFile.value !== null
  
})

const importTypes = computed(() => {
  const family = optionsStore.families.find(f => f.key === props.familyKey)
  if (!family) return []
  
  return family.types.map(type => ({
    value: type.option_type,
    label: type.label || type.option_type
  }))
})

const parentOptions = computed(() => 
  // Get options that can have children
   optionsStore.options
    .filter(opt => opt.typeInfo?.features?.includes('hierarchical'))
    .map(opt => ({
      value: opt.id,
      label: opt.title || `Option #${opt.id}`
    }))
)

// Methods
const validateUrl = () => {
  if (!url.value) {
    urlError.value = ''
    return
  }
  
  try {
    new URL(url.value)
    urlError.value = ''
  } catch {
    urlError.value = t('agora', 'Please enter a valid URL')
  }
}

const triggerFileInput = () => {
  const input = document.querySelector('input[type="file"]') as HTMLInputElement
  if (input) input.click()
}

const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    selectedFile.value = input.files[0]
    if (!title.value) {
      title.value = selectedFile.value.name.replace(/\.[^/.]+$/, '')
    }
  }
}

const handleFileDrop = (event: DragEvent) => {
  const files = event.dataTransfer?.files
  if (files && files[0]) {
    selectedFile.value = files[0]
    if (!title.value) {
      title.value = selectedFile.value.name.replace(/\.[^/.]+$/, '')
    }
  }
}

const clearSelectedFile = () => {
  selectedFile.value = null
  const input = document.querySelector('input[type="file"]') as HTMLInputElement
  if (input) input.value = ''
}

const getFileIcon = (filename: string) => {
  const ext = filename.split('.').pop()?.toLowerCase()
  switch (ext) {
    case 'pdf':
      return ImportIcons.FilePdf
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

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))  } ${  sizes[i]}`
}

const generatePreview = async () => {
  if (sourceType.value === 'url' && url.value) {
    try {
      const result = await importService.importDocument({
        sourceType: 'url',
        url: url.value,
        format: urlFormat.value === 'auto' ? undefined : urlFormat.value as any
      })
      
      if (result.success) {
        previewContent.value = marked.parse(result.content).toString()
        documentMetadata.value = result.metadata
        if (!title.value && result.title) {
          title.value = result.title
        }
      }
    } catch (error) {
      console.error('Preview error:', error)
    }
  } else if (sourceType.value === 'file' && selectedFile.value) {
    try {
      const result = await importService.importDocument({
        sourceType: 'file',
        file: selectedFile.value,
        options: {
          convertToMarkdown: convertToMarkdown.value,
          detectChapters: extractStructure.value
        }
      })
      
      if (result.success) {
        previewContent.value = marked.parse(result.content).toString()
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

const handleImport = async () => {
  importing.value = true
  
  try {
    let importResult: ImportResult
    
    if (sourceType.value === 'url') {
      importResult = await importService.importDocument({
        sourceType: 'url',
        url: url.value,
        format: urlFormat.value === 'auto' ? undefined : urlFormat.value as any,
        options: {
          convertToMarkdown: convertToMarkdown.value,
          detectChapters: extractStructure.value
        }
      })
    } else {
      if (!selectedFile.value) throw new Error('No file selected')
      
      importResult = await importService.importDocument({
        sourceType: 'file',
        file: selectedFile.value,
        options: {
          convertToMarkdown: convertToMarkdown.value,
          detectChapters: extractStructure.value
        }
      })
    }
    
    if (!importResult.success) {
      throw new Error(importResult.error)
    }
    
    // Create the option with imported content
    const newOption = await optionsStore.add({
      title: title.value || importResult.title || 'Imported Document',
      text: importResult.content,
      type: importType.value || 'document',
      parentId: parentOption.value || undefined,
      miscFields: {
        metadata: {
          key: 'metadata',
          value: JSON.stringify(importResult.metadata || {})
        },
        source_type: {
          key: 'source_type',
          value: sourceType.value
        },
        ...(sourceType.value === 'url' && { source_url: { key: 'source_url', value: url.value } }),
        ...(sourceType.value === 'file' && selectedFile.value && {
          source_filename: { key: 'source_filename', value: selectedFile.value.name }
        })
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

const handleClose = () => {
  emit('close')
}

// Watch for changes to generate preview
watch([sourceType, url, selectedFile, convertToMarkdown, extractStructure], () => {
  if (sourceType.value === 'url' && url.value && !urlError.value) {
    generatePreview()
  } else if (sourceType.value === 'file' && selectedFile.value) {
    generatePreview()
  }
}, { immediate: false })

// Debounce URL preview
let previewTimeout: NodeJS.Timeout
watch(url, () => {
  clearTimeout(previewTimeout)
  if (url.value && !urlError.value) {
    previewTimeout = setTimeout(generatePreview, 1000)
  }
})
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

.source-selection {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  justify-content: center;
  
  .source-btn {
    flex: 1;
    max-width: 200px;
    justify-content: center;
  }
}

.import-form {
  margin-bottom: 24px;
}

.form-group {
  margin-bottom: 20px;
  
  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: var(--color-main-text);
  }
  
  .form-hint {
    display: block;
    margin-top: 4px;
    font-size: 12px;
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
    }
    
    .metadata-preview {
      ul {
        margin: 8px 0 0 0;
        padding-left: 20px;
        
        li {
          margin: 4px 0;
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
  .source-selection {
    flex-direction: column;
    
    .source-btn {
      max-width: none;
    }
  }
  
  .file-drop-zone {
    padding: 20px;
  }
}
</style>
