<!-- SPDX-FileCopyrightText: 2026 Nextcloud contributors -->
<!-- SPDX-License-Identifier: AGPL-3.0-or-later -->
<template>
  <div class="vote-input-reaction">
    <div class="reactions-grid">
      <button
        v-for="reaction in allowedReactions"
        :key="reaction"
        class="reaction-button"
        :class="{ active: currentReactions.includes(reaction) }"
        :disabled="disabled"
        @click="toggleReaction(reaction)"
      >
        <span class="reaction-emoji">{{ reaction }}</span>
      </button>
    </div>
    <NcButton
      v-if="currentReactions.length > 0"
      type="tertiary"
      size="small"
      :disabled="disabled"
      @click="clearAllReactions"
    >
      <X :size="14" />
      {{ t('agora', 'Remove all reactions') }}
    </NcButton>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import { X } from 'lucide-vue-next'
import type { Option, SupportData } from '../../Types/index'

const props = defineProps<{
  engineConfig: Record<string, unknown>
  option: Option
  disabled?: boolean
  userVote?: SupportData
}>()

const emit = defineEmits<{
  'update:reactions': [optionId: number, reactions: string[]]
}>()

const allowedReactions = computed(() => {
  const reactions = props.engineConfig.allowed_reactions as string[]
  return reactions || ['👍', '❤️', '🎉', '🤔', '👎']
})

// Current user's reactions (array of strings)
const currentReactions = computed(() => {
  const value = props.userVote?.value
  if (Array.isArray(value)) return value
  if (typeof value === 'string') return [value]
  return []
})

function toggleReaction(reaction: string) {
  let newReactions: string[]
  if (currentReactions.value.includes(reaction)) {
    newReactions = currentReactions.value.filter(r => r !== reaction)
  } else {
    newReactions = [...currentReactions.value, reaction]
  }
  emit('update:reactions', props.option.id, newReactions)
}

function clearAllReactions() {
  emit('update:reactions', props.option.id, [])
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
      font-size: 20px;
      line-height: 1;

      &:hover {
        transform: scale(1.05);
        border-color: var(--color-primary-element);
        background: rgba(var(--color-primary-element-rgb), 0.05);
      }

      &.active {
        background: rgba(var(--color-primary-element-rgb), 0.15);
        border-color: var(--color-primary-element);
        transform: scale(1.05);
        box-shadow: 0 2px 8px rgba(var(--color-primary-element-rgb), 0.2);
      }
    }
  }
}
</style>
