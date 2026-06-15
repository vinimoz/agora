<!-- SPDX-FileCopyrightText: 2026 Nextcloud contributors -->
<!-- SPDX-License-Identifier: AGPL-3.0-or-later -->
<template>
  <div class="vote-input-weighted">
    <div class="weight-controls">
      <input
        type="range"
        :min="0"
        :max="maxWeight"
        :step="step"
        :value="currentValue ?? 0"
        class="weight-slider"
        :style="{ '--progress': getProgress(currentValue ?? 0) + '%' }"
        @input="handleSliderInput"
        @change="handleSliderChange"
      />
      <span class="weight-value">{{ displayValue }}</span>
    </div>
    <NcButton
      v-if="currentValue !== null && currentValue > 0"
      type="tertiary"
      size="small"
      @click="clearWeight"
    >
      <X :size="14" />
    </NcButton>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import NcButton from '@nextcloud/vue/components/NcButton'
import { X } from 'lucide-vue-next'
import type {  Option } from '../../Types/index'

const props = defineProps<{
  engineConfig: Record<string, unknown>
  option: Option
  currentWeight?: number | null
}>()

const emit = defineEmits<{
  'update:token_weight': [optionId: number, weight: number | null]
}>()

const maxWeight = computed(() => (props.engineConfig.max_weight as number) || 100)
const step = computed(() => (props.engineConfig.step as number) || 1)
const currentValue = computed(() => props.currentWeight ?? null)
const displayValue = ref(currentValue.value ?? 0)

watch(currentValue, (newValue) => {
  displayValue.value = newValue ?? 0
})

function getProgress(value: number): number {
  return (value / maxWeight.value) * 100
}

function handleSliderInput(event: Event) {
  const target = event.target as HTMLInputElement
  displayValue.value = parseInt(target.value, 10)
}

function handleSliderChange(event: Event) {
  const target = event.target as HTMLInputElement
  const value = parseInt(target.value, 10)
  if (value === 0) {
    emit('update:token_weight', props.option.id, null)
  } else {
    emit('update:token_weight', props.option.id, value)
  }
}

function clearWeight() {
  emit('update:token_weight', props.option.id, null)
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
      background: linear-gradient(
        to right,
        var(--color-primary-element) 0%,
        var(--color-primary-element) var(--progress, 0%),
        var(--color-border) var(--progress, 0%),
        var(--color-border) 100%
      );
      border-radius: 3px;
      outline: none;

      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: var(--color-primary-element);
        cursor: pointer;
        border: 2px solid white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        transition: transform 0.1s;
        &:hover { transform: scale(1.2); }
      }
    }

    .weight-value {
      min-width: 40px;
      text-align: center;
      font-size: 14px;
      font-weight: 600;
      color: var(--color-primary-element);
    }
  }
}
</style>
