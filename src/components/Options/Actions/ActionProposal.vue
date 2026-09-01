<!--
  SPDX-FileCopyrightText: 2026 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div v-if="show" class="action-proposal-container">
    <!-- Step 1: Configuration Modal -->
    <GenerateOptionsModal
      v-if="showConfigModal"
      :show="showConfigModal"
      :inquiry-id="inquiryId"
      :initial-prompt="initialPrompt"
      :initial-count="initialCount"
      @close="handleConfigClose"
      @generate="handleGenerate"
    />

    <!-- Step 2: Preview & Select Options Modal -->
    <PreviewOptionsModal
      v-if="showPreviewModal"
      :show="showPreviewModal"
      :options="generatedOptions"
      :loading="loading"
      @close="handlePreviewClose"
      @regenerate="handleRegenerate"
      @import="handleImport"
    />

    <!-- Success Modal -->
    <SuccessModal
      v-if="showSuccessModal"
      :show="showSuccessModal"
      :count="createdCount"
      @close="handleSuccessClose"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { showError } from '@nextcloud/dialogs'
import GenerateOptionsModal from '../../Ai/GenerateOptionsModal.vue'
import PreviewOptionsModal from '../../Ai/PreviewOptionsModal.vue'
import SuccessModal from '../../Ai/SuccessModal.vue'
import { useAiStore } from '../../../stores/ai'
import { useOptionsStore } from '../../../stores/options'
import { Logger } from '../../../helpers/modules/logger'

// Types
interface GeneratedOption {
  text: string
  title?: string
  description?: string
  pros?: string[]
  cons?: string[]
  tags?: string[]
  selected: boolean
}

// Props
const props = defineProps<{
  show: boolean
  inquiryId: number
  actionKey?: string
  initialPrompt?: string
  initialCount?: number
}>()

// Emits
const emit = defineEmits<{
  close: []
  actionCompleted: [result: unknown]
}>()

// Stores
const aiStore = useAiStore()
const optionsStore = useOptionsStore()

// State
const showConfigModal = ref(false)
const showPreviewModal = ref(false)
const showSuccessModal = ref(false)
const loading = ref(false)
const generatedOptions = ref<GeneratedOption[]>([])
const createdCount = ref(0)

// Default values
const defaultPrompt = props.initialPrompt || ''
const defaultCount = props.initialCount || 4

// Methods
const executeAction = async () => {
  if (!props.show) return

  // Reset state
  generatedOptions.value = []
  createdCount.value = 0

try {
  switch (props.actionKey) {
    case 'create_options_ai':
      showConfigModal.value = true
      return  
    default:
      console.warn(`Unknown action: ${props.actionKey}`)
  }
  } catch (error) {
    Logger.error('Error generating options actions', { error })
    showError('Failed to generate options action. Please try again.')
    showConfigModal.value = true
  }

}

const handleConfigClose = () => {
  showConfigModal.value = false
  emit('close')
}

const handleGenerate = async (prompt: string, count: number) => {
  loading.value = true
  showConfigModal.value = false

  try {
    // Generate options using AI
    const response = await aiStore.generateOptionsFromInquiry(
      props.inquiryId,
      count
    )

    // Parse the response
    let options = parseOptions(response, count, prompt)

    // If no options were extracted, create fallback
    if (options.length === 0) {
      options = createFallbackOptions(count, prompt)
    }

    generatedOptions.value = options
    showPreviewModal.value = true
  } catch (error) {
    Logger.error('Error generating options', { error })
    showError('Failed to generate options. Please try again.')
    showConfigModal.value = true
  } finally {
    loading.value = false
  }
}

const parseOptions = (response: any, count: number, prompt: string): GeneratedOption[] => {
  let options: GeneratedOption[] = []

  if (Array.isArray(response)) {
    options = response.map((opt: any) => ({
      text: typeof opt === 'string' ? opt : opt.text || opt.title || '',
      title: typeof opt === 'string' ? '' : opt.title || '',
      description: typeof opt === 'string' ? '' : opt.description || '',
      pros: typeof opt === 'string' ? [] : opt.pros || [],
      cons: typeof opt === 'string' ? [] : opt.cons || [],
      tags: typeof opt === 'string' ? [] : opt.tags || [],
      selected: true
    }))
  } else if (response && typeof response === 'object') {
    if (response.options && Array.isArray(response.options)) {
      options = response.options.map((opt: any) => ({
        text: typeof opt === 'string' ? opt : opt.text || opt.title || '',
        title: typeof opt === 'string' ? '' : opt.title || '',
        description: typeof opt === 'string' ? '' : opt.description || '',
        pros: typeof opt === 'string' ? [] : opt.pros || [],
        cons: typeof opt === 'string' ? [] : opt.cons || [],
        tags: typeof opt === 'string' ? [] : opt.tags || [],
        selected: true
      }))
    } else if (response.text || response.title) {
      // Single option response
      options = [{
        text: response.text || response.title || '',
        title: response.title || '',
        description: response.description || '',
        pros: response.pros || [],
        cons: response.cons || [],
        tags: response.tags || [],
        selected: true
      }]
    }
  }

  return options
}

const createFallbackOptions = (count: number, prompt: string): GeneratedOption[] => {
  return Array.from({ length: Math.min(count, 10) }, (_, i) => ({
    text: `Option ${i + 1}: ${prompt.substring(0, 50)}...`,
    selected: true
  }))
}

const handlePreviewClose = () => {
  showPreviewModal.value = false
  emit('close')
}

const handleRegenerate = () => {
  showPreviewModal.value = false
  showConfigModal.value = true
  generatedOptions.value = []
}

const handleImport = async (selectedOptions: GeneratedOption[]) => {
  if (selectedOptions.length === 0) {
    showError('Please select at least one option to create')
    return
  }

  loading.value = true
  showPreviewModal.value = false

  try {
    let created = 0
    for (const option of selectedOptions) {
      await optionsStore.createOption({
        title: option.title || option.text,
        text: option.text,
        type: 'proposal',
        family: 'debate',
        targetId: props.inquiryId,
        status: 'published',
        miscFields: {
          description: option.description || '',
          tags: option.tags?.join(',') || '',
          pros: option.pros?.join(',') || '',
          cons: option.cons?.join(',') || ''
        }
      })
      created++
    }

    createdCount.value = created
    showSuccessModal.value = true

    // Refresh options
    await optionsStore.load()

    emit('actionCompleted', {
      success: true,
      created: created,
      message: `${created} options created successfully`
    })
  } catch (error) {
    Logger.error('Error creating options', { error })
    showError('Failed to create options. Please try again.')
    showPreviewModal.value = true
  } finally {
    loading.value = false
  }
}

const handleSuccessClose = () => {
  showSuccessModal.value = false
  emit('close')
}

// Watch for show prop
watch(() => props.show, (newValue) => {
  if (newValue) {
    executeAction()
  }
})

// Execute immediately when component mounts
onMounted(() => {
  if (props.show) {
    executeAction()
  }
})
</script>

<style scoped lang="scss">
.action-proposal-container {
  // Container styles if needed
}
</style>
