<!-- SPDX-FileCopyrightText: 2024 Nextcloud contributors -->
<!-- SPDX-License-Identifier: AGPL-3.0-or-later -->
<template>
  <div class="vote-layout" :class="`layout-${currentLayout}`">
    <!-- Header with vote session info and action buttons -->
    <div class="vote-header">
      <div class="header-info">
        <div class="vote-metadata">
          <span v-if="voteSession" class="metadata-badge">
            <Calendar :size="14" />
            {{ formatDate(voteSession.start_date) }}
            <span v-if="voteSession.end_date">
              - {{ formatDate(voteSession.end_date) }}
            </span>
          </span>
          <span v-if="voteSession?.quorum" class="metadata-badge">
            <Users :size="14" />
            {{ t('agora', 'Quorum: {quorum}', { quorum: voteSession.quorum }) }}
          </span>
          <span class="metadata-badge">
            <Vote :size="14" />
            {{ t('agora', 'Total votes: {total}', { total: totalVotes }) }}
          </span>
          <span v-if="currentEngine?.behavior === 'multi'" class="metadata-badge">
            <CheckCircle :size="14" />
            {{ t('agora', 'Multiple votes allowed') }}
          </span>
        </div>
      </div>

      <!-- Layout switcher + Add to vote button -->
      <div class="action-bar">
        <div class="layout-switcher">
          <NcButton
            v-for="layout in allowedLayouts"
            :key="layout"
            :type="currentLayout === layout ? 'primary' : 'tertiary'"
            size="small"
            @click="currentLayout = layout"
          >
            <template #icon>
              <component :is="getLayoutIcon(layout)" :size="16" />
            </template>
            {{ t('agora', capitalize(layout)) }}
          </NcButton>
        </div>

        <!-- Engine selector -->
        <div class="engine-selector-header">
          <NcButton
            v-if="!isReadonly"
            type="secondary"
            size="small"
            @click="showEngineSelector = true"
          >
            <template #icon>
              <Settings :size="16" />
            </template>
            {{ getEngineLabel(currentEngineId) }}
          </NcButton>
        </div>

        <NcButton
          v-if="!isReadonly"
          type="primary"
          size="small"
          class="add-to-vote-btn"
          @click="showAddToVoteModal = true"
        >
          <template #icon>
            <Plus :size="16" />
          </template>
          {{ t('agora', 'Add to vote') }}
        </NcButton>
      </div>
    </div>

    <!-- Current voting engine info -->
    <div v-if="currentEngine" class="engine-info">
      <span class="engine-badge">
        {{ getEngineLabel(currentEngineId) }}
        <span v-if="currentEngine.behavior === 'multi'">({{ t('agora', 'Multi-choice') }})</span>
        <span v-else-if="currentEngine.behavior === 'flex'">({{ t('agora', 'Flexible') }})</span>
        <span v-else>({{ t('agora', 'Single-choice') }})</span>
      </span>
      <span v-if="voteLimitInfo" class="vote-limit-info">
        {{ voteLimitInfo }}
      </span>
    </div>

    <!-- Cards Layout -->
    <div v-if="currentLayout === 'cards'" class="cards-layout">
      <div class="cards-grid">
        <div
          v-for="option in voteOptions"
          :key="option.id"
          class="vote-card-wrapper"
          :class="{ 'selected-for-vote': isSelectedForVote(option.id) }"
        >
          <OptionCard
            :option="option"
            :compact="false"
            :show-action="!isReadonly"
            :progress-bar="true"
            :family-type="family.key"
            @click="handleOptionClick(option)"
          >
            <!-- Selection indicator for multi-vote -->
            <template v-if="currentEngine.behavior === 'multi' && canVote && !hasUserVoted">
              <div class="selection-checkbox">
                <input
                  type="checkbox"
                  :checked="isSelectedForVote(option.id)"
                  @change="toggleOptionSelection(option.id)"
                  @click.stop
                />
              </div>
            </template>

            <!-- Rank input for ranked voting -->
            <template v-if="currentEngineId === 'ranked' && canVote && !hasUserVoted">
              <div class="rank-input">
                <label>{{ t('agora', 'Rank') }}</label>
                <select v-model="rankings[option.id]" @click.stop>
                  <option :value="null">-</option>
                  <option v-for="i in maxRank" :key="i" :value="i">{{ i }}</option>
                </select>
              </div>
            </template>

            <!-- Score input for score voting -->
            <template v-if="currentEngineId === 'score' && canVote && !hasUserVoted">
              <div class="score-input">
                <input
                  v-model="scores[option.id]"
                  type="range"
                  :min="scoreMin"
                  :max="scoreMax"
                  @click.stop
                />
                <span>{{ scores[option.id] || 0 }}</span>
              </div>
            </template>

            <!-- Grade input for majority judgment -->
            <template v-if="currentEngineId === 'majority_judgment' && canVote && !hasUserVoted">
              <div class="grade-input">
                <select v-model="grades[option.id]" @click.stop>
                  <option :value="null">-</option>
                  <option v-for="grade in gradeOptions" :key="grade" :value="grade">
                    {{ grade }}
                  </option>
                </select>
              </div>
            </template>

            <!-- Vote button for single-choice engines -->
            <template v-else-if="currentEngine.behavior === 'single' && canVote && !hasUserVotedFor(option.id) && !hasUserVoted">
              <NcButton
                type="primary"
                size="small"
                @click.stop="voteForOption(option)"
              >
                <template #icon>
                  <Vote :size="16" />
                </template>
                {{ t('agora', 'Vote') }}
              </NcButton>
            </template>

            <!-- Custom progress bar slot -->
            <template #progress-bar>
              <div class="vote-progress-section">
                <div class="vote-stats">
                  <div class="votes-count">
                    <ThumbsUp :size="14" />
                    <strong>{{ option.metadata?.votes || 0 }}</strong>
                    {{ t('agora', 'votes') }}
                  </div>
                  <div class="percentage">
                    {{ getPercentage(option) }}%
                  </div>
                </div>
                <div class="progress-bar">
                  <div
                    class="progress-fill"
                    :style="{ width: getPercentage(option) + '%' }"
                    :class="{
                      'fill-leading': option.metadata?.status === 'leading',
                      'fill-selected': option.metadata?.status === 'selected'
                    }"
                  />
                </div>
              </div>
            </template>
          </OptionCard>
        </div>
      </div>

      <!-- Submit button for multi/flex votes -->
      <div v-if="(currentEngine.behavior === 'multi' || currentEngine.behavior === 'flex') && canVote && !hasUserVoted" class="submit-vote-section">
        <NcButton
          type="primary"
          size="medium"
          :disabled="!canSubmitMultiVote"
          @click="submitMultiVote"
        >
          <template #icon>
            <Vote :size="18" />
          </template>
          {{ getSubmitButtonText() }}
        </NcButton>
        <span v-if="voteSelectionInfo" class="selection-info">{{ voteSelectionInfo }}</span>
      </div>
    </div>

    <!-- List Layout -->
    <div v-else-if="currentLayout === 'list'" class="list-layout">
      <div class="list-header">
        <div class="list-cell rank">{{ t('agora', 'Rank') }}</div>
        <div class="list-cell option">{{ t('agora', 'Option') }}</div>
        <div class="list-cell votes">{{ t('agora', 'Votes') }}</div>
        <div class="list-cell percentage">{{ t('agora', 'Percentage') }}</div>
        <div class="list-cell action">{{ t('agora', 'Action') }}</div>
      </div>

      <div
        v-for="(option, index) in rankedOptions"
        :key="option.id"
        class="list-row"
        :class="{
          'is-leading': option.metadata?.status === 'leading',
          'user-voted': hasUserVotedFor(option.id),
          'selected-for-vote': isSelectedForVote(option.id)
        }"
      >
        <div class="list-cell rank">
          <div class="rank-number">
            <span v-if="index === 0" class="medal">🥇</span>
            <span v-else-if="index === 1" class="medal">🥈</span>
            <span v-else-if="index === 2" class="medal">🥉</span>
            <span v-else>{{ index + 1 }}</span>
          </div>
        </div>
        <div class="list-cell option">
          <OptionCard
            :option="option"
            :compact="true"
            :inline="true"
            :show-action="false"
            @click="handleOptionClick(option)"
          />
        </div>
        <div class="list-cell votes">
          <strong>{{ option.metadata?.votes || 0 }}</strong>
        </div>
        <div class="list-cell percentage">
          <div class="percentage-bar">
            <div
              class="percentage-fill"
              :style="{ width: getPercentage(option) + '%' }"
            />
            <span class="percentage-text">{{ getPercentage(option) }}%</span>
          </div>
        </div>
        <div class="list-cell action">
          <NcButton
            v-if="currentEngine.behavior === 'single' && canVote && !hasUserVotedFor(option.id) && !hasUserVoted"
            type="primary"
            size="small"
            @click.stop="voteForOption(option)"
          >
            <Vote :size="14" />
            {{ t('agora', 'Vote') }}
          </NcButton>
          
          <input
            v-else-if="currentEngine.behavior === 'multi' && canVote && !hasUserVoted"
            type="checkbox"
            :checked="isSelectedForVote(option.id)"
            @change="toggleOptionSelection(option.id)"
          />
          
          <select
            v-else-if="currentEngineId === 'ranked' && canVote && !hasUserVoted"
            v-model="rankings[option.id]"
            class="rank-select-mini"
          >
            <option :value="null">-</option>
            <option v-for="i in maxRank" :key="i" :value="i">{{ i }}</option>
          </select>
          
          <input
            v-else-if="currentEngineId === 'score' && canVote && !hasUserVoted"
            v-model="scores[option.id]"
            type="number"
            :min="scoreMin"
            :max="scoreMax"
            class="score-input-mini"
          />
          
          <div v-else-if="hasUserVotedFor(option.id)" class="voted-icon">
            <CheckCircle :size="16" />
          </div>
        </div>
      </div>
      
      <div v-if="(currentEngine.behavior === 'multi' || currentEngine.behavior === 'flex') && canVote && !hasUserVoted" class="submit-vote-section list-submit">
        <NcButton
          type="primary"
          size="medium"
          :disabled="!canSubmitMultiVote"
          @click="submitMultiVote"
        >
          <Vote :size="18" />
          {{ getSubmitButtonText() }}
        </NcButton>
      </div>
    </div>

    <!-- Results Layout -->
    <div v-else-if="currentLayout === 'results'" class="results-layout">
      <div class="results-summary">
        <div class="summary-card">
          <div class="summary-icon">
            <Users :size="24" />
          </div>
          <div class="summary-content">
            <div class="summary-value">{{ totalVotes }}</div>
            <div class="summary-label">{{ t('agora', 'Total Votes') }}</div>
          </div>
        </div>
        <div class="summary-card">
          <div class="summary-icon">
            <Trophy :size="24" />
          </div>
          <div class="summary-content">
            <div class="summary-value">{{ winner?.title || '-' }}</div>
            <div class="summary-label">{{ t('agora', 'Current Leader') }}</div>
          </div>
        </div>
        <div class="summary-card">
          <div class="summary-icon">
            <TrendingUp :size="24" />
          </div>
          <div class="summary-content">
            <div class="summary-value">{{ winnerPercentage }}%</div>
            <div class="summary-label">{{ t('agora', 'Leading Percentage') }}</div>
          </div>
        </div>
        <div class="summary-card">
          <div class="summary-icon">
            <Clock :size="24" />
          </div>
          <div class="summary-content">
            <div class="summary-value">{{ timeRemaining }}</div>
            <div class="summary-label">{{ t('agora', 'Time Remaining') }}</div>
          </div>
        </div>
      </div>

      <div class="charts-section">
        <div class="chart-container">
          <h4>{{ t('agora', 'Vote Distribution') }}</h4>
          <canvas ref="pieChartCanvas"></canvas>
        </div>
        <div class="chart-container">
          <h4>{{ t('agora', 'Vote Ranking') }}</h4>
          <canvas ref="barChartCanvas"></canvas>
        </div>
      </div>

      <div class="ranking-table">
        <h4>{{ t('agora', 'Detailed Ranking') }}</h4>
        <table>
          <thead>
            <tr>
              <th>{{ t('agora', 'Rank') }}</th>
              <th>{{ t('agora', 'Option') }}</th>
              <th>{{ t('agora', 'Votes') }}</th>
              <th>{{ t('agora', 'Percentage') }}</th>
              <th>{{ t('agora', 'Status') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(option, index) in rankedOptions" :key="option.id">
              <td class="rank-cell">
                <span class="rank-badge" :class="getRankClass(index)">
                  {{ index + 1 }}
                </span>
              </td>
              <td>
                <div class="option-name">
                  {{ option.title }}
                </div>
              </td>
              <td class="votes-cell">{{ option.metadata?.votes || 0 }}</td>
              <td class="percentage-cell">
                <div class="mini-progress">
                  <div
                    class="mini-progress-fill"
                    :style="{ width: getPercentage(option) + '%' }"
                  />
                  <span>{{ getPercentage(option) }}%</span>
                </div>
              </td>
              <td>
                <span v-if="option.metadata?.status" class="status-tag" :class="option.metadata.status">
                  {{ option.metadata.status }}
                </span>
                <span v-else>-</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Empty state -->
    <div v-if="voteOptions.length === 0" class="empty-state">
      <component :is="getOptionTypeIcon('vote')" :size="48" />
      <h4>{{ t('agora', 'No options to vote on yet') }}</h4>
      <p>{{ t('agora', 'Add options to start the voting process') }}</p>
      <NcButton
        v-if="!isReadonly"
        type="primary"
        @click="showAddToVoteModal = true"
      >
        <template #icon>
          <Plus :size="16" />
        </template>
        {{ t('agora', 'Add Option') }}
      </NcButton>
    </div>

    <!-- Modals -->
    <EngineSelectorModal
      v-if="showEngineSelector"
      :current-engine-id="currentEngineId"
      :current-config="engineConfig"
      :engines="availableEngines"
      :engine-definitions="ENGINE_DEFINITIONS"
      @close="showEngineSelector = false"
      @apply="handleEngineApply"
    />
    
    <AddOptionToFamily
      v-if="showAddToVoteModal"
      :inquiry-id="inquiryId"
      family-type="vote"
      :allowed-families="allowedFamiliesForVote"
      @close="closeAddToVoteModal"
      @success="handleAddSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted, watch, nextTick } from 'vue'
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import Chart from 'chart.js/auto'
import { showError } from '@nextcloud/dialogs'

import OptionCard from '../OptionCard.vue'
import { getOptionTypeIconComponent , filterOptionsByLayout } from '../../../helpers/modules/InquiryOptionHelper'
import type { Option, SupportData } from '../../Types/index'
import {
  calculateOptionResult,
  calculateRankingScores,
  calculateRankingResults
} from '../../../utils/voteCalculations'
import {
  Plus,
  Vote,
  Users,
  Calendar,
  ThumbsUp,
  CheckCircle,
  Trophy,
  TrendingUp,
  Clock,
  LayoutGrid,
  List,
  BarChart3,
  Settings,
} from 'lucide-vue-next'

import EngineSelectorModal from '../../Modals/EngineSelectorModal.vue'
import AddOptionToFamily from '../../Modals/AddOptionToFamily.vue'

// ----------------------------------------------------------------------------
// Types
// ----------------------------------------------------------------------------

interface VoteSession {
  start_date?: string
  end_date?: string
  quorum?: number
  engine?: string
  [key: string]: unknown
}

interface ConfigSchemaField {
  type: string
  default?: unknown
  label?: string
  min?: number
  max?: number
  step?: number
  placeholder?: string
  options?: string[]
  description?: string
}

interface EngineDefinition {
  label: string
  behavior: 'single' | 'multi' | 'flex'
  description: string
  constraints: {
    min_options?: number
    max_options?: number
    requires_weight_source?: boolean
  }
  config_schema: Record<string, ConfigSchemaField>
}

// ----------------------------------------------------------------------------
// Engine Definitions
// ----------------------------------------------------------------------------

const ENGINE_DEFINITIONS: Record<string, EngineDefinition> = {
  binary: {
    label: 'Yes / No',
    behavior: 'single',
    description: 'Simple yes/no voting on a single option',
    constraints: { min_options: 1, max_options: 1 },
    config_schema: {}
  },
  ternary: {
    label: 'For / Abstain / Against',
    behavior: 'single',
    description: 'Choose between For, Abstain, or Against',
    constraints: { min_options: 1, max_options: 1 },
    config_schema: {}
  },
  reaction: {
    label: 'Reactions',
    behavior: 'single',
    description: 'React with emojis to show your opinion',
    constraints: { min_options: 1, max_options: 1 },
    config_schema: {
      allowed_reactions: {
        type: 'array',
        default: ['👍', '👎', '❤️', '😂', '😢'],
        label: 'Allowed reactions'
      }
    }
  },
  score: {
    label: 'Score Voting',
    behavior: 'single',
    description: 'Rate options on a numeric scale',
    constraints: { min_options: 1, max_options: 1 },
    config_schema: {
      min: { type: 'number', default: 0, label: 'Minimum score' },
      max: { type: 'number', default: 10, label: 'Maximum score' }
    }
  },
  approval: {
    label: 'Approval Voting',
    behavior: 'multi',
    description: 'Select all options you approve of',
    constraints: { min_options: 2 },
    config_schema: {
      min_choices: { type: 'number', default: 1, label: 'Minimum choices' },
      max_choices: { type: 'number', default: null, label: 'Maximum choices' }
    }
  },
  ranked: {
    label: 'Ranked Choice',
    behavior: 'multi',
    description: 'Rank options in order of preference',
    constraints: { min_options: 2 },
    config_schema: {
      max_rank: { type: 'number', default: null, label: 'Maximum rank' }
    }
  },
  borda: {
    label: 'Borda Count',
    behavior: 'multi',
    description: 'Rank options, points assigned by rank position',
    constraints: { min_options: 2 },
    config_schema: {}
  },
  condorcet: {
    label: 'Condorcet',
    behavior: 'multi',
    description: 'Pairwise comparison voting method',
    constraints: { min_options: 2 },
    config_schema: {
      method: {
        type: 'string',
        default: 'schulze',
        label: 'Method',
        options: ['schulze', 'copeland', 'minimax']
      }
    }
  },
  majority_judgment: {
    label: 'Majority Judgment',
    behavior: 'multi',
    description: 'Grade each option, median grade determines winner',
    constraints: { min_options: 2 },
    config_schema: {
      grades: {
        type: 'array',
        default: ['Reject', 'Poor', 'Fair', 'Good', 'Excellent'],
        label: 'Grade options'
      }
    }
  },
  token_weighted: {
    label: 'Token / Weighted',
    behavior: 'flex',
    description: 'Vote with weighted tokens',
    constraints: { min_options: 1, requires_weight_source: true },
    config_schema: {
      weight_source: { type: 'object', default: null, label: 'Weight source' },
      normalization: {
        type: 'string',
        default: 'none',
        label: 'Normalization',
        options: ['none', 'min-max', 'z-score']
      }
    }
  },
  quadratic: {
    label: 'Quadratic Voting',
    behavior: 'flex',
    description: 'Vote with quadratic cost mechanism',
    constraints: { min_options: 1 },
    config_schema: {
      credits_per_user: { type: 'number', default: 100, label: 'Credits per user' }
    }
  }
}

// ----------------------------------------------------------------------------
// Props
// ----------------------------------------------------------------------------

const props = defineProps<{
  options: Option[]  // ALL options from ALL families can be voted on
  voteSession?: VoteSession
  canVote?: boolean
  isReadonly?: boolean
  currentUserVotes?: SupportData[]
  inquiryId?: number
  supports?: SupportData[]
  optionTypes: InquiryOptionType[]
  userId?: string
  family?: OptionFamily
  optionsByInquiry: Option[]
}>()

const emit = defineEmits<{
  'vote': [supportData: SupportData]
  'multiVote': [supports: SupportData[]]
  'select': [option: Option]
  'addOption': [optionType: string]
  'update:options': []
}>()

// ----------------------------------------------------------------------------
// State
// ----------------------------------------------------------------------------

const refreshKey = ref(0)
const selectedOptions = ref<Set<number>>(new Set())
const rankings = ref<Record<number, number>>({})
const scores = ref<Record<number, number>>({})
const grades = ref<Record<number, string>>({})

const currentEngineId = ref<string>(props.voteSession?.engine || 'binary')
const showEngineSelector = ref(false)
const engineConfig = ref<Record<string, unknown>>({})
const showAddToVoteModal = ref(false)
const voteSuccessMessage = ref('')
let successTimeout: NodeJS.Timeout

// Layout
const allowedLayouts = ['cards', 'list', 'results']
const currentLayout = ref<'cards' | 'list' | 'results'>('cards')

// ----------------------------------------------------------------------------

// Filter options for vote
const voteOptions = computed(() => filterOptionsByLayout(
    props.optionsByInquiry,
    'vote',
    props.optionTypes,
    props.family.key
  ))



// Define which families can be added to vote (all of them)
const allowedFamiliesForVote = computed(() => 
  // Return all available families or specific ones
  // This could be configurable based on your needs
   ['kanban', 'vote', 'calendar', 'default']
)

// ----------------------------------------------------------------------------
// Computed: Current Engine
// ----------------------------------------------------------------------------

const currentEngine = computed(() => ENGINE_DEFINITIONS[currentEngineId.value])

// ----------------------------------------------------------------------------
// Computed: User's votes (using SupportData)
// ----------------------------------------------------------------------------

const getUserVoteForOption = (optionId: number): SupportData | undefined => props.currentUserVotes?.find(vote => vote.optionId === optionId)

const hasUserVotedFor = (optionId: number): boolean => !!getUserVoteForOption(optionId)

const hasUserVoted = computed(() => (props.currentUserVotes?.length ?? 0) > 0)

// ----------------------------------------------------------------------------
// Computed: Vote Options - ALL options from props
// ----------------------------------------------------------------------------

watch(
  () => props.options,
  () => {
    refreshKey.value = refreshKey.value + 1
    selectedOptions.value.clear()
    rankings.value = {}
    scores.value = {}
    grades.value = {}
  },
  { deep: true }
)

watch(
  () => props.options.length,
  (newLength, oldLength) => {
    if (newLength !== oldLength) {
      refreshKey.value=refreshKey.value + 1
    }
  }
)

// ----------------------------------------------------------------------------
// Computed: Option Results
// ----------------------------------------------------------------------------

const optionResults = computed(() => {
  const results: Record<number, ReturnType<typeof calculateOptionResult>> = {}

  if (currentEngineId.value === 'ranked' || currentEngineId.value === 'borda' || currentEngineId.value === 'condorcet') {
    const allSupports = props.supports ?? []
    const scoresMap = calculateRankingScores(allSupports, engineConfig.value.max_rank as number)
    const rankingResults = calculateRankingResults(scoresMap)
    for (const opt of voteOptions.value) {
      results[opt.id] = rankingResults[opt.id] ?? { type: 'ranking', rank: 0, score: 0 }
    }
    return results
  }

  for (const opt of voteOptions.value) {
    const optionSupports = (props.supports ?? []).filter(s => s.optionId === opt.id)
    const config = {
      min: scoreMin.value,
      max: scoreMax.value,
      grades: gradeOptions.value.map((_, idx) => idx),
      maxRank: maxRank.value
    }
    results[opt.id] = calculateOptionResult(currentEngineId.value, optionSupports, config)
  }
  return results
})

// ----------------------------------------------------------------------------
// Computed: Engine Config Helpers
// ----------------------------------------------------------------------------

const maxRank = computed(() => {
  if (currentEngineId.value === 'ranked' && engineConfig.value.max_rank) {
    return engineConfig.value.max_rank as number
  }
  return voteOptions.value.length
})

const scoreMin = computed(() => {
  if (currentEngineId.value === 'score') {
    return (engineConfig.value.min as number) ?? 0
  }
  return 0
})

const scoreMax = computed(() => {
  if (currentEngineId.value === 'score') {
    return (engineConfig.value.max as number) ?? 10
  }
  return 10
})

const gradeOptions = computed(() => {
  if (currentEngineId.value === 'majority_judgment') {
    return (engineConfig.value.grades as string[]) || ['Reject', 'Poor', 'Fair', 'Good', 'Excellent']
  }
  return []
})

// ----------------------------------------------------------------------------
// Computed: Total Votes & Rankings
// ----------------------------------------------------------------------------

const totalVotes = computed(() => {
  let sum = 0
  for (const result of Object.values(optionResults.value)) {
    switch (result.type) {
      case 'binary':
        sum += result.total_yes + result.total_no
        break
      case 'ternary':
        sum += result.total_yes + result.total_no + result.total_abstain
        break
      case 'score':
        sum += result.total
        break
      case 'approval':
        sum += (result as { count: number }).count
        break
      case 'ranking':
        sum += (props.supports ?? []).length
        break
      default:
        sum += (props.supports ?? []).length
    }
  }
  return sum
})

const rankedOptions = computed(() => {
  const optionsWithResults = voteOptions.value.map(option => ({
    ...option,
    result: optionResults.value[option.id]
  }))

  return optionsWithResults.sort((a, b) => {
    const resA = a.result
    const resB = b.result
    if (!resA || !resB) return 0

    switch (resA.type) {
      case 'binary':
        if (resB.type !== 'binary') return -1
        return (resB.total_yes - resA.total_yes)
      case 'ternary':
        if (resB.type !== 'ternary') return -1
        return (resB.total_yes - resA.total_yes)
      case 'score':
        if (resB.type !== 'score') return -1
        return (resB.average - resA.average)
      case 'ranking':
        if (resB.type !== 'ranking') return -1
        return (resA.rank - resB.rank)
      case 'majority_judgment':
        if (resB.type !== 'majority_judgment') return -1
        return (resB.median - resA.median)
      case 'approval':
        if (resB.type !== 'approval') return -1
        return ((resB as { count: number }).count - (resA as { count: number }).count)
      default:
        return 0
    }
  })
})

const winner = computed(() => rankedOptions.value[0] ?? null)

const winnerPercentage = computed(() => {
  if (!winner.value) return 0
  return getPercentage(winner.value)
})

// ----------------------------------------------------------------------------
// Helper Functions
// ----------------------------------------------------------------------------

function getOptionScore(option: Option & { result?: ReturnType<typeof calculateOptionResult> }): number {
  const res = option.result
  if (!res) return 0
  switch (res.type) {
    case 'binary':
      return res.total_yes
    case 'ternary':
      return res.total_yes
    case 'score':
      return res.average
    case 'ranking':
      return res.score ?? 0
    case 'majority_judgment':
      return res.median
    case 'approval':
      return (res as { count: number }).count
    default:
      return 0
  }
}

function getPercentage(option: Option & { result?: ReturnType<typeof calculateOptionResult> }): number {
  const score = getOptionScore(option)
  if (totalVotes.value === 0) return 0
  return Math.round((score / totalVotes.value) * 100)
}

// ----------------------------------------------------------------------------
// Selection Helpers
// ----------------------------------------------------------------------------

function isSelectedForVote(optionId: number): boolean {
  if (currentEngineId.value === 'ranked') {
    return rankings.value[optionId] !== null && rankings.value[optionId] !== undefined
  }
  if (currentEngineId.value === 'score') {
    return scores.value[optionId] !== null && scores.value[optionId] !== undefined
  }
  if (currentEngineId.value === 'majority_judgment') {
    return grades.value[optionId] !== null && grades.value[optionId] !== undefined
  }
  return selectedOptions.value.has(optionId)
}

function toggleOptionSelection(optionId: number): void {
  if (selectedOptions.value.has(optionId)) {
    selectedOptions.value.delete(optionId)
  } else {
    const maxChoices = engineConfig.value.max_choices as number | null
    if (maxChoices && selectedOptions.value.size >= maxChoices) {
      showError(t('agora', 'You can only select up to {max} options', { max: maxChoices }))
      return
    }
    selectedOptions.value.add(optionId)
  }
  selectedOptions.value = new Set(selectedOptions.value)
}

function handleOptionClick(option: Option): void {
  if (currentEngine.value?.behavior === 'multi' && props.canVote && !hasUserVoted.value) {
    toggleOptionSelection(option.id)
  } else {
    emit('select', option)
  }
}

// ----------------------------------------------------------------------------
// Voting Actions
// ----------------------------------------------------------------------------

function voteForOption(option: Option): void {
  if (!props.canVote || hasUserVoted.value || !props.userId) return

  let value: SupportValue = null
  
  if (currentEngineId.value === 'binary') {
    value = 1
  } else if (currentEngineId.value === 'ternary') {
    value = 1
  } else if (currentEngineId.value === 'score') {
    value = scores.value[option.id] ?? 0
  } else if (currentEngineId.value === 'reaction') {
    value = '👍'
  }

  const supportData: SupportData = {
    inquiryId: props.inquiryId!,
    optionId: option.id,
    groupId: 0,
    userId: props.userId,
    support_engine_id: undefined,
    value,
    created: Date.now()
  }

  emit('vote', supportData)
  showSuccessToast(t('agora', 'Your vote for "{option}" has been recorded!', { option: option.title }))
}

function submitMultiVote(): void {
  if (!props.canVote || hasUserVoted.value || !props.userId) return

  const supports: SupportData[] = []

  if (currentEngineId.value === 'approval') {
    for (const optionId of selectedOptions.value) {
      supports.push({
        inquiryId: props.inquiryId!,
        optionId,
        groupId: 0,
        userId: props.userId,
        value: 1,
        created: Date.now()
      })
    }
  } else if (currentEngineId.value === 'ranked') {
    for (const [optionId, rank] of Object.entries(rankings.value)) {
      if (rank !== null) {
        supports.push({
          inquiryId: props.inquiryId!,
          optionId: parseInt(optionId, 10),
          groupId: 0,
          userId: props.userId,
          value: rank,
          created: Date.now()
        })
      }
    }
  } else if (currentEngineId.value === 'score') {
    for (const [optionId, score] of Object.entries(scores.value)) {
      if (score !== null && score !== undefined) {
        supports.push({
          inquiryId: props.inquiryId!,
          optionId: parseInt(optionId, 10),
          groupId: 0,
          userId: props.userId,
          value: score,
          created: Date.now()
        })
      }
    }
  } else if (currentEngineId.value === 'majority_judgment') {
    for (const [optionId, grade] of Object.entries(grades.value)) {
      if (grade !== null) {
        supports.push({
          inquiryId: props.inquiryId!,
          optionId: parseInt(optionId, 10),
          groupId: 0,
          userId: props.userId,
          value: grade,
          created: Date.now()
        })
      }
    }
  }

  emit('multiVote', supports)

  const voteCount = supports.length
  showSuccessToast(t('agora', 'Your vote for {count} {countLabel} has been recorded!', {
    count: voteCount,
    countLabel: voteCount === 1 ? t('agora', 'option') : t('agora', 'options')
  }))

  selectedOptions.value.clear()
  rankings.value = {}
  scores.value = {}
  grades.value = {}
}

// ----------------------------------------------------------------------------
// Toast Helper
// ----------------------------------------------------------------------------

function showSuccessToast(message: string): void {
  voteSuccessMessage.value = message
  if (successTimeout) clearTimeout(successTimeout)
  successTimeout = setTimeout(() => {
    voteSuccessMessage.value = ''
  }, 3000)
}

// ----------------------------------------------------------------------------
// Modal Handlers
// ----------------------------------------------------------------------------

function handleEngineApply(engineId: string, config: Record<string, unknown>): void {
  currentEngineId.value = engineId
  engineConfig.value = config
  showEngineSelector.value = false
  emit('update:options')
}

// FIXED: Handle add success - refresh and show options from any family
async function handleAddSuccess(): Promise<void> {
  showAddToVoteModal.value = false
  refreshKey.value=refreshKey.value + 1
  emit('update:options')
  await nextTick()
  showSuccessToast(t('agora', 'Option added successfully'))
}

function closeAddToVoteModal(): void {
  showAddToVoteModal.value = false
}

// ----------------------------------------------------------------------------
// Chart Creation
// ----------------------------------------------------------------------------

const pieChartCanvas = ref<HTMLCanvasElement | null>(null)
const barChartCanvas = ref<HTMLCanvasElement | null>(null)
let pieChart: Chart | null = null
let barChart: Chart | null = null

function createCharts(): void {
  if (!pieChartCanvas.value || !barChartCanvas.value) return

  const labels = rankedOptions.value.map(o => o.title)
  const votes = rankedOptions.value.map(o => getOptionScore(o))
  const colors = ['#42b883', '#3490dc', '#f6993f', '#e74c3c', '#9b59b6', '#1abc9c', '#e67e22', '#2c3e50']

  if (pieChart) pieChart.destroy()
  if (barChart) barChart.destroy()

  pieChart = new Chart(pieChartCanvas.value, {
    type: 'pie',
    data: {
      labels,
      datasets: [{
        data: votes,
        backgroundColor: colors,
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { position: 'bottom', labels: { font: { size: 11 } } }
      }
    }
  })

  barChart = new Chart(barChartCanvas.value, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: t('agora', 'Votes'),
        data: votes,
        backgroundColor: colors,
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } },
      plugins: { legend: { display: false } }
    }
  })
}

watch([rankedOptions, currentLayout], () => {
  if (currentLayout.value === 'results') {
    nextTick(() => createCharts())
  }
})

// ----------------------------------------------------------------------------
// Lifecycle
// ----------------------------------------------------------------------------

onUnmounted(() => {
  if (pieChart) pieChart.destroy()
  if (barChart) barChart.destroy()
  if (successTimeout) clearTimeout(successTimeout)
})

// ----------------------------------------------------------------------------
// Additional Helpers
// ----------------------------------------------------------------------------

const getEngineLabel = (engineId: string): string => ENGINE_DEFINITIONS[engineId]?.label || engineId

const getSubmitButtonText = (): string => {
  if (currentEngineId.value === 'approval') return t('agora', 'Submit selections')
  if (currentEngineId.value === 'ranked') return t('agora', 'Submit ranking')
  if (currentEngineId.value === 'score') return t('agora', 'Submit scores')
  if (currentEngineId.value === 'majority_judgment') return t('agora', 'Submit grades')
  return t('agora', 'Submit vote')
}

const formatDate = (date?: string): string => date ? new Date(date).toLocaleDateString() : ''
const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1)

const getRankClass = (index: number): string => {
  if (index === 0) return 'gold'
  if (index === 1) return 'silver'
  if (index === 2) return 'bronze'
  return ''
}

const getLayoutIcon = (layout: string): unknown => {
  const icons: Record<string, unknown> = { cards: LayoutGrid, list: List, results: BarChart3 }
  return icons[layout] || LayoutGrid
}

const getOptionTypeIcon = (type: string): unknown => getOptionTypeIconComponent(type, [])

// ----------------------------------------------------------------------------
// Computed: Available Engines
// ----------------------------------------------------------------------------

const availableEngines = computed(() => {
  const engines = Object.entries(ENGINE_DEFINITIONS).map(([id, def]) => ({
    id,
    label: def.label,
    behavior: def.behavior,
    description: def.description,
    constraints: def.constraints
  }))
  const optionCount = voteOptions.value.length
  return engines.filter(engine => {
    const constraints = ENGINE_DEFINITIONS[engine.id]?.constraints
    if (constraints?.min_options && optionCount < constraints.min_options) return false
    if (constraints?.max_options && optionCount > constraints.max_options) return false
    return true
  })
})

// ----------------------------------------------------------------------------
// Computed: UI Info
// ----------------------------------------------------------------------------

const voteLimitInfo = computed(() => {
  if (!currentEngine.value) return null
  const config = engineConfig.value
  if (currentEngineId.value === 'approval') {
    const min = config.min_choices as number
    const max = config.max_choices as number | null
    if (min && max) return t('agora', 'Select {min}-{max} options', { min, max })
    if (min) return t('agora', 'Select at least {min} options', { min })
    if (max) return t('agora', 'Select up to {max} options', { max })
  }
  if (currentEngineId.value === 'ranked') {
    const max = config.max_rank as number
    if (max) return t('agora', 'Rank up to {max} options', { max })
    return t('agora', 'Rank all options')
  }
  return null
})

const voteSelectionInfo = computed(() => {
  if (currentEngineId.value === 'approval') {
    const selectedCount = selectedOptions.value.size
    const min = engineConfig.value.min_choices as number
    const max = engineConfig.value.max_choices as number | null
    if (min && max) return t('agora', '{selected}/{min}-{max} selected', { selected: selectedCount, min, max })
    if (min) return t('agora', '{selected}/{min}+ selected', { selected: selectedCount, min })
    if (max) return t('agora', '{selected}/{max} selected', { selected: selectedCount, max })
  }
  if (currentEngineId.value === 'ranked') {
    const rankedCount = Object.values(rankings.value).filter(r => r !== null).length
    const max = (engineConfig.value.max_rank as number) || voteOptions.value.length
    return t('agora', '{ranked}/{max} ranked', { ranked: rankedCount, max })
  }
  return null
})

const canSubmitMultiVote = computed(() => {
  if (currentEngineId.value === 'approval') {
    const selectedCount = selectedOptions.value.size
    const min = (engineConfig.value.min_choices as number) || 1
    const max = engineConfig.value.max_choices as number | null
    if (max !== null && selectedCount > max) return false
    return selectedCount >= min
  }
  if (currentEngineId.value === 'ranked') {
    const ranks = Object.entries(rankings.value)
      .filter(([, rank]) => rank !== null)
      .map(([, rank]) => rank as number)
    const uniqueRanks = new Set(ranks)
    if (uniqueRanks.size !== ranks.length) return false
    const maxRankValue = (engineConfig.value.max_rank as number) || voteOptions.value.length
    return ranks.length > 0 && Math.max(...ranks) <= maxRankValue
  }
  if (currentEngineId.value === 'score') {
    return Object.values(scores.value).some(s => s !== null && s !== undefined)
  }
  if (currentEngineId.value === 'majority_judgment') {
    return Object.values(grades.value).some(g => g !== null)
  }
  return selectedOptions.value.size > 0
})

const timeRemaining = computed(() => {
  if (!props.voteSession?.end_date) return t('agora', 'No deadline')
  const end = new Date(props.voteSession.end_date)
  const now = new Date()
  const diff = end.getTime() - now.getTime()
  if (diff <= 0) return t('agora', 'Voting ended')
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  if (days > 0) return t('agora', '{days}d {hours}h', { days, hours })
  return t('agora', '{hours}h', { hours })
})

// Initialize engine config
if (props.voteSession?.engine) {
  const engineDef = ENGINE_DEFINITIONS[props.voteSession.engine]
  if (engineDef?.config_schema) {
    const initialConfig: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(engineDef.config_schema)) {
      initialConfig[key] = value.default
    }
    engineConfig.value = initialConfig
  }
}
</script>

<style scoped lang="scss">
.vote-layout {
  padding: 20px;

  .vote-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 24px;
    flex-wrap: wrap;
    gap: 16px;

    .header-info {
      flex: 1;

      .vote-metadata {
        display: flex;
        gap: 16px;
        flex-wrap: wrap;

        .metadata-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          background: var(--color-background-dark);
          border-radius: 20px;
          font-size: 13px;
          color: var(--color-text-lighter);
        }
      }
    }

    .action-bar {
      display: flex;
      gap: 12px;
      align-items: center;

      .layout-switcher {
        display: flex;
        gap: 8px;
        background: var(--color-background-dark);
        padding: 4px;
        border-radius: 12px;
      }

      .engine-selector-header {
        margin-right: 8px;
      }

      .add-to-vote-btn {
        background: linear-gradient(135deg, var(--color-primary-element-light) 0%, var(--color-primary-element) 100%);
        border: none;
        color: white;

        &:hover {
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(var(--color-primary-element-rgb), 0.3);
        }
      }
    }
  }

  .engine-info {
    margin-bottom: 20px;
    padding: 8px 12px;
    background: var(--color-background-dark);
    border-radius: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;

    .engine-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-weight: 500;
    }

    .vote-limit-info {
      color: var(--color-text-lighter);
      font-size: 12px;
    }
  }

  .cards-layout {
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 20px;

      .vote-card-wrapper {
        position: relative;

        &.selected-for-vote {
          :deep(.option-card) {
            border: 2px solid var(--color-primary-element);
            box-shadow: 0 0 0 2px rgba(var(--color-primary-element-rgb), 0.2);
          }
        }

        :deep(.option-card) {
          height: 100%;
          display: flex;
          flex-direction: column;
          transition: all 0.2s;

          .selection-checkbox {
            position: absolute;
            top: 12px;
            right: 12px;

            input {
              width: 20px;
              height: 20px;
              cursor: pointer;
            }
          }

          .rank-input, .score-input, .grade-input {
            margin-top: 8px;
            padding: 8px;
            background: var(--color-background-dark);
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 8px;

            label {
              font-size: 12px;
              color: var(--color-text-lighter);
            }

            select, input {
              flex: 1;
              padding: 4px 8px;
              border: 1px solid var(--color-border);
              border-radius: 4px;
              background: var(--color-main-background);
            }

            input[type="range"] {
              flex: 2;
            }
          }

          .vote-progress-section {
            margin-top: 12px;
            padding-top: 12px;
            border-top: 1px solid var(--color-border);

            .vote-stats {
              display: flex;
              justify-content: space-between;
              align-items: baseline;
              margin-bottom: 8px;

              .votes-count {
                display: flex;
                align-items: center;
                gap: 4px;
                font-size: 13px;
              }

              .percentage {
                font-weight: 600;
                color: var(--color-primary-element);
              }
            }

            .progress-bar {
              height: 8px;
              background: var(--color-background-dark);
              border-radius: 4px;
              overflow: hidden;

              .progress-fill {
                height: 100%;
                background: var(--color-primary-element);
                transition: width 0.5s ease;

                &.fill-leading {
                  background: #f6c343;
                }

                &.fill-selected {
                  background: #42b883;
                }
              }
            }
          }

          .voted-badge {
            display: flex;
            align-items: center;
            gap: 6px;
            color: #42b883;
            font-size: 13px;
            font-weight: 500;
          }
        }
      }
    }

    .submit-vote-section {
      margin-top: 24px;
      padding: 20px;
      background: var(--color-background-dark);
      border-radius: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 16px;

      .selection-info {
        font-size: 13px;
        color: var(--color-text-lighter);
      }
    }
  }

  .list-layout {
    background: var(--color-main-background);
    border-radius: 16px;
    border: 1px solid var(--color-border);
    overflow: hidden;

    .list-header {
      display: grid;
      grid-template-columns: 80px 1fr 100px 150px 100px;
      background: var(--color-background-dark);
      padding: 12px 16px;
      font-weight: 600;
      border-bottom: 1px solid var(--color-border);

      .list-cell {
        font-size: 13px;
        text-transform: uppercase;
        color: var(--color-text-lighter);
      }
    }

    .list-row {
      display: grid;
      grid-template-columns: 80px 1fr 100px 150px 100px;
      padding: 8px 16px;
      border-bottom: 1px solid var(--color-border);
      transition: background 0.2s;

      &:hover {
        background: var(--color-background-hover);
      }

      &.is-leading {
        background: rgba(246, 195, 67, 0.05);
      }

      &.user-voted {
        background: rgba(66, 184, 131, 0.05);
      }

      &.selected-for-vote {
        background: rgba(var(--color-primary-element-rgb), 0.05);
      }

      .list-cell {
        display: flex;
        align-items: center;

        .rank-number {
          font-weight: 600;
          .medal { font-size: 20px; }
        }

        .percentage-bar {
          flex: 1;
          position: relative;
          height: 24px;
          background: var(--color-background-dark);
          border-radius: 12px;
          overflow: hidden;

          .percentage-fill {
            height: 100%;
            background: var(--color-primary-element);
            transition: width 0.3s;
          }

          .percentage-text {
            position: absolute;
            left: 8px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 11px;
            font-weight: 600;
            color: var(--color-main-text);
            z-index: 1;
          }
        }

        input[type="checkbox"] {
          width: 18px;
          height: 18px;
          cursor: pointer;
        }

        .rank-select-mini, .score-input-mini {
          width: 60px;
          padding: 4px;
          border: 1px solid var(--color-border);
          border-radius: 4px;
        }

        .voted-icon {
          color: #42b883;
        }
      }
    }

    .submit-vote-section.list-submit {
      padding: 16px;
      text-align: center;
      border-top: 1px solid var(--color-border);
    }
  }

  .results-layout {
    .results-summary {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 32px;

      .summary-card {
        background: var(--color-main-background);
        border-radius: 16px;
        padding: 20px;
        display: flex;
        align-items: center;
        gap: 16px;
        border: 1px solid var(--color-border);

        .summary-icon {
          width: 48px;
          height: 48px;
          background: var(--color-background-dark);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-primary-element);
        }

        .summary-content {
          flex: 1;

          .summary-value {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 4px;
          }

          .summary-label {
            font-size: 12px;
            color: var(--color-text-lighter);
          }
        }
      }
    }

    .charts-section {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-bottom: 32px;

      .chart-container {
        background: var(--color-main-background);
        border-radius: 16px;
        padding: 20px;
        border: 1px solid var(--color-border);

        h4 {
          margin: 0 0 16px 0;
          font-size: 16px;
        }

        canvas {
          max-height: 300px;
        }
      }
    }

    .ranking-table {
      background: var(--color-main-background);
      border-radius: 16px;
      border: 1px solid var(--color-border);
      overflow: hidden;

      h4 {
        margin: 0;
        padding: 16px 20px;
        background: var(--color-background-dark);
        border-bottom: 1px solid var(--color-border);
        font-size: 16px;
      }

      table {
        width: 100%;
        border-collapse: collapse;

        th, td {
          padding: 12px 16px;
          text-align: left;
          border-bottom: 1px solid var(--color-border);
        }

        th {
          background: var(--color-background-dark);
          font-weight: 600;
          font-size: 13px;
        }

        .rank-cell {
          width: 80px;

          .rank-badge {
            display: inline-block;
            width: 32px;
            height: 32px;
            line-height: 32px;
            text-align: center;
            border-radius: 8px;
            font-weight: 600;

            &.gold { background: #f6c34320; color: #f6c343; }
            &.silver { background: #c0c0c020; color: #c0c0c0; }
            &.bronze { background: #cd7f3220; color: #cd7f32; }
          }
        }

        .percentage-cell {
          .mini-progress {
            position: relative;
            height: 24px;
            background: var(--color-background-dark);
            border-radius: 12px;
            overflow: hidden;
            width: 120px;

            .mini-progress-fill {
              height: 100%;
              background: var(--color-primary-element);
              transition: width 0.3s;
            }

            span {
              position: absolute;
              left: 8px;
              top: 50%;
              transform: translateY(-50%);
              font-size: 11px;
              font-weight: 600;
            }
          }
        }

        .status-tag {
          font-size: 11px;
          padding: 2px 8px;
          border-radius: 12px;
          text-transform: uppercase;

          &.leading { background: #f6c34320; color: #f6c343; }
          &.selected { background: #42b88320; color: #42b883; }
        }
      }
    }
  }

  .empty-state {
    text-align: center;
    padding: 60px 20px;
    background: var(--color-background-dark);
    border: 2px dashed var(--color-border);
    border-radius: 16px;

    svg {
      color: var(--color-text-lighter);
      margin-bottom: 20px;
    }

    h4 {
      margin: 0 0 8px 0;
      font-size: 18px;
    }

    p {
      margin: 0 0 24px 0;
      color: var(--color-text-lighter);
    }
  }

  .vote-success-toast {
    position: fixed;
    bottom: 24px;
    right: 24px;
    background: #42b883;
    color: white;
    padding: 12px 20px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    animation: slideIn 0.3s ease;
    z-index: 1000;
  }
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .vote-layout {
    .list-layout {
      .list-header,
      .list-row {
        grid-template-columns: 60px 1fr 80px;

        .list-cell.percentage,
        .list-cell.action {
          display: none;
        }
      }
    }

    .results-layout {
      .charts-section {
        grid-template-columns: 1fr;
      }

      .ranking-table {
        overflow-x: auto;
      }
    }
  }
}
</style>
