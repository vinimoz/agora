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
    placement="bottom"
  >
    <template #trigger>
      <div
        ref="containerRef"
        class="counter-item supports"
        :class="{
          clickable: canSupport && !isReadonly,
          disabled: !canSupport || isReadonly,
          'has-support': hasUserParticipated,
          'has-star-rating': supportFeature === 'star',
          'has-majority-judgment': supportFeature === 'majority_judgment',
          'has-reaction': supportFeature === 'reaction',
          'has-score': supportFeature === 'score',
          'has-approval-delib': supportFeature === 'approval_delib',
        }"
        :style="containerStyles"
        @click="handleSupportClick"
      >
        <!-- Icon based on support feature type -->
        <div class="counter-icon" :style="iconContainerStyles"
            :class="{ 'inactive': !hasUserParticipated && (supportFeature === 'ternary' || supportFeature === 'reaction') }"
            >
          <template v-if="supportFeature === 'ternary' || supportFeature === 'binary'">
            <TernarySupportIcon :support-value="Number(currentUserSupportValue)" :size="iconSize" />
          </template>

          <ThumbIcon
            v-else-if="supportFeature === 'approval_delib'"
            :supported="hasUserParticipated"
            :size="iconSize"
          />

          <div v-else-if="supportFeature === 'reaction'" class="reaction-icon">
            <span class="reaction-emoji" :class="{ 'inactive': !hasUserParticipated }">{{ getUserReaction || '👍' }}</span>
          </div>
          <div v-else-if="supportFeature === 'star'" class="star-rating-icon">
            <span v-if="hasUserParticipated" class="rating-value">{{
              currentUserSupportValue
            }}</span>
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
            <span v-if="hasUserParticipated" class="score-value">{{
              currentUserSupportValue
            }}</span>
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
            :class="{ ranked: hasUserParticipated }"
          />

          <TrendingUp v-else-if="supportFeature === 'trending'" :size="iconSize" />

          <ThumbIcon v-else :supported="false" :size="iconSize" class="disabled-icon" />
        </div>

        <!-- Counter Content -->
        <div class="counter-content">
          <NcCounterBubble
            :count="displayCount"
            :active="hasUserParticipated"
            :type="getCounterType()"
            :raw="true"
          />
          <div class="counter-label-wrapper">
            <span class="counter-label" :style="{ fontSize: `${iconSize * 0.5}px` }">
              {{ getSupportLabel() }}
            </span>
            <span
              v-if="showQuorum && quorumValue"
              class="quorum-compact"
              :style="{ fontSize: `${iconSize * 0.6}px` }"
            >
              <span class="quorum-separator"> / </span>
              <span class="quorum-target">{{ quorumValue }}</span>
            </span>
          </div>
        </div>
      </div>
    </template>

    <!-- Popover Content -->
    <div class="support-tooltip-content">
      <!-- Tooltip Header -->
      <div class="tooltip-header">
        <h4 :style="{ fontSize: `${iconSize * 0.65}px` }">{{ resolvedTooltipTitle }}</h4>
        <span v-if="currentUserSupportInfo" class="user-support-badge" :class="userSupportClass">
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
            <div
              class="bar-fill positive-bar"
              :style="{ width: `${binaryResult.percentage_yes}%` }"
            />
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
            <div
              class="bar-fill negative-bar"
              :style="{ width: `${binaryResult.percentage_no}%` }"
            />
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
            <div
              class="bar-fill positive-bar"
              :style="{ width: `${ternaryResult.percentages.yes}%` }"
            />
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
            <div
              class="bar-fill neutral-bar"
              :style="{ width: `${ternaryResult.percentages.abstain}%` }"
            />
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
            <div
              class="bar-fill negative-bar"
              :style="{ width: `${ternaryResult.percentages.no}%` }"
            />
          </div>
        </div>
      </div>

      <!-- Score Results -->
      <div v-if="supportFeature === 'score' && scoreResult" class="score-breakdown">
        <div class="score-summary">
          <div class="score-stat">
            <span class="stat-label">{{ t('agora', 'Average') }}</span>
            <span class="stat-value">{{
              scoreResult.average ? scoreResult.average.toFixed(1) : '0.0'
            }}</span>
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
            <span class="stat-value">{{
              starResult.totals.average ? starResult.totals.average.toFixed(1) : '0.0'
            }}</span>
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
            :class="{ selected: getUserReaction === reaction }"
          >
            <span class="reaction-emoji">{{ reaction }}</span>
            <span class="reaction-count">{{ count }}</span>
          </div>
        </div>
      </div>

      <!-- Approval Results -->
      <div
        v-if="supportFeature === 'approval_delib' && approvalDelibResult"
        class="binary-breakdown"
      >
        <div class="breakdown-item positive">
          <div class="breakdown-header">
            <ThumbIcon :supported="true" :size="iconSize * 0.8" />
            <span class="breakdown-label">{{ t('agora', 'Approved') }}</span>
          </div>
          <div class="breakdown-stats">
            <span class="count">{{ approvalDelibResult.totals.approved }}</span>
            <span v-if="approvalDelibResult.totals.total > 0" class="percentage"
              >({{ Math.round(approvalDelibResult.percentages.approved) }}%)</span
            >
            <span v-else class="percentage">(0%)</span>
          </div>
          <div class="breakdown-bar">
            <div
              class="bar-fill positive-bar"
              :style="{ width: `${approvalDelibResult.percentages.approved}%` }"
            />
          </div>
        </div>
      </div>

      <!-- Majority Judgment Results -->
      <div
        v-if="supportFeature === 'majority_judgment' && majorityResult"
        class="majority-breakdown"
      >
        <div class="grade-distribution">
          <div
            v-for="(count, gradeIndex) in majorityResult.distribution"
            :key="gradeIndex"
            class="grade-bar"
          >
            <span class="grade-label">{{ getGradeLabel(Number(gradeIndex)) }}</span>
            <div class="grade-bar-container">
              <div
                class="grade-bar-fill"
                :style="{
                  width: `${majorityResult.total_votes > 0 ? (count / majorityResult.total_votes) * 100 : 0}%`,
                }"
              />
            </div>
            <span class="grade-count">{{ count }}</span>
          </div>
        </div>
        <div class="median-info">
          <span class="median-label">{{ t('agora', 'Median Grade') }}:</span>
          <span class="median-value">
            {{ majorityResult.median_label || getGradeLabel(majorityResult.median) }}
          </span>
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
      clickable: canSupport && !isReadonly,
      disabled: !canSupport || isReadonly,
      'has-support': hasUserParticipated,
    }"
    :style="containerStyles"
    @click="handleSupportClick"
  >
    <div class="counter-icon" :style="iconContainerStyles">
      <TernarySupportIcon
        v-if="supportFeature === 'ternary'"
        :support-value="Number(currentUserSupportValue)"
        :size="iconSize"
      />

      <ThumbIcon
        v-else-if="supportFeature === 'binary'"
        :supported="hasUserParticipated"
        :size="iconSize"
      />

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
        :class="{ ranked: hasUserParticipated }"
      />

      <TrendingUp v-else-if="supportFeature === 'trending'" :size="iconSize" />

      <ThumbIcon v-else :supported="false" :size="iconSize" class="disabled-icon" />
    </div>
    <div class="counter-content">
      <NcCounterBubble
        :count="displayCount"
        :active="hasUserParticipated"
        :type="getCounterType()"
        :raw="true"
      />
      <div class="counter-label-wrapper">
        <span class="counter-label" :style="{ fontSize: `${iconSize * 0.5}px` }">
          {{ getSupportLabel() }}
        </span>
        <span
          v-if="showQuorum && quorumValue"
          class="quorum-compact"
          :style="{ fontSize: `${iconSize * 0.6}px` }"
        >
          <span class="quorum-separator"> / </span>
          <span class="quorum-target">{{ quorumValue }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { showSuccess, showError } from '@nextcloud/dialogs'
import { t } from '@nextcloud/l10n'
import NcPopover from '@nextcloud/vue/components/NcPopover'
import { useSupportsStore } from '../../../stores/supports'
import { useOptionsStore } from '../../../stores/options'
import { useSessionStore } from '../../../stores/session'
import TernarySupportIcon from '../../AppIcons/modules/TernarySupportIcon.vue'
import ThumbIcon from '../../AppIcons/modules/ThumbIcon.vue'
import NcCounterBubble from '@nextcloud/vue/components/NcCounterBubble'
import { Star, Hash, Gauge, ListOrdered, TrendingUp } from 'lucide-vue-next'
import type { Inquiry, Option } from '../../../Types/index.ts'
import { canSupportOption, canSupport as canSupportInquiry } from '../../../utils/permissions.ts'
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
  viewOnly: false,
})

// Refs
const containerRef = ref<HTMLElement>()

// Computed tooltip title - use computed instead of mutating props
const resolvedTooltipTitle = computed(() => props.tooltipTitle || t('agora', 'Support Details'))

// Support feature from item configuration
const supportFeature = computed(
  (): SupportFeature => (props.item?.configuration?.supportFeature as SupportFeature) || 'none'
)
console.log(' SUPPORT FEATURE ', supportFeature)
// Current user support
const currentUserSupportValue = computed(() => props.item?.currentUserStatus?.supportValue ?? null)

const hasUserParticipated = computed(() => props.item?.currentUserStatus?.hasSupported ?? false)

const getUserReaction = computed(() => {
  if (supportFeature.value !== 'reaction') return null
  const raw = currentUserSupportValue.value
  if (!raw) return null

  let value = raw
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value)
      if (parsed?.value) value = parsed.value
    } catch {}
  } else if (value && typeof value === 'object' && 'value' in value) {
    value = value.value
  }

  if (!value) return null
  if (Array.isArray(value) && value.length > 0) value = value[0]

  // Normalise: remove variation selectors (U+FE0F) and trim
  return typeof value === 'string' ? value.replace(/[\uFE0F]/g, '').trim() : null
})

const getCounterType = (): 'highlighted' | 'outlined' | '' => {
  if (hasUserParticipated.value) return 'highlighted'
  if (displayCount.value > 0) return 'outlined'
  return ''
}

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
  console.log('Support Feature:', supportFeature.value)
  console.log('Normalized Result:', normalizedSupportResult.value)

  return actual
})

// Check if the feature is active and results should be loaded
const shouldShowResults = computed(
  () => supportFeature.value !== 'none' && normalizedSupportResult.value !== null
)

const hasDetailedResults = computed(() => {
  if (supportFeature.value === 'binary') return !!binaryResult.value
  if (supportFeature.value === 'ternary') return !!ternaryResult.value
  if (supportFeature.value === 'score') return !!scoreResult.value
  if (supportFeature.value === 'star') return !!starResult.value
  if (supportFeature.value === 'approval_delib') return !!approvalDelibResult.value
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
  if (supportFeature.value === 'approval_delib') return !!approvalDelibResult.value
  if (supportFeature.value === 'reaction') return !!reactionResult.value
  if (supportFeature.value === 'majority_judgment') return !!majorityResult.value
  // Fallback - check if we have any result data
  return (
    normalizedSupportResult.value !== null && Object.keys(normalizedSupportResult.value).length > 0
  )
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
      percentage_no: result.percentages?.no || 0,
    }
  }

  return null
})

const ternaryResult = computed(() => {
  console.log('Ternary Result:', ternaryResult.value)
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
        abstain: result.totals.abstain || 0,
      },
      percentages: {
        yes: result.percentages?.yes || 0,
        no: result.percentages?.no || 0,
        abstain: result.percentages?.abstain || 0,
      },
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
        average: result.totals.average || 0,
      },
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
      total: result.totals.total || 0,
    }
  }

  return null
})

const approvalDelibResult = computed(() => {
  if (supportFeature.value !== 'approval_delib' || !normalizedSupportResult.value) {
    return null
  }

  const result = normalizedSupportResult.value

  if (result.type === 'approval_delib' && result.totals) {
    return {
      totals: {
        approved: result.totals.approved || 0,
        total: result.totals.total || 0,
      },
      percentages: {
        approved: result.percentages?.approved || 0,
      },
    }
  }

  return null
})

const reactionResult = computed(() => {
  console.log('Reaction Result:', reactionResult.value)
  if (supportFeature.value !== 'reaction' || !normalizedSupportResult.value) {
    return null
  }

  const result = normalizedSupportResult.value

  // Your data structure: { type: 'reaction', counts: {...} }
  if (result.type === 'reaction' && result.counts) {
    return {
      counts: result.counts,
    }
  }

  return null
})

const majorityResult = computed(() => {
  console.log('Majority Result:', majorityResult.value)
  if (supportFeature.value !== 'majority_judgment' || !normalizedSupportResult.value) {
    return null
  }

  const result = normalizedSupportResult.value

  // Handle the nested structure from your CSV
  if (result.type === 'majority_judgment') {
    // For inquiries with options (like #4 and #5004)
    if (result.options && Object.keys(result.options).length > 0) {
      // Get the first option's data (or find the winner)
      const firstOptionId = Object.keys(result.options)[0]
      const optionData = result.options[firstOptionId]

      if (optionData && optionData.grade_distribution) {
        // Convert the distribution object to array format
        const distribution: Record<number, number> = {}
        const gradeLabels = result.grades || []

        // Map grade names to indices
        gradeLabels.forEach((gradeName: string, index: number) => {
          distribution[index] = optionData.grade_distribution[gradeName] || 0
        })

        return {
          distribution,
          median: optionData.median_index || 0,
          total_votes: optionData.total_votes || 0,
          median_label: optionData.median_grade || '',
        }
      }
    }

    // For direct result format (if no options wrapper)
    if (result.grade_distribution) {
      const distribution: Record<number, number> = {}
      const gradeLabels = result.grades || []

      gradeLabels.forEach((gradeName: string, index: number) => {
        distribution[index] = result.grade_distribution[gradeName] || 0
      })

      return {
        distribution,
        median: result.median_index || 0,
        total_votes: result.total_votes || 0,
        median_label: result.median_grade || '',
      }
    }

    // Fallback for empty data
    if (result.grades && Array.isArray(result.grades)) {
      const distribution: Record<number, number> = {}
      result.grades.forEach((_: string, index: number) => {
        distribution[index] = 0
      })

      return {
        distribution,
        median: 0,
        total_votes: result.total_votes || 0,
      }
    }
  }

  return null
})

const supportsStore = useSupportsStore()

/*const displayCount = computed(() => {
  const itemId = props.item.id
  const itemType = props.itemType

  let inquiryId: number
  let optionId: number | undefined

  if (itemType === 'option') {
    const option = props.item as Option
    inquiryId = option.targetId || (option as any).inquiryId
    optionId = itemId
  } else {
    inquiryId = itemId
    optionId = undefined
  }

  // Directly filter the reactive array
  const allSupports = supportsStore.supports
  let relevantSupports = allSupports.filter(s => s.inquiryId === inquiryId)

  if (optionId !== undefined && optionId > 0) {
    relevantSupports = relevantSupports.filter(s => s.optionId === optionId)
  } else {
    relevantSupports = relevantSupports.filter(s => !s.optionId || s.optionId === 0)
  }

  const feature = props.item.configuration?.supportFeature || 'none'
  if (feature === 'binary' || feature === 'ternary') {
    return relevantSupports.filter(s => s.value !== null && s.value !== undefined).length
  }
  if (feature === 'star' || feature === 'score') {
    return relevantSupports.filter(s => typeof s.value === 'number').length
  }
  if (feature === 'reaction') {
    return relevantSupports.length // each user has one reaction
  }
  if (feature === 'approval_delib') {
    return relevantSupports.filter(s => s.value === 1).length
  }
  if (feature === 'majority_judgment') {
    return relevantSupports.filter(s => s.value !== null && s.value !== undefined).length
  }

  // Fallback: count all supports for this item
  return relevantSupports.length
})*/

const displayCount = computed(() => props.item?.status?.countSupports ?? 0)

const totalParticipants = computed(() => displayCount.value)

const quorumValue = computed(() => (props.item as any)?.miscFields?.quorum ?? 0)

interface SupportTemplate {
  grades?: Record<number, string>
  allowed_reactions?: string[]
}

const supportTemplate = computed<SupportTemplate | null>(() => {
  const raw = (props.item as any)?.miscFields?.support_template
  if (typeof raw === 'string' && raw) {
    try {
      return JSON.parse(raw)
    } catch {
      return null
    }
  }
  if (raw && typeof raw === 'object') return raw
  return null
})

// Styles
const containerStyles = computed(() => ({
  padding: `${props.iconSize * 0.3}px ${props.iconSize * 0.6}px`,
  gap: `${props.iconSize * 0.5}px`,
  borderRadius: `${props.iconSize * 0.6}px`,
  borderWidth: `${props.iconSize * 0.05}px`,
}))

const iconContainerStyles = computed(() => ({
  width: `${props.iconSize * 1.2}px`,
  height: `${props.iconSize * 1.2}px`,
  borderRadius: `${props.iconSize * 0.3}px`,
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
  if (feature === 'approval_delib') {
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
    binary: t('agora', 'Binary'),
    ternary: t('agora', 'Ternary'),
    reaction: t('agora', 'Reactions'),
    star: t('agora', 'Ratings'),
    score: t('agora', 'Scores'),
    majority_judgment: t('agora', 'Grades'),
    approval_delib: t('agora', 'Approvals'),
    ranking: t('agora', 'Rankings'),
    none: t('agora', 'Supports'),
  }

  return labels[supportFeature.value] || t('agora', 'Supports')
}

const getGradeLabel = (grade: number | string | null): string => {
  if (grade === null || grade === undefined) return ''

  // Convert numeric strings to numbers
  if (typeof grade === 'string') {
    const num = Number(grade)
    if (!isNaN(num)) grade = num
    else return grade // it's a real string label
  }

  if (typeof grade === 'number') {
    const idx = grade
    // Use supportTemplate.grades first
    if (supportTemplate.value?.grades && supportTemplate.value.grades[idx]) {
      return supportTemplate.value.grades[idx]
    }
    // Fallback to result's grades if available
    if (majorityResult.value && (majorityResult.value as any).grades?.[idx]) {
      return (majorityResult.value as any).grades[idx]
    }
    // Default grades
    const defaultGrades = [
      t('agora', 'Reject'),
      t('agora', 'Insufficient'),
      t('agora', 'Passable'),
      t('agora', 'Fairly Good'),
      t('agora', 'Good'),
      t('agora', 'Very Good'),
      t('agora', 'Excellent'),
    ]
    return defaultGrades[idx] || String(idx)
  }

  return String(grade)
}

const handleSupportClick = async () => {
  if (!canSupport.value || isReadonly.value) return

  const hadSupportedBefore = props.item.currentUserStatus?.hasSupported
  const currentValue = props.item.currentUserStatus?.supportValue
  const feature = supportFeature.value

  // Skip non-actionable features
  if (feature === 'ranking' || feature === 'trending') return

  try {
    const supportsStore = useSupportsStore()
    const sessionStore = useSessionStore()
    const optionsStore = useOptionsStore()

    const itemId = props.item.id
    const userId = sessionStore.currentUser.id
    const item = props.item
    const itemType = props.itemType

    switch (feature) {
      case 'binary':
      case 'approval_delib':
        await supportsStore.toggleApprovalDeliberativeSupport(itemId, userId, item, itemType)
        break

      case 'ternary':
        await supportsStore.toggleTernarySupport(itemId, userId, item, itemType)
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
        await supportsStore.submitScoreSupport(itemId, userId, item, itemType, nextValue)
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
        await supportsStore.submitScoreSupport(itemId, userId, item, itemType, nextValue)
        break
      }

      case 'majority_judgment': {
        // Numeric grade indices: 0 = lowest, length-1 = highest
        const gradeLabels = supportTemplate.value?.grades || [
          'Reject',
          'Insufficient',
          'Passable',
          'Fairly Good',
          'Good',
          'Very Good',
          'Excellent',
        ]
        const maxGrade = gradeLabels.length - 1
        const currentGrade = typeof currentValue === 'number' ? currentValue : null
        let nextValue: number | null = null

        if (!hadSupportedBefore) {
          nextValue = maxGrade // start with highest grade
        } else if (currentGrade !== null && currentGrade > 0) {
          nextValue = currentGrade - 1 // move one step down
        } else if (currentGrade === 0) {
          nextValue = null // remove after lowest grade
        }
        await supportsStore.submitScoreSupport(itemId, userId, item, itemType, nextValue)
        break
      }

      case 'reaction': {
        const normaliseReaction = (r: string) => r.replace(/[\uFE0F]/g, '').trim()
        const reactions = (supportTemplate.value?.allowed_reactions ?? []).map(normaliseReaction)
        const currentReaction = normaliseReaction(getUserReaction.value ?? '')
       console.log(" REACTIONS ",reactions)
       let nextReaction: string | null = null

        if (!hadSupportedBefore) {
          nextReaction = reactions[0]
        } else {
          const currentIndex = reactions.indexOf(currentReaction as string)
          if (currentIndex !== -1 && currentIndex < reactions.length - 1) {
            nextReaction = reactions[currentIndex + 1]
          } else {
            nextReaction = null
          }
        }
        console.log(" NEXT REACTION ",nextReaction)
        if (nextReaction) {
          await supportsStore.toggleReactionSupport(itemId, userId, item, itemType, nextReaction)
        } else if (currentReaction) {
          await supportsStore.removeSupport(itemId, userId, itemType === 'option' ? itemId : 0,null)
        }
        break
      }

      default:
        return
    }

    // Update local store and emit
    if (itemType === 'option' && item.id) {
      optionsStore.updateOptionSupportDetails(item.id, {
        countSupports: item.status?.countSupports ?? 0,
        hasSupported: item.currentUserStatus?.hasSupported ?? false,
        supportValue: item.currentUserStatus?.supportValue ?? null,
      })
    }
    emit('support-toggled', item.id, item.currentUserStatus?.hasSupported ?? false)
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
    console.log(" HAS SUPPPORTED ",hasSupportedAfter)
    console.log(" SUPPORT VALUE ",supportValueAfter)
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

    case 'approval_delib':
      if (hasSupportedAfter) {
        showSuccess(t('agora', 'Approved'), { timeout: 2000 })
      } else {
        showSuccess(t('agora', 'Approval removed'), { timeout: 2000 })
      }
      break

    case 'star':
      if (supportValueAfter) {
        showSuccess(t('agora', 'Rating: {stars} stars', { stars: supportValueAfter }), {
          timeout: 2000,
        })
      } else {
        showSuccess(t('agora', 'Rating removed'), { timeout: 2000 })
      }
      break

    case 'score':
      if (supportValueAfter !== null) {
        showSuccess(t('agora', 'Score: {score}/10', { score: supportValueAfter }), {
          timeout: 2000,
        })
      } else {
        showSuccess(t('agora', 'Score removed'), { timeout: 2000 })
      }
      break

    case 'reaction':
      if (hasSupportedAfter && getUserReaction.value) {
        showSuccess(t('agora', 'Reaction: {reaction}', { reaction: getUserReaction.value }), {
          timeout: 2000,
        })
      } else {
        showSuccess(t('agora', 'Reaction removed'), { timeout: 2000 })
      }
      break

    case 'majority_judgment':
      if (supportValueAfter !== null) {
        const gradeLabel = getGradeLabel(supportValueAfter as string) // adapt to string
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
  justify-content: space-between;
  transition: all 0.2s ease;
  position: relative;
  user-select: none;
  white-space: nowrap;
  min-height: 32px;
  height: auto;
  width: auto;
  max-width: none;
  border: 1px solid var(--color-border);
  background: var(--color-main-background);
  border-radius: 16px;
  padding: 4px 12px;
  gap: 12px;
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

  // Base icon container
  .counter-icon {
    background: transparent !important;
    background-image: none !important;
    box-shadow: none !important;
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    flex-shrink: 0;

    svg {
      background: transparent;
      width: 16px !important;
      height: 16px !important;
    }

    .star-rating-icon {
      display: flex;
      align-items: center;
      gap: 4px;

      .stars-container {
        display: flex;
        gap: 2px;

        svg {
          width: 12px !important;
          height: 12px !important;
        }
      }

      .filled {
        color: #fbbf24;
        fill: #fbbf24;
      }

      .rating-value {
        font-size: 12px;
        font-weight: 600;
        margin-left: 0;
      }
    }

    .grade-icon {
      display: flex;
      align-items: center;
      gap: 4px;

      svg {
        width: 14px !important;
        height: 14px !important;
      }

      .grade-value {
        font-size: 11px;
        font-weight: 600;
        white-space: nowrap;
      }
    }

    .score-icon {
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }

  // Counter content - unified definition
  .counter-content {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
    min-width: auto;
    flex-shrink: 0;

    .counter-label-wrapper {
      display: flex;
      align-items: baseline;
      justify-content: flex-end;
      gap: 4px;

      .counter-label {
        color: var(--color-text-lighter);
        text-transform: uppercase;
        letter-spacing: 0.3px;
        font-weight: 500;
        white-space: nowrap;
        font-size: 9px;
        line-height: 1.3;
      }

      .quorum-compact {
        color: var(--color-text-lighter);

        .quorum-separator {
          margin: 0 2px;
        }

        .quorum-target {
          color: var(--color-primary-element);
          font-weight: 600;
        }
      }
    }
  }

  // Star rating specific
  &.has-star-rating {
    width: max-content;
    min-width: 180px;
    max-width: none;
    justify-content: space-between;

    .counter-icon {
      background: transparent !important;
      width: auto;
      padding: 0;
      margin: 0;
      flex-shrink: 0;
    }

    .star-rating-icon {
      display: flex;
      align-items: center;
      gap: 6px;

      .stars-container {
        display: flex;
        gap: 2px;

        svg {
          width: 12px !important;
          height: 12px !important;
        }
      }

      .rating-value {
        font-size: 12px;
        font-weight: 600;
        margin-left: 4px;
        display: inline-block;
        white-space: nowrap;
      }
    }
  }

  // Majority judgment specific
  &.has-majority-judgment {
    width: max-content;
    min-width: 200px;
    max-width: none;
    justify-content: space-between;

    .counter-icon {
      background: transparent !important;
      width: auto;
      padding: 0;
      margin: 0;
      flex-shrink: 0;
    }

    .grade-icon {
      display: flex;
      align-items: center;
      gap: 6px;

      svg {
        width: 14px !important;
        height: 14px !important;
        flex-shrink: 0;
      }

      .grade-value {
        font-size: 11px;
        font-weight: 600;
        max-width: none !important;
        overflow: visible !important;
        text-overflow: clip !important;
        white-space: nowrap;
        display: inline-block;
        line-height: 1.3;
      }
    }
  }

  // Reaction, Score, Approval types
  &.has-reaction,
  &.has-score,
  &.has-approval-delib {
    .counter-icon {
      background: transparent !important;
      width: auto;
      padding: 0;
      margin: 0;
      flex-shrink: 0;
    }
  }
    .counter-icon.inactive {
        opacity: 0.5;
        filter: grayscale(1);
    }

    .reaction-emoji.inactive {
        opacity: 0.4;
        filter: grayscale(1);
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
    min-width: 280px;
    max-width: 400px;
    width: auto;
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

        &.positive {
          border-left: 3px solid #10b981;
        }
        &.neutral {
          border-left: 3px solid #6b7280;
        }
        &.negative {
          border-left: 3px solid #ef4444;
        }

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

            &.positive-bar {
              background: #10b981;
            }
            &.neutral-bar {
              background: #6b7280;
            }
            &.negative-bar {
              background: #ef4444;
            }
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
                    min-width: 85px;
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

  .counter-icon,
  .breakdown-header svg,
  .reaction-stat svg {
      background: transparent !important;
  }
}
</style>
