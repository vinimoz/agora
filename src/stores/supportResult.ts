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
    ApprovalResult
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
    const getResultsByEngine = computed(() => (engineId: number) => 
                                        results.value.filter(r => r.support_engine_id === engineId)
                                       )

                                       const getResultsByTarget = computed(() => (targetType: 'inquiry' | 'option', targetId: number) =>
                                                                           results.value.filter(r => 
                                                                                                r.target_type === targetType && r.target_id === targetId
                                                                                               )
                                                                          )

                                                                          const getBinaryResult = (result: SupportResultData): BinaryResult | null =>
                                                                          result.type === 'binary' ? result as BinaryResult : null

                                                                          const getTernaryResult = (result: SupportResultData): TernaryResult | null =>
                                                                          result.type === 'ternary' ? result as TernaryResult : null

                                                                          const getScoreResult = (result: SupportResultData): ScoreResult | null =>
                                                                          result.type === 'score' ? result as ScoreResult : null

                                                                          const getRankingResult = (result: SupportResultData): RankingResult | null =>
                                                                          result.type === 'ranking' ? result as RankingResult : null

                                                                          const getReactionResult = (result: SupportResultData): ReactionResult | null =>
                                                                          result.type === 'reaction' ? result as ReactionResult : null

                                                                          const getApprovalResult = (result: SupportResultData): ApprovalResult | null =>
                                                                          result.type === 'approval' ? result as ApprovalResult : null



                                                                          const getFormattedResult = computed(() => (result: SupportResultData) => {
                                                                              switch (result.type) {
                                                                                  case 'binary': {
                                                                                      const binaryResult = result as BinaryResult
                                                                                      return {
                                                                                          primary: `${Math.round(binaryResult.percentages.yes)}%`,
                                                                                          secondary: `${binaryResult.totals.yes} yes / ${binaryResult.totals.no} no`,
                                                                                          icon: binaryResult.percentages.yes > 50 ? 'check' : 'close'
                                                                                      }
                                                                                  }
                                                                                  case 'score': {
                                                                                      const scoreResult = result as ScoreResult
                                                                                      return {
                                                                                          primary: `${scoreResult.totals.average.toFixed(1)}`,
                                                                                          secondary: `of ${scoreResult.totals.total} votes`,
                                                                                          icon: 'star'
                                                                                      }
                                                                                  }
                                                                                  case 'ternary': {
                                                                                      const tResult = result as TernaryResult
                                                                                      const max = Math.max(tResult.percentages.yes, tResult.percentages.no, tResult.percentages.abstain)
                                                                                      return {
                                                                                          primary: `${Math.round(max)}%`,
                                                                                          secondary: `${tResult.totals.yes}F / ${tResult.totals.abstain}A / ${tResult.totals.no}N`,
                                                                                          icon: max === tResult.percentages.yes ? 'thumb-up' : 'thumb-down'
                                                                                      }
                                                                                  }
                                                                                  case 'reaction': {
                                                                                      const rResult = result as ReactionResult
                                                                                      const topReaction = Object.entries(rResult.counts)
                                                                                      .sort(([,a], [,b]) => b - a)[0]
                                                                                      return {
                                                                                          primary: topReaction?.[0] || '',
                                                                                          secondary: `${Object.values(rResult.counts).reduce((a, b) => a + b, 0)} reactions`,
                                                                                              icon: 'emoticon'
                                                                                      }
                                                                                  }
                                                                                  default:
                                                                                      return {
                                                                                      primary: 'N/A',
                                                                                      secondary: '',
                                                                                      icon: 'help'
                                                                                  }
                                                                              }
                                                                          })


                                                                          async function loadEngineResults(engineId: number): Promise<void> {
                                                                              loading.value = true
                                                                              error.value = null
                                                                              try {
                                                                                  const response = await SupportResultAPI.getResultsByEngine(engineId)
                                                                                  const existingIds = new Set(results.value.map(r => r.id))
                                                                                  const newResults = response.data.results.filter(r => !existingIds.has(r.id))
                                                                                  results.value.push(...newResults)

                                                                                  newResults.forEach(result => {
                                                                                      const key = `${result.target_type}-${result.target_id}`  // Fixed
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

                                                                                  const existingIds = new Set(results.value.map(r => r.id))
                                                                                  const newResults = response.data.results.filter(r => !existingIds.has(r.id))
                                                                                  results.value.push(...newResults)

                                                                                  newResults.forEach(result => {
                                                                                      const key = `${result.target_type}-${result.target_id}`  // Fixed
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

                                                                                  results.value = results.value.filter(r => r.support_engine_id !== engineId)
                                                                                  results.value.push(...response.data.results)

                                                                                  currentResults.value.clear()
                                                                                  response.data.results.forEach(result => {
                                                                                      const key = `${result.target_type}-${result.target_id}`  // Fixed
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
                                                                              return results.value.find(r =>
                                                                                                        r.target_type === targetType &&
                                                                                                            r.target_id === targetId
                                                                                                       )
                                                                          }


                                                                          /**
                                                                           * Recalculate a single target result locally (no API call)
                                                                           * This updates the local cache immediately for UI responsiveness
                                                                           */
                                                                          function recalculateTargetResult(
                                                                              targetType: 'inquiry' | 'option',
                                                                              targetId: number,
                                                                              engineId: number,
                                                                              changedSupport: Support
                                                                          ): SupportResultData | null {
                                                                              // Get all supports for this target from the supports store
                                                                              const { supports } = useSupportsStore()

                                                                              const targetSupports = supports.filter(s => {
                                                                                  if (targetType === 'option') {
                                                                                      return s.optionId === targetId
                                                                                  } else {
                                                                                      return s.inquiryId === targetId && s.optionId === 0
                                                                                  }
                                                                              })

                                                                              // Determine result type based on support feature
                                                                              const inquiriesStore = useInquiriesStore()
                                                                              const inquiry = inquiriesStore.byId[changedSupport.inquiryId]
                                                                              const supportFeature = inquiry?.configuration?.supportFeature || 'binary'

                                                                              let resultData: SupportResultData | null = null

                                                                              switch (supportFeature) {
                                                                                  case 'ternary':
                                                                                      resultData = calculateTernaryResultLocal(targetSupports)
                                                                                  break
                                                                                  case 'binary':
                                                                                      resultData = calculateBinaryResultLocal(targetSupports)
                                                                                  break
                                                                                  case 'score':
                                                                                      resultData = calculateScoreResultLocal(targetSupports)
                                                                                  break
                                                                                  default:
                                                                                      resultData = calculateBinaryResultLocal(targetSupports)
                                                                              }

                                                                              if (resultData) {
                                                                                  // Update local cache
                                                                                  const key = `${targetType}-${targetId}`
                                                                                  currentResults.value.set(key, resultData)

                                                                                  // Update or add to results array
                                                                                  const existingIndex = results.value.findIndex(r =>
                                                                                                                                r.target_type === targetType &&
                                                                                                                                    r.target_id === targetId &&
                                                                                                                                    r.support_engine_id === engineId
                                                                                                                               )

                                                                                                                               const newResult: SupportResult = {
                                                                                                                                   id: existingIndex !== -1 ? results.value[existingIndex].id : Date.now(),
                                                                                                                                   support_engine_id: engineId,
                                                                                                                                   target_type: targetType,
                                                                                                                                   target_id: targetId,
                                                                                                                                   result: resultData,
                                                                                                                                   created: Date.now(),
                                                                                                                                   updated: Date.now()
                                                                                                                               }

                                                                                                                               if (existingIndex !== -1) {
                                                                                                                                   results.value[existingIndex] = newResult
                                                                                                                               } else {
                                                                                                                                   results.value.push(newResult)
                                                                                                                               }
                                                                              }

                                                                              return resultData
                                                                          }
                                                                          function getResultByTarget(targetId: number): SupportResult | undefined {
                                                                              return results.value.find(r => r.target_id === targetId)
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

                                                                          function calculateBinaryResultLocal(supports: Support[]): BinaryResult {
                                                                              let yes = 0, no = 0

                                                                              supports.forEach(support => {
                                                                                  const value = extractValueFromSupport(support)
                                                                                  if (value === 1) yes++
                                                                                          else if (value === -1 || value === 0) no++  // 0 = no en binaire
                                                                              })

                                                                                      const total = yes + no
                                                                                      return {
                                                                                          type: 'binary',
                                                                                          totals: { yes, no },
                                                                                          percentages: {
                                                                                              yes: total > 0 ? (yes / total) * 100 : 0,
                                                                                              no: total > 0 ? (no / total) * 100 : 0
                                                                                          }
                                                                                      }
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

                                                                          function calculateScoreResultLocal(supports: Support[]): ScoreResult {
                                                                              let total = 0
                                                                              let sum = 0

                                                                              supports.forEach(support => {
                                                                                  const value = extractValueFromSupport(support)
                                                                                  if (typeof value === 'number') {
                                                                                      total++
                                                                                          sum += value
                                                                                  }
                                                                              })

                                                                              return {
                                                                                  type: 'score',
                                                                                  totals: {
                                                                                      total: total,
                                                                                      average: total > 0 ? sum / total : 0
                                                                                  }
                                                                              }
                                                                          }
                                                                          function needsRecalculation(engineId: number, maxAge: number = 60000): boolean {
                                                                              if (!lastCalculated.value) return true
                                                                                  const engineResults = results.value.filter(r => r.support_engine_id === engineId)
                                                                              if (engineResults.length === 0) return true

                                                                                  const oldestUpdate = Math.min(...engineResults.map(r => r.updated))
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
                                                                              getReactionResult,
                                                                              getApprovalResult,
                                                                              loadEngineResults,
                                                                              loadTargetResults,
                                                                              calculateAndGetResults,
                                                                              loadResultHistory,
                                                                              getResultDisplay,
                                                                              needsRecalculation,
                                                                              reset
                                                                          }
})
