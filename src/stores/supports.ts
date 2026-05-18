/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { SupportsAPI, PublicAPI } from '../Api/index.ts'
import { Logger } from '../helpers/index.ts'
import { useSessionStore } from './session.ts'
import { useSupportResultStore } from './supportResult.ts'
import { useInquiriesStore } from './inquiries.ts'
import { useInquiryStore } from './inquiry.ts'
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
                                                                                                                                  function extractValueFromSupport(support: Support): number | string | any {
                                                                                                                                      const rawValue = support.value

                                                                                                                                      if (typeof rawValue === 'string') {
                                                                                                                                          try {
                                                                                                                                              const parsed = JSON.parse(rawValue)
                                                                                                                                              if (parsed && 'value' in parsed) {
                                                                                                                                                  return parsed.value
                                                                                                                                              }
                                                                                                                                              return parsed
                                                                                                                                          } catch {}
                                                                                                                                      }

                                                                                                                                      if (typeof rawValue === 'object' && rawValue !== null && 'value' in rawValue) {
                                                                                                                                          return rawValue.value
                                                                                                                                      }

                                                                                                                                      return rawValue
                                                                                                                                  }

                                                                                                                                  function calculateTernaryResultLocal(supports: Support[]): TernaryResult {
                                                                                                                                      let yes = 0, no = 0, abstain = 0

                                                                                                                                      supports.forEach(support => {
                                                                                                                                          const value = extractValueFromSupport(support)
                                                                                                                                          if (value === 1) yes++
                                                                                                                                                  else if (value === -1) no++
                                                                                                                                                      else if (value === 0) abstain++
                                                                                                                                      })

                                                                                                                                              const total = yes + no + abstain
                                                                                                                                              return {
                                                                                                                                                  type: 'ternary',
                                                                                                                                                  totals: { yes, no, abstain },
                                                                                                                                                  percentages: {
                                                                                                                                                      yes: total > 0 ? (yes / total) * 100 : 0,
                                                                                                                                                      no: total > 0 ? (no / total) * 100 : 0,
                                                                                                                                                      abstain: total > 0 ? (abstain / total) * 100 : 0
                                                                                                                                                  }
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
                                                                                                                                   * Normalize support value based on support feature type
                                                                                                                                   * This ensures values are in the correct format for processing
                                                                                                                                   */
                                                                                                                                  function normalizeSupportValue(value: SupportValue, supportFeature: SupportFeature): SupportValue {
                                                                                                                                      if (value === null || value === undefined) return null

                                                                                                                                          switch (supportFeature) {
                                                                                                                                              case 'ternary':
                                                                                                                                                  case 'binary':
                                                                                                                                                  case 'star':
                                                                                                                                                  case 'score':
                                                                                                                                                  // Convert numeric strings to numbers
                                                                                                                                                  if (typeof value === 'string' && !isNaN(Number(value))) {
                                                                                                                                                  return Number(value)
                                                                                                                                              }
                                                                                                                                              return value

                                                                                                                                              case 'reaction':
                                                                                                                                                  // Ensure it's a string or array of strings
                                                                                                                                                  if (typeof value === 'string') return value
                                                                                                                                              if (Array.isArray(value) && value.every(v => typeof v === 'string')) return value
                                                                                                                                                  return null

                                                                                                                                              case 'approval':
                                                                                                                                                  case 'ranking':
                                                                                                                                                  // Ensure it's an array of numbers
                                                                                                                                                  if (Array.isArray(value)) {
                                                                                                                                                  return value.map(v => typeof v === 'string' ? Number(v) : v)
                                                                                                                                              }
                                                                                                                                              return []

                                                                                                                                              case 'majority_judgment':
                                                                                                                                                  // Could be number or string grade
                                                                                                                                                  if (typeof value === 'string' && !isNaN(Number(value))) {
                                                                                                                                                  return Number(value)
                                                                                                                                              }
                                                                                                                                              return value

                                                                                                                                              default:
                                                                                                                                                  return value
                                                                                                                                          }
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
                                                                                                                                      const inquiryStore = useInquiriesStore()
                                                                                                                                      inquiryStore.refreshInquiryStatus(inquiryId)
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

                                                                                                                                      console.log(" AS SUPPPPPPPPPORTED VALUE USER ID ",userId)
                                                                                                                                      console.log(" AS SUPPPPPPPPPORTED VALUE ITEM TYPE",itemType)
                                                                                                                                      console.log(" AS SUPPPPPPPPPORTED VALUE ITEM ",item.currentUserStatus.supportValue)

                                                                                                                                      const oldHasSupported = item.currentUserStatus.hasSupported ?? false
                                                                                                                                      console.log(" AS SUPPPPPPPPPORTED ",item.currentUserStatus.hasSupported)
                                                                                                                                      // For binary, we just toggle on/off
                                                                                                                                      const hasSupported = !oldHasSupported
                                                                                                                                      console.log(" AS SUPPPPPPPPPORTED AFTER ",hasSupported)

                                                                                                                                      // Optimistic update
                                                                                                                                      item.currentUserStatus.hasSupported = hasSupported
                                                                                                                                      item.currentUserStatus.supportValue = hasSupported ? 1 : null

                                                                                                                                      try {
                                                                                                                                          const { inquiryId, optionId } = resolveIds(itemId, item, itemType)

                                                                                                                                          if (hasSupported) {
                                                                                                                                              console.log(" HAS SUPPPPPPPPPPPPPPPORTED sending result to backend ")
                                                                                                                                              // Send 1 for support
                                                                                                                                              const result = await addSupport(inquiryId, userId, 1, optionId)
                                                                                                                                              updateResultFromSupport(result, inquiryId, optionId)
                                                                                                                                              item.status.countSupports = item.status.countSupports + 1
                                                                                                                                          } else {
                                                                                                                                              console.log(" DELETE SEND TO BACKEND ")
                                                                                                                                              // Send DELETE request to remove support
                                                                                                                                              await removeSupport(inquiryId, userId, optionId)
                                                                                                                                              item.status.countSupports = item.status.countSupports - 1
                                                                                                                                          }

                                                                                                                                          return hasSupported
                                                                                                                                      } catch (error) {
                                                                                                                                          // Rollback
                                                                                                                                          item.currentUserStatus.hasSupported = oldHasSupported
                                                                                                                                          item.currentUserStatus.supportValue = oldHasSupported ? 1 : null
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

                                                                                                                                      let currentValue = normalizeSupportValue(
                                                                                                                                          item.currentUserStatus.supportValue ?? null, 
                                                                                                                                          getSupportFeature(item)
                                                                                                                                      ) as number | null

                                                                                                                                      const oldState: OldState = {
                                                                                                                                          value: currentValue,
                                                                                                                                          hasSupported: currentValue !== null,
                                                                                                                                          result: null
                                                                                                                                      }

                                                                                                                                      // Calculate next value in cycle: null -> 1 -> 0 -> -1 -> null
                                                                                                                                      let nextValue: number | null = null
                                                                                                                                      let shouldRemove = false
                                                                                                                                      let firstSupport = false

                                                                                                                                      console.log(" CURRENT VALUE ",currentValue)

                                                                                                                                      if (currentValue === null) {
                                                                                                                                          firstSupport = true
                                                                                                                                          nextValue = 1  // First click: vote "In Favor"
                                                                                                                                      } else if (currentValue === 1) {
                                                                                                                                          nextValue = 0  // Second click: change to "Neutral"
                                                                                                                                      } else if (currentValue === 0) {
                                                                                                                                          nextValue = -1 // Third click: change to "Against"
                                                                                                                                      } else if (currentValue === -1) {
                                                                                                                                          shouldRemove = true  // Fourth click: remove vote
                                                                                                                                      }

                                                                                                                                      console.log(" CURRENT NEXT VALUE ",nextValue)


                                                                                                                                      // Optimistic update
                                                                                                                                      if (shouldRemove) {
                                                                                                                                          item.currentUserStatus.supportValue = null
                                                                                                                                          item.currentUserStatus.hasSupported = false
                                                                                                                                          item.status.countSupports = item.status.countSupports - 1
                                                                                                                                      } else {
                                                                                                                                          item.currentUserStatus.supportValue = nextValue
                                                                                                                                          item.currentUserStatus.hasSupported = true
                                                                                                                                          if ( firstSupport ) {
                                                                                                                                              item.status.countSupports = item.status.countSupports + 1
                                                                                                                                          }
                                                                                                                                      }

                                                                                                                                      try {
                                                                                                                                          const { inquiryId, optionId } = resolveIds(itemId, item, itemType)

                                                                                                                                          if (shouldRemove) {
                                                                                                                                              // Send DELETE request to remove support
                                                                                                                                              await removeSupport(inquiryId, userId, optionId)
                                                                                                                                          } else if (currentValue === null) {
                                                                                                                                              // First time voting - add support
                                                                                                                                              const result = await addSupport(inquiryId, userId, nextValue!, optionId)
                                                                                                                                              updateResultFromSupport(result, inquiryId, optionId)
                                                                                                                                          } else {
                                                                                                                                              // Update existing support with new value
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
                                                                                                                                  function normalizeSupportPrimitive(value: SupportValue): SupportValue {
                                                                                                                                      if (value === null || value === undefined) return null

                                                                                                                                          // If it's a string that looks like a number, convert
                                                                                                                                          if (typeof value === 'string') {
                                                                                                                                              const num = Number(value)
                                                                                                                                              if (!isNaN(num)) return num
                                                                                                                                                  try {
                                                                                                                                                      const parsed = JSON.parse(value)
                                                                                                                                                      if (parsed && 'value' in parsed) {
                                                                                                                                                          return normalizeSupportPrimitive(parsed.value)
                                                                                                                                                      }
                                                                                                                                                      return parsed
                                                                                                                                                  } catch { /* not JSON */ }
                                                                                                                                                  return value
                                                                                                                                          }

                                                                                                                                          // If it's an object with a 'value' property, extract it
                                                                                                                                          if (typeof value === 'object' && value !== null && 'value' in value) {
                                                                                                                                              return normalizeSupportPrimitive((value as any).value)
                                                                                                                                          }

                                                                                                                                          return value
                                                                                                                                  }

                                                                                                                                  /**
                                                                                                                                   * Score/Star support (Rating 1-5 or 0-10)
                                                                                                                                   */
                                                                                                                                  async function submitScoreSupport(
                                                                                                                                      itemId: number, 
                                                                                                                                      userId: string, 
                                                                                                                                      item: SupportableItem, 
                                                                                                                                      itemType: 'inquiry' | 'option',
                                                                                                                                      score: number | null  // Allow null for removal
                                                                                                                                  ) {
                                                                                                                                      if (!item.currentUserStatus) item.currentUserStatus = {}

                                                                                                                                      const supportFeature = getSupportFeature(item)

                                                                                                                                      let oldScore = normalizeSupportValue(
                                                                                                                                          item.currentUserStatus.supportValue ?? null, 
                                                                                                                                          supportFeature
                                                                                                                                      ) as number | null

                                                                                                                                      // If score is null, we're removing the vote
                                                                                                                                      const shouldRemove = score === null

                                                                                                                                      // Optimistic update
                                                                                                                                      if (shouldRemove) {
                                                                                                                                          item.currentUserStatus.supportValue = null
                                                                                                                                          item.currentUserStatus.hasSupported = false
                                                                                                                                      } else {
                                                                                                                                          const normalizedScore = typeof score === 'string' ? Number(score) : score
                                                                                                                                          item.currentUserStatus.supportValue = normalizedScore
                                                                                                                                          item.currentUserStatus.hasSupported = true
                                                                                                                                      }

                                                                                                                                      try {
                                                                                                                                          const { inquiryId, optionId } = resolveIds(itemId, item, itemType)

                                                                                                                                          if (shouldRemove) {
                                                                                                                                              await removeSupport(inquiryId, userId, optionId)
                                                                                                                                          } else if (oldScore === null) {
                                                                                                                                              const result = await addSupport(inquiryId, userId, score!, optionId)
                                                                                                                                              updateResultFromSupport(result, inquiryId, optionId)
                                                                                                                                          } else {
                                                                                                                                              const result = await updateSupport(inquiryId, userId, score!, optionId)
                                                                                                                                              updateResultFromSupport(result, inquiryId, optionId)
                                                                                                                                          }

                                                                                                                                          return score
                                                                                                                                      } catch (error) {
                                                                                                                                          // Rollback
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
                                                                                                                                      const engineId = support.supportEngineId || null

                                                                                                                                      // Only fetch and update calculated results
                                                                                                                                      const supportResultStore = useSupportResultStore()
                                                                                                                                      supportResultStore.calculateAndGetResults(engineId).then(() => {
                                                                                                                                          const updatedResult = supportResultStore.getResultByTarget(targetId)
                                                                                                                                          if (updatedResult) {
                                                                                                                                              const inquiriesStore = useInquiriesStore()
                                                                                                                                              const inquiry = inquiriesStore.byId[inquiryId]
                                                                                                                                              if (inquiry?.status) {
                                                                                                                                                  inquiry.status.supportResult = updatedResult.result
                                                                                                                                              }
                                                                                                                                              const currentInquiryStore = useInquiryStore()
                                                                                                                                              if (currentInquiryStore.id === inquiryId && currentInquiryStore.status) {
                                                                                                                                                  currentInquiryStore.status.supportResult = updatedResult.result
                                                                                                                                              }
                                                                                                                                          }
                                                                                                                                      })

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
                                                                                                                                                  primary: `${Math.round(r.percentages.yes)}%`,
                                                                                                                                                  secondary: `${r.totals.yes} 👍 / ${r.totals.no} 👎`,
                                                                                                                                                  icon: r.percentages.yes >= 50 ? 'thumb-up' : 'thumb-down'
                                                                                                                                              }
                                                                                                                                          }
                                                                                                                                          case 'ternary': {
                                                                                                                                              const r = result as TernaryResult
                                                                                                                                              return {
                                                                                                                                                  primary: `${Math.round(r.percentages.yes)}%`,
                                                                                                                                                  secondary: `${r.totals.yes}F / ${r.totals.abstain}A / ${r.totals.no}N`,
                                                                                                                                                  icon: 'poll'
                                                                                                                                              }
                                                                                                                                          }
                                                                                                                                          case 'score': {
                                                                                                                                              const r = result as ScoreResult
                                                                                                                                              return {
                                                                                                                                                  primary: r.totals.average.toFixed(1),
                                                                                                                                                  secondary: `${r.totals.total} total votes`,
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
                                                                                                                                              // Normalize support values based on inquiry type
                                                                                                                                              const normalizedSupports = response.data.supports.map((support: Support) => {
                                                                                                                                                  // You might need to get the inquiry type here
                                                                                                                                                  // For now, just pass through
                                                                                                                                                  return support
                                                                                                                                              })
                                                                                                                                              supports.value = normalizedSupports
                                                                                                                                          }
                                                                                                                                      } catch (error) {
                                                                                                                                          if ((error as AxiosError)?.code !== 'ERR_CANCELED') {
                                                                                                                                              Logger.error('Error loading supports', { error })
                                                                                                                                          }
                                                                                                                                      } finally {
                                                                                                                                          loading.value = false
                                                                                                                                      }
                                                                                                                                  }
                                                                                                                                  async function addSupport(inquiryId: number, userId: string, value: SupportValue, optionId: number = 0): Promise<Support> {
                                                                                                                                      const sessionStore = useSessionStore()

                                                                                                                                      try {
                                                                                                                                          const response = await (() => {
                                                                                                                                              if (sessionStore.route.name === 'publicInquiry') {
                                                                                                                                                  return PublicAPI.addSupport(sessionStore.publicToken, inquiryId, userId, value, optionId)
                                                                                                                                              }
                                                                                                                                              return SupportsAPI.addSupport(inquiryId, userId, optionId, {
                                                                                                                                                  value: value,
                                                                                                                                                  weight: 1
                                                                                                                                              })
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
                                                                                                                                              return SupportsAPI.updateSupport(inquiryId, userId, optionId, {
                                                                                                                                                  value: value,
                                                                                                                                                  weight: 1
                                                                                                                                              })
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


                                                                                                                                  async function removeSupport(inquiryId: number, userId: string, optionId: number = 0, engineId?: number): Promise<void> {
                                                                                                                                      const sessionStore = useSessionStore()

                                                                                                                                      try {
                                                                                                                                          await (() => {
                                                                                                                                              if (sessionStore.route.name === 'publicInquiry') {
                                                                                                                                                  return PublicAPI.removeSupport(sessionStore.publicToken, inquiryId, userId, optionId)
                                                                                                                                              }
                                                                                                                                              return SupportsAPI.removeSupport(inquiryId, userId, optionId, engineId)
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
                                                                                                                                      addSupport,
                                                                                                                                      updateSupport,
                                                                                                                                      removeSupport,
                                                                                                                                      reset,
                                                                                                                                  }
})
