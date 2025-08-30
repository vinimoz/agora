<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'

// TipTap
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

// Yjs
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { ySyncPlugin, yUndoPlugin, yCursorPlugin } from 'y-prosemirror'

// ----
// Étape 1 : créer un document Yjs
// ----
const ydoc = new Y.Doc()

// provider WebSocket (par ex. serveur Nextcloud/Collaboration)
const provider = new WebsocketProvider('wss://example.com/yjs', 'room-name', ydoc)

// texte partagé
const yXmlFragment = ydoc.getXmlFragment('prosemirror')

// ----
// Étape 2 : configurer l’éditeur TipTap
// ----
const editor = useEditor({
  extensions: [StarterKit],
  content: '<p>Hello collaborative world 🌍</p>',
  editorProps: {
    attributes: {
      class: 'prose p-4 border rounded',
    },
  },
  // Ajout des plugins Yjs
  onCreate({ editor }) {
    editor.registerPlugin(ySyncPlugin(yXmlFragment))
    editor.registerPlugin(yCursorPlugin(provider.awareness))
    editor.registerPlugin(yUndoPlugin())
  },
})

// ----
// Étape 3 : clean-up
// ----
onBeforeUnmount(() => {
  provider.destroy()
  editor.destroy()
})
</script>

<template>
  <EditorContent :editor="editor" />
</template>

