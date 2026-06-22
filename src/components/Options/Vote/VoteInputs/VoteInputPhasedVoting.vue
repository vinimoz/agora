<!--
  SPDX-FileCopyrightText: 2026 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
  <div class="vote-input-phased">
    <div class="round-info">
      <Info :size="14" />
      <span>{{ t('agora', 'Round {current} of {total}', { current: currentRound, total: totalRounds }) }}</span>
    </div>

    <!-- Simple binary/ternary/approval controls depending on config -->
    <div class="round-vote-controls">
      <NcButton
        v-for="choice in voteChoices"
        :key="choice.value"
        :type="currentChoice === choice.value ? 'primary' : 'tertiary'"
        size="small"
        @click="vote(choice.value)"
      >
        <template #icon>
          <component :is="choice.icon" :size="14" />
        </template>
        {{ choice.label }}
      </NcButton>
    </div>

    <NcButton
      v-if="currentChoice !== null"
      type="tertiary"
      size="small"
      @click="vote(null)"
    >
      <X :size="14" />
    </NcButton>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import { Info, X, ThumbsUp, ThumbsDown, Minus } from 'lucide-vue-next'
import type { SupportData, SupportValue } from '../../Types/index'

const props = defineProps<{
  userVote?: SupportData
  currentRound?: number
  totalRounds?: number
}>()

const emit = defineEmits<{
  vote: [value: SupportValue]
}>()

// Default to binary voting within a round
const voteChoices = [
  { value: 1, label: t('agora', 'For'), icon: ThumbsUp },
  { value: 0, label: t('agora', 'Abstain'), icon: Minus },
  { value: -1, label: t('agora', 'Against'), icon: ThumbsDown },
]

const currentChoice = computed(() => {
  if (!props.userVote) return null
  const raw = props.userVote.value
  if (typeof raw === 'number') return raw
  return null
})

function vote(value: number | null) {
  emit('vote', value)
}
</script>

<style scoped lang="scss">
.vote-input-phased {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;

  .round-info {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    color: var(--color-text-lighter);
    background: var(--color-background-dark);
    padding: 4px 8px;
    border-radius: 20px;
  }

  .round-vote-controls {
    display: flex;
    gap: 6px;
    align-items: center;
  }
}
</style>
