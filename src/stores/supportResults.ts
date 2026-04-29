/**
 * SPDX-FileCopyrightText: 2026 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

// supportResultStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { 
    SupportResult, 
    SupportResultData,
    SupportEngine,
    BinaryResult,
    TernaryResult,
    ScoreResult,
    RankingResult,
    CondorcetResult,
    MajorityJudgmentResult,
    ReactionResult,
    ApprovalResult,
    TrendingResult
} from '../Types/index'
import { SupportResultAPI } from '../Api/supportResultApi'
import { Logger } from '../helpers/index'

export const useSupportResultStore = defineStore('supportResult', () => {
    // State
    const results = ref<SupportResult[]>([])
    const currentResults = ref<Map<string, SupportResultData>>(new Map())
    const loading = ref(false)
    const error = ref<string | null>(null)
    const lastCalculated = ref<number | null>(null)
    
    // History for tracking changes over time
    const resultHistory = ref<Map<number, SupportResult[]>>(new Map())

    // Getters
    const getResultsByEngine = computed(() => {
        return (engineId: number) => 
            results.value.filter(r => r.support_process_id === engineId)
    })

    const getResultsByTarget = computed(() => {
        return (targetType: 'inquiry' | 'option', targetId: number) =>
            results.value.filter(r => 
                r.target_type === targetType && r.target_id === targetId
            )
    })

    const getResultByTargetAndOption = computed(() => {
        return (targetId: number, optionId: number) =>
            results.value.find(r => 
                r.target_id === targetId && r.option_id === optionId
            )
    })

    // Type-specific result getters
    const getBinaryResult = (result: SupportResultData): BinaryResult | null => {
        return result.type === 'binary' ? result as BinaryResult : null
    }

    const getTernaryResult = (result: SupportResultData): TernaryResult | null => {
        return result.type === 'ternary' ? result as TernaryResult : null
    }

    const getScoreResult = (result: SupportResultData): ScoreResult | null => {
        return result.type === 'score' ? result as ScoreResult : null
    }

    const getRankingResult = (result: SupportResultData): RankingResult | null => {
        return result.type === 'ranking' ? result as RankingResult : null
    }

    const getReactionResult = (result: SupportResultData): ReactionResult | null => {
        return result.type === 'reaction' ? result as ReactionResult : null
    }

    const getApprovalResult = (result: SupportResultData): ApprovalResult | null => {
        return result.type === 'approval' ? result as ApprovalResult : null
    }

    // Helper to extract UI-friendly result data
    const getFormattedResult = computed(() => {
        return (result: SupportResultData) => {
            switch (result.type) {
                case 'binary':
                    return {
                        primary: `${Math.round((result as BinaryResult).percentage_yes)}%`,
                        secondary: `${(result as BinaryResult).total_yes} yes / ${(result as BinaryResult).total_no} no`,
                        icon: (result as BinaryResult).percentage_yes > 50 ? 'check' : 'close'
                    }
                case 'score':
                    return {
                        primary: `${((result as ScoreResult).average).toFixed(1)}`,
                        secondary: `of ${(result as ScoreResult).total} votes`,
                        icon: 'star'
                    }
                case 'ternary':
                    const tResult = result as TernaryResult
                    const max = Math.max(tResult.percentage_yes, tResult.percentage_no, tResult.percentage_abstain)
                    return {
                        primary: `${Math.round(max)}%`,
                        secondary: `${tResult.total_yes}F / ${tResult.total_abstain}A / ${tResult.total_no}N`,
                        icon: max === tResult.percentage_yes ? 'thumb-up' : 'thumb-down'
                    }
                case 'reaction':
                    const rResult = result as ReactionResult
                    const topReaction = Object.entries(rResult.counts)
                        .sort(([,a], [,b]) => b - a)[0]
                    return {
                        primary: topReaction?.[0] || '',
                        secondary: `${Object.values(rResult.counts).reduce((a, b) => a + b, 0)} reactions`,
                        icon: 'emoticon'
                    }
                default:
                    return {
                        primary: 'N/A',
                        secondary: '',
                        icon: 'help'
                    }
            }
        }
    })

    // Actions
    async function loadEngineResults(engineId: number): Promise<void> {
        loading.value = true
        error.value = null
        try {
            const response = await SupportResultAPI.getResultsByEngine(engineId)
            // Merge with existing results
            const existingIds = new Set(results.value.map(r => r.id))
            const newResults = response.data.results.filter(r => !existingIds.has(r.id))
            results.value.push(...newResults)
            
            // Update current results cache
            newResults.forEach(result => {
                const key = `${result.target_type}-${result.target_id}-${result.option_id || 'inquiry'}`
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
            
            // Update results store
            const existingIds = new Set(results.value.map(r => r.id))
            const newResults = response.data.results.filter(r => !existingIds.has(r.id))
            results.value.push(...newResults)
            
            // Cache current results
            newResults.forEach(result => {
                const key = `${result.target_type}-${result.target_id}-${result.option_id || 'inquiry'}`
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
            
            // Replace results for this engine
            results.value = results.value.filter(r => r.support_process_id !== engineId)
            results.value.push(...response.data.results)
            
            // Update cache
            currentResults.value.clear()
            response.data.results.forEach(result => {
                const key = `${result.target_type}-${result.target_id}-${result.option_id || 'inquiry'}`
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

    // Helper to get result for display
    function getResultDisplay(
        targetType: 'inquiry' | 'option',
        targetId: number,
        optionId?: number
    ): SupportResult | undefined {
        return results.value.find(r =>
            r.target_type === targetType &&
            r.target_id === targetId &&
            (optionId ? r.option_id === optionId : !r.option_id)
        )
    }

    // Check if results need recalculation
    function needsRecalculation(engineId: number, maxAge: number = 60000): boolean {
        if (!lastCalculated.value) return true
        const engineResults = results.value.filter(r => r.support_process_id === engineId)
        if (engineResults.length === 0) return true
        
        const oldestUpdate = Math.min(...engineResults.map(r => r.updated))
        return Date.now() - oldestUpdate > maxAge
    }

    // Reset store
    function reset(): void {
        results.value = []
        currentResults.value.clear()
        resultHistory.value.clear()
        loading.value = false
        error.value = null
        lastCalculated.value = null
    }

    return {
        // State
        results,
        currentResults,
        loading,
        error,
        lastCalculated,
        resultHistory,
        
        // Getters
        getResultsByEngine,
        getResultsByTarget,
        getResultByTargetAndOption,
        getFormattedResult,
        getBinaryResult,
        getTernaryResult,
        getScoreResult,
        getRankingResult,
        getReactionResult,
        getApprovalResult,
        
        // Actions
        loadEngineResults,
        loadTargetResults,
        calculateAndGetResults,
        loadResultHistory,
        getResultDisplay,
        needsRecalculation,
        reset
    }
})
