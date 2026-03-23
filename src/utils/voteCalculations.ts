// utils/voteCalculations.ts
// SPDX-FileCopyrightText: 2018-2025 Nextcloud contributors
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { SupportData, SupportFeature, VotingResults, VotingOptions } from '../types/VotingTypes'

export function calculateBinary(supports: SupportData[]): VotingResults {
  const yes = supports.filter(s => s.value === 1).length
  const no = supports.filter(s => s.value === 0).length
  const total = supports.length

  return {
    raw: { yes, no },
    aggregates: { total, participation: total, quorumReached: true },
    specifics: {
      counts: { yes, no },
      percentages: {
        yes: total ? (yes / total) * 100 : 0,
        no: total ? (no / total) * 100 : 0
      }
    }
  }
}

export function calculateTernary(supports: SupportData[]): VotingResults {
  const forVal = supports.filter(s => s.value === 1).length
  const abstain = supports.filter(s => s.value === 0).length
  const against = supports.filter(s => s.value === -1).length
  const total = supports.length

  return {
    raw: { for: forVal, abstain, against },
    aggregates: { total, participation: total, quorumReached: true },
    specifics: {
      counts: { for: forVal, abstain, against },
      percentages: {
        for: total ? (forVal / total) * 100 : 0,
        abstain: total ? (abstain / total) * 100 : 0,
        against: total ? (against / total) * 100 : 0
      }
    }
  }
}

export function calculateReaction(supports: SupportData[]): VotingResults {
  const counts: Record<string, number> = {}
  supports.forEach(s => {
    const reaction = s.metadata?.reaction
    if (reaction) {
      counts[reaction] = (counts[reaction] || 0) + 1
    }
  })

  return {
    raw: counts,
    aggregates: { total: supports.length, participation: supports.length, quorumReached: true },
    specifics: { counts }
  }
}

export function calculateNumeric(supports: SupportData[], min: number, max: number): VotingResults {
  const values = supports.map(s => s.value as number).filter(v => v !== null && v !== undefined) as number[]
  const total = values.length
  const sum = values.reduce((a, b) => a + b, 0)
  const average = total ? sum / total : 0
  const sorted = [...values].sort((a, b) => a - b)
  const median = total ? (total % 2 === 0 ? (sorted[total/2 - 1] + sorted[total/2]) / 2 : sorted[Math.floor(total/2)]) : 0

  const distribution: Record<number, number> = {}
  values.forEach(v => { distribution[v] = (distribution[v] || 0) + 1 })

  return {
    raw: values,
    aggregates: { total, participation: total, quorumReached: true },
    specifics: { average, median, distribution }
  }
}

export function calculateMajorityJudgment(supports: SupportData[], gradeValues: number[]): VotingResults {
  const values = supports.map(s => s.value as number).filter(v => v !== null && v !== undefined) as number[]
  const total = values.length
  const sorted = [...values].sort((a, b) => a - b)
  const median = total ? (total % 2 === 0 ? (sorted[total/2 - 1] + sorted[total/2]) / 2 : sorted[Math.floor(total/2)]) : 0

  const distribution: Record<number, number> = {}
  gradeValues.forEach(g => { distribution[g] = 0 })
  values.forEach(v => { distribution[v] = (distribution[v] || 0) + 1 })

  return {
    raw: values,
    aggregates: { total, participation: total, quorumReached: true },
    specifics: { medianGrade: median, gradesDistribution: distribution }
  }
}

export function calculateApproval(supports: SupportData[]): VotingResults {
  const counts: Record<string, number> = {}
  supports.forEach(s => {
    const approved = s.value as string[] | null
    if (Array.isArray(approved)) {
      approved.forEach(optId => {
        counts[optId] = (counts[optId] || 0) + 1
      })
    }
  })

  return {
    raw: counts,
    aggregates: { total: supports.length, participation: supports.length, quorumReached: true },
    specifics: { counts }
  }
}

export function calculateRanking(supports: SupportData[], maxChoices: number): VotingResults {
  const scores: Record<string, number> = {}
  supports.forEach(s => {
    const ranking = s.value as string[] | null
    if (Array.isArray(ranking)) {
      ranking.forEach((optId, index) => {
        const points = maxChoices - index
        scores[optId] = (scores[optId] || 0) + points
      })
    }
  })

  const rankings = Object.entries(scores)
    .map(([optionId, score]) => ({ optionId, score }))
    .sort((a, b) => b.score - a.score)
    .map((item, idx) => ({ ...item, rank: idx + 1 }))

  return {
    raw: scores,
    aggregates: { total: supports.length, participation: supports.length, quorumReached: true },
    specifics: { rankings }
  }
}

export function calculateTrending(supports: SupportData[], activityData: any): VotingResults {
  // Placeholder – would combine votes, comments, views, etc.
  return {
    raw: {},
    aggregates: { total: supports.length, participation: supports.length, quorumReached: true },
    specifics: {}
  }
}

export function calculateResults(
  feature: SupportFeature,
  supports: SupportData[],
  options?: VotingOptions
): VotingResults {
  switch (feature) {
    case 'binary':
      return calculateBinary(supports)
    case 'ternary':
      return calculateTernary(supports)
    case 'reaction':
      return calculateReaction(supports)
    case 'star':
      return calculateNumeric(supports, 1, 5)
    case 'score':
      return calculateNumeric(supports, 0, 10)
    case 'majority_judgment':
      return calculateMajorityJudgment(supports, options?.grades?.values || [0,1,2,3,4,5])
    case 'approval':
      return calculateApproval(supports)
    case 'ranking':
      return calculateRanking(supports, options?.ranking?.maxChoices || 3)
    case 'trending':
      return calculateTrending(supports, options)
    case 'none':
    default:
      return {
        raw: {},
        aggregates: { total: 0, participation: 0, quorumReached: false },
        specifics: {}
      }
  }
}
