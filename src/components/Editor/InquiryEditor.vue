<template>
  <!-- Main editor container that fills its parent -->
  <div ref="editorContainer" class="editor-container">
    <!-- Toolbar with all major formatting options -->
    <div v-if="!props.readonly">
      <div v-if="editor" class="editor-toolbar">
        <!-- Text formatting -->
        <button
          :class="{ 'is-active': editor.isActive('bold') }"
          aria-label="Bold"
          @click="editor.chain().focus().toggleBold().run()"
        >
          <span class="icon">B</span>
        </button>
        <button
          :class="{ 'is-active': editor.isActive('italic') }"
          aria-label="Italic"
          @click="editor.chain().focus().toggleItalic().run()"
        >
          <span class="icon">I</span>
        </button>
        <button
          :class="{ 'is-active': editor.isActive('underline') }"
          aria-label="Underline"
          @click="editor.chain().focus().toggleUnderline().run()"
        >
          <span class="icon">U</span>
        </button>
        <button
          :class="{ 'is-active': editor.isActive('strike') }"
          aria-label="Strikethrough"
          @click="editor.chain().focus().toggleStrike().run()"
        >
          <span class="icon">S</span>
        </button>

        <!-- Headings -->
        <select v-model="selectedHeading" aria-label="Text heading" @change="setHeading">
          <option value="paragraph">Paragraph</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
        </select>

        <!-- Lists -->
        <button
          :class="{ 'is-active': editor.isActive('bulletList') }"
          aria-label="Bullet list"
          @click="editor.chain().focus().toggleBulletList().run()"
        >
          <span class="icon">•</span>
        </button>
        <button
          :class="{ 'is-active': editor.isActive('orderedList') }"
          aria-label="Numbered list"
          @click="editor.chain().focus().toggleOrderedList().run()"
        >
          <span class="icon">1.</span>
        </button>
        <button
          :class="{ 'is-active': editor.isActive('taskList') }"
          aria-label="Task list"
          @click="editor.chain().focus().toggleTaskList().run()"
        >
          <span class="icon">✓</span>
        </button>

        <!-- Text alignment -->
        <button
          :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
          aria-label="Align left"
          @click="editor.chain().focus().setTextAlign('left').run()"
        >
          <span class="icon">←</span>
        </button>
        <button
          :class="{
            'is-active': editor.isActive({ textAlign: 'center' }),
          }"
          aria-label="Align center"
          @click="editor.chain().focus().setTextAlign('center').run()"
        >
          <span class="icon">↔</span>
        </button>
        <button
          :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
          aria-label="Align right"
          @click="editor.chain().focus().setTextAlign('right').run()"
        >
          <span class="icon">→</span>
        </button>

        <!-- Advanced formatting -->
        <button
          :class="{ 'is-active': editor.isActive('blockquote') }"
          aria-label="Blockquote"
          @click="editor.chain().focus().toggleBlockquote().run()"
        >
          <span class="icon">❝</span>
        </button>
        <button
          aria-label="Horizontal rule"
          @click="editor.chain().focus().setHorizontalRule().run()"
        >
          <span class="icon">―</span>
        </button>
        <button aria-label="Hard break" @click="editor.chain().focus().setHardBreak().run()">
          <span class="icon">↵</span>
        </button>

        <!-- Links and media -->
        <button
          :class="{ 'is-active': editor.isActive('link') }"
          aria-label="Link"
          @click="setLink"
        >
          <span class="icon">🔗</span>
        </button>
        <button aria-label="Insert image" @click="addImage">
          <span class="icon">🖼️</span>
        </button>

        <!-- Code and special formatting -->
        <button
          :class="{ 'is-active': editor.isActive('code') }"
          aria-label="Code"
          @click="editor.chain().focus().toggleCode().run()"
        >
          <span class="icon">{}</span>
        </button>
        <button
          :class="{ 'is-active': editor.isActive('codeBlock') }"
          aria-label="Code block"
          @click="editor.chain().focus().toggleCodeBlock().run()"
        >
          <span class="icon">⎘</span>
        </button>

        <!-- Undo/redo -->
        <button
          :disabled="!editor.can().undo()"
          aria-label="Undo"
          @click="editor.chain().focus().undo().run()"
        >
          <span class="icon">↩</span>
        </button>
        <button
          :disabled="!editor.can().redo()"
          aria-label="Redo"
          @click="editor.chain().focus().redo().run()"
        >
          <span class="icon">↪</span>
        </button>

        <!-- Word import -->
        <button aria-label="Import Word document" @click="importWord">
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
        <button aria-label="Generate with AI" @click="generateWithAI">
          <span class="icon">🤖</span>
        </button>
      </div>
    </div>
    <div class="editor-content-wrapper">
      <!-- The actual editor content -->
      <EditorContent :editor="editor" class="editor-content" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, onBeforeUnmount, watch, nextTick } from 'vue'
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
import { useInquiryStore } from '../../stores/inquiry.ts'

const inquiryStore = useInquiryStore()

const props = defineProps({
  readonly: {
    type: Boolean,
    default: false,
  },
})

// Initialize editor
const editor = useEditor({
  editable: !props.readonly,
  content: inquiryStore.description,

  extensions: [
    StarterKit.configure({
      heading: {
        levels: [1, 2, 3],
      },
    }),
    Underline,
    Link.configure({
      openOnClick: false,
    }),
    Image,
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
  },

  onUpdate: ({ editor }) => {
    const currentHtml = editor.getHTML()
    if (currentHtml !== inquiryStore.description) {
      inquiryStore.description = currentHtml
    }
  },
})

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
  const url = window.prompt('URL', previousUrl)

  if (url === null) return
  if (url === '') {
    editor.value.chain().focus().extendMarkRange('link').unsetLink().run()
    return
  }

  editor.value.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
}

// Image handling
const addImage = () => {
  const url = window.prompt('Enter the URL of the image:')

  if (url) {
    editor.value.chain().focus().setImage({ src: url }).run()
  }
}

// Word document import
const wordFileInput = ref(null)
const importWord = () => {
  wordFileInput.value.click()
}

const handleWordImport = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  try {
    const arrayBuffer = await file.arrayBuffer()
    const { value: html } = await mammoth.convertToHtml({ arrayBuffer })
    editor.value.commands.setContent(html)
    inquiryStore.description = html
  } catch (error) {
    console.error('Error importing Word document:', error)
    alert('Failed to import Word document')
  }
}

// AI generation
const generateWithAI = async () => {
  try {
    const prompt = `Generate professional inquiry content about: ${
      editor.value.getText() || 'general business inquiry'
    }`

    // Replace with actual AI API call
    const generatedText = await mockAICall(prompt)

    editor.value.commands.insertContent(generatedText)
    inquiryStore.description = editor.value.getHTML()
  } catch (error) {
    console.error('AI generation failed:', error)
    alert('AI generation failed. Please try again.')
  }
}

// Mock AI function - replace with real API call
const mockAICall = async () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(`
        <p>Here is some generated content based on your request:</p>
        <ul>
          <li>Professional introduction</li>
          <li>Detailed inquiry points</li>
          <li>Call to action</li>
        </ul>
      `)
    }, 1000)
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
  if (editor) editor.value.destroy()
})

onBeforeUnmount(() => {
  if (editor) editor.value.destroy()
})
</script>
<style scoped>
/* Container principal */

.editor-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.editor-content {
  flex: 1;
  min-height: 300px;
  padding: 1rem;
  outline: none;
}

.editor-toolbar {
  padding: 0.5rem;
  background: #f5f5f5;
  border-bottom: 1px solid #ddd;
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}
.editor-content-wrapper {
  flex: 1;
  overflow: auto;
  border: 1px solid #e2e8f0;
}

.tiptap-editor {
  height: 100%;
  width: 100%;
  min-height: 100%;
  display: block;
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
}
</style>
