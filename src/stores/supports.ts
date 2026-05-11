/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { SupportsAPI, PublicAPI } from '../Api/index.ts'
import { Logger } from '../helpers/index.ts'
import { useSessionStore } from './session.ts'
import type { AxiosError } from '@nextcloud/axios'
import type { 
    Inquiry, 
    Option, 
    SupportValue, 
    SupportFeature,
    SupportResultData,
    BinaryResult,
    TernaryResult,
    ScoreResult,
    ReactionResult,
    ApprovalResult,
    RankingResult,
    TrendingResult
} from '../Types/index.ts'

export type Support = {
    id?: number
    inquiryId: number
    optionId: number
    userId: string
    value: SupportValue
    weight: number
    created: number
    updated?: number
    supportEngineId?: number
}

export interface SupportableItem {
    id: number
    configuration?: {
        supportFeature?: SupportFeature
    }
    currentUserStatus?: {
        supportValue?: SupportValue
        hasSupported?: boolean
    }
    status?: {
        countSupports?: number
        countPositiveSupports?: number
        countNeutralSupports?: number
        countNegativeSupports?: number
        supportResult?: SupportResultData
    }
}

interface OldState {
    value: SupportValue | null
    hasSupported: boolean
    result: SupportResultData | null
}

export const useSupportsStore = defineStore('supports', () => {
    // State
    const supports = ref<Support[]>([])
    const results = ref<Map<string, SupportResultData>>(new Map())
    const loading = ref(false)

    // Getters
    const count = computed(() => supports.value.length)

    const getSupport = computed(() => 
        (inquiryId: number, userId: string, optionId: number = 0): Support | undefined => 
            supports.value.find(s => 
                s.inquiryId === inquiryId && 
                s.userId === userId && 
                s.optionId === optionId
            )
    )

    const getSupportsByInquiryId = computed(() => 
        (inquiryId: number): Support[] => 
            supports.value.filter(s => s.inquiryId === inquiryId)
    )

    const getOptionSupports = computed(() => 
        (inquiryId: number, optionId: number): Support[] => 
            supports.value.filter(s => 
                s.inquiryId === inquiryId && s.optionId === optionId
            )
    )

    const getResult = computed(() => 
        (targetType: 'inquiry' | 'option', targetId: number): SupportResultData | undefined => {
            const key = `${targetType}-${targetId}`
            return results.value.get(key)
        }
    )

    // Actions
    function setItem(support: Support) {
        const index = supports.value.findIndex(s =>
            s.inquiryId === support.inquiryId && 
            s.userId === support.userId && 
            s.optionId === support.optionId
        )

        if (index === -1) {
            supports.value.push(support)
        } else {
            supports.value[index] = support
        }
    }

    function removeItem(inquiryId: number, userId: string, optionId: number = 0) {
        const index = supports.value.findIndex(s =>
            s.inquiryId === inquiryId && 
            s.userId === userId && 
            s.optionId === optionId
        )

        if (index !== -1) {
            supports.value.splice(index, 1)
        }
    }

    function getSupportFeature(item: SupportableItem): SupportFeature {
        return item.configuration?.supportFeature || 'none'
    }

    function getSupportResultKey(itemId: number, itemType: 'inquiry' | 'option', inquiryId?: number): string {
        if (itemType === 'option' && inquiryId) {
            return `option-${itemId}`
        }
        return `inquiry-${itemId}`
    }

    /**
     * Main toggle support handler - routes to appropriate handler based on support feature
     */
    async function toggleSupport(
        itemId: number, 
        userId: string, 
        item: SupportableItem, 
        itemType: 'inquiry' | 'option',
        customValue?: SupportValue
    ) {
        const supportFeature = getSupportFeature(item)
        
        switch (supportFeature) {
            case 'binary':
                return toggleBinarySupport(itemId, userId, item, itemType)
            case 'ternary':
                return toggleTernarySupport(itemId, userId, item, itemType)
            case 'star':
            case 'score':
                if (customValue !== undefined) {
                    return submitScoreSupport(itemId, userId, item, itemType, customValue as number)
                }
                return null
            case 'reaction':
                if (typeof customValue === 'string') {
                    return toggleReactionSupport(itemId, userId, item, itemType, customValue)
                }
                return null
            case 'approval':
                return toggleApprovalSupport(itemId, userId, item, itemType)
            case 'ranking':
                if (Array.isArray(customValue)) {
                    return submitRankingSupport(itemId, userId, item, itemType, customValue)
                }
                return null
            case 'none':
                return null
            default:
                // Fallback to binary
                return toggleBinarySupport(itemId, userId, item, itemType)
        }
    }

    /**
     * Binary support (Simple Yes/No)
     */
    async function toggleBinarySupport(
        itemId: number, 
        userId: string, 
        item: SupportableItem, 
        itemType: 'inquiry' | 'option'
    ) {
        if (!item.currentUserStatus) item.currentUserStatus = {}
        
        const oldState = item.currentUserStatus.hasSupported ?? false
        const hasSupported = !oldState

        // Optimistic update
        item.currentUserStatus.hasSupported = hasSupported
        item.currentUserStatus.supportValue = hasSupported ? 1 : null

        try {
            const { inquiryId, optionId } = resolveIds(itemId, item, itemType)
            
            if (hasSupported) {
                const result = await addSupport(inquiryId, userId, 1, optionId)
                updateResultFromSupport(result, inquiryId, optionId)
            } else {
                await removeSupport(inquiryId, userId, optionId)
            }

            return hasSupported
        } catch (error) {
            // Rollback
            item.currentUserStatus.hasSupported = oldState
            item.currentUserStatus.supportValue = oldState ? 1 : null
            throw error
        }
    }

    /**
     * Ternary support (For/Abstain/Against)
     */
    async function toggleTernarySupport(
        itemId: number, 
        userId: string, 
        item: SupportableItem, 
        itemType: 'inquiry' | 'option'
    ) {
        if (!item.currentUserStatus) item.currentUserStatus = {}
        
        const currentValue = (item.currentUserStatus.supportValue as number) ?? null
        const oldState: OldState = {
            value: currentValue,
            hasSupported: currentValue !== null,
            result: null
        }

        // Calculate next value in cycle: null -> 1 -> 0 -> -1 -> null
        let nextValue: number | null = null
        let shouldRemove = false

        if (currentValue === null) {
            nextValue = 1
        } else if (currentValue === 1) {
            nextValue = 0
        } else if (currentValue === 0) {
            nextValue = -1
        } else if (currentValue === -1) {
            shouldRemove = true
        }

        // Optimistic update
        if (shouldRemove) {
            item.currentUserStatus.supportValue = null
            item.currentUserStatus.hasSupported = false
        } else {
            item.currentUserStatus.supportValue = nextValue
            item.currentUserStatus.hasSupported = true
        }

        try {
            const { inquiryId, optionId } = resolveIds(itemId, item, itemType)

            if (shouldRemove) {
                await removeSupport(inquiryId, userId, optionId)
            } else if (currentValue === null) {
                const result = await addSupport(inquiryId, userId, nextValue!, optionId)
                updateResultFromSupport(result, inquiryId, optionId)
            } else {
                const result = await updateSupport(inquiryId, userId, nextValue!, optionId)
                updateResultFromSupport(result, inquiryId, optionId)
            }

            return nextValue
        } catch (error) {
            // Rollback
            item.currentUserStatus.supportValue = oldState.value
            item.currentUserStatus.hasSupported = oldState.hasSupported
            throw error
        }
    }

    /**
     * Score/Star support (Rating 1-5 or 0-10)
     */
    async function submitScoreSupport(
        itemId: number, 
        userId: string, 
        item: SupportableItem, 
        itemType: 'inquiry' | 'option',
        score: number
    ) {
        if (!item.currentUserStatus) item.currentUserStatus = {}
        
        const oldScore = (item.currentUserStatus.supportValue as number) ?? null
        
        item.currentUserStatus.supportValue = score
        item.currentUserStatus.hasSupported = true

        try {
            const { inquiryId, optionId } = resolveIds(itemId, item, itemType)
            
            if (oldScore === null) {
                const result = await addSupport(inquiryId, userId, score, optionId)
                updateResultFromSupport(result, inquiryId, optionId)
            } else {
                const result = await updateSupport(inquiryId, userId, score, optionId)
                updateResultFromSupport(result, inquiryId, optionId)
            }

            return score
        } catch (error) {
            item.currentUserStatus.supportValue = oldScore
            if (oldScore === null) item.currentUserStatus.hasSupported = false
            throw error
        }
    }

    /**
     * Reaction support (Emoji reactions)
     */
    async function toggleReactionSupport(
        itemId: number, 
        userId: string, 
        item: SupportableItem, 
        itemType: 'inquiry' | 'option',
        reaction: string
    ) {
        if (!item.currentUserStatus) item.currentUserStatus = {}
        
        const currentReactions = (item.currentUserStatus.supportValue as string[]) ?? []
        const hasReacted = currentReactions.includes(reaction)

        let newReactions: string[]
        if (hasReacted) {
            newReactions = currentReactions.filter(r => r !== reaction)
        } else {
            newReactions = [...currentReactions, reaction]
        }

        item.currentUserStatus.supportValue = newReactions
        item.currentUserStatus.hasSupported = newReactions.length > 0

        try {
            const { inquiryId, optionId } = resolveIds(itemId, item, itemType)

            if (newReactions.length === 0) {
                await removeSupport(inquiryId, userId, optionId)
            } else if (currentReactions.length === 0) {
                const result = await addSupport(inquiryId, userId, newReactions, optionId)
                updateResultFromSupport(result, inquiryId, optionId)
            } else {
                const result = await updateSupport(inquiryId, userId, newReactions, optionId)
                updateResultFromSupport(result, inquiryId, optionId)
            }

            return newReactions
        } catch (error) {
            item.currentUserStatus.supportValue = currentReactions
            item.currentUserStatus.hasSupported = currentReactions.length > 0
            throw error
        }
    }

    /**
     * Approval support (Multi-select approval)
     */
    async function toggleApprovalSupport(
        itemId: number, 
        userId: string, 
        item: SupportableItem, 
        itemType: 'inquiry' | 'option'
    ) {
        if (!item.currentUserStatus) item.currentUserStatus = {}
        
        const currentApproved = (item.currentUserStatus.supportValue as number[]) ?? []
        const isApproved = currentApproved.includes(itemId)
        
        let newApproved: number[]
        if (isApproved) {
            newApproved = currentApproved.filter(id => id !== itemId)
        } else {
            newApproved = [...currentApproved, itemId]
        }

        item.currentUserStatus.supportValue = newApproved
        item.currentUserStatus.hasSupported = newApproved.length > 0

        try {
            const { inquiryId, optionId } = resolveIds(itemId, item, itemType)

            if (newApproved.length === 0) {
                await removeSupport(inquiryId, userId, optionId)
            } else if (currentApproved.length === 0) {
                const result = await addSupport(inquiryId, userId, newApproved, optionId)
                updateResultFromSupport(result, inquiryId, optionId)
            } else {
                const result = await updateSupport(inquiryId, userId, newApproved, optionId)
                updateResultFromSupport(result, inquiryId, optionId)
            }

            return newApproved
        } catch (error) {
            item.currentUserStatus.supportValue = currentApproved
            item.currentUserStatus.hasSupported = currentApproved.length > 0
            throw error
        }
    }

    /**
     * Ranking support (Ranked choice ordering)
     */
    async function submitRankingSupport(
        itemId: number, 
        userId: string, 
        item: SupportableItem, 
        itemType: 'inquiry' | 'option',
        ranking: number[]
    ) {
        if (!item.currentUserStatus) item.currentUserStatus = {}
        
        const oldRanking = (item.currentUserStatus.supportValue as number[]) ?? []
        
        item.currentUserStatus.supportValue = ranking
        item.currentUserStatus.hasSupported = ranking.length > 0

        try {
            const { inquiryId, optionId } = resolveIds(itemId, item, itemType)

            if (ranking.length === 0) {
                await removeSupport(inquiryId, userId, optionId)
            } else if (oldRanking.length === 0) {
                const result = await addSupport(inquiryId, userId, ranking, optionId)
                updateResultFromSupport(result, inquiryId, optionId)
            } else {
                const result = await updateSupport(inquiryId, userId, ranking, optionId)
                updateResultFromSupport(result, inquiryId, optionId)
            }

            return ranking
        } catch (error) {
            item.currentUserStatus.supportValue = oldRanking
            item.currentUserStatus.hasSupported = oldRanking.length > 0
            throw error
        }
    }

    /**
     * Resolve inquiryId and optionId based on item type
     */
    function resolveIds(itemId: number, item: SupportableItem, itemType: 'inquiry' | 'option'): { inquiryId: number, optionId: number } {
        if (itemType === 'option') {
            const option = item as Option
            return {
                inquiryId: option.targetId || itemId,
                optionId: itemId
            }
        }
        return {
            inquiryId: itemId,
            optionId: 0
        }
    }

    /**
     * Update result based on support change
     */
    function updateResultFromSupport(support: Support, inquiryId: number, optionId: number) {
        const targetType = optionId > 0 ? 'option' : 'inquiry'
        const targetId = optionId > 0 ? optionId : inquiryId
        const key = `${targetType}-${targetId}`
        
        // Trigger reload of results for this target
        loadTargetResults(targetType, targetId)
    }

    /**
     * Parse and format result for display
     */
    function formatResult(result: SupportResultData): {
        primary: string
        secondary: string
        icon: string
    } {
        switch (result.type) {
            case 'binary': {
                const r = result as BinaryResult
                return {
                    primary: `${Math.round(r.percentage_yes)}%`,
                    secondary: `${r.total_yes} 👍 / ${r.total_no} 👎`,
                    icon: r.percentage_yes >= 50 ? 'thumb-up' : 'thumb-down'
                }
            }
            case 'ternary': {
                const r = result as TernaryResult
                return {
                    primary: `${Math.round(r.percentage_yes)}%`,
                    secondary: `${r.total_yes}F / ${r.total_abstain}A / ${r.total_no}N`,
                    icon: 'poll'
                }
            }
            case 'score': {
                const r = result as ScoreResult
                return {
                    primary: r.average.toFixed(1),
                    secondary: `${r.total} total votes`,
                    icon: 'star'
                }
            }
            case 'reaction': {
                const r = result as ReactionResult
                const topReaction = Object.entries(r.counts)
                    .sort(([,a], [,b]) => b - a)[0]
                return {
                    primary: topReaction?.[0] || '',
                    secondary: `${Object.values(r.counts).reduce((a, b) => a + b, 0)} reactions`,
                    icon: 'emoticon'
                }
            }
            case 'approval': {
                const r = result as ApprovalResult
                const total = Object.values(r.counts).reduce((a, b) => a + b, 0)
                return {
                    primary: `${total}`,
                    secondary: `approvals`,
                    icon: 'check-all'
                }
            }
            case 'ranking': {
                const r = result as RankingResult
                return {
                    primary: `#${r.rank}`,
                    secondary: `Score: ${r.score || 0}`,
                    icon: 'trophy'
                }
            }
            case 'trending': {
                const r = result as TrendingResult
                return {
                    primary: `${r.score}`,
                    secondary: 'trending',
                    icon: 'fire'
                }
            }
            default:
                return {
                    primary: 'N/A',
                    secondary: '',
                    icon: 'help'
                }
        }
    }

    // API calls
    async function loadSupports(inquiryId?: number) {
        loading.value = true
        const sessionStore = useSessionStore()
        
        try {
            const response = await (() => {
                if (sessionStore.route.name === 'publicInquiry') {
                    return PublicAPI.getSupports(sessionStore.route.params.token as string)
                }
                if (inquiryId) {
                    return SupportsAPI.getSupportsByInquiryId(inquiryId)
                }
                return null
            })()

            if (response) {
                supports.value = response.data.supports
            }
        } catch (error) {
            if ((error as AxiosError)?.code !== 'ERR_CANCELED') {
                Logger.error('Error loading supports', { error })
            }
        } finally {
            loading.value = false
        }
    }

    async function loadTargetResults(targetType: 'inquiry' | 'option', targetId: number) {
        try {
            const response = await SupportsAPI.getResultsByTarget(targetType, targetId)
            const key = `${targetType}-${targetId}`
            
            // Store the latest result
            if (response.data.results?.length > 0) {
                results.value.set(key, response.data.results[0].result)
            }
        } catch (error) {
            if ((error as AxiosError)?.code !== 'ERR_CANCELED') {
                Logger.error('Error loading results', { error, targetType, targetId })
            }
        }
    }

    async function addSupport(inquiryId: number, userId: string, value: SupportValue, optionId: number = 0): Promise<Support> {
        const sessionStore = useSessionStore()
        
        try {
            const response = await (() => {
                if (sessionStore.route.name === 'publicInquiry') {
                    return PublicAPI.addSupport(sessionStore.publicToken, inquiryId, userId, value, optionId)
                }
                return SupportsAPI.addSupport(inquiryId, userId, value, optionId)
            })()

            if (response) {
                setItem(response.data.support)
                return response.data.support
            }
            throw new Error('No response from API')
        } catch (error) {
            if ((error as AxiosError)?.code !== 'ERR_CANCELED') {
                Logger.error('Error adding support', { error })
                throw error
            }
            throw error
        }
    }

    async function updateSupport(inquiryId: number, userId: string, value: SupportValue, optionId: number = 0): Promise<Support> {
        const sessionStore = useSessionStore()
        
        try {
            const response = await (() => {
                if (sessionStore.route.name === 'publicInquiry') {
                    return PublicAPI.updateSupport(sessionStore.publicToken, inquiryId, userId, value, optionId)
                }
                return SupportsAPI.updateSupport(inquiryId, userId, value, optionId)
            })()

            if (response) {
                setItem(response.data.support)
                return response.data.support
            }
            throw new Error('No response from API')
        } catch (error) {
            if ((error as AxiosError)?.code !== 'ERR_CANCELED') {
                Logger.error('Error updating support', { error })
                throw error
            }
            throw error
        }
    }

    async function removeSupport(inquiryId: number, userId: string, optionId: number = 0): Promise<void> {
        const sessionStore = useSessionStore()
        
        try {
            await (() => {
                if (sessionStore.route.name === 'publicInquiry') {
                    return PublicAPI.removeSupport(sessionStore.publicToken, inquiryId, userId, optionId)
                }
                return SupportsAPI.removeSupport(inquiryId, userId, optionId)
            })()

            removeItem(inquiryId, userId, optionId)
        } catch (error) {
            if ((error as AxiosError)?.code !== 'ERR_CANCELED') {
                Logger.error('Error removing support', { error })
                throw error
            }
        }
    }

    function reset() {
        supports.value = []
        results.value.clear()
        loading.value = false
    }

    return {
        // State
        supports,
        results,
        loading,
        
        // Getters
        count,
        getSupport,
        getSupportsByInquiryId,
        getOptionSupports,
        getResult,
        
        // Actions
        setItem,
        removeItem,
        toggleSupport,
        toggleBinarySupport,
        toggleTernarySupport,
        submitScoreSupport,
        toggleReactionSupport,
        toggleApprovalSupport,
        submitRankingSupport,
        formatResult,
        loadSupports,
        loadTargetResults,
        addSupport,
        updateSupport,
        removeSupport,
        reset,
    }
})
