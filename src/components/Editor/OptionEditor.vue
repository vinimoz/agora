<!--
	- SPDX-FileCopyrightText: 2018 Nextcloud Contributors
	- SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <!-- Main editor container that fills its parent -->
  <div ref="editorContainer" class="editor-container">
    <!-- Toolbar with essential formatting options -->
    <div v-if="!props.readonly">
      <input
        ref="imageFileInput"
        type="file"
        accept="image/*"
        style="display: none"
        @change="handleImageUpload"
      />

      <div v-if="editor" class="editor-toolbar">
        <!-- Basic text formatting -->
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

        <!-- Heading selector -->
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
      </div>
    </div>

    <!-- Editor Content -->
    <div class="editor-content-wrapper">
      <EditorContent :editor="editor" class="editor-content" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import mammoth from 'mammoth'
import { useAttachmentsStore } from '../../stores/attachments'
import { showError, showSuccess } from '@nextcloud/dialogs'
import { t } from '@nextcloud/l10n'

// Nextcloud components
import NcButton from '@nextcloud/vue/components/NcButton'

// Stores
const attachmentsStore = useAttachmentsStore()

const props = defineProps({
  readonly: {
    type: Boolean,
    default: false,
  },
  optionId: {
    type: [String, Number],
    required: true
  },
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

// Refs
const imageFileInput = ref(null)
const wordFileInput = ref(null)
const editorContainer = ref(null)

// Image URL function
function getNextcloudPreviewUrl(fileId, x = 1920, y = 1080, autoScale = true) {
  const baseUrl = window.location.origin
  return `${baseUrl}/index.php/core/preview?fileId=${fileId}&x=${x}&y=${y}&a=${autoScale}`
}

// Image handling
const triggerImageUpload = () => {
  imageFileInput.value?.click()
}

const handleImageUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  try {
    const response = await attachmentsStore.upload(props.optionId, file)
    
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
  content: props.modelValue || '<p></p>',

  extensions: [
    StarterKit.configure({
      heading: {
        levels: [1, 2],
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
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
  ],

  editorProps: {
    attributes: {
      class: 'tiptap-editor-content',
      style: 'height:100%; width: 100%',
      spellcheck: 'true',
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
    if (currentHtml !== props.modelValue) {
      emit('update:modelValue', currentHtml)
    }
  },
})

const handlePastedImage = async (file) => {
  try {
    const response = await attachmentsStore.upload(props.optionId, file, false)

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

// Sync model changes to editor
watch(
  () => props.modelValue,
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
    emit('update:modelValue', html)
    showSuccess(t('agora', 'Word document imported'))
  } catch (error) {
    console.error('Error importing Word document:', error)
    showError(t('agora', 'Failed to import Word document'))
  } finally {
    event.target.value = ''
  }
}

// Lifecycle hooks
onMounted(() => {
  nextTick(() => {
    if (editor.value && props.modelValue) {
      editor.value.commands.setContent(props.modelValue)
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
  border: 1px solid var(--color-border, #e2e8f0);
  border-radius: var(--border-radius, 4px);
}

.editor-content {
  flex: 1;
  min-height: 200px;
  padding: 0.5rem;
  outline: none;
}

.editor-toolbar {
  padding: 0.25rem;
  background: var(--color-background-hover, #f5f5f5);
  border-bottom: 1px solid var(--color-border, #ddd);
  display: flex;
  flex-wrap: wrap;
  gap: 0.125rem;
  align-items: center;
}

.heading-select {
  padding: 0.25rem;
  border: 1px solid var(--color-border, #ddd);
  border-radius: var(--border-radius, 4px);
  background: var(--color-background-plain, #fff);
  color: var(--color-text);
  min-width: 100px;
  font-size: 0.9rem;
}

.editor-content-wrapper {
  flex: 1;
  overflow: auto;
  background: var(--color-main-background, #fff);
  min-height: 200px;
}

.tiptap-editor-content {
  height: 100% !important;
  width: 100% !important;
  padding: 0.5rem;
  outline: none;
  font-size: 0.9rem;
}

.ProseMirror {
  height: 100% !important;
  min-height: 200px !important;
  padding: 0.5rem;
}

.ProseMirror-focused {
  outline: none;
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
}

:deep(.ProseMirror img) {
  max-width: 100%;
  height: auto;
}

:deep(.ProseMirror .editor-image) {
  padding: 2px;
}

:deep(img[src*="agora"]) {
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
}

/* Make buttons smaller for options */
:deep(.button-vue) {
  min-height: 32px !important;
  padding: 0 8px !important;
}
</style>
