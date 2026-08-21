<!-- SPDX-FileCopyrightText: 2024 Nextcloud contributors -->
<!-- SPDX-License-Identifier: AGPL-3.0-or-later -->
<template>
  <div class="cards-layout">
    <div class="cards-grid">
      <VoteCard
        v-for="item in rankedItems"
        :key="item.id"
        :item="item"
        :effective-engine-id="effectiveEngineId"
        :engine-config="activeEngine?.config || {}"
        :can-vote="canVote"
        :has-user-voted="hasUserVoted"
        :has-user-voted-for="hasUserVotedFor"
        :vote-count="getItemVoteCount(item.id)"
        :percentage="getPercentage(item)"
        :is-selected="isSelectedForVote(item.id)"
        :current-rank="rankings[item.id]"
        :current-grade="grades[item.id]"
        :current-score="scores[item.id]"
        :current-star="scores[item.id]"
        :current-reaction="reactions[item.id]"
        :current-quadratic-votes="quadraticVotes[item.id]"
        :current-token-weight="tokenWeights[item.id]"
        :total-items="rankedItems.length"
        :get-user-vote-value-for-item="getUserVoteValueForItem"
        @vote="(item, value) => $emit('vote', item, value)"
        @approval-toggle="(itemId) => $emit('toggleSelection', itemId)"
        @change-rank="(itemId, rank) => $emit('update:rankings', { ...rankings, [itemId]: rank })"
        @change-grade="(itemId, grade) => $emit('update:grades', { ...grades, [itemId]: grade })"
        @update:score="(itemId, score) => $emit('update:scores', { ...scores, [itemId]: score })"
        @update:star="(itemId, star) => $emit('update:scores', { ...scores, [itemId]: star })"
        @update:reaction="(itemId, reaction) => $emit('update:reactions', { ...reactions, [itemId]: reaction })"
        @update:quadratic="(itemId, votes) => $emit('update:quadraticVotes', { ...quadraticVotes, [itemId]: votes })"
        @update:token_weight="(itemId, weight) => $emit('update:tokenWeights', { ...tokenWeights, [itemId]: weight })"
        @open-supports-modal="(itemId) => $emit('openSupportsModal', itemId)"
      />
    </div>

    <!-- Empty state -->
    <div v-if="rankedItems.length === 0" class="empty-state">
      <component :is="InquiryOptionIcons.Inbox" :size="48" />
      <p>{{ t('agora', 'No items available') }}</p>
    </div>

    <!-- Submit section -->
    <div v-if="showSubmitButton" class="submit-vote-section">
      <div class="submit-container">
        <NcButton
          type="primary"
          size="large"
          :disabled="!canSubmitMultiVote || (hasUserVoted && !hasSelectionsChanged)"
          @click="$emit('submitMultiVote')"
        >
          <template #icon>
            <Vote :size="18" />
          </template>
          {{ getSubmitButtonText() }}
        </NcButton>
        
        <!-- Global remove button -->
        <NcButton
          v-if="hasUserVoted"
          type="tertiary"
          size="large"
          @click="$emit('removeMyVote')"
        >
          <template #icon><X :size="18" /></template>
          {{ t('agora', 'Remove my vote') }}
        </NcButton>

        <div v-if="voteSelectionInfo" class="selection-info">
          <component :is="InquiryOptionIcons.Info" :size="14" />
          <span>{{ voteSelectionInfo }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import { Vote, X } from 'lucide-vue-next'
import VoteCard from '../Vote/VoteCard.vue'
import { InquiryOptionIcons } from '../../utils/icons.ts'
import type { Option, Inquiry, SupportEngine, SupportValue } from '../../Types/index'

const props = defineProps<{
  rankedItems: (Option | Inquiry)[]
  effectiveEngineId: string
  activeEngine?: SupportEngine
  canVote?: boolean
  hasUserVoted: boolean
  hasSelectionsChanged: boolean
  rankings: Record<number, number>
  scores: Record<number, number>
  grades: Record<number, string | null>
  reactions: Record<number, string[] | null>
  quadraticVotes: Record<number, number>
  tokenWeights: Record<number, number>
  canSubmitMultiVote: boolean
  voteSelectionInfo: string | null
  getItemVoteCount: (itemId: number) => number
  getPercentage: (item: Option | Inquiry) => number
  hasUserVotedFor: (itemId: number) => boolean
  isSelectedForVote: (itemId: number) => boolean
  getUserVoteValueForItem: (itemId: number) => SupportValue | null
}>()

const emit = defineEmits<{
  'toggleSelection': [itemId: number]
  'update:rankings': [rankings: Record<number, number>]
  'update:scores': [scores: Record<number, number>]
  'update:grades': [grades: Record<number, string | null>]
  'update:reactions': [reactions: Record<number, string[] | null>]
  'update:quadraticVotes': [votes: Record<number, number>]
  'update:tokenWeights': [weights: Record<number, number>]
  'vote': [item: Option | Inquiry, value: unknown]
  'removeMyVote': []
  'openSupportsModal': [itemId: number]
  'submitMultiVote': []
}>()

const showSubmitButton = computed(() =>
  props.canVote &&
  props.activeEngine?.status === 'active' &&
  props.effectiveEngineId !== 'trending' &&
  props.rankedItems.length > 0
)

const getSubmitButtonText = (): string => {
  const texts: Record<string, string> = {
    approval: t('agora', 'Submit selections'),
    ranking: t('agora', 'Submit ranking'),
    score: t('agora', 'Submit scores'),
    star: t('agora', 'Submit ratings'),
    condorcet: t('agora', 'Submit ranking'),
    borda: t('agora', 'Submit ranking')
  }
  return texts[props.effectiveEngineId] || t('agora', 'Submit vote')
}
</script>

<style scoped lang="scss">
.cards-layout {
  .cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
    gap: 20px;
    margin-bottom: 24px;
  }

  .empty-state {
    text-align: center;
    padding: 60px 20px;
    background: var(--color-background-dark);
    border-radius: 20px;
    margin: 20px 0;

    svg {
      color: var(--color-text-lighter);
      margin-bottom: 16px;
      opacity: 0.5;
    }

    p {
      color: var(--color-text-lighter);
      font-size: 14px;
      margin: 0;
    }
  }

  .submit-vote-section {
    position: sticky;
    bottom: 20px;
    z-index: 10;

    .submit-container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      padding: 16px 24px;
      background: var(--color-main-background);
      border: 1px solid var(--color-border);
      border-radius: 60px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
      backdrop-filter: blur(10px);
      max-width: fit-content;
      margin: 0 auto;

      .selection-info {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 12px;
        color: var(--color-text-lighter);
        background: var(--color-background-dark);
        padding: 6px 12px;
        border-radius: 30px;

        svg {
          width: 14px;
          height: 14px;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .cards-layout {
    .cards-grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }

    .submit-vote-section .submit-container {
      flex-direction: column;
      border-radius: 20px;
      padding: 16px;
      width: calc(100% - 32px);
      margin: 0 16px;

      .selection-info {
        width: fit-content;
      }
    }
  }
}
</style>
