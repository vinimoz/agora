<!--
  SPDX-FileCopyrightText: 2026 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
  <div class="vote-input-binary" role="group" :aria-label="option.title">
    <NcButton
      v-for="choice in binaryOptions"
      :key="choice.value"
      size="large"
      :pressed="isSelected(choice.value)"
      :disabled="disabled"
      @click="vote(choice.value)"
    >
      <template #icon>
        <CheckIcon v-if="isSelected(choice.value)" :size="20" />
        <component :is="choice.icon" v-else :size="20" />
      </template>
      {{ choice.label }}
    </NcButton>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import CheckIcon from 'vue-material-design-icons/Check.vue'
import { ThumbsUp, ThumbsDown } from 'lucide-vue-next'
import type { SupportData, Option } from '../../Types/index'

const props = defineProps<{
  option: Option
  disabled?: boolean
  userVote?: SupportData
  currentScore?: number | null
}>()

const emit = defineEmits<{
  'update:score': [optionId: number, score: number | null]
}>()

const binaryOptions = [
  { value: 1, label: t('agora', 'Yes'), icon: ThumbsUp },
  { value: -1, label: t('agora', 'No'), icon: ThumbsDown },
]

const currentValue = computed(() => {
  if (props.currentScore !== undefined && props.currentScore !== null) {
    const num = Number(props.currentScore)
    return isNaN(num) ? null : num
  }
  if (!props.userVote) return null
  let raw = props.userVote.value
  if (raw && typeof raw === 'object' && 'value' in raw) raw = raw.value
  if (typeof raw === 'number') return raw
  if (typeof raw === 'string') return Number(raw)
  return null
})

function isSelected(value: number) {
  return currentValue.value === value
}

function vote(value: number) {
  const newValue = currentValue.value === value ? null : value
  emit('update:score', props.option.id, newValue)
}
</script>

<style scoped lang="scss">
.vote-input-binary {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  // Never truncate a choice: NcButton ends its label with an ellipsis.
  :deep(.button-vue__text) {
    overflow: visible;
    white-space: normal;
    overflow-wrap: anywhere;
  }
}
</style>
