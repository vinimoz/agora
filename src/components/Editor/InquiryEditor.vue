<!--
	- SPDX-FileCopyrightText: 2018 Nextcloud Contributors
	- SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <!-- Main editor container that fills its parent -->
  <div ref="editorContainer" class="editor-container">
    <!-- Toolbar with all major formatting options -->
    <div v-if="!props.readonly">
      <input
        ref="imageFileInput"
        type="file"
        accept="image/*"
        style="display: none"
        @change="handleImageUpload"
      />

      <div v-if="editor" class="editor-toolbar">
        <!-- Text formatting -->
        <NcButton
          type="button"
          :class="{ 'is-active': editor.isActive('bold') }"
          :title="t('agora', 'Bold')"
          :aria-label="t('agora', 'Bold')"
          @click="editor.chain().focus().toggleBold().run()"
        >
          B
        </NcButton>
        <NcButton
          type="button"
          :class="{ 'is-active': editor.isActive('italic') }"
          :title="t('agora', 'Italic')"
          :aria-label="t('agora', 'Italic')"
          @click="editor.chain().focus().toggleItalic().run()"
        >
          I
        </NcButton>
        <NcButton
          type="button"
          :class="{ 'is-active': editor.isActive('underline') }"
          :title="t('agora', 'Underline')"
          :aria-label="t('agora', 'Underline')"
          @click="editor.chain().focus().toggleUnderline().run()"
        >
          U
        </NcButton>
        <NcButton
          type="button"
          :class="{ 'is-active': editor.isActive('strike') }"
          :title="t('agora', 'Strikethrough')"
          :aria-label="t('agora', 'Strikethrough')"
          @click="editor.chain().focus().toggleStrike().run()"
        >
          S
        </NcButton>

        <!-- Heading selector - Fixed version -->
        <select 
          v-model="selectedHeading"
          :title="t('agora', 'Text heading')"
          :aria-label="t('agora', 'Text heading')"
          class="heading-select"
          @change="setHeading"
        >
          <option value="paragraph">{{ t('agora', 'Normal text') }}</option>
          <option value="h1">{{ t('agora', 'Heading 1') }}</option>
          <option value="h2">{{ t('agora', 'Heading 2') }}</option>
          <option value="h3">{{ t('agora', 'Heading 3') }}</option>
        </select>

        <!-- Lists -->
        <NcButton
          type="button"
          :class="{ 'is-active': editor.isActive('bulletList') }"
          :title="t('agora', 'Bullet list')"
          :aria-label="t('agora', 'Bullet list')"
          @click="editor.chain().focus().toggleBulletList().run()"
        >
          •
        </NcButton>
        <NcButton
          type="button"
          :class="{ 'is-active': editor.isActive('orderedList') }"
          :title="t('agora', 'Numbered list')"
          :aria-label="t('agora', 'Numbered list')"
          @click="editor.chain().focus().toggleOrderedList().run()"
        >
          1.
        </NcButton>
        <NcButton
          type="button"
          :class="{ 'is-active': editor.isActive('taskList') }"
          :title="t('agora', 'Task list')"
          :aria-label="t('agora', 'Task list')"
          @click="editor.chain().focus().toggleTaskList().run()"
        >
          ✓
        </NcButton>

        <!-- Text alignment -->
        <NcButton
          type="button"
          :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
          :title="t('agora', 'Align left')"
          :aria-label="t('agora', 'Align left')"
          @click="editor.chain().focus().setTextAlign('left').run()"
        >
          ←
        </NcButton>
        <NcButton
          type="button"
          :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
          :title="t('agora', 'Align center')"
          :aria-label="t('agora', 'Align center')"
          @click="editor.chain().focus().setTextAlign('center').run()"
        >
          ↔
        </NcButton>
        <NcButton
          type="button"
          :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
          :title="t('agora', 'Align right')"
          :aria-label="t('agora', 'Align right')"
          @click="editor.chain().focus().setTextAlign('right').run()"
        >
          →
        </NcButton>

        <!-- Advanced formatting -->
        <NcButton
          type="button"
          :class="{ 'is-active': editor.isActive('blockquote') }"
          :title="t('agora', 'Blockquote')"
          :aria-label="t('agora', 'Blockquote')"
          @click="editor.chain().focus().toggleBlockquote().run()"
        >
          ❝
        </NcButton>
        <NcButton
          type="button"
          :title="t('agora', 'Horizontal rule')"
          :aria-label="t('agora', 'Horizontal rule')"
          @click="editor.chain().focus().setHorizontalRule().run()"
        >
          ―
        </NcButton>
        <NcButton
          type="button"
          :title="t('agora', 'Hard break')"
          :aria-label="t('agora', 'Hard break')"
          @click="editor.chain().focus().setHardBreak().run()"
        >
          ↵
        </NcButton>

        <!-- Links and media -->
        <NcButton
          type="button"
          :class="{ 'is-active': editor.isActive('link') }"
          :title="t('agora', 'Link')"
          :aria-label="t('agora', 'Link')"
          @click="setLink"
        >
          🔗
        </NcButton>

        <NcButton
          type="button"
          :title="t('agora', 'Insert image')"
          :aria-label="t('agora', 'Insert image')"
          @click="triggerImageUpload"
        >
          🖼️
        </NcButton>

        <!-- Image alignment -->
        <NcButton
          type="button"
          :class="{ 'is-active': isImageSelected && getSelectedImageAlign() === 'left' }"
          :title="t('agora', 'Align image left')"
          :aria-label="t('agora', 'Align image left')"
          :disabled="!isImageSelected"
          @click="alignImage('left')"
        >
          🖼️←
        </NcButton>
        <NcButton
          type="button"
          :class="{ 'is-active': isImageSelected && getSelectedImageAlign() === 'center' }"
          :title="t('agora', 'Align image center')"
          :aria-label="t('agora', 'Align image center')"
          :disabled="!isImageSelected"
          @click="alignImage('center')"
        >
          🖼️↔
        </NcButton>
        <NcButton
          type="button"
          :class="{ 'is-active': isImageSelected && getSelectedImageAlign() === 'right' }"
          :title="t('agora', 'Align image right')"
          :aria-label="t('agora', 'Align image right')"
          :disabled="!isImageSelected"
          @click="alignImage('right')"
        >
          🖼️→
        </NcButton>

        <!-- Code and special formatting -->
        <NcButton
          type="button"
          :class="{ 'is-active': editor.isActive('code') }"
          :title="t('agora', 'Code')"
          :aria-label="t('agora', 'Code')"
          @click="editor.chain().focus().toggleCode().run()"
        >
          {}
        </NcButton>
        <NcButton
          type="button"
          :class="{ 'is-active': editor.isActive('codeBlock') }"
          :title="t('agora', 'Code block')"
          :aria-label="t('agora', 'Code block')"
          @click="editor.chain().focus().toggleCodeBlock().run()"
        >
          ⎘
        </NcButton>

        <!-- Undo/redo -->
        <NcButton
          type="button"
          :disabled="!editor.can().undo()"
          :title="t('agora', 'Undo')"
          :aria-label="t('agora', 'Undo')"
          @click="editor.chain().focus().undo().run()"
        >
          ↩
        </NcButton>
        <NcButton
          type="button"
          :disabled="!editor.can().redo()"
          :title="t('agora', 'Redo')"
          :aria-label="t('agora', 'Redo')"
          @click="editor.chain().focus().redo().run()"
        >
          ↪
        </NcButton>

        <!-- Word import -->
        <NcButton
          type="button"
          :title="t('agora', 'Import Word document')"
          :aria-label="t('agora', 'Import Word document')"
          @click="importWord"
        >
          📄
        </NcButton>
        <input
          ref="wordFileInput"
          type="file"
          accept=".docx"
          style="display: none"
          @change="handleWordImport"
        />

        <!-- AI integration -->
        <NcButton 
          type="button"
          :title="t('agora', 'Generate with AI')" 
          :aria-label="t('agora', 'Generate with AI')" 
          :disabled="aiLoading"
          @click="openAIModal"
        >
          <template #icon>
            <span v-if="aiLoading" class="loading-icon"></span>
            <span v-else>🤖</span>
          </template>
        </NcButton>
      </div>
    </div>

    <!-- Editor Content -->
    <div class="editor-content-wrapper">
      <EditorContent :editor="editor" class="editor-content" />
    </div>

    <!-- AI Modal using NcModal -->
    <NcModal v-if="showAIModal" :name="t('agora', 'Generate Content with AI')" @close="closeAIModal">
      <div class="modal__content">
        <h2>{{ t('agora', 'Generate Content with AI') }}</h2>
        
        <div class="form-group">
          <label for="ai-prompt">{{ t('agora', 'Describe what you want to generate:') }}</label>
          <NcTextField
            id="ai-prompt"
            v-model:value="aiPrompt"
            :placeholder="t('agora', 'e.g., Write a professional introduction for a business inquiry about...')"
            type="textarea"
            label="Prompt for AI"
            :rows="4"
          />
        </div>

        <div v-if="aiGeneratedContent" class="ai-preview">
          <h3>{{ t('agora', 'Preview:') }}</h3>
          <div class="preview-content">
            <p>{{ t('agora', 'AI generated content is ready to be inserted.') }}</p>
            <div class="content-length">
              {{ t('agora', 'Content length: {length} characters', { length: aiGeneratedContent.length }) }}
            </div>
            <div class="content-summary">
              <strong>{{ t('agora', 'Summary:') }}</strong>
              {{ getContentSummary(aiGeneratedContent) }}
            </div>
          </div>
        </div>

        <div class="modal-actions">
          <NcButton
            type="secondary"
            @click="closeAIModal">
            {{ t('agora', 'Cancel') }}
          </NcButton>
          <NcButton 
            :disabled="!aiPrompt || aiLoading"
            type="primary"
            @click="generateWithAI">
            <template #icon>
              <span v-if="aiLoading" class="loading-icon"></span>
            </template>
            {{ aiLoading ? t('agora', 'Generating...') : t('agora', 'Generate') }}
          </NcButton>
          <NcButton 
            v-if="aiGeneratedContent"
            :disabled="aiLoading"
            type="primary"
            @click="insertAIContent">
            {{ t('agora', 'Insert Content') }}
          </NcButton>
        </div>
      </div>
    </NcModal>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick, computed } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import CharacterCount from '@tiptap/extension-character-count'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableHeader } from '@tiptap/extension-table-header'
import { TableCell } from '@tiptap/extension-table-cell'
import mammoth from 'mammoth'
import { useAttachmentsStore } from '../../stores/attachments'
import { showError, showSuccess } from '@nextcloud/dialogs'
import { useInquiryStore } from '../../stores/inquiry.ts'
import { t } from '@nextcloud/l10n'

// Nextcloud components
import NcModal from '@nextcloud/vue/components/NcModal'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcTextField from '@nextcloud/vue/components/NcTextField'

// Stores
const attachmentsStore = useAttachmentsStore()
const inquiryStore = useInquiryStore()

const props = defineProps({
  readonly: {
    type: Boolean,
    default: false,
  },
})

// Refs
const imageFileInput = ref(null)
const wordFileInput = ref(null)
const editorContainer = ref(null)

// AI State
const showAIModal = ref(false)
const aiLoading = ref(false)
const aiPrompt = ref('')
const aiGeneratedContent = ref('')

// Image URL function
function getNextcloudPreviewUrl(fileId, x = 1920, y = 1080, autoScale = true) {
  const baseUrl = window.location.origin
  return `${baseUrl}/index.php/core/preview?fileId=${fileId}&x=${x}&y=${y}&a=${autoScale}`
}

// Image handling
const triggerImageUpload = () => {
  imageFileInput.value?.click()
}

const getContentSummary = (content) => {
  if (!content) return ''
  const text = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()

  if (text.length <= 150) return text

  return `${text.substring(0, 150)}...`
}

const handleImageUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  try {
    const response = await attachmentsStore.upload(inquiryStore.id, file)
    
    // Use preview URL with original image dimensions
    const imageUrl = getNextcloudPreviewUrl(response.fileId, 1920, 1080, true)

    if (editor.value) {
      // Insert the image with original size and centered by default
      editor.value.chain()
        .focus()
        .insertContent(`<img src="${imageUrl}" alt="${response.name}" class="editor-image image-align-center" data-file-id="${response.fileId}" />`)
        .run()

      showSuccess(t('agora', 'Image inserted successfully'))
    }

  } catch (error) {
    console.error('Image upload failed:', error)
    showError(t('agora', 'Image upload failed'))
  } finally {
    event.target.value = ''
  }
}

// Custom image extension with alignment support
const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      align: {
        default: 'center',
        parseHTML: element => element.getAttribute('data-align') || 'center',
        renderHTML: attributes => ({
            'data-align': attributes.align,
            class: `editor-image image-align-${attributes.align}`
          })
      }
    }
  }
})

const editor = useEditor({
  editable: !props.readonly,
  content: inquiryStore.description || '<p></p>',

  extensions: [
    StarterKit.configure({
      heading: {
        levels: [1, 2, 3],
      },
    }),
    Underline,
    Link.configure({
      openOnClick: false,
      HTMLAttributes: {
        class: 'editor-link',
      },
    }),
    CustomImage.configure({
      HTMLAttributes: {
        class: 'editor-image',
      },
      inline: false,
      allowBase64: true,
    }),
    TaskList,
    TaskItem.configure({
      nested: true,
    }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    Highlight.configure({ multicolor: true }),
    CharacterCount,
    Table.configure({
      resizable: true,
    }),
    TableRow,
    TableHeader,
    TableCell,
  ],

  editorProps: {
    attributes: {
      class: 'tiptap-editor-content',
      style: 'height:100%; width: 100%',
      spellcheck: 'true',
    },

    handleDOMEvents: {
      drop: (view, event) => {
        const files = Array.from(event.dataTransfer?.files || [])
        const imageFile = files.find(file => file.type.startsWith('image'))
        if (imageFile) {
          handlePastedImage(imageFile)
          return true
        }
        return false
      },
    },

    handlePaste: (view, event) => {
      const items = Array.from(event.clipboardData?.items || [])
      const imageItem = items.find(item => item.type.startsWith('image'))

      if (imageItem) {
        const file = imageItem.getAsFile()
        if (file) {
          handlePastedImage(file)
          return true
        }
      }
      return false
    },
    handleDrop: (view, event) => {
      const files = Array.from(event.dataTransfer?.files || [])
      const imageFile = files.find(file => file.type.startsWith('image'))

      if (imageFile) {
        handlePastedImage(imageFile)
        return true
      }
      return false
    },
  },

  onUpdate: ({ editor }) => {
    const currentHtml = editor.getHTML()
    if (currentHtml !== inquiryStore.description) {
      inquiryStore.description = currentHtml
    }
  },
})

const handlePastedImage = async (file) => {
  try {
    const response = await attachmentsStore.upload(inquiryStore.id, file)

    const imageUrl = getNextcloudPreviewUrl(response.fileId, 1920, 1080, true)

    const attachment = {
      id: response.id,
      name: response.name ?? file.name,
      size: response.size ?? file.size,
      url: imageUrl,
    }

    if (editor.value) {
      editor.value.chain()
        .focus()
        .insertContent(`<img src="${imageUrl}" alt="${response.name}" class="editor-image image-align-center" data-file-id="${response.fileId}" />`)
        .run()

      attachmentsStore.attachments = [...attachmentsStore.attachments, attachment]
      showSuccess(t('agora', 'Image inserted successfully'))
    }

  } catch (error) {
    console.error('Pasted image upload failed:', error)
    showError(t('agora', 'Failed to insert image'))
  }
}

// Check if an image is selected
const isImageSelected = computed(() => {
  if (!editor.value) return false
  return editor.value.isActive('image')
})

// Get current image alignment
const getSelectedImageAlign = () => {
  if (!editor.value || !isImageSelected.value) return 'center'
  
  const { state } = editor.value
  const { from } = state.selection
  
  // Find the image node at the current position
  const node = state.doc.nodeAt(from)
  if (node && node.type.name === 'image') {
    return node.attrs.align || 'center'
  }
  
  return 'center'
}

// Align image - proper TipTap way
const alignImage = (alignment) => {
  if (!editor.value || !isImageSelected.value) return
  
  // Update the image attributes with the new alignment
  editor.value.chain()
    .focus()
    .updateAttributes('image', { align: alignment })
    .run()
}

// Sync store changes to editor
watch(
  () => inquiryStore.description,
  (newVal) => {
    if (editor.value && newVal !== editor.value.getHTML()) {
      nextTick(() => {
        editor.value.commands.setContent(newVal || '<p></p>')
      })
    }
  },
  { immediate: true }
)

// Handle heading selection - Fixed implementation
const selectedHeading = ref('paragraph')

// Watch for heading changes with safety checks
watch(() => {
  if (!editor.value) return null
  return editor.value.getAttributes('heading')
}, (attrs) => {
  if (attrs && attrs.level) {
    selectedHeading.value = `h${attrs.level}`
  } else {
    selectedHeading.value = 'paragraph'
  }
}, { immediate: true })

const setHeading = () => {
  if (!editor.value) return
  
  if (selectedHeading.value === 'paragraph') {
    editor.value.chain().focus().setParagraph().run()
  } else {
    const level = parseInt(selectedHeading.value.replace('h', ''))
    editor.value.chain().focus().toggleHeading({ level }).run()
  }
}

// Link handling
const setLink = () => {
  const previousUrl = editor.value.getAttributes('link').href
  const url = window.prompt(t('agora', 'URL'), previousUrl)

  if (url === null) return
  if (url === '') {
    editor.value.chain().focus().extendMarkRange('link').unsetLink().run()
    return
  }

  editor.value.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
}

// Word document import
const importWord = () => {
  wordFileInput.value?.click()
}

const handleWordImport = async (event) => {
  const file = event.target.files[0]
  if (!file) return
  try {
    const arrayBuffer = await file.arrayBuffer()
    const { value: html } = await mammoth.convertToHtml({ arrayBuffer })
    editor.value.commands.setContent(html)
    inquiryStore.description = html
    showSuccess(t('agora', 'Word document imported successfully'))
  } catch (error) {
    console.error('Error importing Word document:', error)
    showError(t('agora', 'Failed to import Word document'))
  } finally {
    event.target.value = ''
  }
}

// AI Functions
const openAIModal = () => {
  const currentText = editor.value.getText()
  if (currentText && currentText.trim().length > 0) {
    aiPrompt.value = t('agora', 'Improve and expand on: {text}', { text: `${currentText.substring(0, 100)}...` })
  }
  showAIModal.value = true
  aiGeneratedContent.value = ''
}

const closeAIModal = () => {
  showAIModal.value = false
  aiPrompt.value = ''
  aiGeneratedContent.value = ''
  aiLoading.value = false
}

const generateWithAI = async () => {
  if (!aiPrompt.value.trim()) {
    showError(t('agora', 'Please enter a prompt'))
    return
  }

  aiLoading.value = true
  aiGeneratedContent.value = ''

  try {
    // Use the inquiryStore to contact Nextcloud AI
    const generatedContent = await inquiryStore.getEchanceText(aiPrompt.value)
    aiGeneratedContent.value = generatedContent
    showSuccess(t('agora', 'Content generated successfully'))
  } catch (error) {
    console.error('AI generation failed:', error)
    showError(t('agora', 'AI generation failed. Please try again.'))
  } finally {
    aiLoading.value = false
  }
}

const insertAIContent = () => {
  if (aiGeneratedContent.value && editor.value) {
    editor.value.commands.setContent(aiGeneratedContent.value)
    inquiryStore.description = aiGeneratedContent.value
    showSuccess(t('agora', 'Content inserted successfully'))
    closeAIModal()
  }
}

// Lifecycle hooks
onMounted(() => {
  nextTick(() => {
    if (editor.value && inquiryStore.description) {
      editor.value.commands.setContent(inquiryStore.description)
    }
  })
})

onUnmounted(() => {
  if (editor.value) {
    editor.value.destroy()
  }
})
</script>

<style scoped>
/* Main container */
.editor-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  position: relative;
}

.editor-content {
  flex: 1;
  min-height: 300px;
  padding: 1rem;
  outline: none;
}

.editor-toolbar {
  padding: 0.5rem;
  background: var(--color-background-hover, #f5f5f5);
  border-bottom: 1px solid var(--color-border, #ddd);
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  align-items: center;
}

.heading-select {
  padding: 0.5rem;
  border: 1px solid var(--color-border, #ddd);
  border-radius: var(--border-radius, 4px);
  background: var(--color-background-plain, #fff);
  color: var(--color-text);
  min-width: 120px;
}

.editor-content-wrapper {
  flex: 1;
  overflow: auto;
  border: 1px solid var(--color-border, #e2e8f0);
  background: var(--color-main-background, #fff);
}

.tiptap-editor-content {
  height: 100% !important;
  width: 100% !important;
  padding: 1rem;
  outline: none;
}

.ProseMirror {
  height: 100% !important;
  min-height: 100% !important;
  padding: 1rem;
}

.ProseMirror-focused {
  outline: none;
  border-color: var(--color-primary-element, #0082c9);
}

/* Modal styles */
.modal__content {
  padding: 20px;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: var(--color-text);
}

.modal-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

/* AI Preview styles */
.ai-preview {
  border: 1px solid var(--color-border, #ddd);
  border-radius: var(--border-radius, 4px);
  padding: 1rem;
  background: var(--color-background-hover, #f8f9fa);
  margin-top: 1.5rem;
}

.ai-preview h3 {
  margin-top: 0;
  margin-bottom: 0.75rem;
  color: var(--color-text);
}

.preview-content {
  line-height: 1.5;
}

.preview-content p {
  margin-bottom: 0.75rem;
  color: var(--color-text);
}

.content-length {
  font-size: 0.9em;
  color: var(--color-text-lighter);
  margin-bottom: 0.5rem;
}

.content-summary {
  font-size: 0.9em;
  color: var(--color-text);
  background: var(--color-background-hover, #e9ecef);
  padding: 0.75rem;
  border-radius: var(--border-radius, 4px);
  border-left: 3px solid var(--color-primary-element, #0082c9);
}

.content-summary strong {
  color: var(--color-text);
}

/* Loading animation */
.loading-icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 0.5rem;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Image alignment styles */
:deep(.image-align-left) {
  display: block;
  margin-left: 0;
  margin-right: auto;
}

:deep(.image-align-center) {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

:deep(.image-align-right) {
  display: block;
  margin-left: auto;
  margin-right: 0;
}

:deep(.editor-image) {
  max-width: 100%;
  height: auto;
  border-radius: var(--border-radius, 4px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--color-border, #e2e8f0);
}

:deep(.ProseMirror img) {
  max-width: 100%;
  height: auto;
}

:deep(.ProseMirror .editor-image) {
  border: 1px solid var(--color-border, #e2e8f0);
  padding: 4px;
  background: white;
}

:deep(img[src*="agora"]) {
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
}
</style>
