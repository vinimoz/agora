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
        <button
          type="button"
          :class="{ 'is-active': editor.isActive('bold') }"
          :title="t('agora', 'Bold')"
          aria-label="Bold"
          @click="editor.chain().focus().toggleBold().run()"
        >
          <span class="icon">B</span>
        </button>
        <button
          type="button"
          :class="{ 'is-active': editor.isActive('italic') }"
          :title="t('agora', 'Italic')"
          aria-label="Italic"
          @click="editor.chain().focus().toggleItalic().run()"
        >
          <span class="icon">I</span>
        </button>
        <button
          type="button"
          :class="{ 'is-active': editor.isActive('underline') }"
          :title="t('agora', 'Underline')"
          aria-label="Underline"
          @click="editor.chain().focus().toggleUnderline().run()"
        >
          <span class="icon">U</span>
        </button>
        <button
          type="button"
          :class="{ 'is-active': editor.isActive('strike') }"
          :title="t('agora', 'Strikethrough')"
          aria-label="Strikethrough"
          @click="editor.chain().focus().toggleStrike().run()"
        >
          <span class="icon">S</span>
        </button>

        <!-- Headings -->
        <select v-model="selectedHeading" aria-label="Text heading" :title="t('agora', 'Text heading')" @change="setHeading">
          <option value="paragraph">{{ t('agora', 'Paragraph') }}</option>
          <option value="h1">{{ t('agora', 'Heading 1') }}</option>
          <option value="h2">{{ t('agora', 'Heading 2') }}</option>
          <option value="h3">{{ t('agora', 'Heading 3') }}</option>
        </select>

        <!-- Lists -->
        <button
          type="button"
          :class="{ 'is-active': editor.isActive('bulletList') }"
          :title="t('agora', 'Bullet list')"
          aria-label="Bullet list"
          @click="editor.chain().focus().toggleBulletList().run()"
        >
          <span class="icon">•</span>
        </button>
        <button
          type="button"
          :class="{ 'is-active': editor.isActive('orderedList') }"
          :title="t('agora', 'Numbered list')"
          aria-label="Numbered list"
          @click="editor.chain().focus().toggleOrderedList().run()"
        >
          <span class="icon">1.</span>
        </button>
        <button
          type="button"
          :class="{ 'is-active': editor.isActive('taskList') }"
          :title="t('agora', 'Task list')"
          aria-label="Task list"
          @click="editor.chain().focus().toggleTaskList().run()"
        >
          <span class="icon">✓</span>
        </button>

        <!-- Text alignment -->
        <button
          type="button"
          :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
          :title="t('agora', 'Align left')"
          aria-label="Align left"
          @click="editor.chain().focus().setTextAlign('left').run()"
        >
          <span class="icon">←</span>
        </button>
        <button
          type="button"
          :class="{
            'is-active': editor.isActive({ textAlign: 'center' }),
          }"
          :title="t('agora', 'Align center')"
          aria-label="Align center"
          @click="editor.chain().focus().setTextAlign('center').run()"
        >
          <span class="icon">↔</span>
        </button>
        <button
          type="button"
          :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
          :title="t('agora', 'Align right')"
          aria-label="Align right"
          @click="editor.chain().focus().setTextAlign('right').run()"
        >
          <span class="icon">→</span>
        </button>

        <!-- Advanced formatting -->
        <button
          type="button"
          :class="{ 'is-active': editor.isActive('blockquote') }"
          :title="t('agora', 'Blockquote')"
          aria-label="Blockquote"
          @click="editor.chain().focus().toggleBlockquote().run()"
        >
          <span class="icon">❝</span>
        </button>
        <button
          type="button"
          :title="t('agora', 'Horizontal rule')"
          aria-label="Horizontal rule"
          @click="editor.chain().focus().setHorizontalRule().run()"
        >
          <span class="icon">―</span>
        </button>
        <button type="button" :title="t('agora', 'Hard break')" aria-label="Hard break" @click="editor.chain().focus().setHardBreak().run()">
          <span class="icon">↵</span>
        </button>

        <!-- Links and media -->
        <button
          type="button"
          :class="{ 'is-active': editor.isActive('link') }"
          :title="t('agora', 'Link')"
          aria-label="Link"
          @click="setLink"
        >
          <span class="icon">🔗</span>
        </button>

        <button type="button" :title="t('agora', 'Insert image')" aria-label="Insert image" @click="triggerImageUpload">
          <span class="icon">🖼️</span>
        </button>

        <!-- Code and special formatting -->
        <button
          type="button"
          :class="{ 'is-active': editor.isActive('code') }"
          :title="t('agora', 'Code')"
          aria-label="Code"
          @click="editor.chain().focus().toggleCode().run()"
        >
          <span class="icon">{}</span>
        </button>
        <button
          type="button"
          :class="{ 'is-active': editor.isActive('codeBlock') }"
          :title="t('agora', 'Code block')"
          aria-label="Code block"
          @click="editor.chain().focus().toggleCodeBlock().run()"
        >
          <span class="icon">⎘</span>
        </button>

        <!-- Undo/redo -->
        <button
          type="button"
          :disabled="!editor.can().undo()"
          :title="t('agora', 'Undo')"
          aria-label="Undo"
          @click="editor.chain().focus().undo().run()"
        >
          <span class="icon">↩</span>
        </button>
        <button
          type="button"
          :disabled="!editor.can().redo()"
          :title="t('agora', 'Redo')"
          aria-label="Redo"
          @click="editor.chain().focus().redo().run()"
        >
          <span class="icon">↪</span>
        </button>

        <!-- Word import -->
        <button type="button" :title="t('agora', 'Import Word document')" aria-label="Import Word document" @click="importWord">
          <span class="icon">📄</span>
        </button>
        <input
          ref="wordFileInput"
          type="file"
          accept=".docx"
          style="display: none"
          @change="handleWordImport"
        />

        <!-- AI integration -->
        <button 
          type="button" 
          :title="t('agora', 'Generate with AI')" 
          aria-label="Generate with AI" 
          :disabled="aiLoading"
          @click="openAIModal"
        >
          <span class="icon" :class="{ 'loading': aiLoading }">🤖</span>
        </button>
      </div>
    </div>

    <!-- AI Modal -->
    <div v-if="showAIModal" class="ai-modal-overlay">
      <div class="ai-modal">
        <div class="ai-modal-header">
          <h3>{{ t('agora', 'Generate Content with AI') }}</h3>
          <button type="button" class="close-button" @click="closeAIModal">×</button>
        </div>
        <div class="ai-modal-content">
          <div class="ai-prompt-section">
            <label for="ai-prompt">{{ t('agora', 'Describe what you want to generate:') }}</label>
            <textarea
              id="ai-prompt"
              v-model="aiPrompt"
              :placeholder="t('agora', 'e.g., Write a professional introduction for a business inquiry about...')"
              rows="4"
            ></textarea>
          </div>
          
          <div class="ai-options">
            <label>{{ t('agora', 'Content type:') }}</label>
            <select v-model="aiContentType">
              <option value="professional">{{ t('agora', 'Professional') }}</option>
              <option value="casual">{{ t('agora', 'Casual') }}</option>
              <option value="technical">{{ t('agora', 'Technical') }}</option>
              <option value="persuasive">{{ t('agora', 'Persuasive') }}</option>
            </select>
            
            <label>{{ t('agora', 'Length:') }}</label>
            <select v-model="aiLength">
              <option value="short">{{ t('agora', 'Short') }}</option>
              <option value="medium">{{ t('agora', 'Medium') }}</option>
              <option value="long">{{ t('agora', 'Long') }}</option>
            </select>
          </div>

	  <div v-if="aiGeneratedContent" class="ai-preview">
		  <h4>{{ t('agora', 'Preview:') }}</h4>

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
	</div>
      </div>
      <div class="ai-modal-footer">
	      <button 
	   type="button" 
	   class="secondary" 
	   @click="closeAIModal"
	   >
	   {{ t('agora', 'Cancel') }}
	      </button>
		      <button 
	   type="button" 
	   class="primary" 
	   :disabled="!aiPrompt || aiLoading"
	   @click="generateWithAI"
	   >
	   <span v-if="aiLoading">{{ t('agora', 'Generating...') }}</span>
	   <span v-else>{{ t('agora', 'Generate') }}</span>
		      </button>
		      <button 
		 v-if="aiGeneratedContent"
		 type="button" 
		 class="primary" 
		 :disabled="aiLoading"
		 @click="insertAIContent"
		 >
		 {{ t('agora', 'Insert Content') }}
		      </button>
      </div>
    </div>
  </div>

  <div class="editor-content-wrapper">
	  <!-- The actual editor content -->
	  <EditorContent :editor="editor" class="editor-content" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
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
const aiContentType = ref('professional')
const aiLength = ref('medium')

// Image handling
const triggerImageUpload = () => {
  imageFileInput.value?.click()
}

const getContentSummary = (content) => {
  if (!content) return ''
  const text = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()

  if (text.length <= 150) return text

  return `${text.substring(0, 150)  }...`
}

const handleImageUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  try {
    const response = await attachmentsStore.upload(inquiryStore.id, file)
    const imageUrl = `${window.location.origin}/index.php/f/${response.fileId}`


    if (editor.value) {
      if (typeof editor.value.chain().setImage === 'function') {
	editor.value.chain()
	  .focus()
	  .setImage({ 
	    src: imageUrl,
	    alt: response.name,
	    title: response.name
	  })
	  .run()
      } else {
	editor.value.chain()
	  .focus()
	  .insertContent(`<img src="${imageUrl}" alt="${response.name}" class="editor-image" />`)
	  .run()
      }

      showSuccess(t('agora', 'Image inserted successfully'))
    }

  } catch (error) {
    console.error('Image upload failed:', error)
    showError(t('agora', 'Image upload failed'))
  } finally {
    event.target.value = ''
  }
}

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
    Image.configure({
      HTMLAttributes: {
	class: 'editor-image',
	style: 'max-width: 100%; height: auto;  display: block;',
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


    const imageUrl = `${window.location.origin}/index.php/f/${response.fileId}`

    const attachment = {
      id: response.id,
      name: response.name ?? file.name,
      size: response.size ?? file.size,
      url: imageUrl,
    }

    if (editor.value) {
      if (typeof editor.value.chain().setImage === 'function') {
	editor.value.chain()
	  .focus()
	  .setImage({ 
	    src: imageUrl,
	    alt: response.name,
	    title: response.name
	  })
	  .run()
      } else {
	editor.value.chain()
	  .focus()
	  .insertContent(`<img src="${imageUrl}" alt="${response.name}" class="editor-image" />`)
	  .run()
      }

      attachmentsStore.attachments = [...attachmentsStore.attachments, attachment]
      showSuccess(t('agora', 'Image inserted successfully'))
    }

  } catch (error) {
    console.error('Pasted image upload failed:', error)
    showError(t('agora', 'Failed to insert image'))
  }
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

// Handle heading selection
const selectedHeading = ref('paragraph')
const setHeading = () => {
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
    aiPrompt.value = t('agora', 'Improve and expand on: {text}', { text: `${currentText.substring(0, 100)  }...` })
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
    const generatedContent = await callAIService(aiPrompt.value, aiContentType.value)
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

const callAIService = async (prompt, contentType) => new Promise((resolve) => {
    setTimeout(() => {

      const contentTemplates = {
	professional: `
	  <p>${t('agora', 'Dear esteemed colleagues,')}</p>
	  <p>${t('agora', 'I am writing to inquire about {prompt}. We believe this presents a significant opportunity for mutual collaboration and growth.').replace('{prompt}', prompt)}</p>
	  <p>${t('agora', 'Our organization places great value on establishing strong professional relationships and we are confident that this initiative will yield substantial benefits for all parties involved.')}</p>
	  <p>${t('agora', 'We look forward to your positive response and the possibility of future cooperation.')}</p>
	  <p>${t('agora', 'Sincerely,')}<br>${t('agora', 'The Management Team')}</p>
	`,

	casual: `
	  <p>${t('agora', 'Hey there!')}</p>
	  <p>${t('agora', 'I wanted to reach out about {prompt}. It seems like a really cool opportunity and I think we could work well together on this.').replace('{prompt}', prompt)}</p>
	  <p>${t('agora', "Let me know what you think - I'm excited to hear your thoughts and explore how we can make this happen!")}</p>
	  <p>${t('agora', 'Cheers!')}</p>
	`,

	technical: `
	  <h3>${t('agora', 'Technical Inquiry: {prompt}').replace('{prompt}', prompt)}</h3>
	  <p>${t('agora', 'Objective: To comprehensively analyze and address the technical requirements for the specified initiative.')}</p>
	  <h4>${t('agora', 'Key Considerations:')}</h4>
	  <ul>
	    <li>${t('agora', 'Technical specifications and requirements')}</li>
	    <li>${t('agora', 'Implementation methodology')}</li>
	    <li>${t('agora', 'Resource allocation and timeline')}</li>
	    <li>${t('agora', 'Quality assurance protocols')}</li>
	  </ul>
	  <p>${t('agora', 'We request detailed technical documentation to facilitate thorough analysis.')}</p>
	`,

	persuasive: `
	  <p>${t('agora', 'Imagine the possibilities...')}</p>
	  <p>${t('agora', 'What if you could {prompt}? This is not just an opportunity - it is a game-changing moment that could revolutionize your approach.').replace('{prompt}', prompt)}</p>
	  <p>${t('agora', 'Consider these undeniable benefits:')}</p>
	  <ul>
	    <li>${t('agora', 'Significant competitive advantage')}</li>
	    <li>${t('agora', 'Enhanced operational efficiency')}</li>
	    <li>${t('agora', 'Substantial return on investment')}</li>
	    <li>${t('agora', 'Future-proof solutions')}</li>
	  </ul>
	  <p><strong>${t('agora', "Don't let this opportunity pass you by. The time to act is now!")}</strong></p>
	`
      }

      resolve(contentTemplates[contentType] || contentTemplates.professional)
    }, 2000)
  })

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
/* Container principal */
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

.editor-toolbar button {
	padding: 0.5rem;
	border: 1px solid var(--color-border, #ddd);
	background: var(--color-background-dark, #666);
	border-radius: 4px;
	cursor: pointer;
	transition: all 0.2s ease;
}

.editor-toolbar button:hover:not(:disabled) {
	background: var(--color-background-hover, #e9e9e9);
}

.editor-toolbar button.is-active {
	background: #6b7280 !important; 
	color: white !important;
	border-color: #6b7280 !important;
	background: var(--color-background-dark, #666);
	color: white;
}

.editor-toolbar button:disabled {
	opacity: 0.5;
	cursor: not-allowed;
}

.editor-toolbar select {
	padding: 0.5rem;
	border: 1px solid var(--color-border, #ddd);
	border-radius: 4px;
	background: var(--color-background-plain, #fff);
}

.editor-content-wrapper {
	flex: 1;
	overflow: auto;
	border: 1px solid var(--color-border, #e2e8f0);
	background: var(--color-background-dark, #666);
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

/* AI Modal Styles */
.ai-modal-overlay {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 10000;
}

.ai-modal {
	background: var(--color-main-background, #fff);
	border-radius: 8px;
	width: 90%;
	max-width: 600px;
	max-height: 80vh;
	display: flex;
	flex-direction: column;
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.ai-modal-header {
	padding: 1.5rem;
	border-bottom: 1px solid var(--color-border, #ddd);
	display: flex;
	justify-content: between;
	align-items: center;
}

.ai-modal-header h3 {
	margin: 0;
	flex: 1;
}

.close-button {
	background: none;
	border: none;
	font-size: 1.5rem;
	cursor: pointer;
	padding: 0;
	width: 30px;
	height: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
}

.ai-modal-content {
	padding: 1.5rem;
	flex: 1;
	overflow-y: auto;
}

.ai-prompt-section {
	margin-bottom: 1.5rem;
}

.ai-prompt-section label {
	display: block;
	margin-bottom: 0.5rem;
	font-weight: bold;
}

.ai-prompt-section textarea {
	width: 100%;
	padding: 0.75rem;
	border: 1px solid var(--color-border, #ddd);
	border-radius: 4px;
	resize: vertical;
	font-family: inherit;
}

.ai-options {
	display: grid;
	grid-template-columns: auto 1fr;
	gap: 0.75rem;
	align-items: center;
	margin-bottom: 1.5rem;
}

.ai-options label {
	font-weight: bold;
}

.ai-options select {
	padding: 0.5rem;
	border: 1px solid var(--color-border, #ddd);
	border-radius: 4px;
	background: var(--color-background-plain, #fff);
}

.ai-preview {
	border: 1px solid var(--color-border, #ddd);
	border-radius: 4px;
	padding: 1rem;
	background: var(--color-background-hover, #f8f9fa);
}

.ai-preview h4 {
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
	background: var(--color-background-dark, #e9ecef);
	padding: 0.75rem;
	border-radius: 4px;
	border-left: 3px solid var(--color-primary-element, #0082c9);
}

.content-summary strong {
	color: var(--color-text);
}

.ai-modal-footer {
	padding: 1.5rem;
	border-top: 1px solid var(--color-border, #ddd);
	display: flex;
	gap: 0.75rem;
	justify-content: flex-end;
}

.ai-modal-footer button {
	padding: 0.75rem 1.5rem;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	font-weight: bold;
	transition: background-color 0.2s ease;
}

.ai-modal-footer button.primary {
	background: var(--color-primary-element, #0082c9);
	color: white;
}

.ai-modal-footer button.primary:hover:not(:disabled) {
	background: var(--color-primary-element-hover, #006aa3);
}

.ai-modal-footer button.secondary {
	background: var(--color-background-hover, #e9e9e9);
	color: var(--color-main-text, #000);
}

.ai-modal-footer button:disabled {
	opacity: 0.5;
	cursor: not-allowed;
}

/* Loading animation */
.loading {
	animation: spin 1s linear infinite;
}

	  @keyframes spin {
		  from { transform: rotate(0deg); }
		  to { transform: rotate(360deg); }
	  }

	  :deep(.editor-image) {
		  max-width: 100% !important;
		  height: auto !important;
		  display: block !important;
		  margin: 1rem 0 !important;
		  border-radius: 4px;
		  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		  border: 1px solid var(--color-border, #e2e8f0);
	  }

	  :deep(.ProseMirror img) {
		  max-width: 100% !important;
		  height: auto !important;
		  display: block !important;
		  margin: 1rem 0 !important;
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
