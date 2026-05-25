<!-- vote-inputs/VoteInputTokenWeighted.vue -->
<template>
  <div class="vote-input-weighted">
    <div class="weight-controls">
      <input
        type="range"
        :min="0"
        :max="maxWeight"
        :step="step"
        :value="currentValue ?? 0"
        @input="handleSliderInput"
        @change="handleSliderChange"
        class="weight-slider"
      />
      <span class="weight-value">{{ displayValue }}</span>
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
import NcButton from '@nextcloud/vue/components/NcButton'
import { X } from 'lucide-vue-next'
import type { SupportData, SupportValue } from '../../Types/index'

const props = defineProps<{
  engineConfig: Record<string, unknown>
  option: any
  userVote?: SupportData
}>()

const emit = defineEmits<{
  vote: [value: SupportValue]
}>()

const maxWeight = computed(() => (props.engineConfig.max_weight as number) || 100)
const step = computed(() => (props.engineConfig.step as number) || 1)

const currentValue = computed(() => {
  if (!props.userVote) return null
  const raw = props.userVote.value
  if (typeof raw === 'number') return raw
  return null
})

const displayValue = ref(currentValue.value ?? 0)

function handleSliderInput(event: Event) {
  const target = event.target as HTMLInputElement
  displayValue.value = parseInt(target.value, 10)
}

function handleSliderChange(event: Event) {
  const target = event.target as HTMLInputElement
  const value = parseInt(target.value, 10)
  if (value === 0) {
    vote(null)
  } else {
    vote(value)
  }
}

function vote(value: number | null) {
  emit('vote', value)
}
</script>

<style scoped lang="scss">
.vote-input-weighted {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;

  .weight-controls {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 12px;

    .weight-slider {
      flex: 1;
      height: 6px;
      -webkit-appearance: none;
      background: var(--color-border);
      border-radius: 3px;
      outline: none;

      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: var(--color-primary-element);
        cursor: pointer;
        border: 2px solid white;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
      }
    }

    .weight-value {
      min-width: 40px;
      text-align: center;
      font-size: 13px;
      font-weight: 600;
      color: var(--color-primary-element);
    }
  }
}
</style>
