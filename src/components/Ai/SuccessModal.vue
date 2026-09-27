<!--
  SPDX-FileCopyrightText: 2026 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <NcModal
    size="small"
    :name="t('agora', 'Options Created')"
    @close="handleClose"
  >
    <div class="success-modal">
      <div class="success-icon">
        <CheckCircle :size="48" class="success-color" />
      </div>
      <h3>{{ t('agora', 'Options Created Successfully!') }}</h3>
      <p class="success-message">
        {{ t('agora', '{count} options have been created.', { count }) }}
      </p>
      <div class="modal-footer">
        <NcButton
          type="primary"
          @click="handleClose"
        >
          {{ t('agora', 'Done') }}
        </NcButton>
      </div>
    </div>
  </NcModal>
</template>

<script setup lang="ts">
import { t } from '@nextcloud/l10n'
import NcModal from '@nextcloud/vue/components/NcModal'
import NcButton from '@nextcloud/vue/components/NcButton'
import { CheckCircle } from 'lucide-vue-next'

const props = defineProps<{
  show: boolean
  count: number
}>()

const emit = defineEmits<{
  close: []
}>()

const handleClose = () => {
  emit('close')
}
</script>

<style scoped lang="scss">
.success-modal {
  max-width: 400px;
  text-align: center;
  padding: 40px;

  .success-icon {
    margin-bottom: 20px;

    .success-color {
      color: var(--color-success);
    }
  }

  h3 {
    margin: 0 0 12px 0;
    font-size: 20px;
    font-weight: 700;
    color: var(--color-main-text);
  }

  .success-message {
    margin: 0 0 24px 0;
    font-size: 14px;
    color: var(--color-text-light);
    line-height: 1.5;
  }

  .modal-footer {
    justify-content: center;
    padding: 0;
    background: transparent;
    border-top: none;
  }
}
</style>
