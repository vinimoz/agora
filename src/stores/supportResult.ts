/**
 * SPDX-FileCopyrightText: 2026 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {
  SupportResult,
  SupportResultData,
  BinaryResult,
  TernaryResult,
  ScoreResult,
  RankingResult,
  ReactionResult,
  ApprovalResult,
  CondorcetResult,
  MajorityJudgmentResult,
  BordaResult,
  QuadraticResult,
  TokenWeightedResult,
  PhasedVotingResult,
  ApprovalDelibResult,
  StarResult,
  TrendingResult,
} from '../Types/index'
import { SupportResultAPI } from '../Api/index'
import { Logger } from '../helpers/index'

export const useSupportResultStore = defineStore('supportResult', () => {
  const results = ref<SupportResult[]>([])
  const currentResults = ref<Map<string, SupportResultData>>(new Map())
  const loading = ref(false)
  const error = ref<string | null>(null)
  const lastCalculated = ref<number | null>(null)
  const resultHistory = ref<Map<number, SupportResult[]>>(new Map())
  const getResultsByEngine = computed(
    () => (engineId: number) => results.value.filter((r) => r.support_engine_id === engineId)
  )

  const getResultsByTarget = computed(
    () => (targetType: 'inquiry' | 'option', targetId: number) =>
      results.value.filter((r) => r.target_type === targetType && r.target_id === targetId)
  )

  const getBinaryResult = (result: SupportResultData): BinaryResult | null =>
    result.type === 'binary' ? (result as BinaryResult) : null

  const getTernaryResult = (result: SupportResultData): TernaryResult | null =>
    result.type === 'ternary' ? (result as TernaryResult) : null

  const getScoreResult = (result: SupportResultData): ScoreResult | null =>
    result.type === 'score' ? (result as ScoreResult) : null

  const getRankingResult = (result: SupportResultData): RankingResult | null =>
    result.type === 'ranking' ? (result as RankingResult) : null

  const getCondorcetResult = (result: SupportResultData): CondorcetResult | null =>
    result.type === 'condorcet' ? (result as CondorcetResult) : null

  const getReactionResult = (result: SupportResultData): ReactionResult | null =>
    result.type === 'reaction' ? (result as ReactionResult) : null

  const getApprovalResult = (result: SupportResultData): ApprovalResult | null =>
    result.type === 'approval' ? (result as ApprovalResult) : null

  const getMajorityJudgmentResult = (result: SupportResultData): MajorityJudgmentResult | null =>
    result.type === 'majority_judgment' ? (result as MajorityJudgmentResult) : null

  const getBordaResult = (result: SupportResultData): BordaResult | null =>
    result.type === 'borda' ? (result as BordaResult) : null

  // Add getter for Token Weighted
  const getTokenWeightedResult = (result: SupportResultData): TokenWeightedResult | null =>
    result.type === 'token_weighted' ? (result as TokenWeightedResult) : null

  // const getPhasedVotingResult = (result: SupportResultData): PhasedVotingResult | null =>
  //  result.type === 'phased_voting' ? (result as PhasedVotingResult) : null
  // Add getter for Quadratic

  const getQuadraticResult = (result: SupportResultData): QuadraticResult | null =>
    result.type === 'quadratic' ? (result as QuadraticResult) : null

  const getFormattedResult = computed(() => (result: SupportResultData) => {
    switch (result.type) {
      case 'binary': {
        const r = result as BinaryResult
        return {
          primary: `${Math.round(r.percentages.yes)}%`,
          secondary: `${r.totals.yes} yes / ${r.totals.no} no`,
          icon: r.percentages.yes > 50 ? 'check' : 'close',
        }
      }
      case 'ternary': {
        const r = result as TernaryResult
        const max = Math.max(r.percentages.yes, r.percentages.no, r.percentages.abstain)
        return {
          primary: `${Math.round(max)}%`,
          secondary: `${r.totals.yes}F / ${r.totals.abstain}A / ${r.totals.no}N`,
          icon: max === r.percentages.yes ? 'thumb-up' : 'thumb-down',
        }
      }
      case 'score':
      case 'star': {
        const r = result as ScoreResult | StarResult
        return {
          primary: r.totals.average.toFixed(1),
          secondary: `of ${r.totals.total} votes`,
          icon: 'star',
        }
      }
      case 'reaction': {
        const r = result as ReactionResult
        const topReaction = Object.entries(r.counts).sort(([, a], [, b]) => b - a)[0]
        return {
          primary: topReaction?.[0] || '',
          secondary: `${Object.values(r.counts).reduce((a, b) => a + b, 0)} reactions`,
          icon: 'emoticon',
        }
      }
      case 'approval': {
        const r = result as ApprovalResult
        const total = Object.values(r.counts).reduce((a, b) => a + b, 0)
        return {
          primary: `${total}`,
          secondary: 'approvals',
          icon: 'check-all',
        }
      }
      case 'approval_delib': {
        const r = result as ApprovalDelibResult
        return {
          primary: `${Math.round(r.percentages.approved)}%`,
          secondary: `${r.totals.approved}/${r.totals.total} approved`,
          icon: r.percentages.approved >= 50 ? 'check' : 'help',
        }
      }
      case 'trending': {
        const r = result as TrendingResult
        return {
          primary: `${r.score}`,
          secondary: 'trending',
          icon: 'fire',
        }
      }
      case 'ranking': {
        const r = result as RankingResult
        const bestRank = Math.min(...Object.values(r.rankings))
        const bestOption = Object.keys(r.rankings).find(
          (key) => r.rankings[Number(key)] === bestRank
        )
        return {
          primary: bestOption ? `#${bestRank}` : '—',
          secondary: `${Object.keys(r.rankings).length} options ranked`,
          icon: 'trophy',
        }
      }
      case 'condorcet': {
        const r = result as CondorcetResult
        const winnerInfo = r.winner ? `Winner: ${r.winner}` : 'No winner'
        return {
          primary: winnerInfo,
          secondary: `${r.wins[r.winner ?? 0] || 0}W / ${r.losses[r.winner ?? 0] || 0}L`,
          icon: r.winner ? 'crown' : 'scale',
        }
      }
      case 'borda': {
        const r = result as BordaResult
        const best = Object.entries(r.ranking).sort(([, a], [, b]) => a - b)[0]
        return {
          primary: best ? `#${best[1]}` : '—',
          secondary: `${Object.keys(r.scores).length} options scored`,
          icon: 'medal',
        }
      }
      case 'quadratic': {
        const r = result as QuadraticResult
        return {
          primary: `${r.total_credits} credits`,
          secondary: `${r.total_votes} votes cast`,
          icon: 'currency',
        }
      }
      case 'token_weighted': {
        const r = result as TokenWeightedResult
        return {
          primary: `${r.total_weight} weight`,
          secondary: `${r.participant_count} participants`,
          icon: 'weight',
        }
      }
      case 'majority_judgment': {
        const r = result as MajorityJudgmentResult
        const winnerGrade = r.winner_details?.median_grade ?? 'No winner'
        return {
          primary: winnerGrade,
          secondary: `${r.total_votes} votes, ${r.grades.length} grades`,
          icon: 'award',
        }
      }
      case 'phased_voting': {
        const r = result as PhasedVotingResult
        const total = Object.values(r.counts).reduce((a, b) => a + b, 0)
        return {
          primary: `${total}`,
          secondary: 'votes in current round',
          icon: 'clock',
        }
      }
      default:
        return {
          primary: 'N/A',
          secondary: '',
          icon: 'help',
        }
    }
  })
  async function loadEngineResults(engineId: number): Promise<void> {
    loading.value = true
    error.value = null
    try {
      const response = await SupportResultAPI.getResultsByEngine(engineId)
      const existingIds = new Set(results.value.map((r) => r.id))
      const newResults = response.data.results.filter((r) => !existingIds.has(r.id))
      results.value.push(...newResults)

      newResults.forEach((result) => {
        const key = `${result.target_type}-${result.target_id}` // Fixed
        currentResults.value.set(key, result.result)
      })

      lastCalculated.value = Date.now()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load results'
      Logger.error('Error loading engine results', { error: err, engineId })
    } finally {
      loading.value = false
    }
  }

  async function loadTargetResults(
    targetType: 'inquiry' | 'option',
    targetId: number,
    engineId?: number
  ): Promise<SupportResult[]> {
    loading.value = true
    error.value = null
    try {
      const response = await SupportResultAPI.getResultsByTarget(targetType, targetId, engineId)

      const existingIds = new Set(results.value.map((r) => r.id))
      const newResults = response.data.results.filter((r) => !existingIds.has(r.id))
      results.value.push(...newResults)

      newResults.forEach((result) => {
        const key = `${result.target_type}-${result.target_id}` // Fixed
        currentResults.value.set(key, result.result)
      })

      return response.data.results
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load target results'
      Logger.error('Error loading target results', { error: err, targetType, targetId })
      return []
    } finally {
      loading.value = false
    }
  }

  async function calculateAndGetResults(engineId: number): Promise<SupportResult[]> {
    loading.value = true
    error.value = null
    try {
      const response = await SupportResultAPI.calculateResults(engineId)

      results.value = results.value.filter((r) => r.support_engine_id !== engineId)
      results.value.push(...response.data.results)

      currentResults.value.clear()
      response.data.results.forEach((result) => {
        const key = `${result.target_type}-${result.target_id}` // Fixed
        currentResults.value.set(key, result.result)
      })

      lastCalculated.value = Date.now()
      return response.data.results
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to calculate results'
      Logger.error('Error calculating results', { error: err, engineId })
      throw err
    } finally {
      loading.value = false
    }
  }

  async function loadResultHistory(resultId: number): Promise<void> {
    try {
      const response = await SupportResultAPI.getResultHistory(resultId)
      resultHistory.value.set(resultId, response.data.history)
    } catch (err) {
      Logger.error('Error loading result history', { error: err, resultId })
    }
  }

  function getResultDisplay(
    targetType: 'inquiry' | 'option',
    targetId: number
  ): SupportResult | undefined {
    return results.value.find((r) => r.target_type === targetType && r.target_id === targetId)
  }

  function getResultByTarget(targetId: number): SupportResult | undefined {
    return results.value.find((r) => r.target_id === targetId)
  }

  function setResults(newResults: SupportResult[]): void {
  if (!newResults?.length) return
  // Remove duplicates by id and add new ones
  const existingIds = new Set(results.value.map(r => r.id))
  const fresh = newResults.filter(r => !existingIds.has(r.id))
  results.value.push(...fresh)
  // Update currentResults map
  fresh.forEach(result => {
    const key = `${result.target_type}-${result.target_id}`
    currentResults.value.set(key, result.result)
  })
  lastCalculated.value = Date.now()
}

  function needsRecalculation(engineId: number, maxAge: number = 60000): boolean {
    if (!lastCalculated.value) return true
    const engineResults = results.value.filter((r) => r.support_engine_id === engineId)
    if (engineResults.length === 0) return true

    const oldestUpdate = Math.min(...engineResults.map((r) => r.updated))
    return Date.now() - oldestUpdate > maxAge
  }

  function reset(): void {
    results.value = []
    currentResults.value.clear()
    resultHistory.value.clear()
    loading.value = false
    error.value = null
    lastCalculated.value = null
  }

  return {
    results,
    currentResults,
    loading,
    error,
    setResults,
    lastCalculated,
    resultHistory,
    getResultsByEngine,
    getResultByTarget,
    getResultsByTarget,
    getFormattedResult,
    getBinaryResult,
    getTernaryResult,
    getScoreResult,
    getRankingResult,
    getCondorcetResult,
    getMajorityJudgmentResult,
    getBordaResult,
    getQuadraticResult,
    getTokenWeightedResult,
    getReactionResult,
    getApprovalResult,
    loadEngineResults,
    loadTargetResults,
    calculateAndGetResults,
    loadResultHistory,
    getResultDisplay,
    needsRecalculation,
    reset,
  }
})
