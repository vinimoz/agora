<template>
  <div class="vote-input-quadratic">
    <div class="quadratic-controls">
      <NcButton
        type="tertiary"
        size="small"
        :disabled="currentValue <= 0"
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
    <div class="cost-info" v-if="currentValue">
      <span class="cost-label">{{ t('agora', 'Cost') }}:</span>
      <span class="cost-value">{{ getCost(currentValue) }}</span>
      <span class="credits-label">{{ t('agora', 'credits') }}</span>
    </div>
    <NcButton
      v-if="currentValue !== null && currentValue > 0"
      type="tertiary"
      size="small"
      @click="vote(null)"
    >
      <X :size="14" />
    </NcButton>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import { Plus, Minus, X } from 'lucide-vue-next'
import type { SupportData, SupportValue } from '../../Types/index'

const props = defineProps<{
  engineConfig: Record<string, unknown>
  option: any
  userVote?: SupportData
}>()

const emit = defineEmits<{
  vote: [value: SupportValue]
}>()

const maxCredits = computed(() => (props.engineConfig.credits_per_user as number) || 100)
const currentValue = ref<number | null>(() => {
  if (!props.userVote) return null
  const raw = props.userVote.value
  if (typeof raw === 'number') return raw
  return null
})

const displayValue = computed(() => currentValue.value ?? 0)

function getCost(votes: number): number {
  // Quadratic cost: cost = votes^2
  return votes * votes
}

const canIncrement = computed(() => {
  const nextVotes = (currentValue.value || 0) + 1
  return getCost(nextVotes) <= maxCredits.value
})

function increment() {
  const newValue = (currentValue.value || 0) + 1
  if (getCost(newValue) <= maxCredits.value) {
    currentValue.value = newValue
    emit('vote', newValue)
  }
}

function decrement() {
  const newValue = Math.max(0, (currentValue.value || 0) - 1)
  if (newValue === 0) {
    currentValue.value = null
    emit('vote', null)
  } else {
    currentValue.value = newValue
    emit('vote', newValue)
  }
}

function vote(value: number | null) {
  currentValue.value = value
  emit('vote', value)
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
    border-radius: 8px;
    padding: 4px;

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
    align-items: baseline;
    gap: 4px;
    font-size: 11px;

    .cost-label {
      color: var(--color-text-lighter);
    }

    .cost-value {
      font-weight: 600;
      color: var(--color-warning);
    }

    .credits-label {
      color: var(--color-text-lighter);
    }
  }
}
</style>
