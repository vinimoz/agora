<!--
  SPDX-FileCopyrightText: 2024 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
  <div class="vote-layout" :class="`layout-${currentLayout}`">
    <!-- Header with vote session info -->
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
        </div>
      </div>

      <!-- Layout switcher -->
      <div v-if="hasMultipleLayouts" class="layout-switcher">
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
    </div>

    <!-- Cards Layout -->
    <div v-if="currentLayout === 'cards'" class="cards-layout">
      <div class="cards-grid">
        <div
          v-for="candidate in rankedCandidates"
          :key="candidate.id"
          class="vote-card"
          :class="{
            'is-leading': candidate.metadata?.status === 'leading',
            'is-selected': candidate.metadata?.status === 'selected',
            'user-voted': hasUserVotedFor(candidate.id)
          }"
          @click="selectCandidate(candidate)"
        >
          <!-- Image if available -->
          <div v-if="candidate.fields?.image" class="card-image">
            <img :src="candidate.fields.image" :alt="candidate.title">
          </div>

          <div class="card-content">
            <div class="card-header">
              <h3 class="card-title">{{ candidate.title }}</h3>
              <div v-if="candidate.metadata?.status" class="status-badge" :class="candidate.metadata.status">
                {{ t('agora', candidate.metadata.status) }}
              </div>
            </div>

            <p v-if="candidate.description" class="card-description">
              {{ candidate.description }}
            </p>

            <!-- Vote stats -->
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

            <!-- Progress bar -->
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

            <!-- Vote button -->
            <div class="card-actions">
              <NcButton
                v-if="canVote && !hasUserVotedFor(candidate.id)"
                type="primary"
                :disabled="hasUserVoted"
                @click.stop="voteForCandidate(candidate)"
              >
                <template #icon>
                  <Vote :size="16" />
                </template>
                {{ t('agora', 'Vote') }}
              </NcButton>
              <div v-else-if="hasUserVotedFor(candidate.id)" class="voted-badge">
                <CheckCircle :size="16" />
                {{ t('agora', 'Your vote') }}
              </div>
            </div>
          </div>
        </div>
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
          'user-voted': hasUserVotedFor(candidate.id)
        }"
        @click="selectCandidate(candidate)"
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
          <div class="candidate-info">
            <div v-if="candidate.fields?.image" class="candidate-thumb">
              <img :src="candidate.fields.image" :alt="candidate.title">
            </div>
            <div>
              <strong>{{ candidate.title }}</strong>
              <p v-if="candidate.description" class="candidate-desc">
                {{ truncate(candidate.description, 60) }}
              </p>
            </div>
          </div>
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
            v-if="canVote && !hasUserVotedFor(candidate.id)"
            type="primary"
            size="small"
            @click.stop="voteForCandidate(candidate)"
          >
            <Vote :size="14" />
            {{ t('agora', 'Vote') }}
          </NcButton>
          <div v-else-if="hasUserVotedFor(candidate.id)" class="voted-icon">
            <CheckCircle :size="16" />
          </div>
        </div>
      </div>
    </div>

    <!-- Results Layout (detailed analytics) -->
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
          <h4>{{ t('agora', 'Ranking') }}</h4>
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
        v-if="canManageCandidates"
        type="primary"
        @click="$emit('addOption', 'candidate')"
      >
        <template #icon>
          <Plus :size="16" />
        </template>
        {{ t('agora', 'Add Candidate') }}
      </NcButton>
    </div>

    <!-- User feedback message -->
    <div v-if="voteSuccessMessage" class="vote-success-toast">
      <CheckCircle :size="20" />
      {{ voteSuccessMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
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
  BarChart3
} from 'lucide-vue-next'
import Chart from 'chart.js/auto'
import { getOptionTypeIconComponent } from '../../../helpers/modules/InquiryOptionHelper'
import type { Option, Inquiry, OptionFamily } from '../../Types/index.ts'

const props = defineProps<{
  options: Option[]
  userId?: string
  voteSession?: any
  canVote?: boolean
  canManageCandidates?: boolean
  userVote?: any
  family: OptionFamily 
}>()

const emit = defineEmits<{
  'vote': [candidateId: number]
  'select': [candidate: Option]
  'addOption': [optionType: string]
}>()

// Layout state
const allowedLayouts = ['cards', 'list', 'results']
const currentLayout = ref('cards')
const hasMultipleLayouts = computed(() => true)

// Chart references
const pieChartCanvas = ref<HTMLCanvasElement | null>(null)
const barChartCanvas = ref<HTMLCanvasElement | null>(null)
let pieChart: Chart | null = null
let barChart: Chart | null = null

// Success message
const voteSuccessMessage = ref('')
let successTimeout: NodeJS.Timeout

// Computed properties
const candidates = computed(() =>
  props.options.filter(opt => opt.type === 'candidate')
)

const totalVotes = computed(() =>
  candidates.value.reduce((sum, c) => sum + (c.metadata?.votes || 0), 0)
)

const rankedCandidates = computed(() =>
  [...candidates.value].sort((a, b) =>
    (b.metadata?.votes || 0) - (a.metadata?.votes || 0)
  )
)

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

// Methods
const getPercentage = (candidate: Option) => {
  if (!totalVotes.value) return 0
  return Math.round((candidate.metadata?.votes || 0) / totalVotes.value * 100)
}

const hasUserVotedFor = (candidateId: number) => {
  return props.userVote?.candidate_id === candidateId
}

const formatDate = (date: string) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString()
}

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const truncate = (text: string, length: number) => {
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}

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

const getOptionTypeIcon = (type: string) => {
  return getOptionTypeIconComponent(type, [])
}

const voteForCandidate = (candidate: Option) => {
  if (!props.canVote || hasUserVoted.value) return
  
  emit('vote', candidate.id)
  
  // Show success message
  voteSuccessMessage.value = t('agora', 'Your vote for "{candidate}" has been recorded!', { candidate: candidate.title })
  if (successTimeout) clearTimeout(successTimeout)
  successTimeout = setTimeout(() => {
    voteSuccessMessage.value = ''
  }, 3000)
}

const selectCandidate = (candidate: Option) => {
  emit('select', candidate)
}

// Chart creation
const createCharts = () => {
  if (!pieChartCanvas.value || !barChartCanvas.value) return
  
  const labels = rankedCandidates.value.map(c => c.title)
  const votes = rankedCandidates.value.map(c => c.metadata?.votes || 0)
  const colors = ['#42b883', '#3490dc', '#f6993f', '#e74c3c', '#9b59b6', '#1abc9c', '#e67e22', '#2c3e50']
  
  // Destroy existing charts
  if (pieChart) pieChart.destroy()
  if (barChart) barChart.destroy()
  
  // Pie chart
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
          labels: {
            font: { size: 11 }
          }
        }
      }
    }
  })
  
  // Bar chart
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
      plugins: {
        legend: { display: false }
      }
    }
  })
}

// Watch for changes to update charts
watch([rankedCandidates, currentLayout], () => {
  if (currentLayout.value === 'results') {
    setTimeout(() => createCharts(), 100)
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
      
      .vote-title {
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 0 0 12px 0;
        font-size: 24px;
        font-weight: 600;
      }
      
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
    
    .layout-switcher {
      display: flex;
      gap: 8px;
      background: var(--color-background-dark);
      padding: 4px;
      border-radius: 12px;
    }
  }
  
  // Cards layout
  .cards-layout {
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 20px;
      
      .vote-card {
        background: var(--color-main-background);
        border-radius: 16px;
        overflow: hidden;
        cursor: pointer;
        transition: all 0.3s ease;
        border: 1px solid var(--color-border);
        
        &:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        }
        
        &.is-leading {
          border-left: 4px solid #f6c343;
        }
        
        &.is-selected {
          border-left: 4px solid #42b883;
        }
        
        &.user-voted {
          background: linear-gradient(135deg, var(--color-main-background) 0%, rgba(66, 184, 131, 0.05) 100%);
        }
        
        .card-image {
          width: 100%;
          height: 160px;
          overflow: hidden;
          
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        
        .card-content {
          padding: 16px;
          
          .card-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 8px;
            
            .card-title {
              margin: 0;
              font-size: 18px;
              font-weight: 600;
              flex: 1;
            }
            
            .status-badge {
              font-size: 11px;
              padding: 2px 8px;
              border-radius: 12px;
              text-transform: uppercase;
              font-weight: 600;
              
              &.leading {
                background: #f6c34320;
                color: #f6c343;
              }
              
              &.selected {
                background: #42b88320;
                color: #42b883;
              }
            }
          }
          
          .card-description {
            font-size: 13px;
            color: var(--color-text-lighter);
            margin-bottom: 16px;
            line-height: 1.5;
          }
          
          .vote-stats {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-bottom: 8px;
            
            .votes-count {
              display: flex;
              align-items: center;
              gap: 4px;
              font-size: 14px;
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
            margin-bottom: 16px;
            
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
          
          .card-actions {
            display: flex;
            justify-content: flex-end;
            
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
    }
  }
  
  // List layout
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
      padding: 12px 16px;
      border-bottom: 1px solid var(--color-border);
      cursor: pointer;
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
      
      .list-cell {
        display: flex;
        align-items: center;
        
        .rank-number {
          font-weight: 600;
          .medal {
            font-size: 20px;
          }
        }
        
        .candidate-info {
          display: flex;
          align-items: center;
          gap: 12px;
          
          .candidate-thumb {
            width: 40px;
            height: 40px;
            border-radius: 8px;
            overflow: hidden;
            
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
          
          .candidate-desc {
            font-size: 12px;
            color: var(--color-text-lighter);
            margin: 0;
          }
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
        
        .voted-icon {
          color: #42b883;
        }
      }
    }
  }
  
  // Results layout
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
            
            &.gold {
              background: #f6c34320;
              color: #f6c343;
            }
            
            &.silver {
              background: #c0c0c020;
              color: #c0c0c0;
            }
            
            &.bronze {
              background: #cd7f3220;
              color: #cd7f32;
            }
          }
        }
        
        .candidate-name {
          font-weight: 500;
        }
        
        .votes-cell {
          font-weight: 600;
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
          
          &.leading {
            background: #f6c34320;
            color: #f6c343;
          }
          
          &.selected {
            background: #42b88320;
            color: #42b883;
          }
        }
      }
    }
  }
  
  // Empty state
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
  
  // Toast message
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
