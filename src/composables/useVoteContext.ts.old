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

export interface VoteContext {
    // Core state
    loadingEngines: Ref<boolean>
    availableEngines: ComputedRef<SupportEngine[]>
    selectedEngineId: Ref<number | null>
    currentEngine: ComputedRef<SupportEngine | null>
    votableOptions: ComputedRef<Option[]>
    hasActiveEngine: ComputedRef<boolean>

    // Vote submission state
    rankings: Ref<Record<number, number>>
    scores: Ref<Record<number, number>>
    selectedOptions: Ref<Set<number>>
    hasUserVoted: ComputedRef<boolean>
    canVote: ComputedRef<boolean>
    canSubmitMultiVote: ComputedRef<boolean>
    voteSelectionInfo: ComputedRef<string | null>

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
    submitSingleVote: (option: Option, value?: SupportValue) => Promise<boolean>
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

    // ---------- Engine management (from useVoteEngine) ----------
    const loadingEngines = ref(false)
    const selectedEngineId = ref<number | null>(null)

    const availableEngines = computed(() => engineStore.getEnginesByInquiry(inquiryId) )

    const currentEngine = computed<SupportEngine | null>(() => {
        const engines = availableEngines.value
        if (!engines.length) return null

            console.log("Current available engines:", engines.map(e => ({ id: e.id, title: e.title })))
            console.log("Selected engine ID:", selectedEngineId.value)

            if (selectedEngineId.value) {
                const found = engines.find(e => e.id === selectedEngineId.value)
                if (found) {
                    console.log('Found selected engine:', found.title)
                    engineStore.setCurrentEngine(found)
                    return found
                }
            }

            // If no engine selected, return the first one but DON'T mutate selectedEngineId here
            console.log('Returning default engine:', engines[0].title)
            engineStore.setCurrentEngine(engines[0])
            return engines[0]
    })

    watch(availableEngines, (engines) => {
        if (engines.length > 0 && !selectedEngineId.value) {
            selectedEngineId.value = engines[0].id
            console.log('Initialized selected engine ID to:', selectedEngineId.value)
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
        loadingEngines.value = true
        try {
            // await engineStore.loadEnginesByInquiry(inquiryId)
        } finally {
            loadingEngines.value = false
        }
    }

    const selectEngine = (engineId: number) => {
        if (availableEngines.value.some(e => e.id === engineId)) {
            selectedEngineId.value = engineId
        }
    }


    // ---------- Vote submission (from useVoteSubmission) ----------
    const rankings = ref<Record<number, number>>({})
    const scores = ref<Record<number, number>>({})
    const selectedOptions = ref<Set<number>>(new Set())

    const currentUserVotes = computed(() => {
        const userId = sessionStore.user?.userId
        if (!userId) return []
            return supportsStore
        .getSupportsByInquiryId(inquiryId)
        .filter(s => s.userId === userId)
    })

    const hasUserVoted = computed(() => currentUserVotes.value.length > 0)

    const canVote = computed(() => {
        const engine = currentEngine.value
        if (!engine || engine.status !== 'active') return false
            if (hasUserVoted.value && engine.behavior === 'single') return false
                return true
    })

    const hasUserVotedFor = (optionId: number): boolean =>
    currentUserVotes.value.some(vote => vote.optionId === optionId)

    const isSelectedForVote = (optionId: number): boolean => {
        const engineId = effectiveEngineId.value
        if (engineId === 'ranking') return rankings.value[optionId] !== undefined
            if (engineId === 'score' || engineId === 'star')
                return scores.value[optionId] !== undefined
        return selectedOptions.value.has(optionId)
    }

    const toggleSelection = (optionId: number) => {
        if (selectedOptions.value.has(optionId))
            selectedOptions.value.delete(optionId)
        else selectedOptions.value.add(optionId)
    }

const updateRanking = (optionId: number, rank: number | null) => {
    if (rank === null) {
        const { [optionId]: _, ...rest } = rankings.value
        rankings.value = rest
    } else {
        rankings.value = { ...rankings.value, [optionId]: rank }
    }
}

const updateScore = (optionId: number, score: number | null) => {
    if (score === null) {
        const { [optionId]: _, ...rest } = scores.value
        scores.value = rest
    } else {
        scores.value = { ...scores.value, [optionId]: score }
    }
}

const resetSelections = () => {
    selectedOptions.value.clear()
    rankings.value = {}
    scores.value = {}
}

const submitSingleVote = async (option: Option, value: SupportValue = 1) => {
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

const canSubmitMultiVote = computed(() => {
    const engineId = effectiveEngineId.value
    const config = currentEngine.value?.config || {}

    if (engineId === 'approval') {
        const min = (config.min_choices as number) || 1
        const max = config.max_choices as number | null
        const count = selectedOptions.value.size
        if (count < min) return false
            if (max !== null && count > max) return false
                return count > 0
    }
    if (engineId === 'ranking') {
        const rankedCount = Object.values(rankings.value).filter(v => v != null).length
        return rankedCount >= 2
    }
    if (engineId === 'score' || engineId === 'star') {
        const scoredCount = Object.values(scores.value).filter(v => v != null).length
        return scoredCount > 0
    }
    return selectedOptions.value.size > 0
})

const voteSelectionInfo = computed(() => {
    const engineId = effectiveEngineId.value
    const config = currentEngine.value?.config || {}

    if (engineId === 'approval') {
        const min = (config.min_choices as number) || 1
        const max = config.max_choices as number | null
        const count = selectedOptions.value.size
        return max ? `${count}/${max} selected (min: ${min})` : `${count} selected (min: ${min})`
    }
    if (engineId === 'ranking') {
        const count = Object.values(rankings.value).filter(v => v != null).length
        return `${count} options ranked`
    }
    if (engineId === 'score' || engineId === 'star') {
        const count = Object.values(scores.value).filter(v => v != null).length
        return `${count} options rated`
    }
    return `${selectedOptions.value.size} selected`
})

const submitMultiVote = async () => {
    if (!canVote.value) return false
    if (!canSubmitMultiVote.value) return false
        const engineId = effectiveEngineId.value
    const userId = sessionStore.user?.userId
    if (!userId) return false

        try {
            if (engineId === 'approval') {
                for (const optionId of selectedOptions.value) {
                    await supportsStore.toggleSupport(
                        inquiryId,
                        optionId,
                        userId,
                        { id: optionId } as Option,
                        'option',
                        1
                    )
                }
            } else if (engineId === 'ranking') {
                const sorted = Object.entries(rankings.value)
                .sort(([, a], [, b]) => a - b)
                .map(([id]) => parseInt(id))
                for (const optionId of sorted) {
                    await supportsStore.toggleSupport(
                        inquiryId,
                        optionId,
                        userId,
                        { id: optionId } as Option,
                        'option',
                        rankings.value[optionId]
                    )
                }
            } else if (engineId === 'score' || engineId === 'star') {
                for (const [optionId, score] of Object.entries(scores.value)) {
                    await supportsStore.toggleSupport(
                        inquiryId,
                        parseInt(optionId),
                        userId,
                        { id: parseInt(optionId) } as Option,
                        'option',
                        score
                    )
                }
            }
            resetSelections()
            return true
        } catch (error) {
            console.error('Failed to submit multi-vote:', error)
            return false
        }
}

// ---------- Results (from useVoteResults) ----------
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
    const result = resultsMap.value.get(optionId)
    if (!result) return 0
        switch (result.type) {
            case 'binary':
                case 'ternary':
                return result.totals.yes
            case 'score':
                return result.totals.total
            default:
                return Object.values(result.counts || {}).reduce((a, b) => a + b, 0)
        }
}

const totalVotes = computed(() => {
    let total = 0
    for (const result of resultsMap.value.values()) {
        switch (result.type) {
            case 'binary':
                total += result.totals.yes + result.totals.no
            break
            case 'ternary':
                total += result.totals.yes + result.totals.no + result.totals.abstain
            break
            case 'score':
                total += result.totals.total
            break
            default:
                total += Object.values(result.counts || {}).reduce((a, b) => a + b, 0)
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


// Reload results when engine changes
watch(selectedEngineId, () => loadResults(), { immediate: true })

// ---------- Dynamic engine configuration ----------
const effectiveEngineId = computed(() => currentEngine.value?.engine || 'binary')

const maxRank = computed(() => {
    if (effectiveEngineId.value !== 'ranking') return votableOptions.value.length
        const config = currentEngine.value?.config || {}
    return (config.max_rank as number) || votableOptions.value.length
})

const scoreMin = computed(() => {
    if (effectiveEngineId.value !== 'score' && effectiveEngineId.value !== 'star') return 0
        const config = currentEngine.value?.config || {}
    return (config.min as number) ?? 0
})

const scoreMax = computed(() => {
    if (effectiveEngineId.value === 'star') return 5
        if (effectiveEngineId.value === 'score') {
            const config = currentEngine.value?.config || {}
            return (config.max as number) ?? 10
        }
        return 10
})


onMounted(async () => {
    // If we have engines but no selectedEngineId, set it to the first one
    if (availableEngines.value.length > 0 && !selectedEngineId.value) {
        selectedEngineId.value = availableEngines.value[0].id
        console.log('Initialized selected engine to:', selectedEngineId.value)
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
    selectedOptions,
    hasUserVoted,
    canVote,
    canSubmitMultiVote,
    voteSelectionInfo,
    hasUserVotedFor,
    isSelectedForVote,
    toggleSelection,
    updateRanking,
    updateScore,
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
