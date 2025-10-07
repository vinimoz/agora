<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { computed, ref } from 'vue'
import { t } from '@nextcloud/l10n'

import NcButton from '@nextcloud/vue/components/NcButton'

import SpeakerIcon from 'vue-material-design-icons/Bullhorn.vue'
import CheckIcon from 'vue-material-design-icons/Check.vue'

import { ConfigBox, RadioGroupDiv, InputDiv } from '../Base/index.ts'

import { useInquiryStore } from '../../stores/inquiry.ts'
import { InquiryTypesUI } from '../../helpers/modules/InquiryHelper.ts'
import { showError, showSuccess } from '@nextcloud/dialogs'

const inquiryStore = useInquiryStore()

const emit = defineEmits<{
  (e: 'close'): void
  (
    e: 'added',
    inquiry: {
      id: number
      title: string
    }
  ): void
}>()

const inquiryTitle = ref('')
const inquiryId = ref<number | null>(null)
const adding = ref(false)

type InquiryTypeKey = keyof typeof InquiryTypesUI
const inquiryType = ref<InquiryTypeKey>('proposal')

const inquiryTypeOptions = Object.entries(InquiryTypesUI)
  .filter(([key]) => !['official', 'suggestion'].includes(key))
  .map(([key, value]) => ({
    value: key,
    label: value.label,
  }))

const titleIsEmpty = computed(() => inquiryTitle.value === '')
const disableAddButton = computed(() => titleIsEmpty.value || adding.value)

async function addInquiry() {
  try {
    // block the modal to prevent double submission
    adding.value = true
    // add the inquiry
    const inquiry = await inquiryStore.add({
      type: inquiryType.value,
      title: inquiryTitle.value,
    })

    if (inquiry) {
      inquiryId.value = inquiry.id

      showSuccess(
        t('agora', '"{inquiryTitle}" has been added', {
          inquiryTitle: inquiry.title,
        })
      )
      emit('added', {
        id: inquiry.id,
        title: inquiry.title,
      })
      resetInquiry()
    }
  } catch {
    showError(
      t('agora', 'Error while creating Inquiry "{inquiryTitle}"', {
        inquiryTitle: inquiryTitle.value,
      })
    )
  } finally {
    // unblock the modal
    adding.value = false
  }
}

function resetInquiry() {
  inquiryId.value = null
  inquiryTitle.value = ''
}
</script>

<template>
  <div class="create-dialog">
    <ConfigBox :name="t('agora', 'Title')">
      <template #icon>
        <SpeakerIcon />
      </template>
      <InputDiv
        v-model="inquiryTitle"
        focus
        type="text"
        :placeholder="t('agora', 'Enter title')"
        :helper-text="t('agora', 'Choose a meaningful title for your inquiry')"
        :label="t('agora', 'Enter title')"
        @submit="addInquiry"
      />
    </ConfigBox>

    <ConfigBox :name="t('agora', 'Inquiry type')" :label="t('agora', 'Inquiry type')">
      <template #icon>
        <CheckIcon />
      </template>
      <RadioGroupDiv v-model="inquiryType" :options="inquiryTypeOptions" />
    </ConfigBox>

    <div class="create-buttons">
      <NcButton @click="emit('close')">
        <template #default>
          {{ t('agora', 'Close') }}
        </template>
      </NcButton>
      <NcButton :disabled="disableAddButton" :variant="'primary'" @click="addInquiry">
        <template #default>
          {{ t('agora', 'Add') }}
        </template>
      </NcButton>
    </div>
  </div>
</template>

<style lang="css">
.create-dialog {
  background-color: var(--color-main-background);
  padding: 8px 20px;
}

.create-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style>
