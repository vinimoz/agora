<!--
  SPDX-FileCopyrightText: 2026 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
  <NcModal v-if="visible" size="normal" @close="$emit('close')">
    <div class="resolution-modal">
      <h3>{{ t('agora', 'Propose Resolution') }}</h3>
      <p class="subtitle">
        {{ t('agora', 'Propose a resolution for: {title}', { title: option.title || option.text }) }}
      </p>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="resolution-text">
            {{ t('agora', 'Resolution Text') }}
            <span class="required">*</span>
          </label>
          <textarea
            id="resolution-text"
            v-model="resolutionText"
            class="resolution-textarea"
            :placeholder="t('agora', 'Describe how this objection can be resolved...')"
            required
            rows="6"
          />
        </div>

        <div class="form-group">
          <label for="resolution-status">
            {{ t('agora', 'Status') }}
          </label>
          <select id="resolution-status" v-model="resolutionStatus" class="resolution-select">
            <option value="proposed">{{ t('agora', 'Proposed') }}</option>
            <option value="under_review">{{ t('agora', 'Under Review') }}</option>
            <option value="accepted">{{ t('agora', 'Accepted') }}</option>
          </select>
        </div>

        <div class="modal-actions">
          <NcButton type="secondary" @click="$emit('close')">
            {{ t('agora', 'Cancel') }}
          </NcButton>
          <NcButton type="primary" native-type="submit" :disabled="!resolutionText.trim()">
            {{ t('agora', 'Propose Resolution') }}
          </NcButton>
        </div>
      </form>
    </div>
  </NcModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { t } from '@nextcloud/l10n'
import NcModal from '@nextcloud/vue/components/NcModal'
import NcButton from '@nextcloud/vue/components/NcButton'
import type { Option } from '../../Types/index.ts'

 // eslint-disable-next-line 
const props = defineProps<{
  visible: boolean
  option: Option
   // eslint-disable-next-line
  inquiryId: number
}>()

const emit = defineEmits<{
  close: []
  submit: [data: { text: string; status: string }]
}>()

const resolutionText = ref('')
const resolutionStatus = ref('proposed')

const handleSubmit = () => {
  if (!resolutionText.value.trim()) return
  emit('submit', {
    text: resolutionText.value,
    status: resolutionStatus.value
  })
  resolutionText.value = ''
  resolutionStatus.value = 'proposed'
}
</script>

<style scoped lang="scss">
.resolution-modal {
  padding: 24px;

  h3 {
    margin: 0 0 8px 0;
    font-size: 20px;
  }

  .subtitle {
    margin: 0 0 20px 0;
    color: var(--color-text-lighter);
    font-size: 14px;
  }

  .form-group {
    margin-bottom: 16px;

    label {
      display: block;
      font-weight: 600;
      margin-bottom: 6px;
      font-size: 14px;

      .required {
        color: var(--color-error);
      }
    }

    .resolution-textarea {
      width: 100%;
      padding: 10px;
      border: 1px solid var(--color-border);
      border-radius: 8px;
      font-family: inherit;
      font-size: 14px;
      resize: vertical;
      min-height: 120px;

      &:focus {
        border-color: var(--color-primary);
        outline: none;
      }
    }

    .resolution-select {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid var(--color-border);
      border-radius: 8px;
      font-size: 14px;
      background: var(--color-main-background);

      &:focus {
        border-color: var(--color-primary);
        outline: none;
      }
    }
  }

  .modal-actions {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    margin-top: 24px;
    padding-top: 16px;
    border-top: 1px solid var(--color-border);
  }
}
</style>
