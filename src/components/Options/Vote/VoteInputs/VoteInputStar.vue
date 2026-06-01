<template>
  <div class="vote-input-star">
    <div class="stars-container">
      <Star
        v-for="n in maxStars"
        :key="n"
        :size="20"
        :class="{ filled: hoverValue >= n || (currentValue >= n && hoverValue === null) }"
        @click="vote(n)"
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
      @click="vote(null)"
    >
      <X :size="14" />
    </NcButton>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import NcButton from '@nextcloud/vue/components/NcButton'
import { Star, X } from 'lucide-vue-next'
import type { SupportData, SupportValue } from '../../Types/index'

const props = defineProps<{
  engineConfig: Record<string, unknown>
  option: any
  userVote?: SupportData
}>()

const emit = defineEmits<{
  vote: [value: SupportValue]
}>()

const maxStars = computed(() => (props.engineConfig.max as number) || 5)
const hoverValue = ref<number | null>(null)

const currentValue = computed(() => {
  if (!props.userVote) return null
  const raw = props.userVote.value
  if (typeof raw === 'number') return raw
  if (typeof raw === 'string') return Number(raw)
  return null
})

function vote(value: number | null) {
  emit('vote', value)
}
</script>

<style scoped lang="scss">
.vote-input-star {
  display: flex;
  align-items: center;
  gap: 8px;

  .stars-container {
    display: flex;
    gap: 4px;
    cursor: pointer;

    svg {
      transition: all 0.2s ease;
      color: var(--color-text-lighter);

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
