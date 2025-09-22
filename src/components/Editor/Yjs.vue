<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

// TipTap
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'

// Yjs
import * as Y from 'yjs'
import { ySyncPlugin, yUndoPlugin, yCursorPlugin } from 'y-prosemirror'

// Nextcloud
import { getCollaborationClient } from '@nextcloud/collaboration'
import { showError } from '@nextcloud/dialogs'

const props = defineProps({
  documentId: {
    type: String,
    required: true,
    default: 'default-document',
  },
  initialContent: {
    type: String,
    default: '<p>Commencez à écrire...</p>',
  },
})

const route = useRoute()
const isLoading = ref(true)
const isConnected = ref(false)

// ---- Étape 1 : créer un document Yjs ----
const ydoc = new Y.Doc()
let provider = null

// ---- Étape 2 : configurer l'éditeur TipTap ----
const editor = useEditor({
  extensions: [
    StarterKit,
    Placeholder.configure({
      placeholder: 'Écrivez quelque chose de collaboratif...',
    }),
  ],
  content: props.initialContent,
  editorProps: {
    attributes: {
      class: 'prose p-4 border rounded min-h-[200px] max-w-none',
      'data-test': 'collaborative-editor',
    },
  },
  immediatelyRender: false,
})

// ---- Étape 3 : initialiser la collaboration ----
const initializeCollaboration = async () => {
  try {
    // Utiliser le fournisseur Nextcloud Collaboration
    provider = getCollaborationClient().getYjsProvider(props.documentId)

    // Attendre la connexion
    await provider.connected

    isConnected.value = true

    // Texte partagé
    const yXmlFragment = ydoc.getXmlFragment('prosemirror')

    // Ajouter les plugins Yjs
    if (editor.value) {
      editor.value.registerPlugin(ySyncPlugin(yXmlFragment))
      editor.value.registerPlugin(yCursorPlugin(provider.awareness))
      editor.value.registerPlugin(yUndoPlugin())
    }
  } catch (error) {
    console.error('Erreur de connexion collaborative:', error)
    showError('Impossible de se connecter à la collaboration')
  } finally {
    isLoading.value = false
  }
}

// ---- Étape 4 : gestion du cycle de vie ----
onMounted(() => {
  initializeCollaboration()
})

onBeforeUnmount(() => {
  if (provider) {
    provider.destroy()
  }
  if (editor.value) {
    editor.value.destroy()
  }
})

// Surveiller les changements de document
watch(
  () => props.documentId,
  (newId) => {
    if (provider) {
      provider.destroy()
    }
    initializeCollaboration()
  }
)

// Exposer l'éditeur pour un usage parent
defineExpose({
  editor,
  ydoc,
  provider,
})
</script>

<template>
  <div class="collaborative-editor-container">
    <!-- Indicateur de statut -->
    <div v-if="isLoading" class="loading-indicator">Connexion à la collaboration...</div>

    <div v-else-if="!isConnected" class="connection-error">
      <p>Mode hors ligne - Les modifications ne seront pas synchronisées</p>
    </div>

    <!-- Éditeur -->
    <div class="editor-wrapper">
      <EditorContent :editor="editor" />
    </div>

    <!-- Informations de collaboration -->
    <div v-if="isConnected" class="collaboration-info">
      <span class="online-indicator"></span>
      Connecté en temps réel
    </div>
  </div>
</template>

<style scoped>
.collaborative-editor-container {
  position: relative;
}

.loading-indicator {
  padding: 1rem;
  background-color: var(--color-background-dark);
  border-radius: var(--border-radius);
  text-align: center;
}

.connection-error {
  padding: 0.5rem;
  background-color: var(--color-warning);
  border-radius: var(--border-radius);
  margin-bottom: 1rem;
  text-align: center;
}

.online-indicator {
  display: inline-block;
  width: 8px;
  height: 8px;
  background-color: var(--color-success);
  border-radius: 50%;
  margin-right: 0.5rem;
}

.collaboration-info {
  font-size: 0.8rem;
  color: var(--color-text-maxcontrast);
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
}

:deep(.ProseMirror) {
  outline: none;
  min-height: 200px;
}

:deep(.ProseMirror p.is-empty:first-child::before) {
  content: attr(data-placeholder);
  float: left;
  color: var(--color-text-maxcontrast);
  pointer-events: none;
  height: 0;
}
</style>
