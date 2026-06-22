/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { SupportsAPI, PublicAPI } from '../Api/index.ts'
import { Logger } from '../helpers/index.ts'
import { useSessionStore } from './session.ts'
import { useInquiriesStore } from './inquiries.ts'
import { useSupportEngineStore } from './supportEngine.ts'
import { useOptionsStore } from './options.ts'
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
        s.optionId === support.optionId &&
      s.supportEngineId === support.supportEngineId
    )

    if (index === -1) {
      supports.value.push(support)
    } else {
      supports.value[index] = support
    }
  }

  function removeItem(inquiryId: number, userId: string, optionId: number = 0,   engineId?: number) {
    const index = supports.value.findIndex(
      (s) => s.inquiryId === inquiryId && s.userId === userId && s.optionId === optionId &&
      s.supportEngineId === engineId
    )

    if (index !== -1) {
      supports.value.splice(index, 1)
    }
  }


  function getSupportFeature(item: SupportableItem): SupportFeature {
    return item.configuration?.supportFeature || 'none'
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
    const supportEngineId = activeEngine?.id ?? null
    const effectiveFeature = activeEngine?.engine ?? getSupportFeature(item)

    let result: SupportResultData = null

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
        if (typeof customValue === 'string' || customValue === null) {
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
        if (customValue === undefined) {
          result = await toggleBinarySupport(itemId, userId, item, itemType, supportEngineId)
        } else {
          result = await submitGenericSupport(
            itemId,
            userId,
            item,
            itemType,
            customValue,
            supportEngineId
          )
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
  if ( engineId === null ) {
  if (nextValue === null) {
    item.currentUserStatus.supportValue = null
    item.currentUserStatus.hasSupported = false
  } else {
    item.currentUserStatus.supportValue = nextValue
    item.currentUserStatus.hasSupported = true
  }
  }

  try {
    const { inquiryId, optionId } = resolveIds(itemId, item, itemType)

    if (nextValue === null) {
      await removeSupport(inquiryId, userId, optionId, engineId)
    } else if (oldValue === null) {
       await addSupport(inquiryId, userId, nextValue, optionId, engineId)
    } else {
       await updateSupport(inquiryId, userId, nextValue, optionId, engineId)
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
  if ( engineId === null ) {
      if (shouldRemove ) {
          item.currentUserStatus.supportValue = null
          item.currentUserStatus.hasSupported = false
      } else {
          item.currentUserStatus.supportValue = nextValue
          item.currentUserStatus.hasSupported = true
      }
  }
  try {
      const { inquiryId, optionId } = resolveIds(itemId, item, itemType)

      if (shouldRemove) {
          await removeSupport(inquiryId, userId, optionId, engineId)
      } else if (currentValue === null) {
         await addSupport(inquiryId, userId, nextValue!, optionId, engineId)
      } else {
         await updateSupport(inquiryId, userId, nextValue!, optionId, engineId)
      }

      return nextValue
  } catch (error) {
      // Rollback
  if ( engineId === null ) {
      item.currentUserStatus.supportValue = currentValue
      item.currentUserStatus.hasSupported = oldHasSupported
  }
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
    if ( engineId === null ) {
        if ( grade === null ) {
            item.currentUserStatus.supportValue = null
            item.currentUserStatus.hasSupported = false
        } else {
            item.currentUserStatus.supportValue = grade
            item.currentUserStatus.hasSupported = true
        }
    }

    try {
        const { inquiryId, optionId } = resolveIds(itemId, item, itemType)

        if (grade === null) {
            await removeSupport(inquiryId, userId, optionId,engineId)
            // Update count
        } else if (oldValue === null) {
             await addSupport(inquiryId, userId, grade, optionId, engineId)
        } else {
             await updateSupport(inquiryId, userId, grade, optionId, engineId)
        }

        return grade
    } catch (error) {
        // Rollback
    if ( engineId === null ) {
            item.currentUserStatus.supportValue = oldValue
        item.currentUserStatus.hasSupported = oldHasSupported
    }
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
            return normalizeSupportPrimitive((value as unknown).value)
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

    const oldValue = item.currentUserStatus.supportValue ?? null
    const shouldRemove = value === null

    // Optimistic update
    if ( engineId === null ) {
    if (shouldRemove) {
        item.currentUserStatus.supportValue = null
        item.currentUserStatus.hasSupported = false
    } else {
        item.currentUserStatus.supportValue = value
        item.currentUserStatus.hasSupported = true
    }
    }

    try {
        const { inquiryId, optionId } = resolveIds(itemId, item, itemType)

        if (shouldRemove) {
            await removeSupport(inquiryId, userId, optionId, engineId)
        } else if (oldValue === null) {
             await addSupport(inquiryId, userId, value!, optionId, engineId)
        } else {
             await updateSupport(inquiryId, userId, value!, optionId, engineId)
        }

        return value
    } catch (error) {
        // Rollback
    if ( engineId === null ) {
        item.currentUserStatus.supportValue = oldValue
        item.currentUserStatus.hasSupported = oldValue !== null
    }
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

        const oldReaction = typeof rawCurrent === 'string' ? rawCurrent : null
        const oldHasSupported = oldReaction !== null

        // Optimistic update
        item.currentUserStatus.supportValue = reaction
        item.currentUserStatus.hasSupported = reaction !== null

        try {
            const { inquiryId, optionId } = resolveIds(itemId, item, itemType)

            if (reaction === null) {
                await removeSupport(inquiryId, userId, optionId,engineId)
            } else if (oldReaction === null) {
                 await addSupport(inquiryId, userId, reaction, optionId, engineId)
            } else {
                 await updateSupport(inquiryId, userId, reaction, optionId, engineId)
            }
            return reaction
        } catch (error) {
            // Rollback
        if ( engineId === null ) {
            item.currentUserStatus.supportValue = oldReaction
            item.currentUserStatus.hasSupported = oldHasSupported
        }
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
    if ( engineId === null ) {
        item.currentUserStatus.supportValue = newReactions
        item.currentUserStatus.hasSupported = newReactions.length > 0
    }
    try {
        const { inquiryId, optionId } = resolveIds(itemId, item, itemType)

        if (newReactions.length === 0) {
            await removeSupport(inquiryId, userId, optionId, engineId)
        } else if (oldReactions.length === 0) {
              await addSupport(inquiryId, userId, newReactions, optionId, engineId)
        } else {
             await updateSupport(inquiryId, userId, newReactions, optionId, engineId)
        }

        return newReactions
    } catch (error) {
        // Rollback
        if ( engineId === null ) {
            item.currentUserStatus.supportValue = oldReactions
            item.currentUserStatus.hasSupported = oldHasSupported
        }
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
    if ( engineId === null ) {
    item.currentUserStatus.hasSupported = newHasSupported
    item.currentUserStatus.supportValue = newHasSupported ? 1 : null
    }
    try {
        const { inquiryId, optionId } = resolveIds(itemId, item, itemType)

        if (newHasSupported) {
             await addSupport(inquiryId, userId, 1, optionId, engineId)
        } else {
            await removeSupport(inquiryId, userId, optionId, engineId)
        }

        return newHasSupported
    } catch (error) {
        // Rollback
    if ( engineId === null ) {
        item.currentUserStatus.hasSupported = oldHasSupported
        item.currentUserStatus.supportValue = oldHasSupported ? 1 : null
    }
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

    const newHasSupported = !oldHasSupported


        const { inquiryId, optionId } = resolveIds(itemId, item, itemType)

        if (newHasSupported) {
             await addSupport(inquiryId, userId, 1, optionId)
        } else {
            await removeSupport(inquiryId, userId, optionId,engineId)
        }

        return newHasSupported
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
    if ( engineId === null ) {
    if (rank === null) {
        item.currentUserStatus.supportValue = null
        item.currentUserStatus.hasSupported = false
    } else {
        item.currentUserStatus.supportValue = rank
        item.currentUserStatus.hasSupported = true
    }
    }
    try {
        const { inquiryId, optionId } = resolveIds(itemId, item, itemType)

        if (rank === null) {
            await removeSupport(inquiryId, userId, optionId, engineId)
        } else if (oldRank === null) {
             await addSupport(inquiryId, userId, rank, optionId, engineId)
        } else {
             await updateSupport(inquiryId, userId, rank, optionId, engineId)
        }

        return rank
    } catch (error) {
        // Rollback
    if ( engineId === null ) {
        item.currentUserStatus.supportValue = oldRank
        item.currentUserStatus.hasSupported = oldHasSupported
    }
        throw error
    }
}

function updateItemCount(inquiryId: number, optionId: number, delta: number) {
    const inquiriesStore = useInquiriesStore()
    const optionsStore = useOptionsStore()

    // const inquiry = inquiriesStore.byId[inquiryId]

    if (optionId > 0) {
        // It's an option – update the option in the options store
        const option = optionsStore.options.find(o => o.id === optionId)
        if (option) {
            if (!option.status) option.status = {}
            option.status.countSupports = (option.status.countSupports || 0) + delta
        }
    } else {
        // It's the inquiry itself
        const inquiry = inquiriesStore.byId[inquiryId]
        if (inquiry) {
            if (!inquiry.status) inquiry.status = {}
            inquiry.status.countSupports = (inquiry.status.countSupports || 0) + delta
        }
        // Also update the current inquiry store if it matches
        const currentInquiryStore = useInquiryStore()
        if (currentInquiryStore.id === inquiryId) {
            if (!currentInquiryStore.status) currentInquiryStore.status = {}
            currentInquiryStore.status.countSupports = (currentInquiryStore.status.countSupports || 0) + delta
        }
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


function updateItemResult(
    inquiryId: number,
    optionId: number,
    resultData: SupportResultData | null,
    engineId: number | null = null // deliberative uses null
) {
    const targetType = optionId > 0 ? 'option' : 'inquiry';
    const targetId = optionId > 0 ? optionId : inquiryId;
    const optionsStore = useOptionsStore()
    const inquiriesStore = useInquiriesStore()

    if (targetType === 'option') {
        const option = optionsStore.options.find(o => o.id === targetId);
        if (option) {
            if (!option.status) option.status = {};
            option.status.supportResult = resultData; // single object – fine
        }
        return;
    }

    // --- For inquiries: manage array ---
    const newResult: SupportResult = {
        id: 0, // will be replaced by API response if needed
        support_engine_id: engineId,
        target_type: 'inquiry',
        target_id: targetId,
        result: resultData,
        updated: Date.now(),
    };

    const updateInquiry = (inquiry: Inquiry) => {
        if (!inquiry.status) inquiry.status = {};
        const arr = inquiry.status.supportResult || [];

        // Find existing entry for this engine
        const index = arr.findIndex(r => r.support_engine_id === engineId);

        if (resultData === null) {
            // Remove this engine's result
            if (index >= 0) arr.splice(index, 1);
            inquiry.status.supportResult = arr.length ? arr : null;
        } else {
            if (index >= 0) {
                arr[index] = newResult; // replace
            } else {
                arr.push(newResult);    // append
            }
            inquiry.status.supportResult = arr;
        }
    };

    // Update in the main inquiries store
    const inquiry = inquiriesStore.byId[targetId];
    if (inquiry) updateInquiry(inquiry);

    // Also update the current inquiry store if it's the same
    const currentInquiryStore = useInquiryStore();
    if (currentInquiryStore.id === targetId) {
        updateInquiry(currentInquiryStore);
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
            if (supportEngineId === null ) { 
                updateItemCount(inquiryId, optionId, 1)
                setItem(response.data.support)
                updateItemResult(inquiryId, optionId, response.data.result ?? null, supportEngineId)
            }
           setItem(response.data.support)
           updateItemResult(inquiryId, optionId, response.data.result ?? null, supportEngineId)
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
    const shouldRemove = value === null

    // Optimistic update
        const { inquiryId, optionId } = resolveIds(itemId, item, itemType)
        if (shouldRemove) {
            await removeSupport(inquiryId, userId, optionId, engineId)
        } else if (oldValue === null) {
             await addSupport(inquiryId, userId, value, optionId, engineId)
        } else {
             await updateSupport(inquiryId, userId, value, optionId, engineId)
        }
        return value
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
                updateItemResult(inquiryId, optionId, response.data.result ?? null, supportEngineId)
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
        const response = await (() => {
            if (sessionStore.route.name === 'publicInquiry') {
                return PublicAPI.removeSupport(sessionStore.publicToken, inquiryId, userId, optionId,engineId)
            }
            return SupportsAPI.removeSupport(inquiryId, userId, optionId, engineId)
        })()
        if (response) {
            if (engineId === null ) { 
                updateItemCount(inquiryId, optionId, -1)
            }
            removeItem(inquiryId, userId, optionId,engineId)
            updateItemResult(inquiryId, optionId, response.data.result ?? null, engineId)
            return response
        }


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
    toggleApprovalDeliberativeSupport,
    toggleRankingSupport,
    formatResult,
    loadSupports,
    addSupport,
    updateSupport,
    removeSupport,
    reset,
}
})
