// SPDX-FileCopyrightText: 2018-2025 Nextcloud contributors
// SPDX-License-Identifier: AGPL-3.0-or-later

import type {
  SupportData,
  BinaryResult,
  TernaryResult,
  ScoreResult,
  RankingResult,
  MajorityJudgmentResult,
  ReactionResult,
  ApprovalResult,
  TrendingResult,
  SupportResultData
} from '../types/index.ts'

// ----------------------------------------------------------------------------
// Individual result calculators
// ----------------------------------------------------------------------------
export function calculateBinaryResult(supports: SupportData[]): BinaryResult {
  const total = supports.length
  const yes = supports.filter(s => s.value === 1).length
  const no = total - yes
  const percentageYes = total ? (yes / total) * 100 : 0
  const percentageNo = total ? (no / total) * 100 : 0

  return {
    type: 'binary',
    total_yes: yes,
    total_no: no,
    percentageYes,
    percentageNo
  }
}

export function calculateTernaryResult(supports: SupportData[]): TernaryResult {
  const total = supports.length
  const yes = supports.filter(s => s.value === 1).length
  const no = supports.filter(s => s.value === -1).length
  const abstain = supports.filter(s => s.value === 0).length

  const percentageYes = total ? (yes / total) * 100 : 0
  const percentageNo = total ? (no / total) * 100 : 0
  const percentageAbstain = total ? (abstain / total) * 100 : 0

  return {
    type: 'ternary',
    total_yes: yes,
    total_no: no,
    total_abstain: abstain,
    percentageYes,
    percentageNo,
    percentageAbstain
  }
}

export function calculateReactionResult(supports: SupportData[]): ReactionResult {
  const counts: Record<string, number> = {}
  supports.forEach(s => {
    const reaction = s.metadata?.reaction
    if (reaction) {
      counts[reaction] = (counts[reaction] || 0) + 1
    }
  })
  return {
    type: 'reaction',
    counts
  }
}

export function calculateScoreResult(supports: SupportData[], min: number = 0, max: number = 10): ScoreResult {
  const values = supports
  .map(s => s.value as number)
  .filter(v => v !== null && v !== undefined && v >= min && v <= max)
  const total = values.length
  const sum = values.reduce((a, b) => a + b, 0)
  const average = total ? sum / total : 0
  const sorted = [...values].sort((a, b) => a - b)
  const median = total ? (total % 2 === 0 ? (sorted[total/2 - 1] + sorted[total/2]) / 2 : sorted[Math.floor(total/2)]) : 0

  return {
    type: 'score',
    total,
    average,
    median
  }
}

export function calculateMajorityJudgmentResult(supports: SupportData[], gradeValues: number[]): MajorityJudgmentResult {
  const values = supports.map(s => s.value as number).filter(v => v !== null && v !== undefined)
  const total = values.length
  const sorted = [...values].sort((a, b) => a - b)
  const median = total ? (total % 2 === 0 ? (sorted[total/2 - 1] + sorted[total/2]) / 2 : sorted[Math.floor(total/2)]) : 0

  const distribution: Record<number, number> = {}
  gradeValues.forEach(g => { distribution[g] = 0 })
  values.forEach(v => { distribution[v] = (distribution[v] || 0) + 1 })

  return {
    type: 'majority_judgment',
    median,
    distribution
  }
}

export function calculateApprovalResult(supports: SupportData[]): ApprovalResult {
  // For a specific option, supports are already filtered by optionId,
  // so we just count them.
  return {
    type: 'approval',
    count: supports.length
  }
}

export function calculateRankingScores(supports: SupportData[], maxRank?: number): Record<number, number> {
  const scores: Record<number, number> = {}
  const effectiveMaxRank = maxRank ?? 0

  supports.forEach(s => {
    const ranking = s.value as string[] | null
    if (Array.isArray(ranking)) {
      const maxRankForThisVote = effectiveMaxRank || ranking.length
      ranking.forEach((optId, index) => {
        const points = maxRankForThisVote - index
        scores[parseInt(optId, 10)] = (scores[parseInt(optId, 10)] || 0) + points
      })
    }
  })
  return scores
}

export function calculateRankingResults(scores: Record<number, number>): Record<number, RankingResult> {
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1])
  const results: Record<number, RankingResult> = {}
  sorted.forEach(([optId, score], idx) => {
    results[parseInt(optId, 10)] = {
      type: 'ranking',
      rank: idx + 1,
      score
    }
  })
  return results
}

export function calculateTrendingResult(supports: SupportData[]): TrendingResult {
  // Placeholder – would combine votes, comments, views, etc.
  return {
    type: 'trending',
    score: supports.length
  }
}

// ----------------------------------------------------------------------------
// Main entry point – returns result for a single option
// ----------------------------------------------------------------------------
export function calculateOptionResult(
  engineType: string,
  supports: SupportData[],
  config?: {
    min?: number
    max?: number
    grades?: number[]
    maxRank?: number
  }
): SupportResultData {
  switch (engineType) {
    case 'binary':
      return calculateBinaryResult(supports)
    case 'ternary':
      return calculateTernaryResult(supports)
    case 'reaction':
      return calculateReactionResult(supports)
    case 'star':
    case 'score':
      return calculateScoreResult(supports, config?.min, config?.max)
    case 'majority_judgment':
      return calculateMajorityJudgmentResult(supports, config?.grades || [0,1,2,3,4,5])
    case 'approval':
      return calculateApprovalResult(supports)
    case 'trending':
      return calculateTrendingResult(supports)
    default:
      // Fallback: empty binary result
      return { type: 'binary', total_yes: 0, total_no: 0, percentageYes: 0, percentageNo: 0 }
  }
}
