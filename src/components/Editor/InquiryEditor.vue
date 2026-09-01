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
          :title="t('agora', 'Import word document')"
          :aria-label="t('agora', 'Import word document')"
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
        <NcAssistantButton 
          :title="t('agora', 'Generate with ai')" 
          :aria-label="t('agora', 'Generate with ai')" 
          :disabled="aiLoading"
          @click="openAIModal"
        />
      </div>
    </div>

    <!-- Editor Content -->
    <div class="editor-content-wrapper">
      <EditorContent :editor="editor" class="editor-content" />
    </div>

    <!-- AI Modal - FIXED with proper textarea height, loading icon outside button, and NcRichText -->
    <NcModal v-if="showAIModal" :name="t('agora', 'Generate content with ai')" @close="closeAIModal">
      <NcAssistantContent>
        <div class="container">
          <NcAssistantIcon />
          <div class="content">
            <h3 class="heading">
              {{ t('agora', 'Generate content with ai') }}
            </h3>
            
            <div class="form-group">
              <label for="ai-prompt">{{ t('agora', 'Describe what you want to generate') }}</label>
              <!-- Use raw textarea for full control over height -->
              <textarea
                id="ai-prompt"
                v-model="aiPrompt"
                :placeholder="t('agora', 'E.g. Write a professional introduction for a business inquiry about… (you can edit this prompt)')"
                class="ai-prompt-textarea"
                rows="8"
                @input="onPromptUpdate"
              />
            </div>

            <!-- Generated content preview with NcRichText -->
            <div v-if="aiGeneratedContent" class="ai-preview">
              <h3>{{ t('agora', 'Generated content preview') }}</h3>
              <div class="preview-content">
                <NcRichText
                  :text="aiGeneratedContent"
                  :use-markdown="true"
                  :use-extended-markdown="true"
                  :autolink="true"
                  class="rich-text-preview"
                />
                <div class="content-length">
                  {{ t('agora', 'Content length: {length} characters', { length: aiGeneratedContent.length }) }}
                </div>
              </div>
            </div>

            <div class="modal-actions">
              <!-- Loading icon outside the button -->
              <NcLoadingIcon v-if="aiLoading" :size="20" class="loading-icon" />
              <NcButton
                type="secondary"
                @click="closeAIModal">
                {{ t('agora', 'Cancel') }}
              </NcButton>
              <NcButton
                :disabled="!aiPrompt.trim() || aiLoading"
                type="primary"
                @click="generateWithAI"
              >
                {{ aiLoading ? t('agora', 'Generating …') : t('agora', 'Generate') }}
              </NcButton>
              <NcButton
                v-if="aiGeneratedContent"
                :disabled="aiLoading"
                type="primary"
                @click="insertAIContent"
              >
                {{ t('agora', 'Insert content') }}
              </NcButton>
            </div>
          </div>
        </div>
      </NcAssistantContent>
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
import { useAiStore } from '../../stores/ai'

// Nextcloud components
import NcModal from '@nextcloud/vue/components/NcModal'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcAssistantIcon from '@nextcloud/vue/components/NcAssistantIcon'
import NcAssistantContent from '@nextcloud/vue/components/NcAssistantContent'
import NcAssistantButton from '@nextcloud/vue/components/NcAssistantButton'
import NcLoadingIcon from '@nextcloud/vue/components/NcLoadingIcon'
import NcRichText from '@nextcloud/vue/components/NcRichText' // ✅ Added

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
const aiStore = useAiStore()

// Helper to strip HTML from description
function stripHtml(html) {
  if (!html) return ''
  const tmp = document.createElement('div')
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText || ''
}

// AI Functions - with pre-filled context
const openAIModal = () => {
  // Get current context from the inquiry
  const title = inquiryStore.title || ''
  const description = inquiryStore.description || ''

  let prompt = ''

  // Build a rich pre-filled prompt using title and description (plain text)
  if (description && description.trim().length > 0) {
    const plainDesc = stripHtml(description).trim()
    // Limit to 500 characters to keep prompt concise
    const descExcerpt = plainDesc.length > 500 ? plainDesc.substring(0, 500) + '…' : plainDesc
    prompt = t('agora', 'Given the inquiry titled "{title}" with the following description:\n\n{description}\n\nPlease generate or improve the content for this inquiry. You can modify the instructions below:')
      .replace('{title}', title)
      .replace('{description}', descExcerpt)
  } else {
    prompt = t('agora', 'Write content for an inquiry titled "{title}". You can modify the instructions below:')
      .replace('{title}', title)
  }

  aiPrompt.value = prompt
  showAIModal.value = true
  aiGeneratedContent.value = ''
}

const generateWithAI = async () => {
  if (!aiPrompt.value.trim()) {
    showError(t('agora', 'Please enter a prompt'))
    return
  }

  aiLoading.value = true
  aiGeneratedContent.value = ''

  try {
    // Use the AI store's enhance content method
    const enhancedContent = await aiStore.enhanceContent(inquiryStore.id, aiPrompt.value)
    aiGeneratedContent.value = enhancedContent
    showSuccess(t('agora', 'Content generated successfully'))
  } catch (error) {
    console.error('AI generation failed:', error)
    showError(t('agora', 'AI generation failed. Please try again'))
  } finally {
    aiLoading.value = false
  }
}

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

      showSuccess(t('agora', 'Image inserted'))
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
      underline: false,
      link: false,
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
    const response = await attachmentsStore.upload(inquiryStore.id, file,false)

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
      showSuccess(t('agora', 'Image inserted'))
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
    showSuccess(t('agora', 'Word document imported'))
  } catch (error) {
    console.error('Error importing Word document:', error)
    showError(t('agora', 'Failed to import word document'))
  } finally {
    event.target.value = ''
  }
}

// Watch for prompt changes to enable/disable button
const onPromptUpdate = (value) => {
  // This ensures the button state updates when the prompt changes
  aiPrompt.value = value
}

const closeAIModal = () => {
  showAIModal.value = false
  aiPrompt.value = ''
  aiGeneratedContent.value = ''
  aiLoading.value = false
}

const insertAIContent = () => {
  if (aiGeneratedContent.value && editor.value) {
    editor.value.commands.setContent(aiGeneratedContent.value)
    inquiryStore.description = aiGeneratedContent.value
    showSuccess(t('agora', 'Content inserted'))
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

/* AI Prompt Textarea - FIXED height */
.ai-prompt-textarea {
  width: 100%;
  min-height: 200px;
  padding: 12px;
  border: 1px solid var(--color-border, #ddd);
  border-radius: var(--border-radius, 4px);
  font-family: inherit;
  font-size: 14px;
  line-height: 1.5;
  resize: vertical;
  background: var(--color-main-background, #fff);
  color: var(--color-text);
  box-sizing: border-box;
}

.ai-prompt-textarea:focus {
  outline: none;
  border-color: var(--color-primary-element, #0082c9);
  box-shadow: 0 0 0 2px rgba(0, 130, 201, 0.2);
}

.modal-actions {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  justify-content: flex-end;
  margin-top: 1.5rem;
}

/* Loading icon outside button */
.loading-icon {
  animation: spin 1s linear infinite;
  margin-right: 0.5rem;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* AI Preview styles */
.ai-preview {
  border: 1px solid var(--color-border, #ddd);
  border-radius: var(--border-radius, 4px);
  padding: 1rem;
  background: var(--color-background-hover, #f8f9fa);
  margin-top: 1rem;
}

.ai-preview h3 {
  margin-top: 0;
  margin-bottom: 0.75rem;
  color: var(--color-text);
}

.preview-content {
  line-height: 1.6;
}

.rich-text-preview {
  max-height: 200px;
  overflow-y: auto;
  padding: 0.5rem;
  background: var(--color-main-background, #fff);
  border-radius: var(--border-radius, 4px);
  border: 1px solid var(--color-border, #e2e8f0);
}

.content-length {
  font-size: 0.9em;
  color: var(--color-text-lighter);
  margin-top: 0.5rem;
}

/* Assistant Content Styles */
.container {
  display: flex;
  align-items: start;
  flex-direction: row;
  gap: 12px;
}

.content {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.heading {
  margin-top: 0;
  font-size: var(--default-font-size);
  font-weight: bold;
  color: var(--color-text);
}
</style>
