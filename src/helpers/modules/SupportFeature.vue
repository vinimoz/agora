<!--
  - SPDX-FileCopyrightText: 2018-2025 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <NcPopover 
    v-if="showDetailsOnHover && hasResults && !isReadonly"
    :delay="{ show: 300, hide: 150 }"
    :triggers="['hover']"
    :popover-base-class="'support-details-popover'"
    placement="bottom">
    <template #trigger>
      <div 
        ref="containerRef"
        class="counter-item supports"
        :class="{ 
          'clickable': canSupport && !isReadonly, 
          'disabled': !canSupport || isReadonly,
          'has-support': hasUserParticipated
        }"
        :style="containerStyles"
        @click="handleSupportClick">
        <!-- Icon based on support feature type -->
        <div class="counter-icon" :style="iconContainerStyles">
          <TernarySupportIcon
            v-if="supportFeature === 'ternary'"
            :support-value="currentUserSupportValue as number"
            :size="iconSize" />
          
          <ThumbIcon
            v-else-if="supportFeature === 'binary'"
            :supported="hasUserParticipated"
            :size="iconSize" />
          
          <div v-else-if="supportFeature === 'reaction'" class="reaction-icon">
            <span class="reaction-emoji">{{ getUserReaction || '👍' }}</span>
          </div>
          
          <div v-else-if="supportFeature === 'star'" class="star-rating-icon">
            <Star :size="iconSize" :class="{ filled: hasUserParticipated }" />
            <span v-if="hasUserParticipated" class="rating-value">{{ currentUserSupportValue }}</span>
          </div>
          
          <div v-else-if="supportFeature === 'score'" class="score-icon">
            <Hash :size="iconSize" />
            <span v-if="hasUserParticipated" class="score-value">{{ currentUserSupportValue }}</span>
          </div>
          
          <div v-else-if="supportFeature === 'majority_judgment'" class="grade-icon">
            <Gauge :size="iconSize" />
            <span v-if="hasUserParticipated" class="grade-value">
              {{ getGradeLabel(currentUserSupportValue as number) }}
            </span>
          </div>
          
          <CheckCircle
            v-else-if="supportFeature === 'approval'"
            :size="iconSize"
            :class="{ approved: hasUserParticipated }" />
          
          <ListOrdered
            v-else-if="supportFeature === 'ranking'"
            :size="iconSize"
            :class="{ ranked: hasUserParticipated }" />
          
          <TrendingUp
            v-else-if="supportFeature === 'trending'"
            :size="iconSize" />
          
          <ThumbIcon
            v-else
            :supported="false"
            :size="iconSize"
            class="disabled-icon" />
        </div>
        
        <!-- Counter Content -->
        <div class="counter-content">
          <div class="support-count">
            <span class="counter-value" :style="{ fontSize: `${iconSize}px` }">
              {{ displayCount }}
            </span>
            <span v-if="showQuorum && quorumValue" 
                  class="quorum-compact" 
                  :style="{ fontSize: `${iconSize * 0.6}px` }">
              <span class="quorum-separator"> / </span>
              <span class="quorum-target">{{ quorumValue }}</span>
            </span>
          </div>
          <span class="counter-label" :style="{ fontSize: `${iconSize * 0.5}px` }">
            {{ getSupportLabel() }}
          </span>
        </div>
      </div>
    </template>

    <!-- Popover Content -->
    <div class="support-tooltip-content">
      <!-- Tooltip Header -->
      <div class="tooltip-header">
        <h4 :style="{ fontSize: `${iconSize * 0.65}px` }">{{ resolvedTooltipTitle }}</h4>
        <span v-if="currentUserSupportInfo" 
              class="user-support-badge" 
              :class="userSupportClass">
          {{ currentUserSupportInfo }}
        </span>
      </div>
      
      <!-- Binary Results -->
      <div v-if="supportFeature === 'binary' && binaryResult" class="binary-breakdown">
        <div class="breakdown-item positive">
          <div class="breakdown-header">
            <ThumbIcon :supported="true" :size="iconSize * 0.8" />
            <span class="breakdown-label">{{ t('agora', 'Yes') }}</span>
          </div>
          <div class="breakdown-stats">
            <span class="count">{{ binaryResult.total_yes }}</span>
            <span class="percentage">({{ Math.round(binaryResult.percentage_yes) }}%)</span>
          </div>
          <div class="breakdown-bar">
            <div class="bar-fill positive-bar" 
                 :style="{ width: `${binaryResult.percentage_yes}%` }" />
          </div>
        </div>
        
        <div class="breakdown-item negative">
          <div class="breakdown-header">
            <ThumbIcon :supported="false" :size="iconSize * 0.8" />
            <span class="breakdown-label">{{ t('agora', 'No') }}</span>
          </div>
          <div class="breakdown-stats">
            <span class="count">{{ binaryResult.total_no }}</span>
            <span class="percentage">({{ Math.round(binaryResult.percentage_no) }}%)</span>
          </div>
          <div class="breakdown-bar">
            <div class="bar-fill negative-bar" 
                 :style="{ width: `${binaryResult.percentage_no}%` }" />
          </div>
        </div>
      </div>
      
      <!-- Ternary Results -->
      <div v-if="supportFeature === 'ternary' && ternaryResult" class="ternary-breakdown">
        <div class="breakdown-item positive">
          <div class="breakdown-header">
            <TernarySupportIcon :support-value="1" :size="iconSize * 0.8" />
            <span class="breakdown-label">{{ t('agora', 'In Favor') }}</span>
          </div>
          <div class="breakdown-stats">
            <span class="count">{{ ternaryResult.total_yes }}</span>
            <span class="percentage">({{ Math.round(ternaryResult.percentage_yes) }}%)</span>
          </div>
          <div class="breakdown-bar">
            <div class="bar-fill positive-bar" 
                 :style="{ width: `${ternaryResult.percentage_yes}%` }" />
          </div>
        </div>
        
        <div class="breakdown-item neutral">
          <div class="breakdown-header">
            <TernarySupportIcon :support-value="0" :size="iconSize * 0.8" />
            <span class="breakdown-label">{{ t('agora', 'Neutral') }}</span>
          </div>
          <div class="breakdown-stats">
            <span class="count">{{ ternaryResult.total_abstain }}</span>
            <span class="percentage">({{ Math.round(ternaryResult.percentage_abstain) }}%)</span>
          </div>
          <div class="breakdown-bar">
            <div class="bar-fill neutral-bar" 
                 :style="{ width: `${ternaryResult.percentage_abstain}%` }" />
          </div>
        </div>
        
        <div class="breakdown-item negative">
          <div class="breakdown-header">
            <TernarySupportIcon :support-value="-1" :size="iconSize * 0.8" />
            <span class="breakdown-label">{{ t('agora', 'Against') }}</span>
          </div>
          <div class="breakdown-stats">
            <span class="count">{{ ternaryResult.total_no }}</span>
            <span class="percentage">({{ Math.round(ternaryResult.percentage_no) }}%)</span>
          </div>
          <div class="breakdown-bar">
            <div class="bar-fill negative-bar" 
                 :style="{ width: `${ternaryResult.percentage_no}%` }" />
          </div>
        </div>
      </div>
      
      <!-- Score Results -->
      <div v-if="supportFeature === 'score' && scoreResult" class="score-breakdown">
        <div class="score-summary">
          <div class="score-stat">
            <span class="stat-label">{{ t('agora', 'Average') }}</span>
            <span class="stat-value">{{ scoreResult.average.toFixed(1) }}</span>
          </div>
          <div v-if="scoreResult.median !== undefined" class="score-stat">
            <span class="stat-label">{{ t('agora', 'Median') }}</span>
            <span class="stat-value">{{ scoreResult.median }}</span>
          </div>
          <div class="score-stat">
            <span class="stat-label">{{ t('agora', 'Total Votes') }}</span>
            <span class="stat-value">{{ scoreResult.total }}</span>
          </div>
        </div>
      </div>
      
      <!-- Reaction Results -->
      <div v-if="supportFeature === 'reaction' && reactionResult" class="reaction-breakdown">
        <div class="reaction-grid">
          <div 
            v-for="(count, reaction) in reactionResult.counts" 
            :key="reaction"
            class="reaction-stat"
            :class="{ selected: getUserReaction === reaction }">
            <span class="reaction-emoji">{{ reaction }}</span>
            <span class="reaction-count">{{ count }}</span>
          </div>
        </div>
      </div>
      
      <!-- Majority Judgment Results -->
      <div v-if="supportFeature === 'majority_judgment' && majorityResult" class="majority-breakdown">
        <div class="grade-distribution">
          <div 
            v-for="(count, grade) in majorityResult.distribution" 
            :key="grade"
            class="grade-bar">
            <span class="grade-label">{{ getGradeLabel(Number(grade)) }}</span>
            <div class="grade-bar-container">
              <div 
                class="grade-bar-fill"
                :style="{ width: `${totalVotes > 0 ? (count / totalVotes) * 100 : 0}%` }" />
            </div>
            <span class="grade-count">{{ count }}</span>
          </div>
        </div>
        <div class="median-info">
          <span class="median-label">{{ t('agora', 'Median Grade') }}:</span>
          <span class="median-value">{{ getGradeLabel(majorityResult.median) }}</span>
        </div>
      </div>
      
      <!-- Footer Summary -->
      <div class="tooltip-footer">
        <div class="summary-item">
          <span class="summary-label">{{ t('agora', 'Total Participants') }}</span>
          <span class="summary-value">{{ totalParticipants }}</span>
        </div>
        <div v-if="quorumValue" class="summary-item">
          <span class="summary-label">{{ t('agora', 'Quorum') }}</span>
          <span class="summary-value" :class="{ reached: totalParticipants >= quorumValue }">
            {{ totalParticipants }}/{{ quorumValue }}
          </span>
        </div>
      </div>
    </div>
  </NcPopover>

  <!-- Simple version without popover (when disabled or no results) -->
  <div 
    v-else
    ref="containerRef"
    class="counter-item supports"
    :class="{ 
      'clickable': canSupport && !isReadonly, 
      'disabled': !canSupport || isReadonly,
      'has-support': hasUserParticipated
    }"
    :style="containerStyles"
    @click="handleSupportClick">
    <div class="counter-icon" :style="iconContainerStyles">
      <TernarySupportIcon
        v-if="supportFeature === 'ternary'"
        :support-value="currentUserSupportValue as number"
        :size="iconSize" />
      
      <ThumbIcon
        v-else-if="supportFeature === 'binary'"
        :supported="hasUserParticipated"
        :size="iconSize" />
      
      <div v-else-if="supportFeature === 'reaction'" class="reaction-icon">
        <span class="reaction-emoji">{{ getUserReaction || '👍' }}</span>
      </div>
      
      <div v-else-if="supportFeature === 'star'" class="star-rating-icon">
        <Star :size="iconSize" :class="{ filled: hasUserParticipated }" />
        <span v-if="hasUserParticipated" class="rating-value">{{ currentUserSupportValue }}</span>
      </div>
      
      <div v-else-if="supportFeature === 'score'" class="score-icon">
        <Hash :size="iconSize" />
        <span v-if="hasUserParticipated" class="score-value">{{ currentUserSupportValue }}</span>
      </div>
      
      <div v-else-if="supportFeature === 'majority_judgment'" class="grade-icon">
        <Gauge :size="iconSize" />
        <span v-if="hasUserParticipated" class="grade-value">
          {{ getGradeLabel(currentUserSupportValue as number) }}
        </span>
      </div>
      
      <CheckCircle
        v-else-if="supportFeature === 'approval'"
        :size="iconSize"
        :class="{ approved: hasUserParticipated }" />
      
      <ListOrdered
        v-else-if="supportFeature === 'ranking'"
        :size="iconSize"
        :class="{ ranked: hasUserParticipated }" />
      
      <TrendingUp
        v-else-if="supportFeature === 'trending'"
        :size="iconSize" />
      
      <ThumbIcon
        v-else
        :supported="false"
        :size="iconSize"
        class="disabled-icon" />
    </div>
    
    <div class="counter-content">
      <div class="support-count">
        <span class="counter-value" :style="{ fontSize: `${iconSize}px` }">
          {{ displayCount }}
        </span>
        <span v-if="showQuorum && quorumValue" 
              class="quorum-compact" 
              :style="{ fontSize: `${iconSize * 0.6}px` }">
          <span class="quorum-separator"> / </span>
          <span class="quorum-target">{{ quorumValue }}</span>
        </span>
      </div>
      <span class="counter-label" :style="{ fontSize: `${iconSize * 0.5}px` }">
        {{ getSupportLabel() }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { showSuccess, showError } from '@nextcloud/dialogs'
import { t } from '@nextcloud/l10n'
import NcPopover from '@nextcloud/vue/components/NcPopover'
import { useSupportsStore } from '../../stores/supports'
import { useSessionStore } from '../../stores/session'
import { useOptionsStore } from '../../stores/options'
import TernarySupportIcon from '../../components/AppIcons/modules/TernarySupportIcon.vue'
import ThumbIcon from '../../components/AppIcons/modules/ThumbIcon.vue'
import { 
  Star, 
  Hash, 
  Gauge, 
  CheckCircle, 
  ListOrdered, 
  TrendingUp 
} from 'lucide-vue-next'
import type { Inquiry, Option } from '../../Types/index.ts'
import {
  canSupportOption,
  canSupport as canSupportInquiry
} from '../../utils/permissions.ts'
import type { 
  SupportFeature,
  BinaryResult,
  TernaryResult,
  ScoreResult,
  ReactionResult,
  MajorityJudgmentResult
} from '../../Types/votingType'

// Define emits
const emit = defineEmits<{
  (e: 'support-toggled', itemId: number, newState: boolean): void
}>()

interface Props {
  item: Inquiry | Option
  itemType: 'inquiry' | 'option'
  context?: any
  showQuorum?: boolean
  viewOnly?: boolean
  showDetailsOnHover?: boolean
  iconSize?: number
  tooltipTitle?: string
}

const props = withDefaults(defineProps<Props>(), {
  showQuorum: false,
  showDetailsOnHover: true,
  iconSize: 22,
  tooltipTitle: '',
  context: () => ({}),
  viewOnly: false
})

// Refs
const containerRef = ref<HTMLElement>()

// Computed tooltip title - use computed instead of mutating props
const resolvedTooltipTitle = computed(() => 
  props.tooltipTitle || t('agora', 'Support Details')
)

// Support feature from item configuration
const supportFeature = computed((): SupportFeature => 
  (props.item?.configuration?.supportFeature as SupportFeature) || 'none'
)

// Current user support
const currentUserSupportValue = computed(() => 
  props.item?.currentUserStatus?.supportValue ?? null
)

const hasUserParticipated = computed(() => 
  props.item?.currentUserStatus?.hasSupported ?? false
)

const getUserReaction = computed(() => {
  if (supportFeature.value === 'reaction' && currentUserSupportValue.value) {
    return currentUserSupportValue.value as string
  }
  return null
})

// Results from item (set by parent/inquiry store)
const supportResult = computed(() => 
  (props.item as any)?.status?.supportResult?.result || null
)

const hasResults = computed(() => supportResult.value !== null)

const binaryResult = computed(() => 
  supportResult.value?.type === 'binary' ? supportResult.value as BinaryResult : null
)

const ternaryResult = computed(() =>
  supportResult.value?.type === 'ternary' ? supportResult.value as TernaryResult : null
)

const scoreResult = computed(() =>
  supportResult.value?.type === 'score' ? supportResult.value as ScoreResult : null
)

const reactionResult = computed(() =>
  supportResult.value?.type === 'reaction' ? supportResult.value as ReactionResult : null
)

const majorityResult = computed(() =>
  supportResult.value?.type === 'majority_judgment' ? supportResult.value as MajorityJudgmentResult : null
)

// Display count
const displayCount = computed(() => {
  if (binaryResult.value) {
    return binaryResult.value.total_yes + binaryResult.value.total_no
  }
  if (ternaryResult.value) {
    return ternaryResult.value.total_yes + ternaryResult.value.total_no + ternaryResult.value.total_abstain
  }
  if (scoreResult.value) {
    return scoreResult.value.total
  }
  if (reactionResult.value) {
    return Object.values(reactionResult.value.counts).reduce((a, b) => a + b, 0)
  }
  return props.item?.status?.countSupports ?? 0
})

const totalParticipants = computed(() => displayCount.value)
const totalVotes = computed(() => displayCount.value)

const quorumValue = computed(() => 
  (props.item as any)?.miscFields?.quorum ?? 0
)

// Styles
const containerStyles = computed(() => ({
  padding: `${props.iconSize * 0.3}px ${props.iconSize * 0.6}px`,
  gap: `${props.iconSize * 0.5}px`,
  borderRadius: `${props.iconSize * 0.6}px`,
  borderWidth: `${props.iconSize * 0.05}px`
}))

const iconContainerStyles = computed(() => ({
  width: `${props.iconSize * 1.2}px`,
  height: `${props.iconSize * 1.2}px`,
  borderRadius: `${props.iconSize * 0.3}px`
}))

// Current user support info
const currentUserSupportInfo = computed(() => {
  if (!hasUserParticipated.value) return null
  
  const feature = supportFeature.value
  const value = currentUserSupportValue.value
  
  if (feature === 'binary') {
    return value === 1 ? `✅ ${t('agora', 'You voted Yes')}` : null
  }
  if (feature === 'ternary') {
    if (value === 1) return `✅ ${t('agora', 'You voted In Favor')}`
    if (value === 0) return `⚪ ${t('agora', 'You voted Neutral')}`
    if (value === -1) return `❌ ${t('agora', 'You voted Against')}`
  }
  if (feature === 'star') {
    return `⭐ ${value}/5 ${t('agora', 'stars')}`
  }
  if (feature === 'score') {
    return `📊 ${value}/10`
  }
  if (feature === 'reaction' && value) {
    return `${value} ${t('agora', 'reacted')}`
  }
  if (feature === 'majority_judgment') {
    return `📝 ${getGradeLabel(value as number)}`
  }
  if (feature === 'approval') {
    return `✅ ${t('agora', 'Approved')}`
  }
  if (feature === 'ranking') {
    return `📊 ${t('agora', 'Ranked')}`
  }
  
  return `👍 ${t('agora', 'Supported')}`
})

const userSupportClass = computed(() => {
  const feature = supportFeature.value
  const value = currentUserSupportValue.value
  
  if (feature === 'ternary') {
    if (value === 1) return 'positive'
    if (value === 0) return 'neutral'
    if (value === -1) return 'negative'
  }
  return 'positive'
})

// Permissions
const canSupport = computed(() => {
  if (!props.item) return false
  
  if (props.itemType === 'option') {
    return canSupportOption(props.context)
  } 
  return canSupportInquiry(props.context)
})

const isReadonly = computed(() => props.viewOnly || !canSupport.value)

// Helpers
const getSupportLabel = (): string => {
  const labels: Record<SupportFeature, string> = {
    binary: t('agora', 'Votes'),
    ternary: t('agora', 'Votes'),
    reaction: t('agora', 'Reactions'),
    star: t('agora', 'Ratings'),
    score: t('agora', 'Scores'),
    majority_judgment: t('agora', 'Grades'),
    approval: t('agora', 'Approvals'),
    ranking: t('agora', 'Rankings'),
    trending: t('agora', 'Trending'),
    none: t('agora', 'Supports')
  }
  
  return labels[supportFeature.value] || t('agora', 'Supports')
}

const getGradeLabel = (grade: number): string => {
  const grades = (props.item?.configuration as any)?.options?.grades?.labels || 
    ['Reject', 'Insufficient', 'Passable', 'Fairly Good', 'Good', 'Very Good', 'Excellent']
  return grades[grade] || String(grade)
}

// Support action
const handleSupportClick = async () => {
  if (!canSupport.value || isReadonly.value) {
    return
  }
  
  const hadSupportedBefore = props.item.currentUserStatus?.hasSupported

  try {
    const supportsStore = useSupportsStore()
    const sessionStore = useSessionStore()
    const optionsStore = useOptionsStore()
     
    await supportsStore.toggleSupport(
      props.item.id, 
      sessionStore.currentUser.id, 
      props.item, 
      props.itemType
    )

    if (props.itemType === 'option' && props.item.id) {
      optionsStore.updateOptionSupportDetails(props.item.id, {
        countSupports: props.item.status.countSupports,
        hasSupported: props.item.currentUserStatus.hasSupported,
        supportValue: props.item.currentUserStatus.supportValue
      })
    }

    // Emit event for parent components
    emit('support-toggled', props.item.id, props.item.currentUserStatus.hasSupported)

    showSupportSuccessMessage(hadSupportedBefore)

  } catch (error) {
    console.error('Failed to toggle support:', error)
    showError(t('agora', 'Failed to update support status'))
  }
}

const showSupportSuccessMessage = (hadSupportedBefore: boolean) => {
  const hasSupportedAfter = props.item.currentUserStatus?.hasSupported
  const supportValueAfter = props.item.currentUserStatus?.supportValue
  const feature = supportFeature.value
  
  if (feature === 'binary') {
    if (hasSupportedAfter && !hadSupportedBefore) {
      showSuccess(t('agora', 'Thanks for your support!'), { timeout: 2000 })
    } else if (!hasSupportedAfter && hadSupportedBefore) {
      showSuccess(t('agora', 'Support removed!'), { timeout: 2000 })
    }
  } else if (feature === 'ternary') {
    if (supportValueAfter === 1) {
      showSuccess(t('agora', 'Position saved: In Favor'), { timeout: 2000 })
    } else if (supportValueAfter === 0) {
      showSuccess(t('agora', 'Position saved: Neutral'), { timeout: 2000 })
    } else if (supportValueAfter === -1) {
      showSuccess(t('agora', 'Position saved: Against'), { timeout: 2000 })
    } else if (supportValueAfter === null && hadSupportedBefore) {
      showSuccess(t('agora', 'Vote removed!'), { timeout: 2000 })
    }
  } else if (feature === 'star') {
    showSuccess(t('agora', 'Rating saved!'), { timeout: 2000 })
  } else if (feature === 'score') {
    showSuccess(t('agora', 'Score saved!'), { timeout: 2000 })
  } else if (feature === 'reaction') {
    showSuccess(t('agora', 'Reaction saved!'), { timeout: 2000 })
  } else if (hasSupportedAfter && !hadSupportedBefore) {
    showSuccess(t('agora', 'Thanks for participating!'), { timeout: 2000 })
  } else {
    showSuccess(t('agora', 'Participation removed!'), { timeout: 2000 })
  }
}
</script>

<style lang="scss" scoped>
.counter-item.supports {
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
  position: relative;
  user-select: none;
  white-space: nowrap;
  height: 32px;
  min-width: auto;
  border: 1px solid var(--color-border);
  background: var(--color-main-background);

  &.clickable {
    cursor: pointer;

    &:hover {
      border-color: var(--color-primary-element);
      background: var(--color-background-hover);
    }
  }

  &.has-support {
    border-color: var(--color-success);
    background: rgba(var(--color-success-rgb), 0.05);
  }

  &.disabled {
    cursor: default;
    opacity: 0.6;
  }

  .counter-icon {
    background: linear-gradient(135deg, var(--color-background-darker), var(--color-background-dark));
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    
    .reaction-icon {
      .reaction-emoji { font-size: 1.2em; }
    }
    
    .star-rating-icon {
      display: flex;
      align-items: center;
      gap: 2px;
      
      .filled { color: #fbbf24; fill: #fbbf24; }
      .rating-value {
        font-size: 10px;
        font-weight: 600;
        color: var(--color-main-text);
      }
    }
    
    .score-icon {
      display: flex;
      align-items: center;
      gap: 2px;
      
      .score-value {
        font-size: 10px;
        font-weight: 600;
        color: var(--color-main-text);
      }
    }
    
    .grade-icon {
      display: flex;
      align-items: center;
      gap: 2px;
      
      .grade-value {
        font-size: 9px;
        font-weight: 600;
        max-width: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    
    .approved { color: var(--color-success); }
    .ranked { color: var(--color-primary-element); }
  }

  .counter-content {
    display: flex;
    flex-direction: column;
    min-width: 0;
    justify-content: center;

    .support-count {
      display: flex;
      align-items: baseline;
      line-height: 1;

      .counter-value {
        font-weight: 700;
        color: var(--color-main-text);
      }

      .quorum-compact {
        color: var(--color-text-lighter);

        .quorum-target {
          color: var(--color-primary-element);
          font-weight: 600;
        }
      }
    }

    .counter-label {
      color: var(--color-text-lighter);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-weight: 600;
      line-height: 1.2;
      margin-top: 2px;
    }
  }
}
</style>

<style lang="scss">
// Global styles for popover content (must not be scoped)
.support-details-popover {
  .support-tooltip-content {
    background: var(--color-main-background);
    border: 1px solid var(--color-border);
    border-radius: 12px;
    padding: 16px;
    min-width: 250px;
    max-width: 320px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);

    .tooltip-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      padding-bottom: 8px;
      border-bottom: 1px solid var(--color-border);

      h4 {
        margin: 0;
        font-weight: 600;
      }

      .user-support-badge {
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 11px;
        font-weight: 500;

        &.positive { background: #10b98120; color: #10b981; }
        &.neutral { background: #6b728020; color: #6b7280; }
        &.negative { background: #ef444420; color: #ef4444; }
      }
    }

    .binary-breakdown, .ternary-breakdown {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 16px;

      .breakdown-item {
        padding: 8px;
        border-radius: 8px;
        background: var(--color-background-dark);

        &.positive { border-left: 3px solid #10b981; }
        &.neutral { border-left: 3px solid #6b7280; }
        &.negative { border-left: 3px solid #ef4444; }

        .breakdown-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;

          .breakdown-label { font-weight: 600; }
        }

        .breakdown-stats {
          display: flex;
          justify-content: space-between;
          margin-bottom: 6px;

          .count { font-weight: 700; }
          .percentage { color: var(--color-text-lighter); font-size: 11px; }
        }

        .breakdown-bar {
          height: 4px;
          background: var(--color-border);
          border-radius: 2px;
          overflow: hidden;

          .bar-fill {
            height: 100%;
            transition: width 0.3s ease;
            &.positive-bar { background: #10b981; }
            &.neutral-bar { background: #6b7280; }
            &.negative-bar { background: #ef4444; }
          }
        }
      }
    }

    .score-breakdown {
      margin-bottom: 16px;

      .score-summary {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;

        .score-stat {
          text-align: center;
          padding: 8px;
          background: var(--color-background-dark);
          border-radius: 8px;

          .stat-label {
            display: block;
            font-size: 11px;
            color: var(--color-text-lighter);
            margin-bottom: 4px;
          }

          .stat-value {
            font-size: 18px;
            font-weight: 700;
            color: var(--color-primary-element);
          }
        }
      }
    }

    .reaction-breakdown {
      margin-bottom: 16px;

      .reaction-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        justify-content: center;

        .reaction-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 8px 12px;
          background: var(--color-background-dark);
          border-radius: 8px;
          min-width: 50px;

          &.selected {
            background: rgba(var(--color-primary-element-rgb), 0.1);
            border: 1px solid var(--color-primary-element);
          }

          .reaction-emoji { font-size: 20px; margin-bottom: 4px; }
          .reaction-count { font-weight: 600; font-size: 14px; }
        }
      }
    }

    .majority-breakdown {
      margin-bottom: 16px;

      .grade-distribution {
        display: flex;
        flex-direction: column;
        gap: 6px;

        .grade-bar {
          display: flex;
          align-items: center;
          gap: 8px;

          .grade-label {
            min-width: 60px;
            font-size: 11px;
            color: var(--color-text-lighter);
          }

          .grade-bar-container {
            flex: 1;
            height: 6px;
            background: var(--color-border);
            border-radius: 3px;
            overflow: hidden;

            .grade-bar-fill {
              height: 100%;
              background: var(--color-primary-element);
              transition: width 0.3s ease;
            }
          }

          .grade-count {
            min-width: 30px;
            text-align: right;
            font-weight: 600;
            font-size: 12px;
          }
        }
      }

      .median-info {
        margin-top: 12px;
        padding-top: 8px;
        border-top: 1px solid var(--color-border);
        display: flex;
        justify-content: space-between;

        .median-label { font-size: 12px; color: var(--color-text-lighter); }
        .median-value { font-weight: 700; color: var(--color-primary-element); }
      }
    }

    .tooltip-footer {
      display: flex;
      justify-content: space-between;
      padding-top: 12px;
      margin-top: 4px;
      border-top: 1px solid var(--color-border);

      .summary-item {
        .summary-label { 
          font-size: 11px; 
          color: var(--color-text-lighter); 
          display: block; 
        }
        .summary-value { 
          font-weight: 700; 
          &.reached { color: var(--color-success); }
        }
      }
    }
  }
}
</style>
