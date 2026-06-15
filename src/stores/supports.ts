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
import { useSupportEngineStore } from './supportEngine.ts'
import { ussOptionsStore } from './options.ts'
import { useInquiryStore } from './inquiry.ts'
import type { AxiosError } from '@nextcloud/axios'
import type {
  Inquiry,
  Option,
  SupportValue,
  SupportFeature,
  SupportEngine,
  SupportResultData,
  BinaryResult,
  TernaryResult,
  ScoreResult,
  CondorcetResult,
  ReactionResult,
  ApprovalResult,
  RankingResult,
  TrendingResult,
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

  const getSupport = computed(
    () =>
      (
        inquiryId: number,
        userId: string,
        optionId: number = 0,
        supportEngineId: number | null = null
      ): Support | undefined =>
        supports.value.find(
          (s) =>
            s.inquiryId === inquiryId &&
            s.userId === userId &&
            s.optionId === optionId &&
            s.supportEngineId === supportEngineId
        )
  )

  const getSupportsByInquiryId = computed(
    () =>
      (inquiryId: number): Support[] =>
        supports.value.filter((s) => s.inquiryId === inquiryId)
  )

  const getOptionSupports = computed(
    () =>
      (inquiryId: number, optionId: number): Support[] =>
        supports.value.filter((s) => s.inquiryId === inquiryId && s.optionId === optionId)
  )

  const getResult = computed(
    () =>
      (targetType: 'inquiry' | 'option', targetId: number): SupportResultData | undefined => {
        const key = `${targetType}-${targetId}`
        return results.value.get(key)
      }
  )

  // Actions
  function setItem(support: Support) {
    const index = supports.value.findIndex(
      (s) =>
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
    const index = supports.value.findIndex(
      (s) => s.inquiryId === inquiryId && s.userId === userId && s.optionId === optionId
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
    let yes = 0
    let no = 0
    let abstain = 0

    supports.forEach((support) => {
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
        abstain: total > 0 ? (abstain / total) * 100 : 0,
      },
    }
  }

  function getSupportFeature(item: SupportableItem): SupportFeature {
    return item.configuration?.supportFeature || 'none'
  }

  function getSupportResultKey(
    itemId: number,
    itemType: 'inquiry' | 'option',
    inquiryId?: number
  ): string {
    if (itemType === 'option' && inquiryId) {
      return `option-${itemId}`
    }
    return `inquiry-${itemId}`
  }

  /**
   * Normalize support value based on support feature type
   * This ensures values are in the correct format for processing
   * @param value
   * @param supportFeature
   */
  function normalizeSupportValue(
    value: SupportValue,
    supportFeature: SupportFeature
  ): SupportValue {
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

      case 'ranking':
      case 'condorcet':
      case 'borda':
        // Rank should be a number (1 = highest)
        if (typeof value === 'number') return value
        if (typeof value === 'string' && !isNaN(Number(value))) return Number(value)
        if (value === null) return null
        return null

      case 'quadratic':
      case 'token_weighted':
      case 'phased_voting':
        // Numeric values (votes, weights)
        if (typeof value === 'number') return value
        if (typeof value === 'string' && !isNaN(Number(value))) return Number(value)
        return null

      case 'reaction':
        // Ensure it's a string or array of strings
        if (typeof value === 'string') return value
        if (Array.isArray(value) && value.every((v) => typeof v === 'string')) return value
        return null

      case 'approval':
        // Ensure it's an array of numbers
        if (Array.isArray(value)) {
          return value.map((v) => (typeof v === 'string' ? Number(v) : v))
        }
        return []

      case 'approval_delib':
        if (value === 1 || value === '1' || value === true) {
          return 1
        }
        return null

      case 'trending':
        // No user input for trending
        return null

      case 'majority_judgment':
        // Grade should be a string
        if (typeof value === 'string') return value
        if (typeof value === 'number') return String(value)
        if (value && typeof value === 'object' && 'grade' in value) {
          return String((value as any).grade)
        }
        if (value && typeof value === 'object' && 'value' in value) {
          return String((value as any).value)
        }
        return null

      default:
        return value
    }
  }
  /**
   * Main toggle support handler - routes to appropriate handler based on support feature
   * @param inquiryId
   * @param itemId
   * @param userId
   * @param item
   * @param itemType
   * @param customValue
   */
  async function toggleSupport(
    inquiryId: number,
    itemId: number,
    userId: string,
    item: SupportableItem,
    itemType: 'inquiry' | 'option',
    customValue?: SupportValue
  ) {
    // Get active engine
    const engineStore = useSupportEngineStore()
    const activeEngine = engineStore.getCurrentEngine()
    console.log(' ACTIVE ENGINE ', activeEngine)
    const supportEngineId = activeEngine?.id ?? null
    const effectiveFeature = activeEngine?.engine ?? getSupportFeature(item)
    console.log(' EFFECTIVE FEATURE ', effectiveFeature)
    console.log(' CUSTOM VALUE ', customValue)

    let result: any = null

    switch (effectiveFeature) {
      // === Deliberative simple toggles (cycling) ===
      case 'binary':
        result = await toggleBinarySupport(itemId, userId, item, itemType, supportEngineId)
        break

      case 'ternary':
        result = await toggleTernarySupport(itemId, userId, item, itemType, supportEngineId)
        break

      case 'star':
      case 'score':
        if (customValue !== undefined) {
          result = await submitScoreSupport(
            itemId,
            userId,
            item,
            itemType,
            customValue,
            supportEngineId
          )
        }
        break

      case 'reaction':
        if (typeof customValue === 'string') {
          result = await toggleReactionSupport(
            itemId,
            userId,
            item,
            itemType,
            customValue,
            supportEngineId
          )
        }
        break

      case 'majority_judgment':
        if (typeof customValue === 'string' || customValue === null) {
          result = await toggleMajorityJudgmentSupport(
            itemId,
            userId,
            item,
            itemType,
            customValue as string | null,
            supportEngineId
          )
        }
        break

      case 'approval_delib':
        result = await toggleApprovalDeliberativeSupport(
          itemId,
          userId,
          item,
          itemType,
          supportEngineId
        )
        break

      // === Complex voting engines (no cycling, just submit the value) ===
      case 'approval':
      case 'ranking':
      case 'condorcet':
      case 'borda':
        if (customValue !== undefined) {
          result = await submitComplexSupport(supportEngineId, userId, customValue, inquiryId)
        }
        break

      case 'quadratic':
      case 'token_weighted':
      case 'phased_voting':
        if (customValue !== undefined) {
          result = await submitComplexSupport(supportEngineId, userId, customValue, inquiryId)
        }
        break

      // === Trending (auto‑calculated, no user action) ===
      case 'trending':
        return null

      case 'none':
        return null

      default:
        // Unknown engine – treat as generic if value provided
        if (customValue !== undefined) {
          result = await submitGenericSupport(
            itemId,
            userId,
            item,
            itemType,
            customValue,
            supportEngineId
          )
        } else {
          result = await toggleBinarySupport(itemId, userId, item, itemType, supportEngineId)
        }
    }

    return result
  }
  /**
   * Binary support (Simple Yes/No)
   * @param itemId
   * @param userId
   * @param item
   * @param itemType
   * @param engineId
   */
  async function toggleBinarySupport(
  itemId: number,
  userId: string,
  item: SupportableItem,
  itemType: 'inquiry' | 'option',
  engineId: number | null = null
) {
  if (!item.currentUserStatus) item.currentUserStatus = {}

  const rawCurrent = normalizeSupportPrimitive(item.currentUserStatus.supportValue ?? null)
  const currentValue = typeof rawCurrent === 'number' ? rawCurrent : null

  let nextValue: number | null = null
  if (currentValue === null) nextValue = 1
  else if (currentValue === 1) nextValue = -1
  else if (currentValue === -1) nextValue = null

  const oldValue = currentValue
  const oldHasSupported = item.currentUserStatus.hasSupported ?? false

  // Optimistic update
  if (nextValue === null) {
    item.currentUserStatus.supportValue = null
    item.currentUserStatus.hasSupported = false
    if (item.status) {
      item.status.countSupports = Math.max(0, (item.status.countSupports || 0) - 1)
    }
  } else {
    item.currentUserStatus.supportValue = nextValue
    item.currentUserStatus.hasSupported = true
    if (item.status && oldValue === null) {
      item.status.countSupports = (item.status.countSupports || 0) + 1
    }
  }

  try {
    const { inquiryId, optionId } = resolveIds(itemId, item, itemType)

    if (nextValue === null) {
      await removeSupport(inquiryId, userId, optionId, engineId)
    } else if (oldValue === null) {
      const result = await addSupport(inquiryId, userId, nextValue, optionId, engineId)
      updateResultFromSupport(result, inquiryId, optionId, engineId)
    } else {
      const result = await updateSupport(inquiryId, userId, nextValue, optionId, engineId)
      updateResultFromSupport(result, inquiryId, optionId, engineId)
    }

    return nextValue
  } catch (error) {
    // Rollback
    item.currentUserStatus.supportValue = oldValue
    item.currentUserStatus.hasSupported = oldHasSupported
    throw error
  }
}


  /**
   * Ternary support (For/Abstain/Against)
   * @param itemId
   * @param userId
   * @param item
   * @param itemType
   * @param engineId
   */
    async function toggleTernarySupport(
  itemId: number,
  userId: string,
  item: SupportableItem,
  itemType: 'inquiry' | 'option',
  engineId: number | null = null
) {
  if (!item.currentUserStatus) item.currentUserStatus = {}

  const rawCurrent = normalizeSupportPrimitive(item.currentUserStatus.supportValue ?? null)
  const currentValue = typeof rawCurrent === 'number' ? rawCurrent : null
  const oldHasSupported = item.currentUserStatus.hasSupported ?? false

  let nextValue: number | null = null
  let shouldRemove = false
  let firstSupport = false

  if (currentValue === null) {
    firstSupport = true
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
    if (item.status) {
      item.status.countSupports = Math.max(0, (item.status.countSupports || 0) - 1)
    }
  } else {
    item.currentUserStatus.supportValue = nextValue
    item.currentUserStatus.hasSupported = true
    if (firstSupport && item.status) {
      item.status.countSupports = (item.status.countSupports || 0) + 1
    }
  }

  try {
    const { inquiryId, optionId } = resolveIds(itemId, item, itemType)

    if (shouldRemove) {
      await removeSupport(inquiryId, userId, optionId, engineId)
    } else if (currentValue === null) {
      const result = await addSupport(inquiryId, userId, nextValue!, optionId, engineId)
      updateResultFromSupport(result, inquiryId, optionId, engineId)
    } else {
      const result = await updateSupport(inquiryId, userId, nextValue!, optionId, engineId)
      updateResultFromSupport(result, inquiryId, optionId, engineId)
    }

    return nextValue
  } catch (error) {
    // Rollback
    item.currentUserStatus.supportValue = currentValue
    item.currentUserStatus.hasSupported = oldHasSupported
    throw error
  }
}

  /**
   * Majority Judgment support (Grade-based voting)
   * Each option gets a grade like "Excellent", "Good", "Fair", "Poor"
   * @param itemId
   * @param userId
   * @param item
   * @param itemType
   * @param grade
   * @param engineId
   */
  async function toggleMajorityJudgmentSupport(
    itemId: number,
    userId: string,
    item: SupportableItem,
    itemType: 'inquiry' | 'option',
    grade: string | null,
    engineId: number | null = null
  ) {
    if (!item.currentUserStatus) item.currentUserStatus = {}

    const oldValue = item.currentUserStatus.supportValue as string | null
    const oldHasSupported = item.currentUserStatus.hasSupported ?? false

    // Optimistic update
    if (grade === null) {
      item.currentUserStatus.supportValue = null
      item.currentUserStatus.hasSupported = false
    } else {
      item.currentUserStatus.supportValue = grade
      item.currentUserStatus.hasSupported = true
    }

    try {
      const { inquiryId, optionId } = resolveIds(itemId, item, itemType)

      if (grade === null) {
        await removeSupport(inquiryId, userId, optionId)
        // Update count
        if (item.status && oldHasSupported) {
          item.status.countSupports = Math.max(0, (item.status.countSupports || 0) - 1)
        }
      } else if (oldValue === null) {
        const result = await addSupport(inquiryId, userId, grade, optionId, engineId)
        updateResultFromSupport(result, inquiryId, optionId, engineId)
        if (item.status) {
          item.status.countSupports = (item.status.countSupports || 0) + 1
        }
      } else {
        const result = await updateSupport(inquiryId, userId, grade, optionId, engineId)
        updateResultFromSupport(result, inquiryId, optionId, engineId)
      }

      return grade
    } catch (error) {
      // Rollback
      item.currentUserStatus.supportValue = oldValue
      item.currentUserStatus.hasSupported = oldHasSupported
      throw error
    }
  }

  function normalizeSupportPrimitive(value: SupportValue): SupportValue {
    if (value === null || value === undefined) return null

    // Parse JSON string
    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value)
        if (parsed && typeof parsed === 'object') {
          if ('value' in parsed) return normalizeSupportPrimitive(parsed.value)
          return parsed
        }
        const num = Number(value)
        if (!isNaN(num)) return num
        return value
      } catch {
        return value
      }
    }

    if (typeof value === 'object' && value !== null && 'value' in value) {
      return normalizeSupportPrimitive((value as any).value)
    }

    return value
  }

  /**
   * Score/Star support (Rating 1-5 or 0-10)
   * @param itemId
   * @param userId
   * @param item
   * @param itemType
   * @param value
   * @param engineId
   */
  async function submitScoreSupport(
    itemId: number,
    userId: string,
    item: SupportableItem,
    itemType: 'inquiry' | 'option',
    value: number | string | null,
    engineId: number | null = null
  ) {
    if (!item.currentUserStatus) item.currentUserStatus = {}

    const supportFeature = getSupportFeature(item)
    const oldValue = item.currentUserStatus.supportValue ?? null
    const shouldRemove = value === null

    // Optimistic update
    if (shouldRemove) {
      item.currentUserStatus.supportValue = null
      item.currentUserStatus.hasSupported = false
    } else {
      item.currentUserStatus.supportValue = value
      item.currentUserStatus.hasSupported = true
    }

    try {
      const { inquiryId, optionId } = resolveIds(itemId, item, itemType)

      if (shouldRemove) {
        await removeSupport(inquiryId, userId, optionId, engineId)
      } else if (oldValue === null) {
        const result = await addSupport(inquiryId, userId, value!, optionId, engineId)
        updateResultFromSupport(result, inquiryId, optionId, engineId)
      } else {
        const result = await updateSupport(inquiryId, userId, value!, optionId, engineId)
        updateResultFromSupport(result, inquiryId, optionId, engineId)
      }

      return value
    } catch (error) {
      // Rollback
      item.currentUserStatus.supportValue = oldValue
      item.currentUserStatus.hasSupported = oldValue !== null
      throw error
    }
  }
  /**
   * Reaction support (Emoji reactions)
   * @param itemId
   * @param userId
   * @param item
   * @param itemType
   * @param reaction
   * @param engineId
   */
    async function toggleReactionSupport(
  itemId: number,
  userId: string,
  item: SupportableItem,
  itemType: 'inquiry' | 'option',
  reaction: string,
  engineId: number | null = null
) {
  if (!item.currentUserStatus) item.currentUserStatus = {}

  const rawCurrent = normalizeSupportPrimitive(item.currentUserStatus.supportValue ?? null)
  
  // Deliberative mode: single string
  if (engineId === null) {
    const currentReaction = typeof rawCurrent === 'string' ? rawCurrent : null
    const newReaction = currentReaction === reaction ? null : reaction
    const oldReaction = currentReaction
    const oldHasSupported = oldReaction !== null

    // Optimistic update
    item.currentUserStatus.supportValue = newReaction
    item.currentUserStatus.hasSupported = newReaction !== null

    try {
      const { inquiryId, optionId } = resolveIds(itemId, item, itemType)

      if (newReaction === null) {
        await removeSupport(inquiryId, userId, optionId)
      } else if (oldReaction === null) {
        const result = await addSupport(inquiryId, userId, newReaction, optionId, engineId)
        updateResultFromSupport(result, inquiryId, optionId, engineId)
      } else {
        const result = await updateSupport(inquiryId, userId, newReaction, optionId, engineId)
        updateResultFromSupport(result, inquiryId, optionId, engineId)
      }
      return newReaction
    } catch (error) {
      // Rollback
      item.currentUserStatus.supportValue = oldReaction
      item.currentUserStatus.hasSupported = oldHasSupported
      throw error
    }
  }

  // Engine mode: array of reactions (existing code, unchanged)
  let currentReactions: string[] = []
  if (Array.isArray(rawCurrent)) {
    currentReactions = rawCurrent as string[]
  } else if (typeof rawCurrent === 'string') {
    currentReactions = [rawCurrent]
  }

  const hasReacted = currentReactions.includes(reaction)
  let newReactions: string[]
  if (hasReacted) {
    newReactions = currentReactions.filter((r) => r !== reaction)
  } else {
    newReactions = [...currentReactions, reaction]
  }

  const oldReactions = currentReactions
  const oldHasSupported = oldReactions.length > 0

  // Optimistic update
  item.currentUserStatus.supportValue = newReactions
  item.currentUserStatus.hasSupported = newReactions.length > 0

  try {
    const { inquiryId, optionId } = resolveIds(itemId, item, itemType)

    if (newReactions.length === 0) {
      await removeSupport(inquiryId, userId, optionId, engineId)
    } else if (oldReactions.length === 0) {
      const result = await addSupport(inquiryId, userId, newReactions, optionId, engineId)
      updateResultFromSupport(result, inquiryId, optionId, engineId)
    } else {
      const result = await updateSupport(inquiryId, userId, newReactions, optionId, engineId)
      updateResultFromSupport(result, inquiryId, optionId, engineId)
    }

    return newReactions
  } catch (error) {
    // Rollback
    item.currentUserStatus.supportValue = oldReactions
    item.currentUserStatus.hasSupported = oldHasSupported
    throw error
  }
}

  async function submitComplexSupport(
    engineId: number,
    userId: string,
    value: SupportValue,
    inquiryId: number
  ): Promise<Support | null> {
    const optionId = 0 // engine‑wide support
    const currentSupport = getSupport.value(inquiryId, userId, optionId, engineId)

    const isEmpty =
      value === null ||
      (Array.isArray(value) && value.length === 0) ||
      (typeof value === 'object' && value !== null && Object.keys(value).length === 0)

    if (isEmpty) {
      if (currentSupport) {
        await removeSupport(inquiryId, userId, optionId, engineId)
      }
      return null
    }

    if (!currentSupport) {
      return await addSupport(inquiryId, userId, value, optionId, engineId)
    }
    return await updateSupport(inquiryId, userId, value, optionId, engineId)
  }

  /**
   * Approval Deliberative support (Simple Yes/No approval for deliberative phase)
   * In deliberative mode, each user can either approve (1) or not (null)
   * @param itemId
   * @param userId
   * @param item
   * @param itemType
   * @param engineId
   */
  async function toggleApprovalDeliberativeSupport(
    itemId: number,
    userId: string,
    item: SupportableItem,
    itemType: 'inquiry' | 'option',
    engineId: number | null = null
  ) {
    if (!item.currentUserStatus) item.currentUserStatus = {}

    const oldHasSupported = item.currentUserStatus.hasSupported ?? false
    const newHasSupported = !oldHasSupported

    // Optimistic update
    item.currentUserStatus.hasSupported = newHasSupported
    item.currentUserStatus.supportValue = newHasSupported ? 1 : null

    try {
      const { inquiryId, optionId } = resolveIds(itemId, item, itemType)

      if (newHasSupported) {
        const result = await addSupport(inquiryId, userId, 1, optionId, engineId)
        updateResultFromSupport(result, inquiryId, optionId, engineId)
        if (item.status) {
          item.status.countSupports = (item.status.countSupports || 0) + 1
        }
      } else {
        await removeSupport(inquiryId, userId, optionId, engineId)
        if (item.status) {
          item.status.countSupports = Math.max(0, (item.status.countSupports || 0) - 1)
        }
      }

      return newHasSupported
    } catch (error) {
      // Rollback
      item.currentUserStatus.hasSupported = oldHasSupported
      item.currentUserStatus.supportValue = oldHasSupported ? 1 : null
      throw error
    }
  }

  /**
   * Approval support (Multi-select approval)
   * @param itemId
   * @param userId
   * @param item
   * @param itemType
   * @param engineId
   */
  async function toggleApprovalSupport(
    itemId: number,
    userId: string,
    item: SupportableItem,
    itemType: 'inquiry' | 'option',
    engineId: number | null = null
  ) {
    if (!item.currentUserStatus) item.currentUserStatus = {}

    const oldHasSupported = item.currentUserStatus.hasSupported ?? false
    const newHasSupported = !oldHasSupported

    // Optimistic update
    item.currentUserStatus.hasSupported = newHasSupported
    item.currentUserStatus.supportValue = newHasSupported ? 1 : null

    try {
      const { inquiryId, optionId } = resolveIds(itemId, item, itemType)

      if (newHasSupported) {
        const result = await addSupport(inquiryId, userId, 1, optionId)
        updateResultFromSupport(result, inquiryId, optionId)
        if (item.status) {
          item.status.countSupports = (item.status.countSupports || 0) + 1
        }
      } else {
        await removeSupport(inquiryId, userId, optionId)
        if (item.status) {
          item.status.countSupports = Math.max(0, (item.status.countSupports || 0) - 1)
        }
      }

      return newHasSupported
    } catch (error) {
      // Rollback
      item.currentUserStatus.hasSupported = oldHasSupported
      item.currentUserStatus.supportValue = oldHasSupported ? 1 : null
      throw error
    }
  }

  /**
   * Ranking support (per‑option rank number)
   * Each option gets a rank number (1 = highest preference)
   * @param itemId
   * @param userId
   * @param item
   * @param itemType
   * @param rank
   * @param engineId
   */
  async function toggleRankingSupport(
    itemId: number,
    userId: string,
    item: SupportableItem,
    itemType: 'inquiry' | 'option',
    rank: number | null,
    engineId: number | null = null
  ) {
    if (!item.currentUserStatus) item.currentUserStatus = {}

    const oldRank = item.currentUserStatus.supportValue as number | null
    const oldHasSupported = item.currentUserStatus.hasSupported ?? false

    // Optimistic update
    if (rank === null) {
      item.currentUserStatus.supportValue = null
      item.currentUserStatus.hasSupported = false
    } else {
      item.currentUserStatus.supportValue = rank
      item.currentUserStatus.hasSupported = true
    }

    try {
      const { inquiryId, optionId } = resolveIds(itemId, item, itemType)

      if (rank === null) {
        await removeSupport(inquiryId, userId, optionId, engineId)
        if (item.status && oldHasSupported) {
          item.status.countSupports = Math.max(0, (item.status.countSupports || 0) - 1)
        }
      } else if (oldRank === null) {
        const result = await addSupport(inquiryId, userId, rank, optionId, engineId)
        updateResultFromSupport(result, inquiryId, optionId, engineId)
        if (item.status) {
          item.status.countSupports = (item.status.countSupports || 0) + 1
        }
      } else {
        const result = await updateSupport(inquiryId, userId, rank, optionId, engineId)
        updateResultFromSupport(result, inquiryId, optionId, engineId)
      }

      return rank
    } catch (error) {
      // Rollback
      item.currentUserStatus.supportValue = oldRank
      item.currentUserStatus.hasSupported = oldHasSupported
      throw error
    }
  }

  /**
   * Resolve inquiryId and optionId based on item type
   * @param itemId
   * @param item
   * @param itemType
   */
  function resolveIds(
    itemId: number,
    item: SupportableItem,
    itemType: 'inquiry' | 'option'
  ): { inquiryId: number; optionId: number } {
    if (itemType === 'option') {
      const option = item as Option
      return {
        inquiryId: option.targetId || itemId,
        optionId: itemId,
      }
    }
    return {
      inquiryId: itemId,
      optionId: 0,
    }
  }

  /**
   * Update result based on support change
   * @param support
   * @param inquiryId
   * @param optionId
   * @param supportEngineId
   */
  function updateResultFromSupport(
    support: Support,
    inquiryId: number,
    optionId: number,
    supportEngineId?: number
  ) {
    const targetType = optionId > 0 ? 'option' : 'inquiry'
    const targetId = optionId > 0 ? optionId : inquiryId

    // Only fetch and update calculated results
    const supportResultStore = useSupportResultStore()
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
  }

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
          icon: r.percentages.yes >= 50 ? 'thumb-up' : 'thumb-down',
        }
      }
      case 'ternary': {
        const r = result as TernaryResult
        return {
          primary: `${Math.round(r.percentages.yes)}%`,
          secondary: `${r.totals.yes}F / ${r.totals.abstain}A / ${r.totals.no}N`,
          icon: 'poll',
        }
      }
      case 'score': {
        const r = result as ScoreResult
        return {
          primary: r.totals.average.toFixed(1),
          secondary: `${r.totals.total} total votes`,
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
          secondary: `approvals`,
          icon: 'check-all',
        }
      }
      case 'approval_delib': {
        const r = result as {
          totals: { approved: number; total: number }
          percentages: { approved: number }
        }
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
        // Display the number of ranked options or the best rank, etc.
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
      default:
        return {
          primary: 'N/A',
          secondary: '',
          icon: 'help',
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
          return SupportsAPI.getByInquiryId(inquiryId)
        }
        return null
      })()

      if (response) {
        // Normalize support values based on inquiry type
        const normalizedSupports = response.data.supports.map(
          (support: Support) =>
            // You might need to get the inquiry type here
            // For now, just pass through
            support
        )
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

  async function addSupport(
    inquiryId: number,
    userId: string,
    value: SupportValue,
    optionId: number = 0,
    supportEngineId?: number
  ): Promise<Support> {
    const sessionStore = useSessionStore()

    try {
      const response = await (() => {
        if (sessionStore.route.name === 'publicInquiry') {
          return PublicAPI.addSupport(sessionStore.publicToken, inquiryId, userId, optionId, {
            value,
            weight: 1,
            engineId: supportEngineId,
          })
        }
        return SupportsAPI.addSupport(inquiryId, userId, optionId, {
          value,
          weight: 1,
          engineId: supportEngineId,
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

  /**
   * Generic support submission for complex engines.
   * Adds/updates a support with the given value (no cycling).
   * @param itemId
   * @param userId
   * @param item
   * @param itemType
   * @param value
   * @param engineId
   */
  async function submitGenericSupport(
    itemId: number,
    userId: string,
    item: SupportableItem,
    itemType: 'inquiry' | 'option',
    value: SupportValue,
    engineId: number | null = null
  ) {
    if (!item.currentUserStatus) item.currentUserStatus = {}
    const oldValue = item.currentUserStatus.supportValue ?? null
    const shouldRemove = value === null

    // Optimistic update
    if (shouldRemove) {
      item.currentUserStatus.supportValue = null
      item.currentUserStatus.hasSupported = false
      if (item.status && oldValue !== null) {
        item.status.countSupports = Math.max(0, (item.status.countSupports || 0) - 1)
      }
    } else {
      item.currentUserStatus.supportValue = value
      item.currentUserStatus.hasSupported = true
      if (item.status && oldValue === null) {
        item.status.countSupports = (item.status.countSupports || 0) + 1
      }
    }

    try {
      const { inquiryId, optionId } = resolveIds(itemId, item, itemType)
      if (shouldRemove) {
        await removeSupport(inquiryId, userId, optionId, engineId)
      } else if (oldValue === null) {
        const result = await addSupport(inquiryId, userId, value, optionId, engineId)
        updateResultFromSupport(result, inquiryId, optionId, engineId)
      } else {
        const result = await updateSupport(inquiryId, userId, value, optionId, engineId)
        updateResultFromSupport(result, inquiryId, optionId, engineId)
      }
      return value
    } catch (error) {
      // Rollback
      item.currentUserStatus.supportValue = oldValue
      item.currentUserStatus.hasSupported = oldValue !== null
      throw error
    }
  }

  async function updateSupport(
    inquiryId: number,
    userId: string,
    value: SupportValue,
    optionId: number = 0,
    supportEngineId?: number
  ): Promise<Support> {
    const sessionStore = useSessionStore()

    try {
      const response = await (() => {
        if (sessionStore.route.name === 'publicInquiry') {
          return PublicAPI.updateSupport(
            sessionStore.publicToken,
            inquiryId,
            userId,
            value,
            optionId,
            { value, weight: 1, engineId: supportEngineId }
          )
        }
        return SupportsAPI.updateSupport(inquiryId, userId, optionId, {
          value,
          weight: 1,
          engineId: supportEngineId,
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

  async function removeSupport(
    inquiryId: number,
    userId: string,
    optionId: number = 0,
    engineId?: number
  ): Promise<void> {
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
    toggleRankingSupport,
    formatResult,
    loadSupports,
    addSupport,
    updateSupport,
    removeSupport,
    reset,
  }
})
