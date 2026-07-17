<!--
  SPDX-FileCopyrightText: 2026 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
  <div 
    class="vote-card" 
    :class="{ 
      'user-voted': hasUserVotedFor(option.id),
      'has-support': hasSupportFeature,
      'has-comments': allowComment
    }"
    @click="handleCardClick"
  >
    <!-- Header with icon, type label, and creation date -->
    <div class="card-header">
      <div class="header-left">
        <div class="type-icon" :style="{ color: optionTypeColor }">
          <component :is="optionIcon" :size="20" />
        </div>
        
        <div class="header-meta">
          <span class="option-type-label">{{ optionTypeLabel }}</span>
          <span class="timestamp">{{ formatDate(option.status.created) }}</span>
        </div>
      </div>
    </div>

    <!-- Option content -->
    <div class="option-info">
      <h3 class="option-title">{{ option.title }}</h3>
      <p v-if="option.text && !compact" class="option-text">{{ option.text }}</p>
      
      <!-- Support and comments stats (when not voting mode) -->
      <div v-if="!canVote || hasUserVoted" class="stats-container">
        <div class="support-stats" @click.stop="openSupportsModal">
          <component :is="InquiryOptionIcons.Support" :size="14" class="stat-icon" />
          <span class="vote-count">{{ voteCount }}</span>
          <span class="percentage">{{ percentage }}%</span>
        </div>
        
        <div v-if="allowComment && option.status.countComments" class="comments-stats">
          <component :is="InquiryOptionIcons.Comment" :size="14" class="stat-icon" />
          <span>{{ option.status.countComments }}</span>
        </div>
      </div>

      <!-- Progress bar for voting mode -->
      <div v-if="!canVote || hasUserVoted" class="progress-bar-container">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: percentage + '%' }" />
        </div>
      </div>
    </div>

    <!-- Vote input section -->
    <VoteInput
      v-if="showVoteInput"
      :engine-id="effectiveEngineId"
      :engine-config="engineConfig"
      :option="option"
      :disabled="!canVote"
      :is-selected="isSelected"
      :current-rank="currentRank"
      :current-grade="currentGrade"
      :current-score="currentScore"
      :user-vote="userVoteForOption"
      :current-star="currentStar"
      :current-reaction="currentReaction"
      :current-quadratic-votes="currentQuadraticVotes"
      :current-token-weight="currentTokenWeight"
      :total-options="totalOptions"
      :is-multi-engine="isMultiEngine"
      :can-remove-vote="canRemoveVote"
      @vote="handleVote"
      @update:score="handleUpdateScore"
      @update:star="handleUpdateStar"
      @update:reaction="handleUpdateReaction"
      @update:quadratic="handleUpdateQuadratic"
      @update:token_weight="handleUpdateTokenWeight"
      @approval-toggle="handleApprovalToggle"
      @remove-vote="handleRemoveVote"
      @change-rank="handleRankChange"
      @change-grade="handleGradeChange"
    />

    <!-- Footer with owner info -->
    <div v-if="!compact" class="card-footer">
      <div class="owner-info">
        <NcAvatar
          v-if="option.owner?.id"
          :user="option.owner.id"
          :display-name="option.owner.displayName"
          :size="20"
        />
        <span class="owner-name">{{ option.owner?.displayName || t('agora', 'Unknown owner') }}</span>
      </div>
    </div>

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
import NcAvatar from '@nextcloud/vue/components/NcAvatar'
import VoteInput from './VoteInput.vue'
import { useSessionStore } from '../../../stores/session'
import { InquiryOptionIcons } from '../../../utils/icons.ts'
import {
  getOptionTypeLabel,
  getOptionTypeIconComponent,
  getOptionTypeColor,
  hasSupportFeature as hasSupportFeatureHelper,
  allowsComments
} from '../../../helpers/modules/InquiryOptionHelper'

import type { Option, SupportValue } from '../../../Types/index'

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
  currentScore?: number | null
  currentStar?: number | null
  currentReaction?: string[] | null
  currentQuadraticVotes?: number | null
  currentTokenWeight?: number | null
  getUserVoteValueForOption: (optionId: number) => SupportValue | null
  totalOptions?: number
}>()

const emit = defineEmits<{
  vote: [option: Option, value: SupportValue]
  'approvalToggle': [optionId: number]
  'changeRank': [optionId: number, rank: number | null]
  'changeGrade': [optionId: number, grade: string | null]
  'update:score': [optionId: number, score: number | null]
  'update:star': [optionId: number, star: number | null]
  'update:reaction': [optionId: number, reaction: string[] | null]
  'update:quadratic': [optionId: number, votes: number | null]
  'update:token_weight': [optionId: number, weight: number | null]
  'openSupportsModal': [optionId: number]
}>()

const sessionStore = useSessionStore()
const allOptionTypes = computed(() => sessionStore.appSettings?.inquiryOptionTypeTab || [])

const optionTypeLabel = computed(() => {
  if (!props.option?.type || !allOptionTypes.value) {
    return t('agora', 'Option')
  }
  return getOptionTypeLabel(props.option.type, allOptionTypes.value, t('agora', 'Option'))
})

const isMultiEngine = computed(() => {
  const multiTypes = [
    'reaction', 'approval', 'approval_delib',
    'ranking', 'condorcet', 'borda',
    'quadratic', 'token_weighted', 'phased_voting'
  ]
  return multiTypes.includes(props.effectiveEngineId)
})

const canRemoveVote = computed(() => {
  const value = props.getUserVoteValueForOption?.(props.option.id)
  return value !== null && value !== undefined
})

function handleRemoveVote() {
  const engine = props.effectiveEngineId
  // Clear the value for this option
  if (['binary', 'ternary', 'score', 'star'].includes(engine)) {
    emit('update:score', props.option.id, null)
  } else if (engine === 'majority_judgment') {
    emit('changeGrade', props.option.id, null)
  }
}

const optionIcon = computed(() => {
  if (!props.option?.type || !allOptionTypes.value) {
    return InquiryOptionIcons.Default
  }
  return getOptionTypeIconComponent(props.option.type, allOptionTypes.value)
})

const optionTypeColor = computed(() => {
  if (!props.option?.type || !allOptionTypes.value) {
    return 'var(--color-text-light)'
  }
  return getOptionTypeColor(props.option.type, allOptionTypes.value)
})

const allowComment = computed(() => 
  allowsComments(props.option.type, allOptionTypes.value)
)

const hasSupportFeature = computed(() => 
  hasSupportFeatureHelper(props.option.type, allOptionTypes.value)
)

const formatDate = (timestamp: number) => {
  if (!timestamp) return ''
  const date = new Date(timestamp * 1000)
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

const userVoteForOption = computed(() => {
  const value = props.getUserVoteValueForOption?.(props.option.id)
  if (!value) return undefined
  return { value, optionId: props.option.id } as SupportData
})

function openSupportsModal() {
  emit('openSupportsModal', props.option.id)
}

const showVoteInput = computed(() => props.canVote)


function handleVote(value: SupportValue) { emit('vote', props.option, value) }
function handleApprovalToggle() { emit('approvalToggle', props.option.id) }
function handleRankChange(rank: number | null) { emit('changeRank', props.option.id, rank) }
function handleGradeChange(grade: string | null) { emit('changeGrade', props.option.id, grade) }
function handleUpdateScore(optionId: number, score: number | null) { emit('update:score', optionId, score) }
function handleUpdateStar(optionId: number, star: number | null) { emit('update:star', optionId, star) }
function handleUpdateReaction(optionId: number, reaction: string[] | null) { emit('update:reaction', optionId, reaction) }
function handleUpdateQuadratic(optionId: number, votes: number | null) { emit('update:quadratic', optionId, votes) }
function handleUpdateTokenWeight(optionId: number, weight: number | null) { emit('update:token_weight', optionId, weight) }



function handleCardClick(event: MouseEvent) {
  const target = event.target as HTMLElement
  if (target.closest('.vote-input-container') || target.closest('.voted-badge') || target.closest('.support-stats')) {
    return
  }
  emit('openSupportsModal', props.option.id)
}
</script>

<style scoped lang="scss">
.vote-card {
  background: var(--color-main-background);
  border: 2px solid var(--color-border);
  border-radius: 16px;
  padding: 16px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-color: var(--color-primary-element);
  }

  &.user-voted {
    background: linear-gradient(135deg, rgba(66, 184, 131, 0.05) 0%, transparent 100%);
    border-color: #42b883;
  }

  // Card Header
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    min-height: 32px;

    .header-left {
      display: flex;
      align-items: center;
      gap: 10px;
      flex: 1;
      min-width: 0;

      .type-icon {
        flex-shrink: 0;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--color-background-darker);
        border-radius: 8px;
        transition: all 0.2s ease;

        svg {
          transition: transform 0.2s ease;
        }
      }

      .header-meta {
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 0;

        .option-type-label {
          font-size: 12px;
          font-weight: 600;
          color: var(--color-text-light);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .timestamp {
          font-size: 10px;
          color: var(--color-text-lighter);
        }
      }
    }
  }

  // Option Info
  .option-info {
    margin-bottom: 12px;

    .option-title {
      margin: 0 0 8px 0;
      font-size: 18px;
      font-weight: 600;
      color: var(--color-main-text);
      line-height: 1.4;
      word-break: break-word;
    }

    .option-text {
      margin: 0 0 12px 0;
      font-size: 13px;
      color: var(--color-text-light);
      line-height: 1.5;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .stats-container {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 8px;

      .support-stats {
        display: flex;
        align-items: center;
        gap: 6px;
        cursor: pointer;
        padding: 4px 8px;
        border-radius: 20px;
        background: var(--color-background-dark);
        transition: all 0.2s ease;

        &:hover {
          background: var(--color-background-darker);
          transform: scale(1.02);
        }

        .stat-icon {
          color: var(--color-primary-element);
        }

        .vote-count {
          font-weight: 700;
          color: var(--color-primary-element);
          font-size: 14px;
        }

        .percentage {
          color: var(--color-text-lighter);
          font-size: 12px;
        }
      }

      .comments-stats {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 8px;
        border-radius: 20px;
        background: var(--color-background-dark);
        font-size: 12px;
        color: var(--color-text-light);

        .stat-icon {
          color: var(--color-text-lighter);
        }
      }
    }

    .progress-bar-container {
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
          position: relative;

          &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(90deg, 
              rgba(255, 255, 255, 0.2) 0%, 
              rgba(255, 255, 255, 0) 50%,
              rgba(255, 255, 255, 0.2) 100%);
            animation: shimmer 2s infinite;
          }
        }
      }
    }
  }

  // Footer
  .card-footer {
    padding-top: 12px;
    margin-top: 8px;
    border-top: 1px solid var(--color-border);

    .owner-info {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 11px;

      .owner-name {
        color: var(--color-text-lighter);
        font-size: 11px;
      }
    }
  }

  // Voted Badge
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

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

// Responsive design
@media (max-width: 768px) {
  .vote-card {
    padding: 12px;

    .card-header .header-left {
      .type-icon {
        width: 28px;
        height: 28px;

        svg {
          width: 16px;
          height: 16px;
        }
      }

      .header-meta {
        .option-type-label {
          font-size: 11px;
        }

        .timestamp {
          font-size: 9px;
        }
      }
    }

    .option-info {
      .option-title {
        font-size: 16px;
      }

      .stats-container {
        .support-stats {
          padding: 3px 6px;
          
          .vote-count {
            font-size: 12px;
          }
          
          .percentage {
            font-size: 11px;
          }
        }
      }
    }
  }
}
</style>
