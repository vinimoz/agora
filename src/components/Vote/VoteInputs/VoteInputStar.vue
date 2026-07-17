<!-- SPDX-FileCopyrightText: 2026 Nextcloud contributors -->
<!-- SPDX-License-Identifier: AGPL-3.0-or-later -->
<template>
  <div class="vote-input-star">
    <div class="stars-container">
      <Star
        v-for="n in maxStars"
        :key="n"
        :size="24"
        :class="{ filled: hoverValue >= n || (currentValue >= n && hoverValue === null) }"
        @click="setStar(n)"
        @mouseenter="hoverValue = n"
        @mouseleave="hoverValue = null"
      />
    </div>
    <span v-if="currentValue" class="current-rating">
      {{ currentValue }} / {{ maxStars }}
    </span>
    <NcButton
      v-if="currentValue"
      type="tertiary"
      size="small"
      @click="clearStar"
    >
      <X :size="14" />
    </NcButton>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import NcButton from '@nextcloud/vue/components/NcButton'
import { Star, X } from 'lucide-vue-next'
import type { Option, Inquiry } from '../../Types/index'

const props = defineProps<{
  engineConfig: Record<string, unknown>
  item: Option | Inquiry
  currentStar?: number | null
}>()

const emit = defineEmits<{
  'update:star': [itemId: number, star: number | null]
}>()

const maxStars = computed(() => (props.engineConfig.max as number) || 5)
const hoverValue = ref<number | null>(null)
const currentValue = computed(() => props.currentStar ?? null)

function setStar(value: number) {
  if (currentValue.value === value) {
    emit('update:star', props.item.id, null)
  } else {
    emit('update:star', props.item.id, value)
  }
}

function clearStar() {
  emit('update:star', props.item.id, null)
}
</script>

<style scoped lang="scss">
.vote-input-star {
  display: flex;
  align-items: center;
  gap: 12px;

  .stars-container {
    display: flex;
    gap: 6px;
    cursor: pointer;

    svg {
      transition: all 0.2s ease;
      color: var(--color-text-lighter);
      stroke-width: 1.5;

      &.filled {
        color: #fbbf24;
        fill: #fbbf24;
      }

      &:hover {
        transform: scale(1.1);
      }
    }
  }

  .current-rating {
    font-size: 12px;
    font-weight: 600;
    color: var(--color-primary-element);
  }
}
</style>
