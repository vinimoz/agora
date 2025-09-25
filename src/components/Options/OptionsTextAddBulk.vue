<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { ref } from 'vue'
import { showError, showSuccess } from '@nextcloud/dialogs'
import { t } from '@nextcloud/l10n'

import NcModal from '@nextcloud/vue/components/NcModal'
import NcActions from '@nextcloud/vue/components/NcActions'
import NcActionButton from '@nextcloud/vue/components/NcActionButton'
import NcButton from '@nextcloud/vue/components/NcButton'

import PasteIcon from 'vue-material-design-icons/ClipboardTextMultiple.vue'

import { useOptionsStore } from '../../stores/options.ts'

interface Props {
  placeholder?: string
  caption?: string
}

const optionsStore = useOptionsStore()

const newInquiryTexts = ref('')
const showModal = ref(false)

const {
  placeholder = t('agora', 'Add options list (one option per line)'),
  caption = t('agora', 'Paste option list'),
} = defineProps<Props>()

/**
 *
 */
async function addOptionsList() {
  if (newInquiryTexts.value) {
    try {
      await optionsStore.addBulk({ text: newInquiryTexts.value })
      showSuccess(t('agora', 'Options added'))
      newInquiryTexts.value = ''
    } catch {
      showError(
        t('agora', 'Error adding options', {
          optionText: newInquiryTexts.value,
        })
      )
    }
  }
}
</script>

<template>
  <div>
    <NcActions>
      <NcActionButton :name="caption" :aria-label="caption" @click="showModal = true">
        <template #icon>
          <PasteIcon />
        </template>
      </NcActionButton>
    </NcActions>

    <NcModal v-if="showModal" size="small" :can-close="false">
      <div class="option-clone-date modal__content">
        <h2>{{ t('agora', 'Create multiple options at once') }}</h2>
        <p>
          {{
            t(
              'inquiries',
              'Each line creates a new option. Duplicates will get skipped without warning.'
            )
          }}
        </p>

        <textarea v-model="newInquiryTexts" class="add-options-list" :placeholder="placeholder" />

        <div class="modal__buttons">
          <NcButton @click="showModal = false">
            <template #default>
              {{ t('agora', 'Close') }}
            </template>
          </NcButton>

          <NcButton :variant="'primary'" @click="addOptionsList()">
            <template #default>
              {{ t('agora', 'OK') }}
            </template>
          </NcButton>
        </div>
      </div>
    </NcModal>
  </div>
</template>

<style lang="scss">
.option-clone-date.modal__content {
  padding-inline: 28px;
}

.add-options-list {
  width: 99%;
  resize: vertical;
  height: 210px;
}
</style>
