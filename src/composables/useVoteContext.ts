/**
 * SPDX-FileCopyrightText: 2025 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * Aligned with the four-case spec for agora_supports:
 *
 *   Case 1 (deliberative, inquiry)  : supportEngineId = NULL, inquiryId > 0, optionId = 0
 *   Case 2 (deliberative, option)   : supportEngineId = NULL, inquiryId > 0, optionId > 0
 *   Case 3 (engine, option ballot)  : supportEngineId = N,    inquiryId > 0, optionId = 0,
 *                                     engine.inquiry_id === inquiryId, engine.inquiry_group_id = 0,
 *                                     value = { scores|reactions|ranking|grades|selected, ... }
 *   Case 4 (engine, inquiry ballot) : supportEngineId = N,    inquiryId = 0, optionId = 0,
 *                                     engine.inquiry_id = 0, engine.inquiry_group_id > 0,
 *                                     value = { scores|reactions|ranking|grades|selected, ... }
 *
 * `Support.supportEngineId` is nullable; we normalise to `number | null`.
 */

import { t } from '@nextcloud/l10n'
import { computed, ref, watch, onMounted, isRef, type ComputedRef, type Ref } from 'vue'
import { useSupportEngineStore } from '../stores/supportEngine'
import { useSupportsStore } from '../stores/supports'
import { useOptionsStore } from '../stores/options'
import { useSessionStore } from '../stores/session'
import { useInquiryStore } from '../stores/inquiry'
import { useInquiriesStore } from '../stores/inquiries'
import { useInquiryGroupsStore } from '../stores/inquiryGroups'
import { useSupportResultStore } from '../stores/supportResult'
import { SupportsAPI } from '../Api/index.ts'
import type { SupportResultData, Support } from './index.ts'
import type { SupportEngine, SupportValue } from '../Types/index'
import type { TargetType, VotableItem } from '../Types/voteContext.types'

/** Accept a raw value, a Ref, or a getter — all reactive. */
type MaybeRefOrGetter<T> = T | Ref<T> | (() => T)
const unwrap = <T>(v: MaybeRefOrGetter<T>): T => {
  if (typeof v === 'function') return (v as () => T)()
  if (isRef(v)) return v.value
  return v
}

export interface VoteContext {
  loadingEngines: Ref<boolean>
  availableEngines: ComputedRef<SupportEngine[]>
  selectedEngineId: Ref<number | null>
  currentEngine: ComputedRef<SupportEngine | null>
  votableItems: ComputedRef<VotableItem[]>
  hasActiveEngine: ComputedRef<boolean>

  rankings: Ref<Record<number, number>>
  scores: Ref<Record<number, number>>
  grades: Ref<Record<number, string | null>>
  reactions: Ref<Record<number, string[] | null>>
  quadraticVotes: Ref<Record<number, number>>
  tokenWeights: Ref<Record<number, number>>
  selectedItems: Ref<Set<number>>
  hasUserVoted: ComputedRef<boolean>
  hasSelectionsChanged: ComputedRef<boolean>
  canVote: ComputedRef<boolean>
  canSubmitMultiVote: ComputedRef<boolean>
  voteSelectionInfo: ComputedRef<string | null>
  isEngineMulti: ComputedRef<boolean>

  totalVotes: ComputedRef<number>
  getItemVoteCount: (itemId: number) => number
  getPercentage: (item: { id: number }, total?: number) => number
  getRankedItems: (items: VotableItem[]) => VotableItem[]
  getWinner: (items: VotableItem[]) => VotableItem | null
  getWinnerPercentage: (items: VotableItem[]) => number
  getUserVoteValueForItem: (itemId: number) => SupportValue | null
  getItemRank: (itemId: number) => number | null

  effectiveEngineId: ComputedRef<string>
  maxRank: ComputedRef<number>
  scoreMin: ComputedRef<number>
  scoreMax: ComputedRef<number>

  selectEngine: (engineId: number) => void
  refreshEngines: () => Promise<void>
  toggleSelection: (itemId: number) => void
  updateRanking: (itemId: number, rank: number | null) => void
  updateScore: (itemId: number, score: number | null) => void
  updateGrade: (itemId: number, grade: string | null) => void
  updateReaction: (itemId: number, reaction: string[] | null) => void
  updateQuadratic: (itemId: number, votes: number | null) => void
  updateTokenWeight: (itemId: number, weight: number | null) => void
  submitSingleVote: (parentId: number, item: VotableItem, value: SupportValue) => Promise<boolean>
  submitMultiVote: (reload?: boolean) => Promise<boolean>
  removeMyVote: (reload?: boolean) => Promise<boolean>
  loadUserVotesForEngine: (engineId: number) => void
  resetSelections: () => void
  hasUserVotedFor: (itemId: number) => boolean
  isSelectedForVote: (itemId: number) => boolean
}

const SINGLE_VOTE_ENGINES = [
  'binary',
  'ternary',
  'score',
  'star',
  'majority_judgment',
  'reaction',
  'approval_delib',
]

const PER_OPTION_RESULT_ENGINES = [
  'binary',
  'ternary',
  'score',
  'star',
  'majority_judgment',
  'reaction',
]

const POINT_BASED_ENGINES = ['borda', 'condorcet']

// ---------------------------------------------------------------------------
// Module‑level payload helpers (no composable state required)
// ---------------------------------------------------------------------------

/** Normalise the nullable-ish raw value that the backend returns. */
function parsePayload(raw: SupportValue): unknown {
  let value: unknown = raw
  if (typeof value === 'string') {
    try {
      value = JSON.parse(value)
    } catch {
      /* keep string */
    }
  }
  return value
}

/**
 * Unwrap a simple (Case 1 / Case 2) value: `{"value": N}` → `N`.
 * Returns the input unchanged if it is a structured engine payload
 * (`scores` / `reactions` / `ranking` / `grades` / `selected`).
 */
function unwrapVoteValue(raw: SupportValue): SupportValue | null {
  const parsed = parsePayload(raw)
  if (parsed === null || parsed === undefined) return null
  if (typeof parsed !== 'object') return parsed as SupportValue
  if (Array.isArray(parsed)) return parsed as string[]

  const obj = parsed as Record<string, unknown>
  const hasAggregateField =
    'scores' in obj || 'reactions' in obj || 'ranking' in obj || 'grades' in obj || 'selected' in obj
  if (hasAggregateField) {
    // Structured engine payload, not a simple wrapper.
    return parsed as SupportValue
  }
  if ('value' in obj) {
    return (obj.value as SupportValue) ?? null
  }
  return null
}

/**
 * Extract the per‑item value from an aggregate (Case 3 / Case 4) payload.
 * Returns `null` if the payload is not a structured aggregate or the item
 * is not present.
 */
function lookupFromAggregate(raw: SupportValue, itemId: number): SupportValue | null {
  const parsed = parsePayload(raw)
  if (parsed === null || parsed === undefined) return null
  if (typeof parsed !== 'object' || Array.isArray(parsed)) return null

  const val = parsed as Record<string, unknown>

  // Defensive: some backends wrap even aggregates as { value: { scores: ... } }
  const payload =
    'value' in val && !('scores' in val) && !('reactions' in val) && !('ranking' in val)
      && !('grades' in val) && !('selected' in val) && val.value
      && typeof val.value === 'object'
      ? (val.value as Record<string, unknown>)
      : val

  if (payload.scores && typeof payload.scores === 'object') {
    const v = (payload.scores as Record<number, SupportValue>)[itemId]
    if (v !== undefined) return v
  }
  if (payload.reactions && typeof payload.reactions === 'object') {
    const v = (payload.reactions as Record<number, SupportValue>)[itemId]
    if (v !== undefined) return v
  }
  if (payload.ranking && typeof payload.ranking === 'object') {
    const v = (payload.ranking as Record<number, SupportValue>)[itemId]
    if (v !== undefined) return v
  }
  if (payload.grades && typeof payload.grades === 'object') {
    const v = (payload.grades as Record<number, SupportValue>)[itemId]
    if (v !== undefined) return v
  }
  if (Array.isArray(payload.selected)) {
    return (payload.selected as number[]).includes(itemId) ? 1 : null
  }

  // Fallback: simple wrapper
  if ('value' in val && !payload.scores && !payload.reactions && !payload.ranking
      && !payload.grades && !payload.selected) {
    return (val.value as SupportValue) ?? null
  }
  return null
}

/** Normalise Support.supportEngineId (backend returns null; TS type is number|undefined). */
const engineIdOf = (s: Support): number | null => s.supportEngineId ?? null

// ---------------------------------------------------------------------------

export function useVoteContext(
  parentIdInput: MaybeRefOrGetter<number | null>,
  targetType: TargetType,
  engineId?: number,
  fallbackItems?: MaybeRefOrGetter<Array<{ id: number; title?: string }>>
): VoteContext {
  const engineStore = useSupportEngineStore()
  const supportsStore = useSupportsStore()
  const optionsStore = useOptionsStore()
  const sessionStore = useSessionStore()
  const inquiryStore = useInquiryStore()
  const inquiriesStore = useInquiriesStore()
  const inquiryGroupsStore = useInquiryGroupsStore()
  const resultStore = useSupportResultStore()

  /** Fully reactive parent id.
   *  - targetType = 'option'  → parent is the inquiry id
   *  - targetType = 'inquiry' → parent is the inquiry-group id
   */
  const parentId = computed<number | null>(() => unwrap(parentIdInput))

  // ---------- Engine management ----------
  const loadingEngines = ref(false)
  watch(
    () => engineStore.loading,
    (v) => {
      loadingEngines.value = v
    },
    { immediate: true }
  )

  const selectedEngineId = ref<number | null>(engineId ?? null)

  /**
   * Engine scoping:
   *   targetType = 'option'  → engines on the inquiry      (inquiry_id)
   *   targetType = 'inquiry' → engines on the inquiry group (inquiry_group_id)
   */
  const availableEngines = computed<SupportEngine[]>(() => {
    const pid = parentId.value
    if (!pid) return []
    if (targetType === 'option') return engineStore.getEnginesByInquiry(pid)
    return engineStore.getEnginesByInquiryGroup(pid)
  })

  const currentEngine = computed<SupportEngine | null>(() => {
    const engines = availableEngines.value
    if (engineId !== undefined) {
      return engines.find((e) => e.id === engineId) ?? null
    }
    if (!engines.length) return null
    if (selectedEngineId.value) {
      const found = engines.find((e) => e.id === selectedEngineId.value)
      if (found) return found
    }
    return engines.find((e) => e.status === 'active') ?? engines[0] ?? null
  })

  watch(
    currentEngine,
    (engine) => {
      if (engine) engineStore.setCurrentEngine(engine)
    },
    { immediate: true }
  )

  watch(
    availableEngines,
    (engines) => {
      if (!engines.length) {
        if (selectedEngineId.value !== null) selectedEngineId.value = null
        return
      }
      if (selectedEngineId.value && engines.some((e) => e.id === selectedEngineId.value)) {
        return
      }
      const active = engines.find((e) => e.status === 'active')
      selectedEngineId.value = (active ?? engines[0]).id
    },
    { immediate: true }
  )

  // ---------- Votable items ----------
  const votableItems = computed<VotableItem[]>(() => {
    const engine = currentEngine.value
    const pid = parentId.value
    if (!engine?.target_ids || engine.target_ids.length === 0 || !pid) return []

    if (targetType === 'option') {
      const fromStore: VotableItem[] = (optionsStore.options || []).filter(
        (opt) => opt.parentId === pid && engine.target_ids!.includes(opt.id)
      )
      if (fromStore.length > 0) return fromStore
    } else {
      const fromStore: VotableItem[] = (inquiriesStore.inquiries || []).filter(
        (inq) =>
          (inq.inquiryGroups || []).includes(pid) && engine.target_ids!.includes(inq.id)
      )
      if (fromStore.length > 0) return fromStore
    }

    if (fallbackItems) {
      const source = unwrap(fallbackItems)
      return source.filter((it) => engine.target_ids!.includes(it.id)) as VotableItem[]
    }

    return []
  })

  const hasActiveEngine = computed(() => availableEngines.value.some((e) => e.status === 'active'))

  const refreshEngines = async () => {
    loadingEngines.value = true
    try {
      // Delegated to the caller (supportEngineStore.loadEnginesByInquiry / ...ByInquiryGroup).
    } finally {
      loadingEngines.value = false
    }
  }

  const selectEngine = (id: number) => {
    if (availableEngines.value.some((e) => e.id === id)) {
      selectedEngineId.value = id
      resetSelections()
      loadUserVotesForEngine(id)
    }
  }

  const effectiveEngineId = computed(() => currentEngine.value?.engine || 'binary')

  // ---------- Vote state ----------
  const rankings = ref<Record<number, number>>({})
  const scores = ref<Record<number, number>>({})
  const grades = ref<Record<number, string | null>>({})
  const reactions = ref<Record<number, string[] | null>>({})
  const quadraticVotes = ref<Record<number, number>>({})
  const tokenWeights = ref<Record<number, number>>({})
  const selectedItems = ref<Set<number>>(new Set())

  /**
   * Supports visible to this context, by case:
   *
   *   option target (parentId = inquiryId):
   *     - Case 1 / 2 (engine=null, inquiryId=parentId)              → default values
   *     - Case 3 (engine=N, inquiryId=parentId, optionId=0)         → engine ballots
   *
   *   inquiry target (parentId = groupId):
   *     - Case 1 (engine=null, inquiryId∈group.inquiryIds, optionId=0) → per-inquiry votes
   *     - Case 4 (engine=N, inquiryId=0, optionId=0)                → engine ballots
   *       (filtered downstream by supportEngineId)
   */
  const supportsForContext = computed<Support[]>(() => {
    const pid = parentId.value
    if (!pid) return []
    const all = supportsStore.supports || []

    if (targetType === 'option') {
      return all.filter((s) => s.inquiryId === pid)
    }

    // inquiry target — pid is a group id
    const group = inquiryGroupsStore.byId(pid)
    const groupIds = new Set(group?.inquiryIds ?? [])
    return all.filter((s) => s.inquiryId === 0 || groupIds.has(s.inquiryId))
  })

  /**
   * Load supports for the current context.
   *
   * - option target : one API call (`inquiryId = parentId`); replaces supports
   *                   for that inquiry only, preserving other contexts.
   * - inquiry target: accumulate Case 4 aggregates (`inquiryId = 0`) + Case 1
   *                   per-inquiry votes for every inquiry in the group.
   *                   `supportsStore.loadSupports` *replaces* the array, so we
   *                   call the API directly to merge.
   */
  const loadSupportsForContext = async () => {
    const pid = parentId.value
    if (!pid) return

    if (targetType === 'option') {
      try {
        const resp = await SupportsAPI.getByInquiryId(pid)
        const items: Support[] = resp?.data?.supports || []
        const other = (supportsStore.supports || []).filter((s) => s.inquiryId !== pid)
        supportsStore.supports = [...other, ...items]
      } catch {
        /* best-effort */
      }
      return
    }

    // inquiry target — pid is a group id
    const group = inquiryGroupsStore.byId(pid)
    if (!group) return

    const groupInquiryIds = group.inquiryIds ?? []
    const groupIds = new Set(groupInquiryIds)
    const groupEngineIds = new Set(availableEngines.value.map((e) => e.id))

    const accumulated: Support[] = []
    const seen = new Set<string>()
    const add = (s: Support) => {
      const key = s.id
        ? `id:${s.id}`
        : `k:${s.inquiryId}-${s.optionId}-${s.userId}-${engineIdOf(s) ?? 'null'}`
      if (seen.has(key)) return
      seen.add(key)
      accumulated.push(s)
    }

    // Case 4 aggregates — `inquiryId = 0`
    try {
      const resp = await SupportsAPI.getByInquiryId(0)
      const items: Support[] = resp?.data?.supports || []
      for (const s of items) {
        const eng = engineIdOf(s)
        if (eng !== null && groupEngineIds.has(eng) && s.inquiryId === 0) {
          add(s)
        }
      }
    } catch {
      /* best-effort */
    }

    // Case 1 direct votes — per member inquiry
    for (const inqId of groupInquiryIds) {
      try {
        const resp = await SupportsAPI.getByInquiryId(inqId)
        const items: Support[] = resp?.data?.supports || []
        for (const s of items) {
          const eng = engineIdOf(s)
          if (eng === null || groupEngineIds.has(eng)) {
            add(s)
          }
        }
      } catch {
        /* best-effort */
      }
    }

    // Preserve supports from unrelated contexts; drop stale ones for this group
    const preserved = (supportsStore.supports || []).filter((s) => {
      const eng = engineIdOf(s)
      if (s.inquiryId === 0 && eng !== null && groupEngineIds.has(eng)) return false
      if (groupIds.has(s.inquiryId)) return false
      return true
    })

    supportsStore.supports = [...preserved, ...accumulated]
  }

  watch(
    () => parentId.value,
    async (pid) => {
      if (!pid) return
      await loadSupportsForContext()
    },
    { immediate: true }
  )

  // For inquiry target, the group may finish loading *after* parentId arrives.
  watch(
    () => {
      if (targetType !== 'inquiry') return ''
      const pid = parentId.value
      if (!pid) return ''
      const group = inquiryGroupsStore.byId(pid)
      return group?.inquiryIds?.join(',') ?? ''
    },
    async (ids) => {
      if (ids) await loadSupportsForContext()
    }
  )

  /**
   * Supports whose `supportEngineId` matches the current engine.
   * Falls back to deliberative votes (engine=null) when the current engine has
   * no ballot yet, so the UI can pre-populate with the user's existing choice.
   */
  const userVotesForEngine = computed<Support[]>(() => {
    const userId = sessionStore.currentUser?.id
    const engineIdValue = currentEngine.value?.id
    if (!userId) return []

    const userSupports = supportsForContext.value.filter((s) => s.userId === userId)
    if (!engineIdValue) return userSupports

    const exact = userSupports.filter((s) => engineIdOf(s) === engineIdValue)
    if (exact.length) return exact

    // Fallback: deliberative votes (engine = null) — used only for hydration
    return userSupports.filter((s) => engineIdOf(s) === null)
  })

  const currentUserVotes = computed(() => userVotesForEngine.value)
  const hasUserVoted = computed(() => currentUserVotes.value.length > 0)

  /**
   * The engine‑scoped aggregate row used for change detection.
   *   - option target : Case 3 → inquiryId = parentId, optionId = 0
   *   - inquiry target: Case 4 → inquiryId = 0, optionId = 0
   * Returns `null` when there is no engine ballot yet (even if deliberative
   * votes exist), so `hasSelectionsChanged` correctly treats local edits as new.
   */
  const currentUserVoteForEngine = computed<Support | null>(() => {
    const votes = userVotesForEngine.value
    if (!votes.length) return null
    const engineIdValue = currentEngine.value?.id
    if (!engineIdValue) return null

    if (targetType === 'inquiry') {
      return (
        votes.find(
          (v) => engineIdOf(v) === engineIdValue && v.inquiryId === 0 && v.optionId === 0
        ) ?? null
      )
    }
    return (
      votes.find(
        (v) =>
          engineIdOf(v) === engineIdValue
          && v.optionId === 0
          && v.inquiryId === parentId.value
      ) ?? null
    )
  })

  const isEngineMulti = computed(() => !SINGLE_VOTE_ENGINES.includes(effectiveEngineId.value))

  const canVote = computed(() => {
    const engine = currentEngine.value
    return !!engine && engine.status === 'active'
  })

  // ---------- Lookups ----------
  const hasUserVotedFor = (itemId: number): boolean => getUserVoteValueForItem(itemId) !== null

  /**
   * Return the current user's saved value for one votable item.
   *
   *  - option target (parentId = inquiryId):
   *      Case 3 aggregate first, then Case 2 direct, then Case 1 aggregate.
   *  - inquiry target (parentId = groupId):
   *      Case 4 aggregate first, then Case 1 direct (inquiryId = itemId).
   *
   * Simple values are unwrapped from `{"value": N}`. Aggregate values are
   * looked up inside `scores` / `reactions` / `ranking` / `grades` / `selected`.
   */
  const getUserVoteValueForItem = (itemId: number): SupportValue | null => {
    const votes = currentUserVotes.value
    if (!votes.length) return null

    if (targetType === 'option') {
      // Case 3 aggregate
      const engineVote = votes.find(
        (v) => engineIdOf(v) !== null && v.optionId === 0 && v.inquiryId === parentId.value
      )
      if (engineVote) return lookupFromAggregate(engineVote.value, itemId)

      // Case 2 direct option vote
      const directVote = votes.find(
        (v) => engineIdOf(v) === null && v.optionId === itemId && v.inquiryId === parentId.value
      )
      if (directVote) return unwrapVoteValue(directVote.value)

      // Case 1 aggregate on the inquiry itself
      const aggregateVote = votes.find(
        (v) => engineIdOf(v) === null && v.optionId === 0 && v.inquiryId === parentId.value
      )
      if (aggregateVote) return unwrapVoteValue(aggregateVote.value)

      return null
    }

    // inquiry target
    // Case 4 aggregate
    const engineVote = votes.find(
      (v) => engineIdOf(v) !== null && v.inquiryId === 0 && v.optionId === 0
    )
    if (engineVote) return lookupFromAggregate(engineVote.value, itemId)

    // Case 1 direct vote on the inquiry
    const directVote = votes.find(
      (v) => engineIdOf(v) === null && v.inquiryId === itemId && v.optionId === 0
    )
    if (directVote) return unwrapVoteValue(directVote.value)

    return null
  }

  const isSelectedForVote = (itemId: number): boolean => {
    const engine = effectiveEngineId.value

    if (['binary', 'ternary', 'score', 'star'].includes(engine)) {
      return scores.value[itemId] !== undefined && scores.value[itemId] !== null
    }
    if (engine === 'reaction') {
      return reactions.value[itemId] !== undefined && (reactions.value[itemId]?.length ?? 0) > 0
    }
    if (['ranking', 'condorcet', 'borda'].includes(engine)) {
      return rankings.value[itemId] !== undefined && rankings.value[itemId] !== null
    }
    if (engine === 'majority_judgment') {
      return grades.value[itemId] !== undefined && grades.value[itemId] !== null
    }
    if (engine === 'quadratic') {
      return quadraticVotes.value[itemId] !== undefined && quadraticVotes.value[itemId] > 0
    }
    if (engine === 'token_weighted') {
      return tokenWeights.value[itemId] !== undefined && tokenWeights.value[itemId] > 0
    }
    if (['approval', 'phased_voting'].includes(engine)) {
      return selectedItems.value.has(itemId)
    }
    if (engine === 'approval_delib') {
      return hasUserVotedFor(itemId)
    }
    return false
  }

  const hasSelectionsChanged = computed<boolean>(() => {
    const savedVote = currentUserVoteForEngine.value

    if (!savedVote) {
      return (
        Object.keys(scores.value).length > 0 ||
        Object.keys(rankings.value).length > 0 ||
        Object.keys(grades.value).length > 0 ||
        Object.keys(reactions.value).length > 0 ||
        Object.keys(quadraticVotes.value).length > 0 ||
        Object.keys(tokenWeights.value).length > 0 ||
        selectedItems.value.size > 0
      )
    }

    const engineType = effectiveEngineId.value
    const saved = parsePayload(savedVote.value)
    if (!saved || typeof saved !== 'object' || Array.isArray(saved)) return true

    const savedObj = saved as Record<string, unknown>
    const payload =
      'value' in savedObj && !('scores' in savedObj) && !('reactions' in savedObj)
        && !('ranking' in savedObj) && !('grades' in savedObj) && !('selected' in savedObj)
        && savedObj.value && typeof savedObj.value === 'object'
        ? (savedObj.value as Record<string, unknown>)
        : savedObj

    const objectsEqual = (a: Record<string, unknown>, b: Record<string, unknown>) => {
      const keysA = Object.keys(a).sort()
      const keysB = Object.keys(b).sort()
      if (keysA.length !== keysB.length) return false
      for (const key of keysA) {
        if (JSON.stringify(a[key]) !== JSON.stringify(b[key])) return false
      }
      return true
    }

    switch (engineType) {
      case 'binary':
      case 'ternary':
      case 'score':
      case 'star':
        return !objectsEqual(scores.value, (payload.scores as Record<string, unknown>) || {})
      case 'reaction':
        return !objectsEqual(
          reactions.value as unknown as Record<string, unknown>,
          (payload.reactions as Record<string, unknown>) || {}
        )
      case 'approval':
      case 'phased_voting': {
        const currentSet = new Set(selectedItems.value)
        const savedArr = (payload.selected as number[]) || []
        const savedSet = new Set(savedArr)
        if (currentSet.size !== savedSet.size) return true
        for (const id of currentSet) if (!savedSet.has(id)) return true
        return false
      }
      case 'ranking':
      case 'condorcet':
      case 'borda':
        return !objectsEqual(rankings.value, (payload.ranking as Record<string, unknown>) || {})
      case 'majority_judgment':
        return !objectsEqual(
          grades.value as unknown as Record<string, unknown>,
          (payload.grades as Record<string, unknown>) || {}
        )
      case 'quadratic':
        return !objectsEqual(
          quadraticVotes.value,
          (payload.scores as Record<string, unknown>) || {}
        )
      case 'token_weighted':
        return !objectsEqual(
          tokenWeights.value,
          (payload.scores as Record<string, unknown>) || {}
        )
      default:
        return true
    }
  })

  // ---------- Update functions ----------
  const toggleSelection = (itemId: number) => {
    if (selectedItems.value.has(itemId)) selectedItems.value.delete(itemId)
    else selectedItems.value.add(itemId)
  }

  const updateRanking = (itemId: number, rank: number | null) => {
    if (rank === null || rank === undefined) {
      const rest = { ...rankings.value }
      delete rest[itemId]
      rankings.value = rest
    } else {
      rankings.value = { ...rankings.value, [itemId]: rank }
    }
  }

  const updateScore = (itemId: number, score: number | null) => {
    if (score === null || score === undefined) {
      const rest = { ...scores.value }
      delete rest[itemId]
      scores.value = rest
    } else {
      scores.value = { ...scores.value, [itemId]: score }
    }
  }

  const updateGrade = (itemId: number, grade: string | null) => {
    if (grade === null || grade === undefined) {
      const rest = { ...grades.value }
      delete rest[itemId]
      grades.value = rest
    } else {
      grades.value = { ...grades.value, [itemId]: grade }
    }
  }

  const updateReaction = (itemId: number, reaction: string[] | null) => {
    if (reaction === null || reaction === undefined || reaction.length === 0) {
      const rest = { ...reactions.value }
      delete rest[itemId]
      reactions.value = rest
    } else {
      reactions.value = { ...reactions.value, [itemId]: reaction }
    }
  }

  const updateQuadratic = (itemId: number, votes: number | null) => {
    if (votes === null || votes === undefined || votes === 0) {
      const rest = { ...quadraticVotes.value }
      delete rest[itemId]
      quadraticVotes.value = rest
    } else {
      quadraticVotes.value = { ...quadraticVotes.value, [itemId]: votes }
    }
  }

  const updateTokenWeight = (itemId: number, weight: number | null) => {
    if (weight === null || weight === undefined || weight === 0) {
      const rest = { ...tokenWeights.value }
      delete rest[itemId]
      tokenWeights.value = rest
    } else {
      tokenWeights.value = { ...tokenWeights.value, [itemId]: weight }
    }
  }

  const resetSelections = () => {
    selectedItems.value = new Set()
    rankings.value = {}
    scores.value = {}
    grades.value = {}
    reactions.value = {}
    quadraticVotes.value = {}
    tokenWeights.value = {}
  }

  // ---------- Submission ----------
  /**
   * Submit a single-item vote.
   *
   * - option target : `inquiryId = parentId`, `optionId = item.id`  (Case 2)
   * - inquiry target: `inquiryId = item.id`,  `optionId = 0`       (Case 1)
   */
  const submitSingleVote = async (
    _parentId: number,
    item: VotableItem,
    value: SupportValue
  ): Promise<boolean> => {
    const userId = sessionStore.currentUser?.id
    if (!userId || !canVote.value) return false

    const inquiryIdForVote =
      targetType === 'option' ? (_parentId || parentId.value) : item.id
    if (!inquiryIdForVote) return false

    try {
      await supportsStore.toggleSupport(
        inquiryIdForVote,
        item.id,
        userId,
        item,
        targetType === 'option' ? 'option' : 'inquiry',
        value
      )
      return true
    } catch (error) {
      console.error('Failed to submit vote:', error)
      return false
    }
  }

  const canSubmitMultiVote = computed(() => {
    const engineType = effectiveEngineId.value
    const config = currentEngine.value?.config || {}
    let valid = false

    switch (engineType) {
      case 'binary':
      case 'ternary':
        valid = Object.values(scores.value).filter((v) => v !== null && v !== undefined).length > 0
        break

      case 'approval': {
        const min = (config.min_choices as number) || 1
        const max = config.max_choices as number | null
        const count = selectedItems.value.size
        valid = count >= min && (max === null || max === undefined || count <= max) && count > 0
        break
      }

      case 'ranking':
      case 'condorcet':
      case 'borda': {
        const ranked = Object.entries(rankings.value).filter(
          ([, r]) => r !== null && r !== undefined
        )
        if (ranked.length < 2) {
          valid = false
          break
        }
        const ranks = new Set<number>()
        let ok = true
        for (const [, r] of ranked) {
          if (ranks.has(r as number)) {
            ok = false
            break
          }
          ranks.add(r as number)
        }
        if (!ok) {
          valid = false
          break
        }
        for (const [, r] of ranked) {
          if ((r as number) < 1 || (r as number) > maxRank.value) {
            ok = false
            break
          }
        }
        valid = ok && ranked.length > 0
        break
      }

      case 'score':
      case 'star': {
        const scored = Object.entries(scores.value).filter(([, s]) => s !== null && s !== undefined)
        if (scored.length === 0) {
          valid = false
          break
        }
        let ok = true
        for (const [, s] of scored) {
          const num = Number(s)
          if (isNaN(num) || num < scoreMin.value || num > scoreMax.value) {
            ok = false
            break
          }
        }
        valid = ok
        break
      }

      case 'majority_judgment':
        valid = Object.values(grades.value).filter((g) => g !== null && g !== undefined).length > 0
        break

      case 'reaction':
        valid = Object.values(reactions.value).some((arr) => arr && arr.length > 0)
        break

      case 'quadratic': {
        const votes = Object.values(quadraticVotes.value).filter(
          (v) => v !== null && v !== undefined && v > 0
        )
        if (votes.length === 0) {
          valid = false
          break
        }
        const totalCredits = votes.reduce((sum, v) => sum + (v as number) ** 2, 0)
        const maxCredits = (config.credits_per_user as number) || 100
        valid = totalCredits <= maxCredits && votes.length > 0
        break
      }

      case 'token_weighted':
        valid =
          Object.values(tokenWeights.value).filter((w) => w !== null && w !== undefined && w > 0)
            .length > 0
        break

      case 'phased_voting':
        valid = selectedItems.value.size > 0
        break

      case 'approval_delib':
        // Uses per‑option toggle — no multi‑vote form.
        valid = false
        break

      default:
        valid = selectedItems.value.size > 0
    }
    return valid
  })

  const voteSelectionInfo = computed(() => {
    const engineType = effectiveEngineId.value
    const config = currentEngine.value?.config || {}

    if (['approval', 'phased_voting'].includes(engineType)) {
      const min = (config.min_choices as number) || 1
      const max = config.max_choices as number | null
      const count = selectedItems.value.size
      if (max) return t('agora', '{count}/{max} selected (min: {min})', { count, max, min })
      return t('agora', '{count} selected (min: {min})', { count, min })
    }
    if (['ranking', 'condorcet', 'borda'].includes(engineType)) {
      const count = Object.values(rankings.value).filter(
        (v) => v !== null && v !== undefined
      ).length
      return t('agora', '{count} options ranked', { count })
    }
    if (['score', 'star'].includes(engineType)) {
      const count = Object.values(scores.value).filter((v) => v !== null && v !== undefined).length
      return t('agora', '{count} options rated', { count })
    }
    if (engineType === 'majority_judgment') {
      const count = Object.values(grades.value).filter((v) => v !== null && v !== undefined).length
      return t('agora', '{count} options graded', { count })
    }
    if (engineType === 'reaction') {
      const count = Object.values(reactions.value).filter(
        (v) => v !== null && v !== undefined
      ).length
      return t('agora', '{count} reactions selected', { count })
    }
    if (engineType === 'quadratic') {
      const votes = Object.values(quadraticVotes.value).filter(
        (v) => v !== null && v !== undefined && v > 0
      )
      const count = votes.length
      const totalCredits = votes.reduce((sum, v) => sum + (v as number) ** 2, 0)
      return t('agora', '{count} options | {credits} credits used', {
        count,
        credits: totalCredits,
      })
    }
    if (engineType === 'token_weighted') {
      const count = Object.values(tokenWeights.value).filter(
        (v) => v !== null && v !== undefined && v > 0
      ).length
      return t('agora', '{count} options weighted', { count })
    }
    const count = Object.values(scores.value).filter((v) => v !== null && v !== undefined).length
    return t('agora', '{count} options voted', { count })
  })

  /**
   * Resolve the "container inquiry id" for the aggregate (Case 3 / Case 4) row.
   *
   *   option target (Case 3): inquiryId = parentId      (the parent inquiry)
   *   inquiry target (Case 4): inquiryId = 0            (group‑scoped ballot)
   *
   * Both cases are aggregate rows with `optionId = 0`.
   */
  const resolveAggregateInquiryId = (): number | null => {
    if (targetType === 'option') return parentId.value
    return 0
  }

  async function submitMultiVote(reload = true): Promise<boolean> {
    const pid = parentId.value
    if (!canVote.value || !canSubmitMultiVote.value || !pid) return false

    const engine = currentEngine.value
    if (!engine) return false
    const engineIdValue = engine.id
    const userId = sessionStore.currentUser?.id
    if (!userId) return false

    const aggregateInquiryId = resolveAggregateInquiryId()
    if (aggregateInquiryId === null) return false

    let payload: SupportValue = null
    const engineType = effectiveEngineId.value

    switch (engineType) {
      case 'binary':
      case 'ternary':
      case 'score':
      case 'star': {
        const scoresObj: Record<number, number> = {}
        for (const [optId, val] of Object.entries(scores.value)) {
          if (val !== null && val !== undefined) scoresObj[Number(optId)] = val as number
        }
        if (Object.keys(scoresObj).length === 0) return false
        payload = { scores: scoresObj }
        break
      }

      case 'reaction': {
        const reactionsObj: Record<number, string[]> = {}
        for (const [optId, arr] of Object.entries(reactions.value)) {
          if (arr && arr.length > 0) reactionsObj[Number(optId)] = arr
        }
        if (Object.keys(reactionsObj).length === 0) return false
        payload = { reactions: reactionsObj }
        break
      }

      case 'approval': {
        const selected = Array.from(selectedItems.value)
        if (selected.length === 0) return false
        payload = { selected }
        break
      }

      case 'ranking':
      case 'condorcet':
      case 'borda': {
        const rankingObj: Record<number, number> = {}
        for (const [optId, rank] of Object.entries(rankings.value)) {
          if (rank !== null && rank !== undefined) rankingObj[Number(optId)] = rank
        }
        if (Object.keys(rankingObj).length < 2) return false
        payload = { ranking: rankingObj }
        break
      }

      case 'majority_judgment': {
        const gradesObj: Record<number, string> = {}
        for (const [optId, grade] of Object.entries(grades.value)) {
          if (grade !== null && grade !== undefined) gradesObj[Number(optId)] = grade
        }
        if (Object.keys(gradesObj).length === 0) return false
        payload = { grades: gradesObj }
        break
      }

      case 'quadratic': {
        const scoresObj: Record<number, number> = {}
        for (const [optId, votes] of Object.entries(quadraticVotes.value)) {
          if (votes !== null && votes !== undefined && votes > 0) scoresObj[Number(optId)] = votes
        }
        if (Object.keys(scoresObj).length === 0) return false
        payload = { scores: scoresObj }
        break
      }

      case 'token_weighted': {
        const scoresObj: Record<number, number> = {}
        for (const [optId, weight] of Object.entries(tokenWeights.value)) {
          if (weight !== null && weight !== undefined && weight > 0)
            scoresObj[Number(optId)] = weight
        }
        if (Object.keys(scoresObj).length === 0) return false
        payload = { scores: scoresObj }
        break
      }

      case 'phased_voting': {
        const selected = Array.from(selectedItems.value)
        const round = (engine.config?.current_round as number) || 1
        if (selected.length === 0) return false
        payload = { selected, round }
        break
      }

      default:
        payload = { selected: Array.from(selectedItems.value) }
        break
    }

    // `getSupport` / `addSupport` / `updateSupport` all take the inquiryId.
    // Case 3 uses parentId; Case 4 uses 0 — both are supported by the store.
    const existing = supportsStore.getSupport(aggregateInquiryId, userId, 0, engineIdValue)

    try {
      if (existing) {
        await supportsStore.updateSupport(aggregateInquiryId, userId, payload, 0, engineIdValue)
      } else {
        await supportsStore.addSupport(aggregateInquiryId, userId, payload, 0, engineIdValue)
      }

      if (reload) loadUserVotesForEngine(engineIdValue)
      await loadResults()
      return true
    } catch (error) {
      console.error('Failed to submit multi-vote:', error)
      return false
    }
  }

  // ---------- Results ----------
  const engineResult = ref<SupportResultData>(null)

  const getItemVoteCount = (itemId: number): number => {
    if (effectiveEngineId.value === 'trending') return getTrendingScore(itemId)

    const engineType = effectiveEngineId.value
    const res = engineResult.value as Record<string, any> | null
    if (!res) return 0

    if (PER_OPTION_RESULT_ENGINES.includes(engineType)) {
      switch (res.type) {
        case 'binary':
          return res.options?.[itemId]?.yes ?? res.totals?.yes ?? 0
        case 'ternary':
          return res.options?.[itemId]?.yes ?? res.totals?.yes ?? 0
        case 'score':
        case 'star':
          return res.options?.[itemId]?.total ?? res.totals?.total ?? 0
        case 'reaction': {
          const perOpt = res.options?.[itemId]
          if (perOpt) return Object.values(perOpt).reduce((a: number, b) => a + (b as number), 0)
          return Object.values(res.counts || {}).reduce((a: number, b) => a + (b as number), 0)
        }
        case 'majority_judgment':
          return res.options?.[itemId]?.total_votes ?? 0
      }
      return 0
    }

    switch (engineType) {
      case 'approval':
        return res.counts?.[itemId] || 0
      case 'ranking':
        return res.rankings?.[itemId] || 0
      case 'condorcet':
        return res.wins?.[itemId] || 0
      case 'borda':
        return res.scores?.[itemId] || 0
      case 'quadratic':
        return res.scores?.[itemId] || 0
      case 'token_weighted':
        return res.weights?.[itemId] || 0
      case 'phased_voting':
        return res.counts?.[itemId] || 0
      case 'approval_delib':
        return res.totals?.approved || 0
      default:
        return 0
    }
  }

  const getItemRank = (itemId: number): number | null => {
    const res = engineResult.value as Record<string, any> | null
    return res?.ranking?.[itemId] ?? null
  }

  const totalVotes = computed(() => {
    const engineType = effectiveEngineId.value
    const res = engineResult.value as Record<string, any> | null
    if (!res) return 0

    if (engineType === 'trending') {
      let total = 0
      for (const item of votableItems.value) total += getTrendingScore(item.id)
      return total
    }

    if (PER_OPTION_RESULT_ENGINES.includes(engineType)) {
      if (res.options) {
        let total = 0
        for (const optId in res.options) {
          const opt = res.options[optId]
          if (res.type === 'binary' || res.type === 'ternary') {
            total += (opt.yes || 0) + (opt.no || 0) + (opt.abstain || 0)
          } else if (res.type === 'score' || res.type === 'star') {
            total += opt.total || 0
          } else if (res.type === 'reaction') {
            total += Object.values(opt).reduce((a: number, b) => a + (b as number), 0)
          } else if (res.type === 'majority_judgment') {
            total += opt.total_votes || 0
          }
        }
        return total
      }
      if (res.totals) {
        if (res.type === 'binary') return (res.totals.yes || 0) + (res.totals.no || 0)
        if (res.type === 'ternary')
          return (res.totals.yes || 0) + (res.totals.no || 0) + (res.totals.abstain || 0)
        if (res.type === 'score' || res.type === 'star') return res.totals.total || 0
        if (res.type === 'reaction')
          return Object.values(res.counts || {}).reduce((a: number, b) => a + (b as number), 0)
        if (res.type === 'majority_judgment') return res.total_votes || 0
      }
      return 0
    }

    switch (engineType) {
      case 'approval':
        return Object.values(res.counts || {}).reduce((a: number, b) => a + (b as number), 0)
      case 'ranking':
        return res.total_voters || Object.keys(res.rankings || {}).length
      case 'condorcet':
      case 'borda':
        return res.total_voters || 0
      case 'quadratic':
        return res.total_votes || 0
      case 'token_weighted':
        return res.total_weight || 0
      case 'phased_voting':
        return Object.values(res.counts || {}).reduce((a: number, b) => a + (b as number), 0)
      default:
        return 0
    }
  })

  const percentageBase = computed(() => {
    if (!POINT_BASED_ENGINES.includes(effectiveEngineId.value)) {
      return totalVotes.value
    }
    let total = 0
    for (const item of votableItems.value) total += getItemVoteCount(item.id)
    return total
  })

  const getPercentage = (item: VotableItem, total: number = percentageBase.value): number => {
    const count = getItemVoteCount(item.id)
    if (total === 0) return 0
    return Math.round((count / total) * 100)
  }

  const getRankedItems = (items: VotableItem[]): VotableItem[] => {
    const engineType = effectiveEngineId.value
    if (engineType === 'ranking') {
      return [...items].sort((a, b) => {
        const ca = getItemVoteCount(a.id)
        const cb = getItemVoteCount(b.id)
        const ra = ca === 0 ? Infinity : ca
        const rb = cb === 0 ? Infinity : cb
        return ra - rb
      })
    }
    if (['condorcet', 'borda'].includes(engineType)) {
      return [...items].sort(
        (a, b) => (getItemVoteCount(b.id) || 0) - (getItemVoteCount(a.id) || 0)
      )
    }
    return [...items].sort((a, b) => getItemVoteCount(b.id) - getItemVoteCount(a.id))
  }

  const getWinner = (items: VotableItem[]): VotableItem | null => {
    const ranked = getRankedItems(items)
    return ranked.length ? ranked[0] : null
  }

  const getWinnerPercentage = (items: VotableItem[]): number => {
    const winner = getWinner(items)
    return winner ? getPercentage(winner) : 0
  }

  /**
   * Hydrate local editable state from saved votes for the given engine.
   *
   * - option target (parentId = inquiryId):
   *     Case 3 aggregate → populate `scores` / `reactions` / `ranking` /
   *     `grades` / `selectedItems` keyed by itemId.
   *     Case 2 per‑option rows → scalar values (binary / ternary / score /
   *     star / majority_judgment / reaction).
   * - inquiry target (parentId = groupId):
   *     Case 4 aggregate → populate the maps from the aggregate.
   *     Case 1 per‑inquiry rows don't feed the form (deliberative votes).
   */
  function loadUserVotesForEngine(engineId: number) {
    const userId = sessionStore.currentUser?.id
    if (!userId) return

    const contextSupports = supportsForContext.value
    const exact = contextSupports.filter(
      (s) => s.userId === userId && engineIdOf(s) === engineId
    )
    const userVotes = exact.length
      ? exact
      : contextSupports.filter((s) => s.userId === userId && engineIdOf(s) === null)

    const engine = effectiveEngineId.value

    for (const vote of userVotes) {
      const value = parsePayload(vote.value)
      const optionId = vote.optionId
      const inquiryIdOfVote = vote.inquiryId

      // Case 2 — per‑option direct vote (option target only)
      if (optionId > 0) {
        const unwrapped = unwrapVoteValue(vote.value)
        if (unwrapped === null || unwrapped === undefined) continue

        if (typeof unwrapped === 'number' && ['score', 'star', 'binary', 'ternary'].includes(engine)) {
          scores.value = { ...scores.value, [optionId]: unwrapped }
        } else if (typeof unwrapped === 'string' && engine === 'majority_judgment') {
          grades.value = { ...grades.value, [optionId]: unwrapped }
        } else if (Array.isArray(unwrapped) && engine === 'reaction') {
          reactions.value = { ...reactions.value, [optionId]: unwrapped as string[] }
        }
        continue
      }

      // Aggregate — Case 3 (option target) or Case 4 (inquiry target)
      if (!value || typeof value !== 'object' || Array.isArray(value)) continue
      const val = value as Record<string, unknown>

      // Defensive: some backends wrap as { value: { scores: ... } }
      const payload =
        'value' in val && !('scores' in val) && !('reactions' in val) && !('ranking' in val)
          && !('grades' in val) && !('selected' in val) && val.value && typeof val.value === 'object'
          ? (val.value as Record<string, unknown>)
          : val

      if (payload.scores && typeof payload.scores === 'object') {
        const scoresMap = payload.scores as Record<string, number>
        if (engine === 'quadratic') {
          for (const [optId, v] of Object.entries(scoresMap)) {
            quadraticVotes.value = { ...quadraticVotes.value, [Number(optId)]: v }
          }
        } else if (engine === 'token_weighted') {
          for (const [optId, v] of Object.entries(scoresMap)) {
            tokenWeights.value = { ...tokenWeights.value, [Number(optId)]: v }
          }
        } else if (['binary', 'ternary', 'score', 'star'].includes(engine)) {
          const next = { ...scores.value }
          for (const [optId, v] of Object.entries(scoresMap)) next[Number(optId)] = v
          scores.value = next
        }
      }

      if (payload.reactions && typeof payload.reactions === 'object') {
        for (const [optId, arr] of Object.entries(payload.reactions)) {
          if (Array.isArray(arr)) {
            reactions.value = { ...reactions.value, [Number(optId)]: arr }
          }
        }
      }

      if (payload.ranking && typeof payload.ranking === 'object') {
        for (const [optId, rank] of Object.entries(payload.ranking)) {
          rankings.value = { ...rankings.value, [Number(optId)]: rank as number }
        }
      }

      if (payload.grades && typeof payload.grades === 'object') {
        for (const [optId, grade] of Object.entries(payload.grades)) {
          grades.value = { ...grades.value, [Number(optId)]: grade as string }
        }
      }

      if (Array.isArray(payload.selected)) {
        const next = new Set(selectedItems.value)
        for (const id of payload.selected as number[]) next.add(id)
        selectedItems.value = next
      }

      // Suppress unused variable warning for the casted `inquiryIdOfVote`
      void inquiryIdOfVote
    }
  }

  const removeMyVote = async (reload = true): Promise<boolean> => {
    const engine = currentEngine.value
    const pid = parentId.value
    if (!engine || !pid) return false
    const userId = sessionStore.currentUser?.id
    if (!userId) return false

    // Engine‑scoped votes only (Cases 3 & 4)
    const userVotes = supportsForContext.value.filter(
      (s) => s.userId === userId && engineIdOf(s) === engine.id
    )
    if (userVotes.length === 0) return false

    for (const support of userVotes) {
      // `support.inquiryId` is authoritative:
      //   Case 3 → parentId
      //   Case 4 → 0
      await supportsStore.removeSupport(
        support.inquiryId,
        userId,
        support.optionId,
        engine.id
      )
    }

    if (reload) {
      resetSelections()
      loadUserVotesForEngine(engine.id)
    }
    await loadResults()
    return true
  }

  // ---------- Trending score (placeholder) ----------
  const getTrendingScore = (_itemId: number): number => 0

  // ---------- Results loader ----------
  /**
   * Reads results from the correct scope:
   *   - option targets  → current inquiry (`inquiryStore.status.supportResult`)
   *   - inquiry targets → current inquiry group (`inquiryGroupsStore.currentInquiryGroup.status.supportResult`)
   *
   * Note: results use `target_type = 'inquiry'` at the parent level even for
   * Case 3, because the aggregate is still one row per engine (per inquiry).
   */
  const loadResults = async () => {
    const engineIdValue = currentEngine.value?.id
    if (!engineIdValue) {
      engineResult.value = null
      return
    }

    let engineResults = resultStore.getResultsByEngine(engineIdValue)
    if (engineResults.length === 0) {
      try {
        await resultStore.loadEngineResults(engineIdValue)
      } catch {
        /* ignore */
      }
      engineResults = resultStore.getResultsByEngine(engineIdValue)
    }

    if (engineResults.length > 0) {
      const match =
        engineResults.find((r) => r.target_type === targetType) ?? engineResults[0]
      engineResult.value = match?.result ?? null
      return
    }

    const results =
      targetType === 'inquiry'
        ? inquiryGroupsStore.currentInquiryGroup?.status?.supportResult
        : inquiryStore.status?.supportResult

    const entry = results?.find(
      (r: any) => r.support_engine_id === engineIdValue && r.target_type === targetType
    )
    engineResult.value = entry?.result ?? null
  }

  // ─── Hydration watcher ───
  watch(
    () => supportsForContext.value,
    () => {
      const id = currentEngine.value?.id
      if (id) loadUserVotesForEngine(id)
    },
    { deep: true }
  )

  watch(
    () => currentEngine.value?.id,
    async (id) => {
      if (!id) {
        engineResult.value = null
        return
      }
      loadUserVotesForEngine(id)
      await loadResults()
    },
    { immediate: true }
  )

  watch(
    () => resultStore.results.map((r) => `${r.support_engine_id}:${r.id}`).join('|'),
    () => void loadResults(),
    { deep: true }
  )

  watch(
    () =>
      targetType === 'inquiry'
        ? inquiryGroupsStore.currentInquiryGroup?.status?.supportResult
        : inquiryStore.status?.supportResult,
    () => void loadResults(),
    { deep: true }
  )

  // ---------- Dynamic engine config ----------
  const maxRank = computed(() => {
    if (!['ranking', 'condorcet', 'borda'].includes(effectiveEngineId.value))
      return votableItems.value.length
    const config = currentEngine.value?.config || {}
    const configuredMax = config.max_rank
    if (configuredMax === null || configuredMax === undefined) return votableItems.value.length
    return Math.min(configuredMax as number, votableItems.value.length)
  })

  const scoreMin = computed(() => {
    if (!['score', 'star'].includes(effectiveEngineId.value)) return 0
    const config = currentEngine.value?.config || {}
    const min =
      effectiveEngineId.value === 'star'
        ? ((config.min as number) ?? 1)
        : ((config.min as number) ?? 0)
    const max =
      effectiveEngineId.value === 'star'
        ? ((config.max as number) ?? 5)
        : ((config.max as number) ?? 10)
    return min > max ? (effectiveEngineId.value === 'star' ? 1 : 0) : min
  })

  const scoreMax = computed(() => {
    if (!['score', 'star'].includes(effectiveEngineId.value)) return 10
    const config = currentEngine.value?.config || {}
    const min =
      effectiveEngineId.value === 'star'
        ? ((config.min as number) ?? 1)
        : ((config.min as number) ?? 0)
    const max =
      effectiveEngineId.value === 'star'
        ? ((config.max as number) ?? 5)
        : ((config.max as number) ?? 10)
    return min > max ? (effectiveEngineId.value === 'star' ? 5 : 10) : max
  })

  onMounted(() => {
    if (availableEngines.value.length > 0 && !selectedEngineId.value) {
      selectedEngineId.value = availableEngines.value[0].id
    }
  })

  return {
    loadingEngines,
    availableEngines,
    selectedEngineId,
    currentEngine,
    votableItems,
    hasActiveEngine,

    rankings,
    scores,
    grades,
    reactions,
    quadraticVotes,
    tokenWeights,
    selectedItems,
    hasUserVoted,
    hasSelectionsChanged,
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
    getItemVoteCount,
    getItemRank,
    getPercentage,
    getRankedItems,
    getWinner,
    getUserVoteValueForItem,
    getWinnerPercentage,

    effectiveEngineId,
    maxRank,
    scoreMin,
    scoreMax,

    selectEngine,
    refreshEngines,
    removeMyVote,
    loadUserVotesForEngine,
  }
}
