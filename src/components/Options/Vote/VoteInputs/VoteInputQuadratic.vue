<!-- SPDX-FileCopyrightText: 2026 Nextcloud contributors -->
<!-- SPDX-License-Identifier: AGPL-3.0-or-later -->
<template>
  <div class="vote-input-quadratic">
    <div class="quadratic-controls">
      <NcButton
        type="tertiary"
        size="small"
        :disabled="currentValue === null || currentValue <= 0"
        @click="decrement"
      >
        <Minus :size="14" />
      </NcButton>
      <span class="vote-count">{{ displayValue }}</span>
      <NcButton
        type="tertiary"
        size="small"
        :disabled="!canIncrement"
        @click="increment"
      >
        <Plus :size="14" />
      </NcButton>
    </div>
    <div v-if="currentValue !== null && currentValue > 0" class="cost-info">
      <NcProgressBar :value="costPercentage" size="small" class="cost-progress" />
      <span class="cost-value">{{ currentCost }}</span>
      <span class="credits-label">{{ t('agora', 'credits') }}</span>
    </div>
    <NcButton
      v-if="currentValue !== null && currentValue > 0"
      type="tertiary"
      size="small"
      @click="clearVotes"
    >
      <X :size="14" />
    </NcButton>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcProgressBar from '@nextcloud/vue/components/NcProgressBar'
import { Plus, Minus, X } from 'lucide-vue-next'
import type {  Option } from '../../Types/index'

const props = defineProps<{
  engineConfig: Record<string, unknown>
  option: Option
  currentVotes?: number | null
}>()

const emit = defineEmits<{
  'update:quadratic': [optionId: number, votes: number | null]
}>()

const maxCredits = computed(() => (props.engineConfig.credits_per_user as number) || 100)
const currentValue = computed(() => props.currentVotes ?? null)
const displayValue = ref(currentValue.value ?? 0)

watch(currentValue, (newValue) => {
  displayValue.value = newValue ?? 0
})

function getCost(votes: number): number {
  return votes * votes
}

const currentCost = computed(() => {
  const val = currentValue.value
  if (val === null || val === 0) return 0
  return getCost(val)
})

const costPercentage = computed(() => (currentCost.value / maxCredits.value) * 100)

const canIncrement = computed(() => {
  const current = currentValue.value || 0
  const nextVotes = current + 1
  return getCost(nextVotes) <= maxCredits.value
})

function increment() {
  const current = currentValue.value || 0
  const newValue = current + 1
  if (getCost(newValue) <= maxCredits.value) {
    emit('update:quadratic', props.option.id, newValue)
  }
}

function decrement() {
  const current = currentValue.value || 0
  const newValue = Math.max(0, current - 1)
  if (newValue === 0) {
    emit('update:quadratic', props.option.id, null)
  } else {
    emit('update:quadratic', props.option.id, newValue)
  }
}

function clearVotes() {
  emit('update:quadratic', props.option.id, null)
}
</script>

<style scoped lang="scss">
.vote-input-quadratic {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;

  .quadratic-controls {
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--color-background-dark);
    border-radius: 40px;
    padding: 4px 8px;

    .vote-count {
      min-width: 40px;
      text-align: center;
      font-size: 16px;
      font-weight: 600;
      color: var(--color-primary-element);
    }
  }

  .cost-info {
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--color-background-dark);
    padding: 4px 12px;
    border-radius: 20px;

    .cost-progress {
      width: 80px;
    }

    .cost-value {
      font-weight: 600;
      color: var(--color-warning);
    }

    .credits-label {
      font-size: 11px;
      color: var(--color-text-lighter);
    }
  }
}
</style>
