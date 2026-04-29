/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { defineStore } from 'pinia'
import { SupportsAPI, PublicAPI } from '../Api/index.ts'
import { groupSupports, Logger } from '../helpers/index.ts'
import { useSessionStore } from './session.ts'
import type { AxiosError } from '@nextcloud/axios'
import type { Inquiry, Option, SupportValue } from '../Types/index.ts'

export type Support = {
    id?: number
    inquiryId: number
    optionId?: number
    groupId: number
    userId: string
    value: SupportValue
    weight: number
    created: number
}

export type Supports = {
    supports: Support[]
}

export interface SupportsGrouped {
    inquiryId: number
    optionId?: number
    supports: Support[]
}

type SupportableItem = Inquiry | Option

interface OldState {
    value: number | null
    hasSupported: boolean
    counts: {
        positive: number
        neutral: number
        negative: number
    }
    total: number
}

export const useSupportsStore = defineStore('supports', {
    state: () => ({
        supports: [] as Support[],
    }),

    getters: {
        count: (state) => state.supports.length,
        groupedSupports: (state) => groupSupports(state.supports),

        getSupport: (state) => (inquiryId: number, userId: string, optionId?: number) => 
            state.supports.find(support => {
                const inquiryMatch = support.inquiryId === inquiryId && 
                                    support.userId === userId
                
                if (optionId !== undefined && optionId > 0) {
                    return inquiryMatch && support.optionId === optionId
                }
                return inquiryMatch && (!support.optionId || support.optionId === 0)
            }),
        
        getSupportsByInquiryId: (state) => (inquiryId: number) => 
            state.supports.filter(support => support.inquiryId === inquiryId),
        
        getOptionSupports: (state) => (inquiryId: number, optionId: number) => 
            state.supports.filter(support => 
                support.inquiryId === inquiryId && support.optionId === optionId
            ),
    },

    actions: {
        setItem(payload: { support: Support }) {
            const index = this.supports.findIndex(s => {
                const inquiryMatch = s.inquiryId === payload.support.inquiryId && 
                                    s.userId === payload.support.userId
                
                if (payload.support.optionId !== undefined && payload.support.optionId > 0) {
                    return inquiryMatch && s.optionId === payload.support.optionId
                }
                return inquiryMatch && (!s.optionId || s.optionId === 0)
            })

            if (index === -1) {
                this.supports.push(payload.support)
            } else {
                this.supports[index] = payload.support
            }
        },

        removeItem(inquiryId: number, userId: string, optionId?: number) {
            const index = this.supports.findIndex(s => {
                const inquiryMatch = s.inquiryId === inquiryId && s.userId === userId
                
                if (optionId !== undefined && optionId > 0) {
                    return inquiryMatch && s.optionId === optionId
                }
                return inquiryMatch && (!s.optionId || s.optionId === 0)
            })

            if (index !== -1) {
                this.supports.splice(index, 1)
            }
        },

        getSupportFeature(item: SupportableItem): string {
            return item.configuration?.supportFeature || 'none'
        },

        async toggleSupport(itemId: number, userId: string, item: SupportableItem, itemType: 'inquiry' | 'option') {
            const supportFeature = this.getSupportFeature(item)
            if (supportFeature === 'binary') {
                return this.toggleStandardSupport(itemId, userId, item, itemType)
            }
            if (supportFeature === 'ternary') {
                return this.toggleTernarySupport(itemId, userId, item, itemType)
            }
            return null
        },

        async toggleStandardSupport(itemId: number, userId: string, item: SupportableItem, itemType: 'inquiry' | 'option') {
            if (!item) return

            const oldState = item.currentUserStatus?.hasSupported ?? false
            const oldCount = item.status?.countSupports ?? 0

            if (!item.currentUserStatus) {
                item.currentUserStatus = {}
            }
            if (!item.status) {
                item.status = {}
            }

            item.currentUserStatus.hasSupported = !oldState
            item.status.countSupports = (item.status.countSupports || 0) + (oldState ? -1 : 1)

            const hasSupported = !oldState

            try {
                let inquiryId = itemId
                let optionId: number | undefined
                
                if (itemType === 'option') {
                    inquiryId = (item as Option).targetId
                    optionId = itemId
                }
                
                if (hasSupported) {
                    await SupportsAPI.addSupport(inquiryId, userId, 1, optionId)
                } else {
                    await SupportsAPI.removeSupport(inquiryId, userId, optionId)
                }

                return hasSupported
            } catch (error) {
                item.currentUserStatus.hasSupported = oldState
                item.status.countSupports = oldCount
                throw error
            }
        },

        async toggleTernarySupport(itemId: number, userId: string, item: SupportableItem, itemType: 'inquiry' | 'option') {
            if (!item) return

            const currentValue = item.currentUserStatus?.supportValue ?? null

            let nextValue: number | null
            let shouldRemove = false

            if (currentValue === 1) {
                nextValue = 0
            } else if (currentValue === 0) {
                nextValue = -1
            } else if (currentValue === -1) {
                shouldRemove = true
                nextValue = null
            } else {
                nextValue = 1
            }

            const oldState: OldState = {
                value: currentValue,
                hasSupported: currentValue !== null && currentValue !== undefined,
                counts: {
                    positive: item.status?.countPositiveSupports ?? 0,
                    neutral: item.status?.countNeutralSupports ?? 0,
                    negative: item.status?.countNegativeSupports ?? 0,
                },
                total: item.status?.countSupports ?? 0
            }

            try {
                this.updateTernaryUIState(item, currentValue, nextValue, shouldRemove)

                let inquiryId = itemId
                let optionId: number | undefined
                
                if (itemType === 'option') {
                    inquiryId = (item as Option).targetId 
                    optionId = itemId
                }

                if (shouldRemove) {
                    await SupportsAPI.removeSupport(inquiryId, userId, optionId)
                    this.removeItem(inquiryId, userId, optionId)
                } else if (currentValue === null) {
                    const result = await SupportsAPI.addSupport(inquiryId, userId, nextValue as number, optionId)
                    this.setItem({ support: result.data.support })
                } else {
                    const result = await SupportsAPI.updateSupport(inquiryId, userId, nextValue as number, optionId)
                    this.setItem({ support: result.data.support })
                }

                return nextValue
            } catch (error) {
                this.rollbackTernaryUIState(item, oldState)
                throw error
            }
        },

        updateTernaryUIState(item: SupportableItem, currentValue: number | null, nextValue: number | null, shouldRemove: boolean) {
            if (!item.currentUserStatus) {
                item.currentUserStatus = {}
            }
            if (!item.status) {
                item.status = {}
            }

            if (item.status.countPositiveSupports === undefined) item.status.countPositiveSupports = 0
            if (item.status.countNeutralSupports === undefined) item.status.countNeutralSupports = 0
            if (item.status.countNegativeSupports === undefined) item.status.countNegativeSupports = 0
            if (item.status.countSupports === undefined) item.status.countSupports = 0

            if (shouldRemove) {
                item.currentUserStatus.supportValue = null
                item.currentUserStatus.hasSupported = false
            } else {
                item.currentUserStatus.supportValue = nextValue
                item.currentUserStatus.hasSupported = true
            }

            if (currentValue === 1) {
                item.status.countPositiveSupports = Math.max(0, item.status.countPositiveSupports - 1)
                item.status.countSupports = Math.max(0, item.status.countSupports - 1)
            } else if (currentValue === 0) {
                item.status.countNeutralSupports = Math.max(0, item.status.countNeutralSupports - 1)
                item.status.countSupports = Math.max(0, item.status.countSupports - 1)
            } else if (currentValue === -1) {
                item.status.countNegativeSupports = Math.max(0, item.status.countNegativeSupports - 1)
                item.status.countSupports = Math.max(0, item.status.countSupports - 1)
            }

            if (nextValue === 1) {
                item.status.countPositiveSupports += 1
                item.status.countSupports += 1
            } else if (nextValue === 0) {
                item.status.countNeutralSupports += 1
                item.status.countSupports += 1
            } else if (nextValue === -1) {
                item.status.countNegativeSupports += 1
                item.status.countSupports += 1
            }
        },

        rollbackTernaryUIState(item: SupportableItem, oldState: OldState) {
            if (!item.currentUserStatus) {
                item.currentUserStatus = {}
            }
            if (!item.status) {
                item.status = {}
            }

            item.currentUserStatus.supportValue = oldState.value
            item.currentUserStatus.hasSupported = oldState.hasSupported

            item.status.countPositiveSupports = oldState.counts.positive
            item.status.countNeutralSupports = oldState.counts.neutral
            item.status.countNegativeSupports = oldState.counts.negative
            item.status.countSupports = oldState.total
        },

        async load() {
            const sessionStore = useSessionStore()
            try {
                const response = await (() => {
                    if (sessionStore.route.name === 'publicInquiry') {
                        return PublicAPI.getSupports(sessionStore.route.params.token as string)
                    }
                    if (sessionStore.route.name === 'inquiry') {
                        return SupportsAPI.getSupportsByInquiryId(sessionStore.currentInquiryId)
                    }
                    return null
                })()

                if (!response) {
                    this.$reset()
                    return
                }

                this.supports = response.data.supports
            } catch (error) {
                if ((error as AxiosError)?.code === 'ERR_CANCELED') {
                    return
                }
                this.$reset()
            }
        },

        async add(inquiryId: number, userId: string, value: number, optionId?: number) {
            const sessionStore = useSessionStore()
            try {
                const response = await (() => {
                    if (sessionStore.route.name === 'publicInquiry') {
                        return PublicAPI.addSupport(sessionStore.publicToken, inquiryId, userId, value, optionId)
                    }
                    if (sessionStore.route.name === 'inquiry') {
                        return SupportsAPI.addSupport(inquiryId, userId, value, optionId)
                    }
                    return null
                })()

                if (!response) {
                    this.$reset()
                    return
                }

                this.setItem({ support: response.data.support })
                return response.data.support
            } catch (error) {
                if ((error as AxiosError)?.code === 'ERR_CANCELED') return
                Logger.error('Error writing support', { error })
                throw error
            }
        },

        async update(inquiryId: number, userId: string, value: number, optionId?: number) {
            const sessionStore = useSessionStore()
            try {
                const response = await (() => {
                    if (sessionStore.route.name === 'publicInquiry') {
                        return PublicAPI.updateSupport(sessionStore.publicToken, inquiryId, userId, value, optionId)
                    }
                    if (sessionStore.route.name === 'inquiry') {
                        return SupportsAPI.updateSupport(inquiryId, userId, value, optionId)
                    }
                    return null
                })()

                if (!response) return

                this.setItem({ support: response.data.support })
                return response.data.support
            } catch (error) {
                if ((error as AxiosError)?.code === 'ERR_CANCELED') return
                Logger.error('Error updating support', { error })
                throw error
            }
        },

        async remove(inquiryId: number, userId: string, optionId?: number) {
            const sessionStore = useSessionStore()
            try {
                await (() => {
                    if (sessionStore.route.name === 'publicInquiry') {
                        return PublicAPI.removeSupport(sessionStore.publicToken, inquiryId, userId, optionId)
                    }
                    return SupportsAPI.removeSupport(inquiryId, userId, optionId)
                })()

                this.removeItem(inquiryId, userId, optionId)
            } catch (error) {
                if ((error as AxiosError)?.code === 'ERR_CANCELED') return
                Logger.error('Error deleting support', { error })
                throw error
            }
        },

        async restore(payload: { support: Support }) {
            const sessionStore = useSessionStore()
            try {
                const response = await (() => {
                    if (sessionStore.route.name === 'publicInquiry') {
                        return PublicAPI.restoreSupport(sessionStore.publicToken, payload.support.id!)
                    }
                    return SupportsAPI.restoreSupport(payload.support.id!)
                })()

                this.setItem({ support: response.data.support })
                return response.data.support
            } catch (error) {
                if ((error as AxiosError)?.code === 'ERR_CANCELED') return
                Logger.error('Error restoring support', { error, payload })
                throw error
            }
        },
    },
})
