<!--
  SPDX-FileCopyrightText: 2026 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
  <div 
    class="vote-card" 
    :class="{ 
      'user-voted': hasUserVotedFor(item.id),
      'has-support': hasSupportFeature,
      'has-comments': allowComment
    }"
    @click="handleCardClick"
  >
    <!-- Header with icon, type label, and creation date -->
    <div v-if="inquiryStore.permissions.edit" class="card-header">
      <div class="header-left">
        <div class="type-icon" :style="{ color: itemTypeColor }">
          <component :is="itemIcon" :size="20" />
        </div>
        
        <div class="header-meta">
          <span class="item-type-label">{{ itemTypeLabel }}</span>
          <span class="timestamp">{{ formatDate(raw?.status?.created ?? 0) }}</span>
        </div>
      </div>
    </div>

    <!-- Item content -->
    <div class="item-info">
      <h3 class="item-title">{{ item.title }}</h3>
      <p v-if="item.text && !compact" class="item-text">{{ item.text }}</p>
      
      <!-- Support and comments stats (when not voting mode) -->
      <div v-if="!canVote || hasUserVoted" class="stats-container">
        <div v-if="!hideResults" class="support-stats" @click.stop="openSupportsModal">
          <component :is="InquiryOptionIcons.Support" :size="14" class="stat-icon" />
          <span class="vote-count">{{ voteCount }}</span>
          <span class="percentage">{{ percentage }}%</span>
        </div>
        
        <div v-if="allowComment && raw.status.countComments" class="comments-stats">
          <component :is="InquiryOptionIcons.Comment" :size="14" class="stat-icon" />
          <span>{{ raw.status.countComments }}</span>
        </div>
      </div>

      <!-- Progress bar for voting mode -->
      <div v-if="(!canVote || hasUserVoted) && !hideResults" class="progress-bar-container">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: percentage + '%' }" />
        </div>
      </div>
    </div>

    <!-- Vote input section -->
    <VoteInput
      v-if="canVote"
      :engine-id="effectiveEngineId"
      :engine-config="engineConfig"
      :item="item"
      :disabled="!canVote"
      :is-selected="isSelected"
      :current-rank="currentRank"
      :current-grade="currentGrade"
      :current-score="currentScore"
      :user-vote="userVoteForItem"
      :current-star="currentStar"
      :current-reaction="currentReaction"
      :current-quadratic-votes="currentQuadraticVotes"
      :current-token-weight="currentTokenWeight"
      :total-items="totalItems"
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

    <div v-if="canComment" class="item-comment">
      <NcButton
        variant="tertiary"
        :aria-expanded="showComment ? 'true' : 'false'"
        :aria-controls="commentZoneId"
        @click="toggleComment"
      >
        {{ showComment ? t('agora', 'Hide comment') : t('agora', 'Add comment') }}
      </NcButton>
      <div v-show="showComment" :id="commentZoneId">
        <CommentAdd
          v-if="commentMounted"
          ref="commentAdd"
          :item-id="item.id"
          :input-label="t('agora', 'Comment on {item}', { item: item.title })"
          :placeholder="openedByGrade ? t('agora', 'Under which conditions? Why?') : undefined"
        />
      </div>
    </div>

    <!-- Footer with owner info -->
    <div v-if="!compact && inquiryStore.permissions.edit" class="card-footer">
      <div class="owner-info">
        <NcAvatar
          v-if="raw.owner?.id"
          :user="raw.owner.id"
          :display-name="raw.owner.displayName"
          :size="20"
        />
        <span class="owner-name">{{ raw.owner?.displayName || t('agora', 'Unknown owner') }}</span>
      </div>
    </div>

    <!-- Voted badge -->
    <div v-if="hasUserVotedFor(item.id) && !canVote" class="voted-badge">
      <CheckCircle :size="16" />
      <span>{{ t('agora', 'Voted') }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { t } from '@nextcloud/l10n'
import { CheckCircle } from 'lucide-vue-next'
import NcAvatar from '@nextcloud/vue/components/NcAvatar'
import NcButton from '@nextcloud/vue/components/NcButton'
import VoteInput from './VoteInput.vue'
import CommentAdd from '../Comments/CommentAdd.vue'
import { useSessionStore } from '../../stores/session'
import { useInquiryStore } from '../../stores/inquiry'
import { InquiryOptionIcons } from '../../utils/icons.ts'
import {
  getItemTypeLabel,
  getItemTypeIconComponent,
  getItemTypeColor,
} from '../../helpers/modules/InquiryHelper'
import {
  allowsComments,
  hasSupportFeature as hasSupportFeatureHelper,
} from '../../helpers/modules/InquiryOptionHelper'

import type { Item, SupportData, SupportValue } from '../../Types/index'

const props = defineProps<{
  item: Item
  compact?: boolean
  effectiveEngineId: string
  engineConfig: Record<string, unknown>
  canVote: boolean
  hasUserVoted: boolean
  hasUserVotedFor: (itemId: number) => boolean
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
  getUserVoteValueForItem: (itemId: number) => SupportValue | null
  totalItems?: number
  hideResults?: boolean
}>()

const raw = computed(() => (props.item as any).raw ?? props.item)

const emit = defineEmits<{
  vote: [item: Item, value: SupportValue]
  'approvalToggle': [itemId: number]
  'changeRank': [itemId: number, rank: number | null]
  'changeGrade': [itemId: number, grade: string | null]
  'update:score': [itemId: number, score: number | null]
  'update:star': [itemId: number, star: number | null]
  'update:reaction': [itemId: number, reaction: string[] | null]
  'update:quadratic': [itemId: number, votes: number | null]
  'update:token_weight': [itemId: number, weight: number | null]
  'openSupportsModal': [itemId: number]
}>()

const sessionStore = useSessionStore()
const inquiryStore = useInquiryStore()
const allItemTypes = computed(() => sessionStore.appSettings?.inquiryItemTypeTab || [])

const itemTypeLabel = computed(() => {
  if (!props.item?.type || !allItemTypes.value) {
    return t('agora', 'Item')
  }
  return getItemTypeLabel(props.item.type, allItemTypes.value, t('agora', 'Item'))
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
  const value = props.getUserVoteValueForItem?.(props.item.id)
  return value !== null && value !== undefined
})

function handleRemoveVote() {
  const engine = props.effectiveEngineId
  const id = props.item.id

  if (['binary', 'ternary', 'score', 'star'].includes(engine)) {
    emit('update:score', id, null)
    return
  }
  if (engine === 'majority_judgment') {
    emit('changeGrade', id, null)
    return
  }
  if (engine === 'reaction') {
    emit('update:reaction', id, null)
    return
  }
  if (['ranking', 'condorcet', 'borda'].includes(engine)) {
    emit('changeRank', id, null)
    return
  }
  if (engine === 'quadratic') {
    emit('update:quadratic', id, null)
    return
  }
  if (engine === 'token_weighted') {
    emit('update:token_weight', id, null)
    return
  }
  if (['approval', 'phased_voting'].includes(engine)) {
    // Toggling twice removes the selection for approval/phased
    if (props.isSelected) emit('approvalToggle', id)
    return
  }
  console.warn(`[VoteCard] handleRemoveVote: unsupported engine ${engine}`)
}

const itemIcon = computed(() => {
  if (!props.item?.type || !allItemTypes.value) {
    return InquiryOptionIcons.Default
  }
  return getItemTypeIconComponent(props.item.type, allItemTypes.value)
})

const itemTypeColor = computed(() => {
  if (!props.item?.type || !allItemTypes.value) {
    return 'var(--color-text-light)'
  }
  return getItemTypeColor(props.item.type, allItemTypes.value)
})

const allowComment = computed(() => 
  allowsComments(props.item.type, allItemTypes.value)
)

// PublicController::addComment drops itemId, so no per-item comment on a public link.
const canComment = computed(() => !!raw.permissions?.comment
  && inquiryStore.permissions.comment
  && sessionStore.route.name !== 'publicInquiry')
const showComment = ref(false)
const commentMounted = ref(false)
const openedByGrade = ref(false)
const commentAdd = ref<InstanceType<typeof CommentAdd> | null>(null)
const commentZoneId = computed(() => `item-comment-${props.item.id}`)
const commentGrades = computed(() => (props.engineConfig.comment_grades as string[] | undefined) ?? [])

async function toggleComment() {
  showComment.value = !showComment.value
  if (showComment.value) {
    openedByGrade.value = false
    commentMounted.value = true
    await nextTick()
    commentAdd.value?.focus()
  }
}

const hasSupportFeature = computed(() => 
  hasSupportFeatureHelper(props.item.type, allItemTypes.value)
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

const userVoteForItem = computed(() => {
  const value = props.getUserVoteValueForItem?.(props.item.id)
  if (!value) return undefined
  return { value, itemId: props.item.id } as SupportData
})

function openSupportsModal() {
  emit('openSupportsModal', props.item.id)
}


function handleVote(value: SupportValue) { emit('vote', props.item, value) }
function handleApprovalToggle() { emit('approvalToggle', props.item.id) }
function handleRankChange(rank: number | null) { emit('changeRank', props.item.id, rank) }
function handleGradeChange(grade: string | null) {
  emit('changeGrade', props.item.id, grade)
  if (grade && canComment.value && commentGrades.value.includes(grade)) {
    if (!showComment.value) openedByGrade.value = true
    commentMounted.value = true
    showComment.value = true
  }
}
function handleUpdateScore(itemId: number, score: number | null) { emit('update:score', itemId, score) }
function handleUpdateStar(itemId: number, star: number | null) { emit('update:star', itemId, star) }
function handleUpdateReaction(itemId: number, reaction: string[] | null) { emit('update:reaction', itemId, reaction) }
function handleUpdateQuadratic(itemId: number, votes: number | null) { emit('update:quadratic', itemId, votes) }
function handleUpdateTokenWeight(itemId: number, weight: number | null) { emit('update:token_weight', itemId, weight) }



function handleCardClick(event: MouseEvent) {
  const target = event.target as HTMLElement
  if (
    target.closest('.vote-input-container') ||
    target.closest('.voted-badge') ||
    target.closest('.support-stats') ||
    target.closest('.item-comment')
  ) return
  emit('openSupportsModal', props.item.id)
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
  }

  &:has(:focus-visible) {
    outline: 2px solid var(--color-main-text);
    outline-offset: 2px;
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

        .item-type-label {
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

  // Item Info
  .item-info {
    margin-bottom: 12px;

    .item-title {
      margin: 0 0 8px 0;
      font-size: 18px;
      font-weight: 600;
      color: var(--color-main-text);
      line-height: 1.4;
      word-break: break-word;
    }

    .item-text {
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

  .item-comment {
    margin-top: 8px;
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
        .item-type-label {
          font-size: 11px;
        }

        .timestamp {
          font-size: 9px;
        }
      }
    }

    .item-info {
      .item-title {
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
