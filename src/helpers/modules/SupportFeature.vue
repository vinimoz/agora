<!--
  - SPDX-FileCopyrightText: 2018-2025 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div 
    ref="containerRef"
    class="counter-item supports"
    :class="{ 
      'clickable': canSupport && !isReadonly, 
      'disabled': !canSupport || isReadonly,
      'has-support': hasUserParticipated
    }"
    :style="containerStyles"
    @click="handleSupportClick"
  >
    <!-- Icon based on support feature type -->
    <div class="counter-icon" :style="iconContainerStyles">
      <!-- Ternary Support -->
      <TernarySupportIcon
        v-if="supportFeature === 'ternary'"
        :support-value="currentUserSupportValue as number"
        :size="iconSize"
      />
      
      <!-- Binary Support -->
      <ThumbIcon
        v-else-if="supportFeature === 'binary'"
        :supported="hasUserParticipated"
        :size="iconSize"
      />
      
      <!-- Reaction Support -->
      <div v-else-if="supportFeature === 'reaction'" class="reaction-icon">
        <span class="reaction-emoji">{{ getUserReaction || '👍' }}</span>
      </div>
      
      <!-- Star Rating -->
      <div v-else-if="supportFeature === 'star'" class="star-rating-icon">
        <Star :size="iconSize" :class="{ filled: hasUserParticipated }" />
        <span v-if="hasUserParticipated" class="rating-value">{{ currentUserSupportValue }}</span>
      </div>
      
      <!-- Score Voting -->
      <div v-else-if="supportFeature === 'score'" class="score-icon">
        <Hash :size="iconSize" />
        <span v-if="hasUserParticipated" class="score-value">{{ currentUserSupportValue }}</span>
      </div>
      
      <!-- Majority Judgment -->
      <div v-else-if="supportFeature === 'majority_judgment'" class="grade-icon">
        <Gauge :size="iconSize" />
        <span v-if="hasUserParticipated" class="grade-value">{{ getGradeLabel(currentUserSupportValue as number) }}</span>
      </div>
      
      <!-- Approval Voting -->
      <CheckCircle
        v-else-if="supportFeature === 'approval'"
        :size="iconSize"
        :class="{ approved: hasUserParticipated }"
      />
      
      <!-- Ranking -->
      <ListOrdered
        v-else-if="supportFeature === 'ranking'"
        :size="iconSize"
        :class="{ ranked: hasUserParticipated }"
      />
      
      <!-- Trending -->
      <TrendingUp
        v-else-if="supportFeature === 'trending'"
        :size="iconSize"
      />
      
      <!-- Default/None -->
      <ThumbIcon
        v-else
        :supported="false"
        :size="iconSize"
        class="disabled-icon"
      />
    </div>
    
    <!-- Counter Content -->
    <div 
      class="counter-content"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <div class="support-count">
        <span class="counter-value" :style="{ fontSize: `${iconSize}px` }">
          {{ displayCount }}
        </span>
        <span v-if="showQuorum && quorumValue" class="quorum-compact" :style="{ fontSize: `${iconSize * 0.6}px` }">
          <span class="quorum-separator"> / </span>
          <span class="quorum-target">{{ quorumValue }}</span>
        </span>
      </div>
      <span class="counter-label" :style="{ fontSize: `${iconSize * 0.5}px` }">
        {{ getSupportLabel() }}
      </span>
    </div>
    
    <!-- Rich Tooltip with detailed breakdown -->
    <div 
      v-if="showTooltip && showDetailsOnHover" 
      class="support-tooltip"
      :style="tooltipStyles"
      @mouseenter="handleTooltipMouseEnter"
      @mouseleave="handleTooltipMouseLeave"
      @click.stop
    >
      <div class="support-tooltip-content">
        <!-- Tooltip Header -->
        <div class="tooltip-header">
          <h4 :style="{ fontSize: `${iconSize * 0.65}px` }">{{ tooltipTitle }}</h4>
          <span v-if="currentUserSupportInfo" class="user-support-badge" :class="userSupportClass">
            {{ currentUserSupportInfo }}
          </span>
        </div>
        
        <!-- Dynamic content based on support feature -->
        
        <!-- Binary Results -->
        <div v-if="supportFeature === 'binary' && binaryResult" class="binary-breakdown">
          <div class="breakdown-item positive">
            <div class="breakdown-header">
              <ThumbIcon :supported="true" :size="iconSize * 0.8" />
              <span class="breakdown-label">Yes</span>
            </div>
            <div class="breakdown-stats">
              <span class="count">{{ binaryResult.total_yes }}</span>
              <span class="percentage">({{ binaryResult.percentage_yes }}%)</span>
            </div>
            <div class="breakdown-bar">
              <div class="bar-fill" :style="{ width: `${binaryResult.percentage_yes}%` }"></div>
            </div>
          </div>
          
          <div class="breakdown-item negative">
            <div class="breakdown-header">
              <ThumbIcon :supported="false" :size="iconSize * 0.8" />
              <span class="breakdown-label">No</span>
            </div>
            <div class="breakdown-stats">
              <span class="count">{{ binaryResult.total_no }}</span>
              <span class="percentage">({{ binaryResult.percentage_no }}%)</span>
            </div>
            <div class="breakdown-bar">
              <div class="bar-fill" :style="{ width: `${binaryResult.percentage_no}%` }"></div>
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
              <span class="percentage">({{ ternaryResult.percentage_yes }}%)</span>
            </div>
            <div class="breakdown-bar">
              <div class="bar-fill" :style="{ width: `${ternaryResult.percentage_yes}%` }"></div>
            </div>
          </div>
          
          <div class="breakdown-item neutral">
            <div class="breakdown-header">
              <TernarySupportIcon :support-value="0" :size="iconSize * 0.8" />
              <span class="breakdown-label">{{ t('agora', 'Neutral') }}</span>
            </div>
            <div class="breakdown-stats">
              <span class="count">{{ ternaryResult.total_abstain }}</span>
              <span class="percentage">({{ ternaryResult.percentage_abstain }}%)</span>
            </div>
            <div class="breakdown-bar">
              <div class="bar-fill" :style="{ width: `${ternaryResult.percentage_abstain}%` }"></div>
            </div>
          </div>
          
          <div class="breakdown-item negative">
            <div class="breakdown-header">
              <TernarySupportIcon :support-value="-1" :size="iconSize * 0.8" />
              <span class="breakdown-label">{{ t('agora', 'Against') }}</span>
            </div>
            <div class="breakdown-stats">
              <span class="count">{{ ternaryResult.total_no }}</span>
              <span class="percentage">({{ ternaryResult.percentage_no }}%)</span>
            </div>
            <div class="breakdown-bar">
              <div class="bar-fill" :style="{ width: `${ternaryResult.percentage_no}%` }"></div>
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
            <div class="score-stat" v-if="scoreResult.median">
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
              :class="{ selected: getUserReaction === reaction }"
            >
              <span class="reaction-emoji">{{ reaction }}</span>
              <span class="reaction-count">{{ count }}</span>
            </div>
          </div>
        </div>
        
        <!-- Approval Results -->
        <div v-if="supportFeature === 'approval' && approvalResult" class="approval-breakdown">
          <div class="approval-stats">
            <div class="stat-item">
              <span class="stat-label">{{ t('agora', 'Approvals') }}</span>
              <span class="stat-value">{{ totalApprovals }}</span>
            </div>
          </div>
        </div>
        
        <!-- Majority Judgment Results -->
        <div v-if="supportFeature === 'majority_judgment' && majorityResult" class="majority-breakdown">
          <div class="grade-distribution">
            <div 
              v-for="(count, grade) in majorityResult.distribution" 
              :key="grade"
              class="grade-bar"
            >
              <span class="grade-label">{{ getGradeLabel(Number(grade)) }}</span>
              <div class="grade-bar-container">
                <div 
                  class="grade-bar-fill"
                  :style="{ width: `${(count / totalVotes) * 100}%` }"
                ></div>
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { showSuccess, showError } from '@nextcloud/dialogs'
import { t } from '@nextcloud/l10n'
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
import { Inquiry, Option } from '../../Types/index.ts'
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
  ApprovalResult,
  MajorityJudgmentResult
} from '../../Types/votingType'

interface Props {
  item: Inquiry | Option
  itemType: 'inquiry' | 'option'
  context?: unknown
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
const showTooltip = ref(false)
const tooltipHovered = ref(false)
const tooltipTimeout = ref<NodeJS.Timeout | null>(null)

// Computed properties
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

const tooltipStyles = computed(() => ({
  minWidth: `${props.iconSize * 12}px`,
  maxWidth: `${props.iconSize * 14}px`
}))

// Support feature detection
const supportFeature = computed((): SupportFeature => {
  return (props.item?.configuration?.supportFeature as SupportFeature) || 'none'
})

// Current user support
const currentUserSupportValue = computed(() => props.item?.currentUserStatus?.supportValue ?? null)
const hasUserParticipated = computed(() => props.item?.currentUserStatus?.hasSupported ?? false)
const getUserReaction = computed(() => {
  if (supportFeature.value === 'reaction' && currentUserSupportValue.value) {
    return currentUserSupportValue.value as string
  }
  return null
})

// Results from SupportResult table (JSON stored in result field)
const supportResult = computed(() => {
  return (props.item as any)?.supportResult?.result || null
})

const binaryResult = computed(() => {
  if (supportFeature.value === 'binary' && supportResult.value?.type === 'binary') {
    return supportResult.value as BinaryResult
  }
  return null
})

const ternaryResult = computed(() => {
  if (supportFeature.value === 'ternary' && supportResult.value?.type === 'ternary') {
    return supportResult.value as TernaryResult
  }
  return null
})

const scoreResult = computed(() => {
  if (supportFeature.value === 'score' && supportResult.value?.type === 'score') {
    return supportResult.value as ScoreResult
  }
  return null
})

const reactionResult = computed(() => {
  if (supportFeature.value === 'reaction' && supportResult.value?.type === 'reaction') {
    return supportResult.value as ReactionResult
  }
  return null
})

const approvalResult = computed(() => {
  if (supportFeature.value === 'approval' && supportResult.value?.type === 'approval') {
    return supportResult.value as ApprovalResult
  }
  return null
})

const majorityResult = computed(() => {
  if (supportFeature.value === 'majority_judgment' && supportResult.value?.type === 'majority_judgment') {
    return supportResult.value as MajorityJudgmentResult
  }
  return null
})

// Display count based on support feature
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
const totalApprovals = computed(() => {
  if (approvalResult.value) {
    return Object.values(approvalResult.value.counts).reduce((a, b) => a + b, 0)
  }
  return 0
})

const quorumValue = computed(() => props.item?.miscFields?.quorum ?? 0)

// Current user support info for tooltip
const currentUserSupportInfo = computed(() => {
  if (!hasUserParticipated.value) return null
  
  const feature = supportFeature.value
  const value = currentUserSupportValue.value
  
  if (feature === 'binary') {
    return value === 1 ? '✅ ' + t('agora', 'You voted Yes') : null
  }
  if (feature === 'ternary') {
    if (value === 1) return '✅ ' + t('agora', 'You voted In Favor')
    if (value === 0) return '⚪ ' + t('agora', 'You voted Neutral')
    if (value === -1) return '❌ ' + t('agora', 'You voted Against')
  }
  if (feature === 'star') {
    return `⭐ ${value}/5 ` + t('agora', 'stars')
  }
  if (feature === 'score') {
    return `📊 ${value}/10`
  }
  if (feature === 'reaction' && value) {
    return `${value} ` + t('agora', 'reacted')
  }
  if (feature === 'majority_judgment') {
    return `📝 ${getGradeLabel(value as number)}`
  }
  if (feature === 'approval') {
    return '✅ ' + t('agora', 'Approved')
  }
  if (feature === 'ranking') {
    return '📊 ' + t('agora', 'Ranked')
  }
  
  return '👍 ' + t('agora', 'Supported')
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

const canSupport = computed(() => {
  if (!props.item) return false
  
  if (props.itemType === 'option') {
    return canSupportOption(props.context)
  } 
  return canSupportInquiry(props.context)
})

const isReadonly = computed(() => props.viewOnly || !canSupport.value)

// Helper functions
const getSupportLabel = (): string => {
  const feature = supportFeature.value
  
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
  
  return labels[feature] || t('agora', 'Supports')
}

const getGradeLabel = (grade: number): string => {
  const grades = props.item?.configuration?.options?.grades?.labels || 
    ['Reject', 'Insufficient', 'Passable', 'Fairly Good', 'Good', 'Very Good', 'Excellent']
  return grades[grade] || String(grade)
}

// Tooltip handling
const handleMouseEnter = () => {
  if (!props.showDetailsOnHover) return
  
  clearTimeouts()
  
  tooltipTimeout.value = setTimeout(() => {
    showTooltip.value = true
  }, 300)
}

const handleMouseLeave = () => {
  clearTimeouts()
  
  if (!tooltipHovered.value) {
    tooltipTimeout.value = setTimeout(() => {
      showTooltip.value = false
    }, 150)
  }
}

const handleTooltipMouseEnter = () => {
  tooltipHovered.value = true
  clearTimeouts()
}

const handleTooltipMouseLeave = () => {
  tooltipHovered.value = false
  clearTimeouts()
  
  tooltipTimeout.value = setTimeout(() => {
    showTooltip.value = false
  }, 150)
}

const clearTimeouts = () => {
  if (tooltipTimeout.value) {
    clearTimeout(tooltipTimeout.value)
    tooltipTimeout.value = null
  }
}

// Support action handling
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

    // Update option store if needed
    if (props.itemType === 'option' && props.item.id) {
      optionsStore.updateOptionSupportDetails(props.item.id, {
        countSupports: props.item.status.countSupports,
        hasSupported: props.item.currentUserStatus.hasSupported,
        supportValue: props.item.currentUserStatus.supportValue
      })
    }

    // Show appropriate success message
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
  } else {
    if (hasSupportedAfter && !hadSupportedBefore) {
      showSuccess(t('agora', 'Thanks for participating!'), { timeout: 2000 })
    } else {
      showSuccess(t('agora', 'Participation removed!'), { timeout: 2000 })
    }
  }
}

// Initialize tooltip title
if (!props.tooltipTitle) {
  props.tooltipTitle = t('agora', 'Support Details')
}

// Cleanup
onUnmounted(() => {
  clearTimeouts()
})
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
      display: flex;
      align-items: center;
      justify-content: center;
      
      .reaction-emoji {
        font-size: 1.2em;
      }
    }
    
    .star-rating-icon {
      display: flex;
      align-items: center;
      gap: 2px;
      
      .filled {
        color: #fbbf24;
        fill: #fbbf24;
      }
      
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
        color: var(--color-main-text);
        max-width: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    
    .approved {
      color: var(--color-success);
    }
    
    .ranked {
      color: var(--color-primary-element);
    }
  }

  .counter-content {
    display: flex;
    flex-direction: column;
    position: relative;
    min-width: 0;
    height: 100%;
    justify-content: center;

    .support-count {
      display: flex;
      align-items: baseline;
      line-height: 1;

      .counter-value {
        font-weight: 700;
        color: var(--color-main-text);
        line-height: 1;
      }

      .quorum-compact {
        color: var(--color-text-lighter);
        line-height: 1;

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

  .support-tooltip {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10000;
    pointer-events: auto;
    margin-top: 8px;

    &::before {
      content: '';
      position: absolute;
      top: -6px;
      left: 50%;
      transform: translateX(-50%);
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-bottom: 6px solid var(--color-border);
    }

    &::after {
      content: '';
      position: absolute;
      top: -5px;
      left: 50%;
      transform: translateX(-50%);
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 5px solid var(--color-main-background);
    }

    .support-tooltip-content {
      background: var(--color-main-background);
      border: 1px solid var(--color-border);
      border-radius: 12px;
      padding: 16px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
      overflow: hidden;

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
          color: var(--color-main-text);
        }

        .user-support-badge {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 500;

          &.positive {
            background: #10b98120;
            color: #10b981;
          }

          &.neutral {
            background: #6b728020;
            color: #6b7280;
          }

          &.negative {
            background: #ef444420;
            color: #ef4444;
          }
        }
      }

      // Binary breakdown
      .binary-breakdown,
      .ternary-breakdown {
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

            .breakdown-label {
              font-weight: 600;
              color: var(--color-main-text);
            }
          }

          .breakdown-stats {
            display: flex;
            justify-content: space-between;
            margin-bottom: 6px;

            .count {
              font-weight: 700;
            }

            .percentage {
              color: var(--color-text-lighter);
              font-size: 11px;
            }
          }

          .breakdown-bar {
            height: 4px;
            background: var(--color-border);
            border-radius: 2px;
            overflow: hidden;

            .bar-fill {
              height: 100%;
              transition: width 0.3s ease;
            }
          }
        }
      }

      // Score breakdown
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

      // Reaction breakdown
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

            .reaction-emoji {
              font-size: 20px;
              margin-bottom: 4px;
            }

            .reaction-count {
              font-weight: 600;
              font-size: 14px;
            }
          }
        }
      }

      // Majority judgment breakdown
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
          align-items: center;

          .median-label {
            font-size: 12px;
            color: var(--color-text-lighter);
          }

          .median-value {
            font-weight: 700;
            color: var(--color-primary-element);
          }
        }
      }

      // Approval breakdown
      .approval-breakdown {
        margin-bottom: 16px;

        .approval-stats {
          .stat-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px;
            background: var(--color-background-dark);
            border-radius: 8px;

            .stat-label {
              font-size: 13px;
              color: var(--color-text-lighter);
            }

            .stat-value {
              font-size: 20px;
              font-weight: 700;
              color: var(--color-success);
            }
          }
        }
      }

      // Footer
      .tooltip-footer {
        display: flex;
        justify-content: space-between;
        padding-top: 12px;
        margin-top: 4px;
        border-top: 1px solid var(--color-border);

        .summary-item {
          display: flex;
          flex-direction: column;
          gap: 4px;

          .summary-label {
            font-size: 11px;
            color: var(--color-text-lighter);
          }

          .summary-value {
            font-weight: 700;
            color: var(--color-main-text);

            &.reached {
              color: var(--color-success);
            }
          }
        }
      }
    }
  }
}

// Responsive
@media (max-width: 768px) {
  .counter-item.supports {
    .support-tooltip {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 90vw;
      max-width: 360px;
      z-index: 99999;

      &::before,
      &::after {
        display: none;
      }
    }
  }
}
</style>
