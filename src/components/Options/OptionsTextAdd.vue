<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { ref } from 'vue'
import { showError, showSuccess } from '@nextcloud/dialogs'
import { t } from '@nextcloud/l10n'

import { InputDiv } from '../Base/index.ts'
import { SimpleOption, useOptionsStore } from '../../stores/options.ts'
import { AxiosError } from '@nextcloud/axios'

const optionsStore = useOptionsStore()

const { placeholder = t('agora', 'Add option') } = defineProps<{
  placeholder?: string
}>()

const newInquiryText = ref('')

/**
 *
 */
async function addOption(): Promise<void> {
  if (newInquiryText.value) {
    try {
      await optionsStore.add({ text: newInquiryText.value } as SimpleOption)
      showSuccess(
        t('agora', '{optionText} added', {
          optionText: newInquiryText.value,
        })
      )
      newInquiryText.value = ''
    } catch (error) {
      if ((error as AxiosError).response?.status === 409) {
        showError(
          t('agora', '{optionText} already exists', {
            optionText: newInquiryText.value,
          })
        )
      } else {
        showError(
          t('agora', 'Error adding {optionText}', {
            optionText: newInquiryText.value,
          })
        )
      }
    }
  }
}
</script>

<template>
  <InputDiv v-model="newInquiryText" :placeholder="placeholder" submit @submit="addOption()" />
</template>

<style lang="scss">
.optionAdd {
  display: flex;
}

.newOption {
  margin-inline-start: 40px;
  flex: 1;
  &:empty:before {
    color: grey;
  }
}

.submit-option {
  width: 30px;
  background-color: transparent;
  border: none;
  opacity: 0.3;
  cursor: pointer;
}
</style>
