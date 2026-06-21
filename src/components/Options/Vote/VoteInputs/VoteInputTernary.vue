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
      :class="{ 'ternary-selected': isSelected(option.value) }"
      :disabled="disabled"
      @click="vote(option.value)"
    >
      <template #icon>
        <component :is="option.icon" :size="16" />
      </template>
      {{ option.label }}
    </NcButton>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import { ThumbsUp, Minus, ThumbsDown } from 'lucide-vue-next'
import type { SupportData, Option } from '../../Types/index'

const props = defineProps<{
  engineConfig: Record<string, unknown>
  option: Option
  disabled?: boolean
  userVote?: SupportData
  currentScore?: number | null
}>()

const emit = defineEmits<{
  'update:score': [optionId: number, score: number | null]
}>()

const ternaryOptions = [
  { value: 1, label: t('agora', 'For'), icon: ThumbsUp },
  { value: 0, label: t('agora', 'Abstain'), icon: Minus },
  { value: -1, label: t('agora', 'Against'), icon: ThumbsDown },
]

const currentValue = computed(() => {
  // Normalize to number
  if (props.currentScore !== undefined && props.currentScore !== null) {
    const num = Number(props.currentScore)
    return isNaN(num) ? null : num
  }
  // Fallback to stored vote
  if (!props.userVote) return null
  let raw = props.userVote.value
  if (raw && typeof raw === 'object' && 'value' in raw) raw = raw.value
  if (typeof raw === 'number') return raw
  if (typeof raw === 'string') return Number(raw)
  return null
})

watch(() => props.currentScore, (newVal) => {
  console.log('[VoteInputTernary] currentScore changed:', newVal)
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
.vote-input-ternary {
  display: flex;
  gap: 8px;
  align-items: center;

  // Reset primary button style to look like tertiary
  :deep(.button-vue--primary) {
    background: transparent !important;
    border-color: var(--color-border) !important;
    color: var(--color-main-text) !important;
    box-shadow: none !important;

    &:hover {
      background: var(--color-background-hover) !important;
    }
  }

  // Selected state: icon turns yellow + subtle border
  .ternary-selected {
    :deep(.button-vue--primary) {
      border-color: #f1c40f !important;
      background: transparent !important;
    }

    // Target the SVG icon directly
    :deep(svg) {
      color: #f1c40f !important;   // bright yellow
      fill: #f1c40f !important;    // if the icon uses fill
    }

    // Optional: add a small checkmark
    &::after {
      content: '✓';
      font-size: 10px;
      color: #f1c40f;
      margin-left: 4px;
      font-weight: bold;
    }
  }

  // Unselected: grey icon
  :deep(svg) {
    color: var(--color-text-lighter);
    transition: color 0.2s ease;
  }
}
</style>
