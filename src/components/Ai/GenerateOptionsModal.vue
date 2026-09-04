<!--
  SPDX-FileCopyrightText: 2026 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <NcModal
    size="normal"
    :name="t('agora', 'Generate Options with AI')"
    @close="handleClose"
  >
    <div class="generate-options-modal">
      <div class="modal-header">
        <div class="header-icon">
          <Sparkles :size="32" />
        </div>
        <h3>{{ t('agora', 'Generate Options with AI') }}</h3>
        <p class="modal-description">
          {{ t('agora', 'Describe what options you want to create. The AI will generate suggestions based on your description and the current discussion.') }}
        </p>
      </div>

      <div class="modal-content">
        <div class="form-group" :class="{ 'disabled': isLoading }">
          <label for="ai-prompt">{{ t('agora', 'What kind of options do you want to create?') }}</label>
          <NcTextField
            id="ai-prompt"
            v-model:value="prompt"
            :placeholder="t('agora', 'E.g. Generate options for reducing carbon emissions in our city')"
            type="textarea"
            :rows="4"
            :label="t('agora', 'Describe your options')"
            :disabled="isLoading"
          />
          <p class="hint-text">
            {{ t('agora', 'Be specific. The AI will use your inquiry context to generate relevant options.') }}
          </p>
        </div>

        <div class="form-group" :class="{ 'disabled': isLoading }">
          <label for="option-count">{{ t('agora', 'Number of options to generate') }}</label>
          <div class="count-selector">
            <NcButton
              type="secondary"
              size="small"
              :disabled="isLoading"
              @click="decrementCount"
            >
              <Minus :size="16" />
            </NcButton>
            <span class="count-display">{{ count }}</span>
            <NcButton
              type="secondary"
              size="small"
              :disabled="isLoading"
              @click="incrementCount"
            >
              <Plus :size="16" />
            </NcButton>
          </div>
          <p class="hint-text">
            {{ t('agora', 'Choose between 2 and 10 options') }}
          </p>
        </div>

        <!-- Loading indicator -->
        <div v-if="isLoading" class="loading-indicator">
          <NcLoadingIcon :size="24" appearance="auto" />
          <span>{{ t('agora', 'Generating options...') }}</span>
          <span class="loading-dots">
            <span>.</span><span>.</span><span>.</span>
          </span>
        </div>
      </div>

      <div class="modal-footer">
        <NcButton
          type="secondary"
          :disabled="isLoading"
          @click="handleClose"
        >
          {{ t('agora', 'Cancel') }}
        </NcButton>
        <NcButton
          type="primary"
          :disabled="!prompt.trim() || isLoading"
          @click="handleGenerate"
        >
          <Sparkles v-if="!isLoading" :size="16" />
          <NcLoadingIcon v-else :size="16" appearance="auto" />
          {{ isLoading ? t('agora', 'Generating...') : t('agora', 'Generate Options') }}
        </NcButton>
      </div>
    </div>
  </NcModal>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { t } from '@nextcloud/l10n'
import NcModal from '@nextcloud/vue/components/NcModal'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcTextField from '@nextcloud/vue/components/NcTextField'
import NcLoadingIcon from '@nextcloud/vue/components/NcLoadingIcon'
import { Sparkles, Plus, Minus } from 'lucide-vue-next'

const props = defineProps<{
  show: boolean
  inquiryId: number
  initialPrompt?: string
  initialCount?: number
   loading?: boolean
}>()

const emit = defineEmits<{
  close: []
  generate: [prompt: string, count: number]
}>()

// State
const prompt = ref('')
const count = ref(4)
const isLoading = computed(() => props.loading || localLoading.value)
// Initialize with props
const initialize = () => {
  // Set prompt from props, but only if empty and initialPrompt is provided
  if (!prompt.value && props.initialPrompt) {
    prompt.value = props.initialPrompt
  }
  // Set count from props
  if (props.initialCount) {
    count.value = props.initialCount
  }
  // Reset loading state
  isLoading.value = false
}

// Initialize on mount
initialize()

// Watch for show prop to reset state when modal opens
watch(() => props.show, (newVal) => {
  if (newVal) {
    initialize()
    // Focus the textarea after a short delay
    nextTick(() => {
      const textarea = document.querySelector('#ai-prompt textarea') as HTMLTextAreaElement
      if (textarea) {
        textarea.focus()
      }
    })
  }
}, { immediate: true })

// Watch for initialPrompt changes
watch(() => props.initialPrompt, (newVal) => {
  if (newVal && !prompt.value) {
    prompt.value = newVal
  }
})

const incrementCount = () => {
  if (count.value < 10) count.value++
}

const decrementCount = () => {
  if (count.value > 2) count.value--
}

const handleClose = () => {
  if (isLoading.value) return // Prevent closing while loading
  isLoading.value = false
  emit('close')
}

const handleGenerate = () => {
  if (prompt.value.trim() && !isLoading.value) {
    isLoading.value = true
    // Small delay to show loading state before emitting
    setTimeout(() => {
      emit('generate', prompt.value, count.value)
    }, 100)
  }
}

// Expose method to reset loading state from parent
const resetLoading = () => {
  isLoading.value = false
}

// Expose for parent component to control loading state
defineExpose({
  resetLoading,
  isLoading
})
</script>

<style scoped lang="scss">
.generate-options-modal {
  padding: 0;
  background: var(--color-main-background);
  border-radius: 24px;
  overflow: hidden;

  .modal-header {
    text-align: center;
    padding: 32px 32px 24px;
    background: linear-gradient(135deg, rgba(var(--color-primary-element-rgb), 0.05) 0%, rgba(var(--color-primary-element-rgb), 0.02) 100%);
    border-bottom: 1px solid var(--color-border);

    .header-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 64px;
      height: 64px;
      background: linear-gradient(135deg, var(--color-primary-element) 0%, var(--color-primary-element-light) 100%);
      border-radius: 32px;
      margin-bottom: 16px;
      color: white;
    }

    h3 {
      margin: 0 0 8px 0;
      font-size: 24px;
      font-weight: 700;
      color: var(--color-main-text);
    }

    .modal-description {
      margin: 0;
      font-size: 14px;
      color: var(--color-text-lighter);
    }
  }

  .modal-content {
    padding: 24px;

    .form-group {
      margin-bottom: 20px;
      transition: opacity 0.3s ease;

      label {
        display: block;
        margin-bottom: 8px;
        font-weight: 600;
        font-size: 14px;
        color: var(--color-main-text);
      }

      .hint-text {
        margin: 6px 0 0 0;
        font-size: 12px;
        color: var(--color-text-lighter);
      }

      .count-selector {
        display: flex;
        align-items: center;
        gap: 12px;

        .count-display {
          font-size: 20px;
          font-weight: 700;
          min-width: 40px;
          text-align: center;
          color: var(--color-main-text);
        }
      }

      &.disabled {
        opacity: 0.6;
        pointer-events: none;
      }
    }

    .loading-indicator {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      background: var(--color-background-dark);
      border-radius: 8px;
      margin-top: 8px;
      color: var(--color-text-lighter);
      font-size: 14px;

      .loading-dots {
        display: inline-flex;
        gap: 2px;
        
        span {
          animation: dotPulse 1.4s infinite;
          &:nth-child(2) { animation-delay: 0.2s; }
          &:nth-child(3) { animation-delay: 0.4s; }
        }
      }
    }
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    padding: 20px 24px;
    background: var(--color-background-dark);
    border-top: 1px solid var(--color-border);

    .primary-button {
      min-width: 160px;
      justify-content: center;
    }
  }
}

@keyframes dotPulse {
  0%, 80%, 100% { opacity: 0; }
  40% { opacity: 1; }
}

// Ensure textarea is properly styled when disabled
:deep(.nc-text-field) {
  textarea {
    &:disabled {
      background: var(--color-background-dark);
      cursor: not-allowed;
    }
  }
}
</style>
