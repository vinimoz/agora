<!--
  SPDX-FileCopyrightText: 2024 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
  <div class="vote-card" :class="{ 'user-voted': hasUserVotedFor(option.id) }">
    <!-- Option Info -->
    <div class="option-info">
      <h3 class="option-title">{{ option.title }}</h3>
      <p v-if="option.text && !compact" class="option-text">{{ option.text }}</p>
      
      <!-- Results display (non-interactive mode) -->
      <div v-if="!canVote || hasUserVoted" class="results-stats">
        <div class="stats-row">
          <span class="vote-count">{{ voteCount }}</span>
          <span class="percentage">{{ percentage }}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: percentage + '%' }" />
        </div>
      </div>
    </div>

    <!-- Vote Input (interactive mode) -->
    <VoteInput
      v-if="showVoteInput"
      :engine-id="effectiveEngineId"
      :engine-config="engineConfig"
      :option="option"
      :disabled="!canVote"
      :is-selected="isSelected"
      :current-rank="currentRank"
      :current-grade="currentGrade"
      :can-remove-vote="false"
      @vote="handleVote"
      @approval-toggle="handleApprovalToggle"
      @change-rank="handleRankChange"
      @change-grade="handleGradeChange"
    />

    <!-- Voted badge -->
    <div v-if="hasUserVotedFor(option.id) && !showVoteInput" class="voted-badge">
      <CheckCircle :size="16" />
      <span>{{ t('agora', 'Voted') }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { t } from '@nextcloud/l10n'
import { CheckCircle } from 'lucide-vue-next'
import VoteInput from './VoteInput.vue'
import type { Option, SupportValue } from '../../Types/index'

const props = defineProps<{
  option: Option
  compact?: boolean
  effectiveEngineId: string
  engineConfig: Record<string, unknown>
  canVote: boolean
  hasUserVoted: boolean
  hasUserVotedFor: (optionId: number) => boolean
  voteCount: number
  percentage: number
  isSelected?: boolean
  currentRank?: number | null
  currentGrade?: string | null
}>()

const emit = defineEmits<{
  vote: [option: Option, value: SupportValue]
  'approval-toggle': [optionId: number]
  'change-rank': [optionId: number, rank: number | null]
  'change-grade': [optionId: number, grade: string | null]
}>()

const showVoteInput = computed(() => 
  props.canVote && !props.hasUserVoted
)

const handleVote = (value: SupportValue) => {
  emit('vote', props.option, value)
}

const handleApprovalToggle = () => {
  emit('approval-toggle', props.option.id)
}

const handleRankChange = (rank: number | null) => {
  emit('change-rank', props.option.id, rank)
}

const handleGradeChange = (grade: string | null) => {
  emit('change-grade', props.option.id, grade)
}
</script>

<style scoped lang="scss">
.vote-card {
  background: var(--color-main-background);
  border: 2px solid var(--color-border);
  border-radius: 16px;
  padding: 20px;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-color: var(--color-primary-element);
  }

  &.user-voted {
    background: linear-gradient(135deg, rgba(66, 184, 131, 0.05) 0%, transparent 100%);
    border-color: #42b883;
  }

  .option-info {
    margin-bottom: 16px;

    .option-title {
      margin: 0 0 8px 0;
      font-size: 18px;
      font-weight: 600;
    }

    .option-text {
      margin: 0;
      font-size: 14px;
      color: var(--color-text-light);
      line-height: 1.5;
    }

    .results-stats {
      margin-top: 12px;

      .stats-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 6px;
        font-size: 14px;

        .vote-count {
          font-weight: 700;
          color: var(--color-primary-element);
        }

        .percentage {
          color: var(--color-text-lighter);
        }
      }

      .progress-bar {
        height: 6px;
        background: var(--color-background-dark);
        border-radius: 3px;
        overflow: hidden;

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--color-primary-element-light), var(--color-primary-element));
          border-radius: 3px;
          transition: width 0.3s ease;
        }
      }
    }
  }

  .voted-badge {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid var(--color-border);
    color: #42b883;
    font-size: 13px;
    font-weight: 500;
  }
}
</style>
