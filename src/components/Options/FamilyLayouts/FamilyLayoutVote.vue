<!--
  SPDX-FileCopyrightText: 2024 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->
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

    <!-- Cards Layout with OptionCard integration -->
    <div v-if="currentLayout === 'cards'" class="cards-layout">
      <div class="cards-grid">
        <div
          v-for="candidate in rankedCandidates"
          :key="candidate.id"
          class="vote-card-wrapper"
          :class="{ 'selected-for-vote': isSelectedForVote(candidate.id) }"
        >
          <OptionCard
            :option="candidate"
            :compact="false"
            :show-action="!isReadonly"
            :progress-bar="true"
            @click="handleCandidateClick(candidate)"
          >
            <!-- Selection indicator for multi-vote -->
            <template v-if="currentEngine.behavior === 'multi' && canVote && !hasUserVoted" #header-actions>
              <div class="selection-checkbox">
                <input
                  type="checkbox"
                  :checked="isSelectedForVote(candidate.id)"
                  @change="toggleCandidateSelection(candidate.id)"
                  @click.stop
                />
              </div>
            </template>

            <!-- Rank input for ranked voting -->
            <template v-if="currentEngineId === 'ranked' && canVote && !hasUserVoted" #actions>
              <div class="rank-input">
                <label>{{ t('agora', 'Rank') }}</label>
                <select v-model="rankings[candidate.id]" @click.stop>
                  <option :value="null">-</option>
                  <option v-for="i in maxRank" :key="i" :value="i">{{ i }}</option>
                </select>
              </div>
            </template>

            <!-- Score input for score voting -->
            <template v-if="currentEngineId === 'score' && canVote && !hasUserVoted" #actions>
              <div class="score-input">
                <input
                  v-model="scores[candidate.id]"
                  type="range"
                  :min="scoreMin"
                  :max="scoreMax"
                  @click.stop
                />
                <span>{{ scores[candidate.id] || 0 }}</span>
              </div>
            </template>

            <!-- Grade input for majority judgment -->
            <template v-if="currentEngineId === 'majority_judgment' && canVote && !hasUserVoted" #actions>
              <div class="grade-input">
                <select v-model="grades[candidate.id]" @click.stop>
                  <option :value="null">-</option>
                  <option v-for="grade in gradeOptions" :key="grade" :value="grade">
                    {{ grade }}
                  </option>
                </select>
              </div>
            </template>

            <!-- Vote button for single-choice engines -->
            <template v-else-if="currentEngine.behavior === 'single' && canVote && !hasUserVotedFor(candidate.id) && !hasUserVoted" #actions>
              <NcButton
                type="primary"
                size="small"
                @click.stop="voteForCandidate(candidate)"
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
                    <strong>{{ candidate.metadata?.votes || 0 }}</strong>
                    {{ t('agora', 'votes') }}
                  </div>
                  <div class="percentage">
                    {{ getPercentage(candidate) }}%
                  </div>
                </div>
                <div class="progress-bar">
                  <div
                    class="progress-fill"
                    :style="{ width: getPercentage(candidate) + '%' }"
                    :class="{
                      'fill-leading': candidate.metadata?.status === 'leading',
                      'fill-selected': candidate.metadata?.status === 'selected'
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
        <div class="list-cell candidate">{{ t('agora', 'Candidate') }}</div>
        <div class="list-cell votes">{{ t('agora', 'Votes') }}</div>
        <div class="list-cell percentage">{{ t('agora', 'Percentage') }}</div>
        <div class="list-cell action">{{ t('agora', 'Action') }}</div>
      </div>

      <div
        v-for="(candidate, index) in rankedCandidates"
        :key="candidate.id"
        class="list-row"
        :class="{
          'is-leading': candidate.metadata?.status === 'leading',
          'user-voted': hasUserVotedFor(candidate.id),
          'selected-for-vote': isSelectedForVote(candidate.id)
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
        <div class="list-cell candidate">
          <OptionCard
            :option="candidate"
            :compact="true"
            :inline="true"
            :show-action="false"
            @click="handleCandidateClick(candidate)"
          />
        </div>
        <div class="list-cell votes">
          <strong>{{ candidate.metadata?.votes || 0 }}</strong>
        </div>
        <div class="list-cell percentage">
          <div class="percentage-bar">
            <div
              class="percentage-fill"
              :style="{ width: getPercentage(candidate) + '%' }"
            />
            <span class="percentage-text">{{ getPercentage(candidate) }}%</span>
          </div>
        </div>
        <div class="list-cell action">
          <NcButton
            v-if="currentEngine.behavior === 'single' && canVote && !hasUserVotedFor(candidate.id) && !hasUserVoted"
            type="primary"
            size="small"
            @click.stop="voteForCandidate(candidate)"
          >
            <Vote :size="14" />
            {{ t('agora', 'Vote') }}
          </NcButton>
          
          <input
            v-else-if="currentEngine.behavior === 'multi' && canVote && !hasUserVoted"
            type="checkbox"
            :checked="isSelectedForVote(candidate.id)"
            @change="toggleCandidateSelection(candidate.id)"
          />
          
          <select
            v-else-if="currentEngineId === 'ranked' && canVote && !hasUserVoted"
            v-model="rankings[candidate.id]"
            class="rank-select-mini"
          >
            <option :value="null">-</option>
            <option v-for="i in maxRank" :key="i" :value="i">{{ i }}</option>
          </select>
          
          <input
            v-else-if="currentEngineId === 'score' && canVote && !hasUserVoted"
            v-model="scores[candidate.id]"
            type="number"
            :min="scoreMin"
            :max="scoreMax"
            class="score-input-mini"
          />
          
          <div v-else-if="hasUserVotedFor(candidate.id)" class="voted-icon">
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

    <!-- Results Layout (beautiful detailed analytics) -->
    <div v-else-if="currentLayout === 'results'" class="results-layout">
      <!-- Summary cards -->
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

      <!-- Charts Section -->
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

      <!-- Detailed ranking table -->
      <div class="ranking-table">
        <h4>{{ t('agora', 'Detailed Ranking') }}</h4>
        <table>
          <thead>
            <tr>
              <th>{{ t('agora', 'Rank') }}</th>
              <th>{{ t('agora', 'Candidate') }}</th>
              <th>{{ t('agora', 'Votes') }}</th>
              <th>{{ t('agora', 'Percentage') }}</th>
              <th>{{ t('agora', 'Status') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(candidate, index) in rankedCandidates" :key="candidate.id">
              <td class="rank-cell">
                <span class="rank-badge" :class="getRankClass(index)">
                  {{ index + 1 }}
                </span>
              </td>
              <td>
                <div class="candidate-name">
                  {{ candidate.title }}
                </div>
              </td>
              <td class="votes-cell">{{ candidate.metadata?.votes || 0 }}</td>
              <td class="percentage-cell">
                <div class="mini-progress">
                  <div
                    class="mini-progress-fill"
                    :style="{ width: getPercentage(candidate) + '%' }"
                  />
                  <span>{{ getPercentage(candidate) }}%</span>
                </div>
              </td>
              <td>
                <span v-if="candidate.metadata?.status" class="status-tag" :class="candidate.metadata.status">
                  {{ candidate.metadata.status }}
                </span>
                <span v-else>-</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Empty state -->
    <div v-if="candidates.length === 0" class="empty-state">
      <component :is="getOptionTypeIcon('candidate')" :size="48" />
      <h4>{{ t('agora', 'No candidates yet') }}</h4>
      <p>{{ t('agora', 'Add candidates to start the voting process') }}</p>
      <NcButton
        v-if="!isReadonly"
        type="primary"
        @click="showAddToVoteModal = true"
      >
        <template #icon>
          <Plus :size="16" />
        </template>
        {{ t('agora', 'Add Candidate') }}
      </NcButton>
    </div>

   <!-- Engine Selector Modal -->
<EngineSelectorModal
  v-if="showEngineSelector"
  :current-engine-id="currentEngineId"
  :current-config="engineConfig"
  :engines="availableEngines"
  :engine-definitions="ENGINE_DEFINITIONS"
  @close="showEngineSelector = false"
  @apply="handleEngineApply"
/>
<!-- Add to Vote Modal -->
<AddToVoteModal
  v-if="showAddToVoteModal"
  :engines="availableEnginesForAdd"
  :engine-definitions="ENGINE_DEFINITIONS"
  :current-engine-id="currentEngineId"
  @close="closeAddToVoteModal"
  @success="handleAddSuccess"
/>


    <!-- Success toast -->
    <div v-if="voteSuccessMessage" class="vote-success-toast">
      <CheckCircle :size="20" />
      {{ voteSuccessMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcModal from '@nextcloud/vue/components/NcModal'
import Chart from 'chart.js/auto'
import { showSuccess, showError } from '@nextcloud/dialogs'

import OptionCard from '../OptionCard.vue'
import { getOptionTypeIconComponent } from '../../../helpers/modules/InquiryOptionHelper'
import { InquiryOptionIcons } from '../../../utils/icons'
import SearchSelect from '../../Base/modules/SearchSelect.vue'
import type { Option, Inquiry, OptionFamily, InquiryOptionType } from '../../Types/index'
import { useInquiryStore } from '../../../stores/inquiry'
import { useOptionsStore } from '../../../stores/options'
import { OptionsAPI, InquiriesAPI } from '../../../Api/index'
import { calculateResults } from '../../../utils/voteCalculations'
import type { SupportData, VotingResults } from '../../../types/VotingTypes'
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
  ThumbsDown,
  Star,
  TrendingUp as Trending,
  Heart,
  Award,
  Scale,
  Brain,
  Gauge
} from 'lucide-vue-next'

import EngineSelectorModal from '../../Modals/EngineSelectorModal.vue'
import AddToVoteModal from '../../Modals/AddToVoteModal.vue'


// Add this function to get engine icons
const getEngineIcon = (engineId: string) => {
  const icons: Record<string, any> = {
    binary: ThumbsUp,
    ternary: Scale,
    reaction: Heart,
    score: Star,
    approval: CheckCircle,
    ranked: Trending,
    borda: Award,
    condorcet: Brain,
    majority_judgment: Gauge,
    token_weighted: Users,
    quadratic: TrendingUp
  }
  return icons[engineId] || Vote
}

// Add array editor helpers
const addArrayItem = (key: string) => {
  if (!tempEngineConfig.value[key]) {
    tempEngineConfig.value[key] = []
  }
  tempEngineConfig.value[key].push('')
}

const removeArrayItem = (key: string, index: number) => {
  tempEngineConfig.value[key].splice(index, 1)
}

// Engine definitions from family config
const ENGINE_DEFINITIONS = {
  binary: {
    label: 'Yes / No',
    behavior: 'single',
    description: 'Simple yes/no voting on a single option',
    constraints: { min_candidates: 1, max_candidates: 1 },
    config_schema: {}
  },
  ternary: {
    label: 'For / Abstain / Against',
    behavior: 'single',
    description: 'Choose between For, Abstain, or Against',
    constraints: { min_candidates: 1, max_candidates: 1 },
    config_schema: {}
  },
  reaction: {
    label: 'Reactions',
    behavior: 'single',
    description: 'React with emojis to show your opinion',
    constraints: { min_candidates: 1, max_candidates: 1 },
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
    constraints: { min_candidates: 1, max_candidates: 1 },
    config_schema: {
      min: { type: 'number', default: 0, label: 'Minimum score' },
      max: { type: 'number', default: 10, label: 'Maximum score' }
    }
  },
  approval: {
    label: 'Approval Voting',
    behavior: 'multi',
    description: 'Select all options you approve of',
    constraints: { min_candidates: 2 },
    config_schema: {
      min_choices: { type: 'number', default: 1, label: 'Minimum choices' },
      max_choices: { type: 'number|null', default: null, label: 'Maximum choices' }
    }
  },
  ranked: {
    label: 'Ranked Choice',
    behavior: 'multi',
    description: 'Rank options in order of preference',
    constraints: { min_candidates: 2 },
    config_schema: {
      max_rank: { type: 'number|null', default: null, label: 'Maximum rank' }
    }
  },
  borda: {
    label: 'Borda Count',
    behavior: 'multi',
    description: 'Rank options, points assigned by rank position',
    constraints: { min_candidates: 2 },
    config_schema: {}
  },
  condorcet: {
    label: 'Condorcet',
    behavior: 'multi',
    description: 'Pairwise comparison voting method',
    constraints: { min_candidates: 2 },
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
    constraints: { min_candidates: 2 },
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
    constraints: { min_candidates: 1, requires_weight_source: true },
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
    constraints: { min_candidates: 1 },
    config_schema: {
      credits_per_user: { type: 'number', default: 100, label: 'Credits per user' }
    }
  }
}

const props = defineProps<{
  options: Option[]
  userId?: string
  voteSession?: any
  canVote?: boolean
  canManageCandidates?: boolean
  isReadonly?: boolean
  userVote?: any
  family: OptionFamily
  supports?: SupportData[]
  optionTypes?: InquiryOptionType[]
  optionsByInquiry?: Option[]
}>()

const emit = defineEmits<{
  'vote': [candidateId: number, voteData?: any]
  'multiVote': [votes: Array<{ candidateId: number; value: any }>]
  'select': [candidate: Option]
  'addOption': [optionType: string]
  'update:options': []
}>()

// Layout state
const allowedLayouts = ['cards', 'list', 'results']
const currentLayout = ref('cards')

// Multi-vote state
const selectedCandidates = ref<Set<number>>(new Set())
const rankings = ref<Record<number, number>>({})
const scores = ref<Record<number, number>>({})
const grades = ref<Record<number, string>>({})

// Engine configuration
const currentEngineId = ref(props.voteSession?.engine || 'binary')
const showEngineSelector = ref(false)
const selectedEngineForConfig = ref(currentEngineId.value)
const tempEngineConfig = ref<Record<string, any>>({})

const currentEngine = computed(() => ENGINE_DEFINITIONS[currentEngineId.value as keyof typeof ENGINE_DEFINITIONS])

// Engine-specific constraints
const maxRank = computed(() => {
  if (currentEngineId.value === 'ranked' && engineConfig.value.max_rank) {
    return engineConfig.value.max_rank
  }
  return candidates.value.length
})

const scoreMin = computed(() => {
  if (currentEngineId.value === 'score') {
    return engineConfig.value.min || 0
  }
  return 0
})

const handleEngineApply = (engineId: string, config: Record<string, any>) => {
  currentEngineId.value = engineId
  engineConfig.value = config
  showEngineSelector.value = false
  emit('update:options')
}

const handleAddSuccess = () => {
  emit('update:options')
  emit('addOption', 'candidate')
}


const scoreMax = computed(() => {
  if (currentEngineId.value === 'score') {
    return engineConfig.value.max || 10
  }
  return 10
})

const gradeOptions = computed(() => {
  if (currentEngineId.value === 'majority_judgment') {
    return engineConfig.value.grades || ['Reject', 'Poor', 'Fair', 'Good', 'Excellent']
  }
  return []
})

const voteLimitInfo = computed(() => {
  if (!currentEngine.value) return null
  
  const config = engineConfig.value
  if (currentEngineId.value === 'approval') {
    const min = config.min_choices
    const max = config.max_choices
    if (min && max) return t('agora', 'Select {min}-{max} options', { min, max })
    if (min) return t('agora', 'Select at least {min} options', { min })
    if (max) return t('agora', 'Select up to {max} options', { max })
  }
  
  if (currentEngineId.value === 'ranked') {
    const max = config.max_rank
    if (max) return t('agora', 'Rank up to {max} options', { max })
    return t('agora', 'Rank all options')
  }
  
  return null
})

const voteSelectionInfo = computed(() => {
  if (currentEngineId.value === 'approval') {
    const selectedCount = selectedCandidates.value.size
    const min = engineConfig.value.min_choices
    const max = engineConfig.value.max_choices
    
    if (min && max) return t('agora', '{selected}/{min}-{max} selected', { selected: selectedCount, min, max })
    if (min) return t('agora', '{selected}/{min}+ selected', { selected: selectedCount, min })
    if (max) return t('agora', '{selected}/{max} selected', { selected: selectedCount, max })
  }
  
  if (currentEngineId.value === 'ranked') {
    const rankedCount = Object.values(rankings.value).filter(r => r !== null).length
    const max = engineConfig.value.max_rank || candidates.value.length
    return t('agora', '{ranked}/{max} ranked', { ranked: rankedCount, max })
  }
  
  return null
})

const canSubmitMultiVote = computed(() => {
  if (currentEngineId.value === 'approval') {
    const selectedCount = selectedCandidates.value.size
    const min = engineConfig.value.min_choices || 1
    const max = engineConfig.value.max_choices
    if (max !== null && selectedCount > max) return false
    return selectedCount >= min
  }
  
  if (currentEngineId.value === 'ranked') {
    const ranks = Object.entries(rankings.value)
      .filter(([_, rank]) => rank !== null)
      .map(([_, rank]) => rank)
    
    const uniqueRanks = new Set(ranks)
    if (uniqueRanks.size !== ranks.length) return false
    
    const maxRankValue = engineConfig.value.max_rank || candidates.value.length
    return ranks.length > 0 && Math.max(...ranks) <= maxRankValue
  }
  
  if (currentEngineId.value === 'score') {
    return Object.values(scores.value).some(s => s !== null && s !== undefined)
  }
  
  if (currentEngineId.value === 'majority_judgment') {
    return Object.values(grades.value).some(g => g !== null)
  }
  
  return selectedCandidates.value.size > 0
})

// Chart references
const pieChartCanvas = ref<HTMLCanvasElement | null>(null)
const barChartCanvas = ref<HTMLCanvasElement | null>(null)
let pieChart: Chart | null = null
let barChart: Chart | null = null

// Success message
const voteSuccessMessage = ref('')
let successTimeout: NodeJS.Timeout

// Add to vote modal state
const showAddToVoteModal = ref(false)
const selectedOptionForVote = ref<Option | null>(null)
const selectedEngine = ref<string>('')
const engineConfig = ref<Record<string, any>>({})
const addingToVote = ref(false)

// Available engines (filtered by constraints)
const availableEngines = computed(() => {
  const engines = Object.entries(ENGINE_DEFINITIONS).map(([id, def]) => ({
    id,
    label: def.label,
    behavior: def.behavior,
    description: def.description,
    constraints: def.constraints
  }))
  
  const candidateCount = candidates.value.length
  return engines.filter(engine => {
    const constraints = ENGINE_DEFINITIONS[engine.id as keyof typeof ENGINE_DEFINITIONS].constraints
    if (constraints.min_candidates && candidateCount < constraints.min_candidates) return false
    if (constraints.max_candidates && candidateCount > constraints.max_candidates) return false
    return true
  })
})

const currentEngineConfigSchema = computed(() => {
  if (!selectedEngine.value) return null
  const engine = ENGINE_DEFINITIONS[selectedEngine.value as keyof typeof ENGINE_DEFINITIONS]
  return engine?.config_schema || null
})

const currentEngineConfigSchemaForConfig = computed(() => {
  if (!selectedEngineForConfig.value) return null
  const engine = ENGINE_DEFINITIONS[selectedEngineForConfig.value as keyof typeof ENGINE_DEFINITIONS]
  return engine?.config_schema || null
})

// Get current inquiry ID
const inquiryStore = useInquiryStore()
const inquiryId = computed(() => inquiryStore.id)

// Options store
const optionsStore = useOptionsStore()

// Computed properties
const candidates = computed(() =>
  props.options.filter(opt => opt.type === 'candidate' || opt.type === 'proposal')
)

// Calculate voting results
const votingResults = computed((): VotingResults => {
  if (!props.supports || props.supports.length === 0) {
    return {
      raw: {},
      aggregates: { total: 0, participation: 0, quorumReached: false },
      specifics: {}
    }
  }

  return calculateResults(currentEngineId.value, props.supports, {
    ranking: { maxChoices: engineConfig.value.max_rank || 3 },
    scale: {
      min: engineConfig.value.min_score || 0,
      max: engineConfig.value.max_score || 10
    },
    grades: engineConfig.value.grades || ['Reject', 'Poor', 'Fair', 'Good', 'Excellent']
  })
})

const totalVotes = computed(() => votingResults.value.aggregates.total ||
    candidates.value.reduce((sum, c) => sum + (c.metadata?.votes || 0), 0))

const rankedCandidates = computed(() => {
  if (votingResults.value.specifics?.rankings) {
    const rankings = votingResults.value.specifics.rankings
    return rankings
      .map(ranking => {
        const candidate = candidates.value.find(c => c.id.toString() === ranking.optionId)
        return candidate ? { ...candidate, rankingScore: ranking.score, rank: ranking.rank } : null
      })
      .filter(c => c !== null)
  }

  return [...candidates.value].sort((a, b) =>
    (b.metadata?.votes || 0) - (a.metadata?.votes || 0)
  )
})

const winner = computed(() => rankedCandidates.value[0])

const winnerPercentage = computed(() =>
  winner.value ? getPercentage(winner.value) : 0
)

const hasUserVoted = computed(() => !!props.userVote)

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

const canAddToVote = computed(() => selectedOptionForVote.value !== null && selectedEngine.value !== '')

// Helper functions
const getEngineLabel = (engineId: string) => ENGINE_DEFINITIONS[engineId as keyof typeof ENGINE_DEFINITIONS]?.label || engineId

const getEngineDescription = (engineId: string) => ENGINE_DEFINITIONS[engineId as keyof typeof ENGINE_DEFINITIONS]?.description || ''

const getBehaviorLabel = (behavior: string) => {
  const labels = {
    single: t('agora', 'Single choice'),
    multi: t('agora', 'Multiple choices'),
    flex: t('agora', 'Flexible')
  }
  return labels[behavior as keyof typeof labels] || behavior
}

const getSubmitButtonText = () => {
  if (currentEngineId.value === 'approval') return t('agora', 'Submit selections')
  if (currentEngineId.value === 'ranked') return t('agora', 'Submit ranking')
  if (currentEngineId.value === 'score') return t('agora', 'Submit scores')
  if (currentEngineId.value === 'majority_judgment') return t('agora', 'Submit grades')
  return t('agora', 'Submit vote')
}

const getPercentage = (candidate: Option) => {
  if (!totalVotes.value) return 0
  const votes = candidate.metadata?.votes || 0
  return Math.round((votes / totalVotes.value) * 100)
}

const hasUserVotedFor = (candidateId: number) => {
  if (currentEngine.value?.behavior === 'multi') {
    return props.userVote?.votes?.some((v: any) => v.candidate_id === candidateId) || false
  }
  return props.userVote?.candidate_id === candidateId
}

const isSelectedForVote = (candidateId: number) => {
  if (currentEngineId.value === 'ranked') {
    return rankings.value[candidateId] !== null && rankings.value[candidateId] !== undefined
  }
  if (currentEngineId.value === 'score') {
    return scores.value[candidateId] !== null && scores.value[candidateId] !== undefined
  }
  if (currentEngineId.value === 'majority_judgment') {
    return grades.value[candidateId] !== null && grades.value[candidateId] !== undefined
  }
  return selectedCandidates.value.has(candidateId)
}

const toggleCandidateSelection = (candidateId: number) => {
  if (selectedCandidates.value.has(candidateId)) {
    selectedCandidates.value.delete(candidateId)
  } else {
    const maxChoices = engineConfig.value.max_choices
    if (maxChoices && selectedCandidates.value.size >= maxChoices) {
      showError(t('agora', 'You can only select up to {max} options', { max: maxChoices }))
      return
    }
    selectedCandidates.value.add(candidateId)
  }
  selectedCandidates.value = new Set(selectedCandidates.value)
}

const handleCandidateClick = (candidate: Option) => {
  if (currentEngine.value?.behavior === 'multi' && props.canVote && !hasUserVoted.value) {
    toggleCandidateSelection(candidate.id)
  } else {
    emit('select', candidate)
  }
}

const voteForCandidate = (candidate: Option) => {
  if (!props.canVote || hasUserVoted.value) return

  const voteData: any = {}
  if (currentEngineId.value === 'score') {
    voteData.score = scores.value[candidate.id] || 0
  } else if (currentEngineId.value === 'reaction') {
    voteData.reaction = '👍'
  }

  emit('vote', candidate.id, voteData)

  voteSuccessMessage.value = t('agora', 'Your vote for "{candidate}" has been recorded!', { candidate: candidate.title })
  if (successTimeout) clearTimeout(successTimeout)
  successTimeout = setTimeout(() => {
    voteSuccessMessage.value = ''
  }, 3000)
}

const submitMultiVote = () => {
  if (!props.canVote || hasUserVoted.value) return
  
  const votes: Array<{ candidateId: number; value: any }> = []
  
  if (currentEngineId.value === 'approval') {
    for (const candidateId of selectedCandidates.value) {
      votes.push({ candidateId, value: 1 })
    }
  } else if (currentEngineId.value === 'ranked') {
    for (const [candidateId, rank] of Object.entries(rankings.value)) {
      if (rank !== null) {
        votes.push({ candidateId: parseInt(candidateId), value: rank })
      }
    }
  } else if (currentEngineId.value === 'score') {
    for (const [candidateId, score] of Object.entries(scores.value)) {
      if (score !== null && score !== undefined) {
        votes.push({ candidateId: parseInt(candidateId), value: score })
      }
    }
  } else if (currentEngineId.value === 'majority_judgment') {
    for (const [candidateId, grade] of Object.entries(grades.value)) {
      if (grade !== null) {
        votes.push({ candidateId: parseInt(candidateId), value: grade })
      }
    }
  }
  
  emit('multiVote', votes)
  
  const voteCount = votes.length
  voteSuccessMessage.value = t('agora', 'Your vote for {count} {countLabel} has been recorded!', {
    count: voteCount,
    countLabel: voteCount === 1 ? t('agora', 'option') : t('agora', 'options')
  })
  
  if (successTimeout) clearTimeout(successTimeout)
  successTimeout = setTimeout(() => {
    voteSuccessMessage.value = ''
  }, 3000)
  
  selectedCandidates.value.clear()
  rankings.value = {}
  scores.value = {}
  grades.value = {}
}

const applyEngineConfig = () => {
  if (selectedEngineForConfig.value) {
    currentEngineId.value = selectedEngineForConfig.value
    engineConfig.value = { ...tempEngineConfig.value }
    showEngineSelector.value = false
    
    // Emit to parent to save the engine configuration
    emit('update:options')
  }
}

const formatDate = (date: string) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString()
}

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

const getRankClass = (index: number) => {
  if (index === 0) return 'gold'
  if (index === 1) return 'silver'
  if (index === 2) return 'bronze'
  return ''
}

const getLayoutIcon = (layout: string) => {
  const icons = {
    cards: LayoutGrid,
    list: List,
    results: BarChart3
  }
  return icons[layout as keyof typeof icons] || LayoutGrid
}

const getOptionTypeIcon = (type: string) => getOptionTypeIconComponent(type, [])

// Archive original option (like Kanban)
async function archiveOption(option: Option) {
  const miscFields = option.miscFields || {}
  const updatedMiscFields = {
    ...miscFields,
    archived: true,
    archive_root_id: option.id
  }

  const miscFieldsArray = Object.entries(updatedMiscFields).map(([key, value]) => ({
    key,
    value: typeof value === 'object' ? JSON.stringify(value) : String(value)
  }))

  await OptionsAPI.updateOption(option.id, {
    status: 'archived',
    miscFields: miscFieldsArray
  })
}

// Clone option for voting
async function cloneOptionForVote(original: Option): Promise<Option> {
  const miscFields = original.miscFields || {}
  const cloneMiscFields = {
    ...miscFields,
    archive_parent_id: original.id,
    archive_root_id: original.id
  }

  const miscFieldsArray = Object.entries(cloneMiscFields).map(([key, value]) => ({
    key,
    value: typeof value === 'object' ? JSON.stringify(value) : String(value)
  }))

  const cloneData = {
    title: original.title,
    text: original.text,
    type: 'candidate',
    targetId: original.targetId,
    parentId: original.parentId,
    ownedGroup: original.ownedGroup || '',
    access: original.configuration?.access || 'open',
    status: 'published',
    supportFeature: original.configuration?.supportFeature || selectedEngine.value,
    allowComment: original.configuration?.allowComment || 0,
    family: original.family,
    miscFields: miscFieldsArray
  }

  const response = await OptionsAPI.createOption(cloneData)
  return response.data.option
}

// Add to vote main action (like Kanban's addExistingToKanban)
async function addToVote() {
  if (!selectedOptionForVote.value || !selectedEngine.value) return

  addingToVote.value = true
  try {
    // 1. Archive the original option
    await archiveOption(selectedOptionForVote.value)

    // 2. Clone it as a candidate
    const clonedOption = await cloneOptionForVote(selectedOptionForVote.value)

    // 3. Add vote layout to force_layouts
    const currentMiscFields = clonedOption.miscFields || {}
    const forceLayouts = currentMiscFields.force_layouts || []
    const updatedLayouts = [...forceLayouts, 'vote']
    
    const miscFieldsArray = Object.entries({
      ...currentMiscFields,
      force_layouts: JSON.stringify(updatedLayouts)
    }).map(([key, value]) => ({
      key,
      value: typeof value === 'object' ? JSON.stringify(value) : String(value)
    }))

    await OptionsAPI.updateOption(clonedOption.id, {
      miscFields: miscFieldsArray
    })

    // 4. Update inquiry with decision configuration
    const decision = {
      engine: selectedEngine.value,
      config: engineConfig.value,
      status: 'open',
      phase: 'voting'
    }

    const inquiryMiscFields = inquiryStore.miscFields || {}
    const inquiryMiscFieldsArray = Object.entries({
      ...inquiryMiscFields,
      decision: JSON.stringify(decision)
    }).map(([key, value]) => ({
      key,
      value: typeof value === 'object' ? JSON.stringify(value) : String(value)
    }))

    await InquiriesAPI.updateInquiry(inquiryStore.id, { miscFields: inquiryMiscFieldsArray })

    // 5. Refresh data
    await inquiryStore.load()
    await optionsStore.load()

    // 6. Close modal and show success
    showAddToVoteModal.value = false
    selectedOptionForVote.value = null
    selectedEngine.value = ''
    engineConfig.value = {}
    showSuccess(t('agora', 'Option added to vote and original archived'))

    emit('update:options')
    emit('addOption', 'candidate')
  } catch (error) {
    console.error('Error adding option to vote:', error)
    showError(t('agora', 'Failed to add option to vote'))
  } finally {
    addingToVote.value = false
  }
}

// Add these methods to handle engine selection
const selectEngineForConfig = (engineId: string) => {
  selectedEngineForConfig.value = engineId
  // Initialize temp config with defaults
  const schema = ENGINE_DEFINITIONS[engineId as keyof typeof ENGINE_DEFINITIONS]?.config_schema
  if (schema) {
    const newConfig: Record<string, any> = {}
    for (const [key, value] of Object.entries(schema)) {
      newConfig[key] = value.default
    }
    tempEngineConfig.value = newConfig
  } else {
    tempEngineConfig.value = {}
  }
}

const selectEngineForAdd = (engineId: string) => {
  selectedEngine.value = engineId
  // Initialize config with defaults
  const schema = ENGINE_DEFINITIONS[engineId as keyof typeof ENGINE_DEFINITIONS]?.config_schema
  if (schema) {
    const newConfig: Record<string, any> = {}
    for (const [key, value] of Object.entries(schema)) {
      newConfig[key] = value.default
    }
    engineConfig.value = newConfig
  } else {
    engineConfig.value = {}
  }
}

const closeAddToVoteModal = () => {
  showAddToVoteModal.value = false
  selectedOptionForVote.value = null
  selectedEngine.value = ''
  engineConfig.value = {}
}

// Update availableEnginesForAdd to filter based on candidates
const availableEnginesForAdd = computed(() => {
  const candidateCount = candidates.value.length
  return availableEngines.value.filter(engine => {
    const constraints = ENGINE_DEFINITIONS[engine.id as keyof typeof ENGINE_DEFINITIONS].constraints
    // When adding a new candidate, we'll have +1 after adding
    if (constraints.min_candidates && candidateCount + 1 < constraints.min_candidates) return false
    if (constraints.max_candidates && candidateCount + 1 > constraints.max_candidates) return false
    return true
  })
})

// Chart creation
const createCharts = () => {
  if (!pieChartCanvas.value || !barChartCanvas.value) return

  const labels = rankedCandidates.value.map(c => c.title)
  const votes = rankedCandidates.value.map(c => c.metadata?.votes || 0)
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
        legend: {
          position: 'bottom',
          labels: { font: { size: 11 } }
        }
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
      scales: {
        y: {
          beginAtZero: true,
          ticks: { stepSize: 1 }
        }
      },
      plugins: { legend: { display: false } }
    }
  })
}

// Watch for changes
watch([rankedCandidates, currentLayout, votingResults], () => {
  if (currentLayout.value === 'results') {
    nextTick(() => createCharts())
  }
})

// Initialize engine config
watch(selectedEngine, (newEngine) => {
  if (newEngine) {
    const schema = ENGINE_DEFINITIONS[newEngine as keyof typeof ENGINE_DEFINITIONS]?.config_schema
    if (schema) {
      const newConfig: Record<string, any> = {}
      for (const [key, value] of Object.entries(schema)) {
        newConfig[key] = value.default
      }
      engineConfig.value = newConfig
    }
  }
})

watch(selectedEngineForConfig, (newEngine) => {
  if (newEngine) {
    const schema = ENGINE_DEFINITIONS[newEngine as keyof typeof ENGINE_DEFINITIONS]?.config_schema
    if (schema) {
      const newConfig: Record<string, any> = {}
      for (const [key, value] of Object.entries(schema)) {
        newConfig[key] = value.default
      }
      tempEngineConfig.value = newConfig
    }
  }
})

// Initialize temp config
watch(showEngineSelector, (show) => {
  if (show) {
    selectedEngineForConfig.value = currentEngineId.value
    tempEngineConfig.value = { ...engineConfig.value }
  }
})

// Cleanup
onUnmounted(() => {
  if (pieChart) pieChart.destroy()
  if (barChart) barChart.destroy()
  if (successTimeout) clearTimeout(successTimeout)
})
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

  // Engine selector modal styles
  .engine-selector-modal {
    padding: 0;
    max-width: 700px;
    background: var(--color-main-background);
    border-radius: 24px;
    overflow: hidden;

    .modal-header {
      text-align: center;
      padding: 32px 32px 24px;
      background: linear-gradient(135deg, rgba(var(--color-primary-element-rgb), 0.05) 0%, rgba(var(--color-primary-element-rgb), 0.02) 100%);
      border-bottom: 1px solid var(--color-border);

      .header-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 64px;
        height: 64px;
        background: linear-gradient(135deg, var(--color-primary-element) 0%, var(--color-primary-element-light) 100%);
        border-radius: 32px;
        margin-bottom: 16px;
        color: white;
      }

      h3 {
        margin: 0 0 8px 0;
        font-size: 24px;
        font-weight: 700;
      }

      .modal-description {
        margin: 0;
        font-size: 14px;
        color: var(--color-text-lighter);
      }
    }

    .engine-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 16px;
      padding: 24px;

      .engine-card {
        position: relative;
        padding: 20px;
        background: var(--color-background-dark);
        border: 2px solid var(--color-border);
        border-radius: 16px;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-2px);
          border-color: var(--color-primary-element);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        &.selected {
          border-color: var(--color-primary-element);
          background: rgba(var(--color-primary-element-rgb), 0.05);
        }

        .engine-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;

          .engine-icon {
            width: 48px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--color-main-background);
            border-radius: 12px;
            color: var(--color-primary-element);
          }

          .engine-badge {
            font-size: 11px;
            padding: 4px 8px;
            border-radius: 20px;
            font-weight: 500;

            &.single { background: #3498db20; color: #3498db; }
            &.multi { background: #9b59b620; color: #9b59b6; }
            &.flex { background: #e67e2220; color: #e67e22; }
          }
        }

        .engine-card-content {
          h4 {
            margin: 0 0 8px 0;
            font-size: 16px;
            font-weight: 600;
          }

          p {
            margin: 0;
            font-size: 12px;
            color: var(--color-text-lighter);
            line-height: 1.4;
          }
        }

        .engine-check {
          position: absolute;
          top: 12px;
          right: 12px;
          color: var(--color-primary-element);
        }
      }
    }

    .engine-config-section {
      margin: 0 24px 24px 24px;
      padding: 20px;
      background: var(--color-background-dark);
      border-radius: 16px;
      border: 1px solid var(--color-border);

      .config-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 20px;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--color-border);

        svg {
          color: var(--color-primary-element);
        }

        h5 {
          margin: 0;
          font-size: 15px;
          font-weight: 600;
        }
      }

      .config-fields {
        .config-field {
          margin-bottom: 20px;

          &:last-child {
            margin-bottom: 0;
          }

          label {
            display: block;
            margin-bottom: 8px;
            font-size: 13px;
            font-weight: 500;

            .field-hint {
              font-size: 11px;
              color: var(--color-text-lighter);
              font-weight: normal;
            }
          }

          .field-input {
            position: relative;

            .range-input {
              width: 100%;
              height: 6px;
              -webkit-appearance: none;
              background: var(--color-border);
              border-radius: 3px;
              outline: none;

              &::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background: var(--color-primary-element);
                cursor: pointer;
                transition: all 0.2s;

                &:hover {
                  transform: scale(1.2);
                }
              }
            }

            .text-input, .select-input {
              width: 100%;
              padding: 8px 12px;
              border: 1px solid var(--color-border);
              border-radius: 8px;
              background: var(--color-main-background);
              font-size: 13px;
              transition: all 0.2s;

              &:focus {
                outline: none;
                border-color: var(--color-primary-element);
                box-shadow: 0 0 0 2px rgba(var(--color-primary-element-rgb), 0.1);
              }
            }

            .boolean-field {
              display: flex;
              align-items: center;
              gap: 12px;

              .toggle-switch {
                position: relative;
                display: inline-block;
                width: 44px;
                height: 24px;

                input {
                  opacity: 0;
                  width: 0;
                  height: 0;

                  &:checked + .toggle-slider {
                    background-color: var(--color-primary-element);
                  }

                  &:checked + .toggle-slider:before {
                    transform: translateX(20px);
                  }
                }

                .toggle-slider {
                  position: absolute;
                  cursor: pointer;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  background-color: var(--color-border);
                  transition: 0.3s;
                  border-radius: 34px;

                  &:before {
                    position: absolute;
                    content: "";
                    height: 18px;
                    width: 18px;
                    left: 3px;
                    bottom: 3px;
                    background-color: white;
                    transition: 0.3s;
                    border-radius: 50%;
                  }
                }
              }

              .boolean-label {
                font-size: 13px;
              }
            }

            .array-field {
              .array-item {
                display: flex;
                gap: 8px;
                margin-bottom: 8px;

                .text-input {
                  flex: 1;
                }

                .remove-btn {
                  width: 32px;
                  height: 32px;
                  border: 1px solid var(--color-border);
                  background: var(--color-background-hover);
                  border-radius: 6px;
                  cursor: pointer;
                  font-size: 18px;
                  transition: all 0.2s;

                  &:hover {
                    background: var(--color-error);
                    color: white;
                    border-color: var(--color-error);
                  }
                }
              }

              .add-btn {
                display: inline-flex;
                align-items: center;
                gap: 4px;
                padding: 4px 12px;
                background: var(--color-background-hover);
                border: 1px solid var(--color-border);
                border-radius: 6px;
                font-size: 12px;
                cursor: pointer;
                transition: all 0.2s;

                &:hover {
                  background: var(--color-primary-element);
                  color: white;
                  border-color: var(--color-primary-element);
                }
              }
            }

            .range-value {
              position: absolute;
              right: 0;
              top: -25px;
              font-size: 11px;
              color: var(--color-text-lighter);
            }
          }

          .field-description {
            margin: 4px 0 0 0;
            font-size: 11px;
            color: var(--color-text-lighter);
          }
        }
      }
    }

    .modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      padding: 20px 24px;
      background: var(--color-background-dark);
      border-top: 1px solid var(--color-border);

      .btn-secondary, .btn-primary {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 10px 20px;
        border: none;
        border-radius: 12px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }

      .btn-secondary {
        background: var(--color-background-hover);
        color: var(--color-main-text);

        &:hover:not(:disabled) {
          background: var(--color-background-dark);
          transform: translateY(-1px);
        }
      }

      .btn-primary {
        background: linear-gradient(135deg, var(--color-primary-element) 0%, var(--color-primary-element-light) 100%);
        color: white;

        &.loading {
          opacity: 0.7;
          cursor: wait;
        }

        &:hover:not(:disabled):not(.loading) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(var(--color-primary-element-rgb), 0.3);
        }
      }
    }
  }

  // Add to vote modal styles
  .add-to-vote-modal {
    padding: 0;
    max-width: 600px;
    background: var(--color-main-background);
    border-radius: 24px;
    overflow: hidden;

    .modal-header {
      text-align: center;
      padding: 32px 32px 24px;
      background: linear-gradient(135deg, rgba(var(--color-primary-element-rgb), 0.05) 0%, rgba(var(--color-primary-element-rgb), 0.02) 100%);
      border-bottom: 1px solid var(--color-border);

      .header-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 64px;
        height: 64px;
        background: linear-gradient(135deg, var(--color-primary-element) 0%, var(--color-primary-element-light) 100%);
        border-radius: 32px;
        margin-bottom: 16px;
        color: white;
      }

      h3 {
        margin: 0 0 8px 0;
        font-size: 24px;
        font-weight: 700;
      }

      .modal-description {
        margin: 0;
        font-size: 14px;
        color: var(--color-text-lighter);
      }
    }

    .modal-content {
      padding: 24px;

      .search-section {
        margin-bottom: 24px;

        label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          font-size: 14px;
        }

        .search-select {
          width: 100%;
        }
      }

      .vote-config-section {
        .config-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--color-border);

          svg {
            color: var(--color-primary-element);
          }

          h4 {
            margin: 0;
            font-size: 15px;
            font-weight: 600;
          }
        }

        .engine-selection {
          margin-bottom: 24px;

          label {
            display: block;
            margin-bottom: 12px;
            font-weight: 600;
            font-size: 13px;
          }

          .engine-options-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
            gap: 8px;

            .engine-card-small {
              display: flex;
              align-items: center;
              gap: 8px;
              padding: 10px 12px;
              background: var(--color-background-dark);
              border: 2px solid transparent;
              border-radius: 12px;
              cursor: pointer;
              transition: all 0.2s;

              svg {
                color: var(--color-text-lighter);
              }

              .engine-name {
                flex: 1;
                font-size: 13px;
                font-weight: 500;
              }

              .engine-badge-mini {
                font-size: 9px;
                padding: 2px 6px;
                border-radius: 10px;

                &.single { background: #3498db20; color: #3498db; }
                &.multi { background: #9b59b620; color: #9b59b6; }
                &.flex { background: #e67e2220; color: #e67e22; }
              }

              &:hover {
                background: var(--color-background-hover);
                transform: translateY(-1px);
              }

              &.selected {
                border-color: var(--color-primary-element);
                background: rgba(var(--color-primary-element-rgb), 0.05);

                svg {
                  color: var(--color-primary-element);
                }
              }
            }
          }
        }

        .engine-config-details {
          padding: 16px;
          background: var(--color-background-dark);
          border-radius: 12px;

          .config-fields {
            display: flex;
            flex-direction: column;
            gap: 16px;

            .config-field {
              label {
                display: block;
                margin-bottom: 6px;
                font-size: 12px;
                font-weight: 500;
              }

              .config-input, .config-select {
                width: 100%;
                padding: 8px 12px;
                border: 1px solid var(--color-border);
                border-radius: 8px;
                background: var(--color-main-background);
                font-size: 13px;
                transition: all 0.2s;

                &:focus {
                  outline: none;
                  border-color: var(--color-primary-element);
                  box-shadow: 0 0 0 2px rgba(var(--color-primary-element-rgb), 0.1);
                }
              }

              .checkbox-label {
                display: flex;
                align-items: center;
                gap: 8px;
                cursor: pointer;

                input {
                  width: 16px;
                  height: 16px;
                  cursor: pointer;
                }

                span {
                  font-size: 13px;
                  font-weight: normal;
                }
              }
            }
          }
        }
      }
    }

    .modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      padding: 20px 24px;
      background: var(--color-background-dark);
      border-top: 1px solid var(--color-border);

      .btn-secondary, .btn-primary {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 10px 20px;
        border: none;
        border-radius: 12px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }

      .btn-secondary {
        background: var(--color-background-hover);
        color: var(--color-main-text);

        &:hover:not(:disabled) {
          background: var(--color-background-dark);
          transform: translateY(-1px);
        }
      }

      .btn-primary {
        background: linear-gradient(135deg, var(--color-primary-element) 0%, var(--color-primary-element-light) 100%);
        color: white;

        &.loading {
          opacity: 0.7;
          cursor: wait;
        }

        &:hover:not(:disabled):not(.loading) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(var(--color-primary-element-rgb), 0.3);
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
