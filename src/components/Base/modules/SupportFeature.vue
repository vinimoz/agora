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
    :no-focus-trap="true"
    placement="bottom">
    <template #trigger>
        <div
                ref="containerRef"
                class="counter-item supports"
                :class="{
                        'clickable': canSupport && !isReadonly,
                        'disabled': !canSupport || isReadonly,
                        'has-support': hasUserParticipated,
                        'has-star-rating': supportFeature === 'star',
                        'has-majority-judgment': supportFeature === 'majority_judgment',
                        'has-reaction': supportFeature === 'reaction',
                        'has-score': supportFeature === 'score',
                        'has-approval': supportFeature === 'approval'
                        }"
                :style="containerStyles"
                @click="handleSupportClick">
            <!-- Icon based on support feature type -->
            <div class="counter-icon" :style="iconContainerStyles">
                <template v-if="supportFeature === 'ternary' || supportFeature === 'binary'">
                    <TernarySupportIcon
                            :support-value="Number(currentUserSupportValue)"
                            :size="iconSize" />
                </template>

                <ThumbIcon
                        v-else-if="supportFeature === 'approval'"
                        :supported="hasUserParticipated"
                        :size="iconSize" />

                <div v-else-if="supportFeature === 'reaction'" class="reaction-icon">
                    <span class="reaction-emoji">{{ getUserReaction || '👍' }}</span>
                </div>
                <div v-else-if="supportFeature === 'star'" class="star-rating-icon">
                    <span v-if="hasUserParticipated" class="rating-value">{{ currentUserSupportValue }}</span>
                    <div class="stars-container">
                        <Star 
                         v-for="n in 5" 
                         :key="n"
                         :size="12"
                         :class="{ filled: hasUserParticipated && (currentUserSupportValue as number) >= n }"
                         />
                    </div>
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
                    <span class="counter-value">
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

        <div v-if="!hasDetailedResults" class="no-results-message">
            <p>{{ t('agora', 'No detailed results available yet.') }}</p>
            <p v-if="totalParticipants > 0" class="total-participants">
            {{ t('agora', 'Total participants: {count}', { count: totalParticipants }) }}
            </p>
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
                            <span class="count">{{ ternaryResult.totals.yes }}</span>
                            <span class="percentage">({{ Math.round(ternaryResult.percentages.yes) }}%)</span>
                        </div>
                        <div class="breakdown-bar">
                            <div class="bar-fill positive-bar" :style="{ width: `${ternaryResult.percentages.yes}%` }" />
                            </div>
                        </div>

                        <div class="breakdown-item neutral">
                            <div class="breakdown-header">
                                <TernarySupportIcon :support-value="0" :size="iconSize * 0.8" />
                                <span class="breakdown-label">{{ t('agora', 'Neutral') }}</span>
                            </div>
                            <div class="breakdown-stats">
                                <span class="count">{{ ternaryResult.totals.abstain }}</span>
                                <span class="percentage">({{ Math.round(ternaryResult.percentages.abstain) }}%)</span>
                            </div>
                            <div class="breakdown-bar">
                                <div class="bar-fill neutral-bar" :style="{ width: `${ternaryResult.percentages.abstain}%` }" />
                                </div>
                            </div>

                            <div class="breakdown-item negative">
                                <div class="breakdown-header">
                                    <ThumbIcon :supported="false" :size="iconSize * 0.8" />
                                    <span class="breakdown-label">{{ t('agora', 'Against') }}</span>
                                </div>
                                <div class="breakdown-stats">
                                    <span class="count">{{ ternaryResult.totals.no }}</span>
                                    <span class="percentage">({{ Math.round(ternaryResult.percentages.no) }}%)</span>
                                </div>
                                <div class="breakdown-bar">
                                    <div class="bar-fill negative-bar" :style="{ width: `${ternaryResult.percentages.no}%` }" />
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Score Results -->
                            <div v-if="supportFeature === 'score' && scoreResult" class="score-breakdown">
                                <div class="score-summary">
                                    <div class="score-stat">
                                        <span class="stat-label">{{ t('agora', 'Average') }}</span>
                                        <span class="stat-value">{{ scoreResult.average ? scoreResult.average.toFixed(1) : '0.0' }}</span>
                                    </div>
                                    <div class="score-stat">
                                        <span class="stat-label">{{ t('agora', 'Total Votes') }}</span>
                                        <span class="stat-value">{{ scoreResult.total || 0 }}</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Star Results -->
                            <div v-if="supportFeature === 'star' && starResult" class="score-breakdown">
                                <div class="score-summary">
                                    <div class="score-stat">
                                        <span class="stat-label">{{ t('agora', 'Average') }}</span>
                                        <span class="stat-value">{{ starResult.totals.average ? starResult.totals.average.toFixed(1) : '0.0' }}</span>
                                    </div>
                                    <div class="score-stat">
                                        <span class="stat-label">{{ t('agora', 'Total Ratings') }}</span>
                                        <span class="stat-value">{{ starResult.totals.total || 0 }}</span>
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

                            <!-- Approval Results -->
                            <div v-if="supportFeature === 'approval' && approvalResult" class="binary-breakdown">
                                <div class="breakdown-item positive">
                                    <div class="breakdown-header">
                                        <ThumbIcon :supported="true" :size="iconSize * 0.8" />
                                        <span class="breakdown-label">{{ t('agora', 'Approved') }}</span>
                                    </div>
                                    <div class="breakdown-stats">
                                        <span class="count">{{ approvalResult.totals.approved }}</span>
                                        <span class="percentage" v-if="approvalResult.totals.total > 0">({{ Math.round(approvalResult.percentages.approved) }}%)</span>
                                        <span class="percentage" v-else>(0%)</span>
                                    </div>
                                    <div class="breakdown-bar">
                                        <div class="bar-fill positive-bar" 
                                             :style="{ width: `${approvalResult.percentages.approved}%` }" />
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
                                                 :style="{ width: `${majorityResult.total_votes > 0 ? (count / majorityResult.total_votes) * 100 : 0}%` }" />
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
                    :support-value="Number(currentUserSupportValue)"
                    :size="iconSize" />

            <ThumbIcon
                    v-else-if="supportFeature === 'binary'"
                    :supported="hasUserParticipated"
                    :size="iconSize" />

            <div v-else-if="supportFeature === 'reaction'" class="reaction-icon">
                <span class="reaction-emoji">{{ getUserReaction || '👍' }}</span>
            </div>

            <div v-else-if="supportFeature === 'star'" class="star-rating-icon">
                <div class="stars-container">
                    <Star 
                     v-for="n in 5" 
                     :key="n"
                     :size="iconSize * 0.7"
                     :class="{ filled: hasUserParticipated && (currentUserSupportValue as number) >= n }"
                     />
                </div>
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
import { useSupportsStore } from '../../../stores/supports'
import { useSessionStore } from '../../../stores/session'
import { useOptionsStore } from '../../../stores/options'
import TernarySupportIcon from '../../AppIcons/modules/TernarySupportIcon.vue'
import ThumbIcon from '../../AppIcons/modules/ThumbIcon.vue'
import { 
  Star, 
  Hash, 
  Gauge, 
  ListOrdered, 
  TrendingUp 
} from 'lucide-vue-next'
import type { Inquiry, Option } from '../../../Types/index.ts'
import {
  canSupportOption,
  canSupport as canSupportInquiry
} from '../../../utils/permissions.ts'
import type { 
  SupportFeature,
  BinaryResult,
  TernaryResult,
  ScoreResult,
  ReactionResult,
  MajorityJudgmentResult,
  ApprovalResult,
} from '../../../Types/votingType'

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
const normalizedSupportResult = computed(() => {
  const raw = (props.item as any)?.status?.supportResult
  if (!raw) return null

  // If it's an array, assume the first element contains the actual result
  let actual = raw
  if (Array.isArray(raw) && raw.length > 0) {
    actual = raw[0].result ?? raw[0]
  }

  // If it's a string, try to parse it
  if (typeof actual === 'string') {
    try {
      actual = JSON.parse(actual)
    } catch (e) {
      console.error('Failed to parse support result:', e)
      return null
    }
  }

  // If it's still not an object, return null
  if (!actual || typeof actual !== 'object') {
    return null
  }

  // Return as is - it already has the correct structure from CSV
  // Just ensure it has a type
  if (!actual.type) {
    console.warn('Result missing type:', actual)
    return null
  }

  return actual
})

// Check if the feature is active and results should be loaded
const shouldShowResults = computed(() => {
  return supportFeature.value !== 'none' && normalizedSupportResult.value !== null
})

const hasDetailedResults = computed(() => {
  if (supportFeature.value === 'binary') return !!binaryResult.value
  if (supportFeature.value === 'ternary') return !!ternaryResult.value
  if (supportFeature.value === 'score') return !!scoreResult.value
  if (supportFeature.value === 'star') return !!starResult.value
  if (supportFeature.value === 'approval') return !!approvalResult.value
  if (supportFeature.value === 'reaction') return !!reactionResult.value
  if (supportFeature.value === 'majority_judgment') return !!majorityResult.value
  return false
})

const hasResults = computed(() => {
  if (supportFeature.value === 'none') return false
  if (supportFeature.value === 'binary') return !!binaryResult.value
  if (supportFeature.value === 'ternary') return !!ternaryResult.value
  if (supportFeature.value === 'star') return !!starResult.value
  if (supportFeature.value === 'score') return !!scoreResult.value
  if (supportFeature.value === 'approval') return !!approvalResult.value
  if (supportFeature.value === 'reaction') return !!reactionResult.value
  if (supportFeature.value === 'majority_judgment') return !!majorityResult.value
  // Fallback - check if we have any result data
  return normalizedSupportResult.value !== null && 
         Object.keys(normalizedSupportResult.value).length > 0
})

const binaryResult = computed(() => {
  if (supportFeature.value !== 'binary' || !normalizedSupportResult.value) {
    return null
  }

  const result = normalizedSupportResult.value

  // Your data structure: { type: 'binary', totals: { yes: 1, no: 0 }, percentages: {...} }
  if (result.type === 'binary' && result.totals) {
    return {
      total_yes: result.totals.yes || 0,
      total_no: result.totals.no || 0,
      percentage_yes: result.percentages?.yes || 0,
      percentage_no: result.percentages?.no || 0
    }
  }

  return null
})

const ternaryResult = computed(() => {
  if (supportFeature.value !== 'ternary' || !normalizedSupportResult.value) {
    return null
  }

  const result = normalizedSupportResult.value

  // Your data structure: { type: 'ternary', totals: {...}, percentages: {...} }
  if (result.type === 'ternary' && result.totals) {
    return {
      totals: {
        yes: result.totals.yes || 0,
        no: result.totals.no || 0,
        abstain: result.totals.abstain || 0
      },
      percentages: {
        yes: result.percentages?.yes || 0,
        no: result.percentages?.no || 0,
        abstain: result.percentages?.abstain || 0
      }
    }
  }

  return null
})

const starResult = computed(() => {
  if (supportFeature.value !== 'star' || !normalizedSupportResult.value) {
    return null
  }

  const result = normalizedSupportResult.value
  
  // Your data structure: { type: 'star', totals: { total: 2, average: 2.5 } }
  if (result.type === 'star' && result.totals) {
    return {
      totals: {
        total: result.totals.total || 0,
        average: result.totals.average || 0
      }
    }
  }

  return null
})

const scoreResult = computed(() => {
  if (supportFeature.value !== 'score' || !normalizedSupportResult.value) {
    return null
  }

  const result = normalizedSupportResult.value
  
  // Your data structure: { type: 'score', totals: { total: 2, average: 7 } }
  if (result.type === 'score' && result.totals) {
    return {
      average: result.totals.average || 0,
      total: result.totals.total || 0
    }
  }

  return null
})

const approvalResult = computed(() => {
  if (supportFeature.value !== 'approval' || !normalizedSupportResult.value) {
    return null
  }

  const result = normalizedSupportResult.value

  // Your data structure: { type: 'approval', counts: [] }
  if (result.type === 'approval') {
    const counts = result.counts || []
    const totalApproved = counts.reduce((a: number, b: number) => a + b, 0)
    const total = counts.length
    
    return {
      totals: {
        approved: totalApproved,
        total: total
      },
      percentages: {
        approved: total > 0 ? (totalApproved / total) * 100 : 0
      }
    }
  }

  return null
})

const reactionResult = computed(() => {
  if (supportFeature.value !== 'reaction' || !normalizedSupportResult.value) {
    return null
  }

  const result = normalizedSupportResult.value
  
  // Your data structure: { type: 'reaction', counts: {...} }
  if (result.type === 'reaction' && result.counts) {
    return {
      counts: result.counts
    }
  }

  return null
})

const majorityResult = computed(() => {
  if (supportFeature.value !== 'majority_judgment' || !normalizedSupportResult.value) {
    return null
  }

  const result = normalizedSupportResult.value
  
  // Your data structure: { type: 'majority_judgment', grades: [...], total_votes: 0 }
  if (result.type === 'majority_judgment') {
    // Create distribution from grades (all zeros since no votes)
    const distribution: Record<number, number> = {}
    if (result.grades && Array.isArray(result.grades)) {
      result.grades.forEach((_: string, index: number) => {
        distribution[index] = 0
      })
    }
    
    return {
      distribution: distribution,
      median: 0,
      total_votes: result.total_votes || 0
    }
  }

  return null
})

const displayCount = computed(() => {
  // Early return for 'none' feature
  if (supportFeature.value === 'none') {
    return props.item?.status?.countSupports ?? 0
  }

  // Binary
  if (binaryResult.value) {
    return (binaryResult.value.total_yes || 0) + (binaryResult.value.total_no || 0)
  }
  
  // Ternary
  if (ternaryResult.value?.totals) {
    const totals = ternaryResult.value.totals
    return (totals.yes || 0) + (totals.no || 0) + (totals.abstain || 0)
  }
  
  // Star
  if (starResult.value?.totals?.total) {
    return starResult.value.totals.total
  }
  
  // Score
  if (scoreResult.value?.total) {
    return scoreResult.value.total
  }
  
  // Reaction
  if (reactionResult.value?.counts) {
    return Object.values(reactionResult.value.counts).reduce((a, b) => a + b, 0)
  }
  
  // Majority Judgment
  if (majorityResult.value?.total_votes !== undefined) {
    return majorityResult.value.total_votes
  }
  
  // Approval
  if (approvalResult.value?.totals?.approved !== undefined) {
    return approvalResult.value.totals.approved
  }
  
  return props.item?.status?.countSupports ?? 0
})

const totalParticipants = computed(() => displayCount.value)

const quorumValue = computed(() => 
  (props.item as any)?.miscFields?.quorum ?? 0
)

interface SupportTemplate {
  grades?: Record<number, string>
  allowed_reactions?: string[]
}

const supportTemplate = computed<SupportTemplate | null>(() => {
  const raw = (props.item as any)?.miscFields?.support_template
  if (typeof raw === 'string' && raw) {
    try { return JSON.parse(raw) }
    catch { return null }
  }
  if (raw && typeof raw === 'object') return raw
  return null
})

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
    none: t('agora', 'Supports')
  }

  return labels[supportFeature.value] || t('agora', 'Supports')
}

const getGradeLabel = (grade: number): string => {
  // First try support_template
  if (supportTemplate.value?.grades && supportTemplate.value.grades[grade]) {
    return supportTemplate.value.grades[grade]
  }
  // Fallback to default grades
  const grades = [
    t('agora', 'Reject'),
    t('agora', 'Insufficient'),
    t('agora', 'Passable'),
    t('agora', 'Fairly Good'),
    t('agora', 'Good'),
    t('agora', 'Very Good'),
    t('agora', 'Excellent')
  ]

  return grades[grade] || ''
}

// Support action
const handleSupportClick = async () => {
  if (!canSupport.value || isReadonly.value) {
    return
  }

  const hadSupportedBefore = props.item.currentUserStatus?.hasSupported
  const currentValue = props.item.currentUserStatus?.supportValue
  const feature = supportFeature.value

  // Skip complex features
  if (feature === 'ranking' || feature === 'trending') {
    return
  }

  try {
    const supportsStore = useSupportsStore()
    const sessionStore = useSessionStore()
    const optionsStore = useOptionsStore()

    switch (feature) {
      case 'binary':
      case 'approval':
        // Use the store's toggle function
        await supportsStore.toggleBinarySupport(
          props.item.id, 
          sessionStore.currentUser.id, 
          props.item, 
          props.itemType
        )
        break

      case 'ternary':
        await supportsStore.toggleTernarySupport(
          props.item.id, 
          sessionStore.currentUser.id, 
          props.item, 
          props.itemType
        )
        break

      case 'star': {
        let nextValue: number | null = null

        if (!hadSupportedBefore) {
          nextValue = 5
        } else if (currentValue === 5) {
          nextValue = 4
        } else if (currentValue === 4) {
          nextValue = 3
        } else if (currentValue === 3) {
          nextValue = 2
        } else if (currentValue === 2) {
          nextValue = 1
        } else if (currentValue === 1) {
          nextValue = null
        }

        await supportsStore.submitScoreSupport(
          props.item.id, sessionStore.currentUser.id,
          props.item, props.itemType, nextValue
        )
        break
      }

      case 'score': {
        let nextValue: number | null = null

        if (!hadSupportedBefore) {
          nextValue = 10
        } else if (typeof currentValue === 'number' && currentValue > 0) {
          nextValue = currentValue - 1
        } else if (currentValue === 0) {
          nextValue = null
        }

        await supportsStore.submitScoreSupport(
          props.item.id, sessionStore.currentUser.id,
          props.item, props.itemType, nextValue
        )
        break
      }

      case 'reaction': {
        const reactions = supportTemplate.value?.allowed_reactions || ['👍', '❤️', '🎉', '🤔', '👎']
        const currentReaction = getUserReaction.value
        let nextReaction: string | null = null

        if (!hadSupportedBefore) {
          nextReaction = reactions[0]
        } else {
          const currentIndex = reactions.indexOf(currentReaction as string)
          if (currentIndex !== -1 && currentIndex < reactions.length - 1) {
            nextReaction = reactions[currentIndex + 1]
          } else {
            nextReaction = null // Remove after last reaction
          }
        }

        if (nextReaction) {
          // For single reaction cycling, we store as string, not array
          await supportsStore.submitScoreSupport(
            props.item.id, sessionStore.currentUser.id,
            props.item, props.itemType, nextReaction
          )
        } else if (currentReaction) {
          // Remove reaction
          await supportsStore.removeSupport(
            props.item.id, sessionStore.currentUser.id,
            props.itemType === 'option' ? props.item.id : 0
          )
        }
        break
      }

      case 'majority_judgment': {
        const grades = supportTemplate.value?.grades || [
          'Reject', 'Insufficient', 'Passable', 
          'Fairly Good', 'Good', 'Very Good', 'Excellent'
        ]
        const maxGrade = grades.length - 1
        const currentGrade = typeof currentValue === 'number' ? currentValue : null

        let nextValue: number | null = null

        if (!hadSupportedBefore) {
          nextValue = maxGrade
        } else if (currentGrade !== null && currentGrade > 0) {
          nextValue = currentGrade - 1
        } else if (currentGrade === 0) {
          nextValue = null
        }

        await supportsStore.submitScoreSupport(
          props.item.id, sessionStore.currentUser.id,
          props.item, props.itemType, nextValue
        )
        break
      }

      default:
        return
    }

    // Update store if needed
    if (props.itemType === 'option' && props.item.id) {
      optionsStore.updateOptionSupportDetails(props.item.id, {
        countSupports: props.item.status?.countSupports ?? 0,
        hasSupported: props.item.currentUserStatus?.hasSupported ?? false,
        supportValue: props.item.currentUserStatus?.supportValue ?? null
      })
    }

    emit('support-toggled', props.item.id, props.item.currentUserStatus?.hasSupported ?? false)
    showSupportSuccessMessage(hadSupportedBefore ?? false)

  } catch (error) {
    console.error('Failed to toggle support:', error)
    showError(t('agora', 'Failed to update support status'))
  }
}

const showSupportSuccessMessage = (hadSupportedBefore: boolean) => {
  const hasSupportedAfter = props.item.currentUserStatus?.hasSupported
  const supportValueAfter = props.item.currentUserStatus?.supportValue
  const feature = supportFeature.value

  switch (feature) {
    case 'binary':
      if (supportValueAfter === 1) {
        showSuccess(t('agora', 'Voted: Yes'), { timeout: 2000 })
      } else if (supportValueAfter === -1) {
        showSuccess(t('agora', 'Voted: No'), { timeout: 2000 })
      } else {
        showSuccess(t('agora', 'Vote removed'), { timeout: 2000 })
      }
      break

    case 'ternary':
      if (supportValueAfter === 1) {
        showSuccess(t('agora', 'Voted: In Favor'), { timeout: 2000 })
      } else if (supportValueAfter === 0) {
        showSuccess(t('agora', 'Voted: Neutral'), { timeout: 2000 })
      } else if (supportValueAfter === -1) {
        showSuccess(t('agora', 'Voted: Against'), { timeout: 2000 })
      } else {
        showSuccess(t('agora', 'Vote removed'), { timeout: 2000 })
      }
      break

    case 'approval':
      if (hasSupportedAfter) {
        showSuccess(t('agora', 'Approved'), { timeout: 2000 })
      } else {
        showSuccess(t('agora', 'Approval removed'), { timeout: 2000 })
      }
      break

    case 'star':
      if (supportValueAfter) {
        showSuccess(t('agora', 'Rating: {stars} stars', { stars: supportValueAfter }), { timeout: 2000 })
      } else {
        showSuccess(t('agora', 'Rating removed'), { timeout: 2000 })
      }
      break

    case 'score':
      if (supportValueAfter !== null) {
        showSuccess(t('agora', 'Score: {score}/10', { score: supportValueAfter }), { timeout: 2000 })
      } else {
        showSuccess(t('agora', 'Score removed'), { timeout: 2000 })
      }
      break

    case 'reaction':
      if (hasSupportedAfter && getUserReaction.value) {
        showSuccess(t('agora', 'Reaction: {reaction}', { reaction: getUserReaction.value }), { timeout: 2000 })
      } else {
        showSuccess(t('agora', 'Reaction removed'), { timeout: 2000 })
      }
      break

    case 'majority_judgment':
      if (supportValueAfter !== null) {
        const gradeLabel = getGradeLabel(supportValueAfter as number)
        showSuccess(t('agora', 'Grade: {grade}', { grade: gradeLabel }), { timeout: 2000 })
      } else {
        showSuccess(t('agora', 'Grade removed'), { timeout: 2000 })
      }
      break

    default:
      if (hasSupportedAfter && !hadSupportedBefore) {
        showSuccess(t('agora', 'Supported'), { timeout: 2000 })
      } else if (!hasSupportedAfter && hadSupportedBefore) {
        showSuccess(t('agora', 'Support removed'), { timeout: 2000 })
      }
  }
}
</script>
<style lang="scss" scoped>
.counter-item.supports {
    display: inline-flex;
    align-items: center;
    transition: all 0.2s ease;
    position: relative;
    user-select: none;
    white-space: nowrap;
    min-height: 32px;
    height: auto;
    min-width: auto;
    border: 1px solid var(--color-border);
    background: var(--color-main-background);
    border-radius: 16px;
    padding: 4px 8px;
    gap: 4px;
    box-sizing: border-box;

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

    &.has-star-rating {
    min-width: 100px;
    width: auto; // Allow natural growth
    max-width: 150px; // Optional: set a max width if needed
    
    .counter-content {
        .support-count {
            .counter-value {
                min-width: 28px;
                text-align: right;
            }
        }
    }
}

&.has-majority-judgment {
    min-width: 110px;
    width: auto; // Allow natural growth
    max-width: 160px; // Optional: set a max width if needed
    gap: 2px; 
    .counter-content {
        .support-count {
            .counter-value {
                min-width: 28px;
                text-align: right;
            }
        }
        
        .counter-label {
            white-space: nowrap; // Prevent label from wrapping
        }
    }
}

    &.has-reaction {
        min-width: 55px;
    }

    &.has-score {
        min-width: 60px;
    }

    &.has-approval {
        min-width: 65px;
    }

    .counter-icon {
        background: linear-gradient(135deg, var(--color-background-darker), var(--color-background-dark));
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        width: 28px;
        height: 28px;
        border-radius: 8px;
        margin-right: 0;
        svg {
            width: 16px !important;
            height: 16px !important;
        }

        .reaction-icon {
            display: flex;
            align-items: center;
            justify-content: center;

            .reaction-emoji { 
                font-size: 16px;
                line-height: 1;
            }
        }

        .star-rating-icon {
            display: flex;
            align-items: center;
            gap: 2px;

            .stars-container {
                display: flex;
                gap: 1px;

                svg {
                    width: 10px !important;
                    height: 10px !important;
                }
            }

            .filled { 
                color: #fbbf24; 
                fill: #fbbf24; 
            }

            .rating-value {
                font-size: 10px;
                font-weight: 600;
                color: var(--color-main-text);
                margin-left: 2px;
            }
        }

        .score-icon {
            display: flex;
            align-items: center;
            gap: 2px;

            svg {
                width: 14px !important;
                height: 14px !important;
            }

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

            svg {
                width: 14px !important;
                height: 14px !important;
            }

            .grade-value {
                font-size: 9px;
                font-weight: 600;
                max-width: 50px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                color: var(--color-main-text);
            }
        }

        .approved { 
            color: var(--color-success);
            width: 16px !important;
            height: 16px !important;
        }

        .ranked { 
            color: var(--color-primary-element);
            width: 16px !important;
            height: 16px !important;
        }
    }

    .counter-content {
        display: flex;
        flex-direction: column;
        min-width: 0;
        justify-content: center;
        align-items: flex-end; // This ensures content is right-aligned
        line-height: 1.2;
        flex: 1; // Take remaining space

        .support-count {
            display: flex;
            align-items: baseline;
            justify-content: flex-end; // Right align the count
            gap: 2px;
            width: 100%; // Take full width

            .counter-value {
                font-weight: 600;
                font-size: 14px;
                color: var(--color-main-text);
                text-align: right; // Ensure text is right-aligned
            }

            .quorum-compact {
                color: var(--color-text-lighter);
                font-size: 10px;

                .quorum-separator {
                    margin: 0 1px;
                }

                .quorum-target {
                    color: var(--color-primary-element);
                    font-weight: 600;
                }
            }
        }

        .counter-label {
            color: var(--color-text-lighter);
            text-transform: uppercase;
            letter-spacing: 0.3px;
            font-weight: 500;
            font-size: 9px;
            line-height: 1.3;
            margin-top: 2px;
            text-align: right; // Right align the label
        }
    }
}

// Additional fix for star rating in simple mode (without popover)
.counter-item.supports:not(.has-star-rating):not(.has-majority-judgment) {
    .counter-content {
        .support-count {
            .counter-value {
                min-width: auto;
            }
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
                font-size: 14px;
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

        .no-results-message {
            text-align: center;
            padding: 16px;
            color: var(--color-text-lighter);

            p {
                margin: 8px 0;
                font-size: 12px;
            }

            .total-participants {
                font-weight: 600;
                color: var(--color-main-text);
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

                    .breakdown-label { 
                        font-weight: 600;
                        font-size: 12px;
                    }
                }

                .breakdown-stats {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 6px;

                    .count { 
                        font-weight: 700;
                        font-size: 14px;
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
                grid-template-columns: repeat(2, 1fr);
                gap: 12px;

                .score-stat {
                    text-align: center;
                    padding: 8px;
                    background: var(--color-background-dark);
                    border-radius: 8px;

                    .stat-label {
                        display: block;
                        font-size: 10px;
                        color: var(--color-text-lighter);
                        margin-bottom: 4px;
                    }

                    .stat-value {
                        font-size: 16px;
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
                    transition: all 0.2s ease;

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
                        font-size: 13px;
                    }
                }
            }
        }

        .majority-breakdown {
            margin-bottom: 16px;

            .grade-distribution {
                display: flex;
                flex-direction: column;
                gap: 8px;

                .grade-bar {
                    display: flex;
                    align-items: center;
                    gap: 8px;

                    .grade-label {
                        min-width: 70px;
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
                        min-width: 35px;
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
                    font-size: 11px;
                    color: var(--color-text-lighter);
                }

                .median-value { 
                    font-weight: 700;
                    font-size: 13px;
                    color: var(--color-primary-element);
                }
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
                    font-size: 10px;
                    color: var(--color-text-lighter);
                    display: block;
                    margin-bottom: 2px;
                }

                .summary-value { 
                    font-weight: 700;
                    font-size: 13px;

                    &.reached { 
                        color: var(--color-success);
                    }
                }
            }
        }
    }
}
</style>
