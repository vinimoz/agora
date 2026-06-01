<!-- vote-inputs/VoteInputScore.vue -->
<template>
  <div class="vote-input-score">
    <div class="slider-container">
      <input
        type="range"
        :min="minValue"
        :max="maxValue"
        :step="step"
        :value="currentValue ?? defaultValue"
        @input="handleSliderInput"
        @change="handleSliderChange"
        class="score-slider"
        :style="{ '--progress': getProgress(currentValue ?? defaultValue) + '%' }"
      />
      <span class="score-value">{{ displayValue }}</span>
    </div>
    <NcButton
      v-if="currentValue !== null"
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

const minValue = computed(() => (props.engineConfig.min as number) || 0)
const maxValue = computed(() => (props.engineConfig.max as number) || 10)
const step = computed(() => (props.engineConfig.step as number) || 1)
const defaultValue = computed(() => Math.floor((minValue.value + maxValue.value) / 2))

const currentValue = computed(() => {
  if (!props.userVote) return null
  const raw = props.userVote.value
  if (typeof raw === 'number') return raw
  if (typeof raw === 'string') return Number(raw)
  return null
})

const displayValue = ref(currentValue.value ?? defaultValue.value)

function handleSliderInput(event: Event) {
  const target = event.target as HTMLInputElement
  displayValue.value = parseInt(target.value, 10)
}

function handleSliderChange(event: Event) {
  const target = event.target as HTMLInputElement
  const value = parseInt(target.value, 10)
  if (currentValue.value === value) {
    vote(null)
  } else {
    vote(value)
  }
}

function getProgress(value: number): number {
  return ((value - minValue.value) / (maxValue.value - minValue.value)) * 100
}

function vote(value: number | null) {
  emit('vote', value)
}
</script>

<style scoped lang="scss">
.vote-input-score {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;

  .slider-container {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 12px;

    .score-slider {
      flex: 1;
      height: 6px;
      -webkit-appearance: none;
      background: linear-gradient(
        to right,
        var(--color-primary-element) 0%,
        var(--color-primary-element) var(--progress, 50%),
        var(--color-border) var(--progress, 50%),
        var(--color-border) 100%
      );
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

        &:hover {
          transform: scale(1.2);
        }
      }
    }

    .score-value {
      min-width: 30px;
      text-align: center;
      font-size: 13px;
      font-weight: 600;
      color: var(--color-primary-element);
    }
  }
}
</style>
