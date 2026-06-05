/**
 * SPDX-FileCopyrightText: 2025 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { computed, ref, watch, onMounted, type ComputedRef, type Ref } from 'vue'
import { useSupportEngineStore } from '../stores/supportEngine'
import { useSupportResultStore } from '../stores/supportResult'
import { useSupportsStore } from '../stores/supports'
import { useOptionsStore } from '../stores/options'
import { useSessionStore } from '../stores/session'
import type { Option, SupportEngine, SupportValue } from '../Types/index'
import { useTrending } from './useTrending'

export interface VoteContext {
    // Core state
    loadingEngines: Ref<boolean>
    availableEngines: ComputedRef<SupportEngine[]>
    selectedEngineId: Ref<number | null>
    currentEngine: ComputedRef<SupportEngine | null>
    votableOptions: ComputedRef<Option[]>
    hasActiveEngine: ComputedRef<boolean>

    // Vote submission state (single & multi)
    rankings: Ref<Record<number, number>>
    scores: Ref<Record<number, number>>
    grades: Ref<Record<number, string | null>>
    reactions: Ref<Record<number, string | null>>
    quadraticVotes: Ref<Record<number, number>>
    tokenWeights: Ref<Record<number, number>>
    selectedOptions: Ref<Set<number>>
    hasUserVoted: ComputedRef<boolean>
    canVote: ComputedRef<boolean>
    canSubmitMultiVote: ComputedRef<boolean>
    voteSelectionInfo: ComputedRef<string | null>
    isEngineMulti: ComputedRef<boolean>

    // Results
    totalVotes: ComputedRef<number>
    getOptionVoteCount: (optionId: number) => number
    getPercentage: (option: Option, total?: number) => number
    getRankedOptions: (options: Option[]) => Option[]
    getWinner: (options: Option[]) => Option | null
    getWinnerPercentage: (options: Option[]) => number

    // Dynamic engine config
    effectiveEngineId: ComputedRef<string>
    maxRank: ComputedRef<number>
    scoreMin: ComputedRef<number>
    scoreMax: ComputedRef<number>

    // Actions
    selectEngine: (engineId: number) => void
    refreshEngines: () => Promise<void>
    toggleSelection: (optionId: number) => void
    updateRanking: (optionId: number, rank: number | null) => void
    updateScore: (optionId: number, score: number | null) => void
    updateGrade: (optionId: number, grade: string | null) => void
    updateReaction: (optionId: number, reaction: string | null) => void
    updateQuadratic: (optionId: number, votes: number | null) => void
    updateTokenWeight: (optionId: number, weight: number | null) => void
    submitSingleVote: (option: Option, value: SupportValue) => Promise<boolean>
    submitMultiVote: () => Promise<boolean>
    resetSelections: () => void
    hasUserVotedFor: (optionId: number) => boolean
    isSelectedForVote: (optionId: number) => boolean
}

export function useVoteContext(inquiryId: number): VoteContext {
    const engineStore = useSupportEngineStore()
    const resultStore = useSupportResultStore()
    const supportsStore = useSupportsStore()
    const optionsStore = useOptionsStore()
    const sessionStore = useSessionStore()

    // ---------- Engine management ----------
    const loadingEngines = ref(false)
    const selectedEngineId = ref<number | null>(null)

    const availableEngines = computed(() => engineStore.getEnginesByInquiry(inquiryId))

    const { calculateTrendingScore } = useTrending(inquiryId)

    const currentEngine = computed<SupportEngine | null>(() => {
        const engines = availableEngines.value
        if (!engines.length) return null

            if (selectedEngineId.value) {
                const found = engines.find(e => e.id === selectedEngineId.value)
                if (found) {
                    engineStore.setCurrentEngine(found)
                    return found
                }
            }

            // Fallback to first engine
            if (engines[0]) {
                engineStore.setCurrentEngine(engines[0])
            }
            return engines[0] || null
    })

    watch(availableEngines, (engines) => {
        if (engines.length > 0 && !selectedEngineId.value) {
            selectedEngineId.value = engines[0].id
        }
    }, { immediate: true })

    const votableOptions = computed(() => {
        const engine = currentEngine.value
        if (!engine?.target_ids) return []
            const allOptions = optionsStore.options || []
        return allOptions.filter(opt => engine.target_ids.includes(opt.id))
    })

    const hasActiveEngine = computed(() => availableEngines.value.length > 0)

    const refreshEngines = async () => {
        // TODO : To be implemented
        /*
           loadingEngines.value = true
           try {
           await engineStore.loadEnginesByInquiry(inquiryId)
           } finally {
           loadingEngines.value = false
           }
           */
    }

    const selectEngine = (engineId: number) => {
        if (availableEngines.value.some(e => e.id === engineId)) {
            selectedEngineId.value = engineId
            // Reset selections when engine changes
            resetSelections()
        }
    }

    // ---------- Vote submission state ----------
    const rankings = ref<Record<number, number>>({})
    const scores = ref<Record<number, number>>({})
    const grades = ref<Record<number, string | null>>({})
    const reactions = ref<Record<number, string | null>>({})
    const quadraticVotes = ref<Record<number, number>>({})
    const tokenWeights = ref<Record<number, number>>({})
    const selectedOptions = ref<Set<number>>(new Set())

    const currentUserVotes = computed(() => {
        const userId = sessionStore.user?.userId
        if (!userId) return []
            return supportsStore
        .getSupportsByInquiryId(inquiryId)
        .filter(s => s.userId === userId)
    })

    const hasUserVoted = computed(() => currentUserVotes.value.length > 0)

    // List of multi-vote engines (where users can vote on multiple options at once)
    const isEngineMulti = computed(() => {
        const engineId = effectiveEngineId.value
        const multiEngines = [
            'approval', 'ranking', 'score', 'star', 
            'majority_judgment', 'reaction', 'condorcet', 
            'borda', 'quadratic', 'token_weighted'
        ]
        return multiEngines.includes(engineId)
    })

    const getTrendingScore = (optionId: number): number => {
        if (effectiveEngineId.value !== 'trending') return 0
            const { calculateTrendingScore } = useTrending(inquiryId)
        return calculateTrendingScore(optionId)
    }


    const canVote = computed(() => {
        const engine = currentEngine.value
        if (!engine || engine.status !== 'active') return false
            // For single-choice engines, prevent voting again if already voted
            if (!isEngineMulti.value && hasUserVoted.value) return false
                return true
    })

    const hasUserVotedFor = (optionId: number): boolean =>
    currentUserVotes.value.some(vote => vote.optionId === optionId)

    const isSelectedForVote = (optionId: number): boolean => {
        const engineId = effectiveEngineId.value
        if (engineId === 'ranking' || engineId === 'condorcet' || engineId === 'borda') 
            return rankings.value[optionId] !== undefined && rankings.value[optionId] !== null
        if (engineId === 'score' || engineId === 'star') 
            return scores.value[optionId] !== undefined && scores.value[optionId] !== null
        if (engineId === 'majority_judgment') 
            return grades.value[optionId] !== undefined && grades.value[optionId] !== null
        if (engineId === 'reaction') 
            return reactions.value[optionId] !== undefined && reactions.value[optionId] !== null
        if (engineId === 'quadratic') 
            return quadraticVotes.value[optionId] !== undefined && quadraticVotes.value[optionId] !== null && quadraticVotes.value[optionId] > 0
        if (engineId === 'token_weighted') 
            return tokenWeights.value[optionId] !== undefined && tokenWeights.value[optionId] !== null && tokenWeights.value[optionId] > 0
        if (engineId === 'approval') 
            return selectedOptions.value.has(optionId)
        return false
    }

    const toggleSelection = (optionId: number) => {
        if (selectedOptions.value.has(optionId))
            selectedOptions.value.delete(optionId)
        else selectedOptions.value.add(optionId)
    }

const updateRanking = (optionId: number, rank: number | null) => {
    if (rank === null || rank === undefined) {
        const { [optionId]: _, ...rest } = rankings.value
        rankings.value = rest
    } else {
        rankings.value = { ...rankings.value, [optionId]: rank }
    }
}

const updateScore = (optionId: number, score: number | null) => {
    if (score === null || score === undefined) {
        const { [optionId]: _, ...rest } = scores.value
        scores.value = rest
    } else {
        scores.value = { ...scores.value, [optionId]: score }
    }
}

const updateGrade = (optionId: number, grade: string | null) => {
    if (grade === null || grade === undefined) {
        const { [optionId]: _, ...rest } = grades.value
        grades.value = rest
    } else {
        grades.value = { ...grades.value, [optionId]: grade }
    }
}

const updateReaction = (optionId: number, reaction: string | null) => {
    if (reaction === null || reaction === undefined) {
        const { [optionId]: _, ...rest } = reactions.value
        reactions.value = rest
    } else {
        reactions.value = { ...reactions.value, [optionId]: reaction }
    }
}

const updateQuadratic = (optionId: number, votes: number | null) => {
    if (votes === null || votes === undefined || votes === 0) {
        const { [optionId]: _, ...rest } = quadraticVotes.value
        quadraticVotes.value = rest
    } else {
        quadraticVotes.value = { ...quadraticVotes.value, [optionId]: votes }
    }
}

const updateTokenWeight = (optionId: number, weight: number | null) => {
    if (weight === null || weight === undefined || weight === 0) {
        const { [optionId]: _, ...rest } = tokenWeights.value
        tokenWeights.value = rest
    } else {
        tokenWeights.value = { ...tokenWeights.value, [optionId]: weight }
    }
}

const resetSelections = () => {
    selectedOptions.value.clear()
    rankings.value = {}
    scores.value = {}
    grades.value = {}
    reactions.value = {}
    quadraticVotes.value = {}
    tokenWeights.value = {}
}

// Single vote submission (for single-choice engines)
const submitSingleVote = async (option: Option, value: SupportValue) => {
    if (!canVote.value) return false
        try {
            await supportsStore.toggleSupport(
                inquiryId,
                option.id,
                sessionStore.user?.userId,
                option,
                'option',
                value
            )
            resetSelections()
            return true
        } catch (error) {
            console.error('Failed to submit vote:', error)
            return false
        }
}

// Multi-vote submission validation
const canSubmitMultiVote = computed(() => {
    const engineId = effectiveEngineId.value
    const config = currentEngine.value?.config || {}
    const optionCount = votableOptions.value.length

    switch (engineId) {
        case 'approval': {
            const min = (config.min_choices as number) || 1
            const max = config.max_choices as number | null
            const count = selectedOptions.value.size
            if (count < min) return false
                if (max !== null && count > max) return false
                    return count > 0
        }
        case 'ranking':
            case 'condorcet':
            case 'borda': {
            // For ranking engines, we need to validate that ranks are valid
            const rankedEntries = Object.entries(rankings.value)
            .filter(([_, rank]) => rank !== null && rank !== undefined)

            if (rankedEntries.length < 2) return false

                // Check for duplicate ranks
                const usedRanks = new Set<number>()
                for (const [_, rank] of rankedEntries) {
                    if (usedRanks.has(rank as number)) return false
                        usedRanks.add(rank as number)
                }

                // Check that ranks are within valid range (1 to maxRank)
                for (const [_, rank] of rankedEntries) {
                    if ((rank as number) < 1 || (rank as number) > maxRank.value) return false
                }

            return true
        }
        case 'score':
            case 'star': {
            const scoredEntries = Object.entries(scores.value)
            .filter(([_, score]) => score !== null && score !== undefined)

            if (scoredEntries.length === 0) return false

                // Validate scores are within range
                for (const [_, score] of scoredEntries) {
                    const s = score as number
                    if (s < scoreMin.value || s > scoreMax.value) return false
                }

            return true
        }
        case 'majority_judgment': {
            const gradedCount = Object.values(grades.value).filter(v => v !== null && v !== undefined).length
            return gradedCount > 0
        }
        case 'reaction': {
            const reactedCount = Object.values(reactions.value).filter(v => v !== null && v !== undefined).length
            return reactedCount > 0
        }
        case 'quadratic': {
            const votes = Object.values(quadraticVotes.value)
            .filter(v => v !== null && v !== undefined && v > 0)
            if (votes.length === 0) return false

                // Check total credits don't exceed max
                const totalCredits = votes.reduce((sum, v) => sum + ((v as number) ** 2), 0)
                const maxCredits = (config.credits_per_user as number) || 100  // Default to 100 if missing
                return totalCredits <= maxCredits
        }
        case 'token_weighted': {
            const weights = Object.values(tokenWeights.value)
            .filter(v => v !== null && v !== undefined && v > 0)
            return weights.length > 0
        }
        default:
            return selectedOptions.value.size > 0
    }
})

const voteSelectionInfo = computed(() => {
    const engineId = effectiveEngineId.value
    const config = currentEngine.value?.config || {}

    if (engineId === 'approval') {
        const min = (config.min_choices as number) || 1
        const max = config.max_choices as number | null
        const count = selectedOptions.value.size
        if (max) {
            return t('agora', '{count}/{max} selected (min: {min})', { count, max, min })
        }
        return t('agora', '{count} selected (min: {min})', { count, min })
    }
    if (engineId === 'ranking' || engineId === 'condorcet' || engineId === 'borda') {
        const count = Object.values(rankings.value).filter(v => v !== null && v !== undefined).length
        return t('agora', '{count} options ranked', { count })
    }
    if (engineId === 'score' || engineId === 'star') {
        const count = Object.values(scores.value).filter(v => v !== null && v !== undefined).length
        return t('agora', '{count} options rated', { count })
    }
    if (engineId === 'majority_judgment') {
        const count = Object.values(grades.value).filter(v => v !== null && v !== undefined).length
        return t('agora', '{count} options graded', { count })
    }
    if (engineId === 'reaction') {
        const count = Object.values(reactions.value).filter(v => v !== null && v !== undefined).length
        return t('agora', '{count} reactions selected', { count })
    }
    if (engineId === 'quadratic') {
        const votes = Object.values(quadraticVotes.value)
        .filter(v => v !== null && v !== undefined && v > 0)
        const count = votes.length
        const totalCredits = votes.reduce((sum, v) => sum + ((v as number) ** 2), 0)
        return t('agora', '{count} options | {credits} credits used', { count, credits: totalCredits })
    }
    if (engineId === 'token_weighted') {
        const count = Object.values(tokenWeights.value).filter(v => v !== null && v !== undefined && v > 0).length
        return t('agora', '{count} options weighted', { count })
    }
    return t('agora', '{count} selected', { count: selectedOptions.value.size })
})

const submitMultiVote = async () => {
    if (!canVote.value) return false
        if (!canSubmitMultiVote.value) return false

            const engineId = effectiveEngineId.value
            const userId = sessionStore.currentUser.id
            console.log(" SENDING VOTE ", engineId)
            console.log(" SENDING VOTE ", userId)
            
            if (!userId) return false

                try {
                    switch (engineId) {
                        case 'approval':
                            for (const optionId of selectedOptions.value) {
                            await supportsStore.toggleSupport(
                                inquiryId, optionId, userId, 
                                { id: optionId } as Option, 'option', 1
                            )
                        }
                        break

                        case 'ranking':
                            case 'condorcet':
                            case 'borda':
                            for (const [optionId, rank] of Object.entries(rankings.value)) {
                            if (rank !== null && rank !== undefined) {
                                await supportsStore.toggleSupport(
                                    inquiryId, parseInt(optionId), userId,
                                    { id: parseInt(optionId) } as Option, 'option', rank
                                )
                            }
                        }
                        break

                        case 'score':
                            case 'star':
                            for (const [optionId, score] of Object.entries(scores.value)) {
                            if (score !== null && score !== undefined) {
                                await supportsStore.toggleSupport(
                                    inquiryId, parseInt(optionId), userId,
                                    { id: parseInt(optionId) } as Option, 'option', score
                                )
                            }
                        }
                        break

                        case 'majority_judgment':
                            for (const [optionId, grade] of Object.entries(grades.value)) {
                            if (grade !== null && grade !== undefined) {
                                await supportsStore.toggleSupport(
                                    inquiryId, parseInt(optionId), userId,
                                    { id: parseInt(optionId) } as Option, 'option', grade
                                )
                            }
                        }
                        break

                        case 'reaction':
                            for (const [optionId, reaction] of Object.entries(reactions.value)) {
                            if (reaction !== null && reaction !== undefined) {
                                await supportsStore.toggleSupport(
                                    inquiryId, parseInt(optionId), userId,
                                    { id: parseInt(optionId) } as Option, 'option', reaction
                                )
                            }
                        }
                        break

                        case 'quadratic':
                            for (const [optionId, votes] of Object.entries(quadraticVotes.value)) {
                            if (votes !== null && votes !== undefined && votes > 0) {
                                await supportsStore.toggleSupport(
                                    inquiryId, parseInt(optionId), userId,
                                    { id: parseInt(optionId) } as Option, 'option', votes
                                )
                            }
                        }
                        break

                        case 'token_weighted':
                            for (const [optionId, weight] of Object.entries(tokenWeights.value)) {
                            if (weight !== null && weight !== undefined && weight > 0) {
                                await supportsStore.toggleSupport(
                                    inquiryId, parseInt(optionId), userId,
                                    { id: parseInt(optionId) } as Option, 'option', weight
                                )
                            }
                        }
                        break

                        default:
                            console.warn(`Multi‑vote not implemented for engine "${engineId}"`)
                        return false
                    }
                    resetSelections()
                    return true
                } catch (error) {
                    console.error('Failed to submit multi-vote:', error)
                    return false
                }
}

// ---------- Results ----------
const resultsMap = ref<Map<number, any>>(new Map())
const loadingResults = ref(false)

const loadResults = async () => {
    const engineId = selectedEngineId.value
    if (!engineId) return

        loadingResults.value = true
        try {
            if (resultStore.needsRecalculation(engineId)) {
                await resultStore.calculateAndGetResults(engineId)
            } else {
                await resultStore.loadEngineResults(engineId)
            }
            const map = new Map<number, any>()
            const engineResults = resultStore.getResultsByEngine(engineId)
            for (const res of engineResults) {
                if (res.target_type === 'option') {
                    map.set(res.target_id, res.result)
                }
            }
            resultsMap.value = map
        } finally {
            loadingResults.value = false
        }
}

const getOptionVoteCount = (optionId: number): number => {
    if (effectiveEngineId.value === 'trending') {
        return getTrendingScore(optionId)
    }
    const result = resultsMap.value.get(optionId)
    if (!result) return 0

        switch (result.type) {
            case 'binary':
                return result.totals?.yes || 0
            case 'ternary':
                return result.totals?.yes || 0
            case 'score':
                return result.totals?.total || 0
            case 'majority_judgment':
                return Object.values(result.distribution || {}).reduce((a: number, b: number) => a + b, 0)
            case 'reaction':
                return Object.values(result.counts || {}).reduce((a: number, b: number) => a + b, 0)
            case 'approval':
                return result.counts?.[optionId] || 0
            case 'approval_delib':
                return result.totals?.approved || 0
            default:
                if (result.counts) {
                return Object.values(result.counts).reduce((a: number, b: number) => a + b, 0)
            }
            return 0
        }
}

const totalVotes = computed(() => {
  if (effectiveEngineId.value === 'trending') {
    let total = 0
    for (const opt of votableOptions.value) {
      total += getTrendingScore(opt.id)
    }
    return total
  }
  let total = 0
  for (const result of resultsMap.value.values()) {
        switch (result.type) {
            case 'binary':
                total += (result.totals?.yes || 0) + (result.totals?.no || 0)
            break
            case 'ternary':
                total += (result.totals?.yes || 0) + (result.totals?.no || 0) + (result.totals?.abstain || 0)
            break
            case 'score':
                total += result.totals?.total || 0
            break
            default:
                total += Object.values(result.counts || {}).reduce((a: number, b: number) => a + b, 0)
        }
    }
    return total
})

const getPercentage = (option: Option, total: number = totalVotes.value): number => {
    const count = getOptionVoteCount(option.id)
    if (total === 0) return 0
        return Math.round((count / total) * 100)
}

const getRankedOptions = (options: Option[]): Option[] =>
[...options].sort((a, b) => getOptionVoteCount(b.id) - getOptionVoteCount(a.id))

const getWinner = (options: Option[]): Option | null => {
    const ranked = getRankedOptions(options)
    return ranked.length ? ranked[0] : null
}

const getWinnerPercentage = (options: Option[]): number => {
    const winner = getWinner(options)
    return winner ? getPercentage(winner) : 0
}

watch(selectedEngineId, () => loadResults(), { immediate: true })

// ---------- Dynamic engine configuration ----------
const effectiveEngineId = computed(() => currentEngine.value?.engine || 'binary')

const maxRank = computed(() => {
    if (!['ranking', 'condorcet', 'borda'].includes(effectiveEngineId.value))
        return votableOptions.value.length

    const config = currentEngine.value?.config || {}
    const configuredMax = config.max_rank

    // If max_rank is null, undefined, or not present, rank all options
    if (configuredMax === null || configuredMax === undefined) {
        return votableOptions.value.length
    }

    // Ensure we don't exceed the number of options
    return Math.min(configuredMax as number, votableOptions.value.length)
})

const scoreMin = computed(() => {
    if (!['score', 'star'].includes(effectiveEngineId.value)) return 0
        const config = currentEngine.value?.config || {}
    const min = config.min as number
    if (effectiveEngineId.value === 'star') {
        return min ?? 1
    }
    return min ?? 0
})

const scoreMax = computed(() => {
    if (effectiveEngineId.value === 'star') {
        const config = currentEngine.value?.config || {}
        return (config.max as number) ?? 5
    }
    if (effectiveEngineId.value === 'score') {
        const config = currentEngine.value?.config || {}
        return (config.max as number) ?? 10
    }
    return 10
})

onMounted(async () => {
    if (availableEngines.value.length > 0 && !selectedEngineId.value) {
        selectedEngineId.value = availableEngines.value[0].id
    }
})

// ---------- Expose context ----------
return {
    loadingEngines,
    availableEngines,
    selectedEngineId,
    currentEngine,
    votableOptions,
    hasActiveEngine,

    rankings,
    scores,
    grades,
    reactions,
    quadraticVotes,
    tokenWeights,
    selectedOptions,
    hasUserVoted,
    canVote,
    canSubmitMultiVote,
    voteSelectionInfo,
    isEngineMulti,
    hasUserVotedFor,
    isSelectedForVote,
    toggleSelection,
    updateRanking,
    updateScore,
    updateGrade,
    updateReaction,
    updateQuadratic,
    updateTokenWeight,
    resetSelections,
    submitSingleVote,
    submitMultiVote,

    totalVotes,
    getOptionVoteCount,
    getPercentage,
    getRankedOptions,
    getWinner,
    getWinnerPercentage,

    effectiveEngineId,
    maxRank,
    scoreMin,
    scoreMax,

    selectEngine,
    refreshEngines,
}
}
