<!--
  SPDX-FileCopyrightText: 2026 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
  <div class="vote-input-binary">
    <NcButton
      v-for="option in binaryOptions"
      :key="option.value"
      :type="isSelected(option.value) ? 'primary' : 'tertiary'"
      size="small"
       :disabled="disabled"
      @click="vote(option.value)"
    >
      <template #icon>
        <component :is="option.icon" :size="14" />
      </template>
      {{ option.label }}
    </NcButton>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import { ThumbsUp, ThumbsDown } from 'lucide-vue-next'
import type { SupportData, Option } from '../../Types/index'

const props = defineProps<{
  engineConfig: Record<string, unknown>
  option: Option
  disabled?: boolean
  userVote?: SupportData
}>()

const emit = defineEmits<{
  'update:score': [optionId: number, score: number | null]
}>()

const binaryOptions = [
  { value: 1, label: t('agora', 'Yes'), icon: ThumbsUp },
  { value: -1, label: t('agora', 'No'), icon: ThumbsDown },
]

const currentValue = computed(() => {
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
  // Toggle: if already selected, remove; otherwise set
  const newValue = currentValue.value === value ? null : value
  emit('update:score', props.option.id, newValue)
}
</script>

<style scoped lang="scss">
.vote-input-binary {
  display: flex;
  gap: 8px;
  align-items: center;

  :deep(.button-vue--primary) {
    background: var(--color-primary-element);
    border-color: var(--color-primary-element);
    
    &:hover {
      transform: scale(1.02);
    }
  }
}
</style>
