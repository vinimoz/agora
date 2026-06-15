<!-- SPDX-FileCopyrightText: 2024 Nextcloud contributors -->
<!-- SPDX-License-Identifier: AGPL-3.0-or-later -->
<template>
  <div class="cards-layout">
    <div class="cards-grid">
      <VoteCard
        v-for="option in rankedOptions"
        :key="option.id"
        :option="option"
        :effective-engine-id="effectiveEngineId"
        :engine-config="activeEngine?.config || {}"
        :can-vote="canVote"
        :has-user-voted="hasUserVoted"
        :has-user-voted-for="hasUserVotedFor"
        :vote-count="getOptionVoteCount(option.id)"
        :percentage="getPercentage(option)"
        :is-selected="isSelectedForVote(option.id)"
        :current-rank="rankings[option.id]"
        :current-grade="grades[option.id]"
        :current-score="scores[option.id]"
        :current-star="scores[option.id]"
        :current-reaction="reactions[option.id]"
        :current-quadratic-votes="quadraticVotes[option.id]"
        :current-token-weight="tokenWeights[option.id]"
        :total-options="rankedOptions.length"
        :get-user-vote-value-for-option="getUserVoteValueForOption"
        @vote="(option, value) => $emit('vote', option, value)"
        @approval-toggle="(optionId) => $emit('toggle-selection', optionId)"
        @change-rank="(optionId, rank) => $emit('update:rankings', { ...rankings, [optionId]: rank })"
        @change-grade="(optionId, grade) => $emit('update:grades', { ...grades, [optionId]: grade })"
        @update:score="(optionId, score) => $emit('update:scores', { ...scores, [optionId]: score })"
        @update:star="(optionId, star) => $emit('update:scores', { ...scores, [optionId]: star })"
        @update:reaction="(optionId, reaction) => $emit('update:reactions', { ...reactions, [optionId]: reaction })"
        @update:quadratic="(optionId, votes) => $emit('update:quadraticVotes', { ...quadraticVotes, [optionId]: votes })"
        @update:token_weight="(optionId, weight) => $emit('update:tokenWeights', { ...tokenWeights, [optionId]: weight })"
        @open-supports-modal="(optionId) => $emit('open-supports-modal', optionId)"
      />
    </div>

    <!-- Empty state -->
    <div v-if="rankedOptions.length === 0" class="empty-state">
      <component :is="InquiryOptionIcons.Inbox" :size="48" />
      <p>{{ t('agora', 'No options available') }}</p>
    </div>

    <!-- Submit section -->
    <div v-if="showSubmitButton" class="submit-vote-section">
      <div class="submit-container">
        <NcButton
          type="primary"
          size="large"
          :disabled="!canSubmitMultiVote"
          @click="$emit('submit-multi-vote')"
        >
          <template #icon>
            <Vote :size="18" />
          </template>
          {{ getSubmitButtonText() }}
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
import { Vote } from 'lucide-vue-next'
import VoteCard from './VoteCard.vue'
import { InquiryOptionIcons } from '../../../utils/icons.ts'
import type { Option, SupportEngine } from '../../../Types/index'
import type { SupportValue } from '../../../Types/votingType'

const props = defineProps<{
  rankedOptions: Option[]
  effectiveEngineId: string
  activeEngine?: SupportEngine
  canVote?: boolean
  hasUserVoted: boolean
  rankings: Record<number, number>
  scores: Record<number, number>
  grades: Record<number, string | null>
  reactions: Record<number, string[] | null>
  quadraticVotes: Record<number, number>
  tokenWeights: Record<number, number>
  canSubmitMultiVote: boolean
  voteSelectionInfo: string | null
  getOptionVoteCount: (optionId: number) => number
  getPercentage: (option: Option) => number
  hasUserVotedFor: (optionId: number) => boolean
  isSelectedForVote: (optionId: number) => boolean
  getUserVoteValueForOption: (optionId: number) => SupportValue | null
}>()

const emit = defineEmits<{
  'toggle-selection': [optionId: number]
  'update:rankings': [rankings: Record<number, number>]
  'update:scores': [scores: Record<number, number>]
  'update:grades': [grades: Record<number, string | null>]
  'update:reactions': [reactions: Record<number, string[] | null>]
  'update:quadraticVotes': [votes: Record<number, number>]
  'update:tokenWeights': [weights: Record<number, number>]
  'vote': [option: Option, value: unknown]
  'open-supports-modal': [optionId: number]
  'submit-multi-vote': []
}>()

const showSubmitButton = computed(() =>
  props.canVote &&
  props.activeEngine?.status === 'active' &&
  props.effectiveEngineId !== 'trending' &&
  props.rankedOptions.length > 0
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
