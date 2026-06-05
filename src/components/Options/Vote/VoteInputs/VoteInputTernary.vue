<!--
  SPDX-FileCopyrightText: 2026 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
  <div class="vote-input-ternary">
    <NcButton
      v-for="option in ternaryOptions"
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
import { ThumbsUp, Minus, ThumbsDown } from 'lucide-vue-next'
import type { SupportData, SupportValue, Option } from '../../Types/index'

const props = defineProps<{
  engineConfig: Record<string, unknown>
  option: Option
  disabled?: boolean
  userVote?: SupportData
}>()

const emit = defineEmits<{
  vote: [value: SupportValue]
}>()

const ternaryOptions = [
  { value: 1, label: t('agora', 'For'), icon: ThumbsUp },
  { value: 0, label: t('agora', 'Abstain'), icon: Minus },
  { value: -1, label: t('agora', 'Against'), icon: ThumbsDown },
]

const currentValue = computed(() => {
  if (!props.userVote) return null
  const raw = props.userVote.value
  if (typeof raw === 'number') return raw
  if (typeof raw === 'string') return Number(raw)
  return null
})

function isSelected(value: number) {
  return currentValue.value === value
}

function vote(value: number) {
  emit('vote', value)
}
</script>

<style scoped lang="scss">
.vote-input-ternary {
  display: flex;
  gap: 8px;
  align-items: center;

  :deep(.button-vue--primary) {
    background: var(--color-primary-element);
    border-color: var(--color-primary-element);
    
    .button-vue__icon {
      color: white;
    }
  }
}
</style>
