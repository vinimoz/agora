<!-- src/components/tiptap/DebateArgumentsView.vue -->
<template>
  <div class="debate-arguments space-y-4 p-3 rounded-md border bg-gray-50">
    <h3 class="text-lg font-bold">Débat : {{ title }}</h3>

    <button
      class="px-3 py-1 bg-blue-500 text-white rounded"
      @click="openForm"
    >
      ➕ Ajouter un argument
    </button>

    <div class="grid grid-cols-3 gap-4 mt-3">
      <div>
        <h4 class="font-semibold text-green-600">POUR</h4>
        <ul class="list-disc ml-4">
          <li v-for="arg in arguments.pro" :key="arg.id">
            <span class="font-medium">{{ arg.author }}</span> : {{ arg.text }}
            <DebateReactions :arg="arg" />
          </li>
        </ul>
      </div>

      <div>
        <h4 class="font-semibold text-red-600">CONTRE</h4>
        <ul class="list-disc ml-4">
          <li v-for="arg in arguments.con" :key="arg.id">
            <span class="font-medium">{{ arg.author }}</span> : {{ arg.text }}
            <DebateReactions :arg="arg" />
          </li>
        </ul>
      </div>

      <div>
        <h4 class="font-semibold text-blue-600">ALTERNATIVES</h4>
        <ul class="list-disc ml-4">
          <li v-for="arg in arguments.alternatives" :key="arg.id">
            <span class="font-medium">{{ arg.author }}</span> : {{ arg.text }}
            <DebateReactions :arg="arg" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DebateReactions from './DebateReactions.vue'

defineProps<{
  title?: string
  arguments: {
    pro: { id: number; author: string; text: string }[]
    con: { id: number; author: string; text: string }[]
    alternatives: { id: number; author: string; text: string }[]
  }
}>()

const openForm = () => {
  alert('TODO: ouvrir le formulaire pour ajouter un argument')
}
</script>

