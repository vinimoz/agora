<!--
  SPDX-FileCopyrightText: 2026 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
  <div class="vote-input-ranking">
    <select v-model="localRank" class="rank-select" @change="handleChange">
      <option :value="null">{{ t('agora', 'Not ranked') }}</option>
      <option v-for="i in maxRank" :key="i" :value="i">
        {{ t('agora', 'Rank {n}', { n: i }) }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { t } from '@nextcloud/l10n'
import type { Option, Inquiry } from '../../Types/index'

const props = defineProps<{
  engineConfig: Record<string, unknown>
  item: Option | Inquiry
  rank?: number | null
  totalItems?: number
}>()

const maxRank = computed(() => {
  const max = props.engineConfig.max_rank as number
  if (max === null || max === undefined) {
    return props.totalItems || 10
  }
  return max
})

const emit = defineEmits<{
  'changeRank': [rank: number | null]
}>()

const localRank = computed({
  get: () => props.rank ?? null,
  set: (value) => {
    emit('changeRank', value)
  }
})

function handleChange(event: Event) {
  const target = event.target as HTMLSelectElement
  const value = target.value === 'null' ? null : parseInt(target.value, 10)
  emit('changeRank', value)
}
</script>

<style scoped lang="scss">
.vote-input-ranking {
  .rank-select {
    padding: 4px 8px;
    border: 1px solid var(--color-border);
    border-radius: 6px;
    background: var(--color-main-background);
    font-size: 12px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      border-color: var(--color-primary-element);
    }

    &:focus {
      outline: none;
      border-color: var(--color-primary-element);
      box-shadow: 0 0 0 2px rgba(var(--color-primary-element-rgb), 0.1);
    }
  }
}
</style>
