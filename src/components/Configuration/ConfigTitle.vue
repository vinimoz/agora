<!--
  - SPDX-FileCopyrightText: 2021 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { computed } from 'vue'
import { InputDiv } from '../Base/index.ts'
import { useInquiryStore } from '../../stores/inquiry.ts'

const emit = defineEmits(['change'])

const inquiryStore = useInquiryStore()
const checkTitle = computed(() => (inquiryStore.title ? '' : 'error'))
</script>

<template>
  <InputDiv
    v-model="inquiryStore.title"
    :signaling-class="checkTitle"
    type="text"
    @change="emit('change')"
  />
</template>
