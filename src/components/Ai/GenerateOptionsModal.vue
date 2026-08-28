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
        <div class="form-group">
          <label for="ai-prompt">{{ t('agora', 'What kind of options do you want to create?') }}</label>
          <NcTextField
            id="ai-prompt"
            v-model:value="prompt"
            :placeholder="t('agora', 'E.g. Generate options for reducing carbon emissions in our city')"
            type="textarea"
            :rows="4"
            :label="t('agora', 'Describe your options')"
          />
          <p class="hint-text">
            {{ t('agora', 'Be specific. The AI will use your inquiry context to generate relevant options.') }}
          </p>
        </div>

        <div class="form-group">
          <label for="option-count">{{ t('agora', 'Number of options to generate') }}</label>
          <div class="count-selector">
            <NcButton
              type="secondary"
              size="small"
              @click="decrementCount"
            >
              <Minus :size="16" />
            </NcButton>
            <span class="count-display">{{ count }}</span>
            <NcButton
              type="secondary"
              size="small"
              @click="incrementCount"
            >
              <Plus :size="16" />
            </NcButton>
          </div>
          <p class="hint-text">
            {{ t('agora', 'Choose between 2 and 10 options') }}
          </p>
        </div>
      </div>

      <div class="modal-footer">
        <NcButton
          type="secondary"
          @click="handleClose"
        >
          {{ t('agora', 'Cancel') }}
        </NcButton>
        <NcButton
          type="primary"
          :disabled="!prompt.trim()"
          @click="handleGenerate"
        >
          <Sparkles :size="16" />
          {{ t('agora', 'Generate Options') }}
        </NcButton>
      </div>
    </div>
  </NcModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { t } from '@nextcloud/l10n'
import NcModal from '@nextcloud/vue/components/NcModal'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcTextField from '@nextcloud/vue/components/NcTextField'
import { Sparkles, Plus, Minus } from 'lucide-vue-next'

const props = defineProps<{
  show: boolean
  inquiryId: number
  initialPrompt?: string
  initialCount?: number
}>()

const emit = defineEmits<{
  close: []
  generate: [prompt: string, count: number]
}>()

const prompt = ref(props.initialPrompt || '')
const count = ref(props.initialCount || 4)

const incrementCount = () => {
  if (count.value < 10) count.value++
}

const decrementCount = () => {
  if (count.value > 2) count.value--
}

const handleClose = () => {
  emit('close')
}

const handleGenerate = () => {
  if (prompt.value.trim()) {
    emit('generate', prompt.value, count.value)
  }
}
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
    }
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    padding: 20px 24px;
    background: var(--color-background-dark);
    border-top: 1px solid var(--color-border);
  }
}
</style>
