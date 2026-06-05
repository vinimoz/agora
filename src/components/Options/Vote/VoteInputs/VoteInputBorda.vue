<!--
  SPDX-FileCopyrightText: 2026 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
  <div class="vote-input-borda">
    <select
      :value="currentRank"
      class="rank-select"
      :disabled="disabled"
      @change="handleChange"
    >
      <option :value="null">{{ t('agora', 'Not ranked') }}</option>
      <option
        v-for="i in maxRank"
        :key="i"
        :value="i"
      >
        {{ t('agora', 'Rank {n}', { n: i }) }}
      </option>
    </select>
    <NcButton
      v-if="currentRank !== null"
      type="tertiary"
      size="small"
      @click="clearRank"
    >
      <X :size="14" />
    </NcButton>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import { X } from 'lucide-vue-next'
import type { SupportData, Option } from '../../Types/index'

const props = defineProps<{
  engineConfig: Record<string, unknown>
  option: Option
  disabled?: boolean
  userVote?: SupportData
  rank?: number | null
  totalOptions?: number
}>()

const emit = defineEmits<{
  'change-rank': [rank: number | null]
}>()


const maxRank = computed(() => {
  const max = props.engineConfig.max_rank
  if (max === null || max === undefined) {
    return props.totalOptions ?? 10
  }
  return max as number
})

const currentRank = computed(() => props.rank ?? null)

function handleChange(event: Event) {
  const target = event.target as HTMLSelectElement
  const value = target.value === 'null' ? null : parseInt(target.value, 10)
  emit('change-rank', value)
}

function clearRank() {
  emit('change-rank', null)
}
</script>

<style scoped lang="scss">
.vote-input-borda {
  display: flex;
  align-items: center;
  gap: 8px;

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
