<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { showSuccess, showError } from '@nextcloud/dialogs'
import { t } from '@nextcloud/l10n'

import NcButton from '@nextcloud/vue/components/NcButton'

import SpeakerIcon from 'vue-material-design-icons/Bullhorn.vue'
import CheckIcon from 'vue-material-design-icons/Check.vue'

import { ConfigBox, RadioGroupDiv, InputDiv } from '../Base/index.ts'

import { useInquiryStore } from '../../stores/inquiry.ts'
import { InquiryTypes } from '../../helpers/modules/InquiryHelper.ts'

const inquiryStore = useInquiryStore()
const router = useRouter()

const title = ref('')
const adding = ref(false)

type InquiryTypeKey = keyof typeof InquiryTypes
const inquiryType = ref<InquiryTypeKey>('proposal')

const inquiryTypeOptions = Object.entries(InquiryTypes)
  .filter(([key]) => !['official', 'suggestion'].includes(key))
  .map(([key, value]) => ({
    value: key,
    label: value.label,
  }))

const titleEmpty = computed(() => title.value === '')
const disableConfirm = computed(() => titleEmpty.value || adding.value)

const emit = defineEmits(['cancel', 'add'])

/**
 *
 */
function resetInput() {
  title.value = ''
  inquiryType.value = 'proposal'
}

/**
 *
 */
async function add() {
  try {
    adding.value = true
    const inquiry = await inquiryStore.add({
      type: inquiryType.value,
      title: title.value,
    })

    resetInput()
    if (inquiry) {
      showSuccess(
        t('agora', 'Inquiry "{inquiryTitle}" added', {
          inquiryTitle: inquiry.title,
        })
      )

      emit('add')

      router.push({
        name: 'inquiry',
        params: { id: inquiry.id },
      })
    }
  } catch {
    showError(
      t('agora', 'Error while creating Inquiry "{inquiryTitle}"', {
        inquiryTitle: title.value,
      })
    )
  } finally {
    adding.value = false
  }
}
</script>

<template>
  <div class="create-dialog">
    <ConfigBox :name="t('agora', 'Title')">
      <template #icon>
        <SpeakerIcon />
      </template>
      <InputDiv
        v-model="title"
        focus
        type="text"
        :placeholder="t('agora', 'Enter title')"
        :label="t('agora', 'Enter title')"
        @submit="add()"
      />
    </ConfigBox>

    <ConfigBox :name="t('agora', 'Inquiry type')">
      <template #icon>
        <CheckIcon />
      </template>
      <RadioGroupDiv v-model="inquiryType" :options="inquiryTypeOptions" />
    </ConfigBox>

    <div class="create-buttons">
      <NcButton @click="emit('cancel')">
        <template #default>
          {{ t('agora', 'Cancel') }}
        </template>
      </NcButton>
      <NcButton :disabled="disableConfirm" :variant="'primary'" @click="add()">
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
