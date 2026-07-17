<!--
  - SPDX-FileCopyrightText: 2024 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup>
import { ref } from 'vue'
import { Logger } from '../../../helpers/index.ts'
import { t } from '@nextcloud/l10n'
import { showSuccess, showError } from '@nextcloud/dialogs'

import NcButton from '@nextcloud/vue/components/NcButton'

import { AdminAPI } from '../../../Api/index.ts'

const cleanInstance = ref({
  text: t('agora', 'Clean instance'),
  disabled: false,
})

/**
 * Start Clean Instance job
 * WARNING: This will destroy all data permanently!
 */
async function runCleanInstanceJob() {
  try {
    // Show warning confirmation before proceeding
    const confirmMessage = t(
      'agora',
      'WARNING: This will permanently destroy ALL data in the instance. This action cannot be undone. Are you absolutely sure?'
    )
    
    if (!confirm(confirmMessage)) {
      return
    }

    // Second confirmation for safety
    const secondConfirmMessage = t(
      'agora',
      'FINAL WARNING: All polls, votes, comments, and settings will be permanently deleted. Type "DELETE" to confirm:'
    )
    
    const userInput = prompt(secondConfirmMessage)
    if (userInput !== 'DELETE') {
      showError(t('agora', 'Clean instance cancelled'))
      return
    }

    cleanInstance.value.disabled = true
    cleanInstance.value.text = t('agora', 'Cleaning instance …')
    
    await AdminAPI.cleanInstance()
    
    cleanInstance.value.text = t('agora', 'Instance cleaned')
    showSuccess(t('agora', 'All data has been successfully destroyed'))
    
  } catch (error) {
    cleanInstance.value.text = t('agora', 'Clean instance failed')
    showError(t('agora', 'Failed to clean instance: {message}', { 
      message: error.message || t('agora', 'Unknown error') 
    }))
    Logger.error('Error on executing clean instance job', { error })
    cleanInstance.value.disabled = false
  }
}
</script>

<template>
  <div class="user_settings clean-instance-section">
    <div class="job_hints danger-warning">
      <p class="warning-title">
        ⚠️ {{ t('agora', 'DANGER ZONE - Data Destruction') }} ⚠️
      </p>
      <p>
        {{ 
          t(
            'agora',
            'This action will permanently destroy ALL data including polls, votes, comments, and settings.'
          ) 
        }}
      </p>
      <p class="warning-highlight">
        {{
          t(
            'agora',
            'This operation CANNOT be undone. All data will be lost forever.'
          )
        }}
      </p>
      <p>
        {{
          t(
            'agora',
            'Only use this if you are absolutely sure you want to reset the entire instance to an empty state.'
          )
        }}
      </p>
    </div>
    
    <div class="job_buttons_section">
      <NcButton
        :variant="'danger'"
        :aria-label="cleanInstance.text"
        :disabled="cleanInstance.disabled"
        @click="runCleanInstanceJob()"
      >
        <template #icon>
          <span class="danger-icon">🗑️</span>
        </template>
        {{ cleanInstance.text }}
      </NcButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.clean-instance-section {
  margin-top: 24px;
  border: 2px solid var(--color-error);
  
  .danger-warning {
    background-color: var(--color-background-darker);
    padding: 16px;
    border-radius: 8px;
    
    .warning-title {
      font-weight: bold;
      color: var(--color-error);
      font-size: 1.2em;
      margin-bottom: 12px;
    }
    
    .warning-highlight {
      font-weight: bold;
      color: var(--color-error);
      margin: 8px 0;
    }
  }
  
  .job_buttons_section {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    gap: 12px;
    padding: 0 16px 16px 16px;
  }
  
  .danger-icon {
    margin-right: 4px;
  }
}
</style>
