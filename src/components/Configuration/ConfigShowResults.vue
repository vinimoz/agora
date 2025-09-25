<!--
  - SPDX-FileCopyrightText: 2021 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { RadioGroupDiv } from '../Base/index.ts'
import { t } from '@nextcloud/l10n'
import { useInquiryStore } from '../../stores/inquiry.ts'

const emit = defineEmits(['change'])

const inquiryStore = useInquiryStore()

const inquiryShowResultsOptions = [
  {
    value: 'always',
    label: t('agora', 'Always show results'),
  },
  {
    value: 'closed',
    label: t('agora', 'Hide results until inquiry is closed'),
  },
  {
    value: 'never',
    label: t('agora', 'Never show results'),
  },
]
</script>

<template>
  <div>
    <RadioGroupDiv
      v-model="inquiryStore.configuration.showResults"
      :options="inquiryShowResultsOptions"
      @update="emit('change')"
    />
  </div>
</template>
