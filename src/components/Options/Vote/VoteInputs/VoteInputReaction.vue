<!-- vote-inputs/VoteInputReaction.vue -->
<template>
  <div class="vote-input-reaction">
    <div class="reactions-grid">
      <button
        v-for="reaction in allowedReactions"
        :key="reaction"
        class="reaction-button"
        :class="{ active: currentReaction === reaction }"
        @click="toggleReaction(reaction)"
      >
        <span class="reaction-emoji">{{ reaction }}</span>
      </button>
    </div>
    <NcButton
      v-if="currentReaction"
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
import NcButton from '@nextcloud/vue/components/NcButton'
import { X } from 'lucide-vue-next'
import type { SupportData, SupportValue, Option } from '../../Types/index'

const props = defineProps<{
  engineConfig: Record<string, unknown>
  option: Option
  disabled?: boolean
  userVote?: SupportData
}>()

const emit = defineEmits<{
  vote: [value: SupportValue]
}>()

const allowedReactions = computed(() => {
  const reactions = props.engineConfig.allowed_reactions as string[]
  return reactions || ['👍', '❤️', '🎉', '🤔', '👎']
})

const currentReaction = computed(() => {
  if (!props.userVote) return null
  const value = props.userVote.value
  if (typeof value === 'string') return value
  if (Array.isArray(value) && value.length > 0) return value[0]
  return null
})

function toggleReaction(reaction: string) {
  if (currentReaction.value === reaction) {
    emit('vote', null)
  } else {
    emit('vote', reaction)
  }
}

function vote(value: string | null) {
  emit('vote', value)
}
</script>

<style scoped lang="scss">
.vote-input-reaction {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;

  .reactions-grid {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;

    .reaction-button {
      background: var(--color-background-dark);
      border: 2px solid var(--color-border);
      border-radius: 40px;
      padding: 6px 12px;
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: 18px;

      &:hover {
        transform: scale(1.05);
        border-color: var(--color-primary-element);
      }

      &.active {
        background: rgba(var(--color-primary-element-rgb), 0.1);
        border-color: var(--color-primary-element);
        transform: scale(1.05);
      }

      .reaction-emoji {
        font-size: 18px;
      }
    }
  }
}
</style>
